# Database Schema & Operations Guide (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute ले आफ्नो प्राथमिक भण्डारका रूपमा **WAL journaling सहितको SQLite** प्रयोग गर्छ, र संवेदनशील फिल्डहरूका लागि स्थिर अवस्थामा **AES-256-GCM** इन्क्रिप्सन प्रयोग गर्छ। यस गाइडले स्किमा, माइग्रेसन, ब्याकअप/रिकभरी, र सञ्चालनसम्बन्धी रनबुकहरू समेट्छ।

**स्रोतहरू:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 आधारभूत तालिकाहरू)
- `src/lib/db/migrationRunner.ts` — संस्करणयुक्त माइग्रेसनहरू
- `src/lib/db/migrations/` — 167 संस्करणयुक्त SQL फाइलहरू
- `src/lib/db/encryption.ts` — इन्क्रिप्सन सहायकहरू
- `src/lib/db/backup.ts` — ब्याकअप निर्यात/आयात
- `src/lib/db/healthCheck.ts` — स्वास्थ्य निदान

---

## SQLite किन?

OmniRoute ले PostgreSQL/MySQL को सट्टा SQLite रोज्नुका धेरै कारणहरू छन्:

| पक्ष              | SQLite                                | PostgreSQL                         |
| ----------------- | ------------------------------------- | ---------------------------------- |
| **डिप्लोयमेन्ट**  | एम्बेडेड — छुट्टै सर्भर आवश्यक पर्दैन | सर्भर सेटअप आवश्यक पर्छ            |
| **इन्क्रिप्सन**   | एप्लिकेसन-स्तर (AES-256-GCM)          | बिल्ट-इन TDE                       |
| **कार्यसम्पादन**  | साना/मध्यम कार्यभारका लागि छिटो       | अत्यधिक समवर्ती लेखनका लागि राम्रो |
| **समवर्तिता**     | WAL मोडले समवर्ती पठन सम्भव बनाउँछ    | पूर्ण MVCC                         |
| **ब्याकअप**       | एकल-फाइल प्रतिलिपि                    | `pg_dump` वा फाइलसिस्टम स्न्यापसट  |
| **प्रयोग अवस्था** | प्रति-प्रयोगकर्ता स्थापना, एम्बेडेड   | बहु-टेनेन्ट SaaS                   |

**एकल-प्रयोगकर्ता, एकल-इन्स्ट्यान्स** डिप्लोयमेन्टहरूका लागि (OmniRoute को प्राथमिक प्रयोग अवस्था), SQLite अझ सरल र छिटो छ।

### WAL जर्नलिङ

`core.ts` ले डेटाबेसलाई **WAL (Write-Ahead Logging) मोड** मा खोल्छ:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL ले लेखन भइरहेका बेला **समवर्ती पठन** सम्भव बनाउँछ — अनुरोधहरू रेकर्ड भइरहेका बेला क्वेरी गर्ने ड्यासबोर्डका लागि यो महत्त्वपूर्ण छ।

पूर्वनिर्धारित क्यास आकार **65,536 KiB (64 MiB)** हो। SQLite ले ऋणात्मक
`cache_size` लाई KiB मा अनुमानित अधिकतम सीमाका रूपमा व्याख्या गर्छ र आवश्यकताअनुसार पृष्ठहरू आवंटन गर्छ।
**सेटिङहरू > प्रणाली र भण्डारण > क्यास आकार** ले **1 देखि
1,000,000 KiB** सम्मका पूर्णाङ्क मानहरू स्वीकार गर्छ; सेटिङ सेभ गर्दा त्यो चालु डेटाबेस जडानमा लागू हुन्छ,
र OmniRoute ले स्टार्टअपमा कायम गरिएको मान पुनर्स्थापना गर्छ।

---

## डेटाबेसको स्थान

SQLite फाइल यहाँ भण्डारण हुन्छ:

| OS      | पथ                                                                |
| ------- | ----------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                     |
| macOS   | `~/.omniroute/storage.sqlite`                                     |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                         |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` मार्फत कन्फिगर गर्न सकिने) |

सहायक फाइलहरू:

- `storage.sqlite-wal` — अग्रिम-लेखन लग
- `storage.sqlite-shm` — साझा मेमोरी फाइल
- `call_logs/` — अनुरोध पेलोड आर्टिफ्याक्टहरू (सक्षम पारिएको भए)

**स्थान ओभरराइड गर्नुहोस्:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## डोमेन मोड्युल आर्किटेक्चर

OmniRoute को डेटाबेसमा `src/lib/db/` भित्र **110 वटा शीर्ष-स्तरीय TypeScript मोड्युलहरू** छन्। प्रत्येक डोमेन मोड्युलले:

- एक वा बढी विशिष्ट तालिकाहरूको स्वामित्व लिन्छ
- टाइप गरिएका CRUD प्रकार्यहरू निर्यात गर्छ
- अर्को मोड्युलका तालिकाहरू कहिल्यै प्रयोग गर्दैन
- DB पहुँच गर्न `core.ts` बाट `getDbInstance()` प्रयोग गर्छ

### 110 वटा शीर्ष-स्तरीय DB मोड्युलहरू

OmniRoute मा `src/lib/db/` भित्र **110 वटा शीर्ष-स्तरीय TypeScript फाइलहरू** छन्। तल मुख्य मोड्युलहरूको नमुना दिइएको छ; पूर्ण सूचीका लागि डाइरेक्टरी सूची हेर्नुहोस्:

| मोड्युल                 | तालिकाहरू                                                      | जिम्मेवारी                                                              |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API कुञ्जी प्रदायक दर्ता र प्रमाणपत्रहरू                          |
| `models.ts`             | `key_value` (मोडेल डेटा)                                       | मोडेल परिभाषा, क्षमताहरू र मूल्य निर्धारण                               |
| `combos.ts`             | `combos`                                                       | कम्बो राउटिङ कन्फिगरेसन र क्रम निर्धारण                                 |
| `apiKeys.ts`            | `api_keys`                                                     | API कुञ्जीको जीवनचक्र, स्कोपहरू र कोटा ट्र्याकिङ                        |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | प्रणाली कन्फिगरेसन र साझा KV भण्डार                                     |
| `backup.ts`             | —                                                              | ब्याकअप निर्यात/आयात सञ्चालनहरू                                         |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | प्रोक्सी कन्फिगरेसन र राउटिङ नियमहरू                                    |
| `prompts.ts`            | `prompt_templates`                                             | पुनः प्रयोग गर्न मिल्ने प्रम्प्ट टेम्प्लेटहरू र संस्करण व्यवस्थापन      |
| `webhooks.ts`           | `webhooks`                                                     | घटनाद्वारा सञ्चालित वेबहुक सदस्यताहरू र लगहरू                           |
| `detailedLogs.ts`       | `request_detail_logs`                                          | प्रत्येक अनुरोधको अडिट लगिङ (वैकल्पिक, उच्च परिमाण)                     |
| `domainState.ts`        | `domain_*` (5 वटा तालिका)                                      | डोमेन बजेटहरू, सर्किट ब्रेकरहरू, लकआउटहरू, फलब्याक चेनहरू र लागत इतिहास |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A का लागि अनुमति-सूचीमा राखिएका API कुञ्जीहरू                     |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ऐतिहासिक कोटा प्रयोग                                                    |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | मोडेलहरूलाई पूर्वनिर्धारित कम्बोहरूसँग म्याप गर्ने                      |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-विशिष्ट स्थायी अवस्था                                               |
| `encryption.ts`         | —                                                              | फिल्डहरू इन्क्रिप्ट/डिक्रिप्ट गर्ने सहायकहरू                            |
| `readCache.ts`          | —                                                              | धेरै पढिने सञ्चालनहरूका लागि इन-मेमोरी क्यास                            |
| `secrets.ts`            | `key_value` (इन्क्रिप्ट गरिएका प्रविष्टिहरू)                   | इन्क्रिप्ट गरिएको गोप्य जानकारी भण्डारण                                 |
| `stateReset.ts`         | —                                                              | परीक्षणका लागि DB अवस्था मेटाउने/रिसेट गर्ने                            |
| `contextHandoffs.ts`    | `context_handoffs`                                             | एजेन्ट हस्तान्तरणका लागि सत्र सन्दर्भ                                   |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | प्रयोग ट्र्याकिङ                                                        |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | कम्प्रेसन कन्फिगरेसन                                                    |

### मोड्युल सीमाहरू

एउटा मुख्य आर्किटेक्चरल नियम: **मोड्युलहरूले एकअर्काका तालिकाहरूमा प्रत्यक्ष पहुँच गर्दैनन्**। अर्को मोड्युलको डेटासँग काम गर्न, उक्त मोड्युलबाट प्रकार्य आयात गर्नुहोस्।

```ts
// ❌ गलत: अर्को मोड्युलबाट प्रत्यक्ष SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ सही: providers मोड्युलको प्रकार्य प्रयोग गर्नुहोस्
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

