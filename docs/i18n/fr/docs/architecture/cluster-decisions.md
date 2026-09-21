# Cluster Decisions — Optional Sidecar Profiles (Français)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Statut :** proposition (en attente de la revue de @diegosouzapw)
**Date :** 2026-06-20
**Références :** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

Deux profils Compose facultatifs (`memory`, `bifrost`) pour le déploiement existant de 8 services dans [`docker-compose.yml`](../../docker-compose.yml). Le comportement de démarrage par défaut reste **inchangé** : 3 réplicas `omniroute` + Caddy + Redis + CliproxyAPI. Les deux nouveaux profils ajoutent Qdrant et Bifrost en tant que sidecars facultatifs, activés via `docker compose --profile <name> up`. **Aucun service existant n’est supprimé ni remplacé.**

## Pourquoi cette approche est prudente

L’architecture de déploiement existante d’OmniRoute est déjà légère et éprouvée :

- **`redis:7-alpine`** gère la charge de limitation du débit et de mise en cache à l’échelle de la production.
- **SQLite + sqlite-vec + FTS5** couvrent la mémoire locale, les vecteurs et la recherche textuelle (voir [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** assure déjà l’équilibrage de charge et la terminaison TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** est déjà intégré comme routeur de niveau 1 dans [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (proxy sidecar avec mécanisme d’arrêt via la variable d’environnement `BIFROST_ENABLED` — définissez-la sur `=0` pour contourner le sidecar et revenir au chemin TS).

Les deux profils présentés ici sont des **options de mise à l’échelle pour les déploiements qui atteignent les limites de SQLite** — et non des migrations. Ils sont tous deux désactivés par défaut.

## Les deux profils

### `memory` — Sidecar de mémoire vectorielle Qdrant

**Quand l’activer :**

- > 1 million d’embeddings par déploiement (sqlite-vec commence à ralentir à grande échelle).
- Déploiement à plusieurs réplicas nécessitant un état vectoriel partagé entre `omniroute-1/2/3`.
- Vous disposez déjà d’un cluster Qdrant externe (Qdrant Cloud, sur site).

**Ce qu’il ajoute :**

| Service  | Image                   | Ports       | Remarques                                              |
| -------- | ----------------------- | ----------- | ------------------------------------------------------ |
| `qdrant` | `qdrant/qdrant:v1.12.4` | HTTP `6333` | Index HNSW ; volume persistant `omniroute_qdrant_data` |

**Activation :** activez `qdrantEnabled = true` dans l’interface des paramètres **ou** définissez la variable d’environnement `QDRANT_HOST=qdrant`. Consultez [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) pour connaître les règles de priorité (table des paramètres → variable d’environnement → valeur par défaut).

**Variables d’environnement :** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (voir les lignes 1672-1683 de `.env.example`).

### `bifrost` — Sidecar du routeur Bifrost de niveau 1

**Quand l’activer :**

- Vous exécutez ≥3 réplicas `omniroute` et souhaitez centraliser la rotation des fournisseurs dans un seul processus Go.
- Vous souhaitez disposer d’une interface unique d’audit et de journalisation pour les requêtes adressées aux fournisseurs en amont depuis tous les réplicas.
- Vous souhaitez mettre à l’échelle horizontalement la couche de routage de niveau 1, indépendamment des réplicas OmniRoute.

**Ce qu’il ajoute :**

| Service   | Image                             | Ports  | Remarques                                                                                |
| --------- | --------------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Routeur de niveau 1 basé sur Go ; volume persistant de journaux `omniroute_bifrost_logs` |

**Activation :** définissez `BIFROST_BASE_URL=http://bifrost:8080` dans `.env.example`. La route existante du proxy sidecar dans [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (ajoutée dans la PR #4381) la détectera automatiquement.

**Variables d’environnement :** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (voir les lignes 1685-1695 de `.env.example`).

## Ce que cette PR ne fait explicitement PAS

Le fil de discussion de l’issue d’origine envisageait une réécriture plus vaste du cluster. Après analyse de la charge de travail réelle, les composants suivants sont **écartés** pour les raisons indiquées :

| Composant                            | Verdict     | Raison                                                                                                                                   |
| ------------------------------------ | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ABANDON** | `redis:7-alpine` convient déjà à la charge de travail de limitation de débit à l’échelle de la production ; aucune limite à dépasser.    |
| **NATS**                             | **ABANDON** | Chaque réplique `omniroute` est un processus Node.js unique ; aucune charge de travail pub/sub multiprocessus n’existe.                  |
| **PostgreSQL**                       | **ABANDON** | SQLite + sqlite-vec + FTS5 couvrent les 3 cas d’usage ; 97 migrations + le packaging Electron bloquent la migration.                     |
| **Neo4j**                            | **ABANDON** | Le routage consiste en une jointure de 5 tables ; une CTE récursive sur SQLite suffit.                                                   |
| **MinIO**                            | **ABANDON** | Aucune charge de travail portant sur des blobs de plusieurs Mo ; les images et l’audio transitent par des proxys transparents.           |
| **pgvector / pg_ai / pg_textsearch** | **ABANDON** | Même raison liée aux limites de SQLite que pour PostgreSQL ; l’écosystème pgvector est fragmenté.                                        |
| **HAProxy / Envoy**                  | **ABANDON** | Caddy assure déjà l’équilibrage de charge + TLS ; tous deux ont été explicitement écartés comme routeurs de niveau 1 (voir `AGENTS.md`). |

Si un futur cas d’usage démontre la pertinence de l’un de ces composants, ce document devra être modifié en conséquence.

## Déploiement sur 4 semaines (si approuvé)

1. **Sem. 1** — Intégrer cette PR + vérifier les profils optionnels avec une stack Compose à 3 répliques.
2. **Sem. 2** — Activation complète de Bifrost pour OpenAI/Claude/Gemini/Ollama (4 fournisseurs sur plus de 14) via la route du proxy side-car située dans [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (contrôlée par `BIFROST_ENABLED`, avec possibilité de désactivation immédiate à l’exécution).
3. **Sem. 3** — Activer le profil de mémoire Qdrant dans un déploiement de test unique ; mesurer l’écart de latence par rapport à sqlite-vec.
4. **Sem. 4** — Vérifications d’état de l’observabilité (codes de sortie de `docker compose ps` + tests rapides avec `wget`) ; actualisation des 71 piliers conformément à ADR-041.

## Fichiers modifiés dans cette PR

| Fichier                                               | Modification                                                                                                                                                                                                                                                |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                  | +30 lignes : profil `memory` (Qdrant), profil `bifrost` (Bifrost), volumes persistants, vérifications d’état.                                                                                                                                               |
| `.env.example`                                        | +24 lignes : `QDRANT_*` (6 variables), `BIFROST_*` (4 variables).                                                                                                                                                                                           |
| `docs/reference/ENVIRONMENT.md`                       | +6 lignes dans la section 25 pour les variables d’environnement `QDRANT_*`.                                                                                                                                                                                 |
| `src/lib/memory/qdrant.ts`                            | +33 lignes : chaîne de repli des variables d’environnement (paramètres → environnement → valeur par défaut) pour `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`      | +88 lignes : 9 nouveaux cas de test fixant la priorité des valeurs de repli des variables d’environnement.                                                                                                                                                  |
| `docs/architecture/cluster-decisions.md` (ce fichier) | NOUVEAU — journal des décisions relatives aux profils optionnels.                                                                                                                                                                                           |
| `AGENTS.md`                                           | +1 ligne : pointeur vers ce document dans le tableau de la documentation de référence.                                                                                                                                                                      |

**Code affecté au total :** 4 fichiers de production (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 fichier de test (`qdrant-wiring.test.ts`), 2 fichiers de documentation (`cluster-decisions.md`, `AGENTS.md`).
