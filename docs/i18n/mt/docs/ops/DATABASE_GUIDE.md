# Database Schema & Operations Guide (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **Fil-qosor**: OmniRoute juża **SQLite bil-ġurnalar WAL** bħala l-ħażna primarja tiegħu, b’kriptaġġ **AES-256-GCM** għad-data maħżuna għal oqsma sensittivi. Din il-gwida tkopri l-iskema, il-migrazzjonijiet, il-backup/irkupru, u l-proċeduri operattivi.

**Sorsi:**

- `src/lib/db/core.ts` — istanza unika + SCHEMA_SQL (17-il tabella bażi)
- `src/lib/db/migrationRunner.ts` — migrazzjonijiet bil-verżjonijiet
- `src/lib/db/migrations/` — 167 fajl SQL bil-verżjonijiet
- `src/lib/db/encryption.ts` — funzjonijiet ta’ għajnuna għall-kriptaġġ
- `src/lib/db/backup.ts` — esportazzjoni/importazzjoni tal-backup
- `src/lib/db/healthCheck.ts` — dijanjostika tal-istat tas-sistema

---

## Għaliex SQLite?

OmniRoute għażel SQLite minflok PostgreSQL/MySQL għal diversi raġunijiet:

| Fattur             | SQLite                                      | PostgreSQL                                     |
| ------------------ | ------------------------------------------- | ---------------------------------------------- |
| **Installazzjoni** | Inkorporat — ebda server separat            | Jeħtieġ il-konfigurazzjoni ta’ server          |
| **Kriptaġġ**       | Fis-saff tal-applikazzjoni (AES-256-GCM)    | TDE integrat                                   |
| **Prestazzjoni**   | Aktar veloċi għal tagħbijiet żgħar/medji    | Aħjar għal għadd enormi ta’ kitbiet simultanji |
| **Konkorrenza**    | Il-modalità WAL tippermetti qari simultanju | MVCC sħiħ                                      |
| **Backup**         | Kopja ta’ fajl wieħed                       | `pg_dump` jew snapshot tas-sistema tal-fajls   |
| **Każ ta’ użu**    | Installazzjoni għal kull utent, inkorporat  | SaaS għal diversi klijenti                     |

Għal installazzjonijiet b’**utent wieħed u istanza waħda** (il-każ ta’ użu ewlieni ta’ OmniRoute), SQLite huwa aktar sempliċi u aktar veloċi.

### Ġurnalar WAL

`core.ts` jiftaħ id-database bil-**modalità WAL (Write-Ahead Logging)**:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL jippermetti **qari simultanju** waqt il-kitbiet — importanti għad-dashboard, li jwettaq queries waqt li t-talbiet ikunu qed jiġu rreġistrati.

Id-daqs predefinit tal-cache huwa **65,536 KiB (64 MiB)**. SQLite jinterpreta
`cache_size` negattiv bħala limitu massimu approssimattiv f’KiB u jalloka l-paġni skont il-bżonn.
**Settings > System & Storage > Cache Size** jaċċetta valuri sħaħ minn **1 sa
1,000,000 KiB**; meta tissejvja l-konfigurazzjoni, din tiġi applikata għall-konnessjoni attiva mad-database,
u OmniRoute jirrestawra l-valur maħżun meta jibda.

---

## Post tad-Database

Il-fajl SQLite jinħażen fi:

| OS      | Mogħdija                                                          |
| ------- | ----------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                     |
| macOS   | `~/.omniroute/storage.sqlite`                                     |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                         |
| Docker  | `/app/data/storage.sqlite` (konfigurabbli permezz ta’ `DATA_DIR`) |

Fajls assoċjati:

- `storage.sqlite-wal` — reġistru tal-kitba bil-quddiem
- `storage.sqlite-shm` — fajl tal-memorja kondiviża
- `call_logs/` — artefatti tal-payloads tat-talbiet (jekk attivati)

**Ibdel il-post:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Arkitettura tal-Moduli tad-Dominju

Id-database ta' OmniRoute għandha **110 moduli TypeScript tal-ogħla livell** f'`src/lib/db/`. Kull modulu tad-dominju:

- Huwa responsabbli għal tabella speċifika waħda jew aktar
- Jesporta funzjonijiet CRUD ittajpjati
- Qatt ma jaċċessa t-tabelli ta' modulu ieħor
- Juża `getDbInstance()` minn `core.ts` biex jaċċessa d-DB

