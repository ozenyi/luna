import { createHash } from "node:crypto";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const editorial = join(root, "content/editorial");
const spec = readFileSync(join(root, "content/legal/spec-juridique.md"), "utf8");

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, name.name);
    if (name.isDirectory()) out.push(...walk(full));
    else if (name.name.endsWith(".md")) out.push(full);
  }
  return out;
}

function frontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: raw };
  const meta = {};
  for (const line of match[1].split("\n")) {
    const cut = line.indexOf(":");
    if (cut === -1) continue;
    const key = line.slice(0, cut).trim();
    let value = line.slice(cut + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    meta[key] = value;
  }
  return { meta, body: match[2].trim() };
}

const PHOTOS = { selene: "a2fNm.jpg", marc: "W9qq6.jpg", claire: "mv9Jq.jpg" };

function parseVoyant(slug, body, h1) {
  const type = body.match(/\*\*Type\*\*\s*:\s*(.+)/)?.[1] ?? "";
  const kind = /ia/i.test(type) ? "ai" : "human";
  const channelsLine = body.match(/\*\*Canaux\*\*\s*:\s*(.+)/)?.[1] ?? "";
  const channels = [];
  if (/chat/i.test(channelsLine)) channels.push("chat");
  if (/t[ée]l[ée]phone/i.test(channelsLine)) channels.push("call");
  if (/message/i.test(channelsLine)) channels.push("message");
  if (/visio/i.test(channelsLine)) channels.push("video");
  return {
    slug: slug.replace(/^voyants\//, ""),
    name: h1,
    kind,
    channels,
    photo: PHOTOS[slug.replace(/^voyants\//, "")] ?? null,
    demoChatCents: kind === "ai" ? 90 : 150,
    demoCallCents: 150,
    demoVideoCents: 150,
    hue: [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360,
  };
}

const pages = [];
const voyants = [];
for (const file of walk(editorial)) {
  const raw = readFileSync(file, "utf8");
  const { meta, body } = frontmatter(raw);
  const slug = meta.slug;
  if (!slug || slug.startsWith("_")) continue;
  const path = slug === "accueil" ? "/" : `/${slug}/`;
  const page = {
    path,
    slug,
    title: meta.title,
    description: meta.meta_description,
    h1: meta.h1,
    body,
    source: relative(root, file),
  };
  pages.push(page);
  if (slug.startsWith("voyants/")) voyants.push(parseVoyant(slug, body, meta.h1));
}

const legalMap = [
  ["# Mentions légales", "/mentions-legales/", "Mentions légales · Luna"],
  ["# Conditions générales d'utilisation (CGU)", "/cgu/", "Conditions générales d’utilisation · Luna"],
  ["# Conditions générales de vente (CGV)", "/cgv/", "Conditions générales de vente · Luna"],
  ["# Conditions générales des guides Luna", "/conditions-guides/", "Conditions des guides · Luna"],
  ["# Politique de confidentialité de Luna", "/confidentialite/", "Politique de confidentialité · Luna"],
  ["# Politique cookies", "/cookies/", "Politique cookies · Luna"],
];
const blocks = [...spec.matchAll(/```markdown\n([\s\S]*?)```/g)].map((match) => match[1].trim());
for (const [heading, path, title] of legalMap) {
  const body = blocks.find((block) => block.startsWith(heading));
  if (!body) throw new Error(`Texte juridique manquant : ${heading}`);
  pages.push({
    path,
    slug: path.replace(/^\/|\/$/g, "") || "accueil",
    title,
    description: "Texte juridique de travail, à faire valider par un avocat. Les [CROCHETS] restent à compléter.",
    h1: heading.replace(/^#\s+/, ""),
    body,
    source: "content/legal/spec-juridique.md",
    legal: true,
  });
}

pages.sort((a, b) => a.path.localeCompare(b.path, "fr"));
const json = JSON.stringify({ generatedFrom: "content/editorial", pages, voyants }, null, 2);
const out = join(root, "app/src/data/catalog.json");
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, json);
writeFileSync(join(root, "content/legal/texts.sha256"), createHash("sha256").update(json).digest("hex") + "\n");
console.log(`catalog ${pages.length} pages, ${voyants.length} guides`);
