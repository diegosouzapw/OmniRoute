---
title: "Przewodnik po schemacie bazy danych i operacjach"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik po schemacie bazy danych i operacjach

> **TL;DR**: OmniRoute używa **SQLite z journalingiem WAL** jako głównego magazynu, z szyfrowaniem **AES-256-GCM** w spoczynku dla wrażliwych pól. Ten przewodnik obejmuje schemat, migracje, kopie zapasowe/odzyskiwanie oraz runbooki operacyjne.

**Źródła:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabel bazowych)
- `src/lib/db/migrationRunner.ts` — wersjonowane migracje
- `src/lib/db/migrations/` — 106 wersjonowanych plików SQL
- `src/lib/db/encryption.ts` — helpery szyfrowania
- `src/lib/db/backup.ts` — eksport/import kopii zapasowych
- `src/lib/db/healthCheck.ts` — diagnostyka kondycji

---

## Dlaczego SQLite?

OmniRoute wybrał SQLite zamiast PostgreSQL/MySQL z kilku powodów:

| Czynnik              | SQLite                                    | PostgreSQL                                  |
| -------------------- | ----------------------------------------- | ------------------------------------------- |
| **Wdrożenie**        | Osadzony — bez osobnego serwera           | Wymaga konfiguracji serwera                 |
| **Szyfrowanie**      | Warstwa aplikacji (AES-256-GCM)           | Wbudowane TDE                               |
| **Wydajność**        | Szybszy przy małych/średnich obciążeniach | Lepszy przy ogromnych równoległych zapisach |
| **Współbieżność**    | Tryb WAL pozwala na równoległe odczyty    | Pełne MVCC                                  |
| **Kopia zapasowa**   | Kopia pojedynczego pliku                  | `pg_dump` lub snapshot systemu plików       |
| **Przypadek użycia** | Instalacja per-użytkownik, osadzona       | Multi-tenant SaaS                           |

Dla wdrożeń **jednoużytkownikowych, jednainstancyjnych** (główny przypadek użycia OmniRoute) SQLite jest prostszy i szybszy.

### Journaling WAL

`core.ts` otwiera bazę w trybie **WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
// Settings > System & Storage > Cache Size is applied as KiB.
db.pragma("cache_size = -16384");
```

WAL pozwala na **równoległe odczyty** podczas zapisów — ważne dla dashboardu, który wykonuje zapytania, gdy rejestrowane są żądania.

---

## Lokalizacja bazy danych

Plik SQLite jest przechowywany w:

| OS      | Ścieżka                                                      |
| ------- | ------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                |
| macOS   | `~/.omniroute/storage.sqlite`                                |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                    |
| Docker  | `/app/data/storage.sqlite` (konfigurowalne przez `DATA_DIR`) |

Pliki towarzyszące:

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — plik pamięci współdzielonej
- `call_logs/` — artefakty payloadów żądań (jeśli włączone)

**Nadpisanie lokalizacji:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architektura modułów domenowych

Baza OmniRoute ma **94 moduły domenowe** w `src/lib/db/`. Każdy moduł:

- Posiada jedną lub więcej konkretnych tabel
- Eksportuje typowane funkcje CRUD
- Nigdy nie dotyka tabel innego modułu
- Używa `getDbInstance()` z `core.ts` do dostępu do DB

### 94 moduły DB

OmniRoute ma **94 pliki modułów** w `src/lib/db/`. Poniżej próbka kluczowych modułów; pełna lista w listingu katalogu:

| Moduł                   | Tabele                                                         | Odpowiedzialność                                                               |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Rejestracja providerów OAuth/API key i poświadczenia                           |
| `models.ts`             | `key_value` (model data)                                       | Definicje modeli, możliwości, cennik                                           |
| `combos.ts`             | `combos`                                                       | Konfiguracje routingu combo i kolejność                                        |
| `apiKeys.ts`            | `api_keys`                                                     | Cykl życia kluczy API, zakresy, śledzenie limitów                              |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfiguracja systemu i współdzielony magazyn KV                                |
| `backup.ts`             | —                                                              | Operacje eksportu/importu kopii zapasowych                                     |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfiguracje proxy i reguły routingu                                           |
| `prompts.ts`            | `prompt_templates`                                             | Wielokrotnego użytku szablony promptów, wersjonowanie                          |
| `webhooks.ts`           | `webhooks`                                                     | Subskrypcje webhooków sterowane zdarzeniami i logi                             |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Logowanie audytu per-żądanie (opcjonalne, duża objętość)                       |
| `domainState.ts`        | `domain_*` (5 tables)                                          | Budżety domen, circuit breakery, lockouty, łańcuchy fallback, historia kosztów |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Whitelistowane klucze API dla MCP/A2A                                          |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historyczne zużycie limitów                                                    |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapowanie modeli na domyślne combo                                             |
| `cliToolState.ts`       | `cli_tool_state`                                               | Trwały stan specyficzny dla CLI                                                |
| `encryption.ts`         | —                                                              | Helpery do szyfrowania/deszyfrowania pól                                       |
| `readCache.ts`          | —                                                              | Cache w pamięci dla operacji intensywnych w odczytach                          |
| `secrets.ts`            | `key_value` (encrypted entries)                                | Szyfrowany magazyn sekretów                                                    |
| `stateReset.ts`         | —                                                              | Czyszczenie/reset stanu DB do testów                                           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kontekst sesji do handoffu agentów                                             |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Śledzenie użycia                                                               |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfiguracja kompresji                                                         |

### Granice modułów

Kluczowa reguła architektoniczna: **moduły nie sięgają bezpośrednio do tabel innych modułów**. Aby pracować z danymi innego modułu, zaimportuj funkcję z tego modułu.

```ts
// ❌ WRONG: direct SQL from another module
db.prepare("SELECT * FROM provider_connections").all();