### Il-110 Moduli tad-DB tal-Ogħla Livell

OmniRoute għandu **110 fajls TypeScript tal-ogħla livell** f'`src/lib/db/`. Hawn taħt hawn kampjun tal-moduli ewlenin; ara l-lista tad-direttorju għal-lista sħiħa:

| Modulu                  | Tabelli                                                        | Responsabbiltà                                                                             |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | Reġistrazzjoni u kredenzjali tal-fornituri permezz ta' OAuth/API key                       |
| `models.ts`             | `key_value` (data tal-mudelli)                                 | Definizzjonijiet, kapaċitajiet u prezzijiet tal-mudelli                                    |
| `combos.ts`             | `combos`                                                       | Konfigurazzjonijiet u ordni tar-routing tal-combos                                         |
| `apiKeys.ts`            | `api_keys`                                                     | Ċiklu tal-ħajja tal-API keys, scopes u traċċar tal-kwoti                                   |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | Konfigurazzjoni tas-sistema u maħżen KV kondiviż                                           |
| `backup.ts`             | —                                                              | Operazzjonijiet ta' esportazzjoni/importazzjoni tal-backup                                 |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Konfigurazzjonijiet tal-proxy u regoli tar-routing                                         |
| `prompts.ts`            | `prompt_templates`                                             | Mudelli ta' prompts li jistgħu jerġgħu jintużaw u verżjonar                                |
| `webhooks.ts`           | `webhooks`                                                     | Abbonamenti u logs tal-webhooks immexxija minn avvenimenti                                 |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Reġistrazzjoni tal-awditjar għal kull request (fakultattiva, volum għoli)                  |
| `domainState.ts`        | `domain_*` (5 tabelli)                                         | Baġits tad-dominju, circuit breakers, lockouts, ktajjen ta' fallback u storja tal-ispejjeż |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | API keys fil-whitelist għal MCP/A2A                                                        |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | Użu storiku tal-kwoti                                                                      |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Jimmappja l-mudelli għall-combos predefiniti                                               |
| `cliToolState.ts`       | `cli_tool_state`                                               | Stat persistenti speċifiku għas-CLI                                                        |
| `encryption.ts`         | —                                                              | Helpers għall-kriptaġġ/dekriptaġġ tal-fields                                               |
| `readCache.ts`          | —                                                              | Cache fil-memorja għal operazzjonijiet b'ħafna qari                                        |
| `secrets.ts`            | `key_value` (entrati kriptati)                                 | Ħażna kriptata tas-sigrieti                                                                |
| `stateReset.ts`         | —                                                              | Tħassir/reset tal-istat tad-DB għall-ittestjar                                             |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Kuntest tas-sessjoni għat-trasferiment bejn l-aġenti                                       |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | Traċċar tal-użu                                                                            |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Konfigurazzjoni tal-kompressjoni                                                           |

### Konfini tal-Moduli

Regola arkitettonika ewlenija: **il-moduli ma jaċċessawx direttament it-tabelli ta' xulxin**. Biex taħdem bid-data ta' modulu ieħor, importa l-funzjoni minn dak il-modulu.

