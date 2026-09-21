# Cluster Decisions — Optional Sidecar Profiles (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**स्थिति:** प्रस्ताव ( @diegosouzapw को समीक्षाको प्रतीक्षामा)
**मिति:** 2026-06-20
**सन्दर्भहरू:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## सारांश

[`docker-compose.yml`](../../docker-compose.yml) मा रहेको विद्यमान 8-service परिनियोजनका लागि दुईवटा स्वैच्छिक compose profiles (`memory`, `bifrost`)। पूर्वनिर्धारित रूपमा सञ्चालन हुने व्यवहार **अपरिवर्तित** छ: 3 × `omniroute` replicas + Caddy + Redis + CliproxyAPI। यी दुई नयाँ profiles ले Qdrant र Bifrost लाई वैकल्पिक sidecars का रूपमा थप्छन्, जुन `docker compose --profile <name> up` द्वारा सक्षम गरिन्छन्। **कुनै पनि विद्यमान service हटाइएको वा प्रतिस्थापन गरिएको छैन।**

## यो किन सावधानीपूर्ण छ

OmniRoute को विद्यमान परिनियोजन संरचना पहिले नै हल्का र प्रमाणित छ:

- **`redis:7-alpine`** ले उत्पादन स्तरमा rate-limit/cache workload सम्हाल्छ।
- **SQLite + sqlite-vec + FTS5** ले स्थानीय memory + vector + text-search समेट्छन् ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) हेर्नुहोस्)।
- **Caddy** पहिले नै LB + TLS terminator हो ([`docker-compose.yml`](../../docker-compose.yml))।
- **Bifrost** पहिले नै [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) मा Tier-1 router का रूपमा एकीकृत छ (`BIFROST_ENABLED` env var मार्फत kill switch भएको sidecar proxy — sidecar लाई बाइपास गरी TS path मा जान `=0` सेट गर्नुहोस्)।

यहाँका दुई profiles **SQLite को सीमा पुग्ने परिनियोजनहरूका लागि scale-out विकल्पहरू हुन्** — migrations होइनन्। दुवै पूर्वनिर्धारित रूपमा बन्द हुन्छन्।

## दुई profiles

### `memory` — Qdrant Vector Memory Sidecar

**कहिले सक्षम गर्ने:**

- प्रति परिनियोजन > 1M embeddings हुँदा (ठूलो परिमाणमा sqlite-vec सुस्त हुन थाल्छ)।
- `omniroute-1/2/3` बीच साझा vector state आवश्यक पर्ने multi-replica परिनियोजनमा।
- तपाईंसँग पहिले नै बाह्य Qdrant cluster (Qdrant Cloud, on-prem) हुँदा।

**यसले के थप्छ:**

| Service  | Image                   | Ports       | टिप्पणीहरू                                            |
| -------- | ----------------------- | ----------- | ----------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW index; persistent volume `omniroute_qdrant_data` |

