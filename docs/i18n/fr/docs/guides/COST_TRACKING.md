# Cost & Spend Tracking (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/COST_TRACKING.md) · 🇪🇹 [am](../../../am/docs/guides/COST_TRACKING.md) · 🇸🇦 [ar](../../../ar/docs/guides/COST_TRACKING.md) · 🇦🇿 [az](../../../az/docs/guides/COST_TRACKING.md) · 🇧🇬 [bg](../../../bg/docs/guides/COST_TRACKING.md) · 🇧🇩 [bn](../../../bn/docs/guides/COST_TRACKING.md) · 🇧🇦 [bs](../../../bs/docs/guides/COST_TRACKING.md) · 🇨🇿 [cs](../../../cs/docs/guides/COST_TRACKING.md) · 🇩🇰 [da](../../../da/docs/guides/COST_TRACKING.md) · 🇩🇪 [de](../../../de/docs/guides/COST_TRACKING.md) · 🇬🇷 [el](../../../el/docs/guides/COST_TRACKING.md) · 🇪🇸 [es](../../../es/docs/guides/COST_TRACKING.md) · 🇪🇪 [et](../../../et/docs/guides/COST_TRACKING.md) · 🇮🇷 [fa](../../../fa/docs/guides/COST_TRACKING.md) · 🇫🇮 [fi](../../../fi/docs/guides/COST_TRACKING.md) · 🇮🇪 [ga](../../../ga/docs/guides/COST_TRACKING.md) · 🇮🇳 [gu](../../../gu/docs/guides/COST_TRACKING.md) · 🇳🇬 [ha](../../../ha/docs/guides/COST_TRACKING.md) · 🇮🇱 [he](../../../he/docs/guides/COST_TRACKING.md) · 🇮🇳 [hi](../../../hi/docs/guides/COST_TRACKING.md) · 🇭🇷 [hr](../../../hr/docs/guides/COST_TRACKING.md) · 🇭🇺 [hu](../../../hu/docs/guides/COST_TRACKING.md) · 🇦🇲 [hy](../../../hy/docs/guides/COST_TRACKING.md) · 🇮🇩 [id](../../../id/docs/guides/COST_TRACKING.md) · 🇳🇬 [ig](../../../ig/docs/guides/COST_TRACKING.md) · 🇮🇹 [it](../../../it/docs/guides/COST_TRACKING.md) · 🇯🇵 [ja](../../../ja/docs/guides/COST_TRACKING.md) · 🇬🇪 [ka](../../../ka/docs/guides/COST_TRACKING.md) · 🇰🇭 [km](../../../km/docs/guides/COST_TRACKING.md) · 🇮🇳 [kn](../../../kn/docs/guides/COST_TRACKING.md) · 🇰🇷 [ko](../../../ko/docs/guides/COST_TRACKING.md) · 🇱🇹 [lt](../../../lt/docs/guides/COST_TRACKING.md) · 🇱🇻 [lv](../../../lv/docs/guides/COST_TRACKING.md) · 🇮🇳 [ml](../../../ml/docs/guides/COST_TRACKING.md) · 🇮🇳 [mr](../../../mr/docs/guides/COST_TRACKING.md) · 🇲🇾 [ms](../../../ms/docs/guides/COST_TRACKING.md) · 🇲🇹 [mt](../../../mt/docs/guides/COST_TRACKING.md) · 🇲🇲 [my](../../../my/docs/guides/COST_TRACKING.md) · 🇳🇵 [ne](../../../ne/docs/guides/COST_TRACKING.md) · 🇳🇱 [nl](../../../nl/docs/guides/COST_TRACKING.md) · 🇳🇴 [no](../../../no/docs/guides/COST_TRACKING.md) · 🇮🇳 [or](../../../or/docs/guides/COST_TRACKING.md) · 🇮🇳 [pa](../../../pa/docs/guides/COST_TRACKING.md) · 🇵🇭 [phi](../../../phi/docs/guides/COST_TRACKING.md) · 🇵🇱 [pl](../../../pl/docs/guides/COST_TRACKING.md) · 🇵🇹 [pt](../../../pt/docs/guides/COST_TRACKING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/COST_TRACKING.md) · 🇷🇴 [ro](../../../ro/docs/guides/COST_TRACKING.md) · 🇷🇺 [ru](../../../ru/docs/guides/COST_TRACKING.md) · 🇱🇰 [si](../../../si/docs/guides/COST_TRACKING.md) · 🇸🇰 [sk](../../../sk/docs/guides/COST_TRACKING.md) · 🇸🇮 [sl](../../../sl/docs/guides/COST_TRACKING.md) · 🇷🇸 [sr](../../../sr/docs/guides/COST_TRACKING.md) · 🇸🇪 [sv](../../../sv/docs/guides/COST_TRACKING.md) · 🇰🇪 [sw](../../../sw/docs/guides/COST_TRACKING.md) · 🇮🇳 [ta](../../../ta/docs/guides/COST_TRACKING.md) · 🇮🇳 [te](../../../te/docs/guides/COST_TRACKING.md) · 🇹🇭 [th](../../../th/docs/guides/COST_TRACKING.md) · 🇹🇷 [tr](../../../tr/docs/guides/COST_TRACKING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/COST_TRACKING.md) · 🇵🇰 [ur](../../../ur/docs/guides/COST_TRACKING.md) · 🇺🇿 [uz](../../../uz/docs/guides/COST_TRACKING.md) · 🇻🇳 [vi](../../../vi/docs/guides/COST_TRACKING.md) · 🇳🇬 [yo](../../../yo/docs/guides/COST_TRACKING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/COST_TRACKING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/COST_TRACKING.md)

