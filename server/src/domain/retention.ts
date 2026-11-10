export interface RetentionPolicy {
  messagesDays: number;
  recordingsDays: number;
  serverLogsDays: number;
  inactiveAccountDays: number;
  auditLogDays: number;
  prospectsDays: number;
  /** Pièces comptables : archivage séparé, suppression au-delà. */
  accountingArchiveDays: number;
}

export const DEFAULT_RETENTION: RetentionPolicy = {
  messagesDays: 365,
  recordingsDays: 30,
  serverLogsDays: 365,
  inactiveAccountDays: 730,
  auditLogDays: 365,
  prospectsDays: 1095,
  accountingArchiveDays: 3650,
};

export type RetentionCategory = "message" | "recording" | "log" | "account" | "audit" | "prospect" | "accounting";

export interface RetainedRecord {
  id: string;
  category: RetentionCategory;
  at: string;
  inactive?: boolean;
  /** Déjà placé dans l'archive comptable séparée. */
  archived?: boolean;
}

export interface PurgeDecision {
  id: string;
  action: "keep" | "delete" | "archive";
}

export function selectForPurge(records: RetainedRecord[], policy: RetentionPolicy, now: Date): { removed: string[]; kept: string[]; archived: string[] } {
  const limits: Record<Exclude<RetentionCategory, "accounting">, number> = {
    message: policy.messagesDays,
    recording: policy.recordingsDays,
    log: policy.serverLogsDays,
    account: policy.inactiveAccountDays,
    audit: policy.auditLogDays,
    prospect: policy.prospectsDays,
  };
  const removed: string[] = [];
  const kept: string[] = [];
  const archived: string[] = [];
  for (const record of records) {
    const ageMs = now.getTime() - new Date(record.at).getTime();
    const expired = Number.isFinite(ageMs) && ageMs > 0 && ageMs > limitDays(record, limits, policy) * 86400000;
    if (record.category === "account" && !record.inactive) {
      kept.push(record.id);
      continue;
    }
    if (record.category === "accounting") {
      if (ageMs > policy.accountingArchiveDays * 86400000) removed.push(record.id);
      else if (!record.archived) archived.push(record.id);
      else kept.push(record.id);
      continue;
    }
    if (expired) removed.push(record.id);
    else kept.push(record.id);
  }
  return { removed, kept, archived };
}

function limitDays(
  record: RetainedRecord,
  limits: Record<Exclude<RetentionCategory, "accounting">, number>,
  _policy: RetentionPolicy,
): number {
  if (record.category === "accounting") return Number.POSITIVE_INFINITY;
  return limits[record.category];
}

export interface AuditEntry {
  id: string;
}

/** Le journal n'expose qu'un ajout. Aucune édition ni suppression unitaire. */
export function appendAudit<T extends AuditEntry>(log: T[], entry: T): T[] {
  return [...log, entry];
}
