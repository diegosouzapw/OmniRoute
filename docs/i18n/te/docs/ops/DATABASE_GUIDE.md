# Database Schema & Operations Guide (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **TL;DR**: OmniRoute తన ప్రాథమిక స్టోర్గా **WAL జర్నలింగ్తో SQLite**ని ఉపయోగిస్తుంది; సున్నితమైన ఫీల్డ్లకు నిల్వలో ఉన్నప్పుడు **AES-256-GCM** ఎన్క్రిప్షన్ను ఉపయోగిస్తుంది. ఈ గైడ్ స్కీమా, మైగ్రేషన్లు, బ్యాకప్/రికవరీ మరియు కార్యాచరణ రన్బుక్లను వివరిస్తుంది.

**మూలాలు:**

- `src/lib/db/core.ts` — సింగిల్టన్ + SCHEMA_SQL (17 ప్రాథమిక పట్టికలు)
- `src/lib/db/migrationRunner.ts` — వెర్షన్ చేయబడిన మైగ్రేషన్లు
- `src/lib/db/migrations/` — వెర్షన్ చేయబడిన 167 SQL ఫైళ్లు
- `src/lib/db/encryption.ts` — ఎన్క్రిప్షన్ సహాయకాలు
- `src/lib/db/backup.ts` — బ్యాకప్ ఎగుమతి/దిగుమతి
- `src/lib/db/healthCheck.ts` — స్థితి నిర్ధారణలు

---

## SQLite ఎందుకు?

అనేక కారణాల వల్ల OmniRoute, PostgreSQL/MySQLకు బదులుగా SQLiteని ఎంచుకుంది:

| అంశం                | SQLite                                 | PostgreSQL                            |
| ------------------- | -------------------------------------- | ------------------------------------- |
| **డిప్లాయ్మెంట్**   | ఎంబెడెడ్ — ప్రత్యేక సర్వర్ అవసరం లేదు  | సర్వర్ సెటప్ అవసరం                    |
| **ఎన్క్రిప్షన్**    | అప్లికేషన్-స్థాయి (AES-256-GCM)        | అంతర్నిర్మిత TDE                      |
| **పనితీరు**         | చిన్న/మధ్యస్థ పనిభారాలకు వేగవంతమైనది   | భారీ సమకాలీన రైట్లకు మెరుగైనది        |
| **సమకాలీనత**        | WAL మోడ్ సమకాలీన రీడ్లను అనుమతిస్తుంది | పూర్తి MVCC                           |
| **బ్యాకప్**         | ఒకే ఫైల్ కాపీ                          | `pg_dump` లేదా ఫైల్సిస్టమ్ స్నాప్షాట్ |
| **వినియోగ సందర్భం** | ఒక్కో వినియోగదారు ఇన్స్టాల్, ఎంబెడెడ్  | బహుళ-టెనెంట్ SaaS                     |

**ఒకే వినియోగదారు, ఒకే ఇన్స్టాన్స్** డిప్లాయ్మెంట్లకు (OmniRoute యొక్క ప్రధాన వినియోగ సందర్భం), SQLite మరింత సరళమైనది మరియు వేగవంతమైనది.

### WAL జర్నలింగ్

`core.ts` డేటాబేస్ను **WAL (Write-Ahead Logging) మోడ్**లో తెరుస్తుంది:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL, రైట్లు జరుగుతున్నప్పుడు **సమకాలీన రీడ్లను** అనుమతిస్తుంది — అభ్యర్థనలు రికార్డ్ అవుతున్న సమయంలో క్వెరీలు చేసే డ్యాష్బోర్డ్కు ఇది ముఖ్యమైనది.

డిఫాల్ట్ క్యాష్ పరిమాణం **65,536 KiB (64 MiB)**. SQLite ప్రతికూల
`cache_size`ను KiBలో సుమారు గరిష్ఠ పరిమితిగా పరిగణించి, అవసరానికి అనుగుణంగా పేజీలను కేటాయిస్తుంది.
**సెట్టింగ్లు > సిస్టమ్ & స్టోరేజ్ > క్యాష్ పరిమాణం** **1 నుండి
1,000,000 KiB** వరకు పూర్ణాంక విలువలను అంగీకరిస్తుంది; సెట్టింగ్ను సేవ్ చేయడం ద్వారా అది ప్రస్తుతం పనిచేస్తున్న డేటాబేస్ కనెక్షన్కు వర్తింపజేయబడుతుంది,
మరియు ప్రారంభ సమయంలో OmniRoute నిల్వ చేసిన విలువను పునరుద్ధరిస్తుంది.

