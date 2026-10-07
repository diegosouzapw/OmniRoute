# Database Schema & Operations Guide (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute używa **SQLite z dziennikiem WAL** jako głównego magazynu danych oraz szyfrowania **AES-256-GCM** dla poufnych pól przechowywanych na dysku. Ten przewodnik obejmuje schemat, migracje, tworzenie i przywracanie kopii zapasowych oraz procedury operacyjne.

**Źródła:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabel bazowych)
- `src/lib/db/migrationRunner.ts` — wersjonowane migracje
- `src/lib/db/migrations/` — 167 wersjonowanych plików SQL
- `src/lib/db/encryption.ts` — funkcje pomocnicze szyfrowania
- `src/lib/db/backup.ts` — eksport/import kopii zapasowych
- `src/lib/db/healthCheck.ts` — diagnostyka stanu

---

## Dlaczego SQLite?

OmniRoute wybrał SQLite zamiast PostgreSQL/MySQL z kilku powodów:

| Czynnik            | SQLite                                               | PostgreSQL                                        |
| ------------------ | ---------------------------------------------------- | ------------------------------------------------- |
| **Wdrożenie**      | Wbudowana — bez oddzielnego serwera                  | Wymaga skonfigurowania serwera                    |
| **Szyfrowanie**    | Warstwa aplikacji (AES-256-GCM)                      | Wbudowane TDE                                     |
| **Wydajność**      | Szybsza dla małych/średnich obciążeń                 | Lepsza przy ogromnej liczbie równoległych zapisów |
| **Współbieżność**  | Tryb WAL umożliwia równoległe odczyty                | Pełne MVCC                                        |
| **Kopia zapasowa** | Kopia pojedynczego pliku                             | `pg_dump` lub migawka systemu plików              |
| **Zastosowanie**   | Instalacja dla jednego użytkownika, system wbudowany | Wielodostępny SaaS                                |

W przypadku wdrożeń przeznaczonych dla **jednego użytkownika i jednej instancji** (głównego zastosowania OmniRoute) SQLite jest prostszy i szybszy.

### Dziennik WAL

`core.ts` otwiera bazę danych w **trybie WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL umożliwia **równoległe odczyty** podczas zapisu — jest to ważne dla panelu, który wykonuje zapytania w trakcie rejestrowania żądań.

Domyślny rozmiar pamięci podręcznej wynosi **65 536 KiB (64 MiB)**. SQLite interpretuje ujemną wartość
`cache_size` jako przybliżony górny limit w KiB i przydziela strony na żądanie.
Ustawienie **Ustawienia > System i pamięć masowa > Rozmiar pamięci podręcznej** przyjmuje wartości całkowite od **1 do
1 000 000 KiB**; zapisanie ustawienia powoduje zastosowanie go do aktywnego połączenia z bazą danych,
a OmniRoute przywraca zapisaną wartość podczas uruchamiania.

---

## Lokalizacja bazy danych

Plik SQLite jest przechowywany w następującej lokalizacji:

| System operacyjny | Ścieżka                                                          |
| ----------------- | ---------------------------------------------------------------- |
| Linux             | `~/.omniroute/storage.sqlite`                                    |
| macOS             | `~/.omniroute/storage.sqlite`                                    |
| Windows           | `%USERPROFILE%\.omniroute\storage.sqlite`                        |
| Docker            | `/app/data/storage.sqlite` (konfigurowalne za pomocą `DATA_DIR`) |

Pliki towarzyszące:

- `storage.sqlite-wal` — dziennik zapisu wyprzedzającego
- `storage.sqlite-shm` — plik pamięci współdzielonej
- `call_logs/` — artefakty danych żądań (jeśli włączono)

**Zmiana lokalizacji:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architektura modułów domenowych

Baza danych OmniRoute obejmuje **110 modułów TypeScript najwyższego poziomu** w katalogu `src/lib/db/`. Każdy moduł domenowy:

- Jest właścicielem co najmniej jednej konkretnej tabeli
- Eksportuje typowane funkcje CRUD
- Nigdy nie uzyskuje dostępu do tabel innego modułu
- Używa funkcji `getDbInstance()` z pliku `core.ts`, aby uzyskać dostęp do bazy danych

### 110 modułów DB najwyższego poziomu

OmniRoute zawiera **110 plików TypeScript najwyższego poziomu** w katalogu `src/lib/db/`. Poniżej przedstawiono przykładowe moduły podstawowe; pełna lista znajduje się w wykazie zawartości katalogu:

| Moduł                   | Tabele                                                         | Odpowiedzialność                                                                  |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Rejestrowanie dostawców oraz danych uwierzytelniających OAuth/kluczy API          |
| `models.ts`             | `key_value` (dane modeli)                                      | Definicje modeli, możliwości, ceny                                                |
| `combos.ts`             | `combos`                                                       | Konfiguracje routingu kombinacji i ich kolejność                                  |
| `apiKeys.ts`            | `api_keys`                                                     | Cykl życia kluczy API, zakresy uprawnień, śledzenie limitów                       |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfiguracja systemu i współdzielony magazyn KV                                   |
| `backup.ts`             | —                                                              | Operacje eksportowania/importowania kopii zapasowych                              |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfiguracje serwerów proxy i reguły routingu                                     |
| `prompts.ts`            | `prompt_templates`                                             | Szablony promptów wielokrotnego użytku i wersjonowanie                            |
| `webhooks.ts`           | `webhooks`                                                     | Subskrypcje webhooków sterowane zdarzeniami oraz dzienniki                        |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Rejestrowanie audytowe poszczególnych żądań (opcjonalne, duży wolumen)            |
| `domainState.ts`        | `domain_*` (5 tabel)                                           | Budżety domen, wyłączniki awaryjne, blokady, łańcuchy rezerwowe, historia kosztów |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Klucze API z listy dozwolonych dla MCP/A2A                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historyczne wykorzystanie limitów                                                 |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapowanie modeli na domyślne kombinacje                                           |
| `cliToolState.ts`       | `cli_tool_state`                                               | Trwały stan specyficzny dla CLI                                                   |
| `encryption.ts`         | —                                                              | Funkcje pomocnicze do szyfrowania/odszyfrowywania pól                             |
| `readCache.ts`          | —                                                              | Pamięć podręczna w pamięci operacyjnej dla operacji z dużą liczbą odczytów        |
| `secrets.ts`            | `key_value` (zaszyfrowane wpisy)                               | Przechowywanie zaszyfrowanych sekretów                                            |
| `stateReset.ts`         | —                                                              | Czyszczenie/resetowanie stanu bazy danych na potrzeby testów                      |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kontekst sesji na potrzeby przekazywania zadań między agentami                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Śledzenie użycia                                                                  |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfiguracja kompresji                                                            |

### Granice modułów

Podstawowa reguła architektoniczna: **moduły nie uzyskują bezpośredniego dostępu do tabel innych modułów**. Aby pracować z danymi innego modułu, należy zaimportować funkcję z tego modułu.

