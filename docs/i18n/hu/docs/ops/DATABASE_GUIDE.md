# Database Schema & Operations Guide (Magyar)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: Az OmniRoute elsődleges adattárként **WAL naplózást használó SQLite-ot** alkalmaz, az érzékeny mezők nyugalmi állapotú titkosításához pedig **AES-256-GCM** titkosítást használ. Ez az útmutató az adatbázissémát, a migrációkat, a biztonsági mentést és helyreállítást, valamint az üzemeltetési eljárásokat ismerteti.

**Források:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 alaptábla)
- `src/lib/db/migrationRunner.ts` — verziózott migrációk
- `src/lib/db/migrations/` — 167 verziózott SQL-fájl
- `src/lib/db/encryption.ts` — titkosítási segédfüggvények
- `src/lib/db/backup.ts` — biztonsági mentések exportálása/importálása
- `src/lib/db/healthCheck.ts` — állapotdiagnosztika

---

## Miért SQLite?

Az OmniRoute több okból választotta a SQLite-ot a PostgreSQL/MySQL helyett:

| Szempont               | SQLite                                      | PostgreSQL                                  |
| ---------------------- | ------------------------------------------- | ------------------------------------------- |
| **Telepítés**          | Beágyazott — nem igényel külön kiszolgálót  | Kiszolgáló beállítását igényli              |
| **Titkosítás**         | Alkalmazási rétegben (AES-256-GCM)          | Beépített TDE                               |
| **Teljesítmény**       | Gyorsabb kis/közepes terhelés esetén        | Jobb nagy mennyiségű párhuzamos írás esetén |
| **Párhuzamosság**      | A WAL mód párhuzamos olvasást tesz lehetővé | Teljes MVCC                                 |
| **Biztonsági mentés**  | Egyetlen fájl másolása                      | `pg_dump` vagy fájlrendszer-pillanatkép     |
| **Felhasználási eset** | Felhasználónkénti telepítés, beágyazott     | Több-bérlős SaaS                            |

Az **egyfelhasználós, egypéldányos** telepítésekhez (az OmniRoute elsődleges felhasználási módjához) a SQLite egyszerűbb és gyorsabb.

### WAL-naplózás

A `core.ts` **WAL (Write-Ahead Logging) módban** nyitja meg az adatbázist:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

A WAL írás közben is lehetővé teszi a **párhuzamos olvasást** — ez fontos az irányítópult számára, amely lekérdezéseket hajt végre a kérések rögzítése közben.

Az alapértelmezett gyorsítótárméret **65 536 KiB (64 MiB)**. A SQLite a negatív
`cache_size` értéket megközelítő felső korlátként értelmezi KiB-ban, és igény szerint foglal le lapokat.
A **Beállítások > Rendszer és tárhely > Gyorsítótár mérete** mező **1 és
1 000 000 KiB** közötti egész értékeket fogad el; a beállítás mentése alkalmazza azt az élő adatbázis-kapcsolatra,
az OmniRoute pedig indításkor visszaállítja a megőrzött értéket.

---

## Az adatbázis helye

A SQLite-fájl tárolási helye:

| Operációs rendszer | Elérési út                                                            |
| ------------------ | --------------------------------------------------------------------- |
| Linux              | `~/.omniroute/storage.sqlite`                                         |
| macOS              | `~/.omniroute/storage.sqlite`                                         |
| Windows            | `%USERPROFILE%\.omniroute\storage.sqlite`                             |
| Docker             | `/app/data/storage.sqlite` (a `DATA_DIR` segítségével konfigurálható) |

Kapcsolódó fájlok:

- `storage.sqlite-wal` — előreírási napló
- `storage.sqlite-shm` — megosztottmemória-fájl
- `call_logs/` — kérések hasznos adatait tartalmazó melléktermékek (ha engedélyezve van)

**A hely felülbírálása:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Tartományi modularchitektúra

Az OmniRoute adatbázisa **110 legfelső szintű TypeScript-modult** tartalmaz a `src/lib/db/` könyvtárban. Minden tartományi modul:

- Egy vagy több konkrét táblát kezel
- Típusbiztos CRUD-függvényeket exportál
- Soha nem fér hozzá más modulok tábláihoz
- A `core.ts` fájlból származó `getDbInstance()` függvényt használja az adatbázis eléréséhez

### A 110 legfelső szintű adatbázismodul

Az OmniRoute **110 legfelső szintű TypeScript-fájlt** tartalmaz a `src/lib/db/` könyvtárban. Az alábbiakban az alapvető modulokból látható egy válogatás; a teljes lista a könyvtár tartalomjegyzékében található:

| Modul                   | Táblák                                                         | Felelősségi kör                                                                         |
| ----------------------- | -------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Szolgáltatók regisztrációja és hitelesítő adatai OAuth/API-kulcs alapján                |
| `models.ts`             | `key_value` (modelladatok)                                     | Modelldefiníciók, képességek, árazás                                                    |
| `combos.ts`             | `combos`                                                       | Kombinált útválasztási konfigurációk és sorrend                                         |
| `apiKeys.ts`            | `api_keys`                                                     | API-kulcsok életciklusa, hatókörei és kvótakövetése                                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Rendszerkonfiguráció és megosztott kulcs-érték-tároló                                   |
| `backup.ts`             | —                                                              | Biztonsági mentések exportálási/importálási műveletei                                   |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxykonfigurációk és útválasztási szabályok                                            |
| `prompts.ts`            | `prompt_templates`                                             | Újrafelhasználható prompt-sablonok és verziókezelés                                     |
| `webhooks.ts`           | `webhooks`                                                     | Eseményvezérelt webhook-feliratkozások és naplók                                        |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Kérésenkénti auditnaplózás (opcionális, nagy adatmennyiségű)                            |
| `domainState.ts`        | `domain_*` (5 tábla)                                           | Tartományi keretek, áramkör-megszakítók, kizárások, tartalékláncok és költségelőzmények |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Engedélyezési listán szereplő API-kulcsok az MCP/A2A számára                            |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Korábbi kvótahasználat                                                                  |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Modellek hozzárendelése alapértelmezett kombinációkhoz                                  |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-specifikus állandó állapot                                                          |
| `encryption.ts`         | —                                                              | Segédfüggvények mezők titkosításához/visszafejtéséhez                                   |
| `readCache.ts`          | —                                                              | Memórián belüli gyorsítótár az olvasásintenzív műveletekhez                             |
| `secrets.ts`            | `key_value` (titkosított bejegyzések)                          | Titkosított bizalmasadat-tárolás                                                        |
| `stateReset.ts`         | —                                                              | Az adatbázis-állapot törlése/visszaállítása teszteléshez                                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Munkamenet-környezet az ügynökátadáshoz                                                 |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Használatkövetés                                                                        |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Tömörítési konfiguráció                                                                 |

### Modulhatárok

Alapvető architekturális szabály: **a modulok nem férnek hozzá közvetlenül egymás tábláihoz**. Egy másik modul adatainak használatához az adott modul függvényét kell importálni.

