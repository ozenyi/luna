export type MarketingChannel = "email" | "sms" | "whatsapp" | "push" | "phone";

export function canSendMarketing(input: {
  channel: MarketingChannel;
  consentGranted: boolean;
  opposition: boolean;
  selfExcluded: boolean;
  distressWithin30Days: boolean;
  capReachedWithin7Days: boolean;
  sentThisPeriod: number;
  now: Date;
}): { ok: true } | { ok: false; reason: string } {
  if (input.channel === "phone") return { ok: false, reason: "DEMARCHAGE_TELEPHONIQUE_INTERDIT" };
  if (input.opposition || !input.consentGranted) return { ok: false, reason: "PAS_DE_CONSENTEMENT" };
  if (input.selfExcluded) return { ok: false, reason: "AUTO_EXCLUSION" };
  if (input.distressWithin30Days) return { ok: false, reason: "DETRESSE_RECENTE" };
  if (input.capReachedWithin7Days) return { ok: false, reason: "PLAFOND_RECENT" };
  const hour = Number(new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", hour: "numeric", hourCycle: "h23" }).format(input.now));
  const weekday = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Paris", weekday: "short" }).format(input.now);
  const day = weekday === "Sun" ? 0 : 1;
  if (input.channel === "sms") {
    if (day === 0 || hour < 10 || hour >= 20) return { ok: false, reason: "HORS_HORAIRE" };
    if (input.sentThisPeriod >= 2) return { ok: false, reason: "FREQUENCE" };
  }
  if (input.channel === "email" && input.sentThisPeriod >= 2) return { ok: false, reason: "FREQUENCE" };
  if ((input.channel === "whatsapp" || input.channel === "push") && input.sentThisPeriod >= 2) {
    return { ok: false, reason: "FREQUENCE" };
  }
  return { ok: true };
}
