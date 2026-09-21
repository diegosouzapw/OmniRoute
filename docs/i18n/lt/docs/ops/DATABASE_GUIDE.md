# Database Schema & Operations Guide (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Trumpai**: „OmniRoute“ kaip pagrindinę duomenų saugyklą naudoja **SQLite su WAL žurnalizavimu**, o konfidencialūs laukai ramybės būsenoje šifruojami naudojant **AES-256-GCM**. Šiame vadove aptariama schema, migracijos, atsarginių kopijų kūrimas ir atkūrimas bei eksploatavimo procedūros.

**Šaltiniai:**

- `src/lib/db/core.ts` — vienetinis objektas + SCHEMA_SQL (17 bazinių lentelių)
- `src/lib/db/migrationRunner.ts` — versijuotos migracijos
- `src/lib/db/migrations/` — 167 versijuoti SQL failai
- `src/lib/db/encryption.ts` — šifravimo pagalbinės funkcijos
- `src/lib/db/backup.ts` — atsarginių kopijų eksportavimas ir importavimas
- `src/lib/db/healthCheck.ts` — būklės diagnostika

---

## Kodėl SQLite?

„OmniRoute“ pasirinko SQLite, o ne PostgreSQL ar MySQL, dėl kelių priežasčių:

| Veiksnys              | SQLite                                    | PostgreSQL                                           |
| --------------------- | ----------------------------------------- | ---------------------------------------------------- |
| **Diegimas**          | Integruota — nereikia atskiro serverio    | Reikia sukonfigūruoti serverį                        |
| **Šifravimas**        | Programos lygmens (AES-256-GCM)           | Integruotas TDE                                      |
| **Našumas**           | Spartesnė mažoms ir vidutinėms apkrovoms  | Geresnė esant daugybei lygiagrečių įrašymo operacijų |
| **Lygiagretumas**     | WAL režimas leidžia skaityti lygiagrečiai | Visavertis MVCC                                      |
| **Atsarginė kopija**  | Vieno failo kopijavimas                   | `pg_dump` arba failų sistemos momentinė kopija       |
| **Naudojimo atvejis** | Diegimas vienam naudotojui, integruota    | Kelių nuomininkų SaaS                                |

**Vieno naudotojo ir vieno egzemplioriaus** diegimams (pagrindiniam „OmniRoute“ naudojimo atvejui) SQLite yra paprastesnė ir spartesnė.

### WAL žurnalizavimas

`core.ts` atveria duomenų bazę **WAL (išankstinio įrašymo žurnalo) režimu**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL leidžia **lygiagrečiai skaityti** vykstant įrašymo operacijoms — tai svarbu valdymo skydeliui, kuris vykdo užklausas tuo metu, kai registruojamos užklausos.

Numatytasis podėlio dydis yra **65 536 KiB (64 MiB)**. Neigiamą
`cache_size` reikšmę SQLite interpretuoja kaip apytikslę viršutinę ribą KiB vienetais ir puslapius paskirsto pagal poreikį.
Skiltyje **Nustatymai > Sistema ir saugykla > Podėlio dydis** priimamos sveikųjų skaičių reikšmės nuo **1 iki
1 000 000 KiB**; išsaugojus nustatymą, jis pritaikomas aktyviam duomenų bazės ryšiui,
o paleidimo metu „OmniRoute“ atkuria išsaugotą reikšmę.

---

## Duomenų bazės vieta

SQLite failas saugomas čia:

| OS      | Kelias                                                           |
| ------- | ---------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                    |
| macOS   | `~/.omniroute/storage.sqlite`                                    |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                        |
| Docker  | `/app/data/storage.sqlite` (konfigūruojama naudojant `DATA_DIR`) |

Papildomi failai:

- `storage.sqlite-wal` — išankstinio įrašymo žurnalas
- `storage.sqlite-shm` — bendrinamosios atminties failas
- `call_logs/` — užklausų naudingosios apkrovos artefaktai (jei įjungta)

**Vietos keitimas:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domenų modulių architektūra

„OmniRoute“ duomenų bazėje yra **110 aukščiausio lygio TypeScript modulių**, esančių `src/lib/db/`. Kiekvienas domeno modulis:

- Valdo vieną ar kelias konkrečias lenteles
- Eksportuoja tipizuotas CRUD funkcijas
- Niekada tiesiogiai nenaudoja kito modulio lentelių
- Duomenų bazei pasiekti naudoja `getDbInstance()` iš `core.ts`

### 110 aukščiausio lygio DB modulių

„OmniRoute“ turi **110 aukščiausio lygio TypeScript failų**, esančių `src/lib/db/`. Toliau pateikiama pagrindinių modulių imtis; visą sąrašą rasite katalogo turinyje:

| Modulis                 | Lentelės                                                       | Paskirtis                                                                                        |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Teikėjų registracija ir kredencialai naudojant OAuth / API raktus                                |
| `models.ts`             | `key_value` (modelių duomenys)                                 | Modelių apibrėžtys, galimybės ir kainodara                                                       |
| `combos.ts`             | `combos`                                                       | Kombinuotojo maršruto parinkimo konfigūracijos ir eiliškumas                                     |
| `apiKeys.ts`            | `api_keys`                                                     | API raktų gyvavimo ciklas, aprėptys ir kvotų stebėjimas                                          |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Sistemos konfigūracija ir bendroji KV saugykla                                                   |
| `backup.ts`             | —                                                              | Atsarginių kopijų eksportavimo ir importavimo operacijos                                         |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Tarpinių serverių konfigūracijos ir maršruto parinkimo taisyklės                                 |
| `prompts.ts`            | `prompt_templates`                                             | Pakartotinai naudojami užklausų šablonai ir versijų valdymas                                     |
| `webhooks.ts`           | `webhooks`                                                     | Įvykiais grindžiamos „webhook“ prenumeratos ir žurnalai                                          |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Kiekvienos užklausos audito registravimas (pasirinktinis, didelės apimties)                      |
| `domainState.ts`        | `domain_*` (5 lentelės)                                        | Domenų biudžetai, grandinės pertraukikliai, blokavimai, atsarginės grandinės ir išlaidų istorija |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Į baltąjį sąrašą įtraukti MCP/A2A API raktai                                                     |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Istorinis kvotų naudojimas                                                                       |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modelių susiejimas su numatytosiomis kombinacijomis                                              |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI skirta išliekamoji būsena                                                                    |
| `encryption.ts`         | —                                                              | Pagalbinės laukų šifravimo ir iššifravimo priemonės                                              |
| `readCache.ts`          | —                                                              | Atmintyje laikoma dažnų skaitymo operacijų podėlio talpykla                                      |
| `secrets.ts`            | `key_value` (užšifruoti įrašai)                                | Užšifruota paslapčių saugykla                                                                    |
| `stateReset.ts`         | —                                                              | DB būsenos išvalymas / atkūrimas testavimui                                                      |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Seanso kontekstas agento perdavimui                                                              |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Naudojimo stebėjimas                                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Glaudinimo konfigūracija                                                                         |

### Modulių ribos

Pagrindinė architektūros taisyklė: **moduliai tiesiogiai nepasiekia vienas kito lentelių**. Norėdami dirbti su kito modulio duomenimis, importuokite funkciją iš to modulio.

