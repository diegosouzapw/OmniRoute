# Compliance & Audit (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Tushen gaskiya:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Sabuntawa ta ƙarshe:** 2026-06-28 — v3.8.40

OmniRoute yana rubuta ayyukan gudanarwa, abubuwan da suka faru na tantancewa, sauye-sauyen zagayowar rayuwar bayanan shaidar masu samarwa, da kiran kayan aikin MCP a cikin jadawalin binciken da SQLite ke tallafawa. Wannan shafin ya ƙunshi abin da ake rubutawa, inda ake adana shi, tsawon lokacin da ake riƙe shi, yadda maɓallan API za su iya zaɓar kin shiga, da yadda ake gudanar da tambaya kan bayanan.

Aiwatarwar tana cikin `src/lib/compliance/index.ts` (T-43 — "Sarrafawar Bin Ka'ida") da `src/lib/compliance/providerAudit.ts`. Rubuce-rubucen bincike ba sa jefa kuskure: idan aka samu kowace irin gazawa, ana yin watsi da kiran a ɓoye domin rubutun bincike kada ya katse babban tsarin buƙatar.

## Abubuwan da Ake Rubutawa

### Abubuwan binciken gudanarwa (`audit_log`)

Kowane kira zuwa `logAuditEvent({ action, actor, target, details, ... })` yana samar da layi guda. Kirtanin ayyuka suna bin tsarin `domain.verb` (ko `domain.verb.outcome`). Nau'ikan ayyukan da aka tabbatar suna cikin bishiyar lambar sun haɗa da:

| Aiki                                 | Tushe                                   |
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

