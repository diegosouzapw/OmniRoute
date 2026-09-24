# Compliance & Audit (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇰🇷 [ko](../../../ko/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **Quelle der Wahrheit:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Zuletzt aktualisiert:** 2026-06-28 — v3.8.40

OmniRoute protokolliert administrative Aktionen, Authentifizierungsereignisse, Änderungen am Lebenszyklus von Anbieterzugangsdaten und Aufrufe von MCP-Tools in SQLite-gestützten Audit-Tabellen. Diese Seite beschreibt, was protokolliert wird, wo die Daten gespeichert werden, wie lange sie aufbewahrt werden, wie API-Schlüssel die Protokollierung deaktivieren können und wie die Daten abgefragt werden können.

Die Implementierung befindet sich in `src/lib/compliance/index.ts` (T-43 — „Compliance-Kontrollen“) und `src/lib/compliance/providerAudit.ts`. Audit-Schreibvorgänge lösen niemals Ausnahmen aus: Bei einem Fehler wird dieser stillschweigend abgefangen, damit die Audit-Protokollierung den eigentlichen Anfrageablauf nicht unterbrechen kann.

## Was protokolliert wird

### Administrative Audit-Ereignisse (`audit_log`)

Jeder Aufruf von `logAuditEvent({ action, actor, target, details, ... })` erzeugt eine Zeile. Aktionszeichenfolgen folgen dem Muster `domain.verb` (oder `domain.verb.outcome`). Zu den im Quellcode bestätigten Aktionstypen gehören:

| Aktion                               | Quelle                                  |
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

Jeder Eintrag erfasst `action`, `actor` (standardmäßig `"system"`), `target`, `details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`, `request_id` und `timestamp`. Vertrauliche Schlüssel (`apiKey`, `accessToken`, `refreshToken`, `password`, alle mit `*token`/`*secret`/`*apikey` übereinstimmenden Schlüssel usw.) werden rekursiv durch `"[redacted]"` ersetzt, bevor die Zeile geschrieben wird.

### MCP-Tool-Aufrufe (`mcp_tool_audit`)