```ts
// ❌ NETEISINGAI: tiesioginė SQL užklausa iš kito modulio
db.prepare("SELECT * FROM provider_connections").all();

// ✅ TEISINGAI: naudokite providers modulio funkciją
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Šios taisyklės laikymasis užtikrinamas atliekant kodo peržiūrą — statinės patikros nėra, tačiau pažeidimai pažymimi.

---

## Bazinė schema (17 lentelių)

`core.ts` apibrėžia 17 bazinių lentelių kintamajame `SCHEMA_SQL`. Jos sukuriamos migracijos `001_initial_schema.sql` metu ir sudaro pagrindinę schemą.

### Pagrindinės lentelės (sukuriamos pradinės migracijos metu)

| Lentelė                    | Paskirtis                                       | Pagrindiniai stulpeliai                                                 |
| -------------------------- | ----------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Teikėjo prisijungimo duomenys (šifruoti)        | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Teikėjo mazgų maršruto parinkimo informacija    | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Bendroji KV saugykla                            | `namespace`, `key`, `value`                                             |
| `combos`                   | Maršruto parinkimo derinių apibrėžimai          | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Tinklų sietuvo API raktai                       | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Duomenų bazės metaduomenys                      | `key`, `value`                                                          |
| `usage_history`            | Užklausų naudojimo įrašai                       | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Užklausų turinys ir atsakymai                   | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Tarpinio serverio užklausų žurnalai             | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modelio ir teikėjo grandinės                    | `model`, `chain`                                                        |
| `domain_budgets`           | Kiekvieno domeno išlaidų biudžetai              | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Biudžeto nustatymo iš naujo istorija            | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Kiekvieno domeno išlaidų stebėjimas             | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domeno dažnio ribojimo būsena                   | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Kiekvieno domeno grandinės pertraukiklio būsena | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM atsakymų podėlis                            | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Istorinės kvotų momentinės kopijos              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Papildomos lentelės (pridėtos vėlesnių migracijų metu)

Vėlesnės migracijos prideda tokias lenteles kaip:

- `cli_tool_state` (migracija 011) — CLI įrankio būsena
- `mcp_*` lentelės — MCP serverio auditas
- `a2a_*` lentelės — A2A užduočių būsena
- `usage_*` lentelės — naudojimo stebėjimas
- `plugin_*` lentelės — papildinių sistema
- `skill_executions` — gebėjimų vykdymo istorija
- `memory_*` lentelės — atminties sistema
- `compression_*` lentelės — glaudinimo sistema
- `webhook_*` lentelės — „webhook“ pristatymo žurnalas
- `acp_*` lentelės — agento kliento protokolas
- `oneproxy_*` lentelės — „1proxy“ prekyvietė
- `proxy_assignments` — tarpinio serverio aprėpties susiejimai
- `detailed_call_artifacts` — išsamūs iškvietimų žurnalo artefaktų metaduomenys
- `quota_alert_history` — kvotų įspėjimų auditas
- `command_code_auth_sessions` — „Command Code“ OAuth seansai

Visas daugiau nei 30 lentelių sąrašas pateiktas `src/lib/db/migrations/`.

---

## Migracijos

OmniRoute naudoja **versijuojamas, idempotentines migracijas**, esančias `src/lib/db/migrations/`. Kiekviena migracija yra vienas SQL failas, pavadintas `NNN_description.sql`.

### Migracijų pavadinimai

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Kaip vykdomos migracijos

Paleidimo metu `migrationRunner.ts`:

1. Sukuria lentelę `_omniroute_migrations`, jei jos dar nėra
2. Užklausia, kurios migracijos jau pritaikytos
3. Iš eilės pritaiko visas naujas migracijas, kiekvieną atskiroje operacijoje
4. Užregistruoja kiekvieną pritaikytą migraciją su laiko žyma

```ts
// src/lib/db/migrationRunner.ts (supaprastinta)
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

### Idempotentiškumas

Migracijos turi būti **idempotentinės** — pakartotinis jų vykdymas neturėtų sukelti jokių pakeitimų:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Plačiai naudokite sąlygas `IF NOT EXISTS`, `IF EXISTS` ir `OR IGNORE` / `OR REPLACE`.

### Naujos migracijos pridėjimas

1. **Nustatykite kitą numerį**: `ls src/lib/db/migrations/ | tail -1`
2. **Sukurkite failą**: `NNN_my_change.sql`
3. **Naudokite saugų DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Atsargiai užpildykite esamus duomenis**: esamoms eilutėms apdoroti naudokite `UPDATE ... WHERE ...`
5. **Išbandykite kopijoje**: niekada nevykdykite neišbandytų migracijų gamybinėje aplinkoje

Pavyzdys:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Atgal nesuderinami pakeitimai** (pvz., stulpelių šalinimas) yra sudėtingi. OmniRoute NEPALAIKO ankstesnės versijos atkūrimo — pritaikius migraciją, schemos pakeitimas tampa nuolatinis. Planuokite atitinkamai.

