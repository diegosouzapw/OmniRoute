# Database Schema & Operations Guide (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Go hachomair**: Úsáideann OmniRoute **SQLite le dialannú WAL** mar a phríomhstór, agus criptiú **AES-256-GCM** á úsáid aige le haghaidh réimsí íogaire atá á stóráil. Clúdaíonn an treoir seo an scéimre, ascnaimh, cúltaca/aisghabháil, agus treoirleabhair oibríochtúla.

**Foinsí:**

- `src/lib/db/core.ts` — aonarán + SCHEMA_SQL (17 mbuntábla)
- `src/lib/db/migrationRunner.ts` — ascnaimh le leaganacha
- `src/lib/db/migrations/` — 167 comhad SQL le leaganacha
- `src/lib/db/encryption.ts` — feidhmeanna cúnta criptithe
- `src/lib/db/backup.ts` — easpórtáil/iompórtáil cúltaca
- `src/lib/db/healthCheck.ts` — diagnóisic sláinte

---

## Cén fáth SQLite?

Roghnaigh OmniRoute SQLite seachas PostgreSQL/MySQL ar roinnt cúiseanna:

| Fachtóir           | SQLite                                      | PostgreSQL                                       |
| ------------------ | ------------------------------------------- | ------------------------------------------------ |
| **Imscaradh**      | Leabaithe — gan freastalaí ar leith         | Socrú freastalaí de dhíth                        |
| **Criptiú**        | Ciseal feidhmchláir (AES-256-GCM)           | TDE ionsuite                                     |
| **Feidhmíocht**    | Níos tapa d'ualaí oibre beaga/meánmhéide    | Níos fearr do scríbhinní ollmhóra comhthráthacha |
| **Comhthráthacht** | Ceadaíonn mód WAL léamha comhthráthacha     | MVCC iomlán                                      |
| **Cúltaca**        | Cóip aonchomhaid                            | `pg_dump` nó seat den chóras comhad              |
| **Cás úsáide**     | Suiteáil in aghaidh an úsáideora, leabaithe | SaaS ilthionónta                                 |

I gcás imscaradh **aonúsáideora, aonáis** (príomhchás úsáide OmniRoute), tá SQLite níos simplí agus níos tapa.

### Dialannú WAL

Osclaíonn `core.ts` an bunachar sonraí i **mód WAL (Logáil Réamhscríofa)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

Ceadaíonn WAL **léamha comhthráthacha** le linn scríbhinní — rud atá tábhachtach don deais, a dhéanann iarratais agus iarrataí á dtaifeadadh.

Is é **65,536 KiB (64 MiB)** méid réamhshocraithe na taisce. Léirmhíníonn SQLite
`cache_size` diúltach mar neasteorainn uachtarach in KiB agus leithdháileann sé leathanaigh de réir mar is gá.
Glacann **Socruithe > Córas & Stóras > Méid na Taisce** le luachanna slánuimhreacha ó **1 go
1,000,000 KiB**; nuair a shábháiltear an socrú, cuirtear i bhfeidhm é ar an gceangal beo leis an mbunachar sonraí,
agus athchóiríonn OmniRoute an luach marthanach ag am tosaithe.

---

## Suíomh an Bhunachair Sonraí

Stóráiltear an comhad SQLite ag:

| OS      | Conair                                                   |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (inchumraithe trí `DATA_DIR`) |

Comhaid ghaolmhara:

- `storage.sqlite-wal` — loga réamhscríofa
- `storage.sqlite-shm` — comhad cuimhne comhroinnte
- `call_logs/` — déantáin phálasta iarratais (má tá siad cumasaithe)

**Sáraigh an suíomh:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Ailtireacht Modúl Fearainn

Tá **110 modúl TypeScript ardleibhéil** i mbunachar sonraí OmniRoute in `src/lib/db/`. Déanann gach modúl fearainn na nithe seo a leanas:

- Tá tábla sonrach amháin nó níos mó faoina chúram
- Easpórtálann sé feidhmeanna CRUD clóscríofa
- Ní dhéanann sé teagmháil choíche le táblaí modúil eile
- Úsáideann sé `getDbInstance()` ó `core.ts` chun rochtain a fháil ar an mbunachar sonraí