```ts
// ❌ ĦAŻIN: SQL dirett minn modulu ieħor
db.prepare("SELECT * FROM provider_connections").all();

// ✅ TAJJEB: uża l-funzjoni tal-modulu providers
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

Din ir-regola tiġi infurzata permezz tar-rieżami tal-code — m'hemm l-ebda verifika statika, iżda l-ksur jiġi mmarkat.

---

## Skema Bażi (17-il tabella)

`core.ts` jiddefinixxi s-17-il tabella bażi f’`SCHEMA_SQL`. Dawn jinħolqu mill-migrazzjoni `001_initial_schema.sql` u jiffurmaw l-iskema ewlenija.

### Tabelli Ewlenin (maħluqa fil-migrazzjoni inizjali)

| Tabella                    | Għan                                                | Kolonni ewlenin                                                         |
| -------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Kredenzjali tal-fornitur (kriptaġġati)              | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Informazzjoni dwar ir-routing tan-nodi tal-fornitur | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | Ħażna KV ġenerali                                   | `namespace`, `key`, `value`                                             |
| `combos`                   | Definizzjonijiet tal-kombinazzjonijiet tar-routing  | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Ċwievet tal-API għall-gateway                       | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Metadata tal-bażi tad-data                          | `key`, `value`                                                          |
| `usage_history`            | Rekords tal-użu tat-talbiet                         | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | Payloads u tweġibiet tat-talbiet                    | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Logs tat-talbiet tal-proxy                          | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Ktajjen mill-mudell għall-fornitur                  | `model`, `chain`                                                        |
| `domain_budgets`           | Baġits tal-infiq għal kull dominju                  | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Storja tar-risettjar tal-baġit                      | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Traċċar tal-ispejjeż għal kull dominju              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Stat tal-limitu tar-rata tad-dominju                | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Stat tas-circuit breaker għal kull dominju          | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | Cache tat-tweġibiet tal-LLM                         | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | Snapshots storiċi tal-kwota                         | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### Tabelli Addizzjonali (miżjuda minn migrazzjonijiet sussegwenti)

Migrazzjonijiet sussegwenti jżidu tabelli bħal:

- `cli_tool_state` (migrazzjoni 011) — stat tal-għodda CLI
- Tabelli `mcp_*` — awditjar tas-server MCP
- Tabelli `a2a_*` — stat tal-kompiti A2A
- Tabelli `usage_*` — traċċar tal-użu
- Tabelli `plugin_*` — sistema tal-plugins
- `skill_executions` — storja tal-eżekuzzjoni tal-ħiliet
- Tabelli `memory_*` — sistema tal-memorja
- Tabelli `compression_*` — sistema tal-kompressjoni
- Tabelli `webhook_*` — log tal-konsenja tal-webhooks
- Tabelli `acp_*` — Protokoll tal-Klijent tal-Aġent
- Tabelli `oneproxy_*` — suq ta’ 1proxy
- `proxy_assignments` — rabtiet tal-ambitu tal-proxy
- `detailed_call_artifacts` — metadata tal-artefatti tal-log tas-sejħiet
- `quota_alert_history` — awditjar tat-twissijiet dwar il-kwota
- `command_code_auth_sessions` — sessjonijiet OAuth ta’ Command Code

Il-lista sħiħa ta’ madwar 30+ tabella tinsab f’`src/lib/db/migrations/`.

---

## Migrazzjonijiet

OmniRoute juża **migrazzjonijiet verżjonati u idempotenti** f’`src/lib/db/migrations/`. Kull migrazzjoni hija fajl SQL wieħed bl-isem `NNN_description.sql`.

### Għoti ta’ Ismijiet lill-Migrazzjonijiet

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### Kif Jitħaddmu l-Migrazzjonijiet

Meta tibda l-applikazzjoni, `migrationRunner.ts`:

1. Joħloq it-tabella `_omniroute_migrations` jekk ma teżistix
2. Jivverifika liema migrazzjonijiet diġà ġew applikati
3. Japplika kwalunkwe migrazzjoni ġdida fl-ordni, kull waħda fi tranżazzjoni
4. Jirreġistra kull migrazzjoni applikata flimkien mat-timbru tal-ħin

```ts
// src/lib/db/migrationRunner.ts (issimplifikat)
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

### Idempotenza

Il-migrazzjonijiet iridu jkunu **idempotenti** — jekk jitħaddmu darbtejn, it-tieni darba m’għandha tagħmel l-ebda bidla:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

Uża b’mod estensiv il-klawżoli `IF NOT EXISTS`, `IF EXISTS`, u `OR IGNORE` / `OR REPLACE`.

### Żieda ta’ Migrazzjoni Ġdida

1. **Identifika n-numru li jmiss**: `ls src/lib/db/migrations/ | tail -1`
2. **Oħloq il-fajl**: `NNN_my_change.sql`
3. **Uża DDL sikur**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **Imla d-data retroattivament b’attenzjoni**: uża `UPDATE ... WHERE ...` biex timmaniġġja r-ringieli eżistenti
5. **Ittestja fuq kopja**: qatt tħaddem migrazzjonijiet mhux ittestjati fil-produzzjoni

Eżempju:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **Bidliet mhux kompatibbli b’lura** (eż., it-tneħħija ta’ kolonni) huma diffiċli. OmniRoute MA jappoġġjax downgrade — ladarba migrazzjoni tiġi applikata, il-bidla fl-iskema tkun permanenti. Ippjana kif xieraq.

---

## Kriptaġġ tad-Data Maħżuna

