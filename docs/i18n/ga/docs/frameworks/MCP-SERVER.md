# OmniRoute MCP Server Documentation (Gaeilge)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Freastalaí Model Context Protocol ina bhfuil 110 uirlis thar oibríochtaí ródaithe, taisce, comhbhrúite, cuimhne, scileanna, seachfhreastalaí, linn, Radar, agus foinse comhthéacs.
>
> Foinse na fírinne: ríomhann `open-sse/mcp-server/server.ts` **110 uirlis uathúla** le `countUniqueMcpTools()`: 45 sainmhíniú canónach (lena n-áirítear na sé uirlis saolré CCR, tríréad scileanna gníomhaire, `omniroute_radar_catalog`, agus `omniroute_x_search`), chomh maith le cuimhne (3), scileanna (4), scileanna GitHub (3), linn (6), cluicheú (8), breiseáin (8), Notion (6), Obsidian (22), corpas áitiúil (3), agus dhá uirlis chomhbhrúite RTK amháin.

## Suiteáil

Tá OmniRoute MCP ionsuite. Tosaigh é le:

```bash
omniroute --mcp
```

Nó tríd an iompar open-sse:

```bash
# Iompar HTTP insruthaithe (port 20130)
omniroute --dev  # Tosaíonn MCP go huathoibríoch ar an gcríochphointe /mcp
```

Bíonn na hiompair HTTP (`sse` / `streamable-http`, arna soláthar laistigh den phróiseas ag freastalaí an deais)
díchumasaithe de réir réamhshocraithe agus roimhe seo níorbh fhéidir iad a scoránú ach ón leathanach `/dashboard/mcp`. Ó v3.8.51 ar aghaidh
tá na cumais chéanna ag an CLI:

```bash
omniroute mcp status                                  # cumasaithe/ar líne, iompar, líon uirlisí
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # athshocraíonn sé seisiúin ghníomhacha sse/streamable-http
```

Déanann `mcp enable`/`mcp disable` iarratas PATCH ar an socrú céanna `mcpEnabled` (agus, go roghnach, `mcpTransport`)
a scoránaíonn an deais trí `/api/settings`. Glaonn `mcp restart` ar `POST /api/mcp/restart`: dúnann sé
seisiúin ghníomhacha `sse`/`streamable-http` ionas go n-ath-thúsaítear go glan iad leis an gcéad iarratas eile, seolann sé
`409` ar ais má tá MCP díchumasaithe, agus `501` don iompar `stdio` (is leis na cliaint stdio a bhfo-phróiseas
féin — níl aon hanla laistigh den phróiseas ann lena atosú).

## Iompar

Nochtaíonn an freastalaí MCP trí iompar, go léir bunaithe ar an mbonn chruthaitheoir céanna `createMcpServer()`:

| Iompar            | An áit                                      | Cathain le húsáid                                                  |
| :---------------- | :------------------------------------------ | :----------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | Comhtháthuithe IDE (Claude Desktop, Cursor, srl.)                  |
| `sse`             | `POST/GET /api/mcp/sse` trí `httpTransport` | Cliaint brabhsálaí/oibríochtaí a dteastaíonn sruth imeachtaí uathu |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | Cliaint HTTP il-seisiún (`mcp-session-id` ceanntásc)               |

