import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import { shouldWarn } from "@domain/billing";
import { hasGranted, type ConsentRecord } from "@domain/consent";
import { AI_TRAINING_BOX, ART9_BOX, ART9_INTRO, CGU_LABEL, CGV_LABEL, ENTERTAINMENT, LEGAL_VERSION, MARKETING, MARKETING_INTRO, RECORDING_IVR, VIDEO_NOTICE, WAIVER_LABEL, AGE_LABEL } from "../data/legal-copy";
import { PACKS } from "@domain/packs";
import { allRoutes, pageByPath, voyantBySlug, voyants, type CatalogPage } from "../data/routes";
import { clock, euros } from "../lib/format";
import { LUNA_CONFIG, apiPost } from "../config";
import { store, type Session } from "../store/demoStore";
import { Markdown } from "../components/markdown";
import { Directory, Home, portraitAlt, portraitSrc, Profile } from "../components/marketplace";
import { A, useRoute } from "../components/route";

function Gate({ onDone }: { onDone: (ok: boolean) => void }) {
  const [checked, setChecked] = useState(false);
  return (
    <div className="gate" role="dialog" aria-modal="true" aria-labelledby="art9-title" data-testid="sensitive-consent-screen">
      <div className="panel">
        <h2 id="art9-title">Avant votre première consultation</h2>
        {ART9_INTRO.split("\n\n").map((paragraph) => <p key={paragraph.slice(0, 24)}>{paragraph}</p>)}
        <label className="check"><input data-testid="sensitive-consent" type="checkbox" checked={checked} onChange={(event) => setChecked(event.target.checked)} /> <span>{ART9_BOX}</span></label>
        <div className="btn-row">
          <button className="btn btn-ghost" type="button" data-testid="sensitive-consent-refuse" onClick={() => onDone(false)}>Je refuse</button>
          <button className="btn btn-gold" type="button" data-testid="sensitive-consent-accept" disabled={!checked} onClick={() => onDone(true)}>Je donne mon accord</button>
        </div>
      </div>
    </div>
  );
}

function needArt9(): boolean {
  const user = store.user();
  if (!user) return false;
  const records: ConsentRecord[] = store.state.consents.filter((event) => event.userId === user.id).map((event) => ({ purpose: event.purpose, granted: event.action === "granted", at: event.at }));
  return !hasGranted(records, "sensitive_data_art9");
}

function Doc({ page }: { page: CatalogPage }) {
  return (
    <article className="wrap" aria-label={page.h1}>
      <Markdown source={page.body} />
    </article>
  );
}

function PackButtons() {
  const { go } = useRoute();
  return (
    <div className="grid cards">
      {PACKS.map((pack) => (
        <article className="card" key={pack.id}>
          <h2>{pack.name}</h2>
          <p>Vous payez {euros(pack.payCents)}. Vous recevez {euros(pack.creditCents)} de crédits. Le bonus n’est pas remboursable en argent.</p>
          <button className="btn btn-gold" type="button" data-testid={pack.id === "p20" ? "pack-20" : pack.id === "p50" ? "pack-50" : "pack-100"} onClick={() => go(`/compte/paiement/?pack=${pack.id}`)}>Choisir {euros(pack.payCents)}</button>
        </article>
      ))}
    </div>
  );
}

function Signup() {
  const { go } = useRoute();
  const [error, setError] = useState<string | null>(null);
  const [marketing, setMarketing] = useState<Record<string, boolean>>({ marketing_email: false, marketing_sms: false, marketing_whatsapp: false, marketing_push: false });
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = await store.signup({
      firstName: String(data.get("firstName") || ""),
      lastName: String(data.get("lastName") || ""),
      email: String(data.get("email") || ""),
      password: String(data.get("password") || ""),
      birthDate: String(data.get("birthDate") || ""),
      adult: data.get("adult") === "on",
      cgu: data.get("cgu") === "on",
      marketing,
    });
    if (message) setError(message);
    else go("/compte/");
  }
  return (
    <form className="wrap" data-testid="signup-form" onSubmit={onSubmit} aria-labelledby="page-title">
      <h1 id="page-title">Créer un compte</h1>
      <label className="field">Prénom<input name="firstName" required autoComplete="given-name" /></label>
      <label className="field">Nom<input name="lastName" required autoComplete="family-name" /></label>
      <label className="field">E-mail<input name="email" type="email" required autoComplete="email" data-testid="signup-email" /></label>
      <label className="field">Mot de passe<input name="password" type="password" required minLength={12} autoComplete="new-password" data-testid="signup-password" /></label>
      <label className="field">Date de naissance<input name="birthDate" type="date" required data-testid="signup-birth" /></label>
      <label className="check"><input name="adult" type="checkbox" data-testid="signup-adult" /> <span>{AGE_LABEL}</span></label>
      <label className="check"><input name="cgu" type="checkbox" data-testid="signup-cgu" /> <span>{CGU_LABEL} <A to="/cgu/">Lire les CGU</A>. <A to="/confidentialite/">Lire la politique</A>.</span></label>
      <fieldset>
        <legend>{MARKETING_INTRO}</legend>
        {Object.entries(MARKETING).map(([key, label]) => (
          <label className="check" key={key}><input type="checkbox" checked={marketing[key]} onChange={(event) => setMarketing({ ...marketing, [key]: event.target.checked })} /> <span>{label}</span></label>
        ))}
      </fieldset>
      {error && <p className="alert" role="alert">{error}</p>}
      <button className="btn btn-gold" type="submit" data-testid="signup-submit">Créer mon compte</button>
    </form>
  );
}

