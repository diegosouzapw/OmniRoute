# Database Schema & Operations Guide (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Lyhyesti**: OmniRoute käyttää ensisijaisena tietovarastonaan **SQLitea WAL-lokikirjauksella** ja arkaluonteisten kenttien levossa olevan tiedon salaukseen **AES-256-GCM**-salausta. Tässä oppaassa käsitellään skeemaa, migraatioita, varmuuskopiointia ja palautusta sekä operatiivisia toimintaohjeita.

**Lähteet:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 perustaulua)
- `src/lib/db/migrationRunner.ts` — versioidut migraatiot
- `src/lib/db/migrations/` — 167 versioitua SQL-tiedostoa
- `src/lib/db/encryption.ts` — salauksen apufunktiot
- `src/lib/db/backup.ts` — varmuuskopioiden vienti/tuonti
- `src/lib/db/healthCheck.ts` — kuntodiagnostiikka

---

## Miksi SQLite?

OmniRoute valitsi SQLiten PostgreSQL:n/MySQL:n sijaan useista syistä:

| Tekijä               | SQLite                                          | PostgreSQL                                                   |
| -------------------- | ----------------------------------------------- | ------------------------------------------------------------ |
| **Käyttöönotto**     | Upotettu — ei erillistä palvelinta              | Edellyttää palvelimen määritystä                             |
| **Salaus**           | Sovelluskerroksessa (AES-256-GCM)               | Sisäänrakennettu TDE                                         |
| **Suorituskyky**     | Nopeampi pienillä ja keskisuurilla työkuormilla | Parempi erittäin suurilla samanaikaisilla kirjoituskuormilla |
| **Samanaikaisuus**   | WAL-tila mahdollistaa samanaikaiset luvut       | Täysi MVCC                                                   |
| **Varmuuskopiointi** | Yhden tiedoston kopio                           | `pg_dump` tai tiedostojärjestelmän tilannevedos              |
| **Käyttötapaus**     | Käyttäjäkohtainen asennus, upotettu             | Monen vuokralaisen SaaS                                      |

**Yhden käyttäjän yhden instanssin** käyttöönotossa (OmniRouten ensisijainen käyttötapaus) SQLite on yksinkertaisempi ja nopeampi.

### WAL-lokikirjaus

`core.ts` avaa tietokannan **WAL (Write-Ahead Logging) -tilassa**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL mahdollistaa **samanaikaiset lukutoiminnot** kirjoitusten aikana — tämä on tärkeää hallintapaneelille, joka tekee kyselyitä samalla, kun pyyntöjä tallennetaan.

Välimuistin oletuskoko on **65 536 KiB (64 MiB)**. SQLite tulkitsee negatiivisen
`cache_size`-arvon likimääräiseksi ylärajaksi kibitavuina ja varaa sivuja tarpeen mukaan.
**Asetukset > Järjestelmä ja tallennustila > Välimuistin koko** hyväksyy kokonaislukuarvot väliltä **1–
1 000 000 KiB**; asetuksen tallentaminen ottaa sen käyttöön aktiivisessa tietokantayhteydessä,
ja OmniRoute palauttaa pysyvästi tallennetun arvon käynnistyksen yhteydessä.

---

## Tietokannan sijainti

SQLite-tiedosto tallennetaan seuraavaan sijaintiin:

| Käyttöjärjestelmä | Polku                                                               |
| ----------------- | ------------------------------------------------------------------- |
| Linux             | `~/.omniroute/storage.sqlite`                                       |
| macOS             | `~/.omniroute/storage.sqlite`                                       |
| Windows           | `%USERPROFILE%\.omniroute\storage.sqlite`                           |
| Docker            | `/app/data/storage.sqlite` (määritettävissä muuttujalla `DATA_DIR`) |

Liitännäistiedostot:

- `storage.sqlite-wal` — ennakkokirjausloki
- `storage.sqlite-shm` — jaetun muistin tiedosto
- `call_logs/` — pyyntöjen hyötykuorma-artefaktit (jos käytössä)

**Sijainnin ohittaminen:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Toimialuemoduulien arkkitehtuuri

