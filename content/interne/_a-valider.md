---
title: "Points à valider, contenu Luna v2 (document interne)"
meta_description: "Document interne : placeholders et points à valider par Ozen et Juridique Luna avant toute publication du contenu Luna v2."
slug: "_a-valider"
h1: "Points à valider avant publication"
---

# Points à valider avant publication

*Document interne, non publié. Rien de ce dossier ne doit être mis en ligne avant validation de ces points.*

## 1. Décisions d’Ozen

1. **Statut de Marc et de Claire.** Ils sont repris de la v1 et présentés comme guides humains, avec le bandeau « Profil fictif — contenu de démonstration ». Si ce sont de vraies personnes : retirer le bandeau, faire valider leur profil par eux, et confirmer leurs canaux et tarifs. Sinon : les garder comme personas de démo, et ne pas les mettre en ligne comme guides disponibles.
2. **Les 8 autres guides humains sont fictifs** : Inès Benali, Hugo Lemaire, Aïcha Diallo, Théo Garnier, Nadia Kovač, Lucie Moreau, Yann Le Goff et Sofia Marin. Un site public ne doit pas présenter des guides fictifs comme disponibles. Avant le lancement, il faut soit les remplacer par de vrais guides recrutés, soit les afficher explicitement comme exemples.
3. **Véga, nouveau guide IA** (astrologie et numérologie, découverte) : création à valider.
4. **Terminologie « voyance » / « voyant ».** Le brief v2 parle de « plateforme de voyance » et de « Devenir voyant » ; la charte v1 proscrivait « voyance », « médium », « prédire ». Choix retenu : « voyance » seulement dans le title SEO de l’accueil et de la page candidature ; partout ailleurs, « guidance » et « guide ». À trancher.
5. **Présence d’une page Médiumnité.** Elle est rédigée avec une grande prudence (écoute intuitive, aucune communication avec les défunts présentée comme réelle), mais elle reste en tension avec la v1 (voir §3). Option : la retirer de la navigation principale, ou la supprimer.
6. **Tarifs indicatifs.** Plancher repris de la v1 : 1,50 €/min, marqué « indicatif, à valider » partout. Les plafonds par guide ne sont pas fixés.
7. **Fonctionnalités promises dans le texte** (plafond de dépense, pause du compte, bouton « Signaler », compteur pendant l’appel, disponibilité en temps réel, bandeau IA permanent). Elles doivent exister dans la v2 avant la mise en ligne. Sinon, retirer les phrases correspondantes. À confirmer avec Tech Luna.

## 2. Points pour Juridique Luna

1. **CGV/CGU, mentions légales, politique de confidentialité** : pages référencées (`/cgv`, `/confidentialite`) mais non rédigées ici.
2. **Faux profils** : vérifier que des profils fictifs, même avec un bandeau, ne posent pas de risque de pratique commerciale trompeuse (C. conso. L.121-2) s’ils sont publiés.
3. **Médiumnité et page Transparence v1** : la v1 dit « Ils ne prétendent pas à des pouvoirs surnaturels ». Une page et un profil (Aïcha Diallo) consacrés à la médiumnité y dérogent par nature, même formulés avec prudence. Il faut valider la formulation, ou trancher pour un retrait.
4. **Mention de divertissement** : formulation utilisée partout : « réflexion personnelle et divertissement ; pas de valeur scientifique ; ne remplace pas un avis professionnel ; réservé aux majeurs ». À valider.
5. **Parrainage** : règles de diffusion, non-convertibilité, éventuel encadrement fiscal des récompenses.
6. **Offre de bienvenue** : moyen de paiement demandé ou non à l’inscription, conditions d’unicité.
7. **Guides humains** (L.111-7) : statut, responsabilité de la prestation, critères de classement, contrat guide, commission.
8. **IA** : fournisseur, lieu de traitement, utilisation ou non des conversations pour l’entraînement (texte FAQ en attente).
9. **Numéros d’aide cités** : 3114, 15, 112, 17, 3919, 119, Joueurs Info Service (09 74 75 13 13, vérifié le 10 nov. 2026), Points conseil budget, conseil en évolution professionnelle (CEP), France Travail. À revérifier avant publication.

## 3. Tensions repérées

- **Médiumnité vs Transparence v1** (voir ci-dessus). Le formulaire de candidature v1 proposait déjà « Médiumnité », et la revue v1 recommandait de la retirer.
- **« Devenir voyant » vs charte v1** : le slug et le title SEO gardent « voyant » à la demande d’Alev, mais le H1 et le texte disent « guide ».
- **Profils fictifs vs page Guides publique** : 12 profils fictifs ne peuvent pas alimenter une vraie page « Nos guides » au lancement.
- **Notes et avis** : aucun n’a été écrit, conformément à la revue v1 et à l’audit juridique. La v2 ne doit pas en réintroduire côté code (étoiles, compteurs).
- **Disponibilité « 24 h/24 »** : vraie pour les guides IA seulement. L’accueil la mentionne pour l’ensemble du service, ce qui suppose au moins un canal IA toujours actif.
- **Pages référencées mais non fournies** : `/cgv`, `/compte/parrainage`, `/compte/plafond`, `/confidentialite`, `/devenir-voyant/candidature`, `/voyants`. À créer côté Tech ou Juridique, ou à retirer des liens.


## 4. Écarts avec la spec juridique v2 (`/workspace/luna_v2_spec_juridique.md`)