```ts
// ❌ ŹLE: bezpośrednie zapytanie SQL do tabeli innego modułu
db.prepare("SELECT * FROM provider_connections").all();

// ✅ DOBRZE: użycie funkcji modułu providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Przestrzeganie tej reguły jest egzekwowane podczas przeglądu kodu — nie istnieje kontrola statyczna, ale naruszenia są oznaczane.

---

## Schemat bazowy (17 tabel)

`core.ts` definiuje 17 tabel bazowych w `SCHEMA_SQL`. Są one tworzone przez migrację `001_initial_schema.sql` i stanowią główny schemat.

### Główne tabele (tworzone podczas migracji początkowej)

| Tabela                     | Przeznaczenie                                | Kluczowe kolumny                                                        |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Dane uwierzytelniające dostawcy (szyfrowane) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informacje o routingu węzłów dostawcy        | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ogólny magazyn klucz-wartość                 | `namespace`, `key`, `value`                                             |
| `combos`                   | Definicje kombinacji routingu                | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Klucze API dla bramy                         | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadane bazy danych                         | `key`, `value`                                                          |
| `usage_history`            | Rekordy wykorzystania żądań                  | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Dane żądań i odpowiedzi                      | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Dzienniki żądań proxy                        | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Łańcuchy model–dostawca                      | `model`, `chain`                                                        |
| `domain_budgets`           | Budżety wydatków dla poszczególnych domen    | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historia resetowania budżetów                | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Śledzenie kosztów dla poszczególnych domen   | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stan limitowania częstotliwości dla domen    | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stan wyłącznika awaryjnego dla każdej domeny | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Pamięć podręczna odpowiedzi LLM              | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historyczne migawki limitów                  | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Dodatkowe tabele (dodane przez późniejsze migracje)

Kolejne migracje dodają między innymi następujące tabele:

- `cli_tool_state` (migracja 011) — stan narzędzia CLI
- tabele `mcp_*` — audyt serwera MCP
- tabele `a2a_*` — stan zadań A2A
- tabele `usage_*` — śledzenie wykorzystania
- tabele `plugin_*` — system wtyczek
- `skill_executions` — historia wykonywania umiejętności
- tabele `memory_*` — system pamięci
- tabele `compression_*` — system kompresji
- tabele `webhook_*` — dziennik dostarczania webhooków
- tabele `acp_*` — Agent Client Protocol
- tabele `oneproxy_*` — platforma handlowa 1proxy
- `proxy_assignments` — powiązania zakresów proxy
- `detailed_call_artifacts` — metadane artefaktów dziennika wywołań
- `quota_alert_history` — audyt alertów dotyczących limitów
- `command_code_auth_sessions` — sesje OAuth Command Code

Pełna lista ponad 30 tabel znajduje się w `src/lib/db/migrations/`.

---

## Migracje

OmniRoute używa **wersjonowanych, idempotentnych migracji** w katalogu `src/lib/db/migrations/`. Każda migracja jest pojedynczym plikiem SQL o nazwie `NNN_description.sql`.

### Nazewnictwo migracji

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Sposób uruchamiania migracji

Podczas uruchamiania `migrationRunner.ts`:

1. Tworzy tabelę `_omniroute_migrations`, jeśli jeszcze nie istnieje
2. Wyszukuje już zastosowane migracje
3. Stosuje kolejno wszystkie nowe migracje, każdą w osobnej transakcji
4. Rejestruje każdą zastosowaną migrację wraz ze znacznikiem czasu

```ts
// src/lib/db/migrationRunner.ts (uproszczony)
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

### Idempotentność

Migracje muszą być **idempotentne** — ich dwukrotne uruchomienie nie powinno powodować żadnych zmian:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Należy często używać klauzul `IF NOT EXISTS`, `IF EXISTS` oraz `OR IGNORE` / `OR REPLACE`.

### Dodawanie nowej migracji

1. **Ustal następny numer**: `ls src/lib/db/migrations/ | tail -1`
2. **Utwórz plik**: `NNN_my_change.sql`
3. **Używaj bezpiecznych instrukcji DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Ostrożnie uzupełniaj dane**: używaj `UPDATE ... WHERE ...`, aby prawidłowo obsłużyć istniejące wiersze
5. **Przetestuj na kopii**: nigdy nie uruchamiaj nieprzetestowanych migracji w środowisku produkcyjnym

Przykład:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Zmiany niekompatybilne wstecznie** (np. usuwanie kolumn) są problematyczne. OmniRoute NIE obsługuje wycofywania wersji — po zastosowaniu migracji zmiana schematu jest trwała. Należy odpowiednio ją zaplanować.

---

## Szyfrowanie danych przechowywanych

Pola poufne (klucze API, tokeny OAuth, parametry połączenia) są szyfrowane podczas przechowywania za pomocą algorytmu **AES-256-GCM**.

### Jak to działa

