# DATABASE_GUIDE (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

# Vodič kroz šemu baze podataka i operacije

> **TL;DR**: OmniRoute koristi **SQLite sa WAL žurnaliranjem** kao primarnu pohranu, uz **AES-256-GCM** enkripciju u stanju mirovanja za osjetljiva polja. Ovaj vodič pokriva šemu, migracije, sigurnosne kopije/oporavak i operativne priručnike.

**Izvori:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 osnovnih tabela)
- `src/lib/db/migrationRunner.ts` — verzionisane migracije
- `src/lib/db/migrations/` — 167 verzionisanih SQL datoteka
- `src/lib/db/encryption.ts` — pomoćni alati za enkripciju
- `src/lib/db/backup.ts` — izvoz/uvoz sigurnosnih kopija
- `src/lib/db/healthCheck.ts` — dijagnostika stanja

---

## Zašto SQLite?

OmniRoute je odabrao SQLite umjesto PostgreSQL/MySQL iz nekoliko razloga:

| Faktor                | SQLite                                  | PostgreSQL                            |
| --------------------- | --------------------------------------- | ------------------------------------- |
| **Implementacija**    | Ugrađeno — nije potreban poseban server | Zahtijeva postavljanje servera        |
| **Enkripcija**        | Sloj aplikacije (AES-256-GCM)           | Ugrađeni TDE                          |
| **Performanse**       | Brže za mala/srednja opterećenja        | Bolje za ogromne istovremene upise    |
| **Konkurentnost**     | WAL režim omogućava istovremena čitanja | Puni MVCC                             |
| **Sigurnosna kopija** | Kopija jedne datoteke                   | `pg_dump` ili snimak sistema datoteka |
| **Slučaj upotrebe**   | Instalacija po korisniku, ugrađeno      | Multi-tenant SaaS                     |

Za implementacije sa **jednim korisnikom i jednom instancom** (primarni slučaj upotrebe OmniRoute-a), SQLite je jednostavniji i brži.

### WAL žurnaliranje

`core.ts` otvara bazu podataka sa **WAL (Write-Ahead Logging) režimom**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL omogućava **istovremena čitanja** tokom upisa — važno za kontrolnu ploču, koja vrši upite dok se zahtjevi snimaju.

Zadana veličina keša je **65,536 KiB (64 MiB)**. SQLite interpretira negativan `cache_size` kao približnu gornju granicu u KiB i dodjeljuje stranice na zahtjev.
**Settings > System & Storage > Cache Size** prihvata cjelobrojne vrijednosti od **1 do 1,000,000 KiB**; spremanje postavke primjenjuje je na aktivnu konekciju baze podataka, a OmniRoute vraća sačuvanu vrijednost pri pokretanju.

---

## Lokacija baze podataka

SQLite datoteka je pohranjena na:

| OS      | Putanja                                                     |
| ------- | ----------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                               |
| macOS   | `~/.omniroute/storage.sqlite`                               |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker  | `/app/data/storage.sqlite` (konfigurisano putem `DATA_DIR`) |

Prateće datoteke:

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — datoteka dijeljene memorije
- `call_logs/` — artefakti sadržaja zahtjeva (ako je omogućeno)

**Nadjačajte lokaciju:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arhitektura domenskih modula

OmniRoute baza podataka ima **110 TypeScript modula najvišeg nivoa** u `src/lib/db/`. Svaki domenski modul:

- Posjeduje jednu ili više specifičnih tabela
- Eksportuje tipizirane CRUD funkcije
- Nikada ne pristupa tabelama drugog modula
- Koristi `getDbInstance()` iz `core.ts` za pristup bazi podataka

### 110 DB modula najvišeg nivoa

OmniRoute ima **110 TypeScript datoteka najvišeg nivoa** u `src/lib/db/`. Ispod je uzorak osnovnih modula; pogledajte listu direktorija za kompletnu listu:

