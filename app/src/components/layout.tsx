import { useEffect, useState, type ReactNode } from "react";
import { ENTERTAINMENT } from "../data/legal-copy";
import { allRoutes, pageByPath } from "../data/routes";
import { imageHref } from "../lib/path";
import { store } from "../store/demoStore";
import { A, useRoute } from "./route";

const COOKIE_KEY = "luna.v2.cookies";

export function readCookieChoice(): { necessary: true; audience: boolean; ads: boolean; at: number } | null {
  try {
    const value = JSON.parse(localStorage.getItem(COOKIE_KEY) || "null") as { necessary: true; audience: boolean; ads: boolean; at: number } | null;
    if (!value) return null;
    if (Date.now() - value.at > 182 * 86400000) return null;
    return value;
  } catch {
    return null;
  }
}

function writeCookie(choice: { audience: boolean; ads: boolean }) {
  localStorage.setItem(COOKIE_KEY, JSON.stringify({ necessary: true, ...choice, at: Date.now() }));
}

export function Layout({ children }: { children: ReactNode }) {
  const { path, go } = useRoute();
  const [, setTick] = useState(0);
  const [menu, setMenu] = useState(false);
  const [cookies, setCookies] = useState(readCookieChoice);
  const [customize, setCustomize] = useState(false);
  const [audience, setAudience] = useState(false);
  const [ads, setAds] = useState(false);
  const clientSpace = path.startsWith("/compte/");
  useEffect(() => store.subscribe(() => setTick((value) => value + 1)), []);
  useEffect(() => setMenu(false), [path]);
  useEffect(() => {
    document.documentElement.classList.toggle("has-cookie", !cookies);
    document.documentElement.classList.toggle("has-tab", clientSpace);
  }, [cookies, clientSpace]);
  const user = store.user();
  useEffect(() => {
    const page = pageByPath.get(path) ?? allRoutes().find((route) => route.path === path);
    if (!page) return;
    document.title = page.title.includes("Luna") ? page.title : `${page.title} · Luna`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", page.description);
  }, [path]);
  const logo = imageHref(path, "kvoyc.jpg");
  return (
    <>
      <div className="topbar">
        <div className="proto" data-testid="prototype-banner">Prototype – données et voyants fictifs, paiements simulés</div>
        <header className="header">
          <A to="/" className="brand"><img src={logo} width={42} height={42} alt="Emblème Luna, croissant de lune" />Luna</A>
          <nav className="nav" aria-label="Navigation principale">
            <A to="/guides/">Guides</A>
            <A to="/specialites/">Pratiques</A>
            <A to="/horoscope/">Horoscope</A>
            <A to="/tarifs/">Tarifs</A>
            <A to="/blog/">Magazine</A>
            {user ? <A to={user.role === "admin" ? "/admin/" : user.role === "voyant" ? "/espace-voyant/" : "/compte/"}>Mon compte</A> : <A to="/connexion/">Connexion</A>}
            {user && <button type="button" className="btn btn-ghost" data-testid="logout" onClick={() => { store.logout(); go("/connexion/"); }}>Sortir</button>}
          </nav>
          <button className="nav-toggle" type="button" aria-expanded={menu} onClick={() => setMenu((open) => !open)}>Menu</button>
        </header>
        {menu && (
          <div className="menu-panel">
            <A to="/guides/">Guides</A><A to="/tarifs/">Tarifs</A><A to="/compte/pause/">Faire une pause</A><A to="/connexion/">Connexion</A>
          </div>
        )}
      </div>
      <div className="page-body">{children}</div>
      <footer className="footer">
        <div className="wrap">
          <div>
            <strong>Luna</strong>
            <p>{ENTERTAINMENT}</p>
            <p>Détresse : <a href="tel:3114">3114</a>, urgences <a href="tel:15">15</a> ou <a href="tel:112">112</a>, violences <a href="tel:3919">3919</a>.</p>
          </div>
          <div>
            <p>Explorer</p>
            <A to="/guides/">Guides</A><br /><A to="/voyants/">Annuaire</A><br /><A to="/specialites/">Pratiques</A><br /><A to="/themes/">Thèmes</A><br /><A to="/horoscope/">Horoscope</A><br /><A to="/blog/">Magazine</A>
          </div>
          <div>
            <p>Compte</p>
            <A to="/inscription/">Inscription</A><br /><A to="/tarifs/">Recharges</A><br /><A to="/offre-bienvenue/">Offre de bienvenue</A><br /><A to="/parrainage/">Parrainage</A><br /><A to="/compte/plafond/">Plafonds</A><br /><A to="/compte/pause/">Pause</A>
          </div>
          <div>
            <p>Légal</p>
            <A to="/mentions-legales/">Mentions légales</A><br /><A to="/cgu/">CGU</A><br /><A to="/cgv/">CGV</A><br /><A to="/confidentialite/">Confidentialité</A><br /><A to="/cookies/">Cookies</A><br /><A to="/faq/">FAQ</A><br /><A to="/devenir-voyant/">Devenir guide</A><br /><A to="/plan-du-site/">Plan du site</A><br />
            <button className="btn-ghost" type="button" onClick={() => { localStorage.removeItem(COOKIE_KEY); setCookies(null); }}>Gérer mes cookies</button>
          </div>
        </div>
      </footer>
      {clientSpace && (
        <nav className="tabbar" aria-label="Espace client">
          <A to="/">Accueil</A>
          <A to="/guides/">Guides</A>
          <A to="/compte/conversations/">Séances</A>
          <A to="/compte/portefeuille/">Crédit</A>
          <A to="/compte/">Compte</A>
        </nav>
      )}
      {!cookies && (
        <div className="cookiebar" role="dialog" aria-label="Cookies">
          <p>Cookies nécessaires au fonctionnement. L’audience détaillée attend votre accord. Vous pouvez changer d’avis via « Gérer mes cookies ».</p>
          {customize ? (
            <div>
              <label className="check"><input type="checkbox" checked disabled /> Nécessaires</label>
              <label className="check"><input type="checkbox" checked={audience} onChange={(event) => setAudience(event.target.checked)} /> Audience avancée</label>
              <label className="check"><input type="checkbox" checked={ads} onChange={(event) => setAds(event.target.checked)} /> Publicité, hors consultation</label>
              <button className="btn btn-ghost" type="button" onClick={() => { writeCookie({ audience, ads }); setCookies(readCookieChoice()); }}>Enregistrer</button>
            </div>
          ) : (
            <div className="btn-row">
              <button className="btn btn-ghost" type="button" data-testid="cookie-reject" onClick={() => { writeCookie({ audience: false, ads: false }); setCookies(readCookieChoice()); }}>Tout refuser</button>
              <button className="btn btn-ghost" type="button" data-testid="cookie-accept" onClick={() => { writeCookie({ audience: true, ads: false }); setCookies(readCookieChoice()); }}>Tout accepter</button>
              <button className="btn btn-ghost" type="button" onClick={() => setCustomize(true)}>Personnaliser</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
