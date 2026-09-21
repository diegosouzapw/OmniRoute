# Database Schema & Operations Guide (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **संक्षेप में**: OmniRoute अपने प्राथमिक स्टोर के रूप में **WAL जर्नलिंग के साथ SQLite** का उपयोग करता है, जिसमें संवेदनशील फ़ील्ड के स्थिर डेटा के लिए **AES-256-GCM** एन्क्रिप्शन होता है। यह मार्गदर्शिका स्कीमा, माइग्रेशन, बैकअप/रिकवरी और परिचालन रनबुक को कवर करती है।

**स्रोत:**

- `src/lib/db/core.ts` — सिंगलटन + SCHEMA_SQL (17 आधार टेबल)
- `src/lib/db/migrationRunner.ts` — संस्करणयुक्त माइग्रेशन
- `src/lib/db/migrations/` — 167 संस्करणयुक्त SQL फ़ाइलें
- `src/lib/db/encryption.ts` — एन्क्रिप्शन सहायक
- `src/lib/db/backup.ts` — बैकअप एक्सपोर्ट/इम्पोर्ट
- `src/lib/db/healthCheck.ts` — स्वास्थ्य निदान

---

## SQLite क्यों?

OmniRoute ने कई कारणों से PostgreSQL/MySQL के बजाय SQLite को चुना:

| कारक             | SQLite                                | PostgreSQL                        |
| ---------------- | ------------------------------------- | --------------------------------- |
| **डिप्लॉयमेंट**  | एम्बेडेड — अलग सर्वर की आवश्यकता नहीं | सर्वर सेटअप आवश्यक                |
| **एन्क्रिप्शन**  | एप्लिकेशन-स्तरीय (AES-256-GCM)        | अंतर्निहित TDE                    |
| **प्रदर्शन**     | छोटे/मध्यम वर्कलोड के लिए तेज़        | अत्यधिक समवर्ती लेखन के लिए बेहतर |
| **समवर्तीता**    | WAL मोड समवर्ती पठन की अनुमति देता है | पूर्ण MVCC                        |
| **बैकअप**        | एकल-फ़ाइल कॉपी                        | `pg_dump` या फ़ाइलसिस्टम स्नैपशॉट |
| **उपयोग-स्थिति** | प्रति-उपयोगकर्ता इंस्टॉल, एम्बेडेड    | मल्टी-टेनेंट SaaS                 |

**एकल-उपयोगकर्ता, एकल-इंस्टेंस** डिप्लॉयमेंट (OmniRoute का प्राथमिक उपयोग-क्षेत्र) के लिए, SQLite अधिक सरल और तेज़ है।

### WAL जर्नलिंग

`core.ts` डेटाबेस को **WAL (Write-Ahead Logging) मोड** में खोलता है:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL लेखन के दौरान **समवर्ती पठन** की अनुमति देता है — यह डैशबोर्ड के लिए महत्वपूर्ण है, जो अनुरोध रिकॉर्ड किए जाने के दौरान क्वेरी करता है।

डिफ़ॉल्ट कैश आकार **65,536 KiB (64 MiB)** है। SQLite ऋणात्मक
`cache_size` को KiB में एक अनुमानित ऊपरी सीमा के रूप में समझता है और आवश्यकता के अनुसार पेज आवंटित करता है।
**सेटिंग्स > सिस्टम और स्टोरेज > कैश आकार** में **1 से
1,000,000 KiB** तक के पूर्णांक मान स्वीकार किए जाते हैं; सेटिंग सहेजने पर इसे सक्रिय डेटाबेस कनेक्शन पर लागू कर दिया जाता है,
और OmniRoute स्टार्टअप पर स्थायी मान को पुनर्स्थापित करता है।

---

## डेटाबेस का स्थान

SQLite फ़ाइल यहाँ संग्रहीत होती है:

| OS      | पथ                                                                        |
| ------- | ------------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                             |
| macOS   | `~/.omniroute/storage.sqlite`                                             |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                                 |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` के माध्यम से कॉन्फ़िगर करने योग्य) |

सहायक फ़ाइलें:

- `storage.sqlite-wal` — राइट-अहेड लॉग
- `storage.sqlite-shm` — साझा मेमोरी फ़ाइल
- `call_logs/` — अनुरोध पेलोड आर्टिफ़ैक्ट (यदि सक्षम हो)

**स्थान को ओवरराइड करें:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## डोमेन मॉड्यूल आर्किटेक्चर

OmniRoute के डेटाबेस में `src/lib/db/` के अंतर्गत **110 शीर्ष-स्तरीय TypeScript मॉड्यूल** हैं। प्रत्येक डोमेन मॉड्यूल:

- एक या अधिक विशिष्ट टेबल का स्वामी होता है
- टाइपयुक्त CRUD फ़ंक्शन एक्सपोर्ट करता है
- किसी अन्य मॉड्यूल की टेबल को कभी एक्सेस नहीं करता
- DB को एक्सेस करने के लिए `core.ts` से `getDbInstance()` का उपयोग करता है

### 110 शीर्ष-स्तरीय DB मॉड्यूल

OmniRoute में `src/lib/db/` के अंतर्गत **110 शीर्ष-स्तरीय TypeScript फ़ाइलें** हैं। नीचे मुख्य मॉड्यूल का एक नमूना दिया गया है; पूरी सूची के लिए डायरेक्टरी लिस्टिंग देखें:

| मॉड्यूल                 | टेबल                                                           | उत्तरदायित्व                                                 |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------ |
| `providers.ts`          | `provider_connections`                                         | OAuth/API कुंजी प्रदाता पंजीकरण और क्रेडेंशियल               |
| `models.ts`             | `key_value` (मॉडल डेटा)                                        | मॉडल परिभाषाएँ, क्षमताएँ, मूल्य निर्धारण                     |
| `combos.ts`             | `combos`                                                       | कॉम्बो रूटिंग कॉन्फ़िगरेशन और क्रम निर्धारण                  |
| `apiKeys.ts`            | `api_keys`                                                     | API कुंजी जीवनचक्र, स्कोप और कोटा ट्रैकिंग                   |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | सिस्टम कॉन्फ़िगरेशन और साझा KV स्टोर                         |
| `backup.ts`             | —                                                              | बैकअप एक्सपोर्ट/इम्पोर्ट संचालन                              |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | प्रॉक्सी कॉन्फ़िगरेशन और रूटिंग नियम                         |
| `prompts.ts`            | `prompt_templates`                                             | पुनः उपयोग योग्य प्रॉम्प्ट टेम्पलेट और वर्ज़निंग             |
| `webhooks.ts`           | `webhooks`                                                     | इवेंट-संचालित वेबहुक सब्सक्रिप्शन और लॉग                     |
| `detailedLogs.ts`       | `request_detail_logs`                                          | प्रति-अनुरोध ऑडिट लॉगिंग (वैकल्पिक, अधिक मात्रा)             |
| `domainState.ts`        | `domain_*` (5 टेबल)                                            | डोमेन बजट, सर्किट ब्रेकर, लॉकआउट, फ़ॉलबैक चेन और लागत इतिहास |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A के लिए अनुमति-सूचीबद्ध API कुंजियाँ                  |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ऐतिहासिक कोटा उपयोग                                          |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | मॉडल को कॉम्बो डिफ़ॉल्ट से मैप करना                          |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-विशिष्ट स्थायी स्थिति                                    |
| `encryption.ts`         | —                                                              | फ़ील्ड को एन्क्रिप्ट/डिक्रिप्ट करने के लिए सहायक फ़ंक्शन     |
| `readCache.ts`          | —                                                              | अधिक रीड वाले संचालनों के लिए इन-मेमोरी कैश                  |
| `secrets.ts`            | `key_value` (एन्क्रिप्ट की गई प्रविष्टियाँ)                    | एन्क्रिप्ट किया गया सीक्रेट स्टोरेज                          |
| `stateReset.ts`         | —                                                              | परीक्षण के लिए DB स्थिति को मिटाना/रीसेट करना                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | एजेंट हैंडऑफ़ के लिए सेशन कॉन्टेक्स्ट                        |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | उपयोग ट्रैकिंग                                               |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | कम्प्रेशन कॉन्फ़िगरेशन                                       |

### मॉड्यूल सीमाएँ

एक मुख्य आर्किटेक्चरल नियम: **मॉड्यूल एक-दूसरे की टेबल को सीधे एक्सेस नहीं करते**। किसी अन्य मॉड्यूल के डेटा के साथ काम करने के लिए, उस मॉड्यूल से फ़ंक्शन इम्पोर्ट करें।

```ts
// ❌ गलत: किसी अन्य मॉड्यूल से सीधे SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ सही: providers मॉड्यूल के फ़ंक्शन का उपयोग करें
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

