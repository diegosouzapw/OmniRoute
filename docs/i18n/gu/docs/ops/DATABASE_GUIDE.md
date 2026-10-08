# Database Schema & Operations Guide (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **ટૂંકમાં**: OmniRoute તેના પ્રાથમિક સ્ટોર તરીકે **WAL જર્નલિંગ સાથે SQLite** નો ઉપયોગ કરે છે અને સંવેદનશીલ ફીલ્ડ્સ માટે સંગ્રહિત ડેટા પર **AES-256-GCM** એન્ક્રિપ્શન લાગુ કરે છે. આ માર્ગદર્શિકા સ્કીમા, માઇગ્રેશન્સ, બૅકઅપ/પુનઃપ્રાપ્તિ અને ઓપરેશનલ રનબુક્સને આવરી લે છે.

**સ્ત્રોતો:**

- `src/lib/db/core.ts` — સિંગલટન + SCHEMA_SQL (17 મૂળભૂત કોષ્ટકો)
- `src/lib/db/migrationRunner.ts` — સંસ્કરણબદ્ધ માઇગ્રેશન્સ
- `src/lib/db/migrations/` — 167 સંસ્કરણબદ્ધ SQL ફાઇલો
- `src/lib/db/encryption.ts` — એન્ક્રિપ્શન સહાયક ફંક્શન્સ
- `src/lib/db/backup.ts` — બૅકઅપ નિકાસ/આયાત
- `src/lib/db/healthCheck.ts` — સ્વાસ્થ્ય નિદાન

---

## SQLite શા માટે?

OmniRoute એ PostgreSQL/MySQL કરતાં SQLite ને પસંદ કરવા પાછળ અનેક કારણો છે:

| પરિબળ              | SQLite                                 | PostgreSQL                             |
| ------------------ | -------------------------------------- | -------------------------------------- |
| **ડિપ્લોયમેન્ટ**   | એમ્બેડેડ — અલગ સર્વરની જરૂર નથી        | સર્વર સેટઅપ જરૂરી છે                   |
| **એન્ક્રિપ્શન**    | ઍપ્લિકેશન-સ્તરનું (AES-256-GCM)        | બિલ્ટ-ઇન TDE                           |
| **કાર્યક્ષમતા**    | નાના/મધ્યમ વર્કલોડ માટે વધુ ઝડપી       | ખૂબ મોટા સમકાલીન રાઇટ્સ માટે વધુ સારું |
| **સમવર્તિતા**      | WAL મોડ સમકાલીન રીડ્સની મંજૂરી આપે છે  | સંપૂર્ણ MVCC                           |
| **બૅકઅપ**          | એક જ ફાઇલની કૉપી                       | `pg_dump` અથવા ફાઇલસિસ્ટમ સ્નૅપશૉટ     |
| **ઉપયોગનો કિસ્સો** | પ્રતિ-વપરાશકર્તા ઇન્સ્ટોલેશન, એમ્બેડેડ | મલ્ટિ-ટેનન્ટ SaaS                      |

**એકલ-વપરાશકર્તા, એકલ-ઇન્સ્ટન્સ** ડિપ્લોયમેન્ટ્સ (OmniRoute નો મુખ્ય ઉપયોગનો કિસ્સો) માટે SQLite વધુ સરળ અને ઝડપી છે.

### WAL જર્નલિંગ

`core.ts` ડેટાબેઝને **WAL (Write-Ahead Logging) મોડ** સાથે ખોલે છે:

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL રાઇટ્સ દરમિયાન **સમકાલીન રીડ્સ** કરવાની મંજૂરી આપે છે — આ ડૅશબોર્ડ માટે મહત્વપૂર્ણ છે, કારણ કે વિનંતીઓ રેકોર્ડ થઈ રહી હોય ત્યારે તે ક્વેરીઝ ચલાવે છે.

ડિફૉલ્ટ કૅશ કદ **65,536 KiB (64 MiB)** છે. SQLite નકારાત્મક
`cache_size` ને KiB માં અંદાજિત મહત્તમ મર્યાદા તરીકે અર્થઘટન કરે છે અને જરૂરિયાત મુજબ પેજિસ ફાળવે છે.
**સેટિંગ્સ > સિસ્ટમ અને સ્ટોરેજ > કૅશ કદ** **1 થી
1,000,000 KiB** સુધીના પૂર્ણાંક મૂલ્યો સ્વીકારે છે; સેટિંગ સાચવવાથી તે સક્રિય ડેટાબેઝ કનેક્શન પર લાગુ થાય છે,
અને OmniRoute સ્ટાર્ટઅપ વખતે સંગ્રહિત મૂલ્ય પુનઃસ્થાપિત કરે છે.

