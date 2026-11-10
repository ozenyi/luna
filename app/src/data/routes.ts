import catalog from "./catalog.json";

export interface CatalogPage {
  path: string;
  slug: string;
  title: string;
  description: string;
  h1: string;
  body: string;
  source: string;
  legal?: boolean;
}

export interface CatalogVoyant {
  slug: string;
  name: string;
  kind: "ai" | "human";
  channels: Array<"chat" | "call" | "message" | "video">;
  photo: string | null;
  demoChatCents: number;
  demoCallCents: number;
  demoVideoCents: number;
  hue: number;
}

export const pages = catalog.pages as CatalogPage[];
export const voyants = catalog.voyants as CatalogVoyant[];
export const pageByPath = new Map(pages.map((page) => [page.path, page]));

export function voyantBySlug(slug: string): CatalogVoyant | undefined {
  return voyants.find((voyant) => voyant.slug === slug);
}

export interface RouteDef {
  path: string;
  title: string;
  description: string;
  group: "public" | "account" | "session" | "voyant" | "admin";
  indexable: boolean;
}

const extra: RouteDef[] = [
  { path: "/voyants/", title: "Guides", description: "Annuaire des guides fictifs de démonstration, humains et IA.", group: "public", indexable: true },
  { path: "/specialites/", title: "Spécialités", description: "Les pratiques proposées sur Luna.", group: "public", indexable: true },
  { path: "/themes/", title: "Thèmes", description: "Questions d’amour, de travail, de famille et d’avenir.", group: "public", indexable: true },
  { path: "/horoscope/", title: "Horoscope", description: "Les douze signes, comme repères symboliques.", group: "public", indexable: true },
  { path: "/blog/", title: "Magazine", description: "Articles pour préparer une consultation avec mesure.", group: "public", indexable: true },
  { path: "/tarifs/", title: "Tarifs et recharges", description: "Packs de crédit et tarif de démonstration.", group: "public", indexable: true },
  { path: "/avis/", title: "Avis", description: "Avis de clients ayant réellement consulté. Aucun avis n’est encore publié.", group: "public", indexable: true },
  { path: "/contact/", title: "Contact", description: "Écrire au service client de Luna.", group: "public", indexable: true },
  { path: "/a-propos/", title: "À propos", description: "Ce qu’est le prototype Luna.", group: "public", indexable: true },
  { path: "/aide/", title: "Aide", description: "Centre d’aide du prototype.", group: "public", indexable: true },
  { path: "/aide/compte/", title: "Aide compte", description: "Créer un compte, se connecter, faire une pause.", group: "public", indexable: true },
  { path: "/aide/paiements/", title: "Aide paiements", description: "Recharges, plafonds, factures et remboursements.", group: "public", indexable: true },
  { path: "/aide/consultations/", title: "Aide consultations", description: "Chat, téléphone, visio et signalement.", group: "public", indexable: true },
  { path: "/aide/guides/", title: "Aide guides", description: "Différence entre guide IA et guide humain.", group: "public", indexable: true },
  { path: "/transparence/", title: "Transparence", description: "Nature du service et transparence sur l’intelligence artificielle.", group: "public", indexable: true },
  { path: "/accessibilite/", title: "Accessibilité", description: "Engagement d’accessibilité du prototype.", group: "public", indexable: true },
  { path: "/sous-traitants/", title: "Sous-traitants", description: "Destinataires et pays de traitement.", group: "public", indexable: true },
  { path: "/preferences-cookies/", title: "Préférences cookies", description: "Choisir les cookies, ou les refuser.", group: "public", indexable: true },
  { path: "/desinscription/", title: "Désinscription", description: "Retirer un consentement de prospection en un clic.", group: "public", indexable: true },
  { path: "/plan-du-site/", title: "Plan du site", description: "Toutes les pages du prototype.", group: "public", indexable: true },
  { path: "/legal/archives/", title: "Archives des textes juridiques", description: "Versions publiées des CGU, CGV et politiques.", group: "public", indexable: true },
  { path: "/404/", title: "Page introuvable", description: "Cette adresse ne correspond à aucune page.", group: "public", indexable: false },
  { path: "/devenir-voyant/candidature/", title: "Candidature guide", description: "Formulaire de candidature.", group: "public", indexable: true },
  { path: "/inscription/", title: "Inscription", description: "Créer un compte Luna, réservé aux majeurs.", group: "account", indexable: true },
  { path: "/connexion/", title: "Connexion", description: "Accéder à votre compte.", group: "account", indexable: true },
  { path: "/mot-de-passe-oublie/", title: "Mot de passe oublié", description: "Recevoir un lien de réinitialisation simulé.", group: "account", indexable: false },
  { path: "/reinitialiser-mot-de-passe/", title: "Nouveau mot de passe", description: "Choisir un nouveau mot de passe.", group: "account", indexable: false },
  { path: "/compte/", title: "Mon compte", description: "Tableau de bord.", group: "account", indexable: false },
  { path: "/compte/portefeuille/", title: "Portefeuille", description: "Solde et recharges.", group: "account", indexable: false },
  { path: "/compte/recharger/", title: "Recharger", description: "Choisir un pack de crédit.", group: "account", indexable: false },
  { path: "/compte/paiement/", title: "Paiement", description: "Paiement simulé par carte de test.", group: "account", indexable: false },
  { path: "/compte/transactions/", title: "Transactions", description: "Historique du portefeuille.", group: "account", indexable: false },
  { path: "/compte/factures/", title: "Factures", description: "Factures téléchargeables.", group: "account", indexable: false },
  { path: "/compte/conversations/", title: "Conversations", description: "Historique des échanges.", group: "account", indexable: false },
  { path: "/compte/favoris/", title: "Favoris", description: "Guides suivis et alertes.", group: "account", indexable: false },
  { path: "/compte/reservations/", title: "Réservations", description: "Créneaux de visio.", group: "account", indexable: false },
  { path: "/compte/notifications/", title: "Notifications", description: "Alertes de service.", group: "account", indexable: false },
  { path: "/compte/parametres/", title: "Paramètres", description: "Profil et coordonnées.", group: "account", indexable: false },
  { path: "/compte/confidentialite/", title: "Confidentialité", description: "Consentements, export et suppression.", group: "account", indexable: false },
  { path: "/compte/mes-donnees/", title: "Mes données", description: "Télécharger ou supprimer vos données.", group: "account", indexable: false },
  { path: "/compte/plafond/", title: "Plafond de dépense", description: "Limites quotidiennes et mensuelles.", group: "account", indexable: false },
  { path: "/compte/pause/", title: "Faire une pause", description: "Auto-exclusion.", group: "account", indexable: false },
  { path: "/compte/parrainage/", title: "Mon parrainage", description: "Votre lien personnel.", group: "account", indexable: false },
  { path: "/compte/abonnement/", title: "Abonnement Luna+", description: "Résiliation en trois clics.", group: "account", indexable: false },
  { path: "/session/test/", title: "Essai caméra et micro", description: "Tester le matériel avant une visio.", group: "session", indexable: false },
  { path: "/espace-voyant/", title: "Espace guide", description: "Tableau de bord du guide.", group: "voyant", indexable: false },
  { path: "/espace-voyant/disponibilites/", title: "Disponibilités", description: "Simulation de présence.", group: "voyant", indexable: false },
  { path: "/espace-voyant/planning/", title: "Planning", description: "Créneaux.", group: "voyant", indexable: false },
  { path: "/espace-voyant/tarifs/", title: "Tarifs du guide", description: "Tarifs indicatifs.", group: "voyant", indexable: false },
  { path: "/espace-voyant/revenus/", title: "Revenus", description: "Relevés et commission.", group: "voyant", indexable: false },
  { path: "/espace-voyant/profil/", title: "Profil guide", description: "Modifier la présentation.", group: "voyant", indexable: false },
  { path: "/espace-voyant/avis/", title: "Avis reçus", description: "Avis réels uniquement.", group: "voyant", indexable: false },
  { path: "/espace-voyant/consultations/", title: "Consultations", description: "Séances du guide, sans coordonnées client.", group: "voyant", indexable: false },
  { path: "/admin/", title: "Administration", description: "Back-office.", group: "admin", indexable: false },
  { path: "/admin/clients/", title: "Clients", description: "Comptes clients.", group: "admin", indexable: false },
  { path: "/admin/voyants/", title: "Guides", description: "Fiches guides.", group: "admin", indexable: false },
  { path: "/admin/validations/", title: "Validations", description: "Candidatures et KYC.", group: "admin", indexable: false },
  { path: "/admin/tarification/", title: "Tarification", description: "Commission de la plateforme.", group: "admin", indexable: false },
  { path: "/admin/revenus/", title: "Revenus", description: "Encaissements.", group: "admin", indexable: false },
  { path: "/admin/statistiques/", title: "Statistiques", description: "Activité par guide.", group: "admin", indexable: false },
  { path: "/admin/litiges/", title: "Litiges et remboursements", description: "Rembourser un paiement.", group: "admin", indexable: false },
  { path: "/admin/avis/", title: "Modération des avis", description: "Avis en attente.", group: "admin", indexable: false },
  { path: "/admin/audit/", title: "Journal d’audit", description: "Journal append-only.", group: "admin", indexable: false },
  { path: "/admin/campagnes/", title: "Campagnes", description: "Prospection opt-in.", group: "admin", indexable: false },
  { path: "/admin/codes-promo/", title: "Codes promo", description: "Code BIENVENUE.", group: "admin", indexable: false },
  { path: "/admin/retention/", title: "Rétention", description: "Purge automatique.", group: "admin", indexable: false },
  { path: "/admin/rgpd/", title: "Demandes RGPD", description: "Export et suppression.", group: "admin", indexable: false },
  { path: "/admin/support/", title: "Support", description: "Accès aux conversations sur ticket.", group: "admin", indexable: false },
  { path: "/admin/securite/", title: "Sécurité", description: "Double authentification.", group: "admin", indexable: false },
  { path: "/admin/integrations/", title: "Intégrations", description: "Stripe, Twilio, Daily, Brevo, Matomo.", group: "admin", indexable: false },
];

