# Database Schema & Operations Guide (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute သည် ၎င်း၏ အဓိကဒေတာသိုလှောင်မှုအဖြစ် **WAL journaling ပါဝင်သော SQLite** ကို အသုံးပြုပြီး အရေးကြီးသော field များကို သိမ်းဆည်းထားစဉ် **AES-256-GCM** ဖြင့် encryption ပြုလုပ်ထားသည်။ ဤလမ်းညွှန်တွင် schema၊ migration များ၊ backup/recovery နှင့် လုပ်ငန်းလည်ပတ်မှုဆိုင်ရာ runbook များကို ဖော်ပြထားသည်။

**ရင်းမြစ်များ:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (အခြေခံ table 17 ခု)
- `src/lib/db/migrationRunner.ts` — version အလိုက် migration များ
- `src/lib/db/migrations/` — version အလိုက် SQL file 167 ခု
- `src/lib/db/encryption.ts` — encryption အကူ function များ
- `src/lib/db/backup.ts` — backup export/import
- `src/lib/db/healthCheck.ts` — စနစ်အခြေအနေ စစ်ဆေးရှာဖွေခြင်း

---

## SQLite ကို ဘာကြောင့် အသုံးပြုသနည်း?

OmniRoute သည် အောက်ပါအကြောင်းရင်းများကြောင့် PostgreSQL/MySQL အစား SQLite ကို ရွေးချယ်ထားသည်-

| အချက်                        | SQLite                                                       | PostgreSQL                                                             |
| ---------------------------- | ------------------------------------------------------------ | ---------------------------------------------------------------------- |
| **Deployment**               | တစ်ပါတည်းထည့်သွင်းထားသည် — သီးခြား server မလိုအပ်ပါ          | Server တည်ဆောက်သတ်မှတ်ရန် လိုအပ်သည်                                    |
| **Encryption**               | Application အလွှာ (AES-256-GCM)                              | ထည့်သွင်းပါရှိသော TDE                                                  |
| **စွမ်းဆောင်ရည်**            | အသေးစား/အလတ်စား workload များအတွက် ပိုမြန်သည်                | အလွန်များပြားသော တစ်ပြိုင်နက် write လုပ်ဆောင်မှုများအတွက် ပိုကောင်းသည် |
| **တစ်ပြိုင်နက်လုပ်ဆောင်မှု** | WAL mode က တစ်ပြိုင်နက် read လုပ်ဆောင်မှုများကို ခွင့်ပြုသည် | MVCC အပြည့်အစုံ                                                        |
| **Backup**                   | File တစ်ခုတည်းကို ကူးယူနိုင်သည်                              | `pg_dump` သို့မဟုတ် filesystem snapshot                                |
| **အသုံးပြုမှုအခြေအနေ**       | အသုံးပြုသူတစ်ဦးချင်းစီ၏ install၊ embedded                    | Multi-tenant SaaS                                                      |

**အသုံးပြုသူတစ်ဦး၊ instance တစ်ခုတည်း** ဖြင့် deployment လုပ်ခြင်းများ (OmniRoute ၏ အဓိကအသုံးပြုမှုအခြေအနေ) အတွက် SQLite သည် ပိုမိုရိုးရှင်းပြီး မြန်ဆန်သည်။

### WAL Journaling

`core.ts` သည် database ကို **WAL (Write-Ahead Logging) mode** ဖြင့် ဖွင့်သည်-

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL သည် write လုပ်နေစဉ်အတွင်း **တစ်ပြိုင်နက် read လုပ်ဆောင်မှုများ** ကို ခွင့်ပြုသည် — request များကို မှတ်တမ်းတင်နေစဉ် query ပြုလုပ်သည့် dashboard အတွက် ဤအချက်သည် အရေးကြီးသည်။

မူလ cache အရွယ်အစားမှာ **65,536 KiB (64 MiB)** ဖြစ်သည်။ SQLite သည် အနုတ်တန်ဖိုးရှိသော
`cache_size` ကို KiB ဖြင့် သတ်မှတ်ထားသည့် ခန့်မှန်းအများဆုံးကန့်သတ်ချက်အဖြစ် သတ်မှတ်ပြီး လိုအပ်သလို page များကို နေရာချပေးသည်။
**Settings > System & Storage > Cache Size** တွင် **1 မှ
1,000,000 KiB** အထိ ကိန်းပြည့်တန်ဖိုးများကို လက်ခံသည်။ setting ကို သိမ်းဆည်းလိုက်ပါက လက်ရှိ database connection တွင် ချက်ချင်းသက်ရောက်ပြီး
OmniRoute စတင်ချိန်တွင် သိမ်းဆည်းထားသောတန်ဖိုးကို ပြန်လည်အသုံးပြုသည်။

---

## Database တည်နေရာ

SQLite file ကို အောက်ပါနေရာတွင် သိမ်းဆည်းထားသည်-

