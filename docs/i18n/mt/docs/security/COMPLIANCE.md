# Compliance & Audit (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Sors awtorevoli:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Aġġornat l-aħħar:** 2026-06-28 — v3.8.40

OmniRoute jirreġistra azzjonijiet amministrattivi, avvenimenti ta’ awtentikazzjoni, bidliet fiċ-ċiklu tal-ħajja tal-kredenzjali tal-fornituri, u invokazzjonijiet tal-għodod MCP f’tabelli tal-awditjar appoġġjati minn SQLite. Din il-paġna tkopri x’jiġi rreġistrat, fejn jinżamm, għal kemm żmien jinżamm, kif iċ-ċwievet tal-API jistgħu jagħżlu li ma jipparteċipawx, u kif tikkonsulta d-data.

L-implimentazzjoni tinsab f’`src/lib/compliance/index.ts` (T-43 — "Kontrolli tal-Konformità") u `src/lib/compliance/providerAudit.ts`. Il-kitbiet tal-awditjar qatt ma jiġġeneraw eċċezzjoni: jekk iseħħ xi falliment, is-sejħa tiġi injorata fis-skiet sabiex ir-reġistrazzjoni tal-awditjar ma tkunx tista’ tfixkel il-fluss ewlieni tat-talba.

## X’Jiġi Rreġistrat

### Avvenimenti tal-awditjar amministrattiv (`audit_log`)

Kull sejħa lil `logAuditEvent({ action, actor, target, details, ... })` tipproduċi ringiela waħda. Is-strings tal-azzjoni jsegwu mudell `domain.verb` (jew `domain.verb.outcome`). It-tipi ta’ azzjoni kkonfermati fil-kodiċi jinkludu:

| Azzjoni                              | Sors                                    |
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