---

Comment OmniRoute estime, enregistre et présente le coût de chaque requête — et pourquoi le
chiffre du tableau de bord est un **indicateur d’économies**, et non une facture.

Voir aussi : [Guide de l’utilisateur](./USER_GUIDE.md) · [Galerie des fonctionnalités](./FEATURES.md)

---

## Ce que c’est (et ce que ce n’est pas)

OmniRoute attribue un coût en USD à chaque requête de complétion en multipliant le nombre
de jetons par les tarifs du modèle. Ces chiffres alimentent le tableau de bord **Coûts**,
les commandes CLI `omniroute cost` / `omniroute usage`, les exportations CSV/JSON et les
budgets par clé API.

> **Le « coût » du tableau de bord est un indicateur d’économies, pas une facture.** OmniRoute
> ne vous facture jamais — il achemine vos requêtes vers des fournisseurs que vous avez
> déjà connectés (vos propres abonnements, offres gratuites et clés API). Un « coût total
> de 290 $ » entièrement cumulé sur des modèles gratuits signifie qu’environ **290 $ n’ont
> _pas_ été payés** à une API payante. Ce chiffre est une _estimation_ de ce que le même
> trafic aurait coûté aux tarifs catalogue standard, afin que vous puissiez voir où se
> concentre votre utilisation et combien l’acheminement vers des fournisseurs moins chers
> ou gratuits vous fait économiser.

Cette présentation est indiquée directement dans le fichier [README](../../README.md) du
projet (« le “coût” du tableau de bord est un indicateur d’économies, pas une facture »).

Comme ce chiffre est une estimation :

- Il dépend de la grille tarifaire dont OmniRoute dispose pour chaque modèle. Un modèle
  sans entrée tarifaire contribue un coût de `0` (il apparaît comme une ligne
  « Ancien / Gratuit » dans l’explorateur).
- Le trafic relevant d’une offre gratuite ou d’un abonnement cumule tout de même un coût
  _estimé_ — il s’agit du montant que vous économisez, et non d’un montant dû.

---

## Comment les coûts sont estimés

### La source des tarifs

