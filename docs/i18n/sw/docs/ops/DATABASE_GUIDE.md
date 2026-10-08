# Database Schema & Operations Guide (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Kwa ufupi**: OmniRoute hutumia **SQLite yenye uandishi wa kumbukumbu wa WAL** kama hifadhi yake msingi, pamoja na usimbaji fiche wa **AES-256-GCM** kwa data nyeti iliyohifadhiwa. Mwongozo huu unashughulikia skima, uhamishaji, kuhifadhi nakala/kurejesha, na miongozo ya kiutendaji.

**Vyanzo:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (majendwali 17 ya msingi)
- `src/lib/db/migrationRunner.ts` — uhamishaji wenye matoleo
- `src/lib/db/migrations/` — faili 167 za SQL zenye matoleo
- `src/lib/db/encryption.ts` — visaidizi vya usimbaji fiche
- `src/lib/db/backup.ts` — uhamishaji wa nakala rudufu kuingia/kutoka
- `src/lib/db/healthCheck.ts` — uchunguzi wa afya

---

## Kwa Nini SQLite?

OmniRoute ilichagua SQLite badala ya PostgreSQL/MySQL kwa sababu kadhaa:

| Kipengele          | SQLite                                       | PostgreSQL                                     |
| ------------------ | -------------------------------------------- | ---------------------------------------------- |
| **Usambazaji**     | Imepachikwa — hakuna seva tofauti            | Inahitaji usanidi wa seva                      |
| **Usimbaji fiche** | Safu ya programu (AES-256-GCM)               | TDE iliyojengewa ndani                         |
| **Utendaji**       | Haraka zaidi kwa mizigo midogo/ya kati       | Bora zaidi kwa uandishi mkubwa wa wakati mmoja |
| **Ushindani**      | Hali ya WAL huruhusu usomaji wa wakati mmoja | MVCC kamili                                    |
| **Nakala rudufu**  | Kunakili faili moja                          | `pg_dump` au taswira ya mfumo wa faili         |
| **Matumizi**       | Usakinishaji kwa kila mtumiaji, imepachikwa  | SaaS yenye wapangaji wengi                     |

Kwa usambazaji wa **mtumiaji mmoja, instansi moja** (matumizi makuu ya OmniRoute), SQLite ni rahisi na ya haraka zaidi.

### Uandishi wa Kumbukumbu wa WAL

`core.ts` hufungua hifadhidata kwa **hali ya WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL huruhusu **usomaji wa wakati mmoja** wakati wa uandishi — jambo muhimu kwa dashibodi, ambayo huendesha hoja wakati maombi yanarekodiwa.

Ukubwa chaguo-msingi wa akiba ni **65,536 KiB (64 MiB)**. SQLite hufasiri thamani hasi ya
`cache_size` kama kikomo cha juu cha kukadiria katika KiB na hugawa kurasa inapohitajika.
**Settings > System & Storage > Cache Size** hukubali thamani kamili kuanzia **1 hadi
1,000,000 KiB**; kuhifadhi mpangilio huo huutekeleza kwenye muunganisho unaotumika wa hifadhidata,
na OmniRoute hurejesha thamani iliyohifadhiwa wakati wa kuanza.

---

## Eneo la Hifadhidata

Faili ya SQLite huhifadhiwa katika:

| Mfumo wa Uendeshaji | Njia                                                               |
| ------------------- | ------------------------------------------------------------------ |
| Linux               | `~/.omniroute/storage.sqlite`                                      |
| macOS               | `~/.omniroute/storage.sqlite`                                      |
| Windows             | `%USERPROFILE%\.omniroute\storage.sqlite`                          |
| Docker              | `/app/data/storage.sqlite` (inaweza kusanidiwa kupitia `DATA_DIR`) |

Faili zinazoandamana nayo:

- `storage.sqlite-wal` — kumbukumbu ya uandishi wa mapema
- `storage.sqlite-shm` — faili ya kumbukumbu iliyoshirikiwa
- `call_logs/` — mabaki ya data ya maombi (ikiwa imewezeshwa)

**Badilisha eneo:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Usanifu wa Moduli za Kikoa

Hifadhidata ya OmniRoute ina **moduli 110 za kiwango cha juu za TypeScript** katika `src/lib/db/`. Kila moduli ya kikoa:

- Inamiliki jedwali moja au zaidi mahususi
- Inasafirisha vitendaji vya CRUD vyenye aina zilizobainishwa
- Haifikii kamwe majedwali ya moduli nyingine
- Inatumia `getDbInstance()` kutoka `core.ts` kufikia hifadhidata

### Moduli 110 za Kiwango cha Juu za Hifadhidata

OmniRoute ina **faili 110 za kiwango cha juu za TypeScript** katika `src/lib/db/`. Hapa chini kuna sampuli ya moduli za msingi; tazama orodha ya saraka kwa orodha kamili:

| Moduli                  | Majedwali                                                      | Jukumu                                                                             |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | Usajili na vitambulisho vya watoa huduma kwa OAuth/ufunguo wa API                  |
| `models.ts`             | `key_value` (data ya modeli)                                   | Ufafanuzi wa modeli, uwezo na bei                                                  |
| `combos.ts`             | `combos`                                                       | Mipangilio na upangaji wa uelekezaji wa michanganyiko                              |
| `apiKeys.ts`            | `api_keys`                                                     | Mzunguko wa maisha wa funguo za API, mawanda na ufuatiliaji wa mgao                |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Usanidi wa mfumo na hifadhi ya KV inayoshirikiwa                                   |
| `backup.ts`             | —                                                              | Operesheni za kuhamisha/kuingiza nakala rudufu                                     |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Mipangilio ya proksi na kanuni za uelekezaji                                       |
| `prompts.ts`            | `prompt_templates`                                             | Violezo vya maelekezo vinavyoweza kutumika tena na usimamizi wa matoleo            |
| `webhooks.ts`           | `webhooks`                                                     | Usajili na kumbukumbu za webhook zinazoendeshwa na matukio                         |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Uwekaji kumbukumbu za ukaguzi kwa kila ombi (si lazima, ujazo mkubwa)              |
| `domainState.ts`        | `domain_*` (majedwali 5)                                       | Bajeti za vikoa, vivunja saketi, vizuizi, minyororo mbadala na historia ya gharama |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Funguo za API zilizoidhinishwa kwa MCP/A2A                                         |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Historia ya matumizi ya mgao                                                       |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Kuunganisha modeli na michanganyiko chaguomsingi                                   |
| `cliToolState.ts`       | `cli_tool_state`                                               | Hali endelevu mahususi ya CLI                                                      |
| `encryption.ts`         | —                                                              | Visaidizi vya kusimba/kusimbua sehemu                                              |
| `readCache.ts`          | —                                                              | Akiba ya kumbukumbu kwa operesheni zenye usomaji mwingi                            |
| `secrets.ts`            | `key_value` (maingizo yaliyosimbwa)                            | Hifadhi ya siri iliyosimbwa                                                        |
| `stateReset.ts`         | —                                                              | Kufuta/kuweka upya hali ya hifadhidata kwa ajili ya majaribio                      |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Muktadha wa kipindi kwa ajili ya kukabidhi kazi kwa wakala mwingine                |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Ufuatiliaji wa matumizi                                                            |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Usanidi wa mfinyazo                                                                |

### Mipaka ya Moduli

Kanuni kuu ya usanifu: **moduli hazifikii majedwali ya moduli nyingine moja kwa moja**. Ili kufanya kazi na data ya moduli nyingine, leta kitendaji kutoka kwenye moduli hiyo.

