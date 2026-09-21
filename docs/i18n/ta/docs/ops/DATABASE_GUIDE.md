# Database Schema & Operations Guide (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **சுருக்கமாக**: OmniRoute தனது முதன்மைத் தரவுச் சேமிப்பகமாக **WAL பதிவேட்டுடன் கூடிய SQLite**-ஐப் பயன்படுத்துகிறது; முக்கியமான புலங்களின் சேமிப்பு நிலைப் பாதுகாப்புக்கு **AES-256-GCM** குறியாக்கத்தைப் பயன்படுத்துகிறது. இந்த வழிகாட்டி தரவுத்தளத் திட்டவடிவம், இடம்பெயர்வுகள், காப்புப்பிரதி/மீட்பு மற்றும் செயல்பாட்டு நடைமுறைகளைக் கையாள்கிறது.

**மூலங்கள்:**

- `src/lib/db/core.ts` — singleton + SCHEMA_SQL (17 அடிப்படை அட்டவணைகள்)
- `src/lib/db/migrationRunner.ts` — பதிப்பிடப்பட்ட இடம்பெயர்வுகள்
- `src/lib/db/migrations/` — பதிப்பிடப்பட்ட 167 SQL கோப்புகள்
- `src/lib/db/encryption.ts` — குறியாக்க உதவிச் செயல்பாடுகள்
- `src/lib/db/backup.ts` — காப்புப்பிரதி ஏற்றுமதி/இறக்குமதி
- `src/lib/db/healthCheck.ts` — ஆரோக்கிய நிலைக் கண்டறிதல்

---

## ஏன் SQLite?

பல காரணங்களுக்காக PostgreSQL/MySQL-ஐ விட SQLite-ஐ OmniRoute தேர்ந்தெடுத்துள்ளது:

| காரணி                  | SQLite                                           | PostgreSQL                                  |
| ---------------------- | ------------------------------------------------ | ------------------------------------------- |
| **நிறுவல்**            | உட்பொதிக்கப்பட்டது — தனி சேவையகம் தேவையில்லை     | சேவையக அமைப்பு தேவை                         |
| **குறியாக்கம்**        | பயன்பாட்டு அடுக்கு (AES-256-GCM)                 | உள்ளமைக்கப்பட்ட TDE                         |
| **செயல்திறன்**         | சிறிய/நடுத்தர பணிச்சுமைகளுக்கு வேகமானது          | மிகப்பெரிய ஒரேநேர எழுத்துகளுக்குச் சிறந்தது |
| **ஒரேநேரச் செயல்பாடு** | WAL பயன்முறை ஒரேநேர வாசிப்புகளை அனுமதிக்கிறது    | முழுமையான MVCC                              |
| **காப்புப்பிரதி**      | ஒற்றைக் கோப்பு நகல்                              | `pg_dump` அல்லது கோப்பு முறைமை நொடிப்படம்   |
| **பயன்பாட்டு நிலை**    | ஒவ்வொரு பயனருக்குமான நிறுவல், உட்பொதிக்கப்பட்டது | பல-குத்தகையாளர் SaaS                        |

**ஒற்றைப் பயனர், ஒற்றை நிகழ்வு** நிறுவல்களுக்கு (OmniRoute-இன் முதன்மைப் பயன்பாட்டு நிலை), SQLite எளிமையாகவும் வேகமாகவும் உள்ளது.

### WAL பதிவேடு

`core.ts`, தரவுத்தளத்தை **WAL (முன்கூட்டிய எழுத்துப் பதிவேடு) பயன்முறையில்** திறக்கிறது:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

எழுதும் செயல்பாடுகளின்போது **ஒரேநேர வாசிப்புகளை** WAL அனுமதிக்கிறது — கோரிக்கைகள் பதிவுசெய்யப்படும் வேளையில் வினவல்களை இயக்கும் முகப்புப் பலகைக்கு இது முக்கியமானது.

இயல்புநிலை தற்காலிகச் சேமிப்பக அளவு **65,536 KiB (64 MiB)** ஆகும். எதிர்மறையான
`cache_size` மதிப்பை KiB-இல் உள்ள தோராயமான உச்ச வரம்பாக SQLite புரிந்துகொண்டு, தேவைக்கேற்ப பக்கங்களை ஒதுக்குகிறது.
**அமைப்புகள் > அமைப்பு & சேமிப்பகம் > தற்காலிகச் சேமிப்பக அளவு** என்பதில் **1 முதல்
1,000,000 KiB** வரையிலான முழு எண் மதிப்புகளை ஏற்கலாம்; அமைப்பைச் சேமிப்பது அதைச் செயலிலுள்ள தரவுத்தள இணைப்பிற்குப் பயன்படுத்தும்,
மேலும் தொடக்கத்தின்போது சேமிக்கப்பட்ட மதிப்பை OmniRoute மீட்டமைக்கும்.