---

## ડેટાબેઝનું સ્થાન

SQLite ફાઇલ અહીં સંગ્રહિત થાય છે:

| OS      | પાથ                                                                    |
| ------- | ---------------------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                                          |
| macOS   | `~/.omniroute/storage.sqlite`                                          |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                              |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR` દ્વારા રૂપરેખાંકિત કરી શકાય છે) |

સહાયક ફાઇલો:

- `storage.sqlite-wal` — રાઇટ-અહેડ લૉગ
- `storage.sqlite-shm` — શેર્ડ મેમરી ફાઇલ
- `call_logs/` — વિનંતીના પેલોડની આર્ટિફેક્ટ્સ (જો સક્ષમ કરેલ હોય)

**સ્થાનને ઓવરરાઇડ કરો:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## ડોમેન મોડ્યુલ આર્કિટેક્ચર

OmniRouteના ડેટાબેઝમાં `src/lib/db/` હેઠળ **110 ટોપ-લેવલ TypeScript મોડ્યુલ્સ** છે. દરેક ડોમેન મોડ્યુલ:

- એક અથવા વધુ ચોક્કસ ટેબલ્સની માલિકી ધરાવે છે
- ટાઇપ કરેલા CRUD ફંક્શન્સ એક્સપોર્ટ કરે છે
- અન્ય મોડ્યુલના ટેબલ્સને ક્યારેય સ્પર્શતું નથી
- DB ઍક્સેસ કરવા માટે `core.ts`માંથી `getDbInstance()`નો ઉપયોગ કરે છે

### 110 ટોપ-લેવલ DB મોડ્યુલ્સ

OmniRouteમાં `src/lib/db/` હેઠળ **110 ટોપ-લેવલ TypeScript ફાઇલો** છે. નીચે મુખ્ય મોડ્યુલ્સના કેટલાક નમૂનાઓ આપેલા છે; સંપૂર્ણ સૂચિ માટે ડિરેક્ટરી લિસ્ટિંગ જુઓ:

| મોડ્યુલ                 | ટેબલ્સ                                                         | જવાબદારી                                                               |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API કી પ્રદાતાની નોંધણી અને ઓળખપત્રો                             |
| `models.ts`             | `key_value` (મોડલ ડેટા)                                        | મોડલની વ્યાખ્યાઓ, ક્ષમતાઓ અને કિંમત                                    |
| `combos.ts`             | `combos`                                                       | કૉમ્બો રાઉટિંગ રૂપરેખાઓ અને ક્રમ                                       |
| `apiKeys.ts`            | `api_keys`                                                     | API કી જીવનચક્ર, સ્કોપ્સ અને ક્વોટા ટ્રૅકિંગ                           |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | સિસ્ટમ રૂપરેખાંકન અને શેર્ડ KV સ્ટોર                                   |
| `backup.ts`             | —                                                              | બૅકઅપ એક્સપોર્ટ/ઇમ્પોર્ટ ઑપરેશન્સ                                      |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | પ્રૉક્સી રૂપરેખાઓ અને રાઉટિંગ નિયમો                                    |
| `prompts.ts`            | `prompt_templates`                                             | ફરી ઉપયોગ કરી શકાય તેવા પ્રોમ્પ્ટ ટેમ્પ્લેટ્સ અને વર્ઝનિંગ             |
| `webhooks.ts`           | `webhooks`                                                     | ઇવેન્ટ-આધારિત વેબહૂક સબ્સ્ક્રિપ્શન્સ અને લૉગ્સ                         |
| `detailedLogs.ts`       | `request_detail_logs`                                          | દરેક રિક્વેસ્ટ માટે ઑડિટ લૉગિંગ (વૈકલ્પિક, ઉચ્ચ વૉલ્યુમ)               |
| `domainState.ts`        | `domain_*` (5 ટેબલ્સ)                                          | ડોમેન બજેટ્સ, સર્કિટ બ્રેકર્સ, લૉકઆઉટ્સ, ફૉલબૅક ચેઇન્સ અને ખર્ચ ઇતિહાસ |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A માટે વ્હાઇટલિસ્ટ કરેલી API કીઝ                                 |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | ઐતિહાસિક ક્વોટા વપરાશ                                                  |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | મોડલ્સને ડિફૉલ્ટ કૉમ્બો સાથે મૅપ કરવા                                  |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI-વિશિષ્ટ કાયમી સ્થિતિ                                               |
| `encryption.ts`         | —                                                              | ફીલ્ડ્સને એન્ક્રિપ્ટ/ડિક્રિપ્ટ કરવા માટેના સહાયક ફંક્શન્સ              |
| `readCache.ts`          | —                                                              | વધુ રીડ ઑપરેશન્સ માટે ઇન-મેમરી કૅશ                                     |
| `secrets.ts`            | `key_value` (એન્ક્રિપ્ટ કરેલી એન્ટ્રીઓ)                        | એન્ક્રિપ્ટ કરેલું સિક્રેટ સ્ટોરેજ                                      |
| `stateReset.ts`         | —                                                              | પરીક્ષણ માટે DB સ્થિતિને વાઇપ/રીસેટ કરવી                               |
| `contextHandoffs.ts`    | `context_handoffs`                                             | એજન્ટ હૅન્ડઑફ માટે સેશન કૉન્ટેક્સ્ટ                                    |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | વપરાશ ટ્રૅકિંગ                                                         |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | કમ્પ્રેશન રૂપરેખાંકન                                                   |

### મોડ્યુલ સીમાઓ

એક મુખ્ય આર્કિટેક્ચરલ નિયમ: **મોડ્યુલ્સ એકબીજાના ટેબલ્સને સીધા ઍક્સેસ કરતા નથી**. અન્ય મોડ્યુલના ડેટા સાથે કામ કરવા માટે, તે મોડ્યુલમાંથી ફંક્શન ઇમ્પોર્ટ કરો.

```ts
// ❌ ખોટું: અન્ય મોડ્યુલમાંથી સીધું SQL
db.prepare("SELECT * FROM provider_connections").all();

