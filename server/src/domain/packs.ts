export const PACKS = [
  { id: "p20", payCents: 2000, creditCents: 2200, name: "Essentiel" },
  { id: "p50", payCents: 5000, creditCents: 5800, name: "Équilibre" },
  { id: "p100", payCents: 10000, creditCents: 12000, name: "Horizon" },
] as const;

export type PackId = (typeof PACKS)[number]["id"];

export function getPack(id: string) {
  return PACKS.find((pack) => pack.id === id) ?? null;
}

export function promoBonus(code: string | undefined, alreadyUsed: boolean): { bonusCents: number; error?: string } {
  if (!code || !code.trim()) return { bonusCents: 0 };
  const normalized = code.trim().toUpperCase();
  if (normalized !== "BIENVENUE") return { bonusCents: 0, error: "CODE_INCONNU" };
  if (alreadyUsed) return { bonusCents: 0, error: "CODE_DEJA_UTILISE" };
  return { bonusCents: 500 };
}

export const REFERRAL_REWARD_CENTS = 500;

export const DEFAULT_COMMISSION_BPS = 3000;
export const CONSENT_VERSION = "2026-11";
export const DEMO_STRIPE_CARD = "4242424242424242";
export const DEMO_STRIPE_DECLINE = "4000000000000002";

export function normalizeCardNumber(value: string): string {
  return value.replace(/[\s-]/g, "");
}

export function evaluateDemoCard(number: string): "ok" | "decline" | "invalid" {
  const digits = normalizeCardNumber(number);
  if (digits === DEMO_STRIPE_CARD) return "ok";
  if (digits === DEMO_STRIPE_DECLINE) return "decline";
  return "invalid";
}

export function cardExpiryValid(expiry: string, now = new Date()): boolean {
  const match = expiry.trim().match(/^(\d{2})\s*\/\s*(\d{2}|\d{4})$/);
  if (!match) return false;
  const month = Number(match[1]);
  if (month < 1 || month > 12) return false;
  const year = match[2].length === 2 ? 2000 + Number(match[2]) : Number(match[2]);
  const end = new Date(year, month, 1);
  return end.getTime() > now.getTime();
}
