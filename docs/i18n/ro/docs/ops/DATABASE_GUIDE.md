# Database Schema & Operations Guide (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Pe scurt**: OmniRoute utilizează **SQLite cu jurnalizare WAL** ca stocare principală, cu criptare **AES-256-GCM** pentru datele sensibile stocate. Acest ghid prezintă schema, migrările, copierea de siguranță/recuperarea și procedurile operaționale.

**Surse:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 tabele de bază)
- `src/lib/db/migrationRunner.ts` — migrări cu versiuni
- `src/lib/db/migrations/` — 167 de fișiere SQL cu versiuni
- `src/lib/db/encryption.ts` — funcții auxiliare pentru criptare
- `src/lib/db/backup.ts` — exportul/importul copiilor de siguranță
- `src/lib/db/healthCheck.ts` — diagnosticarea stării de funcționare

---

## De ce SQLite?

OmniRoute a ales SQLite în locul PostgreSQL/MySQL din mai multe motive:

| Factor                 | SQLite                                | PostgreSQL                                         |
| ---------------------- | ------------------------------------- | -------------------------------------------------- |
| **Implementare**       | Încorporat — fără server separat      | Necesită configurarea unui server                  |
| **Criptare**           | La nivelul aplicației (AES-256-GCM)   | TDE încorporat                                     |
| **Performanță**        | Mai rapid pentru sarcini mici/medii   | Mai bun pentru un volum mare de scrieri simultane  |
| **Concurență**         | Modul WAL permite citiri simultane    | MVCC complet                                       |
| **Copie de siguranță** | Copierea unui singur fișier           | `pg_dump` sau instantaneu al sistemului de fișiere |
| **Caz de utilizare**   | Instalare per utilizator, încorporată | SaaS multi-chiriaș                                 |

Pentru implementările cu **un singur utilizator și o singură instanță** (principalul caz de utilizare OmniRoute), SQLite este mai simplu și mai rapid.

### Jurnalizare WAL

`core.ts` deschide baza de date în **modul WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL permite **citiri simultane** în timpul scrierilor — un aspect important pentru panoul de control, care execută interogări în timp ce solicitările sunt înregistrate.

Dimensiunea implicită a memoriei cache este de **65.536 KiB (64 MiB)**. SQLite interpretează o valoare negativă pentru
`cache_size` drept o limită superioară aproximativă în KiB și alocă pagini la cerere.
**Setări > Sistem și stocare > Dimensiunea memoriei cache** acceptă valori întregi de la **1 la
1.000.000 KiB**; salvarea setării o aplică conexiunii active la baza de date,
iar OmniRoute restabilește valoarea persistentă la pornire.

---

## Locația bazei de date

Fișierul SQLite este stocat la:

| Sistem de operare | Cale                                                       |
| ----------------- | ---------------------------------------------------------- |
| Linux             | `~/.omniroute/storage.sqlite`                              |
| macOS             | `~/.omniroute/storage.sqlite`                              |
| Windows           | `%USERPROFILE%\.omniroute\storage.sqlite`                  |
| Docker            | `/app/data/storage.sqlite` (configurabilă prin `DATA_DIR`) |

Fișiere și directoare asociate:

- `storage.sqlite-wal` — jurnal de scriere anticipată
- `storage.sqlite-shm` — fișier de memorie partajată
- `call_logs/` — artefacte ale sarcinilor utile ale solicitărilor (dacă opțiunea este activată)

**Suprascrieți locația:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arhitectura modulelor de domeniu

Baza de date OmniRoute are **110 module TypeScript de nivel superior** în `src/lib/db/`. Fiecare modul de domeniu:

- Deține unul sau mai multe tabele specifice
- Exportă funcții CRUD tipizate
- Nu accesează niciodată tabelele altui modul
- Utilizează `getDbInstance()` din `core.ts` pentru a accesa baza de date

### Cele 110 module DB de nivel superior

OmniRoute are **110 fișiere TypeScript de nivel superior** în `src/lib/db/`. Mai jos este o selecție de module de bază; consultați listarea directorului pentru lista completă:

