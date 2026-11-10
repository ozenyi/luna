import { describe, expect, it } from "vitest";
import { canManageVoyant, canModerate, canReadConversation, canReadUserData, canRefund } from "./access";

describe("moindre privilège", () => {
  const client = { id: "u1", role: "client" as const };
  const voyant = { id: "u2", role: "voyant" as const, voyantId: "v2" };
  const admin = { id: "u3", role: "admin" as const };

  it("laisse un client lire ses données et pas celles d'un autre", () => {
    expect(canReadUserData(client, "u1")).toBe(true);
    expect(canReadUserData(client, "u2")).toBe(false);
    expect(canReadUserData(admin, "u2")).toBe(true);
  });

  it("réserve remboursement et modération aux administrateurs", () => {
    expect(canRefund(admin)).toBe(true);
    expect(canRefund(voyant)).toBe(false);
    expect(canModerate(client)).toBe(false);
  });

  it("laisse un voyant gérer uniquement sa fiche", () => {
    expect(canManageVoyant(voyant, "v2")).toBe(true);
    expect(canManageVoyant(voyant, "v9")).toBe(false);
    expect(canManageVoyant(admin, "v9")).toBe(true);
  });

  it("n'ouvre une conversation au support qu'avec un ticket et un motif, quatre heures", () => {
    const now = new Date("2026-11-09T12:00:00.000Z");
    const grant = { ticketId: "t1", reason: "Litige de facturation demandé par le client", expiresAt: "2026-11-09T16:00:00.000Z" };
    expect(canReadConversation(admin, "u1", "v2", grant, now)).toBe(true);
    expect(canReadConversation(admin, "u1", "v2", { ...grant, reason: "court" }, now)).toBe(false);
    expect(canReadConversation(admin, "u1", "v2", { ...grant, expiresAt: "2026-11-09T11:00:00.000Z" }, now)).toBe(false);
    expect(canReadConversation(voyant, "u1", "v2", null, now)).toBe(true);
    expect(canReadConversation(voyant, "u1", "v9", null, now)).toBe(false);
  });
});
