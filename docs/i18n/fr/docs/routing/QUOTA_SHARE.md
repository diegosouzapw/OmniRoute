# Quota Sharing Engine (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇧🇦 [bs](../../../bs/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇰🇷 [ko](../../../ko/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **Référence du document** : `docs/routing/QUOTA_SHARE.md`
> Fait partie du groupe B (plans 16 + 22).

---

## Vue d’ensemble

Le moteur de partage des quotas répartit équitablement le quota temporel d’un fournisseur (par exemple, une fenêtre Codex de 5 heures ou 1 500 requêtes/h pour Kimi) entre plusieurs clés API partageant la même connexion.

**Problème résolu :** OmniRoute utilise de nombreuses clés API avec un même compte fournisseur en amont. Sans logique de partage, un pic de requêtes provenant de la clé A peut épuiser le quota du fournisseur pour l’heure, laissant les clés B et C bloquées jusqu’à la réinitialisation de la fenêtre. Le moteur empêche cela en :

1. Suivant la consommation glissante de chaque clé pour chaque dimension (%, requêtes, jetons, $).
2. Appliquant un algorithme de partage équitable conservant la capacité : une clé peut emprunter sur les parts inutilisées tant que le pool global n’est pas saturé.
3. Appliquant le résultat dans le chemin critique (`chatCore.ts`) avant que la requête n’atteigne l’exécuteur en amont.

---

## Algorithme : partage équitable conservant la capacité

Implémenté dans `src/lib/quota/fairShare.ts`.

### Modes

| Condition                                  | Mode         | Comportement                                                            |
| ------------------------------------------ | ------------ | ----------------------------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **Généreux** | La clé peut emprunter jusqu’à la limite globale moins le total consommé |
| `globalUsedPercent >= saturationThreshold` | **Strict**   | Applique strictement la part équitable individuelle                     |

Valeur par défaut : `saturationThreshold = 0.5` (env `QUOTA_SATURATION_THRESHOLD`).

### Décision par dimension

Pour chaque dimension active du pool, le moteur calcule :

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = valeur glissante actuelle pour cette clé (depuis QuotaStore.peek)
remaining       = fairShareAllowed - consumed
```

Ensuite :

- **`policy = hard`** : si `consumed > fairShareAllowed` et que le mode est strict → **bloquer**.
- **`policy = soft`** : si `consumed > fairShareAllowed` et que le mode est strict → **pénaliser** (réduire la priorité dans la combinaison ; ne jamais bloquer complètement).
- **`policy = burst`** : autoriser tant qu’une marge globale est disponible, indépendamment de la part équitable.

### Plafond absolu

`capValue` + `capUnit` sur une allocation constituent un plafond strict, indépendant du mode ou de la politique. Toute dimension pour laquelle `consumed >= capValue` **bloque** toujours la requête.

### Vérification multidimensionnelle

Une requête est bloquée si **au moins une** dimension du pool doit la bloquer. Les dimensions sont indépendantes : l’épuisement du quota de 5 h en % n’affecte pas la dimension hebdomadaire en %.

### Emprunt

En mode généreux, une clé dont l’allocation est sous-utilisée peut utiliser le surplus provenant des parts non allouées des autres clés. La formule est :

```
maxAllowed = globalLimit - consumedByOtherKeys
```

où `consumedByOtherKeys = consumedTotal - consumedByThisKey`. Le plafond global (`limit` du pool pour cette dimension) reste toujours la limite stricte.

---

## Compteur à fenêtre glissante

Implémenté dans `src/lib/quota/sqliteQuotaStore.ts` et `redisQuotaStore.ts`.

Deux compartiments par `(apiKeyId, dimensionKey)` :

- `curr` : compartiment actuel (`floor(nowMs / windowMs)`)
- `prev` : compartiment précédent (`curr - 1`)

Valeur glissante effective :

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**Précision** : environ 99 %. L’erreur représente au maximum 1 % de la taille de la fenêtre à la limite entre les compartiments (inhérente à l’approximation utilisant 2 compartiments).

### Accès concurrents

Pilote SQLite : un mutex en mémoire par clé `(apiKeyId | dimensionKey)` empêche les accès concurrents en lecture-modification-écriture. Ce modèle reprend la protection anti-effet de ruée de `src/sse/services/auth.ts`.

Pilote Redis : un script Lua EVAL assure l’incrémentation atomique — il s’exécute sous la forme d’une seule commande Redis.

---

## Pilotes

### SQLite (par défaut, aucune installation)

- Table : `quota_consumption` (voir les migrations `073_quota_pools.sql` / `074_quota_consumption.sql`).
- Idéal pour les déploiements à instance unique.
- Toutes les données persistantes se trouvent dans la base SQLite existante d’OmniRoute (`DATA_DIR/storage.sqlite`).

### Redis (facultatif, multi-instance)

- Nécessite le package npm `ioredis`.
- Les compteurs sont stockés dans Redis ; les métadonnées (pools/allocations) restent dans SQLite.
- Idéal pour les déploiements à plusieurs réplicas dans lesquels les compteurs doivent être partagés.

### Changement de pilote

Via l’interface des paramètres (`/dashboard/settings` → Stockage des quotas), ou via les variables d’environnement :

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

Le paramètre de la base de données est prioritaire sur les variables d’environnement. Si `driver=redis`, mais que l’URL est absente ou que
`ioredis` n’est pas installé, la fabrique revient à SQLite et consigne un avertissement.

Ordre de sélection du pilote :

1. Paramètre de base de données `quotaStore.driver`
2. Variable d’environnement `QUOTA_STORE_DRIVER`
3. Valeur par défaut : `sqlite`

---

## Multidimensionnel

Un pool peut comporter plusieurs dimensions. Chaque dimension est indépendante :

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // plafond global du pool pour cette dimension
}
```

