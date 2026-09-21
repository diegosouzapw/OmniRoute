# Cluster Decisions — Optional Sidecar Profiles (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Статус:** предложение (очаква преглед от @diegosouzapw)
**Дата:** 2026-06-20
**Референции:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Накратко

Два compose профила с включване по избор (`memory`, `bifrost`) за съществуващото внедряване с 8 услуги в [`docker-compose.yml`](../../docker-compose.yml). Поведението по подразбиране при стартиране е **непроменено**: 3 × реплики на `omniroute` + Caddy + Redis + CliproxyAPI. Двата нови профила добавят Qdrant и Bifrost като незадължителни странични контейнери, активирани чрез `docker compose --profile <name> up`. **Нито една съществуваща услуга не се премахва или заменя.**

## Защо този подход е консервативен

Съществуващата архитектура за внедряване на OmniRoute вече е олекотена и доказана:

- **`redis:7-alpine`** обработва натоварването от ограничаването на честотата на заявките и кеширането в производствен мащаб.
- **SQLite + sqlite-vec + FTS5** покриват локалната памет, векторното и текстовото търсене (вижте [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** вече изпълнява ролята на балансьор на натоварването и терминатор на TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** вече е интегриран като маршрутизатор от ниво 1 в [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (страничен прокси контейнер с авариен превключвател чрез променливата на средата `BIFROST_ENABLED` — задайте `=0`, за да заобиколите страничния контейнер и да преминете към TS пътя).

Двата профила тук са **опции за мащабиране на внедрявания, които достигат ограниченията на SQLite** — не миграции. И двата са изключени по подразбиране.

## Двата профила

### `memory` — страничен контейнер за векторна памет Qdrant

**Кога да го включите:**

- > 1M вграждания на внедряване (sqlite-vec започва да се забавя при голям мащаб).
- Внедряване с множество реплики, което се нуждае от споделено векторно състояние между `omniroute-1/2/3`.
- Вече разполагате с външен Qdrant клъстер (Qdrant Cloud или локално разположен).

**Какво добавя:**

| Услуга   | Образ                   | Портове     | Бележки                                            |
| -------- | ----------------------- | ----------- | -------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | HNSW индекс; постоянен том `omniroute_qdrant_data` |

**Активиране:** задайте `qdrantEnabled = true` в потребителския интерфейс за настройки **или** задайте променливата на средата `QDRANT_HOST=qdrant`. Вижте [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts) за правилата за приоритет (таблица с настройки → променлива на средата → стойност по подразбиране).

**Променливи на средата:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (вижте редове 1672-1683 в `.env.example`).

### `bifrost` — страничен контейнер за маршрутизатора Bifrost от ниво 1

**Кога да го включите:**

- Използвате ≥3 реплики на `omniroute` и искате ротацията на доставчиците да бъде централизирана в един Go процес.
- Искате единна повърхност за одит и регистриране на заявките към външни доставчици от всички реплики.
- Искате хоризонтално мащабиране на слоя за маршрутизиране от ниво 1, независимо от репликите на OmniRoute.

**Какво добавя:**

| Услуга    | Образ                             | Портове | Бележки                                                                                                 |
| --------- | --------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080`  | Базиран на Go маршрутизатор от ниво 1; постоянен том за регистрационни файлове `omniroute_bifrost_logs` |

**Активиране:** задайте `BIFROST_BASE_URL=http://bifrost:8080` в `.env.example`. Съществуващият маршрут на страничния прокси контейнер в [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (добавен в PR #4381) автоматично ще използва тази стойност.

**Променливи на средата:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (вижте редове 1685-1695 в `.env.example`).

## Какво изрично НЕ прави този PR

В първоначалната дискусия по проблема беше предложено по-мащабно преработване на клъстера. След анализ на действителното натоварване следните компоненти са **отхвърлени** по посочените причини:

| Компонент                            | Решение    | Причина                                                                                                                                                |
| ------------------------------------ | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Dragonfly**                        | **ОТПАДА** | `redis:7-alpine` вече е напълно достатъчен за натоварването от ограничаването на честотата в продукционен мащаб; няма достигнат лимит за преодоляване. |
| **NATS**                             | **ОТПАДА** | Всяка реплика на `omniroute` е единичен Node.js процес; няма натоварване за публикуване/абониране между множество процеси.                             |
| **PostgreSQL**                       | **ОТПАДА** | SQLite + sqlite-vec + FTS5 покриват и трите случая на употреба; 97 миграции + пакетииране за Electron възпрепятстват миграцията.                       |
| **Neo4j**                            | **ОТПАДА** | Маршрутизирането представлява обединение на 5 таблици; рекурсивен CTE в SQLite е достатъчен.                                                           |
| **MinIO**                            | **ОТПАДА** | Няма натоварване с многомегабайтови двоични обекти; изображенията/аудиото се препредават чрез прокси.                                                  |
| **pgvector / pg_ai / pg_textsearch** | **ОТПАДА** | Същата причина, свързана с лимита на SQLite, както при PostgreSQL; екосистемата на pgvector е фрагментирана.                                           |
| **HAProxy / Envoy**                  | **ОТПАДА** | Caddy вече осигурява балансиране на натоварването + TLS; и двата бяха изрично отхвърлени като маршрутизатори от ниво 1 (вижте `AGENTS.md`).            |

Ако бъдещ случай на употреба докаже необходимостта от някой от тези компоненти, този документ е мястото, където решението трябва да бъде изменено.

## 4-седмично внедряване (при одобрение)

1. **Седмица 1** — Сливане на този PR + проверка на профилите с изрично включване чрез compose стек с 3 реплики.
2. **Седмица 2** — Пълно активиране на Bifrost за OpenAI/Claude/Gemini/Ollama (4 от над 14 доставчика) чрез маршрута на страничния прокси на [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (управлявано чрез `BIFROST_ENABLED`, с възможност за аварийно изключване по време на работа).
3. **Седмица 3** — Профилът за памет Qdrant се активира в единично тестово внедряване; измерване на разликата в латентността спрямо sqlite-vec.
4. **Седмица 4** — Проверки за работоспособността на наблюдаемостта (кодове за изход от `docker compose ps` + базови тестове с `wget`); обновяване на 71-те стълба съгласно ADR-041.

## Файлове, променени в този PR

| Файл                                                 | Промяна                                                                                                                                                                                                                                                        |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                 | +30 реда: профил `memory` (Qdrant), профил `bifrost` (Bifrost), постоянни томове, проверки за работоспособност.                                                                                                                                                |
| `.env.example`                                       | +24 реда: `QDRANT_*` (6 променливи), `BIFROST_*` (4 променливи).                                                                                                                                                                                               |
| `docs/reference/ENVIRONMENT.md`                      | +6 реда в раздел 25 за променливите на средата `QDRANT_*`.                                                                                                                                                                                                     |
| `src/lib/memory/qdrant.ts`                           | +33 реда: верига за резервни стойности на променливите на средата (настройки → среда → стойност по подразбиране) за `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`     | +88 реда: 9 нови тестови случая, фиксиращи приоритета на резервните стойности от променливите на средата.                                                                                                                                                      |
| `docs/architecture/cluster-decisions.md` (този файл) | НОВ — запис на решението за профилите с изрично включване.                                                                                                                                                                                                     |
| `AGENTS.md`                                          | +1 ред: препратка към този документ в таблицата със справочна документация.                                                                                                                                                                                    |

**Общо засегнат код:** 4 продукционни файла (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 тестов файл (`qdrant-wiring.test.ts`), 2 документационни файла (`cluster-decisions.md`, `AGENTS.md`).