| Modul                   | Tabele                                                         | Odgovornost                                                                          |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Registracija provajdera OAuth/API ključeva i akreditivi                              |
| `models.ts`             | `key_value` (podaci o modelu)                                  | Definicije modela, mogućnosti, cijene                                                |
| `combos.ts`             | `combos`                                                       | Konfiguracije rutiranja kombinacija i redoslijed                                     |
| `apiKeys.ts`            | `api_keys`                                                     | Životni ciklus API ključeva, opsezi, praćenje kvota                                  |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Sistemska konfiguracija i dijeljeno KV skladište                                     |
| `backup.ts`             | —                                                              | Operacije izvoza/uvoza rezervnih kopija                                              |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy konfiguracije i pravila rutiranja                                              |
| `prompts.ts`            | `prompt_templates`                                             | Višekratni šabloni promptova, verziranje                                             |
| `webhooks.ts`           | `webhooks`                                                     | Pretplate na webhook-ove vođene događajima i logovi                                  |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Audit logovanje po zahtjevu (opciono, visok volumen)                                 |
| `domainState.ts`        | `domain_*` (5 tabela)                                          | Budžeti domena, circuit breaker-i, zaključavanja, fallback lanci, historija troškova |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API ključevi na bijeloj listi za MCP/A2A                                             |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historijska upotreba kvota                                                           |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapiranje modela na podrazumijevane kombinacije                                      |
| `cliToolState.ts`       | `cli_tool_state`                                               | Perzistentno stanje specifično za CLI                                                |
| `encryption.ts`         | —                                                              | Pomoćne funkcije za enkripciju/dekripciju polja                                      |
| `readCache.ts`          | —                                                              | In-memory keš za operacije sa puno čitanja                                           |
| `secrets.ts`            | `key_value` (enkriptovani unosi)                               | Skladište enkriptovanih tajni                                                        |
| `stateReset.ts`         | —                                                              | Brisanje/resetovanje stanja baze podataka za testiranje                              |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kontekst sesije za primopredaju agenta                                               |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Praćenje upotrebe                                                                    |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfiguracija kompresije                                                             |

### Granice modula

Osnovno arhitektonsko pravilo: **moduli ne pristupaju direktno tabelama drugih modula**. Da biste radili sa podacima drugog modula, importujte funkciju iz tog modula.

```ts
// ❌ POGREŠNO: direktan SQL iz drugog modula
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ISPRAVNO: koristite funkciju modula providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Ovo pravilo se provodi putem pregleda koda — ne postoji statička provjera, ali se kršenja označavaju.

---

## Osnovna šema (17 tabela)

`core.ts` definiše 17 osnovnih tabela u `SCHEMA_SQL`. One se kreiraju migracijom `001_initial_schema.sql` i čine osnovnu šemu.

### Osnovne tabele (kreirane u početnoj migraciji)

| Tabela                     | Namjena                                      | Ključne kolone                                                          |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Akreditivi provajdera (enkriptovani)         | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informacije o rutiranju čvorova provajdera   | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Opšta KV (ključ-vrijednost) memorija         | `namespace`, `key`, `value`                                             |
| `combos`                   | Definicije kombinacija rutiranja             | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API ključevi za gateway                      | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metapodaci baze podataka                     | `key`, `value`                                                          |
| `usage_history`            | Zapisi o korišćenju zahtjeva                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payload-ovi i odgovori zahtjeva              | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logovi proxy zahtjeva                        | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Lanci model-ka-provajderu                    | `model`, `chain`                                                        |
| `domain_budgets`           | Budžeti potrošnje po domenu                  | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Istorija resetovanja budžeta                 | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Praćenje troškova po domenu                  | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stanje ograničenja stope (rate-limit) domena | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stanje prekidača (circuit breaker) po domenu | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Keš LLM odgovora                             | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Istorijski snimci kvota                      | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Dodatne tabele (dodate kasnijim migracijama)

Naknadne migracije dodaju tabele kao što su:

- `cli_tool_state` (migracija 011) — stanje CLI alata
- `mcp_*` tabele — revizija MCP servera
- `a2a_*` tabele — stanje A2A zadatka
- `usage_*` tabele — praćenje korišćenja
- `plugin_*` tabele — sistem dodataka (plugin sistem)
- `skill_executions` — istorija izvršavanja vještina
- `memory_*` tabele — sistem memorije
- `compression_*` tabele — sistem kompresije
- `webhook_*` tabele — log isporuke webhook-ova
- `acp_*` tabele — Agent Client Protocol
- `oneproxy_*` tabele — 1proxy tržište
- `proxy_assignments` — povezivanja opsega proxy-ja
- `detailed_call_artifacts` — metapodaci artefakata logova poziva
- `quota_alert_history` — revizija upozorenja o kvotama
- `command_code_auth_sessions` — Command Code OAuth sesije

Kompletna lista od ~30+ tabela se nalazi u `src/lib/db/migrations/`.

---

## Migracije

OmniRoute koristi **verzionisane, idempotentne migracije** u `src/lib/db/migrations/`. Svaka migracija je pojedinačna SQL datoteka nazvana `NNN_description.sql`.

### Imenovanje migracija

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Kako se migracije izvršavaju

Prilikom pokretanja, `migrationRunner.ts`:

1. Kreira tabelu `_omniroute_migrations` ako ne postoji
2. Provjerava već primijenjene migracije
3. Primjenjuje sve nove migracije redom, svaku unutar transakcije
4. Bilježi svaku primijenjenu migraciju sa vremenskom oznakom

```ts
// src/lib/db/migrationRunner.ts (pojednostavljeno)
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

