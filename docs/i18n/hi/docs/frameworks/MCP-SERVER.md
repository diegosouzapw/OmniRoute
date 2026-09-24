# OmniRoute MCP Server Documentation (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> रूटिंग, कैश, संपीड़न, मेमोरी, कौशल, प्रॉक्सी, पूल, Radar और कॉन्टेक्स्ट स्रोत संचालनों में 110 टूल वाला Model Context Protocol सर्वर।
>
> प्रामाणिक स्रोत: `open-sse/mcp-server/server.ts` में `countUniqueMcpTools()` के माध्यम से **110 अद्वितीय टूल** की गणना होती है: 45 कैनोनिकल परिभाषाएँ (जिनमें छह CCR जीवनचक्र टूल, agent-skills तिकड़ी, `omniroute_radar_catalog` और `omniroute_x_search` शामिल हैं), साथ ही मेमोरी (3), कौशल (4), GitHub कौशल (3), पूल (6), गेमिफ़िकेशन (8), प्लगइन (8), Notion (6), Obsidian (22), लोकल कॉर्पस (3) और केवल RTK वाले दो संपीड़न टूल।

## इंस्टॉलेशन

OmniRoute MCP अंतर्निहित है। इसे इस प्रकार शुरू करें:

```bash
omniroute --mcp
```

या open-sse ट्रांसपोर्ट के माध्यम से:

```bash
# HTTP स्ट्रीम करने योग्य ट्रांसपोर्ट (पोर्ट 20130)
omniroute --dev  # MCP /mcp एंडपॉइंट पर स्वतः शुरू होता है
```

HTTP ट्रांसपोर्ट (`sse` / `streamable-http`, जिन्हें डैशबोर्ड सर्वर द्वारा उसी प्रोसेस में प्रस्तुत किया जाता है)
डिफ़ॉल्ट रूप से बंद होते हैं और पहले केवल `/dashboard/mcp` पेज से टॉगल किए जा सकते थे। v3.8.51 से
CLI में भी समान कार्यक्षमता उपलब्ध है:

```bash
omniroute mcp status                                  # सक्षम/ऑनलाइन, ट्रांसपोर्ट, टूल की संख्या
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # सक्रिय sse/streamable-http सत्रों को रीसेट करता है
```

`mcp enable`/`mcp disable`, `/api/settings` के माध्यम से डैशबोर्ड द्वारा टॉगल की जाने वाली उसी `mcpEnabled`
(और वैकल्पिक रूप से `mcpTransport`) सेटिंग को PATCH करते हैं। `mcp restart`, `POST /api/mcp/restart` को कॉल करता है:
यह सक्रिय `sse`/`streamable-http` सत्रों को समाप्त कर देता है, ताकि अगला अनुरोध नए सिरे से सही ढंग से आरंभ हो;
यदि MCP अक्षम है तो `409` और `stdio` ट्रांसपोर्ट के लिए `501` लौटाता है (stdio क्लाइंट अपनी
सबप्रोसेस के स्वयं स्वामी होते हैं — रीस्टार्ट करने के लिए कोई इन-प्रोसेस हैंडल उपलब्ध नहीं है)।

## ट्रांसपोर्ट

MCP सर्वर तीन ट्रांसपोर्ट उपलब्ध कराता है, और सभी समान `createMcpServer()` फ़ैक्टरी द्वारा समर्थित हैं:

| ट्रांसपोर्ट       | स्थान                                       | कब उपयोग करें                                          |
| :---------------- | :------------------------------------------ | :----------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE इंटीग्रेशन (Claude Desktop, Cursor आदि)            |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | ऐसे ब्राउज़र/एजेंट क्लाइंट जिन्हें इवेंट स्ट्रीम चाहिए |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | बहु-सत्रीय HTTP क्लाइंट (`mcp-session-id` हेडर)        |

सक्रिय HTTP ट्रांसपोर्ट (`sse` या `streamable-http`) का चयन `mcpTransport` सेटिंग द्वारा किया जाता है। ट्रांसपोर्ट बदलने पर दूसरे ट्रांसपोर्ट के मौजूदा सत्र बंद हो जाते हैं।

### रिमोट एक्सेस (manage-scope बायपास)

`/api/mcp/*`, LOCAL_ONLY टियर (`src/server/authz/routeGuard.ts`) में है — डिफ़ॉल्ट रूप से केवल लूपबैक होस्ट (`localhost`, `127.0.0.1`, `::1`) ही इस तक पहुँच सकते हैं। v3.8.2 से, गैर-लूपबैक क्लाइंट तभी कनेक्ट हो सकते हैं, जब वे ऐसा `Authorization: Bearer <api-key>` प्रस्तुत करें जिसकी कुंजी में `manage` स्कोप हो। टनल, रिवर्स प्रॉक्सी या सार्वजनिक होस्टनेम के माध्यम से रिमोट MCP सर्वर तक पहुँचने का यही एकमात्र तरीका है।

