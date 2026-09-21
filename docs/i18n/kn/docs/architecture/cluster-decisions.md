# Cluster Decisions — Optional Sidecar Profiles (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**ಸ್ಥಿತಿ:** ಪ್ರಸ್ತಾವನೆ (@diegosouzapw ಅವರ ಪರಿಶೀಲನೆಗಾಗಿ ಕಾಯುತ್ತಿದೆ)
**ದಿನಾಂಕ:** 2026-06-20
**ಉಲ್ಲೇಖಗಳು:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## ಸಂಕ್ಷಿಪ್ತವಾಗಿ

[`docker-compose.yml`](../../docker-compose.yml) ನಲ್ಲಿರುವ ಪ್ರಸ್ತುತ 8-ಸೇವೆಗಳ ನಿಯೋಜನೆಗಾಗಿ ಎರಡು ಐಚ್ಛಿಕ compose ಪ್ರೊಫೈಲ್ಗಳು (`memory`, `bifrost`). ಡೀಫಾಲ್ಟ್-up ನಡವಳಿಕೆಯು **ಬದಲಾಗಿಲ್ಲ**: 3 × `omniroute` ಪ್ರತಿಕೃತಿಗಳು + Caddy + Redis + CliproxyAPI. `docker compose --profile <name> up` ಮೂಲಕ ಸಕ್ರಿಯಗೊಳಿಸಬಹುದಾದ ಎರಡು ಹೊಸ ಪ್ರೊಫೈಲ್ಗಳು Qdrant ಮತ್ತು Bifrost ಅನ್ನು ಐಚ್ಛಿಕ ಸೈಡ್ಕಾರ್ಗಳಾಗಿ ಸೇರಿಸುತ್ತವೆ. **ಯಾವುದೇ ಪ್ರಸ್ತುತ ಸೇವೆಯನ್ನು ತೆಗೆದುಹಾಕಲಾಗುವುದಿಲ್ಲ ಅಥವಾ ಬದಲಾಯಿಸಲಾಗುವುದಿಲ್ಲ.**

## ಇದು ಏಕೆ ಸಂಪ್ರದಾಯಬದ್ಧವಾಗಿದೆ

OmniRoute ನ ಪ್ರಸ್ತುತ ನಿಯೋಜನಾ ವಿನ್ಯಾಸವು ಈಗಾಗಲೇ ಹಗುರ ಮತ್ತು ಸಾಬೀತಾಗಿರುವಂಥದ್ದಾಗಿದೆ:

- **`redis:7-alpine`** ಉತ್ಪಾದನಾ ಪ್ರಮಾಣದಲ್ಲಿ ದರ-ಮಿತಿ/ಕ್ಯಾಶ್ ಕಾರ್ಯಭಾರವನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ.
- **SQLite + sqlite-vec + FTS5** ಸ್ಥಳೀಯ ಮೆಮೊರಿ + ವೆಕ್ಟರ್ + ಪಠ್ಯ-ಹುಡುಕಾಟವನ್ನು ನಿರ್ವಹಿಸುತ್ತವೆ ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) ನೋಡಿ).
- **Caddy** ಈಗಾಗಲೇ LB + TLS ಟರ್ಮಿನೇಟರ್ ಆಗಿದೆ ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** ಅನ್ನು ಈಗಾಗಲೇ [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) ನಲ್ಲಿ Tier-1 ರೌಟರ್ ಆಗಿ ಸಂಯೋಜಿಸಲಾಗಿದೆ (`BIFROST_ENABLED` env var ಮೂಲಕ ಕಿಲ್ ಸ್ವಿಚ್ ಹೊಂದಿರುವ ಸೈಡ್ಕಾರ್ ಪ್ರಾಕ್ಸಿ — ಸೈಡ್ಕಾರ್ ಅನ್ನು ಬೈಪಾಸ್ ಮಾಡಿ TS ಪಥಕ್ಕೆ ಮುಂದುವರಿಯಲು `=0` ಎಂದು ಹೊಂದಿಸಿ).