---

## தரவுத்தள இருப்பிடம்

SQLite கோப்பு இங்கு சேமிக்கப்படுகிறது:

| இயங்குதளம் | பாதை                                                        |
| ---------- | ----------------------------------------------------------- |
| Linux      | `~/.omniroute/storage.sqlite`                               |
| macOS      | `~/.omniroute/storage.sqlite`                               |
| Windows    | `%USERPROFILE%\.omniroute\storage.sqlite`                   |
| Docker     | `/app/data/storage.sqlite` (`DATA_DIR` மூலம் உள்ளமைக்கலாம்) |

துணைக் கோப்புகள்:

- `storage.sqlite-wal` — முன்கூட்டிய எழுத்துப் பதிவு
- `storage.sqlite-shm` — பகிரப்பட்ட நினைவகக் கோப்பு
- `call_logs/` — கோரிக்கை தரவுச் சுமைத் துணைக்கோப்புகள் (இயக்கப்பட்டிருந்தால்)

**இருப்பிடத்தை மாற்றியமைக்க:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## டொமைன் தொகுதி கட்டமைப்பு

OmniRoute-இன் தரவுத்தளத்தில் `src/lib/db/`-இல் **110 உயர்மட்ட TypeScript தொகுதிகள்** உள்ளன. ஒவ்வொரு டொமைன் தொகுதியும்:

- ஒன்று அல்லது அதற்கு மேற்பட்ட குறிப்பிட்ட அட்டவணைகளுக்குப் பொறுப்பேற்கிறது
- வகையிடப்பட்ட CRUD செயல்பாடுகளை ஏற்றுமதி செய்கிறது
- மற்றொரு தொகுதியின் அட்டவணைகளை ஒருபோதும் அணுகுவதில்லை
- DB-ஐ அணுகுவதற்கு `core.ts`-இலிருந்து `getDbInstance()`-ஐப் பயன்படுத்துகிறது

### 110 உயர்மட்ட DB தொகுதிகள்

OmniRoute-இல் `src/lib/db/`-இன் கீழ் **110 உயர்மட்ட TypeScript கோப்புகள்** உள்ளன. முக்கியத் தொகுதிகளின் சில மாதிரிகள் கீழே கொடுக்கப்பட்டுள்ளன; முழுமையான பட்டியலுக்கு அடைவுப் பட்டியலைப் பார்க்கவும்:

| தொகுதி                  | அட்டவணைகள்                                                     | பொறுப்பு                                                                                  |
| ----------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API விசை வழங்குநர் பதிவு மற்றும் சான்றுகள்                                          |
| `models.ts`             | `key_value` (மாதிரித் தரவு)                                    | மாதிரி வரையறைகள், திறன்கள், விலை நிர்ணயம்                                                 |
| `combos.ts`             | `combos`                                                       | கூட்டிணைப்பு வழிச்செலுத்தல் உள்ளமைவுகள் மற்றும் வரிசைப்படுத்தல்                           |
| `apiKeys.ts`            | `api_keys`                                                     | API விசை வாழ்க்கைச் சுழற்சி, நோக்கெல்லைகள், ஒதுக்கீட்டுக் கண்காணிப்பு                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | அமைப்பு உள்ளமைவு மற்றும் பகிரப்பட்ட KV சேமிப்பகம்                                         |
| `backup.ts`             | —                                                              | காப்புப்பிரதி ஏற்றுமதி/இறக்குமதி செயல்பாடுகள்                                             |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | பதிலி உள்ளமைவுகள் மற்றும் வழிச்செலுத்தல் விதிகள்                                          |
| `prompts.ts`            | `prompt_templates`                                             | மீண்டும் பயன்படுத்தக்கூடிய தூண்டி வார்ப்புருக்கள், பதிப்பாக்கம்                           |
| `webhooks.ts`           | `webhooks`                                                     | நிகழ்வு சார்ந்த webhook சந்தாக்கள் மற்றும் பதிவுகள்                                       |
| `detailedLogs.ts`       | `request_detail_logs`                                          | ஒவ்வொரு கோரிக்கைக்குமான தணிக்கைப் பதிவு (விருப்பத்தேர்வு, அதிக அளவு)                      |
| `domainState.ts`        | `domain_*` (5 அட்டவணைகள்)                                      | டொமைன் வரவுசெலவுகள், சுற்றுத்தடைப்பான்கள், பூட்டல்கள், பின்னடைவு சங்கிலிகள், செலவு வரலாறு |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A-க்காக அனுமதிப் பட்டியலில் சேர்க்கப்பட்ட API விசைகள்                               |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | வரலாற்று ஒதுக்கீட்டுப் பயன்பாடு                                                           |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | மாதிரிகளை இயல்புநிலை கூட்டிணைப்புகளுடன் பொருத்துதல்                                       |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-க்கான நிலையான நிலை                                                                    |
| `encryption.ts`         | —                                                              | புலங்களை மறையாக்கம்/மறைவிலக்கம் செய்வதற்கான உதவிச் செயல்பாடுகள்                           |
| `readCache.ts`          | —                                                              | வாசிப்பு அதிகமுள்ள செயல்பாடுகளுக்கான நினைவக இடையகம்                                       |
| `secrets.ts`            | `key_value` (மறையாக்கப்பட்ட உள்ளீடுகள்)                        | மறையாக்கப்பட்ட இரகசியச் சேமிப்பகம்                                                        |
| `stateReset.ts`         | —                                                              | சோதனைக்காக DB நிலையை அழித்தல்/மீட்டமைத்தல்                                                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | முகவர் ஒப்படைப்புக்கான அமர்வுச் சூழல்                                                     |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | பயன்பாட்டுக் கண்காணிப்பு                                                                  |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | சுருக்க உள்ளமைவு                                                                          |