### Idempotentnost

Migracije moraju biti **idempotentne** — njihovo ponovno pokretanje ne bi trebalo imati nikakav efekat (no-op):

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Slobodno koristite klauzule `IF NOT EXISTS`, `IF EXISTS`, i `OR IGNORE` / `OR REPLACE`.

### Dodavanje nove migracije

1. **Identifikujte sljedeći broj**: `ls src/lib/db/migrations/ | tail -1`
2. **Kreirajte datoteku**: `NNN_my_change.sql`
3. **Koristite siguran DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Pažljivo popunite podatke**: koristite `UPDATE ... WHERE ...` za obradu postojećih redova
5. **Testirajte na kopiji**: nikada ne pokrećite netestirane migracije u produkciji

Primjer:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Promjene koje nisu kompatibilne unazad** (npr. brisanje kolona) su komplikovane. OmniRoute NE podržava vraćanje na prethodnu verziju (downgrade) — kada se migracija primijeni, promjena šeme je trajna. Planirajte u skladu s tim.

---

## Enkripcija u mirovanju

Osjetljiva polja (API ključevi, OAuth tokeni, stringovi za povezivanje) su šifrovana u mirovanju koristeći **AES-256-GCM**.

### Kako to funkcioniše

```ts
// src/lib/db/encryption.ts (pojednostavljeno)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Gdje se koristi

- `provider_connections.api_key` — šifrovano na nivou aplikacije
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifrovano na nivou aplikacije
- `key_value` unosi sa `namespace = "secrets"` — šifrovano na nivou aplikacije
- `proxy_registry.auth` — šifrovano na nivou aplikacije (ako postoji)

### Ključ za enkripciju

Ključ za enkripciju se izvodi iz **lozinke** (postavljene putem `STORAGE_ENCRYPTION_KEY` varijable okruženja) i **soli** (sačuvane u bazi podataka). Oboje je potrebno za dešifrovanje podataka.

```bash
# Generišite sigurnu lozinku
openssl rand -hex 32

# Postavite u .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritično**: Gubitak ključa za enkripciju znači gubitak pristupa svim šifrovanim podacima. **Napravite rezervnu kopiju ključa odvojeno od baze podataka**.

### Šta NIJE šifrovano

Iz razloga performansi, sljedeće se čuva u čistom tekstu (plaintext):

- Prikazana imena provajdera
- Definicije modela (već javne)
- Pravila rutiranja
- Zapisi o korišćenju (bez PII)

---

## Upozorenja o enkripciji (v3.8.16+)

OmniRoute koristi **`migrateLegacyEncryptedString()`** za transparentno rukovanje dvjema šemama enkripcije:

- **Naslijeđeno** (prije v3.5.0): XOR-bazirana "enkripcija" (nije prava kriptografija)
- **Trenutno**: AES-256-GCM sa odgovarajućim IV i auth tagom

Pomoćni alat za migraciju detektuje naslijeđeni format i ponovo vrši enkripciju novom šemom pri prvom čitanju. To znači da možete nadograditi staru bazu podataka bez gubitka vjerodajnica.

---

## Keš čitanja

Za podatke koji se često čitaju (modeli, provajderi, postavke), `readCache.ts` pruža **in-memory keš**:

```ts
// Keširano pri pokretanju, poništeno pri pisanju
const providers = await getCachedProviders(); // Brzo, in-memory
const fresh = await listProviders(); // Sporo, pristupa bazi podataka
```

| Keširani entitet       | Ključ keša     | TTL        |
| ---------------------- | -------------- | ---------- |
| `models`               | `models:v1`    | Do pisanja |
| `provider_connections` | `providers:v1` | Do pisanja |
| `settings`             | `settings:v1`  | Do pisanja |
| `combos`               | `combos:v1`    | Do pisanja |

Keš se poništava pri svakom pisanju u odgovarajuću tabelu.

---

## Sigurnosna kopija i oporavak

### Ručna sigurnosna kopija

```bash
# Koristite CLI za kreiranje lokalne sigurnosne kopije
omniroute backup create --name pre-migration

# Ili putem API-ja
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Datoteka sigurnosne kopije uključuje:

- Sve tabele baze podataka (serijalizovane u JSON)
- Artefakti dnevnika poziva (base64-kodirani, opcionalno)
- Postavke + tajne (enkriptovane)
- Konfiguracija dodataka

### Oporavak

```bash
# Putem CLI-ja
omniroute restore pre-migration

# Putem API-ja
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Upozorenje**: Oporavak prepisuje cijelu bazu podataka. Prvo zaustavite sve klijente.

### Automatizovane sigurnosne kopije

```bash
# Omogućite automatizovane dnevne sigurnosne kopije putem CLI-ja
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Raspored se izvršava na strani servera putem pozadinskog posla koji se aktivira svakih 30 sekundi (podrazumijevano) i procjenjuje cron izraz prema lokalnom vremenu servera.

| Varijabla                                   | Podrazumijevano | Opis                                                                                                                      |
| ------------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`         | Interval aktivacije u ms (min `5000`). Mora biti kraći od 60 s da bi se pouzdano uklopio unutar odgovarajuće cron minute. |

### SQLite Hot Backup

Za sigurnosnu kopiju aktivne baze podataka bez zastoja:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Ovo koristi SQLite-ov API za online sigurnosne kopije — sigurno za pokretanje dok OmniRoute radi.

---

## Podešavanje performansi

### WAL režim

WAL je omogućen po podrazumevanoj vrednosti. Za radna opterećenja sa velikim brojem upisa, razmotrite:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Checkpoint na svakih 1000 stranica
PRAGMA journal_size_limit = 67108864;  -- Ograničenje WAL-a od 64MB
```

### Indeksi

Ključni indeksi za performanse (automatski kreirani migracijama):

- `idx_models_provider` — pretraga modela po provajderu
- `idx_combo_targets_combo_id` — proširenje combo ciljeva
- `idx_usage_history_api_key_timestamp` — analitika korišćenja
- `idx_quota_snapshots_api_key_window` — praćenje kvota
- `idx_call_logs_timestamp` — upiti dnevnika poziva

Da biste dodali novi indeks, kreirajte migraciju:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memory-Mapped I/O

Za veoma velike baze podataka (>10GB), memorijsko mapiranje se može podesiti putem SQLite pragma:

```sql
-- Podesite putem SQLite pragma (prilagodite u core.ts ili tokom izvršavanja)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Kompakcija

OmniRoute instance koje dugo rade imaju koristi od povremenog `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Pokrenite mesečno tokom perioda slabog saobraćaja. (WAL režim smanjuje potrebu, ali je ne eliminiše.)

---

## Provera zdravlja

`src/lib/db/healthCheck.ts` pruža dijagnostiku zdravlja na nivou baze podataka:

Oba glagola zahtevaju autentifikaciju (u suprotnom vraćaju `401`). `GET` samo dijagnostikuje; `POST` pokreće istu proveru sa omogućenim `autoRepair`.

```bash
GET  /api/db/health   # dijagnostika
POST /api/db/health   # dijagnostika + popravka
```

Odgovor je `DbHealthCheckResult` koji proizvodi `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domain budgets referenced API keys that no longer exist.",
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