यह नियम कोड समीक्षा के माध्यम से लागू किया जाता है—इसके लिए कोई स्थिर जाँच नहीं है, लेकिन उल्लंघनों को चिह्नित किया जाता है।

---

## आधार स्कीमा (17 टेबल)

`core.ts`, `SCHEMA_SQL` में 17 आधार टेबल परिभाषित करता है। इन्हें माइग्रेशन `001_initial_schema.sql` द्वारा बनाया जाता है और ये मुख्य स्कीमा बनाते हैं।

### मुख्य टेबल (प्रारंभिक माइग्रेशन में बनाए गए)

| टेबल                       | उद्देश्य                               | प्रमुख कॉलम                                                             |
| -------------------------- | -------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | प्रदाता क्रेडेंशियल (एन्क्रिप्टेड)     | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | प्रदाता नोड रूटिंग जानकारी             | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | सामान्य KV स्टोर                       | `namespace`, `key`, `value`                                             |
| `combos`                   | रूटिंग कॉम्बो परिभाषाएँ                | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | गेटवे के लिए API कुंजियाँ              | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | डेटाबेस मेटाडेटा                       | `key`, `value`                                                          |
| `usage_history`            | अनुरोध उपयोग रिकॉर्ड                   | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | अनुरोध पेलोड और प्रतिक्रियाएँ          | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | प्रॉक्सी अनुरोध लॉग                    | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | मॉडल-से-प्रदाता शृंखलाएँ               | `model`, `chain`                                                        |
| `domain_budgets`           | प्रत्येक डोमेन के लिए खर्च बजट         | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | बजट रीसेट इतिहास                       | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | प्रत्येक डोमेन की लागत ट्रैकिंग        | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | डोमेन दर-सीमा स्थिति                   | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | प्रत्येक डोमेन की सर्किट ब्रेकर स्थिति | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM प्रतिक्रिया कैश                    | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ऐतिहासिक कोटा स्नैपशॉट                 | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### अतिरिक्त टेबल (बाद के माइग्रेशन द्वारा जोड़े गए)

बाद के माइग्रेशन निम्न जैसे टेबल जोड़ते हैं:

- `cli_tool_state` (माइग्रेशन 011) — CLI टूल स्थिति
- `mcp_*` टेबल — MCP सर्वर ऑडिट
- `a2a_*` टेबल — A2A कार्य स्थिति
- `usage_*` टेबल — उपयोग ट्रैकिंग
- `plugin_*` टेबल — प्लगइन प्रणाली
- `skill_executions` — कौशल निष्पादन इतिहास
- `memory_*` टेबल — मेमोरी प्रणाली
- `compression_*` टेबल — कम्प्रेशन प्रणाली
- `webhook_*` टेबल — वेबहुक डिलीवरी लॉग
- `acp_*` टेबल — एजेंट क्लाइंट प्रोटोकॉल
- `oneproxy_*` टेबल — 1proxy मार्केटप्लेस
- `proxy_assignments` — प्रॉक्सी स्कोप बाइंडिंग
- `detailed_call_artifacts` — कॉल लॉग आर्टिफ़ैक्ट मेटाडेटा
- `quota_alert_history` — कोटा अलर्ट ऑडिट
- `command_code_auth_sessions` — कमांड कोड OAuth सत्र

लगभग 30+ टेबलों की पूरी सूची `src/lib/db/migrations/` में है।

---

## माइग्रेशन

OmniRoute `src/lib/db/migrations/` में **वर्ज़नयुक्त, आइडेम्पोटेंट माइग्रेशन** का उपयोग करता है। प्रत्येक माइग्रेशन `NNN_description.sql` नाम वाली एक SQL फ़ाइल होती है।