### தொகுதி எல்லைகள்

ஒரு முக்கியக் கட்டமைப்பு விதி: **தொகுதிகள் ஒன்றுக்கொன்று உரிய அட்டவணைகளை நேரடியாக அணுகுவதில்லை**. மற்றொரு தொகுதியின் தரவுடன் செயல்பட, அந்தத் தொகுதியிலிருந்து செயல்பாட்டை இறக்குமதி செய்யவும்.

```ts
// ❌ தவறு: மற்றொரு தொகுதியிலிருந்து நேரடி SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ சரி: providers தொகுதியின் செயல்பாட்டைப் பயன்படுத்தவும்
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

இந்த விதி குறியீட்டு மதிப்பாய்வு மூலம் அமல்படுத்தப்படுகிறது — நிலையான சரிபார்ப்பு எதுவும் இல்லை, ஆனால் மீறல்கள் சுட்டிக்காட்டப்படுகின்றன.

---

## அடிப்படை ஸ்கீமா (17 அட்டவணைகள்)

`core.ts`, `SCHEMA_SQL`-இல் உள்ள 17 அடிப்படை அட்டவணைகளை வரையறுக்கிறது. இவை `001_initial_schema.sql` மைக்ரேஷனால் உருவாக்கப்பட்டு, மைய ஸ்கீமாவை அமைக்கின்றன.

### மைய அட்டவணைகள் (ஆரம்ப மைக்ரேஷனில் உருவாக்கப்பட்டவை)

| அட்டவணை                    | நோக்கம்                                            | முக்கிய நெடுவரிசைகள்                                                    |
| -------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | வழங்குநர் நற்சான்றுகள் (குறியாக்கப்பட்டவை)         | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | வழங்குநர் நோட் வழிப்படுத்தல் தகவல்                 | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | பொது KV சேமிப்பகம்                                 | `namespace`, `key`, `value`                                             |
| `combos`                   | வழிப்படுத்தல் சேர்க்கை வரையறைகள்                   | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | கேட்வேக்கான API விசைகள்                            | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | தரவுத்தள மெட்டாடேட்டா                              | `key`, `value`                                                          |
| `usage_history`            | கோரிக்கைப் பயன்பாட்டுப் பதிவுகள்                   | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | கோரிக்கை பேலோடுகள் & பதில்கள்                      | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | ப்ராக்ஸி கோரிக்கைப் பதிவுகள்                       | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | மாதிரியிலிருந்து வழங்குநருக்கான சங்கிலிகள்         | `model`, `chain`                                                        |
| `domain_budgets`           | ஒவ்வொரு டொமைனுக்குமான செலவு வரவுசெலவுத் திட்டங்கள் | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | வரவுசெலவுத் திட்ட மீட்டமைப்பு வரலாறு               | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | ஒவ்வொரு டொமைனுக்குமான செலவுக் கண்காணிப்பு          | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | டொமைன் வீத வரம்பு நிலை                             | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | ஒவ்வொரு டொமைனுக்குமான சர்க்யூட் பிரேக்கர் நிலை     | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM பதில் தற்காலிகச் சேமிப்பகம்                    | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | வரலாற்று ஒதுக்கீட்டு ஸ்னாப்ஷாட்கள்                 | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### கூடுதல் அட்டவணைகள் (பிந்தைய மைக்ரேஷன்களால் சேர்க்கப்பட்டவை)

அடுத்தடுத்த மைக்ரேஷன்கள் பின்வருபவை போன்ற அட்டவணைகளைச் சேர்க்கின்றன:

- `cli_tool_state` (மைக்ரேஷன் 011) — CLI கருவி நிலை
- `mcp_*` அட்டவணைகள் — MCP சேவையகத் தணிக்கை
- `a2a_*` அட்டவணைகள் — A2A பணிநிலை
- `usage_*` அட்டவணைகள் — பயன்பாட்டுக் கண்காணிப்பு
- `plugin_*` அட்டவணைகள் — செருகுநிரல் அமைப்பு
- `skill_executions` — திறன் செயல்படுத்தல் வரலாறு
- `memory_*` அட்டவணைகள் — நினைவக அமைப்பு
- `compression_*` அட்டவணைகள் — சுருக்க அமைப்பு
- `webhook_*` அட்டவணைகள் — வெப்ஹுக் வழங்கல் பதிவு
- `acp_*` அட்டவணைகள் — முகவர் கிளையன்ட் நெறிமுறை
- `oneproxy_*` அட்டவணைகள் — 1proxy சந்தை
- `proxy_assignments` — ப்ராக்ஸி வரம்புப் பிணைப்புகள்
- `detailed_call_artifacts` — அழைப்புப் பதிவு ஆர்டிஃபேக்ட் மெட்டாடேட்டா
- `quota_alert_history` — ஒதுக்கீட்டு எச்சரிக்கைத் தணிக்கை
- `command_code_auth_sessions` — Command Code OAuth அமர்வுகள்

~30+ அட்டவணைகளின் முழுப் பட்டியல் `src/lib/db/migrations/`-இல் உள்ளது.

---

## இடமாற்றங்கள்

OmniRoute, `src/lib/db/migrations/` கோப்பகத்தில் **பதிப்பிடப்பட்ட, ஒரே விளைவைத் தரக்கூடிய இடமாற்றங்களை** பயன்படுத்துகிறது. ஒவ்வொரு இடமாற்றமும் `NNN_description.sql` எனப் பெயரிடப்பட்ட தனித்த SQL கோப்பாகும்.

### இடமாற்றங்களுக்குப் பெயரிடுதல்

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### இடமாற்றங்கள் எவ்வாறு இயங்குகின்றன

தொடக்கத்தின்போது, `migrationRunner.ts`:

1. `_omniroute_migrations` அட்டவணை இல்லாவிட்டால் அதை உருவாக்குகிறது
2. ஏற்கனவே பயன்படுத்தப்பட்ட இடமாற்றங்களை வினவுகிறது
3. புதிய இடமாற்றங்கள் அனைத்தையும் வரிசையாக, ஒவ்வொன்றையும் ஒரு பரிவர்த்தனையில் பயன்படுத்துகிறது
4. பயன்படுத்தப்பட்ட ஒவ்வொரு இடமாற்றத்தையும் நேர முத்திரையுடன் பதிவுசெய்கிறது

```ts
// src/lib/db/migrationRunner.ts (எளிமைப்படுத்தப்பட்டது)
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