function Login() {
  const { go } = useRoute();
  const [error, setError] = useState<string | null>(null);
  const [otp, setOtp] = useState(false);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (otp) {
      const message = store.verifyOtp(String(data.get("otp") || ""));
      if (message) setError(message);
      else go("/admin/");
      return;
    }
    const result = await store.login(String(data.get("email") || ""), String(data.get("password") || ""));
    if (result === "otp") { setOtp(true); setError(null); return; }
    if (result !== "ok") { setError(result); return; }
    const role = store.user()?.role;
    go(role === "admin" ? "/admin/" : role === "voyant" ? "/espace-voyant/" : "/compte/");
  }
  return (
    <form className="wrap" data-testid="login-form" onSubmit={onSubmit} aria-labelledby="page-title">
      <h1 id="page-title">Connexion</h1>
      {!otp && <>
        <label className="field">E-mail<input name="email" type="email" required data-testid="login-email" autoComplete="username" /></label>
        <label className="field">Mot de passe<input name="password" type="password" required data-testid="login-password" autoComplete="current-password" /></label>
      </>}
      {otp && <>
        <p>Un code de démonstration est affiché ici, parce qu’aucun e-mail réel n’est envoyé. <strong data-testid="demo-otp">{store.state.pendingOtp?.code}</strong></p>
        <label className="field">Code<input name="otp" inputMode="numeric" required /></label>
      </>}
      {error && <p className="alert" role="alert">{error}</p>}
      <button className="btn btn-gold" type="submit" data-testid="login-submit">{otp ? "Valider le code" : "Se connecter"}</button>
      <p><A to="/mot-de-passe-oublie/">Mot de passe oublié</A></p>
    </form>
  );
}

function Checkout() {
  const { search, go } = useRoute();
  const packId = search.get("pack") || "p20";
  const pack = PACKS.find((item) => item.id === packId) ?? PACKS[0];
  const [error, setError] = useState<string | null>(null);
  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = await store.purchase({
      packId: pack.id,
      number: String(data.get("number") || ""),
      expiry: String(data.get("expiry") || ""),
      cvc: String(data.get("cvc") || ""),
      name: String(data.get("name") || ""),
      cgu: data.get("cgv") === "on",
      waiver: data.get("waiver") === "on",
      promo: String(data.get("promo") || ""),
      saveCard: data.get("save") === "on",
    });
    if (LUNA_CONFIG.mode === "api") await apiPost("/api/payments/checkout", { packId: pack.id, card: String(data.get("number") || "") });
    if (message) setError(message);
    else go("/compte/portefeuille/");
  }
  return (
    <form className="wrap" onSubmit={onSubmit}>
      <h1>Paiement simulé</h1>
      <p>Pack {pack.name} : {euros(pack.payCents)} payés, {euros(pack.creditCents)} crédités. Adaptateur Stripe, mode test. Le numéro complet n’est pas stocké.</p>
      <label className="field">Numéro de carte<input name="number" data-testid="card-number" autoComplete="cc-number" inputMode="numeric" required placeholder="4242 4242 4242 4242" /></label>
      <label className="field">Expiration<input name="expiry" data-testid="card-expiry" autoComplete="cc-exp" required placeholder="12/30" /></label>
      <label className="field">Cryptogramme<input name="cvc" data-testid="card-cvc" autoComplete="cc-csc" required placeholder="123" /></label>
      <label className="field">Nom sur la carte<input name="name" data-testid="card-name" autoComplete="cc-name" required /></label>
      <label className="field">Code promo<input name="promo" placeholder="BIENVENUE" /></label>
      <label className="check"><input name="cgv" type="checkbox" /> <span>{CGV_LABEL}</span></label>
      <label className="check"><input name="waiver" type="checkbox" /> <span>{WAIVER_LABEL}</span></label>
      <label className="check"><input name="save" type="checkbox" /> <span>Enregistrer la carte via un SetupIntent simulé (4 derniers chiffres seulement).</span></label>
      {error && <p className="alert" role="alert">{error}</p>}
      <button className="btn btn-gold" type="submit" data-testid="pay-button">Payer {euros(pack.payCents)}</button>
    </form>
  );
}