```ts
// ❌ SI SAHIHI: SQL ya moja kwa moja kutoka moduli nyingine
db.prepare("SELECT * FROM provider_connections").all();

// ✅ SAHIHI: tumia kitendaji cha moduli ya providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Kanuni hii inatekelezwa kupitia ukaguzi wa msimbo — hakuna ukaguzi tuli, lakini ukiukaji huwekewa alama.

---

## Skema ya Msingi (majedauli 17)

`core.ts` hufafanua majedwali 17 ya msingi katika `SCHEMA_SQL`. Majedwali haya huundwa na uhamishaji `001_initial_schema.sql` na yanaunda skema kuu.

### Majedwali ya Msingi (yaliyoundwa katika uhamishaji wa awali)

| Jedwali                    | Madhumuni                                    | Safu muhimu                                                             |
| -------------------------- | -------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Vitambulisho vya mtoa huduma (vilivyosimbwa) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Taarifa za uelekezaji za nodi za mtoa huduma | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Hifadhi ya jumla ya KV                       | `namespace`, `key`, `value`                                             |
| `combos`                   | Ufafanuzi wa michanganyiko ya uelekezaji     | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Funguo za API za lango                       | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata ya hifadhidata                      | `key`, `value`                                                          |
| `usage_history`            | Rekodi za matumizi ya maombi                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Data za maombi na majibu                     | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Kumbukumbu za maombi ya proksi               | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Minyororo ya modeli kwenda kwa mtoa huduma   | `model`, `chain`                                                        |
| `domain_budgets`           | Bajeti za matumizi kwa kila kikoa            | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Historia ya uwekaji upya wa bajeti           | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Ufuatiliaji wa gharama kwa kila kikoa        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Hali ya kikomo cha kasi cha kikoa            | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Hali ya kivunja saketi kwa kila kikoa        | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Kache ya majibu ya LLM                       | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Picha za kihistoria za mgao                  | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Majedwali ya Ziada (yaliyoongezwa na uhamishaji wa baadaye)

Uhamishaji uliofuata huongeza majedwali kama vile:

- `cli_tool_state` (uhamishaji 011) — hali ya zana ya CLI
- Majedwali ya `mcp_*` — ukaguzi wa seva ya MCP
- Majedwali ya `a2a_*` — hali ya jukumu la A2A
- Majedwali ya `usage_*` — ufuatiliaji wa matumizi
- Majedwali ya `plugin_*` — mfumo wa programu-jalizi
- `skill_executions` — historia ya utekelezaji wa ujuzi
- Majedwali ya `memory_*` — mfumo wa kumbukumbu
- Majedwali ya `compression_*` — mfumo wa mgandamizo
- Majedwali ya `webhook_*` — kumbukumbu ya uwasilishaji wa webhook
- Majedwali ya `acp_*` — Itifaki ya Mteja wa Ajenti
- Majedwali ya `oneproxy_*` — soko la 1proxy
- `proxy_assignments` — miunganisho ya wigo wa proksi
- `detailed_call_artifacts` — metadata ya vizalia vya kumbukumbu za simu
- `quota_alert_history` — ukaguzi wa tahadhari za mgao
- `command_code_auth_sessions` — vipindi vya OAuth vya Command Code

Orodha kamili ya majedwali ~30+ ipo katika `src/lib/db/migrations/`.

---

## Uhamishaji

OmniRoute hutumia **uhamishaji wenye matoleo na unaoweza kurudiwa bila kubadilisha matokeo** katika `src/lib/db/migrations/`. Kila uhamishaji ni faili moja ya SQL yenye jina `NNN_description.sql`.

### Utoaji wa Majina ya Uhamishaji

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Jinsi Uhamishaji Unavyoendeshwa

Wakati wa kuanzisha programu, `migrationRunner.ts`:

1. Huunda jedwali la `_omniroute_migrations` ikiwa halipo
2. Hufanya hoja ili kupata uhamishaji ambao tayari umetumika
3. Hutumia uhamishaji wowote mpya kwa mpangilio, kila mmoja ndani ya muamala
4. Hurekodi kila uhamishaji uliotumika pamoja na muhuri wa muda

```ts
// src/lib/db/migrationRunner.ts (imerahisishwa)
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

### Uwezo wa Kurudiwa Bila Kubadilisha Matokeo

Uhamishaji lazima **uweze kurudiwa bila kubadilisha matokeo** — kuuendesha mara mbili hakupaswi kusababisha mabadiliko yoyote:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Tumia vifungu vya `IF NOT EXISTS`, `IF EXISTS`, na `OR IGNORE` / `OR REPLACE` kwa wingi.

### Kuongeza Uhamishaji Mpya

1. **Tambua nambari inayofuata**: `ls src/lib/db/migrations/ | tail -1`
2. **Unda faili**: `NNN_my_change.sql`
3. **Tumia DDL salama**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Jaza data iliyopo kwa uangalifu**: tumia `UPDATE ... WHERE ...` kushughulikia safu mlalo zilizopo
5. **Jaribu kwenye nakala**: kamwe usiendeshe uhamishaji ambao haujajaribiwa kwenye mazingira ya uzalishaji

Mfano:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Mabadiliko yasiyoendana na matoleo ya awali** (kwa mfano, kuondoa safu wima) ni magumu. OmniRoute HAITUMII urejeshaji wa toleo la awali — pindi uhamishaji unapotumika, mabadiliko ya muundo wa data huwa ya kudumu. Panga ipasavyo.

---

## Usimbaji Fiche wa Data Iliyohifadhiwa

