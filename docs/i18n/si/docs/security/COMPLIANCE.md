# Compliance & Audit (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **සත්යයේ මූලාශ්රය:** `src/lib/compliance/`, `src/app/api/compliance/`
> **අවසන් වරට යාවත්කාලීන කළේ:** 2026-06-28 — v3.8.40

OmniRoute විසින් පරිපාලන ක්රියා, සත්යාපන සිදුවීම්, සපයන්නාගේ අක්තපත්ර ජීවන චක්රයේ වෙනස්කම් සහ MCP මෙවලම් ආමන්ත්රණ SQLite මත පදනම් වූ විගණන වගුවල සටහන් කරයි. සටහන් කරන්නේ මොනවාද, ඒවා පවතින්නේ කොතැනද, කොපමණ කාලයක් රඳවා තබා ගන්නේද, API යතුරුවලට සටහන්කරණයෙන් ඉවත් විය හැක්කේ කෙසේද සහ දත්ත විමසන්නේ කෙසේද යන්න මෙම පිටුවෙන් ආවරණය කෙරේ.

ක්රියාත්මක කිරීම `src/lib/compliance/index.ts` (T-43 — "අනුකූලතා පාලන") සහ `src/lib/compliance/providerAudit.ts` තුළ පවතී. විගණන ලිවීම් කිසිවිටෙකත් දෝෂයක් විසි නොකරයි: කිසියම් අසාර්ථකත්වයකදී ඇමතුම නිහඬව නොසලකා හරින බැවින් විගණන සටහන්කරණයට ප්රධාන ඉල්ලීම් ප්රවාහය බිඳ දැමිය නොහැක.

## සටහන් කරන්නේ මොනවාද

### පරිපාලන විගණන සිදුවීම් (`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })` වෙත කරන සෑම ඇමතුමක්ම එක් පේළියක් නිපදවයි. ක්රියා තන්තු `domain.verb` (හෝ `domain.verb.outcome`) රටාවක් අනුගමනය කරයි. කේත ගස තුළ තහවුරු කළ ක්රියා වර්ගවලට පහත ඒවා ඇතුළත් වේ:

| ක්රියාව                              | මූලාශ්රය                                |
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

සෑම ඇතුළත් කිරීමක්ම `action`, `actor` (පෙරනිමිය `"system"` වේ), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` සහ `timestamp` ග්රහණය කරයි. සංවේදී යතුරු (`apiKey`, `accessToken`, `refreshToken`, `password`, `*token`/`*secret`/`*apikey` සමඟ ගැළපෙන ඕනෑම දෙයක් ආදිය) පේළිය ලිවීමට පෙර පුනරාවර්තීව `"[redacted]"` ලෙස සඟවනු ලැබේ.

### MCP මෙවලම් ඇමතුම් (`mcp_tool_audit`)

සෑම MCP මෙවලම් ආමන්ත්රණයක්ම `open-sse/mcp-server/audit.ts` හරහා පේළියක් ලියයි. යෝජනා ක්රමය (`src/lib/db/migrations/002_mcp_a2a_tables.sql` වෙතින්):

| තීරුව            | සටහන්                                  |
| ---------------- | -------------------------------------- |
| `id`             | ස්වයංක්රීය වර්ධනය                      |
| `tool_name`      | MCP මෙවලම් හඳුනාගැනීමේ නාමය            |
| `input_hash`     | ආදානයේ sha256 (payload එක ගබඩා නොකෙරේ) |
| `output_summary` | කෙටි, කප්පාදු කළ සාරාංශය               |
| `duration_ms`    | ගත වූ සැබෑ කාලය                        |
| `api_key_id`     | ඇමතුම්කරු (හිස් විය හැක)               |
| `success`        | `1` / `0`                              |
| `error_code`     | අසාර්ථක වූ විට අවසාන දෝෂ කේතය          |
| `created_at`     | ISO කාල මුද්රාව                        |

### ඉල්ලීම් / භාවිත සටහන්

මේවා මෙහෙයුම් දුරමිතිය වේ (නිරවද්යවම පරිපාලන විගණනයක් නොවේ), නමුත් එකම රඳවාගැනීමේ නළ මාර්ගය බෙදා ගනී:

- `usage_history` — එක් එක් ඉල්ලීම සඳහා භාවිත සාරාංශය
- `call_logs` — එක් එක් ඉල්ලීම සඳහා සම්පූර්ණ සටහන (පේළි සීමාවට යටත් වේ, පහත බලන්න)
- `proxy_logs` — ප්රොක්සි තදබද සටහන (පේළි සීමාවට යටත් වේ)
- `request_detail_logs` — පැරණි සවිස්තරාත්මක ඉල්ලීම් සටහන (පවතී නම් තවමත් කප්පාදු කෙරේ)

## ගබඩා යෝජනා ක්රමය

පළමු භාවිතයේදී `ensureAuditLogSchema()` මඟින් `audit_log` අවශ්ය වූ විට නිර්මාණය කෙරේ:

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

`timestamp`, `action`, `actor`, `resource_type`, `status`, සහ `request_id` සඳහා දර්ශක නිර්මාණය කෙරේ. පැරණි DBවල නොමැති තීරු අවශ්ය වූ විට `ALTER TABLE` හරහා එකතු කෙරේ.

## රඳවා තබා ගැනීම සහ පිරිසිදු කිරීම

වෙන වෙනම රඳවා තබා ගැනීමේ කාල සීමා දෙකක් පිළිපැදේ:

| පරිසර විචල්යය               | පෙරනිමිය | අදාළ වන්නේ                                                        |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | `call_logs` සඳහා පේළි සීමා කප්පාදුව                               |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs` සඳහා පේළි සීමා කප්පාදුව                              |