// ✅ સાચું: providers મોડ્યુલના ફંક્શનનો ઉપયોગ કરો
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

આ નિયમ કોડ રિવ્યૂ દ્વારા લાગુ કરવામાં આવે છે — કોઈ સ્ટેટિક ચેક નથી, પરંતુ નિયમભંગને ફ્લૅગ કરવામાં આવે છે.

---

## આધારભૂત સ્કીમા (17 ટેબલ)

`core.ts`, `SCHEMA_SQL`માં 17 આધારભૂત ટેબલ વ્યાખ્યાયિત કરે છે. આ ટેબલ migration `001_initial_schema.sql` દ્વારા બનાવવામાં આવે છે અને મુખ્ય સ્કીમાનું નિર્માણ કરે છે.

### મુખ્ય ટેબલ (પ્રારંભિક migrationમાં બનાવેલ)

| ટેબલ                       | હેતુ                              | મુખ્ય કૉલમ                                                              |
| -------------------------- | --------------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | પ્રોવાઇડર ઓળખપત્રો (એન્ક્રિપ્ટેડ) | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | પ્રોવાઇડર નોડ રાઉટિંગ માહિતી      | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | સામાન્ય KV સ્ટોર                  | `namespace`, `key`, `value`                                             |
| `combos`                   | રાઉટિંગ કોમ્બો વ્યાખ્યાઓ          | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | ગેટવે માટેની API કીઝ              | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | ડેટાબેઝ મેટાડેટા                  | `key`, `value`                                                          |
| `usage_history`            | વિનંતી વપરાશ રેકોર્ડ              | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | વિનંતી પેલોડ અને પ્રતિસાદ         | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | પ્રોક્સી વિનંતી લૉગ               | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | મોડલ-થી-પ્રોવાઇડર ચેઇન            | `model`, `chain`                                                        |
| `domain_budgets`           | દરેક ડોમેન માટે ખર્ચ બજેટ         | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | બજેટ રીસેટ ઇતિહાસ                 | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | દરેક ડોમેન માટે ખર્ચ ટ્રેકિંગ     | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | ડોમેન દર-મર્યાદા સ્થિતિ           | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | દરેક ડોમેનની સર્કિટ બ્રેકર સ્થિતિ | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM પ્રતિસાદ કૅશ                  | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | ઐતિહાસિક ક્વોટા સ્નૅપશૉટ          | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### વધારાના ટેબલ (પછીના migrations દ્વારા ઉમેરાયેલા)

પછીના migrations આ પ્રકારના ટેબલ ઉમેરે છે:

