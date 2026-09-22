# OmniRoute MCP Server Documentation (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> ម៉ាស៊ីនមេ Model Context Protocol ដែលមានឧបករណ៍ចំនួន 110 សម្រាប់ប្រតិបត្តិការផ្លូវបញ្ជូន ឃ្លាំងសម្ងាត់ ការបង្ហាប់ អង្គចងចាំ ជំនាញ ប្រូកស៊ី ក្រុម Radar និងប្រភពបរិបទ។
>
> ប្រភពយោងត្រឹមត្រូវ៖ `open-sse/mcp-server/server.ts` គណនា **ឧបករណ៍តែមួយគត់ចំនួន 110** ដោយប្រើ `countUniqueMcpTools()`៖ និយមន័យស្តង់ដារចំនួន 45 (រួមទាំងឧបករណ៍វដ្តជីវិត CCR ចំនួនប្រាំមួយ ឧបករណ៍ agent-skills ទាំងបី `omniroute_radar_catalog` និង `omniroute_x_search`) បូករួមទាំងអង្គចងចាំ (3) ជំនាញ (4) ជំនាញ GitHub (3) ក្រុម (6) យន្តការល្បែង (8) កម្មវិធីជំនួយ (8) Notion (6) Obsidian (22) សំណុំឯកសារមូលដ្ឋាន (3) និងឧបករណ៍បង្ហាប់សម្រាប់តែ RTK ចំនួនពីរ។

## ការដំឡើង

OmniRoute MCP ត្រូវបានភ្ជាប់មកជាស្រេច។ ចាប់ផ្ដើមវាដោយ៖

```bash
omniroute --mcp
```

ឬតាមរយៈមធ្យោបាយបញ្ជូន open-sse៖

```bash
# មធ្យោបាយបញ្ជូន HTTP ដែលអាចធ្វើស្ទ្រីមបាន (ច្រក 20130)
omniroute --dev  # MCP ចាប់ផ្ដើមដោយស្វ័យប្រវត្តិនៅលើ endpoint /mcp
```

មធ្យោបាយបញ្ជូន HTTP (`sse` / `streamable-http` ដែលដំណើរការនៅក្នុង process ដោយម៉ាស៊ីនមេ dashboard) ត្រូវបាន
បិទតាមលំនាំដើម ហើយពីមុនអាចបិទបើកបានតែពីទំព័រ `/dashboard/mcp` ប៉ុណ្ណោះ។ ចាប់ពី v3.8.51
CLI មានមុខងារស្មើគ្នា៖

```bash
omniroute mcp status                                  # បានបើក/អនឡាញ មធ្យោបាយបញ្ជូន និងចំនួនឧបករណ៍
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # កំណត់សម័យ sse/streamable-http ដែលសកម្មឡើងវិញ
```

`mcp enable`/`mcp disable` ផ្ញើសំណើ PATCH ទៅកាន់ការកំណត់ `mcpEnabled` ដូចគ្នា (និង `mcpTransport` ជាជម្រើស)
ដែល dashboard បិទបើកតាមរយៈ `/api/settings`។ `mcp restart` ហៅ `POST /api/mcp/restart`៖ វាបិទ
សម័យ `sse`/`streamable-http` ដែលសកម្ម ដើម្បីឱ្យសំណើបន្ទាប់ចាប់ផ្ដើមឡើងវិញយ៉ាងត្រឹមត្រូវ ផ្ដល់ត្រឡប់
`409` ប្រសិនបើ MCP ត្រូវបានបិទ និង `501` សម្រាប់មធ្យោបាយបញ្ជូន `stdio` (កម្មវិធីអតិថិជន stdio គ្រប់គ្រង
subprocess របស់ពួកវាផ្ទាល់ — មិនមាន handle នៅក្នុង process សម្រាប់ចាប់ផ្ដើមឡើងវិញទេ)។

## ការដឹកជញ្ជូន

ម៉ាស៊ីនបម្រើ MCP ផ្តល់ការដឹកជញ្ជូនចំនួនបី ដែលទាំងអស់ប្រើ factory `createMcpServer()` ដូចគ្នា៖

| ការដឹកជញ្ជូន      | ទីតាំង                                         | ពេលដែលគួរប្រើ                                                |
| :---------------- | :--------------------------------------------- | :----------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | ការរួមបញ្ចូលជាមួយ IDE (Claude Desktop, Cursor ជាដើម)         |
| `sse`             | `POST/GET /api/mcp/sse` តាមរយៈ `httpTransport` | កម្មវិធីភ្ញៀវ browser/agent ដែលត្រូវការស្ទ្រីមព្រឹត្តិការណ៍  |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | កម្មវិធីភ្ញៀវ HTTP ដែលមានសម័យច្រើន (header `mcp-session-id`) |

ការដឹកជញ្ជូន HTTP សកម្ម (`sse` ឬ `streamable-http`) ត្រូវបានជ្រើសដោយការកំណត់ `mcpTransport`។ ការប្តូរការដឹកជញ្ជូននឹងបិទសម័យដែលមានស្រាប់នៅលើការដឹកជញ្ជូនមួយទៀត។

### ការចូលប្រើពីចម្ងាយ (ការរំលងដោយ scope គ្រប់គ្រង)

`/api/mcp/*` ស្ថិតក្នុងកម្រិត LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — តាមលំនាំដើម មានតែម៉ាស៊ីន loopback (`localhost`, `127.0.0.1`, `::1`) ប៉ុណ្ណោះដែលអាចចូលប្រើវាបាន។ ចាប់ពី v3.8.2 កម្មវិធីភ្ញៀវដែលមិនមែនជា loopback អាចតភ្ជាប់បាន ប្រសិនបើពួកវាផ្តល់ `Authorization: Bearer <api-key>` ដែល key នោះមាន scope `manage`។ នេះគឺជាវិធីតែមួយគត់ដើម្បីចូលប្រើម៉ាស៊ីនបម្រើ MCP ពីចម្ងាយតាមរយៈ tunnel, reverse proxy ឬ hostname សាធារណៈ។

