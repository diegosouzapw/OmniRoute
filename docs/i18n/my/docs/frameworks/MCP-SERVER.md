# OmniRoute MCP Server Documentation (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> လမ်းကြောင်းသတ်မှတ်ခြင်း၊ cache၊ ချုံ့ခြင်း၊ memory၊ skills၊ proxy၊ pool၊ Radar နှင့် context source လုပ်ဆောင်ချက်များအတွက် tool 110 ခုပါဝင်သည့် Model Context Protocol server ဖြစ်သည်။
>
> တရားဝင်အရင်းအမြစ်ဖြစ်သော `open-sse/mcp-server/server.ts` သည် `countUniqueMcpTools()` ဖြင့် **ထပ်တူမရှိသော tool 110 ခု**ကို တွက်ချက်သည်။ ၎င်းတို့တွင် canonical definition 45 ခု (CCR lifecycle tool ခြောက်ခု၊ agent-skills tool သုံးခု၊ `omniroute_radar_catalog` နှင့် `omniroute_x_search` အပါအဝင်)၊ memory (3)၊ skills (4)၊ GitHub skills (3)၊ pool (6)၊ gamification (8)၊ plugins (8)၊ Notion (6)၊ Obsidian (22)၊ local corpus (3) နှင့် RTK အတွက်သာဖြစ်သော compression tool နှစ်ခုတို့ ပါဝင်သည်။

## ထည့်သွင်းခြင်း

OmniRoute MCP ကို အသင့်ထည့်သွင်းပေးထားသည်။ အောက်ပါ command ဖြင့် စတင်ပါ:

```bash
omniroute --mcp
```

