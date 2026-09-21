# Radar Free-Model Catalog (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/RADAR.md) · 🇪🇹 [am](../../../am/docs/frameworks/RADAR.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/RADAR.md) · 🇦🇿 [az](../../../az/docs/frameworks/RADAR.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/RADAR.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/RADAR.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/RADAR.md) · 🇩🇰 [da](../../../da/docs/frameworks/RADAR.md) · 🇩🇪 [de](../../../de/docs/frameworks/RADAR.md) · 🇬🇷 [el](../../../el/docs/frameworks/RADAR.md) · 🇪🇸 [es](../../../es/docs/frameworks/RADAR.md) · 🇪🇪 [et](../../../et/docs/frameworks/RADAR.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/RADAR.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/RADAR.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/RADAR.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/RADAR.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/RADAR.md) · 🇮🇱 [he](../../../he/docs/frameworks/RADAR.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/RADAR.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/RADAR.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/RADAR.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/RADAR.md) · 🇮🇩 [id](../../../id/docs/frameworks/RADAR.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/RADAR.md) · 🇮🇹 [it](../../../it/docs/frameworks/RADAR.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/RADAR.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/RADAR.md) · 🇰🇭 [km](../../../km/docs/frameworks/RADAR.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/RADAR.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/RADAR.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/RADAR.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/RADAR.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/RADAR.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/RADAR.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/RADAR.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/RADAR.md) · 🇲🇲 [my](../../../my/docs/frameworks/RADAR.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/RADAR.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/RADAR.md) · 🇳🇴 [no](../../../no/docs/frameworks/RADAR.md) · 🇮🇳 [or](../../../or/docs/frameworks/RADAR.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/RADAR.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/RADAR.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/RADAR.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/RADAR.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/RADAR.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/RADAR.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/RADAR.md) · 🇱🇰 [si](../../../si/docs/frameworks/RADAR.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/RADAR.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/RADAR.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/RADAR.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/RADAR.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/RADAR.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/RADAR.md) · 🇮🇳 [te](../../../te/docs/frameworks/RADAR.md) · 🇹🇭 [th](../../../th/docs/frameworks/RADAR.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/RADAR.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/RADAR.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/RADAR.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/RADAR.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/RADAR.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/RADAR.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/RADAR.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/RADAR.md)

---

> **Source de vérité :** `src/lib/radar/`, `src/lib/db/radar.ts`, `src/app/api/radar/`
> **Dernière mise à jour :** 2026-09-01 — v3.8.51
> **Périmètre des éléments probants relatifs au service hébergé :** les règles côté serveur décrites ici ont été vérifiées le
> 2026-09-01 par rapport au serveur Radar intentionnellement privé, à la révision exacte
> `main@dce70f004364912f3f144cdb69f4cbcde16093ed`. Cette implémentation n’est pas distribuée dans
> ce dépôt OSS ; la disponibilité du service hébergé demeure un état opérationnel distinct.

Radar est un **module complémentaire facultatif** qui superpose un catalogue signé et récemment actualisé de modèles gratuits
à la référence de la version (`FREE_MODEL_BUDGETS` dans
`open-sse/config/freeModelCatalog.data.ts`). Il existe parce que l’écosystème des offres gratuites évolue
plus rapidement que le rythme des versions — les fournisseurs ajoutent, réduisent ou suppriment des quotas gratuits entre
deux versions, tandis que le catalogue de référence ne peut être actualisé que lors de la publication d’une nouvelle version.