### Na 110 Modúl Ardleibhéil Bunachair Sonraí

Tá **110 comhad TypeScript ardleibhéil** ag OmniRoute in `src/lib/db/`. Seo thíos sampla de na croímhodúil; féach liostú na comhadlainne chun an liosta iomlán a fháil:

| Modúl                   | Táblaí                                                         | Freagracht                                                                           |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Clárú soláthraithe OAuth/eochrach API agus dintiúir                                  |
| `models.ts`             | `key_value` (sonraí samhla)                                    | Sainmhínithe samhlacha, cumais, praghsáil                                            |
| `combos.ts`             | `combos`                                                       | Cumraíochtaí ródaithe teaglama agus ordú                                             |
| `apiKeys.ts`            | `api_keys`                                                     | Saolré eochracha API, scóip, rianú cuóta                                             |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Cumraíocht córais agus stór comhroinnte KV                                           |
| `backup.ts`             | —                                                              | Oibríochtaí easpórtála/iompórtála cúltaca                                            |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Cumraíochtaí seachfhreastalaithe agus rialacha ródaithe                              |
| `prompts.ts`            | `prompt_templates`                                             | Teimpléid leid in-athúsáidte, leaganú                                                |
| `webhooks.ts`           | `webhooks`                                                     | Síntiúis agus logaí crúca gréasáin faoi thiomáint imeachtaí                          |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Logáil iniúchta in aghaidh na hiarrata (roghnach, ardtoirte)                         |
| `domainState.ts`        | `domain_*` (5 thábla)                                          | Buiséid fearainn, scoradáin chiorcaid, frithdhúnadh, slabhraí cúltaca, stair costais |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | Eochracha API ar an liosta ceadaithe le haghaidh MCP/A2A                             |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Úsáid stairiúil cuóta                                                                |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Mapáil samhlacha chuig réamhshocruithe teaglama                                      |
| `cliToolState.ts`       | `cli_tool_state`                                               | Staid mharthanach a bhaineann go sonrach le CLI                                      |
| `encryption.ts`         | —                                                              | Feidhmeanna cúnta chun réimsí a chriptiú/a dhíchriptiú                               |
| `readCache.ts`          | —                                                              | Taisce cuimhne le haghaidh oibríochtaí diantéagartha                                 |
| `secrets.ts`            | `key_value` (iontrálacha criptithe)                            | Stóráil rúin chriptithe                                                              |
| `stateReset.ts`         | —                                                              | Staid an bhunachair sonraí a ghlanadh/a athshocrú le haghaidh tástála                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Comhthéacs seisiúin le haghaidh aistriú idir gníomhairí                              |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Rianú úsáide                                                                         |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Cumraíocht comhbhrúite                                                               |

### Teorainneacha Modúl

Croí-riail ailtireachta: **ní fhaigheann modúil rochtain dhíreach ar tháblaí a chéile**. Chun oibriú le sonraí modúil eile, iompórtáil an fheidhm ón modúl sin.

