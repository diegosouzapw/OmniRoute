# Compliance & Audit (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **სიმართლის პირველწყარო:** `src/lib/compliance/`, `src/app/api/compliance/`
> **ბოლო განახლება:** 2026-06-28 — v3.8.40

OmniRoute ადმინისტრაციულ მოქმედებებს, ავთენტიფიკაციის მოვლენებს, პროვაიდერის
ავტორიზაციის მონაცემების სასიცოცხლო ციკლის ცვლილებებსა და MCP ხელსაწყოების გამოძახებებს SQLite-ზე დაფუძნებულ აუდიტის
ცხრილებში აღრიცხავს. ამ გვერდზე აღწერილია, რა აღირიცხება, სად ინახება, რამდენ ხანს
ნარჩუნდება, როგორ შეუძლიათ API გასაღებებს აღრიცხვაზე უარის თქმა და როგორ უნდა გამოითხოვოთ მონაცემები.

იმპლემენტაცია განთავსებულია `src/lib/compliance/index.ts`-ში (T-43 — „შესაბამისობის
კონტროლის მექანიზმები“) და `src/lib/compliance/providerAudit.ts`-ში. აუდიტის ჩანაწერის ოპერაციები არასოდეს წარმოქმნის გამონაკლისს:
ნებისმიერი შეცდომის შემთხვევაში გამოძახება უხმაუროდ იგნორირდება, რათა აუდიტის აღრიცხვამ ვერ შეაფერხოს
მოთხოვნის ძირითადი ნაკადი.

## რა აღირიცხება

### ადმინისტრაციული აუდიტის მოვლენები (`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })`-ის ყოველი გამოძახება ქმნის
ერთ სტრიქონს. მოქმედებების სტრიქონები მიჰყვება `domain.verb` (ან `domain.verb.outcome`)
ნიმუშს. კოდის ხეში დადასტურებული მოქმედებების ტიპებია:

| მოქმედება                            | წყარო                                   |
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

თითოეული ჩანაწერი მოიცავს `action`-ს, `actor`-ს (ნაგულისხმევი მნიშვნელობაა `"system"`), `target`-ს,
`details`/`metadata`-ს (JSON), `ip_address`-ს, `resource_type`-ს, `status`-ს,
`request_id`-სა და `timestamp`-ს. სენსიტიური გასაღებები (`apiKey`, `accessToken`,
`refreshToken`, `password`, აგრეთვე ყველაფერი, რაც ემთხვევა `*token`/`*secret`/`*apikey`-ს
და ა.შ.) სტრიქონის ჩაწერამდე რეკურსიულად ჩანაცვლდება `"[redacted]"`-ით.

### MCP ხელსაწყოების გამოძახებები (`mcp_tool_audit`)

MCP ხელსაწყოს ყოველი გამოძახება სტრიქონს
`open-sse/mcp-server/audit.ts`-ის მეშვეობით წერს. სქემა
(`src/lib/db/migrations/002_mcp_a2a_tables.sql`-დან):

| სვეტი            | შენიშვნები                             |
| ---------------- | -------------------------------------- |
| `id`             | ავტომატურად მზარდი მნიშვნელობა         |
| `tool_name`      | MCP ხელსაწყოს იდენტიფიკატორი           |
| `input_hash`     | შეყვანის sha256 (დატვირთვა არ ინახება) |
| `output_summary` | მოკლე, შეკვეცილი შეჯამება              |
| `duration_ms`    | გასული სრული დრო                       |
| `api_key_id`     | გამომძახებელი (შეიძლება იყოს null)     |
| `success`        | `1` / `0`                              |
| `error_code`     | წარუმატებლობისას საბოლოო შეცდომის კოდი |
| `created_at`     | ISO დროის ნიშნული                      |

### მოთხოვნების / გამოყენების ჟურნალები

ეს ოპერაციული ტელემეტრიაა (და არა მკაცრი გაგებით ადმინისტრაციული აუდიტი), თუმცა ის იმავე
შენახვის ვადის მართვის პროცესს იყენებს:

- `usage_history` — გამოყენების გაერთიანებული მონაცემები თითოეული მოთხოვნისთვის
- `call_logs` — სრული ჟურნალი თითოეული მოთხოვნისთვის (ექვემდებარება სტრიქონების რაოდენობის ზღვარს, იხილეთ ქვემოთ)
- `proxy_logs` — პროქსი-ტრაფიკის ჟურნალი (ექვემდებარება სტრიქონების რაოდენობის ზღვარს)
- `request_detail_logs` — მოთხოვნების მოძველებული დეტალური ჟურნალი (არსებობის შემთხვევაში კვლავ იწმინდება)

## შენახვის სქემა

`audit_log` იქმნება გადავადებულად, პირველი გამოყენებისას `ensureAuditLogSchema()`-ის მიერ:

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