- `cli_tool_state` (migration 011) — CLI ટૂલની સ્થિતિ
- `mcp_*` ટેબલ — MCP સર્વર ઑડિટ
- `a2a_*` ટેબલ — A2A કાર્ય સ્થિતિ
- `usage_*` ટેબલ — વપરાશ ટ્રેકિંગ
- `plugin_*` ટેબલ — પ્લગઇન સિસ્ટમ
- `skill_executions` — કૌશલ્ય અમલીકરણ ઇતિહાસ
- `memory_*` ટેબલ — મેમરી સિસ્ટમ
- `compression_*` ટેબલ — કમ્પ્રેશન સિસ્ટમ
- `webhook_*` ટેબલ — વેબહૂક ડિલિવરી લૉગ
- `acp_*` ટેબલ — Agent Client Protocol
- `oneproxy_*` ટેબલ — 1proxy માર્કેટપ્લેસ
- `proxy_assignments` — પ્રોક્સી સ્કોપ બાઇન્ડિંગ્સ
- `detailed_call_artifacts` — કૉલ લૉગ આર્ટિફેક્ટ્સ મેટાડેટા
- `quota_alert_history` — ક્વોટા ચેતવણી ઑડિટ
- `command_code_auth_sessions` — Command Code OAuth સેશન્સ

~30+ ટેબલની સંપૂર્ણ સૂચિ `src/lib/db/migrations/`માં છે.

---

## માઇગ્રેશન્સ

OmniRoute `src/lib/db/migrations/`માં **વર્ઝનવાળા, આઇડેમ્પોટન્ટ માઇગ્રેશન્સ**નો ઉપયોગ કરે છે. દરેક માઇગ્રેશન `NNN_description.sql` નામની એક SQL ફાઇલ હોય છે.

### માઇગ્રેશન નામકરણ

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### માઇગ્રેશન્સ કેવી રીતે ચાલે છે

શરૂઆત સમયે, `migrationRunner.ts`:

1. જો `_omniroute_migrations` ટેબલ અસ્તિત્વમાં ન હોય તો તેને બનાવે છે
2. અગાઉથી લાગુ કરાયેલા માઇગ્રેશન્સ માટે ક્વેરી કરે છે
3. દરેકને એક ટ્રાન્ઝેક્શનમાં રાખીને, કોઈપણ નવા માઇગ્રેશન્સ ક્રમસર લાગુ કરે છે
4. દરેક લાગુ કરાયેલા માઇગ્રેશનને ટાઇમસ્ટૅમ્પ સાથે નોંધે છે

```ts
// src/lib/db/migrationRunner.ts (સરળીકૃત)
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

### આઇડેમ્પોટન્સી

માઇગ્રેશન્સ **આઇડેમ્પોટન્ટ** હોવા આવશ્યક છે — તેમને બે વખત ચલાવવાથી કોઈ અસર થવી જોઈએ નહીં:

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, અને `OR IGNORE` / `OR REPLACE` ક્લૉઝનો છૂટથી ઉપયોગ કરો.

### નવું માઇગ્રેશન ઉમેરવું

1. **આગળનો નંબર ઓળખો**: `ls src/lib/db/migrations/ | tail -1`
2. **ફાઇલ બનાવો**: `NNN_my_change.sql`
3. **સુરક્ષિત DDL વાપરો**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **ડેટા સાવધાનીપૂર્વક બૅકફિલ કરો**: અસ્તિત્વમાં રહેલી પંક્તિઓને સંભાળવા માટે `UPDATE ... WHERE ...` વાપરો
5. **નકલ પર પરીક્ષણ કરો**: પરીક્ષણ ન કરેલા માઇગ્રેશન્સને ક્યારેય પ્રોડક્શન પર ચલાવશો નહીં

ઉદાહરણ:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **પાછળની આવૃત્તિ સાથે અસંગત ફેરફારો** (દા.ત., કૉલમ્સ દૂર કરવા) મુશ્કેલ હોય છે. OmniRoute ડાઉનગ્રેડને સપોર્ટ કરતું નથી — એક વખત માઇગ્રેશન લાગુ થઈ જાય પછી, સ્કીમામાં થયેલો ફેરફાર કાયમી હોય છે. તે મુજબ આયોજન કરો.

---

## સંગ્રહિત ડેટાનું એન્ક્રિપ્શન

સંવેદનશીલ ફીલ્ડ્સ (API કીઝ, OAuth ટોકન્સ, કનેક્શન સ્ટ્રિંગ્સ)ને સંગ્રહિત અવસ્થામાં **AES-256-GCM**નો ઉપયોગ કરીને એન્ક્રિપ્ટ કરવામાં આવે છે.

### તે કેવી રીતે કાર્ય કરે છે

```ts
// src/lib/db/encryption.ts (સરળીકૃત)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### તેનો ક્યાં ઉપયોગ થાય છે