| OS      | လမ်းကြောင်း                                                              |
| ------- | ------------------------------------------------------------------------ |
| Linux   | `~/.omniroute/storage.sqlite`                                            |
| macOS   | `~/.omniroute/storage.sqlite`                                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                                |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` မှတစ်ဆင့် ပြင်ဆင်သတ်မှတ်နိုင်သည်) |

ဆက်စပ် file များ-

- `storage.sqlite-wal` — write-ahead log
- `storage.sqlite-shm` — shared memory file
- `call_logs/` — request payload artifact များ (ဖွင့်ထားပါက)

**တည်နေရာကို အစားထိုးသတ်မှတ်ရန်:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## Domain Module တည်ဆောက်ပုံ

OmniRoute ၏ database တွင် `src/lib/db/` အတွင်း၌ **ထိပ်တန်းအဆင့် TypeScript module 110 ခု** ရှိသည်။ Domain module တစ်ခုစီသည်-

- သတ်မှတ်ထားသော table တစ်ခု သို့မဟုတ် တစ်ခုထက်ပို၍ ပိုင်ဆိုင်သည်
- Type ပါဝင်သော CRUD function များကို export လုပ်သည်
- အခြား module ၏ table များကို မည်သည့်အခါမျှ တိုက်ရိုက်မကိုင်တွယ်ပါ
- DB ကို အသုံးပြုရန် `core.ts` မှ `getDbInstance()` ကို အသုံးပြုသည်

### ထိပ်တန်းအဆင့် DB Module 110 ခု

OmniRoute တွင် `src/lib/db/` အတွင်း၌ **ထိပ်တန်းအဆင့် TypeScript file 110 ခု** ရှိသည်။ အောက်တွင် အဓိက module အချို့ကို နမူနာအဖြစ် ဖော်ပြထားသည်။ စာရင်းအပြည့်အစုံအတွက် directory စာရင်းကို ကြည့်ပါ-

| Module                  | Table များ                                                     | တာဝန်                                                                                                |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API key provider မှတ်ပုံတင်ခြင်းနှင့် အထောက်အထားများ                                           |
| `models.ts`             | `key_value` (model data)                                       | Model သတ်မှတ်ချက်များ၊ စွမ်းဆောင်ရည်များနှင့် ဈေးနှုန်းသတ်မှတ်ခြင်း                                  |
| `combos.ts`             | `combos`                                                       | Combo routing config များနှင့် အစီအစဉ်သတ်မှတ်ခြင်း                                                   |
| `apiKeys.ts`            | `api_keys`                                                     | API key သက်တမ်းစက်ဝန်း၊ scope များနှင့် quota ခြေရာခံခြင်း                                           |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | System configuration နှင့် မျှဝေထားသော KV store                                                      |
| `backup.ts`             | —                                                              | Backup export/import လုပ်ဆောင်ချက်များ                                                               |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | Proxy config များနှင့် routing rule များ                                                             |
| `prompts.ts`            | `prompt_templates`                                             | ပြန်လည်အသုံးပြုနိုင်သော prompt template များနှင့် version ထိန်းချုပ်ခြင်း                            |
| `webhooks.ts`           | `webhooks`                                                     | Event-driven webhook subscription များနှင့် log များ                                                 |
| `detailedLogs.ts`       | `request_detail_logs`                                          | Request တစ်ခုချင်းစီအလိုက် audit logging ပြုလုပ်ခြင်း (ရွေးချယ်နိုင်ပြီး ပမာဏများနိုင်သည်)           |
| `domainState.ts`        | `domain_*` (table 5 ခု)                                        | Domain budget များ၊ circuit breaker များ၊ lockout များ၊ fallback chain များနှင့် ကုန်ကျစရိတ်မှတ်တမ်း |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A အတွက် ခွင့်ပြုစာရင်းသွင်းထားသော API key များ                                                 |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ယခင် quota အသုံးပြုမှုမှတ်တမ်း                                                                       |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | Model များကို မူလ combo များနှင့် mapping လုပ်ခြင်း                                                  |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI အတွက် သီးသန့် သိမ်းဆည်းထားသော အခြေအနေ                                                            |
| `encryption.ts`         | —                                                              | Field များကို encrypt/decrypt လုပ်ရန် helper များ                                                    |
| `readCache.ts`          | —                                                              | Read operation များသော လုပ်ဆောင်ချက်များအတွက် in-memory cache                                        |
| `secrets.ts`            | `key_value` (encrypted entries)                                | Encrypt လုပ်ထားသော secret များကို သိမ်းဆည်းခြင်း                                                     |
| `stateReset.ts`         | —                                                              | စမ်းသပ်မှုအတွက် DB state ကို ရှင်းလင်းခြင်း/reset လုပ်ခြင်း                                          |
| `contextHandoffs.ts`    | `context_handoffs`                                             | Agent handoff အတွက် session context                                                                  |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | အသုံးပြုမှု ခြေရာခံခြင်း                                                                             |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | Compression config                                                                                   |

### Module နယ်နိမိတ်များ

အဓိက တည်ဆောက်ပုံဆိုင်ရာ စည်းမျဉ်းတစ်ခုမှာ- **module များသည် အခြား module များ၏ table များကို တိုက်ရိုက် အသုံးမပြုရပါ**။ အခြား module တစ်ခု၏ data နှင့် အလုပ်လုပ်ရန် ထို module မှ function ကို import လုပ်ပါ။

```ts
// ❌ မှားသည်- အခြား module မှ SQL ကို တိုက်ရိုက်အသုံးပြုခြင်း
db.prepare("SELECT * FROM provider_connections").all();