| Polje             | Značenje                                                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `true` kada su `issues` prazni. `driver` nikada ne utiče na ovo.                                                                                       |
| `issues[].type`   | Jedan od `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                              |
| `repairedCount`   | Redovi popravljeni tokom ovog pokretanja; uvek `0` kada je `autoRepair` false.                                                                         |
| `backupCreated`   | Da li je napravljena rezervna kopija pre popravke.                                                                                                     |
| `checkedAt`       | ISO vremenska oznaka koju dele pokretanje i svaka beleška o popravci koju ono zapiše.                                                                  |
| `driver.name`     | SQLite drajver koji opslužuje proverenu bazu podataka.                                                                                                 |
| `driver.degraded` | `true` kada upisi nisu trajno podržani u datoteci baze podataka — `sql.js` WASM rezervna opcija (trajnost cele datoteke) ili baza podataka u memoriji. |

Isti payload vraća `omniroute_db_health_check` MCP alat.

Pokrenite `PRAGMA integrity_check` da biste otkrili oštećenja:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Trebalo bi da ispiše: ok
```

Ako vrati bilo šta osim `ok`, odmah prestanite da koristite bazu podataka i vratite je iz rezervne kopije.

---

## Oporavak od katastrofe

### Scenario 1: Izgubljena WAL datoteka

Datoteka `-wal` nedostaje, ali `-shm` i glavna baza podataka su netaknuti:

```bash
# Automatski se oporavlja pri sljedećem otvaranju
omniroute
```

Ako SQLite ne može automatski izvršiti oporavak:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenario 2: Glavna datoteka baze podataka je oštećena

Vratite iz sigurnosne kopije:

```bash
omniroute sync pull --merge   # ili: omniroute backup restore <backup-id>
```

### Scenario 3: Izgubljen ključ za šifriranje

**Oporavak nije moguć** bez ključa. Šifrirana polja su nečitljiva. Ponovo dodajte sve provajdere ručno s novim vjerodajnicama.

> **Ublažavanje rizika**: Uvijek posebno sigurnosno kopirajte ključ za šifriranje, idealno u upravitelju lozinki ili KMS-u.

### Scenario 4: Disk je pun

SQLite će vratiti `SQLITE_FULL` greške. Oslobodite prostor na disku, a zatim:

```bash
# Checkpoint WAL za oslobađanje prostora
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Uobičajene operacije

### Pregled tabele

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Brojanje redova u svim tabelama

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Resetovanje (brisanje) svih podataka

```bash
# Prvo zaustavite OmniRoute
omniroute stop

# Izbrišite datoteku baze podataka
rm ~/.omniroute/storage.sqlite*

# Ponovo pokrenite (ponovo će kreirati praznu bazu podataka)
omniroute
```

Za **selektivno** resetovanje (zadržite provajdere, obrišite upotrebu):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Izvoz jedne tabele

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Rješavanje problema

### "Database is locked"

Drugi proces drži zaključavanje za pisanje. Ili:

- Sačekajte da drugi proces završi (provjerite `lsof | grep storage.sqlite`)
- Ugasite drugi proces
- Ako se problem nastavi, ponovo pokrenite OmniRoute

### "Foreign key constraint failed"

Domenski modul krši referencijalni integritet. Provjerite:

- Redove bez roditelja u zavisnim tabelama
- Kaskadna brisanja koja se nisu propagirala
- Nedavnu migraciju koja je promijenila strani ključ

Pokrenite `PRAGMA foreign_key_check;` da pronađete kršenja.

### "Out of memory"

SQLite-ov memory-mapped I/O premašuje ograničenje OS-a. Smanjite putem SQLite pragma:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB umjesto 256MB
```

Ili onemogućite:

```sql
PRAGMA mmap_size = 0;
```

### "Migration failed mid-way"

Migracija je pokrenuta u transakciji, pa bi se trebala vratiti na prethodno stanje. Ako nije:

1. **Zaustavite OmniRoute** (spriječite dalje pokušaje)
2. **Provjerite stanje baze podataka** pomoću `sqlite3`
3. **Ručno popravite** djelimičnu migraciju
4. **Ponovo pokrenite** OmniRoute (migracija će biti ponovo pokušana)

Da biste ovo spriječili, uvijek prvo testirajte migracije na kopiji.

## Vidi također

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabele korištenja
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — nadzor stanja
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — proces izdavanja
- Izvor: `src/lib/db/` (80+ datoteka, ~25K linija koda)