```ts
// ❌ HELYTELEN: közvetlen SQL-lekérdezés egy másik modulból
db.prepare("SELECT * FROM provider_connections").all();

// ✅ HELYES: a providers modul függvényének használata
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Ezt a szabályt kódellenőrzéssel tartatják be — statikus ellenőrzés nincs, de a szabálysértéseket megjelölik.

---

## Alapséma (17 tábla)

A `core.ts` definiálja a 17 alaptáblát a `SCHEMA_SQL` változóban. Ezeket a `001_initial_schema.sql` migráció hozza létre, és ezek alkotják az alapvető sémát.

### Alaptáblák (a kezdeti migráció hozza létre)

| Tábla                      | Rendeltetés                                  | Fő oszlopok                                                             |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Szolgáltatói hitelesítő adatok (titkosítva)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Szolgáltatói csomópontok útválasztási adatai | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Általános kulcs-érték-tároló                 | `namespace`, `key`, `value`                                             |
| `combos`                   | Útválasztási kombinációk definíciói          | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | API-kulcsok az átjáróhoz                     | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Adatbázis-metaadatok                         | `key`, `value`                                                          |
| `usage_history`            | Kéréshasználati rekordok                     | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Kérések tartalma és válaszai                 | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Proxykérések naplói                          | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Modell–szolgáltató tartalékláncok            | `model`, `chain`                                                        |
| `domain_budgets`           | Tartományonkénti költségkeretek              | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Költségkeret-visszaállítási előzmények       | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Tartományonkénti költségkövetés              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Tartományi sebességkorlátozás állapota       | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Áramkör-megszakító állapota tartományonként  | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM-válaszok gyorsítótára                    | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Korábbi kvótapillanatképek                   | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### További táblák (későbbi migrációk adják hozzá)

A későbbi migrációk többek között az alábbi táblákat adják hozzá:

- `cli_tool_state` (011-es migráció) — a CLI-eszköz állapota
- `mcp_*` táblák — MCP-kiszolgálók auditálása
- `a2a_*` táblák — A2A-feladatok állapota
- `usage_*` táblák — használatkövetés
- `plugin_*` táblák — beépülőmodul-rendszer
- `skill_executions` — készség-végrehajtási előzmények
- `memory_*` táblák — memóriarendszer
- `compression_*` táblák — tömörítési rendszer
- `webhook_*` táblák — webhook-kézbesítési napló
- `acp_*` táblák — Agent Client Protocol
- `oneproxy_*` táblák — 1proxy piactér
- `proxy_assignments` — proxy-hatókörök hozzárendelései
- `detailed_call_artifacts` — hívásnapló-melléktermékek metaadatai
- `quota_alert_history` — kvótariasztások auditnaplója
- `command_code_auth_sessions` — Command Code OAuth-munkamenetek

A több mint 30 táblát tartalmazó teljes lista a `src/lib/db/migrations/` könyvtárban található.

---

## Migrációk

Az OmniRoute **verziózott, idempotens migrációkat** használ a `src/lib/db/migrations/` könyvtárban. Minden migráció egyetlen SQL-fájl, amelynek neve `NNN_description.sql` formátumú.

### A migrációk elnevezése

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### A migrációk futtatása

Indításkor a `migrationRunner.ts`:

1. Létrehozza az `_omniroute_migrations` táblát, ha az még nem létezik
2. Lekérdezi a már alkalmazott migrációkat
3. Sorrendben alkalmazza az új migrációkat, mindegyiket külön tranzakcióban
4. Időbélyeggel rögzíti az egyes alkalmazott migrációkat

```ts
// src/lib/db/migrationRunner.ts (egyszerűsített)
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

### Idempotencia

A migrációknak **idempotensnek** kell lenniük — kétszeri futtatásuk másodjára nem okozhat változást:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Használja bátran az `IF NOT EXISTS`, `IF EXISTS`, valamint az `OR IGNORE` / `OR REPLACE` záradékokat.

### Új migráció hozzáadása

1. **Határozza meg a következő számot**: `ls src/lib/db/migrations/ | tail -1`
2. **Hozza létre a fájlt**: `NNN_my_change.sql`
3. **Használjon biztonságos DDL-t**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Körültekintően töltse fel a meglévő adatokat**: használja az `UPDATE ... WHERE ...` utasítást a meglévő sorok kezeléséhez
5. **Tesztelje egy másolaton**: soha ne futtasson nem tesztelt migrációkat éles környezetben

Példa:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> A **visszafelé nem kompatibilis módosítások** (például oszlopok törlése) körülményesek. Az OmniRoute NEM támogatja a visszaállítást — egy migráció alkalmazása után a sémamódosítás végleges. Ennek megfelelően tervezzen.

---

## Tárolt adatok titkosítása

Az érzékeny mezőket (API-kulcsok, OAuth-tokenek, kapcsolati karakterláncok) **AES-256-GCM** használatával, titkosítva tárolja a rendszer.

### Működése

