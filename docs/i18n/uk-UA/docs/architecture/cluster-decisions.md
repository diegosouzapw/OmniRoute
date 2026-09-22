# Cluster Decisions — Optional Sidecar Profiles (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/cluster-decisions.md) · 🇪🇹 [am](../../../am/docs/architecture/cluster-decisions.md) · 🇸🇦 [ar](../../../ar/docs/architecture/cluster-decisions.md) · 🇦🇿 [az](../../../az/docs/architecture/cluster-decisions.md) · 🇧🇬 [bg](../../../bg/docs/architecture/cluster-decisions.md) · 🇧🇩 [bn](../../../bn/docs/architecture/cluster-decisions.md) · 🇨🇿 [cs](../../../cs/docs/architecture/cluster-decisions.md) · 🇩🇰 [da](../../../da/docs/architecture/cluster-decisions.md) · 🇩🇪 [de](../../../de/docs/architecture/cluster-decisions.md) · 🇬🇷 [el](../../../el/docs/architecture/cluster-decisions.md) · 🇪🇸 [es](../../../es/docs/architecture/cluster-decisions.md) · 🇪🇪 [et](../../../et/docs/architecture/cluster-decisions.md) · 🇮🇷 [fa](../../../fa/docs/architecture/cluster-decisions.md) · 🇫🇮 [fi](../../../fi/docs/architecture/cluster-decisions.md) · 🇫🇷 [fr](../../../fr/docs/architecture/cluster-decisions.md) · 🇮🇪 [ga](../../../ga/docs/architecture/cluster-decisions.md) · 🇮🇳 [gu](../../../gu/docs/architecture/cluster-decisions.md) · 🇳🇬 [ha](../../../ha/docs/architecture/cluster-decisions.md) · 🇮🇱 [he](../../../he/docs/architecture/cluster-decisions.md) · 🇮🇳 [hi](../../../hi/docs/architecture/cluster-decisions.md) · 🇭🇷 [hr](../../../hr/docs/architecture/cluster-decisions.md) · 🇭🇺 [hu](../../../hu/docs/architecture/cluster-decisions.md) · 🇦🇲 [hy](../../../hy/docs/architecture/cluster-decisions.md) · 🇮🇩 [id](../../../id/docs/architecture/cluster-decisions.md) · 🇳🇬 [ig](../../../ig/docs/architecture/cluster-decisions.md) · 🇮🇹 [it](../../../it/docs/architecture/cluster-decisions.md) · 🇯🇵 [ja](../../../ja/docs/architecture/cluster-decisions.md) · 🇬🇪 [ka](../../../ka/docs/architecture/cluster-decisions.md) · 🇰🇭 [km](../../../km/docs/architecture/cluster-decisions.md) · 🇮🇳 [kn](../../../kn/docs/architecture/cluster-decisions.md) · 🇰🇷 [ko](../../../ko/docs/architecture/cluster-decisions.md) · 🇱🇹 [lt](../../../lt/docs/architecture/cluster-decisions.md) · 🇱🇻 [lv](../../../lv/docs/architecture/cluster-decisions.md) · 🇮🇳 [ml](../../../ml/docs/architecture/cluster-decisions.md) · 🇮🇳 [mr](../../../mr/docs/architecture/cluster-decisions.md) · 🇲🇾 [ms](../../../ms/docs/architecture/cluster-decisions.md) · 🇲🇹 [mt](../../../mt/docs/architecture/cluster-decisions.md) · 🇲🇲 [my](../../../my/docs/architecture/cluster-decisions.md) · 🇳🇵 [ne](../../../ne/docs/architecture/cluster-decisions.md) · 🇳🇱 [nl](../../../nl/docs/architecture/cluster-decisions.md) · 🇳🇴 [no](../../../no/docs/architecture/cluster-decisions.md) · 🇮🇳 [or](../../../or/docs/architecture/cluster-decisions.md) · 🇮🇳 [pa](../../../pa/docs/architecture/cluster-decisions.md) · 🇵🇭 [phi](../../../phi/docs/architecture/cluster-decisions.md) · 🇵🇱 [pl](../../../pl/docs/architecture/cluster-decisions.md) · 🇵🇹 [pt](../../../pt/docs/architecture/cluster-decisions.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/cluster-decisions.md) · 🇷🇴 [ro](../../../ro/docs/architecture/cluster-decisions.md) · 🇷🇺 [ru](../../../ru/docs/architecture/cluster-decisions.md) · 🇱🇰 [si](../../../si/docs/architecture/cluster-decisions.md) · 🇸🇰 [sk](../../../sk/docs/architecture/cluster-decisions.md) · 🇸🇮 [sl](../../../sl/docs/architecture/cluster-decisions.md) · 🇷🇸 [sr](../../../sr/docs/architecture/cluster-decisions.md) · 🇸🇪 [sv](../../../sv/docs/architecture/cluster-decisions.md) · 🇰🇪 [sw](../../../sw/docs/architecture/cluster-decisions.md) · 🇮🇳 [ta](../../../ta/docs/architecture/cluster-decisions.md) · 🇮🇳 [te](../../../te/docs/architecture/cluster-decisions.md) · 🇹🇭 [th](../../../th/docs/architecture/cluster-decisions.md) · 🇹🇷 [tr](../../../tr/docs/architecture/cluster-decisions.md) · 🇵🇰 [ur](../../../ur/docs/architecture/cluster-decisions.md) · 🇺🇿 [uz](../../../uz/docs/architecture/cluster-decisions.md) · 🇻🇳 [vi](../../../vi/docs/architecture/cluster-decisions.md) · 🇳🇬 [yo](../../../yo/docs/architecture/cluster-decisions.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/cluster-decisions.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/cluster-decisions.md)

