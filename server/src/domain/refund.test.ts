import { describe, expect, it } from "vitest";
import { computeCreditRefund } from "./refund";

describe("remboursement de crédits", () => {
  it("rembourse l'intégralité payée et reprend le bonus si rien n'a été consommé", () => {
    expect(
      computeCreditRefund({
        paidCents: 2000,
        grantedCents: 2200,
        consumedCents: 0,
        alreadyRefundedCents: 0,
        walletBalanceCents: 2200,
      }),
    ).toEqual({ refundCents: 2000, walletDebitCents: 2200 });
  });

  it("ne rembourse que la part encore disponible après consommation", () => {
    expect(
      computeCreditRefund({
        paidCents: 2000,
        grantedCents: 2200,
        consumedCents: 1100,
        alreadyRefundedCents: 0,
        walletBalanceCents: 1100,
      }),
    ).toEqual({ refundCents: 1000, walletDebitCents: 1100 });
  });

  it("plafonne le débit au solde réel du portefeuille", () => {
    const result = computeCreditRefund({
      paidCents: 2000,
      grantedCents: 2200,
      consumedCents: 0,
      alreadyRefundedCents: 0,
      walletBalanceCents: 500,
    });
    expect(result.walletDebitCents).toBe(500);
    expect(result.refundCents).toBe(Math.floor((500 * 2000) / 2200));
  });

  it("ne dépasse ni le reste capturé ni le montant demandé", () => {
    expect(
      computeCreditRefund({
        paidCents: 2000,
        grantedCents: 2200,
        consumedCents: 0,
        alreadyRefundedCents: 2000,
        walletBalanceCents: 2200,
      }),
    ).toEqual({ refundCents: 0, walletDebitCents: 0 });

    const partial = computeCreditRefund({
      paidCents: 2000,
      grantedCents: 2200,
      consumedCents: 0,
      alreadyRefundedCents: 0,
      walletBalanceCents: 2200,
      requestedCents: 500,
    });
    expect(partial.refundCents).toBe(500);
    expect(partial.walletDebitCents).toBe(2200);
  });

  it("rejette des montants incohérents", () => {
    expect(() =>
      computeCreditRefund({
        paidCents: 2000,
        grantedCents: 1000,
        consumedCents: 1500,
        alreadyRefundedCents: 0,
        walletBalanceCents: 100,
      }),
    ).toThrow(/CONSOMMATION_INVALIDE/);
  });
});
