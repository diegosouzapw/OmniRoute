# Compliance & Audit (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Bron van waarheid:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Laatst bijgewerkt:** 2026-06-28 — v3.8.40

OmniRoute registreert beheeracties, authenticatiegebeurtenissen, wijzigingen in de levenscyclus van providerreferenties en aanroepen van MCP-tools in door SQLite ondersteunde audittabellen. Deze pagina beschrijft wat er wordt gelogd, waar de gegevens worden opgeslagen, hoe lang ze worden bewaard, hoe API-sleutels zich kunnen afmelden en hoe u de gegevens kunt opvragen.

De implementatie bevindt zich in `src/lib/compliance/index.ts` (T-43 — "Compliancecontroles") en `src/lib/compliance/providerAudit.ts`. Audit-schrijfbewerkingen genereren nooit een fout: bij elke fout wordt de aanroep stilzwijgend genegeerd, zodat auditlogging de verwerking van het hoofdverzoek niet kan verstoren.

## Wat wordt gelogd

### Administratieve auditgebeurtenissen (`audit_log`)

Elke aanroep van `logAuditEvent({ action, actor, target, details, ... })` levert één rij op. Actietekenreeksen volgen een patroon van `domain.verb` (of `domain.verb.outcome`). In de broncode bevestigde actietypen zijn onder meer:

| Actie                                | Bron                                    |
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

