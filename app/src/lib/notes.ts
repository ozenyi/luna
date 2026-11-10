/** Retire les notes internes (statut v1, validation éditoriale, bandeau fictif répété). */
export function stripInternalNotes(source: string): string {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const kept: string[] = [];
  let dropQuote = false;
  for (const line of lines) {
    if (line.startsWith(">")) {
      const text = line.toLowerCase();
      if (/profil fictif|statut\s*:|à valider avant publication|a valider avant publication|déjà présent dans la v1|deja present dans la v1|exemple de présentation|exemple de presentation/.test(text)) {
        dropQuote = true;
        continue;
      }
      if (dropQuote) continue;
    } else if (dropQuote) {
      if (line.trim() === "") {
        dropQuote = false;
        continue;
      }
      dropQuote = false;
    }
    if (/^\s*statut\s*:/i.test(line)) continue;
    if (/à valider avant publication|a valider avant publication/i.test(line)) continue;
    kept.push(line);
  }
  return kept.join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function practicesOf(body: string): string[] {
  const line = body.match(/\*\*Spécialités\*\*\s*:\s*(.+)/)?.[1] ?? "";
  return line
    .replace(/\([^)]*\)/g, "")
    .split(/,|·/)
    .map((item) => item.replace(/\*/g, "").trim())
    .filter(Boolean)
    .slice(0, 3);
}