```ts
// src/lib/db/encryption.ts (uproszczony)
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
- Wpisy `key_value` z `namespace = "secrets"` — szyfrowane na poziomie aplikacji
- `proxy_registry.auth` — szyfrowane na poziomie aplikacji (jeśli występuje)

### Klucz szyfrowania

Klucz szyfrowania jest wyprowadzany z **hasła** (ustawianego za pomocą zmiennej środowiskowej `STORAGE_ENCRYPTION_KEY`) oraz **soli** (przechowywanej w bazie danych). Obie wartości są wymagane do odszyfrowania danych.

```bash
# Wygeneruj bezpieczne hasło
openssl rand -hex 32

# Ustaw w pliku .env
STORAGE_ENCRYPTION_KEY=<twój-klucz>
```

> **Krytyczne**: Utrata klucza szyfrowania oznacza utratę dostępu do wszystkich zaszyfrowanych danych. **Utwórz kopię zapasową klucza oddzielnie od bazy danych**.

### Co NIE jest szyfrowane

Ze względów wydajnościowych następujące dane są przechowywane w postaci jawnego tekstu:

- Nazwy wyświetlane dostawców
- Definicje modeli (są już publiczne)
- Reguły routingu
- Rekordy użycia (nie zawierają danych osobowych)

---

## Uwagi dotyczące szyfrowania (v3.8.16+)

OmniRoute używa funkcji **`migrateLegacyEncryptedString()`**, aby w sposób niewidoczny obsługiwać dwa schematy szyfrowania:

- **Starszy** (sprzed v3.5.0): „szyfrowanie” oparte na XOR (nie jest to prawdziwa kryptografia)
- **Obecny**: AES-256-GCM z prawidłowym wektorem IV i tagiem uwierzytelniającym

Funkcja pomocnicza migracji wykrywa starszy format i przy pierwszym odczycie ponownie szyfruje dane przy użyciu nowego schematu. Oznacza to, że można zaktualizować starą bazę danych bez utraty danych uwierzytelniających.

---

## Pamięć podręczna odczytu

W przypadku często odczytywanych danych (modeli, dostawców, ustawień) plik `readCache.ts` zapewnia **pamięć podręczną w pamięci operacyjnej**:

```ts
// Buforowane podczas uruchamiania, unieważniane przy zapisie
const providers = await getCachedProviders(); // Szybkie, z pamięci operacyjnej
const fresh = await listProviders(); // Wolne, odczytuje z bazy danych
```

| Buforowana encja       | Klucz pamięci podręcznej | TTL               |
| ---------------------- | ------------------------ | ----------------- |
| `models`               | `models:v1`              | Do momentu zapisu |
| `provider_connections` | `providers:v1`           | Do momentu zapisu |
| `settings`             | `settings:v1`            | Do momentu zapisu |
| `combos`               | `combos:v1`              | Do momentu zapisu |

Pamięć podręczna jest unieważniana przy każdym zapisie do odpowiedniej tabeli.

---

## Tworzenie i przywracanie kopii zapasowych

### Ręczne tworzenie kopii zapasowej

```bash
# Użyj interfejsu CLI, aby utworzyć lokalną kopię zapasową
omniroute backup create --name pre-migration

# Lub za pośrednictwem API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Plik kopii zapasowej zawiera:

- Wszystkie tabele bazy danych (serializowane do formatu JSON)
- Artefakty dziennika wywołań (zakodowane w formacie base64, opcjonalne)
- Ustawienia i dane poufne (zaszyfrowane)
- Konfigurację wtyczek

### Przywracanie

```bash
# Za pośrednictwem CLI
omniroute restore pre-migration

# Za pośrednictwem API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Ostrzeżenie**: Przywracanie nadpisuje całą bazę danych. Najpierw zatrzymaj wszystkich klientów.

### Automatyczne kopie zapasowe

```bash
# Włącz automatyczne codzienne kopie zapasowe za pośrednictwem CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Harmonogram jest wykonywany po stronie serwera przez zadanie działające w tle, które uruchamia się co 30 sekund
(domyślnie) i sprawdza wyrażenie cron względem lokalnego czasu serwera.

