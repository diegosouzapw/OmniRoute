# OmniRoute MCP Server Documentation (Hausa)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Sabar Model Context Protocol mai kayan aiki 110 da suka shafi sarrafa hanyoyi, cache, matsawa, ƙwaƙwalwa, ƙwarewa, proxy, pool, Radar, da ayyukan tushen mahallin.
>
> Madogarar gaskiya: `open-sse/mcp-server/server.ts` yana ƙididdige **kayan aiki na musamman guda 110** ta amfani da `countUniqueMcpTools()`: ma’anoni na asali guda 45 (ciki har da kayan aikin zagayen rayuwar CCR guda shida, rukuni na uku na agent-skills, `omniroute_radar_catalog`, da `omniroute_x_search`), tare da ƙwaƙwalwa (3), ƙwarewa (4), ƙwarewar GitHub (3), pool (6), tsarin mayar da aiki tamkar wasa (8), plugins (8), Notion (6), Obsidian (22), kundin bayanai na gida (3), da kayan aikin matsawa guda biyu na RTK kawai.

## Shigarwa

An riga an haɗa OmniRoute MCP a ciki. Fara shi da:

```bash
omniroute --mcp
```

Ko ta hanyar jigilar open-sse:

```bash
# Jigilar HTTP mai gudana (tashar 20130)
omniroute --dev  # MCP yana farawa ta atomatik a maƙurar /mcp
```

Jigilar HTTP (`sse` / `streamable-http`, waɗanda sabar dashboard ke samarwa a cikin tsari guda) a
kashe suke ta tsohuwa, kuma a baya ana iya kunna ko kashe su ne kawai daga shafin `/dashboard/mcp`. Tun daga v3.8.51
CLI yana da daidaitattun fasaloli:

```bash
omniroute mcp status                                  # an kunna/kan layi, jigila, adadin kayan aiki
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # yana sake saita zaman sse/streamable-http masu aiki
```

`mcp enable`/`mcp disable` suna aika PATCH ga saitin `mcpEnabled` ɗaya (da kuma `mcpTransport` idan an zaɓa)
wanda dashboard ke kunnawa ko kashewa ta `/api/settings`. `mcp restart` yana kiran `POST /api/mcp/restart`: yana rufe
zaman `sse`/`streamable-http` masu aiki domin buƙata ta gaba ta sake farawa cikin tsabta, yana mayar da
`409` idan an kashe MCP, da kuma `501` don jigilar `stdio` (abokan hulɗar stdio ne ke mallakar
ƙananan tsarinsu — babu makama a cikin tsari da za a sake farawa).

## Hanyoyin Sufuri

Sabar MCP tana samar da hanyoyin sufuri guda uku, waɗanda dukansu ke amfani da factory ɗin `createMcpServer()` iri ɗaya:

| Hanyar Sufuri     | Inda take                                  | Lokacin amfani da ita                                       |
| :---------------- | :----------------------------------------- | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`            | Haɗa IDE (Claude Desktop, Cursor, da sauransu)              |
| `sse`             | `POST/GET /api/mcp/sse` ta `httpTransport` | Client na browser/agent da ke buƙatar event stream          |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`          | Client na HTTP masu zaman da yawa (`mcp-session-id` header) |

Ana zaɓar HTTP transport mai aiki (`sse` ko `streamable-http`) ta hanyar saitin `mcpTransport`. Sauya transport yana rufe zaman da ake da su a ɗayan transport ɗin.

### Samun dama daga nesa (kauce wa iyakar manage-scope)

`/api/mcp/*` yana cikin matakin LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — a tsari na asali, host na loopback (`localhost`, `127.0.0.1`, `::1`) ne kawai za su iya isa gare shi. Tun daga v3.8.2, client waɗanda ba na loopback ba za su iya haɗuwa idan suka gabatar da `Authorization: Bearer <api-key>` wanda key ɗinsa ke da scope na `manage`. Wannan ita ce kaɗai hanyar isa ga sabar MCP ta nesa ta hanyar tunnel, reverse proxy, ko public hostname.