---

## Duomenų šifravimas saugykloje

Neskelbtini laukai (API raktai, OAuth prieigos raktai, prisijungimo eilutės) saugykloje šifruojami naudojant **AES-256-GCM**.

### Kaip tai veikia

```ts
// src/lib/db/encryption.ts (supaprastinta)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Kur tai naudojama

- `provider_connections.api_key` — šifruojama programos lygmeniu
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifruojama programos lygmeniu
- `key_value` įrašai, kurių `namespace = "secrets"` — šifruojami programos lygmeniu
- `proxy_registry.auth` — šifruojama programos lygmeniu (jei yra)

### Šifravimo raktas

Šifravimo raktas išvedamas iš **slaptafrazės** (nustatomos naudojant aplinkos kintamąjį `STORAGE_ENCRYPTION_KEY`) ir **druskos** (saugomos DB). Duomenims iššifruoti reikia abiejų.

```bash
# Sugeneruokite saugią slaptafrazę
openssl rand -hex 32

# Nustatykite .env faile
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritiškai svarbu**: praradus šifravimo raktą, bus prarasta prieiga prie visų užšifruotų duomenų. **Sukurkite atskirą rakto atsarginę kopiją, nesaugodami jos kartu su duomenų baze**.

### Kas NEŠIFRUOJAMA

Siekiant geresnio našumo, toliau nurodyti duomenys saugomi atviruoju tekstu:

- Teikėjų rodomi pavadinimai
- Modelių apibrėžtys (jos jau viešos)
- Maršruto parinkimo taisyklės
- Naudojimo įrašai (be asmens identifikavimo informacijos)

---

## Šifravimo ypatumai (v3.8.16+)

OmniRoute naudoja **`migrateLegacyEncryptedString()`**, kad skaidriai palaikytų dvi šifravimo schemas:

- **Senoji** (iki v3.5.0): XOR pagrįstas „šifravimas“ (ne tikra kriptografija)
- **Dabartinė**: AES-256-GCM su tinkamu IV ir autentifikavimo žyma

Perkėlimo pagalbinė funkcija aptinka senąjį formatą ir pirmą kartą nuskaičius iš naujo užšifruoja duomenis naudodama naująją schemą. Tai reiškia, kad galite atnaujinti seną duomenų bazę neprarasdami prisijungimo duomenų.

---

## Skaitymo podėlis

Dažnai skaitomiems duomenims (modeliams, teikėjams, nustatymams) `readCache.ts` suteikia **atmintyje laikomą podėlį**:

```ts
// Paleidžiant įrašoma į podėlį, rašant podėlio įrašas panaikinamas
const providers = await getCachedProviders(); // Greita, iš atminties
const fresh = await listProviders(); // Lėta, kreipiamasi į DB
```

| Podėlyje laikomas objektas | Podėlio raktas | TTL         |
| -------------------------- | -------------- | ----------- |
| `models`                   | `models:v1`    | Iki įrašymo |
| `provider_connections`     | `providers:v1` | Iki įrašymo |
| `settings`                 | `settings:v1`  | Iki įrašymo |
| `combos`                   | `combos:v1`    | Iki įrašymo |

Podėlis panaikinamas po kiekvieno įrašymo į atitinkamą lentelę.

---

## Atsarginės kopijos ir atkūrimas

### Rankinis atsarginės kopijos kūrimas

```bash
# Naudokite CLI vietinei atsarginei kopijai sukurti
omniroute backup create --name pre-migration

# Arba per API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Atsarginės kopijos faile yra:

- Visos DB lentelės (serializuotos į JSON)
- Iškvietimų žurnalo artefaktai (užkoduoti base64, neprivalomi)
- Nustatymai ir paslaptys (užšifruoti)
- Papildinių konfigūracija

### Atkūrimas

```bash
# Per CLI
omniroute restore pre-migration

# Per API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Įspėjimas**: atkuriant perrašoma visa DB. Pirmiausia sustabdykite visus klientus.

### Automatinės atsarginės kopijos

