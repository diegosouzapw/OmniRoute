# Cluster Decisions — Optional Sidecar Profiles (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇧🇦 [bs](../../../bs/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**ស្ថានភាព:** សំណើ (កំពុងរង់ចាំការពិនិត្យពី @diegosouzapw)
**កាលបរិច្ឆេទ:** 2026-06-20
**ឯកសារយោង:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## TL;DR

Profile compose ដែលអាចជ្រើសបើកបានចំនួនពីរ (`memory`, `bifrost`) សម្រាប់ការដាក់ឱ្យដំណើរការដែលមានសេវាកម្មចំនួន 8 ស្រាប់នៅក្នុង [`docker-compose.yml`](../../docker-compose.yml)។ ឥរិយាបថពេលចាប់ផ្ដើមតាមលំនាំដើមគឺ **មិនផ្លាស់ប្ដូរ**៖ replica `omniroute` ចំនួន 3 + Caddy + Redis + CliproxyAPI។ Profile ថ្មីទាំងពីរនេះបន្ថែម Qdrant និង Bifrost ជា sidecar ជាជម្រើស ដែលត្រូវបានបើកតាមរយៈ `docker compose --profile <name> up`។ **គ្មានសេវាកម្មដែលមានស្រាប់ណាមួយត្រូវបានដកចេញ ឬជំនួសឡើយ។**

## ហេតុអ្វីបានជាវិធីនេះមានលក្ខណៈប្រុងប្រយ័ត្ន

ទម្រង់នៃការដាក់ឱ្យដំណើរការដែលមានស្រាប់របស់ OmniRoute មានភាពស្រាល និងត្រូវបានបញ្ជាក់ប្រសិទ្ធភាពរួចហើយ៖