| Modul                   | Tabele                                                         | Responsabilitate                                                                                  |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Înregistrarea furnizorilor prin OAuth/chei API și gestionarea acreditărilor                       |
| `models.ts`             | `key_value` (date despre modele)                               | Definiții, capabilități și prețuri ale modelelor                                                  |
| `combos.ts`             | `combos`                                                       | Configurații de rutare pentru combinații și ordonarea acestora                                    |
| `apiKeys.ts`            | `api_keys`                                                     | Ciclul de viață al cheilor API, domenii de acces și urmărirea cotelor                             |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Configurarea sistemului și stocarea KV partajată                                                  |
| `backup.ts`             | —                                                              | Operațiuni de export/import al copiilor de siguranță                                              |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Configurații proxy și reguli de rutare                                                            |
| `prompts.ts`            | `prompt_templates`                                             | Șabloane reutilizabile de prompturi și gestionarea versiunilor                                    |
| `webhooks.ts`           | `webhooks`                                                     | Abonamente webhook bazate pe evenimente și jurnale                                                |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Jurnalizare de audit pentru fiecare solicitare (opțională, volum ridicat)                         |
| `domainState.ts`        | `domain_*` (5 tabele)                                          | Bugete de domeniu, întrerupătoare de circuit, blocări, lanțuri de rezervă și istoricul costurilor |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Chei API din lista permisă pentru MCP/A2A                                                         |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Istoricul utilizării cotelor                                                                      |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Asocierea modelelor cu combinațiile implicite                                                     |
| `cliToolState.ts`       | `cli_tool_state`                                               | Stare persistentă specifică CLI                                                                   |
| `encryption.ts`         | —                                                              | Funcții auxiliare pentru criptarea/decriptarea câmpurilor                                         |
| `readCache.ts`          | —                                                              | Cache în memorie pentru operațiunile cu citire intensivă                                          |
| `secrets.ts`            | `key_value` (intrări criptate)                                 | Stocarea criptată a secretelor                                                                    |
| `stateReset.ts`         | —                                                              | Ștergerea/resetarea stării bazei de date pentru testare                                           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Contextul sesiunii pentru transferul între agenți                                                 |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Urmărirea utilizării                                                                              |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Configurarea compresiei                                                                           |

### Limitele modulelor

O regulă arhitecturală esențială: **modulele nu accesează direct tabelele altor module**. Pentru a lucra cu datele altui modul, importați funcția din modulul respectiv.

```ts
// ❌ GREȘIT: SQL direct dintr-un alt modul
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CORECT: utilizați funcția modulului providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Această regulă este aplicată prin revizuirea codului — nu există nicio verificare statică, dar încălcările sunt semnalate.

---

## Schema de bază (17 tabele)

`core.ts` definește cele 17 tabele de bază în `SCHEMA_SQL`. Acestea sunt create de migrarea `001_initial_schema.sql` și formează schema principală.

### Tabele principale (create în migrarea inițială)

| Tabel                      | Scop                                          | Coloane-cheie                                                           |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Credențiale ale furnizorilor (criptate)       | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informații de rutare pentru nodul furnizor    | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Depozit KV general                            | `namespace`, `key`, `value`                                             |
| `combos`                   | Definiții ale combinațiilor de rutare         | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Chei API pentru gateway                       | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadatele bazei de date                      | `key`, `value`                                                          |
| `usage_history`            | Înregistrări privind utilizarea solicitărilor | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Sarcinile utile și răspunsurile solicitărilor | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Jurnalele solicitărilor proxy                 | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Lanțuri model-furnizor                        | `model`, `chain`                                                        |
| `domain_budgets`           | Bugete de cheltuieli per domeniu              | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Istoricul resetărilor de buget                | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Urmărirea costurilor per domeniu              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Starea limitării ratei per domeniu            | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Starea disjunctorului per domeniu             | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache pentru răspunsurile LLM                 | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Instantanee istorice ale cotelor              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tabele suplimentare (adăugate prin migrări ulterioare)

Migrările ulterioare adaugă tabele precum:

- `cli_tool_state` (migrarea 011) — starea instrumentului CLI
- Tabele `mcp_*` — auditul serverului MCP
- Tabele `a2a_*` — starea sarcinilor A2A
- Tabele `usage_*` — urmărirea utilizării
- Tabele `plugin_*` — sistemul de pluginuri
- `skill_executions` — istoricul execuțiilor abilităților
- Tabele `memory_*` — sistemul de memorie
- Tabele `compression_*` — sistemul de compresie
- Tabele `webhook_*` — jurnalul livrărilor webhook
- Tabele `acp_*` — Agent Client Protocol
- Tabele `oneproxy_*` — marketplace-ul 1proxy
- `proxy_assignments` — asocieri ale domeniului de aplicare pentru proxy
- `detailed_call_artifacts` — metadatele artefactelor din jurnalele apelurilor
- `quota_alert_history` — auditul alertelor privind cotele
- `command_code_auth_sessions` — sesiuni OAuth Command Code

Lista completă de peste 30 de tabele se află în `src/lib/db/migrations/`.

---

## Migrări

OmniRoute utilizează **migrări versionate și idempotente** în `src/lib/db/migrations/`. Fiecare migrare este un singur fișier SQL denumit `NNN_description.sql`.

### Denumirea migrărilor

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Cum rulează migrările

La pornire, `migrationRunner.ts`:

1. Creează tabelul `_omniroute_migrations` dacă nu există
2. Interoghează migrările deja aplicate
3. Aplică în ordine orice migrări noi, fiecare într-o tranzacție
4. Înregistrează fiecare migrare aplicată împreună cu marcajul temporal

```ts
// src/lib/db/migrationRunner.ts (simplificat)
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