export function allRoutes(): RouteDef[] {
  const fromPages: RouteDef[] = pages.map((page) => ({
    path: page.path,
    title: page.title,
    description: page.description,
    group: "public",
    indexable: page.path !== "/404/",
  }));
  const sessions: RouteDef[] = voyants.flatMap((voyant) => [
    { path: `/voyants/${voyant.slug}/consulter/`, title: `Consulter ${voyant.name}`, description: `Séance de démonstration avec ${voyant.name}.`, group: "session" as const, indexable: false },
    { path: `/reserver/${voyant.slug}/`, title: `Réserver avec ${voyant.name}`, description: `Créneau de visio simulé avec ${voyant.name}.`, group: "session" as const, indexable: false },
    { path: `/session/appel/${voyant.slug}/`, title: `Appel avec ${voyant.name}`, description: `Appel simulé via Twilio avec ${voyant.name}.`, group: "session" as const, indexable: false },
    { path: `/session/video/${voyant.slug}/`, title: `Visio avec ${voyant.name}`, description: `Salle Daily simulée avec ${voyant.name}.`, group: "session" as const, indexable: false },
  ]);
  const merged = new Map<string, RouteDef>();
  for (const route of [...fromPages, ...extra, ...sessions]) merged.set(route.path, route);
  return [...merged.values()].sort((a, b) => a.path.localeCompare(b.path, "fr"));
}
