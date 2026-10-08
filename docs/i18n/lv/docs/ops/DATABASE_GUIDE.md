# Database Schema & Operations Guide (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Īsumā**: OmniRoute kā primāro datu glabātuvi izmanto **SQLite ar WAL žurnalēšanu**, un sensitīvie lauki glabāšanas laikā tiek šifrēti ar **AES-256-GCM**. Šajā rokasgrāmatā ir aplūkota shēma, migrācijas, dublēšana/atkopšana un ekspluatācijas instrukcijas.

**Avoti:**

- `src/lib/db/core.ts` — vieninstance + SCHEMA_SQL (17 pamata tabulas)
- `src/lib/db/migrationRunner.ts` — versiju migrācijas
- `src/lib/db/migrations/` — 167 versiju SQL faili
- `src/lib/db/encryption.ts` — šifrēšanas palīgfunkcijas
- `src/lib/db/backup.ts` — dublējumu eksportēšana/importēšana
- `src/lib/db/healthCheck.ts` — darbspējas diagnostika

---

## Kāpēc SQLite?

OmniRoute izvēlējās SQLite, nevis PostgreSQL/MySQL, vairāku iemeslu dēļ:

| Faktors         | SQLite                                        | PostgreSQL                                      |
| --------------- | --------------------------------------------- | ----------------------------------------------- |
| **Izvietošana** | Iegulta — nav nepieciešams atsevišķs serveris | Nepieciešama servera iestatīšana                |
| **Šifrēšana**   | Lietojumprogrammas līmenī (AES-256-GCM)       | Iebūvēta TDE                                    |
| **Veiktspēja**  | Ātrāka mazām/vidējām darba slodzēm            | Labāka ļoti lielam vienlaicīgu ierakstu skaitam |
| **Vienlaicība** | WAL režīms ļauj veikt vienlaicīgu lasīšanu    | Pilnvērtīga MVCC                                |
| **Dublēšana**   | Viena faila kopēšana                          | `pg_dump` vai failu sistēmas momentuzņēmums     |
| **Lietojums**   | Instalācija katram lietotājam, iegulta        | Vairāku nomnieku SaaS                           |

**Viena lietotāja un vienas instances** izvietojumiem (OmniRoute primārajam lietojuma scenārijam) SQLite ir vienkāršāka un ātrāka.

### WAL žurnalēšana

`core.ts` atver datubāzi **WAL (priekšrakstīšanas žurnāla) režīmā**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL ļauj veikt **vienlaicīgu lasīšanu** rakstīšanas laikā — tas ir svarīgi informācijas panelim, kas izpilda vaicājumus, kamēr tiek reģistrēti pieprasījumi.

Noklusējuma kešatmiņas lielums ir **65,536 KiB (64 MiB)**. SQLite negatīvu
`cache_size` vērtību interpretē kā aptuvenu augšējo robežu KiB vienībās un piešķir lapas pēc nepieciešamības.
Iestatījumā **Iestatījumi > Sistēma un krātuve > Kešatmiņas lielums** var ievadīt veselus skaitļus no **1 līdz
1,000,000 KiB**; iestatījuma saglabāšana to piemēro aktīvajam datubāzes savienojumam,
un OmniRoute startēšanas laikā atjauno saglabāto vērtību.

---

## Datubāzes atrašanās vieta

SQLite fails tiek glabāts šeit:

| OS      | Ceļš                                                              |
| ------- | ----------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                     |
| macOS   | `~/.omniroute/storage.sqlite`                                     |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                         |
| Docker  | `/app/data/storage.sqlite` (konfigurējams, izmantojot `DATA_DIR`) |

Saistītie faili:

- `storage.sqlite-wal` — priekšrakstīšanas žurnāls
- `storage.sqlite-shm` — koplietojamās atmiņas fails
- `call_logs/` — pieprasījumu lietderīgās slodzes artefakti (ja iespējots)

**Atrašanās vietas pārrakstīšana:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domēna moduļu arhitektūra

OmniRoute datubāzē ir **110 augstākā līmeņa TypeScript moduļi** direktorijā `src/lib/db/`. Katrs domēna modulis:

- Pārvalda vienu vai vairākas konkrētas tabulas
- Eksportē tipizētas CRUD funkcijas
- Nekad nepiekļūst cita moduļa tabulām
- Izmanto `getDbInstance()` no `core.ts`, lai piekļūtu datubāzei

### 110 augstākā līmeņa datubāzes moduļi

OmniRoute ir **110 augstākā līmeņa TypeScript faili** direktorijā `src/lib/db/`. Tālāk ir sniegts galveno moduļu piemēru saraksts; pilnu sarakstu skatiet direktorija saturā:

| Modulis                 | Tabulas                                                        | Atbildība                                                                         |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API atslēgu nodrošinātāju reģistrācija un akreditācijas dati                |
| `models.ts`             | `key_value` (modeļu dati)                                      | Modeļu definīcijas, iespējas un cenas                                             |
| `combos.ts`             | `combos`                                                       | Kombināciju maršrutēšanas konfigurācijas un secība                                |
| `apiKeys.ts`            | `api_keys`                                                     | API atslēgu dzīves cikls, tvērumi un kvotu uzskaite                               |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Sistēmas konfigurācija un koplietojama atslēgu–vērtību krātuve                    |
| `backup.ts`             | —                                                              | Dublējumkopiju eksportēšanas/importēšanas darbības                                |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Starpniekserveru konfigurācijas un maršrutēšanas kārtulas                         |
| `prompts.ts`            | `prompt_templates`                                             | Atkārtoti izmantojamas uzvedņu veidnes un versiju pārvaldība                      |
| `webhooks.ts`           | `webhooks`                                                     | Notikumu vadīti tīmekļa aizķeru abonementi un žurnāli                             |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Katra pieprasījuma audita reģistrēšana (neobligāta, liels datu apjoms)            |
| `domainState.ts`        | `domain_*` (5 tabulas)                                         | Domēnu budžeti, ķēdes pārtraucēji, bloķēšana, atkāpšanās ķēdes un izmaksu vēsture |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A atļauto API atslēgu saraksts                                              |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Vēsturiskais kvotu lietojums                                                      |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modeļu kartēšana uz noklusējuma kombinācijām                                      |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI specifisks pastāvīgais stāvoklis                                              |
| `encryption.ts`         | —                                                              | Palīgfunkcijas lauku šifrēšanai/atšifrēšanai                                      |
| `readCache.ts`          | —                                                              | Atmiņas kešatmiņa intensīvām lasīšanas darbībām                                   |
| `secrets.ts`            | `key_value` (šifrēti ieraksti)                                 | Šifrēta noslēpumu glabāšana                                                       |
| `stateReset.ts`         | —                                                              | Datubāzes stāvokļa notīrīšana/atiestatīšana testēšanai                            |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Sesijas konteksts aģenta nodošanai                                                |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Lietojuma uzskaite                                                                |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Saspiešanas konfigurācija                                                         |

### Moduļu robežas

Galvenais arhitektūras noteikums: **moduļi tieši nepiekļūst citu moduļu tabulām**. Lai strādātu ar cita moduļa datiem, importējiet funkciju no attiecīgā moduļa.

