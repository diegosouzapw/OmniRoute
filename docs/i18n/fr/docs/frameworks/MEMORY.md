# Memory System (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MEMORY.md) · 🇪🇹 [am](../../../am/docs/frameworks/MEMORY.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MEMORY.md) · 🇦🇿 [az](../../../az/docs/frameworks/MEMORY.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MEMORY.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MEMORY.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MEMORY.md) · 🇩🇰 [da](../../../da/docs/frameworks/MEMORY.md) · 🇩🇪 [de](../../../de/docs/frameworks/MEMORY.md) · 🇬🇷 [el](../../../el/docs/frameworks/MEMORY.md) · 🇪🇸 [es](../../../es/docs/frameworks/MEMORY.md) · 🇪🇪 [et](../../../et/docs/frameworks/MEMORY.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MEMORY.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MEMORY.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MEMORY.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MEMORY.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MEMORY.md) · 🇮🇱 [he](../../../he/docs/frameworks/MEMORY.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MEMORY.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MEMORY.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MEMORY.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MEMORY.md) · 🇮🇩 [id](../../../id/docs/frameworks/MEMORY.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MEMORY.md) · 🇮🇹 [it](../../../it/docs/frameworks/MEMORY.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MEMORY.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MEMORY.md) · 🇰🇭 [km](../../../km/docs/frameworks/MEMORY.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MEMORY.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MEMORY.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MEMORY.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MEMORY.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MEMORY.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MEMORY.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MEMORY.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MEMORY.md) · 🇲🇲 [my](../../../my/docs/frameworks/MEMORY.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MEMORY.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MEMORY.md) · 🇳🇴 [no](../../../no/docs/frameworks/MEMORY.md) · 🇮🇳 [or](../../../or/docs/frameworks/MEMORY.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MEMORY.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MEMORY.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MEMORY.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MEMORY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MEMORY.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MEMORY.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MEMORY.md) · 🇱🇰 [si](../../../si/docs/frameworks/MEMORY.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MEMORY.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MEMORY.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MEMORY.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MEMORY.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MEMORY.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MEMORY.md) · 🇮🇳 [te](../../../te/docs/frameworks/MEMORY.md) · 🇹🇭 [th](../../../th/docs/frameworks/MEMORY.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MEMORY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MEMORY.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MEMORY.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MEMORY.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MEMORY.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MEMORY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MEMORY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MEMORY.md)

---

> **Source de vérité :** `src/lib/memory/` et `src/app/api/memory/`
> **Dernière mise à jour :** 2026-06-28 — v3.8.40 (désactivée par défaut + rattrapage de la quantification int8)

OmniRoute fournit une mémoire conversationnelle persistante indexée par clé API
(et éventuellement par identifiant de session). Les souvenirs sont extraits
automatiquement des réponses du LLM au moyen d’une correspondance légère par
expressions régulières, puis réinjectés dans les requêtes suivantes sous la
forme d’un message système initial (ou du premier message utilisateur pour les
fournisseurs qui refusent le rôle système).

> **La mémoire est DÉSACTIVÉE par défaut (v3.8.30+).** `DEFAULT_MEMORY_SETTINGS.enabled`
> vaut désormais `false` (`src/lib/memory/settings.ts`). L’activation de la mémoire
> injecte jusqu’à `maxTokens` (~2k) de contexte récupéré dans **chaque** requête
> de chat, ce qui est facturé — un coût inattendu pour les nouvelles installations
> et pour les clients qui gèrent leur propre contexte. Activez-la explicitement
> dans **Paramètres → Mémoire** (l’onglet `MemorySkillsTab` affiche un avertissement
> relatif au coût en jetons lorsque la mémoire est activée). Un client peut exclure
> une requête spécifique à l’aide de l’en-tête de requête `x-omniroute-no-memory`
> (`true`/`1`/`yes`) — consultez le tableau des en-têtes de requête dans
> [API_REFERENCE.md](../reference/API_REFERENCE.md). Une requête sans mémoire définit
> `memoryOwnerId = null`, ce qui désactive **à la fois** l’injection de mémoire et
> de compétences pour cette requête (`open-sse/handlers/chatCore/headers.ts::isNoMemoryRequested`).

La mémoire est **limitée à chaque clé API**, et non à chaque utilisateur — toutes
les requêtes authentifiées avec la même clé API partagent le même pool de
mémoire, avec une limitation supplémentaire facultative par `sessionId`.

## Architecture

```
Client → /v1/chat/completions (apiKeyInfo résolu en amont)
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → resolveMemoryOwnerId(apiKeyInfo)        # extrait l’identifiant
    → getMemorySettings()                     # paramètres mis en cache
    → shouldInjectMemory(body, {enabled})     # contrôle
    → retrieveMemories(apiKeyId, config)      # SQL + FTS5 + vecteur facultatif
    → injectMemory(body, memories, provider)  # message système ou utilisateur
  → appel au fournisseur en amont
  → à la réponse : extractFacts(text, apiKeyId, sessionId)  # non bloquant
    → setImmediate → createMemory(fact) pour chaque correspondance
                   → embed(content) + upsertVector(id, vec)
```

Les points d’appel d’injection et d’extraction sont configurés dans
`open-sse/handlers/chatCore.ts` (recherchez `retrieveMemories`, `injectMemory`
et `extractFacts`).

## Architecture du moteur (résolution à 3 niveaux)

Le moteur de mémoire détermine le chemin de récupération au moment de
l’exécution en fonction de l’infrastructure disponible et des paramètres.
Il existe trois niveaux, appliqués par ordre de priorité :

```
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVEAU 0 — Mot-clé (FTS5)                                  │
  │  Disponibilité déterminée par une vérification : FTS5 lorsque│
  │  la version de SQLite le prend en charge (better-sqlite3 /   │
  │  node:sqlite / bun:sqlite) ; indisponible avec les versions  │
  │  sans FTS5 (p. ex. sql.js/WASM — "no such module: fts5").    │
  │  Utilisé lorsque strategy = "exact" ou comme solution de     │
  │  repli ; l’état keyword du moteur reflète la vérification.   │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ strategy = semantic|hybrid ?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVEAU 1 — Vecteur intégré (sqlite-vec)                     │
  │  sqlite-vec v0.1.9 chargé via db.loadExtension().            │
  │  Recherche KNN par force brute sur des vecteurs Float32.     │
  │  Actif lorsque :                                             │
  │   • le chargement de sqlite-vec par loadExtension réussit    │
  │   • une source d’embeddings est disponible (remote | static |│
  │     transformers) et peut produire un Float32Array           │
  │   • la table vec_memories existe (créée au premier ready())  │
  └──────────────────────────────────┬──────────────────────────┘
                                     │ qdrant.enabled ?
                                     ▼
  ┌─────────────────────────────────────────────────────────────┐
  │  NIVEAU 2 — Qdrant (base vectorielle externe facultative)    │
  │  Lorsqu’il est activé, remplace sqlite-vec pour les stratégies│
  │  semantic/hybrid. Nécessite une instance Qdrant en cours     │
  │  d’exécution ainsi qu’un hôte et un port configurés.         │
  └─────────────────────────────────────────────────────────────┘
```

La dégradation est automatique et transparente :

- Si le chargement de sqlite-vec échoue, le niveau 1 est indisponible → repli
  sur le niveau 0.
- Si la source d’embeddings renvoie une erreur, le niveau 1 se replie sur le
  niveau 0.
- Si Qdrant est défaillant, le niveau 2 se replie sur le niveau 1 (ou sur le
  niveau 0 si le niveau 1 est également indisponible).

## Sources d'embeddings

La couche d'embedding (`src/lib/memory/embedding/`) détermine la source à utiliser
en fonction de `MemorySettingsExtended.embeddingSource` :

| Source         | Description                                                                                       | Clé requise | Démarrage à froid |
| -------------- | ------------------------------------------------------------------------------------------------- | ----------- | ----------------- |
| `remote`       | Utilise l'API d'embedding d'un fournisseur configuré (OpenAI, Cohere, etc.)                       | Oui         | Aucun             |
| `static`       | Embedding local par table de correspondance via `potion-base-8M` (WordPiece + agrégation moyenne) | Non         | ~200ms            |
| `transformers` | Inférence ONNX locale via `@huggingface/transformers` v4, `all-MiniLM-L6-v2`                      | Non         | ~3s + ~400MB RAM  |
| `auto`         | Résolution à l'exécution : distant (si une clé existe) → statique → transformers → null           | Variable    | Variable          |

**Ordre de résolution pour `auto` :**

1. Trouver le premier fournisseur dans `listEmbeddingProviders()` avec `hasKey === true` → `remote`.
2. Si `settings.staticEnabled === true` → `static`.
3. Si `settings.transformersEnabled === true` → `transformers`.
4. Sinon → `null` (repli sur la recherche par mots-clés FTS5).

