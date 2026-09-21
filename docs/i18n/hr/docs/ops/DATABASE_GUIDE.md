# Database Schema & Operations Guide (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute koristi **SQLite s WAL dnevnikom** kao primarno spremište, uz enkripciju **AES-256-GCM** podataka u mirovanju za osjetljiva polja. Ovaj vodič obuhvaća shemu, migracije, sigurnosno kopiranje/oporavak i operativne postupnike.

**Izvori:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 osnovnih tablica)
- `src/lib/db/migrationRunner.ts` — verzionirane migracije
- `src/lib/db/migrations/` — 167 verzioniranih SQL datoteka
- `src/lib/db/encryption.ts` — pomoćne funkcije za enkripciju
- `src/lib/db/backup.ts` — izvoz/uvoz sigurnosnih kopija
- `src/lib/db/healthCheck.ts` — dijagnostika stanja

---

## Zašto SQLite?

OmniRoute je odabrao SQLite umjesto PostgreSQL-a/MySQL-a iz nekoliko razloga:

| Čimbenik              | SQLite                                      | PostgreSQL                                 |
| --------------------- | ------------------------------------------- | ------------------------------------------ |
| **Implementacija**    | Ugrađen — nije potreban zaseban poslužitelj | Zahtijeva postavljanje poslužitelja        |
| **Enkripcija**        | Na razini aplikacije (AES-256-GCM)          | Ugrađeni TDE                               |
| **Performanse**       | Brži za mala/srednja radna opterećenja      | Bolji za golem broj istodobnih zapisivanja |
| **Istodobnost**       | WAL način omogućuje istodobna čitanja       | Potpuni MVCC                               |
| **Sigurnosna kopija** | Kopiranje jedne datoteke                    | `pg_dump` ili snimka datotečnog sustava    |
| **Slučaj uporabe**    | Instalacija po korisniku, ugrađeno rješenje | Višekorisnički SaaS                        |

Za implementacije s **jednim korisnikom i jednom instancom** (primarni slučaj uporabe za OmniRoute), SQLite je jednostavniji i brži.

### WAL dnevnik

`core.ts` otvara bazu podataka u načinu rada **WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL omogućuje **istodobna čitanja** tijekom zapisivanja — što je važno za nadzornu ploču koja izvršava upite dok se zahtjevi bilježe.

Zadana veličina predmemorije iznosi **65,536 KiB (64 MiB)**. SQLite negativnu vrijednost
`cache_size` tumači kao približnu gornju granicu u KiB i dodjeljuje stranice prema potrebi.
**Postavke > Sustav i pohrana > Veličina predmemorije** prihvaća cijele brojeve od **1 do
1,000,000 KiB**; spremanjem postavke ona se primjenjuje na aktivnu vezu s bazom podataka,
a OmniRoute pri pokretanju vraća pohranjenu vrijednost.

---

## Lokacija baze podataka

SQLite datoteka pohranjena je na sljedećoj lokaciji:

| OS      | Putanja                                                             |
| ------- | ------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                       |
| macOS   | `~/.omniroute/storage.sqlite`                                       |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                           |
| Docker  | `/app/data/storage.sqlite` (može se konfigurirati putem `DATA_DIR`) |

Prateće datoteke:

- `storage.sqlite-wal` — dnevnik zapisivanja unaprijed
- `storage.sqlite-shm` — datoteka dijeljene memorije
- `call_logs/` — artefakti sadržaja zahtjeva (ako je omogućeno)

**Promjena lokacije:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arhitektura domenskih modula

Baza podataka OmniRoutea ima **110 vršnih TypeScript modula** u `src/lib/db/`. Svaki domenski modul:

- Posjeduje jednu ili više određenih tablica
- Izvozi tipizirane CRUD funkcije
- Nikad ne pristupa tablicama drugog modula
- Koristi `getDbInstance()` iz `core.ts` za pristup bazi podataka

### 110 vršnih modula baze podataka

OmniRoute ima **110 vršnih TypeScript datoteka** u `src/lib/db/`. U nastavku je prikazan izbor osnovnih modula; potpuni popis nalazi se u sadržaju direktorija:

