# OmniRoute MCP Server Documentation (ગુજરાતી)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol સર્વર, જેમાં routing, cache, compression, memory, skills, proxy, pool, Radar અને context source ઑપરેશન્સમાં કુલ 110 ટૂલ્સ છે.
>
> અધિકૃત સ્રોત: `open-sse/mcp-server/server.ts`, `countUniqueMcpTools()` વડે **110 અનન્ય ટૂલ્સ**ની ગણતરી કરે છે: 45 canonical વ્યાખ્યાઓ (જેમાં છ CCR lifecycle ટૂલ્સ, agent-skillsની ત્રિપુટી, `omniroute_radar_catalog` અને `omniroute_x_search`નો સમાવેશ થાય છે), ઉપરાંત memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), local corpus (3) અને માત્ર RTK માટેનાં બે compression ટૂલ્સ.

## ઇન્સ્ટોલેશન

OmniRoute MCP બિલ્ટ-ઇન છે. તેને આ રીતે શરૂ કરો:

```bash
omniroute --mcp
```

અથવા open-sse transport મારફતે:

```bash
# HTTP streamable transport (પોર્ટ 20130)
omniroute --dev  # MCP /mcp endpoint પર આપમેળે શરૂ થાય છે
```

HTTP transports (`sse` / `streamable-http`, જે dashboard સર્વર દ્વારા in-process પૂરા પાડવામાં આવે છે) ડિફૉલ્ટ રૂપે
બંધ હોય છે અને પહેલાં ફક્ત `/dashboard/mcp` પેજ પરથી જ ટૉગલ કરી શકાતા હતા. v3.8.51થી
CLIમાં પણ સમકક્ષ સુવિધા ઉપલબ્ધ છે:

```bash
omniroute mcp status                                  # enabled/online, transport, ટૂલની સંખ્યા
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # સક્રિય sse/streamable-http sessions રીસેટ કરે છે
```

`mcp enable`/`mcp disable`, dashboard `/api/settings` મારફતે જે `mcpEnabled` (અને વૈકલ્પિક રીતે `mcpTransport`) setting
ટૉગલ કરે છે, તે જ settingને PATCH કરે છે. `mcp restart`, `POST /api/mcp/restart`ને કૉલ કરે છે: તે સક્રિય
`sse`/`streamable-http` sessions બંધ કરે છે જેથી આગામી request સ્વચ્છ રીતે ફરી શરૂ થાય, MCP અક્ષમ હોય તો
`409` અને `stdio` transport માટે `501` પરત કરે છે (stdio clients પોતાની subprocess જાતે સંચાલિત કરે છે —
ફરી શરૂ કરવા માટે કોઈ in-process handle નથી).

## Transports

MCP સર્વર ત્રણ transports ઉપલબ્ધ કરાવે છે, જે બધા સમાન `createMcpServer()` factory દ્વારા સમર્થિત છે:

| Transport         | સ્થાન                                       | ક્યારે ઉપયોગ કરવો                                    |
| :---------------- | :------------------------------------------ | :--------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE integrations (Claude Desktop, Cursor વગેરે)      |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | event streamની જરૂર હોય તેવા browser/agent clients   |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | Multi-session HTTP clients (`mcp-session-id` header) |

સક્રિય HTTP transport (`sse` અથવા `streamable-http`)ની પસંદગી `mcpTransport` setting દ્વારા થાય છે. Transports બદલવાથી બીજા transport પરના હાલના sessions બંધ થઈ જાય છે.

### રિમોટ ઍક્સેસ (manage-scope bypass)

`/api/mcp/*`, LOCAL_ONLY tier (`src/server/authz/routeGuard.ts`)માં છે — ડિફૉલ્ટ રૂપે ફક્ત loopback hosts (`localhost`, `127.0.0.1`, `::1`) જ તેને ઍક્સેસ કરી શકે છે. v3.8.2થી, non-loopback clients એવા `Authorization: Bearer <api-key>` સાથે કનેક્ટ થઈ શકે છે જેની key પાસે `manage` scope હોય. tunnel, reverse proxy અથવા public hostname મારફતે remote MCP સર્વરને ઍક્સેસ કરવાનો આ એકમાત્ર માર્ગ છે.

```bash
# manage scope આપો: dashboardનું API Keys પેજ ખોલો અને key પર
# "Management Access" ટૉગલ કરો અથવા બનાવતી વખતે POST scopes:["manage"] મોકલો.

# ત્યારબાદ remote MCP clientમાંથી કનેક્ટ કરો:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` વિનાની key (અથવા Bearer વિનાની request) `403 LOCAL_ONLY` પરત કરે છે. સમકક્ષ prefix `/api/cli-tools/runtime/*`ને ઇરાદાપૂર્વક bypass કરી શકાતું નથી — [Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) જુઓ.

## IDE ગોઠવણી