OmniRouten tietokannassa on **110 ylimmän tason TypeScript-moduulia** hakemistossa `src/lib/db/`. Jokainen toimialuemoduuli:

- Omistaa yhden tai useamman tietyn taulun
- Vie tyypitettyjä CRUD-funktioita
- Ei koskaan käsittele muiden moduulien tauluja
- Käyttää `core.ts`-tiedoston `getDbInstance()`-funktiota tietokannan käyttämiseen

### 110 ylimmän tason tietokantamoduulia

OmniRoutessa on **110 ylimmän tason TypeScript-tiedostoa** hakemistossa `src/lib/db/`. Alla on otos keskeisistä moduuleista; täydellinen luettelo löytyy hakemiston tiedostolistauksesta:

| Moduuli                 | Taulut                                                         | Vastuu                                                                      |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth- ja API-avainpalveluntarjoajien rekisteröinti sekä tunnistetiedot     |
| `models.ts`             | `key_value` (mallitiedot)                                      | Mallien määritelmät, ominaisuudet ja hinnoittelu                            |
| `combos.ts`             | `combos`                                                       | Yhdistelmäreitityksen määritykset ja järjestys                              |
| `apiKeys.ts`            | `api_keys`                                                     | API-avainten elinkaari, käyttöalueet ja kiintiöiden seuranta                |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Järjestelmän määritykset ja jaettu avain-arvotietovarasto                   |
| `backup.ts`             | —                                                              | Varmuuskopioiden vienti- ja tuontitoiminnot                                 |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Välityspalvelinmääritykset ja reitityssäännöt                               |
| `prompts.ts`            | `prompt_templates`                                             | Uudelleenkäytettävät kehotemallit ja versiointi                             |
| `webhooks.ts`           | `webhooks`                                                     | Tapahtumapohjaiset webhook-tilaukset ja lokit                               |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Pyyntökohtainen tarkastuslokitus (valinnainen, suuri tietomäärä)            |
| `domainState.ts`        | `domain_*` (5 taulua)                                          | Toimialueiden budjetit, katkaisijat, lukitukset, varaketjut ja kuluhistoria |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP:n/A2A:n sallittujen API-avainten luettelo                               |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historiallinen kiintiöiden käyttö                                           |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mallien yhdistäminen oletusyhdistelmiin                                     |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-kohtainen pysyvä tila                                                   |
| `encryption.ts`         | —                                                              | Apufunktiot kenttien salaamiseen ja salauksen purkamiseen                   |
| `readCache.ts`          | —                                                              | Muistinsisäinen välimuisti paljon lukutoimintoja käyttäville operaatioille  |
| `secrets.ts`            | `key_value` (salatut tietueet)                                 | Salattu salaisuuksien tallennus                                             |
| `stateReset.ts`         | —                                                              | Tietokannan tilan tyhjentäminen ja palauttaminen testausta varten           |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Istuntokonteksti agentin vaihdosta varten                                   |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Käytön seuranta                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Pakkausmääritykset                                                          |

### Moduulien rajat

Keskeinen arkkitehtuurisääntö: **moduulit eivät käytä toistensa tauluja suoraan**. Kun tarvitset toisen moduulin tietoja, tuo funktio kyseisestä moduulista.

