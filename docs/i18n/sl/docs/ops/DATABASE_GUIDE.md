# Database Schema & Operations Guide (Slovenščina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Na kratko**: OmniRoute kot primarno shrambo uporablja **SQLite z beleženjem WAL**, pri čemer so občutljiva polja v mirovanju šifrirana z **AES-256-GCM**. Ta vodnik obravnava shemo, migracije, varnostno kopiranje/obnovitev in operativne priročnike.

**Viri:**

- `src/lib/db/core.ts` — enojček + SCHEMA_SQL (17 osnovnih tabel)
- `src/lib/db/migrationRunner.ts` — različicami označene migracije
- `src/lib/db/migrations/` — 167 različicami označenih datotek SQL
- `src/lib/db/encryption.ts` — pomožne funkcije za šifriranje
- `src/lib/db/backup.ts` — izvoz/uvoz varnostnih kopij
- `src/lib/db/healthCheck.ts` — diagnostika stanja

---

## Zakaj SQLite?

OmniRoute je namesto PostgreSQL/MySQL izbral SQLite iz več razlogov:

| Dejavnik                | SQLite                                         | PostgreSQL                                 |
| ----------------------- | ---------------------------------------------- | ------------------------------------------ |
| **Uvajanje**            | Vgrajen — brez ločenega strežnika              | Zahteva nastavitev strežnika               |
| **Šifriranje**          | Na ravni aplikacije (AES-256-GCM)              | Vgrajeni TDE                               |
| **Zmogljivost**         | Hitrejši za majhne/srednje obremenitve         | Boljši za ogromno sočasnih zapisov         |
| **Sočasnost**           | Način WAL omogoča sočasna branja               | Polni MVCC                                 |
| **Varnostno kopiranje** | Kopiranje ene datoteke                         | `pg_dump` ali posnetek datotečnega sistema |
| **Primer uporabe**      | Namestitev za posameznega uporabnika, vgrajeno | Večnajemniški SaaS                         |

Za uvedbe z **enim uporabnikom in enim primerkom** (primarni primer uporabe za OmniRoute) je SQLite preprostejši in hitrejši.

### Beleženje WAL

`core.ts` odpre podatkovno zbirko v **načinu WAL (vnaprejšnje beleženje zapisov)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL omogoča **sočasna branja** med zapisovanjem — to je pomembno za nadzorno ploščo, ki izvaja poizvedbe med beleženjem zahtev.

Privzeta velikost predpomnilnika je **65.536 KiB (64 MiB)**. SQLite negativno vrednost
`cache_size` razume kot približno zgornjo mejo v KiB in strani dodeljuje po potrebi.
Nastavitev **Nastavitve > Sistem in shramba > Velikost predpomnilnika** sprejema celoštevilske vrednosti od **1 do
1.000.000 KiB**; shranjevanje nastavitve jo uveljavi za aktivno povezavo s podatkovno zbirko,
OmniRoute pa ob zagonu obnovi shranjeno vrednost.

---

## Lokacija podatkovne zbirke

Datoteka SQLite je shranjena na:

| OS      | Pot                                                      |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (nastavljivo prek `DATA_DIR`) |

Spremljevalne datoteke:

- `storage.sqlite-wal` — dnevnik vnaprejšnjega zapisovanja
- `storage.sqlite-shm` — datoteka skupnega pomnilnika
- `call_logs/` — artefakti koristne vsebine zahtev (če je omogočeno)

**Preglasitev lokacije:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arhitektura domenskih modulov

Podatkovna zbirka OmniRoute ima **110 vrhnjih modulov TypeScript** v `src/lib/db/`. Vsak domenski modul:

- Upravlja eno ali več določenih tabel
- Izvaža tipizirane funkcije CRUD
- Nikoli ne dostopa do tabel drugega modula
- Za dostop do podatkovne zbirke uporablja `getDbInstance()` iz `core.ts`

### 110 vrhnjih modulov podatkovne zbirke

OmniRoute ima **110 vrhnjih datotek TypeScript** v `src/lib/db/`. Spodaj je prikazan izbor ključnih modulov; celoten seznam najdete v izpisu imenika:

| Modul                   | Tabele                                                         | Odgovornost                                                                            |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registracija ponudnikov in poverilnice s ključi OAuth/API                              |
| `models.ts`             | `key_value` (podatki modelov)                                  | Definicije modelov, zmogljivosti in cene                                               |
| `combos.ts`             | `combos`                                                       | Konfiguracije in vrstni red kombiniranega usmerjanja                                   |
| `apiKeys.ts`            | `api_keys`                                                     | Življenjski cikel ključev API, obsegi in spremljanje kvot                              |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Sistemska konfiguracija in skupna shramba ključ-vrednost                               |
| `backup.ts`             | —                                                              | Postopki izvoza/uvoza varnostnih kopij                                                 |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfiguracije posredniških strežnikov in pravila usmerjanja                            |
| `prompts.ts`            | `prompt_templates`                                             | Predloge pozivov za večkratno uporabo in upravljanje različic                          |
| `webhooks.ts`           | `webhooks`                                                     | Naročnine na spletne kavlje, ki jih sprožijo dogodki, in dnevniki                      |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Revizijsko beleženje posameznih zahtev (izbirno, velika količina)                      |
| `domainState.ts`        | `domain_*` (5 tabel)                                           | Domenske omejitve porabe, odklopniki, zaklepi, nadomestne verige in zgodovina stroškov |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Ključi API na seznamu dovoljenih za MCP/A2A                                            |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Zgodovinska poraba kvot                                                                |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Preslikava modelov v privzete kombinacije                                              |
| `cliToolState.ts`       | `cli_tool_state`                                               | Trajno stanje, specifično za CLI                                                       |
| `encryption.ts`         | —                                                              | Pomožne funkcije za šifriranje/dešifriranje polj                                       |
| `readCache.ts`          | —                                                              | Predpomnilnik v pomnilniku za operacije z veliko branja                                |
| `secrets.ts`            | `key_value` (šifrirani vnosi)                                  | Šifrirana hramba skrivnosti                                                            |
| `stateReset.ts`         | —                                                              | Brisanje/ponastavitev stanja podatkovne zbirke za testiranje                           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kontekst seje za predajo med agenti                                                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Spremljanje uporabe                                                                    |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfiguracija stiskanja                                                                |

### Meje modulov

Ključno arhitekturno pravilo: **moduli ne dostopajo neposredno do tabel drugih modulov**. Če želite delati s podatki drugega modula, uvozite funkcijo iz tega modula.

```ts
// ❌ NAPAČNO: neposredni SQL iz drugega modula
db.prepare("SELECT * FROM provider_connections").all();

// ✅ PRAVILNO: uporabite funkcijo modula providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

To pravilo se uveljavlja s pregledom kode — statičnega preverjanja ni, vendar so kršitve označene.

---

## Osnovna shema (17 tabel)

`core.ts` definira 17 osnovnih tabel v `SCHEMA_SQL`. Ustvarjene so z migracijo `001_initial_schema.sql` in tvorijo jedrno shemo.

### Jedrne tabele (ustvarjene v začetni migraciji)

| Tabela                     | Namen                                      | Ključni stolpci                                                         |
| -------------------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Poverilnice ponudnika (šifrirane)          | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Podatki za usmerjanje vozlišč ponudnika    | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Splošna shramba KV                         | `namespace`, `key`, `value`                                             |
| `combos`                   | Definicije kombinacij usmerjanja           | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Ključi API za prehod                       | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metapodatki podatkovne zbirke              | `key`, `value`                                                          |
| `usage_history`            | Zapisi o uporabi zahtevkov                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Koristne vsebine zahtevkov in odgovori     | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Dnevniki zahtevkov posredniškega strežnika | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Verige med modeli in ponudniki             | `model`, `chain`                                                        |
| `domain_budgets`           | Proračuni porabe po domenah                | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Zgodovina ponastavitev proračunov          | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Sledenje stroškom po domenah               | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stanje omejevanja hitrosti za domeno       | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stanje odklopnika za posamezno domeno      | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Predpomnilnik odgovorov LLM                | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Zgodovinski posnetki kvot                  | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Dodatne tabele (dodane s poznejšimi migracijami)

Naknadne migracije dodajo tabele, kot so:

- `cli_tool_state` (migracija 011) — stanje orodja CLI
- tabele `mcp_*` — revizija strežnika MCP
- tabele `a2a_*` — stanje opravil A2A
- tabele `usage_*` — sledenje uporabi
- tabele `plugin_*` — sistem vtičnikov
- `skill_executions` — zgodovina izvajanja veščin
- tabele `memory_*` — pomnilniški sistem
- tabele `compression_*` — sistem stiskanja
- tabele `webhook_*` — dnevnik dostave webhookov
- tabele `acp_*` — Agent Client Protocol
- tabele `oneproxy_*` — tržnica 1proxy
- `proxy_assignments` — vezave obsega posredniškega strežnika
- `detailed_call_artifacts` — metapodatki artefaktov dnevnika klicev
- `quota_alert_history` — revizija opozoril o kvotah
- `command_code_auth_sessions` — seje OAuth za Command Code

Celoten seznam več kot 30 tabel je v `src/lib/db/migrations/`.

---

## Migracije

OmniRoute uporablja **različicene, idempotentne migracije** v `src/lib/db/migrations/`. Vsaka migracija je ena datoteka SQL, poimenovana `NNN_description.sql`.

### Poimenovanje migracij

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Kako se izvajajo migracije

Ob zagonu `migrationRunner.ts`:

1. Ustvari tabelo `_omniroute_migrations`, če še ne obstaja
2. Pridobi že uporabljene migracije
3. Po vrsti uporabi vse nove migracije, vsako v svoji transakciji
4. Zabeleži vsako uporabljeno migracijo skupaj s časovnim žigom

```ts
// src/lib/db/migrationRunner.ts (poenostavljeno)
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