// ✅ RIGHT: use the providers module function
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Ta reguła jest egzekwowana w code review — nie ma statycznego sprawdzenia, ale naruszenia są oznaczane.

---

## Schemat bazowy (17 tabel)

`core.ts` definiuje 17 tabel bazowych w `SCHEMA_SQL`. Tworzy je migracja `001_initial_schema.sql` i stanowią one rdzeń schematu.

### Tabele rdzeniowe (utworzone w początkowej migracji)

| Tabela                     | Cel                                  | Kluczowe kolumny                                                        |
| -------------------------- | ------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Poświadczenia providera (szyfrowane) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Info routingu węzła providera        | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ogólny magazyn KV                    | `namespace`, `key`, `value`                                             |
| `combos`                   | Definicje combo routingu             | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Klucze API bramki                    | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadane bazy danych                 | `key`, `value`                                                          |
| `usage_history`            | Rekordy użycia żądań                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payloady i odpowiedzi żądań          | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logi żądań proxy                     | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Łańcuchy model→provider              | `model`, `chain`                                                        |
| `domain_budgets`           | Budżety wydatków per-domena          | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historia resetów budżetu             | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Śledzenie kosztów per-domena         | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stan rate-limitu domeny              | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stan circuit breakera per domena     | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache odpowiedzi LLM                 | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historyczne snapshoty limitów        | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Dodatkowe tabele (dodane w późniejszych migracjach)

Kolejne migracje dodają m.in. tabele:

- `cli_tool_state` (migration 011) — stan narzędzi CLI
- `mcp_*` tables — audyt serwera MCP
- `a2a_*` tables — stan zadań A2A
- `usage_*` tables — śledzenie użycia
- `plugin_*` tables — system pluginów
- `skill_executions` — historia wykonania skilli
- `memory_*` tables — system pamięci
- `compression_*` tables — system kompresji
- `webhook_*` tables — log dostarczania webhooków
- `acp_*` tables — Agent Client Protocol
- `oneproxy_*` tables — marketplace 1proxy
- `proxy_assignments` — powiązania zakresu proxy
- `detailed_call_artifacts` — metadane artefaktów logów wywołań
- `quota_alert_history` — audyt alertów limitów
- `command_code_auth_sessions` — sesje OAuth Command Code

Pełna lista ~30+ tabel jest w `src/lib/db/migrations/`.

---

## Migracje

OmniRoute używa **wersjonowanych, idempotentnych migracji** w `src/lib/db/migrations/`. Każda migracja to pojedynczy plik SQL o nazwie `NNN_description.sql`.

### Nazewnictwo migracji

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Jak działają migracje

Przy starcie `migrationRunner.ts`:

1. Tworzy tabelę `_omniroute_migrations`, jeśli nie istnieje
2. Odpytuje już zastosowane migracje
3. Stosuje nowe migracje po kolei, każdą w transakcji
4. Zapisuje każdą zastosowaną migrację ze znacznikiem czasu

```ts
// src/lib/db/migrationRunner.ts (simplified)
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

### Idempotencja

Migracje muszą być **idempotentne** — dwukrotne uruchomienie powinno być no-op:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Używaj swobodnie klauzul `IF NOT EXISTS`, `IF EXISTS` oraz `OR IGNORE` / `OR REPLACE`.

### Dodawanie nowej migracji

1. **Ustal kolejny numer**: `ls src/lib/db/migrations/ | tail -1`
2. **Utwórz plik**: `NNN_my_change.sql`
3. **Używaj bezpiecznego DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Uzupełniaj dane ostrożnie**: używaj `UPDATE ... WHERE ...` dla istniejących wierszy
5. **Testuj na kopii**: nigdy nie uruchamiaj nietestowanych migracji na produkcji

Przykład:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Zmiany niekompatybilne wstecz** (np. usuwanie kolumn) są trudne. OmniRoute NIE wspiera downgrade — po zastosowaniu migracji zmiana schematu jest trwała. Planuj odpowiednio.

---

## Szyfrowanie w spoczynku

Wrażliwe pola (klucze API, tokeny OAuth, connection stringi) są szyfrowane w spoczynku przy użyciu **AES-256-GCM**.

### Jak to działa

```ts
// src/lib/db/encryption.ts (simplified)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Gdzie jest używane