```bash
# Įjunkite automatinį kasdienį atsarginių kopijų kūrimą per CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Tvarkaraštį serverio pusėje vykdo foninė užduotis, kuri suaktyvinama kas 30 sekundžių
(numatytoji reikšmė) ir įvertina cron išraišką pagal vietinį serverio laiką.

| Kintamasis                                  | Numatytoji reikšmė | Aprašymas                                                                                                                                      |
| ------------------------------------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`            | Suaktyvinimo intervalas milisekundėmis (min. `5000`). Kad patikimai pataikytų į atitinkančią cron minutę, jis turi būti trumpesnis nei 60 sek. |

### Operatyvusis SQLite atsarginės kopijos kūrimas

Veikiančios DB atsarginei kopijai sukurti be prastovos:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Tam naudojama SQLite internetinio atsarginių kopijų kūrimo API — komandą saugu vykdyti, kol veikia OmniRoute.

---

## Našumo optimizavimas

### WAL režimas

WAL įjungtas pagal numatytuosius nustatymus. Esant didelėms rašymo apkrovoms, apsvarstykite šiuos nustatymus:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Kontrolinis taškas kas 1000 puslapių
PRAGMA journal_size_limit = 67108864;  -- 64 MB WAL riba
```

### Indeksai

Pagrindiniai našumui skirti indeksai (automatiškai sukuriami migracijų metu):

- `idx_models_provider` — modelių paieška pagal teikėją
- `idx_combo_targets_combo_id` — kombinuotų paskirties objektų išplėtimas
- `idx_usage_history_api_key_timestamp` — naudojimo analizė
- `idx_quota_snapshots_api_key_window` — kvotų stebėjimas
- `idx_call_logs_timestamp` — iškvietimų žurnalo užklausos

Norėdami pridėti naują indeksą, sukurkite migraciją:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Į atmintį susietas įvedimas ir išvedimas

Labai didelėms duomenų bazėms (>10 GB) susiejimą su atmintimi galima koreguoti naudojant SQLite pragma:

```sql
-- Nustatykite naudodami SQLite pragma (pakoreguokite core.ts arba vykdymo aplinkoje)
PRAGMA mmap_size = 268435456;  -- 256 MB
```

### Sutankinimas

Ilgai veikiančioms OmniRoute instancijoms naudinga retkarčiais vykdyti `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Vykdykite kas mėnesį mažo srauto laikotarpiais. (WAL režimas sumažina poreikį, tačiau jo visiškai nepanaikina.)

---

## Būklės patikra

`src/lib/db/healthCheck.ts` teikia **duomenų bazės lygmens būklės diagnostiką**:

Abiem metodams būtinas autentifikavimas (kitu atveju grąžinama `401`). `GET` tik atlieka diagnostiką, o `POST` vykdo tą pačią patikrą su įjungtu `autoRepair`.

```bash
GET  /api/db/health   # diagnostika
POST /api/db/health   # diagnostika + taisymas
```

Atsakyme pateikiamas `DbHealthCheckResult`, kurį sugeneruoja `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domenų biudžetuose buvo nurodyti API raktai, kurie nebeegzistuoja.",
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

| Laukas            | Reikšmė                                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, kai `issues` yra tuščias. `driver` niekada neturi tam įtakos.                                                                                                |
| `issues[].type`   | Viena iš šių reikšmių: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                              |
| `repairedCount`   | Šio vykdymo metu pataisytos eilutės; visada `0`, kai `autoRepair` yra false.                                                                                         |
| `backupCreated`   | Ar prieš taisymą buvo sukurta atsarginė kopija.                                                                                                                      |
| `checkedAt`       | ISO laiko žyma, bendra vykdymui ir bet kokiai jo įrašytai taisymo pastabai.                                                                                          |
| `driver.name`     | Patikrintą duomenų bazę aptarnaujanti SQLite tvarkyklė.                                                                                                              |
| `driver.degraded` | `true`, kai įrašymai nėra patikimai išsaugomi duomenų bazės faile — naudojant `sql.js` WASM atsarginį variantą (viso failo išsaugojimą) arba atmintinę duomenų bazę. |

Tą patį naudingosios apkrovos objektą grąžina MCP įrankis `omniroute_db_health_check`.

Norėdami aptikti pažeidimus, vykdykite `PRAGMA integrity_check`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Turėtų išvesti: ok
```

