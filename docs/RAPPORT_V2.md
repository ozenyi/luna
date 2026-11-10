# Luna v2 — rapport

Prototype statique : `https://ozenyi.github.io/luna/v2/` (176 pages HTML, une URL réelle par écran, listées dans `v2/sitemap.xml`). Les textes publics des 51 pages éditoriales viennent du dossier `content/editorial/`. Les CGU, CGV, mentions, confidentialité, cookies et conditions guides viennent de la spec juridique (`content/legal/spec-juridique.md`). Les placeholders `[À DÉFINIR]` et `[CROCHETS]` sont laissés tels quels. Quand les deux sources divergent, la spec juridique l’emporte (mention de divertissement, libellé « Guide virtuel : intelligence artificielle », badge IA). Les profils fictifs ne portent ni note, ni avis, ni mention « vérifié(e) par Luna ». Les guides humains fictifs portent un statut explicite « simulé » (disponible, en consultation ou absent). Les guides IA (Séléné, Véga) sont signalés en permanence.

## Comptes de démonstration

Aucun secret réel. Surchargeables pour les tests et le seed :

| Rôle | Variable e-mail | Variable mot de passe | Défaut |
|---|---|---|---|
| Admin | `LUNA_ADMIN_EMAIL` | `LUNA_ADMIN_PASSWORD` | `admin@luna.test` / `Luna-demo-2026` |
| Guide | `LUNA_VOYANT_EMAIL` | `LUNA_VOYANT_PASSWORD` | `voyant@luna.test` / `Luna-demo-2026` |
| Client | `LUNA_CLIENT_EMAIL` | `LUNA_CLIENT_PASSWORD` | `client@luna.test` / `Luna-demo-2026` |

Le second facteur admin, en démo, affiche le code `424242` (`data-testid="demo-otp"`). Côté serveur, le seed active un TOTP de développement (`SEED_ADMIN_TOTP_SECRET`).

Carte Stripe simulée acceptée : `4242 4242 4242 4242`. La carte `4000 0000 0000 0002` est refusée. Seuls les 4 derniers chiffres peuvent être mémorisés.

## Inventaire

Le manifeste exhaustif est `v2/route-manifest.json` (176 URL). Grandes familles :

- Accueil, comment ça marche, offre, parrainage, devenir guide, candidature, FAQ
- 12 profils (`/voyants/…/`) et leurs séances (`/consulter/`, appel, visio, réservation)
- 9 spécialités, 6 thèmes, 12 signes, 6 articles, plus les index
- Tarifs, avis (file vide), aide, contact, à propos, transparence, accessibilité, sous-traitants, plan du site, 404
- Mentions, CGU, CGV, confidentialité, cookies, préférences, archives juridiques, désinscription
- Compte : inscription, connexion, mot de passe, portefeuille, paiement, transactions, factures, conversations, favoris, réservations, notifications, paramètres, confidentialité, export, plafond, pause, parrainage, abonnement
- Espace guide et back-office (clients, guides, KYC, tarifs, revenus, statistiques, litiges, avis, audit, campagnes, codes, rétention, RGPD, support, sécurité, intégrations)

## Modules

| Module | Démo (navigateur) | Serveur |
|---|---|---|
| Chat à la minute, compteur, historique, fin de crédit | Oui, Séléné et Véga | Domaine `billElapsed` + WebSocket `/ws` |
| Appel Twilio masqué, compteur, rappel, enregistrement opt-in 30 jours | Oui, simulation | Adaptateur Twilio, pont non lancé sans clés |
| Visio Daily, essai caméra, jamais enregistrée | Oui, salle simulée | `enable_recording: false` |
| Portefeuille, packs 20/50/100 € avec bonus non remboursable, facture PDF, remboursement | Oui, carte de test | Stripe si `STRIPE_SECRET_KEY`, sinon identifiant `pi_demo_` |
| Back-office, KYC, commission, audit chaîné, modération | Oui | Schéma Prisma, routes santé, purge, remboursement |
| Promotions, parrainage sans collecte du filleul, campagnes opt-in | Oui | `canSendMarketing` |
| Avis | Module présent, aucun avis publié | Table à brancher, même règle |
| SEO | Title et meta du contenu, JSON-LD, sitemap, robots | — |
| Conformité | Écran art. 9, cases, plafonds, pause, 3114 | Même règles dans `server/src/domain` |

Fonctions promises par les textes, présentes dans l’interface : plafond de dépense, pause du compte, bouton Signaler, compteur durée et prix, disponibilité (réelle pour l’IA, simulée pour les humains), bandeau IA permanent.

## Démo ou réel

| Sujet | État |
|---|---|
| Pages, design, textes, parcours cliquables | Réels dans le prototype statique |
| Paiement, appel, visio, e-mail, SMS | Simulés sans clé. Le code d’adaptateur appelle Stripe, Daily, Brevo ou Twilio seulement si la variable est remplie |
| Mots de passe navigateur | SHA-256 salé, prototype seulement |
| Mots de passe API | Argon2id |
| Audiotel / Media Technologies | Adaptateur non activé |
| Matomo | Aucun script tant que l’URL et le consentement manquent |
| Données des guides | Toutes fictives |