Migracije morajo biti **idempotentne** — njihov vnovični zagon ne sme povzročiti sprememb:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Obsežno uporabljajte stavke `IF NOT EXISTS`, `IF EXISTS` in `OR IGNORE` / `OR REPLACE`.

### Dodajanje nove migracije

1. **Določite naslednjo številko**: `ls src/lib/db/migrations/ | tail -1`
2. **Ustvarite datoteko**: `NNN_my_change.sql`
3. **Uporabite varen DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Previdno dopolnite obstoječe podatke**: uporabite `UPDATE ... WHERE ...` za obravnavo obstoječih vrstic
5. **Preizkusite na kopiji**: nepreizkušenih migracij nikoli ne izvajajte v produkciji

Primer:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Spremembe, ki niso združljive za nazaj** (npr. odstranjevanje stolpcev), so zahtevne. OmniRoute NE podpira vrnitve na starejšo različico — ko je migracija uporabljena, je sprememba sheme trajna. Načrtujte temu primerno.

---

## Šifriranje shranjenih podatkov

Občutljiva polja (ključi API, žetoni OAuth, nizi za povezavo) so pri shranjevanju šifrirana z uporabo algoritma **AES-256-GCM**.

### Kako deluje

```ts
// src/lib/db/encryption.ts (poenostavljeno)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Kje se uporablja

- `provider_connections.api_key` — šifrirano na ravni aplikacije
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifrirano na ravni aplikacije
- vnosi `key_value` z `namespace = "secrets"` — šifrirano na ravni aplikacije
- `proxy_registry.auth` — šifrirano na ravni aplikacije (če je prisotno)

### Šifrirni ključ

Šifrirni ključ je izpeljan iz **geselne fraze** (nastavljene prek okoljske spremenljivke `STORAGE_ENCRYPTION_KEY`) in **soli** (shranjene v podatkovni zbirki). Za dešifriranje podatkov sta potrebna oba.

```bash
# Ustvarite varno geselno frazo
openssl rand -hex 32

# Nastavite jo v .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritično**: Izguba šifrirnega ključa pomeni izgubo dostopa do vseh šifriranih podatkov. **Varnostno kopijo ključa hranite ločeno od podatkovne zbirke**.

### Kaj NI šifrirano

Zaradi zmogljivosti so naslednji podatki shranjeni kot navadno besedilo:

- Prikazna imena ponudnikov
- Definicije modelov (že javne)
- Pravila usmerjanja
- Zapisi o uporabi (brez osebno določljivih podatkov)

---

## Opozorila glede šifriranja (v3.8.16+)

OmniRoute uporablja **`migrateLegacyEncryptedString()`** za pregledno obravnavo dveh načinov šifriranja:

- **Stari način** (pred v3.5.0): »šifriranje« na osnovi XOR (ni prava kriptografija)
- **Trenutni način**: AES-256-GCM z ustreznim inicializacijskim vektorjem in oznako za preverjanje pristnosti

Pomočnik za migracijo zazna staro obliko in jo ob prvem branju znova šifrira z novim načinom. To pomeni, da lahko nadgradite staro podatkovno zbirko, ne da bi izgubili poverilnice.

---

## Predpomnilnik za branje

Za pogosto brane podatke (modele, ponudnike, nastavitve) `readCache.ts` zagotavlja **predpomnilnik v pomnilniku**:

```ts
// Predpomnjeno ob zagonu, razveljavljeno ob zapisu
const providers = await getCachedProviders(); // Hitro, v pomnilniku
const fresh = await listProviders(); // Počasi, dostopa do podatkovne zbirke
```