| Modul                   | Tablice                                                        | Odgovornost                                                                   |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registracija pružatelja putem OAutha/API ključa i pristupni podaci            |
| `models.ts`             | `key_value` (podaci modela)                                    | Definicije modela, mogućnosti, cijene                                         |
| `combos.ts`             | `combos`                                                       | Konfiguracije kombiniranog usmjeravanja i redoslijed                          |
| `apiKeys.ts`            | `api_keys`                                                     | Životni ciklus API ključeva, opsezi i praćenje kvota                          |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfiguracija sustava i zajedničko KV spremište                               |
| `backup.ts`             | —                                                              | Operacije izvoza/uvoza sigurnosnih kopija                                     |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfiguracije proxyja i pravila usmjeravanja                                  |
| `prompts.ts`            | `prompt_templates`                                             | Višekratno upotrebljivi predlošci upita i upravljanje verzijama               |
| `webhooks.ts`           | `webhooks`                                                     | Pretplate i zapisnici webhookova vođeni događajima                            |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Evidentiranje revizijskih podataka za svaki zahtjev (neobavezno, velik opseg) |
| `domainState.ts`        | `domain_*` (5 tablica)                                         | Domenski proračuni, osigurači, blokade, zamjenski lanci i povijest troškova   |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API ključevi na popisu dopuštenih za MCP/A2A                                  |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Povijesna upotreba kvota                                                      |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapiranje modela na zadane kombinacije                                        |
| `cliToolState.ts`       | `cli_tool_state`                                               | Trajno stanje specifično za CLI                                               |
| `encryption.ts`         | —                                                              | Pomoćne funkcije za šifriranje/dešifriranje polja                             |
| `readCache.ts`          | —                                                              | Predmemorija u memoriji za operacije s velikim brojem čitanja                 |
| `secrets.ts`            | `key_value` (šifrirani unosi)                                  | Pohrana šifriranih tajni                                                      |
| `stateReset.ts`         | —                                                              | Brisanje/vraćanje stanja baze podataka radi testiranja                        |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kontekst sesije za prijenos agentu                                            |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Praćenje upotrebe                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfiguracija kompresije                                                      |

### Granice modula

Temeljno arhitekturno pravilo glasi: **moduli ne pristupaju izravno tablicama drugih modula**. Za rad s podacima drugog modula uvezite funkciju iz tog modula.

