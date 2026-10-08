# OmniRoute MCP Server Documentation (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> በራውቲንግ፣ ካሽ፣ መጭመቅ፣ ማህደረ ትውስታ፣ ክህሎቶች፣ ፕሮክሲ፣ ፑል፣ Radar እና የአውድ ምንጭ ክዋኔዎች ዙሪያ 110 መሣሪያዎች ያሉት Model Context Protocol ሰርቨር።
>
> ትክክለኛው የመረጃ ምንጭ፦ `open-sse/mcp-server/server.ts` በ`countUniqueMcpTools()` አማካኝነት **110 ልዩ መሣሪያዎችን** ያሰላል፦ 45 መደበኛ ትርጓሜዎች (ስድስቱን የCCR የሕይወት ዑደት መሣሪያዎች፣ የagent-skills ሶስትዮሽ፣ `omniroute_radar_catalog` እና `omniroute_x_search` ጨምሮ)፣ እንዲሁም ማህደረ ትውስታ (3)፣ ክህሎቶች (4)፣ GitHub ክህሎቶች (3)፣ ፑል (6)፣ የጨዋታ ባህሪያት (8)፣ ተሰኪዎች (8)፣ Notion (6)፣ Obsidian (22)፣ የአካባቢ ኮርፐስ (3) እና ለRTK ብቻ የሆኑ ሁለት የመጭመቂያ መሣሪያዎች።

## መጫን

OmniRoute MCP አብሮ የተካተተ ነው። በሚከተለው ያስጀምሩት፦

```bash
omniroute --mcp
```

ወይም በ open-sse ማጓጓዣ፦

```bash
# HTTP የዥረት ማጓጓዣ (ወደብ 20130)
omniroute --dev  # MCP በ /mcp መጨረሻ ነጥብ ላይ በራስ-ሰር ይጀምራል
```

የHTTP ማጓጓዣዎቹ (`sse` / `streamable-http`፣ በዳሽቦርድ ሰርቨሩ ሂደት ውስጥ የሚቀርቡ) በነባሪነት
የተሰናከሉ ሲሆኑ፣ ከዚህ ቀደም ሊበሩና ሊጠፉ የሚችሉት ከ`/dashboard/mcp` ገጽ ብቻ ነበር። ከ v3.8.51
ጀምሮ CLI ተመሳሳይ ችሎታ አለው፦

```bash
omniroute mcp status                                  # የነቃ/መስመር ላይ፣ ማጓጓዣ፣ የመሣሪያዎች ብዛት
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # ንቁ የ sse/streamable-http ክፍለ-ጊዜዎችን ዳግም ያስጀምራል
```

`mcp enable`/`mcp disable` ዳሽቦርዱ በ`/api/settings` በኩል የሚያበራውንና የሚያጠፋውን ተመሳሳይ `mcpEnabled`
(እንደ አማራጭ `mcpTransport`ንም) ቅንብር PATCH ያደርጋሉ። `mcp restart` `POST /api/mcp/restart`ን ይጠራል፦ ቀጣዩ
ጥያቄ ከንጹሕ ሁኔታ ዳግም እንዲጀምር ንቁ የ`sse`/`streamable-http` ክፍለ-ጊዜዎችን ያቋርጣል፣
MCP ከተሰናከለ `409`ን፣ ለ`stdio` ማጓጓዣ ደግሞ `501`ን ይመልሳል (የstdio ደንበኞች የራሳቸውን
ንዑስ ሂደት ያስተዳድራሉ — ዳግም ለማስጀመር በሂደት ውስጥ ያለ መያዣ የለም)።

## ማጓጓዣዎች

የMCP ሰርቨሩ ሦስት ማጓጓዣዎችን ያቀርባል፤ ሁሉም በተመሳሳዩ `createMcpServer()` ፋብሪካ የሚደገፉ ናቸው፦

| ማጓጓዣ              | የሚገኝበት ቦታ                                    | መቼ እንደሚጠቀሙበት                                  |
| :---------------- | :------------------------------------------- | :-------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | የIDE ውህደቶች (Claude Desktop፣ Cursor፣ ወዘተ)      |
| `sse`             | `POST/GET /api/mcp/sse` በ`httpTransport` በኩል | የክስተት ዥረት ለሚያስፈልጋቸው የአሳሽ/ወኪል ደንበኞች            |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | ባለብዙ-ክፍለ ጊዜ HTTP ደንበኞች (`mcp-session-id` ራስጌ) |

ገቢር የHTTP ማጓጓዣው (`sse` ወይም `streamable-http`) በ`mcpTransport` ቅንብር ይመረጣል። ማጓጓዣዎችን መቀየር በሌላው ማጓጓዣ ላይ ያሉ ክፍት ክፍለ ጊዜዎችን ይዘጋል።

### የርቀት መዳረሻ (`manage` ወሰንን ማለፍ)

`/api/mcp/*` በLOCAL_ONLY ደረጃ (`src/server/authz/routeGuard.ts`) ውስጥ ነው—በነባሪነት የloopback አስተናጋጆች (`localhost`፣ `127.0.0.1`፣ `::1`) ብቻ ሊደርሱበት ይችላሉ። ከv3.8.2 ጀምሮ፣ የ`manage` ወሰን ያለው ቁልፍ የያዘ `Authorization: Bearer <api-key>` ካቀረቡ የloopback ያልሆኑ ደንበኞች መገናኘት ይችላሉ። በዋሻ፣ reverse proxy ወይም ይፋዊ hostname በኩል የርቀት MCP ሰርቨሩን ለመድረስ ይህ ብቸኛው መንገድ ነው።

