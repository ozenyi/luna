# Luna v2 : spécification juridique RGPD/CNIL opérationnelle

**Destinataire :** le développeur de Luna v2 (dossier `v2/` du dépôt `ozenyi/luna`), via Alev, chef de projet.
**Rédaction :** agent juridique de Luna, le 10 novembre 2026.
**Statut :** version de travail. Rien n'est publié. Les informations entre [CROCHETS] doivent être fournies par Ozen.

> **Avertissement.** Ce document est une aide à la conception. Il ne remplace pas la validation par un avocat ou par un délégué à la protection des données (DPO). Les textes juridiques prêts à intégrer (section 11) doivent être relus par un professionnel avant leur mise en ligne. Les points marqués « [à vérifier] » n'ont pas pu être confirmés par une source officielle au moment de la rédaction.

## Comment lire ce document

- **DOIT / NE DOIT PAS** : exigence à implémenter telle quelle.
- **Obligatoire (texte)** : l'exigence découle directement d'un texte (RGPD, loi, code) ou d'une décision de sanction. Son absence expose à une sanction.
- **Recommandé (bonne pratique)** : l'exigence découle d'une recommandation CNIL ou d'un choix de prudence adapté à un public vulnérable. On peut s'en écarter, mais il faut documenter pourquoi.
- Les noms de tables, champs et événements sont des **suggestions** (style `snake_case`). Le développeur peut les adapter tant que la fonction est conservée.

## Sommaire

0. Leçons des sanctions Cosmospace et Télémaque
1. Cartographie des traitements, sous-traitants, transferts et AIPD
2. Consentements : textes exacts, moment, format, preuve, retrait
3. Durées de conservation
4. Rôles et droits d'accès (RBAC)
5. Journal d'audit
6. Droits des personnes : export, suppression, rectification, opposition
7. Prospection commerciale
8. Garde-fous pour les personnes vulnérables
9. Sécurité (art. 32 RGPD)
10. Transparence IA (AI Act)
11. Textes prêts à intégrer
12. Checklist pré-lancement et liste « À fournir par Ozen »
Annexe A. Sources consultées

---

## 0. Leçons des sanctions Cosmospace et Télémaque (2024)

### 0.1 Les faits vérifiés

Le **26 septembre 2024**, la formation restreinte de la CNIL a sanctionné deux sociétés de voyance à distance liées entre elles (même siège à Valbonne, base de données commune de plus de 7 millions de fiches pour plus de 1,5 million de personnes uniques au 6 octobre 2022).

| | COSMOSPACE | TÉLÉMAQUE |
|---|---|---|
| Délibération | **SAN-2024-014** du 26 septembre 2024 | **SAN-2024-015** du 26 septembre 2024 |
| Activité visée | Voyance par téléphone (voyants salariés ou indépendants, dont certains hors UE), sites web dont cosmospace.medium.fr | Voyance par SMS, SVA et chat, site horoscope.fr ; prestataire informatique de Cosmospace |
| Montant | **250 000 €** : 200 000 € pour les art. 5-1-c, 5-1-e et 9 RGPD, et 50 000 € pour l'art. L.34-5 CPCE | **150 000 €** : 100 000 € pour les art. 5-1-e et 9 RGPD, et 50 000 € pour l'art. L.34-5 CPCE |
| Minimisation (art. 5-1-c) | **Retenu.** Enregistrement intégral et systématique des appels voyant-client, standard-voyant et standard-client. 50 % des enregistrements supprimés chaque soir, les autres conservés 6 mois ; appels standard-client conservés 13 mois. | Non visé |
| Conservation (art. 5-1-e) | **Retenu.** Données clients conservées 6 ans après la dernière prestation à des fins de prospection, alors que le référentiel CNIL recommande 3 ans maximum. La politique en ligne annonçait 5 ans. | **Retenu.** Données clients conservées 6 ans en base active, sans tri ni archivage intermédiaire. Le compte le plus ancien était inactif depuis le 6 novembre 2016. |
| Données sensibles (art. 9) | **Retenu.** Formulaire de « compatibilité amoureuse » demandant le sexe de l'utilisateur et celui de son partenaire, ce qui révèle l'orientation sexuelle. Données de santé, vie sexuelle et religion confiées pendant les consultations, sans information ni consentement explicite. | **Retenu.** Même formulaire de compatibilité sur horoscope.fr. Données sensibles confiées par chat ou SMS, sans information ni consentement explicite. |
| Prospection (art. L.34-5 CPCE) | **Retenu.** Envoi d'emails et de SMS à des personnes collectées par Télémaque, sans consentement éclairé : le partenaire n'était pas nommé près de la case à cocher. | **Retenu.** Même manquement en miroir, pour les personnes collectées par Cosmospace. |
| Volumes cités | Près de 6,3 millions de SMS et plus de 75,6 millions d'emails de prospection sur les 3 premiers trimestres 2022 | Près de 4 millions de SMS et plus de 7,2 millions d'emails de prospection sur les 3 premiers trimestres 2022 |
| Publicité | Décision publique, anonymisée au bout de 2 ans | Idem |

**Manquements NON retenus.** Aucune des deux délibérations ne retient de manquement à la sécurité (art. 32 RGPD) ni à l'information des personnes (art. 13). Les manquements retenus sont uniquement ceux du tableau ci-dessus.

**Suite contentieuse.** Par deux décisions du **16 octobre 2026** (n° 499596 pour Cosmospace, n° 499597 pour Télémaque), le Conseil d'État a **rejeté** les recours des deux sociétés. Il a confirmé les manquements, le montant des amendes et la publicité des décisions.

