# Database Schema & Operations Guide (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **थोडक्यात**: OmniRoute त्याचे प्राथमिक संचयन म्हणून **WAL जर्नलिंगसह SQLite** वापरते आणि संवेदनशील फील्डसाठी स्थिर स्थितीतील **AES-256-GCM** एन्क्रिप्शन वापरते. या मार्गदर्शकामध्ये स्कीमा, मायग्रेशन्स, बॅकअप/रिकव्हरी आणि परिचालन रनबुक्स समाविष्ट आहेत.

**स्रोत:**

- `src/lib/db/core.ts` — सिंगलटन + SCHEMA_SQL (17 मूलभूत टेबल्स)
- `src/lib/db/migrationRunner.ts` — आवृत्तीबद्ध मायग्रेशन्स
- `src/lib/db/migrations/` — 167 आवृत्तीबद्ध SQL फाइल्स
- `src/lib/db/encryption.ts` — एन्क्रिप्शन सहाय्यक
- `src/lib/db/backup.ts` — बॅकअप एक्सपोर्ट/इम्पोर्ट
- `src/lib/db/healthCheck.ts` — स्थिती निदान

---

## SQLite का?

OmniRoute ने अनेक कारणांमुळे PostgreSQL/MySQL ऐवजी SQLite निवडले:

| घटक                | SQLite                                 | PostgreSQL                            |
| ------------------ | -------------------------------------- | ------------------------------------- |
| **उपयोजन**         | एम्बेडेड — स्वतंत्र सर्व्हरची गरज नाही | सर्व्हर सेटअप आवश्यक                  |
| **एन्क्रिप्शन**    | ॲप्लिकेशन-स्तरावरील (AES-256-GCM)      | अंगभूत TDE                            |
| **कार्यक्षमता**    | लहान/मध्यम वर्कलोड्ससाठी अधिक जलद      | प्रचंड समकालीन लेखनांसाठी अधिक चांगले |
| **समवर्तीपणा**     | WAL मोड समकालीन वाचनांना अनुमती देतो   | संपूर्ण MVCC                          |
| **बॅकअप**          | एकाच फाइलची प्रत                       | `pg_dump` किंवा फाइलसिस्टम स्नॅपशॉट   |
| **वापराचे प्रकरण** | प्रति-वापरकर्ता इन्स्टॉलेशन, एम्बेडेड  | मल्टी-टेनंट SaaS                      |

**एकल-वापरकर्ता, एकल-इन्स्टन्स** उपयोजनांसाठी (OmniRoute चे प्राथमिक वापराचे प्रकरण), SQLite अधिक सोपे आणि जलद आहे.

### WAL जर्नलिंग

`core.ts` डेटाबेस **WAL (Write-Ahead Logging) मोडमध्ये** उघडते:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL लेखन सुरू असताना **समकालीन वाचनांना** अनुमती देते — विनंत्या नोंदवल्या जात असताना क्वेरी करणाऱ्या डॅशबोर्डसाठी हे महत्त्वाचे आहे.

डीफॉल्ट कॅशे आकार **65,536 KiB (64 MiB)** आहे. SQLite ऋण
`cache_size` ला KiB मधील अंदाजे कमाल मर्यादा मानते आणि गरजेनुसार पेजेस वाटप करते.
**सेटिंग्ज > सिस्टम आणि स्टोरेज > कॅशे आकार** येथे **1 ते
1,000,000 KiB** पर्यंतच्या पूर्णांक मूल्यांचा स्वीकार केला जातो; सेटिंग सेव्ह केल्यावर ते सक्रिय डेटाबेस कनेक्शनवर लागू होते,
आणि OmniRoute स्टार्टअपवेळी जतन केलेले मूल्य पुनर्स्थापित करते.

---

## डेटाबेसचे स्थान

SQLite फाइल येथे संग्रहित केली जाते:

| OS      | पथ                                                                  |
| ------- | ------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                       |
| macOS   | `~/.omniroute/storage.sqlite`                                       |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                           |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` द्वारे कॉन्फिगर करण्यायोग्य) |

सोबतच्या फाइल्स:

- `storage.sqlite-wal` — राइट-अहेड लॉग
- `storage.sqlite-shm` — शेअर्ड मेमरी फाइल
- `call_logs/` — विनंती पेलोड आर्टिफॅक्ट्स (सक्षम केले असल्यास)

**स्थान ओव्हरराइड करा:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## डोमेन मॉड्यूल आर्किटेक्चर

OmniRoute च्या डेटाबेसमध्ये `src/lib/db/` येथे **110 शीर्ष-स्तरीय TypeScript मॉड्यूल्स** आहेत. प्रत्येक डोमेन मॉड्यूल:

- एक किंवा अधिक विशिष्ट टेबल्सची मालकी राखते
- टाइप केलेली CRUD फंक्शन्स एक्सपोर्ट करते
- इतर कोणत्याही मॉड्यूलच्या टेबल्सना कधीही स्पर्श करत नाही
- DB मध्ये प्रवेश करण्यासाठी `core.ts` मधील `getDbInstance()` वापरते

### 110 शीर्ष-स्तरीय DB मॉड्यूल्स

OmniRoute मध्ये `src/lib/db/` येथे **110 शीर्ष-स्तरीय TypeScript फाइल्स** आहेत. खाली मुख्य मॉड्यूल्सपैकी काही नमुने दिले आहेत; संपूर्ण यादीसाठी डायरेक्टरी सूची पहा:

| मॉड्यूल                 | टेबल्स                                                         | जबाबदारी                                                             |
| ----------------------- | -------------------------------------------------------------- | -------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API की प्रोव्हायडर नोंदणी आणि क्रेडेन्शियल्स                   |
| `models.ts`             | `key_value` (मॉडेल डेटा)                                       | मॉडेल व्याख्या, क्षमता, किंमत निर्धारण                               |
| `combos.ts`             | `combos`                                                       | कॉम्बो राउटिंग कॉन्फिग्ज आणि क्रमवारी                                |
| `apiKeys.ts`            | `api_keys`                                                     | API की जीवनचक्र, स्कोप्स, कोटा ट्रॅकिंग                              |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | सिस्टीम कॉन्फिगरेशन आणि सामायिक KV स्टोअर                            |
| `backup.ts`             | —                                                              | बॅकअप एक्सपोर्ट/इम्पोर्ट ऑपरेशन्स                                    |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | प्रॉक्सी कॉन्फिग्ज आणि राउटिंग नियम                                  |
| `prompts.ts`            | `prompt_templates`                                             | पुनर्वापरयोग्य प्रॉम्प्ट टेम्प्लेट्स, आवृत्तीकरण                     |
| `webhooks.ts`           | `webhooks`                                                     | इव्हेंट-आधारित वेबहुक सदस्यता आणि लॉग्स                              |
| `detailedLogs.ts`       | `request_detail_logs`                                          | प्रत्येक विनंतीसाठी ऑडिट लॉगिंग (पर्यायी, मोठ्या प्रमाणात)           |
| `domainState.ts`        | `domain_*` (5 टेबल्स)                                          | डोमेन बजेट्स, सर्किट ब्रेकर्स, लॉकआउट्स, फॉलबॅक साखळ्या, खर्च इतिहास |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A साठी श्वेतसूचीबद्ध API कीज                                   |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ऐतिहासिक कोटा वापर                                                   |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | मॉडेल्सना डीफॉल्ट कॉम्बोंशी मॅप करणे                                 |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-विशिष्ट कायमस्वरूपी स्थिती                                       |
| `encryption.ts`         | —                                                              | फील्ड्स एन्क्रिप्ट/डिक्रिप्ट करण्यासाठी सहाय्यक फंक्शन्स             |
| `readCache.ts`          | —                                                              | मोठ्या प्रमाणात वाचन होणाऱ्या ऑपरेशन्ससाठी इन-मेमरी कॅश              |
| `secrets.ts`            | `key_value` (एन्क्रिप्ट केलेल्या नोंदी)                        | एन्क्रिप्टेड गुपितांचे स्टोरेज                                       |
| `stateReset.ts`         | —                                                              | चाचणीसाठी DB स्थिती पुसणे/रीसेट करणे                                 |
| `contextHandoffs.ts`    | `context_handoffs`                                             | एजंट हँडऑफसाठी सेशन संदर्भ                                           |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | वापर ट्रॅकिंग                                                        |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | कॉम्प्रेशन कॉन्फिगरेशन                                               |

### मॉड्यूल सीमा

एक मुख्य आर्किटेक्चरल नियम: **मॉड्यूल्स एकमेकांच्या टेबल्समध्ये थेट प्रवेश करत नाहीत**. दुसऱ्या मॉड्यूलच्या डेटासह काम करण्यासाठी, त्या मॉड्यूलमधील फंक्शन इम्पोर्ट करा.

```ts
// ❌ चुकीचे: दुसऱ्या मॉड्यूलमधून थेट SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ योग्य: providers मॉड्यूलचे फंक्शन वापरा
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

