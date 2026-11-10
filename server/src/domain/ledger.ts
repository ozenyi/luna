export interface StoredEntry {
  amountCents: number;
  balanceAfter: number;
}

export function applyLedgerEntry(balanceCents: number, amountCents: number): { balanceCents: number; balanceAfter: number } {
  if (!Number.isInteger(balanceCents) || !Number.isInteger(amountCents)) {
    throw new Error("MONTANT_NON_ENTIER");
  }
  const balanceAfter = balanceCents + amountCents;
  if (balanceAfter < 0) throw new Error("SOLDE_INSUFFISANT");
  return { balanceCents: balanceAfter, balanceAfter };
}

export function assertLedger(entries: StoredEntry[]): number {
  let balance = 0;
  for (const entry of entries) {
    if (!Number.isInteger(entry.amountCents) || !Number.isInteger(entry.balanceAfter)) {
      throw new Error("MONTANT_NON_ENTIER");
    }
    if (balance + entry.amountCents !== entry.balanceAfter) throw new Error("LEDGER_DESYNCHRONISE");
    balance = entry.balanceAfter;
    if (balance < 0) throw new Error("SOLDE_NEGATIF");
  }
  return balance;
}