```ts
// src/lib/db/encryption.ts (egyszerűsített)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Felhasználási helyei

- `provider_connections.api_key` — alkalmazásszinten titkosítva
- `provider_connections.access_token`, `refresh_token`, `id_token` — alkalmazásszinten titkosítva
- A `key_value` azon bejegyzései, amelyeknél `namespace = "secrets"` — alkalmazásszinten titkosítva
- `proxy_registry.auth` — alkalmazásszinten titkosítva (ha jelen van)

### Titkosítási kulcs

A titkosítási kulcs egy **jelmondatból** (amely a `STORAGE_ENCRYPTION_KEY` környezeti változóval állítható be) és egy **sóból** (amelyet az adatbázis tárol) származik. Az adatok visszafejtéséhez mindkettő szükséges.

```bash
# Biztonságos jelmondat létrehozása
openssl rand -hex 32

# Beállítás az .env fájlban
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritikus fontosságú**: A titkosítási kulcs elvesztése az összes titkosított adathoz való hozzáférés elvesztését jelenti. **A kulcsról az adatbázistól elkülönítve készítsen biztonsági másolatot**.

### Mi NINCS titkosítva

Teljesítménybeli okokból a következő adatok egyszerű szövegként vannak tárolva:

- Szolgáltatók megjelenítési nevei
- Modelldefiníciók (ezek már nyilvánosak)
- Útválasztási szabályok
- Használati rekordok (nem tartalmaznak személyazonosításra alkalmas adatokat)

---

## Titkosítási tudnivalók (v3.8.16+)

Az OmniRoute a **`migrateLegacyEncryptedString()`** függvényt használja két titkosítási séma átlátható kezelésére:

- **Korábbi** (v3.5.0 előtti): XOR-alapú „titkosítás” (nem valódi kriptográfia)
- **Jelenlegi**: AES-256-GCM megfelelő IV-vel és hitelesítési címkével

A migrációs segédfüggvény felismeri a korábbi formátumot, és az első olvasáskor újratitkosítja az adatokat az új sémával. Ez azt jelenti, hogy a hitelesítő adatok elvesztése nélkül frissíthet egy régi adatbázist.

---

## Olvasási gyorsítótár

A gyakran olvasott adatokhoz (modellek, szolgáltatók, beállítások) a `readCache.ts` egy **memórián belüli gyorsítótárat** biztosít:

```ts
// Indításkor gyorsítótárazva, íráskor érvénytelenítve
const providers = await getCachedProviders(); // Gyors, memórián belüli
const fresh = await listProviders(); // Lassú, hozzáfér az adatbázishoz
```

| Gyorsítótárazott entitás | Gyorsítótárkulcs | TTL              |
| ------------------------ | ---------------- | ---------------- |
| `models`                 | `models:v1`      | Következő írásig |
| `provider_connections`   | `providers:v1`   | Következő írásig |
| `settings`               | `settings:v1`    | Következő írásig |
| `combos`                 | `combos:v1`      | Következő írásig |

A gyorsítótár a megfelelő táblába történő minden íráskor érvénytelenítésre kerül.

---

## Biztonsági mentés és helyreállítás

### Manuális biztonsági mentés

```bash
# Helyi biztonsági mentés létrehozása a CLI használatával
omniroute backup create --name pre-migration

# Vagy az API-n keresztül
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

A biztonsági mentési fájl a következőket tartalmazza:

- Az összes adatbázistáblát (JSON formátumba szerializálva)
- A hívásnapló összetevőit (base64-kódolással, opcionálisan)
- Beállításokat és titkos adatokat (titkosítva)
- A bővítmények konfigurációját

### Helyreállítás

```bash
# CLI-n keresztül
omniroute restore pre-migration

# API-n keresztül
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Figyelmeztetés**: A helyreállítás a teljes adatbázist felülírja. Először állítsa le az összes klienst.

### Automatizált biztonsági mentések

