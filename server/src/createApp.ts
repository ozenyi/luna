import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { WebSocketServer } from "ws";
import { z } from "zod";
import { audiotelPlaceholder, bridgeCall, createCardPayment, createVideoRoom, matomoNote, refundStripe, sendBrevo } from "./adapters/index";
import { config } from "./config";
import { hasGranted, type ConsentRecord } from "./domain/consent";
import { canSendMarketing } from "./domain/marketing";
import { evaluateDemoCard, getPack } from "./domain/packs";
import { computeCreditRefund } from "./domain/refund";
import { sanitizeText } from "./domain/sanitize";
import { detectDistress, truncateIp } from "./domain/safety";
import { planPurge } from "./jobs/purge";

const hits = new Map<string, { n: number; t: number }>();

export function createApp() {
  const app = express();
  app.set("trust proxy", 1);
  app.use(helmet({ contentSecurityPolicy: { useDefaults: false, directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] } } }));
  app.use(cors({ origin: config.webOrigins, credentials: true }));
  app.use("/api/webhooks/stripe", express.raw({ type: "application/json" }));
  app.use(express.json({ limit: "200kb" }));
  app.use(cookieParser());
  app.use((req, res, next) => {
    const key = req.ip || "local";
    const now = Date.now();
    const bucket = hits.get(key) || { n: 0, t: now };
    if (now - bucket.t > 60_000) { bucket.n = 0; bucket.t = now; }
    bucket.n += 1;
    hits.set(key, bucket);
    if (bucket.n > (req.path.startsWith("/api/auth") ? 20 : 120)) return res.status(429).json({ error: "Trop de requêtes" });
    next();
  });

  app.get("/api/health", (_req, res) => {
    res.json({ ok: true, mode: "api", audiotel: audiotelPlaceholder(), matomo: matomoNote(), chat: config.chatProvider, video: config.videoProvider });
  });

  app.post("/api/payments/checkout", async (req, res) => {
    const body = z.object({ packId: z.string(), card: z.string() }).safeParse(req.body);
    if (!body.success) return res.status(400).json({ error: "Requête invalide" });
    const pack = getPack(body.data.packId);
    if (!pack) return res.status(404).json({ error: "Pack inconnu" });
    if (evaluateDemoCard(body.data.card) !== "ok" && !config.stripeSecret) return res.status(402).json({ error: "Carte refusée" });
    const payment = await createCardPayment(pack.payCents);
    res.json({ ok: true, payment });
  });

  app.post("/api/payments/refund", async (req, res) => {
    const body = z.object({
      paidCents: z.number().int(), grantedCents: z.number().int(), consumedCents: z.number().int(),
      alreadyRefundedCents: z.number().int(), walletBalanceCents: z.number().int(), stripeRef: z.string().optional(),
    }).parse(req.body);
    const result = computeCreditRefund(body);
    const remote = await refundStripe(body.stripeRef || "pi_demo_local", result.refundCents);
    res.json({ ok: true, result, remote });
  });

  app.post("/api/sessions/call", async (_req, res) => {
    res.json({ ok: true, call: await bridgeCall(), recording: false });
  });

  app.post("/api/sessions/video", async (req, res) => {
    const name = sanitizeText(String(req.body?.name || "luna-room"), 80);
    res.json({ ok: true, room: await createVideoRoom(name), recordParticipantsOnConnect: false });
  });

  app.post("/api/messages", (req, res) => {
    const text = sanitizeText(String(req.body?.text || ""), 2000);
    const distress = detectDistress(text);
    res.json({ ok: true, distress: distress.detected ? distress.category : null, billingPaused: distress.detected });
  });

  app.post("/api/marketing/can-send", (req, res) => {
    const records = (req.body?.consents || []) as ConsentRecord[];
    const channel = req.body?.channel || "email";
    if (channel === "phone") return res.json({ ok: false, reason: "DEMARCHAGE_TELEPHONIQUE_INTERDIT" });
    const decision = canSendMarketing({
      channel, consentGranted: hasGranted(records, `marketing_${channel === "email" ? "email" : channel}`),
      opposition: Boolean(req.body?.opposition), selfExcluded: Boolean(req.body?.selfExcluded),
      distressWithin30Days: Boolean(req.body?.distress), capReachedWithin7Days: Boolean(req.body?.cap),
      sentThisPeriod: Number(req.body?.sent || 0), now: new Date(),
    });
    res.json(decision);
  });

  app.post("/api/jobs/purge", (_req, res) => {
    res.json(planPurge([]));
  });

  app.post("/api/notify", async (req, res) => {
    const result = await sendBrevo(req.body?.channel === "sms" ? "sms" : "email", String(req.body?.to || ""), String(req.body?.text || ""));
    res.json(result);
  });

  app.post("/api/webhooks/stripe", (req, res) => {
    if (!config.stripeWebhook) return res.status(501).json({ error: "Webhook non configuré" });
    res.json({ received: true, bytes: Buffer.isBuffer(req.body) ? req.body.length : 0 });
  });

  app.get("/api/privacy/ip", (req, res) => {
    res.json({ ipTruncated: truncateIp(req.ip) });
  });

  return app;
}

export function attachWebSocket(server: import("node:http").Server) {
  const wss = new WebSocketServer({ server, path: "/ws" });
  wss.on("connection", (socket) => {
    socket.on("message", (raw) => {
      const text = sanitizeText(String(raw), 2000);
      wss.clients.forEach((client) => { if (client.readyState === 1) client.send(text); });
    });
  });
  return wss;
}
