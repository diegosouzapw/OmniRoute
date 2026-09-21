# Database Schema & Operations Guide (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Lühidalt**: OmniRoute kasutab oma peamise andmehoidlana **SQLite'i koos WAL-logimisega** ning tundlikud väljad on puhkeolekus kaitstud **AES-256-GCM**-krüpteeringuga. See juhend käsitleb skeemi, migratsioone, varundamist/taastamist ja operatiivseid tegevusjuhiseid.

**Allikad:**

- `src/lib/db/core.ts` — üksikeksemplar + SCHEMA_SQL (17 põhitabelit)
- `src/lib/db/migrationRunner.ts` — versioonitud migratsioonid
- `src/lib/db/migrations/` — 167 versioonitud SQL-faili
- `src/lib/db/encryption.ts` — krüpteerimise abifunktsioonid
- `src/lib/db/backup.ts` — varukoopia eksport/import
- `src/lib/db/healthCheck.ts` — seisundi diagnostika

---

## Miks SQLite?

OmniRoute valis PostgreSQL-i/MySQL-i asemel SQLite'i mitmel põhjusel:

| Tegur             | SQLite                                   | PostgreSQL                                           |
| ----------------- | ---------------------------------------- | ---------------------------------------------------- |
| **Juurutamine**   | Sisseehitatud — eraldi serverit pole     | Vajab serveri seadistamist                           |
| **Krüpteerimine** | Rakenduse tasemel (AES-256-GCM)          | Sisseehitatud TDE                                    |
| **Jõudlus**       | Kiirem väikese/keskmise koormuse korral  | Parem väga suure hulga samaaegsete kirjutuste korral |
| **Samaaegsus**    | WAL-režiim võimaldab samaaegset lugemist | Täielik MVCC                                         |
| **Varundamine**   | Ühe faili kopeerimine                    | `pg_dump` või failisüsteemi hetktõmmis               |
| **Kasutusjuht**   | Kasutajapõhine paigaldus, sisseehitatud  | Mitme rentnikuga SaaS                                |