Kowane shigarwa yana ɗauke da `action`, `actor` (tsohon ƙimarsa ita ce `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id`, da `timestamp`. Ana ɓoye maɓallai masu muhimmanci (`apiKey`, `accessToken`, `refreshToken`, `password`, duk wani abu da ya dace da `*token`/`*secret`/`*apikey`, da sauransu) ta hanyar maimaitawa zuwa `"[redacted]"` kafin a rubuta layin.

### Kiran kayan aikin MCP (`mcp_tool_audit`)

Kowane kiran kayan aikin MCP yana rubuta layi ta hanyar `open-sse/mcp-server/audit.ts`. Tsarin bayanai (daga `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Shafi            | Bayani                                             |
| ---------------- | -------------------------------------------------- |
| `id`             | ƙaruwa ta atomatik                                 |
| `tool_name`      | mai gano kayan aikin MCP                           |
| `input_hash`     | sha256 na shigarwa (ba a adana ainihin bayanin ba) |
| `output_summary` | taƙaitaccen bayani da aka gajarta                  |
| `duration_ms`    | ainihin lokacin da aka ɗauka                       |
| `api_key_id`     | mai kira (yana iya zama babu ƙima)                 |
| `success`        | `1` / `0`                                          |
| `error_code`     | lambar kuskuren ƙarshe idan an gaza                |
| `created_at`     | tambarin lokaci na ISO                             |

### Rajistocin buƙata / amfani

Waɗannan bayanan lura ne na aiki (ba cikakken binciken gudanarwa ba), amma suna amfani da tsarin riƙewa iri ɗaya:

- `usage_history` — taƙaitaccen amfani na kowace buƙata
- `call_logs` — cikakken rajistan kowace buƙata (yana ƙarƙashin iyakar layuka, duba ƙasa)
- `proxy_logs` — rajistan zirga-zirgar proxy (yana ƙarƙashin iyakar layuka)
- `request_detail_logs` — tsohon cikakken rajistan buƙata (har yanzu ana datse shi idan yana nan)

## Tsarin Ma’ajiya

Ana ƙirƙirar `audit_log` ne kawai lokacin da ake buƙata ta hanyar `ensureAuditLogSchema()` a farkon amfani:

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

Ana ƙirƙirar fihirisa a kan `timestamp`, `action`, `actor`, `resource_type`,
`status`, da `request_id`. Ana ƙara ginshiƙan da suka ɓace a tsofaffin DB ta
hanyar `ALTER TABLE` idan an buƙata.

## Riƙewa & Tsabtacewa

Ana mutunta lokutan riƙewa guda biyu daban-daban:

| Canjin muhalli              | Tsoho    | Ya shafi                                                          |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Rage layuka zuwa iyakar da aka sa wa `call_logs`                  |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Rage layuka zuwa iyakar da aka sa wa `proxy_logs`                 |

`cleanupExpiredLogs()` yana gudanar da aikin riƙewa. Ana kiran sa lokacin fara
uwar garken daga `src/instrumentation-node.ts`. Kowane gudu yana rubuta aukuwar
bincike ta `compliance.cleanup` tare da adadin da aka goge daga kowace teburi.
Ana yin rage rajistan proxy/kira rukuni-rukuni (`BATCH_SIZE = 5000`) don guje wa
dogayen kulle-kullen rubutu.

Tsabtace tarihin buƙatu da hannu ya bambanta da riƙewa. Shafin Rajistan Buƙatu
yana kiran `POST /api/settings/purge-request-history`, wanda ke goge `call_logs`,
tsohon `request_detail_logs`, da kayan tarihin buƙatu na cikin gida da ke ƙarƙashin
`${DATA_DIR}/call_logs/`.

An ayyana tsoffin ƙimomi a cikin `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Ficewa daga `noLog` (ga kowane maɓallin API)

Ana iya yi wa maɓallan API alama domin kada a yi rajistar zirga-zirgar kiransu
zuwa sabis na gaba. Alamar tana cikin teburin `api_keys` (`no_log INTEGER DEFAULT 0`)
kuma ana kwafarta zuwa saitin cikin ƙwaƙwalwa domin binciken hanya mai sauri.

```bash
# Ƙirƙiri maɓalli da ba a yin rajistarsa (ana buƙatar tantancewar gudanarwa)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Maɓallin sirri", "noLog": true}'
```

Masu taimako (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — kunna ko kashe shigarwar cikin ƙwaƙwalwa
- `isNoLog(apiKeyId)` — ana dubawa a hanyar buƙata; idan hakan bai yiwu ba, yana
  komawa ga karatun `api_keys.no_log` da aka adana na tsawon 30 s
- `NO_LOG_API_KEY_IDS` (env, waɗanda waƙafi ya raba) — ana ɗora su tun farko cikin
  saitin ƙwaƙwalwa lokacin farawa; yana da amfani idan ba za ku iya sauya ginshiƙin
  kai tsaye ba

Aukuwar binciken gudanarwa (shiga, sauye-sauyen mai samarwa, kiran kayan aikin MCP,
da sauransu) **ba sa** ƙarƙashin tasirin `noLog` — rajistar zirga-zirgar kowace
buƙata ce kawai ake ficewa daga cikinta.

## REST API

| Endpoint                    | Hanya | Bayani                                                   | Tabbatarwa |
| --------------------------- | ----- | -------------------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET` | Shigarwar binciken gudanarwa masu shafuka tare da matatu | gudanarwa  |
| `/api/mcp/audit`            | `GET` | Shigarwar binciken kayan aikin MCP masu shafuka          | (open-sse) |
| `/api/mcp/audit/stats`      | `GET` | Ƙididdigaggun bayanan binciken MCP                       | (open-sse) |

A halin yanzu ba a samar da endpoint na fitarwa zuwa CSV ba — yi fitarwar daga dashboard ko yi tambaya
kai tsaye ga ma'ajiyar bayanan SQLite.

### Yin tambaya ga `/api/compliance/audit-log`

Sigogin tambaya da ake tallafawa (duk na zaɓi ne, kuma dukkansu suna amfani da daidaitawar `LIKE %value%` don
matatun rubutu):

- `action`, `actor`, `target`, `resourceType` (ko `resource_type`),
  `status`, `requestId` (ko `request_id`)
- `from` / `since`, `to` / `until` — tambarin lokaci na ISO
- `limit` (tsoho `50`, mafi ƙaranci `1`, mafi yawa `500`)
- `offset` (tsoho `0`, mafi yawa `10_000`)

Amsar jerin JSON ce. Ana mayar da metadata na rarraba shafuka a cikin headers:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

Dashboard yana nuna bayanan bincike a **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Shafin yana da tabs biyu:

- **Bin ƙa'ida** (`ComplianceTab.tsx`) — abubuwan binciken gudanarwa daga
  `/api/compliance/audit-log`. Yana tacewa ta nau'in abu, tsanani (bayani / gargaɗi
  / mai tsanani, waɗanda aka samo daga action + status), da zangon kwanan wata. Ana
  lissafa tsanani a ɓangaren client daga rubutun action/status.
- **MCP** (`McpAuditTab.tsx`) — binciken kayan aikin MCP daga `/api/mcp/audit`, tare da
  matatu bisa sunan kayan aiki da nasara/rashin nasara.

Dukkan tabs ɗin suna rarraba shafuka da girman shafi na `50` (bin ƙa'ida) da `25` (MCP).

## Mataimakan Bayanan Shaidar Provider

`src/lib/compliance/providerAudit.ts` yana samar da mataimakan tsara bayanai da hanyoyin
gudanar da provider ke amfani da su lokacin da suke fitar da abubuwan bayanan shaida:

- `summarizeProviderConnectionForAudit(connection)` — yana cire `apiKey`,
  `accessToken`, `refreshToken`, `idToken`, da
  `providerSpecificData.consoleApiKey` kafin a rubuta hoton yanayin haɗin zuwa
  `details`.
- `getProviderAuditTarget(connection)` — yana haɗa tsayayyen
  rubutun `"<provider>:<name|id>"` don filin `target`.
- `extractProviderWarnings(...payloads)` — yana bincika amsoshin provider don
  gargaɗin manufofi/aminci (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) kuma yana
  fito da har zuwa sakamako 5, kowanne an taƙaita shi zuwa haruffa 400.

## Kyawawan Dabaru

- Yi wa API keys da ke sarrafa PII (na shari'a, na lafiya, da sauransu) alama da `noLog: true`.
- Daidaita `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` don biyan
  manufofin riƙe bayananku. Tsoffin kwanaki 7 zaɓi ne mai taka-tsantsan.
- Fitar da teburin bincike zuwa wajen dandali (`sqlite3 dump`) bisa duk wani jadawali
  da shirin bin ƙa'idarku ke buƙata — babu tsarin adanawa na ciki.
- Bibiyi ƙididdigar `auth.login.failed` da `auth.login.locked` don gano
  hare-haren gwada kalmomin sirri da ƙarfi.
- Lokacin ƙara sabbin endpoints na gudanarwa, kira `logAuditEvent({ ... })` tare da tsayayyen
  rubutun action na `domain.verb.outcome`, sannan a tura mahallin request ta
  `getAuditRequestContext(request)` domin a kama IP da `requestId`
  ta atomatik.

## Duba Kuma

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — ɓoye PII, shigar da umarnin cutarwa
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — kundin kayan aikin MCP da iyakokin amfani
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — cikakken bayani kan env var
- Tushe: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
