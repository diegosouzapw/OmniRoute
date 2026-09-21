# Compliance & Audit (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Chanzo rasmi:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Ilisasishwa mwisho:** 2026-06-28 — v3.8.40

OmniRoute hurekodi vitendo vya kiutawala, matukio ya uthibitishaji, mabadiliko ya mzunguko wa maisha wa vitambulisho vya watoa huduma, na miito ya zana za MCP kwenye majedwali ya ukaguzi yanayotegemea SQLite. Ukurasa huu unaeleza kinachowekwa kwenye kumbukumbu, mahali kinapohifadhiwa, muda wa kuhifadhiwa, jinsi funguo za API zinavyoweza kuchagua kutoshiriki, na jinsi ya kuhoji data hiyo.

Utekelezaji unapatikana katika `src/lib/compliance/index.ts` (T-43 — "Udhibiti wa Uzingatiaji") na `src/lib/compliance/providerAudit.ts`. Uandikaji wa ukaguzi hautoi hitilafu kamwe: ikitokea hitilafu yoyote, mwito huo hupuuzwa kimya kimya ili uwekaji wa kumbukumbu za ukaguzi usivuruge mtiririko mkuu wa ombi.

## Kinachowekwa Kwenye Kumbukumbu

### Matukio ya ukaguzi wa kiutawala (`audit_log`)

Kila mwito kwa `logAuditEvent({ action, actor, target, details, ... })` hutengeneza safu moja. Mifuatano ya vitendo hufuata muundo wa `domain.verb` (au `domain.verb.outcome`). Aina za vitendo zilizothibitishwa katika msimbo ni pamoja na:

| Kitendo                              | Chanzo                                  |
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

