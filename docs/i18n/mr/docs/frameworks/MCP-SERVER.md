# OmniRoute MCP Server Documentation (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> राउटिंग, कॅशे, कॉम्प्रेशन, मेमरी, स्किल्स, प्रॉक्सी, पूल, Radar आणि कॉन्टेक्स्ट सोर्स ऑपरेशन्समध्ये एकूण 110 टूल्स असलेला Model Context Protocol सर्व्हर.
>
> सत्याचा अधिकृत स्रोत: `open-sse/mcp-server/server.ts` हा `countUniqueMcpTools()` वापरून **110 अद्वितीय टूल्स** मोजतो: 45 प्रमाणित व्याख्या (सहा CCR लाइफसायकल टूल्स, एजंट-स्किल्स त्रिकूट, `omniroute_radar_catalog` आणि `omniroute_x_search` यांसह), तसेच मेमरी (3), स्किल्स (4), GitHub स्किल्स (3), पूल (6), गेमिफिकेशन (8), प्लगइन्स (8), Notion (6), Obsidian (22), स्थानिक कॉर्पस (3) आणि केवळ RTK साठी असलेली दोन कॉम्प्रेशन टूल्स.

## स्थापना

OmniRoute MCP अंगभूत आहे. तो याप्रकारे सुरू करा:

```bash
omniroute --mcp
```

किंवा open-sse ट्रान्सपोर्टद्वारे:

```bash
# HTTP स्ट्रीम करण्यायोग्य ट्रान्सपोर्ट (पोर्ट 20130)
omniroute --dev  # MCP /mcp एंडपॉइंटवर आपोआप सुरू होतो
```

HTTP ट्रान्सपोर्ट्स (`sse` / `streamable-http`, जे डॅशबोर्ड सर्व्हरद्वारे प्रक्रियेअंतर्गत उपलब्ध केले जातात) डीफॉल्टनुसार
बंद असतात आणि यापूर्वी ते फक्त `/dashboard/mcp` पृष्ठावरून टॉगल करता येत होते. v3.8.51 पासून
CLI मध्येही समान सुविधा उपलब्ध आहेत:

```bash
omniroute mcp status                                  # सक्षम/ऑनलाइन, ट्रान्सपोर्ट, टूल्सची संख्या
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # सक्रिय sse/streamable-http सत्रे रीसेट करतो
```

`mcp enable`/`mcp disable` हे `/api/settings` द्वारे डॅशबोर्ड ज्या `mcpEnabled` (आणि पर्यायाने `mcpTransport`) सेटिंगला
टॉगल करतो, त्याच सेटिंगवर PATCH करतात. `mcp restart` हे `POST /api/mcp/restart` कॉल करते: ते
सक्रिय `sse`/`streamable-http` सत्रे बंद करते, जेणेकरून पुढील विनंती स्वच्छपणे पुन्हा इनिशियलाइझ होईल; MCP अक्षम असल्यास
ते `409` आणि `stdio` ट्रान्सपोर्टसाठी `501` परत करते (stdio क्लायंट्स त्यांच्या स्वतःच्या
सबप्रोसेसचे नियंत्रण करतात — रीस्टार्ट करण्यासाठी प्रक्रियेअंतर्गत हँडल उपलब्ध नसते).

## ट्रान्सपोर्ट्स

MCP सर्व्हर तीन ट्रान्सपोर्ट्स उपलब्ध करून देतो आणि त्या सर्वांना समान `createMcpServer()` फॅक्टरीचा आधार आहे:

| ट्रान्सपोर्ट      | कुठे                                           | कधी वापरावे                                                |
| :---------------- | :--------------------------------------------- | :--------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | IDE एकत्रीकरणे (Claude Desktop, Cursor इत्यादी)            |
| `sse`             | `POST/GET /api/mcp/sse` द्वारे `httpTransport` | इव्हेंट स्ट्रीमची आवश्यकता असलेले ब्राउझर/एजंट क्लायंट्स   |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | एकाधिक सत्रे असलेले HTTP क्लायंट्स (`mcp-session-id` हेडर) |

सक्रिय HTTP ट्रान्सपोर्ट (`sse` किंवा `streamable-http`) `mcpTransport` सेटिंगद्वारे निवडला जातो. ट्रान्सपोर्ट बदलल्यास दुसऱ्या ट्रान्सपोर्टवरील विद्यमान सत्रे बंद होतात.

### दूरस्थ प्रवेश (manage-स्कोप बायपास)

`/api/mcp/*` हे LOCAL_ONLY स्तरात (`src/server/authz/routeGuard.ts`) आहे — डीफॉल्टनुसार फक्त लूपबॅक होस्ट्स (`localhost`, `127.0.0.1`, `::1`) त्यापर्यंत पोहोचू शकतात. v3.8.2 पासून, लूपबॅकबाहेरील क्लायंट्सनी `manage` स्कोप असलेली की वापरून `Authorization: Bearer <api-key>` सादर केल्यास ते कनेक्ट होऊ शकतात. टनेल, रिव्हर्स प्रॉक्सी किंवा सार्वजनिक होस्टनेमद्वारे दूरस्थ MCP सर्व्हरपर्यंत पोहोचण्याचा हा एकमेव मार्ग आहे.

```bash
# manage स्कोप मंजूर करा: डॅशबोर्डचे API Keys पृष्ठ उघडा आणि कीवरील
# "Management Access" टॉगल करा किंवा तयार करताना POST scopes:["manage"] वापरा.

# त्यानंतर दूरस्थ MCP क्लायंटवरून कनेक्ट करा:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` स्कोप नसलेली की (किंवा Bearer नसल्यास) `403 LOCAL_ONLY` परत करते. शेजारील प्रीफिक्स `/api/cli-tools/runtime/*` हेतुपुरस्सर बायपास करता येत नाही — [Route Guard स्तर — Manage-स्कोप अपवाद](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) पहा.

## IDE कॉन्फिगरेशन