### माइग्रेशन का नामकरण

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### माइग्रेशन कैसे चलते हैं

स्टार्टअप पर, `migrationRunner.ts`:

1. यदि `_omniroute_migrations` टेबल मौजूद नहीं है, तो उसे बनाता है
2. पहले से लागू किए गए माइग्रेशन की क्वेरी करता है
3. किसी भी नए माइग्रेशन को क्रमवार लागू करता है, प्रत्येक को एक ट्रांज़ैक्शन में
4. लागू किए गए प्रत्येक माइग्रेशन को टाइमस्टैम्प के साथ रिकॉर्ड करता है

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

### आइडेम्पोटेंसी

माइग्रेशन **आइडेम्पोटेंट** होने चाहिए — उन्हें दो बार चलाने पर कोई प्रभाव नहीं पड़ना चाहिए:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, और `OR IGNORE` / `OR REPLACE` क्लॉज़ का उदारतापूर्वक उपयोग करें।

### नया माइग्रेशन जोड़ना

1. **अगला नंबर पहचानें**: `ls src/lib/db/migrations/ | tail -1`
2. **फ़ाइल बनाएँ**: `NNN_my_change.sql`
3. **सुरक्षित DDL का उपयोग करें**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **डेटा को सावधानीपूर्वक बैकफ़िल करें**: मौजूदा पंक्तियों को संभालने के लिए `UPDATE ... WHERE ...` का उपयोग करें
5. **किसी कॉपी पर परीक्षण करें**: बिना परीक्षण किए माइग्रेशन को प्रोडक्शन पर कभी न चलाएँ

उदाहरण:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **बैकवर्ड-असंगत बदलाव** (जैसे, कॉलम हटाना) जटिल होते हैं। OmniRoute डाउनग्रेड का समर्थन नहीं करता — एक बार माइग्रेशन लागू हो जाने पर, स्कीमा में किया गया बदलाव स्थायी होता है। उसी के अनुसार योजना बनाएँ।

---

## स्थिर अवस्था में एन्क्रिप्शन

संवेदनशील फ़ील्ड (API कुंजियाँ, OAuth टोकन, कनेक्शन स्ट्रिंग) **AES-256-GCM** का उपयोग करके स्थिर अवस्था में एन्क्रिप्ट किए जाते हैं।

### यह कैसे काम करता है

```ts
// src/lib/db/encryption.ts (सरलीकृत)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### इसका उपयोग कहाँ होता है

- `provider_connections.api_key` — एप्लिकेशन स्तर पर एन्क्रिप्ट किया गया
- `provider_connections.access_token`, `refresh_token`, `id_token` — एप्लिकेशन स्तर पर एन्क्रिप्ट किए गए
- `namespace = "secrets"` वाली `key_value` प्रविष्टियाँ — एप्लिकेशन स्तर पर एन्क्रिप्ट की गईं
- `proxy_registry.auth` — एप्लिकेशन स्तर पर एन्क्रिप्ट किया गया (यदि मौजूद हो)

### एन्क्रिप्शन कुंजी

एन्क्रिप्शन कुंजी एक **पासफ़्रेज़** (`STORAGE_ENCRYPTION_KEY` env var के माध्यम से सेट किया गया) और एक **सॉल्ट** (DB में संग्रहीत) से प्राप्त की जाती है। डेटा को डिक्रिप्ट करने के लिए दोनों आवश्यक हैं।

```bash
# एक सुरक्षित पासफ़्रेज़ जनरेट करें
openssl rand -hex 32

# .env में सेट करें
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **अत्यंत महत्वपूर्ण**: एन्क्रिप्शन कुंजी खोने का अर्थ है सभी एन्क्रिप्ट किए गए डेटा तक पहुँच खोना। **कुंजी का बैकअप डेटाबेस से अलग रखें**।

### क्या एन्क्रिप्ट नहीं किया जाता

प्रदर्शन संबंधी कारणों से, निम्नलिखित को प्लेनटेक्स्ट में संग्रहीत किया जाता है:

- प्रोवाइडर के प्रदर्शन नाम
- मॉडल परिभाषाएँ (पहले से सार्वजनिक)
- रूटिंग नियम
- उपयोग रिकॉर्ड (कोई PII नहीं)