ინდექსები იქმნება `timestamp`, `action`, `actor`, `resource_type`,
`status` და `request_id` სვეტებისთვის. ძველ მონაცემთა ბაზებში არარსებული სვეტები
საჭიროებისამებრ ემატება `ALTER TABLE`-ის მეშვეობით.

## შენახვის ვადები და გასუფთავება

მოქმედებს შენახვის ორი განცალკევებული პერიოდი:

| გარემოს ცვლადი              | ნაგულისხმევი მნიშვნელობა | ვრცელდება შემდეგზე                                                |
| --------------------------- | ------------------------ | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`                      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`                      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`                 | `call_logs`-ისთვის მწკრივების მაქსიმალური რაოდენობის შეზღუდვა     |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`                 | `proxy_logs`-ისთვის მწკრივების მაქსიმალური რაოდენობის შეზღუდვა    |

`cleanupExpiredLogs()` ასრულებს შენახვის ვადების შემოწმებას. ის სერვერის გაშვებისას
გამოიძახება `src/instrumentation-node.ts`-იდან. ყოველი გაშვება აღრიცხავს
`compliance.cleanup` აუდიტის მოვლენას, თითოეული ცხრილიდან წაშლილი ჩანაწერების რაოდენობით. Proxy/call
ჟურნალების შემცირება პაკეტებად სრულდება (`BATCH_SIZE = 5000`), რათა თავიდან იქნეს აცილებული ჩაწერის ხანგრძლივი ბლოკირებები.

მოთხოვნების ისტორიის ხელით გასუფთავება შენახვის ვადების მექანიზმისგან განცალკევებულია. Request Logs
გვერდი იძახებს `POST /api/settings/purge-request-history`-ს, რომელიც შლის `call_logs`-ს,
ძველ `request_detail_logs`-ს და მოთხოვნის ლოკალურ არტეფაქტებს
`${DATA_DIR}/call_logs/`-ის ქვეშ.

ნაგულისხმევი მნიშვნელობები განსაზღვრულია `src/lib/logEnv.ts`-ში
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog`-ით უარის თქმა (თითოეული API გასაღებისთვის)

API გასაღებებს შეიძლება მიენიჭოს ნიშანი, რათა მათი ქვედა დონის გამოძახებების ტრაფიკი ჟურნალში არ აღირიცხოს.
ნიშანი ინახება `api_keys` ცხრილში (`no_log INTEGER DEFAULT 0`) და სწრაფი წვდომისთვის
ასახულია მეხსიერებაში არსებულ სიმრავლეში.

```bash
# ჟურნალში აღურიცხავი გასაღების შექმნა (საჭიროა მართვის ავტორიზაცია)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

დამხმარე ფუნქციები (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — მეხსიერებაში არსებული ჩანაწერის ჩართვა ან გამორთვა
- `isNoLog(apiKeyId)` — მოწმდება მოთხოვნის დამუშავებისას; საჭიროების შემთხვევაში იყენებს 30-წამიან
  კეშირებულ წაკითხვას `api_keys.no_log`-დან
- `NO_LOG_API_KEY_IDS` (გარემოს ცვლადი, მძიმით გამოყოფილი მნიშვნელობებით) — გაშვებისას წინასწარ იტვირთება მეხსიერებაში არსებულ
  სიმრავლეში; სასარგებლოა, როდესაც სვეტის მნიშვნელობის პირდაპირ შეცვლა შეუძლებელია

ადმინისტრაციულ აუდიტის მოვლენებზე (სისტემაში შესვლა, პროვაიდერის ცვლილებები, MCP ხელსაწყოს გამოძახებები და ა.შ.)
`noLog` **არ** მოქმედებს — უარის თქმა ეხება მხოლოდ თითოეული მოთხოვნის ტრაფიკის
ჟურნალში აღრიცხვას.

## REST API

| საბოლოო წერტილი             | მეთოდი | აღწერა                                                          | ავტორიზაცია |
| --------------------------- | ------ | --------------------------------------------------------------- | ----------- |
| `/api/compliance/audit-log` | `GET`  | ადმინისტრატორის აუდიტის გვერდებად დაყოფილი ჩანაწერები ფილტრებით | მართვა      |
| `/api/mcp/audit`            | `GET`  | MCP ხელსაწყოების აუდიტის გვერდებად დაყოფილი ჩანაწერები          | (open-sse)  |
| `/api/mcp/audit/stats`      | `GET`  | MCP აუდიტის აგრეგირებული სტატისტიკა                             | (open-sse)  |

ამჟამად CSV ექსპორტის საბოლოო წერტილი არ არის მოწოდებული — მონაცემები გაიტანეთ მართვის პანელიდან ან უშუალოდ მიმართეთ
SQLite მონაცემთა ბაზას.

### `/api/compliance/audit-log`-ის მოთხოვნა

მხარდაჭერილი მოთხოვნის პარამეტრები (ყველა არასავალდებულოა, ტექსტური ფილტრებისთვის ყველა იყენებს
`LIKE %value%` შესაბამისობას):

- `action`, `actor`, `target`, `resourceType` (ან `resource_type`),
  `status`, `requestId` (ან `request_id`)
- `from` / `since`, `to` / `until` — ISO დროის ნიშნულები
- `limit` (ნაგულისხმევი `50`, მინ. `1`, მაქს. `500`)
- `offset` (ნაგულისხმევი `0`, მაქს. `10_000`)

პასუხი JSON მასივია. გვერდებად დაყოფის მეტამონაცემები ბრუნდება სათაურებში:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## მართვის პანელი

მართვის პანელში აუდიტის მონაცემები ხელმისაწვდომია მისამართზე **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). გვერდს ორი ჩანართი აქვს:

- **შესაბამისობა** (`ComplianceTab.tsx`) — ადმინისტრატორის აუდიტის მოვლენები
  `/api/compliance/audit-log`-იდან. ფილტრაცია მოვლენის ტიპის, სიმძიმის (ინფორმაციული / გაფრთხილება
  / კრიტიკული, მიღებული მოქმედებიდან + სტატუსიდან) და თარიღის დიაპაზონის მიხედვით. სიმძიმე
  კლიენტის მხარეს გამოითვლება მოქმედებისა და სტატუსის სტრიქონებიდან.
- **MCP** (`McpAuditTab.tsx`) — MCP ხელსაწყოების აუდიტი `/api/mcp/audit`-იდან,
  ხელსაწყოს სახელისა და წარმატების/წარუმატებლობის მიხედვით ფილტრებით.

ორივე ჩანართი იყენებს გვერდებად დაყოფას გვერდის ზომებით `50` (შესაბამისობა) და `25` (MCP).

## პროვაიდერის ავტორიზაციის მონაცემების დამხმარე ფუნქციები

`src/lib/compliance/providerAudit.ts` შეიცავს ფორმირების დამხმარე ფუნქციებს, რომლებსაც
პროვაიდერის მართვის მარშრუტები იყენებენ ავტორიზაციის მონაცემების მოვლენების შექმნისას:

- `summarizeProviderConnectionForAudit(connection)` — კავშირის ანაბეჭდის
  `details`-ში ჩაწერამდე შლის `apiKey`-ს, `accessToken`-ს, `refreshToken`-ს, `idToken`-სა და
  `providerSpecificData.consoleApiKey`-ს.
- `getProviderAuditTarget(connection)` — `target` ველისთვის ადგენს სტაბილურ
  `"<provider>:<name|id>"` სტრიქონს.
- `extractProviderWarnings(...payloads)` — პროვაიდერის პასუხებში ეძებს
  პოლიტიკის/უსაფრთხოების გაფრთხილებებს (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) და
  ზედაპირზე გამოაქვს მაქსიმუმ 5 დამთხვევა, თითოეული 400 სიმბოლომდე შემოკლებული.

## საუკეთესო პრაქტიკები

- PII-ს (იურიდიული, სამედიცინო და სხვ.) დამუშავების მქონე API გასაღებები მონიშნეთ `noLog: true`-ით.
- თქვენი შენახვის პოლიტიკის დასაკმაყოფილებლად მოარგეთ `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS`.
  ნაგულისხმევი 7-დღიანი პერიოდი კონსერვატიულია.
- აუდიტის ცხრილი პლატფორმის გარეთ გაიტანეთ (`sqlite3 dump`) იმ სიხშირით,
  რომელსაც თქვენი შესაბამისობის პროგრამა მოითხოვს — ჩაშენებული არქივირება არ არსებობს.
- უხეში ძალის მეთოდით შეტევების აღმოსაჩენად თვალყური ადევნეთ `auth.login.failed`-ისა და
  `auth.login.locked`-ის რაოდენობებს.
- ადმინისტრატორის ახალი საბოლოო წერტილების დამატებისას გამოიძახეთ `logAuditEvent({ ... })` სტაბილური
  `domain.verb.outcome` მოქმედების სტრიქონით და მოთხოვნის კონტექსტი გადასცით
  `getAuditRequestContext(request)`-ის მეშვეობით, რათა IP და `requestId`
  ავტომატურად დაფიქსირდეს.

## ასევე იხილეთ

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — პერსონალური საიდენტიფიკაციო ინფორმაციის (PII) შენიღბვა, პრომპტ-ინექცია
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP ინსტრუმენტების კატალოგი და მოქმედების სფეროები
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — გარემოს ცვლადების სრული ცნობარი
- წყარო: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