```ts
// ❌ POGREŠNO: izravan SQL iz drugog modula
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ISPRAVNO: upotrijebite funkciju modula pružatelja
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Ovo se pravilo provodi pregledom koda — ne postoji statička provjera, ali kršenja se označavaju.

---

## Osnovna shema (17 tablica)

`core.ts` definira 17 osnovnih tablica u `SCHEMA_SQL`. One se stvaraju migracijom `001_initial_schema.sql` i čine temeljnu shemu.

### Osnovne tablice (stvorene u početnoj migraciji)

| Tablica                    | Namjena                                   | Ključni stupci                                                          |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Vjerodajnice pružatelja (šifrirane)       | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Podaci o usmjeravanju čvorova pružatelja  | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Opće spremište ključ-vrijednost           | `namespace`, `key`, `value`                                             |
| `combos`                   | Definicije kombinacija usmjeravanja       | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API ključevi za pristupnik                | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metapodaci baze podataka                  | `key`, `value`                                                          |
| `usage_history`            | Zapisi o upotrebi zahtjeva                | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Sadržaji zahtjeva i odgovori              | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Zapisi zahtjeva proxyja                   | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Lanci od modela do pružatelja             | `model`, `chain`                                                        |
| `domain_budgets`           | Proračuni potrošnje po domeni             | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Povijest poništavanja proračuna           | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Praćenje troškova po domeni               | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stanje ograničenja brzine domene          | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stanje prekidača strujnog kruga po domeni | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Predmemorija odgovora LLM-a               | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Povijesne snimke kvota                    | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Dodatne tablice (dodane naknadnim migracijama)

Naknadne migracije dodaju tablice kao što su:

- `cli_tool_state` (migracija 011) — stanje CLI alata
- `mcp_*` tablice — revizija MCP poslužitelja
- `a2a_*` tablice — stanje A2A zadataka
- `usage_*` tablice — praćenje upotrebe
- `plugin_*` tablice — sustav dodataka
- `skill_executions` — povijest izvršavanja vještina
- `memory_*` tablice — memorijski sustav
- `compression_*` tablice — sustav kompresije
- `webhook_*` tablice — zapisnik isporuke webhookova
- `acp_*` tablice — Agent Client Protocol
- `oneproxy_*` tablice — 1proxy tržište
- `proxy_assignments` — povezivanja opsega proxyja
- `detailed_call_artifacts` — metapodaci artefakata zapisnika poziva
- `quota_alert_history` — revizija upozorenja o kvotama
- `command_code_auth_sessions` — OAuth sesije za Command Code

Potpuni popis od približno 30+ tablica nalazi se u `src/lib/db/migrations/`.

---

## Migracije

OmniRoute koristi **verzionirane, idempotentne migracije** u `src/lib/db/migrations/`. Svaka migracija zasebna je SQL datoteka nazvana `NNN_description.sql`.

### Imenovanje migracija

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Kako se migracije izvršavaju

Prilikom pokretanja `migrationRunner.ts`:

1. Stvara tablicu `_omniroute_migrations` ako ne postoji
2. Dohvaća već primijenjene migracije
3. Redom primjenjuje sve nove migracije, svaku unutar transakcije
4. Bilježi svaku primijenjenu migraciju s vremenskom oznakom

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

Migracije moraju biti **idempotentne** — njihovo dvostruko pokretanje ne bi trebalo imati nikakav učinak:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Slobodno koristite klauzule `IF NOT EXISTS`, `IF EXISTS` i `OR IGNORE` / `OR REPLACE`.

### Dodavanje nove migracije

1. **Odredite sljedeći broj**: `ls src/lib/db/migrations/ | tail -1`
2. **Stvorite datoteku**: `NNN_my_change.sql`
3. **Koristite siguran DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Pažljivo dopunite podatke**: koristite `UPDATE ... WHERE ...` za obradu postojećih redaka
5. **Testirajte na kopiji**: nikada ne pokrećite netestirane migracije u produkciji

Primjer:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Promjene koje nisu kompatibilne unatrag** (npr. uklanjanje stupaca) složene su. OmniRoute NE podržava vraćanje na prethodnu verziju — nakon što se migracija primijeni, promjena sheme trajna je. Planirajte u skladu s tim.

---

## Enkripcija pohranjenih podataka

Osjetljiva polja (API ključevi, OAuth tokeni, nizovi za povezivanje) šifriraju se pri pohrani pomoću algoritma **AES-256-GCM**.

### Kako funkcionira

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

- `provider_connections.api_key` — šifrira se na razini aplikacije
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifriraju se na razini aplikacije
- Unosi `key_value` s `namespace = "secrets"` — šifriraju se na razini aplikacije
- `proxy_registry.auth` — šifrira se na razini aplikacije (ako postoji)

### Ključ za šifriranje

Ključ za šifriranje izvodi se iz **pristupne fraze** (postavljene putem varijable okruženja `STORAGE_ENCRYPTION_KEY`) i **soli** (pohranjene u bazi podataka). Oboje je potrebno za dešifriranje podataka.

```bash
# Generirajte sigurnu pristupnu frazu
openssl rand -hex 32

# Postavite u .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritično**: Gubitak ključa za šifriranje znači gubitak pristupa svim šifriranim podacima. **Izradite sigurnosnu kopiju ključa odvojeno od baze podataka**.

### Što NIJE šifrirano

Zbog performansi se sljedeće stavke pohranjuju kao čisti tekst:

- Prikazni nazivi pružatelja usluga
- Definicije modela (već su javne)
- Pravila usmjeravanja
- Zapisi o korištenju (bez osobnih podataka)

---

## Napomene o šifriranju (v3.8.16+)

OmniRoute koristi **`migrateLegacyEncryptedString()`** za transparentno rukovanje dvjema shemama šifriranja:

- **Naslijeđena** (prije v3.5.0): „šifriranje” temeljeno na XOR-u (nije prava kriptografija)
- **Trenutačna**: AES-256-GCM s odgovarajućim IV-om i autentifikacijskom oznakom

Pomoćna funkcija za migraciju otkriva naslijeđeni format i pri prvom čitanju ponovno šifrira podatke novom shemom. To znači da možete nadograditi staru bazu podataka bez gubitka vjerodajnica.

---

## Predmemorija za čitanje

Za podatke koji se često čitaju (modele, pružatelje usluga, postavke), `readCache.ts` pruža **predmemoriju u memoriji**:

```ts
// Predmemorirano pri pokretanju, poništava se pri zapisivanju
const providers = await getCachedProviders(); // Brzo, iz memorije
const fresh = await listProviders(); // Sporo, pristupa bazi podataka
```

