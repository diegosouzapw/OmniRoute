# OmniRoute MCP Server Documentation (ქართული)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol-ის სერვერი 110 ხელსაწყოთი მარშრუტიზაციის, ქეშის, შეკუმშვის, მეხსიერების, უნარების, პროქსის, პულის, Radar-ისა და კონტექსტის წყაროს ოპერაციებისთვის.
>
> ჭეშმარიტების წყარო: `open-sse/mcp-server/server.ts` **110 უნიკალურ ხელსაწყოს** ითვლის `countUniqueMcpTools()`-ის გამოყენებით: 45 კანონიკური განსაზღვრება (მათ შორის, CCR-ის სასიცოცხლო ციკლის ექვსი ხელსაწყო, აგენტის უნარების სამეული, `omniroute_radar_catalog` და `omniroute_x_search`), ასევე მეხსიერება (3), უნარები (4), GitHub-ის უნარები (3), პული (6), გემიფიკაცია (8), მოდულები (8), Notion (6), Obsidian (22), ლოკალური კორპუსი (3) და მხოლოდ RTK-ისთვის განკუთვნილი შეკუმშვის ორი ხელსაწყო.

## ინსტალაცია

OmniRoute MCP ჩაშენებულია. გაუშვით შემდეგი ბრძანებით:

```bash
omniroute --mcp
```

ან open-sse ტრანსპორტის მეშვეობით:

```bash
# HTTP ნაკადური ტრანსპორტი (პორტი 20130)
omniroute --dev  # MCP ავტომატურად გაეშვება /mcp საბოლოო წერტილზე
```

HTTP ტრანსპორტები (`sse` / `streamable-http`, რომლებსაც dashboard-ის სერვერი იმავე პროცესში ემსახურება)
ნაგულისხმევად გამორთულია და ადრე მათი გადართვა მხოლოდ `/dashboard/mcp` გვერდიდან იყო შესაძლებელი. v3.8.51-დან
CLI-საც იგივე შესაძლებლობები აქვს:

```bash
omniroute mcp status                                  # ჩართულია/ონლაინია, ტრანსპორტი, ხელსაწყოების რაოდენობა
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # აქტიური sse/streamable-http სესიების გადატვირთვა
```

`mcp enable`/`mcp disable` PATCH მეთოდით ცვლის იმავე `mcpEnabled` პარამეტრს (და სურვილისამებრ `mcpTransport`-საც),
რომელსაც dashboard `/api/settings`-ის მეშვეობით გადართავს. `mcp restart` იძახებს `POST /api/mcp/restart`-ს: ის
წყვეტს აქტიურ `sse`/`streamable-http` სესიებს, რათა შემდეგი მოთხოვნისას ინიციალიზაცია სუფთად მოხდეს, აბრუნებს
`409`-ს, თუ MCP გამორთულია, და `501`-ს `stdio` ტრანსპორტისთვის (`stdio` კლიენტები თავად მართავენ საკუთარ
ქვეპროცესს — იმავე პროცესში არ არსებობს დესკრიპტორი, რომლის გადატვირთვაც შესაძლებელი იქნებოდა).

## ტრანსპორტები

MCP სერვერი უზრუნველყოფს სამ ტრანსპორტს, რომელთაგან ყველა ერთსა და იმავე `createMcpServer()` ფაბრიკას ეფუძნება:

| ტრანსპორტი        | მდებარეობა                                           | გამოყენების შემთხვევა                                              |
| :---------------- | :--------------------------------------------------- | :----------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                      | IDE-სთან ინტეგრაციები (Claude Desktop, Cursor და ა.შ.)             |
| `sse`             | `POST/GET /api/mcp/sse` `httpTransport`-ის მეშვეობით | ბრაუზერის/აგენტის კლიენტები, რომლებსაც მოვლენების ნაკადი სჭირდებათ |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                    | მრავალსესიანი HTTP კლიენტები (`mcp-session-id` სათაური)            |

აქტიური HTTP ტრანსპორტი (`sse` ან `streamable-http`) აირჩევა `mcpTransport` პარამეტრით. ტრანსპორტის შეცვლა სხვა ტრანსპორტზე არსებულ სესიებს ხურავს.

### დისტანციური წვდომა (manage-მოქმედების სფეროს გამონაკლისი)

`/api/mcp/*` მიეკუთვნება LOCAL_ONLY დონეს (`src/server/authz/routeGuard.ts`) — ნაგულისხმევად მასზე წვდომა მხოლოდ უკუკავშირის ჰოსტებს (`localhost`, `127.0.0.1`, `::1`) აქვთ. v3.8.2-დან მოყოლებული, სხვა კლიენტებს დაკავშირება შეუძლიათ, თუ წარადგენენ `Authorization: Bearer <api-key>`-ს, რომლის გასაღებსაც `manage` მოქმედების სფერო აქვს მინიჭებული. ეს ერთადერთი გზაა დისტანციურ MCP სერვერთან გვირაბის, უკუ პროქსის ან საჯარო ჰოსტის სახელის მეშვეობით დასაკავშირებლად.