Elke vermelding bevat `action`, `actor` (standaard `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` en `timestamp`. Gevoelige sleutels (`apiKey`, `accessToken`, `refreshToken`, `password`, alles wat overeenkomt met `*token`/`*secret`/`*apikey`, enz.) worden recursief geredigeerd tot `"[redacted]"` voordat de rij wordt weggeschreven.

### MCP-toolaanroepen (`mcp_tool_audit`)

Elke aanroep van een MCP-tool schrijft een rij via `open-sse/mcp-server/audit.ts`. Schema (uit `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Kolom            | Opmerkingen                                 |
| ---------------- | ------------------------------------------- |
| `id`             | automatisch ophogend                        |
| `tool_name`      | identificatie van de MCP-tool               |
| `input_hash`     | sha256 van invoer (geen payload opgeslagen) |
| `output_summary` | korte, ingekorte samenvatting               |
| `duration_ms`    | verstreken tijd                             |
| `api_key_id`     | aanroeper (kan null zijn)                   |
| `success`        | `1` / `0`                                   |
| `error_code`     | definitieve foutcode bij mislukking         |
| `created_at`     | ISO-tijdstempel                             |

### Verzoek-/gebruikslogboeken

Dit zijn operationele telemetriegegevens (niet strikt administratieve auditgegevens), maar ze gebruiken dezelfde retentiepijplijn:

- `usage_history` — samengevoegde gebruiksgegevens per verzoek
- `call_logs` — volledig logboek per verzoek (onderworpen aan een rijlimiet, zie hieronder)
- `proxy_logs` — logboek van proxyverkeer (onderworpen aan een rijlimiet)
- `request_detail_logs` — verouderd gedetailleerd verzoeklogboek (wordt nog steeds opgeschoond indien aanwezig)

## Opslagschema

`audit_log` wordt bij het eerste gebruik dynamisch aangemaakt door `ensureAuditLogSchema()`:

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

Er worden indexen aangemaakt voor `timestamp`, `action`, `actor`, `resource_type`,
`status` en `request_id`. Ontbrekende kolommen in oudere databases worden indien
nodig toegevoegd via `ALTER TABLE`.

## Bewaartermijnen en opschoning

Er worden twee afzonderlijke bewaartermijnen gehanteerd:

| Omgevingsvariabele          | Standaard | Van toepassing op                                                 |
| --------------------------- | --------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`       | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`       | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000`  | Limiet op het aantal rijen voor `call_logs`                       |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000`  | Limiet op het aantal rijen voor `proxy_logs`                      |

`cleanupExpiredLogs()` voert de opschoning op basis van de bewaartermijnen uit. Deze functie wordt bij het opstarten van de server
aangeroepen vanuit `src/instrumentation-node.ts`. Bij elke uitvoering wordt een
`compliance.cleanup`-auditgebeurtenis vastgelegd met het aantal verwijderde rijen per tabel. Het inkorten van proxy-/aanroeplogboeken
wordt in batches uitgevoerd (`BATCH_SIZE = 5000`) om langdurige schrijfvergrendelingen te voorkomen.

Handmatige opschoning van de aanvraaggeschiedenis staat los van de bewaartermijnen. De pagina Aanvraaglogboeken
roept `POST /api/settings/purge-request-history` aan, waarmee `call_logs`,
de verouderde `request_detail_logs` en lokale aanvraagartefacten onder
`${DATA_DIR}/call_logs/` worden verwijderd.

De standaardwaarden zijn gedefinieerd in `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Afmelden voor logregistratie met `noLog` (per API-sleutel)

API-sleutels kunnen worden gemarkeerd zodat hun verdere aanroepverkeer niet wordt vastgelegd. De
vlag bevindt zich in de tabel `api_keys` (`no_log INTEGER DEFAULT 0`) en wordt
gespiegeld naar een set in het geheugen voor snelle zoekacties in veelgebruikte codepaden.

```bash
# Maak een sleutel zonder logregistratie aan (beheerderauthenticatie vereist)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Hulpfuncties (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — schakelt de vermelding in het geheugen in of uit
- `isNoLog(apiKeyId)` — wordt gecontroleerd in het aanvraagpad; valt terug op een gedurende 30 s
  gecachete uitlezing van `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (omgevingsvariabele, kommagescheiden) — wordt tijdens het opstarten vooraf in de set in het geheugen
  geladen; nuttig wanneer u de kolom niet rechtstreeks kunt wijzigen

Administratieve auditgebeurtenissen (aanmeldingen, providerwijzigingen, aanroepen van MCP-tools enzovoort)
worden **niet** beïnvloed door `noLog` — alleen de registratie van verkeer per aanvraag wordt
uitgeschakeld.

## REST-API

| Endpoint                    | Methode | Beschrijving                                     | Auth       |
| --------------------------- | ------- | ------------------------------------------------ | ---------- |
| `/api/compliance/audit-log` | `GET`   | Gepagineerde beheerauditvermeldingen met filters | management |
| `/api/mcp/audit`            | `GET`   | Gepagineerde auditvermeldingen voor MCP-tools    | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`   | Geaggregeerde MCP-auditstatistieken              | (open-sse) |

Er wordt momenteel geen eindpunt voor CSV-export meegeleverd — exporteer vanuit het dashboard of voer rechtstreeks query's uit op de SQLite-database.

### Query's uitvoeren op `/api/compliance/audit-log`

Ondersteunde queryparameters (allemaal optioneel; alle tekstfilters gebruiken overeenkomsten op basis van `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (of `resource_type`),
  `status`, `requestId` (of `request_id`)
- `from` / `since`, `to` / `until` — ISO-tijdstempels
- `limit` (standaard `50`, min. `1`, max. `500`)
- `offset` (standaard `0`, max. `10_000`)

Het antwoord is een JSON-array. Metagegevens voor paginering worden geretourneerd in headers:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

Het dashboard maakt auditgegevens beschikbaar via **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). De pagina heeft twee tabbladen:

- **Compliance** (`ComplianceTab.tsx`) — beheerauditgebeurtenissen uit
  `/api/compliance/audit-log`. Filtert op gebeurtenistype, ernst (info / waarschuwing
  / kritiek, afgeleid van actie + status) en datumbereik. De ernst wordt
  aan de clientzijde berekend op basis van de actie- en statustekenreeksen.
- **MCP** (`McpAuditTab.tsx`) — audit van MCP-tools uit `/api/mcp/audit`, met
  filters op toolnaam en geslaagd/mislukt.

Beide tabbladen gebruiken paginering met paginagroottes van `50` (compliance) en `25` (MCP).

## Hulpfuncties voor providerreferenties

`src/lib/compliance/providerAudit.ts` biedt opmaakhulpfuncties die door de routes voor providerbeheer worden gebruikt wanneer deze referentiegebeurtenissen uitsturen:

- `summarizeProviderConnectionForAudit(connection)` — verwijdert `apiKey`,
  `accessToken`, `refreshToken`, `idToken` en
  `providerSpecificData.consoleApiKey` voordat de momentopname van de verbinding naar
  `details` wordt geschreven.
- `getProviderAuditTarget(connection)` — stelt een stabiele
  `"<provider>:<name|id>"`-tekenreeks samen voor het veld `target`.
- `extractProviderWarnings(...payloads)` — scant providerantwoorden op
  beleids-/veiligheidswaarschuwingen (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) en
  toont maximaal 5 treffers, elk ingekort tot 400 tekens.

## Best practices

- Markeer API-sleutels die persoonsgegevens verwerken (juridisch, medisch enz.) met `noLog: true`.
- Stem `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` af op uw
  bewaarbeleid. De standaardwaarden van 7 dagen zijn conservatief.
- Exporteer de audittabel buiten het platform (`sqlite3 dump`) met de frequentie
  die uw complianceprogramma vereist — er is geen ingebouwde archivering.
- Houd de aantallen `auth.login.failed` en `auth.login.locked` bij om
  brute-forceaanvallen te detecteren.
- Roep bij het toevoegen van nieuwe beheereindpunten `logAuditEvent({ ... })` aan met een stabiele
  actietekenreeks in de vorm `domain.verb.outcome` en geef de aanvraagcontext door via
  `getAuditRequestContext(request)`, zodat het IP-adres en de `requestId` automatisch
  worden vastgelegd.

## Zie ook

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskering van persoonsgegevens, promptinjectie
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — catalogus en bereiken van MCP-tools
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — volledige referentie voor omgevingsvariabelen
- Bron: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
