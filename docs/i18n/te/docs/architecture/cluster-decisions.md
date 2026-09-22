# Cluster Decisions — Optional Sidecar Profiles (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**స్థితి:** ప్రతిపాదన (@diegosouzapw సమీక్ష కోసం వేచి ఉంది)
**తేదీ:** 2026-06-20
**సూచనలు:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## సంక్షిప్తంగా

[`docker-compose.yml`](../../docker-compose.yml)లోని ప్రస్తుత 8-సర్వీస్ డిప్లాయ్మెంట్ కోసం రెండు ఐచ్ఛిక compose ప్రొఫైల్లు (`memory`, `bifrost`). డిఫాల్ట్గా ప్రారంభమయ్యే ప్రవర్తనలో **ఎటువంటి మార్పు లేదు**: 3 × `omniroute` రెప్లికాలు + Caddy + Redis + CliproxyAPI. ఈ రెండు కొత్త ప్రొఫైల్లు Qdrant మరియు Bifrostను ఐచ్ఛిక sidecarలుగా జోడిస్తాయి; వీటిని `docker compose --profile <name> up` ద్వారా ప్రారంభించాలి. **ప్రస్తుత సర్వీస్ ఏదీ తొలగించబడదు లేదా భర్తీ చేయబడదు.**

## ఇది ఎందుకు సురక్షితమైన విధానం

OmniRoute యొక్క ప్రస్తుత డిప్లాయ్మెంట్ నిర్మాణం ఇప్పటికే సరళంగా, నిరూపితంగా ఉంది:

- **`redis:7-alpine`** ప్రొడక్షన్ స్థాయిలో rate-limit/cache పనిభారాన్ని నిర్వహిస్తుంది.
- **SQLite + sqlite-vec + FTS5** స్థానిక మెమరీ + వెక్టర్ + టెక్స్ట్ శోధనను నిర్వహిస్తాయి ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) చూడండి).
- **Caddy** ఇప్పటికే LB + TLS terminatorగా ఉంది ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** ఇప్పటికే [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)లో Tier-1 routerగా అనుసంధానించబడింది (`BIFROST_ENABLED` env var ద్వారా kill switch కలిగిన sidecar proxy — sidecarను దాటవేసి TS మార్గానికి వెళ్లడానికి `=0`గా సెట్ చేయండి).

ఇక్కడి రెండు ప్రొఫైల్లు **SQLite పరిమితిని చేరుకునే డిప్లాయ్మెంట్ల కోసం scale-out ఎంపికలు** — మైగ్రేషన్లు కావు. రెండూ డిఫాల్ట్గా నిలిపివేయబడి ఉంటాయి.

## రెండు ప్రొఫైల్లు

### `memory` — Qdrant వెక్టర్ మెమరీ Sidecar

**ఎప్పుడు ప్రారంభించాలి:**

- ఒక్కో డిప్లాయ్మెంట్కు > 1M embeddings ఉన్నప్పుడు (పెద్ద స్థాయిలో sqlite-vec నెమ్మదించడం ప్రారంభిస్తుంది).
- `omniroute-1/2/3` అంతటా భాగస్వామ్య వెక్టర్ స్థితి అవసరమైన multi-replica డిప్లాయ్మెంట్.
- మీకు ఇప్పటికే బాహ్య Qdrant క్లస్టర్ ఉంటే (Qdrant Cloud, on-prem).

**ఇది జోడించేవి:**

| సర్వీస్  | ఇమేజ్                   | పోర్ట్లు    | గమనికలు                                                |
| -------- | ----------------------- | ----------- | ------------------------------------------------------ |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW ఇండెక్స్; నిరంతర వాల్యూమ్ `omniroute_qdrant_data` |

**యాక్టివేషన్:** Settings UIలో `qdrantEnabled = true`గా మార్చండి **లేదా** `QDRANT_HOST=qdrant` env సెట్ చేయండి. ప్రాధాన్యత నియమాల కోసం [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) చూడండి (settings పట్టిక → env var → డిఫాల్ట్).

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example`లోని 1672-1683 పంక్తులను చూడండి).

### `bifrost` — Bifrost Tier-1 Router Sidecar

**ఎప్పుడు ప్రారంభించాలి:**

- మీరు ≥3 `omniroute` రెప్లికాలను నడుపుతూ, provider rotationను ఒకే Go ప్రాసెస్లో కేంద్రీకరించాలనుకున్నప్పుడు.
- అన్ని రెప్లికాల నుంచి upstream-provider అభ్యర్థనల కోసం ఒకే audit/logging వేదిక కావాలనుకున్నప్పుడు.
- OmniRoute రెప్లికాలతో సంబంధం లేకుండా Tier-1 routing లేయర్ను అడ్డంగా స్కేల్ చేయాలనుకున్నప్పుడు.

**ఇది జోడించేవి:**

| సర్వీస్   | ఇమేజ్                             | పోర్ట్లు | గమనికలు                                                                |
| --------- | --------------------------------- | -------- | ---------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`   | Go-ఆధారిత Tier-1 router; నిరంతర logs వాల్యూమ్ `omniroute_bifrost_logs` |