## À fournir par le propriétaire

Raison sociale, forme, capital, SIREN, TVA, siège, directeur de la publication, e-mail, téléphone, médiateur de la consommation, contact données personnelles. Hébergeur UE. Clés test puis live : Stripe (dont Connect et webhook), Twilio, Daily ou Whereby, Brevo, Matomo. Nom et pays du fournisseur d’IA, option zéro rétention. Décisions encore entre crochets : offre de bienvenue, parrainage, commission, Luna+, tarif IA, modèle vendeur ou intermédiaire. Validation avocat ou DPO. Les DPA ne sont pas signés dans ce dépôt.

## Checklist bloquante (spec §12.1)

| # | Point | Statut dans ce dépôt |
|---|---|---|
| B1 | Éditeur identifié et mentions complètes | Partiel. Le texte est en place, les crochets restent vides. Bloqué côté Ozen. |
| B2 | AIPD validée | Non fait. Le plan est dans la spec. Bloqué avocat ou DPO. |
| B3 | Registre des traitements | Fait : `v2/legal/registry.yml` et `content/legal/registry.yml`. |
| B4 | DPA et transferts | Non signés. La page Sous-traitants liste les destinataires et les pays encore ouverts. |
| B5 | Écran art. 9 bloquant, case non cochée, preuve (version, horodatage, IP tronquée, canal) | Fait en démo et dans le modèle `ConsentEvent`. |
| B6 | Pas d’enregistrement systématique, visio jamais enregistrée, échantillon seulement avec accord, 30 jours | Fait. |
| B7 | Pas de formulaire de compatibilité demandant le genre du partenaire | Fait (aucun formulaire de ce type). |
| B8 | Purge testée | Fait. `selectForPurge` couvre messages 12 mois, enregistrements 30 jours, comptes inactifs 24 mois, prospects 3 ans, comptabilité archivée puis supprimée à 10 ans. Route `POST /api/jobs/purge`. |
| B9 | Opt-in par canal, au seul nom de Luna, désinscription en un clic | Fait. Pas de partage partenaire. Le démarchage téléphonique est refusé par `canSendMarketing`. |
| B10 | Bandeau avec Tout refuser au même niveau, rien avant le choix | Fait. |
| B11 | Badge IA, message d’ouverture, réponse à « es-tu humain ? » | Fait, testé (unitaire et Playwright). |
| B12 | Prix TTC avant la séance et compteur en direct | Fait. |
| B13 | Cases CGV et exécution immédiate séparées, confirmation | Fait. L’e-mail est simulé dans la boîte d’envoi. Sans la case, le crédit n’est utilisable qu’après 14 jours. |
| B14 | Résiliation Luna+ en trois clics | Fait sur `/compte/abonnement/`. Le prix reste `[PRIX]`. |
| B15 | Médiateur désigné | Non. Le texte prévoit l’emplacement. Bloqué côté Ozen. |
| B16 | Stripe Elements, aucune donnée de carte stockée | Partiel. La démo n’envoie pas le numéro à un serveur et ne garde que `4242` si la case d’enregistrement est cochée. L’adaptateur Stripe est prêt. Elements reste à brancher avec les clés. |
| B17 | MFA back-office, RBAC, numéros masqués, support sur ticket 4 h | Fait en démo et dans les tests d’accès. Le guide ne voit que le pseudonyme. |
| B18 | Export et suppression | Fait en démo (JSON, anonymisation). Les appels réels vers Stripe, Brevo et Twilio se feront quand les clés existeront. |
| B19 | Procédure de violation sous 72 h | Rédigée : `content/legal/breach_notice.md`, aussi copié dans `v2/legal/`. Le responsable nommé reste `[EMAIL DPO]`. |
| B20 | Aucun faux avis | Fait. La page Avis est vide. L’admin ne montre qu’un exemple explicitement non publié. |
| B21 | Pas de promesse de résultat | Fait dans les textes sources, le filtre de sortie IA et les réponses simulées. |
| B22 | Déclaration 18+ et refus des mineurs sans conserver la date | Fait. |
| B23 | Détresse, 3114, 15, 112, pause de facturation | Fait. Mots dans `v2/safety/distress_terms.fr.yml`. |
| B24 | Plafonds 50 € / 150 €, confirmation à 30 min, auto-exclusion | Fait. Une hausse de plafond attend 72 h. |
| B25 | Validation avocat ou DPO | Non fait. Le lancement public ne doit pas avoir lieu tant que ce point est ouvert. |

## Tests

- `npm test --prefix server` : grand livre, facturation à la minute, commission, remboursement, consentements, purge, accès, assainissement, détresse, prospection.
- `npx playwright test` : parcours inscription, pack 20 €, compte à rebours du chat, essai matériel, réservation, remboursement admin ; puis chaque URL du sitemap (console, images, liens).

Le drapeau d’API est `app/src/config.ts`.