function SessionScreen({ slug, channel }: { slug: string; channel: Session["channel"] }) {
  const guide = voyantBySlug(slug);
  const { go, path } = useRoute();
  const [now, setNow] = useState(Date.now());
  const [error, setError] = useState<string | null>(null);
  const [gate, setGate] = useState(false);
  const [text, setText] = useState("");
  const user = store.user();
  const session = store.state.sessions.find((item) => item.clientId === user?.id && item.voyantSlug === slug && item.channel === channel && item.status === "active");
  useEffect(() => {
    if (!session) return;
    const timer = window.setInterval(() => {
      store.tick(session.id);
      setNow(Date.now());
    }, 1000);
    return () => window.clearInterval(timer);
  }, [session?.id, session?.status]);
  if (!guide) return <p className="wrap">Guide introuvable.</p>;
  async function begin() {
    if (!store.user()) { go("/connexion/"); return; }
    if (needArt9()) { setGate(true); return; }
    const result = await store.startSession(slug, channel);
    if (result === "CONSENT") setGate(true);
    else if (result && result.startsWith("ses_")) setError(null);
    else setError(result);
  }
  async function accept(ok: boolean) {
    await store.setConsent("sensitive_data_art9", ok, ART9_BOX, "first_session_gate");
    setGate(false);
    if (!ok) { setError("Sans cet accord, nous ne pouvons pas vous proposer de consultation. Les contenus gratuits du site restent accessibles."); return; }
    const result = await store.startSession(slug, channel);
    if (result && !result.startsWith("ses_")) setError(result);
  }
  const elapsed = session ? Math.floor((now - new Date(session.startedAt).getTime()) / 1000) : 0;
  const spent = session ? session.billedMinutes * session.rateCentsPerMin : 0;
  const remain = session ? Math.floor(store.remaining(session, now) / 1000) : 0;
  const messages = session ? store.state.messages.filter((message) => message.sessionId === session.id) : [];
  const rate = channel === "call" ? guide.demoCallCents : channel === "video" ? guide.demoVideoCents : guide.demoChatCents;
  const cap = 5000;
  const gauge = Math.max(0, Math.min(100, Math.round((store.usable() / cap) * 100)));
  return (
    <section className="room" aria-label="Séance">
      {gate && <Gate onDone={accept} />}
      <header className="room-bar">
        <img src={portraitSrc(path, guide)} alt={portraitAlt(guide)} width={52} height={52} />
        <div>
          <strong>{channel === "call" ? `Appel · ${guide.name}` : channel === "video" ? `Visio · ${guide.name}` : guide.name}</strong>
          <p className="badges">
            <span className="illus">Illustration</span>
            {guide.kind === "ai" ? <span className="pill pill-ai">IA</span> : <span className="pill">Profil fictif</span>}
            {guide.kind === "ai" && <span className="banner-ai">Guide virtuel : intelligence artificielle</span>}
          </p>
        </div>
        <div className="gauge">
          <p className="counter" data-testid={channel === "chat" ? "chat-countdown" : "call-counter"}>{session ? `${clock(elapsed)} · ${euros(spent)} · reste ${clock(remain)}` : `${euros(rate)}/min · crédit ${euros(store.usable())}`}</p>
          <i><b style={{ width: `${gauge}%` }} /></i>
        </div>
      </header>
      {!session && <div className="wrap"><p>{euros(rate)} TTC par minute, affiché avant de commencer. {guide.kind === "human" ? "Disponibilité simulée." : "Disponible maintenant."}</p>{channel === "chat" && <button className="btn btn-gold" type="button" data-testid="start-chat" onClick={begin}>Démarrer le chat</button>}{channel !== "chat" && <button className="btn btn-gold" type="button" onClick={begin}>Démarrer la simulation</button>}</div>}
      {channel === "call" && <div className="wrap panel"><h2>Twilio Voice, mode démo</h2><p>Pont d’appel : les numéros restent masqués. Aucun enregistrement par défaut.</p><p>{RECORDING_IVR}</p>{session && <label className="check"><input type="checkbox" checked={session.recordingConsent} onChange={(event) => store.setRecording(session.id, event.target.checked)} /> <span>Touche 1 : j’accepte l’enregistrement qualité de cet appel, conservé 30 jours.</span></label>}</div>}
      {channel === "video" && <div className="wrap panel video-stage"><img src={portraitSrc(path, guide)} alt={portraitAlt(guide)} width={160} height={160} /><h2>Salle Daily simulée</h2><p>{VIDEO_NOTICE}</p><p>recordParticipantsOnConnect = false. Salle : {session?.dailyRoom ?? "créée au démarrage"}.</p><A to="/session/test/">Essayer la caméra et le micro</A></div>}
      {session && (
        <>
          {shouldWarn(remain * 1000) && <p className="warn wrap" role="status">Il reste moins d’une minute de crédit.</p>}
          {session.confirmPending && (
            <div className="panel wrap" role="dialog" aria-modal="true">
              <p>Vous êtes en consultation depuis {Math.floor(elapsed / 60)} minutes. Cela vous a coûté {euros(spent)}. Voulez-vous continuer ?</p>
              <div className="btn-row">
                <button className="btn btn-ghost" type="button" data-testid="end-session" onClick={() => store.endSession(session.id)}>Terminer la séance</button>
                <button className="btn btn-gold" type="button" onClick={() => store.continueSession(session.id)}>Continuer 15 minutes</button>
              </div>
            </div>
          )}
          <div className="chat" aria-live="polite">
            {messages.map((message) => <p key={message.id} className={`bubble ${message.sender === "client" ? "client" : ""}`}><strong>{message.sender === "system" ? "Luna" : message.sender === "client" ? "Vous" : guide.name}</strong><br />{message.body}</p>)}
          </div>
          {channel === "chat" && (
            <form className="composer" onSubmit={(event) => { event.preventDefault(); if (!text.trim()) return; store.sendMessage(session.id, text); setText(""); }}>
              <label className="sr" htmlFor="chat-input">Message</label>
              <textarea id="chat-input" data-testid="chat-input" value={text} onChange={(event) => setText(event.target.value)} />
              <button className="btn btn-gold" type="submit" data-testid="chat-send">Envoyer</button>
            </form>
          )}
          {!session.confirmPending && <div className="wrap"><button className="btn btn-ghost" type="button" data-testid="end-session" onClick={() => store.endSession(session.id)}>Terminer la séance</button> <Report target={session.id} /></div>}
        </>
      )}
      {error && <p className="alert wrap" role="alert">{error}</p>}
      <p className="wrap muted">{ENTERTAINMENT}</p>
    </section>
  );
}

function Report({ target }: { target: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState("");
  return (
    <div>
      <button className="btn btn-ghost" type="button" data-testid="report-button" onClick={() => setOpen(true)}>Signaler</button>
      {open && (
        <form onSubmit={(event) => { event.preventDefault(); store.report(target, reason); setOpen(false); }}>
          <label className="field">Motif du signalement<textarea value={reason} onChange={(event) => setReason(event.target.value)} required /></label>
          <button className="btn btn-gold" type="submit">Envoyer le signalement</button>
        </form>
      )}
    </div>
  );
}

function Booking({ slug }: { slug: string }) {
  const guide = voyantBySlug(slug);
  const [picked, setPicked] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [gate, setGate] = useState(false);
  const choices = useMemo(() => {
    const start = new Date();
    start.setHours(9, 0, 0, 0);
    const list: { iso: string; label: string; free: boolean }[] = [];
    for (let day = 1; day <= 4; day += 1) {
      for (const hour of [9, 11, 14, 16]) {
        const date = new Date(start);
        date.setDate(start.getDate() + day);
        date.setHours(hour);
        list.push({ iso: date.toISOString(), label: date.toLocaleString("fr-FR", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }), free: (day + hour) % 5 !== 0 });
      }
    }
    return list;
  }, []);
  if (!guide) return null;
  async function confirm() {
    if (!picked) return;
    if (needArt9()) { setGate(true); return; }
    setMessage(store.book(slug, picked));
  }
  return (
    <section className="wrap">
      {gate && <Gate onDone={async (ok) => { await store.setConsent("sensitive_data_art9", ok, ART9_BOX, "booking"); setGate(false); if (ok && picked) setMessage(store.book(slug, picked)); }} />}
      <h1>Réserver une visio avec {guide.name}</h1>
      <p>Créneau simulé de 10 minutes, payé avant la consultation : {euros(guide.demoVideoCents * 10)}. {guide.kind === "human" ? "Disponibilité simulée." : "Guide IA."} La visio n’est pas enregistrée.</p>
      <div className="btn-row">
        {choices.map((choice) => <button key={choice.iso} className="btn btn-ghost" type="button" disabled={!choice.free} data-testid={choice.free ? "booking-slot" : undefined} aria-pressed={picked === choice.iso} onClick={() => setPicked(choice.iso)}>{choice.label}{choice.free ? "" : " (pris)"}</button>)}
      </div>
      <button className="btn btn-gold" type="button" data-testid="booking-confirm" disabled={!picked} onClick={confirm}>Confirmer et payer</button>
      {message && <p className={message ? "alert" : "ok"} role="status">{message}</p>}
      {!message && store.state.bookings.some((booking) => booking.voyantSlug === slug && booking.clientId === store.user()?.id) && <p className="ok">Réservation confirmée. Salle Daily simulée prête.</p>}
    </section>
  );
}

