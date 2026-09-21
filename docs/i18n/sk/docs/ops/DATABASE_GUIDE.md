# Database Schema & Operations Guide (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute používa ako primárne úložisko **SQLite so žurnálovaním WAL** a pre citlivé polia používa **AES-256-GCM** šifrovanie uložených údajov. Táto príručka sa zaoberá schémou, migráciami, zálohovaním/obnovou a prevádzkovými postupmi.

**Zdroje:**

- `src/lib/db/core.ts` — jediná inštancia + SCHEMA_SQL (17 základných tabuliek)
- `src/lib/db/migrationRunner.ts` — verzované migrácie
- `src/lib/db/migrations/` — 167 verzovaných súborov SQL
- `src/lib/db/encryption.ts` — pomocné funkcie na šifrovanie
- `src/lib/db/backup.ts` — export/import záloh
- `src/lib/db/healthCheck.ts` — diagnostika stavu

---

## Prečo SQLite?

OmniRoute si namiesto PostgreSQL/MySQL zvolil SQLite z niekoľkých dôvodov:

| Faktor              | SQLite                                                | PostgreSQL                                      |
| ------------------- | ----------------------------------------------------- | ----------------------------------------------- |
| **Nasadenie**       | Vstavané — bez samostatného servera                   | Vyžaduje nastavenie servera                     |
| **Šifrovanie**      | Na aplikačnej vrstve (AES-256-GCM)                    | Vstavané TDE                                    |
| **Výkon**           | Rýchlejšie pri malých/stredných pracovných záťažiach  | Lepšie pri obrovskom množstve súbežných zápisov |
| **Súbežnosť**       | Režim WAL umožňuje súbežné čítanie                    | Plné MVCC                                       |
| **Zálohovanie**     | Kopírovanie jedného súboru                            | `pg_dump` alebo snímka súborového systému       |
| **Prípad použitia** | Inštalácia pre jedného používateľa, vstavané použitie | SaaS s viacerými nájomníkmi                     |

Pre nasadenia s **jedným používateľom a jednou inštanciou** (primárny prípad použitia OmniRoute) je SQLite jednoduchšie a rýchlejšie.

### Žurnálovanie WAL

`core.ts` otvára databázu v **režime WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL umožňuje **súbežné čítanie** počas zápisov — čo je dôležité pre ovládací panel, ktorý vykonáva dotazy počas zaznamenávania požiadaviek.

Predvolená veľkosť vyrovnávacej pamäte je **65 536 KiB (64 MiB)**. SQLite interpretuje zápornú hodnotu
`cache_size` ako približnú hornú hranicu v KiB a stránky prideľuje podľa potreby.
Nastavenie **Nastavenia > Systém a úložisko > Veľkosť vyrovnávacej pamäte** prijíma celé čísla od **1 do
1 000 000 KiB**; uložením nastavenia sa táto hodnota použije pre aktívne databázové pripojenie
a OmniRoute pri spustení obnoví uloženú hodnotu.

---

## Umiestnenie databázy

Súbor SQLite je uložený na tomto mieste:

| OS      | Cesta                                                                    |
| ------- | ------------------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                            |
| macOS   | `~/.omniroute/storage.sqlite`                                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                                |
| Docker  | `/app/data/storage.sqlite` (konfigurovateľné prostredníctvom `DATA_DIR`) |

Sprievodné súbory:

- `storage.sqlite-wal` — denník predbežného zápisu
- `storage.sqlite-shm` — súbor zdieľanej pamäte
- `call_logs/` — artefakty dát požiadaviek (ak sú povolené)

**Zmena umiestnenia:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Architektúra doménových modulov

Databáza OmniRoute má v adresári `src/lib/db/` **110 TypeScript modulov najvyššej úrovne**. Každý doménový modul:

- Spravuje jednu alebo viac konkrétnych tabuliek
- Exportuje typované CRUD funkcie
- Nikdy nepristupuje k tabuľkám iného modulu
- Používa `getDbInstance()` z `core.ts` na prístup k DB

### 110 DB modulov najvyššej úrovne

OmniRoute má v adresári `src/lib/db/` **110 TypeScript súborov najvyššej úrovne**. Nižšie je uvedená ukážka základných modulov; úplný zoznam nájdete vo výpise adresára:

| Modul                   | Tabuľky                                                        | Zodpovednosť                                                                          |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Registrácia poskytovateľov prostredníctvom OAuth/API kľúča a prihlasovacie údaje      |
| `models.ts`             | `key_value` (údaje modelov)                                    | Definície modelov, možnosti, ceny                                                     |
| `combos.ts`             | `combos`                                                       | Konfigurácie kombinovaného smerovania a poradie                                       |
| `apiKeys.ts`            | `api_keys`                                                     | Životný cyklus API kľúčov, rozsahy oprávnení, sledovanie kvót                         |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfigurácia systému a zdieľané úložisko KV                                           |
| `backup.ts`             | —                                                              | Operácie exportu/importu záloh                                                        |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfigurácie proxy serverov a pravidlá smerovania                                     |
| `prompts.ts`            | `prompt_templates`                                             | Opakovane použiteľné šablóny promptov, správa verzií                                  |
| `webhooks.ts`           | `webhooks`                                                     | Odbery webhookov riadené udalosťami a protokoly                                       |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Protokolovanie auditu jednotlivých požiadaviek (voliteľné, veľký objem)               |
| `domainState.ts`        | `domain_*` (5 tabuliek)                                        | Doménové rozpočty, ističe, blokovania, reťazce náhradných možností, história nákladov |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Povolené API kľúče pre MCP/A2A                                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historické využitie kvót                                                              |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapovanie modelov na predvolené kombinácie                                            |
| `cliToolState.ts`       | `cli_tool_state`                                               | Trvalý stav špecifický pre CLI                                                        |
| `encryption.ts`         | —                                                              | Pomocné funkcie na šifrovanie/dešifrovanie polí                                       |
| `readCache.ts`          | —                                                              | Vyrovnávacia pamäť v pamäti pre operácie s častým čítaním                             |
| `secrets.ts`            | `key_value` (šifrované záznamy)                                | Úložisko šifrovaných tajných údajov                                                   |
| `stateReset.ts`         | —                                                              | Vymazanie/resetovanie stavu DB na testovanie                                          |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kontext relácie na odovzdanie medzi agentmi                                           |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Sledovanie využitia                                                                   |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfigurácia kompresie                                                                |

### Hranice modulov

Základné architektonické pravidlo: **moduly nepristupujú priamo k tabuľkám iných modulov**. Ak chcete pracovať s údajmi iného modulu, importujte funkciu z daného modulu.

```ts
// ❌ NESPRÁVNE: priamy SQL prístup z iného modulu
db.prepare("SELECT * FROM provider_connections").all();

// ✅ SPRÁVNE: použite funkciu modulu providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Dodržiavanie tohto pravidla sa kontroluje pri revízii kódu — neexistuje žiadna statická kontrola, no porušenia sú označené.

---

## Základná schéma (17 tabuliek)

`core.ts` definuje 17 základných tabuliek v `SCHEMA_SQL`. Vytvára ich migrácia `001_initial_schema.sql` a tvoria jadro schémy.

### Základné tabuľky (vytvorené v úvodnej migrácii)

| Tabuľka                    | Účel                                          | Kľúčové stĺpce                                                          |
| -------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Prihlasovacie údaje poskytovateľa (šifrované) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informácie o smerovaní uzlov poskytovateľa    | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Všeobecné úložisko KV                         | `namespace`, `key`, `value`                                             |
| `combos`                   | Definície kombinácií smerovania               | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Kľúče API pre bránu                           | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadáta databázy                             | `key`, `value`                                                          |
| `usage_history`            | Záznamy o využití požiadaviek                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Dáta požiadaviek a odpovede                   | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Záznamy požiadaviek proxy                     | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Reťazce modelov a poskytovateľov              | `model`, `chain`                                                        |
| `domain_budgets`           | Rozpočty výdavkov pre jednotlivé domény       | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | História obnovení rozpočtov                   | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Sledovanie nákladov podľa domény              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stav obmedzenia frekvencie pre doménu         | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stav ističa pre jednotlivé domény             | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Vyrovnávacia pamäť odpovedí LLM               | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Historické snímky kvót                        | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Ďalšie tabuľky (pridané neskoršími migráciami)

Nasledujúce migrácie pridávajú tabuľky, ako napríklad:

- `cli_tool_state` (migrácia 011) — stav nástroja CLI
- tabuľky `mcp_*` — audit servera MCP
- tabuľky `a2a_*` — stav úloh A2A
- tabuľky `usage_*` — sledovanie využitia
- tabuľky `plugin_*` — systém doplnkov
- `skill_executions` — história vykonávania zručností
- tabuľky `memory_*` — pamäťový systém
- tabuľky `compression_*` — systém kompresie
- tabuľky `webhook_*` — záznam doručovania webhookov
- tabuľky `acp_*` — Agent Client Protocol
- tabuľky `oneproxy_*` — trhovisko 1proxy
- `proxy_assignments` — väzby rozsahov proxy
- `detailed_call_artifacts` — metadáta artefaktov záznamov volaní
- `quota_alert_history` — audit upozornení na kvóty
- `command_code_auth_sessions` — relácie OAuth pre Command Code

Úplný zoznam viac ako 30 tabuliek sa nachádza v `src/lib/db/migrations/`.

---

## Migrácie

OmniRoute používa **verziované, idempotentné migrácie** v `src/lib/db/migrations/`. Každá migrácia je jeden SQL súbor s názvom `NNN_description.sql`.

### Pomenovanie migrácií

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Ako sa migrácie spúšťajú

Pri spustení `migrationRunner.ts`:

1. Vytvorí tabuľku `_omniroute_migrations`, ak neexistuje
2. Zistí už aplikované migrácie
3. Postupne aplikuje všetky nové migrácie, pričom každú vykoná v transakcii
4. Zaznamená každú aplikovanú migráciu spolu s časovou pečiatkou

```ts
// src/lib/db/migrationRunner.ts (zjednodušené)
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