---

## డేటాబేస్ స్థానం

SQLite ఫైల్ ఇక్కడ నిల్వ చేయబడుతుంది:

| OS      | పాత్                                                              |
| ------- | ----------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                     |
| macOS   | `~/.omniroute/storage.sqlite`                                     |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                         |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` ద్వారా కాన్ఫిగర్ చేయవచ్చు) |

అనుబంధ ఫైళ్లు:

- `storage.sqlite-wal` — రైట్-అహెడ్ లాగ్
- `storage.sqlite-shm` — షేర్డ్ మెమరీ ఫైల్
- `call_logs/` — అభ్యర్థన పేలోడ్ ఆర్టిఫాక్ట్లు (ప్రారంభించబడి ఉంటే)

**స్థానాన్ని ఓవర్రైడ్ చేయడం:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## డొమైన్ మాడ్యూల్ ఆర్కిటెక్చర్

OmniRoute డేటాబేస్లో `src/lib/db/` కింద **110 అగ్ర-స్థాయి TypeScript మాడ్యూల్లు** ఉన్నాయి. ప్రతి డొమైన్ మాడ్యూల్:

- ఒకటి లేదా అంతకంటే ఎక్కువ నిర్దిష్ట పట్టికలకు యజమానిగా ఉంటుంది
- టైప్ చేయబడిన CRUD ఫంక్షన్లను ఎగుమతి చేస్తుంది
- మరొక మాడ్యూల్ పట్టికలను ఎప్పుడూ యాక్సెస్ చేయదు
- DBని యాక్సెస్ చేయడానికి `core.ts` నుండి `getDbInstance()`ను ఉపయోగిస్తుంది

### 110 అగ్ర-స్థాయి DB మాడ్యూల్లు

OmniRouteలో `src/lib/db/` కింద **110 అగ్ర-స్థాయి TypeScript ఫైల్లు** ఉన్నాయి. ప్రధాన మాడ్యూల్లలో కొన్నింటి నమూనా క్రింద ఉంది; పూర్తి జాబితా కోసం డైరెక్టరీ లిస్టింగ్ను చూడండి:

| మాడ్యూల్                | పట్టికలు                                                       | బాధ్యత                                                                          |
| ----------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API కీ ప్రొవైడర్ నమోదు మరియు ఆధారాలు                                      |
| `models.ts`             | `key_value` (మోడల్ డేటా)                                       | మోడల్ నిర్వచనాలు, సామర్థ్యాలు, ధరలు                                             |
| `combos.ts`             | `combos`                                                       | కాంబో రూటింగ్ కాన్ఫిగరేషన్లు మరియు క్రమం                                        |
| `apiKeys.ts`            | `api_keys`                                                     | API కీ జీవితచక్రం, స్కోప్లు, కోటా ట్రాకింగ్                                     |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | సిస్టమ్ కాన్ఫిగరేషన్ మరియు భాగస్వామ్య KV స్టోర్                                 |
| `backup.ts`             | —                                                              | బ్యాకప్ ఎగుమతి/దిగుమతి కార్యకలాపాలు                                             |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | ప్రాక్సీ కాన్ఫిగరేషన్లు మరియు రూటింగ్ నియమాలు                                   |
| `prompts.ts`            | `prompt_templates`                                             | పునర్వినియోగించగల ప్రాంప్ట్ టెంప్లేట్లు, వెర్షనింగ్                             |
| `webhooks.ts`           | `webhooks`                                                     | ఈవెంట్-ఆధారిత వెబ్హుక్ సబ్స్క్రిప్షన్లు మరియు లాగ్లు                            |
| `detailedLogs.ts`       | `request_detail_logs`                                          | ప్రతి అభ్యర్థికి ఆడిట్ లాగింగ్ (ఐచ్ఛికం, అధిక పరిమాణం)                          |
| `domainState.ts`        | `domain_*` (5 పట్టికలు)                                        | డొమైన్ బడ్జెట్లు, సర్క్యూట్ బ్రేకర్లు, లాకౌట్లు, ఫాల్బ్యాక్ చైన్లు, వ్యయ చరిత్ర |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A కోసం అనుమతించబడిన API కీలు                                              |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | చారిత్రక కోటా వినియోగం                                                          |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | మోడల్లను డిఫాల్ట్ కాంబోలకు మ్యాప్ చేయడం                                         |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-నిర్దిష్ట స్థిర స్థితి                                                      |
| `encryption.ts`         | —                                                              | ఫీల్డ్లను ఎన్క్రిప్ట్/డీక్రిప్ట్ చేయడానికి సహాయకాలు                             |
| `readCache.ts`          | —                                                              | అధికంగా జరిగే రీడ్ ఆపరేషన్ల కోసం ఇన్-మెమరీ క్యాష్                               |
| `secrets.ts`            | `key_value` (ఎన్క్రిప్ట్ చేసిన ఎంట్రీలు)                       | ఎన్క్రిప్ట్ చేసిన రహస్యాల నిల్వ                                                 |
| `stateReset.ts`         | —                                                              | పరీక్ష కోసం DB స్థితిని తుడిచివేయడం/రీసెట్ చేయడం                                |
| `contextHandoffs.ts`    | `context_handoffs`                                             | ఏజెంట్ హ్యాండాఫ్ కోసం సెషన్ సందర్భం                                             |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | వినియోగ ట్రాకింగ్                                                               |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | కంప్రెషన్ కాన్ఫిగరేషన్                                                          |

### మాడ్యూల్ సరిహద్దులు

ఒక ప్రధాన ఆర్కిటెక్చరల్ నియమం: **మాడ్యూల్లు ఒకదాని పట్టికలను మరొకటి నేరుగా యాక్సెస్ చేయవు**. మరొక మాడ్యూల్ డేటాతో పని చేయడానికి, ఆ మాడ్యూల్ నుండి ఫంక్షన్ను దిగుమతి చేయండి.

```ts
// ❌ తప్పు: మరొక మాడ్యూల్ నుండి నేరుగా SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ సరైనది: providers మాడ్యూల్ ఫంక్షన్ను ఉపయోగించండి
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

