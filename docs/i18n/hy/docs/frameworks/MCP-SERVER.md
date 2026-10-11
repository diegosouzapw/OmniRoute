# OmniRoute MCP Server Documentation (Հայերեն)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol սերվեր՝ 110 գործիքներով, որոնք ընդգրկում են երթուղավորումը, քեշը, սեղմումը, հիշողությունը, հմտությունները, պրոքսին, պուլը, Radar-ը և համատեքստի աղբյուրների գործողությունները։
>
> Ճշմարտության աղբյուր՝ `open-sse/mcp-server/server.ts`-ը **110 եզակի գործիք** է հաշվարկում `countUniqueMcpTools()`-ի միջոցով՝ 45 կանոնական սահմանում (ներառյալ CCR-ի կենսացիկլի վեց գործիքները, agent-skills եռյակը, `omniroute_radar_catalog`-ը և `omniroute_x_search`-ը), ինչպես նաև հիշողություն (3), հմտություններ (4), GitHub հմտություններ (3), պուլ (6), խաղայնացում (8), փլագիններ (8), Notion (6), Obsidian (22), տեղային կորպուս (3) և միայն RTK-ի համար նախատեսված սեղմման երկու գործիք։

## Տեղադրում

OmniRoute MCP-ն ներկառուցված է։ Գործարկեք այն հետևյալ կերպ․

```bash
omniroute --mcp
```

Կամ open-sse փոխադրամիջոցի միջոցով․

```bash
# HTTP հոսքային փոխադրամիջոց (պորտ 20130)
omniroute --dev  # MCP-ն ինքնաշխատ գործարկվում է /mcp վերջնակետում
```

HTTP փոխադրամիջոցները (`sse` / `streamable-http`, որոնք նույն գործընթացում սպասարկվում են կառավարման վահանակի սերվերի կողմից) լռելյայն անջատված են և նախկինում հնարավոր էր դրանք միացնել կամ անջատել միայն `/dashboard/mcp` էջից։ v3.8.51-ից սկսած՝ CLI-ն ունի համարժեք գործառույթներ․

```bash
omniroute mcp status                                  # միացված/առցանց լինելը, փոխադրամիջոցը, գործիքների քանակը
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # վերակայում է ակտիվ sse/streamable-http աշխատաշրջանները
```

