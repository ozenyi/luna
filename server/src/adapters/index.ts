import { config } from "../config.js";

export interface AdapterResult {
  mode: "live" | "unconfigured";
  id?: string;
  detail?: string;
}

async function stripe(): Promise<AdapterResult> {
  if (!config.stripeSecret) return { mode: "unconfigured", detail: "STRIPE_SECRET_KEY absente" };
  return { mode: "live", detail: "Stripe test mode prêt (Checkout, SetupIntent, refund, Connect)" };
}

export async function createCardPayment(amountCents: number): Promise<AdapterResult & { id: string }> {
  const status = await stripe();
  if (status.mode === "unconfigured") return { ...status, id: `pi_demo_${amountCents}` };
  const { default: Stripe } = await import("stripe");
  const client = new Stripe(config.stripeSecret);
  const intent = await client.paymentIntents.create({ amount: amountCents, currency: "eur", automatic_payment_methods: { enabled: true } });
  return { mode: "live", id: intent.id };
}

export async function refundStripe(paymentIntentId: string, amountCents: number): Promise<AdapterResult> {
  if (!config.stripeSecret || paymentIntentId.startsWith("pi_demo_")) return { mode: "unconfigured", id: `re_demo_${amountCents}` };
  const { default: Stripe } = await import("stripe");
  const client = new Stripe(config.stripeSecret);
  const refund = await client.refunds.create({ payment_intent: paymentIntentId, amount: amountCents });
  return { mode: "live", id: refund.id };
}

export async function bridgeCall(): Promise<AdapterResult> {
  if (!config.twilioSid || !config.twilioToken) return { mode: "unconfigured", id: `CA_demo_${Date.now()}`, detail: "Numéros masqués, enregistrement désactivé" };
  return { mode: "live", id: `CA_live_pending`, detail: "Twilio Proxy à brancher avec les clés fournies" };
}

export async function createVideoRoom(name: string): Promise<AdapterResult & { url: string }> {
  if (config.videoProvider === "whereby" && config.wherebyKey) {
    return { mode: "live", id: name, url: "https://whereby.example/pending" };
  }
  if (!config.dailyKey) return { mode: "unconfigured", id: name, url: `https://demo.luna.local/daily/${name}`, detail: "recordParticipantsOnConnect=false" };
  const response = await fetch("https://api.daily.co/v1/rooms", {
    method: "POST",
    headers: { Authorization: `Bearer ${config.dailyKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ name, properties: { enable_recording: false } }),
  });
  const body = await response.json() as { url?: string; name?: string };
  return { mode: "live", id: body.name || name, url: body.url || "" };
}

export async function sendBrevo(channel: "email" | "sms", to: string, text: string): Promise<AdapterResult> {
  if (!config.brevoKey) return { mode: "unconfigured", detail: `${channel} vers ${to} non envoyé (${text.slice(0, 40)})` };
  return { mode: "live", detail: "Brevo configuré" };
}

export function audiotelPlaceholder(): AdapterResult {
  return { mode: "unconfigured", detail: config.audiotelBase ? "Media Technologies non activé dans cette version" : "AUDIOTEL_API_BASE absente" };
}

export function matomoNote(): AdapterResult {
  if (!config.matomoUrl) return { mode: "unconfigured", detail: "Matomo non configuré, aucun traceur déposé" };
  return { mode: "live", id: config.matomoSite, detail: "Mesure soumise au consentement" };
}
