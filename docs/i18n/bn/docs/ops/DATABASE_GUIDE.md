# Database Schema & Operations Guide (বাংলা)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **সংক্ষেপে**: OmniRoute তার প্রাথমিক স্টোর হিসেবে **WAL জার্নালিংসহ SQLite** ব্যবহার করে এবং সংবেদনশীল ফিল্ডগুলোর স্থির অবস্থায় এনক্রিপশনের জন্য **AES-256-GCM** ব্যবহার করে। এই নির্দেশিকায় স্কিমা, মাইগ্রেশন, ব্যাকআপ/পুনরুদ্ধার এবং পরিচালনামূলক রানবুক অন্তর্ভুক্ত রয়েছে।

**উৎসসমূহ:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (১৭টি বেস টেবিল)
- `src/lib/db/migrationRunner.ts` — সংস্করণভিত্তিক মাইগ্রেশন
- `src/lib/db/migrations/` — ১৬৭টি সংস্করণভিত্তিক SQL ফাইল
- `src/lib/db/encryption.ts` — এনক্রিপশন সহায়ক
- `src/lib/db/backup.ts` — ব্যাকআপ এক্সপোর্ট/ইমপোর্ট
- `src/lib/db/healthCheck.ts` — স্বাস্থ্যসংক্রান্ত ডায়াগনস্টিকস

---

## SQLite কেন?

OmniRoute বিভিন্ন কারণে PostgreSQL/MySQL-এর পরিবর্তে SQLite বেছে নিয়েছে:

| বিবেচ্য বিষয়         | SQLite                                  | PostgreSQL                             |
| --------------------- | --------------------------------------- | -------------------------------------- |
| **ডিপ্লয়মেন্ট**      | এম্বেডেড — আলাদা সার্ভারের প্রয়োজন নেই | সার্ভার সেটআপের প্রয়োজন               |
| **এনক্রিপশন**         | অ্যাপ্লিকেশন স্তর (AES-256-GCM)         | বিল্ট-ইন TDE                           |
| **পারফরম্যান্স**      | ছোট/মাঝারি কাজের চাপের জন্য দ্রুততর     | বিপুলসংখ্যক সমবর্তী লেখার জন্য উন্নততর |
| **কনকারেন্সি**        | WAL মোড সমবর্তী রিডের অনুমতি দেয়       | পূর্ণাঙ্গ MVCC                         |
| **ব্যাকআপ**           | একক ফাইল কপি                            | `pg_dump` অথবা ফাইলসিস্টেম স্ন্যাপশট   |
| **ব্যবহারের ক্ষেত্র** | প্রতি-ব্যবহারকারী ইনস্টলেশন, এম্বেডেড   | মাল্টি-টেন্যান্ট SaaS                  |

**একক-ব্যবহারকারী, একক-ইনস্ট্যান্স** ডিপ্লয়মেন্টের ক্ষেত্রে (OmniRoute-এর প্রধান ব্যবহারের ক্ষেত্র), SQLite আরও সহজ ও দ্রুত।

### WAL জার্নালিং

`core.ts` ডেটাবেসটি **WAL (Write-Ahead Logging) মোডে** খোলে:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL লেখার সময় **সমবর্তী রিডের** অনুমতি দেয় — এটি ড্যাশবোর্ডের জন্য গুরুত্বপূর্ণ, কারণ অনুরোধগুলো রেকর্ড হওয়ার সময়ই এটি কোয়েরি চালায়।

ডিফল্ট ক্যাশের আকার **৬৫,৫৩৬ KiB (৬৪ MiB)**। SQLite একটি ঋণাত্মক
`cache_size`-কে KiB-এ একটি আনুমানিক সর্বোচ্চ সীমা হিসেবে ব্যাখ্যা করে এবং চাহিদা অনুযায়ী পেজ বরাদ্দ করে।
**Settings > System & Storage > Cache Size**-এ **১ থেকে
১,০০০,০০০ KiB** পর্যন্ত পূর্ণসংখ্যার মান গ্রহণ করা হয়; সেটিংটি সংরক্ষণ করলে তা সক্রিয় ডেটাবেস সংযোগে প্রয়োগ হয়,
এবং স্টার্টআপের সময় OmniRoute সংরক্ষিত মানটি পুনরুদ্ধার করে।