### ஒரே விளைவைத் தரும் தன்மை

இடமாற்றங்கள் **ஒரே விளைவைத் தரக்கூடியவையாக** இருக்க வேண்டும் — அவற்றை இருமுறை இயக்குவது எந்த மாற்றத்தையும் ஏற்படுத்தக்கூடாது:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, மற்றும் `OR IGNORE` / `OR REPLACE` உட்பிரிவுகளைத் தாராளமாகப் பயன்படுத்தவும்.

### புதிய இடமாற்றத்தைச் சேர்த்தல்

1. **அடுத்த எண்ணைக் கண்டறியவும்**: `ls src/lib/db/migrations/ | tail -1`
2. **கோப்பை உருவாக்கவும்**: `NNN_my_change.sql`
3. **பாதுகாப்பான DDL-ஐப் பயன்படுத்தவும்**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **தரவை கவனமாக நிரப்பவும்**: ஏற்கனவே உள்ள வரிசைகளைக் கையாள `UPDATE ... WHERE ...` பயன்படுத்தவும்
5. **ஒரு நகலில் சோதிக்கவும்**: சோதிக்கப்படாத இடமாற்றங்களை உற்பத்திச் சூழலில் ஒருபோதும் இயக்க வேண்டாம்

எடுத்துக்காட்டு:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **பின்னோக்கிய இணக்கமற்ற மாற்றங்கள்** (எ.கா., நெடுவரிசைகளை நீக்குதல்) சிக்கலானவை. OmniRoute தரமிறக்கத்தை ஆதரிப்பதில்லை — ஓர் இடமாற்றம் பயன்படுத்தப்பட்டவுடன், திட்டவடிவ மாற்றம் நிரந்தரமானது. அதற்கேற்ப திட்டமிடவும்.

