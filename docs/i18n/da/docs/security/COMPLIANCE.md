# Compliance & Audit (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Sandhedskilde:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Senest opdateret:** 2026-06-28 — v3.8.40

OmniRoute registrerer administrative handlinger, godkendelseshændelser, ændringer i livscyklussen for udbyderlegitimationsoplysninger og kald af MCP-værktøjer i SQLite-baserede revisionstabeller. Denne side beskriver, hvad der logges, hvor det gemmes, hvor længe det opbevares, hvordan API-nøgler kan fravælge logning, og hvordan dataene kan forespørges.

Implementeringen findes i `src/lib/compliance/index.ts` (T-43 — "Overholdelseskontroller") og `src/lib/compliance/providerAudit.ts`. Revisionsskrivninger kaster aldrig fejl: Ved enhver fejl ignoreres kaldet lydløst, så revisionslogning ikke kan afbryde hovedflowet for anmodningen.

## Hvad logges

### Administrative revisionshændelser (`audit_log`)

Hvert kald til `logAuditEvent({ action, actor, target, details, ... })` opretter én række. Handlingsstrenge følger mønstret `domain.verb` (eller `domain.verb.outcome`). Bekræftede handlingstyper i kildekoden omfatter:

| Handling                             | Kilde                                   |
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

Hver post registrerer `action`, `actor` (har som standard værdien `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` og `timestamp`. Følsomme nøgler (`apiKey`, `accessToken`, `refreshToken`, `password`, alt, der matcher `*token`/`*secret`/`*apikey` osv.) maskeres rekursivt som `"[redacted]"`, før rækken skrives.

### Kald af MCP-værktøjer (`mcp_tool_audit`)

Hvert kald af et MCP-værktøj skriver en række via `open-sse/mcp-server/audit.ts`. Skema (fra `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Kolonne          | Bemærkninger                             |
| ---------------- | ---------------------------------------- |
| `id`             | automatisk inkrementering                |
| `tool_name`      | MCP-værktøjsidentifikator                |
| `input_hash`     | sha256 af input (ingen nyttedata gemmes) |
| `output_summary` | kort, afkortet opsummering               |
| `duration_ms`    | forløbet tid                             |
| `api_key_id`     | kalder (kan være null)                   |
| `success`        | `1` / `0`                                |
| `error_code`     | afsluttende fejlkode ved fejl            |
| `created_at`     | ISO-tidsstempel                          |

### Anmodnings-/forbrugslogfiler

Disse er driftsmæssig telemetri (ikke udelukkende administrativ revision), men bruger den samme opbevaringspipeline:

- `usage_history` — samlet forbrug pr. anmodning
- `call_logs` — fuldstændig log pr. anmodning (underlagt rækkegrænse, se nedenfor)
- `proxy_logs` — log over proxytrafik (underlagt rækkegrænse)
- `request_detail_logs` — ældre detaljeret anmodningslog (beskæres stadig, hvis den findes)

## Lagringsskema

`audit_log` oprettes efter behov af `ensureAuditLogSchema()` ved første brug:

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

Der oprettes indekser på `timestamp`, `action`, `actor`, `resource_type`,
`status` og `request_id`. Manglende kolonner i ældre databaser tilføjes efter
behov via `ALTER TABLE`.

## Opbevaring og oprydning

To separate opbevaringsperioder overholdes:

| Miljøvariabel               | Standard | Gælder for                                                        |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Begrænsning af antal rækker i `call_logs`                         |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Begrænsning af antal rækker i `proxy_logs`                        |

`cleanupExpiredLogs()` udfører oprydningen i henhold til opbevaringsperioderne. Den kaldes ved serverstart
fra `src/instrumentation-node.ts`. Hver kørsel logger en
`compliance.cleanup`-revisionshændelse med antallet af slettede rækker pr. tabel. Beskæring af proxy-/kaldslogfiler
udføres i batches (`BATCH_SIZE = 5000`) for at undgå langvarige skrivelåse.

Manuel oprydning af anmodningshistorik er adskilt fra den automatiske opbevaring. Siden Request Logs
kalder `POST /api/settings/purge-request-history`, som sletter `call_logs`,
ældre `request_detail_logs` og lokale anmodningsartefakter under
`${DATA_DIR}/call_logs/`.

Standardværdier er defineret i `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Fravalg med `noLog` (pr. API-nøgle)

API-nøgler kan markeres, så deres efterfølgende kaldstrafik ikke logges.
Flaget findes i tabellen `api_keys` (`no_log INTEGER DEFAULT 0`) og afspejles
i et sæt i hukommelsen til hurtige opslag.

```bash
# Opret en nøgle uden logning (administrationsgodkendelse påkrævet)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Hjælpefunktioner (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — aktiver eller deaktiver posten i hukommelsen
- `isNoLog(apiKeyId)` — kontrolleres på anmodningsstien; falder tilbage til en 30 sekunders
  cachelagret læsning fra `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (miljøvariabel, kommasepareret) — indlæses på forhånd i sættet i hukommelsen
  ved opstart; nyttigt, når du ikke kan ændre kolonnen direkte

Administrative revisionshændelser (login, leverandørændringer, MCP-værktøjskald osv.)
påvirkes **ikke** af `noLog` — det er kun trafiklogning pr. anmodning, der
fravælges.

## REST API

| Slutpunkt                   | Metode | Beskrivelse                                          | Godkendelse |
| --------------------------- | ------ | ---------------------------------------------------- | ----------- |
| `/api/compliance/audit-log` | `GET`  | Sideinddelte administratorrevisionsposter med filtre | management  |
| `/api/mcp/audit`            | `GET`  | Sideinddelte MCP-værktøjsrevisionsposter             | (open-sse)  |
| `/api/mcp/audit/stats`      | `GET`  | Aggregerede MCP-revisionsstatistikker                | (open-sse)  |

Der leveres i øjeblikket ikke noget slutpunkt til CSV-eksport — eksportér fra dashboardet, eller forespørg
SQLite-databasen direkte.

### Forespørgsler til `/api/compliance/audit-log`

Understøttede forespørgselsparametre (alle er valgfrie, og alle bruger `LIKE %value%`-matchning til
tekstfiltre):

- `action`, `actor`, `target`, `resourceType` (eller `resource_type`),
  `status`, `requestId` (eller `request_id`)
- `from` / `since`, `to` / `until` — ISO-tidsstempler
- `limit` (standard `50`, min. `1`, maks. `500`)
- `offset` (standard `0`, maks. `10_000`)

Svaret er et JSON-array. Metadata om sideinddeling returneres i headere:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

Dashboardet viser revisionsdata på **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Siden har to faner:

- **Overholdelse** (`ComplianceTab.tsx`) — administratorrevisionshændelser fra
  `/api/compliance/audit-log`. Filtrerer efter hændelsestype, alvorlighedsgrad (information / advarsel
  / kritisk, afledt af handling + status) og datointerval. Alvorlighedsgraden
  beregnes på klientsiden ud fra handlings-/statusstrengene.
- **MCP** (`McpAuditTab.tsx`) — MCP-værktøjsrevision fra `/api/mcp/audit` med
  filtre efter værktøjsnavn og gennemført/mislykket.

Begge faner bruger sideinddeling med sidestørrelser på henholdsvis `50` (overholdelse) og `25` (MCP).

## Hjælpefunktioner til udbyderlegitimationsoplysninger

`src/lib/compliance/providerAudit.ts` indeholder formateringshjælpefunktioner, som bruges af
ruterne til udbyderadministration, når de udsender legitimationshændelser:

- `summarizeProviderConnectionForAudit(connection)` — fjerner `apiKey`,
  `accessToken`, `refreshToken`, `idToken` og
  `providerSpecificData.consoleApiKey`, før forbindelsens snapshot
  skrives til `details`.
- `getProviderAuditTarget(connection)` — sammensætter en stabil
  `"<provider>:<name|id>"`-streng til feltet `target`.
- `extractProviderWarnings(...payloads)` — scanner udbydersvar for
  politik-/sikkerhedsadvarsler (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) og
  returnerer op til 5 fund, som hver afkortes til 400 tegn.

## Bedste praksis

- Markér API-nøgler, der håndterer personhenførbare oplysninger (juridiske, medicinske osv.), med `noLog: true`.
- Tilpas `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS`, så de opfylder jeres
  opbevaringspolitik. Standardværdierne på 7 dage er konservative.
- Eksportér revisionstabellen væk fra platformen (`sqlite3 dump`) med det interval,
  som jeres complianceprogram kræver — der findes ingen indbygget arkivering.
- Overvåg antallet af `auth.login.failed` og `auth.login.locked` for at
  opdage brute force-angreb.
- Når du tilføjer nye administratorslutpunkter, skal du kalde `logAuditEvent({ ... })` med en stabil
  `domain.verb.outcome`-handlingsstreng og videregive anmodningskonteksten via
  `getAuditRequestContext(request)`, så IP-adressen og `requestId` registreres
  automatisk.

## Se også

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskering af personhenførbare oplysninger, promptinjektion
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalog over MCP-værktøjer og adgangsomfang
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — komplet reference til miljøvariabler
- Kilde: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
