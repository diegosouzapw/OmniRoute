# Cluster Decisions — Optional Sidecar Profiles (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**තත්ත්වය:** යෝජනාවකි (@diegosouzapw සමාලෝචනය බලාපොරොත්තුවෙන්)
**දිනය:** 2026-06-20
**යොමු:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

[`docker-compose.yml`](../../docker-compose.yml) හි පවතින සේවා 8ක යෙදවීම සඳහා කැමැත්තෙන් සක්රිය කළ හැකි compose පැතිකඩ දෙකක් (`memory`, `bifrost`). පෙරනිමි `up` හැසිරීම **වෙනස් නොවේ**: `omniroute` අනුරූ 3ක් + Caddy + Redis + CliproxyAPI. නව පැතිකඩ දෙක මඟින් Qdrant සහ Bifrost විකල්ප sidecar ලෙස එක් කරන අතර, ඒවා `docker compose --profile <name> up` මඟින් පාලනය වේ. **පවතින කිසිදු සේවාවක් ඉවත් කිරීම හෝ ප්රතිස්ථාපනය කිරීම සිදු නොවේ.**

## මෙය ගතානුගතික ප්රවේශයක් වන්නේ ඇයි

OmniRoute හි පවතින යෙදවුම් ව්යුහය දැනටමත් සැහැල්ලු සහ සනාථ කළ එකකි:

- **`redis:7-alpine`** නිෂ්පාදන මට්ටමේ rate-limit/cache කාර්යභාරය හසුරුවයි.
- **SQLite + sqlite-vec + FTS5** දේශීය මතකය + vector + පෙළ සෙවීම ආවරණය කරයි ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) බලන්න).
- **Caddy** දැනටමත් LB + TLS අවසන්කාරකය වේ ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** දැනටමත් [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) හි Tier-1 router ලෙස ඒකාබද්ධ කර ඇත (`BIFROST_ENABLED` env var හරහා kill switch සහිත sidecar proxy එකකි — sidecar එක මඟහැර TS මාර්ගයට යාමට `=0` ලෙස සකසන්න).

මෙහි ඇති පැතිකඩ දෙකම **SQLite සීමාවට ළඟා වන යෙදවුම් සඳහා පරිමාණය පුළුල් කිරීමේ විකල්පයන්ය** — සංක්රමණ නොවේ. දෙකම පෙරනිමියෙන් අක්රියයි.

## පැතිකඩ දෙක

### `memory` — Qdrant Vector Memory Sidecar

**සක්රිය කළ යුත්තේ කවදාද:**

- එක් යෙදවීමකට embeddings මිලියන 1කට වඩා ඇති විට (පරිමාණය වැඩි වන විට sqlite-vec මන්දගාමී වීමට පටන් ගනී).
- `omniroute-1/2/3` අතර හවුල් vector තත්ත්වයක් අවශ්ය බහු-අනුරූ යෙදවීමක් සඳහා.
- ඔබට දැනටමත් බාහිර Qdrant cluster එකක් තිබේ නම් (Qdrant Cloud, on-prem).

**එක් කරන දේ:**

| සේවාව    | Image                   | Ports       | සටහන්                                               |
| -------- | ----------------------- | ----------- | --------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW index; ස්ථිර volume එක `omniroute_qdrant_data` |