---

## ডেটাবেসের অবস্থান

SQLite ফাইলটি এখানে সংরক্ষিত থাকে:

| OS      | পাথ                                                             |
| ------- | --------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                   |
| macOS   | `~/.omniroute/storage.sqlite`                                   |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                       |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR`-এর মাধ্যমে কনফিগারযোগ্য) |

সহযোগী ফাইলসমূহ:

- `storage.sqlite-wal` — write-ahead লগ
- `storage.sqlite-shm` — শেয়ার্ড মেমরি ফাইল
- `call_logs/` — অনুরোধের পেলোড আর্টিফ্যাক্ট (সক্রিয় থাকলে)

**অবস্থান ওভাররাইড করুন:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## ডোমেইন মডিউল আর্কিটেকচার

OmniRoute-এর ডেটাবেসে `src/lib/db/`-এর মধ্যে **110টি টপ-লেভেল TypeScript মডিউল** রয়েছে। প্রতিটি ডোমেইন মডিউল:

- এক বা একাধিক নির্দিষ্ট টেবিলের মালিকানা রাখে
- টাইপযুক্ত CRUD ফাংশন এক্সপোর্ট করে
- অন্য কোনো মডিউলের টেবিল কখনো স্পর্শ করে না
- DB অ্যাক্সেস করতে `core.ts` থেকে `getDbInstance()` ব্যবহার করে

### 110টি টপ-লেভেল DB মডিউল

OmniRoute-এর `src/lib/db/`-এর মধ্যে **110টি টপ-লেভেল TypeScript ফাইল** রয়েছে। নিচে মূল মডিউলগুলোর কিছু নমুনা দেওয়া হলো; সম্পূর্ণ তালিকার জন্য ডিরেক্টরি লিস্টিং দেখুন:

| মডিউল                   | টেবিল                                                          | দায়িত্ব                                                          |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API কী প্রোভাইডার নিবন্ধন ও ক্রেডেনশিয়াল ব্যবস্থাপনা       |
| `models.ts`             | `key_value` (মডেল ডেটা)                                        | মডেলের সংজ্ঞা, সক্ষমতা ও মূল্য নির্ধারণ                           |
| `combos.ts`             | `combos`                                                       | কম্বো রাউটিং কনফিগারেশন ও ক্রম নির্ধারণ                           |
| `apiKeys.ts`            | `api_keys`                                                     | API কী-এর জীবনচক্র, স্কোপ ও কোটা ট্র্যাকিং                        |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | সিস্টেম কনফিগারেশন ও শেয়ার করা KV স্টোর                          |
| `backup.ts`             | —                                                              | ব্যাকআপ এক্সপোর্ট/ইমপোর্ট অপারেশন                                 |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | প্রক্সি কনফিগারেশন ও রাউটিং নিয়ম                                 |
| `prompts.ts`            | `prompt_templates`                                             | পুনর্ব্যবহারযোগ্য প্রম্পট টেমপ্লেট ও সংস্করণ ব্যবস্থাপনা          |
| `webhooks.ts`           | `webhooks`                                                     | ইভেন্ট-চালিত webhook সাবস্ক্রিপশন ও লগ                            |
| `detailedLogs.ts`       | `request_detail_logs`                                          | প্রতিটি রিকোয়েস্টের অডিট লগিং (ঐচ্ছিক, উচ্চ ভলিউম)               |
| `domainState.ts`        | `domain_*` (5টি টেবিল)                                         | ডোমেইন বাজেট, সার্কিট ব্রেকার, লকআউট, ফলব্যাক চেইন ও খরচের ইতিহাস |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A-এর জন্য অনুমোদিত তালিকাভুক্ত API কী                       |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ঐতিহাসিক কোটা ব্যবহার                                             |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | মডেলগুলোকে ডিফল্ট কম্বোর সঙ্গে ম্যাপ করা                          |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-নির্দিষ্ট স্থায়ী স্টেট                                       |
| `encryption.ts`         | —                                                              | ফিল্ড এনক্রিপ্ট/ডিক্রিপ্ট করার সহায়ক ফাংশন                       |
| `readCache.ts`          | —                                                              | বেশি রিড হওয়া অপারেশনের জন্য ইন-মেমরি ক্যাশ                      |
| `secrets.ts`            | `key_value` (এনক্রিপ্ট করা এন্ট্রি)                            | এনক্রিপ্ট করা সিক্রেট সংরক্ষণ                                     |
| `stateReset.ts`         | —                                                              | পরীক্ষার জন্য DB স্টেট মুছে ফেলা/রিসেট করা                        |
| `contextHandoffs.ts`    | `context_handoffs`                                             | এজেন্ট হ্যান্ডঅফের জন্য সেশন কনটেক্সট                             |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | ব্যবহার ট্র্যাকিং                                                 |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | কম্প্রেশন কনফিগারেশন                                              |

### মডিউলের সীমারেখা

একটি মূল আর্কিটেকচারাল নিয়ম হলো: **মডিউলগুলো সরাসরি একে অপরের টেবিল অ্যাক্সেস করে না**। অন্য কোনো মডিউলের ডেটা নিয়ে কাজ করতে হলে, সেই মডিউল থেকে সংশ্লিষ্ট ফাংশন ইমপোর্ট করুন।

```ts
// ❌ ভুল: অন্য মডিউল থেকে সরাসরি SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ সঠিক: providers মডিউলের ফাংশন ব্যবহার করুন
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