function DeviceTest() {
  const [message, setMessage] = useState("Aucun flux pour le moment.");
  async function testDevices() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const video = document.querySelector("video");
      if (video) video.srcObject = stream;
      setMessage("Caméra et micro détectés. Rien n’est enregistré.");
    } catch {
      setMessage("Autorisation refusée ou absente. Vous pouvez continuer en simulation, sans flux réel.");
    }
  }
  return (
    <section className="wrap" data-testid="video-device-test">
      <h1>Essai du matériel</h1>
      <p>Activez la caméra et le micro avant une visio. Aucun enregistrement n’est lancé.</p>
      <video autoPlay muted playsInline width={320} height={240} />
      <p role="status">{message}</p>
      <button className="btn btn-gold" type="button" onClick={testDevices}>Tester la caméra et le micro</button>
    </section>
  );
}

function simple(title: string, body: ReactNode) {
  return <section className="wrap" aria-labelledby="page-title"><h1 id="page-title">{title}</h1>{body}</section>;
}

export function View() {
  const { path, search, go } = useRoute();
  const [, setTick] = useState(0);
  useEffect(() => store.subscribe(() => setTick((value) => value + 1)), []);
  if (path === "/") return <Home />;
  if (path === "/guides/" || path === "/voyants/") return <Directory base={path} />;
  const profile = /^\/voyants\/([^/]+)\/$/.exec(path);
  if (profile && voyantBySlug(profile[1])) return <Profile slug={profile[1]} />;
  const editorial = pageByPath.get(path);
  if (editorial) return <Doc page={editorial} />;
  const consulter = /^\/voyants\/([^/]+)\/consulter\/$/.exec(path);
  if (consulter) return <SessionScreen slug={consulter[1]} channel="chat" />;
  const call = /^\/session\/appel\/([^/]+)\/$/.exec(path);
  if (call) return <SessionScreen slug={call[1]} channel="call" />;
  const video = /^\/session\/video\/([^/]+)\/$/.exec(path);
  if (video) return <SessionScreen slug={video[1]} channel="video" />;
  const book = /^\/reserver\/([^/]+)\/$/.exec(path);
  if (book) return <Booking slug={book[1]} />;
  if (path === "/session/test/") return <DeviceTest />;
  if (path === "/specialites/" || path === "/themes/" || path === "/horoscope/" || path === "/blog/") return <Index prefix={path} />;
  if (path === "/tarifs/" || path === "/compte/recharger/") return <section className="wrap" aria-labelledby="page-title"><h1 id="page-title">Recharges</h1><PackButtons /></section>;
  if (path === "/inscription/") return <Signup />;
  if (path === "/connexion/") return <Login />;
  if (path === "/compte/paiement/") return <Checkout />;
  if (path === "/compte/portefeuille/" || path === "/compte/") return <Wallet home={path === "/compte/"} />;
  if (path === "/admin/" || path.startsWith("/admin/")) return <AdminShell path={path} />;
  if (path === "/plan-du-site/") return <Plan />;
  if (path === "/compte/plafond/") return <Caps />;
  if (path === "/compte/pause/") return <Pause />;
  if (path === "/compte/confidentialite/" || path === "/compte/mes-donnees/") return <Privacy />;
  if (path === "/compte/abonnement/") return <Subscription />;
  if (path === "/devenir-voyant/candidature/") return <Apply />;
  if (path === "/avis/") return simple("Avis", <p>Aucun avis n’est publié. Seules les personnes ayant réalisé une consultation payante pourront en laisser un, daté, après contrôle. Les profils fictifs n’affichent ni note ni témoignage.</p>);
  if (path === "/preferences-cookies/") return simple("Préférences cookies", <p>Utilisez « Gérer mes cookies » en bas de page. Tout refuser est au même niveau que tout accepter.</p>);
  if (path === "/desinscription/") return <Unsubscribe />;
  if (path.startsWith("/espace-voyant")) return <VoyantSpace path={path} />;
  if (path.startsWith("/compte/")) return <AccountRest path={path} />;
  if (path === "/mot-de-passe-oublie/") return <Forgot />;
  if (path === "/reinitialiser-mot-de-passe/") return <Reset token={search.get("token") || ""} />;
  if (path === "/contact/") return <Contact />;
  if (path === "/sous-traitants/") return <Subprocessors />;
  if (path === "/a-propos/" || path === "/transparence/" || path === "/accessibilite/" || path === "/aide/" || path.startsWith("/aide/")) return <Info path={path} />;
  if (path === "/legal/archives/") return simple("Archives des textes", <><p>Version en vigueur : {LEGAL_VERSION}. Les textes actuels :</p><ul><li><A to="/cgu/">CGU</A></li><li><A to="/cgv/">CGV</A></li><li><A to="/confidentialite/">Politique de confidentialité</A></li><li><A to="/cookies/">Politique cookies</A></li><li><A to="/mentions-legales/">Mentions légales</A></li><li><A to="/conditions-guides/">Conditions des guides</A></li></ul><p>Aucune version antérieure n’a encore été publiée.</p></>);
  if (path === "/404/") return simple("Page introuvable", <p>Cette adresse ne mène nulle part. <A to="/">Retour à l’accueil</A>.</p>);
  return simple("Page introuvable", <p>Cette adresse ne mène nulle part. <A to="/404/">Page 404</A>.</p>);
  function goUnused() { go("/"); }
  void goUnused;
}

