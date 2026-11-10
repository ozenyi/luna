export type ConsentPurpose =
  | "cgu"
  | "age_18"
  | "sensitive_consultation"
  | "marketing_email"
  | "marketing_sms"
  | "availability_sms"
  | "availability_push"
  | "call_recording"
  | "cookies_measure"
  | "cookies_marketing"
  | "withdrawal_waiver";

export interface ConsentRecord {
  purpose: ConsentPurpose | string;
  granted: boolean;
  version?: string;
  at: string;
}

export function latestConsent(records: ConsentRecord[], purpose: string, version?: string): ConsentRecord | null {
  const relevant = records.filter((record) => record.purpose === purpose && (!version || record.version === version));
  if (relevant.length === 0) return null;
  return [...relevant].sort((a, b) => a.at.localeCompare(b.at)).at(-1) ?? null;
}

export function hasGranted(records: ConsentRecord[], purpose: string, version?: string): boolean {
  return latestConsent(records, purpose, version)?.granted === true;
}

export function canProcessSensitive(records: ConsentRecord[]): boolean {
  return hasGranted(records, "sensitive_consultation");
}

export function canSendMarketingEmail(records: ConsentRecord[]): boolean {
  return hasGranted(records, "marketing_email");
}

export function canSendMarketingSms(records: ConsentRecord[]): boolean {
  return hasGranted(records, "marketing_sms");
}

export function canRecordCall(records: ConsentRecord[]): boolean {
  return hasGranted(records, "call_recording");
}

export function canSendAvailabilitySms(records: ConsentRecord[]): boolean {
  return hasGranted(records, "availability_sms");
}
