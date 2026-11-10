/** Bascule unique : "demo" sur GitHub Pages, "api" quand le serveur Node est joignable. */
export const LUNA_CONFIG = {
  mode: "demo" as "demo" | "api",
  apiBaseUrl: "http://localhost:8787",
};

export async function apiPost(path: string, body: unknown): Promise<unknown> {
  if (LUNA_CONFIG.mode !== "api") throw new Error("API inactive : mode démo");
  const response = await fetch(`${LUNA_CONFIG.apiBaseUrl}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`API ${response.status}`);
  return response.json();
}