// ✅ မှန်သည်- providers module ၏ function ကို အသုံးပြုခြင်း
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

ဤစည်းမျဉ်းကို code review ဖြင့် လိုက်နာစေသည်—static check မရှိသော်လည်း ချိုးဖောက်မှုများကို မှတ်သားသတိပေးမည်ဖြစ်သည်။

---

## အခြေခံ Schema (ဇယား 17 ခု)

`core.ts` သည် `SCHEMA_SQL` ထဲရှိ အခြေခံဇယား 17 ခုကို သတ်မှတ်ပေးသည်။ ၎င်းတို့ကို migration `001_initial_schema.sql` က ဖန်တီးပြီး ပင်မ schema ကို ဖွဲ့စည်းထားသည်။

### ပင်မဇယားများ (ကနဦး migration တွင် ဖန်တီးထားသည်)

| ဇယား                       | ရည်ရွယ်ချက်                                      | အဓိက column များ                                                        |
| -------------------------- | ------------------------------------------------ | ----------------------------------------------------------------------- |
| `provider_connections`     | Provider အထောက်အထားများ (ကုဒ်ဝှက်ထားသည်)         | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | Provider node လမ်းကြောင်းဆိုင်ရာ အချက်အလက်       | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | ယေဘုယျ KV သိမ်းဆည်းရာ                            | `namespace`, `key`, `value`                                             |
| `combos`                   | လမ်းကြောင်း combo သတ်မှတ်ချက်များ                | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | Gateway အတွက် API key များ                       | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | ဒေတာဘေ့စ် metadata                               | `key`, `value`                                                          |
| `usage_history`            | တောင်းဆိုမှု အသုံးပြုမှုမှတ်တမ်းများ             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | တောင်းဆိုမှု payload များနှင့် တုံ့ပြန်ချက်များ  | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | Proxy တောင်းဆိုမှု မှတ်တမ်းများ                  | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | Model မှ provider သို့ chain များ                | `model`, `chain`                                                        |
| `domain_budgets`           | Domain တစ်ခုချင်းအလိုက် သုံးစွဲငွေ ဘတ်ဂျက်များ   | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | ဘတ်ဂျက် ပြန်လည်သတ်မှတ်မှု မှတ်တမ်း               | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | Domain တစ်ခုချင်းအလိုက် ကုန်ကျစရိတ် ခြေရာခံခြင်း | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | Domain rate-limit အခြေအနေ                        | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | Domain တစ်ခုချင်းအလိုက် circuit breaker အခြေအနေ  | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM တုံ့ပြန်ချက် cache                           | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ယခင် quota snapshot များ                         | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### ထပ်ဆောင်းဇယားများ (နောက်ပိုင်း migration များမှ ထည့်သွင်းထားသည်)

နောက်ဆက်တွဲ migration များက အောက်ပါဇယားများကို ထည့်သွင်းပေးသည်-

- `cli_tool_state` (migration 011) — CLI tool အခြေအနေ
- `mcp_*` ဇယားများ — MCP server စစ်ဆေးမှုမှတ်တမ်း
- `a2a_*` ဇယားများ — A2A လုပ်ငန်းဆောင်တာ အခြေအနေ
- `usage_*` ဇယားများ — အသုံးပြုမှု ခြေရာခံခြင်း
- `plugin_*` ဇယားများ — plugin စနစ်
- `skill_executions` — skill လုပ်ဆောင်မှုမှတ်တမ်း
- `memory_*` ဇယားများ — memory စနစ်
- `compression_*` ဇယားများ — compression စနစ်
- `webhook_*` ဇယားများ — webhook ပေးပို့မှုမှတ်တမ်း
- `acp_*` ဇယားများ — Agent Client Protocol
- `oneproxy_*` ဇယားများ — 1proxy marketplace
- `proxy_assignments` — proxy scope ချိတ်ဆက်မှုများ
- `detailed_call_artifacts` — call log artifact metadata
- `quota_alert_history` — quota သတိပေးချက် စစ်ဆေးမှုမှတ်တမ်း
- `command_code_auth_sessions` — Command Code OAuth session များ

ဇယား ~30+ ခု၏ စာရင်းအပြည့်အစုံကို `src/lib/db/migrations/` တွင် တွေ့နိုင်သည်။

---

## မိုင်ဂရေးရှင်းများ

OmniRoute သည် `src/lib/db/migrations/` တွင် **ဗားရှင်းသတ်မှတ်ထားပြီး ထပ်ခါတလဲလဲ လုပ်ဆောင်သော်လည်း ရလဒ်မပြောင်းလဲသော မိုင်ဂရေးရှင်းများ** ကို အသုံးပြုသည်။ မိုင်ဂရေးရှင်းတစ်ခုစီသည် `NNN_description.sql` ဟု အမည်ပေးထားသော SQL ဖိုင်တစ်ဖိုင်ဖြစ်သည်။