---

## சேமிப்பு நிலையில் குறியாக்கம்

முக்கியமான புலங்கள் (API விசைகள், OAuth டோக்கன்கள், இணைப்புச் சரங்கள்) சேமிப்பு நிலையில் **AES-256-GCM** பயன்படுத்திக் குறியாக்கப்படுகின்றன.

### இது எவ்வாறு செயல்படுகிறது

```ts
// src/lib/db/encryption.ts (எளிமைப்படுத்தப்பட்டது)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### இது எங்கு பயன்படுத்தப்படுகிறது

- `provider_connections.api_key` — பயன்பாட்டு மட்டத்தில் குறியாக்கப்பட்டது
- `provider_connections.access_token`, `refresh_token`, `id_token` — பயன்பாட்டு மட்டத்தில் குறியாக்கப்பட்டவை
- `namespace = "secrets"` கொண்ட `key_value` உள்ளீடுகள் — பயன்பாட்டு மட்டத்தில் குறியாக்கப்பட்டவை
- `proxy_registry.auth` — இருந்தால், பயன்பாட்டு மட்டத்தில் குறியாக்கப்பட்டது

### குறியாக்க விசை

குறியாக்க விசை ஒரு **கடவுச்சொற்றொடரிலிருந்தும்** (`STORAGE_ENCRYPTION_KEY` சூழல் மாறி வழியாக அமைக்கப்படுகிறது) ஒரு **salt-இலிருந்தும்** (DB-இல் சேமிக்கப்படுகிறது) பெறப்படுகிறது. தரவைக் குறிவிலக்க இவை இரண்டும் தேவை.

```bash
# பாதுகாப்பான கடவுச்சொற்றொடரை உருவாக்கவும்
openssl rand -hex 32

# .env-இல் அமைக்கவும்
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **மிக முக்கியம்**: குறியாக்க விசையை இழந்தால், குறியாக்கப்பட்ட அனைத்து தரவுகளுக்குமான அணுகலையும் இழக்க நேரிடும். **தரவுத்தளத்திலிருந்து தனியாக விசையைக் காப்புப் பிரதி எடுக்கவும்**.

### குறியாக்கப்படாதவை

செயல்திறன் காரணங்களுக்காக, பின்வருவன எளிய உரையாகச் சேமிக்கப்படுகின்றன:

- வழங்குநரின் காட்சிப் பெயர்கள்
- மாதிரி வரையறைகள் (ஏற்கனவே பொதுவானவை)
- வழிப்படுத்தல் விதிகள்
- பயன்பாட்டுப் பதிவுகள் (PII இல்லை)

---

## குறியாக்க எச்சரிக்கைகள் (v3.8.16+)

இரண்டு குறியாக்க முறைகளையும் வெளிப்படையாகக் கையாள OmniRoute **`migrateLegacyEncryptedString()`**-ஐப் பயன்படுத்துகிறது:

- **பழைய முறை** (v3.5.0-க்கு முந்தையது): XOR-அடிப்படையிலான "குறியாக்கம்" (உண்மையான குறியாக்கவியல் அல்ல)
- **தற்போதைய முறை**: முறையான IV மற்றும் அங்கீகாரக் குறிச்சொல்லுடன் கூடிய AES-256-GCM

இடம்பெயர்வு உதவிக்கருவி பழைய வடிவமைப்பைக் கண்டறிந்து, முதல் வாசிப்பின்போது புதிய முறையைக் கொண்டு மீண்டும் குறியாக்குகிறது. இதனால் சான்றுகளை இழக்காமல் பழைய தரவுத்தளத்தை மேம்படுத்தலாம்.

---

## வாசிப்புத் தற்காலிகச் சேமிப்பு

அடிக்கடி வாசிக்கப்படும் தரவுகளுக்கு (மாதிரிகள், வழங்குநர்கள், அமைப்புகள்), `readCache.ts` ஒரு **நினைவகத் தற்காலிகச் சேமிப்பை** வழங்குகிறது:

```ts
// தொடக்கத்தின்போது தற்காலிகச் சேமிப்பில் வைக்கப்பட்டு, எழுதும்போது செல்லாததாக்கப்படும்
const providers = await getCachedProviders(); // வேகமானது, நினைவகத்திலிருந்து
const fresh = await listProviders(); // மெதுவானது, DB-ஐ அணுகும்
```

