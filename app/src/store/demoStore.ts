import { canReadConversation } from "@domain/access";
import { billElapsed, remainingMs, splitCommission } from "@domain/billing";
import { hasGranted, type ConsentRecord } from "@domain/consent";
import { applyLedgerEntry } from "@domain/ledger";
import { canSpend } from "@domain/limits";
import { canSendMarketing } from "@domain/marketing";
import { cardExpiryValid, evaluateDemoCard, getPack, promoBonus } from "@domain/packs";
import { computeCreditRefund } from "@domain/refund";
import { selectForPurge, type RetainedRecord } from "@domain/retention";
import { sanitizeText } from "@domain/sanitize";
import {
  AI_HUMAN_ANSWER,
  AI_OPENING,
  detectDistress,
  filterAiOutput,
  HUMAN_OPENING,
  isHumanQuestion,
  redactContacts,
  sessionGate,
  truncateIp,
} from "@domain/safety";
import { voyants } from "../data/routes";
import { LEGAL_VERSION } from "../data/legal-copy";
import { DEMO_PASSWORD_HASH, hashPassword, sha256 } from "../lib/hash";

const KEY = "luna.v2.state.v3";
export const DAILY_CAP = 5000;
export const MONTHLY_CAP = 15000;

export interface ConsentEvent {
  id: string;
  userId: string | null;
  purpose: string;
  action: "granted" | "refused" | "withdrawn";
  version: string;
  textSha256: string;
  channel: string;
  uiLocation: string;
  ipTruncated: string | null;
  at: string;
}

export interface User {
  id: string;
  email: string;
  passwordHash: string;
  role: "client" | "voyant" | "admin";
  firstName: string;
  lastName: string;
  pseudonym: string;
  birthDate: string | null;
  phone: string;
  demoRole?: "admin" | "voyant" | "client";
  voyantSlug?: string;
  dailyCapCents: number;
  monthlyCapCents: number;
  pendingCap: { daily: number; monthly: number; at: string } | null;
  selfExclusionUntil: string | null;
  referralCode: string;
  referredBy?: string;
  promoUsed: boolean;
  lunaPlus: "active" | "ended" | null;
  createdAt: string;
  lastActivityAt: string;
  closed: boolean;
}

export interface Payment {
  id: string;
  userId: string;
  packId: string;
  paidCents: number;
  grantedCents: number;
  consumedCents: number;
  refundedCents: number;
  status: "succeeded" | "refunded" | "failed";
  stripePaymentIntentId: string;
  last4: string;
  usableAt: string;
  createdAt: string;
  email: string;
}

export interface LedgerRow {
  id: string;
  userId: string;
  type: string;
  amountCents: number;
  balanceAfter: number;
  ref?: string;
  at: string;
}

export interface Session {
  id: string;
  clientId: string;
  voyantSlug: string;
  channel: "chat" | "call" | "video" | "message";
  rateCentsPerMin: number;
  startedAt: string;
  endedAt?: string;
  billedMinutes: number;
  status: "active" | "ended" | "ended_no_credit" | "ended_cap" | "ended_distress" | "ended_time";
  recordingConsent: boolean;
  recordingPurgeAfter?: string;
  videoRecorded: false;
  twilioCallSid?: string;
  dailyRoom?: string;
  guideKind: "ai" | "human";
  aiDisclosureAt?: string;
  distressPaused: boolean;
  confirmPending: boolean;
  confirmAskedAt?: string;
  confirmedThrough?: number;
  billingHold: boolean;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  sender: "client" | "voyant" | "system";
  body: string;
  at: string;
  locked?: boolean;
}

export interface Booking {
  id: string;
  clientId: string;
  voyantSlug: string;
  start: string;
  durationMin: number;
  priceCents: number;
  status: "confirmed" | "cancelled";
  dailyRoom: string;
  at: string;
}

export interface AuditRow {
  id: string;
  at: string;
  actorId: string | null;
  action: string;
  summary: string;
  prevHash: string;
  rowHash: string;
}

export interface Dispute {
  id: string;
  paymentId: string;
  userId: string;
  email: string;
  reason: string;
  status: "ouverte" | "remboursee" | "rejetee";
  at: string;
}

interface State {
  users: User[];
  balances: Record<string, number>;
  payments: Payment[];
  ledger: LedgerRow[];
  consents: ConsentEvent[];
  sessions: Session[];
  messages: ChatMessage[];
  bookings: Booking[];
  audit: AuditRow[];
  disputes: Dispute[];
  favorites: { userId: string; slug: string }[];
  presence: Record<string, boolean>;
  notifications: { id: string; userId: string; title: string; body: string; read: boolean; at: string }[];
  reports: { id: string; userId: string; target: string; reason: string; at: string }[];
  dataRequests: { id: string; userId: string; type: "export" | "delete"; status: string; at: string }[];
  supportGrants: { id: string; actorId: string; sessionId: string; ticketId: string; reason: string; expiresAt: string }[];
  applications: { id: string; name: string; email: string; practice: string; status: string; country: string; at: string }[];
  outbox: { id: string; channel: string; to: string; body: string; at: string }[];
  subscribers: { email: string; active: boolean }[];
  opposition: string[];
  distressSignals: { id: string; userId: string; category: string; at: string }[];
  invoices: { id: string; number: string; paymentId: string; userId: string; at: string }[];
  currentUserId: string | null;
  pendingOtp: { userId: string; code: string } | null;
  resetTokens: { token: string; userId: string }[];
  commissionBps: number;
  purgeRuns: { at: string; removed: number; archived: number }[];
  capHitAt: Record<string, string | undefined>;
  savedCard: Record<string, { last4: string; exp: string; setupIntentId: string } | undefined>;
}