```ts
// ❌ VÄÄRIN: suora SQL-kysely toisen moduulin tauluun
db.prepare("SELECT * FROM provider_connections").all();

// ✅ OIKEIN: käytä providers-moduulin funktiota
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Tämän säännön noudattamista valvotaan koodikatselmoinneissa — staattista tarkistusta ei ole, mutta rikkomukset merkitään.

---

## Perusskeema (17 taulua)

`core.ts` määrittelee 17 perustaulua `SCHEMA_SQL`:ssä. Migraatio `001_initial_schema.sql` luo nämä taulut, jotka muodostavat ydinskeeman.

### Ydintaulut (luodaan ensimmäisessä migraatiossa)

| Taulu                      | Tarkoitus                                  | Keskeiset sarakkeet                                                     |
| -------------------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Palveluntarjoajan tunnistetiedot (salatut) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Palveluntarjoajan solmujen reititystiedot  | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Yleinen KV-säilö                           | `namespace`, `key`, `value`                                             |
| `combos`                   | Reititysyhdistelmien määritykset           | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Yhdyskäytävän API-avaimet                  | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Tietokannan metatiedot                     | `key`, `value`                                                          |
| `usage_history`            | Pyyntöjen käyttötietueet                   | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Pyyntöjen hyötykuormat ja vastaukset       | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Välityspyyntöjen lokit                     | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Mallien ja palveluntarjoajien ketjut       | `model`, `chain`                                                        |
| `domain_budgets`           | Verkkotunnuskohtaiset kulutusbudjetit      | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Budjettien nollaushistoria                 | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Verkkotunnuskohtainen kuluseuranta         | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Verkkotunnuksen nopeusrajoituksen tila     | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Verkkotunnuskohtainen katkaisijan tila     | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM-vastausvälimuisti                      | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historialliset kiintiötilannekuvat         | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Lisätaulut (lisätty myöhemmissä migraatioissa)

Myöhemmät migraatiot lisäävät muun muassa seuraavia tauluja:

- `cli_tool_state` (migraatio 011) — CLI-työkalun tila
- `mcp_*`-taulut — MCP-palvelimen auditointi
- `a2a_*`-taulut — A2A-tehtävien tila
- `usage_*`-taulut — käytön seuranta
- `plugin_*`-taulut — liitännäisjärjestelmä
- `skill_executions` — taitojen suoritushistoria
- `memory_*`-taulut — muistijärjestelmä
- `compression_*`-taulut — pakkausjärjestelmä
- `webhook_*`-taulut — webhook-toimitusloki
- `acp_*`-taulut — Agent Client Protocol
- `oneproxy_*`-taulut — 1proxy-markkinapaikka
- `proxy_assignments` — välityspalvelinten käyttöalueiden sidonnat
- `detailed_call_artifacts` — kutsulokien artefaktien metatiedot
- `quota_alert_history` — kiintiöhälytysten auditointihistoria
- `command_code_auth_sessions` — Command Code OAuth -istunnot

Täydellinen luettelo yli 30 taulusta sijaitsee hakemistossa `src/lib/db/migrations/`.

---

## Migraatiot

OmniRoute käyttää **versioituja, idempotentteja migraatioita** hakemistossa `src/lib/db/migrations/`. Kukin migraatio on yksi SQL-tiedosto, jonka nimi on muotoa `NNN_description.sql`.

### Migraatioiden nimeäminen

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Migraatioiden suorittaminen

Käynnistyksen yhteydessä `migrationRunner.ts`:

1. Luo `_omniroute_migrations`-taulun, jos sitä ei ole olemassa
2. Hakee jo suoritetut migraatiot
3. Suorittaa kaikki uudet migraatiot järjestyksessä, kunkin omassa transaktiossaan
4. Kirjaa jokaisen suoritetun migraation aikaleimoineen

```ts
// src/lib/db/migrationRunner.ts (yksinkertaistettu)
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

### Idempotenssi

Migraatioiden on oltava **idempotentteja** — niiden suorittamisen kahdesti ei pitäisi aiheuttaa muutoksia:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Käytä runsaasti `IF NOT EXISTS`-, `IF EXISTS`- ja `OR IGNORE` / `OR REPLACE` -lausekkeita.

### Uuden migraation lisääminen

1. **Selvitä seuraava numero**: `ls src/lib/db/migrations/ | tail -1`
2. **Luo tiedosto**: `NNN_my_change.sql`
3. **Käytä turvallista DDL:ää**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Täydennä olemassa olevat tiedot huolellisesti**: käsittele olemassa olevat rivit käyttämällä `UPDATE ... WHERE ...`
5. **Testaa kopiolla**: älä koskaan suorita testaamattomia migraatioita tuotannossa

Esimerkki:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Taaksepäin yhteensopimattomat muutokset** (esimerkiksi sarakkeiden poistaminen) ovat hankalia. OmniRoute EI tue palaamista aiempaan versioon — kun migraatio on suoritettu, skeemamuutos on pysyvä. Suunnittele sen mukaisesti.

---

## Levossa olevan tiedon salaus

