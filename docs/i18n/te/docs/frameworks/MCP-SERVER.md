# OmniRoute MCP Server Documentation (తెలుగు)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> రూటింగ్, క్యాష్, కంప్రెషన్, మెమరీ, స్కిల్స్, ప్రాక్సీ, పూల్, Radar, మరియు కాంటెక్స్ట్ సోర్స్ ఆపరేషన్లలో 110 టూల్స్తో కూడిన Model Context Protocol సర్వర్.
>
> ప్రామాణిక మూలం: `open-sse/mcp-server/server.ts`లోని `countUniqueMcpTools()` **110 ప్రత్యేక టూల్స్**ను లెక్కిస్తుంది: 45 ప్రామాణిక నిర్వచనాలు (ఆరు CCR లైఫ్సైకిల్ టూల్స్, ఏజెంట్-స్కిల్స్ త్రయం, `omniroute_radar_catalog`, మరియు `omniroute_x_search`తో సహా), వాటితో పాటు మెమరీ (3), స్కిల్స్ (4), GitHub స్కిల్స్ (3), పూల్ (6), గేమిఫికేషన్ (8), ప్లగిన్లు (8), Notion (6), Obsidian (22), లోకల్ కార్పస్ (3), మరియు రెండు RTK-మాత్రమే కంప్రెషన్ టూల్స్.

## ఇన్స్టాలేషన్

OmniRoute MCP అంతర్నిర్మితంగా ఉంటుంది. దీన్ని ఇలా ప్రారంభించండి:

```bash
omniroute --mcp
```

లేదా open-sse ట్రాన్స్పోర్ట్ ద్వారా:

```bash
# HTTP స్ట్రీమ్ చేయగల ట్రాన్స్పోర్ట్ (పోర్ట్ 20130)
omniroute --dev  # /mcp ఎండ్పాయింట్లో MCP స్వయంచాలకంగా ప్రారంభమవుతుంది
```

HTTP ట్రాన్స్పోర్ట్లు (`sse` / `streamable-http`, డ్యాష్బోర్డ్ సర్వర్ ద్వారా అదే ప్రాసెస్లో అందించబడేవి)
డిఫాల్ట్గా ఆఫ్లో ఉంటాయి మరియు గతంలో `/dashboard/mcp` పేజీ నుండి మాత్రమే టాగుల్ చేయగలిగేవి. v3.8.51
నుండి CLIలో కూడా సమానమైన సదుపాయం ఉంది:

```bash
omniroute mcp status                                  # ప్రారంభించబడిందా/ఆన్లైన్లో ఉందా, ట్రాన్స్పోర్ట్, టూల్ల సంఖ్య
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # సక్రియ sse/streamable-http సెషన్లను రీసెట్ చేస్తుంది
```

`mcp enable`/`mcp disable`, డ్యాష్బోర్డ్ `/api/settings` ద్వారా టాగుల్ చేసే అదే `mcpEnabled`
(మరియు ఐచ్ఛికంగా `mcpTransport`) సెట్టింగ్కు PATCH అభ్యర్థన పంపుతాయి. `mcp restart`, `POST /api/mcp/restart`కు కాల్ చేస్తుంది:
ఇది సక్రియ `sse`/`streamable-http` సెషన్లను నిలిపివేస్తుంది, తద్వారా తదుపరి అభ్యర్థన ఎలాంటి అవశేషాలు లేకుండా మళ్లీ ప్రారంభమవుతుంది;
MCP నిలిపివేయబడి ఉంటే `409`, అలాగే `stdio` ట్రాన్స్పోర్ట్కు `501` తిరిగి ఇస్తుంది (stdio క్లయింట్లు తమ స్వంత
సబ్ప్రాసెస్ను నిర్వహిస్తాయి — రీస్టార్ట్ చేయడానికి అదే ప్రాసెస్లో హ్యాండిల్ ఉండదు).

## ట్రాన్స్పోర్ట్లు

MCP సర్వర్ మూడు ట్రాన్స్పోర్ట్లను అందిస్తుంది, అవన్నీ ఒకే `createMcpServer()` ఫ్యాక్టరీపై ఆధారపడి ఉంటాయి:

| ట్రాన్స్పోర్ట్    | ఎక్కడ                                          | ఎప్పుడు ఉపయోగించాలి                                 |
| :---------------- | :--------------------------------------------- | :-------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | IDE ఇంటిగ్రేషన్లు (Claude Desktop, Cursor మొదలైనవి) |
| `sse`             | `POST/GET /api/mcp/sse` ద్వారా `httpTransport` | ఈవెంట్ స్ట్రీమ్ అవసరమైన బ్రౌజర్/ఏజెంట్ క్లయింట్లు   |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | బహుళ-సెషన్ HTTP క్లయింట్లు (`mcp-session-id` హెడర్) |

సక్రియ HTTP ట్రాన్స్పోర్ట్ (`sse` లేదా `streamable-http`) `mcpTransport` సెట్టింగ్ ద్వారా ఎంచుకోబడుతుంది. ట్రాన్స్పోర్ట్లను మార్చినప్పుడు, ఇతర ట్రాన్స్పోర్ట్లో ఇప్పటికే ఉన్న సెషన్లు మూసివేయబడతాయి.

### రిమోట్ యాక్సెస్ (manage-స్కోప్ బైపాస్)

`/api/mcp/*`, LOCAL_ONLY స్థాయిలో (`src/server/authz/routeGuard.ts`) ఉంది — డిఫాల్ట్గా లూప్బ్యాక్ హోస్ట్లు (`localhost`, `127.0.0.1`, `::1`) మాత్రమే దాన్ని చేరుకోగలవు. v3.8.2 నుండి, నాన్-లూప్బ్యాక్ క్లయింట్లు `manage` స్కోప్ కలిగిన కీతో `Authorization: Bearer <api-key>`ను సమర్పిస్తే కనెక్ట్ కావచ్చు. టన్నెల్, రివర్స్ ప్రాక్సీ లేదా పబ్లిక్ హోస్ట్నేమ్ ద్వారా రిమోట్ MCP సర్వర్ను చేరుకోవడానికి ఇదొక్కటే మార్గం.

```bash
# manage స్కోప్ను మంజూరు చేయండి: డ్యాష్బోర్డ్ API Keys పేజీని తెరిచి, కీపై
# "Management Access"ను టాగుల్ చేయండి, లేదా సృష్టించేటప్పుడు POST scopes:["manage"] ఉపయోగించండి.

# తర్వాత రిమోట్ MCP క్లయింట్ నుండి కనెక్ట్ అవ్వండి:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` లేని కీ (లేదా Bearer లేకపోవడం) `403 LOCAL_ONLY`ను తిరిగి ఇస్తుంది. అనుబంధ ప్రిఫిక్స్ `/api/cli-tools/runtime/*`ను ఉద్దేశపూర్వకంగా బైపాస్ చేయడం సాధ్యం కాదు — [Route Guard స్థాయిలు — Manage-స్కోప్ మినహాయింపు](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) చూడండి.

## IDE కాన్ఫిగరేషన్

