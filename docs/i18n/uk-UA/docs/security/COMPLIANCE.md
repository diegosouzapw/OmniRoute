# Compliance & Audit (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Джерело істини:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Останнє оновлення:** 2026-06-28 — v3.8.40

OmniRoute записує адміністративні дії, події автентифікації, зміни життєвого циклу облікових даних провайдерів і виклики інструментів MCP до таблиць аудиту на базі SQLite. На цій сторінці описано, що журналюється, де зберігаються дані, як довго вони зберігаються, як API-ключі можуть відмовитися від журналювання та як виконувати запити до цих даних.

Реалізація міститься в `src/lib/compliance/index.ts` (T-43 — «Засоби контролю відповідності») і `src/lib/compliance/providerAudit.ts`. Операції запису аудиту ніколи не генерують винятків: у разі будь-якої помилки виклик мовчки ігнорується, щоб журналювання аудиту не могло порушити основний потік обробки запиту.

## Що журналюється

### Події адміністративного аудиту (`audit_log`)

Кожен виклик `logAuditEvent({ action, actor, target, details, ... })` створює один рядок. Рядки дій відповідають шаблону `domain.verb` (або `domain.verb.outcome`). Підтверджені типи дій у кодовій базі:

| Дія                                  | Джерело                                 |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

Кожен запис містить `action`, `actor` (типове значення — `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` і `timestamp`. Конфіденційні ключі (`apiKey`, `accessToken`, `refreshToken`, `password`, усе, що відповідає шаблонам `*token`/`*secret`/`*apikey` тощо) перед записом рядка рекурсивно редагуються до `"[redacted]"`.

### Виклики інструментів MCP (`mcp_tool_audit`)

Кожен виклик інструмента MCP записує рядок через `open-sse/mcp-server/audit.ts`. Схема (із `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Стовпець         | Примітки                                                    |
| ---------------- | ----------------------------------------------------------- |
| `id`             | автоматичне збільшення                                      |
| `tool_name`      | ідентифікатор інструмента MCP                               |
| `input_hash`     | sha256 вхідних даних (корисне навантаження не зберігається) |
| `output_summary` | короткий, усічений підсумок                                 |
| `duration_ms`    | фактичний час виконання                                     |
| `api_key_id`     | сторона, що викликала інструмент (може бути null)           |
| `success`        | `1` / `0`                                                   |
| `error_code`     | кінцевий код помилки в разі невдачі                         |
| `created_at`     | часова позначка ISO                                         |

### Журнали запитів / використання

Це операційна телеметрія (не суто адміністративний аудит), але для неї використовується той самий конвеєр зберігання:

- `usage_history` — агреговані дані про використання для кожного запиту
- `call_logs` — повний журнал кожного запиту (з обмеженням кількості рядків, див. нижче)
- `proxy_logs` — журнал проксі-трафіку (з обмеженням кількості рядків)
- `request_detail_logs` — застарілий докладний журнал запитів (також очищається, якщо існує)

## Схема зберігання

`audit_log` створюється відкладено функцією `ensureAuditLogSchema()` під час першого використання:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Індекси створюються для `timestamp`, `action`, `actor`, `resource_type`,
`status` і `request_id`. Відсутні стовпці в застарілих БД додаються за допомогою
`ALTER TABLE` за потреби.

## Зберігання та очищення

Підтримуються два окремі періоди зберігання:

| Змінна середовища           | Значення за замовчуванням | Застосовується до                                                 |
| --------------------------- | ------------------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`                       | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`                       | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`                  | Обрізання `call_logs` за максимальною кількістю рядків            |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`                  | Обрізання `proxy_logs` за максимальною кількістю рядків           |

`cleanupExpiredLogs()` запускає процес очищення відповідно до періодів зберігання. Вона викликається під час запуску сервера
з `src/instrumentation-node.ts`. Кожен запуск реєструє подію аудиту
`compliance.cleanup` із кількістю видалених записів для кожної таблиці. Обрізання журналів проксі та викликів
виконується пакетами (`BATCH_SIZE = 5000`), щоб уникнути тривалих блокувань запису.

Ручне очищення історії запитів виконується окремо від очищення за періодом зберігання. Сторінка журналів запитів
викликає `POST /api/settings/purge-request-history`, який видаляє `call_logs`,
застарілі `request_detail_logs` і локальні артефакти запитів у
`${DATA_DIR}/call_logs/`.

Значення за замовчуванням визначені в `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Відмова від журналювання через `noLog` (для окремого API-ключа)

API-ключі можна позначити так, щоб трафік їхніх подальших викликів не журналювався. Цей
прапорець зберігається в таблиці `api_keys` (`no_log INTEGER DEFAULT 0`) і дублюється
в наборі в пам’яті для швидкого пошуку.

```bash
# Створити ключ без журналювання (потрібна авторизація керування)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Допоміжні функції (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — перемикає запис у пам’яті
- `isNoLog(apiKeyId)` — перевіряється під час обробки запиту; якщо запис відсутній, виконується
  кешоване на 30 с читання з `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (змінна середовища, значення розділені комами) — попередньо завантажується в набір у пам’яті
  під час запуску; корисно, коли неможливо безпосередньо змінити стовпець

Події адміністративного аудиту (вхід, зміни постачальників, виклики інструментів MCP тощо)
**не** залежать від `noLog` — вимикається лише журналювання трафіку окремих запитів.

## REST API

| Кінцева точка               | Метод | Опис                                                  | Авторизація |
| --------------------------- | ----- | ----------------------------------------------------- | ----------- |
| `/api/compliance/audit-log` | `GET` | Пагіновані записи аудиту адміністраторів із фільтрами | management  |
| `/api/mcp/audit`            | `GET` | Пагіновані записи аудиту інструментів MCP             | (open-sse)  |
| `/api/mcp/audit/stats`      | `GET` | Агрегована статистика аудиту MCP                      | (open-sse)  |

Наразі кінцева точка для експорту CSV не постачається — експортуйте дані з панелі керування або безпосередньо запитуйте
базу даних SQLite.

### Запити до `/api/compliance/audit-log`

Підтримувані параметри запиту (усі необов’язкові; усі текстові фільтри
використовують зіставлення `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (або `resource_type`),
  `status`, `requestId` (або `request_id`)
- `from` / `since`, `to` / `until` — часові позначки ISO
- `limit` (за замовчуванням `50`, мін. `1`, макс. `500`)
- `offset` (за замовчуванням `0`, макс. `10_000`)

Відповідь є масивом JSON. Метадані пагінації повертаються в заголовках:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Панель керування

Панель керування надає доступ до даних аудиту за адресою **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Сторінка має дві вкладки:

- **Відповідність вимогам** (`ComplianceTab.tsx`) — події аудиту адміністраторів із
  `/api/compliance/audit-log`. Фільтрування за типом події, рівнем серйозності (інформаційний / попередження
  / критичний, визначається на основі дії та статусу) і діапазоном дат. Рівень серйозності
  обчислюється на стороні клієнта з рядків дії та статусу.
- **MCP** (`McpAuditTab.tsx`) — аудит інструментів MCP із `/api/mcp/audit` із
  фільтрами за назвою інструмента та успіхом/невдачею.

Обидві вкладки використовують пагінацію з розмірами сторінки `50` (відповідність вимогам) і `25` (MCP).

## Допоміжні функції облікових даних постачальника

`src/lib/compliance/providerAudit.ts` надає допоміжні функції формування даних, які використовуються маршрутами
керування постачальниками під час створення подій облікових даних:

- `summarizeProviderConnectionForAudit(connection)` — вилучає `apiKey`,
  `accessToken`, `refreshToken`, `idToken` і
  `providerSpecificData.consoleApiKey` перед записом знімка підключення в
  `details`.
- `getProviderAuditTarget(connection)` — формує стабільний рядок
  `"<provider>:<name|id>"` для поля `target`.
- `extractProviderWarnings(...payloads)` — перевіряє відповіді постачальника на
  попередження щодо політик/безпеки (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) і
  повертає до 5 збігів, кожен з яких обрізається до 400 символів.

## Найкращі практики

- Позначайте API-ключі, що обробляють персональні дані (юридичні, медичні тощо), параметром `noLog: true`.
- Налаштуйте `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` відповідно до вашої
  політики зберігання. Стандартні значення в 7 днів є консервативними.
- Експортуйте таблицю аудиту за межі платформи (`sqlite3 dump`) з періодичністю,
  якої вимагає ваша програма відповідності вимогам, — вбудованого архівування немає.
- Відстежуйте кількість подій `auth.login.failed` і `auth.login.locked` для виявлення
  атак методом повного перебору.
- Додаючи нові адміністративні кінцеві точки, викликайте `logAuditEvent({ ... })` зі стабільним
  рядком дії `domain.verb.outcome` і передавайте контекст запиту через
  `getAuditRequestContext(request)`, щоб IP-адреса та `requestId` фіксувалися
  автоматично.

## Див. також

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — маскування персональних даних, ін’єкція підказок
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — каталог інструментів MCP та області дії
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — повний довідник змінних середовища
- Вихідний код: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