Roghnaítear an t-iompar HTTP gníomhach (`sse` nó `streamable-http') le socrúchán `mcpTransport`. Nuair a athraítear iompair, dúnann sé seisiúin reatha ar an iompar eile.

### Rochtain iargúlta (tearmann scóip an bhainistíochta)

Tá `/api/mcp/*` sa tairm `LOCAL_ONLY` (`src/server/authz/routeGuard.ts`) - de réir réamhshocraithe, ní féidir ach freastraitheoirí traschlasta (`localhost`, `127.0.0.1`, `::1`) teacht air. Ó v3.8.2, is féidir le cliaint nach iad iad féin traschlasta ceangal má chuireann siad `Authorization: Bearer <api-key>` i láthair a bhfuil an scóip `manage` ag an eochair. Is é seo an t-aon bhealach le teagmháil a dhéanamh leis an bhfreastalaí iargúlta MCP trí tunel, seachfhreastalaí cumhdaigh, óstainm poiblí.

```bash
# Deonaigh scóip bainistíochta: oscail an leathanach Eochracha API sa deais agus cuir go bhfuil
# "Rochtain Bhainistíochta" air san eochair, nó POST scopes:["manage"] agus tú ag cruthú.

# Ansin ceangail ó chliant iargúlta MCP:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Filleann eochair nach bhfuil scóip bainistíochta aici (nó gan Bearer) `403 LOCAL_ONLY`. Ní féidir an t-iarmhír comharsanachta `/api/cli-tools/runtime/*` a sheachbhóthar go feasach - féach [Tairmeanna Cosanta Acmhainní — Marcáil Tharmainn Scóip Bainistíochta](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Cumraíocht IDE

Féach [Cumraíocht Chliaint MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) le haghaidh Claude Desktop,
Cursor, Cline, agus socrú cliaint MCP comhoiriúnach.

---

## Uirlisí Riachtanacha (14) — Céim 1

| Uirlis                          | Scóip                 | Cur Síos                                                                                                                             |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Uptime, cuimhne, scoradáin chiorcaid, teorainneacha ráta, staitisticí taisce                                                         |
| `omniroute_list_combos`         | `read:combos`         | Gach combo cumraithe le straitéisí (méadracht roghnach)                                                                              |
| `omniroute_get_combo_metrics`   | `read:combos`         | Méadracht feidhmíochta do combo ar leith                                                                                             |
| `omniroute_switch_combo`        | `write:combos`        | Combo a ghníomhachtú nó a dhíghníomhachtú                                                                                            |
| `omniroute_create_combo`        | `write:combos`        | Combo bailíochtaithe a chruthú tríd an API combo atá ann cheana                                                                      |
| `omniroute_check_quota`         | `read:quota`          | Cuóta úsáidte/iomlán, céatadán fágtha, am athshocraithe, sláinte comhartha                                                           |
| `omniroute_route_request`       | `execute:completions` | Comhlánú comhrá a sheoladh trí ródú OmniRoute                                                                                        |
| `omniroute_cost_report`         | `read:usage`          | Tuarascáil costais de réir tréimhse (seisiún/lá/seachtain/mí)                                                                        |
| `omniroute_list_models_catalog` | `read:models`         | Catalóg iomlán samhlacha le cumais, stádas, praghsáil                                                                                |
| `omniroute_radar_catalog`       | `read:radar`          | Catalóg Radar sínithe áitiúil; scagairí roghnacha soláthraí/teaghlaigh                                                               |
| `omniroute_tool_search`         | `read:tools`          | Uirlisí a fháil amach ón gcatalóg MCP cláraithe                                                                                      |
| `omniroute_web_search`          | `execute:search`      | Cuardach gréasáin trí na soláthraithe cuardaigh cumraithe. Ní X/Twitter.                                                             |
| `omniroute_x_search`            | `execute:search`      | Cuardach X trí xAI/SuperGrok, nó roghnaigh `xquik-search` le haghaidh torthaí API Xquik. Éilíonn dintiúir don chúlchóras roghnaithe. |
| `omniroute_web_fetch`           | `execute:search`      | Ábhar gréasáin a fháil trí na soláthraithe feitseála cumraithe                                                                       |

## Uirlisí Casta (11) — Céim 2

| Uirlis                             | Scóip                                | Cur Síos                                                                                                     |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Insamhladh ródaithe tirim le crann titim-siar                                                                |
| `omniroute_set_budget_guard`       | `write:budget`                       | Buiséad seisiúin le gníomh díghrádaithe/coisc/foláirimh                                                      |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Nuashonraigh straitéis combo ag am rite (tosaíocht/meáite/uathoibríoch/srl.)                                 |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Cuir i bhfeidhm réamhshocrú athléimneachta `ionsaitheach` / `cothrom` / `coimeádach`                         |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Tástáil bheo ar gach soláthróir i gcombo ag úsáid glao fíor-uasshrutha                                       |
| `omniroute_get_provider_metrics`   | `read:health`                        | Méadracht in aghaidh an tsoláthróra le latency p50/p95/p99 agus staid scoradáin chiorcaid                    |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Mol combo de réir chineál tasc le srianta buiséid/latency                                                    |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Mínigh cén fáth ar ródaíodh iarratas chuig soláthróir (fachtóirí scórála + titim-siar)                       |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Léargas iomlán seisiúin: costas, comharthaí, samhlacha/soláthróirí is fearr, earráidí, garda buiséid         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnóisigh (agus deisigh go roghnach) sruth bunachair shonraí cosúil le tagairtí combo briste / ró-eangacha |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sync sonraí praghsála ó fhoinsí seachtracha (LiteLLM); tacaíonn sé le `dryRun`                               |

## Uirlisí Taisce (2)

| Uirlis                  | Scóip         | Cur Síos                                                              |
| :---------------------- | :------------ | :-------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Taisce shéimeantach, taisce leid, agus staitisticí idir-éifeachtachta |
| `omniroute_cache_flush` | `write:cache` | Sruthlaigh taisce go domhanda nó de réir sínithe/samhla               |

## Uirlisí Comhbhrú (13)

| Uirlis                              | Scóip               | Cur Síos                                                                                                                                           |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Socruithe comhbhrú, achoimre anailísíochta, agus staitisticí feasach-taisce (ionchuimsíonn sé meiteashonraí `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Cumraigh modh comhbhrú, tairseach, cóimheas sprice, caomhnú córas-leid, scorán comhbhrú tuairisc MCP                                               |
| `omniroute_set_compression_engine`  | `write:compression` | Roghnaigh an t-inneall gníomhach (off/caveman/rtk/stacked) agus déine Caveman/RTK                                                                  |
| `omniroute_list_compression_combos` | `read:compression`  | Liostaigh combos comhbhrú ainmnithe agus a bpíblínte innill                                                                                        |
| `omniroute_compression_combo_stats` | `read:compression`  | Anailísíocht grúpáilte de réir combo comhbhrú agus innill                                                                                          |
| `omniroute_ccr_store`               | `write:compression` | Stóráil ábhar aonraithe-ghlaoiteora sa stóras CCR cuimhne-teoranta agus fill marcóir móide tagairt `ccr://`                                        |
| `omniroute_ccr_retrieve`            | `read:compression`  | Aisghabh ábhar CCR go hiomlán nó le modhanna ceann, eireaball, línte, grep, agus staitisticí                                                       |
| `omniroute_ccr_inspect`             | `read:compression`  | Scrúdaigh meiteashonraí CCR úinéireachta-ghlaoiteora gan ábhar a thabhairt ar ais                                                                  |
| `omniroute_ccr_list`                | `read:compression`  | Liostaigh meiteashonraí págánaithe do bhlocanna CCR úinéireachta-ghlaoiteora                                                                       |
| `omniroute_ccr_delete`              | `write:compression` | Scrios bloc CCR úinéireachta-ghlaoiteora                                                                                                           |
| `omniroute_ccr_stats`               | `read:compression`  | Tuairiscigh úsáid chuimhne scóip-ghlaoiteora, cuntair shaolré, agus teorainneacha stórais                                                          |
| `omniroute_rtk_discover`            | `read:compression`  | Faigh amach torann athfhillteach i samplaí aschuir RTK rogha-iontrála                                                                              |
| `omniroute_rtk_learn`               | `read:compression`  | Gine dréacht scagaire RTK in-athbhreithnithe ó shamplaí rogha-iontrála                                                                             |

Níl iontrálacha CCR ach i gcuimhne agus imíonn siad ar atosú. Tá gach bloc teoranta do 2 MiB, gach
príomh-áiritheoir go 16 MiB, agus an stóras domhanda go 64 MiB. Is é 24 uair an TTL réamhshocraithe
d'iontrálacha (uasmhéid seacht lá). Tá aisghabháil iomlán MCP teoranta do 256 KiB; fanann bloic níos mó
ar fáil trí na modhanna raon agus grep. Tá stóráil, aisghabháil, liostú, cigireacht, scriosadh, agus
staitisticí aonraithe ag príomh-áiritheoir eochair-API fíordheimhnithe. Tá hashes agus meiteashonraí
méide in iontrálacha iniúchta, riamh ábhar.

Tuairiscíonn `omniroute_compression_status` comhbhrú tuairisc MCP ar leithligh faoi
`analytics.mcpDescriptionCompression`. Is meastacháin mhéid-mheiteashonraí iad na luachanna sin do
thuairiscí inliostaithe MCP (`tools`, `prompts`, `resources`, agus `resourceTemplates`); ní
admhálacha úsáide soláthróra iad agus tá siad marcáilte le `source: "mcp_metadata_estimate"`.

### Scagaire Crann Inrochtaineachta MCP (v3.8.0)

Ar leithligh ó na huirlisí comhbhrú thuas, ionchuimsíonn OmniRoute scagaire iar-fhorghníomhaithe a
chomhbhrúíonn **torthaí uirlisí** na n-uirlisí brabhsálaí/inrochtaineachta MCP sula dtuigtear iad don
ghníomhaire. Ní uirlis é an scagaire seo féin — ritheann sé go trédhearcach ar aon toradh uirlise a
ionchuimsíonn téacs crann-inrochtaineachta nó scáthán-brabhsálaí foclach (≥2000 carachtar).

Príomh-iompraíochtaí:

- Comhthiteann ≥30 líne deirfiúr athfhillteach as a chéile in achoimre ceann + eireaball
- Caomhnaíonn sé ancairí `[ref=eXX]` a theastaíonn ó Playwright/computer-use
- Gearrann sé go crua téacs an-mhór (>50,000 carachtar) le leid loingseoireachta
- Coigilteas ionchais: **60–80%** ar ualaí scáthán-brabhsálaí

Cumraíocht: `compression.mcpAccessibility` i socruithe domhanda (imirce 056).
Cur i bhfeidhm: `open-sse/services/compression/engines/mcpAccessibility/`.
Doiciméid iomlána: [Innill Chomhbhrú — Scagaire Crann Inrochtaineachta MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Féach [Innill Chomhbhrú](../compression/COMPRESSION_ENGINES.md) agus [Comhbhrú RTK](../compression/RTK_COMPRESSION.md) le haghaidh
an tsamhail chomhbhrú rite atá taobh thiar de na huirlisí seo.

## Uirlisí 1Proxy (3)

| Uirlis                      | Scóipeanna     | Cur Síos                                                                                 |
| :-------------------------- | :------------- | :--------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Faigh saor-phróicsí ó mhargadh 1proxy (scagairí prótacail/tíre/cáilíochta/teorainn)      |
| `omniroute_oneproxy_rotate` | `read:proxies` | Faigh an chéad phróicsí ar fáil de réir straitéise (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Staitisticí polla, stádas sioncronaithe, dáileadh de réir prótacail agus tíre            |

## Uirlisí Cuimhne (3)

Sainmhínithe in `open-sse/mcp-server/tools/memoryTools.ts`. Cuirtear údarú/scóip i bhfeidhm tríd an stáslán scóipe MCP caighdeánach.

| Uirlis                    | Scóipeanna     | Cur Síos                                                                                         |
| :------------------------ | :------------- | :----------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Cuardaigh cuimhní de réir iarratais / cineáil / eochair API le buiséid token á cur i bhfeidhm    |
| `omniroute_memory_add`    | `write:memory` | Cuir iontráil cuimhne nua leis (`factual` / `episodic` / `procedural` / `semantic`)              |
| `omniroute_memory_clear`  | `write:memory` | Glan cuimhní le haghaidh eochaire API, scagtha go roghnach de réir cineáil nó stampa `olderThan` |

## Uirlisí Scileanna (4)

Sainmhínithe in `open-sse/mcp-server/tools/skillTools.ts`. Tacaíocht ag `src/lib/skills/registry` + `src/lib/skills/executor`.

| Uirlis                        | Scóipeanna       | Cur Síos                                                                                           |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Liostaigh scileanna cláraithe le scagadh roghnach de réir eochaire API, ainm, nó stádas cumasaithe |
| `omniroute_skills_enable`     | `write:skills`   | Cumasaigh nó díchumasaigh scile ar leith de réir ID                                                |
| `omniroute_skills_execute`    | `execute:skills` | Rith scile le tionchur ar fáil agus fill ar an taifead rith                                        |
| `omniroute_skills_executions` | `read:skills`    | Liostaigh stair na rithanna scileanna le déanaí                                                    |

## Foinse Comhthéacs Notion (6)

Sainmhínithe in `open-sse/mcp-server/tools/notionTools.ts`. Stóráiltear an tseonm i mbunachar sonraí `key_value` trí `src/lib/db/notion.ts`./cliant REST in `src/lib/notion/api.ts`. API socruithe in `src/app/api/settings/notion/route.ts`. Taispeáint ID i `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Cumraigh do shonm comhtháthú Notion ón táb **Foinse Comhthéacs** san ionad deireadh, nó trí an REST API:

```bash
# Socrú sonm
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Seiceáil stádas
curl http://localhost:20128/api/settings/notion

# Dícheangal
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Uirlis                       | Scóipeanna     | Cur Síos                                                                                 |
| :--------------------------- | :------------- | :--------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Cuardach téacs iomlán ar gach leathanach agus bunachar sonraí                            |
| `notion_get_page`            | `read:notion`  | Faigh leathanach de réir ID lena shaintréithe                                            |
| `notion_list_block_children` | `read:notion`  | Liostaigh na bloic pháistreacha de leathanach nó bloic                                   |
| `notion_query_database`      | `read:notion`  | Iarr ar bhunachar sonraí le scagairí, sórtáil agus leathanachú                           |
| `notion_get_database`        | `read:notion`  | Faigh scéimre bunachar sonraí de réir ID                                                 |
| `notion_append_blocks`       | `write:notion` | Ceangail bloic pháistreacha le bloic tuismitheora (uasmhéid 100 in aghaidh an iarratais) |

## Liosta Uirlisí Scileanna Gníomhaire (3)

Sainmhínithe in `open-sse/mcp-server/tools/agentSkillTools.ts`. Tacaíochta ag `src/lib/agentSkills/catalog`. Nochtann na huirlisí seo an catalóg scileanna gníomhaire 45 iontráil do chliant MCP agus gníomhairí seachtracha. Scóp: `read:catalog`.

| Uirlis                            | Scóipanna      | Cur Síos                                                                                                                                                              |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Liostaigh gach 45 scil gníomhaire le rogha scagairí `category` (api\|cli) agus `area`; tugann metadata + clúdach leis                                                 |
| `omniroute_agent_skills_get`      | `read:catalog` | Faigh metadata iomlán + ábhar SKILL.md do scil amháin le `id` canonach                                                                                                |
| `omniroute_agent_skills_coverage` | `read:catalog` | Staitisticí clúdaigh: cé méid de na 23 scil API, 21 scil CLI agus 1 scil cumraíochta atá comhaid SKILL.md acu ar anbhíomaíochtaí i gcomparáid leis na hiomlán catalóg |

Féach [AGENT-SKILL.md](./AGENT-SKILLS.md) le haghaidh an chatalóg iomlán agus conas a úsáideann gníomhairí seachtracha é.

## Creatanna Gaolmhara (v3.8.0)

Tá rith an MPCI uirlisí thuas (110 uirlis uathúil, á ríomh ag `countUniqueMcpTools()`) scópaithe go sonrach d'oibríochtaí rithseanais/ag privathabháil/comhbhrú/wuí/skills/proxy/context-source. Tá dhá chreat in aice teachta le freastalaí MPCI i v3.8.0 agus tá siad docummentáithe ar leith:

### Gníomhairí Scála

Is iad Gníomhairí Scála ná gníomhairí códála AI i bpróiseas seachtrach (codex-cloud, cursor-cloud, devin, jules) a nascadh le OmniRoute tríd an tsamhail nasc céanna a úsáidtear do sholáthraithe LLM. Nochtaítear iad trína dromchla REST féin (`/api/v1/agents/*`) agus **ní** bhaineann siad le catalóg uirlisí MPCI — ní íocann glao ar Ghníomhaire Scála le scóp MPCI.

- Impleachtú: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Saolré: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Doiciméadú: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Treoracha Sábháilteachta

Is iad Treoracha Sábháilteachta réamh/in-iardhírithe éisteachtaí (vision-bridge, pii-masker, prompt-injection) a chur i bhfeidhm taobh istigh de phiomsa comhrá. Rith siad sula bhfaighfidh siad an chiseal uirlisí/rithseanais MPCI agus seolann siad sáruithe struchtúrtha le pipelines iniúchta; ní ghlaoitear iad mar uirlisí MPCI.

- Impleachtú: `src/lib/guardrails/`.
- Doiciméadú: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Agus tú ag dífhabhtú glao MPCI a chosnaítear, déan iniúchadh ar an log iniúchta MPCI (iontrálacha `scope_denied:*`) agus ar an gcosán iniúchta treoracha — d'fhéadfadh go gcuirfí iarratas ar ceal ag treoras **sula bhfaighfidh sé an chiseal forfheidhmiúcháin scóp MPCI riamh.

---

## Toirt-pointí REST API

| Toirt-pointí           | Modh                  | Cur Síos                                                                                                 | Údarás                           |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------- |
| `/api/mcp/status`      | `GET`                 | Stádas freastalaí: croí-theans, stádas iompar HTTP, achoimre gníomhaíochta iniúchta                      | Bainistíocht (seisiún/riarachán) |
| `/api/mcp/tools`       | `GET`                 | Catalóg uirlisí (ainm, cur síos, scóipanna, céim, toirt-pointí foinse)                                   | Bainistíocht                     |
| `/api/mcp/sse`         | `GET` / `POST`        | Toirt-pointí iompar SSE (cosnaithe ag `mcpEnabled` + `mcpTransport === "sse"`)                           | Eochair API + scóipanna          |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Iompar HTTP in-stream (úsáideann ceanntásc `mcp-session-id`; cuireann `DELETE` an seisiún deireadh)      | Eochair API + scóipanna          |
| `/api/mcp/audit`       | `GET`                 | Iontrálacha log iniúchta ó `mcp_tool_audit` (scagairí: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Bainistíocht                     |
| `/api/mcp/audit/stats` | `GET`                 | Staitisticí iniúchta comhiomlána (`totalCalls`, `successRate`, `avgDurationMs`, uirlisí barr)            | Bainistíocht                     |

Foinsí comhaid: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Tá iompar SSE agus HTTP in-stream cosnaithe go dtí go ndéantar an freastalaí MPCI a chumasú i Socruithe (`mcpEnabled`) agus go roghnaítear an t-iompar `mcpTransport` cuí. Má chumraítear an t-iompar mícheart, fillfidh an rithse le HTTP 400 le leid chun socruithe a athrú.

## Fíordheimhniú & Scóip

Léann glaonna uirlisí MCP teaghráin scóipe ón nglaoiteoir. Tá an tseiceáil sin ar cheann de thrí
ainmspás neamhspleácha. Ní hionann pas ó sheiceálaí amháin agus pas ó na cinn eile.
Tá na rialacha le fáil in [Trí ainmspás scóipe](#three-scope-namespaces).
Tá catalóg na n-uirlisí le fáil in [Scóip uirlisí MCP](#mcp-tool-scopes).

### Trí ainmspás scóipe

Is trí dheontas éagsúla iad `manage` ar eochair API, `read:compression` ar uirlis MCP, agus `read` ar
chomhartha rochtana `oma_live_…`. Faigheann glaoiteoirí a sheolann comhartha rochtana `read`
chuig bealach bainistíochta a dhéanann athrú HTTP 403
`Access token scope 'read' is insufficient; 'write' required.`
Is é `scopeSatisfies` an rang sin. Ní théann sé i gcomhairle leis an tábla MCP, agus ní théann
meaitseálaí MCP i gcomhairle leis.

| Ainmspás                  | Dintiúr                                                      | Seiceálaí                             | An méid a cheadaíonn pas                                                |
| :------------------------ | :----------------------------------------------------------- | :------------------------------------ | :---------------------------------------------------------------------- |
| Bainistíocht eochrach API | `api_keys.scopes`                                            | `hasManageScope`                      | REST bainistíochta don eochair Bearer sin                               |
| Breisiú eochrach API      | an t-eagar céanna, teaghrán beacht amháin                    | an fheidhm chúnta atá ainmnithe thíos | An cumas amháin sin                                                     |
| Scóip uirlisí MCP         | an t-eagar céanna, nó `_meta` MCP, nó `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                        | An uirlis sin, a luaithe a bhíonn forfheidhmiú ar siúl                  |
| Comhartha rochtana        | `oma_live_…`                                                 | `scopeSatisfies`                      | An bealach bainistíochta a n-éilíonn a mhodh agus a chonair an rang sin |

Clúdaítear cruthú gach dintiúir in
[Fíordheimhniú Bainistíochta](../guides/MANAGEMENT-AUTH.md).

#### Scóip eochrach API

Comhlíonann eagar amháin `api_keys.scopes` dhá chúram. Úsáideann siad feidhmeanna éagsúla.

**REST bainistíochta.** Is iad `manage` agus `admin` na baill de
`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`).
Is é `hasManageScope` a údaraíonn bealaí bainistíochta don eochair sin. Tá `admin`
in ann bainistíocht a dhéanamh ar na bealaí sin. Ní hé an focal `admin` anseo
rang an chomhartha rochtana agus ní leathnaíonn sé ina scóip uirlisí MCP.

**Teaghráin bhreisitheacha.** Is tástáil bheacht ballraíochta gach ceann acu, agus fanann gach ceann acu
lasmuigh de `MANAGEMENT_API_KEY_SCOPES`.

| Scóip                          | An méid a cheadaíonn pas                                                                                                                                                                |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | An eisceacht LOCAL_ONLY neamh-loopback `/api/mcp/` amháin (`hasMcpConnectOrManageScope`). Éiríonn le heochair a bhfuil `manage` nó `admin` aici san eisceacht sin fós.                  |
| `self:usage`                   | `GET /api/v1/me/status` don eochair seo (`src/app/api/v1/me/status/route.ts`). Cuireann `POST /api/keys` an scóip seo leis tráth a chruthaithe (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Cuótaí cuntais réamhtheachtacha laistigh den phálasta stádais sin (`src/lib/usage/apiKeySelfService.ts`). Éilíonn an bealach stádais `self:usage` fós.                                  |
| `policy:bypass-provider-quota` | Seachnaíonn glaonna tátail na heochrach seo polasaí chuóta an tsoláthraí (`hasProviderQuotaBypassScope` in `src/sse/handlers/chat.ts`).                                                 |

#### Meaitseáil

Is í an chatalóg an tábla faoi [Scóip uirlisí MCP](#mcp-tool-scopes). Ná caith le
`MCP_SCOPE_LIST` in `src/shared/constants/mcpScopes.ts` mar an gcatalóg sin:
is é an fothacar clóscríofa bunaidh é. Fógraíonn uirlisí níos déanaí scóip eile taobh leis
(`read:notion`, `read:skills`, `read:local-corpus`, agus an chuid eile den tábla).

Ceadaíonn `evaluateToolScopes` in `open-sse/mcp-server/scopeEnforcement.ts` glao
nuair a mheaitseálann gach scóip riachtanach scóip dheonaithe éigin:

- Meaitseálann `*` gach scóip riachtanach.
- Meaitseálann scóip dheonaithe a chríochnaíonn le `*` scóip riachtanach a thosaíonn leis
  an réimír roimh an réiltín. Meaitseálann `read:*` `read:compression`.
- Ní mheaitseálann gach scóip dheonaithe eile ach an teaghrán riachtanach comhionann.

Teipeann ar eochair arb iad `["manage"]` a scóip `scopeMatches` a chomhlíonadh do `read:compression`.
Teipeann ar an nglao céanna i gcás `admin`, `mcp:connect`, `read`, agus `write` nuair is iad sin
na teaghráin dheonaithe amháin. Níl aon ordlathas i measc scóip uirlisí MCP
seachas an `*` deiridh.

Bíonn an forfheidhmiú múchta mura bhfuil `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (réamhshocrú
`false`). Fad atá sé múchta, ceadaíonn `evaluateToolScopes` an glao agus scipeálann sé an
chatalóg. Fad atá sé ar siúl, úsáideann HTTP `api_keys.scopes` na heochrach Bearer mar
`authInfo` (féach [Ceangal scóipe HTTP de réir eochrach](#per-key-http-scope-binding-7895)).
Nuair nach réitítear aon scóip eochrach, téann an tacar deonaithe ar aghaidh go `_meta` MCP, agus ansin
go `OMNIROUTE_MCP_SCOPES`.

#### Scóip comharthaí rochtana

Bíonn `read`, `write`,
nó `admin` ag comharthaí `oma_live_…` (`src/lib/accessTokens/scopes.ts`). Is rang é `scopeSatisfies`: clúdaíonn `admin` `write` agus `read`, agus
clúdaíonn `write` `read`. Ní chlúdaíonn scóip anaithnide aon rud.

Déanann `evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) comparáid idir an
rang sin agus `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- Éilíonn `GET`, `HEAD`, agus `OPTIONS` `read`.
- Éilíonn gach modh eile `write`.
- Éilíonn conairí in `ADMIN_SCOPE_PREFIXES` `admin` do gach modh. Tá `/api/mcp`
  ar an liosta sin, mar sin ní féidir le comhartha rochtana `write` dromchla HTTP MCP a ghlaoch
  fós.
- Ní éilíonn conairí in `ADMIN_MUTATION_PREFIXES` `admin` ach amháin le haghaidh athruithe.

`PATCH /api/keys/{id}` is sóchán é agus níl sé ar na liostaí riaracháin sin, mar sin faigheann comhartha
`read` freagra 403:
`Access token scope 'read' is insufficient; 'write' required.`
Comhlíonann comhartha rochtana `write` nó `admin` riachtanais an bhealaigh sin. Téann JWT an deais, comhartha aitheantais meaisín CLI loopback, agus eochair API le `manage` nó `admin` trí bhrainsí eile agus ní chuireann an chéim seo srian orthu.

Níl ach geata na bainistíochta sáraithe ag comhartha rochtana a éiríonn leis in `scopeSatisfies` le haghaidh `/api/mcp`. Ritheann glaonna uirlisí `scopeMatches` fós i gcoinne scóipeanna eochracha API. Ní ionchur do `scopeMatches` í céim an chomhartha rochtana.

### Scóipeanna uirlisí MCP

Tá forfheidhmiú scóipeanna láraithe in `open-sse/mcp-server/scopeEnforcement.ts`.
Teastaíonn scóipeanna sonracha ó gach uirlis:

| Raon                  | Uirlisí                                                                                                                                                                                  |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                        |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                                |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                   |
| `read:quota`          | `check_quota`                                                                                                                                                                            |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                   |
| `read:models`         | `list_models_catalog`                                                                                                                                                                    |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                            |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                    |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                       |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                              |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                           |
| `read:cache`          | `cache_stats`                                                                                                                                                                            |
| `write:cache`         | `cache_flush`                                                                                                                                                                            |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                               |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                        |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                    |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                         |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                   |
| `read:memory`         | `memory_search`                                                                                                                                                                          |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                             |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                       |
| `write:skills`        | `skills_enable`                                                                                                                                                                          |
| `execute:skills`      | `skills_execute`                                                                                                                                                                         |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                         |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                  |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                                |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                         |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                           |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                       |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                          |
| `read:obsidian`       | 13 uirlis léitheoireachta — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 n-uirlis scríbhneoireachta — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …            |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                        |

Tacaítear le scóipeanna saoróige: deonaíonn `read:*` gach scóip léitheoireachta, agus deonaíonn `*` rochtain iomlán.

### `mcp:connect` — cumas cúng bealaigh (#7895)

Chun iompar HTTP/SSE MCP (`/api/mcp/*`) a bhaint amach ó sheoladh nach seoladh loopback é, teastaíonn
an t-eisceacht LOCAL_ONLY `/api/mcp/` (féach `docs/security/ROUTE_GUARD_TIERS.md`). Go stairiúil,
níor ghlac an eisceacht sin ach le heochair API a raibh scóip iomlán `manage`/`admin` aici — róleathan do
ghlaoiteoir nach gá dó ach cumarsáid a dhéanamh le MCP. Easpórtálann `src/shared/constants/managementScopes.ts`
`MCP_CONNECT_SCOPE = "mcp:connect"` anois: scóip bhreise chúng (de réir an fhasach chéanna le
`SELF_USAGE_SCOPE`) nach n-údaraíonn ACH seachaint `/api/mcp/` in
`src/server/authz/policies/management.ts` — ní dheonaíonn sí rochtain ar aon bhealach bainistíochta eile
agus coinnítear í d'aon ghnó LASMUIGH de `MANAGEMENT_API_KEY_SCOPES`. Gabhann eochair a bhfuil `manage`/`admin`
aici tríd an eisceacht gan athrú fós; is rogha eile ar phribhléid níos ísle é `mcp:connect` do
ghlaoiteoirí cianda MCP-amháin, agus seiceáiltear é trí `hasMcpConnectOrManageScope()`.

### Ceangal scóipe HTTP de réir eochrach (#7895)

Thar HTTP/SSE, réitíonn `open-sse/mcp-server/httpTransport.ts` fíorluach
`api_keys.scopes` an ghlaoiteora anois trí `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
agus cuireann sé ar aghaidh é chuig `transport.handleRequest(req, { authInfo })` de chuid MCP SDK, ionas go
léiríonn `extra.authInfo.scopes` a shroicheann gach glao uirlise scóipeanna na heochrach Bearer féin.
Thug `resolveCallerScopeContext()` in `scopeEnforcement.ts` tús áite cheana féin do `authInfo` thar
`_meta` agus cúltaca timpeallachta `OMNIROUTE_MCP_SCOPES` — ní dhéanann sé seo ach an chéad fhoinse sin, an
fhoinse is airde tosaíochta, a líonadh; foinse nár soláthraíodh roimhe seo thar HTTP. Nuair nach réitítear
aon eochair API (gan ceanntásc, eochair neamhbhailí), fanann `authInfo` mar `undefined` agus téann an réiteach
ar aghaidh chuig an slabhra `meta`/timpeallachta atá ann cheana gan athrú. Níl aon aitheantas de réir glaoiteora
ag stdio (féach `mcpCallerIdentity.ts`) agus ní dhéanann sé seo difear dó — fanann sé ar an slabhra cúltaca
`_meta`/timpeallachta.

**Cuirtear forfheidhmiú ar siúl go héigeantach do ghlaoiteoirí HTTP/SSE a bhfuil scóip chúng acu, beag beann ar
`OMNIROUTE_MCP_ENFORCE_SCOPES`.** Níl sé sábháilte `OMNIROUTE_MCP_ENFORCE_SCOPES` a bheith socraithe mar `false` de
réir réamhshocraithe ach amháin don sreabhadh áitiúil/stdio aon-oibreora, áit nach bhfuil aon aitheantas de réir glaoiteora
ann lena scópáil. Cuireann `open-sse/mcp-server/server.ts::withScopeEnforcement()` forfheidhmiú scóipe de réir uirlise
ar siúl gan choinníoll (`shouldForceScopeEnforcement()` in `scopeEnforcement.ts`) aon uair a réitigh
`resolveCallerScopeContext()`
`source === "authInfo"` (i.e. fíorcheanntásc HTTP Authorization de réir eochrach, HTTP/SSE amháin) AGUS nach
bhfuil scóip iomlán `manage`/`admin` ag an eochair sin. Dúnann sé seo an bhearna trína bhféadfadh eochair nach raibh aici ACH
an scóip chúng seachanta `mcp:connect` — a bhfuil cur síos uirthi thuas mar scóip nach n-údaraíonn aon ní seachas
eisceacht LOCAL_ONLY `/api/mcp/` — gach uirlis MCP a agairt murach sin a luaithe a chumasaigh oibreoir
rochtain MCP chianda/neamh-loopback, go simplí toisc go seoltar `OMNIROUTE_MCP_ENFORCE_SCOPES`
mar `false` de réir réamhshocraithe. Coinníonn eochair iomlán `manage`/`admin` thar HTTP, agus gach glaoiteoir stdio/áitiúil,
an t-iompar atá ann cheana faoi rialú `OMNIROUTE_MCP_ENFORCE_SCOPES` gan athrú.

---

## Athróga Timpeallachta

| Athróg                                  | Réamhshocrú                             | Cuspóir                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :-------------------------------------- | :-------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                | URL bonn a úsáideann an freastalaí MCP agus é ag glaoch ar APIanna inmheánacha OmniRoute                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_API_KEY`                     | (folamh)                                | Eochair API a chuirtear ar aghaidh mar `Authorization: Bearer` chuig glaonna API inmheánacha                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (ní chumasaíonn ach `"true"` é) | Nuair a chumasaítear é, diúltaíonn scóip atá ar iarraidh glaonna uirlisí agus logálann siad `scope_denied:<reason>` sa loga iniúchta. Cuirtear forfheidhmiú i bhfeidhm FREISIN beag beann ar an mbratach seo d’aon ghlaoiteoir HTTP/SSE a réitítear ó cheanntásc Authorization in aghaidh na heochrach (`source === "authInfo"`) nach bhfuil scóip iomlán `manage`/`admin` aige — m.sh. eochair nach bhfuil aici ach scóip sheachanta chúng `mcp:connect` — mar sin níl an réamhshocrú seo sábháilte ach amháin don sreabhadh áitiúil/stdio d’oibreoir aonair, agus ní do chianrochtain neamh-loopback riamh |
| `OMNIROUTE_MCP_SCOPES`                  | (folamh)                                | Liosta ceadaithe scóp, deighilte le camóga, a mheastar a bheith “ar fáil” de réir réamhshocraithe (úsáidtear é nuair nach soláthraíonn an glaoiteoir a scóip féin)                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (gan socrú = ann)                       | Nuair a shocraítear é go `0/false/off/no`, díchumasaítear comhbhrú tuairiscí MCP tráth an chlárúcháin                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (gan socrú = ann)                       | Ailias malartach don scorán céanna thuas                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                 | Buiséad tobscortha do léamha bainistíochta inmheánacha (sláinte, athléimneacht, teaglamaí, cuóta, úsáid)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                 | Buiséad tobscortha do leannlusanna a fhanann le soláthraí (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `MCP_TOOL_DENY`                         | (gan socrú = gan scagaire)              | Ainmneacha uirlisí, deighilte le camóga, atá le baint ó `tools/list` (laghdú ar chairdinéalacht uirlisí — féach thíos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `MCP_TOOL_ALLOW`                        | (gan socrú = gan scagaire)              | Ainmneacha uirlisí scartha le camóga le coinneáil go heisiach (mód liosta ceadaithe — féach thíos)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `DATA_DIR`                              | `~/.omniroute`                          | Scríobhtar an comhad buille croí chuig `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

---

## Comhbhrú Cur Síosa

Is féidir le formáidí uirlisí, leideanna, acmhainneacha MCP cur síos a chomhbhrú ag am clárnachais/liosta chun an t-aitheantas meiteashonraí a nochtar do chliaint a laghdú (agus mar sin an costas comhthéacs leideanna). Tá an t-impleacht suite i `open-sse/mcp-server/descriptionCompressor.ts` agus tá sé ceangailte isteach sa MCP freastalaí trí `compressMcpRegistryMetadata` laistigh de `createMcpServer()`.

- Rithann comhbhrú thar an téacs cur síos ag baint úsáide as an tacar rialacha Caveman (`getRulesForContext("all", "full")`) le gabháil blocanna stóráilte (spásanna cód, blocanna fallaí, srl.) ionas nach n-athraítear ábhar struchtúrach.
- Cuir tús/tuirlingt in aghaidh an imscaraidh tríd an luach `compression.mcpDescriptionCompressionEnabled` sa tábla socruithe `key_value` (réamhshocrú: cumasaithe) — nochtar sa tsiúl mar **Anailís → Comhbhrú cur síos MCP**.
- Cuir tús/tuirlingt tríd an phróiseas trí `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` nó `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Nochtar staitisticí fíor-ama trí `omniroute_compression_status` faoi `analytics.mcpDescriptionCompression` agus tá sé marcáilte le `source: "mcp_metadata_estimate"` chun é a dhifriú ó admhálacha úsáide soláthraí fíor.

## Laghdú Líon na nUirlisí (F4.3)

Cuireann comhbhrú cur síos ar mhéadrachtaí gach uirlis i bhfeidhm; téann **laghdú uirlis-lion** níos faide fós trí laghdú ar _cé mhéad_ uirlis a fógraítear ar chor ar bith. Laghdaíonn fógraíocht níos lú uirlisí i liosta Manifest `tools/list` an costas comhartha in aghaidh an iarratais a íocann múnla an chliaint don chatalóg uirlisí ("comhbhrú sraith 5"). Is scagaire neamhstáit gan stáit iad an t-impriseamh in `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), a nasctar isteach sa lúb clárnúcháin in `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Roghnach, as amhlaidh de réir réamhshocraithe.** Ní rithann an scagaire ach nuair a shocrútear a laghad de dhá athróg timpeallachta; gan iad á socrú, fógraítear na 110 uirlis go léir gan athrú.

| Athróg           | Mód                                                                                                      |
| :--------------- | :------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Dubhliosta — ainmneacha uirlisí scartha le camóg a bhaintear i gcónaí ó `tools/list`                     |
| `MCP_TOOL_ALLOW` | Liosta ceadaithe — ainmneacha uirlisí scartha le camóg; ní maireann ach iad seo, tógtar gach rud eile as |

Tosaíonn `deny` os cionn `allow`. Scartha le camóg iad na hainmneacha, baintear spásanna bána, agus fágann iad a bhaineann le folamh ina n-éagsúla. Samplaí:

```bash
# Bain dhá uirlis as an catalóg
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Fógraigh ach na huirlisí ródú + cuóta (mód liosta ceadaithe)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Conas a bhaintear uirlisí scagtha:** éiríonn le clárnúchán i gcónaí; díultaíonn próifíl uirlis ansin ar an sciath MCP SDK trí `.disable()`, ionas nach bhfeicfear riamh iad in `tools/list` ach go gcoinneoidh an nascadh i bhfeidhm (cumasaigh/díchumasaigh glan, gan athchlárnú). Is é an parsálaí próifíle `readMcpToolProfileFromEnv(process.env)`, a thugann `null` (gan scagadh) ar ais nuair a bhíonn an dá athróg folamh.

Tacaíonn an cruth níos saibhre `ToolProfile` atá taobh thiar de `reduceToolManifest` le scagadh idirbhreise scópa (`allowScopes`, le meaitseáil saoire stíl `read:*`) agus le huasteorainn `maxTools` cinnte, ach teastaíonn an manifest iomlán ag am clárnúcháin le haghaidh an dá chnaipe sin agus ní bhíonn siad **nochttha** tríd na haithreacha timpeallachta inniu (tá beanntán leibhéal `tools/list` á rianú mar leanúint). Tá `estimateManifestTokens()` ar fáil le costas comhartha an manifest a chur i gcomparáid roimh agus i ndiaidh an laghduithe.

---

## Beatha Rith-ama

Coinníonn an t-iompar stdio beo i `${DATA_DIR}/runtime/mcp-heartbeat.json` gach 5 soicind. Léann an deasc (`/api/mcp/status`) an comhad seo móide beo PID chun `online` a tharraingt as. Tuairiscíonn iompair HTTP stát ó `getMcpHttpStatus()` sa phróiseas ina ionad (gan scríobh comhaid).

Tá an seat beatha ann:

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

## Taifeadadh iniúchadh

Taifeadtar gach glao uirlise sa tábla SQLite `mcp_tool_audit` trí `open-sse/mcp-server/audit.ts`:

- Ainm na huirlise, argóintí (hasháilte gearrtha de réir `auditLevel` in aghaidh na huirlise), toradh
- Fad ama i ms, bratach ratha/teipthe, teachtaireacht earráide (nuair is infheidhme)
- Hais eochair API, stampa ama
- Diúltaí scópa taifeadtar mar `scope_denied:<reason>` le liosta na scópanna atá in easnamh

Úsáid an deasc nó na pointí stad REST `/api/mcp/audit` agus `/api/mcp/audit/stats` chun glaonna le déanaí a iniúchadh.

---

## Comhaid

| Comhaid                                                                  | Cuspóir                                                               |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | monarcha freastalaí MCP, pointe istigh stdio, clárlann uirlisí scóipe |
| `open-sse/mcp-server/httpTransport.ts`                                   | Iompar SSE + HTTP in-inrite (bhainistíocht seisiúin)                  |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Measúnú scóip uirlisí agus réiteach glaoiteora                        |
| `open-sse/mcp-server/audit.ts`                                           | logáil iniúchta glao uirlisí (`mcp_tool_audit`)                       |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | scríobhaí croí-defined stdio (`mcp-heartbeat.json`)                   |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | comhbhrú cur síos do chlárlanna uirlisí / leid / acmhainne            |
| `open-sse/mcp-server/schemas/tools.ts`                                   | scéimeanna Zod + clárlann uirlisí (`MCP_TOOLS`, 45 iontráil)          |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | láimhseálaithe uirlisí Céim 2 + taisce + 1proxy                       |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | láimhseálaithe uirlisí comhbhrú                                       |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | sainmhínithe uirlisí cuimhne (3 uirlis)                               |
| `open-sse/mcp-server/tools/skillTools.ts`                                | sainmhínithe uirlisí scile (4 uirlis)                                 |
| `open-sse/mcp-server/tools/notionTools.ts`                               | sainmhínithe uirlisí foinse comhthéacs Notion (6 uirlis)              |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | sainmhínithe uirlisí cluichithe (8 uirlis)                            |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | uirlisí clárlanna agus bainistíochta breiseán (8 uirlis)              |
| `src/app/api/mcp/status/route.ts`                                        | _pointe deiridh `/api/mcp/status`                                     |
| `src/app/api/mcp/tools/route.ts`                                         | pointe deiridh `/api/mcp/tools`                                       |
| `src/app/api/mcp/sse/route.ts`                                           | cosán iompar SSE `/api/mcp/sse`                                       |
| `src/app/api/mcp/stream/route.ts`                                        | cosán iompar HTTP in-inrite `/api/mcp/stream`                         |
| `src/app/api/mcp/audit/route.ts`                                         | iarratas loga iniúchta `/api/mcp/audit`                               |
| `src/app/api/mcp/audit/stats/route.ts`                                   | méadrachtaí iniúchta comhiomlán `/api/mcp/audit/stats`                |
| `src/lib/notion/api.ts`                                                  | cliant REST API Notion (attempts arís, am amach, aicmiú earráid)      |
| `src/lib/db/notion.ts`                                                   | seasmhacht comhartha Notion (`key_value` tábla)                       |
| `src/app/api/settings/notion/route.ts`                                   | API socruithe Notion (GET/POST/DELETE)                                |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | comhéadan bainistíochta comhartha Notion                              |
| `tests/unit/notion-api.test.ts`                                          | tástálacha cliant API Notion (7)                                      |
| `tests/unit/notion-tools.test.ts`                                        | tástálacha forfheidhmiú scóip uirlisí Notion (10)                     |
| `tests/unit/db/notion.test.mjs`                                          | tástálanna modúil DB Notion (3)                                       |