### Idempotență

Migrările trebuie să fie **idempotente** — rularea lor de două ori nu ar trebui să producă nicio modificare:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Utilizați din abundență clauzele `IF NOT EXISTS`, `IF EXISTS` și `OR IGNORE` / `OR REPLACE`.

### Adăugarea unei migrări noi

1. **Identificați următorul număr**: `ls src/lib/db/migrations/ | tail -1`
2. **Creați fișierul**: `NNN_my_change.sql`
3. **Utilizați DDL sigur**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Completați cu atenție datele existente**: utilizați `UPDATE ... WHERE ...` pentru a gestiona rândurile existente
5. **Testați pe o copie**: nu rulați niciodată migrări netestate în producție

Exemplu:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Modificările incompatibile cu versiunile anterioare** (de exemplu, eliminarea coloanelor) sunt dificil de gestionat. OmniRoute NU acceptă revenirea la o versiune anterioară — odată ce o migrare este aplicată, modificarea schemei este permanentă. Planificați în consecință.

---

## Criptarea datelor stocate

Câmpurile sensibile (chei API, tokenuri OAuth, șiruri de conexiune) sunt criptate atunci când sunt stocate, utilizând **AES-256-GCM**.

### Cum funcționează

```ts
// src/lib/db/encryption.ts (simplificat)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Unde este utilizată

- `provider_connections.api_key` — criptat la nivelul aplicației
- `provider_connections.access_token`, `refresh_token`, `id_token` — criptate la nivelul aplicației
- Intrările `key_value` cu `namespace = "secrets"` — criptate la nivelul aplicației
- `proxy_registry.auth` — criptat la nivelul aplicației (dacă este prezent)

### Cheia de criptare

Cheia de criptare este derivată dintr-o **frază de acces** (setată prin variabila de mediu `STORAGE_ENCRYPTION_KEY`) și un **salt** (stocat în baza de date). Ambele sunt necesare pentru decriptarea datelor.

```bash
# Generați o frază de acces securizată
openssl rand -hex 32

# Setați în .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Important**: Pierderea cheii de criptare înseamnă pierderea accesului la toate datele criptate. **Faceți o copie de siguranță a cheii separat de baza de date**.

### Ce NU este criptat

Din motive de performanță, următoarele sunt stocate în text clar:

- Numele afișate ale furnizorilor
- Definițiile modelelor (deja publice)
- Regulile de rutare
- Înregistrările de utilizare (fără PII)

---

## Aspecte importante privind criptarea (v3.8.16+)

OmniRoute utilizează **`migrateLegacyEncryptedString()`** pentru a gestiona în mod transparent două scheme de criptare:

- **Moștenită** (anterioară versiunii v3.5.0): „criptare” bazată pe XOR (nu este criptografie reală)
- **Actuală**: AES-256-GCM cu IV și etichetă de autentificare corespunzătoare

Funcția auxiliară de migrare detectează formatul moștenit și îl recriptează folosind noua schemă la prima citire. Aceasta înseamnă că puteți actualiza o bază de date veche fără a pierde acreditările.

---

## Cache de citire