### Idempotentnosť

Migrácie musia byť **idempotentné** — ich druhé spustenie by nemalo vykonať žiadnu operáciu:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Vo veľkej miere používajte klauzuly `IF NOT EXISTS`, `IF EXISTS` a `OR IGNORE` / `OR REPLACE`.

### Pridanie novej migrácie

1. **Zistite nasledujúce číslo**: `ls src/lib/db/migrations/ | tail -1`
2. **Vytvorte súbor**: `NNN_my_change.sql`
3. **Používajte bezpečné DDL**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Opatrne doplňte údaje**: na spracovanie existujúcich riadkov použite `UPDATE ... WHERE ...`
5. **Testujte na kópii**: nikdy nespúšťajte neotestované migrácie v produkcii

Príklad:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Spätne nekompatibilné zmeny** (napr. odstraňovanie stĺpcov) sú komplikované. OmniRoute NEPODPORUJE prechod na staršiu verziu — po aplikovaní migrácie je zmena schémy trvalá. Plánujte podľa toho.

---

## Šifrovanie uložených údajov

Citlivé polia (API kľúče, OAuth tokeny, reťazce pripojenia) sú pri uložení šifrované pomocou **AES-256-GCM**.

### Ako to funguje

```ts
// src/lib/db/encryption.ts (zjednodušené)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Kde sa používa

- `provider_connections.api_key` — šifrované na aplikačnej úrovni
- `provider_connections.access_token`, `refresh_token`, `id_token` — šifrované na aplikačnej úrovni
- Položky `key_value` s `namespace = "secrets"` — šifrované na aplikačnej úrovni
- `proxy_registry.auth` — šifrované na aplikačnej úrovni (ak je prítomné)

### Šifrovací kľúč

Šifrovací kľúč sa odvodzuje z **prístupovej frázy** (nastavenej prostredníctvom premennej prostredia `STORAGE_ENCRYPTION_KEY`) a **soli** (uloženej v databáze). Na dešifrovanie údajov sú potrebné obe.

```bash
# Vygenerovanie bezpečnej prístupovej frázy
openssl rand -hex 32

# Nastavenie v .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritické**: Strata šifrovacieho kľúča znamená stratu prístupu ku všetkým zašifrovaným údajom. **Kľúč zálohujte oddelene od databázy**.

### Čo NIE JE šifrované

Z dôvodu výkonu sa nasledujúce údaje ukladajú ako obyčajný text:

- Zobrazované názvy poskytovateľov
- Definície modelov (už sú verejné)
- Pravidlá smerovania
- Záznamy o používaní (bez osobných identifikačných údajov)

---

## Upozornenia k šifrovaniu (v3.8.16+)

OmniRoute používa **`migrateLegacyEncryptedString()`** na transparentné spracovanie dvoch schém šifrovania:

- **Pôvodná** (pred v3.5.0): „šifrovanie“ založené na XOR (nejde o skutočnú kryptografiu)
- **Aktuálna**: AES-256-GCM so správnym IV a autentifikačným tagom

Pomocná funkcia migrácie rozpozná pôvodný formát a pri prvom načítaní údaje znova zašifruje pomocou novej schémy. To znamená, že môžete aktualizovať starú databázu bez straty prihlasovacích údajov.

---

## Vyrovnávacia pamäť na čítanie

Pre často načítavané údaje (modely, poskytovateľov, nastavenia) poskytuje `readCache.ts` **vyrovnávaciu pamäť v operačnej pamäti**:

```ts
// Uložené do vyrovnávacej pamäte pri spustení, zneplatnené pri zápise
const providers = await getCachedProviders(); // Rýchle, z operačnej pamäte
const fresh = await listProviders(); // Pomalé, pristupuje k DB
```

| Entita vo vyrovnávacej pamäti | Kľúč vyrovnávacej pamäte | TTL       |
| ----------------------------- | ------------------------ | --------- |
| `models`                      | `models:v1`              | Do zápisu |
| `provider_connections`        | `providers:v1`           | Do zápisu |
| `settings`                    | `settings:v1`            | Do zápisu |
| `combos`                      | `combos:v1`              | Do zápisu |

Vyrovnávacia pamäť sa zneplatní pri každom zápise do príslušnej tabuľky.

---

## Zálohovanie a obnova

### Manuálne zálohovanie

```bash
# Na vytvorenie lokálnej zálohy použite CLI
omniroute backup create --name pre-migration

# Alebo prostredníctvom API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Súbor zálohy obsahuje:

- Všetky tabuľky DB (serializované do formátu JSON)
- Artefakty protokolov volaní (kódované pomocou base64, voliteľné)
- Nastavenia + tajné údaje (šifrované)
- Konfiguráciu doplnkov

### Obnova

```bash
# Prostredníctvom CLI
omniroute restore pre-migration

# Prostredníctvom API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Upozornenie**: Obnova prepíše celú DB. Najskôr zastavte všetkých klientov.

### Automatizované zálohy

```bash
# Povoľte automatizované denné zálohy prostredníctvom CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Plán vykonáva na strane servera úloha na pozadí, ktorá sa spúšťa každých 30 sekúnd
(predvolene) a vyhodnocuje výraz cron podľa lokálneho času servera.

| Premenná                                    | Predvolená hodnota | Popis                                                                                                                 |
| ------------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`            | Interval spúšťania v ms (min. `5000`). Musí byť kratší ako 60 s, aby spoľahlivo spadal do zodpovedajúcej minúty cron. |

### Aktívna záloha SQLite

Na vytvorenie zálohy aktívnej DB bez odstávky:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Používa sa rozhranie API SQLite na online zálohovanie — príkaz je bezpečné spustiť aj počas prevádzky OmniRoute.

---

## Ladenie výkonu

### Režim WAL

WAL je predvolene povolený. Pri pracovných záťažiach s vysokým počtom zápisov zvážte:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Kontrolný bod každých 1000 strán
PRAGMA journal_size_limit = 67108864;  -- Limit WAL 64 MB
```

### Indexy

Kľúčové indexy na zvýšenie výkonu (automaticky vytvárané migráciami):

- `idx_models_provider` — vyhľadávanie modelov podľa poskytovateľa
- `idx_combo_targets_combo_id` — rozšírenie cieľov kombinácie
- `idx_usage_history_api_key_timestamp` — analýza používania
- `idx_quota_snapshots_api_key_window` — sledovanie kvót
- `idx_call_logs_timestamp` — dotazy na záznamy volaní

Ak chcete pridať nový index, vytvorte migráciu:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Pamäťovo mapovaný vstup/výstup

Pri veľmi veľkých databázach (>10 GB) možno pamäťové mapovanie upraviť pomocou príkazu pragma systému SQLite:

```sql
-- Nastavte pomocou príkazu pragma systému SQLite (upravte v core.ts alebo počas behu)
PRAGMA mmap_size = 268435456;  -- 256 MB
```

### Kompaktácia

Dlhodobo bežiacim inštanciám OmniRoute prospieva občasné použitie príkazu `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Spúšťajte ho raz mesačne v čase nízkej prevádzky. (Režim WAL znižuje túto potrebu, ale neodstraňuje ju.)

---

## Kontrola stavu

`src/lib/db/healthCheck.ts` poskytuje **diagnostiku stavu na úrovni databázy**:

Obe metódy vyžadujú autentifikáciu (inak sa vráti `401`). `GET` vykonáva iba diagnostiku; `POST` spustí
rovnakú kontrolu s povolenou možnosťou `autoRepair`.

```bash
GET  /api/db/health   # diagnostika
POST /api/db/health   # diagnostika + oprava
```