```ts
// ❌ MÍCHEART: SQL díreach ó mhodúl eile
db.prepare("SELECT * FROM provider_connections").all();

// ✅ CEART: úsáid feidhm an mhodúil providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Cuirtear an riail seo i bhfeidhm trí athbhreithniú cód — níl aon seiceáil statach ann, ach cuirtear sáruithe in iúl.

---

## Bunscéimre (17 dtábla)

Sainmhíníonn `core.ts` na 17 mbuntábla in `SCHEMA_SQL`. Cruthaítear iad seo leis an asc迁ú `001_initial_schema.sql` agus is iad croílár na scéime iad.

### Croítháblaí (cruthaithe sa chéad asc迁ú)

| Tábla                      | Cuspóir                                    | Príomhcholúin                                                           |
| -------------------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Dintiúir soláthraí (criptithe)             | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Faisnéis ródúcháin nóid soláthraí          | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Stór ginearálta KV                         | `namespace`, `key`, `value`                                             |
| `combos`                   | Sainmhínithe teaglama ródúcháin            | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Eochracha API don gheata                   | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Meiteashonraí an bhunachair sonraí         | `key`, `value`                                                          |
| `usage_history`            | Taifid úsáide iarratas                     | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Ualaí pá iarratas agus freagraí            | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logaí iarratas seachfhreastalaí            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Slabhraí samhail-go-soláthraí              | `model`, `chain`                                                        |
| `domain_budgets`           | Buiséid chaiteachais de réir fearainn      | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Stair athshocraithe buiséid                | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Rianú costas de réir fearainn              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Staid teorannaithe ráta fearainn           | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Staid scoradáin chiorcaid de réir fearainn | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Taisce freagartha LLM                      | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Seatanna stairiúla cuóta                   | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Táblaí Breise (curtha leis ag asc迁uithe níos déanaí)

Cuireann asc迁uithe ina dhiaidh sin táblaí leis amhail:

- `cli_tool_state` (asc迁ú 011) — staid uirlis CLI
- Táblaí `mcp_*` — iniúchadh freastalaí MCP
- Táblaí `a2a_*` — staid taisc A2A
- Táblaí `usage_*` — rianú úsáide
- Táblaí `plugin_*` — córas breiseán
- `skill_executions` — stair rite scileanna
- Táblaí `memory_*` — córas cuimhne
- Táblaí `compression_*` — córas comhbhrúite
- Táblaí `webhook_*` — loga seachadta crúca gréasáin
- Táblaí `acp_*` — Prótacal Cliant Gníomhaire
- Táblaí `oneproxy_*` — margadh 1proxy
- `proxy_assignments` — ceangail scóipe seachfhreastalaí
- `detailed_call_artifacts` — meiteashonraí déantán loga glao
- `quota_alert_history` — iniúchadh foláirimh cuóta
- `command_code_auth_sessions` — seisiúin OAuth Command Code

Tá an liosta iomlán de thart ar 30+ tábla in `src/lib/db/migrations/`.

---

## Aistrithe

Úsáideann OmniRoute **aistrithe le leaganacha agus idéimpiteacha** in `src/lib/db/migrations/`. Is comhad SQL aonair é gach aistriú darb ainm `NNN_description.sql`.

### Ainmniú Aistrithe

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Conas a Ritear Aistrithe

Ag am tosaithe, déanann `migrationRunner.ts` na nithe seo a leanas:

1. Cruthaíonn sé an tábla `_omniroute_migrations` mura bhfuil sé ann
2. Déanann sé fiosrú maidir le haistrithe atá curtha i bhfeidhm cheana
3. Cuireann sé aon aistrithe nua i bhfeidhm in ord, gach ceann acu in idirbheart
4. Taifeadann sé gach aistriú a cuireadh i bhfeidhm mar aon le stampa ama

```ts
// src/lib/db/migrationRunner.ts (simplithe)
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

### Idéimpiteacht

Ní mór d’aistrithe a bheith **idéimpiteach** — níor cheart aon éifeacht a bheith ag baint lena rith faoi dhó:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Bain úsáid fhairsing as clásail `IF NOT EXISTS`, `IF EXISTS`, agus `OR IGNORE` / `OR REPLACE`.

### Aistriú Nua a Chur Leis

1. **Sainaithin an chéad uimhir eile**: `ls src/lib/db/migrations/ | tail -1`
2. **Cruthaigh an comhad**: `NNN_my_change.sql`
3. **Úsáid DDL sábháilte**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Aislíon sonraí go cúramach**: úsáid `UPDATE ... WHERE ...` chun déileáil le rónna atá ann cheana
5. **Déan tástáil ar chóip**: ná rith aistrithe neamhthástáilte ar an gcóras táirgthe riamh

Sampla:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> Tá **athruithe nach bhfuil comhoiriúnach siar** (m.sh., colúin a scriosadh) casta. NÍ thacaíonn OmniRoute le híosghrádú — a luaithe a chuirtear aistriú i bhfeidhm, bíonn an t-athrú scéimre buan. Déan pleanáil dá réir.

---

## Criptiú Sonraí ar Diosca

Déantar réimsí íogaire (eochracha API, comharthaí OAuth, teaghráin cheangail) a chriptiú ar diosca le **AES-256-GCM**.