Kull entrata tirreġistra `action`, `actor` (li awtomatikament ikun `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id`, u `timestamp`. Iċ-ċwievet sensittivi (`apiKey`, `accessToken`, `refreshToken`, `password`, kull ħaġa li taqbel ma’ `*token`/`*secret`/`*apikey`, eċċ.) jiġu moħbija rikursivament bħala `"[redacted]"` qabel tinkiteb ir-ringiela.

### Sejħiet tal-għodod MCP (`mcp_tool_audit`)

Kull invokazzjoni ta’ għodda MCP tikteb ringiela permezz ta’ `open-sse/mcp-server/audit.ts`. Skema (minn `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Kolonna          | Noti                                          |
| ---------------- | --------------------------------------------- |
| `id`             | inkrementazzjoni awtomatika                   |
| `tool_name`      | identifikatur tal-għodda MCP                  |
| `input_hash`     | sha256 tal-input (ma jinħażen l-ebda payload) |
| `output_summary` | sommarju qasir u maqtugħ                      |
| `duration_ms`    | ħin reali li għadda                           |
| `api_key_id`     | min għamel is-sejħa (jista’ jkun null)        |
| `success`        | `1` / `0`                                     |
| `error_code`     | kodiċi tal-iżball finali f’każ ta’ falliment  |
| `created_at`     | timestamp ISO                                 |

### Reġistri tat-talbiet / tal-użu

Dawn huma telemetrija operazzjonali (mhux strettament awditjar amministrattiv), iżda jużaw l-istess proċess ta’ żamma:

- `usage_history` — sommarju tal-użu għal kull talba
- `call_logs` — reġistru sħiħ għal kull talba (soġġett għal limitu ta’ ringieli, ara hawn taħt)
- `proxy_logs` — reġistru tat-traffiku tal-proxy (soġġett għal limitu ta’ ringieli)
- `request_detail_logs` — reġistru dettaljat preċedenti tat-talbiet (għadu jitnaddaf jekk ikun preżenti)

## Skema tal-Ħażna

`audit_log` tinħoloq b’mod differit minn `ensureAuditLogSchema()` mal-ewwel użu:

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

Jinħolqu indiċijiet fuq `timestamp`, `action`, `actor`, `resource_type`,
`status`, u `request_id`. Kolonni neqsin f’DBs antiki jiżdiedu permezz ta’
`ALTER TABLE` meta jkun meħtieġ.

## Żamma u Tindif

Jiġu osservati żewġ perjodi separati ta’ żamma:

| Varjabbli tal-ambjent       | Valur predefinit | Japplika għal                                                     |
| --------------------------- | ---------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`              | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`              | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`         | Tnaqqis sal-limitu ta’ ringieli għal `call_logs`                  |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`         | Tnaqqis sal-limitu ta’ ringieli għal `proxy_logs`                 |

`cleanupExpiredLogs()` iwettaq il-proċess taż-żamma. Dan jiġi invokat meta
jistartja s-server minn `src/instrumentation-node.ts`. Kull eżekuzzjoni
tirreġistra avveniment ta’ awditjar `compliance.cleanup` bl-għadd ta’ tħassir
għal kull tabella. It-tnaqqis tar-reġistri tal-proxy/tas-sejħiet isir f’lottijiet
(`BATCH_SIZE = 5000`) biex jiġu evitati imblukkar fit-tul tal-kitba.

It-tindif manwali tal-istorja tat-talbiet huwa separat miż-żamma. Il-paġna
Request Logs issejjaħ `POST /api/settings/purge-request-history`, li jħassar
`call_logs`, ir-`request_detail_logs` antiki, u l-artefatti lokali tat-talbiet
taħt `${DATA_DIR}/call_logs/`.

Il-valuri predefiniti huma definiti f’`src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Għażla ta’ Esklużjoni `noLog` (għal kull API key)

L-API keys jistgħu jiġu mmarkati sabiex it-traffiku tas-sejħiet downstream
tagħhom ma jiġix irreġistrat. Il-marka tinsab fit-tabella `api_keys`
(`no_log INTEGER DEFAULT 0`) u tiġi riflessa f’sett fil-memorja għal
tfittxijiet fil-perkors kritiku.

```bash
# Oħloq key mingħajr reġistrazzjoni (awtentikazzjoni tal-ġestjoni meħtieġa)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Funzjonijiet ta’ għajnuna (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — taqleb l-entrata fil-memorja
- `isNoLog(apiKeyId)` — tiġi ċċekkjata fil-perkors tat-talba; jekk meħtieġ,
  taqa’ lura għal qari b’cache ta’ 30 s minn `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (varjabbli tal-ambjent, separati b’virgoli) — jitgħabbew
  minn qabel fis-sett fil-memorja waqt l-istartjar; utli meta ma tkunx tista’
  taqleb il-kolonna direttament

L-avvenimenti amministrattivi ta’ awditjar (login, bidliet fil-fornituri,
sejħiet tal-għodod MCP, eċċ.) **mhumiex** affettwati minn `noLog` — l-għażla
ta’ esklużjoni tapplika biss għar-reġistrazzjoni tat-traffiku għal kull talba.

## API REST

| Endpoint                    | Metodu | Deskrizzjoni                                                 | Awtorizzazzjoni |
| --------------------------- | ------ | ------------------------------------------------------------ | --------------- |
| `/api/compliance/audit-log` | `GET`  | Entrati amministrattivi tal-awditjar b'paġinazzjoni u filtri | management      |
| `/api/mcp/audit`            | `GET`  | Entrati tal-awditjar tal-għodod MCP b'paġinazzjoni           | (open-sse)      |
| `/api/mcp/audit/stats`      | `GET`  | Statistika aggregata tal-awditjar MCP                        | (open-sse)      |

Bħalissa ma jiġi pprovdut l-ebda endpoint għall-esportazzjoni CSV — esporta mid-dashboard jew agħmel query
direttament fid-database SQLite.

### Kif tagħmel query fuq `/api/compliance/audit-log`

Il-parametri tal-query appoġġjati (kollha fakultattivi, u kollha jużaw tqabbil
`LIKE %value%` għall-filtri tat-test):

- `action`, `actor`, `target`, `resourceType` (jew `resource_type`),
  `status`, `requestId` (jew `request_id`)
- `from` / `since`, `to` / `until` — timestamps ISO
- `limit` (valur predefinit `50`, minimu `1`, massimu `500`)
- `offset` (valur predefinit `0`, massimu `10_000`)

Ir-risposta hija array JSON. Il-metadejta tal-paġinazzjoni tintbagħat fl-headers:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

Id-dashboard juri d-dejta tal-awditjar f'**`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Il-paġna għandha żewġ tabs:

- **Konformità** (`ComplianceTab.tsx`) — avvenimenti amministrattivi tal-awditjar minn
  `/api/compliance/audit-log`. Iffiltrati skont it-tip ta' avveniment, is-severità (informazzjoni / twissija
  / kritika, derivata minn azzjoni + status), u l-medda tad-dati. Is-severità tiġi
  kkalkulata fuq in-naħa tal-klijent mill-strings tal-azzjoni/status.
- **MCP** (`McpAuditTab.tsx`) — awditjar tal-għodod MCP minn `/api/mcp/audit`, b'
  filtri skont l-isem tal-għodda u s-suċċess/falliment.

Iż-żewġ tabs jużaw paġinazzjoni b'daqsijiet ta' paġna ta' `50` (konformità) u `25` (MCP).

## Funzjonijiet ta' Għajnuna għall-Kredenzjali tal-Fornitur

`src/lib/compliance/providerAudit.ts` jipprovdi funzjonijiet ta' għajnuna għall-iffurmar użati mir-rotot
tal-ġestjoni tal-fornituri meta jiġġeneraw avvenimenti tal-kredenzjali:

- `summarizeProviderConnectionForAudit(connection)` — ineħħi `apiKey`,
  `accessToken`, `refreshToken`, `idToken`, u
  `providerSpecificData.consoleApiKey` qabel ma l-istampa istantanja tal-konnessjoni
  tinkiteb f'`details`.
- `getProviderAuditTarget(connection)` — jikkomponi string stabbli
  `"<provider>:<name|id>"` għall-field `target`.
- `extractProviderWarnings(...payloads)` — jiskennja r-risposti tal-fornitur għal
  twissijiet ta' politika/sikurezza (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) u
  juri sa 5 riżultati, kull wieħed imqassar għal 400 karattru.

## L-Aħjar Prattiki

- Immarka ċ-ċwievet API li jimmaniġġjaw PII (legali, mediċi, eċċ.) b'`noLog: true`.
- Irfina `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` biex tissodisfa l-politika
  taż-żamma tiegħek. Il-valuri predefiniti ta' 7 ijiem huma konservattivi.
- Esporta t-tabella tal-awditjar barra mill-pjattaforma (`sqlite3 dump`) skont il-frekwenza
  meħtieġa mill-programm ta' konformità tiegħek — ma jeżisti l-ebda arkivjar integrat.
- Issegwi l-għadd ta' `auth.login.failed` u `auth.login.locked` biex tidentifika
  tentattivi ta' forza bruta.
- Meta żżid endpoints amministrattivi ġodda, sejjaħ `logAuditEvent({ ... })` bi string
  stabbli tal-azzjoni `domain.verb.outcome` u għaddi l-kuntest tat-talba permezz ta'
  `getAuditRequestContext(request)` sabiex l-IP u `requestId` jinqabdu
  awtomatikament.

## Ara Wkoll

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskraġġ tal-PII, injezzjoni ta’ prompts
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalgu tal-għodod MCP u l-ambiti
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — referenza sħiħa tal-varjabbli tal-ambjent
- Sors: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
