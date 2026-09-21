# OmniRoute MCP Server Documentation (Kiswahili)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Seva ya Model Context Protocol yenye zana 110 katika shughuli za uelekezaji, akiba, ubanaji, kumbukumbu, ujuzi, proksi, kundi, Radar, na vyanzo vya muktadha.
>
> Chanzo rasmi: `open-sse/mcp-server/server.ts` hukokotoa **zana 110 za kipekee** kwa kutumia `countUniqueMcpTools()`: fafanuzi 45 za msingi (zikijumuisha zana sita za mzunguko wa maisha wa CCR, zana tatu za ujuzi wa ajenti, `omniroute_radar_catalog`, na `omniroute_x_search`), pamoja na kumbukumbu (3), ujuzi (4), ujuzi wa GitHub (3), kundi (6), ugamishaji (8), programu-jalizi (8), Notion (6), Obsidian (22), mkusanyiko wa ndani (3), na zana mbili za ubanaji za RTK pekee.

## Usakinishaji

OmniRoute MCP imejengewa ndani. Ianzishe kwa:

```bash
omniroute --mcp
```

Au kupitia usafirishaji wa open-sse:

```bash
# Usafirishaji wa HTTP unaoweza kutiririshwa (porti 20130)
omniroute --dev  # MCP hujianzisha kiotomatiki kwenye endpoint ya /mcp
```

Usafirishaji wa HTTP (`sse` / `streamable-http`, unaotolewa ndani ya mchakato na seva ya dashibodi)
umezimwa kwa chaguo-msingi na hapo awali ungeweza kuwashwa au kuzimwa kutoka kwenye ukurasa wa `/dashboard/mcp` pekee. Kuanzia v3.8.51
CLI ina uwezo sawa:

```bash
omniroute mcp status                                  # imewashwa/iko mtandaoni, usafirishaji, idadi ya zana
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # huweka upya vipindi amilifu vya sse/streamable-http
```

`mcp enable`/`mcp disable` hutuma PATCH kwa mpangilio uleule wa `mcpEnabled` (na kwa hiari `mcpTransport`)
ambao dashibodi huuwasha au kuuzima kupitia `/api/settings`. `mcp restart` huita `POST /api/mcp/restart`: huvunja
vipindi amilifu vya `sse`/`streamable-http` ili ombi linalofuata lianzishwe upya kwa usafi, hurejesha
`409` ikiwa MCP imezimwa, na `501` kwa usafirishaji wa `stdio` (wateja wa stdio humiliki
michakato yao midogo — hakuna kishikio cha ndani ya mchakato cha kuanzishwa upya).

## Usafirishaji

Seva ya MCP hutoa aina tatu za usafirishaji, zote zikisaidiwa na kiwanda kilekile cha `createMcpServer()`:

| Usafirishaji      | Mahali                                          | Wakati wa kutumia                                               |
| :---------------- | :---------------------------------------------- | :-------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                 | Miunganisho ya IDE (Claude Desktop, Cursor, n.k.)               |
| `sse`             | `POST/GET /api/mcp/sse` kupitia `httpTransport` | Wateja wa kivinjari/ajenti wanaohitaji mtiririko wa matukio     |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`               | Wateja wa HTTP wenye vipindi vingi (header ya `mcp-session-id`) |

Usafirishaji amilifu wa HTTP (`sse` au `streamable-http`) huchaguliwa na mpangilio wa `mcpTransport`. Kubadilisha usafirishaji hufunga vipindi vilivyopo kwenye usafirishaji mwingine.

### Ufikiaji wa mbali (upitaji wa upeo wa manage)

`/api/mcp/*` iko katika kiwango cha LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — kwa chaguo-msingi ni seva mwenyeji za loopback pekee (`localhost`, `127.0.0.1`, `::1`) zinazoweza kuifikia. Tangu v3.8.2, wateja wasio wa loopback wanaweza kuunganisha ikiwa watawasilisha `Authorization: Bearer <api-key>` ambayo ufunguo wake una upeo wa `manage`. Hii ndiyo njia pekee ya kufikia seva ya mbali ya MCP kupitia handaki, proksi geuzi, au jina la seva mwenyeji la umma.

```bash
# Toa upeo wa manage: fungua ukurasa wa API Keys wa dashibodi na uwashe
# "Management Access" kwenye ufunguo, au utume POST scopes:["manage"] wakati wa kuunda.

# Kisha unganisha kutoka kwa mteja wa mbali wa MCP:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ufunguo usio na `manage` (au bila Bearer) hurejesha `403 LOCAL_ONLY`. Kiambishi awali kinachohusiana `/api/cli-tools/runtime/*` hakiruhusiwi kupitwa kimakusudi — tazama [Viwango vya Route Guard — ruhusa maalum ya upeo wa manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Usanidi wa IDE

Tazama [Usanidi wa Mteja wa MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) kwa usanidi wa Claude Desktop,
Cursor, Cline, na viteja vinavyooana vya MCP.

---

## Zana Muhimu (14) — Awamu ya 1

| Zana                            | Mawanda               | Maelezo                                                                                                                                        |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Muda wa kufanya kazi, kumbukumbu, vivunja saketi, vikomo vya kiwango, takwimu za akiba                                                         |
| `omniroute_list_combos`         | `read:combos`         | Michanganyiko yote iliyosanidiwa pamoja na mikakati (vipimo vya hiari)                                                                         |
| `omniroute_get_combo_metrics`   | `read:combos`         | Vipimo vya utendaji vya mchanganyiko mahususi                                                                                                  |
| `omniroute_switch_combo`        | `write:combos`        | Washa au zima mchanganyiko                                                                                                                     |
| `omniroute_create_combo`        | `write:combos`        | Unda mchanganyiko uliothibitishwa kupitia API iliyopo ya michanganyiko                                                                         |
| `omniroute_check_quota`         | `read:quota`          | Kiasi kilichotumika/jumla, asilimia iliyosalia, muda wa kuweka upya, hali ya tokeni                                                            |
| `omniroute_route_request`       | `execute:completions` | Tuma ukamilishaji wa gumzo kupitia uelekezaji wa OmniRoute                                                                                     |
| `omniroute_cost_report`         | `read:usage`          | Ripoti ya gharama kulingana na kipindi (kipindi cha matumizi/siku/wiki/mwezi)                                                                  |
| `omniroute_list_models_catalog` | `read:models`         | Katalogi kamili ya miundo pamoja na uwezo, hali, na bei                                                                                        |
| `omniroute_radar_catalog`       | `read:radar`          | Katalogi ya Radar ya ndani iliyotiwa saini; vichujio vya hiari vya mtoa huduma/familia                                                         |
| `omniroute_tool_search`         | `read:tools`          | Gundua zana kutoka kwenye katalogi ya MCP iliyosajiliwa                                                                                        |
| `omniroute_web_search`          | `execute:search`      | Tafuta kwenye wavuti kupitia watoa huduma wa utafutaji waliosanidiwa. Si X/Twitter.                                                            |
| `omniroute_x_search`            | `execute:search`      | Tafuta X kupitia xAI/SuperGrok, au chagua `xquik-search` kwa matokeo ya API ya Xquik. Inahitaji vitambulisho vya mfumo wa nyuma uliochaguliwa. |
| `omniroute_web_fetch`           | `execute:search`      | Leta maudhui ya wavuti kupitia watoa huduma wa uletaji waliosanidiwa                                                                           |

## Zana za Kina (11) — Awamu ya 2

| Zana                               | Wigo                                 | Maelezo                                                                                                                          |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Uigaji wa uelekezaji wa majaribio bila utekelezaji, ukiwa na mti wa njia mbadala                                                 |
| `omniroute_set_budget_guard`       | `write:budget`                       | Bajeti ya kipindi yenye hatua ya kupunguza huduma/kuzuia/kutoa tahadhari                                                         |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Sasisha mkakati wa mchanganyiko wakati wa utekelezaji (kipaumbele/uzani/otomatiki/n.k.)                                          |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Tumia mpangilio awali wa ustahimilivu wa `aggressive` / `balanced` / `conservative`                                              |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Jaribio la moja kwa moja la kila mtoa huduma katika mchanganyiko kwa kutumia ombi halisi la mfumo wa juu                         |
| `omniroute_get_provider_metrics`   | `read:health`                        | Vipimo vya kila mtoa huduma vyenye ukawivu wa p50/p95/p99 na hali ya kivunja mzunguko                                            |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Pendekeza mchanganyiko kulingana na aina ya jukumu pamoja na vikwazo vya bajeti/ukawivu                                          |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Eleza kwa nini ombi lilielekezwa kwa mtoa huduma fulani (vipengele vya ukadiriaji + njia mbadala)                                |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Taswira kamili ya kipindi: gharama, tokeni, modeli/watoa huduma wakuu, hitilafu, ulinzi wa bajeti                                |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Tambua (na kwa hiari urekebishe kiotomatiki) hitilafu za hifadhidata kama marejeleo yaliyovunjika ya michanganyiko / safu yatima |
| `omniroute_sync_pricing`           | `pricing:write`                      | Landanisha data ya bei kutoka vyanzo vya nje (LiteLLM); inasaidia `dryRun`                                                       |

## Zana za Akiba (2)

| Zana                    | Wigo          | Maelezo                                                                  |
| :---------------------- | :------------ | :----------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Takwimu za akiba ya kisemantiki, akiba ya kidokezo, na kutorudia matokeo |
| `omniroute_cache_flush` | `write:cache` | Futa akiba kote au kulingana na saini/modeli                             |

## Zana za Mfinyazo (13)

| Zana                                | Wigo                | Maelezo                                                                                                                                           |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Mipangilio ya mfinyazo, muhtasari wa uchanganuzi, na takwimu zinazozingatia akiba (inajumuisha metadata ya `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Sanidi hali ya mfinyazo, kizingiti, uwiano lengwa, uhifadhi wa kidokezo cha mfumo, na kitufe cha mfinyazo wa maelezo ya MCP                       |
| `omniroute_set_compression_engine`  | `write:compression` | Chagua injini inayotumika (off/caveman/rtk/stacked) na kiwango cha Caveman/RTK                                                                    |
| `omniroute_list_compression_combos` | `read:compression`  | Orodhesha michanganyiko ya mfinyazo iliyopewa majina na mifumo yake ya injini                                                                     |
| `omniroute_compression_combo_stats` | `read:compression`  | Uchanganuzi uliopangwa kwa mchanganyiko wa mfinyazo na injini                                                                                     |
| `omniroute_ccr_store`               | `write:compression` | Hifadhi maudhui yaliyotengwa kwa mwitaji katika hifadhi ya CCR ya kumbukumbu yenye kikomo na urejeshe kiashirio pamoja na rejeleo la `ccr://`     |
| `omniroute_ccr_retrieve`            | `read:compression`  | Rejesha maudhui ya CCR kikamilifu au kwa hali za mwanzo, mwisho, mistari, grep, na takwimu                                                        |
| `omniroute_ccr_inspect`             | `read:compression`  | Kagua metadata ya CCR inayomilikiwa na mwitaji bila kurejesha maudhui                                                                             |
| `omniroute_ccr_list`                | `read:compression`  | Orodhesha metadata iliyogawanywa katika kurasa kwa vizuizi vya CCR vinavyomilikiwa na mwitaji                                                     |
| `omniroute_ccr_delete`              | `write:compression` | Futa kizuizi cha CCR kinachomilikiwa na mwitaji                                                                                                   |
| `omniroute_ccr_stats`               | `read:compression`  | Ripoti matumizi ya kumbukumbu kwa kila mwitaji, vihesabio vya mzunguko wa maisha, na vikomo vya hifadhi                                           |
| `omniroute_rtk_discover`            | `read:compression`  | Gundua kelele inayojirudia katika sampuli za matokeo ya RTK zilizochaguliwa kwa hiari                                                             |
| `omniroute_rtk_learn`               | `read:compression`  | Tengeneza rasimu ya kichujio cha RTK inayoweza kukaguliwa kutoka sampuli zilizochaguliwa kwa hiari                                                |

Maingizo ya CCR huhifadhiwa kwenye kumbukumbu pekee na hupotea mfumo unapoanzishwa upya. Kila kizuizi kina kikomo cha 2 MiB, kila
mhusika ana kikomo cha 16 MiB, na hifadhi ya jumla ina kikomo cha 64 MiB. Kwa chaguo-msingi, maingizo yana TTL ya saa 24 (kiwango cha juu
ni siku saba). Urejeshaji kamili wa MCP una kikomo cha 256 KiB; vizuizi vikubwa zaidi huendelea kupatikana kupitia
hali za masafa na grep. Uhifadhi, urejeshaji, uorodheshaji, ukaguzi, ufutaji, na takwimu hutengwa kulingana na
mhusika aliyethibitishwa wa ufunguo wa API. Rekodi za ukaguzi huwa na hashi na metadata ya ukubwa pekee, kamwe si maudhui.

`omniroute_compression_status` huripoti mbano wa maelezo ya MCP kando chini ya
`analytics.mcpDescriptionCompression`. Thamani hizo ni makadirio ya ukubwa wa metadata kwa maelezo
yanayoweza kuorodheshwa ya MCP (`tools`, `prompts`, `resources`, na `resourceTemplates`); si rekodi za
matumizi za mtoa huduma na zimewekewa alama ya `source: "mcp_metadata_estimate"`.

### Kichujio cha Mti wa Ufikivu wa MCP (v3.8.0)

Kikiwa tofauti na zana za mbano zilizo hapo juu, OmniRoute inajumuisha kichujio cha baada ya utekelezaji
kinachobana **matokeo ya zana** ya zana za kivinjari/ufikivu za MCP kabla hayajarejeshwa kwa
ajenti. Kichujio hiki si zana chenyewe — huendeshwa kwa uwazi kwenye matokeo yoyote ya zana yaliyo na
maandishi marefu ya mti wa ufikivu au picha ya hali ya kivinjari (herufi ≥2000).

Tabia kuu:

- Hukusanya mistari ndugu inayojirudia mara ≥30 mfululizo kuwa muhtasari wa mwanzo + mwisho
- Huhifadhi viankara vya `[ref=eXX]` vinavyohitajika na Playwright/computer-use
- Hupunguza moja kwa moja maandishi yenye ukubwa kupita kiasi (herufi >50,000) pamoja na kidokezo cha uelekezaji
- Akiba inayotarajiwa: **60–80%** kwenye data za picha ya hali ya kivinjari

Usanidi: `compression.mcpAccessibility` katika mipangilio ya jumla (uhamishaji 056).
Utekelezaji: `open-sse/services/compression/engines/mcpAccessibility/`.
Nyaraka kamili: [Injini za Mbano — Kichujio cha Mti wa Ufikivu wa MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Tazama [Injini za Mbano](../compression/COMPRESSION_ENGINES.md) na [Mbano wa RTK](../compression/RTK_COMPRESSION.md) kwa
muundo wa mbano wa wakati wa utekelezaji unaotumiwa na zana hizi.

## Zana za 1Proxy (3)

| Zana                        | Mawanda        | Maelezo                                                                                         |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Leta proksi zisizolipishwa kutoka soko la 1proxy (vichujio vya itifaki/nchi/ubora/kikomo)       |
| `omniroute_oneproxy_rotate` | `read:proxies` | Pata proksi inayofuata inayopatikana kulingana na mkakati (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Takwimu za mkusanyiko, hali ya ulandanishi, usambazaji kulingana na itifaki na nchi             |

## Zana za Kumbukumbu (3)

Zimefafanuliwa katika `open-sse/mcp-server/tools/memoryTools.ts`. Uthibitishaji/mawanda hutekelezwa kupitia mchakato wa kawaida wa mawanda wa MCP.

| Zana                      | Mawanda        | Maelezo                                                                                         |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Tafuta kumbukumbu kwa hoja / aina / ufunguo wa API kwa kutekeleza kikomo cha bajeti ya tokeni   |
| `omniroute_memory_add`    | `write:memory` | Ongeza ingizo jipya la kumbukumbu (`factual` / `episodic` / `procedural` / `semantic`)          |
| `omniroute_memory_clear`  | `write:memory` | Futa kumbukumbu za ufunguo wa API, kwa hiari ukichuja kwa aina au muhuri wa muda wa `olderThan` |

## Zana za Ujuzi (4)

Zimefafanuliwa katika `open-sse/mcp-server/tools/skillTools.ts`. Zinaendeshwa na `src/lib/skills/registry` + `src/lib/skills/executor`.

| Zana                          | Mawanda          | Maelezo                                                                                                    |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Orodhesha ujuzi uliosajiliwa kwa uchujaji wa hiari kulingana na ufunguo wa API, jina au hali ya kuwezeshwa |
| `omniroute_skills_enable`     | `write:skills`   | Wezesha au lemaza ujuzi mahususi kwa ID                                                                    |
| `omniroute_skills_execute`    | `execute:skills` | Tekeleza ujuzi kwa ingizo lililotolewa na urejeshe rekodi ya utekelezaji                                   |
| `omniroute_skills_executions` | `read:skills`    | Orodhesha historia ya hivi karibuni ya utekelezaji wa ujuzi                                                |

## Chanzo cha Muktadha cha Notion (6)

Zimefafanuliwa katika `open-sse/mcp-server/tools/notionTools.ts`. Tokeni imehifadhiwa katika jedwali la `key_value` kupitia `src/lib/db/notion.ts`. Kiteja cha REST kiko katika `src/lib/notion/api.ts`. API ya mipangilio iko katika `src/app/api/settings/notion/route.ts`. Kiolesura cha dashibodi kiko katika `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Sanidi tokeni yako ya muunganisho wa Notion kutoka kwenye kichupo cha **Vyanzo vya Muktadha** katika dashibodi ya Endpoint, au kupitia API ya REST:

```bash
# Weka tokeni
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Angalia hali
curl http://localhost:20128/api/settings/notion

# Kata muunganisho
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Zana                         | Mawanda        | Maelezo                                                                    |
| :--------------------------- | :------------- | :------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Utafutaji wa maandishi kamili katika kurasa na hifadhidata zote            |
| `notion_get_page`            | `read:notion`  | Pata ukurasa kwa ID pamoja na sifa zake                                    |
| `notion_list_block_children` | `read:notion`  | Orodhesha vizuizi-toto vya ukurasa au kizuizi                              |
| `notion_query_database`      | `read:notion`  | Hoji hifadhidata kwa vichujio, mipangilio ya upangaji na ugawaji wa kurasa |
| `notion_get_database`        | `read:notion`  | Pata muundo wa hifadhidata kwa ID                                          |
| `notion_append_blocks`       | `write:notion` | Ambatisha vizuizi-toto kwenye kizuizi kikuu (upeo wa 100 kwa kila ombi)    |

## Zana za Katalogi ya Ujuzi wa Ajenti (3)

Zimefafanuliwa katika `open-sse/mcp-server/tools/agentSkillTools.ts`. Zinaendeshwa na `src/lib/agentSkills/catalog`. Zana hizi zinafanya katalogi ya nyaraka za Ujuzi wa Ajenti yenye vipengele 45 ipatikane kwa wateja wa MCP na maajenti wa nje. Upeo: `read:catalog`.

| Zana                              | Upeo           | Maelezo                                                                                                                                                                 |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Orodhesha ujuzi wote 45 wa ajenti kwa vichujio vya hiari vya `category` (api\|cli) na `area`; hurejesha metadata + ufunikaji                                            |
| `omniroute_agent_skills_get`      | `read:catalog` | Pata metadata kamili + maudhui ya SKILL.md kwa ujuzi mmoja kwa kutumia `id` yake sanifu                                                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | Takwimu za ufunikaji: ni ujuzi mingapi kati ya 23 wa API, 21 wa CLI na 1 wa usanidi ulio na faili za SKILL.md kwenye mfumo wa faili ikilinganishwa na jumla za katalogi |

Tazama [AGENT-SKILLS.md](./AGENT-SKILLS.md) kwa katalogi kamili na jinsi maajenti wa nje wanavyoitumia.

## Mifumo Husika (v3.8.0)

Orodha ya zana za MCP iliyo hapo juu (zana 110 za kipekee, zilizohesabiwa na `countUniqueMcpTools()`) imewekewa kwa makusudi
upeo wa shughuli za uelekezaji wakati wa utekelezaji/hifadhi-akiba/ubanaji/kumbukumbu/ujuzi/proksi/chanzo-cha-muktadha. Mifumo miwili inayohusiana
inasambazwa pamoja na seva ya MCP katika v3.8.0 na imeandikwa kando:

### Maajenti wa Wingu

Maajenti wa Wingu ni maajenti wa AI wa kuandika msimbo wanaotekelezwa nje ya mchakato (codex-cloud, cursor-cloud, devin, jules) na kuunganishwa na
OmniRoute kupitia muundo uleule wa muunganisho unaotumiwa kwa watoa huduma wa LLM. Wanapatikana kupitia
kiolesura chao wenyewe cha REST (`/api/v1/agents/*`) na **si** sehemu ya katalogi ya zana za MCP
— kuita Ajenti wa Wingu hakutumii upeo wa MCP.

- Utekelezaji: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Mzunguko wa maisha: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Nyaraka: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Vizuizi vya Usalama

Vizuizi vya usalama ni vichujio vya kabla/baada ya utekelezaji (vision-bridge, pii-masker, prompt-injection)
vinavyotumika ndani ya mtiririko wa gumzo. Hutekelezwa kabla ya kufikiwa kwa safu ya zana/uelekezaji ya MCP
na hutuma ukiukaji uliopangwa kwa mtiririko wa ukaguzi; haviitwi kama zana za MCP.

- Utekelezaji: `src/lib/guardrails/`.
- Nyaraka: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Unapotatua hitilafu ya mwito wa MCP unaoonekana kuzuiwa, angalia kumbukumbu ya ukaguzi ya MCP
(maingizo ya `scope_denied:*`) pamoja na rekodi ya ukaguzi ya vizuizi vya usalama — ombi linaweza kukataliwa na
kizuizi cha usalama **kabla** halijafikia kamwe safu ya utekelezaji wa upeo wa MCP.

---

## Vituo vya Mwisho vya REST API

| Kituo cha Mwisho       | Mbinu                 | Maelezo                                                                                                                | Uthibitishaji                 |
| :--------------------- | :-------------------- | :--------------------------------------------------------------------------------------------------------------------- | :---------------------------- |
| `/api/mcp/status`      | `GET`                 | Hali ya seva: mapigo ya moyo, hali ya usafirishaji wa HTTP, muhtasari wa shughuli za ukaguzi                           | Usimamizi (kipindi/msimamizi) |
| `/api/mcp/tools`       | `GET`                 | Katalogi ya zana (jina, maelezo, upeo, awamu, vituo vya mwisho vya chanzo)                                             | Usimamizi                     |
| `/api/mcp/sse`         | `GET` / `POST`        | Kituo cha mwisho cha usafirishaji wa SSE (kinadhibitiwa na `mcpEnabled` + `mcpTransport === "sse"`)                    | Ufunguo wa API + upeo         |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Usafirishaji wa HTTP unaoweza kutiririshwa (hutumia kichwa cha `mcp-session-id`; `DELETE` hukomesha kipindi)           | Ufunguo wa API + upeo         |
| `/api/mcp/audit`       | `GET`                 | Maingizo ya kumbukumbu ya ukaguzi kutoka `mcp_tool_audit` (vichujio: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Usimamizi                     |
| `/api/mcp/audit/stats` | `GET`                 | Takwimu zilizojumlishwa za ukaguzi (`totalCalls`, `successRate`, `avgDurationMs`, zana maarufu)                        | Usimamizi                     |

Faili za chanzo: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Usafirishaji wa SSE na HTTP Inayoweza Kutiririshwa huzuiwa hadi seva ya MCP iwashwe katika Mipangilio (`mcpEnabled`) na `mcpTransport` inayofaa ichaguliwe. Ikiwa usafirishaji usio sahihi umesanidiwa, njia hurejesha HTTP 400 ikiwa na kidokezo cha kubadilisha mipangilio.

---

## Uthibitishaji na Mawanda

Zana za MCP huthibitishwa kupitia mawanda ya ufunguo wa API. Utekelezaji wa masharti ya mawanda umewekwa pamoja katika
`open-sse/mcp-server/scopeEnforcement.ts`. Kila zana inahitaji mawanda mahususi:

| Upeo                  | Zana                                                                                                                                                                             |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                        |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                           |
| `read:quota`          | `check_quota`                                                                                                                                                                    |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                           |
| `read:models`         | `list_models_catalog`                                                                                                                                                            |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                    |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                            |
| `write:budget`        | `set_budget_guard`                                                                                                                                                               |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                      |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                   |
| `read:cache`          | `cache_stats`                                                                                                                                                                    |
| `write:cache`         | `cache_flush`                                                                                                                                                                    |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                       |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                            |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                 |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                           |
| `read:memory`         | `memory_search`                                                                                                                                                                  |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                     |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                               |
| `write:skills`        | `skills_enable`                                                                                                                                                                  |
| `execute:skills`      | `skills_execute`                                                                                                                                                                 |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                 |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                          |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                        |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                 |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                   |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                               |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                  |
| `read:obsidian`       | Zana 13 za kusoma — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | Zana 9 za kuandika — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …              |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                |

Mawanda ya wildcard yanatumika: `read:*` hutoa ruhusa kwa mawanda yote ya kusoma, `*` hutoa ufikiaji kamili.

### `mcp:connect` — uwezo finyu wa route (#7895)

Kufikia usafirishaji wa HTTP/SSE MCP (`/api/mcp/*`) kutoka kwa anwani isiyo ya loopback kunahitaji
msamaha wa LOCAL_ONLY wa `/api/mcp/` (angalia `docs/security/ROUTE_GUARD_TIERS.md`). Kihistoria,
msamaha huo ulikubali tu API key yenye scope kamili ya `manage`/`admin` — pana mno kwa
mpigaji anayehitaji tu kuwasiliana na MCP. `src/shared/constants/managementScopes.ts` sasa
inasafirisha `MCP_CONNECT_SCOPE = "mcp:connect"`: scope ya nyongeza yenye wigo finyu (kwa kufuata mfano sawa na
`SELF_USAGE_SCOPE`) ambayo huidhinisha TU upitaji wa `/api/mcp/` katika
`src/server/authz/policies/management.ts` — haitoi ufikiaji mwingine wowote wa route za usimamizi
na kwa makusudi haijajumuishwa katika `MANAGEMENT_API_KEY_SCOPES`. Key yenye `manage`/`admin`
bado hupita kwenye msamaha bila mabadiliko; `mcp:connect` ni chaguo lenye upendeleo mdogo zaidi kwa
wapigaji wa mbali wanaotumia MCP pekee, linalokaguliwa kupitia `hasMcpConnectOrManageScope()`.

### Ufungamanishaji wa scope za HTTP kwa kila key (#7895)

Kupitia HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` sasa hutatua
`api_keys.scopes` halisi za mpigaji kupitia `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
na kuzipitisha kwa `transport.handleRequest(req, { authInfo })` ya MCP SDK, ili
`extra.authInfo.scopes` inayofikia kila mwito wa zana iakisi scope za key yenyewe ya Bearer.
`resolveCallerScopeContext()` ya `scopeEnforcement.ts` tayari ilipa kipaumbele `authInfo` kuliko
fallback ya `_meta` na env ya `OMNIROUTE_MCP_SCOPES` — hili linajaza tu chanzo hicho cha kwanza,
chenye kipaumbele cha juu zaidi, ambacho hapo awali hakikulishwa kupitia HTTP. Wakati hakuna API key inayotatuliwa
(hakuna header, key si halali), `authInfo` hubaki `undefined` na utatuzi huendelea hadi kwenye
mnyororo uliopo wa fallback wa `meta`/env bila mabadiliko. Hili HALIBADILISHI chaguo-msingi la
`OMNIROUTE_MCP_ENFORCE_SCOPES` — utekelezaji bado lazima uwezeshwe waziwazi; badiliko hili linafanya tu
njia ya kila key ipewe kipaumbele mara inapowezeshwa. stdio haina utambulisho wa kila mpigaji (angalia
`mcpCallerIdentity.ts`) na haiathiriwi — inaendelea kutumia mnyororo wa fallback wa `_meta`/env.

---

## Vigezo vya Mazingira

| Kigezo                                  | Chaguomsingi                        | Madhumuni                                                                                                                                                                    |
| :-------------------------------------- | :---------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`            | URL ya msingi ambayo seva ya MCP hutumia inapopiga simu API za ndani za OmniRoute                                                                                            |
| `OMNIROUTE_API_KEY`                     | (tupu)                              | Ufunguo wa API unaotumwa kama `Authorization: Bearer` kwenye simu za API za ndani                                                                                            |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` pekee huiwezesha) | Inapowezeshwa, scopes zinazokosekana hukataa miito ya zana na kurekodi `scope_denied:<reason>` kwenye kumbukumbu ya ukaguzi                                                  |
| `OMNIROUTE_MCP_SCOPES`                  | (tupu)                              | Orodha ya scopes inayotenganishwa kwa koma na kuruhusiwa, ambayo huchukuliwa kuwa "inapatikana" kwa chaguomsingi (hutumika wakati mpigaji simu hajatoa scopes zake mwenyewe) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (haijawekwa = imewashwa)            | Ikiwekwa kuwa `0/false/off/no`, huzima ubanaji wa maelezo ya MCP wakati wa usajili                                                                                           |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (haijawekwa = imewashwa)            | Jina mbadala la swichi ileile iliyo hapo juu                                                                                                                                 |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                             | Muda wa kusitisha usomaji wa ndani wa usimamizi (afya, ustahimilivu, michanganyiko, kiwango kinachoruhusiwa, matumizi)                                                       |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                             | Muda wa kusitisha hatua zinazosubiri mtoa huduma (`route_request`, `web_search`, `web_fetch`)                                                                                |
| `MCP_TOOL_DENY`                         | (haijawekwa = hakuna kichujio)      | Majina ya zana yaliyotenganishwa kwa koma ya kuondolewa kwenye `tools/list` (kupunguza idadi ya zana — tazama hapa chini)                                                    |
| `MCP_TOOL_ALLOW`                        | (haijawekwa = hakuna kichujio)      | Majina ya zana yaliyotenganishwa kwa koma ya kuhifadhiwa pekee (hali ya orodha ya ruhusa — tazama hapa chini)                                                                |
| `DATA_DIR`                              | `~/.omniroute`                      | Faili ya ishara ya uhai huandikwa kwenye `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                            |

---

## Ubanaji wa Maelezo

Masajili ya zana, vidokezo na rasilimali za MCP yanaweza kubana maelezo wakati wa usajili/uorodheshaji ili kupunguza ukubwa wa metadata unaoonyeshwa kwa wateja (na hivyo kupunguza gharama ya muktadha wa kidokezo). Utekelezaji unapatikana katika `open-sse/mcp-server/descriptionCompressor.ts` na umeunganishwa kwenye seva ya MCP kupitia `compressMcpRegistryMetadata` ndani ya `createMcpServer()`.

- Ubanaji hufanyika kwenye maandishi ya maelezo kwa kutumia mkusanyiko wa kanuni wa Caveman (`getRulesForContext("all", "full")`) pamoja na utoaji wa vizuizi vinavyohifadhiwa (vipande vya msimbo, vizuizi vilivyozungushiwa uzio, n.k.) ili maudhui ya kimuundo yasibadilishwe.
- Washa au zima kwa kila uwekaji kupitia thamani ya `compression.mcpDescriptionCompressionEnabled` katika jedwali la mipangilio la `key_value` (chaguomsingi: imewezeshwa) — huonyeshwa kwenye UI kama **Uchanganuzi → Ubanaji wa maelezo ya MCP**.
- Washa au zima kwa mchakato mzima kupitia `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` au `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Takwimu za wakati halisi huonyeshwa kupitia `omniroute_compression_status` chini ya `analytics.mcpDescriptionCompression` na kuwekwa lebo ya `source: "mcp_metadata_estimate"` ili kuzitofautisha na risiti halisi za matumizi ya mtoa huduma.

---

## Upunguzaji wa Idadi ya Zana (F4.3)

Mfinyazo wa maelezo hupunguza metadata ya kila zana; **upunguzaji wa idadi ya zana** huenda hatua moja zaidi kwa kupunguza _idadi_ ya zana zinazotangazwa. Kutangaza zana chache katika manifesti ya `tools/list` hupunguza gharama ya tokeni kwa kila ombi ambayo modeli ya mteja hulipia katalogi ya zana (mfinyazo wa "tabaka la 5"). Utekelezaji ni kichujio kisicho na hali na kinachojitegemea katika `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), kilichounganishwa kwenye kitanzi cha usajili katika `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Ni ya hiari, na imezimwa kwa chaguomsingi.** Kichujio hufanya kazi tu wakati angalau mojawapo ya vigeu viwili vya mazingira imewekwa; ikiwa hakuna kilichowekwa, zana zote 110 hutangazwa bila kubadilishwa.

| Kigeu            | Hali                                                                                                       |
| :--------------- | :--------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Orodha zuizi — majina ya zana yaliyotenganishwa kwa koma ambayo huondolewa kila wakati kwenye `tools/list` |
| `MCP_TOOL_ALLOW` | Orodha ruhusu — majina ya zana yaliyotenganishwa kwa koma; ni haya pekee hubaki, mengine yote huondolewa   |

`deny` ina kipaumbele kuliko `allow`. Majina hutenganishwa kwa koma, nafasi za pembeni huondolewa, na vipengee vitupu hupuuzwa. Mifano:

```bash
# Ondoa zana mbili kwenye katalogi
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Tangaza zana za uelekezaji + mgao pekee (hali ya orodha ruhusu)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Jinsi zana zilizochujwa huondolewa:** usajili hufanikiwa kila wakati; zana iliyokataliwa na wasifu kisha huwekewa `.disable()` kwenye kishikio cha MCP SDK, kwa hivyo haionekani kamwe katika `tools/list`, lakini miunganisho yake hubaki kama ilivyo (uwezeshaji/ulemazaji safi, bila usajili upya). Kichanganuzi cha wasifu ni `readMcpToolProfileFromEnv(process.env)`, ambacho hurejesha `null` (hakuna uchujaji) wakati vigeu vyote viwili ni vitupu.

Muundo mpana zaidi wa `ToolProfile` unaotumiwa na `reduceToolManifest` pia unaauni uchujaji wa makutano ya mawanda (`allowScopes`, kwa ulinganishaji wa vibambo-joker wa mtindo wa `read:*`) na kikomo bainifu cha `maxTools`, lakini mipangilio hiyo miwili inahitaji manifesti kamili wakati wa usajili na **haipatikani** kupitia vigeu vya mazingira kwa sasa (kiunganishi cha kiwango cha `tools/list` ni kazi ya ufuatiliaji iliyorekodiwa). `estimateManifestTokens()` inapatikana ili kulinganisha gharama ya tokeni za manifesti kabla na baada ya upunguzaji.

---

## Mpigo wa Moyo wa Wakati wa Uendeshaji

Usafirishaji wa stdio huhifadhi hali ya uhai katika `${DATA_DIR}/runtime/mcp-heartbeat.json` kila sekunde 5. Dashibodi (`/api/mcp/status`) husoma faili hili pamoja na hali ya uhai ya PID ili kubaini `online`. Badala yake, usafirishaji wa HTTP huripoti hali kupitia `getMcpHttpStatus()` ya ndani ya mchakato (bila kuandika faili).

Picha ya hali ya mpigo wa moyo ina:

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

## Uwekaji Kumbukumbu za Ukaguzi

Kila mwito wa zana huwekwa kwenye jedwali la SQLite `mcp_tool_audit` na `open-sse/mcp-server/audit.ts`:

- Jina la zana, hoja (zilizohashiwa/kukatwa kulingana na `auditLevel` ya kila zana), matokeo
- Muda katika ms, alama ya kufaulu/kushindwa, ujumbe wa hitilafu (inapohusika)
- Hashi ya ufunguo wa API, muhuri wa muda
- Kukataliwa kwa mawanda huwekwa kama `scope_denied:<reason>` pamoja na orodha ya mawanda yanayokosekana

Tumia dashibodi au miishio ya REST ya `/api/mcp/audit` na `/api/mcp/audit/stats` kukagua miito ya hivi karibuni.

---

## Faili

| Faili                                                                    | Madhumuni                                                                          |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Kiwanda cha seva ya MCP, sehemu ya kuanzia ya stdio, usajili wa zana kwa mawanda   |
| `open-sse/mcp-server/httpTransport.ts`                                   | Usafirishaji wa SSE + Streamable HTTP (usimamizi wa vipindi)                       |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Tathmini ya mawanda ya zana na utambuzi wa mwitaji                                 |
| `open-sse/mcp-server/audit.ts`                                           | Uwekaji kumbukumbu za ukaguzi wa miito ya zana (`mcp_tool_audit`)                  |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Kiandikaji cha mapigo ya stdio (`mcp-heartbeat.json`)                              |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Mfinyazo wa maelezo kwa sajili za zana / vidokezo / rasilimali                     |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Skima za Zod + sajili ya zana (`MCP_TOOLS`, vipengee 45)                           |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Vishughulikiaji vya zana vya Awamu ya 2 + akiba + 1proxy                           |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Vishughulikiaji vya zana za mfinyazo                                               |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Ufafanuzi wa zana za kumbukumbu (zana 3)                                           |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Ufafanuzi wa zana za ujuzi (zana 4)                                                |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Ufafanuzi wa zana za chanzo cha muktadha wa Notion (zana 6)                        |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Ufafanuzi wa zana za uchezeshaji (zana 8)                                          |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Zana za usajili na usimamizi wa programu-jalizi (zana 8)                           |
| `src/app/api/mcp/status/route.ts`                                        | Endpointi ya `/api/mcp/status`                                                     |
| `src/app/api/mcp/tools/route.ts`                                         | Endpointi ya `/api/mcp/tools`                                                      |
| `src/app/api/mcp/sse/route.ts`                                           | Njia ya usafirishaji ya SSE ya `/api/mcp/sse`                                      |
| `src/app/api/mcp/stream/route.ts`                                        | Njia ya usafirishaji ya Streamable HTTP ya `/api/mcp/stream`                       |
| `src/app/api/mcp/audit/route.ts`                                         | Hoja ya kumbukumbu za ukaguzi ya `/api/mcp/audit`                                  |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Vipimo vilivyojumlishwa vya ukaguzi vya `/api/mcp/audit/stats`                     |
| `src/lib/notion/api.ts`                                                  | Kiteja cha Notion REST API (kujaribu tena, muda wa kuisha, uainishaji wa hitilafu) |
| `src/lib/db/notion.ts`                                                   | Uhifadhi endelevu wa tokeni ya Notion (jedwali la `key_value`)                     |
| `src/app/api/settings/notion/route.ts`                                   | API ya mipangilio ya Notion (GET/POST/DELETE)                                      |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Kiolesura cha usimamizi wa tokeni ya Notion                                        |
| `tests/unit/notion-api.test.ts`                                          | Majaribio ya kiteja cha Notion API (7)                                             |
| `tests/unit/notion-tools.test.ts`                                        | Majaribio ya utekelezaji wa mawanda ya zana za Notion (10)                         |
| `tests/unit/db/notion.test.mjs`                                          | Majaribio ya moduli ya hifadhidata ya Notion (3)                                   |