### မိုင်ဂရေးရှင်း အမည်ပေးခြင်း

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### မိုင်ဂရေးရှင်းများ လုပ်ဆောင်ပုံ

စတင်ချိန်တွင် `migrationRunner.ts` သည်-

1. `_omniroute_migrations` ဇယား မရှိသေးပါက ဖန်တီးသည်
2. အသုံးချပြီးသော မိုင်ဂရေးရှင်းများကို ရှာဖွေစစ်ဆေးသည်
3. မိုင်ဂရေးရှင်းအသစ်များကို အစဉ်လိုက် အသုံးချပြီး တစ်ခုစီကို transaction တစ်ခုအတွင်း လုပ်ဆောင်သည်
4. အသုံးချပြီးသော မိုင်ဂရေးရှင်းတစ်ခုစီကို timestamp နှင့်တကွ မှတ်တမ်းတင်သည်

```ts
// src/lib/db/migrationRunner.ts (ရိုးရှင်းအောင် ပြထားသည်)
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

### ထပ်ခါတလဲလဲ လုပ်ဆောင်နိုင်မှု

မိုင်ဂရေးရှင်းများသည် **ထပ်ခါတလဲလဲ လုပ်ဆောင်သော်လည်း ရလဒ်မပြောင်းလဲနိုင်ရမည်** — နှစ်ကြိမ်လုပ်ဆောင်ပါက ဒုတိယအကြိမ်တွင် မည်သည့်ပြောင်းလဲမှုမျှ မဖြစ်သင့်ပါ-

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS` နှင့် `OR IGNORE` / `OR REPLACE` clause များကို လိုအပ်သလို ကျယ်ကျယ်ပြန့်ပြန့် အသုံးပြုပါ။

### မိုင်ဂရေးရှင်းအသစ် ထည့်သွင်းခြင်း

1. **နောက်ထပ်နံပါတ်ကို သတ်မှတ်ပါ**- `ls src/lib/db/migrations/ | tail -1`
2. **ဖိုင်ကို ဖန်တီးပါ**- `NNN_my_change.sql`
3. **လုံခြုံသော DDL ကို အသုံးပြုပါ**- `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **ဒေတာများကို ဂရုတစိုက် ပြန်လည်ဖြည့်သွင်းပါ**- ရှိပြီးသား row များကို ကိုင်တွယ်ရန် `UPDATE ... WHERE ...` ကို အသုံးပြုပါ
5. **မိတ္တူတစ်ခုတွင် စမ်းသပ်ပါ**- မစမ်းသပ်ရသေးသော မိုင်ဂရေးရှင်းများကို production တွင် မည်သည့်အခါမျှ မလုပ်ဆောင်ပါနှင့်

ဥပမာ-

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **နောက်ပြန်သဟဇာတမဖြစ်သော ပြောင်းလဲမှုများ** (ဥပမာ၊ column များကို ဖယ်ရှားခြင်း) သည် ကိုင်တွယ်ရန် ခက်ခဲသည်။ OmniRoute သည် downgrade ကို မပံ့ပိုးပါ — မိုင်ဂရေးရှင်းတစ်ခုကို အသုံးချပြီးသည်နှင့် schema ပြောင်းလဲမှုသည် အမြဲတမ်း အတည်ဖြစ်သွားမည်။ ထိုအချက်နှင့်အညီ ကြိုတင်စီစဉ်ပါ။

---

## သိမ်းဆည်းထားစဉ် ကုဒ်ဝှက်ခြင်း

အရေးကြီးသော field များ (API key များ၊ OAuth token များ၊ connection string များ) ကို သိမ်းဆည်းထားစဉ် **AES-256-GCM** ဖြင့် ကုဒ်ဝှက်ထားသည်။

### အလုပ်လုပ်ပုံ

```ts
// src/lib/db/encryption.ts (ရိုးရှင်းအောင် ပြထားသည်)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### အသုံးပြုထားသည့်နေရာများ

- `provider_connections.api_key` — application အဆင့်တွင် ကုဒ်ဝှက်ထားသည်
- `provider_connections.access_token`, `refresh_token`, `id_token` — application အဆင့်တွင် ကုဒ်ဝှက်ထားသည်
- `namespace = "secrets"` ပါရှိသော `key_value` entry များ — application အဆင့်တွင် ကုဒ်ဝှက်ထားသည်
- `proxy_registry.auth` — ရှိပါက application အဆင့်တွင် ကုဒ်ဝှက်ထားသည်

### ကုဒ်ဝှက်ခြင်း Key

ကုဒ်ဝှက်ခြင်း key ကို **passphrase** (`STORAGE_ENCRYPTION_KEY` env var မှတစ်ဆင့် သတ်မှတ်သည်) နှင့် **salt** (DB ထဲတွင် သိမ်းဆည်းထားသည်) တို့မှ ထုတ်ယူသည်။ ဒေတာကို ကုဒ်ပြန်ဖြည်ရန် နှစ်ခုစလုံး လိုအပ်သည်။

