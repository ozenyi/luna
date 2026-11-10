import { useMemo, useState } from "react";
import { pageByPath, voyants, type CatalogVoyant } from "../data/routes";
import { euros } from "../lib/format";
import { practicesOf } from "../lib/notes";
import { imageHref } from "../lib/path";
import { store } from "../store/demoStore";
import { Markdown } from "./markdown";
import { A, useRoute } from "./route";

const SIGNS = [
  ["belier", "Bélier"], ["taureau", "Taureau"], ["gemeaux", "Gémeaux"], ["cancer", "Cancer"],
  ["lion", "Lion"], ["vierge", "Vierge"], ["balance", "Balance"], ["scorpion", "Scorpion"],
  ["sagittaire", "Sagittaire"], ["capricorne", "Capricorne"], ["verseau", "Verseau"], ["poissons", "Poissons"],
] as const;

const TILES = [
  ["tarot", "Tarot", "M12 3l2 5h5l-4 3 2 5-5-3-5 3 2-5-4-3h5z"],
  ["astrologie", "Astrologie", "M12 3a9 9 0 100 18 9 9 0 000-18zm0 4v5l3 2"],
  ["numerologie", "Numérologie", "M5 19V5h4a4 4 0 010 8H5"],
  ["cartomancie", "Cartomancie", "M7 3h8l4 4v14H7z"],
  ["oracle", "Oracle", "M12 3l7 18H5z"],
  ["runes", "Runes", "M6 20L12 4l6 16M8 14h8"],
  ["pendule", "Pendule", "M12 3v8m0 0a4 4 0 100 8 4 4 0 000-8z"],
  ["reves", "Rêves", "M4 16c2-6 6-8 8-8s6 2 8 8c-2 2-4 3-8 3s-6-1-8-3z"],
  ["mediumnite", "Médiumnité", "M12 3c4 4 6 8 6 12a6 6 0 11-12 0c0-4 2-8 6-12z"],
] as const;

export type GuideStatus = "disponible" | "consultation" | "absent";

export function guideStatus(guide: CatalogVoyant): GuideStatus {
  const live = store.state.sessions.some((session) => session.voyantSlug === guide.slug && session.status === "active");
  if (live) return "consultation";
  if (guide.kind === "ai") return store.state.presence[guide.slug] === false ? "absent" : "disponible";
  if (store.state.presence[guide.slug]) return "disponible";
  const bucket = [...guide.slug].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 5;
  if (bucket === 0) return "consultation";
  if (bucket <= 2) return "disponible";
  return "absent";
}

export function statusLabel(status: GuideStatus, human: boolean): string {
  const word = status === "consultation" ? "En consultation" : status === "disponible" ? "Disponible" : "Absent";
  return human ? `${word} · simulé` : word;
}

const ALT: Record<string, string> = {
  "aicha-diallo": "Illustration peinte d’Aïcha Diallo, sourire et étoile dorée dans les cheveux, ciel nocturne. Profil fictif.",
  "hugo-lemaire": "Illustration peinte d’Hugo Lemaire, cheveux bruns et barbe courte, fond étoilé. Profil fictif.",
  "ines-benali": "Illustration peinte d’Inès Benali, cheveux bouclés et créoles dorées, chiffres en filigrane. Profil fictif.",
  "lucie-moreau": "Illustration peinte de Lucie Moreau, chignon blond et pendentif, croissant de lune. Profil fictif.",
  "nadia-kovac": "Illustration peinte de Nadia Kovač, chignon brun et boucle d’oreille géométrique. Profil fictif.",
  "sofia-marin": "Illustration peinte de Sofia Marin, cheveux auburn et sourire, ciel étoilé. Profil fictif.",
  "theo-garnier": "Illustration peinte de Théo Garnier, cheveux bouclés et pull bleu, regard vers le ciel. Profil fictif.",
  "yann-le-goff": "Illustration peinte de Yann Le Goff, barbe grise et runes dorées en arrière-plan. Profil fictif.",
  vega: "Illustration abstraite de Véga, figure de constellation au croissant doré. Guide IA, profil fictif.",
  selene: "Illustration de Séléné, profil lunaire et carte de tarot. Guide IA, profil fictif.",
  marc: "Illustration de Marc, buste clair et constellations. Profil fictif.",
  claire: "Illustration de Claire, portrait aux anneaux dorés. Profil fictif.",
};