ఈ నియమం కోడ్ సమీక్ష ద్వారా అమలు చేయబడుతుంది — ఎలాంటి స్థిర తనిఖీ లేదు, కానీ ఉల్లంఘనలు గుర్తించబడతాయి.

---

## ప్రాథమిక స్కీమా (17 పట్టికలు)

`core.ts`, `SCHEMA_SQL`లోని 17 ప్రాథమిక పట్టికలను నిర్వచిస్తుంది. ఇవి `001_initial_schema.sql` మైగ్రేషన్ ద్వారా సృష్టించబడతాయి మరియు ప్రధాన స్కీమాగా పనిచేస్తాయి.

### ప్రధాన పట్టికలు (ప్రారంభ మైగ్రేషన్లో సృష్టించబడినవి)

| పట్టిక                     | ఉద్దేశ్యం                               | కీలక కాలమ్లు                                                            |
| -------------------------- | --------------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | ప్రొవైడర్ ఆధారాలు (ఎన్క్రిప్ట్ చేసినవి) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | ప్రొవైడర్ నోడ్ రూటింగ్ సమాచారం          | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | సాధారణ KV స్టోర్                        | `namespace`, `key`, `value`                                             |
| `combos`                   | రూటింగ్ కాంబో నిర్వచనాలు                | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | గేట్వే కోసం API కీలు                    | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | డేటాబేస్ మెటాడేటా                       | `key`, `value`                                                          |
| `usage_history`            | అభ్యర్థన వినియోగ రికార్డులు             | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | అభ్యర్థన పేలోడ్లు & ప్రతిస్పందనలు       | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | ప్రాక్సీ అభ్యర్థన లాగ్లు                | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | మోడల్-నుంచి-ప్రొవైడర్ చైన్లు            | `model`, `chain`                                                        |
| `domain_budgets`           | ప్రతి డొమైన్కు ఖర్చు బడ్జెట్లు          | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | బడ్జెట్ రీసెట్ చరిత్ర                   | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | ప్రతి డొమైన్కు ఖర్చు ట్రాకింగ్          | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | డొమైన్ రేట్-లిమిట్ స్థితి               | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | ప్రతి డొమైన్కు సర్క్యూట్ బ్రేకర్ స్థితి | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM ప్రతిస్పందన క్యాష్                  | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | చారిత్రక కోటా స్నాప్షాట్లు              | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### అదనపు పట్టికలు (తదుపరి మైగ్రేషన్ల ద్వారా జోడించబడినవి)

తదుపరి మైగ్రేషన్లు ఇలాంటి పట్టికలను జోడిస్తాయి:

- `cli_tool_state` (మైగ్రేషన్ 011) — CLI సాధనం స్థితి
- `mcp_*` పట్టికలు — MCP సర్వర్ ఆడిట్
- `a2a_*` పట్టికలు — A2A టాస్క్ స్థితి
- `usage_*` పట్టికలు — వినియోగ ట్రాకింగ్
- `plugin_*` పట్టికలు — ప్లగిన్ వ్యవస్థ
- `skill_executions` — స్కిల్ అమలు చరిత్ర
- `memory_*` పట్టికలు — మెమరీ వ్యవస్థ
- `compression_*` పట్టికలు — కంప్రెషన్ వ్యవస్థ
- `webhook_*` పట్టికలు — వెబ్హుక్ డెలివరీ లాగ్
- `acp_*` పట్టికలు — ఏజెంట్ క్లయింట్ ప్రోటోకాల్
- `oneproxy_*` పట్టికలు — 1proxy మార్కెట్ప్లేస్
- `proxy_assignments` — ప్రాక్సీ స్కోప్ బైండింగ్లు
- `detailed_call_artifacts` — కాల్ లాగ్ ఆర్టిఫాక్ట్ల మెటాడేటా
- `quota_alert_history` — కోటా హెచ్చరిక ఆడిట్
- `command_code_auth_sessions` — Command Code OAuth సెషన్లు

~30+ పట్టికల పూర్తి జాబితా `src/lib/db/migrations/`లో ఉంది.

---

## మైగ్రేషన్లు

OmniRoute `src/lib/db/migrations/`లో **వెర్షన్ చేయబడిన, ఐడెంపోటెంట్ మైగ్రేషన్లను** ఉపయోగిస్తుంది. ప్రతి మైగ్రేషన్ `NNN_description.sql` పేరుతో ఉండే ఒకే SQL ఫైల్.

### మైగ్రేషన్ పేరు పెట్టే విధానం

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### మైగ్రేషన్లు ఎలా అమలవుతాయి

ప్రారంభ సమయంలో, `migrationRunner.ts`:

1. `_omniroute_migrations` పట్టిక ఉనికిలో లేకపోతే దాన్ని సృష్టిస్తుంది
2. ఇప్పటికే వర్తింపజేసిన మైగ్రేషన్ల కోసం క్వెరీ చేస్తుంది
3. ప్రతి కొత్త మైగ్రేషన్ను క్రమంలో, ఒక్కొక్కదాన్ని ఒక ట్రాన్సాక్షన్లో వర్తింపజేస్తుంది
4. వర్తింపజేసిన ప్రతి మైగ్రేషన్ను టైమ్స్టాంప్తో రికార్డ్ చేస్తుంది

```ts
// src/lib/db/migrationRunner.ts (సరళీకరించబడింది)
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

### ఐడెంపోటెన్సీ

మైగ్రేషన్లు తప్పనిసరిగా **ఐడెంపోటెంట్** అయి ఉండాలి — వాటిని రెండుసార్లు అమలు చేసినా ఎలాంటి ప్రభావం ఉండకూడదు:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, మరియు `OR IGNORE` / `OR REPLACE` క్లాజ్లను విస్తృతంగా ఉపయోగించండి.

### కొత్త మైగ్రేషన్ను జోడించడం

1. **తదుపరి సంఖ్యను గుర్తించండి**: `ls src/lib/db/migrations/ | tail -1`
2. **ఫైల్ను సృష్టించండి**: `NNN_my_change.sql`
3. **సురక్షితమైన DDLను ఉపయోగించండి**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **డేటాను జాగ్రత్తగా బ్యాక్ఫిల్ చేయండి**: ఇప్పటికే ఉన్న వరుసలను నిర్వహించడానికి `UPDATE ... WHERE ...` ఉపయోగించండి
5. **ఒక కాపీపై పరీక్షించండి**: పరీక్షించని మైగ్రేషన్లను ప్రొడక్షన్లో ఎప్పుడూ అమలు చేయవద్దు

ఉదాహరణ:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **వెనుకకు అనుకూలం కాని మార్పులు** (ఉదా., కాలమ్లను తొలగించడం) క్లిష్టమైనవి. OmniRoute డౌన్గ్రేడ్కు మద్దతు ఇవ్వదు — ఒకసారి మైగ్రేషన్ వర్తింపజేయబడితే, స్కీమా మార్పు శాశ్వతంగా ఉంటుంది. దానికి అనుగుణంగా ప్రణాళిక రూపొందించండి.

---

## నిల్వలో ఉన్నప్పుడు ఎన్క్రిప్షన్

సున్నితమైన ఫీల్డ్లు (API కీలు, OAuth టోకెన్లు, కనెక్షన్ స్ట్రింగ్లు) నిల్వలో ఉన్నప్పుడు **AES-256-GCM** ఉపయోగించి ఎన్క్రిప్ట్ చేయబడతాయి.

### ఇది ఎలా పనిచేస్తుంది

```ts
// src/lib/db/encryption.ts (సరళీకరించబడింది)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### ఇది ఎక్కడ ఉపయోగించబడుతుంది

