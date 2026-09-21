# Compliance & Audit (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Извор истине:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Последње ажурирање:** 2026-06-28 — v3.8.40

OmniRoute бележи административне радње, догађаје аутентификације, промене животног циклуса акредитива провајдера и позиве MCP алата у ревизорске табеле засноване на SQLite-у. Ова страница описује шта се бележи, где се подаци чувају, колико дуго се задржавају, како се API кључеви могу изузети и како се подаци могу упитати.

Имплементација се налази у `src/lib/compliance/index.ts` (T-43 — „Контроле усклађености“) и `src/lib/compliance/providerAudit.ts`. Уписи у ревизорски дневник никада не изазивају изузетак: при било ком неуспеху позив се прећутно занемарује како ревизорско евидентирање не би могло да прекине главни ток захтева.

## Шта се бележи

### Административни ревизорски догађаји (`audit_log`)

Сваки позив `logAuditEvent({ action, actor, target, details, ... })` производи један ред. Ниске радњи прате образац `domain.verb` (или `domain.verb.outcome`). Типови радњи потврђени у стаблу изворног кода обухватају:

| Радња                                | Извор                                   |
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

Сваки унос бележи `action`, `actor` (подразумевано `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` и `timestamp`. Осетљиви кључеви (`apiKey`, `accessToken`, `refreshToken`, `password`, све што одговара обрасцима `*token`/`*secret`/`*apikey` итд.) рекурзивно се редигују у `"[redacted]"` пре уписивања реда.

### Позиви MCP алата (`mcp_tool_audit`)

Сваки позив MCP алата уписује ред преко `open-sse/mcp-server/audit.ts`. Шема (из `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Колона           | Напомене                              |
| ---------------- | ------------------------------------- |
| `id`             | аутоматски се увећава                 |
| `tool_name`      | идентификатор MCP алата               |
| `input_hash`     | sha256 улаза (садржај се не чува)     |
| `output_summary` | кратак, скраћен резиме                |
| `duration_ms`    | протекло време                        |
| `api_key_id`     | позивалац (може бити null)            |
| `success`        | `1` / `0`                             |
| `error_code`     | коначни кôд грешке у случају неуспеха |
| `created_at`     | ISO временска ознака                  |

### Дневници захтева / коришћења

Ово су оперативни телеметријски подаци (не искључиво административна ревизија), али користе исти процес задржавања:

- `usage_history` — збирни подаци о коришћењу по захтеву
- `call_logs` — потпуни дневник по захтеву (подлеже ограничењу броја редова; погледајте испод)
- `proxy_logs` — дневник прокси саобраћаја (подлеже ограничењу броја редова)
- `request_detail_logs` — застарели детаљни дневник захтева (и даље се чисти ако постоји)

## Шема складиштења

`audit_log` се креира одложено помоћу `ensureAuditLogSchema()` при првој употреби:

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

Индекси се креирају над колонама `timestamp`, `action`, `actor`, `resource_type`,
`status` и `request_id`. Колоне које недостају у застарелим базама података додају се
по потреби помоћу `ALTER TABLE`.

## Задржавање и чишћење

Поштују се два одвојена периода задржавања:

| Променљива окружења         | Подразумевано | Примењује се на                                                   |
| --------------------------- | ------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`           | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`           | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`      | Ограничавање броја редова у `call_logs`                           |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`      | Ограничавање броја редова у `proxy_logs`                          |

`cleanupExpiredLogs()` покреће поступак задржавања. Позива се при покретању сервера
из `src/instrumentation-node.ts`. Свако покретање бележи догађај ревизије
`compliance.cleanup` са бројем избрисаних записа за сваку табелу. Скраћивање proxy/call
дневника обавља се у серијама (`BATCH_SIZE = 5000`) како би се избегла дуготрајна закључавања уписа.

Ручно чишћење историје захтева одвојено је од задржавања. Страница дневника захтева
позива `POST /api/settings/purge-request-history`, који брише `call_logs`,
застарели `request_detail_logs` и локалне артефакте захтева у
`${DATA_DIR}/call_logs/`.

Подразумеване вредности су дефинисане у `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` изузимање (по API кључу)

API кључеви могу бити означени тако да се саобраћај њихових даљих позива не бележи.
Ознака се налази у табели `api_keys` (`no_log INTEGER DEFAULT 0`) и пресликава се
у скуп у меморији ради брзих провера на критичној путањи.

```bash
# Креирање кључа без бележења (неопходна је администраторска аутентификација)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Помоћне функције (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — укључује или искључује унос у меморији
- `isNoLog(apiKeyId)` — проверава се на путањи захтева; ако је потребно, користи
  кеширано читање из `api_keys.no_log` са трајањем од 30 s
- `NO_LOG_API_KEY_IDS` (променљива окружења, вредности раздвојене зарезима) — унапред се учитава у скуп у меморији
  при покретању; корисно када не можете директно да мењате колону

На административне догађаје ревизије (пријављивање, промене добављача, позиви MCP алата итд.)
**не** утиче `noLog` — изузима се само бележење саобраћаја појединачних захтева.

## REST API

| Крајња тачка                | Метод | Опис                                                               | Аутентификација |
| --------------------------- | ----- | ------------------------------------------------------------------ | --------------- |
| `/api/compliance/audit-log` | `GET` | Страничени уноси администраторске евиденције ревизије са филтерима | management      |
| `/api/mcp/audit`            | `GET` | Страничени уноси MCP евиденције ревизије алатки                    | (open-sse)      |
| `/api/mcp/audit/stats`      | `GET` | Агрегирана статистика MCP ревизије                                 | (open-sse)      |

Тренутно се не испоручује крајња тачка за CSV извоз — извезите податке са контролне табле или директно упитајте
SQLite базу података.

### Упити ка `/api/compliance/audit-log`

Подржани параметри упита (сви су опциони, а сви текстуални филтери користе
подударање `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (или `resource_type`),
  `status`, `requestId` (или `request_id`)
- `from` / `since`, `to` / `until` — ISO временске ознаке
- `limit` (подразумевано `50`, минимум `1`, максимум `500`)
- `offset` (подразумевано `0`, максимум `10_000`)

Одговор је JSON низ. Метаподаци о страничењу враћају се у заглављима:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Контролна табла

Контролна табла приказује податке ревизије на **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Страница има две картице:

- **Усклађеност** (`ComplianceTab.tsx`) — догађаји администраторске ревизије из
  `/api/compliance/audit-log`. Филтрирање према типу догађаја, озбиљности (info / warning
  / critical, изведено из радње и статуса) и опсегу датума. Озбиљност се
  израчунава на клијентској страни на основу ниски радње/статуса.
- **MCP** (`McpAuditTab.tsx`) — MCP ревизија алатки из `/api/mcp/audit`, са
  филтерима према називу алатке и успеху/неуспеху.

Обе картице користе страничење са величинама странице од `50` (усклађеност) и `25` (MCP).

## Помоћне функције за акредитиве добављача

`src/lib/compliance/providerAudit.ts` обезбеђује помоћне функције за обликовање које користе
руте за управљање добављачима када емитују догађаје у вези са акредитивима:

- `summarizeProviderConnectionForAudit(connection)` — уклања `apiKey`,
  `accessToken`, `refreshToken`, `idToken` и
  `providerSpecificData.consoleApiKey` пре него што се снимак стања везе
  упише у `details`.
- `getProviderAuditTarget(connection)` — саставља стабилну ниску
  `"<provider>:<name|id>"` за поље `target`.
- `extractProviderWarnings(...payloads)` — претражује одговоре добављача у потрази за
  упозорењима о смерницама/безбедности (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) и
  приказује до 5 погодака, од којих је сваки скраћен на 400 знакова.

## Најбоље праксе

- Означите API кључеве који обрађују личне податке (правне, медицинске итд.) са `noLog: true`.
- Подесите `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` тако да одговарају вашим
  правилима чувања података. Подразумевани период од 7 дана је конзервативан.
- Извозите табелу ревизије ван платформе (`sqlite3 dump`) учесталошћу коју
  захтева ваш програм усклађености — уграђено архивирање не постоји.
- Пратите број догађаја `auth.login.failed` и `auth.login.locked` ради откривања
  напада грубом силом.
- При додавању нових администраторских крајњих тачака, позовите `logAuditEvent({ ... })` са стабилном
  ниском радње `domain.verb.outcome` и проследите контекст захтева преко
  `getAuditRequestContext(request)` како би се IP адреса и `requestId` аутоматски
  забележили.

## Погледајте и

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — маскирање личних података, убацивање злонамерних инструкција у упит
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — каталог MCP алата и опсези
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — комплетна референца променљивих окружења
- Извор: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