Jei grąžinama bet kokia kita reikšmė nei `ok`, **nedelsdami nustokite naudoti duomenų bazę** ir atkurkite ją iš atsarginės kopijos.

---

## Atkūrimas po gedimo

### 1 scenarijus: prarastas WAL failas

`-wal` failo nėra, tačiau `-shm` failas ir pagrindinė DB nepažeisti:

```bash
# Automatiškai atkuriama kitą kartą atidarius
omniroute
```

Jei SQLite negali automatiškai atkurti:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 2 scenarijus: sugadintas pagrindinis DB failas

Atkurkite iš atsarginės kopijos:

```bash
omniroute sync pull --merge   # arba: omniroute backup restore <backup-id>
```

### 3 scenarijus: prarastas šifravimo raktas

Be rakto **atkurti neįmanoma**. Užšifruotų laukų perskaityti negalima. Rankiniu būdu iš naujo pridėkite visus teikėjus, naudodami naujus prisijungimo duomenis.

> **Rizikos mažinimas**: visada atskirai kurkite atsarginę šifravimo rakto kopiją, geriausia slaptažodžių tvarkytuvėje arba KMS.

### 4 scenarijus: pilnas diskas

SQLite grąžins `SQLITE_FULL` klaidas. Atlaisvinkite vietos diske, tada vykdykite:

```bash
# Sukurkite WAL kontrolinį tašką, kad atlaisvintumėte vietos
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Dažnos operacijos

### Lentelės peržiūra

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Eilučių skaičiavimas visose lentelėse

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Visų duomenų nustatymas iš naujo (ištrynimas)

```bash
# Pirmiausia sustabdykite OmniRoute
omniroute stop

# Ištrinkite DB failą
rm ~/.omniroute/storage.sqlite*

# Paleiskite iš naujo (bus iš naujo sukurta tuščia DB)
omniroute
```

Norėdami atlikti **pasirinktinį** nustatymą iš naujo (išsaugoti teikėjus, ištrinti naudojimo duomenis):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Vienos lentelės eksportavimas

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Trikčių šalinimas

### „Duomenų bazė užrakinta“

Kitas procesas laiko rašymo užraktą. Galite:

- Palaukti, kol kitas procesas bus baigtas (patikrinkite naudodami `lsof | grep storage.sqlite`)
- Priverstinai nutraukti kitą procesą
- Jei problema išlieka, paleisti OmniRoute iš naujo

### „Pažeistas išorinio rakto apribojimas“

Domeno modulis pažeidžia nuorodų vientisumą. Patikrinkite:

- Nesusietas eilutes priklausomose lentelėse
- Pakopinius trynimus, kurie nebuvo perduoti
- Naujausią migraciją, kuri pakeitė išorinį raktą

Paleiskite `PRAGMA foreign_key_check;`, kad rastumėte pažeidimus.

### „Trūksta atminties“

SQLite į atmintį susietos įvesties / išvesties naudojimas viršija OS ribą. Sumažinkite ją naudodami SQLite pragmą:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB vietoje 256MB
```

Arba išjunkite:

```sql
PRAGMA mmap_size = 0;
```

### „Migracija nutrūko nebaigta“

Migracija buvo vykdoma operacijoje, todėl pakeitimai turėjo būti atšaukti. Jei taip neįvyko:

1. **Sustabdykite OmniRoute** (kad išvengtumėte tolesnių bandymų)
2. **Patikrinkite DB būseną** naudodami `sqlite3`
3. **Rankiniu būdu pataisykite** dalinę migraciją
4. **Iš naujo paleiskite** OmniRoute (migracija bus bandoma dar kartą)

Kad to išvengtumėte, migracijas visada pirmiausia išbandykite kopijoje.

---

## Taip pat žr.

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — naudojimo lentelės
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — būklės stebėjimas
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — leidimo procesas
- Šaltinis: `src/lib/db/` (daugiau nei 80 failų, ~25 tūkst. kodo eilučių)