`mcp enable`/`mcp disable` հրամանները PATCH հարցում են ուղարկում նույն `mcpEnabled` (և, ըստ անհրաժեշտության, `mcpTransport`) կարգավորման համար, որը կառավարման վահանակը փոխում է `/api/settings`-ի միջոցով։ `mcp restart`-ը կանչում է `POST /api/mcp/restart`․ այն դադարեցնում է ակտիվ `sse`/`streamable-http` աշխատաշրջանները, որպեսզի հաջորդ հարցումը մաքուր կերպով վերագործարկվի, վերադարձնում է `409`, եթե MCP-ն անջատված է, և `501՝ `stdio` փոխադրամիջոցի դեպքում (stdio հաճախորդներն իրենք են կառավարում իրենց ենթագործընթացը․ նույն գործընթացում վերագործարկման համար հասանելի բռնակ չկա)։

## Տրանսպորտներ

MCP սերվերը տրամադրում է երեք տրանսպորտ, որոնք բոլորն աշխատում են նույն `createMcpServer()` ֆաբրիկայի հիման վրա․

| Տրանսպորտ         | Որտեղ                                              | Երբ օգտագործել                                                             |
| :---------------- | :------------------------------------------------- | :------------------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                    | IDE ինտեգրումներ (Claude Desktop, Cursor և այլն)                           |
| `sse`             | `POST/GET /api/mcp/sse`՝ `httpTransport`-ի միջոցով | Բրաուզերի/գործակալի հաճախորդներ, որոնց անհրաժեշտ է իրադարձությունների հոսք |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                  | Բազմասեսիա HTTP հաճախորդներ (`mcp-session-id` վերնագիր)                    |

Ակտիվ HTTP տրանսպորտը (`sse` կամ `streamable-http`) ընտրվում է `mcpTransport` կարգավորմամբ։ Տրանսպորտների փոխարկումը փակում է մյուս տրանսպորտի առկա սեսիաները։

### Հեռակա հասանելիություն (manage տիրույթի շրջանցում)

`/api/mcp/*`-ը գտնվում է LOCAL_ONLY մակարդակում (`src/server/authz/routeGuard.ts`)․ լռելյայն դրան հասանելիություն ունեն միայն հետադարձ կապի հոսթերը (`localhost`, `127.0.0.1`, `::1`)։ v3.8.2-ից սկսած՝ ոչ հետադարձ կապի հաճախորդները կարող են միանալ, եթե ներկայացնեն `Authorization: Bearer <api-key>`, որի բանալին ունի `manage` տիրույթը։ Սա թունելի, հակադարձ պրոքսիի կամ հանրային հոսթի անվան միջոցով հեռակա MCP սերվերին հասնելու միակ եղանակն է։

```bash
# Տրամադրեք manage տիրույթը․ բացեք կառավարման վահանակի API Keys էջը և բանալու համար միացրեք
# "Management Access"-ը կամ ստեղծելիս POST հարցմամբ փոխանցեք scopes:["manage"]։

# Այնուհետև միացեք հեռակա MCP հաճախորդից․
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Առանց `manage` տիրույթի բանալին (կամ Bearer-ի բացակայությունը) վերադարձնում է `403 LOCAL_ONLY`։ Հարակից `/api/cli-tools/runtime/*` նախածանցը դիտավորյալ շրջանցելի ՉԷ․ տե՛ս [Երթուղիների պաշտպանության մակարդակներ — manage տիրույթի բացառություն](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)։

## IDE-ի կազմաձևում

Claude Desktop-ի, Cursor-ի, Cline-ի և համատեղելի MCP հաճախորդների կազմաձևման համար տե՛ս [MCP հաճախորդի կազմաձևում](../guides/SETUP_GUIDE.md#mcp-client-configuration) բաժինը։

---

## Հիմնական գործիքներ (14) — Փուլ 1

| Գործիք                          | Թույլտվություններ     | Նկարագրություն                                                                                                                                          |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_get_health`          | `read:health`         | Անխափան աշխատանքի տևողություն, հիշողություն, շղթայի անջատիչներ, հաճախականության սահմանաչափեր, քեշի վիճակագրություն                                      |
| `omniroute_list_combos`         | `read:combos`         | Բոլոր կազմաձևված համակցությունները՝ ռազմավարություններով (ըստ ցանկության՝ չափանիշներով)                                                                 |
| `omniroute_get_combo_metrics`   | `read:combos`         | Որոշակի համակցության արդյունավետության չափանիշները                                                                                                      |
| `omniroute_switch_combo`        | `write:combos`        | Ակտիվացնել կամ ապաակտիվացնել համակցությունը                                                                                                             |
| `omniroute_create_combo`        | `write:combos`        | Ստեղծել վավերացված համակցություն՝ առկա համակցությունների API-ի միջոցով                                                                                  |
| `omniroute_check_quota`         | `read:quota`          | Օգտագործված/ընդհանուր քվոտա, մնացած տոկոսը, վերակայման ժամանակը, թոքենի վիճակը                                                                          |
| `omniroute_route_request`       | `execute:completions` | Ուղարկել զրույցի ավարտման հարցում OmniRoute-ի երթուղավորման միջոցով                                                                                     |
| `omniroute_cost_report`         | `read:usage`          | Ծախսերի հաշվետվություն՝ ըստ ժամանակահատվածի (աշխատաշրջան/օր/շաբաթ/ամիս)                                                                                 |
| `omniroute_list_models_catalog` | `read:models`         | Մոդելների ամբողջական կատալոգը՝ հնարավորություններով, կարգավիճակով և գնագոյացմամբ                                                                        |
| `omniroute_radar_catalog`       | `read:radar`          | Տեղային ստորագրված Radar կատալոգ՝ մատակարարի/ընտանիքի ընտրովի զտիչներով                                                                                 |
| `omniroute_tool_search`         | `read:tools`          | Գտնել գործիքներ գրանցված MCP կատալոգում                                                                                                                 |
| `omniroute_web_search`          | `execute:search`      | Վեբ որոնում՝ կազմաձևված որոնման մատակարարների միջոցով։ Չի ներառում X/Twitter-ը։                                                                         |
| `omniroute_x_search`            | `execute:search`      | Որոնել X-ում xAI/SuperGrok-ի միջոցով կամ ընտրել `xquik-search`՝ Xquik API-ի արդյունքների համար։ Պահանջում է ընտրված հետնամասի նույնականացման տվյալները։ |
| `omniroute_web_fetch`           | `execute:search`      | Ստանալ վեբ բովանդակություն՝ կազմաձևված բովանդակության ստացման մատակարարների միջոցով                                                                     |

## Ընդլայնված գործիքներ (11) — Փուլ 2

| Գործիք                             | Թույլտվություններ                    | Նկարագրություն                                                                                                                         |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Երթուղավորման փորձնական գործարկման մոդելավորում՝ պահուստային անցումների ծառով                                                          |
| `omniroute_set_budget_guard`       | `write:budget`                       | Սեսիայի բյուջե՝ որակի նվազեցման/արգելափակման/ազդանշման գործողությամբ                                                                   |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Կոմբինացիայի ռազմավարության թարմացում կատարման ընթացքում (priority/weighted/auto/և այլն)                                               |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` կայունության նախակարգավորման կիրառում                                                       |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Կոմբինացիայի յուրաքանչյուր մատակարարի իրական ժամանակի փորձարկում՝ վերին հոսքի իրական կանչով                                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | Ըստ մատակարարի չափումներ՝ p50/p95/p99 հապաղմամբ և շղթայի անջատիչի վիճակով                                                              |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Առաջարկել կոմբինացիա՝ ըստ առաջադրանքի տեսակի և բյուջեի/հապաղման սահմանափակումների                                                      |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Բացատրել, թե ինչու հարցումն ուղղորդվեց մատակարարին (գնահատման գործոններ + պահուստային անցումներ)                                       |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Սեսիայի ամբողջական պատկերը՝ ծախս, թոքեններ, առաջատար մոդելներ/մատակարարներ, սխալներ, բյուջեի պաշտպանիչ                                 |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Ախտորոշել (և ըստ ցանկության ինքնաշխատ վերականգնել) տվյալների բազայի շեղումները, օրինակ՝ կոմբինացիաների խափանված հղումները / որբ տողերը |
| `omniroute_sync_pricing`           | `pricing:write`                      | Համաժամեցնել գնագոյացման տվյալներն արտաքին աղբյուրներից (LiteLLM), աջակցում է `dryRun`-ը                                               |

## Քեշի գործիքներ (2)

| Գործիք                  | Թույլտվություններ | Նկարագրություն                                                      |
| :---------------------- | :---------------- | :------------------------------------------------------------------ |
| `omniroute_cache_stats` | `read:cache`      | Իմաստաբանական քեշի, հուշման քեշի և իդեմպոտենտության վիճակագրություն |
| `omniroute_cache_flush` | `write:cache`     | Մաքրել քեշը համընդհանուր կամ ըստ ստորագրության/մոդելի               |

## Սեղմման գործիքներ (13)

| Գործիք                              | Թույլտվություններ   | Նկարագրություն                                                                                                                                   |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Սեղմման կարգավորումներ, վերլուծական ամփոփում և քեշը հաշվի առնող վիճակագրություն (ներառում է `analytics.mcpDescriptionCompression` մետատվյալները) |
| `omniroute_compression_configure`   | `write:compression` | Կարգավորել սեղմման ռեժիմը, շեմը, նպատակային հարաբերակցությունը, համակարգային հուշման պահպանումը և MCP նկարագրության սեղմման փոխարկիչը            |
| `omniroute_set_compression_engine`  | `write:compression` | Ընտրել ակտիվ շարժիչը (off/caveman/rtk/stacked) և Caveman/RTK ինտենսիվությունը                                                                    |
| `omniroute_list_compression_combos` | `read:compression`  | Ցուցադրել անվանակոչված սեղմման կոմբինացիաները և դրանց շարժիչների մշակման շղթաները                                                                |
| `omniroute_compression_combo_stats` | `read:compression`  | Վերլուծություններ՝ խմբավորված ըստ սեղմման կոմբինացիայի և շարժիչի                                                                                 |
| `omniroute_ccr_store`               | `write:compression` | Պահել կանչողից մեկուսացված բովանդակությունը սահմանափակ ներհիշողության CCR պահոցում և վերադարձնել նշիչ ու `ccr://` հղում                          |
| `omniroute_ccr_retrieve`            | `read:compression`  | Առբերել CCR բովանդակությունն ամբողջությամբ կամ սկզբի, վերջի, տողերի, grep-ի և վիճակագրության ռեժիմներով                                          |
| `omniroute_ccr_inspect`             | `read:compression`  | Ստուգել կանչողին պատկանող CCR մետատվյալները՝ առանց բովանդակությունը վերադարձնելու                                                                |
| `omniroute_ccr_list`                | `read:compression`  | Ցուցադրել կանչողին պատկանող CCR բլոկների էջավորված մետատվյալները                                                                                 |
| `omniroute_ccr_delete`              | `write:compression` | Ջնջել կանչողին պատկանող CCR բլոկը                                                                                                                |
| `omniroute_ccr_stats`               | `read:compression`  | Զեկուցել կանչողի շրջանակով հիշողության օգտագործումը, կենսափուլի հաշվիչները և պահոցի սահմանաչափերը                                                |
| `omniroute_rtk_discover`            | `read:compression`  | Հայտնաբերել կրկնվող աղմուկը մասնակցության համաձայնությամբ տրամադրված RTK ելքային նմուշներում                                                     |
| `omniroute_rtk_learn`               | `read:compression`  | Մասնակցության համաձայնությամբ տրամադրված նմուշներից ստեղծել վերանայելի RTK զտիչի սևագիր                                                          |

CCR գրառումները պահվում են միայն հիշողության մեջ և վերագործարկումից հետո անհետանում են։ Յուրաքանչյուր բլոկ սահմանափակված է 2 MiB-ով, յուրաքանչյուր
պրինցիպալ՝ 16 MiB-ով, իսկ համընդհանուր պահոցը՝ 64 MiB-ով։ Գրառումների լռելյայն TTL-ը 24 ժամ է (առավելագույնը՝
յոթ օր)։ MCP-ի միջոցով ամբողջական առբերումը սահմանափակված է 256 KiB-ով․ ավելի մեծ բլոկները շարունակում են հասանելի մնալ
միջակայքային և grep ռեժիմներով։ Պահպանումը, առբերումը, ցուցակագրումը, ստուգումը, ջնջումը և վիճակագրությունը մեկուսացված են ըստ
նույնականացված API բանալու պրինցիպալի։ Աուդիտի գրառումները պարունակում են հեշեր և չափի մետատվյալներ, բայց երբեք՝ բովանդակություն։

`omniroute_compression_status`-ը MCP նկարագրությունների սեղմման մասին առանձին հաղորդում է
`analytics.mcpDescriptionCompression`-ում։ Այդ արժեքները MCP-ի ցուցակման ենթակա
նկարագրությունների (`tools`, `prompts`, `resources` և `resourceTemplates`) մետատվյալների չափի գնահատականներ են․ դրանք մատակարարի օգտագործման
անդորրագրեր չեն և նշված են `source: "mcp_metadata_estimate"`-ով։

### MCP հասանելիության ծառի զտիչ (v3.8.0)

Վերոնշյալ սեղմման գործիքներից առանձին՝ OmniRoute-ը ներառում է հետկատարման զտիչ, որը
սեղմում է MCP դիտարկիչի/հասանելիության գործիքների **գործիքի արդյունքները**՝ նախքան դրանք
գործակալին վերադարձնելը։ Այս զտիչն ինքնին գործիք չէ․ այն թափանցիկ կերպով գործարկվում է գործիքի ցանկացած արդյունքի համար, որը պարունակում է
ծավալուն հասանելիության ծառի կամ դիտարկիչի պատկերի տեքստ (≥2000 նիշ)։

Հիմնական վարքագծերը՝

- ≥30 հաջորդական կրկնվող նույն մակարդակի տողերը միավորում է սկզբի + վերջի ամփոփման մեջ
- Պահպանում է Playwright-ի/համակարգչային կառավարման համար անհրաժեշտ `[ref=eXX]` հղման կետերը
- Չափազանց մեծ տեքստը (>50,000 նիշ) կոշտ կրճատում է՝ ավելացնելով նավիգացիոն հուշում
- Ակնկալվող խնայողությունը՝ **60–80%** դիտարկիչի պատկերի տվյալների ծավալի դեպքում

Կազմաձևում՝ `compression.mcpAccessibility`՝ ընդհանուր կարգավորումներում (միգրացիա 056)։
Իրականացում՝ `open-sse/services/compression/engines/mcpAccessibility/`։
Ամբողջական փաստաթղթերը՝ [Սեղմման շարժիչներ — MCP հասանելիության ծառի զտիչ](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter)։

Այս գործիքների հիմքում ընկած գործարկման ժամանակի սեղմման մոդելի մասին տե՛ս [Սեղմման շարժիչներ](../compression/COMPRESSION_ENGINES.md) և [RTK սեղմում](../compression/RTK_COMPRESSION.md)։

## 1Proxy գործիքներ (3)

| Գործիք                      | Շրջանակներ     | Նկարագրություն                                                                                      |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Ստանալ անվճար պրոքսիներ 1proxy շուկայից (արձանագրության/երկրի/որակի/քանակի սահմանափակման զտիչներով) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Ստանալ հաջորդ հասանելի պրոքսին՝ ըստ ռազմավարության (`random` / `quality` / `sequential`)            |
| `omniroute_oneproxy_stats`  | `read:proxies` | Պուլի վիճակագրություն, համաժամացման կարգավիճակ, բաշխում ըստ արձանագրության և երկրի                  |

## Հիշողության գործիքներ (3)

Սահմանված են `open-sse/mcp-server/tools/memoryTools.ts`-ում։ Նույնականացումն ու շրջանակը կիրառվում են ստանդարտ MCP շրջանակների մշակման շղթայի միջոցով։

| Գործիք                    | Շրջանակներ     | Նկարագրություն                                                                                        |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Որոնել հիշողություններ՝ ըստ հարցման / տեսակի / API բանալու՝ տոկենների բյուջեի սահմանափակմամբ          |
| `omniroute_memory_add`    | `write:memory` | Ավելացնել հիշողության նոր գրառում (`factual` / `episodic` / `procedural` / `semantic`)                |
| `omniroute_memory_clear`  | `write:memory` | Մաքրել API բանալու հիշողությունները՝ ըստ ցանկության զտելով տեսակով կամ `olderThan` ժամանակային նշիչով |

## Հմտությունների գործիքներ (4)

Սահմանված են `open-sse/mcp-server/tools/skillTools.ts`-ում։ Աշխատում են `src/lib/skills/registry` + `src/lib/skills/executor` հիման վրա։

| Գործիք                        | Շրջանակներ       | Նկարագրություն                                                                              |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | Ցուցադրել գրանցված հմտությունները՝ API բանալու, անվան կամ միացված վիճակի ըստ ընտրովի զտմամբ |
| `omniroute_skills_enable`     | `write:skills`   | Միացնել կամ անջատել որոշակի հմտություն՝ ըստ ID-ի                                            |
| `omniroute_skills_execute`    | `execute:skills` | Կատարել հմտությունը տրամադրված մուտքային տվյալներով և վերադարձնել կատարման գրառումը         |
| `omniroute_skills_executions` | `read:skills`    | Ցուցադրել հմտությունների վերջին կատարումների պատմությունը                                   |

## Notion համատեքստի աղբյուր (6)

Սահմանված են `open-sse/mcp-server/tools/notionTools.ts`-ում։ Տոկենը պահվում է `key_value` աղյուսակում՝ `src/lib/db/notion.ts`-ի միջոցով։ REST հաճախորդը գտնվում է `src/lib/notion/api.ts`-ում։ Կարգավորումների API-ն՝ `src/app/api/settings/notion/route.ts`-ում։ Կառավարման վահանակի միջերեսը՝ `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`-ում։

Կարգավորեք ձեր Notion ինտեգրման տոկենը Endpoint կառավարման վահանակի **Համատեքստի աղբյուրներ** ներդիրից կամ REST API-ի միջոցով.

```bash
# Սահմանել տոկենը
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Ստուգել կարգավիճակը
curl http://localhost:20128/api/settings/notion

# Անջատել կապը
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Գործիք                       | Շրջանակներ     | Նկարագրություն                                                              |
| :--------------------------- | :------------- | :-------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Ամբողջական տեքստային որոնում բոլոր էջերում և տվյալների բազաներում           |
| `notion_get_page`            | `read:notion`  | Ստանալ էջն ըստ ID-ի՝ դրա հատկությունների հետ միասին                         |
| `notion_list_block_children` | `read:notion`  | Ցուցադրել էջի կամ բլոկի ենթաբլոկները                                        |
| `notion_query_database`      | `read:notion`  | Հարցում կատարել տվյալների բազայում՝ զտիչներով, դասավորումներով և էջավորմամբ |
| `notion_get_database`        | `read:notion`  | Ստանալ տվյալների բազայի սխեման՝ ըստ ID-ի                                    |
| `notion_append_blocks`       | `write:notion` | Ավելացնել ենթաբլոկներ ծնող բլոկին (առավելագույնը՝ 100 մեկ հարցման համար)    |

## Գործակալի հմտությունների կատալոգի գործիքներ (3)

Սահմանված են `open-sse/mcp-server/tools/agentSkillTools.ts`-ում։ Հիմնված են `src/lib/agentSkills/catalog`-ի վրա։ Այս գործիքները MCP հաճախորդներին և արտաքին գործակալներին հասանելի են դարձնում Agent Skills-ի՝ 45 գրառում պարունակող փաստաթղթերի կատալոգը։ Տիրույթ՝ `read:catalog`։

| Գործիք                            | Տիրույթներ     | Նկարագրություն                                                                                                                                                            |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog` | Թվարկել գործակալի բոլոր 45 հմտությունները՝ ըստ ցանկության կիրառվող `category` (api\|cli) և `area` զտիչներով․ վերադարձնում է մետատվյալները + ծածկույթը                     |
| `omniroute_agent_skills_get`      | `read:catalog` | Ստանալ մեկ հմտության ամբողջական մետատվյալները + SKILL.md-ի բովանդակությունը՝ ըստ կանոնական `id`-ի                                                                         |
| `omniroute_agent_skills_coverage` | `read:catalog` | Ծածկույթի վիճակագրություն․ API-ի 23, CLI-ի 21 և կազմաձևման 1 հմտություններից քանիսի SKILL.md ֆայլերն են առկա ֆայլային համակարգում՝ համեմատած կատալոգի ընդհանուր թվերի հետ |

Ամբողջական կատալոգին և արտաքին գործակալների կողմից դրա օգտագործման եղանակին ծանոթանալու համար տե՛ս [AGENT-SKILLS.md](./AGENT-SKILLS.md)։

## Առնչվող ֆրեյմվորքներ (v3.8.0)

Վերը ներկայացված MCP գործիքների ցանկը (110 եզակի գործիք՝ հաշվարկված `countUniqueMcpTools()`-ի միջոցով) միտումնավոր
սահմանափակված է կատարման ժամանակ երթուղավորման/քեշավորման/սեղմման/հիշողության/հմտությունների/պրոքսիի/համատեքստի աղբյուրի գործողություններով։ Երկու հարակից
ֆրեյմվորքներ մատակարարվում են MCP սերվերի հետ միասին v3.8.0-ում և փաստաթղթավորված են առանձին․

### Ամպային գործակալներ

Ամպային գործակալները պրոցեսից դուրս գործող AI կոդավորման գործակալներ են (codex-cloud, cursor-cloud, devin, jules), որոնք
OmniRoute-ին միացված են LLM մատակարարների համար օգտագործվող նույն կապի մոդելի միջոցով։ Դրանք հասանելի են
իրենց սեփական REST մակերեսով (`/api/v1/agents/*`) և MCP գործիքների կատալոգի մաս **չեն**
— Ամպային գործակալի կանչը չի սպառում MCP տիրույթ։

- Իրականացում՝ `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`)։
- Կենսացիկլ՝ `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`։
- Փաստաթղթեր՝ [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md)։

### Պաշտպանիչ սահմանափակումներ

Պաշտպանիչ սահմանափակումները կատարումից առաջ/հետո կիրառվող զտիչներ են (vision-bridge, pii-masker, prompt-injection),
որոնք կիրառվում են զրույցի մշակման շղթայի ներսում։ Դրանք գործարկվում են նախքան MCP գործիքի/երթուղու շերտին հասնելը
և կառուցվածքավորված խախտումներ են ուղարկում աուդիտի մշակման շղթա․ դրանք չեն կանչվում որպես MCP գործիքներ։

- Իրականացում՝ `src/lib/guardrails/`։
- Փաստաթղթեր՝ [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md)։

Արգելափակված թվացող MCP կանչը կարգաբերելիս ստուգեք և՛ MCP աուդիտի մատյանը
(`scope_denied:*` գրառումները), և՛ պաշտպանիչ սահմանափակումների աուդիտի հետքը․ հարցումը կարող է մերժվել
պաշտպանիչ սահմանափակման կողմից՝ **նախքան** MCP տիրույթի պարտադրման շերտին հասնելը։

---

## REST API վերջնակետեր

| Վերջնակետ              | Մեթոդ                 | Նկարագրություն                                                                                                     | Նույնականացում                       |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------------- | :----------------------------------- |
| `/api/mcp/status`      | `GET`                 | Սերվերի կարգավիճակ՝ կենսունակության ազդանշան, HTTP փոխադրման վիճակ, աուդիտի ակտիվության ամփոփում                   | Կառավարում (նստաշրջան/ադմինիստրատոր) |
| `/api/mcp/tools`       | `GET`                 | Գործիքների կատալոգ (անուն, նկարագրություն, տիրույթներ, փուլ, աղբյուրի վերջնակետեր)                                 | Կառավարում                           |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE փոխադրման վերջնակետ (սահմանափակվում է `mcpEnabled` + `mcpTransport === "sse"` պայմանով)                        | API բանալի + տիրույթներ              |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Հոսքային HTTP փոխադրում (օգտագործում է `mcp-session-id` վերնագիրը․ `DELETE`-ն ավարտում է նստաշրջանը)               | API բանալի + տիրույթներ              |
| `/api/mcp/audit`       | `GET`                 | Աուդիտի մատյանի գրառումներ `mcp_tool_audit`-ից (զտիչներ՝ `limit`, `offset`, `tool`, `success`, `apiKeyId`)         | Կառավարում                           |
| `/api/mcp/audit/stats` | `GET`                 | Աուդիտի համախմբված վիճակագրություն (`totalCalls`, `successRate`, `avgDurationMs`, ամենաշատ օգտագործված գործիքները) | Կառավարում                           |

Աղբյուրային ֆայլեր՝ `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`։

Ե՛վ SSE, և՛ հոսքային HTTP փոխադրումները արգելափակված են, քանի դեռ MCP սերվերը միացված չէ Կարգավորումներում (`mcpEnabled`), և ընտրված չէ համապատասխան `mcpTransport`-ը։ Եթե սխալ փոխադրում է կազմաձևված, երթուղին վերադարձնում է HTTP 400՝ կարգավորումները փոխելու հուշումով։

---

## Նույնականացում և scope-եր

MCP գործիքների կանչերը կարդում են scope տողերը կանչողից։ Այդ ստուգումը երեք անկախ անվանատարածքներից մեկն է։ Մի ստուգիչով անցնելը չի նշանակում անցնել նաև մյուսներով։ Կանոնները նկարագրված են [Scope-երի երեք անվանատարածքներ](#three-scope-namespaces) բաժնում։
Գործիքների կատալոգը ներկայացված է [MCP գործիքների scope-երը](#mcp-tool-scopes) բաժնում։

### Scope-երի երեք անվանատարածքներ

API բանալու `manage`-ը, MCP գործիքի `read:compression`-ը և `oma_live_…` հասանելիության թոքենի `read`-ը երեք տարբեր թույլտվություններ են։ Կանչողները, որոնք փոփոխող կառավարման երթուղուն ուղարկում են `read` հասանելիության թոքեն, ստանում են HTTP 403՝
`Access token scope 'read' is insufficient; 'write' required.`
Այդ աստիճանակարգումը կատարվում է `scopeSatisfies`-ի միջոցով։ Այն չի դիմում MCP աղյուսակին, իսկ MCP համադրիչը չի դիմում դրան։

| Անվանատարածք           | Հավաստագիր                                                      | Ստուգիչ                       | Հաջող ստուգումը թույլ է տալիս                                          |
| :--------------------- | :-------------------------------------------------------------- | :---------------------------- | :--------------------------------------------------------------------- |
| API բանալու կառավարում | `api_keys.scopes`                                               | `hasManageScope`              | Կառավարման REST տվյալ Bearer բանալու համար                             |
| API բանալու հավելում   | նույն զանգվածը, մեկ ճշգրիտ տող                                  | ստորև նշված օժանդակ ֆունկցիան | Միայն այդ մեկ հնարավորությունը                                         |
| MCP գործիքի scope-եր   | նույն զանգվածը, այլապես MCP `_meta`, ապա `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                | Այդ գործիքը՝ ստուգման կիրառումը միացնելուց հետո                        |
| Հասանելիության թոքեն   | `oma_live_…`                                                    | `scopeSatisfies`              | Կառավարման այն երթուղին, որի մեթոդն ու ուղին պահանջում են այդ աստիճանը |

Յուրաքանչյուր հավաստագրի ստեղծումը նկարագրված է
[Կառավարման նույնականացում](../guides/MANAGEMENT-AUTH.md) բաժնում։

#### API բանալու scope-եր

Մեկ `api_keys.scopes` զանգվածը կատարում է երկու գործառույթ։ Դրանք օգտագործում են տարբեր ֆունկցիաներ։

**Կառավարման REST։** `manage`-ը և `admin`-ը
`MANAGEMENT_API_KEY_SCOPES`-ի անդամներն են (`src/shared/constants/managementScopes.ts`)։
`hasManageScope`-ն է լիազորում տվյալ բանալու կառավարման երթուղիները։ `admin`-ը թույլ է տալիս կառավարում իրականացնել այդ երթուղիներում։ Այստեղ `admin` բառը հասանելիության թոքենի աստիճան չէ և չի ընդլայնվում՝ ներառելով MCP գործիքների scope-երը։

**Հավելվող տողեր։** Դրանցից յուրաքանչյուրը ստուգվում է զանգվածին ճշգրիտ անդամակցության միջոցով, և յուրաքանչյուրը մնում է `MANAGEMENT_API_KEY_SCOPES`-ից դուրս։

| Scope                          | Հաջող ստուգումը թույլ է տալիս                                                                                                                                                     |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Միայն ոչ loopback `/api/mcp/` LOCAL_ONLY բացառությունը (`hasMcpConnectOrManageScope`)։ `manage` կամ `admin` ունեցող բանալին նույնպես անցնում է այդ բացառության ստուգումը։         |
| `self:usage`                   | `GET /api/v1/me/status` տվյալ բանալու համար (`src/app/api/v1/me/status/route.ts`)։ `POST /api/keys`-ը ստեղծելիս ավելացնում է այս scope-ը (`normalizeSelfServiceScopesForCreate`)։ |
| `self:account-quota`           | Վերին հոսքի հաշվի քվոտաները՝ այդ կարգավիճակի օգտակար բեռի ներսում (`src/lib/usage/apiKeySelfService.ts`)։ Կարգավիճակի երթուղին շարունակում է պահանջել `self:usage`։               |
| `policy:bypass-provider-quota` | Այս բանալու inference կանչերը շրջանցում են մատակարարի քվոտայի քաղաքականությունը (`hasProviderQuotaBypassScope`՝ `src/sse/handlers/chat.ts`-ում)։                                  |

#### Համադրում

Կատալոգը [MCP գործիքների scope-երը](#mcp-tool-scopes) բաժնի աղյուսակն է։ Մի՛ դիտարկեք `src/shared/constants/mcpScopes.ts`-ի `MCP_SCOPE_LIST`-ը որպես այդ կատալոգ․ այն սկզբնական տիպավորված ենթաբազմությունն է։ Ավելի ուշ ավելացված գործիքներն իրենց կողքին հայտարարում են լրացուցիչ scope-եր (`read:notion`, `read:skills`, `read:local-corpus` և աղյուսակի մնացած scope-երը)։

`open-sse/mcp-server/scopeEnforcement.ts`-ի `evaluateToolScopes`-ը թույլ է տալիս կանչը, երբ յուրաքանչյուր պահանջվող scope համապատասխանում է որևէ տրամադրված scope-ի․

- `*`-ը համապատասխանում է յուրաքանչյուր պահանջվող scope-ի։
- `*`-ով ավարտվող տրամադրված scope-ը համապատասխանում է այն պահանջվող scope-ին, որը սկսվում է աստղանիշին նախորդող նախածանցով։ `read:*`-ը համապատասխանում է `read:compression`-ին։
- Յուրաքանչյուր այլ տրամադրված scope համապատասխանում է միայն նույնական պահանջվող տողին։

Այն բանալին, որի scope-երն են `["manage"]`, չի անցնում `scopeMatches`-ը `read:compression`-ի համար։ Նույն կանչը չի անցնում նաև `admin`, `mcp:connect`, `read` և `write` արժեքների դեպքում, երբ դրանք միակ տրամադրված տողերն են։ MCP գործիքների scope-երի միջև աստիճանակարգ չկա՝ բացի վերջում դրված `*`-ից։

Ստուգման կիրառումն անջատված է, եթե `OMNIROUTE_MCP_ENFORCE_SCOPES=true` չէ (կանխադրված արժեքը՝ `false`)։ Քանի դեռ այն անջատված է, `evaluateToolScopes`-ը թույլ է տալիս կանչը և բաց է թողնում կատալոգի ստուգումը։ Երբ այն միացված է, HTTP-ն օգտագործում է Bearer բանալու `api_keys.scopes`-ը որպես `authInfo` (տե՛ս [HTTP scope-ի կապակցում ըստ բանալու](#per-key-http-scope-binding-7895))։
Երբ բանալու ոչ մի scope չի որոշվում, տրամադրված scope-երի բազմության համար հաջորդաբար օգտագործվում են MCP `_meta`-ն, ապա `OMNIROUTE_MCP_SCOPES`-ը։

#### Հասանելիության թոքենների scope-եր

`oma_live_…` թոքենները (`src/lib/accessTokens/scopes.ts`) պարունակում են `read`, `write` կամ `admin`։ `scopeSatisfies`-ը աստիճանակարգ է․ `admin`-ը ներառում է `write`-ն ու `read`-ը, իսկ `write`-ը՝ `read`-ը։ Անհայտ scope-երը ոչինչ չեն ներառում։

`evaluateAccessTokenAuth`-ը (`src/server/authz/accessTokenAuth.ts`) այդ աստիճանը համեմատում է `inferRequiredScope`-ի հետ (`src/server/authz/accessScopes.ts`)․

- `GET`, `HEAD` և `OPTIONS` մեթոդները պահանջում են `read`։
- Մնացած բոլոր մեթոդները պահանջում են `write`։
- `ADMIN_SCOPE_PREFIXES`-ում գտնվող ուղիները յուրաքանչյուր մեթոդի համար պահանջում են `admin`։ `/api/mcp`-ն այդ ցանկում է, ուստի `write` հասանելիության թոքենը դեռևս չի կարող կանչել MCP HTTP մակերեսը։
- `ADMIN_MUTATION_PREFIXES`-ում գտնվող ուղիները `admin` են պահանջում միայն փոփոխությունների համար։

`PATCH /api/keys/{id}`-ը փոփոխություն է և նշված չէ ադմինիստրատորի այդ ցուցակներում, ուստի
`read` թոքենը ստանում է 403՝
`Access token scope 'read' is insufficient; 'write' required.`
`write` կամ `admin` հասանելիության թոքենը բավարարում է այդ երթուղու պահանջները։ Կառավարման վահանակի JWT-ն,
loopback CLI-ի machine-id թոքենը և `manage` կամ `admin` ունեցող API բանալին
անցնում են այլ ճյուղերով և չեն սահմանափակվում այս աստիճանակարգով։

Հասանելիության թոքենը, որը `/api/mcp`-ի համար անցնում է `scopeSatisfies` ստուգումը, հաղթահարել է
միայն կառավարման դարպասը։ Գործիքների կանչերը դեռևս API բանալու
scope-երի նկատմամբ գործարկում են `scopeMatches`։ Հասանելիության թոքենի աստիճանը `scopeMatches`-ի մուտքային տվյալ չէ։

### MCP գործիքների scope-երը

Scope-երի կիրարկումը կենտրոնացված է `open-sse/mcp-server/scopeEnforcement.ts`-ում։
Յուրաքանչյուր գործիք պահանջում է որոշակի scope-եր.

| Տիրույթ               | Գործիքներ                                                                                                                                                                         |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                 |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                         |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                            |
| `read:quota`          | `check_quota`                                                                                                                                                                     |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                            |
| `read:models`         | `list_models_catalog`                                                                                                                                                             |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                     |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                             |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                       |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                    |
| `read:cache`          | `cache_stats`                                                                                                                                                                     |
| `write:cache`         | `cache_flush`                                                                                                                                                                     |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                        |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                 |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                             |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                  |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                            |
| `read:memory`         | `memory_search`                                                                                                                                                                   |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                      |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                |
| `write:skills`        | `skills_enable`                                                                                                                                                                   |
| `execute:skills`      | `skills_execute`                                                                                                                                                                  |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                  |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                           |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                         |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                  |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                    |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                   |
| `read:obsidian`       | Կարդալու 13 գործիք — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | Գրելու 9 գործիք — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                  |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                 |

Փոխարինման նշանով հասանելիության շրջանակներն աջակցվում են. `read:*`-ը տրամադրում է կարդալու բոլոր շրջանակները, իսկ `*`-ը՝ լիարժեք հասանելիություն։

### `mcp:connect` — սահմանափակ երթուղային հնարավորություն (#7895)

Ոչ loopback հասցեից HTTP/SSE MCP փոխադրամիջոցին (`/api/mcp/*`) հասնելու համար անհրաժեշտ է
`/api/mcp/` LOCAL_ONLY բացառությունը (տե՛ս `docs/security/ROUTE_GUARD_TIERS.md`)։ Նախկինում
այդ բացառությունն ընդունում էր միայն ամբողջական `manage`/`admin` շրջանակով API բանալի, ինչը չափազանց լայն հասանելիություն էր այն
կանչողի համար, որին միայն MCP-ի հետ հաղորդակցվել է անհրաժեշտ։ Այժմ `src/shared/constants/managementScopes.ts`-ը
արտահանում է `MCP_CONNECT_SCOPE = "mcp:connect"`՝ լրացուցիչ, սահմանափակ շրջանակ (`SELF_USAGE_SCOPE`-ի
նույն նախադեպով), որը լիազորում է ՄԻԱՅՆ շրջանցել `/api/mcp/` սահմանափակումը
`src/server/authz/policies/management.ts`-ում. այն կառավարման որևէ այլ երթուղու հասանելիություն
չի տրամադրում և միտումնավոր ներառված ՉԷ `MANAGEMENT_API_KEY_SCOPES`-ում։ `manage`/`admin`
ունեցող բանալին նախկինի պես անցնում է այդ բացառությամբ. `mcp:connect`-ը նվազ արտոնություններով այլընտրանք է
միայն հեռակա MCP կանչողների համար և ստուգվում է `hasMcpConnectOrManageScope()`-ի միջոցով։

### Յուրաքանչյուր բանալուն HTTP շրջանակի կապակցում (#7895)

HTTP/SSE-ի միջոցով աշխատելիս `open-sse/mcp-server/httpTransport.ts`-ն այժմ
`resolveMcpCallerAuthInfo()`-ի (`open-sse/mcp-server/httpAuthContext.ts`) միջոցով որոշում է կանչողի իրական
`api_keys.scopes`-ը և այն փոխանցում MCP SDK-ի `transport.handleRequest(req, { authInfo })`-ին, որպեսզի
յուրաքանչյուր գործիքի կանչին հասնող `extra.authInfo.scopes`-ն արտացոլի Bearer բանալու սեփական շրջանակները։
`scopeEnforcement.ts`-ի `resolveCallerScopeContext()`-ն արդեն առաջնահերթություն էր տալիս `authInfo`-ին՝
`_meta`-ի և `OMNIROUTE_MCP_SCOPES` միջավայրային փոփոխականի պահուստային տարբերակի նկատմամբ. այս փոփոխությունը պարզապես լրացնում է այդ առաջին՝
ամենաբարձր առաջնահերթություն ունեցող աղբյուրը, որը նախկինում HTTP-ի միջոցով տվյալներ չէր ստանում։ Երբ որևէ API բանալի չի որոշվում
(վերնագիր չկա, կամ բանալին անվավեր է), `authInfo`-ն մնում է `undefined`, և որոշումը նախկինի պես անցնում է
գոյություն ունեցող `meta`/միջավայրային փոփոխականների շղթային։ stdio-ն յուրաքանչյուր կանչողի առանձին նույնականացում չունի (տե՛ս
`mcpCallerIdentity.ts`) և չի փոփոխվել. այն շարունակում է օգտագործել `_meta`/միջավայրային փոփոխականների պահուստային շղթան։

**Սահմանափակ շրջանակով HTTP/SSE կանչողների համար կիրառումը պարտադիր է՝ անկախ
`OMNIROUTE_MCP_ENFORCE_SCOPES`-ից։** `OMNIROUTE_MCP_ENFORCE_SCOPES`-ի լռելյայն `false` արժեքն անվտանգ է միայն
տեղային/stdio՝ մեկ օպերատորով աշխատանքի հոսքի համար, որտեղ չկա յուրաքանչյուր կանչողի առանձին նույնականացում, որի նկատմամբ հնարավոր է շրջանակ կիրառել։
`open-sse/mcp-server/server.ts::withScopeEnforcement()`-ը յուրաքանչյուր գործիքի համար շրջանակի
կիրառումը միացնում է անվերապահորեն (`scopeEnforcement.ts`-ի `shouldForceScopeEnforcement()`),
երբ `resolveCallerScopeContext()`-ը որոշել է
`source === "authInfo"` (այսինքն՝ յուրաքանչյուր բանալուն համապատասխանող իրական HTTP Authorization վերնագիր, միայն HTTP/SSE-ի համար), ԵՎ այդ
բանալին չունի ամբողջական `manage`/`admin` շրջանակ։ Սա փակում է այն բացը, որի պատճառով ՄԻԱՅՆ
սահմանափակ `mcp:connect` շրջանցման շրջանակն ունեցող բանալին, որը վերևում նկարագրված է որպես միայն
`/api/mcp/` LOCAL_ONLY բացառությունը լիազորող, հակառակ դեպքում կարող էր կանչել MCP-ի բոլոր գործիքները, երբ օպերատորը
միացներ հեռակա/ոչ loopback MCP հասանելիությունը՝ պարզապես այն պատճառով, որ `OMNIROUTE_MCP_ENFORCE_SCOPES`-ը
լռելյայն տրամադրվում է `false` արժեքով։ HTTP-ի միջոցով օգտագործվող ամբողջական `manage`/`admin` բանալու և յուրաքանչյուր stdio/տեղային կանչողի համար
`OMNIROUTE_MCP_ENFORCE_SCOPES`-ով կառավարվող առկա վարքագիծը մնում է անփոփոխ։

---

## Միջավայրի փոփոխականներ

| Փոփոխական                               | Լռելյայն արժեք                            | Նպատակ                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :-------------------------------------- | :---------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                  | Հիմնական URL-ը, որն MCP սերվերն օգտագործում է OmniRoute-ի ներքին API-ները կանչելիս                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_API_KEY`                     | (դատարկ)                                  | API բանալին, որը ներքին API կանչերին փոխանցվում է որպես `Authorization: Bearer`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (միայն `"true"`-ն է այն միացնում) | Միացված լինելու դեպքում բացակայող տիրույթները մերժում են գործիքների կանչերը և աուդիտի մատյանում գրանցում `scope_denied:<reason>`։ Կիրարկումը ՆԱԵՎ հարկադրաբար միացվում է՝ անկախ այս դրոշակից, յուրաքանչյուր HTTP/SSE կանչողի համար, որը որոշվել է ըստ առանձին բանալու Authorization վերնագրի (`source === "authInfo"`) և չունի ամբողջական `manage`/`admin` տիրույթ, օրինակ՝ բանալի, որն ունի միայն նեղ `mcp:connect` շրջանցման տիրույթը։ Ուստի այս լռելյայն արժեքն անվտանգ է միայն տեղային/stdio՝ մեկ օպերատորով աշխատանքի համար և երբեք՝ հեռակա ոչ loopback հասանելիության դեպքում |
| `OMNIROUTE_MCP_SCOPES`                  | (դատարկ)                                  | Ստորակետերով բաժանված տիրույթների թույլատրացուցակ, որոնք լռելյայն համարվում են «հասանելի» (օգտագործվում է, երբ կանչողը չի տրամադրում սեփական տիրույթները)                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (սահմանված չէ = միացված է)                | `0/false/off/no` արժեքներից մեկի սահմանման դեպքում անջատում է MCP նկարագրությունների սեղմումը գրանցման պահին                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (սահմանված չէ = միացված է)                | Վերոնշյալ նույն փոխարկիչի այլընտրանքային անունը                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                   | Ներքին կառավարման ընթերցումների ընդհատման ժամանակային սահմանաչափը (առողջական վիճակ, կայունություն, համակցություններ, քվոտա, օգտագործում)                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                   | Մատակարարի պատասխանին սպասող անցումների ընդհատման ժամանակային սահմանաչափը (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `MCP_TOOL_DENY`                         | (սահմանված չէ = զտիչ չկա)                 | Ստորակետերով բաժանված գործիքների անուններ, որոնք պետք է հեռացվեն `tools/list`-ից (գործիքների քանակի կրճատում — տե՛ս ստորև)                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `MCP_TOOL_ALLOW`                        | (սահմանված չէ = առանց զտման)              | Ստորակետերով բաժանված գործիքների անուններ, որոնք պետք է բացառապես պահպանվեն (թույլատրման ցանկի ռեժիմ — տե՛ս ստորև)                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `DATA_DIR`                              | `~/.omniroute`                            | Սրտազարկի ֆայլը գրվում է `${DATA_DIR}/runtime/mcp-heartbeat.json` ուղու վրա                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

---

## Նկարագրությունների սեղմում

MCP գործիքների, հուշումների և ռեսուրսների ռեեստրները կարող են գրանցման/ցուցակման պահին սեղմել նկարագրությունները՝ հաճախորդներին ներկայացվող մետատվյալների ծավալը (և, հետևաբար, հուշման համատեքստի արժեքը) նվազեցնելու համար։ Իրականացումը գտնվում է `open-sse/mcp-server/descriptionCompressor.ts`-ում և MCP սերվերին միացված է `createMcpServer()`-ի ներսում գտնվող `compressMcpRegistryMetadata`-ի միջոցով։

- Սեղմումը կիրառվում է նկարագրության տեքստի նկատմամբ՝ օգտագործելով Caveman կանոնների հավաքածուն (`getRulesForContext("all", "full")`) և պահպանվող բլոկների առանձնացումը (կոդի ներտողային հատվածներ, սահմանազատված բլոկներ և այլն), որպեսզի կառուցվածքային բովանդակությունը չփոփոխվի։
- Յուրաքանչյուր տեղակայման համար այն փոխարկեք `key_value` կարգավորումների աղյուսակում գտնվող `compression.mcpDescriptionCompressionEnabled` արժեքի միջոցով (լռելյայն՝ միացված)։ Օգտագործողի միջերեսում այն հասանելի է որպես **Վերլուծություն → MCP նկարագրությունների սեղմում**։
- Ամբողջ գործընթացի համար այն փոխարկեք կամ `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false`, կամ `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false` միջոցով։
- Իրական ժամանակի վիճակագրությունը հասանելի է `omniroute_compression_status`-ի միջոցով՝ `analytics.mcpDescriptionCompression`-ի ներքո, և պիտակավորված է `source: "mcp_metadata_estimate"`՝ այն մատակարարի իրական օգտագործման անդորրագրերից տարբերակելու համար։

---

## Գործիքների քանակի կրճատում (F4.3)

Նկարագրության սեղմումը փոքրացնում է յուրաքանչյուր գործիքի մետատվյալները, իսկ **գործիքների քանակի կրճատումը** մեկ քայլ առաջ է գնում՝ նվազեցնելով ընդհանրապես հայտարարվող գործիքների _քանակը_։ `tools/list` մանիֆեստում ավելի քիչ գործիքներ ներկայացնելը նվազեցնում է յուրաքանչյուր հարցման համար գործիքների կատալոգի պատճառով հաճախորդի մոդելի կրած թոքենային ծախսը («շերտ 5» սեղմում)։ Իրականացումը մաքուր, վիճակ չպահպանող զտիչ է `open-sse/mcp-server/toolCardinality.ts`-ում (`reduceToolManifest`), որը միացված է `createMcpServer()`-ի (`open-sse/mcp-server/server.ts`) գրանցման ցիկլին։

**Միացվում է ըստ ցանկության, լռելյայն անջատված է։** Զտիչը գործարկվում է միայն այն դեպքում, երբ սահմանված է միջավայրի երկու փոփոխականներից առնվազն մեկը․ եթե ոչ մեկը սահմանված չէ, բոլոր 110 գործիքները հայտարարվում են անփոփոխ։

| Փոփոխական        | Ռեժիմ                                                                                                                      |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Սև ցուցակ — ստորակետերով բաժանված գործիքների անուններ, որոնք միշտ հեռացվում են `tools/list`-ից                             |
| `MCP_TOOL_ALLOW` | Թույլատրվածների ցուցակ — ստորակետերով բաժանված գործիքների անուններ․ պահպանվում են միայն դրանք, մնացած ամեն ինչ հեռացվում է |

`deny`-ն առաջնահերթ է `allow`-ի նկատմամբ։ Անունները բաժանվում են ստորակետերով, դրանց եզրային բացատները հեռացվում են, իսկ դատարկ գրառումները՝ անտեսվում։ Օրինակներ՝

```bash
# Կատալոգից հեռացնել երկու գործիք
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Հայտարարել միայն երթուղավորման և քվոտայի գործիքները (թույլատրվածների ցուցակի ռեժիմ)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Ինչպես են զտված գործիքները հեռացվում․** գրանցումը միշտ հաջողվում է, իսկ պրոֆիլի կողմից մերժված գործիքն այնուհետև MCP SDK-ի բռնիչի վրա `.disable()` է արվում, ուստի այն երբեք չի հայտնվում `tools/list`-ում, սակայն կապակցումը մնում է անփոփոխ (մաքուր միացում/անջատում՝ առանց վերագրանցման)։ Պրոֆիլի վերլուծիչը `readMcpToolProfileFromEnv(process.env)`-ն է, որը վերադարձնում է `null` (առանց զտման), երբ երկու փոփոխականներն էլ դատարկ են։

`reduceToolManifest`-ի հիմքում ընկած ավելի հարուստ `ToolProfile` կառուցվածքը նաև աջակցում է շրջանակների հատմամբ զտմանը (`allowScopes`՝ `read:*`-ի նման ձևանմուշային համընկմամբ) և որոշակի արդյունք ապահովող `maxTools` սահմանաչափին, սակայն այս երկու կարգավորիչներն էլ գրանցման պահին պահանջում են ամբողջական մանիֆեստը և այսօր միջավայրի փոփոխականների միջոցով **հասանելի չեն** (`tools/list` մակարդակի hook-ը գրանցված հետագա աշխատանք է)։ `estimateManifestTokens()`-ը հասանելի է՝ կրճատումից առաջ և հետո մանիֆեստի թոքենային ծախսը համեմատելու համար։

---

## Կատարման միջավայրի կենսունակության ազդանշան

stdio փոխադրամիջոցը յուրաքանչյուր 5 վայրկյանը մեկ կենսունակության վիճակը պահպանում է `${DATA_DIR}/runtime/mcp-heartbeat.json`-ում։ Կառավարման վահանակը (`/api/mcp/status`) կարդում է այս ֆայլը և ստուգում PID-ի կենսունակությունը՝ `online` վիճակը որոշելու համար։ Փոխարենը HTTP փոխադրամիջոցները վիճակը հաղորդում են պրոցեսի ներսում գործող `getMcpHttpStatus()`-ից (առանց ֆայլում գրելու)։

Կենսունակության ազդանշանի ակնթարթային պատկերը պարունակում է՝

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

## Աուդիտային մատյանավորում

Յուրաքանչյուր գործիքի կանչ գրանցվում է SQLite-ի `mcp_tool_audit` աղյուսակում՝ `open-sse/mcp-server/audit.ts`-ի միջոցով․

- Գործիքի անունը, արգումենտները (հեշավորված/կրճատված՝ ըստ յուրաքանչյուր գործիքի `auditLevel`-ի), արդյունքը
- Տևողությունը մվ-ով, հաջողության/ձախողման դրոշը, սխալի հաղորդագրությունը (կիրառելի լինելու դեպքում)
- API բանալու հեշը, ժամանակի դրոշմը
- Շրջանակի պատճառով մերժումները գրանցվում են որպես `scope_denied:<reason>`՝ բացակայող շրջանակների ցանկով

Վերջին կանչերը դիտելու համար օգտագործեք կառավարման վահանակը կամ `/api/mcp/audit` և `/api/mcp/audit/stats` REST վերջնակետերը։

---

## Ֆայլեր

| Ֆայլ                                                                     | Նպատակ                                                                                             |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP սերվերի ֆաբրիկա, stdio մուտքի կետ, գործողության տիրույթով սահմանափակված գործիքների գրանցումներ |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP փոխադրում (աշխատաշրջանների կառավարում)                                       |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Գործիքների գործողության տիրույթի գնահատում և կանչողի որոշում                                       |
| `open-sse/mcp-server/audit.ts`                                           | Գործիքների կանչերի աուդիտի գրանցում (`mcp_tool_audit`)                                             |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio կենսունակության ազդանշանի գրանցիչ (`mcp-heartbeat.json`)                                     |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Գործիքների / հուշումների / ռեսուրսների ռեեստրների նկարագրությունների սեղմում                       |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod սխեմաներ + գործիքների ռեեստր (`MCP_TOOLS`, 45 տարր)                                            |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Փուլ 2-ի + քեշի + 1proxy գործիքների մշակիչներ                                                      |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Սեղմման գործիքների մշակիչներ                                                                       |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Հիշողության գործիքների սահմանումներ (3 գործիք)                                                     |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Հմտությունների գործիքների սահմանումներ (4 գործիք)                                                  |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion համատեքստային աղբյուրի գործիքների սահմանումներ (6 գործիք)                                   |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Խաղայնացման գործիքների սահմանումներ (8 գործիք)                                                     |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Փլագինների գրանցման և կառավարման գործիքներ (8 գործիք)                                              |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` վերջնակետ                                                                        |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` վերջնակետ                                                                         |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE փոխադրման երթուղի                                                               |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP փոխադրման երթուղի                                                |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` աուդիտի մատյանի հարցում                                                           |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` ագրեգացված աուդիտի չափորոշիչներ                                             |
| `src/lib/notion/api.ts`                                                  | Notion REST API հաճախորդ (կրկնափորձ, ժամանակի սպառման սահմանաչափ, սխալների դասակարգում)            |
| `src/lib/db/notion.ts`                                                   | Notion թոքենի պահպանում (`key_value` աղյուսակ)                                                     |
| `src/app/api/settings/notion/route.ts`                                   | Notion կարգավորումների API (GET/POST/DELETE)                                                       |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion թոքենի կառավարման օգտատիրոջ միջերես                                                         |
| `tests/unit/notion-api.test.ts`                                          | Notion API հաճախորդի թեստեր (7)                                                                    |
| `tests/unit/notion-tools.test.ts`                                        | Notion գործիքների գործողության տիրույթի կիրառման թեստեր (10)                                       |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB մոդուլի թեստեր (3)                                                                       |