हा नियम कोड पुनरावलोकनाद्वारे लागू केला जातो — यासाठी कोणतीही स्थिर तपासणी नाही, परंतु उल्लंघने निदर्शनास आणली जातात.

---

## मूलभूत स्कीमा (17 तक्ते)

`core.ts`, `SCHEMA_SQL` मध्ये 17 मूलभूत तक्ते परिभाषित करते. हे migration `001_initial_schema.sql` द्वारे तयार केले जातात आणि मुख्य स्कीमा बनवतात.

### मुख्य तक्ते (प्रारंभिक migration मध्ये तयार केलेले)

| तक्ता                      | उद्देश                                         | प्रमुख स्तंभ                                                            |
| -------------------------- | ---------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | प्रदात्याची क्रेडेन्शियल्स (एन्क्रिप्ट केलेली) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | प्रदाता नोडची राउटिंग माहिती                   | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | सामान्य KV स्टोअर                              | `namespace`, `key`, `value`                                             |
| `combos`                   | राउटिंग कॉम्बोच्या व्याख्या                    | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | गेटवेसाठी API कीज                              | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | डेटाबेस मेटाडेटा                               | `key`, `value`                                                          |
| `usage_history`            | विनंती वापराच्या नोंदी                         | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | विनंती पेलोड्स आणि प्रतिसाद                    | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | प्रॉक्सी विनंती लॉग्स                          | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | मॉडेल-ते-प्रदाता साखळ्या                       | `model`, `chain`                                                        |
| `domain_budgets`           | प्रत्येक डोमेनसाठी खर्चाचे बजेट                | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | बजेट रीसेट इतिहास                              | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | प्रत्येक डोमेनच्या खर्चाचा मागोवा              | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | डोमेन दर-मर्यादा स्थिती                        | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | प्रत्येक डोमेनची सर्किट ब्रेकर स्थिती          | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM प्रतिसाद कॅश                               | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ऐतिहासिक कोटा स्नॅपशॉट्स                       | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### अतिरिक्त तक्ते (नंतरच्या migrations द्वारे जोडलेले)

पुढील migrations खालीलप्रमाणे तक्ते जोडतात:

- `cli_tool_state` (migration 011) — CLI साधनाची स्थिती
- `mcp_*` तक्ते — MCP सर्व्हर ऑडिट
- `a2a_*` तक्ते — A2A कार्य स्थिती
- `usage_*` तक्ते — वापराचा मागोवा
- `plugin_*` तक्ते — प्लगइन प्रणाली
- `skill_executions` — कौशल्य अंमलबजावणीचा इतिहास
- `memory_*` तक्ते — मेमरी प्रणाली
- `compression_*` तक्ते — कॉम्प्रेशन प्रणाली
- `webhook_*` तक्ते — वेबहुक वितरण लॉग
- `acp_*` तक्ते — एजंट क्लायंट प्रोटोकॉल
- `oneproxy_*` तक्ते — 1proxy मार्केटप्लेस
- `proxy_assignments` — प्रॉक्सी व्याप्ती बाइंडिंग्ज
- `detailed_call_artifacts` — कॉल लॉग आर्टिफॅक्ट्सचे मेटाडेटा
- `quota_alert_history` — कोटा अलर्ट ऑडिट
- `command_code_auth_sessions` — कमांड कोड OAuth सत्रे

~30+ तक्त्यांची संपूर्ण यादी `src/lib/db/migrations/` मध्ये आहे.

---

## स्थलांतरे

OmniRoute मध्ये `src/lib/db/migrations/` येथे **आवृत्तीबद्ध, पुनरावृत्ती-सुरक्षित स्थलांतरे** वापरली जातात. प्रत्येक स्थलांतर ही `NNN_description.sql` नावाची स्वतंत्र SQL फाइल असते.