Arkaluonteiset kentät (API-avaimet, OAuth-tunnukset ja yhteysmerkkijonot) salataan levossa käyttäen **AES-256-GCM**-salausta.

### Toimintaperiaate

```ts
// src/lib/db/encryption.ts (yksinkertaistettu)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Käyttökohteet

- `provider_connections.api_key` — salataan sovellustasolla
- `provider_connections.access_token`, `refresh_token`, `id_token` — salataan sovellustasolla
- `key_value`-tietueet, joissa `namespace = "secrets"` — salataan sovellustasolla
- `proxy_registry.auth` — salataan sovellustasolla (jos määritetty)

### Salausavain

Salausavain johdetaan **salalauseesta** (asetetaan `STORAGE_ENCRYPTION_KEY`-ympäristömuuttujalla) ja **suolasta** (tallennetaan tietokantaan). Molemmat tarvitaan tietojen salauksen purkamiseen.

```bash
# Luo turvallinen salalause
openssl rand -hex 32

# Aseta .env-tiedostossa
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kriittistä**: Salausavaimen menettäminen tarkoittaa, että kaikki salatut tiedot menetetään. **Varmuuskopioi avain erilleen tietokannasta**.

### Mitä EI salata

Suorituskykysyistä seuraavat tiedot tallennetaan selväkielisinä:

- Palveluntarjoajien näyttönimet
- Mallimääritykset (jo valmiiksi julkisia)
- Reitityssäännöt
- Käyttötiedot (ei henkilötietoja)

---

## Salauksen huomioitavat seikat (v3.8.16+)

OmniRoute käsittelee kahta salausmenetelmää läpinäkyvästi **`migrateLegacyEncryptedString()`**-funktion avulla:

- **Vanha** (ennen versiota v3.5.0): XOR-pohjainen ”salaus” (ei oikeaa kryptografiaa)
- **Nykyinen**: AES-256-GCM asianmukaisella alustusvektorilla (IV) ja todennustunnisteella

Siirtoapufunktio tunnistaa vanhan muodon ja salaa tiedot uudelleen uudella menetelmällä ensimmäisellä lukukerralla. Näin vanhan tietokannan voi päivittää menettämättä tunnistetietoja.

---

## Lukuvälimuisti

Usein luettaville tiedoille (mallit, palveluntarjoajat, asetukset) `readCache.ts` tarjoaa **muistissa olevan välimuistin**:

```ts
// Tallennetaan välimuistiin käynnistyksen yhteydessä, mitätöidään kirjoitettaessa
const providers = await getCachedProviders(); // Nopea, muistissa
const fresh = await listProviders(); // Hidas, käyttää tietokantaa
```

| Välimuistiin tallennettu entiteetti | Välimuistiavain | TTL                |
| ----------------------------------- | --------------- | ------------------ |
| `models`                            | `models:v1`     | Kirjoitukseen asti |
| `provider_connections`              | `providers:v1`  | Kirjoitukseen asti |
| `settings`                          | `settings:v1`   | Kirjoitukseen asti |
| `combos`                            | `combos:v1`     | Kirjoitukseen asti |

Välimuisti mitätöidään aina, kun vastaavaan tauluun kirjoitetaan.

---

## Varmuuskopiointi ja palautus

### Manuaalinen varmuuskopiointi

```bash
# Luo paikallinen varmuuskopio komentoriviliittymällä
omniroute backup create --name pre-migration

# Tai ohjelmointirajapinnan kautta
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Varmuuskopiotiedosto sisältää:

- Kaikki tietokantataulut (sarjallistettuina JSON-muotoon)
- Kutsulokin artefaktit (base64-koodattuina, valinnainen)
- Asetukset ja salaisuudet (salattuina)
- Liitännäisten määritykset

### Palautus

```bash
# Komentoriviliittymän kautta
omniroute restore pre-migration

# Ohjelmointirajapinnan kautta
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Varoitus**: Palautus korvaa koko tietokannan. Pysäytä ensin kaikki asiakasohjelmat.

### Automaattiset varmuuskopiot