---

**Статус:** пропозиція (очікує на перевірку від @diegosouzapw)
**Дата:** 2026-06-20
**Посилання:** [#3932](https://github.com/diegosouzapw/OmniRoute/issues/3932), PR #4381

## Коротко

Два профілі compose, які вмикаються за бажанням (`memory`, `bifrost`), для наявного розгортання з 8 сервісів у [`docker-compose.yml`](../../docker-compose.yml). Поведінка запуску за замовчуванням **не змінюється**: 3 репліки `omniroute` + Caddy + Redis + CliproxyAPI. Два нові профілі додають Qdrant і Bifrost як необов’язкові допоміжні контейнери, що вмикаються через `docker compose --profile <name> up`. **Жоден наявний сервіс не видаляється й не замінюється.**

## Чому цей підхід є консервативним

Наявна структура розгортання OmniRoute вже є компактною та перевіреною:

- **`redis:7-alpine`** обробляє обмеження частоти запитів і кешування в промисловому масштабі.
- **SQLite + sqlite-vec + FTS5** забезпечують локальну пам’ять, векторний і текстовий пошук (див. [`src/lib/memory/vectorStore.ts:108`](../../src/lib/memory/vectorStore.ts)).
- **Caddy** уже виконує роль балансувальника навантаження та термінатора TLS ([`docker-compose.yml`](../../docker-compose.yml)).
- **Bifrost** уже інтегровано як маршрутизатор рівня 1 у [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (допоміжний проксі-контейнер з аварійним вимикачем через змінну середовища `BIFROST_ENABLED` — установіть `=0`, щоб обійти допоміжний контейнер і перейти до шляху TS).

Ці два профілі є **варіантами масштабування для розгортань, які досягли обмежень SQLite**, а не міграціями. Обидва за замовчуванням вимкнені.

## Два профілі

### `memory` — допоміжний контейнер векторної пам’яті Qdrant

**Коли варто ввімкнути:**

- > 1 млн вбудовувань на одне розгортання (sqlite-vec починає сповільнюватися під час масштабування).
- Розгортання з кількома репліками, якому потрібен спільний стан векторів для `omniroute-1/2/3`.
- У вас уже є зовнішній кластер Qdrant (Qdrant Cloud або локально розгорнутий).

**Що він додає:**

| Сервіс   | Образ                   | Порти       | Примітки                                           |
| -------- | ----------------------- | ----------- | -------------------------------------------------- |
| `qdrant` | `qdrant/qdrant:v1.12.4` | `6333` HTTP | Індекс HNSW; постійний том `omniroute_qdrant_data` |

**Активація:** установіть `qdrantEnabled = true` в інтерфейсі налаштувань **або** задайте змінну середовища `QDRANT_HOST=qdrant`. Правила пріоритету (таблиця налаштувань → змінна середовища → значення за замовчуванням) див. у [`src/lib/memory/qdrant.ts:60`](../../src/lib/memory/qdrant.ts).

**Змінні середовища:** `QDRANT_HOST`, `QDRANT_PORT`, `QDRANT_API_KEY`, `QDRANT_COLLECTION`, `QDRANT_VECTOR_SIZE`, `QDRANT_HNSW_EF_CONSTRUCT` (див. рядки 1672-1683 у `.env.example`).

### `bifrost` — допоміжний контейнер маршрутизатора Bifrost рівня 1

**Коли варто ввімкнути:**

- Ви використовуєте ≥3 репліки `omniroute` і хочете централізувати ротацію постачальників в одному процесі Go.
- Вам потрібна єдина точка аудиту та журналювання запитів до зовнішніх постачальників для всіх реплік.
- Ви хочете горизонтально масштабувати рівень маршрутизації Tier-1 незалежно від реплік OmniRoute.

**Що він додає:**

| Сервіс    | Образ                             | Порти  | Примітки                                                                            |
| --------- | --------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| `bifrost` | `ghcr.io/maximhq/bifrost:v1.6.11` | `8080` | Маршрутизатор рівня 1 на основі Go; постійний том журналів `omniroute_bifrost_logs` |

**Активація:** задайте `BIFROST_BASE_URL=http://bifrost:8080` у `.env.example`. Наявний маршрут допоміжного проксі-контейнера в [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (доданий у PR #4381) автоматично використає це значення.

**Змінні середовища:** `BIFROST_BASE_URL`, `BIFROST_API_KEY`, `BIFROST_STREAMING_ENABLED`, `BIFROST_TIMEOUT_MS` (див. рядки 1685-1695 у `.env.example`).

## Чого цей PR явно НЕ робить

В оригінальному обговоренні проблеми пропонувалося масштабніше переписування кластера. Після аудиту фактичного характеру навантаження наведені нижче компоненти **відхилено** з указаних причин:

| Компонент                            | Вердикт       | Причина                                                                                                               |
| ------------------------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------- |
| **Dragonfly**                        | **ВІДХИЛЕНО** | `redis:7-alpine` уже цілком достатньо для навантаження обмеження частоти в промисловому масштабі; межі не досягнуто.  |
| **NATS**                             | **ВІДХИЛЕНО** | Кожна репліка `omniroute` — це один процес Node.js; багатопроцесного навантаження pub/sub немає.                      |
| **PostgreSQL**                       | **ВІДХИЛЕНО** | SQLite + sqlite-vec + FTS5 охоплюють усі 3 сценарії використання; 97 міграцій і пакування Electron блокують міграцію. |
| **Neo4j**                            | **ВІДХИЛЕНО** | Маршрутизація — це об’єднання 5 таблиць; рекурсивного CTE у SQLite достатньо.                                         |
| **MinIO**                            | **ВІДХИЛЕНО** | Навантаження з багатомегабайтними блобами немає; зображення й аудіо передаються через проксі без обробки.             |
| **pgvector / pg_ai / pg_textsearch** | **ВІДХИЛЕНО** | Та сама причина щодо межі SQLite, що й для PostgreSQL; екосистема pgvector фрагментована.                             |
| **HAProxy / Envoy**                  | **ВІДХИЛЕНО** | Caddy уже виконує балансування навантаження й TLS; обидва явно відхилено як маршрутизатори Tier-1 (див. `AGENTS.md`). |

Якщо майбутній сценарій використання підтвердить потребу в одному з цих компонентів, зміни слід внести саме до цього документа.

## 4-тижневе розгортання (у разі схвалення)

1. **Тиждень 1** — Злити цей PR і перевірити профілі, що активуються за бажанням, зі стеком compose із 3 репліками.
2. **Тиждень 2** — Повністю активувати Bifrost для OpenAI/Claude/Gemini/Ollama (4 із 14+ провайдерів) через маршрут проксі-сайдкара [`src/app/api/v1/relay/chat/completions/bifrost/route.ts`](../../src/app/api/v1/relay/chat/completions/bifrost/route.ts) (керується через `BIFROST_ENABLED`, із можливістю аварійного вимкнення під час виконання).
3. **Тиждень 3** — Увімкнути профіль пам’яті Qdrant в одному тестовому розгортанні; виміряти різницю в затримці порівняно зі sqlite-vec.
4. **Тиждень 4** — Перевірки працездатності засобів спостережуваності (коди завершення `docker compose ps` + димові тести `wget`); оновлення 71 компонента згідно з ADR-041.

## Файли, змінені в цьому PR

| Файл                                                | Зміна                                                                                                                                                                                                                                                 |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docker-compose.yml`                                | +30 рядків: профіль `memory` (Qdrant), профіль `bifrost` (Bifrost), постійні томи, перевірки працездатності.                                                                                                                                          |
| `.env.example`                                      | +24 рядки: `QDRANT_*` (6 змінних), `BIFROST_*` (4 змінні).                                                                                                                                                                                            |
| `docs/reference/ENVIRONMENT.md`                     | +6 рядків у розділі 25 для змінних середовища `QDRANT_*`.                                                                                                                                                                                             |
| `src/lib/memory/qdrant.ts`                          | +33 рядки: ланцюжок резервних значень змінних середовища (налаштування → середовище → типове значення) для `QDRANT_HOST`/`QDRANT_PORT`/`QDRANT_API_KEY`/`QDRANT_COLLECTION`/`QDRANT_VECTOR_SIZE`/`QDRANT_HNSW_EF_CONSTRUCT`/`QDRANT_EMBEDDING_MODEL`. |
| `src/lib/memory/__tests__/qdrant-wiring.test.ts`    | +88 рядків: 9 нових тестових випадків, що фіксують пріоритетність резервних значень змінних середовища.                                                                                                                                               |
| `docs/architecture/cluster-decisions.md` (цей файл) | НОВИЙ — запис рішення щодо профілів, які активуються за бажанням.                                                                                                                                                                                     |
| `AGENTS.md`                                         | +1 рядок: посилання на цей документ у таблиці довідкової документації.                                                                                                                                                                                |

**Усього змінено коду:** 4 промислові файли (`docker-compose.yml`, `qdrant.ts`, `.env.example`, `ENVIRONMENT.md`), 1 тестовий файл (`qdrant-wiring.test.ts`), 2 файли документації (`cluster-decisions.md`, `AGENTS.md`).