```ts
// ❌ NEPAREIZI: tiešs SQL vaicājums cita moduļa tabulai
db.prepare("SELECT * FROM provider_connections").all();

// ✅ PAREIZI: izmantojiet providers moduļa funkciju
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Šī noteikuma ievērošana tiek pārbaudīta koda pārskatīšanas laikā — statiskas pārbaudes nav, taču pārkāpumi tiek atzīmēti.

---

## Pamata shēma (17 tabulas)

`core.ts` definē 17 pamata tabulas konstantē `SCHEMA_SQL`. Tās izveido migrācija `001_initial_schema.sql`, un tās veido shēmas kodolu.

### Pamata tabulas (izveidotas sākotnējā migrācijā)

| Tabula                     | Mērķis                                                 | Galvenās kolonnas                                                       |
| -------------------------- | ------------------------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Pakalpojumu sniedzēju akreditācijas dati (šifrēti)     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Pakalpojumu sniedzēju mezglu maršrutēšanas informācija | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Vispārīga KV krātuve                                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Maršrutēšanas kombināciju definīcijas                  | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Vārtejas API atslēgas                                  | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Datubāzes metadati                                     | `key`, `value`                                                          |
| `usage_history`            | Pieprasījumu lietojuma ieraksti                        | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Pieprasījumu dati un atbildes                          | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Starpniekservera pieprasījumu žurnāli                  | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modeļu un pakalpojumu sniedzēju ķēdes                  | `model`, `chain`                                                        |
| `domain_budgets`           | Katra domēna izdevumu budžeti                          | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Budžeta atiestatīšanas vēsture                         | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Katra domēna izmaksu uzskaite                          | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domēna ātruma ierobežojuma stāvoklis                   | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Katra domēna ķēdes pārtraucēja stāvoklis               | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM atbilžu kešatmiņa                                  | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Vēsturiskie kvotu momentuzņēmumi                       | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Papildu tabulas (pievienotas vēlākās migrācijās)

Turpmākajās migrācijās tiek pievienotas tādas tabulas kā:

- `cli_tool_state` (migrācija 011) — CLI rīka stāvoklis
- `mcp_*` tabulas — MCP servera audits
- `a2a_*` tabulas — A2A uzdevumu stāvoklis
- `usage_*` tabulas — lietojuma uzskaite
- `plugin_*` tabulas — spraudņu sistēma
- `skill_executions` — prasmju izpildes vēsture
- `memory_*` tabulas — atmiņas sistēma
- `compression_*` tabulas — saspiešanas sistēma
- `webhook_*` tabulas — tīmekļa aizķeru piegādes žurnāls
- `acp_*` tabulas — aģenta klienta protokols
- `oneproxy_*` tabulas — 1proxy tirgus
- `proxy_assignments` — starpniekserveru tvēruma piesaistes
- `detailed_call_artifacts` — izsaukumu žurnāla artefaktu metadati
- `quota_alert_history` — kvotu brīdinājumu audits
- `command_code_auth_sessions` — Command Code OAuth sesijas

Pilns saraksts ar vairāk nekā 30 tabulām atrodas `src/lib/db/migrations/`.

---

## Migrācijas

OmniRoute izmanto **versijotas, idempotentas migrācijas**, kas atrodas `src/lib/db/migrations/`. Katra migrācija ir atsevišķs SQL fails ar nosaukumu `NNN_description.sql`.

### Migrāciju nosaukumi

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Migrāciju izpilde

Palaišanas laikā `migrationRunner.ts`:

1. Izveido tabulu `_omniroute_migrations`, ja tā vēl nepastāv
2. Vaicā jau lietotās migrācijas
3. Secīgi lieto visas jaunās migrācijas, katru atsevišķā transakcijā
4. Reģistrē katru lietoto migrāciju kopā ar laikspiedolu

```ts
// src/lib/db/migrationRunner.ts (vienkāršots)
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

### Idempotence

Migrācijām jābūt **idempotentām** — to atkārtota izpilde nedrīkst veikt nekādas izmaiņas:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Plaši izmantojiet klauzulas `IF NOT EXISTS`, `IF EXISTS` un `OR IGNORE` / `OR REPLACE`.

### Jaunas migrācijas pievienošana

1. **Nosakiet nākamo numuru**: `ls src/lib/db/migrations/ | tail -1`
2. **Izveidojiet failu**: `NNN_my_change.sql`
3. **Izmantojiet drošas DDL komandas**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Uzmanīgi aizpildiet esošos datus**: izmantojiet `UPDATE ... WHERE ...`, lai apstrādātu esošās rindas
5. **Testējiet kopijā**: nekad neizpildiet nepārbaudītas migrācijas produkcijas vidē

Piemērs:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Ar iepriekšējām versijām nesaderīgas izmaiņas** (piemēram, kolonnu dzēšana) ir sarežģītas. OmniRoute NEATBALSTA versijas pazemināšanu — tiklīdz migrācija ir lietota, shēmas izmaiņas ir neatgriezeniskas. Plānojiet atbilstoši.

---