function Index({ prefix }: { prefix: string }) {
  const items = allRoutes().filter((route) => route.path.startsWith(prefix) && route.path !== prefix);
  const titles: Record<string, string> = { "/specialites/": "Pratiques", "/themes/": "Thèmes", "/horoscope/": "Signes", "/blog/": "Magazine" };
  return <section className="wrap" aria-labelledby="page-title"><h1 id="page-title">{titles[prefix]}</h1><ul>{items.map((route) => <li key={route.path}><A to={route.path}>{route.title}</A></li>)}</ul></section>;
}

function Wallet({ home }: { home: boolean }) {
  const user = store.user();
  if (!user) return simple("Mon compte", <p><A to="/connexion/">Connectez-vous</A> ou <A to="/inscription/">créez un compte</A>.</p>);
  const used = Math.min(100, Math.round((spentToday(user.id) / user.dailyCapCents) * 100));
  return (
    <section className="wrap saas" aria-labelledby="page-title">
      <nav className="saas-nav" aria-label="Compte">
        <A to="/compte/" aria-current={home ? "page" : undefined}>Tableau de bord</A>
        <A to="/compte/portefeuille/">Portefeuille</A>
        <A to="/compte/conversations/">Séances</A>
        <A to="/compte/reservations/">Réservations</A>
        <A to="/compte/plafond/">Plafonds</A>
        <A to="/compte/confidentialite/">Confidentialité</A>
      </nav>
      <div>
        <h1 id="page-title">{home ? `Bonjour ${user.firstName}` : "Portefeuille"}</h1>
        <div className="kpis">
          <article className="kpi"><span>Solde</span><strong data-testid="wallet-balance">{euros(store.balance(user.id))}</strong><span>Utilisable {euros(store.usable(user.id))}</span></article>
          <article className="kpi"><span>Plafond du jour</span><strong>{euros(user.dailyCapCents)}</strong><span>{used} % engagé</span></article>
          <article className="kpi"><span>Plafond du mois</span><strong>{euros(user.monthlyCapCents)}</strong></article>
        </div>
        <p className="gauge"><i><b style={{ width: `${used}%` }} /></i></p>
        <div className="btn-row">
          <A className="btn btn-gold" to="/compte/recharger/">Recharger</A>
          <A className="btn btn-ghost" to="/compte/pause/">Faire une pause</A>
        </div>
        {!home && <PackButtons />}
      </div>
    </section>
  );
}

function spentToday(userId: string): number {
  const day = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Paris", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  return store.state.payments.filter((payment) => payment.userId === userId && payment.createdAt.slice(0, 10) === day).reduce((sum, payment) => sum + payment.paidCents, 0);
}

