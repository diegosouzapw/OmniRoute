# Cluster Decisions — Optional Sidecar Profiles (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**સ્થિતિ:** પ્રસ્તાવ (@diegosouzapwની સમીક્ષાની રાહ જોવાઈ રહી છે)
**તારીખ:** 2026-06-20
**સંદર્ભો:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

[`docker-compose.yml`](../../docker-compose.yml)માં હાલના 8-સેવા ડિપ્લોયમેન્ટ માટે બે વૈકલ્પિક compose પ્રોફાઇલ્સ (`memory`, `bifrost`). ડિફૉલ્ટ રીતે શરૂ થતું વર્તન **અપરિવર્તિત** છે: 3 × `omniroute` રેપ્લિકા + Caddy + Redis + CliproxyAPI. બે નવી પ્રોફાઇલ્સ Qdrant અને Bifrostને વૈકલ્પિક સાઇડકાર તરીકે ઉમેરે છે, જે `docker compose --profile <name> up` દ્વારા સક્રિય થાય છે. **કોઈ હાલની સેવા દૂર કરવામાં કે બદલવામાં આવતી નથી.**

## આ અભિગમ સાવધાનીપૂર્ણ કેમ છે

OmniRouteનું હાલનું ડિપ્લોયમેન્ટ માળખું પહેલેથી જ હળવું અને પ્રમાણિત છે:

- **`redis:7-alpine`** પ્રોડક્શન સ્તરે રેટ-લિમિટ/કૅશ વર્કલોડ સંભાળે છે.
- **SQLite + sqlite-vec + FTS5** સ્થાનિક મેમરી + વેક્ટર + ટેક્સ્ટ-સર્ચને આવરી લે છે ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts) જુઓ).
- **Caddy** પહેલેથી જ LB + TLS ટર્મિનેટર છે ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** પહેલેથી જ [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)માં Tier-1 રાઉટર તરીકે સંકલિત છે (`BIFROST_ENABLED` env var દ્વારા કિલ સ્વિચ ધરાવતું સાઇડકાર પ્રૉક્સી — સાઇડકારને બાયપાસ કરીને TS પાથ પર જવા માટે `=0` સેટ કરો).

અહીંની બંને પ્રોફાઇલ્સ **SQLiteની ક્ષમતા મર્યાદા સુધી પહોંચતા ડિપ્લોયમેન્ટ્સ માટે સ્કેલ-આઉટ વિકલ્પો છે** — માઇગ્રેશન નથી. બંને ડિફૉલ્ટ રૂપે બંધ છે.

## બે પ્રોફાઇલ્સ

### `memory` — Qdrant વેક્ટર મેમરી સાઇડકાર

**ક્યારે ચાલુ કરવી:**

- દરેક ડિપ્લોયમેન્ટ દીઠ > 1M એમ્બેડિંગ્સ (sqlite-vec મોટા સ્કેલ પર ધીમું પડવાનું શરૂ કરે છે).
- એવું મલ્ટિ-રેપ્લિકા ડિપ્લોયમેન્ટ જેને `omniroute-1/2/3` વચ્ચે શેર કરેલી વેક્ટર સ્થિતિની જરૂર હોય.
- તમારી પાસે પહેલેથી જ બાહ્ય Qdrant ક્લસ્ટર હોય (Qdrant Cloud, ઑન-પ્રેમ).

**તે શું ઉમેરે છે:**

| સેવા     | ઇમેજ                    | પોર્ટ્સ     | નોંધો                                                      |
| -------- | ----------------------- | ----------- | ---------------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW ઇન્ડેક્સ; પર્સિસ્ટન્ટ વૉલ્યુમ `omniroute_qdrant_data` |

