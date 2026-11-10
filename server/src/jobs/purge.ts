import { DEFAULT_RETENTION, selectForPurge, type RetainedRecord } from "../domain/retention";

/** Tâche quotidienne. Les compteurs ne contiennent aucune donnée personnelle. */
export function planPurge(records: RetainedRecord[], now = new Date()) {
  const result = selectForPurge(records, DEFAULT_RETENTION, now);
  return {
    event: "retention.purged",
    removed: result.removed.length,
    archived: result.archived.length,
    kept: result.kept.length,
    categories: {
      messagesDays: DEFAULT_RETENTION.messagesDays,
      recordingsDays: DEFAULT_RETENTION.recordingsDays,
      inactiveAccountDays: DEFAULT_RETENTION.inactiveAccountDays,
      prospectsDays: DEFAULT_RETENTION.prospectsDays,
      accountingArchiveDays: DEFAULT_RETENTION.accountingArchiveDays,
    },
  };
}