- `provider_connections.api_key` — szyfrowane na poziomie aplikacji
- `provider_connections.access_token`, `refresh_token`, `id_token` — szyfrowane na poziomie aplikacji
- `key_value` entries with `namespace = "secrets"` — szyfrowane na poziomie aplikacji
- `proxy_registry.auth` — szyfrowane na poziomie aplikacji (jeśli obecne)

### Klucz szyfrowania

Klucz szyfrowania jest wyprowadzany z **hasła** (ustawianego przez zmienną env `STORAGE_ENCRYPTION_KEY`) i **soli** (przechowywanej w DB). Oba są wymagane do odszyfrowania danych.

```bash
# Generate a secure passphrase
openssl rand -hex 32

# Set in .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Krytyczne**: Utrata klucza szyfrowania oznacza utratę dostępu do wszystkich zaszyfrowanych danych. **Twórz kopię zapasową klucza osobno od bazy danych**.

### Czego NIE szyfrujemy

Ze względów wydajnościowych w plaintexcie przechowywane są:

- Nazwy wyświetlane providerów
- Definicje modeli (już publiczne)
- Reguły routingu
- Rekordy użycia (bez PII)

---

## Zastrzeżenia dotyczące szyfrowania (v3.8.16+)

OmniRoute używa **`migrateLegacyEncryptedString()`**, aby przezroczyście obsługiwać dwa schematy szyfrowania:

- **Legacy** (pre-v3.5.0): „szyfrowanie” oparte na XOR (nie prawdziwa kryptografia)
- **Current**: AES-256-GCM z właściwym IV i auth tag

Helper migracji wykrywa format legacy i przy pierwszym odczycie ponownie szyfruje nowym schematem. Dzięki temu możesz zaktualizować starą bazę bez utraty poświadczeń.

---

## Cache odczytów

Dla często odczytywanych danych (modele, providery, ustawienia) `readCache.ts` zapewnia **cache w pamięci**:

```ts
// Cached at startup, invalidated on write
const providers = await getCachedProviders(); // Fast, in-memory
const fresh = await listProviders(); // Slow, hits DB
```

| Buforowana encja       | Klucz cache    | TTL       |
| ---------------------- | -------------- | --------- |
| `models`               | `models:v1`    | Do zapisu |
| `provider_connections` | `providers:v1` | Do zapisu |
| `settings`             | `settings:v1`  | Do zapisu |
| `combos`               | `combos:v1`    | Do zapisu |

Cache jest unieważniany przy każdym zapisie do odpowiadającej tabeli.

---

## Kopie zapasowe i odzyskiwanie

### Ręczna kopia zapasowa

```bash
# Use the CLI to create a local backup
omniroute backup create --name pre-migration

# Or via the API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Plik kopii zapasowej obejmuje:

- Wszystkie tabele DB (zserializowane do JSON)
- Artefakty logów wywołań (base64, opcjonalnie)
- Ustawienia + sekrety (zaszyfrowane)
- Konfigurację pluginów

### Przywracanie

```bash
# Via CLI
omniroute restore pre-migration

# Via API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Ostrzeżenie**: Przywracanie nadpisuje całą DB. Najpierw zatrzymaj wszystkich klientów.

### Automatyczne kopie zapasowe

```bash
# Enable automated daily backups via CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Harmonogram jest wykonywany po stronie serwera przez zadanie w tle, które tyka co 30 sekund
(domyślnie) i ewaluuje wyrażenie cron względem lokalnego czasu serwera.

| Zmienna                                     | Domyślnie | Opis                                                                                                         |
| ------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`   | Interwał ticka w ms (min `5000`). Musi być krótszy niż 60 s, aby niezawodnie trafiać w pasującą minutę cron. |

### Gorąca kopia SQLite

Dla kopii na żywo bez przestoju:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Używa online backup API SQLite — bezpieczne podczas działania OmniRoute.

---

## Strojenie wydajności

### Tryb WAL

WAL jest włączony domyślnie. Przy obciążeniach z dużą liczbą zapisów rozważ:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint every 1000 pages
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL cap
```

### Indeksy

Kluczowe indeksy wydajnościowe (tworzone automatycznie przez migracje):