- `provider_connections.api_key` — ઍપ્લિકેશન સ્તરે એન્ક્રિપ્ટ કરેલું
- `provider_connections.access_token`, `refresh_token`, `id_token` — ઍપ્લિકેશન સ્તરે એન્ક્રિપ્ટ કરેલા
- `namespace = "secrets"` ધરાવતી `key_value` એન્ટ્રીઓ — ઍપ્લિકેશન સ્તરે એન્ક્રિપ્ટ કરેલી
- `proxy_registry.auth` — ઍપ્લિકેશન સ્તરે એન્ક્રિપ્ટ કરેલું (જો હાજર હોય)

### એન્ક્રિપ્શન કી

એન્ક્રિપ્શન કી એક **પાસફ્રેઝ** (`STORAGE_ENCRYPTION_KEY` env var દ્વારા સેટ કરાયેલ) અને એક **સૉલ્ટ** (DBમાં સંગ્રહિત)માંથી મેળવવામાં આવે છે. ડેટાને ડિક્રિપ્ટ કરવા માટે બંને આવશ્યક છે.

```bash
# સુરક્ષિત પાસફ્રેઝ જનરેટ કરો
openssl rand -hex 32

# .envમાં સેટ કરો
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **અત્યંત મહત્વપૂર્ણ**: એન્ક્રિપ્શન કી ગુમાવવાનો અર્થ તમામ એન્ક્રિપ્ટેડ ડેટાની ઍક્સેસ ગુમાવવી થાય છે. **કીનો બૅકઅપ ડેટાબેઝથી અલગ રાખો**.

### શું એન્ક્રિપ્ટેડ નથી

કાર્યક્ષમતાના કારણોસર, નીચેની વસ્તુઓ પ્લેનટેક્સ્ટમાં સંગ્રહિત થાય છે:

- પ્રોવાઇડરના પ્રદર્શિત નામો
- મૉડલ વ્યાખ્યાઓ (પહેલેથી જ સાર્વજનિક)
- રાઉટિંગ નિયમો
- વપરાશ રેકોર્ડ્સ (કોઈ PII નથી)

---

## એન્ક્રિપ્શન સંબંધિત મર્યાદાઓ (v3.8.16+)

OmniRoute બે એન્ક્રિપ્શન યોજનાઓને પારદર્શક રીતે સંભાળવા માટે **`migrateLegacyEncryptedString()`** નો ઉપયોગ કરે છે:

- **લેગસી** (v3.5.0 પહેલાં): XOR-આધારિત "એન્ક્રિપ્શન" (વાસ્તવિક ક્રિપ્ટોગ્રાફી નથી)
- **વર્તમાન**: યોગ્ય IV અને ઑથેન્ટિકેશન ટૅગ સાથે AES-256-GCM

માઇગ્રેશન હેલ્પર લેગસી ફોર્મેટ શોધે છે અને પ્રથમ વાર વાંચતી વખતે નવી યોજના વડે ફરીથી એન્ક્રિપ્ટ કરે છે. આનો અર્થ એ છે કે તમે ઓળખપત્રો ગુમાવ્યા વિના જૂના ડેટાબેઝને અપગ્રેડ કરી શકો છો.

---

## રીડ કૅશ

વારંવાર વાંચવામાં આવતા ડેટા (મોડલ્સ, પ્રોવાઇડર્સ, સેટિંગ્સ) માટે, `readCache.ts` એક **ઇન-મેમરી કૅશ** પ્રદાન કરે છે:

```ts
// સ્ટાર્ટઅપ વખતે કૅશ થાય છે, લખાણ વખતે અમાન્ય થાય છે
const providers = await getCachedProviders(); // ઝડપી, ઇન-મેમરી
const fresh = await listProviders(); // ધીમું, DB ઍક્સેસ કરે છે
```

| કૅશ કરેલી એન્ટિટી      | કૅશ કી         | TTL       |
| ---------------------- | -------------- | --------- |
| `models`               | `models:v1`    | લખાણ સુધી |
| `provider_connections` | `providers:v1` | લખાણ સુધી |
| `settings`             | `settings:v1`  | લખાણ સુધી |
| `combos`               | `combos:v1`    | લખાણ સુધી |

સંબંધિત ટેબલમાં દરેક લખાણ વખતે કૅશ અમાન્ય કરવામાં આવે છે.

---

## બૅકઅપ અને પુનઃપ્રાપ્તિ

### મેન્યુઅલ બૅકઅપ

```bash
# સ્થાનિક બૅકઅપ બનાવવા માટે CLI નો ઉપયોગ કરો
omniroute backup create --name pre-migration