এই নিয়মটি কোড রিভিউয়ের মাধ্যমে প্রয়োগ করা হয়—কোনো স্ট্যাটিক যাচাই নেই, তবে লঙ্ঘন শনাক্ত হলে তা চিহ্নিত করা হয়।

---

## বেস স্কিমা (১৭টি টেবিল)

`core.ts`, `SCHEMA_SQL`-এ ১৭টি বেস টেবিল সংজ্ঞায়িত করে। এগুলো `001_initial_schema.sql` মাইগ্রেশনের মাধ্যমে তৈরি করা হয় এবং মূল স্কিমা গঠন করে।

### মূল টেবিলসমূহ (প্রাথমিক মাইগ্রেশনে তৈরি)

| টেবিল                      | উদ্দেশ্য                                | মূল কলামসমূহ                                                            |
| -------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | প্রোভাইডারের পরিচয়পত্র (এনক্রিপ্ট করা) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | প্রোভাইডার নোডের রাউটিং তথ্য            | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | সাধারণ KV স্টোর                         | `namespace`, `key`, `value`                                             |
| `combos`                   | রাউটিং কম্বোর সংজ্ঞা                    | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | গেটওয়ের জন্য API কী                    | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | ডেটাবেস মেটাডেটা                        | `key`, `value`                                                          |
| `usage_history`            | অনুরোধ ব্যবহারের রেকর্ড                 | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | অনুরোধের পেলোড ও প্রতিক্রিয়া           | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | প্রক্সি অনুরোধের লগ                     | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | মডেল-থেকে-প্রোভাইডার চেইন               | `model`, `chain`                                                        |
| `domain_budgets`           | ডোমেনপ্রতি ব্যয়ের বাজেট                | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | বাজেট রিসেটের ইতিহাস                    | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | ডোমেনপ্রতি খরচের হিসাব                  | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | ডোমেনের রেট-লিমিট অবস্থা                | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | ডোমেনপ্রতি সার্কিট ব্রেকারের অবস্থা     | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM প্রতিক্রিয়ার ক্যাশ                 | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ঐতিহাসিক কোটার স্ন্যাপশট                | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### অতিরিক্ত টেবিলসমূহ (পরবর্তী মাইগ্রেশনগুলোতে যোগ করা)

পরবর্তী মাইগ্রেশনগুলো নিম্নলিখিত টেবিল যোগ করে:

- `cli_tool_state` (মাইগ্রেশন 011) — CLI টুলের অবস্থা
- `mcp_*` টেবিলসমূহ — MCP সার্ভার অডিট
- `a2a_*` টেবিলসমূহ — A2A টাস্কের অবস্থা
- `usage_*` টেবিলসমূহ — ব্যবহারের হিসাব
- `plugin_*` টেবিলসমূহ — প্লাগইন সিস্টেম
- `skill_executions` — স্কিল কার্যকর করার ইতিহাস
- `memory_*` টেবিলসমূহ — মেমরি সিস্টেম
- `compression_*` টেবিলসমূহ — কম্প্রেশন সিস্টেম
- `webhook_*` টেবিলসমূহ — ওয়েবহুক ডেলিভারি লগ
- `acp_*` টেবিলসমূহ — এজেন্ট ক্লায়েন্ট প্রোটোকল
- `oneproxy_*` টেবিলসমূহ — 1proxy মার্কেটপ্লেস
- `proxy_assignments` — প্রক্সি স্কোপ বাইন্ডিং
- `detailed_call_artifacts` — কল লগ আর্টিফ্যাক্টের মেটাডেটা
- `quota_alert_history` — কোটা সতর্কতার অডিট
- `command_code_auth_sessions` — Command Code OAuth সেশন

প্রায় ৩০টিরও বেশি টেবিলের সম্পূর্ণ তালিকা `src/lib/db/migrations/`-এ রয়েছে।

---

## মাইগ্রেশন

OmniRoute `src/lib/db/migrations/`-এ **সংস্করণযুক্ত, আইডেমপোটেন্ট মাইগ্রেশন** ব্যবহার করে। প্রতিটি মাইগ্রেশন হলো `NNN_description.sql` নামে একটি একক SQL ফাইল।

### মাইগ্রেশনের নামকরণ

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### মাইগ্রেশন যেভাবে চলে

স্টার্টআপের সময় `migrationRunner.ts`:

1. `_omniroute_migrations` টেবিলটি না থাকলে তৈরি করে
2. ইতোমধ্যে প্রয়োগ করা মাইগ্রেশনগুলো অনুসন্ধান করে
3. প্রতিটি একটি ট্রানজ্যাকশনের মধ্যে রেখে, যেকোনো নতুন মাইগ্রেশন ক্রমানুসারে প্রয়োগ করে
4. প্রয়োগ করা প্রতিটি মাইগ্রেশন টাইমস্ট্যাম্পসহ রেকর্ড করে

```ts
// src/lib/db/migrationRunner.ts (সরলীকৃত)
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

### আইডেমপোটেন্সি

মাইগ্রেশনগুলো অবশ্যই **আইডেমপোটেন্ট** হতে হবে — সেগুলো দুইবার চালালে কোনো কার্যকর পরিবর্তন হওয়া উচিত নয়:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, এবং `OR IGNORE` / `OR REPLACE` ক্লজ উদারভাবে ব্যবহার করুন।

### নতুন মাইগ্রেশন যোগ করা

1. **পরবর্তী নম্বরটি শনাক্ত করুন**: `ls src/lib/db/migrations/ | tail -1`
2. **ফাইলটি তৈরি করুন**: `NNN_my_change.sql`
3. **নিরাপদ DDL ব্যবহার করুন**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **সতর্কতার সঙ্গে ডেটা ব্যাকফিল করুন**: বিদ্যমান রো পরিচালনা করতে `UPDATE ... WHERE ...` ব্যবহার করুন
5. **একটি কপিতে পরীক্ষা করুন**: পরীক্ষিত নয় এমন মাইগ্রেশন কখনোই প্রোডাকশনে চালাবেন না

উদাহরণ:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **পশ্চাৎ-অসামঞ্জস্যপূর্ণ পরিবর্তনগুলো** (যেমন, কলাম বাদ দেওয়া) জটিল। OmniRoute ডাউনগ্রেড সমর্থন করে না — একবার কোনো মাইগ্রেশন প্রয়োগ করা হলে, স্কিমার পরিবর্তনটি স্থায়ী হয়। সেই অনুযায়ী পরিকল্পনা করুন।

---

## সংরক্ষিত অবস্থায় এনক্রিপশন

সংবেদনশীল ফিল্ডগুলো (API কী, OAuth টোকেন, কানেকশন স্ট্রিং) সংরক্ষিত অবস্থায় **AES-256-GCM** ব্যবহার করে এনক্রিপ্ট করা হয়।

### এটি যেভাবে কাজ করে

```ts
// src/lib/db/encryption.ts (সরলীকৃত)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### যেখানে এটি ব্যবহৃত হয়