Oqsma sensittivi (ċwievet tal-API, tokens OAuth, strings tal-konnessjoni) jiġu kriptati waqt li jkunu maħżuna bl-użu ta’ **AES-256-GCM**.

### Kif Jaħdem

```ts
// src/lib/db/encryption.ts (issimplifikat)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### Fejn Jintuża

- `provider_connections.api_key` — kriptat fil-livell tal-applikazzjoni
- `provider_connections.access_token`, `refresh_token`, `id_token` — kriptati fil-livell tal-applikazzjoni
- Entrati `key_value` b’`namespace = "secrets"` — kriptati fil-livell tal-applikazzjoni
- `proxy_registry.auth` — kriptat fil-livell tal-applikazzjoni (jekk preżenti)

### Ċavetta tal-Kriptaġġ

Iċ-ċavetta tal-kriptaġġ tiġi derivata minn **passphrase** (issettjata permezz tal-varjabbli tal-ambjent `STORAGE_ENCRYPTION_KEY`) u **salt** (maħżun fid-DB). It-tnejn huma meħtieġa biex tiġi dekriptata d-data.

```bash
# Iġġenera passphrase sigura
openssl rand -hex 32

# Issettjaha f'.env
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **Kritiku**: Jekk titlef iċ-ċavetta tal-kriptaġġ, titlef l-aċċess għad-data kriptata kollha. **Żomm kopja ta’ riżerva taċ-ċavetta separatament mid-database**.

### X’MHUX Kriptat

Għal raġunijiet ta’ prestazzjoni, dawn li ġejjin jinħażnu bħala test sempliċi:

- Ismijiet għall-wiri tal-fornituri
- Definizzjonijiet tal-mudelli (diġà pubbliċi)
- Regoli tar-routing
- Rekords tal-użu (mingħajr PII)

---

## Twissijiet dwar il-Kriptaġġ (v3.8.16+)

OmniRoute juża **`migrateLegacyEncryptedString()`** biex jittratta żewġ skemi ta’ kriptaġġ b’mod trasparenti:

- **Preċedenti** (qabel v3.5.0): “kriptaġġ” ibbażat fuq XOR (mhux kriptografija vera)
- **Attwali**: AES-256-GCM b’IV u tikketta ta’ awtentikazzjoni xierqa

L-għodda awżiljarja tal-migrazzjoni tinduna bil-format preċedenti u terġa’ tikkriptah bl-iskema l-ġdida mal-ewwel qari. Dan ifisser li tista’ taġġorna database qadima mingħajr ma titlef il-kredenzjali.

---

## Cache tal-Qari

Għal data li tinqara ta’ spiss (mudelli, fornituri, settings), `readCache.ts` jipprovdi **cache fil-memorja**:

```ts
// Jinħażen fil-cache waqt l-istartjar u jiġi invalidat mal-kitba
const providers = await getCachedProviders(); // Veloċi, fil-memorja
const fresh = await listProviders(); // Bil-mod, jaċċessa d-DB
```

| Entità fil-cache       | Ċavetta tal-cache | TTL                |
| ---------------------- | ----------------- | ------------------ |
| `models`               | `models:v1`       | Sakemm issir kitba |
| `provider_connections` | `providers:v1`    | Sakemm issir kitba |
| `settings`             | `settings:v1`     | Sakemm issir kitba |
| `combos`               | `combos:v1`       | Sakemm issir kitba |

Il-cache jiġi invalidat ma’ kull kitba fit-tabella korrispondenti.

---

## Backup u Rkupru

### Backup Manwali

```bash
# Uża s-CLI biex toħloq backup lokali
omniroute backup create --name pre-migration

# Jew permezz tal-API
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

Il-fajl tal-backup jinkludi:

- It-tabelli kollha tad-DB (serializzati għal JSON)
- Artifatti tar-reġistru tas-sejħiet (ikkodifikati b’base64, fakultattivi)
- Settings + sigrieti (ikkriptati)
- Konfigurazzjoni tal-plugin

### Restawr

```bash
# Permezz tas-CLI
omniroute restore pre-migration

# Permezz tal-API
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **Twissija**: Ir-restawr jissostitwixxi d-DB kollha. Waqqaf il-klijenti kollha l-ewwel.

### Backups Awtomatizzati