```bash
# የmanage ወሰን ይስጡ፦ የዳሽቦርዱን API Keys ገጽ ከፍተው
# በቁልፉ ላይ "Management Access"ን ያብሩ፣ ወይም ሲፈጥሩ POST scopes:["manage"] ያድርጉ።

# ከዚያ ከርቀት MCP ደንበኛ ይገናኙ፦
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

የ`manage` ወሰን የሌለው ቁልፍ (ወይም Bearer አለመኖር) `403 LOCAL_ONLY`ን ይመልሳል። ጎን ለጎን ያለው ቅድመ ቅጥያ `/api/cli-tools/runtime/*` ሆን ተብሎ ሊታለፍ የማይችል ነው—[የRoute Guard ደረጃዎች — የ`manage` ወሰን ልዩ ሁኔታ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)ን ይመልከቱ።

## IDE ውቅረት

ለClaude Desktop፣ Cursor፣ Cline እና ተኳኋኝ MCP ደንበኞች ማዋቀሪያ [MCP ደንበኛ ውቅረት](../guides/SETUP_GUIDE.md#mcp-client-configuration)ን ይመልከቱ።

---

## አስፈላጊ መሣሪያዎች (14) — ደረጃ 1

| መሣሪያ                            | የፈቃድ ወሰኖች             | መግለጫ                                                                                                              |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | የሥራ ጊዜ፣ ማህደረ ትውስታ፣ የወረዳ ማቋረጫዎች፣ የፍጥነት ገደቦች፣ የመሸጎጫ ስታቲስቲክስ                                                         |
| `omniroute_list_combos`         | `read:combos`         | ሁሉም የተዋቀሩ combos ከስልቶቻቸው ጋር (አማራጭ መለኪያዎች)                                                                         |
| `omniroute_get_combo_metrics`   | `read:combos`         | ለአንድ የተወሰነ combo የአፈጻጸም መለኪያዎች                                                                                    |
| `omniroute_switch_combo`        | `write:combos`        | comboን ማንቃት ወይም ማቦዘን                                                                                              |
| `omniroute_create_combo`        | `write:combos`        | ነባሩን combo API በመጠቀም የተረጋገጠ combo መፍጠር                                                                            |
| `omniroute_check_quota`         | `read:quota`          | ጥቅም ላይ የዋለ/ጠቅላላ ኮታ፣ የቀረው መቶኛ፣ የዳግም ማስጀመሪያ ጊዜ፣ የቶከን ጤንነት                                                           |
| `omniroute_route_request`       | `execute:completions` | የውይይት ማጠናቀቂያ ጥያቄን በOmniRoute ማዘዋወሪያ በኩል መላክ                                                                       |
| `omniroute_cost_report`         | `read:usage`          | በጊዜ ወቅት (ክፍለ ጊዜ/ቀን/ሳምንት/ወር) የተከፋፈለ የወጪ ሪፖርት                                                                       |
| `omniroute_list_models_catalog` | `read:models`         | ችሎታዎችን፣ ሁኔታን እና ዋጋን ያካተተ ሙሉ የሞዴል ካታሎግ                                                                             |
| `omniroute_radar_catalog`       | `read:radar`          | በአካባቢው ያለ የተፈረመ Radar ካታሎግ፤ አማራጭ የአቅራቢ/ቤተሰብ ማጣሪያዎች                                                                |
| `omniroute_tool_search`         | `read:tools`          | ከተመዘገበው MCP ካታሎግ መሣሪያዎችን ማግኘት                                                                                     |
| `omniroute_web_search`          | `execute:search`      | በተዋቀሩ የፍለጋ አቅራቢዎች በኩል ድርን መፈለግ። X/Twitterን አያካትትም።                                                                |
| `omniroute_x_search`            | `execute:search`      | Xን በxAI/SuperGrok በኩል መፈለግ፣ ወይም የXquik API ውጤቶችን ለማግኘት `xquik-search`ን መምረጥ። ለተመረጠው backend የመግቢያ ማረጋገጫዎች ያስፈልጋሉ። |
| `omniroute_web_fetch`           | `execute:search`      | በተዋቀሩ የይዘት ሰርስሮ ማምጫ አቅራቢዎች በኩል የድር ይዘትን ማምጣት                                                                      |

## የላቁ መሣሪያዎች (11) — ደረጃ 2

| መሣሪያ                               | የፈቃድ ወሰኖች                            | መግለጫ                                                                                    |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | ከአማራጭ የመውደቂያ ዛፍ ጋር ትዕዛዞችን ሳያስፈጽም የማዞሪያ ማስመሰል                                            |
| `omniroute_set_budget_guard`       | `write:budget`                       | የክፍለ ጊዜ በጀት ከ degrade/block/alert እርምጃ ጋር                                               |
| `omniroute_set_routing_strategy`   | `write:combos`                       | በሂደት ጊዜ የጥምረት ስልትን ያዘምኑ (priority/weighted/auto/etc.)                                   |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` የመቋቋም ችሎታ ቅድመ-ቅንብርን ይተግብሩ                    |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | እውነተኛ upstream ጥሪን በመጠቀም በአንድ ጥምረት ውስጥ ያለውን እያንዳንዱን አቅራቢ በቀጥታ ይፈትሹ                      |
| `omniroute_get_provider_metrics`   | `read:health`                        | ለእያንዳንዱ አቅራቢ p50/p95/p99 መዘግየትን እና የወረዳ ሰባሪ ሁኔታን የሚያካትቱ መለኪያዎች                          |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | ከበጀት/መዘግየት ገደቦች ጋር በተግባር ዓይነት መሠረት ጥምረትን ይምከሩ                                           |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | አንድ ጥያቄ ለአቅራቢ ለምን እንደተዘዋወረ ያብራሩ (የውጤት አሰጣጥ ምክንያቶች + አማራጭ የመውደቂያ መንገዶች)                  |
| `omniroute_get_session_snapshot`   | `read:usage`                         | ሙሉ የክፍለ ጊዜ ቅጽበታዊ እይታ፦ ወጪ፣ ቶከኖች፣ ዋና ሞዴሎች/አቅራቢዎች፣ ስህተቶች፣ የበጀት ጠባቂ                         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | እንደ የተበላሹ የጥምረት ማጣቀሻዎች / ወላጅ አልባ ረድፎች ያሉ የውሂብ ጎታ መዛባቶችን ይመርምሩ (እና እንደ አማራጭ በራስ-ሰር ይጠግኑ) |
| `omniroute_sync_pricing`           | `pricing:write`                      | የዋጋ ውሂብን ከውጫዊ ምንጮች (LiteLLM) ያመሳስሉ፤ `dryRun`ን ይደግፋል                                     |

## የመሸጎጫ መሣሪያዎች (2)

| መሣሪያ                    | የፈቃድ ወሰኖች     | መግለጫ                                           |
| :---------------------- | :------------ | :--------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | የትርጉማዊ መሸጎጫ፣ የጥያቄ መሸጎጫ እና የidempotency ስታቲስቲክስ |
| `omniroute_cache_flush` | `write:cache` | መሸጎጫን በአጠቃላይ ወይም በፊርማ/ሞዴል ያጽዱ                  |

## የማመቅ መሣሪያዎች (13)

| መሣሪያ                                | የፈቃድ ወሰኖች           | መግለጫ                                                                                                  |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | የማመቅ ቅንብሮች፣ የትንታኔ ማጠቃለያ እና መሸጎጫን ያገናዘቡ ስታቲስቲክሶች (`analytics.mcpDescriptionCompression` ዲበ-ውሂብን ያካትታል) |
| `omniroute_compression_configure`   | `write:compression` | የማመቅ ሁነታን፣ ገደብን፣ የዒላማ ሬሾን፣ የስርዓት ጥያቄ ጥበቃን እና የMCP መግለጫ ማመቅ መቀያየሪያን ያዋቅሩ                               |
| `omniroute_set_compression_engine`  | `write:compression` | ንቁውን ሞተር (off/caveman/rtk/stacked) እና የCaveman/RTK ጥንካሬን ይምረጡ                                         |
| `omniroute_list_compression_combos` | `read:compression`  | ስም የተሰጣቸውን የማመቅ ጥምረቶች እና የሞተር ቧንቧ መስመሮቻቸውን ይዘርዝሩ                                                      |
| `omniroute_compression_combo_stats` | `read:compression`  | በማመቅ ጥምረት እና በሞተር የተመደቡ ትንታኔዎች                                                                        |
| `omniroute_ccr_store`               | `write:compression` | በጠሪ የተለየ ይዘትን ገደብ ባለው የማስታወሻ ውስጥ CCR ማከማቻ ያከማቹ እና ምልክት ከ`ccr://` ማጣቀሻ ጋር ይመልሱ                         |
| `omniroute_ccr_retrieve`            | `read:compression`  | የCCR ይዘትን ሙሉ በሙሉ ወይም በhead፣ tail፣ lines፣ grep እና stats ሁነታዎች ሰርስረው ያውጡ                                |
| `omniroute_ccr_inspect`             | `read:compression`  | ይዘቱን ሳይመልሱ በጠሪው ባለቤትነት የተያዘውን የCCR ዲበ-ውሂብ ይመርምሩ                                                       |
| `omniroute_ccr_list`                | `read:compression`  | በጠሪው ባለቤትነት ለተያዙ የCCR ብሎኮች በገጽ የተከፋፈለ ዲበ-ውሂብን ይዘርዝሩ                                                   |
| `omniroute_ccr_delete`              | `write:compression` | በጠሪው ባለቤትነት የተያዘ የCCR ብሎክን ይሰርዙ                                                                       |
| `omniroute_ccr_stats`               | `read:compression`  | በጠሪ ወሰን ያለውን የማስታወሻ አጠቃቀም፣ የሕይወት ዑደት ቆጣሪዎችን እና የማከማቻ ገደቦችን ሪፖርት ያድርጉ                                  |
| `omniroute_rtk_discover`            | `read:compression`  | በፈቃደኝነት በተካተቱ የRTK ውጤት ናሙናዎች ውስጥ ተደጋጋሚ ጫጫታን ያግኙ                                                       |
| `omniroute_rtk_learn`               | `read:compression`  | በፈቃደኝነት ከተካተቱ ናሙናዎች ሊገመገም የሚችል የRTK ማጣሪያ ረቂቅ ይፍጠሩ                                                     |

የCCR ግቤቶች በማስታወሻ ውስጥ ብቻ የሚቆዩ ሲሆን ዳግም ሲጀመር ይጠፋሉ። እያንዳንዱ ብሎክ እስከ 2 MiB፣ እያንዳንዱ
principal እስከ 16 MiB፣ እና አጠቃላይ ማከማቻው እስከ 64 MiB የተገደበ ነው። የግቤቶች ነባሪ TTL 24 ሰዓት ነው (ከፍተኛው
ሰባት ቀናት)። ሙሉ የMCP ሰርስሮ ማውጣት እስከ 256 KiB የተገደበ ነው፤ ትላልቅ ብሎኮች በክልል
እና grep ሁነታዎች በኩል እንደተገኙ ይቆያሉ። ማከማቸት፣ ሰርስሮ ማውጣት፣ መዘርዘር፣ መመርመር፣ መሰረዝ እና ስታቲስቲክስ በ
ማንነቱ የተረጋገጠው API-key principal ተለይተው ይጠበቃሉ። የኦዲት መዝገቦች hashes እና የመጠን ዲበ-ውሂብን ይይዛሉ፤ ይዘትን ፈጽሞ አይይዙም።

`omniroute_compression_status` የMCP መግለጫ መጭመቅን በተናጠል በ
`analytics.mcpDescriptionCompression` ስር ያሳውቃል። እነዚህ ዋጋዎች ለMCP ሊዘረዘሩ የሚችሉ
መግለጫዎች (`tools`፣ `prompts`፣ `resources` እና `resourceTemplates`) የሜታዳታ መጠን ግምቶች ናቸው፤ የአቅራቢ አጠቃቀም
ደረሰኞች አይደሉም፣ እንዲሁም `source: "mcp_metadata_estimate"` ተብለው ምልክት ተደርጎባቸዋል።

### MCP የተደራሽነት ዛፍ ማጣሪያ (v3.8.0)

ከላይ ካሉት የመጭመቂያ መሣሪያዎች በተለየ፣ OmniRoute የMCP አሳሽ/ተደራሽነት መሣሪያዎችን
**የመሣሪያ ውጤቶች** ወደ ወኪሉ ከመመለሳቸው በፊት የሚጨምቅ ከአፈጻጸም በኋላ የሚሠራ ማጣሪያን ያካትታል።
ይህ ማጣሪያ ራሱ መሣሪያ አይደለም — ረጅም የተደራሽነት-ዛፍ ወይም የአሳሽ-ቅጽበታዊ ገጽታ ጽሑፍ (≥2000 ቁምፊዎች)
በያዘ በማንኛውም የመሣሪያ ውጤት ላይ በግልጽነት ሳይታይ ይሠራል።

ዋና ባህሪያት፦

- በተከታታይ የተደጋገሙ ≥30 የተመሳሳይ ደረጃ መስመሮችን ወደ መጀመሪያ + መጨረሻ ማጠቃለያ ይቀንሳል
- ለPlaywright/የኮምፒውተር-አጠቃቀም የሚያስፈልጉ `[ref=eXX]` መልህቆችን ይጠብቃል
- ከመጠን በላይ የሆነ ጽሑፍን (>50,000 ቁምፊዎች) ከአሰሳ ፍንጭ ጋር በግድ ይቆርጣል
- የሚጠበቀው ቁጠባ፦ በአሳሽ ቅጽበታዊ ገጽታ የውሂብ ጭነቶች ላይ **60–80%**

ውቅር፦ በዓለም አቀፍ ቅንብሮች ውስጥ `compression.mcpAccessibility` (ፍልሰት 056)።
ትግበራ፦ `open-sse/services/compression/engines/mcpAccessibility/`።
ሙሉ ሰነዶች፦ [የመጭመቂያ ሞተሮች — MCP የተደራሽነት ዛፍ ማጣሪያ](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)።

ከእነዚህ መሣሪያዎች በስተጀርባ ያለውን የአሂድ ጊዜ መጭመቂያ ሞዴል ለማወቅ [የመጭመቂያ ሞተሮች](../compression/COMPRESSION_ENGINES.md) እና [RTK መጭመቂያ](../compression/RTK_COMPRESSION.md)ን
ይመልከቱ።

## 1Proxy መሳሪያዎች (3)

| መሳሪያ                        | ወሰኖች           | መግለጫ                                                                  |
| :-------------------------- | :------------- | :-------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | ነጻ proxy-ዎችን ከ1proxy የገበያ ቦታ ያምጡ (የፕሮቶኮል/አገር/ጥራት/ገደብ ማጣሪያዎች)          |
| `omniroute_oneproxy_rotate` | `read:proxies` | በስትራቴጂ (`random` / `quality` / `sequential`) መሠረት ቀጣዩን የሚገኝ proxy ያግኙ |
| `omniroute_oneproxy_stats`  | `read:proxies` | የpool ስታቲስቲክስ፣ የማመሳሰል ሁኔታ፣ እና በፕሮቶኮልና በአገር የተከፋፈለ ስርጭት                |

## የማስታወሻ መሳሪያዎች (3)

በ`open-sse/mcp-server/tools/memoryTools.ts` ውስጥ ተገልጸዋል። ማረጋገጫ/ወሰን በመደበኛው MCP የወሰን ሂደት በኩል ይተገበራል።

| መሳሪያ                      | ወሰኖች           | መግለጫ                                                                     |
| :------------------------ | :------------- | :----------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | የtoken በጀት ገደብን በማስከበር፣ ማስታወሻዎችን በጥያቄ / ዓይነት / API ቁልፍ ይፈልጉ              |
| `omniroute_memory_add`    | `write:memory` | አዲስ የማስታወሻ ግቤት ያክሉ (`factual` / `episodic` / `procedural` / `semantic`)  |
| `omniroute_memory_clear`  | `write:memory` | ለአንድ API ቁልፍ ማስታወሻዎችን ያጽዱ፤ እንደ አማራጭ በዓይነት ወይም በ`olderThan` timestamp ይጣሩ |

## የክህሎት መሳሪያዎች (4)

በ`open-sse/mcp-server/tools/skillTools.ts` ውስጥ ተገልጸዋል። በ`src/lib/skills/registry` + `src/lib/skills/executor` የተደገፉ ናቸው።

| መሳሪያ                          | ወሰኖች             | መግለጫ                                                          |
| :---------------------------- | :--------------- | :------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | የተመዘገቡ ክህሎቶችን በAPI ቁልፍ፣ በስም ወይም በነቃ/የቦዘነ ሁኔታ በአማራጭ በማጣራት ዘርዝሩ |
| `omniroute_skills_enable`     | `write:skills`   | አንድን የተወሰነ ክህሎት በID ያንቁ ወይም ያሰናክሉ                             |
| `omniroute_skills_execute`    | `execute:skills` | ክህሎትን በቀረበው ግቤት ያስፈጽሙ እና የአፈጻጸም መዝገቡን ይመልሱ                    |
| `omniroute_skills_executions` | `read:skills`    | የቅርብ ጊዜ የክህሎት አፈጻጸም ታሪክን ዘርዝሩ                                 |

## የNotion አውድ ምንጭ (6)

በ`open-sse/mcp-server/tools/notionTools.ts` ውስጥ ተገልጸዋል። Token በ`src/lib/db/notion.ts` በኩል በ`key_value` ሰንጠረዥ ውስጥ ይከማቻል። REST client በ`src/lib/notion/api.ts` ውስጥ ነው። የቅንብሮች API በ`src/app/api/settings/notion/route.ts` ውስጥ ነው። የdashboard UI በ`src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` ውስጥ ነው።

የNotion ውህደት tokenዎን በEndpoint dashboard ውስጥ ካለው **የአውድ ምንጮች** ትር ወይም በREST API በኩል ያዋቅሩ፦

```bash
# Token ያዘጋጁ
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# ሁኔታውን ያረጋግጡ
curl http://localhost:20128/api/settings/notion

# ግንኙነቱን ያቋርጡ
curl -X DELETE http://localhost:20128/api/settings/notion
```

| መሳሪያ                         | ወሰኖች           | መግለጫ                                                  |
| :--------------------------- | :------------- | :---------------------------------------------------- |
| `notion_search`              | `read:notion`  | በሁሉም ገጾችና databases ውስጥ የሙሉ ጽሑፍ ፍለጋ ያድርጉ              |
| `notion_get_page`            | `read:notion`  | አንድን ገጽ ከባህሪያቱ ጋር በID ያግኙ                             |
| `notion_list_block_children` | `read:notion`  | የአንድ ገጽ ወይም block ልጅ blocks ዘርዝሩ                      |
| `notion_query_database`      | `read:notion`  | databaseን በማጣሪያዎች፣ በቅደም ተከተሎች እና በገጽ ክፍፍል ይጠይቁ        |
| `notion_get_database`        | `read:notion`  | የdatabase schemaን በID ያግኙ                             |
| `notion_append_blocks`       | `write:notion` | ወደ parent block ልጅ blocks ያክሉ (በእያንዳንዱ ጥያቄ ከፍተኛው 100) |

## የወኪል ክህሎት ካታሎግ መሣሪያዎች (3)

በ`open-sse/mcp-server/tools/agentSkillTools.ts` ውስጥ ተገልጸዋል። በ`src/lib/agentSkills/catalog` የተደገፉ ናቸው። እነዚህ መሣሪያዎች 45 ግቤቶች ያሉትን የወኪል ክህሎቶች ሰነድ ካታሎግ ለMCP ደንበኞችና ለውጫዊ ወኪሎች ያቀርባሉ። ወሰን፦ `read:catalog`።

| መሣሪያ                              | ወሰኖች           | መግለጫ                                                                                                    |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog` | ሁሉንም 45 የወኪል ክህሎቶች በአማራጭ `category` (api\|cli) እና `area` ማጣሪያዎች ይዘርዝራል፤ ሜታዳታ + ሽፋን ይመልሳል                |
| `omniroute_agent_skills_get`      | `read:catalog` | አንድን ክህሎት በቀኖናዊ `id` በመጠቀም ሙሉ ሜታዳታውን + የSKILL.md ይዘቱን ያገኛል                                              |
| `omniroute_agent_skills_coverage` | `read:catalog` | የሽፋን ስታቲስቲክስ፦ ከካታሎጉ ድምር ጋር ሲነጻጸር ከ23 API፣ 21 CLI እና 1 ውቅር ክህሎቶች ምን ያህሎቹ በፋይል ስርዓቱ ላይ SKILL.md ፋይሎች አሏቸው |

ሙሉውን ካታሎግ እና ውጫዊ ወኪሎች እንዴት እንደሚጠቀሙበት ለማየት [AGENT-SKILLS.md](./AGENT-SKILLS.md)ን ይመልከቱ።

## ተዛማጅ ማዕቀፎች (v3.8.0)

ከላይ ያለው የMCP መሣሪያ ዝርዝር (110 ልዩ መሣሪያዎች፣ በ`countUniqueMcpTools()` የተሰሉ) ሆን ተብሎ
በአሂድ ጊዜ ማስተላለፍ/መሸጎጫ/መጭመቅ/ማህደረ ትውስታ/ክህሎቶች/ወኪል አገልጋይ/የአውድ-ምንጭ ክዋኔዎች ላይ የተወሰነ ነው። ሁለት አጎራባች
ማዕቀፎች ከMCP አገልጋዩ ጎን ለጎን በv3.8.0 ውስጥ ይቀርባሉ፣ እና ለየብቻ ተሰንደዋል፦

### የደመና ወኪሎች

የደመና ወኪሎች ከሂደቱ ውጭ የሚሰሩ የAI ኮድ ማዘጋጃ ወኪሎች (codex-cloud, cursor-cloud, devin, jules) ሲሆኑ፣ ለLLM አቅራቢዎች ጥቅም ላይ በሚውለው
ተመሳሳይ የግንኙነት ሞዴል በኩል ከOmniRoute ጋር ተያይዘዋል። በራሳቸው
የREST በይነገጽ (`/api/v1/agents/*`) በኩል ይቀርባሉ፣ እና የMCP መሣሪያ ካታሎግ አካል **አይደሉም**
— የደመና ወኪልን መጥራት የMCP ወሰን አይጠቀምም።

- አተገባበር፦ `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`)።
- የሕይወት ዑደት፦ `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`።
- ሰነድ፦ [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)።

### መከላከያዎች

መከላከያዎች በውይይት ሂደቱ ውስጥ የሚተገበሩ ከአፈጻጸም በፊት/በኋላ ማጣሪያዎች (vision-bridge, pii-masker, prompt-injection)
ናቸው። የMCP መሣሪያ/መስመር ንብርብር ከመደረሱ በፊት ይሰራሉ፣
እና የተዋቀሩ ጥሰቶችን ወደ ኦዲት ሂደቱ ይልካሉ፤ እንደ MCP መሣሪያዎች አይጠሩም።

- አተገባበር፦ `src/lib/guardrails/`።
- ሰነድ፦ [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)።

የታገደ የሚመስልን የMCP ጥሪ ሲያርሙ፣ ሁለቱንም የMCP ኦዲት ምዝግብ
(`scope_denied:*` ግቤቶች) እና የመከላከያዎች ኦዲት መከታተያ ይፈትሹ — ጥያቄው
የMCP ወሰን ማስፈጸሚያ ንብርብርን ከመድረሱ **በፊት** በመከላከያ ሊቀበል አይችልም።

---

## የREST API የመጨረሻ ነጥቦች

| የመጨረሻ ነጥብ              | ዘዴ                    | መግለጫ                                                                                             | ማረጋገጫ                  |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------- | :--------------------- |
| `/api/mcp/status`      | `GET`                 | የአገልጋይ ሁኔታ፦ የልብ ምት፣ የHTTP ማጓጓዣ ሁኔታ፣ የኦዲት እንቅስቃሴ ማጠቃለያ                                            | አስተዳደር (ክፍለ ጊዜ/አስተዳዳሪ) |
| `/api/mcp/tools`       | `GET`                 | የመሣሪያ ካታሎግ (ስም፣ መግለጫ፣ ወሰኖች፣ ደረጃ፣ የምንጭ የመጨረሻ ነጥቦች)                                                | አስተዳደር                 |
| `/api/mcp/sse`         | `GET` / `POST`        | የSSE ማጓጓዣ የመጨረሻ ነጥብ (በ`mcpEnabled` + `mcpTransport === "sse"` የተገደበ)                             | የAPI ቁልፍ + ወሰኖች        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | ሊለቀቅ የሚችል የHTTP ማጓጓዣ (`mcp-session-id` ራስጌን ይጠቀማል፤ `DELETE` ክፍለ ጊዜውን ያበቃል)                       | የAPI ቁልፍ + ወሰኖች        |
| `/api/mcp/audit`       | `GET`                 | ከ`mcp_tool_audit` የሚመጡ የኦዲት ምዝግብ ግቤቶች (ማጣሪያዎች፦ `limit`, `offset`, `tool`, `success`, `apiKeyId`) | አስተዳደር                 |
| `/api/mcp/audit/stats` | `GET`                 | የተዋሃዱ የኦዲት ስታቲስቲክስ (`totalCalls`, `successRate`, `avgDurationMs`, በብዛት ጥቅም ላይ የዋሉ መሣሪያዎች)        | አስተዳደር                 |

የምንጭ ፋይሎች፦ `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`።

MCP አገልጋዩ በቅንብሮች (`mcpEnabled`) ውስጥ እስኪነቃ እና ተገቢው `mcpTransport` እስኪመረጥ ድረስ ሁለቱም SSE እና ሊለቀቅ የሚችል HTTP ማጓጓዣዎች ታግደው ይቆያሉ። የተሳሳተው ማጓጓዣ ከተዋቀረ፣ መስመሩ ቅንብሮችን እንዲቀይሩ ከሚጠቁም ፍንጭ ጋር HTTP 400 ይመልሳል።

---

## ማረጋገጫ እና የፈቃድ ወሰኖች

የMCP መሣሪያ ጥሪዎች የፈቃድ ወሰን ሕብረቁምፊዎችን ከጠሪው ያነባሉ። ይህ ማረጋገጫ ከሦስት
እርስ በርሳቸው ነጻ ከሆኑ የስም ክልሎች አንዱ ነው። ከአንዱ አረጋጋጭ የተገኘ ማለፍ ከሌሎቹ ማለፍ አይደለም።
ደንቦቹ [ሦስት የፈቃድ ወሰን ስም ክልሎች](#three-scope-namespaces) ላይ ይገኛሉ።
የመሣሪያዎቹ ማውጫ [የMCP መሣሪያ የፈቃድ ወሰኖች](#mcp-tool-scopes) ነው።

### ሦስት የፈቃድ ወሰን ስም ክልሎች

በAPI ቁልፍ ላይ ያለው `manage`፣ በMCP መሣሪያ ላይ ያለው `read:compression`፣ እና በ
`oma_live_…` የመዳረሻ ቶከን ላይ ያለው `read` ሦስት የተለያዩ ፈቃዶች ናቸው። `read`
የመዳረሻ ቶከንን ወደ ለውጥ የሚያደርግ የአስተዳደር መስመር የሚልኩ ጠሪዎች HTTP 403
`Access token scope 'read' is insufficient; 'write' required.` ያገኛሉ።
ያ የደረጃ አሰጣጥ `scopeSatisfies` ነው። የMCP ሰንጠረዡን አያማክርም፣ እንዲሁም የMCP
አዛማጁ እሱን አያማክርም።

| የስም ክልል             | ማረጋገጫ                                                     | አረጋጋጭ            | ማለፍ የሚፈቅደው                            |
| :------------------ | :-------------------------------------------------------- | :--------------- | :------------------------------------ |
| የAPI ቁልፍ አስተዳደር     | `api_keys.scopes`                                         | `hasManageScope` | ለዚያ Bearer ቁልፍ የአስተዳደር REST           |
| የAPI ቁልፍ ተጨማሪ       | ተመሳሳዩ ድርድር፣ አንድ ትክክለኛ ሕብረቁምፊ                              | ከታች የተሰየመው አጋዥ   | ያንን አንድ ችሎታ ብቻ                        |
| የMCP መሣሪያ የፈቃድ ወሰኖች | ተመሳሳዩ ድርድር፣ ካልሆነ MCP `_meta`፣ ካልሆነ `OMNIROUTE_MCP_SCOPES` | `scopeMatches`   | ማስፈጸሙ ከነቃ በኋላ ያንን መሣሪያ                |
| የመዳረሻ ቶከን           | `oma_live_…`                                              | `scopeSatisfies` | ዘዴውና ዱካው ያንን ደረጃ የሚጠይቁበት የአስተዳደር መስመር |

እያንዳንዱን ማረጋገጫ ስለመፍጠር
[የአስተዳደር ማረጋገጫ](../guides/MANAGEMENT-AUTH.md) ላይ ተብራርቷል።

#### የAPI ቁልፍ የፈቃድ ወሰኖች

አንድ `api_keys.scopes` ድርድር ለሁለት ሥራዎች ያገለግላል። የተለያዩ ተግባሮችን ይጠቀማሉ።

**የአስተዳደር REST።** `manage` እና `admin` የ
`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) አባላት ናቸው።
`hasManageScope` ለዚያ ቁልፍ የአስተዳደር መስመሮችን የሚፈቅደው ነው። `admin` በእነዚያ
መስመሮች ላይ የአስተዳደር ችሎታ አለው። እዚህ ያለው `admin` የመዳረሻ ቶከን
ደረጃ አይደለም፣ እንዲሁም ወደ MCP መሣሪያ የፈቃድ ወሰኖች አይስፋፋም።

**ተጨማሪ ሕብረቁምፊዎች።** እያንዳንዱ ትክክለኛ የአባልነት ፍተሻ ነው፣ እና እያንዳንዱ ከ
`MANAGEMENT_API_KEY_SCOPES` ውጭ ይቆያል።

| የፈቃድ ወሰን                       | ማለፍ የሚፈቅደው                                                                                                                                               |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | loopback ላልሆነው `/api/mcp/` የLOCAL_ONLY ልዩ ሁኔታ ብቻ (`hasMcpConnectOrManageScope`)። `manage` ወይም `admin` ያለው ቁልፍ አሁንም ያንን ልዩ ሁኔታ ያልፋል።                      |
| `self:usage`                   | ለዚህ ቁልፍ `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`)። `POST /api/keys` ሲፈጥር ይህን የፈቃድ ወሰን ይጨምራል (`normalizeSelfServiceScopesForCreate`)። |
| `self:account-quota`           | በዚያ የሁኔታ ውሂብ ውስጥ ያሉ የወደላይ አቅራቢ መለያ ኮታዎች (`src/lib/usage/apiKeySelfService.ts`)። የሁኔታ መስመሩ አሁንም `self:usage` ይጠይቃል።                                       |
| `policy:bypass-provider-quota` | የዚህ ቁልፍ የግምት ጥሪዎች የአቅራቢ-ኮታ መመሪያን ይዘሉታል (`hasProviderQuotaBypassScope` በ`src/sse/handlers/chat.ts`)።                                                      |

#### ማዛመድ

ማውጫው [የMCP መሣሪያ የፈቃድ ወሰኖች](#mcp-tool-scopes) ስር ያለው ሰንጠረዥ ነው።
በ`src/shared/constants/mcpScopes.ts` ውስጥ ያለውን `MCP_SCOPE_LIST` እንደዚያ ማውጫ
አትቁጠሩት፤ እሱ የመጀመሪያው ዓይነት-የተወሰነ ንዑስ ስብስብ ነው። በኋላ የተጨመሩ መሣሪያዎች ተጨማሪ የፈቃድ ወሰኖችን
ከእሱ ጎን ያውጃሉ (`read:notion`፣ `read:skills`፣ `read:local-corpus`፣ እና የተቀረውን ሰንጠረዥ)።

በ`open-sse/mcp-server/scopeEnforcement.ts` ውስጥ ያለው `evaluateToolScopes`፣
እያንዳንዱ አስፈላጊ የፈቃድ ወሰን ከተሰጡት የፈቃድ ወሰኖች በአንዱ ሲዛመድ ጥሪውን ይፈቅዳል፦

- `*` ከእያንዳንዱ አስፈላጊ የፈቃድ ወሰን ጋር ይዛመዳል።
- በ`*` የሚያበቃ የተሰጠ የፈቃድ ወሰን፣ ከኮከቢቱ በፊት ባለው ቅድመ ቅጥያ
  ከሚጀምር አስፈላጊ የፈቃድ ወሰን ጋር ይዛመዳል። `read:*` ከ`read:compression` ጋር ይዛመዳል።
- ማንኛውም ሌላ የተሰጠ የፈቃድ ወሰን የሚዛመደው ሙሉ በሙሉ ከተመሳሳዩ አስፈላጊ ሕብረቁምፊ ጋር ብቻ ነው።

የፈቃድ ወሰኖቹ `["manage"]` የሆኑ ቁልፍ ለ`read:compression` በ`scopeMatches` ፍተሻ ይወድቃል።
እነዚህ ብቻ የተሰጡ ሕብረቁምፊዎች ሲሆኑ፣ ተመሳሳዩ ጥሪ ለ`admin`፣ `mcp:connect`፣ `read`፣ እና `write`
ይወድቃል። ከመጨረሻው `*` በስተቀር በMCP መሣሪያ የፈቃድ ወሰኖች መካከል
የደረጃ ተዋረድ የለም።

`OMNIROUTE_MCP_ENFORCE_SCOPES=true` ካልሆነ በስተቀር ማስፈጸሙ ጠፍቷል (ነባሪው
`false`)። ጠፍቶ ባለበት ጊዜ፣ `evaluateToolScopes` ጥሪውን ይፈቅዳል እና
ማውጫውን ይዘላል። በርቶ ባለበት ጊዜ፣ HTTP የBearer ቁልፉን `api_keys.scopes` እንደ
`authInfo` ይጠቀማል ([በየቁልፉ የHTTP የፈቃድ ወሰን ማሰር](#per-key-http-scope-binding-7895) ይመልከቱ)።
ምንም የቁልፍ የፈቃድ ወሰኖች ካልተገኙ፣ የተሰጠው ስብስብ ወደ MCP `_meta`፣ ከዚያም
ወደ `OMNIROUTE_MCP_SCOPES` ያልፋል።

#### የመዳረሻ ቶከን የፈቃድ ወሰኖች

`oma_live_…` ቶከኖች (`src/lib/accessTokens/scopes.ts`) `read`፣ `write`፣
ወይም `admin` ይይዛሉ። `scopeSatisfies` የደረጃ አሰጣጥ ነው፦ `admin` `write`ን እና `read`ን ይሸፍናል፣ እና
`write` `read`ን ይሸፍናል። ያልታወቁ የፈቃድ ወሰኖች ምንም አይሸፍኑም።

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ያንን
ደረጃ ከ`inferRequiredScope` (`src/server/authz/accessScopes.ts`) ጋር ያወዳድራል፦

- `GET`፣ `HEAD`፣ እና `OPTIONS` `read` ይጠይቃሉ።
- ሌሎች ዘዴዎች በሙሉ `write` ይጠይቃሉ።
- በ`ADMIN_SCOPE_PREFIXES` ውስጥ ያሉ ዱካዎች ለእያንዳንዱ ዘዴ `admin` ይጠይቃሉ። `/api/mcp`
  በዚያ ዝርዝር ላይ ስለሆነ፣ `write` የመዳረሻ ቶከን እንኳ የMCP HTTP
  ገጽታን መጥራት አይችልም።
- በ`ADMIN_MUTATION_PREFIXES` ውስጥ ያሉ ዱካዎች `admin`ን የሚጠይቁት ለለውጥ ሥራዎች ብቻ ነው።

`PATCH /api/keys/{id}` ማሻሻያ የሚያደርግ ክዋኔ ሲሆን በእነዚያ የአስተዳዳሪ ዝርዝሮች ውስጥ አይገኝም፤ ስለዚህ
የ`read` ቶከን 403 ምላሽ ይቀበላል፦
`Access token scope 'read' is insufficient; 'write' required.`
የ`write` ወይም `admin` መዳረሻ ቶከን የዚያን route መስፈርት ያሟላል። የdashboard JWT፣
የloopback CLI machine-id ቶከን እና `manage` ወይም `admin` ያለው API key
ሌሎች branch-ዎችን ይከተላሉ፣ እና በዚህ rank አይገደቡም።

ለ`/api/mcp` የ`scopeSatisfies` ማረጋገጫን ያለፈ መዳረሻ ቶከን ያለፈው
የአስተዳደር gate-ን ብቻ ነው። የtool ጥሪዎች አሁንም `scopeMatches`ን ከAPI-key
scope-ዎች ጋር ያስኬዳሉ። የመዳረሻ ቶከኑ rank ለ`scopeMatches` ግብዓት አይደለም።

### የMCP tool scope-ዎች

የscope ማስፈጸሚያው በ`open-sse/mcp-server/scopeEnforcement.ts` ውስጥ የተማከለ ነው።
እያንዳንዱ tool የተወሰኑ scope-ዎችን ይፈልጋል፦

| ወሰን                   | መሣሪያዎች                                                                                                                                                                          |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                               |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                       |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                          |
| `read:quota`          | `check_quota`                                                                                                                                                                   |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                          |
| `read:models`         | `list_models_catalog`                                                                                                                                                           |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                   |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                           |
| `write:budget`        | `set_budget_guard`                                                                                                                                                              |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                     |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                  |
| `read:cache`          | `cache_stats`                                                                                                                                                                   |
| `write:cache`         | `cache_flush`                                                                                                                                                                   |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                      |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                               |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                           |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                          |
| `read:memory`         | `memory_search`                                                                                                                                                                 |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                    |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                              |
| `write:skills`        | `skills_enable`                                                                                                                                                                 |
| `execute:skills`      | `skills_execute`                                                                                                                                                                |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                         |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                       |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                  |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                              |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                 |
| `read:obsidian`       | 13 የማንበቢያ መሣሪያዎች — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 የመጻፊያ መሣሪያዎች — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                 |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                               |

Wildcard scopes ይደገፋሉ፦ `read:*` ሁሉንም የማንበብ scopes ይፈቅዳል፣ `*` ደግሞ ሙሉ መዳረሻ ይፈቅዳል።

### `mcp:connect` — የተገደበ የroute ብቃት (#7895)

ከnon-loopback ወደ HTTP/SSE MCP transport (`/api/mcp/*`) ለመድረስ
የ`/api/mcp/` LOCAL_ONLY ማስቀረት ያስፈልጋል (`docs/security/ROUTE_GUARD_TIERS.md`ን ይመልከቱ)። ከዚህ በፊት
ይህ ማስቀረት ሙሉ `manage`/`admin`-scope ያለውን API key ብቻ ይቀበል ነበር — MCPን ብቻ
ማነጋገር ለሚፈልግ caller ይህ ከልክ በላይ ሰፊ ነው። `src/shared/constants/managementScopes.ts` አሁን
`MCP_CONNECT_SCOPE = "mcp:connect"`ን export ያደርጋል፦ ተጨማሪ፣ የተገደበ scope (`SELF_USAGE_SCOPE`ን
እንደ ቀዳሚ ምሳሌ የሚከተል)፣ በ`src/server/authz/policies/management.ts` ውስጥ የ`/api/mcp/`
bypassን ብቻ የሚፈቅድ — ሌላ ምንም የmanagement-route መዳረሻ አይሰጥም፣ እና ሆን ተብሎ
ከ`MANAGEMENT_API_KEY_SCOPES` ውጭ ተደርጓል። `manage`/`admin` ያለው key አሁንም ማስቀረቱን
ሳይቀየር ያልፋል፤ `mcp:connect` በ`hasMcpConnectOrManageScope()` የሚፈተሽ፣
ለርቀት MCP-ብቻ callers ዝቅተኛ ፈቃድ ያለው አማራጭ ነው።

### በእያንዳንዱ key ላይ የHTTP scope ማሰር (#7895)

በHTTP/SSE በኩል፣ `open-sse/mcp-server/httpTransport.ts` አሁን የcallerን እውነተኛ
`api_keys.scopes` በ`resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
በኩል ይፈታና ወደ MCP SDK `transport.handleRequest(req, { authInfo })` ያስተላልፈዋል፤ ስለዚህ
ወደ እያንዳንዱ የመሣሪያ ጥሪ የሚደርሰው `extra.authInfo.scopes` የBearer keyን የራሱን scopes
ያንጸባርቃል። የ`scopeEnforcement.ts` `resolveCallerScopeContext()` `authInfo`ን
ከ`_meta` እና `OMNIROUTE_MCP_SCOPES` env fallback በላይ አስቀድሞ ይመርጥ ነበር — ይህ ለውጥ
ከዚህ በፊት በHTTP ላይ ያልተሞላውን የመጀመሪያውንና ከፍተኛ ቅድሚያ ያለውን source ብቻ ይሞላል።
ምንም API key ሳይፈታ (header ከሌለ፣ keyው ልክ ካልሆነ)፣ `authInfo` `undefined` ሆኖ
ይቆያል፣ እና resolution ወደ ነባሩ `meta`/env ሰንሰለት ሳይቀየር ይወርዳል። ይህ
የ`OMNIROUTE_MCP_ENFORCE_SCOPES`ን default አይቀይርም — enforcement አሁንም በግልጽ
መንቃት አለበት፤ ይህ ለውጥ የሚያደርገው አንዴ ከነቃ በኋላ በእያንዳንዱ key ላይ ያለው path
ቅድሚያ እንዲወስድ ማድረግ ብቻ ነው። stdio በእያንዳንዱ caller ደረጃ ማንነት የለውም
(`mcpCallerIdentity.ts`ን ይመልከቱ) እና አይነካም — በ`_meta`/env fallback ሰንሰለት ላይ
እንዳለ ይቆያል።

---

## የአካባቢ ተለዋዋጮች

| ተለዋዋጭ                                   | ነባሪ                         | ዓላማ                                                                                         |
| :-------------------------------------- | :-------------------------- | :------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`    | MCP አገልጋዩ የOmniRoute ውስጣዊ APIዎችን ሲጠራ የሚጠቀምበት መሠረታዊ URL                                      |
| `OMNIROUTE_API_KEY`                     | (ባዶ)                        | ለውስጣዊ API ጥሪዎች እንደ `Authorization: Bearer` የሚተላለፍ API ቁልፍ                                   |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` ብቻ ያነቃዋል) | ሲነቃ፣ የጎደሉ ወሰኖች የመሣሪያ ጥሪዎችን ይከለክላሉ፣ እንዲሁም `scope_denied:<reason>`ን በኦዲት ምዝግብ ውስጥ ይመዘግባሉ      |
| `OMNIROUTE_MCP_SCOPES`                  | (ባዶ)                        | በነባሪነት "የሚገኙ" ተደርገው የሚቆጠሩ፣ በኮማ የተለዩ የወሰኖች የፈቃድ ዝርዝር (ጠሪው የራሱን ወሰኖች በማያቀርብበት ጊዜ ጥቅም ላይ ይውላል) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (ካልተዋቀረ = እንደበራ ነው)         | `0/false/off/no` ተብሎ ሲዋቀር፣ በምዝገባ ጊዜ የMCP መግለጫ መጨመቅን ያሰናክላል                                  |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (ካልተዋቀረ = እንደበራ ነው)         | ከላይ ላለው ተመሳሳይ መቀየሪያ አማራጭ ተለዋጭ ስም                                                            |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                     | ለውስጣዊ አስተዳደር ንባቦች (ጤንነት፣ ጽናት፣ ጥምረቶች፣ ኮታ፣ አጠቃቀም) የማቋረጫ ጊዜ ገደብ                                |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                     | አቅራቢን ለሚጠብቁ የጥያቄ ደረጃዎች (`route_request`፣ `web_search`፣ `web_fetch`) የማቋረጫ ጊዜ ገደብ            |
| `MCP_TOOL_DENY`                         | (ካልተዋቀረ = ማጣሪያ የለም)         | ከ`tools/list` የሚወገዱ፣ በኮማ የተለዩ የመሣሪያ ስሞች (የመሣሪያ ብዛት ቅነሳ — ከታች ይመልከቱ)                         |
| `MCP_TOOL_ALLOW`                        | (ካልተዋቀረ = ማጣሪያ የለም)         | ብቻቸውን እንዲቆዩ በኮማ የተለዩ የመሣሪያ ስሞች (የፈቃድ ዝርዝር ሁነታ — ከታች ይመልከቱ)                                  |
| `DATA_DIR`                              | `~/.omniroute`              | የልብ ምት ፋይሉ ወደ `${DATA_DIR}/runtime/mcp-heartbeat.json` ይጻፋል                                 |

---

## የመግለጫ መጨመቅ

የMCP መሣሪያ፣ መጠየቂያ እና ሀብት መዝገቦች ለደንበኞች የሚቀርበውን የሜታዳታ መጠን (እና በዚህም የመጠየቂያ ዐውድ ወጪን) ለመቀነስ በምዝገባ/ዝርዝር ጊዜ መግለጫዎችን መጨመቅ ይችላሉ። አተገባበሩ በ`open-sse/mcp-server/descriptionCompressor.ts` ውስጥ ይገኛል፣ እንዲሁም በ`createMcpServer()` ውስጥ ባለው `compressMcpRegistryMetadata` በኩል ከMCP አገልጋዩ ጋር ተገናኝቷል።

- መጨመቁ መዋቅራዊ ይዘት እንዳይለወጥ የተጠበቁ ብሎኮችን (የኮድ ክፍሎች፣ በአጥር የተከበቡ ብሎኮች፣ ወዘተ) በማውጣት፣ የCaveman የደንብ ስብስብን (`getRulesForContext("all", "full")`) በመጠቀም በመግለጫ ጽሑፉ ላይ ይከናወናል።
- በ`key_value` ቅንብሮች ሰንጠረዥ ውስጥ ባለው `compression.mcpDescriptionCompressionEnabled` እሴት (ነባሪ፦ ነቅቷል) በኩል ለእያንዳንዱ ማሰማራት ይቀያይሩት — በUI ውስጥ እንደ **ትንታኔ → የMCP መግለጫ መጨመቅ** ቀርቧል።
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false`ን ወይም `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`ን በመጠቀም በሂደቱ አጠቃላይ ይቀያይሩት።
- የቅጽበታዊ ጊዜ ስታቲስቲክስ በ`omniroute_compression_status` በኩል በ`analytics.mcpDescriptionCompression` ሥር ይቀርባሉ፣ እንዲሁም ከእውነተኛ የአቅራቢ አጠቃቀም ደረሰኞች ለመለየት `source: "mcp_metadata_estimate"` የሚል መለያ ይደረግባቸዋል።

---

## የመሣሪያዎች ብዛት መቀነስ (F4.3)

የመግለጫ ማመቅ የእያንዳንዱን መሣሪያ ሜታዳታ ይቀንሳል፤ **የመሣሪያዎች ብዛት መቀነስ** ደግሞ _ምን ያህል_ መሣሪያዎች እንደሚታወጁ በመቀነስ አንድ ደረጃ ወደፊት ይሄዳል። በ`tools/list` ማኒፌስት ውስጥ አነስተኛ መሣሪያዎችን ማሳወቅ የደንበኛው ሞዴል ለመሣሪያ ካታሎጉ በእያንዳንዱ ጥያቄ የሚከፍለውን የቶከን ወጪ ("layer 5" ማመቅ) ይቀንሳል። ትግበራው በ`open-sse/mcp-server/toolCardinality.ts` ውስጥ የሚገኝ ሙሉ በሙሉ ከሁኔታ ነጻ የሆነ ማጣሪያ (`reduceToolManifest`) ሲሆን፣ በ`createMcpServer()` (`open-sse/mcp-server/server.ts`) ውስጥ ካለው የምዝገባ ዑደት ጋር ተገናኝቷል።

**በፍላጎት የሚነቃ ሲሆን፣ በነባሪነት ጠፍቷል።** ማጣሪያው የሚሠራው ከሁለቱ የአካባቢ ተለዋዋጮች ቢያንስ አንዱ ሲዋቀር ብቻ ነው፤ ሁለቱም ካልተዋቀሩ፣ ሁሉም 110 መሣሪያዎች ያለምንም ለውጥ ይታወቃሉ።

| ተለዋዋጭ            | ሁነታ                                                         |
| :--------------- | :---------------------------------------------------------- |
| `MCP_TOOL_DENY`  | ጥቁር ዝርዝር — በኮማ የተለዩ እና ሁልጊዜ ከ`tools/list` የሚወገዱ የመሣሪያ ስሞች   |
| `MCP_TOOL_ALLOW` | የፍቃድ ዝርዝር — በኮማ የተለዩ የመሣሪያ ስሞች፤ እነዚህ ብቻ ይቀራሉ፣ ሌሎቹ በሙሉ ይወገዳሉ |

`deny` ከ`allow` ቅድሚያ ይወስዳል። ስሞች በኮማ ይለያያሉ፣ ዙሪያቸው ያለው ባዶ ቦታ ይወገዳል፣ እና ባዶ ግቤቶች ችላ ይባላሉ። ምሳሌዎች፦

```bash
# ሁለት መሣሪያዎችን ከካታሎጉ አስወግድ
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# የማዞሪያ እና የኮታ መሣሪያዎችን ብቻ አሳውቅ (የፍቃድ ዝርዝር ሁነታ)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**የተጣሩ መሣሪያዎች የሚወገዱበት መንገድ፦** ምዝገባው ሁልጊዜ በተሳካ ሁኔታ ይጠናቀቃል፤ መገለጫው የማይቀበለው መሣሪያ ከዚያ በMCP SDK መያዣው ላይ `.disable()` ይደረጋል፣ ስለዚህ በ`tools/list` ውስጥ ፈጽሞ አይታይም፣ ነገር ግን ግንኙነቱ ሳይፈርስ ይቆያል (ንጹህ ማንቃት/ማሰናከል፣ ዳግም ምዝገባ የለም)። የመገለጫ ተንታኙ `readMcpToolProfileFromEnv(process.env)` ሲሆን፣ ሁለቱም ተለዋዋጮች ባዶ ሲሆኑ `null` (ምንም ማጣራት የለም) ይመልሳል።

ከ`reduceToolManifest` ጀርባ ያለው የበለጸገ `ToolProfile` ቅርጽ የወሰን-መገናኛ ማጣራትን (`allowScopes`፣ ከ`read:*`-ቅጥ የዱር ካርድ ማዛመድ ጋር) እና ተወስኖ የሚደገም `maxTools` ገደብንም ይደግፋል፤ ነገር ግን እነዚህ ሁለት ቅንብሮች በምዝገባ ጊዜ ሙሉውን ማኒፌስት የሚፈልጉ ሲሆን፣ በአሁኑ ጊዜ በአካባቢ ተለዋዋጮቹ በኩል **አልተጋለጡም** (የ`tools/list`-ደረጃ ማያያዣ ለወደፊት ክትትል የሚደረግበት ሥራ ነው)። `estimateManifestTokens()` ማኒፌስቱ ከመቀነሱ በፊትና በኋላ ያለውን የቶከን ወጪ ለማነጻጸር ይገኛል።

---

## የአሂድ ጊዜ የልብ ምት

የstdio ማጓጓዣው በየ5 ሰከንዱ የሕያውነት ሁኔታን በ`${DATA_DIR}/runtime/mcp-heartbeat.json` ያስቀምጣል። ዳሽቦርዱ (`/api/mcp/status`) `online`ን ለመወሰን ይህን ፋይል ከPID ሕያውነት ጋር ያነባል። የHTTP ማጓጓዣዎች በምትኩ ሁኔታን በሂደት ውስጥ ካለው `getMcpHttpStatus()` ያሳውቃሉ (ምንም የፋይል ጽሕፈት የለም)።

የልብ ምት ቅጽበታዊ ምስሉ የሚከተለውን ይይዛል፦

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

## የኦዲት ምዝግብ ማስቀመጥ

እያንዳንዱ የመሣሪያ ጥሪ በ`open-sse/mcp-server/audit.ts` አማካኝነት ወደSQLite `mcp_tool_audit` ሰንጠረዥ ይመዘገባል፦

- የመሣሪያ ስም፣ ነጋሪ እሴቶች (በእያንዳንዱ መሣሪያ `auditLevel` መሠረት ሃሽ የተደረጉ/የተቆረጡ)፣ ውጤት
- ቆይታ በms፣ የስኬት/ውድቀት ምልክት፣ የስህተት መልዕክት (ተፈጻሚ ሲሆን)
- የAPI ቁልፍ ሃሽ፣ የጊዜ ማህተም
- የወሰን ክልከላዎች ከጎደሉት ወሰኖች ዝርዝር ጋር እንደ`scope_denied:<reason>` ይመዘገባሉ

የቅርብ ጊዜ ጥሪዎችን ለመመርመር ዳሽቦርዱን ወይም የ`/api/mcp/audit` እና `/api/mcp/audit/stats` REST መዳረሻዎችን ይጠቀሙ።

---

## ፋይሎች

| ፋይል                                                                      | ዓላማ                                                      |
| :----------------------------------------------------------------------- | :------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | የMCP ሰርቨር ፋብሪካ፣ የstdio መግቢያ ነጥብ፣ በወሰን የተገደቡ የመሣሪያ ምዝገባዎች |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ማጓጓዣ (የክፍለ ጊዜ አስተዳደር)              |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | የመሣሪያ ወሰን ግምገማ እና የጠሪ መለየት                               |
| `open-sse/mcp-server/audit.ts`                                           | የመሣሪያ ጥሪ ኦዲት ምዝግብ (`mcp_tool_audit`)                     |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | የstdio የልብ ምት ጸሐፊ (`mcp-heartbeat.json`)                 |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | ለመሣሪያ / ጥያቄ / ሀብት መዝገቦች የመግለጫ ማመቂያ                       |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod መርሃግብሮች + የመሣሪያ መዝገብ (`MCP_TOOLS`፣ 45 ግቤቶች)          |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | የደረጃ 2 + መሸጎጫ + 1proxy መሣሪያ ተቆጣጣሪዎች                      |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | የማመቂያ መሣሪያ ተቆጣጣሪዎች                                       |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | የማህደረ ትውስታ መሣሪያ ትርጓሜዎች (3 መሣሪያዎች)                        |
| `open-sse/mcp-server/tools/skillTools.ts`                                | የክህሎት መሣሪያ ትርጓሜዎች (4 መሣሪያዎች)                             |
| `open-sse/mcp-server/tools/notionTools.ts`                               | የNotion አውድ ምንጭ መሣሪያ ትርጓሜዎች (6 መሣሪያዎች)                   |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | የጨዋታዊነት መሣሪያ ትርጓሜዎች (8 መሣሪያዎች)                           |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | የፕለጊን ምዝገባ እና አስተዳደር መሣሪያዎች (8 መሣሪያዎች)                   |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` መጨረሻ ነጥብ                               |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` መጨረሻ ነጥብ                                |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE የማጓጓዣ መስመር                            |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP የማጓጓዣ መስመር             |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` የኦዲት ምዝግብ መጠይቅ                          |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` የተጠቃለሉ የኦዲት መለኪያዎች                |
| `src/lib/notion/api.ts`                                                  | የNotion REST API ደንበኛ (ዳግም ሙከራ፣ የጊዜ ገደብ፣ የስህተት ምደባ)      |
| `src/lib/db/notion.ts`                                                   | የNotion ቶከን ቀጣይነት (`key_value` ሰንጠረዥ)                    |
| `src/app/api/settings/notion/route.ts`                                   | የNotion ቅንብሮች API (GET/POST/DELETE)                      |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | የNotion ቶከን አስተዳደር UI                                    |
| `tests/unit/notion-api.test.ts`                                          | የNotion API ደንበኛ ፈተናዎች (7)                               |
| `tests/unit/notion-tools.test.ts`                                        | የNotion መሣሪያዎች ወሰን ማስፈጸሚያ ፈተናዎች (10)                     |
| `tests/unit/db/notion.test.mjs`                                          | የNotion DB ሞጁል ፈተናዎች (3)                                 |
