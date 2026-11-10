import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { hrefFor, normalizeRoute } from "../lib/path";

interface RouteValue {
  path: string;
  search: URLSearchParams;
  go: (to: string) => void;
}

const RouteContext = createContext<RouteValue | null>(null);

export function RouteProvider({ children }: { children: ReactNode }) {
  const [loc, setLoc] = useState(() => ({ path: normalizeRoute(window.location.pathname), search: window.location.search }));
  useEffect(() => {
    const onPop = () => setLoc({ path: normalizeRoute(window.location.pathname), search: window.location.search });
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);
  const go = (to: string) => {
    const current = normalizeRoute(window.location.pathname);
    const href = to.startsWith("/") ? hrefFor(current, to) : to;
    const url = new URL(href, window.location.href);
    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
    setLoc({ path: normalizeRoute(url.pathname), search: url.search });
    window.scrollTo(0, 0);
  };
  return <RouteContext.Provider value={{ path: loc.path, search: new URLSearchParams(loc.search), go }}>{children}</RouteContext.Provider>;
}

export function useRoute(): RouteValue {
  const value = useContext(RouteContext);
  if (!value) throw new Error("route");
  return value;
}

export function A({ to, className, children, testId }: { to: string; className?: string; children: ReactNode; testId?: string }) {
  const route = useRoute();
  const href = hrefFor(route.path, to);
  return (
    <a className={className} href={href} data-testid={testId} onClick={(event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      event.preventDefault();
      route.go(to);
    }}>{children}</a>
  );
}