### स्थलांतराचे नामकरण

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### स्थलांतरे कशी चालतात

प्रारंभाच्या वेळी, `migrationRunner.ts`:

1. `_omniroute_migrations` तक्ता अस्तित्वात नसल्यास तो तयार करते
2. आधीच लागू केलेल्या स्थलांतरांसाठी क्वेरी करते
3. कोणतीही नवीन स्थलांतरे क्रमाने लागू करते, प्रत्येक स्थलांतर स्वतंत्र व्यवहारामध्ये चालवते
4. लागू केलेल्या प्रत्येक स्थलांतराची टाइमस्टॅम्पसह नोंद करते

```ts
// src/lib/db/migrationRunner.ts (सुलभीकृत)
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

### पुनरावृत्ती-सुरक्षितता

स्थलांतरे **पुनरावृत्ती-सुरक्षित** असणे आवश्यक आहे — ती दोनदा चालवल्यास दुसऱ्यांदा कोणतीही क्रिया होता कामा नये:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, आणि `OR IGNORE` / `OR REPLACE` ही कलमे उदारपणे वापरा.

### नवीन स्थलांतर जोडणे

1. **पुढील क्रमांक ओळखा**: `ls src/lib/db/migrations/ | tail -1`
2. **फाइल तयार करा**: `NNN_my_change.sql`
3. **सुरक्षित DDL वापरा**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **डेटा काळजीपूर्वक भरून काढा**: विद्यमान पंक्ती हाताळण्यासाठी `UPDATE ... WHERE ...` वापरा
5. **प्रतीवर चाचणी करा**: चाचणी न केलेली स्थलांतरे कधीही प्रॉडक्शनवर चालवू नका

उदाहरण:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **पश्च-सुसंगत नसलेले बदल** (उदा., स्तंभ काढून टाकणे) अवघड असतात. OmniRoute अवनतीला समर्थन देत नाही — स्थलांतर लागू झाल्यानंतर, स्कीमामधील बदल कायमस्वरूपी असतो. त्यानुसार योजना आखा.

---

## संग्रहित डेटाचे कूटलेखन

संवेदनशील फील्ड (API कळा, OAuth टोकन, कनेक्शन स्ट्रिंग) **AES-256-GCM** वापरून संग्रहित स्थितीत कूटबद्ध केली जातात.

### ते कसे कार्य करते

```ts
// src/lib/db/encryption.ts (सुलभीकृत)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### ते कुठे वापरले जाते

- `provider_connections.api_key` — ॲप्लिकेशन स्तरावर कूटबद्ध
- `provider_connections.access_token`, `refresh_token`, `id_token` — ॲप्लिकेशन स्तरावर कूटबद्ध
- `namespace = "secrets"` असलेल्या `key_value` नोंदी — ॲप्लिकेशन स्तरावर कूटबद्ध
- `proxy_registry.auth` — ॲप्लिकेशन स्तरावर कूटबद्ध (उपस्थित असल्यास)

### कूटलेखन कळ

कूटलेखन कळ एका **पासफ्रेज**वरून (`STORAGE_ENCRYPTION_KEY` पर्यावरण चलाद्वारे सेट केलेली) आणि एका **सॉल्ट**वरून (DB मध्ये संग्रहित) व्युत्पन्न केली जाते. डेटा विकूटबद्ध करण्यासाठी दोन्ही आवश्यक आहेत.