# અથવા API મારફતે
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

બૅકઅપ ફાઇલમાં આનો સમાવેશ થાય છે:

- તમામ DB ટેબલ્સ (JSON માં સિરિયલાઇઝ કરેલા)
- કૉલ લૉગ આર્ટિફૅક્ટ્સ (base64-એન્કોડેડ, વૈકલ્પિક)
- સેટિંગ્સ + સિક્રેટ્સ (એન્ક્રિપ્ટેડ)
- પ્લગઇન કન્ફિગરેશન

### પુનઃસ્થાપન

```bash
# CLI મારફતે
omniroute restore pre-migration

# API મારફતે
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **ચેતવણી**: પુનઃસ્થાપન સમગ્ર DB ને ઓવરરાઇટ કરે છે. પહેલાં બધા ક્લાયન્ટ્સને બંધ કરો.

### સ્વચાલિત બૅકઅપ્સ

```bash
# CLI મારફતે સ્વચાલિત દૈનિક બૅકઅપ્સ સક્ષમ કરો
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

શેડ્યૂલ સર્વર-સાઇડ પર બૅકગ્રાઉન્ડ જૉબ દ્વારા ચલાવવામાં આવે છે, જે દર 30 સેકન્ડે
(ડિફૉલ્ટ) ટિક કરે છે અને સ્થાનિક સર્વર સમય સામે cron એક્સપ્રેશનનું મૂલ્યાંકન કરે છે.

| વેરિએબલ                                     | ડિફૉલ્ટ | વર્ણન                                                                                                                |
| ------------------------------------------- | ------- | -------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | ms માં ટિક અંતરાલ (ન્યૂનતમ `5000`). મેળ ખાતી cron મિનિટની અંદર વિશ્વસનીય રીતે આવવા માટે તે 60 s કરતાં ઓછો હોવો જોઈએ. |

### SQLite હૉટ બૅકઅપ

ચાલુ DB નો શૂન્ય-ડાઉનટાઇમ બૅકઅપ લેવા માટે:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

આ SQLite ના ઑનલાઇન બૅકઅપ API નો ઉપયોગ કરે છે — OmniRoute ચાલી રહ્યું હોય ત્યારે ચલાવવા માટે સુરક્ષિત છે.

---

## કાર્યક્ષમતા ટ્યુનિંગ

### WAL મોડ

WAL ડિફૉલ્ટ રૂપે સક્ષમ હોય છે. વધુ લખાણવાળા વર્કલોડ માટે, આનો વિચાર કરો:

```sql
PRAGMA wal_autocheckpoint = 1000;  -- દર 1000 પેજે ચેકપોઇન્ટ
PRAGMA journal_size_limit = 67108864;  -- 64MB WAL મર્યાદા
```

### ઇન્ડેક્સ

કાર્યક્ષમતા માટેના મુખ્ય ઇન્ડેક્સ (માઇગ્રેશન્સ દ્વારા આપમેળે બનાવવામાં આવે છે):

- `idx_models_provider` — પ્રદાતા મુજબ મોડેલ લુકઅપ
- `idx_combo_targets_combo_id` — કોમ્બો ટાર્ગેટ વિસ્તરણ
- `idx_usage_history_api_key_timestamp` — વપરાશ વિશ્લેષણ
- `idx_quota_snapshots_api_key_window` — ક્વોટા ટ્રૅકિંગ
- `idx_call_logs_timestamp` — કૉલ લૉગ ક્વેરીઓ

નવો ઇન્ડેક્સ ઉમેરવા માટે, માઇગ્રેશન બનાવો:

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### મેમરી-મૅપ્ડ I/O

ખૂબ મોટા ડેટાબેસ (>10GB) માટે, SQLite pragma દ્વારા મેમરી મૅપિંગ સમાયોજિત કરી શકાય છે:

```sql
-- SQLite pragma દ્વારા સેટ કરો (core.ts અથવા રનટાઇમમાં સમાયોજિત કરો)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### કમ્પૅક્શન

લાંબા સમયથી ચાલી રહેલા OmniRoute ઇન્સ્ટન્સને ક્યારેક `VACUUM` કરવાથી લાભ થાય છે:

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

ઓછા ટ્રાફિકના સમયગાળા દરમિયાન દર મહિને ચલાવો. (WAL મોડ તેની જરૂરિયાત ઘટાડે છે, પરંતુ તેને સંપૂર્ણપણે દૂર કરતું નથી.)

---

## હેલ્થ ચેક

`src/lib/db/healthCheck.ts` **DB-સ્તરના હેલ્થ ડાયગ્નોસ્ટિક્સ** પ્રદાન કરે છે:

બંને વર્બ્સ માટે પ્રમાણીકરણ જરૂરી છે (નહિતર `401`). `GET` માત્ર નિદાન કરે છે; `POST`
`autoRepair` સક્ષમ કરીને એ જ ચેક ચલાવે છે.

```bash
GET  /api/db/health   # નિદાન કરો
POST /api/db/health   # નિદાન કરો + સમારકામ કરો
```

પ્રતિસાદ એ `runDbHealthCheck()` દ્વારા ઉત્પન્ન થયેલું `DbHealthCheckResult` છે
(`src/lib/db/healthCheck.ts`):

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "ડોમેન બજેટ્સ એવા API કીઝને સંદર્ભિત કરતા હતા જે હવે અસ્તિત્વમાં નથી.",
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

| ફીલ્ડ             | અર્થ                                                                                                                                           |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | જ્યારે `issues` ખાલી હોય ત્યારે `true`. `driver` તેને ક્યારેય પ્રભાવિત કરતું નથી.                                                              |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` પૈકી એક.                                                       |
| `repairedCount`   | આ રન દરમિયાન સમારકામ કરાયેલી પંક્તિઓ; જ્યારે `autoRepair` false હોય ત્યારે હંમેશાં `0`.                                                        |
| `backupCreated`   | સમારકામ પહેલાં બૅકઅપ લેવામાં આવ્યું હતું કે નહીં.                                                                                              |
| `checkedAt`       | રન અને તેના દ્વારા લખવામાં આવતી કોઈપણ સમારકામ નોંધ દ્વારા વહેંચાયેલ ISO ટાઇમસ્ટૅમ્પ.                                                           |
| `driver.name`     | તપાસવામાં આવેલા ડેટાબેસને સેવા આપતો SQLite ડ્રાઇવર.                                                                                            |
| `driver.degraded` | જ્યારે લખાણો ડેટાબેસ ફાઇલ દ્વારા ટકાઉ રીતે બૅક ન થતા હોય ત્યારે `true` — `sql.js` WASM ફૉલબૅક (આખી ફાઇલનું પર્સિસ્ટન્સ) અથવા ઇન-મેમરી ડેટાબેસ. |

આ જ પેલોડ `omniroute_db_health_check` MCP ટૂલ દ્વારા પરત કરવામાં આવે છે.

કરપ્શન શોધવા માટે `PRAGMA integrity_check` ચલાવો:

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# આ પ્રિન્ટ થવું જોઈએ: ok
```

જો તે `ok` સિવાય કંઈપણ પરત કરે, તો **તાત્કાલિક ડેટાબેસનો ઉપયોગ બંધ કરો** અને બૅકઅપમાંથી પુનઃસ્થાપિત કરો.

---

## આપત્તિ પુનઃપ્રાપ્તિ

### પરિસ્થિતિ 1: WAL ફાઇલ ખોવાઈ ગઈ

`-wal` ફાઇલ ગાયબ છે, પરંતુ `-shm` અને મુખ્ય DB અકબંધ છે:

```bash
# આગલી વાર ખોલતાં આપમેળે પુનઃપ્રાપ્ત થાય છે
omniroute
```

જો SQLite આપમેળે પુનઃપ્રાપ્ત ન કરી શકે:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### પરિસ્થિતિ 2: મુખ્ય DB ફાઇલ દૂષિત થઈ ગઈ

બૅકઅપમાંથી પુનઃસ્થાપિત કરો:

```bash
omniroute sync pull --merge   # અથવા: omniroute backup restore <backup-id>
```

### પરિસ્થિતિ 3: એન્ક્રિપ્શન કી ખોવાઈ ગઈ

કી વિના **પુનઃપ્રાપ્તિ શક્ય નથી**. એન્ક્રિપ્ટ કરેલાં ફીલ્ડ વાંચી શકાશે નહીં. નવા ઓળખપત્રો સાથે બધા પ્રદાતાઓને મેન્યુઅલી ફરીથી ઉમેરો.

> **જોખમ ઘટાડવાનો ઉપાય**: એન્ક્રિપ્શન કીનો હંમેશાં અલગથી બૅકઅપ લો, આદર્શ રીતે પાસવર્ડ મેનેજર અથવા KMSમાં.

### પરિસ્થિતિ 4: ડિસ્ક ભરાઈ ગઈ

SQLite `SQLITE_FULL` ભૂલો પરત કરશે. ડિસ્કમાં જગ્યા ખાલી કરો, ત્યારબાદ:

```bash
# જગ્યા ખાલી કરવા માટે WALનું ચેકપોઇન્ટ બનાવો
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## સામાન્ય કામગીરીઓ