- `provider_connections.api_key` — অ্যাপ্লিকেশন স্তরে এনক্রিপ্ট করা
- `provider_connections.access_token`, `refresh_token`, `id_token` — অ্যাপ্লিকেশন স্তরে এনক্রিপ্ট করা
- `namespace = "secrets"`-সহ `key_value` এন্ট্রি — অ্যাপ্লিকেশন স্তরে এনক্রিপ্ট করা
- `proxy_registry.auth` — উপস্থিত থাকলে অ্যাপ্লিকেশন স্তরে এনক্রিপ্ট করা

### এনক্রিপশন কী

এনক্রিপশন কীটি একটি **পাসফ্রেজ** (`STORAGE_ENCRYPTION_KEY` এনভায়রনমেন্ট ভ্যারিয়েবলের মাধ্যমে সেট করা) এবং একটি **সল্ট** (DB-তে সংরক্ষিত) থেকে উদ্ভূত হয়। ডেটা ডিক্রিপ্ট করতে উভয়ই প্রয়োজন।

```bash
# একটি নিরাপদ পাসফ্রেজ তৈরি করুন
openssl rand -hex 32

# .env-এ সেট করুন
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **গুরুত্বপূর্ণ**: এনক্রিপশন কী হারানোর অর্থ হলো সব এনক্রিপ্ট করা ডেটায় অ্যাক্সেস হারানো। **ডেটাবেস থেকে আলাদাভাবে কীটির ব্যাকআপ রাখুন**।

### যা এনক্রিপ্ট করা হয় না

পারফরম্যান্সের কারণে, নিম্নলিখিত তথ্যগুলো প্লেইনটেক্সটে সংরক্ষণ করা হয়:

- প্রোভাইডারের প্রদর্শিত নাম
- মডেলের সংজ্ঞা (ইতোমধ্যেই সর্বজনীন)
- রাউটিং নিয়ম
- ব্যবহারের রেকর্ড (কোনো PII নেই)

---

## এনক্রিপশন-সংক্রান্ত সতর্কতা (v3.8.16+)

OmniRoute দুটি এনক্রিপশন স্কিম স্বচ্ছভাবে পরিচালনা করতে **`migrateLegacyEncryptedString()`** ব্যবহার করে:

- **লিগ্যাসি** (v3.5.0-এর পূর্ববর্তী): XOR-ভিত্তিক "এনক্রিপশন" (প্রকৃত ক্রিপ্টোগ্রাফি নয়)
- **বর্তমান**: যথাযথ IV এবং auth tag-সহ AES-256-GCM

মাইগ্রেশন সহায়কটি লিগ্যাসি ফরম্যাট শনাক্ত করে এবং প্রথমবার পড়ার সময় নতুন স্কিম দিয়ে পুনরায় এনক্রিপ্ট করে। এর অর্থ হলো, ক্রেডেনশিয়াল না হারিয়েই আপনি একটি পুরোনো ডেটাবেস আপগ্রেড করতে পারবেন।

---

## রিড ক্যাশ

ঘন ঘন পড়া ডেটার (মডেল, প্রোভাইডার, সেটিংস) জন্য `readCache.ts` একটি **ইন-মেমরি ক্যাশ** প্রদান করে:

```ts
// স্টার্টআপের সময় ক্যাশ করা হয়, লেখার সময় অকার্যকর করা হয়
const providers = await getCachedProviders(); // দ্রুত, ইন-মেমরি
const fresh = await listProviders(); // ধীর, DB-তে অ্যাক্সেস করে
```

| ক্যাশ করা এন্টিটি      | ক্যাশ কী       | TTL          |
| ---------------------- | -------------- | ------------ |
| `models`               | `models:v1`    | লেখা পর্যন্ত |
| `provider_connections` | `providers:v1` | লেখা পর্যন্ত |
| `settings`             | `settings:v1`  | লেখা পর্যন্ত |
| `combos`               | `combos:v1`    | লেখা পর্যন্ত |

সংশ্লিষ্ট টেবিলে প্রতিবার লেখার সময় ক্যাশ অকার্যকর করা হয়।

---

## ব্যাকআপ এবং পুনরুদ্ধার

### ম্যানুয়াল ব্যাকআপ

```bash
# একটি লোকাল ব্যাকআপ তৈরি করতে CLI ব্যবহার করুন
omniroute backup create --name pre-migration

