# OmniRoute MCP Server Documentation (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> राउटिङ, क्यास, कम्प्रेसन, मेमोरी, स्किल्स, प्रोक्सी, पूल, Radar, र कन्टेक्स्ट स्रोत सञ्चालनहरूमा फैलिएका 110 उपकरणसहितको Model Context Protocol सर्भर।
>
> सत्यको आधिकारिक स्रोत: `open-sse/mcp-server/server.ts` ले `countUniqueMcpTools()` मार्फत **110 अद्वितीय उपकरणहरू** गणना गर्छ: 45 आधिकारिक परिभाषाहरू (छवटा CCR जीवनचक्र उपकरणहरू, एजेन्ट-स्किल्सका तीन उपकरण, `omniroute_radar_catalog`, र `omniroute_x_search` सहित), साथै मेमोरी (3), स्किल्स (4), GitHub स्किल्स (3), पूल (6), गेमिफिकेसन (8), प्लगइनहरू (8), Notion (6), Obsidian (22), स्थानीय कर्पस (3), र RTK-मात्रका दुई कम्प्रेसन उपकरणहरू।

## स्थापना

OmniRoute MCP अन्तर्निर्मित छ। यसलाई यसरी सुरु गर्नुहोस्:

```bash
omniroute --mcp
```

वा open-sse ट्रान्सपोर्टमार्फत:

```bash
# HTTP स्ट्रिम गर्न मिल्ने ट्रान्सपोर्ट (पोर्ट 20130)
omniroute --dev  # MCP /mcp एन्डपोइन्टमा स्वतः सुरु हुन्छ
```

HTTP ट्रान्सपोर्टहरू (`sse` / `streamable-http`, ड्यासबोर्ड सर्भरद्वारा सोही प्रोसेसभित्र सेवा प्रदान गरिने) पूर्वनिर्धारित रूपमा
बन्द हुन्छन् र पहिले `/dashboard/mcp` पृष्ठबाट मात्र टगल गर्न सकिन्थ्यो। v3.8.51 देखि
CLI मा पनि समान सुविधा उपलब्ध छ:

```bash
omniroute mcp status                                  # सक्षम/अनलाइन, ट्रान्सपोर्ट, टुल सङ्ख्या
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # सक्रिय sse/streamable-http सत्रहरू रिसेट गर्छ
```

`mcp enable`/`mcp disable` ले ड्यासबोर्डले `/api/settings` मार्फत टगल गर्ने उही `mcpEnabled`
(र वैकल्पिक रूपमा `mcpTransport`) सेटिङलाई PATCH गर्छ। `mcp restart` ले `POST /api/mcp/restart`
कल गर्छ: यसले सक्रिय `sse`/`streamable-http` सत्रहरू बन्द गर्छ, जसले गर्दा अर्को अनुरोध पुनः सफा रूपमा प्रारम्भ हुन्छ;
MCP असक्षम भएमा `409`, र `stdio` ट्रान्सपोर्टका लागि `501` फर्काउँछ (stdio क्लाइन्टहरूले आफ्नै
सबप्रोसेस सञ्चालन गर्छन् — पुनः सुरु गर्नका लागि कुनै इन-प्रोसेस ह्यान्डल हुँदैन)।

## ट्रान्सपोर्टहरू

MCP सर्भरले तीनवटा ट्रान्सपोर्ट उपलब्ध गराउँछ, र ती सबै एउटै `createMcpServer()` फ्याक्ट्रीद्वारा सञ्चालित छन्:

| ट्रान्सपोर्ट      | स्थान                                       | कहिले प्रयोग गर्ने                                |
| :---------------- | :------------------------------------------ | :------------------------------------------------ |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE एकीकरणहरू (Claude Desktop, Cursor, आदि)       |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | इभेन्ट स्ट्रिम चाहिने ब्राउजर/एजेन्ट क्लाइन्टहरू  |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | बहु-सत्र HTTP क्लाइन्टहरू (`mcp-session-id` हेडर) |

सक्रिय HTTP ट्रान्सपोर्ट (`sse` वा `streamable-http`) `mcpTransport` सेटिङद्वारा चयन गरिन्छ। ट्रान्सपोर्ट परिवर्तन गर्दा अर्को ट्रान्सपोर्टमा रहेका विद्यमान सत्रहरू बन्द हुन्छन्।

### रिमोट पहुँच (manage-scope बाइपास)

`/api/mcp/*` LOCAL_ONLY तहमा (`src/server/authz/routeGuard.ts`) छ—पूर्वनिर्धारित रूपमा लुपब्याक होस्टहरू (`localhost`, `127.0.0.1`, `::1`) ले मात्र यसमा पहुँच गर्न सक्छन्। v3.8.2 देखि, गैर-लुपब्याक क्लाइन्टहरूले `manage` स्कोप भएको कुञ्जीको `Authorization: Bearer <api-key>` प्रस्तुत गरेमा जडान गर्न सक्छन्। टनेल, रिभर्स प्रोक्सी, वा सार्वजनिक होस्टनेममार्फत रिमोट MCP सर्भरमा पहुँच गर्ने यो एकमात्र तरिका हो।

```bash
# manage स्कोप प्रदान गर्नुहोस्: ड्यासबोर्डको API Keys पृष्ठ खोल्नुहोस् र कुञ्जीमा
# "Management Access" सक्रिय गर्नुहोस्, वा सिर्जना गर्दा scopes:["manage"] सहित POST गर्नुहोस्।

# त्यसपछि रिमोट MCP क्लाइन्टबाट जडान गर्नुहोस्:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` नभएको कुञ्जीले (वा Bearer नभएमा) `403 LOCAL_ONLY` फर्काउँछ। सहोदर प्रिफिक्स `/api/cli-tools/runtime/*` लाई जानाजानी बाइपास गर्न मिल्दैन—[रुट गार्ड तहहरू—manage-scope अपवाद](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) हेर्नुहोस्।

## IDE कन्फिगरेसन