| தற்காலிகச் சேமிப்பிலுள்ள உருப்படி | தற்காலிகச் சேமிப்புச் சாவி | TTL         |
| --------------------------------- | -------------------------- | ----------- |
| `models`                          | `models:v1`                | எழுதும் வரை |
| `provider_connections`            | `providers:v1`             | எழுதும் வரை |
| `settings`                        | `settings:v1`              | எழுதும் வரை |
| `combos`                          | `combos:v1`                | எழுதும் வரை |

தொடர்புடைய அட்டவணையில் ஒவ்வொரு முறை எழுதும்போதும் தற்காலிகச் சேமிப்பு செல்லாததாக்கப்படும்.

---

## காப்புப்பிரதி மற்றும் மீட்டெடுப்பு

### கைமுறைக் காப்புப்பிரதி

```bash
# உள்ளூர் காப்புப்பிரதியை உருவாக்க CLI-ஐப் பயன்படுத்தவும்
omniroute backup create --name pre-migration

# அல்லது API வழியாக
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

காப்புப்பிரதிக் கோப்பில் பின்வருபவை அடங்கும்:

- அனைத்து DB அட்டவணைகளும் (JSON ஆகத் தொடராக்கப்பட்டவை)
- அழைப்புப் பதிவுக் கலைப்பொருட்கள் (base64-குறியாக்கப்பட்டவை, விருப்பத்திற்குரியவை)
- அமைப்புகள் + இரகசியங்கள் (குறியாக்கப்பட்டவை)
- செருகுநிரல் உள்ளமைவு

### மீட்டெடுப்பு

```bash
# CLI வழியாக
omniroute restore pre-migration

# API வழியாக
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **எச்சரிக்கை**: மீட்டெடுப்பு முழு DB-யையும் மேலெழுதும். முதலில் அனைத்து கிளையன்ட்களையும் நிறுத்தவும்.

### தானியங்குக் காப்புப்பிரதிகள்

```bash
# CLI வழியாகத் தானியங்கு தினசரிக் காப்புப்பிரதிகளை இயக்கவும்
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

ஒவ்வொரு 30 வினாடிகளுக்கும் இயங்கும் (இயல்புநிலை) பின்னணிப் பணியால் அட்டவணை சேவையகப் பக்கத்தில் செயல்படுத்தப்பட்டு, உள்ளூர் சேவையக நேரத்துடன் cron கோவை மதிப்பீடு செய்யப்படுகிறது.

| மாறி                                        | இயல்புநிலை | விளக்கம்                                                                                                                                        |
| ------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`    | ms-இல் இயங்கும் இடைவெளி (குறைந்தபட்சம் `5000`). பொருந்தும் cron நிமிடத்திற்குள் நம்பகமாக இயங்குவதற்கு இது 60 s-ஐ விடக் குறைவாக இருக்க வேண்டும். |

### SQLite இயங்குநிலைக் காப்புப்பிரதி

இயங்கிக்கொண்டிருக்கும் DB-ஐச் சேவை இடைநிறுத்தமின்றி காப்புப்பிரதி எடுக்க:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

இது SQLite-இன் இணையநிலைக் காப்புப்பிரதி API-ஐப் பயன்படுத்துகிறது — OmniRoute இயங்கிக்கொண்டிருக்கும்போது இதை இயக்குவது பாதுகாப்பானது.

---

## செயல்திறன் மேம்பாடு

### WAL பயன்முறை

WAL இயல்பாகவே இயக்கப்பட்டுள்ளது. அதிக எழுதுதல் கொண்ட பணிச்சுமைகளுக்கு, பின்வருவனவற்றைக் கருத்தில் கொள்ளவும்:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- ஒவ்வொரு 1000 பக்கங்களுக்கும் செக்பாயிண்ட் செய்யவும்
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL வரம்பு
```

### குறியீடுகள்

செயல்திறனுக்கான முக்கியக் குறியீடுகள் (இடமாற்றங்களால் தானாக உருவாக்கப்படுகின்றன):

- `idx_models_provider` — வழங்குநரின் அடிப்படையிலான மாதிரி தேடல்கள்
- `idx_combo_targets_combo_id` — காம்போ இலக்கு விரிவாக்கம்
- `idx_usage_history_api_key_timestamp` — பயன்பாட்டுப் பகுப்பாய்வு
- `idx_quota_snapshots_api_key_window` — ஒதுக்கீட்டுக் கண்காணிப்பு
- `idx_call_logs_timestamp` — அழைப்புப் பதிவுகளுக்கான வினவல்கள்

புதிய குறியீட்டைச் சேர்க்க, ஓர் இடமாற்றத்தை உருவாக்கவும்:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### நினைவக-வரைபடமாக்கப்பட்ட I/O

மிகப் பெரிய தரவுத்தளங்களுக்கு (>10GB), SQLite pragma வழியாக நினைவக வரைபடமாக்கலைச் சரிசெய்யலாம்:

```sql
-- SQLite pragma வழியாக அமைக்கவும் (core.ts அல்லது இயக்க நேரத்தில் சரிசெய்யவும்)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### சுருக்கமாக்கல்