यो नियम कोड समीक्षामार्फत लागू गरिन्छ — कुनै स्थिर जाँच छैन, तर उल्लङ्घनहरू चिन्हित गरिन्छ।

---

## आधारभूत स्किमा (17 तालिका)

`core.ts` ले `SCHEMA_SQL` मा रहेका 17 आधारभूत तालिका परिभाषित गर्छ। यी migration `001_initial_schema.sql` द्वारा सिर्जना गरिन्छन् र मूल स्किमा बनाउँछन्।

### मूल तालिकाहरू (प्रारम्भिक migration मा सिर्जना गरिएका)

| तालिका                     | उद्देश्य                                  | मुख्य स्तम्भहरू                                                         |
| -------------------------- | ----------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | Provider का प्रमाणहरू (encrypted)         | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Provider node को routing जानकारी          | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | सामान्य KV store                          | `namespace`, `key`, `value`                                             |
| `combos`                   | Routing combo का परिभाषाहरू               | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Gateway का लागि API keys                  | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | Database metadata                         | `key`, `value`                                                          |
| `usage_history`            | अनुरोध प्रयोगका अभिलेखहरू                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | अनुरोध payload र responses                | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Proxy अनुरोध logs                         | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Model-to-provider chains                  | `model`, `chain`                                                        |
| `domain_budgets`           | प्रत्येक domain का खर्च budgets           | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | Budget reset इतिहास                       | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | प्रत्येक domain को लागत tracking          | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domain rate-limit अवस्था                  | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | प्रत्येक domain को circuit breaker अवस्था | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM response cache                        | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ऐतिहासिक quota snapshots                  | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### अतिरिक्त तालिकाहरू (पछिल्ला migrations द्वारा थपिएका)

त्यसपछिका migrations ले निम्नजस्ता तालिकाहरू थप्छन्:

- `cli_tool_state` (migration 011) — CLI tool को अवस्था
- `mcp_*` तालिकाहरू — MCP server audit
- `a2a_*` तालिकाहरू — A2A task को अवस्था
- `usage_*` तालिकाहरू — प्रयोग tracking
- `plugin_*` तालिकाहरू — plugin प्रणाली
- `skill_executions` — skill execution इतिहास
- `memory_*` तालिकाहरू — memory प्रणाली
- `compression_*` तालिकाहरू — compression प्रणाली
- `webhook_*` तालिकाहरू — webhook delivery log
- `acp_*` तालिकाहरू — Agent Client Protocol
- `oneproxy_*` तालिकाहरू — 1proxy marketplace
- `proxy_assignments` — proxy scope bindings
- `detailed_call_artifacts` — call log artifacts metadata
- `quota_alert_history` — quota alert audit
- `command_code_auth_sessions` — Command Code OAuth sessions

~30+ तालिकाहरूको पूर्ण सूची `src/lib/db/migrations/` मा छ।

---

## माइग्रेसनहरू

OmniRoute ले `src/lib/db/migrations/` मा **संस्करणयुक्त, आइडेम्पोटेन्ट माइग्रेसनहरू** प्रयोग गर्छ। प्रत्येक माइग्रेसन `NNN_description.sql` नाम दिइएको एउटा SQL फाइल हुन्छ।

### माइग्रेसनको नामकरण

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### माइग्रेसनहरू कसरी चल्छन्

सुरु हुँदा, `migrationRunner.ts` ले:

1. `_omniroute_migrations` तालिका अवस्थित नभए सिर्जना गर्छ
2. पहिले नै लागू गरिएका माइग्रेसनहरूका लागि क्वेरी गर्छ
3. प्रत्येकलाई एउटा ट्रान्ज्याक्सनमा राखेर, कुनै पनि नयाँ माइग्रेसनहरू क्रमअनुसार लागू गर्छ
4. लागू गरिएको प्रत्येक माइग्रेसनलाई टाइमस्ट्याम्पसहित अभिलेख गर्छ