### Conas a Oibríonn Sé

```ts
// src/lib/db/encryption.ts (simplithe)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### An Áit a nÚsáidtear É

- `provider_connections.api_key` — criptithe ag leibhéal an fheidhmchláir
- `provider_connections.access_token`, `refresh_token`, `id_token` — criptithe ag leibhéal an fheidhmchláir
- Iontrálacha `key_value` ina bhfuil `namespace = "secrets"` — criptithe ag leibhéal an fheidhmchláir
- `proxy_registry.auth` — criptithe ag leibhéal an fheidhmchláir (má tá sé ann)

### Eochair Chriptithe

Díorthaítear an eochair chriptithe ó **phasfhrása** (socraithe tríd an athróg timpeallachta `STORAGE_ENCRYPTION_KEY`) agus ó **shalann** (stóráilte sa bhunachar sonraí). Tá an dá cheann riachtanach chun na sonraí a dhíchriptiú.

```bash
# Gin pasfhrása slán
openssl rand -hex 32

# Socraigh in .env
STORAGE_ENCRYPTION_KEY=<d'eochair>
```

> **Ríthábhachtach**: Má chailltear an eochair chriptithe, caillfear rochtain ar na sonraí criptithe go léir. **Déan cóip chúltaca den eochair ar leithligh ón mbunachar sonraí**.

### Na Rudaí NACH bhfuil Criptithe

Ar chúiseanna feidhmíochta, stóráiltear na nithe seo a leanas mar ghnáth-théacs:

- Ainmneacha taispeána soláthraithe
- Sainmhínithe samhlacha (poiblí cheana)
- Rialacha ródúcháin
- Taifid úsáide (gan PII)

---

## Forchoimeádais maidir le Criptiú (v3.8.16+)

Úsáideann OmniRoute **`migrateLegacyEncryptedString()`** chun dhá scéim chriptithe a láimhseáil go trédhearcach:

- **Oidhreachta** (roimh v3.5.0): "criptiú" bunaithe ar XOR (ní fíorchripteagrafaíocht é)
- **Reatha**: AES-256-GCM le IV ceart agus clib fíordheimhnithe

Aimsíonn an cúntóir imirce an fhormáid oidhreachta agus athchriptíonn sé í leis an scéim nua ar an gcéad léamh. Ciallaíonn sé seo gur féidir leat seanbhunachar sonraí a uasghrádú gan dintiúir a chailleadh.

---

## Taisce Léite

I gcás sonraí a léitear go minic (samhlacha, soláthraithe, socruithe), soláthraíonn `readCache.ts` **taisce sa chuimhne**:

```ts
// Taiscthe ag am tosaithe, neamhbhailíochtaithe nuair a scríobhtar
const providers = await getCachedProviders(); // Tapa, sa chuimhne
const fresh = await listProviders(); // Mall, téann chuig an mbunachar sonraí
```

| Aonán taiscthe         | Eochair thaisce | TTL                  |
| ---------------------- | --------------- | -------------------- |
| `models`               | `models:v1`     | Go dtí go scríobhtar |
| `provider_connections` | `providers:v1`  | Go dtí go scríobhtar |
| `settings`             | `settings:v1`   | Go dtí go scríobhtar |
| `combos`               | `combos:v1`     | Go dtí go scríobhtar |

Déantar an taisce a neamhbhailíochtú gach uair a scríobhtar sa tábla comhfhreagrach.

---

## Cúltaca agus Aisghabháil

### Cúltaca de Láimh

```bash
# Úsáid an CLI chun cúltaca áitiúil a chruthú
omniroute backup create --name pre-migration

# Nó tríd an API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Áirítear sa chomhad cúltaca:

- Gach tábla sa bhunachar sonraí (srathaithe go JSON)
- Déantáin loga glaonna (ionchódaithe le base64, roghnach)
- Socruithe + rúin (criptithe)
- Cumraíocht breiseán

### Athchóiriú

```bash
# Tríd an CLI
omniroute restore pre-migration

# Tríd an API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Rabhadh**: Forscríobhann an t-athchóiriú an bunachar sonraí iomlán. Stop gach cliant ar dtús.

### Cúltacaí Uathoibrithe

```bash
# Cumasaigh cúltacaí laethúla uathoibrithe tríd an CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

