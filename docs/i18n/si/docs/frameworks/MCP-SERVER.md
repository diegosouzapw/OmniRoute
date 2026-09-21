# OmniRoute MCP Server Documentation (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> මාර්ගගත කිරීම, හැඹිලිය, සම්පීඩනය, මතකය, කුසලතා, ප්රොක්සි, සංචිතය, Radar සහ සන්දර්භ මූලාශ්ර මෙහෙයුම් හරහා මෙවලම් 110ක් සහිත Model Context Protocol සේවාදායකයකි.
>
> සත්යයේ මූලාශ්රය: `open-sse/mcp-server/server.ts` මඟින් `countUniqueMcpTools()` භාවිතයෙන් **අනන්ය මෙවලම් 110ක්** ගණනය කරයි: සම්මත අර්ථදැක්වීම් 45ක් (CCR ජීවන චක්ර මෙවලම් හය, agent-skills ත්රිත්වය, `omniroute_radar_catalog`, සහ `omniroute_x_search` ඇතුළුව), එයට අමතරව මතකය (3), කුසලතා (4), GitHub කුසලතා (3), සංචිතය (6), ක්රීඩාකරණය (8), ප්ලගීන (8), Notion (6), Obsidian (22), දේශීය කෝපස් එකතුව (3), සහ RTK සඳහා පමණක් වන සම්පීඩන මෙවලම් දෙකක් ඇතුළත් වේ.

## ස්ථාපනය

OmniRoute MCP අන්තර්ගතව ඇත. පහත විධානයෙන් එය ආරම්භ කරන්න:

```bash
omniroute --mcp
```

නැතහොත් open-sse ප්රවාහනය හරහා:

```bash
# HTTP ප්රවාහ කළ හැකි ප්රවාහනය (port 20130)
omniroute --dev  # MCP /mcp endpoint මත ස්වයංක්රීයව ආරම්භ වේ
```

HTTP ප්රවාහන (`sse` / `streamable-http`, dashboard server මඟින් එම process එක තුළම සපයනු ලැබේ)
පෙරනිමියෙන් අක්රිය වන අතර, පෙර ඒවා සක්රිය හෝ අක්රිය කළ හැකි වූයේ `/dashboard/mcp` පිටුවෙන් පමණි. v3.8.51 සිට
CLI වෙතද සමාන හැකියාවන් ඇත:

```bash
omniroute mcp status                                  # සක්රිය/මාර්ගගත තත්ත්වය, ප්රවාහනය, මෙවලම් ගණන
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # සක්රිය sse/streamable-http සැසි යළි සකසයි
```

`mcp enable`/`mcp disable`, dashboard එක `/api/settings` හරහා මාරු කරන එම `mcpEnabled`
(සහ විකල්ප වශයෙන් `mcpTransport`) සැකසුමටම PATCH ඉල්ලීමක් යවයි. `mcp restart`, `POST /api/mcp/restart`
අමතයි: එය සක්රිය `sse`/`streamable-http` සැසි අවසන් කරන අතර, එමඟින් ඊළඟ ඉල්ලීම පිරිසිදුව යළි ආරම්භ වේ;
MCP අක්රිය නම් `409` ද, `stdio` ප්රවාහනය සඳහා `501` ද ආපසු ලබා දෙයි (stdio clients තමන්ගේම
subprocess පාලනය කරයි — යළි ආරම්භ කිරීම සඳහා එම process එක තුළ handle එකක් නොමැත).

## ප්රවාහන

MCP සේවාදායකය ප්රවාහන තුනක් නිරාවරණය කරන අතර, ඒ සියල්ල එකම `createMcpServer()` කර්මාන්තශාලාව මඟින් සහාය දක්වයි:

| ප්රවාහනය          | පිහිටීම                                      | භාවිත කළ යුතු අවස්ථාව                               |
| :---------------- | :------------------------------------------- | :-------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | IDE ඒකාබද්ධ කිරීම් (Claude Desktop, Cursor, ආදිය)   |
| `sse`             | `httpTransport` හරහා `POST/GET /api/mcp/sse` | සිදුවීම් ප්රවාහයක් අවශ්ය බ්රවුසර/නියෝජිත සේවාලාභීන් |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | බහු-සැසි HTTP සේවාලාභීන් (`mcp-session-id` ශීර්ෂකය) |

සක්රිය HTTP ප්රවාහනය (`sse` හෝ `streamable-http`) `mcpTransport` සැකසුම මඟින් තෝරාගනු ලැබේ. ප්රවාහන අතර මාරු වීමේදී අනෙක් ප්රවාහනයේ පවතින සැසි වසා දමනු ලැබේ.

### දුරස්ථ ප්රවේශය (manage විෂයපථ මඟහැරීම)

`/api/mcp/*` LOCAL_ONLY ස්තරයේ (`src/server/authz/routeGuard.ts`) පවතී — පෙරනිමියෙන් එයට ප්රවේශ විය හැක්කේ loopback ධාරකයන්ට (`localhost`, `127.0.0.1`, `::1`) පමණි. v3.8.2 සිට, `manage` විෂයපථය සහිත යතුරකට අදාළ `Authorization: Bearer <api-key>` ඉදිරිපත් කරන්නේ නම්, loopback නොවන සේවාලාභීන්ට සම්බන්ධ විය හැක. උමඟක්, ප්රතිලෝම ප්රොක්සියක් හෝ පොදු ධාරක නාමයක් හරහා දුරස්ථ MCP සේවාදායකයට ප්රවේශ විය හැකි එකම ක්රමය මෙයයි.

```bash
# manage විෂයපථය ලබා දෙන්න: උපකරණ පුවරුවේ API Keys පිටුව විවෘත කර යතුරේ
# "Management Access" සක්රිය කරන්න, නැතහොත් නිර්මාණය කරන විට POST scopes:["manage"] යොදන්න.

# ඉන්පසු දුරස්ථ MCP සේවාලාභියෙකුගෙන් සම්බන්ධ වන්න:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` නොවන යතුරක් (හෝ Bearer නොමැති විට) `403 LOCAL_ONLY` ආපසු ලබා දෙයි. සහෝදර උපසර්ගය වන `/api/cli-tools/runtime/*` හිතාමතාම මඟහැරිය නොහැකි ලෙස සකසා ඇත — [මාර්ග ආරක්ෂක ස්තර — Manage විෂයපථ ව්යතිරේකය](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) බලන්න.

## IDE වින්යාසය

