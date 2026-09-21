# Cluster Decisions — Optional Sidecar Profiles (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**ସ୍ଥିତି:** ପ୍ରସ୍ତାବ (@diegosouzapwଙ୍କ ସମୀକ୍ଷା ଅପେକ୍ଷାରେ)
**ତାରିଖ:** 2026-06-20
**ସନ୍ଦର୍ଭ:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## ସଂକ୍ଷେପରେ

[`docker-compose.yml`](../../docker-compose.yml)ରେ ଥିବା ବର୍ତ୍ତମାନର 8ଟି ସେବା ବିଶିଷ୍ଟ ଡିପ୍ଲୟମେଣ୍ଟ ପାଇଁ ଦୁଇଟି ଇଚ୍ଛାଧୀନ compose ପ୍ରୋଫାଇଲ୍ (`memory`, `bifrost`)। ଡିଫଲ୍ଟ ଭାବେ ଚାଲୁ ହେବାର ଆଚରଣ **ଅପରିବର୍ତ୍ତିତ**: 3 × `omniroute` ରେପ୍ଲିକା + Caddy + Redis + CliproxyAPI। ନୂତନ ପ୍ରୋଫାଇଲ୍ ଦୁଇଟି Qdrant ଏବଂ Bifrostକୁ ଇଚ୍ଛାଧୀନ sidecar ଭାବେ ଯୋଡ଼େ, ଯାହା `docker compose --profile <name> up` ଦ୍ୱାରା ନିୟନ୍ତ୍ରିତ। **କୌଣସି ବର୍ତ୍ତମାନର ସେବାକୁ ହଟାଯାଇନାହିଁ କିମ୍ବା ବଦଳାଯାଇନାହିଁ।**

## ଏହା କାହିଁକି ଏକ ସତର୍କ ପଦକ୍ଷେପ

OmniRouteର ବର୍ତ୍ତମାନର ଡିପ୍ଲୟମେଣ୍ଟ ଗଠନ ପୂର୍ବରୁ ହିଁ ହାଲୁକା ଏବଂ ପ୍ରମାଣିତ:

- **`redis:7-alpine`** ପ୍ରଡକ୍ସନ୍ ସ୍କେଲ୍ରେ ରେଟ୍-ଲିମିଟ୍/କ୍ୟାଶ୍ କାର୍ଯ୍ୟଭାର ପରିଚାଳନା କରେ।
- **SQLite + sqlite-vec + FTS5** ସ୍ଥାନୀୟ ମେମୋରି + ଭେକ୍ଟର୍ + ଟେକ୍ସ୍ଟ ସନ୍ଧାନକୁ ସମ୍ଭାଳେ ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) ଦେଖନ୍ତୁ)।
- **Caddy** ପୂର୍ବରୁ ହିଁ LB + TLS ଟର୍ମିନେଟର୍ ଅଟେ ([`docker-compose.yml`](../../docker-compose.yml))।
- **Bifrost** ପୂର୍ବରୁ [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)ରେ Tier-1 ରାଉଟର୍ ଭାବେ ସମନ୍ୱିତ ହୋଇଛି (`BIFROST_ENABLED` env var ମାଧ୍ୟମରେ kill switch ସହିତ sidecar proxy — sidecarକୁ ବାଇପାସ୍ କରି TS ପଥକୁ ଯିବା ପାଇଁ `=0` ସେଟ୍ କରନ୍ତୁ)।

ଏଠାରେ ଥିବା ପ୍ରୋଫାଇଲ୍ ଦୁଇଟି **SQLiteର ସୀମାକୁ ଛୁଇଁଥିବା ଡିପ୍ଲୟମେଣ୍ଟଗୁଡ଼ିକ ପାଇଁ ସ୍କେଲ୍-ଆଉଟ୍ ବିକଳ୍ପ** — ମାଇଗ୍ରେସନ୍ ନୁହେଁ। ଉଭୟ ଡିଫଲ୍ଟ ଭାବେ ବନ୍ଦ ରହେ।