| Predpomnjena entiteta  | Ključ predpomnilnika | TTL       |
| ---------------------- | -------------------- | --------- |
| `models`               | `models:v1`          | Do zapisa |
| `provider_connections` | `providers:v1`       | Do zapisa |
| `settings`             | `settings:v1`        | Do zapisa |
| `combos`               | `combos:v1`          | Do zapisa |

Predpomnilnik se razveljavi ob vsakem zapisu v ustrezno tabelo.

---

## Varnostno kopiranje in obnovitev

### Ročno varnostno kopiranje

```bash
# Z vmesnikom CLI ustvarite lokalno varnostno kopijo
omniroute backup create --name pre-migration

# Ali prek API-ja
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Datoteka varnostne kopije vključuje:

- Vse tabele podatkovne zbirke (serializirane v JSON)
- Artefakte dnevnika klicev (kodirane z base64, izbirno)
- Nastavitve in skrivnosti (šifrirane)
- Konfiguracijo vtičnikov

### Obnovitev

```bash
# Prek CLI-ja
omniroute restore pre-migration

# Prek API-ja
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Opozorilo**: Obnovitev prepiše celotno podatkovno zbirko. Najprej zaustavite vse odjemalce.

### Samodejne varnostne kopije

```bash
# Prek CLI-ja omogočite samodejno dnevno varnostno kopiranje
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Razpored izvaja opravilo v ozadju na strani strežnika, ki se privzeto sproži vsakih 30 sekund
in ovrednoti izraz cron glede na lokalni čas strežnika.

| Spremenljivka                               | Privzeto | Opis                                                                                                                        |
| ------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | Interval proženja v ms (najmanj `5000`). Za zanesljivo izvajanje znotraj ujemajoče se minute cron mora biti krajši od 60 s. |

### Sprotno varnostno kopiranje SQLite

Za varnostno kopiranje delujoče podatkovne zbirke brez prekinitve delovanja:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

To uporablja SQLite API za spletno varnostno kopiranje — izvajanje je varno tudi med delovanjem OmniRoute.

---

## Prilagajanje zmogljivosti

### Način WAL

WAL je privzeto omogočen. Pri delovnih obremenitvah z veliko zapisovanja upoštevajte:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Kontrolna točka vsakih 1000 strani
PRAGMA journal_size_limit = 67108864;  -- Omejitev WAL na 64 MB
```

### Indeksi

Ključni indeksi za zmogljivost (samodejno ustvarjeni z migracijami):

- `idx_models_provider` — iskanje modelov po ponudniku
- `idx_combo_targets_combo_id` — razširjanje ciljev kombinacije
- `idx_usage_history_api_key_timestamp` — analitika uporabe
- `idx_quota_snapshots_api_key_window` — spremljanje kvot
- `idx_call_logs_timestamp` — poizvedbe po dnevniku klicev

Če želite dodati nov indeks, ustvarite migracijo:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### V/I s preslikavo v pomnilnik

Za zelo velike podatkovne zbirke (>10 GB) lahko preslikavo v pomnilnik prilagodite prek pragme SQLite:

```sql
-- Nastavite prek pragme SQLite (prilagodite v core.ts ali med izvajanjem)
PRAGMA mmap_size = 268435456;  -- 256 MB
```

### Zgoščevanje

Dolgotrajno delujočim primerkom OmniRoute koristi občasna izvedba ukaza `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Zaženite ga enkrat mesečno v obdobjih nizkega prometa. (Način WAL zmanjša potrebo po tem, vendar je ne odpravi.)

---

## Preverjanje stanja

`src/lib/db/healthCheck.ts` zagotavlja **diagnostiko stanja na ravni podatkovne zbirke**:

Oba glagola zahtevata preverjanje pristnosti (sicer je vrnjeno `401`). `GET` samo diagnosticira; `POST` izvede
enako preverjanje z omogočeno možnostjo `autoRepair`.

```bash
GET  /api/db/health   # diagnosticiranje
POST /api/db/health   # diagnosticiranje + popravilo
```

Odgovor je `DbHealthCheckResult`, ki ga ustvari `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Proračuni domen so se sklicevali na ključe API, ki ne obstajajo več.",
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