**सक्रियता:** Settings UI मा `qdrantEnabled = true` गर्नुहोस् **वा** `QDRANT_HOST=qdrant` env सेट गर्नुहोस्। प्राथमिकताका नियमहरूका लागि [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) हेर्नुहोस् (settings table → env var → default)।

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example` का 1672-1683 लाइनहरू हेर्नुहोस्)।

### `bifrost` — Bifrost Tier-1 Router Sidecar

**कहिले सक्षम गर्ने:**

- तपाईं ≥3 `omniroute` replicas चलाउनुहुन्छ र provider rotation लाई एउटै Go process मा केन्द्रीकृत गर्न चाहनुहुन्छ।
- तपाईं सबै replicas बाट upstream-provider requests का लागि एउटै audit/logging surface चाहनुहुन्छ।
- तपाईं OmniRoute replicas बाट स्वतन्त्र रूपमा Tier-1 routing layer को horizontal scaling गर्न चाहनुहुन्छ।

**यसले के थप्छ:**

| Service   | Image                             | Ports  | टिप्पणीहरू                                                               |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------------ |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Go-आधारित Tier-1 router; persistent logs volume `omniroute_bifrost_logs` |

**सक्रियता:** `.env.example` मा `BIFROST_BASE_URL=http://bifrost:8080` सेट गर्नुहोस्। [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) मा रहेको विद्यमान sidecar proxy route (PR #4381 मा थपिएको) ले यसलाई स्वचालित रूपमा प्रयोग गर्नेछ।

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example` का 1685-1695 लाइनहरू हेर्नुहोस्)।

## यो PR ले स्पष्ट रूपमा नगर्ने कामहरू

मूल issue thread मा अझ ठूलो cluster rewrite प्रस्ताव गरिएको थियो। वास्तविक workload को स्वरूप audit गरेपछि, दिइएका कारणहरूका आधारमा निम्न विकल्पहरू **अस्वीकृत** गरिएका छन्:

| कम्पोनेन्ट                           | निर्णय     | कारण                                                                                                                        |
| ------------------------------------ | ---------- | --------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **हटाउने** | production scale को rate-limit workload का लागि `redis:7-alpine` पहिल्यै पर्याप्त छ; पार गर्नुपर्ने कुनै सीमा छैन।          |
| **NATS**                             | **हटाउने** | प्रत्येक `omniroute` replica एउटै Node.js process हो; कुनै multi-process pub/sub workload छैन।                              |
| **PostgreSQL**                       | **हटाउने** | SQLite + sqlite-vec + FTS5 ले सबै 3 use case समेट्छन्; 97 migrations + Electron packaging ले migration रोक्छन्।             |
| **Neo4j**                            | **हटाउने** | Routing एउटा 5-table join हो; SQLite मा recursive CTE पर्याप्त छ।                                                           |
| **MinIO**                            | **हटाउने** | कुनै multi-MB blob workload छैन; images/audio passthrough proxies हुन्।                                                     |
| **pgvector / pg_ai / pg_textsearch** | **हटाउने** | PostgreSQL कै जस्तो SQLite-ceiling कारण; pgvector ecosystem खण्डित छ।                                                       |
| **HAProxy / Envoy**                  | **हटाउने** | Caddy ले पहिल्यै LB + TLS गर्छ; दुवैलाई Tier-1 routers का रूपमा स्पष्ट रूपमा अस्वीकार गरिएको थियो (`AGENTS.md` हेर्नुहोस्)। |

यदि भविष्यको कुनै use case ले यीमध्ये कुनै एकको औचित्य प्रमाणित गर्छ भने, संशोधन गर्ने स्थान यही doc हो।

## 4-हप्ते rollout (स्वीकृत भएमा)

1. **हप्ता 1** — यो PR merge गर्ने + 3-replica compose stack सँग opt-in profiles को verification।
2. **हप्ता 2** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) मा रहेको sidecar proxy route प्रयोग गरी OpenAI/Claude/Gemini/Ollama (14+ providers मध्ये 4) का लागि Bifrost पूर्ण activation (`BIFROST_ENABLED` द्वारा नियन्त्रित, runtime मा kill-switch गर्न मिल्ने)।
3. **हप्ता 3** — एउटै test deployment मा Qdrant memory profile सक्षम गर्ने; sqlite-vec सँग latency delta मापन गर्ने।
4. **हप्ता 4** — Observability healthchecks (`docker compose ps` exit codes + `wget` smoke tests); ADR-041 अनुसार 71-pillar refresh।

## यो PR मा परिवर्तन गरिएका फाइलहरू

| फाइल                                               | परिवर्तन                                                                                                                                                                                                        |
| -------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                               | +30 lines: `memory` profile (Qdrant), `bifrost` profile (Bifrost), persistent volumes, healthchecks।                                                                                                            |
| `.env.example`                                     | +24 lines: `QDRANT_*` (6 vars), `BIFROST_*` (4 vars)।                                                                                                                                                           |
| `docs/reference/ENVIRONMENT.md`                    | `QDRANT_*` env vars का लागि section 25 मा +6 rows।                                                                                                                                                              |
| `src/lib/memory/qdrant.ts`                         | +33 lines: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` का लागि env-var fallback chain (settings → env → default)। |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`   | +88 lines: env-var fallback precedence स्थिर गर्ने 9 नयाँ test cases।                                                                                                                                           |
| `docs/architecture/cluster-decisions.md` (यो फाइल) | नयाँ — opt-in profiles का लागि decision record।                                                                                                                                                                 |
| `AGENTS.md`                                        | +1 line: reference documentation table मा यो doc तर्फ pointer।                                                                                                                                                  |

**कुल छोइएका code:** 4 production files (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 test file (`qdrant-wiring.test.ts`), 2 doc files (`cluster-decisions.md`, `AGENTS.md`)।