## ପ୍ରୋଫାଇଲ୍ ଦୁଇଟି

### `memory` — Qdrant ଭେକ୍ଟର୍ ମେମୋରି Sidecar

**କେତେବେଳେ ସକ୍ରିୟ କରିବେ:**

- ପ୍ରତି ଡିପ୍ଲୟମେଣ୍ଟରେ > 1M ଏମ୍ବେଡିଂ (ବଡ଼ ସ୍କେଲ୍ରେ sqlite-vec ଧୀର ହେବା ଆରମ୍ଭ କରେ)।
- `omniroute-1/2/3` ମଧ୍ୟରେ ସେୟାର୍କୃତ ଭେକ୍ଟର୍ ଷ୍ଟେଟ୍ ଆବଶ୍ୟକ କରୁଥିବା ମଲ୍ଟି-ରେପ୍ଲିକା ଡିପ୍ଲୟମେଣ୍ଟ।
- ଆପଣଙ୍କ ପାଖରେ ପୂର୍ବରୁ ଏକ ବାହ୍ୟ Qdrant କ୍ଲଷ୍ଟର୍ ଅଛି (Qdrant Cloud, on-prem)।

**ଏହା କ’ଣ ଯୋଡ଼େ:**

| ସେବା     | ଇମେଜ୍                   | ପୋର୍ଟଗୁଡ଼ିକ | ଟିପ୍ପଣୀ                                               |
| -------- | ----------------------- | ----------- | ----------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW ଇଣ୍ଡେକ୍ସ; ସ୍ଥାୟୀ ଭଲ୍ୟୁମ୍ `omniroute_qdrant_data` |

**ସକ୍ରିୟକରଣ:** Settings UIରେ `qdrantEnabled = true` କରନ୍ତୁ **କିମ୍ବା** `QDRANT_HOST=qdrant` env ସେଟ୍ କରନ୍ତୁ। ପ୍ରାଧାନ୍ୟ ନିୟମଗୁଡ଼ିକ ପାଇଁ [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) ଦେଖନ୍ତୁ (ସେଟିଂସ୍ ଟେବୁଲ୍ → env var → ଡିଫଲ୍ଟ)।

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example`ର 1672-1683 ଧାଡ଼ି ଦେଖନ୍ତୁ)।

### `bifrost` — Bifrost Tier-1 ରାଉଟର୍ Sidecar

**କେତେବେଳେ ସକ୍ରିୟ କରିବେ:**

- ଆପଣ ≥3ଟି `omniroute` ରେପ୍ଲିକା ଚଲାଉଛନ୍ତି ଏବଂ ଗୋଟିଏ Go ପ୍ରୋସେସ୍ରେ ପ୍ରଦାନକାରୀ ରୋଟେସନ୍କୁ କେନ୍ଦ୍ରୀକୃତ କରିବାକୁ ଚାହୁଁଛନ୍ତି।
- ସମସ୍ତ ରେପ୍ଲିକାର ଅପ୍ଷ୍ଟ୍ରିମ୍-ପ୍ରଦାନକାରୀ ଅନୁରୋଧଗୁଡ଼ିକ ପାଇଁ ଆପଣ ଗୋଟିଏ ଏକୀକୃତ ଅଡିଟ୍/ଲଗିଂ ପୃଷ୍ଠ ଚାହୁଁଛନ୍ତି।
- OmniRoute ରେପ୍ଲିକାଗୁଡ଼ିକଠାରୁ ସ୍ୱାଧୀନ ଭାବେ Tier-1 ରାଉଟିଂ ସ୍ତରର ହରିଜଣ୍ଟାଲ୍ ସ୍କେଲିଂ ଚାହୁଁଛନ୍ତି।

**ଏହା କ’ଣ ଯୋଡ଼େ:**

| ସେବା      | ଇମେଜ୍                             | ପୋର୍ଟଗୁଡ଼ିକ | ଟିପ୍ପଣୀ                                                              |
| --------- | --------------------------------- | ----------- | -------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`      | Go-ଆଧାରିତ Tier-1 ରାଉଟର୍; ସ୍ଥାୟୀ ଲଗ୍ ଭଲ୍ୟୁମ୍ `omniroute_bifrost_logs` |

