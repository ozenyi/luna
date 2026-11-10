export interface CreditRefundInput {
  paidCents: number;
  grantedCents: number;
  consumedCents: number;
  alreadyRefundedCents: number;
  walletBalanceCents: number;
  requestedCents?: number;
}

export interface CreditRefundResult {
  refundCents: number;
  walletDebitCents: number;
}

/**
 * Rembourse la part monétaire des crédits encore disponibles.
 * Le bonus offert est repris sur le portefeuille, pas versé en cash.
 */
export function computeCreditRefund(input: CreditRefundInput): CreditRefundResult {
  const fields = [
    input.paidCents,
    input.grantedCents,
    input.consumedCents,
    input.alreadyRefundedCents,
    input.walletBalanceCents,
    input.requestedCents ?? 0,
  ];
  if (fields.some((value) => !Number.isInteger(value) || value < 0)) throw new Error("MONTANT_INVALIDE");
  if (input.grantedCents < input.consumedCents) throw new Error("CONSOMMATION_INVALIDE");
  const cap = input.paidCents - input.alreadyRefundedCents;
  if (cap <= 0 || input.grantedCents === 0 || input.walletBalanceCents === 0) {
    return { refundCents: 0, walletDebitCents: 0 };
  }
  const unused = input.grantedCents - input.consumedCents;
  const debit = Math.min(input.walletBalanceCents, unused);
  if (debit <= 0) return { refundCents: 0, walletDebitCents: 0 };
  let refund = Math.floor((debit * input.paidCents) / input.grantedCents);
  refund = Math.min(refund, cap);
  if (input.requestedCents !== undefined) refund = Math.min(refund, input.requestedCents);
  if (refund <= 0) return { refundCents: 0, walletDebitCents: 0 };
  return { refundCents: refund, walletDebitCents: debit };
}