သို့မဟုတ် open-sse transport မှတစ်ဆင့် စတင်နိုင်သည်:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP သည် /mcp endpoint တွင် အလိုအလျောက် စတင်သည်
```

HTTP transport များ (`sse` / `streamable-http`၊ dashboard server က process အတွင်းမှ ဝန်ဆောင်မှုပေးသည်) ကို
မူလအားဖြင့် ပိတ်ထားပြီး ယခင်က `/dashboard/mcp` စာမျက်နှာမှသာ ဖွင့်/ပိတ် ပြောင်းလဲနိုင်ခဲ့သည်။ v3.8.51
မှစ၍ CLI တွင်လည်း အလားတူ လုပ်ဆောင်နိုင်ပြီဖြစ်သည်:

```bash
omniroute mcp status                                  # ဖွင့်ထားမှု/အွန်လိုင်းဖြစ်မှု၊ transport၊ tool အရေအတွက်
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # လက်ရှိအသုံးပြုနေသော sse/streamable-http session များကို ပြန်လည်သတ်မှတ်သည်
```

`mcp enable`/`mcp disable` သည် dashboard က `/api/settings` မှတစ်ဆင့် ပြောင်းလဲသည့် တူညီသော
`mcpEnabled` setting (နှင့် ရွေးချယ်နိုင်သော `mcpTransport`) ကို PATCH လုပ်သည်။ `mcp restart` သည်
`POST /api/mcp/restart` ကို ခေါ်ဆိုသည်။ ၎င်းသည် နောက် request တွင် အစမှ သန့်ရှင်းစွာ ပြန်လည်စတင်နိုင်ရန်
လက်ရှိအသုံးပြုနေသော `sse`/`streamable-http` session များကို ပိတ်သိမ်းပြီး၊ MCP ပိတ်ထားပါက
`409` ကို ပြန်ပေးကာ `stdio` transport အတွက် `501` ကို ပြန်ပေးသည် (stdio client များသည် ၎င်းတို့၏
ကိုယ်ပိုင် subprocess ကို စီမံကြသည် — ပြန်လည်စတင်ရန် process အတွင်းရှိ handle မရှိပါ)။

## Transports

MCP ဆာဗာသည် transport သုံးမျိုးကို ဖော်ထုတ်ပေးထားပြီး အားလုံးသည် တူညီသော `createMcpServer()` factory ကို အသုံးပြုထားသည်။

| Transport         | တည်နေရာ                                           | အသုံးပြုသင့်သည့်အချိန်                                         |
| :---------------- | :------------------------------------------------ | :------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                   | IDE ပေါင်းစည်းမှုများ (Claude Desktop၊ Cursor စသည်)            |
| `sse`             | `httpTransport` မှတစ်ဆင့် `POST/GET /api/mcp/sse` | event stream လိုအပ်သော browser/agent client များ               |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                 | Session များစွာသုံး HTTP client များ (`mcp-session-id` header) |

အသုံးပြုနေသော HTTP transport (`sse` သို့မဟုတ် `streamable-http`) ကို `mcpTransport` setting ဖြင့် ရွေးချယ်သည်။ Transport များကို ပြောင်းလဲသည့်အခါ အခြား transport ပေါ်ရှိ လက်ရှိ session များကို ပိတ်သွားမည်။

### အဝေးမှ ဝင်ရောက်ခြင်း (manage-scope ကို ကျော်ဖြတ်ခြင်း)

`/api/mcp/*` သည် LOCAL_ONLY tier (`src/server/authz/routeGuard.ts`) တွင် ရှိသည် — ပုံမှန်အားဖြင့် loopback host များ (`localhost`၊ `127.0.0.1`၊ `::1`) သာ ၎င်းကို ဝင်ရောက်နိုင်သည်။ v3.8.2 မှစ၍ loopback မဟုတ်သော client များသည် `manage` scope ပါရှိသည့် key ဖြင့် `Authorization: Bearer <api-key>` ကို ပေးပို့ပါက ချိတ်ဆက်နိုင်သည်။ ဤနည်းလမ်းသည် tunnel၊ reverse proxy သို့မဟုတ် public hostname မှတစ်ဆင့် အဝေးရှိ MCP ဆာဗာကို ဝင်ရောက်နိုင်သည့် တစ်ခုတည်းသော နည်းလမ်းဖြစ်သည်။

```bash
# manage scope ခွင့်ပြုရန် dashboard ၏ API Keys စာမျက်နှာကို ဖွင့်ပြီး key ပေါ်ရှိ
# "Management Access" ကို ဖွင့်ပါ၊ သို့မဟုတ် ဖန်တီးချိန်တွင် POST scopes:["manage"] ကို အသုံးပြုပါ။

# ထို့နောက် အဝေးရှိ MCP client မှ ချိတ်ဆက်ပါ။
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

`manage` scope မပါသော key (သို့မဟုတ် Bearer မပါခြင်း) သည် `403 LOCAL_ONLY` ကို ပြန်ပေးသည်။ ဆက်စပ် prefix ဖြစ်သော `/api/cli-tools/runtime/*` ကိုမူ ရည်ရွယ်ချက်ရှိရှိ ကျော်ဖြတ်၍မရနိုင်အောင် ပြုလုပ်ထားသည် — [Route Guard Tiers — Manage-scope ခြွင်းချက်](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) ကို ကြည့်ပါ။

## IDE ဖွဲ့စည်းသတ်မှတ်မှု

Claude Desktop၊ Cursor၊ Cline နှင့် ကိုက်ညီသော MCP client များကို စနစ်ထည့်သွင်းရန် [MCP Client ဖွဲ့စည်းသတ်မှတ်မှု](../guides/SETUP_GUIDE.md#mcp-client-configuration) ကို ကြည့်ပါ။

---

## မရှိမဖြစ် ကိရိယာများ (14) — အဆင့် 1

| ကိရိယာ                          | နယ်ပယ်များ            | ဖော်ပြချက်                                                                                                                                                       |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | လည်ပတ်နေချိန်၊ မမ်မိုရီ၊ circuit breaker များ၊ နှုန်းကန့်သတ်ချက်များ၊ cache စာရင်းအင်းများ                                                                       |
| `omniroute_list_combos`         | `read:combos`         | မဟာဗျူဟာများနှင့်အတူ ဖွဲ့စည်းသတ်မှတ်ထားသော combo အားလုံး (မက်ထရစ်များကို ရွေးချယ်ထည့်သွင်းနိုင်သည်)                                                              |
| `omniroute_get_combo_metrics`   | `read:combos`         | သတ်မှတ်ထားသော combo တစ်ခုအတွက် စွမ်းဆောင်ရည် မက်ထရစ်များ                                                                                                         |
| `omniroute_switch_combo`        | `write:combos`        | combo တစ်ခုကို ဖွင့်ပါ သို့မဟုတ် ပိတ်ပါ                                                                                                                          |
| `omniroute_create_combo`        | `write:combos`        | လက်ရှိ combo API မှတစ်ဆင့် စစ်ဆေးအတည်ပြုထားသော combo တစ်ခုကို ဖန်တီးပါ                                                                                           |
| `omniroute_check_quota`         | `read:quota`          | အသုံးပြုပြီး/စုစုပေါင်း quota၊ ကျန်ရှိသည့် ရာခိုင်နှုန်း၊ ပြန်လည်သတ်မှတ်ချိန်၊ token အခြေအနေ                                                                     |
| `omniroute_route_request`       | `execute:completions` | OmniRoute routing မှတစ်ဆင့် chat completion တစ်ခု ပေးပို့ပါ                                                                                                      |
| `omniroute_cost_report`         | `read:usage`          | ကာလအလိုက် ကုန်ကျစရိတ်အစီရင်ခံစာ (session/day/week/month)                                                                                                         |
| `omniroute_list_models_catalog` | `read:models`         | စွမ်းဆောင်နိုင်မှုများ၊ အခြေအနေနှင့် ဈေးနှုန်းများပါဝင်သော model catalog အပြည့်အစုံ                                                                              |
| `omniroute_radar_catalog`       | `read:radar`          | စက်တွင်း၌ လက်မှတ်ရေးထိုးထားသော Radar catalog၊ provider/family filter များကို ရွေးချယ်အသုံးပြုနိုင်သည်                                                            |
| `omniroute_tool_search`         | `read:tools`          | မှတ်ပုံတင်ထားသော MCP catalog မှ ကိရိယာများကို ရှာဖွေဖော်ထုတ်ပါ                                                                                                   |
| `omniroute_web_search`          | `execute:search`      | ဖွဲ့စည်းသတ်မှတ်ထားသော ရှာဖွေရေး provider များမှတစ်ဆင့် ဝဘ်တွင် ရှာဖွေပါ။ X/Twitter မပါဝင်ပါ။                                                                     |
| `omniroute_x_search`            | `execute:search`      | xAI/SuperGrok မှတစ်ဆင့် X တွင် ရှာဖွေပါ၊ သို့မဟုတ် Xquik API ရလဒ်များအတွက် `xquik-search` ကို ရွေးချယ်ပါ။ ရွေးချယ်ထားသော backend အတွက် အထောက်အထားများ လိုအပ်သည်။ |
| `omniroute_web_fetch`           | `execute:search`      | ဖွဲ့စည်းသတ်မှတ်ထားသော fetch provider များမှတစ်ဆင့် ဝဘ်အကြောင်းအရာကို ရယူပါ                                                                                       |

## အဆင့်မြင့် ကိရိယာများ (11) — အဆင့် 2

| Tool                               | Scopes                               | Description                                                                                                                                |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | အရန်လမ်းကြောင်း tree ပါဝင်သော တကယ်မလုပ်ဆောင်သည့် လမ်းကြောင်း simulation                                                                    |
| `omniroute_set_budget_guard`       | `write:budget`                       | အဆင့်လျှော့ချခြင်း/ပိတ်ဆို့ခြင်း/သတိပေးခြင်း လုပ်ဆောင်ချက်ပါဝင်သော session ဘတ်ဂျက်                                                         |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Runtime တွင် combo မဟာဗျူဟာကို အပ်ဒိတ်လုပ်ခြင်း (ဦးစားပေး/အလေးချိန်ပေး/အလိုအလျောက်/စသည်)                                                   |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` resilience ကြိုတင်သတ်မှတ်ချက်ကို အသုံးပြုခြင်း                                                  |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | တကယ့် upstream ခေါ်ဆိုမှုကို အသုံးပြုပြီး combo တစ်ခုအတွင်းရှိ provider တိုင်းကို တိုက်ရိုက်စမ်းသပ်ခြင်း                                   |
| `omniroute_get_provider_metrics`   | `read:health`                        | p50/p95/p99 latency နှင့် circuit breaker အခြေအနေပါဝင်သော provider တစ်ခုချင်းစီအလိုက် metrics                                              |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | ဘတ်ဂျက်/latency ကန့်သတ်ချက်များနှင့်အတူ လုပ်ငန်းအမျိုးအစားအလိုက် combo ကို အကြံပြုခြင်း                                                    |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | တောင်းဆိုချက်တစ်ခုကို provider တစ်ခုထံသို့ အဘယ်ကြောင့် လမ်းကြောင်းပေးခဲ့ကြောင်း ရှင်းပြခြင်း (အမှတ်ပေးသည့်အချက်များ + အရန်လမ်းကြောင်းများ) |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Session snapshot အပြည့်အစုံ- ကုန်ကျစရိတ်၊ tokens၊ ထိပ်တန်း models/providers၊ အမှားများနှင့် ဘတ်ဂျက်အစောင့်                                 |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | ပျက်နေသော combo refs / မိဘမဲ့ rows ကဲ့သို့သော database drift ကို ရောဂါရှာဖွေခြင်း (နှင့် ရွေးချယ်နိုင်သည့် အလိုအလျောက်ပြုပြင်ခြင်း)        |
| `omniroute_sync_pricing`           | `pricing:write`                      | ပြင်ပရင်းမြစ်များ (LiteLLM) မှ ဈေးနှုန်းဒေတာကို ထပ်တူပြုခြင်း၊ `dryRun` ကို ပံ့ပိုးသည်                                                     |

## Cache ကိရိယာများ (2)

| Tool                    | Scopes        | Description                                                                  |
| :---------------------- | :------------ | :--------------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Semantic cache၊ prompt-cache နှင့် idempotency စာရင်းအင်းများ                |
| `omniroute_cache_flush` | `write:cache` | Cache ကို စနစ်တစ်ခုလုံးအတွက် သို့မဟုတ် signature/model အလိုက် ရှင်းလင်းခြင်း |

## Compression ကိရိယာများ (13)

| Tool                                | Scopes              | Description                                                                                                                                                              |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Compression ဆက်တင်များ၊ analytics အနှစ်ချုပ်နှင့် cache ကို ထည့်သွင်းစဉ်းစားထားသော စာရင်းအင်းများ (`analytics.mcpDescriptionCompression` metadata ပါဝင်သည်)              |
| `omniroute_compression_configure`   | `write:compression` | Compression mode၊ threshold၊ ပစ်မှတ်အချိုး၊ system-prompt ထိန်းသိမ်းမှုနှင့် MCP description compression အဖွင့်အပိတ်ကို ပြင်ဆင်သတ်မှတ်ခြင်း                              |
| `omniroute_set_compression_engine`  | `write:compression` | လက်ရှိအသုံးပြုမည့် engine (off/caveman/rtk/stacked) နှင့် Caveman/RTK ပြင်းအားကို ရွေးချယ်ခြင်း                                                                          |
| `omniroute_list_compression_combos` | `read:compression`  | အမည်ပေးထားသော compression combos နှင့် ၎င်းတို့၏ engine pipelines ကို စာရင်းပြုစုခြင်း                                                                                   |
| `omniroute_compression_combo_stats` | `read:compression`  | Compression combo နှင့် engine အလိုက် အုပ်စုဖွဲ့ထားသော analytics                                                                                                         |
| `omniroute_ccr_store`               | `write:compression` | ခေါ်ဆိုသူအလိုက် သီးခြားထားသည့် အကြောင်းအရာကို အရွယ်အစားကန့်သတ်ထားသော memory အတွင်းရှိ CCR store တွင် သိမ်းဆည်းပြီး marker တစ်ခုနှင့် `ccr://` reference ကို ပြန်ပေးခြင်း |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR အကြောင်းအရာကို အပြည့်အစုံ သို့မဟုတ် head၊ tail၊ lines၊ grep နှင့် stats modes များဖြင့် ရယူခြင်း                                                                     |
| `omniroute_ccr_inspect`             | `read:compression`  | အကြောင်းအရာကို ပြန်မပေးဘဲ ခေါ်ဆိုသူပိုင် CCR metadata ကို စစ်ဆေးခြင်း                                                                                                    |
| `omniroute_ccr_list`                | `read:compression`  | ခေါ်ဆိုသူပိုင် CCR blocks များအတွက် စာမျက်နှာခွဲထားသော metadata ကို စာရင်းပြုစုခြင်း                                                                                     |
| `omniroute_ccr_delete`              | `write:compression` | ခေါ်ဆိုသူပိုင် CCR block တစ်ခုကို ဖျက်ခြင်း                                                                                                                              |
| `omniroute_ccr_stats`               | `read:compression`  | ခေါ်ဆိုသူအလိုက် memory အသုံးပြုမှု၊ lifecycle counters နှင့် store ကန့်သတ်ချက်များကို အစီရင်ခံခြင်း                                                                      |
| `omniroute_rtk_discover`            | `read:compression`  | ပါဝင်ရန်ရွေးချယ်ထားသော RTK output နမူနာများအတွင်း ထပ်တလဲလဲဖြစ်သော noise ကို ရှာဖွေခြင်း                                                                                  |
| `omniroute_rtk_learn`               | `read:compression`  | ပါဝင်ရန်ရွေးချယ်ထားသော နမူနာများမှ ပြန်လည်သုံးသပ်နိုင်သည့် RTK filter မူကြမ်းကို ထုတ်လုပ်ခြင်း                                                                           |

CCR entries များကို memory အတွင်း၌သာ သိမ်းဆည်းထားပြီး restart လုပ်ပါက ပျောက်ကွယ်သွားသည်။ Block တစ်ခုစီကို 2 MiB၊
principal တစ်ခုစီကို 16 MiB နှင့် global store ကို 64 MiB အထိ ကန့်သတ်ထားသည်။ Entries များ၏ မူလ TTL သည် 24 နာရီဖြစ်သည် (အများဆုံး
ခုနစ်ရက်)။ MCP မှ အပြည့်အစုံရယူမှုကို 256 KiB အထိ ကန့်သတ်ထားသည်။ ပိုကြီးသော blocks များကို
အပိုင်းအခြားသတ်မှတ်ထားသော mode နှင့် grep modes များမှတစ်ဆင့် ဆက်လက်ရယူနိုင်သည်။ သိမ်းဆည်းခြင်း၊ ရယူခြင်း၊ စာရင်းပြုစုခြင်း၊ စစ်ဆေးခြင်း၊ ဖျက်ခြင်းနှင့် စာရင်းအင်းများကို
အထောက်အထားစိစစ်ထားသော API-key principal အလိုက် သီးခြားခွဲထားသည်။ Audit records များတွင် hashes နှင့် အရွယ်အစား metadata သာပါဝင်ပြီး အကြောင်းအရာ လုံးဝမပါဝင်ပါ။

`omniroute_compression_status` သည် MCP ဖော်ပြချက်ချုံ့ခြင်းကို
`analytics.mcpDescriptionCompression` အောက်တွင် သီးခြားအစီရင်ခံပါသည်။ အဆိုပါတန်ဖိုးများသည် MCP တွင် စာရင်းပြုစုနိုင်သော
ဖော်ပြချက်များ (`tools`, `prompts`, `resources` နှင့် `resourceTemplates`) အတွက် မက်တာဒေတာအရွယ်အစား ခန့်မှန်းချက်များဖြစ်ပြီး၊ ပံ့ပိုးသူအသုံးပြုမှု
ပြေစာများမဟုတ်ပါ။ ၎င်းတို့ကို `source: "mcp_metadata_estimate"` ဖြင့် အမှတ်အသားပြုထားပါသည်။

### MCP လက်လှမ်းမီနိုင်မှု Tree Filter (v3.8.0)

အထက်ပါ ချုံ့ရေးကိရိယာများနှင့် သီးခြားစီအဖြစ် OmniRoute တွင် MCP ဘရောက်ဇာ/လက်လှမ်းမီနိုင်မှု ကိရိယာများ၏ **ကိရိယာရလဒ်များ** ကို
အေးဂျင့်ထံ ပြန်မပို့မီ ချုံ့ပေးသည့် လုပ်ဆောင်ပြီးနောက် စစ်ထုတ်ကိရိယာတစ်ခု ပါဝင်ပါသည်။
ဤစစ်ထုတ်ကိရိယာသည် ကိုယ်တိုင် ကိရိယာတစ်ခုမဟုတ်ပါ — အသေးစိတ်များလွန်းသော လက်လှမ်းမီနိုင်မှု tree သို့မဟုတ် ဘရောက်ဇာ snapshot စာသား
(≥2000 chars) ပါရှိသည့် မည်သည့်ကိရိယာရလဒ်မဆို ၎င်းက ပွင့်လင်းမြင်သာစွာ လုပ်ဆောင်ပါသည်။

အဓိကလုပ်ဆောင်ပုံများ-

- ဆက်တိုက်ထပ်နေသော တူညီအဆင့်ရှိ စာကြောင်း ≥30 ကြောင်းကို အစပိုင်း + အဆုံးပိုင်း အကျဉ်းချုပ်အဖြစ် ခေါက်သိမ်းပေးသည်
- Playwright/computer-use အတွက် လိုအပ်သော `[ref=eXX]` anchor များကို ထိန်းသိမ်းထားသည်
- အရွယ်အစားအလွန်ကြီးသော စာသား (>50,000 chars) ကို လမ်းညွှန်ချက်တစ်ခုနှင့်အတူ မဖြစ်မနေ ဖြတ်တောက်သည်
- မျှော်မှန်းထားသော ချွေတာနိုင်မှု- ဘရောက်ဇာ snapshot payload များတွင် **60–80%**

စီစဉ်သတ်မှတ်မှု- ကမ္ဘာလုံးဆိုင်ရာ ဆက်တင်များရှိ `compression.mcpAccessibility` (migration 056)။
အကောင်အထည်ဖော်မှု- `open-sse/services/compression/engines/mcpAccessibility/`။
စာရွက်စာတမ်းအပြည့်အစုံ- [ချုံ့ရေးအင်ဂျင်များ — MCP လက်လှမ်းမီနိုင်မှု Tree Filter](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)။

ဤကိရိယာများ၏ နောက်ကွယ်ရှိ runtime ချုံ့ရေးမော်ဒယ်အကြောင်းကို [ချုံ့ရေးအင်ဂျင်များ](../compression/COMPRESSION_ENGINES.md) နှင့် [RTK ချုံ့ခြင်း](../compression/RTK_COMPRESSION.md) တွင်
ကြည့်ရှုပါ။

## 1Proxy ကိရိယာများ (3)

| Tool                        | Scopes         | Description                                                                                   |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | 1proxy ဈေးကွက်မှ အခမဲ့ proxy များကို ရယူရန် (protocol/country/quality/limit စစ်ထုတ်မှုများ)   |
| `omniroute_oneproxy_rotate` | `read:proxies` | နည်းဗျူဟာ (`random` / `quality` / `sequential`) အလိုက် နောက်ထပ်ရရှိနိုင်သည့် proxy ကို ရယူရန် |
| `omniroute_oneproxy_stats`  | `read:proxies` | Pool စာရင်းအင်းများ၊ sync အခြေအနေ၊ protocol နှင့် နိုင်ငံအလိုက် ဖြန့်ဝေမှု                    |

## Memory ကိရိယာများ (3)

`open-sse/mcp-server/tools/memoryTools.ts` တွင် သတ်မှတ်ထားသည်။ Auth/scope ကို စံ MCP scope pipeline မှတစ်ဆင့် လိုက်နာစေသည်။

| Tool                      | Scopes         | Description                                                                                                          |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Token budget ကန့်သတ်မှုကို လိုက်နာစေပြီး query / type / API key အလိုက် memory များကို ရှာဖွေရန်                      |
| `omniroute_memory_add`    | `write:memory` | Memory entry အသစ်တစ်ခု ထည့်ရန် (`factual` / `episodic` / `procedural` / `semantic`)                                  |
| `omniroute_memory_clear`  | `write:memory` | API key တစ်ခုအတွက် memory များကို ရှင်းလင်းရန်၊ type သို့မဟုတ် `olderThan` timestamp ဖြင့် စိတ်ကြိုက်စစ်ထုတ်နိုင်သည် |

## Skill ကိရိယာများ (4)

`open-sse/mcp-server/tools/skillTools.ts` တွင် သတ်မှတ်ထားသည်။ `src/lib/skills/registry` + `src/lib/skills/executor` တို့က ပံ့ပိုးထားသည်။

| Tool                          | Scopes           | Description                                                                                                        |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | API key၊ အမည် သို့မဟုတ် ဖွင့်ထားသည့်အခြေအနေဖြင့် စိတ်ကြိုက်စစ်ထုတ်ကာ မှတ်ပုံတင်ထားသော skill များကို စာရင်းပြုစုရန် |
| `omniroute_skills_enable`     | `write:skills`   | သတ်မှတ်ထားသော skill တစ်ခုကို ID ဖြင့် ဖွင့်ရန် သို့မဟုတ် ပိတ်ရန်                                                   |
| `omniroute_skills_execute`    | `execute:skills` | ပေးထားသော input ဖြင့် skill တစ်ခုကို လုပ်ဆောင်ပြီး execution record ကို ပြန်ပေးရန်                                 |
| `omniroute_skills_executions` | `read:skills`    | မကြာသေးမီက skill လုပ်ဆောင်မှုမှတ်တမ်းကို စာရင်းပြုစုရန်                                                            |

## Notion Context Source (6)

`open-sse/mcp-server/tools/notionTools.ts` တွင် သတ်မှတ်ထားသည်။ Token ကို `src/lib/db/notion.ts` မှတစ်ဆင့် `key_value` table တွင် သိမ်းဆည်းထားသည်။ REST client သည် `src/lib/notion/api.ts` တွင်ရှိသည်။ Settings API သည် `src/app/api/settings/notion/route.ts` တွင်ရှိသည်။ Dashboard UI သည် `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` တွင်ရှိသည်။

သင်၏ Notion integration token ကို Endpoint dashboard ရှိ **Context Sources** tab မှဖြစ်စေ၊ REST API မှတစ်ဆင့်ဖြစ်စေ စီစဉ်သတ်မှတ်ပါ။

```bash
# Token သတ်မှတ်ရန်
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# အခြေအနေ စစ်ဆေးရန်
curl http://localhost:20128/api/settings/notion

# ချိတ်ဆက်မှု ဖြုတ်ရန်
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Tool                         | Scopes         | Description                                                                               |
| :--------------------------- | :------------- | :---------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Page နှင့် database အားလုံးတွင် full-text ရှာဖွေမှု ပြုလုပ်ရန်                            |
| `notion_get_page`            | `read:notion`  | Page တစ်ခုကို ၎င်း၏ properties များနှင့်အတူ ID ဖြင့် ရယူရန်                               |
| `notion_list_block_children` | `read:notion`  | Page သို့မဟုတ် block တစ်ခု၏ child block များကို စာရင်းပြုစုရန်                            |
| `notion_query_database`      | `read:notion`  | Filter၊ sort နှင့် pagination များဖြင့် database တစ်ခုကို query ပြုလုပ်ရန်                |
| `notion_get_database`        | `read:notion`  | Database schema ကို ID ဖြင့် ရယူရန်                                                       |
| `notion_append_blocks`       | `write:notion` | Parent block တစ်ခုသို့ child block များကို ထပ်ဖြည့်ရန် (request တစ်ခုလျှင် အများဆုံး 100) |

## Agent Skill Catalog ကိရိယာများ (3)

`open-sse/mcp-server/tools/agentSkillTools.ts` တွင် သတ်မှတ်ထားသည်။ `src/lib/agentSkills/catalog` ဖြင့် ပံ့ပိုးထားသည်။ ဤကိရိယာများသည် ထည့်သွင်းချက် 45 ခုပါသော Agent Skills စာရွက်စာတမ်း catalog ကို MCP client များနှင့် ပြင်ပ agent များထံ ဖော်ထုတ်ပေးသည်။ Scope: `read:catalog`။

| ကိရိယာ                            | Scope များ     | ဖော်ပြချက်                                                                                                                                                                                          |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | ရွေးချယ်နိုင်သော `category` (api\|cli) နှင့် `area` filter များဖြင့် agent skill 45 ခုလုံးကို စာရင်းပြုစုပြီး metadata + coverage ကို ပြန်ပေးသည်                                                    |
| `omniroute_agent_skills_get`      | `read:catalog` | canonical `id` ဖြင့် skill တစ်ခုအတွက် metadata အပြည့်အစုံ + SKILL.md အကြောင်းအရာကို ရယူသည်                                                                                                          |
| `omniroute_agent_skills_coverage` | `read:catalog` | Coverage စာရင်းအင်းများ− API skill 23 ခု၊ CLI skill 21 ခုနှင့် config skill 1 ခုတို့အနက် filesystem ပေါ်တွင် SKILL.md ဖိုင်များရှိသည့် အရေအတွက်ကို catalog စုစုပေါင်းများနှင့် နှိုင်းယှဉ်ဖော်ပြသည် |

Catalog အပြည့်အစုံနှင့် ပြင်ပ agent များက ၎င်းကို အသုံးပြုပုံအတွက် [AGENT-SKILLS.md](./AGENT-SKILLS.md) ကို ကြည့်ပါ။

## ဆက်စပ် Framework များ (v3.8.0)

အထက်ပါ MCP ကိရိယာစာရင်း (ထပ်တူမရှိသော ကိရိယာ 110 ခု၊ `countUniqueMcpTools()` ဖြင့် တွက်ချက်ထားသည်) ကို runtime routing/cache/compression/memory/skills/proxy/context-source လုပ်ဆောင်ချက်များအတွက် ရည်ရွယ်ချက်ရှိရှိ
ကန့်သတ်ထားသည်။ v3.8.0 တွင် MCP server နှင့်အတူ ဆက်စပ် framework နှစ်ခုပါဝင်ပြီး ၎င်းတို့ကို သီးခြားမှတ်တမ်းတင်ထားသည်။

### Cloud Agent များ

Cloud Agent များသည် LLM provider များအတွက် အသုံးပြုသည့် တူညီသော connection model မှတစ်ဆင့်
OmniRoute နှင့် ချိတ်ဆက်ထားသော process ပြင်ပ AI coding agent များ (codex-cloud, cursor-cloud, devin, jules) ဖြစ်သည်။ ၎င်းတို့ကို
သီးခြား REST မျက်နှာပြင် (`/api/v1/agents/*`) မှတစ်ဆင့် ဖော်ထုတ်ပေးထားပြီး MCP ကိရိယာ catalog ၏ အစိတ်အပိုင်း **မဟုတ်ပါ**
— Cloud Agent တစ်ခုကို ခေါ်ယူခြင်းသည် MCP scope ကို အသုံးမပြုပါ။

- အကောင်အထည်ဖော်မှု: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`)။
- Lifecycle: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`။
- စာရွက်စာတမ်း: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)။

### Guardrail များ

Guardrail များသည် chat pipeline အတွင်း အသုံးပြုသည့် execution မတိုင်မီ/ပြီးနောက် filter များ (vision-bridge, pii-masker, prompt-injection)
ဖြစ်သည်။ ၎င်းတို့သည် MCP tool/route layer သို့ မရောက်မီ လုပ်ဆောင်ပြီး ဖွဲ့စည်းပုံသတ်မှတ်ထားသော ချိုးဖောက်မှုများကို audit pipeline သို့ ထုတ်လွှတ်ပေးသည်။ ၎င်းတို့ကို MCP tool များအဖြစ် ခေါ်ယူခြင်းမရှိပါ။

- အကောင်အထည်ဖော်မှု: `src/lib/guardrails/`။
- စာရွက်စာတမ်း: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)။

ပိတ်ဆို့ခံထားရပုံရသော MCP call တစ်ခုကို debug လုပ်သည့်အခါ MCP audit log
(`scope_denied:*` entry များ) နှင့် guardrails audit trail နှစ်ခုလုံးကို စစ်ဆေးပါ — request တစ်ခုသည် MCP scope enforcement layer သို့ မရောက်မီ
guardrail တစ်ခုက **ကြိုတင်၍** ငြင်းပယ်နိုင်သည်။

---

## REST API Endpoint များ

| Endpoint               | Method                | ဖော်ပြချက်                                                                                                | Auth                           |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------- | :----------------------------- |
| `/api/mcp/status`      | `GET`                 | Server အခြေအနေ− heartbeat၊ HTTP transport အခြေအနေ၊ audit လုပ်ဆောင်ချက် အကျဉ်းချုပ်                        | စီမံခန့်ခွဲမှု (session/admin) |
| `/api/mcp/tools`       | `GET`                 | ကိရိယာ catalog (အမည်၊ ဖော်ပြချက်၊ scope များ၊ phase၊ အရင်းအမြစ် endpoint များ)                            | စီမံခန့်ခွဲမှု                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transport endpoint (`mcpEnabled` + `mcpTransport === "sse"` ဖြင့် ထိန်းချုပ်ထားသည်)                   | API key + scope များ           |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamable HTTP transport (`mcp-session-id` header ကို အသုံးပြုသည်၊ `DELETE` သည် session ကို အဆုံးသတ်သည်) | API key + scope များ           |
| `/api/mcp/audit`       | `GET`                 | `mcp_tool_audit` မှ audit log entry များ (filter များ− `limit`, `offset`, `tool`, `success`, `apiKeyId`)  | စီမံခန့်ခွဲမှု                 |
| `/api/mcp/audit/stats` | `GET`                 | စုစည်းထားသော audit စာရင်းအင်းများ (`totalCalls`, `successRate`, `avgDurationMs`, ထိပ်တန်းကိရိယာများ)      | စီမံခန့်ခွဲမှု                 |

အရင်းအမြစ်ဖိုင်များ: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`။

Settings တွင် MCP server ကို ဖွင့်ထားခြင်း (`mcpEnabled`) နှင့် သင့်လျော်သော `mcpTransport` ကို ရွေးချယ်ထားခြင်း မရှိမချင်း SSE နှင့် Streamable HTTP transport နှစ်ခုလုံးကို ပိတ်ဆို့ထားသည်။ မှားယွင်းသော transport ကို ပြင်ဆင်သတ်မှတ်ထားပါက route သည် settings ပြောင်းရန် အကြံပြုချက်နှင့်အတူ HTTP 400 ကို ပြန်ပေးသည်။

---

## အတည်ပြုခြင်းနှင့် Scopes များ

MCP ကိရိယာသည် ခေါ်ဆိုသူထံမှ scope string များကို ဖတ်သည်။ ထိုစစ်ဆေးမှုသည် သီးခြား namespace သုံးခုအနက်မှ တစ်ခုဖြစ်သည်။ စစ်ဆေးသူတစ်ဦးထံမှ အောင်မြင်မှုသည် အခြားသူများထံမှ အောင်မြင်မှုမဟုတ်ပါ။ စည်းမျဉ်းများသည် [Three scope namespaces](#three-scope-namespaces) ဖြစ်သည်။ ကိရိယာ catalog သည် [MCP tool scopes](#mcp-tool-scopes) ဖြစ်သည်။

### Scope namespace သုံးခု

API key ပေါ်ရှိ `manage`၊ MCP ကိရိယာပေါ်ရှိ `read:compression` နှင့် `oma_live_…` access token ပေါ်ရှိ `read` တို့သည် မတူညီသော ခွင့်ပြုချက်သုံးခုဖြစ်သည်။ ပြောင်းလဲနိုင်သော management route သို့ `read` access token ပေးပို့သော ခေါ်ဆိုသူများသည် HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` ကို ရရှိမည်ဖြစ်သည်။ ထိုအဆင့်သည် `scopeSatisfies` ဖြစ်သည်။ ၎င်းသည် MCP table ကို မစစ်ဆေးဘဲ MCP matcher ကလည်း ၎င်းကို မစစ်ဆေးပါ။

| Namespace          | Credential                                                             | Checker                      | အောင်မြင်မှုက ခွင့်ပြုသည်                                        |
| :----------------- | :--------------------------------------------------------------------- | :--------------------------- | :--------------------------------------------------------------- |
| API-key management | `api_keys.scopes`                                                      | `hasManageScope`             | ထို Bearer key အတွက် Management REST                             |
| API-key additive   | တူညီသော array၊ တိကျသော string တစ်ခု                                    | အောက်တွင်ဖော်ပြထားသော helper | ထိုစွမ်းရည်တစ်ခုတည်းသာ                                           |
| MCP tool scopes    | တူညီသော array၊ သို့မဟုတ် MCP `_meta`၊ သို့မဟုတ် `OMNIROUTE_MCP_SCOPES` | `scopeMatches`               | အတည်ပြုခြင်းစတင်သည်နှင့် ထိုကိရိယာ                               |
| Access token       | `oma_live_…`                                                           | `scopeSatisfies`             | ၎င်း၏ method နှင့် path က ထိုအဆင့်ကို လိုအပ်သော management route |

credential တစ်ခုစီကို ထုတ်လုပ်ခြင်းကို [Management Authentication](../guides/MANAGEMENT-AUTH.md) တွင် ဖော်ပြထားသည်။

#### API-key scopes များ

`api_keys.scopes` array တစ်ခုသည် အလုပ်နှစ်ခုကို လုပ်ဆောင်သည်။ ၎င်းတို့သည် မတူညီသော function များကို အသုံးပြုသည်။

**Management REST.** `manage` နှင့် `admin` တို့သည် `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`) ၏ အဖွဲ့ဝင်များဖြစ်သည်။ `hasManageScope` သည် ထို key အတွက် management route များကို ခွင့်ပြုပေးသည်။ `admin` သည် ထို route များပေါ်တွင် management-capable ဖြစ်သည်။ ဤနေရာရှိ `admin` ဟူသော စကားလုံးသည် access-token အဆင့်မဟုတ်ဘဲ MCP tool scope များအဖြစ်သို့ မပြောင်းလဲပါ။

**Additive strings များ။** တစ်ခုစီသည် တိကျသော အဖွဲ့ဝင်စစ်ဆေးမှုဖြစ်ပြီး တစ်ခုစီသည် `MANAGEMENT_API_KEY_SCOPES` အပြင်ဘက်တွင် ရှိနေသည်။

| Scope                          | အောင်မြင်မှုက ခွင့်ပြုသည်                                                                                                                                                         |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | non-loopback `/api/mcp/` LOCAL_ONLY carve-out သာ (`hasMcpConnectOrManageScope`)။ `manage` သို့မဟုတ် `admin` ပါသော key သည် ထို carve-out ကို ဆက်လက်ဖြတ်သန်းသည်။                    |
| `self:usage`                   | ဤ key အတွက် `GET /api/v1/me/status` (`src/app/api/v1/me/status/route.ts`)။ `POST /api/keys` သည် ဖန်တီးချိန်တွင် ဤ scope ကို ထည့်သွင်းသည် (`normalizeSelfServiceScopesForCreate`)။ |
| `self:account-quota`           | ထို status payload အတွင်းရှိ Upstream account quota များ (`src/lib/usage/apiKeySelfService.ts`)။ status route သည် `self:usage` ကို ဆက်လက်လိုအပ်သည်။                               |
| `policy:bypass-provider-quota` | ဤ key ၏ inference call များသည် provider-quota policy ကို ကျော်လွှားသည် (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`)။                                             |

#### ကိုက်ညီခြင်း

catalog သည် [MCP tool scopes](#mcp-tool-scopes) အောက်ရှိ table ဖြစ်သည်။ `src/shared/constants/mcpScopes.ts` ရှိ `MCP_SCOPE_LIST` ကို ထို catalog အဖြစ် မမှတ်ယူပါနှင့်- ၎င်းသည် မူရင်း typed subset ဖြစ်သည်။ နောက်ပိုင်းကိရိယာများသည် ၎င်းဘေးတွင် နောက်ထပ် scope များကို ကြေညာသည် (`read:notion`၊ `read:skills`၊ `read:local-corpus` နှင့် ကျန် table များ)။

`open-sse/mcp-server/scopeEnforcement.ts` ရှိ `evaluateToolScopes` သည် လိုအပ်သော scope တိုင်းသည် ခွင့်ပြုထားသော scope အချို့နှင့် ကိုက်ညီသောအခါ ခေါ်ဆိုမှုကို ခွင့်ပြုသည်-

- `*` သည် လိုအပ်သော scope တိုင်းနှင့် ကိုက်ညီသည်။
- `*` ဖြင့် အဆုံးသတ်သော ခွင့်ပြုထားသော scope သည် ကြယ်ပွင့်မတိုင်မီ prefix ဖြင့် စတင်သော လိုအပ်သော scope နှင့် ကိုက်ညီသည်။ `read:*` သည် `read:compression` နှင့် ကိုက်ညီသည်။
- အခြားခွင့်ပြုထားသော scope တိုင်းသည် တူညီသော လိုအပ်သော string နှင့်သာ ကိုက်ညီသည်။

`["manage"]` ဟူသော scope များပါရှိသော key သည် `read:compression` အတွက် `scopeMatches` ကို မအောင်မြင်ပါ။ `admin`၊ `mcp:connect`၊ `read` နှင့် `write` တို့သည် ခွင့်ပြုထားသော string များသာဖြစ်သောအခါ တူညီသော ခေါ်ဆိုမှုသည် မအောင်မြင်ပါ။ MCP tool scope များအကြားတွင် နောက်ဆုံး `*` မှလွဲ၍ အဆင့်အတန်းမရှိပါ။

`OMNIROUTE_MCP_ENFORCE_SCOPES=true` (default `false`) မဟုတ်ပါက အတည်ပြုခြင်းကို ပိတ်ထားသည်။ ၎င်းကို ပိတ်ထားစဉ် `evaluateToolScopes` သည် ခေါ်ဆိုမှုကို ခွင့်ပြုပြီး catalog ကို ကျော်သွားသည်။ ၎င်းကို ဖွင့်ထားစဉ် HTTP သည် Bearer key ၏ `api_keys.scopes` ကို `authInfo` အဖြစ် အသုံးပြုသည် ([Per-key HTTP scope binding](#per-key-http-scope-binding-7895) ကို ကြည့်ပါ)။ key scope များ မဖြေရှင်းနိုင်သောအခါ ခွင့်ပြုထားသော set သည် MCP `_meta` သို့၊ ထို့နောက် `OMNIROUTE_MCP_SCOPES` သို့ ကျရောက်သည်။

#### Access-token scopes များ

`oma_live_…` token များ (`src/lib/accessTokens/scopes.ts`) သည် `read`၊ `write` သို့မဟုတ် `admin` ကို သယ်ဆောင်သည်။ `scopeSatisfies` သည် အဆင့်တစ်ခုဖြစ်သည်- `admin` သည် `write` နှင့် `read` ကို အကျုံးဝင်ပြီး `write` သည် `read` ကို အကျုံးဝင်သည်။ မသိသော scope များသည် မည်သည့်အရာကိုမျှ အကျုံးမဝင်ပါ။

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) သည် ထိုအဆင့်ကို `inferRequiredScope` (`src/server/authz/accessScopes.ts`) နှင့် နှိုင်းယှဉ်သည်-

- `GET`၊ `HEAD` နှင့် `OPTIONS` တို့သည် `read` ကို လိုအပ်သည်။
- အခြား method တိုင်းသည် `write` ကို လိုအပ်သည်။
- `ADMIN_SCOPE_PREFIXES` ရှိ path များသည် method တိုင်းအတွက် `admin` ကို လိုအပ်သည်။ `/api/mcp` သည် ထိုစာရင်းတွင် ပါဝင်သောကြောင့် `write` access token သည် MCP HTTP surface ကို ခေါ်ဆို၍ မရနိုင်သေးပါ။
- `ADMIN_MUTATION_PREFIXES` ရှိ path များသည် mutation များအတွက်သာ `admin` ကို လိုအပ်သည်။

`PATCH /api/keys/{id}` သည် ပြောင်းလဲမှုတစ်ခုဖြစ်ပြီး ထို admin စာရင်းများတွင် မပါဝင်သောကြောင့် `read` token သည် 403 ကို လက်ခံရရှိသည်
`Access token scope 'read' is insufficient; 'write' required.`
`write` သို့မဟုတ် `admin` access token တစ်ခုသည် ထို route ကို ဖြည့်ဆည်းပေးသည်။ dashboard JWT၊ loopback CLI machine-id token နှင့် `manage` သို့မဟုတ် `admin` ပါသော API key တစ်ခုသည် အခြား branch များသို့ သွားပြီး ဤ rank ဖြင့် ကန့်သတ်မခံရပါ။

`/api/mcp` အတွက် `scopeSatisfies` ကို အောင်မြင်သော access token တစ်ခုသည် စီမံခန့်ခွဲမှု gate ကိုသာ ရှင်းလင်းပြီးဖြစ်သည်။ Tool ခေါ်ဆိုမှုများသည် API-key scopes များနှင့် `scopeMatches` ကို ဆက်လက်၍ လုပ်ဆောင်သည်။ access-token rank သည် `scopeMatches` ၏ input မဟုတ်ပါ။

### MCP tool scopes များ

Scope အကောင်အထည်ဖော်မှုကို `open-sse/mcp-server/scopeEnforcement.ts` တွင် ဗဟိုချုပ်ကိုင်ထားသည်။ tool တစ်ခုစီသည် သီးခြား scopes များ လိုအပ်သည်-

| နယ်ပယ်                | ကိရိယာများ                                                                                                                                                                            |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                     |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                             |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                |
| `read:quota`          | `check_quota`                                                                                                                                                                         |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                |
| `read:models`         | `list_models_catalog`                                                                                                                                                                 |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                         |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                 |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                    |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                           |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                        |
| `read:cache`          | `cache_stats`                                                                                                                                                                         |
| `write:cache`         | `cache_flush`                                                                                                                                                                         |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                            |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                     |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                 |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                      |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                |
| `read:memory`         | `memory_search`                                                                                                                                                                       |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                          |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                    |
| `write:skills`        | `skills_enable`                                                                                                                                                                       |
| `execute:skills`      | `skills_execute`                                                                                                                                                                      |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                      |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                               |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                             |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                      |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                        |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                    |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                       |
| `read:obsidian`       | ဖတ်ရှုရန် ကိရိယာ ၁၃ ခု — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | ရေးသားရန် ကိရိယာ ၉ ခု — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                     |

Wildcard scopes များကို ပံ့ပိုးထားသည်- `read:*` သည် read-scopes အားလုံးကို ခွင့်ပြုပြီး `*` သည် အပြည့်အဝဝင်ရောက်ခွင့်ကို ခွင့်ပြုသည်။

### `mcp:connect` — ကျဉ်းမြောင်းသော လမ်းကြောင်းစွမ်းရည် (#7895)

HTTP/SSE MCP transport (`/api/mcp/*`) ကို non-loopback မှ ရယူရန်အတွက် `/api/mcp/` LOCAL_ONLY carve-out (ကြည့်ရန် `docs/security/ROUTE_GUARD_TIERS.md`) လိုအပ်ပါသည်။ သမိုင်းကြောင်းအရ ထို carve-out သည် `manage`/`admin`-scope API key အပြည့်အစုံကိုသာ လက်ခံခဲ့သည် — MCP နှင့်သာ ဆက်သွယ်ရန် လိုအပ်သော ခေါ်ဆိုသူအတွက် အလွန်ကျယ်ပြန့်သည်။ `src/shared/constants/managementScopes.ts` သည် ယခုအခါ `MCP_CONNECT_SCOPE = "mcp:connect"` ကို export လုပ်သည်- ၎င်းသည် `SELF_USAGE_SCOPE` ကဲ့သို့ပင် ထပ်ပေါင်းနိုင်သော၊ ကျဉ်းမြောင်းသော scope တစ်ခုဖြစ်ပြီး `/api/mcp/` bypass ကို `src/server/authz/policies/management.ts` တွင်သာ ခွင့်ပြုသည် — ၎င်းသည် အခြား management-route ဝင်ရောက်ခွင့်ကို မပေးဘဲ `MANAGEMENT_API_KEY_SCOPES` မှ တမင်တကာ ဖယ်ထုတ်ထားသည်။ `manage`/`admin` ကို ကိုင်ဆောင်ထားသော key သည် carve-out ကို မပြောင်းလဲဘဲ ကျော်ဖြတ်နိုင်ဆဲဖြစ်သည်; `mcp:connect` သည် ဝေးလံခေါင်သီသော MCP-only ခေါ်ဆိုသူများအတွက် အခွင့်အရေးနိမ့်သော ရွေးချယ်စရာတစ်ခုဖြစ်ပြီး `hasMcpConnectOrManageScope()` မှတစ်ဆင့် စစ်ဆေးသည်။

### Key တစ်ခုချင်းစီအတွက် HTTP scope ချိတ်ဆက်မှု (#7895)

HTTP/SSE မှတစ်ဆင့် `open-sse/mcp-server/httpTransport.ts` သည် ခေါ်ဆိုသူ၏ စစ်မှန်သော `api_keys.scopes` ကို `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) မှတစ်ဆင့် ဖြေရှင်းပြီး MCP SDK ၏ `transport.handleRequest(req, { authInfo })` သို့ ပေးပို့သည်။ ထို့ကြောင့် tool call တစ်ခုစီသို့ ရောက်ရှိလာသော `extra.authInfo.scopes` သည် Bearer key ၏ scopes များကို ထင်ဟပ်စေသည်။ `scopeEnforcement.ts` ၏ `resolveCallerScopeContext()` သည် `_meta` နှင့် `OMNIROUTE_MCP_SCOPES` env fallback ထက် `authInfo` ကို ဦးစားပေးပြီးသားဖြစ်သည် — ဤအရာသည် ယခင်က HTTP မှတစ်ဆင့် မရရှိခဲ့သော ပထမဆုံး၊ အမြင့်ဆုံး ဦးစားပေးအရင်းအမြစ်ကိုသာ ဖြည့်ဆည်းပေးသည်။ API key မဖြေရှင်းနိုင်ပါက (header မရှိခြင်း၊ key မမှန်ကန်ခြင်း)၊ `authInfo` သည် `undefined` အဖြစ် ရှိနေမည်ဖြစ်ပြီး ဖြေရှင်းချက်သည် ရှိပြီးသား `meta`/env chain သို့ မပြောင်းလဲဘဲ ဆက်လက်လုပ်ဆောင်မည်ဖြစ်သည်။ ဤအရာသည် `OMNIROUTE_MCP_ENFORCE_SCOPES` ၏ default ကို မပြောင်းလဲပါ — အတင်းအကျပ်လုပ်ဆောင်ခြင်းကို ရှင်းလင်းစွာ ဖွင့်ထားရန် လိုအပ်ဆဲဖြစ်သည်; ဤပြောင်းလဲမှုသည် ၎င်းကို ဖွင့်လိုက်သည်နှင့် key တစ်ခုချင်းစီ၏ လမ်းကြောင်းကို ဦးစားပေးစေရန်သာ ပြုလုပ်သည်။ stdio တွင် ခေါ်ဆိုသူတစ်ဦးချင်းစီ၏ အထောက်အထား (ကြည့်ရန် `mcpCallerIdentity.ts`) မရှိသောကြောင့် မထိခိုက်ပါ — ၎င်းသည် `_meta`/env fallback chain တွင် ဆက်လက်ရှိနေမည်ဖြစ်သည်။

---

## ပတ်ဝန်းကျင် ကိန်းရှင်များ

| ကိန်းရှင်                               | မူလသတ်မှတ်ချက်                    | ရည်ရွယ်ချက်                                                                                                                                    |
| :-------------------------------------- | :-------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`          | အတွင်းပိုင်း OmniRoute API များကို ခေါ်ဆိုသည့်အခါ MCP ဆာဗာက အသုံးပြုသည့် အခြေခံ URL                                                            |
| `OMNIROUTE_API_KEY`                     | (ဗလာ)                             | အတွင်းပိုင်း API ခေါ်ဆိုမှုများသို့ `Authorization: Bearer` အဖြစ် လက်ဆင့်ကမ်းပေးသည့် API သော့                                                  |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` သာ ဖွင့်ပေးသည်) | ဖွင့်ထားသည့်အခါ scope များ မရှိပါက ကိရိယာခေါ်ဆိုမှုများကို ငြင်းပယ်ပြီး စာရင်းစစ်မှတ်တမ်းတွင် `scope_denied:<reason>` ကို မှတ်တမ်းတင်သည်       |
| `OMNIROUTE_MCP_SCOPES`                  | (ဗလာ)                             | မူလအားဖြင့် "ရရှိနိုင်သည်" ဟု ယူဆသော scope များ၏ ကော်မာခြား allowlist (ခေါ်ဆိုသူက ၎င်း၏ကိုယ်ပိုင် scope များကို မပေးသည့်အခါ အသုံးပြုသည်)       |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (မသတ်မှတ်ထား = ဖွင့်ထား)          | `0/false/off/no` ဟု သတ်မှတ်ထားသည့်အခါ မှတ်ပုံတင်ချိန်တွင် MCP ဖော်ပြချက် ချုံ့ခြင်းကို ပိတ်သည်                                                 |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (မသတ်မှတ်ထား = ဖွင့်ထား)          | အထက်ပါ အဖွင့်/အပိတ် ဆက်တင်အတွက် အခြားအမည်                                                                                                      |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                           | အတွင်းပိုင်း စီမံခန့်ခွဲမှုဆိုင်ရာ ဖတ်ရှုမှုများ (ကျန်းမာရေး၊ ခံနိုင်ရည်၊ ပေါင်းစပ်မှုများ၊ quota၊ အသုံးပြုမှု) အတွက် ပယ်ဖျက်ချိန် ကန့်သတ်ချက် |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                           | ပံ့ပိုးသူကို စောင့်ဆိုင်းရသည့် အဆင့်များ (`route_request`, `web_search`, `web_fetch`) အတွက် ပယ်ဖျက်ချိန် ကန့်သတ်ချက်                           |
| `MCP_TOOL_DENY`                         | (မသတ်မှတ်ထား = စစ်ထုတ်မှုမရှိ)    | `tools/list` မှ ဖယ်ရှားရန် ကော်မာခြား ကိရိယာအမည်များ (ကိရိယာအရေအတွက် လျှော့ချခြင်း — အောက်တွင် ကြည့်ပါ)                                        |
| `MCP_TOOL_ALLOW`                        | (မသတ်မှတ်ထား = စစ်ထုတ်မှုမရှိ)    | သီးသန့်ထားရှိမည့် ကော်မာခြား ကိရိယာအမည်များ (allow-list စနစ် — အောက်တွင် ကြည့်ပါ)                                                              |
| `DATA_DIR`                              | `~/.omniroute`                    | Heartbeat ဖိုင်ကို `${DATA_DIR}/runtime/mcp-heartbeat.json` သို့ ရေးသားသည်                                                                     |

---

## ဖော်ပြချက် ချုံ့ခြင်း

MCP ကိရိယာ၊ prompt နှင့် resource registry များသည် client များထံ ဖော်ပြထားသော metadata ပမာဏ (ထို့ကြောင့် prompt context ကုန်ကျစရိတ်) ကို လျှော့ချရန် မှတ်ပုံတင်ချိန်/စာရင်းပြုစုချိန်တွင် ဖော်ပြချက်များကို ချုံ့နိုင်သည်။ အကောင်အထည်ဖော်မှုသည် `open-sse/mcp-server/descriptionCompressor.ts` တွင်ရှိပြီး `createMcpServer()` အတွင်းရှိ `compressMcpRegistryMetadata` မှတစ်ဆင့် MCP ဆာဗာနှင့် ချိတ်ဆက်ထားသည်။

- ဖွဲ့စည်းပုံဆိုင်ရာ အကြောင်းအရာ မပြောင်းလဲစေရန် ထိန်းသိမ်းထားသော block ထုတ်ယူမှု (code span များ၊ fenced block များ စသည်) ဖြင့် Caveman စည်းမျဉ်းအစု (`getRulesForContext("all", "full")`) ကို အသုံးပြုပြီး ဖော်ပြချက်စာသားပေါ်တွင် ချုံ့ခြင်း လုပ်ဆောင်သည်။
- `key_value` ဆက်တင်ဇယားရှိ `compression.mcpDescriptionCompressionEnabled` တန်ဖိုးမှတစ်ဆင့် deployment တစ်ခုချင်းစီအလိုက် အဖွင့်/အပိတ် ပြုလုပ်နိုင်သည် (မူလသတ်မှတ်ချက်- ဖွင့်ထားသည်) — UI တွင် **Analytics → MCP ဖော်ပြချက် ချုံ့ခြင်း** အဖြစ် ဖော်ပြထားသည်။
- `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` သို့မဟုတ် `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` တစ်ခုခုမှတစ်ဆင့် process တစ်ခုလုံးအတွက် အဖွင့်/အပိတ် ပြုလုပ်နိုင်သည်။
- အချိန်နှင့်တစ်ပြေးညီ ကိန်းဂဏန်းများကို `analytics.mcpDescriptionCompression` အောက်ရှိ `omniroute_compression_status` မှတစ်ဆင့် ဖော်ပြပြီး အမှန်တကယ် ပံ့ပိုးသူအသုံးပြုမှု လက်ခံဖြတ်ပိုင်းများနှင့် ခွဲခြားနိုင်ရန် `source: "mcp_metadata_estimate"` ဟု tag တပ်ထားသည်။

---

## Tool အရေအတွက် လျှော့ချခြင်း (F4.3)

ဖော်ပြချက် ချုံ့ခြင်းသည် tool တစ်ခုစီ၏ metadata ကို လျှော့ချပေးသည်။ **tool အရေအတွက် လျှော့ချခြင်း** သည် ကြေညာသည့် tool _အရေအတွက်_ ကိုပါ လျှော့ချခြင်းဖြင့် နောက်တစ်ဆင့်တက်သည်။ `tools/list` manifest တွင် tool များကို လျှော့၍ ဖော်ပြခြင်းသည် tool catalog အတွက် client ၏ model က request တစ်ခုစီတိုင်း ပေးဆောင်ရသည့် token ကုန်ကျစရိတ်ကို လျှော့ချပေးသည် ("layer 5" compression)။ အကောင်အထည်ဖော်ထားမှုသည် `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`) ရှိ အခြေအနေမသိမ်းဆည်းသော filter သီးသန့်ဖြစ်ပြီး `createMcpServer()` (`open-sse/mcp-server/server.ts`) ရှိ registration loop နှင့် ချိတ်ဆက်ထားသည်။

**ရွေးချယ်ဖွင့်ရပြီး ပုံသေအားဖြင့် ပိတ်ထားသည်။** Environment variable နှစ်ခုအနက် အနည်းဆုံးတစ်ခု သတ်မှတ်ထားမှသာ filter အလုပ်လုပ်သည်။ နှစ်ခုလုံး မသတ်မှတ်ထားပါက tool 110 ခုလုံးကို မပြောင်းလဲဘဲ ကြေညာသည်။

| Variable         | မုဒ်                                                                                      |
| :--------------- | :---------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Blacklist — `tools/list` မှ အမြဲဖယ်ရှားမည့် ကော်မာခြား tool အမည်များ                      |
| `MCP_TOOL_ALLOW` | Allow-list — ကော်မာခြား tool အမည်များ၊ ဤအမည်များသာ ကျန်ရှိပြီး အခြားအားလုံးကို ဖယ်ရှားသည် |

`deny` သည် `allow` ထက် ဦးစားပေးသည်။ အမည်များကို ကော်မာဖြင့် ခြားထားပြီး ရှေ့နောက် whitespace များကို ဖယ်ရှားကာ အလွတ် entry များကို လျစ်လျူရှုသည်။ ဥပမာများ-

```bash
# Catalog မှ tool နှစ်ခုကို ဖယ်ရှားရန်
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Routing နှင့် quota tool များကိုသာ ကြေညာရန် (allow-list မုဒ်)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Filter ဖြင့် ရွေးထုတ်ထားသော tool များကို ဖယ်ရှားပုံ-** registration သည် အမြဲအောင်မြင်သည်။ ထို့နောက် profile က ပယ်ချသည့် tool ကို MCP SDK handle ပေါ်တွင် `.disable()` လုပ်သဖြင့် ၎င်းသည် `tools/list` တွင် မည်သည့်အခါမျှ မပေါ်လာသော်လည်း ချိတ်ဆက်မှုမှာ မပျက်ဘဲ ဆက်ရှိနေသည် (သပ်ရပ်သော enable/disable ဖြစ်ပြီး re-registration မလိုပါ)။ Profile parser သည် `readMcpToolProfileFromEnv(process.env)` ဖြစ်ပြီး variable နှစ်ခုလုံး အလွတ်ဖြစ်နေပါက `null` (filter မလုပ်ခြင်း) ကို ပြန်ပေးသည်။

`reduceToolManifest` နောက်ကွယ်ရှိ ပိုမိုပြည့်စုံသော `ToolProfile` ဖွဲ့စည်းပုံသည် scope-intersection filtering (`allowScopes`၊ `read:*` ပုံစံ wildcard matching ဖြင့်) နှင့် တိကျစွာ ထပ်တူရနိုင်သော `maxTools` အများဆုံးကန့်သတ်ချက်ကိုလည်း ပံ့ပိုးသည်။ သို့သော် ထို setting နှစ်ခုသည် registration လုပ်ချိန်တွင် manifest အပြည့်အစုံ လိုအပ်ပြီး ယနေ့တွင် environment variable များမှတစ်ဆင့် **မဖွင့်ပေးထားသေးပါ** (`tools/list` အဆင့် hook တစ်ခုကို နောက်ဆက်တွဲလုပ်ဆောင်ရန် မှတ်တမ်းတင်ထားသည်)။ လျှော့ချခြင်းမပြုမီနှင့် ပြုလုပ်ပြီးနောက် manifest token ကုန်ကျစရိတ်ကို နှိုင်းယှဉ်ရန် `estimateManifestTokens()` ကို အသုံးပြုနိုင်သည်။

---

## Runtime Heartbeat

stdio transport သည် အသက်ဝင်မှုအခြေအနေကို `${DATA_DIR}/runtime/mcp-heartbeat.json` တွင် 5 စက္ကန့်တိုင်း သိမ်းဆည်းသည်။ Dashboard (`/api/mcp/status`) သည် `online` အခြေအနေကို ဆုံးဖြတ်ရန် ဤဖိုင်နှင့် PID အသက်ဝင်မှုကို ဖတ်သည်။ HTTP transport များကမူ in-process `getMcpHttpStatus()` မှ အခြေအနေကို သတင်းပို့သည် (ဖိုင်ရေးသားမှု မရှိပါ)။

Heartbeat snapshot တွင် အောက်ပါတို့ ပါဝင်သည်-

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

## Audit မှတ်တမ်းတင်ခြင်း

Tool ခေါ်ဆိုမှုတိုင်းကို `open-sse/mcp-server/audit.ts` က SQLite `mcp_tool_audit` table တွင် မှတ်တမ်းတင်သည်-

- Tool အမည်၊ argument များ (tool တစ်ခုချင်းစီ၏ `auditLevel` အတိုင်း hash ပြုလုပ်ခြင်း/အတိုချုံ့ခြင်း)၊ ရလဒ်
- ကြာချိန် ms၊ အောင်မြင်/မအောင်မြင် အမှတ်အသား၊ error message (သက်ဆိုင်သည့်အခါ)
- API key hash၊ timestamp
- Scope ပယ်ချမှုများကို လိုအပ်နေသည့် scope စာရင်းနှင့်အတူ `scope_denied:<reason>` အဖြစ် မှတ်တမ်းတင်သည်

မကြာသေးမီက ခေါ်ဆိုမှုများကို စစ်ဆေးရန် dashboard သို့မဟုတ် `/api/mcp/audit` နှင့် `/api/mcp/audit/stats` REST endpoint များကို အသုံးပြုပါ။

---

## ဖိုင်များ

| ဖိုင်                                                                    | ရည်ရွယ်ချက်                                                                                    |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP ဆာဗာ factory၊ stdio entry point နှင့် scope သတ်မှတ်ထားသော tool မှတ်ပုံတင်ခြင်းများ         |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transport (session စီမံခန့်ခွဲမှု)                                       |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Tool scope အကဲဖြတ်ခြင်းနှင့် caller ခွဲခြားသတ်မှတ်ခြင်း                                        |
| `open-sse/mcp-server/audit.ts`                                           | Tool ခေါ်ဆိုမှု audit logging (`mcp_tool_audit`)                                               |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio heartbeat writer (`mcp-heartbeat.json`)                                                  |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Tool / prompt / resource registry များအတွက် ဖော်ပြချက် ချုံ့ခြင်း                              |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod schema များ + tool registry (`MCP_TOOLS`၊ entry 45 ခု)                                     |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Phase 2 + cache + 1proxy tool handler များ                                                     |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | ချုံ့ခြင်း tool handler များ                                                                   |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Memory tool သတ်မှတ်ချက်များ (tool 3 ခု)                                                        |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Skill tool သတ်မှတ်ချက်များ (tool 4 ခု)                                                         |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion context source tool သတ်မှတ်ချက်များ (tool 6 ခု)                                         |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Gamification tool သတ်မှတ်ချက်များ (tool 8 ခု)                                                  |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Plugin မှတ်ပုံတင်ခြင်းနှင့် စီမံခန့်ခွဲမှု tool များ (tool 8 ခု)                               |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` endpoint                                                                     |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` endpoint                                                                      |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE transport route                                                             |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP transport route                                              |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` audit log query                                                               |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` စုစည်းထားသော audit metric များ                                          |
| `src/lib/notion/api.ts`                                                  | Notion REST API client (ပြန်လည်ကြိုးစားခြင်း၊ အချိန်ကုန်ဆုံးမှု၊ error အမျိုးအစားခွဲခြားခြင်း) |
| `src/lib/db/notion.ts`                                                   | Notion token သိမ်းဆည်းထိန်းသိမ်းခြင်း (`key_value` table)                                      |
| `src/app/api/settings/notion/route.ts`                                   | Notion settings API (GET/POST/DELETE)                                                          |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion token စီမံခန့်ခွဲမှု UI                                                                 |
| `tests/unit/notion-api.test.ts`                                          | Notion API client စမ်းသပ်မှုများ (7 ခု)                                                        |
| `tests/unit/notion-tools.test.ts`                                        | Notion tool scope ပြဋ္ဌာန်းမှု စမ်းသပ်ချက်များ (10 ခု)                                         |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB module စမ်းသပ်မှုများ (3 ခု)                                                         |