Le cache d'embeddings (`src/lib/memory/embedding/cache.ts`) utilise une
table LRU en mémoire indexée par `${source}:${model}:${dim}:${sha256(text)}`, limitée à
`MEMORY_EMBEDDING_CACHE_MAX` entrées (1000 par défaut), avec une durée de vie de
`MEMORY_EMBEDDING_CACHE_TTL_MS` (5 min par défaut). Il est partagé entre tous les appelants
pendant le cycle de vie du processus.

## RRF hybride (k=60)

Lorsque `strategy = "hybrid"` et que le magasin vectoriel est disponible, la récupération utilise
la fusion réciproque des rangs (Reciprocal Rank Fusion) pour combiner les résultats FTS5 et vectoriels :

```
RRF(d) = Σ  1 / (k + rank_i(d))      où k = 60 (configurable via MEMORY_RRF_K)
          i
```

Concrètement :

1. Exécuter la recherche FTS5 → liste classée `R_fts` (positions 1..N).
2. Exécuter la recherche vectorielle KNN → liste classée `R_vec` (positions 1..M).
3. Pour chaque `memoryId` unique :  
   `rrf_score = 1/(60 + fts_rank)` + `1/(60 + vec_rank)` (0 s'il est absent de la liste).
4. Trier par `rrf_score` dans l'ordre décroissant, puis appliquer le parcours selon le budget de jetons.

RRF est reconnu comme efficace sans nécessiter de normalisation des scores entre
des systèmes de récupération hétérogènes. La valeur par défaut `k=60` provient de l'article
original de Cormack et al. et fonctionne bien pour les petits corpus (<10k souvenirs).

## Remplissage rétroactif (différé + réindexation)

Lorsque le modèle d'embedding change (détecté via `embedding_signature`), le
magasin vectoriel est reconstruit et tous les souvenirs existants sont marqués avec
`needs_reindex = 1` dans la table `memories`.

**Remplissage rétroactif différé** : lors de la récupération suivante, tout souvenir dépourvu d'une entrée vectorielle est
converti en embedding et inséré dans `vec_memories` avant l'exécution de la recherche. Cela
amortit le coût du remplissage rétroactif sur les requêtes réelles sans bloquer le démarrage.

**Réindexation explicite** : l'onglet Moteur dans `/dashboard/memory` fournit un
bouton « Réindexer maintenant » qui appelle `POST /api/memory/reindex`. Le gestionnaire appelle
`runReindexBatch()` depuis `src/lib/memory/reindex.ts`, qui traite jusqu'à
`limit` entrées en attente par requête. La progression peut être interrogée via
`GET /api/memory/engine-status` (`vectorStore.needsReindex`).

La table `memory_vec_meta` (migration `083_memory_vec.sql`) stocke :

- `active_dim` — dimension vectorielle actuelle (null = pas encore étalonnée).
- `embedding_signature` — `${source}:${model}:${dim}` utilisée pour détecter les changements.
- `last_reset_at` — horodatage de la dernière réinitialisation complète.
- `vec_loaded` — indicateur 0/1 précisant si sqlite-vec a été chargé avec succès.

## Extension des paramètres

Neuf champs d’intégration et de vecteurs sont disponibles dans `MemorySettingsExtended`, dans
`src/shared/schemas/memory.ts`, et sont persistés via `src/lib/db/settings.ts` :

| Champ                    | Type                                               | Valeur par défaut | Description                                                    |
| ------------------------ | -------------------------------------------------- | ----------------- | -------------------------------------------------------------- |
| `embeddingSource`        | `"remote" \| "static" \| "transformers" \| "auto"` | `"auto"`          | Source d’intégration à utiliser                                |
| `embeddingProviderModel` | `string \| null`                                   | `null`            | Fournisseur/modèle au format `provider/model`                  |
| `customBaseUrl`          | `string \| null`                                   | `null`            | URL de base d’un endpoint compatible OpenAI réservé à Memory   |
| `customModelId`          | `string \| null`                                   | `null`            | ID du modèle envoyé à l’endpoint personnalisé                  |
| `transformersEnabled`    | `boolean`                                          | `false`           | Activation facultative de Transformers.js (MiniLM, ~400 Mo)    |
| `staticEnabled`          | `boolean`                                          | `false`           | Activation facultative du modèle local statique potion-base-8M |
| `rerankEnabled`          | `boolean`                                          | `false`           | Activer l’étape de reclassement (ajoute 200 à 500 ms/requête)  |
| `rerankProviderModel`    | `string \| null`                                   | `null`            | Fournisseur/modèle de reclassement au format `provider/model`  |

`rerankProviderModel` est résolu par `POST /v1/rerank` (appelé via l’interface de bouclage) ; il accepte donc tout ce que cette route accepte : un modèle cloud de reclassement sélectionné (`cohere/rerank-v3.5`, `jina-ai/jina-reranker-v3.5`, …) ou un nœud fournisseur compatible OpenAI sous la forme `<node-prefix>/<model>` (par exemple `skilled-mini/bge-reranker-v2-m3` pour une machine TEI/Infinity). Les nœuds de bouclage sont toujours admissibles ; un nœud situé sur un autre hôte (LAN, Tailscale) nécessite en outre l’indicateur de fonctionnalité `RERANK_REMOTE_PROVIDER_NODES` et doit respecter la politique des URL sortantes des fournisseurs — voir [Indicateurs de fonctionnalité](../reference/FEATURE_FLAGS.md). Le sélecteur du tableau de bord répertorie les fournisseurs sélectionnés ainsi que les nœuds locaux ; toute chaîne `provider/model` valide peut être définie directement via `PUT /api/settings/memory`.
| `vectorStore` | `"sqlite-vec" \| "qdrant" \| "auto"` | `"auto"` | Backend vectoriel à utiliser |

Ces paramètres sont exposés via `GET /PUT /api/settings/memory` (schéma `MemorySettingsExtendedSchema`).

Pour la source `remote`, Memory accepte également les paramètres facultatifs `customBaseUrl` et
`customModelId`. Ensemble, ils sélectionnent un endpoint `/embeddings` compatible OpenAI
et un modèle sans modifier le registre global des intégrations. L’endpoint est
normalisé avant utilisation et vérifié par la politique des URL sortantes des fournisseurs : HTTP(S) est
requis, les identifiants intégrés et les chaînes de requête sont rejetés, et les adresses
des services de métadonnées cloud restent bloquées. Les valeurs vides conservent le fournisseur sélectionné dans le registre. Les erreurs
renvoyées au tableau de bord sont nettoyées et les identifiants de l’endpoint ne sont jamais consignés.

> **À FAIRE (D20) :** La portée `global` (partage des mémoires entre toutes les clés d’API) n’est pas
> implémentée dans cette version. Elle nécessite des modifications du schéma ainsi qu’un chemin de récupération
> global. À suivre séparément.

## Couches de stockage

### Principale : SQLite (table `memories`)

Créée par la migration `015_create_memories.sql` :

| Colonne                     | Type               | Remarques                                                                    |
| --------------------------- | ------------------ | ---------------------------------------------------------------------------- |
| `id`                        | `TEXT PRIMARY KEY` | UUID généré via `crypto.randomUUID()`                                        |
| `api_key_id`                | `TEXT NOT NULL`    | Clé API propriétaire                                                         |
| `session_id`                | `TEXT`             | Portée facultative par conversation                                          |
| `type`                      | `TEXT NOT NULL`    | Une valeur parmi `factual`, `episodic`, `procedural`, `semantic`             |
| `key`                       | `TEXT`             | Clé d’upsert stable, p. ex. `preference:i_prefer_python`                     |
| `content`                   | `TEXT NOT NULL`    | Texte factuel proprement dit                                                 |
| `metadata`                  | `TEXT`             | Blob JSON (catégorie, extractedAt, source, ...)                              |
| `created_at` / `updated_at` | `TEXT`             | Chaînes ISO 8601                                                             |
| `expires_at`                | `TEXT`             | Expiration facultative ; `NULL` signifie permanent                           |
| `memory_id`                 | `INTEGER UNIQUE`   | Ajouté par `023_fix_memory_fts_uuid.sql` pour relier les UUID aux rowid FTS5 |

Index : `api_key_id`, `session_id`, `type`, `expires_at`, ainsi que l’index unique
`memory_id`.

**Sémantique de l’upsert** : `createMemory()` recherche une ligne existante ayant les mêmes
`(api_key_id, key)` et la met à jour sur place lorsqu’elle est trouvée (en fusionnant `metadata` via
une décomposition superficielle). Cela empêche la table de croître sans limite lors de
déclarations de préférence répétées.

### Recherche en texte intégral (table virtuelle `memory_fts`)

`022_add_memory_fts5.sql` crée une table virtuelle FTS5 sur `content` et
`key`. `023_fix_memory_fts_uuid.sql` corrige un bug rencontré en conditions réelles, dans lequel la clé primaire
UUID ne pouvait pas être jointe au rowid entier de FTS5 — la migration ajoute la
colonne `memory_id`, recrée la table FTS et configure des déclencheurs
(`memory_fts_ai`, `memory_fts_ad`, `memory_fts_au`) qui maintiennent la synchronisation de FTS lors des opérations
INSERT, DELETE et UPDATE.

Utilisée par `retrieval.ts` pour les stratégies `semantic` et `hybrid` (voir ci-dessous).
Le code de récupération effectue une vérification avec `hasTable("memory_fts")` et revient à
l’ordre chronologique si la table FTS est absente ou si la requête FTS lève une exception.

### Facultatif : Qdrant (magasin vectoriel de niveau 2)

`src/lib/memory/qdrant.ts` implémente une intégration facultative de Qdrant comme magasin
vectoriel de niveau 2. La récupération n’est acheminée vers Qdrant que lorsque le sélecteur de moteur
`memoryVectorStore === "qdrant"` — la valeur par défaut `"auto"` (ainsi que `"sqlite-vec"`)
ne sélectionne **jamais** Qdrant. Le bouton de l’onglet Engine définit simultanément **à la fois** `qdrantEnabled` et
`memoryVectorStore` : son activation fait de Qdrant le magasin principal, tandis que sa désactivation
rétablit `"auto"` (#5597 — avant ce correctif, l’activation était sans effet, car aucun mécanisme
ne définissait le sélecteur de moteur). Si Qdrant est inaccessible ou ne renvoie aucun résultat, la récupération
revient à sqlite-vec → FTS5.

- `upsertSemanticMemoryPoint()` — incorpore `key + content` à l’aide du modèle
  d’embedding configuré, vérifie que la collection existe (crée des vecteurs
  utilisant la distance cosinus lors de la première utilisation), puis insère ou met à jour un point avec la charge utile `{memoryId,
apiKeyId, sessionId, key, content, metadata, createdAtUnix, expiresAtUnix}`.
- `searchSemanticMemory(query, topK, scope)` — incorpore la requête, recherche dans la
  collection avec un filtre sur `kind = "omniroute_memory"` et, facultativement, sur
  `apiKeyId` / `sessionId`. Limite `topK` à `[1, 20]`.
- `deleteSemanticMemoryPoint(id)` — supprime un seul point. Appelée par
  `deleteMemory()` après la suppression de la ligne SQLite (D15).
- `cleanupSemanticMemoryPoints({retentionDays})` — supprime en masse les points dont
  `expiresAtUnix` est passé ou dont `createdAtUnix` est antérieur au seuil de
  conservation. Effectue d’abord un décompte afin que le tableau de bord puisse afficher les nombres réels.
- `checkQdrantHealth()` — sonde d’état `GET /readyz` avec mesure de la latence.

L’interface des paramètres expose la configuration de Qdrant, la vérification de l’état, le test de recherche sémantique
et le nettoyage dans l’onglet **Moteur** de `/dashboard/memory`. Les routes correspondantes
sous `src/app/api/settings/qdrant/` sont toutes connectées depuis la v3.8.6 :

| Route                                   | Méthode       | Description                                     |
| --------------------------------------- | ------------- | ----------------------------------------------- |
| `/api/settings/qdrant`                  | `GET` / `PUT` | Lire / mettre à jour les paramètres Qdrant      |
| `/api/settings/qdrant/health`           | `GET`         | Sonde de disponibilité + latence                |
| `/api/settings/qdrant/search`           | `POST`        | Test de recherche sémantique                    |
| `/api/settings/qdrant/cleanup`          | `POST`        | Supprimer les points expirés / anciens          |
| `/api/settings/qdrant/embedding-models` | `GET`         | Répertorier les modèles d’embedding disponibles |

**Remarques sur le comportement (à quoi s’attendre) :**

- **Sélection du moteur** — l’activation de Qdrant dans l’onglet Moteur en fait le stockage
  principal (définit `memoryVectorStore="qdrant"`); sa désactivation rétablit `"auto"` (#5597).
- **Aucun remplissage rétroactif** — seules les mémoires créées/mises à jour **après** l’activation de Qdrant y sont
  écrites (double écriture sans attente de résultat). Les mémoires SQLite préexistantes ne sont **pas**
  migrées ; « Réindexer maintenant » reconstruit uniquement l’index sqlite-vec, pas celui de Qdrant.
- **La dimension vectorielle est détectée automatiquement** à partir de l’embedding réel lors de la première utilisation — aucun
  champ de dimension n’est à renseigner. Le changement de modèle d’embedding après la création d’une collection
  n’est **pas** géré automatiquement : la collection existante reste inchangée, les écritures/recherches dont les
  dimensions ne correspondent pas échouent et basculent sur sqlite-vec. Recréez la collection
  (avec un nouveau nom, ou supprimez-la dans Qdrant) pour changer de modèle d’embedding.
- **Métrique de distance** — toujours **Cosinus** (codée en dur lors de la création de la collection ; non
  configurable).
- **Authentification** — clé API uniquement (envoyée dans l’en-tête `api-key` ; facultative pour un
  Docker local sans authentification). JWT/RBAC ne sont pas utilisés.
- **Champs de configuration** — l’interface expose `host`, `port`, `collection`, `embeddingModel`,
  `apiKey`. `vectorSize` / `hnswEfConstruct` sont disponibles uniquement via l’environnement/la BDD et `vectorSize` n’est pas
  utilisé pour la création de la collection (la dimension provient de l’embedding).

### Quantification vectorielle (int8 — facultative, pour les deux backends)

Les deux backends vectoriels prennent en charge une **quantification int8 facultative** afin de réduire l’empreinte mémoire
des vecteurs stockés (environ 4 fois plus petite qu’avec Float32), au prix d’une légère baisse du rappel.
Elle est **désactivée** par défaut sur les deux backends — les vecteurs conservent leur précision maximale, sauf activation
explicite.

| Backend    | Paramètre                       | Type                           | Valeur par défaut | Emplacement de lecture                                      |
| ---------- | ------------------------------- | ------------------------------ | ----------------- | ----------------------------------------------------------- |
| Qdrant     | `qdrantQuantization` (clé BDD)  | `"none" \| "int8" \| "binary"` | `"none"`          | `src/lib/memory/qdrant.ts::normalizeQdrantConfig()`         |
| sqlite-vec | `MEMORY_VEC_QUANTIZATION` (env) | `"none" \| "int8"`             | `"none"`          | `src/lib/memory/vectorStore.ts::requestedVecQuantization()` |

- **Qdrant** est configuré pour chaque instance au moyen de la clé de paramètre `qdrantQuantization`
  (exposée sous la forme du champ `quantization` sur `PUT /api/settings/qdrant`). Avec
  `"int8"`, `buildQuantizationConfig()` demande une quantification scalaire
  (`always_ram`, quantile `0.99`) et les recherches activent `rescore: true` afin que les
  vecteurs en pleine précision affinent l’ensemble des candidats int8.
- La quantification de **sqlite-vec** est disponible **uniquement via l’environnement** (ce n’est pas un paramètre de BDD) : définissez
  `MEMORY_VEC_QUANTIZATION=int8` pour stocker les vecteurs locaux dans une colonne `int8[dim]`
  via `vec_quantize_int8(?, 'unit')`. Le mode choisi est intégré à
  `embedding_signature` (un suffixe `:int8`), de sorte qu’un changement de mode déclenche une
  réindexation complète de la table `vec_memories` — le même mécanisme de remplissage rétroactif différé que celui utilisé lors
  d’un changement de modèle d’embedding.

## Types de mémoire

`MemoryType` (`src/lib/memory/types.ts`) :

| Type         | Utilisation                                                                                |
| ------------ | ------------------------------------------------------------------------------------------ |
| `factual`    | Préférences, faits stables sur l’utilisateur, habitudes comportementales                   |
| `episodic`   | Décisions liées à un moment précis (« J’ai choisi Postgres »)                              |
| `procedural` | Mémoire des workflows et procédures (réservée ; aucun extracteur automatique actuellement) |
| `semantic`   | Réservée aux entrées du magasin vectoriel                                                  |

La stratégie de récupération de `MemoryConfig` est `exact`, `semantic` ou `hybrid`,
et sa portée est `session`, `apiKey` ou `global`. La portée par défaut renvoyée par
`getMemorySettings()` est `apiKey`.

## Extraction des faits (`extraction.ts`)

L’extraction repose sur des **expressions régulières**, et non sur un LLM — elle s’exécute dans le processus avec
`setImmediate()` afin de ne jamais bloquer le flux de réponse :

- **Motifs de préférence** → `MemoryType.FACTUAL`
  (par ex. `I prefer …`, `I really like …`, `my favorite is …`, `I hate …`)
- **Motifs de décision** → `MemoryType.EPISODIC`
  (par ex. `I'll use …`, `I chose …`, `I went with …`, `I'm going to adopt …`)
- **Motifs comportementaux** → `MemoryType.FACTUAL`
  (par ex. `I usually …`, `I always …`, `I tend to …`)

Chaque correspondance est nettoyée (`trim`, réduction des espaces, limitation à 500 caractères),
dédupliquée au sein du lot au moyen d’un `factKey(category, content)` stable, puis
stockée via `createMemory()` avec les métadonnées
`{category, extractedAt, source: "llm_response"}`. Le texte d’entrée est limité à
64 Kio (`MAX_EXTRACTION_TEXT_LENGTH`) — lorsqu’il est plus long, la **fin** du texte
est utilisée afin que le contenu le plus récent de l’assistant soit toujours pris en compte.

`extractFactsFromText(text)` est exportée pour les tests et renvoie les faits structurés
sans les stocker.

## Récupération (`retrieval.ts`)

`retrieveMemories(apiKeyId, config)` est le point d’entrée principal. Cette fonction :

1. Normalise et valide la configuration au moyen de `MemoryConfigSchema`.
2. Renvoie immédiatement `[]` lorsque `enabled` vaut false ou que `maxTokens <= 0`.
3. Limite `maxTokens` à l’intervalle `[1, 8000]`.
4. Détecte si la table moderne `memories` existe (par opposition à l’ancienne table `memory`)
   afin que les bases de données plus anciennes continuent de fonctionner.
5. Construit la requête de base avec une condition d’expiration
   (`expires_at IS NULL OR datetime(expires_at) > datetime('now')`), une portée de
   session facultative et une date limite facultative fondée sur `retentionDays`.
6. Adapte le traitement selon la stratégie :
   - **`exact`** (par défaut) : ordre chronologique `ORDER BY created_at DESC LIMIT 100`.
   - **`semantic`** : si `config.query` est défini et que `memory_fts` existe, effectue une jointure
     avec `memory_fts MATCH ?` et trie selon le classement FTS ; revient à l’ordre chronologique
     lorsque FTS ne renvoie aucune ligne.
   - **`hybrid`** : union des résultats FTS (pertinence supérieure) et de l’ensemble
     chronologique, dédupliquée par identifiant.
7. Calcule un score de pertinence par mots-clés (`getRelevanceScore`) sur
   `content`, `key` et le JSON `metadata` lorsqu’une requête est fournie. Les lignes dont
   le score est nul sont filtrées.
8. Trie par score décroissant, puis par `createdAt` décroissant.
9. Parcourt la liste classée et accepte les entrées tant que le cumul de
   `estimateTokens(content)` (≈ `length / 4`) reste inférieur au budget. Renvoie toujours
   au moins une entrée lorsqu’une correspondance existe.

`estimateTokens` est exportée et utilisée par la récupération, la synthèse et l’outil MCP
`omniroute_memory_search`.

## Injection (`injection.ts`)

`injectMemory(request, memories, provider)` :

1. Regroupe tous les contenus de mémoire dans une seule chaîne `Memory context: …`.
2. Sélectionne une stratégie selon le nom du fournisseur :
   - **Message système** (par défaut pour OpenAI, Anthropic, Gemini, …) — ajoute
     un `{role: "system", content: memoryText}` avant tous les messages système
     existants afin que les invites système de l’utilisateur restent prioritaires.
   - **Message utilisateur** (solution de repli) — pour les fournisseurs figurant dans
     `PROVIDERS_WITHOUT_SYSTEM_MESSAGE` : `o1`, `o1-mini`, `o1-preview`,
     `glm`, `glmt`, `glm-cn`, `zai`, `qianfan`. Ceux-ci rejettent le rôle système
     et renverraient autrement une erreur 400 (cf. problème #1701 pour GLM/Zhipu).
3. Journalise le nombre, la stratégie et le modèle sous `memory.injection.injected`.

`providerSupportsSystemMessage(provider)` est exportée pour les appelants qui doivent
prendre leurs propres décisions de routage. Les fournisseurs inconnus utilisent `true`
par défaut (rôle système autorisé) par mesure de sécurité.

## Paramètres (`settings.ts`)

La configuration de la mémoire est **stockée dans la table des paramètres de la base de données**, et non dans des variables d’environnement.
`getMemorySettings()` lit les données depuis `getSettings()` et met le résultat en cache
dans le processus ; `invalidateMemorySettingsCache()` est appelée par la route PUT
des paramètres après les écritures.

### Champs historiques (toutes les versions)

| Clé de la base de données | Type    | Valeur par défaut                                 | Contrôle de l’interface utilisateur                        |
| ------------------------- | ------- | ------------------------------------------------- | ---------------------------------------------------------- |
| `memoryEnabled`           | booléen | `false` (désactivé par défaut depuis v3.8.30)     | Activation/désactivation de la mémoire                     |
| `memoryMaxTokens`         | entier  | `2000` (plage `0–16000`)                          | Budget de jetons pour l’injection                          |
| `memoryRetentionDays`     | entier  | `30` (plage `1–365`)                              | Fenêtre de conservation                                    |
| `memoryStrategy`          | énum.   | `"hybrid"` (parmi `recent`, `semantic`, `hybrid`) | Stratégie de récupération                                  |
| `skillsEnabled`           | booléen | `false`                                           | Active l’injection de compétences par clé (voir SKILLS.md) |

Remarque : la stratégie `"recent"` de l’interface utilisateur correspond à la stratégie
de récupération interne `"exact"` via `toMemoryRetrievalConfig()` (ordre chronologique).

### Nouveaux champs (v3.8.6, plan 21 D9)

Voir également la section « Extension des paramètres » ci-dessus pour la description des champs.

| Clé de la base de données   | Champ de l’API           | Valeur par défaut |
| --------------------------- | ------------------------ | ----------------- |
| `memoryEmbeddingSource`     | `embeddingSource`        | `"auto"`          |
| `memoryEmbeddingModel`      | `embeddingProviderModel` | `null`            |
| `memoryTransformersEnabled` | `transformersEnabled`    | `false`           |
| `memoryStaticEnabled`       | `staticEnabled`          | `false`           |
| `memoryRerankEnabled`       | `rerankEnabled`          | `false`           |
| `memoryRerankModel`         | `rerankProviderModel`    | `null`            |
| `memoryVectorStore`         | `vectorStore`            | `"auto"`          |

Les clés de la base de données liées à Qdrant (`qdrantEnabled`, `qdrantHost`, `qdrantPort`,
`qdrantApiKey`, `qdrantCollection` avec `"omniroute_memory"` par défaut,
`qdrantEmbeddingModel` avec `"openai/text-embedding-3-small"` par défaut) sont lues par
`normalizeQdrantConfig()` dans `qdrant.ts`.

### Variables d’environnement (v3.8.6)

Six variables d’environnement facultatives ajustent le comportement d’exécution du moteur (documentées dans `.env.example`) :

| Variable                        | Valeur par défaut          | Description                                                                                                                                                                                          |
| ------------------------------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MEMORY_EMBEDDING_CACHE_TTL_MS` | `300000`                   | Durée de vie du cache des plongements (5 min)                                                                                                                                                        |
| `MEMORY_EMBEDDING_CACHE_MAX`    | `1000`                     | Nombre maximal d’entrées dans le cache LRU des plongements                                                                                                                                           |
| `MEMORY_TRANSFORMERS_MODEL`     | `Xenova/all-MiniLM-L6-v2`  | Dépôt HF du modèle Transformers.js                                                                                                                                                                   |
| `MEMORY_STATIC_MODEL`           | `minishlab/potion-base-8M` | Dépôt HF du modèle statique potion                                                                                                                                                                   |
| `MEMORY_STATIC_CACHE_DIR`       | `<DATA_DIR>/embeddings`    | Emplacement de stockage des modèles téléchargés                                                                                                                                                      |
| `MEMORY_VEC_TOP_K`              | `20`                       | Valeur top-K par défaut pour la recherche vectorielle                                                                                                                                                |
| `MEMORY_RRF_K`                  | `60`                       | Constante k de RRF pour la recherche hybride                                                                                                                                                         |
| `MEMORY_VEC_QUANTIZATION`       | `none`                     | Définissez cette valeur sur `int8` pour stocker les vecteurs sqlite-vec locaux sous forme quantifiée (environ 4× plus petits ; option facultative). Tout changement de mode impose une réindexation. |

## Résumé (`summarization.ts`)

`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)` compacte le contenu
ancien lorsque le nombre total courant de jetons dans les mémoires d'une clé
dépasse le budget. La fonction parcourt les lignes par ordre décroissant de
`created_at`, conserve celles qui tiennent dans le budget et, pour les autres,
remplace `content` directement par les trois premières phrases du contenu
d'origine. `tokensSaved` correspond à la différence de `estimateTokens` entre
l'ancien et le nouveau contenu.

Cette routine est **disponible, mais n'est pas appelée automatiquement** dans
le pipeline de discussion actuel — appelez-la depuis une tâche cron, une action
d'administration ou une intégration à `MemoryConfig.autoSummarize` si vous avez
besoin d'une compaction continue. La perte de données est irréversible : le
texte d'origine est écrasé.

## API REST

Tous les points de terminaison nécessitent l'authentification de gestion
(`requireManagementAuth`).

### Points de terminaison principaux de la mémoire (existants + mis à jour)

| Méthode  | Chemin               | Description                                                                                                                                                                                                             |
| -------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/memory`        | Liste paginée avec les filtres suivants : `apiKeyId`, `type`, `sessionId`, `q`, `limit`, `page`, `offset`. La réponse inclut `stats.total`, `stats.tokensUsed`, `stats.hitRate`, `cacheStats`                           |
| `POST`   | `/api/memory`        | Crée une entrée (validée par Zod : `content`, `key`, ainsi que les champs facultatifs `type`, `sessionId`, `apiKeyId`, `metadata`, `expiresAt`). Appelle `createMemory()`, qui effectue un upsert sur `(apiKeyId, key)` |
| `GET`    | `/api/memory/[id]`   | Récupère une entrée unique par UUID                                                                                                                                                                                     |
| `PUT`    | `/api/memory/[id]`   | Met à jour les champs de l'entrée (`type`, `key`, `content`, `metadata`). Corps : `MemoryUpdatePutSchema`. Synchronise également le vecteur si la source d'embedding est disponible.                                    |
| `DELETE` | `/api/memory/[id]`   | Supprime une entrée ; la supprime également de `vec_memories` (D15) et de Qdrant dans la mesure du possible. Renvoie 404 si elle est introuvable.                                                                       |
| `GET`    | `/api/memory/health` | Exécute `verifyExtractionPipeline("health-check")` — cycle complet création→liste→suppression. Renvoie `{working, latencyMs, error?}`                                                                                   |

### Nouveaux points de terminaison du moteur de mémoire (plan 21)

| Méthode | Chemin                            | Description                                                                                                                                                                                                     |
| ------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST`  | `/api/memory/retrieve-preview`    | Simulation de `retrieveMemories` — renvoie des résultats classés avec leur score, leur niveau et leur nombre de jetons. Corps : `RetrievePreviewSchema`. N'injecte PAS de mémoires et ne les modifie pas.       |
| `GET`   | `/api/memory/embedding-providers` | Répertorie les fournisseurs avec leurs modèles d'embedding et indique ceux pour lesquels une clé API est configurée.                                                                                            |
| `GET`   | `/api/memory/engine-status`       | Renvoie l'état complet du moteur : niveau des mots-clés, résolution des embeddings, statistiques du magasin vectoriel, état de Qdrant et configuration du reclassement. Structure : `MemoryEngineStatusSchema`. |
| `POST`  | `/api/memory/summarize`           | Déclenche manuellement la compaction de la mémoire. Corps : `MemorySummarizeSchema` (`olderThanDays`, `apiKeyId?`, `dryRun`). Renvoie `{candidates, tokensSaved}`.                                              |
| `POST`  | `/api/memory/reindex`             | Déclenche la réindexation vectorielle des mémoires ayant `needs_reindex=1`. Corps : `MemoryReindexSchema` (`force`). Renvoie `{started, pending}`.                                                              |

### Points de terminaison des paramètres

| Méthode | Chemin                                  | Description                                                                                                         |
| ------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| `GET`   | `/api/settings/memory`                  | Paramètres `MemorySettingsExtended` normalisés actuels (7 nouveaux champs + champs hérités)                         |
| `PUT`   | `/api/settings/memory`                  | Met à jour n'importe quel champ de `MemorySettingsExtendedSchema` (12 champs au total)                              |
| `GET`   | `/api/settings/qdrant`                  | Paramètres Qdrant actuels (`QdrantSettingsSchema`)                                                                  |
| `PUT`   | `/api/settings/qdrant`                  | Met à jour les paramètres Qdrant. Corps : `QdrantSettingsUpdateSchema`. `apiKey` = une chaîne vide supprime la clé. |
| `GET`   | `/api/settings/qdrant/health`           | Sonde de disponibilité de l'instance Qdrant configurée. Renvoie `QdrantHealthResultSchema`.                         |
| `POST`  | `/api/settings/qdrant/search`           | Test de recherche sémantique dans Qdrant. Corps : `QdrantSearchSchema` (`query`, `topK`).                           |
| `POST`  | `/api/settings/qdrant/cleanup`          | Supprime de Qdrant les points correspondant aux mémoires expirées / anciennes.                                      |
| `GET`   | `/api/settings/qdrant/embedding-models` | Répertorie les modèles d'embedding disponibles pour Qdrant.                                                         |

La requête de liste `/api/memory` prend en charge soit une pagination basée
sur `page` (`parsePaginationParams`), soit une valeur `offset` brute — lorsque
`offset` est présent, il est prioritaire et une valeur `page` dérivée est
calculée pour la structure de la réponse.

## Outils MCP (`open-sse/mcp-server/tools/memoryTools.ts`)

Lorsque le serveur MCP est activé, trois outils de mémoire sont enregistrés :

- `omniroute_memory_search` — `{apiKeyId, query?, type?, maxTokens?, limit?}`
  → encapsule `retrieveMemories()`. Depuis la v3.8.6 (D16), la `strategy` est lue
  depuis `getMemorySettings()` au lieu d’être codée en dur sur `"exact"`. Si
  `query` est fournie et que `strategy` vaut `semantic` ou `hybrid`, le magasin
  vectoriel est utilisé lorsqu’il est disponible.
- `omniroute_memory_add` — `{apiKeyId, sessionId?, type, key, content,
metadata?}` → encapsule `createMemory()`. Accepte uniquement les 4 types canoniques :
  `factual`, `episodic`, `procedural`, `semantic` (D17).
- `omniroute_memory_clear` — `{apiKeyId, type?, olderThan?}` → répertorie les
  entrées correspondantes, les filtre éventuellement selon un horodatage de création antérieur, puis supprime chacune
  via `deleteMemory()` (qui supprime également les vecteurs de sqlite-vec + Qdrant).

Consultez [MCP-SERVER.md](./MCP-SERVER.md) pour plus de détails sur le transport et la portée.

## Tableau de bord (Studio de mémoire)

`src/app/(dashboard)/dashboard/memory/page.tsx` est désormais un **Studio à 3 onglets** :

### Onglet : Mémoires

- Carte conceptuelle (explication réductible « Fonctionnement »).
- Liste en temps réel, recherche et pagination (temporisation de 300 ms).
- Filtre par type (`factual` / `episodic` / `procedural` / `semantic` / tous).
- Fenêtre modale d’ajout de mémoire (clé, contenu, type).
- Modification en ligne (bouton crayon → `PUT /api/memory/[id]`).
- Suppression par ligne (avec boîte de dialogue de confirmation).
- Export JSON de la page actuelle ; import JSON via un sélecteur de fichiers.
- Cartes de statistiques : `totalEntries`, `tokensUsed`, `hitRate`.
- Bouton « Compacter les anciennes » → `POST /api/memory/summarize` (une simulation affiche d’abord
  le nombre de candidats, puis demande confirmation).
- Un indicateur d’état vert/rouge piloté par `GET /api/memory/health`.

### Onglet : Bac à sable

- Champ de requête + sélecteur de stratégie (Exacte / Sémantique / Hybride) + budget de jetons.
- « Simuler » → `POST /api/memory/retrieve-preview` — affiche les résultats classés avec
  `score`, `tier`, `tokens`, `vecScore`, `ftsScore`.
- Panneau de résolution indiquant la source d’intégration / le magasin vectoriel utilisé et
  si un mécanisme de repli a été déclenché.

### Onglet : Moteur

- Panneau d’état du moteur (badge FTS5 par mots-clés, badge d’intégration, badge du magasin vectoriel,
  badge d’état de Qdrant, badge de reclassement).
- Bouton « Réindexer maintenant » → `POST /api/memory/reindex`.
- Sélecteur de source d’intégration (auto / distante / statique / transformers + options).
- Carte de configuration de Qdrant (activation, hôte/port/collection/clé, test de connexion,
  test de recherche sémantique, nettoyage).
- Carte de configuration du reclassement (activation, sélecteur de fournisseur/modèle).

Les paramètres de mémoire et de Qdrant sont également disponibles sous
`/dashboard/settings → Memory & Skills` (`MemorySkillsTab.tsx`) pour
l’interface des paramètres hérités/globaux.

## Mise en cache

`src/lib/memory/store.ts` conserve un cache en mémoire du processus de type LRU
(`MEMORY_CACHE_TTL = 1 min`, `MEMORY_MAX_CACHE_SIZE = 500`, avec éviction des 20 %
éléments les plus anciens) pour les lectures `getMemory(id)`, ainsi qu’une couche générique clé/valeur
`memoryCache` (`src/lib/memory/cache.ts`) avec des méthodes `get`/`set`/`invalidate`
utilisées par les appelants qui souhaitent leur propre cache délimité (LRU de 1 000 entrées,
TTL par défaut de 5 min).

## Confidentialité et cycle de vie

- Le propriétaire de la mémoire est l’identifiant de la clé API (`resolveMemoryOwnerId` dans
  `chatCore.ts`). Sans `apiKeyInfo.id`, ni la récupération, ni l’injection,
  ni l’extraction ne sont exécutées.
- Les entrées dont la valeur `expires_at` se situe dans le futur sont exclues de la récupération ; les anciennes
  entrées dépassant `retentionDays` sont exclues par la clause
  `created_at >= cutoff` dans `retrieveMemories`.
- Pour une suppression définitive, utilisez `DELETE /api/memory/[id]` ou `omniroute_memory_clear`.
- L’extraction est lancée sans attendre son résultat via `setImmediate` ; les échecs sont journalisés sous
  `memory.extraction.background.failed` et ne sont jamais remontés à l’appelant.
- Les allers-retours de vérification (`verifyExtractionPipeline`) nettoient leurs propres
  entrées de test dans un bloc `finally`.

## Voir aussi

- [SKILLS.md](./SKILLS.md) — le paramètre `skillsEnabled` injecte les définitions
  d’outils en même temps que la mémoire.
- [MCP-SERVER.md](./MCP-SERVER.md) — transport et portées MCP.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — surface d’API plus étendue.
- Modules sources :
  - `src/lib/memory/types.ts`, `schemas.ts`
  - `src/lib/memory/store.ts`, `retrieval.ts`, `injection.ts`, `reindex.ts`
  - `src/lib/memory/extraction.ts`, `summarization.ts`, `verify.ts`
  - `src/lib/memory/settings.ts`, `qdrant.ts`, `cache.ts`
  - `src/lib/memory/vectorStore.ts` — sqlite-vec + RRF hybride
  - `src/lib/memory/embedding/index.ts` — couche d’embedding multisource
  - `src/lib/memory/embedding/types.ts`, `remote.ts`, `staticPotion.ts`,
    `transformersLocal.ts`, `cache.ts`
  - `src/shared/schemas/memory.ts` — schémas Zod pour tous les corps de requête de l’API de mémoire
  - `src/shared/schemas/qdrant.ts` — schémas Zod pour les paramètres/opérations Qdrant
  - `src/lib/db/memoryVec.ts` — opérations CRUD pour `memory_vec_meta`
  - `src/lib/db/migrations/015_create_memories.sql`,
    `022_add_memory_fts5.sql`, `023_fix_memory_fts_uuid.sql`,
    `083_memory_vec.sql`
  - `src/app/api/memory/route.ts`, `[id]/route.ts`, `health/route.ts`
  - `src/app/api/memory/retrieve-preview/route.ts`
  - `src/app/api/memory/engine-status/route.ts`
  - `src/app/api/memory/embedding-providers/route.ts`
  - `src/app/api/memory/summarize/route.ts`
  - `src/app/api/memory/reindex/route.ts`
  - `src/app/api/settings/memory/route.ts`
  - `src/app/api/settings/qdrant/route.ts` + sous-routes
  - `src/app/(dashboard)/dashboard/memory/` — interface utilisateur Studio (page + composants +
    onglets + hooks)
  - `open-sse/handlers/chatCore.ts` (câblage de l’injection et de l’extraction)
  - `open-sse/mcp-server/tools/memoryTools.ts`

---

## Choisir un fournisseur d’embeddings (v3.8.16+)

Le moteur de mémoire d’OmniRoute prend en charge **quatre sources d’embeddings** (`src/lib/memory/embedding/`). Chacune présente différents compromis en matière de **latence, coût, qualité du modèle et complexité de configuration**.

### Les sources d’embeddings

| Fournisseur    | Source                                                   | Latence                                 | Coût                 | Qualité                            | Configuration                               |
| -------------- | -------------------------------------------------------- | --------------------------------------- | -------------------- | ---------------------------------- | ------------------------------------------- |
| `transformers` | Modèle ONNX local (Xenova/all-MiniLM-L6-v2)              | ~50-150ms (CPU)                         | Gratuit              | Bonne                              | `npm install` uniquement                    |
| `static`       | Vecteurs précalculés (mis en cache)                      | <1ms                                    | Gratuit              | S/O (dépend du cache)              | Aucune                                      |
| `remote`       | API OpenAI / Cohere / Voyage                             | ~100-300ms                              | $0.02-0.10/1M tokens | Excellente                         | Clé API                                     |
| `auto`         | Sélectionne la meilleure source disponible à l’exécution | Identique à la source choisie           | Gratuit              | Identique à la source choisie      | Aucune                                      |
| _(cache)_      | Couche LRU en mémoire sur n’importe quelle source        | <1ms (succès), latence complète (échec) | Gratuit              | Identique à la source sous-jacente | Toujours active (source non sélectionnable) |

### Arbre de décision

```
                  Quel est votre contexte de déploiement ?
                  │
      ┌───────────┼───────────┬──────────────┐
      │           │           │              │
  DÉV/TEST    PETITE PROD  GRANDE PROD   EDGE / HORS LIGNE
      │           │           │              │
      ▼           ▼           ▼              ▼
  transformers transformers remote (Qdrant) transformers
  (gratuit, sans API)       (qualité optimale) (sans Internet)
      │           │           │              │
      └────────┬──┴───────────┴──────────────┘
               │
               ▼
            TOUJOURS ajouter la couche `cache` par-dessus
            (`LruCache` encapsule n’importe quel fournisseur)
```

### Configuration de la base de données et de l’API

Les options d’embedding de la mémoire sont configurées via l’API/l’interface utilisateur des paramètres, et non via des variables d’environnement. Les clés de base de données pertinentes sous Paramètres (`normalizeMemorySettings` dans `src/lib/memory/settings.ts`) sont :

- `memoryEmbeddingSource` : `"transformers"` (local), `"remote"` (basé sur une API, par ex. OpenAI), `"static"` (stockage externe) ou `"auto"`
- `memoryEmbeddingProviderModel` : identifiant du modèle pour les sources distantes/statiques (par ex., `"text-embedding-3-small"`)
- `memoryTransformersEnabled` : `true` | `false`
- `memoryStaticEnabled` : `true` | `false`
- `memoryVectorStore` : `"sqlite-vec"`, `"qdrant"` ou `"auto"`

#### Modèle local (`transformers`)

Utilise transformers.js en interne pour exécuter des modèles locaux :

```bash
# Variables d’environnement lues dans le code (src/lib/memory/embedding/index.ts) :
MEMORY_TRANSFORMERS_MODEL=Xenova/all-MiniLM-L6-v2  # Dépôt du modèle HF
MEMORY_STATIC_MODEL=minishlab/potion-base-8M       # Modèle potion statique HF
MEMORY_STATIC_CACHE_DIR=<DATA_DIR>/embeddings      # Répertoire du cache
```

#### Cache LRU des embeddings

Le cache est toujours activé par défaut et configuré via des variables d’environnement :

```bash
MEMORY_EMBEDDING_CACHE_MAX=1000                    # Nombre maximal d’éléments mis en cache
MEMORY_EMBEDDING_CACHE_TTL_MS=300000               # TTL (5 min)
```

### Mesures de performances

Benchmark sur un serveur x86 classique à 4 cœurs (textes d’environ 100 tokens chacun) :

| Fournisseur          | p50   | p95   | p99   | Coût / 1 M de représentations vectorielles |
| -------------------- | ----- | ----- | ----- | ------------------------------------------ |
| `transformers` (CPU) | 80ms  | 180ms | 350ms | Gratuit                                    |
| `remote` (OpenAI)    | 120ms | 220ms | 400ms | ~$0.02 (ada-002) / $0.13 (3-large)         |
| `static` (Qdrant)    | 15ms  | 30ms  | 60ms  | Dépend de l’hébergement de Qdrant          |
| `cache` (succès)     | <1ms  | <1ms  | 2ms   | Gratuit                                    |

---

## Modèles d’extraction de faits (v3.8.16+)

Le module `extraction.ts` (`src/lib/memory/extraction.ts`) utilise une **correspondance par expressions régulières** pour extraire des faits structurés des messages de conversation. Comprendre ces modèles vous aide à ajuster la qualité de l’extraction à votre cas d’utilisation.

### Catégories de modèles par défaut

| Catégorie           | Exemple de modèle                                                 | Éléments capturés                        |
| ------------------- | ----------------------------------------------------------------- | ---------------------------------------- |
| PREFERENCE_PATTERNS | `"Je préfère <X>"`, `"J’aime <X>"`, `"Je déteste <X>"`            | Préférences de l’utilisateur             |
| DECISION_PATTERNS   | `"J’utiliserai <X>"`, `"J’ai décidé de <X>"`, `"J’ai choisi <X>"` | Décisions de l’utilisateur (épisodiques) |
| PATTERN_PATTERNS    | `"D’habitude, je <X>"`, `"Je <X> toujours"`, `"Je ne <X> jamais"` | Modèles comportementaux persistants      |

### Exemples de modèles (simplifiés)

```ts
// Extrait de src/lib/memory/extraction.ts
const PREFERENCE_PATTERNS = [
  /\bI\s+(?:really\s+)?prefer\s+([^.,\n]+)/gi,
  /\bI\s+(?:really\s+)?like\s+([^.,\n]+)/gi,
  /\bI\s+(?:hate|dislike|avoid)\s+([^.,\n]+)/gi,
];
const DECISION_PATTERNS = [
  /\bI'?(?:ll|will)\s+use\s+([^.,\n]+)/gi,
  /\bI\s+(?:have\s+)?decided\s+(?:to\s+)?([^.,\n]+)/gi,
];
const PATTERN_PATTERNS = [/\bI\s+usually\s+([^.,\n]+)/gi, /\bI\s+always\s+([^.,\n]+)/gi];
```

### Éléments extraits

Lorsqu’un utilisateur dit :

> « Je préfère TypeScript. J’utiliserai Postgres pour ce projet. Je fais toujours un commit avant de pousser. Je n’aime pas Python. »
> L’extraction produit 4 souvenirs :
>
> | Clé                                  | Catégorie  | Type     | Contenu                              |
> | ------------------------------------ | ---------- | -------- | ------------------------------------ |
> | `preference:typescript`              | preference | factual  | « TypeScript »                       |
> | `decision:postgres_for_this_project` | decision   | episodic | « Postgres pour ce projet »          |
> | `pattern:commit_before_pushing`      | pattern    | factual  | « faire un commit avant de pousser » |
> | `preference:python`                  | preference | factual  | « Python »                           |

### Limites de l’extraction

Pour éviter une extraction incontrôlée, les limites suivantes s’appliquent :

| Longueur minimale du contenu | 3 caractères |
| Longueur maximale du contenu | 500 caractères |

### Quand désactiver l’extraction

L’extraction s’exécute automatiquement chaque fois que la mémoire est activée ; il n’existe pas d’option distincte permettant d’activer ou de désactiver uniquement l’extraction. Pour la désactiver, désactivez entièrement la mémoire (`enabled: false`
via `PUT /api/settings/memory`). Envisagez de le faire dans les cas suivants :

- Vous traitez un volume élevé de messages et le coût de l’extraction n’est pas négligeable
- Vos conversations sont principalement temporaires (discussion, débogage) et n’ont aucune valeur à long terme
- Vous capturez déjà le contexte au moyen de plugins personnalisés

---

## Ajustement du RRF hybride (v3.8.16+)

L’algorithme **Reciprocal Rank Fusion (RRF)** combine les résultats de FTS5 (mots-clés) et vectoriels (sémantiques). Le paramètre `k` contrôle le poids accordé aux résultats moins bien classés.

### La formule

Pour chaque souvenir candidat, le score RRF est :

```
RRF(d) = Σ  1 / (k + rank_i(d))
```

Où :

- `k` est la constante (60 par défaut)
- `rank_i(d)` est le rang du document `d` dans le iᵉ système de recherche (FTS, vectoriel)
- La somme porte sur tous les systèmes de recherche

### Influence de `k` sur les résultats

| Valeur de `k`           | Effet                                                                                                        | Idéal pour                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| `k=0`                   | Fusion pure des rangs (sans lissage)                                                                         | Référence théorique                                         |
| `k=10-30`               | Accorde beaucoup de poids aux premiers résultats ; les rangs faibles contribuent à peine                     | Lorsque les 3 premiers résultats sont généralement corrects |
| **`k=60`** (par défaut) | Équilibré — les 10 premiers résultats contribuent tous de manière significative                              | Recherche généraliste                                       |
| `k=100+`                | Plus uniforme — même les résultats de rang faible peuvent dominer s’ils apparaissent dans plusieurs systèmes | Lorsque le rappel est plus important que la précision       |

### Ajustement de `k` en pratique

```bash
# Valeur par défaut
MEMORY_RRF_K=60

# Précision élevée (petite mémoire, peu de documents)
MEMORY_RRF_K=20

# Rappel maximal (grande mémoire, requêtes variées)
MEMORY_RRF_K=120
```

**Exemple avec `k=20` :**

- Rang FTS 1 → contribution `1/21 = 0.048`
- Rang FTS 10 → contribution `1/30 = 0.033`
- Rang vectoriel 1 → contribution `0.048`
- Maximum combiné : `0.096`

**Exemple avec `k=60` :**

- Rang FTS 1 → contribution `1/61 = 0.016`
- Rang FTS 10 → contribution `1/70 = 0.014`
- Rang vectoriel 1 → contribution `0.016`
- Maximum combiné : `0.033`

Avec une valeur de `k` plus élevée, la **différence relative** entre le premier résultat et celui de rang 10 est plus faible ; l’algorithme s’appuie donc davantage sur le **consensus entre les systèmes de recherche** que sur le niveau de confiance associé au premier rang.

### Quand modifier `k`

| Symptôme                                                                             | Essai recommandé                                                                     |
| ------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------ |
| Le premier résultat gagne toujours, mais il est incorrect                            | **Réduire** k (p. ex., 20) — le niveau de confiance du premier rang compte davantage |
| La bonne réponse figure dans les 5 premiers résultats, mais pas en première position | **Augmenter** k (p. ex., 100) — un score plus uniforme favorise le consensus         |
| Le rappel est élevé, mais la précision est faible                                    | **Réduire** k — affiner le classement                                                |
| Le rappel est faible (des documents pertinents manquent)                             | **Augmenter** k — donner une chance aux documents moins bien classés                 |

### Pondération RRF

La fusion réciproque des rangs utilise des poids égaux pour le rang vectoriel sémantique et le rang de recherche en texte intégral :

```
RRF(d) = 1/(k + rank_vector) + 1/(k + rank_fts)
```

Il n’existe aucune variable d’environnement permettant d’ajuster les poids individuels (`MEMORY_RRF_VECTOR_WEIGHT`/`MEMORY_RRF_FTS_WEIGHT` n’existent pas).

---

## Stratégie de synthèse (v3.8.16+)

Le module `summarization.ts` (`src/lib/memory/summarization.ts`) compresse les souvenirs plus anciens afin de limiter la taille de l’ensemble actif tout en préservant les capacités de rappel.

### Quand la synthèse se déclenche

| Déclencheur                    | Seuil (par défaut) |
| ------------------------------ | ------------------ |
| Déclenchement manuel via l’API | s/o                |

### Ce qui est synthétisé

Deux points d’entrée sont exportés depuis `summarization.ts` :

- **`summarizeMemories(apiKeyId, sessionId?, maxTokens = 4000)`** — condense les
  souvenirs d’une session en un seul texte de synthèse respectant un budget de jetons.
- **`summarizeMemoriesOlderThan(apiKeyId, days, dryRun)`** — la compaction basée
  sur l’âge utilisée par l’API : elle sélectionne chaque souvenir antérieur à `days`,
  crée à partir de ceux-ci un unique souvenir de synthèse condensé et, lorsque
  `dryRun` vaut `false`, supprime les originaux. Transmettez `dryRun: true` pour
  prévisualiser l’ensemble des candidats et le nombre total de jetons sans rien
  modifier.

Il n’existe aucune étape de regroupement par étiquette/clé ni aucune notation « essentiel ou synthétisable » par souvenir —
la sélection repose uniquement sur la limite d’âge, et le texte de synthèse est constitué
d’une ligne condensée préfixée par le type pour chaque candidat.

### Déclencher la synthèse

La synthèse est **manuelle / facultative** — le paramètre `autoSummarize` vaut
`false` par défaut, de sorte que rien n’est compacté automatiquement. Déclenchez-la via l’API :

```bash
curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

Pour la laisser désactivée, conservez simplement la valeur par défaut de `autoSummarize` (`false`).

### Conseils pour améliorer la qualité de la synthèse

- **Commencez par une prévisualisation avec `dryRun`** — `summarizeMemoriesOlderThan(..., true)` renvoie
  la liste des candidats et le nombre total de jetons afin que vous puissiez vérifier ce qui serait fusionné
  avant de supprimer les originaux.
- **Exécutez la synthèse pendant les heures de faible trafic** si vous disposez d’un corpus de souvenirs volumineux — l’appel au LLM est l’étape la plus lente

```bash
# Style cron : effectuer la synthèse chaque jour à 3 h
0 3 * * * curl -X POST http://localhost:20128/api/memory/summarize \
  -H "Authorization: Bearer $OMNIROUTE_KEY"
```

---

## Modèle de fournisseur MemoryBackend

> **Source de référence :** `src/lib/memory/backend.ts`, `src/lib/memory/genericBackend.ts`, `src/lib/memory/manager.ts`
> **Tests :** `src/lib/memory/__tests__/generic-backend.test.ts`

Le modèle de fournisseur MemoryBackend introduit une **couche d’abstraction de backend extensible** au-dessus du moteur de mémoire existant. Au lieu d’être lié à une seule implémentation de stockage, le système de mémoire prend désormais en charge plusieurs backends (SQLite, Obsidian, Notion, backends HTTP personnalisés) avec un routage configurable entre le backend principal et les backends de secours.

### Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Routes API                             │
│            (src/app/api/memory/route.ts)                  │
└──────────────────────┬───────────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────────┐
│                   MemoryManager                           │
│       Orchestrateur singleton (manager.ts)                │
│                                                          │
│  Principal ─► Backend A  (p. ex. SQLite)                 │
│  Secours ───► Backend B  (p. ex. Obsidian)               │
│               Backend C  (p. ex. Notion via GenericBackend)│
└──────────────────────┬───────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
┌────────────┐ ┌────────────┐ ┌──────────────────┐
│ Backend    │ │ Backend    │ │ Backend mémoire  │
│ SQLite     │ │ Obsidian   │ │ générique (HTTP) │
└────────────┘ └────────────┘ └──────────────────┘
```

#### Interface principale (`backend.ts`)

Chaque backend doit implémenter l’interface `MemoryBackend` :

```typescript
interface MemoryBackend {
  readonly id: string;
  readonly displayName: string;

  // CRUD
  create(input: CreateMemoryInput): Promise<Memory>;
  get(id: string): Promise<Memory | null>;
  update(id: string, updates: Partial<...>): Promise<boolean>;
  delete(id: string): Promise<boolean>;
  list(filter: MemoryFilter): Promise<{ data: Memory[]; total: number; byType: Record<string, number> }>;

  // Recherche
  search(config: SearchConfig): Promise<Memory[]>;

  // État
  health(): Promise<HealthCheckResult>;

  // Cycle de vie (facultatif)
  initialize?(): Promise<void>;
  shutdown?(): Promise<void>;
}
```

#### MemoryManager (`manager.ts`)

Orchestrateur singleton qui :

- **Enregistre** les backends via `register(backend)` — appelé au démarrage depuis `index.ts`
- **Configure** le backend principal et les backends de secours via `configure(primary, fallbacks)`
- **Achemine** les opérations CRUD et les recherches vers le backend principal, avec une chaîne de secours en cas d’échec
- **Vérifie l’état** de tous les backends périodiquement

**Comportement de secours :**

| Opération | Principal                       | Backends de secours                         |
| --------- | ------------------------------- | ------------------------------------------- |
| `create`  | ✅ Principal uniquement         | ❌                                          |
| `get`     | ✅ Essayer d’abord le principal | ✅ Secours si la valeur est nulle           |
| `update`  | ✅ Principal uniquement         | ✅ Synchronisation sans attente de résultat |
| `delete`  | ✅ Principal uniquement         | ✅ Synchronisation sans attente de résultat |
| `list`    | ✅ Principal uniquement         | ❌                                          |
| `search`  | ✅ Principal d’abord            | ✅ Secours en cas d’erreur                  |

#### GenericMemoryBackend (`genericBackend.ts`)

Un connecteur HTTP générique qui adapte n’importe quelle API REST en MemoryBackend. Utile pour :

- **Notion** — connexion via l’API Notion
- **Obsidian** — connexion via l’API REST locale d’Obsidian
- **Backends personnalisés** — tout service exposant une API RESTful de mémoire

**Configuration :**

```typescript
interface GenericBackendConfig {
  baseUrl: string;           // URL de base de l’API du backend
  apiKey?: string;           // Jeton Bearer pour l’authentification
  headers?: Record<string, string>;  // En-têtes HTTP personnalisés
  timeout?: number;          // Délai d’expiration de la requête (par défaut : 30000ms)
  backendType?: string;      // Pour la journalisation

  // Remplacements des points de terminaison (les valeurs par défaut suivent les conventions REST)
  endpoints?: {
    search?: string;   // par défaut : "/memories/search"
    create?: string;   // par défaut : "/memories"
    list?: string;     // par défaut : "/memories"
    get?: string;      // par défaut : "/memories/{id}"
    update?: string;   // par défaut : "/memories/{id}"
    delete?: string;   // par défaut : "/memories/{id}"
    health?: string;   // par défaut : "/health"
  };

  // Correspondances des noms de paramètres de requête
  queryParams?: {
    query?/apiKeyId?/limit?/offset?/strategy?/maxTokens?/type?/sessionId?/orderBy?/orderDir?/options?
  };

  // Correspondances des noms de paramètres de chemin
  pathParams?: {
    id?/memoryId?
  };
}
```

Les **backends connus** sont préconfigurés dans `KNOWN_BACKENDS` :

```typescript
createKnownBackend("obsidian"); // → GenericMemoryBackend pointant vers localhost:27123
createKnownBackend("notion"); // → GenericMemoryBackend pointant vers api.notion.com/v1
```

#### Backends intégrés

##### SQLiteBackend (`sqliteBackend.ts`)

Le backend principal par défaut. Encapsule le stockage de mémoire SQLite existant à l’aide de `src/lib/memory/store.ts`. Il est automatiquement enregistré au démarrage.

```typescript
import { sqliteBackend } from "./sqliteBackend";
memoryManager.register(sqliteBackend);
```

##### ObsidianBackend (`obsidianBackend.ts`)

Encapsule l’intégration Obsidian existante (`src/lib/memory/obsidianBackend.ts`). Se connecte à un coffre Obsidian via l’API REST locale d’Obsidian.

### Paramètres

Les paramètres des backends de mémoire sont stockés dans la table des paramètres de l’application et gérés via `src/lib/memory/settings.ts` :

| Paramètre                   | Clé d’environnement/configuration | Valeur par défaut | Description                                |
| --------------------------- | --------------------------------- | ----------------- | ------------------------------------------ |
| Backend principal           | `memoryPrimaryBackend`            | `"sqlite"`        | ID du backend principal                    |
| Backends de repli           | `memoryFallbackBackends`          | `[]`              | ID ordonnés des backends de repli          |
| Configurations des backends | `memoryBackendConfigs`            | `{}`              | Remplacements de configuration par backend |

Les paramètres sont normalisés via `normalizeMemorySettings()` et mis en cache dans `getMemorySettings()`.

### Flux d’initialisation

```
Amorçage de l’application
  → Importations de index.ts (effet secondaire) : enregistre SQLiteBackend
  → initMemoryBackends() appelé depuis le cycle de vie de l’application :
      1. Charger les paramètres (getMemorySettings)
      2. Configurer le backend principal et les backends de repli
      3. Initialiser tous les backends (vérification de l’état)
      4. Prêt à traiter les requêtes
```

### Ajout d’un nouveau backend

1. **Implémenter l’interface `MemoryBackend`** dans `src/lib/memory/<name>Backend.ts`
2. **Exporter** depuis `src/lib/memory/index.ts`
3. **Enregistrer** avec `memoryManager.register(yourBackend)` au démarrage
4. **Configurer** via les paramètres : définir `memoryPrimaryBackend` sur l’ID de votre backend
5. **Tester** en prenant `src/lib/memory/__tests__/generic-backend.test.ts` comme référence

#### Exemple : backend Brain

```typescript
import { createGenericMemoryBackend } from "./genericBackend";

const brainBackend = createGenericMemoryBackend("brain", "BK-Brain", {
  baseUrl: process.env.BRAIN_API_URL || "http://localhost:9099",
  apiKey: process.env.BRAIN_API_KEY,
  endpoints: {
    search: "/api/memory/search",
    create: "/api/memory",
    health: "/api/health",
  },
});

memoryManager.register(brainBackend);
```

### Vérification

#### Tests unitaires

```bash
npx vitest run src/lib/memory/__tests__/generic-backend.test.ts --reporter=verbose
```

Résultat attendu : **35 tests, tous réussis**, couvrant :

- Constructeur (2)
- Vérification de l’état (4) — réussite, échec 500, erreur réseau, latence
- Initialisation (2) — réussite, échec
- Création (2) — point de terminaison par défaut, point de terminaison personnalisé
- Récupération (4) — réussite, 404 → null, exception pour un code autre que 404, paramètres de chemin personnalisés
- Mise à jour (2) — réussite, 404 → false
- Suppression (2) — réussite, 404 → false
- Liste (2) — paramètres de requête, noms de paramètres personnalisés
- Recherche (3) — paramètres de requête, point de terminaison personnalisé, sérialisation des options
- En-têtes d’authentification (2) — jeton Bearer, en-têtes personnalisés
- Fabrique (1)

#### Vérification des types

```bash
npm run typecheck:core
```

Résultat attendu : **0 erreur**.