Claude Desktop, Cursor, Cline සහ අනුකූල MCP සේවාලාභීන් පිහිටුවීම සඳහා [MCP සේවාලාභී වින්යාසය](../guides/SETUP_GUIDE.md#mcp-client-configuration) බලන්න.

---

## අත්යවශ්ය මෙවලම් (14) — අදියර 1

| මෙවලම                           | විෂය පථ               | විස්තරය                                                                                                                    |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | ක්රියාකාරී කාලය, මතකය, පරිපථ බිඳුම්කාරක, අනුපාත සීමා, හැඹිලි සංඛ්යාලේඛන                                                    |
| `omniroute_list_combos`         | `read:combos`         | උපායමාර්ග සහිත සියලු වින්යාස කළ combos (විකල්ප ප්රමිතික සමඟ)                                                               |
| `omniroute_get_combo_metrics`   | `read:combos`         | නිශ්චිත combo එකක් සඳහා කාර්යසාධන ප්රමිතික                                                                                 |
| `omniroute_switch_combo`        | `write:combos`        | combo එකක් සක්රිය හෝ අක්රිය කිරීම                                                                                          |
| `omniroute_create_combo`        | `write:combos`        | පවතින combo API හරහා වලංගු කළ combo එකක් නිර්මාණය කිරීම                                                                    |
| `omniroute_check_quota`         | `read:quota`          | භාවිත කළ/මුළු කෝටාව, ඉතිරි ප්රතිශතය, යළි සැකසීමේ වේලාව, token සෞඛ්යය                                                       |
| `omniroute_route_request`       | `execute:completions` | OmniRoute මාර්ගගත කිරීම හරහා chat completion එකක් යැවීම                                                                    |
| `omniroute_cost_report`         | `read:usage`          | කාලසීමාව අනුව පිරිවැය වාර්තාව (සැසිය/දිනය/සතිය/මාසය)                                                                       |
| `omniroute_list_models_catalog` | `read:models`         | හැකියාවන්, තත්ත්වය සහ මිල ගණන් සහිත සම්පූර්ණ model නාමාවලිය                                                                |
| `omniroute_radar_catalog`       | `read:radar`          | දේශීයව අත්සන් කළ Radar නාමාවලිය; විකල්ප provider/family පෙරහන්                                                             |
| `omniroute_tool_search`         | `read:tools`          | ලියාපදිංචි MCP නාමාවලියෙන් මෙවලම් සොයාගැනීම                                                                                |
| `omniroute_web_search`          | `execute:search`      | වින්යාස කළ සෙවුම් සපයන්නන් හරහා වෙබ් සෙවීම. X/Twitter නොවේ.                                                                |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok හරහා X සොයන්න, නැතහොත් Xquik API ප්රතිඵල සඳහා `xquik-search` තෝරන්න. තෝරාගත් backend සඳහා අක්තපත්ර අවශ්ය වේ. |
| `omniroute_web_fetch`           | `execute:search`      | වින්යාස කළ fetch සපයන්නන් හරහා වෙබ් අන්තර්ගතය ලබාගැනීම                                                                     |

## උසස් මෙවලම් (11) — අදියර 2

| මෙවලම                              | විෂය පථ                              | විස්තරය                                                                                                       |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | පසුබැසීමේ ගසක් සහිත, සැබෑ ඉල්ලීමක් නොයවන මාර්ගගත කිරීමේ අනුකරණය                                               |
| `omniroute_set_budget_guard`       | `write:budget`                       | තත්ත්වය පහත හෙළීමේ/අවහිර කිරීමේ/අනතුරු ඇඟවීමේ ක්රියාව සහිත සැසි අයවැය                                         |
| `omniroute_set_routing_strategy`   | `write:combos`                       | ධාවන කාලයේදී සංයෝජන උපායමාර්ගය යාවත්කාලීන කිරීම (ප්රමුඛතා/බර තැබූ/ස්වයංක්රීය/ආදිය)                            |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` ප්රත්යස්ථතා පෙරසැකසුම යෙදීම                                        |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | සැබෑ upstream ඇමතුමක් භාවිතයෙන් සංයෝජනයක සෑම සැපයුම්කරුවෙකුම සජීවීව පරීක්ෂා කිරීම                             |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 ප්රමාදය සහ circuit breaker තත්ත්වය සහිත සැපයුම්කරු-අනුව ප්රමිතික                                  |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | අයවැය/ප්රමාද සීමා සහිතව කාර්ය වර්ගය අනුව සංයෝජනයක් නිර්දේශ කිරීම                                              |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | ඉල්ලීමක් සැපයුම්කරුවෙකු වෙත මාර්ගගත කළේ ඇයි දැයි පැහැදිලි කිරීම (ලකුණුකරණ සාධක + පසුබැසීම්)                   |
| `omniroute_get_session_snapshot`   | `read:usage`                         | පූර්ණ සැසි සැණරුව: පිරිවැය, ටෝකන, ප්රමුඛ ආකෘති/සැපයුම්කරුවන්, දෝෂ, අයවැය ආරක්ෂකය                              |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | බිඳුණු සංයෝජන යොමු / අනාථ පේළි වැනි දත්ත සමුදා අපගමනය නිර්ණය කිරීම (සහ විකල්පව ස්වයංක්රීයව අලුත්වැඩියා කිරීම) |
| `omniroute_sync_pricing`           | `pricing:write`                      | බාහිර මූලාශ්රවලින් (LiteLLM) මිල දත්ත සමමුහුර්ත කිරීම; `dryRun` සඳහා සහාය දක්වයි                              |

## හැඹිලි මෙවලම් (2)

| මෙවලම                   | විෂය පථ       | විස්තරය                                                  |
| :---------------------- | :------------ | :------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | අර්ථාර්ථ හැඹිලි, ප්රේරක හැඹිලි සහ idempotency සංඛ්යාලේඛන |
| `omniroute_cache_flush` | `write:cache` | ගෝලීයව හෝ අත්සන/ආකෘතිය අනුව හැඹිලිය හිස් කිරීම           |

## සම්පීඩන මෙවලම් (13)

| මෙවලම                               | විෂය පථ             | විස්තරය                                                                                                               |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | සම්පීඩන සැකසුම්, විශ්ලේෂණ සාරාංශය සහ හැඹිලි-දැනුවත් සංඛ්යාලේඛන (`analytics.mcpDescriptionCompression` පාරදත්ත ඇතුළුව) |
| `omniroute_compression_configure`   | `write:compression` | සම්පීඩන ප්රකාරය, සීමාව, ඉලක්ක අනුපාතය, පද්ධති-ප්රේරක සංරක්ෂණය සහ MCP විස්තර සම්පීඩන ටොගලය වින්යාස කිරීම               |
| `omniroute_set_compression_engine`  | `write:compression` | සක්රිය එන්ජිම (off/caveman/rtk/stacked) සහ Caveman/RTK තීව්රතාව තේරීම                                                 |
| `omniroute_list_compression_combos` | `read:compression`  | නම් කළ සම්පීඩන සංයෝජන සහ ඒවායේ එන්ජින් නළමාර්ග ලැයිස්තුගත කිරීම                                                       |
| `omniroute_compression_combo_stats` | `read:compression`  | සම්පීඩන සංයෝජනය සහ එන්ජිම අනුව කාණ්ඩගත කළ විශ්ලේෂණ                                                                    |
| `omniroute_ccr_store`               | `write:compression` | ඇමතුම්කරු-හුදකලා අන්තර්ගතය සීමිත මතකස්ථ CCR ගබඩාවේ ගබඩා කර සලකුණක් සහ `ccr://` යොමුවක් ආපසු ලබා දීම                   |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR අන්තර්ගතය සම්පූර්ණයෙන් හෝ ආරම්භක කොටස, අවසාන කොටස, පේළි, grep සහ සංඛ්යාලේඛන ප්රකාර මඟින් ලබා ගැනීම                |
| `omniroute_ccr_inspect`             | `read:compression`  | අන්තර්ගතය ආපසු ලබා නොදී ඇමතුම්කරුට අයත් CCR පාරදත්ත පරීක්ෂා කිරීම                                                     |
| `omniroute_ccr_list`                | `read:compression`  | ඇමතුම්කරුට අයත් CCR කොටස් සඳහා පිටුගත කළ පාරදත්ත ලැයිස්තුගත කිරීම                                                     |
| `omniroute_ccr_delete`              | `write:compression` | ඇමතුම්කරුට අයත් CCR කොටසක් මකා දැමීම                                                                                  |
| `omniroute_ccr_stats`               | `read:compression`  | ඇමතුම්කරුට සීමා වූ මතක භාවිතය, ජීවන චක්ර ගණක සහ ගබඩා සීමා වාර්තා කිරීම                                                |
| `omniroute_rtk_discover`            | `read:compression`  | සක්රීයව තෝරාගත් RTK ප්රතිදාන නියැදිවල පුනරාවර්තන අනවශ්ය දත්ත සොයා ගැනීම                                               |
| `omniroute_rtk_learn`               | `read:compression`  | සක්රීයව තෝරාගත් නියැදිවලින් සමාලෝචනය කළ හැකි RTK පෙරහන් කෙටුම්පතක් ජනනය කිරීම                                         |

CCR ඇතුළත් කිරීම් මතකයේ පමණක් පවතින අතර නැවත ආරම්භ කිරීමේදී අතුරුදහන් වේ. සෑම කොටසක්ම 2 MiB දක්වාත්, සෑම
principal එකක්ම 16 MiB දක්වාත්, ගෝලීය ගබඩාව 64 MiB දක්වාත් සීමා වේ. ඇතුළත් කිරීම්වල පෙරනිමි TTL පැය 24කි (උපරිමය
දින හතකි). සම්පූර්ණ MCP ලබා ගැනීම 256 KiB දක්වා සීමා වේ; විශාල කොටස් පරාසගත සහ grep ප්රකාර හරහා
තවදුරටත් ලබාගත හැකිය. ගබඩා කිරීම, ලබා ගැනීම, ලැයිස්තුගත කිරීම, පරීක්ෂා කිරීම, මකා දැමීම සහ සංඛ්යාලේඛන,
සත්යාපිත API-key principal අනුව හුදකලා කර ඇත. විගණන වාර්තාවල අඩංගු වන්නේ හැෂ් සහ ප්රමාණ පාරදත්ත පමණක් වන අතර,
කිසිවිටෙකත් අන්තර්ගතය අඩංගු නොවේ.

`omniroute_compression_status` මඟින් MCP විස්තර සම්පීඩනය
`analytics.mcpDescriptionCompression` යටතේ වෙනම වාර්තා කරයි. එම අගයන් MCP විසින් ලැයිස්තුගත කළ හැකි
විස්තර (`tools`, `prompts`, `resources`, සහ `resourceTemplates`) සඳහා වන පාරදත්ත ප්රමාණ ඇස්තමේන්තු වේ; ඒවා සැපයුම්කරුගේ භාවිත
ලදුපත් නොවන අතර `source: "mcp_metadata_estimate"` ලෙස සලකුණු කර ඇත.

### MCP ප්රවේශ්යතා වෘක්ෂ පෙරහන (v3.8.0)

ඉහත සම්පීඩන මෙවලම්වලින් වෙන්ව, OmniRoute විසින් MCP බ්රවුසර/ප්රවේශ්යතා මෙවලම්වල
**මෙවලම් ප්රතිඵල** නියෝජිතයා වෙත ආපසු ලබාදීමට පෙර ඒවා සම්පීඩනය කරන පසු-ක්රියාත්මක පෙරහනක් ඇතුළත් කරයි.
මෙම පෙරහන ස්වයං වශයෙන් මෙවලමක් නොවේ — සවිස්තරාත්මක ප්රවේශ්යතා-වෘක්ෂ හෝ බ්රවුසර-ස්නැප්ෂොට් පෙළ
(අක්ෂර ≥2000) අඩංගු ඕනෑම මෙවලම් ප්රතිඵලයක් මත එය විනිවිද පෙනෙන ලෙස ක්රියාත්මක වේ.

ප්රධාන හැසිරීම්:

- අඛණ්ඩව පුනරාවර්තනය වන සහෝදර පේළි ≥30ක් ආරම්භක + අවසාන සාරාංශයකට හකුළයි
- Playwright/පරිගණක-භාවිතය සඳහා අවශ්ය `[ref=eXX]` නැංගුරම් සුරකියි
- අතිවිශාල පෙළ (අක්ෂර >50,000) සංචාලන ඉඟියක් සමඟ දැඩිව කප්පාදු කරයි
- අපේක්ෂිත ඉතිරිය: බ්රවුසර ස්නැප්ෂොට් දත්ත ප්රමාණවලින් **60–80%**

වින්යාසය: ගෝලීය සැකසුම් තුළ `compression.mcpAccessibility` (සංක්රමණය 056).
ක්රියාත්මක කිරීම: `open-sse/services/compression/engines/mcpAccessibility/`.
සම්පූර්ණ ලේඛන: [සම්පීඩන එන්ජින් — MCP ප්රවේශ්යතා වෘක්ෂ පෙරහන](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

මෙම මෙවලම් පසුපස ඇති ධාවන-කාල සම්පීඩන ආකෘතිය සඳහා [සම්පීඩන එන්ජින්](../compression/COMPRESSION_ENGINES.md) සහ [RTK සම්පීඩනය](../compression/RTK_COMPRESSION.md) බලන්න.

## 1Proxy මෙවලම් (3)

| මෙවලම                       | විෂය පථ        | විස්තරය                                                                                  |
| :-------------------------- | :------------- | :--------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy වෙළඳපොළෙන් නොමිලේ ප්රොක්සි ලබාගන්න (ප්රොටෝකෝලය/රට/ගුණාත්මකභාවය/සීමාව අනුව පෙරහන්) |
| `omniroute_oneproxy_rotate` | `read:proxies` | උපායමාර්ගය අනුව ඊළඟ ලබාගත හැකි ප්රොක්සිය ලබාගන්න (`random` / `quality` / `sequential`)   |
| `omniroute_oneproxy_stats`  | `read:proxies` | සංචිත සංඛ්යාලේඛන, සමමුහුර්තකරණ තත්ත්වය, ප්රොටෝකෝලය සහ රට අනුව ව්යාප්තිය                  |

## මතක මෙවලම් (3)

`open-sse/mcp-server/tools/memoryTools.ts` තුළ අර්ථ දක්වා ඇත. සත්යාපනය/විෂය පථය සම්මත MCP විෂය පථ නල මාර්ගය හරහා බලාත්මක කෙරේ.

| මෙවලම                     | විෂය පථ        | විස්තරය                                                                                      |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | ටෝකන අයවැය බලාත්මක කරමින් විමසුම / වර්ගය / API යතුර අනුව මතකයන් සොයන්න                       |
| `omniroute_memory_add`    | `write:memory` | නව මතක ඇතුළත් කිරීමක් එක් කරන්න (`factual` / `episodic` / `procedural` / `semantic`)         |
| `omniroute_memory_clear`  | `write:memory` | වර්ගය හෝ `olderThan` කාලමුද්රාව අනුව විකල්ප ලෙස පෙරහන් කර, API යතුරක් සඳහා මතකයන් හිස් කරන්න |

## කුසලතා මෙවලම් (4)

`open-sse/mcp-server/tools/skillTools.ts` තුළ අර්ථ දක්වා ඇත. `src/lib/skills/registry` + `src/lib/skills/executor` මඟින් සහාය සපයයි.

| මෙවලම                         | විෂය පථ          | විස්තරය                                                                                        |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API යතුර, නම හෝ සක්රීය තත්ත්වය අනුව විකල්ප පෙරහන් කිරීම සමඟ ලියාපදිංචි කුසලතා ලැයිස්තුගත කරන්න |
| `omniroute_skills_enable`     | `write:skills`   | ID අනුව නිශ්චිත කුසලතාවක් සක්රීය හෝ අක්රීය කරන්න                                               |
| `omniroute_skills_execute`    | `execute:skills` | සපයා ඇති ආදානය සමඟ කුසලතාවක් ක්රියාත්මක කර ක්රියාත්මක කිරීමේ වාර්තාව ආපසු ලබා දෙන්න            |
| `omniroute_skills_executions` | `read:skills`    | මෑත කුසලතා ක්රියාත්මක කිරීම් ඉතිහාසය ලැයිස්තුගත කරන්න                                          |

## Notion සන්දර්භ මූලාශ්රය (6)

`open-sse/mcp-server/tools/notionTools.ts` තුළ අර්ථ දක්වා ඇත. ටෝකනය `src/lib/db/notion.ts` හරහා `key_value` වගුවේ ගබඩා කර ඇත. REST සේවාලාභියා `src/lib/notion/api.ts` තුළ ඇත. සැකසුම් API එක `src/app/api/settings/notion/route.ts` තුළ ඇත. උපකරණ පුවරු පරිශීලක අතුරුමුහුණත `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` තුළ ඇත.

Endpoint උපකරණ පුවරුවේ **සන්දර්භ මූලාශ්ර** පටිත්තෙන් හෝ REST API හරහා ඔබේ Notion ඒකාබද්ධකරණ ටෝකනය වින්යාස කරන්න:

```bash
# ටෝකනය සකසන්න
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# තත්ත්වය පරීක්ෂා කරන්න
curl http://localhost:20128/api/settings/notion

# විසන්ධි කරන්න
curl -X DELETE http://localhost:20128/api/settings/notion
```

| මෙවලම                        | විෂය පථ        | විස්තරය                                                             |
| :--------------------------- | :------------- | :------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | සියලු පිටු සහ දත්ත සමුදා හරහා පූර්ණ-පෙළ සෙවීමක් සිදු කරන්න          |
| `notion_get_page`            | `read:notion`  | පිටුවක් එහි ගුණාංග සමඟ ID මඟින් ලබාගන්න                             |
| `notion_list_block_children` | `read:notion`  | පිටුවක හෝ බ්ලොක් එකක අනුබද්ධ බ්ලොක් ලැයිස්තුගත කරන්න                |
| `notion_query_database`      | `read:notion`  | පෙරහන්, අනුපිළිවෙළ සහ පිටුකරණය සමඟ දත්ත සමුදායක් විමසන්න            |
| `notion_get_database`        | `read:notion`  | ID මඟින් දත්ත සමුදා පරිපාටිය ලබාගන්න                                |
| `notion_append_blocks`       | `write:notion` | මව් බ්ලොක් එකකට අනුබද්ධ බ්ලොක් එක් කරන්න (එක් ඉල්ලීමකට උපරිම 100ක්) |

## Agent Skill නාමාවලි මෙවලම් (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` තුළ අර්ථ දක්වා ඇත. `src/lib/agentSkills/catalog` මඟින් සහාය සපයයි. මෙම මෙවලම් MCP සේවාලාභීන් සහ බාහිර නියෝජිතයන් වෙත ඇතුළත් කිරීම් 45කින් යුත් Agent Skills ප්රලේඛන නාමාවලිය නිරාවරණය කරයි. විෂය පථය: `read:catalog`.

| මෙවලම                             | විෂය පථ        | විස්තරය                                                                                                                                  |
| :-------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | විකල්ප `category` (api\|cli) සහ `area` පෙරහන් සමඟ නියෝජිත කුසලතා 45ම ලැයිස්තුගත කරයි; පාරදත්ත + ආවරණය ආපසු ලබා දෙයි                      |
| `omniroute_agent_skills_get`      | `read:catalog` | සම්මත `id` අනුව තනි කුසලතාවක් සඳහා සම්පූර්ණ පාරදත්ත + SKILL.md අන්තර්ගතය ලබා ගනී                                                         |
| `omniroute_agent_skills_coverage` | `read:catalog` | ආවරණ සංඛ්යාලේඛන: API කුසලතා 23න්, CLI කුසලතා 21න් සහ config කුසලතාව 1න්, නාමාවලි එකතුවට සාපේක්ෂව ගොනු පද්ධතියේ SKILL.md ගොනු ඇති සංඛ්යාව |

සම්පූර්ණ නාමාවලිය සහ බාහිර නියෝජිතයන් එය භාවිත කරන ආකාරය සඳහා [AGENT-SKILLS.md](./AGENT-SKILLS.md) බලන්න.

## සම්බන්ධිත රාමු (v3.8.0)

ඉහත MCP මෙවලම් ලේඛනය (`countUniqueMcpTools()` මඟින් ගණනය කළ අනන්ය මෙවලම් 110ක්) හිතාමතාම
ධාවන-කාලීන මාර්ගගත කිරීමේ/හැඹිලිගත කිරීමේ/සම්පීඩන/මතක/කුසලතා/ප්රොක්සි/සන්දර්භ-මූලාශ්ර මෙහෙයුම්වලට සීමා කර ඇත. යාබද
රාමු දෙකක් v3.8.0හි MCP සේවාදායකය සමඟ නිකුත් කෙරෙන අතර ඒවා වෙන වෙනම ප්රලේඛනගත කර ඇත:

### Cloud Agents

Cloud Agents යනු LLM සැපයුම්කරුවන් සඳහා භාවිත කරන සම්බන්ධතා ආකෘතියම ඔස්සේ
OmniRoute වෙත සම්බන්ධ කර ඇති ක්රියාවලියෙන් බැහැර AI කේතකරණ නියෝජිතයන් (codex-cloud, cursor-cloud, devin, jules) වේ. ඒවා
තමන්ගේම REST අතුරුමුහුණත (`/api/v1/agents/*`) හරහා නිරාවරණය කෙරෙන අතර MCP මෙවලම් නාමාවලියේ කොටසක් **නොවේ**
— Cloud Agent එකක් ඇමතීම MCP විෂය පථයක් පරිභෝජනය නොකරයි.

- ක්රියාත්මක කිරීම: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- ජීවන චක්රය: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- ප්රලේඛනය: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails යනු කතාබස් නල මාර්ගය තුළ යොදන පූර්ව/පසු-ක්රියාත්මක කිරීමේ පෙරහන් (vision-bridge, pii-masker, prompt-injection) වේ.
ඒවා MCP මෙවලම්/මාර්ග ස්තරයට ළඟා වීමට පෙර ක්රියාත්මක වන අතර විගණන නල මාර්ගයට ව්යුහගත උල්ලංඝන නිකුත් කරයි;
ඒවා MCP මෙවලම් ලෙස ආමන්ත්රණය නොකෙරේ.

- ක්රියාත්මක කිරීම: `src/lib/guardrails/`.
- ප්රලේඛනය: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

අවහිර වී ඇති බව පෙනෙන MCP ඇමතුමක් නිදොස් කිරීමේදී, MCP විගණන ලොගය
(`scope_denied:*` ඇතුළත් කිරීම්) සහ guardrails විගණන සටහන යන දෙකම පරීක්ෂා කරන්න — ඉල්ලීමක් MCP විෂය පථ
බලාත්මක කිරීමේ ස්තරයට ළඟා වීමට **පෙර** guardrail එකක් මඟින් ප්රතික්ෂේප කළ හැක.

---

## REST API අන්ත ලක්ෂ්ය

| අන්ත ලක්ෂ්යය           | ක්රමය                 | විස්තරය                                                                                                     | සත්යාපනය                |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------- | :---------------------- |
| `/api/mcp/status`      | `GET`                 | සේවාදායක තත්ත්වය: හෘදස්පන්දනය, HTTP ප්රවාහන තත්ත්වය, විගණන ක්රියාකාරකම් සාරාංශය                             | කළමනාකරණය (සැසිය/admin) |
| `/api/mcp/tools`       | `GET`                 | මෙවලම් නාමාවලිය (නම, විස්තරය, විෂය පථ, අදියර, මූලාශ්ර අන්ත ලක්ෂ්ය)                                          | කළමනාකරණය               |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ප්රවාහන අන්ත ලක්ෂ්යය (`mcpEnabled` + `mcpTransport === "sse"` මඟින් පාලනය වේ)                           | API යතුර + විෂය පථ      |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | ප්රවාහනය කළ හැකි HTTP ප්රවාහනය (`mcp-session-id` ශීර්ෂකය භාවිත කරයි; `DELETE` සැසිය අවසන් කරයි)             | API යතුර + විෂය පථ      |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` වෙතින් විගණන ලොග් ඇතුළත් කිරීම් (පෙරහන්: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | කළමනාකරණය               |
| `/api/mcp/audit/stats` | `GET`                 | සමූහගත විගණන සංඛ්යාලේඛන (`totalCalls`, `successRate`, `avgDurationMs`, ප්රමුඛ මෙවලම්)                       | කළමනාකරණය               |

මූලාශ්ර ගොනු: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

සැකසීම් තුළ MCP සේවාදායකය සබල කරන (`mcpEnabled`) තෙක් සහ සුදුසු `mcpTransport` තෝරන තෙක් SSE සහ Streamable HTTP ප්රවාහන දෙකම අවහිර කර ඇත. වැරදි ප්රවාහනය වින්යාස කර ඇත්නම්, සැකසීම් මාරු කිරීමට ඉඟියක් සමඟ මාර්ගය HTTP 400 ආපසු ලබා දෙයි.

---

## සත්යාපනය සහ විෂය පථ

MCP මෙවලම් API යතුරු විෂය පථ හරහා සත්යාපනය කරනු ලැබේ. විෂය පථ බලාත්මක කිරීම
`open-sse/mcp-server/scopeEnforcement.ts` තුළ මධ්යගත කර ඇත. සෑම මෙවලමකටම නිශ්චිත විෂය පථ අවශ්ය වේ:

| විෂය පථය              | මෙවලම්                                                                                                                                                                             |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                  |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                          |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                             |
| `read:quota`          | `check_quota`                                                                                                                                                                      |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                             |
| `read:models`         | `list_models_catalog`                                                                                                                                                              |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                      |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                              |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                 |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                        |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                     |
| `read:cache`          | `cache_stats`                                                                                                                                                                      |
| `write:cache`         | `cache_flush`                                                                                                                                                                      |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                         |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                  |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                              |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                   |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                             |
| `read:memory`         | `memory_search`                                                                                                                                                                    |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                       |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                 |
| `write:skills`        | `skills_enable`                                                                                                                                                                    |
| `execute:skills`      | `skills_execute`                                                                                                                                                                   |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                   |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                            |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                          |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                   |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                     |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                 |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                    |
| `read:obsidian`       | කියවීමේ මෙවලම් 13ක් — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | ලිවීමේ මෙවලම් 9ක් — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                 |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                  |

Wildcard පරාස සඳහා සහාය දක්වයි: `read:*` මඟින් සියලු කියවීම් පරාස ලබා දෙන අතර, `*` මඟින් පූර්ණ ප්රවේශය ලබා දෙයි.

### `mcp:connect` — සීමිත route හැකියාව (#7895)

loopback නොවන ස්ථානයකින් HTTP/SSE MCP transport (`/api/mcp/*`) වෙත ළඟා වීමට
`/api/mcp/` LOCAL_ONLY carve-out එක අවශ්ය වේ (`docs/security/ROUTE_GUARD_TIERS.md` බලන්න). ඓතිහාසිකව,
එම carve-out එක පිළිගත්තේ පූර්ණ `manage`/`admin`-scope API key එකක් පමණි — MCP සමඟ
සන්නිවේදනය කිරීම පමණක් අවශ්ය caller කෙනෙකු සඳහා එය අතිශය පුළුල් ය. දැන්
`src/shared/constants/managementScopes.ts` මඟින් `MCP_CONNECT_SCOPE = "mcp:connect"` export
කරයි: එය `src/server/authz/policies/management.ts` තුළ ඇති `/api/mcp/` bypass එකට පමණක්
අවසර දෙන, එකතු කළ හැකි සීමිත scope එකකි (`SELF_USAGE_SCOPE` හා සමාන පූර්වාදර්ශයකි) — එය වෙනත්
කිසිදු management-route ප්රවේශයක් ලබා නොදෙන අතර, හිතාමතාම `MANAGEMENT_API_KEY_SCOPES` වෙතින්
පිටත තබා ඇත. `manage`/`admin` සහිත key එකක් තවමත් carve-out එක හරහා වෙනසකින් තොරව සමත් වේ;
`mcp:connect` යනු දුරස්ථ MCP-පමණක් callerලා සඳහා අඩු වරප්රසාද සහිත විකල්පයක් වන අතර, එය
`hasMcpConnectOrManageScope()` හරහා පරීක්ෂා කෙරේ.

### එක් එක් key සඳහා HTTP scope බැඳීම (#7895)

HTTP/SSE හරහා, `open-sse/mcp-server/httpTransport.ts` දැන් callerගේ සැබෑ
`api_keys.scopes`, `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
හරහා resolve කර MCP SDK හි `transport.handleRequest(req, { authInfo })` වෙත යවයි. එමඟින්
එක් එක් tool call එක වෙත ළඟා වන `extra.authInfo.scopes`, Bearer key එකේම scopes පිළිබිඹු කරයි.
`scopeEnforcement.ts` හි `resolveCallerScopeContext()` දැනටමත් `_meta` සහ
`OMNIROUTE_MCP_SCOPES` env fallback එකට වඩා `authInfo` ප්රමුඛ කර තිබුණි — මෙයින් සිදු වන්නේ
මීට පෙර HTTP හරහා දත්ත නොලැබුණු එම පළමු සහ ඉහළම ප්රමුඛතා මූලාශ්රය පිරවීම පමණි. API key
එකක් resolve නොවන විට (header එකක් නොමැති විට හෝ key එක වලංගු නොවන විට), `authInfo`
`undefined` ලෙසම පවතින අතර resolution ක්රියාවලිය වෙනසකින් තොරව පවතින `meta`/env දාමය වෙත
වැටේ. මෙය `OMNIROUTE_MCP_ENFORCE_SCOPES` හි පෙරනිමි අගය වෙනස් නොකරයි — enforcement තවමත්
පැහැදිලිව සක්රීය කළ යුතුය; මෙම වෙනස මඟින් සිදු වන්නේ එය සක්රීය කළ පසු එක් එක් key සඳහා වන
මාර්ගයට ප්රමුඛතාව ලබා දීම පමණි. stdio සඳහා එක් එක් caller අනන්යතාවක් නොමැති බැවින්
(`mcpCallerIdentity.ts` බලන්න), එයට බලපෑමක් නැත — එය `_meta`/env fallback දාමයේම පවතී.

---

## පරිසර විචල්ය

| විචල්යය                                 | පෙරනිමිය                                | අරමුණ                                                                                                                     |
| :-------------------------------------- | :-------------------------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                | අභ්යන්තර OmniRoute API ඇමතීමේදී MCP සේවාදායකය භාවිත කරන මූලික URL එක                                                      |
| `OMNIROUTE_API_KEY`                     | (හිස්)                                  | අභ්යන්තර API ඇමතුම් වෙත `Authorization: Bearer` ලෙස යොමු කරන API යතුර                                                     |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` පමණක් එය සක්රීය කරයි) | සක්රීය කළ විට, නොමැති විෂය පථ මෙවලම් ඇමතුම් ප්රතික්ෂේප කරන අතර විගණන ලොගයෙහි `scope_denied:<reason>` සටහන් කරයි           |
| `OMNIROUTE_MCP_SCOPES`                  | (හිස්)                                  | පෙරනිමියෙන් "ලබා ගත හැකි" ලෙස සලකන, කොමාවෙන් වෙන් කළ විෂය පථ අවසර ලැයිස්තුව (ඇමතුම්කරු තම විෂය පථ ලබා නොදෙන විට භාවිත වේ) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (සකසා නැත = සක්රීයයි)                   | `0/false/off/no` ලෙස සැකසූ විට, ලියාපදිංචි කිරීමේ අවස්ථාවේ MCP විස්තර සම්පීඩනය අක්රීය කරයි                                |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (සකසා නැත = සක්රීයයි)                   | ඉහත ටොගලය සඳහා විකල්ප අන්වර්ථ නාමයකි                                                                                      |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                 | අභ්යන්තර කළමනාකරණ කියවීම් සඳහා අත්හැරීමේ කාල සීමාව (සෞඛ්යය, ප්රත්යස්ථතාව, සංයෝජන, කෝටාව, භාවිතය)                          |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                 | සැපයුම්කරුවකු සඳහා රැඳී සිටින පියවර සඳහා අත්හැරීමේ කාල සීමාව (`route_request`, `web_search`, `web_fetch`)                 |
| `MCP_TOOL_DENY`                         | (සකසා නැත = පෙරහනක් නැත)                | `tools/list` වෙතින් ඉවත් කළ යුතු, කොමාවෙන් වෙන් කළ මෙවලම් නම් (මෙවලම්-කාඩිනැලිටි අඩු කිරීම — පහත බලන්න)                   |
| `MCP_TOOL_ALLOW`                        | (සකසා නැත = පෙරහනක් නැත)                | පමණක් තබාගත යුතු, කොමාවෙන් වෙන් කළ මෙවලම් නම් (අවසර-ලැයිස්තු ප්රකාරය — පහත බලන්න)                                         |
| `DATA_DIR`                              | `~/.omniroute`                          | හෘදස්පන්දන ගොනුව `${DATA_DIR}/runtime/mcp-heartbeat.json` වෙත ලියනු ලැබේ                                                  |

---

## විස්තර සම්පීඩනය

සේවාලාභීන් වෙත නිරාවරණය වන පාරදත්ත ප්රමාණය (සහ ඒ අනුව ප්රේරක සන්දර්භ පිරිවැය) අඩු කිරීම සඳහා, MCP මෙවලම්, ප්රේරක සහ සම්පත් රෙජිස්ට්රිවලට ලියාපදිංචි කිරීමේ/ලැයිස්තුගත කිරීමේ අවස්ථාවේ විස්තර සම්පීඩනය කළ හැක. ක්රියාත්මක කිරීම `open-sse/mcp-server/descriptionCompressor.ts` තුළ පවතින අතර, `createMcpServer()` තුළ ඇති `compressMcpRegistryMetadata` හරහා MCP සේවාදායකයට සම්බන්ධ කර ඇත.

- ව්යුහාත්මක අන්තර්ගතය වෙනස් නොවන ලෙස සංරක්ෂිත-බ්ලොක් නිස්සාරණය (කේත පරාස, වැට යෙදූ බ්ලොක් ආදිය) සමඟ Caveman රීති කට්ටලය (`getRulesForContext("all", "full")`) භාවිතයෙන් විස්තර පෙළ මත සම්පීඩනය ක්රියාත්මක වේ.
- `key_value` සැකසුම් වගුවේ `compression.mcpDescriptionCompressionEnabled` අගය හරහා එක් එක් යෙදවීම සඳහා ටොගල් කරන්න (පෙරනිමිය: සක්රීයයි) — UI තුළ **විශ්ලේෂණ → MCP විස්තර සම්පීඩනය** ලෙස පෙන්වයි.
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` හෝ `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` යන දෙකෙන් එකක් භාවිතයෙන් සමස්ත ක්රියාවලිය සඳහා ටොගල් කරන්න.
- තත්යකාලීන සංඛ්යාලේඛන `analytics.mcpDescriptionCompression` යටතේ `omniroute_compression_status` හරහා පෙන්වන අතර, සැබෑ සැපයුම්කරු භාවිත ලදුපත්වලින් වෙන්කර හඳුනා ගැනීම සඳහා `source: "mcp_metadata_estimate"` ලෙස ටැග් කර ඇත.

---

## මෙවලම් සංඛ්යාත්මකත්වය අඩු කිරීම (F4.3)

විස්තර සම්පීඩනය මඟින් එක් එක් මෙවලමෙහි පාරදත්ත කුඩා කරයි; **මෙවලම් සංඛ්යාත්මකත්වය අඩු කිරීම** එයින් තවත් පියවරක් ඉදිරියට ගොස්, ප්රකාශයට පත් කරන මෙවලම් _ගණන_ අඩු කරයි. `tools/list` ප්රකාශනයෙහි මෙවලම් අඩුවෙන් දැන්වීමෙන්, මෙවලම් නාමාවලිය සඳහා සේවාලාභියාගේ ආකෘතිය විසින් එක් එක් ඉල්ලීමකට ගෙවනු ලබන ටෝකන පිරිවැය අඩු වේ ("ස්තර 5" සම්පීඩනය). ක්රියාත්මක කිරීම `open-sse/mcp-server/toolCardinality.ts` තුළ ඇති (`reduceToolManifest`) පිරිසිදු, තත්ත්ව රහිත පෙරහනක් වන අතර, එය `createMcpServer()` (`open-sse/mcp-server/server.ts`) තුළ ඇති ලියාපදිංචි කිරීමේ ලූපයට සම්බන්ධ කර ඇත.

**තෝරා සක්රිය කළ යුතු අතර පෙරනිමියෙන් අක්රියයි.** පරිසර විචල්ය දෙකෙන් අවම වශයෙන් එකක් හෝ සකසා ඇති විට පමණක් පෙරහන ක්රියාත්මක වේ; දෙකම සකසා නොමැති විට, මෙවලම් 110ම වෙනසකින් තොරව ප්රකාශයට පත් කෙරේ.

| විචල්යය          | ප්රකාරය                                                                                    |
| :--------------- | :----------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | අසාදු ලේඛනය — `tools/list` වෙතින් සැමවිටම ඉවත් කරන, කොමා මඟින් වෙන් කළ මෙවලම් නම්          |
| `MCP_TOOL_ALLOW` | අවසර ලේඛනය — කොමා මඟින් වෙන් කළ මෙවලම් නම්; මේවා පමණක් ඉතිරි වන අතර අනෙක් සියල්ල ඉවත් කෙරේ |

`deny`, `allow`ට වඩා ප්රමුඛත්වය ගනී. නම් කොමා මඟින් වෙන් කර, ඉදිරිපස සහ පසුපස හිස්තැන් ඉවත් කරන අතර හිස් ඇතුළත් කිරීම් නොසලකා හරිනු ලැබේ. උදාහරණ:

```bash
# නාමාවලියෙන් මෙවලම් දෙකක් ඉවත් කරන්න
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# මාර්ගගත කිරීමේ සහ කෝටා මෙවලම් පමණක් ප්රකාශයට පත් කරන්න (අවසර-ලේඛන ප්රකාරය)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**පෙරහන් කළ මෙවලම් ඉවත් කරන ආකාරය:** ලියාපදිංචිය සෑමවිටම සාර්ථක වේ; පැතිකඩ විසින් ප්රතික්ෂේප කරන මෙවලමක් ඉන්පසු MCP SDK හැඬලය මත `.disable()` කරනු ලැබේ. එබැවින් එය කිසිවිටෙකත් `tools/list` තුළ නොපෙන්වන නමුත් සම්බන්ධකරණය නොවෙනස්ව පවතී (පිරිසිදු සක්රිය/අක්රිය කිරීම, නැවත ලියාපදිංචි කිරීමක් නැත). පැතිකඩ විග්රහකය `readMcpToolProfileFromEnv(process.env)` වන අතර, විචල්ය දෙකම හිස් වූ විට එය `null` (පෙරහන් කිරීමක් නැත) ආපසු ලබා දෙයි.

`reduceToolManifest` පිටුපස ඇති වඩාත් සවිස්තරාත්මක `ToolProfile` හැඩය, විෂයපථ-ඡේදන පෙරහන් කිරීම (`allowScopes`, `read:*` ආකාරයේ අනුලකුණු ගැළපීම සමඟ) සහ නියතිවාදී `maxTools` සීමාවක් ද සහාය කරයි. එහෙත් එම පාලක දෙක සඳහා ලියාපදිංචි කිරීමේ අවස්ථාවේ සම්පූර්ණ ප්රකාශනය අවශ්ය වන අතර, අද ඒවා පරිසර විචල්ය හරහා **නිරාවරණය කර නොමැත** (`tools/list` මට්ටමේ හුක් එකක් පසු විපරම් කාර්යයක් ලෙස සටහන් කර ඇත). අඩු කිරීමට පෙර සහ පසු ප්රකාශනයේ ටෝකන පිරිවැය සැසඳීමට `estimateManifestTokens()` භාවිත කළ හැක.

---

## ධාවනකාල හෘදස්පන්දනය

stdio ප්රවාහනය සෑම තත්පර 5කට වරක් සජීවීභාවය `${DATA_DIR}/runtime/mcp-heartbeat.json` වෙත ස්ථිර කරයි. උපකරණ පුවරුව (`/api/mcp/status`) `online` තත්ත්වය නිර්ණය කිරීමට මෙම ගොනුව සහ PID සජීවීභාවය කියවයි. ඒ වෙනුවට HTTP ප්රවාහන, ක්රියාවලිය තුළ ඇති `getMcpHttpStatus()` වෙතින් තත්ත්වය වාර්තා කරයි (ගොනුවකට ලිවීමක් නැත).

හෘදස්පන්දන සැණරුවෙහි පහත දෑ අඩංගු වේ:

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

## විගණන ලොග්කරණය

සෑම මෙවලම් ඇමතුමක්ම `open-sse/mcp-server/audit.ts` මඟින් SQLite `mcp_tool_audit` වගුවට ලොග් කරනු ලැබේ:

- මෙවලම් නාමය, තර්ක (එක් එක් මෙවලමෙහි `auditLevel` අනුව හැෂ් කළ/කප්පාදු කළ), ප්රතිඵලය
- මිලි තත්පරවලින් කාලසීමාව, සාර්ථක/අසාර්ථක ධජය, දෝෂ පණිවිඩය (අදාළ විට)
- API යතුරු හැෂ් අගය, කාලමුද්රාව
- විෂයපථ ප්රතික්ෂේප කිරීම්, නොමැති විෂයපථ ලැයිස්තුව සමඟ `scope_denied:<reason>` ලෙස ලොග් කෙරේ

මෑත ඇමතුම් පරීක්ෂා කිරීමට උපකරණ පුවරුව හෝ `/api/mcp/audit` සහ `/api/mcp/audit/stats` REST අන්තලක්ෂ්ය භාවිත කරන්න.

---

## ගොනු

| ගොනුව                                                                    | අරමුණ                                                                              |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP සේවාදායක කර්මාන්තශාලාව, stdio ප්රවේශ ස්ථානය, විෂයපථගත මෙවලම් ලියාපදිංචි කිරීම් |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ප්රවාහනය (සැසි කළමනාකරණය)                                    |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | මෙවලම් විෂයපථ ඇගයීම සහ ඇමතුම්කරු නිරාකරණය                                          |
| `open-sse/mcp-server/audit.ts`                                           | මෙවලම් ඇමතුම් විගණන ලොග්කරණය (`mcp_tool_audit`)                                    |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio හෘදස්පන්දන ලේඛකය (`mcp-heartbeat.json`)                                      |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | මෙවලම් / ප්රේරක / සම්පත් රෙජිස්ට්රි සඳහා විස්තර සම්පීඩනය                           |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod ස්කීමා + මෙවලම් රෙජිස්ට්රිය (`MCP_TOOLS`, ඇතුළත් කිරීම් 45ක්)                  |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | අදියර 2 + හැඹිලිය + 1proxy මෙවලම් හසුරුවන්නන්                                      |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | සම්පීඩන මෙවලම් හසුරුවන්නන්                                                         |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | මතක මෙවලම් නිර්වචන (මෙවලම් 3ක්)                                                    |
| `open-sse/mcp-server/tools/skillTools.ts`                                | කුසලතා මෙවලම් නිර්වචන (මෙවලම් 4ක්)                                                 |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion සන්දර්භ මූලාශ්ර මෙවලම් නිර්වචන (මෙවලම් 6ක්)                                 |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | ක්රීඩාකරණ මෙවලම් නිර්වචන (මෙවලම් 8ක්)                                              |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | ප්ලගින ලියාපදිංචි කිරීමේ සහ කළමනාකරණ මෙවලම් (මෙවලම් 8ක්)                           |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` අන්ත ලක්ෂ්යය                                                     |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` අන්ත ලක්ෂ්යය                                                      |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE ප්රවාහන මාර්ගය                                                  |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP ප්රවාහන මාර්ගය                                   |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` විගණන ලොග් විමසුම                                                 |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` සමූහගත විගණන ප්රමිතික                                       |
| `src/lib/notion/api.ts`                                                  | Notion REST API අනුග්රාහකය (නැවත උත්සාහ කිරීම, කාලසීමාව ඉක්මවීම, දෝෂ වර්ගීකරණය)    |
| `src/lib/db/notion.ts`                                                   | Notion ටෝකන ස්ථායිකරණය (`key_value` වගුව)                                          |
| `src/app/api/settings/notion/route.ts`                                   | Notion සැකසුම් API (GET/POST/DELETE)                                               |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion ටෝකන කළමනාකරණ පරිශීලක අතුරුමුහුණත                                           |
| `tests/unit/notion-api.test.ts`                                          | Notion API අනුග්රාහක පරීක්ෂණ (7)                                                   |
| `tests/unit/notion-tools.test.ts`                                        | Notion මෙවලම් විෂයපථ බලාත්මක කිරීමේ පරීක්ෂණ (10)                                   |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB මොඩියුල පරීක්ෂණ (3)                                                      |
