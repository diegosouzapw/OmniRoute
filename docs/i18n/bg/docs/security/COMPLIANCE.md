# Compliance & Audit (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Източник на достоверна информация:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Последна актуализация:** 2026-06-28 — v3.8.40

OmniRoute записва административни действия, събития за удостоверяване, промени в жизнения цикъл на идентификационните данни за доставчици и извиквания на MCP инструменти в таблици за одит, базирани на SQLite. Тази страница описва какво се регистрира, къде се съхранява, колко дълго се пази, как API ключовете могат да изключат регистрирането и как да се правят заявки към данните.

Реализацията се намира в `src/lib/compliance/index.ts` (T-43 — „Контроли за съответствие“) и `src/lib/compliance/providerAudit.ts`. Операциите за запис на одитни данни никога не предизвикват изключения: при всяка грешка извикването се игнорира без известяване, така че одитното регистриране да не може да наруши основния поток на заявката.

## Какво се регистрира

### Административни одитни събития (`audit_log`)

Всяко извикване на `logAuditEvent({ action, actor, target, details, ... })` създава един ред. Низовете за действия следват шаблон `domain.verb` (или `domain.verb.outcome`). Потвърдените в кодовото дърво типове действия включват:

| Действие                             | Източник                                |
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

Всеки запис съдържа `action`, `actor` (по подразбиране `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` и `timestamp`. Чувствителните ключове (`apiKey`, `accessToken`, `refreshToken`, `password`, всичко, съответстващо на `*token`/`*secret`/`*apikey` и т.н.) се редактират рекурсивно до `"[redacted]"`, преди редът да бъде записан.

### Извиквания на MCP инструменти (`mcp_tool_audit`)

Всяко извикване на MCP инструмент записва ред чрез `open-sse/mcp-server/audit.ts`. Схема (от `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Колона           | Бележки                                         |
| ---------------- | ----------------------------------------------- |
| `id`             | автоматично увеличаване                         |
| `tool_name`      | идентификатор на MCP инструмент                 |
| `input_hash`     | sha256 на входа (не се съхранява полезен товар) |
| `output_summary` | кратко, съкратено обобщение                     |
| `duration_ms`    | изминало реално време                           |
| `api_key_id`     | извикваща страна (може да е null)               |
| `success`        | `1` / `0`                                       |
| `error_code`     | краен код на грешка при неуспех                 |
| `created_at`     | ISO времеви печат                               |

### Регистри на заявки / използване

Това са оперативни телеметрични данни (не строго административен одит), но използват същия процес за съхранение:

- `usage_history` — обобщена информация за използването за всяка заявка
- `call_logs` — пълен регистър за всяка заявка (ограничен до максимален брой редове, вижте по-долу)
- `proxy_logs` — регистър на прокси трафика (ограничен до максимален брой редове)
- `request_detail_logs` — наследен подробен регистър на заявките (все още се прочиства, ако съществува)

## Схема за съхранение

`audit_log` се създава отложено от `ensureAuditLogSchema()` при първата употреба:

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

Създават се индекси върху `timestamp`, `action`, `actor`, `resource_type`,
`status` и `request_id`. Липсващите колони в наследени бази данни се добавят
при необходимост чрез `ALTER TABLE`.

## Съхранение и почистване

Поддържат се два отделни периода за съхранение:

| Променлива на средата       | По подразбиране | Прилага се за                                                     |
| --------------------------- | --------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`             | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`             | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`        | Ограничаване на броя редове в `call_logs`                         |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`        | Ограничаване на броя редове в `proxy_logs`                        |

`cleanupExpiredLogs()` изпълнява процеса по прилагане на периодите за
съхранение. Той се извиква при стартиране на сървъра от
`src/instrumentation-node.ts`. Всяко изпълнение записва одитно събитие
`compliance.cleanup` с броя на изтритите записи за всяка таблица. Съкращаването
на журналите за прокси сървъра и извикванията се извършва на партиди
(`BATCH_SIZE = 5000`), за да се избегнат продължителни заключвания при запис.

Ръчното почистване на хронологията на заявките е отделно от процеса за
съхранение. Страницата „Журнали на заявките“ извиква
`POST /api/settings/purge-request-history`, което изтрива `call_logs`,
наследените `request_detail_logs` и локалните артефакти на заявките в
`${DATA_DIR}/call_logs/`.

Стойностите по подразбиране са дефинирани в `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Отказ от регистриране чрез `noLog` (за всеки API ключ)

API ключовете могат да бъдат маркирани така, че трафикът от последващите им
извиквания да не се регистрира. Флагът се съхранява в таблицата `api_keys`
(`no_log INTEGER DEFAULT 0`) и се дублира в набор в паметта за бързи проверки.

```bash
# Създаване на ключ без регистриране (изисква се удостоверяване за управление)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Помощни функции (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — включва или изключва записа в паметта
- `isNoLog(apiKeyId)` — проверява се по пътя на заявката; при липса на резултат
  се използва кеширано за 30 s прочитане от `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (променлива на средата, стойности, разделени със запетаи)
  — предварително се зарежда в набора в паметта при стартиране; полезно е,
  когато не можете директно да промените колоната

Административните одитни събития (влизане, промени на доставчици, извиквания
на MCP инструменти и т.н.) **не** се влияят от `noLog` — отказът се отнася
само за регистрирането на трафика от отделните заявки.

## REST API

| Крайна точка                | Метод | Описание                                               | Удостоверяване |
| --------------------------- | ----- | ------------------------------------------------------ | -------------- |
| `/api/compliance/audit-log` | `GET` | Страницирани записи от администраторския одит с филтри | management     |
| `/api/mcp/audit`            | `GET` | Страницирани записи от одита на MCP инструменти        | (open-sse)     |
| `/api/mcp/audit/stats`      | `GET` | Обобщена статистика от MCP одита                       | (open-sse)     |

Понастоящем не се предоставя крайна точка за експортиране в CSV — експортирайте от таблото за управление или изпълнете заявка директно към базата данни SQLite.

### Заявки към `/api/compliance/audit-log`

Поддържани параметри на заявката (всички са незадължителни, а всички текстови филтри използват съпоставяне чрез `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (или `resource_type`),
  `status`, `requestId` (или `request_id`)
- `from` / `since`, `to` / `until` — времеви маркери по ISO
- `limit` (по подразбиране `50`, минимум `1`, максимум `500`)
- `offset` (по подразбиране `0`, максимум `10_000`)

Отговорът е JSON масив. Метаданните за страницирането се връщат в заглавките:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Табло за управление

Таблото за управление показва данните от одита на **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Страницата има два раздела:

- **Съответствие** (`ComplianceTab.tsx`) — събития от администраторския одит от
  `/api/compliance/audit-log`. Филтриране по тип на събитието, сериозност (информационно / предупреждение
  / критично, извлечена от действието + състоянието) и период от време. Сериозността се
  изчислява от клиентската страна въз основа на низовете за действие/състояние.
- **MCP** (`McpAuditTab.tsx`) — одит на MCP инструменти от `/api/mcp/audit` с
  филтриране по име на инструмента и успех/неуспех.

И двата раздела използват странициране с размер на страницата `50` (съответствие) и `25` (MCP).

## Помощни функции за идентификационни данни на доставчици

`src/lib/compliance/providerAudit.ts` предоставя помощни функции за структуриране, използвани от маршрутите за управление на доставчици, когато генерират събития за идентификационни данни:

- `summarizeProviderConnectionForAudit(connection)` — премахва `apiKey`,
  `accessToken`, `refreshToken`, `idToken` и
  `providerSpecificData.consoleApiKey`, преди моментното състояние на връзката да бъде
  записано в `details`.
- `getProviderAuditTarget(connection)` — съставя стабилен низ
  `"<provider>:<name|id>"` за полето `target`.
- `extractProviderWarnings(...payloads)` — сканира отговорите на доставчика за
  предупреждения относно правила/безопасност (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) и
  извежда до 5 съвпадения, всяко съкратено до 400 знака.

## Добри практики

- Маркирайте API ключовете, обработващи лични данни (правни, медицински и др.), с `noLog: true`.
- Настройте `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` така, че да отговарят на вашата
  политика за съхранение. Стойностите по подразбиране от 7 дни са консервативни.
- Експортирайте таблицата за одит извън платформата (`sqlite3 dump`) с честота,
  изисквана от вашата програма за съответствие — няма вградено архивиране.
- Следете броя на `auth.login.failed` и `auth.login.locked` за откриване на
  атаки с изчерпателно търсене.
- Когато добавяте нови администраторски крайни точки, извиквайте `logAuditEvent({ ... })` със стабилен
  низ за действие във формат `domain.verb.outcome` и предавайте контекста на заявката чрез
  `getAuditRequestContext(request)`, така че IP адресът и `requestId` да бъдат регистрирани
  автоматично.

## Вижте също

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — маскиране на лични данни (PII), инжектиране на подкани
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — каталог и обхвати на MCP инструментите
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — пълна справка за променливите на средата
- Изходен код: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