```bash
# Attiva backups awtomatizzati ta’ kuljum permezz tas-CLI
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

L-iskeda tiġi eżegwita fuq in-naħa tas-server minn kompitu fl-isfond li jiġi attivat kull 30 sekonda
(b’mod awtomatiku) u jevalwa l-espressjoni cron skont il-ħin lokali tas-server.

| Varjabbli                                   | Valur awtomatiku | Deskrizzjoni                                                                                                                             |
| ------------------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`          | Intervall ta’ attivazzjoni f’ms (minimu `5000`). Għandu jkun iqsar minn 60 s biex jaqa’ b’mod affidabbli fil-minuta cron korrispondenti. |

### Backup Attiv ta’ SQLite

Għal backup mingħajr waqfien tas-servizz ta’ DB attiva:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

Dan juża l-API tal-backup online ta’ SQLite — jista’ jitħaddem b’mod sikur waqt li OmniRoute jkun qed jaħdem.

---

## Ottimizzazzjoni tal-Prestazzjoni

### Modalità WAL

WAL hija attivata b’mod awtomatiku. Għal ammonti ta’ xogħol b’ħafna kitbiet, ikkunsidra:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- Oħloq checkpoint kull 1000 paġna
PRAGMA journal_size_limit = 67108864;  -- Limitu WAL ta’ 64MB
```

### Indiċijiet

Indiċijiet ewlenin għall-prestazzjoni (jinħolqu awtomatikament mill-migrazzjonijiet):

- `idx_models_provider` — tiftix ta’ mudelli skont il-fornitur
- `idx_combo_targets_combo_id` — espansjoni tal-miri ta’ kombinazzjoni
- `idx_usage_history_api_key_timestamp` — analitika tal-użu
- `idx_quota_snapshots_api_key_window` — traċċar tal-kwoti
- `idx_call_logs_timestamp` — mistoqsijiet fir-reġistru tas-sejħiet

Biex iżżid indiċi ġdid, oħloq migrazzjoni:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### I/O Immappjat fil-Memorja

Għal databases kbar ħafna (>10GB), l-immappjar tal-memorja jista’ jiġi aġġustat permezz ta’ pragma ta’ SQLite:

```sql
-- Issettja permezz ta’ pragma ta’ SQLite (aġġusta f’core.ts jew waqt l-eżekuzzjoni)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### Kumpattazzjoni

L-istanzi ta’ OmniRoute li jibqgħu jaħdmu għal żmien twil jibbenefikaw minn `VACUUM` okkażjonali:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

Ħaddmu kull xahar matul perjodi bi ftit traffiku. (Il-modalità WAL tnaqqas il-ħtieġa, iżda ma teliminahiex.)

---

## Kontroll tas-Saħħa

`src/lib/db/healthCheck.ts` jipprovdi **dijanjostika tas-saħħa fil-livell tad-DB**:

Iż-żewġ verbi jeħtieġu awtentikazzjoni (`401` inkella). `GET` iwettaq dijanjosi biss; `POST` iwettaq l-istess
kontroll b’`autoRepair` attivat.

```bash
GET  /api/db/health   # wettaq dijanjosi
POST /api/db/health   # wettaq dijanjosi + tiswija
```

Ir-rispons huwa d-`DbHealthCheckResult` prodott minn `runDbHealthCheck()`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Il-baġits tad-dominji rreferew għal ċwievet API li m’għadhomx jeżistu.",
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

| Kamp              | Tifsira                                                                                                                                                              |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `true` meta `issues` tkun vojta. `driver` qatt ma jinfluwenzaha.                                                                                                     |
| `issues[].type`   | Wieħed minn `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`.                                                                         |
| `repairedCount`   | Ringieli imsewwija matul din l-eżekuzzjoni; dejjem `0` meta `autoRepair` tkun falza.                                                                                 |
| `backupCreated`   | Jekk inħoloqx backup qabel it-tiswija.                                                                                                                               |
| `checkedAt`       | Timestamp ISO kondiviż mill-eżekuzzjoni u minn kwalunkwe nota ta’ tiswija li tikteb.                                                                                 |
| `driver.name`     | Id-driver ta’ SQLite li qed iservi d-database kkontrollata.                                                                                                          |
| `driver.degraded` | `true` meta l-kitbiet ma jkunux sostnuti b’mod persistenti mill-fajl tad-database — il-fallback WASM `sql.js` (persistenza tal-fajl kollu) jew database fil-memorja. |

L-istess payload jintbagħat lura mill-għodda MCP `omniroute_db_health_check`.