```bash
# လုံခြုံသော passphrase တစ်ခု ထုတ်လုပ်ရန်
openssl rand -hex 32

# .env တွင် သတ်မှတ်ရန်
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **အလွန်အရေးကြီးသည်**- ကုဒ်ဝှက်ခြင်း key ပျောက်ဆုံးသွားပါက ကုဒ်ဝှက်ထားသော ဒေတာအားလုံးကို အသုံးပြုခွင့် ဆုံးရှုံးမည်ဖြစ်သည်။ **Key ကို database နှင့် သီးခြားစီ အရန်သိမ်းဆည်းပါ**။

### ကုဒ်ဝှက်မထားသည့်အရာများ

စွမ်းဆောင်ရည်ဆိုင်ရာ အကြောင်းပြချက်များကြောင့် အောက်ပါတို့ကို plaintext ဖြင့် သိမ်းဆည်းထားသည်-

- Provider ပြသမှုအမည်များ
- Model သတ်မှတ်ချက်များ (မူလကတည်းက အများသိနိုင်သော အချက်အလက်များဖြစ်သည်)
- Routing စည်းမျဉ်းများ
- အသုံးပြုမှုမှတ်တမ်းများ (PII မပါဝင်ပါ)

---

## ကုဒ်ဝှက်ခြင်းဆိုင်ရာ သတိပြုရန်အချက်များ (v3.8.16+)

OmniRoute သည် ကုဒ်ဝှက်ခြင်းနည်းလမ်းနှစ်မျိုးကို အသုံးပြုသူအတွက် ခွဲခြားသိရန်မလိုဘဲ ကိုင်တွယ်ရန် **`migrateLegacyEncryptedString()`** ကို အသုံးပြုသည်-

- **အဟောင်း** (v3.5.0 မတိုင်မီ)- XOR အခြေခံ "ကုဒ်ဝှက်ခြင်း" (စစ်မှန်သော cryptography မဟုတ်ပါ)
- **လက်ရှိ**- သင့်လျော်သော IV နှင့် auth tag ပါဝင်သည့် AES-256-GCM

ရွှေ့ပြောင်းခြင်း အကူလုပ်ဆောင်ချက်သည် အဟောင်း format ကို စစ်ဆေးသိရှိပြီး ပထမဆုံးဖတ်သည့်အချိန်တွင် နည်းလမ်းအသစ်ဖြင့် ပြန်လည်ကုဒ်ဝှက်သည်။ ထို့ကြောင့် အထောက်အထားများ မဆုံးရှုံးဘဲ database အဟောင်းတစ်ခုကို အဆင့်မြှင့်နိုင်သည်။

---

## ဖတ်ရှုမှု Cache

မကြာခဏဖတ်ရှုရသည့် ဒေတာများ (models၊ providers၊ settings) အတွက် `readCache.ts` က **memory အတွင်းရှိ cache** တစ်ခုကို ပံ့ပိုးပေးသည်-

```ts
// စတင်ချိန်တွင် cache ပြုလုပ်ပြီး ရေးသားသည့်အခါ invalid ဖြစ်စေသည်
const providers = await getCachedProviders(); // မြန်ဆန်ပြီး memory အတွင်းမှ ရယူသည်
const fresh = await listProviders(); // နှေးကွေးပြီး DB ကို တိုက်ရိုက်အသုံးပြုသည်
```

| Cache လုပ်ထားသော entity | Cache key      | TTL                 |
| ----------------------- | -------------- | ------------------- |
| `models`                | `models:v1`    | ရေးသားသည့်အချိန်အထိ |
| `provider_connections`  | `providers:v1` | ရေးသားသည့်အချိန်အထိ |
| `settings`              | `settings:v1`  | ရေးသားသည့်အချိန်အထိ |
| `combos`                | `combos:v1`    | ရေးသားသည့်အချိန်အထိ |

သက်ဆိုင်ရာ table သို့ ရေးသားမှုတိုင်းတွင် cache ကို invalid ဖြစ်စေသည်။

---

## အရန်သိမ်းခြင်းနှင့် ပြန်လည်ရယူခြင်း

### ကိုယ်တိုင် အရန်သိမ်းခြင်း

```bash
# စက်တွင်း အရန်သိမ်းမှုတစ်ခု ဖန်တီးရန် CLI ကို အသုံးပြုပါ
omniroute backup create --name pre-migration

# သို့မဟုတ် API မှတစ်ဆင့်
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

အရန်သိမ်းထားသော file တွင် အောက်ပါတို့ ပါဝင်သည်-

- DB table များအားလုံး (JSON အဖြစ် serialize လုပ်ထားသည်)
- ခေါ်ဆိုမှုမှတ်တမ်း artifact များ (base64 ဖြင့် encode လုပ်ထားပြီး ထည့်သွင်းရန် မဖြစ်မနေမဟုတ်ပါ)
- Settings + secrets (ကုဒ်ဝှက်ထားသည်)
- Plugin configuration