```ts
// src/lib/db/migrationRunner.ts (सरलीकृत)
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

### आइडेम्पोटेन्सी

माइग्रेसनहरू **आइडेम्पोटेन्ट** हुनुपर्छ — तिनलाई दुईपटक चलाउँदा कुनै कार्य हुनु हुँदैन:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, र `OR IGNORE` / `OR REPLACE` क्लजहरू आवश्यकताअनुसार प्रशस्त रूपमा प्रयोग गर्नुहोस्।

### नयाँ माइग्रेसन थप्ने

1. **अर्को नम्बर पहिचान गर्नुहोस्**: `ls src/lib/db/migrations/ | tail -1`
2. **फाइल सिर्जना गर्नुहोस्**: `NNN_my_change.sql`
3. **सुरक्षित DDL प्रयोग गर्नुहोस्**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **सावधानीपूर्वक डेटा ब्याकफिल गर्नुहोस्**: विद्यमान रोहरू सम्हाल्न `UPDATE ... WHERE ...` प्रयोग गर्नुहोस्
5. **प्रतिलिपिमा परीक्षण गर्नुहोस्**: परीक्षण नगरिएका माइग्रेसनहरू प्रोडक्सनमा कहिल्यै नचलाउनुहोस्

उदाहरण:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **पछाडितर्फ असङ्गत परिवर्तनहरू** (जस्तै, स्तम्भहरू हटाउने) जटिल हुन्छन्। OmniRoute ले डाउनग्रेड समर्थन गर्दैन — माइग्रेसन लागू भएपछि, स्किमा परिवर्तन स्थायी हुन्छ। त्यसैअनुसार योजना बनाउनुहोस्।

---

## स्थिर अवस्थामा इन्क्रिप्सन

संवेदनशील फिल्डहरू (API कुञ्जीहरू, OAuth टोकनहरू, कनेक्सन स्ट्रिङहरू) स्थिर अवस्थामा **AES-256-GCM** प्रयोग गरेर इन्क्रिप्ट गरिन्छन्।

### यसले कसरी काम गर्छ

```ts
// src/lib/db/encryption.ts (सरलीकृत)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### यो कहाँ प्रयोग हुन्छ

- `provider_connections.api_key` — एप्लिकेसन तहमा इन्क्रिप्ट गरिएको
- `provider_connections.access_token`, `refresh_token`, `id_token` — एप्लिकेसन तहमा इन्क्रिप्ट गरिएको
- `namespace = "secrets"` भएका `key_value` प्रविष्टिहरू — एप्लिकेसन तहमा इन्क्रिप्ट गरिएको
- `proxy_registry.auth` — एप्लिकेसन तहमा इन्क्रिप्ट गरिएको (उपस्थित भएमा)

### इन्क्रिप्सन कुञ्जी

इन्क्रिप्सन कुञ्जी एउटा **पासफ्रेज** (`STORAGE_ENCRYPTION_KEY` env var मार्फत सेट गरिएको) र एउटा **साल्ट** (DB मा भण्डारण गरिएको) बाट व्युत्पन्न गरिन्छ। डेटा डिक्रिप्ट गर्न दुवै आवश्यक हुन्छन्।