| Zmienna                                     | Wartość domyślna | Opis                                                                                                                             |
| ------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`          | Interwał uruchamiania w ms (min. `5000`). Musi być krótszy niż 60 s, aby niezawodnie trafić w pasującą minutę harmonogramu cron. |

### Kopia zapasowa działającej bazy SQLite

Aby utworzyć kopię zapasową działającej bazy danych bez przestojów:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Wykorzystuje to internetowy interfejs API kopii zapasowych SQLite — można go bezpiecznie używać podczas działania OmniRoute.

---

## Dostrajanie wydajności

### Tryb WAL

Tryb WAL jest domyślnie włączony. W przypadku obciążeń z dużą liczbą zapisów warto rozważyć:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Punkt kontrolny co 1000 stron
PRAGMA journal_size_limit = 67108864;  -- Limit WAL wynoszący 64MB
```

### Indeksy

Kluczowe indeksy zwiększające wydajność (tworzone automatycznie przez migracje):

- `idx_models_provider` — wyszukiwanie modeli według dostawcy
- `idx_combo_targets_combo_id` — rozwijanie celów kombinacji
- `idx_usage_history_api_key_timestamp` — analiza użycia
- `idx_quota_snapshots_api_key_window` — śledzenie limitów
- `idx_call_logs_timestamp` — zapytania dotyczące rejestru wywołań

Aby dodać nowy indeks, utwórz migrację:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Operacje wejścia/wyjścia mapowane w pamięci

W przypadku bardzo dużych baz danych (>10GB) mapowanie pamięci można dostosować za pomocą dyrektywy pragma SQLite:

```sql
-- Ustaw za pomocą dyrektywy pragma SQLite (dostosuj w core.ts lub w środowisku uruchomieniowym)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Kompaktowanie

Długotrwale działające instancje OmniRoute mogą skorzystać na okresowym wykonywaniu polecenia `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Uruchamiaj je co miesiąc w okresach małego ruchu. (Tryb WAL zmniejsza tę potrzebę, ale jej nie eliminuje).

---

## Kontrola kondycji

Plik `src/lib/db/healthCheck.ts` udostępnia **diagnostykę kondycji na poziomie bazy danych**:

Obie metody wymagają uwierzytelnienia (w przeciwnym razie zwracany jest kod `401`). Metoda `GET` wykonuje tylko diagnostykę, natomiast `POST` uruchamia tę samą kontrolę z włączoną opcją `autoRepair`.

```bash
GET  /api/db/health   # diagnostyka
POST /api/db/health   # diagnostyka + naprawa
```

Odpowiedzią jest obiekt `DbHealthCheckResult` utworzony przez funkcję `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Limity domen odwoływały się do kluczy API, które już nie istnieją.",
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

| Pole              | Znaczenie                                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Ma wartość `true`, gdy `issues` jest puste. Pole `driver` nigdy nie wpływa na tę wartość.                                                                                                         |
| `issues[].type`   | Jedna z wartości: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                                |
| `repairedCount`   | Liczba wierszy naprawionych podczas tego uruchomienia; zawsze `0`, gdy `autoRepair` ma wartość false.                                                                                             |
| `backupCreated`   | Określa, czy przed naprawą utworzono kopię zapasową.                                                                                                                                              |
| `checkedAt`       | Znacznik czasu ISO wspólny dla uruchomienia oraz dla każdej zapisanej przez nie notatki dotyczącej naprawy.                                                                                       |
| `driver.name`     | Sterownik SQLite obsługujący sprawdzaną bazę danych.                                                                                                                                              |
| `driver.degraded` | Ma wartość `true`, gdy zapisy nie są trwale przechowywane w pliku bazy danych — w przypadku awaryjnego sterownika WASM `sql.js` (trwałość całego pliku) lub bazy danych przechowywanej w pamięci. |

Ten sam ładunek jest zwracany przez narzędzie MCP `omniroute_db_health_check`.

Uruchom `PRAGMA integrity_check`, aby wykryć uszkodzenia:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Powinno zostać wyświetlone: ok
```