## Glabāto datu šifrēšana

Sensitīvi lauki (API atslēgas, OAuth pilnvaras, savienojumu virknes) glabāšanas laikā tiek šifrēti, izmantojot **AES-256-GCM**.

### Darbības princips

```ts
// src/lib/db/encryption.ts (vienkāršots)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Kur šifrēšana tiek izmantota

- `provider_connections.api_key` — šifrēts lietojumprogrammas līmenī
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifrēti lietojumprogrammas līmenī
- `key_value` ieraksti ar `namespace = "secrets"` — šifrēti lietojumprogrammas līmenī
- `proxy_registry.auth` — šifrēts lietojumprogrammas līmenī (ja norādīts)

### Šifrēšanas atslēga

Šifrēšanas atslēga tiek atvasināta no **paroles frāzes** (iestatīta, izmantojot vides mainīgo `STORAGE_ENCRYPTION_KEY`) un **sāls** (glabāta datubāzē). Datu atšifrēšanai ir nepieciešamas abas vērtības.

```bash
# Ģenerējiet drošu paroles frāzi
openssl rand -hex 32

# Iestatiet failā .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritiski svarīgi**: šifrēšanas atslēgas pazaudēšana nozīmē piekļuves zaudēšanu visiem šifrētajiem datiem. **Glabājiet atslēgas rezerves kopiju atsevišķi no datubāzes**.

### Kas NETIEK šifrēts

Veiktspējas apsvērumu dēļ tālāk norādītā informācija tiek glabāta kā nešifrēts teksts:

- Pakalpojumu sniedzēju attēlojamie nosaukumi
- Modeļu definīcijas (jau ir publiskas)
- Maršrutēšanas kārtulas
- Lietojuma ieraksti (nesatur personu identificējošu informāciju)

---

## Šifrēšanas ierobežojumi (v3.8.16+)

OmniRoute izmanto **`migrateLegacyEncryptedString()`**, lai pārredzami apstrādātu divas šifrēšanas shēmas:

- **Mantotā** (pirms v3.5.0): uz XOR balstīta „šifrēšana” (nav īsta kriptogrāfija)
- **Pašreizējā**: AES-256-GCM ar atbilstošu IV un autentifikācijas tagu

Migrācijas palīgfunkcija nosaka mantoto formātu un pirmajā nolasīšanas reizē atkārtoti šifrē datus, izmantojot jauno shēmu. Tas nozīmē, ka varat jaunināt vecu datubāzi, nezaudējot akreditācijas datus.

---

## Lasīšanas kešatmiņa

Bieži lasītiem datiem (modeļiem, pakalpojumu sniedzējiem, iestatījumiem) `readCache.ts` nodrošina **atmiņā glabātu kešatmiņu**:

```ts
// Kešots palaišanas laikā, invalidēts rakstīšanas laikā
const providers = await getCachedProviders(); // Ātrs, atmiņā
const fresh = await listProviders(); // Lēns, piekļūst DB
```

| Kešotā entītija        | Kešatmiņas atslēga | TTL              |
| ---------------------- | ------------------ | ---------------- |
| `models`               | `models:v1`        | Līdz rakstīšanai |
| `provider_connections` | `providers:v1`     | Līdz rakstīšanai |
| `settings`             | `settings:v1`      | Līdz rakstīšanai |
| `combos`               | `combos:v1`        | Līdz rakstīšanai |

Kešatmiņa tiek invalidēta pēc katras rakstīšanas attiecīgajā tabulā.

---

## Dublēšana un atkopšana

### Manuāla dublēšana

```bash
# Izmantojiet CLI, lai izveidotu lokālu dublējumu
omniroute backup create --name pre-migration

# Vai izmantojot API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Dublējuma failā ir iekļauts:

- Visas DB tabulas (serializētas JSON formātā)
- Izsaukumu žurnāla artefakti (kodēti ar base64, neobligāti)
- Iestatījumi un noslēpumi (šifrēti)
- Spraudņu konfigurācija

### Atjaunošana

```bash
# Izmantojot CLI
omniroute restore pre-migration