**Exemple : forfait Codex** (5h% + hebdomadaire%) :

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

Une requête doit satisfaire toutes les dimensions pour être autorisée.

---

## Résolveur de forfait

Implémenté dans `src/lib/quota/planResolver.ts`.

Ordre de priorité (du plus élevé au plus faible) :

1. **Remplacement manuel en base de données** — table `provider_plans`, par `connectionId`.
2. **Catalogue connu** — `src/lib/quota/planRegistry.ts` (données uniquement).
3. **Forfait vide** — aucune dimension, configuration manuelle requise.

### Catalogue connu

| Fournisseur           | Dimensions                                                    |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h` (limit=0, inconnu), `tokens/weekly`               |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | Aucune valeur par défaut — configuration manuelle requise     |

---

## Intégration au pipeline

### Hook PRE (`open-sse/handlers/chatCore.ts`)

S’exécute avant l’exécuteur en amont, après les contrôles d’authentification et de politique :

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → getQuotaStore().peek() pour chaque dimension
      → fairShare.decideFairShare()
      → si blocage → renvoyer 429 (buildErrorBody, règle stricte nº 12)
      → si autorisation + dépriorisation → définir quotaSoftPenalty=true sur le candidat
  → executor.execute()
```

**Autorisation en cas d’échec** : si `enforceQuotaShare` lève une exception, la requête est autorisée
avec un journal `pino.warn`. Cela empêche un bogue du moteur de quotas de bloquer tout le
trafic.

### Hook POST (enregistrement de la consommation)

Après une réponse réussie :

```
l’exécuteur renvoie un succès
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → getQuotaStore().consume() pour chaque dimension
      → autorisation en cas d’échec : erreurs consignées via pino.warn, jamais propagées au client
```

**Remarque sur la dérive** : si `consume` échoue après la réponse, le compteur glissant sous-estime la consommation.
Le signal de saturation du fournisseur (par exemple `anthropic-ratelimit-unified-5h-utilization`)
corrige l’estimation globale lors de la requête suivante.

### Pénalité douce pour les combinaisons (`open-sse/services/combo.ts`)