export function portraitSrc(from: string, guide: CatalogVoyant): string {
  if (guide.photo) return imageHref(from, guide.photo);
  const depth = from.split("/").filter(Boolean).length;
  return `${depth ? "../".repeat(depth) : ""}assets/guides/${guide.slug}.jpg`;
}

export function portraitAlt(guide: CatalogVoyant): string {
  return ALT[guide.slug] ?? `Illustration de ${guide.name}. Profil fictif.`;
}

export function guidePractices(guide: CatalogVoyant): string[] {
  const page = pageByPath.get(`/voyants/${guide.slug}/`);
  return page ? practicesOf(page.body) : [];
}

function Icon({ d }: { d: string }) {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Portrait({ guide, from }: { guide: CatalogVoyant; from: string }) {
  return (
    <span className="portrait-wrap">
      <img className="portrait" src={portraitSrc(from, guide)} alt={portraitAlt(guide)} width={512} height={512} />
      <span className="illus">Illustration</span>
    </span>
  );
}

export function GuideCard({ guide }: { guide: CatalogVoyant }) {
  const { path, go } = useRoute();
  const user = store.user();
  const fav = Boolean(user && store.state.favorites.some((item) => item.userId === user.id && item.slug === guide.slug));
  const status = guideStatus(guide);
  const practices = guidePractices(guide);
  return (
    <article className="gcard">
      <A to={`/voyants/${guide.slug}/`} className="gcard-photo">
        <Portrait guide={guide} from={path} />
        <span className={`status s-${status}`}>{statusLabel(status, guide.kind === "human")}</span>
      </A>
      <div className="gcard-body">
        <div className="gcard-top">
          <h2><A to={`/voyants/${guide.slug}/`}>{guide.name}</A></h2>
          <button
            type="button"
            className={`heart${fav ? " on" : ""}`}
            aria-pressed={fav}
            aria-label={fav ? `Retirer ${guide.name} des favoris` : `Ajouter ${guide.name} aux favoris`}
            onClick={() => { if (!user) go("/connexion/"); else store.toggleFavorite(guide.slug); }}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true"><path d="M12 20s-7-4.4-7-9a4 4 0 017-2 4 4 0 017 2c0 4.6-7 9-7 9z" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" /></svg>
          </button>
        </div>
        <p className="badges">
          {guide.kind === "ai" ? <span className="pill pill-ai">IA</span> : <span className="pill">Profil fictif</span>}
        </p>
        <p className="practices">{practices.join(" · ") || "Guidance"}</p>
        <p className="prices">
          <span>Chat {euros(guide.demoChatCents)}/min</span>
          <span>Appel {euros(guide.demoCallCents)}/min</span>
          <span>Visio {euros(guide.demoVideoCents)}/min</span>
        </p>
        <div className="gcard-actions">
          <A className="btn btn-gold btn-sm" to={`/voyants/${guide.slug}/consulter/`}>Chat</A>
          <A className="btn btn-ghost btn-sm" to={`/session/appel/${guide.slug}/`}>Appeler</A>
          <A className="btn btn-ghost btn-sm" to={`/session/video/${guide.slug}/`}>Visio</A>
        </div>
      </div>
    </article>
  );
}

export function GuideGrid({ items }: { items: CatalogVoyant[] }) {
  if (items.length === 0) {
    return <p className="empty">Aucun guide ne correspond. Élargissez la recherche ou retirez un filtre.</p>;
  }
  return <div className="ggrid">{items.map((guide) => <GuideCard key={guide.slug} guide={guide} />)}</div>;
}

function matches(guide: CatalogVoyant, query: string, channel: string, kind: string): boolean {
  if (kind && guide.kind !== kind) return false;
  if (channel === "chat" || channel === "call" || channel === "video" || channel === "message") {
    if (channel !== "video" && !guide.channels.includes(channel) && !(channel === "call" && guide.channels.includes("call"))) return false;
  }
  if (!query.trim()) return true;
  const blob = `${guide.name} ${guidePractices(guide).join(" ")} ${pageByPath.get(`/voyants/${guide.slug}/`)?.body ?? ""}`.toLowerCase();
  return query.toLowerCase().trim().split(/\s+/).every((word) => blob.includes(word));
}

export function Directory({ base = "/guides/" }: { base?: string }) {
  const { search, go } = useRoute();
  const query = search.get("q") || "";
  const channel = search.get("canal") || "";
  const kind = search.get("type") || "";
  const sort = search.get("tri") || "dispo";
  const page = Math.max(1, Number(search.get("page") || 1));
  const filtered = useMemo(() => {
    const list = voyants.filter((guide) => matches(guide, query, channel, kind));
    return [...list].sort((a, b) => {
      if (sort === "prix") return a.demoChatCents - b.demoChatCents;
      const rank = { disponible: 0, consultation: 1, absent: 2 };
      return rank[guideStatus(a)] - rank[guideStatus(b)];
    });
  }, [query, channel, kind, sort]);
  const pageSize = 6;
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const slice = filtered.slice((page - 1) * pageSize, page * pageSize);
  const online = voyants.filter((guide) => guideStatus(guide) !== "absent").length;
  function href(next: Record<string, string>) {
    const params = new URLSearchParams(search);
    Object.entries(next).forEach(([key, value]) => { if (value) params.set(key, value); else params.delete(key); });
    const q = params.toString();
    return `${base}${q ? `?${q}` : ""}`;
  }
  return (
    <section className="wrap market" aria-labelledby="annuaire-titre">
      <header className="dir-head">
        <div>
          <h1 id="annuaire-titre">Guides</h1>
          <p className="lead">{online} profils affichés comme joignables dans cette démo. Tous sont fictifs.</p>
        </div>
        <p className="online-count"><strong>{online}</strong> en ligne maintenant <span>(simulé)</span></p>
      </header>
      <div className="dir-layout">
        <aside className="filters side" aria-label="Filtres">
          <form onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); go(href({ q: String(data.get("q") || ""), page: "" })); }}>
            <label className="field">Recherche<input name="q" defaultValue={query} placeholder="Tarot, amour, rêve…" /></label>
            <button className="btn btn-gold" type="submit">Filtrer</button>
          </form>
          <p className="side-label">Canal</p>
          {[["", "Tous"], ["chat", "Chat"], ["call", "Téléphone"], ["video", "Visio"]].map(([value, label]) => (
            <A key={label} to={href({ canal: value, page: "" })} className={channel === value ? "chip on" : "chip"}>{label}</A>
          ))}
          <p className="side-label">Type</p>
          {[["", "Tous"], ["ai", "IA"], ["human", "Humains fictifs"]].map(([value, label]) => (
            <A key={label} to={href({ type: value, page: "" })} className={kind === value ? "chip on" : "chip"}>{label}</A>
          ))}
          <p className="side-label">Tri</p>
          <A to={href({ tri: "dispo" })} className={sort === "dispo" ? "chip on" : "chip"}>Disponibilité</A>
          <A to={href({ tri: "prix" })} className={sort === "prix" ? "chip on" : "chip"}>Prix</A>
        </aside>
        <div>
          <GuideGrid items={slice} />
          <nav className="pager" aria-label="Pages de l’annuaire">
            {Array.from({ length: pages }, (_, index) => (
              <A key={index} to={href({ page: index === 0 ? "" : String(index + 1) })} className={page === index + 1 ? "chip on" : "chip"}>{index + 1}</A>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  const { go, path } = useRoute();
  const [query, setQuery] = useState("");
  const [channel, setChannel] = useState("");
  const [sort, setSort] = useState("dispo");
  const home = pageByPath.get("/");
  const articles = [...pageByPath.values()].filter((page) => page.slug.startsWith("blog/"));
  const shown = [...voyants]
    .filter((guide) => !channel || guide.channels.includes(channel as CatalogVoyant["channels"][number]) || channel === "video")
    .filter((guide) => matches(guide, query, "", ""))
    .sort((a, b) => (sort === "prix" ? a.demoChatCents - b.demoChatCents : (guideStatus(a) === "absent" ? 1 : 0) - (guideStatus(b) === "absent" ? 1 : 0)));
  return (
    <div className="market">
      <section className="hero wrap" aria-labelledby="accueil-titre">
        <div>
          <p className="kicker">Guidance en ligne</p>
          <h1 id="accueil-titre">Choisissez un guide, voyez le prix, puis échangez.</h1>
          <p className="lead">Chat, téléphone ou visio. Les profils de cette démo sont fictifs. Le tarif est affiché avant de commencer.</p>
          <form className="search" role="search" onSubmit={(event) => { event.preventDefault(); go(`/guides/?q=${encodeURIComponent(query)}${channel ? `&canal=${channel}` : ""}`); }}>
            <label className="sr" htmlFor="q">Pratique ou thème</label>
            <input id="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Pratique ou thème : tarot, amour, travail…" />
            <button className="btn btn-gold" type="submit">Rechercher</button>
          </form>
          <div className="chips" role="group" aria-label="Canal">
            {[["", "Tous"], ["chat", "Chat"], ["call", "Téléphone"], ["video", "Visio"]].map(([value, label]) => (
              <button key={label} type="button" className={channel === value ? "chip on" : "chip"} onClick={() => setChannel(value)}>{label}</button>
            ))}
          </div>
        </div>
        <A to="/offre-bienvenue/" className="offer">
          <span>Offre de bienvenue</span>
          <strong>[À DÉFINIR]</strong>
          <em>pour le premier échange. Conditions écrites, sans engagement caché.</em>
        </A>
      </section>
      <section className="wrap" aria-labelledby="guides-titre">
        <div className="section-head">
          <h2 id="guides-titre">Les guides</h2>
          <div className="chips">
            <button type="button" className={sort === "dispo" ? "chip on" : "chip"} onClick={() => setSort("dispo")}>Disponibilité</button>
            <button type="button" className={sort === "prix" ? "chip on" : "chip"} onClick={() => setSort("prix")}>Prix</button>
            <A className="chip" to="/guides/">Tout l’annuaire</A>
          </div>
        </div>
        <GuideGrid items={shown} />
      </section>
      <section className="wrap" aria-labelledby="pratiques-titre">
        <h2 id="pratiques-titre">Pratiques</h2>
        <div className="tiles">
          {TILES.map(([slug, label, d]) => (
            <A key={slug} to={`/specialites/${slug}/`} className="tile"><Icon d={d} /><span>{label}</span></A>
          ))}
        </div>
      </section>
      <section className="band" aria-labelledby="etapes-titre">
        <div className="wrap steps">
          <h2 id="etapes-titre">Comment ça se passe</h2>
          <ol>
            <li><strong>1. Choisir</strong><span>Un guide IA, signalé comme tel, ou un profil humain fictif.</span></li>
            <li><strong>2. Créditer</strong><span>Le prix à la minute est connu avant le premier mot.</span></li>
            <li><strong>3. Échanger</strong><span>Le compteur reste visible. Vous arrêtez quand vous voulez.</span></li>
          </ol>
        </div>
      </section>
      <section className="wrap trust" aria-labelledby="confiance-titre">
        <h2 id="confiance-titre">Confiance</h2>
        <div className="trust-grid">
          <article><h3>Paiement sécurisé</h3><p>Carte via Stripe, en simulation ici. Luna ne conserve pas le numéro complet.</p></article>
          <article><h3>Plafonds</h3><p>50 € par jour et 150 € par mois, baissables tout de suite.</p></article>
          <article><h3>3114</h3><p>En cas de détresse, la facturation s’arrête et le 3114, le 15 et le 112 s’affichent.</p></article>
          <article><h3>Transparence IA</h3><p>Badge IA, message d’ouverture, et une réponse claire si vous demandez « es-tu humain ? ».</p></article>
        </div>
      </section>
      <section className="wrap" aria-labelledby="signes-titre">
        <h2 id="signes-titre">Les douze signes</h2>
        <div className="signs">
          {SIGNS.map(([slug, label]) => <A key={slug} to={`/horoscope/${slug}/`} className="sign">{label}</A>)}
        </div>
      </section>
      <section className="wrap" aria-labelledby="magazine-titre">
        <h2 id="magazine-titre">Magazine</h2>
        <div className="ggrid articles">
          {articles.slice(0, 3).map((article) => (
            <A key={article.path} to={article.path} className="article-card">
              <p className="kicker">Article</p>
              <h3>{article.h1}</h3>
              <p>{article.description}</p>
            </A>
          ))}
        </div>
      </section>
      <section className="wrap cta-band" aria-labelledby="candidature-titre">
        <div>
          <h2 id="candidature-titre">Proposer votre pratique</h2>
          <p>Les humains sur Luna sont des guides indépendants. Cette démo n’en recrute pas encore.</p>
        </div>
        <A className="btn btn-gold" to="/devenir-voyant/">Devenir guide</A>
      </section>
      {home && (
        <section className="wrap more" aria-labelledby="cadre-titre">
          <h2 id="cadre-titre">Le cadre, en quelques lignes</h2>
          <Markdown source={home.body.replace(/^# .+\n+/, "")} />
        </section>
      )}
      <span className="sr">{path}</span>
    </div>
  );
}

export function Profile({ slug }: { slug: string }) {
  const guide = voyants.find((item) => item.slug === slug);
  const page = pageByPath.get(`/voyants/${slug}/`);
  const { path } = useRoute();
  const [tab, setTab] = useState<"presentation" | "pratiques" | "dispos" | "avis" | "tarifs">("presentation");
  if (!guide || !page) return null;
  const status = guideStatus(guide);
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  return (
    <article className="profile-page" aria-labelledby="profil-nom">
      <header className="profile-hero wrap">
        <Portrait guide={guide} from={path} />
        <div>
          <p className="pill">Profil fictif – démonstration</p>
          <h1 id="profil-nom">{guide.name}</h1>
          <p className="badges">
            {guide.kind === "ai" ? <span className="pill pill-ai">IA</span> : <span className="pill pill-human">Fictif</span>}
            <span className={`status s-${status}`}>{statusLabel(status, guide.kind === "human")}</span>
          </p>
          {guide.kind === "ai" && <p className="banner-ai">Guide virtuel : intelligence artificielle</p>}
          <p className="prices">
            <span>Chat {euros(guide.demoChatCents)}/min</span>
            <span>Appel {euros(guide.demoCallCents)}/min</span>
            <span>Visio {euros(guide.demoVideoCents)}/min</span>
          </p>
          <div className="profile-cta">
            <A className="btn btn-gold" to={`/voyants/${slug}/consulter/`}>Chat</A>
            <A className="btn btn-ghost" to={`/session/appel/${slug}/`}>Appeler</A>
            <A className="btn btn-ghost" to={`/session/video/${slug}/`}>Visio</A>
          </div>
        </div>
      </header>
      <div className="wrap">
        <div className="tabs" role="tablist">
          {([["presentation", "Présentation"], ["pratiques", "Pratiques"], ["dispos", "Disponibilités"], ["avis", "Avis"], ["tarifs", "Tarifs"]] as const).map(([id, label]) => (
            <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? "chip on" : "chip"} onClick={() => setTab(id)}>{label}</button>
          ))}
        </div>
        {tab === "presentation" && <Markdown source={page.body.replace(/^# .+$/m, "")} />}
        {tab === "pratiques" && <p className="practices big">{guidePractices(guide).join(" · ")}</p>}
        {tab === "dispos" && (
          <div className="calendar" aria-label="Semaine type, simulation">
            {days.map((day) => (
              <div key={day}>
                <strong>{day}</strong>
                {[9, 11, 14, 16, 18].map((hour) => {
                  const open = guide.kind === "ai" || (day.charCodeAt(0) + hour) % 3 !== 0;
                  return <span key={hour} className={open ? "slot open" : "slot"}>{hour} h {open ? "ouvert" : "fermé"}</span>;
                })}
              </div>
            ))}
          </div>
        )}
        {tab === "avis" && <p className="empty">Aucun avis publié. Seule une consultation réelle pourra en laisser un, daté, après modération.</p>}
        {tab === "tarifs" && (
          <div className="trust-grid">
            <article><h3>Chat</h3><p>{euros(guide.demoChatCents)} TTC / min en démonstration. Le texte du profil conserve les montants encore [À DÉFINIR].</p></article>
            <article><h3>Téléphone</h3><p>{euros(guide.demoCallCents)} TTC / min. Numéros masqués. Pas d’enregistrement par défaut.</p></article>
            <article><h3>Visio</h3><p>{euros(guide.demoVideoCents)} TTC / min. La visio n’est jamais enregistrée.</p></article>
          </div>
        )}
      </div>
    </article>
  );
}