**యాక్టివేషన్:** `.env.example`లో `BIFROST_BASE_URL=http://bifrost:8080`ని సెట్ చేయండి. [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)లోని ప్రస్తుత sidecar proxy route (PR #4381లో జోడించబడింది) దీన్ని స్వయంచాలకంగా ఉపయోగిస్తుంది.

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example`లోని 1685-1695 పంక్తులను చూడండి).

## ఈ PR స్పష్టంగా చేయనివి

అసలు issue థ్రెడ్లో మరింత విస్తృతమైన క్లస్టర్ పునర్నిర్మాణం ప్రతిపాదించబడింది. వాస్తవ workload స్వరూపాన్ని ఆడిట్ చేసిన తర్వాత, క్రిందివి పేర్కొన్న కారణాల వల్ల **తిరస్కరించబడ్డాయి**:

| కాంపోనెంట్                           | నిర్ణయం      | కారణం                                                                                                                        |
| ------------------------------------ | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **తొలగింపు** | ప్రొడక్షన్ స్థాయిలో rate-limit workload కోసం `redis:7-alpine` ఇప్పటికే సరిపోతుంది; అధిగమించాల్సిన పరిమితి ఏదీ లేదు.          |
| **NATS**                             | **తొలగింపు** | ప్రతి `omniroute` replica ఒకే Node.js ప్రాసెస్; multi-process pub/sub workload లేదు.                                         |
| **PostgreSQL**                       | **తొలగింపు** | SQLite + sqlite-vec + FTS5 మొత్తం 3 వినియోగ సందర్భాలను కవర్ చేస్తాయి; 97 migrations + Electron packaging వలసను అడ్డుకుంటాయి. |
| **Neo4j**                            | **తొలగింపు** | Routing అనేది 5-table join; SQLiteలో recursive CTE సరిపోతుంది.                                                               |
| **MinIO**                            | **తొలగింపు** | multi-MB blob workload లేదు; images/audio passthrough proxiesగా ఉంటాయి.                                                      |
| **pgvector / pg_ai / pg_textsearch** | **తొలగింపు** | PostgreSQL విషయంలో ఉన్న అదే SQLite పరిమితి కారణం; pgvector ecosystem విభజితంగా ఉంది.                                         |
| **HAProxy / Envoy**                  | **తొలగింపు** | Caddy ఇప్పటికే LB + TLS నిర్వహిస్తుంది; రెండూ Tier-1 routersగా స్పష్టంగా తిరస్కరించబడ్డాయి (`AGENTS.md` చూడండి).             |

భవిష్యత్తులో ఏదైనా వినియోగ సందర్భం వీటిలో ఒకదాని అవసరాన్ని నిరూపిస్తే, సవరించాల్సిన పత్రం ఇదే.

## 4-వారాల rollout (ఆమోదించబడితే)

1. **వారం 1** — ఈ PRను merge చేసి, 3-replica compose stackతో opt-in profilesను ధృవీకరించడం.
2. **వారం 2** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) వద్దనున్న sidecar proxy routeను ఉపయోగించి OpenAI/Claude/Gemini/Ollama (14+ providersలో 4) కోసం Bifrostను పూర్తిగా సక్రియం చేయడం (`BIFROST_ENABLED` ద్వారా నియంత్రించబడుతుంది, runtimeలో kill-switch చేయవచ్చు).
3. **వారం 3** — ఒకే test deploymentలో Qdrant memory profileను ప్రారంభించడం; sqlite-vecతో పోల్చి latency వ్యత్యాసాన్ని కొలవడం.
4. **వారం 4** — Observability healthchecks (`docker compose ps` exit codes + `wget` smoke tests); ADR-041 ప్రకారం 71-pillar refresh.

## ఈ PRలో మార్చిన ఫైళ్లు

| ఫైల్                                              | మార్పు                                                                                                                                                                                                          |
| ------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                              | +30 పంక్తులు: `memory` profile (Qdrant), `bifrost` profile (Bifrost), persistent volumes, healthchecks.                                                                                                         |
| `.env.example`                                    | +24 పంక్తులు: `QDRANT_*` (6 vars), `BIFROST_*` (4 vars).                                                                                                                                                        |
| `docs/reference/ENVIRONMENT.md`                   | `QDRANT_*` env vars కోసం section 25లో +6 వరుసలు.                                                                                                                                                                |
| `src/lib/memory/qdrant.ts`                        | +33 పంక్తులు: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` కోసం env-var fallback chain (settings → env → default). |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`  | +88 పంక్తులు: env-var fallback precedenceను స్థిరపరిచే 9 కొత్త test cases.                                                                                                                                      |
| `docs/architecture/cluster-decisions.md` (ఈ ఫైల్) | కొత్తది — opt-in profiles కోసం decision record.                                                                                                                                                                 |
| `AGENTS.md`                                       | +1 పంక్తి: reference documentation tableలో ఈ పత్రానికి pointer.                                                                                                                                                 |

**మొత్తంగా తాకిన code:** 4 production files (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 test file (`qdrant-wiring.test.ts`), 2 doc files (`cluster-decisions.md`, `AGENTS.md`).