### ပြန်လည်ရယူခြင်း

```bash
# CLI မှတစ်ဆင့်
omniroute restore pre-migration

# API မှတစ်ဆင့်
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **သတိပေးချက်**: ပြန်လည်ရယူခြင်းသည် DB တစ်ခုလုံးကို ထပ်ရေးမည်ဖြစ်သည်။ Client များအားလုံးကို ဦးစွာ ရပ်တန့်ပါ။

### အလိုအလျောက် အရန်သိမ်းခြင်း

```bash
# CLI မှတစ်ဆင့် နေ့စဉ် အလိုအလျောက်အရန်သိမ်းမှုများကို ဖွင့်ပါ
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

အချိန်ဇယားကို စက္ကန့် 30 တိုင်း (ပုံသေ) အလုပ်လုပ်သည့် နောက်ခံ job တစ်ခုက server ဘက်တွင် လုပ်ဆောင်ပြီး cron expression ကို server ၏ ဒေသစံတော်ချိန်နှင့် တိုက်ဆိုင်စစ်ဆေးသည်။

| Variable                                    | ပုံသေ   | ဖော်ပြချက်                                                                                                                                 |
| ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | Tick interval ကို ms ဖြင့် သတ်မှတ်သည် (အနည်းဆုံး `5000`)။ ကိုက်ညီသော cron မိနစ်အတွင်း ယုံကြည်စိတ်ချစွာ အလုပ်လုပ်နိုင်ရန် 60 s ထက် တိုရမည်။ |

### SQLite Hot Backup

အလုပ်လုပ်နေသော DB တစ်ခုကို ရပ်နားချိန်မရှိဘဲ အရန်သိမ်းရန်-

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

၎င်းသည် SQLite ၏ online backup API ကို အသုံးပြုသည် — OmniRoute အလုပ်လုပ်နေစဉ်အတွင်း အသုံးပြုရန် ဘေးကင်းသည်။

---

## စွမ်းဆောင်ရည် ချိန်ညှိခြင်း

### WAL မုဒ်

WAL ကို ပုံမှန်အားဖြင့် ဖွင့်ထားပါသည်။ ရေးသားမှုများပြားသော အလုပ်ဝန်များအတွက် အောက်ပါတို့ကို စဉ်းစားပါ-

```sql
PRAGMA wal_autocheckpoint = 1000;  -- စာမျက်နှာ 1000 တိုင်း Checkpoint ပြုလုပ်ရန်
PRAGMA journal_size_limit = 67108864;  -- WAL ပမာဏကို 64MB အထိ ကန့်သတ်ရန်
```

### အညွှန်းများ

စွမ်းဆောင်ရည်အတွက် အဓိကအညွှန်းများ (migration များက အလိုအလျောက် ဖန်တီးပေးသည်)-

- `idx_models_provider` — provider အလိုက် model ရှာဖွေခြင်း
- `idx_combo_targets_combo_id` — combo target တိုးချဲ့ခြင်း
- `idx_usage_history_api_key_timestamp` — အသုံးပြုမှုဆိုင်ရာ ခွဲခြမ်းစိတ်ဖြာမှု
- `idx_quota_snapshots_api_key_window` — quota ခြေရာခံခြင်း
- `idx_call_logs_timestamp` — call log query များ

အညွှန်းအသစ်တစ်ခု ထည့်ရန် migration တစ်ခု ဖန်တီးပါ-

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### Memory-Mapped I/O

အလွန်ကြီးမားသော database များအတွက် (>10GB) SQLite pragma မှတစ်ဆင့် memory mapping ကို ချိန်ညှိနိုင်သည်-