function uid(prefix: string): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function parisDay(iso: string): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso));
}

function ageYears(birth: string, now = new Date()): number {
  const date = new Date(birth);
  let age = now.getFullYear() - date.getFullYear();
  const month = now.getMonth() - date.getMonth();
  if (month < 0 || (month === 0 && now.getDate() < date.getDate())) age -= 1;
  return age;
}

function seed(): State {
  const now = new Date().toISOString();
  const admin: User = {
    id: "usr_admin", email: "admin@luna.test", passwordHash: DEMO_PASSWORD_HASH, role: "admin",
    firstName: "Camille", lastName: "Morel", pseudonym: "Camille", birthDate: "1988-04-02", phone: "",
    demoRole: "admin", dailyCapCents: DAILY_CAP, monthlyCapCents: MONTHLY_CAP, pendingCap: null,
    selfExclusionUntil: null, referralCode: "LUNAADMIN", promoUsed: false, lunaPlus: null,
    createdAt: now, lastActivityAt: now, closed: false,
  };
  const voyant: User = {
    id: "usr_marc", email: "voyant@luna.test", passwordHash: DEMO_PASSWORD_HASH, role: "voyant",
    firstName: "Marc", lastName: "Démo", pseudonym: "Marc", birthDate: "1984-01-12", phone: "",
    demoRole: "voyant", voyantSlug: "marc", dailyCapCents: DAILY_CAP, monthlyCapCents: MONTHLY_CAP, pendingCap: null,
    selfExclusionUntil: null, referralCode: "LUNAMARC", promoUsed: false, lunaPlus: null,
    createdAt: now, lastActivityAt: now, closed: false,
  };
  const client: User = {
    id: "usr_client", email: "client@luna.test", passwordHash: DEMO_PASSWORD_HASH, role: "client",
    firstName: "Inès", lastName: "Martin", pseudonym: "Inès", birthDate: "1992-06-18", phone: "",
    demoRole: "client", dailyCapCents: DAILY_CAP, monthlyCapCents: MONTHLY_CAP, pendingCap: null,
    selfExclusionUntil: null, referralCode: "LUNAINE", promoUsed: false, lunaPlus: null,
    createdAt: now, lastActivityAt: now, closed: false,
  };
  const presence: Record<string, boolean> = {};
  for (const guide of voyants) presence[guide.slug] = guide.kind === "ai";
  return {
    users: [admin, voyant, client],
    balances: { usr_admin: 0, usr_marc: 0, usr_client: 0 },
    payments: [], ledger: [], consents: [], sessions: [], messages: [], bookings: [], audit: [],
    disputes: [], favorites: [], presence, notifications: [], reports: [], dataRequests: [],
    supportGrants: [], applications: [], outbox: [], subscribers: [], opposition: [], distressSignals: [],
    invoices: [], currentUserId: null, pendingOtp: null, resetTokens: [], commissionBps: 3000,
    purgeRuns: [], capHitAt: {}, savedCard: {},
  };
}

let state: State = seed();
const listeners = new Set<() => void>();

function emit(): void {
  localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((listener) => listener());
}

function audit(actorId: string | null, action: string, summary: string): void {
  const prevHash = state.audit.at(-1)?.rowHash ?? "GENESIS";
  const row = { id: uid("aud"), at: new Date().toISOString(), actorId, action, summary, prevHash, rowHash: "" };
  row.rowHash = `${prevHash}:${action}:${row.at}`.slice(0, 64);
  state.audit = [...state.audit, row];
}

function consentState(userId: string): ConsentRecord[] {
  return state.consents.filter((event) => event.userId === userId).map((event) => ({
    purpose: event.purpose,
    granted: event.action === "granted",
    version: event.version,
    at: event.at,
  }));
}

export function currentConsents(userId: string): ConsentEvent[] {
  return state.consents.filter((event) => event.userId === userId);
}

function excluded(user: User, now = new Date()): boolean {
  if (!user.selfExclusionUntil) return false;
  if (user.selfExclusionUntil === "definitive") return true;
  return new Date(user.selfExclusionUntil).getTime() > now.getTime();
}

function spent(userId: string, period: "day" | "month", now = new Date()): number {
  const day = parisDay(now.toISOString());
  const month = day.slice(0, 7);
  const paid = state.payments.filter((payment) => payment.userId === userId && payment.status !== "failed" && (period === "day" ? parisDay(payment.createdAt) === day : parisDay(payment.createdAt).startsWith(month)));
  const charges = state.ledger.filter((row) => row.userId === userId && row.type === "session_charge" && (period === "day" ? parisDay(row.at) === day : parisDay(row.at).startsWith(month)));
  return paid.reduce((sum, payment) => sum + payment.paidCents, 0) + charges.reduce((sum, row) => sum + Math.abs(row.amountCents), 0);
}

function usableBalance(userId: string, now = new Date()): number {
  const balance = state.balances[userId] ?? 0;
  const locked = state.payments
    .filter((payment) => payment.userId === userId && payment.status === "succeeded" && new Date(payment.usableAt).getTime() > now.getTime())
    .reduce((sum, payment) => sum + Math.max(0, payment.grantedCents - payment.consumedCents), 0);
  return Math.max(0, balance - locked);
}