# অথবা API-এর মাধ্যমে
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

ব্যাকআপ ফাইলে অন্তর্ভুক্ত থাকে:

- সব DB টেবিল (JSON-এ সিরিয়ালাইজ করা)
- কল লগ আর্টিফ্যাক্ট (base64-এনকোডেড, ঐচ্ছিক)
- সেটিংস + সিক্রেট (এনক্রিপ্ট করা)
- প্লাগইন কনফিগারেশন

### পুনরুদ্ধার

```bash
# CLI-এর মাধ্যমে
omniroute restore pre-migration

# API-এর মাধ্যমে
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **সতর্কতা**: পুনরুদ্ধার সম্পূর্ণ DB ওভাররাইট করে। প্রথমে সব ক্লায়েন্ট বন্ধ করুন।

### স্বয়ংক্রিয় ব্যাকআপ

```bash
# CLI-এর মাধ্যমে স্বয়ংক্রিয় দৈনিক ব্যাকআপ সক্রিয় করুন
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

সময়সূচিটি সার্ভার-সাইডে একটি ব্যাকগ্রাউন্ড জব দ্বারা কার্যকর করা হয়, যা প্রতি 30 সেকেন্ডে
(ডিফল্ট) টিক করে এবং লোকাল সার্ভারের সময় অনুযায়ী cron এক্সপ্রেশন মূল্যায়ন করে।

| ভেরিয়েবল                                   | ডিফল্ট  | বিবরণ                                                                                                                            |
| ------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | ms-এ টিকের ব্যবধান (সর্বনিম্ন `5000`)। মিলে যাওয়া cron মিনিটের মধ্যে নির্ভরযোগ্যভাবে পড়তে এটি অবশ্যই 60 s-এর চেয়ে কম হতে হবে। |

### SQLite হট ব্যাকআপ

সচল DB-এর শূন্য-ডাউনটাইম ব্যাকআপের জন্য:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

এটি SQLite-এর অনলাইন ব্যাকআপ API ব্যবহার করে—OmniRoute চলমান থাকা অবস্থায়ও এটি নিরাপদে চালানো যায়।

---

## কর্মক্ষমতা টিউনিং

### WAL মোড

WAL ডিফল্টভাবে সক্রিয় থাকে। বেশি লেখার কাজের চাপের ক্ষেত্রে বিবেচনা করুন:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- প্রতি 1000 পেজে চেকপয়েন্ট
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL সীমা
```

### ইনডেক্সসমূহ

কর্মক্ষমতার জন্য গুরুত্বপূর্ণ ইনডেক্সসমূহ (মাইগ্রেশন দ্বারা স্বয়ংক্রিয়ভাবে তৈরি):

- `idx_models_provider` — প্রোভাইডার অনুযায়ী মডেল অনুসন্ধান
- `idx_combo_targets_combo_id` — কম্বো টার্গেট সম্প্রসারণ
- `idx_usage_history_api_key_timestamp` — ব্যবহার বিশ্লেষণ
- `idx_quota_snapshots_api_key_window` — কোটা ট্র্যাকিং
- `idx_call_logs_timestamp` — কল লগ কোয়েরি

নতুন ইনডেক্স যোগ করতে একটি মাইগ্রেশন তৈরি করুন:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### মেমরি-ম্যাপড I/O

অত্যন্ত বড় ডেটাবেসের (>10GB) ক্ষেত্রে SQLite pragma-এর মাধ্যমে মেমরি ম্যাপিং সামঞ্জস্য করা যায়:

```sql
-- SQLite pragma-এর মাধ্যমে সেট করুন (core.ts বা রানটাইমে সামঞ্জস্য করুন)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### কমপ্যাকশন

