# Déployer Luna v2

Le prototype statique est servi par GitHub Pages à `https://ozenyi.github.io/luna/v2/`. Il ne faut pas y mettre de données personnelles, de clés, ni l’API. L’API Node et PostgreSQL se déploient sur un hébergeur dans l’Union européenne, derrière Cloudflare.

## 1. Ce qui est déjà sur GitHub Pages

- La racine du dépôt (`index.html`, `images/`) reste la vitrine v1.
- `v2/` est le site construit (HTML par page, `sitemap.xml`, `robots.txt`, `legal/retention.yml`, `legal/registry.yml`).
- Le drapeau `LUNA_CONFIG.mode` dans `app/src/config.ts` vaut `demo`. Les parcours tiennent dans le navigateur (localStorage). Aucun paiement réel.

Pour reconstruire :

```bash
npm run build --prefix app
```

## 2. API et base, en Europe

Exemple visé : un VPS à Paris ou dans une autre région UE, avec Docker.

```bash
cp server/.env.example server/.env
# Renseigner des secrets locaux. Ne jamais committer server/.env.
docker compose up -d --build
docker compose exec api npx prisma migrate deploy
docker compose exec api npm run seed
```

L’API écoute le port 8787. PostgreSQL n’est pas exposé sur Internet : seul Cloudflare joint l’origine.

Variables utiles (voir `server/.env.example`) :

- `DATABASE_URL`, `SESSION_SECRET`
- `LUNA_ADMIN_EMAIL`, `LUNA_ADMIN_PASSWORD`, `LUNA_VOYANT_EMAIL`, `LUNA_VOYANT_PASSWORD`, `LUNA_CLIENT_EMAIL`, `LUNA_CLIENT_PASSWORD` (comptes de démonstration, à remplacer)
- `STRIPE_SECRET_KEY` (clé `sk_test_…` puis `sk_live_…`), `STRIPE_WEBHOOK_SECRET`
- `TWILIO_*`, `DAILY_API_KEY` ou `WHEREBY_API_KEY`, `BREVO_API_KEY`, `MATOMO_URL`
- `AUDIOTEL_*` reste vide tant que Media Technologies n’est pas contracté

Le seed hash les mots de passe avec Argon2id. Le second facteur administrateur est un TOTP (`SEED_ADMIN_TOTP_SECRET`, secret de développement seulement).

## 3. Cloudflare

- Proxy activé, SSL Full (strict), toujours HTTPS, HSTS.
- Cache long sur `v2/assets/*`. Ne pas mettre en cache les réponses `/api`.
- WAF : règles gérées, limitation sur `POST /api/auth`.
- L’origine n’accepte que les IP Cloudflare.
- En-têtes recommandés pour le site statique : la CSP déjà posée dans chaque HTML, plus HSTS au niveau Cloudflare.
- Aucun pixel publicitaire sur les pages de consultation, de paiement ou de compte.

## 4. Brancher le front sur l’API

1. Servir `v2/` en HTTPS sur le même site ou un sous-domaine UE.
2. Passer `LUNA_CONFIG.mode` à `"api"` et `apiBaseUrl` vers l’origine.
3. Reconstruire. Le parcours carte appelle alors `POST /api/payments/checkout`.
4. Stripe : Checkout ou PaymentIntents, SetupIntents pour la carte enregistrée, webhooks signés, remboursements, Connect pour la commission. Le numéro de carte ne transite pas par Luna une fois Stripe Elements branché.
5. Twilio : pont d’appel à numéros masqués, enregistrement désactivé par défaut. Visio Daily avec `enable_recording: false`.
6. Brevo pour l’e-mail et le SMS transactionnels et, seulement après opt-in, la prospection. Twilio reste l’alternative SMS.
7. Matomo auto-hébergé dans l’UE, soumis au bandeau. Rien n’est déposé avant le choix.

## 5. Purge quotidienne

```bash
# dans le conteneur, une fois la persistance branchée sur les tables
node dist/jobs/purge.js
```

La tâche planifiée (cron) doit tourner chaque nuit, heure de Paris. Durées dans `v2/legal/retention.yml` et `server/src/domain/retention.ts` : messages 12 mois, enregistrements 30 jours, comptes inactifs 24 mois, prospects 3 ans, pièces comptables 10 ans dans une archive séparée. L’événement `retention.purged` ne contient que des compteurs.

## 6. Avant une ouverture au public

La checklist bloquante est dans `docs/RAPPORT_V2.md`. Tant que l’éditeur, le médiateur, les DPA et la validation avocat ou DPO manquent, le site reste un prototype. GitHub Pages ne doit pas recevoir de comptes réels.