```bash
# Ota automaattiset päivittäiset varmuuskopiot käyttöön komentoriviliittymällä
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ajastus suoritetaan palvelimella taustatyönä, joka käynnistyy 30 sekunnin välein
(oletusarvo) ja arvioi cron-lausekkeen palvelimen paikallisen ajan perusteella.

| Muuttuja                                    | Oletusarvo | Kuvaus                                                                                                                                    |
| ------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`    | Käynnistysväli millisekunteina (vähintään `5000`). Sen on oltava alle 60 s, jotta suoritus osuu luotettavasti vastaavaan cron-minuuttiin. |

### Aktiivisen SQLite-tietokannan varmuuskopiointi

Käynnissä olevan tietokannan varmuuskopiointi ilman käyttökatkoa:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Tämä käyttää SQLiten verkossa toimivaa varmuuskopiointirajapintaa — komento voidaan suorittaa turvallisesti OmniRouten ollessa käynnissä.

---

## Suorituskyvyn optimointi

### WAL-tila

WAL on oletusarvoisesti käytössä. Paljon kirjoituksia sisältävissä kuormissa kannattaa harkita seuraavia asetuksia:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Tarkistuspiste 1000 sivun välein
PRAGMA journal_size_limit = 67108864;  -- WAL-tiedoston enimmäiskoko 64 Mt
```

### Indeksit

Suorituskyvyn kannalta keskeiset indeksit (migraatiot luovat ne automaattisesti):

- `idx_models_provider` — mallien haut palveluntarjoajan mukaan
- `idx_combo_targets_combo_id` — yhdistelmäkohteiden laajennus
- `idx_usage_history_api_key_timestamp` — käyttöanalytiikka
- `idx_quota_snapshots_api_key_window` — kiintiöiden seuranta
- `idx_call_logs_timestamp` — kutsulokikyselyt

Lisää uusi indeksi luomalla migraatio:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Muistikartoitettu I/O

Erittäin suurissa tietokannoissa (>10 Gt) muistikartoitusta voidaan säätää SQLite-pragmalla:

```sql
-- Aseta SQLite-pragmalla (säädä tiedostossa core.ts tai ajonaikaisesti)
PRAGMA mmap_size = 268435456;  -- 256 Mt
```

### Tiivistäminen

Pitkään käynnissä olevat OmniRoute-instanssit hyötyvät ajoittaisesta `VACUUM`-komennon suorittamisesta:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Suorita se kuukausittain vähäisen liikenteen ajankohtina. (WAL-tila vähentää tarvetta, mutta ei poista sitä.)

---

## Kuntotarkistus

`src/lib/db/healthCheck.ts` tarjoaa **tietokantatason kuntodiagnostiikan**:

Molemmat HTTP-metodit edellyttävät todennusta (muussa tapauksessa `401`). `GET` suorittaa vain diagnostiikan; `POST` suorittaa
saman tarkistuksen siten, että `autoRepair` on käytössä.

```bash
GET  /api/db/health   # diagnosoi
POST /api/db/health   # diagnosoi + korjaa
```

Vastauksena palautetaan `runDbHealthCheck()`-funktion tuottama `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Toimialueiden budjetit viittasivat API-avaimiin, joita ei enää ole olemassa.",
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

| Kenttä            | Merkitys                                                                                                                                                          |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true`, kun `issues` on tyhjä. `driver` ei koskaan vaikuta siihen.                                                                                                |
| `issues[].type`   | Jokin seuraavista: `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                               |
| `repairedCount`   | Tämän suorituksen aikana korjattujen rivien määrä; aina `0`, kun `autoRepair` on epätosi.                                                                         |
| `backupCreated`   | Ilmaisee, luotiinko varmuuskopio ennen korjaamista.                                                                                                               |
| `checkedAt`       | ISO-aikaleima, jota käyttävät sekä suoritus että sen mahdollisesti kirjoittama korjausmerkintä.                                                                   |
| `driver.name`     | Tarkistettua tietokantaa palveleva SQLite-ajuri.                                                                                                                  |
| `driver.degraded` | `true`, kun kirjoituksia ei tallenneta kestävästi tietokantatiedostoon — `sql.js`-WASM-varajärjestelmä (koko tiedoston tallennus) tai muistissa oleva tietokanta. |

