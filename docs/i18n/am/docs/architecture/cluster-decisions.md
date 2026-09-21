# Cluster Decisions — Optional Sidecar Profiles (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**ሁኔታ:** ሃሳብ (@diegosouzapw ግምገማን በመጠባበቅ ላይ)
**ቀን:** 2026-06-20
**ማጣቀሻዎች:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## በአጭሩ

በ[`docker-compose.yml`](../../docker-compose.yml) ውስጥ ላለው ነባር ባለ8-አገልግሎት ማሰማራት፣ ሁለት በምርጫ የሚነቁ compose መገለጫዎች (`memory`፣ `bifrost`)። ነባሪው የማስነሻ ባህሪ **አልተቀየረም**፦ 3 × `omniroute` replicas + Caddy + Redis + CliproxyAPI። ሁለቱ አዲስ መገለጫዎች Qdrant እና Bifrostን እንደ አማራጭ sidecars ያክላሉ፤ የሚነቁትም በ`docker compose --profile <name> up` ነው። **ምንም ነባር አገልግሎት አይወገድም ወይም አይተካም።**

## ይህ ለምን ጥንቃቄ የተሞላበት ነው

የOmniRoute ነባር የማሰማራት አወቃቀር ቀድሞውኑ ቀላልና የተረጋገጠ ነው፦

- **`redis:7-alpine`** በምርት ልኬት የrate-limit/cache የሥራ ጫናን ያስተናግዳል።
- **SQLite + sqlite-vec + FTS5** አካባቢያዊ ማህደረ ትውስታን + vectorን + የጽሑፍ ፍለጋን ይሸፍናሉ ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) ይመልከቱ)።
- **Caddy** ቀድሞውኑ LB + TLS terminator ነው ([`docker-compose.yml`](../../docker-compose.yml))።
- **Bifrost** ቀድሞውኑ በ[`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) ውስጥ እንደ Tier-1 router ተዋህዷል (`BIFROST_ENABLED` env varን በመጠቀም kill switch ያለው sidecar proxy — sidecarን ለማለፍ እና ወደ TS መንገድ ለመመለስ `=0` ያድርጉ)።

እዚህ ያሉት ሁለቱ መገለጫዎች **የSQLite አቅም ገደብ ላይ ለደረሱ ማሰማራቶች የማስፋፊያ አማራጮች** ናቸው — migrations አይደሉም። ሁለቱም በነባሪ የተሰናከሉ ናቸው።

## ሁለቱ መገለጫዎች

### `memory` — Qdrant Vector Memory Sidecar

**መቼ እንደሚነቃ፦**

- > በአንድ ማሰማራት ከ1M embeddings በላይ (sqlite-vec በከፍተኛ ልኬት መዘግየት ይጀምራል)።
- በ`omniroute-1/2/3` መካከል የጋራ vector state የሚፈልግ multi-replica ማሰማራት።
- ቀድሞውኑ ውጫዊ Qdrant cluster (Qdrant Cloud፣ on-prem) ካለዎት።

**የሚያክለው፦**

| አገልግሎት   | Image                   | Ports       | ማስታወሻዎች                                               |
| -------- | ----------------------- | ----------- | ----------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW index፤ persistent volume `omniroute_qdrant_data` |

**ማንቃት፦** በSettings UI ውስጥ `qdrantEnabled = true` ያድርጉ **ወይም** `QDRANT_HOST=qdrant` env ያቀናብሩ። ስለ precedence ደንቦቹ (settings table → env var → default) [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts)ን ይመልከቱ።

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example` መስመሮች 1672-1683ን ይመልከቱ)።

### `bifrost` — Bifrost Tier-1 Router Sidecar

**መቼ እንደሚነቃ፦**

- ≥3 `omniroute` replicas የሚያስኬዱ እና provider rotationን በአንድ Go process ውስጥ ማዕከላዊ ማድረግ የሚፈልጉ ከሆነ።
- በሁሉም replicas ላይ ለupstream-provider ጥያቄዎች አንድ audit/logging surface ከፈለጉ።
- የTier-1 routing layerን ከOmniRoute replicas ነፃ በሆነ መልኩ በአግድም ማስፋት ከፈለጉ።

**የሚያክለው፦**

| አገልግሎት    | Image                             | Ports  | ማስታወሻዎች                                                                      |
| --------- | --------------------------------- | ------ | ---------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | በGo ላይ የተመሠረተ Tier-1 router፤ persistent logs volume `omniroute_bifrost_logs` |

**ማንቃት፦** በ`.env.example` ውስጥ `BIFROST_BASE_URL=http://bifrost:8080` ያቀናብሩ። በ[`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) ያለው ነባር sidecar proxy route (በPR #4381 የታከለ) ይህን በራስ-ሰር ይጠቀማል።

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example` መስመሮች 1685-1695ን ይመልከቱ)።

## ይህ PR በግልጽ የማያደርጋቸው ነገሮች

የመጀመሪያው የጉዳይ ውይይት ሰፋ ያለ የክላስተር ዳግም ግንባታ ሃሳብ አቅርቦ ነበር። ትክክለኛውን የሥራ ጫና ቅርጽ ከተገመገመ በኋላ፣ የሚከተሉት በተሰጡት ምክንያቶች **ውድቅ ተደርገዋል**፦