Jeśli zostanie zwrócone cokolwiek innego niż `ok`, **natychmiast przestań używać bazy danych** i przywróć ją z kopii zapasowej.

---

## Odzyskiwanie po awarii

### Scenariusz 1: Utrata pliku WAL

Brakuje pliku `-wal`, ale plik `-shm` i główna baza danych są nienaruszone:

```bash
# Automatyczne odzyskiwanie przy następnym otwarciu
omniroute
```

Jeśli SQLite nie może przeprowadzić automatycznego odzyskiwania:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenariusz 2: Uszkodzenie głównego pliku bazy danych

Przywróć dane z kopii zapasowej:

```bash
omniroute sync pull --merge   # lub: omniroute backup restore <backup-id>
```

### Scenariusz 3: Utrata klucza szyfrowania

Bez klucza **odzyskanie danych nie jest możliwe**. Zaszyfrowanych pól nie można odczytać. Ponownie dodaj ręcznie wszystkich dostawców, używając nowych danych uwierzytelniających.

> **Środek zaradczy**: Zawsze przechowuj oddzielną kopię zapasową klucza szyfrowania, najlepiej w menedżerze haseł lub systemie KMS.

### Scenariusz 4: Brak miejsca na dysku

SQLite zwróci błędy `SQLITE_FULL`. Zwolnij miejsce na dysku, a następnie wykonaj:

```bash
# Wykonaj punkt kontrolny WAL, aby zwolnić miejsce
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Typowe operacje

### Sprawdzanie tabeli

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Liczenie wierszy we wszystkich tabelach

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Resetowanie (usuwanie) wszystkich danych

```bash
# Najpierw zatrzymaj OmniRoute
omniroute stop

# Usuń plik bazy danych
rm ~/.omniroute/storage.sqlite*

# Uruchom ponownie (zostanie utworzona pusta baza danych)
omniroute
```

Aby wykonać reset **selektywny** (zachować dostawców, usunąć dane dotyczące użycia):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Eksportowanie pojedynczej tabeli

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Rozwiązywanie problemów

### „Baza danych jest zablokowana”

Inny proces utrzymuje blokadę zapisu. Możesz:

- Poczekać na zakończenie innego procesu (sprawdź za pomocą `lsof | grep storage.sqlite`)
- Zakończyć inny proces
- Jeśli problem nie ustępuje, uruchomić ponownie OmniRoute

### „Naruszono ograniczenie klucza obcego”

Moduł domeny narusza integralność referencyjną. Sprawdź:

- Osierocone wiersze w tabelach zależnych
- Kaskadowe usunięcia, które nie zostały rozpropagowane
- Ostatnią migrację, która zmieniła klucz obcy

Uruchom `PRAGMA foreign_key_check;`, aby znaleźć naruszenia.

### „Brak pamięci”

Operacje wejścia/wyjścia SQLite mapowane w pamięci przekraczają limit systemu operacyjnego. Zmniejsz limit za pomocą dyrektywy pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128 MB zamiast 256 MB
```

Możesz też wyłączyć tę funkcję:

```sql
PRAGMA mmap_size = 0;
```

### „Migracja nie powiodła się w trakcie wykonywania”

Migracja została wykonana w ramach transakcji, dlatego jej zmiany powinny zostać wycofane. Jeśli tak się nie stało:

1. **Zatrzymaj OmniRoute** (aby zapobiec kolejnym próbom)
2. **Sprawdź stan bazy danych** za pomocą `sqlite3`
3. **Ręcznie napraw** częściowo wykonaną migrację
4. **Uruchom ponownie** OmniRoute (migracja zostanie ponowiona)

Aby temu zapobiec, zawsze najpierw testuj migracje na kopii bazy danych.

---

## Zobacz także

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabele użycia
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitorowanie stanu
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — proces wydawania wersji
- Źródło: `src/lib/db/` (ponad 80 plików, około 25 tys. wierszy kodu)
