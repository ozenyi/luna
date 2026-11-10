export interface MinuteBillInput {
  balanceCents: number;
  rateCentsPerMin: number;
  elapsedMs: number;
  billedMinutes: number;
}

export interface MinuteBillResult {
  balanceCents: number;
  billedMinutes: number;
  chargedCents: number;
  status: "running" | "stopped_no_credit" | "invalid_rate";
}

/** Prépaiement de chaque minute entamée. Idempotent grâce à billedMinutes. */
export function billElapsed(input: MinuteBillInput): MinuteBillResult {
  if (!Number.isInteger(input.balanceCents) || !Number.isInteger(input.rateCentsPerMin) || !Number.isInteger(input.billedMinutes)) {
    return {
      balanceCents: input.balanceCents,
      billedMinutes: input.billedMinutes,
      chargedCents: 0,
      status: "invalid_rate",
    };
  }
  if (input.rateCentsPerMin <= 0 || input.elapsedMs < 0 || input.billedMinutes < 0) {
    return {
      balanceCents: input.balanceCents,
      billedMinutes: input.billedMinutes,
      chargedCents: 0,
      status: "invalid_rate",
    };
  }
  const due = Math.floor(input.elapsedMs / 60000) + 1;
  let balance = input.balanceCents;
  let billed = input.billedMinutes;
  let charged = 0;
  while (billed < due) {
    if (balance < input.rateCentsPerMin) {
      return { balanceCents: balance, billedMinutes: billed, chargedCents: charged, status: "stopped_no_credit" };
    }
    balance -= input.rateCentsPerMin;
    billed += 1;
    charged += input.rateCentsPerMin;
  }
  return { balanceCents: balance, billedMinutes: billed, chargedCents: charged, status: "running" };
}

export function remainingMs(args: {
  startedAtMs: number;
  billedMinutes: number;
  balanceCents: number;
  rateCentsPerMin: number;
  nowMs: number;
}): number {
  if (args.rateCentsPerMin <= 0 || args.billedMinutes < 0) return 0;
  const paidUntil = args.startedAtMs + args.billedMinutes * 60000;
  const futureMin = Math.floor(Math.max(0, args.balanceCents) / args.rateCentsPerMin);
  return Math.max(0, paidUntil - args.nowMs) + futureMin * 60000;
}

export function shouldWarn(remaining: number): boolean {
  return remaining > 0 && remaining <= 60000;
}

export function splitCommission(grossCents: number, commissionBps: number): { platformCents: number; voyantCents: number } {
  if (!Number.isInteger(grossCents) || grossCents < 0) throw new Error("MONTANT_INVALIDE");
  if (!Number.isInteger(commissionBps) || commissionBps < 0 || commissionBps > 10000) throw new Error("COMMISSION_INVALIDE");
  const platformCents = Math.floor((grossCents * commissionBps) / 10000);
  return { platformCents, voyantCents: grossCents - platformCents };
}
