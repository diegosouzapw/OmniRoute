# Compliance & Audit (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Sannhetskilde:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Sist oppdatert:** 2026-06-28 — v3.8.40

OmniRoute registrerer administrative handlinger, autentiseringshendelser, endringer i livssyklusen til leverandørlegitimasjon og kall til MCP-verktøy i SQLite-baserte revisjonstabeller. Denne siden beskriver hva som logges, hvor det lagres, hvor lenge det beholdes, hvordan API-nøkler kan reservere seg, og hvordan dataene kan spørres.

Implementasjonen finnes i `src/lib/compliance/index.ts` (T-43 — «Samsvarskontroller») og `src/lib/compliance/providerAudit.ts`. Revisjonsskriving utløser aldri unntak: Ved enhver feil ignoreres kallet uten melding, slik at revisjonslogging ikke kan avbryte hovedflyten for forespørsler.

## Hva som logges

### Administrative revisjonshendelser (`audit_log`)

Hvert kall til `logAuditEvent({ action, actor, target, details, ... })` oppretter én rad. Handlingsstrenger følger mønsteret `domain.verb` (eller `domain.verb.outcome`). Bekreftede handlingstyper i kodetreet inkluderer:

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

Hver oppføring registrerer `action`, `actor` (standardverdien er `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` og `timestamp`. Sensitive nøkler (`apiKey`, `accessToken`, `refreshToken`, `password`, alt som samsvarer med `*token`/`*secret`/`*apikey` osv.) maskeres rekursivt som `"[redacted]"` før raden skrives.

### Kall til MCP-verktøy (`mcp_tool_audit`)

Hvert kall til et MCP-verktøy skriver en rad via `open-sse/mcp-server/audit.ts`. Skjema (fra `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Kolonne          | Merknader                                  |
| ---------------- | ------------------------------------------ |
| `id`             | automatisk økende                          |
| `tool_name`      | identifikator for MCP-verktøy              |
| `input_hash`     | sha256 av inndata (ingen nyttelast lagres) |
| `output_summary` | kort, avkortet sammendrag                  |
| `duration_ms`    | medgått tid                                |
| `api_key_id`     | innringer (kan være null)                  |
| `success`        | `1` / `0`                                  |
| `error_code`     | endelig feilkode ved feil                  |
| `created_at`     | ISO-tidsstempel                            |

### Forespørsels-/brukslogger

Dette er driftsrelatert telemetri (ikke utelukkende administrativ revisjon), men bruker den samme oppbevaringsprosessen:

- `usage_history` — aggregert bruk per forespørsel
- `call_logs` — fullstendig logg per forespørsel (underlagt radgrense, se nedenfor)
- `proxy_logs` — logg over proxytrafikk (underlagt radgrense)
- `request_detail_logs` — eldre detaljert forespørselslogg (fjernes fortsatt hvis den finnes)

## Lagringsskjema

`audit_log` opprettes ved behov av `ensureAuditLogSchema()` ved første gangs bruk:

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

Indekser opprettes for `timestamp`, `action`, `actor`, `resource_type`,
`status` og `request_id`. Manglende kolonner i eldre databaser legges til via
`ALTER TABLE` ved behov.

## Oppbevaring og opprydding

To separate oppbevaringsperioder brukes:

| Miljøvariabel               | Standard | Gjelder for                                                       |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Begrensning av antall rader for `call_logs`                       |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Begrensning av antall rader for `proxy_logs`                      |

`cleanupExpiredLogs()` kjører oppbevaringsprosessen. Den startes ved serveroppstart
fra `src/instrumentation-node.ts`. Hver kjøring logger en
`compliance.cleanup`-revisjonshendelse med antall slettede rader per tabell. Beskjæring av proxy-/anropslogger
utføres satsvis (`BATCH_SIZE = 5000`) for å unngå langvarige skrivelåser.

Manuell opprydding av forespørselshistorikk er atskilt fra oppbevaringsprosessen. Siden Forespørselslogger
kaller `POST /api/settings/purge-request-history`, som sletter `call_logs`,
eldre `request_detail_logs` og lokale forespørselsartefakter under
`${DATA_DIR}/call_logs/`.

Standardverdiene er definert i `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Reservasjon mot `noLog` (per API-nøkkel)

API-nøkler kan merkes slik at etterfølgende anropstrafikk for dem ikke logges. Flagget
ligger i tabellen `api_keys` (`no_log INTEGER DEFAULT 0`) og speiles
i et sett i minnet for raske oppslag.

```bash
# Opprett en nøkkel uten logging (administrasjonsautentisering kreves)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Hjelpefunksjoner (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — aktiver eller deaktiver oppføringen i minnet
- `isNoLog(apiKeyId)` — kontrolleres i forespørselsflyten; faller tilbake til en 30 sekunders
  hurtigbufret lesing fra `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (miljøvariabel, kommaseparert) — forhåndslastes i settet i minnet
  ved oppstart; nyttig når du ikke kan endre kolonnen direkte

Administrative revisjonshendelser (innlogging, leverandørendringer, MCP-verktøykall osv.)
påvirkes **ikke** av `noLog` — reservasjonen gjelder bare logging av trafikk
per forespørsel.

## REST-API

| Endepunkt                   | Metode | Beskrivelse                                            | Autentisering |
| --------------------------- | ------ | ------------------------------------------------------ | ------------- |
| `/api/compliance/audit-log` | `GET`  | Paginerte administratorrevisjonsoppføringer med filtre | management    |
| `/api/mcp/audit`            | `GET`  | Paginerte revisjonsoppføringer for MCP-verktøy         | (open-sse)    |
| `/api/mcp/audit/stats`      | `GET`  | Aggregert MCP-revisjonsstatistikk                      | (open-sse)    |

Det leveres for øyeblikket ikke noe endepunkt for CSV-eksport — eksporter fra kontrollpanelet eller spør
SQLite-databasen direkte.

### Spørring mot `/api/compliance/audit-log`

Støttede spørringsparametere (alle er valgfrie, og alle bruker `LIKE %value%`-samsvar for
tekstfiltre):

- `action`, `actor`, `target`, `resourceType` (eller `resource_type`),
  `status`, `requestId` (eller `request_id`)
- `from` / `since`, `to` / `until` — ISO-tidsstempler
- `limit` (standard `50`, min. `1`, maks. `500`)
- `offset` (standard `0`, maks. `10_000`)

Responsen er en JSON-tabell. Sideinndelingsmetadata returneres i headere:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Kontrollpanel

Kontrollpanelet viser revisjonsdata på **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Siden har to faner:

- **Samsvar** (`ComplianceTab.tsx`) — administratorrevisjonshendelser fra
  `/api/compliance/audit-log`. Filtrerer etter hendelsestype, alvorlighetsgrad (info / advarsel
  / kritisk, utledet fra handling + status) og datointervall. Alvorlighetsgraden
  beregnes på klientsiden fra handlings-/statusstrengene.
- **MCP** (`McpAuditTab.tsx`) — revisjon av MCP-verktøy fra `/api/mcp/audit`, med
  filtre etter verktøynavn og vellykket/mislykket resultat.

Begge fanene bruker sideinndeling med sidestørrelser på `50` (samsvar) og `25` (MCP).

## Hjelpefunksjoner for leverandørlegitimasjon

`src/lib/compliance/providerAudit.ts` inneholder formateringsfunksjoner som brukes av
rutene for leverandøradministrasjon når de genererer legitimasjonshendelser:

- `summarizeProviderConnectionForAudit(connection)` — fjerner `apiKey`,
  `accessToken`, `refreshToken`, `idToken` og
  `providerSpecificData.consoleApiKey` før øyeblikksbildet av tilkoblingen
  skrives til `details`.
- `getProviderAuditTarget(connection)` — setter sammen en stabil
  `"<provider>:<name|id>"`-streng for `target`-feltet.
- `extractProviderWarnings(...payloads)` — skanner leverandørresponser etter
  policy-/sikkerhetsadvarsler (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) og
  viser opptil 5 treff, hvert avkortet til 400 tegn.

## Anbefalte fremgangsmåter

- Merk API-nøkler som håndterer personopplysninger (juridiske, medisinske osv.) med `noLog: true`.
- Juster `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` for å oppfylle
  retningslinjene for datalagring. Standardverdiene på 7 dager er konservative.
- Eksporter revisjonstabellen fra plattformen (`sqlite3 dump`) med intervallet
  samsvarsprogrammet krever — det finnes ingen innebygd arkivering.
- Overvåk antall `auth.login.failed` og `auth.login.locked` for å oppdage
  brute-force-angrep.
- Når du legger til nye administratorendepunkter, kall `logAuditEvent({ ... })` med en stabil
  `domain.verb.outcome`-handlingsstreng, og send forespørselskonteksten via
  `getAuditRequestContext(request)` slik at IP-adresse og `requestId` registreres
  automatisk.

## Se også

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskering av PII, promptinjeksjon
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalog over MCP-verktøy og omfang
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — fullstendig referanse for miljøvariabler
- Kilde: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