function moveLedger(userId: string, amount: number, type: string, ref?: string): void {
  const next = applyLedgerEntry(state.balances[userId] ?? 0, amount);
  state.balances[userId] = next.balanceCents;
  state.ledger.push({ id: uid("led"), userId, type, amountCents: amount, balanceAfter: next.balanceAfter, ref, at: new Date().toISOString() });
}

function consume(userId: string, amount: number): void {
  let left = amount;
  for (const payment of state.payments.filter((item) => item.userId === userId && item.status === "succeeded")) {
    const room = payment.grantedCents - payment.consumedCents;
    const use = Math.min(room, left);
    payment.consumedCents += use;
    left -= use;
    if (left <= 0) break;
  }
}

async function recordConsent(userId: string | null, purpose: string, action: ConsentEvent["action"], ui: string, text: string): Promise<void> {
  state.consents.push({
    id: uid("cns"),
    userId,
    purpose,
    action,
    version: LEGAL_VERSION,
    textSha256: await sha256(text),
    channel: "web",
    uiLocation: ui,
    ipTruncated: truncateIp("127.0.0.1"),
    at: new Date().toISOString(),
  });
  audit(userId, action === "granted" ? "consent.granted" : action === "refused" ? "consent.refused" : "consent.withdrawn", purpose);
}

