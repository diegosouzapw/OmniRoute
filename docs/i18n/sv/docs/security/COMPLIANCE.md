# Compliance & Audit (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Tillförlitlig källa:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Senast uppdaterad:** 2026-06-28 — v3.8.40

OmniRoute registrerar administrativa åtgärder, autentiseringshändelser, ändringar i livscykeln för leverantörsautentiseringsuppgifter och anrop av MCP-verktyg i SQLite-baserade granskningstabeller. Den här sidan beskriver vad som loggas, var det lagras, hur länge det bevaras, hur API-nycklar kan välja bort loggning och hur data kan hämtas.

Implementationen finns i `src/lib/compliance/index.ts` (T-43 — ”Efterlevnadskontroller”) och `src/lib/compliance/providerAudit.ts`. Skrivningar till granskningsloggen genererar aldrig undantag: vid alla fel ignoreras anropet utan meddelande, så att granskningsloggningen inte kan störa huvudflödet för begäran.

## Vad som loggas

### Administrativa granskningshändelser (`audit_log`)

Varje anrop till `logAuditEvent({ action, actor, target, details, ... })` skapar en rad. Åtgärdssträngar följer mönstret `domain.verb` (eller `domain.verb.outcome`). Bekräftade åtgärdstyper i källträdet omfattar:

| Åtgärd                               | Källa                                   |
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