```bash
# सुरक्षित पासफ्रेज तयार करा
openssl rand -hex 32

# .env मध्ये सेट करा
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **अत्यंत महत्त्वाचे**: कूटलेखन कळ हरवल्यास सर्व कूटबद्ध डेटावरील प्रवेश गमावला जाईल. **कळीचा बॅकअप डेटाबेसपासून स्वतंत्रपणे घ्या**.

### काय कूटबद्ध केले जात नाही

कार्यक्षमतेच्या कारणांमुळे, पुढील माहिती साध्या मजकूरात संग्रहित केली जाते:

- प्रदात्यांची प्रदर्शन नावे
- मॉडेल व्याख्या (आधीपासूनच सार्वजनिक)
- राउटिंग नियम
- वापर नोंदी (कोणतीही PII नाही)

---

## एन्क्रिप्शनसंबंधी मर्यादा (v3.8.16+)

दोन एन्क्रिप्शन योजना पारदर्शकपणे हाताळण्यासाठी OmniRoute **`migrateLegacyEncryptedString()`** वापरते:

- **Legacy** (v3.5.0-पूर्वीचे): XOR-आधारित "एन्क्रिप्शन" (वास्तविक क्रिप्टोग्राफी नाही)
- **सध्याचे**: योग्य IV आणि प्रमाणीकरण टॅगसह AES-256-GCM

मायग्रेशन हेल्पर लेगसी स्वरूप ओळखतो आणि प्रथमच वाचताना नवीन योजनेने पुन्हा एन्क्रिप्ट करतो. यामुळे क्रेडेन्शियल्स न गमावता जुना डेटाबेस अपग्रेड करता येतो.

---

## रीड कॅशे

वारंवार वाचल्या जाणाऱ्या डेटासाठी (मॉडेल्स, प्रोव्हायडर्स, सेटिंग्ज), `readCache.ts` **इन-मेमरी कॅशे** प्रदान करते:

```ts
// स्टार्टअपच्या वेळी कॅश केले जाते, लिहिल्यावर अवैध केले जाते
const providers = await getCachedProviders(); // जलद, इन-मेमरी
const fresh = await listProviders(); // धीमे, DB मध्ये प्रवेश करते
```

| कॅश केलेली एंटिटी      | कॅश की         | TTL              |
| ---------------------- | -------------- | ---------------- |
| `models`               | `models:v1`    | लिहिले जाईपर्यंत |
| `provider_connections` | `providers:v1` | लिहिले जाईपर्यंत |
| `settings`             | `settings:v1`  | लिहिले जाईपर्यंत |
| `combos`               | `combos:v1`    | लिहिले जाईपर्यंत |

संबंधित टेबलमध्ये प्रत्येक वेळी लिहिल्यावर कॅश अवैध केली जाते.

---

## बॅकअप आणि पुनर्प्राप्ती

### मॅन्युअल बॅकअप

```bash
# स्थानिक बॅकअप तयार करण्यासाठी CLI वापरा
omniroute backup create --name pre-migration

# किंवा API द्वारे
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

बॅकअप फाइलमध्ये पुढील गोष्टी समाविष्ट असतात:

- सर्व DB टेबल्स (JSON मध्ये क्रमबद्ध केलेली)
- कॉल लॉग आर्टिफॅक्ट्स (base64-एन्कोड केलेले, पर्यायी)
- सेटिंग्ज + सीक्रेट्स (एन्क्रिप्ट केलेले)
- प्लगइन कॉन्फिगरेशन

### पुनर्संचयित करणे

```bash
# CLI द्वारे
omniroute restore pre-migration

# API द्वारे
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **चेतावणी**: पुनर्संचयित केल्याने संपूर्ण DB अधिलिखित होतो. प्रथम सर्व क्लायंट्स थांबवा.

### स्वयंचलित बॅकअप्स

```bash
# CLI द्वारे स्वयंचलित दैनंदिन बॅकअप्स सक्षम करा
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

हे शेड्यूल सर्व्हरच्या बाजूला पार्श्वभूमीतील जॉबद्वारे कार्यान्वित केले जाते, जो प्रत्येक 30 सेकंदांनी
(डीफॉल्टनुसार) चालतो आणि स्थानिक सर्व्हर वेळेनुसार cron एक्स्प्रेशनचे मूल्यमापन करतो.

| व्हेरिएबल                                   | डीफॉल्ट | वर्णन                                                                                                                                |
| ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | मिलीसेकंदांमधील टिक अंतराल (किमान `5000`). जुळणाऱ्या cron मिनिटाच्या आत विश्वसनीयपणे येण्यासाठी ते 60 सेकंदांपेक्षा कमी असले पाहिजे. |

### SQLite हॉट बॅकअप

कार्यरत DB चा कोणताही डाउनटाइम न घेता बॅकअप करण्यासाठी:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

हे SQLite चे ऑनलाइन बॅकअप API वापरते — OmniRoute कार्यरत असताना चालवणे सुरक्षित आहे.

---

## कार्यक्षमता ट्यूनिंग

### WAL मोड