```bash
# Automatizált napi biztonsági mentések engedélyezése a CLI-n keresztül
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Az ütemezést szerveroldalon egy háttérfeladat hajtja végre, amely 30 másodpercenként fut le
(alapértelmezés szerint), és a cron-kifejezést a szerver helyi ideje alapján értékeli ki.

| Változó                                     | Alapértelmezett érték | Leírás                                                                                                                                                 |
| ------------------------------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`               | Futási időköz ezredmásodpercben (min. `5000`). A cron-feltételnek megfelelő percen belüli megbízható futáshoz 60 másodpercnél rövidebbnek kell lennie. |

### SQLite működés közbeni biztonsági mentés

Egy aktív adatbázis leállás nélküli biztonsági mentéséhez:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Ez az SQLite online biztonsági mentési API-ját használja — biztonságosan futtatható az OmniRoute működése közben.

## Teljesítményhangolás

### WAL mód

A WAL alapértelmezés szerint engedélyezve van. Nagy írási terhelés esetén fontolja meg a következőket:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Ellenőrzőpont minden 1000 oldal után
PRAGMA journal_size_limit = 67108864;  -- 64 MB-os WAL-korlát
```

### Indexek

A teljesítmény szempontjából fontos indexek (a migrációk automatikusan létrehozzák őket):

- `idx_models_provider` — modellek keresése szolgáltató alapján
- `idx_combo_targets_combo_id` — kombinációs célok kibontása
- `idx_usage_history_api_key_timestamp` — használati elemzések
- `idx_quota_snapshots_api_key_window` — kvóták nyomon követése
- `idx_call_logs_timestamp` — hívásnapló-lekérdezések

Új index hozzáadásához hozzon létre egy migrációt:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memórialeképezett I/O

Nagyon nagy adatbázisok (>10 GB) esetén a memórialeképezés a SQLite pragma használatával módosítható:

```sql
-- Beállítás SQLite pragma használatával (módosítsa a core.ts fájlban vagy futásidőben)
PRAGMA mmap_size = 268435456;  -- 256 MB
```

### Tömörítés

A hosszú ideig futó OmniRoute-példányok számára előnyös az alkalmankénti `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Futtassa havonta, alacsony forgalmú időszakokban. (A WAL mód csökkenti ennek szükségességét, de nem szünteti meg teljesen.)

---

## Állapotellenőrzés

A `src/lib/db/healthCheck.ts` **adatbázisszintű állapotdiagnosztikát** biztosít:

Mindkét HTTP-metódus hitelesítést igényel (ellenkező esetben `401`). A `GET` csak diagnosztikát végez; a `POST` ugyanezt az ellenőrzést futtatja engedélyezett `autoRepair` beállítással.

```bash
GET  /api/db/health   # diagnosztika
POST /api/db/health   # diagnosztika + javítás
```

A válasz a `runDbHealthCheck()` által létrehozott `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "A tartományi költségkeretek már nem létező API-kulcsokra hivatkoztak.",
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

| Mező              | Jelentés                                                                                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Értéke `true`, ha az `issues` üres. A `driver` soha nem befolyásolja.                                                                                                                         |
| `issues[].type`   | Az `integrity_check_failed`, `broken_reference`, `stale_snapshot` vagy `invalid_state` értékek egyike.                                                                                        |
| `repairedCount`   | Az aktuális futtatás során kijavított sorok száma; mindig `0`, ha az `autoRepair` értéke hamis.                                                                                               |
| `backupCreated`   | Jelzi, hogy készült-e biztonsági mentés a javítás előtt.                                                                                                                                      |
| `checkedAt`       | A futtatás és az általa írt esetleges javítási megjegyzés közös ISO-időbélyege.                                                                                                               |
| `driver.name`     | Az ellenőrzött adatbázist kiszolgáló SQLite-illesztőprogram.                                                                                                                                  |
| `driver.degraded` | Értéke `true`, ha az írásokat nem támasztja alá tartósan az adatbázisfájl — ilyen a `sql.js` WASM tartalékmegoldás (teljes fájlos perzisztencia) vagy egy memóriában tárolt adatbázis esetén. |

Ugyanezt az adatszerkezetet adja vissza az `omniroute_db_health_check` MCP-eszköz.

A sérülések észleléséhez futtassa a `PRAGMA integrity_check` parancsot:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Ezt kell kiírnia: ok
```

