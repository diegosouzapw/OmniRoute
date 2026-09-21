# Compliance & Audit (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Isi iyi nke eziokwu:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Emelitere ikpeazụ:** 2026-06-28 — v3.8.40

OmniRoute na-edekọ omume nchịkwa, ihe omume nyocha njirimara, mgbanwe n’usoro ndụ nke nzere ndị na-eweta ọrụ, na oku ngwaọrụ MCP n’ime tebụl nyocha SQLite na-akwado. Ibe a na-akọwa ihe ndị a na-edekọ, ebe ha dị, ogologo oge a na-edowe ha, otu igodo API nwere ike isi họrọ ịghara isonye, na otu esi ajụ data ahụ ajụjụ.

Mmejuputa ya dị na `src/lib/compliance/index.ts` (T-43 — "Njikwa Nrubeisi") na `src/lib/compliance/providerAudit.ts`. Ide ndekọ nyocha anaghị atụpụ njehie ma ọlị: mgbe ọdịda ọ bụla mere, a na-eleghara oku ahụ anya na nzuzo ka ndekọ nyocha ghara imebi usoro arịrịọ bụ isi.

## Ihe Ndị A Na-edekọ

### Ihe omume nyocha nchịkwa (`audit_log`)

Oku ọ bụla na `logAuditEvent({ action, actor, target, details, ... })` na-emepụta otu ahịrị. Eriri omume na-agbaso ụkpụrụ `domain.verb` (ma ọ bụ `domain.verb.outcome`). Ụdị omume ndị a kwadoro na koodu gụnyere:

| Omume                                | Isi iyi                                 |
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