export const store = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  get state(): State {
    return state;
  },
  user(): User | null {
    return state.users.find((user) => user.id === state.currentUserId) ?? null;
  },
  balance(userId = state.currentUserId): number {
    return userId ? state.balances[userId] ?? 0 : 0;
  },
  usable(userId = state.currentUserId): number {
    return userId ? usableBalance(userId) : 0;
  },
  async init(): Promise<void> {
    const saved = localStorage.getItem(KEY);
    state = saved ? (JSON.parse(saved) as State) : seed();
    const overrides = window.__LUNA_TEST_ACCOUNTS__;
    if (overrides) {
      for (const role of ["admin", "voyant", "client"] as const) {
        const next = overrides[role];
        const user = state.users.find((item) => item.demoRole === role);
        if (!next || !user) continue;
        const clash = state.users.find((item) => item.email === next.email.toLowerCase() && item !== user);
        if (clash) clash.email = `archive-${clash.id}@luna.test`;
        user.email = next.email.toLowerCase();
        user.passwordHash = await hashPassword(next.password);
      }
    }
    emit();
  },
  async signup(input: { firstName: string; lastName: string; email: string; password: string; birthDate: string; adult: boolean; cgu: boolean; marketing: Record<string, boolean> }): Promise<string | null> {
    if (!input.adult) return "La déclaration de majorité est obligatoire.";
    if (!input.cgu) return "Les conditions d’utilisation doivent être acceptées.";
    if (input.password.length < 12) return "Le mot de passe doit contenir au moins 12 caractères.";
    if (ageYears(input.birthDate) < 18) {
      audit(null, "signup.blocked_minor", "Tentative refusée, date non conservée");
      emit();
      return "Luna est réservé aux personnes majeures. Le compte n’a pas été créé.";
    }
    const email = input.email.trim().toLowerCase();
    if (state.users.some((user) => user.email === email)) return "Un compte existe déjà avec cet e-mail.";
    const user: User = {
      id: uid("usr"), email, passwordHash: await hashPassword(input.password), role: "client",
      firstName: sanitizeText(input.firstName, 80), lastName: sanitizeText(input.lastName, 80),
      pseudonym: sanitizeText(input.firstName, 40), birthDate: input.birthDate, phone: "",
      dailyCapCents: DAILY_CAP, monthlyCapCents: MONTHLY_CAP, pendingCap: null, selfExclusionUntil: null,
      referralCode: `LUNA${Math.random().toString(36).slice(2, 7).toUpperCase()}`, promoUsed: false, lunaPlus: null,
      createdAt: new Date().toISOString(), lastActivityAt: new Date().toISOString(), closed: false,
    };
    state.users.push(user);
    state.balances[user.id] = 0;
    state.currentUserId = user.id;
    await recordConsent(user.id, "age_18_declaration", "granted", "signup", "age");
    await recordConsent(user.id, "cgu_acceptance", "granted", "signup", "cgu");
    for (const [purpose, granted] of Object.entries(input.marketing)) {
      await recordConsent(user.id, purpose, granted ? "granted" : "refused", "signup", purpose);
    }
    audit(user.id, "auth.login_success", "Inscription");
    emit();
    return null;
  },
  async login(email: string, password: string): Promise<"otp" | "ok" | string> {
    const user = state.users.find((item) => item.email === email.trim().toLowerCase() && !item.closed);
    if (!user || user.passwordHash !== (await hashPassword(password))) {
      audit(null, "auth.login_failed", email);
      emit();
      return "E-mail ou mot de passe incorrect.";
    }
    if (user.role === "admin") {
      state.pendingOtp = { userId: user.id, code: "424242" };
      emit();
      return "otp";
    }
    state.currentUserId = user.id;
    user.lastActivityAt = new Date().toISOString();
    audit(user.id, "auth.login_success", user.role);
    emit();
    return "ok";
  },
  verifyOtp(code: string): string | null {
    if (!state.pendingOtp || state.pendingOtp.code !== code.trim()) return "Code incorrect.";
    state.currentUserId = state.pendingOtp.userId;
    state.pendingOtp = null;
    audit(state.currentUserId, "auth.mfa_enrolled", "Code démo accepté");
    emit();
    return null;
  },
  logout(): void {
    audit(state.currentUserId, "auth.session_revoked", "Déconnexion");
    state.currentUserId = null;
    emit();
  },
  async forgot(email: string): Promise<string> {
    const user = state.users.find((item) => item.email === email.trim().toLowerCase());
    const token = uid("rst");
    if (user) state.resetTokens.push({ token, userId: user.id });
    audit(user?.id ?? null, "auth.password_reset", "Demande");
    emit();
    return token;
  },
  async reset(token: string, password: string): Promise<string | null> {
    const row = state.resetTokens.find((item) => item.token === token);
    if (!row) return "Lien invalide.";
    if (password.length < 12) return "12 caractères minimum.";
    const user = state.users.find((item) => item.id === row.userId);
    if (!user) return "Compte introuvable.";
    user.passwordHash = await hashPassword(password);
    state.resetTokens = state.resetTokens.filter((item) => item.token !== token);
    emit();
    return null;
  },
  async setConsent(purpose: string, granted: boolean, text: string, ui = "settings"): Promise<void> {
    const user = this.user();
    if (!user) return;
    await recordConsent(user.id, purpose, granted ? "granted" : "withdrawn", ui, text);
    if (purpose === "sensitive_data_art9" && !granted) {
      state.sessions.forEach((session) => {
        if (session.clientId === user.id && session.status === "active") session.status = "ended";
      });
    }
    emit();
  },
  async purchase(input: { packId: string; number: string; expiry: string; cvc: string; name: string; cgu: boolean; waiver: boolean; promo?: string; saveCard: boolean }): Promise<string | null> {
    const user = this.user();
    if (!user) return "Connectez-vous pour payer.";
    if (excluded(user)) return "Votre pause est en cours : aucune recharge n’est possible.";
    if (!input.cgu) return "Cochez l’acceptation des conditions de vente.";
    const pack = getPack(input.packId);
    if (!pack) return "Pack inconnu.";
    const card = evaluateDemoCard(input.number);
    if (card === "decline") return "La carte a été refusée (carte de test de refus).";
    if (card !== "ok") return "En mode démonstration, seule la carte de test 4242 4242 4242 4242 est acceptée.";
    if (!cardExpiryValid(input.expiry) || !/^\d{3,4}$/.test(input.cvc.trim()) || input.name.trim().length < 2) return "Vérifiez la date d’expiration, le cryptogramme et le nom.";
    const promo = promoBonus(input.promo, user.promoUsed);
    if (promo.error === "CODE_INCONNU") return "Code inconnu.";
    if (promo.error === "CODE_DEJA_UTILISE") return "Code déjà utilisé.";
    const now = new Date();
    const gate = canSpend({
      balanceCents: 1_000_000_000,
      amountCents: pack.payCents,
      spentTodayCents: spent(user.id, "day", now),
      spentMonthCents: spent(user.id, "month", now),
      dailyLimitCents: user.dailyCapCents,
      monthlyLimitCents: user.monthlyCapCents,
      pausedUntil: user.selfExclusionUntil === "definitive" ? "2999-01-01" : user.selfExclusionUntil,
      now,
    });
    if (!gate.ok && gate.reason !== "FUNDS") return "Cette recharge dépasse le plafond que vous vous êtes fixé. Aucune proposition d’augmentation n’est faite ici.";
    const granted = pack.creditCents + promo.bonusCents;
    const payment: Payment = {
      id: uid("pay"), userId: user.id, packId: pack.id, paidCents: pack.payCents, grantedCents: granted,
      consumedCents: 0, refundedCents: 0, status: "succeeded", stripePaymentIntentId: `pi_demo_${uid("x")}`,
      last4: "4242", usableAt: input.waiver ? now.toISOString() : new Date(now.getTime() + 14 * 86400000).toISOString(),
      createdAt: now.toISOString(), email: user.email,
    };
    state.payments.push(payment);
    moveLedger(user.id, pack.payCents, "pack_purchase", payment.id);
    if (granted > pack.payCents) moveLedger(user.id, granted - pack.payCents, "pack_bonus", payment.id);
    state.invoices.push({ id: uid("inv"), number: `LUN-2026-${String(state.invoices.length + 1).padStart(4, "0")}`, paymentId: payment.id, userId: user.id, at: now.toISOString() });
    state.disputes.push({ id: uid("dsp"), paymentId: payment.id, userId: user.id, email: user.email, reason: "Paiement capturé — remboursement possible", status: "ouverte", at: now.toISOString() });
    if (promo.bonusCents) user.promoUsed = true;
    if (input.saveCard) state.savedCard[user.id] = { last4: "4242", exp: input.expiry, setupIntentId: `seti_demo_${uid("s")}` };
    await recordConsent(user.id, "cgv_acceptance", "granted", "checkout", "cgv");
    await recordConsent(user.id, "withdrawal_waiver", input.waiver ? "granted" : "refused", "checkout", "waiver");
    state.outbox.push({ id: uid("mail"), channel: "email", to: user.email, body: `Confirmation de commande ${payment.stripePaymentIntentId}. Exécution immédiate : ${input.waiver ? "oui" : "non"}.`, at: now.toISOString() });
    audit(user.id, "wallet.topup", payment.id);
    const split = splitCommission(pack.payCents, state.commissionBps);
    audit(user.id, "payout.created", `Commission plateforme ${split.platformCents} c, guide ${split.voyantCents} c (Connect simulé)`);
    emit();
    return null;
  },
  refund(paymentId: string): string | null {
    const actor = this.user();
    if (!actor || actor.role !== "admin") return "Réservé à l’administration.";
    const payment = state.payments.find((item) => item.id === paymentId);
    if (!payment || payment.status === "refunded") return "Paiement introuvable.";
    const result = computeCreditRefund({
      paidCents: payment.paidCents,
      grantedCents: payment.grantedCents,
      consumedCents: payment.consumedCents,
      alreadyRefundedCents: payment.refundedCents,
      walletBalanceCents: state.balances[payment.userId] ?? 0,
    });
    if (result.refundCents <= 0) return "Rien à rembourser.";
    moveLedger(payment.userId, -result.walletDebitCents, "refund_clawback", payment.id);
    payment.refundedCents += result.refundCents;
    payment.status = "refunded";
    const dispute = state.disputes.find((item) => item.paymentId === payment.id);
    if (dispute) dispute.status = "remboursee";
    audit(actor.id, "wallet.refund", `${payment.id} ${result.refundCents}`);
    emit();
    return null;
  },
  async startSession(slug: string, channel: Session["channel"]): Promise<string | null> {
    const user = this.user();
    const guide = voyants.find((item) => item.slug === slug);
    if (!user || !guide) return "Connexion requise.";
    if (user.role !== "client") return "Utilisez un compte client pour consulter.";
    if (excluded(user)) return "Votre pause est en cours.";
    if (!hasGranted(consentState(user.id), "sensitive_data_art9")) return "CONSENT";
    const rate = channel === "call" ? guide.demoCallCents : channel === "video" ? guide.demoVideoCents : guide.demoChatCents;
    const now = new Date();
    const gate = canSpend({
      balanceCents: usableBalance(user.id, now), amountCents: rate,
      spentTodayCents: spent(user.id, "day", now), spentMonthCents: spent(user.id, "month", now),
      dailyLimitCents: user.dailyCapCents, monthlyLimitCents: user.monthlyCapCents,
      pausedUntil: user.selfExclusionUntil, now,
    });
    if (!gate.ok) return gate.reason === "FUNDS" ? "Crédit utilisable insuffisant pour une minute." : "Plafond atteint. La séance ne démarre pas.";
    const session: Session = {
      id: uid("ses"), clientId: user.id, voyantSlug: slug, channel, rateCentsPerMin: rate,
      startedAt: now.toISOString(), billedMinutes: 0, status: "active", recordingConsent: false,
      videoRecorded: false, guideKind: guide.kind, distressPaused: false, confirmPending: false, billingHold: false,
      twilioCallSid: channel === "call" ? `CA${uid("twilio")}` : undefined,
      dailyRoom: channel === "video" ? `luna-${slug}-${uid("room")}` : undefined,
      aiDisclosureAt: guide.kind === "ai" ? now.toISOString() : undefined,
    };
    const billed = billElapsed({ balanceCents: usableBalance(user.id, now), rateCentsPerMin: rate, elapsedMs: 0, billedMinutes: 0 });
    moveLedger(user.id, -billed.chargedCents, "session_charge", session.id);
    consume(user.id, billed.chargedCents);
    session.billedMinutes = billed.billedMinutes;
    state.sessions.push(session);
    const opening = guide.kind === "ai" ? AI_OPENING : HUMAN_OPENING(guide.name);
    state.messages.push({ id: uid("msg"), sessionId: session.id, sender: "system", body: opening, at: now.toISOString(), locked: true });
    audit(user.id, "wallet.debit_session", session.id);
    emit();
    return session.id;
  },
  tick(sessionId: string, nowMs = Date.now()): void {
    const session = state.sessions.find((item) => item.id === sessionId);
    if (!session || session.status !== "active") return;
    if (session.distressPaused || session.billingHold || session.confirmPending) {
      if (session.confirmPending && session.confirmAskedAt && nowMs - new Date(session.confirmAskedAt).getTime() > 60000) {
        session.status = "ended_time";
        session.endedAt = new Date(nowMs).toISOString();
        audit(session.clientId, "session.time_alert_shown", "Fin sans confirmation");
        emit();
      }
      return;
    }
    const elapsed = nowMs - new Date(session.startedAt).getTime();
    const elapsedMin = Math.floor(elapsed / 60000);
    const gate = sessionGate(elapsedMin);
    if (gate === "hard_stop") {
      session.status = "ended_time";
      session.endedAt = new Date(nowMs).toISOString();
      emit();
      return;
    }
    if (gate === "confirm" && (session.confirmedThrough ?? -1) < elapsedMin) {
      session.confirmPending = true;
      session.confirmAskedAt = new Date(nowMs).toISOString();
      session.billingHold = true;
      audit(session.clientId, "session.time_alert_shown", `${elapsedMin} min`);
      emit();
      return;
    }
    const before = session.billedMinutes;
    const result = billElapsed({
      balanceCents: usableBalance(session.clientId),
      rateCentsPerMin: session.rateCentsPerMin,
      elapsedMs: elapsed,
      billedMinutes: session.billedMinutes,
    });
    const user = state.users.find((item) => item.id === session.clientId)!;
    if (result.chargedCents > 0) {
      const cap = canSpend({
        balanceCents: usableBalance(session.clientId), amountCents: result.chargedCents,
        spentTodayCents: spent(session.clientId, "day"), spentMonthCents: spent(session.clientId, "month"),
        dailyLimitCents: user.dailyCapCents, monthlyLimitCents: user.monthlyCapCents, pausedUntil: user.selfExclusionUntil, now: new Date(nowMs),
      });
      if (!cap.ok) {
        session.status = cap.reason === "FUNDS" ? "ended_no_credit" : "ended_cap";
        session.endedAt = new Date(nowMs).toISOString();
        if (cap.reason !== "FUNDS") state.capHitAt[session.clientId] = new Date(nowMs).toISOString();
        audit(session.clientId, "limit.reached", session.status);
        emit();
        return;
      }
      moveLedger(session.clientId, -result.chargedCents, "session_charge", session.id);
      consume(session.clientId, result.chargedCents);
      session.billedMinutes = result.billedMinutes;
    }
    if (result.status === "stopped_no_credit" && result.billedMinutes === before) {
      session.status = "ended_no_credit";
      session.endedAt = new Date(nowMs).toISOString();
    }
    if (session.billedMinutes !== before || session.status !== "active") emit();
  },
  continueSession(sessionId: string): void {
    const session = state.sessions.find((item) => item.id === sessionId);
    if (!session) return;
    session.confirmPending = false;
    session.billingHold = false;
    session.confirmedThrough = Math.floor((Date.now() - new Date(session.startedAt).getTime()) / 60000) + 14;
    audit(session.clientId, "session.continue_confirmed", sessionId);
    emit();
  },
  endSession(sessionId: string): void {
    const session = state.sessions.find((item) => item.id === sessionId);
    if (!session || session.status !== "active") return;
    session.status = "ended";
    session.endedAt = new Date().toISOString();
    const gross = session.billedMinutes * session.rateCentsPerMin;
    const split = splitCommission(gross, state.commissionBps);
    audit(session.clientId, "payout.created", `tr_demo séance ${split.voyantCents}/${split.platformCents}`);
    emit();
  },
  sendMessage(sessionId: string, text: string): void {
    const session = state.sessions.find((item) => item.id === sessionId);
    const user = this.user();
    if (!session || !user || session.status !== "active") return;
    const clean = redactContacts(sanitizeText(text, 2000));
    state.messages.push({ id: uid("msg"), sessionId, sender: "client", body: clean.text, at: new Date().toISOString() });
    if (clean.redacted) audit(user.id, "chat.contact_info_redacted", sessionId);
    const distress = detectDistress(text);
    if (distress.detected) {
      session.distressPaused = true;
      session.billingHold = true;
      if (session.billedMinutes > 0) {
        moveLedger(session.clientId, session.rateCentsPerMin, "distress_reversal", session.id);
        session.billedMinutes -= 1;
      }
      state.distressSignals.push({ id: uid("dst"), userId: user.id, category: distress.category ?? "suicide", at: new Date().toISOString() });
      state.messages.push({
        id: uid("msg"), sessionId, sender: "system", locked: true, at: new Date().toISOString(),
        body: "Vous n’êtes pas seul(e). Si vous pensez au suicide ou si vous êtes en danger, appelez le 3114 (gratuit, 24 h/24), le 15 ou le 112, ou le 3919. Luna n’est pas un service d’urgence. La facturation de cette séance est suspendue.",
      });
      audit(user.id, "distress.detected", distress.category ?? "");
      audit(user.id, "distress.billing_paused", sessionId);
      emit();
      return;
    }
    const guide = voyants.find((item) => item.slug === session.voyantSlug);
    if (guide?.kind === "ai") {
      const answer = isHumanQuestion(text)
      ? { text: AI_HUMAN_ANSWER, blocked: false }
      : filterAiOutput("Cette carte évoque un temps pour poser la question autrement, sans rien prédire. Qu’est-ce qui vous semble le plus juste, là, maintenant ?");
      if (answer.blocked) audit(user.id, "ai.output_blocked", sessionId);
      state.messages.push({ id: uid("msg"), sessionId, sender: "voyant", body: answer.text, at: new Date().toISOString() });
    } else {
      state.messages.push({ id: uid("msg"), sessionId, sender: "voyant", body: "Réponse simulée du guide fictif. Je peux seulement vous aider à formuler la question, sans prédire ce qui arrivera.", at: new Date().toISOString() });
    }
    emit();
  },
  setRecording(sessionId: string, agree: boolean): void {
    const session = state.sessions.find((item) => item.id === sessionId);
    if (!session || session.channel === "video") return;
    session.recordingConsent = agree;
    session.videoRecorded = false;
    if (agree) session.recordingPurgeAfter = new Date(Date.now() + 30 * 86400000).toISOString();
    else session.recordingPurgeAfter = undefined;
    emit();
  },
  book(slug: string, start: string): string | null {
    const user = this.user();
    const guide = voyants.find((item) => item.slug === slug);
    if (!user || !guide) return "Connexion requise.";
    if (!hasGranted(consentState(user.id), "sensitive_data_art9")) return "CONSENT";
    if (excluded(user)) return "Pause en cours.";
    const price = guide.demoVideoCents * 10;
    if (usableBalance(user.id) < price) return "Crédit utilisable insuffisant. Le paiement se fait avant la consultation.";
    const cap = canSpend({
      balanceCents: usableBalance(user.id), amountCents: price, spentTodayCents: spent(user.id, "day"),
      spentMonthCents: spent(user.id, "month"), dailyLimitCents: user.dailyCapCents, monthlyLimitCents: user.monthlyCapCents,
      pausedUntil: user.selfExclusionUntil, now: new Date(),
    });
    if (!cap.ok) return "Plafond ou crédit insuffisant.";
    moveLedger(user.id, -price, "session_charge", slug);
    consume(user.id, price);
    state.bookings.push({ id: uid("bk"), clientId: user.id, voyantSlug: slug, start, durationMin: 10, priceCents: price, status: "confirmed", dailyRoom: `luna-${slug}-${uid("daily")}`, at: new Date().toISOString() });
    audit(user.id, "wallet.debit_session", "visio prépayée");
    emit();
    return null;
  },
  report(target: string, reason: string): void {
    const user = this.user();
    if (!user) return;
    state.reports.push({ id: uid("rpt"), userId: user.id, target, reason: sanitizeText(reason, 500), at: new Date().toISOString() });
    emit();
  },
  setCap(daily: number, monthly: number): string | null {
    const user = this.user();
    if (!user) return "Connexion requise.";
    if (daily < 0 || monthly < 0 || daily > 15000 || monthly > 50000) return "Montant hors plage.";
    if (daily <= user.dailyCapCents && monthly <= user.monthlyCapCents) {
      user.dailyCapCents = daily;
      user.monthlyCapCents = monthly;
      user.pendingCap = null;
      audit(user.id, "limit.changed", "Baisse immédiate");
      emit();
      return null;
    }
    user.pendingCap = { daily, monthly, at: new Date(Date.now() + 72 * 3600000).toISOString() };
    audit(user.id, "limit.changed", "Hausse différée de 72 h");
    emit();
    return null;
  },
  exclude(until: string): void {
    const user = this.user();
    if (!user) return;
    user.selfExclusionUntil = until;
    audit(user.id, "self_exclusion.started", until);
    emit();
  },
  toggleFavorite(slug: string): void {
    const user = this.user();
    if (!user) return;
    const exists = state.favorites.find((item) => item.userId === user.id && item.slug === slug);
    state.favorites = exists ? state.favorites.filter((item) => item !== exists) : [...state.favorites, { userId: user.id, slug }];
    emit();
  },
  setPresence(slug: string, online: boolean): void {
    const user = this.user();
    if (!user || (user.role === "voyant" && user.voyantSlug !== slug)) return;
    state.presence[slug] = online;
    if (online) {
      for (const fav of state.favorites.filter((item) => item.slug === slug)) {
        state.notifications.push({ id: uid("ntf"), userId: fav.userId, title: "Présence simulée", body: "Un guide favori a changé sa disponibilité simulée.", read: false, at: new Date().toISOString() });
      }
    }
    emit();
  },
  subscribeNews(email: string, granted: boolean): string | null {
    if (!granted) return "Cochez l’accord pour recevoir les e-mails de Luna.";
    state.subscribers.push({ email: email.trim().toLowerCase(), active: true });
    emit();
    return null;
  },
  unsubscribe(email: string): void {
    const key = email.trim().toLowerCase();
    state.subscribers.forEach((item) => { if (item.email === key) item.active = false; });
    if (!state.opposition.includes(key)) state.opposition.push(key);
    const user = state.users.find((item) => item.email === key);
    if (user) void recordConsent(user.id, "marketing_email", "withdrawn", "email_link", "stop").then(() => emit());
    else emit();
  },
  sendCampaign(): string {
    const now = new Date();
    let sent = 0;
    for (const sub of state.subscribers.filter((item) => item.active)) {
      const user = state.users.find((item) => item.email === sub.email);
      const distress = user ? state.distressSignals.some((signal) => signal.userId === user.id && now.getTime() - new Date(signal.at).getTime() < 30 * 86400000) : false;
      const cap = user ? Boolean(state.capHitAt[user.id] && now.getTime() - new Date(state.capHitAt[user.id]!).getTime() < 7 * 86400000) : false;
      const decision = canSendMarketing({
        channel: "email",
        consentGranted: user ? hasGranted(consentState(user.id), "marketing_email") : true,
        opposition: state.opposition.includes(sub.email),
        selfExcluded: user ? excluded(user) : false,
        distressWithin30Days: distress,
        capReachedWithin7Days: cap,
        sentThisPeriod: 0,
        now,
      });
      if (decision.ok) {
        state.outbox.push({ id: uid("out"), channel: "email", to: sub.email, body: "Offre de Luna ([RAISON SOCIALE]). Se désinscrire.", at: now.toISOString() });
        sent += 1;
      }
    }
    emit();
    return `${sent} message(s) simulé(s). Aucun envoi réel.`;
  },
  apply(input: { name: string; email: string; practice: string; country: string }): string | null {
    if (!input.country.trim()) return "Le pays d’établissement est obligatoire.";
    state.applications.push({ id: uid("app"), name: sanitizeText(input.name, 80), email: input.email.trim().toLowerCase(), practice: sanitizeText(input.practice, 500), status: "pending", country: sanitizeText(input.country, 80), at: new Date().toISOString() });
    emit();
    return null;
  },
  decideApplication(id: string, status: string): void {
    const actor = this.user();
    const application = state.applications.find((item) => item.id === id);
    if (!actor || actor.role !== "admin" || !application) return;
    if (!/ue|eee|france|belgique|allemagne|espagne|italie|portugal|pays-bas|irlande/i.test(application.country) && status === "approved") {
      audit(actor.id, "guide.suspended", "Transfert hors UE sans garantie");
      emit();
      return;
    }
    application.status = status;
    audit(actor.id, status === "approved" ? "guide.activated" : "guide.suspended", id);
    emit();
  },
  openSupport(sessionId: string, ticketId: string, reason: string): string | null {
    const actor = this.user();
    if (!actor || actor.role !== "admin") return "Réservé à l’administration.";
    const session = state.sessions.find((item) => item.id === sessionId);
    if (!session) return "Séance introuvable.";
    const expiresAt = new Date(Date.now() + 4 * 3600000).toISOString();
    const grant = { ticketId, reason, expiresAt };
    if (!canReadConversation({ id: actor.id, role: "admin" }, session.clientId, session.voyantSlug, grant, new Date())) return "Ticket et motif d’au moins 20 caractères requis.";
    state.supportGrants.push({ id: uid("grt"), actorId: actor.id, sessionId, ticketId, reason, expiresAt });
    audit(actor.id, "support.conversation_access", `${ticketId} ${sessionId}`);
    const client = state.users.find((item) => item.id === session.clientId);
    if (client) state.notifications.push({ id: uid("ntf"), userId: client.id, title: "Accès du support", body: `Un membre du support a consulté votre conversation dans le cadre de votre demande ${ticketId}.`, read: false, at: new Date().toISOString() });
    emit();
    return null;
  },
  requestData(type: "export" | "delete"): void {
    const user = this.user();
    if (!user) return;
    state.dataRequests.push({ id: uid("dsr"), userId: user.id, type, status: "recue", at: new Date().toISOString() });
    audit(user.id, "dsr.request_received", type);
    emit();
  },
  resolveData(id: string): void {
    const actor = this.user();
    const request = state.dataRequests.find((item) => item.id === id);
    if (!actor || actor.role !== "admin" || !request) return;
    request.status = "traitee";
    if (request.type === "delete") {
      const user = state.users.find((item) => item.id === request.userId);
      if (user) {
        user.closed = true;
        user.email = `deleted-${user.id}@anonymise.luna`;
        user.firstName = "Anonyme";
        user.phone = "";
        user.birthDate = null;
        state.messages = state.messages.filter((message) => !state.sessions.some((session) => session.id === message.sessionId && session.clientId === user.id));
      }
      audit(actor.id, "user.anonymized", request.userId);
    }
    audit(actor.id, "dsr.completed", id);
    emit();
  },
  runPurge(now = new Date()): { removed: number; archived: number } {
    const records: RetainedRecord[] = [
      ...state.messages.map((message) => ({ id: message.id, category: "message" as const, at: message.at })),
      ...state.sessions.filter((session) => session.recordingConsent).map((session) => ({ id: session.id, category: "recording" as const, at: session.recordingPurgeAfter ? new Date(new Date(session.recordingPurgeAfter).getTime() - 31 * 86400000).toISOString() : session.startedAt })),
      ...state.users.map((user) => ({ id: user.id, category: "account" as const, at: user.lastActivityAt, inactive: new Date(user.lastActivityAt).getTime() < now.getTime() - 730 * 86400000 })),
      ...state.audit.map((row) => ({ id: row.id, category: "audit" as const, at: row.at })),
      ...state.subscribers.map((sub) => ({ id: sub.email, category: "prospect" as const, at: now.toISOString() })),
      ...state.invoices.map((invoice) => ({ id: invoice.id, category: "accounting" as const, at: invoice.at, archived: false })),
    ];
    const result = selectForPurge(records, { messagesDays: 365, recordingsDays: 30, serverLogsDays: 365, inactiveAccountDays: 730, auditLogDays: 365, prospectsDays: 1095, accountingArchiveDays: 3650 }, now);
    state.messages = state.messages.filter((message) => !result.removed.includes(message.id));
    state.purgeRuns.push({ at: now.toISOString(), removed: result.removed.length, archived: result.archived.length });
    audit(this.user()?.id ?? null, "retention.purged", `${result.removed.length} supprimés, ${result.archived.length} archivés`);
    emit();
    return { removed: result.removed.length, archived: result.archived.length };
  },
  exportJson(): string {
    const user = this.user();
    if (!user) return "{}";
    audit(user.id, "export.generated", user.id);
    emit();
    return JSON.stringify({ profil: { pseudonym: user.pseudonym, email: user.email, plafonds: { jour: user.dailyCapCents, mois: user.monthlyCapCents } }, consentements: currentConsents(user.id), portefeuille: state.ledger.filter((row) => row.userId === user.id) }, null, 2);
  },
  clientForVoyant(userId: string): { pseudonym: string } | null {
    const person = state.users.find((item) => item.id === userId);
    return person ? { pseudonym: person.pseudonym } : null;
  },
  remaining(session: Session, nowMs: number): number {
    return remainingMs({
      startedAtMs: new Date(session.startedAt).getTime(),
      billedMinutes: session.billedMinutes,
      balanceCents: usableBalance(session.clientId),
      rateCentsPerMin: session.rateCentsPerMin,
      nowMs,
    });
  },
};

export type StoreSnapshot = State;