| Polje             | Pomen                                                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, ko je `issues` prazen. `driver` nikoli ne vpliva nanj.                                                                                                         |
| `issues[].type`   | Ena od vrednosti `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                      |
| `repairedCount`   | Vrstice, popravljene med tem zagonom; vedno `0`, ko je `autoRepair` false.                                                                                             |
| `backupCreated`   | Ali je bila pred popravilom ustvarjena varnostna kopija.                                                                                                               |
| `checkedAt`       | Časovni žig ISO, ki je skupen zagonu in morebitni opombi o popravilu, ki jo ta zapiše.                                                                                 |
| `driver.name`     | Gonilnik SQLite, ki uporablja preverjeno podatkovno zbirko.                                                                                                            |
| `driver.degraded` | `true`, ko zapisi niso trajno podprti z datoteko podatkovne zbirke — nadomestni gonilnik WASM `sql.js` (trajnost celotne datoteke) ali podatkovna zbirka v pomnilniku. |

Enako koristno vsebino vrne orodje MCP `omniroute_db_health_check`.

Za odkrivanje poškodb zaženite `PRAGMA integrity_check`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Izpisati bi se moralo: ok
```

Če vrne kar koli drugega kot `ok`, **nemudoma prenehajte uporabljati podatkovno zbirko** in jo obnovite iz varnostne kopije.

---

## Obnovitev po katastrofi

### Scenarij 1: Izgubljena datoteka WAL

Datoteka `-wal` manjka, vendar sta `-shm` in glavna podatkovna zbirka nepoškodovani:

```bash
# Samodejno se obnovi ob naslednjem odprtju
omniroute
```

Če SQLite ne more izvesti samodejne obnovitve:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenarij 2: Poškodovana datoteka glavne podatkovne zbirke

Obnovite iz varnostne kopije:

```bash
omniroute sync pull --merge   # ali: omniroute backup restore <backup-id>
```

### Scenarij 3: Izgubljen šifrirni ključ

Brez ključa **obnovitev ni mogoča**. Šifriranih polj ni mogoče prebrati. Vse ponudnike znova ročno dodajte z novimi poverilnicami.

> **Omilitev tveganja**: Šifrirni ključ vedno varnostno kopirajte ločeno, po možnosti v upravitelju gesel ali sistemu KMS.

### Scenarij 4: Poln disk

SQLite bo vrnil napake `SQLITE_FULL`. Sprostite prostor na disku in nato izvedite:

```bash
# Izvedite kontrolno točko WAL, da sprostite prostor
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Pogosta opravila

### Pregled tabele

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Štetje vrstic v vseh tabelah

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Ponastavitev (izbris) vseh podatkov

```bash
# Najprej zaustavite OmniRoute
omniroute stop

# Izbrišite datoteko podatkovne zbirke
rm ~/.omniroute/storage.sqlite*

# Znova zaženite (ustvarjena bo nova prazna podatkovna zbirka)
omniroute
```

Za **selektivno** ponastavitev (ohranitev ponudnikov, izbris podatkov o uporabi):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Izvoz posamezne tabele

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Odpravljanje težav

### »Podatkovna zbirka je zaklenjena«

Drug proces zadržuje zaklep za pisanje. Izvedite eno od naslednjih dejanj:

- Počakajte, da se drug proces konča (preverite z `lsof | grep storage.sqlite`)
- Končajte drug proces
- Če težava ne izgine, znova zaženite OmniRoute

### »Omejitev tujega ključa ni bila izpolnjena«

Domenski modul krši referenčno integriteto. Preverite:

- Osirotele vrstice v odvisnih tabelah
- Kaskadne izbrise, ki se niso razširili
- Nedavno selitev, ki je spremenila tuji ključ

Za iskanje kršitev zaženite `PRAGMA foreign_key_check;`.

### »Ni dovolj pomnilnika«

Vhodno-izhodne operacije SQLite s preslikavo v pomnilnik presegajo omejitev operacijskega sistema. Zmanjšajte porabo s pragmo SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128 MB namesto 256 MB
```

Ali jih onemogočite:

```sql
PRAGMA mmap_size = 0;
```

### »Selitev se je ustavila na sredini«

Selitev se je izvajala v transakciji, zato bi morala biti razveljavljena. Če ni bila:

1. **Zaustavite OmniRoute** (preprečite nadaljnje poskuse)
2. **Preverite stanje podatkovne zbirke** z `sqlite3`
3. **Ročno popravite** delno selitev
4. **Znova zaženite** OmniRoute (poskus selitve bo ponovljen)

Da to preprečite, selitve vedno najprej preizkusite na kopiji.

---

## Glejte tudi

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabele uporabe
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — spremljanje stanja
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — postopek izdaje
- Izvorna koda: `src/lib/db/` (več kot 80 datotek, približno 25.000 vrstic kode)