Odpoveďou je `DbHealthCheckResult` vytvorený funkciou `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Rozpočty domén odkazovali na kľúče API, ktoré už neexistujú.",
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

| Pole              | Význam                                                                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Má hodnotu `true`, keď je `issues` prázdne. `driver` túto hodnotu nikdy neovplyvňuje.                                                                            |
| `issues[].type`   | Jedna z hodnôt `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                  |
| `repairedCount`   | Počet riadkov opravených počas tohto spustenia; vždy `0`, keď má `autoRepair` hodnotu false.                                                                     |
| `backupCreated`   | Určuje, či bola pred opravou vytvorená záloha.                                                                                                                   |
| `checkedAt`       | Časová pečiatka ISO spoločná pre spustenie a všetky poznámky o oprave, ktoré sa pri ňom zapíšu.                                                                  |
| `driver.name`     | Ovládač SQLite obsluhujúci kontrolovanú databázu.                                                                                                                |
| `driver.degraded` | Má hodnotu `true`, keď zápisy nie sú trvalo zálohované databázovým súborom — záložný ovládač `sql.js` WASM (perzistencia celého súboru) alebo databáza v pamäti. |

Rovnakú dátovú štruktúru vracia nástroj MCP `omniroute_db_health_check`.

Spustením `PRAGMA integrity_check` zistíte poškodenie:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Výstup by mal byť: ok
```

Ak príkaz vráti čokoľvek iné ako `ok`, **okamžite prestaňte databázu používať** a obnovte ju zo zálohy.

---

## Obnova po havárii

### Scenár 1: Strata súboru WAL

Súbor `-wal` chýba, ale súbor `-shm` a hlavná databáza sú neporušené:

```bash
# Automaticky sa obnoví pri ďalšom otvorení
omniroute
```

Ak SQLite nedokáže vykonať automatickú obnovu:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Scenár 2: Poškodenie súboru hlavnej databázy

Obnovte databázu zo zálohy:

```bash
omniroute sync pull --merge   # alebo: omniroute backup restore <backup-id>
```

### Scenár 3: Strata šifrovacieho kľúča

Bez kľúča **nie je možná žiadna obnova**. Šifrované polia sú nečitateľné. Manuálne znova pridajte všetkých poskytovateľov s novými prihlasovacími údajmi.

> **Zmiernenie rizika**: Šifrovací kľúč vždy zálohujte samostatne, ideálne v správcovi hesiel alebo v KMS.

### Scenár 4: Plný disk

SQLite bude vracať chyby `SQLITE_FULL`. Uvoľnite miesto na disku a potom vykonajte:

```bash
# Vytvorenie kontrolného bodu WAL na uvoľnenie miesta
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Bežné operácie

### Kontrola tabuľky

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Spočítanie riadkov vo všetkých tabuľkách

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Obnovenie (vymazanie) všetkých údajov

```bash
# Najprv zastavte OmniRoute
omniroute stop

# Odstráňte súbor databázy
rm ~/.omniroute/storage.sqlite*

# Reštartujte aplikáciu (znova vytvorí prázdnu databázu)
omniroute
```

Pre **selektívne** obnovenie (zachovanie poskytovateľov, vymazanie údajov o používaní):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Export jednej tabuľky

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Riešenie problémov

### „Databáza je uzamknutá“

Iný proces drží zámok na zápis. Môžete:

- Počkať, kým sa druhý proces dokončí (skontrolujte pomocou `lsof | grep storage.sqlite`)
- Ukončiť druhý proces
- Ak problém pretrváva, reštartovať OmniRoute

### „Obmedzenie cudzieho kľúča zlyhalo“

Doménový modul porušuje referenčnú integritu. Skontrolujte:

- Osirelé riadky v závislých tabuľkách
- Kaskádové odstránenia, ktoré sa nepropagovali
- Nedávnu migráciu, ktorá zmenila cudzí kľúč

Spustením `PRAGMA foreign_key_check;` vyhľadajte porušenia.

### „Nedostatok pamäte“

Pamäťovo mapované I/O databázy SQLite prekračuje limit operačného systému. Znížte ho pomocou príkazu pragma databázy SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB namiesto 256MB
```

Alebo ho zakážte:

```sql
PRAGMA mmap_size = 0;
```

### „Migrácia zlyhala v priebehu vykonávania“

Migrácia prebehla v transakcii, preto by sa mala vrátiť späť. Ak sa tak nestalo:

1. **Zastavte OmniRoute** (zabránite ďalším pokusom)
2. **Skontrolujte stav databázy** pomocou `sqlite3`
3. **Manuálne opravte** čiastočne vykonanú migráciu
4. **Znova spustite** OmniRoute (migrácia sa zopakuje)

Aby ste tomu predišli, migrácie vždy najprv otestujte na kópii.

---

## Pozrite tiež

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabuľky používania
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitorovanie stavu
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — proces vydania
- Zdroj: `src/lib/db/` (viac ako 80 súborov, približne 25-tisíc riadkov kódu)