**ସକ୍ରିୟକରଣ:** `.env.example`ରେ `BIFROST_BASE_URL=http://bifrost:8080` ସେଟ୍ କରନ୍ତୁ। [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)ରେ ଥିବା ବର୍ତ୍ତମାନର sidecar proxy ରୁଟ୍ (PR #4381ରେ ଯୋଡ଼ାଯାଇଛି) ଏହାକୁ ସ୍ୱୟଂଚାଳିତ ଭାବେ ଗ୍ରହଣ କରିବ।

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example`ର 1685-1695 ଧାଡ଼ି ଦେଖନ୍ତୁ)।

## ଏହି PR ସ୍ପଷ୍ଟ ଭାବେ କ’ଣ କରେ ନାହିଁ

ମୂଳ issue threadରେ ଏକ ବୃହତ୍ତର cluster ପୁନର୍ଲିଖନ ପ୍ରସ୍ତାବ କରାଯାଇଥିଲା। ପ୍ରକୃତ workloadର ରୂପରେଖା ଅଡିଟ୍ କରିବା ପରେ, ଦିଆଯାଇଥିବା କାରଣଗୁଡ଼ିକ ପାଇଁ ନିମ୍ନଲିଖିତଗୁଡ଼ିକୁ **ପ୍ରତ୍ୟାଖ୍ୟାନ** କରାଯାଇଛି:

| ଉପାଦାନ                               | ନିଷ୍ପତ୍ତି        | କାରଣ                                                                                                                |
| ------------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ବାଦ୍ ଦିଅନ୍ତୁ** | ଉତ୍ପାଦନ ସ୍ତରରେ rate-limit workload ପାଇଁ `redis:7-alpine` ପୂର୍ବରୁ ଯଥେଷ୍ଟ; ଅତିକ୍ରମ କରିବାକୁ କୌଣସି ସୀମା ନାହିଁ।          |
| **NATS**                             | **ବାଦ୍ ଦିଅନ୍ତୁ** | ପ୍ରତ୍ୟେକ `omniroute` replica ହେଉଛି ଗୋଟିଏ Node.js process; କୌଣସି multi-process pub/sub workload ନାହିଁ।               |
| **PostgreSQL**                       | **ବାଦ୍ ଦିଅନ୍ତୁ** | SQLite + sqlite-vec + FTS5 ସମସ୍ତ 3ଟି use caseକୁ ସମ୍ଭାଳେ; 97ଟି migration + Electron packaging migrationକୁ ଅବରୋଧ କରେ। |
| **Neo4j**                            | **ବାଦ୍ ଦିଅନ୍ତୁ** | Routing ହେଉଛି ଏକ 5-table join; SQLiteରେ recursive CTE ଯଥେଷ୍ଟ।                                                       |
| **MinIO**                            | **ବାଦ୍ ଦିଅନ୍ତୁ** | କୌଣସି multi-MB blob workload ନାହିଁ; image/audioଗୁଡ଼ିକ passthrough proxy।                                            |
| **pgvector / pg_ai / pg_textsearch** | **ବାଦ୍ ଦିଅନ୍ତୁ** | PostgreSQL ପରି ସମାନ SQLite-ସୀମା ସମ୍ବନ୍ଧୀୟ କାରଣ; pgvector ecosystem ବିଖଣ୍ଡିତ।                                        |
| **HAProxy / Envoy**                  | **ବାଦ୍ ଦିଅନ୍ତୁ** | Caddy ପୂର୍ବରୁ LB + TLS କରେ; ଉଭୟକୁ Tier-1 router ଭାବେ ସ୍ପଷ୍ଟ ଭାବେ ପ୍ରତ୍ୟାଖ୍ୟାନ କରାଯାଇଥିଲା (`AGENTS.md` ଦେଖନ୍ତୁ)।     |

ଭବିଷ୍ୟତର କୌଣସି use case ଏଗୁଡ଼ିକ ମଧ୍ୟରୁ କୌଣସିଟିର ଉପଯୋଗିତା ପ୍ରମାଣ କଲେ, ସଂଶୋଧନ କରିବା ପାଇଁ ଏହି doc ହିଁ ଉପଯୁକ୍ତ ସ୍ଥାନ।

## 4-ସପ୍ତାହର rollout (ଅନୁମୋଦିତ ହେଲେ)

1. **ସପ୍ତାହ 1** — ଏହି PRକୁ merge କରନ୍ତୁ + 3-replica compose stack ସହିତ opt-in profileଗୁଡ଼ିକୁ ଯାଞ୍ଚ କରନ୍ତୁ।
2. **ସପ୍ତାହ 2** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)ର sidecar proxy route ବ୍ୟବହାର କରି OpenAI/Claude/Gemini/Ollama (14+ provider ମଧ୍ୟରୁ 4ଟି) ପାଇଁ Bifrostର ସମ୍ପୂର୍ଣ୍ଣ ସକ୍ରିୟକରଣ (`BIFROST_ENABLED` ଦ୍ୱାରା ନିୟନ୍ତ୍ରିତ, runtimeରେ kill-switch କରାଯାଇପାରିବ)।
3. **ସପ୍ତାହ 3** — ଗୋଟିଏ test deploymentରେ Qdrant memory profile ସକ୍ଷମ କରନ୍ତୁ; sqlite-vec ତୁଳନାରେ latencyର ପାର୍ଥକ୍ୟ ମାପନ୍ତୁ।
4. **ସପ୍ତାହ 4** — Observability healthcheckଗୁଡ଼ିକ (`docker compose ps` exit code + `wget` smoke test); ADR-041 ଅନୁସାରେ 71-pillar refresh।

## ଏହି PRରେ ପରିବର୍ତ୍ତିତ fileଗୁଡ଼ିକ

| File                                                | ପରିବର୍ତ୍ତନ                                                                                                                                                                                                   |
| --------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docker-compose.yml`                                | +30ଟି line: `memory` profile (Qdrant), `bifrost` profile (Bifrost), persistent volume, healthcheck।                                                                                                          |
| `.env.example`                                      | +24ଟି line: `QDRANT_*` (6ଟି var), `BIFROST_*` (4ଟି var)।                                                                                                                                                     |
| `docs/reference/ENVIRONMENT.md`                     | `QDRANT_*` env varଗୁଡ଼ିକ ପାଇଁ section 25ରେ +6ଟି row।                                                                                                                                                         |
| `src/lib/memory/qdrant.ts`                          | +33ଟି line: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` ପାଇଁ env-var fallback chain (setting → env → default)। |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`    | +88ଟି line: env-var fallback precedenceକୁ ନିଶ୍ଚିତ କରୁଥିବା 9ଟି ନୂତନ test case।                                                                                                                                |
| `docs/architecture/cluster-decisions.md` (ଏହି file) | ନୂତନ — opt-in profileଗୁଡ଼ିକ ପାଇଁ decision record।                                                                                                                                                            |
| `AGENTS.md`                                         | +1ଟି line: reference documentation tableରେ ଏହି doc ପାଇଁ pointer।                                                                                                                                             |

**ମୋଟ ସ୍ପର୍ଶ କରାଯାଇଥିବା code:** 4ଟି production file (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1ଟି test file (`qdrant-wiring.test.ts`), 2ଟି doc file (`cluster-decisions.md`, `AGENTS.md`)।