---

## एन्क्रिप्शन संबंधी सावधानियाँ (v3.8.16+)

OmniRoute दो एन्क्रिप्शन योजनाओं को पारदर्शी रूप से संभालने के लिए **`migrateLegacyEncryptedString()`** का उपयोग करता है:

- **लीगेसी** (v3.5.0 से पहले): XOR-आधारित "एन्क्रिप्शन" (वास्तविक क्रिप्टोग्राफ़ी नहीं)
- **वर्तमान**: उचित IV और प्रमाणीकरण टैग के साथ AES-256-GCM

माइग्रेशन सहायक लीगेसी प्रारूप का पता लगाता है और पहली बार पढ़े जाने पर नई योजना के साथ पुनः एन्क्रिप्ट करता है। इसका अर्थ है कि आप क्रेडेंशियल खोए बिना किसी पुराने डेटाबेस को अपग्रेड कर सकते हैं।

---

## रीड कैश

बार-बार पढ़े जाने वाले डेटा (मॉडल, प्रोवाइडर, सेटिंग्स) के लिए, `readCache.ts` एक **इन-मेमोरी कैश** प्रदान करता है:

```ts
// स्टार्टअप पर कैश किया जाता है, लिखने पर अमान्य किया जाता है
const providers = await getCachedProviders(); // तेज़, इन-मेमोरी
const fresh = await listProviders(); // धीमा, DB को एक्सेस करता है
```

| कैश की गई इकाई         | कैश कुंजी      | TTL          |
| ---------------------- | -------------- | ------------ |
| `models`               | `models:v1`    | लिखे जाने तक |
| `provider_connections` | `providers:v1` | लिखे जाने तक |
| `settings`             | `settings:v1`  | लिखे जाने तक |
| `combos`               | `combos:v1`    | लिखे जाने तक |

संबंधित तालिका में प्रत्येक लेखन पर कैश अमान्य कर दिया जाता है।

---

## बैकअप और रिकवरी

### मैन्युअल बैकअप

```bash
# स्थानीय बैकअप बनाने के लिए CLI का उपयोग करें
omniroute backup create --name pre-migration

# या API के माध्यम से
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

बैकअप फ़ाइल में ये शामिल होते हैं:

- सभी DB तालिकाएँ (JSON में क्रमबद्ध)
- कॉल लॉग आर्टिफ़ैक्ट (base64-एन्कोडेड, वैकल्पिक)
- सेटिंग्स + सीक्रेट्स (एन्क्रिप्टेड)
- प्लगइन कॉन्फ़िगरेशन

### पुनर्स्थापना

```bash
# CLI के माध्यम से
omniroute restore pre-migration

# API के माध्यम से
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **चेतावनी**: पुनर्स्थापना संपूर्ण DB को ओवरराइट कर देती है। पहले सभी क्लाइंट बंद करें।

### स्वचालित बैकअप

```bash
# CLI के माध्यम से स्वचालित दैनिक बैकअप सक्षम करें
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

शेड्यूल को सर्वर की ओर से एक बैकग्राउंड जॉब द्वारा निष्पादित किया जाता है, जो प्रत्येक 30 सेकंड
(डिफ़ॉल्ट) में सक्रिय होता है और स्थानीय सर्वर समय के अनुसार cron एक्सप्रेशन का मूल्यांकन करता है।

| वेरिएबल                                     | डिफ़ॉल्ट | विवरण                                                                                                                                 |
| ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | ms में सक्रियण अंतराल (न्यूनतम `5000`)। मेल खाने वाले cron मिनट के भीतर विश्वसनीय रूप से सक्रिय होने के लिए यह 60 s से कम होना चाहिए। |

### SQLite हॉट बैकअप

लाइव DB का शून्य-डाउनटाइम बैकअप लेने के लिए:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

यह SQLite के ऑनलाइन बैकअप API का उपयोग करता है — OmniRoute के चलते समय इसे चलाना सुरक्षित है।

---

## प्रदर्शन ट्यूनिंग

### WAL मोड

WAL डिफ़ॉल्ट रूप से सक्षम है। अधिक लेखन वाले वर्कलोड के लिए, इन पर विचार करें:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- प्रत्येक 1000 पेज पर चेकपॉइंट
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL सीमा
```