| ክፍለ አካል                              | ውሳኔ       | ምክንያት                                                                                    |
| ------------------------------------ | --------- | ---------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **አስወግድ** | `redis:7-alpine` በምርት ደረጃ ላለው የፍጥነት ገደብ ሥራ ጫና ቀድሞውኑ በቂ ነው፤ ሊሻገር የሚገባ ጣሪያ የለም።            |
| **NATS**                             | **አስወግድ** | እያንዳንዱ `omniroute` ቅጂ አንድ Node.js ሂደት ነው፤ ባለብዙ-ሂደት pub/sub የሥራ ጫና የለም።                   |
| **PostgreSQL**                       | **አስወግድ** | SQLite + sqlite-vec + FTS5 ሦስቱንም የአጠቃቀም ሁኔታዎች ይሸፍናሉ፤ 97 ፍልሰቶች + Electron ማሸግ ፍልሰቱን ያግዳሉ። |
| **Neo4j**                            | **አስወግድ** | ማስተላለፍ የ5-ሰንጠረዥ join ነው፤ በSQLite ላይ recursive CTE በቂ ነው።                                 |
| **MinIO**                            | **አስወግድ** | ባለብዙ-MB blob የሥራ ጫና የለም፤ ምስሎች/ድምፅ ቀጥታ ማሳለፊያ ፕሮክሲዎች ናቸው።                                  |
| **pgvector / pg_ai / pg_textsearch** | **አስወግድ** | ከPostgreSQL ጋር ተመሳሳይ የSQLite ጣሪያ ምክንያት ነው፤ የpgvector ስነ-ምህዳር የተበታተነ ነው።                  |
| **HAProxy / Envoy**                  | **አስወግድ** | Caddy ቀድሞውኑ LB + TLS ያከናውናል፤ ሁለቱም እንደ Tier-1 ራውተሮች በግልጽ ውድቅ ተደርገዋል (`AGENTS.md`ን ይመልከቱ)። |

ወደፊት የሚኖር የአጠቃቀም ሁኔታ ከእነዚህ አንዱን ተገቢ መሆኑን ካረጋገጠ፣ ይህ ሰነድ ማሻሻያው የሚደረግበት ቦታ ነው።

## የ4-ሳምንት ሥራ ላይ ማዋል (ከጸደቀ)

1. **ሳምንት 1** — ይህን PR ማዋሃድ + በ3-ቅጂ compose stack ላይ በምርጫ የሚነቁ መገለጫዎችን ማረጋገጥ።
2. **ሳምንት 2** — በ[`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) ላይ ያለውን የsidecar ፕሮክሲ መስመር በመጠቀም ለOpenAI/Claude/Gemini/Ollama (ከ14+ አቅራቢዎች 4ቱ) Bifrostን ሙሉ በሙሉ ማንቃት (በ`BIFROST_ENABLED` የተገደበ፣ በሥራ ላይ እያለ በkill-switch ሊጠፋ የሚችል)።
3. **ሳምንት 3** — በአንድ የሙከራ ማሰማሪያ ውስጥ የQdrant ማህደረ ትውስታ መገለጫን ማንቃት፤ ከsqlite-vec ጋር ሲነጻጸር የመዘግየት ልዩነቱን መለካት።
4. **ሳምንት 4** — የታዛቢነት የጤና ፍተሻዎች (`docker compose ps` የመውጫ ኮዶች + `wget` የጭስ ሙከራዎች)፤ በADR-041 መሠረት የ71-ምሰሶ እድሳት።

## በዚህ PR ውስጥ የተቀየሩ ፋይሎች

| ፋይል                                               | ለውጥ                                                                                                                                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                              | +30 መስመሮች፦ `memory` መገለጫ (Qdrant)፣ `bifrost` መገለጫ (Bifrost)፣ ቋሚ የማከማቻ ጥራዞች፣ የጤና ፍተሻዎች።                                                                                                                  |
| `.env.example`                                    | +24 መስመሮች፦ `QDRANT_*` (6 ተለዋዋጮች)፣ `BIFROST_*` (4 ተለዋዋጮች)።                                                                                                                                               |
| `docs/reference/ENVIRONMENT.md`                   | በክፍል 25 ውስጥ ለ`QDRANT_*` የአካባቢ ተለዋዋጮች +6 ረድፎች።                                                                                                                                                           |
| `src/lib/memory/qdrant.ts`                        | +33 መስመሮች፦ ለ`QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` የአካባቢ-ተለዋዋጭ የfallback ሰንሰለት (ቅንብሮች → አካባቢ → ነባሪ)። |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`  | +88 መስመሮች፦ የአካባቢ-ተለዋዋጭ fallback ቅድሚያን የሚያረጋግጡ 9 አዲስ የሙከራ ጉዳዮች።                                                                                                                                          |
| `docs/architecture/cluster-decisions.md` (ይህ ፋይል) | አዲስ — በምርጫ ለሚነቁ መገለጫዎች የውሳኔ መዝገብ።                                                                                                                                                                       |
| `AGENTS.md`                                       | +1 መስመር፦ በማጣቀሻ ሰነዶች ሰንጠረዥ ውስጥ ወደዚህ ሰነድ የሚያመለክት ጠቋሚ።                                                                                                                                                     |

**በጠቅላላ የተነካ ኮድ፦** 4 የምርት ፋይሎች (`docker-compose.yml`፣ `qdrant.ts`፣ `.env.example`፣ `ENVIRONMENT.md`)፣ 1 የሙከራ ፋይል (`qdrant-wiring.test.ts`)፣ 2 የሰነድ ፋይሎች (`cluster-decisions.md`፣ `AGENTS.md`)።
