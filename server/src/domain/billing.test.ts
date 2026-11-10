import { describe, expect, it } from "vitest";
import { billElapsed, remainingMs, shouldWarn, splitCommission } from "./billing";

describe("facturation à la minute", () => {
  it("prélève la première minute au démarrage", () => {
    const result = billElapsed({ balanceCents: 2200, rateCentsPerMin: 290, elapsedMs: 0, billedMinutes: 0 });
    expect(result).toMatchObject({ balanceCents: 1910, billedMinutes: 1, chargedCents: 290, status: "running" });
  });

  it("ne facture pas deux fois la même minute", () => {
    const once = billElapsed({ balanceCents: 2200, rateCentsPerMin: 290, elapsedMs: 0, billedMinutes: 0 });
    const twice = billElapsed({
      balanceCents: once.balanceCents,
      rateCentsPerMin: 290,
      elapsedMs: 59000,
      billedMinutes: once.billedMinutes,
    });
    expect(twice.chargedCents).toBe(0);
    expect(twice.billedMinutes).toBe(1);
    expect(twice.status).toBe("running");
  });

  it("rattrape plusieurs minutes puis s'arrête faute de crédit", () => {
    const result = billElapsed({ balanceCents: 500, rateCentsPerMin: 200, elapsedMs: 5 * 60000, billedMinutes: 0 });
    expect(result).toMatchObject({ balanceCents: 100, billedMinutes: 2, chargedCents: 400, status: "stopped_no_credit" });
  });

  it("refuse un tarif nul", () => {
    expect(billElapsed({ balanceCents: 1000, rateCentsPerMin: 0, elapsedMs: 0, billedMinutes: 0 }).status).toBe("invalid_rate");
  });

  it("fait décroître le temps restant sans saut au fil des secondes", () => {
    const started = 1_700_000_000_000;
    const atStart = remainingMs({
      startedAtMs: started,
      billedMinutes: 1,
      balanceCents: 1910,
      rateCentsPerMin: 290,
      nowMs: started,
    });
    const later = remainingMs({
      startedAtMs: started,
      billedMinutes: 1,
      balanceCents: 1910,
      rateCentsPerMin: 290,
      nowMs: started + 1000,
    });
    expect(atStart).toBe(7 * 60000);
    expect(later).toBe(atStart - 1000);
    expect(shouldWarn(60000)).toBe(true);
    expect(shouldWarn(60001)).toBe(false);
    expect(shouldWarn(0)).toBe(false);
  });
});

describe("répartition de commission", () => {
  it("laisse la plateforme à 30 % et le voyant à 70 %, au centime près", () => {
    expect(splitCommission(1000, 3000)).toEqual({ platformCents: 300, voyantCents: 700 });
    expect(splitCommission(1, 3000)).toEqual({ platformCents: 0, voyantCents: 1 });
    const split = splitCommission(999, 3000);
    expect(split.platformCents + split.voyantCents).toBe(999);
  });

  it("rejette un taux hors barème", () => {
    expect(() => splitCommission(100, -1)).toThrow(/COMMISSION_INVALIDE/);
    expect(() => splitCommission(100, 10001)).toThrow(/COMMISSION_INVALIDE/);
    expect(() => splitCommission(-1, 3000)).toThrow(/MONTANT_INVALIDE/);
  });
});