WAL डीफॉल्टनुसार सक्षम केलेले आहे. मोठ्या प्रमाणात लेखन होणाऱ्या वर्कलोडसाठी, पुढील बाबींचा विचार करा:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- प्रत्येक 1000 पृष्ठांनंतर चेकपॉइंट
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL मर्यादा
```

### इंडेक्स

कार्यक्षमतेसाठी महत्त्वाचे इंडेक्स (मायग्रेशनद्वारे आपोआप तयार केले जातात):

- `idx_models_provider` — प्रदात्यानुसार मॉडेल शोध
- `idx_combo_targets_combo_id` — कॉम्बो लक्ष्य विस्तार
- `idx_usage_history_api_key_timestamp` — वापर विश्लेषण
- `idx_quota_snapshots_api_key_window` — कोटा ट्रॅकिंग
- `idx_call_logs_timestamp` — कॉल लॉग क्वेरी

नवीन इंडेक्स जोडण्यासाठी, मायग्रेशन तयार करा:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### मेमरी-मॅप्ड I/O

अतिशय मोठ्या डेटाबेससाठी (>10GB), SQLite pragma द्वारे मेमरी मॅपिंग समायोजित करता येते:

```sql
-- SQLite pragma द्वारे सेट करा (core.ts किंवा रनटाइममध्ये समायोजित करा)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### कॉम्पॅक्शन

दीर्घकाळ चालणाऱ्या OmniRoute इन्स्टन्सना अधूनमधून `VACUUM` चालवल्याचा फायदा होतो:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

कमी ट्रॅफिक असलेल्या कालावधीत दर महिन्याला चालवा. (WAL मोडमुळे याची गरज कमी होते, परंतु पूर्णपणे नाहीशी होत नाही.)

---

## आरोग्य तपासणी

`src/lib/db/healthCheck.ts` **डेटाबेस-स्तरीय आरोग्य निदान** प्रदान करते:

दोन्ही व्हर्बसाठी प्रमाणीकरण आवश्यक आहे (अन्यथा `401`). `GET` केवळ निदान करते; `POST`, `autoRepair` सक्षम करून तीच तपासणी चालवते.

```bash
GET  /api/db/health   # निदान करा
POST /api/db/health   # निदान करा + दुरुस्ती करा
```

प्रतिसादामध्ये `runDbHealthCheck()` द्वारे तयार केलेला `DbHealthCheckResult` असतो
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "डोमेन बजेटमध्ये यापुढे अस्तित्वात नसलेल्या API कीचा संदर्भ होता.",
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

| फील्ड             | अर्थ                                                                                                                                     |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` रिकामे असताना `true`. `driver` यावर कधीही परिणाम करत नाही.                                                                      |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` यांपैकी एक.                                              |
| `repairedCount`   | या रनदरम्यान दुरुस्त केलेल्या पंक्ती; `autoRepair` false असताना नेहमी `0`.                                                               |
| `backupCreated`   | दुरुस्तीपूर्वी बॅकअप घेतला होता का.                                                                                                      |
| `checkedAt`       | रन आणि त्याद्वारे लिहिल्या जाणाऱ्या कोणत्याही दुरुस्ती नोंदीमध्ये सामायिक असलेला ISO टाइमस्टॅम्प.                                        |
| `driver.name`     | तपासलेल्या डेटाबेसला सेवा देणारा SQLite ड्रायव्हर.                                                                                       |
| `driver.degraded` | लेखन डेटाबेस फाइलमध्ये कायमस्वरूपी जतन केले जात नसल्यास `true` — `sql.js` WASM फॉलबॅक (संपूर्ण-फाइल पर्सिस्टन्स) किंवा इन-मेमरी डेटाबेस. |

तोच पेलोड `omniroute_db_health_check` MCP टूलद्वारे परत केला जातो.