# Izmantojot API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Brīdinājums**: Atjaunošana pārraksta visu DB. Vispirms apturiet visus klientus.

### Automatizēta dublēšana

```bash
# Iespējojiet automatizētu ikdienas dublēšanu, izmantojot CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Grafiku servera pusē izpilda fona uzdevums, kas tiek aktivizēts ik pēc 30 sekundēm
(pēc noklusējuma) un izvērtē cron izteiksmi atbilstoši servera vietējam laikam.

| Mainīgais                                   | Noklusējums | Apraksts                                                                                                                      |
| ------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`     | Aktivizēšanas intervāls ms (min. `5000`). Tam jābūt īsākam par 60 s, lai droši iekļautos cron izteiksmei atbilstošajā minūtē. |

### SQLite aktīvās datubāzes dublēšana

Lai bez dīkstāves dublētu aktīvu DB:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Tiek izmantota SQLite tiešsaistes dublēšanas API — to var droši izpildīt, kamēr darbojas OmniRoute.

---

## Veiktspējas regulēšana

### WAL režīms

WAL pēc noklusējuma ir iespējots. Lielas rakstīšanas slodzes gadījumā apsveriet:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Kontrolpunkts ik pēc 1000 lapām
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL ierobežojums
```

### Indeksi

Galvenie veiktspējas indeksi (migrācijas tos izveido automātiski):

- `idx_models_provider` — modeļu meklēšana pēc nodrošinātāja
- `idx_combo_targets_combo_id` — kombināciju mērķu izvēršana
- `idx_usage_history_api_key_timestamp` — lietojuma analītika
- `idx_quota_snapshots_api_key_window` — kvotu uzskaite
- `idx_call_logs_timestamp` — izsaukumu žurnāla vaicājumi

Lai pievienotu jaunu indeksu, izveidojiet migrāciju:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Atmiņā kartēta ievade/izvade

Ļoti lielām datubāzēm (>10GB) atmiņas kartēšanu var pielāgot, izmantojot SQLite pragma:

```sql
-- Iestatiet, izmantojot SQLite pragma (pielāgojiet failā core.ts vai izpildlaikā)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Sablīvēšana

Ilgstoši darbinātām OmniRoute instancēm ir lietderīgi periodiski izpildīt `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Izpildiet reizi mēnesī zemas noslodzes periodos. (WAL režīms samazina nepieciešamību, bet pilnībā to nenovērš.)

---

## Darbspējas pārbaude

`src/lib/db/healthCheck.ts` nodrošina **datubāzes līmeņa darbspējas diagnostiku**:

Abām metodēm ir nepieciešama autentifikācija (pretējā gadījumā `401`). `GET` tikai veic diagnostiku; `POST` izpilda
to pašu pārbaudi ar iespējotu `autoRepair`.

```bash
GET  /api/db/health   # diagnosticēt
POST /api/db/health   # diagnosticēt un labot
```

Atbilde ir `DbHealthCheckResult`, ko ģenerē `runDbHealthCheck()`
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

| Lauks             | Nozīme                                                                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, ja `issues` ir tukšs. `driver` to nekad neietekmē.                                                                                                 |
| `issues[].type`   | Viena no vērtībām: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                        |
| `repairedCount`   | Šīs izpildes laikā salaboto rindu skaits; vienmēr `0`, ja `autoRepair` ir false.                                                                           |
| `backupCreated`   | Norāda, vai pirms labošanas tika izveidota dublējumkopija.                                                                                                 |
| `checkedAt`       | ISO laikspiedols, kas ir kopīgs izpildei un jebkurai tās ierakstītajai labošanas piezīmei.                                                                 |
| `driver.name`     | SQLite draiveris, kas apkalpo pārbaudīto datubāzi.                                                                                                         |
| `driver.degraded` | `true`, ja rakstīšanas darbības netiek noturīgi saglabātas datubāzes failā — `sql.js` WASM rezerves variants (visa faila saglabāšana) vai datubāze atmiņā. |

Tādu pašu datu kopu atgriež MCP rīks `omniroute_db_health_check`.

Izpildiet `PRAGMA integrity_check`, lai konstatētu bojājumus:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Jāizvada: ok
```