Claude Desktop, Cursor, Cline आणि सुसंगत MCP क्लायंटच्या सेटअपसाठी [MCP क्लायंट कॉन्फिगरेशन](../guides/SETUP_GUIDE.md#mcp-client-configuration) पहा.

---

## अत्यावश्यक साधने (14) — टप्पा 1

| साधन                            | व्याप्ती              | वर्णन                                                                                                                               |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | अपटाइम, मेमरी, सर्किट ब्रेकर्स, दर मर्यादा, कॅशेची आकडेवारी                                                                         |
| `omniroute_list_combos`         | `read:combos`         | धोरणांसह कॉन्फिगर केलेले सर्व कॉम्बो (पर्यायी मेट्रिक्स)                                                                            |
| `omniroute_get_combo_metrics`   | `read:combos`         | विशिष्ट कॉम्बोसाठी कार्यप्रदर्शन मेट्रिक्स                                                                                          |
| `omniroute_switch_combo`        | `write:combos`        | कॉम्बो सक्रिय किंवा निष्क्रिय करा                                                                                                   |
| `omniroute_create_combo`        | `write:combos`        | विद्यमान कॉम्बो API द्वारे प्रमाणीकरण केलेला कॉम्बो तयार करा                                                                        |
| `omniroute_check_quota`         | `read:quota`          | वापरलेला/एकूण कोटा, उर्वरित टक्केवारी, रीसेट वेळ, टोकनची स्थिती                                                                     |
| `omniroute_route_request`       | `execute:completions` | OmniRoute राउटिंगद्वारे चॅट कम्प्लिशन पाठवा                                                                                         |
| `omniroute_cost_report`         | `read:usage`          | कालावधीनुसार खर्चाचा अहवाल (सत्र/दिवस/आठवडा/महिना)                                                                                  |
| `omniroute_list_models_catalog` | `read:models`         | क्षमता, स्थिती आणि किंमतींसह संपूर्ण मॉडेल कॅटलॉग                                                                                   |
| `omniroute_radar_catalog`       | `read:radar`          | स्थानिक स्वाक्षरीकृत Radar कॅटलॉग; पर्यायी प्रदाता/फॅमिली फिल्टर्स                                                                  |
| `omniroute_tool_search`         | `read:tools`          | नोंदणीकृत MCP कॅटलॉगमधून साधने शोधा                                                                                                 |
| `omniroute_web_search`          | `execute:search`      | कॉन्फिगर केलेल्या शोध प्रदात्यांद्वारे वेब शोध. X/Twitter नाही.                                                                     |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok द्वारे X वर शोधा किंवा Xquik API परिणामांसाठी `xquik-search` निवडा. निवडलेल्या बॅकएंडसाठी क्रेडेन्शियल्स आवश्यक आहेत. |
| `omniroute_web_fetch`           | `execute:search`      | कॉन्फिगर केलेल्या फेच प्रदात्यांद्वारे वेब सामग्री मिळवा                                                                            |

## प्रगत साधने (11) — टप्पा 2

| साधन                               | व्याप्ती                             | वर्णन                                                                                                    |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | फॉलबॅक ट्रीसह ड्राय-रन रूटिंग सिम्युलेशन                                                                 |
| `omniroute_set_budget_guard`       | `write:budget`                       | कार्यक्षमता कमी करणे/ब्लॉक करणे/सूचना देणे या कृतींसह सत्राचे बजेट                                       |
| `omniroute_set_routing_strategy`   | `write:combos`                       | रनटाइममध्ये कॉम्बो धोरण अद्ययावत करा (प्राधान्य/भारित/स्वयंचलित/इत्यादी)                                 |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` पूर्वनियोजित लवचिकता संरचना लागू करा                          |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | वास्तविक अपस्ट्रीम कॉल वापरून कॉम्बोमधील प्रत्येक प्रदात्याची थेट चाचणी करा                              |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 विलंब आणि सर्किट ब्रेकर स्थितीसह प्रत्येक प्रदात्याची मेट्रिक्स                              |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | बजेट/विलंब मर्यादांसह कार्याच्या प्रकारानुसार कॉम्बोची शिफारस करा                                        |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | विनंती एखाद्या प्रदात्याकडे का रूट केली गेली हे स्पष्ट करा (स्कोअरिंग घटक + फॉलबॅक)                      |
| `omniroute_get_session_snapshot`   | `read:usage`                         | संपूर्ण सत्र स्नॅपशॉट: खर्च, टोकन्स, प्रमुख मॉडेल्स/प्रदाते, त्रुटी, बजेट गार्ड                          |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | तुटलेले कॉम्बो संदर्भ/अनाथ पंक्ती यांसारख्या डेटाबेस विसंगतींचे निदान (आणि पर्यायाने स्वयंचलित दुरुस्ती) |
| `omniroute_sync_pricing`           | `pricing:write`                      | बाह्य स्रोतांमधून (LiteLLM) किंमत डेटा समक्रमित करा; `dryRun` समर्थित आहे                                |

## कॅशे साधने (2)

| साधन                    | व्याप्ती      | वर्णन                                                     |
| :---------------------- | :------------ | :-------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | सिमॅंटिक कॅशे, प्रॉम्प्ट-कॅशे आणि आयडेम्पोटन्सी आकडेवारी  |
| `omniroute_cache_flush` | `write:cache` | जागतिक स्तरावर किंवा स्वाक्षरी/मॉडेलनुसार कॅशे रिकामी करा |

## संपीडन साधने (13)

| साधन                                | व्याप्ती            | वर्णन                                                                                                        |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | संपीडन सेटिंग्ज, विश्लेषण सारांश आणि कॅशे-जागरूक आकडेवारी (`analytics.mcpDescriptionCompression` मेटाडेटासह) |
| `omniroute_compression_configure`   | `write:compression` | संपीडन मोड, थ्रेशोल्ड, लक्ष्य गुणोत्तर, सिस्टम-प्रॉम्प्ट जतन आणि MCP वर्णन संपीडन टॉगल कॉन्फिगर करा          |
| `omniroute_set_compression_engine`  | `write:compression` | सक्रिय इंजिन (off/caveman/rtk/stacked) आणि Caveman/RTK तीव्रता निवडा                                         |
| `omniroute_list_compression_combos` | `read:compression`  | नाव दिलेले संपीडन कॉम्बो आणि त्यांच्या इंजिन पाइपलाइनची सूची दाखवा                                           |
| `omniroute_compression_combo_stats` | `read:compression`  | संपीडन कॉम्बो आणि इंजिननुसार गटबद्ध केलेले विश्लेषण                                                          |
| `omniroute_ccr_store`               | `write:compression` | कॉलर-विलग सामग्री मर्यादित इन-मेमरी CCR स्टोअरमध्ये साठवा आणि मार्करसह `ccr://` संदर्भ परत करा               |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR सामग्री पूर्णपणे किंवा शीर्ष, शेवट, ओळी, grep आणि आकडेवारी मोडसह पुनर्प्राप्त करा                        |
| `omniroute_ccr_inspect`             | `read:compression`  | सामग्री परत न करता कॉलरच्या मालकीच्या CCR मेटाडेटाची तपासणी करा                                              |
| `omniroute_ccr_list`                | `read:compression`  | कॉलरच्या मालकीच्या CCR ब्लॉक्ससाठी पृष्ठांकित मेटाडेटाची सूची दाखवा                                          |
| `omniroute_ccr_delete`              | `write:compression` | कॉलरच्या मालकीचा CCR ब्लॉक हटवा                                                                              |
| `omniroute_ccr_stats`               | `read:compression`  | कॉलर-व्याप्त मेमरी वापर, जीवनचक्र मोजमाप आणि स्टोअर मर्यादा नोंदवा                                           |
| `omniroute_rtk_discover`            | `read:compression`  | संमती दिलेल्या RTK आउटपुट नमुन्यांमधील वारंवार येणारा नॉइज शोधा                                              |
| `omniroute_rtk_learn`               | `read:compression`  | संमती दिलेल्या नमुन्यांपासून पुनरावलोकन करता येणारा RTK फिल्टर मसुदा तयार करा                                |

CCR नोंदी केवळ इन-मेमरी असतात आणि रीस्टार्ट केल्यावर अदृश्य होतात. प्रत्येक ब्लॉकची मर्यादा 2 MiB, प्रत्येक
प्रिन्सिपलची मर्यादा 16 MiB आणि जागतिक स्टोअरची मर्यादा 64 MiB आहे. नोंदींसाठी डीफॉल्ट TTL 24 तासांचा असतो (कमाल
सात दिवस). संपूर्ण MCP पुनर्प्राप्ती 256 KiB पर्यंत मर्यादित आहे; मोठे ब्लॉक्स श्रेणीबद्ध आणि grep मोडद्वारे
उपलब्ध राहतात. स्टोरेज, पुनर्प्राप्ती, सूचीकरण, तपासणी, हटवणे आणि आकडेवारी हे प्रमाणित API-key प्रिन्सिपलनुसार विलग केलेले
असतात. ऑडिट नोंदींमध्ये हॅश आणि आकाराचे मेटाडेटा असतात, सामग्री कधीही नसते.

`omniroute_compression_status`, MCP वर्णन संक्षेपणाचा अहवाल
`analytics.mcpDescriptionCompression` अंतर्गत स्वतंत्रपणे देते. ही मूल्ये MCP मध्ये सूचीबद्ध करता येणाऱ्या
वर्णनांसाठी (`tools`, `prompts`, `resources`, आणि `resourceTemplates`) मेटाडेटा-आकाराची अनुमाने आहेत; ती प्रदाता वापराच्या
पावत्या नाहीत आणि त्यांना `source: "mcp_metadata_estimate"` असे चिन्हांकित केलेले आहे.

### MCP प्रवेशयोग्यता ट्री फिल्टर (v3.8.0)

वरील संक्षेपण साधनांपासून स्वतंत्रपणे, OmniRoute मध्ये कार्यवाही-पश्चात फिल्टर समाविष्ट आहे, जो MCP ब्राउझर/प्रवेशयोग्यता साधनांचे **साधन परिणाम** एजंटकडे परत पाठवण्यापूर्वी संक्षिप्त करतो. हा फिल्टर स्वतः साधन नाही — तपशीलवार प्रवेशयोग्यता-ट्री किंवा ब्राउझर-स्नॅपशॉट मजकूर (≥2000 वर्ण) असलेल्या कोणत्याही साधन परिणामावर तो पारदर्शकपणे चालतो.

प्रमुख वर्तन:

- ≥30 सलग पुनरावृत्त सिब्लिंग ओळींना सुरुवात + शेवट अशा सारांशात संक्षिप्त करतो
- Playwright/संगणक-वापरासाठी आवश्यक `[ref=eXX]` अँकर जतन करतो
- अतिमोठा मजकूर (>50,000 वर्ण) नेव्हिगेशन सूचनेसह सक्तीने कापतो
- अपेक्षित बचत: ब्राउझर स्नॅपशॉट पेलोडवर **60–80%**

कॉन्फिगरेशन: जागतिक सेटिंग्जमधील `compression.mcpAccessibility` (मायग्रेशन 056).
अंमलबजावणी: `open-sse/services/compression/engines/mcpAccessibility/`.
संपूर्ण दस्तऐवजीकरण: [संक्षेपण इंजिने — MCP प्रवेशयोग्यता ट्री फिल्टर](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

या साधनांमागील रनटाइम संक्षेपण मॉडेलसाठी [संक्षेपण इंजिने](../compression/COMPRESSION_ENGINES.md) आणि [RTK संक्षेपण](../compression/RTK_COMPRESSION.md) पहा.

## 1Proxy साधने (3)

| साधन                        | व्याप्ती       | वर्णन                                                                                      |
| :-------------------------- | :------------- | :----------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy मार्केटप्लेसमधून विनामूल्य प्रॉक्सी मिळवा (प्रोटोकॉल/देश/गुणवत्ता/मर्यादा फिल्टर्स) |
| `omniroute_oneproxy_rotate` | `read:proxies` | धोरणानुसार पुढील उपलब्ध प्रॉक्सी मिळवा (`random` / `quality` / `sequential`)               |
| `omniroute_oneproxy_stats`  | `read:proxies` | पूलची आकडेवारी, समक्रमण स्थिती आणि प्रोटोकॉल व देशानुसार वितरण                             |

## मेमरी साधने (3)

`open-sse/mcp-server/tools/memoryTools.ts` मध्ये परिभाषित केलेली आहेत. प्रमाणीकरण/व्याप्ती मानक MCP व्याप्ती पाइपलाइनद्वारे लागू केली जाते.

| साधन                      | व्याप्ती       | वर्णन                                                                                        |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | टोकन-बजेट अंमलबजावणीसह क्वेरी / प्रकार / API कीनुसार मेमरी शोधा                              |
| `omniroute_memory_add`    | `write:memory` | नवीन मेमरी नोंद जोडा (`factual` / `episodic` / `procedural` / `semantic`)                    |
| `omniroute_memory_clear`  | `write:memory` | API कीसाठीच्या मेमरी साफ करा; पर्यायाने प्रकार किंवा `olderThan` टाइमस्टॅम्पनुसार फिल्टर करा |

## कौशल्य साधने (4)

`open-sse/mcp-server/tools/skillTools.ts` मध्ये परिभाषित केलेली आहेत. `src/lib/skills/registry` + `src/lib/skills/executor` द्वारे समर्थित.

| साधन                          | व्याप्ती         | वर्णन                                                                                 |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | API की, नाव किंवा सक्षम स्थितीनुसार पर्यायी फिल्टरिंगसह नोंदणीकृत कौशल्यांची यादी करा |
| `omniroute_skills_enable`     | `write:skills`   | ID नुसार विशिष्ट कौशल्य सक्षम किंवा अक्षम करा                                         |
| `omniroute_skills_execute`    | `execute:skills` | दिलेल्या इनपुटसह कौशल्य कार्यान्वित करा आणि कार्यान्वयन नोंद परत करा                  |
| `omniroute_skills_executions` | `read:skills`    | अलीकडील कौशल्य कार्यान्वयन इतिहासाची यादी करा                                         |

## Notion संदर्भ स्रोत (6)

`open-sse/mcp-server/tools/notionTools.ts` मध्ये परिभाषित केलेला आहे. टोकन `src/lib/db/notion.ts` द्वारे `key_value` तक्त्यात संग्रहित केले जाते. REST क्लायंट `src/lib/notion/api.ts` मध्ये आहे. सेटिंग्ज API `src/app/api/settings/notion/route.ts` मध्ये आहे. डॅशबोर्ड UI `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` मध्ये आहे.

तुमचे Notion एकत्रीकरण टोकन Endpoint डॅशबोर्डमधील **संदर्भ स्रोत** टॅबमधून किंवा REST API द्वारे कॉन्फिगर करा:

```bash
# टोकन सेट करा
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# स्थिती तपासा
curl http://localhost:20128/api/settings/notion

# डिस्कनेक्ट करा
curl -X DELETE http://localhost:20128/api/settings/notion
```

| साधन                         | व्याप्ती       | वर्णन                                                                |
| :--------------------------- | :------------- | :------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | सर्व पृष्ठे आणि डेटाबेसेसमध्ये पूर्ण-मजकूर शोध करा                   |
| `notion_get_page`            | `read:notion`  | पृष्ठ त्याच्या गुणधर्मांसह ID द्वारे मिळवा                           |
| `notion_list_block_children` | `read:notion`  | पृष्ठाच्या किंवा ब्लॉकच्या चाइल्ड ब्लॉक्सची यादी करा                 |
| `notion_query_database`      | `read:notion`  | फिल्टर्स, क्रमवारी आणि पृष्ठांकनासह डेटाबेस क्वेरी करा               |
| `notion_get_database`        | `read:notion`  | ID द्वारे डेटाबेस स्कीमा मिळवा                                       |
| `notion_append_blocks`       | `write:notion` | पॅरेंट ब्लॉकमध्ये चाइल्ड ब्लॉक्स जोडा (प्रत्येक विनंतीसाठी कमाल 100) |

## एजंट कौशल्य कॅटलॉग साधने (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` मध्ये परिभाषित. `src/lib/agentSkills/catalog` द्वारे समर्थित. ही साधने MCP क्लायंट आणि बाह्य एजंटना 45-नोंदींचा एजंट कौशल्य दस्तऐवजीकरण कॅटलॉग उपलब्ध करून देतात. व्याप्ती: `read:catalog`.

| साधन                              | व्याप्ती       | वर्णन                                                                                                                                              |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | पर्यायी `category` (api\|cli) आणि `area` फिल्टरसह सर्व 45 एजंट कौशल्यांची सूची देते; मेटाडेटा + कव्हरेज परत करते                                   |
| `omniroute_agent_skills_get`      | `read:catalog` | प्रमाणित `id` द्वारे एका कौशल्यासाठी संपूर्ण मेटाडेटा + SKILL.md सामग्री मिळवते                                                                    |
| `omniroute_agent_skills_coverage` | `read:catalog` | कव्हरेज आकडेवारी: 23 API, 21 CLI आणि 1 config कौशल्यांपैकी किती कौशल्यांच्या फाइलसिस्टमवर SKILL.md फाइल्स आहेत याची कॅटलॉगच्या एकूण संख्येशी तुलना |

संपूर्ण कॅटलॉग आणि बाह्य एजंट तो कसा वापरतात यासाठी [AGENT-SKILLS.md](./AGENT-SKILLS.md) पहा.

## संबंधित फ्रेमवर्क्स (v3.8.0)

वरील MCP साधन सूची (110 अद्वितीय साधने, `countUniqueMcpTools()` द्वारे गणना केलेली) हेतुपुरस्सर
रनटाइम राउटिंग/कॅशे/कॉम्प्रेशन/मेमरी/कौशल्ये/प्रॉक्सी/कॉन्टेक्स्ट-स्रोत ऑपरेशन्सपुरती मर्यादित आहे. दोन संलग्न
फ्रेमवर्क्स v3.8.0 मध्ये MCP सर्व्हरसह वितरित केले जातात आणि त्यांचे दस्तऐवजीकरण स्वतंत्रपणे केले आहे:

### क्लाउड एजंट्स

क्लाउड एजंट्स हे प्रक्रियेबाहेर चालणारे AI कोडिंग एजंट्स (codex-cloud, cursor-cloud, devin, jules) आहेत, जे
LLM प्रदात्यांसाठी वापरल्या जाणाऱ्या त्याच कनेक्शन मॉडेलद्वारे OmniRoute शी जोडलेले आहेत. ते
त्यांच्या स्वतःच्या REST पृष्ठभागाद्वारे (`/api/v1/agents/*`) उपलब्ध केले जातात आणि MCP साधन कॅटलॉगचा भाग **नाहीत**
— क्लाउड एजंटला कॉल केल्याने MCP व्याप्ती वापरली जात नाही.

- अंमलबजावणी: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- जीवनचक्र: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- दस्तऐवजीकरण: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### गार्डरेल्स

गार्डरेल्स हे चॅट पाइपलाइनमध्ये लागू केले जाणारे अंमलबजावणीपूर्व/अंमलबजावणीनंतरचे फिल्टर्स (vision-bridge, pii-masker, prompt-injection)
आहेत. MCP साधन/रूट स्तरापर्यंत पोहोचण्यापूर्वी ते चालतात
आणि ऑडिट पाइपलाइनमध्ये संरचित उल्लंघने उत्सर्जित करतात; त्यांना MCP साधने म्हणून कॉल केले जात नाही.

- अंमलबजावणी: `src/lib/guardrails/`.
- दस्तऐवजीकरण: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

ब्लॉक झाल्यासारखा दिसणारा MCP कॉल डीबग करताना, MCP ऑडिट लॉग
(`scope_denied:*` नोंदी) आणि गार्डरेल्स ऑडिट ट्रेल हे दोन्ही तपासा — विनंती MCP व्याप्ती अंमलबजावणी स्तरापर्यंत पोहोचण्यापूर्वीच
गार्डरेलद्वारे नाकारली जाऊ शकते.

---

## REST API एंडपॉइंट्स

| एंडपॉइंट               | पद्धत                 | वर्णन                                                                                             | प्रमाणीकरण               |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------ | :----------------------- |
| `/api/mcp/status`      | `GET`                 | सर्व्हर स्थिती: हार्टबीट, HTTP ट्रान्सपोर्ट स्थिती, ऑडिट क्रियाकलाप सारांश                        | व्यवस्थापन (सेशन/अॅडमिन) |
| `/api/mcp/tools`       | `GET`                 | साधन कॅटलॉग (नाव, वर्णन, व्याप्ती, टप्पा, स्रोत एंडपॉइंट्स)                                       | व्यवस्थापन               |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ट्रान्सपोर्ट एंडपॉइंट (`mcpEnabled` + `mcpTransport === "sse"` द्वारे नियंत्रित)              | API की + व्याप्ती        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | स्ट्रीम करण्यायोग्य HTTP ट्रान्सपोर्ट (`mcp-session-id` हेडर वापरतो; `DELETE` सेशन समाप्त करते)   | API की + व्याप्ती        |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` मधील ऑडिट लॉग नोंदी (फिल्टर्स: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | व्यवस्थापन               |
| `/api/mcp/audit/stats` | `GET`                 | एकत्रित ऑडिट आकडेवारी (`totalCalls`, `successRate`, `avgDurationMs`, प्रमुख साधने)                | व्यवस्थापन               |

स्रोत फाइल्स: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

सेटिंग्जमध्ये MCP सर्व्हर सक्षम (`mcpEnabled`) होईपर्यंत आणि योग्य `mcpTransport` निवडला जाईपर्यंत SSE आणि स्ट्रीम करण्यायोग्य HTTP हे दोन्ही ट्रान्सपोर्ट ब्लॉक केलेले असतात. चुकीचा ट्रान्सपोर्ट कॉन्फिगर केलेला असल्यास, सेटिंग्ज बदलण्याच्या सूचनेसह रूट HTTP 400 परत करतो.

---

## प्रमाणीकरण आणि स्कोप

MCP साधन कॉलरकडून स्कोप स्ट्रिंग वाचते. ती तपासणी तीन स्वतंत्र नेमस्पेसपैकी एक आहे. एका तपासणीकर्त्याकडून पास होणे म्हणजे इतरांकडून पास होणे नव्हे. नियम [तीन स्कोप नेमस्पेस](#three-scope-namespaces) आहेत. साधनांची कॅटलॉग [MCP साधन स्कोप](#mcp-tool-scopes) आहे.

### तीन स्कोप नेमस्पेस

एका API की वर `manage`, MCP साधनावर `read:compression`, आणि `oma_live_…` ॲक्सेस टोकनवर `read` या तीन वेगवेगळ्या परवानग्या आहेत. जे कॉलर म्युटेटिंग मॅनेजमेंट रूटला `read` ॲक्सेस टोकन पाठवतात त्यांना HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` मिळतो. तो रँक `scopeSatisfies` आहे. तो MCP टेबलचा सल्ला घेत नाही, आणि MCP मॅचर त्याचा सल्ला घेत नाही.

| नेमस्पेस          | क्रेडेंशियल                                                 | तपासणीकर्ता      | पास झाल्यास याची परवानगी मिळते                                 |
| :---------------- | :---------------------------------------------------------- | :--------------- | :------------------------------------------------------------- |
| API-की व्यवस्थापन | `api_keys.scopes`                                           | `hasManageScope` | त्या बेअरर की साठी व्यवस्थापन REST                             |
| API-की ॲडिटिव्ह   | समान ॲरे, एक अचूक स्ट्रिंग                                  | खालील मदतनीस     | फक्त ती एक क्षमता                                              |
| MCP साधन स्कोप    | समान ॲरे, अन्यथा MCP `_meta`, अन्यथा `OMNIROUTE_MCP_SCOPES` | `scopeMatches`   | ते साधन, एकदा अंमलबजावणी चालू झाल्यावर                         |
| ॲक्सेस टोकन       | `oma_live_…`                                                | `scopeSatisfies` | ज्या व्यवस्थापन रूटला त्याची पद्धत आणि मार्ग तो रँक आवश्यक आहे |

प्रत्येक क्रेडेंशियल तयार करणे [व्यवस्थापन प्रमाणीकरण](../guides/MANAGEMENT-AUTH.md) मध्ये समाविष्ट आहे.

#### API-की स्कोप

एक `api_keys.scopes` ॲरे दोन कामांना फीड करतो. ते भिन्न फंक्शन्स वापरतात.

**व्यवस्थापन REST.** `manage` आणि `admin` हे `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) चे सदस्य आहेत. `hasManageScope` हे त्या की साठी व्यवस्थापन मार्गांना अधिकृत करते. `admin` त्या मार्गांवर व्यवस्थापन-सक्षम आहे. येथे `admin` हा शब्द ॲक्सेस-टोकन रँक नाही आणि तो MCP साधन स्कोपमध्ये विस्तारत नाही.

**ॲडिटिव्ह स्ट्रिंग.** प्रत्येक एक अचूक सदस्यत्व तपासणी आहे, आणि प्रत्येक `MANAGEMENT_API_KEY_SCOPES` च्या बाहेर राहते.

| स्कोप                          | पास झाल्यास याची परवानगी मिळते                                                                                                                                 |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | नॉन-लूपबॅक `/api/mcp/` LOCAL_ONLY कार्व-आउट फक्त (`hasMcpConnectOrManageScope`). `manage` किंवा `admin` असलेली की तरीही तो कार्व-आउट पास करते.                 |
| `self:usage`                   | या की साठी `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` तयार करताना हा स्कोप जोडतो (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | त्या स्थिती पेलोडमधील अपस्ट्रीम खाते कोटा (`src/lib/usage/apiKeySelfService.ts`). स्थिती मार्गाला अजूनही `self:usage` आवश्यक आहे.                              |
| `policy:bypass-provider-quota` | या की चे अनुमान कॉल प्रदाता-कोटा धोरण वगळतात (`src/sse/handlers/chat.ts` मध्ये `hasProviderQuotaBypassScope`).                                                 |

#### जुळणी

कॅटलॉग [MCP साधन स्कोप](#mcp-tool-scopes) अंतर्गत टेबल आहे. `src/shared/constants/mcpScopes.ts` मधील `MCP_SCOPE_LIST` ला तो कॅटलॉग मानू नका: तो मूळ टाइप केलेला उपसंच आहे. नंतरची साधने त्याच्या बाजूला आणखी स्कोप घोषित करतात (`read:notion`, `read:skills`, `read:local-corpus`, आणि बाकीचे टेबल).

`open-sse/mcp-server/scopeEnforcement.ts` मधील `evaluateToolScopes` कॉलला परवानगी देते जेव्हा प्रत्येक आवश्यक स्कोप काही मंजूर स्कोपशी जुळतो:

- `*` प्रत्येक आवश्यक स्कोपशी जुळतो.
- `*` मध्ये संपणारा मंजूर स्कोप, स्टारच्या आधीच्या उपसर्गने सुरू होणाऱ्या आवश्यक स्कोपशी जुळतो. `read:*` `read:compression` शी जुळतो.
- इतर प्रत्येक मंजूर स्कोप फक्त समान आवश्यक स्ट्रिंगशी जुळतो.

ज्या की चे स्कोप `["manage"]` आहेत ती `read:compression` साठी `scopeMatches` मध्ये अयशस्वी होते. जेव्हा `admin`, `mcp:connect`, `read`, आणि `write` हे एकमेव मंजूर स्ट्रिंग असतात तेव्हा तोच कॉल अयशस्वी होतो. ट्रेलिंग `*` च्या पलीकडे MCP साधन स्कोपमध्ये कोणतीही पदानुक्रम नाही.

अंमलबजावणी बंद आहे जोपर्यंत `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (डीफॉल्ट `false`). जेव्हा ती बंद असते, तेव्हा `evaluateToolScopes` कॉलला परवानगी देते आणि कॅटलॉग वगळते. जेव्हा ती चालू असते, तेव्हा HTTP बेअरर की चे `api_keys.scopes` `authInfo` म्हणून वापरते (पहा [प्रति-की HTTP स्कोप बंधन](#per-key-http-scope-binding-7895)). जेव्हा कोणतीही की स्कोप निराकरण होत नाही, तेव्हा मंजूर संच MCP `_meta` मध्ये, नंतर `OMNIROUTE_MCP_SCOPES` मध्ये जातो.

#### ॲक्सेस-टोकन स्कोप

`oma_live_…` टोकन (`src/lib/accessTokens/scopes.ts`) `read`, `write`, किंवा `admin` घेऊन जातात. `scopeSatisfies` हा एक रँक आहे: `admin` मध्ये `write` आणि `read` समाविष्ट आहे, आणि `write` मध्ये `read` समाविष्ट आहे. अज्ञात स्कोप काहीही समाविष्ट करत नाहीत.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) तो रँक `inferRequiredScope` (`src/server/authz/accessScopes.ts`) शी तुलना करतो:

- `GET`, `HEAD`, आणि `OPTIONS` साठी `read` आवश्यक आहे.
- इतर प्रत्येक पद्धतीसाठी `write` आवश्यक आहे.
- `ADMIN_SCOPE_PREFIXES` मधील मार्गांसाठी प्रत्येक पद्धतीसाठी `admin` आवश्यक आहे. `/api/mcp` त्या यादीत आहे, त्यामुळे `write` ॲक्सेस टोकन अजूनही MCP HTTP पृष्ठभागाला कॉल करू शकत नाही.
- `ADMIN_MUTATION_PREFIXES` मधील मार्गांसाठी फक्त म्युटेशनसाठी `admin` आवश्यक आहे.

`PATCH /api/keys/{id}` ही एक बदल करणारी क्रिया आहे आणि ती त्या ॲडमिन सूचीमध्ये नाही, त्यामुळे 'read' टोकनला 403 मिळते
`Access token scope 'read' is insufficient; 'write' required.`
'write' किंवा 'admin' ॲक्सेस टोकन त्या राउटसाठी पुरेसे आहे. डॅशबोर्ड JWT, लूपबॅक CLI मशीन-आयडी टोकन, आणि 'manage' किंवा 'admin' असलेले API की इतर मार्गांनी जातात आणि या रँकने मर्यादित नाहीत.

'/api/mcp' साठी 'scopeSatisfies' उत्तीर्ण करणाऱ्या ॲक्सेस टोकनने केवळ व्यवस्थापन गेट पार केले आहे. टूल कॉल्स अजूनही API-की स्कोप्स विरुद्ध 'scopeMatches' चालवतात. ॲक्सेस-टोकन रँक 'scopeMatches' साठी इनपुट नाही.

### MCP टूल स्कोप्स

स्कोप अंमलबजावणी `open-sse/mcp-server/scopeEnforcement.ts` मध्ये केंद्रीकृत आहे. प्रत्येक टूलला विशिष्ट स्कोप्सची आवश्यकता असते:

| कार्यक्षेत्र          | साधने                                                                                                                                                                        |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                            |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                    |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                       |
| `read:quota`          | `check_quota`                                                                                                                                                                |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                       |
| `read:models`         | `list_models_catalog`                                                                                                                                                        |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                        |
| `write:budget`        | `set_budget_guard`                                                                                                                                                           |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                  |
| `pricing:write`       | `sync_pricing`                                                                                                                                                               |
| `read:cache`          | `cache_stats`                                                                                                                                                                |
| `write:cache`         | `cache_flush`                                                                                                                                                                |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                   |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                            |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                        |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                             |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                       |
| `read:memory`         | `memory_search`                                                                                                                                                              |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                 |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                           |
| `write:skills`        | `skills_enable`                                                                                                                                                              |
| `execute:skills`      | `skills_execute`                                                                                                                                                             |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                             |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                      |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                    |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                             |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                               |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                           |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                              |
| `read:obsidian`       | 13 read tools — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 write tools — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                            |

वाइल्डकार्ड स्कोप्स समर्थित आहेत: `read:*` सर्व रीड-स्कोप्स मंजूर करते, `*` पूर्ण प्रवेश मंजूर करते.

### `mcp:connect` — अरुंद मार्ग क्षमता (#7895)

नॉन-लूपबॅकवरून HTTP/SSE MCP ट्रान्सपोर्ट (`/api/mcp/*`) पर्यंत पोहोचण्यासाठी `/api/mcp/` LOCAL_ONLY कार्व्ह-आउट आवश्यक आहे (पहा `docs/security/ROUTE_GUARD_TIERS.md`). ऐतिहासिकदृष्ट्या, तो कार्व्ह-आउट फक्त पूर्ण `manage`/`admin`-स्कोप API की स्वीकारत असे — MCP शी बोलण्याची गरज असलेल्या कॉलरसाठी खूप विस्तृत. `src/shared/constants/managementScopes.ts` आता `MCP_CONNECT_SCOPE = "mcp:connect"` निर्यात करते: एक अतिरिक्त, अरुंद स्कोप (`SELF_USAGE_SCOPE` सारखाच पूर्ववर्ती) जो `src/server/authz/policies/management.ts` मधील `/api/mcp/` बायपासलाच अधिकृत करतो — तो इतर कोणत्याही व्यवस्थापन-मार्ग प्रवेशास परवानगी देत नाही आणि तो हेतुपुरस्सर `MANAGEMENT_API_KEY_SCOPES` मधून बाहेर ठेवला आहे. `manage`/`admin` असलेली की अजूनही कार्व्ह-आउटमध्ये बदल न करता पास होते; `mcp:connect` हे रिमोट MCP-फक्त कॉलरसाठी कमी-विशेषाधिकार असलेला पर्याय आहे, जो `hasMcpConnectOrManageScope()` द्वारे तपासला जातो.

### प्रति-की HTTP स्कोप बाइंडिंग (#7895)

HTTP/SSE वर, `open-sse/mcp-server/httpTransport.ts` आता कॉलरचे वास्तविक `api_keys.scopes` `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) द्वारे सोडवते आणि ते MCP SDK च्या `transport.handleRequest(req, { authInfo })` ला पास करते, जेणेकरून प्रत्येक टूल कॉलपर्यंत पोहोचणारे `extra.authInfo.scopes` बेअरर कीच्या स्वतःच्या स्कोप्सना प्रतिबिंबित करते. `scopeEnforcement.ts` चे `resolveCallerScopeContext()` आधीच `_meta` आणि `OMNIROUTE_MCP_SCOPES` env फॉलबॅकवर `authInfo` ला प्राधान्य देत होते — हे फक्त ते पहिले, सर्वोच्च-प्राधान्य स्त्रोत भरते, जे पूर्वी HTTP वर अनफेड होते. जेव्हा कोणतीही API की सोडवली जात नाही (हेडर नाही, अवैध की), तेव्हा `authInfo` `undefined` राहते आणि रिझोल्यूशन विद्यमान `meta`/env साखळीवर बदल न करता खाली येते. हे `OMNIROUTE_MCP_ENFORCE_SCOPES` चे डीफॉल्ट बदलत नाही — अंमलबजावणी अजूनही स्पष्टपणे सक्षम करावी लागते; हा बदल फक्त एकदा सक्षम झाल्यावर प्रति-की मार्ग प्राधान्य घेतो. stdio मध्ये प्रति-कॉलर ओळख नाही (पहा `mcpCallerIdentity.ts`) आणि ते अप्रभावित आहे — ते `_meta`/env फॉलबॅक साखळीवर राहते.

---

## पर्यावरणीय चल

| चल                                      | डीफॉल्ट                               | उद्देश                                                                                                                                  |
| :-------------------------------------- | :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`              | अंतर्गत OmniRoute API ना कॉल करताना MCP सर्व्हर वापरत असलेली बेस URL                                                                    |
| `OMNIROUTE_API_KEY`                     | (रिक्त)                               | अंतर्गत API कॉलसाठी `Authorization: Bearer` म्हणून अग्रेषित केली जाणारी API की                                                          |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (केवळ `"true"` ते सक्षम करते) | सक्षम केले असता, अनुपलब्ध स्कोप्समुळे टूल कॉल नाकारले जातात आणि ऑडिट लॉगमध्ये `scope_denied:<reason>` नोंदवले जाते                      |
| `OMNIROUTE_MCP_SCOPES`                  | (रिक्त)                               | डीफॉल्टनुसार "उपलब्ध" मानल्या जाणाऱ्या स्कोप्सची स्वल्पविरामाने विभक्त केलेली अनुमतीसूची (कॉलरने स्वतःचे स्कोप्स न दिल्यास वापरली जाते) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (सेट नसल्यास = सुरू)                  | `0/false/off/no` वर सेट केल्यास, नोंदणीच्या वेळी MCP वर्णन संक्षेपण अक्षम करते                                                          |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (सेट नसल्यास = सुरू)                  | वरील टॉगलसाठी पर्यायी उपनाम                                                                                                             |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                               | अंतर्गत व्यवस्थापन वाचनांसाठी रद्दीकरण कालमर्यादा (आरोग्य, लवचिकता, संयोजने, कोटा, वापर)                                                |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                               | प्रदात्याची प्रतीक्षा करणाऱ्या टप्प्यांसाठी रद्दीकरण कालमर्यादा (`route_request`, `web_search`, `web_fetch`)                            |
| `MCP_TOOL_DENY`                         | (सेट नसल्यास = फिल्टर नाही)           | `tools/list` मधून वगळण्यासाठी स्वल्पविरामाने विभक्त केलेली टूल नावे (टूल-कार्डिनॅलिटी कमी करणे — खाली पाहा)                             |
| `MCP_TOOL_ALLOW`                        | (सेट नसल्यास = फिल्टर नाही)           | केवळ ठेवण्यासाठी स्वल्पविरामाने विभक्त केलेली टूल नावे (अनुमतीसूची मोड — खाली पाहा)                                                     |
| `DATA_DIR`                              | `~/.omniroute`                        | हार्टबीट फाइल `${DATA_DIR}/runtime/mcp-heartbeat.json` येथे लिहिली जाते                                                                 |

---

## वर्णन संक्षेपण

क्लायंटसमोर उघड होणारा मेटाडेटाचा आकार (आणि त्यामुळे प्रॉम्प्ट संदर्भाचा खर्च) कमी करण्यासाठी MCP टूल, प्रॉम्प्ट आणि रिसोर्स रजिस्ट्री नोंदणी/सूचीकरणाच्या वेळी वर्णने संक्षिप्त करू शकतात. अंमलबजावणी `open-sse/mcp-server/descriptionCompressor.ts` मध्ये आहे आणि `createMcpServer()` मधील `compressMcpRegistryMetadata` द्वारे MCP सर्व्हरशी जोडली आहे.

- संरचनात्मक मजकूर बदलला जाणार नाही यासाठी जतन केलेल्या ब्लॉकचे निष्कर्षण (कोड स्पॅन्स, फेन्स्ड ब्लॉक्स इत्यादी) वापरून, Caveman नियमसंचाद्वारे (`getRulesForContext("all", "full")`) वर्णन मजकुरावर संक्षेपण चालते.
- `key_value` सेटिंग्ज टेबलमधील `compression.mcpDescriptionCompressionEnabled` मूल्याद्वारे प्रत्येक डिप्लॉयमेंटनुसार टॉगल करा (डीफॉल्ट: सक्षम) — UI मध्ये **विश्लेषण → MCP वर्णन संक्षेपण** म्हणून उपलब्ध.
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` किंवा `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` यांपैकी कोणत्याही एकाद्वारे संपूर्ण प्रक्रियेसाठी टॉगल करा.
- रिअलटाइम आकडेवारी `omniroute_compression_status` द्वारे `analytics.mcpDescriptionCompression` अंतर्गत दर्शवली जाते आणि वास्तविक प्रदाता वापर पावत्यांपासून वेगळे ओळखण्यासाठी तिला `source: "mcp_metadata_estimate"` टॅग लावला जातो.

---

## टूल कार्डिनॅलिटी कपात (F4.3)

वर्णन संक्षेपणामुळे प्रत्येक टूलचा मेटाडेटा कमी होतो; **टूल-कार्डिनॅलिटी कपात** यापुढे एक पाऊल टाकून एकूण _किती_ टूल्स जाहीर केली जातात हे कमी करते. `tools/list` मॅनिफेस्टमध्ये कमी टूल्स प्रदर्शित केल्यामुळे टूल कॅटलॉगसाठी क्लायंटच्या मॉडेलला मोजावी लागणारी प्रति-विनंती टोकन किंमत कमी होते ("layer 5" संक्षेपण). अंमलबजावणी ही `open-sse/mcp-server/toolCardinality.ts` मधील (`reduceToolManifest`) पूर्णपणे स्टेटलेस फिल्टर आहे, जी `createMcpServer()` (`open-sse/mcp-server/server.ts`) मधील नोंदणी लूपशी जोडलेली आहे.

**निवड केल्यावरच सक्रिय, डीफॉल्टनुसार बंद.** दोन पर्यावरण चलांपैकी किमान एक सेट केलेला असेल तेव्हाच फिल्टर चालतो; दोन्हीपैकी एकही सेट नसल्यास सर्व 110 टूल्स कोणताही बदल न करता जाहीर केली जातात.

| चल               | मोड                                                                                                  |
| :--------------- | :--------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | ब्लॅकलिस्ट — `tools/list` मधून नेहमी वगळल्या जाणाऱ्या टूल्सची स्वल्पविरामाने विभक्त केलेली नावे      |
| `MCP_TOOL_ALLOW` | अनुमती-सूची — टूल्सची स्वल्पविरामाने विभक्त केलेली नावे; केवळ हीच कायम राहतात, बाकी सर्व वगळली जातात |

`deny` ला `allow` पेक्षा प्राधान्य आहे. नावे स्वल्पविरामाने विभक्त केली जातात, त्यांच्या सुरुवातीची व शेवटची रिकामी जागा काढली जाते आणि रिकाम्या नोंदी दुर्लक्षित केल्या जातात. उदाहरणे:

```bash
# कॅटलॉगमधून दोन टूल्स वगळा
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# केवळ राउटिंग + कोटा टूल्स जाहीर करा (अनुमती-सूची मोड)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**फिल्टर केलेली टूल्स कशी काढली जातात:** नोंदणी नेहमी यशस्वी होते; प्रोफाइलने नाकारलेल्या टूलवर नंतर MCP SDK हँडलद्वारे `.disable()` लागू केले जाते, त्यामुळे ते `tools/list` मध्ये कधीही दिसत नाही, पण जोडणी अबाधित राहते (सुलभ सक्रियीकरण/निष्क्रियीकरण, पुनर्नोंदणी नाही). प्रोफाइल पार्सर `readMcpToolProfileFromEnv(process.env)` आहे, जो दोन्ही चल रिकामे असताना `null` (फिल्टरिंग नाही) परत करतो.

`reduceToolManifest` मागील अधिक समृद्ध `ToolProfile` रचना स्कोप-इंटरसेक्शन फिल्टरिंग (`allowScopes`, `read:*`-शैलीतील वाइल्डकार्ड जुळणीसह) आणि निर्धारक `maxTools` मर्यादेलाही समर्थन देते; मात्र या दोन्ही पर्यायांना नोंदणीच्या वेळी संपूर्ण मॅनिफेस्टची आवश्यकता असते आणि ते सध्या पर्यावरण चलांद्वारे उपलब्ध केलेले **नाहीत** (`tools/list`-पातळीवरील हुक हा नोंदवलेला पुढील टप्पा आहे). कपात करण्यापूर्वी आणि केल्यानंतरच्या मॅनिफेस्ट टोकन खर्चाची तुलना करण्यासाठी `estimateManifestTokens()` उपलब्ध आहे.

---

## रनटाइम हार्टबीट

stdio ट्रान्सपोर्ट दर 5 सेकंदांनी `${DATA_DIR}/runtime/mcp-heartbeat.json` मध्ये सक्रियतेची स्थिती कायमस्वरूपी नोंदवतो. डॅशबोर्ड (`/api/mcp/status`) `online` स्थिती निर्धारित करण्यासाठी ही फाइल आणि PID सक्रियता वाचतो. त्याऐवजी HTTP ट्रान्सपोर्ट्स प्रक्रियेअंतर्गत `getMcpHttpStatus()` मधून स्थिती कळवतात (फाइलमध्ये लेखन केले जात नाही).

हार्टबीट स्नॅपशॉटमध्ये पुढील माहिती असते:

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

प्रत्येक टूल कॉलची नोंद `open-sse/mcp-server/audit.ts` द्वारे SQLite मधील `mcp_tool_audit` टेबलमध्ये केली जाते:

- टूलचे नाव, आर्ग्युमेंट्स (प्रत्येक टूलच्या `auditLevel` नुसार हॅश केलेले/लहान केलेले), परिणाम
- ms मधील कालावधी, यश/अपयश फ्लॅग, त्रुटी संदेश (लागू असल्यास)
- API की हॅश, टाइमस्टॅम्प
- स्कोप नकारांची नोंद गहाळ स्कोप सूचीसह `scope_denied:<reason>` म्हणून केली जाते

अलीकडील कॉल्स तपासण्यासाठी डॅशबोर्ड किंवा `/api/mcp/audit` आणि `/api/mcp/audit/stats` REST एंडपॉइंट्स वापरा.

---

## फाइल्स

| फाइल                                                                     | उद्देश                                                          |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP सर्व्हर फॅक्टरी, stdio एंट्री पॉइंट, स्कोपनुसार टूल नोंदणी  |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ट्रान्सपोर्ट (सत्र व्यवस्थापन)            |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | टूल स्कोप मूल्यमापन आणि कॉलर निर्धारण                           |
| `open-sse/mcp-server/audit.ts`                                           | टूल कॉल ऑडिट लॉगिंग (`mcp_tool_audit`)                          |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio हार्टबीट रायटर (`mcp-heartbeat.json`)                     |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | टूल / प्रॉम्प्ट / रिसोर्स रजिस्ट्रींसाठी वर्णन संक्षेपण         |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod स्कीमा + टूल रजिस्ट्री (`MCP_TOOLS`, 45 नोंदी)              |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | टप्पा 2 + कॅशे + 1proxy टूल हँडलर्स                             |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | संक्षेपण टूल हँडलर्स                                            |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | मेमरी टूल व्याख्या (3 टूल्स)                                    |
| `open-sse/mcp-server/tools/skillTools.ts`                                | कौशल्य टूल व्याख्या (4 टूल्स)                                   |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion संदर्भ-स्रोत टूल व्याख्या (6 टूल्स)                      |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | गेमिफिकेशन टूल व्याख्या (8 टूल्स)                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | प्लगइन नोंदणी आणि व्यवस्थापन टूल्स (8 टूल्स)                    |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` एंडपॉइंट                                      |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` एंडपॉइंट                                       |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE ट्रान्सपोर्ट रूट                             |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP ट्रान्सपोर्ट रूट              |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` ऑडिट लॉग क्वेरी                                |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` एकत्रित ऑडिट मेट्रिक्स                   |
| `src/lib/notion/api.ts`                                                  | Notion REST API क्लायंट (पुनःप्रयत्न, टाइमआउट, त्रुटी वर्गीकरण) |
| `src/lib/db/notion.ts`                                                   | Notion टोकन सातत्यपूर्ण संचयन (`key_value` टेबल)                |
| `src/app/api/settings/notion/route.ts`                                   | Notion सेटिंग्ज API (GET/POST/DELETE)                           |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion टोकन व्यवस्थापन UI                                       |
| `tests/unit/notion-api.test.ts`                                          | Notion API क्लायंट चाचण्या (7)                                  |
| `tests/unit/notion-tools.test.ts`                                        | Notion टूल्स स्कोप अंमलबजावणी चाचण्या (10)                      |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB मॉड्यूल चाचण्या (3)                                   |
