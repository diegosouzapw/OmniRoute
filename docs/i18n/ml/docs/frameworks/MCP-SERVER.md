# OmniRoute MCP Server Documentation (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> റൂട്ടിംഗ്, കാഷ്, കംപ്രഷൻ, മെമ്മറി, സ്കിൽസ്, പ്രോക്സി, പൂൾ, Radar, കോൺടെക്സ്റ്റ് സോഴ്സ് പ്രവർത്തനങ്ങളിലായി 110 ടൂളുകളുള്ള Model Context Protocol സെർവർ.
>
> ആധികാരിക ഉറവിടം: `open-sse/mcp-server/server.ts` എന്നതിലെ `countUniqueMcpTools()` **110 അതുല്യ ടൂളുകൾ** കണക്കാക്കുന്നു: ആറ് CCR ലൈഫ്സൈക്കിൾ ടൂളുകൾ, ഏജന്റ്-സ്കിൽസ് ട്രിയോ, `omniroute_radar_catalog`, `omniroute_x_search` എന്നിവ ഉൾപ്പെടുന്ന 45 കാനോനിക്കൽ നിർവചനങ്ങൾ, കൂടാതെ മെമ്മറി (3), സ്കിൽസ് (4), GitHub സ്കിൽസ് (3), പൂൾ (6), ഗെയിമിഫിക്കേഷൻ (8), പ്ലഗിനുകൾ (8), Notion (6), Obsidian (22), ലോക്കൽ കോർപ്പസ് (3), രണ്ട് RTK-മാത്രം കംപ്രഷൻ ടൂളുകൾ എന്നിവയും.

## ഇൻസ്റ്റാളേഷൻ

OmniRoute MCP അന്തർനിർമ്മിതമാണ്. ഇങ്ങനെ ആരംഭിക്കുക:

```bash
omniroute --mcp
```

അല്ലെങ്കിൽ open-sse ട്രാൻസ്പോർട്ട് വഴി:

```bash
# HTTP സ്ട്രീം ചെയ്യാവുന്ന ട്രാൻസ്പോർട്ട് (പോർട്ട് 20130)
omniroute --dev  # /mcp എൻഡ്പോയിന്റിൽ MCP സ്വയമേവ ആരംഭിക്കുന്നു
```

ഡാഷ്ബോർഡ് സെർവർ അതേ പ്രോസസ്സിൽ നൽകുന്ന HTTP ട്രാൻസ്പോർട്ടുകൾ (`sse` / `streamable-http`) ഡിഫോൾട്ടായി
ഓഫാണ്; മുമ്പ് അവ `/dashboard/mcp` പേജിൽ നിന്ന് മാത്രമേ ടോഗിൾ ചെയ്യാനാകുമായിരുന്നുള്ളൂ. v3.8.51 മുതൽ
CLI-യിലും സമാനമായ സൗകര്യമുണ്ട്:

```bash
omniroute mcp status                                  # പ്രവർത്തനക്ഷമമാണോ/ഓൺലൈനാണോ, ട്രാൻസ്പോർട്ട്, ടൂളുകളുടെ എണ്ണം
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # സജീവമായ sse/streamable-http സെഷനുകൾ പുനഃസജ്ജമാക്കുന്നു
```

`mcp enable`/`mcp disable`, ഡാഷ്ബോർഡ് `/api/settings` വഴി ടോഗിൾ ചെയ്യുന്ന അതേ `mcpEnabled`
ക്രമീകരണത്തെയാണ് (ഐച്ഛികമായി `mcpTransport`-നെയും) PATCH ചെയ്യുന്നത്. `mcp restart`, `POST /api/mcp/restart`
വിളിക്കുന്നു: അത് സജീവമായ `sse`/`streamable-http` സെഷനുകൾ അവസാനിപ്പിക്കുന്നതിനാൽ അടുത്ത അഭ്യർത്ഥന
വൃത്തിയായി വീണ്ടും ഇനിഷ്യലൈസ് ചെയ്യപ്പെടും; MCP പ്രവർത്തനരഹിതമാണെങ്കിൽ `409`-ഉം `stdio` ട്രാൻസ്പോർട്ടിന്
`501`-ഉം നൽകും (stdio ക്ലയന്റുകൾ അവരുടെ സ്വന്തം സബ്പ്രോസസ്സ് നിയന്ത്രിക്കുന്നു — പുനരാരംഭിക്കാൻ
അതേ പ്രോസസ്സിനുള്ളിൽ ഹാൻഡിൽ ഒന്നുമില്ല).

## ട്രാൻസ്പോർട്ടുകൾ

MCP സെർവർ മൂന്ന് ട്രാൻസ്പോർട്ടുകൾ ലഭ്യമാക്കുന്നു; അവയെല്ലാം ഒരേ `createMcpServer()` ഫാക്ടറിയാണ് ഉപയോഗിക്കുന്നത്:

| ട്രാൻസ്പോർട്ട്    | എവിടെ                                       | എപ്പോൾ ഉപയോഗിക്കണം                                        |
| :---------------- | :------------------------------------------ | :-------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE സംയോജനങ്ങൾക്കായി (Claude Desktop, Cursor മുതലായവ)     |
| `sse`             | `httpTransport` വഴി `POST/GET /api/mcp/sse` | ഇവന്റ് സ്ട്രീം ആവശ്യമുള്ള ബ്രൗസർ/ഏജന്റ് ക്ലയന്റുകൾക്കായി  |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | മൾട്ടി-സെഷൻ HTTP ക്ലയന്റുകൾക്കായി (`mcp-session-id` ഹെഡർ) |

സജീവമായ HTTP ട്രാൻസ്പോർട്ട് (`sse` അല്ലെങ്കിൽ `streamable-http`) `mcpTransport` ക്രമീകരണം ഉപയോഗിച്ചാണ് തിരഞ്ഞെടുക്കുന്നത്. ട്രാൻസ്പോർട്ടുകൾ മാറ്റുമ്പോൾ മറ്റേ ട്രാൻസ്പോർട്ടിലുള്ള നിലവിലുള്ള സെഷനുകൾ അടയ്ക്കപ്പെടും.

### റിമോട്ട് ആക്സസ് (`manage` സ്കോപ്പ് ബൈപാസ്)

`/api/mcp/*` LOCAL_ONLY ടയറിലാണ് (`src/server/authz/routeGuard.ts`) — ഡിഫോൾട്ടായി ലൂപ്പ്ബാക്ക് ഹോസ്റ്റുകൾക്ക് (`localhost`, `127.0.0.1`, `::1`) മാത്രമേ ഇത് ആക്സസ് ചെയ്യാനാകൂ. v3.8.2 മുതൽ, `manage` സ്കോപ്പുള്ള കീ ഉപയോഗിച്ച് `Authorization: Bearer <api-key>` സമർപ്പിച്ചാൽ നോൺ-ലൂപ്പ്ബാക്ക് ക്ലയന്റുകൾക്ക് കണക്റ്റ് ചെയ്യാം. ഒരു ടണൽ, റിവേഴ്സ് പ്രോക്സി, അല്ലെങ്കിൽ പബ്ലിക് ഹോസ്റ്റ്നെയിം വഴി റിമോട്ട് MCP സെർവർ ആക്സസ് ചെയ്യാനുള്ള ഏക മാർഗം ഇതാണ്.

```bash
# manage സ്കോപ്പ് അനുവദിക്കുക: ഡാഷ്ബോർഡിലെ API Keys പേജ് തുറന്ന് കീയിലെ
# "Management Access" ടോഗിൾ ചെയ്യുക, അല്ലെങ്കിൽ സൃഷ്ടിക്കുമ്പോൾ POST scopes:["manage"] ഉപയോഗിക്കുക.

# തുടർന്ന് ഒരു റിമോട്ട് MCP ക്ലയന്റിൽ നിന്ന് കണക്റ്റ് ചെയ്യുക:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` ഇല്ലാത്ത ഒരു കീ (അല്ലെങ്കിൽ Bearer ഇല്ലെങ്കിൽ) `403 LOCAL_ONLY` തിരികെ നൽകും. അനുബന്ധ പ്രിഫിക്സായ `/api/cli-tools/runtime/*` മനഃപൂർവം ബൈപാസ് ചെയ്യാനാകാത്തതാണ് — [റൂട്ട് ഗാർഡ് ടയറുകൾ — `manage` സ്കോപ്പ് ഒഴിവാക്കൽ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) കാണുക.

## IDE കോൺഫിഗറേഷൻ