`cleanupExpiredLogs()` රඳවා තබා ගැනීමේ ක්රියාවලිය ධාවනය කරයි. එය `src/instrumentation-node.ts` වෙතින් සේවාදායකය ආරම්භ වන විට කැඳවනු ලැබේ. සෑම ධාවනයක්ම එක් එක් වගුව සඳහා මකා දැමූ ගණන් සමඟ `compliance.cleanup` විගණන සිදුවීමක් ලොග් කරයි. දිගු ලිවීම් අගුලු වළක්වා ගැනීම සඳහා ප්රොක්සි/ඇමතුම් ලොග් කප්පාදුව කාණ්ඩ වශයෙන් (`BATCH_SIZE = 5000`) සිදු කෙරේ.

අතින් සිදු කරන ඉල්ලීම් ඉතිහාස පිරිසිදු කිරීම රඳවා තබා ගැනීමේ ක්රියාවලියෙන් වෙන්ව පවතී. ඉල්ලීම් ලොග් පිටුව `POST /api/settings/purge-request-history` කැඳවන අතර, එමඟින් `call_logs`, පැරණි `request_detail_logs`, සහ `${DATA_DIR}/call_logs/` යටතේ ඇති දේශීය ඉල්ලීම් කෘතික මකා දමයි.

පෙරනිමි අගයන් `src/lib/logEnv.ts` තුළ නිර්වචනය කර ඇත (`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` ඉවත් වීමේ විකල්පය (එක් එක් API යතුර සඳහා)

API යතුරු සලකුණු කිරීමෙන් ඒවායේ පහළට යන ඇමතුම් ගමනාගමනය ලොග් නොකර තැබිය හැක. මෙම සලකුණ `api_keys` වගුවේ (`no_log INTEGER DEFAULT 0`) පවතින අතර, වේගවත් ක්රියාමාර්ග මාර්ගයේ සෙවීම් සඳහා මතකයේ ඇති කට්ටලයකටද පිටපත් කෙරේ.

```bash
# ලොග් නොකරන යතුරක් සාදන්න (කළමනාකරණ සත්යාපනය අවශ්යයි)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

උපකාරක (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — මතකයේ ඇති ඇතුළත් කිරීම සක්රිය හෝ අක්රිය කරයි
- `isNoLog(apiKeyId)` — ඉල්ලීම් මාර්ගයේදී පරීක්ෂා කෙරේ; එය අසාර්ථක වුවහොත් `api_keys.no_log` වෙතින් තත්පර 30ක් හැඹිලිගත කළ කියවීමක් භාවිත කරයි
- `NO_LOG_API_KEY_IDS` (පරිසර විචල්යය, කොමාවලින් වෙන් කළ) — ආරම්භයේදී මතකයේ ඇති කට්ටලයට පූර්ව පූරණය කෙරේ; තීරුව සෘජුව සක්රිය හෝ අක්රිය කළ නොහැකි විට ප්රයෝජනවත් වේ

පරිපාලන විගණන සිදුවීම් (පිවිසීම, සැපයුම්කරු වෙනස්කම්, MCP මෙවලම් ඇමතුම්, ආදිය) `noLog` මඟින් **බලපෑමට ලක් නොවේ** — ඉවත් කරනු ලබන්නේ එක් එක් ඉල්ලීමේ ගමනාගමන ලොග් කිරීම පමණි.

## REST API

| අන්ත ලක්ෂ්යය                | ක්රමය | විස්තරය                                           | සත්යාපනය   |
| --------------------------- | ----- | ------------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET` | පෙරහන් සහිත පිටුගත කළ පරිපාලක විගණන ඇතුළත් කිරීම් | management |
| `/api/mcp/audit`            | `GET` | පිටුගත කළ MCP මෙවලම් විගණන ඇතුළත් කිරීම්          | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | සමුච්චිත MCP විගණන සංඛ්යාලේඛන                     | (open-sse) |

දැනට CSV නිර්යාත අන්ත ලක්ෂ්යයක් සපයා නැත — උපකරණ පුවරුවෙන් නිර්යාත කරන්න හෝ
SQLite දත්ත සමුදාය සෘජුවම විමසන්න.

### `/api/compliance/audit-log` විමසීම

සහාය දක්වන විමසුම් පරාමිති (සියල්ල විකල්ප වන අතර, පෙළ පෙරහන් සඳහා සියල්ල
`LIKE %value%` ගැළපීම භාවිත කරයි):

- `action`, `actor`, `target`, `resourceType` (හෝ `resource_type`),
  `status`, `requestId` (හෝ `request_id`)
- `from` / `since`, `to` / `until` — ISO කාල මුද්රා
- `limit` (පෙරනිමිය `50`, අවමය `1`, උපරිමය `500`)
- `offset` (පෙරනිමිය `0`, උපරිමය `10_000`)

ප්රතිචාරය JSON අරාවකි. පිටුකරණ පාරදත්ත ශීර්ෂයන් තුළ ආපසු ලබා දේ:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## උපකරණ පුවරුව

උපකරණ පුවරුව **`/dashboard/audit`** හි විගණන දත්ත පෙන්වයි
(`src/app/(dashboard)/dashboard/audit/page.tsx`). පිටුවෙහි ටැබ් දෙකක් ඇත:

- **අනුකූලතාව** (`ComplianceTab.tsx`) — `/api/compliance/audit-log` වෙතින්
  පරිපාලක විගණන සිදුවීම්. සිදුවීම් වර්ගය, බරපතළකම (තොරතුරු / අනතුරු ඇඟවීම
  / තීරණාත්මක, ක්රියාව + තත්ත්වය මඟින් ව්යුත්පන්න කර ඇත) සහ දින පරාසය අනුව පෙරහන් කරයි. බරපතළකම
  සේවාලාභී පාර්ශ්වයේදී ක්රියාව/තත්ත්ව පෙළවලින් ගණනය කරයි.
- **MCP** (`McpAuditTab.tsx`) — `/api/mcp/audit` වෙතින් MCP මෙවලම් විගණනය,
  මෙවලම් නාමය සහ සාර්ථකත්වය/අසාර්ථකත්වය අනුව පෙරහන් සහිතව.

ටැබ් දෙකම `50` (අනුකූලතාව) සහ `25` (MCP) යන පිටු ප්රමාණ සමඟ පිටුකරණය කරයි.

## සැපයුම්කරු අක්තපත්ර සහායක

`src/lib/compliance/providerAudit.ts` මඟින් සැපයුම්කරු-කළමනාකරණ මාර්ග
අක්තපත්ර සිදුවීම් නිකුත් කරන විට භාවිත කරන හැඩගැන්වීමේ සහායක සපයයි:

- `summarizeProviderConnectionForAudit(connection)` — සම්බන්ධතා සැණරුව
  `details` වෙත ලිවීමට පෙර `apiKey`, `accessToken`, `refreshToken`, `idToken`,
  සහ `providerSpecificData.consoleApiKey` ඉවත් කරයි.
- `getProviderAuditTarget(connection)` — `target` ක්ෂේත්රය සඳහා ස්ථාවර
  `"<provider>:<name|id>"` පෙළක් සකසයි.
- `extractProviderWarnings(...payloads)` — ප්රතිපත්ති/ආරක්ෂණ අනතුරු ඇඟවීම්
  (`[sanitizer]`, `prompt injection detected`, `content has been filtered`,
  `safety filter`, `policy violation`) සඳහා සැපයුම්කරු ප්රතිචාර පරිලෝකනය කර,
  ගැළපීම් 5ක් දක්වා පෙන්වයි; එක් එක් ගැළපීම අක්ෂර 400කට සීමා කරයි.

## හොඳම භාවිතයන්

- PII (නීතිමය, වෛද්යමය ආදිය) හසුරුවන API යතුරු `noLog: true` ලෙස සලකුණු කරන්න.
- ඔබේ රඳවාගැනීමේ ප්රතිපත්තිය සපුරාලීමට `APP_LOG_RETENTION_DAYS` /
  `CALL_LOG_RETENTION_DAYS` සකසන්න. පෙරනිමි දින 7 සංරක්ෂණශීලී වේ.
- ඔබේ අනුකූලතා වැඩසටහනට අවශ්ය ඕනෑම කාලාන්තරයකදී විගණන වගුව වේදිකාවෙන් පිටතට
  (`sqlite3 dump`) නිර්යාත කරන්න — ඇතුළත් සංරක්ෂණ පහසුකමක් නොපවතී.
- බෘට්-ෆෝස් හඳුනාගැනීම සඳහා `auth.login.failed` සහ `auth.login.locked`
  ගණන් නිරීක්ෂණය කරන්න.
- නව පරිපාලක අන්ත ලක්ෂ්ය එක් කරන විට, ස්ථාවර `domain.verb.outcome` ක්රියා පෙළක්
  සමඟ `logAuditEvent({ ... })` කැඳවා, IP සහ `requestId` ස්වයංක්රීයව
  ග්රහණය කර ගැනීම සඳහා `getAuditRequestContext(request)` හරහා ඉල්ලීම් සන්දර්භය ලබා දෙන්න.

## තවද බලන්න

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII ආවරණය කිරීම, ප්රොම්ප්ට් එන්නත් කිරීම
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP මෙවලම් නාමාවලිය සහ විෂය පථ
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — සම්පූර්ණ පරිසර විචල්ය යොමුව
- මූලාශ්රය: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