### इंडेक्स

प्रदर्शन के लिए प्रमुख इंडेक्स (माइग्रेशन द्वारा स्वतः बनाए गए):

- `idx_models_provider` — प्रदाता के आधार पर मॉडल लुकअप
- `idx_combo_targets_combo_id` — कॉम्बो लक्ष्य विस्तार
- `idx_usage_history_api_key_timestamp` — उपयोग विश्लेषण
- `idx_quota_snapshots_api_key_window` — कोटा ट्रैकिंग
- `idx_call_logs_timestamp` — कॉल लॉग क्वेरी

नया इंडेक्स जोड़ने के लिए, एक माइग्रेशन बनाएँ:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### मेमोरी-मैप्ड I/O

बहुत बड़े डेटाबेस (>10GB) के लिए, मेमोरी मैपिंग को SQLite pragma के माध्यम से समायोजित किया जा सकता है:

```sql
-- SQLite pragma के माध्यम से सेट करें (core.ts या रनटाइम में समायोजित करें)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### कॉम्पैक्शन

लंबे समय से चल रहे OmniRoute इंस्टेंस को कभी-कभार `VACUUM` चलाने से लाभ होता है:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

कम ट्रैफ़िक वाली अवधियों के दौरान इसे मासिक रूप से चलाएँ। (WAL मोड इसकी आवश्यकता को कम करता है, लेकिन समाप्त नहीं करता।)

---

## स्वास्थ्य जाँच

`src/lib/db/healthCheck.ts` **DB-स्तरीय स्वास्थ्य निदान** प्रदान करता है:

दोनों वर्ब के लिए प्रमाणीकरण आवश्यक है (अन्यथा `401`)। `GET` केवल निदान करता है; `POST`
`autoRepair` सक्षम करके वही जाँच चलाता है।

```bash
GET  /api/db/health   # निदान
POST /api/db/health   # निदान + मरम्मत
```

प्रतिक्रिया में `runDbHealthCheck()` द्वारा उत्पन्न `DbHealthCheckResult` होता है
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "डोमेन बजट ने ऐसी API कुंजियों को संदर्भित किया जो अब मौजूद नहीं हैं।",
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

| फ़ील्ड            | अर्थ                                                                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | जब `issues` खाली हो, तब `true`। `driver` इसे कभी प्रभावित नहीं करता।                                                                      |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` में से एक।                                                |
| `repairedCount`   | इस रन के दौरान मरम्मत की गई पंक्तियाँ; `autoRepair` के false होने पर हमेशा `0`।                                                           |
| `backupCreated`   | मरम्मत से पहले बैकअप लिया गया था या नहीं।                                                                                                 |
| `checkedAt`       | रन और उसके द्वारा लिखे गए किसी भी मरम्मत नोट द्वारा साझा किया गया ISO टाइमस्टैम्प।                                                        |
| `driver.name`     | जाँचे गए डेटाबेस को सेवा प्रदान करने वाला SQLite ड्राइवर।                                                                                 |
| `driver.degraded` | जब लेखन डेटाबेस फ़ाइल द्वारा टिकाऊ रूप से समर्थित न हो, तब `true` — `sql.js` WASM फ़ॉलबैक (संपूर्ण-फ़ाइल स्थायित्व) या इन-मेमोरी डेटाबेस। |

यही पेलोड `omniroute_db_health_check` MCP टूल द्वारा लौटाया जाता है।