Pentru datele citite frecvent (modele, furnizori, setări), `readCache.ts` oferă un **cache în memorie**:

```ts
// Stocat în cache la pornire, invalidat la scriere
const providers = await getCachedProviders(); // Rapid, în memorie
const fresh = await listProviders(); // Lent, accesează baza de date
```

| Entitate stocată în cache | Cheie cache    | TTL             |
| ------------------------- | -------------- | --------------- |
| `models`                  | `models:v1`    | Până la scriere |
| `provider_connections`    | `providers:v1` | Până la scriere |
| `settings`                | `settings:v1`  | Până la scriere |
| `combos`                  | `combos:v1`    | Până la scriere |

Cache-ul este invalidat la fiecare scriere în tabelul corespunzător.

---

## Copiere de siguranță și recuperare

### Copiere de siguranță manuală

```bash
# Utilizați CLI-ul pentru a crea o copie de siguranță locală
omniroute backup create --name pre-migration

# Sau prin API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Fișierul copiei de siguranță include:

- Toate tabelele bazei de date (serializate în JSON)
- Artefactele jurnalului de apeluri (codificate în base64, opțional)
- Setările + secretele (criptate)
- Configurația pluginurilor

### Restaurare

```bash
# Prin CLI
omniroute restore pre-migration

# Prin API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Avertisment**: Restaurarea suprascrie întreaga bază de date. Opriți mai întâi toți clienții.

### Copii de siguranță automatizate

```bash
# Activați copiile de siguranță zilnice automatizate prin CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Programarea este executată pe server de o sarcină de fundal care rulează la fiecare 30 de secunde
(implicit) și evaluează expresia cron în raport cu ora locală a serverului.

| Variabilă                                   | Valoare implicită | Descriere                                                                                                                                      |
| ------------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`           | Intervalul de rulare în ms (minimum `5000`). Trebuie să fie mai scurt de 60 s pentru a se încadra în mod fiabil în minutul cron corespunzător. |

### Copie de siguranță SQLite la cald

Pentru copierea de siguranță fără întreruperi a unei baze de date active:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Aceasta utilizează API-ul SQLite pentru copii de siguranță online — poate fi executată în siguranță în timp ce OmniRoute rulează.

---

## Optimizarea performanței

### Modul WAL

WAL este activat implicit. Pentru sarcini cu multe operațiuni de scriere, luați în considerare:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Punct de control la fiecare 1000 de pagini
PRAGMA journal_size_limit = 67108864;  -- Limită WAL de 64MB
```

### Indecși

Indecși importanți pentru performanță (creați automat prin migrări):

- `idx_models_provider` — căutarea modelelor după furnizor
- `idx_combo_targets_combo_id` — extinderea țintelor combinației
- `idx_usage_history_api_key_timestamp` — analiza utilizării
- `idx_quota_snapshots_api_key_window` — monitorizarea cotelor
- `idx_call_logs_timestamp` — interogarea jurnalelor de apeluri

Pentru a adăuga un index nou, creați o migrare:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O cu mapare în memorie

Pentru baze de date foarte mari (>10GB), maparea în memorie poate fi ajustată printr-o pragma SQLite:

```sql
-- Setați prin pragma SQLite (ajustați în core.ts sau la execuție)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Compactare

Instanțele OmniRoute care rulează perioade îndelungate beneficiază de executarea ocazională a comenzii `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Rulați-o lunar, în intervalele cu trafic redus. (Modul WAL reduce necesitatea, dar nu o elimină.)

---

## Verificarea stării

`src/lib/db/healthCheck.ts` oferă **diagnosticare la nivelul bazei de date**:

Ambele verbe necesită autentificare (`401` în caz contrar). `GET` doar diagnostichează; `POST` execută aceeași verificare cu `autoRepair` activat.

```bash
GET  /api/db/health   # diagnostichează
POST /api/db/health   # diagnostichează + repară
```

Răspunsul este obiectul `DbHealthCheckResult` produs de `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Bugetele domeniilor făceau referire la chei API care nu mai există.",
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