Ritheann jab cúlra an sceideal ar thaobh an fhreastalaí gach 30 soicind
(de réir réamhshocraithe) agus déanann sé an slonn cron a mheas de réir am áitiúil an fhreastalaí.

| Athróg                                      | Réamhshocrú | Cur síos                                                                                                                                                |
| ------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`     | Eatramh ticeáilte ina ms (`5000` ar a laghad). Caithfidh sé a bheith níos giorra ná 60 s chun teacht go hiontaofa laistigh den nóiméad cron meaitseála. |

### Cúltaca Beo SQLite

Chun cúltaca a dhéanamh de bhunachar sonraí beo gan aga neamhfhónaimh:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Úsáideann sé seo API cúltaca ar líne SQLite — tá sé sábháilte é a rith agus OmniRoute ar siúl.

---

## Tiúnadh Feidhmíochta

### Mód WAL

Tá WAL cumasaithe de réir réamhshocraithe. I gcás ualaí oibre ina ndéantar mórán scríbhneoireachta, smaoinigh ar:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Seicphointe gach 1000 leathanach
PRAGMA journal_size_limit = 67108864;  -- Teorainn WAL de 64MB
```

### Innéacsanna

Príomhinnéacsanna le haghaidh feidhmíochta (cruthaítear go huathoibríoch iad trí ascnaimh):

- `idx_models_provider` — cuardaigh samhlacha de réir soláthraí
- `idx_combo_targets_combo_id` — leathnú sprice teaglama
- `idx_usage_history_api_key_timestamp` — anailísíocht úsáide
- `idx_quota_snapshots_api_key_window` — rianú cuótaí
- `idx_call_logs_timestamp` — iarratais ar logaí glaonna

Chun innéacs nua a chur leis, cruthaigh ascnaimh:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/A Mapáilte sa Chuimhne

I gcás bunachair sonraí an-mhór (>10GB), is féidir mapáil chuimhne a choigeartú trí pragma SQLite:

```sql
-- Socraigh trí pragma SQLite (coigeartaigh in core.ts nó ag am rite)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Dlúthú

Baineann áscanna OmniRoute a ritheann ar feadh tréimhsí fada tairbhe as `VACUUM` ó am go chéile:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Rith go míosúil le linn tréimhsí ísealtráchta. (Laghdaíonn mód WAL an gá leis, ach ní chuireann sé deireadh leis.)

---

## Seiceáil Sláinte

Soláthraíonn `src/lib/db/healthCheck.ts` **diagnóisic sláinte ar leibhéal an bhunachair sonraí**:

Teastaíonn fíordheimhniú ón dá bhriathar (`401` murach sin). Ní dhéanann `GET` ach diagnóis; ritheann `POST` an tseiceáil chéanna agus `autoRepair` cumasaithe.

```bash
GET  /api/db/health   # diagnóisigh
POST /api/db/health   # diagnóisigh + deisigh
```

Is é an freagra an `DbHealthCheckResult` a tháirgeann `runDbHealthCheck()`
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

| Réimse            | Brí                                                                                                                                                                           |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` nuair atá `issues` folamh. Ní bhíonn tionchar ag `driver` air riamh.                                                                                                   |
| `issues[].type`   | Ceann amháin de `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                              |
| `repairedCount`   | Rónna a deisíodh le linn an rite seo; `0` i gcónaí nuair atá `autoRepair` bréagach.                                                                                           |
| `backupCreated`   | Ar cruthaíodh cúltaca roimh an deisiú.                                                                                                                                        |
| `checkedAt`       | Stampa ama ISO atá comhroinnte ag an rith agus ag aon nóta deisiúcháin a scríobhann sé.                                                                                       |
| `driver.name`     | An tiománaí SQLite a fhreastalaíonn ar an mbunachar sonraí a seiceáladh.                                                                                                      |
| `driver.degraded` | `true` nuair nach bhfuil scríbhinní tacaithe go buan ag comhad an bhunachair sonraí — cúltaca WASM `sql.js` (marthanacht an chomhaid iomláin) nó bunachar sonraí sa chuimhne. |

Tugann uirlis MCP `omniroute_db_health_check` an pálasta céanna ar ais.

Rith `PRAGMA integrity_check` chun éilliú a bhrath:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Ba cheart dó seo a phriontáil: ok
```