function Disputes() {
  const user = store.user();
  if (!user || user.role !== "admin") return simple("Litiges", <p>Réservé à l’administration. <A to="/connexion/">Connexion</A></p>);
  return (
    <section className="wrap">
      <h1>Litiges et remboursements</h1>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Paiement</th><th>Compte</th><th>Statut</th><th></th></tr></thead>
          <tbody>
            {store.state.disputes.map((dispute) => (
              <tr key={dispute.id} data-testid="dispute-row">
                <td>{dispute.reason}</td>
                <td>{dispute.email}</td>
                <td>{dispute.status === "remboursee" ? "Remboursé" : dispute.status}</td>
                <td>{dispute.status === "ouverte" && <button className="btn btn-gold" type="button" data-testid="admin-refund" onClick={() => store.refund(dispute.paymentId)}>Rembourser</button>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Caps() {
  const user = store.user();
  const [daily, setDaily] = useState(user ? user.dailyCapCents / 100 : 50);
  const [monthly, setMonthly] = useState(user ? user.monthlyCapCents / 100 : 150);
  const [message, setMessage] = useState<string | null>(null);
  if (!user) return simple("Plafond", <A to="/connexion/">Connexion</A>);
  return (
    <form className="wrap" onSubmit={(event) => { event.preventDefault(); setMessage(store.setCap(Math.round(daily * 100), Math.round(monthly * 100))); }}>
      <h1>Plafond de dépense</h1>
      <p>Par défaut, 50 € par jour et 150 € par mois. Une baisse est immédiate. Une hausse prend effet après 72 heures. {user.pendingCap && `Hausse prévue le ${new Date(user.pendingCap.at).toLocaleString("fr-FR")}.`}</p>
      <label className="field">Plafond du jour (€)<input type="number" min={0} max={150} value={daily} onChange={(event) => setDaily(Number(event.target.value))} /></label>
      <label className="field">Plafond du mois (€)<input type="number" min={0} max={500} value={monthly} onChange={(event) => setMonthly(Number(event.target.value))} /></label>
      <button className="btn btn-gold" type="submit">Enregistrer</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

function Pause() {
  const user = store.user();
  if (!user) return simple("Pause", <A to="/connexion/">Connexion</A>);
  return (
    <section className="wrap">
      <h1>Faire une pause</h1>
      <p>La pause est immédiate : plus de séance, de recharge, de prospection ni de bonus. {user.selfExclusionUntil ? `En cours jusqu’au ${user.selfExclusionUntil}.` : "Aucune pause en cours."}</p>
      <div className="btn-row">
        {[["7 jours", new Date(Date.now() + 7 * 86400000).toISOString()], ["30 jours", new Date(Date.now() + 30 * 86400000).toISOString()], ["6 mois", new Date(Date.now() + 182 * 86400000).toISOString()], ["1 an", new Date(Date.now() + 365 * 86400000).toISOString()], ["Définitive", "definitive"]].map(([label, value]) => (
          <button key={label} className="btn btn-ghost" type="button" onClick={() => store.exclude(value)}>{label}</button>
        ))}
      </div>
    </section>
  );
}

function Privacy() {
  const user = store.user();
  if (!user) return simple("Confidentialité", <A to="/connexion/">Connexion</A>);
  const purposes = ["sensitive_data_art9", "marketing_email", "marketing_sms", "marketing_whatsapp", "marketing_push", "ai_training", "cookies_audience"];
  return (
    <section className="wrap">
      <h1>Confidentialité</h1>
      <ul>
        {purposes.map((purpose) => {
          const latest = [...store.state.consents].reverse().find((event) => event.userId === user.id && event.purpose === purpose);
          return <li key={purpose}>{purpose} : {latest ? `${latest.action} le ${latest.at} (version ${latest.version}, IP ${latest.ipTruncated})` : "aucun choix"} <button type="button" className="btn btn-ghost" onClick={() => store.setConsent(purpose, false, purpose)}>Retirer</button></li>;
        })}
      </ul>
      <label className="check"><input type="checkbox" onChange={(event) => store.setConsent("ai_training", event.target.checked, AI_TRAINING_BOX, "settings")} /> <span>{AI_TRAINING_BOX}</span></label>
      <button className="btn btn-gold" type="button" onClick={() => { const blob = new Blob([store.exportJson()], { type: "application/json" }); const url = URL.createObjectURL(blob); const link = document.createElement("a"); link.href = url; link.download = "luna-donnees.json"; link.click(); }}>Télécharger mes données</button>
      <button className="btn btn-ghost" type="button" onClick={() => store.requestData("delete")}>Supprimer mon compte</button>
    </section>
  );
}

function Subscription() {
  const user = store.user();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  return (
    <section className="wrap">
      <h1>Abonnement Luna+</h1>
      <p>Prix : [PRIX] € TTC par [mois]. Résiliation en trois clics, sans frais.</p>
      {user && <button className="btn btn-ghost" type="button" onClick={() => { user.lunaPlus = "active"; setStep(1); }}>Souscrire (simulation)</button>}
      {step === 1 && <button className="btn btn-ghost" type="button" onClick={() => setStep(2)}>Résilier mon abonnement</button>}
      {step === 2 && <button className="btn btn-ghost" type="button" onClick={() => setStep(3)}>Confirmer la résiliation</button>}
      {step === 3 && <button className="btn btn-gold" type="button" onClick={() => { if (user) user.lunaPlus = "ended"; setDone(true); }}>Valider</button>}
      {done && <p className="ok">Résiliation confirmée. Elle prend effet à la fin de la période en cours.</p>}
    </section>
  );
}

function Apply() {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <form className="wrap" onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); setMessage(store.apply({ name: String(data.get("name")), email: String(data.get("email")), practice: String(data.get("practice")), country: String(data.get("country")) })); }}>
      <h1>Candidature</h1>
      <label className="field">Nom<input name="name" required /></label>
      <label className="field">E-mail<input name="email" type="email" required /></label>
      <label className="field">Pays d’établissement<input name="country" required /></label>
      <label className="field">Pratique<textarea name="practice" required /></label>
      <button className="btn btn-gold" type="submit">Envoyer</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

function Unsubscribe() {
  const { search } = useRoute();
  const [email, setEmail] = useState(search.get("email") || "");
  return (
    <form className="wrap" onSubmit={(event) => { event.preventDefault(); store.unsubscribe(email); }}>
      <h1>Désinscription</h1>
      <label className="field">E-mail<input value={email} onChange={(event) => setEmail(event.target.value)} type="email" required /></label>
      <button className="btn btn-gold" type="submit">Me désinscrire</button>
    </form>
  );
}

function Forgot() {
  const [token, setToken] = useState<string | null>(null);
  return (
    <form className="wrap" onSubmit={async (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); setToken(await store.forgot(String(data.get("email")))); }}>
      <h1>Mot de passe oublié</h1>
      <label className="field">E-mail<input name="email" type="email" required /></label>
      <button className="btn btn-gold" type="submit">Recevoir le lien</button>
      {token && <p>Lien simulé : <A to={`/reinitialiser-mot-de-passe/?token=${token}`}>choisir un nouveau mot de passe</A></p>}
    </form>
  );
}

function Reset({ token }: { token: string }) {
  const [message, setMessage] = useState<string | null>(null);
  return (
    <form className="wrap" onSubmit={async (event) => { event.preventDefault(); const data = new FormData(event.currentTarget); setMessage(await store.reset(token, String(data.get("password")))); }}>
      <h1>Nouveau mot de passe</h1>
      <label className="field">Mot de passe<input name="password" type="password" minLength={12} required /></label>
      <button className="btn btn-gold" type="submit">Enregistrer</button>
      {message === null ? null : <p role="status">{message || "Mot de passe mis à jour."}</p>}
    </form>
  );
}

function Contact() {
  return simple("Contact", <form onSubmit={(event) => event.preventDefault()}><label className="field">Nom<input required /></label><label className="field">E-mail<input type="email" required /></label><label className="field">Message<textarea required /></label><button className="btn btn-gold" type="submit">Envoyer</button><p>Service client : [EMAIL DE CONTACT]. Délai de réponse : [5] jours ouvrés.</p></form>);
}

function Subprocessors() {
  const rows = [
    ["Hébergeur applicatif", "[CROCHET]", "UE recommandée"],
    ["GitHub Pages (prototype statique)", "GitHub, Inc.", "États-Unis — aucune donnée personnelle"],
    ["Stripe", "Stripe Payments Europe", "Irlande, transferts possibles"],
    ["Twilio", "Twilio", "États-Unis par défaut"],
    ["Daily", "Daily", "[CROCHET]"],
    ["Brevo", "Brevo", "[CROCHET]"],
    ["Matomo", "auto-hébergé", "UE"],
    ["[NOM DU FOURNISSEUR D'IA]", "[CROCHET]", "[CROCHET]"],
  ];
  return <section className="wrap"><h1>Sous-traitants</h1><table><tbody>{rows.map((row) => <tr key={row[0]}><td>{row[0]}</td><td>{row[1]}</td><td>{row[2]}</td></tr>)}</tbody></table></section>;
}

function Info({ path }: { path: string }) {
  const texts: Record<string, string> = {
    "/a-propos/": "Luna est un prototype de guidance en ligne. Les guides affichés sont fictifs. Les paiements sont simulés.",
    "/transparence/": "Les guides marqués IA sont des programmes. Ils ne sont pas des personnes. Leurs réponses sont générées automatiquement et peuvent être inexactes.",
    "/accessibilite/": "Le prototype vise le niveau WCAG AA : contrastes, clavier, textes de remplacement, cibles tactiles.",
    "/aide/": "Choisissez un sujet : compte, paiements, consultations ou guides.",
  };
  return simple(path.replaceAll("/", " ").trim() || "Aide", <p>{texts[path] || "Consultez aussi la FAQ et les pages de confidentialité."} <A to="/faq/">FAQ</A></p>);
}

function Plan() {
  const routes = allRoutes();
  return <section className="wrap"><h1>Plan du site</h1><ul>{routes.map((route) => <li key={route.path}><A to={route.path}>{route.title}</A></li>)}</ul></section>;
}

function AdminShell({ path }: { path: string }) {
  const user = store.user();
  if (!user || user.role !== "admin") return simple("Administration", <A to="/connexion/">Connexion administrateur</A>);
  const links = ["/admin/", "/admin/clients/", "/admin/voyants/", "/admin/validations/", "/admin/litiges/", "/admin/audit/", "/admin/retention/", "/admin/rgpd/", "/admin/support/", "/admin/campagnes/", "/admin/securite/"];
  return (
    <section className="wrap saas" aria-label="Administration">
      <nav className="saas-nav" aria-label="Administration">
        {links.map((href) => <A key={href} to={href} aria-current={path === href ? "page" : undefined}>{href.replace("/admin/", "").replace("/", "") || "Tableau"}</A>)}
      </nav>
      <div>{path === "/admin/" ? <AdminHome /> : path === "/admin/litiges/" ? <Disputes /> : <AdminPage path={path} />}</div>
    </section>
  );
}

function AdminHome() {
  const user = store.user();
  if (!user || user.role !== "admin") return simple("Administration", <A to="/connexion/">Connexion administrateur</A>);
  const months = [40, 55, 48, 62, 58, 70];
  return (
    <div>
      <h1 id="page-title">Tableau de bord</h1>
      <div className="kpis">
        <article className="kpi"><span>Clients</span><strong>{store.state.users.filter((item) => item.role === "client").length}</strong></article>
        <article className="kpi"><span>Guides</span><strong>{voyants.length}</strong></article>
        <article className="kpi"><span>Paiements</span><strong>{store.state.payments.length}</strong></article>
        <article className="kpi"><span>Séances</span><strong>{store.state.sessions.length}</strong></article>
      </div>
      <div className="chart" aria-hidden="true">{months.map((value) => <span key={value} style={{ height: `${value}%` }} />)}</div>
      <table><caption>Revenus de démonstration</caption><tbody>{months.map((value, index) => <tr key={index}><td>Mois {index + 1}</td><td>{value}</td></tr>)}</tbody></table>
    </div>
  );
}

function AdminPage({ path }: { path: string }) {
  const user = store.user();
  const [q, setQ] = useState("");
  if (!user || user.role !== "admin") return simple("Administration", <A to="/connexion/">Connexion</A>);
  if (path === "/admin/clients/") {
    const rows = store.state.users.filter((item) => item.role === "client" && `${item.pseudonym} ${item.email}`.toLowerCase().includes(q.toLowerCase()));
    return <div><h1>Clients</h1><label className="field">Recherche<input value={q} onChange={(event) => setQ(event.target.value)} /></label><table><tbody>{rows.map((item) => <tr key={item.id}><td>{item.pseudonym}</td><td>{item.email}</td></tr>)}</tbody></table></div>;
  }
  if (path === "/admin/voyants/") return simple("Guides", <ul>{voyants.map((guide) => <li key={guide.slug}>{guide.name} — {guide.kind === "ai" ? "IA" : "humain fictif"} — {store.state.presence[guide.slug] ? "présence simulée active" : "hors ligne"}</li>)}</ul>);
  if (path === "/admin/validations/") return simple("Validations", <ul>{store.state.applications.map((item) => <li key={item.id}>{item.name} ({item.country}) {item.status} <button type="button" onClick={() => store.decideApplication(item.id, "approved")}>Approuver</button></li>)}</ul>);
  if (path === "/admin/audit/") return simple("Journal d’audit", <ul>{store.state.audit.map((row) => <li key={row.id}>{row.at} — {row.action} — {row.summary}</li>)}</ul>);
  if (path === "/admin/retention/") return simple("Rétention", <button className="btn btn-gold" type="button" onClick={() => store.runPurge()}>Lancer la purge du jour</button>);
  if (path === "/admin/rgpd/") return simple("Demandes", <ul>{store.state.dataRequests.map((item) => <li key={item.id}>{item.type} {item.status} <button type="button" onClick={() => store.resolveData(item.id)}>Traiter</button></li>)}</ul>);
  if (path === "/admin/support/") return <Support />;
  if (path === "/admin/campagnes/") return simple("Campagnes", <><p>Un opt-in par canal, au seul nom de Luna. Pas de ciblage sur les conversations ni la détresse. Pas de démarchage téléphonique.</p><button className="btn btn-gold" type="button" onClick={() => alert(store.sendCampaign())}>Simuler un envoi e-mail</button></>);
  if (path === "/admin/avis/") return simple("Modération", <p>File vide. Exemple de présentation, non publié : « Lecture claire » — cet exemple n’est pas un avis client.</p>);
  if (path === "/admin/securite/") return simple("Sécurité", <p>Le compte administrateur exige un second facteur. Mot de passe argon2 côté serveur. Ici, la démo affiche un code à l’écran.</p>);
  if (path === "/admin/integrations/") return simple("Intégrations", <p>Stripe, Twilio Voice, Daily, Brevo et Matomo sont branchés derrière des adaptateurs. Sans clés, ils restent en mode démo. Audiotel (Media Technologies) est un adaptateur non activé.</p>);
  return simple(path, <p>Réglage de démonstration. Commission actuelle : {store.state.commissionBps / 100} %.</p>);
}

function Support() {
  const [sessionId, setSessionId] = useState(store.state.sessions[0]?.id || "");
  const [ticket, setTicket] = useState("T-1001");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  return (
    <form className="wrap" onSubmit={(event) => { event.preventDefault(); setMessage(store.openSupport(sessionId, ticket, reason)); }}>
      <h1>Accès support</h1>
      <p>Une conversation ne s’ouvre qu’avec un ticket et un motif d’au moins 20 caractères, pendant 4 heures. Le client est prévenu.</p>
      <label className="field">Séance<input value={sessionId} onChange={(event) => setSessionId(event.target.value)} /></label>
      <label className="field">Ticket<input value={ticket} onChange={(event) => setTicket(event.target.value)} /></label>
      <label className="field">Motif<textarea value={reason} onChange={(event) => setReason(event.target.value)} /></label>
      <button className="btn btn-gold" type="submit">Ouvrir 4 heures</button>
      {message && <p role="status">{message}</p>}
    </form>
  );
}

function VoyantSpace({ path }: { path: string }) {
  const user = store.user();
  if (!user || user.role !== "voyant" || !user.voyantSlug) return simple("Espace guide", <p><A to="/connexion/">Connectez-vous avec le compte guide</A>.</p>);
  const guide = voyantBySlug(user.voyantSlug);
  const online = store.state.presence[user.voyantSlug];
  if (path === "/espace-voyant/disponibilites/") {
    return simple("Disponibilité simulée", <><p>Ce réglage ne présente pas le guide comme réellement disponible au lancement.</p><button className="btn btn-gold" type="button" onClick={() => store.setPresence(user.voyantSlug!, !online)}>{online ? "Passer hors ligne (simulation)" : "Marquer en ligne (simulation)"}</button></>);
  }
  if (path === "/espace-voyant/consultations/") {
    const rows = store.state.sessions.filter((session) => session.voyantSlug === user.voyantSlug);
    return simple("Consultations", <ul>{rows.map((session) => <li key={session.id}>{store.clientForVoyant(session.clientId)?.pseudonym} — {session.channel} — {euros(session.billedMinutes * session.rateCentsPerMin)}</li>)}</ul>);
  }
  return simple(guide?.name || "Guide", <><p>Profil fictif. Commission de démonstration : 30 %. Les coordonnées réelles des clients ne sont pas affichées.</p><A to="/espace-voyant/disponibilites/">Disponibilités</A></>);
}

function AccountRest({ path }: { path: string }) {
  const user = store.user();
  if (!user) return simple("Compte", <A to="/connexion/">Connexion</A>);
  if (path === "/compte/transactions/") return simple("Transactions", <ul>{store.state.ledger.filter((row) => row.userId === user.id).map((row) => <li key={row.id}>{row.type} {euros(row.amountCents)}</li>)}</ul>);
  if (path === "/compte/factures/") return simple("Factures", <ul>{store.state.invoices.filter((invoice) => invoice.userId === user.id).map((invoice) => <li key={invoice.id}>{invoice.number} <button type="button" onClick={() => downloadInvoice(invoice.number, invoice.paymentId)}>Télécharger</button></li>)}</ul>);
  if (path === "/compte/conversations/") return simple("Conversations", <ul>{store.state.sessions.filter((session) => session.clientId === user.id).map((session) => <li key={session.id}><A to={session.channel === "call" ? `/session/appel/${session.voyantSlug}/` : `/voyants/${session.voyantSlug}/consulter/`}>{session.voyantSlug}</A></li>)}</ul>);
  if (path === "/compte/favoris/") return simple("Favoris", <ul>{voyants.map((guide) => <li key={guide.slug}><button type="button" onClick={() => store.toggleFavorite(guide.slug)}>{guide.name}</button></li>)}</ul>);
  if (path === "/compte/reservations/") return simple("Réservations", <ul>{store.state.bookings.filter((booking) => booking.clientId === user.id).map((booking) => <li key={booking.id}>{booking.voyantSlug} — {booking.dailyRoom}</li>)}</ul>);
  if (path === "/compte/notifications/") return simple("Notifications", <ul>{store.state.notifications.filter((item) => item.userId === user.id).map((item) => <li key={item.id}>{item.title} — {item.body}</li>)}</ul>);
  if (path === "/compte/parrainage/") return simple("Parrainage", <p>Votre lien : ?parrain={user.referralCode}. Luna ne demande pas les coordonnées de vos proches. Le bonus est [MONTANT] €, non convertible en argent.</p>);
  if (path === "/compte/parametres/") return simple("Paramètres", <p>Pseudonyme : {user.pseudonym}. E-mail : {user.email}.</p>);
  return simple("Compte", <A to="/compte/">Tableau de bord</A>);
}

function downloadInvoice(number: string, paymentId: string) {
  const lines = [`Facture ${number}`, "Luna — [RAISON SOCIALE]", `Paiement ${paymentId}`, "Document de démonstration"];
  const text = lines.map((line, index) => `BT /F1 12 Tf 50 ${780 - index * 24} Td (${line}) Tj ET`).join("\n");
  const stream = `<< /Length ${text.length} >>\nstream\n${text}\nendstream`;
  const pdf = `%PDF-1.4\n1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj\n2 0 obj << /Type /Pages /Count 1 /Kids [3 0 R] >> endobj\n3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj\n4 0 obj ${stream} endobj\n5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> endobj\nxref\n0 6\ntrailer << /Root 1 0 R >>\nstartxref\n0\n%%EOF`;
  const blob = new Blob([pdf], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${number}.pdf`;
  link.click();
}