**સક્રિયકરણ:** Settings UIમાં `qdrantEnabled = true` કરો **અથવા** `QDRANT_HOST=qdrant` env સેટ કરો. અગ્રતા નિયમો માટે [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) જુઓ (સેટિંગ્સ ટેબલ → env var → ડિફૉલ્ટ).

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example`ની લાઇન્સ 1672-1683 જુઓ).

### `bifrost` — Bifrost Tier-1 રાઉટર સાઇડકાર

**ક્યારે ચાલુ કરવી:**

- તમે ≥3 `omniroute` રેપ્લિકા ચલાવતા હો અને એક જ Go પ્રોસેસમાં પ્રોવાઇડર રોટેશનને કેન્દ્રિત કરવા માંગતા હો.
- તમે તમામ રેપ્લિકામાંથી અપસ્ટ્રીમ-પ્રોવાઇડર વિનંતીઓ માટે એક જ ઑડિટ/લૉગિંગ સપાટી ઇચ્છતા હો.
- તમે OmniRoute રેપ્લિકાથી સ્વતંત્ર રીતે Tier-1 રાઉટિંગ સ્તરનું હોરિઝોન્ટલ સ્કેલિંગ ઇચ્છતા હો.

**તે શું ઉમેરે છે:**

| સેવા      | ઇમેજ                              | પોર્ટ્સ | નોંધો                                                                      |
| --------- | --------------------------------- | ------- | -------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | Go-આધારિત Tier-1 રાઉટર; પર્સિસ્ટન્ટ લૉગ્સ વૉલ્યુમ `omniroute_bifrost_logs` |

**સક્રિયકરણ:** `.env.example`માં `BIFROST_BASE_URL=http://bifrost:8080` સેટ કરો. [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) પરનો હાલનો સાઇડકાર પ્રૉક્સી રૂટ (PR #4381માં ઉમેરાયેલ) આને આપમેળે ઉપયોગમાં લેશે.

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example`ની લાઇન્સ 1685-1695 જુઓ).

## આ PR સ્પષ્ટપણે શું કરતું નથી

મૂળ ઇશ્યૂ થ્રેડમાં વધુ વ્યાપક ક્લસ્ટર પુનર્લેખનનો પ્રસ્તાવ મૂકવામાં આવ્યો હતો. વાસ્તવિક વર્કલોડના સ્વરૂપનું ઑડિટ કર્યા પછી, આપેલાં કારણોસર નીચેના વિકલ્પો **નકારવામાં આવ્યા છે**:

| ઘટક                                  | નિર્ણય      | કારણ                                                                                                                    |
| ------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **દૂર કરો** | ઉત્પાદન સ્તરે રેટ-લિમિટ વર્કલોડ માટે `redis:7-alpine` પહેલેથી જ પૂરતું છે; તોડવી પડે તેવી કોઈ મર્યાદા નથી.              |
| **NATS**                             | **દૂર કરો** | દરેક `omniroute` રેપ્લિકા એક જ Node.js પ્રોસેસ છે; કોઈ મલ્ટિ-પ્રોસેસ pub/sub વર્કલોડ અસ્તિત્વમાં નથી.                   |
| **PostgreSQL**                       | **દૂર કરો** | SQLite + sqlite-vec + FTS5 ત્રણેય ઉપયોગના કિસ્સાઓને આવરી લે છે; 97 માઇગ્રેશન + Electron પેકેજિંગ માઇગ્રેશનને અવરોધે છે. |
| **Neo4j**                            | **દૂર કરો** | રાઉટિંગ એ 5-ટેબલનો join છે; SQLite પર recursive CTE પૂરતું છે.                                                          |
| **MinIO**                            | **દૂર કરો** | કોઈ multi-MB blob વર્કલોડ નથી; છબીઓ/ઑડિયો passthrough proxies છે.                                                       |
| **pgvector / pg_ai / pg_textsearch** | **દૂર કરો** | PostgreSQL જેવું જ SQLite-મર્યાદાનું કારણ; pgvector ઇકોસિસ્ટમ વિભાજિત છે.                                               |
| **HAProxy / Envoy**                  | **દૂર કરો** | Caddy પહેલેથી જ LB + TLS કરે છે; બંનેને Tier-1 routers તરીકે સ્પષ્ટપણે નકારવામાં આવ્યા હતા (`AGENTS.md` જુઓ).           |

જો ભવિષ્યમાં કોઈ ઉપયોગનો કિસ્સો આમાંથી કોઈ વિકલ્પને યોગ્ય સાબિત કરે, તો આ દસ્તાવેજમાં સુધારો કરવો.

## 4-અઠવાડિયાનો રોલઆઉટ (મંજૂર થાય તો)

1. **અઠવાડિયું 1** — આ PR મર્જ કરો + 3-રેપ્લિકા compose stack સાથે opt-in profilesનું ચકાસણી કરો.
2. **અઠવાડિયું 2** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) પર sidecar proxy routeનો ઉપયોગ કરીને OpenAI/Claude/Gemini/Ollama (14+ providersમાંથી 4) માટે Bifrostનું સંપૂર્ણ સક્રિયકરણ (`BIFROST_ENABLED` દ્વારા નિયંત્રિત, runtime પર kill-switch કરી શકાય તેવું).
3. **અઠવાડિયું 3** — એક test deploymentમાં Qdrant memory profile સક્ષમ કરો; sqlite-vecની સરખામણીમાં latency delta માપો.
4. **અઠવાડિયું 4** — Observability healthchecks (`docker compose ps` exit codes + `wget` smoke tests); ADR-041 મુજબ 71-pillar refresh.

## આ PRમાં બદલાયેલી ફાઇલો

| ફાઇલ                                              | ફેરફાર                                                                                                                                                                                                       |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `docker-compose.yml`                              | +30 લાઇનો: `memory` profile (Qdrant), `bifrost` profile (Bifrost), persistent volumes, healthchecks.                                                                                                         |
| `.env.example`                                    | +24 લાઇનો: `QDRANT_*` (6 vars), `BIFROST_*` (4 vars).                                                                                                                                                        |
| `docs/reference/ENVIRONMENT.md`                   | `QDRANT_*` env vars માટે વિભાગ 25માં +6 પંક્તિઓ.                                                                                                                                                             |
| `src/lib/memory/qdrant.ts`                        | +33 લાઇનો: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL` માટે env-var fallback chain (settings → env → default). |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`  | +88 લાઇનો: env-var fallback precedenceને નિશ્ચિત કરતા 9 નવા test cases.                                                                                                                                      |
| `docs/architecture/cluster-decisions.md` (આ ફાઇલ) | નવી — opt-in profiles માટે decision record.                                                                                                                                                                  |
| `AGENTS.md`                                       | +1 લાઇન: reference documentation tableમાં આ દસ્તાવેજનો નિર્દેશ.                                                                                                                                              |

**કુલ સ્પર્શાયેલ કોડ:** 4 production files (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 test file (`qdrant-wiring.test.ts`), 2 doc files (`cluster-decisions.md`, `AGENTS.md`).