Claude Desktop, Cursor, Cline, र मिल्दो MCP क्लाइन्ट सेटअपका लागि [MCP क्लाइन्ट कन्फिगरेसन](../guides/SETUP_GUIDE.md#mcp-client-configuration) हेर्नुहोस्।

---

## अत्यावश्यक उपकरणहरू (14) — चरण 1

| उपकरण                           | स्कोपहरू              | विवरण                                                                                                                                            |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | अपटाइम, मेमोरी, सर्किट ब्रेकरहरू, दर सीमाहरू, क्यास तथ्याङ्कहरू                                                                                  |
| `omniroute_list_combos`         | `read:combos`         | रणनीतिहरूसहित कन्फिगर गरिएका सबै कम्बोहरू (वैकल्पिक मेट्रिक्स)                                                                                   |
| `omniroute_get_combo_metrics`   | `read:combos`         | कुनै निश्चित कम्बोका लागि कार्यसम्पादन मेट्रिक्स                                                                                                 |
| `omniroute_switch_combo`        | `write:combos`        | कम्बोलाई सक्रिय वा निष्क्रिय बनाउने                                                                                                              |
| `omniroute_create_combo`        | `write:combos`        | विद्यमान कम्बो API मार्फत प्रमाणीकरण गरिएको कम्बो सिर्जना गर्ने                                                                                  |
| `omniroute_check_quota`         | `read:quota`          | प्रयोग भएको/कुल कोटा, बाँकी प्रतिशत, रिसेट समय, टोकनको अवस्था                                                                                    |
| `omniroute_route_request`       | `execute:completions` | OmniRoute राउटिङमार्फत च्याट कम्प्लिसन पठाउने                                                                                                    |
| `omniroute_cost_report`         | `read:usage`          | अवधिअनुसार लागत प्रतिवेदन (सत्र/दिन/हप्ता/महिना)                                                                                                 |
| `omniroute_list_models_catalog` | `read:models`         | क्षमताहरू, स्थिति र मूल्य निर्धारणसहितको पूर्ण मोडेल क्याटलग                                                                                     |
| `omniroute_radar_catalog`       | `read:radar`          | स्थानीय रूपमा हस्ताक्षरित Radar क्याटलग; वैकल्पिक प्रदायक/फ्यामिली फिल्टरहरू                                                                     |
| `omniroute_tool_search`         | `read:tools`          | दर्ता गरिएको MCP क्याटलगबाट उपकरणहरू पत्ता लगाउने                                                                                                |
| `omniroute_web_search`          | `execute:search`      | कन्फिगर गरिएका खोज प्रदायकहरूमार्फत वेब खोज। X/Twitter होइन।                                                                                     |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok मार्फत X मा खोज्ने, वा Xquik API परिणामहरूका लागि `xquik-search` छनोट गर्ने। चयन गरिएको ब्याकएन्डका लागि प्रमाणहरू आवश्यक हुन्छन्। |
| `omniroute_web_fetch`           | `execute:search`      | कन्फिगर गरिएका फेच प्रदायकहरूमार्फत वेब सामग्री प्राप्त गर्ने                                                                                    |

## उन्नत उपकरणहरू (11) — चरण 2

| उपकरण                              | स्कोपहरू                             | विवरण                                                                                                               |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | फलब्याक ट्रीसहितको ड्राइ-रन राउटिङ सिमुलेसन                                                                         |
| `omniroute_set_budget_guard`       | `write:budget`                       | डिग्रेड/ब्लक/अलर्ट कार्यसहितको सत्र बजेट                                                                            |
| `omniroute_set_routing_strategy`   | `write:combos`                       | रनटाइममा कम्बो रणनीति अद्यावधिक गर्नुहोस् (प्राथमिकता/भारित/स्वतः/आदि)                                              |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` रेजिलियन्स प्रिसेट लागू गर्नुहोस्                                        |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | वास्तविक अपस्ट्रिम कल प्रयोग गरी कम्बोका प्रत्येक प्रदायकको प्रत्यक्ष परीक्षण                                       |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 विलम्बता र सर्किट ब्रेकर अवस्थासहित प्रति-प्रदायक मेट्रिक्स                                             |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | बजेट/विलम्बता सीमाहरूका आधारमा कार्य प्रकारअनुसार कम्बो सिफारिस गर्नुहोस्                                           |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | अनुरोध किन कुनै प्रदायकतर्फ राउट गरियो भन्ने व्याख्या गर्नुहोस् (स्कोरिङ कारकहरू + फलब्याकहरू)                      |
| `omniroute_get_session_snapshot`   | `read:usage`                         | पूर्ण सत्र स्न्यापसट: लागत, टोकनहरू, शीर्ष मोडेल/प्रदायकहरू, त्रुटिहरू, बजेट गार्ड                                  |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | बिग्रिएका कम्बो रेफरेन्सहरू / अनाथ पङ्क्तिहरूजस्ता डेटाबेस ड्रिफ्टको निदान (र वैकल्पिक रूपमा स्वतः-मर्मत) गर्नुहोस् |
| `omniroute_sync_pricing`           | `pricing:write`                      | बाह्य स्रोतहरू (LiteLLM) बाट मूल्य निर्धारण डेटा सिंक गर्नुहोस्; `dryRun` समर्थित                                   |

## क्यास उपकरणहरू (2)

| उपकरण                   | स्कोपहरू      | विवरण                                                          |
| :---------------------- | :------------ | :------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | सिमान्टिक क्यास, प्रम्प्ट-क्यास र आइडेम्पोटेन्सी तथ्याङ्कहरू   |
| `omniroute_cache_flush` | `write:cache` | विश्वव्यापी रूपमा वा सिग्नेचर/मोडेलअनुसार क्यास फ्लस गर्नुहोस् |

## कम्प्रेसन उपकरणहरू (13)

| उपकरण                               | स्कोपहरू            | विवरण                                                                                                               |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | कम्प्रेसन सेटिङहरू, एनालिटिक्स सारांश र क्यास-सचेत तथ्याङ्कहरू (`analytics.mcpDescriptionCompression` मेटाडेटासहित) |
| `omniroute_compression_configure`   | `write:compression` | कम्प्रेसन मोड, थ्रेसहोल्ड, लक्षित अनुपात, सिस्टम-प्रम्प्ट संरक्षण र MCP विवरण कम्प्रेसन टगल कन्फिगर गर्नुहोस्       |
| `omniroute_set_compression_engine`  | `write:compression` | सक्रिय इन्जिन (off/caveman/rtk/stacked) र Caveman/RTK तीव्रता चयन गर्नुहोस्                                         |
| `omniroute_list_compression_combos` | `read:compression`  | नाम दिइएका कम्प्रेसन कम्बोहरू र तिनका इन्जिन पाइपलाइनहरू सूचीबद्ध गर्नुहोस्                                         |
| `omniroute_compression_combo_stats` | `read:compression`  | कम्प्रेसन कम्बो र इन्जिनअनुसार समूहबद्ध एनालिटिक्स                                                                  |
| `omniroute_ccr_store`               | `write:compression` | सीमित इन-मेमोरी CCR स्टोरमा कलर-पृथक सामग्री भण्डारण गरी मार्कर र `ccr://` रेफरेन्स फर्काउनुहोस्                    |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR सामग्री पूर्ण रूपमा वा हेड, टेल, लाइन, grep र तथ्याङ्क मोडहरूमा पुनःप्राप्त गर्नुहोस्                           |
| `omniroute_ccr_inspect`             | `read:compression`  | सामग्री नफर्काई कलर-स्वामित्वको CCR मेटाडेटा निरीक्षण गर्नुहोस्                                                     |
| `omniroute_ccr_list`                | `read:compression`  | कलर-स्वामित्वका CCR ब्लकहरूको पृष्ठाङ्कित मेटाडेटा सूचीबद्ध गर्नुहोस्                                               |
| `omniroute_ccr_delete`              | `write:compression` | कलर-स्वामित्वको CCR ब्लक मेटाउनुहोस्                                                                                |
| `omniroute_ccr_stats`               | `read:compression`  | कलर-स्कोप गरिएको मेमोरी प्रयोग, जीवनचक्र काउन्टरहरू र स्टोर सीमाहरू रिपोर्ट गर्नुहोस्                               |
| `omniroute_rtk_discover`            | `read:compression`  | अप्ट-इन RTK आउटपुट नमुनाहरूमा दोहोरिने न्वाइज पत्ता लगाउनुहोस्                                                      |
| `omniroute_rtk_learn`               | `read:compression`  | अप्ट-इन नमुनाहरूबाट समीक्षा गर्न मिल्ने RTK फिल्टर मस्यौदा उत्पन्न गर्नुहोस्                                        |

CCR प्रविष्टिहरू इन-मेमोरी मात्र हुन्छन् र पुनः सुरु गर्दा हराउँछन्। प्रत्येक ब्लक 2 MiB मा, प्रत्येक
प्रिन्सिपल 16 MiB मा र ग्लोबल स्टोर 64 MiB मा सीमित हुन्छ। प्रविष्टिहरूको पूर्वनिर्धारित TTL 24 घण्टा हुन्छ (अधिकतम
सात दिन)। पूर्ण MCP पुनःप्राप्ति 256 KiB मा सीमित हुन्छ; ठूला ब्लकहरू रेन्ज्ड र
grep मोडहरूमार्फत उपलब्ध रहन्छन्। भण्डारण, पुनःप्राप्ति, सूचीकरण, निरीक्षण, मेटाउने कार्य र तथ्याङ्कहरू
प्रमाणीकृत API-key प्रिन्सिपलद्वारा पृथक गरिएका हुन्छन्। अडिट रेकर्डहरूमा ह्यास र आकारसम्बन्धी मेटाडेटा हुन्छन्, सामग्री कहिल्यै हुँदैन।

`omniroute_compression_status` ले MCP विवरण कम्प्रेसनलाई
`analytics.mcpDescriptionCompression` अन्तर्गत छुट्टै रिपोर्ट गर्छ। ती मानहरू MCP मा सूचीबद्ध गर्न मिल्ने
विवरणहरू (`tools`, `prompts`, `resources`, र `resourceTemplates`) का मेटाडेटा-आकार अनुमान हुन्; ती प्रदायक प्रयोगका
रसिदहरू होइनन् र `source: "mcp_metadata_estimate"` द्वारा चिन्हित गरिएका हुन्छन्।

### MCP पहुँचयोग्यता ट्री फिल्टर (v3.8.0)

माथिका कम्प्रेसन टुलहरूभन्दा अलग रूपमा, OmniRoute मा कार्यान्वयनपछिको एउटा फिल्टर समावेश छ जसले MCP ब्राउजर/पहुँचयोग्यता टुलहरूका **टुल परिणामहरू** एजेन्टलाई फर्काइनुअघि कम्प्रेस गर्छ। यो फिल्टर आफैँमा टुल होइन — विस्तृत पहुँचयोग्यता-ट्री वा ब्राउजर-स्न्यापसट पाठ (≥2000 अक्षर) समावेश भएको कुनै पनि टुल परिणाममा यो पारदर्शी रूपमा चल्छ।

मुख्य व्यवहारहरू:

- लगातार दोहोरिएका ≥30 सहोदर पङ्क्तिहरूलाई सुरु + अन्त्यको सारांशमा संक्षिप्त गर्छ
- Playwright/computer-use का लागि आवश्यक `[ref=eXX]` एङ्करहरू सुरक्षित राख्छ
- अत्यधिक ठूलो पाठ (>50,000 अक्षर) लाई नेभिगेसन सङ्केतसहित अनिवार्य रूपमा काट्छ
- अपेक्षित बचत: ब्राउजर स्न्यापसट पेलोडहरूमा **60–80%**

कन्फिगरेसन: ग्लोबल सेटिङहरूमा `compression.mcpAccessibility` (माइग्रेसन 056)।
कार्यान्वयन: `open-sse/services/compression/engines/mcpAccessibility/`।
पूर्ण दस्तावेज: [कम्प्रेसन इन्जिनहरू — MCP पहुँचयोग्यता ट्री फिल्टर](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)।

यी टुलहरूको पछाडिको रनटाइम कम्प्रेसन मोडेलका लागि [कम्प्रेसन इन्जिनहरू](../compression/COMPRESSION_ENGINES.md) र [RTK कम्प्रेसन](../compression/RTK_COMPRESSION.md) हेर्नुहोस्।

## 1Proxy उपकरणहरू (3)

| उपकरण                       | स्कोपहरू       | विवरण                                                                                               |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy मार्केटप्लेसबाट निःशुल्क प्रोक्सीहरू प्राप्त गर्नुहोस् (प्रोटोकल/देश/गुणस्तर/सीमा फिल्टरहरू) |
| `omniroute_oneproxy_rotate` | `read:proxies` | रणनीतिअनुसार अर्को उपलब्ध प्रोक्सी प्राप्त गर्नुहोस् (`random` / `quality` / `sequential`)          |
| `omniroute_oneproxy_stats`  | `read:proxies` | पूल तथ्याङ्क, सिंक स्थिति, प्रोटोकल र देशअनुसार वितरण                                               |

## मेमोरी उपकरणहरू (3)

`open-sse/mcp-server/tools/memoryTools.ts` मा परिभाषित। प्रमाणीकरण/स्कोप मानक MCP स्कोप पाइपलाइनमार्फत लागू गरिन्छ।

| उपकरण                     | स्कोपहरू       | विवरण                                                                                                         |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | टोकन-बजेट कार्यान्वयनसहित क्वेरी / प्रकार / API कुञ्जीअनुसार मेमोरीहरू खोज्नुहोस्                             |
| `omniroute_memory_add`    | `write:memory` | नयाँ मेमोरी प्रविष्टि थप्नुहोस् (`factual` / `episodic` / `procedural` / `semantic`)                          |
| `omniroute_memory_clear`  | `write:memory` | API कुञ्जीका मेमोरीहरू खाली गर्नुहोस्, वैकल्पिक रूपमा प्रकार वा `olderThan` टाइमस्ट्याम्पद्वारा फिल्टर गरिएको |

## सीप उपकरणहरू (4)

`open-sse/mcp-server/tools/skillTools.ts` मा परिभाषित। `src/lib/skills/registry` + `src/lib/skills/executor` द्वारा समर्थित।

| उपकरण                         | स्कोपहरू         | विवरण                                                                                              |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API कुञ्जी, नाम वा सक्षम अवस्थाअनुसार वैकल्पिक फिल्टरिङसहित दर्ता गरिएका सीपहरू सूचीबद्ध गर्नुहोस् |
| `omniroute_skills_enable`     | `write:skills`   | ID द्वारा कुनै विशेष सीप सक्षम वा अक्षम गर्नुहोस्                                                  |
| `omniroute_skills_execute`    | `execute:skills` | प्रदान गरिएको इनपुटसहित सीप कार्यान्वयन गर्नुहोस् र कार्यान्वयन रेकर्ड फर्काउनुहोस्                |
| `omniroute_skills_executions` | `read:skills`    | हालैको सीप कार्यान्वयन इतिहास सूचीबद्ध गर्नुहोस्                                                   |

## Notion सन्दर्भ स्रोत (6)

`open-sse/mcp-server/tools/notionTools.ts` मा परिभाषित। टोकन `src/lib/db/notion.ts` मार्फत `key_value` तालिकामा भण्डारण गरिन्छ। REST क्लाइन्ट `src/lib/notion/api.ts` मा छ। सेटिङ API `src/app/api/settings/notion/route.ts` मा छ। ड्यासबोर्ड UI `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` मा छ।

आफ्नो Notion एकीकरण टोकन Endpoint ड्यासबोर्डको **सन्दर्भ स्रोतहरू** ट्याबबाट वा REST API मार्फत कन्फिगर गर्नुहोस्:

```bash
# टोकन सेट गर्नुहोस्
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# स्थिति जाँच्नुहोस्
curl http://localhost:20128/api/settings/notion

# विच्छेद गर्नुहोस्
curl -X DELETE http://localhost:20128/api/settings/notion
```

| उपकरण                        | स्कोपहरू       | विवरण                                                               |
| :--------------------------- | :------------- | :------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | सबै पृष्ठ र डेटाबेसहरूमा पूर्ण-पाठ खोज गर्नुहोस्                    |
| `notion_get_page`            | `read:notion`  | ID द्वारा पृष्ठका गुणहरूसहित प्राप्त गर्नुहोस्                      |
| `notion_list_block_children` | `read:notion`  | पृष्ठ वा ब्लकका चाइल्ड ब्लकहरू सूचीबद्ध गर्नुहोस्                   |
| `notion_query_database`      | `read:notion`  | फिल्टर, क्रमबद्धता र पृष्ठाङ्कनसहित डेटाबेस क्वेरी गर्नुहोस्        |
| `notion_get_database`        | `read:notion`  | ID द्वारा डेटाबेस स्किमा प्राप्त गर्नुहोस्                          |
| `notion_append_blocks`       | `write:notion` | प्यारेन्ट ब्लकमा चाइल्ड ब्लकहरू थप्नुहोस् (प्रति अनुरोध अधिकतम 100) |

## एजेन्ट स्किल क्याटलग उपकरणहरू (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` मा परिभाषित। `src/lib/agentSkills/catalog` द्वारा समर्थित। यी उपकरणहरूले 45-प्रविष्टि भएको Agent Skills दस्तावेज क्याटलगलाई MCP क्लाइन्टहरू र बाह्य एजेन्टहरूका लागि उपलब्ध गराउँछन्। स्कोप: `read:catalog`।

| उपकरण                             | स्कोपहरू       | विवरण                                                                                                                           |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog` | वैकल्पिक `category` (api\|cli) र `area` फिल्टरसहित सबै 45 एजेन्ट स्किलहरू सूचीबद्ध गर्छ; मेटाडेटा + कभरेज फर्काउँछ              |
| `omniroute_agent_skills_get`      | `read:catalog` | क्यानोनिकल `id` का आधारमा एउटा स्किलको पूर्ण मेटाडेटा + SKILL.md सामग्री प्राप्त गर्छ                                           |
| `omniroute_agent_skills_coverage` | `read:catalog` | कभरेज तथ्याङ्क: क्याटलगको कुल सङ्ख्याको तुलनामा 23 API, 21 CLI र 1 config स्किलमध्ये कतिवटाका SKILL.md फाइलहरू फाइलसिस्टममा छन् |

पूर्ण क्याटलग र बाह्य एजेन्टहरूले यसलाई कसरी प्रयोग गर्छन् भन्ने जानकारीका लागि [AGENT-SKILLS.md](./AGENT-SKILLS.md) हेर्नुहोस्।

## सम्बन्धित फ्रेमवर्कहरू (v3.8.0)

माथिको MCP उपकरण सूची (110 अद्वितीय उपकरणहरू, `countUniqueMcpTools()` द्वारा गणना गरिएको) जानाजानी
रनटाइम राउटिङ/क्यास/कम्प्रेसन/मेमोरी/स्किल/प्रोक्सी/कन्टेक्स्ट-स्रोत सञ्चालनहरूमा सीमित छ। दुई निकटवर्ती
फ्रेमवर्कहरू v3.8.0 मा MCP सर्भरसँगै उपलब्ध हुन्छन् र तिनको दस्तावेजीकरण अलग्गै गरिएको छ:

### Cloud Agents

Cloud Agents प्रक्रियाबाहिरका AI कोडिङ एजेन्टहरू (codex-cloud, cursor-cloud, devin, jules) हुन्, जुन
LLM प्रदायकहरूका लागि प्रयोग हुने उही जडान मोडेलमार्फत OmniRoute मा जोडिएका छन्। तिनीहरूका
आफ्नै REST सतह (`/api/v1/agents/*`) मार्फत उपलब्ध छन् र MCP उपकरण क्याटलगको भाग **होइनन्**
— Cloud Agent कल गर्दा MCP स्कोप खपत हुँदैन।

- कार्यान्वयन: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`)।
- जीवनचक्र: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`।
- दस्तावेजीकरण: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)।

### Guardrails

Guardrails च्याट पाइपलाइनभित्र लागू हुने पूर्व/पश्चात्-कार्यान्वयन फिल्टरहरू (vision-bridge, pii-masker, prompt-injection)
हुन्। तिनीहरू MCP उपकरण/रुट तहमा पुग्नुअघि चल्छन् र अडिट पाइपलाइनमा संरचित उल्लङ्घनहरू उत्सर्जन गर्छन्;
तिनीहरूलाई MCP उपकरणका रूपमा आह्वान गरिँदैन।

- कार्यान्वयन: `src/lib/guardrails/`।
- दस्तावेजीकरण: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)।

अवरुद्ध भएको जस्तो देखिने MCP कल डिबग गर्दा MCP अडिट लग
(`scope_denied:*` प्रविष्टिहरू) र guardrails अडिट ट्रेल दुवै जाँच गर्नुहोस् — अनुरोध MCP स्कोप प्रवर्तन तहमा
पुग्नुअघि नै guardrail द्वारा अस्वीकार गरिएको हुन सक्छ।

---

## REST API एन्डपोइन्टहरू

| एन्डपोइन्ट             | विधि                  | विवरण                                                                                                   | प्रमाणीकरण                 |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------ | :------------------------- |
| `/api/mcp/status`      | `GET`                 | सर्भर स्थिति: हार्टबिट, HTTP ट्रान्सपोर्ट स्थिति, अडिट गतिविधि सारांश                                   | व्यवस्थापन (session/admin) |
| `/api/mcp/tools`       | `GET`                 | उपकरण क्याटलग (नाम, विवरण, स्कोपहरू, चरण, स्रोत एन्डपोइन्टहरू)                                          | व्यवस्थापन                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ट्रान्सपोर्ट एन्डपोइन्ट (`mcpEnabled` + `mcpTransport === "sse"` द्वारा नियन्त्रित)                 | API कुञ्जी + स्कोपहरू      |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | स्ट्रिम गर्न मिल्ने HTTP ट्रान्सपोर्ट (`mcp-session-id` हेडर प्रयोग गर्छ; `DELETE` ले सेसन अन्त्य गर्छ) | API कुञ्जी + स्कोपहरू      |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` बाट अडिट लग प्रविष्टिहरू (फिल्टरहरू: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | व्यवस्थापन                 |
| `/api/mcp/audit/stats` | `GET`                 | समग्र अडिट तथ्याङ्क (`totalCalls`, `successRate`, `avgDurationMs`, प्रमुख उपकरणहरू)                     | व्यवस्थापन                 |

स्रोत फाइलहरू: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`।

Settings मा MCP सर्भर सक्षम (`mcpEnabled`) नगरिएसम्म र उपयुक्त `mcpTransport` चयन नगरिएसम्म SSE र Streamable HTTP दुवै ट्रान्सपोर्टहरू अवरुद्ध हुन्छन्। गलत ट्रान्सपोर्ट कन्फिगर गरिएको अवस्थामा, रुटले सेटिङ परिवर्तन गर्ने सङ्केतसहित HTTP 400 फर्काउँछ।

---

## प्रमाणीकरण र स्कोपहरू

MCP उपकरणले कलरबाट स्कोप स्ट्रिङहरू पढ्छ। त्यो जाँच तीन स्वतन्त्र नेमस्पेसहरू मध्ये एक हो। एक परीक्षकबाट पास हुनु भनेको अरूबाट पास हुनु होइन। नियमहरू [तीन स्कोप नेमस्पेसहरू](#three-scope-namespaces) हुन्। उपकरण सूची [MCP उपकरण स्कोपहरू](#mcp-tool-scopes) हो।

### तीन स्कोप नेमस्पेसहरू

एउटा API कुञ्जीमा `manage`, एउटा MCP उपकरणमा `read:compression`, र एउटा `oma_live_…` पहुँच टोकनमा `read` तीन फरक अनुमतिहरू हुन्। म्युटेटिङ व्यवस्थापन मार्गमा `read` पहुँच टोकन पठाउने कलरहरूले HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` प्राप्त गर्छन्। त्यो श्रेणी `scopeSatisfies` हो। यसले MCP तालिकालाई परामर्श गर्दैन, र MCP मिलानकर्ताले यसलाई परामर्श गर्दैन।

| नेमस्पेस              | प्रमाण                                                     | परीक्षक              | पासले अनुमति दिन्छ                                        |
| :-------------------- | :--------------------------------------------------------- | :------------------- | :-------------------------------------------------------- |
| API-कुञ्जी व्यवस्थापन | `api_keys.scopes`                                          | `hasManageScope`     | त्यो Bearer कुञ्जीको लागि व्यवस्थापन REST                 |
| API-कुञ्जी एडिटिभ     | उही एरे, एउटा सटीक स्ट्रिङ                                 | तल नाम दिइएको हेल्पर | त्यो एक क्षमता मात्र                                      |
| MCP उपकरण स्कोपहरू    | उही एरे, अन्यथा MCP `_meta`, अन्यथा `OMNIROUTE_MCP_SCOPES` | `scopeMatches`       | त्यो उपकरण, एक पटक प्रवर्तन अन भएपछि                      |
| पहुँच टोकन            | `oma_live_…`                                               | `scopeSatisfies`     | व्यवस्थापन मार्ग जसको विधि र मार्गलाई त्यो श्रेणी चाहिन्छ |

प्रत्येक प्रमाण मिन्टिङ [व्यवस्थापन प्रमाणीकरण](../guides/MANAGEMENT-AUTH.md) मा कभर गरिएको छ।

#### API-कुञ्जी स्कोपहरू

एउटा `api_keys.scopes` एरेले दुईवटा काम गर्छ। तिनीहरूले फरक प्रकार्यहरू प्रयोग गर्छन्।

**व्यवस्थापन REST।** `manage` र `admin` `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) का सदस्यहरू हुन्। `hasManageScope` ले त्यो कुञ्जीको लागि व्यवस्थापन मार्गहरूलाई अधिकार दिन्छ। `admin` ती मार्गहरूमा व्यवस्थापन-सक्षम छ। यहाँ `admin` शब्द पहुँच-टोकन श्रेणी होइन र यसले MCP उपकरण स्कोपहरूमा विस्तार गर्दैन।

**एडिटिभ स्ट्रिङहरू।** प्रत्येक एक सटीक सदस्यता परीक्षण हो, र प्रत्येक `MANAGEMENT_API_KEY_SCOPES` बाहिर रहन्छ।

| स्कोप                          | पासले अनुमति दिन्छ                                                                                                                                                       |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | गैर-लूपब्याक `/api/mcp/` LOCAL_ONLY carve-out मात्र (`hasMcpConnectOrManageScope`)। `manage` वा `admin` भएको कुञ्जीले अझै पनि त्यो carve-out पास गर्छ।                   |
| `self:usage`                   | यो कुञ्जीको लागि `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`)। `POST /api/keys` ले सिर्जना गर्दा यो स्कोप थप्छ (`normalizeSelfServiceScopesForCreate`)। |
| `self:account-quota`           | त्यो स्थिति पेलोड भित्र अपस्ट्रिम खाता कोटा (`src/lib/usage/apiKeySelfService.ts`)। स्थिति मार्गलाई अझै पनि `self:usage` चाहिन्छ।                                        |
| `policy:bypass-provider-quota` | यो कुञ्जीको अनुमान कलहरूले प्रदायक-कोटा नीति छोड्छ (`src/sse/handlers/chat.ts` मा `hasProviderQuotaBypassScope`)।                                                        |

#### मिलान

सूची [MCP उपकरण स्कोपहरू](#mcp-tool-scopes) अन्तर्गतको तालिका हो। `src/shared/constants/mcpScopes.ts` मा `MCP_SCOPE_LIST` लाई त्यो सूचीको रूपमा व्यवहार नगर्नुहोस्: यो मूल टाइप गरिएको उपसमूह हो। पछिका उपकरणहरूले यसको छेउमा थप स्कोपहरू घोषणा गर्छन् (`read:notion`, `read:skills`, `read:local-corpus`, र बाँकी तालिका)।

`open-sse/mcp-server/scopeEnforcement.ts` मा `evaluateToolScopes` ले कललाई अनुमति दिन्छ जब प्रत्येक आवश्यक स्कोपले केही प्रदान गरिएको स्कोपसँग मेल खान्छ:

- `*` ले प्रत्येक आवश्यक स्कोपसँग मेल खान्छ।
- `*` मा समाप्त हुने प्रदान गरिएको स्कोपले तारा अघिको उपसर्गबाट सुरु हुने आवश्यक स्कोपसँग मेल खान्छ। `read:*` ले `read:compression` सँग मेल खान्छ।
- प्रत्येक अन्य प्रदान गरिएको स्कोपले समान आवश्यक स्ट्रिङसँग मात्र मेल खान्छ।

`["manage"]` स्कोप भएको कुञ्जी `read:compression` को लागि `scopeMatches` असफल हुन्छ। उही कल `admin`, `mcp:connect`, `read`, र `write` को लागि असफल हुन्छ जब ती मात्र प्रदान गरिएका स्ट्रिङहरू हुन्। ट्रेलिङ `*` बाहेक MCP उपकरण स्कोपहरू बीच कुनै पदानुक्रम छैन।

प्रवर्तन बन्द छ जबसम्म `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (पूर्वनिर्धारित `false`)। यो बन्द हुँदा, `evaluateToolScopes` ले कललाई अनुमति दिन्छ र सूची छोड्छ। यो अन हुँदा, HTTP ले Bearer कुञ्जीको `api_keys.scopes` लाई `authInfo` को रूपमा प्रयोग गर्छ ([प्रति-कुञ्जी HTTP स्कोप बाइन्डिङ](#per-key-http-scope-binding-7895) हेर्नुहोस्)। जब कुनै कुञ्जी स्कोपहरू समाधान हुँदैनन्, प्रदान गरिएको सेट MCP `_meta` मा, त्यसपछि `OMNIROUTE_MCP_SCOPES` मा झर्छ।

#### पहुँच-टोकन स्कोपहरू

`oma_live_…` टोकनहरू (`src/lib/accessTokens/scopes.ts`) ले `read`, `write`, वा `admin` बोक्छन्। `scopeSatisfies` एक श्रेणी हो: `admin` ले `write` र `read` लाई कभर गर्छ, र `write` ले `read` लाई कभर गर्छ। अज्ञात स्कोपहरूले केही पनि कभर गर्दैनन्।

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ले त्यो श्रेणीलाई `inferRequiredScope` (`src/server/authz/accessScopes.ts`) सँग तुलना गर्छ:

- `GET`, `HEAD`, र `OPTIONS` लाई `read` चाहिन्छ।
- प्रत्येक अन्य विधिलाई `write` चाहिन्छ।
- `ADMIN_SCOPE_PREFIXES` मा रहेका मार्गहरूलाई प्रत्येक विधिको लागि `admin` चाहिन्छ। `/api/mcp` त्यो सूचीमा छ, त्यसैले `write` पहुँच टोकनले अझै पनि MCP HTTP सतहलाई कल गर्न सक्दैन।
- `ADMIN_MUTATION_PREFIXES` मा रहेका मार्गहरूलाई म्युटेशनका लागि मात्र `admin` चाहिन्छ।

`PATCH /api/keys/{id}` एक म्युटेशन हो र ती एडमिन सूचीहरूमा छैन, त्यसैले `read` टोकनले 403 प्राप्त गर्छ
`Access token scope 'read' is insufficient; 'write' required.`
एक `write` वा `admin` पहुँच टोकनले त्यो रुटलाई सन्तुष्ट पार्छ। एक ड्यासबोर्ड JWT, द लुपब्याक CLI मेसिन-आईडी टोकन, र `manage` वा `admin` भएको एक API कुञ्जीले अन्य शाखाहरू लिन्छन् र यो श्रेणीद्वारा संकुचित हुँदैनन्।

एक पहुँच टोकन जसले `/api/mcp` को लागि `scopeSatisfies` पास गर्छ, त्यसले व्यवस्थापन गेट मात्र क्लियर गरेको छ। उपकरण कलहरूले अझै पनि API-कुञ्जी स्कोपहरू विरुद्ध `scopeMatches` चलाउँछन्। पहुँच-टोकन श्रेणी `scopeMatches` को लागि इनपुट होइन।

### MCP उपकरण स्कोपहरू

स्कोप प्रवर्तन `open-sse/mcp-server/scopeEnforcement.ts` मा केन्द्रीकृत छ। प्रत्येक उपकरणलाई विशिष्ट स्कोपहरू चाहिन्छन्:

| स्कोप                 | उपकरणहरू                                                                                                                                                                             |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                    |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                            |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                               |
| `read:quota`          | `check_quota`                                                                                                                                                                        |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                               |
| `read:models`         | `list_models_catalog`                                                                                                                                                                |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                        |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                   |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                          |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                       |
| `read:cache`          | `cache_stats`                                                                                                                                                                        |
| `write:cache`         | `cache_flush`                                                                                                                                                                        |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                           |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                    |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                     |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                               |
| `read:memory`         | `memory_search`                                                                                                                                                                      |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                         |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                   |
| `write:skills`        | `skills_enable`                                                                                                                                                                      |
| `execute:skills`      | `skills_execute`                                                                                                                                                                     |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                     |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                              |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                            |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                     |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                       |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                   |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                      |
| `read:obsidian`       | १३ वटा पढ्ने उपकरणहरू — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | ९ वटा लेख्ने उपकरणहरू — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                    |

वाइल्डकार्ड स्कोपहरू समर्थित छन्: `read:*` ले सबै पढ्ने-स्कोपहरू प्रदान गर्दछ, `*` ले पूर्ण पहुँच प्रदान गर्दछ।

### `mcp:connect` — साँघुरो मार्ग क्षमता (#7895)

गैर-लूपब्याकबाट HTTP/SSE MCP ट्रान्सपोर्ट (`/api/mcp/*`) मा पुग्न `/api/mcp/` LOCAL_ONLY carve-out (हेर्नुहोस् `docs/security/ROUTE_GUARD_TIERS.md`) आवश्यक पर्दछ। ऐतिहासिक रूपमा, त्यो carve-out ले पूर्ण `manage`/`admin`-स्कोप API कुञ्जी मात्र स्वीकार गर्दथ्यो — MCP सँग मात्र कुरा गर्न आवश्यक पर्ने कलरका लागि यो धेरै फराकिलो थियो। `src/shared/constants/managementScopes.ts` ले अब `MCP_CONNECT_SCOPE = "mcp:connect"` निर्यात गर्दछ: यो एक अतिरिक्त, साँघुरो स्कोप हो (`SELF_USAGE_SCOPE` जस्तै पूर्ववर्ती) जसले `src/server/authz/policies/management.ts` मा `/api/mcp/` बाइपासलाई मात्र अधिकार दिन्छ — यसले अन्य कुनै व्यवस्थापन-मार्ग पहुँच प्रदान गर्दैन र यसलाई जानाजानी `MANAGEMENT_API_KEY_SCOPES` बाट बाहिर राखिएको छ। `manage`/`admin` भएको कुञ्जीले carve-out लाई अपरिवर्तित रूपमा पास गर्दछ; `mcp:connect` रिमोट MCP-मात्र कलरहरूका लागि कम-विशेषाधिकार विकल्प हो, जसलाई `hasMcpConnectOrManageScope()` मार्फत जाँच गरिन्छ।

### प्रति-कुञ्जी HTTP स्कोप बाइन्डिङ (#7895)

HTTP/SSE मा, `open-sse/mcp-server/httpTransport.ts` ले अब कलरको वास्तविक `api_keys.scopes` लाई `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) मार्फत समाधान गर्दछ र यसलाई MCP SDK को `transport.handleRequest(req, { authInfo })` मा पास गर्दछ, ताकि प्रत्येक उपकरण कलमा पुग्ने `extra.authInfo.scopes` ले Bearer कुञ्जीको आफ्नै स्कोपहरू प्रतिबिम्बित गर्दछ। `scopeEnforcement.ts` को `resolveCallerScopeContext()` ले पहिले नै `_meta` र `OMNIROUTE_MCP_SCOPES` env fallback भन्दा `authInfo` लाई प्राथमिकता दिएको थियो — यसले त्यो पहिलो, उच्च-प्राथमिकता स्रोतलाई मात्र भर्दछ, जुन पहिले HTTP मा खुवाइएको थिएन। जब कुनै API कुञ्जी समाधान हुँदैन (हेडर छैन, अवैध कुञ्जी), `authInfo` `undefined` रहन्छ र समाधान अवस्थित `meta`/env चेनमा अपरिवर्तित रूपमा जान्छ। यसले `OMNIROUTE_MCP_ENFORCE_SCOPES` को पूर्वनिर्धारितलाई परिवर्तन गर्दैन — प्रवर्तन अझै स्पष्ट रूपमा सक्षम हुनुपर्छ; यो परिवर्तनले प्रति-कुञ्जी मार्गलाई प्राथमिकता दिन्छ जब यो सक्षम हुन्छ। stdio सँग प्रति-कलर पहिचान छैन (हेर्नुहोस् `mcpCallerIdentity.ts`) र यो अप्रभावित रहन्छ — यो `_meta`/env fallback चेनमा रहन्छ।

## वातावरण चरहरू

| चर                                      | पूर्वनिर्धारित                               | उद्देश्य                                                                                                                           |
| :-------------------------------------- | :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                     | आन्तरिक OmniRoute API हरू कल गर्दा MCP सर्भरले प्रयोग गर्ने आधार URL                                                               |
| `OMNIROUTE_API_KEY`                     | (खाली)                                       | आन्तरिक API कलहरूमा `Authorization: Bearer` का रूपमा फर्वार्ड गरिने API कुञ्जी                                                     |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` ले मात्र यसलाई सक्षम गर्छ) | सक्षम हुँदा, छुटेका स्कोपहरूले उपकरण कलहरू अस्वीकार गर्छन् र अडिट लगमा `scope_denied:<reason>` लेख्छन्                             |
| `OMNIROUTE_MCP_SCOPES`                  | (खाली)                                       | पूर्वनिर्धारित रूपमा "उपलब्ध" मानिने स्कोपहरूको अल्पविरामद्वारा छुट्याइएको अनुमति-सूची (कलरले आफ्नै स्कोपहरू नदिँदा प्रयोग गरिन्छ) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (सेट नगरिएको = सक्रिय)                       | `0/false/off/no` मा सेट गर्दा, दर्ता गर्ने समयमा MCP विवरण सङ्कुचन असक्षम गर्छ                                                     |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (सेट नगरिएको = सक्रिय)                       | माथिको जस्तै टगलका लागि वैकल्पिक उपनाम                                                                                             |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                      | आन्तरिक व्यवस्थापन रिडहरू (स्वास्थ्य, लचिलोपन, संयोजनहरू, कोटा, प्रयोग) का लागि रद्द गर्ने समयसीमा                                 |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                      | प्रदायकलाई पर्खने हपहरू (`route_request`, `web_search`, `web_fetch`) का लागि रद्द गर्ने समयसीमा                                    |
| `MCP_TOOL_DENY`                         | (सेट नगरिएको = फिल्टर छैन)                   | `tools/list` बाट हटाइने उपकरण नामहरूको अल्पविरामद्वारा छुट्याइएको सूची (उपकरण-कार्डिनालिटी न्यूनीकरण — तल हेर्नुहोस्)              |
| `MCP_TOOL_ALLOW`                        | (सेट नगरिएको = फिल्टर छैन)                   | विशेष रूपमा राखिने उपकरण नामहरूको अल्पविरामद्वारा छुट्याइएको सूची (अनुमति-सूची मोड — तल हेर्नुहोस्)                                |
| `DATA_DIR`                              | `~/.omniroute`                               | हार्टबिट फाइल `${DATA_DIR}/runtime/mcp-heartbeat.json` मा लेखिन्छ                                                                  |

---

## विवरण सङ्कुचन

MCP उपकरण, प्रम्प्ट र स्रोत रजिस्ट्रीहरूले क्लाइन्टहरूलाई देखाइने मेटाडेटाको आकार (र त्यसकारण प्रम्प्ट सन्दर्भ लागत) घटाउन दर्ता/सूचीकरणको समयमा विवरणहरू सङ्कुचित गर्न सक्छन्। कार्यान्वयन `open-sse/mcp-server/descriptionCompressor.ts` मा छ र `createMcpServer()` भित्रको `compressMcpRegistryMetadata` मार्फत MCP सर्भरसँग जोडिएको छ।

- संरचनात्मक सामग्री परिवर्तन नहोस् भनेर सुरक्षित-ब्लक निष्कर्षण (कोड स्प्यानहरू, फेन्स गरिएका ब्लकहरू आदि) सहित Caveman नियमसमूह (`getRulesForContext("all", "full")`) प्रयोग गरी विवरण पाठमा सङ्कुचन चल्छ।
- `key_value` सेटिङ तालिकाको `compression.mcpDescriptionCompressionEnabled` मानमार्फत प्रत्येक डिप्लोयमेन्टका लागि टगल गर्नुहोस् (पूर्वनिर्धारित: सक्षम) — UI मा **विश्लेषण → MCP विवरण सङ्कुचन** का रूपमा उपलब्ध छ।
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` वा `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` मध्ये कुनै एकमार्फत सम्पूर्ण प्रक्रियाका लागि टगल गर्नुहोस्।
- वास्तविक-समयका तथ्याङ्कहरू `analytics.mcpDescriptionCompression` अन्तर्गत `omniroute_compression_status` मार्फत देखाइन्छन् र वास्तविक प्रदायक प्रयोग रसिदहरूबाट छुट्याउन `source: "mcp_metadata_estimate"` ट्याग गरिन्छ।

---

## उपकरण सङ्ख्या न्यूनीकरण (F4.3)

विवरण सङ्कुचनले प्रत्येक उपकरणको मेटाडेटा घटाउँछ; **उपकरण-सङ्ख्या न्यूनीकरण** ले अझ एक कदम अघि बढेर घोषणा गरिने उपकरणहरूको _सङ्ख्या_ नै घटाउँछ। `tools/list` म्यानिफेस्टमा थोरै उपकरणहरू देखाउँदा उपकरण क्याटलगका लागि क्लाइन्टको मोडेलले तिर्नुपर्ने प्रत्येक अनुरोधको टोकन लागत ("layer 5" सङ्कुचन) घट्छ। कार्यान्वयन `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) मा रहेको शुद्ध, अवस्थारहित फिल्टर हो, जसलाई `createMcpServer()` (`open-sse/mcp-server/server.ts`) को दर्ता लूपमा जडान गरिएको छ।

**अप्ट-इन, पूर्वनिर्धारित रूपमा बन्द।** दुई वातावरणीय चरमध्ये कम्तीमा एउटा सेट गरिएको अवस्थामा मात्र फिल्टर चल्छ; कुनै पनि सेट नगरिएको अवस्थामा सबै 110 उपकरणहरू अपरिवर्तित रूपमा घोषणा गरिन्छन्।

| चर               | मोड                                                                                          |
| :--------------- | :------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | कालोसूची — `tools/list` बाट सधैँ हटाइने, अल्पविरामद्वारा छुट्याइएका उपकरण नामहरू             |
| `MCP_TOOL_ALLOW` | अनुमति-सूची — अल्पविरामद्वारा छुट्याइएका उपकरण नामहरू; यी मात्र रहन्छन्, बाँकी सबै हटाइन्छन् |

`deny` ले `allow` भन्दा प्राथमिकता पाउँछ। नामहरू अल्पविरामद्वारा छुट्याइन्छन्, तिनका छेउका खाली ठाउँ हटाइन्छन्, र खाली प्रविष्टिहरूलाई बेवास्ता गरिन्छ। उदाहरणहरू:

```bash
# क्याटलगबाट दुई उपकरण हटाउनुहोस्
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# राउटिङ + कोटा उपकरणहरू मात्र घोषणा गर्नुहोस् (अनुमति-सूची मोड)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**फिल्टर गरिएका उपकरणहरू कसरी हटाइन्छन्:** दर्ता सधैँ सफल हुन्छ; त्यसपछि प्रोफाइलले अस्वीकार गरेको उपकरणलाई MCP SDK ह्यान्डलमा `.disable()` गरिन्छ, त्यसैले त्यो `tools/list` मा कहिल्यै देखा पर्दैन तर जडान यथावत् रहन्छ (सफा रूपमा सक्षम/अक्षम गर्ने, पुनःदर्ता आवश्यक नपर्ने)। प्रोफाइल पार्सर `readMcpToolProfileFromEnv(process.env)` हो, जसले दुवै चर खाली हुँदा `null` (फिल्टरिङ नगर्ने) फर्काउँछ।

`reduceToolManifest` पछाडिको अझ समृद्ध `ToolProfile` संरचनाले स्कोप-इन्टरसेक्सन फिल्टरिङ (`allowScopes`, `read:*`-शैलीको वाइल्डकार्ड मिलानसहित) र निर्धार्य `maxTools` सीमा पनि समर्थन गर्छ, तर यी दुई सेटिङका लागि दर्ताको समयमा पूर्ण म्यानिफेस्ट चाहिन्छ र आज वातावरणीय चरहरूमार्फत **उपलब्ध गराइएका छैनन्** (`tools/list`-स्तरको हुक ट्र्याक गरिएको आगामी कार्य हो)। न्यूनीकरणअघि र पछिको म्यानिफेस्ट टोकन लागत तुलना गर्न `estimateManifestTokens()` उपलब्ध छ।

---

## रनटाइम हार्टबिट

stdio ट्रान्सपोर्टले प्रत्येक 5 सेकेन्डमा जीवन्तताको अवस्था `${DATA_DIR}/runtime/mcp-heartbeat.json` मा सुरक्षित गर्छ। ड्यासबोर्डले (`/api/mcp/status`) `online` निर्धारण गर्न यो फाइलका साथै PID को जीवन्तता पढ्छ। यसको सट्टा HTTP ट्रान्सपोर्टहरूले प्रक्रियाभित्रको `getMcpHttpStatus()` बाट अवस्था रिपोर्ट गर्छन् (फाइल लेखिँदैन)।

हार्टबिट स्न्यापसटमा निम्न समावेश हुन्छ:

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

## अडिट लगिङ

प्रत्येक उपकरण कललाई `open-sse/mcp-server/audit.ts` द्वारा SQLite को `mcp_tool_audit` तालिकामा लग गरिन्छ:

- उपकरणको नाम, आर्गुमेन्टहरू (प्रत्येक उपकरणको `auditLevel` अनुसार ह्यास गरिएको/छोट्याइएको), परिणाम
- ms मा अवधि, सफलता/असफलता फ्ल्याग, त्रुटि सन्देश (लागू हुँदा)
- API कुञ्जी ह्यास, टाइमस्ट्याम्प
- स्कोप अस्वीकृतिहरू हराइरहेका स्कोपहरूको सूचीसहित `scope_denied:<reason>` का रूपमा लग गरिन्छन्

हालका कलहरू निरीक्षण गर्न ड्यासबोर्ड वा `/api/mcp/audit` र `/api/mcp/audit/stats` REST एन्डपोइन्टहरू प्रयोग गर्नुहोस्।

---

## फाइलहरू

| फाइल                                                                     | उद्देश्य                                                               |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP सर्भर फ्याक्ट्री, stdio प्रवेश बिन्दु, स्कोप गरिएका उपकरण दर्ताहरू |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ट्रान्सपोर्ट (सत्र व्यवस्थापन)                   |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | उपकरण स्कोप मूल्याङ्कन र कलर निर्धारण                                  |
| `open-sse/mcp-server/audit.ts`                                           | उपकरण कल अडिट लगिङ (`mcp_tool_audit`)                                  |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio हार्टबिट राइटर (`mcp-heartbeat.json`)                            |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | उपकरण / प्रम्प्ट / स्रोत रजिस्ट्रीहरूका लागि विवरण सङ्कुचन             |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod स्किमाहरू + उपकरण रजिस्ट्री (`MCP_TOOLS`, 45 प्रविष्टिहरू)         |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | चरण 2 + क्यास + 1proxy उपकरण ह्यान्डलरहरू                              |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | सङ्कुचन उपकरण ह्यान्डलरहरू                                             |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | मेमोरी उपकरण परिभाषाहरू (3 उपकरणहरू)                                   |
| `open-sse/mcp-server/tools/skillTools.ts`                                | सीप उपकरण परिभाषाहरू (4 उपकरणहरू)                                      |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion सन्दर्भ स्रोत उपकरण परिभाषाहरू (6 उपकरणहरू)                     |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | गेमिफिकेसन उपकरण परिभाषाहरू (8 उपकरणहरू)                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | प्लगइन दर्ता तथा व्यवस्थापन उपकरणहरू (8 उपकरणहरू)                      |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` अन्त्यबिन्दु                                         |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` अन्त्यबिन्दु                                          |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE ट्रान्सपोर्ट रुट                                    |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP ट्रान्सपोर्ट रुट                     |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` अडिट लग क्वेरी                                        |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` समष्टिगत अडिट मेट्रिक्स                         |
| `src/lib/notion/api.ts`                                                  | Notion REST API क्लाइन्ट (पुनःप्रयास, टाइमआउट, त्रुटि वर्गीकरण)        |
| `src/lib/db/notion.ts`                                                   | Notion टोकन स्थायित्व (`key_value` तालिका)                             |
| `src/app/api/settings/notion/route.ts`                                   | Notion सेटिङ API (GET/POST/DELETE)                                     |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion टोकन व्यवस्थापन UI                                              |
| `tests/unit/notion-api.test.ts`                                          | Notion API क्लाइन्ट परीक्षणहरू (7)                                     |
| `tests/unit/notion-tools.test.ts`                                        | Notion उपकरण स्कोप कार्यान्वयन परीक्षणहरू (10)                         |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB मोड्युल परीक्षणहरू (3)                                       |
