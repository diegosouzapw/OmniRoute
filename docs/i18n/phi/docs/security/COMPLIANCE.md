# Compliance & Audit (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Pinagmulan ng katotohanan:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Huling na-update:** 2026-06-28 — v3.8.40

Itinatala ng OmniRoute ang mga administratibong pagkilos, kaganapan sa authentication, pagbabago sa lifecycle ng mga kredensyal ng provider, at mga invocation ng MCP tool sa mga audit table na gumagamit ng SQLite. Tinatalakay ng pahinang ito kung ano ang itinatala, kung saan ito nakaimbak, kung gaano katagal itong pinananatili, kung paano maaaring mag-opt out ang mga API key, at kung paano i-query ang data.

Matatagpuan ang implementasyon sa `src/lib/compliance/index.ts` (T-43 — "Mga Kontrol sa Compliance") at `src/lib/compliance/providerAudit.ts`. Hindi kailanman nagta-throw ang mga audit write: kapag may anumang pagkabigo, tahimik na binabalewala ang call upang hindi masira ng audit logging ang pangunahing daloy ng request.

## Ano ang Itinatala

### Mga administratibong kaganapan sa audit (`audit_log`)

Ang bawat call sa `logAuditEvent({ action, actor, target, details, ... })` ay lumilikha ng isang row. Sinusunod ng mga action string ang pattern na `domain.verb` (o `domain.verb.outcome`). Kabilang sa mga nakumpirmang uri ng action sa source tree ang:

| Action                               | Pinagmulan                              |
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