Sehemu nyeti (funguo za API, tokeni za OAuth, mifuatano ya muunganisho) husimbwa kwa njia fiche wakati zimehifadhiwa kwa kutumia **AES-256-GCM**.

### Jinsi Inavyofanya Kazi

```ts
// src/lib/db/encryption.ts (imerahisishwa)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Mahali Inapotumika

- `provider_connections.api_key` — imesimbwa kwa njia fiche katika kiwango cha programu
- `provider_connections.access_token`, `refresh_token`, `id_token` — zimesimbwa kwa njia fiche katika kiwango cha programu
- Maingizo ya `key_value` yenye `namespace = "secrets"` — yamesimbwa kwa njia fiche katika kiwango cha programu
- `proxy_registry.auth` — imesimbwa kwa njia fiche katika kiwango cha programu (ikiwa ipo)

### Ufunguo wa Usimbaji Fiche

Ufunguo wa usimbaji fiche hutokana na **kaulisiri** (iliyowekwa kupitia kigezo cha mazingira cha `STORAGE_ENCRYPTION_KEY`) na **salt** (iliyohifadhiwa katika hifadhidata). Vyote viwili vinahitajika ili kusimbua data.

```bash
# Tengeneza kaulisiri salama
openssl rand -hex 32

# Weka katika .env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Muhimu sana**: Kupoteza ufunguo wa usimbaji fiche kunamaanisha kupoteza uwezo wa kufikia data yote iliyosimbwa kwa njia fiche. **Hifadhi nakala ya ufunguo kando na hifadhidata**.

### Vitu Ambavyo HAVIJASIMBWA kwa Njia Fiche

Kwa sababu za utendaji, yafuatayo huhifadhiwa kama maandishi wazi:

- Majina ya kuonyesha ya watoa huduma
- Ufafanuzi wa modeli (tayari ni wa umma)
- Kanuni za uelekezaji
- Rekodi za matumizi (hazina PII)

---

## Tahadhari za Usimbaji Fiche (v3.8.16+)

OmniRoute hutumia **`migrateLegacyEncryptedString()`** kushughulikia mifumo miwili ya usimbaji fiche kwa uwazi:

- **Ya zamani** (kabla ya v3.5.0): "usimbaji fiche" unaotegemea XOR (si usimbaji fiche halisi)
- **Ya sasa**: AES-256-GCM yenye IV sahihi na lebo ya uthibitishaji

Kisaidizi cha uhamishaji hutambua muundo wa zamani na kusimba upya kwa kutumia mfumo mpya wakati wa usomaji wa kwanza. Hii inamaanisha unaweza kusasisha hifadhidata ya zamani bila kupoteza vitambulisho.

---

## Akiba ya Usomaji

Kwa data inayosomwa mara kwa mara (miundo, watoa huduma, mipangilio), `readCache.ts` hutoa **akiba ya ndani ya kumbukumbu**:

```ts
// Imehifadhiwa kwenye akiba wakati wa kuanzisha, hubatilishwa wakati wa kuandika
const providers = await getCachedProviders(); // Haraka, ndani ya kumbukumbu
const fresh = await listProviders(); // Polepole, hufikia DB
```

| Huluki iliyohifadhiwa kwenye akiba | Ufunguo wa akiba | TTL                     |
| ---------------------------------- | ---------------- | ----------------------- |
| `models`                           | `models:v1`      | Hadi wakati wa kuandika |
| `provider_connections`             | `providers:v1`   | Hadi wakati wa kuandika |
| `settings`                         | `settings:v1`    | Hadi wakati wa kuandika |
| `combos`                           | `combos:v1`      | Hadi wakati wa kuandika |

Akiba hubatilishwa kila mara jedwali linalohusika linapoandikiwa.

---

## Hifadhi Nakala na Urejeshaji

### Hifadhi Nakala ya Kujitengenezea

```bash
# Tumia CLI kuunda hifadhi nakala ya ndani
omniroute backup create --name pre-migration

# Au kupitia API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Faili ya hifadhi nakala inajumuisha:

- Majedwali yote ya DB (yaliyowekwa katika mfuatano wa JSON)
- Mabaki ya kumbukumbu za miito (yaliyosimbwa kwa base64, ya hiari)
- Mipangilio + siri (zilizosimbwa kwa njia fiche)
- Usanidi wa programu-jalizi

### Urejeshaji

```bash
# Kupitia CLI
omniroute restore pre-migration