- **Libellé IA** : la spec demande la mention « Guide virtuel : intelligence artificielle » sous le nom, avec un badge « IA ». Le contenu utilise « guide IA », comme le demandait le brief. Il faut harmoniser l’un ou l’autre.
- **Libellé humain** : la spec prévoit « Guide indépendant(e), vérifié(e) par Luna ». Ce libellé ne doit pas apparaître sur les profils fictifs, puisqu’aucune vérification n’a eu lieu.
- **Mention de divertissement** : la spec propose une formule longue (« La voyance et la guidance sont proposées à titre de divertissement… »). Le contenu utilise une formule courte équivalente. Juridique Luna doit choisir la formule de référence.
- **Visio** : la spec mentionne un canal visio. Le contenu ne couvre que le chat, le téléphone et le message écrit. Il faut confirmer si la visio fait partie de la v2.

## 5. Placeholders par fichier (45)

| Fichier | À définir |
|---|---|
| `accueil.md` | À DÉFINIR : contenu exact de l’offre de bienvenue |
| `blog/consulter-avec-mesure.md` | À DÉFINIR : durées proposées. |
| `blog/consulter-avec-mesure.md` | À DÉFINIR : fonctionnalité et délai éventuel avant relèvement, à confirmer par Tech Luna. |
| `blog/guide-ia-ou-guide-humain.md` | À DÉFINIR : modèle tarifaire des guides IA, à l’acte ou inclus dans Luna+. |
| `comment-ca-marche.md` | À DÉFINIR : contenu et durée de chaque formule. |
| `comment-ca-marche.md` | À DÉFINIR : nombre de minutes offertes à la première consultation. |
| `comment-ca-marche.md` | À DÉFINIR : prix, durée, avantages exacts, modalités de reconduction et de résiliation. |
| `devenir-voyant.md` | À DÉFINIR : contenu du contrat guide, à rédiger par Juridique Luna. |
| `devenir-voyant.md` | À DÉFINIR : délai indicatif de réponse. |
| `devenir-voyant.md` | À DÉFINIR : fréquence et modalités. |
| `devenir-voyant.md` | À DÉFINIR : mention d’information RGPD, durée de conservation des candidatures. |
| `devenir-voyant.md` | À DÉFINIR : statut attendu (indépendant, micro-entreprise…) et justificatifs demandés. |
| `devenir-voyant.md` | À DÉFINIR : taux ou modèle de commission. |
| `faq.md` | À DÉFINIR : adresse du service client |
| `faq.md` | À DÉFINIR : critères de classement (disponibilité, ordre alphabétique, aléatoire…). Aucun classement payant n’est prévu à ce stade. |
| `faq.md` | À DÉFINIR : durées de conservation légales, par exemple pour les factures. |
| `faq.md` | À DÉFINIR : durées proposées, fonctionnalité à confirmer par Tech Luna. |
| `faq.md` | À DÉFINIR : délai |
| `faq.md` | À DÉFINIR : fonctionnalité à confirmer par Tech Luna. |
| `faq.md` | À DÉFINIR : mode de décompte, à la seconde ou à la minute entamée. |
| `faq.md` | À DÉFINIR : moyens de paiement acceptés. |
| `faq.md` | À DÉFINIR : nom du fournisseur d’IA et lieu de traitement des données, à préciser dans la politique de confidentialité. |
| `faq.md` | À DÉFINIR : nom et coordonnées du médiateur |
| `faq.md` | À DÉFINIR : politique de remboursement et droit de rétractation, à rédiger par Juridique Luna. |
| `faq.md` | À DÉFINIR : prix, durée, avantages, reconduction. |
| `faq.md` | À DÉFINIR : réponse à valider par Juridique Luna selon le contrat avec le fournisseur d’IA. |
| `faq.md` | À DÉFINIR : statut exact des guides et responsabilité de la prestation, à préciser par Juridique Luna. |
| `offre-bienvenue.md` | À DÉFINIR : contenu exact de l’offre, par exemple nombre de minutes offertes, canal concerné (chat, téléphone, message) et guides éligibles. |
| `offre-bienvenue.md` | À DÉFINIR : durée de validité de l’offre après la création du compte. |
| `offre-bienvenue.md` | À DÉFINIR : règle d’identification, par compte, moyen de paiement ou autre. |
| `offre-bienvenue.md` | À DÉFINIR : un moyen de paiement est-il demandé à l’inscription ? Si oui, il n’est débité qu’avec votre accord explicite. |
| `parrainage.md` | À DÉFINIR : avantage du filleul, cumulable ou non avec l’offre de bienvenue. |
| `parrainage.md` | À DÉFINIR : nombre maximal de parrainages récompensés. |
| `parrainage.md` | À DÉFINIR : par exemple création du compte ou premier échange payant. |
| `parrainage.md` | À DÉFINIR : règle de diffusion à valider par Juridique Luna. |
| `parrainage.md` | À DÉFINIR : récompense du parrain ou de la marraine. |
| `voyants/aicha-diallo.md` | À DÉFINIR : prix par message |
| `voyants/claire.md` | À DÉFINIR : prix par message et délai de réponse |
| `voyants/ines-benali.md` | À DÉFINIR : prix par message |
| `voyants/lucie-moreau.md` | À DÉFINIR : prix par message |
| `voyants/marc.md` | À DÉFINIR : prix par message |
| `voyants/selene.md` | À DÉFINIR : tarif du chat IA ou inclusion dans Luna+. |
| `voyants/theo-garnier.md` | À DÉFINIR : prix par message |
| `voyants/vega.md` | À DÉFINIR : tarif du chat IA ou inclusion dans Luna+. |
| `voyants/yann-le-goff.md` | À DÉFINIR : prix par message |
