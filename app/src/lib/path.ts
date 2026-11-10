export function appBase(): string {
  if (typeof document === "undefined") return "/luna/v2/";
  const script = document.querySelector('script[data-luna="app"]') as HTMLScriptElement | null;
  if (!script?.src) return "/luna/v2/";
  const path = new URL(script.src).pathname;
  const assets = path.lastIndexOf("/assets/");
  if (assets >= 0) return path.slice(0, assets + 1);
  if (path.endsWith("/src/main.tsx")) return "/";
  return "/luna/v2/";
}

export function normalizeRoute(pathname: string): string {
  const base = appBase();
  let path = pathname;
  if (path.startsWith(base)) path = `/${path.slice(base.length)}`;
  path = path.replace(/index\.html$/, "");
  path = path.replace(/\/{2,}/g, "/");
  if (!path.startsWith("/")) path = `/${path}`;
  if (!path.endsWith("/")) path += "/";
  return path;
}

export function hrefFor(from: string, to: string): string {
  if (!to.startsWith("/")) return to;
  const hashAt = to.indexOf("#");
  const hash = hashAt >= 0 ? to.slice(hashAt) : "";
  const beforeHash = hashAt >= 0 ? to.slice(0, hashAt) : to;
  const queryAt = beforeHash.indexOf("?");
  const query = queryAt >= 0 ? beforeHash.slice(queryAt) : "";
  let path = queryAt >= 0 ? beforeHash.slice(0, queryAt) : beforeHash;
  if (!path.endsWith("/")) path += "/";
  const fromParts = from.split("/").filter(Boolean);
  const toParts = path.split("/").filter(Boolean);
  let index = 0;
  while (index < fromParts.length && index < toParts.length && fromParts[index] === toParts[index]) index += 1;
  const parts = [...Array(fromParts.length - index).fill(".."), ...toParts.slice(index)];
  return `${parts.length ? `${parts.join("/")}/` : "./"}${query}${hash}`;
}

export function imageHref(from: string, file: string): string {
  const depth = from.split("/").filter(Boolean).length;
  return `${"../".repeat(depth + 1)}images/${file}`;
}
