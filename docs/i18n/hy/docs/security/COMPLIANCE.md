# Compliance & Audit (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Ճշմարտության աղբյուր՝** `src/lib/compliance/`, `src/app/api/compliance/`
> **Վերջին թարմացումը՝** 2026-06-28 — v3.8.40

OmniRoute-ը վարչական գործողությունները, նույնականացման իրադարձությունները, մատակարարի հավատարմագրերի կենսացիկլի փոփոխությունները և MCP գործիքների կանչերը գրանցում է SQLite-ի վրա հիմնված աուդիտի աղյուսակներում։ Այս էջը նկարագրում է, թե ինչ է գրանցվում, որտեղ են պահվում տվյալները, որքան ժամանակ են դրանք պահպանվում, ինչպես կարող են API բանալիները հրաժարվել գրանցումից, և ինչպես հարցումներ կատարել տվյալների նկատմամբ։

Իրականացումը գտնվում է `src/lib/compliance/index.ts` (T-43 — «Համապատասխանության վերահսկման միջոցներ») և `src/lib/compliance/providerAudit.ts` ֆայլերում։ Աուդիտի գրանցման գործողությունները երբեք բացառություն չեն նետում․ ցանկացած ձախողման դեպքում կանչը լուռ անտեսվում է, որպեսզի աուդիտի գրանցումը չկարողանա խաթարել հարցման հիմնական հոսքը։

## Ինչ է գրանցվում

### Վարչական աուդիտի իրադարձություններ (`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })`-ի յուրաքանչյուր կանչ ստեղծում է մեկ տող։ Գործողությունների տողերը հետևում են `domain.verb` (կամ `domain.verb.outcome`) ձևանմուշին։ Կոդային բազայում հաստատված գործողությունների տեսակներն են՝

| Գործողություն                        | Աղբյուր                                 |
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

Յուրաքանչյուր գրառում պարունակում է `action`, `actor` (լռելյայն՝ `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` և `timestamp`։ Զգայուն բանալիները (`apiKey`, `accessToken`, `refreshToken`, `password`, `*token`/`*secret`/`*apikey` ձևանմուշներին համապատասխանող ցանկացած բանալի և այլն) նախքան տողի գրանցումը ռեկուրսիվ կերպով քողարկվում են՝ փոխարինվելով `"[redacted]"`-ով։

### MCP գործիքների կանչեր (`mcp_tool_audit`)

MCP գործիքի յուրաքանչյուր կանչ `open-sse/mcp-server/audit.ts`-ի միջոցով գրանցում է մեկ տող։ Սխեման (ըստ `src/lib/db/migrations/002_mcp_a2a_tables.sql`-ի)՝

| Սյունակ          | Նշումներ                                                |
| ---------------- | ------------------------------------------------------- |
| `id`             | ինքնաճող արժեք                                          |
| `tool_name`      | MCP գործիքի նույնացուցիչ                                |
| `input_hash`     | մուտքային տվյալների sha256 (բուն տվյալները չեն պահվում) |
| `output_summary` | կարճ, կրճատված ամփոփում                                 |
| `duration_ms`    | փաստացի անցած ժամանակ                                   |
| `api_key_id`     | կանչող կողմ (կարող է լինել null)                        |
| `success`        | `1` / `0`                                               |
| `error_code`     | ձախողման դեպքում՝ վերջնական սխալի կոդ                   |
| `created_at`     | ISO ժամանակային դրոշմ                                   |

### Հարցումների / օգտագործման մատյաններ

Սրանք գործառնական հեռաչափության տվյալներ են (ոչ խիստ իմաստով վարչական աուդիտ), սակայն օգտագործում են պահպանման ժամկետի կառավարման նույն շղթան՝

- `usage_history` — յուրաքանչյուր հարցման օգտագործման ամփոփ գրառում
- `call_logs` — յուրաքանչյուր հարցման ամբողջական մատյան (տողերի քանակի սահմանաչափով, տե՛ս ստորև)
- `proxy_logs` — պրոքսի երթևեկության մատյան (տողերի քանակի սահմանաչափով)
- `request_detail_logs` — հարցումների մանրամասն տվյալների հին ձևաչափի մատյան (առկայության դեպքում դեռ մաքրվում է)

## Պահեստավորման սխեմա

`audit_log`-ը առաջին օգտագործման ժամանակ ստեղծվում է ըստ անհրաժեշտության՝ `ensureAuditLogSchema()`-ի միջոցով.

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

Ինդեքսներ են ստեղծվում `timestamp`, `action`, `actor`, `resource_type`,
`status` և `request_id` սյունակների համար։ Ժառանգված տվյալների բազաներում բացակայող սյունակներն ըստ
անհրաժեշտության ավելացվում են `ALTER TABLE`-ի միջոցով։

## Պահպանման ժամկետ և մաքրում

Պահպանման երկու առանձին ժամանակահատված է կիրառվում.

| Միջավայրի փոփոխական         | Լռելյայն | Կիրառվում է                                                       |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | `call_logs`-ի տողերի քանակի սահմանափակում                         |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs`-ի տողերի քանակի սահմանափակում                        |

`cleanupExpiredLogs()`-ը կատարում է պահպանման ժամկետի ստուգումն ու մաքրումը։ Այն կանչվում է սերվերի մեկնարկի ժամանակ՝
`src/instrumentation-node.ts`-ից։ Յուրաքանչյուր գործարկում գրանցում է
`compliance.cleanup` աուդիտային իրադարձություն՝ ըստ աղյուսակի ջնջված տողերի քանակով։ Proxy/call
մատյանների կրճատումը կատարվում է խմբաքանակներով (`BATCH_SIZE = 5000`)՝ գրանցման երկարատև արգելափակումներից խուսափելու համար։

Հարցումների պատմության ձեռքով մաքրումը պահպանման ժամկետով մաքրումից առանձին է։ Request Logs
էջը կանչում է `POST /api/settings/purge-request-history`, որը ջնջում է `call_logs`,
ժառանգված `request_detail_logs`-ը և հարցումների տեղային արտեֆակտները
`${DATA_DIR}/call_logs/` հասցեից։

Լռելյայն արժեքները սահմանված են `src/lib/logEnv.ts`-ում
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`)։

