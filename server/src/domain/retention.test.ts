import { describe, expect, it } from "vitest";
import { appendAudit, DEFAULT_RETENTION, selectForPurge, type RetainedRecord } from "./retention";

const now = new Date("2026-11-09T12:00:00.000Z");
const daysAgo = (days: number) => new Date(now.getTime() - days * 86400000).toISOString();

describe("purge de rétention", () => {
  it("conserve un message de 31 jours et purge un enregistrement du même âge", () => {
    const records: RetainedRecord[] = [
      { id: "rec", category: "recording", at: daysAgo(31) },
      { id: "msg", category: "message", at: daysAgo(31) },
    ];
    const result = selectForPurge(records, DEFAULT_RETENTION, now);
    expect(result.removed).toEqual(["rec"]);
    expect(result.kept).toContain("msg");
  });

  it("purge les messages après 12 mois", () => {
    const result = selectForPurge([{ id: "old", category: "message", at: daysAgo(366) }], DEFAULT_RETENTION, now);
    expect(result.removed).toEqual(["old"]);
  });

  it("conserve un compte actif et purge un compte inactif après 24 mois", () => {
    const records: RetainedRecord[] = [
      { id: "active", category: "account", at: daysAgo(2000), inactive: false },
      { id: "gone", category: "account", at: daysAgo(731), inactive: true },
    ];
    const result = selectForPurge(records, DEFAULT_RETENTION, now);
    expect(result.kept).toContain("active");
    expect(result.removed).toContain("gone");
  });

  it("purge les prospects après 3 ans", () => {
    const result = selectForPurge(
      [
        { id: "fresh", category: "prospect", at: daysAgo(100) },
        { id: "old", category: "prospect", at: daysAgo(1096) },
      ],
      DEFAULT_RETENTION,
      now,
    );
    expect(result.kept).toContain("fresh");
    expect(result.removed).toContain("old");
  });

  it("place la comptabilité dans une archive séparée et ne la supprime qu'après 10 ans", () => {
    const result = selectForPurge(
      [
        { id: "young", category: "accounting", at: daysAgo(400), archived: false },
        { id: "stored", category: "accounting", at: daysAgo(800), archived: true },
        { id: "expired", category: "accounting", at: daysAgo(3651), archived: true },
      ],
      DEFAULT_RETENTION,
      now,
    );
    expect(result.archived).toEqual(["young"]);
    expect(result.kept).toContain("stored");
    expect(result.removed).toEqual(["expired"]);
  });

  it("conserve l'audit un an en ligne puis le purge", () => {
    const records: RetainedRecord[] = [
      { id: "recent", category: "audit", at: daysAgo(200) },
      { id: "old", category: "audit", at: daysAgo(366) },
    ];
    const result = selectForPurge(records, DEFAULT_RETENTION, now);
    expect(result.kept).toEqual(["recent"]);
    expect(result.removed).toEqual(["old"]);
  });
});

describe("journal d'audit immuable", () => {
  it("ajoute sans modifier le tableau d'origine", () => {
    const original = [{ id: "a1" }];
    const next = appendAudit(original, { id: "a2" });
    expect(original).toEqual([{ id: "a1" }]);
    expect(next).toEqual([{ id: "a1" }, { id: "a2" }]);
  });
});