Kinukuha ng bawat entry ang `action`, `actor` (na nagde-default sa `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id`, at `timestamp`. Ang mga sensitibong key (`apiKey`, `accessToken`, `refreshToken`, `password`, anumang tumutugma sa `*token`/`*secret`/`*apikey`, atbp.) ay nire-redact nang recursive bilang `"[redacted]"` bago isulat ang row.

### Mga call sa MCP tool (`mcp_tool_audit`)

Ang bawat invocation ng MCP tool ay nagsusulat ng isang row sa pamamagitan ng `open-sse/mcp-server/audit.ts`. Schema (mula sa `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Column           | Mga tala                                     |
| ---------------- | -------------------------------------------- |
| `id`             | awtomatikong nag-i-increment                 |
| `tool_name`      | identifier ng MCP tool                       |
| `input_hash`     | sha256 ng input (walang payload na iniimbak) |
| `output_summary` | maikli at pinutol na buod                    |
| `duration_ms`    | kabuuang oras                                |
| `api_key_id`     | tumatawag (maaaring null)                    |
| `success`        | `1` / `0`                                    |
| `error_code`     | terminal error code kapag nabigo             |
| `created_at`     | ISO timestamp                                |

### Mga log ng request / paggamit

Ang mga ito ay operational telemetry (hindi mahigpit na admin audit), ngunit ginagamit ng mga ito ang parehong retention pipeline:

- `usage_history` — pinagsama-samang paggamit kada request
- `call_logs` — kumpletong log kada request (napapailalim sa limitasyon sa dami ng row, tingnan sa ibaba)
- `proxy_logs` — log ng proxy traffic (napapailalim sa limitasyon sa dami ng row)
- `request_detail_logs` — legacy na detalyadong log ng request (pinu-prune pa rin kung mayroon)

## Schema ng Storage

Ang `audit_log` ay ginagawa nang lazy ng `ensureAuditLogSchema()` sa unang paggamit:

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

Ginagawa ang mga index sa `timestamp`, `action`, `actor`, `resource_type`,
`status`, at `request_id`. Ang mga nawawalang column sa mga legacy DB ay idinaragdag sa pamamagitan ng
`ALTER TABLE` kapag kinakailangan.

## Retention at Cleanup

Dalawang magkahiwalay na panahon ng retention ang sinusunod:

| Env var                     | Default  | Nalalapat sa                                                      |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Pag-trim ayon sa limitasyon ng row para sa `call_logs`            |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Pag-trim ayon sa limitasyon ng row para sa `proxy_logs`           |

Pinapatakbo ng `cleanupExpiredLogs()` ang proseso ng retention. Tinatawag ito sa pagsisimula ng server
mula sa `src/instrumentation-node.ts`. Ang bawat pagtakbo ay nagla-log ng
`compliance.cleanup` audit event kasama ang bilang ng mga naburang entry sa bawat table. Ang pag-trim ng proxy/call
log ay ginagawa nang batch (`BATCH_SIZE = 5000`) upang maiwasan ang matagal na write lock.

Ang manu-manong cleanup ng history ng request ay hiwalay sa retention. Tinatawag ng pahina ng Request Logs
ang `POST /api/settings/purge-request-history`, na nagbubura sa `call_logs`,
legacy na `request_detail_logs`, at mga lokal na artifact ng request sa ilalim ng
`${DATA_DIR}/call_logs/`.

Ang mga default ay tinukoy sa `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` Opt-Out (bawat API key)

Maaaring lagyan ng flag ang mga API key upang hindi ma-log ang kanilang downstream call traffic. Ang
flag ay nasa table na `api_keys` (`no_log INTEGER DEFAULT 0`) at minamirror
sa isang in-memory set para sa mabilisang lookup.

```bash
# Gumawa ng no-log key (kailangan ng management auth)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Mga helper (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — i-toggle ang in-memory entry
- `isNoLog(apiKeyId)` — sinusuri sa request path; bumabalik sa isang 30 s
  na naka-cache na pagbasa mula sa `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, pinaghihiwalay ng kuwit) — paunang nilo-load sa in-memory
  set sa pag-boot; kapaki-pakinabang kapag hindi mo direktang ma-toggle ang column

Ang mga administratibong audit event (pag-login, mga pagbabago sa provider, mga MCP tool call, atbp.)
ay **hindi** naaapektuhan ng `noLog` — tanging ang pag-log ng traffic ng bawat request ang
hindi isinasali.

## REST API

| Endpoint                    | Paraan | Paglalarawan                                      | Auth       |
| --------------------------- | ------ | ------------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET`  | Mga naka-pahina at na-filter na admin audit entry | management |
| `/api/mcp/audit`            | `GET`  | Mga naka-pahinang MCP tool audit entry            | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`  | Pinagsama-samang estadistika ng MCP audit         | (open-sse) |

Walang kasamang endpoint para sa pag-export ng CSV sa kasalukuyan — mag-export mula sa dashboard o direktang mag-query
sa SQLite database.

### Pag-query sa `/api/compliance/audit-log`

Mga sinusuportahang query param (opsyonal ang lahat, at gumagamit ang lahat ng `LIKE %value%` na pagtutugma para sa
mga text filter):

- `action`, `actor`, `target`, `resourceType` (o `resource_type`),
  `status`, `requestId` (o `request_id`)
- `from` / `since`, `to` / `until` — mga ISO timestamp
- `limit` (default na `50`, min na `1`, max na `500`)
- `offset` (default na `0`, max na `10_000`)

Ang tugon ay isang JSON array. Ibinabalik sa mga header ang metadata ng pagination:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

Inilalantad ng dashboard ang audit data sa **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). May dalawang tab ang pahina:

- **Pagsunod** (`ComplianceTab.tsx`) — mga admin audit event mula sa
  `/api/compliance/audit-log`. Nagfi-filter ayon sa uri ng event, kalubhaan (info / warning
  / critical, na hinango mula sa action + status), at saklaw ng petsa. Ang kalubhaan ay
  kinukuwenta sa client-side mula sa mga action/status string.
- **MCP** (`McpAuditTab.tsx`) — MCP tool audit mula sa `/api/mcp/audit`, na may
  mga filter ayon sa pangalan ng tool at tagumpay/pagkabigo.

Parehong gumagamit ng pagination ang mga tab, na may mga laki ng pahina na `50` (pagsunod) at `25` (MCP).

## Mga Helper para sa Kredensyal ng Provider

Nagbibigay ang `src/lib/compliance/providerAudit.ts` ng mga shaping helper na ginagamit ng mga
route sa pamamahala ng provider kapag naglalabas ang mga ito ng mga credential event:

- `summarizeProviderConnectionForAudit(connection)` — inaalis ang `apiKey`,
  `accessToken`, `refreshToken`, `idToken`, at
  `providerSpecificData.consoleApiKey` bago isulat ang snapshot ng koneksyon sa
  `details`.
- `getProviderAuditTarget(connection)` — bumubuo ng stable na
  `"<provider>:<name|id>"` string para sa field na `target`.
- `extractProviderWarnings(...payloads)` — sinusuri ang mga tugon ng provider para sa
  mga babala sa patakaran/kaligtasan (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) at
  inilalantad ang hanggang 5 tugma, na ang bawat isa ay pinaikli sa 400 character.

## Mga Pinakamahusay na Kasanayan

- Markahan ang mga API key na humahawak ng PII (legal, medikal, atbp.) gamit ang `noLog: true`.
- I-tune ang `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` upang matugunan ang inyong
  patakaran sa pagpapanatili. Konserbatibo ang mga default na 7 araw.
- I-export ang audit table sa labas ng platform (`sqlite3 dump`) ayon sa anumang iskedyul na
  kinakailangan ng inyong programa sa pagsunod — walang built-in na pag-archive.
- Subaybayan ang bilang ng `auth.login.failed` at `auth.login.locked` para sa pagtukoy ng
  brute-force.
- Kapag nagdaragdag ng mga bagong admin endpoint, tawagin ang `logAuditEvent({ ... })` gamit ang isang stable na
  `domain.verb.outcome` action string at ipasa ang request context sa pamamagitan ng
  `getAuditRequestContext(request)` upang awtomatikong makuha ang IP at `requestId`.

## Tingnan Din

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — pagtatakip ng PII, prompt injection
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalogo at mga saklaw ng MCP tool
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — kumpletong sanggunian ng mga environment variable
- Pinagmulan: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