- `idx_models_provider` — wyszukiwanie modeli po providerze
- `idx_combo_targets_combo_id` — rozwijanie celów combo
- `idx_usage_history_api_key_timestamp` — analityka użycia
- `idx_quota_snapshots_api_key_window` — śledzenie limitów
- `idx_call_logs_timestamp` — zapytania do logów wywołań

Aby dodać nowy indeks, utwórz migrację:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Mapowanie pamięci (Memory-Mapped I/O)

Dla bardzo dużych baz (>10GB) mapowanie pamięci można dostosować pragma SQLite:

```sql
-- Set via SQLite pragma (adjust in core.ts or runtime)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Kompaktowanie

Długo działające instancje OmniRoute zyskują na okazjonalnym `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Uruchamiaj miesięcznie w oknach niskiego ruchu. (Tryb WAL zmniejsza potrzebę, ale jej nie eliminuje.)

---

## Health check

`src/lib/db/healthCheck.ts` zapewnia **diagnostykę kondycji na poziomie DB**:

````bash
GET /api/db/health

Returns:

```json
{
  "status": "healthy",
  "checks": {
    "writable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "orphaned_artifacts": { "status": "warn", "count": 12 },
    "table_sizes": {
      "usage_history": { "rows": 12345, "size_mb": 12.3 },
      "call_logs": { "rows": 567, "size_mb": 2.1 }
    }
  }
}
````

Uruchom `PRAGMA integrity_check`, aby wykryć korupcję:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Should print: ok
```

Jeśli zwróci cokolwiek innego niż `ok`, **natychmiast przestań używać bazy** i przywróć z kopii zapasowej.

---

## Odzyskiwanie po awarii

### Scenariusz 1: Utracony plik WAL

Brakuje pliku `-wal`, ale `-shm` i główna DB są nienaruszone:

```bash
# Recovers automatically on next open
omniroute
```

Jeśli SQLite nie może odzyskać automatycznie:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenariusz 2: Uszkodzony główny plik DB

Przywróć z kopii zapasowej:

```bash
omniroute sync pull --merge   # or: omniroute backup restore <backup-id>
```

### Scenariusz 3: Utracony klucz szyfrowania

**Odzyskanie niemożliwe** bez klucza. Zaszyfrowane pola są nieczytelne. Dodaj ponownie wszystkich providerów ręcznie z nowymi poświadczeniami.

> **Mitygacja**: Zawsze twórz kopię zapasową klucza szyfrowania osobno, najlepiej w menedżerze haseł lub KMS.

### Scenariusz 4: Pełny dysk

SQLite zwróci błędy `SQLITE_FULL`. Zwolnij miejsce na dysku, potem:

```bash
# Checkpoint WAL to free up space
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Typowe operacje

### Podgląd tabeli

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Liczba wierszy we wszystkich tabelach

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Reset (wyczyszczenie) wszystkich danych

```bash
# Stop OmniRoute first
omniroute stop

# Delete the DB file
rm ~/.omniroute/storage.sqlite*

# Restart (will recreate empty DB)
omniroute
```

Dla **selektywnego** resetu (zachowaj providerów, wyczyść użycie):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Eksport pojedynczej tabeli

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Rozwiązywanie problemów

### "Database is locked"

Inny proces trzyma blokadę zapisu. Albo:

- Poczekaj, aż drugi proces skończy (sprawdź `lsof | grep storage.sqlite`)
- Zabij drugi proces
- Jeśli problem się utrzymuje, zrestartuj OmniRoute

### "Foreign key constraint failed"

Moduł domenowy narusza integralność referencyjną. Sprawdź:

- Osierocone wiersze w tabelach zależnych
- Kaskadowe usunięcia, które się nie rozpropagowały
- Niedawną migrację zmieniającą klucz obcy

Uruchom `PRAGMA foreign_key_check;`, aby znaleźć naruszenia.

### "Out of memory"

Memory-mapped I/O SQLite przekracza limit OS. Zmniejsz przez pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB instead of 256MB
```

Lub wyłącz:

```sql
PRAGMA mmap_size = 0;
```

### "Migration failed mid-way"

Migracja działała w transakcji, więc powinna się wycofać. Jeśli nie:

1. **Zatrzymaj OmniRoute** (zapobiegaj dalszym próbom)
2. **Sprawdź stan DB** przez `sqlite3`
3. **Napraw ręcznie** częściową migrację
4. **Uruchom ponownie** OmniRoute (migracja zostanie ponowiona)

Aby temu zapobiec, zawsze testuj migracje najpierw na kopii.

---

## Zobacz też

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabele użycia
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitoring kondycji
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — flow wydania
- Źródło: `src/lib/db/` (80+ files, ~25K LOC)