**සක්රිය කිරීම:** Settings UI තුළ `qdrantEnabled = true` ලෙස මාරු කරන්න **හෝ** `QDRANT_HOST=qdrant` env සකසන්න. ප්රමුඛතා නීති සඳහා [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) බලන්න (settings table → env var → පෙරනිමිය).

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example` හි 1672-1683 පේළි බලන්න).

### `bifrost` — Bifrost Tier-1 Router Sidecar

**සක්රිය කළ යුත්තේ කවදාද:**

- ඔබ `omniroute` අනුරූ ≥3ක් ධාවනය කරන අතර provider rotation එක තනි Go process එකක් තුළ මධ්යගත කිරීමට අවශ්ය නම්.
- සියලු අනුරූ හරහා upstream-provider ඉල්ලීම් සඳහා තනි audit/logging මතුපිටක් ඔබට අවශ්ය නම්.
- OmniRoute අනුරූවලින් ස්වාධීනව Tier-1 routing ස්තරය තිරස්ව පරිමාණය කිරීමට අවශ්ය නම්.

**එක් කරන දේ:**

| සේවාව     | Image                             | Ports  | සටහන්                                                                       |
| --------- | --------------------------------- | ------ | --------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go මත පදනම් වූ Tier-1 router; ස්ථිර logs volume එක `omniroute_bifrost_logs` |

**සක්රිය කිරීම:** `.env.example` තුළ `BIFROST_BASE_URL=http://bifrost:8080` සකසන්න. [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) හි පවතින sidecar proxy route එක (PR #4381 හි එක් කරන ලදී) මෙය ස්වයංක්රීයව භාවිත කරනු ඇත.

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example` හි 1685-1695 පේළි බලන්න).

## මෙම PR එක පැහැදිලිවම නොකරන දේ

මුල් issue thread එකේ වඩා විශාල cluster නැවත ලිවීමක් යෝජනා කර තිබුණි. සැබෑ workload එකේ ස්වභාවය විගණනය කිරීමෙන් පසු, පහත දෑ දක්වා ඇති හේතු නිසා **ප්රතික්ෂේප කර ඇත**:

| සංරචකය                               | තීරණය          | හේතුව                                                                                                                   |
| ------------------------------------ | -------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ඉවත් කරන්න** | production පරිමාණයේ rate-limit workload එක සඳහා `redis:7-alpine` දැනටමත් ප්රමාණවත්ය; බිඳ දැමිය යුතු සීමාවක් නැත.        |
| **NATS**                             | **ඉවත් කරන්න** | සෑම `omniroute` replica එකක්ම තනි Node.js process එකකි; multi-process pub/sub workload එකක් නොපවතී.                     |
| **PostgreSQL**                       | **ඉවත් කරන්න** | SQLite + sqlite-vec + FTS5 මඟින් use case 3ම ආවරණය වේ; migrations 97ක් + Electron packaging නිසා migration එක අවහිර වේ. |
| **Neo4j**                            | **ඉවත් කරන්න** | Routing යනු table 5ක join එකකි; SQLite හි recursive CTE ප්රමාණවත්ය.                                                     |
| **MinIO**                            | **ඉවත් කරන්න** | multi-MB blob workload එකක් නැත; images/audio යනු passthrough proxies වේ.                                               |
| **pgvector / pg_ai / pg_textsearch** | **ඉවත් කරන්න** | PostgreSQL සඳහා ඇති SQLite සීමාව පිළිබඳ හේතුවම මෙයටත් අදාළය; pgvector ecosystem එක ඛණ්ඩනය වී ඇත.                        |
| **HAProxy / Envoy**                  | **ඉවත් කරන්න** | Caddy දැනටමත් LB + TLS සපයයි; දෙකම Tier-1 routers ලෙස පැහැදිලිවම ප්රතික්ෂේප කර ඇත (`AGENTS.md` බලන්න).                  |

අනාගත use case එකකින් මේවායින් එකක යෝග්යතාව තහවුරු වුවහොත්, සංශෝධනය කළ යුතු ස්ථානය මෙම ලේඛනයයි.

## සති 4ක rollout එක (අනුමත වුවහොත්)

1. **1වන සතිය** — මෙම PR එක merge කර, replica 3ක compose stack එකක් සමඟ opt-in profiles සත්යාපනය කරන්න.
2. **2වන සතිය** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) හි sidecar proxy route එක භාවිතයෙන් OpenAI/Claude/Gemini/Ollama සඳහා Bifrost සම්පූර්ණයෙන් සක්රිය කිරීම (providers 14කට වැඩි ගණනකින් 4ක්) (`BIFROST_ENABLED` මඟින් පාලනය වන අතර runtime එකේදී kill switch එකකින් අක්රිය කළ හැක).
3. **3වන සතිය** — තනි test deployment එකක Qdrant memory profile එක සක්රිය කරන්න; sqlite-vec සමඟ සසඳා latency වෙනස මනින්න.
4. **4වන සතිය** — Observability healthchecks (`docker compose ps` exit codes + `wget` smoke tests); ADR-041 අනුව 71-pillar refresh එක.

## මෙම PR එකේ වෙනස් කළ files

| File                                                   | වෙනස්කම                                                                                                                                                                                                        |
| ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                   | පේළි +30: `memory` profile එක (Qdrant), `bifrost` profile එක (Bifrost), persistent volumes, healthchecks.                                                                                                      |
| `.env.example`                                         | පේළි +24: `QDRANT_*` (vars 6ක්), `BIFROST_*` (vars 4ක්).                                                                                                                                                       |
| `docs/reference/ENVIRONMENT.md`                        | `QDRANT_*` env vars සඳහා 25වන කොටසට rows +6ක්.                                                                                                                                                                 |
| `src/lib/memory/qdrant.ts`                             | පේළි +33: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` සඳහා env-var fallback chain එක (settings → env → default). |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`       | පේළි +88: env-var fallback ප්රමුඛතාව ස්ථාවර කරන නව test cases 9ක්.                                                                                                                                             |
| `docs/architecture/cluster-decisions.md` (මෙම file එක) | නව — opt-in profiles සඳහා decision record එක.                                                                                                                                                                  |
| `AGENTS.md`                                            | පේළි +1: reference documentation table එකෙහි මෙම ලේඛනයට pointer එකක්.                                                                                                                                          |

**වෙනස්කම් සිදු කළ මුළු code ප්රමාණය:** production files 4ක් (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), test file 1ක් (`qdrant-wiring.test.ts`), doc files 2ක් (`cluster-decisions.md`, `AGENTS.md`).