Claude Desktop, Cursor, Cline અને સુસંગત MCP ક્લાયન્ટના સેટઅપ માટે [MCP ક્લાયન્ટ ગોઠવણી](../guides/SETUP_GUIDE.md#mcp-client-configuration) જુઓ.

---

## આવશ્યક ટૂલ્સ (14) — તબક્કો 1

| ટૂલ                             | સ્કોપ્સ               | વર્ણન                                                                                                                          |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | અપટાઇમ, મેમરી, સર્કિટ બ્રેકર્સ, રેટ મર્યાદાઓ, કૅશના આંકડા                                                                      |
| `omniroute_list_combos`         | `read:combos`         | વ્યૂહરચનાઓ સાથેના તમામ ગોઠવેલા કોમ્બો (વૈકલ્પિક મેટ્રિક્સ)                                                                     |
| `omniroute_get_combo_metrics`   | `read:combos`         | ચોક્કસ કોમ્બો માટેના કાર્યક્ષમતા મેટ્રિક્સ                                                                                     |
| `omniroute_switch_combo`        | `write:combos`        | કોમ્બોને સક્રિય અથવા નિષ્ક્રિય કરો                                                                                             |
| `omniroute_create_combo`        | `write:combos`        | હાલના કોમ્બો API દ્વારા માન્ય કરાયેલ કોમ્બો બનાવો                                                                              |
| `omniroute_check_quota`         | `read:quota`          | વપરાયેલ/કુલ ક્વોટા, બાકી રહેલી ટકાવારી, રીસેટ સમય, ટોકનની સ્થિતિ                                                               |
| `omniroute_route_request`       | `execute:completions` | OmniRoute રાઉટિંગ દ્વારા ચૅટ કમ્પ્લીશન મોકલો                                                                                   |
| `omniroute_cost_report`         | `read:usage`          | સમયગાળા પ્રમાણે ખર્ચનો અહેવાલ (સત્ર/દિવસ/અઠવાડિયું/મહિનો)                                                                      |
| `omniroute_list_models_catalog` | `read:models`         | ક્ષમતાઓ, સ્થિતિ અને કિંમત સાથે સંપૂર્ણ મોડલ કૅટલૉગ                                                                             |
| `omniroute_radar_catalog`       | `read:radar`          | સ્થાનિક રીતે સહી કરાયેલ Radar કૅટલૉગ; વૈકલ્પિક પ્રદાતા/ફૅમિલી ફિલ્ટર્સ                                                         |
| `omniroute_tool_search`         | `read:tools`          | નોંધાયેલ MCP કૅટલૉગમાંથી ટૂલ્સ શોધો                                                                                            |
| `omniroute_web_search`          | `execute:search`      | ગોઠવેલા સર્ચ પ્રદાતાઓ દ્વારા વેબ પર શોધો. X/Twitter પર નહીં.                                                                   |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok દ્વારા X પર શોધો અથવા Xquik API પરિણામો માટે `xquik-search` પસંદ કરો. પસંદ કરેલા બૅકએન્ડ માટે ઓળખપત્રો જરૂરી છે. |
| `omniroute_web_fetch`           | `execute:search`      | ગોઠવેલા ફેચ પ્રદાતાઓ દ્વારા વેબ સામગ્રી મેળવો                                                                                  |

## અદ્યતન સાધનો (11) — તબક્કો 2

| સાધન                               | સ્કોપ્સ                              | વર્ણન                                                                                                    |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | ફૉલબૅક ટ્રી સાથે ડ્રાય-રન રૂટિંગ સિમ્યુલેશન                                                              |
| `omniroute_set_budget_guard`       | `write:budget`                       | ડિગ્રેડ/બ્લૉક/અલર્ટ ક્રિયા સાથે સત્ર બજેટ                                                                |
| `omniroute_set_routing_strategy`   | `write:combos`                       | રનટાઇમ પર કૉમ્બો વ્યૂહરચના અપડેટ કરો (પ્રાથમિકતા/ભારિત/સ્વચાલિત/વગેરે)                                   |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` રેઝિલિયન્સ પ્રીસેટ લાગુ કરો                                   |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | વાસ્તવિક અપસ્ટ્રીમ કૉલનો ઉપયોગ કરીને કૉમ્બોમાંના દરેક પ્રદાતાનું લાઇવ પરીક્ષણ                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 લેટન્સી અને સર્કિટ બ્રેકરની સ્થિતિ સહિત પ્રદાતા-દીઠ મેટ્રિક્સ                                |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | બજેટ/લેટન્સીની મર્યાદાઓ સાથે કાર્યના પ્રકાર અનુસાર કૉમ્બોની ભલામણ કરો                                    |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | વિનંતીને કોઈ પ્રદાતા તરફ શા માટે રૂટ કરવામાં આવી તે સમજાવો (સ્કોરિંગ પરિબળો + ફૉલબૅક્સ)                  |
| `omniroute_get_session_snapshot`   | `read:usage`                         | સંપૂર્ણ સત્ર સ્નૅપશૉટ: ખર્ચ, ટોકન્સ, ટોચનાં મૉડલ્સ/પ્રદાતાઓ, ભૂલો, બજેટ ગાર્ડ                            |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | તૂટેલા કૉમ્બો સંદર્ભો / અનાથ પંક્તિઓ જેવા ડેટાબેઝ ડ્રિફ્ટનું નિદાન (અને વૈકલ્પિક રીતે સ્વતઃ-સમારકામ) કરો |
| `omniroute_sync_pricing`           | `pricing:write`                      | બાહ્ય સ્ત્રોતો (LiteLLM) પરથી કિંમત-નિર્ધારણ ડેટા સિંક કરો; `dryRun`ને સપોર્ટ કરે છે                     |

## કૅશ સાધનો (2)

| સાધન                    | સ્કોપ્સ       | વર્ણન                                                |
| :---------------------- | :------------ | :--------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | સિમેન્ટિક કૅશ, પ્રૉમ્પ્ટ-કૅશ અને આઇડેમ્પોટન્સી આંકડા |
| `omniroute_cache_flush` | `write:cache` | વૈશ્વિક રીતે અથવા સિગ્નેચર/મૉડલ પ્રમાણે કૅશ ફ્લશ કરો |

## કમ્પ્રેશન સાધનો (13)

| સાધન                                | સ્કોપ્સ             | વર્ણન                                                                                                          |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | કમ્પ્રેશન સેટિંગ્સ, એનાલિટિક્સ સારાંશ અને કૅશ-અવેર આંકડા (`analytics.mcpDescriptionCompression` મેટાડેટા સહિત) |
| `omniroute_compression_configure`   | `write:compression` | કમ્પ્રેશન મોડ, થ્રેશોલ્ડ, લક્ષ્ય ગુણોત્તર, સિસ્ટમ-પ્રૉમ્પ્ટ જાળવણી અને MCP વર્ણન કમ્પ્રેશન ટૉગલ ગોઠવો          |
| `omniroute_set_compression_engine`  | `write:compression` | સક્રિય એન્જિન (off/caveman/rtk/stacked) અને Caveman/RTK તીવ્રતા પસંદ કરો                                       |
| `omniroute_list_compression_combos` | `read:compression`  | નામિત કમ્પ્રેશન કૉમ્બો અને તેમની એન્જિન પાઇપલાઇન્સની યાદી આપો                                                  |
| `omniroute_compression_combo_stats` | `read:compression`  | કમ્પ્રેશન કૉમ્બો અને એન્જિન પ્રમાણે જૂથબદ્ધ એનાલિટિક્સ                                                         |
| `omniroute_ccr_store`               | `write:compression` | મર્યાદિત ઇન-મેમરી CCR સ્ટોરમાં કૉલર-આઇસોલેટેડ સામગ્રી સંગ્રહો અને માર્કર તથા `ccr://` સંદર્ભ પરત કરો           |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR સામગ્રી સંપૂર્ણ રીતે અથવા હેડ, ટેઇલ, લાઇન્સ, grep અને આંકડા મોડ્સ સાથે મેળવો                               |
| `omniroute_ccr_inspect`             | `read:compression`  | સામગ્રી પરત કર્યા વિના કૉલરની માલિકીના CCR મેટાડેટાનું નિરીક્ષણ કરો                                            |
| `omniroute_ccr_list`                | `read:compression`  | કૉલરની માલિકીના CCR બ્લૉક્સ માટે પૃષ્ઠાંકિત મેટાડેટાની યાદી આપો                                                |
| `omniroute_ccr_delete`              | `write:compression` | કૉલરની માલિકીનો CCR બ્લૉક કાઢી નાખો                                                                            |
| `omniroute_ccr_stats`               | `read:compression`  | કૉલર-સ્કોપ્ડ મેમરી વપરાશ, જીવનચક્ર કાઉન્ટર્સ અને સ્ટોર મર્યાદાઓનો અહેવાલ આપો                                   |
| `omniroute_rtk_discover`            | `read:compression`  | ઑપ્ટ-ઇન RTK આઉટપુટ નમૂનાઓમાં પુનરાવર્તિત નૉઇઝ શોધો                                                             |
| `omniroute_rtk_learn`               | `read:compression`  | ઑપ્ટ-ઇન નમૂનાઓમાંથી સમીક્ષા કરી શકાય એવો RTK ફિલ્ટર ડ્રાફ્ટ જનરેટ કરો                                          |

CCR એન્ટ્રીઓ ફક્ત ઇન-મેમરી હોય છે અને રીસ્ટાર્ટ થતાં અદૃશ્ય થઈ જાય છે. દરેક બ્લૉક 2 MiB, દરેક
પ્રિન્સિપલ 16 MiB અને વૈશ્વિક સ્ટોર 64 MiB સુધી મર્યાદિત છે. એન્ટ્રીઓ માટે ડિફૉલ્ટ TTL 24 કલાક છે (મહત્તમ
સાત દિવસ). સંપૂર્ણ MCP રિટ્રીવલ 256 KiB સુધી મર્યાદિત છે; મોટા બ્લૉક્સ રેન્જ્ડ અને grep
મોડ્સ દ્વારા ઉપલબ્ધ રહે છે. સંગ્રહ, રિટ્રીવલ, લિસ્ટિંગ, નિરીક્ષણ, ડિલીશન અને આંકડા
પ્રમાણિત API-key પ્રિન્સિપલ પ્રમાણે અલગ રાખવામાં આવે છે. ઑડિટ રેકોર્ડ્સમાં હૅશ અને કદનું મેટાડેટા હોય છે, સામગ્રી ક્યારેય નહીં.

`omniroute_compression_status`, MCP વર્ણન કમ્પ્રેશનનો અહેવાલ
`analytics.mcpDescriptionCompression` હેઠળ અલગથી આપે છે. આ મૂલ્યો MCPમાં સૂચિબદ્ધ કરી શકાય તેવા
વર્ણનો (`tools`, `prompts`, `resources`, અને `resourceTemplates`) માટેના મેટાડેટા-કદના અંદાજો છે; તે પ્રદાતાના ઉપયોગની
રસીદો નથી અને `source: "mcp_metadata_estimate"` વડે ચિહ્નિત કરેલા છે.

### MCP ઍક્સેસિબિલિટી ટ્રી ફિલ્ટર (v3.8.0)

ઉપરનાં કમ્પ્રેશન ટૂલ્સથી અલગ, OmniRouteમાં પોસ્ટ-એક્ઝિક્યુશન ફિલ્ટર શામેલ છે, જે MCP બ્રાઉઝર/ઍક્સેસિબિલિટી ટૂલ્સનાં
**ટૂલ પરિણામો** એજન્ટને પરત કરવામાં આવે તે પહેલાં તેમને કમ્પ્રેસ કરે છે.
આ ફિલ્ટર પોતે ટૂલ નથી — તે વર્બોઝ ઍક્સેસિબિલિટી-ટ્રી અથવા બ્રાઉઝર-સ્નૅપશૉટ ટેક્સ્ટ (≥2000 અક્ષરો) ધરાવતા
કોઈપણ ટૂલ પરિણામ પર પારદર્શક રીતે ચાલે છે.

મુખ્ય વર્તણૂકો:

- સળંગ પુનરાવર્તિત ≥30 સિબ્લિંગ લાઇનોને શરૂઆત + અંતના સારાંશમાં સંકુચિત કરે છે
- Playwright/કમ્પ્યુટર-ઉપયોગ માટે આવશ્યક `[ref=eXX]` ઍન્કર્સને જાળવી રાખે છે
- અતિશય મોટા ટેક્સ્ટને (>50,000 અક્ષરો) નેવિગેશન સંકેત સાથે ફરજિયાત રીતે કાપે છે
- અપેક્ષિત બચત: બ્રાઉઝર સ્નૅપશૉટ પેલોડ્સ પર **60–80%**

રૂપરેખાંકન: વૈશ્વિક સેટિંગ્સમાં `compression.mcpAccessibility` (માઇગ્રેશન 056).
અમલીકરણ: `open-sse/services/compression/engines/mcpAccessibility/`.
સંપૂર્ણ દસ્તાવેજન: [કમ્પ્રેશન એન્જિન્સ — MCP ઍક્સેસિબિલિટી ટ્રી ફિલ્ટર](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

આ ટૂલ્સ પાછળના રનટાઇમ કમ્પ્રેશન મોડેલ માટે [કમ્પ્રેશન એન્જિન્સ](../compression/COMPRESSION_ENGINES.md) અને [RTK કમ્પ્રેશન](../compression/RTK_COMPRESSION.md) જુઓ.

## 1Proxy સાધનો (3)

| સાધન                        | સ્કોપ્સ        | વર્ણન                                                                                  |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy માર્કેટપ્લેસમાંથી મફત પ્રોક્સીઓ મેળવો (પ્રોટોકોલ/દેશ/ગુણવત્તા/મર્યાદા ફિલ્ટર્સ) |
| `omniroute_oneproxy_rotate` | `read:proxies` | વ્યૂહરચના (`random` / `quality` / `sequential`) મુજબ આગામી ઉપલબ્ધ પ્રોક્સી મેળવો       |
| `omniroute_oneproxy_stats`  | `read:proxies` | પૂલના આંકડા, સિંક સ્થિતિ તથા પ્રોટોકોલ અને દેશ મુજબ વિતરણ                              |

## મેમરી સાધનો (3)

`open-sse/mcp-server/tools/memoryTools.ts` માં વ્યાખ્યાયિત છે. પ્રમાણીકરણ/સ્કોપનો અમલ પ્રમાણભૂત MCP સ્કોપ પાઇપલાઇન દ્વારા કરવામાં આવે છે.

| સાધન                      | સ્કોપ્સ        | વર્ણન                                                                                             |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | ટોકન-બજેટના અમલ સાથે ક્વેરી / પ્રકાર / API કી મુજબ મેમરીઓ શોધો                                    |
| `omniroute_memory_add`    | `write:memory` | નવી મેમરી એન્ટ્રી ઉમેરો (`factual` / `episodic` / `procedural` / `semantic`)                      |
| `omniroute_memory_clear`  | `write:memory` | API કી માટેની મેમરીઓ સાફ કરો, વૈકલ્પિક રીતે પ્રકાર અથવા `olderThan` ટાઇમસ્ટૅમ્પ મુજબ ફિલ્ટર કરીને |

## સ્કિલ સાધનો (4)

`open-sse/mcp-server/tools/skillTools.ts` માં વ્યાખ્યાયિત છે. `src/lib/skills/registry` + `src/lib/skills/executor` દ્વારા સમર્થિત છે.

| સાધન                          | સ્કોપ્સ          | વર્ણન                                                                                   |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API કી, નામ અથવા સક્ષમ સ્થિતિ મુજબ વૈકલ્પિક ફિલ્ટરિંગ સાથે નોંધાયેલી સ્કિલ્સની યાદી આપો |
| `omniroute_skills_enable`     | `write:skills`   | ID દ્વારા કોઈ ચોક્કસ સ્કિલને સક્ષમ અથવા અક્ષમ કરો                                       |
| `omniroute_skills_execute`    | `execute:skills` | આપેલા ઇનપુટ સાથે સ્કિલ ચલાવો અને અમલીકરણ રેકોર્ડ પરત કરો                                |
| `omniroute_skills_executions` | `read:skills`    | તાજેતરના સ્કિલ અમલીકરણ ઇતિહાસની યાદી આપો                                                |

## Notion સંદર્ભ સ્રોત (6)

`open-sse/mcp-server/tools/notionTools.ts` માં વ્યાખ્યાયિત છે. ટોકન `src/lib/db/notion.ts` દ્વારા `key_value` કોષ્ટકમાં સંગ્રહિત થાય છે. REST ક્લાયન્ટ `src/lib/notion/api.ts` માં છે. સેટિંગ્સ API `src/app/api/settings/notion/route.ts` માં છે. ડૅશબોર્ડ UI `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` માં છે.

Endpoint ડૅશબોર્ડમાં **સંદર્ભ સ્રોતો** ટૅબમાંથી અથવા REST API મારફતે તમારા Notion ઇન્ટિગ્રેશન ટોકનને ગોઠવો:

```bash
# ટોકન સેટ કરો
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# સ્થિતિ તપાસો
curl http://localhost:20128/api/settings/notion

# જોડાણ તોડો
curl -X DELETE http://localhost:20128/api/settings/notion
```

| સાધન                         | સ્કોપ્સ        | વર્ણન                                                        |
| :--------------------------- | :------------- | :----------------------------------------------------------- |
| `notion_search`              | `read:notion`  | તમામ પૃષ્ઠો અને ડેટાબેઝમાં પૂર્ણ-ટેક્સ્ટ શોધ કરો             |
| `notion_get_page`            | `read:notion`  | કોઈ પૃષ્ઠને તેના ગુણધર્મો સાથે ID દ્વારા મેળવો               |
| `notion_list_block_children` | `read:notion`  | પૃષ્ઠ અથવા બ્લૉકના ચાઇલ્ડ બ્લૉક્સની યાદી આપો                 |
| `notion_query_database`      | `read:notion`  | ફિલ્ટર્સ, સૉર્ટ્સ અને પેજિનેશન સાથે ડેટાબેઝ ક્વેરી કરો       |
| `notion_get_database`        | `read:notion`  | ID દ્વારા ડેટાબેઝ સ્કીમા મેળવો                               |
| `notion_append_blocks`       | `write:notion` | પેરેન્ટ બ્લૉકમાં ચાઇલ્ડ બ્લૉક્સ જોડો (દર વિનંતીએ મહત્તમ 100) |

## એજન્ટ સ્કિલ કેટલોગ ટૂલ્સ (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` માં વ્યાખ્યાયિત. `src/lib/agentSkills/catalog` દ્વારા સમર્થિત. આ ટૂલ્સ MCP ક્લાયન્ટ્સ અને બાહ્ય એજન્ટ્સને 45-એન્ટ્રી ધરાવતો એજન્ટ સ્કિલ્સ દસ્તાવેજીકરણ કેટલોગ ઉપલબ્ધ કરાવે છે. સ્કોપ: `read:catalog`.

| ટૂલ                               | સ્કોપ્સ        | વર્ણન                                                                                                                                 |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog` | વૈકલ્પિક `category` (api\|cli) અને `area` ફિલ્ટર્સ સાથે તમામ 45 એજન્ટ સ્કિલ્સની સૂચિ આપે છે; મેટાડેટા + કવરેજ પરત કરે છે              |
| `omniroute_agent_skills_get`      | `read:catalog` | પ્રામાણિક `id` દ્વારા એક સ્કિલ માટે સંપૂર્ણ મેટાડેટા + SKILL.md સામગ્રી મેળવે છે                                                      |
| `omniroute_agent_skills_coverage` | `read:catalog` | કવરેજ આંકડા: કેટલોગના કુલ આંકડાની સરખામણીમાં 23 API, 21 CLI અને 1 config સ્કિલ્સમાંથી કેટલી સ્કિલ્સની SKILL.md ફાઇલો ફાઇલસિસ્ટમ પર છે |

સંપૂર્ણ કેટલોગ અને બાહ્ય એજન્ટ્સ તેનો ઉપયોગ કેવી રીતે કરે છે તે માટે [AGENT-SKILLS.md](./AGENT-SKILLS.md) જુઓ.

## સંબંધિત ફ્રેમવર્ક્સ (v3.8.0)

ઉપરોક્ત MCP ટૂલ ઇન્વેન્ટરી (110 અનન્ય ટૂલ્સ, `countUniqueMcpTools()` દ્વારા ગણવામાં આવેલ) ઇરાદાપૂર્વક
રનટાઇમ રાઉટિંગ/કૅશ/કમ્પ્રેશન/મેમરી/સ્કિલ્સ/પ્રોક્સી/કૉન્ટેક્સ્ટ-સોર્સ ઑપરેશન્સ સુધી મર્યાદિત છે. v3.8.0 માં MCP સર્વરની
સાથે બે સંલગ્ન ફ્રેમવર્ક્સ પણ આપવામાં આવે છે અને તેમનું દસ્તાવેજીકરણ અલગથી કરેલું છે:

### ક્લાઉડ એજન્ટ્સ

ક્લાઉડ એજન્ટ્સ આઉટ-ઓફ-પ્રોસેસ AI કોડિંગ એજન્ટ્સ (codex-cloud, cursor-cloud, devin, jules) છે, જે
LLM પ્રદાતાઓ માટે વપરાતા સમાન કનેક્શન મોડેલ દ્વારા OmniRoute સાથે જોડાયેલા છે. તેઓ
પોતાના REST સરફેસ (`/api/v1/agents/*`) દ્વારા ઉપલબ્ધ થાય છે અને MCP ટૂલ કેટલોગનો ભાગ **નથી**
— ક્લાઉડ એજન્ટને કૉલ કરવાથી MCP સ્કોપનો ઉપયોગ થતો નથી.

- અમલીકરણ: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- લાઇફસાઇકલ: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- દસ્તાવેજીકરણ: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### ગાર્ડરેલ્સ

ગાર્ડરેલ્સ પૂર્વ/પશ્ચાત્-એક્ઝિક્યુશન ફિલ્ટર્સ (vision-bridge, pii-masker, prompt-injection) છે,
જે ચેટ પાઇપલાઇનની અંદર લાગુ કરવામાં આવે છે. તેઓ MCP ટૂલ/રૂટ લેયર સુધી પહોંચતા પહેલાં ચાલે છે
અને ઑડિટ પાઇપલાઇનમાં સંરચિત ઉલ્લંઘનો ઉત્સર્જિત કરે છે; તેમને MCP ટૂલ્સ તરીકે કૉલ કરવામાં આવતા નથી.

- અમલીકરણ: `src/lib/guardrails/`.
- દસ્તાવેજીકરણ: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

બ્લૉક થયેલો જણાતો MCP કૉલ ડિબગ કરતી વખતે, MCP ઑડિટ લૉગ
(`scope_denied:*` એન્ટ્રીઓ) અને ગાર્ડરેલ્સ ઑડિટ ટ્રેલ બંને તપાસો — કોઈ વિનંતી MCP સ્કોપ અમલીકરણ લેયર સુધી
પહોંચે તે **પહેલાં** જ ગાર્ડરેલ દ્વારા નકારવામાં આવી શકે છે.

---

## REST API એન્ડપોઇન્ટ્સ

| એન્ડપોઇન્ટ             | મેથડ                  | વર્ણન                                                                                                        | ઑથ                      |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------- | :---------------------- |
| `/api/mcp/status`      | `GET`                 | સર્વર સ્થિતિ: હાર્ટબીટ, HTTP ટ્રાન્સપોર્ટ સ્થિતિ, ઑડિટ પ્રવૃત્તિનો સારાંશ                                    | મેનેજમેન્ટ (સેશન/એડમિન) |
| `/api/mcp/tools`       | `GET`                 | ટૂલ કેટલોગ (નામ, વર્ણન, સ્કોપ્સ, ફેઝ, સોર્સ એન્ડપોઇન્ટ્સ)                                                    | મેનેજમેન્ટ              |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ટ્રાન્સપોર્ટ એન્ડપોઇન્ટ (`mcpEnabled` + `mcpTransport === "sse"` દ્વારા નિયંત્રિત)                       | API કી + સ્કોપ્સ        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | સ્ટ્રીમ કરી શકાય તેવું HTTP ટ્રાન્સપોર્ટ (`mcp-session-id` હેડરનો ઉપયોગ કરે છે; `DELETE` સેશન સમાપ્ત કરે છે) | API કી + સ્કોપ્સ        |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` માંથી ઑડિટ લૉગ એન્ટ્રીઓ (ફિલ્ટર્સ: `limit`, `offset`, `tool`, `success`, `apiKeyId`)        | મેનેજમેન્ટ              |
| `/api/mcp/audit/stats` | `GET`                 | એકત્રિત ઑડિટ આંકડા (`totalCalls`, `successRate`, `avgDurationMs`, ટોચનાં ટૂલ્સ)                              | મેનેજમેન્ટ              |

સોર્સ ફાઇલો: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

સેટિંગ્સમાં MCP સર્વર સક્ષમ (`mcpEnabled`) કરવામાં ન આવે અને યોગ્ય `mcpTransport` પસંદ કરવામાં ન આવે ત્યાં સુધી SSE અને સ્ટ્રીમ કરી શકાય તેવા HTTP ટ્રાન્સપોર્ટ્સ બંને બ્લૉક રહે છે. જો ખોટું ટ્રાન્સપોર્ટ કૉન્ફિગર કરેલું હોય, તો રૂટ સેટિંગ્સ બદલવાની સૂચના સાથે HTTP 400 પરત કરે છે.

---

## ઓથેન્ટિકેશન અને સ્કોપ્સ

MCP ટૂલ કોલર પાસેથી સ્કોપ સ્ટ્રિંગ્સ વાંચે છે. તે તપાસ ત્રણ સ્વતંત્ર નેમસ્પેસમાંથી એક છે. એક ચેકરમાંથી પાસ થવું એ અન્યમાંથી પાસ થવું નથી. નિયમો [ત્રણ સ્કોપ નેમસ્પેસ](#three-scope-namespaces) છે. ટૂલ કેટલોગ [MCP ટૂલ સ્કોપ્સ](#mcp-tool-scopes) છે.

### ત્રણ સ્કોપ નેમસ્પેસ

API કી પર `manage`, MCP ટૂલ પર `read:compression`, અને `oma_live_…` એક્સેસ ટોકન પર `read` એ ત્રણ અલગ-અલગ ગ્રાન્ટ્સ છે. જે કોલર્સ મ્યુટેટિંગ મેનેજમેન્ટ રૂટ પર `read` એક્સેસ ટોકન મોકલે છે તેમને HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` મળે છે. તે રેન્ક `scopeSatisfies` છે. તે MCP ટેબલનો સંપર્ક કરતું નથી, અને MCP મેચર તેનો સંપર્ક કરતું નથી.

| નેમસ્પેસ          | ક્રેડેન્શિયલ                                                | ચેકર                | પાસ થવાથી પરવાનગી મળે છે                              |
| :---------------- | :---------------------------------------------------------- | :------------------ | :---------------------------------------------------- |
| API-કી મેનેજમેન્ટ | `api_keys.scopes`                                           | `hasManageScope`    | તે બેરર કી માટે મેનેજમેન્ટ REST                       |
| API-કી એડિટિવ     | સમાન એરે, એક ચોક્કસ સ્ટ્રિંગ                                | નીચે નામવાળી હેલ્પર | ફક્ત તે એક ક્ષમતા                                     |
| MCP ટૂલ સ્કોપ્સ   | સમાન એરે, અન્યથા MCP `_meta`, અન્યથા `OMNIROUTE_MCP_SCOPES` | `scopeMatches`      | તે ટૂલ, એકવાર અમલ ચાલુ થાય                            |
| એક્સેસ ટોકન       | `oma_live_…`                                                | `scopeSatisfies`    | મેનેજમેન્ટ રૂટ જેની મેથડ અને પાથને તે રેન્કની જરૂર છે |

દરેક ક્રેડેન્શિયલ બનાવવું [મેનેજમેન્ટ ઓથેન્ટિકેશન](../guides/MANAGEMENT-AUTH.md) માં આવરી લેવામાં આવ્યું છે.

#### API-કી સ્કોપ્સ

એક `api_keys.scopes` એરે બે કાર્યોને ફીડ કરે છે. તેઓ વિવિધ કાર્યોનો ઉપયોગ કરે છે.

**મેનેજમેન્ટ REST.** `manage` અને `admin` એ `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) ના સભ્યો છે. `hasManageScope` તે કી માટે મેનેજમેન્ટ રૂટ્સને અધિકૃત કરે છે. `admin` તે રૂટ્સ પર મેનેજમેન્ટ-સક્ષમ છે. અહીં `admin` શબ્દ એક્સેસ-ટોકન રેન્ક નથી અને તે MCP ટૂલ સ્કોપ્સમાં વિસ્તરતો નથી.

**એડિટિવ સ્ટ્રિંગ્સ.** દરેક એક ચોક્કસ સભ્યપદ પરીક્ષણ છે, અને દરેક `MANAGEMENT_API_KEY_SCOPES` ની બહાર રહે છે.

| સ્કોપ                          | પાસ થવાથી પરવાનગી મળે છે                                                                                                                                        |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | નોન-લૂપબેક `/api/mcp/` LOCAL_ONLY કાર્વ-આઉટ ફક્ત (`hasMcpConnectOrManageScope`). `manage` અથવા `admin` સાથેની કી હજુ પણ તે કાર્વ-આઉટને પાસ કરે છે.              |
| `self:usage`                   | આ કી માટે `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` બનાવતી વખતે આ સ્કોપ ઉમેરે છે (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | તે સ્ટેટસ પેલોડની અંદર અપસ્ટ્રીમ એકાઉન્ટ ક્વોટા (`src/lib/usage/apiKeySelfService.ts`). સ્ટેટસ રૂટને હજુ પણ `self:usage` ની જરૂર છે.                            |
| `policy:bypass-provider-quota` | આ કીના અનુમાન કોલ્સ પ્રદાતા-ક્વોટા નીતિને છોડી દે છે (`src/sse/handlers/chat.ts` માં `hasProviderQuotaBypassScope`).                                            |

#### મેચિંગ

કેટલોગ [MCP ટૂલ સ્કોપ્સ](#mcp-tool-scopes) હેઠળનું ટેબલ છે. `src/shared/constants/mcpScopes.ts` માં `MCP_SCOPE_LIST` ને તે કેટલોગ તરીકે ગણશો નહીં: તે મૂળ ટાઇપ કરેલ સબસેટ છે. પછીના ટૂલ્સ તેની બાજુમાં વધુ સ્કોપ્સ જાહેર કરે છે (`read:notion`, `read:skills`, `read:local-corpus`, અને બાકીનું ટેબલ).

`open-sse/mcp-server/scopeEnforcement.ts` માં `evaluateToolScopes` કોલને ત્યારે મંજૂરી આપે છે જ્યારે દરેક જરૂરી સ્કોપ કેટલાક ગ્રાન્ટેડ સ્કોપ સાથે મેળ ખાય છે:

- `*` દરેક જરૂરી સ્કોપ સાથે મેળ ખાય છે.
- `*` માં સમાપ્ત થતો ગ્રાન્ટેડ સ્કોપ એવા જરૂરી સ્કોપ સાથે મેળ ખાય છે જે સ્ટાર પહેલાના પ્રીફિક્સથી શરૂ થાય છે. `read:*` `read:compression` સાથે મેળ ખાય છે.
- દરેક અન્ય ગ્રાન્ટેડ સ્કોપ ફક્ત સમાન જરૂરી સ્ટ્રિંગ સાથે મેળ ખાય છે.

જે કીના સ્કોપ્સ `["manage"]` છે તે `read:compression` માટે `scopeMatches` માં નિષ્ફળ જાય છે. જ્યારે તે એકમાત્ર ગ્રાન્ટેડ સ્ટ્રિંગ્સ હોય ત્યારે `admin`, `mcp:connect`, `read`, અને `write` માટે પણ તે જ કોલ નિષ્ફળ જાય છે. ટ્રેઇલિંગ `*` સિવાય MCP ટૂલ સ્કોપ્સ વચ્ચે કોઈ વંશવેલો નથી.

અમલ બંધ છે સિવાય કે `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (ડિફોલ્ટ `false`). જ્યારે તે બંધ હોય, ત્યારે `evaluateToolScopes` કોલને મંજૂરી આપે છે અને કેટલોગને છોડી દે છે. જ્યારે તે ચાલુ હોય, ત્યારે HTTP બેરર કીના `api_keys.scopes` નો `authInfo` તરીકે ઉપયોગ કરે છે (જુઓ [પ્રતિ-કી HTTP સ્કોપ બાઈન્ડિંગ](#per-key-http-scope-binding-7895)). જ્યારે કોઈ કી સ્કોપ્સ રિઝોલ્વ ન થાય, ત્યારે ગ્રાન્ટેડ સેટ MCP `_meta` માં, પછી `OMNIROUTE_MCP_SCOPES` માં આવે છે.

#### એક્સેસ-ટોકન સ્કોપ્સ

`oma_live_…` ટોકન્સ (`src/lib/accessTokens/scopes.ts`) `read`, `write`, અથવા `admin` ધરાવે છે. `scopeSatisfies` એ એક રેન્ક છે: `admin` `write` અને `read` ને આવરી લે છે, અને `write` `read` ને આવરી લે છે. અજાણ્યા સ્કોપ્સ કંઈપણ આવરી લેતા નથી.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) તે રેન્કની `inferRequiredScope` (`src/server/authz/accessScopes.ts`) સાથે સરખામણી કરે છે:

- `GET`, `HEAD`, અને `OPTIONS` ને `read` ની જરૂર છે.
- દરેક અન્ય મેથડને `write` ની જરૂર છે.
- `ADMIN_SCOPE_PREFIXES` માંના પાથને દરેક મેથડ માટે `admin` ની જરૂર છે. `/api/mcp` તે સૂચિમાં છે, તેથી `write` એક્સેસ ટોકન હજુ પણ MCP HTTP સપાટીને કોલ કરી શકતું નથી.
- `ADMIN_MUTATION_PREFIXES` માંના પાથને ફક્ત મ્યુટેશન્સ માટે `admin` ની જરૂર છે.

`PATCH /api/keys/{id}` એ એક મ્યુટેશન છે અને તે એડમિન સૂચિઓમાં નથી, તેથી `read` ટોકનને 403 મળે છે
`Access token scope 'read' is insufficient; 'write' required.`
એક `write` અથવા `admin` એક્સેસ ટોકન તે રૂટને સંતોષે છે. એક ડેશબોર્ડ JWT, લૂપબેક CLI મશીન-આઈડી ટોકન, અને `manage` અથવા `admin` સાથેની API કી અન્ય શાખાઓ લે છે અને આ રેન્ક દ્વારા સંકુચિત થતી નથી.

એક એક્સેસ ટોકન જે `/api/mcp` માટે `scopeSatisfies` પાસ કરે છે, તેણે ફક્ત મેનેજમેન્ટ ગેટ ક્લિયર કર્યો છે. ટૂલ કોલ્સ હજુ પણ API-કી સ્કોપ્સ સામે `scopeMatches` ચલાવે છે. એક્સેસ-ટોકન રેન્ક `scopeMatches` માટે ઇનપુટ નથી.

### MCP ટૂલ સ્કોપ્સ

સ્કોપ અમલીકરણ `open-sse/mcp-server/scopeEnforcement.ts` માં કેન્દ્રિત છે.
દરેક ટૂલને ચોક્કસ સ્કોપ્સની જરૂર પડે છે:

| સ્કોપ                 | ટૂલ્સ                                                                                                                                                                       |
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
| `read:obsidian`       | 13 રીડ ટૂલ્સ — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 રાઇટ ટૂલ્સ — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                           |

વાઇલ્ડકાર્ડ સ્કોપ્સ સપોર્ટેડ છે: `read:*` બધા રીડ-સ્કોપ્સ આપે છે, `*` સંપૂર્ણ ઍક્સેસ આપે છે.

### `mcp:connect` — નેરો રૂટ ક્ષમતા (#7895)

નોન-લૂપબેકથી HTTP/SSE MCP ટ્રાન્સપોર્ટ (`/api/mcp/*`) સુધી પહોંચવા માટે `/api/mcp/` LOCAL_ONLY કાર્વ-આઉટની જરૂર પડે છે (જુઓ `docs/security/ROUTE_GUARD_TIERS.md`). ઐતિહાસિક રીતે, તે કાર્વ-આઉટ ફક્ત સંપૂર્ણ `manage`/`admin`-સ્કોપ API કી સ્વીકારતું હતું — જે ફક્ત MCP સાથે વાત કરવાની જરૂર હોય તેવા કૉલર માટે ખૂબ વ્યાપક હતું. `src/shared/constants/managementScopes.ts` હવે `MCP_CONNECT_SCOPE = "mcp:connect"` નિકાસ કરે છે: એક એડિટિવ, નેરો સ્કોપ (`SELF_USAGE_SCOPE` જેવો જ દાખલો) જે `src/server/authz/policies/management.ts` માં ફક્ત `/api/mcp/` બાયપાસને અધિકૃત કરે છે — તે અન્ય કોઈ મેનેજમેન્ટ-રૂટ ઍક્સેસ આપતું નથી અને તેને ઇરાદાપૂર્વક `MANAGEMENT_API_KEY_SCOPES` માંથી બહાર રાખવામાં આવ્યું છે. `manage`/`admin` ધરાવતી કી હજુ પણ કાર્વ-આઉટને યથાવત પસાર કરે છે; `mcp:connect` એ રિમોટ MCP-માત્ર કૉલર્સ માટે ઓછી-વિશેષાધિકારવાળો વિકલ્પ છે, જે `hasMcpConnectOrManageScope()` દ્વારા તપાસવામાં આવે છે.

### પ્રતિ-કી HTTP સ્કોપ બાઇન્ડિંગ (#7895)

HTTP/SSE પર, `open-sse/mcp-server/httpTransport.ts` હવે કૉલરના વાસ્તવિક `api_keys.scopes` ને `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) દ્વારા રિઝોલ્વ કરે છે અને તેને MCP SDK ના `transport.handleRequest(req, { authInfo })` માં પસાર કરે છે, જેથી દરેક ટૂલ કૉલ સુધી પહોંચતા `extra.authInfo.scopes` બેરર કીના પોતાના સ્કોપ્સને પ્રતિબિંબિત કરે છે. `scopeEnforcement.ts` નું `resolveCallerScopeContext()` પહેલેથી જ `_meta` અને `OMNIROUTE_MCP_SCOPES` env ફૉલબેક પર `authInfo` ને પ્રાધાન્ય આપતું હતું — આ ફક્ત તે પ્રથમ, ઉચ્ચતમ-પ્રાધાન્યતા સ્ત્રોતને પોપ્યુલેટ કરે છે, જે અગાઉ HTTP પર અનફેડ હતું. જ્યારે કોઈ API કી રિઝોલ્વ થતી નથી (કોઈ હેડર નથી, અમાન્ય કી), ત્યારે `authInfo` `undefined` રહે છે અને રિઝોલ્યુશન હાલની `meta`/env ચેઇન પર યથાવત રહે છે. આ `OMNIROUTE_MCP_ENFORCE_SCOPES` ના ડિફોલ્ટને બદલતું નથી — અમલીકરણ હજુ પણ સ્પષ્ટપણે સક્ષમ કરવું પડશે; આ ફેરફાર ફક્ત પ્રતિ-કી પાથને એકવાર તે સક્ષમ થાય પછી પ્રાધાન્ય આપે છે. stdio પાસે કોઈ પ્રતિ-કૉલર ઓળખ નથી (જુઓ `mcpCallerIdentity.ts`) અને તે અપ્રભાવિત રહે છે — તે `_meta`/env ફૉલબેક ચેઇન પર રહે છે.

---

## એન્વાયર્નમેન્ટ વેરિએબલ્સ

| વેરિએબલ                                 | ડિફૉલ્ટ                                    | હેતુ                                                                                                                 |
| :-------------------------------------- | :----------------------------------------- | :------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                   | આંતરિક OmniRoute APIને કૉલ કરતી વખતે MCP સર્વર જે બેઝ URLનો ઉપયોગ કરે છે                                             |
| `OMNIROUTE_API_KEY`                     | (ખાલી)                                     | આંતરિક API કૉલ્સને `Authorization: Bearer` તરીકે ફૉર્વર્ડ કરવામાં આવતી API કી                                        |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (માત્ર `"true"` તેને સક્ષમ કરે છે) | સક્ષમ હોય ત્યારે, ખૂટતા સ્કોપ ટૂલ કૉલ્સને નકારે છે અને ઑડિટ લૉગમાં `scope_denied:<reason>` નોંધે છે                  |
| `OMNIROUTE_MCP_SCOPES`                  | (ખાલી)                                     | ડિફૉલ્ટ રૂપે "ઉપલબ્ધ" ગણાતા સ્કોપની કૉમા-વિભાજિત અનુમતિ-સૂચિ (જ્યારે કૉલર પોતાના સ્કોપ પ્રદાન ન કરે ત્યારે વપરાય છે) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (સેટ ન હોય = ચાલુ)                         | `0/false/off/no` પર સેટ કરવામાં આવે ત્યારે, નોંધણી સમયે MCP વર્ણન કમ્પ્રેશનને અક્ષમ કરે છે                           |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (સેટ ન હોય = ચાલુ)                         | ઉપરના સમાન ટૉગલ માટે વૈકલ્પિક ઉપનામ                                                                                  |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                    | આંતરિક મેનેજમેન્ટ રીડ્સ (હેલ્થ, રેઝિલિયન્સ, કૉમ્બોઝ, ક્વોટા, વપરાશ) માટેની અબૉર્ટ સમય-મર્યાદા                        |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                    | પ્રદાતાની રાહ જોતા હૉપ્સ (`route_request`, `web_search`, `web_fetch`) માટેની અબૉર્ટ સમય-મર્યાદા                      |
| `MCP_TOOL_DENY`                         | (સેટ ન હોય = કોઈ ફિલ્ટર નહીં)              | `tools/list`માંથી દૂર કરવા માટેનાં કૉમા-વિભાજિત ટૂલ નામો (ટૂલ-કાર્ડિનાલિટી ઘટાડો — નીચે જુઓ)                         |
| `MCP_TOOL_ALLOW`                        | (સેટ ન હોય = કોઈ ફિલ્ટર નહીં)              | માત્ર જાળવી રાખવા માટેનાં કૉમા-વિભાજિત ટૂલ નામો (અનુમતિ-સૂચિ મોડ — નીચે જુઓ)                                         |
| `DATA_DIR`                              | `~/.omniroute`                             | હાર્ટબીટ ફાઇલ `${DATA_DIR}/runtime/mcp-heartbeat.json` પર લખવામાં આવે છે                                             |

---

## વર્ણન કમ્પ્રેશન

MCP ટૂલ, પ્રૉમ્પ્ટ અને રિસોર્સ રજિસ્ટ્રીઓ ક્લાયન્ટ્સ સમક્ષ રજૂ થતું મેટાડેટાનું કદ (અને તેથી પ્રૉમ્પ્ટ કૉન્ટેક્સ્ટનો ખર્ચ) ઘટાડવા માટે નોંધણી/સૂચીકરણ સમયે વર્ણનોને કમ્પ્રેસ કરી શકે છે. તેનો અમલ `open-sse/mcp-server/descriptionCompressor.ts`માં છે અને `createMcpServer()`ની અંદર `compressMcpRegistryMetadata` મારફતે MCP સર્વર સાથે જોડાયેલો છે.

- કમ્પ્રેશન, સંરક્ષિત-બ્લૉક નિષ્કર્ષણ (કોડ સ્પૅન, ફેન્સ્ડ બ્લૉક વગેરે) સાથે Caveman નિયમસમૂહ (`getRulesForContext("all", "full")`)નો ઉપયોગ કરીને વર્ણન ટેક્સ્ટ પર ચાલે છે, જેથી માળખાકીય સામગ્રી બદલાય નહીં.
- `key_value` સેટિંગ્સ ટેબલમાંના `compression.mcpDescriptionCompressionEnabled` મૂલ્ય દ્વારા દરેક ડિપ્લૉયમેન્ટ માટે ટૉગલ કરો (ડિફૉલ્ટ: સક્ષમ) — UIમાં **Analytics → MCP description compression** તરીકે ઉપલબ્ધ છે.
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` અથવા `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` પૈકી કોઈ એક દ્વારા સમગ્ર પ્રોસેસ માટે ટૉગલ કરો.
- રિયલટાઇમ આંકડા `analytics.mcpDescriptionCompression` હેઠળ `omniroute_compression_status` મારફતે દર્શાવવામાં આવે છે અને વાસ્તવિક પ્રદાતા વપરાશ રસીદોથી અલગ પાડવા માટે તેમને `source: "mcp_metadata_estimate"` ટૅગ આપવામાં આવે છે.

---

## ટૂલ કાર્ડિનાલિટી ઘટાડો (F4.3)

વર્ણન સંકોચન દરેક ટૂલના મેટાડેટાનું કદ ઘટાડે છે; **ટૂલ-કાર્ડિનાલિટી ઘટાડો** તેનાથી એક પગલું આગળ જઈને જાહેર કરવામાં આવતા ટૂલની _સંખ્યા_ ઘટાડે છે. `tools/list` મેનિફેસ્ટમાં ઓછા ટૂલ દર્શાવવાથી ટૂલ કૅટલૉગ માટે ક્લાયન્ટના મોડલને ચૂકવવો પડતો પ્રતિ-વિનંતી ટોકન ખર્ચ ("લેયર 5" સંકોચન) ઘટે છે. અમલીકરણ `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`)માં એક શુદ્ધ, સ્ટેટલેસ ફિલ્ટર છે, જેને `createMcpServer()` (`open-sse/mcp-server/server.ts`)ની નોંધણી લૂપમાં જોડવામાં આવ્યું છે.

**ઑપ્ટ-ઇન, ડિફૉલ્ટ રૂપે બંધ.** બેમાંથી ઓછામાં ઓછો એક એન્વાયર્નમેન્ટ વેરિએબલ સેટ હોય ત્યારે જ ફિલ્ટર ચાલે છે; એક પણ સેટ ન હોય ત્યારે તમામ 110 ટૂલ કોઈ ફેરફાર વિના જાહેર થાય છે.

| વેરિએબલ          | મોડ                                                                                             |
| :--------------- | :---------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | બ્લૅકલિસ્ટ — અલ્પવિરામથી અલગ કરેલાં ટૂલ નામો, જે હંમેશાં `tools/list`માંથી દૂર કરવામાં આવે છે   |
| `MCP_TOOL_ALLOW` | અલાઉ-લિસ્ટ — અલ્પવિરામથી અલગ કરેલાં ટૂલ નામો; માત્ર આ જ રહે છે, બાકીનાં બધાં દૂર કરવામાં આવે છે |

`deny`, `allow` કરતાં પ્રાથમિકતા ધરાવે છે. નામો અલ્પવિરામથી અલગ કરવામાં આવે છે, તેમની આસપાસની ખાલી જગ્યા દૂર કરવામાં આવે છે અને ખાલી એન્ટ્રીઓને અવગણવામાં આવે છે. ઉદાહરણો:

```bash
# કૅટલૉગમાંથી બે ટૂલ દૂર કરો
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# ફક્ત રૂટિંગ + ક્વોટા ટૂલ જાહેર કરો (અલાઉ-લિસ્ટ મોડ)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**ફિલ્ટર કરેલા ટૂલ કેવી રીતે દૂર થાય છે:** નોંધણી હંમેશાં સફળ થાય છે; પ્રોફાઇલ દ્વારા નકારવામાં આવેલ ટૂલને પછી MCP SDK હૅન્ડલ પર `.disable()` કરવામાં આવે છે, તેથી તે `tools/list`માં ક્યારેય દેખાતું નથી, પરંતુ વાયરિંગ અકબંધ રહે છે (સ્વચ્છ enable/disable, ફરી નોંધણી નહીં). પ્રોફાઇલ પાર્સર `readMcpToolProfileFromEnv(process.env)` છે, જે બંને વેરિએબલ ખાલી હોય ત્યારે `null` (કોઈ ફિલ્ટરિંગ નહીં) પરત કરે છે.

`reduceToolManifest` પાછળનું વધુ સમૃદ્ધ `ToolProfile` સ્વરૂપ સ્કોપ-ઇન્ટરસેક્શન ફિલ્ટરિંગ (`allowScopes`, `read:*`-શૈલીના વાઇલ્ડકાર્ડ મેળાપ સાથે) અને નિર્ધારિત `maxTools` મર્યાદાને પણ સપોર્ટ કરે છે, પરંતુ આ બંને નિયંત્રણો માટે નોંધણી સમયે સંપૂર્ણ મેનિફેસ્ટ જરૂરી છે અને હાલમાં એન્વાયર્નમેન્ટ વેરિએબલ દ્વારા **ઉપલબ્ધ કરાવવામાં આવ્યાં નથી** (`tools/list`-સ્તરનો હૂક ટ્રૅક કરાયેલ અનુવર્તી કાર્ય છે). ઘટાડા પહેલાં અને પછીના મેનિફેસ્ટ ટોકન ખર્ચની સરખામણી કરવા માટે `estimateManifestTokens()` ઉપલબ્ધ છે.

---

## રનટાઇમ હાર્ટબીટ

stdio ટ્રાન્સપોર્ટ દર 5 સેકન્ડે લાઇવનેસને `${DATA_DIR}/runtime/mcp-heartbeat.json`માં સંગ્રહિત કરે છે. ડૅશબોર્ડ (`/api/mcp/status`) `online` સ્થિતિ નક્કી કરવા માટે આ ફાઇલ અને PID લાઇવનેસ વાંચે છે. તેના બદલે HTTP ટ્રાન્સપોર્ટ ઇન-પ્રોસેસ `getMcpHttpStatus()`માંથી સ્થિતિ રિપોર્ટ કરે છે (ફાઇલમાં લખાણ થતું નથી).

હાર્ટબીટ સ્નૅપશૉટમાં આ સામેલ છે:

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

## ઑડિટ લૉગિંગ

દરેક ટૂલ કૉલને `open-sse/mcp-server/audit.ts` દ્વારા SQLiteના `mcp_tool_audit` ટેબલમાં લૉગ કરવામાં આવે છે:

- ટૂલનું નામ, આર્ગ્યુમેન્ટ્સ (પ્રતિ-ટૂલ `auditLevel` અનુસાર હૅશ કરેલાં/ટૂંકાવેલાં), પરિણામ
- મિલિસેકન્ડમાં અવધિ, સફળતા/નિષ્ફળતાનો ફ્લૅગ, ભૂલ સંદેશ (લાગુ પડતો હોય ત્યારે)
- API કી હૅશ, ટાઇમસ્ટૅમ્પ
- સ્કોપ અસ્વીકારો ગુમ થયેલા સ્કોપની સૂચિ સાથે `scope_denied:<reason>` તરીકે લૉગ કરવામાં આવે છે

તાજેતરના કૉલ તપાસવા માટે ડૅશબોર્ડ અથવા `/api/mcp/audit` અને `/api/mcp/audit/stats` REST એન્ડપોઇન્ટનો ઉપયોગ કરો.

---

## ફાઇલો

| ફાઇલ                                                                     | હેતુ                                                             |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP સર્વર ફેક્ટરી, stdio એન્ટ્રી પૉઇન્ટ, સ્કોપ કરેલી ટૂલ નોંધણીઓ |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ટ્રાન્સપોર્ટ (સત્ર વ્યવસ્થાપન)             |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | ટૂલ સ્કોપ મૂલ્યાંકન અને કૉલર નિર્ધારણ                            |
| `open-sse/mcp-server/audit.ts`                                           | ટૂલ કૉલ ઑડિટ લૉગિંગ (`mcp_tool_audit`)                           |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio હાર્ટબીટ રાઇટર (`mcp-heartbeat.json`)                      |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | ટૂલ / પ્રોમ્પ્ટ / રિસોર્સ રજિસ્ટ્રીઓ માટે વર્ણન કમ્પ્રેશન        |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod સ્કીમા + ટૂલ રજિસ્ટ્રી (`MCP_TOOLS`, 45 એન્ટ્રીઓ)            |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | તબક્કો 2 + કૅશ + 1proxy ટૂલ હૅન્ડલર્સ                            |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | કમ્પ્રેશન ટૂલ હૅન્ડલર્સ                                          |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | મેમરી ટૂલ વ્યાખ્યાઓ (3 ટૂલ્સ)                                    |
| `open-sse/mcp-server/tools/skillTools.ts`                                | કૌશલ્ય ટૂલ વ્યાખ્યાઓ (4 ટૂલ્સ)                                   |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion સંદર્ભ સ્ત્રોત ટૂલ વ્યાખ્યાઓ (6 ટૂલ્સ)                    |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | ગેમિફિકેશન ટૂલ વ્યાખ્યાઓ (8 ટૂલ્સ)                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | પ્લગઇન નોંધણી અને વ્યવસ્થાપન ટૂલ્સ (8 ટૂલ્સ)                     |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` એન્ડપૉઇન્ટ                                     |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` એન્ડપૉઇન્ટ                                      |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE ટ્રાન્સપોર્ટ રૂટ                              |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP ટ્રાન્સપોર્ટ રૂટ               |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` ઑડિટ લૉગ ક્વેરી                                 |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` એકત્રિત ઑડિટ મેટ્રિક્સ                    |
| `src/lib/notion/api.ts`                                                  | Notion REST API ક્લાયન્ટ (પુનઃપ્રયાસ, સમયમર્યાદા, ભૂલ વર્ગીકરણ)  |
| `src/lib/db/notion.ts`                                                   | Notion ટોકન સ્થાયીકરણ (`key_value` ટેબલ)                         |
| `src/app/api/settings/notion/route.ts`                                   | Notion સેટિંગ્સ API (GET/POST/DELETE)                            |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion ટોકન વ્યવસ્થાપન UI                                        |
| `tests/unit/notion-api.test.ts`                                          | Notion API ક્લાયન્ટ પરીક્ષણો (7)                                 |
| `tests/unit/notion-tools.test.ts`                                        | Notion ટૂલ્સ સ્કોપ અમલીકરણ પરીક્ષણો (10)                         |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB મોડ્યુલ પરીક્ષણો (3)                                   |