```sql
-- SQLite pragma မှတစ်ဆင့် သတ်မှတ်ရန် (core.ts သို့မဟုတ် runtime တွင် ချိန်ညှိပါ)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### ကျစ်လျစ်အောင် ပြုလုပ်ခြင်း

အချိန်ကြာမြင့်စွာ လည်ပတ်နေသော OmniRoute instance များသည် ရံဖန်ရံခါ `VACUUM` ပြုလုပ်ခြင်းမှ အကျိုးရှိနိုင်သည်-

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

အသုံးပြုမှုနည်းသော အချိန်ကာလများအတွင်း လစဉ် လုပ်ဆောင်ပါ။ (WAL မုဒ်က လိုအပ်ချက်ကို လျှော့ချပေးသော်လည်း လုံးဝ မပပျောက်စေပါ။)

---

## ကျန်းမာရေး စစ်ဆေးမှု

`src/lib/db/healthCheck.ts` သည် **DB အဆင့် ကျန်းမာရေး ရောဂါရှာဖွေစစ်ဆေးမှုများ** ကို ပံ့ပိုးပေးသည်-

HTTP verb နှစ်ခုစလုံးသည် authentication လိုအပ်သည် (မရှိပါက `401`)။ `GET` သည် ရောဂါရှာဖွေစစ်ဆေးမှုသာ လုပ်ဆောင်ပြီး၊ `POST` သည်
`autoRepair` ကို ဖွင့်ထားကာ အလားတူစစ်ဆေးမှုကို လုပ်ဆောင်သည်။

```bash
GET  /api/db/health   # ရောဂါရှာဖွေစစ်ဆေးရန်
POST /api/db/health   # ရောဂါရှာဖွေစစ်ဆေးရန် + ပြုပြင်ရန်
```

တုံ့ပြန်ချက်သည် `runDbHealthCheck()` မှ ထုတ်ပေးသော `DbHealthCheckResult` ဖြစ်သည်
(`src/lib/db/healthCheck.ts`)-

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "Domain budget များက မရှိတော့သော API key များကို ရည်ညွှန်းထားသည်။",
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

| Field             | အဓိပ္ပာယ်                                                                                                                                                                          |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` သည် ဗလာဖြစ်သည့်အခါ `true` ဖြစ်သည်။ `driver` သည် ၎င်းအပေါ် မည်သည့်အခါမျှ သက်ရောက်မှုမရှိပါ။                                                                                |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` တို့အနက် တစ်ခုဖြစ်သည်။                                                                             |
| `repairedCount`   | ယခုလုပ်ဆောင်မှုအတွင်း ပြုပြင်ခဲ့သော row အရေအတွက်ဖြစ်ပြီး၊ `autoRepair` သည် false ဖြစ်သည့်အခါ အမြဲတမ်း `0` ဖြစ်သည်။                                                                 |
| `backupCreated`   | မပြုပြင်မီ backup ပြုလုပ်ခဲ့ခြင်း ရှိ၊ မရှိ။                                                                                                                                       |
| `checkedAt`       | လုပ်ဆောင်မှုနှင့် ၎င်းက ရေးသားသော repair note တို့တွင် တူညီစွာ အသုံးပြုထားသော ISO timestamp။                                                                                       |
| `driver.name`     | စစ်ဆေးထားသော database ကို ဝန်ဆောင်မှုပေးနေသည့် SQLite driver။                                                                                                                      |
| `driver.degraded` | ရေးသားမှုများကို database file က တာရှည်ခံစွာ သိမ်းဆည်းမထားနိုင်သည့်အခါ `true` ဖြစ်သည် — `sql.js` WASM fallback (file တစ်ခုလုံး သိမ်းဆည်းမှု) သို့မဟုတ် in-memory database ဖြစ်သည်။ |

အလားတူ payload ကို `omniroute_db_health_check` MCP tool ကလည်း ပြန်ပေးသည်။

ပျက်စီးမှုကို ရှာဖွေရန် `PRAGMA integrity_check` ကို လုပ်ဆောင်ပါ-

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# အောက်ပါတို့ကို ပရင့်ထုတ်သင့်သည်- ok
```

`ok` မှလွဲ၍ အခြားတစ်ခုခုကို ပြန်ပေးပါက **database ကို ချက်ချင်း အသုံးပြုခြင်း ရပ်တန့်ပါ**၊ ထို့နောက် backup မှ ပြန်လည်ရယူပါ။

---

## ဘေးအန္တရာယ်မှ ပြန်လည်ရယူခြင်း

### အခြေအနေ 1: WAL ဖိုင် ပျောက်ဆုံးခြင်း

`-wal` ဖိုင် ပျောက်ဆုံးနေသော်လည်း `-shm` နှင့် ပင်မ DB တို့ မပျက်မစီး ရှိနေသည်-

```bash
# နောက်တစ်ကြိမ် ဖွင့်ချိန်တွင် အလိုအလျောက် ပြန်လည်ရယူသည်
omniroute
```

SQLite က အလိုအလျောက် ပြန်လည်မရယူနိုင်ပါက-

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### အခြေအနေ 2: ပင်မ DB ဖိုင် ပျက်စီးခြင်း

အရန်သိမ်းဆည်းမှုမှ ပြန်လည်ရယူပါ-

```bash
omniroute sync pull --merge   # သို့မဟုတ်- omniroute backup restore <backup-id>
```

### အခြေအနေ 3: ကုဒ်ဝှက်ခြင်းသော့ ပျောက်ဆုံးခြင်း

သော့မရှိပါက **ပြန်လည်ရယူရန် မဖြစ်နိုင်ပါ**။ ကုဒ်ဝှက်ထားသော အကွက်များကို ဖတ်ရှု၍ မရနိုင်ပါ။ ဝန်ဆောင်မှုပေးသူအားလုံးကို အထောက်အထားအသစ်များဖြင့် ကိုယ်တိုင် ပြန်လည်ထည့်သွင်းပါ။

> **အန္တရာယ်လျှော့ချခြင်း**: ကုဒ်ဝှက်ခြင်းသော့ကို သီးခြား အမြဲအရန်သိမ်းဆည်းပါ။ ဖြစ်နိုင်ပါက စကားဝှက်စီမံခန့်ခွဲကိရိယာ သို့မဟုတ် KMS တွင် သိမ်းဆည်းပါ။

### အခြေအနေ 4: ဒစ်ခ်နေရာ ပြည့်ခြင်း