Varje post registrerar `action`, `actor` (standardvärdet är `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` och `timestamp`. Känsliga nycklar (`apiKey`, `accessToken`, `refreshToken`, `password`, allt som matchar `*token`/`*secret`/`*apikey` osv.) maskeras rekursivt som `"[redacted]"` innan raden skrivs.

### MCP-verktygsanrop (`mcp_tool_audit`)

Varje anrop av ett MCP-verktyg skriver en rad via `open-sse/mcp-server/audit.ts`. Schema (från `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Kolumn           | Anmärkningar                               |
| ---------------- | ------------------------------------------ |
| `id`             | automatisk inkrementering                  |
| `tool_name`      | identifierare för MCP-verktyget            |
| `input_hash`     | sha256 för indata (ingen nyttolast lagras) |
| `output_summary` | kort, trunkerad sammanfattning             |
| `duration_ms`    | faktisk förfluten tid                      |
| `api_key_id`     | anropare (kan vara null)                   |
| `success`        | `1` / `0`                                  |
| `error_code`     | slutlig felkod vid misslyckande            |
| `created_at`     | ISO-tidsstämpel                            |

### Begärande-/användningsloggar

Dessa utgör drifttelemetri (inte strikt administrativ granskning) men delar samma pipeline för bevarande:

- `usage_history` — aggregerad användning per begäran
- `call_logs` — fullständig logg per begäran (omfattas av radgränsen, se nedan)
- `proxy_logs` — logg över proxytrafik (omfattas av radgränsen)
- `request_detail_logs` — äldre detaljerad begärandelogg (rensas fortfarande om den finns)

## Lagringsschema

`audit_log` skapas vid behov av `ensureAuditLogSchema()` vid första användningen:

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

Index skapas för `timestamp`, `action`, `actor`, `resource_type`,
`status` och `request_id`. Kolumner som saknas i äldre databaser läggs till via
`ALTER TABLE` vid behov.

## Lagringstid och rensning

Två separata lagringsperioder används:

| Miljövariabel               | Standard | Gäller för                                                        |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Begränsning av antalet rader i `call_logs`                        |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Begränsning av antalet rader i `proxy_logs`                       |

`cleanupExpiredLogs()` kör lagringsrensningen. Den anropas när servern startas
från `src/instrumentation-node.ts`. Varje körning loggar en
`compliance.cleanup`-granskningshändelse med antalet borttagna poster per tabell. Rensning av proxy- och anropsloggar
görs i batchar (`BATCH_SIZE = 5000`) för att undvika långvariga skrivlås.

Manuell rensning av begärandehistorik är separat från lagringsrensningen. Sidan Request Logs
anropar `POST /api/settings/purge-request-history`, vilket tar bort `call_logs`,
äldre `request_detail_logs` och lokala begärandeartefakter under
`${DATA_DIR}/call_logs/`.

Standardvärden definieras i `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Frånsägning med `noLog` (per API-nyckel)

API-nycklar kan flaggas så att deras efterföljande anropstrafik inte loggas. Flaggan
finns i tabellen `api_keys` (`no_log INTEGER DEFAULT 0`) och speglas
i en minnesresident mängd för snabba uppslagningar.

```bash
# Skapa en nyckel utan loggning (administrativ autentisering krävs)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Hjälpfunktioner (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — växla den minnesresidenta posten
- `isNoLog(apiKeyId)` — kontrolleras i begärandesökvägen; använder som reserv en cachelagrad läsning från `api_keys.no_log`
  med 30 s giltighetstid
- `NO_LOG_API_KEY_IDS` (miljövariabel, kommaseparerad) — förladdas i den minnesresidenta
  mängden vid uppstart; användbart när du inte kan ändra kolumnen direkt

Administrativa granskningshändelser (inloggning, leverantörsändringar, MCP-verktygsanrop osv.)
påverkas **inte** av `noLog` — endast trafikloggning per begäran
väljs bort.

## REST API

| Slutpunkt                   | Metod | Beskrivning                                             | Autentisering |
| --------------------------- | ----- | ------------------------------------------------------- | ------------- |
| `/api/compliance/audit-log` | `GET` | Sidindelade administrationsgranskningsposter med filter | management    |
| `/api/mcp/audit`            | `GET` | Sidindelade granskningsposter för MCP-verktyg           | (open-sse)    |
| `/api/mcp/audit/stats`      | `GET` | Aggregerad MCP-granskningsstatistik                     | (open-sse)    |

Ingen slutpunkt för CSV-export ingår för närvarande – exportera från instrumentpanelen eller fråga
SQLite-databasen direkt.

### Frågor mot `/api/compliance/audit-log`

Frågeparametrar som stöds (alla är valfria och alla använder `LIKE %value%`-matchning för
textfilter):

- `action`, `actor`, `target`, `resourceType` (eller `resource_type`),
  `status`, `requestId` (eller `request_id`)
- `from` / `since`, `to` / `until` – ISO-tidsstämplar
- `limit` (standardvärde `50`, minst `1`, högst `500`)
- `offset` (standardvärde `0`, högst `10_000`)

Svaret är en JSON-array. Metadata för sidindelning returneras i rubrikerna:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Instrumentpanel

Instrumentpanelen visar granskningsdata på **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Sidan har två flikar:

- **Efterlevnad** (`ComplianceTab.tsx`) – administrativa granskningshändelser från
  `/api/compliance/audit-log`. Filtrerar efter händelsetyp, allvarlighetsgrad (information / varning
  / kritisk, härledd från åtgärd + status) och datumintervall. Allvarlighetsgraden
  beräknas på klientsidan utifrån åtgärds-/statussträngarna.
- **MCP** (`McpAuditTab.tsx`) – granskning av MCP-verktyg från `/api/mcp/audit`, med
  filter efter verktygsnamn och lyckat/misslyckat resultat.

Båda flikarna använder sidindelning med sidstorlekarna `50` (efterlevnad) respektive `25` (MCP).

## Hjälpfunktioner för leverantörsuppgifter

`src/lib/compliance/providerAudit.ts` tillhandahåller formateringsfunktioner som används av
rutterna för leverantörshantering när de genererar händelser för autentiseringsuppgifter:

- `summarizeProviderConnectionForAudit(connection)` – tar bort `apiKey`,
  `accessToken`, `refreshToken`, `idToken` och
  `providerSpecificData.consoleApiKey` innan anslutningsögonblicksbilden
  skrivs till `details`.
- `getProviderAuditTarget(connection)` – skapar en stabil
  `"<provider>:<name|id>"`-sträng för fältet `target`.
- `extractProviderWarnings(...payloads)` – söker igenom leverantörssvar efter
  policy-/säkerhetsvarningar (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) och
  visar upp till 5 träffar, var och en avkortad till 400 tecken.

## Bästa praxis

- Markera API-nycklar som hanterar personligt identifierbar information (juridisk, medicinsk osv.) med `noLog: true`.
- Justera `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` så att de uppfyller er
  lagringspolicy. Standardvärdena på 7 dagar är konservativa.
- Exportera granskningstabellen från plattformen (`sqlite3 dump`) med den frekvens
  som ert efterlevnadsprogram kräver – det finns ingen inbyggd arkivering.
- Övervaka antalet `auth.login.failed` och `auth.login.locked` för att
  upptäcka råstyrkeattacker.
- När ni lägger till nya administrativa slutpunkter ska ni anropa `logAuditEvent({ ... })` med en stabil
  åtgärdssträng i formatet `domain.verb.outcome` och skicka med begärandekontexten via
  `getAuditRequestContext(request)` så att IP-adress och `requestId` registreras
  automatiskt.

## Se även

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskering av personuppgifter, promptinjektion
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalog över MCP-verktyg och behörighetsomfång
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — fullständig referens för miljövariabler
- Källkod: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