करप्शन का पता लगाने के लिए `PRAGMA integrity_check` चलाएँ:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# यह प्रिंट होना चाहिए: ok
```

यदि यह `ok` के अलावा कुछ और लौटाता है, तो **डेटाबेस का उपयोग तुरंत बंद कर दें** और बैकअप से पुनर्स्थापित करें।

---

## आपदा पुनर्प्राप्ति

### परिदृश्य 1: WAL फ़ाइल खो गई

`-wal` फ़ाइल मौजूद नहीं है, लेकिन `-shm` और मुख्य DB सुरक्षित हैं:

```bash
# अगली बार खोलने पर स्वचालित रूप से पुनर्प्राप्त होता है
omniroute
```

यदि SQLite स्वतः पुनर्प्राप्त नहीं कर पाता:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### परिदृश्य 2: मुख्य DB फ़ाइल दूषित हो गई

बैकअप से पुनर्स्थापित करें:

```bash
omniroute sync pull --merge   # या: omniroute backup restore <backup-id>
```

### परिदृश्य 3: एन्क्रिप्शन कुंजी खो गई

कुंजी के बिना **पुनर्प्राप्ति संभव नहीं है**। एन्क्रिप्ट किए गए फ़ील्ड पढ़ने योग्य नहीं हैं। नए क्रेडेंशियल के साथ सभी प्रदाताओं को मैन्युअल रूप से दोबारा जोड़ें।

> **जोखिम न्यूनीकरण**: एन्क्रिप्शन कुंजी का बैकअप हमेशा अलग से रखें, आदर्श रूप से किसी पासवर्ड मैनेजर या KMS में।

### परिदृश्य 4: डिस्क भर गई

SQLite `SQLITE_FULL` त्रुटियाँ लौटाएगा। डिस्क में जगह खाली करें, फिर:

```bash
# जगह खाली करने के लिए WAL का चेकपॉइंट बनाएँ
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## सामान्य परिचालन

### किसी तालिका का निरीक्षण करें

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### सभी तालिकाओं में पंक्तियाँ गिनें

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### सभी डेटा को रीसेट (मिटाएँ) करें

```bash
# पहले OmniRoute को रोकें
omniroute stop

# DB फ़ाइल हटाएँ
rm ~/.omniroute/storage.sqlite*

# पुनः शुरू करें (खाली DB दोबारा बनाया जाएगा)
omniroute
```

**चयनात्मक** रीसेट के लिए (प्रदाताओं को रखें, उपयोग डेटा मिटाएँ):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### एकल तालिका निर्यात करें

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## समस्या निवारण

### "डेटाबेस लॉक है"

कोई अन्य प्रोसेस राइट लॉक बनाए हुए है। इनमें से कोई एक उपाय करें:

- दूसरे प्रोसेस के पूरा होने की प्रतीक्षा करें (`lsof | grep storage.sqlite` से जाँचें)
- दूसरे प्रोसेस को बंद करें
- यदि समस्या बनी रहती है, तो OmniRoute को पुनः शुरू करें

### "फ़ॉरेन-की बाधा विफल हुई"

कोई डोमेन मॉड्यूल रेफ़रेंशियल इंटेग्रिटी का उल्लंघन कर रहा है। इनकी जाँच करें:

- आश्रित तालिकाओं में अनाथ पंक्तियाँ
- कैस्केडिंग डिलीट जो आगे प्रसारित नहीं हुए
- हालिया माइग्रेशन जिसने किसी फ़ॉरेन-की को बदला है

उल्लंघनों का पता लगाने के लिए `PRAGMA foreign_key_check;` चलाएँ।

### "मेमोरी समाप्त हो गई"

SQLite का मेमोरी-मैप्ड I/O, OS की सीमा से अधिक हो रहा है। SQLite pragma के माध्यम से इसे कम करें:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB के बजाय 128MB
```

या इसे अक्षम करें:

```sql
PRAGMA mmap_size = 0;
```

### "माइग्रेशन बीच में विफल हो गया"

माइग्रेशन एक ट्रांज़ैक्शन में चला था, इसलिए इसे रोल बैक हो जाना चाहिए था। यदि ऐसा नहीं हुआ:

1. **OmniRoute को रोकें** (आगे के प्रयासों को रोकें)
2. `sqlite3` से **DB की स्थिति जाँचें**
3. आंशिक माइग्रेशन को **मैन्युअल रूप से ठीक करें**
4. OmniRoute को **दोबारा चलाएँ** (माइग्रेशन का पुनः प्रयास किया जाएगा)

इसे रोकने के लिए, माइग्रेशन का परीक्षण हमेशा पहले एक प्रतिलिपि पर करें।

---

## यह भी देखें

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — उपयोग तालिकाएँ
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — स्वास्थ्य निगरानी
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — रिलीज़ प्रक्रिया
- स्रोत: `src/lib/db/` (80+ फ़ाइलें, ~25K कोड पंक्तियाँ)
