import { describe, expect, it } from "vitest";
import { canSendMarketing } from "./marketing";

const base = {
  consentGranted: true,
  opposition: false,
  selfExcluded: false,
  distressWithin30Days: false,
  capReachedWithin7Days: false,
  sentThisPeriod: 0,
  now: new Date("2026-11-10T11:00:00.000Z"),
};

describe("prospection", () => {
  it("refuse le démarchage téléphonique et l'envoi sans case cochée", () => {
    expect(canSendMarketing({ ...base, channel: "phone" }).ok).toBe(false);
    expect(canSendMarketing({ ...base, channel: "email", consentGranted: false }).ok).toBe(false);
  });

  it("ne cible pas une personne en détresse, auto-exclue ou hors horaire SMS", () => {
    expect(canSendMarketing({ ...base, channel: "sms", distressWithin30Days: true }).ok).toBe(false);
    expect(canSendMarketing({ ...base, channel: "email", selfExcluded: true }).ok).toBe(false);
    expect(canSendMarketing({ ...base, channel: "sms", now: new Date("2026-11-15T21:30:00.000Z") }).ok).toBe(false);
  });
});
