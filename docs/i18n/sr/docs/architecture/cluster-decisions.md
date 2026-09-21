# Cluster Decisions — Optional Sidecar Profiles (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Статус:** предлог (чека се преглед од стране @diegosouzapw)
**Датум:** 2026-06-20
**Референце:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Укратко

Два опциона compose профила (`memory`, `bifrost`) за постојеће распоређивање са 8 сервиса у датотеци [`docker-compose.yml`](../../docker-compose.yml). Подразумевано понашање при покретању је **непромењено**: 3 × `omniroute` реплике + Caddy + Redis + CliproxyAPI. Два нова профила додају Qdrant и Bifrost као опционе пратеће сервисе, који се активирају командом `docker compose --profile <name> up`. **Ниједан постојећи сервис се не уклања нити замењује.**

## Зашто је овај приступ конзервативан

Постојећа структура распоређивања OmniRoute-а већ је једноставна и доказана:

- **`redis:7-alpine`** обрађује ограничење протока и кеширање при продукционом оптерећењу.
- **SQLite + sqlite-vec + FTS5** покривају локалну меморију, векторску претрагу и претрагу текста (погледајте [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** већ служи као балансер оптерећења и завршна тачка за TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** је већ интегрисан као Tier-1 рутер у [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (пратећи прокси сервис са прекидачем за искључивање преко променљиве окружења `BIFROST_ENABLED` — поставите `=0` да бисте заобишли пратећи сервис и прешли на TS путању).

Ова два профила представљају **опције за хоризонтално скалирање распоређивања која достигну ограничења SQLite-а** — нису миграције. Оба су подразумевано искључена.

## Два профила

### `memory` — пратећи сервис Qdrant векторске меморије

**Када га треба укључити:**

- > 1M угнежђивања по распоређивању (sqlite-vec почиње да успорава при великом обиму).
- Расоређивање са више реплика којем је потребно дељено векторско стање између `omniroute-1/2/3`.
- Већ имате спољни Qdrant кластер (Qdrant Cloud, у сопственој инфраструктури).

**Шта додаје:**

| Сервис   | Слика                   | Портови     | Напомене                                            |
| -------- | ----------------------- | ----------- | --------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW индекс; трајни волумен `omniroute_qdrant_data` |

**Активација:** укључите `qdrantEnabled = true` у корисничком интерфејсу за подешавања **или** поставите променљиву окружења `QDRANT_HOST=qdrant`. Погледајте [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) за правила приоритета (табела подешавања → променљива окружења → подразумевана вредност).

**Променљиве окружења:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (погледајте редове 1672-1683 у `.env.example`).

### `bifrost` — пратећи сервис Bifrost Tier-1 рутера

**Када га треба укључити:**

- Покрећете ≥3 `omniroute` реплике и желите да ротација добављача буде централизована у једном Go процесу.
- Желите јединствено место за ревизију и евидентирање захтева ка спољним добављачима за све реплике.
- Желите хоризонтално скалирање Tier-1 слоја за рутирање независно од OmniRoute реплика.

**Шта додаје:**

| Сервис    | Слика                             | Портови | Напомене                                                                                  |
| --------- | --------------------------------- | ------- | ----------------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | Tier-1 рутер заснован на језику Go; трајни волумен за евиденције `omniroute_bifrost_logs` |

**Активација:** поставите `BIFROST_BASE_URL=http://bifrost:8080` у `.env.example`. Постојећа путања проксија пратећег сервиса у [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (додата у PR #4381) аутоматски ће користити ову вредност.

**Променљиве окружења:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (погледајте редове 1685-1695 у `.env.example`).

## Шта овај PR изричито НЕ ради

У првобитној дискусији о проблему предложено је обимније преправљање кластера. Након анализе стварног облика радног оптерећења, следеће ставке су **одбачене** из наведених разлога:

| Компонента                           | Одлука       | Разлог                                                                                                                           |
| ------------------------------------ | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ОДБАЧЕНО** | `redis:7-alpine` је већ сасвим довољан за продукцијско оптерећење ограничења брзине; не постоји ограничење које треба превазићи. |
| **NATS**                             | **ОДБАЧЕНО** | Свака `omniroute` реплика је један Node.js процес; не постоји вишепроцесно pub/sub оптерећење.                                   |
| **PostgreSQL**                       | **ОДБАЧЕНО** | SQLite + sqlite-vec + FTS5 покривају сва 3 случаја употребе; 97 миграција + Electron паковање блокирају миграцију.               |
| **Neo4j**                            | **ОДБАЧЕНО** | Рутирање је спајање 5 табела; рекурзивни CTE у SQLite-у је довољан.                                                              |
| **MinIO**                            | **ОДБАЧЕНО** | Не постоји оптерећење вишемегабајтним blob објектима; слике/звук се прослеђују преко посредничких проксија.                      |
| **pgvector / pg_ai / pg_textsearch** | **ОДБАЧЕНО** | Исти разлог у вези са ограничењем SQLite-а као код PostgreSQL-а; pgvector екосистем је фрагментиран.                             |
| **HAProxy / Envoy**                  | **ОДБАЧЕНО** | Caddy већ обавља LB + TLS; оба су изричито одбачена као Tier-1 рутери (погледајте `AGENTS.md`).                                  |

Ако неки будући случај употребе оправда једно од ових решења, овај документ је место за измену одлуке.

## Четворонедељно увођење (ако буде одобрено)

1. **1. недеља** — Спојити овај PR + проверити профиле који се изричито укључују помоћу compose стека са 3 реплике.
2. **2. недеља** — Потпуно активирање Bifrost-а за OpenAI/Claude/Gemini/Ollama (4 од 14+ добављача) коришћењем sidecar прокси руте на [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (контролисано помоћу `BIFROST_ENABLED`, уз могућност искључивања током извршавања).
3. **3. недеља** — Профил Qdrant меморије омогућен у једном тестном окружењу; измерити разлику у кашњењу у односу на sqlite-vec.
4. **4. недеља** — Провере исправности опсервабилности (излазни кодови `docker compose ps` + `wget` основни тестови); освежавање 71 стуба у складу са ADR-041.

## Датотеке измењене у овом PR-у

| Датотека                                                | Измена                                                                                                                                                                                                                                         |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                    | +30 редова: профил `memory` (Qdrant), профил `bifrost` (Bifrost), трајни волумени, провере исправности.                                                                                                                                        |
| `.env.example`                                          | +24 реда: `QDRANT_*` (6 променљивих), `BIFROST_*` (4 променљиве).                                                                                                                                                                              |
| `docs/reference/ENVIRONMENT.md`                         | +6 редова у одељку 25 за `QDRANT_*` променљиве окружења.                                                                                                                                                                                       |
| `src/lib/memory/qdrant.ts`                              | +33 реда: ланац резервних вредности променљивих окружења (подешавања → окружење → подразумевано) за `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`        | +88 редова: 9 нових тест случајева који утврђују приоритет резервних вредности променљивих окружења.                                                                                                                                           |
| `docs/architecture/cluster-decisions.md` (ова датотека) | НОВО — запис одлуке за профиле који се изричито укључују.                                                                                                                                                                                      |
| `AGENTS.md`                                             | +1 ред: упућивање на овај документ у табели референтне документације.                                                                                                                                                                          |

**Укупно обухваћен код:** 4 продукцијске датотеке (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 тестна датотека (`qdrant-wiring.test.ts`), 2 документационе датотеке (`cluster-decisions.md`, `AGENTS.md`).
