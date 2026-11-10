export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(`luna-demo-v1:${password}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export async function sha256(text: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}

export const DEMO_PASSWORD_HASH = "e87a3cb72605b9042eee7ae4f059fdedb65fa33042a8b43f658313db2493e1c9";
