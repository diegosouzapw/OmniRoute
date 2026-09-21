# Cluster Decisions — Optional Sidecar Profiles (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**நிலை:** முன்மொழிவு (@diegosouzapw மதிப்பாய்வுக்காகக் காத்திருக்கிறது)
**தேதி:** 2026-06-20
**குறிப்புகள்:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## சுருக்கம்

[`docker-compose.yml`](../../docker-compose.yml)-இல் ஏற்கனவே உள்ள 8-சேவை நிறுவலுக்கான, விருப்பத்தின்பேரில் செயல்படுத்தக்கூடிய இரண்டு compose சுயவிவரங்கள் (`memory`, `bifrost`). இயல்புநிலை தொடக்கச் செயல்பாடு **மாறாது**: 3 × `omniroute` பிரதிகள் + Caddy + Redis + CliproxyAPI. இந்த இரண்டு புதிய சுயவிவரங்களும் Qdrant மற்றும் Bifrost-ஐ விருப்பத்தேர்வு sidecar-களாகச் சேர்க்கின்றன; இவை `docker compose --profile <name> up` மூலம் கட்டுப்படுத்தப்படுகின்றன. **ஏற்கனவே உள்ள எந்தச் சேவையும் அகற்றப்படவோ மாற்றீடு செய்யப்படவோ இல்லை.**

## இது ஏன் பழமைபேணும் அணுகுமுறை

OmniRoute-இன் தற்போதைய நிறுவல் அமைப்பு ஏற்கனவே சிக்கனமாகவும் நிரூபிக்கப்பட்டதாகவும் உள்ளது:

- **`redis:7-alpine`** உற்பத்தி அளவில் விகித வரம்பு/தற்காலிக சேமிப்பு பணிச்சுமையைக் கையாளுகிறது.
- **SQLite + sqlite-vec + FTS5** ஆகியவை உள்ளக நினைவகம் + வெக்டர் + உரைத் தேடலைக் கையாளுகின்றன ([`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)-ஐப் பார்க்கவும்).
- **Caddy** ஏற்கனவே சுமைச் சமநிலைப்படுத்தியாகவும் TLS முடிப்பானாகவும் உள்ளது ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** ஏற்கனவே [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)-இல் Tier-1 திசைவியாக ஒருங்கிணைக்கப்பட்டுள்ளது (`BIFROST_ENABLED` சூழல் மாறி வழியாக kill switch கொண்ட sidecar proxy — sidecar-ஐத் தவிர்த்து TS பாதைக்குத் தொடர `=0` என அமைக்கவும்).

இங்குள்ள இரண்டு சுயவிவரங்களும் **SQLite-இன் வரம்பை எட்டும் நிறுவல்களுக்கான கிடைமட்ட அளவாக்க விருப்பங்கள்** — இடம்பெயர்வுகள் அல்ல. இரண்டுமே இயல்புநிலையில் முடக்கப்பட்டுள்ளன.

## இரண்டு சுயவிவரங்கள்

### `memory` — Qdrant வெக்டர் நினைவக Sidecar

**எப்போது இயக்க வேண்டும்:**

- ஒரு நிறுவலுக்கு > 1M embedding-கள் (அளவு அதிகரிக்கும்போது sqlite-vec மெதுவாகத் தொடங்கும்).
- `omniroute-1/2/3` முழுவதும் பகிரப்பட்ட வெக்டர் நிலை தேவைப்படும் பல-பிரதி நிறுவல்.
- உங்களிடம் ஏற்கனவே வெளிப்புற Qdrant கிளஸ்டர் உள்ளது (Qdrant Cloud, வளாகத்திலேயே).

**இது சேர்ப்பவை:**

| சேவை     | Image                   | Port-கள்    | குறிப்புகள்                                         |
| -------- | ----------------------- | ----------- | --------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW சுட்டி; நிலையான volume `omniroute_qdrant_data` |

**செயல்படுத்துதல்:** Settings UI-இல் `qdrantEnabled = true` என மாற்றவும் **அல்லது** `QDRANT_HOST=qdrant` சூழல் மாறியை அமைக்கவும். முன்னுரிமை விதிகளுக்கு (settings அட்டவணை → சூழல் மாறி → இயல்புநிலை) [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts)-ஐப் பார்க்கவும்.

**சூழல் மாறிகள்:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (`.env.example` வரிகள் 1672-1683-ஐப் பார்க்கவும்).

### `bifrost` — Bifrost Tier-1 திசைவி Sidecar

**எப்போது இயக்க வேண்டும்:**

- நீங்கள் ≥3 `omniroute` பிரதிகளை இயக்குகிறீர்கள்; மேலும், வழங்குநர் சுழற்சியை ஒரே Go செயல்முறையில் மையப்படுத்த விரும்புகிறீர்கள்.
- அனைத்து பிரதிகளிலும் upstream வழங்குநர் கோரிக்கைகளுக்காக ஒரே தணிக்கை/பதிவிடல் தளத்தை விரும்புகிறீர்கள்.
- OmniRoute பிரதிகளிலிருந்து தனித்தனியாக Tier-1 திசைவி அடுக்கைக் கிடைமட்டமாக அளவாக்க விரும்புகிறீர்கள்.

**இது சேர்ப்பவை:**

| சேவை      | Image                             | Port-கள் | குறிப்புகள்                                                                      |
| --------- | --------------------------------- | -------- | -------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`   | Go-அடிப்படையிலான Tier-1 திசைவி; நிலையான பதிவுகள் volume `omniroute_bifrost_logs` |

**செயல்படுத்துதல்:** `.env.example`-இல் `BIFROST_BASE_URL=http://bifrost:8080` என அமைக்கவும். [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts)-இல் ஏற்கனவே உள்ள sidecar proxy பாதை (PR #4381-இல் சேர்க்கப்பட்டது) இதைத் தானாகவே எடுத்துக்கொள்ளும்.

**சூழல் மாறிகள்:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (`.env.example` வரிகள் 1685-1695-ஐப் பார்க்கவும்).

## இந்த PR வெளிப்படையாகச் செய்யாதவை

மூல issue thread-இல் பெரிய அளவிலான cluster மறுகட்டமைப்பு முன்வைக்கப்பட்டது. உண்மையான workload வடிவத்தைத் தணிக்கை செய்த பிறகு, கீழ்க்கண்டவை குறிப்பிடப்பட்ட காரணங்களுக்காக **நிராகரிக்கப்பட்டுள்ளன**:

| கூறு                                 | தீர்ப்பு   | காரணம்                                                                                                                          |
| ------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **நீக்கு** | production அளவிலான rate-limit workload-க்கு `redis:7-alpine` ஏற்கனவே போதுமானது; கடக்க வேண்டிய உச்சவரம்பு எதுவுமில்லை.           |
| **NATS**                             | **நீக்கு** | ஒவ்வொரு `omniroute` replica-வும் ஒரு தனி Node.js process; multi-process pub/sub workload எதுவும் இல்லை.                         |
| **PostgreSQL**                       | **நீக்கு** | SQLite + sqlite-vec + FTS5 ஆகியவை 3 பயன்பாடுகளையும் கையாளுகின்றன; 97 migrations + Electron packaging இடமாற்றத்தைத் தடுக்கின்றன. |
| **Neo4j**                            | **நீக்கு** | Routing என்பது 5-table join; SQLite-இல் recursive CTE போதுமானது.                                                                |
| **MinIO**                            | **நீக்கு** | multi-MB blob workload எதுவுமில்லை; படங்கள்/audio ஆகியவை passthrough proxies ஆகும்.                                             |
| **pgvector / pg_ai / pg_textsearch** | **நீக்கு** | PostgreSQL-ஐப் போன்ற அதே SQLite உச்சவரம்புக் காரணம்; pgvector சூழலமைப்பு சிதறியுள்ளது.                                          |
| **HAProxy / Envoy**                  | **நீக்கு** | Caddy ஏற்கனவே LB + TLS செய்கிறது; இரண்டுமே Tier-1 routers ஆக வெளிப்படையாக நிராகரிக்கப்பட்டன (`AGENTS.md`-ஐப் பார்க்கவும்).      |

எதிர்காலப் பயன்பாடு இவற்றில் ஏதேனும் ஒன்றின் தேவையை நிரூபித்தால், திருத்துவதற்கான இடம் இந்த ஆவணமே.

## 4-வார வெளியீடு (ஒப்புதல் கிடைத்தால்)

1. **வாரம் 1** — இந்த PR-ஐ இணைத்து, 3-replica compose stack மூலம் opt-in profiles-ஐச் சரிபார்த்தல்.
2. **வாரம் 2** — [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) இல் உள்ள sidecar proxy route-ஐப் பயன்படுத்தி OpenAI/Claude/Gemini/Ollama-க்கான Bifrost முழுச் செயல்படுத்தல் (14+ providers-இல் 4); (`BIFROST_ENABLED` மூலம் கட்டுப்படுத்தப்பட்டு, runtime-இல் kill-switch செய்யக்கூடியது).
3. **வாரம் 3** — ஒரு test deployment-இல் Qdrant memory profile-ஐ இயக்கி, sqlite-vec உடனான latency வேறுபாட்டை அளவிடுதல்.
4. **வாரம் 4** — Observability healthchecks (`docker compose ps` exit codes + `wget` smoke tests); ADR-041-இன்படி 71-pillar புதுப்பிப்பு.

## இந்த PR-இல் மாற்றப்பட்ட கோப்புகள்

| கோப்பு                                                   | மாற்றம்                                                                                                                                                                                                        |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                     | +30 வரிகள்: `memory` profile (Qdrant), `bifrost` profile (Bifrost), persistent volumes, healthchecks.                                                                                                          |
| `.env.example`                                           | +24 வரிகள்: `QDRANT_*` (6 vars), `BIFROST_*` (4 vars).                                                                                                                                                         |
| `docs/reference/ENVIRONMENT.md`                          | `QDRANT_*` env vars-க்காகப் பிரிவு 25-இல் +6 வரிசைகள்.                                                                                                                                                         |
| `src/lib/memory/qdrant.ts`                               | +33 வரிகள்: `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`-க்கான env-var fallback chain (settings → env → default). |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`         | +88 வரிகள்: env-var fallback முன்னுரிமையை உறுதிசெய்யும் 9 புதிய test cases.                                                                                                                                    |
| `docs/architecture/cluster-decisions.md` (இந்தக் கோப்பு) | புதியது — opt-in profiles-க்கான முடிவுப் பதிவு.                                                                                                                                                                |
| `AGENTS.md`                                              | +1 வரி: reference documentation table-இல் இந்த ஆவணத்திற்கான சுட்டி.                                                                                                                                            |

**மொத்தமாகத் தொடப்பட்ட code:** 4 production கோப்புகள் (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 test கோப்பு (`qdrant-wiring.test.ts`), 2 doc கோப்புகள் (`cluster-decisions.md`, `AGENTS.md`).