Jeder Aufruf eines MCP-Tools schreibt über `open-sse/mcp-server/audit.ts` eine Zeile. Schema (aus `src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Spalte           | Hinweise                                         |
| ---------------- | ------------------------------------------------ |
| `id`             | automatisch inkrementiert                        |
| `tool_name`      | MCP-Tool-Kennung                                 |
| `input_hash`     | sha256 der Eingabe (keine Nutzdaten gespeichert) |
| `output_summary` | kurze, gekürzte Zusammenfassung                  |
| `duration_ms`    | verstrichene Zeit                                |
| `api_key_id`     | Aufrufer (kann NULL sein)                        |
| `success`        | `1` / `0`                                        |
| `error_code`     | abschließender Fehlercode bei einem Fehler       |
| `created_at`     | ISO-Zeitstempel                                  |

### Anfrage-/Nutzungsprotokolle

Dabei handelt es sich um operative Telemetriedaten (nicht ausschließlich um administrative Audit-Daten), sie verwenden jedoch dieselbe Aufbewahrungspipeline:

- `usage_history` — aggregierte Nutzung pro Anfrage
- `call_logs` — vollständiges Protokoll pro Anfrage (unterliegt einer Zeilenobergrenze, siehe unten)
- `proxy_logs` — Proxy-Datenverkehrsprotokoll (unterliegt einer Zeilenobergrenze)
- `request_detail_logs` — veraltetes detailliertes Anfrageprotokoll (wird weiterhin bereinigt, sofern vorhanden)

## Speicherschema

`audit_log` wird bei der ersten Verwendung von `ensureAuditLogSchema()` bedarfsgesteuert erstellt:

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

Indizes werden für `timestamp`, `action`, `actor`, `resource_type`, `status` und `request_id` erstellt. Fehlende Spalten in älteren Datenbanken werden bei Bedarf über `ALTER TABLE` hinzugefügt.

## Aufbewahrung und Bereinigung

Es werden zwei separate Aufbewahrungszeiträume berücksichtigt:

| Umgebungsvariable           | Standard | Gilt für                                                          |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Zeilenbegrenzung für `call_logs`                                  |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Zeilenbegrenzung für `proxy_logs`                                 |

`cleanupExpiredLogs()` führt die Aufbewahrungsbereinigung aus. Die Funktion wird beim Serverstart von `src/instrumentation-node.ts` aufgerufen. Bei jedem Durchlauf wird ein `compliance.cleanup`-Audit-Ereignis mit der Anzahl der gelöschten Einträge pro Tabelle protokolliert. Das Kürzen der Proxy-/Aufrufprotokolle erfolgt stapelweise (`BATCH_SIZE = 5000`), um lange Schreibsperren zu vermeiden.

Die manuelle Bereinigung des Anfrageverlaufs erfolgt unabhängig von der Aufbewahrungsbereinigung. Die Seite „Anfrageprotokolle“ ruft `POST /api/settings/purge-request-history` auf, wodurch `call_logs`, ältere `request_detail_logs` sowie lokale Anfrageartefakte unter `${DATA_DIR}/call_logs/` gelöscht werden.

Die Standardwerte sind in `src/lib/logEnv.ts` definiert (`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog`-Opt-out (pro API-Schlüssel)

API-Schlüssel können so gekennzeichnet werden, dass der Datenverkehr ihrer nachgelagerten Aufrufe nicht protokolliert wird. Das Flag befindet sich in der Tabelle `api_keys` (`no_log INTEGER DEFAULT 0`) und wird für schnelle Abfragen im Verarbeitungspfad in eine In-Memory-Menge gespiegelt.

```bash
# Einen Schlüssel ohne Protokollierung erstellen (Verwaltungsauthentifizierung erforderlich)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Hilfsfunktionen (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — schaltet den In-Memory-Eintrag um
- `isNoLog(apiKeyId)` — wird im Anfragepfad geprüft; greift ersatzweise auf einen für 30 s zwischengespeicherten Lesezugriff auf `api_keys.no_log` zurück
- `NO_LOG_API_KEY_IDS` (Umgebungsvariable, kommagetrennt) — wird beim Start in die In-Memory-Menge vorgeladen; nützlich, wenn die Spalte nicht direkt geändert werden kann

Administrative Audit-Ereignisse (Anmeldung, Anbieteränderungen, MCP-Tool-Aufrufe usw.) sind **nicht** von `noLog` betroffen — nur die Protokollierung des Datenverkehrs einzelner Anfragen wird deaktiviert.

## REST-API

| Endpunkt                    | Methode | Beschreibung                                | Authentifizierung |
| --------------------------- | ------- | ------------------------------------------- | ----------------- |
| `/api/compliance/audit-log` | `GET`   | Paginierte Admin-Audit-Einträge mit Filtern | Verwaltung        |
| `/api/mcp/audit`            | `GET`   | Paginierte Audit-Einträge für MCP-Tools     | (open-sse)        |
| `/api/mcp/audit/stats`      | `GET`   | Aggregierte MCP-Audit-Statistiken           | (open-sse)        |

Derzeit wird kein Endpunkt für den CSV-Export bereitgestellt — exportieren Sie die Daten über das Dashboard oder fragen Sie
die SQLite-Datenbank direkt ab.

### Abfragen von `/api/compliance/audit-log`

Unterstützte Abfrageparameter (alle optional; alle verwenden für Textfilter einen
Abgleich nach dem Muster `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (oder `resource_type`),
  `status`, `requestId` (oder `request_id`)
- `from` / `since`, `to` / `until` — ISO-Zeitstempel
- `limit` (Standardwert `50`, Minimum `1`, Maximum `500`)
- `offset` (Standardwert `0`, Maximum `10_000`)

Die Antwort ist ein JSON-Array. Metadaten zur Paginierung werden in den Headern zurückgegeben:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

Das Dashboard stellt Audit-Daten unter **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`) bereit. Die Seite verfügt über zwei Registerkarten:

- **Compliance** (`ComplianceTab.tsx`) — Admin-Audit-Ereignisse aus
  `/api/compliance/audit-log`. Filterung nach Ereignistyp, Schweregrad (Info / Warnung
  / Kritisch, abgeleitet aus Aktion und Status) und Datumsbereich. Der Schweregrad wird
  clientseitig aus den Aktions- und Statuszeichenfolgen berechnet.
- **MCP** (`McpAuditTab.tsx`) — Audit für MCP-Tools aus `/api/mcp/audit`, mit
  Filtern nach Toolname und Erfolg/Fehlschlag.

Beide Registerkarten verwenden eine Paginierung mit Seitengrößen von `50` (Compliance) bzw. `25` (MCP).

## Hilfsfunktionen für Anbieterzugangsdaten

`src/lib/compliance/providerAudit.ts` stellt Hilfsfunktionen zur Datenaufbereitung bereit, die von den
Routen zur Anbieterverwaltung beim Auslösen von Zugangsdatenereignissen verwendet werden:

- `summarizeProviderConnectionForAudit(connection)` — entfernt `apiKey`,
  `accessToken`, `refreshToken`, `idToken` und
  `providerSpecificData.consoleApiKey`, bevor der Snapshot der Verbindung in
  `details` geschrieben wird.
- `getProviderAuditTarget(connection)` — erzeugt eine stabile Zeichenfolge
  `"<provider>:<name|id>"` für das Feld `target`.
- `extractProviderWarnings(...payloads)` — durchsucht Anbieterantworten nach
  Richtlinien-/Sicherheitswarnungen (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) und
  gibt bis zu 5 Treffer aus, die jeweils auf 400 Zeichen gekürzt werden.

## Bewährte Vorgehensweisen

- Kennzeichnen Sie API-Schlüssel, die personenbezogene Daten verarbeiten (juristische, medizinische usw.), mit `noLog: true`.
- Passen Sie `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` an Ihre
  Aufbewahrungsrichtlinie an. Die Standardwerte von 7 Tagen sind konservativ.
- Exportieren Sie die Audit-Tabelle außerhalb der Plattform (`sqlite3 dump`) in den von Ihrem
  Compliance-Programm geforderten Intervallen — eine integrierte Archivierung ist nicht vorhanden.
- Überwachen Sie die Anzahl von `auth.login.failed` und `auth.login.locked`, um
  Brute-Force-Angriffe zu erkennen.
- Rufen Sie beim Hinzufügen neuer Admin-Endpunkte `logAuditEvent({ ... })` mit einer stabilen
  Aktionszeichenfolge im Format `domain.verb.outcome` auf und übergeben Sie den Anfragekontext über
  `getAuditRequestContext(request)`, damit IP-Adresse und `requestId` automatisch
  erfasst werden.

## Siehe auch

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — Maskierung personenbezogener Daten, Prompt-Injection
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP-Toolkatalog und Berechtigungsbereiche
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — vollständige Referenz der Umgebungsvariablen
- Quellcode: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