ಇಲ್ಲಿನ ಎರಡು ಪ್ರೊಫೈಲ್ಗಳು **SQLite ಮಿತಿಯನ್ನು ತಲುಪುವ ನಿಯೋಜನೆಗಳಿಗಾಗಿ ಸ್ಕೇಲ್-ಔಟ್ ಆಯ್ಕೆಗಳಾಗಿವೆ** — ಮೈಗ್ರೇಶನ್ಗಳಲ್ಲ. ಎರಡೂ ಡೀಫಾಲ್ಟ್ ಆಗಿ ನಿಷ್ಕ್ರಿಯವಾಗಿವೆ.

## ಎರಡು ಪ್ರೊಫೈಲ್ಗಳು

### `memory` — Qdrant ವೆಕ್ಟರ್ ಮೆಮೊರಿ ಸೈಡ್ಕಾರ್

**ಯಾವಾಗ ಸಕ್ರಿಯಗೊಳಿಸಬೇಕು:**

- ಪ್ರತಿ ನಿಯೋಜನೆಗೆ > 1M ಎಂಬೆಡಿಂಗ್ಗಳು ಇದ್ದಾಗ (sqlite-vec ದೊಡ್ಡ ಪ್ರಮಾಣದಲ್ಲಿ ನಿಧಾನಗೊಳ್ಳಲು ಪ್ರಾರಂಭಿಸುತ್ತದೆ).
- `omniroute-1/2/3` ನಡುವೆ ಹಂಚಿದ ವೆಕ್ಟರ್ ಸ್ಥಿತಿಯ ಅಗತ್ಯವಿರುವ ಬಹು-ಪ್ರತಿಕೃತಿ ನಿಯೋಜನೆ.
- ನೀವು ಈಗಾಗಲೇ ಬಾಹ್ಯ Qdrant ಕ್ಲಸ್ಟರ್ ಅನ್ನು ಹೊಂದಿದ್ದೀರಿ (Qdrant Cloud, ಆನ್-ಪ್ರೆಮೈಸ್).

**ಇದು ಸೇರಿಸುವುದು:**

| ಸೇವೆ     | ಇಮೇಜ್                   | ಪೋರ್ಟ್ಗಳು   | ಟಿಪ್ಪಣಿಗಳು                                            |
| -------- | ----------------------- | ----------- | ----------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW ಸೂಚ್ಯಂಕ; ಶಾಶ್ವತ ವಾಲ್ಯೂಮ್ `omniroute_qdrant_data` |

**ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ:** Settings UI ನಲ್ಲಿ `qdrantEnabled = true` ಗೆ ಬದಲಿಸಿ **ಅಥವಾ** `QDRANT_HOST=qdrant` env ಅನ್ನು ಹೊಂದಿಸಿ. ಆದ್ಯತೆಯ ನಿಯಮಗಳಿಗಾಗಿ [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) ನೋಡಿ (ಸೆಟ್ಟಿಂಗ್ಸ್ ಟೇಬಲ್ → env var → ಡೀಫಾಲ್ಟ್).

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example` ನ 1672-1683 ಸಾಲುಗಳನ್ನು ನೋಡಿ).

### `bifrost` — Bifrost Tier-1 ರೌಟರ್ ಸೈಡ್ಕಾರ್

**ಯಾವಾಗ ಸಕ್ರಿಯಗೊಳಿಸಬೇಕು:**

- ನೀವು ≥3 `omniroute` ಪ್ರತಿಕೃತಿಗಳನ್ನು ಚಲಾಯಿಸುತ್ತಿದ್ದೀರಿ ಮತ್ತು ಒದಗಿಸುವವರ ಸರದಿಯನ್ನು ಒಂದೇ Go ಪ್ರಕ್ರಿಯೆಯಲ್ಲಿ ಕೇಂದ್ರೀಕರಿಸಲು ಬಯಸುತ್ತೀರಿ.
- ಎಲ್ಲಾ ಪ್ರತಿಕೃತಿಗಳಾದ್ಯಂತ ಅಪ್ಸ್ಟ್ರೀಮ್-ಒದಗಿಸುವವರ ವಿನಂತಿಗಳಿಗಾಗಿ ಒಂದೇ ಆಡಿಟ್/ಲಾಗಿಂಗ್ ಮೇಲ್ಮೈಯನ್ನು ಬಯಸುತ್ತೀರಿ.
- OmniRoute ಪ್ರತಿಕೃತಿಗಳಿಂದ ಸ್ವತಂತ್ರವಾಗಿ Tier-1 ರೌಟಿಂಗ್ ಪದರವನ್ನು ಸಮತಲವಾಗಿ ಸ್ಕೇಲ್ ಮಾಡಲು ಬಯಸುತ್ತೀರಿ.

**ಇದು ಸೇರಿಸುವುದು:**

| ಸೇವೆ      | ಇಮೇಜ್                             | ಪೋರ್ಟ್ಗಳು | ಟಿಪ್ಪಣಿಗಳು                                                              |
| --------- | --------------------------------- | --------- | ----------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`    | Go-ಆಧಾರಿತ Tier-1 ರೌಟರ್; ಶಾಶ್ವತ ಲಾಗ್ಗಳ ವಾಲ್ಯೂಮ್ `omniroute_bifrost_logs` |

**ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ:** `.env.example` ನಲ್ಲಿ `BIFROST_BASE_URL=http://bifrost:8080` ಅನ್ನು ಹೊಂದಿಸಿ. [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) ನಲ್ಲಿರುವ ಪ್ರಸ್ತುತ ಸೈಡ್ಕಾರ್ ಪ್ರಾಕ್ಸಿ ಮಾರ್ಗವು (PR #4381 ರಲ್ಲಿ ಸೇರಿಸಲಾಗಿದೆ) ಇದನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಬಳಸುತ್ತದೆ.

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example` ನ 1685-1695 ಸಾಲುಗಳನ್ನು ನೋಡಿ).

## ಈ PR ಸ್ಪಷ್ಟವಾಗಿ ಏನನ್ನು ಮಾಡುವುದಿಲ್ಲ

ಮೂಲ issue thread ದೊಡ್ಡ ಮಟ್ಟದ cluster ಮರುರಚನೆಯನ್ನು ಪ್ರಸ್ತಾಪಿಸಿತ್ತು. ವಾಸ್ತವಿಕ workload ಸ್ವರೂಪವನ್ನು ಪರಿಶೀಲಿಸಿದ ನಂತರ, ನೀಡಿರುವ ಕಾರಣಗಳಿಗಾಗಿ ಕೆಳಗಿನವುಗಳನ್ನು **ತಿರಸ್ಕರಿಸಲಾಗಿದೆ**:

| ಘಟಕ                                  | ತೀರ್ಪು     | ಕಾರಣ                                                                                                                      |
| ------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ಕೈಬಿಡಿ** | production ಪ್ರಮಾಣದ rate-limit workloadಗೆ `redis:7-alpine` ಈಗಾಗಲೇ ಸಾಕಾಗುತ್ತದೆ; ಮೀರಿಸಬೇಕಾದ ಯಾವುದೇ ಮಿತಿ ಇಲ್ಲ.                |
| **NATS**                             | **ಕೈಬಿಡಿ** | ಪ್ರತಿ `omniroute` replica ಒಂದೇ Node.js process ಆಗಿದೆ; ಯಾವುದೇ multi-process pub/sub workload ಅಸ್ತಿತ್ವದಲ್ಲಿಲ್ಲ.             |
| **PostgreSQL**                       | **ಕೈಬಿಡಿ** | SQLite + sqlite-vec + FTS5 ಎಲ್ಲಾ 3 use caseಗಳನ್ನು ಪೂರೈಸುತ್ತವೆ; 97 migrationಗಳು + Electron packaging ವಲಸೆಯನ್ನು ತಡೆಯುತ್ತವೆ. |
| **Neo4j**                            | **ಕೈಬಿಡಿ** | Routing 5-table join ಆಗಿದೆ; SQLiteನ recursive CTE ಸಾಕಾಗುತ್ತದೆ.                                                            |
| **MinIO**                            | **ಕೈಬಿಡಿ** | multi-MB blob workload ಇಲ್ಲ; images/audio passthrough proxyಗಳಾಗಿವೆ.                                                       |
| **pgvector / pg_ai / pg_textsearch** | **ಕೈಬಿಡಿ** | PostgreSQLನಂತೆಯೇ SQLite ಮಿತಿಯ ಕಾರಣ; pgvector ecosystem ವಿಭಜಿತವಾಗಿದೆ.                                                      |
| **HAProxy / Envoy**                  | **ಕೈಬಿಡಿ** | Caddy ಈಗಾಗಲೇ LB + TLS ನಿರ್ವಹಿಸುತ್ತದೆ; ಎರಡನ್ನೂ Tier-1 routerಗಳಾಗಿ ಸ್ಪಷ್ಟವಾಗಿ ತಿರಸ್ಕರಿಸಲಾಗಿದೆ (`AGENTS.md` ನೋಡಿ).           |

ಭವಿಷ್ಯದ use case ಇವುಗಳಲ್ಲಿ ಒಂದರ ಅಗತ್ಯವನ್ನು ಸಾಬೀತುಪಡಿಸಿದರೆ, ತಿದ್ದುಪಡಿ ಮಾಡಬೇಕಾದ ಸ್ಥಳ ಈ doc ಆಗಿದೆ.

## 4-ವಾರಗಳ rollout (ಅನುಮೋದಿಸಿದರೆ)

1. **ವಾರ 1** — ಈ PR ಅನ್ನು ಸೇರಿಸುವುದು + 3-replica compose stackನೊಂದಿಗೆ opt-in profileಗಳ ಪರಿಶೀಲನೆ.
2. **ವಾರ 2** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) ನಲ್ಲಿನ sidecar proxy route ಬಳಸಿ OpenAI/Claude/Gemini/Ollamaಗಾಗಿ (14+ providerಗಳಲ್ಲಿ 4) Bifrostನ ಸಂಪೂರ್ಣ ಸಕ್ರಿಯಗೊಳಿಸುವಿಕೆ (`BIFROST_ENABLED` ಮೂಲಕ ನಿಯಂತ್ರಿತ, runtimeನಲ್ಲಿ kill-switch ಮಾಡಬಹುದಾದದ್ದು).
3. **ವಾರ 3** — ಒಂದೇ test deploymentನಲ್ಲಿ Qdrant memory profile ಅನ್ನು ಸಕ್ರಿಯಗೊಳಿಸುವುದು; sqlite-vecಗೆ ಹೋಲಿಸಿದ latency ವ್ಯತ್ಯಾಸವನ್ನು ಅಳೆಯುವುದು.
4. **ವಾರ 4** — Observability healthcheckಗಳು (`docker compose ps` exit codeಗಳು + `wget` smoke testಗಳು); ADR-041 ಪ್ರಕಾರ 71-pillar refresh.

## ಈ PR ನಲ್ಲಿ ಬದಲಾಯಿಸಲಾದ fileಗಳು

| File                                              | ಬದಲಾವಣೆ                                                                                                                                                                                                        |
| ------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                              | +30 ಸಾಲುಗಳು: `memory` profile (Qdrant), `bifrost` profile (Bifrost), persistent volumeಗಳು, healthcheckಗಳು.                                                                                                     |
| `.env.example`                                    | +24 ಸಾಲುಗಳು: `QDRANT_*` (6 varಗಳು), `BIFROST_*` (4 varಗಳು).                                                                                                                                                    |
| `docs/reference/ENVIRONMENT.md`                   | `QDRANT_*` env varಗಳಿಗಾಗಿ section 25ರಲ್ಲಿ +6 rowಗಳು.                                                                                                                                                           |
| `src/lib/memory/qdrant.ts`                        | +33 ಸಾಲುಗಳು: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` ಗಾಗಿ env-var fallback chain (settings → env → default). |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`  | +88 ಸಾಲುಗಳು: env-var fallback ಆದ್ಯತೆಯನ್ನು ಸ್ಥಿರಗೊಳಿಸುವ 9 ಹೊಸ test caseಗಳು.                                                                                                                                     |
| `docs/architecture/cluster-decisions.md` (ಈ file) | ಹೊಸದು — opt-in profileಗಳಿಗಾಗಿನ decision record.                                                                                                                                                                |
| `AGENTS.md`                                       | +1 ಸಾಲು: reference documentation tableನಲ್ಲಿ ಈ docಗೆ pointer.                                                                                                                                                   |

**ಒಟ್ಟಾರೆ ಸ್ಪರ್ಶಿಸಲಾದ code:** 4 production fileಗಳು (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 test file (`qdrant-wiring.test.ts`), 2 doc fileಗಳು (`cluster-decisions.md`, `AGENTS.md`).