```bash
# ផ្តល់ scope គ្រប់គ្រង៖ បើកទំព័រ API Keys នៅក្នុង dashboard ហើយបិទ/បើក
# "Management Access" សម្រាប់ key នោះ ឬ POST scopes:["manage"] នៅពេលបង្កើត។

# បន្ទាប់មក តភ្ជាប់ពីកម្មវិធីភ្ញៀវ MCP ពីចម្ងាយ៖
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

key ដែលគ្មាន scope `manage` (ឬគ្មាន Bearer) នឹងត្រឡប់ `403 LOCAL_ONLY`។ prefix រួមត្រកូល `/api/cli-tools/runtime/*` ត្រូវបានកំណត់ដោយចេតនាថាមិនអាចរំលងបានទេ — សូមមើល [កម្រិត Route Guard — ករណីលើកលែងសម្រាប់ scope គ្រប់គ្រង](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)។

## ការកំណត់រចនាសម្ព័ន្ធ IDE

សូមមើល [ការកំណត់រចនាសម្ព័ន្ធម៉ាស៊ីនភ្ញៀវ MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) សម្រាប់ការរៀបចំ Claude Desktop,
Cursor, Cline និងម៉ាស៊ីនភ្ញៀវ MCP ដែលត្រូវគ្នា។

---

## ឧបករណ៍ចាំបាច់ (14) — ដំណាក់កាលទី 1

| ឧបករណ៍                          | វិសាលភាព              | សេចក្ដីពិពណ៌នា                                                                                                                                       |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | រយៈពេលដំណើរការ អង្គចងចាំ ឧបករណ៍ផ្ដាច់សៀគ្វី ដែនកំណត់អត្រា និងស្ថិតិឃ្លាំងសម្ងាត់                                                                     |
| `omniroute_list_combos`         | `read:combos`         | combo ដែលបានកំណត់រចនាសម្ព័ន្ធទាំងអស់ ព្រមទាំងយុទ្ធសាស្ត្រ (ម៉ែត្ររង្វាស់ជាជម្រើស)                                                                    |
| `omniroute_get_combo_metrics`   | `read:combos`         | ម៉ែត្ររង្វាស់ប្រតិបត្តិការសម្រាប់ combo ជាក់លាក់មួយ                                                                                                  |
| `omniroute_switch_combo`        | `write:combos`        | ធ្វើឱ្យ combo សកម្ម ឬអសកម្ម                                                                                                                          |
| `omniroute_create_combo`        | `write:combos`        | បង្កើត combo ដែលបានផ្ទៀងផ្ទាត់តាមរយៈ API របស់ combo ដែលមានស្រាប់                                                                                     |
| `omniroute_check_quota`         | `read:quota`          | កូតាដែលបានប្រើ/សរុប ភាគរយដែលនៅសល់ ពេលវេលាកំណត់ឡើងវិញ និងស្ថានភាព token                                                                               |
| `omniroute_route_request`       | `execute:completions` | ផ្ញើការបំពេញការជជែកតាមរយៈការកំណត់ផ្លូវរបស់ OmniRoute                                                                                                 |
| `omniroute_cost_report`         | `read:usage`          | របាយការណ៍ចំណាយតាមរយៈពេល (សម័យ/ថ្ងៃ/សប្ដាហ៍/ខែ)                                                                                                       |
| `omniroute_list_models_catalog` | `read:models`         | កាតាឡុកម៉ូដែលពេញលេញ ដែលមានសមត្ថភាព ស្ថានភាព និងតម្លៃ                                                                                                 |
| `omniroute_radar_catalog`       | `read:radar`          | កាតាឡុក Radar មូលដ្ឋានដែលបានចុះហត្ថលេខា; មានតម្រងអ្នកផ្ដល់សេវា/គ្រួសារជាជម្រើស                                                                       |
| `omniroute_tool_search`         | `read:tools`          | ស្វែងរកឧបករណ៍ពីកាតាឡុក MCP ដែលបានចុះឈ្មោះ                                                                                                            |
| `omniroute_web_search`          | `execute:search`      | ស្វែងរកលើបណ្ដាញតាមរយៈអ្នកផ្ដល់សេវាស្វែងរកដែលបានកំណត់រចនាសម្ព័ន្ធ។ មិនមែន X/Twitter ទេ។                                                               |
| `omniroute_x_search`            | `execute:search`      | ស្វែងរក X តាមរយៈ xAI/SuperGrok ឬជ្រើសរើស `xquik-search` សម្រាប់លទ្ធផល Xquik API។ តម្រូវឱ្យមានព័ត៌មានសម្គាល់អត្តសញ្ញាណសម្រាប់ backend ដែលបានជ្រើសរើស។ |
| `omniroute_web_fetch`           | `execute:search`      | ទាញយកមាតិកាបណ្ដាញតាមរយៈអ្នកផ្ដល់សេវាទាញយកដែលបានកំណត់រចនាសម្ព័ន្ធ                                                                                     |

## ឧបករណ៍កម្រិតខ្ពស់ (11) — ដំណាក់កាលទី 2

| ឧបករណ៍                             | វិសាលភាព                             | ការពិពណ៌នា                                                                                                               |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | ការក្លែងធ្វើការកំណត់ផ្លូវបែបសាកល្បងដោយមិនប្រតិបត្តិពិត ជាមួយមែកធាងជម្រើសបម្រុង                                           |
| `omniroute_set_budget_guard`       | `write:budget`                       | ថវិកាសម័យជាមួយសកម្មភាពបន្ថយកម្រិត/ទប់ស្កាត់/ជូនដំណឹង                                                                     |
| `omniroute_set_routing_strategy`   | `write:combos`                       | ធ្វើបច្ចុប្បន្នភាពយុទ្ធសាស្ត្របន្សំនៅពេលដំណើរការ (អាទិភាព/មានទម្ងន់/ស្វ័យប្រវត្តិ/ជាដើម)                                 |
| `omniroute_set_resilience_profile` | `write:resilience`                   | អនុវត្តការកំណត់ជាមុនសម្រាប់ភាពធន់ `aggressive` / `balanced` / `conservative`                                             |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | សាកល្បងដោយផ្ទាល់លើអ្នកផ្តល់សេវានីមួយៗក្នុងបន្សំ ដោយប្រើការហៅទៅកាន់សេវាខាងលើពិតប្រាកដ                                     |
| `omniroute_get_provider_metrics`   | `read:health`                        | ម៉ែត្រិកតាមអ្នកផ្តល់សេវា ជាមួយភាពយឺត p50/p95/p99 និងស្ថានភាព circuit breaker                                             |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | ណែនាំបន្សំតាមប្រភេទកិច្ចការ ដោយមានកម្រិតថវិកា/ភាពយឺត                                                                     |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | ពន្យល់ពីមូលហេតុដែលសំណើមួយត្រូវបានកំណត់ផ្លូវទៅកាន់អ្នកផ្តល់សេវា (កត្តាដាក់ពិន្ទុ + ជម្រើសបម្រុង)                          |
| `omniroute_get_session_snapshot`   | `read:usage`                         | រូបភាពសង្ខេបពេញលេញនៃសម័យ៖ ថ្លៃចំណាយ, token, ម៉ូដែល/អ្នកផ្តល់សេវាកំពូល, កំហុស, ឧបករណ៍ការពារថវិកា                          |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | វិនិច្ឆ័យ (និងជួសជុលដោយស្វ័យប្រវត្តិតាមជម្រើស) ភាពមិនស៊ីសង្វាក់នៃមូលដ្ឋានទិន្នន័យ ដូចជា combo refs ដែលខូច / ជួរដេកកំព្រា |
| `omniroute_sync_pricing`           | `pricing:write`                      | ធ្វើសមកាលកម្មទិន្នន័យតម្លៃពីប្រភពខាងក្រៅ (LiteLLM); គាំទ្រ `dryRun`                                                      |

## ឧបករណ៍ឃ្លាំងសម្ងាត់ (2)

| ឧបករណ៍                  | វិសាលភាព      | ការពិពណ៌នា                                                      |
| :---------------------- | :------------ | :-------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | ស្ថិតិឃ្លាំងសម្ងាត់តាមន័យ, ឃ្លាំងសម្ងាត់ prompt និង idempotency |
| `omniroute_cache_flush` | `write:cache` | សម្អាតឃ្លាំងសម្ងាត់ទូទាំងប្រព័ន្ធ ឬតាមហត្ថលេខា/ម៉ូដែល           |

## ឧបករណ៍បង្ហាប់ (13)

| ឧបករណ៍                              | វិសាលភាព            | ការពិពណ៌នា                                                                                                                          |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | ការកំណត់ការបង្ហាប់, សេចក្តីសង្ខេបវិភាគ និងស្ថិតិដែលគិតគូរពីឃ្លាំងសម្ងាត់ (រួមមានទិន្នន័យមេតា `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | កំណត់រចនាសម្ព័ន្ធរបៀបបង្ហាប់, កម្រិតចាប់ផ្តើម, អនុបាតគោលដៅ, ការរក្សាទុក system-prompt និងការបិទបើកការបង្ហាប់សេចក្តីពិពណ៌នា MCP      |
| `omniroute_set_compression_engine`  | `write:compression` | ជ្រើសរើស engine សកម្ម (off/caveman/rtk/stacked) និងកម្រិតខ្លាំងរបស់ Caveman/RTK                                                     |
| `omniroute_list_compression_combos` | `read:compression`  | រាយបញ្ជីបន្សំការបង្ហាប់ដែលមានឈ្មោះ និងខ្សែដំណើរការ engine របស់ពួកវា                                                                 |
| `omniroute_compression_combo_stats` | `read:compression`  | ការវិភាគដែលដាក់ជាក្រុមតាមបន្សំការបង្ហាប់ និង engine                                                                                 |
| `omniroute_ccr_store`               | `write:compression` | រក្សាទុកខ្លឹមសារដែលបំបែកដាច់ដោយអ្នកហៅ ក្នុងឃ្លាំង CCR ក្នុងអង្គចងចាំដែលមានកំណត់ ហើយត្រឡប់ marker មួយជាមួយឯកសារយោង `ccr://`          |
| `omniroute_ccr_retrieve`            | `read:compression`  | ទាញយកខ្លឹមសារ CCR ពេញលេញ ឬដោយប្រើរបៀប head, tail, lines, grep និង stats                                                             |
| `omniroute_ccr_inspect`             | `read:compression`  | ពិនិត្យទិន្នន័យមេតា CCR ដែលជាកម្មសិទ្ធិរបស់អ្នកហៅ ដោយមិនត្រឡប់ខ្លឹមសារ                                                              |
| `omniroute_ccr_list`                | `read:compression`  | រាយបញ្ជីទិន្នន័យមេតាដែលបែងចែកជាទំព័រ សម្រាប់ប្លុក CCR ដែលជាកម្មសិទ្ធិរបស់អ្នកហៅ                                                     |
| `omniroute_ccr_delete`              | `write:compression` | លុបប្លុក CCR ដែលជាកម្មសិទ្ធិរបស់អ្នកហៅ                                                                                              |
| `omniroute_ccr_stats`               | `read:compression`  | រាយការណ៍ការប្រើប្រាស់អង្គចងចាំតាមអ្នកហៅ, ចំនួនរាប់វដ្តជីវិត និងកម្រិតឃ្លាំង                                                         |
| `omniroute_rtk_discover`            | `read:compression`  | រកឃើញសំឡេងរំខានដែលកើតឡើងដដែលៗក្នុងគំរូលទ្ធផល RTK ដែលបានយល់ព្រមចូលរួម                                                                |
| `omniroute_rtk_learn`               | `read:compression`  | បង្កើតសេចក្តីព្រាងតម្រង RTK ដែលអាចពិនិត្យឡើងវិញបាន ពីគំរូដែលបានយល់ព្រមចូលរួម                                                        |

ធាតុ CCR មានតែក្នុងអង្គចងចាំប៉ុណ្ណោះ ហើយនឹងបាត់បង់នៅពេលចាប់ផ្តើមឡើងវិញ។ ប្លុកនីមួយៗត្រូវបានកំណត់ត្រឹម 2 MiB, principal នីមួយៗត្រឹម 16 MiB និងឃ្លាំងសរុបត្រឹម 64 MiB។ តាមលំនាំដើម ធាតុមាន TTL រយៈពេល 24 ម៉ោង (អតិបរមាប្រាំពីរថ្ងៃ)។ ការទាញយក MCP ពេញលេញត្រូវបានកំណត់ត្រឹម 256 KiB; ប្លុកធំជាងនេះនៅតែអាចប្រើបានតាមរយៈរបៀបកំណត់ជួរ និង grep។ ការរក្សាទុក, ការទាញយក, ការរាយបញ្ជី, ការពិនិត្យ, ការលុប និងស្ថិតិ ត្រូវបានបំបែកដាច់ពីគ្នាតាម principal នៃ API-key ដែលបានផ្ទៀងផ្ទាត់។ កំណត់ត្រាសវនកម្មមានតែ hash និងទិន្នន័យមេតាទំហំប៉ុណ្ណោះ មិនដែលមានខ្លឹមសារឡើយ។

`omniroute_compression_status` រាយការណ៍ការបង្ហាប់សេចក្ដីពិពណ៌នា MCP ដោយឡែកនៅក្រោម
`analytics.mcpDescriptionCompression`។ តម្លៃទាំងនោះគឺជាការប៉ាន់ស្មានទំហំ metadata សម្រាប់សេចក្ដីពិពណ៌នា
ដែលអាចរាយបញ្ជីបានរបស់ MCP (`tools`, `prompts`, `resources` និង `resourceTemplates`); វាមិនមែនជាបង្កាន់ដៃ
នៃការប្រើប្រាស់របស់ provider ទេ ហើយត្រូវបានសម្គាល់ដោយ `source: "mcp_metadata_estimate"`។

### តម្រងមែកធាងភាពងាយស្រួលប្រើប្រាស់ MCP (v3.8.0)

ដោយឡែកពីឧបករណ៍បង្ហាប់ខាងលើ OmniRoute រួមបញ្ចូលតម្រងក្រោយពេលប្រតិបត្តិ ដែល
បង្ហាប់ **លទ្ធផលឧបករណ៍** របស់ឧបករណ៍ browser/ភាពងាយស្រួលប្រើប្រាស់ MCP មុនពេលលទ្ធផលទាំងនោះត្រូវបានបញ្ជូនត្រឡប់ទៅ
agent។ តម្រងនេះមិនមែនជាឧបករណ៍ដោយខ្លួនវាទេ — វាដំណើរការដោយតម្លាភាពលើលទ្ធផលឧបករណ៍ណាមួយដែលមាន
អត្ថបទមែកធាងភាពងាយស្រួលប្រើប្រាស់ ឬ browser snapshot ដែលលម្អិតវែង (≥2000 តួអក្សរ)។

ឥរិយាបថសំខាន់ៗ៖

- បង្រួមបន្ទាត់ជាប់គ្នាដែលជាបងប្អូនក្នុងកម្រិតដូចគ្នា និងកើតឡើងដដែលៗ ≥30 បន្ទាត់ ទៅជាសេចក្ដីសង្ខេបផ្នែកដើម + ផ្នែកចុង
- រក្សាទុកយុថ្កា `[ref=eXX]` ដែល Playwright/computer-use ត្រូវការ
- កាត់អត្ថបទដែលមានទំហំធំពេក (>50,000 តួអក្សរ) ដោយតឹងរ៉ឹង ព្រមទាំងផ្ដល់គន្លឹះសម្រាប់ការរុករក
- ការសន្សំដែលរំពឹងទុក៖ **60–80%** លើទិន្នន័យ browser snapshot

ការកំណត់រចនាសម្ព័ន្ធ៖ `compression.mcpAccessibility` នៅក្នុងការកំណត់សកល (migration 056)។
ការអនុវត្ត៖ `open-sse/services/compression/engines/mcpAccessibility/`។
ឯកសារពេញលេញ៖ [ម៉ាស៊ីនបង្ហាប់ — តម្រងមែកធាងភាពងាយស្រួលប្រើប្រាស់ MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)។

សូមមើល [ម៉ាស៊ីនបង្ហាប់](../compression/COMPRESSION_ENGINES.md) និង [ការបង្ហាប់ RTK](../compression/RTK_COMPRESSION.md) សម្រាប់
គំរូការបង្ហាប់ពេលដំណើរការ ដែលគាំទ្រឧបករណ៍ទាំងនេះ។

## ឧបករណ៍ 1Proxy (3)

| ឧបករណ៍                      | វិសាលភាព       | ការពិពណ៌នា                                                                              |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | ទាញយកប្រូកស៊ីឥតគិតថ្លៃពីទីផ្សារ 1proxy (តម្រងតាមពិធីការ/ប្រទេស/គុណភាព/ចំនួនកំណត់)       |
| `omniroute_oneproxy_rotate` | `read:proxies` | ទទួលយកប្រូកស៊ីបន្ទាប់ដែលអាចប្រើបានតាមយុទ្ធសាស្ត្រ (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | ស្ថិតិក្រុមប្រូកស៊ី ស្ថានភាពធ្វើសមកាលកម្ម និងការបែងចែកតាមពិធីការ និងប្រទេស              |

## ឧបករណ៍អង្គចងចាំ (3)

កំណត់នៅក្នុង `open-sse/mcp-server/tools/memoryTools.ts`។ ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ/វិសាលភាពត្រូវបានអនុវត្តតាមរយៈខ្សែដំណើរការវិសាលភាព MCP ស្តង់ដារ។

| ឧបករណ៍                    | វិសាលភាព       | ការពិពណ៌នា                                                                           |
| :------------------------ | :------------- | :----------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | ស្វែងរកអង្គចងចាំតាមសំណួរ / ប្រភេទ / API key ដោយមានការអនុវត្តកម្រិតថវិកា token        |
| `omniroute_memory_add`    | `write:memory` | បន្ថែមធាតុអង្គចងចាំថ្មី (`factual` / `episodic` / `procedural` / `semantic`)         |
| `omniroute_memory_clear`  | `write:memory` | សម្អាតអង្គចងចាំសម្រាប់ API key ដោយអាចត្រងតាមប្រភេទ ឬត្រាពេលវេលា `olderThan` ជាជម្រើស |

## ឧបករណ៍ជំនាញ (4)

កំណត់នៅក្នុង `open-sse/mcp-server/tools/skillTools.ts`។ គាំទ្រដោយ `src/lib/skills/registry` + `src/lib/skills/executor`។

| ឧបករណ៍                        | វិសាលភាព         | ការពិពណ៌នា                                                                         |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | រាយជំនាញដែលបានចុះបញ្ជី ដោយអាចត្រងតាម API key ឈ្មោះ ឬស្ថានភាពបើកប្រើជាជម្រើស        |
| `omniroute_skills_enable`     | `write:skills`   | បើក ឬបិទជំនាញជាក់លាក់មួយតាម ID                                                     |
| `omniroute_skills_execute`    | `execute:skills` | ប្រតិបត្តិជំនាញមួយដោយប្រើទិន្នន័យបញ្ចូលដែលបានផ្តល់ ហើយត្រឡប់កំណត់ត្រាប្រតិបត្តិការ |
| `omniroute_skills_executions` | `read:skills`    | រាយប្រវត្តិប្រតិបត្តិជំនាញថ្មីៗ                                                    |

## ប្រភពបរិបទ Notion (6)

កំណត់នៅក្នុង `open-sse/mcp-server/tools/notionTools.ts`។ Token ត្រូវបានរក្សាទុកក្នុងតារាង `key_value` តាមរយៈ `src/lib/db/notion.ts`។ កម្មវិធី REST client ស្ថិតនៅក្នុង `src/lib/notion/api.ts`។ Settings API ស្ថិតនៅក្នុង `src/app/api/settings/notion/route.ts`។ ផ្ទាំងគ្រប់គ្រង UI ស្ថិតនៅក្នុង `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`។

កំណត់រចនាសម្ព័ន្ធ token សមាហរណកម្ម Notion របស់អ្នកពីផ្ទាំង **ប្រភពបរិបទ** ក្នុងផ្ទាំងគ្រប់គ្រង Endpoint ឬតាមរយៈ REST API៖

```bash
# កំណត់ token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# ពិនិត្យស្ថានភាព
curl http://localhost:20128/api/settings/notion

# ផ្តាច់ការតភ្ជាប់
curl -X DELETE http://localhost:20128/api/settings/notion
```

| ឧបករណ៍                       | វិសាលភាព       | ការពិពណ៌នា                                                          |
| :--------------------------- | :------------- | :------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | ស្វែងរកអត្ថបទពេញលេញនៅទូទាំងទំព័រ និងមូលដ្ឋានទិន្នន័យទាំងអស់         |
| `notion_get_page`            | `read:notion`  | ទទួលយកទំព័រតាម ID រួមជាមួយលក្ខណសម្បត្តិរបស់វា                       |
| `notion_list_block_children` | `read:notion`  | រាយប្លុកកូនរបស់ទំព័រ ឬប្លុក                                         |
| `notion_query_database`      | `read:notion`  | សាកសួរមូលដ្ឋានទិន្នន័យដោយប្រើតម្រង លំដាប់តម្រៀប និងការបែងចែកជាទំព័រ |
| `notion_get_database`        | `read:notion`  | ទទួលយកគ្រោងមូលដ្ឋានទិន្នន័យតាម ID                                   |
| `notion_append_blocks`       | `write:notion` | បន្ថែមប្លុកកូនទៅប្លុកមេ (អតិបរមា 100 ក្នុងមួយសំណើ)                  |

## ឧបករណ៍កាតាឡុកជំនាញភ្នាក់ងារ (3)

កំណត់នៅក្នុង `open-sse/mcp-server/tools/agentSkillTools.ts`។ គាំទ្រដោយ `src/lib/agentSkills/catalog`។ ឧបករណ៍ទាំងនេះផ្តល់ឱ្យម៉ាស៊ីនភ្ញៀវ MCP និងភ្នាក់ងារខាងក្រៅនូវសិទ្ធិចូលប្រើកាតាឡុកឯកសារជំនាញភ្នាក់ងារដែលមាន 45 ធាតុ។ វិសាលភាព៖ `read:catalog`។

| ឧបករណ៍                            | វិសាលភាព       | ការពិពណ៌នា                                                                                                                               |
| :-------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | រាយជំនាញភ្នាក់ងារទាំង 45 ជាមួយតម្រង `category` (api\|cli) និង `area` ជាជម្រើស; ត្រឡប់ទិន្នន័យមេតា + កម្រិតគ្របដណ្តប់                     |
| `omniroute_agent_skills_get`      | `read:catalog` | ទទួលយកទិន្នន័យមេតាពេញលេញ + ខ្លឹមសារ SKILL.md សម្រាប់ជំនាញតែមួយដោយប្រើ `id` ផ្លូវការ                                                      |
| `omniroute_agent_skills_coverage` | `read:catalog` | ស្ថិតិគ្របដណ្តប់៖ ចំនួនជំនាញ API 23, CLI 21 និងការកំណត់រចនាសម្ព័ន្ធ 1 ដែលមានឯកសារ SKILL.md នៅលើប្រព័ន្ធឯកសារ ធៀបនឹងចំនួនសរុបក្នុងកាតាឡុក |

សូមមើល [AGENT-SKILLS.md](./AGENT-SKILLS.md) សម្រាប់កាតាឡុកពេញលេញ និងរបៀបដែលភ្នាក់ងារខាងក្រៅប្រើប្រាស់វា។

## ក្របខណ្ឌដែលពាក់ព័ន្ធ (v3.8.0)

បញ្ជីឧបករណ៍ MCP ខាងលើ (ឧបករណ៍តែមួយគត់ចំនួន 110 ដែលគណនាដោយ `countUniqueMcpTools()`) ត្រូវបានកំណត់វិសាលភាពដោយចេតនា
សម្រាប់ប្រតិបត្តិការកំណត់ផ្លូវពេលដំណើរការ/ឃ្លាំងសម្ងាត់/ការបង្ហាប់/អង្គចងចាំ/ជំនាញ/ប្រូកស៊ី/ប្រភពបរិបទ។ ក្របខណ្ឌពាក់ព័ន្ធពីរ
ត្រូវបានចែកចាយរួមជាមួយម៉ាស៊ីនមេ MCP ក្នុង v3.8.0 ហើយត្រូវបានចងក្រងជាឯកសារដោយឡែកពីគ្នា៖

### ភ្នាក់ងារក្លោដ

ភ្នាក់ងារក្លោដគឺជាភ្នាក់ងារសរសេរកូដ AI ដែលដំណើរការក្រៅដំណើរការ (codex-cloud, cursor-cloud, devin, jules) ហើយត្រូវបានភ្ជាប់ទៅ
OmniRoute តាមរយៈគំរូការតភ្ជាប់ដូចគ្នាដែលប្រើសម្រាប់អ្នកផ្តល់សេវា LLM។ ពួកវាត្រូវបានបង្ហាញតាមរយៈ
ចំណុចប្រទាក់ REST ផ្ទាល់ខ្លួន (`/api/v1/agents/*`) និង **មិនមែន** ជាផ្នែកនៃកាតាឡុកឧបករណ៍ MCP ទេ
— ការហៅភ្នាក់ងារក្លោដមិនប្រើប្រាស់វិសាលភាព MCP ទេ។

- ការអនុវត្ត៖ `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`)។
- វដ្តជីវិត៖ `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`។
- ឯកសារ៖ [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)។

### របាំងការពារ

របាំងការពារគឺជាតម្រងមុន/ក្រោយការប្រតិបត្តិ (vision-bridge, pii-masker, prompt-injection)
ដែលត្រូវបានអនុវត្តនៅក្នុងបំពង់ជជែក។ ពួកវាដំណើរការមុនពេលទៅដល់ស្រទាប់ឧបករណ៍/ផ្លូវ MCP
និងបញ្ចេញការបំពានដែលមានរចនាសម្ព័ន្ធទៅកាន់បំពង់សវនកម្ម; ពួកវាមិនត្រូវបានហៅជាឧបករណ៍ MCP ទេ។

- ការអនុវត្ត៖ `src/lib/guardrails/`។
- ឯកសារ៖ [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)។

នៅពេលបំបាត់កំហុសការហៅ MCP ដែលហាក់ដូចជាត្រូវបានរារាំង សូមពិនិត្យទាំងកំណត់ហេតុសវនកម្ម MCP
(ធាតុ `scope_denied:*`) និងដានសវនកម្មរបាំងការពារ — សំណើមួយអាចត្រូវបានបដិសេធដោយ
របាំងការពារ **មុនពេល** វាទៅដល់ស្រទាប់អនុវត្តវិសាលភាព MCP។

---

## ចំណុចបញ្ចប់ REST API

| ចំណុចបញ្ចប់            | វិធីសាស្ត្រ           | ការពិពណ៌នា                                                                                        | ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ  |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------ | :------------------------ |
| `/api/mcp/status`      | `GET`                 | ស្ថានភាពម៉ាស៊ីនមេ៖ សញ្ញាបេះដូង ស្ថានភាពដឹកជញ្ជូន HTTP សេចក្តីសង្ខេបសកម្មភាពសវនកម្ម                | ការគ្រប់គ្រង (សម័យ/admin) |
| `/api/mcp/tools`       | `GET`                 | កាតាឡុកឧបករណ៍ (ឈ្មោះ ការពិពណ៌នា វិសាលភាព ដំណាក់កាល ចំណុចបញ្ចប់ប្រភព)                              | ការគ្រប់គ្រង              |
| `/api/mcp/sse`         | `GET` / `POST`        | ចំណុចបញ្ចប់ដឹកជញ្ជូន SSE (ត្រូវបានគ្រប់គ្រងដោយ `mcpEnabled` + `mcpTransport === "sse"`)           | សោ API + វិសាលភាព         |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | ការដឹកជញ្ជូន HTTP ដែលអាចស្ទ្រីមបាន (ប្រើបឋមកថា `mcp-session-id`; `DELETE` បញ្ចប់សម័យ)             | សោ API + វិសាលភាព         |
| `/api/mcp/audit`       | `GET`                 | ធាតុកំណត់ហេតុសវនកម្មពី `mcp_tool_audit` (តម្រង៖ `limit`, `offset`, `tool`, `success`, `apiKeyId`) | ការគ្រប់គ្រង              |
| `/api/mcp/audit/stats` | `GET`                 | ស្ថិតិសវនកម្មសរុប (`totalCalls`, `successRate`, `avgDurationMs`, ឧបករណ៍កំពូល)                     | ការគ្រប់គ្រង              |

ឯកសារប្រភព៖ `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`។

ទាំងការដឹកជញ្ជូន SSE និង HTTP ដែលអាចស្ទ្រីមបាន ត្រូវបានរារាំងរហូតដល់ម៉ាស៊ីនមេ MCP ត្រូវបានបើកនៅក្នុងការកំណត់ (`mcpEnabled`) ហើយ `mcpTransport` ដែលសមស្របត្រូវបានជ្រើសរើស។ ប្រសិនបើការដឹកជញ្ជូនខុសត្រូវបានកំណត់រចនាសម្ព័ន្ធ ផ្លូវនឹងត្រឡប់ HTTP 400 ជាមួយការណែនាំឱ្យប្តូរការកំណត់។

---

## ការផ្ទៀងផ្ទាត់អត្តសញ្ញាណ និងវិសាលភាព

ឧបករណ៍ MCP ត្រូវបានផ្ទៀងផ្ទាត់អត្តសញ្ញាណតាមរយៈវិសាលភាពនៃ API key។ ការអនុវត្តវិសាលភាពត្រូវបានគ្រប់គ្រងជាចំណុចកណ្ដាលនៅក្នុង
`open-sse/mcp-server/scopeEnforcement.ts`។ ឧបករណ៍នីមួយៗតម្រូវឱ្យមានវិសាលភាពជាក់លាក់៖

| វិសាលភាព              | ឧបករណ៍                                                                                                                                                                      |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                           |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                   |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                      |
| `read:quota`          | `check_quota`                                                                                                                                                               |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                      |
| `read:models`         | `list_models_catalog`                                                                                                                                                       |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                               |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                       |
| `write:budget`        | `set_budget_guard`                                                                                                                                                          |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                 |
| `pricing:write`       | `sync_pricing`                                                                                                                                                              |
| `read:cache`          | `cache_stats`                                                                                                                                                               |
| `write:cache`         | `cache_flush`                                                                                                                                                               |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                  |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                           |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                       |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                            |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                      |
| `read:memory`         | `memory_search`                                                                                                                                                             |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                          |
| `write:skills`        | `skills_enable`                                                                                                                                                             |
| `execute:skills`      | `skills_execute`                                                                                                                                                            |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                            |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                     |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                   |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                            |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                              |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                          |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                             |
| `read:obsidian`       | ឧបករណ៍អាន 13 — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | ឧបករណ៍សរសេរ 9 — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …              |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                           |

វិសាលភាពបែប wildcard ត្រូវបានគាំទ្រ៖ `read:*` ផ្តល់វិសាលភាពអានទាំងអស់ ហើយ `*` ផ្តល់សិទ្ធិចូលប្រើពេញលេញ។

### `mcp:connect` — សមត្ថភាព route មានកម្រិតជាក់លាក់ (#7895)

ការចូលដល់ HTTP/SSE MCP transport (`/api/mcp/*`) ពី non-loopback តម្រូវឱ្យមាន
ករណីលើកលែង LOCAL_ONLY សម្រាប់ `/api/mcp/` (សូមមើល `docs/security/ROUTE_GUARD_TIERS.md`)។ ជាប្រវត្តិសាស្ត្រ
ករណីលើកលែងនោះទទួលយកតែ API key ដែលមានវិសាលភាព `manage`/`admin` ពេញលេញប៉ុណ្ណោះ — ដែលទូលំទូលាយពេកសម្រាប់
អ្នកហៅដែលគ្រាន់តែត្រូវការទំនាក់ទំនងជាមួយ MCP។ ឥឡូវនេះ `src/shared/constants/managementScopes.ts`
នាំចេញ `MCP_CONNECT_SCOPE = "mcp:connect"`៖ ជាវិសាលភាពបន្ថែមដែលមានកម្រិតជាក់លាក់ (អនុវត្តតាមគំរូដូចគ្នានឹង
`SELF_USAGE_SCOPE`) ដែលផ្តល់សិទ្ធិអនុញ្ញាតតែចំពោះការឆ្លងកាត់ `/api/mcp/` នៅក្នុង
`src/server/authz/policies/management.ts` ប៉ុណ្ណោះ — វាមិនផ្តល់សិទ្ធិចូលប្រើ management-route ផ្សេងទៀតទេ
ហើយត្រូវបានរក្សាទុកដោយចេតនានៅខាងក្រៅ `MANAGEMENT_API_KEY_SCOPES`។ Key ដែលមាន `manage`/`admin`
នៅតែអាចឆ្លងកាត់ករណីលើកលែងនេះដូចមុនដោយមិនផ្លាស់ប្តូរ។ `mcp:connect` គឺជាជម្រើសដែលមានសិទ្ធិទាបជាងសម្រាប់
អ្នកហៅពីចម្ងាយដែលប្រើតែ MCP ហើយត្រូវបានពិនិត្យតាមរយៈ `hasMcpConnectOrManageScope()`។

### ការចងវិសាលភាព HTTP តាម key នីមួយៗ (#7895)

តាមរយៈ HTTP/SSE ឥឡូវនេះ `open-sse/mcp-server/httpTransport.ts` ដោះស្រាយ
`api_keys.scopes` ពិតប្រាកដរបស់អ្នកហៅតាមរយៈ `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
ហើយបញ្ជូនវាទៅ `transport.handleRequest(req, { authInfo })` របស់ MCP SDK ដូច្នេះ
`extra.authInfo.scopes` ដែលទៅដល់ការហៅ tool នីមួយៗ ឆ្លុះបញ្ចាំងពីវិសាលភាពផ្ទាល់របស់ Bearer key។
`resolveCallerScopeContext()` របស់ `scopeEnforcement.ts` បានផ្តល់អាទិភាពដល់ `authInfo` លើ
fallback របស់ `_meta` និង env `OMNIROUTE_MCP_SCOPES` រួចហើយ — ការផ្លាស់ប្តូរនេះគ្រាន់តែបំពេញទិន្នន័យទៅក្នុងប្រភពទីមួយ
ដែលមានអាទិភាពខ្ពស់បំផុតនោះប៉ុណ្ណោះ ដែលពីមុនមិនត្រូវបានផ្គត់ផ្គង់តាម HTTP។ នៅពេលមិនអាចដោះស្រាយ API key បាន
(គ្មាន header ឬ key មិនត្រឹមត្រូវ) `authInfo` នៅតែជា `undefined` ហើយការដោះស្រាយនឹងបន្តទៅតាម
ខ្សែ fallback `meta`/env ដែលមានស្រាប់ដោយមិនផ្លាស់ប្តូរ។ ការផ្លាស់ប្តូរនេះមិនប្តូរតម្លៃលំនាំដើមរបស់ `OMNIROUTE_MCP_ENFORCE_SCOPES`
ទេ — ការអនុវត្តវិសាលភាពនៅតែត្រូវបើកយ៉ាងច្បាស់លាស់។ ការផ្លាស់ប្តូរនេះគ្រាន់តែធ្វើឱ្យផ្លូវតាម key នីមួយៗ
មានអាទិភាព នៅពេលការអនុវត្តត្រូវបានបើក។ stdio មិនមានអត្តសញ្ញាណអ្នកហៅនីមួយៗទេ (សូមមើល
`mcpCallerIdentity.ts`) ហើយមិនរងផលប៉ះពាល់ឡើយ — វានៅតែប្រើខ្សែ fallback `_meta`/env ដដែល។

---

## អថេរបរិស្ថាន

| អថេរ                                    | លំនាំដើម                                  | គោលបំណង                                                                                                                        |
| :-------------------------------------- | :---------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                  | URL មូលដ្ឋានដែលម៉ាស៊ីនមេ MCP ប្រើនៅពេលហៅ API ផ្ទៃក្នុងរបស់ OmniRoute                                                           |
| `OMNIROUTE_API_KEY`                     | (ទទេ)                                     | API key ដែលត្រូវបានបញ្ជូនបន្តជា `Authorization: Bearer` ទៅកាន់ការហៅ API ផ្ទៃក្នុង                                              |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (មានតែ `"true"` ប៉ុណ្ណោះដែលបើកវា) | នៅពេលបើក scope ដែលខ្វះនឹងបដិសេធការហៅឧបករណ៍ ហើយកត់ត្រា `scope_denied:<reason>` ក្នុងកំណត់ហេតុសវនកម្ម                            |
| `OMNIROUTE_MCP_SCOPES`                  | (ទទេ)                                     | បញ្ជីអនុញ្ញាតនៃ scope ដែលបំបែកដោយសញ្ញាក្បៀស និងត្រូវបានចាត់ទុកថា "មាន" តាមលំនាំដើម (ប្រើនៅពេលអ្នកហៅមិនផ្ដល់ scope ផ្ទាល់ខ្លួន) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (មិនបានកំណត់ = បើក)                       | នៅពេលកំណត់ជា `0/false/off/no` វានឹងបិទការបង្ហាប់សេចក្ដីពិពណ៌នា MCP នៅពេលចុះបញ្ជី                                               |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (មិនបានកំណត់ = បើក)                       | ឈ្មោះជំនួសសម្រាប់ការបិទបើកដូចគ្នាខាងលើ                                                                                         |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                   | ថិរវេលាអតិបរមាមុនបោះបង់សម្រាប់ការអានគ្រប់គ្រងផ្ទៃក្នុង (សុខភាព ភាពធន់ បន្សំ កូតា ការប្រើប្រាស់)                                |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                   | ថិរវេលាអតិបរមាមុនបោះបង់សម្រាប់ដំណាក់កាលដែលរង់ចាំអ្នកផ្ដល់សេវា (`route_request`, `web_search`, `web_fetch`)                     |
| `MCP_TOOL_DENY`                         | (មិនបានកំណត់ = គ្មានតម្រង)                | ឈ្មោះឧបករណ៍ដែលបំបែកដោយសញ្ញាក្បៀស ដើម្បីដកចេញពី `tools/list` (ការកាត់បន្ថយចំនួនប្រភេទឧបករណ៍ — សូមមើលខាងក្រោម)                   |
| `MCP_TOOL_ALLOW`                        | (មិនបានកំណត់ = គ្មានតម្រង)                | ឈ្មោះឧបករណ៍ដែលបំបែកដោយសញ្ញាក្បៀស ដើម្បីរក្សាទុកតែឧបករណ៍ទាំងនោះ (របៀបបញ្ជីអនុញ្ញាត — សូមមើលខាងក្រោម)                            |
| `DATA_DIR`                              | `~/.omniroute`                            | ឯកសារសញ្ញាបញ្ជាក់ថាប្រព័ន្ធនៅដំណើរការត្រូវបានសរសេរទៅ `${DATA_DIR}/runtime/mcp-heartbeat.json`                                  |

---

## ការបង្ហាប់សេចក្ដីពិពណ៌នា

បញ្ជីចុះឈ្មោះឧបករណ៍ prompt និងធនធានរបស់ MCP អាចបង្ហាប់សេចក្ដីពិពណ៌នានៅពេលចុះបញ្ជី/រាយបញ្ជី ដើម្បីកាត់បន្ថយទំហំ metadata ដែលបង្ហាញទៅកាន់ client (ហើយដូច្នេះកាត់បន្ថយការចំណាយលើបរិបទ prompt)។ ការអនុវត្តស្ថិតនៅក្នុង `open-sse/mcp-server/descriptionCompressor.ts` ហើយត្រូវបានតភ្ជាប់ទៅម៉ាស៊ីនមេ MCP តាមរយៈ `compressMcpRegistryMetadata` នៅខាងក្នុង `createMcpServer()`។

- ការបង្ហាប់ដំណើរការលើអត្ថបទសេចក្ដីពិពណ៌នា ដោយប្រើសំណុំច្បាប់ Caveman (`getRulesForContext("all", "full")`) ជាមួយនឹងការស្រង់ប្លុកដែលត្រូវរក្សាទុក (ចន្លោះកូដ ប្លុកដែលមានរបង ជាដើម) ដូច្នេះខ្លឹមសាររចនាសម្ព័ន្ធមិនត្រូវបានកែប្រែឡើយ។
- បិទបើកតាមការដាក់ពង្រាយនីមួយៗ តាមរយៈតម្លៃ `compression.mcpDescriptionCompressionEnabled` ក្នុងតារាងការកំណត់ `key_value` (លំនាំដើម៖ បើក) — បង្ហាញក្នុង UI ជា **ការវិភាគ → ការបង្ហាប់សេចក្ដីពិពណ៌នា MCP**។
- បិទបើកទូទាំង process តាមរយៈ `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ឬ `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`។
- ស្ថិតិពេលជាក់ស្ដែងត្រូវបានបង្ហាញតាមរយៈ `omniroute_compression_status` ក្រោម `analytics.mcpDescriptionCompression` និងដាក់ស្លាក `source: "mcp_metadata_estimate"` ដើម្បីបែងចែកពីបង្កាន់ដៃការប្រើប្រាស់ជាក់ស្ដែងរបស់អ្នកផ្ដល់សេវា។

---

## ការកាត់បន្ថយចំនួន Tool (F4.3)

ការបង្រួមសេចក្ដីពិពណ៌នាកាត់បន្ថយ metadata របស់ tool នីមួយៗ។ ចំណែកឯ **ការកាត់បន្ថយចំនួន tool** ឈានមួយជំហានបន្ថែមទៀត ដោយកាត់បន្ថយ _ចំនួន_ tool ដែលត្រូវបានប្រកាសទាំងស្រុង។ ការផ្សព្វផ្សាយ tool តិចជាងមុននៅក្នុង manifest `tools/list` កាត់បន្ថយថ្លៃ token ក្នុងមួយ request ដែល model របស់ client ត្រូវចំណាយសម្រាប់កាតាឡុក tool (ការបង្រួម "layer 5")។ ការអនុវត្តនេះគឺជា filter សុទ្ធសាធ និងមិនរក្សាទុក state នៅក្នុង `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) ដែលត្រូវបានភ្ជាប់ទៅក្នុង registration loop នៅក្នុង `createMcpServer()` (`open-sse/mcp-server/server.ts`)។

**ត្រូវបើកប្រើដោយចេតនា ហើយតាមលំនាំដើមវាត្រូវបានបិទ។** Filter ដំណើរការតែនៅពេល environment variable យ៉ាងហោចណាស់មួយក្នុងចំណោមពីរត្រូវបានកំណត់ប៉ុណ្ណោះ។ ប្រសិនបើមិនមាន variable ទាំងពីរត្រូវបានកំណត់ទេ tool ទាំង 110 នឹងត្រូវបានប្រកាសដោយគ្មានការផ្លាស់ប្ដូរ។

| Variable         | របៀប                                                                                                                      |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | បញ្ជីហាមឃាត់ — ឈ្មោះ tool ដែលបំបែកដោយសញ្ញាក្បៀស ហើយតែងតែត្រូវបានដកចេញពី `tools/list`                                      |
| `MCP_TOOL_ALLOW` | បញ្ជីអនុញ្ញាត — ឈ្មោះ tool ដែលបំបែកដោយសញ្ញាក្បៀស។ មានតែ tool ទាំងនេះប៉ុណ្ណោះដែលត្រូវរក្សាទុក រីឯអ្វីផ្សេងទៀតត្រូវបានដកចេញ |

`deny` មានអាទិភាពលើ `allow`។ ឈ្មោះត្រូវបានបំបែកដោយសញ្ញាក្បៀស កាត់ដកចន្លោះនៅខាងមុខនិងខាងក្រោយ ហើយធាតុទទេត្រូវបានមិនអើពើ។ ឧទាហរណ៍៖

```bash
# ដក tool ពីរចេញពីកាតាឡុក
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# ប្រកាសតែ tool សម្រាប់ routing និង quota ប៉ុណ្ណោះ (របៀបបញ្ជីអនុញ្ញាត)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**របៀបដែល tool ដែលបាន filter ត្រូវបានដកចេញ៖** ការចុះឈ្មោះតែងតែជោគជ័យ។ បន្ទាប់មក tool ដែល profile បដិសេធនឹងត្រូវបាន `.disable()` នៅលើ handle របស់ MCP SDK ដូច្នេះវាមិនបង្ហាញនៅក្នុង `tools/list` ទេ ប៉ុន្តែការតភ្ជាប់នៅតែរក្សាដដែល (អាចបើក/បិទបានយ៉ាងស្អាត ដោយមិនចាំបាច់ចុះឈ្មោះឡើងវិញ)។ Profile parser គឺ `readMcpToolProfileFromEnv(process.env)` ដែលត្រឡប់ `null` (គ្មានការធ្វើ filtering) នៅពេល variable ទាំងពីរទទេ។

ទម្រង់ `ToolProfile` ដែលមានលក្ខណៈសម្បូរបែបជាងនេះនៅពីក្រោយ `reduceToolManifest` ក៏គាំទ្រការ filtering តាមចំណុចប្រសព្វនៃ scope (`allowScopes` ជាមួយ wildcard matching បែប `read:*`) និងដែនកំណត់ `maxTools` ដែលមានលទ្ធផលកំណត់ច្បាស់លាស់ផងដែរ។ ប៉ុន្តែការកំណត់ទាំងពីរនេះត្រូវការ manifest ពេញលេញនៅពេលចុះឈ្មោះ ហើយបច្ចុប្បន្ន **មិន** ត្រូវបានបង្ហាញឱ្យកំណត់តាម environment variable ទេ (hook នៅកម្រិត `tools/list` គឺជាការងារបន្តដែលបានកត់ត្រាទុក)។ `estimateManifestTokens()` អាចប្រើបានសម្រាប់ប្រៀបធៀបថ្លៃ token របស់ manifest មុន និងក្រោយការកាត់បន្ថយ។

---

## Runtime Heartbeat

Transport stdio រក្សាទុកស្ថានភាពដំណើរការទៅក្នុង `${DATA_DIR}/runtime/mcp-heartbeat.json` រៀងរាល់ 5 វិនាទី។ Dashboard (`/api/mcp/status`) អាន file នេះរួមជាមួយស្ថានភាពដំណើរការរបស់ PID ដើម្បីកំណត់តម្លៃ `online`។ ចំណែក HTTP transport រាយការណ៍ស្ថានភាពពី `getMcpHttpStatus()` ក្នុង process ជំនួសវិញ (មិនសរសេរ file ទេ)។

Snapshot របស់ heartbeat មាន៖

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## ការកត់ត្រាសវនកម្ម

រាល់ការហៅ tool ត្រូវបានកត់ត្រាទៅកាន់តារាង SQLite `mcp_tool_audit` ដោយ `open-sse/mcp-server/audit.ts`៖

- ឈ្មោះ tool, arguments (ត្រូវបាន hash/កាត់ឱ្យខ្លីតាម `auditLevel` របស់ tool នីមួយៗ), លទ្ធផល
- រយៈពេលគិតជា ms, សញ្ញាសម្គាល់ជោគជ័យ/បរាជ័យ, សារកំហុស (នៅពេលមាន)
- Hash របស់ API key, timestamp
- ការបដិសេធ scope ត្រូវបានកត់ត្រាជា `scope_denied:<reason>` រួមជាមួយបញ្ជី scope ដែលខ្វះ

ប្រើ dashboard ឬ REST endpoint `/api/mcp/audit` និង `/api/mcp/audit/stats` ដើម្បីពិនិត្យមើលការហៅថ្មីៗ។

---

## ឯកសារ

| ឯកសារ                                                                    | គោលបំណង                                                                      |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Factory របស់ម៉ាស៊ីនមេ MCP, ចំណុចចូល stdio និងការចុះឈ្មោះឧបករណ៍តាមវិសាលភាព    |
| `open-sse/mcp-server/httpTransport.ts`                                   | ការដឹកជញ្ជូន SSE + Streamable HTTP (ការគ្រប់គ្រងសម័យ)                        |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | ការវាយតម្លៃវិសាលភាពឧបករណ៍ និងការកំណត់អត្តសញ្ញាណអ្នកហៅ                        |
| `open-sse/mcp-server/audit.ts`                                           | ការកត់ត្រាសវនកម្មការហៅឧបករណ៍ (`mcp_tool_audit`)                              |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | កម្មវិធីសរសេរ heartbeat របស់ stdio (`mcp-heartbeat.json`)                    |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | ការបង្ហាប់សេចក្ដីពិពណ៌នាសម្រាប់បញ្ជីឧបករណ៍ / prompt / ធនធាន                  |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Schema របស់ Zod + បញ្ជីឧបករណ៍ (`MCP_TOOLS`, 45 ធាតុ)                         |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | កម្មវិធីដោះស្រាយឧបករណ៍ដំណាក់កាលទី 2 + cache + 1proxy                         |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | កម្មវិធីដោះស្រាយឧបករណ៍បង្ហាប់                                                |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | និយមន័យឧបករណ៍អង្គចងចាំ (3 ឧបករណ៍)                                            |
| `open-sse/mcp-server/tools/skillTools.ts`                                | និយមន័យឧបករណ៍ជំនាញ (4 ឧបករណ៍)                                                |
| `open-sse/mcp-server/tools/notionTools.ts`                               | និយមន័យឧបករណ៍ប្រភពបរិបទ Notion (6 ឧបករណ៍)                                    |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | និយមន័យឧបករណ៍ល្បែងូបនីយកម្ម (8 ឧបករណ៍)                                       |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | ឧបករណ៍ចុះឈ្មោះ និងគ្រប់គ្រង Plugin (8 ឧបករណ៍)                                |
| `src/app/api/mcp/status/route.ts`                                        | Endpoint `/api/mcp/status`                                                   |
| `src/app/api/mcp/tools/route.ts`                                         | Endpoint `/api/mcp/tools`                                                    |
| `src/app/api/mcp/sse/route.ts`                                           | Route ដឹកជញ្ជូន SSE `/api/mcp/sse`                                           |
| `src/app/api/mcp/stream/route.ts`                                        | Route ដឹកជញ្ជូន Streamable HTTP `/api/mcp/stream`                            |
| `src/app/api/mcp/audit/route.ts`                                         | សំណួរទិន្នន័យកំណត់ហេតុសវនកម្ម `/api/mcp/audit`                               |
| `src/app/api/mcp/audit/stats/route.ts`                                   | ម៉ែត្រិកសវនកម្មសរុប `/api/mcp/audit/stats`                                   |
| `src/lib/notion/api.ts`                                                  | Client របស់ Notion REST API (ការព្យាយាមឡើងវិញ, អស់ពេល និងការចាត់ថ្នាក់កំហុស) |
| `src/lib/db/notion.ts`                                                   | ការរក្សាទុកថូខឹន Notion (`key_value` table)                                  |
| `src/app/api/settings/notion/route.ts`                                   | API ការកំណត់ Notion (GET/POST/DELETE)                                        |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI សម្រាប់គ្រប់គ្រងថូខឹន Notion                                              |
| `tests/unit/notion-api.test.ts`                                          | ការធ្វើតេស្ត Client របស់ Notion API (7)                                      |
| `tests/unit/notion-tools.test.ts`                                        | ការធ្វើតេស្តការអនុវត្តវិសាលភាពឧបករណ៍ Notion (10)                             |
| `tests/unit/db/notion.test.mjs`                                          | ការធ្វើតេស្តម៉ូឌុល DB របស់ Notion (3)                                        |