நீண்ட நேரம் இயங்கும் OmniRoute நிகழ்வுகள் அவ்வப்போது `VACUUM` இயக்குவதன் மூலம் பயனடையும்:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

போக்குவரத்து குறைவாக இருக்கும் நேரங்களில் மாதந்தோறும் இயக்கவும். (WAL பயன்முறை இதற்கான தேவையைக் குறைக்கிறது, ஆனால் முற்றிலும் நீக்குவதில்லை.)

---

## ஆரோக்கியச் சரிபார்ப்பு

`src/lib/db/healthCheck.ts` **தரவுத்தள-நிலை ஆரோக்கியக் கண்டறிதல்களை** வழங்குகிறது:

இரண்டு வினைச்சொற்களுக்கும் அங்கீகாரம் தேவை (இல்லையெனில் `401`). `GET` கண்டறிதலை மட்டும் செய்கிறது; `POST`, `autoRepair` இயக்கப்பட்ட நிலையில் அதே சரிபார்ப்பை இயக்குகிறது.

```bash
GET  /api/db/health   # கண்டறிதல்
POST /api/db/health   # கண்டறிதல் + பழுதுபார்த்தல்
```

பதில் என்பது `runDbHealthCheck()` உருவாக்கும் `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "இனி இல்லாத API விசைகளை டொமைன் வரவுசெலவுத் திட்டங்கள் மேற்கோள் காட்டின.",
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

| புலம்             | பொருள்                                                                                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues` காலியாக இருக்கும்போது `true`. `driver` இதை ஒருபோதும் பாதிக்காது.                                                                                   |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` ஆகியவற்றில் ஒன்று.                                                          |
| `repairedCount`   | இந்த இயக்கத்தின்போது பழுதுபார்க்கப்பட்ட வரிசைகள்; `autoRepair` false ஆக இருக்கும்போது எப்போதும் `0`.                                                        |
| `backupCreated`   | பழுதுபார்ப்பதற்கு முன் காப்புப்பிரதி எடுக்கப்பட்டதா என்பதைக் குறிக்கிறது.                                                                                   |
| `checkedAt`       | இயக்கமும் அது எழுதும் எந்தவொரு பழுதுபார்ப்புக் குறிப்பும் பகிர்ந்துகொள்ளும் ISO நேரமுத்திரை.                                                                |
| `driver.name`     | சரிபார்க்கப்பட்ட தரவுத்தளத்திற்குச் சேவையளிக்கும் SQLite இயக்கி.                                                                                            |
| `driver.degraded` | எழுதுதல்கள் தரவுத்தளக் கோப்பால் நிலையாகப் பாதுகாக்கப்படாதபோது `true` — `sql.js` WASM மாற்று ஏற்பாடு (முழுக் கோப்புத் தொடர்நிலை) அல்லது நினைவகத் தரவுத்தளம். |

இதே தரவுத் தொகுப்பு `omniroute_db_health_check` MCP கருவியாலும் திருப்பி அனுப்பப்படுகிறது.

சிதைவைக் கண்டறிய `PRAGMA integrity_check`-ஐ இயக்கவும்:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# அச்சிடப்பட வேண்டியது: ok
```

இது `ok` என்பதைத் தவிர வேறு எதையாவது திருப்பி அனுப்பினால், **தரவுத்தளத்தைப் பயன்படுத்துவதை உடனடியாக நிறுத்தி**, காப்புப்பிரதியிலிருந்து மீட்டமைக்கவும்.

---

## பேரிடர் மீட்பு

### சூழல் 1: WAL கோப்பு தொலைந்துவிட்டது

`-wal` கோப்பு காணவில்லை, ஆனால் `-shm` மற்றும் முதன்மை DB பாதிப்பின்றி உள்ளன:

```bash
# அடுத்த முறை திறக்கும்போது தானாகவே மீட்டெடுக்கப்படும்
omniroute
```

SQLite-ஆல் தானாக மீட்டெடுக்க முடியாவிட்டால்:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### சூழல் 2: முதன்மை DB கோப்பு சிதைந்துவிட்டது

காப்புப்பிரதியிலிருந்து மீட்டெடுக்கவும்:

```bash
omniroute sync pull --merge   # அல்லது: omniroute backup restore <backup-id>
```

### சூழல் 3: குறியாக்க விசை தொலைந்துவிட்டது