# Kupitia API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Onyo**: Urejeshaji huandika juu ya DB nzima. Simamisha viteja vyote kwanza.

### Hifadhi Nakala za Kiotomatiki

```bash
# Washa hifadhi nakala za kila siku za kiotomatiki kupitia CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ratiba hutekelezwa upande wa seva na kazi ya chinichini inayotekelezwa kila sekunde 30
(chaguo-msingi) na kutathmini usemi wa cron kulingana na saa ya ndani ya seva.

| Kigezo                                      | Chaguo-msingi | Maelezo                                                                                                                                                     |
| ------------------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`       | Kipindi cha utekelezaji katika ms (kiwango cha chini `5000`). Lazima kiwe chini ya sekunde 60 ili kuingia kwa uhakika ndani ya dakika inayolingana ya cron. |

### Hifadhi Nakala Moja kwa Moja ya SQLite

Kwa hifadhi nakala ya DB inayotumika bila muda wa kusitisha huduma:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Hii hutumia API ya hifadhi nakala ya mtandaoni ya SQLite — ni salama kutekeleza wakati OmniRoute inaendelea kufanya kazi.

---

## Uboreshaji wa Utendaji

### Modi ya WAL

WAL imewezeshwa kwa chaguo-msingi. Kwa mizigo ya kazi yenye uandishi mwingi, zingatia:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Weka alama ya ukaguzi kila kurasa 1000
PRAGMA journal_size_limit = 67108864;  -- Kikomo cha WAL cha 64MB
```

### Faharasa

Faharasa muhimu kwa ajili ya utendaji (huundwa kiotomatiki na uhamishaji):

- `idx_models_provider` — utafutaji wa modeli kulingana na mtoa huduma
- `idx_combo_targets_combo_id` — upanuzi wa malengo ya combo
- `idx_usage_history_api_key_timestamp` — uchanganuzi wa matumizi
- `idx_quota_snapshots_api_key_window` — ufuatiliaji wa mgao
- `idx_call_logs_timestamp` — hoja za kumbukumbu za miito

Ili kuongeza faharasa mpya, unda uhamishaji:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O Iliyopangwa Kwenye Kumbukumbu

Kwa hifadhidata kubwa sana (>10GB), upangaji kwenye kumbukumbu unaweza kurekebishwa kupitia pragma ya SQLite:

```sql
-- Weka kupitia pragma ya SQLite (rekebisha katika core.ts au wakati wa utekelezaji)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Mfinyazo

Matukio ya OmniRoute yanayoendeshwa kwa muda mrefu hunufaika na utekelezaji wa mara kwa mara wa `VACUUM`:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Tekeleza kila mwezi wakati wa vipindi vyenye trafiki ndogo. (Modi ya WAL hupunguza hitaji hilo, lakini hailiondoi.)

---

## Ukaguzi wa Afya

`src/lib/db/healthCheck.ts` hutoa **uchunguzi wa afya katika kiwango cha DB**:

Vitenzi vyote viwili vinahitaji uthibitishaji (`401` vinginevyo). `GET` hufanya uchunguzi pekee; `POST` huendesha
ukaguzi uleule huku `autoRepair` ikiwa imewezeshwa.

```bash
GET  /api/db/health   # fanya uchunguzi
POST /api/db/health   # fanya uchunguzi + rekebisha
```

Jibu ni `DbHealthCheckResult` inayozalishwa na `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Bajeti za vikoa zilirejelea funguo za API ambazo hazipo tena.",
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

| Sehemu            | Maana                                                                                                                                                                      |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | Ni `true` wakati `issues` ni tupu. `driver` haiathiri thamani hii kamwe.                                                                                                   |
| `issues[].type`   | Moja kati ya `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                              |
| `repairedCount`   | Safu mlalo zilizorekebishwa wakati wa utekelezaji huu; daima ni `0` wakati `autoRepair` ni false.                                                                          |
| `backupCreated`   | Ikiwa nakala rudufu iliundwa kabla ya kurekebisha.                                                                                                                         |
| `checkedAt`       | Muhuri wa muda wa ISO unaoshirikiwa na utekelezaji na dokezo lolote la marekebisho linaloandikwa.                                                                          |
| `driver.name`     | Kiendeshi cha SQLite kinachohudumia hifadhidata iliyokaguliwa.                                                                                                             |
| `driver.degraded` | Ni `true` wakati maandishi hayajahifadhiwa kwa kudumu na faili ya hifadhidata — mbadala wa `sql.js` WASM (uhifadhi wa faili nzima) au hifadhidata iliyo katika kumbukumbu. |