**Ühe kasutaja ja ühe eksemplariga** juurutuste puhul (OmniRoute'i peamine kasutusjuht) on SQLite lihtsam ja kiirem.

### WAL-logimine

`core.ts` avab andmebaasi **WAL-režiimis (Write-Ahead Logging ehk ette kirjutav logimine)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL võimaldab kirjutamise ajal **samaaegset lugemist** — see on oluline töölaua jaoks, mis teeb päringuid samal ajal, kui taotlusi salvestatakse.

Vaikimisi vahemälu suurus on **65,536 KiB (64 MiB)**. SQLite tõlgendab negatiivset
`cache_size` väärtust ligikaudse ülempiirina KiB-des ja eraldab lehti vastavalt vajadusele.
**Seaded > Süsteem ja salvestusruum > Vahemälu suurus** aktsepteerib täisarve vahemikus **1 kuni
1,000,000 KiB**; sätte salvestamisel rakendatakse see aktiivsele andmebaasiühendusele
ning OmniRoute taastab püsivalt salvestatud väärtuse käivitamisel.

---

## Andmebaasi asukoht

SQLite'i fail asub järgmises kohas:

| OS      | Tee                                                       |
| ------- | --------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                             |
| macOS   | `~/.omniroute/storage.sqlite`                             |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                 |
| Docker  | `/app/data/storage.sqlite` (seadistatav `DATA_DIR` kaudu) |

Kaasnevad failid:

- `storage.sqlite-wal` — ette kirjutav logi
- `storage.sqlite-shm` — ühismälu fail
- `call_logs/` — päringute sisu artefaktid (kui lubatud)

**Asukoha alistamine:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domeenimoodulite arhitektuur

OmniRoute'i andmebaasis on **110 ülataseme TypeScripti moodulit** kataloogis `src/lib/db/`. Iga domeenimoodul:

- Haldab üht või mitut konkreetset tabelit
- Ekspordib tüübitud CRUD-funktsioone
- Ei kasuta kunagi teise mooduli tabeleid
- Kasutab andmebaasile juurdepääsuks faili `core.ts` funktsiooni `getDbInstance()`

### 110 ülataseme andmebaasimoodulit

OmniRoute'il on kataloogis `src/lib/db/` **110 ülataseme TypeScripti faili**. Allpool on valik põhimooduleid; täieliku loendi leiate kataloogi sisust:

| Moodul                  | Tabelid                                                        | Vastutus                                                                 |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | OAuthi/API-võtme pakkujate registreerimine ja autentimisandmed           |
| `models.ts`             | `key_value` (mudeliandmed)                                     | Mudelite määratlused, võimekused ja hinnastus                            |
| `combos.ts`             | `combos`                                                       | Kombineeritud marsruutimise konfiguratsioonid ja järjestus               |
| `apiKeys.ts`            | `api_keys`                                                     | API-võtmete elutsükkel, ulatused ja kvoodi jälgimine                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Süsteemi konfiguratsioon ja jagatud võtme-väärtuse hoidla                |
| `backup.ts`             | —                                                              | Varukoopiate eksportimise/importimise toimingud                          |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Puhverserverite konfiguratsioonid ja marsruutimisreeglid                 |
| `prompts.ts`            | `prompt_templates`                                             | Korduskasutatavad viibamallid ja versioonihaldus                         |
| `webhooks.ts`           | `webhooks`                                                     | Sündmuspõhised veebihaagi tellimused ja logid                            |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Päringupõhine auditlogimine (valikuline, suure mahuga)                   |
| `domainState.ts`        | `domain_*` (5 tabelit)                                         | Domeenide eelarved, kaitselülitid, lukustused, varuahelad ja kuluajalugu |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A lubatud API-võtmed                                               |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Kvoodikasutuse ajalugu                                                   |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mudelite vastendamine vaikimisi kombinatsioonidega                       |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-spetsiifiline püsiolek                                               |
| `encryption.ts`         | —                                                              | Abifunktsioonid väljade krüptimiseks/dekrüptimiseks                      |
| `readCache.ts`          | —                                                              | Mälusisene vahemälu lugemismahukate toimingute jaoks                     |
| `secrets.ts`            | `key_value` (krüptitud kirjed)                                 | Krüptitud saladuste talletamine                                          |
| `stateReset.ts`         | —                                                              | Andmebaasi oleku kustutamine/lähtestamine testimiseks                    |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Seansi kontekst agendi üleandmiseks                                      |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Kasutuse jälgimine                                                       |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Tihendamise konfiguratsioon                                              |

### Moodulite piirid

Arhitektuuri põhireegel: **moodulid ei kasuta üksteise tabeleid otse**. Teise mooduli andmetega töötamiseks importige funktsioon sellest moodulist.

```ts
// ❌ VALE: otsene SQL teisest moodulist
db.prepare("SELECT * FROM provider_connections").all();

// ✅ ÕIGE: kasutage providers-mooduli funktsiooni
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Selle reegli järgimist kontrollitakse koodi ülevaatuse käigus — staatilist kontrolli pole, kuid rikkumised märgistatakse.

---

## Baasskeem (17 tabelit)

`core.ts` määratleb 17 baastabelit muutujas `SCHEMA_SQL`. Need luuakse migratsiooniga `001_initial_schema.sql` ja moodustavad põhiskeemi.

### Põhitabelid (loodud algses migratsioonis)

| Tabel                      | Otstarve                                  | Põhiveerud                                                              |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Teenusepakkuja pääsuandmed (krüpteeritud) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Teenusepakkuja sõlme marsruutimisteave    | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Üldine võtme-väärtuse hoidla              | `namespace`, `key`, `value`                                             |
| `combos`                   | Marsruutimiskombinatsioonide määratlused  | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Lüüsile mõeldud API-võtmed                | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Andmebaasi metaandmed                     | `key`, `value`                                                          |
| `usage_history`            | Päringute kasutuskirjed                   | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Päringute sisu ja vastused                | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Puhverserveri päringulogid                | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Mudeli ja teenusepakkuja ahelad           | `model`, `chain`                                                        |
| `domain_budgets`           | Domeenipõhised kululimiidid               | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Eelarve lähtestamise ajalugu              | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Domeenipõhine kulude jälgimine            | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domeeni päringusageduse piirangu olek     | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Domeenipõhine kaitselüliti olek           | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM-i vastuste vahemälu                   | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Kvoodi ajaloolised hetktõmmised           | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Lisatabelid (lisatud hilisemate migratsioonidega)

Järgnevad migratsioonid lisavad muu hulgas järgmised tabelid:

- `cli_tool_state` (migratsioon 011) — CLI-tööriista olek
- `mcp_*` tabelid — MCP-serveri audit
- `a2a_*` tabelid — A2A-ülesannete olek
- `usage_*` tabelid — kasutuse jälgimine
- `plugin_*` tabelid — pistikprogrammisüsteem
- `skill_executions` — oskuste täitmise ajalugu
- `memory_*` tabelid — mälusüsteem
- `compression_*` tabelid — tihendussüsteem
- `webhook_*` tabelid — veebihaakide edastuslogi
- `acp_*` tabelid — agendikliendi protokoll
- `oneproxy_*` tabelid — 1proxy turuplats
- `proxy_assignments` — puhverserveri ulatuse seosed
- `detailed_call_artifacts` — kutselogi artefaktide metaandmed
- `quota_alert_history` — kvoodihoiatuste audit
- `command_code_auth_sessions` — Command Code OAuthi seansid

Ligikaudu 30+ tabeli täielik loend asub kataloogis `src/lib/db/migrations/`.

---

## Migratsioonid

OmniRoute kasutab kaustas `src/lib/db/migrations/` **versioonitud ja idempotentseid migratsioone**. Iga migratsioon on eraldi SQL-fail nimega `NNN_description.sql`.

### Migratsioonide nimetamine

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Kuidas migratsioone käitatakse

Käivitamisel teeb `migrationRunner.ts` järgmist:

1. Loob tabeli `_omniroute_migrations`, kui seda pole olemas
2. Pärib juba rakendatud migratsioonid
3. Rakendab kõik uued migratsioonid järjest, igaühe eraldi transaktsioonis
4. Salvestab iga rakendatud migratsiooni koos ajatempliga

```ts
// src/lib/db/migrationRunner.ts (lihtsustatud)
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

### Idempotentsus

Migratsioonid peavad olema **idempotentsed** — nende teistkordsel käitamisel ei tohiks midagi muutuda:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Kasutage julgelt klausleid `IF NOT EXISTS`, `IF EXISTS` ja `OR IGNORE` / `OR REPLACE`.

### Uue migratsiooni lisamine

1. **Tehke kindlaks järgmine number**: `ls src/lib/db/migrations/ | tail -1`
2. **Looge fail**: `NNN_my_change.sql`
3. **Kasutage ohutut DDL-i**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Täitke olemasolevad andmed hoolikalt**: kasutage olemasolevate ridade töötlemiseks konstruktsiooni `UPDATE ... WHERE ...`
5. **Testige koopial**: ärge kunagi käitage testimata migratsioone tootmiskeskkonnas

Näide:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Tagasiühildumatud muudatused** (nt veergude eemaldamine) on keerulised. OmniRoute EI toeta varasemale versioonile üleminekut — kui migratsioon on rakendatud, on skeemimuudatus püsiv. Planeerige vastavalt.

---

## Puhkeolekus andmete krüpteerimine

Tundlikud väljad (API-võtmed, OAuthi pääsutõendid, ühendusstringid) krüpteeritakse puhkeolekus algoritmiga **AES-256-GCM**.

### Kuidas see toimib

```ts
// src/lib/db/encryption.ts (lihtsustatud)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Kus seda kasutatakse

- `provider_connections.api_key` — krüpteeritud rakenduse tasemel
- `provider_connections.access_token`, `refresh_token`, `id_token` — krüpteeritud rakenduse tasemel
- `key_value` kirjed, mille puhul `namespace = "secrets"` — krüpteeritud rakenduse tasemel
- `proxy_registry.auth` — krüpteeritud rakenduse tasemel (kui see on olemas)

### Krüpteerimisvõti

Krüpteerimisvõti tuletatakse **paroolifraasist** (määratakse keskkonnamuutuja `STORAGE_ENCRYPTION_KEY` kaudu) ja **soolast** (salvestatakse andmebaasi). Andmete dekrüpteerimiseks on vaja mõlemat.

```bash
# Genereerige turvaline paroolifraas
openssl rand -hex 32

# Määrake failis .env
STORAGE_ENCRYPTION_KEY=<teie-võti>
```

> **Kriitiline**: krüpteerimisvõtme kaotamine tähendab juurdepääsu kaotamist kõigile krüpteeritud andmetele. **Varundage võti andmebaasist eraldi**.

### Mida EI krüpteerita

Jõudluse huvides salvestatakse järgmine teave avatekstina:

- Teenusepakkujate kuvatavad nimed
- Mudelite definitsioonid (juba avalikud)
- Marsruutimisreeglid
- Kasutusandmed (isikuandmed puuduvad)

---

## Krüptimise eripärad (v3.8.16+)

OmniRoute kasutab funktsiooni **`migrateLegacyEncryptedString()`**, et käsitleda läbipaistvalt kahte krüptimisskeemi:

- **Pärandvorming** (enne versiooni v3.5.0): XOR-põhine „krüptimine” (pole tegelik krüptograafia)
- **Praegune**: AES-256-GCM koos korrektse IV ja autentimismärgendiga

Migreerimisabiline tuvastab pärandvormingu ja krüptib andmed esimesel lugemisel uue skeemiga uuesti. See tähendab, et saate vana andmebaasi täiendada ilma autentimisandmeid kaotamata.

---

## Lugemisvahemälu

Sageli loetavate andmete (mudelid, pakkujad, sätted) jaoks pakub `readCache.ts` **mälusisest vahemälu**:

```ts
// Käivitamisel vahemällu salvestatud, kirjutamisel kehtetuks muudetud
const providers = await getCachedProviders(); // Kiire, mälusisene
const fresh = await listProviders(); // Aeglane, pöördub andmebaasi poole
```

| Vahemällu salvestatud olem | Vahemälu võti  | TTL                |
| -------------------------- | -------------- | ------------------ |
| `models`                   | `models:v1`    | Kuni kirjutamiseni |
| `provider_connections`     | `providers:v1` | Kuni kirjutamiseni |
| `settings`                 | `settings:v1`  | Kuni kirjutamiseni |
| `combos`                   | `combos:v1`    | Kuni kirjutamiseni |

Vahemälu muudetakse kehtetuks iga vastavasse tabelisse kirjutamise korral.

---

## Varundamine ja taastamine

### Käsitsi varundamine

```bash
# Kasutage kohaliku varukoopia loomiseks CLI-d
omniroute backup create --name pre-migration

# Või API kaudu
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Varukoopiafail sisaldab järgmist:

- Kõik andmebaasitabelid (JSON-iks serialiseeritud)
- Kõnelogi artefaktid (base64-kodeeringus, valikuline)
- Sätted ja saladused (krüptitud)
- Pistikprogrammi konfiguratsioon

### Taastamine

```bash
# CLI kaudu
omniroute restore pre-migration

# API kaudu
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Hoiatus**: taastamine kirjutab kogu andmebaasi üle. Esmalt peatage kõik kliendid.

### Automaatsed varukoopiad

```bash
# Lubage CLI kaudu automaatsed igapäevased varukoopiad
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ajastust käitab serveris tausttöö, mis käivitub iga 30 sekundi järel
(vaikimisi) ja võrdleb cron-avaldist serveri kohaliku ajaga.

| Muutuja                                     | Vaikeväärtus | Kirjeldus                                                                                                                        |
| ------------------------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`      | Käivitumisintervall millisekundites (min `5000`). Sobivasse cron-minutisse usaldusväärselt jõudmiseks peab olema lühem kui 60 s. |

### SQLite'i töötava andmebaasi varundamine

Töötava andmebaasi katkestusteta varundamiseks:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

See kasutab SQLite'i veebipõhist varundus-API-t, mistõttu on käsku ohutu käitada ka OmniRoute'i töötamise ajal.

---

## Jõudluse häälestamine

### WAL-režiim

WAL on vaikimisi lubatud. Suure kirjutuskoormuse korral kaaluge järgmist:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Kontrollpunkt iga 1000 lehekülje järel
PRAGMA journal_size_limit = 67108864;  -- WAL-i piirang 64 MB
```

### Indeksid

Jõudluse jaoks olulised indeksid (migratsioonid loovad need automaatselt):

- `idx_models_provider` — mudelite otsing teenusepakkuja järgi
- `idx_combo_targets_combo_id` — kombinatsiooni sihtmärkide laiendamine
- `idx_usage_history_api_key_timestamp` — kasutusanalüütika
- `idx_quota_snapshots_api_key_window` — kvootide jälgimine
- `idx_call_logs_timestamp` — kõnelogi päringud

Uue indeksi lisamiseks looge migratsioon:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Mälukaardistatud sisend/väljund

Väga suurte andmebaaside (>10 GB) korral saab mälukaardistust kohandada SQLite'i pragma abil:

```sql
-- Määrake SQLite'i pragma abil (kohandage failis core.ts või käitusajal)
PRAGMA mmap_size = 268435456;  -- 256 MB
```

### Tihendamine

Pikka aega töötavatele OmniRoute'i eksemplaridele tuleb kasuks aeg-ajalt käivitatav `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Käivitage seda kord kuus vähese liiklusega ajavahemikul. (WAL-režiim vähendab vajadust, kuid ei kõrvalda seda.)

---

## Tervisekontroll

`src/lib/db/healthCheck.ts` pakub **andmebaasitaseme tervisediagnostikat**:

Mõlemad meetodid nõuavad autentimist (muidu tagastatakse `401`). `GET` ainult diagnoosib; `POST` käivitab
sama kontrolli lubatud suvandiga `autoRepair`.

```bash
GET  /api/db/health   # diagnoosimine
POST /api/db/health   # diagnoosimine + parandamine
```

Vastus on funktsiooni `runDbHealthCheck()` loodud `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domeenide eelarved viitasid API-võtmetele, mida enam ei eksisteeri.",
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

| Väli              | Tähendus                                                                                                                                                       |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, kui `issues` on tühi. `driver` ei mõjuta seda kunagi.                                                                                                  |
| `issues[].type`   | Üks järgmistest: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                              |
| `repairedCount`   | Selle käituse jooksul parandatud read; alati `0`, kui `autoRepair` on väär.                                                                                    |
| `backupCreated`   | Kas enne parandamist loodi varukoopia.                                                                                                                         |
| `checkedAt`       | ISO ajatempel, mida jagavad käitus ja selle kirjutatud paranduse märkus.                                                                                       |
| `driver.name`     | Kontrollitud andmebaasi teenindav SQLite'i draiver.                                                                                                            |
| `driver.degraded` | `true`, kui kirjutatud andmed pole andmebaasifailis püsivalt talletatud — `sql.js`-i WASM-varuvariant (kogu faili püsiv talletamine) või mälusisene andmebaas. |

Sama andmekoormuse tagastab MCP-tööriist `omniroute_db_health_check`.

Kahjustuste tuvastamiseks käivitage `PRAGMA integrity_check`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Peaks väljastama: ok
```

Kui see tagastab midagi muud kui `ok`, **lõpetage kohe andmebaasi kasutamine** ja taastage see varukoopiast.

---

## Katastroofijärgne taaste

### Stsenaarium 1: WAL-fail on kadunud

Fail `-wal` puudub, kuid `-shm` ja põhiandmebaas on terved:

```bash
# Taastub järgmisel avamisel automaatselt
omniroute
```

Kui SQLite ei suuda automaatselt taastada:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Stsenaarium 2: põhiandmebaasi fail on rikutud

Taastage varukoopiast:

```bash
omniroute sync pull --merge   # või: omniroute backup restore <backup-id>
```

### Stsenaarium 3: krüpteerimisvõti on kadunud

Ilma võtmeta **pole taastamine võimalik**. Krüpteeritud välju ei saa lugeda. Lisage kõik teenusepakkujad uute mandaatidega käsitsi uuesti.

> **Leevendusmeede**: varundage krüpteerimisvõti alati eraldi, eelistatult paroolihalduris või KMS-is.

### Stsenaarium 4: ketas on täis

SQLite tagastab vead `SQLITE_FULL`. Vabastage kettaruumi ja seejärel käivitage:

```bash
# Tehke WAL-i kontrollpunkt ruumi vabastamiseks
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Levinud toimingud

### Tabeli vaatamine

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Kõigi tabelite ridade loendamine

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Kõigi andmete lähtestamine (kustutamine)

```bash
# Esmalt peatage OmniRoute
omniroute stop

# Kustutage andmebaasifail
rm ~/.omniroute/storage.sqlite*

# Taaskäivitage (luuakse uus tühi andmebaas)
omniroute
```

**Valikuliseks** lähtestamiseks (säilitage teenusepakkujad, kustutage kasutusandmed):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Ühe tabeli eksportimine

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Tõrkeotsing

### „Andmebaas on lukustatud“

Teine protsess hoiab kirjutuslukku. Tehke üht järgmistest:

- Oodake, kuni teine protsess lõpetab (kontrollige käsuga `lsof | grep storage.sqlite`)
- Lõpetage teine protsess
- Kui probleem püsib, taaskäivitage OmniRoute

### „Välisvõtme piirangu kontroll ebaõnnestus“

Domeenimoodul rikub viiteterviklust. Kontrollige järgmist:

- Sõltuvates tabelites olevad orvuks jäänud read
- Kaskaadkustutused, mis ei levinud edasi
- Hiljutine migratsioon, mis muutis välisvõtit

Rikkumiste leidmiseks käivitage `PRAGMA foreign_key_check;`.

### „Mälu on otsas“

SQLite'i mällu vastendatud sisend/väljund ületab operatsioonisüsteemi piirangut. Vähendage seda SQLite'i pragma abil:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB 256MB asemel
```

Või keelake see:

```sql
PRAGMA mmap_size = 0;
```

### „Migratsioon ebaõnnestus poole pealt“

Migratsioon käivitati transaktsioonis, seega oleks see pidanud tagasi pöörduma. Kui seda ei juhtunud:

1. **Peatage OmniRoute** (et vältida edasisi katseid)
2. **Kontrollige andmebaasi olekut** tööriistaga `sqlite3`
3. **Parandage osaline migratsioon** käsitsi
4. **Käivitage OmniRoute uuesti** (migratsiooni proovitakse uuesti)

Selle vältimiseks testige migratsioone alati esmalt andmebaasi koopial.

---

## Vaadake ka

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — kasutustabelid
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — seisundi jälgimine
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — väljalaskeprotsess
- Lähtekood: `src/lib/db/` (üle 80 faili, ~25K koodirida)