দীর্ঘ সময় ধরে চলমান OmniRoute ইনস্ট্যান্সগুলো মাঝে মাঝে `VACUUM` চালালে উপকৃত হয়:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

কম ট্রাফিকের সময়ে মাসে একবার চালান। (WAL মোড এর প্রয়োজনীয়তা কমায়, তবে পুরোপুরি দূর করে না।)

---

## স্বাস্থ্য পরীক্ষা

`src/lib/db/healthCheck.ts` **DB-স্তরের স্বাস্থ্য ডায়াগনস্টিকস** প্রদান করে:

উভয় verb-এর জন্যই প্রমাণীকরণ প্রয়োজন (অন্যথায় `401`)। `GET` শুধু রোগনির্ণয় করে; `POST` একই পরীক্ষা `autoRepair` সক্রিয় রেখে চালায়।

```bash
GET  /api/db/health   # রোগনির্ণয়
POST /api/db/health   # রোগনির্ণয় + মেরামত
```

রেসপন্সটি হলো `runDbHealthCheck()` দ্বারা উৎপন্ন `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "ডোমেইন বাজেটগুলো এমন API কী উল্লেখ করেছে, যেগুলো আর বিদ্যমান নেই।",
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

| ফিল্ড             | অর্থ                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` খালি হলে `true`। `driver` কখনো এটিকে প্রভাবিত করে না।                                                                                    |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`-এর যেকোনো একটি।                                                   |
| `repairedCount`   | এই রানের সময় মেরামত করা সারির সংখ্যা; `autoRepair` false হলে সর্বদা `0`।                                                                         |
| `backupCreated`   | মেরামতের আগে ব্যাকআপ নেওয়া হয়েছিল কি না।                                                                                                        |
| `checkedAt`       | রান এবং এর লেখা যেকোনো মেরামত নোটে ব্যবহৃত অভিন্ন ISO টাইমস্ট্যাম্প।                                                                              |
| `driver.name`     | পরীক্ষিত ডেটাবেসটি পরিবেশনকারী SQLite ড্রাইভার।                                                                                                   |
| `driver.degraded` | ডেটাবেস ফাইল দ্বারা লেখাগুলো স্থায়ীভাবে সংরক্ষিত না হলে `true` — `sql.js` WASM ফলব্যাক (সম্পূর্ণ-ফাইল পার্সিস্টেন্স) অথবা একটি ইন-মেমরি ডেটাবেস। |

একই পেলোড `omniroute_db_health_check` MCP টুল দ্বারাও ফেরত দেওয়া হয়।

করাপশন শনাক্ত করতে `PRAGMA integrity_check` চালান:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# যা প্রিন্ট হওয়া উচিত: ok
```

এটি `ok` ছাড়া অন্য কিছু ফেরত দিলে, **অবিলম্বে ডেটাবেস ব্যবহার বন্ধ করুন** এবং ব্যাকআপ থেকে পুনরুদ্ধার করুন।

---

## দুর্যোগ পুনরুদ্ধার

### পরিস্থিতি ১: WAL ফাইল হারিয়ে গেছে

`-wal` ফাইলটি অনুপস্থিত, কিন্তু `-shm` এবং মূল DB অক্ষত রয়েছে:

```bash
# পরবর্তীবার খোলার সময় স্বয়ংক্রিয়ভাবে পুনরুদ্ধার হয়
omniroute
```

SQLite স্বয়ংক্রিয়ভাবে পুনরুদ্ধার করতে না পারলে:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### পরিস্থিতি ২: মূল DB ফাইল ক্ষতিগ্রস্ত

ব্যাকআপ থেকে পুনরুদ্ধার করুন:

```bash
omniroute sync pull --merge   # অথবা: omniroute backup restore <backup-id>
```

### পরিস্থিতি ৩: এনক্রিপশন কী হারিয়ে গেছে