Mzigo huohuo wa data hurejeshwa na zana ya MCP ya `omniroute_db_health_check`.

Tekeleza `PRAGMA integrity_check` ili kugundua uharibifu:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Inapaswa kuchapisha: ok
```

Ikiwa inarejesha chochote tofauti na `ok`, **acha kutumia hifadhidata mara moja** na uirejeshe kutoka kwenye nakala rudufu.

---

## Urejeshaji Baada ya Maafa

### Hali ya 1: Faili ya WAL Imepotea

Faili ya `-wal` haipo lakini `-shm` na DB kuu ziko salama:

```bash
# Hujirejesha kiotomatiki inapofunguliwa tena
omniroute
```

Ikiwa SQLite haiwezi kujirejesha kiotomatiki:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Hali ya 2: Faili Kuu ya DB Imeharibika

Rejesha kutoka kwenye nakala rudufu:

```bash
omniroute sync pull --merge   # au: omniroute backup restore <backup-id>
```

### Hali ya 3: Ufunguo wa Usimbaji Fiche Umepotea

**Hakuna uwezekano wa kurejesha** bila ufunguo. Sehemu zilizosimbwa kwa njia fiche haziwezi kusomeka. Ongeza upya watoa huduma wote wewe mwenyewe ukitumia vitambulisho vipya.

> **Hatua ya kupunguza hatari**: Daima hifadhi nakala rudufu ya ufunguo wa usimbaji fiche kando, ikiwezekana katika kidhibiti cha manenosiri au KMS.

### Hali ya 4: Diski Imejaa

SQLite itarejesha hitilafu za `SQLITE_FULL`. Futa baadhi ya data ili kupata nafasi ya diski, kisha:

```bash
# Weka kituo cha ukaguzi cha WAL ili kupata nafasi zaidi
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operesheni za Kawaida

### Kagua Jedwali

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Hesabu Safu katika Majedwali Yote

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Weka Upya (Futa) Data Yote

```bash
# Simamisha OmniRoute kwanza
omniroute stop

# Futa faili ya DB
rm ~/.omniroute/storage.sqlite*

# Anzisha upya (itaunda upya DB tupu)
omniroute
```

Kwa uwekaji upya **wa kuchagua** (hifadhi watoa huduma, futa data ya matumizi):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Hamisha Jedwali Moja

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Utatuzi wa Matatizo

### "Hifadhidata imefungwa"

Mchakato mwingine unashikilia kufuli ya uandishi. Fanya mojawapo ya yafuatayo:

- Subiri mchakato mwingine ukamilike (kagua `lsof | grep storage.sqlite`)
- Sitisha mchakato mwingine
- Ikiwa hali hiyo inaendelea, anzisha OmniRoute upya

### "Kizuizi cha ufunguo wa kigeni kimeshindwa"

Moduli ya kikoa inakiuka uadilifu wa marejeleo. Kagua:

- Safu zisizo na marejeleo katika majedwali tegemezi
- Ufutaji wa mfululizo ambao haukuenea
- Uhamishaji wa hivi karibuni uliobadilisha ufunguo wa kigeni

Endesha `PRAGMA foreign_key_check;` ili kupata ukiukaji.

### "Kumbukumbu haitoshi"

I/O ya SQLite iliyopangwa kwenye kumbukumbu inazidi kikomo cha OS. Ipunguze kupitia pragma ya SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB badala ya 256MB
```

Au izime:

```sql
PRAGMA mmap_size = 0;
```

### "Uhamishaji umeshindwa katikati"

Uhamishaji uliendeshwa ndani ya muamala, kwa hivyo ulipaswa kutenduliwa. Ikiwa haukutenduliwa:

1. **Simamisha OmniRoute** (zuia majaribio zaidi)
2. **Kagua hali ya DB** kwa kutumia `sqlite3`
3. **Rekebisha wewe mwenyewe** uhamishaji usiokamilika
4. **Endesha OmniRoute tena** (uhamishaji utajaribiwa tena)

Ili kuzuia hali hii, daima jaribu uhamishaji kwenye nakala kwanza.

---

## Angalia Pia

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — majedwali ya matumizi
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — ufuatiliaji wa hali
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — mtiririko wa utoaji
- Chanzo: `src/lib/db/` (faili 80+, takriban LOC 25K)