```bash
# सुरक्षित पासफ्रेज उत्पन्न गर्नुहोस्
openssl rand -hex 32

# .env मा सेट गर्नुहोस्
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **अत्यन्त महत्त्वपूर्ण**: इन्क्रिप्सन कुञ्जी हराउनुको अर्थ सबै इन्क्रिप्ट गरिएको डेटामाथिको पहुँच गुमाउनु हो। **कुञ्जीलाई डेटाबेसबाट अलग्गै ब्याकअप गर्नुहोस्**।

### के इन्क्रिप्ट गरिएको छैन

कार्यसम्पादनसम्बन्धी कारणहरूले गर्दा, निम्न कुराहरू प्लेनटेक्स्टमा भण्डारण गरिन्छन्:

- प्रदायकका प्रदर्शन नामहरू
- मोडेल परिभाषाहरू (पहिल्यै सार्वजनिक)
- राउटिङ नियमहरू
- प्रयोग अभिलेखहरू (कुनै PII छैन)

---

## इन्क्रिप्सनसम्बन्धी सावधानीहरू (v3.8.16+)

OmniRoute ले दुईवटा इन्क्रिप्सन योजनालाई पारदर्शी रूपमा व्यवस्थापन गर्न **`migrateLegacyEncryptedString()`** प्रयोग गर्छ:

- **पुरानो** (v3.5.0 भन्दा अघिको): XOR-आधारित "इन्क्रिप्सन" (वास्तविक क्रिप्टोग्राफी होइन)
- **हालको**: उचित IV र प्रमाणीकरण ट्यागसहितको AES-256-GCM

माइग्रेसन सहायकले पुरानो ढाँचा पत्ता लगाउँछ र पहिलो पटक पढ्दा नयाँ योजनाद्वारा पुनः इन्क्रिप्ट गर्छ। यसको अर्थ तपाईंले क्रेडेन्सियलहरू नगुमाई पुरानो डेटाबेस अपग्रेड गर्न सक्नुहुन्छ।

---

## रिड क्यास

बारम्बार पढिने डेटा (मोडेलहरू, प्रदायकहरू, सेटिङहरू) का लागि, `readCache.ts` ले **इन-मेमोरी क्यास** प्रदान गर्छ:

```ts
// स्टार्टअपमा क्यास गरिन्छ, लेख्दा अमान्य बनाइन्छ
const providers = await getCachedProviders(); // छिटो, इन-मेमोरी
const fresh = await listProviders(); // ढिलो, DB पहुँच गर्छ
```

| क्यास गरिएको निकाय     | क्यास कुञ्जी   | TTL        |
| ---------------------- | -------------- | ---------- |
| `models`               | `models:v1`    | लेख्दासम्म |
| `provider_connections` | `providers:v1` | लेख्दासम्म |
| `settings`             | `settings:v1`  | लेख्दासम्म |
| `combos`               | `combos:v1`    | लेख्दासम्म |

सम्बन्धित तालिकामा प्रत्येक पटक लेख्दा क्यास अमान्य बनाइन्छ।

---

## ब्याकअप र पुनःप्राप्ति

### म्यानुअल ब्याकअप

```bash
# स्थानीय ब्याकअप सिर्जना गर्न CLI प्रयोग गर्नुहोस्
omniroute backup create --name pre-migration

# वा API मार्फत
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

ब्याकअप फाइलमा निम्न समावेश हुन्छन्:

- सबै DB तालिकाहरू (JSON मा क्रमबद्ध गरिएका)
- कल लग आर्टिफ्याक्टहरू (base64-इन्कोड गरिएका, वैकल्पिक)
- सेटिङहरू + गोप्य जानकारीहरू (इन्क्रिप्ट गरिएका)
- प्लगइन कन्फिगरेसन

### पुनर्स्थापना

```bash
# CLI मार्फत
omniroute restore pre-migration

# API मार्फत
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **चेतावनी**: पुनर्स्थापनाले सम्पूर्ण DB अधिलेखन गर्छ। पहिले सबै क्लाइन्टहरू रोक्नुहोस्।

### स्वचालित ब्याकअपहरू

```bash
# CLI मार्फत स्वचालित दैनिक ब्याकअपहरू सक्षम गर्नुहोस्
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

तालिका प्रत्येक 30 सेकेन्डमा चल्ने पृष्ठभूमि कार्यद्वारा सर्भर-साइडमा कार्यान्वयन गरिन्छ
(पूर्वनिर्धारित) र स्थानीय सर्भर समयअनुसार cron अभिव्यक्तिको मूल्याङ्कन गरिन्छ।

| भेरिएबल                                     | पूर्वनिर्धारित | विवरण                                                                                                      |
| ------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`        | ms मा टिक अन्तराल (न्यूनतम `5000`)। मिल्दो cron मिनेटभित्र भरपर्दो रूपमा पर्न यो 60 s भन्दा छोटो हुनुपर्छ। |

### SQLite हट ब्याकअप

सञ्चालनमा रहेको DB को शून्य-डाउनटाइम ब्याकअपका लागि:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

यसले SQLite को अनलाइन ब्याकअप API प्रयोग गर्छ — OmniRoute चलिरहेको बेला सञ्चालन गर्न सुरक्षित छ।

---

## कार्यसम्पादन ट्युनिङ

### WAL मोड

WAL पूर्वनिर्धारित रूपमा सक्षम छ। धेरै लेखन हुने कार्यभारका लागि, निम्नलाई विचार गर्नुहोस्:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- प्रत्येक 1000 पृष्ठमा चेकपोइन्ट गर्नुहोस्
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL सीमा
```

### इन्डेक्सहरू

कार्यसम्पादनका लागि मुख्य इन्डेक्सहरू (माइग्रेसनद्वारा स्वतः सिर्जना गरिएका):

