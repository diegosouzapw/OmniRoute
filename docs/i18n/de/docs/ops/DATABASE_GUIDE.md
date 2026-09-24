# Database Schema & Operations Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Kurzfassung**: OmniRoute verwendet **SQLite mit WAL-Journaling** als primären Datenspeicher und **AES-256-GCM** zur Verschlüsselung vertraulicher Felder im Ruhezustand. Dieser Leitfaden behandelt das Schema, Migrationen, Sicherung/Wiederherstellung und betriebliche Runbooks.

**Quellen:**

- `src/lib/db/core.ts` — Singleton + SCHEMA_SQL (17 Basistabellen)
- `src/lib/db/migrationRunner.ts` — versionierte Migrationen
- `src/lib/db/migrations/` — 167 versionierte SQL-Dateien
- `src/lib/db/encryption.ts` — Hilfsfunktionen für die Verschlüsselung
- `src/lib/db/backup.ts` — Export/Import von Sicherungen
- `src/lib/db/healthCheck.ts` — Zustandsdiagnose

---

## Warum SQLite?

OmniRoute hat sich aus mehreren Gründen für SQLite anstelle von PostgreSQL/MySQL entschieden:

| Faktor              | SQLite                                          | PostgreSQL                                          |
| ------------------- | ----------------------------------------------- | --------------------------------------------------- |
| **Bereitstellung**  | Eingebettet — kein separater Server             | Erfordert die Einrichtung eines Servers             |
| **Verschlüsselung** | Anwendungsebene (AES-256-GCM)                   | Integrierte TDE                                     |
| **Leistung**        | Schneller bei kleinen/mittleren Workloads       | Besser für sehr viele gleichzeitige Schreibvorgänge |
| **Nebenläufigkeit** | WAL-Modus ermöglicht gleichzeitige Lesevorgänge | Vollständiges MVCC                                  |
| **Sicherung**       | Kopie einer einzelnen Datei                     | `pg_dump` oder Dateisystem-Snapshot                 |
| **Anwendungsfall**  | Installation pro Benutzer, eingebettet          | Mandantenfähiges SaaS                               |

Für Bereitstellungen mit **einem Benutzer und einer einzelnen Instanz** (der primäre Anwendungsfall von OmniRoute) ist SQLite einfacher und schneller.

### WAL-Journaling