- `provider_connections.api_key` — అప్లికేషన్ స్థాయిలో ఎన్క్రిప్ట్ చేయబడుతుంది
- `provider_connections.access_token`, `refresh_token`, `id_token` — అప్లికేషన్ స్థాయిలో ఎన్క్రిప్ట్ చేయబడతాయి
- `namespace = "secrets"` కలిగిన `key_value` ఎంట్రీలు — అప్లికేషన్ స్థాయిలో ఎన్క్రిప్ట్ చేయబడతాయి
- `proxy_registry.auth` — ఉన్నట్లయితే, అప్లికేషన్ స్థాయిలో ఎన్క్రిప్ట్ చేయబడుతుంది

### ఎన్క్రిప్షన్ కీ

ఎన్క్రిప్షన్ కీ ఒక **పాస్ఫ్రేజ్** (`STORAGE_ENCRYPTION_KEY` ఎన్విరాన్మెంట్ వేరియబుల్ ద్వారా సెట్ చేయబడుతుంది) మరియు ఒక **సాల్ట్** (DBలో నిల్వ చేయబడుతుంది) నుండి ఉత్పన్నమవుతుంది. డేటాను డీక్రిప్ట్ చేయడానికి రెండూ అవసరం.

```bash
# సురక్షితమైన పాస్ఫ్రేజ్ను రూపొందించండి
openssl rand -hex 32

# .envలో సెట్ చేయండి
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **అత్యంత కీలకం**: ఎన్క్రిప్షన్ కీని కోల్పోవడం అంటే ఎన్క్రిప్ట్ చేసిన మొత్తం డేటాకు ప్రాప్యతను కోల్పోవడం. **కీని డేటాబేస్కు వేరుగా బ్యాకప్ చేయండి**.

### ఎన్క్రిప్ట్ చేయనివి

పనితీరు కారణాల వల్ల, కిందివి ప్లెయిన్టెక్స్ట్లో నిల్వ చేయబడతాయి:

- ప్రొవైడర్ ప్రదర్శన పేర్లు
- మోడల్ నిర్వచనాలు (ఇప్పటికే పబ్లిక్గా ఉన్నవి)
- రూటింగ్ నియమాలు
- వినియోగ రికార్డ్లు (PII లేదు)

---

## ఎన్క్రిప్షన్ పరిమితులు (v3.8.16+)

రెండు ఎన్క్రిప్షన్ విధానాలను పారదర్శకంగా నిర్వహించడానికి OmniRoute **`migrateLegacyEncryptedString()`**ను ఉపయోగిస్తుంది:

- **లెగసీ** (v3.5.0కి ముందు): XOR-ఆధారిత "ఎన్క్రిప్షన్" (ఇది నిజమైన క్రిప్టోగ్రఫీ కాదు)
- **ప్రస్తుత విధానం**: సరైన IV మరియు ప్రామాణీకరణ ట్యాగ్తో AES-256-GCM

మైగ్రేషన్ సహాయకం లెగసీ ఫార్మాట్ను గుర్తించి, మొదటిసారి చదివినప్పుడు కొత్త విధానంతో మళ్లీ ఎన్క్రిప్ట్ చేస్తుంది. దీని వల్ల క్రెడెన్షియల్స్ను కోల్పోకుండా పాత డేటాబేస్ను అప్గ్రేడ్ చేయవచ్చు.

---

## రీడ్ క్యాష్

తరచుగా చదివే డేటా (మోడల్లు, ప్రొవైడర్లు, సెట్టింగ్లు) కోసం, `readCache.ts` ఒక **ఇన్-మెమరీ క్యాష్**ను అందిస్తుంది:

```ts
// ప్రారంభ సమయంలో క్యాష్ చేయబడుతుంది, రైట్ చేసినప్పుడు చెల్లనిదిగా మార్చబడుతుంది
const providers = await getCachedProviders(); // వేగవంతమైనది, ఇన్-మెమరీ
const fresh = await listProviders(); // నెమ్మదైనది, DBని యాక్సెస్ చేస్తుంది
```

| క్యాష్ చేయబడిన ఎంటిటీ  | క్యాష్ కీ      | TTL            |
| ---------------------- | -------------- | -------------- |
| `models`               | `models:v1`    | రైట్ చేసే వరకు |
| `provider_connections` | `providers:v1` | రైట్ చేసే వరకు |
| `settings`             | `settings:v1`  | రైట్ చేసే వరకు |
| `combos`               | `combos:v1`    | రైట్ చేసే వరకు |

సంబంధిత టేబుల్కు ప్రతి రైట్ జరిగినప్పుడు క్యాష్ చెల్లనిదిగా మార్చబడుతుంది.

---

## బ్యాకప్ మరియు రికవరీ

### మాన్యువల్ బ్యాకప్

```bash
# స్థానిక బ్యాకప్ను సృష్టించడానికి CLIని ఉపయోగించండి
omniroute backup create --name pre-migration

