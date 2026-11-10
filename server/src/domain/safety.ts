const DISTRESS: { pattern: RegExp; category: "suicide" | "self_harm" | "violence" }[] = [
  { pattern: /me suicider|id[ée]es? suicidaires?|je veux mourir|envie de mourir|mettre fin [àa] mes jours|plus envie de vivre|en finir avec la vie/i, category: "suicide" },
  { pattern: /me faire du mal|scarification|overdose/i, category: "self_harm" },
  { pattern: /il me bat|elle me bat|violences?( conjugales?)?|me frappe/i, category: "violence" },
];

/** Ne renvoie qu'une catégorie, jamais le texte source. */
export function detectDistress(text: string): { detected: boolean; category: "suicide" | "self_harm" | "violence" | null } {
  for (const rule of DISTRESS) {
    if (rule.pattern.test(text)) return { detected: true, category: rule.category };
  }
  return { detected: false, category: null };
}

export function isHumanQuestion(text: string): boolean {
  return /(es[-\s]?tu|êtes[-\s]?vous|t['’]es).{0,24}humain|tu es (un |une )?(humain|personne|vraie personne)|êtes-vous (un |une )?(humain|personne)|are you human/i.test(
    text,
  );
}

export const AI_HUMAN_ANSWER =
  "Je suis une intelligence artificielle, et non une personne. Mes réponses sont générées automatiquement, elles peuvent être inexactes, et elles relèvent du divertissement. Elles ne remplacent pas un professionnel.";

const BANNED_OUTPUT = /garanti[e]?|c['’]est certain|sortil[èe]ge|envo[ûu]tement|rechargez|ne partez pas|tu as besoin de moi|mal[ée]diction/i;

export function filterAiOutput(text: string): { text: string; blocked: boolean } {
  if (BANNED_OUTPUT.test(text)) {
    return {
      text: "Je ne peux pas dire cela. Je propose seulement une lecture symbolique, sans certitude et sans vous inciter à poursuivre.",
      blocked: true,
    };
  }
  return { text, blocked: false };
}

export function sessionGate(elapsedMinutes: number, hardAt = 30, step = 15, maxMinutes = 60): "ok" | "confirm" | "hard_stop" {
  if (elapsedMinutes >= maxMinutes) return "hard_stop";
  if (elapsedMinutes >= hardAt && (elapsedMinutes - hardAt) % step === 0) return "confirm";
  return "ok";
}

export function redactContacts(text: string): { text: string; redacted: boolean } {
  const next = text
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[coordonnées masquées]")
    .replace(/(?:\+33|0)\s*[1-9](?:[\s.-]*\d{2}){4}/g, "[coordonnées masquées]");
  return { text: next, redacted: next !== text };
}

export function truncateIp(ip: string | null | undefined): string | null {
  if (!ip) return null;
  const clean = ip.replace(/^::ffff:/, "");
  if (clean.includes(".")) {
    const parts = clean.split(".");
    if (parts.length === 4) return `${parts[0]}.${parts[1]}.${parts[2]}.0`;
  }
  if (clean.includes(":")) {
    const parts = clean.split(":");
    return `${parts.slice(0, 3).join(":")}::`;
  }
  return null;
}

export const AI_OPENING =
  "Vous échangez avec une intelligence artificielle, et non avec une personne. Ses réponses sont générées automatiquement et peuvent être inexactes. Elles relèvent du divertissement et ne remplacent pas un professionnel.";

export const HUMAN_OPENING = (name: string) =>
  `Vous échangez avec ${name}, guide humain(e) indépendant(e). Cette séance est une simulation : ce profil est fictif.`;

export const ENTERTAINMENT_DISCLAIMER =
  "La voyance et la guidance sont proposées à titre de divertissement et de réflexion personnelle. Elles ne prédisent pas l’avenir avec certitude et ne remplacent pas l’avis d’un médecin, d’un psychologue, d’un avocat ou d’un conseiller financier. Service réservé aux personnes majeures.";