## `noLog`-ով հրաժարում (յուրաքանչյուր API բանալու համար)

API բանալիները կարող են նշվել այնպես, որ դրանց միջոցով կատարվող հետագա կանչերի երթևեկությունը չգրանցվի։ Այս
դրոշը պահվում է `api_keys` աղյուսակում (`no_log INTEGER DEFAULT 0`) և կրկնօրինակվում է
հիշողության մեջ գտնվող բազմության մեջ՝ հաճախակի կատարվող որոնումների համար։

```bash
# Ստեղծել մատյանում չգրանցվող բանալի (պահանջվում է կառավարման նույնականացում)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Օժանդակ գործառույթներ (`src/lib/compliance/index.ts`).

- `setNoLog(apiKeyId, true|false)` — միացնել կամ անջատել հիշողության մեջ գտնվող գրառումը
- `isNoLog(apiKeyId)` — ստուգվում է հարցման մշակման ճանապարհին. անհրաժեշտության դեպքում կատարվում է 30 վրկ․
  քեշավորված ընթերցում `api_keys.no_log`-ից
- `NO_LOG_API_KEY_IDS` (միջավայրի փոփոխական, ստորակետերով բաժանված) — նախապես բեռնվում է հիշողության մեջ գտնվող
  բազմության մեջ գործարկման ժամանակ. օգտակար է, երբ չեք կարող անմիջապես փոխել սյունակի արժեքը

Վարչական աուդիտային իրադարձությունների վրա (մուտք, մատակարարի փոփոխություններ, MCP գործիքների կանչեր և այլն)
`noLog`-ը **չի** ազդում. անջատվում է միայն յուրաքանչյուր հարցման երթևեկության գրանցումը։

## REST API

| Վերջնակետ                   | Մեթոդ | Նկարագրություն                                         | Նույնականացում |
| --------------------------- | ----- | ------------------------------------------------------ | -------------- |
| `/api/compliance/audit-log` | `GET` | Էջավորված ադմինիստրատորի աուդիտի գրառումներ՝ զտիչներով | management     |
| `/api/mcp/audit`            | `GET` | Էջավորված MCP գործիքների աուդիտի գրառումներ            | (open-sse)     |
| `/api/mcp/audit/stats`      | `GET` | MCP աուդիտի համախմբված վիճակագրություն                 | (open-sse)     |

Այս պահին CSV արտահանման վերջնակետ չի տրամադրվում․ արտահանեք կառավարման վահանակից կամ ուղղակիորեն հարցում կատարեք
SQLite տվյալների բազային։

### Հարցումներ `/api/compliance/audit-log`-ին

Աջակցվող հարցման պարամետրերը (բոլորն ընտրովի են, իսկ տեքստային զտիչների համար բոլորն օգտագործում են
`LIKE %value%` համընկնումը)․

- `action`, `actor`, `target`, `resourceType` (կամ `resource_type`),
  `status`, `requestId` (կամ `request_id`)
- `from` / `since`, `to` / `until` — ISO ժամանակային դրոշմներ
- `limit` (լռելյայն՝ `50`, նվազագույնը՝ `1`, առավելագույնը՝ `500`)
- `offset` (լռելյայն՝ `0`, առավելագույնը՝ `10_000`)

Պատասխանը JSON զանգված է։ Էջավորման մետատվյալները վերադարձվում են վերնագրերում՝
`x-total-count`, `x-page-limit`, `x-page-offset`։

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Կառավարման վահանակ

Կառավարման վահանակը աուդիտի տվյալները հասանելի է դարձնում **`/dashboard/audit`** հասցեում
(`src/app/(dashboard)/dashboard/audit/page.tsx`)։ Էջն ունի երկու ներդիր․

- **Համապատասխանություն** (`ComplianceTab.tsx`) — ադմինիստրատորի աուդիտի իրադարձություններ՝
  `/api/compliance/audit-log`-ից։ Զտում է ըստ իրադարձության տեսակի, կարևորության աստիճանի (տեղեկատվական / նախազգուշացում
  / կրիտիկական, որոնք ածանցվում են գործողությունից և կարգավիճակից) և ամսաթվերի միջակայքի։ Կարևորության աստիճանը
  հաշվարկվում է հաճախորդի կողմում՝ գործողության և կարգավիճակի տողերից։
- **MCP** (`McpAuditTab.tsx`) — MCP գործիքների աուդիտ՝ `/api/mcp/audit`-ից՝
  գործիքի անվան և հաջողության/ձախողման զտիչներով։

Երկու ներդիրներն էլ էջավորում են՝ համապատասխանաբար `50` (համապատասխանություն) և `25` (MCP)
գրառում մեկ էջում։

## Մատակարարի հավատարմագրերի օժանդակ գործառույթներ

`src/lib/compliance/providerAudit.ts`-ը տրամադրում է տվյալների ձևավորման օժանդակ գործառույթներ, որոնք օգտագործվում են
մատակարարների կառավարման երթուղիների կողմից՝ հավատարմագրերի իրադարձություններ գրանցելիս․

- `summarizeProviderConnectionForAudit(connection)` — հեռացնում է `apiKey`,
  `accessToken`, `refreshToken`, `idToken` և
  `providerSpecificData.consoleApiKey` դաշտերը, նախքան կապի պատկերը
  `details`-ում գրելը։
- `getProviderAuditTarget(connection)` — `target` դաշտի համար կազմում է կայուն
  `"<provider>:<name|id>"` տող։
- `extractProviderWarnings(...payloads)` — մատակարարների պատասխաններում որոնում է
  քաղաքականության/անվտանգության նախազգուշացումներ (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) և
  վերադարձնում է մինչև 5 համընկնում՝ յուրաքանչյուրը կրճատելով մինչև 400 նիշ։

## Լավագույն գործելակերպեր

- PII (իրավական, բժշկական և այլն) մշակող API բանալիները նշեք `noLog: true`-ով։
- Կարգավորեք `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` արժեքները՝ ձեր
  պահպանման քաղաքականությանը համապատասխան։ Լռելյայն 7-օրյա արժեքները պահպանողական են։
- Աուդիտի աղյուսակը հարթակից դուրս արտահանեք (`sqlite3 dump`) այն հաճախականությամբ,
  որը պահանջում է ձեր համապատասխանության ծրագիրը․ ներկառուցված արխիվացում չկա։
- Հետևեք `auth.login.failed` և `auth.login.locked` դեպքերի քանակին՝ կոպիտ ուժով
  հարձակումները հայտնաբերելու համար։
- Նոր ադմինիստրատորական վերջնակետեր ավելացնելիս կանչեք `logAuditEvent({ ... })`-ը՝ կայուն
  `domain.verb.outcome` գործողության տողով, և փոխանցեք հարցման համատեքստը
  `getAuditRequestContext(request)`-ի միջոցով, որպեսզի IP-ն ու `requestId`-ն
  ինքնաբերաբար գրանցվեն։

## Տես նաև

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — անձնական նույնականացնող տվյալների (PII) քողարկում, հրահանգների ներարկում
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP գործիքների կատալոգ և հասանելիության շրջանակներ
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — միջավայրի փոփոխականների ամբողջական տեղեկատու
- Սկզբնաղբյուր՝ `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