- **`redis:7-alpine`** គ្រប់គ្រងបន្ទុកការងារ rate-limit/cache នៅកម្រិត production។
- **SQLite + sqlite-vec + FTS5** គ្របដណ្ដប់លើ memory មូលដ្ឋាន + vector + ការស្វែងរកអត្ថបទ (សូមមើល [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts))។
- **Caddy** គឺជា LB + TLS terminator រួចជាស្រេច ([`docker-compose.yml`](../../docker-compose.yml))។
- **Bifrost** ត្រូវបានរួមបញ្ចូលរួចហើយជា router Tier-1 នៅក្នុង [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (sidecar proxy ដែលមាន kill switch តាមរយៈ env var `BIFROST_ENABLED` — កំណត់ `=0` ដើម្បីរំលង sidecar ហើយបន្តទៅកាន់ផ្លូវ TS)។

Profile ទាំងពីរនៅទីនេះគឺជា **ជម្រើសសម្រាប់ពង្រីកប្រព័ន្ធនៅពេលការដាក់ឱ្យដំណើរការឈានដល់ដែនកំណត់របស់ SQLite** — មិនមែនជាការធ្វើ migration ទេ។ ទាំងពីរត្រូវបានបិទតាមលំនាំដើម។

## Profile ទាំងពីរ

### `memory` — Sidecar សម្រាប់ Vector Memory របស់ Qdrant

**ពេលណាគួរបើក៖**

- មាន embedding > 1M ក្នុងការដាក់ឱ្យដំណើរការនីមួយៗ (sqlite-vec ចាប់ផ្ដើមយឺតនៅពេលទំហំកើនឡើង)។
- ការដាក់ឱ្យដំណើរការដែលមាន replica ច្រើន និងត្រូវការស្ថានភាព vector រួមគ្នារវាង `omniroute-1/2/3`។
- អ្នកមាន cluster Qdrant ខាងក្រៅរួចហើយ (Qdrant Cloud, on-prem)។

**អ្វីដែលវាបន្ថែម៖**

| សេវាកម្ម | Image                   | Port        | កំណត់សម្គាល់                                           |
| -------- | ----------------------- | ----------- | ------------------------------------------------------ |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW index; volume អចិន្ត្រៃយ៍ `omniroute_qdrant_data` |

**ការបើកប្រើ:** ប្ដូរ `qdrantEnabled = true` នៅក្នុង UI ការកំណត់ **ឬ** កំណត់ env `QDRANT_HOST=qdrant`។ សូមមើល [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) សម្រាប់ច្បាប់អាទិភាព (តារាងការកំណត់ → env var → លំនាំដើម)។

**Env vars:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (សូមមើលបន្ទាត់ 1672-1683 ក្នុង `.env.example`)។

### `bifrost` — Sidecar សម្រាប់ Router Tier-1 របស់ Bifrost

**ពេលណាគួរបើក៖**

- អ្នកដំណើរការ replica `omniroute` ≥3 ហើយចង់គ្រប់គ្រងការប្ដូរ provider ពីទីតាំងកណ្ដាលនៅក្នុង Go process តែមួយ។
- អ្នកចង់បានផ្ទៃ audit/logging តែមួយសម្រាប់សំណើទៅកាន់ upstream-provider នៅទូទាំង replica ទាំងអស់។
- អ្នកចង់ពង្រីក routing layer Tier-1 តាមផ្ដេក ដោយឯករាជ្យពី replica របស់ OmniRoute។

**អ្វីដែលវាបន្ថែម៖**

| សេវាកម្ម  | Image                             | Port   | កំណត់សម្គាល់                                                              |
| --------- | --------------------------------- | ------ | ------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Router Tier-1 ផ្អែកលើ Go; volume log អចិន្ត្រៃយ៍ `omniroute_bifrost_logs` |

**ការបើកប្រើ:** កំណត់ `BIFROST_BASE_URL=http://bifrost:8080` នៅក្នុង `.env.example`។ Route sidecar proxy ដែលមានស្រាប់នៅ [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (បានបន្ថែមក្នុង PR #4381) នឹងចាប់យកការកំណត់នេះដោយស្វ័យប្រវត្តិ។

**Env vars:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (សូមមើលបន្ទាត់ 1685-1695 ក្នុង `.env.example`)។

## អ្វីដែល PR នេះមិនធ្វើជាក់លាក់

ខ្សែសន្ទនានៃបញ្ហាដើមបានលើកឡើងអំពីការសរសេរក្លាស្ទ័រឡើងវិញក្នុងទ្រង់ទ្រាយធំជាងនេះ។ បន្ទាប់ពីធ្វើសវនកម្មលើលក្ខណៈការងារជាក់ស្តែង ធាតុខាងក្រោមត្រូវបាន **បដិសេធ** ដោយសារហេតុផលដែលបានផ្តល់ឱ្យ៖

| សមាសភាគ                              | សេចក្តីសម្រេច | ហេតុផល                                                                                                                        |
| ------------------------------------ | ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ដកចេញ**     | `redis:7-alpine` ដំណើរការបានល្អរួចហើយសម្រាប់បន្ទុកការងារកំណត់អត្រានៅមាត្រដ្ឋានផលិតកម្ម ហើយមិនមានដែនកំណត់ដែលត្រូវបំបែកទេ។      |
| **NATS**                             | **ដកចេញ**     | រេប្លីកា `omniroute` នីមួយៗគឺជាដំណើរការ Node.js តែមួយ ហើយមិនមានបន្ទុកការងារ pub/sub ពហុដំណើរការទេ។                            |
| **PostgreSQL**                       | **ដកចេញ**     | SQLite + sqlite-vec + FTS5 គ្របដណ្តប់ករណីប្រើប្រាស់ទាំង 3 ហើយ migration ចំនួន 97 + ការវេចខ្ចប់ Electron រារាំងការផ្លាស់ប្តូរ។ |
| **Neo4j**                            | **ដកចេញ**     | ការកំណត់ផ្លូវគឺជា join លើតារាងចំនួន 5 ហើយ recursive CTE លើ SQLite គឺគ្រប់គ្រាន់។                                              |
| **MinIO**                            | **ដកចេញ**     | មិនមានបន្ទុកការងារ blob ទំហំច្រើន MB ទេ ហើយរូបភាព/អូឌីយ៉ូគឺជា passthrough proxy។                                              |
| **pgvector / pg_ai / pg_textsearch** | **ដកចេញ**     | ហេតុផលអំពីដែនកំណត់របស់ SQLite ដូចគ្នានឹង PostgreSQL ហើយ ecosystem របស់ pgvector មានភាពបែកខ្ញែក។                               |
| **HAProxy / Envoy**                  | **ដកចេញ**     | Caddy ធ្វើ LB + TLS រួចហើយ ហើយទាំងពីរត្រូវបានបដិសេធយ៉ាងច្បាស់ថាជា router កម្រិត Tier-1 (សូមមើល `AGENTS.md`)។                  |

ប្រសិនបើករណីប្រើប្រាស់នាពេលអនាគតបញ្ជាក់ថាធាតុណាមួយក្នុងចំណោមទាំងនេះមានភាពសមស្រប ឯកសារនេះគឺជាកន្លែងសម្រាប់ធ្វើវិសោធនកម្ម។

## ការដាក់ឱ្យប្រើប្រាស់ក្នុងរយៈពេល 4 សប្តាហ៍ (ប្រសិនបើត្រូវបានអនុម័ត)

1. **សប្តាហ៍ទី 1** — បញ្ចូល PR នេះ + ផ្ទៀងផ្ទាត់ profile ដែលត្រូវជ្រើសរើសបើកប្រើ ដោយប្រើ compose stack ដែលមានរេប្លីកា 3។
2. **សប្តាហ៍ទី 2** — បើកប្រើ Bifrost ពេញលេញសម្រាប់ OpenAI/Claude/Gemini/Ollama (4 ក្នុងចំណោម provider 14+) ដោយប្រើផ្លូវ sidecar proxy នៅ [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (គ្រប់គ្រងដោយ `BIFROST_ENABLED` និងអាចបិទជាបន្ទាន់នៅពេលដំណើរការ)។
3. **សប្តាហ៍ទី 3** — បើក profile អង្គចងចាំ Qdrant ក្នុងការដាក់ឱ្យប្រើប្រាស់សាកល្បងមួយ ហើយវាស់ភាពខុសគ្នានៃ latency ធៀបនឹង sqlite-vec។
4. **សប្តាហ៍ទី 4** — ការត្រួតពិនិត្យសុខភាព observability (`docker compose ps` exit code + ការធ្វើតេស្ត smoke ដោយ `wget`) និងធ្វើបច្ចុប្បន្នភាពសសរស្តម្ភទាំង 71 យោងតាម ADR-041។

## ឯកសារដែលបានផ្លាស់ប្តូរក្នុង PR នេះ

| ឯកសារ                                               | ការផ្លាស់ប្តូរ                                                                                                                                                                                                                    |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                | +30 បន្ទាត់៖ profile `memory` (Qdrant), profile `bifrost` (Bifrost), volume អចិន្ត្រៃយ៍ និងការត្រួតពិនិត្យសុខភាព។                                                                                                                 |
| `.env.example`                                      | +24 បន្ទាត់៖ `QDRANT_*` (អថេរ 6), `BIFROST_*` (អថេរ 4)។                                                                                                                                                                           |
| `docs/reference/ENVIRONMENT.md`                     | +6 ជួរដេកក្នុងផ្នែកទី 25 សម្រាប់អថេរបរិស្ថាន `QDRANT_*`។                                                                                                                                                                          |
| `src/lib/memory/qdrant.ts`                          | +33 បន្ទាត់៖ លំដាប់ fallback របស់អថេរបរិស្ថាន (ការកំណត់ → បរិស្ថាន → លំនាំដើម) សម្រាប់ `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`។ |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`    | +88 បន្ទាត់៖ ករណីតេស្តថ្មី 9 ដែលកំណត់អាទិភាព fallback របស់អថេរបរិស្ថាន។                                                                                                                                                           |
| `docs/architecture/cluster-decisions.md` (ឯកសារនេះ) | ថ្មី — កំណត់ត្រាសេចក្តីសម្រេចសម្រាប់ profile ដែលត្រូវជ្រើសរើសបើកប្រើ។                                                                                                                                                             |
| `AGENTS.md`                                         | +1 បន្ទាត់៖ សេចក្តីយោងទៅឯកសារនេះក្នុងតារាងឯកសារយោង។                                                                                                                                                                               |

**កូដដែលបានប៉ះពាល់សរុប៖** ឯកសារផលិតកម្ម 4 (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), ឯកសារតេស្ត 1 (`qdrant-wiring.test.ts`) និងឯកសារឯកសារណែនាំ 2 (`cluster-decisions.md`, `AGENTS.md`)។
