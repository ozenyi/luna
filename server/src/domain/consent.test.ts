import { describe, expect, it } from "vitest";
import {
  canProcessSensitive,
  canRecordCall,
  canSendMarketingEmail,
  canSendMarketingSms,
  hasGranted,
  type ConsentRecord,
} from "./consent";

const at = (n: number) => `2026-11-0${n}T10:00:00.000Z`;

describe("contrôles de consentement", () => {
  it("refuse tout traitement sans trace explicite", () => {
    const empty: ConsentRecord[] = [];
    expect(canSendMarketingEmail(empty)).toBe(false);
    expect(canSendMarketingSms(empty)).toBe(false);
    expect(canProcessSensitive(empty)).toBe(false);
    expect(canRecordCall(empty)).toBe(false);
  });

  it("ne considère pas une case refusée comme un accord", () => {
    const records: ConsentRecord[] = [{ purpose: "marketing_email", granted: false, at: at(1) }];
    expect(hasGranted(records, "marketing_email")).toBe(false);
  });

  it("laisse le dernier choix l'emporter, y compris un retrait", () => {
    const records: ConsentRecord[] = [
      { purpose: "marketing_email", granted: true, at: at(1) },
      { purpose: "marketing_email", granted: false, at: at(2) },
    ];
    expect(canSendMarketingEmail(records)).toBe(false);
  });

  it("sépare e-mail, SMS, données sensibles et enregistrement d'appel", () => {
    const records: ConsentRecord[] = [
      { purpose: "marketing_sms", granted: true, at: at(1) },
      { purpose: "sensitive_consultation", granted: true, at: at(1) },
    ];
    expect(canSendMarketingSms(records)).toBe(true);
    expect(canSendMarketingEmail(records)).toBe(false);
    expect(canProcessSensitive(records)).toBe(true);
    expect(canRecordCall(records)).toBe(false);
  });
});