# లేదా API ద్వారా
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

బ్యాకప్ ఫైల్లో ఇవి ఉంటాయి:

- అన్ని DB టేబుల్లు (JSONగా సీరియలైజ్ చేయబడినవి)
- కాల్ లాగ్ ఆర్టిఫాక్ట్లు (base64-ఎన్కోడ్ చేయబడినవి, ఐచ్ఛికం)
- సెట్టింగ్లు + సీక్రెట్లు (ఎన్క్రిప్ట్ చేయబడినవి)
- ప్లగిన్ కాన్ఫిగరేషన్

### పునరుద్ధరణ

```bash
# CLI ద్వారా
omniroute restore pre-migration

# API ద్వారా
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **హెచ్చరిక**: పునరుద్ధరణ మొత్తం DBని ఓవర్రైట్ చేస్తుంది. ముందుగా అన్ని క్లయింట్లను నిలిపివేయండి.

### ఆటోమేటెడ్ బ్యాకప్లు

```bash
# CLI ద్వారా ఆటోమేటెడ్ రోజువారీ బ్యాకప్లను ప్రారంభించండి
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

ప్రతి 30 సెకన్లకు (డిఫాల్ట్) అమలయ్యే బ్యాక్గ్రౌండ్ జాబ్ ద్వారా షెడ్యూల్ సర్వర్ వైపు అమలు చేయబడుతుంది మరియు స్థానిక సర్వర్ సమయానికి అనుగుణంగా cron ఎక్స్ప్రెషన్ను మూల్యాంకనం చేస్తుంది.

| వేరియబుల్                                   | డిఫాల్ట్ | వివరణ                                                                                                              |
| ------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000`  | msలో టిక్ విరామం (కనిష్ఠం `5000`). సరిపోలే cron నిమిషం లోపల విశ్వసనీయంగా అమలవడానికి ఇది 60 s కంటే తక్కువగా ఉండాలి. |

### SQLite హాట్ బ్యాకప్

లైవ్ DBకి జీరో-డౌన్టైమ్ బ్యాకప్ తీసుకోవడానికి:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

ఇది SQLite యొక్క ఆన్లైన్ బ్యాకప్ APIని ఉపయోగిస్తుంది — OmniRoute అమలవుతున్నప్పుడు కూడా దీన్ని సురక్షితంగా అమలు చేయవచ్చు.

---

## పనితీరు ట్యూనింగ్

### WAL మోడ్

WAL డిఫాల్ట్గా ప్రారంభించబడి ఉంటుంది. అధిక రైట్ పనిభారాల కోసం, వీటిని పరిగణించండి:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- ప్రతి 1000 పేజీలకు చెక్పాయింట్ చేయండి
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL పరిమితి
```

### ఇండెక్స్లు

పనితీరు కోసం కీలక ఇండెక్స్లు (మైగ్రేషన్ల ద్వారా స్వయంచాలకంగా సృష్టించబడతాయి):

- `idx_models_provider` — ప్రొవైడర్ ఆధారంగా మోడల్ లుకప్లు
- `idx_combo_targets_combo_id` — కాంబో టార్గెట్ విస్తరణ
- `idx_usage_history_api_key_timestamp` — వినియోగ విశ్లేషణలు
- `idx_quota_snapshots_api_key_window` — కోటా ట్రాకింగ్
- `idx_call_logs_timestamp` — కాల్ లాగ్ క్వెరీలు

కొత్త ఇండెక్స్ను జోడించడానికి, ఒక మైగ్రేషన్ను సృష్టించండి:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### మెమరీ-మ్యాప్డ్ I/O

చాలా పెద్ద డేటాబేస్ల కోసం (>10GB), SQLite pragma ద్వారా మెమరీ మ్యాపింగ్ను సర్దుబాటు చేయవచ్చు:

```sql
-- SQLite pragma ద్వారా సెట్ చేయండి (core.ts లేదా రన్టైమ్లో సర్దుబాటు చేయండి)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### కాంపాక్షన్

ఎక్కువ కాలం నడిచే OmniRoute ఇన్స్టాన్స్లకు అప్పుడప్పుడు `VACUUM` చేయడం ప్రయోజనకరంగా ఉంటుంది:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

తక్కువ ట్రాఫిక్ ఉండే సమయాల్లో నెలకోసారి అమలు చేయండి. (WAL మోడ్ దీని అవసరాన్ని తగ్గిస్తుంది, కానీ పూర్తిగా తొలగించదు.)

---

## హెల్త్ చెక్

`src/lib/db/healthCheck.ts` **DB-స్థాయి హెల్త్ డయాగ్నస్టిక్స్**ను అందిస్తుంది:

రెండు HTTP verbsకూ ప్రామాణీకరణ అవసరం (లేకపోతే `401`). `GET` కేవలం నిర్ధారణ చేస్తుంది; `POST` అదే తనిఖీని `autoRepair` ప్రారంభించి అమలు చేస్తుంది.

```bash
GET  /api/db/health   # నిర్ధారించండి
POST /api/db/health   # నిర్ధారించండి + మరమ్మతు చేయండి
```

ప్రతిస్పందనగా `runDbHealthCheck()` రూపొందించిన `DbHealthCheckResult`
(`src/lib/db/healthCheck.ts`) వస్తుంది:

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "ఇకపై ఉనికిలో లేని API కీలను డొమైన్ బడ్జెట్లు సూచించాయి.",
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

| ఫీల్డ్            | అర్థం                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| `isHealthy`       | `issues` ఖాళీగా ఉన్నప్పుడు `true`. `driver` దీనిని ఎన్నడూ ప్రభావితం చేయదు.                                                                       |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state`లలో ఒకటి.                                                         |
| `repairedCount`   | ఈ అమలు సమయంలో మరమ్మతు చేసిన వరుసలు; `autoRepair` falseగా ఉన్నప్పుడు ఎల్లప్పుడూ `0`.                                                              |
| `backupCreated`   | మరమ్మతు చేయడానికి ముందు బ్యాకప్ తీసుకున్నారా లేదా.                                                                                               |
| `checkedAt`       | అమలుతోనూ, అది రాసే ఏదైనా మరమ్మతు నోట్తోనూ పంచుకోబడే ISO టైమ్స్టాంప్.                                                                             |
| `driver.name`     | తనిఖీ చేసిన డేటాబేస్కు సేవలందిస్తున్న SQLite డ్రైవర్.                                                                                            |
| `driver.degraded` | రైట్లు డేటాబేస్ ఫైల్ ద్వారా మన్నికగా బ్యాకప్ చేయబడనప్పుడు `true` — `sql.js` WASM ఫాల్బ్యాక్ (మొత్తం-ఫైల్ పర్సిస్టెన్స్) లేదా ఇన్-మెమరీ డేటాబేస్. |

ఇదే పేలోడ్ `omniroute_db_health_check` MCP టూల్ ద్వారా కూడా తిరిగి ఇవ్వబడుతుంది.

కరప్షన్ను గుర్తించడానికి `PRAGMA integrity_check` అమలు చేయండి:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# ఇలా ప్రింట్ కావాలి: ok
```

ఇది `ok` కాకుండా మరేదైనా తిరిగి ఇస్తే, **వెంటనే డేటాబేస్ను ఉపయోగించడం ఆపివేసి**, బ్యాకప్ నుండి పునరుద్ధరించండి.

---

## విపత్తు పునరుద్ధరణ

### సందర్భం 1: WAL ఫైల్ కోల్పోయినప్పుడు

`-wal` ఫైల్ లేదు, కానీ `-shm` మరియు ప్రధాన DB చెక్కుచెదరకుండా ఉన్నాయి:

```bash
# తదుపరిసారి తెరిచినప్పుడు స్వయంచాలకంగా పునరుద్ధరిస్తుంది
omniroute
```

SQLite స్వయంచాలకంగా పునరుద్ధరించలేకపోతే:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### సందర్భం 2: ప్రధాన DB ఫైల్ దెబ్బతిన్నప్పుడు

బ్యాకప్ నుండి పునరుద్ధరించండి:

```bash
omniroute sync pull --merge   # లేదా: omniroute backup restore <backup-id>
```

### సందర్భం 3: ఎన్క్రిప్షన్ కీ కోల్పోయినప్పుడు

కీ లేకుండా **పునరుద్ధరణ సాధ్యం కాదు**. ఎన్క్రిప్ట్ చేసిన ఫీల్డ్లను చదవడం సాధ్యం కాదు. కొత్త ఆధారాలతో అన్ని ప్రొవైడర్లను మాన్యువల్గా మళ్లీ జోడించండి.

> **ఉపశమన చర్య**: ఎన్క్రిప్షన్ కీని ఎల్లప్పుడూ విడిగా బ్యాకప్ చేయండి; వీలైతే పాస్వర్డ్ మేనేజర్ లేదా KMSలో ఉంచండి.

### సందర్భం 4: డిస్క్ నిండినప్పుడు

SQLite `SQLITE_FULL` లోపాలను అందిస్తుంది. డిస్క్ స్థలాన్ని ఖాళీ చేసి, ఆపై:

```bash
# స్థలాన్ని ఖాళీ చేయడానికి WALను చెక్పాయింట్ చేయండి
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## సాధారణ కార్యకలాపాలు