SQLite သည် `SQLITE_FULL` အမှားများကို ပြန်ပေးပါမည်။ ဒစ်ခ်နေရာကို ရှင်းလင်းပြီးနောက်-

```bash
# နေရာလွတ်ရရှိစေရန် WAL ကို checkpoint ပြုလုပ်သည်
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## အသုံးများသော လုပ်ဆောင်ချက်များ

### ဇယားတစ်ခုကို စစ်ဆေးခြင်း

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### ဇယားအားလုံးရှိ အတန်းအရေအတွက်ကို ရေတွက်ခြင်း

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### ဒေတာအားလုံးကို ပြန်လည်သတ်မှတ်ခြင်း (ဖျက်ရှင်းခြင်း)

```bash
# OmniRoute ကို ဦးစွာ ရပ်တန့်ပါ
omniroute stop

# DB ဖိုင်ကို ဖျက်ပါ
rm ~/.omniroute/storage.sqlite*

# ပြန်လည်စတင်ပါ (DB အလွတ်ကို ပြန်လည်ဖန်တီးမည်)
omniroute
```

**ရွေးချယ်ထားသော အချက်အလက်များသာ** ပြန်လည်သတ်မှတ်ရန် (ဝန်ဆောင်မှုပေးသူများကို ထိန်းသိမ်းပြီး အသုံးပြုမှုဒေတာကို ဖျက်ရန်)-

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ဇယားတစ်ခုတည်းကို ထုတ်ယူခြင်း

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## ပြဿနာဖြေရှင်းခြင်း

### "ဒေတာဘေ့စ်ကို လော့ခ်ချထားသည်"

အခြား process တစ်ခုက ရေးသားမှုလော့ခ်ကို ထိန်းထားသည်။ အောက်ပါတစ်ခုခုကို လုပ်ဆောင်ပါ-

- အခြား process ပြီးဆုံးသည်အထိ စောင့်ပါ (`lsof | grep storage.sqlite` ဖြင့် စစ်ဆေးပါ)
- အခြား process ကို ရပ်တန့်ပါ
- ပြဿနာ ဆက်လက်ဖြစ်ပေါ်နေပါက OmniRoute ကို ပြန်လည်စတင်ပါ

### "Foreign key ကန့်သတ်ချက် မအောင်မြင်ပါ"

Domain module တစ်ခုက ရည်ညွှန်းဆက်စပ်မှု၏ မှန်ကန်ပြည့်စုံမှုကို ချိုးဖောက်နေသည်။ အောက်ပါတို့ကို စစ်ဆေးပါ-

- မှီခိုနေသော ဇယားများရှိ မိဘမဲ့အတန်းများ
- ဆက်တိုက်ဖျက်ခြင်းများ မပြန့်ပွားခဲ့ခြင်း
- Foreign key တစ်ခုကို ပြောင်းလဲထားသော လတ်တလော migration

ချိုးဖောက်မှုများကို ရှာဖွေရန် `PRAGMA foreign_key_check;` ကို လုပ်ဆောင်ပါ။

### "မှတ်ဉာဏ် မလုံလောက်ပါ"

SQLite ၏ memory-mapped I/O သည် OS ကန့်သတ်ချက်ကို ကျော်လွန်နေသည်။ SQLite pragma မှတစ်ဆင့် လျှော့ချပါ-

```sql
PRAGMA mmap_size = 134217728;  -- 256MB အစား 128MB
```

သို့မဟုတ် ပိတ်ပါ-

```sql
PRAGMA mmap_size = 0;
```

### "Migration လုပ်ဆောင်နေစဉ် အလယ်တွင် မအောင်မြင်ပါ"

Migration ကို transaction တစ်ခုအတွင်း လုပ်ဆောင်ခဲ့သောကြောင့် rollback ပြန်လုပ်ပြီး ဖြစ်သင့်သည်။ ထိုသို့ မဖြစ်ပါက-

1. **OmniRoute ကို ရပ်တန့်ပါ** (ထပ်မံကြိုးပမ်းမှုများကို တားဆီးရန်)
2. `sqlite3` ဖြင့် **DB အခြေအနေကို စစ်ဆေးပါ**
3. တစ်စိတ်တစ်ပိုင်းသာ ပြီးစီးထားသော migration ကို **ကိုယ်တိုင် ပြင်ဆင်ပါ**
4. OmniRoute ကို **ပြန်လည်လုပ်ဆောင်ပါ** (migration ကို ထပ်မံကြိုးပမ်းမည်)

ယင်းကို ကာကွယ်ရန် migration များကို မိတ္တူတစ်ခုပေါ်တွင် အမြဲ ဦးစွာ စမ်းသပ်ပါ။

---

## ဆက်လက်ကြည့်ရှုရန်

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — အသုံးပြုမှုဇယားများ
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — စနစ်အခြေအနေ စောင့်ကြည့်ခြင်း
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — ဖြန့်ချိမှုလုပ်ငန်းစဉ်
- ရင်းမြစ်- `src/lib/db/` (ဖိုင် 80 ကျော်၊ LOC ~25K)