`core.ts` öffnet die Datenbank im **WAL-Modus (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL ermöglicht **gleichzeitige Lesevorgänge** während Schreibvorgängen — wichtig für das Dashboard, das Abfragen ausführt, während Anfragen aufgezeichnet werden.

Die standardmäßige Cache-Größe beträgt **65.536 KiB (64 MiB)**. SQLite interpretiert einen negativen
`cache_size`-Wert als ungefähre Obergrenze in KiB und weist Seiten nach Bedarf zu.
Unter **Einstellungen > System & Speicher > Cache-Größe** werden Ganzzahlwerte von **1 bis
1.000.000 KiB** akzeptiert; beim Speichern der Einstellung wird sie auf die aktive Datenbankverbindung angewendet,
und OmniRoute stellt den gespeicherten Wert beim Start wieder her.

---

## Datenbankspeicherort

Die SQLite-Datei wird hier gespeichert:

| Betriebssystem | Pfad                                                        |
| -------------- | ----------------------------------------------------------- |
| Linux          | `~/.omniroute/storage.sqlite`                               |
| macOS          | `~/.omniroute/storage.sqlite`                               |
| Windows        | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker         | `/app/data/storage.sqlite` (konfigurierbar über `DATA_DIR`) |

Zugehörige Dateien:

- `storage.sqlite-wal` — Write-Ahead-Log
- `storage.sqlite-shm` — Shared-Memory-Datei
- `call_logs/` — Artefakte von Anfrage-Payloads (sofern aktiviert)

**Speicherort überschreiben:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architektur der Domänenmodule

Die Datenbank von OmniRoute umfasst **110 TypeScript-Module auf oberster Ebene** in `src/lib/db/`. Jedes Domänenmodul:

- Ist für eine oder mehrere bestimmte Tabellen zuständig
- Exportiert typisierte CRUD-Funktionen
- Greift niemals auf die Tabellen eines anderen Moduls zu
- Verwendet `getDbInstance()` aus `core.ts`, um auf die Datenbank zuzugreifen

### Die 110 DB-Module auf oberster Ebene

OmniRoute verfügt über **110 TypeScript-Dateien auf oberster Ebene** in `src/lib/db/`. Nachfolgend finden Sie eine Auswahl der Kernmodule; die vollständige Liste finden Sie in der Verzeichnisauflistung:

| Modul                   | Tabellen                                                       | Zuständigkeit                                                                 |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registrierung und Anmeldedaten von Anbietern per OAuth/API-Schlüssel          |
| `models.ts`             | `key_value` (Modelldaten)                                      | Modelldefinitionen, Fähigkeiten und Preise                                    |
| `combos.ts`             | `combos`                                                       | Konfigurationen und Reihenfolge des Combo-Routings                            |
| `apiKeys.ts`            | `api_keys`                                                     | Lebenszyklus von API-Schlüsseln, Geltungsbereiche und Kontingentverfolgung    |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Systemkonfiguration und gemeinsam genutzter KV-Speicher                       |
| `backup.ts`             | —                                                              | Operationen zum Exportieren und Importieren von Sicherungen                   |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy-Konfigurationen und Routing-Regeln                                      |
| `prompts.ts`            | `prompt_templates`                                             | Wiederverwendbare Prompt-Vorlagen und Versionierung                           |
| `webhooks.ts`           | `webhooks`                                                     | Ereignisgesteuerte Webhook-Abonnements und Protokolle                         |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Audit-Protokollierung pro Anfrage (optional, hohes Volumen)                   |
| `domainState.ts`        | `domain_*` (5 Tabellen)                                        | Domänenbudgets, Leistungsschalter, Sperren, Fallback-Ketten und Kostenverlauf |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Zulässige API-Schlüssel für MCP/A2A                                           |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historische Kontingentnutzung                                                 |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Zuordnung von Modellen zu Combo-Standardeinstellungen                         |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-spezifischer persistenter Zustand                                         |
| `encryption.ts`         | —                                                              | Hilfsfunktionen zum Ver- und Entschlüsseln von Feldern                        |
| `readCache.ts`          | —                                                              | In-Memory-Cache für leseintensive Operationen                                 |
| `secrets.ts`            | `key_value` (verschlüsselte Einträge)                          | Verschlüsselte Speicherung geheimer Daten                                     |
| `stateReset.ts`         | —                                                              | Löschen/Zurücksetzen des Datenbankzustands für Tests                          |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Sitzungskontext für die Übergabe zwischen Agenten                             |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Nutzungsverfolgung                                                            |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Komprimierungskonfiguration                                                   |

### Modulgrenzen

Eine zentrale Architekturregel lautet: **Module greifen nicht direkt auf die Tabellen anderer Module zu**. Um mit den Daten eines anderen Moduls zu arbeiten, importieren Sie die Funktion aus diesem Modul.

```ts
// ❌ FALSCH: direktes SQL aus einem anderen Modul
db.prepare("SELECT * FROM provider_connections").all();

// ✅ RICHTIG: Funktion des providers-Moduls verwenden
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Diese Regel wird bei Code-Reviews durchgesetzt — es gibt keine statische Prüfung, Verstöße werden jedoch beanstandet.

---

## Basisschema (17 Tabellen)

`core.ts` definiert die 17 Basistabellen in `SCHEMA_SQL`. Diese werden durch die Migration `001_initial_schema.sql` erstellt und bilden das Kernschema.

### Kerntabellen (in der initialen Migration erstellt)

| Tabelle                    | Zweck                                     | Schlüsselspalten                                                        |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Provider-Anmeldedaten (verschlüsselt)     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Routing-Informationen für Provider-Knoten | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Allgemeiner KV-Speicher                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Definitionen von Routing-Kombinationen    | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-Schlüssel für das Gateway             | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Datenbankmetadaten                        | `key`, `value`                                                          |
| `usage_history`            | Datensätze zur Anfragenutzung             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Anfrage-Payloads und Antworten            | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Protokolle von Proxy-Anfragen             | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modell-zu-Provider-Ketten                 | `model`, `chain`                                                        |
| `domain_budgets`           | Ausgabenbudgets pro Domäne                | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Verlauf der Budgetzurücksetzungen         | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Kostenverfolgung pro Domäne               | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Ratenbegrenzungsstatus der Domäne         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Circuit-Breaker-Status pro Domäne         | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache für LLM-Antworten                   | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historische Kontingent-Snapshots          | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Zusätzliche Tabellen (durch spätere Migrationen hinzugefügt)

Nachfolgende Migrationen fügen unter anderem folgende Tabellen hinzu:

- `cli_tool_state` (Migration 011) — Status des CLI-Tools
- `mcp_*`-Tabellen — MCP-Server-Audit
- `a2a_*`-Tabellen — A2A-Aufgabenstatus
- `usage_*`-Tabellen — Nutzungsverfolgung
- `plugin_*`-Tabellen — Plugin-System
- `skill_executions` — Ausführungsverlauf von Skills
- `memory_*`-Tabellen — Speichersystem
- `compression_*`-Tabellen — Komprimierungssystem
- `webhook_*`-Tabellen — Webhook-Zustellungsprotokoll
- `acp_*`-Tabellen — Agent Client Protocol
- `oneproxy_*`-Tabellen — 1proxy-Marktplatz
- `proxy_assignments` — Bindungen des Proxy-Gültigkeitsbereichs
- `detailed_call_artifacts` — Metadaten zu Artefakten von Aufrufprotokollen
- `quota_alert_history` — Audit von Kontingentwarnungen
- `command_code_auth_sessions` — Command Code-OAuth-Sitzungen

Die vollständige Liste mit über 30 Tabellen befindet sich in `src/lib/db/migrations/`.

---

## Migrationen

OmniRoute verwendet **versionierte, idempotente Migrationen** in `src/lib/db/migrations/`. Jede Migration ist eine einzelne SQL-Datei mit dem Namen `NNN_description.sql`.

### Benennung von Migrationen

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Ausführung von Migrationen

Beim Start führt `migrationRunner.ts` folgende Schritte aus:

1. Erstellt die Tabelle `_omniroute_migrations`, falls sie nicht existiert
2. Fragt bereits angewendete Migrationen ab
3. Wendet alle neuen Migrationen der Reihe nach an, jeweils innerhalb einer Transaktion
4. Zeichnet jede angewendete Migration mit einem Zeitstempel auf

```ts
// src/lib/db/migrationRunner.ts (vereinfacht)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### Idempotenz

Migrationen müssen **idempotent** sein — eine zweimalige Ausführung sollte keine Auswirkungen haben:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Verwenden Sie großzügig die Klauseln `IF NOT EXISTS`, `IF EXISTS` und `OR IGNORE` / `OR REPLACE`.

### Hinzufügen einer neuen Migration

1. **Nächste Nummer ermitteln**: `ls src/lib/db/migrations/ | tail -1`
2. **Datei erstellen**: `NNN_my_change.sql`
3. **Sicheres DDL verwenden**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Daten sorgfältig nachpflegen**: Verwenden Sie `UPDATE ... WHERE ...`, um vorhandene Zeilen zu berücksichtigen
5. **An einer Kopie testen**: Führen Sie niemals ungetestete Migrationen in der Produktion aus

Beispiel:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Nicht abwärtskompatible Änderungen** (z. B. das Löschen von Spalten) sind problematisch. OmniRoute unterstützt KEIN Downgrade — sobald eine Migration angewendet wurde, ist die Schemaänderung dauerhaft. Planen Sie entsprechend.

---

## Verschlüsselung ruhender Daten

Sensible Felder (API-Schlüssel, OAuth-Token, Verbindungszeichenfolgen) werden im Ruhezustand mit **AES-256-GCM** verschlüsselt.

### Funktionsweise

```ts
// src/lib/db/encryption.ts (vereinfacht)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Verwendungsorte

- `provider_connections.api_key` — auf Anwendungsebene verschlüsselt
- `provider_connections.access_token`, `refresh_token`, `id_token` — auf Anwendungsebene verschlüsselt
- `key_value`-Einträge mit `namespace = "secrets"` — auf Anwendungsebene verschlüsselt
- `proxy_registry.auth` — auf Anwendungsebene verschlüsselt (falls vorhanden)

### Verschlüsselungsschlüssel

Der Verschlüsselungsschlüssel wird aus einer **Passphrase** (festgelegt über die Umgebungsvariable `STORAGE_ENCRYPTION_KEY`) und einem **Salt** (in der Datenbank gespeichert) abgeleitet. Beide sind erforderlich, um Daten zu entschlüsseln.

```bash
# Eine sichere Passphrase generieren
openssl rand -hex 32

# In .env festlegen
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritisch**: Der Verlust des Verschlüsselungsschlüssels bedeutet, dass der Zugriff auf alle verschlüsselten Daten verloren geht. **Sichern Sie den Schlüssel getrennt von der Datenbank**.

### Nicht verschlüsselte Daten

Aus Leistungsgründen werden folgende Daten im Klartext gespeichert:

- Anzeigenamen der Anbieter
- Modelldefinitionen (bereits öffentlich)
- Routingregeln
- Nutzungsdatensätze (keine personenbezogenen Daten)

---

## Hinweise zur Verschlüsselung (v3.8.16+)

OmniRoute verwendet **`migrateLegacyEncryptedString()`**, um zwei Verschlüsselungsverfahren transparent zu handhaben:

- **Legacy** (vor v3.5.0): XOR-basierte „Verschlüsselung“ (keine echte Kryptografie)
- **Aktuell**: AES-256-GCM mit korrektem IV und Authentifizierungs-Tag

Die Migrationshilfsfunktion erkennt das Legacy-Format und verschlüsselt die Daten beim ersten Lesen mit dem neuen Verfahren erneut. Das bedeutet, dass Sie eine alte Datenbank aktualisieren können, ohne Zugangsdaten zu verlieren.

---

## Lese-Cache

Für häufig gelesene Daten (Modelle, Anbieter, Einstellungen) stellt `readCache.ts` einen **In-Memory-Cache** bereit:

```ts
// Beim Start zwischengespeichert, beim Schreiben invalidiert
const providers = await getCachedProviders(); // Schnell, im Arbeitsspeicher
const fresh = await listProviders(); // Langsam, greift auf die DB zu
```

| Zwischengespeicherte Entität | Cache-Schlüssel | TTL                    |
| ---------------------------- | --------------- | ---------------------- |
| `models`                     | `models:v1`     | Bis zum Schreibvorgang |
| `provider_connections`       | `providers:v1`  | Bis zum Schreibvorgang |
| `settings`                   | `settings:v1`   | Bis zum Schreibvorgang |
| `combos`                     | `combos:v1`     | Bis zum Schreibvorgang |

Der Cache wird bei jedem Schreibvorgang in die entsprechende Tabelle invalidiert.

---

## Sicherung und Wiederherstellung

### Manuelle Sicherung

```bash
# CLI verwenden, um eine lokale Sicherung zu erstellen
omniroute backup create --name pre-migration

# Oder über die API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Die Sicherungsdatei enthält:

- Alle DB-Tabellen (als JSON serialisiert)
- Aufrufprotokoll-Artefakte (Base64-kodiert, optional)
- Einstellungen + Geheimnisse (verschlüsselt)
- Plugin-Konfiguration

### Wiederherstellung

```bash
# Über die CLI
omniroute restore pre-migration

# Über die API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Warnung**: Die Wiederherstellung überschreibt die gesamte DB. Stoppen Sie zuerst alle Clients.

### Automatisierte Sicherungen

```bash
# Automatisierte tägliche Sicherungen über die CLI aktivieren
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Der Zeitplan wird serverseitig durch einen Hintergrundjob ausgeführt, der standardmäßig alle 30 Sekunden
aktiv wird und den Cron-Ausdruck anhand der lokalen Serverzeit auswertet.

| Variable                                    | Standardwert | Beschreibung                                                                                                         |
| ------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`      | Intervall in ms (min. `5000`). Muss kürzer als 60 s sein, damit die passende Cron-Minute zuverlässig getroffen wird. |

### SQLite-Hot-Backup

Für eine Sicherung einer laufenden DB ohne Ausfallzeit:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Hierbei wird die Online-Backup-API von SQLite verwendet — die Ausführung ist sicher, während OmniRoute läuft.

---

## Leistungsoptimierung

### WAL-Modus

WAL ist standardmäßig aktiviert. Für schreibintensive Workloads sollten Sie Folgendes in Betracht ziehen:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint alle 1000 Seiten
PRAGMA journal_size_limit = 67108864;  -- WAL-Obergrenze von 64 MB
```

### Indizes

Wichtige Indizes für die Leistung (werden durch Migrationen automatisch erstellt):

- `idx_models_provider` — Modellsuche nach Anbieter
- `idx_combo_targets_combo_id` — Erweiterung von Kombinationszielen
- `idx_usage_history_api_key_timestamp` — Nutzungsanalysen
- `idx_quota_snapshots_api_key_window` — Kontingentverfolgung
- `idx_call_logs_timestamp` — Abfragen von Aufrufprotokollen

Um einen neuen Index hinzuzufügen, erstellen Sie eine Migration:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Speicherabgebildete E/A

Für sehr große Datenbanken (>10 GB) kann die Speicherabbildung über ein SQLite-Pragma angepasst werden:

```sql
-- Über SQLite-Pragma festlegen (in core.ts oder zur Laufzeit anpassen)
PRAGMA mmap_size = 268435456;  -- 256 MB
```

### Komprimierung

Lang laufende OmniRoute-Instanzen profitieren von einem gelegentlichen `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Führen Sie dies monatlich in Zeitfenstern mit geringem Datenverkehr aus. (Der WAL-Modus reduziert die Notwendigkeit, beseitigt sie jedoch nicht vollständig.)

---

## Integritätsprüfung

`src/lib/db/healthCheck.ts` stellt **Integritätsdiagnosen auf Datenbankebene** bereit:

Beide HTTP-Methoden erfordern eine Authentifizierung (andernfalls `401`). `GET` führt nur eine Diagnose durch; `POST` führt dieselbe Prüfung mit aktiviertem `autoRepair` aus.

```bash
GET  /api/db/health   # diagnostizieren
POST /api/db/health   # diagnostizieren + reparieren
```

Die Antwort ist das von `runDbHealthCheck()` erzeugte `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domänenbudgets verwiesen auf API-Schlüssel, die nicht mehr existieren.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| Feld              | Bedeutung                                                                                                                                                                                |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, wenn `issues` leer ist. `driver` hat niemals Einfluss darauf.                                                                                                                    |
| `issues[].type`   | Einer der Werte `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                         |
| `repairedCount`   | Während dieses Durchlaufs reparierte Zeilen; immer `0`, wenn `autoRepair` den Wert false hat.                                                                                            |
| `backupCreated`   | Gibt an, ob vor der Reparatur eine Sicherung erstellt wurde.                                                                                                                             |
| `checkedAt`       | ISO-Zeitstempel, der für den Durchlauf und jeden dabei geschriebenen Reparaturhinweis identisch ist.                                                                                     |
| `driver.name`     | SQLite-Treiber, der die geprüfte Datenbank bereitstellt.                                                                                                                                 |
| `driver.degraded` | `true`, wenn Schreibvorgänge nicht dauerhaft durch die Datenbankdatei gesichert werden — beim WASM-Fallback `sql.js` (Persistenz der gesamten Datei) oder bei einer In-Memory-Datenbank. |

Dieselbe Nutzlast wird vom MCP-Tool `omniroute_db_health_check` zurückgegeben.

Führen Sie `PRAGMA integrity_check` aus, um Beschädigungen zu erkennen:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Sollte Folgendes ausgeben: ok
```

Wenn etwas anderes als `ok` zurückgegeben wird, **beenden Sie die Verwendung der Datenbank sofort** und stellen Sie sie aus einer Sicherung wieder her.

---

## Notfallwiederherstellung

### Szenario 1: WAL-Datei verloren

Die `-wal`-Datei fehlt, aber `-shm` und die Hauptdatenbank sind intakt:

```bash
# Wird beim nächsten Öffnen automatisch wiederhergestellt
omniroute
```

Falls SQLite keine automatische Wiederherstellung durchführen kann:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Szenario 2: Hauptdatenbankdatei beschädigt

Aus einer Sicherung wiederherstellen:

```bash
omniroute sync pull --merge   # oder: omniroute backup restore <backup-id>
```

### Szenario 3: Verschlüsselungsschlüssel verloren

Ohne den Schlüssel ist **keine Wiederherstellung möglich**. Die verschlüsselten Felder sind nicht lesbar. Fügen Sie alle Anbieter manuell mit neuen Zugangsdaten erneut hinzu.

> **Gegenmaßnahme**: Sichern Sie den Verschlüsselungsschlüssel stets separat, idealerweise in einem Passwortmanager oder KMS.

### Szenario 4: Datenträger voll

SQLite gibt `SQLITE_FULL`-Fehler zurück. Geben Sie Speicherplatz frei und führen Sie anschließend Folgendes aus:

```bash
# WAL-Checkpoint durchführen, um Speicherplatz freizugeben
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Häufige Vorgänge

### Eine Tabelle untersuchen

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Zeilen in allen Tabellen zählen

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Alle Daten zurücksetzen (löschen)

```bash
# Zuerst OmniRoute beenden
omniroute stop

# Datenbankdatei löschen
rm ~/.omniroute/storage.sqlite*

# Neu starten (erstellt eine leere Datenbank)
omniroute
```

Für ein **selektives** Zurücksetzen (Anbieter beibehalten, Nutzungsdaten löschen):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Einzelne Tabelle exportieren

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Fehlerbehebung

### "Datenbank ist gesperrt"

Ein anderer Prozess hält eine Schreibsperre. Sie können:

- Warten, bis der andere Prozess abgeschlossen ist (mit `lsof | grep storage.sqlite` prüfen)
- Den anderen Prozess beenden
- OmniRoute neu starten, falls das Problem weiterhin besteht

### "Fremdschlüsselbedingung fehlgeschlagen"

Ein Domänenmodul verletzt die referenzielle Integrität. Prüfen Sie Folgendes:

- Verwaiste Zeilen in abhängigen Tabellen
- Kaskadierende Löschvorgänge, die nicht weitergegeben wurden
- Eine kürzlich durchgeführte Migration, die einen Fremdschlüssel geändert hat

Führen Sie `PRAGMA foreign_key_check;` aus, um Verletzungen zu finden.

### "Nicht genügend Arbeitsspeicher"

Die speicherabgebildete Ein-/Ausgabe von SQLite überschreitet das Betriebssystemlimit. Reduzieren Sie sie über ein SQLite-Pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB anstelle von 256MB
```

Oder deaktivieren Sie sie:

```sql
PRAGMA mmap_size = 0;
```

### "Migration während der Ausführung fehlgeschlagen"

Die Migration wurde innerhalb einer Transaktion ausgeführt und sollte daher zurückgesetzt worden sein. Falls nicht:

1. **OmniRoute beenden** (weitere Versuche verhindern)
2. **Datenbankstatus prüfen** mit `sqlite3`
3. **Unvollständige Migration manuell korrigieren**
4. **OmniRoute erneut ausführen** (die Migration wird erneut versucht)

Um dies zu vermeiden, testen Sie Migrationen immer zuerst an einer Kopie.

---

## Siehe auch

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — Nutzungstabellen
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — Systemzustandsüberwachung
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — Veröffentlichungsablauf
- Quelle: `src/lib/db/` (mehr als 80 Dateien, ca. 25.000 Codezeilen)