Saman tietosisällön palauttaa MCP-työkalu `omniroute_db_health_check`.

Havaitse vioittuminen suorittamalla `PRAGMA integrity_check`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Tulosteen pitäisi olla: ok
```

Jos se palauttaa jotain muuta kuin `ok`, **lopeta tietokannan käyttäminen välittömästi** ja palauta se varmuuskopiosta.

---

## Palautuminen häiriötilanteista

### Skenaario 1: WAL-tiedosto on kadonnut

`-wal`-tiedosto puuttuu, mutta `-shm`-tiedosto ja päätietokanta ovat ehjiä:

```bash
# Palautuu automaattisesti seuraavan avaamisen yhteydessä
omniroute
```

Jos SQLite ei pysty palautumaan automaattisesti:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Skenaario 2: Päätietokantatiedosto on vioittunut

Palauta varmuuskopiosta:

```bash
omniroute sync pull --merge   # tai: omniroute backup restore <backup-id>
```

### Skenaario 3: Salausavain on kadonnut

**Palautuminen ei ole mahdollista** ilman avainta. Salattuja kenttiä ei voida lukea. Lisää kaikki palveluntarjoajat uudelleen manuaalisesti uusilla tunnistetiedoilla.

> **Varotoimi**: Varmuuskopioi salausavain aina erikseen, mieluiten salasanojen hallintasovellukseen tai KMS-järjestelmään.

### Skenaario 4: Levy on täynnä

SQLite palauttaa `SQLITE_FULL`-virheitä. Vapauta levytilaa ja suorita sitten:

```bash
# Tee WAL-tarkistuspiste tilan vapauttamiseksi
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Yleiset toiminnot

### Taulun tarkasteleminen

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Kaikkien taulujen rivien laskeminen

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Kaikkien tietojen nollaaminen (poistaminen)

```bash
# Pysäytä ensin OmniRoute
omniroute stop

# Poista tietokantatiedosto
rm ~/.omniroute/storage.sqlite*

# Käynnistä uudelleen (tyhjä tietokanta luodaan uudelleen)
omniroute
```

**Valikoiva** nollaus (säilytä palveluntarjoajat, poista käyttötiedot):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Yksittäisen taulun vieminen

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Vianmääritys

### "Tietokanta on lukittu"

Toinen prosessi pitää kirjoituslukkoa. Voit joko:

- Odottaa toisen prosessin valmistumista (tarkista komennolla `lsof | grep storage.sqlite`)
- Lopettaa toisen prosessin
- Käynnistää OmniRouten uudelleen, jos ongelma jatkuu

### "Viiteavainrajoite epäonnistui"

Toimialuemoduuli rikkoo viite-eheyttä. Tarkista:

- Riippuvien taulujen orvot rivit
- Ketjutetut poistot, jotka eivät välittyneet
- Viimeaikainen migraatio, joka muutti viiteavainta

Etsi rikkomukset suorittamalla `PRAGMA foreign_key_check;`.

### "Muisti loppui"

SQLiten muistikartoitettu I/O ylittää käyttöjärjestelmän rajoituksen. Pienennä määrää SQLite-pragmalla:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB 256MB:n sijaan
```

Tai poista käytöstä:

```sql
PRAGMA mmap_size = 0;
```

### "Migraatio epäonnistui kesken suorituksen"

Migraatio suoritettiin transaktiossa, joten sen olisi pitänyt palautua alkuperäiseen tilaan. Jos näin ei tapahtunut:

1. **Pysäytä OmniRoute** (estä uudet yritykset)
2. **Tarkista tietokannan tila** komennolla `sqlite3`
3. **Korjaa osittainen migraatio manuaalisesti**
4. **Käynnistä OmniRoute uudelleen** (migraatiota yritetään uudelleen)

Voit estää tämän testaamalla migraatiot aina ensin kopiolla.

---

## Katso myös

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — käyttötaulut
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — toimintakunnon valvonta
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — julkaisuprosessi
- Lähdekoodi: `src/lib/db/` (yli 80 tiedostoa, noin 25 000 koodiriviä)