- `idx_models_provider` — प्रदायकअनुसार मोडेल खोज
- `idx_combo_targets_combo_id` — कम्बो लक्ष्य विस्तार
- `idx_usage_history_api_key_timestamp` — प्रयोग विश्लेषण
- `idx_quota_snapshots_api_key_window` — कोटा ट्र्याकिङ
- `idx_call_logs_timestamp` — कल लग क्वेरीहरू

नयाँ इन्डेक्स थप्न, एउटा माइग्रेसन सिर्जना गर्नुहोस्:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### मेमोरी-म्याप गरिएको I/O

धेरै ठूला डेटाबेसहरूका लागि (>10GB), SQLite pragma मार्फत मेमोरी म्यापिङ समायोजन गर्न सकिन्छ:

```sql
-- SQLite pragma मार्फत सेट गर्नुहोस् (core.ts वा रनटाइममा समायोजन गर्नुहोस्)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### कम्प्याक्सन

लामो समयसम्म चल्ने OmniRoute इन्स्ट्यान्सहरूले बेलाबेलामा `VACUUM` चलाउँदा लाभ पाउँछन्:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

कम ट्राफिक हुने अवधिमा मासिक रूपमा चलाउनुहोस्। (WAL मोडले यसको आवश्यकता घटाउँछ, तर पूर्ण रूपमा हटाउँदैन।)

---

## स्वास्थ्य जाँच

`src/lib/db/healthCheck.ts` ले **DB-स्तरीय स्वास्थ्य निदान** प्रदान गर्छ:

दुवै क्रियाका लागि प्रमाणीकरण आवश्यक हुन्छ (अन्यथा `401`)। `GET` ले निदान मात्र गर्छ; `POST` ले
`autoRepair` सक्षम गरेर उही जाँच चलाउँछ।

```bash
GET  /api/db/health   # निदान गर्नुहोस्
POST /api/db/health   # निदान + मर्मत गर्नुहोस्
```

प्रतिक्रिया `runDbHealthCheck()` द्वारा उत्पादित `DbHealthCheckResult` हो
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

| फिल्ड             | अर्थ                                                                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` खाली हुँदा `true`। `driver` ले यसलाई कहिल्यै प्रभावित गर्दैन।                                                                 |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` मध्ये एउटा।                                            |
| `repairedCount`   | यो रनका क्रममा मर्मत गरिएका पङ्क्तिहरू; `autoRepair` false हुँदा सधैँ `0`।                                                             |
| `backupCreated`   | मर्मत गर्नुअघि ब्याकअप लिइएको थियो कि थिएन।                                                                                            |
| `checkedAt`       | रन र त्यसले लेख्ने कुनै पनि मर्मत नोटद्वारा साझा गरिएको ISO टाइमस्ट्याम्प।                                                             |
| `driver.name`     | जाँच गरिएको डेटाबेस उपलब्ध गराउने SQLite ड्राइभर।                                                                                      |
| `driver.degraded` | लेखनहरू डेटाबेस फाइलद्वारा स्थायी रूपमा ब्याकअप नहुँदा `true` — `sql.js` WASM fallback (सम्पूर्ण-फाइल स्थायित्व) वा इन-मेमोरी डेटाबेस। |

उही पेलोड `omniroute_db_health_check` MCP उपकरणद्वारा फर्काइन्छ।

करप्सन पत्ता लगाउन `PRAGMA integrity_check` चलाउनुहोस्:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# यसले प्रिन्ट गर्नुपर्छ: ok
```

यदि यसले `ok` बाहेक अरू केही फर्काउँछ भने, **डेटाबेस प्रयोग गर्न तुरुन्तै बन्द गर्नुहोस्** र ब्याकअपबाट पुनर्स्थापना गर्नुहोस्।

---

## विपद् पुनःप्राप्ति

### परिदृश्य 1: WAL फाइल हरायो

`-wal` फाइल हराएको छ तर `-shm` र मुख्य DB सुरक्षित छन्:

```bash
# अर्को पटक खोल्दा स्वतः पुनःप्राप्त हुन्छ
omniroute
```

यदि SQLite ले स्वतः पुनःप्राप्त गर्न सकेन भने:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### परिदृश्य 2: मुख्य DB फाइल बिग्रियो

ब्याकअपबाट पुनर्स्थापना गर्नुहोस्:

```bash
omniroute sync pull --merge   # वा: omniroute backup restore <backup-id>
```