**Rien de ce qui est gratuit aujourd’hui ne cesse de l’être à cause du flux distant.** Radar ne place jamais
une entrée de référence derrière un accès payant ; il actualise uniquement les champs de limites/statut au moment de la lecture et peut
ajouter de nouveaux modèles gratuits découverts entre deux versions. Un opérateur peut toujours masquer un
modèle localement, puis le restaurer depuis le même tableau de bord. Le catalogue de référence lui-même
n’est jamais modifié sur le disque — voir
[Règles de fusion de la superposition au moment de la lecture](#read-time-overlay-merge-rules) ci-dessous.

---

## État de livraison dans la v3.8.51

L’état suivant distingue ce que cette version OSS implémente des chantiers Radar
ultérieurs. Il s’agit d’un état au niveau du code, et non d’une promesse quant à la disponibilité actuelle
d’un déploiement hébergé particulier ou d’une intégration externe.

| Domaine                                     | État dans cette version                                                                                                                                                                                                                                                                                                               |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Client de catalogue signé                   | Implémenté derrière `RADAR_ENABLED`, avec une activation distincte, une vérification Ed25519, des paramètres et un cache locaux chiffrés, des substitutions persistantes d’affichage/d’activation, des marqueurs de suppression réversibles, un planificateur et un tableau de bord.                                                  |
| Activation des contributeurs                | Le tableau de bord renvoie vers le flux de revendication GitHub hébergé par le serveur et accepte une clé `omr_…` existante. L’éligibilité des contributeurs est déterminée par le service privé ; le client OSS ne contient ni jeton GitHub ni logique d’émission.                                                                   |
| Activation par clé de soutien               | Implémentée. La clé brute est validée, chiffrée au repos, masquée lors des lectures et envoyée uniquement par la synchronisation côté serveur. La modification ou la suppression de la clé invalide les quatre caches de flux sensibles aux droits.                                                                                   |
| Liens de parrainage                         | Implémentés sous forme de flux signé séparément, actualisé toutes les heures. Les liens permanents sont immédiatement disponibles pour le niveau communautaire ; les campagnes limitées restent des données du niveau actif.                                                                                                          |
| Offres pour les soutiens                    | Implémentées sous forme de flux signé séparé, réservé au niveau actif, ainsi que d’une page de tableau de bord. Le client revalide le schéma fermé des avantages, conserve le dernier cache valide, filtre les entrées expirées et identifie explicitement les offres partenaires.                                                    |
| Informations et reconnaissance des soutiens | Implémentées sous forme de flux strictement signé, réservé au niveau actif, avec un classement ELO géré par Radar, des données factuelles sur l’actualité et les tendances du catalogue, un badge local vérifié de soutien, une page de tableau de bord et des commandes CLI locales uniquement pour le statut et la synchronisation. |
| Paiements et e-mails transactionnels        | Non implémentés dans le client OSS. L’achat, le don, l’examen des reçus, la récupération et l’envoi des e-mails relèvent du service privé ; la disponibilité du service hébergé dépend toujours de son déploiement supervisé et de la configuration du fournisseur.                                                                   |
| Chantier de l’agent de recherche            | Ne fait pas partie de cette version du client. Le contenu des flux organisés reste constitué de données côté serveur ; aucun agent de recherche autonome ne s’exécute dans une installation OmniRoute.                                                                                                                                |

---

## Lecteur d’annonces publiques

Le lecteur d’annonces générique est distinct du feature flag Radar. La page d’accueil du tableau de bord et le
visualiseur du journal des modifications récupèrent le fichier public `news.json` du dépôt au moyen d’une simple requête `GET` vers
`NEWS_JSON_URL` (`src/shared/utils/releaseNotes.ts`). Ils n’envoient aucun paramètre Radar, prompt, configuration de fournisseur,
enregistrement d’utilisation ni état local de masquage.

`news.json` utilise le schéma v2 fermé implémenté par `parseNewsPayload()` :

- `schemaVersion: 2` et une collection `items[]` de taille limitée ;
- des valeurs d’`id` d’annonce stables et uniques ;
- des champs `active` et `publishedAt` au format ISO explicites ;
- un contenu en anglais obligatoire avec des traductions facultatives ;
- des liens HTTPS facultatifs ne nécessitant aucun identifiant et une icône figurant dans une liste d’autorisation ;
- la sélection des annonces actives les plus récentes en premier, le repli de la langue vers l’anglais et le masquage local par ID.

L’analyseur accepte temporairement l’ancienne forme singulière `{ active, title, message, ... }` afin que
les anciens forks puissent migrer sans rendre la vue du journal des modifications inutilisable. Les flux non valides restent inertes. L’entrée de lancement de Radar
est livrée avec `active: false` ; la remplacer par `true` constitue une action de publication distincte, effectuée après la fusion et le déploiement,
et ne modifie ni `RADAR_ENABLED` ni l’activation indépendante de la synchronisation du flux.

---

## Flag : `RADAR_ENABLED` (désactivé par défaut)

Radar est protégé de bout en bout par le feature flag `RADAR_ENABLED`
(`src/shared/constants/featureFlagDefinitions.ts`, catégorie `policies`,
`defaultValue: "false"`).

**Lorsque le flag est désactivé, l’interface n’existe pas :**

- Tous les endpoints `/api/radar/*`, y compris les lectures et écritures locales de l’état du modèle,
  renvoient `404` avant d’accéder à un quelconque module Radar.
- Les écrans du tableau de bord (`/dashboard/radar`, `/dashboard/radar/setup`,
  `/dashboard/radar/combos`, `/dashboard/radar/offers`, `/dashboard/radar/intel`) affichent
  `notFound()`.
- `getRadarCatalog()` (`src/lib/radar/index.ts`) renvoie la base de référence intacte —
  même nombre d’entrées, mêmes valeurs, chaque entrée étant marquée `origin: "baseline"` — et ne
  lit jamais le cache du flux.
- Aucun appel réseau Radar n’est jamais effectué ; chaque module de synchronisation renvoie `{ status: "disabled" }`
  avant d’accéder à `fetch`.

Il s’agit d’un mécanisme de contrôle englobant strict : l’activation du flag déverrouille uniquement les _écrans_,
rien de plus. Elle n’envoie aucune donnée, ne lance aucune synchronisation en arrière-plan et ne modifie
ni le routage ni la sélection du modèle — consultez l’activation distincte ci-dessous.

---

## La synchronisation des données est une activation DISTINCTE — la promesse de confidentialité

L’activation de `RADAR_ENABLED` déverrouille uniquement l’interface utilisateur. La synchronisation du flux nécessite une seconde
activation indépendante, stockée dans `radar_settings.opt_in` (`src/lib/db/radar.ts`,
migration `136_radar_cache_settings.sql`). `syncRadar()` vérifie le flag _et_ l’activation
avant d’effectuer tout appel réseau :

```
Flag désactivé    → { status: "disabled" }   — aucun appel réseau
Activation absente → { status: "opt_out" }    — aucun appel réseau
```

Lorsque les deux sont activés, le processus de synchronisation est le suivant :

1. `GET <URL de base du flux>/v1/catalog/latest` avec `x-omniroute-radar-schema: 2` et un en-tête
   facultatif `Authorization: Bearer <clé de soutien>` (voir ci-dessous). En l’absence de l’en-tête de schéma, les serveurs utilisent par défaut
   l’artefact de transition v1 signé séparément, afin que les anciens clients installés continuent de
   recevoir les mises à jour.
2. Il s’agit d’un flux applicatif de téléchargement uniquement, mais il repose tout de même sur une requête HTTPS. L’infrastructure
   hébergée reçoit les métadonnées de connexion ordinaires, telles que l’adresse IP source. Lorsqu’une clé de soutien
   est configurée, la synchronisation envoie également cette clé dans l’en-tête Bearer afin que le service puisse déterminer
   les droits associés. À la révision exacte du serveur privé identifiée dans la limite des éléments probants ci-dessus,
   la comptabilisation des requêtes du flux utilise les hachages de clés, des données d’utilisation agrégées et un HMAC tronqué
   de l’adresse IP avec rotation quotidienne pour l’examen manuel des abus ; ces tables ne conservent ni la clé ni l’adresse IP sous forme brute.
   Les journaux d’accès de l’infrastructure et la boîte d’envoi chiffrée constituent des périmètres opérationnels
   distincts.
3. OmniRoute n’envoie jamais au service Radar les prompts, les réponses, les conversations, les identifiants des fournisseurs, le trafic des modèles,
   la disponibilité, la latence ni la configuration locale des fournisseurs.
4. La réponse est vérifiée, validée et mise en cache localement (voir
   [Modèle de sécurité](#security-model)). Radar dispose exactement de quatre chemins réseau côté serveur :
   `syncRadar()` pour le catalogue, `syncRadarReferrals()` pour les parrainages et
   `syncRadarOffers()` / `syncRadarIntel()` pour les offres et les renseignements réservés aux soutiens.

La **clé de soutien** est un jeton Bearer facultatif (`radar_settings.supporter_key`)
qui permet au service de flux de déterminer le niveau à fournir (voir
[Niveaux](#tiers-community-and-live)). Elle est :

- Stockée **chiffrée au repos** avec les mêmes fonctions d’assistance AES-256-GCM `encrypt()`/`decrypt()`
  (`src/lib/db/encryption.ts`) que celles utilisées pour les identifiants des fournisseurs.
- Définie via `POST /api/radar/settings` (`{ supporterKey: "omr_" + 40 hex chars }`) et
  **jamais renvoyée telle quelle** — la réponse retourne une forme masquée (`omr_****abcd`).
- Sa modification ou sa suppression invalide de manière atomique les caches du catalogue, des parrainages, des offres et d’Intel. La
  synchronisation ou lecture suivante détermine les nouveaux droits côté serveur ; l’enregistrement d’une clé ne déclenche pas en lui-même
  de requête réseau et ne consomme aucune clé d’activation à usage unique.
- Envoyée au service de flux sous forme de jeton Bearer lors de la requête GET de synchronisation — aucune autre information concernant la
  clé ne quitte jamais le client.

---

## Règles d’accès et de sécurité affichées avant l’activation

Le tableau de bord inactif affiche ces règles depuis
`src/app/(dashboard)/dashboard/radar/RadarAccessExplainer.tsx` **avant** l’une ou l’autre des actions d’activation.
L’échelle d’accès de référence est la suivante :

| Niveau                  | Éligibilité                                                                                           | Accès                                                    | Règle de répétition/d’expiration                                                     |
| ----------------------- | ----------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Communauté              | Tout le monde ; aucune clé                                                                            | Catalogue complet différé d’environ 30 jours             | Toujours disponible ; aucune émission                                                |
| Étoile + suivi          | GitHub OAuth vérifie à la fois l’ajout d’une étoile au dépôt et le suivi de son propriétaire          | Une consultation du catalogue en direct, puis Communauté | Une émission par connexion ; jamais réémise                                          |
| Contributeur Top 10     | Positions 1 à 10 du dernier classement hebdomadaire complet                                           | 365 jours d’accès en direct                              | Réclamé à la demande ; quitter le classement ne réduit pas une période déjà accordée |
| Contributeur Top 100    | Positions 11 à 100 de ce classement                                                                   | 90 jours d’accès en direct                               | Même règle de réclamation à la demande et idempotente                                |
| Achat Supporter         | Achat unique de 6 mois, 1 an ou à vie                                                                 | Catalogue en direct, offres en direct signées et Intel   | Aucun renouvellement automatique                                                     |
| Don/subvention manuelle | Don examiné par le propriétaire ou subvention du propriétaire pour un nombre explicite de jours/à vie | Même droit d’accès en direct pendant la période accordée | Subvention auditée et idempotente                                                    |

Les PR fusionnées, les commits et les lignes modifiées sont **uniquement des données d’entrée du classement**. Une connexion en dehors du Top 100
ne donne droit à aucune attribution de contributeur, quel que soit le nombre de PR. Les achats à durée limitée, les dons, les périodes de contribution et
les subventions manuelles s’ajoutent à partir de la date d’expiration actuelle ; l’accès à vie prévaut. Un changement de classement ne
révoque ni ne réduit jamais rétroactivement une période déjà accordée.

La licence hébergée est personnelle et la règle présentée à l’utilisateur autorise une seule installation active à la fois. Cette
version ne prétend **pas** imposer un verrouillage matériel : la synchronisation OSS ne génère aucune empreinte du matériel et ne maintient aucun
bail cryptographique d’appareil. À la révision vérifiée du serveur privé indiquée ci-dessus, le mécanisme appliqué
consiste en une validation des droits d’accès, accompagnée d’un signalement pour examen manuel lorsque la même clé active est détectée depuis une quatrième
adresse IP distincte en 24 heures. Ce signalement ne bloque ni ne révoque jamais automatiquement une clé. La récupération
révoque et remplace la clé perdue tout en conservant la date d’expiration existante ; elle ne redémarre pas la
période achetée ou accordée.

Les offres en direct sont sélectionnées manuellement et peuvent être modifiées ou expirer. L’écran d’activation précise également la
limite exacte en matière de confidentialité : les métadonnées signées du catalogue et de parrainage sont téléchargées ; une clé valide déverrouille en outre
les offres signées et Intel ; la clé Bearer et les métadonnées de connexion habituelles parviennent au service hébergé ;
les prompts, réponses, conversations, identifiants des fournisseurs, échanges avec les modèles, disponibilité, latence et configuration locale
des fournisseurs ne lui parviennent pas.

---

## Obtention d'une clé de soutien

L'écran d'activation (`/dashboard/radar`) propose deux parcours permettant d'**obtenir** une
clé de soutien. Le dépôt OSS lui-même n'en délivre jamais, n'exécute aucun code de paiement et
**n'indique jamais de prix** — la tarification est décidée et affichée exclusivement sur les
pages de destination, et non dans ce dépôt (décision de spécification D14).

- **« Je contribue »** — ouvre `RADAR_CONTRIBUTOR_CLAIM_URL` (valeur par défaut :
  `https://radar.omniroute.online/auth/github`), un parcours de demande via GitHub OAuth hébergé sur
  le serveur Radar privé. Il vérifie le dernier classement hebdomadaire complet : les 10 premiers reçoivent 365 jours
  et les positions 11 à 100 reçoivent 90 jours. Au-delà du Top 100, le nombre de PR ne donne jamais accès ; le parcours
  vérifie à la place le niveau distinct et à usage unique basé sur une étoile + un suivi.
- **« Soutenir le projet »** — ouvre `RADAR_SUPPORTER_PLANS_URL` (valeur par défaut :
  `https://radar.omniroute.online/planos`), la page hébergée présentant les options à paiement unique de 6 mois, 1 an et
  à vie. La page OSS n'affiche toujours aucune valeur monétaire.

Les deux URL sont résolues côté serveur (`src/lib/radar/links.ts`, selon le même modèle de
remplacement par variable d'environnement que `RADAR_FEED_URL`) et transmises au tableau de bord via la réponse
existante de `GET /api/radar/settings` (`contributorClaimUrl`, `supporterPlansUrl`) — le
composant client ne lit jamais directement `process.env`.

| Variable                      | Objectif                                                                                                    |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `RADAR_CONTRIBUTOR_CLAIM_URL` | Remplace l'URL de demande pour les contributeurs (par défaut `https://radar.omniroute.online/auth/github`). |
| `RADAR_SUPPORTER_PLANS_URL`   | Remplace l'URL des offres de soutien (par défaut `https://radar.omniroute.online/planos`).                  |

### Récupération d'une clé de soutien perdue

Le point d'entrée de récupération du service hébergé est `https://radar.omniroute.online/recover` ; il est également
accessible depuis la page des offres. La récupération reste entièrement extérieure au client OSS, car l'installation
locale ne reçoit jamais l'adresse e-mail de l'acheteur ou du contributeur et ne peut pas reconstituer une clé brute à
partir de ses paramètres chiffrés.

1. Envoyez l'adresse e-mail associée à la clé. Le service renvoie la même page de confirmation, qu'une
   licence récupérable existe ou non, afin que le formulaire ne permette pas d'énumérer les comptes.
2. Si la demande est admissible, le processus de livraison envoie un lien à courte durée de vie et à usage unique. Son ouverture transfère
   immédiatement le jeton dans un cookie transitoire chiffré `HttpOnly`/`Secure`, puis redirige vers l'URL
   `/recover` nettoyée ; la page ne contient ni jeton, ni adresse e-mail, ni ancienne clé, ni clé de remplacement.
3. Confirmez la révocation. Le service privé révoque l'ancienne clé, crée la clé de remplacement avec
   la même offre et la même date d'expiration, puis la place dans la file d'attente d'envoi par e-mail au sein d'une seule transaction. La clé de remplacement n'est jamais
   renvoyée au navigateur.
4. Collez la clé de remplacement dans `/dashboard/radar`. L'ancienne clé doit désormais revenir au niveau `community` ; la
   clé de remplacement doit permettre une synchronisation `live` vérifiée. Toute nouvelle ouverture du même lien de récupération doit échouer avec
   une réponse générique indiquant que le lien est invalide ou expiré.

La route de récupération hébergée et le processus de messagerie peuvent être présents dans le code tout en restant indisponibles dans un
déploiement donné. Ne considérez pas le parcours comme prêt pour la production tant que le serveur n'a pas été déployé, que le fournisseur
de livraison n'a pas été configuré avec un destinataire contrôlé et que le lien complet à usage unique n'a pas été testé.

Une fois qu'un visiteur dispose d'une clé (`omr_` + 40 caractères hexadécimaux), l'écran d'activation
(`src/app/(dashboard)/dashboard/radar/page.tsx`) présente comme parcours principal un champ dans lequel coller la clé :
coller une clé et valider envoie `POST /api/radar/settings`
(`{ optIn: true, supporterKey }`) en un seul appel — coller une clé permet à la fois de la définir et de s'inscrire,
ce qui déverrouille l'écran. Le format (`omr_` + 40 caractères hexadécimaux) est d'abord vérifié côté client
à l'aide de l'utilitaire partagé `isValidSupporterKeyFormat()` (`src/lib/radar/supporterKey.ts`)
pour améliorer l'expérience utilisateur ; le schéma Zod du serveur constitue dans tous les cas la validation faisant autorité. Une fois qu'une
clé est définie, l'écran d'activation affiche sa forme masquée (`supporterKeyMasked` provenant de
`GET /api/radar/settings`) à la place d'un champ vide, avec une commande « changer de clé » permettant d'en
coller une nouvelle — la clé brute n'est jamais réaffichée. Les deux boutons de demande et d'offres ci-dessus
restent le moyen d'_obtenir_ une clé initialement ; ce champ est l'endroit où un opérateur
qui en possède déjà une peut l'activer.

### Activation de bout en bout et configuration guidée

Le service de flux privé et ce client OSS présentent volontairement une frontière bien définie : le service
délivre et valide la clé de soutien, tandis que l'installation OmniRoute locale chiffre la clé,
synchronise côté serveur les artefacts signés et guide la configuration du fournisseur. L'ordre de validation assistée est le suivant :

1. Obtenez une clé nouvellement émise ou récupérée depuis la demande du contributeur, le parcours de souscription/paiement, le parcours de récupération ou auprès d’un opérateur de serveur privé autorisé. Ne collez pas la clé brute dans des journaux, des captures d’écran, des commentaires de ticket ou des arguments de ligne de commande.
2. Activez le drapeau de fonctionnalité `RADAR_ENABLED` sur l’installation OmniRoute locale. Cela affiche l’interface utilisateur, mais celle-ci reste inactive sur le réseau tant que l’adhésion distincte n’a pas été enregistrée.
3. Ouvrez `/dashboard/radar`, collez la clé et activez-la. Le navigateur envoie localement une requête `POST /api/radar/settings` avec `{ optIn: true, supporterKey }` ; la clé est chiffrée localement et la réponse contient uniquement `omr_****<last4>`.
4. Laissez l’écran d’activation effectuer la synchronisation de son catalogue, ou sélectionnez **Synchroniser maintenant**. Vérifiez que la page indique `live`, une version du flux et une heure de récupération. Pour effectuer un diagnostic local authentifié, `GET /api/radar/status` indique la présence de l’adhésion et de la clé, ainsi que les quatre états du cache, sans renvoyer la clé. `POST /api/radar/sync-all` permet d’actualiser explicitement le catalogue, les recommandations, les offres et les renseignements.
5. Ouvrez `/dashboard/radar/setup?provider=<provider>`. Suivez l’URL d’identification gérée par le fournisseur, sélectionnez **Ajouter une clé API**, enregistrez-la via le véritable formulaire du fournisseur, revenez au guide, puis exécutez **Tester la connexion**. Le guide utilise les routes habituelles `/api/providers` et `/api/providers/<connection-id>/test` ; il ne crée pas d’identifiant Radar parallèle.
6. Ouvrez `/dashboard/radar/combos` une fois qu’au moins deux connexions de fournisseurs compatibles sont actives. Examinez la famille suggérée et créez la combinaison via l’API de combinaisons existante. Les offres et les renseignements restent des caches signés distincts, accessibles uniquement en mode `live`, et peuvent être consultés sur leurs pages Radar dédiées.
7. Rechargez `/dashboard/radar` et la page de configuration. L’adhésion, l’état de la clé masquée, le cache vérifié, la connexion de fournisseur enregistrée et l’action de test doivent persister après le rechargement. Ne recueillez des preuves qu’une fois que la clé brute et l’identifiant du fournisseur ne sont plus visibles.

L’enregistrement d’une clé ne constitue pas à lui seul une preuve d’un droit d’accès `live`. Cette preuve repose sur la combinaison du résultat de `GET /v1/license/check` du service privé, du niveau `live` servi par le catalogue OSS, d’un cache signé vérifié et du véritable processus de connexion et de test du fournisseur. Une clé non valide, expirée ou révoquée fait repasser le catalogue en toute sécurité au niveau `community` ; elle ne doit pas être signalée comme ayant été validée avec succès en tant que clé `live`.

### Lien vers le panneau d’administration privé

`RADAR_ADMIN_URL` ajoute éventuellement **Administration Radar ↗** immédiatement après l’élément Radar destiné aux utilisateurs dans la section Coûts de la barre latérale. Il n’existe délibérément aucune valeur par défaut : lorsque la variable est absente ou non valide, la barre latérale statique, la palette de commandes et l’écran de personnalisation de la barre latérale ne contiennent aucun élément d’administration ni aucune URL privée.

La valeur est résolue côté serveur et transmise par l’intermédiaire de la réponse `GET /api/settings`, authentifiée pour la gestion, uniquement à une session de tableau de bord authentifiée ou au propriétaire de bouclage approuvé lors d’un amorçage local sans connexion. Les authentifications par CLI, par service interne et par clé API de portée `manage` ne la reçoivent pas. Le navigateur valide à nouveau la réponse avant de créer le lien externe, qui s’ouvre avec `noopener noreferrer`.

Utilisez une URL de tunnel HTTPS ou de tailnet ne contenant aucun identifiant. Le protocole HTTP non chiffré est accepté uniquement pour une redirection SSH en boucle locale telle que `http://127.0.0.1:9351` ; les autres schémas, les identifiants intégrés, les URL mal formées et les destinations HTTP distantes échouent de manière sécurisée et la navigation reste inactive.

---

## Modèle de sécurité

### Signature Ed25519 des octets exacts

La charge utile du flux est signée avec Ed25519. `verifyFeedBytes()`
(`src/lib/radar/verify.ts`) vérifie la signature sur les **octets exacts de la réponse**
reçus sur le réseau — la charge utile n’est jamais sérialisée à nouveau avant la vérification, de sorte qu’un
réencodage octet par octet ne peut pas invalider ou contourner silencieusement la vérification de la signature.
Un échec de vérification (`invalid_signature`) interrompt la synchronisation avant même que la charge utile
ne soit analysée ou mise en cache.

### Clé publique épinglée + rotation

La clé publique de vérification est épinglée dans `src/lib/radar/pinnedKeys.ts`
(`PINNED_FEED_PUBLIC_KEYS`), sous la forme d’un tableau afin qu’une nouvelle clé puisse être ajoutée en tête avant une
rotation, tandis que les anciens flux mis en cache et signés avec une clé précédente restent valides jusqu’à leur
resynchronisation.

### Remplacements via variables d’environnement adaptés aux forks

Deux variables d’environnement permettent aux forks et aux auto-hébergeurs de faire pointer le client vers leur propre flux au lieu
du service OmniRoute par défaut — voir
[Comment auto-héberger un flux](#how-to-self-host-a-feed) ci-dessous :

| Variable            | Fonction                                                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `RADAR_FEED_URL`    | Remplace l’URL de base du flux (par défaut `https://radar.omniroute.online`).                                              |
| `RADAR_FEED_PUBKEY` | Remplace la clé publique épinglée (SPKI DER encodée en base64 ou PEM), en substituant cette clé unique au tableau intégré. |

### Version minimale

`syncRadar()` rejette un flux téléchargé dont la `version` n’est pas strictement plus récente que la
version actuellement mise en cache (comparaison `compareVersions()` au format pointé `YYYY.MM.DD.n`) —
`{ status: "stale" }`. Cela empêche un point de terminaison de flux compromis ou mal configuré de
ramener un client à une charge utile plus ancienne et signée différemment.

### Deux dates, et pourquoi les deux sont conservées

Un flux mis en cache comporte deux dates distinctes, et c’est précisément pour éviter de les
confondre que les deux sont conservées :

| Champ         | Provenance                    | Indique                                         |
| ------------- | ----------------------------- | ----------------------------------------------- |
| `generatedAt` | corps signé du flux           | l’ancienneté des **données**                    |
| `fetchedAt`   | horloge de cette installation | quand cette installation les a **téléchargées** |

Un flux récupéré il y a quelques minutes peut contenir des chiffres datant de plusieurs semaines ; `fetchedAt` seul ne peut donc pas
indiquer à un opérateur si la surcouche est plus récente que la base sur laquelle elle repose. Les deux valeurs sont
conservées dans `radar_feed_cache`, renvoyées par `getRadarCatalog().meta` et rapportées
séparément par `GET /api/radar/status`. Une ligne mise en cache avant l’existence de la colonne `generated_at`
(migration 163) est relue avec la valeur `null` — une valeur inconnue reste inconnue au lieu
d’emprunter l’heure de récupération. `radar_referrals_cache` conserve son propre `generated_at` depuis
la migration 142.

La version minimale ci-dessus compare `version`, et non l’une ou l’autre date.

Deux lacunes subsistent, toutes deux intentionnelles : le tableau de bord n’affiche encore que `Last fetched`, de sorte que l’affichage
de la date de génération nécessite un nouveau libellé (et ses 41 entrées de langue) ; par ailleurs, les caches des offres et des renseignements
ne conservent aucune date de génération, même si leurs schémas de flux en comportent une — `GET
/api/radar/status` omet donc le champ pour ces deux caches au lieu de renvoyer une valeur `null`
qui serait interprétée comme « inconnue ».

### Validation du schéma

Les octets téléchargés sont analysés et validés par rapport à `RadarFeedSchema`
(`src/lib/radar/feedSchema.ts`, un schéma Zod) **après** la vérification de la signature. Une
non-conformité au schéma renvoie `{ status: "invalid_schema" }` et le cache reste
inchangé. La charge utile mise en cache est, par mesure de précaution, validée à nouveau à chaque lecture
(`getRadarCatalog()`) — une ligne de cache corrompue ou modifiée manuellement entraîne un retour aux
données de base plutôt que d’être servie.

### Limite de taille de la réponse (10 Mo)

`syncRadar()` impose une **limite stricte de 10 Mo** au corps de la réponse du flux — le flux
signé est un document JSON de l’ordre de quelques Ko ; tout dépassement indique donc un
`RADAR_FEED_URL` mal configuré ou hostile (ou une source en amont servant des données incohérentes), et non un catalogue légitime.
L’application de cette limite s’effectue sur deux niveaux :

1. Une vérification préalable de `Content-Length` évite entièrement la lecture du corps lorsque
   l’en-tête déclare déjà une valeur supérieure à la limite.
2. Une vérification du total cumulé pendant la lecture du corps applique la limite même lorsque
   `Content-Length` est absent ou sous-estime la taille réelle — l’en-tête n’est jamais
   considéré comme fiable à lui seul. La concaténation des fragments accumulés préserve les octets
   exacts nécessaires à la vérification ultérieure de la signature Ed25519.

Le dépassement de la limite renvoie `{ status: "too_large" }` et laisse le cache inchangé,
selon le même principe non destructif que tous les autres échecs de synchronisation
(`invalid_signature`, `invalid_schema`, `stale`).

---

## Niveaux : `community` et `live`

Le schéma du flux comporte un champ `tier: "community" | "live"`, déterminé **côté serveur**
par le service de flux en fonction de la requête (présence et validité de la clé de soutien)
— le client ne détermine jamais lui-même son niveau.

- **`community`** — le catalogue gratuit, décalé d’environ 30 jours par rapport aux données
  les plus récentes. C’est ce que reçoit une requête non authentifiée ou avec une clé non valide.
- **`live`** — le catalogue le plus récent, servi aux requêtes comportant une clé de soutien
  valide.

**Une clé de soutien non valide ou expirée entraîne un retour au niveau `community` — ce n’est jamais
une erreur.** Le chemin de synchronisation distingue uniquement les échecs de signature, de schéma
ou de version (tous récupérables et sans effet fatal sur l’état mis en cache) d’une réponse réussie
`{ status: "updated", version, tier }`. Il n’existe aucun chemin d’erreur propre à un niveau que le
client doive gérer.

### Le niveau servi provient d’un en-tête de réponse, et non du corps signé

Le champ `tier` du **corps** signé du flux vaut toujours `"live"` — le service de flux publie
**deux artefacts signés par version** : celui de niveau live inclut les campagnes actuelles, tandis
que celui de niveau community les omet. Chaque artefact est signé sur la base de ses propres octets
exacts. Le corps ne sert toujours pas à déterminer les droits d’accès ; le niveau effectivement
sélectionné pour une requête est transmis dans **l’en-tête de réponse `x-omniroute-feed-tier`**,
déterminé côté serveur à partir de la clé `Authorization` de la requête.

`syncRadar()` (`src/lib/radar/sync.ts::parseServedTierHeader()`) est l’unique emplacement
qui détermine le niveau auquel un client doit faire confiance :

1. Analyser `x-omniroute-feed-tier` avec `RadarTierSchema` (Zod) — un en-tête absent, ou
   une valeur qui n’est pas exactement `"community"` ou `"live"`, est considéré comme **non
   présent** (la valeur brute n’est jamais considérée comme fiable pour le cache ou l’interface ;
   cela couvre également les anciens serveurs de flux antérieurs à l’ajout de cet en-tête).
2. Utiliser en dernier recours le champ `tier` du corps signé (toujours `"live"`) uniquement
   lorsque l’étape 1 ne produit aucun résultat.
3. Le niveau ainsi déterminé est celui qui est mis en cache et renvoyé sous la forme
   `{ status: "updated", version, tier }` — c’est cette valeur que le tableau de bord affiche,
   jamais le champ brut du corps.

---

## Règles de fusion de la surcouche lors de la lecture

`applyFeed()` (`src/lib/radar/applyFeed.ts`) fusionne le flux mis en cache **par-dessus** la
base statique **au moment de la lecture**, dans `getRadarCatalog()`. Le tableau de référence
(`FREE_MODEL_BUDGETS`) n’est jamais modifié — un nouveau `MergedEntry[]` est calculé à chaque
appel.

Quatre règles, par ordre de priorité :

1. **Le flux ne remplace jamais une substitution locale.** Pour chaque champ : si l’opérateur a
   personnalisé un champ d’une entrée (dans la map `localOverrides`, indexée par
   `provider:modelId`), la valeur du flux pour ce champ précis est ignorée — la valeur de
   l’opérateur prévaut.
2. **`enabled: false` désactive l’entrée, avec indication de provenance.** Une entrée du flux qui
   désactive une entrée définit `enabled: false` et `disabledBy: "radar"` dans le résultat fusionné,
   afin que l’interface puisse expliquer _pourquoi_ une entrée est passée de disponible à désactivée.
3. **Une entrée ajoutée par l’utilisateur et absente du flux est conservée sans modification.**
   Les entrées qui existent uniquement dans la base de référence (ou qui ont été ajoutées localement)
   et qui n’ont aucune entrée correspondante dans le flux sont conservées telles quelles.
4. **Une entrée marquée par une pierre tombale n’est jamais ressuscitée.** Si l’opérateur a
   explicitement supprimé une entrée (ensemble `tombstones`), le fait que le flux ajoute à nouveau
   ce `provider:modelId` dans une version ultérieure ne la rétablit pas.

Les champs modifiables et les pierres tombales sont conservés dans
`radar_local_model_state` (migration `153_radar_local_model_state.sql`). L’adaptateur de base de
données public (`src/lib/db/radar.ts`) convertit ces lignes en map `localOverrides` et en ensemble
`tombstones` utilisés par `applyFeed()` ; en production, `getRadarCatalog()` charge cet état une fois
les contrôles du drapeau, du cache et du schéma validés. Seuls `displayName` et `enabled` peuvent
être modifiés par l’opérateur. L’identité du fournisseur et du modèle, la provenance du flux, le
quota, les capacités, les conditions d’utilisation et les données de configuration ne peuvent pas
être modifiés par cette interface.

Le tableau de bord propose quatre actions locales :

- **Modifier** change le nom d’affichage local et l’état d’activation.
- **Réinitialiser les modifications locales** efface les deux champs modifiables sans changer
  une pierre tombale.
- **Masquer** crée une pierre tombale afin que les mises à jour ultérieures du flux ne puissent
  pas recréer la ligne.
- **Restaurer** supprime la pierre tombale ; toute substitution enregistrée séparément reste
  applicable.

Une valeur `enabled: false` provenant du flux demeure l’exception de sécurité : elle prévaut sur
une valeur locale obsolète `enabled: true`, maintient l’entrée fusionnée désactivée et enregistre
`disabledBy: "radar"`.

Les publications du catalogue utilisent `schemaVersion: 2`. `contextWindow` ainsi que chacun des
champs `tools`, `vision` et `thinking` sont indépendamment de type `number | null` /
`boolean | null` : `null` signifie « inconnu », tandis que `false` signifie qu’une source officielle
du fournisseur, confirmée selon D16, indique explicitement que la capacité est absente. Les drapeaux
internes du registre ou des spécifications de modèles d’OmniRoute ne sont jamais directement promus
au rang de faits du flux. Le client accepte toujours les instantanés v1 ; comme l’ancien générateur
utilisait `false` comme valeur de remplacement en cas d’absence, une valeur v1 `false` est normalisée
en « inconnu », tandis qu’une valeur v1 `true` reste factuelle. Les versions de schéma inconnues
échouent de manière sécurisée et le dernier cache valide reste disponible. Chaque modèle v2 doté
d’un contexte ou d’une capacité non nul doit comporter un tableau `metadataEvidenceUrls[]` contenant
des URL HTTPS ne nécessitant aucun identifiant ; sinon, la validation du schéma échoue et le cache
n’est pas remplacé. Le tableau du catalogue affiche les trois états sous la forme `✓`, `✕` et `?`.

### Combinaisons guidées et accès MCP

Les valeurs `familyId` confirmées sont conservées dans la surcouche appliquée lors de la lecture et
pilotent le module pur `buildRadarComboSuggestions()` (`src/lib/radar/comboSuggestions.ts`). Une
famille n’est suggérée que lorsque les connexions d’au moins deux fournisseurs distincts sont actives
et que ceux-ci exposent l’identifiant exact du modèle sélectionné. Les modèles désactivés, les
fournisseurs inactifs, les identifiants de modèle manquants, les familles à membre unique et les
correspondances ambiguës d’alias ou de préfixes échouent de manière sécurisée. Les suggestions
utilisent la stratégie `priority` existante, en classant d’abord le budget mensuel récurrent le plus
élevé ; l’interface les crée uniquement via `POST /api/combos`.

L’interface utilisateur guidée se trouve à l’emplacement `/dashboard/radar/combos`. Elle lit uniquement les points de terminaison locaux
`GET /api/radar/catalog` et `GET /api/combos/builder/options`. Elle ne déclenche jamais de synchronisation Radar,
ne lit pas les identifiants du fournisseur et n’écrit pas directement dans la base de données des combos.

Les clients MCP peuvent lire la même projection locale avec `omniroute_radar_catalog` (`read:radar`). Les
filtres facultatifs `provider`, `familyId` et `enabledOnly` sont évalués après une lecture locale unique via
`GET /api/radar/catalog`. Sa sortie fermée inclut les métadonnées du catalogue ainsi que le fournisseur/modèle,
le nom d’affichage, `familyId`, le quota, les fonctionnalités, l’état d’activation, l’origine et `disabledBy` ; les URL de configuration,
les étapes, les connexions, les adresses e-mail, les clés et les données de parrainage ne sont jamais renvoyées. Cet outil est
en lecture seule et n’appelle jamais `/api/radar/sync`.

### Marqueurs de provenance

Chaque entrée fusionnée comporte un champ `origin` que l’interface utilisateur affiche sous forme de badge :

- `"baseline"` — inchangée par rapport au catalogue statique de la version.
- `"radar"` — un ou plusieurs champs ont été actualisés par le flux.
- `"local"` — l’opérateur a défini au moins une substitution locale pour cette entrée (les
  substitutions locales prévalent toujours sur le flux conformément à la règle 1, indépendamment de ce qu’indique le flux).

---

## Surfaces locales — jamais un proxy de flux

Les familles de routes Radar locales ci-dessous prennent en charge l’interface utilisateur sous `src/app/api/radar/` :

| Route                          | Méthode | Objectif                                                                                                                                  |
| ------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `/api/radar/catalog`           | GET     | Renvoie le catalogue fusionné (`getRadarCatalog()`) depuis le cache local.                                                                |
| `/api/radar/sync`              | POST    | Déclenche `syncRadar()` côté serveur ; renvoie l’état obtenu.                                                                             |
| `/api/radar/settings`          | GET     | Renvoie `{ optIn, hasSupporterKey, supporterKeyMasked }` — jamais la clé brute.                                                           |
| `/api/radar/settings`          | POST    | Définit le consentement et/ou la clé de soutien (chiffrée).                                                                               |
| `/api/radar/referrals`         | GET     | Renvoie `{ fixed, campaigns, tier }` depuis le cache local — voir [Liens de parrainage](#referral-links-free-credits) ci-dessous.         |
| `/api/radar/offers`            | GET     | Renvoie les offres actives depuis le cache dynamique local vérifié ; ne renvoie jamais la clé de soutien.                                 |
| `/api/radar/offers/sync`       | POST    | Déclenche le pipeline `syncRadarOffers()` côté serveur, réservé aux clés dynamiques.                                                      |
| `/api/radar/intel`             | GET     | Renvoie les données Intel dynamiques locales vérifiées ainsi qu’un booléen de reconnaissance du soutien ; jamais une identité ni une clé. |
| `/api/radar/intel/sync`        | POST    | Déclenche le pipeline `syncRadarIntel()` côté serveur, réservé aux clés dynamiques.                                                       |
| `/api/radar/status`            | GET     | Renvoie l’état local en lecture seule des paramètres/du cache pour le catalogue, les parrainages, les offres et Intel, sans secrets.      |
| `/api/radar/sync-all`          | POST    | Exécute les quatre modules de synchronisation côté serveur et renvoie un état distinct pour chaque flux.                                  |
| `/api/radar/local-model-state` | GET     | Répertorie les remplacements persistants et les marqueurs de suppression pour les contrôles de modification/restauration.                 |
| `/api/radar/local-model-state` | PATCH   | Définit ou efface les champs de remplacement validés `displayName`/`enabled`.                                                             |
| `/api/radar/local-model-state` | PUT     | Crée ou supprime un marqueur de suppression avec `{ provider, modelId, tombstoned }`.                                                     |
| `/api/radar/local-model-state` | DELETE  | Efface les champs de remplacement modifiables tout en préservant tout marqueur de suppression.                                            |

**Règle stricte : ces routes ne servent jamais de proxy au service de flux.** Le navigateur communique uniquement
avec le serveur OmniRoute local. Les quatre modules qui communiquent avec le service Radar sont
`src/lib/radar/sync.ts` (catalogue), `src/lib/radar/referralsSync.ts` (parrainages) et
`src/lib/radar/offersSync.ts` (offres), ainsi que `src/lib/radar/intelSync.ts` (Intel) ; ils s’exécutent tous
côté serveur, jamais côté client. Cela permet de préserver entièrement
l’URL du flux et toute clé de soutien du trafic réseau exposé au client.

Tous les points de terminaison Radar renvoient `404` lorsque `RADAR_ENABLED` est désactivé (voir
[Indicateur](#flag-radar_enabled-default-off) ci-dessus), et font passer les réponses d’erreur par
`buildErrorBody()`/`sanitizeErrorMessage()` conformément à la règle d’assainissement des erreurs applicable à l’ensemble du dépôt
(`docs/security/ERROR_SANITIZATION.md`).

### Authentification

Tous les points de terminaison Radar nécessitent une authentification via `isAuthenticated()`
(`src/shared/utils/apiAuth.ts`) — un cookie de session du tableau de bord ou une clé API limitée
à la gestion, soit le même contrôle d’accès que celui qui protège le reste de `/api/settings/*`. La vérification
`404` lorsque l’indicateur est désactivé s’exécute toujours **avant** la vérification d’authentification, afin qu’une installation où `RADAR_ENABLED`
est désactivé reste identique octet pour octet (aucune invite d’authentification uniquement pour découvrir que la surface n’existe pas) ;
une fois l’indicateur activé, une requête non authentifiée reçoit `401` avant toute lecture ou
écriture dans la base de données. `GET /api/radar/settings` ne renvoie jamais la clé de soutien brute, quel que soit
l’état d’authentification — uniquement sa forme masquée et un booléen `hasSupporterKey`.

---

## Offres pour les soutiens

Les offres utilisent leur propre artefact signé, `GET /v1/offers/latest`, et ne partagent jamais le cache du catalogue ou des parrainages. Le point de terminaison du serveur exige une clé Bearer de soutien active et valide ; aucun repli communautaire n’est prévu. `syncRadarOffers()` s’arrête donc avant toute requête réseau lorsque l’indicateur de fonctionnalité est désactivé, que l’opérateur n’a pas donné son consentement ou qu’aucune clé de soutien n’est configurée.

Après une requête GET réussie, le client vérifie la signature Ed25519 sur les octets exacts de la réponse, valide `RadarOffersFeedSchema`, exige que le corps signé et l’en-tête `x-omniroute-feed-tier` indiquent tous deux `live`, impose une version pointée strictement plus récente, puis, et seulement alors, remplace atomiquement `radar_offers_cache` (migration `144_radar_offers_cache.sql`). La même limite de 10 Mo, incluant les en-têtes et le flux, que celle utilisée par les autres flux s’applique. Les échecs liés à la signature, au schéma, au niveau, à la relecture, à la taille, au protocole HTTP et au réseau préservent tous le dernier cache vérifié.

La structure fermée des offres prend en charge trois types d’avantages comparables : un pourcentage en points de base, un crédit en unités monétaires mineures ou des jours d’essai. Une offre partenaire doit inclure une référence publique du même type, et son avantage doit être strictement supérieur ; les offres officielles n’ont pas de référence partenaire. Les URL doivent utiliser HTTPS et ne contenir aucun identifiant. `getRadarOffers()` revalide par précaution la charge utile mise en cache et filtre les entrées expirées à chaque lecture locale ; `/dashboard/radar/offers` filtre à nouveau les expirations avant l’affichage, utilise le texte portugais lorsqu’il est disponible avec un repli sur l’anglais et identifie explicitement les offres partenaires.

Le navigateur appelle uniquement des routes locales : il lit l’instantané masqué des paramètres, demande à `POST /api/radar/offers/sync` d’effectuer l’actualisation côté serveur, puis lit `GET /api/radar/offers`. En l’absence de clé, il affiche les liens existants de contribution et de soutien au lieu de tenter une requête vers le flux. Les liens externes vers les offres s’ouvrent dans un nouvel onglet avec `noopener noreferrer`. Aucun outil MCP `radar_offers` n’est exposé dans cette version.

---

## Radar Intel, badge de soutien et CLI

Intel est un artefact signé accessible à l’adresse `GET /v1/intel/latest`. Le schéma fermé `RadarIntelFeedSchema` accepte uniquement les classements ELO détenus par Radar, établis par le curateur privé à partir de comparaisons confirmées, ainsi que les écarts factuels d’ancienneté et de nombre dans le catalogue, calculés à partir d’instantanés signés du catalogue. La méthodologie est fixée à une note initiale de 1000 et à K=32. Un classement vide est valide lorsqu’aucune comparaison n’a été confirmée ; le client n’en synthétise jamais.

`syncRadarIntel()` applique les mêmes mécanismes que pour les offres : Bearer côté serveur, délai d’expiration de 30 secondes, limite de flux de 10 Mio, vérification Ed25519 des octets exacts, schéma strict, exigence de la valeur `live` dans le corps et l’en-tête, version minimale et préservation du dernier cache valide. Après la persistance d’un instantané actif vérifié, le client dérive `radar:<sha256(supporter key)>`, stocke uniquement cette identité à sens unique et émet l’événement de reconnaissance dédié `radar_supporter`. Son badge `radar-supporter` est idempotent et attribue zéro XP ; il ne met jamais à jour les classements et ne réutilise pas `token_share`. `/dashboard/radar/intel` affiche le badge uniquement à partir des métadonnées vérifiées du cache local.

La CLI expose `omniroute radar status` et `omniroute radar sync`. Ces deux commandes communiquent uniquement avec l’API OmniRoute locale. `status` effectue une requête en lecture seule `GET /api/radar/status` ; `sync` envoie une seule requête `POST /api/radar/sync-all` et affiche un résultat pour chaque flux. Aucune des deux commandes ne lit, n’accepte ou n’affiche la clé de soutien, et aucune ne contacte directement le service Radar.

---

## Liens de parrainage (crédits gratuits)

Les liens de parrainage sont fournis par un flux **autonome et toujours à jour** —
`GET /v1/referrals/latest` — distinct du flux du catalogue. Ce choix est délibéré : le
flux du catalogue de l’offre communautaire est un instantané pouvant dater de 30 jours,
si bien qu’un lien de parrainage qui en était extrait accusait auparavant le même retard
par rapport à la véritable liste de liens du serveur (un lien de parrainage nouvellement
ajouté pouvait mettre jusqu’à un mois à parvenir à un utilisateur de l’offre
gratuite/communautaire). Le flux des parrainages élimine ce délai en se synchronisant
selon sa propre cadence, beaucoup plus courte.

```ts
// Corps de la réponse à GET /v1/referrals/latest (signé avec Ed25519, même clé
// épinglée que pour le flux du catalogue) :
{
  feed: "omniroute-radar-referrals",
  schemaVersion: 1,
  generatedAt: string,           // ISO — déterministe : max(updatedAt) parmi les liens
                                  // de parrainage, afin que deux requêtes identiques produisent
                                  // exactement les mêmes octets signés/la même signature
  referrals: {
    fixed: RadarReferral[],      // présent dans TOUTES les offres, y compris sans authentification/communautaire
    campaigns: RadarReferral[],  // renseigné uniquement avec une clé Bearer active (supporter)
                                  // et valide ; les requêtes sans authentification/avec une clé expirée obtiennent []
  },
}
// RadarReferral = { provider, url, kind: "fixo" | "campanha", validUntil,
//                    requiredAction, isDefault }
```

Contrairement au flux du catalogue, ce corps ne contient aucun champ `tier` — le serveur
décide de ce qu’il inclut pour chaque requête en fonction de la clé `Authorization`.
L’en-tête de réponse `x-omniroute-feed-tier` est donc l’UNIQUE source indiquant l’offre
servie (`referralsSync.ts::syncRadarReferrals`) ; un en-tête absent ou non reconnu est
ramené à `"community"`, l’hypothèse accordant le moins de privilèges.
`RadarReferralsFeedSchema` (`src/lib/radar/referralsFeedSchema.ts`) valide l’intégralité
du corps en réutilisant le même `RadarReferralSchema` par parrainage exporté depuis
`feedSchema.ts`, afin que les deux flux valident chaque parrainage de manière identique.
Chaque `RadarReferral.url` doit utiliser `https://` — une URL en `http://` échoue à la
validation du schéma.

L’ANCIEN champ `referrals` intégré au catalogue dans `RadarFeedSchema`
(`feedSchema.ts`) est conservé pour assurer la rétrocompatibilité avec les flux de
catalogue déjà mis en cache, mais `getRadarReferrals()` ne le lit plus — voir
[Accesseur](#accessor) ci-dessous.

### Synchronisation

`syncRadarReferrals()` (`src/lib/radar/referralsSync.ts`) est l’UNIQUE module qui accède
au réseau pour les parrainages, en reproduisant exactement le contrat de `syncRadar()` :
indicateur désactivé → `disabled` ; consentement refusé → `opt_out` ; télécharge
`${RADAR_FEED_URL}/v1/referrals/latest` (avec les mêmes substitutions
`RADAR_FEED_URL`/`RADAR_FEED_PUBKEY` pour les forks que le catalogue), vérifie la
signature Ed25519 sur les octets exacts de la réponse (`verifyFeedBytes`), effectue la
validation avec `RadarReferralsFeedSchema`, puis met le résultat en cache dans la table
`radar_referrals_cache` (migration `142_radar_referrals_cache.sql`) — une table
entièrement distincte de `radar_feed_cache`, utilisée par le catalogue. Une limite de
10 Mo pour la réponse et une borne inférieure sur `generatedAt` rejettent tout flux
entrant plus ancien que celui mis en cache, protégeant ainsi contre la réexécution d’un
artefact signé antérieur. Un horodatage identique est accepté : le serveur attribue
intentionnellement le même `generatedAt` déterministe aux variantes communautaire et
active des parrainages, afin que la charge utile signée et l’offre servie puissent
changer après une modification de la clé supporter sans que l’ensemble de liens
sous-jacent ne change. Ne lève jamais d’exception — renvoie toujours un objet de statut ;
les erreurs n’incluent jamais de trace de pile dans `reason`.

Deux déclencheurs maintiennent le cache des parrainages à jour, tous deux indépendants
de la cadence de 24 h propre au catalogue :

- **Synchronisation à la lecture** — `GET /api/radar/referrals` appelle lui-même
  `syncRadarReferrals()` en ligne chaque fois que le cache est absent ou plus ancien que
  `REFERRALS_STALE_MS` (1 h, `shouldSyncReferralsOnRead()`), avant de renvoyer la
  réponse. C’est ce qui permet aux liens fixes d’être « toujours à jour » dès le
  prochain chargement du tableau de bord, sans attendre un quelconque minuteur
  d’arrière-plan.
- **Synchronisation auxiliaire du planificateur** — `radarSchedulerTick()`
  (`scheduler.ts`) évalue indépendamment l’ancienneté des parrainages lors du même
  déclenchement horaire que celui utilisé pour le catalogue, en appelant
  `syncRadarReferrals()` lorsque nécessaire. Cette opération s’exécute même si le
  catalogue ne devait pas être synchronisé lors de ce déclenchement et ne modifie
  jamais la structure de `RadarTickResult` (simple effet secondaire au mieux,
  erreurs ignorées).

### Accesseur

`src/lib/radar/index.ts` exporte deux accesseurs en lecture seule, qui ne lèvent jamais
d’exception (même contrat défensif que `getRadarCatalog()` — indicateur désactivé,
absence de cache ou charge utile mise en cache corrompue produisent tous la structure
vide plutôt qu’une erreur) :

- `getRadarReferrals()` → `{ fixed: RadarReferral[], campaigns: RadarReferral[] }`,
  lit les données dans `radar_referrals_cache` (via `getRadarReferralsCache()`) et les
  valide avec `RadarReferralsFeedSchema` — **pas** avec le cache du catalogue.
- `getDefaultReferralFor(provider)` → le parrainage `fixed` dont `isDefault: true` pour
  ce fournisseur, ou `null`. Recherche uniquement dans `fixed` — une campagne n’est
  jamais utilisée comme lien « par défaut » d’un fournisseur.

La règle déterminant concrètement « quel parrainage est celui par défaut d’un
fournisseur » réside dans `findDefaultReferral()`
(`src/lib/radar/referrals.ts`), une petite fonction pure **sans import de la DB** — elle
peut être importée sans risque dans un composant `"use client"`.
`getRadarReferrals`/`getDefaultReferralFor` (dans `index.ts`) importent
`@/lib/db/radar` et restent donc réservés au serveur ; le tableau de bord des
fournisseurs importe directement `referrals.ts` plutôt que `index.ts` (voir ci-dessous)
afin d’éviter d’intégrer `better-sqlite3` au bundle du navigateur.

### `GET /api/radar/referrals`

Suit exactement le même ordre de contrôles que toutes les autres routes Radar : `RADAR_ENABLED` désactivé →
`404` (vérifié en premier, inertie à l’octet près) ; non authentifié → `401` ; sinon,
déclenche une synchronisation à la lecture (voir ci-dessus) lorsque les données sont obsolètes, puis renvoie `200` avec
`{ fixed, campaigns, tier }` — `tier` provient directement de la ligne de cache (éventuellement tout juste actualisée)
et est purement informatif (il détermine le texte d’incitation non bloquante de l’interface ci-dessous). Ne
transmet jamais directement les requêtes au serveur de flux — le code source de la route ne contient aucun appel `fetch(` ;
le réseau n’est utilisé qu’à l’intérieur de `syncRadarReferrals()`, selon le même
principe d’accès exclusif au cache local que `/api/radar/catalog`.

### Interface du tableau de bord — onglet « Crédits gratuits » sur `/dashboard/radar`

Réutilise la page Radar existante (`src/app/(dashboard)/dashboard/radar/page.tsx`) sous la forme d’un
second onglet plutôt que d’une nouvelle route — cela réduit la surface de routage/i18n pour une fonctionnalité qui est une
variation des données déjà récupérées par la page. Une fois l’option activée, la barre d’onglets propose
**Catalogue** (tableau existant) et **Crédits gratuits** :

- Les liens permanents sont regroupés par fournisseur, chacun affichant `requiredAction` (lorsque présent)
  ainsi qu’un bouton `target="_blank" rel="noopener noreferrer"` pointant vers l’URL de parrainage.
- Les campagnes affichent les mêmes informations, ainsi que `validUntil` lorsque présent.
- Lorsque `campaigns` est vide **et** que le niveau servi est `community`, l’interface affiche une
  courte note d’incitation (« les campagnes à durée limitée sont un avantage réservé aux soutiens ») — cela ne masque
  **jamais** et ne restreint jamais la liste des liens permanents, qui reste entièrement renseignée pour tous les niveaux. Le
  message d’incitation est uniquement informatif et ne constitue jamais un blocage.

### Lien de parrainage sur le nom du fournisseur (tableau de bord des fournisseurs)

`ProviderPageHeader` (`src/app/(dashboard)/dashboard/providers/[id]/components/`)
liait déjà le nom du fournisseur à `providerInfo.website` lorsque celui-ci était présent, avec un
précédent pour un lien monétisé : la note relative au lien partenaire de Kimi (Moonshot AI)
(clé i18n `providers.kimiPartnerLinkNote`). D28 réutilise exactement le même modèle de note discrète
pour les parrainages Radar par défaut au lieu d’introduire une nouvelle clé.

Couplage faible, par conception :

- `resolveProviderHeaderLink()` (`src/app/(dashboard)/dashboard/providers/providerPageUtils.ts`)
  est une fonction **pure** — `(staticWebsite, referralUrl) => { website, isReferralLink }`
  — sans dépendance envers `@/lib/radar` ni `@/lib/db/*`. Le fichier `providerPageUtils.ts`
  dans son ensemble reste exempt de ces imports (ce qui est vérifié par
  `tests/unit/provider-header-referral-link.test.ts`).
- `ProviderDetailPageClient.tsx` (un composant `"use client"`) est le seul endroit autorisé
  à récupérer les données Radar — via `fetch("/api/radar/referrals")`, selon le même modèle de route locale
  que celui utilisé par la page du tableau de bord Radar elle-même — et il détermine le parrainage par défaut
  côté client avec `findDefaultReferral()` depuis `src/lib/radar/referrals.ts`, qui ne dépend pas de la base de données.
- Lorsque `RADAR_ENABLED` est désactivé, la récupération renvoie une erreur 404, `referralUrl` reste à `null` et
  `resolveProviderHeaderLink()` renvoie le `website` statique du catalogue sans modification — la
  page du fournisseur est identique à l’octet près à ce qu’elle était avant l’existence de cette fonctionnalité. Même résultat lorsqu’
  aucun cache n’existe encore ou qu’aucun parrainage par défaut n’est disponible pour ce fournisseur précis.
- Lorsqu’un parrainage par défaut s’applique, `ProviderPageHeader` reçoit `isReferralLink`
  et affiche la même note/info-bulle discrète que pour le lien partenaire Kimi (en réutilisant la
  clé `providers.kimiPartnerLinkNote`) — jamais un nouveau traitement visuel distinct.

---

## Comment auto-héberger un flux

Un fork ou un auto-hébergeur souhaitant avoir un contrôle total sur le catalogue peut exécuter son propre service de flux
sans modifier le code client :

1. Servez un point de terminaison `GET /v1/catalog/latest` renvoyant un corps JSON conforme à
   `RadarFeedSchema` (`src/lib/radar/feedSchema.ts`) — avec, au niveau supérieur, `feed:
"omniroute-radar"`, `schemaVersion: 2`, `version`, `tier`, `providers`, `models`,
   `quirks` et `totals`. Respectez `x-omniroute-radar-schema: 2` ; un serveur compatible avec la transition
   doit, par défaut, répondre aux requêtes qui ne le contiennent pas avec un artefact v1 signé séparément.
2. Signez les octets exacts de la réponse avec une paire de clés Ed25519 et renvoyez la signature
   en base64 dans l’en-tête de réponse `x-omniroute-feed-signature`.
3. Définissez `RADAR_FEED_URL` sur la nouvelle URL de base et `RADAR_FEED_PUBKEY` sur la clé
   publique correspondante (SPKI DER en base64 ou PEM) — consultez la
   [référence des variables d’environnement](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting).
4. Activez `RADAR_ENABLED` et inscrivez-vous via `POST /api/radar/settings`
   (`{ optIn: true }`).

Aucune autre modification du code n’est nécessaire — `verifyFeedBytes()` détecte automatiquement la substitution
(`getFeedPublicKeys()` dans `src/lib/radar/pinnedKeys.ts`), et la comparaison des versions,
la validation du schéma et les règles de fusion s’appliquent de façon identique à un flux
auto-hébergé.

Les liens de parrainage (voir [Liens de parrainage (crédits gratuits)](#referral-links-free-credits)
ci-dessus) constituent un artefact distinct et facultatif : un fork qui sert uniquement `/v1/catalog/latest`
reste entièrement fonctionnel — `syncRadarReferrals()` revient à `{ status: "error" }` en cas de réponse `404`
de `/v1/referrals/latest` et le cache reste simplement vide, de sorte que
`GET /api/radar/referrals` continue de renvoyer `{ fixed: [], campaigns: [], tier: null }`
au lieu de provoquer l’échec du reste de la page. Pour également proposer des liens de parrainage, servez
`GET /v1/referrals/latest` conformément à `RadarReferralsFeedSchema`
(`src/lib/radar/referralsFeedSchema.ts`) et signez-le avec la même paire de clés Ed25519 que
le flux de catalogue.

Les offres destinées aux soutiens constituent un autre artefact facultatif. Pour les servir, implémentez
`GET /v1/offers/latest` avec le schéma fermé `RadarOffersFeedSchema`
(`src/lib/radar/offersFeedSchema.ts`), exigez un droit actif, renvoyez
`x-omniroute-feed-tier: live` et signez les octets exacts avec la même clé. Un fork qui omet ce
point de terminaison conserve un comportement inchangé pour le catalogue et les parrainages ; l’actualisation des offres échoue sans effet destructeur et
le dernier cache local d’offres vérifié reste disponible.

Intel est facultatif de la même manière. Un auto-hébergeur peut servir `GET /v1/intel/latest` en utilisant
`RadarIntelFeedSchema` (`src/lib/radar/intelFeedSchema.ts`), exiger un droit actif, renvoyer
`x-omniroute-feed-tier: live` et signer les octets exacts avec la clé Ed25519 partagée. L’omission de ce
point de terminaison ne modifie pas le catalogue, les parrainages ni les offres ; l’actualisation d’Intel conserve tout dernier
instantané local vérifié.

---

## Documentation associée

- [`docs/security/ERROR_SANITIZATION.md`](../security/ERROR_SANITIZATION.md) — le
  modèle de réponse d’erreur suivi par les routes `/api/radar/*`.
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md#27-radar-feed-self-hosting)
  — référence de `RADAR_FEED_URL` / `RADAR_FEED_PUBKEY`.