```bash
# manage მოქმედების სფეროს მინიჭება: გახსენით მართვის პანელში API Keys-ის გვერდი და გასაღებისთვის ჩართეთ
# "Management Access", ან შექმნისას POST მოთხოვნით გადასცით scopes:["manage"].

# შემდეგ დაუკავშირდით დისტანციური MCP კლიენტიდან:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

გასაღები `manage` მოქმედების სფეროს გარეშე (ან Bearer-ის არარსებობა) აბრუნებს `403 LOCAL_ONLY`-ს. მომიჯნავე პრეფიქსისთვის `/api/cli-tools/runtime/*` გამონაკლისის დაშვება განზრახ შეუძლებელია — იხილეთ [Route Guard-ის დონეები — manage-მოქმედების სფეროს გამონაკლისი](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE-ის კონფიგურაცია

Claude Desktop-ის, Cursor-ის, Cline-ისა და თავსებადი MCP კლიენტების გამართვისთვის იხილეთ [MCP კლიენტის კონფიგურაცია](../guides/SETUP_GUIDE.md#mcp-client-configuration).

---

## ძირითადი ხელსაწყოები (14) — ფაზა 1

| ხელსაწყო                        | წვდომის სფეროები      | აღწერა                                                                                                                                             |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | უწყვეტი მუშაობის დრო, მეხსიერება, ავტომატური ამომრთველები, სიხშირის ლიმიტები, კეშის სტატისტიკა                                                     |
| `omniroute_list_combos`         | `read:combos`         | ყველა კონფიგურირებული კომბო სტრატეგიებთან ერთად (არასავალდებულო მეტრიკები)                                                                         |
| `omniroute_get_combo_metrics`   | `read:combos`         | კონკრეტული კომბოს წარმადობის მეტრიკები                                                                                                             |
| `omniroute_switch_combo`        | `write:combos`        | კომბოს გააქტიურება ან დეაქტივაცია                                                                                                                  |
| `omniroute_create_combo`        | `write:combos`        | ვალიდირებული კომბოს შექმნა არსებული კომბოს API-ის მეშვეობით                                                                                        |
| `omniroute_check_quota`         | `read:quota`          | გამოყენებული/სრული კვოტა, დარჩენილი პროცენტი, განულების დრო, ტოკენის მდგომარეობა                                                                   |
| `omniroute_route_request`       | `execute:completions` | ჩატის დასრულების მოთხოვნის გაგზავნა OmniRoute-ის მარშრუტიზაციის მეშვეობით                                                                          |
| `omniroute_cost_report`         | `read:usage`          | ხარჯების ანგარიში პერიოდის მიხედვით (სესია/დღე/კვირა/თვე)                                                                                          |
| `omniroute_list_models_catalog` | `read:models`         | მოდელების სრული კატალოგი შესაძლებლობებით, სტატუსითა და ფასებით                                                                                     |
| `omniroute_radar_catalog`       | `read:radar`          | ლოკალური, ხელმოწერილი Radar-ის კატალოგი; პროვაიდერის/ოჯახის არასავალდებულო ფილტრები                                                                |
| `omniroute_tool_search`         | `read:tools`          | ხელსაწყოების აღმოჩენა რეგისტრირებული MCP კატალოგიდან                                                                                               |
| `omniroute_web_search`          | `execute:search`      | ვებში ძიება კონფიგურირებული საძიებო პროვაიდერების მეშვეობით. არა X/Twitter-ში.                                                                     |
| `omniroute_x_search`            | `execute:search`      | X-ში ძიება xAI/SuperGrok-ის მეშვეობით, ან Xquik API-ის შედეგებისთვის აირჩიეთ `xquik-search`. არჩეული ბეკენდისთვის საჭიროა ავტორიზაციის მონაცემები. |
| `omniroute_web_fetch`           | `execute:search`      | ვებკონტენტის მიღება კონფიგურირებული მიღების პროვაიდერების მეშვეობით                                                                                |

## გაფართოებული ხელსაწყოები (11) — ფაზა 2

| ხელსაწყო                           | წვდომის სფეროები                     | აღწერა                                                                                                                                          |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | მარშრუტიზაციის საცდელი სიმულაცია სარეზერვო ვარიანტების ხით                                                                                      |
| `omniroute_set_budget_guard`       | `write:budget`                       | სესიის ბიუჯეტი ხარისხის დაქვეითების/დაბლოკვის/გაფრთხილების მოქმედებით                                                                           |
| `omniroute_set_routing_strategy`   | `write:combos`                       | კომბინაციის სტრატეგიის განახლება შესრულებისას (პრიორიტეტული/შეწონილი/ავტომატური/და ა.შ.)                                                        |
| `omniroute_set_resilience_profile` | `write:resilience`                   | მდგრადობის `aggressive` / `balanced` / `conservative` წინასწარი პარამეტრის გამოყენება                                                           |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | კომბინაციაში შემავალი ყველა პროვაიდერის რეალურ დროში ტესტირება ფაქტობრივი გარე გამოძახებით                                                      |
| `omniroute_get_provider_metrics`   | `read:health`                        | თითოეული პროვაიდერის მეტრიკები p50/p95/p99 დაყოვნებითა და ამომრთველის მდგომარეობით                                                              |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | ამოცანის ტიპის მიხედვით კომბინაციის რეკომენდაცია ბიუჯეტისა და დაყოვნების შეზღუდვებით                                                            |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | ახსნა, თუ რატომ დამარშრუტდა მოთხოვნა კონკრეტულ პროვაიდერთან (შეფასების ფაქტორები + სარეზერვო ვარიანტები)                                        |
| `omniroute_get_session_snapshot`   | `read:usage`                         | სესიის სრული სურათი: ღირებულება, ტოკენები, წამყვანი მოდელები/პროვაიდერები, შეცდომები, ბიუჯეტის დამცავი                                          |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | მონაცემთა ბაზის აცდენების დიაგნოსტიკა (და სურვილისამებრ ავტომატური გამოსწორება), როგორიცაა კომბინაციების დაზიანებული ბმულები / ობოლი სტრიქონები |
| `omniroute_sync_pricing`           | `pricing:write`                      | ფასების მონაცემების სინქრონიზაცია გარე წყაროებიდან (LiteLLM); მხარს უჭერს `dryRun`-ს                                                            |

## კეშის ხელსაწყოები (2)

| ხელსაწყო                | წვდომის სფეროები | აღწერა                                                             |
| :---------------------- | :--------------- | :----------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`     | სემანტიკური კეშის, მოთხოვნის კეშისა და იდემპოტენტურობის სტატისტიკა |
| `omniroute_cache_flush` | `write:cache`    | კეშის გასუფთავება გლობალურად ან ხელმოწერის/მოდელის მიხედვით        |

## შეკუმშვის ხელსაწყოები (13)

| ხელსაწყო                            | წვდომის სფეროები    | აღწერა                                                                                                                                                  |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | შეკუმშვის პარამეტრები, ანალიტიკის შეჯამება და კეშის გათვალისწინებით შედგენილი სტატისტიკა (მოიცავს `analytics.mcpDescriptionCompression` მეტამონაცემებს) |
| `omniroute_compression_configure`   | `write:compression` | შეკუმშვის რეჟიმის, ზღვრის, სამიზნე თანაფარდობის, სისტემური მოთხოვნის შენარჩუნებისა და MCP აღწერის შეკუმშვის გადამრთველის კონფიგურაცია                   |
| `omniroute_set_compression_engine`  | `write:compression` | აქტიური ძრავის (off/caveman/rtk/stacked) და Caveman/RTK ინტენსივობის არჩევა                                                                             |
| `omniroute_list_compression_combos` | `read:compression`  | დასახელებული შეკუმშვის კომბინაციებისა და მათი ძრავების კონვეიერების ჩამონათვალი                                                                         |
| `omniroute_compression_combo_stats` | `read:compression`  | შეკუმშვის კომბინაციისა და ძრავის მიხედვით დაჯგუფებული ანალიტიკა                                                                                         |
| `omniroute_ccr_store`               | `write:compression` | გამომძახებლისგან იზოლირებული შიგთავსის შენახვა შეზღუდულ, მეხსიერებაში განთავსებულ CCR საცავში და მარკერისა და `ccr://` ბმულის დაბრუნება                 |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR შიგთავსის სრულად ან დასაწყისის, დასასრულის, სტრიქონების, grep-ისა და სტატისტიკის რეჟიმებით მიღება                                                   |
| `omniroute_ccr_inspect`             | `read:compression`  | გამომძახებლის კუთვნილი CCR მეტამონაცემების შემოწმება შიგთავსის დაბრუნების გარეშე                                                                        |
| `omniroute_ccr_list`                | `read:compression`  | გამომძახებლის კუთვნილი CCR ბლოკების გვერდებად დაყოფილი მეტამონაცემების ჩამონათვალი                                                                      |
| `omniroute_ccr_delete`              | `write:compression` | გამომძახებლის კუთვნილი CCR ბლოკის წაშლა                                                                                                                 |
| `omniroute_ccr_stats`               | `read:compression`  | გამომძახებლის მიხედვით იზოლირებული მეხსიერების გამოყენების, სასიცოცხლო ციკლის მრიცხველებისა და საცავის ლიმიტების ანგარიში                               |
| `omniroute_rtk_discover`            | `read:compression`  | განმეორებადი ხმაურის აღმოჩენა თანხმობით მოწოდებულ RTK გამომავალ ნიმუშებში                                                                               |
| `omniroute_rtk_learn`               | `read:compression`  | თანხმობით მოწოდებული ნიმუშებიდან განსახილველი RTK ფილტრის მონახაზის გენერირება                                                                          |

CCR ჩანაწერები მხოლოდ მეხსიერებაში ინახება და ხელახლა გაშვებისას ქრება. თითოეული ბლოკი შეზღუდულია 2 MiB-მდე, თითოეული
პრინციპალი — 16 MiB-მდე, ხოლო გლობალური საცავი — 64 MiB-მდე. ჩანაწერების ნაგულისხმევი TTL 24 საათია (მაქსიმუმ
შვიდი დღე). MCP-ის სრული მიღება შეზღუდულია 256 KiB-მდე; უფრო დიდი ბლოკები კვლავ ხელმისაწვდომია
დიაპაზონური და grep რეჟიმებით. შენახვა, მიღება, ჩამონათვალის მიღება, შემოწმება, წაშლა და სტატისტიკა იზოლირებულია
ავთენტიფიცირებული API-გასაღების პრინციპალის მიხედვით. აუდიტის ჩანაწერები შეიცავს ჰეშებსა და ზომის მეტამონაცემებს და არასდროს — შიგთავსს.

`omniroute_compression_status` MCP აღწერილობების შეკუმშვის მონაცემებს ცალკე, `analytics.mcpDescriptionCompression`-ში ასახავს. ეს მნიშვნელობები წარმოადგენს MCP-ის ჩამოთვლადი აღწერილობების (`tools`, `prompts`, `resources` და `resourceTemplates`) მეტამონაცემების ზომის შეფასებებს; ისინი არ წარმოადგენს პროვაიდერის გამოყენების ქვითრებს და მონიშნულია როგორც `source: "mcp_metadata_estimate"`.

### MCP-ის ხელმისაწვდომობის ხის ფილტრი (v3.8.0)

ზემოთ აღწერილი შეკუმშვის ხელსაწყოებისგან დამოუკიდებლად, OmniRoute მოიცავს შესრულების შემდგომ ფილტრს, რომელიც MCP-ის ბრაუზერის/ხელმისაწვდომობის ხელსაწყოების **შედეგებს** აგენტისთვის დაბრუნებამდე კუმშავს. ეს ფილტრი თავად ხელსაწყო არ არის — იგი გამჭვირვალედ მუშაობს ნებისმიერი ხელსაწყოს შედეგზე, რომელიც შეიცავს ვრცელ ხელმისაწვდომობის ხის ან ბრაუზერის სნეპშოტის ტექსტს (≥2000 სიმბოლო).

ძირითადი მახასიათებლები:

- ≥30 ზედიზედ განმეორებადი მეზობელი სტრიქონის შეკუმშვა საწყისი და ბოლო ნაწილების შეჯამებად
- Playwright/computer-use-ისთვის საჭირო `[ref=eXX]` საყრდენების შენარჩუნება
- ზედმეტად დიდი ტექსტის (>50,000 სიმბოლო) იძულებითი შეკვეცა ნავიგაციის მინიშნების დამატებით
- მოსალოდნელი ეკონომია: **60–80%** ბრაუზერის სნეპშოტების მონაცემებში

კონფიგურაცია: `compression.mcpAccessibility` გლობალურ პარამეტრებში (მიგრაცია 056).
იმპლემენტაცია: `open-sse/services/compression/engines/mcpAccessibility/`.
სრული დოკუმენტაცია: [შეკუმშვის ძრავები — MCP-ის ხელმისაწვდომობის ხის ფილტრი](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

ამ ხელსაწყოების საფუძვლად არსებული შესრულების დროის შეკუმშვის მოდელის შესახებ იხილეთ [შეკუმშვის ძრავები](../compression/COMPRESSION_ENGINES.md) და [RTK შეკუმშვა](../compression/RTK_COMPRESSION.md).

## 1Proxy ხელსაწყოები (3)

| ხელსაწყო                    | წვდომის სფეროები | აღწერა                                                                                                  |
| :-------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies`   | უფასო პროქსი-სერვერების მიღება 1proxy-ის მარკეტპლეისიდან (პროტოკოლის/ქვეყნის/ხარისხის/ლიმიტის ფილტრები) |
| `omniroute_oneproxy_rotate` | `read:proxies`   | შემდეგი ხელმისაწვდომი პროქსი-სერვერის მიღება სტრატეგიის მიხედვით (`random` / `quality` / `sequential`)  |
| `omniroute_oneproxy_stats`  | `read:proxies`   | პულის სტატისტიკა, სინქრონიზაციის სტატუსი და განაწილება პროტოკოლისა და ქვეყნის მიხედვით                  |

## მეხსიერების ხელსაწყოები (3)

განსაზღვრულია `open-sse/mcp-server/tools/memoryTools.ts`-ში. ავტორიზაცია/წვდომის სფერო სტანდარტული MCP წვდომის სფეროების კონვეიერის მეშვეობით კონტროლდება.

| ხელსაწყო                  | წვდომის სფეროები | აღწერა                                                                                                        |
| :------------------------ | :--------------- | :------------------------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`    | მეხსიერების ჩანაწერების ძიება მოთხოვნის / ტიპის / API გასაღების მიხედვით, ტოკენების ბიუჯეტის კონტროლით        |
| `omniroute_memory_add`    | `write:memory`   | მეხსიერების ახალი ჩანაწერის დამატება (`factual` / `episodic` / `procedural` / `semantic`)                     |
| `omniroute_memory_clear`  | `write:memory`   | API გასაღების მეხსიერების გასუფთავება, ტიპის ან `olderThan` დროის ნიშნულის მიხედვით არასავალდებულო ფილტრაციით |

## უნარების ხელსაწყოები (4)

განსაზღვრულია `open-sse/mcp-server/tools/skillTools.ts`-ში. ეფუძნება `src/lib/skills/registry` + `src/lib/skills/executor`-ს.

| ხელსაწყო                      | წვდომის სფეროები | აღწერა                                                                                                                   |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | რეგისტრირებული უნარების ჩამონათვალი API გასაღების, სახელის ან ჩართულობის მდგომარეობის მიხედვით არასავალდებულო ფილტრაციით |
| `omniroute_skills_enable`     | `write:skills`   | კონკრეტული უნარის ჩართვა ან გამორთვა ID-ის მიხედვით                                                                      |
| `omniroute_skills_execute`    | `execute:skills` | უნარის შესრულება მიწოდებული შეყვანით და შესრულების ჩანაწერის დაბრუნება                                                   |
| `omniroute_skills_executions` | `read:skills`    | უნარების ბოლოდროინდელი შესრულებების ისტორიის ჩამონათვალი                                                                 |

## Notion-ის კონტექსტის წყარო (6)

განსაზღვრულია `open-sse/mcp-server/tools/notionTools.ts`-ში. ტოკენი ინახება `key_value` ცხრილში `src/lib/db/notion.ts`-ის მეშვეობით. REST კლიენტი მდებარეობს `src/lib/notion/api.ts`-ში. პარამეტრების API მდებარეობს `src/app/api/settings/notion/route.ts`-ში. მართვის პანელის UI მდებარეობს `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`-ში.

დააკონფიგურირეთ თქვენი Notion ინტეგრაციის ტოკენი Endpoint-ის მართვის პანელში, **Context Sources** ჩანართიდან, ან REST API-ის მეშვეობით:

```bash
# ტოკენის დაყენება
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# სტატუსის შემოწმება
curl http://localhost:20128/api/settings/notion

# კავშირის გაწყვეტა
curl -X DELETE http://localhost:20128/api/settings/notion
```

| ხელსაწყო                     | წვდომის სფეროები | აღწერა                                                                   |
| :--------------------------- | :--------------- | :----------------------------------------------------------------------- |
| `notion_search`              | `read:notion`    | სრულტექსტური ძიება ყველა გვერდსა და მონაცემთა ბაზაში                     |
| `notion_get_page`            | `read:notion`    | გვერდის მიღება ID-ის მიხედვით, მის თვისებებთან ერთად                     |
| `notion_list_block_children` | `read:notion`    | გვერდის ან ბლოკის შვილობილი ბლოკების ჩამონათვალი                         |
| `notion_query_database`      | `read:notion`    | მონაცემთა ბაზის მოთხოვნა ფილტრებით, დახარისხებითა და გვერდებად დაყოფით   |
| `notion_get_database`        | `read:notion`    | მონაცემთა ბაზის სქემის მიღება ID-ის მიხედვით                             |
| `notion_append_blocks`       | `write:notion`   | მშობელ ბლოკზე შვილობილი ბლოკების დამატება (მაქსიმუმ 100 თითო მოთხოვნაზე) |

## აგენტის უნარების კატალოგის ხელსაწყოები (3)

განსაზღვრულია `open-sse/mcp-server/tools/agentSkillTools.ts`-ში. ეფუძნება `src/lib/agentSkills/catalog`-ს. ეს ხელსაწყოები MCP კლიენტებსა და გარე აგენტებს წვდომას აძლევს აგენტის უნარების დოკუმენტაციის 45-ჩანაწერიან კატალოგზე. მოქმედების სფერო: `read:catalog`.

| ხელსაწყო                          | მოქმედების სფეროები | აღწერა                                                                                                                                   |
| :-------------------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog`      | ჩამოთვლის აგენტის ყველა 45 უნარს არასავალდებულო `category` (api\|cli) და `area` ფილტრებით; აბრუნებს მეტამონაცემებს + დაფარვას            |
| `omniroute_agent_skills_get`      | `read:catalog`      | კანონიკური `id`-ის მიხედვით იღებს ერთი უნარის სრულ მეტამონაცემებს + SKILL.md-ის შიგთავსს                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog`      | დაფარვის სტატისტიკა: 23 API, 21 CLI და 1 კონფიგურაციის უნარიდან რამდენს აქვს SKILL.md ფაილი ფაილურ სისტემაში, კატალოგის ჯამთან შედარებით |

სრული კატალოგისა და გარე აგენტების მიერ მისი გამოყენების შესახებ იხილეთ [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## დაკავშირებული ფრეიმვორქები (v3.8.0)

ზემოთ მოცემული MCP ხელსაწყოების ინვენტარი (110 უნიკალური ხელსაწყო, გამოთვლილი `countUniqueMcpTools()`-ის მიერ) განზრახ
შემოიფარგლება შესრულების დროის მარშრუტიზაციის/ქეშირების/შეკუმშვის/მეხსიერების/უნარების/პროქსის/კონტექსტის წყაროს ოპერაციებით. ორი მომიჯნავე
ფრეიმვორქი v3.8.0-ში MCP სერვერთან ერთად მიეწოდება და ცალკეა დოკუმენტირებული:

### ღრუბლოვანი აგენტები

ღრუბლოვანი აგენტები არის პროცესის მიღმა მოქმედი AI კოდირების აგენტები (codex-cloud, cursor-cloud, devin, jules), რომლებიც
OmniRoute-ში ინტეგრირებულია იმავე კავშირის მოდელით, რომელიც LLM პროვაიდერებისთვის გამოიყენება. ისინი ხელმისაწვდომია
საკუთარი REST ინტერფეისის (`/api/v1/agents/*`) მეშვეობით და MCP ხელსაწყოების კატალოგის ნაწილი **არ არის**
— ღრუბლოვანი აგენტის გამოძახება MCP მოქმედების სფეროს არ მოიხმარს.

- იმპლემენტაცია: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- სასიცოცხლო ციკლი: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- დოკუმენტაცია: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### დამცავი მექანიზმები

დამცავი მექანიზმები არის შესრულებამდე/შესრულების შემდეგ მოქმედი ფილტრები (vision-bridge, pii-masker, prompt-injection),
რომლებიც ჩატის კონვეიერში გამოიყენება. ისინი MCP ხელსაწყოს/მარშრუტის შრემდე მისვლამდე სრულდება
და აუდიტის კონვეიერში სტრუქტურირებულ დარღვევებს აგზავნის; მათი გამოძახება MCP ხელსაწყოების სახით არ ხდება.

- იმპლემენტაცია: `src/lib/guardrails/`.
- დოკუმენტაცია: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

როდესაც გამართვისას MCP გამოძახება დაბლოკილად ჩანს, შეამოწმეთ როგორც MCP აუდიტის ჟურნალი
(`scope_denied:*` ჩანაწერები), ისე დამცავი მექანიზმების აუდიტის კვალი — მოთხოვნა შეიძლება დამცავმა მექანიზმმა უარყოს
**მანამდე**, სანამ ის MCP მოქმედების სფეროს აღსრულების შრემდე მიაღწევს.

---

## REST API საბოლოო წერტილები

| საბოლოო წერტილი        | მეთოდი                | აღწერა                                                                                                                  | ავტორიზაცია                        |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------------- | :--------------------------------- |
| `/api/mcp/status`      | `GET`                 | სერვერის სტატუსი: პულსი, HTTP ტრანსპორტის მდგომარეობა, აუდიტის აქტივობის შეჯამება                                       | მართვა (სესია/ადმინისტრატორი)      |
| `/api/mcp/tools`       | `GET`                 | ხელსაწყოების კატალოგი (სახელი, აღწერა, მოქმედების სფეროები, ფაზა, წყაროს საბოლოო წერტილები)                             | მართვა                             |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE ტრანსპორტის საბოლოო წერტილი (შეზღუდულია `mcpEnabled` + `mcpTransport === "sse"` პირობით)                            | API გასაღები + მოქმედების სფეროები |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | ნაკადური HTTP ტრანსპორტი (იყენებს `mcp-session-id` სათაურს; `DELETE` ასრულებს სესიას)                                   | API გასაღები + მოქმედების სფეროები |
| `/api/mcp/audit`       | `GET`                 | აუდიტის ჟურნალის ჩანაწერები `mcp_tool_audit`-იდან (ფილტრები: `limit`, `offset`, `tool`, `success`, `apiKeyId`)          | მართვა                             |
| `/api/mcp/audit/stats` | `GET`                 | აგრეგირებული აუდიტის სტატისტიკა (`totalCalls`, `successRate`, `avgDurationMs`, ყველაზე ხშირად გამოყენებული ხელსაწყოები) | მართვა                             |

წყაროს ფაილები: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

როგორც SSE, ისე ნაკადური HTTP ტრანსპორტი დაბლოკილია, სანამ MCP სერვერი პარამეტრებში (`mcpEnabled`) არ ჩაირთვება და შესაბამისი `mcpTransport` არ შეირჩევა. თუ კონფიგურირებულია არასწორი ტრანსპორტი, მარშრუტი აბრუნებს HTTP 400-ს პარამეტრების შეცვლის მინიშნებით.

---

## ავთენტიფიკაცია და მოქმედების სფეროები

MCP ინსტრუმენტების ავთენტიფიკაცია API გასაღების მოქმედების სფეროების მეშვეობით ხდება. მოქმედების სფეროების აღსრულება ცენტრალიზებულია
`open-sse/mcp-server/scopeEnforcement.ts`-ში. თითოეული ინსტრუმენტი კონკრეტულ მოქმედების სფეროებს მოითხოვს:

| მოქმედების სფერო      | ინსტრუმენტები                                                                                                                                                                           |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                       |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                               |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                  |
| `read:quota`          | `check_quota`                                                                                                                                                                           |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                  |
| `read:models`         | `list_models_catalog`                                                                                                                                                                   |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                           |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                   |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                      |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                             |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                          |
| `read:cache`          | `cache_stats`                                                                                                                                                                           |
| `write:cache`         | `cache_flush`                                                                                                                                                                           |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                              |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                       |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                   |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                        |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                  |
| `read:memory`         | `memory_search`                                                                                                                                                                         |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                            |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                      |
| `write:skills`        | `skills_enable`                                                                                                                                                                         |
| `execute:skills`      | `skills_execute`                                                                                                                                                                        |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                        |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                 |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                               |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                        |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                          |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                      |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                         |
| `read:obsidian`       | წაკითხვის 13 ინსტრუმენტი — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | ჩაწერის 9 ინსტრუმენტი — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                  |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                       |

Wildcard scope-ები მხარდაჭერილია: `read:*` ანიჭებს ყველა read-scope-ს, ხოლო `*` — სრულ წვდომას.

### `mcp:connect` — ვიწრო მარშრუტის შესაძლებლობა (#7895)

არალოკალური მისამართიდან HTTP/SSE MCP ტრანსპორტზე (`/api/mcp/*`) წვდომისთვის საჭიროა
`/api/mcp/` LOCAL_ONLY გამონაკლისი (იხილეთ `docs/security/ROUTE_GUARD_TIERS.md`). ისტორიულად,
ეს გამონაკლისი იღებდა მხოლოდ სრული `manage`/`admin` scope-ის მქონე API გასაღებს — რაც
ზედმეტად ფართო წვდომაა გამომძახებლისთვის, რომელსაც მხოლოდ MCP-სთან კომუნიკაცია სჭირდება.
`src/shared/constants/managementScopes.ts` ახლა
ექსპორტს უკეთებს `MCP_CONNECT_SCOPE = "mcp:connect"`-ს: დამატებით, ვიწრო scope-ს (`SELF_USAGE_SCOPE`-ის
მსგავსი პრეცედენტით), რომელიც ავტორიზაციას ანიჭებს მხოლოდ `/api/mcp/`-ის გვერდის ავლას
`src/server/authz/policies/management.ts`-ში — ის მართვის სხვა მარშრუტებზე წვდომას არ ანიჭებს
და განზრახ არ არის შეტანილი `MANAGEMENT_API_KEY_SCOPES`-ში. `manage`/`admin`-ის მქონე გასაღები
კვლავ უცვლელად გაივლის ამ გამონაკლისს; `mcp:connect` ნაკლები პრივილეგიის მქონე ალტერნატივაა
მხოლოდ დისტანციურ MCP-ზე მომუშავე გამომძახებლებისთვის და მოწმდება `hasMcpConnectOrManageScope()`-ის მეშვეობით.

### HTTP scope-ის მიბმა ცალკეულ გასაღებზე (#7895)

HTTP/SSE-ის საშუალებით `open-sse/mcp-server/httpTransport.ts` ახლა გამომძახებლის რეალურ
`api_keys.scopes`-ს განსაზღვრავს `resolveMcpCallerAuthInfo()`-ის მეშვეობით (`open-sse/mcp-server/httpAuthContext.ts`)
და გადასცემს მას MCP SDK-ის `transport.handleRequest(req, { authInfo })`-ს, რათა
თითოეულ ხელსაწყოს გამოძახებამდე მისული `extra.authInfo.scopes` ასახავდეს თავად Bearer გასაღების scope-ებს.
`scopeEnforcement.ts`-ის `resolveCallerScopeContext()` უკვე ანიჭებდა `authInfo`-ს უპირატესობას
`_meta`-სა და `OMNIROUTE_MCP_SCOPES` env fallback-თან შედარებით — ეს ცვლილება მხოლოდ ავსებს
პირველ, უმაღლესი პრიორიტეტის წყაროს, რომელიც მანამდე HTTP-ის საშუალებით არ ივსებოდა. როდესაც
ვერცერთი API გასაღები ვერ განისაზღვრება (header არ არის ან გასაღები არასწორია), `authInfo` რჩება
`undefined` და განსაზღვრა უცვლელად გადადის არსებულ `meta`/env fallback ჯაჭვზე. ეს არ ცვლის
`OMNIROUTE_MCP_ENFORCE_SCOPES`-ის ნაგულისხმევ მნიშვნელობას — აღსრულება კვლავ ცალსახად უნდა
ჩაირთოს; ეს ცვლილება მხოლოდ უზრუნველყოფს, რომ ჩართვის შემდეგ ცალკეული გასაღების გზა უპირატესი იყოს.
stdio-ს ცალკეული გამომძახებლის იდენტობა არ გააჩნია (იხილეთ `mcpCallerIdentity.ts`) და ცვლილება
მასზე არ მოქმედებს — ის კვლავ `_meta`/env fallback ჯაჭვს იყენებს.

---

## გარემოს ცვლადები

| ცვლადი                                  | ნაგულისხმევი მნიშვნელობა            | დანიშნულება                                                                                                                                                             |
| :-------------------------------------- | :---------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`            | საბაზისო URL, რომელსაც MCP სერვერი OmniRoute-ის შიდა API-ების გამოძახებისას იყენებს                                                                                     |
| `OMNIROUTE_API_KEY`                     | (ცარიელი)                           | API გასაღები, რომელიც შიდა API გამოძახებებს გადაეცემა როგორც `Authorization: Bearer`                                                                                    |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (მხოლოდ `"true"` რთავს მას) | ჩართვისას, არარსებული წვდომის არეები ხელსაწყოს გამოძახებებს უარყოფს და აუდიტის ჟურნალში `scope_denied:<reason>`-ს აღრიცხავს                                             |
| `OMNIROUTE_MCP_SCOPES`                  | (ცარიელი)                           | მძიმით გამოყოფილი წვდომის არეების დასაშვები სია, რომლებიც ნაგულისხმევად „ხელმისაწვდომად“ მიიჩნევა (გამოიყენება, როდესაც გამომძახებელი საკუთარ წვდომის არეებს არ აწვდის) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (მიუთითებელი = ჩართულია)            | `0/false/off/no` მნიშვნელობის დაყენებისას, რეგისტრაციის დროს MCP აღწერების შეკუმშვას თიშავს                                                                             |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (მიუთითებელი = ჩართულია)            | ზემოთ მოცემული იმავე გადამრთველის ალტერნატიული ფსევდონიმი                                                                                                               |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                             | შეწყვეტამდე დაშვებული დრო შიდა მართვის წაკითხვებისთვის (მდგომარეობა, მდგრადობა, კომბინაციები, კვოტა, გამოყენება)                                                        |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                             | შეწყვეტამდე დაშვებული დრო იმ გადასვლებისთვის, რომლებიც პროვაიდერს ელოდება (`route_request`, `web_search`, `web_fetch`)                                                  |
| `MCP_TOOL_DENY`                         | (მიუთითებელი = ფილტრის გარეშე)      | მძიმით გამოყოფილი ხელსაწყოების სახელები, რომლებიც `tools/list`-იდან უნდა გამოირიცხოს (ხელსაწყოების რაოდენობის შემცირება — იხილეთ ქვემოთ)                                |
| `MCP_TOOL_ALLOW`                        | (მიუთითებელი = ფილტრის გარეშე)      | მძიმით გამოყოფილი ხელსაწყოების სახელები, რომლებიც ექსკლუზიურად უნდა შენარჩუნდეს (დასაშვები სიის რეჟიმი — იხილეთ ქვემოთ)                                                 |
| `DATA_DIR`                              | `~/.omniroute`                      | პულსაციის ფაილი იწერება მისამართზე `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                             |

---

## აღწერების შეკუმშვა

MCP-ის ხელსაწყოების, მოთხოვნებისა და რესურსების რეესტრებს შეუძლიათ აღწერების შეკუმშვა რეგისტრაციის/სიის ფორმირების დროს, რათა შემცირდეს კლიენტებისთვის მიწოდებული მეტამონაცემების მოცულობა (და, შესაბამისად, მოთხოვნის კონტექსტის ღირებულება). იმპლემენტაცია მდებარეობს `open-sse/mcp-server/descriptionCompressor.ts`-ში და MCP სერვერთან დაკავშირებულია `createMcpServer()`-ის შიგნით არსებული `compressMcpRegistryMetadata`-ის მეშვეობით.

- შეკუმშვა აღწერის ტექსტზე Caveman-ის წესების ნაკრების (`getRulesForContext("all", "full")`) გამოყენებით სრულდება, დაცული ბლოკების ამოღებით (კოდის მონაკვეთები, შემოსაზღვრული ბლოკები და ა.შ.), რათა სტრუქტურული შიგთავსი არ შეიცვალოს.
- თითოეული განთავსებისთვის გადართეთ `key_value` პარამეტრების ცხრილში არსებული `compression.mcpDescriptionCompressionEnabled` მნიშვნელობის მეშვეობით (ნაგულისხმევად: ჩართულია) — მომხმარებლის ინტერფეისში წარმოდგენილია როგორც **ანალიტიკა → MCP აღწერების შეკუმშვა**.
- მთელი პროცესისთვის გადართეთ `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false`-ის ან `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`-ის მეშვეობით.
- რეალურ დროში სტატისტიკა ხელმისაწვდომია `omniroute_compression_status`-ის მეშვეობით, `analytics.mcpDescriptionCompression`-ის ქვეშ და მონიშნულია `source: "mcp_metadata_estimate"`-ით, რათა გაიმიჯნოს პროვაიდერის გამოყენების რეალური ქვითრებისგან.

---

## ხელსაწყოების რაოდენობის შემცირება (F4.3)

აღწერილობის შეკუმშვა თითოეული ხელსაწყოს მეტამონაცემებს ამცირებს; **ხელსაწყოების რაოდენობის შემცირება** კი კიდევ ერთი ნაბიჯით წინ მიდის და ამცირებს საერთოდ _რამდენი_ ხელსაწყოს შესახებ ცხადდება. `tools/list` მანიფესტში ნაკლები ხელსაწყოს გამოქვეყნება ამცირებს თითოეული მოთხოვნისთვის კლიენტის მოდელის მიერ ხელსაწყოების კატალოგზე გაწეულ ტოკენების ხარჯს („მე-5 ფენის“ შეკუმშვა). იმპლემენტაცია წარმოადგენს სუფთა, მდგომარეობის არმქონე ფილტრს `open-sse/mcp-server/toolCardinality.ts`-ში (`reduceToolManifest`), რომელიც ჩართულია `createMcpServer()`-ის რეგისტრაციის ციკლში (`open-sse/mcp-server/server.ts`).

**საჭიროებს მკაფიოდ ჩართვას და ნაგულისხმევად გამორთულია.** ფილტრი მხოლოდ მაშინ გაეშვება, როდესაც გარემოს ორი ცვლადიდან ერთ-ერთი მაინც არის დაყენებული; თუ არცერთი არ არის დაყენებული, 110-ვე ხელსაწყო უცვლელად გამოქვეყნდება.

| ცვლადი           | რეჟიმი                                                                                                 |
| :--------------- | :----------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | შავი სია — მძიმეებით გამოყოფილი ხელსაწყოების სახელები, რომლებიც ყოველთვის ამოიღება `tools/list`-დან    |
| `MCP_TOOL_ALLOW` | ნებადართული სია — მძიმეებით გამოყოფილი ხელსაწყოების სახელები; მხოლოდ ისინი დარჩება, დანარჩენი ამოიღება |

`deny`-ს `allow`-თან შედარებით პრიორიტეტი ენიჭება. სახელები მძიმეებით გამოიყოფა, თავსა და ბოლოში არსებული ჰარეები იკვეთება, ხოლო ცარიელი ჩანაწერები უგულებელყოფილია. მაგალითები:

```bash
# კატალოგიდან ორი ხელსაწყოს ამოღება
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# მხოლოდ მარშრუტიზაციისა და კვოტის ხელსაწყოების გამოქვეყნება (ნებადართული სიის რეჟიმი)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**როგორ იშლება გაფილტრული ხელსაწყოები:** რეგისტრაცია ყოველთვის წარმატებით სრულდება; ხელსაწყო, რომელსაც პროფილი უარყოფს, შემდეგ MCP SDK-ის დესკრიპტორზე `.disable()`-ით ითიშება, ამიტომ ის არასოდეს გამოჩნდება `tools/list`-ში, თუმცა დაკავშირების სქემა უცვლელი რჩება (სუფთა ჩართვა/გამორთვა, ხელახალი რეგისტრაციის გარეშე). პროფილის პარსერია `readMcpToolProfileFromEnv(process.env)`, რომელიც აბრუნებს `null`-ს (ფილტრაციის გარეშე), როდესაც ორივე ცვლადი ცარიელია.

`reduceToolManifest`-ის საფუძვლად არსებული უფრო მდიდარი `ToolProfile` სტრუქტურა ასევე მხარს უჭერს მოქმედების სფეროების თანაკვეთით ფილტრაციას (`allowScopes`, `read:*`-ის მსგავსი ვაილდკარდის დამთხვევით) და დეტერმინისტულ `maxTools` ზღვარს, თუმცა ამ ორ პარამეტრს რეგისტრაციის დროს სრული მანიფესტი სჭირდება და დღეს ისინი გარემოს ცვლადების მეშვეობით **არ** არის ხელმისაწვდომი (`tools/list`-ის დონის ჰუკი დაგეგმილი შემდგომი სამუშაოა). `estimateManifestTokens()` ხელმისაწვდომია მანიფესტის ტოკენების ხარჯის შესადარებლად შემცირებამდე და შემცირების შემდეგ.

---

## შესრულების გარემოს გულისცემა

stdio ტრანსპორტი სიცოცხლისუნარიანობის მდგომარეობას ყოველ 5 წამში ინახავს `${DATA_DIR}/runtime/mcp-heartbeat.json`-ში. დაფა (`/api/mcp/status`) კითხულობს ამ ფაილს და PID-ის სიცოცხლისუნარიანობის მონაცემებს, რათა განსაზღვროს `online`. HTTP ტრანსპორტები სანაცვლოდ მდგომარეობას პროცესშიდა `getMcpHttpStatus()`-იდან იღებს (ფაილში ჩაწერის გარეშე).

გულისცემის სნეპშოტი შეიცავს:

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

## აუდიტის ჟურნალირება

თითოეული ხელსაწყოს გამოძახება `open-sse/mcp-server/audit.ts`-ის მიერ SQLite-ის `mcp_tool_audit` ცხრილში იწერება:

- ხელსაწყოს სახელი, არგუმენტები (ჰეშირებული/შემოკლებული თითოეული ხელსაწყოს `auditLevel`-ის შესაბამისად), შედეგი
- ხანგრძლივობა მილიწამებში, წარმატების/წარუმატებლობის ალამი, შეცდომის შეტყობინება (სადაც გამოიყენება)
- API გასაღების ჰეში, დროის ნიშნული
- მოქმედების სფეროს უარყოფები ჟურნალში იწერება როგორც `scope_denied:<reason>`, აკლებული მოქმედების სფეროების სიასთან ერთად

ბოლო გამოძახებების სანახავად გამოიყენეთ დაფა ან `/api/mcp/audit` და `/api/mcp/audit/stats` REST ბოლო წერტილები.

---

## ფაილები

| ფაილი                                                                    | დანიშნულება                                                                                          |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP სერვერის ფაბრიკა, stdio შესვლის წერტილი, მოქმედების არეალით შეზღუდული ხელსაწყოების რეგისტრაციები |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP ტრანსპორტი (სესიების მართვა)                                                   |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | ხელსაწყოს მოქმედების არეალის შეფასება და გამომძახებლის განსაზღვრა                                    |
| `open-sse/mcp-server/audit.ts`                                           | ხელსაწყოს გამოძახებების აუდიტის ჟურნალში ჩაწერა (`mcp_tool_audit`)                                   |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio პულსის ჩამწერი (`mcp-heartbeat.json`)                                                          |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | აღწერილობების შეკუმშვა ხელსაწყოების / მოთხოვნების / რესურსების რეესტრებისთვის                        |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod სქემები + ხელსაწყოების რეესტრი (`MCP_TOOLS`, 45 ჩანაწერი)                                        |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Phase 2 + ქეშის + 1proxy ხელსაწყოების დამმუშავებლები                                                 |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | შეკუმშვის ხელსაწყოების დამმუშავებლები                                                                |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | მეხსიერების ხელსაწყოების განსაზღვრებები (3 ხელსაწყო)                                                 |
| `open-sse/mcp-server/tools/skillTools.ts`                                | უნარების ხელსაწყოების განსაზღვრებები (4 ხელსაწყო)                                                    |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion კონტექსტის წყაროს ხელსაწყოების განსაზღვრებები (6 ხელსაწყო)                                    |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | გეიმიფიკაციის ხელსაწყოების განსაზღვრებები (8 ხელსაწყო)                                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | პლაგინების რეგისტრაციისა და მართვის ხელსაწყოები (8 ხელსაწყო)                                         |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` საბოლოო წერტილი                                                                    |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` საბოლოო წერტილი                                                                     |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE ტრანსპორტის მარშრუტი                                                              |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP ტრანსპორტის მარშრუტი                                               |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` აუდიტის ჟურნალის მოთხოვნა                                                           |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` აგრეგირებული აუდიტის მეტრიკები                                                |
| `src/lib/notion/api.ts`                                                  | Notion REST API კლიენტი (ხელახალი მცდელობა, დროის ამოწურვა, შეცდომების კლასიფიკაცია)                 |
| `src/lib/db/notion.ts`                                                   | Notion ტოკენის მუდმივი შენახვა (`key_value` ცხრილი)                                                  |
| `src/app/api/settings/notion/route.ts`                                   | Notion პარამეტრების API (GET/POST/DELETE)                                                            |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion ტოკენის მართვის ინტერფეისი                                                                    |
| `tests/unit/notion-api.test.ts`                                          | Notion API კლიენტის ტესტები (7)                                                                      |
| `tests/unit/notion-tools.test.ts`                                        | Notion ხელსაწყოების მოქმედების არეალის აღსრულების ტესტები (10)                                       |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB მოდულის ტესტები (3)                                                                        |
