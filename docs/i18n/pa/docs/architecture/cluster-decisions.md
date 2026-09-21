# Cluster Decisions — Optional Sidecar Profiles (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**ਸਥਿਤੀ:** ਪ੍ਰਸਤਾਵ (@diegosouzapw ਦੀ ਸਮੀਖਿਆ ਦੀ ਉਡੀਕ ਵਿੱਚ)
**ਮਿਤੀ:** 2026-06-20
**ਹਵਾਲੇ:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## ਸੰਖੇਪ

[`docker-compose.yml`](../../docker-compose.yml) ਵਿੱਚ ਮੌਜੂਦਾ 8-ਸੇਵਾ ਡਿਪਲੌਇਮੈਂਟ ਲਈ ਦੋ ਆਪਟ-ਇਨ compose ਪ੍ਰੋਫ਼ਾਈਲ (`memory`, `bifrost`)। ਡਿਫਾਲਟ-up ਵਿਹਾਰ **ਬਦਲਿਆ ਨਹੀਂ ਗਿਆ** ਹੈ: 3 × `omniroute` ਰੈਪਲਿਕਾ + Caddy + Redis + CliproxyAPI। ਦੋਵੇਂ ਨਵੇਂ ਪ੍ਰੋਫ਼ਾਈਲ Qdrant ਅਤੇ Bifrost ਨੂੰ ਵਿਕਲਪਿਕ sidecar ਵਜੋਂ ਜੋੜਦੇ ਹਨ, ਜਿਨ੍ਹਾਂ ਨੂੰ `docker compose --profile <name> up` ਰਾਹੀਂ ਚਾਲੂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। **ਕਿਸੇ ਵੀ ਮੌਜੂਦਾ ਸੇਵਾ ਨੂੰ ਹਟਾਇਆ ਜਾਂ ਬਦਲਿਆ ਨਹੀਂ ਗਿਆ ਹੈ।**

## ਇਹ ਰੂੜ੍ਹੀਵਾਦੀ ਕਿਉਂ ਹੈ

OmniRoute ਦਾ ਮੌਜੂਦਾ ਡਿਪਲੌਇਮੈਂਟ ਢਾਂਚਾ ਪਹਿਲਾਂ ਹੀ ਹਲਕਾ ਅਤੇ ਸਾਬਤ-ਸ਼ੁਦਾ ਹੈ:

- **`redis:7-alpine`** ਪ੍ਰੋਡਕਸ਼ਨ ਪੱਧਰ 'ਤੇ ਰੇਟ-ਲਿਮਿਟ/ਕੈਸ਼ ਵਰਕਲੋਡ ਸੰਭਾਲਦਾ ਹੈ।
- **SQLite + sqlite-vec + FTS5** ਲੋਕਲ ਮੈਮੋਰੀ + ਵੈਕਟਰ + ਟੈਕਸਟ-ਖੋਜ ਨੂੰ ਕਵਰ ਕਰਦੇ ਹਨ ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) ਵੇਖੋ)।
- **Caddy** ਪਹਿਲਾਂ ਹੀ LB + TLS ਟਰਮੀਨੇਟਰ ਹੈ ([`docker-compose.yml`](../../docker-compose.yml))।
- **Bifrost** ਪਹਿਲਾਂ ਹੀ [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) ਵਿੱਚ Tier-1 ਰਾਊਟਰ ਵਜੋਂ ਏਕੀਕ੍ਰਿਤ ਹੈ (`BIFROST_ENABLED` env var ਰਾਹੀਂ kill switch ਵਾਲਾ sidecar proxy — sidecar ਨੂੰ ਬਾਈਪਾਸ ਕਰਕੇ TS ਪਾਥ 'ਤੇ ਜਾਣ ਲਈ `=0` ਸੈੱਟ ਕਰੋ)।

ਇੱਥੇ ਦਿੱਤੇ ਦੋਵੇਂ ਪ੍ਰੋਫ਼ਾਈਲ **ਉਨ੍ਹਾਂ ਡਿਪਲੌਇਮੈਂਟਾਂ ਲਈ ਸਕੇਲ-ਆਉਟ ਵਿਕਲਪ ਹਨ ਜੋ SQLite ਦੀ ਸੀਮਾ ਤੱਕ ਪਹੁੰਚ ਜਾਂਦੀਆਂ ਹਨ** — ਇਹ ਮਾਈਗ੍ਰੇਸ਼ਨ ਨਹੀਂ ਹਨ। ਦੋਵੇਂ ਡਿਫਾਲਟ ਰੂਪ ਵਿੱਚ ਬੰਦ ਹਨ।

## ਦੋ ਪ੍ਰੋਫ਼ਾਈਲ

### `memory` — Qdrant ਵੈਕਟਰ ਮੈਮੋਰੀ Sidecar

**ਕਦੋਂ ਚਾਲੂ ਕਰਨਾ ਹੈ:**

- ਪ੍ਰਤੀ ਡਿਪਲੌਇਮੈਂਟ > 1M embeddings (sqlite-vec ਵੱਡੇ ਪੈਮਾਨੇ 'ਤੇ ਹੌਲਾ ਹੋਣਾ ਸ਼ੁਰੂ ਕਰ ਦਿੰਦਾ ਹੈ)।
- Multi-replica ਡਿਪਲੌਇਮੈਂਟ ਜਿਸ ਨੂੰ `omniroute-1/2/3` ਵਿਚਕਾਰ ਸਾਂਝੀ ਵੈਕਟਰ ਸਥਿਤੀ ਦੀ ਲੋੜ ਹੈ।
- ਤੁਹਾਡੇ ਕੋਲ ਪਹਿਲਾਂ ਹੀ ਇੱਕ ਬਾਹਰੀ Qdrant ਕਲੱਸਟਰ ਹੈ (Qdrant Cloud, on-prem)।

**ਇਹ ਕੀ ਜੋੜਦਾ ਹੈ:**

| ਸੇਵਾ     | ਇਮੇਜ                    | ਪੋਰਟਾਂ      | ਨੋਟਸ                                             |
| -------- | ----------------------- | ----------- | ------------------------------------------------ |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW ਇੰਡੈਕਸ; ਸਥਾਈ ਵਾਲਿਊਮ `omniroute_qdrant_data` |

**ਐਕਟੀਵੇਸ਼ਨ:** Settings UI ਵਿੱਚ `qdrantEnabled = true` ਕਰੋ **ਜਾਂ** `QDRANT_HOST=qdrant` env ਸੈੱਟ ਕਰੋ। ਤਰਜੀਹ ਨਿਯਮਾਂ ਲਈ [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) ਵੇਖੋ (ਸੈਟਿੰਗਾਂ ਟੇਬਲ → env var → ਡਿਫਾਲਟ)।

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example` ਦੀਆਂ ਲਾਈਨਾਂ 1672-1683 ਵੇਖੋ)।

### `bifrost` — Bifrost Tier-1 ਰਾਊਟਰ Sidecar

**ਕਦੋਂ ਚਾਲੂ ਕਰਨਾ ਹੈ:**

- ਤੁਸੀਂ ≥3 `omniroute` ਰੈਪਲਿਕਾ ਚਲਾਉਂਦੇ ਹੋ ਅਤੇ ਇੱਕੋ Go ਪ੍ਰਕਿਰਿਆ ਵਿੱਚ ਕੇਂਦਰੀਕ੍ਰਿਤ ਪ੍ਰਦਾਤਾ ਰੋਟੇਸ਼ਨ ਚਾਹੁੰਦੇ ਹੋ।
- ਤੁਸੀਂ ਸਾਰੇ ਰੈਪਲਿਕਾਵਾਂ ਵਿੱਚ upstream-provider ਬੇਨਤੀਆਂ ਲਈ ਇੱਕੋ ਆਡਿਟ/ਲੌਗਿੰਗ ਸਤ੍ਹਾ ਚਾਹੁੰਦੇ ਹੋ।
- ਤੁਸੀਂ OmniRoute ਰੈਪਲਿਕਾਵਾਂ ਤੋਂ ਸੁਤੰਤਰ ਤੌਰ 'ਤੇ Tier-1 ਰਾਊਟਿੰਗ ਲੇਅਰ ਦੀ ਹੋਰਿਜ਼ਾਂਟਲ ਸਕੇਲਿੰਗ ਚਾਹੁੰਦੇ ਹੋ।

**ਇਹ ਕੀ ਜੋੜਦਾ ਹੈ:**

| ਸੇਵਾ      | ਇਮੇਜ                              | ਪੋਰਟਾਂ | ਨੋਟਸ                                                             |
| --------- | --------------------------------- | ------ | ---------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-ਅਧਾਰਿਤ Tier-1 ਰਾਊਟਰ; ਸਥਾਈ ਲੌਗ ਵਾਲਿਊਮ `omniroute_bifrost_logs` |

**ਐਕਟੀਵੇਸ਼ਨ:** `.env.example` ਵਿੱਚ `BIFROST_BASE_URL=http://bifrost:8080` ਸੈੱਟ ਕਰੋ। [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) 'ਤੇ ਮੌਜੂਦਾ sidecar proxy ਰੂਟ (PR #4381 ਵਿੱਚ ਜੋੜਿਆ ਗਿਆ) ਇਸ ਨੂੰ ਆਪਣੇ ਆਪ ਵਰਤ ਲਵੇਗਾ।

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example` ਦੀਆਂ ਲਾਈਨਾਂ 1685-1695 ਵੇਖੋ)।

## ਇਹ PR ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਕੀ **ਨਹੀਂ** ਕਰਦਾ

ਮੂਲ issue thread ਵਿੱਚ ਵੱਡੇ cluster rewrite ਦਾ ਵਿਚਾਰ ਪੇਸ਼ ਕੀਤਾ ਗਿਆ ਸੀ। ਅਸਲ workload ਦੀ ਬਣਤਰ ਦੀ ਸਮੀਖਿਆ ਕਰਨ ਤੋਂ ਬਾਅਦ, ਹੇਠ ਲਿਖਿਆਂ ਨੂੰ ਦਿੱਤੇ ਕਾਰਨਾਂ ਕਰਕੇ **ਰੱਦ** ਕੀਤਾ ਗਿਆ ਹੈ:

| ਕੰਪੋਨੈਂਟ                             | ਫ਼ੈਸਲਾ   | ਕਾਰਨ                                                                                                                   |
| ------------------------------------ | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ਹਟਾਓ** | production scale 'ਤੇ rate-limit workload ਲਈ `redis:7-alpine` ਪਹਿਲਾਂ ਹੀ ਕਾਫ਼ੀ ਹੈ; ਪਾਰ ਕਰਨ ਲਈ ਕੋਈ ਸੀਮਾ ਨਹੀਂ ਹੈ।          |
| **NATS**                             | **ਹਟਾਓ** | ਹਰੇਕ `omniroute` replica ਇੱਕੋ Node.js process ਹੈ; ਕੋਈ multi-process pub/sub workload ਮੌਜੂਦ ਨਹੀਂ ਹੈ।                    |
| **PostgreSQL**                       | **ਹਟਾਓ** | SQLite + sqlite-vec + FTS5 ਤਿੰਨੇ use cases ਨੂੰ ਕਵਰ ਕਰਦੇ ਹਨ; 97 migrations + Electron packaging migration ਨੂੰ ਰੋਕਦੇ ਹਨ। |
| **Neo4j**                            | **ਹਟਾਓ** | Routing ਇੱਕ 5-table join ਹੈ; SQLite ਉੱਤੇ recursive CTE ਕਾਫ਼ੀ ਹੈ।                                                       |
| **MinIO**                            | **ਹਟਾਓ** | ਕੋਈ multi-MB blob workload ਨਹੀਂ ਹੈ; images/audio passthrough proxies ਹਨ।                                               |
| **pgvector / pg_ai / pg_textsearch** | **ਹਟਾਓ** | PostgreSQL ਵਾਲਾ ਹੀ SQLite-ceiling ਕਾਰਨ; pgvector ecosystem ਖੰਡਿਤ ਹੈ।                                                   |
| **HAProxy / Envoy**                  | **ਹਟਾਓ** | Caddy ਪਹਿਲਾਂ ਹੀ LB + TLS ਕਰਦਾ ਹੈ; ਦੋਵਾਂ ਨੂੰ Tier-1 routers ਵਜੋਂ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਰੱਦ ਕੀਤਾ ਗਿਆ ਸੀ (`AGENTS.md` ਵੇਖੋ)।      |

ਜੇ ਭਵਿੱਖ ਵਿੱਚ ਕੋਈ use case ਇਨ੍ਹਾਂ ਵਿੱਚੋਂ ਕਿਸੇ ਦੀ ਲੋੜ ਸਾਬਤ ਕਰਦਾ ਹੈ, ਤਾਂ ਸੋਧ ਲਈ ਇਹੀ doc ਉਚਿਤ ਥਾਂ ਹੈ।

## 4-ਹਫ਼ਤਿਆਂ ਦਾ rollout (ਜੇ ਮਨਜ਼ੂਰ ਹੋਵੇ)

1. **ਹਫ਼ਤਾ 1** — ਇਸ PR ਨੂੰ land ਕਰਨਾ + 3-replica compose stack ਨਾਲ opt-in profiles ਦੀ ਤਸਦੀਕ।
2. **ਹਫ਼ਤਾ 2** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) 'ਤੇ sidecar proxy route ਦੀ ਵਰਤੋਂ ਕਰਕੇ OpenAI/Claude/Gemini/Ollama (14+ providers ਵਿੱਚੋਂ 4) ਲਈ Bifrost ਦੀ ਪੂਰੀ activation (`BIFROST_ENABLED` ਨਾਲ gated, runtime ਦੌਰਾਨ kill-switch ਯੋਗ)।
3. **ਹਫ਼ਤਾ 3** — ਇੱਕ test deployment ਵਿੱਚ Qdrant memory profile ਸਮਰੱਥ ਕਰਨਾ; sqlite-vec ਦੇ ਮੁਕਾਬਲੇ latency delta ਮਾਪਣਾ।
4. **ਹਫ਼ਤਾ 4** — Observability healthchecks (`docker compose ps` exit codes + `wget` smoke tests); ADR-041 ਮੁਤਾਬਕ 71-pillar refresh।

## ਇਸ PR ਵਿੱਚ ਬਦਲੀਆਂ ਗਈਆਂ ਫ਼ਾਈਲਾਂ

| ਫ਼ਾਈਲ                                               | ਬਦਲਾਅ                                                                                                                                                                                                       |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                | +30 ਲਾਈਨਾਂ: `memory` profile (Qdrant), `bifrost` profile (Bifrost), persistent volumes, healthchecks।                                                                                                       |
| `.env.example`                                      | +24 ਲਾਈਨਾਂ: `QDRANT_*` (6 vars), `BIFROST_*` (4 vars)।                                                                                                                                                      |
| `docs/reference/ENVIRONMENT.md`                     | `QDRANT_*` env vars ਲਈ section 25 ਵਿੱਚ +6 rows।                                                                                                                                                             |
| `src/lib/memory/qdrant.ts`                          | +33 ਲਾਈਨਾਂ: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` ਲਈ env-var fallback chain (settings → env → default)। |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`    | +88 ਲਾਈਨਾਂ: env-var fallback precedence ਨੂੰ ਨਿਰਧਾਰਤ ਕਰਨ ਵਾਲੇ 9 ਨਵੇਂ test cases।                                                                                                                             |
| `docs/architecture/cluster-decisions.md` (ਇਹ ਫ਼ਾਈਲ) | ਨਵੀਂ — opt-in profiles ਲਈ decision record।                                                                                                                                                                  |
| `AGENTS.md`                                         | +1 ਲਾਈਨ: reference documentation table ਵਿੱਚ ਇਸ doc ਵੱਲ pointer।                                                                                                                                             |

**ਕੁੱਲ ਛੋਹਿਆ ਗਿਆ code:** 4 production files (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 test file (`qdrant-wiring.test.ts`), 2 doc files (`cluster-decisions.md`, `AGENTS.md`)।