### ટેબલનું નિરીક્ષણ કરો

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### બધા ટેબલમાં પંક્તિઓની ગણતરી કરો

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### બધો ડેટા રીસેટ (સાફ) કરો

```bash
# પહેલાં OmniRoute બંધ કરો
omniroute stop

# DB ફાઇલ કાઢી નાખો
rm ~/.omniroute/storage.sqlite*

# ફરી શરૂ કરો (ખાલી DB ફરીથી બનાવવામાં આવશે)
omniroute
```

**પસંદગીયુક્ત** રીસેટ માટે (પ્રદાતાઓ રાખો, વપરાશ સાફ કરો):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### એક ટેબલ નિકાસ કરો

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## સમસ્યાનિવારણ

### "ડેટાબેઝ લૉક થયેલો છે"

અન્ય કોઈ પ્રક્રિયાએ રાઇટ લૉક પકડી રાખ્યો છે. આમાંથી કોઈ એક કરો:

- બીજી પ્રક્રિયા પૂર્ણ થાય ત્યાં સુધી રાહ જુઓ (`lsof | grep storage.sqlite` તપાસો)
- બીજી પ્રક્રિયાને સમાપ્ત કરો
- જો સમસ્યા ચાલુ રહે, તો OmniRoute ફરી શરૂ કરો

### "ફોરેન કી નિયંત્રણ નિષ્ફળ ગયું"

ડોમેન મોડ્યુલ રેફરેન્શિયલ ઇન્ટિગ્રિટીનું ઉલ્લંઘન કરી રહ્યું છે. આ તપાસો:

- આધારિત ટેબલમાં અનાથ પંક્તિઓ
- આગળ પ્રસારિત ન થયેલા કૅસ્કેડિંગ ડિલીટ
- ફોરેન કી બદલનાર તાજેતરનું માઇગ્રેશન

ઉલ્લંઘનો શોધવા માટે `PRAGMA foreign_key_check;` ચલાવો.

### "મેમરી સમાપ્ત થઈ ગઈ"

SQLiteનું મેમરી-મૅપ્ડ I/O, OSની મર્યાદા વટાવી રહ્યું છે. SQLite pragma દ્વારા તેને ઘટાડો:

```sql
PRAGMA mmap_size = 134217728;  -- 256MBને બદલે 128MB
```

અથવા તેને અક્ષમ કરો:

```sql
PRAGMA mmap_size = 0;
```

### "માઇગ્રેશન અધવચ્ચે નિષ્ફળ ગયું"

માઇગ્રેશન ટ્રાન્ઝેક્શનમાં ચાલ્યું હતું, તેથી તે રોલ બૅક થઈ ગયું હોવું જોઈએ. જો એવું ન થયું હોય:

1. **OmniRoute બંધ કરો** (વધુ પ્રયાસો અટકાવવા માટે)
2. `sqlite3` વડે **DBની સ્થિતિ તપાસો**
3. આંશિક માઇગ્રેશનને **મેન્યુઅલી સુધારો**
4. OmniRouteને **ફરીથી ચલાવો** (માઇગ્રેશનનો ફરી પ્રયાસ કરવામાં આવશે)

આને અટકાવવા માટે, માઇગ્રેશનનું હંમેશાં પહેલાં તેની નકલ પર પરીક્ષણ કરો.

---

## આ પણ જુઓ

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — વપરાશ ટેબલ
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — સ્થિતિનું નિરીક્ષણ
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — રિલીઝ પ્રક્રિયા
- સ્રોત: `src/lib/db/` (80+ ફાઇલો, ~25K LOC)