| Predmemorirani entitet | Ključ predmemorije | TTL            |
| ---------------------- | ------------------ | -------------- |
| `models`               | `models:v1`        | Do zapisivanja |
| `provider_connections` | `providers:v1`     | Do zapisivanja |
| `settings`             | `settings:v1`      | Do zapisivanja |
| `combos`               | `combos:v1`        | Do zapisivanja |

Predmemorija se poništava pri svakom zapisivanju u odgovarajuću tablicu.

---

## Sigurnosno kopiranje i oporavak

### Ručno sigurnosno kopiranje

```bash
# Upotrijebite CLI za izradu lokalne sigurnosne kopije
omniroute backup create --name pre-migration

# Ili putem API-ja
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Datoteka sigurnosne kopije uključuje:

- Sve tablice baze podataka (serijalizirane u JSON)
- Artefakte zapisnika poziva (kodirane u base64, neobavezno)
- Postavke i tajne (šifrirane)
- Konfiguraciju dodataka

### Vraćanje

```bash
# Putem CLI-ja
omniroute restore pre-migration

# Putem API-ja
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Upozorenje**: Vraćanje prepisuje cijelu bazu podataka. Najprije zaustavite sve klijente.

### Automatizirane sigurnosne kopije

```bash
# Omogućite automatizirane dnevne sigurnosne kopije putem CLI-ja
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Raspored se izvršava na strani poslužitelja putem pozadinskog zadatka koji se aktivira svakih 30 sekundi
(zadano) i provjerava cron izraz u odnosu na lokalno vrijeme poslužitelja.

| Varijabla                                   | Zadano  | Opis                                                                                                                  |
| ------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Interval aktiviranja u ms (min. `5000`). Mora biti kraći od 60 s kako bi pouzdano obuhvatio odgovarajuću cron minutu. |

### SQLite sigurnosno kopiranje bez prekida rada

Za sigurnosno kopiranje aktivne baze podataka bez prekida rada:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Ovo koristi SQLiteov API za mrežno sigurnosno kopiranje — može se sigurno pokrenuti dok je OmniRoute aktivan.

---

## Podešavanje performansi

### WAL način rada

WAL je omogućen prema zadanim postavkama. Za radna opterećenja s velikim brojem zapisivanja razmotrite:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Kontrolna točka svakih 1000 stranica
PRAGMA journal_size_limit = 67108864;  -- Ograničenje WAL-a na 64MB
```

### Indeksi

Ključni indeksi za performanse (automatski ih stvaraju migracije):

- `idx_models_provider` — dohvaćanje modela prema pružatelju usluge
- `idx_combo_targets_combo_id` — proširivanje odredišta kombinacije
- `idx_usage_history_api_key_timestamp` — analitika upotrebe
- `idx_quota_snapshots_api_key_window` — praćenje kvota
- `idx_call_logs_timestamp` — upiti nad zapisnicima poziva

Za dodavanje novog indeksa izradite migraciju:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memorijski mapirani U/I

Za vrlo velike baze podataka (>10GB), memorijsko mapiranje može se prilagoditi putem SQLite pragme:

```sql
-- Postavite putem SQLite pragme (prilagodite u core.ts ili tijekom izvođenja)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Sažimanje

Dugotrajno pokrenute instance OmniRoutea imaju koristi od povremenog izvršavanja naredbe `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Pokrećite je mjesečno tijekom razdoblja slabog prometa. (WAL način rada smanjuje potrebu, ali je ne uklanja.)

---

## Provjera stanja

`src/lib/db/healthCheck.ts` pruža **dijagnostiku stanja na razini baze podataka**:

Obje HTTP metode zahtijevaju autentifikaciju (u suprotnom se vraća `401`). `GET` samo dijagnosticira; `POST` pokreće
istu provjeru s omogućenim `autoRepair`.

```bash
GET  /api/db/health   # dijagnosticiraj
POST /api/db/health   # dijagnosticiraj + popravi
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
      "description": "Proračuni domene upućivali su na API ključeve koji više ne postoje.",
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

| Polje             | Značenje                                                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` kada je `issues` prazan. `driver` nikada ne utječe na ovu vrijednost.                                                                                   |
| `issues[].type`   | Jedna od vrijednosti `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                          |
| `repairedCount`   | Broj redaka popravljenih tijekom ovog pokretanja; uvijek je `0` kada je `autoRepair` postavljen na false.                                                      |
| `backupCreated`   | Označava je li sigurnosna kopija izrađena prije popravka.                                                                                                      |
| `checkedAt`       | ISO vremenska oznaka koja je zajednička pokretanju i svim zapisanim bilješkama o popravku.                                                                     |
| `driver.name`     | SQLite upravljački program koji poslužuje provjerenu bazu podataka.                                                                                            |
| `driver.degraded` | `true` kada zapisi nisu trajno pohranjeni u datoteci baze podataka — rezervni `sql.js` WASM način rada (pohrana cijele datoteke) ili baza podataka u memoriji. |

Isti korisni sadržaj vraća MCP alat `omniroute_db_health_check`.

Pokrenite `PRAGMA integrity_check` kako biste otkrili oštećenja:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Trebalo bi ispisati: ok
```