### పట్టికను పరిశీలించడం

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### అన్ని పట్టికలలోని వరుసలను లెక్కించడం

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### మొత్తం డేటాను రీసెట్ చేయడం (తుడిచివేయడం)

```bash
# ముందుగా OmniRouteను ఆపండి
omniroute stop

# DB ఫైల్ను తొలగించండి
rm ~/.omniroute/storage.sqlite*

# పునఃప్రారంభించండి (ఖాళీ DBని మళ్లీ సృష్టిస్తుంది)
omniroute
```

**ఎంపిక చేసిన** రీసెట్ కోసం (ప్రొవైడర్లను ఉంచి, వినియోగ డేటాను తుడిచివేయడానికి):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### ఒకే పట్టికను ఎగుమతి చేయడం

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## సమస్య పరిష్కారం

### "డేటాబేస్ లాక్ చేయబడింది"

మరొక ప్రాసెస్ రైట్ లాక్ను కలిగి ఉంది. కింది వాటిలో ఏదో ఒకటి చేయండి:

- ఇతర ప్రాసెస్ పూర్తయ్యే వరకు వేచి ఉండండి (`lsof | grep storage.sqlite`తో తనిఖీ చేయండి)
- ఇతర ప్రాసెస్ను నిలిపివేయండి
- సమస్య కొనసాగితే, OmniRouteను పునఃప్రారంభించండి

### "ఫారిన్ కీ పరిమితి విఫలమైంది"

ఒక డొమైన్ మాడ్యూల్ రెఫరెన్షియల్ ఇంటెగ్రిటీని ఉల్లంఘిస్తోంది. వీటిని తనిఖీ చేయండి:

- ఆధారిత పట్టికలలో అనుబంధం లేని వరుసలు
- వ్యాప్తి చెందని క్యాస్కేడింగ్ తొలగింపులు
- ఫారిన్ కీని మార్చిన ఇటీవలి మైగ్రేషన్

ఉల్లంఘనలను కనుగొనడానికి `PRAGMA foreign_key_check;`ను అమలు చేయండి.

### "మెమరీ అయిపోయింది"

SQLite యొక్క మెమరీ-మ్యాప్డ్ I/O, OS పరిమితిని మించుతోంది. SQLite pragma ద్వారా తగ్గించండి:

```sql
PRAGMA mmap_size = 134217728;  -- 256MBకు బదులుగా 128MB
```

లేదా నిలిపివేయండి:

```sql
PRAGMA mmap_size = 0;
```

### "మైగ్రేషన్ మధ్యలో విఫలమైంది"

మైగ్రేషన్ ఒక ట్రాన్సాక్షన్లో అమలైంది, కాబట్టి అది రోల్బ్యాక్ అయి ఉండాలి. అలా జరగకపోతే:

1. **OmniRouteను ఆపండి** (తదుపరి ప్రయత్నాలను నిరోధించండి)
2. `sqlite3`తో **DB స్థితిని తనిఖీ చేయండి**
3. పాక్షిక మైగ్రేషన్ను **మాన్యువల్గా సరిచేయండి**
4. OmniRouteను **మళ్లీ అమలు చేయండి** (మైగ్రేషన్ మళ్లీ ప్రయత్నించబడుతుంది)

దీనిని నివారించడానికి, మైగ్రేషన్లను ఎల్లప్పుడూ ముందుగా ఒక కాపీపై పరీక్షించండి.

---

## ఇవి కూడా చూడండి

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — వినియోగ పట్టికలు
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — స్థితి పర్యవేక్షణ
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — విడుదల ప్రక్రియ
- సోర్స్: `src/lib/db/` (80+ ఫైల్లు, ~25K LOC)