Claude Desktop, Cursor, Cline మరియు అనుకూల MCP క్లయింట్ సెటప్ కోసం [MCP క్లయింట్ కాన్ఫిగరేషన్](../guides/SETUP_GUIDE.md#mcp-client-configuration) చూడండి.

---

## అవసరమైన సాధనాలు (14) — దశ 1

| సాధనం                           | స్కోప్లు              | వివరణ                                                                                                                                  |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | అప్టైమ్, మెమరీ, సర్క్యూట్ బ్రేకర్లు, రేట్ పరిమితులు, క్యాష్ గణాంకాలు                                                                   |
| `omniroute_list_combos`         | `read:combos`         | వ్యూహాలతో కాన్ఫిగర్ చేసిన అన్ని కాంబోలు (ఐచ్ఛిక మెట్రిక్లు)                                                                            |
| `omniroute_get_combo_metrics`   | `read:combos`         | నిర్దిష్ట కాంబోకు సంబంధించిన పనితీరు మెట్రిక్లు                                                                                        |
| `omniroute_switch_combo`        | `write:combos`        | కాంబోను సక్రియం లేదా నిష్క్రియం చేయడం                                                                                                  |
| `omniroute_create_combo`        | `write:combos`        | ఇప్పటికే ఉన్న కాంబో API ద్వారా ధ్రువీకరించిన కాంబోను సృష్టించడం                                                                        |
| `omniroute_check_quota`         | `read:quota`          | ఉపయోగించిన/మొత్తం కోటా, మిగిలిన శాతం, రీసెట్ సమయం, టోకెన్ స్థితి                                                                       |
| `omniroute_route_request`       | `execute:completions` | OmniRoute రూటింగ్ ద్వారా చాట్ కంప్లీషన్ను పంపడం                                                                                        |
| `omniroute_cost_report`         | `read:usage`          | వ్యవధి వారీగా ఖర్చు నివేదిక (సెషన్/రోజు/వారం/నెల)                                                                                      |
| `omniroute_list_models_catalog` | `read:models`         | సామర్థ్యాలు, స్థితి, ధరలతో కూడిన పూర్తి మోడల్ కేటలాగ్                                                                                  |
| `omniroute_radar_catalog`       | `read:radar`          | స్థానికంగా సంతకం చేసిన Radar కేటలాగ్; ఐచ్ఛిక ప్రొవైడర్/ఫ్యామిలీ ఫిల్టర్లు                                                              |
| `omniroute_tool_search`         | `read:tools`          | నమోదైన MCP కేటలాగ్ నుంచి సాధనాలను కనుగొనడం                                                                                             |
| `omniroute_web_search`          | `execute:search`      | కాన్ఫిగర్ చేసిన శోధన ప్రొవైడర్ల ద్వారా వెబ్లో శోధించడం. X/Twitter కాదు.                                                                |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok ద్వారా Xలో శోధించండి లేదా Xquik API ఫలితాల కోసం `xquik-search`ను ఎంచుకోండి. ఎంచుకున్న బ్యాకెండ్కు క్రెడెన్షియల్స్ అవసరం. |
| `omniroute_web_fetch`           | `execute:search`      | కాన్ఫిగర్ చేసిన ఫెచ్ ప్రొవైడర్ల ద్వారా వెబ్ కంటెంట్ను పొందడం                                                                           |

## అధునాతన సాధనాలు (11) — దశ 2

| సాధనం                              | స్కోప్లు                             | వివరణ                                                                                                                      |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | ఫాల్బ్యాక్ ట్రీతో డ్రై-రన్ రూటింగ్ అనుకరణ                                                                                  |
| `omniroute_set_budget_guard`       | `write:budget`                       | డీగ్రేడ్/బ్లాక్/అలర్ట్ చర్యతో సెషన్ బడ్జెట్                                                                                |
| `omniroute_set_routing_strategy`   | `write:combos`                       | రన్టైమ్లో కాంబో వ్యూహాన్ని నవీకరించడం (ప్రాధాన్యత/వెయిటెడ్/ఆటో/మొదలైనవి)                                                   |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` రెసిలియెన్స్ ప్రీసెట్ను వర్తింపజేయడం                                            |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | నిజమైన అప్స్ట్రీమ్ కాల్ను ఉపయోగించి కాంబోలోని ప్రతి ప్రొవైడర్ను ప్రత్యక్షంగా పరీక్షించడం                                   |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 లేటెన్సీ మరియు సర్క్యూట్ బ్రేకర్ స్థితితో ప్రతి ప్రొవైడర్కు సంబంధించిన మెట్రిక్లు                              |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | బడ్జెట్/లేటెన్సీ పరిమితులతో టాస్క్ రకం ఆధారంగా కాంబోను సిఫార్సు చేయడం                                                      |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | అభ్యర్థనను ఒక ప్రొవైడర్కు ఎందుకు రూట్ చేశారో వివరించడం (స్కోరింగ్ కారకాలు + ఫాల్బ్యాక్లు)                                  |
| `omniroute_get_session_snapshot`   | `read:usage`                         | పూర్తి సెషన్ స్నాప్షాట్: ఖర్చు, టోకెన్లు, అగ్ర మోడల్లు/ప్రొవైడర్లు, లోపాలు, బడ్జెట్ గార్డ్                                 |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | విచ్ఛిన్నమైన కాంబో రిఫరెన్స్లు/అనాథ రోలు వంటి డేటాబేస్ డ్రిఫ్ట్ను నిర్ధారించడం (మరియు ఐచ్ఛికంగా స్వయంచాలకంగా రిపేర్ చేయడం) |
| `omniroute_sync_pricing`           | `pricing:write`                      | బాహ్య మూలాల (LiteLLM) నుండి ధరల డేటాను సింక్ చేయడం; `dryRun`కు మద్దతు ఉంది                                                 |

## క్యాష్ సాధనాలు (2)

| సాధనం                   | స్కోప్లు      | వివరణ                                                              |
| :---------------------- | :------------ | :----------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | సెమాంటిక్ క్యాష్, ప్రాంప్ట్ క్యాష్ మరియు ఐడెంపొటెన్సీ గణాంకాలు     |
| `omniroute_cache_flush` | `write:cache` | ప్రపంచవ్యాప్తంగా లేదా సిగ్నేచర్/మోడల్ ఆధారంగా క్యాష్ను ఫ్లష్ చేయడం |

## కంప్రెషన్ సాధనాలు (13)

| సాధనం                               | స్కోప్లు            | వివరణ                                                                                                                        |
| :---------------------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | కంప్రెషన్ సెట్టింగ్లు, అనలిటిక్స్ సారాంశం మరియు క్యాష్-అవేర్ గణాంకాలు (`analytics.mcpDescriptionCompression` మెటాడేటాతో సహా) |
| `omniroute_compression_configure`   | `write:compression` | కంప్రెషన్ మోడ్, థ్రెషోల్డ్, లక్ష్య నిష్పత్తి, సిస్టమ్-ప్రాంప్ట్ సంరక్షణ మరియు MCP వివరణ కంప్రెషన్ టాగుల్ను కాన్ఫిగర్ చేయడం   |
| `omniroute_set_compression_engine`  | `write:compression` | సక్రియ ఇంజిన్ను (off/caveman/rtk/stacked) మరియు Caveman/RTK తీవ్రతను ఎంచుకోవడం                                               |
| `omniroute_list_compression_combos` | `read:compression`  | పేరు పెట్టిన కంప్రెషన్ కాంబోలు మరియు వాటి ఇంజిన్ పైప్లైన్లను జాబితా చేయడం                                                    |
| `omniroute_compression_combo_stats` | `read:compression`  | కంప్రెషన్ కాంబో మరియు ఇంజిన్ ఆధారంగా సమూహీకరించిన అనలిటిక్స్                                                                 |
| `omniroute_ccr_store`               | `write:compression` | పరిమిత ఇన్-మెమరీ CCR స్టోర్లో కాలర్-ఐసోలేటెడ్ కంటెంట్ను నిల్వ చేసి, మార్కర్తో పాటు `ccr://` రిఫరెన్స్ను తిరిగి ఇవ్వడం        |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR కంటెంట్ను పూర్తిగా లేదా హెడ్, టెయిల్, లైన్లు, grep మరియు గణాంకాల మోడ్లతో తిరిగి పొందడం                                   |
| `omniroute_ccr_inspect`             | `read:compression`  | కంటెంట్ను తిరిగి ఇవ్వకుండా కాలర్కు చెందిన CCR మెటాడేటాను పరిశీలించడం                                                         |
| `omniroute_ccr_list`                | `read:compression`  | కాలర్కు చెందిన CCR బ్లాక్ల పేజినేటెడ్ మెటాడేటాను జాబితా చేయడం                                                                |
| `omniroute_ccr_delete`              | `write:compression` | కాలర్కు చెందిన CCR బ్లాక్ను తొలగించడం                                                                                        |
| `omniroute_ccr_stats`               | `read:compression`  | కాలర్-స్కోప్డ్ మెమరీ వినియోగం, లైఫ్సైకిల్ కౌంటర్లు మరియు స్టోర్ పరిమితులను నివేదించడం                                        |
| `omniroute_rtk_discover`            | `read:compression`  | ఆప్ట్-ఇన్ RTK అవుట్పుట్ నమూనాల్లో పునరావృతమయ్యే నాయిస్ను గుర్తించడం                                                          |
| `omniroute_rtk_learn`               | `read:compression`  | ఆప్ట్-ఇన్ నమూనాల నుండి సమీక్షించదగిన RTK ఫిల్టర్ డ్రాఫ్ట్ను రూపొందించడం                                                      |

CCR ఎంట్రీలు ఇన్-మెమరీలో మాత్రమే ఉంటాయి మరియు రీస్టార్ట్ చేసినప్పుడు అదృశ్యమవుతాయి. ప్రతి బ్లాక్ 2 MiBకు, ప్రతి
ప్రిన్సిపల్ 16 MiBకు మరియు గ్లోబల్ స్టోర్ 64 MiBకు పరిమితం చేయబడ్డాయి. ఎంట్రీలకు డిఫాల్ట్గా 24 గంటల TTL ఉంటుంది (గరిష్ఠంగా
ఏడు రోజులు). పూర్తి MCP రిట్రీవల్ 256 KiBకు పరిమితం చేయబడింది; పెద్ద బ్లాక్లు రేంజ్డ్ మరియు
grep మోడ్ల ద్వారా అందుబాటులో ఉంటాయి. నిల్వ, రిట్రీవల్, జాబితా, తనిఖీ, తొలగింపు మరియు గణాంకాలు
ప్రామాణీకరించబడిన API-key ప్రిన్సిపల్ ఆధారంగా వేరు చేయబడతాయి. ఆడిట్ రికార్డులు హ్యాష్లు మరియు పరిమాణ మెటాడేటాను మాత్రమే కలిగి ఉంటాయి, కంటెంట్ను ఎప్పుడూ కలిగి ఉండవు.

`omniroute_compression_status`, MCP వివరణ కంప్రెషన్ను
`analytics.mcpDescriptionCompression` కింద విడిగా నివేదిస్తుంది. ఆ విలువలు MCPలో జాబితా చేయగల
వివరణల (`tools`, `prompts`, `resources`, మరియు `resourceTemplates`) మెటాడేటా-పరిమాణ అంచనాలు; అవి ప్రొవైడర్ వినియోగ
రసీదులు కావు మరియు `source: "mcp_metadata_estimate"`తో గుర్తించబడతాయి.

### MCP యాక్సెసిబిలిటీ ట్రీ ఫిల్టర్ (v3.8.0)

పైన పేర్కొన్న కంప్రెషన్ టూల్స్కు వేరుగా, OmniRoute ఒక పోస్ట్-ఎగ్జిక్యూషన్ ఫిల్టర్ను కలిగి ఉంటుంది, ఇది MCP బ్రౌజర్/యాక్సెసిబిలిటీ టూల్స్ యొక్క **టూల్ ఫలితాలను** ఏజెంట్కు తిరిగి పంపే ముందు కంప్రెస్ చేస్తుంది. ఈ ఫిల్టర్ స్వయంగా ఒక టూల్ కాదు — విస్తృతమైన యాక్సెసిబిలిటీ-ట్రీ లేదా బ్రౌజర్-స్నాప్షాట్ టెక్స్ట్ (≥2000 అక్షరాలు) కలిగిన ఏ టూల్ ఫలితంపైనైనా ఇది పారదర్శకంగా అమలవుతుంది.

ముఖ్య ప్రవర్తనలు:

- వరుసగా ≥30 సార్లు పునరావృతమయ్యే సహోదర లైన్లను ప్రారంభం + ముగింపు సారాంశంగా కుదిస్తుంది
- Playwright/computer-useకు అవసరమైన `[ref=eXX]` యాంకర్లను సంరక్షిస్తుంది
- పరిమితికి మించిన టెక్స్ట్ను (>50,000 అక్షరాలు) నావిగేషన్ సూచనతో తప్పనిసరిగా కుదిస్తుంది
- అంచనా ఆదా: బ్రౌజర్ స్నాప్షాట్ పేలోడ్లపై **60–80%**

కాన్ఫిగరేషన్: గ్లోబల్ సెట్టింగ్లలో `compression.mcpAccessibility` (మైగ్రేషన్ 056).
ఇంప్లిమెంటేషన్: `open-sse/services/compression/engines/mcpAccessibility/`.
పూర్తి డాక్యుమెంటేషన్: [కంప్రెషన్ ఇంజిన్లు — MCP యాక్సెసిబిలిటీ ట్రీ ఫిల్టర్](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

ఈ టూల్స్ వెనుక ఉన్న రన్టైమ్ కంప్రెషన్ మోడల్ కోసం [కంప్రెషన్ ఇంజిన్లు](../compression/COMPRESSION_ENGINES.md) మరియు [RTK కంప్రెషన్](../compression/RTK_COMPRESSION.md) చూడండి.

## 1Proxy సాధనాలు (3)

| సాధనం                       | స్కోప్లు       | వివరణ                                                                                           |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy మార్కెట్ప్లేస్ నుండి ఉచిత ప్రాక్సీలను పొందండి (ప్రోటోకాల్/దేశం/నాణ్యత/పరిమితి ఫిల్టర్లు) |
| `omniroute_oneproxy_rotate` | `read:proxies` | వ్యూహం ఆధారంగా తదుపరి అందుబాటులో ఉన్న ప్రాక్సీని పొందండి (`random` / `quality` / `sequential`)  |
| `omniroute_oneproxy_stats`  | `read:proxies` | పూల్ గణాంకాలు, సింక్ స్థితి, ప్రోటోకాల్ మరియు దేశం వారీ పంపిణీ                                  |

## మెమరీ సాధనాలు (3)

`open-sse/mcp-server/tools/memoryTools.ts`లో నిర్వచించబడ్డాయి. ప్రామాణీకరణ/స్కోప్ ప్రామాణిక MCP స్కోప్ పైప్లైన్ ద్వారా అమలు చేయబడుతుంది.

| సాధనం                     | స్కోప్లు       | వివరణ                                                                                                     |
| :------------------------ | :------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | టోకెన్-బడ్జెట్ అమలుతో క్వెరీ / రకం / API కీ ఆధారంగా మెమరీలను శోధించండి                                    |
| `omniroute_memory_add`    | `write:memory` | కొత్త మెమరీ ఎంట్రీని జోడించండి (`factual` / `episodic` / `procedural` / `semantic`)                       |
| `omniroute_memory_clear`  | `write:memory` | API కీకి సంబంధించిన మెమరీలను తొలగించండి; అవసరమైతే రకం లేదా `olderThan` టైమ్స్టాంప్ ఆధారంగా ఫిల్టర్ చేయండి |

## స్కిల్ సాధనాలు (4)

`open-sse/mcp-server/tools/skillTools.ts`లో నిర్వచించబడ్డాయి. `src/lib/skills/registry` + `src/lib/skills/executor` ద్వారా మద్దతు పొందుతాయి.

| సాధనం                         | స్కోప్లు         | వివరణ                                                                                              |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API కీ, పేరు లేదా ప్రారంభించబడిన స్థితి ఆధారంగా ఐచ్ఛిక ఫిల్టరింగ్తో నమోదైన స్కిల్లను జాబితా చేయండి |
| `omniroute_skills_enable`     | `write:skills`   | ID ఆధారంగా నిర్దిష్ట స్కిల్ను ప్రారంభించండి లేదా నిలిపివేయండి                                      |
| `omniroute_skills_execute`    | `execute:skills` | అందించిన ఇన్పుట్తో స్కిల్ను అమలు చేసి, అమలు రికార్డును తిరిగి ఇవ్వండి                              |
| `omniroute_skills_executions` | `read:skills`    | ఇటీవలి స్కిల్ అమలు చరిత్రను జాబితా చేయండి                                                          |

## Notion సందర్భ మూలం (6)

`open-sse/mcp-server/tools/notionTools.ts`లో నిర్వచించబడింది. టోకెన్ `src/lib/db/notion.ts` ద్వారా `key_value` పట్టికలో నిల్వ చేయబడుతుంది. REST క్లయింట్ `src/lib/notion/api.ts`లో ఉంది. సెట్టింగ్ల API `src/app/api/settings/notion/route.ts`లో ఉంది. డ్యాష్బోర్డ్ UI `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`లో ఉంది.

Endpoint డ్యాష్బోర్డ్లోని **సందర్భ మూలాలు** ట్యాబ్ నుండి లేదా REST API ద్వారా మీ Notion ఇంటిగ్రేషన్ టోకెన్ను కాన్ఫిగర్ చేయండి:

```bash
# టోకెన్ను సెట్ చేయండి
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# స్థితిని తనిఖీ చేయండి
curl http://localhost:20128/api/settings/notion

# డిస్కనెక్ట్ చేయండి
curl -X DELETE http://localhost:20128/api/settings/notion
```

| సాధనం                        | స్కోప్లు       | వివరణ                                                                        |
| :--------------------------- | :------------- | :--------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | అన్ని పేజీలు మరియు డేటాబేస్లలో పూర్తి-పాఠ్య శోధన చేయండి                      |
| `notion_get_page`            | `read:notion`  | పేజీని దాని లక్షణాలతో సహా ID ద్వారా పొందండి                                  |
| `notion_list_block_children` | `read:notion`  | పేజీ లేదా బ్లాక్కు చెందిన చైల్డ్ బ్లాక్లను జాబితా చేయండి                     |
| `notion_query_database`      | `read:notion`  | ఫిల్టర్లు, క్రమబద్ధీకరణలు మరియు పేజినేషన్తో డేటాబేస్ను క్వెరీ చేయండి         |
| `notion_get_database`        | `read:notion`  | ID ద్వారా డేటాబేస్ స్కీమాను పొందండి                                          |
| `notion_append_blocks`       | `write:notion` | పేరెంట్ బ్లాక్కు చైల్డ్ బ్లాక్లను జోడించండి (ఒక్కో అభ్యర్థనకు గరిష్ఠంగా 100) |

## ఏజెంట్ స్కిల్ కాటలాగ్ టూల్స్ (3)

`open-sse/mcp-server/tools/agentSkillTools.ts`లో నిర్వచించబడ్డాయి. `src/lib/agentSkills/catalog` మద్దతుతో పనిచేస్తాయి. ఈ టూల్స్ 45-ఎంట్రీల ఏజెంట్ స్కిల్స్ డాక్యుమెంటేషన్ కాటలాగ్ను MCP క్లయింట్లు మరియు బాహ్య ఏజెంట్లకు అందుబాటులో ఉంచుతాయి. స్కోప్: `read:catalog`.

| టూల్                              | స్కోప్లు       | వివరణ                                                                                                                                               |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | ఐచ్ఛిక `category` (api\|cli) మరియు `area` ఫిల్టర్లతో మొత్తం 45 ఏజెంట్ స్కిల్స్ను జాబితా చేస్తుంది; మెటాడేటా + కవరేజ్ను అందిస్తుంది                  |
| `omniroute_agent_skills_get`      | `read:catalog` | కానానికల్ `id` ఆధారంగా ఒకే స్కిల్కు సంబంధించిన పూర్తి మెటాడేటా + SKILL.md కంటెంట్ను పొందుతుంది                                                      |
| `omniroute_agent_skills_coverage` | `read:catalog` | కవరేజ్ గణాంకాలు: కాటలాగ్ మొత్తాలతో పోలిస్తే 23 API, 21 CLI మరియు 1 config స్కిల్స్లో ఎన్ని ఫైల్సిస్టమ్లో SKILL.md ఫైళ్లను కలిగి ఉన్నాయో చూపిస్తుంది |

పూర్తి కాటలాగ్ మరియు బాహ్య ఏజెంట్లు దాన్ని ఎలా వినియోగిస్తాయో తెలుసుకోవడానికి [AGENT-SKILLS.md](./AGENT-SKILLS.md) చూడండి.

## సంబంధిత ఫ్రేమ్వర్క్లు (v3.8.0)

పైన ఉన్న MCP టూల్ ఇన్వెంటరీ (110 ప్రత్యేక టూల్స్, `countUniqueMcpTools()` ద్వారా లెక్కించబడింది) ఉద్దేశపూర్వకంగా
రన్టైమ్ రూటింగ్/క్యాష్/కంప్రెషన్/మెమరీ/స్కిల్స్/ప్రాక్సీ/కాంటెక్స్ట్-సోర్స్ కార్యకలాపాలకు పరిమితం చేయబడింది. v3.8.0లో MCP సర్వర్తో పాటు రెండు అనుబంధ
ఫ్రేమ్వర్క్లు అందించబడతాయి మరియు అవి విడిగా డాక్యుమెంట్ చేయబడ్డాయి:

### క్లౌడ్ ఏజెంట్లు

క్లౌడ్ ఏజెంట్లు అనేవి LLM ప్రొవైడర్ల కోసం ఉపయోగించే అదే కనెక్షన్ మోడల్ ద్వారా
OmniRouteకు అనుసంధానించబడిన అవుట్-ఆఫ్-ప్రాసెస్ AI కోడింగ్ ఏజెంట్లు (codex-cloud, cursor-cloud, devin, jules). అవి
వాటి స్వంత REST సర్ఫేస్ (`/api/v1/agents/*`) ద్వారా అందుబాటులో ఉంటాయి మరియు MCP టూల్ కాటలాగ్లో భాగం **కావు**
— క్లౌడ్ ఏజెంట్ను కాల్ చేయడం MCP స్కోప్ను వినియోగించదు.

- అమలు: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- లైఫ్సైకిల్: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- డాక్యుమెంటేషన్: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### గార్డ్రైల్స్

గార్డ్రైల్స్ అనేవి చాట్ పైప్లైన్లో వర్తింపజేయబడే ప్రీ/పోస్ట్-ఎగ్జిక్యూషన్ ఫిల్టర్లు (vision-bridge, pii-masker, prompt-injection).
MCP టూల్/రూట్ లేయర్ను చేరుకోవడానికి ముందే అవి అమలై, ఆడిట్ పైప్లైన్కు నిర్మిత ఉల్లంఘనలను విడుదల చేస్తాయి; వాటిని MCP టూల్స్గా ఆహ్వానించరు.

- అమలు: `src/lib/guardrails/`.
- డాక్యుమెంటేషన్: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

బ్లాక్ అయినట్లు కనిపించే MCP కాల్ను డీబగ్ చేస్తున్నప్పుడు, MCP ఆడిట్ లాగ్
(`scope_denied:*` ఎంట్రీలు) మరియు గార్డ్రైల్స్ ఆడిట్ ట్రయిల్ రెండింటినీ తనిఖీ చేయండి — అభ్యర్థన MCP స్కోప్ అమలు లేయర్ను చేరుకోవడానికి
**ముందే** గార్డ్రైల్ ద్వారా తిరస్కరించబడవచ్చు.

---

## REST API ఎండ్పాయింట్లు

| ఎండ్పాయింట్            | మెథడ్                 | వివరణ                                                                                                     | ప్రమాణీకరణ              |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------- | :---------------------- |
| `/api/mcp/status`      | `GET`                 | సర్వర్ స్థితి: హార్ట్బీట్, HTTP ట్రాన్స్పోర్ట్ స్థితి, ఆడిట్ యాక్టివిటీ సారాంశం                           | నిర్వహణ (సెషన్/అడ్మిన్) |
| `/api/mcp/tools`       | `GET`                 | టూల్ కాటలాగ్ (పేరు, వివరణ, స్కోప్లు, దశ, సోర్స్ ఎండ్పాయింట్లు)                                            | నిర్వహణ                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ట్రాన్స్పోర్ట్ ఎండ్పాయింట్ (`mcpEnabled` + `mcpTransport === "sse"` ద్వారా నియంత్రించబడుతుంది)        | API కీ + స్కోప్లు       |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | స్ట్రీమ్ చేయగల HTTP ట్రాన్స్పోర్ట్ (`mcp-session-id` హెడర్ను ఉపయోగిస్తుంది; `DELETE` సెషన్ను ముగిస్తుంది) | API కీ + స్కోప్లు       |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` నుండి ఆడిట్ లాగ్ ఎంట్రీలు (ఫిల్టర్లు: `limit`, `offset`, `tool`, `success`, `apiKeyId`)  | నిర్వహణ                 |
| `/api/mcp/audit/stats` | `GET`                 | సమగ్ర ఆడిట్ గణాంకాలు (`totalCalls`, `successRate`, `avgDurationMs`, అగ్ర టూల్స్)                          | నిర్వహణ                 |

సోర్స్ ఫైళ్లు: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

సెట్టింగ్లలో MCP సర్వర్ ప్రారంభించబడే వరకు (`mcpEnabled`) మరియు తగిన `mcpTransport` ఎంచుకోబడే వరకు SSE మరియు స్ట్రీమ్ చేయగల HTTP ట్రాన్స్పోర్ట్లు రెండూ బ్లాక్ చేయబడతాయి. తప్పు ట్రాన్స్పోర్ట్ కాన్ఫిగర్ చేయబడితే, సెట్టింగ్లను మార్చమనే సూచనతో రూట్ HTTP 400ను తిరిగి ఇస్తుంది.

---

## ప్రమాణీకరణ & స్కోప్లు

MCP సాధనం కాలర్ నుండి స్కోప్ స్ట్రింగ్లను చదువుతుంది. ఆ తనిఖీ మూడు స్వతంత్ర నేమ్స్పేస్లలో ఒకటి. ఒక చెకర్ నుండి పాస్ అనేది ఇతరుల నుండి పాస్ కాదు. నియమాలు [మూడు స్కోప్ నేమ్స్పేస్లు](#three-scope-namespaces). సాధన కేటలాగ్ [MCP సాధన స్కోప్లు](#mcp-tool-scopes).

### మూడు స్కోప్ నేమ్స్పేస్లు

ఒక API కీపై `manage`, ఒక MCP సాధనంపై `read:compression`, మరియు ఒక `oma_live_…` యాక్సెస్ టోకెన్పై `read` అనేవి మూడు విభిన్న అనుమతులు. మ్యూటేటింగ్ మేనేజ్మెంట్ రూట్కు `read` యాక్సెస్ టోకెన్ను పంపే కాలర్లు HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` పొందుతారు. ఆ ర్యాంక్ `scopeSatisfies`. ఇది MCP పట్టికను సంప్రదించదు, మరియు MCP మ్యాచర్ దానిని సంప్రదించదు.

| నేమ్స్పేస్        | క్రెడెన్షియల్                                                   | చెకర్                     | పాస్ అనుమతిస్తుంది                                       |
| :---------------- | :-------------------------------------------------------------- | :------------------------ | :------------------------------------------------------- |
| API-కీ నిర్వహణ    | `api_keys.scopes`                                               | `hasManageScope`          | ఆ బేరర్ కీ కోసం నిర్వహణ REST                             |
| API-కీ అడిటివ్    | అదే శ్రేణి, ఒక ఖచ్చితమైన స్ట్రింగ్                              | క్రింద పేర్కొన్న సహాయకుడు | ఆ ఒక్క సామర్థ్యం మాత్రమే                                 |
| MCP సాధన స్కోప్లు | అదే శ్రేణి, లేకపోతే MCP `_meta`, లేకపోతే `OMNIROUTE_MCP_SCOPES` | `scopeMatches`            | ఆ సాధనం, అమలు ఆన్ అయిన తర్వాత                            |
| యాక్సెస్ టోకెన్   | `oma_live_…`                                                    | `scopeSatisfies`          | దాని పద్ధతి మరియు మార్గం ఆ ర్యాంక్ను కోరే నిర్వహణ మార్గం |

ప్రతి క్రెడెన్షియల్ను మింట్ చేయడం [నిర్వహణ ప్రమాణీకరణ](../guides/MANAGEMENT-AUTH.md)లో కవర్ చేయబడింది.

#### API-కీ స్కోప్లు

ఒక `api_keys.scopes` శ్రేణి రెండు పనులకు ఉపయోగపడుతుంది. అవి వేర్వేరు ఫంక్షన్లను ఉపయోగిస్తాయి.

**నిర్వహణ REST.** `manage` మరియు `admin` అనేవి `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) సభ్యులు. `hasManageScope` అనేది ఆ కీ కోసం నిర్వహణ మార్గాలను అధికారం చేస్తుంది. `admin` అనేది ఆ మార్గాలపై నిర్వహణ-సామర్థ్యం కలిగి ఉంటుంది. ఇక్కడ `admin` అనే పదం యాక్సెస్-టోకెన్ ర్యాంక్ కాదు మరియు అది MCP సాధన స్కోప్లలోకి విస్తరించదు.

**అడిటివ్ స్ట్రింగ్లు.** ప్రతి ఒక్కటి ఖచ్చితమైన సభ్యత్వ పరీక్ష, మరియు ప్రతి ఒక్కటి `MANAGEMENT_API_KEY_SCOPES` వెలుపల ఉంటుంది.

| స్కోప్                         | పాస్ అనుమతిస్తుంది                                                                                                                                                         |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | నాన్-లూప్బ్యాక్ `/api/mcp/` LOCAL_ONLY కార్వ్-అవుట్ మాత్రమే (`hasMcpConnectOrManageScope`). `manage` లేదా `admin` ఉన్న కీ ఇప్పటికీ ఆ కార్వ్-అవుట్ను పాస్ చేస్తుంది.        |
| `self:usage`                   | ఈ కీ కోసం `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` సృష్టించేటప్పుడు ఈ స్కోప్ను జోడిస్తుంది (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | ఆ స్థితి పేలోడ్ లోపల అప్స్ట్రీమ్ ఖాతా కోటాలు (`src/lib/usage/apiKeySelfService.ts`). స్థితి మార్గం ఇప్పటికీ `self:usage` అవసరం.                                            |
| `policy:bypass-provider-quota` | ఈ కీ యొక్క ఇన్ఫరెన్స్ కాల్స్ ప్రొవైడర్-కోటా పాలసీని దాటవేస్తాయి (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`).                                             |

#### సరిపోల్చడం

కేటలాగ్ [MCP సాధన స్కోప్లు](#mcp-tool-scopes) కింద ఉన్న పట్టిక. `src/shared/constants/mcpScopes.ts`లోని `MCP_SCOPE_LIST`ను ఆ కేటలాగ్గా పరిగణించవద్దు: ఇది అసలు టైప్ చేయబడిన ఉపసమితి. తర్వాతి సాధనాలు దాని పక్కన మరిన్ని స్కోప్లను ప్రకటిస్తాయి (`read:notion`, `read:skills`, `read:local-corpus`, మరియు పట్టికలోని మిగిలినవి).

`open-sse/mcp-server/scopeEnforcement.ts`లోని `evaluateToolScopes` ప్రతి అవసరమైన స్కోప్ కొన్ని మంజూరు చేయబడిన స్కోప్తో సరిపోలినప్పుడు కాల్ను అనుమతిస్తుంది:

- `*` ప్రతి అవసరమైన స్కోప్తో సరిపోలుతుంది.
- `*`తో ముగిసే మంజూరు చేయబడిన స్కోప్ నక్షత్రానికి ముందు ఉన్న ప్రిఫిక్స్తో ప్రారంభమయ్యే అవసరమైన స్కోప్తో సరిపోలుతుంది. `read:*` `read:compression`తో సరిపోలుతుంది.
- ప్రతి ఇతర మంజూరు చేయబడిన స్కోప్ ఒకే అవసరమైన స్ట్రింగ్తో మాత్రమే సరిపోలుతుంది.

`["manage"]` స్కోప్లు ఉన్న కీ `read:compression` కోసం `scopeMatches`లో విఫలమవుతుంది. `admin`, `mcp:connect`, `read`, మరియు `write` మాత్రమే మంజూరు చేయబడిన స్ట్రింగ్లు అయినప్పుడు అదే కాల్ విఫలమవుతుంది. ట్రైలింగ్ `*`కు మించి MCP సాధన స్కోప్ల మధ్య ఎటువంటి క్రమానుగత సంబంధం లేదు.

`OMNIROUTE_MCP_ENFORCE_SCOPES=true` (డిఫాల్ట్ `false`) అయితే తప్ప అమలు ఆఫ్ చేయబడుతుంది. అది ఆఫ్ అయినప్పుడు, `evaluateToolScopes` కాల్ను అనుమతిస్తుంది మరియు కేటలాగ్ను దాటవేస్తుంది. అది ఆన్ అయినప్పుడు, HTTP బేరర్ కీ యొక్క `api_keys.scopes`ను `authInfo`గా ఉపయోగిస్తుంది ([ప్రతి-కీ HTTP స్కోప్ బైండింగ్](#per-key-http-scope-binding-7895) చూడండి). కీ స్కోప్లు పరిష్కరించబడనప్పుడు, మంజూరు చేయబడిన సమితి MCP `_meta`కు, ఆపై `OMNIROUTE_MCP_SCOPES`కు వస్తుంది.

#### యాక్సెస్-టోకెన్ స్కోప్లు

`oma_live_…` టోకెన్లు (`src/lib/accessTokens/scopes.ts`) `read`, `write`, లేదా `admin`ను కలిగి ఉంటాయి. `scopeSatisfies` అనేది ఒక ర్యాంక్: `admin` `write` మరియు `read`ను కవర్ చేస్తుంది, మరియు `write` `read`ను కవర్ చేస్తుంది. తెలియని స్కోప్లు దేనినీ కవర్ చేయవు.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ఆ ర్యాంక్ను `inferRequiredScope` (`src/server/authz/accessScopes.ts`)తో పోలుస్తుంది:

- `GET`, `HEAD`, మరియు `OPTIONS`కు `read` అవసరం.
- ప్రతి ఇతర పద్ధతికి `write` అవసరం.
- `ADMIN_SCOPE_PREFIXES`లోని మార్గాలకు ప్రతి పద్ధతికి `admin` అవసరం. `/api/mcp` ఆ జాబితాలో ఉంది, కాబట్టి `write` యాక్సెస్ టోకెన్ ఇప్పటికీ MCP HTTP ఉపరితలాన్ని కాల్ చేయదు.
- `ADMIN_MUTATION_PREFIXES`లోని మార్గాలకు మ్యూటేషన్లకు మాత్రమే `admin` అవసరం.

`PATCH /api/keys/{id}` అనేది ఒక మ్యుటేషన్ మరియు ఆ అడ్మిన్ జాబితాలలో లేదు, కాబట్టి ఒక `read` టోకెన్ 403ని అందుకుంటుంది.
`యాక్సెస్ టోకెన్ స్కోప్ 'read' సరిపోదు; 'write' అవసరం.`
ఒక `write` లేదా `admin` యాక్సెస్ టోకెన్ ఆ రూట్ను సంతృప్తిపరుస్తుంది. ఒక డాష్బోర్డ్ JWT, లూప్బ్యాక్ CLI మెషిన్-ఐడి టోకెన్, మరియు `manage` లేదా `admin` ఉన్న API కీ ఇతర బ్రాంచ్లను తీసుకుంటాయి మరియు ఈ ర్యాంక్ ద్వారా పరిమితం చేయబడవు.

`/api/mcp` కోసం `scopeSatisfies`ని పాస్ చేసే యాక్సెస్ టోకెన్ మేనేజ్మెంట్ గేట్ను మాత్రమే క్లియర్ చేసింది. టూల్ కాల్స్ ఇప్పటికీ API-కీ స్కోప్లకు వ్యతిరేకంగా `scopeMatches`ని అమలు చేస్తాయి. యాక్సెస్-టోకెన్ ర్యాంక్ `scopeMatches`కి ఇన్పుట్ కాదు.

### MCP టూల్ స్కోప్లు

స్కోప్ ఎన్ఫోర్స్మెంట్ `open-sse/mcp-server/scopeEnforcement.ts`లో కేంద్రీకరించబడింది.
ప్రతి టూల్కు నిర్దిష్ట స్కోప్లు అవసరం:

| పరిధి                 | ఉపకరణాలు                                                                                                                                                                      |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                             |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                     |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                        |
| `read:quota`          | `check_quota`                                                                                                                                                                 |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                        |
| `read:models`         | `list_models_catalog`                                                                                                                                                         |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                 |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                         |
| `write:budget`        | `set_budget_guard`                                                                                                                                                            |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                   |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                |
| `read:cache`          | `cache_stats`                                                                                                                                                                 |
| `write:cache`         | `cache_flush`                                                                                                                                                                 |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                    |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                             |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                         |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                              |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                        |
| `read:memory`         | `memory_search`                                                                                                                                                               |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                  |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                            |
| `write:skills`        | `skills_enable`                                                                                                                                                               |
| `execute:skills`      | `skills_execute`                                                                                                                                                              |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                              |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                       |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                     |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                              |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                            |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                               |
| `read:obsidian`       | 13 రీడ్ టూల్స్ — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 రైట్ టూల్స్ — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                             |

వైల్డ్కార్డ్ స్కోప్లు మద్దతు ఇవ్వబడతాయి: `read:*` అన్ని రీడ్-స్కోప్లను మంజూరు చేస్తుంది, `*` పూర్తి ప్రాప్యతను మంజూరు చేస్తుంది.

### `mcp:connect` — ఇరుకైన రూట్ సామర్థ్యం (#7895)

HTTP/SSE MCP రవాణా (`/api/mcp/*`) ను నాన్-లూప్బ్యాక్ నుండి చేరుకోవడానికి `/api/mcp/` LOCAL_ONLY కార్వ్-అవుట్ అవసరం (చూడండి `docs/security/ROUTE_GUARD_TIERS.md`). చారిత్రాత్మకంగా ఆ కార్వ్-అవుట్ పూర్తి `manage`/`admin`-స్కోప్ API కీని మాత్రమే అంగీకరించింది — MCP తో మాత్రమే మాట్లాడాల్సిన కాలర్కు ఇది చాలా విస్తృతమైనది. `src/shared/constants/managementScopes.ts` ఇప్పుడు `MCP_CONNECT_SCOPE = "mcp:connect"` ను ఎగుమతి చేస్తుంది: ఇది ఒక అడిటివ్, ఇరుకైన స్కోప్ (`SELF_USAGE_SCOPE` వలె అదే పూర్వగామి) ఇది `src/server/authz/policies/management.ts` లోని `/api/mcp/` బైపాస్ను మాత్రమే అధికారం చేస్తుంది — ఇది ఇతర మేనేజ్మెంట్-రూట్ యాక్సెస్ను మంజూరు చేయదు మరియు `MANAGEMENT_API_KEY_SCOPES` నుండి ఉద్దేశపూర్వకంగా దూరంగా ఉంచబడింది. `manage`/`admin` కలిగి ఉన్న కీ ఇప్పటికీ కార్వ్-అవుట్ను మార్చకుండానే పాస్ చేస్తుంది; `mcp:connect` అనేది రిమోట్ MCP-మాత్రమే కాలర్ల కోసం తక్కువ-ప్రత్యేకాధికార ప్రత్యామ్నాయం, ఇది `hasMcpConnectOrManageScope()` ద్వారా తనిఖీ చేయబడుతుంది.

### ప్రతి-కీ HTTP స్కోప్ బైండింగ్ (#7895)

HTTP/SSE పై, `open-sse/mcp-server/httpTransport.ts` ఇప్పుడు కాలర్ యొక్క నిజమైన `api_keys.scopes` ను `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) ద్వారా పరిష్కరిస్తుంది మరియు దానిని MCP SDK యొక్క `transport.handleRequest(req, { authInfo })` కు పంపుతుంది, తద్వారా ప్రతి టూల్ కాల్ను చేరుకునే `extra.authInfo.scopes` బేరర్ కీ యొక్క స్వంత స్కోప్లను ప్రతిబింబిస్తుంది. `scopeEnforcement.ts` యొక్క `resolveCallerScopeContext()` ఇప్పటికే `_meta` మరియు `OMNIROUTE_MCP_SCOPES` env ఫాల్బ్యాక్ కంటే `authInfo` కు ప్రాధాన్యత ఇచ్చింది — ఇది గతంలో HTTP పై అన్ఫెడ్ చేయబడిన మొదటి, అత్యధిక-ప్రాధాన్యత మూలాన్ని మాత్రమే నింపుతుంది. API కీ పరిష్కరించబడనప్పుడు (హెడర్ లేదు, చెల్లని కీ), `authInfo` నిర్వచించబడకుండా ఉంటుంది మరియు పరిష్కారం ఇప్పటికే ఉన్న `meta`/env చైన్ ద్వారా మార్చకుండానే కొనసాగుతుంది. ఇది `OMNIROUTE_MCP_ENFORCE_SCOPES` యొక్క డిఫాల్ట్ను తిప్పికొట్టదు — అమలు ఇప్పటికీ స్పష్టంగా ప్రారంభించబడాలి; ఈ మార్పు అది ప్రారంభించబడిన తర్వాత ప్రతి-కీ మార్గాన్ని ప్రాధాన్యతనిస్తుంది. stdio కు ప్రతి-కాలర్ గుర్తింపు లేదు (`mcpCallerIdentity.ts` చూడండి) మరియు ప్రభావితం కాదు — ఇది `_meta`/env ఫాల్బ్యాక్ చైన్లోనే ఉంటుంది.

---

## పర్యావరణ చరరాశులు

| చరరాశి                                  | డిఫాల్ట్                                          | ఉద్దేశ్యం                                                                                                                                    |
| :-------------------------------------- | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                          | OmniRoute అంతర్గత APIలకు కాల్ చేసేటప్పుడు MCP సర్వర్ ఉపయోగించే మూల URL                                                                       |
| `OMNIROUTE_API_KEY`                     | (ఖాళీ)                                            | అంతర్గత API కాల్లకు `Authorization: Bearer`గా ఫార్వర్డ్ చేయబడే API కీ                                                                        |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` మాత్రమే దీన్ని ప్రారంభిస్తుంది) | ప్రారంభించినప్పుడు, లేని స్కోప్లు టూల్ కాల్లను తిరస్కరిస్తాయి మరియు ఆడిట్ లాగ్లో `scope_denied:<reason>`ను నమోదు చేస్తాయి                    |
| `OMNIROUTE_MCP_SCOPES`                  | (ఖాళీ)                                            | డిఫాల్ట్గా "అందుబాటులో ఉన్నవి"గా పరిగణించే స్కోప్ల కామాతో వేరు చేసిన అనుమతి జాబితా (కాలర్ తన స్వంత స్కోప్లను అందించనప్పుడు ఉపయోగించబడుతుంది) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (సెట్ చేయకపోతే = ఆన్)                             | `0/false/off/no`కు సెట్ చేసినప్పుడు, నమోదు సమయంలో MCP వివరణ కుదింపును నిలిపివేస్తుంది                                                        |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (సెట్ చేయకపోతే = ఆన్)                             | పైన పేర్కొన్న అదే టాగుల్కు ప్రత్యామ్నాయ అలియాస్                                                                                              |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                           | అంతర్గత నిర్వహణ రీడ్లకు (ఆరోగ్యం, స్థితిస్థాపకత, కాంబోలు, కోటా, వినియోగం) అబార్ట్ సమయ పరిమితి                                                |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                           | ప్రొవైడర్ కోసం వేచి ఉండే హాప్లకు (`route_request`, `web_search`, `web_fetch`) అబార్ట్ సమయ పరిమితి                                            |
| `MCP_TOOL_DENY`                         | (సెట్ చేయకపోతే = ఫిల్టర్ లేదు)                    | `tools/list` నుండి తొలగించాల్సిన టూల్ పేర్ల కామాతో వేరు చేసిన జాబితా (టూల్-కార్డినాలిటీ తగ్గింపు — క్రింద చూడండి)                            |
| `MCP_TOOL_ALLOW`                        | (సెట్ చేయకపోతే = ఫిల్టర్ లేదు)                    | ప్రత్యేకంగా ఉంచాల్సిన టూల్ పేర్ల కామాతో వేరు చేసిన జాబితా (అనుమతి-జాబితా మోడ్ — క్రింద చూడండి)                                               |
| `DATA_DIR`                              | `~/.omniroute`                                    | హార్ట్బీట్ ఫైల్ `${DATA_DIR}/runtime/mcp-heartbeat.json`కు వ్రాయబడుతుంది                                                                     |

---

## వివరణ కుదింపు

క్లయింట్లకు బహిర్గతమయ్యే మెటాడేటా పరిమాణాన్ని (తద్వారా ప్రాంప్ట్ కాంటెక్స్ట్ వ్యయాన్ని) తగ్గించడానికి, MCP టూల్, ప్రాంప్ట్ మరియు రిసోర్స్ రిజిస్ట్రీలు నమోదు/జాబితా సమయంలో వివరణలను కుదించగలవు. అమలు `open-sse/mcp-server/descriptionCompressor.ts`లో ఉంటుంది మరియు `createMcpServer()`లోని `compressMcpRegistryMetadata` ద్వారా MCP సర్వర్కు అనుసంధానించబడింది.

- నిర్మాణాత్మక కంటెంట్ మారకుండా ఉండేందుకు, సంరక్షిత-బ్లాక్ వెలికితీతతో (కోడ్ స్పాన్లు, ఫెన్స్డ్ బ్లాక్లు మొదలైనవి) Caveman నియమ సమితిని (`getRulesForContext("all", "full")`) ఉపయోగించి వివరణ టెక్స్ట్పై కుదింపు అమలవుతుంది.
- `key_value` సెట్టింగ్ల పట్టికలోని `compression.mcpDescriptionCompressionEnabled` విలువ ద్వారా ప్రతి డిప్లాయ్మెంట్కు టాగుల్ చేయండి (డిఫాల్ట్: ప్రారంభించబడింది) — UIలో **Analytics → MCP వివరణ కుదింపు**గా అందుబాటులో ఉంటుంది.
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` లేదా `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`లో ఏదో ఒకదాని ద్వారా ప్రాసెస్ అంతటా టాగుల్ చేయండి.
- రియల్ ప్రొవైడర్ వినియోగ రసీదుల నుండి వేరు చేసి గుర్తించడానికి, రియల్టైమ్ గణాంకాలు `analytics.mcpDescriptionCompression` కింద `omniroute_compression_status` ద్వారా అందుబాటులో ఉంటాయి మరియు వాటికి `source: "mcp_metadata_estimate"` ట్యాగ్ జోడించబడుతుంది.

---

## టూల్ కార్డినాలిటీ తగ్గింపు (F4.3)

వివరణ కంప్రెషన్ ప్రతి టూల్కు సంబంధించిన మెటాడేటాను కుదిస్తుంది; **టూల్-కార్డినాలిటీ తగ్గింపు** ప్రకటించబడే టూల్స్ _సంఖ్యను_ తగ్గించడం ద్వారా మరో అడుగు ముందుకు వెళ్తుంది. `tools/list` మానిఫెస్ట్లో తక్కువ టూల్స్ను ప్రకటించడం వల్ల, టూల్ కేటలాగ్ కోసం క్లయింట్ మోడల్ ప్రతి అభ్యర్థనకు చెల్లించే టోకెన్ వ్యయం తగ్గుతుంది ("లేయర్ 5" కంప్రెషన్). దీని అమలు `open-sse/mcp-server/toolCardinality.ts`లో (`reduceToolManifest`) ఒక స్వచ్ఛమైన, స్థితిరహిత ఫిల్టర్గా ఉంటుంది, అలాగే `createMcpServer()`లోని (`open-sse/mcp-server/server.ts`) రిజిస్ట్రేషన్ లూప్కు అనుసంధానించబడింది.

**ఎంచుకుంటేనే ప్రారంభమవుతుంది, డిఫాల్ట్గా ఆఫ్లో ఉంటుంది.** రెండు ఎన్విరాన్మెంట్ వేరియబుల్స్లో కనీసం ఒకటి సెట్ చేసినప్పుడు మాత్రమే ఫిల్టర్ అమలవుతుంది; రెండూ సెట్ చేయకపోతే, మొత్తం 110 టూల్స్ ఎలాంటి మార్పు లేకుండా ప్రకటించబడతాయి.

| వేరియబుల్        | మోడ్                                                                                             |
| :--------------- | :----------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | బ్లాక్లిస్ట్ — `tools/list` నుండి ఎల్లప్పుడూ తొలగించాల్సిన కామాలతో వేరు చేసిన టూల్ పేర్లు        |
| `MCP_TOOL_ALLOW` | అనుమతి జాబితా — కామాలతో వేరు చేసిన టూల్ పేర్లు; ఇవి మాత్రమే మిగులుతాయి, మిగతావన్నీ తొలగించబడతాయి |

`deny`కు `allow` కంటే ప్రాధాన్యం ఉంటుంది. పేర్లు కామాలతో వేరు చేయబడతాయి, వాటి అంచుల్లోని ఖాళీలు తొలగించబడతాయి, అలాగే ఖాళీ ఎంట్రీలు విస్మరించబడతాయి. ఉదాహరణలు:

```bash
# కేటలాగ్ నుండి రెండు టూల్స్ను తొలగించండి
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# రూటింగ్ + కోటా టూల్స్ను మాత్రమే ప్రకటించండి (అనుమతి-జాబితా మోడ్)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**ఫిల్టర్ చేసిన టూల్స్ ఎలా తొలగించబడతాయి:** రిజిస్ట్రేషన్ ఎల్లప్పుడూ విజయవంతమవుతుంది; ప్రొఫైల్ తిరస్కరించిన టూల్పై MCP SDK హ్యాండిల్లో `.disable()` అమలు చేయబడుతుంది, కాబట్టి అది `tools/list`లో ఎప్పటికీ కనిపించదు, అయితే వైరింగ్ యథాతథంగా ఉంటుంది (శుభ్రమైన ఎనేబుల్/డిసేబుల్, మళ్లీ రిజిస్ట్రేషన్ అవసరం లేదు). ప్రొఫైల్ పార్సర్ `readMcpToolProfileFromEnv(process.env)`; రెండు వేరియబుల్స్ ఖాళీగా ఉన్నప్పుడు ఇది `null`ను (ఫిల్టరింగ్ లేదు) అందిస్తుంది.

`reduceToolManifest` వెనుక ఉన్న మరింత సమృద్ధమైన `ToolProfile` ఆకృతి స్కోప్-ఇంటర్సెక్షన్ ఫిల్టరింగ్ (`allowScopes`, `read:*` తరహా వైల్డ్కార్డ్ మ్యాచింగ్తో) మరియు నిర్ధారిత `maxTools` పరిమితికి కూడా మద్దతు ఇస్తుంది. అయితే, ఆ రెండు నియంత్రణలకు రిజిస్ట్రేషన్ సమయంలో పూర్తి మానిఫెస్ట్ అవసరం అవుతుంది మరియు ప్రస్తుతం అవి ఎన్విరాన్మెంట్ వేరియబుల్స్ ద్వారా **అందుబాటులో లేవు** (`tools/list`-స్థాయి హుక్ను తదుపరి పనిగా ట్రాక్ చేస్తున్నారు). తగ్గింపుకు ముందు మరియు తరువాత మానిఫెస్ట్ టోకెన్ వ్యయాన్ని పోల్చడానికి `estimateManifestTokens()` అందుబాటులో ఉంది.

---

## రన్టైమ్ హార్ట్బీట్

stdio ట్రాన్స్పోర్ట్ ప్రతి 5 సెకన్లకు లైవ్నెస్ను `${DATA_DIR}/runtime/mcp-heartbeat.json`లో నిల్వ చేస్తుంది. డ్యాష్బోర్డ్ (`/api/mcp/status`) `online` స్థితిని నిర్ధారించడానికి ఈ ఫైల్తో పాటు PID లైవ్నెస్ను చదువుతుంది. దీనికి బదులుగా HTTP ట్రాన్స్పోర్ట్లు ఇన్-ప్రాసెస్ `getMcpHttpStatus()` నుండి స్థితిని నివేదిస్తాయి (ఫైల్ రైటింగ్ ఉండదు).

హార్ట్బీట్ స్నాప్షాట్లో ఇవి ఉంటాయి:

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

## ఆడిట్ లాగింగ్

ప్రతి టూల్ కాల్ `open-sse/mcp-server/audit.ts` ద్వారా SQLite `mcp_tool_audit` పట్టికలో లాగ్ చేయబడుతుంది:

- టూల్ పేరు, ఆర్గ్యుమెంట్లు (ప్రతి టూల్ `auditLevel` ప్రకారం హ్యాష్ చేయబడినవి/కుదించబడినవి), ఫలితం
- మిల్లీసెకన్లలో వ్యవధి, సఫలం/విఫలం ఫ్లాగ్, ఎర్రర్ సందేశం (వర్తించినప్పుడు)
- API కీ హ్యాష్, టైమ్స్టాంప్
- స్కోప్ తిరస్కరణలు, లోపించిన స్కోప్ల జాబితాతో `scope_denied:<reason>`గా లాగ్ చేయబడతాయి

ఇటీవలి కాల్స్ను పరిశీలించడానికి డ్యాష్బోర్డ్ లేదా `/api/mcp/audit` మరియు `/api/mcp/audit/stats` REST ఎండ్పాయింట్లను ఉపయోగించండి.

---

## ఫైళ్లు

| ఫైల్                                                                     | ప్రయోజనం                                                              |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP సర్వర్ ఫ్యాక్టరీ, stdio ఎంట్రీ పాయింట్, స్కోప్ చేసిన టూల్ నమోదులు |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ట్రాన్స్పోర్ట్ (సెషన్ నిర్వహణ)                  |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | టూల్ స్కోప్ మూల్యాంకనం మరియు కాలర్ నిర్ధారణ                           |
| `open-sse/mcp-server/audit.ts`                                           | టూల్ కాల్ ఆడిట్ లాగింగ్ (`mcp_tool_audit`)                            |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio హార్ట్బీట్ రైటర్ (`mcp-heartbeat.json`)                         |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | టూల్ / ప్రాంప్ట్ / రిసోర్స్ రిజిస్ట్రీల కోసం వివరణ కంప్రెషన్          |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod స్కీమాలు + టూల్ రిజిస్ట్రీ (`MCP_TOOLS`, 45 ఎంట్రీలు)             |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Phase 2 + క్యాష్ + 1proxy టూల్ హ్యాండ్లర్లు                           |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | కంప్రెషన్ టూల్ హ్యాండ్లర్లు                                           |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | మెమరీ టూల్ నిర్వచనాలు (3 టూల్స్)                                      |
| `open-sse/mcp-server/tools/skillTools.ts`                                | స్కిల్ టూల్ నిర్వచనాలు (4 టూల్స్)                                     |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion కాంటెక్స్ట్ సోర్స్ టూల్ నిర్వచనాలు (6 టూల్స్)                  |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | గేమిఫికేషన్ టూల్ నిర్వచనాలు (8 టూల్స్)                                |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | ప్లగిన్ నమోదు మరియు నిర్వహణ టూల్స్ (8 టూల్స్)                         |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` ఎండ్పాయింట్                                         |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` ఎండ్పాయింట్                                          |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE ట్రాన్స్పోర్ట్ రూట్                                |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP ట్రాన్స్పోర్ట్ రూట్                 |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` ఆడిట్ లాగ్ క్వెరీ                                    |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` సమగ్ర ఆడిట్ మెట్రిక్స్                         |
| `src/lib/notion/api.ts`                                                  | Notion REST API క్లయింట్ (రీట్రై, టైమ్అవుట్, ఎర్రర్ వర్గీకరణ)         |
| `src/lib/db/notion.ts`                                                   | Notion టోకెన్ నిల్వ (`key_value` టేబుల్)                              |
| `src/app/api/settings/notion/route.ts`                                   | Notion సెట్టింగ్ల API (GET/POST/DELETE)                               |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion టోకెన్ నిర్వహణ UI                                              |
| `tests/unit/notion-api.test.ts`                                          | Notion API క్లయింట్ పరీక్షలు (7)                                      |
| `tests/unit/notion-tools.test.ts`                                        | Notion టూల్స్ స్కోప్ అమలు పరీక్షలు (10)                               |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB మాడ్యూల్ పరీక్షలు (3)                                       |