কী ছাড়া **পুনরুদ্ধার সম্ভব নয়**। এনক্রিপ্ট করা ফিল্ডগুলো পড়া যাবে না। নতুন ক্রেডেনশিয়াল দিয়ে সব প্রোভাইডার ম্যানুয়ালি পুনরায় যোগ করুন।

> **প্রতিকার**: এনক্রিপশন কী সবসময় আলাদাভাবে ব্যাকআপ করুন, আদর্শভাবে কোনো পাসওয়ার্ড ম্যানেজার বা KMS-এ।

### পরিস্থিতি ৪: ডিস্ক পূর্ণ

SQLite `SQLITE_FULL` ত্রুটি ফেরত দেবে। ডিস্কে জায়গা খালি করুন, তারপর:

```bash
# জায়গা খালি করতে WAL চেকপয়েন্ট করুন
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## সাধারণ কার্যক্রম

### একটি টেবিল পরিদর্শন করুন

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### সব টেবিলের সারি গণনা করুন

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### সব ডেটা রিসেট (মুছে) করুন

```bash
# প্রথমে OmniRoute বন্ধ করুন
omniroute stop

# DB ফাইলটি মুছুন
rm ~/.omniroute/storage.sqlite*

# পুনরায় চালু করুন (খালি DB আবার তৈরি হবে)
omniroute
```

**নির্বাচিতভাবে** রিসেট করতে (প্রোভাইডারগুলো রেখে ব্যবহারের ডেটা মুছতে):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### একটি টেবিল এক্সপোর্ট করুন

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## সমস্যা সমাধান

### "ডেটাবেস লক করা আছে"

অন্য একটি প্রসেস রাইট লক ধরে রেখেছে। নিচের যেকোনো একটি করুন:

- অন্য প্রসেসটি শেষ হওয়ার জন্য অপেক্ষা করুন (`lsof | grep storage.sqlite` দিয়ে পরীক্ষা করুন)
- অন্য প্রসেসটি বন্ধ করে দিন
- সমস্যা স্থায়ী হলে OmniRoute পুনরায় চালু করুন

### "ফরেন কী কনস্ট্রেইন্ট ব্যর্থ হয়েছে"

কোনো ডোমেইন মডিউল রেফারেনশিয়াল ইন্টেগ্রিটি লঙ্ঘন করছে। পরীক্ষা করুন:

- নির্ভরশীল টেবিলে অনাথ সারি
- যেসব ক্যাসকেডিং ডিলিট ছড়িয়ে পড়েনি
- ফরেন কী পরিবর্তন করা সাম্প্রতিক মাইগ্রেশন

লঙ্ঘনগুলো খুঁজতে `PRAGMA foreign_key_check;` চালান।

### "মেমরি শেষ"

SQLite-এর মেমরি-ম্যাপড I/O অপারেটিং সিস্টেমের সীমা অতিক্রম করছে। SQLite pragma ব্যবহার করে কমান:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB-এর পরিবর্তে 128MB
```

অথবা নিষ্ক্রিয় করুন:

```sql
PRAGMA mmap_size = 0;
```

### "মাইগ্রেশন মাঝপথে ব্যর্থ হয়েছে"

মাইগ্রেশনটি একটি ট্রানজ্যাকশনে চলেছে, তাই এটি রোলব্যাক হয়ে যাওয়ার কথা। তা না হলে:

1. **OmniRoute বন্ধ করুন** (পরবর্তী প্রচেষ্টা প্রতিরোধ করতে)
2. `sqlite3` দিয়ে **DB-এর অবস্থা পরীক্ষা করুন**
3. আংশিক মাইগ্রেশনটি **ম্যানুয়ালি ঠিক করুন**
4. OmniRoute **পুনরায় চালু করুন** (মাইগ্রেশনটি আবার চেষ্টা করা হবে)

এটি প্রতিরোধ করতে, সবসময় প্রথমে একটি কপিতে মাইগ্রেশন পরীক্ষা করুন।

---

## আরও দেখুন

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — ব্যবহারের টেবিলসমূহ
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — স্বাস্থ্য পর্যবেক্ষণ
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — রিলিজ প্রবাহ
- সোর্স: `src/lib/db/` (৮০টির বেশি ফাইল, প্রায় ২৫K LOC)