Kila ingizo hunasa `action`, `actor` (chaguo-msingi ni `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id`, na `timestamp`. Funguo nyeti (`apiKey`, `accessToken`, `refreshToken`, `password`, chochote kinacholingana na `*token`/`*secret`/`*apikey`, n.k.) hufichwa kwa kujirudia na kuwekwa thamani ya `"[redacted]"` kabla ya safu kuandikwa.

### Miito ya zana za MCP (`mcp_tool_audit`)

Kila mwito wa zana ya MCP huandika safu kupitia `open-sse/mcp-server/audit.ts`. Muundo (kutoka `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Safu             | Maelezo                                       |
| ---------------- | --------------------------------------------- |
| `id`             | huongezeka kiotomatiki                        |
| `tool_name`      | kitambulishi cha zana ya MCP                  |
| `input_hash`     | sha256 ya ingizo (hakuna data iliyohifadhiwa) |
| `output_summary` | muhtasari mfupi uliokatwa                     |
| `duration_ms`    | muda halisi uliopita                          |
| `api_key_id`     | mwitaji (inaweza kuwa tupu)                   |
| `success`        | `1` / `0`                                     |
| `error_code`     | msimbo wa mwisho wa hitilafu ikishindikana    |
| `created_at`     | muhuri wa muda wa ISO                         |

### Kumbukumbu za maombi / matumizi

Hizi ni data za ufuatiliaji wa uendeshaji (si ukaguzi wa kiutawala pekee), lakini zinatumia mchakato uleule wa uhifadhi:

- `usage_history` — muhtasari wa matumizi kwa kila ombi
- `call_logs` — kumbukumbu kamili kwa kila ombi (inategemea kikomo cha safu, tazama hapa chini)
- `proxy_logs` — kumbukumbu ya trafiki ya proksi (inategemea kikomo cha safu)
- `request_detail_logs` — kumbukumbu ya zamani yenye maelezo ya kina ya maombi (bado hupunguzwa ikiwa ipo)

## Muundo wa Hifadhi

`audit_log` huundwa kwa kucheleweshwa na `ensureAuditLogSchema()` inapotumiwa kwa mara ya kwanza:

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

Indeksi huundwa kwenye `timestamp`, `action`, `actor`, `resource_type`,
`status`, na `request_id`. Safu wima zinazokosekana kwenye DB za zamani huongezwa kupitia
`ALTER TABLE` inapohitajika.

## Uhifadhi na Usafishaji

Vipindi viwili tofauti vya uhifadhi vinazingatiwa:

| Kigezo cha mazingira        | Chaguo-msingi | Hutumika kwa                                                      |
| --------------------------- | ------------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`           | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`           | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`      | Upunguzaji wa kikomo cha safu mlalo kwa `call_logs`               |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`      | Upunguzaji wa kikomo cha safu mlalo kwa `proxy_logs`              |

`cleanupExpiredLogs()` huendesha mchakato wa uhifadhi. Huitwa seva inapoanza
kutoka `src/instrumentation-node.ts`. Kila utekelezaji hurekodi tukio la ukaguzi la
`compliance.cleanup` pamoja na idadi ya vifutwa kwa kila jedwali. Upunguzaji wa kumbukumbu za proksi/simu
hufanywa kwa makundi (`BATCH_SIZE = 5000`) ili kuepuka kufunga uandishi kwa muda mrefu.

Usafishaji wa historia ya maombi unaofanywa mwenyewe ni tofauti na uhifadhi. Ukurasa wa Kumbukumbu za Maombi
huita `POST /api/settings/purge-request-history`, ambayo hufuta `call_logs`,
`request_detail_logs` za zamani, na mabaki ya maombi ya ndani yaliyo chini ya
`${DATA_DIR}/call_logs/`.

Chaguo-msingi zimefafanuliwa katika `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Kujiondoa kwa `noLog` (kwa kila ufunguo wa API)

Funguo za API zinaweza kuwekewa alama ili trafiki yao ya simu zinazofuata isirekodiwe. Alama hiyo
huhifadhiwa kwenye jedwali la `api_keys` (`no_log INTEGER DEFAULT 0`) na huakisiwa
kwenye seti ya kumbukumbu ya ndani kwa ajili ya utafutaji wa njia inayotumiwa sana.

```bash
# Unda ufunguo usiorekodi kumbukumbu (uthibitishaji wa usimamizi unahitajika)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Vitendaji saidizi (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — washa au zima ingizo la kumbukumbu ya ndani
- `isNoLog(apiKeyId)` — hukaguliwa kwenye njia ya ombi; ikishindikana hutumia usomaji ulioakibishwa kwa sekunde 30
  kutoka `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (kigezo cha mazingira, zilizotenganishwa kwa koma) — hupakiwa mapema kwenye seti ya kumbukumbu ya ndani
  wakati wa kuwasha; ni muhimu wakati huwezi kubadilisha safu wima moja kwa moja

Matukio ya ukaguzi wa kiutawala (kuingia, mabadiliko ya watoa huduma, simu za zana za MCP, n.k.)
**hayaathiriwi** na `noLog` — ni kurekodi trafiki ya kila ombi pekee kunakozimwa.

## API ya REST

| Endpoint                    | Method | Maelezo                                                                 | Auth       |
| --------------------------- | ------ | ----------------------------------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET`  | Rekodi za ukaguzi wa msimamizi zilizogawanywa katika kurasa na vichujio | management |
| `/api/mcp/audit`            | `GET`  | Rekodi za ukaguzi wa zana za MCP zilizogawanywa katika kurasa           | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`  | Takwimu zilizojumlishwa za ukaguzi wa MCP                               | (open-sse) |

Kwa sasa hakuna endpoint ya kuhamisha CSV inayotolewa — hamisha kutoka kwenye dashibodi au uliza
hifadhidata ya SQLite moja kwa moja.

### Kuuliza `/api/compliance/audit-log`

Vigezo vya hoja vinavyotumika (vyote ni vya hiari, na vyote hutumia ulinganishaji wa `LIKE %value%` kwa
vichujio vya maandishi):

- `action`, `actor`, `target`, `resourceType` (au `resource_type`),
  `status`, `requestId` (au `request_id`)
- `from` / `since`, `to` / `until` — mihuri ya muda ya ISO
- `limit` (chaguo-msingi `50`, kiwango cha chini `1`, kiwango cha juu `500`)
- `offset` (chaguo-msingi `0`, kiwango cha juu `10_000`)

Jibu ni safu ya JSON. Metadata ya ugawaji katika kurasa inarejeshwa kwenye vichwa:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashibodi

Dashibodi huonyesha data ya ukaguzi kwenye **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Ukurasa una vichupo viwili:

- **Uzingatiaji** (`ComplianceTab.tsx`) — matukio ya ukaguzi wa msimamizi kutoka
  `/api/compliance/audit-log`. Huchuja kwa aina ya tukio, kiwango cha uzito (taarifa / onyo
  / muhimu, kinachotokana na kitendo + hali), na kipindi cha tarehe. Kiwango cha uzito
  hukokotolewa upande wa kiteja kutoka kwenye mifuatano ya kitendo/hali.
- **MCP** (`McpAuditTab.tsx`) — ukaguzi wa zana za MCP kutoka `/api/mcp/audit`, wenye
  vichujio vya jina la zana na kufanikiwa/kushindwa.

Vichupo vyote viwili hugawanya data katika kurasa zenye ukubwa wa `50` (uzingatiaji) na `25` (MCP).

## Visaidizi vya Vitambulisho vya Mtoa Huduma

`src/lib/compliance/providerAudit.ts` hutoa visaidizi vya kuunda muundo vinavyotumiwa na
njia za usimamizi wa watoa huduma zinapotoa matukio ya vitambulisho:

- `summarizeProviderConnectionForAudit(connection)` — huondoa `apiKey`,
  `accessToken`, `refreshToken`, `idToken`, na
  `providerSpecificData.consoleApiKey` kabla ya picha ya hali ya muunganisho
  kuandikwa kwenye `details`.
- `getProviderAuditTarget(connection)` — huunda mfuatano thabiti wa
  `"<provider>:<name|id>"` kwa uga wa `target`.
- `extractProviderWarnings(...payloads)` — hukagua majibu ya mtoa huduma ili kupata
  maonyo ya sera/usalama (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) na
  huonyesha hadi matokeo 5, kila moja likifupishwa hadi vibambo 400.

## Mbinu Bora

- Weka alama kwenye funguo za API zinazoshughulikia PII (kisheria, kitabibu, n.k.) kwa `noLog: true`.
- Rekebisha `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` ili kukidhi
  sera yako ya uhifadhi. Chaguo-msingi za siku 7 ni za tahadhari.
- Hamisha jedwali la ukaguzi nje ya jukwaa (`sqlite3 dump`) kwa ratiba yoyote
  inayohitajika na mpango wako wa uzingatiaji — hakuna uhifadhi wa kumbukumbu uliojengewa ndani.
- Fuatilia idadi ya `auth.login.failed` na `auth.login.locked` ili kugundua
  mashambulizi ya kujaribu manenosiri kwa nguvu.
- Unapoongeza endpoint mpya za msimamizi, ita `logAuditEvent({ ... })` kwa mfuatano thabiti wa kitendo wa
  `domain.verb.outcome` na upitishe muktadha wa ombi kupitia
  `getAuditRequestContext(request)` ili IP na `requestId` zinakiliwe
  kiotomatiki.

## Tazama Pia

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — ufichaji wa PII, udungaji wa vidokezo
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalogi ya zana za MCP na mawanda
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — rejeleo kamili la vigeu vya mazingira
- Chanzo: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
