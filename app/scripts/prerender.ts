import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, cpSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { allRoutes } from "../src/data/routes.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const dist = join(root, "v2");
const origin = "https://ozenyi.github.io/luna/v2";
const shell = readFileSync(join(dist, "index.html"), "utf8");

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function depthOf(path: string): number {
  return path.split("/").filter(Boolean).length;
}

const routes = allRoutes();
const locs: string[] = [];

for (const route of routes) {
  const depth = depthOf(route.path);
  const prefix = depth === 0 ? "./" : "../".repeat(depth);
  const canonical = route.path === "/" ? `${origin}/` : `${origin}${route.path}`;
  const json = JSON.stringify({
    "@context": "https://schema.org",
    "@type": route.path.startsWith("/blog/") && route.path !== "/blog/" ? "Article" : "WebPage",
    headline: route.title,
    description: route.description,
    url: canonical,
    isPartOf: { "@type": "WebSite", name: "Luna", url: `${origin}/` },
  });
  const hash = createHash("sha256").update(json).digest("base64");
  const robots = route.indexable ? "index,follow" : "noindex,nofollow";
  const head = [
    `<link rel="canonical" href="${canonical}" />`,
    `<meta name="robots" content="${robots}" />`,
    `<meta property="og:title" content="${escapeHtml(route.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(route.description)}" />`,
    `<meta property="og:url" content="${canonical}" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'sha256-${hash}'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; media-src 'self' blob:; worker-src 'self'; object-src 'none'; base-uri 'none'; form-action 'self'" />`,
    `<script type="application/ld+json">${json}</script>`,
  ].join("\n");
  let html = shell
    .replaceAll('href="./', `href="${prefix}`)
    .replaceAll('src="./', `src="${prefix}`)
    .replace("__TITLE__", escapeHtml(route.title))
    .replace("__DESCRIPTION__", escapeHtml(route.description))
    .replace("<!--LUNA_HEAD-->", head);
  const file = route.path === "/" ? join(dist, "index.html") : join(dist, route.path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  locs.push(canonical);
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${locs.map((loc) => `  <url><loc>${loc}</loc></url>`).join("\n")}\n</urlset>\n`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);
writeFileSync(join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
writeFileSync(join(dist, ".nojekyll"), "");
writeFileSync(join(dist, "route-manifest.json"), JSON.stringify(routes, null, 2));
mkdirSync(join(dist, "legal"), { recursive: true });
mkdirSync(join(dist, "safety"), { recursive: true });
cpSync(join(root, "content/legal/retention.yml"), join(dist, "legal/retention.yml"));
cpSync(join(root, "content/legal/registry.yml"), join(dist, "legal/registry.yml"));
cpSync(join(root, "content/legal/breach_notice.md"), join(dist, "legal/breach_notice.md"));
cpSync(join(root, "content/safety/distress_terms.fr.yml"), join(dist, "safety/distress_terms.fr.yml"));
writeFileSync(join(root, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`pages ${routes.length}`);
