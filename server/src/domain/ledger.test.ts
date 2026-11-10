import { describe, expect, it } from "vitest";
import { applyLedgerEntry, assertLedger } from "./ledger";

describe("grand livre du portefeuille", () => {
  it("crédite puis débite en conservant le solde courant", () => {
    const first = applyLedgerEntry(0, 2000);
    const second = applyLedgerEntry(first.balanceCents, 200);
    const third = applyLedgerEntry(second.balanceCents, -290);
    const entries = [
      { amountCents: 2000, balanceAfter: first.balanceAfter },
      { amountCents: 200, balanceAfter: second.balanceAfter },
      { amountCents: -290, balanceAfter: third.balanceAfter },
    ];
    expect(assertLedger(entries)).toBe(1910);
    expect(third.balanceCents).toBe(1910);
  });

  it("refuse un débit supérieur au solde et un montant non entier", () => {
    expect(() => applyLedgerEntry(100, -101)).toThrow(/SOLDE_INSUFFISANT/);
    expect(() => applyLedgerEntry(100, 1.5)).toThrow(/MONTANT_NON_ENTIER/);
  });

  it("signale un livre désynchronisé", () => {
    expect(() => assertLedger([{ amountCents: 100, balanceAfter: 90 }])).toThrow(/LEDGER_DESYNCHRONISE/);
  });
});