Ħaddem `PRAGMA integrity_check` biex tiskopri korruzzjoni:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# Għandu jistampa: ok
```

Jekk jirritorna xi ħaġa oħra għajr `ok`, **ieqaf uża d-database immedjatament** u rrestawraha minn backup.

---

## Irkupru minn Diżastru

### Xenarju 1: Il-Fajl WAL Intilef

Il-fajl `-wal` huwa nieqes, iżda `-shm` u d-DB prinċipali għadhom intatti:

```bash
# Jirkupra awtomatikament mal-ftuħ li jmiss
omniroute
```

Jekk SQLite ma jkunx jista’ jirkupra awtomatikament:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### Xenarju 2: Il-Fajl tad-DB Prinċipali Ġarrab Ħsara

Irrestawra mill-backup:

```bash
omniroute sync pull --merge   # jew: omniroute backup restore <backup-id>
```

### Xenarju 3: Iċ-Ċavetta tal-Kriptaġġ Intilfet

**L-irkupru mhuwiex possibbli** mingħajr iċ-ċavetta. L-oqsma kriptati ma jistgħux jinqraw. Erġa’ żid il-fornituri kollha manwalment bi kredenzjali ġodda.

> **Mitigazzjoni**: Dejjem agħmel backup separat taċ-ċavetta tal-kriptaġġ, idealment f’maniġer tal-passwords jew KMS.

### Xenarju 4: Id-Diska Mimlija

SQLite jirritorna żbalji `SQLITE_FULL`. Illibera spazju fuq id-diska, imbagħad:

```bash
# Agħmel checkpoint tal-WAL biex tillibera l-ispazju
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## Operazzjonijiet Komuni

### Spezzjona Tabella

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### Għodd ir-Ringieli fit-Tabelli Kollha

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### Irrisettja (Ħassar) id-Data Kollha

```bash
# Waqqaf OmniRoute l-ewwel
omniroute stop

# Ħassar il-fajl tad-DB
rm ~/.omniroute/storage.sqlite*

# Erġa’ ibda (se terġa’ tinħoloq DB vojta)
omniroute
```

Għal risettjar **selettiv** (żomm il-fornituri, ħassar id-data tal-użu):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### Esporta Tabella Waħda

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## Soluzzjoni tal-Problemi

### "Il-bażi tad-data hija msakkra"

Proċess ieħor qed iżomm lock tal-kitba. Tista’:

- Tistenna li jintemm il-proċess l-ieħor (iċċekkja `lsof | grep storage.sqlite`)
- Twaqqaf bil-forza l-proċess l-ieħor
- Jekk il-problema tippersisti, erġa’ ibda OmniRoute

### "Il-limitazzjoni taċ-ċavetta barranija falliet"

Modulu tad-dominju qed jikser l-integrità referenzjali. Iċċekkja:

- Ringieli orfni fit-tabelli dipendenti
- Tħassir kaskata li ma ġiex propagat
- Migrazzjoni reċenti li bidlet ċavetta barranija

Ħaddem `PRAGMA foreign_key_check;` biex issib il-ksur.

### "M’hemmx biżżejjed memorja"

L-I/O immappjat fil-memorja ta’ SQLite qed jaqbeż il-limitu tal-OS. Naqqsu permezz ta’ pragma ta’ SQLite:

```sql
PRAGMA mmap_size = 134217728;  -- 128MB minflok 256MB
```

Jew iddiżattivah:

```sql
PRAGMA mmap_size = 0;
```

### "Il-migrazzjoni falliet f’nofsha"

Il-migrazzjoni twettqet fi tranżazzjoni, għalhekk suppost treġġgħet lura. Jekk le:

1. **Waqqaf OmniRoute** (evita aktar tentattivi)
2. **Iċċekkja l-istat tad-DB** b’`sqlite3`
3. **Irranġa manwalment** il-migrazzjoni parzjali
4. **Erġa’ ħaddem** OmniRoute (il-migrazzjoni terġa’ tiġi ppruvata)

Biex tevita dan, dejjem ittestja l-migrazzjonijiet fuq kopja l-ewwel.

---

## Ara Wkoll

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — tabelli tal-użu
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — monitoraġġ tal-istat
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — fluss tar-rilaxx
- Sors: `src/lib/db/` (80+ fajl, ~25K linja ta’ kodiċi)