Lorsque `decision.deprioritize === true` :

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // valeur par défaut : 0.7
}
```

La pénalité est appliquée après tous les autres facteurs de notation. Elle réduit la
probabilité que la combinaison automatique sélectionne une clé saturée, sans la bloquer complètement.

---

## Présentation de l’interface utilisateur

### `/dashboard/costs/quota-share` — Page principale des pools

Composants (tous dans `src/app/(dashboard)/dashboard/costs/quota-share/`) :

| Composant              | Objectif                                                                                        |
| ---------------------- | ----------------------------------------------------------------------------------------------- |
| `QuotaConceptCard`     | Carte d’introduction expliquant le partage de quotas aux nouveaux utilisateurs                  |
| `CreatePoolModal`      | Créer un nouveau pool de quotas (connexion + nom + allocations initiales)                       |
| `PoolCard`             | Résumé par pool : nom, connexion, nombre d’allocations                                          |
| `DimensionBar`         | Barre empilée par dimension : part de chaque clé + utilisation globale                          |
| `AllocationTable`      | Tableau avec consommation, part équitable, déficit/excédent et indicateur d’emprunt             |
| `BurnRateChart`        | Graphique linéaire du taux de consommation EMA (Recharts chargé paresseusement via `dynamic()`) |
| `EditAllocationsModal` | Modifier les pondérations, plafonds et politiques d’allocation d’un pool                        |

Les hooks de la page :

- `usePools` — récupère `GET /api/quota/pools` toutes les 30 s.
- `usePoolUsage` — récupère `GET /api/quota/pools/[id]/usage` à la demande.
- `useLocalStoragePoolMigration` — s’exécute une fois au montage pour migrer les anciennes données LS.

### `/dashboard/costs/quota-share/plans` — Configuration des forfaits des fournisseurs

- `ProviderPlanConfigClient.tsx` : liste déroulante permettant de sélectionner un fournisseur, d’afficher le
  forfait résolu (automatiquement depuis le catalogue ou par remplacement manuel) et de modifier les dimensions.
- Les modifications sont enregistrées via `PUT /api/quota/plans/[connectionId]`.
- La suppression rétablit le forfait du catalogue ou un forfait vide.

---

## Variables d’environnement

| Variable                           | Valeur par défaut | Description                                                                            |
| ---------------------------------- | ----------------- | -------------------------------------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`          | Pilote à utiliser : `sqlite` ou `redis`                                                |
| `QUOTA_STORE_REDIS_URL`            | _(vide)_          | URL Redis, par ex. `redis://localhost:6379`                                            |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`             | 0..1 ; `>= threshold` active le mode strict                                            |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`             | 0..1 ; multiplicateur du score combiné pour la politique souple                        |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`              | Nombre de jours avant que le GC supprime les anciens compartiments `quota_consumption` |

Les paramètres de base de données (`quotaStore.*`) remplacent les variables d’environnement.

---

## Dépannage

### Redis est configuré, mais ne se connecte pas

Vérifiez que `ioredis` est installé (`npm ls ioredis`) et que `QUOTA_STORE_REDIS_URL`
est accessible. En cas d’échec de connexion, la fabrique se rabat sur SQLite (consigné au
niveau `warn`).

### `peek` renvoie des données obsolètes / autorise en cas d’échec

Si `peek` lève une exception, `enforceQuotaShare` traite le résultat comme une « autorisation » (autorisation en cas d’échec).
Consultez les journaux `pino` pour rechercher les entrées `quota:enforce` et `quota:factory` afin d’identifier
la cause racine.

### Dérive du compteur de consommation

Si l’utilisation réelle du fournisseur diffère des compteurs, cela est normal : la
fenêtre glissante à 2 compartiments présente une erreur d’environ 1 % aux limites de la fenêtre, et `consume` est
exécuté sans attendre de résultat après la réponse. Le signal de saturation (`saturationSignals.ts`)
lit l’utilisation réelle du fournisseur avec une durée de vie de cache de 30 s et ajuste `globalUsedPercent`
en conséquence.

### Le pool affiche « aucune donnée » pour le taux de consommation

`computeBurnRate` nécessite au moins 2 échantillons historiques. Les nouveaux pools sans appels
préalables à `consume` afficheront `tokensPerSecond: 0` et `timeToExhaustionMs: null`.

---

## Migration depuis localStorage

Lors du premier chargement de `/dashboard/costs/quota-share`, le hook `useLocalStoragePoolMigration`
vérifie que :

1. `localStorage.getItem("omniroute:quota-share:pools")` n'est pas vide.
2. `GET /api/quota/pools` renvoie `[]` (la BDD est vide).

Si ces deux conditions sont remplies, il envoie chaque pool hérité à `POST /api/quota/pools` par lots,
puis supprime la clé localStorage. La migration est idempotente : la condition 2 empêche
toute nouvelle migration.

---

## Classification interne de la stratégie

`quota-share` est une stratégie de routage **réservée à un usage interne** (`INTERNAL_ROUTING_STRATEGY_VALUES` dans
`src/shared/constants/routingStrategies.ts`). Elle est utilisée exclusivement par les combinaisons de pools `qtSd/`
générées par le système et est délibérément exclue de `ROUTING_STRATEGY_VALUES` afin qu'elle
n'apparaisse jamais comme une option sélectionnable par l'utilisateur dans l'interface ou l'API.

---

## Couverture des tests

Le moteur quota-share est fourni avec deux niveaux de couverture automatisée :

| Suite                 | Commande                                                               | Éléments couverts                                                                                                                                                                                                                                   |
| :-------------------- | :--------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Unitaire (29 tests)   | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | Ordonnanceur DRR, blocage en cas de saturation, limites de concurrence, calcul de fairShare, mise en file d'attente du backlog                                                                                                                      |
| Matrice d'intégration | `npm run test:combo:matrix`                                            | Décision de routage de bout en bout via le véritable pipeline de combinaisons ; équité DRR et dépriorisation en cas de saturation via des points d'intégration actifs (`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`) |

La matrice d'intégration s'exécute dans la CI avec les 19 stratégies publiques. La suite de tests unitaires
peut être exécutée indépendamment.

---

## Résumé du schéma de la BDD

Trois tables ajoutées par les migrations `078`, `079` et `085` :

- `quota_pools` + `quota_allocations` — définitions des pools et allocations par clé.
- `quota_consumption` — compteurs glissants à 2 compartiments par `(apiKeyId, dimensionKey)`.
- `provider_plans` — remplacements manuels des forfaits des fournisseurs (dimensions JSON par connectionId).

Toutes les tables sont ajoutées au moyen de migrations idempotentes `CREATE TABLE IF NOT EXISTS`.