Ndenye ọ bụla na-ejide `action`, `actor` (ndabara ya bụ `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id`, na `timestamp`. A na-ezo igodo ndị nwere ozi nzuzo (`apiKey`, `accessToken`, `refreshToken`, `password`, ihe ọ bụla dabara na `*token`/`*secret`/`*apikey`, wdg.) n’ọkwa niile site n’iji `"[redacted]"` dochie ha tupu e dee ahịrị ahụ.

### Oku ngwaọrụ MCP (`mcp_tool_audit`)

Oku ngwaọrụ MCP ọ bụla na-ede otu ahịrị site na `open-sse/mcp-server/audit.ts`. Nhazi (sitere na `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Kọlụm            | Nkọwa                                      |
| ---------------- | ------------------------------------------ |
| `id`             | na-abawanye n’onwe ya                      |
| `tool_name`      | njirimara ngwaọrụ MCP                      |
| `input_hash`     | sha256 nke ntinye (anaghị echekwa payload) |
| `output_summary` | nchịkọta dị mkpụmkpụ e belatara            |
| `duration_ms`    | oge gafere n’ezie                          |
| `api_key_id`     | onye kpọrọ oku (nwere ike ịbụ null)        |
| `success`        | `1` / `0`                                  |
| `error_code`     | koodu njehie ikpeazụ mgbe ọdịda mere       |
| `created_at`     | akara oge ISO                              |

### Ndekọ arịrịọ / ojiji

Ndị a bụ telemetry arụmọrụ (ọ bụghị kpọmkwem nyocha nchịkwa), mana ha na-eji otu usoro njide data ahụ:

- `usage_history` — nchịkọta ojiji maka arịrịọ ọ bụla
- `call_logs` — ndekọ zuru ezu maka arịrịọ ọ bụla (n’okpuru oke ọnụ ọgụgụ ahịrị, lee n’okpuru)
- `proxy_logs` — ndekọ okporo ụzọ proxy (n’okpuru oke ọnụ ọgụgụ ahịrị)
- `request_detail_logs` — ndekọ nkọwa arịrịọ nke usoro ochie (a ka na-ehichapụ ndị ochie ma ọ bụrụ na ọ dị)

## Atụmatụ Nchekwa

A na-emepụta `audit_log` naanị mgbe ọ dị mkpa site na `ensureAuditLogSchema()` n'oge mbụ e ji ya mee ihe:

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

A na-emepụta ndeksi na `timestamp`, `action`, `actor`, `resource_type`,
`status`, na `request_id`. A na-agbakwunye kọlụm ndị na-adịghị na DB ochie site na
`ALTER TABLE` mgbe ọ dị mkpa.

## Ndobe & Nhichapụ

A na-asọpụrụ oge ndobe abụọ dị iche iche:

| Env var                     | Ndabara  | Metụtara                                                          |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Mbelata oke ahịrị maka `call_logs`                                |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Mbelata oke ahịrị maka `proxy_logs`                               |

`cleanupExpiredLogs()` na-eme usoro ndobe ahụ. A na-akpọ ya mgbe sava na-amalite
site na `src/instrumentation-node.ts`. Oge ọ bụla ọ na-arụ ọrụ, ọ na-edekọ mmemme nyocha
`compliance.cleanup` yana ọnụọgụ nhichapụ nke tebụl ọ bụla. A na-eme mbelata ndekọ proxy/oku
n'ìgwè (`BATCH_SIZE = 5000`) iji zere mkpọchi ide ihe na-adịte aka.

Nhichapụ akụkọ arịrịọ nke aka dị iche na ndobe. Ihu Request Logs
na-akpọ `POST /api/settings/purge-request-history`, nke na-ehichapụ `call_logs`,
`request_detail_logs` ochie, na faịlụ arịrịọ mpaghara dị n'okpuru
`${DATA_DIR}/call_logs/`.

A kọwapụtara ndabara na `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Ọpụpụ `noLog` (maka API key ọ bụla)

Enwere ike itinye akara na API key ka a ghara idekọ okporo ụzọ oku ha na-aga n'ihu. Akara ahụ
dị na tebụl `api_keys` (`no_log INTEGER DEFAULT 0`) ma a na-edepụtaghachi ya
n'ime set dị na ebe nchekwa maka nchọpụta ụzọ ngwa ngwa.

```bash
# Mepụta key anaghị edekọ ndekọ (achọrọ ikike njikwa)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Ndị enyemaka (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — gbanye ma ọ bụ gbanyụọ ntinye dị na ebe nchekwa
- `isNoLog(apiKeyId)` — a na-enyocha ya n'ụzọ arịrịọ; ọ bụrụ na nke ahụ agaghị ekwe omume, ọ na-eji ọgụgụ echekwara nke sekọnd 30
  sitere na `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, ndị rikoma kewara) — a na-ebubata ha n'ime set dị na ebe nchekwa
  mgbe sistemụ na-amalite; ọ bara uru mgbe ị na-enweghị ike ịgbanwe kọlụm ahụ ozugbo

`noLog` **anaghị** emetụta mmemme nyocha nchịkwa (nbanye, mgbanwe ndị na-enye ọrụ, oku ngwa MCP, wdg.)
— ọ bụ naanị idekọ okporo ụzọ nke arịrịọ ọ bụla ka a na-ahapụ.

## REST API

| Ebe njedebe                 | Usoro | Nkọwa                                           | Nnweta     |
| --------------------------- | ----- | ----------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET` | Ndekọ nyocha nchịkwa e kewara ibe, nwere nzacha | management |
| `/api/mcp/audit`            | `GET` | Ndekọ nyocha ngwa MCP e kewara ibe              | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | Ọnụ ọgụgụ nchịkọta nyocha MCP                   | (open-sse) |

Enweghị ebe njedebe mbupụ CSV e tinyere ugbu a — si na dashboard bupụ ya ma ọ bụ jụọ
ebe nchekwa data SQLite ajụjụ ozugbo.

### Ịjụ `/api/compliance/audit-log` ajụjụ

Paramita ajụjụ ndị a ka a na-akwado (ha niile bụ nhọrọ, ha niile na-eji ndakọrịta
`LIKE %value%` maka nzacha ederede):

- `action`, `actor`, `target`, `resourceType` (ma ọ bụ `resource_type`),
  `status`, `requestId` (ma ọ bụ `request_id`)
- `from` / `since`, `to` / `until` — akara oge ISO
- `limit` (ndabara `50`, opekempe `1`, kachasị `500`)
- `offset` (ndabara `0`, kachasị `10_000`)

Nzaghachi ahụ bụ usoro JSON. A na-eweghachi metadata nkewa ibe n’ime headers:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

Dashboard ahụ na-egosi data nyocha na **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Ibe ahụ nwere taabụ abụọ:

- **Nrubeisi** (`ComplianceTab.tsx`) — mmemme nyocha nchịkwa sitere na
  `/api/compliance/audit-log`. Ọ na-enyocha site n’ụdị mmemme, ogo ịdị njọ (ozi / ịdọ aka ná ntị
  / dị oke egwu, nke e si na action + status nweta), na oke ụbọchị. A na-agbakọ
  ogo ịdị njọ n’akụkụ client site na eriri action/status.
- **MCP** (`McpAuditTab.tsx`) — nyocha ngwa MCP sitere na `/api/mcp/audit`, nwere
  nzacha site n’aha ngwa na ihe ịga nke ọma/ọdịda.

Taabụ abụọ ahụ na-ekewa ibe site n’iji nha ibe `50` (nrubeisi) na `25` (MCP).

## Ihe Enyemaka Maka Nzere Provider

`src/lib/compliance/providerAudit.ts` na-enye ihe enyemaka nhazi ndị routes
njikwa provider na-eji mgbe ha na-ewepụta mmemme nzere:

- `summarizeProviderConnectionForAudit(connection)` — na-ewepụ `apiKey`,
  `accessToken`, `refreshToken`, `idToken`, na
  `providerSpecificData.consoleApiKey` tupu e dee snapshot njikọ ahụ na
  `details`.
- `getProviderAuditTarget(connection)` — na-emepụta eriri kwụsiri ike
  `"<provider>:<name|id>"` maka mpaghara `target`.
- `extractProviderWarnings(...payloads)` — na-enyocha nzaghachi provider maka
  ịdọ aka ná ntị gbasara amụma/nchekwa (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) ma
  gosipụta ihe ruru nsonaazụ 5, ebe a na-ebiri nke ọ bụla ka ọ bụrụ mkpụrụedemede 400.

## Omume Kachasị Mma

- Kanye igodo API ndị na-ejikwa PII (iwu, ahụike, wdg.) akara site na `noLog: true`.
- Hazie `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` ka ha kwekọọ na
  amụma njigide gị. Ndabara ụbọchị 7 ahụ na-akpachapụ anya.
- Bupụ tebụl nyocha ahụ pụọ na nyiwe (`sqlite3 dump`) n’usoro oge ọ bụla
  mmemme nrubeisi gị chọrọ — enweghị nchekwa ogologo oge arụnyere n’ime ya.
- Soro ọnụọgụ `auth.login.failed` na `auth.login.locked` iji chọpụta
  mwakpo nnwale okwuntughe ugboro ugboro.
- Mgbe ị na-agbakwụnye ebe njedebe nchịkwa ọhụrụ, kpọọ `logAuditEvent({ ... })` site n’iji
  eriri action `domain.verb.outcome` kwụsiri ike ma nyefee ọnọdụ request site na
  `getAuditRequestContext(request)` ka e wee weghara IP na `requestId`
  na-akpaghị aka.

## Hụkwa

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — izochi PII, ntinye prompt
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalọgụ ngwá ọrụ MCP na oke ikike
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — ntụaka zuru ezu nke mgbanwe env
- Ebe mmalite: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