Ha az `ok` értéktől eltérő eredményt ad vissza, **azonnal hagyja abba az adatbázis használatát**, és állítsa vissza egy biztonsági mentésből.

---

## Katasztrófa utáni helyreállítás

### 1. forgatókönyv: A WAL-fájl elveszett

A `-wal` fájl hiányzik, de a `-shm` fájl és a fő adatbázis sértetlen:

```bash
# A következő megnyitáskor automatikusan helyreáll
omniroute
```

Ha az SQLite nem képes automatikusan helyreállítani:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 2. forgatókönyv: A fő adatbázisfájl sérült

Állítsa helyre biztonsági másolatból:

```bash
omniroute sync pull --merge   # vagy: omniroute backup restore <backup-id>
```

### 3. forgatókönyv: A titkosítási kulcs elveszett

A kulcs nélkül **nem lehetséges a helyreállítás**. A titkosított mezők olvashatatlanok. Adja hozzá újra manuálisan az összes szolgáltatót új hitelesítési adatokkal.

> **Megelőzés**: A titkosítási kulcsról mindig készítsen külön biztonsági másolatot, lehetőleg egy jelszókezelőben vagy KMS-ben.

### 4. forgatókönyv: Megtelt a lemez

Az SQLite `SQLITE_FULL` hibákat ad vissza. Szabadítson fel lemezterületet, majd futtassa a következőt:

```bash
# WAL-ellenőrzőpont létrehozása a lemezterület felszabadításához
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Gyakori műveletek

### Tábla megtekintése

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Sorok megszámlálása az összes táblában

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Az összes adat visszaállítása (törlése)

```bash
# Először állítsa le az OmniRoute-ot
omniroute stop

# Törölje az adatbázisfájlt
rm ~/.omniroute/storage.sqlite*

# Indítsa újra (új, üres adatbázist hoz létre)
omniroute
```

**Szelektív** visszaállításhoz (a szolgáltatók megtartása, a használati adatok törlése):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Egyetlen tábla exportálása

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Hibaelhárítás

### „Az adatbázis zárolva van”

Egy másik folyamat írási zárolást tart fenn. Lehetőségek:

- Várja meg, amíg a másik folyamat befejeződik (ellenőrzés: `lsof | grep storage.sqlite`)
- Állítsa le a másik folyamatot
- Ha a probléma továbbra is fennáll, indítsa újra az OmniRoute-ot

### „Az idegenkulcs-megkötés megsértése”

Egy tartománymodul megsérti a hivatkozási integritást. Ellenőrizze a következőket:

- Árván maradt sorok a függő táblákban
- Nem továbbterjedt kaszkádolt törlések
- Idegen kulcsot módosító közelmúltbeli migráció

A szabálysértések megkereséséhez futtassa a `PRAGMA foreign_key_check;` parancsot.

### „Nincs elegendő memória”

Az SQLite memóriába leképezett I/O-ja meghaladja az operációs rendszer korlátját. Csökkentse a méretet egy SQLite-pragma segítségével:

```sql
PRAGMA mmap_size = 134217728;  -- 128 MB a 256 MB helyett
```

Vagy tiltsa le:

```sql
PRAGMA mmap_size = 0;
```

### „A migráció menet közben meghiúsult”

A migráció tranzakcióban futott, ezért vissza kellett volna görgetni. Ha ez nem történt meg:

1. **Állítsa le az OmniRoute-ot** (akadályozza meg a további próbálkozásokat)
2. **Ellenőrizze az adatbázis állapotát** az `sqlite3` segítségével
3. **Javítsa manuálisan** a részleges migrációt
4. **Indítsa újra** az OmniRoute-ot (a rendszer újra megkísérli a migrációt)

Ennek megelőzéséhez a migrációkat először mindig egy másolaton tesztelje.

---

## Lásd még

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — használati táblák
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — állapotfigyelés
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — kiadási folyamat
- Forrás: `src/lib/db/` (több mint 80 fájl, ~25 ezer kódsor)