**Sources :**
- Communiqué CNIL : https://www.cnil.fr/fr/voyance-en-ligne-sanctions-de-250-000-et-150-000-euros-cosmospace-telemaque (page bloquée depuis notre serveur, contenu confirmé par les résultats de recherche)
- Délibération SAN-2024-015 (Télémaque) sur Légifrance : https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000050324681 (texte intégral lu via https://justice.pappers.fr/decision/27bfff8e269960aa59d4061f0f6b0bc6ce5bd6db)
- Délibération SAN-2024-014 (Cosmospace) sur Légifrance : https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000050324625 (identifiant Légifrance relevé sur un site tiers, [à vérifier] ; texte intégral lu via https://armingaud-avocat.fr/SiteMap/2-Case-Law/Sanctions-CNIL/CNIL---D%C3%A9lib%C3%A9ration-de-la-formation-restreinte-n%C2%B0SAN-2024-014-du-26-septembre-2024-concernant-la-soci%C3%A9t%C3%A9-COSMOSPACE)
- Fiche du CEPD (EDPB) : https://www.edpb.europa.eu/news/the-french-sa-fines-cosmospace-eur-250000-and-telemaque-eur-150000_en
- Conseil d'État, 16 octobre 2026, n° 499596 : https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2026-10-16/499596
- Conseil d'État, 16 octobre 2026, n° 499597 : https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2026-10-16/499597

Les deux délibérations citent un précédent dans le même secteur : CNIL, sanction **SAN-2023-008 du 8 juin 2023**, visant une autre société de voyance par téléphone (enregistrement systématique des appels, données sensibles). Nous n'avons pas vérifié le nom de la société visée [à vérifier].

### 0.2 Ce que la CNIL a jugé, en clair

1. **Dans la voyance, les données sensibles sont inévitables.** Peu importe que la société « ne les utilise pas » ou que ses CGU interdisent de les donner. Dès qu'elles sont enregistrées, conservées ou consultables, il y a traitement. La seule base légale possible est le **consentement explicite** (art. 9-2-a RGPD). Les exceptions « données manifestement rendues publiques » (art. 9-2-e) et « volonté de recevoir la prestation » sont écartées.
2. **Un consentement explicite suppose un acte positif clair, précédé d'une information spécifique.** La personne doit savoir que ses propos peuvent révéler sa santé, sa vie ou son orientation sexuelle ou ses convictions, et savoir ce qu'on en fait.
3. **Les données qui permettent de déduire l'orientation sexuelle sont sensibles.** C'est le cas du sexe de l'utilisateur combiné au sexe de son partenaire dans un test de compatibilité (CJUE, 1er août 2022, C-184/20).
4. **L'enregistrement intégral et systématique des appels est excessif.** Ni la qualité, ni la formation, ni la preuve du contrat, ni d'éventuelles réquisitions judiciaires, ni la « sauvegarde de la vie humaine » ne le justifient. Les moyens acceptables sont un échantillon aléatoire, un enregistrement limité à la phase de conclusion du contrat s'il n'existe aucune preuve écrite, ou un déclenchement manuel en cas de propos inquiétants.
5. **On ne conserve pas des données « au cas où » la justice les demanderait.** Il faut répondre aux réquisitions, mais pas organiser la collecte ou la conservation à l'avance pour ce motif.
6. **À la fin de la relation commerciale, il faut trier les données.** On supprime ce qui n'est plus utile et on place le reste en archivage intermédiaire, avec un accès restreint. Pour la prospection des anciens clients, la durée de référence est de **3 ans** ; 6 ans est excessif.
7. **Le consentement à la prospection n'est valable que pour les prospecteurs nommés.** Le partenaire doit être identifié près de la case à cocher. Un accord de responsabilité conjointe ne dispense pas chaque société de disposer de son propre consentement valable.
8. **La vulnérabilité du public est une circonstance aggravante.** La CNIL relève que ces clients « sont susceptibles de se trouver dans une situation de vulnérabilité » et que le respect des règles de consentement est donc « primordial ».

### 0.3 Règles concrètes qui en découlent pour Luna

| # | Leçon | Règle Luna | Statut |
|---|---|---|---|
| L1 | Données sensibles sans consentement explicite | Luna DOIT afficher, avant la **première** séance (chat, appel ou visio, IA ou humain), un écran dédié de consentement explicite art. 9 (texte en §2.4), avec une case séparée non pré-cochée. Sans ce consentement, la séance NE DOIT PAS démarrer. | Obligatoire (texte) |
| L2 | Formulaire de compatibilité | Les formulaires de compatibilité ou de synastrie NE DOIVENT PAS demander le genre du partenaire. Si une fonction en a besoin, elle passe derrière le consentement art. 9 et la donnée n'est pas conservée après le calcul. | Obligatoire (texte) |
| L3 | Enregistrement systématique des appels | Les appels et la visio NE DOIVENT PAS être enregistrés par défaut. Enregistrement qualité seulement sur échantillon aléatoire (≤ [5] % des appels), avec un consentement séparé recueilli au début de l'appel, et une conservation de 30 jours maximum (recommandé), 6 mois au grand maximum. Un bouton « signalement urgence » côté guide déclenche un enregistrement manuel, journalisé. | Obligatoire (texte) pour l'absence de systématisme ; durées recommandées |
| L4 | Preuve du contrat | Tous les achats (recharge, abonnement) se font **par écrit** dans l'interface, avec un email de confirmation. Aucun enregistrement vocal n'est donc nécessaire comme preuve. | Obligatoire (texte) |
| L5 | Conservation excessive | Purge automatique par tâche planifiée (cron) selon le tableau §3. Au bout de 3 ans d'inactivité au plus, suppression ou anonymisation du compte. Archivage intermédiaire séparé et restreint pour la comptabilité. | Obligatoire (texte) |
| L6 | Conserver « pour la justice » | Aucune durée de conservation ne DOIT être justifiée par d'éventuelles réquisitions judiciaires. | Obligatoire (texte) |
| L7 | Prospection sans consentement éclairé | Luna NE DOIT PAS partager ou louer sa base à des partenaires ni utiliser une base achetée. Consentements séparés par canal (email, SMS, WhatsApp, push, téléphone), au seul nom de l'éditeur Luna. | Obligatoire (texte) |
| L8 | Volume de prospection | Plafond de fréquence (§7) et interdiction de cibler sur des données sensibles ou des signaux de détresse. | Recommandé (bonne pratique), fortement conseillé au vu des sanctions |
| L9 | Guides hors UE | Si des guides humains exercent hors de l'UE, l'accès aux conversations depuis ces pays constitue un transfert (§1.4). L'encadrer, ou réserver l'activité aux guides établis dans l'UE. | Obligatoire (texte) |

---

## 1. Cartographie des traitements

### 1.1 Responsable de traitement

L'**éditeur** de Luna est responsable de traitement : [RAISON SOCIALE DE L'ÉDITEUR], ou Ozen Yigit en nom propre si aucune société n'est créée. Il n'est pas encore connu.

Les **guides humains indépendants** ne sont pas, en principe, responsables de traitement des données de la plateforme. Ils agissent sous l'autorité de Luna (art. 29 RGPD) et sont tenus par la charte (§8.8) et les Conditions guides (§11.4), qui leur interdisent toute réutilisation. S'ils conservaient leurs propres fichiers clients, ils deviendraient responsables distincts. Les Conditions guides DOIVENT donc l'interdire. [à vérifier par avocat : qualification exacte du guide, sous-traitant ou personne autorisée]

### 1.2 Registre des traitements (art. 30 RGPD) : tableau à recopier dans le registre

| ID | Traitement | Finalité | Base légale (art. 6) | Art. 9 | Catégories de données | Destinataires internes | Sous-traitants |
|---|---|---|---|---|---|---|---|
| T1 | Comptes clients | Créer et gérer le compte, authentifier | Contrat (6-1-b) | — | Email, pseudonyme, mot de passe haché, date de naissance (ou attestation 18+), téléphone (facultatif), préférences | Support, admin | Hébergeur, emailing transactionnel |
| T2 | Comptes guides | Recruter, vérifier, gérer les guides | Contrat / mesures précontractuelles (6-1-b), obligation légale (6-1-c) pour les vérifications fiscales et DAC7 [à vérifier] | — | Identité, pièce d'identité, statut (SIRET), IBAN via Stripe, spécialités, photo, présentation | Admin, compta, modération | Hébergeur, Stripe Connect |
| T3 | Consultations par chat (IA et humain) | Fournir la prestation, l'historique au client | Contrat (6-1-b) | **Consentement explicite (9-2-a)** | Contenu des messages, horodatage, durée, guide | Client, guide concerné ; support uniquement sur ticket | Hébergeur, fournisseur d'IA (si guide IA) |
| T4 | Consultations téléphoniques | Mettre en relation via un numéro masqué | Contrat (6-1-b) | Consentement explicite (9-2-a) si enregistrement | Numéros (masqués), métadonnées d'appel, durée ; contenu vocal seulement en cas d'enregistrement | Guide (sans numéro réel), compta (durée) | Twilio |
| T5 | Enregistrement qualité d'appels (échantillon) | Contrôler la qualité, former | Consentement (6-1-a) | Consentement explicite (9-2-a) | Voix, contenu | Modérateur qualité désigné | Twilio, hébergeur |
| T6 | Visio | Fournir la prestation | Contrat (6-1-b) | Consentement explicite (9-2-a) | Flux audio et vidéo **non enregistré**, métadonnées | — | Fournisseur visio [CROCHET] (Twilio Video ou autre) |
| T7 | Portefeuille, paiements, abonnements | Encaisser, débiter à la minute, facturer, rembourser | Contrat (6-1-b) ; obligation légale (6-1-c) pour la comptabilité | — | Transactions, solde, factures ; 4 derniers chiffres de la carte via Stripe (jamais le numéro complet) | Compta, support (lecture limitée) | Stripe |
| T8 | Versement des commissions aux guides | Payer les guides | Contrat (6-1-b) ; obligation légale (6-1-c) | — | Gains, relevés, IBAN (chez Stripe) | Compta | Stripe Connect |
| T9 | Garde-fous et prévention | Plafonds, alertes de session, détection de détresse | Obligation légale (6-1-c) au titre de la loyauté commerciale, et intérêt légitime (6-1-f) de protection des utilisateurs [à vérifier] ; **intérêts vitaux (6-1-d)** pour une alerte de danger imminent | **9-2-a** (consentement explicite déjà donné en L1) ; 9-2-c (intérêts vitaux, si la personne est incapable de consentir) | Montants dépensés, durées, détection de mots-clés (signal booléen et catégorie, pas de copie du texte) | Système automatique ; modérateur en cas d'alerte | Hébergeur |
| T10 | Support client | Traiter les demandes | Contrat (6-1-b) ; intérêt légitime (6-1-f) | Possible, traité sous T3 | Tickets, pièces jointes | Support | Outil de ticketing [CROCHET] |
| T11 | Modération et avis | Modérer profils et avis, lutter contre les abus | Intérêt légitime (6-1-f) ; obligation légale (L.111-7-2 C. conso) pour les avis | — | Avis, signalements, décisions de modération | Modérateurs | Hébergeur |
| T12 | Prospection email, SMS, WhatsApp, push et téléphone | Envoyer des offres | **Consentement (6-1-a)**, ou exception « produits analogues » pour l'email et le SMS des clients | Interdit | Email, téléphone, jeton push, historique d'envois | Marketing | Emailing, SMS, WhatsApp (Meta), push (FCM ou APNs) |
| T13 | Parrainage | Offrir un bonus au parrain et au filleul | Contrat (6-1-b) pour le parrain ; pour le filleul, rien n'est collecté avant son inscription | — | Code de parrainage, lien parrain-filleul | Marketing, compta | — |
| T14 | Cookies et traceurs | Mesure d'audience et publicité | Consentement (art. 82 loi I&L), sauf traceurs exemptés | — | Identifiants, navigation | Marketing | Outil d'analyse [CROCHET] |
| T15 | Sécurité et journalisation | Tracer les accès, détecter les fraudes | Intérêt légitime (6-1-f) ; obligation de sécurité (art. 32) | — | Journaux de connexion et d'audit | Super-admin, sécurité | Hébergeur |
| T16 | Gestion des droits RGPD | Répondre aux demandes | Obligation légale (6-1-c) | — | Demande, justificatif, réponse | DPO ou référent | — |
| T17 | Comptabilité | Tenir les comptes et conserver les pièces | Obligation légale (6-1-c) | — | Factures, écritures | Compta, expert-comptable | Logiciel comptable [CROCHET] |
| T18 | Entraînement ou amélioration de l'IA à partir des conversations | Améliorer les guides IA | **Consentement séparé (6-1-a), refusé par défaut** | 9-2-a, consentement distinct | Conversations pseudonymisées | Équipe IA | Fournisseur d'IA |

**Règle :** le développeur DOIT créer une table `processing_registry` (ou un fichier YAML versionné `v2/legal/registry.yml`) qui reprend ce tableau. Chaque nouvelle fonctionnalité qui collecte une donnée DOIT y ajouter ou mettre à jour une ligne. *Recommandé (bonne pratique)*, le registre lui-même étant *obligatoire (art. 30)*.

### 1.3 Sous-traitants (art. 28 RGPD)

Chaque sous-traitant DOIT avoir un contrat (DPA) conforme à l'art. 28. Les DPA standard des fournisseurs ci-dessous existent en général, mais doivent être acceptés et archivés. *Obligatoire (texte).*

| Sous-traitant | Rôle | Localisation des données | Transfert hors UE | Garanties à mettre en place |
|---|---|---|---|---|
| Hébergeur v2 : [CROCHET] (GitHub Pages pour le prototype statique, GitHub Inc., États-Unis) | Hébergement applicatif et base de données | **Recommandé : région UE** (par ex. un hébergeur établi en France ou une région UE d'un fournisseur cloud) | Oui si l'hébergeur est américain | DPF (EU-US Data Privacy Framework) si l'entité est certifiée, sinon clauses contractuelles types (CCT) avec analyse d'impact du transfert (TIA). **GitHub Pages ne doit pas héberger de données personnelles de la v2.** |
| Twilio | Téléphonie, numéros proxy, SMS, éventuellement visio | États-Unis par défaut, options de région [à vérifier] | Oui | DPA Twilio, DPF ou CCT, désactivation de l'enregistrement par défaut, purge automatique des enregistrements |
| Stripe (Payments, Billing, Connect) | Paiements, wallet, versements aux guides | Stripe Payments Europe (Irlande) pour l'UE [à vérifier] ; transferts possibles vers les États-Unis | Possible | DPA Stripe, CCT ou DPF. Stripe agit aussi comme **responsable distinct** pour ses propres obligations (LCB-FT, KYC des guides) : l'indiquer dans la politique de confidentialité |
| Fournisseur d'IA : [CROCHET] | Génération des réponses des guides IA, détection de détresse éventuelle | [CROCHET] | Probablement | DPA ; **option « zéro conservation » ou conservation minimale** ; interdiction contractuelle d'utiliser les données pour entraîner les modèles du fournisseur ; région UE si disponible |
| Emailing (transactionnel et marketing) : [CROCHET] | Envois | [CROCHET] | Selon fournisseur | DPA, CCT ou DPF |
| SMS : [CROCHET] (Twilio ou autre) | Envois | — | — | Idem |
| WhatsApp Business (Meta Platforms Ireland) | Messages | UE et États-Unis | Oui | Conditions WhatsApp Business et DPA Meta. **Meta peut être responsable distinct ou conjoint pour certaines données** [à vérifier]. WhatsApp NE DOIT être utilisé qu'avec un opt-in WhatsApp séparé. |
| Push (Firebase Cloud Messaging de Google, Apple Push Notification service) | Notifications | États-Unis | Oui | DPA, CCT ou DPF |
| Visio : [CROCHET] | Flux vidéo | [CROCHET] | — | DPA, pas d'enregistrement |
| Ticketing support : [CROCHET] | Tickets | — | — | DPA |
| Analytics : [CROCHET] | Mesure d'audience | — | — | **Recommandé :** un outil configuré pour bénéficier de l'exemption de consentement de la CNIL (§11.6) |

**Règles développeur :**
- Une page `/sous-traitants` DOIT lister nominativement chaque sous-traitant, sa finalité et son pays. Elle est générée depuis `v2/legal/subprocessors.yml`. *Recommandé (bonne pratique)*, mais l'information sur les destinataires et les transferts est *obligatoire (art. 13-1-e et f)*.
- Aucune donnée de conversation (T3) NE DOIT être envoyée à un outil d'analyse, de CRM, d'emailing ou de publicité. *Obligatoire (texte) : minimisation et limitation des finalités, art. 5-1-b et c.*

### 1.4 Transferts hors UE (chapitre V RGPD)

- Tout transfert DOIT reposer sur une décision d'adéquation (dont le DPF pour les entités américaines certifiées), ou sur des CCT complétées d'une analyse d'impact du transfert. *Obligatoire (texte).*
- **Guides humains établis hors UE :** l'accès d'un guide établi dans un pays tiers aux conversations constitue un transfert. *Recommandé :* réserver la v2 aux guides établis dans l'UE ou l'EEE. Sinon, un encadrement par CCT et une analyse d'impact par pays sont *obligatoires (texte)*.
- Le champ `guides.country_of_establishment` DOIT être obligatoire. Une règle bloque l'activation d'un guide hors UE tant que `transfer_safeguard_ref` est vide.

### 1.5 AIPD obligatoire (art. 35 RGPD)

**Pourquoi c'est obligatoire.** La CNIL a publié une liste des traitements pour lesquels une AIPD est requise, et les lignes directrices du CEPD (WP248) posent des critères. Un traitement qui en réunit au moins deux nécessite en principe une AIPD. Luna en réunit au moins cinq :
1. données sensibles (art. 9 : santé, vie sexuelle, convictions) ;
2. personnes vulnérables ;
3. traitement à grande échelle, si la plateforme décolle ;
4. usage innovant : guides IA générant des réponses, et détection automatique de détresse ;
5. croisement de données (paiement, comportement de consommation, conversations, prospection) ;
6. surveillance systématique (alertes de session, détection de mots-clés).

L'AIPD est donc **obligatoire (texte)** et DOIT être terminée **avant** l'ouverture au public. Le DPO ou le conseil la valide.

**Plan de l'AIPD (modèle compatible avec l'outil PIA de la CNIL) :**
1. Description du traitement : contexte, finalités, acteurs, flux (schéma des flux T1 à T18, sous-traitants).
2. Nécessité et proportionnalité : base légale de chaque traitement, minimisation (pas d'enregistrement par défaut, pas de genre du partenaire), durées (§3), information (§11.5), droits (§6), sous-traitants et transferts (§1.3 et 1.4).
3. Risques pour les personnes, pour chacun des trois événements redoutés :
   - accès illégitime aux conversations (fuite, guide malveillant, employé curieux) ;
   - modification non désirée (altération de l'historique ou du solde) ;
   - disparition (perte de l'historique ou des preuves de paiement).
   Pour chacun : sources de risque, menaces, impacts (révélation de l'orientation sexuelle, de l'état de santé, chantage, préjudice financier), gravité et vraisemblance.
4. Risques spécifiques à documenter : exploitation de la vulnérabilité (sur-dépense, dépendance), erreur ou hallucination de l'IA (faux conseil médical), absence de détection de détresse ou faux positifs, ré-identification de données pseudonymisées utilisées pour l'IA.
5. Mesures : §4 (RBAC), §5 (audit), §8 (garde-fous), §9 (sécurité), §10 (IA).
6. Risques résiduels et plan d'action.
7. Avis du DPO ; consultation des personnes concernées ou d'un panel (recommandé) ; décision du responsable.
8. **Consultation préalable de la CNIL (art. 36)** si un risque résiduel élevé subsiste.
9. Révision : à chaque nouveau module, et au moins une fois par an (recommandé).

**DPO.** La désignation d'un DPO est obligatoire lorsque l'activité de base consiste en un traitement à grande échelle de données sensibles (art. 37-1-c RGPD). Le seuil de « grande échelle » n'est pas chiffré. *Recommandé (bonne pratique) :* désigner un DPO (interne ou externe) dès le lancement, compte tenu de la nature du service. Au minimum, un contact « données personnelles » DOIT être indiqué (§11). [à vérifier par avocat : caractère obligatoire au lancement]

---

## 2. Consentements

### 2.1 Règles communes à tous les consentements

Un consentement valable est « libre, spécifique, éclairé et univoque » et se manifeste par « une déclaration ou un acte positif clair » (art. 4-11 RGPD). Le responsable doit pouvoir le prouver (art. 7-1), et le retrait doit être aussi simple que le don (art. 7-3).

**DOIT :**
- une case par finalité, **jamais pré-cochée**, jamais regroupée avec l'acceptation des CGU ;
- le texte exact, affiché à côté de la case, et non derrière un lien ou une note de bas de page (leçon Cosmospace et Télémaque : la liste des partenaires renvoyée en note en exposant a été jugée insuffisante) ;
- des boutons « Accepter » et « Refuser » de même taille, même couleur et même niveau, lorsqu'un choix binaire est proposé ;
- une preuve stockée à chaque événement (don, refus, retrait) ;
- un retrait possible en un clic depuis « Mon compte > Confidentialité », et pour la prospection, depuis chaque message.

**NE DOIT PAS :**
- conditionner l'accès au service à un consentement non nécessaire au service (prospection, entraînement de l'IA, cookies non essentiels) ;
- utiliser des formulations piégeuses (double négation, « Non, je ne veux pas profiter… ») ;
- redemander un consentement refusé avant 6 mois (recommandé pour les cookies, appliqué par analogie).

*Obligatoire (texte)*, sauf mention contraire.

### 2.2 Modèle de données de preuve

```sql
-- Versions des textes juridiques et des libellés de consentement
CREATE TABLE legal_texts (
  id              UUID PRIMARY KEY,
  code            TEXT NOT NULL,      -- 'cgu','cgv','privacy','consent_art9','consent_sms', etc.
  version         TEXT NOT NULL,      -- '2026-11-10.1'
  locale          TEXT NOT NULL DEFAULT 'fr-FR',
  body_markdown   TEXT NOT NULL,
  body_sha256     TEXT NOT NULL,      -- empreinte du texte exact affiché
  published_at    TIMESTAMPTZ NOT NULL,
  UNIQUE (code, version, locale)
);

-- Journal des consentements : on ajoute des lignes, on ne met jamais à jour (append-only)
CREATE TABLE consent_events (
  id              UUID PRIMARY KEY,
  user_id         UUID NULL,          -- NULL pour un visiteur (cookies)
  visitor_id      TEXT NULL,          -- identifiant de cookie de consentement
  purpose         TEXT NOT NULL,      -- voir la liste §2.3
  action          TEXT NOT NULL CHECK (action IN ('granted','refused','withdrawn','expired')),
  legal_text_id   UUID NOT NULL REFERENCES legal_texts(id),
  channel         TEXT NOT NULL,      -- 'web','ios','android','phone_ivr','email_link','sms_stop','whatsapp'
  ui_location     TEXT NOT NULL,      -- 'signup','first_session_gate','call_ivr','settings','cookie_banner'
  ip_truncated    INET NULL,          -- IPv4 /24 ou IPv6 /48 (recommandé), ou IP complète si l'AIPD le justifie
  user_agent_hash TEXT NULL,
  occurred_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at      TIMESTAMPTZ NULL,   -- ex. +12 mois pour la prospection téléphonique
  evidence_extra  JSONB NULL          -- ex. {"ivr_key":"1","call_sid":"CA..."}
);
CREATE INDEX ON consent_events (user_id, purpose, occurred_at DESC);

-- Vue de l'état courant (le dernier événement par finalité fait foi)
CREATE VIEW consent_current AS
SELECT DISTINCT ON (user_id, purpose) user_id, purpose, action, legal_text_id, occurred_at, expires_at
FROM consent_events ORDER BY user_id, purpose, occurred_at DESC;
```

**Événements applicatifs :** `consent.granted`, `consent.refused`, `consent.withdrawn`, `consent.expired`. Chacun est aussi écrit dans le journal d'audit (§5).

**Règle :** tout code qui utilise une donnée sous consentement DOIT appeler `hasConsent(user_id, purpose)`, qui lit `consent_current` et vérifie `expires_at`. Il NE DOIT PAS se fier à un drapeau booléen dupliqué dans la table `users`.

### 2.3 Liste des finalités (`purpose`)

`age_18_declaration`, `cgu_acceptance`, `cgv_acceptance`, `sensitive_data_art9`, `call_recording_quality`, `video_recording` (désactivé en v2), `ai_conversation_processing` (information, et non consentement : voir §2.6), `ai_training`, `marketing_email`, `marketing_sms`, `marketing_whatsapp`, `marketing_push`, `marketing_phone`, `referral_terms`, `cookies_audience`, `cookies_ads`, `cookies_social`, `withdrawal_waiver`, `spending_limit_change`.

> Note : l'âge, les CGU, les CGV et la renonciation à la rétractation ne sont pas des « consentements RGPD », mais des déclarations ou acceptations contractuelles. On les stocke dans la même table pour simplifier la preuve.

### 2.4 Textes exacts à afficher

Les textes ci-dessous sont à intégrer **mot pour mot** (`legal_texts.body_markdown`). Toute modification crée une nouvelle version.

---

#### C1. Déclaration de majorité (`age_18_declaration`)
- **Moment :** à l'inscription, avant la création du compte. Rappel au premier achat.
- **Format :** case obligatoire non pré-cochée, et champ « date de naissance » (recommandé, pour contrôler la cohérence).
- **Texte :**
  > ☐ Je déclare avoir **18 ans ou plus**. Je comprends que Luna est réservé aux personnes majeures et que tout compte ouvert par un mineur sera fermé.
- **Règle :** si la date de naissance donne moins de 18 ans, la création est refusée et la tentative est journalisée **sans** conserver la date saisie (event `signup.blocked_minor`). Voir §8.9 pour le contrôle renforcé. *Obligatoire (contractuel, et protection des mineurs).*
- **Retrait :** non applicable ; une fausse déclaration entraîne la fermeture du compte.

#### C2. Acceptation des CGU et prise de connaissance de la politique de confidentialité (`cgu_acceptance`)
- **Moment :** à l'inscription.
- **Format :** case obligatoire non pré-cochée, liens ouvrant les textes dans une modale ou un nouvel onglet.
- **Texte :**
  > ☐ J'ai lu et j'accepte les [Conditions générales d'utilisation](/cgu). J'ai pris connaissance de la [Politique de confidentialité](/confidentialite).
- **Règle :** la politique de confidentialité s'**informe**, elle ne s'« accepte » pas. Ne pas écrire « J'accepte la politique de confidentialité ». *Obligatoire (texte).*

#### C3. Acceptation des CGV (`cgv_acceptance`)
- **Moment :** au **premier achat** (première recharge ou abonnement), puis à chaque nouvelle version.
- **Format :** case obligatoire non pré-cochée, juste au-dessus du bouton de paiement.
- **Texte :**
  > ☐ J'ai lu et j'accepte les [Conditions générales de vente](/cgv), notamment les tarifs à la minute, les règles du portefeuille et les conditions de remboursement.

#### C4. Consentement explicite aux données sensibles (`sensitive_data_art9`). **ÉCRAN BLOQUANT.**
- **Moment :** **avant la première séance**, quel que soit le canal (chat, téléphone, visio) et que le guide soit une IA ou un humain. Également avant tout formulaire qui pourrait révéler une donnée sensible (compatibilité amoureuse, questions de santé).
- **Format :** écran dédié en plein écran (pas une simple ligne dans l'inscription), avec le texte d'information, **une case non pré-cochée** et deux boutons de même niveau : « Je donne mon accord » (actif seulement si la case est cochée) et « Je refuse ».
- **Texte d'information (au-dessus de la case) :**
  > **Avant votre première consultation : vos confidences sont des données sensibles**
  >
  > Pendant une consultation, vous pouvez parler de votre santé (physique ou mentale), de votre vie amoureuse ou sexuelle, de votre orientation sexuelle, ou de vos convictions religieuses ou philosophiques. La loi les appelle des « données sensibles » (article 9 du RGPD) et nous ne pouvons les traiter qu'avec votre accord explicite.
  >
  > **Ce que nous en faisons :** elles servent uniquement à réaliser votre consultation et à vous montrer votre historique. Le guide que vous consultez y a accès pendant la séance et retrouve ensuite l'historique de vos échanges avec lui. Si votre guide est une intelligence artificielle, vos messages sont transmis à notre prestataire d'IA ([NOM DU FOURNISSEUR D'IA]) pour générer les réponses. Il lui est interdit de les conserver ou de s'en servir pour entraîner ses modèles.
  >
  > **Ce que nous n'en faisons jamais :** pas de publicité, pas de prospection ciblée, pas de revente, pas de profilage sur ces sujets. Les appels et les visios ne sont pas enregistrés par défaut.
  >
  > **Combien de temps :** le contenu de vos échanges est effacé automatiquement au bout de [12] mois, ou plus tôt si vous le supprimez vous-même.
  >
  > **Vous pouvez retirer votre accord à tout moment** dans Mon compte > Confidentialité. Vos consultations s'arrêtent alors, et vous pouvez demander l'effacement de vos échanges. Ce retrait ne remet pas en cause ce qui a été fait avant.
- **Texte de la case :**
  > ☐ **J'accepte expressément** que Luna traite les données sensibles (santé, vie ou orientation sexuelle, convictions religieuses ou philosophiques) que je pourrais partager pendant mes consultations, uniquement pour réaliser ces consultations et conserver mon historique, dans les conditions décrites ci-dessus.
- **Si l'utilisateur refuse :** message « Sans cet accord, nous ne pouvons pas vous proposer de consultation, car vos échanges contiendraient presque toujours ce type d'informations. Vous pouvez continuer à consulter les contenus gratuits du site (horoscopes, articles). » Le compte reste actif.
- **Pourquoi ce n'est pas un consentement « forcé » :** la CNIL admet (Cosmospace §103 à 110, Télémaque §67 à 74) que le consentement explicite est la seule base possible pour une consultation de voyance. Conditionner la consultation à cet accord est donc cohérent, car la donnée est intrinsèque au service. En revanche, il NE DOIT PAS conditionner autre chose (contenus gratuits, prospection). [à vérifier par DPO : formulation définitive]
- **Retrait :** bouton « Retirer mon accord aux données sensibles » dans les paramètres, avec confirmation. Effets : blocage des nouvelles séances, proposition de supprimer l'historique, event `consent.withdrawn`.
- *Obligatoire (texte) : art. 9-2-a RGPD, sanctions SAN-2024-014 et SAN-2024-015.*

#### C5. Enregistrement d'un appel pour contrôle qualité (`call_recording_quality`)
- **Principe :** **aucun enregistrement par défaut**. Si Luna active l'échantillonnage qualité, le client sélectionné par tirage aléatoire entend un message vocal **avant** la mise en relation, et l'enregistrement ne démarre qu'après son accord.
- **Message vocal (serveur vocal Twilio) :**
  > « Bonjour, ici Luna. Pour améliorer la qualité de nos consultations, nous aimerions enregistrer cet appel. L'enregistrement sera écouté uniquement par notre équipe qualité et effacé au bout de 30 jours. Il peut contenir des informations personnelles et sensibles. Si vous êtes d'accord, tapez 1. Pour refuser, tapez 2 ou ne tapez rien : votre consultation se déroulera normalement, sans enregistrement. »
- **Preuve :** `channel='phone_ivr'`, `evidence_extra={"ivr_key":"1","call_sid":"..."}`. Le guide est informé par un bandeau « Appel enregistré (contrôle qualité) ».
- **Défaut :** aucune touche ou touche 2 → pas d'enregistrement.
- **Retrait :** le client peut demander l'effacement d'un enregistrement depuis son historique (« Supprimer l'enregistrement de cet appel »).
- **Guides :** les guides sont aussi des personnes enregistrées. Ils DOIVENT être informés dans les Conditions guides (§11.4), et le tirage ne doit pas viser un guide en particulier sans motif.
- *Obligatoire (texte) : art. 5-1-c et 9 RGPD (Cosmospace). Le taux de [5] % et la durée de 30 jours sont recommandés ; la CNIL retient 6 mois maximum pour les enregistrements au travail.*

#### C6. Enregistrement de la visio (`video_recording`)
- **Règle v2 :** la visio **n'est jamais enregistrée**. Le code DOIT désactiver l'enregistrement côté fournisseur (par ex. `recordParticipantsOnConnect=false` ou équivalent [à vérifier selon l'API]). Toute activation future passera par un nouveau texte de consentement et une mise à jour de l'AIPD. *Recommandé (bonne pratique), l'absence de nécessité rendant l'enregistrement excessif.*
- **Mention affichée dans la salle de visio :**
  > Cette visio n'est pas enregistrée, ni par Luna ni par votre guide. Il est interdit à chacun d'enregistrer ou de filmer l'autre sans son accord.

#### C7. Information sur l'usage des conversations par l'IA, et opt-in à l'entraînement (`ai_training`)
- **(a) Traitement par l'IA pour répondre** : couvert par C4 et par l'information de transparence IA (§10). Pas de case supplémentaire.
- **(b) Utilisation des conversations pour améliorer ou entraîner l'IA** : **opt-in séparé, refusé par défaut**, proposé dans les paramètres. NE DOIT JAMAIS être proposé pendant l'écran C4 ni pendant une séance.
- **Texte :**
  > ☐ J'accepte que mes conversations avec les guides IA de Luna, après suppression de mon nom, de mon email, de mon téléphone et des autres éléments qui permettent de m'identifier directement, soient utilisées pour améliorer les guides IA de Luna. Ces données restent chez Luna et son prestataire [NOM], ne sont jamais utilisées pour entraîner les modèles généraux du prestataire, et sont supprimées au bout de [24] mois. Je peux retirer mon accord à tout moment ; les conversations futures ne seront plus utilisées et celles déjà extraites seront supprimées sous 30 jours.
- **Règles :** valeur par défaut `refused` (aucune ligne = refus) ; jamais de conversations avec un guide humain ; exclusion automatique des conversations ayant déclenché une alerte de détresse (§8.5). *Obligatoire (texte) : art. 6-1-a, art. 9-2-a et finalité distincte (art. 5-1-b).*

#### C8 à C12. Prospection : une case par canal (`marketing_email`, `marketing_sms`, `marketing_whatsapp`, `marketing_push`, `marketing_phone`)
- **Moment :** à l'inscription (bloc « Recevoir nos offres », sous les cases obligatoires et visuellement séparé), ou plus tard dans les paramètres. **Jamais** pendant une séance, ni sur l'écran C4, ni juste après une alerte de détresse.
- **Format :** 4 ou 5 cases séparées, non pré-cochées. Le bloc indique **l'identité unique du prospecteur** : l'éditeur Luna. Aucun partenaire.
- **Textes :**
  > **Recevoir les offres de Luna** (facultatif, vous pouvez changer d'avis à tout moment)
  > ☐ Par **email** : offres, nouveautés et horoscopes de Luna ([RAISON SOCIALE]). Au maximum [2] emails par semaine.
  > ☐ Par **SMS** : offres de Luna. Au maximum [2] SMS par mois, jamais entre 20 h et 10 h ni le dimanche.
  > ☐ Par **WhatsApp** : offres de Luna, envoyées via WhatsApp (service de Meta). Au maximum [2] messages par mois.
  > ☐ Par **notifications** sur l'application : offres de Luna.
  > ☐ Par **téléphone** : appels de Luna pour vous présenter ses offres de consultation, pendant 12 mois au maximum à compter d'aujourd'hui. Vous pouvez retirer cet accord à tout moment, y compris oralement pendant un appel.
  >
  > Luna ne transmet jamais vos coordonnées à des partenaires. Désinscription en un clic dans chaque message ou dans Mon compte.
- **Push :** en plus de la case Luna, l'autorisation système iOS ou Android est requise. On ne demande l'autorisation système qu'**après** que l'utilisateur a coché la case (pas d'invite système au premier lancement). Les notifications **de service** (fin de crédit, rendez-vous) ont un réglage séparé et ne contiennent jamais d'offre.
- **Téléphone :** depuis le 11 août 2026, le démarchage téléphonique des consommateurs exige un consentement préalable, valable au plus 1 an et non renouvelable tacitement (art. L.223-1 C. conso, voir §7.5). `expires_at = occurred_at + 12 mois`. *Recommandé :* ne pas faire de démarchage téléphonique du tout (voir §7).
- **Exception « produits analogues » (email et SMS) :** voir §7.2. Si Luna l'utilise, la case email ou SMS est remplacée, **pour les seuls clients ayant déjà acheté**, par une information et une case d'opposition (texte en §7.2). *Recommandé pour Luna : ne pas utiliser l'exception et demander l'opt-in à tous*, en raison de la vulnérabilité du public et des sanctions.
- *Obligatoire (texte) : art. L.34-5 CPCE, art. L.223-1 C. conso.*

#### C13. Parrainage : information du filleul (`referral_terms`)
- **Règle principale :** Luna NE DOIT PAS collecter les coordonnées du filleul auprès du parrain (pas de formulaire « entrez l'email de votre ami », pas d'import du carnet d'adresses). Le parrain partage **lui-même** un lien ou un code, par le moyen de son choix. *Obligatoire (texte) au regard de l'art. L.34-5 CPCE (le filleul n'a pas consenti), et des art. 5-1-c et 14 RGPD.*
- **Texte affiché au parrain :**
  > Partagez votre lien personnel avec les personnes de votre choix. Luna ne leur écrira pas à votre place et ne vous demandera pas leurs coordonnées. Merci de ne partager ce lien qu'avec des personnes majeures qui pourraient être intéressées, et de ne pas l'envoyer en masse.
- **Texte affiché au filleul (page d'arrivée du lien) :**
  > Vous avez été invité(e) par un membre de Luna. Si vous créez un compte, votre parrain ou votre marraine saura seulement que quelqu'un s'est inscrit grâce à son lien, sans voir votre nom ni vos consultations, et recevra [MONTANT] € de crédit après votre première recharge. Vous recevrez [MONTANT] € de crédit offert. Ce bonus n'est pas remboursable en argent.
- **Données :** `referrals(referrer_user_id, referee_user_id, code, created_at, reward_status)`. Le parrain ne voit **que** « 1 inscription, bonus crédité », sans pseudonyme ni date précise (recommandé).
- **Garde-fou :** un bonus de parrainage NE DOIT PAS être versé en crédit à un compte en auto-exclusion ni pousser à recharger (§8.7).

#### C14. Cookies (`cookies_audience`, `cookies_ads`, `cookies_social`)
Voir §11.6 pour le texte du bandeau et le détail. Preuve : `consent_events` avec `visitor_id`, choix conservé **6 mois** (recommandation CNIL), puis nouvelle demande.

#### C15. Demande d'exécution immédiate et renonciation à la rétractation (`withdrawal_waiver`)
- **Fondement :** pour une prestation de services conclue à distance, le consommateur dispose de 14 jours pour se rétracter. Il perd ce droit si la prestation est **pleinement exécutée** avant la fin du délai, à condition d'avoir donné son **accord préalable exprès** et d'avoir **reconnu** qu'il perdrait ce droit (art. L.221-28, 1° C. conso). Si l'exécution commence avant la fin du délai à sa demande expresse (art. L.221-25), le consommateur qui se rétracte paie la part déjà exécutée.
- **Moment :** au premier achat, et pour chaque abonnement, juste avant le paiement, sur le même écran que C3.
- **Format :** case séparée de C3, non pré-cochée. Sans elle, l'achat reste possible, mais le crédit n'est utilisable qu'après 14 jours ; l'interface l'indique clairement. [à vérifier par avocat : cette option « crédit différé » est la plus sûre ; une alternative consiste à rendre la case obligatoire pour une consommation immédiate et à rembourser le solde non consommé en cas de rétractation]
- **Texte :**
  > ☐ Je demande à pouvoir utiliser mon crédit **immédiatement**, sans attendre la fin du délai de rétractation de 14 jours. Je reconnais que chaque consultation entièrement réalisée ne pourra plus faire l'objet d'une rétractation. Le crédit que je n'ai pas encore utilisé reste remboursable si je me rétracte dans les 14 jours, et ensuite dans les conditions des CGV.
- **Confirmation :** l'email de confirmation de commande DOIT reprendre cet accord (art. L.221-13 : confirmation sur support durable). *Obligatoire (texte).*

#### C16. Changement de plafond de dépense (`spending_limit_change`)
Voir §8.2. Toute **hausse** de plafond déclenche une confirmation écrite et un délai de réflexion ; la preuve est stockée ici.

### 2.5 Écran « Mes consentements » (DOIT)

`/compte/confidentialite` liste chaque finalité de §2.3 avec : l'état courant, la date et la version du texte accepté (lien vers le texte archivé), et un interrupteur ou un bouton de retrait. Le retrait prend effet **immédiatement** dans l'application, et sous **48 h** au plus chez les sous-traitants (synchronisation des listes d'opposition emailing et SMS). *Obligatoire (art. 7-3) ; le délai de 48 h est recommandé.*

### 2.6 Ce qui n'est PAS fondé sur le consentement (pour éviter les cases inutiles)

- L'exécution de la consultation, le paiement et la facturation reposent sur le contrat.
- La comptabilité et la réponse aux demandes de droits reposent sur une obligation légale.
- La sécurité, la journalisation et la lutte contre la fraude reposent sur l'intérêt légitime.
- Ne pas demander de consentement pour ces traitements : ce serait trompeur, car un retrait serait impossible.

---

## 3. Durées de conservation

### 3.1 Principes

- Chaque donnée a **une durée en base active**, puis éventuellement **une durée en archivage intermédiaire** (base ou schéma séparé, accès restreint à la compta, au DPO et au juridique, journalisé). À l'issue, elle est **supprimée ou anonymisée**. *Obligatoire (art. 5-1-e ; Télémaque §47 et 52).*
- L'anonymisation doit être **irréversible** : suppression des identifiants, des textes libres et des identifiants techniques reliables. Une simple pseudonymisation (remplacement de l'email par un hash) n'est **pas** une anonymisation.
- Aucune durée ne se justifie par « d'éventuelles réquisitions judiciaires » (Cosmospace §73, Télémaque §51).
- Le calcul de la fin de relation commerciale se base sur `users.last_activity_at` (dernière connexion, dernier achat ou dernière séance, la plus récente des trois).

### 3.2 Tableau des durées

| Catégorie | Base active | Archivage intermédiaire | Puis | Fondement | Statut |
|---|---|---|---|---|---|
| **Compte client** (identité, email, préférences) | Durée de la relation | — | Suppression ou anonymisation **24 mois** après `last_activity_at`, avec email d'avertissement 30 jours avant | Référentiel CNIL gestion commerciale (3 ans maximum pour la prospection après la fin de la relation) ; 24 mois par prudence | 3 ans maximum : obligatoire au sens de la jurisprudence Cosmospace ; 24 mois : recommandé |
| **Compte inactif** | Voir ci-dessus | — | Même règle. Si le wallet a un solde > 0, rembourser d'abord (proposition par email) ou garder le compte en archive jusqu'au remboursement ou à la prescription | Art. 5-1-e ; prescription de droit commun de 5 ans (art. 2224 C. civ.) pour la créance de solde | Recommandé |
| **Historique de chat** (contenu des messages, IA et humain), **données sensibles comprises** | **12 mois** glissants par message, ou moins si le client supprime | **Aucun** pour le contenu | Suppression définitive du contenu. On garde les seules métadonnées de facturation (date, durée, guide, prix) | Minimisation ; données sensibles ; Télémaque (conservation des chats) | Recommandé (durée) ; l'absence de conservation indéfinie est obligatoire |
| Historique de chat **visible par le guide** | Pendant que la relation client-guide est active, au maximum 12 mois | — | Masqué pour le guide **90 jours** après la dernière séance avec ce client (recommandé) | Moindre privilège | Recommandé |
| **Enregistrements d'appels** (échantillon qualité) | **30 jours** | — | Suppression chez Twilio **et** chez Luna. Les grilles d'évaluation, sans enregistrement, peuvent être gardées 12 mois | Guide CNIL « écoute et enregistrement des appels sur le lieu de travail » : 6 mois maximum pour l'enregistrement, 1 an pour les documents d'analyse | 6 mois : plafond ; 30 jours : recommandé |
| Enregistrement manuel « urgence » | 30 jours, ou durée d'une procédure si un signalement aux autorités a été fait | Durée de la procédure | Suppression | Art. 5-1-e | Recommandé |
| **Métadonnées d'appel** (horodatage, durée, numéros proxy, SID Twilio) | **12 mois** | Les seules données de facturation (date, durée, montant) suivent la règle « transactions » | Suppression des numéros et des SID | Facturation, réclamations | Recommandé [à vérifier : obligations éventuelles de l'art. L.34-1 CPCE si Luna était qualifiée d'opérateur] |
| **Visio** | Aucun enregistrement. Métadonnées : 12 mois | — | — | — | Recommandé |
| **Transactions, factures, relevés de commissions** | Pendant la relation, puis 3 ans pour les réclamations | Jusqu'à **10 ans** à compter de la clôture de l'exercice | Suppression | Art. L.123-22 C. com. (10 ans pour les documents comptables et pièces justificatives) | Obligatoire (texte) |
| **Contrats conclus en ligne ≥ 120 €** (preuve de commande) | — | 10 ans | Suppression | Art. L.213-1 et D.213-1 C. conso : conservation et accès pour les contrats électroniques à partir de 120 € [à vérifier : numéro exact du D.] | Obligatoire (texte) |
| **Wallet** (mouvements, solde) | Pendant la relation | 10 ans (pièces comptables) | Suppression | L.123-22 C. com. | Obligatoire (texte) |
| **Données de paiement** (carte) | **Jamais stockées chez Luna** : seulement `stripe_customer_id`, la marque de la carte et ses 4 derniers chiffres | — | Suppression du moyen de paiement chez Stripe à la fermeture du compte | PCI DSS | Obligatoire |
| **Journaux de connexion** (IP, user-agent, succès ou échec) | **12 mois** | — | Suppression | Recommandation CNIL journalisation (6 mois à 1 an en général) | Recommandé |
| **Journal d'audit** (accès back-office) | 12 mois en ligne | **jusqu'à 3 ans** pour les accès aux données sensibles et aux exports | Suppression | Recommandation CNIL journalisation (jusqu'à 3 ans si le risque le justifie) | Recommandé |
| **Prospects** (newsletter sans achat, lead non client) | **3 ans** après la collecte ou le dernier contact émanant du prospect (clic, ouverture ne suffit pas toujours [à vérifier]) | — | Suppression, sauf nouvelle demande explicite | Référentiel CNIL gestion commerciale | Obligatoire au sens de la jurisprudence |
| **Liste d'opposition** (désinscrits) | Tant que nécessaire | — | Conserver un **hash** de l'email ou du téléphone, jamais en clair, pour ne plus écrire à la personne | Référentiel CNIL (3 ans minimum pour la liste d'opposition) [à vérifier : durée exacte] | Recommandé |
| **Candidatures de guides non retenues** | **2 ans** après le dernier contact, avec information du candidat ; sinon suppression immédiate à sa demande | — | Suppression, y compris pièce d'identité | Par analogie avec la pratique CNIL en matière de recrutement [à vérifier] | Recommandé |
| **Comptes guides** (après fin de collaboration) | Pendant la collaboration | 5 ans (prescription civile), 10 ans pour les relevés comptables | Suppression | Art. 2224 C. civ. ; L.123-22 C. com. | Recommandé / obligatoire (compta) |
| **Pièce d'identité des guides** | Le temps de la vérification, puis **suppression de l'image** ; on garde « vérifié le … par … » | — | — | Minimisation | Recommandé (si Stripe effectue le KYC, Luna n'a pas besoin de la conserver) |
| **Données DAC7** (déclaration des revenus des vendeurs par les plateformes, art. 242 bis CGI) | — | [10 ans à vérifier] | — | [à vérifier par expert-comptable : applicabilité à Luna] | À vérifier |
| **Tickets support** | **24 mois** après clôture | — | Suppression. Si le ticket a justifié un accès à une conversation, la trace reste dans le journal d'audit | Art. 5-1-e | Recommandé |
| **Preuves de consentement** (`consent_events`) | Durée du traitement concerné | **5 ans** après le retrait ou l'expiration | Suppression | Preuve (art. 7-1) ; prescription civile | Recommandé |
| **Signalements de détresse** (§8.5) | **30 jours** : signal, catégorie, horodatage, action prise, **sans copie du texte** | — | Anonymisation (statistiques) | Minimisation | Recommandé |
| **Avis clients** | Tant que le guide est actif, au maximum 3 ans | — | Suppression ou anonymisation | L.111-7-2 C. conso | Recommandé |
| **Jeux d'entraînement IA** (si opt-in C7) | **24 mois** | — | Suppression | Art. 5-1-e | Recommandé |
| **Sauvegardes** | Rotation sur **35 jours** au maximum | — | Écrasement | Voir §6.3 | Recommandé |

### 3.3 Implémentation (DOIT)

- Table `retention_policies(category, active_days, archive_days, action_after, legal_basis_ref)`, alimentée depuis `v2/legal/retention.yml`.
- Tâche planifiée quotidienne `retention:purge` qui :
  1. sélectionne les éléments expirés par catégorie ;
  2. supprime ou anonymise, y compris chez les sous-traitants (appel API Twilio `DELETE Recording`, purge chez l'outil de ticketing, etc.) ;
  3. écrit un événement `retention.purged {category, count, run_id}` **sans** données personnelles ;
  4. alerte en cas d'échec (`retention.failed`).
- Un rapport mensuel `retention.report` liste les volumes purgés par catégorie (preuve de conformité).
- Les tables qui contiennent des données sensibles (`chat_messages`, `call_recordings`) DOIVENT porter une colonne `purge_after TIMESTAMPTZ NOT NULL`, calculée à l'insertion.

---

## 4. Rôles et droits d'accès (RBAC)

### 4.1 Principe

Moindre privilège : chaque rôle n'accède qu'aux données strictement nécessaires à sa mission. Les accès sont **refusés par défaut**. *Obligatoire (art. 5-1-f, 25 et 32 RGPD).*

### 4.2 Matrice

Légende : **L** = lecture, **E** = écriture, **—** = aucun accès, **T** = seulement sur ticket ouvert et avec justification journalisée, **P** = données pseudonymisées ou masquées, **A** = agrégé ou statistique.

| Ressource | Client | Guide (humain) | Guide IA (système) | Modérateur | Support | Compta | Admin | Super-admin | Fournisseur d'IA |
|---|---|---|---|---|---|---|---|---|---|
| Son propre profil | L/E | L/E (le sien) | — | — | — | — | — | — | — |
| Email et téléphone réels d'un client | Le sien | **—** | **—** | — | L (P : masqué partiellement, déverrouillage sur T) | L (facturation seulement) | L | L | **—** |
| Pseudonyme du client | Le sien | L (ses clients) | L (session en cours) | L | L | L | L | L | Uniquement dans le prompt si nécessaire (**recommandé : non**) |
| Contenu des conversations | Les siennes | **Seulement les siennes avec ce client** | Session en cours et historique avec ce client, si nécessaire | **T** (signalement d'abus) | **T** (ticket du client concerné) | **—** | **T** | **T** + double validation | Transmis pour inférence, sans conservation (zéro-rétention) |
| Enregistrements d'appels | Les siens | **—** | — | L (équipe qualité désignée) | — | — | — | T | — |
| Signaux de détresse | — | Alerte en direct pendant la séance | Génère le signal | L (file d'alerte) | — | — | A | L | — |
| Wallet et transactions | Les siens | — (voit ses gains, pas le solde du client) | — | — | L (lecture, pour les remboursements jusqu'à [50] €) | L/E | L | L/E | — |
| Gains et relevés du guide | — | Les siens | — | — | — | L/E | L | L/E | — |
| IBAN et KYC du guide | — | Chez Stripe (dashboard Express) | — | — | — | — (référence Stripe seulement) | — | — | — |
| Avis | E (les siens) | L (les siens), droit de réponse | — | L/E (modération) | L | — | L | L | — |
| Consentements | Les siens | — | — | — | L | — | L | L | — |
| Journal d'audit | — | — | — | — | — | — | L (sauf entrées le concernant [à vérifier]) | L | — |
| Configuration et rôles | — | — | — | — | — | — | E (sauf super-admin) | E | — |
| Exports massifs de données | — | — | — | — | — | Export comptable sans données de conversation | **—** | Avec double validation | — |

### 4.3 Règles spécifiques (DOIT)

1. **Masquage des coordonnées.** Un guide ne voit jamais l'email ni le numéro réel d'un client, et inversement. Les appels passent par des **numéros proxy Twilio** (Twilio Proxy ou une session de masquage équivalente) ; la messagerie passe uniquement par l'interface Luna. *Recommandé (bonne pratique), et indispensable en pratique pour respecter la minimisation.*
2. **Filtre anti-contournement.** Les messages client↔guide sont filtrés pour masquer les numéros de téléphone, emails et liens de paiement externes (`[coordonnées masquées]`). L'événement `chat.contact_info_redacted` est journalisé. *Recommandé* : il protège le client du démarchage hors plateforme et de l'abus de faiblesse.
3. **Accès du support aux conversations : « bris de glace ».** Le support ne peut ouvrir une conversation que si :
   - un ticket ouvert par **ce client** existe (`ticket_id`) ;
   - l'agent saisit une justification libre de 20 caractères minimum, choisie dans une liste (litige de facturation, signalement d'abus, demande du client) ;
   - l'accès est limité à la conversation visée, pour **4 heures** ;
   - l'événement `support.conversation_access {agent_id, ticket_id, conversation_id, reason}` est journalisé ;
   - le client en est **informé** dans son espace (« Un membre du support a consulté votre conversation du … dans le cadre de votre demande n° … ») (recommandé).
4. **MFA obligatoire** pour tous les rôles back-office (§9).
5. **Séparation des rôles :** un même compte ne peut pas cumuler « guide » et « modérateur », ni « compta » et « super-admin ».
6. **Revue des accès** tous les trimestres, avec révocation automatique des comptes back-office inactifs depuis 60 jours (recommandé).
7. **Fournisseur d'IA :** n'a aucun accès direct à la base. Il reçoit seulement le contexte nécessaire par API. Le prompt NE DOIT PAS contenir l'email, le téléphone ni le nom légal. Le paramètre de non-conservation ou de non-entraînement est activé côté API. *Recommandé* ; l'interdiction d'entraînement est *obligatoire* sans opt-in C7.
8. Implémentation suggérée : table `roles`, `permissions`, `role_permissions`, `user_roles`, contrôlées par un middleware `authorize(permission, resource)`. Les règles « T » sont implémentées par une table `access_grants(id, actor_id, resource_type, resource_id, reason, ticket_id, expires_at)`.

---

## 5. Journal d'audit

### 5.1 Événements à tracer (DOIT)

| Domaine | Événements |
|---|---|
| Authentification | `auth.login_success`, `auth.login_failed`, `auth.mfa_enrolled`, `auth.mfa_failed`, `auth.password_reset`, `auth.session_revoked` |
| Accès aux données | `support.conversation_access`, `moderation.conversation_access`, `admin.user_profile_view` (si coordonnées réelles démasquées), `recording.played`, `export.generated`, `export.downloaded` |
| Consentements | `consent.granted`, `consent.refused`, `consent.withdrawn`, `consent.expired` |
| Droits RGPD | `dsr.request_received`, `dsr.identity_verified`, `dsr.completed`, `dsr.rejected` (avec motif) |
| Données | `user.deleted`, `user.anonymized`, `retention.purged`, `retention.failed`, `chat.message_deleted_by_user` |
| Argent | `wallet.topup`, `wallet.debit_session`, `wallet.refund`, `wallet.manual_adjustment` (avec motif et approbateur), `payout.created` |
| Garde-fous | `limit.reached`, `limit.changed`, `session.time_alert_shown`, `session.continue_confirmed`, `distress.detected`, `distress.billing_paused`, `self_exclusion.started`, `self_exclusion.ended` |
| Administration | `role.granted`, `role.revoked`, `config.changed` (avec ancienne et nouvelle valeur), `guide.activated`, `guide.suspended`, `legal_text.published` |
| Sécurité | `security.incident_opened`, `security.breach_assessed`, `security.cnil_notified`, `security.users_notified` |

### 5.2 Champs

```sql
CREATE TABLE audit_log (
  id            BIGSERIAL PRIMARY KEY,
  occurred_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  actor_type    TEXT NOT NULL,      -- 'user','guide','staff','system','ai'
  actor_id      UUID NULL,
  actor_role    TEXT NULL,
  action        TEXT NOT NULL,      -- nom de l'événement
  target_type   TEXT NULL,
  target_id     UUID NULL,
  reason        TEXT NULL,          -- justification pour les accès « T »
  ticket_id     UUID NULL,
  ip_truncated  INET NULL,
  request_id    TEXT NULL,
  metadata      JSONB NULL,         -- JAMAIS de contenu de conversation, de mot de passe ni de numéro de carte
  prev_hash     TEXT NOT NULL,      -- chaînage
  row_hash      TEXT NOT NULL       -- SHA-256(prev_hash || contenu canonique de la ligne)
);
```

### 5.3 Immutabilité, durée et accès

- **Append-only :** le rôle applicatif a seulement le droit `INSERT`, jamais `UPDATE` ni `DELETE`. La purge à expiration est faite par un rôle technique distinct, et elle est elle-même journalisée. *Recommandé (bonne pratique).*
- **Chaînage par hash** et export quotidien de la dernière empreinte vers un stockage séparé en écriture unique (WORM, par ex. un bucket avec verrouillage d'objets) (recommandé).
- **Durée :** 12 mois en ligne ; jusqu'à 3 ans en archive pour les accès aux données sensibles, aux enregistrements et aux exports (§3.2).
- **Accès :** super-admin et DPO uniquement, en lecture. Toute consultation du journal est elle-même journalisée (`audit.viewed`).
- **Contrôle automatique (recommandé) :** alerte quand un même agent ouvre plus de [10] conversations en 24 h, ou quand un accès a lieu hors horaires de service.

---

## 6. Droits des personnes

### 6.1 Organisation générale (DOIT)

- **Canaux :** formulaire `/compte/mes-donnees` (connecté), et adresse [EMAIL DPO OU CONTACT DONNÉES] pour les personnes sans compte.
- **Délai :** réponse sous **1 mois** à compter de la réception, prolongeable de 2 mois si la demande est complexe, en informant la personne dans le premier mois (art. 12-3 RGPD). *Obligatoire (texte).*
- **Gratuité,** sauf demande manifestement infondée ou excessive (art. 12-5).
- **Vérification d'identité proportionnée :** pour un utilisateur connecté, une réauthentification et une confirmation par email suffisent. On NE DOIT PAS demander systématiquement une pièce d'identité ; on ne la demande qu'en cas de doute raisonnable, par exemple pour une demande par email depuis une adresse inconnue. *Recommandé, conforme à la doctrine CNIL.*
- **Suivi :** table `data_subject_requests(id, user_id, type, received_at, due_at, status, verified_at, completed_at, response_ref, handled_by)`, avec alerte à J+20 si la demande n'est pas close.

### 6.2 Accès et portabilité : export

- **Bouton** « Télécharger mes données » : génère une archive ZIP sous 48 h (asynchrone), disponible pendant 7 jours via un lien à usage unique, après réauthentification.
- **Contenu :**
  - `profil.json` : compte, préférences, plafonds ;
  - `consentements.json` : historique complet avec les versions des textes ;
  - `conversations/` : un fichier JSON par conversation, et une version HTML lisible ;
  - `appels.csv` et `visios.csv` : métadonnées ;
  - `enregistrements/` : les enregistrements existants le cas échéant (moins de 30 jours) ;
  - `wallet.csv`, `factures/` (PDF) ;
  - `tickets.json`, `avis.json`, `parrainage.json` ;
  - `destinataires.txt` : liste des sous-traitants et de leurs pays ;
  - `README.txt` : explication des champs, finalités et durées.
- **Format :** JSON et CSV (lisibles par machine) pour la portabilité (art. 20), PDF et HTML pour la lisibilité.
- **Exclusions :** les données concernant d'autres personnes, au-delà de ce qui est nécessaire. Dans une conversation, les messages du guide sont inclus, car ils font partie de l'échange, mais pas ses coordonnées.
- Événements : `export.generated`, `export.downloaded`. *Obligatoire (art. 15 et 20).*

### 6.3 Suppression du compte (droit à l'effacement)

**Bouton** « Supprimer mon compte » dans les paramètres, avec un récapitulatif des effets, la proposition de rembourser le solde du wallet, et une confirmation par mot de passe.

**Cascade (DOIT) :**

| Donnée | Action à la suppression |
|---|---|
| Profil, email, téléphone, préférences | Supprimés. L'email et le téléphone, s'ils sont désinscrits, deviennent un hash dans la liste d'opposition |
| Conversations, données sensibles | **Supprimées** immédiatement (suppression logique), puis physiquement sous 30 jours |
| Enregistrements | Supprimés chez Luna et chez Twilio (appel API) |
| Consentements | Conservés 5 ans (preuve), rattachés à un identifiant pseudonyme |
| Transactions, factures, wallet | **Conservés en archivage intermédiaire 10 ans** (obligation comptable), séparés et restreints. L'identité minimale nécessaire à la facture est conservée |
| Avis publiés | Anonymisés (« Client Luna ») ou supprimés, au choix de l'utilisateur |
| Tickets | Supprimés, sauf litige en cours |
| Données chez les sous-traitants | Appels API de suppression : emailing (contact), SMS, push (jeton), Stripe (moyen de paiement et client, en gardant les données que Stripe doit conserver pour ses propres obligations), outil de support |
| Sauvegardes | Non modifiées individuellement ; écrasées à la fin de la rotation (≤ 35 jours). Une **liste de « tombstones »** (identifiants supprimés) est rejouée après toute restauration, pour qu'aucune donnée supprimée ne réapparaisse |
| Jeux d'entraînement IA | Supprimés sous 30 jours |

- Délai de grâce (recommandé) : 14 jours pendant lesquels le compte est désactivé et peut être restauré. L'utilisateur est prévenu, et peut choisir « supprimer immédiatement ».
- Événement : `user.deleted`, avec le détail des sous-traitants notifiés (`subprocessor_deletion_status`).
- **Exceptions légales** à indiquer dans la réponse : obligation comptable, constatation ou défense de droits en justice en cas de litige **en cours**, preuve des consentements. *Obligatoire (art. 17-3).*
- **Suppression ponctuelle :** le client peut supprimer **une conversation** ou **un message**. La suppression vaut pour les deux côtés, client et guide (recommandé).

### 6.4 Rectification (art. 16)

Modification directe dans le profil (pseudonyme, email après vérification, téléphone après code SMS, date de naissance via le support avec justificatif, car c'est une donnée de contrôle de l'âge). Les conversations ne se « rectifient » pas : elles se suppriment.

### 6.5 Opposition (art. 21)

- **Prospection :** opposition absolue et immédiate, par un lien dans chaque message et dans les paramètres.
- **Traitements fondés sur l'intérêt légitime** (sécurité, statistiques, détection de détresse) : examen au cas par cas. La sécurité et la prévention du risque vital sont maintenues, avec motivation de la réponse.

### 6.6 Limitation (art. 18)

Champ `users.processing_restricted_at`. Pendant la limitation : compte gelé, données conservées sans autre usage, prospection arrêtée, accès du support bloqué sauf pour traiter la demande.

### 6.7 Retrait du consentement

Voir §2.5. Effets propres à chaque finalité (C4 : arrêt des séances ; C7 : retrait des jeux d'entraînement ; C8 à C12 : arrêt des envois sous 48 h).

### 6.8 Décisions automatisées (art. 22)

La détection de détresse et les plafonds ne produisent pas de « décision exclusivement automatisée produisant des effets juridiques ». La pause est réversible, le client peut reprendre après confirmation, et un humain peut intervenir. Il faut le documenter dans l'AIPD. Une **suspension de compte** NE DOIT PAS être décidée automatiquement : un modérateur la valide. *Recommandé (bonne pratique) ; obligatoire si l'effet est significatif.*

### 6.9 Personne décédée

Directives post-mortem (art. 85 loi Informatique et Libertés) : un formulaire permet aux héritiers de demander la clôture du compte et la suppression des données. *Obligatoire (texte) : informer de ce droit dans la politique de confidentialité.*

---

## 7. Prospection commerciale

### 7.1 Tableau des règles par canal

| Canal | Règle légale | Règle Luna | Statut |
|---|---|---|---|
| **Email** | Consentement préalable (art. L.34-5 CPCE), sauf exception « produits analogues » pour un client | Opt-in C8 pour tous (recommandé) ; au plus [2] par semaine | Opt-in : obligatoire (texte), sauf exception ; fréquence : recommandé |
| **SMS / MMS** | Idem L.34-5 | Opt-in C9 ; au plus [2] par mois ; du lundi au samedi de 10 h à 20 h, jamais le dimanche ni les jours fériés ; mention « STOP au [numéro court] » | Opt-in : obligatoire ; horaires et fréquence : recommandé |
| **WhatsApp** | Message électronique soumis à L.34-5, et règles d'opt-in de WhatsApp Business [à vérifier : politique Meta à jour] | Opt-in C10 **séparé** ; au plus [2] par mois ; modèles de message validés ; bouton « Arrêter » | Obligatoire |
| **Push** | Traceur ou notification : consentement (art. 82 loi I&L) et autorisation système. La qualification au titre de L.34-5 est discutée [à vérifier] | Opt-in C11 et autorisation système ; au plus [3] par semaine ; aucune notification de 22 h à 9 h | Prudence : traiter comme un opt-in obligatoire |
| **Téléphone (appel humain sortant)** | Depuis le **11 août 2026**, interdiction de démarcher un consommateur sans son consentement préalable (art. L.223-1 C. conso, modifié par la loi n° 2025-594 du 30 juin 2025). Le consentement vaut au plus 1 an et n'est pas renouvelable tacitement. Appels autorisés du lundi au vendredi, de 10 h à 13 h et de 14 h à 20 h, au plus 4 fois sur 30 jours. **Bloctel a cessé d'exister le 11 août 2026.** | **Recommandé : Luna ne fait PAS de démarchage téléphonique.** Si Ozen le souhaite malgré tout : opt-in C12 avec `expires_at` à +12 mois, respect des horaires et de la fréquence, arrêt immédiat sur opposition orale. Un contrat conclu en violation de ces règles est nul | Obligatoire (texte) si pratiqué |
| **Automate d'appel / message vocal préenregistré** | Consentement préalable (L.34-5) | **Interdit chez Luna** | Recommandé |

> **Bloctel.** La consigne initiale demandait de vérifier Bloctel pour les appels sortants. Selon Service-Public.fr et la CNIL, **le service Bloctel a cessé d'exister le 11 août 2026**, car le démarchage téléphonique est désormais interdit par défaut sans consentement préalable. Il n'y a donc plus de liste Bloctel à consulter : seul compte le consentement C12 (et la liste d'opposition interne). Un décret n° 2026-662 du 23 juillet 2026 précise les modalités de recueil, de conservation et de retrait de ce consentement, d'après conso.gouv.fr [à vérifier sur Légifrance].

### 7.2 Exception « produits ou services analogues » (email et SMS)

La CNIL admet l'envoi de prospection par email ou SMS **sans consentement préalable** à une personne **déjà cliente**, pour des produits ou services **analogues** fournis par **la même entreprise**, à condition que la personne ait été informée et ait pu s'opposer gratuitement et simplement au moment de la collecte, puis dans chaque message. Une simple création de compte sans achat ne suffit pas.

**Recommandation pour Luna : ne pas utiliser l'exception** et demander l'opt-in à tous. Raisons : vulnérabilité du public, deux sanctions récentes dans le secteur, et risque que des relances visent des personnes en détresse.

Si Ozen choisit malgré tout d'utiliser l'exception, le texte suivant DOIT figurer au premier achat, avec une case **d'opposition** :
> Comme vous êtes client(e), Luna pourra vous envoyer par email des offres sur des consultations similaires à celles que vous avez achetées. ☐ Je ne souhaite pas recevoir ces emails.

### 7.3 Règles techniques et de contenu (DOIT)

1. **Contrôle avant chaque envoi :** `canSendMarketing(user, channel)` vérifie, dans l'ordre :
   - le consentement en cours (`consent_current`) ou l'exception valable ;
   - l'absence d'inscription en liste d'opposition (hash) ;
   - l'absence d'auto-exclusion (§8.7) ;
   - l'absence d'alerte de détresse dans les **30 derniers jours** (§8.5) ;
   - l'absence de plafond de dépense atteint dans les 7 derniers jours (§8.2) ;
   - le respect de la fréquence et des plages horaires ;
   - un compte non mineur ou non suspendu.
   Si un seul test échoue, l'envoi est **bloqué** et l'événement `marketing.suppressed {reason}` est journalisé.
2. **Désinscription en un clic** dans chaque email (lien et en-têtes `List-Unsubscribe` et `List-Unsubscribe-Post`), « STOP » pour les SMS, bouton « Arrêter » pour WhatsApp, réglage dans l'application pour le push. Prise en compte immédiate dans Luna, et sous 48 h maximum chez les sous-traitants.
3. **Identification de l'expéditeur :** chaque message mentionne « Luna – [RAISON SOCIALE] » et un moyen de contact. L'objet NE DOIT PAS être trompeur.
4. **Interdiction absolue de ciblage sensible :** aucune segmentation, aucun déclencheur ni aucune personnalisation fondés sur :
   - le contenu des conversations ;
   - les thèmes de consultation liés à la santé, au deuil, à la sexualité ou à la religion ;
   - les signaux de détresse ;
   - l'heure nocturne d'usage ;
   - la fréquence de recharge ou le montant dépensé comme indicateur de dépendance.
   Les segments autorisés se limitent à l'ancienneté, au canal préféré, à la langue et à l'opt-in horoscope. *Obligatoire (texte) : art. 9 RGPD (le consentement C4 couvre uniquement la consultation) ; art. 5-1-b ; art. 5 de l'AI Act pour l'exploitation des vulnérabilités si une IA est utilisée.*
5. **Interdiction de relancer les personnes en détresse ou fragilisées :** pas de message dans les 30 jours qui suivent une alerte de détresse, une auto-exclusion levée, ou l'atteinte répétée des plafonds. Pas de « Votre guide vous attend », « Vous nous manquez », « Les cartes ont un message urgent pour vous » ni de messages équivalents. *Recommandé (bonne pratique)*, et indispensable au regard de l'abus de faiblesse (§8.10).
6. **Contenu interdit dans toute communication :** promesse de résultat (« retour de l'être aimé garanti »), urgence artificielle (« offre valable 1 h »), compte à rebours fictif, faux avis, fausse rareté, prédiction personnalisée servant d'appât. *Obligatoire (texte) : pratiques commerciales trompeuses et agressives, art. L.121-2 et suivants, et L.121-6 et suivants C. conso.*
7. **Aucune base achetée, louée ou partagée.** Aucun « partenaire ». *Recommandé, la leçon L7 rendant tout partage très risqué.*
8. **Prospects :** suppression 3 ans après la collecte ou le dernier contact émanant du prospect (§3).
9. **Messages transactionnels** (reçu, confirmation, alerte de plafond) : ils NE DOIVENT contenir **aucune** offre commerciale, sans quoi ils deviennent de la prospection.

### 7.4 Parrainage (DOIT)

- Pas de collecte de contacts : pas d'import du carnet d'adresses, pas de formulaire « invitez vos amis par email », pas d'envoi par Luna au nom du parrain.
- Le parrain partage lui-même son lien (bouton « Copier le lien », partage natif du téléphone).
- Plafond de [10] filleuls récompensés par an et par parrain (recommandé), pour éviter le spam et la sollicitation massive de proches vulnérables.
- Le bonus est un crédit non remboursable, versé seulement après la **première recharge du filleul**, et jamais à un compte en auto-exclusion.
- Le parrain NE DOIT PAS savoir si le filleul consulte, ni combien il dépense.

### 7.5 Champs suggérés

`marketing_sends(id, user_id, channel, template_id, campaign_id, sent_at, status, suppression_reason)` ; `opposition_list(hash, channel, created_at, source)` ; `campaigns(id, name, channel, segment_definition JSONB, approved_by, approved_at)`. Une campagne NE DOIT PAS partir sans `approved_by`. Le validateur coche une case de contrôle « segment sans critère sensible ».

---

## 8. Garde-fous pour les personnes vulnérables

> Luna s'adresse à un public majeur mais souvent vulnérable : rupture, deuil, solitude, maladie. La CNIL a explicitement retenu cette vulnérabilité contre Cosmospace et Télémaque. Le Code pénal punit l'abus de faiblesse. Les garde-fous ci-dessous sont en majorité **recommandés (bonne pratique)**, mais ils constituent la meilleure défense contre les qualifications de pratique commerciale agressive (L.121-6 C. conso), d'abus de faiblesse (L.121-8 C. conso ; art. 223-15-2 C. pén.) et d'exploitation des vulnérabilités par une IA (art. 5-1-b AI Act).

### 8.1 Paramètres par défaut (table `user_safeguards`)

| Champ | Défaut prudent | Plage modifiable par l'utilisateur |
|---|---|---|
| `daily_spend_cap_eur` | **[50] €** | 0 à [150] € |
| `monthly_spend_cap_eur` | **[150] €** | 0 à [500] € |
| `session_alert_minutes` | **15, 30, 45** | 10 à 60 |
| `session_hard_confirm_minutes` | **30**, puis toutes les 15 min | 15 à 60 |
| `max_session_minutes` | **60** (pause obligatoire de 30 min) | 30 à 90 |
| `night_mode_warning` | activé de 0 h à 6 h | désactivable |
| `self_exclusion_until` | NULL | 7 jours, 30 jours, 6 mois, 1 an, définitive |

Les montants entre crochets sont des propositions à valider par Ozen.

### 8.2 Plafonds de dépense (DOIT)

- Les plafonds s'appliquent à **toutes** les dépenses : recharges, abonnement et débits à la minute.
- **Une baisse** de plafond s'applique **immédiatement**.
- **Une hausse** de plafond ne prend effet **qu'après 72 heures**, après confirmation par email (lien) et rappel des ressources d'aide. Événement `limit.changed`, consentement `spending_limit_change`.
- Quand le plafond est atteint pendant une séance, le client voit un avertissement à **2 minutes** de la limite, puis la séance s'arrête proprement (« Vous avez atteint la limite que vous vous êtes fixée. Votre séance se termine dans 2 minutes. »). **Aucune proposition** d'augmenter le plafond ou de recharger n'est affichée à ce moment-là.
- Recharge maximale par opération : [100] €. Pas de recharge automatique activée par défaut ; si elle est proposée, c'est un opt-in, et elle reste soumise aux plafonds.

### 8.3 Durée de session (DOIT)

- Un compteur **visible en permanence** pendant la séance affiche la durée et le montant dépensé (« 23 min · 41,40 € »). *Obligatoire, au titre de l'information sur le prix (art. L.112-1 C. conso), sous une forme recommandée.*
- Une alerte non bloquante aux seuils `session_alert_minutes`.
- Une **confirmation bloquante** à `session_hard_confirm_minutes` : la facturation est **suspendue** tant que le client n'a pas cliqué « Continuer ». Si le client ne répond pas dans les 60 secondes, la séance se termine.
  > Vous êtes en consultation depuis 30 minutes. Cela vous a coûté 54,00 €. Voulez-vous continuer ? [Terminer la séance] [Continuer 15 minutes]
- Les deux boutons ont la même taille, et « Terminer » est à gauche ou en premier (recommandé).
- Une pause obligatoire après `max_session_minutes`.

### 8.4 Mode nuit (recommandé)

Entre 0 h et 6 h, au début d'une séance : « Il est tard. Si vous traversez un moment difficile, vous pouvez appeler gratuitement le 3114, 24 h/24. » Pas de prospection dans cette tranche.

### 8.5 Détection de détresse et d'idées suicidaires (DOIT)

**Déclencheurs :**
- (a) liste de mots-clés et d'expressions, maintenue dans `v2/safety/distress_terms.fr.yml` : « me suicider », « en finir », « mettre fin à mes jours », « je veux mourir », « plus envie de vivre », « me faire du mal », « scarification », « overdose », « il me bat », « violences », etc. ;
- (b) classifieur IA facultatif, avec un seuil documenté dans l'AIPD ;
- (c) bouton **« Signaler une situation d'urgence »** côté guide humain.

**Actions automatiques :**
1. **Suspendre immédiatement la facturation** de la séance (`distress.billing_paused`). La reprise n'est facturée qu'après une confirmation explicite du client, au plus tôt 5 minutes plus tard (recommandé). Les minutes écoulées depuis le déclenchement ne sont jamais facturées.
2. Afficher le **bandeau d'aide**, non masquable pendant 60 secondes :
   > **Vous n'êtes pas seul(e).** Si vous pensez au suicide ou si vous êtes en danger, appelez maintenant :
   > • **3114** : numéro national de prévention du suicide, gratuit, 24 h/24, 7 j/7
   > • **15** (SAMU) ou **112** (numéro d'urgence européen) en cas de danger immédiat
   > • **3919** : Violences Femmes Info, gratuit et anonyme
   > Luna n'est pas un service d'urgence ni de soin. Votre guide ne peut pas remplacer un professionnel.
3. **Guide IA :** il quitte le registre divinatoire, répond avec empathie, renvoie vers le 3114, le 15 et le 112, et NE DOIT PAS faire de prédiction (§8.6).
4. **Guide humain :** il voit une alerte et la consigne (charte §8.8) : arrêter la consultation divinatoire, orienter vers le 3114, et appeler le 15 ou le 112 si le danger est imminent et que la personne a donné des éléments de localisation.
5. **Modération :** l'alerte arrive dans une file avec le pseudonyme et l'horodatage. Le modérateur peut consulter la conversation via un accès « T » journalisé, uniquement si nécessaire.
6. **Après l'alerte :** blocage de la prospection pendant 30 jours ; la conversation est exclue de tout jeu d'entraînement IA ; un message de suivi bienveillant **sans aucune offre** peut être envoyé 24 h après (recommandé).
- **Base légale :** consentement explicite C4 (la prévention fait partie de la consultation telle qu'elle est décrite dans la politique), et intérêts vitaux (art. 6-1-d et 9-2-c) en cas de danger imminent. À documenter dans l'AIPD. [à vérifier par DPO]
- **Données conservées :** catégorie du signal, horodatage, action prise, **sans copie du texte**, pendant 30 jours (§3).
- **AI Act :** un système de détection fondé sur le **texte** n'est pas un « système de reconnaissance des émotions » au sens de l'AI Act, défini par rapport aux données biométriques [à vérifier]. Une analyse de la voix pour détecter des émotions relèverait en revanche de l'art. 50-3 (information obligatoire) et serait interdite dans certains contextes. **NE PAS** analyser la voix en v2.

### 8.6 Consignes obligatoires pour l'IA (prompt système et tests)

Le prompt système des guides IA DOIT contenir au minimum ces règles, et des **tests automatisés** (`v2/tests/ai_safety/*.spec`) DOIVENT vérifier chacune d'elles avant chaque mise en production :

1. « Tu es une intelligence artificielle. Si on te demande si tu es humain, tu réponds clairement que tu es une IA. Tu ne prétends jamais être une personne réelle, avoir un corps, un passé ou des dons surnaturels. »
2. « Tu proposes une lecture symbolique, à visée de divertissement et de réflexion personnelle. Tu ne prédis pas l'avenir avec certitude et tu ne garantis aucun résultat (retour d'un être cher, guérison, gains, réussite). »
3. « Tu ne donnes aucun conseil médical, psychologique, juridique ou financier. Si la question porte sur la santé, un traitement, une grossesse, une décision juridique ou un placement, tu invites à consulter un professionnel. Tu ne déconseilles jamais un traitement ni une consultation médicale. »
4. « Si la personne exprime des idées suicidaires, une détresse grave, des violences ou un danger, tu arrêtes la lecture, tu réponds avec empathie et tu donnes le 3114, le 15 et le 112. Tu n'invites jamais à poursuivre la séance payante. »
5. « Tu n'incites jamais à prolonger la séance, à recharger, à revenir ou à acheter. Tu ne crées aucune urgence (« les cartes disent qu'il faut agir vite »), aucune peur (malédiction, mauvais sort, danger qui pèserait sur un proche) et aucune dépendance (« tu as besoin de moi »). »
6. « Tu ne demandes jamais de coordonnées, de données bancaires, de photos ou d'informations d'identification. Tu ne demandes pas non plus le genre ou l'orientation sexuelle de la personne ou de son partenaire. »
7. « Tu ne parles pas de politique, tu ne portes aucun jugement sur les convictions religieuses et tu ne fais aucune discrimination. »
8. « Si la personne semble mineure, tu mets fin à la conversation poliment et tu le signales. »
- La sortie de l'IA passe par un **filtre post-génération** qui bloque les expressions interdites (« garanti », « certain », « sortilège », « envoûtement », « rechargez », « ne partez pas »…) et journalise `ai.output_blocked`.
- Aucun ton de « relance commerciale » n'est généré quand le crédit est bas. C'est le système, et non l'IA, qui affiche le solde, de façon neutre.
- *Fondement : art. 5-1-a et 5-1-b AI Act (interdiction des techniques manipulatrices et de l'exploitation des vulnérabilités causant un préjudice important) ; L.121-2 et suivants C. conso. Le détail des prompts est recommandé ; l'absence de manipulation est obligatoire.*

### 8.7 Auto-exclusion (DOIT)

- Bouton « Faire une pause » dans le menu, toujours à deux clics au plus.
- Durées : 7 jours, 30 jours, 6 mois, 1 an, ou définitive.
- Effets **immédiats** : aucune séance, aucune recharge, aucune prospection, aucun bonus de parrainage, solde remboursable sur demande. La levée n'est possible qu'à l'échéance ; pour l'option définitive, il faut un email au support **et** un délai de 7 jours.
- Événements : `self_exclusion.started` et `self_exclusion.ended`. *Recommandé (bonne pratique).*

### 8.8 Charte déontologique des guides (extrait à intégrer dans les Conditions guides §11.4)

Le guide s'engage à :
1. ne jamais promettre de résultat ni prédire un événement grave (maladie, décès, accident) ;
2. ne jamais donner de conseil médical, psychologique, juridique ou financier, ni déconseiller un traitement ;
3. ne jamais prolonger artificiellement une séance, ni inciter à recharger, à revenir ou à consulter plus souvent ;
4. ne jamais évoquer de malédiction, de mauvais sort, de « désenvoûtement » payant ou de rituel payant ;
5. ne jamais solliciter de coordonnées, de paiement hors de Luna, de rencontre, de cadeau ou de photos ;
6. ne jamais enregistrer, copier ni réutiliser les échanges, et ne tenir aucun fichier personnel sur les clients ;
7. appliquer la procédure de détresse (§8.5) et orienter vers le 3114, le 15 ou le 112 ;
8. mettre fin à la séance s'il soupçonne que le client est mineur, ou si celui-ci semble hors d'état de consentir (ivresse, crise) ;
9. respecter la confidentialité absolue, y compris après la fin de la collaboration ;
10. déclarer tout conflit d'intérêts.
Tout manquement entraîne suspension ou résiliation (§11.4).

### 8.9 Contrôle de la majorité

- **Minimum (DOIT) :** déclaration C1 et date de naissance, avec un contrôle de cohérence.
- **Paiement :** une carte bancaire ne prouve pas l'âge, mais constitue un indice. Rejeter les cartes prépayées pour mineurs quand le prestataire de paiement le permet [à vérifier : fonctionnalités Stripe].
- **Signaux (recommandé) :** si une IA ou un guide détecte des indices de minorité, le compte est suspendu en attente de vérification. La vérification utilise une solution de vérification d'âge respectueuse de la vie privée (tiers de confiance, double anonymat), sans conservation de la pièce d'identité par Luna.
- **Note :** le référentiel de l'Arcom sur la vérification d'âge vise les sites pornographiques et ne s'applique pas à Luna. Une vérification plus forte reste une bonne pratique au vu du public. [à vérifier]

### 8.10 Abus de faiblesse et pratiques agressives : règles produit

- L'art. 223-15-2 du Code pénal réprime l'abus frauduleux de l'état d'ignorance ou de la situation de faiblesse d'une personne particulièrement vulnérable, ou en état de sujétion psychologique, pour la conduire à un acte ou une abstention gravement préjudiciables. L'art. L.121-8 C. conso réprime l'abus de faiblesse dans la vente.
- **Interdits produit (DOIT) :**
  - pas de « première question gratuite » suivie d'un basculement non annoncé vers le payant ;
  - pas de tarif qui change en cours de séance ;
  - pas de minutes « offertes » conditionnées à une recharge immédiate ;
  - pas de pop-up de recharge en cours de séance (seulement un indicateur de solde neutre et l'arrêt propre) ;
  - pas de faux guide « en ligne » ;
  - pas de faux compteurs (« 12 personnes regardent ce profil ») ;
  - pas de **faux avis** : uniquement des avis de clients ayant réellement consulté, datés, avec l'indication de la méthode de contrôle (art. L.111-7-2 C. conso).
- **Prix affiché** : le prix à la minute DOIT être affiché TTC **avant** chaque séance et sur chaque profil (art. L.112-1 C. conso), et rappelé au démarrage (« Ce guide coûte 1,80 €/min. Vous avez 25,00 € : environ 13 minutes. »).

### 8.11 Information permanente « Luna n'est pas… »

Un pied de page et un écran d'accueil de séance rappellent : « La voyance et la guidance sont proposées à titre de divertissement et de réflexion personnelle. Elles ne prédisent pas l'avenir avec certitude et ne remplacent pas l'avis d'un médecin, d'un psychologue, d'un avocat ou d'un conseiller financier. Service réservé aux personnes majeures. » *Recommandé (bonne pratique), et contribue à éviter les pratiques trompeuses.*

---

## 9. Sécurité (art. 32 RGPD)

| Mesure | Exigence | Statut |
|---|---|---|
| Chiffrement en transit | TLS 1.2 minimum (1.3 recommandé), HSTS, et SRTP ou TLS pour la voix et la visio | Obligatoire (art. 32, état de l'art) |
| Chiffrement au repos | Base de données et sauvegardes chiffrées (AES-256). **Chiffrement applicatif des champs** `chat_messages.body` et des enregistrements, avec des clés gérées dans un service de gestion de clés (KMS), séparées par environnement | Recommandé (bonne pratique), fortement conseillé pour les données sensibles |
| Mots de passe | Hachage Argon2id ou bcrypt (coût suffisant), 12 caractères minimum ou phrase de passe, vérification contre les mots de passe compromis, limitation des tentatives | Obligatoire (état de l'art ; recommandation CNIL sur les mots de passe) |
| MFA | **Obligatoire pour tous les comptes back-office** (application TOTP ou clé FIDO2/WebAuthn ; pas de SMS seul pour le super-admin). Proposée aux clients et aux guides ; recommandée pour les guides (accès à des données sensibles) | Recommandé, et attendu par la CNIL pour les accès à des données sensibles |
| Pseudonymisation | Dans l'interface du guide et dans les prompts IA : pseudonyme client et `client_ref` au lieu de l'identité. Pour les statistiques : identifiants hachés avec sel | Recommandé |
| Séparation des environnements | Pas de données réelles en dev ou en recette ; jeux de données synthétiques | Recommandé |
| Sécurité applicative | Revue OWASP Top 10, échappement systématique des sorties (le prototype v1 avait une faille XSS dans le chat), politique de sécurité du contenu (CSP) stricte, protection CSRF, limitation de débit, analyse des dépendances | Obligatoire (état de l'art) |
| Secrets | Aucun secret dans le dépôt Git ; gestionnaire de secrets ; rotation | Obligatoire (état de l'art) |
| Paiement | **PCI DSS via Stripe** : Stripe Elements ou Checkout (le numéro de carte ne transite jamais par les serveurs de Luna), aucune donnée de carte stockée, webhooks signés | Obligatoire (PCI DSS) |
| Twilio | Numéros proxy ; enregistrement désactivé par défaut ; signature des webhooks vérifiée ; purge des enregistrements | Recommandé |
| Sauvegardes | Chiffrées, tests de restauration trimestriels, rotation ≤ 35 jours, rejeu des « tombstones » | Recommandé |
| Journalisation | §5 | Recommandé |
| Tests | Test d'intrusion avant le lancement, puis une fois par an | Recommandé |
| Violations de données | Procédure §9.1 | Obligatoire (art. 33 et 34) |

### 9.1 Procédure de violation de données (DOIT)

1. **Détection** : ouverture d'un incident `security.incident_opened`, avec un responsable désigné.
2. **Évaluation** sous 24 h : nature, catégories de données et nombre de personnes, conséquences. Une fuite de conversations est présumée constituer un **risque élevé**, car il s'agit de données sensibles.
3. **Notification à la CNIL sous 72 heures** après en avoir pris connaissance, via le téléservice de la CNIL, sauf si la violation n'est pas susceptible d'engendrer un risque (art. 33). Si l'analyse n'est pas terminée, faire une notification initiale puis la compléter.
4. **Information des personnes** « dans les meilleurs délais » en cas de risque élevé (art. 34), avec un modèle d'email préparé à l'avance (`v2/legal/templates/breach_notice.md`).
5. **Registre des violations**, y compris celles qui ne sont pas notifiées (art. 33-5) : table `security_incidents`.
6. **Sous-traitants :** obligation contractuelle de prévenir Luna « dans les meilleurs délais » (art. 33-2) ; prévoir 24 à 48 h dans les DPA (recommandé).

---

## 10. Transparence IA (AI Act, art. 50) et affichage IA ou humain

### 10.1 Cadre

- **Art. 50-1 du règlement (UE) 2024/1689 (AI Act)** : les fournisseurs veillent à ce que les systèmes d'IA destinés à interagir directement avec des personnes physiques soient conçus de sorte que ces personnes soient **informées qu'elles interagissent avec une IA**, sauf si cela ressort de manière évidente du contexte. L'information doit être claire, intervenir au plus tard lors de la première interaction, et respecter les exigences d'accessibilité (art. 50-5).
- **Date :** selon le service d'assistance AI Act de la Commission européenne, les obligations de transparence s'appliquent et sont **exécutoires depuis le 2 août 2026**. Un délai jusqu'au **2 décembre 2026** existe seulement pour le marquage lisible par machine (art. 50-2) des systèmes mis sur le marché avant le 2 août 2026. Source : https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/when-does-enforcement-start
- **Qualité de Luna :** Luna est au minimum « déployeur » d'un système d'IA. Si elle met en service sous son propre nom des personas IA (« Séléné »), elle est probablement aussi « fournisseur » du système d'IA destiné à interagir avec des personnes, au sens de l'art. 50-1. [à vérifier par avocat] En pratique, Luna applique les deux séries d'obligations.
- **Art. 50-2 (contenus générés) :** si Luna génère des images, de l'audio (voix de synthèse d'un guide IA au téléphone) ou du texte synthétique, ces sorties doivent être marquées de façon lisible par machine. Cette obligation pèse sur le fournisseur du système génératif, mais Luna doit choisir un fournisseur conforme. [à vérifier]
- **Art. 5 (pratiques interdites, applicables depuis le 2 février 2025) :** sont interdites les techniques subliminales, manipulatrices ou trompeuses, ainsi que l'exploitation des vulnérabilités liées à l'âge, au handicap ou à la situation sociale ou économique, lorsqu'elles altèrent substantiellement le comportement et causent ou sont susceptibles de causer un préjudice important. D'où les consignes du §8.6.

### 10.2 Règles d'affichage (DOIT)

| Endroit | Guide IA | Guide humain |
|---|---|---|
| Carte et profil du guide | Badge **« IA »** permanent, en couleur contrastée, et mention « Guide virtuel : intelligence artificielle » sous le nom | Badge **« Guide humain »** et mention « Guide indépendant(e), vérifié(e) par Luna » |
| Nom et photo | Nom de persona autorisé (« Séléné »), mais **illustration non photoréaliste**, ou portrait généré accompagné de la mention « image générée par IA ». Pas de faux âge, de fausse biographie ni de faux diplômes | Photo réelle et nom d'exercice |
| Début de chaque séance (chat, téléphone ou visio) | Message système non supprimable : « **Vous échangez avec une intelligence artificielle**, et non avec une personne. Ses réponses sont générées automatiquement et peuvent être inexactes. Elles relèvent du divertissement et ne remplacent pas un professionnel. » | « Vous échangez avec [Nom], guide humain(e) indépendant(e). » |
| Téléphone avec voix de synthèse | Message vocal au décroché : « Vous êtes en relation avec une voix générée par intelligence artificielle. » | — |
| Pendant la séance | Rappel discret « IA » dans l'en-tête du chat | — |
| Question « tu es humain ? » | Réponse véridique obligatoire (test automatisé) | — |
| Avis | Avis sur une IA libellés « avis sur un guide IA » | — |
| Tarifs | Un prix IA distinct et lisible. Le **même tarif** qu'un humain présenté comme équivalent constituerait un risque de pratique trompeuse ; recommandé : tarif IA nettement inférieur ou forfait [décision d'Ozen] | — |
| Filtres de recherche | Filtre « Guides humains uniquement » / « Guides IA uniquement » | — |

**NE DOIT PAS :**
- faire passer un guide IA pour un humain, ou faire répondre une IA sous le profil d'un humain, même partiellement (par exemple une IA qui rédige les réponses d'un guide humain sans le signaler) ;
- utiliser une « hybridation » non signalée. Si un guide humain utilise un assistant IA pour rédiger, la mention « réponse assistée par IA » DOIT apparaître [recommandé ; à vérifier selon l'usage].

**Champs suggérés :** `guides.kind ENUM('human','ai')` (obligatoire, non nul) ; `sessions.guide_kind_snapshot` (figé au démarrage de la séance, comme preuve) ; `sessions.ai_disclosure_shown_at`.

---

## 11. Textes prêts à intégrer

> Tous ces textes sont des **projets** à faire valider par un avocat. Les [CROCHETS] sont à remplir par Ozen. Chaque texte porte un numéro de version et une date. Les anciennes versions restent consultables (`/legal/archives`).

### 11.1 Mentions légales

```markdown
# Mentions légales

Dernière mise à jour : [DATE] — version [X]

## Éditeur
Le site et l'application Luna (ci-après « Luna ») sont édités par :
[RAISON SOCIALE], [FORME JURIDIQUE] au capital de [MONTANT] €,
immatriculée au RCS de [VILLE] sous le numéro [SIREN],
dont le siège social est situé [ADRESSE COMPLÈTE].
N° de TVA intracommunautaire : [NUMÉRO TVA].
Téléphone : [NUMÉRO] — Email : [EMAIL DE CONTACT].

(Si l'éditeur est une personne physique : [Prénom NOM], entrepreneur individuel, [SIREN], [ADRESSE], [EMAIL].)

## Directeur de la publication
[Prénom NOM], en qualité de [FONCTION].

## Hébergement
[NOM DE L'HÉBERGEUR], [FORME], [ADRESSE], [TÉLÉPHONE].
(Prototype statique : GitHub Pages, service de GitHub, Inc., 88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis [adresse à vérifier].)

## Données personnelles
Responsable de traitement : [RAISON SOCIALE].
Délégué à la protection des données / contact : [NOM OU SERVICE], [EMAIL DPO], [ADRESSE POSTALE].
Voir notre [Politique de confidentialité](/confidentialite) et notre [Politique cookies](/cookies).

## Médiation de la consommation
Conformément aux articles L.612-1 et suivants du Code de la consommation, vous pouvez recourir gratuitement au médiateur de la consommation dont nous relevons : [NOM DU MÉDIATEUR], [ADRESSE], [SITE WEB], après avoir adressé une réclamation écrite à notre service client.
Plateforme européenne de règlement en ligne des litiges : [à vérifier : la plateforme RLL de la Commission a pu être supprimée ; ne pas mentionner si elle n'existe plus].

## Intelligence artificielle
Certains guides de Luna sont des intelligences artificielles. Ils sont signalés par le badge « IA ». Les autres sont des guides humains indépendants.

## Nature du service
Les consultations de voyance, d'astrologie, de numérologie et de tarot proposées sur Luna relèvent du divertissement et de la réflexion personnelle. Elles ne constituent ni une prédiction certaine de l'avenir, ni un conseil médical, psychologique, juridique ou financier. Service réservé aux personnes majeures.
En cas de détresse : 3114 (prévention du suicide, 24 h/24), 15 ou 112 en cas d'urgence.

## Propriété intellectuelle
L'ensemble des contenus de Luna (textes, illustrations, logos, logiciels) est protégé. Toute reproduction sans autorisation est interdite.
```

### 11.2 Conditions générales d'utilisation (clients)

```markdown
# Conditions générales d'utilisation (CGU)

Version [X] du [DATE]

## 1. Objet
Les présentes CGU régissent l'accès et l'utilisation de Luna, plateforme éditée par [RAISON SOCIALE] (« Luna », « nous »), qui met en relation des utilisateurs avec des guides de voyance et de guidance, humains indépendants ou intelligences artificielles, par chat, téléphone et visio. Les achats sont régis par les [Conditions générales de vente](/cgv).

## 2. Rôle de Luna (opérateur de plateforme)
Conformément à l'article L.111-7 du Code de la consommation :
- Luna est une plateforme en ligne. Les guides humains sont des professionnels indépendants : ils ne sont ni salariés ni mandataires de Luna. Ils exercent sous leur propre statut ([préciser si Luna est le vendeur des consultations ou un intermédiaire : à arbitrer avec l'avocat, car cela change les CGV]).
- Les guides IA sont fournis par Luna.
- **Classement des guides :** par défaut, les guides sont affichés selon [CRITÈRES : disponibilité, note moyenne, ancienneté, etc.]. [Aucune / Les] mises en avant rémunérées [n'existent pas / sont signalées par la mention « Sponsorisé »].
- Luna perçoit une commission sur chaque consultation d'un guide humain.
- Les avis sont publiés selon les règles de l'article 9.

## 3. Conditions d'accès
3.1 Luna est **réservé aux personnes majeures** (18 ans et plus). En créant un compte, vous déclarez être majeur(e). Tout compte ouvert par un mineur est fermé.
3.2 Un seul compte par personne. Vous êtes responsable de la confidentialité de vos identifiants.
3.3 Les informations fournies doivent être exactes.

## 4. Nature du service : à lire attentivement
4.1 Les consultations relèvent du **divertissement et de la réflexion personnelle**. Aucun guide, humain ou IA, ne peut prédire l'avenir avec certitude, et Luna ne garantit **aucun résultat** (retour d'une personne, guérison, réussite, gain).
4.2 Les consultations **ne remplacent pas** un médecin, un psychologue, un avocat, un notaire ou un conseiller financier. N'interrompez jamais un traitement et ne prenez aucune décision importante sur la seule base d'une consultation.
4.3 Luna **n'est pas un service d'urgence**. En cas de détresse ou de pensées suicidaires : **3114** (gratuit, 24 h/24). En cas de danger immédiat : **15** ou **112**.
4.4 **Guides IA.** Les guides marqués « IA » sont des programmes d'intelligence artificielle. Leurs réponses sont générées automatiquement, peuvent être inexactes et ne proviennent pas d'une personne.

## 5. Protection de l'utilisateur
5.1 Vous pouvez fixer des **plafonds de dépense** quotidiens et mensuels. Ils sont activés par défaut à [50] € par jour et [150] € par mois. Une baisse s'applique immédiatement ; une hausse ne prend effet qu'au bout de 72 heures.
5.2 Des alertes de durée s'affichent pendant les séances, et une confirmation vous est demandée après [30] minutes.
5.3 Vous pouvez à tout moment **faire une pause** (auto-exclusion) de 7 jours à définitivement.
5.4 Si des propos laissent penser que vous êtes en danger, la facturation de la séance est suspendue et des numéros d'aide vous sont proposés.

## 6. Règles de conduite
Il est interdit :
- de harceler, menacer ou insulter un guide ou un autre utilisateur ;
- d'échanger des coordonnées personnelles ou de proposer un paiement en dehors de Luna (les coordonnées sont masquées automatiquement) ;
- d'enregistrer ou de diffuser une séance sans l'accord de l'autre personne ;
- de publier de faux avis ;
- d'utiliser Luna à des fins illégales ou de tenter d'en compromettre la sécurité.

## 7. Signalements et modération
Vous pouvez signaler un contenu ou un comportement via le bouton « Signaler ». Luna examine les signalements et peut retirer un contenu, suspendre un guide ou un compte, en motivant sa décision et en indiquant les voies de contestation [à vérifier : obligations applicables au titre du règlement (UE) 2022/2065, dit DSA].

## 8. Données personnelles
Le traitement de vos données, y compris des **données sensibles** que vous pourriez confier pendant une consultation, est décrit dans la [Politique de confidentialité](/confidentialite). Aucune consultation ne démarre sans votre accord explicite pour ces données.

## 9. Avis
Seuls les utilisateurs ayant réalisé une consultation payante avec un guide peuvent publier un avis sur ce guide, dans les [30] jours qui suivent. Les avis sont datés. Ils sont [contrôlés a priori / a posteriori] par notre équipe de modération, selon la procédure suivante : [DESCRIPTION]. Un avis peut être refusé s'il est injurieux, hors sujet, contient des données personnelles ou n'est pas lié à une consultation réelle ; son auteur en est informé avec le motif. Les avis ne sont pas rémunérés. Les guides peuvent y répondre. (Art. L.111-7-2 et D.111-16 et suivants du Code de la consommation [à vérifier : références réglementaires].)

## 10. Responsabilité
Luna met en œuvre les moyens raisonnables pour assurer l'accès au service, sans garantir une disponibilité permanente. Luna ne saurait être tenue responsable des décisions que vous prendriez sur la base d'une consultation (art. 4). Rien dans les présentes CGU ne limite les droits que vous tenez du Code de la consommation.

## 11. Suspension et fermeture du compte
Vous pouvez fermer votre compte à tout moment depuis Mon compte. Le solde non utilisé de votre portefeuille vous est remboursé selon les CGV. Luna peut suspendre ou fermer un compte en cas de manquement grave aux CGU, après information motivée, sauf urgence.

## 12. Modification des CGU
Luna peut modifier les CGU. Toute modification substantielle vous est notifiée au moins [30] jours à l'avance, et vous pouvez fermer votre compte sans frais si vous la refusez.

## 13. Droit applicable et litiges
Les CGU sont soumises au droit français. En cas de litige, adressez d'abord une réclamation à [EMAIL SERVICE CLIENT]. À défaut de solution, vous pouvez saisir gratuitement le médiateur de la consommation : [NOM, ADRESSE, SITE]. Vous pouvez aussi saisir la juridiction compétente selon les règles de droit commun.
```

### 11.3 Conditions générales de vente (clients)

```markdown
# Conditions générales de vente (CGV)

Version [X] du [DATE]

## 1. Vendeur
[RAISON SOCIALE], [ADRESSE], [SIREN], [TVA], [EMAIL], [TÉLÉPHONE].
[À arbitrer avec l'avocat : Luna vend les consultations en son nom (y compris celles des guides humains), ou agit comme intermédiaire. Le présent modèle suppose que Luna vend en son nom, ce qui est plus simple pour le consommateur.]

## 2. Services et prix
2.1 Luna propose des consultations par chat, téléphone et visio, avec des guides humains ou IA, facturées **à la minute**, ainsi qu'un abonnement **Luna+**.
2.2 **Les prix sont indiqués en euros TTC** sur le profil de chaque guide et rappelés avant chaque séance :
- guides humains : de [X] € à [Y] € TTC par minute, selon le guide ;
- guides IA : [Z] € TTC par minute [ou forfait] ;
- Luna+ : [PRIX] € TTC par [mois], avec [AVANTAGES].
2.3 Offre de bienvenue : [N] minutes offertes lors de la première séance [conditions]. Aucune carte n'est débitée pendant les minutes offertes. À la fin de celles-ci, la séance s'arrête et ne devient payante que si vous le confirmez expressément.

## 3. Portefeuille prépayé (crédit Luna)
3.1 Les consultations sont payées à partir d'un **portefeuille prépayé** alimenté par carte bancaire via notre prestataire de paiement Stripe. Luna ne conserve aucune donnée de carte.
3.2 Recharges possibles : de [10] € à [100] € par opération, dans la limite de vos plafonds (art. 5 des CGU).
3.3 Le crédit est utilisable uniquement sur Luna. Il **n'expire pas** tant que votre compte est ouvert [ou : expire au bout de N mois, à valider avec l'avocat].
3.4 **Remboursement du solde :** vous pouvez à tout moment demander le remboursement du solde non utilisé issu de vos recharges, sans frais, depuis Mon compte > Portefeuille. Le remboursement est effectué sur le moyen de paiement d'origine sous [14] jours. Les crédits offerts (bienvenue, parrainage, geste commercial) ne sont pas remboursables en argent.
3.5 À la fermeture de votre compte, le solde issu de vos recharges vous est remboursé automatiquement.

## 4. Facturation à la minute
4.1 La séance démarre lorsque vous cliquez sur « Démarrer » et que le guide a rejoint la séance. Elle est décomptée **à la seconde** [ou par minute entamée : à préciser ; la seconde est plus loyale].
4.2 Le compteur de durée et de montant est affiché en permanence.
4.3 La séance s'arrête automatiquement lorsque votre crédit est épuisé ou que votre plafond est atteint, avec un préavis de 2 minutes.
4.4 Vous ne payez pas les interruptions techniques imputables à Luna, ni les minutes qui suivent un signalement de détresse (art. 5.4 des CGU).
4.5 Une facture récapitulative est disponible dans Mon compte après chaque séance.

## 5. Abonnement Luna+
5.1 Durée : [mensuelle], reconduite tacitement.
5.2 **Résiliation en trois clics :** vous pouvez résilier à tout moment depuis Mon compte > Abonnement > « Résilier mon abonnement », par une fonctionnalité gratuite, directe et accessible en permanence (art. L.215-1-1 C. conso). Vous recevez une confirmation de la résiliation, avec la date de fin et ses effets.
5.3 La résiliation prend effet à la fin de la période en cours [à valider].
5.4 Rappel de reconduction : [si l'abonnement est annuel, information au plus tôt 3 mois et au plus tard 1 mois avant la date limite de non-reconduction, conformément à l'art. L.215-1 C. conso].

## 6. Droit de rétractation
6.1 Vous disposez d'un délai de **14 jours** à compter de l'achat (recharge ou abonnement) pour vous rétracter sans donner de motif (art. L.221-18 C. conso), en utilisant le formulaire de Mon compte ou le modèle ci-dessous.
6.2 **Exécution immédiate :** si vous avez demandé expressément à utiliser votre crédit sans attendre la fin du délai, et reconnu perdre votre droit de rétractation pour les consultations entièrement réalisées, ces consultations ne peuvent plus faire l'objet d'une rétractation (art. L.221-28, 1° C. conso). Le **crédit non utilisé** reste remboursé en cas de rétractation dans le délai.
6.3 Pour l'abonnement commencé à votre demande pendant le délai, une rétractation donne lieu au paiement de la part correspondant au service fourni jusqu'à la rétractation (art. L.221-25 C. conso).
6.4 Remboursement sous 14 jours au plus, par le moyen de paiement d'origine.

Modèle de formulaire de rétractation :
« À l'attention de [RAISON SOCIALE], [ADRESSE], [EMAIL] : Je vous notifie par la présente ma rétractation du contrat portant sur [recharge / abonnement] commandé le [DATE]. Nom : … Email du compte : … Date : … »

## 7. Réclamations
Service client : [EMAIL], [FORMULAIRE], réponse sous [5] jours ouvrés. Une séance contestée (problème technique, comportement contraire à la charte) peut donner lieu à un recrédit, après examen.

## 8. Médiation
Après une réclamation écrite restée sans réponse satisfaisante, vous pouvez saisir gratuitement le médiateur de la consommation : [NOM], [ADRESSE], [SITE], dans un délai d'un an à compter de votre réclamation écrite (art. L.612-1 et suivants, et L.612-2 C. conso).

## 9. Garanties légales
Les services numériques fournis sont soumis à la garantie légale de conformité des articles L.224-25-1 et suivants du Code de la consommation [à vérifier : applicabilité aux consultations humaines].

## 10. Droit applicable
Droit français.
```

### 11.4 Conditions guides (guides humains indépendants)

```markdown
# Conditions générales des guides Luna

Version [X] du [DATE]

## 1. Objet et statut
1.1 Les présentes conditions régissent la collaboration entre [RAISON SOCIALE] (« Luna ») et toute personne proposant des consultations sur Luna (le « Guide »).
1.2 Le Guide exerce en **professionnel indépendant** ([micro-entrepreneur, société, etc.]). Il dispose d'un numéro SIRET valide (ou d'un équivalent dans un autre État de l'UE ou de l'EEE), et il est seul responsable de ses déclarations sociales et fiscales. Aucun lien de subordination n'existe : le Guide choisit librement ses horaires, ses disponibilités, son tarif (dans la fourchette [X]–[Y] € par minute) et ses méthodes, dans le respect de la charte.
1.3 Le Guide doit être établi dans l'Union européenne ou l'EEE [recommandé ; sinon, encadrement des transferts].

## 2. Inscription et vérification
Identité, majorité, statut professionnel et compte de versement sont vérifiés par Luna et par Stripe (Stripe Connect). Luna peut refuser une candidature sans avoir à se justifier, sans discrimination.

## 3. Rémunération et commission
3.1 Pour chaque minute facturée au client, le Guide perçoit **[PART GUIDE] %** du prix TTC [ou HT, à préciser], Luna conservant une **commission de [COMMISSION] %** au titre de la mise en relation, de la technologie, du paiement et du support.
3.2 Les versements sont effectués via **Stripe Connect** sur le compte bancaire du Guide, selon un rythme [hebdomadaire / mensuel], déduction faite des remboursements accordés aux clients pour des séances contestées à juste titre.
3.3 Le Guide accepte les conditions de Stripe Connect (accord de compte connecté Stripe). Stripe effectue les vérifications d'identité requises par la réglementation sur la lutte contre le blanchiment.
3.4 **Obligations fiscales :** conformément à l'article 242 bis du Code général des impôts, Luna adresse chaque année au Guide un récapitulatif des sommes perçues et les déclare à l'administration fiscale lorsque la loi l'exige [à vérifier par expert-comptable : obligations DAC7 et seuils].

## 4. Charte déontologique (obligatoire)
Le Guide s'engage à :
1. ne jamais promettre de résultat ni prédire un événement grave (maladie, décès, accident) ;
2. ne jamais donner de conseil médical, psychologique, juridique ou financier, ni déconseiller un traitement ;
3. ne jamais prolonger artificiellement une séance, ni inciter à recharger, revenir ou consulter plus souvent ;
4. ne jamais évoquer de malédiction, de mauvais sort ou de rituel payant ;
5. ne jamais solliciter de coordonnées, de paiement hors de Luna, de rencontre, de cadeau ou de photos ;
6. ne jamais enregistrer, copier, photographier ou réutiliser les échanges, et ne tenir aucun fichier sur les clients ;
7. en cas de détresse, d'idées suicidaires ou de danger : arrêter la consultation divinatoire, orienter vers le 3114, et appeler le 15 ou le 112 en cas de danger immédiat, en utilisant le bouton « Signaler une urgence » ;
8. mettre fin à la séance en cas de doute sur la majorité du client ou sur sa capacité à consentir ;
9. respecter la confidentialité absolue, y compris après la fin de la collaboration ;
10. respecter les règles de présentation : nom d'exercice, photo réelle, aucune fausse qualification.

## 5. Données personnelles
5.1 Le Guide accède aux données des clients **uniquement pour réaliser les consultations**, sous l'autorité de Luna et selon ses instructions (art. 29 RGPD). Il ne voit ni l'email ni le numéro de téléphone des clients. Il s'interdit toute autre utilisation, copie ou conservation.
5.2 Le Guide utilise un appareil sécurisé (verrouillage, mises à jour) et active la double authentification.
5.3 **Données du Guide :** Luna traite les données du Guide pour gérer la collaboration, les paiements, les obligations fiscales et la qualité du service. Voir la [Politique de confidentialité](/confidentialite), section « Guides ».
5.4 **Enregistrements :** les appels ne sont pas enregistrés par défaut. Un échantillon aléatoire limité peut l'être pour le contrôle qualité, après l'accord du client. Le Guide en est informé par un bandeau pendant l'appel. Les enregistrements sont effacés au bout de 30 jours. Le Guide peut accéder aux enregistrements le concernant et à leur évaluation.
5.5 Toute violation de données constatée par le Guide (perte d'appareil, accès suspect) est signalée à Luna **sans délai**.

## 6. Qualité, avis et sanctions
Luna peut suspendre ou désactiver un Guide en cas de manquement à la charte, après information motivée et possibilité de présenter ses observations, sauf urgence (danger pour un client, fraude). Les décisions sont journalisées.

## 7. Guides IA
Luna exploite également des guides IA, clairement identifiés comme tels. Le Guide humain s'interdit de faire rédiger ses réponses par une IA sans le signaler au client.

## 8. Durée et résiliation
Durée indéterminée. Chaque partie peut résilier avec un préavis de [15] jours, ou immédiatement en cas de manquement grave. Les sommes dues sont versées au plus tard [30] jours après la résiliation.

## 9. Droit applicable
Droit français. Tribunaux de [VILLE], sous réserve des règles impératives.
```

### 11.5 Politique de confidentialité

```markdown
# Politique de confidentialité de Luna

Version [X] du [DATE]

Nous savons que vous confiez à Luna des choses intimes. Cette politique explique, simplement, ce que nous faisons de vos données et comment garder la main dessus.

## 1. Qui est responsable de vos données ?
[RAISON SOCIALE], [ADRESSE], [SIREN] (« Luna »).
Contact données personnelles / délégué à la protection des données : [NOM OU SERVICE], [EMAIL DPO], [ADRESSE POSTALE].

## 2. Quelles données, pourquoi, sur quelle base, et combien de temps ?

| Ce que nous faisons | Données | Base légale | Durée |
|---|---|---|---|
| Gérer votre compte | Email, pseudonyme, mot de passe (chiffré), date de naissance, téléphone si vous le donnez | Exécution du contrat | Tant que le compte est actif ; suppression 24 mois après votre dernière activité |
| Réaliser vos consultations (chat, téléphone, visio) et vous montrer votre historique | Contenu de vos messages, durée, guide consulté ; **données sensibles** que vous choisissez de partager | Contrat ; **votre consentement explicite** pour les données sensibles | Contenu des chats : 12 mois, ou moins si vous le supprimez ; appels et visios : non enregistrés |
| Mettre en relation par téléphone sans révéler votre numéro | Numéro masqué, horodatage et durée de l'appel | Contrat | 12 mois |
| Contrôler la qualité (seulement si vous acceptez en début d'appel) | Enregistrement de l'appel | Votre consentement | 30 jours |
| Encaisser vos paiements, gérer votre portefeuille, vous rembourser | Transactions, solde, factures (jamais votre numéro de carte, géré par Stripe) | Contrat ; obligation légale (comptabilité) | 10 ans pour les pièces comptables (art. L.123-22 du Code de commerce) |
| Vous protéger : plafonds, alertes de durée, détection de détresse | Montants, durées, signal de détresse (sans copie du message) | Obligation de loyauté et intérêt légitime ; votre consentement explicite ; vos intérêts vitaux en cas de danger | Signal de détresse : 30 jours |
| Répondre à vos demandes au support | Messages, pièces jointes | Contrat ; intérêt légitime | 24 mois après la clôture |
| Modérer les avis et lutter contre les abus | Avis, signalements | Obligation légale ; intérêt légitime | Avis : 3 ans au plus |
| Vous envoyer nos offres (email, SMS, WhatsApp, notifications, téléphone) | Coordonnées, historique d'envoi | **Votre consentement**, canal par canal | Jusqu'au retrait ; prospects : 3 ans après le dernier contact ; téléphone : 12 mois au plus |
| Parrainage | Lien entre parrain et filleul | Contrat | Durée du programme |
| Améliorer nos guides IA (seulement si vous l'acceptez) | Conversations avec les guides IA, après retrait des identifiants directs | **Votre consentement, refusé par défaut** | 24 mois |
| Mesurer l'audience et, si vous l'acceptez, la publicité | Cookies et traceurs | Consentement, sauf traceurs exemptés | Voir la [Politique cookies](/cookies) |
| Sécuriser le service | Journaux de connexion et d'accès | Intérêt légitime ; obligation de sécurité | 12 mois (jusqu'à 3 ans pour certains journaux d'accès sensibles) |
| Respecter vos droits | Votre demande et notre réponse | Obligation légale | 5 ans |

## 3. Vos données sensibles
Pendant une consultation, vous pouvez parler de votre santé, de votre vie ou orientation sexuelle, ou de vos convictions. Ce sont des données sensibles (art. 9 RGPD). Nous ne les traitons **qu'avec votre accord explicite**, donné avant votre première consultation, et **uniquement** pour réaliser vos consultations et conserver votre historique. Nous ne les utilisons **jamais** pour la publicité, la prospection ou le profilage, et nous ne les vendons jamais. Vous pouvez retirer votre accord à tout moment dans Mon compte > Confidentialité.

## 4. Guides IA et guides humains
- Les **guides IA** sont des programmes signalés par le badge « IA ». Vos messages sont envoyés à notre prestataire d'IA, [NOM, PAYS], uniquement pour générer les réponses. Il lui est contractuellement interdit de les conserver au-delà de [0 / X jours] et de les utiliser pour entraîner ses modèles.
- Les **guides humains** sont des indépendants. Ils voient vos messages avec eux et votre pseudonyme, **jamais** votre email ni votre numéro de téléphone. Ils n'ont pas le droit de conserver ni de réutiliser vos échanges.

## 5. Qui a accès à vos données ?
- Le guide que vous consultez, pour vos échanges avec lui.
- Notre équipe, selon ses missions, et uniquement pour ce qui est nécessaire. Notre support ne peut lire une conversation que pour traiter une demande que vous avez faite ou un signalement, et chaque accès est enregistré et vous est signalé.
- Nos sous-traitants : hébergement ([NOM, PAYS]), téléphonie et SMS (Twilio, États-Unis), paiement (Stripe), IA ([NOM, PAYS]), envoi d'emails ([NOM]), WhatsApp (Meta), notifications (Google, Apple), visio ([NOM]), support ([NOM]). Liste à jour : [/sous-traitants](/sous-traitants).
- Stripe traite aussi certaines données pour son propre compte (lutte contre la fraude et le blanchiment) : voir sa politique de confidentialité.
- Les autorités, uniquement sur demande légale.
Nous ne vendons ni ne louons vos données, et nous ne les partageons avec aucun « partenaire » commercial.

## 6. Transferts hors de l'Union européenne
Certains sous-traitants (Twilio, [fournisseur d'IA], Google, Apple, Meta) peuvent traiter des données aux États-Unis. Ces transferts sont encadrés par le Data Privacy Framework UE–États-Unis, lorsque l'entreprise est certifiée, ou par les clauses contractuelles types de la Commission européenne. Vous pouvez en obtenir une copie à [EMAIL DPO].

## 7. Vos droits
Vous pouvez à tout moment :
- **accéder** à vos données et les **télécharger** (Mon compte > Mes données > Télécharger) ;
- les **rectifier** ;
- les **effacer** (Mon compte > Supprimer mon compte), sauf ce que la loi nous oblige à garder, comme les factures ;
- vous **opposer** à la prospection (lien de désinscription dans chaque message) ou à certains traitements ;
- **limiter** un traitement ;
- **retirer** chaque consentement ;
- définir des **directives** sur le sort de vos données après votre décès.
Pour exercer vos droits : Mon compte, ou [EMAIL DPO]. Nous répondons sous un mois. Nous pouvons vous demander de confirmer votre identité en cas de doute.
Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la **CNIL** (www.cnil.fr).

## 8. Sécurité
Connexions chiffrées, chiffrement des conversations au repos, double authentification obligatoire pour notre équipe, accès limités et tracés, aucune donnée de carte bancaire chez nous (Stripe, certifié PCI DSS). En cas de violation de données présentant un risque, nous prévenons la CNIL sous 72 heures et, si le risque est élevé, nous vous prévenons.

## 9. Mineurs
Luna est réservé aux personnes majeures. Si nous apprenons qu'un compte appartient à un mineur, nous le fermons et supprimons ses données.

## 10. Guides : vos données
Si vous êtes guide, nous traitons votre identité, votre statut professionnel, vos disponibilités, vos gains, vos avis et votre activité, pour gérer notre collaboration (contrat), vous payer via Stripe Connect, respecter nos obligations comptables et fiscales (obligation légale) et contrôler la qualité (intérêt légitime ; enregistrements seulement par échantillon et avec l'accord du client). Durées : pendant la collaboration, puis 5 ans (10 ans pour les pièces comptables). Candidature non retenue : 2 ans, sauf opposition de votre part.

## 11. Modifications
Toute modification importante vous est notifiée. Les versions précédentes restent consultables : [/legal/archives](/legal/archives).
```

### 11.6 Politique cookies et bandeau

**Règles (DOIT) — lignes directrices et recommandation CNIL de 2020 (délibérations n° 2020-091 et n° 2020-092 du 17 septembre 2020) :**
- Aucun traceur soumis à consentement n'est déposé avant le choix de l'utilisateur.
- Les boutons **« Tout accepter »** et **« Tout refuser »** sont au **même niveau**, avec le même format et la même visibilité, sur le premier écran.
- Un lien « Personnaliser » propose un réglage par finalité.
- Fermer le bandeau (croix) vaut refus.
- Le choix, accord ou refus, est conservé **6 mois**, puis redemandé (recommandé).
- Un lien « Gérer mes cookies » permanent en pied de page permet de retirer le consentement aussi facilement qu'il a été donné.
- Les traceurs de mesure d'audience **exemptés** de consentement doivent respecter les conditions de la CNIL : finalité strictement limitée à la mesure, données non recoupées, durée de vie limitée à **13 mois** sans prolongation automatique, et information de l'utilisateur.
- Pas de **pixels publicitaires** (Meta, Google Ads, TikTok) sur les pages de consultation, de paiement ou de compte, même avec consentement (recommandé : risque de révéler une donnée sensible, à savoir la consultation d'un service de voyance sur un thème donné).
- *Obligatoire (texte) : art. 82 de la loi Informatique et Libertés, transposant l'art. 5-3 de la directive ePrivacy.*

**Texte du bandeau :**
```
🍪 Luna et vos cookies

Nous utilisons des cookies nécessaires au fonctionnement du site (connexion, sécurité, paiement).
Avec votre accord, nous utilisons aussi des cookies pour mesurer l'audience de manière plus détaillée
[et pour mesurer l'efficacité de nos publicités]. Vous pouvez changer d'avis à tout moment
via « Gérer mes cookies » en bas de chaque page.

[ Tout refuser ]   [ Tout accepter ]
          Personnaliser
```
(Les deux boutons ont la même taille, la même couleur et le même contraste.)

**Écran « Personnaliser » :**
| Catégorie | Défaut | Description |
|---|---|---|
| Nécessaires | Toujours actifs | Connexion, sécurité, panier et paiement, mémorisation de votre choix de cookies |
| Mesure d'audience exemptée | Actifs (exemption CNIL), avec lien d'opposition | Statistiques anonymes de fréquentation [OUTIL] |
| Mesure d'audience avancée | Désactivée | [OUTIL] : parcours détaillés |
| Publicité | Désactivée | [OUTILS] : mesure de nos campagnes, **jamais sur les pages de consultation** |
| Réseaux sociaux | Désactivés | Boutons de partage |

**Politique cookies (page `/cookies`) :**
```markdown
# Politique cookies

Un cookie est un petit fichier déposé sur votre appareil. Certains sont indispensables, d'autres ne sont déposés qu'avec votre accord.

## Cookies que nous utilisons
| Nom | Émetteur | Finalité | Durée | Consentement |
|---|---|---|---|---|
| luna_session | Luna | Maintenir votre connexion | Session | Non (nécessaire) |
| luna_csrf | Luna | Sécurité des formulaires | Session | Non (nécessaire) |
| luna_consent | Luna | Mémoriser votre choix de cookies | 6 mois | Non (nécessaire) |
| __stripe_mid, __stripe_sid | Stripe | Paiement sécurisé et prévention de la fraude | [à vérifier] | Non (nécessaire au paiement) |
| [audience] | [OUTIL] | Mesure d'audience exemptée | 13 mois au plus | Non (exemption CNIL), opposition possible |
| [audience avancée] | [OUTIL] | Statistiques détaillées | [DURÉE] | Oui |
| [publicité] | [OUTIL] | Mesure publicitaire | [DURÉE] | Oui |

## Gérer vos choix
Cliquez sur « Gérer mes cookies » en bas de chaque page. Votre choix est conservé 6 mois.
Vous pouvez aussi configurer votre navigateur pour bloquer les cookies.

## Notifications push de l'application
Les notifications commerciales ne sont envoyées qu'avec votre accord (Mon compte > Notifications) et l'autorisation de votre téléphone.
```

---

## 12. Checklist de conformité pré-lancement

### 12.1 Bloquants (le lancement public NE DOIT PAS avoir lieu sans eux)

| # | Point | Statut | Réf. |
|---|---|---|---|
| B1 | Éditeur identifié (raison sociale, SIREN, adresse, directeur de la publication) et mentions légales complètes | Obligatoire | §11.1 |
| B2 | AIPD réalisée et validée ; consultation de la CNIL si un risque résiduel élevé subsiste | Obligatoire | §1.5 |
| B3 | Registre des traitements rédigé | Obligatoire | §1.2 |
| B4 | DPA signés avec chaque sous-traitant ; transferts encadrés | Obligatoire | §1.3, 1.4 |
| B5 | Écran bloquant de consentement explicite art. 9 avant la première séance, avec preuve stockée | Obligatoire | §2.4 C4 |
| B6 | Aucun enregistrement systématique des appels ; visio jamais enregistrée ; enregistrement qualité seulement sur échantillon et avec consentement | Obligatoire | §2.4 C5, C6 |
| B7 | Formulaires de compatibilité sans genre du partenaire | Obligatoire | L2 |
| B8 | Purge automatique opérationnelle et testée (tâche `retention:purge`, rapports) | Obligatoire | §3 |
| B9 | Consentements de prospection séparés par canal, non pré-cochés, au seul nom de Luna ; désinscription en un clic | Obligatoire | §2.4, §7 |
| B10 | Bandeau cookies avec « Tout refuser » au même niveau ; aucun traceur avant le choix | Obligatoire | §11.6 |
| B11 | Badge IA, message d'ouverture IA et réponse véridique à « es-tu humain ? » (tests passants) | Obligatoire | §10 |
| B12 | Prix TTC à la minute affiché avant chaque séance ; compteur en direct | Obligatoire | §8.3, 8.10 |
| B13 | Case CGV et case de demande d'exécution immédiate (rétractation), séparées ; email de confirmation | Obligatoire | §2.4 C3, C15 |
| B14 | Résiliation de Luna+ en 3 clics | Obligatoire | §11.3 art. 5 |
| B15 | Médiateur de la consommation désigné et mentionné | Obligatoire | §11.1, 11.3 |
| B16 | Stripe Elements ou Checkout ; aucune donnée de carte stockée | Obligatoire | §9 |
| B17 | MFA back-office ; RBAC ; masquage des coordonnées ; accès du support aux conversations seulement sur ticket et journalisé | Obligatoire (sécurité, minimisation) | §4, §9 |
| B18 | Export et suppression de compte fonctionnels, avec cascade vers les sous-traitants | Obligatoire | §6 |
| B19 | Procédure de violation de données sous 72 h prête (modèles, responsable désigné) | Obligatoire | §9.1 |
| B20 | Aucun faux avis ; avis réservés aux clients ayant consulté, datés, méthode de contrôle publiée | Obligatoire | §8.10, §11.2 art. 9 |
| B21 | Interdiction des promesses de résultat (CGU, charte, prompts IA, filtre de sortie, contenus marketing) | Obligatoire | §8.6, 8.8 |
| B22 | Déclaration 18+ ; fermeture des comptes de mineurs | Obligatoire | §2.4 C1, §8.9 |
| B23 | Détection de détresse avec renvoi vers le 3114, le 15 et le 112, et pause de la facturation | Recommandé, mais à traiter comme bloquant | §8.5 |
| B24 | Plafonds de dépense par défaut, confirmation de session, auto-exclusion | Recommandé, mais à traiter comme bloquant | §8.1 à 8.7 |
| B25 | Validation de l'ensemble par un avocat et/ou un DPO | Recommandé, mais indispensable | Avertissement |

### 12.2 Avant la montée en charge (recommandé)

- Désignation d'un DPO.
- Test d'intrusion.
- Revue trimestrielle des accès.
- Formation des modérateurs et du support (données sensibles, détresse).
- Audit des guides, avec écoute d'échantillons conforme à C5.
- Analyse DSA : statut de plateforme, traçabilité des professionnels, notice and action [à vérifier].
- Analyse de requalification des guides en salariés [à vérifier par avocat].
- Vérification des obligations LCB-FT liées au portefeuille.

### 12.3 Portefeuille et LCB-FT : point d'attention

- Un portefeuille de crédit **utilisable uniquement sur Luna, pour les services de Luna**, n'est en principe ni de la monnaie électronique ni un service de paiement, grâce à l'exclusion dite de « réseau limité » (art. L.521-3 et L.525-4 du Code monétaire et financier). [à vérifier par avocat]
- En revanche, le fait d'**encaisser des fonds pour le compte des guides** et de les leur reverser peut constituer un service de paiement. La solution la plus sûre consiste à faire porter les flux par **Stripe Connect**, établissement réglementé qui assure le KYC et les obligations LCB-FT (art. L.561-2 CMF). Luna ne doit pas détenir elle-même les fonds des guides. [à vérifier par avocat : schéma Connect choisi, charges directes ou destination charges]
- Les crédits non remboursables (bonus) ne doivent pas pouvoir être retirés en argent.

### 12.4 À fournir ou valider par Ozen

| # | Information ou décision | Utilisée dans |
|---|---|---|
| O1 | **Entité éditrice** : société (raison sociale, forme, capital, RCS, SIREN, TVA, siège) ou Ozen en nom propre | Mentions, CGU, CGV, confidentialité |
| O2 | **Directeur de la publication** | Mentions légales |
| O3 | **Contact données personnelles / DPO** (nom ou service, email, adresse) ; décision de désigner un DPO | Toutes les politiques |
| O4 | **Hébergeur de la v2** (nom, adresse, région UE ?) | Mentions, registre, AIPD |
| O5 | **Fournisseur d'IA** (nom, pays, option zéro-rétention, région) | C4, C7, confidentialité |
| O6 | Fournisseurs emailing, SMS, visio, support, analytics | Liste des sous-traitants |
| O7 | **Médiateur de la consommation** (adhésion à faire) | Mentions, CGV |
| O8 | **Tarifs** : fourchette guides humains, tarif IA, Luna+, minutes offertes | CGV, affichage |
| O9 | **Commission** de Luna et part des guides ; rythme des versements | Conditions guides |
| O10 | Modèle juridique : Luna vend les consultations **ou** intermédiaire | CGU, CGV, facturation, TVA |
| O11 | **Valeurs par défaut** des plafonds (proposé : 50 € par jour, 150 € par mois) et des durées de session | §8, CGU |
| O12 | Durée de conservation des chats (proposé : 12 mois) | C4, §3, confidentialité |
| O13 | Activation ou non de l'échantillonnage qualité des appels (et taux) | C5 |
| O14 | Utilisation ou non de l'exception « produits analogues » (recommandé : non) et du démarchage téléphonique (recommandé : non) | §7 |
| O15 | Montants du parrainage | C13 |
| O16 | Guides humains hors UE autorisés ou non | §1.4 |
| O17 | Choix du crédit différé ou de la case obligatoire pour l'exécution immédiate | C15 |
| O18 | Désignation d'un avocat ou d'un DPO pour valider ce document | Avertissement |

---

## Annexe A. Sources consultées (10 novembre 2026)

**Sanctions et contentieux**
- CNIL, communiqué « Voyance en ligne : sanctions de 250 000 et 150 000 euros à l'encontre des sociétés COSMOSPACE et TELEMAQUE » : https://www.cnil.fr/fr/voyance-en-ligne-sanctions-de-250-000-et-150-000-euros-cosmospace-telemaque
- Délibération SAN-2024-015 (Télémaque), Légifrance : https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000050324681 ; texte intégral : https://justice.pappers.fr/decision/27bfff8e269960aa59d4061f0f6b0bc6ce5bd6db
- Délibération SAN-2024-014 (Cosmospace), Légifrance : https://www.legifrance.gouv.fr/cnil/id/CNILTEXT000050324625 [identifiant à vérifier] ; texte intégral : https://armingaud-avocat.fr/SiteMap/2-Case-Law/Sanctions-CNIL/CNIL---D%C3%A9lib%C3%A9ration-de-la-formation-restreinte-n%C2%B0SAN-2024-014-du-26-septembre-2024-concernant-la-soci%C3%A9t%C3%A9-COSMOSPACE
- CEPD (EDPB), fiche guichet unique : https://www.edpb.europa.eu/news/the-french-sa-fines-cosmospace-eur-250000-and-telemaque-eur-150000_en
- Conseil d'État, 16 octobre 2026, n° 499596 (Cosmospace, rejet) : https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2026-10-16/499596
- Conseil d'État, 16 octobre 2026, n° 499597 (Télémaque, rejet) : https://www.conseil-etat.fr/fr/arianeweb/CE/decision/2026-10-16/499597

**Référentiels et recommandations CNIL**
- Référentiel gestion des activités commerciales (délibération n° 2021-131 du 23 septembre 2021) : https://www.cnil.fr/sites/default/files/atoms/files/referentiel_traitements-donnees-caractere-personnel_gestion-activites-commerciales.pdf ; questions-réponses : https://cnil.fr/fr/questions-reponses-sur-les-referentiels-relatifs-la-gestion-des-activites-commerciales-et-des
- Recommandation cookies (délibération n° 2020-092), version consolidée : https://www.cnil.fr/sites/default/files/2026-01/recommandation_cookies_consolidee.pdf
- Prospection par courrier électronique, SMS et automate d'appel : https://cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique-sms-mms-et-automate-dappel
- Prospection par téléphone (règles depuis le 11 août 2026) : https://www.cnil.fr/fr/prospection-commerciale-par-telephone-hors-automate-dappel-quelles-sont-les-regles
- Écoute et enregistrement des appels sur le lieu de travail : https://www.cnil.fr/fr/lecoute-et-lenregistrement-des-appels-sur-le-lieu-de-travail
- Recommandation journalisation : https://www.cnil.fr/fr/la-cnil-publie-une-recommandation-relative-aux-mesures-de-journalisation

**Consommation et démarchage**
- Service-Public.fr, « Démarchage téléphonique interdit : quelles sont les nouvelles règles ? » (fin de Bloctel le 11 août 2026) : https://www.service-public.gouv.fr/particuliers/actualites/A19003
- Conso.gouv.fr (décret n° 2026-662, 4 appels sur 30 jours) : https://www.conso.gouv.fr/conseils-dorientation/demarchage-tel-abusif/
- Art. L.223-1 C. conso, version en vigueur depuis le 11 août 2026 (loi n° 2025-594 du 30 juin 2025, art. 13) : https://droit.jurisfac.org/sources/legi/LEGIARTI000051830285/article-l223-1/ [vérifier sur Légifrance]
- Résiliation en trois clics, art. L.215-1-1 (en vigueur depuis le 1er juin 2023 ; décret n° 2023-417 du 31 mai 2023) : https://entreprendre.service-public.gouv.fr/actualites/A16599 ; Légifrance (chapitre L.215-1 à L.215-5) : https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006069565/LEGISCTA000032221235/
- Droit de rétractation, art. L.221-18 à L.221-28 : https://www.legifrance.gouv.fr/codes/section_lc/LEGITEXT000006069565/LEGISCTA000032221365/
- Avis en ligne, art. L.111-7-2 : https://droit.jurisfac.org/sources/legi/LEGIARTI000049571119/article-l111-7-2/ [vérifier sur Légifrance]

**IA**
- AI Act Service Desk, dates d'application (art. 50 applicable depuis le 2 août 2026 ; marquage art. 50-2 au 2 décembre 2026 pour les systèmes existants) : https://ai-act-service-desk.ec.europa.eu/en/ai-act/faq/when-does-enforcement-start
- Lignes directrices de la Commission sur la transparence (art. 50) : https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations

**Textes cités sans consultation en ligne ce jour, à vérifier sur Légifrance :** art. L.123-22 C. com. ; art. L.213-1 et D.213-1 et suivants C. conso (contrats électroniques ≥ 120 €) ; art. L.612-1 et suivants C. conso (médiation) ; art. L.111-7 C. conso ; art. L.121-2, L.121-6 et L.121-8 C. conso ; art. 223-15-2 C. pén. ; art. L.521-3, L.525-4 et L.561-2 CMF ; art. 242 bis CGI ; art. 85 loi Informatique et Libertés.

*Fin du document.*