விசை இல்லாமல் **மீட்டெடுப்பது சாத்தியமில்லை**. குறியாக்கம் செய்யப்பட்ட புலங்களைப் படிக்க முடியாது. புதிய நற்சான்றுகளுடன் அனைத்து வழங்குநர்களையும் கைமுறையாக மீண்டும் சேர்க்கவும்.

> **தணிப்பு நடவடிக்கை**: குறியாக்க விசையை எப்போதும் தனியாகக் காப்புப்பிரதி எடுக்கவும்; இயன்றவரை கடவுச்சொல் மேலாளர் அல்லது KMS-இல் சேமிக்கவும்.

### சூழல் 4: வட்டு நிரம்பிவிட்டது

SQLite, `SQLITE_FULL` பிழைகளை வழங்கும். வட்டு இடத்தைக் காலியாக்கிய பிறகு:

```bash
# இடத்தைக் காலியாக்க WAL-ஐ checkpoint செய்யவும்
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## பொதுவான செயல்பாடுகள்

### அட்டவணையை ஆய்வு செய்தல்

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### அனைத்து அட்டவணைகளிலும் உள்ள வரிசைகளை எண்ணுதல்

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### எல்லா தரவையும் மீட்டமைத்தல் (அழித்தல்)

```bash
# முதலில் OmniRoute-ஐ நிறுத்தவும்
omniroute stop

# DB கோப்பை நீக்கவும்
rm ~/.omniroute/storage.sqlite*

# மீண்டும் தொடங்கவும் (காலியான DB-ஐ மீண்டும் உருவாக்கும்)
omniroute
```

**தேர்ந்தெடுக்கப்பட்ட** மீட்டமைப்புக்கு (வழங்குநர்களை வைத்துக்கொண்டு, பயன்பாட்டுத் தரவை அழிக்க):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ஒற்றை அட்டவணையை ஏற்றுமதி செய்தல்

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## சிக்கல் தீர்த்தல்

### "தரவுத்தளம் பூட்டப்பட்டுள்ளது"

மற்றொரு செயல்முறை எழுதுவதற்கான பூட்டைப் பிடித்துள்ளது. பின்வருவனவற்றில் ஒன்றைச் செய்யவும்:

- மற்ற செயல்முறை முடிவடையும் வரை காத்திருக்கவும் (`lsof | grep storage.sqlite` மூலம் சரிபார்க்கவும்)
- மற்ற செயல்முறையை நிறுத்தவும்
- சிக்கல் தொடர்ந்தால், OmniRoute-ஐ மீண்டும் தொடங்கவும்

### "அந்நிய விசைக் கட்டுப்பாடு தோல்வியடைந்தது"

ஒரு டொமைன் தொகுதி, தொடர்புநிலை ஒருமைப்பாட்டை மீறுகிறது. பின்வருவனவற்றைச் சரிபார்க்கவும்:

- சார்பு அட்டவணைகளில் தொடர்பற்ற வரிசைகள்
- பரவாமல் போன தொடர் நீக்கங்கள்
- அந்நிய விசையை மாற்றிய சமீபத்திய இடமாற்றம்

மீறல்களைக் கண்டறிய `PRAGMA foreign_key_check;`-ஐ இயக்கவும்.

### "நினைவகம் போதவில்லை"

SQLite-இன் நினைவக-வரைபட I/O, OS வரம்பை மீறுகிறது. SQLite pragma மூலம் அதைக் குறைக்கவும்:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB-க்கு பதிலாக 128MB
```

அல்லது முடக்கவும்:

```sql
PRAGMA mmap_size = 0;
```

### "இடமாற்றம் இடையில் தோல்வியடைந்தது"

இடமாற்றம் ஒரு பரிவர்த்தனைக்குள் இயங்கியதால், அது மீளமைக்கப்பட்டிருக்க வேண்டும். அவ்வாறு நடக்கவில்லை என்றால்:

1. **OmniRoute-ஐ நிறுத்தவும்** (மேலும் முயற்சிகள் நடைபெறுவதைத் தடுக்க)
2. `sqlite3` மூலம் **DB நிலையைச் சரிபார்க்கவும்**
3. பகுதியளவிலான இடமாற்றத்தை **கைமுறையாகச் சரிசெய்யவும்**
4. OmniRoute-ஐ **மீண்டும் இயக்கவும்** (இடமாற்றம் மீண்டும் முயற்சிக்கப்படும்)

இதைத் தடுக்க, இடமாற்றங்களை எப்போதும் முதலில் ஒரு நகலில் சோதிக்கவும்.

---

## மேலும் காண்க

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — பயன்பாட்டு அட்டவணைகள்
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — ஆரோக்கியக் கண்காணிப்பு
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — வெளியீட்டுச் செயலோட்டம்
- மூலம்: `src/lib/db/` (80+ கோப்புகள், ~25K LOC)