### परिदृश्य 3: इन्क्रिप्सन कुञ्जी हरायो

कुञ्जीबिना **पुनःप्राप्ति सम्भव छैन**। इन्क्रिप्ट गरिएका फिल्डहरू पढ्न सकिँदैनन्। नयाँ प्रमाणहरू प्रयोग गरेर सबै प्रदायकहरू म्यानुअल रूपमा पुनः थप्नुहोस्।

> **जोखिम न्यूनीकरण**: इन्क्रिप्सन कुञ्जीलाई सधैं छुट्टै ब्याकअप गर्नुहोस्, सम्भव भएसम्म पासवर्ड म्यानेजर वा KMS मा।

### परिदृश्य 4: डिस्क भरियो

SQLite ले `SQLITE_FULL` त्रुटिहरू फर्काउनेछ। डिस्कमा ठाउँ खाली गर्नुहोस्, त्यसपछि:

```bash
# ठाउँ खाली गर्न WAL चेकपोइन्ट गर्नुहोस्
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## सामान्य सञ्चालनहरू

### तालिका निरीक्षण गर्नुहोस्

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### सबै तालिकाका पङ्क्तिहरू गणना गर्नुहोस्

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### सबै डेटा रिसेट (मेटाउनुहोस्) गर्नुहोस्

```bash
# पहिले OmniRoute रोक्नुहोस्
omniroute stop

# DB फाइल मेटाउनुहोस्
rm ~/.omniroute/storage.sqlite*

# पुनः सुरु गर्नुहोस् (खाली DB पुनः सिर्जना हुनेछ)
omniroute
```

**छनोटात्मक** रिसेटका लागि (प्रदायकहरू राख्ने, प्रयोगसम्बन्धी डेटा मेटाउने):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### एउटा तालिका निर्यात गर्नुहोस्

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## समस्या निवारण

### "डेटाबेस लक गरिएको छ"

अर्को प्रक्रियाले लेखन लक समातिरहेको छ। निम्नमध्ये कुनै एक गर्नुहोस्:

- अर्को प्रक्रिया समाप्त नभएसम्म पर्खनुहोस् (`lsof | grep storage.sqlite` जाँच गर्नुहोस्)
- अर्को प्रक्रिया बन्द गर्नुहोस्
- समस्या जारी रहेमा OmniRoute पुनः सुरु गर्नुहोस्

### "फरेन की अवरोध असफल भयो"

एउटा डोमेन मोड्युलले सन्दर्भ अखण्डता उल्लङ्घन गरिरहेको छ। निम्न जाँच गर्नुहोस्:

- निर्भर तालिकाहरूमा मूल पङ्क्तिसँग सम्बन्ध नभएका पङ्क्तिहरू
- प्रसारित नभएका क्यास्केडिङ मेटाइहरू
- फरेन की परिवर्तन गरेको हालैको माइग्रेसन

उल्लङ्घनहरू फेला पार्न `PRAGMA foreign_key_check;` चलाउनुहोस्।

### "मेमोरी सकियो"

SQLite को मेमोरी-म्याप गरिएको I/O ले OS को सीमा नाघिरहेको छ। SQLite pragma मार्फत घटाउनुहोस्:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB को सट्टा 128MB
```

वा निष्क्रिय गर्नुहोस्:

```sql
PRAGMA mmap_size = 0;
```

### "माइग्रेसन बीचमै असफल भयो"

माइग्रेसन ट्रान्ज्याक्सनभित्र चलेको थियो, त्यसैले यो रोलब्याक भएको हुनुपर्छ। नभएको भए:

1. **OmniRoute रोक्नुहोस्** (थप प्रयासहरू रोक्न)
2. `sqlite3` प्रयोग गरेर **DB को अवस्था जाँच गर्नुहोस्**
3. आंशिक माइग्रेसनलाई **म्यानुअल रूपमा सच्याउनुहोस्**
4. OmniRoute **पुनः चलाउनुहोस्** (माइग्रेसन पुनः प्रयास गरिनेछ)

यसलाई रोक्न, माइग्रेसनहरूलाई सधैं पहिले प्रतिलिपिमा परीक्षण गर्नुहोस्।

---

## यो पनि हेर्नुहोस्

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — प्रयोगसम्बन्धी तालिकाहरू
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — स्वास्थ्य अनुगमन
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — रिलिज प्रवाह
- स्रोत: `src/lib/db/` (80+ फाइलहरू, ~25K LOC)