Ja tiek atgriezts jebkas cits, nevis `ok`, **nekavējoties pārtrauciet datubāzes lietošanu** un atjaunojiet to no dublējumkopijas.

---

## Avārijas atkopšana

### 1. scenārijs: pazaudēts WAL fails

Trūkst `-wal` faila, bet `-shm` fails un galvenā datubāze nav bojāti:

```bash
# Automātiski atkopsies nākamajā atvēršanas reizē
omniroute
```

Ja SQLite nevar veikt automātisku atkopšanu:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 2. scenārijs: bojāts galvenais datubāzes fails

Atjaunojiet no dublējumkopijas:

```bash
omniroute sync pull --merge   # vai: omniroute backup restore <backup-id>
```

### 3. scenārijs: pazaudēta šifrēšanas atslēga

Bez atslēgas **atkopšana nav iespējama**. Šifrētie lauki nav nolasāmi. Manuāli pievienojiet visus pakalpojumu sniedzējus no jauna, izmantojot jaunus akreditācijas datus.

> **Riska mazināšana**: vienmēr atsevišķi dublējiet šifrēšanas atslēgu, vēlams paroļu pārvaldniekā vai KMS.

### 4. scenārijs: disks ir pilns

SQLite atgriezīs `SQLITE_FULL` kļūdas. Atbrīvojiet vietu diskā un pēc tam izpildiet:

```bash
# Izveidojiet WAL kontrolpunktu, lai atbrīvotu vietu
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Bieži veicamās darbības

### Tabulas pārbaude

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Rindu skaita noteikšana visās tabulās

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Visu datu atiestatīšana (dzēšana)

```bash
# Vispirms apturiet OmniRoute
omniroute stop

# Dzēsiet datubāzes failu
rm ~/.omniroute/storage.sqlite*

# Restartējiet (tiks atkārtoti izveidota tukša datubāze)
omniroute
```

Lai veiktu **selektīvu** atiestatīšanu (saglabājot pakalpojumu sniedzējus un dzēšot lietojuma datus):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Atsevišķas tabulas eksportēšana

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Problēmu novēršana

### "Datubāze ir bloķēta"

Cits process tur rakstīšanas bloķējumu. Varat:

- Gaidīt, līdz otrs process pabeidz darbu (pārbaudiet ar `lsof | grep storage.sqlite`)
- Apturēt otru procesu piespiedu kārtā
- Ja problēma saglabājas, restartēt OmniRoute

### "Ārējās atslēgas ierobežojuma pārkāpums"

Domēna modulis pārkāpj referenciālo integritāti. Pārbaudiet:

- Bāreņierakstus atkarīgajās tabulās
- Kaskādes dzēšanas, kas netika izplatītas
- Nesen veiktu migrāciju, kas mainīja ārējo atslēgu

Izpildiet `PRAGMA foreign_key_check;`, lai atrastu pārkāpumus.

### "Nepietiek atmiņas"

SQLite atmiņā kartētā ievade/izvade pārsniedz operētājsistēmas ierobežojumu. Samaziniet to, izmantojot SQLite pragmu:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB, nevis 256MB
```

Vai atspējojiet:

```sql
PRAGMA mmap_size = 0;
```

### "Migrācija neizdevās procesa vidū"

Migrācija tika veikta transakcijā, tāpēc izmaiņām vajadzēja tikt atsauktām. Ja tas nenotika:

1. **Apturiet OmniRoute** (lai novērstu turpmākus mēģinājumus)
2. **Pārbaudiet datubāzes stāvokli**, izmantojot `sqlite3`
3. **Manuāli izlabojiet** daļēji veikto migrāciju
4. **Atkārtoti palaidiet** OmniRoute (migrācija tiks mēģināta vēlreiz)

Lai to novērstu, vienmēr vispirms pārbaudiet migrācijas datubāzes kopijā.

---

## Skatiet arī

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — lietojuma tabulas
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — darbspējas pārraudzība
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — laidiena process
- Avots: `src/lib/db/` (vairāk nekā 80 failu, ~25 tūkst. koda rindu)