Claude Desktop, Cursor, Cline, അനുയോജ്യമായ MCP ക്ലയന്റുകൾ എന്നിവയുടെ സജ്ജീകരണത്തിനായി [MCP ക്ലയന്റ് കോൺഫിഗറേഷൻ](../guides/SETUP_GUIDE.md#mcp-client-configuration) കാണുക.

---

## അത്യാവശ്യ ടൂളുകൾ (14) — ഘട്ടം 1

| ടൂൾ                             | സ്കോപ്പുകൾ            | വിവരണം                                                                                                                                              |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | പ്രവർത്തനസമയം, മെമ്മറി, സർക്യൂട്ട് ബ്രേക്കറുകൾ, നിരക്ക് പരിധികൾ, കാഷെ സ്ഥിതിവിവരക്കണക്കുകൾ                                                          |
| `omniroute_list_combos`         | `read:combos`         | സ്ട്രാറ്റജികൾ സഹിതമുള്ള കോൺഫിഗർ ചെയ്ത എല്ലാ കോംബോകളും (മെട്രിക്കുകൾ ഓപ്ഷണൽ)                                                                         |
| `omniroute_get_combo_metrics`   | `read:combos`         | ഒരു നിർദ്ദിഷ്ട കോംബോയുടെ പ്രകടന മെട്രിക്കുകൾ                                                                                                        |
| `omniroute_switch_combo`        | `write:combos`        | ഒരു കോംബോ സജീവമാക്കുക അല്ലെങ്കിൽ നിർജ്ജീവമാക്കുക                                                                                                    |
| `omniroute_create_combo`        | `write:combos`        | നിലവിലുള്ള കോംബോ API വഴി സാധൂകരിച്ച ഒരു കോംബോ സൃഷ്ടിക്കുക                                                                                           |
| `omniroute_check_quota`         | `read:quota`          | ഉപയോഗിച്ച/ആകെ ക്വാട്ട, ശേഷിക്കുന്ന ശതമാനം, റീസെറ്റ് സമയം, ടോക്കൺ നില                                                                                |
| `omniroute_route_request`       | `execute:completions` | OmniRoute റൂട്ടിങ്ങിലൂടെ ഒരു ചാറ്റ് കംപ്ലീഷൻ അയയ്ക്കുക                                                                                              |
| `omniroute_cost_report`         | `read:usage`          | കാലയളവ് അനുസരിച്ചുള്ള ചെലവ് റിപ്പോർട്ട് (സെഷൻ/ദിവസം/ആഴ്ച/മാസം)                                                                                      |
| `omniroute_list_models_catalog` | `read:models`         | ശേഷികൾ, നില, വിലനിർണ്ണയം എന്നിവ സഹിതമുള്ള സമ്പൂർണ്ണ മോഡൽ കാറ്റലോഗ്                                                                                  |
| `omniroute_radar_catalog`       | `read:radar`          | ലോക്കലായി സൈൻ ചെയ്ത Radar കാറ്റലോഗ്; ഓപ്ഷണൽ പ്രൊവൈഡർ/ഫാമിലി ഫിൽട്ടറുകൾ                                                                              |
| `omniroute_tool_search`         | `read:tools`          | രജിസ്റ്റർ ചെയ്ത MCP കാറ്റലോഗിൽ നിന്ന് ടൂളുകൾ കണ്ടെത്തുക                                                                                             |
| `omniroute_web_search`          | `execute:search`      | കോൺഫിഗർ ചെയ്ത സെർച്ച് പ്രൊവൈഡറുകളിലൂടെ വെബ് തിരയുക. X/Twitter അല്ല.                                                                                 |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok വഴി X-ൽ തിരയുക, അല്ലെങ്കിൽ Xquik API ഫലങ്ങൾക്കായി `xquik-search` തിരഞ്ഞെടുക്കുക. തിരഞ്ഞെടുത്ത ബാക്കെൻഡിനുള്ള ക്രെഡൻഷ്യലുകൾ ആവശ്യമാണ്. |
| `omniroute_web_fetch`           | `execute:search`      | കോൺഫിഗർ ചെയ്ത ഫെച്ച് പ്രൊവൈഡറുകളിലൂടെ വെബ് ഉള്ളടക്കം ലഭ്യമാക്കുക                                                                                    |

## വിപുലമായ ടൂളുകൾ (11) — ഘട്ടം 2

| ടൂൾ                                | സ്കോപ്പുകൾ                           | വിവരണം                                                                                                                           |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | ഫാൾബാക്ക് ട്രീ സഹിതമുള്ള ഡ്രൈ-റൺ റൂട്ടിങ് സിമുലേഷൻ                                                                               |
| `omniroute_set_budget_guard`       | `write:budget`                       | നിലവാരം കുറയ്ക്കൽ/തടയൽ/അലേർട്ട് നടപടി സഹിതമുള്ള സെഷൻ ബജറ്റ്                                                                      |
| `omniroute_set_routing_strategy`   | `write:combos`                       | റൺടൈമിൽ കോംബോ സ്ട്രാറ്റജി അപ്ഡേറ്റ് ചെയ്യുക (priority/weighted/auto/തുടങ്ങിയവ)                                                   |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` റെസിലിയൻസ് പ്രീസെറ്റ് പ്രയോഗിക്കുക                                                    |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | യഥാർഥ അപ്സ്ട്രീം കോൾ ഉപയോഗിച്ച് ഒരു കോംബോയിലെ ഓരോ പ്രൊവൈഡറെയും തത്സമയം പരിശോധിക്കുക                                              |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 ലേറ്റൻസിയും സർക്യൂട്ട് ബ്രേക്കർ നിലയും ഉൾപ്പെടെയുള്ള ഓരോ പ്രൊവൈഡറിന്റെയും മെട്രിക്കുകൾ                               |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | ബജറ്റ്/ലേറ്റൻസി നിയന്ത്രണങ്ങൾ പരിഗണിച്ച് ടാസ്ക് തരം അനുസരിച്ച് കോംബോ ശുപാർശ ചെയ്യുക                                              |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | ഒരു അഭ്യർത്ഥന എന്തുകൊണ്ട് ഒരു പ്രൊവൈഡറിലേക്ക് റൂട്ട് ചെയ്തുവെന്ന് വിശദീകരിക്കുക (സ്കോറിങ് ഘടകങ്ങൾ + ഫാൾബാക്കുകൾ)                 |
| `omniroute_get_session_snapshot`   | `read:usage`                         | പൂർണ്ണ സെഷൻ സ്നാപ്പ്ഷോട്ട്: ചെലവ്, ടോക്കണുകൾ, മുൻനിര മോഡലുകൾ/പ്രൊവൈഡർമാർ, പിശകുകൾ, ബജറ്റ് ഗാർഡ്                                  |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | തകരാറിലായ കോംബോ റെഫറൻസുകൾ / അനാഥ റോകൾ പോലുള്ള ഡാറ്റാബേസ് ഡ്രിഫ്റ്റ് നിർണ്ണയിക്കുകയും (ആവശ്യമെങ്കിൽ സ്വയം പരിഹരിക്കുകയും) ചെയ്യുക |
| `omniroute_sync_pricing`           | `pricing:write`                      | ബാഹ്യ സ്രോതസ്സുകളിൽനിന്ന് (LiteLLM) വിലനിർണ്ണയ ഡാറ്റ സമന്വയിപ്പിക്കുക; `dryRun` പിന്തുണയ്ക്കുന്നു                                |

## കാഷ് ടൂളുകൾ (2)

| ടൂൾ                     | സ്കോപ്പുകൾ    | വിവരണം                                                              |
| :---------------------- | :------------ | :------------------------------------------------------------------ |
| `omniroute_cache_stats` | `read:cache`  | സെമാന്റിക് കാഷ്, പ്രോംപ്റ്റ് കാഷ്, ഐഡംപൊട്ടൻസി സ്ഥിതിവിവരക്കണക്കുകൾ |
| `omniroute_cache_flush` | `write:cache` | ആഗോളമായോ സിഗ്നേച്ചർ/മോഡൽ അടിസ്ഥാനത്തിലോ കാഷ് ഫ്ലഷ് ചെയ്യുക          |

## കംപ്രഷൻ ടൂളുകൾ (13)

| ടൂൾ                                 | സ്കോപ്പുകൾ          | വിവരണം                                                                                                                                        |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | കംപ്രഷൻ ക്രമീകരണങ്ങൾ, അനലിറ്റിക്സ് സംഗ്രഹം, കാഷ്-അവബോധമുള്ള സ്ഥിതിവിവരക്കണക്കുകൾ (`analytics.mcpDescriptionCompression` മെറ്റാഡാറ്റ ഉൾപ്പെടെ) |
| `omniroute_compression_configure`   | `write:compression` | കംപ്രഷൻ മോഡ്, ത്രെഷോൾഡ്, ലക്ഷ്യ അനുപാതം, സിസ്റ്റം-പ്രോംപ്റ്റ് സംരക്ഷണം, MCP വിവരണ കംപ്രഷൻ ടോഗിൾ എന്നിവ ക്രമീകരിക്കുക                          |
| `omniroute_set_compression_engine`  | `write:compression` | സജീവ എൻജിൻ (off/caveman/rtk/stacked), Caveman/RTK തീവ്രത എന്നിവ തിരഞ്ഞെടുക്കുക                                                                |
| `omniroute_list_compression_combos` | `read:compression`  | പേരിട്ട കംപ്രഷൻ കോംബോകളും അവയുടെ എൻജിൻ പൈപ്പ്ലൈനുകളും പട്ടികപ്പെടുത്തുക                                                                       |
| `omniroute_compression_combo_stats` | `read:compression`  | കംപ്രഷൻ കോംബോയും എൻജിനും അനുസരിച്ച് ഗ്രൂപ്പുചെയ്ത അനലിറ്റിക്സ്                                                                                |
| `omniroute_ccr_store`               | `write:compression` | കോൾ ചെയ്യുന്നയാൾക്കായി വേർതിരിച്ച ഉള്ളടക്കം പരിധിയുള്ള ഇൻ-മെമ്മറി CCR സ്റ്റോറിൽ സൂക്ഷിച്ച് ഒരു മാർക്കറും `ccr://` റെഫറൻസും തിരികെ നൽകുക       |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR ഉള്ളടക്കം പൂർണ്ണമായോ ഹെഡ്, ടെയിൽ, ലൈനുകൾ, grep, സ്ഥിതിവിവരക്കണക്ക് മോഡുകൾ ഉപയോഗിച്ചോ വീണ്ടെടുക്കുക                                        |
| `omniroute_ccr_inspect`             | `read:compression`  | ഉള്ളടക്കം തിരികെ നൽകാതെ കോൾ ചെയ്യുന്നയാളുടെ ഉടമസ്ഥതയിലുള്ള CCR മെറ്റാഡാറ്റ പരിശോധിക്കുക                                                       |
| `omniroute_ccr_list`                | `read:compression`  | കോൾ ചെയ്യുന്നയാളുടെ ഉടമസ്ഥതയിലുള്ള CCR ബ്ലോക്കുകളുടെ പേജിനേറ്റ് ചെയ്ത മെറ്റാഡാറ്റ പട്ടികപ്പെടുത്തുക                                           |
| `omniroute_ccr_delete`              | `write:compression` | കോൾ ചെയ്യുന്നയാളുടെ ഉടമസ്ഥതയിലുള്ള CCR ബ്ലോക്ക് ഇല്ലാതാക്കുക                                                                                  |
| `omniroute_ccr_stats`               | `read:compression`  | കോൾ ചെയ്യുന്നയാളുടെ പരിധിയിലുള്ള മെമ്മറി ഉപയോഗം, ലൈഫ്സൈക്കിൾ കൗണ്ടറുകൾ, സ്റ്റോർ പരിധികൾ എന്നിവ റിപ്പോർട്ട് ചെയ്യുക                            |
| `omniroute_rtk_discover`            | `read:compression`  | ഓപ്റ്റ്-ഇൻ RTK ഔട്ട്പുട്ട് സാമ്പിളുകളിലെ ആവർത്തിച്ചുവരുന്ന നോയ്സ് കണ്ടെത്തുക                                                                  |
| `omniroute_rtk_learn`               | `read:compression`  | ഓപ്റ്റ്-ഇൻ സാമ്പിളുകളിൽനിന്ന് അവലോകനം ചെയ്യാവുന്ന RTK ഫിൽട്ടർ ഡ്രാഫ്റ്റ് സൃഷ്ടിക്കുക                                                          |

CCR എൻട്രികൾ ഇൻ-മെമ്മറിയിൽ മാത്രമാണ് നിലനിൽക്കുന്നത്, റീസ്റ്റാർട്ട് ചെയ്യുമ്പോൾ അവ അപ്രത്യക്ഷമാകും. ഓരോ ബ്ലോക്കും 2 MiB ആയി, ഓരോ
പ്രിൻസിപ്പലും 16 MiB ആയി, ആഗോള സ്റ്റോർ 64 MiB ആയി പരിമിതപ്പെടുത്തിയിരിക്കുന്നു. എൻട്രികളുടെ ഡിഫോൾട്ട് TTL 24 മണിക്കൂറാണ് (പരമാവധി
ഏഴ് ദിവസം). പൂർണ്ണ MCP വീണ്ടെടുക്കൽ 256 KiB ആയി പരിമിതപ്പെടുത്തിയിരിക്കുന്നു; വലിയ ബ്ലോക്കുകൾ റേഞ്ച്ഡ്,
grep മോഡുകളിലൂടെ തുടർന്നും ലഭ്യമാണ്. സംഭരണം, വീണ്ടെടുക്കൽ, പട്ടികപ്പെടുത്തൽ, പരിശോധന, ഇല്ലാതാക്കൽ, സ്ഥിതിവിവരക്കണക്കുകൾ എന്നിവ
ഓതന്റിക്കേറ്റ് ചെയ്ത API-key പ്രിൻസിപ്പൽ അടിസ്ഥാനത്തിൽ വേർതിരിച്ചിരിക്കുന്നു. ഓഡിറ്റ് റെക്കോർഡുകളിൽ ഹാഷുകളും വലുപ്പ മെറ്റാഡാറ്റയും മാത്രമേ അടങ്ങിയിരിക്കൂ, ഉള്ളടക്കം ഒരിക്കലും അടങ്ങിയിരിക്കില്ല.

`omniroute_compression_status`, MCP വിവരണ കംപ്രഷനെ
`analytics.mcpDescriptionCompression` എന്നതിന് കീഴിൽ പ്രത്യേകം റിപ്പോർട്ട് ചെയ്യുന്നു. ആ മൂല്യങ്ങൾ MCP-യിൽ പട്ടികപ്പെടുത്താവുന്ന
വിവരണങ്ങളുടെ (`tools`, `prompts`, `resources`, `resourceTemplates`) മെറ്റാഡാറ്റ-വലുപ്പ എസ്റ്റിമേറ്റുകളാണ്; അവ പ്രൊവൈഡർ ഉപയോഗ
രസീതുകളല്ല, കൂടാതെ `source: "mcp_metadata_estimate"` എന്ന് അടയാളപ്പെടുത്തിയിരിക്കുന്നു.

### MCP ആക്സസിബിലിറ്റി ട്രീ ഫിൽട്ടർ (v3.8.0)

മുകളിലുള്ള കംപ്രഷൻ ടൂളുകളിൽനിന്ന് വേറിട്ട്, MCP ബ്രൗസർ/ആക്സസിബിലിറ്റി ടൂളുകളുടെ **ടൂൾ ഫലങ്ങൾ**
ഏജന്റിന് തിരികെ നൽകുന്നതിനുമുമ്പ് കംപ്രസ് ചെയ്യുന്ന ഒരു പോസ്റ്റ്-എക്സിക്യൂഷൻ ഫിൽട്ടർ OmniRoute-ൽ ഉൾപ്പെടുന്നു.
ഈ ഫിൽട്ടർ സ്വയം ഒരു ടൂൾ അല്ല — വിശദമായ ആക്സസിബിലിറ്റി-ട്രീ അല്ലെങ്കിൽ ബ്രൗസർ-സ്നാപ്പ്ഷോട്ട് ടെക്സ്റ്റ് (≥2000 അക്ഷരങ്ങൾ)
ഉൾക്കൊള്ളുന്ന ഏത് ടൂൾ ഫലത്തിലും ഇത് സുതാര്യമായി പ്രവർത്തിക്കുന്നു.

പ്രധാന പ്രവർത്തനങ്ങൾ:

- തുടർച്ചയായി ആവർത്തിക്കുന്ന ≥30 സിബ്ലിങ് ലൈനുകൾ ഹെഡ് + ടെയിൽ സംഗ്രഹമായി ചുരുക്കുന്നു
- Playwright/computer-use-ന് ആവശ്യമായ `[ref=eXX]` ആങ്കറുകൾ സംരക്ഷിക്കുന്നു
- അമിത വലുപ്പമുള്ള ടെക്സ്റ്റ് (>50,000 അക്ഷരങ്ങൾ) ഒരു നാവിഗേഷൻ സൂചനയോടെ നിർബന്ധിതമായി ട്രങ്കേറ്റ് ചെയ്യുന്നു
- പ്രതീക്ഷിക്കുന്ന ലാഭം: ബ്രൗസർ സ്നാപ്പ്ഷോട്ട് പേലോഡുകളിൽ **60–80%**

ക്രമീകരണം: ആഗോള ക്രമീകരണങ്ങളിലെ `compression.mcpAccessibility` (മൈഗ്രേഷൻ 056).
ഇംപ്ലിമെന്റേഷൻ: `open-sse/services/compression/engines/mcpAccessibility/`.
പൂർണ്ണ ഡോക്യുമെന്റേഷൻ: [കംപ്രഷൻ എൻജിനുകൾ — MCP ആക്സസിബിലിറ്റി ട്രീ ഫിൽട്ടർ](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

ഈ ടൂളുകൾക്ക് പിന്നിലുള്ള റൺടൈം കംപ്രഷൻ മോഡലിനായി [കംപ്രഷൻ എൻജിനുകൾ](../compression/COMPRESSION_ENGINES.md), [RTK കംപ്രഷൻ](../compression/RTK_COMPRESSION.md) എന്നിവ
കാണുക.

## 1Proxy ഉപകരണങ്ങൾ (3)

| ഉപകരണം                      | സ്കോപ്പുകൾ     | വിവരണം                                                                                                          |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy മാർക്കറ്റ്പ്ലേസിൽനിന്ന് സൗജന്യ പ്രോക്സികൾ ലഭ്യമാക്കുക (പ്രോട്ടോക്കോൾ/രാജ്യം/ഗുണനിലവാരം/പരിധി ഫിൽട്ടറുകൾ) |
| `omniroute_oneproxy_rotate` | `read:proxies` | തന്ത്രം അനുസരിച്ച് അടുത്ത ലഭ്യമായ പ്രോക്സി നേടുക (`random` / `quality` / `sequential`)                          |
| `omniroute_oneproxy_stats`  | `read:proxies` | പൂൾ സ്ഥിതിവിവരക്കണക്കുകൾ, സമന്വയ നില, പ്രോട്ടോക്കോളും രാജ്യവും അനുസരിച്ചുള്ള വിതരണം                             |

## മെമ്മറി ഉപകരണങ്ങൾ (3)

`open-sse/mcp-server/tools/memoryTools.ts`-ൽ നിർവചിച്ചിരിക്കുന്നു. സാധാരണ MCP സ്കോപ്പ് പൈപ്പ്ലൈനിലൂടെയാണ് പ്രാമാണീകരണവും സ്കോപ്പും നടപ്പിലാക്കുന്നത്.

| ഉപകരണം                    | സ്കോപ്പുകൾ     | വിവരണം                                                                                                            |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | ടോക്കൺ-ബജറ്റ് നിയന്ത്രണത്തോടെ ക്വറി / തരം / API കീ എന്നിവ പ്രകാരം മെമ്മറികൾ തിരയുക                                |
| `omniroute_memory_add`    | `write:memory` | ഒരു പുതിയ മെമ്മറി എൻട്രി ചേർക്കുക (`factual` / `episodic` / `procedural` / `semantic`)                            |
| `omniroute_memory_clear`  | `write:memory` | ഒരു API കീയുടെ മെമ്മറികൾ മായ്ക്കുക; ആവശ്യമെങ്കിൽ തരം അല്ലെങ്കിൽ `olderThan` ടൈംസ്റ്റാമ്പ് പ്രകാരം ഫിൽട്ടർ ചെയ്യാം |

## സ്കിൽ ഉപകരണങ്ങൾ (4)

`open-sse/mcp-server/tools/skillTools.ts`-ൽ നിർവചിച്ചിരിക്കുന്നു. `src/lib/skills/registry` + `src/lib/skills/executor` എന്നിവയുടെ പിന്തുണയോടെയാണ് പ്രവർത്തിക്കുന്നത്.

| ഉപകരണം                        | സ്കോപ്പുകൾ       | വിവരണം                                                                                                                             |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API കീ, പേര്, അല്ലെങ്കിൽ പ്രവർത്തനക്ഷമമായ നില എന്നിവ പ്രകാരമുള്ള ഐച്ഛിക ഫിൽട്ടറിംഗോടെ രജിസ്റ്റർ ചെയ്ത സ്കില്ലുകൾ പട്ടികപ്പെടുത്തുക |
| `omniroute_skills_enable`     | `write:skills`   | ID പ്രകാരം ഒരു നിർദിഷ്ട സ്കിൽ പ്രവർത്തനക്ഷമമാക്കുകയോ പ്രവർത്തനരഹിതമാക്കുകയോ ചെയ്യുക                                                |
| `omniroute_skills_execute`    | `execute:skills` | നൽകിയ ഇൻപുട്ട് ഉപയോഗിച്ച് ഒരു സ്കിൽ പ്രവർത്തിപ്പിച്ച് നിർവഹണ രേഖ തിരികെ നൽകുക                                                      |
| `omniroute_skills_executions` | `read:skills`    | സമീപകാല സ്കിൽ നിർവഹണ ചരിത്രം പട്ടികപ്പെടുത്തുക                                                                                     |

## Notion കോൺടെക്സ്റ്റ് സോഴ്സ് (6)

`open-sse/mcp-server/tools/notionTools.ts`-ൽ നിർവചിച്ചിരിക്കുന്നു. `src/lib/db/notion.ts` വഴി `key_value` പട്ടികയിൽ ടോക്കൺ സംഭരിക്കുന്നു. REST ക്ലയന്റ് `src/lib/notion/api.ts`-ൽ. ക്രമീകരണ API `src/app/api/settings/notion/route.ts`-ൽ. ഡാഷ്ബോർഡ് UI `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`-ൽ.

Endpoint ഡാഷ്ബോർഡിലെ **കോൺടെക്സ്റ്റ് സോഴ്സുകൾ** ടാബിൽനിന്നോ REST API വഴിയോ നിങ്ങളുടെ Notion ഇന്റഗ്രേഷൻ ടോക്കൺ കോൺഫിഗർ ചെയ്യുക:

```bash
# ടോക്കൺ സജ്ജീകരിക്കുക
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# നില പരിശോധിക്കുക
curl http://localhost:20128/api/settings/notion

# വിച്ഛേദിക്കുക
curl -X DELETE http://localhost:20128/api/settings/notion
```

| ഉപകരണം                       | സ്കോപ്പുകൾ     | വിവരണം                                                                                  |
| :--------------------------- | :------------- | :-------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | എല്ലാ പേജുകളിലും ഡാറ്റാബേസുകളിലും പൂർണ്ണ-ടെക്സ്റ്റ് തിരയൽ നടത്തുക                       |
| `notion_get_page`            | `read:notion`  | ഒരു പേജ് അതിന്റെ പ്രോപ്പർട്ടികൾ ഉൾപ്പെടെ ID പ്രകാരം നേടുക                               |
| `notion_list_block_children` | `read:notion`  | ഒരു പേജിന്റെയോ ബ്ലോക്കിന്റെയോ ചൈൽഡ് ബ്ലോക്കുകൾ പട്ടികപ്പെടുത്തുക                        |
| `notion_query_database`      | `read:notion`  | ഫിൽട്ടറുകൾ, സോർട്ടുകൾ, പേജിനേഷൻ എന്നിവ ഉപയോഗിച്ച് ഒരു ഡാറ്റാബേസ് ക്വറി ചെയ്യുക          |
| `notion_get_database`        | `read:notion`  | ID പ്രകാരം ഡാറ്റാബേസ് സ്കീമ നേടുക                                                       |
| `notion_append_blocks`       | `write:notion` | ഒരു പേരന്റ് ബ്ലോക്കിലേക്ക് ചൈൽഡ് ബ്ലോക്കുകൾ ചേർക്കുക (ഓരോ അഭ്യർത്ഥനയ്ക്കും പരമാവധി 100) |

## ഏജന്റ് സ്കിൽ കാറ്റലോഗ് ടൂളുകൾ (3)

`open-sse/mcp-server/tools/agentSkillTools.ts`-ൽ നിർവചിച്ചിരിക്കുന്നു. `src/lib/agentSkills/catalog` ആണ് ഇവയുടെ അടിസ്ഥാനം. 45 എൻട്രികളുള്ള Agent Skills ഡോക്യുമെന്റേഷൻ കാറ്റലോഗ് MCP ക്ലയന്റുകൾക്കും ബാഹ്യ ഏജന്റുകൾക്കും ഈ ടൂളുകൾ ലഭ്യമാക്കുന്നു. സ്കോപ്പ്: `read:catalog`.

| ടൂൾ                               | സ്കോപ്പുകൾ     | വിവരണം                                                                                                                                                             |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | ഐച്ഛികമായ `category` (api\|cli), `area` ഫിൽട്ടറുകൾ ഉപയോഗിച്ച് എല്ലാ 45 ഏജന്റ് സ്കില്ലുകളും പട്ടികപ്പെടുത്തുന്നു; മെറ്റാഡാറ്റയും കവറേജും മടക്കിനൽകുന്നു             |
| `omniroute_agent_skills_get`      | `read:catalog` | കാനോണിക്കൽ `id` ഉപയോഗിച്ച് ഒരു സ്കില്ലിന്റെ പൂർണ്ണ മെറ്റാഡാറ്റയും SKILL.md ഉള്ളടക്കവും ലഭ്യമാക്കുന്നു                                                              |
| `omniroute_agent_skills_coverage` | `read:catalog` | കവറേജ് സ്ഥിതിവിവരക്കണക്കുകൾ: 23 API, 21 CLI, 1 config സ്കില്ലുകളിൽ എത്രയെണ്ണത്തിന് ഫയൽസിസ്റ്റത്തിൽ SKILL.md ഫയലുകളുണ്ടെന്നും കാറ്റലോഗിലെ ആകെ എണ്ണവുമായി താരതമ്യവും |

പൂർണ്ണ കാറ്റലോഗിനും ബാഹ്യ ഏജന്റുകൾ അത് എങ്ങനെ ഉപയോഗിക്കുന്നു എന്നതിനും [AGENT-SKILLS.md](./AGENT-SKILLS.md) കാണുക.

## ബന്ധപ്പെട്ട ഫ്രെയിംവർക്കുകൾ (v3.8.0)

മുകളിലുള്ള MCP ടൂൾ ഇൻവെന്ററി (110 തനതായ ടൂളുകൾ, `countUniqueMcpTools()` ഉപയോഗിച്ച് കണക്കാക്കിയത്) റൺടൈം റൂട്ടിംഗ്/കാഷ്/കംപ്രഷൻ/മെമ്മറി/സ്കിൽസ്/പ്രോക്സി/കോൺടെക്സ്റ്റ്-സോഴ്സ് പ്രവർത്തനങ്ങൾക്കായി മനഃപൂർവം
പരിമിതപ്പെടുത്തിയിരിക്കുന്നു. v3.8.0-ൽ MCP സർവറിനൊപ്പം സമീപബന്ധമുള്ള രണ്ട്
ഫ്രെയിംവർക്കുകൾ ലഭ്യമാക്കുകയും അവയെക്കുറിച്ച് പ്രത്യേകം രേഖപ്പെടുത്തുകയും ചെയ്തിട്ടുണ്ട്:

### Cloud Agents

Cloud Agents എന്നത് LLM പ്രൊവൈഡറുകൾക്കായി ഉപയോഗിക്കുന്ന അതേ കണക്ഷൻ മോഡൽ വഴി
OmniRoute-ലേക്ക് ബന്ധിപ്പിച്ചിട്ടുള്ള, പ്രോസസിന് പുറത്തു പ്രവർത്തിക്കുന്ന AI കോഡിംഗ് ഏജന്റുകളാണ് (codex-cloud, cursor-cloud, devin, jules). അവ
സ്വന്തമായ REST ഉപരിതലത്തിലൂടെ (`/api/v1/agents/*`) ലഭ്യമാക്കപ്പെടുന്നു, കൂടാതെ അവ MCP ടൂൾ കാറ്റലോഗിന്റെ ഭാഗമല്ല
— ഒരു Cloud Agent-നെ വിളിക്കുന്നത് MCP സ്കോപ്പ് ഉപയോഗിക്കില്ല.

- ഇംപ്ലിമെന്റേഷൻ: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- ലൈഫ്സൈക്കിൾ: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- ഡോക്യുമെന്റേഷൻ: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails എന്നത് ചാറ്റ് പൈപ്പ്ലൈനിനുള്ളിൽ പ്രയോഗിക്കുന്ന, എക്സിക്യൂഷന് മുമ്പും ശേഷവും പ്രവർത്തിക്കുന്ന ഫിൽട്ടറുകളാണ് (vision-bridge, pii-masker, prompt-injection).
MCP ടൂൾ/റൂട്ട് ലെയറിൽ എത്തുന്നതിനു മുമ്പ് അവ പ്രവർത്തിക്കുകയും ഘടനാബദ്ധമായ ലംഘനങ്ങൾ ഓഡിറ്റ് പൈപ്പ്ലൈനിലേക്ക് പുറപ്പെടുവിക്കുകയും ചെയ്യുന്നു; അവ MCP ടൂളുകളായി ഇൻവോക്ക് ചെയ്യപ്പെടുന്നില്ല.

- ഇംപ്ലിമെന്റേഷൻ: `src/lib/guardrails/`.
- ഡോക്യുമെന്റേഷൻ: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

തടയപ്പെട്ടതായി തോന്നുന്ന ഒരു MCP കോൾ ഡീബഗ് ചെയ്യുമ്പോൾ, MCP ഓഡിറ്റ് ലോഗും
(`scope_denied:*` എൻട്രികൾ) Guardrails ഓഡിറ്റ് ട്രെയിലും പരിശോധിക്കുക — ഒരു അഭ്യർത്ഥന MCP സ്കോപ്പ് എൻഫോഴ്സ്മെന്റ് ലെയറിൽ എത്തുന്നതിന് **മുമ്പ്** തന്നെ
ഒരു Guardrail നിരസിച്ചിരിക്കാം.

---

## REST API എൻഡ്പോയിന്റുകൾ

| എൻഡ്പോയിന്റ്           | മെത്തഡ്               | വിവരണം                                                                                                            | ഓത്ത്                        |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------- | :--------------------------- |
| `/api/mcp/status`      | `GET`                 | സർവർ നില: ഹാർട്ട്ബീറ്റ്, HTTP ട്രാൻസ്പോർട്ട് നില, ഓഡിറ്റ് പ്രവർത്തന സംഗ്രഹം                                       | മാനേജ്മെന്റ് (session/admin) |
| `/api/mcp/tools`       | `GET`                 | ടൂൾ കാറ്റലോഗ് (പേര്, വിവരണം, സ്കോപ്പുകൾ, ഘട്ടം, സോഴ്സ് എൻഡ്പോയിന്റുകൾ)                                            | മാനേജ്മെന്റ്                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ട്രാൻസ്പോർട്ട് എൻഡ്പോയിന്റ് (`mcpEnabled` + `mcpTransport === "sse"` വഴി നിയന്ത്രിച്ചിരിക്കുന്നു)             | API കീ + സ്കോപ്പുകൾ          |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | സ്ട്രീം ചെയ്യാവുന്ന HTTP ട്രാൻസ്പോർട്ട് (`mcp-session-id` ഹെഡർ ഉപയോഗിക്കുന്നു; `DELETE` സെഷൻ അവസാനിപ്പിക്കുന്നു)  | API കീ + സ്കോപ്പുകൾ          |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit`-ൽ നിന്നുള്ള ഓഡിറ്റ് ലോഗ് എൻട്രികൾ (ഫിൽട്ടറുകൾ: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | മാനേജ്മെന്റ്                 |
| `/api/mcp/audit/stats` | `GET`                 | സംയോജിത ഓഡിറ്റ് സ്ഥിതിവിവരക്കണക്കുകൾ (`totalCalls`, `successRate`, `avgDurationMs`, മുൻനിര ടൂളുകൾ)                | മാനേജ്മെന്റ്                 |

സോഴ്സ് ഫയലുകൾ: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Settings-ൽ MCP സർവർ പ്രവർത്തനക്ഷമമാക്കുകയും (`mcpEnabled`) അനുയോജ്യമായ `mcpTransport` തിരഞ്ഞെടുക്കുകയും ചെയ്യുന്നതുവരെ SSE, Streamable HTTP ട്രാൻസ്പോർട്ടുകൾ രണ്ടും തടയപ്പെട്ടിരിക്കും. തെറ്റായ ട്രാൻസ്പോർട്ടാണ് കോൺഫിഗർ ചെയ്തിരിക്കുന്നതെങ്കിൽ, സെറ്റിങ്സ് മാറ്റാനുള്ള ഒരു സൂചനയോടൊപ്പം റൂട്ട് HTTP 400 മടക്കിനൽകും.

---

## പ്രാമാണീകരണവും സ്കോപ്പുകളും

MCP ടൂളുകൾ API കീ സ്കോപ്പുകളിലൂടെയാണ് പ്രാമാണീകരിക്കപ്പെടുന്നത്. സ്കോപ്പ് നിർബന്ധിതമാക്കൽ
`open-sse/mcp-server/scopeEnforcement.ts`-ൽ കേന്ദ്രീകരിച്ചിരിക്കുന്നു. ഓരോ ടൂളിനും നിർദ്ദിഷ്ട സ്കോപ്പുകൾ ആവശ്യമാണ്:

| സ്കോപ്പ്              | ടൂളുകൾ                                                                                                                                                                        |
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
| `read:obsidian`       | 13 റീഡ് ടൂളുകൾ — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 റൈറ്റ് ടൂളുകൾ — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …              |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                             |

വൈൽഡ്കാർഡ് സ്കോപ്പുകൾ പിന്തുണയ്ക്കുന്നു: `read:*` എല്ലാ റീഡ് സ്കോപ്പുകളും അനുവദിക്കുന്നു, `*` പൂർണ്ണ ആക്സസ് അനുവദിക്കുന്നു.

### `mcp:connect` — പരിമിതമായ റൂട്ട് ശേഷി (#7895)

ലൂപ്പ്ബാക്ക് അല്ലാത്ത ഇടങ്ങളിൽനിന്ന് HTTP/SSE MCP ട്രാൻസ്പോർട്ടിലേക്ക് (`/api/mcp/*`) എത്തുന്നതിന്
`/api/mcp/` LOCAL_ONLY ഒഴിവാക്കൽ ആവശ്യമാണ് (`docs/security/ROUTE_GUARD_TIERS.md` കാണുക). ചരിത്രപരമായി,
ആ ഒഴിവാക്കൽ പൂർണ്ണമായ `manage`/`admin`-സ്കോപ്പുള്ള API കീ മാത്രമേ സ്വീകരിച്ചിരുന്നുള്ളൂ — MCP-യുമായി മാത്രം
ആശയവിനിമയം നടത്തേണ്ട ഒരു കോളറിന് ഇത് ആവശ്യത്തിലധികം വിശാലമാണ്. `src/shared/constants/managementScopes.ts` ഇപ്പോൾ
`MCP_CONNECT_SCOPE = "mcp:connect"` എക്സ്പോർട്ട് ചെയ്യുന്നു: ഇത് ഒരു അധിക, പരിമിതമായ സ്കോപ്പാണ് (`SELF_USAGE_SCOPE`-ന്റെ
അതേ മാതൃകയിൽ), `src/server/authz/policies/management.ts`-ലെ `/api/mcp/` ബൈപാസ് മാത്രം അംഗീകരിക്കുന്നു — ഇത് മറ്റ്
യാതൊരു മാനേജ്മെന്റ്-റൂട്ട് ആക്സസും അനുവദിക്കുന്നില്ല, കൂടാതെ ഉദ്ദേശ്യപൂർവം `MANAGEMENT_API_KEY_SCOPES`-ൽ നിന്ന്
ഒഴിവാക്കിയിരിക്കുന്നു. `manage`/`admin` ഉള്ള ഒരു കീ ഇപ്പോഴും മാറ്റമില്ലാതെ ഈ ഒഴിവാക്കൽ കടന്നുപോകും; റിമോട്ട് MCP-മാത്രം
കോളർമാർക്കുള്ള കുറഞ്ഞ-അധികാരമുള്ള ഒരു ബദലാണ് `mcp:connect`, ഇത് `hasMcpConnectOrManageScope()` വഴി പരിശോധിക്കുന്നു.

### ഓരോ കീയ്ക്കുമുള്ള HTTP സ്കോപ്പ് ബൈൻഡിംഗ് (#7895)

HTTP/SSE വഴി, `open-sse/mcp-server/httpTransport.ts` ഇപ്പോൾ `resolveMcpCallerAuthInfo()`
(`open-sse/mcp-server/httpAuthContext.ts`) ഉപയോഗിച്ച് കോളറുടെ യഥാർത്ഥ `api_keys.scopes` നിർണ്ണയിക്കുകയും
അത് MCP SDK-യുടെ `transport.handleRequest(req, { authInfo })`-ലേക്ക് കൈമാറുകയും ചെയ്യുന്നു; അതിനാൽ ഓരോ ടൂൾ
കോളിലേക്കും എത്തുന്ന `extra.authInfo.scopes`, Bearer കീയുടെ സ്വന്തം സ്കോപ്പുകളെ പ്രതിഫലിപ്പിക്കുന്നു.
`scopeEnforcement.ts`-ലെ `resolveCallerScopeContext()` ഇതിനകം `_meta`, `OMNIROUTE_MCP_SCOPES` env ഫാൾബാക്ക്
എന്നിവയെക്കാൾ `authInfo`-യ്ക്ക് മുൻഗണന നൽകിയിരുന്നു — മുമ്പ് HTTP വഴി ഡാറ്റ ലഭിക്കാതിരുന്ന, ആദ്യത്തേതും
ഏറ്റവും ഉയർന്ന മുൻഗണനയുള്ളതുമായ ആ സ്രോതസ്സ് മാത്രമാണ് ഇത് ഇപ്പോൾ പൂരിപ്പിക്കുന്നത്. ഒരു API കീയും നിർണ്ണയിക്കപ്പെടാത്തപ്പോൾ
(ഹെഡർ ഇല്ല, അസാധുവായ കീ), `authInfo` `undefined` ആയി തുടരുകയും നിർണ്ണയം മാറ്റമില്ലാതെ നിലവിലുള്ള `meta`/env
ശൃംഖലയിലേക്ക് കടക്കുകയും ചെയ്യുന്നു. ഇത് `OMNIROUTE_MCP_ENFORCE_SCOPES`-ന്റെ ഡിഫോൾട്ട് മാറ്റുന്നില്ല —
നിർബന്ധിതമാക്കൽ ഇപ്പോഴും വ്യക്തമായി പ്രവർത്തനക്ഷമമാക്കേണ്ടതുണ്ട്; പ്രവർത്തനക്ഷമമാക്കിയാൽ ഓരോ കീയ്ക്കുമുള്ള പാതയ്ക്ക്
മുൻഗണന നൽകുക മാത്രമാണ് ഈ മാറ്റം ചെയ്യുന്നത്. stdio-യ്ക്ക് ഓരോ കോളറിനുമുള്ള ഐഡന്റിറ്റി ഇല്ല
(`mcpCallerIdentity.ts` കാണുക), അതിനാൽ അതിനെ ഇത് ബാധിക്കില്ല — അത് `_meta`/env ഫാൾബാക്ക് ശൃംഖലയിൽ തന്നെ തുടരുന്നു.

---

## പരിസ്ഥിതി വേരിയബിളുകൾ

| വേരിയബിൾ                                | ഡിഫോൾട്ട്                                             | ഉദ്ദേശ്യം                                                                                                                                                |
| :-------------------------------------- | :---------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                              | OmniRoute ആന്തരിക API-കളെ വിളിക്കുമ്പോൾ MCP സെർവർ ഉപയോഗിക്കുന്ന അടിസ്ഥാന URL                                                                             |
| `OMNIROUTE_API_KEY`                     | (ശൂന്യം)                                              | ആന്തരിക API കോളുകളിലേക്ക് `Authorization: Bearer` ആയി കൈമാറുന്ന API കീ                                                                                   |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` മാത്രം ഇത് പ്രവർത്തനക്ഷമമാക്കുന്നു) | പ്രവർത്തനക്ഷമമാക്കിയിരിക്കുമ്പോൾ, നഷ്ടമായ സ്കോപ്പുകൾ ടൂൾ കോളുകൾ നിരസിക്കുകയും ഓഡിറ്റ് ലോഗിൽ `scope_denied:<reason>` രേഖപ്പെടുത്തുകയും ചെയ്യും            |
| `OMNIROUTE_MCP_SCOPES`                  | (ശൂന്യം)                                              | ഡിഫോൾട്ടായി "ലഭ്യമാണ്" എന്ന് കണക്കാക്കുന്ന സ്കോപ്പുകളുടെ കോമ ഉപയോഗിച്ച് വേർതിരിച്ച അനുവദനീയ പട്ടിക (കോളർ സ്വന്തം സ്കോപ്പുകൾ നൽകാത്തപ്പോൾ ഉപയോഗിക്കുന്നു) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (സജ്ജീകരിച്ചിട്ടില്ല = ഓൺ)                            | `0/false/off/no` ആയി സജ്ജീകരിക്കുമ്പോൾ, രജിസ്ട്രേഷൻ സമയത്തെ MCP വിവരണ കംപ്രഷൻ പ്രവർത്തനരഹിതമാക്കുന്നു                                                    |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (സജ്ജീകരിച്ചിട്ടില്ല = ഓൺ)                            | മുകളിലെ അതേ ടോഗിളിനുള്ള ഇതര അപരനാമം                                                                                                                      |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                               | ആന്തരിക മാനേജ്മെന്റ് റീഡുകൾക്കുള്ള നിർത്തലാക്കൽ സമയപരിധി (ആരോഗ്യം, പ്രതിരോധശേഷി, കോംബോകൾ, ക്വാട്ട, ഉപയോഗം)                                               |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                               | ഒരു പ്രൊവൈഡറിനായി കാത്തിരിക്കുന്ന ഹോപ്പുകൾക്കുള്ള നിർത്തലാക്കൽ സമയപരിധി (`route_request`, `web_search`, `web_fetch`)                                     |
| `MCP_TOOL_DENY`                         | (സജ്ജീകരിച്ചിട്ടില്ല = ഫിൽട്ടർ ഇല്ല)                  | `tools/list`-ൽ നിന്ന് ഒഴിവാക്കേണ്ട ടൂൾ പേരുകളുടെ കോമ ഉപയോഗിച്ച് വേർതിരിച്ച പട്ടിക (ടൂൾ കാർഡിനാലിറ്റി കുറയ്ക്കൽ — താഴെ കാണുക)                             |
| `MCP_TOOL_ALLOW`                        | (സജ്ജീകരിച്ചിട്ടില്ല = ഫിൽട്ടർ ഇല്ല)                  | മാത്രം നിലനിർത്തേണ്ട ടൂൾ പേരുകളുടെ കോമ ഉപയോഗിച്ച് വേർതിരിച്ച പട്ടിക (അനുവദനീയ-പട്ടിക മോഡ് — താഴെ കാണുക)                                                  |
| `DATA_DIR`                              | `~/.omniroute`                                        | ഹാർട്ട്ബീറ്റ് ഫയൽ `${DATA_DIR}/runtime/mcp-heartbeat.json` എന്നതിലേക്ക് എഴുതപ്പെടുന്നു                                                                   |

---

## വിവരണ കംപ്രഷൻ

ക്ലയന്റുകൾക്ക് വെളിപ്പെടുത്തുന്ന മെറ്റാഡാറ്റയുടെ വലുപ്പം (അതുവഴി പ്രോംപ്റ്റ് കോൺടെക്സ്റ്റിന്റെ ചെലവും) കുറയ്ക്കുന്നതിനായി, MCP ടൂൾ, പ്രോംപ്റ്റ്, റിസോഴ്സ് രജിസ്ട്രികൾക്ക് രജിസ്ട്രേഷൻ/ലിസ്റ്റിംഗ് സമയത്ത് വിവരണങ്ങൾ കംപ്രസ് ചെയ്യാനാകും. ഇതിന്റെ ഇംപ്ലിമെന്റേഷൻ `open-sse/mcp-server/descriptionCompressor.ts`-ലാണ് ഉള്ളത്; `createMcpServer()`-നുള്ളിലെ `compressMcpRegistryMetadata` വഴി ഇത് MCP സെർവറുമായി ബന്ധിപ്പിച്ചിരിക്കുന്നു.

- ഘടനാപരമായ ഉള്ളടക്കത്തിൽ മാറ്റം വരാതിരിക്കാനായി സംരക്ഷിത ബ്ലോക്ക് എക്സ്ട്രാക്ഷനോടൊപ്പം (കോഡ് സ്പാനുകൾ, ഫെൻസ്ഡ് ബ്ലോക്കുകൾ തുടങ്ങിയവ) Caveman നിയമസമുച്ചയം (`getRulesForContext("all", "full")`) ഉപയോഗിച്ച് വിവരണ ടെക്സ്റ്റിൽ കംപ്രഷൻ പ്രവർത്തിക്കുന്നു.
- `key_value` ക്രമീകരണ പട്ടികയിലെ `compression.mcpDescriptionCompressionEnabled` മൂല്യം വഴി ഓരോ വിന്യാസത്തിനും ടോഗിൾ ചെയ്യുക (ഡിഫോൾട്ട്: പ്രവർത്തനക്ഷമം) — UI-യിൽ **അനലിറ്റിക്സ് → MCP വിവരണ കംപ്രഷൻ** എന്ന പേരിൽ ലഭ്യമാണ്.
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` അല്ലെങ്കിൽ `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` എന്നിവയിൽ ഏതെങ്കിലും ഉപയോഗിച്ച് മുഴുവൻ പ്രോസസിലുമായി ടോഗിൾ ചെയ്യുക.
- തത്സമയ സ്ഥിതിവിവരക്കണക്കുകൾ `analytics.mcpDescriptionCompression`-ന് കീഴിലുള്ള `omniroute_compression_status` വഴി ലഭ്യമാക്കുകയും യഥാർത്ഥ പ്രൊവൈഡർ ഉപയോഗ രസീതുകളിൽ നിന്ന് വേർതിരിച്ചറിയാൻ `source: "mcp_metadata_estimate"` എന്ന് ടാഗ് ചെയ്യുകയും ചെയ്യുന്നു.

---

## ടൂൾ കാർഡിനാലിറ്റി കുറയ്ക്കൽ (F4.3)

വിവരണ കംപ്രഷൻ ഓരോ ടൂളിന്റെയും മെറ്റാഡാറ്റയുടെ വലുപ്പം കുറയ്ക്കുന്നു; **ടൂൾ കാർഡിനാലിറ്റി കുറയ്ക്കൽ** ഒരു പടി കൂടി മുന്നോട്ടുപോയി, മൊത്തത്തിൽ _എത്ര_ ടൂളുകൾ പ്രഖ്യാപിക്കപ്പെടുന്നു എന്നത് കുറയ്ക്കുന്നു. `tools/list` മാനിഫെസ്റ്റിൽ കുറച്ച് ടൂളുകൾ മാത്രം പ്രദർശിപ്പിക്കുന്നത്, ടൂൾ കാറ്റലോഗിനായി ക്ലയന്റിന്റെ മോഡൽ നൽകേണ്ട ഓരോ അഭ്യർത്ഥനയുടെയും ടോക്കൺ ചെലവ് കുറയ്ക്കുന്നു ("layer 5" കംപ്രഷൻ). ഈ നടപ്പാക്കൽ `open-sse/mcp-server/toolCardinality.ts`-ലെ (`reduceToolManifest`) പൂർണ്ണമായും സ്റ്റേറ്റ്ലെസ് ആയ ഒരു ഫിൽട്ടറാണ്; ഇത് `createMcpServer()`-ലെ (`open-sse/mcp-server/server.ts`) രജിസ്ട്രേഷൻ ലൂപ്പുമായി ബന്ധിപ്പിച്ചിരിക്കുന്നു.

**സ്വമേധയാ പ്രവർത്തനക്ഷമമാക്കേണ്ടതാണ്; ഡിഫോൾട്ടായി പ്രവർത്തനരഹിതമാണ്.** രണ്ട് എൻവയോൺമെന്റ് വേരിയബിളുകളിൽ കുറഞ്ഞത് ഒരെണ്ണമെങ്കിലും സജ്ജമാക്കിയിരിക്കുമ്പോൾ മാത്രമേ ഫിൽട്ടർ പ്രവർത്തിക്കൂ; രണ്ടും സജ്ജമാക്കിയിട്ടില്ലെങ്കിൽ, എല്ലാ 110 ടൂളുകളും മാറ്റമില്ലാതെ പ്രഖ്യാപിക്കപ്പെടും.

| വേരിയബിൾ         | മോഡ്                                                                                                      |
| :--------------- | :-------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | ബ്ലാക്ക്ലിസ്റ്റ് — `tools/list`-ൽനിന്ന് എല്ലായ്പ്പോഴും ഒഴിവാക്കേണ്ട, കോമ ഉപയോഗിച്ച് വേർതിരിച്ച ടൂൾ പേരുകൾ |
| `MCP_TOOL_ALLOW` | അനുവദനീയ പട്ടിക — കോമ ഉപയോഗിച്ച് വേർതിരിച്ച ടൂൾ പേരുകൾ; ഇവ മാത്രം നിലനിൽക്കും, മറ്റെല്ലാം ഒഴിവാക്കപ്പെടും |

`deny`-ക്ക് `allow`-നേക്കാൾ മുൻഗണനയുണ്ട്. പേരുകൾ കോമ ഉപയോഗിച്ച് വേർതിരിക്കുകയും, ചുറ്റുമുള്ള ശൂന്യസ്ഥലങ്ങൾ നീക്കുകയും, ശൂന്യ എൻട്രികൾ അവഗണിക്കുകയും ചെയ്യുന്നു. ഉദാഹരണങ്ങൾ:

```bash
# കാറ്റലോഗിൽനിന്ന് രണ്ട് ടൂളുകൾ ഒഴിവാക്കുക
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# റൂട്ടിംഗ് + ക്വോട്ട ടൂളുകൾ മാത്രം പ്രഖ്യാപിക്കുക (അനുവദനീയ പട്ടിക മോഡ്)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**ഫിൽട്ടർ ചെയ്ത ടൂളുകൾ നീക്കംചെയ്യുന്ന വിധം:** രജിസ്ട്രേഷൻ എല്ലായ്പ്പോഴും വിജയിക്കും; പ്രൊഫൈൽ നിരസിക്കുന്ന ഒരു ടൂൾ പിന്നീട് MCP SDK ഹാൻഡിലിൽ `.disable()` ചെയ്യപ്പെടുന്നു. അതിനാൽ അത് `tools/list`-ൽ ഒരിക്കലും ദൃശ്യമാകില്ല, എന്നാൽ വയറിംഗ് മാറ്റമില്ലാതെ തുടരും (വൃത്തിയായ enable/disable, വീണ്ടും രജിസ്റ്റർ ചെയ്യേണ്ടതില്ല). പ്രൊഫൈൽ പാർസർ `readMcpToolProfileFromEnv(process.env)` ആണ്; രണ്ട് വേരിയബിളുകളും ശൂന്യമാണെങ്കിൽ ഇത് `null` (ഫിൽട്ടറിംഗ് ഇല്ല) മടക്കിനൽകുന്നു.

`reduceToolManifest`-ന് പിന്നിലെ കൂടുതൽ സമ്പന്നമായ `ToolProfile` ഘടന സ്കോപ്പ്-ഇന്റർസെക്ഷൻ ഫിൽട്ടറിംഗും (`allowScopes`, `read:*`-ശൈലിയിലുള്ള വൈൽഡ്കാർഡ് പൊരുത്തപ്പെടുത്തലോടെ), നിർണയാത്മകമായ `maxTools` പരിധിയും പിന്തുണയ്ക്കുന്നു. എന്നാൽ ഈ രണ്ട് ക്രമീകരണങ്ങൾക്കും രജിസ്ട്രേഷൻ സമയത്ത് പൂർണ്ണ മാനിഫെസ്റ്റ് ആവശ്യമാണ്; അതിനാൽ അവ നിലവിൽ എൻവയോൺമെന്റ് വേരിയബിളുകളിലൂടെ ലഭ്യമാക്കിയിട്ടില്ല (`tools/list`-തലത്തിലുള്ള ഒരു ഹുക്ക് ട്രാക്ക് ചെയ്യുന്ന തുടർപ്രവർത്തനമാണ്). കുറയ്ക്കുന്നതിന് മുമ്പും ശേഷവും മാനിഫെസ്റ്റിന്റെ ടോക്കൺ ചെലവ് താരതമ്യം ചെയ്യാൻ `estimateManifestTokens()` ലഭ്യമാണ്.

---

## റൺടൈം ഹാർട്ട്ബീറ്റ്

stdio ട്രാൻസ്പോർട്ട് ഓരോ 5 സെക്കൻഡിലും ലൈവ്നെസ് നില `${DATA_DIR}/runtime/mcp-heartbeat.json`-ൽ സംഭരിക്കുന്നു. `online` നില നിർണയിക്കാൻ ഡാഷ്ബോർഡ് (`/api/mcp/status`) ഈ ഫയലും PID ലൈവ്നെസും വായിക്കുന്നു. പകരം, HTTP ട്രാൻസ്പോർട്ടുകൾ ഇൻ-പ്രോസസ് `getMcpHttpStatus()`-ൽനിന്ന് നില റിപ്പോർട്ട് ചെയ്യുന്നു (ഫയൽ എഴുതുന്നില്ല).

ഹാർട്ട്ബീറ്റ് സ്നാപ്പ്ഷോട്ടിൽ ഇനിപ്പറയുന്നവ അടങ്ങിയിരിക്കുന്നു:

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

## ഓഡിറ്റ് ലോഗിംഗ്

ഓരോ ടൂൾ കോളും `open-sse/mcp-server/audit.ts` വഴി SQLite `mcp_tool_audit` പട്ടികയിൽ ലോഗ് ചെയ്യപ്പെടുന്നു:

- ടൂളിന്റെ പേര്, ആർഗ്യുമെന്റുകൾ (ഓരോ ടൂളിന്റെയും `auditLevel` അനുസരിച്ച് ഹാഷ് ചെയ്തതോ ചുരുക്കിയതോ), ഫലം
- മില്ലിസെക്കൻഡിലുള്ള ദൈർഘ്യം, വിജയം/പരാജയം ഫ്ലാഗ്, പിശക് സന്ദേശം (ബാധകമാകുമ്പോൾ)
- API കീ ഹാഷ്, ടൈംസ്റ്റാമ്പ്
- സ്കോപ്പ് നിരസിക്കലുകൾ, ലഭ്യമല്ലാത്ത സ്കോപ്പുകളുടെ പട്ടികയോടൊപ്പം `scope_denied:<reason>` ആയി ലോഗ് ചെയ്യപ്പെടുന്നു

സമീപകാല കോളുകൾ പരിശോധിക്കാൻ ഡാഷ്ബോർഡോ `/api/mcp/audit`, `/api/mcp/audit/stats` REST എൻഡ്പോയിന്റുകളോ ഉപയോഗിക്കുക.

---

## ഫയലുകൾ

| ഫയൽ                                                                      | ഉദ്ദേശ്യം                                                                                 |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP സെർവർ ഫാക്ടറി, stdio എൻട്രി പോയിന്റ്, സ്കോപ്പ് അടിസ്ഥാനമാക്കിയുള്ള ടൂൾ രജിസ്ട്രേഷനുകൾ |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ട്രാൻസ്പോർട്ട് (സെഷൻ മാനേജ്മെന്റ്)                                  |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | ടൂൾ സ്കോപ്പ് വിലയിരുത്തലും കോളർ നിർണ്ണയവും                                                |
| `open-sse/mcp-server/audit.ts`                                           | ടൂൾ കോൾ ഓഡിറ്റ് ലോഗിങ് (`mcp_tool_audit`)                                                 |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio ഹാർട്ട്ബീറ്റ് റൈറ്റർ (`mcp-heartbeat.json`)                                         |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | ടൂൾ / പ്രോംപ്റ്റ് / റിസോഴ്സ് രജിസ്ട്രികൾക്കായുള്ള വിവരണ കംപ്രഷൻ                           |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod സ്കീമകൾ + ടൂൾ രജിസ്ട്രി (`MCP_TOOLS`, 45 എൻട്രികൾ)                                    |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | ഘട്ടം 2 + കാഷ് + 1proxy ടൂൾ ഹാൻഡ്ലറുകൾ                                                    |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | കംപ്രഷൻ ടൂൾ ഹാൻഡ്ലറുകൾ                                                                    |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | മെമ്മറി ടൂൾ നിർവചനങ്ങൾ (3 ടൂളുകൾ)                                                         |
| `open-sse/mcp-server/tools/skillTools.ts`                                | സ്കിൽ ടൂൾ നിർവചനങ്ങൾ (4 ടൂളുകൾ)                                                           |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion കോൺടെക്സ്റ്റ് സോഴ്സ് ടൂൾ നിർവചനങ്ങൾ (6 ടൂളുകൾ)                                     |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | ഗെയിമിഫിക്കേഷൻ ടൂൾ നിർവചനങ്ങൾ (8 ടൂളുകൾ)                                                  |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | പ്ലഗിൻ രജിസ്ട്രേഷൻ, മാനേജ്മെന്റ് ടൂളുകൾ (8 ടൂളുകൾ)                                        |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` എൻഡ്പോയിന്റ്                                                            |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` എൻഡ്പോയിന്റ്                                                             |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE ട്രാൻസ്പോർട്ട് റൂട്ട്                                                  |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP ട്രാൻസ്പോർട്ട് റൂട്ട്                                   |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` ഓഡിറ്റ് ലോഗ് ക്വറി                                                       |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` സംഗ്രഹിച്ച ഓഡിറ്റ് മെട്രിക്കുകൾ                                    |
| `src/lib/notion/api.ts`                                                  | Notion REST API ക്ലയന്റ് (റീട്രൈ, ടൈംഔട്ട്, പിശക് വർഗ്ഗീകരണം)                             |
| `src/lib/db/notion.ts`                                                   | Notion ടോക്കൺ സ്ഥിരസംഭരണം (`key_value` ടേബിൾ)                                             |
| `src/app/api/settings/notion/route.ts`                                   | Notion ക്രമീകരണ API (GET/POST/DELETE)                                                     |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion ടോക്കൺ മാനേജ്മെന്റ് UI                                                             |
| `tests/unit/notion-api.test.ts`                                          | Notion API ക്ലയന്റ് ടെസ്റ്റുകൾ (7)                                                        |
| `tests/unit/notion-tools.test.ts`                                        | Notion ടൂൾ സ്കോപ്പ് എൻഫോഴ്സ്മെന്റ് ടെസ്റ്റുകൾ (10)                                        |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB മൊഡ്യൂൾ ടെസ്റ്റുകൾ (3)                                                          |