```bash
# Ba da scope na manage: buɗe shafin API Keys na dashboard sannan a kunna
# "Management Access" a kan key ɗin, ko a yi POST scopes:["manage"] yayin ƙirƙirawa.

# Sannan a haɗa daga client na MCP da ke nesa:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Key marar `manage` (ko rashin Bearer) yana mayar da `403 LOCAL_ONLY`. An tsara sibling prefix `/api/cli-tools/runtime/*` da gangan don kada a iya kauce wa wannan iyaka — duba [Matakan Route Guard — keɓantacciyar damar manage-scope](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Saitin IDE

Duba [Saitin Abokin Cinikin MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) don saita Claude Desktop,
Cursor, Cline, da abokan cinikin MCP masu jituwa.

---

## Muhimman Kayan Aiki (14) — Mataki na 1

| Kayan aiki                      | Iyakokin izini        | Bayani                                                                                                                                |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_get_health`          | `read:health`         | Lokacin aiki, ƙwaƙwalwa, masu katse da'ira, iyakokin ƙima, ƙididdigar ma'ajiyar wucin gadi                                            |
| `omniroute_list_combos`         | `read:combos`         | Duk combos da aka saita tare da dabaru (ma'aunai na zaɓi)                                                                             |
| `omniroute_get_combo_metrics`   | `read:combos`         | Ma'aunan aiki na wani takamaiman combo                                                                                                |
| `omniroute_switch_combo`        | `write:combos`        | Kunna ko kashe combo                                                                                                                  |
| `omniroute_create_combo`        | `write:combos`        | Ƙirƙiri ingantaccen combo ta hanyar combo API da ke akwai                                                                             |
| `omniroute_check_quota`         | `read:quota`          | Adadin kaso da aka yi amfani da shi/jimilla, kashi da ya rage, lokacin sake saiti, lafiyar token                                      |
| `omniroute_route_request`       | `execute:completions` | Aika kammalawar taɗi ta hanyar tsarin zaɓin hanya na OmniRoute                                                                        |
| `omniroute_cost_report`         | `read:usage`          | Rahoton kuɗi bisa lokaci (zama/rana/mako/wata)                                                                                        |
| `omniroute_list_models_catalog` | `read:models`         | Cikakken kundin model tare da iyawa, matsayi, farashi                                                                                 |
| `omniroute_radar_catalog`       | `read:radar`          | Kundin Radar na gida mai sa hannu; matatun provider/family na zaɓi                                                                    |
| `omniroute_tool_search`         | `read:tools`          | Gano kayan aiki daga kundin MCP da aka yi wa rajista                                                                                  |
| `omniroute_web_search`          | `execute:search`      | Binciken yanar gizo ta hanyar search providers da aka saita. Ba X/Twitter ba.                                                         |
| `omniroute_x_search`            | `execute:search`      | Bincika X ta hanyar xAI/SuperGrok, ko zaɓi `xquik-search` don sakamakon Xquik API. Yana buƙatar bayanan shiga na backend da aka zaɓa. |
| `omniroute_web_fetch`           | `execute:search`      | Ɗauko abun cikin yanar gizo ta hanyar fetch providers da aka saita                                                                    |

## Kayan Aiki na Ci-gaba (11) — Mataki na 2

| Kayan aiki                         | Izini                                | Bayani                                                                                                 |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Kwaikwayon zaɓin hanya ba tare da aiwatarwa ba tare da bishiyar hanyoyin madadin                       |
| `omniroute_set_budget_guard`       | `write:budget`                       | Kasafin zaman tare da matakin rage aiki/toshewa/faɗakarwa                                              |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Sabunta dabarar haɗin a lokacin aiki (fifiko/mai nauyi/atomatik/da sauransu)                           |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Aiwatar da saitin juriya na `aggressive` / `balanced` / `conservative`                                 |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Gwada kowane mai samarwa kai tsaye a cikin haɗi ta amfani da ainihin kira na upstream                  |
| `omniroute_get_provider_metrics`   | `read:health`                        | Ma'aunin kowane mai samarwa tare da jinkirin p50/p95/p99 da yanayin circuit breaker                    |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Ba da shawarar haɗi bisa nau'in aiki tare da ƙuntatawar kasafi/jinkiri                                 |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Bayyana dalilin da ya sa aka tura buƙata zuwa wani mai samarwa (abubuwan ƙididdigewa + madadin)        |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Cikakken hoton zaman: kuɗi, tokens, manyan models/masu samarwa, kurakurai, mai gadin kasafi            |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Gano (kuma bisa zaɓi gyara ta atomatik) kaucewar bayanai kamar gurɓatattun combo refs / layukan marayu |
| `omniroute_sync_pricing`           | `pricing:write`                      | Daidaita bayanan farashi daga tushe na waje (LiteLLM); yana goyan bayan `dryRun`                       |

## Kayan Aikin Cache (2)

| Kayan aiki              | Izini         | Bayani                                                  |
| :---------------------- | :------------ | :------------------------------------------------------ |
| `omniroute_cache_stats` | `read:cache`  | Ƙididdigar semantic cache, prompt-cache, da idempotency |
| `omniroute_cache_flush` | `write:cache` | Share cache gaba ɗaya ko bisa signature/model           |

## Kayan Aikin Matsawa (13)

| Kayan aiki                          | Izini               | Bayani                                                                                                                                       |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Saitunan matsawa, taƙaitaccen nazari, da ƙididdigar da ke la'akari da cache (ya haɗa da metadata na `analytics.mcpDescriptionCompression`)   |
| `omniroute_compression_configure`   | `write:compression` | Saita yanayin matsawa, iyaka, adadin da ake nufi, adana system-prompt, da kunnawa/kashe matsawar bayanin MCP                                 |
| `omniroute_set_compression_engine`  | `write:compression` | Zaɓi engine mai aiki (off/caveman/rtk/stacked) da tsananin Caveman/RTK                                                                       |
| `omniroute_list_compression_combos` | `read:compression`  | Jera combos na matsawa masu suna da jerin engines ɗinsu                                                                                      |
| `omniroute_compression_combo_stats` | `read:compression`  | Nazari da aka rarraba bisa combo na matsawa da engine                                                                                        |
| `omniroute_ccr_store`               | `write:compression` | Adana abun ciki da aka ware wa mai kira a cikin ma'ajiyar CCR mai iyaka da ke cikin ƙwaƙwalwa, sannan dawo da alama tare da mahaɗin `ccr://` |
| `omniroute_ccr_retrieve`            | `read:compression`  | Dawo da abun cikin CCR gaba ɗaya ko ta hanyoyin head, tail, lines, grep, da stats                                                            |
| `omniroute_ccr_inspect`             | `read:compression`  | Duba metadata na CCR mallakin mai kira ba tare da dawo da abun ciki ba                                                                       |
| `omniroute_ccr_list`                | `read:compression`  | Jera metadata mai shafuka na tubalan CCR mallakin mai kira                                                                                   |
| `omniroute_ccr_delete`              | `write:compression` | Share tubalin CCR mallakin mai kira                                                                                                          |
| `omniroute_ccr_stats`               | `read:compression`  | Bayar da rahoton amfani da ƙwaƙwalwa na mai kira, ƙididdigar zagayowar rayuwa, da iyakokin ma'ajiya                                          |
| `omniroute_rtk_discover`            | `read:compression`  | Gano hayaniya mai maimaituwa a cikin samfuran fitarwar RTK da aka amince da tattarawa                                                        |
| `omniroute_rtk_learn`               | `read:compression`  | Samar da daftarin tacewar RTK da za a iya dubawa daga samfuran da aka amince da tattarawa                                                    |

Shigarwar CCR suna cikin ƙwaƙwalwa ne kawai kuma suna ɓacewa idan an sake farawa. An iyakance kowane tubali zuwa 2 MiB, kowane
principal zuwa 16 MiB, kuma ma'ajiyar gaba ɗaya zuwa 64 MiB. Ta asali, shigarwa suna da TTL na awa 24 (mafi yawa
kwanaki bakwai). An iyakance cikakken dawo da MCP zuwa 256 KiB; manyan tubala suna ci gaba da samuwa ta hanyoyin
ranged da grep. Adanawa, dawo da bayanai, jera bayanai, dubawa, sharewa, da stats duk an ware su bisa
principal na API-key da aka tabbatar da sahihancinsa. Bayanan audit suna ƙunshe da hashes da metadata na girma kawai, ba su taɓa ƙunsar abun ciki ba.

`omniroute_compression_status` yana ba da rahoton matse bayanin MCP daban a ƙarƙashin
`analytics.mcpDescriptionCompression`. Waɗannan ƙimomin kimantawa ne na girman metadata don bayanan MCP da za a iya jera su
(`tools`, `prompts`, `resources`, da `resourceTemplates`); ba rasitocin amfani na mai samarwa ba ne
kuma an yi musu alama da `source: "mcp_metadata_estimate"`.

### Tacewar Bishiyar Samun Dama ta MCP (v3.8.0)

Daban da kayan aikin matsewa da ke sama, OmniRoute ya haɗa da matatar bayan-aiwatarwa wadda ke
matse **sakamakon kayan aiki** na kayan aikin burauza/samun dama na MCP kafin a mayar da su ga
wakilin. Ita kanta wannan matatar ba kayan aiki ba ce — tana gudana a ɓoye a kan duk wani sakamakon kayan aiki da ya ƙunshi
rubutun bishiyar samun dama ko hoton yanayin burauza mai yawan bayani (≥2000 haruffa).

Muhimman halaye:

- Tana taƙaita ≥30 layukan 'yan'uwa da suka maimaitu a jere zuwa taƙaitaccen bayani na farko + ƙarshe
- Tana kiyaye maƙullan `[ref=eXX]` da Playwright/amfani-da-kwamfuta ke buƙata
- Tana yanke rubutun da ya wuce kima (>50,000 haruffa) kai tsaye tare da alamar jagorar kewayawa
- Adadin rage girman da ake sa ran samu: **60–80%** a kan bayanan hoton yanayin burauza

Saitawa: `compression.mcpAccessibility` a cikin saitunan gama-gari (ƙaura ta 056).
Aiwatarwa: `open-sse/services/compression/engines/mcpAccessibility/`.
Cikakkun takardu: [Injinan Matsewa — Tacewar Bishiyar Samun Dama ta MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Duba [Injinan Matsewa](../compression/COMPRESSION_ENGINES.md) da [Matsewar RTK](../compression/RTK_COMPRESSION.md) don
samfurin matsewa na lokacin gudana da ke bayan waɗannan kayan aikin.

## Kayan Aikin 1Proxy (3)

| Kayan aiki                  | Iyakokin izini | Bayani                                                                             |
| :-------------------------- | :------------- | :--------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Dauko proxies na kyauta daga kasuwar 1proxy (matatun protocol/ƙasa/inganci/iyaka)  |
| `omniroute_oneproxy_rotate` | `read:proxies` | Sami proxy na gaba da ake da shi bisa dabara (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Ƙididdigar pool, matsayin daidaitawa, da rarrabawa bisa protocol da ƙasa           |

## Kayan Aikin Ƙwaƙwalwa (3)

An ayyana su a cikin `open-sse/mcp-server/tools/memoryTools.ts`. Ana aiwatar da auth/scope ta hanyar daidaitacciyar pipeline ta scope ta MCP.

| Kayan aiki                | Iyakokin izini | Bayani                                                                                         |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Bincika abubuwan ƙwaƙwalwa bisa tambaya / nau'i / API key tare da tilasta iyakar kasafin token |
| `omniroute_memory_add`    | `write:memory` | Ƙara sabon bayanin ƙwaƙwalwa (`factual` / `episodic` / `procedural` / `semantic`)              |
| `omniroute_memory_clear`  | `write:memory` | Goge ƙwaƙwalwar API key, tare da zaɓin tacewa bisa nau'i ko timestamp na `olderThan`           |

## Kayan Aikin Ƙwarewa (4)

An ayyana su a cikin `open-sse/mcp-server/tools/skillTools.ts`. Suna samun goyon baya daga `src/lib/skills/registry` + `src/lib/skills/executor`.

| Kayan aiki                    | Iyakokin izini   | Bayani                                                                                          |
| :---------------------------- | :--------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Jera ƙwarewar da aka yi wa rajista tare da zaɓin tacewa bisa API key, suna, ko matsayin kunnawa |
| `omniroute_skills_enable`     | `write:skills`   | Kunna ko kashe takamaiman ƙwarewa bisa ID                                                       |
| `omniroute_skills_execute`    | `execute:skills` | Gudanar da ƙwarewa da shigarwar da aka bayar sannan a dawo da rikodin gudanarwar                |
| `omniroute_skills_executions` | `read:skills`    | Jera tarihin gudanar da ƙwarewa na baya-bayan nan                                               |

## Tushen Mahallin Notion (6)

An ayyana su a cikin `open-sse/mcp-server/tools/notionTools.ts`. Ana adana token a teburin `key_value` ta hanyar `src/lib/db/notion.ts`. REST client yana cikin `src/lib/notion/api.ts`. Settings API yana cikin `src/app/api/settings/notion/route.ts`. Dashboard UI yana cikin `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Saita token na haɗin Notion ɗinka daga shafin **Tushen Mahalli** a cikin dashboard na Endpoint, ko kuma ta hanyar REST API:

```bash
# Saita token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Duba matsayi
curl http://localhost:20128/api/settings/notion

# Cire haɗin
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Kayan aiki                   | Iyakokin izini | Bayani                                                                  |
| :--------------------------- | :------------- | :---------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Binciken cikakken rubutu a dukkan shafuka da databases                  |
| `notion_get_page`            | `read:notion`  | Sami shafi bisa ID tare da properties nasa                              |
| `notion_list_block_children` | `read:notion`  | Jera child blocks na shafi ko block                                     |
| `notion_query_database`      | `read:notion`  | Yi query ga database tare da filters, sorts, da pagination              |
| `notion_get_database`        | `read:notion`  | Sami schema na database bisa ID                                         |
| `notion_append_blocks`       | `write:notion` | Liƙa children blocks zuwa parent block (mafi yawa 100 a kowace request) |

## Kayan Aikin Kasidar Ƙwarewar Wakili (3)

An ayyana su a cikin `open-sse/mcp-server/tools/agentSkillTools.ts`. Ana tallafa musu ta `src/lib/agentSkills/catalog`. Waɗannan kayan aikin suna bai wa abokan cinikin MCP da wakilai na waje damar amfani da kasidar takardun Ƙwarewar Wakili mai shigarwa 45. Iyaka: `read:catalog`.

| Kayan aiki                        | Iyakoki        | Bayani                                                                                                                                                     |
| :-------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Jera dukkan ƙwarewar wakili 45 tare da matatun `category` (api\|cli) da `area` na zaɓi; yana dawo da metadata + ɗaukar bayani                              |
| `omniroute_agent_skills_get`      | `read:catalog` | Samo cikakken metadata + abun cikin SKILL.md na ƙwarewa guda ta amfani da `id` na hukuma                                                                   |
| `omniroute_agent_skills_coverage` | `read:catalog` | Ƙididdigar ɗaukar bayani: nawa daga cikin ƙwarewar API 23, CLI 21 da config 1 ke da fayilolin SKILL.md a tsarin fayil idan aka kwatanta da jimillar kasida |

Duba [AGENT-SKILLS.md](./AGENT-SKILLS.md) don cikakkiyar kasida da yadda wakilai na waje ke amfani da ita.

## Tsarukan da ke da Alaƙa (v3.8.0)

Jerin kayan aikin MCP da ke sama (kayan aiki na musamman 110, waɗanda `countUniqueMcpTools()` ya ƙididdige) an taƙaita shi da gangan
zuwa ayyukan sarrafa hanya/cache/matsawa/ƙwaƙwalwa/ƙwarewa/proxy/tushen mahallin lokacin aiki. Wasu tsaruka biyu masu alaƙa
ana jigilar su tare da sabar MCP a v3.8.0 kuma an rubuta takardunsu daban:

### Wakilan Cloud

Wakilan Cloud su ne wakilan rubuta lambar AI masu aiki a wajen tsarin (codex-cloud, cursor-cloud, devin, jules) waɗanda aka haɗa da
OmniRoute ta hanyar tsarin haɗi iri ɗaya da ake amfani da shi ga masu samar da LLM. Ana samar da damar amfani da su ta
nasu REST (`/api/v1/agents/*`) kuma **ba sa** cikin kasidar kayan aikin MCP
— kiran Wakilin Cloud ba ya cin wani iyakar MCP.

- Aiwatarwa: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Zagayen rayuwa: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Takardu: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Matakan Kariya

Matakan Kariya matatu ne na kafin/bayan aiwatarwa (vision-bridge, pii-masker, prompt-injection)
waɗanda ake amfani da su a cikin tsarin sarrafa hira. Suna gudana kafin a kai ga matakin kayan aiki/hanyar MCP
kuma suna aika tsararrun take hakki zuwa tsarin binciken aiki; ba a kira su a matsayin kayan aikin MCP.

- Aiwatarwa: `src/lib/guardrails/`.
- Takardu: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Lokacin warware matsalar kiran MCP da ya bayyana an toshe shi, bincika duka rajistar binciken MCP
(shigarwar `scope_denied:*`) da kuma tarihin binciken matakan kariya — ana iya ƙin buƙata ta hanyar
wani matakin kariya **kafin** ta kai ga matakin tilasta iyakar MCP.

---

## Wuraren Ƙarshen REST API

| Wurin ƙarshe           | Hanya                 | Bayani                                                                                                      | Tantancewa                |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------- | :------------------------ |
| `/api/mcp/status`      | `GET`                 | Matsayin saba: bugun zuciya, matsayin jigilar HTTP, taƙaitaccen ayyukan bincike                             | Gudanarwa (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Kasidar kayan aiki (suna, bayani, iyakoki, mataki, wuraren ƙarshen tushe)                                   | Gudanarwa                 |
| `/api/mcp/sse`         | `GET` / `POST`        | Wurin ƙarshen jigilar SSE (wanda `mcpEnabled` + `mcpTransport === "sse"` ke sarrafawa)                      | Maɓallin API + iyakoki    |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Jigilar HTTP mai iya yawo (yana amfani da header na `mcp-session-id`; `DELETE` yana kawo ƙarshen session)   | Maɓallin API + iyakoki    |
| `/api/mcp/audit`       | `GET`                 | Shigarwar rajistar bincike daga `mcp_tool_audit` (matatu: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Gudanarwa                 |
| `/api/mcp/audit/stats` | `GET`                 | Haɗaɗɗun ƙididdigar bincike (`totalCalls`, `successRate`, `avgDurationMs`, manyan kayan aiki)               | Gudanarwa                 |

Fayilolin tushe: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Ana toshe dukkan jigilar SSE da Streamable HTTP har sai an kunna sabar MCP a cikin Saituna (`mcpEnabled`) kuma an zaɓi `mcpTransport` da ya dace. Idan an saita jigilar da ba daidai ba, hanyar za ta dawo da HTTP 400 tare da shawarar sauya saituna.

---

## Tabbatarwa & Iyaka

Kayan aikin MCP yana kiran igiyoyin iyakoki daga mai kira. Wannan binciken yana ɗaya daga cikin sararin samaniya masu zaman kansu guda uku. Wucewa daga mai bincike ɗaya ba wucewa bane daga sauran. Dokokin sune [Sararin samaniya uku](#sararin-samaniya-uku). Kasidar kayan aikin shine [Iyakar kayan aikin MCP](#iyakar-kayan-aikin-mcp).

### Sararin samaniya uku

`manage` akan maɓallin API, `read:compression` akan kayan aikin MCP, da `read` akan alamar shiga `oma_live_…` sune kyaututtuka daban-daban guda uku. Masu kira da suka aika alamar shiga `read` zuwa hanyar gudanarwa mai canzawa suna samun HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Wannan matsayi shine `scopeSatisfies`. Ba ya tuntuɓar teburin MCP, kuma mai daidaita MCP ba ya tuntuɓar shi.

| Sararin samaniya       | Takardar shaidar                                                           | Mai bincike                 | Wucewa yana ba da izini                                               |
| :--------------------- | :------------------------------------------------------------------------- | :-------------------------- | :-------------------------------------------------------------------- |
| Gudanarwar API-key     | `api_keys.scopes`                                                          | `hasManageScope`            | Gudanarwar REST don wannan maɓallin Bearer                            |
| API-key mai ƙari       | jeri ɗaya, igiya ɗaya daidai                                               | mai taimako mai suna a ƙasa | Wannan damar ɗaya kawai                                               |
| Iyakar kayan aikin MCP | jeri ɗaya, in ba haka ba MCP `_meta`, in ba haka ba `OMNIROUTE_MCP_SCOPES` | `scopeMatches`              | Wannan kayan aikin, da zarar an kunna tilastawa                       |
| Alamar shiga           | `oma_live_…`                                                               | `scopeSatisfies`            | Hanyar gudanarwa wacce hanyarta da hanyarta ke buƙatar wannan matsayi |

An rufe buga kowace takardar shaidar a cikin [Tabbatarwar Gudanarwa](../guides/MANAGEMENT-AUTH.md).

#### Iyakar API-key

Jeri ɗaya na `api_keys.scopes` yana ciyar da ayyuka biyu. Suna amfani da ayyuka daban-daban.

**Gudanarwar REST.** `manage` da `admin` sune membobin `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` shine abin da ke ba da izini ga hanyoyin gudanarwa don wannan maɓallin. `admin` yana da ikon gudanarwa akan waɗannan hanyoyin. Kalmar `admin` a nan ba matsayin alamar shiga bane kuma ba ta faɗaɗa zuwa iyakokin kayan aikin MCP.

**Igiyoyin ƙari.** Kowane ɗayan gwajin memba ne daidai, kuma kowane ɗayan yana zama a waje da `MANAGEMENT_API_KEY_SCOPES`.

| Iyaka                          | Wucewa yana ba da izini                                                                                                                                                          |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Ba-loopback `/api/mcp/` LOCAL_ONLY yanke-fita kawai (`hasMcpConnectOrManageScope`). Maɓalli mai `manage` ko `admin` har yanzu yana wucewa wannan yanke-fita.                     |
| `self:usage`                   | `GET /api/v1/me/status` don wannan maɓallin (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` yana ƙara wannan iyaka akan ƙirƙira (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Iyakar asusun sama a cikin wannan nauyin matsayi (`src/lib/usage/apiKeySelfService.ts`). Hanyar matsayi har yanzu tana buƙatar `self:usage`.                                     |
| `policy:bypass-provider-quota` | Kiran wannan maɓallin yana tsallake manufar iyakar mai bayarwa (`hasProviderQuotaBypassScope` a cikin `src/sse/handlers/chat.ts`).                                               |

#### Daidaitawa

Kasidar shine teburin da ke ƙarƙashin [Iyakar kayan aikin MCP](#iyakar-kayan-aikin-mcp). Kada a ɗauki `MCP_SCOPE_LIST` a cikin `src/shared/constants/mcpScopes.ts` a matsayin wannan kasidar: shine asalin nau'in subset. Daga baya kayan aikin suna bayyana ƙarin iyakoki a gefensa (`read:notion`, `read:skills`, `read:local-corpus`, da sauran teburin).

`evaluateToolScopes` a cikin `open-sse/mcp-server/scopeEnforcement.ts` yana ba da izini ga kira lokacin da kowane iyaka da ake buƙata ya dace da wani iyaka da aka bayar:

- `*` yana dacewa da kowane iyaka da ake buƙata.
- Iyaka da aka bayar wanda ya ƙare a `*` yana dacewa da iyaka da ake buƙata wanda ya fara da prefix kafin tauraron. `read:*` yana dacewa da `read:compression`.
- Kowane iyaka da aka bayar yana dacewa da igiyar da ake buƙata iri ɗaya kawai.

Maɓalli wanda iyakokinsa sune `["manage"]` yana kasa `scopeMatches` don `read:compression`. Kiran ɗaya yana kasa don `admin`, `mcp:connect`, `read`, da `write` lokacin da waɗannan sune kawai igiyoyin da aka bayar. Babu matsayi tsakanin iyakokin kayan aikin MCP fiye da `*` mai bi.

An kashe tilastawa sai dai idan `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (default `false`). Yayin da aka kashe shi, `evaluateToolScopes` yana ba da izini ga kiran kuma yana tsallake kasidar. Yayin da aka kunna shi, HTTP yana amfani da `api_keys.scopes` na maɓallin Bearer a matsayin `authInfo` (duba [Haɗin iyakar HTTP na kowane maɓalli](#per-key-http-scope-binding-7895)). Lokacin da babu iyakokin maɓalli da suka warware, saitin da aka bayar yana faɗuwa zuwa MCP `_meta`, sannan `OMNIROUTE_MCP_SCOPES`.

#### Iyakar alamar shiga

Alamomin `oma_live_…` (`src/lib/accessTokens/scopes.ts`) suna ɗauke da `read`, `write`, ko `admin`. `scopeSatisfies` matsayi ne: `admin` yana rufe `write` da `read`, kuma `write` yana rufe `read`. Iyakar da ba a sani ba ba ta rufe komai.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) yana kwatanta wannan matsayi da `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD`, da `OPTIONS` suna buƙatar `read`.
- Kowane hanya tana buƙatar `write`.
- Hanyoyi a cikin `ADMIN_SCOPE_PREFIXES` suna buƙatar `admin` don kowane hanya. `/api/mcp` yana cikin wannan jerin, don haka alamar shiga `write` har yanzu ba za ta iya kiran saman HTTP na MCP ba.
- Hanyoyi a cikin `ADMIN_MUTATION_PREFIXES` suna buƙatar `admin` kawai don canje-canje.

`PATCH /api/keys/{id}` canji ne kuma baya cikin waɗannan jerin gudanarwa, don haka alamar `read` tana karɓar 403
`Ikon alamar shiga 'read' bai isa ba; ana buƙatar 'write'.`
Alamar shiga ta `write` ko `admin` tana biyan buƙatar wannan hanyar. JWT na dashboard, alamar machine-id ta loopback CLI, da kuma maɓallin API mai `manage` ko `admin` suna bin wasu hanyoyi kuma wannan matsayi baya takaita su.

Alamar shiga da ta wuce `scopeSatisfies` don `/api/mcp` ta share ƙofar gudanarwa ne kawai. Kiran kayan aiki har yanzu suna gudanar da `scopeMatches` akan ikon maɓallin API. Matsayin alamar shiga ba shigarwa bane ga `scopeMatches`.

### Ikon kayan aikin MCP

Aiwatar da iko yana tsakiya a cikin `open-sse/mcp-server/scopeEnforcement.ts`. Kowane kayan aiki yana buƙatar takamaiman iko:

| Scope                  | Kayan aiki                                                                                                                                                                              |
| :--------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`          | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                       |
| `read:combos`          | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                               |
| `write:combos`         | `switch_combo`, `set_routing_strategy`                                                                                                                                                  |
| `read:quota`           | `check_quota`                                                                                                                                                                           |
| `read:usage`           | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                  |
| `read:models`          | `list_models_catalog`                                                                                                                                                                   |
| `execute:completions`  | `route_request`, `test_combo`                                                                                                                                                           |
| `execute:search`       | `web_search`, `x_search`, `web_fetch`                                                                                                                                                   |
| `write:budget`         | `set_budget_guard`                                                                                                                                                                      |
| `write:resilience`     | `set_resilience_profile`, `db_health_check`                                                                                                                                             |
| `pricing:write`        | `sync_pricing`                                                                                                                                                                          |
| `read:cache`           | `cache_stats`                                                                                                                                                                           |
| `write:cache`          | `cache_flush`                                                                                                                                                                           |
| `read:compression`     | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                              |
| `write:compression`    | `compression_configure`, `set_compression_engine`                                                                                                                                       |
| `read:proxies`         | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                   |
| `read:notion`          | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                        |
| `write:notion`         | `notion_append_blocks`                                                                                                                                                                  |
| `read:memory`          | `memory_search`                                                                                                                                                                         |
| `write:memory`         | `memory_add`, `memory_clear`                                                                                                                                                            |
| `read:skills`          | `skills_list`, `skills_executions`                                                                                                                                                      |
| `write:skills`         | `skills_enable`                                                                                                                                                                         |
| `execute:skills`       | `skills_execute`                                                                                                                                                                        |
| `read:catalog`         | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                        |
| `read:tools`           | `omniroute_tool_search`                                                                                                                                                                 |
| `read:radar`           | `omniroute_radar_catalog`                                                                                                                                                               |
| `read:gamification`    | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                        |
| `rubuta:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                          |
| `karanta:plugins`      | `plugin_list`, `plugin_executions`                                                                                                                                                      |
| `rubuta:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                         |
| `karanta:obsidian`     | Kayan aikin karantawa 13 — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `rubuta:obsidian`      | Kayan aikin rubutawa 9 — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                 |
| `karanta:local-corpus` | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                       |

Ana tallafawa iyakokin wildcard: `karanta:*` yana ba da duk iyakokin karantawa, `*` yana ba da cikakken damar shiga.

### `mcp:connect` — iyakantaccen ikon hanya (#7895)

Samun damar zuwa HTTP/SSE MCP transport (`/api/mcp/*`) daga wajen loopback yana buƙatar
`/api/mcp/` LOCAL_ONLY carve-out (duba `docs/security/ROUTE_GUARD_TIERS.md`). A tarihi
wannan carve-out yana karɓar cikakken maɓallin API mai `manage`/`admin`-scope kawai — yayi yawa ga
mai kira wanda kawai yake buƙatar magana da MCP. `src/shared/constants/managementScopes.ts` yanzu
yana fitar da `MCP_CONNECT_SCOPE = "mcp:connect"`: wani ƙari, iyakantaccen scope (irin wannan misali kamar
`SELF_USAGE_SCOPE`) wanda ke ba da izini KAWAI ga `/api/mcp/` bypass a cikin
`src/server/authz/policies/management.ts` — baya ba da wani damar shiga hanyar gudanarwa
kuma an ajiye shi da gangan A WAJEN `MANAGEMENT_API_KEY_SCOPES`. Maɓallin da ke riƙe da `manage`/`admin`
har yanzu yana wucewa ta carve-out ba tare da canji ba; `mcp:connect` wani madadin ne mai ƙarancin gata ga
masu kiran MCP-kawai na nesa, ana bincika shi ta hanyar `hasMcpConnectOrManageScope()`.

### Haɗin HTTP na kowane maɓalli (#7895)

Ta hanyar HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` yanzu yana warware ainihin
`api_keys.scopes` na mai kira ta hanyar `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
kuma yana wuce shi zuwa `transport.handleRequest(req, { authInfo })` na MCP SDK, don haka
`extra.authInfo.scopes` da ke isa kowane kiran kayan aiki yana nuna iyakokin maɓallin Bearer.
`scopeEnforcement.ts`'s `resolveCallerScopeContext()` tuni ya ba da fifiko ga `authInfo` akan
`_meta` da `OMNIROUTE_MCP_SCOPES` env fallback — wannan kawai yana cika wannan farkon,
mafi girman tushen fifiko, wanda a baya ba a ciyar da shi ta hanyar HTTP ba. Lokacin da babu maɓallin API da ya warware
(babu header, maɓalli mara inganci), `authInfo` yana kasancewa `undefined` kuma warwarewa yana faɗuwa zuwa
sarkar `meta`/env da ke akwai ba tare da canji ba. Wannan baya canza tsoho na `OMNIROUTE_MCP_ENFORCE_SCOPES` —
har yanzu dole ne a kunna tilastawa a fili; wannan canjin kawai yana sa
hanyar kowane maɓalli ta ɗauki fifiko da zarar an kunna ta. Stdio ba shi da ainihin mai kira (duba
`mcpCallerIdentity.ts`) kuma ba a shafa shi ba — yana kasancewa a kan sarkar `_meta`/env fallback.

---

## Sauye-sauyen Muhalli

| Sauyi                                   | Tsoho                                 | Manufa                                                                                                                                           |
| :-------------------------------------- | :------------------------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`              | Babban URL da sabar MCP ke amfani da shi lokacin kiran API na cikin gida na OmniRoute                                                            |
| `OMNIROUTE_API_KEY`                     | (babu komai)                          | Mabudin API da ake turawa a matsayin `Authorization: Bearer` zuwa kiraye-kirayen API na cikin gida                                               |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` kaɗai ke kunna shi) | Idan an kunna, rashin scopes zai hana kiran kayan aiki kuma ya rubuta `scope_denied:<reason>` a kundin binciken tsaro                            |
| `OMNIROUTE_MCP_SCOPES`                  | (babu komai)                          | Jerin scopes da aka raba da waƙafi waɗanda ake ɗauka a matsayin “akwai” ta tsohuwa (ana amfani da shi idan mai kira bai bayar da nasa scopes ba) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (ba a saita ba = a kunne)             | Idan aka saita zuwa `0/false/off/no`, yana kashe matse bayanin MCP a lokacin rajista                                                             |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (ba a saita ba = a kunne)             | Wani madadin suna na wannan maɓallin da ke sama                                                                                                  |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                               | Iyakar lokacin sokewa don karatun gudanarwa na cikin gida (lafiya, juriya, haɗe-haɗe, ƙayyadadden amfani, amfani)                                |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                               | Iyakar lokacin sokewa don matakan da ke jiran mai samarwa (`route_request`, `web_search`, `web_fetch`)                                           |
| `MCP_TOOL_DENY`                         | (ba a saita ba = babu tacewa)         | Sunayen kayan aiki da aka raba da waƙafi waɗanda za a cire daga `tools/list` (rage yawan nau'ikan kayan aiki — duba ƙasa)                        |
| `MCP_TOOL_ALLOW`                        | (ba a saita ba = babu tacewa)         | Sunayen kayan aiki da aka raba da waƙafi waɗanda za a riƙe su kaɗai (yanayin jerin-izini — duba ƙasa)                                            |
| `DATA_DIR`                              | `~/.omniroute`                        | Ana rubuta fayil ɗin heartbeat zuwa `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                     |

---

## Matse Bayani

Rijistocin kayan aiki, prompt, da albarkatun MCP za su iya matse bayanai a lokacin rajista/jera su domin rage girman metadata da ake nuna wa abokan ciniki (saboda haka rage kuɗin mahallin prompt). Aiwatarwar tana cikin `open-sse/mcp-server/descriptionCompressor.ts` kuma an haɗa ta da sabar MCP ta hanyar `compressMcpRegistryMetadata` a cikin `createMcpServer()`.

- Ana gudanar da matsewa a kan rubutun bayanin ta amfani da ƙa'idojin Caveman (`getRulesForContext("all", "full")`) tare da cire tubalan da za a kiyaye (sassan lamba, tubalan da aka kewaye da shinge, da sauransu) domin kada a sauya tsarin abun ciki.
- Ana kunna ko kashewa ga kowane turawa ta hanyar ƙimar `compression.mcpDescriptionCompressionEnabled` a cikin teburin saituna na `key_value` (tsoho: a kunne) — ana nuna shi a UI a matsayin **Analytics → Matse bayanin MCP**.
- Ana kunna ko kashewa ga dukkan tsarin aiki ta hanyar `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ko `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Ana nuna ƙididdiga na ainihin lokaci ta hanyar `omniroute_compression_status` a ƙarƙashin `analytics.mcpDescriptionCompression`, kuma ana yi musu alamar `source: "mcp_metadata_estimate"` domin bambanta su da ainihin bayanan amfani daga masu samarwa.

---

## Rage Yawan Kayan Aiki (F4.3)

Matse bayanai yana rage girman metadata na kowane kayan aiki; **rage yawan kayan aiki** yana ci gaba da wani mataki ta hanyar rage _adadin_ kayan aikin da ake sanarwa gaba ɗaya. Nuna ƙananan kayan aiki a cikin manifest ɗin `tools/list` yana rage kuɗin token na kowane buƙata da samfurin abokin ciniki ke biya saboda kundin kayan aiki (matsewar "layer 5"). Aiwatarwar tacewa ce tsantsa marar adana yanayi a cikin `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), wadda aka haɗa da madaukin rajista a cikin `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Sai an zaɓa, a kashe yake ta tsohuwa.** Tacewar tana aiki ne kawai idan an saita aƙalla ɗaya daga cikin sauye-sauyen muhalli guda biyu; idan ba a saita ko ɗaya ba, ana sanar da duk kayan aiki 110 ba tare da wani canji ba.

| Sauyi            | Yanayi                                                                                             |
| :--------------- | :------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Jerin hanawa — sunayen kayan aiki da waƙafi ya raba waɗanda ake cirewa koyaushe daga `tools/list`  |
| `MCP_TOOL_ALLOW` | Jerin izini — sunayen kayan aiki da waƙafi ya raba; waɗannan kaɗai suke saura, ana cire duk sauran |

`deny` yana da fifiko a kan `allow`. Ana raba sunaye da waƙafi, a cire sararin da ke gefunansu, sannan a yi watsi da shigarwar da babu komai. Misalai:

```bash
# Cire kayan aiki biyu daga kundin
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Sanar da kayan aikin routing + quota kaɗai (yanayin jerin izini)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Yadda ake cire kayan aikin da aka tace:** rajista yana yin nasara koyaushe; daga nan sai a yi `.disable()` ga kayan aikin da profile ya ƙi a kan MCP SDK handle, don haka ba zai taɓa bayyana a cikin `tools/list` ba amma haɗin yana nan daram (sauƙin kunna/kashewa, babu sake rajista). Mai nazarin profile shi ne `readMcpToolProfileFromEnv(process.env)`, wanda ke dawo da `null` (babu tacewa) idan dukkan vars ɗin biyu babu komai.

Siffar `ToolProfile` mafi yalwa da ke bayan `reduceToolManifest` tana kuma goyon bayan tacewa ta haɗuwar scope (`allowScopes`, tare da daidaitawar wildcard irin ta `read:*`) da ƙayyadadden iyakar `maxTools` mai sakamako iri ɗaya a kowane lokaci, amma waɗannan saituna guda biyu suna buƙatar cikakken manifest a lokacin rajista kuma **ba** a samar da su ta hanyar sauye-sauyen muhalli a yau (hook na matakin `tools/list` wani aikin gaba ne da ake bibiyarsa). Ana iya amfani da `estimateManifestTokens()` don kwatanta kuɗin token na manifest kafin da bayan ragewa.

---

## Bugun Zuciyar Runtime

Transport na stdio yana adana matsayin rayuwa zuwa `${DATA_DIR}/runtime/mcp-heartbeat.json` a kowane daƙiƙa 5. Dashboard (`/api/mcp/status`) yana karanta wannan fayil tare da matsayin rayuwar PID don tantance `online`. Maimakon haka, transports na HTTP suna bayar da rahoton matsayi daga `getMcpHttpStatus()` da ke cikin process ɗin (ba a rubuta fayil).

Snapshot na bugun zuciya yana ɗauke da:

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

## Rajistar Binciken Audit

Ana rubuta kowane kiran kayan aiki zuwa teburin SQLite `mcp_tool_audit` ta `open-sse/mcp-server/audit.ts`:

- Sunan kayan aiki, arguments (an yi musu hash/an taƙaita su bisa `auditLevel` na kowane kayan aiki), sakamako
- Tsawon lokaci a cikin ms, alamar nasara/rashin nasara, saƙon kuskure (idan ya dace)
- Hash na API key, timestamp
- Ana rubuta ƙin scope a matsayin `scope_denied:<reason>` tare da jerin scope da suka ɓace

Yi amfani da dashboard ko REST endpoints na `/api/mcp/audit` da `/api/mcp/audit/stats` don duba kiraye-kirayen baya-bayan nan.

---

## Fayiloli

| Fayil                                                                    | Manufa                                                                             |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Maƙerin sabar MCP, wurin farawa na stdio, rajistar kayan aiki bisa iyaka           |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + jigilar HTTP mai iya yawo (sarrafa zaman aiki)                               |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Tantance iyakar kayan aiki da gano mai kira                                        |
| `open-sse/mcp-server/audit.ts`                                           | Rubuta tarihin binciken kiran kayan aiki (`mcp_tool_audit`)                        |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Marubucin bugun-zuciyar stdio (`mcp-heartbeat.json`)                               |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Matse bayanai don rajistar kayan aiki / faɗakarwa / albarkatu                      |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Tsarukan Zod + rajistar kayan aiki (`MCP_TOOLS`, shigarwar 45)                     |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Mataki na 2 + cache + masu sarrafa kayan aikin 1proxy                              |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Masu sarrafa kayan aikin matse bayanai                                             |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Ma'anar kayan aikin ma'adanar ƙwaƙwalwa (kayan aiki 3)                             |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Ma'anar kayan aikin ƙwarewa (kayan aiki 4)                                         |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Ma'anar kayan aikin tushen mahallin Notion (kayan aiki 6)                          |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Ma'anar kayan aikin mayar da abu tamkar wasa (kayan aiki 8)                        |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Kayan aikin rajista da sarrafa plugin (kayan aiki 8)                               |
| `src/app/api/mcp/status/route.ts`                                        | Mashigar `/api/mcp/status`                                                         |
| `src/app/api/mcp/tools/route.ts`                                         | Mashigar `/api/mcp/tools`                                                          |
| `src/app/api/mcp/sse/route.ts`                                           | Hanyar jigilar SSE ta `/api/mcp/sse`                                               |
| `src/app/api/mcp/stream/route.ts`                                        | Hanyar jigilar HTTP mai iya yawo ta `/api/mcp/stream`                              |
| `src/app/api/mcp/audit/route.ts`                                         | Tambayar tarihin bincike ta `/api/mcp/audit`                                       |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Haɗaɗɗun ma'aunai na bincike na `/api/mcp/audit/stats`                             |
| `src/lib/notion/api.ts`                                                  | Abokin hulɗar REST API na Notion (sake gwadawa, wa'adin lokaci, rarraba kurakurai) |
| `src/lib/db/notion.ts`                                                   | Dorewar token na Notion (teburin `key_value`)                                      |
| `src/app/api/settings/notion/route.ts`                                   | API na saitunan Notion (GET/POST/DELETE)                                           |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI na sarrafa token na Notion                                                      |
| `tests/unit/notion-api.test.ts`                                          | Gwaje-gwajen abokin hulɗar API na Notion (7)                                       |
| `tests/unit/notion-tools.test.ts`                                        | Gwaje-gwajen tilasta iyakar kayan aikin Notion (10)                                |
| `tests/unit/db/notion.test.mjs`                                          | Gwaje-gwajen tsarin DB na Notion (3)                                               |