Ako vrati bilo što osim `ok`, **odmah prestanite upotrebljavati bazu podataka** i vratite je iz sigurnosne kopije.

---

## Oporavak od katastrofe

### Scenarij 1: Izgubljena WAL datoteka

Datoteka `-wal` nedostaje, ali `-shm` i glavna baza podataka nisu oštećene:

```bash
# Automatski se oporavlja pri sljedećem otvaranju
omniroute
```

Ako SQLite ne može izvršiti automatski oporavak:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenarij 2: Oštećena datoteka glavne baze podataka

Vratite je iz sigurnosne kopije:

```bash
omniroute sync pull --merge   # ili: omniroute backup restore <backup-id>
```

### Scenarij 3: Izgubljen ključ za šifriranje

**Oporavak nije moguć** bez ključa. Šifrirana polja nije moguće pročitati. Ručno ponovno dodajte sve pružatelje usluga s novim vjerodajnicama.

> **Ublažavanje rizika**: Ključ za šifriranje uvijek zasebno sigurnosno kopirajte, po mogućnosti u upravitelju lozinki ili KMS-u.

### Scenarij 4: Disk je pun

SQLite će vraćati pogreške `SQLITE_FULL`. Oslobodite prostor na disku, a zatim:

```bash
# Izvršite kontrolnu točku WAL-a kako biste oslobodili prostor
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Uobičajene operacije

### Pregled tablice

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Brojanje redaka u svim tablicama

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Ponovno postavljanje (brisanje) svih podataka

```bash
# Najprije zaustavite OmniRoute
omniroute stop

# Izbrišite datoteku baze podataka
rm ~/.omniroute/storage.sqlite*

# Ponovno pokrenite (ponovno će se stvoriti prazna baza podataka)
omniroute
```

Za **selektivno** ponovno postavljanje (zadržavanje pružatelja usluga, brisanje podataka o upotrebi):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Izvoz pojedinačne tablice

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Rješavanje problema

### "Baza podataka je zaključana"

Drugi proces drži zaključavanje za pisanje. Možete:

- Pričekati da drugi proces završi (provjerite pomoću `lsof | grep storage.sqlite`)
- Prekinuti drugi proces
- Ako problem potraje, ponovno pokrenuti OmniRoute

### "Ograničenje stranog ključa nije zadovoljeno"

Modul domene narušava referencijalni integritet. Provjerite:

- Retke bez povezanog nadređenog retka u ovisnim tablicama
- Kaskadna brisanja koja se nisu propagirala
- Nedavnu migraciju kojom je promijenjen strani ključ

Pokrenite `PRAGMA foreign_key_check;` kako biste pronašli nepravilnosti.

### "Nema dovoljno memorije"

SQLiteov memorijski mapirani U/I premašuje ograničenje operacijskog sustava. Smanjite ga pomoću SQLiteove pragme:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB umjesto 256MB
```

Ili ga onemogućite:

```sql
PRAGMA mmap_size = 0;
```

### "Migracija nije uspjela tijekom izvođenja"

Migracija se izvodila unutar transakcije, pa su promjene trebale biti poništene. Ako nisu:

1. **Zaustavite OmniRoute** (spriječite daljnje pokušaje)
2. **Provjerite stanje baze podataka** pomoću alata `sqlite3`
3. **Ručno ispravite** djelomičnu migraciju
4. **Ponovno pokrenite** OmniRoute (migracija će se ponovno pokušati izvršiti)

Kako biste to spriječili, migracije uvijek najprije testirajte na kopiji.

---

## Pogledajte također

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tablice upotrebe
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — praćenje stanja sustava
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — tijek izdavanja
- Izvor: `src/lib/db/` (više od 80 datoteka, ~25 tisuća redaka koda)