```bash
# manage स्कोप प्रदान करें: डैशबोर्ड का API Keys पेज खोलें और कुंजी पर
# "Management Access" टॉगल करें, या बनाते समय POST scopes:["manage"] भेजें।

# इसके बाद किसी रिमोट MCP क्लाइंट से कनेक्ट करें:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

गैर-`manage` कुंजी (या Bearer के अभाव) में `403 LOCAL_ONLY` लौटाया जाता है। संबद्ध प्रीफ़िक्स `/api/cli-tools/runtime/*` को जानबूझकर बायपास नहीं किया जा सकता — देखें [रूट गार्ड टियर — manage-scope अपवाद](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)।

## IDE कॉन्फ़िगरेशन

Claude Desktop, Cursor, Cline और संगत MCP क्लाइंट सेटअप के लिए [MCP क्लाइंट कॉन्फ़िगरेशन](../guides/SETUP_GUIDE.md#mcp-client-configuration) देखें।

---

## आवश्यक टूल (14) — चरण 1

| टूल                             | स्कोप                 | विवरण                                                                                                                                 |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_get_health`          | `read:health`         | अपटाइम, मेमोरी, सर्किट ब्रेकर, रेट लिमिट, कैश आँकड़े                                                                                  |
| `omniroute_list_combos`         | `read:combos`         | रणनीतियों सहित सभी कॉन्फ़िगर किए गए कॉम्बो (वैकल्पिक मेट्रिक्स)                                                                       |
| `omniroute_get_combo_metrics`   | `read:combos`         | किसी विशिष्ट कॉम्बो के लिए प्रदर्शन मेट्रिक्स                                                                                         |
| `omniroute_switch_combo`        | `write:combos`        | किसी कॉम्बो को सक्रिय या निष्क्रिय करें                                                                                               |
| `omniroute_create_combo`        | `write:combos`        | मौजूदा कॉम्बो API के माध्यम से एक सत्यापित कॉम्बो बनाएँ                                                                               |
| `omniroute_check_quota`         | `read:quota`          | उपयोग किया गया/कुल कोटा, शेष प्रतिशत, रीसेट समय, टोकन की स्थिति                                                                       |
| `omniroute_route_request`       | `execute:completions` | OmniRoute रूटिंग के माध्यम से चैट कम्प्लीशन भेजें                                                                                     |
| `omniroute_cost_report`         | `read:usage`          | अवधि के अनुसार लागत रिपोर्ट (सत्र/दिन/सप्ताह/माह)                                                                                     |
| `omniroute_list_models_catalog` | `read:models`         | क्षमताओं, स्थिति और मूल्य निर्धारण सहित संपूर्ण मॉडल कैटलॉग                                                                           |
| `omniroute_radar_catalog`       | `read:radar`          | स्थानीय हस्ताक्षरित Radar कैटलॉग; वैकल्पिक प्रोवाइडर/फ़ैमिली फ़िल्टर                                                                  |
| `omniroute_tool_search`         | `read:tools`          | पंजीकृत MCP कैटलॉग से टूल खोजें                                                                                                       |
| `omniroute_web_search`          | `execute:search`      | कॉन्फ़िगर किए गए सर्च प्रोवाइडर के माध्यम से वेब पर खोजें। X/Twitter पर नहीं।                                                         |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok के माध्यम से X पर खोजें, या Xquik API परिणामों के लिए `xquik-search` चुनें। चयनित बैकएंड के लिए क्रेडेंशियल आवश्यक हैं। |
| `omniroute_web_fetch`           | `execute:search`      | कॉन्फ़िगर किए गए फ़ेच प्रोवाइडर के माध्यम से वेब सामग्री प्राप्त करें                                                                 |

## उन्नत टूल (11) — चरण 2

| टूल                                | स्कोप                                | विवरण                                                                                                            |
| :--------------------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | फ़ॉलबैक ट्री के साथ ड्राई-रन रूटिंग सिमुलेशन                                                                     |
| `omniroute_set_budget_guard`       | `write:budget`                       | डिग्रेड/ब्लॉक/अलर्ट कार्रवाई वाला सत्र बजट                                                                       |
| `omniroute_set_routing_strategy`   | `write:combos`                       | रनटाइम पर कॉम्बो रणनीति अपडेट करें (प्राथमिकता/भारित/स्वचालित/आदि)                                               |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` रेज़िलिएंस प्रीसेट लागू करें                                          |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | वास्तविक अपस्ट्रीम कॉल का उपयोग करके किसी कॉम्बो में प्रत्येक प्रदाता का लाइव परीक्षण                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 विलंबता और सर्किट ब्रेकर स्थिति सहित प्रति-प्रदाता मेट्रिक्स                                         |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | बजट/विलंबता प्रतिबंधों के साथ कार्य प्रकार के अनुसार कॉम्बो की अनुशंसा करें                                      |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | बताएँ कि किसी अनुरोध को किसी प्रदाता तक क्यों रूट किया गया (स्कोरिंग कारक + फ़ॉलबैक)                             |
| `omniroute_get_session_snapshot`   | `read:usage`                         | संपूर्ण सत्र स्नैपशॉट: लागत, टोकन, शीर्ष मॉडल/प्रदाता, त्रुटियाँ, बजट गार्ड                                      |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | टूटे हुए कॉम्बो संदर्भों / ऑर्फ़न पंक्तियों जैसे डेटाबेस ड्रिफ्ट का निदान (और वैकल्पिक रूप से स्वतः-मरम्मत) करें |
| `omniroute_sync_pricing`           | `pricing:write`                      | बाहरी स्रोतों (LiteLLM) से मूल्य निर्धारण डेटा सिंक करें; `dryRun` समर्थित है                                    |

## कैश टूल (2)

| टूल                     | स्कोप         | विवरण                                                        |
| :---------------------- | :------------ | :----------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | सिमेंटिक कैश, प्रॉम्प्ट कैश और आइडेम्पोटेंसी आँकड़े          |
| `omniroute_cache_flush` | `write:cache` | कैश को वैश्विक रूप से या हस्ताक्षर/मॉडल के अनुसार फ़्लश करें |

## कम्प्रेशन टूल (13)

| टूल                                 | स्कोप               | विवरण                                                                                                            |
| :---------------------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | कम्प्रेशन सेटिंग्स, एनालिटिक्स सारांश और कैश-जागरूक आँकड़े (`analytics.mcpDescriptionCompression` मेटाडेटा सहित) |
| `omniroute_compression_configure`   | `write:compression` | कम्प्रेशन मोड, थ्रेशोल्ड, लक्ष्य अनुपात, सिस्टम-प्रॉम्प्ट संरक्षण और MCP विवरण कम्प्रेशन टॉगल कॉन्फ़िगर करें     |
| `omniroute_set_compression_engine`  | `write:compression` | सक्रिय इंजन (off/caveman/rtk/stacked) और Caveman/RTK तीव्रता चुनें                                               |
| `omniroute_list_compression_combos` | `read:compression`  | नामित कम्प्रेशन कॉम्बो और उनकी इंजन पाइपलाइन सूचीबद्ध करें                                                       |
| `omniroute_compression_combo_stats` | `read:compression`  | कम्प्रेशन कॉम्बो और इंजन के अनुसार समूहीकृत एनालिटिक्स                                                           |
| `omniroute_ccr_store`               | `write:compression` | सीमित इन-मेमोरी CCR स्टोर में कॉलर-पृथक सामग्री संग्रहीत करें और एक मार्कर के साथ `ccr://` संदर्भ लौटाएँ         |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR सामग्री को पूर्ण रूप में या हेड, टेल, पंक्तियाँ, grep और आँकड़े मोड के साथ पुनर्प्राप्त करें                 |
| `omniroute_ccr_inspect`             | `read:compression`  | सामग्री लौटाए बिना कॉलर-स्वामित्व वाले CCR मेटाडेटा का निरीक्षण करें                                             |
| `omniroute_ccr_list`                | `read:compression`  | कॉलर-स्वामित्व वाले CCR ब्लॉक के लिए पृष्ठांकित मेटाडेटा सूचीबद्ध करें                                           |
| `omniroute_ccr_delete`              | `write:compression` | कॉलर-स्वामित्व वाला CCR ब्लॉक हटाएँ                                                                              |
| `omniroute_ccr_stats`               | `read:compression`  | कॉलर-स्कोप्ड मेमोरी उपयोग, जीवनचक्र काउंटर और स्टोर सीमाएँ रिपोर्ट करें                                          |
| `omniroute_rtk_discover`            | `read:compression`  | ऑप्ट-इन RTK आउटपुट नमूनों में बार-बार आने वाले शोर का पता लगाएँ                                                  |
| `omniroute_rtk_learn`               | `read:compression`  | ऑप्ट-इन नमूनों से समीक्षा योग्य RTK फ़िल्टर ड्राफ़्ट जनरेट करें                                                  |

CCR प्रविष्टियाँ केवल इन-मेमोरी होती हैं और पुनः आरंभ करने पर गायब हो जाती हैं। प्रत्येक ब्लॉक 2 MiB, प्रत्येक
प्रिंसिपल 16 MiB और वैश्विक स्टोर 64 MiB तक सीमित है। प्रविष्टियों का डिफ़ॉल्ट TTL 24 घंटे (अधिकतम
सात दिन) है। पूर्ण MCP पुनर्प्राप्ति 256 KiB तक सीमित है; बड़े ब्लॉक रेंज्ड और grep मोड के माध्यम से
उपलब्ध रहते हैं। भंडारण, पुनर्प्राप्ति, सूचीकरण, निरीक्षण, विलोपन और आँकड़े प्रमाणित
API-कुंजी प्रिंसिपल के अनुसार पृथक होते हैं। ऑडिट रिकॉर्ड में हैश और आकार मेटाडेटा होते हैं, सामग्री कभी नहीं।

`omniroute_compression_status`, MCP विवरण संपीड़न की रिपोर्ट अलग से
`analytics.mcpDescriptionCompression` के अंतर्गत करता है। वे मान MCP की सूचीबद्ध की जा सकने वाली
विवरण-सामग्री (`tools`, `prompts`, `resources`, और `resourceTemplates`) के लिए मेटाडेटा-आकार के अनुमान हैं; वे प्रदाता उपयोग
रसीदें नहीं हैं और उन्हें `source: "mcp_metadata_estimate"` से चिह्नित किया जाता है।

### MCP एक्सेसिबिलिटी ट्री फ़िल्टर (v3.8.0)

ऊपर दिए गए संपीड़न टूल से अलग, OmniRoute में निष्पादन के बाद लागू होने वाला एक फ़िल्टर शामिल है, जो
MCP ब्राउज़र/एक्सेसिबिलिटी टूल के **टूल परिणामों** को एजेंट को लौटाए जाने से पहले
संपीड़ित करता है। यह फ़िल्टर स्वयं कोई टूल नहीं है — यह ऐसे किसी भी टूल परिणाम पर पारदर्शी रूप से चलता है जिसमें
विस्तृत एक्सेसिबिलिटी-ट्री या ब्राउज़र-स्नैपशॉट टेक्स्ट (≥2000 वर्ण) होता है।

मुख्य व्यवहार:

- लगातार दोहराई गई ≥30 सहोदर पंक्तियों को प्रारंभिक भाग + अंतिम भाग के सारांश में संक्षिप्त करता है
- Playwright/computer-use के लिए आवश्यक `[ref=eXX]` एंकर सुरक्षित रखता है
- अत्यधिक बड़े टेक्स्ट (>50,000 वर्ण) को नेविगेशन संकेत के साथ निश्चित सीमा पर काटता है
- अपेक्षित बचत: ब्राउज़र स्नैपशॉट पेलोड पर **60–80%**

कॉन्फ़िगरेशन: वैश्विक सेटिंग्स में `compression.mcpAccessibility` (माइग्रेशन 056)।
कार्यान्वयन: `open-sse/services/compression/engines/mcpAccessibility/`।
पूर्ण दस्तावेज़: [संपीड़न इंजन — MCP एक्सेसिबिलिटी ट्री फ़िल्टर](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)।

इन टूल के पीछे के रनटाइम संपीड़न मॉडल के लिए [संपीड़न इंजन](../compression/COMPRESSION_ENGINES.md) और [RTK संपीड़न](../compression/RTK_COMPRESSION.md) देखें।

## 1Proxy उपकरण (3)

| उपकरण                       | स्कोप          | विवरण                                                                                       |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy मार्केटप्लेस से निःशुल्क प्रॉक्सी प्राप्त करें (प्रोटोकॉल/देश/गुणवत्ता/सीमा फ़िल्टर) |
| `omniroute_oneproxy_rotate` | `read:proxies` | रणनीति (`random` / `quality` / `sequential`) के अनुसार अगली उपलब्ध प्रॉक्सी प्राप्त करें    |
| `omniroute_oneproxy_stats`  | `read:proxies` | पूल आँकड़े, सिंक स्थिति, प्रोटोकॉल और देश के अनुसार वितरण                                   |

## मेमोरी उपकरण (3)

`open-sse/mcp-server/tools/memoryTools.ts` में परिभाषित। प्रमाणीकरण/स्कोप मानक MCP स्कोप पाइपलाइन के माध्यम से लागू किया जाता है।

| उपकरण                     | स्कोप          | विवरण                                                                                                                     |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | टोकन-बजट प्रवर्तन के साथ क्वेरी / प्रकार / API कुंजी द्वारा मेमोरी खोजें                                                  |
| `omniroute_memory_add`    | `write:memory` | नई मेमोरी प्रविष्टि जोड़ें (`factual` / `episodic` / `procedural` / `semantic`)                                           |
| `omniroute_memory_clear`  | `write:memory` | किसी API कुंजी की मेमोरी साफ़ करें, जिसे वैकल्पिक रूप से प्रकार या `olderThan` टाइमस्टैम्प द्वारा फ़िल्टर किया जा सकता है |

## कौशल उपकरण (4)

`open-sse/mcp-server/tools/skillTools.ts` में परिभाषित। `src/lib/skills/registry` + `src/lib/skills/executor` द्वारा समर्थित।

| उपकरण                         | स्कोप            | विवरण                                                                                   |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API कुंजी, नाम या सक्षम स्थिति के वैकल्पिक फ़िल्टर के साथ पंजीकृत कौशलों की सूची दिखाएँ |
| `omniroute_skills_enable`     | `write:skills`   | ID द्वारा किसी विशिष्ट कौशल को सक्षम या अक्षम करें                                      |
| `omniroute_skills_execute`    | `execute:skills` | दिए गए इनपुट के साथ किसी कौशल को निष्पादित करें और निष्पादन रिकॉर्ड लौटाएँ              |
| `omniroute_skills_executions` | `read:skills`    | हालिया कौशल निष्पादन इतिहास की सूची दिखाएँ                                              |

## Notion संदर्भ स्रोत (6)

`open-sse/mcp-server/tools/notionTools.ts` में परिभाषित। टोकन को `src/lib/db/notion.ts` के माध्यम से `key_value` तालिका में संग्रहीत किया जाता है। REST क्लाइंट `src/lib/notion/api.ts` में है। सेटिंग्स API `src/app/api/settings/notion/route.ts` में है। डैशबोर्ड UI `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` में है।

अपने Notion एकीकरण टोकन को Endpoint डैशबोर्ड के **संदर्भ स्रोत** टैब से या REST API के माध्यम से कॉन्फ़िगर करें:

```bash
# टोकन सेट करें
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# स्थिति जाँचें
curl http://localhost:20128/api/settings/notion

# डिस्कनेक्ट करें
curl -X DELETE http://localhost:20128/api/settings/notion
```

| उपकरण                        | स्कोप          | विवरण                                                               |
| :--------------------------- | :------------- | :------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | सभी पृष्ठों और डेटाबेस में पूर्ण-पाठ खोज करें                       |
| `notion_get_page`            | `read:notion`  | किसी पृष्ठ को उसकी प्रॉपर्टीज़ सहित ID द्वारा प्राप्त करें          |
| `notion_list_block_children` | `read:notion`  | किसी पृष्ठ या ब्लॉक के चाइल्ड ब्लॉक सूचीबद्ध करें                   |
| `notion_query_database`      | `read:notion`  | फ़िल्टर, सॉर्ट और पेजिनेशन के साथ किसी डेटाबेस को क्वेरी करें       |
| `notion_get_database`        | `read:notion`  | ID द्वारा डेटाबेस स्कीमा प्राप्त करें                               |
| `notion_append_blocks`       | `write:notion` | किसी पैरेंट ब्लॉक में चाइल्ड ब्लॉक जोड़ें (प्रति अनुरोध अधिकतम 100) |

## Agent Skill कैटलॉग टूल्स (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` में परिभाषित। `src/lib/agentSkills/catalog` द्वारा समर्थित। ये टूल्स 45-प्रविष्टियों वाले Agent Skills दस्तावेज़ीकरण कैटलॉग को MCP क्लाइंट्स और बाहरी एजेंट्स के लिए उपलब्ध कराते हैं। स्कोप: `read:catalog`।

| टूल                               | स्कोप्स        | विवरण                                                                                                                                      |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | वैकल्पिक `category` (api\|cli) और `area` फ़िल्टर्स के साथ सभी 45 agent skills सूचीबद्ध करता है; मेटाडेटा + कवरेज लौटाता है                 |
| `omniroute_agent_skills_get`      | `read:catalog` | कैनोनिकल `id` द्वारा किसी एक skill का पूर्ण मेटाडेटा + SKILL.md सामग्री प्राप्त करता है                                                    |
| `omniroute_agent_skills_coverage` | `read:catalog` | कवरेज आँकड़े: 23 API, 21 CLI और 1 config skills में से कितनों के लिए फ़ाइल सिस्टम पर SKILL.md फ़ाइलें उपलब्ध हैं बनाम कैटलॉग के कुल आँकड़े |

पूर्ण कैटलॉग और बाहरी एजेंट्स द्वारा इसके उपयोग के तरीके के लिए [AGENT-SKILLS.md](./AGENT-SKILLS.md) देखें।

## संबंधित फ़्रेमवर्क्स (v3.8.0)

ऊपर दी गई MCP टूल इन्वेंटरी (110 अद्वितीय टूल्स, `countUniqueMcpTools()` द्वारा गणना की गई) जानबूझकर
रनटाइम रूटिंग/कैश/कंप्रेशन/मेमोरी/स्किल्स/प्रॉक्सी/कॉन्टेक्स्ट-सोर्स ऑपरेशंस तक सीमित है। v3.8.0 में MCP सर्वर के साथ
दो संबद्ध फ़्रेमवर्क्स उपलब्ध कराए जाते हैं और उनका दस्तावेज़ीकरण अलग से किया गया है:

### Cloud Agents

Cloud Agents आउट-ऑफ़-प्रोसेस AI कोडिंग एजेंट्स (codex-cloud, cursor-cloud, devin, jules) हैं, जिन्हें
LLM प्रदाताओं के लिए उपयोग किए जाने वाले समान कनेक्शन मॉडल के माध्यम से OmniRoute में जोड़ा गया है। इन्हें
इनकी अपनी REST सतह (`/api/v1/agents/*`) के माध्यम से उपलब्ध कराया जाता है और ये MCP टूल कैटलॉग का हिस्सा **नहीं** हैं
— किसी Cloud Agent को कॉल करने पर कोई MCP स्कोप उपयोग नहीं होता।

- कार्यान्वयन: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`)।
- जीवनचक्र: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`।
- दस्तावेज़ीकरण: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)।

### Guardrails

Guardrails निष्पादन-पूर्व/पश्चात फ़िल्टर्स (vision-bridge, pii-masker, prompt-injection) हैं,
जिन्हें चैट पाइपलाइन के भीतर लागू किया जाता है। ये MCP टूल/रूट लेयर तक पहुँचने से पहले चलते हैं
और ऑडिट पाइपलाइन में संरचित उल्लंघन उत्सर्जित करते हैं; इन्हें MCP टूल्स के रूप में इनवोक नहीं किया जाता।

- कार्यान्वयन: `src/lib/guardrails/`।
- दस्तावेज़ीकरण: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)।

ब्लॉक हुई प्रतीत होने वाली किसी MCP कॉल को डीबग करते समय, MCP ऑडिट लॉग
(`scope_denied:*` प्रविष्टियाँ) और guardrails ऑडिट ट्रेल दोनों की जाँच करें — कोई अनुरोध MCP स्कोप प्रवर्तन लेयर तक
पहुँचने से **पहले** ही किसी guardrail द्वारा अस्वीकार किया जा सकता है।

---

## REST API एंडपॉइंट्स

| एंडपॉइंट               | मेथड                  | विवरण                                                                                                         | प्रमाणीकरण           |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------ | :------------------- |
| `/api/mcp/status`      | `GET`                 | सर्वर स्थिति: हार्टबीट, HTTP ट्रांसपोर्ट स्थिति, ऑडिट गतिविधि सारांश                                          | प्रबंधन (सेशन/एडमिन) |
| `/api/mcp/tools`       | `GET`                 | टूल कैटलॉग (नाम, विवरण, स्कोप्स, चरण, स्रोत एंडपॉइंट्स)                                                       | प्रबंधन              |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ट्रांसपोर्ट एंडपॉइंट (`mcpEnabled` + `mcpTransport === "sse"` द्वारा नियंत्रित)                           | API कुंजी + स्कोप्स  |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | स्ट्रीम करने योग्य HTTP ट्रांसपोर्ट (`mcp-session-id` हेडर का उपयोग करता है; `DELETE` से सेशन समाप्त होता है) | API कुंजी + स्कोप्स  |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` से ऑडिट लॉग प्रविष्टियाँ (फ़िल्टर्स: `limit`, `offset`, `tool`, `success`, `apiKeyId`)       | प्रबंधन              |
| `/api/mcp/audit/stats` | `GET`                 | समेकित ऑडिट आँकड़े (`totalCalls`, `successRate`, `avgDurationMs`, शीर्ष टूल्स)                                | प्रबंधन              |

स्रोत फ़ाइलें: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`।

जब तक Settings में MCP सर्वर सक्षम (`mcpEnabled`) नहीं किया जाता और उपयुक्त `mcpTransport` नहीं चुना जाता, तब तक SSE और Streamable HTTP दोनों ट्रांसपोर्ट ब्लॉक रहते हैं। यदि गलत ट्रांसपोर्ट कॉन्फ़िगर किया गया है, तो रूट सेटिंग्स बदलने के संकेत के साथ HTTP 400 लौटाता है।

---

## प्रमाणीकरण और स्कोप

MCP टूल कॉलर से स्कोप स्ट्रिंग पढ़ता है। वह जाँच तीन स्वतंत्र नेमस्पेस में से एक है। एक चेकर से पास होना दूसरों से पास होना नहीं है। नियम [तीन स्कोप नेमस्पेस](#three-scope-namespaces) हैं। टूल कैटलॉग [MCP टूल स्कोप](#mcp-tool-scopes) है।

### तीन स्कोप नेमस्पेस

एक API कुंजी पर `manage`, एक MCP टूल पर `read:compression`, और एक `oma_live_…` एक्सेस टोकन पर `read` तीन अलग-अलग अनुमतियाँ हैं। जो कॉलर एक `read` एक्सेस टोकन को एक म्यूटेटिंग मैनेजमेंट रूट पर भेजते हैं, उन्हें HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` मिलता है। वह रैंक `scopeSatisfies` है। यह MCP तालिका से परामर्श नहीं करता है, और MCP मैचर इससे परामर्श नहीं करता है।

| नेमस्पेस           | क्रेडेंशियल                                                | चेकर              | एक पास अनुमति देता है                                       |
| :----------------- | :--------------------------------------------------------- | :---------------- | :---------------------------------------------------------- |
| API-कुंजी प्रबंधन  | `api_keys.scopes`                                          | `hasManageScope`  | उस Bearer कुंजी के लिए प्रबंधन REST                         |
| API-कुंजी योगात्मक | वही ऐरे, एक सटीक स्ट्रिंग                                  | नीचे नामित हेल्पर | केवल वह एक क्षमता                                           |
| MCP टूल स्कोप      | वही ऐरे, अन्यथा MCP `_meta`, अन्यथा `OMNIROUTE_MCP_SCOPES` | `scopeMatches`    | वह टूल, एक बार प्रवर्तन चालू होने पर                        |
| एक्सेस टोकन        | `oma_live_…`                                               | `scopeSatisfies`  | प्रबंधन रूट जिसकी विधि और पथ को उस रैंक की आवश्यकता होती है |

प्रत्येक क्रेडेंशियल को मिंट करना [प्रबंधन प्रमाणीकरण](../guides/MANAGEMENT-AUTH.md) में शामिल है।

#### API-कुंजी स्कोप

एक `api_keys.scopes` ऐरे दो कार्यों को फ़ीड करता है। वे विभिन्न फ़ंक्शन का उपयोग करते हैं।

**प्रबंधन REST।** `manage` और `admin` `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) के सदस्य हैं। `hasManageScope` उस कुंजी के लिए प्रबंधन मार्गों को अधिकृत करता है। `admin` उन मार्गों पर प्रबंधन-सक्षम है। यहाँ `admin` शब्द एक्सेस-टोकन रैंक नहीं है और यह MCP टूल स्कोप में विस्तारित नहीं होता है।

**योगात्मक स्ट्रिंग।** प्रत्येक एक सटीक सदस्यता परीक्षण है, और प्रत्येक `MANAGEMENT_API_KEY_SCOPES` के बाहर रहता है।

| स्कोप                          | एक पास अनुमति देता है                                                                                                                                                   |
| :----------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | केवल गैर-लूपबैक `/api/mcp/` LOCAL_ONLY कार्व-आउट (`hasMcpConnectOrManageScope`)। `manage` या `admin` वाली कुंजी अभी भी उस कार्व-आउट को पास करती है।                     |
| `self:usage`                   | इस कुंजी के लिए `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`)। `POST /api/keys` बनाने पर इस स्कोप को जोड़ता है (`normalizeSelfServiceScopesForCreate`)। |
| `self:account-quota`           | उस स्थिति पेलोड के भीतर अपस्ट्रीम खाता कोटा (`src/lib/usage/apiKeySelfService.ts`)। स्थिति रूट को अभी भी `self:usage` की आवश्यकता होती है।                              |
| `policy:bypass-provider-quota` | इस कुंजी के अनुमान कॉल प्रदाता-कोटा नीति को छोड़ देते हैं (`src/sse/handlers/chat.ts` में `hasProviderQuotaBypassScope`)।                                               |

#### मिलान

कैटलॉग [MCP टूल स्कोप](#mcp-tool-scopes) के तहत तालिका है। `src/shared/constants/mcpScopes.ts` में `MCP_SCOPE_LIST` को उस कैटलॉग के रूप में न मानें: यह मूल टाइप किया गया सबसेट है। बाद के टूल इसके अलावा आगे के स्कोप घोषित करते हैं (`read:notion`, `read:skills`, `read:local-corpus`, और तालिका के बाकी)।

`open-sse/mcp-server/scopeEnforcement.ts` में `evaluateToolScopes` एक कॉल की अनुमति देता है जब प्रत्येक आवश्यक स्कोप कुछ स्वीकृत स्कोप से मेल खाता है:

- `*` प्रत्येक आवश्यक स्कोप से मेल खाता है।
- एक स्वीकृत स्कोप जो `*` में समाप्त होता है, एक आवश्यक स्कोप से मेल खाता है जो स्टार से पहले उपसर्ग से शुरू होता है। `read:*` `read:compression` से मेल खाता है।
- प्रत्येक अन्य स्वीकृत स्कोप केवल समान आवश्यक स्ट्रिंग से मेल खाता है।

एक कुंजी जिसके स्कोप `["manage"]` हैं, `read:compression` के लिए `scopeMatches` में विफल रहती है। वही कॉल `admin`, `mcp:connect`, `read`, और `write` के लिए विफल रहती है जब वे केवल स्वीकृत स्ट्रिंग होते हैं। ट्रेलिंग `*` से परे MCP टूल स्कोप के बीच कोई पदानुक्रम नहीं है।

प्रवर्तन बंद है जब तक कि `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (डिफ़ॉल्ट `false`) न हो। जब यह बंद होता है, तो `evaluateToolScopes` कॉल की अनुमति देता है और कैटलॉग को छोड़ देता है। जब यह चालू होता है, तो HTTP Bearer कुंजी के `api_keys.scopes` को `authInfo` के रूप में उपयोग करता है ([Per-key HTTP scope binding](#per-key-http-scope-binding-7895) देखें)। जब कोई कुंजी स्कोप हल नहीं होता है, तो स्वीकृत सेट MCP `_meta` पर, फिर `OMNIROUTE_MCP_SCOPES` पर गिर जाता है।

#### एक्सेस-टोकन स्कोप

`oma_live_…` टोकन (`src/lib/accessTokens/scopes.ts`) `read`, `write`, या `admin` ले जाते हैं। `scopeSatisfies` एक रैंक है: `admin` `write` और `read` को कवर करता है, और `write` `read` को कवर करता है। अज्ञात स्कोप कुछ भी कवर नहीं करते हैं।

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) उस रैंक की तुलना `inferRequiredScope` (`src/server/authz/accessScopes.ts`) से करता है:

- `GET`, `HEAD`, और `OPTIONS` को `read` की आवश्यकता होती है।
- प्रत्येक अन्य विधि को `write` की आवश्यकता होती है।
- `ADMIN_SCOPE_PREFIXES` में पथों को प्रत्येक विधि के लिए `admin` की आवश्यकता होती है। `/api/mcp` उस सूची में है, इसलिए एक `write` एक्सेस टोकन अभी भी MCP HTTP सतह को कॉल नहीं कर सकता है।
- `ADMIN_MUTATION_PREFIXES` में पथों को केवल म्यूटेशन के लिए `admin` की आवश्यकता होती है।

`PATCH /api/keys/{id}` एक म्यूटेशन है और उन व्यवस्थापक सूचियों में नहीं है, इसलिए एक
`read` टोकन को 403
`Access token scope 'read' is insufficient; 'write' required.` प्राप्त होता है।
एक `write` या `admin` एक्सेस टोकन उस रूट को संतुष्ट करता है। एक डैशबोर्ड JWT, लूपबैक CLI
मशीन-आईडी टोकन, और `manage` या `admin` के साथ एक API कुंजी
अन्य शाखाओं का उपयोग करती है और इस रैंक द्वारा संकुचित नहीं होती है।

एक एक्सेस टोकन जो `/api/mcp` के लिए `scopeSatisfies` पास करता है, उसने
केवल प्रबंधन गेट को साफ़ किया है। टूल कॉल अभी भी API-कुंजी
स्कोप के विरुद्ध `scopeMatches` चलाते हैं। एक्सेस-टोकन रैंक `scopeMatches` के लिए एक इनपुट नहीं है।

### MCP टूल स्कोप

स्कोप प्रवर्तन `open-sse/mcp-server/scopeEnforcement.ts` में केंद्रीकृत है।
प्रत्येक टूल को विशिष्ट स्कोप की आवश्यकता होती है:

| दायरा                 | उपकरण                                                                                                                                                                       |
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
| `read:obsidian`       | 13 रीड टूल्स — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 राइट टूल्स — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                           |

वाइल्डकार्ड स्कोप समर्थित हैं: `read:*` सभी रीड-स्कोप प्रदान करता है, `*` पूर्ण पहुँच प्रदान करता है।

### `mcp:connect` — संकीर्ण मार्ग क्षमता (#7895)

गैर-लूपबैक से HTTP/SSE MCP ट्रांसपोर्ट (`/api/mcp/*`) तक पहुँचने के लिए `/api/mcp/` LOCAL_ONLY कार्व-आउट (देखें `docs/security/ROUTE_GUARD_TIERS.md`) की आवश्यकता होती है। ऐतिहासिक रूप से वह कार्व-आउट केवल एक पूर्ण `manage`/`admin`-स्कोप API कुंजी स्वीकार करता था — एक ऐसे कॉलर के लिए बहुत व्यापक जिसे केवल MCP से बात करने की आवश्यकता है। `src/shared/constants/managementScopes.ts` अब `MCP_CONNECT_SCOPE = "mcp:connect"` निर्यात करता है: एक योगात्मक, संकीर्ण स्कोप (उसी मिसाल के तौर पर जैसे `SELF_USAGE_SCOPE`) जो `src/server/authz/policies/management.ts` में केवल `/api/mcp/` बाईपास को अधिकृत करता है — यह किसी अन्य प्रबंधन-मार्ग पहुँच को प्रदान नहीं करता है और जानबूझकर `MANAGEMENT_API_KEY_SCOPES` से बाहर रखा गया है। `manage`/`admin` रखने वाली एक कुंजी अभी भी कार्व-आउट को अपरिवर्तित पास करती है; `mcp:connect` दूरस्थ MCP-केवल कॉलर्स के लिए एक कम-विशेषाधिकार वाला विकल्प है, जिसे `hasMcpConnectOrManageScope()` के माध्यम से जाँच की जाती है।

### प्रति-कुंजी HTTP स्कोप बाइंडिंग (#7895)

HTTP/SSE पर, `open-sse/mcp-server/httpTransport.ts` अब कॉलर के वास्तविक `api_keys.scopes` को `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) के माध्यम से हल करता है और इसे MCP SDK के `transport.handleRequest(req, { authInfo })` को पास करता है, ताकि प्रत्येक टूल कॉल तक पहुँचने वाला `extra.authInfo.scopes` बेयरर कुंजी के अपने स्कोप को दर्शाता है। `scopeEnforcement.ts` का `resolveCallerScopeContext()` पहले से ही `_meta` और `OMNIROUTE_MCP_SCOPES` env फ़ॉलबैक पर `authInfo` को प्राथमिकता देता था — यह केवल उस पहले, उच्चतम-प्राथमिकता वाले स्रोत को पॉप्युलेट करता है, जिसे पहले HTTP पर फीड नहीं किया गया था। जब कोई API कुंजी हल नहीं होती है (कोई हेडर नहीं, अमान्य कुंजी), `authInfo` `undefined` रहता है और रिज़ॉल्यूशन मौजूदा `meta`/env चेन तक अपरिवर्तित रहता है। यह `OMNIROUTE_MCP_ENFORCE_SCOPES` के डिफ़ॉल्ट को नहीं बदलता है — प्रवर्तन को अभी भी स्पष्ट रूप से सक्षम करना होगा; यह परिवर्तन केवल प्रति-कुंजी पथ को प्राथमिकता देता है एक बार जब यह हो जाता है। stdio की कोई प्रति-कॉलर पहचान नहीं होती है (देखें `mcpCallerIdentity.ts`) और अप्रभावित रहता है — यह `_meta`/env फ़ॉलबैक चेन पर रहता है।

## पर्यावरण चर

| चर                                      | डिफ़ॉल्ट                                  | उद्देश्य                                                                                                                                    |
| :-------------------------------------- | :---------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                  | आंतरिक OmniRoute API को कॉल करते समय MCP सर्वर द्वारा उपयोग किया जाने वाला आधार URL                                                         |
| `OMNIROUTE_API_KEY`                     | (रिक्त)                                   | आंतरिक API कॉल में `Authorization: Bearer` के रूप में अग्रेषित की जाने वाली API कुंजी                                                       |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (केवल `"true"` इसे सक्षम करता है) | सक्षम होने पर, अनुपलब्ध स्कोप टूल कॉल को अस्वीकार करते हैं और ऑडिट लॉग में `scope_denied:<reason>` दर्ज करते हैं                            |
| `OMNIROUTE_MCP_SCOPES`                  | (रिक्त)                                   | डिफ़ॉल्ट रूप से "उपलब्ध" माने जाने वाले स्कोप की कॉमा से अलग की गई अनुमति-सूची (इसका उपयोग तब होता है, जब कॉलर अपने स्कोप प्रदान नहीं करता) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (असेट नहीं = चालू)                        | `0/false/off/no` पर सेट किए जाने पर, पंजीकरण के समय MCP विवरण संपीड़न अक्षम करता है                                                         |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (असेट नहीं = चालू)                        | उपरोक्त टॉगल का वैकल्पिक उपनाम                                                                                                              |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                   | आंतरिक प्रबंधन रीड (स्वास्थ्य, प्रत्यास्थता, संयोजन, कोटा, उपयोग) के लिए निरस्तीकरण समय-सीमा                                                |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                   | प्रदाता की प्रतीक्षा करने वाले हॉप (`route_request`, `web_search`, `web_fetch`) के लिए निरस्तीकरण समय-सीमा                                  |
| `MCP_TOOL_DENY`                         | (असेट नहीं = कोई फ़िल्टर नहीं)            | `tools/list` से हटाए जाने वाले टूल नामों की कॉमा से अलग की गई सूची (टूल-कार्डिनैलिटी में कमी — नीचे देखें)                                  |
| `MCP_TOOL_ALLOW`                        | (असेट नहीं = कोई फ़िल्टर नहीं)            | केवल बनाए रखने के लिए टूल नामों की कॉमा से अलग की गई सूची (अनुमति-सूची मोड — नीचे देखें)                                                    |
| `DATA_DIR`                              | `~/.omniroute`                            | हार्टबीट फ़ाइल `${DATA_DIR}/runtime/mcp-heartbeat.json` में लिखी जाती है                                                                    |

---

## विवरण संपीड़न

MCP टूल, प्रॉम्प्ट और संसाधन रजिस्ट्री, क्लाइंट के समक्ष प्रस्तुत मेटाडेटा फ़ुटप्रिंट (और इसलिए प्रॉम्प्ट संदर्भ लागत) को कम करने के लिए पंजीकरण/सूचीकरण के समय विवरणों को संपीड़ित कर सकती हैं। इसका कार्यान्वयन `open-sse/mcp-server/descriptionCompressor.ts` में है और इसे `createMcpServer()` के भीतर `compressMcpRegistryMetadata` के माध्यम से MCP सर्वर से जोड़ा गया है।

- संपीड़न, संरक्षित-ब्लॉक निष्कर्षण (कोड स्पैन, फ़ेंस्ड ब्लॉक आदि) के साथ Caveman नियम-समुच्चय (`getRulesForContext("all", "full")`) का उपयोग करके विवरण टेक्स्ट पर चलता है, ताकि संरचनात्मक सामग्री में बदलाव न हो।
- प्रत्येक डिप्लॉयमेंट के लिए `key_value` सेटिंग तालिका में `compression.mcpDescriptionCompressionEnabled` मान के माध्यम से टॉगल करें (डिफ़ॉल्ट: सक्षम) — UI में **Analytics → MCP विवरण संपीड़न** के रूप में उपलब्ध।
- पूरी प्रक्रिया के लिए `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` या `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` में से किसी एक के माध्यम से टॉगल करें।
- रीयल-टाइम आँकड़े `analytics.mcpDescriptionCompression` के अंतर्गत `omniroute_compression_status` के माध्यम से प्रदर्शित किए जाते हैं और वास्तविक प्रदाता उपयोग रसीदों से अलग पहचानने के लिए उन्हें `source: "mcp_metadata_estimate"` से टैग किया जाता है।

---

## टूल कार्डिनैलिटी में कमी (F4.3)

विवरण संपीड़न प्रत्येक टूल के मेटाडेटा को छोटा करता है; **टूल-कार्डिनैलिटी में कमी** इससे एक कदम आगे जाकर यह घटाती है कि कुल _कितने_ टूल घोषित किए जाते हैं। `tools/list` मैनिफ़ेस्ट में कम टूल प्रदर्शित करने से उस टूल कैटलॉग के लिए प्रति-अनुरोध टोकन लागत घटती है, जिसका भुगतान क्लाइंट का मॉडल करता है ("लेयर 5" संपीड़न)। इसका कार्यान्वयन `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) में एक शुद्ध, स्टेटलेस फ़िल्टर है, जिसे `createMcpServer()` (`open-sse/mcp-server/server.ts`) के पंजीकरण लूप में जोड़ा गया है।

**ऑप्ट-इन, डिफ़ॉल्ट रूप से बंद।** फ़िल्टर केवल तभी चलता है जब दो पर्यावरण वेरिएबल में से कम-से-कम एक सेट हो; दोनों में से कोई भी सेट न होने पर सभी 110 टूल बिना बदलाव के घोषित किए जाते हैं।

| वेरिएबल          | मोड                                                                                      |
| :--------------- | :--------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | ब्लैकलिस्ट — कॉमा से अलग किए गए टूल नाम, जिन्हें हमेशा `tools/list` से हटा दिया जाता है  |
| `MCP_TOOL_ALLOW` | अनुमति-सूची — कॉमा से अलग किए गए टूल नाम; केवल ये बने रहते हैं, बाकी सब हटा दिए जाते हैं |

`deny`, `allow` पर प्राथमिकता लेता है। नाम कॉमा से अलग किए जाते हैं, उनके आसपास की खाली जगह हटाई जाती है, और खाली प्रविष्टियों को अनदेखा किया जाता है। उदाहरण:

```bash
# कैटलॉग से दो टूल हटाएँ
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# केवल रूटिंग + कोटा टूल घोषित करें (अनुमति-सूची मोड)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**फ़िल्टर किए गए टूल कैसे हटाए जाते हैं:** पंजीकरण हमेशा सफल होता है; प्रोफ़ाइल द्वारा अस्वीकार किए गए टूल को फिर MCP SDK हैंडल पर `.disable()` किया जाता है, इसलिए वह कभी भी `tools/list` में दिखाई नहीं देता, लेकिन वायरिंग यथावत रहती है (साफ़-सुथरा सक्षम/अक्षम करना, कोई पुनः-पंजीकरण नहीं)। प्रोफ़ाइल पार्सर `readMcpToolProfileFromEnv(process.env)` है, जो दोनों वेरिएबल खाली होने पर `null` (कोई फ़िल्टरिंग नहीं) लौटाता है।

`reduceToolManifest` के पीछे मौजूद अधिक समृद्ध `ToolProfile` संरचना स्कोप-इंटरसेक्शन फ़िल्टरिंग (`allowScopes`, जिसमें `read:*`-शैली की वाइल्डकार्ड मैचिंग है) और एक निर्धारक `maxTools` सीमा का भी समर्थन करती है, लेकिन इन दोनों नियंत्रणों को पंजीकरण के समय पूर्ण मैनिफ़ेस्ट की आवश्यकता होती है और आज इन्हें पर्यावरण वेरिएबल के माध्यम से उजागर **नहीं** किया गया है (`tools/list`-स्तरीय हुक एक ट्रैक किया गया अनुवर्ती कार्य है)। कमी से पहले और बाद में मैनिफ़ेस्ट की टोकन लागत की तुलना करने के लिए `estimateManifestTokens()` उपलब्ध है।

---

## रनटाइम हार्टबीट

stdio ट्रांसपोर्ट हर 5 सेकंड में लाइवनेस को `${DATA_DIR}/runtime/mcp-heartbeat.json` में सहेजता है। डैशबोर्ड (`/api/mcp/status`) `online` निर्धारित करने के लिए इस फ़ाइल के साथ PID लाइवनेस को पढ़ता है। इसके बजाय HTTP ट्रांसपोर्ट इन-प्रोसेस `getMcpHttpStatus()` से स्थिति रिपोर्ट करते हैं (कोई फ़ाइल लेखन नहीं)।

हार्टबीट स्नैपशॉट में यह शामिल होता है:

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

## ऑडिट लॉगिंग

प्रत्येक टूल कॉल को `open-sse/mcp-server/audit.ts` द्वारा SQLite की `mcp_tool_audit` तालिका में लॉग किया जाता है:

- टूल का नाम, आर्ग्युमेंट (`auditLevel` के अनुसार प्रत्येक टूल के लिए हैश किए गए/संक्षिप्त किए गए), परिणाम
- मिलीसेकंड में अवधि, सफलता/विफलता फ़्लैग, त्रुटि संदेश (जब लागू हो)
- API कुंजी हैश, टाइमस्टैम्प
- स्कोप अस्वीकृतियाँ अनुपलब्ध स्कोप सूची के साथ `scope_denied:<reason>` के रूप में लॉग की जाती हैं

हाल के कॉल की जाँच करने के लिए डैशबोर्ड या `/api/mcp/audit` और `/api/mcp/audit/stats` REST एंडपॉइंट का उपयोग करें।

---

## फ़ाइलें

| फ़ाइल                                                                    | उद्देश्य                                                         |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP सर्वर फ़ैक्टरी, stdio प्रवेश बिंदु, स्कोप-आधारित टूल पंजीकरण |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ट्रांसपोर्ट (सेशन प्रबंधन)                 |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | टूल स्कोप मूल्यांकन और कॉलर निर्धारण                             |
| `open-sse/mcp-server/audit.ts`                                           | टूल कॉल ऑडिट लॉगिंग (`mcp_tool_audit`)                           |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio हार्टबीट राइटर (`mcp-heartbeat.json`)                      |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | टूल / प्रॉम्प्ट / रिसोर्स रजिस्ट्रियों के लिए विवरण संपीड़न      |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod स्कीमा + टूल रजिस्ट्री (`MCP_TOOLS`, 45 प्रविष्टियाँ)        |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | चरण 2 + कैश + 1proxy टूल हैंडलर                                  |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | संपीड़न टूल हैंडलर                                               |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | मेमोरी टूल परिभाषाएँ (3 टूल)                                     |
| `open-sse/mcp-server/tools/skillTools.ts`                                | स्किल टूल परिभाषाएँ (4 टूल)                                      |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion संदर्भ स्रोत टूल परिभाषाएँ (6 टूल)                        |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | गेमिफ़िकेशन टूल परिभाषाएँ (8 टूल)                                |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | प्लगइन पंजीकरण और प्रबंधन टूल (8 टूल)                            |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` एंडपॉइंट                                       |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` एंडपॉइंट                                        |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE ट्रांसपोर्ट रूट                               |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP ट्रांसपोर्ट रूट                |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` ऑडिट लॉग क्वेरी                                 |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` समेकित ऑडिट मेट्रिक्स                     |
| `src/lib/notion/api.ts`                                                  | Notion REST API क्लाइंट (पुनः प्रयास, टाइमआउट, त्रुटि वर्गीकरण)  |
| `src/lib/db/notion.ts`                                                   | Notion टोकन स्थायित्व (`key_value` तालिका)                       |
| `src/app/api/settings/notion/route.ts`                                   | Notion सेटिंग्स API (GET/POST/DELETE)                            |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion टोकन प्रबंधन UI                                           |
| `tests/unit/notion-api.test.ts`                                          | Notion API क्लाइंट परीक्षण (7)                                   |
| `tests/unit/notion-tools.test.ts`                                        | Notion टूल स्कोप प्रवर्तन परीक्षण (10)                           |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB मॉड्यूल परीक्षण (3)                                    |