| Câmp              | Semnificație                                                                                                                                                                            |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` când `issues` este gol. `driver` nu îl influențează niciodată.                                                                                                                   |
| `issues[].type`   | Una dintre valorile `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                                    |
| `repairedCount`   | Rândurile reparate în timpul acestei execuții; întotdeauna `0` când `autoRepair` este false.                                                                                            |
| `backupCreated`   | Indică dacă a fost creată o copie de rezervă înainte de reparare.                                                                                                                       |
| `checkedAt`       | Marcaj temporal ISO utilizat atât pentru execuție, cât și pentru orice notă de reparare pe care aceasta o scrie.                                                                        |
| `driver.name`     | Driverul SQLite care deservește baza de date verificată.                                                                                                                                |
| `driver.degraded` | `true` când scrierile nu sunt stocate în mod durabil în fișierul bazei de date — soluția de rezervă WASM `sql.js` (persistența întregului fișier) sau o bază de date aflată în memorie. |

Același conținut este returnat de instrumentul MCP `omniroute_db_health_check`.

Rulați `PRAGMA integrity_check` pentru a detecta coruperea datelor:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Ar trebui să afișeze: ok
```

Dacă returnează orice altceva decât `ok`, **opriți imediat utilizarea bazei de date** și restaurați-o din copia de rezervă.

---

## Recuperare în caz de dezastru

### Scenariul 1: Fișierul WAL a fost pierdut

Fișierul `-wal` lipsește, dar `-shm` și baza de date principală sunt intacte:

```bash
# Se recuperează automat la următoarea deschidere
omniroute
```

Dacă SQLite nu poate efectua recuperarea automată:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenariul 2: Fișierul bazei de date principale este corupt

Restaurați din copia de rezervă:

```bash
omniroute sync pull --merge   # sau: omniroute backup restore <backup-id>
```

### Scenariul 3: Cheia de criptare a fost pierdută

**Recuperarea nu este posibilă** fără cheie. Câmpurile criptate nu pot fi citite. Adăugați din nou manual toți furnizorii, folosind credențiale noi.

> **Măsură de protecție**: Faceți întotdeauna separat o copie de rezervă a cheii de criptare, de preferat într-un manager de parole sau într-un KMS.

### Scenariul 4: Discul este plin

SQLite va returna erori `SQLITE_FULL`. Eliberați spațiu pe disc, apoi:

```bash
# Creați un punct de control WAL pentru a elibera spațiu
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operațiuni uzuale

### Inspectarea unui tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Numărarea rândurilor din toate tabelele

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Resetarea (ștergerea) tuturor datelor

```bash
# Opriți mai întâi OmniRoute
omniroute stop

# Ștergeți fișierul bazei de date
rm ~/.omniroute/storage.sqlite*

# Reporniți (baza de date goală va fi recreată)
omniroute
```

Pentru o resetare **selectivă** (păstrați furnizorii, ștergeți datele de utilizare):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Exportarea unui singur tabel

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Depanare

### „Baza de date este blocată”

Un alt proces deține un blocaj de scriere. Puteți:

- Aștepta finalizarea celuilalt proces (verificați cu `lsof | grep storage.sqlite`)
- Opri forțat celălalt proces
- Dacă problema persistă, reporniți OmniRoute

### „Constrângerea de cheie externă a eșuat”

Un modul de domeniu încalcă integritatea referențială. Verificați:

- Rândurile orfane din tabelele dependente
- Ștergerile în cascadă care nu s-au propagat
- O migrare recentă care a modificat o cheie externă

Rulați `PRAGMA foreign_key_check;` pentru a găsi încălcările.

### „Memorie insuficientă”

Operațiile I/O ale SQLite mapate în memorie depășesc limita sistemului de operare. Reduceți valoarea printr-o pragmă SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB în loc de 256MB
```

Sau dezactivați maparea:

```sql
PRAGMA mmap_size = 0;
```

### „Migrarea a eșuat în timpul execuției”

Migrarea a fost executată într-o tranzacție, deci modificările ar fi trebuit anulate. Dacă nu au fost:

1. **Opriți OmniRoute** (pentru a preveni alte încercări)
2. **Verificați starea bazei de date** cu `sqlite3`
3. **Remediați manual** migrarea parțială
4. **Rulați din nou** OmniRoute (migrarea va fi reîncercată)

Pentru a preveni această situație, testați întotdeauna mai întâi migrările pe o copie.

---

## Consultați și

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabele de utilizare
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitorizarea stării
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — fluxul de lansare
- Sursă: `src/lib/db/` (peste 80 de fișiere, ~25K linii de cod)