Les coûts proviennent d’une grille tarifaire déterminée selon l’ordre de priorité suivant
([`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)) :

1. **Remplacements définis par l’utilisateur** — les prix que vous définissez dans le tableau de bord ou via `PATCH /api/pricing`.
2. **Tarifs externes synchronisés** — récupérés depuis le fichier public
   `model_prices_and_context_window.json` de LiteLLM lorsque la synchronisation est activée
   (stockés dans un espace de noms `pricing_synced` distinct afin de ne jamais écraser vos
   remplacements).
3. **Valeurs par défaut codées en dur** — fournies avec OmniRoute.

La synchronisation des tarifs externes est **facultative** et désactivée par défaut. Variables
d’environnement concernées (voir [`.env.example`](../../.env.example)) :

| Variable d’environnement | Valeur par défaut | Rôle                                                                                         |
| ------------------------ | ----------------- | -------------------------------------------------------------------------------------------- |
| `PRICING_SYNC_ENABLED`   | `false`           | Active la synchronisation des tarifs LiteLLM en arrière-plan au démarrage.                   |
| `PRICING_SYNC_INTERVAL`  | `86400`           | Intervalle de synchronisation en **secondes** (quotidien par défaut).                        |
| `PRICING_SYNC_SOURCES`   | `litellm`         | Liste de sources séparées par des virgules (seul `litellm` est actuellement pris en charge). |

### La formule de calcul du coût

Le coût est calculé pour chaque requête à partir du nombre de jetons et des tarifs par
million de jetons dans
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
(`computeCostFromPricing` / `calculateCost`) :

- **Jetons d’entrée** (moins les lectures du cache et les jetons de création du cache) × tarif `input`.
- **Jetons lus dans le cache** × tarif `cached` (utilise le tarif d’entrée à défaut).
- **Jetons de création du cache** × tarif `cache_creation` (utilise le tarif d’entrée à défaut).
- **Jetons de sortie** × tarif `output`.
- **Jetons de raisonnement** × tarif `reasoning` (utilise le tarif de sortie à défaut).

Tous les tarifs sont interprétés en USD pour 1 000 000 de jetons. Un niveau de service
Codex `"fast"`/`"priority"` ou `"flex"` applique un multiplicateur de coût
(`getCodexFastCostMultiplier`) — par exemple, `"flex"` bénéficie d’une réduction de 50 %
sur les jetons, présentée comme des **économies flex** dans le tableau de bord.

Les noms de modèles sont d’abord normalisés (les préfixes de chemin de fournisseur tels
que `openai/` ou `accounts/fireworks/models/` sont supprimés) afin que les lignes
historiques correspondent toujours à un tarif.

### Comment les dépenses sont enregistrées

- Le coût par requête est calculé après la réponse et enregistré sans attendre le résultat,
  afin de ne jamais ajouter de latence pour le client. La consommation du quota partagé
  est planifiée au prochain tour de la boucle d’événements via
  [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- Les dépenses des clés API sont mises en mémoire tampon et écrites par lots par
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (intervalle d’écriture par défaut
  de 60 s, mémoire tampon de 1 000 entrées). Paramétrable via :

  | Variable d’environnement            | Valeur par défaut | Rôle                                                       |
  | ----------------------------------- | ----------------- | ---------------------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000`           | Intervalle d’écriture en millisecondes.                    |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`            | Nombre maximal d’entrées en mémoire tampon avant écriture. |

Les chiffres de coût du tableau de bord ne sont **pas** lus depuis un montant en dollars
stocké pour chaque ligne — ils sont recalculés à la volée à partir du nombre de jetons et
de la grille tarifaire actuelle chaque fois que le point de terminaison analytique est
exécuté. Cela signifie que la correction d’un tarif erroné (et une nouvelle
synchronisation) met à jour rétroactivement les estimations de coûts historiques.

---

## Tableau de bord : la page Coûts

La page **Coûts** se trouve à l’adresse `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Sa vue principale est l’onglet **Vue d’ensemble des coûts**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
qui charge toutes les données depuis `GET /api/usage/analytics`.

Ce qu’elle affiche :

- **Tuiles de dépenses** — dépenses estimées pour _Aujourd’hui (1d)_, _7d_, _30d_ et la
  période sélectionnée. Sélecteur de période : `7d`, `30d`, `90d`, `all`.
- **Indicateurs principaux** — requêtes sur la période, fournisseurs actifs, modèles actifs,
  coût moyen par requête.
- **Explorateur de coûts** — un tableau triable/filtrable regroupé par **fournisseur**,
  **modèle**, **clé API**, **compte** ou **niveau de service**, avec le coût, les requêtes,
  les jetons, le coût moyen par requête et la part en % du total.
- **Utilisation des jetons** — jetons totaux / d’entrée / de sortie et ratio entrée:sortie.
- **Efficacité du routage** — nombre de replis, taux de repli et couverture du modèle demandé.
- **Prévision mensuelle** — projette les dépenses de fin de mois à partir de la moyenne
  quotidienne récente.
- **Comparaison des périodes** — variation en % entre la première et la seconde moitié de la
  période.
- **Graphiques** — tendance quotidienne des coûts, part des fournisseurs (camembert),
  principaux fournisseurs, principaux modèles, coût par clé API, coût par compte, profil
  d’utilisation hebdomadaire et carte thermique de l’activité.
- **Exportation** — téléchargement de la période actuelle au format **CSV** ou **JSON** (les
  boutons apparaissent dès que les données de coût sont non nulles).

Lorsqu’il n’y a aucun trafic tarifé, les lignes affichent une étiquette « Hérité / Gratuit »
au lieu de `$0`, conformément au modèle de suivi des économies.

### Sous-pages associées aux coûts

La section Coûts comprend également les pages suivantes (toutes sous
`/dashboard/costs/`) :

- **Tarification** (`/dashboard/costs/pricing`) — consulter et remplacer les tarifs par
  modèle (affiche l’onglet Tarification partagé).
- **Budget** (`/dashboard/costs/budget`) — définir des limites de dépenses par périmètre
  (affiche l’onglet Budget partagé).
- **Partage de quota** (`/dashboard/costs/quota-share`) — pools de quotas partagés et vues
  du taux de consommation.

---

## Points de terminaison de l’API

Tous nécessitent une authentification de gestion (boucle locale/JWT, via
`requireManagementAuth`), sauf indication contraire.

### Analyses de l’utilisation et des coûts

| Méthode | Point de terminaison     | Objectif                                                                                                                                                                                       |
| ------- | ------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/usage/analytics`   | Analyses complètes des coûts/de l’utilisation : résumé, tendance quotidienne, par fournisseur/modèle/clé API/compte/niveau. Requête : `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`   | `/api/usage/utilization` | Utilisation des quotas par fournisseur au fil du temps. Requête : `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                                 |
| `GET`   | `/api/usage/history`     | Lignes brutes de l’historique d’utilisation.                                                                                                                                                   |
| `GET`   | `/api/usage/call-logs`   | Journaux d’appels par requête (modèle, jetons, coût, latence, statut).                                                                                                                         |
| `GET`   | `/api/usage/quota`       | État des quotas des fournisseurs.                                                                                                                                                              |
| `GET`   | `/api/usage/proxy-logs`  | Journaux des requêtes du proxy.                                                                                                                                                                |

### Budgets

| Méthode | Point de terminaison     | Objectif                                                                                                   |
| ------- | ------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/usage/budget`      | Résumé des coûts + contrôle du budget pour une clé API (`apiKeyId` requis comme paramètre de requête).     |
| `POST`  | `/api/usage/budget`      | Définir les limites quotidiennes/hebdomadaires/mensuelles en USD + le seuil d’avertissement d’une clé API. |
| `GET`   | `/api/usage/budget/bulk` | Résumés groupés des budgets pour plusieurs clés API.                                                       |

> L’API de budget est limitée à chaque **clé API** (`apiKeyId`). Les limites renvoyées par
> `GET /api/usage/budget` comprennent `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> un `warningThreshold` et les totaux cumulés (`totalCostToday`, `totalCostMonth`, …).

### Tarification

| Méthode  | Point de terminaison    | Objectif                                                                                                                                         |
| -------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/pricing`          | Tarification fusionnée actuelle (utilisateur + synchronisée + valeurs par défaut). `?includeSources=1` pour afficher la source de chaque entrée. |
| `PATCH`  | `/api/pricing`          | Remplacer la tarification pour `{ provider: { model: { input, output, cached, … } } }`.                                                          |
| `DELETE` | `/api/pricing`          | Réinitialiser la tarification aux valeurs par défaut (éventuellement limitée par `?provider=&model=`).                                           |
| `GET`    | `/api/pricing/defaults` | Afficher les tarifs de repli par défaut par million.                                                                                             |
| `GET`    | `/api/pricing/models`   | Tarification indexée par modèle.                                                                                                                 |
| `POST`   | `/api/pricing/sync`     | Déclencher une synchronisation manuelle depuis des sources externes (LiteLLM).                                                                   |
| `GET`    | `/api/pricing/sync`     | État actuel de la synchronisation.                                                                                                               |
| `DELETE` | `/api/pricing/sync`     | Effacer toutes les données tarifaires synchronisées.                                                                                             |

### Autres points de terminaison liés aux coûts

| Méthode | Point de terminaison          | Objectif                                                                             |
| ------- | ----------------------------- | ------------------------------------------------------------------------------------ |
| `GET`   | `/api/free-tier/summary`      | Total des jetons des modèles gratuits, utilisation du mois et quota gratuit restant. |
| `GET`   | `/api/quota/pools/[id]/usage` | Utilisation d’un pool de quotas partagés.                                            |

---

## CLI

La CLI d’OmniRoute fournit des commandes relatives aux coûts, à l’utilisation et à la tarification (enregistrées dans
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Un rapport de coûts agrégé à partir de `/api/usage/analytics`.

```bash
omniroute cost                          # 30 derniers jours, regroupés par fournisseur
omniroute cost --period 7d              # 7 derniers jours
omniroute cost --group-by model         # regrouper par provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Colonnes : groupe, requêtes, jetons en entrée/sortie, coût (USD) et % du total. Une ligne de total général
est affichée à la fin (masquée avec `--quiet` ou `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # récapitulatif des coûts par fournisseur
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Budgets
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` lit `GET /api/pricing/defaults`. Pour modifier plutôt les prix de modèles individuels,
> utilisez la page **Tarification** du tableau de bord ou `PATCH /api/pricing`.

---

## Dépannage

- **Tous les coûts affichent 0 $ / « Legacy / Free ».** Les modèles utilisés ne disposent d’aucune entrée tarifaire.
  Activez la synchronisation externe (`PRICING_SYNC_ENABLED=true`) et exécutez `omniroute pricing sync`, ou
  définissez les prix manuellement via la page Tarification / `PATCH /api/pricing`.
- **Le prix d’un modèle historique est incorrect.** Corrigez le prix (par remplacement ou resynchronisation) — le coût est
  recalculé à partir du nombre de jetons à chaque lecture des données analytiques, les estimations sont donc mises à jour rétroactivement.
- **Les dépenses sont actualisées avec un décalage par rapport au temps réel.** Les dépenses par clé sont traitées par lots ; réduisez
  `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` si vous avez besoin de données plus récentes.

---

Pour savoir comment ces fonctionnalités s’intègrent au tableau de bord dans son ensemble, consultez le [Guide de l’utilisateur](./USER_GUIDE.md) et
la [Galerie des fonctionnalités](./FEATURES.md).