Má thugann sé aon rud seachas `ok` ar ais, **stop den bhunachar sonraí a úsáid láithreach** agus aisghabh ó chúltaca é.

---

## Athshlánú ó Thubaiste

### Cás 1: Comhad WAL Caillte

Tá an comhad `-wal` ar iarraidh ach tá `-shm` agus an príomhbhunachar sonraí slán:

```bash
# Athshlánaítear go huathoibríoch é an chéad uair eile a osclaítear é
omniroute
```

Mura féidir le SQLite athshlánú go huathoibríoch:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Cás 2: Príomhchomhad an Bhunachair Sonraí Truaillithe

Athchóirigh ó chúltaca:

```bash
omniroute sync pull --merge   # nó: omniroute backup restore <backup-id>
```

### Cás 3: Eochair Chriptithe Caillte

**Ní féidir athshlánú a dhéanamh** gan an eochair. Ní féidir na réimsí criptithe a léamh. Cuir na soláthraithe uile leis arís de láimh le dintiúir nua.

> **Maolú**: Déan cúltaca den eochair chriptithe ar leithligh i gcónaí, i mbainisteoir focal faire nó in KMS más féidir.

### Cás 4: Diosca Lán

Seolfaidh SQLite earráidí `SQLITE_FULL` ar ais. Saor spás diosca, agus ansin:

```bash
# Cruthaigh seicphointe WAL chun spás a shaoradh
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Oibríochtaí Coitianta

### Iniúchadh ar Thábla

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Líon na Rónna i ngach Tábla

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Athshocrú (Glanadh) na Sonraí Uile

```bash
# Stop OmniRoute ar dtús
omniroute stop

# Scrios an comhad DB
rm ~/.omniroute/storage.sqlite*

# Atosaigh (athchruthófar DB folamh)
omniroute
```

Le haghaidh athshocrú **roghnach** (coinnigh soláthraithe, glan úsáid):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Easpórtáil Tábla Aonair

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Fabhtcheartú

### "Tá an bunachar sonraí glasáilte"

Tá glas scríofa á choinneáil ag próiseas eile. Déan ceann díobh seo:

- Fan go gcríochnóidh an próiseas eile (seiceáil `lsof | grep storage.sqlite`)
- Cuir deireadh leis an bpróiseas eile
- Má mhaireann an fhadhb, atosaigh OmniRoute

### "Theip ar shrian na heochrach coigríche"

Tá modúl fearainn ag sárú sláine thagartha. Seiceáil:

- Rónna dílleachtacha i dtáblaí spleácha
- Scriosanna cascáideacha nár forleathnaíodh
- Ascnamh le déanaí a d'athraigh eochair choigríche

Rith `PRAGMA foreign_key_check;` chun sáruithe a aimsiú.

### "Cuimhne ídithe"

Tá I/A cuimhne-mhapáilte SQLite ag dul thar theorainn an chórais oibriúcháin. Laghdaigh í trí pragma SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB in ionad 256MB
```

Nó díchumasaigh í:

```sql
PRAGMA mmap_size = 0;
```

### "Theip ar an ascnamh leath bealaigh tríd"

Rith an t-ascnamh in idirbheart, mar sin ba cheart gur rolladh siar é. Murar rolladh:

1. **Stop OmniRoute** (cuir cosc ar iarrachtaí breise)
2. **Seiceáil staid an DB** le `sqlite3`
3. **Deisigh de láimh** an t-ascnamh páirteach
4. **Rith OmniRoute arís** (bainfear triail eile as an ascnamh)

Chun é seo a chosc, déan ascnaimh a thástáil ar chóip ar dtús i gcónaí.

---

## Féach Freisin

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — táblaí úsáide
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monatóireacht sláinte
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — sreabhadh eisiúna
- Foinse: `src/lib/db/` (80+ comhad, ~25K líne chóid)
