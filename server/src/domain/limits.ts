export function canSpend(input: {
  balanceCents: number;
  amountCents: number;
  spentTodayCents: number;
  spentMonthCents: number;
  dailyLimitCents: number;
  monthlyLimitCents: number;
  pausedUntil?: string | null;
  now: Date;
}): { ok: true } | { ok: false; reason: "FUNDS" | "DAILY" | "MONTHLY" | "PAUSE" } {
  if (input.pausedUntil && new Date(input.pausedUntil).getTime() > input.now.getTime()) return { ok: false, reason: "PAUSE" };
  if (input.amountCents > input.balanceCents) return { ok: false, reason: "FUNDS" };
  if (input.spentTodayCents + input.amountCents > input.dailyLimitCents) return { ok: false, reason: "DAILY" };
  if (input.spentMonthCents + input.amountCents > input.monthlyLimitCents) return { ok: false, reason: "MONTHLY" };
  return { ok: true };
}