डेटा करप्शन शोधण्यासाठी `PRAGMA integrity_check` चालवा:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# हे प्रिंट झाले पाहिजे: ok
```

जर `ok` व्यतिरिक्त काहीही परत आले, तर **डेटाबेसचा वापर त्वरित थांबवा** आणि बॅकअपमधून पुनर्संचयित करा.

---

## आपत्ती पुनर्प्राप्ती

### परिस्थिती 1: WAL फाइल हरवली

`-wal` फाइल उपलब्ध नाही, परंतु `-shm` आणि मुख्य DB सुरक्षित आहेत:

```bash
# पुढील वेळी उघडल्यावर स्वयंचलितपणे पुनर्प्राप्त होते
omniroute
```

SQLite स्वयंचलितपणे पुनर्प्राप्त करू शकत नसल्यास:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### परिस्थिती 2: मुख्य DB फाइल दूषित झाली

बॅकअपमधून पुनर्संचयित करा:

```bash
omniroute sync pull --merge   # किंवा: omniroute backup restore <backup-id>
```

### परिस्थिती 3: एन्क्रिप्शन की हरवली

कीशिवाय **पुनर्प्राप्ती शक्य नाही**. एन्क्रिप्ट केलेली फील्ड वाचता येणार नाहीत. नवीन क्रेडेन्शियल्ससह सर्व प्रोव्हायडर्स पुन्हा मॅन्युअली जोडा.

> **प्रतिबंधात्मक उपाय**: एन्क्रिप्शन कीचा बॅकअप नेहमी स्वतंत्रपणे घ्या; शक्यतो पासवर्ड मॅनेजर किंवा KMS मध्ये ठेवा.

### परिस्थिती 4: डिस्क पूर्ण भरली

SQLite `SQLITE_FULL` त्रुटी देईल. डिस्कवरील जागा मोकळी करा, त्यानंतर:

```bash
# जागा मोकळी करण्यासाठी WAL चेकपॉइंट करा
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## सामान्य ऑपरेशन्स

### टेबल तपासा

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### सर्व टेबलमधील पंक्ती मोजा

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### सर्व डेटा रीसेट करा (पुसून टाका)

```bash
# प्रथम OmniRoute थांबवा
omniroute stop

# DB फाइल हटवा
rm ~/.omniroute/storage.sqlite*

# पुन्हा सुरू करा (रिकामा DB पुन्हा तयार केला जाईल)
omniroute
```

**निवडक** रीसेटसाठी (प्रोव्हायडर्स ठेवा, वापराचा डेटा पुसून टाका):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### एकच टेबल एक्सपोर्ट करा

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## समस्यानिवारण

### "डेटाबेस लॉक केलेला आहे"

दुसऱ्या प्रक्रियेने लेखन लॉक धरून ठेवला आहे. पुढीलपैकी एक करा:

- दुसरी प्रक्रिया पूर्ण होण्याची प्रतीक्षा करा (`lsof | grep storage.sqlite` तपासा)
- दुसरी प्रक्रिया बंद करा
- समस्या कायम राहिल्यास, OmniRoute पुन्हा सुरू करा

### "फॉरेन की कन्स्ट्रेंट अयशस्वी झाले"

एखादे डोमेन मॉड्यूल संदर्भात्मक अखंडतेचे उल्लंघन करत आहे. पुढील गोष्टी तपासा:

- अवलंबित टेबलमधील अनाथ पंक्ती
- प्रसारित न झालेले कॅस्केडिंग डिलीट्स
- फॉरेन की बदलणारे अलीकडील माइग्रेशन

उल्लंघने शोधण्यासाठी `PRAGMA foreign_key_check;` चालवा.

### "मेमरी अपुरी आहे"

SQLite चे मेमरी-मॅप केलेले I/O OS मर्यादेपेक्षा अधिक आहे. SQLite pragma वापरून ते कमी करा:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB ऐवजी 128MB
```

किंवा ते अक्षम करा:

```sql
PRAGMA mmap_size = 0;
```

### "माइग्रेशन अर्ध्यावर अयशस्वी झाले"

माइग्रेशन ट्रान्झॅक्शनमध्ये चालवले गेले होते, त्यामुळे ते रोलबॅक झालेले असायला हवे. तसे झाले नसल्यास:

1. **OmniRoute थांबवा** (पुढील प्रयत्न टाळा)
2. `sqlite3` वापरून **DB ची स्थिती तपासा**
3. अर्धवट माइग्रेशन **मॅन्युअली दुरुस्त करा**
4. OmniRoute **पुन्हा चालवा** (माइग्रेशनचा पुन्हा प्रयत्न केला जाईल)

हे टाळण्यासाठी, माइग्रेशन्सची नेहमी प्रथम एका प्रतीवर चाचणी करा.

---

## हे देखील पहा

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — वापराची टेबल्स
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — आरोग्य निरीक्षण
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — रिलीज प्रवाह
- स्रोत: `src/lib/db/` (80+ फाइल्स, ~25K LOC)
