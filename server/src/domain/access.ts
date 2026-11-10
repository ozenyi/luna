export type AccessRole = "client" | "voyant" | "admin";

export interface Actor {
  id: string;
  role: AccessRole;
  voyantId?: string | null;
}

export function canReadUserData(actor: Actor, ownerId: string): boolean {
  if (actor.role === "admin") return true;
  return actor.id === ownerId;
}

export function canManageVoyant(actor: Actor, voyantId: string): boolean {
  if (actor.role === "admin") return true;
  return actor.role === "voyant" && actor.voyantId === voyantId;
}

export function canRefund(actor: Actor): boolean {
  return actor.role === "admin";
}

export function canModerate(actor: Actor): boolean {
  return actor.role === "admin";
}

export interface SupportGrant {
  ticketId: string;
  reason: string;
  expiresAt: string;
}

/** Le support n'ouvre une conversation que sur ticket, avec un motif, pendant 4 heures. */
export function canReadConversation(actor: Actor, clientId: string, voyantId: string, grant: SupportGrant | null, now: Date): boolean {
  if (actor.role === "client") return actor.id === clientId;
  if (actor.role === "voyant") return actor.voyantId === voyantId;
  if (actor.role === "admin") {
    if (!grant) return false;
    return grant.reason.trim().length >= 20 && Boolean(grant.ticketId) && new Date(grant.expiresAt).getTime() > now.getTime();
  }
  return false;
}

export function clientCardForVoyant(person: { pseudonym: string; email: string; phone?: string | null }): { pseudonym: string } {
  return { pseudonym: person.pseudonym };
}
