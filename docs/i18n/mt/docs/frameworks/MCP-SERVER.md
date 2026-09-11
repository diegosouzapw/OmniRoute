# MCP-SERVER (Malti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

---

title: "Dokumentazzjoni tal-Server OmniRoute MCP"
version: 3.8.50
lastUpdated: 2026-08-08
---

# Dokumentazzjoni tal-Server OmniRoute MCP

> Protokoll tal-Kuntest tal-Mudell b'110 għodda fost operazzjonijiet ta' rotot, cache, kompressjoni, memorja, ħiliet, prokwi, pool, Radar, u sorsi tal-kuntest.
>
> Is-sors tal-verità: `open-sse/mcp-server/server.ts` jikkalkula **110 għodda unika** b'`countUniqueMcpTools()`: 45 definizzjonijiet kanoniċi (inklużi s-sitt għodod tal-ħajja ta' CCR, il-trio tal-ħiliet tal-ewlieni, `omniroute_radar_catalog`, u `omniroute_x_search`), flimkien mal-memorja (3), ħiliet (4), ħiliet GitHub (3), pool (6), gamifikazzjoni (8), plugins (8), Notion (6), Obsidian (22), corpus lokali (3), u żewġ għodod tal-kompressjoni biss-RTK.

## Installazzjoni

OmniRoute MCP huwa mibni fid-dħul. Beda billi:

```bash
omniroute --mcp
```

Jew permezz tal-ġbir open-sse:

```bash
# Ġbir li jista' jiġi strimjat HTTP (port 20130)
omniroute --dev  # L-MCP jibda awtomatikament fuq il-ponta /mcp
```

## Ġabriet

L-Server MCP jidher b'tliet ġabriet, kollha appoġġjati mill-fabbrika `createMcpServer()` l-istess:

| Ġbir              | Fejn                                            | Meta juża                                                             |
| :---------------- | :---------------------------------------------- | :-------------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                 | Integrazzjonijiet IDE (Claude Desktop, Cursor, eċċ.)                  |
| `sse`             | `POST/GET /api/mcp/sse` permezz `httpTransport` | Klijenti tal-bridew jew tal-ewlieni li jeħtieġu strim ta' avvenimenti |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`               | Klijenti HTTP b'_sessions multipli` (`mcp-session-id` header)         |

L-ġbir attiv HTTP (`sse` jew `streamable-http`) huwa magħżul mis-setting `mcpTransport`. Li tibdel il-ġabriet tagħlaq sessjonijiet eżistenti fuq l-ieħor.

### Aċċess mill-bogħod (ħlief għan-manage)

`/api/mcp/*` huwa fil-livell LOCAL_ONLY (`src/server/authz/routeGuard` ) — b'mod normali biss hosts loopback (`localhost`, `127.0.0.1`, `::1`) jistgħu jaċċessawh. Minn v3.8.2, klijenti li mhumiex loopback jistgħu jgħaqqdu jekk jippreżentaw `Authorization: Bearer <api-key>` li ċ-ċavetta tagħha għandha l-iskop `manage`. Dan huwa l-uniku mod biex tinkiseb l-server remote MCP permezz ta' tunnel, prokwi revers, hostname pubbliku.

```bash
# Agħti l-iskop manage: agħfas il-paġna API Keys fil-dashboard u dawwar
# "Management Access" fuq iċ-ċavetta, jew POST scopes:["manage"] meta tagħmel.

# Imbagħad għaqqad minn klijenti remote MCP:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ċavetta li mhijiex manage (jew ebda Bearer) terġa `403 LOCAL_ONLY`. Il-prefiss wieħed `/api/cli-tools/runtime/*` huwa apposta mhux baxx passabbli — ara [Livelli tal-Gwardja tal-rott — Ħlas tal-iskop manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Konfigurazzjoni tal-IDE

Ara [Konfigurazjoni tal-Klijent MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) għal Claude Desktop,
Cursor, Cline, u l-issettjar ta' klijenti MCP kompatibbli.

---

## Għodod Essenzjali (14) — Fażi 1

| Għodda                          | Skopijiet             | Deskrizzjoni                                                                                                                              |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Ħin ta' ħidma, memorija, breakers tal-ċirkuwitu, limiti tar-rata, statistiċi tal-cache                                                    |
| `omniroute_list_combos`         | `read:combos`         | Kollha l-kombos konfigurati bl-istrateġiji (metrici opzjonali)                                                                            |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metriċi tal-prestazzjoni għal kombu speċifiku                                                                                             |
| `omniroute_switch_combo`        | `write:combos`        | Attiva jew diżattiva kombu                                                                                                                |
| `omniroute_create_combo`        | `write:combos`        | Ħloq kombu validat permezz tal-API tal-kombu eżistenti                                                                                    |
| `omniroute_check_quota`         | `read:quota`          | Kwantità użata/kollha, perċentwal fadal, ħin ta' reset, saħħa tal-token                                                                   |
| `omniroute_route_request`       | `execute:completions` | Agħti t-tlestija tal-chat permezz tal-irbit ta' OmniRoute                                                                                 |
| `omniroute_cost_report`         | `read:usage`          | Rapport tal-ispejji skont l-iperjodu (session/jum/ġimgħa/xahar)                                                                           |
| `omniroute_list_models_cartier` | `read:models`         | Katalogu tal-mudelli sħiħ b'kapaċitajiet, statut, prezz                                                                                   |
| `omniroute_radar_cartier`       | `read:radar`          | Katalogu lokali iffirmat Radar; filtr tal-fornitur/familja opzjonali                                                                      |
| `omniroute_tool_search`         | `read:tools`          | Skopri għodod mill-katalogu MCP irreġistrat                                                                                               |
| `omniroute_web_search`          | `execute:search`      | Tiftix tal-web permezz tal-fornituri tat-tiftix konfigurati. Mhux X/Twitter.                                                              |
| `omniroute_x_search`            | `execute:search`      | Fittix X permezz ta' xAI/SuperGrok, jew agħżel `xquik-search` għar-riżultati tal-API tal-Xquik. Teħtieġ credentials għal backend magħżul. |
| `omniroute_web_fetch`           | `execute:search`      | Ġib kontenut tal-web permezz tal-fornituri tal-ġbid konfigurati                                                                           |

## Għodod Avvanzati (11) — Fażi 2

| Għodda                             | Ambiti                               | Deskrizzjoni                                                                                                          |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulazzjoni tat-tħaddim b'itradd għal ġurnata mingħajr effett f'ħin reali mal-permezz tal-pju ta' fallback           |
| `omniroute_set_budget_guard`       | `write:budget`                       | Iżżur is-sessjoni bil-ħlas b'azzjonijiet ta' degradazzjoni/blokki/tħabbir                                             |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Aġġorna l-istrateġija tal-kombu f'ħin reali (priorità/pżżata/awtomatika/ieħor)                                        |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Introduċi preset ta' reżiljenza `aggressiv` / `bilanċjat` / `konservattiv`                                            |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Test ħaj ta' kull fornitur f'kombu juża sejħa reali ta' upstream                                                      |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metriċi għal kull fornitur b'latenzja p50/p95/p99 u l-istat tal-qtar tal-circuit breaker                              |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Irrakkomanda kombu skont it-tip tax-xogħol b'kuntinjenzi ta' buġit/latenzja                                           |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Spjega għaliex sejħa ġiet immexxija lejn fornitur (fatturi tal-punteġġ + fallbacks)                                   |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Stampi sħiħa tas-sessjoni: spejjeż, tokens, mudelli/fornituri ewlenin, żbalji, gwardija tal-buġit                     |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diġanos u (jekk mixtieq) tirranġa awtomatikament telfa tal-bażi tad-dejta bħal referenzi kompu miksura / linji orfani |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sincronizza data tal-prezzijiet minn sorsi esterni (LiteLLM); jappoġġa `dryRun`                                       |

## Għodod tal-Cache (2)

| Għodda                  | Ambiti        | Deskrizzjoni                                                     |
| :---------------------- | :------------ | :--------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Kaxxa semantika, kaxxa ta' prompts, u statistiċi tal-idempotenzi |
| `omniroute_cache_flush` | `write:cache` | Tneħħi l-cache globalment jew skont il-firxa/mudell              |

## Għodod tal-Kompressjoni (13)

| Għodda                              | Ambiti              | Deskrizzjoni                                                                                                                                                     |
| :---------------------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Settings tal-kompressjoni, sommarju tal-analiżi, u statistiki tal-cache-aware (jinkludi metadata `analytics.mcpDescriptionCompression`)                          |
| `omniroute_compression_configure`   | `write:compression` | Ikkonfigura l-modalità tal-kompressjoni, il-limitu, l-għan tar-rata, il-preservazzjoni tal-prompt tas-sistema, u l-buttuna tal-kompressjoni tal-deskrizzjoni MCP |
| `omniroute_set_compression_engine`  | `write:compression` | Agħżel il-magna attiva (ttara/caveman/rtk/stacked) u l-intensità tal-Caveman/RTK                                                                                 |
| `omniroute_list_compression_combos` | `read:compression`  | Ippreżenta l-kombinazzjonijiet tal-kompressjoni b'isimhom u l-pipeline tal-magni tagħhom                                                                         |
| `omniroute_compression_combo_stats` | `read:compression`  | Analitiċi mogħtija skont il-kombinazzjoni tal-kompressjoni u l-magna                                                                                             |
| `omniroute_ccr_store`               | `write:compression` | Ħażen kontenut isolat għas-sejħa fil-maħżen ġewwa CCR u ġab markatur flimkien b'referenza `ccr://`                                                               |
| `omniroute_ccr_retrieve`            | `read:compression`  | Retrieval ta' kontenut CCR sħiħ jew b'modi ta' ras, denb, linji, grep, u statistiċi                                                                              |
| `omniroute_ccr_inspect`             | `read:compression`  | Ispezzjoni tal-metadata tal-CCR li jappartjeni għas-sejħa mingħajr ma terġa' lura l-kontenut                                                                     |
| `omniroute_ccr_list`                | `read:compression`  | Ippreżenta metadata paginat għal blokki tal-CCR li jappartjeni għas-sejħa                                                                                        |
| `omniroute_ccr_delete`              | `write:compression` | Ħassar blokka tal-CCR li jappartjeni għas-sejħa                                                                                                                  |
| `omniroute_ccr_stats`               | `read:compression`  | Rapporta l-użu tal-memorja skopat għas-sejħa, konturi tal-ħajja, u limiti tal-maħżen                                                                             |
| `omniroute_rtk_discover`            | `read:compression`  | Skopri t-telliegħa ripetutivi f'sampjunijiet RTK ta' għażla                                                                                                      |
| `omniroute_rtk_learn`               | `read:compression`  | Ġenera abbozz rivedibbli tal-filtri RTK minn sampjunijiet ta' għażla                                                                                             |

L-ingħad CCR huma ġewwa l-memorja biss u jisparixxu malli terġa' tibda l-applikazzjoni. Kull blokka hija limitata għal 2 MiB, kull
prinċipal għal 16 MiB, u l-maħżen għal 64 MiB. L-ingħad jinbidlu għal TTL ta' 24 siegħa (massimu
seba' ijiem). Ir-ritrival sħiħ tal-MCP huwa limitat għal 256 KiB; blokki akbar jibqgħu disponibbli permezz tal-
modi tal-firxa u l-grep. L-ħażna, l-irkupru, l-ippreżentazzjoni, l-ispezzjoni, l-ħassar, u l-istatistiċi huma iżolati minn
il-prinċipal tal-API-key identifikat. Ir-rekords tal-awdit jinkludu l-ħotob u metadata tal-kobor, qatt kontenut.

`omniroute_compression_status` jirrapporta l-kompressjoni tal-deskrizzjoni tal-MCP separatament taħt
`analytics.mcpDescriptionCompression`. Dawn il-valuri huma stimi tad-daqs tal-metadata għal deskrizzjonijiet MCP listable
(`tools`, `prompts`, `resources`, u `resourceTemplates`); mhumiex rċevi tal-użu tal-furnitur u huma markati b'`source: "mcp_metadata_estimate"`.

### Filtru tal-Arbu tal-Aċċessibbiltà MCP (v3.8.0)

Skont l-għodod tal-kompressjoni ta' hawn fuq, OmniRoute jinkludi filtr wara l-eżekuzzjoni li
jikkompressa ir-riżultati tal-**għodod** tal-għodod tal-aċċessibbiltà tal-browser MCP qabel ma jintbagħtu lill-
aġent. Dan il-filtr mhuwiex għodda stess — jaħdem b'mod trasparenti fuq kwalunkwe riżultat tal-għodda li fih
test verbose ta' arboret tal-aċċessibbiltà jew stampi tal-browser (≥2000 karattru).

Għanijiet ewlenin:

- Jiġbor minn taħt linji sliem iħarsu konsekuttivi ≥30 f'ras + ħarsa denb
- Jippreserva l-ankri `[ref=eXX]` meħtieġa minn Playwright/computer-use
- Jitħassar b'mod iebsa test kbir (>50,000 karattru) b'tħaris ta' navigazzjoni
- Tnaqqis mistenni: **60–80%** fil-piż tal-boroż tal-browser

Ikkonfigurazzjoni: `compression.mcpAccessibility` fil-SETTINGS ġenerali (migrazzjoni 056).
Implimentazzjoni: `open-sse/services/compression/engines/mcpAccessibility/`.
Dokumentazzjoni sħiħa: [Magni tal-Kompressjoni — Filtru tal-Arbu tal-Aċċessibbiltà MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Ara [Magni tal-Kompressjoni](../compression/COMPRESSION_ENGINES.md) u [Kompressjoni RTK](../compression/RTK_COMPRESSION.md) għall-
mudell tal-kompressjoni f'ħin reali wara dawn l-għodod.

## 1Proxy Għodod (3)

| Għodda                      | Ambiti         | Deskrizzjoni                                                                                      |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Ġib prokxies ħielsa mill-1proxy marketplace (filtri ta' protokoll/pajjiż/kwalità/limitu)          |
| `omniroute_oneproxy_rotate` | `read:proxies` | Ġib il-prokxi li jmiss disponibbli skont l-istrateġija (`random` / `quality` / `sequential`)      |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistika tal-pula, status tal-issinkronizzazzjoni, distribuzzjoni skont il-protokoll u l-pajjiż |

## Għodod tal-Memorja (3)

Definiti f'`open-sse/mcp-server/tools/memoryTools.ts`. L-awtentikazzjoni/ambiti infurzati permezz tal-pipeline standard tal-ambiti MCP.

| Għodda                    | Ambiti         | Deskrizzjoni                                                                                 |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Fittex memorji permezz ta' titlob/tip/chave API b'infurzar ta' baġit ta' token               |
| `omniroute_memory_add`    | `write:memory` | Żid entrata ġdida tal-memorja (`factual` / `episodic` / `procedural` / `semantic`)           |
| `omniroute_memory_clear`  | `write:memory` | Ħassar il-memorji għal chiave API, eventwalment iffiltrat bil-mist jew `olderThan` timestamp |

## Għodod tal-Ħiliet (4)

Definiti f'`open-sse/mcp-server/tools/skillTools.ts`. Appoġġjati minn `src/lib/skills/registry` + `src/lib/skills/executor`.

| Għodda                        | Ambiti           | Deskrizzjoni                                                                                     |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Reġistra l-ħiliet irreġistrati b'filtru awtonomu skont il-chave API, l-isem, jew l-istat attivat |
| `omniroute_skills_enable`     | `write:skills`   | Attiva jew diżattiva ħila speċifika permezz ta' ID                                               |
| `omniroute_skills_execute`    | `execute:skills` | Eżekuta ħila b'data input provduta u erġa lura r-record tal-eżekuzzjoni                          |
| `omniroute_skills_executions` | `read:skills`    | Reġistra l-istorja tal-eżekuzzjoni tal-ħiliet reċenti                                            |

## Sors ta' Kuntest Notion (6)

Definiti f'`open-sse/mcp-server/tools/notionTools.ts`. Token洢żn fl-`key_value` tabella permezz ta' `src/lib/db/notion.ts`. Client REST f'`src/lib/notion/api.ts`. API tal-issettjar f'`src/app/api/settings/notion/route.ts`. Interface tal-dashboard f'`src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Ikkonfigura t-token tal-integrazzjoni Notion tiegħek mill-tab **Sorsijiet tal-Kuntest** fil-dashboard tal-Endpoint, jew permezz tal-API REST:

```bash
# Ċaħda token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Iċċekkja l-istatus
curl http://localhost:20128/api/settings/notion

# Qatta' konnessjoni
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Għodda                       | Ambiti          | Deskrizzjoni                                                      |
| :--------------------------- | :-------------- | :---------------------------------------------------------------- |
| `notion_search`              | `read:notion`   | Tiftixa b'test sħiħ f'kull paġna u database                       |
| `notion_get_page`            | `read:notion>`  | Ġib paġna permezz ID mal-proprjetajiet tagħha                     |
| `notion_list_block_children` | `read:notion`   | Reġistra l-blokok tfal ta' paġna jew blokku                       |
| `notion_query_database`      | `read:notion>`  | istaqsi database b'filtri, tordna, u paginazzjoni                 |
| `notion_get_database`        | `read:notion>`  | Ġib is-skkema tal-database permezz ID                             |
| `notion_append_blocks`       | `write:notion>` | Żid blokok tfal ma' blokku ġenitur (massimu 100 fil-żmien wieħed) |

## Katalgu tal-Għodod tal-Aġenti tal-Ħiliet (3)

Definit f'`open-sse/mcp-server/tools/agentSkillTools.ts`. Appoġġjat minn `src/lib/agentSkills/catalog`. Dawn l-għodod jwettqu l-katalgu ta' 45 ħila tal-aġenti lill-klijenti MCP u lill-aġenti esterni. Skop: `read:catalog`.

| Għodda                            | Skopijiet      | Deskrizzjoni                                                                                                                                    |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Lista ta' l-45 ħila tal-aġenti bi filtri fakultattivi `category` (api\|cli) u `area`; jirritorna metadata + koperanza                           |
| `omniroute_agent_skills_get`      | `read:catalog` | Ħu metadata sħiħ + kontenut SKILL.md għal ħila waħda permezz tal-`id` kanonika                                                                  |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistiċi tal-koperanza: kemm mill-23 API, 21 CLI u 1 ħila tal-konfigurazzjoni għandhom fajls SKILL.md fuq il-filesystem vs totali tal-katalgu |

Ara [AGENT-SKILLS.md](./AGENT-SKILLS.md) għall-katalgu sħiħ u kif l-aġenti esterni jikkunsmawh.

## Frawmworks Relatati (v3.8.0)

L-inventarju tal-għodod MCP iktar 'l fuq (110 għodod uniċi, ikkalkulat minn `countUniqueMcpTools()`) huwa intenzjonat li jkun
skopjat għall-operazzjonijiet ta' routing/cache/kompressjoni/memorja/ħiliet/proxy/kontenut-sors runtime. Żewġ frawmworks
tal-madwar jmorru flimkien mal-server MCP fil-v3.8.0 u huma dokumentati separatament:

### Aġenti tal-Ħruġ (Cloud Agents)

L-Aġenti tal-Ħruġ huma aġenti tal-kodiċjarja AI barra mill-proċess (codex-cloud, cursor-cloud, devin, jules) marbutin
mal-Omniroute permezz tal-mudell ta' konnessjoni stess użat għall-fornituri LLM. Huma esposti permezz
ta' wieqfa REST propja (`/api/v1/agents/*`) u **mhumiex** parti mill-katalgu tal-għodod MCP
— il-ħolqien ta' Aġent tal-Ħruġ ma jikkonsmax skop MCP.

- Implimentazzjoni: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Ħajja: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentazzjoni: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Ħarsien (Guardrails)

L-Ħarsien huma filtrijiet ta' qabel/wara l-eżekuzzjoni (vision-bridge, pii-masker, prompt-injection)
applikati ġewwa l-pipeline tal-chat. Huma jħarrku qabel jintlaħaq il-livell tal-għodod/ruta MCP
u joħorġu vjolazzjonijiet strutturati għall-pipeline tal-audit; mhumiex sejħa bħala għodod MCP.

- Implimentazzjoni: `src/lib/guardrails/`.
- Dokumentazzjoni: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Meta tindagħal sejħa MCP li tidher ibblukkata, iċċekkja kemm l-log tal-audit MCP
(dħulijiet `scope_denied:*`) kif ukoll it-trail tal-audit tal-ħarsien — it-talba tista' tiġi rifjutata minn
ħaris **qabel** anki jasal fil-livell tal-infurzar tal-ħlas tal-MCP.

---

## Endpointijiet REST API

| Endpoint               | Metodu                | Deskrizzjoni                                                                                                 | Awtorizzazzjoni               |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------- | :---------------------------- |
| `/api/mcp/status`      | `GET`                 | Status tal-server: heartbeat, statut tat-trasport HTTP, sommarju tal-attività tal-audit                      | Ġestjoni (session/amministr.) |
| `/api/mcp/tools`       | `GET`                 | Katalgu tal-għodod (isem, deskrizzjoni, skopijiet, fażi, endpointijiet sors)                                 | Ġestjoni                      |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint tat-trasport SSE (bl-isfel minn `mcpEnabled` + `mcpTransport === "sse"`)                            | Ċavetta API + skopijiet       |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Trasport HTTP li jista' jiġi sfruttat (jusata l-intestatura `mcp-session-id`; `DELETE` itemm session)        | Ċavetta API + skopijiet       |
| `/api/mcp/audit`       | `GET`                 | Dħulijiet fil-log tal-audit minn `mcp_tool_audit` (filtri: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Ġestjoni                      |
| `/api/mcp/audit/stats` | `GET`                 | Statistiċi tal-audit aggregati (`totalCalls`, `successRate`, `avgDurationMs`, għodod ewlenin)                | Ġestjoni                      |

Fajls tal-isors: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

It-trasport SSE u HTTP li jista' jiġi sfruttat it-tnejn huma ibblukkati sakemm is-server MCP jiġi attivat fl-Settjar (`mcpEnabled`) u l-`mcpTransport` xierqa tiġi magħżula. Jekk jiġi skonfigurat trasport ħażin, ir-ruta tirritorna HTTP 400 b'suggeriment biex tibdil l-issettjar.

---

## Awtentikazzjoni u Skopijiet

L-għodod tal-MCP huma awtentikati permezz ta' skopijiet tal-API key. L-infurzar tal-iskopijiet huwa ċentralizzat f'`open-sse/mcp-server/scopeEnforcement.ts`. Kull għodda teħtieġ skopijiet speċifiċi:

| Skop                  | Għodod                                                                                                                                                                            |
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
| `read:obsidian`       | 13 għodod tal-qari — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 għodod tal-kitba — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                 |

Jewx appoġġ għal skopijiet b'wildcards: `read:*` jingħata l-ispekopijiet kollha tal-qari, `*` jingħata aċċess sħiħ.

### `mcp:connect` — kapaċità ristretta tal-rotta (#7895)

Il-wasla għat-trasport HTTP/SSE tal-MCP (`/api/mcp/*`) minn barra loopback teħtieġ l-eċċezzjoni `LOCAL_ONLY` għal `/api/mcp/` (ara `docs/security/ROUTE_GUARD_TIERS.md`). Storikament, dik l-eċċezzjoni kienet takkett biss API key b'iskop sħiħ `manage`/`admin` — wisq wiesa' għal min jista' jirrikjiedi biss biex iħallas mal-MCP. `src/shared/constants/managementScopes.ts` issa jesporta `MCP_CONNECT_SCOPE = "mcp:connect"`: skop ristrett, addittiv (istess preċedent bħal `SELF_SCOPE_USAGE`) li jauthorizza BISS l-eċċezzjoni `/api/mcp/` f'`src/server/authz/policies/management.ts` — dan ma jagħti l-ebda aċċess ieħor għar-rotta ta' ġestjoni u huwa mqabbd ħafna biex joħroġ minn `MANAGEMENT_API_KEY_SCOPES`. Key b'iskop `manage`/`admin` għadha tgħaddi l-eċċezzjoni bħala t-tali; `mcp:connect` huwa alternattiva b'privileġġi iżgurar għal min mill-bogħod jitkellem mal-MCP biss, verifikata permezz ta' `hasMcpConnectOrManageScope()`.

### Rbit tal-iskop HTTP skont il-key (#7895)

Fuq HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` issa jirrisolvi t-`api_keys.scopes` reali tal-istitwenti permezz ta' `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) u jgħaddu lill-SDK tal-MCP fi `transport.handleRequest(req, { authInfo })`, sabiex `extra.authInfo.scopes` li jilħaq kull sejħa tal-għodda jirrifletti l-iskopijiet tal-key Bearer innifisha. `resolveCallerScopeContext()` ta' `scopeEnforcement.ts` diġà kienet tagħti prijorità lil `authInfo` fuq l-għażliet `_meta` u `OMNIROUTE_MCP_SCOPES` — dan jimla dak l-ewwel sors, l-ogħla prijorità, li qabel kien nieqes fuq HTTP. Meta ma tiġirrisolvix key API (ebda header, key invalid), `authInfo` jibqa' `undefined` u r-risoluzzjoni tinżel għall-katina ta' `meta`/env li diġà teżisti, mingħajr tibdil. Dan MAgħmilx default ta' `OMNIROUTE_MCP_ENFORCE_SCOPES` — l-infurzar għadu jrid ikun attivat b'mod esplicitu; dan il-biddil jagħmel it-triq tal-key tipprevali darba jkun attiv. L-stdio m'għandu l-ebda identità tal-istitwenti (ara `mcpCallerIdentity.ts`) u mhuwa affettwatx — jibqa' fuq il-katina ta' l-għażliet `_meta`/env.

---

## Varaġenti tal-Ambjent

| Varaġenti                               | Implemetata b'mod                    | Għan                                                                                                                                                |
| :-------------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`             | URL bażi li l-MCP server juża meta jsejjaħ għall-APIs interni tal-OmniRoute                                                                         |
| `OMNIROUTE_API_KEY`                     | (bojda)                              | Ċavetta API li tiġi mibgħuta bħala `Authorization: Bearer` lil sejħiet API interni                                                                  |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (biss `"true"` jiġi attivat) | Meta jkun attivat, is-skopijiet nieqsa jiċħdu l-għodod u jirreġistraw `scope_denied:<reason>` fil-log tal-awditjar                                  |
| `OMNIROUTE_MCP_SCOPES`                  | (bojda)                              | Lista blt-turija ta' skopijiet separati b'virgola meqjusa "disponibbli" b'mod default (użata meta l-sejjaħ ma jipprovdix l-iskopijiet tiegħu stess) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (mhux issettjat = mixgħul)           | Meta jkun issettjat għal `0/false/off/no`, jisketta l-kompressjoni tad-deskrizzjoni tal-MCP meta jiġi rreġistrat                                    |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (mhux issettjat = mixgħul)           | Alias alternattiv għall-istess toggle ta' hawn fuq                                                                                                  |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                              | Baġit ta' abboj għal qari maniġerjali interni (saħħa, reżiljenza, kombos, kota, użu)                                                                |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                              | Baġit ta' abboj għal passi li jistennew fornitur (`route_request`, `web_search`, `web_fetch`)                                                       |
| `MCP_TOOL_DENY`                         | (mhux issettjat = l-ebda filtr)      | Għodod separati b'virgola biex jitneħħew minn `tools/list` (tnaqqis tal-kardinalità tal-għoda — ara t'hawn isfel)                                   |
| `MCP_TOOL_ALLOW`                        | (mhux issettjat = l-ebda filtr)      | Għodod separati b'virgola biex jinżammu esklużivament (modalità allow-list — ara t'hawn isfel)                                                      |
| `DATA_DIR`                              | `~/.omniroute`                       | Il-fajl tal-ħjiels tal-qalb jiġi miktub f'`${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                  |

---

## Kompressjoni tal-Deskrizzjonijiet

Ir-reġistri tal-għodod, prompts, u riżorsi tal-MCP jistgħu jikkompressaw id-deskrizzjonijiet fil-mument tar-reġistrazzjoni/lista biex inaqqas it-trasport tal-metadata li jintwera lill-klijenti (u għalhekk l-ispiża tal-kuntest tal-prompt). L-implimentazzjoni tinsab f'`open-sse/mcp-server/descriptionCompressor.ts` u hija mwaħħda fil-MCP server permezz ta' `compressMcpRegistryMetadata` ġewwa `createMcpServer()`.

- Il-kompressjoni topera fuq it-test tad-deskrizzjoni bl-użu tas-sett tar-regoli Caveman (`getRulesForContext("all", "full")`) b'estrazzjoni ta' blokki preżervati (span tal-kodiċi, blokki iġgarafu, eċċ.) sabiex il-kontenut strutturali ma jinbidilx.
- Twaqqaf għal kull impjieg permezz tal-valur `compression.mcpDescriptionCompressionEnabled` fit-tabella tal-issettjar `key_value` (default: mixgħul) — esposta fl-interfaċċ bħala **Analitiċi → Kompressjoni tad-deskrizzjoni tal-MCP**.
- Twaqqaf għal proċess kollu permezz ta' wieħed minn `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` jew `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- L-istatistika reali turi permezz ta' `omniroute_compression_status` taħt `analytics.mcpDescriptionCompression` u tittagga b'`source: "mcp_metadata_estimate"` biex jiġi diskriminat minn irċeviċi reali tal-użu tal-fornitur.

## Tnaqqis tal-Kardinalità tal-Għodod (F4.3)

Id-deskrizzjoni tin压缩 kull metadatal tal-għodda; **il-tnaqqis tal-kardinalità tal-għodod** jmur pass 'il quddiem billi jnaqqas kemm għodod jiġu ppubblikati kollha kemm huma. L-iqsar ħlas tal-token għal kull sejħa li l-mudell tal-klijent iħallas għall-katalogu tal-għodod ("kompressjoni tal-qatgħa 5") jinkiseb billi jinxtered numru anqas ta' għodod fil-manifest `tools/list`. L-implimentazzjoni hija filtr statless pur f'`open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), imwaħħal mal-loop tar-reġistrazzjoni f'`createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Agħżel li tattivah, inattiv b'mod defalt.** Il-filtr jimxi biss meta jkun hemm mill-inqas wieħed mill-variabli ambjentali twaqqaf; b'ebda waħda milhom ma tittella', l-110 għodod kollha jiġu ppubblikati kif inhuma.

| Variabli         | _MODALITA'                                                                                                |
| :--------------- | :-------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Lista sewda — ismijiet tal-għodod, Separati b'virgola, li dejjem jitwarrbu minn `tools/list`              |
| `MCP_TOOL_ALLOW` | Lista ta' permessi — ismijiet tal-għodod, Separati b'virgola; dawn biss jgħixu, l-oħrajn kollha jitwarrbu |

`deny` għandha priorità fuq `allow`. L-ismijiet huma separati b'virgola, mnaqqsa, u d-dħul bojod jiġu injorati. Eżempji:

```bash
# Aħli żewġ għodod mill-katalogu
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Ippubblika biss l-għodod tal-rotta + il-kwantità (modalità lista ta' permessi)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Kif l-għodod filtrati jitneħħew:** ir-reġistrazzjoni dejjem tirnexxi; għodda li l-profil jirrifjuta mbagħad tingħata `.disable()` fuq il-handle tal-SDK tal-MCP, sabiex qatt ma tidher f'`tools/list` iżda l-wiring iżommha intatta (tattiv/attivat b'mod nadif, l-ebda reġistrazzjoni mill-ġdid). L-analizzatur tal-profil huwa `readMcpToolProfileFromEnv(process.env)`, li jirritorna `null` (bla filtru) meta l-variabli kollha jkun vojta.

L-`ToolProfile` aktar ricche ta' wara `reduceToolManifest` jappoġġa wkoll il-filtra tal-intersezzjoni tal-ambitu (`allowScopes`, b'taħlita ta' wildcards bħal `read:*`) u limitu deterministiku ta' `maxFormTools`, iżda dawn iż-żewġ knobbs jeħtieġu l-manifest kollu fiż-żmien tar-reġistrazzjoni u **mhumiex** esposti permezz tal-variabli ambjentali llum (hook f'livell `tools/list` huwa segwitu traċċat). `estimateManifestTokens()` huwa disponibbli biex tqabbel il-kost tal-token tal-manifest qabel u wara t-tnaqqis.

---

## Qalb tal-Mument tax-Xogħol

It-trasport stdio jippreserva l-ħajja f'`${DATA_DIR}/runtime/mcp-heartbeat.json` kull 5 sekondi. Id-dashboard (`/api/mcp/status`) jaqra dan il-fajl flimkien mal-ħajja tal-PID biex jikseb `online`. It-trasporti HTTP jirrappurtaw stat minn `getMcpHttpStatus()` intern (bla kitba tal-fajl).

Is-snapshot tal-qalb jinkludi:

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

## Log tal-Awditjar

Kull sejħa tal-għodda hija irreġistrata fl- SQLite `mcp_tool_audit` tat-tabella minn `open-sse/mcp-server/audit.ts`:

- Isem tal-għodda, argomenti (mharsa/waqqfa skont `auditLevel` tal-għodda), riżultat
- Tħaddim f'ms, bandiera ta' suċċess/falliment, messaġġ ta' żball (meta applikabbli)
- Hash ta' ċavetta tal-API, data u ħin
- Ir-rifjut tal-ambitu huwa irreġistrat bħala `scope_denied:<raġuni>` mal-lista tal-ambitu nieqes

Uża d-dashboard jew l-endpoints REST `/api/mcp/audit` u `/api/mcp/audit/stats` biex tispezzjona sejħat reċenti.

---

## Fajls

| Fajl                                                                     | Għan                                                                                         |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Fatħa tal-fabbrika tal-server MCP, il-punt tal-stdj-u, reġistrazzjonijiet tal-għodda skopati |
| `open-sse/mcp-server/httpTransport.ts`                                   | Trasport SSE + HTTP li jista' jingħaqad (ġestjoni tal-sessioni)                              |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Valutazzjoni tal-iskop tal-għodda u riżoluzzjoni tal-sejjaħa                                 |
| `open-sse/mcp-server/audit.ts`                                           | Log tal-awditjar tat-sejħat tal-għodda (`mcp_tool_audit`)                                    |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Kitbatura tal-heartbeat stdio (`mcp-heartbeat.json`)                                         |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | 卫迫迪 raster tal-deskrizzjoni għar-reġistri tal-għodda / prompt / riżorsi                   |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Schemas Zod + reġistru tal-għodda (`MCP_TOOLS`, 45 daħla)                                    |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Trattaturi tal-għodda Fażi 2 + cache + 1proxy                                                |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Trattaturi tal-għodda tal-kompressjoni                                                       |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definizzjonijiet tal-għodda tal-memorja (3 għodda)                                           |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definizzjonijiet tal-għodda tal-ħiliet (4 għodda)                                            |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definizzjonijiet tal-għodda tal-isors Notion (6 għodda)                                      |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definizzjonijiet tal-għodda tal gamifikazzjoni (8 għodda)                                    |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Għodda għar-reġistrazzjoni u ġestjoni tal-plugins (8 għodda)                                 |
| `src/app/api/mcp/status/route.ts`                                        | Tmiem ` /api/mcp/status`                                                                     |
| `src/app/api/mcp/tools/route.ts`                                         | Tmiem ` /api/mcp/tools`                                                                      |
| `src/app/api/mcp/sse/route.ts`                                           | Rotta tal-trasport SSE ` /api/mcp/sse`                                                       |
| `src/app/api/mcp/stream/route.ts`                                        | Rotta tal-trasport HTTP li jista' jingħaqad ` /api/mcp/stream`                               |
| `src/app/api/mcp/audit/route.ts`                                         | Mistoqsija tal-log tal-awditjar ` /api/mcp/audit`                                            |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Metrikki tal-awditjar aggregati ` /api/mcp/audit/stats`                                      |
| `src/lib/notion/api.ts`                                                  | Klijent REST API Notion (rikketi, limiti ta' żmien, klassifikazzjoni tal-iżbalji)            |
| `src/lib/db/notion.ts`                                                   | Persistenza tal-token Notion (`tal- tabella key_value`)                                      |
| `src/app/api/settings/notion/route.ts`                                   | API tas-settings Notion (GET/POST/DELETE)                                                    |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Interfaċċ tal-ġestjoni tal-token Notion                                                      |
| `tests/unit/notion-api.test.ts`                                          | Testijiet tal-klijent API Notion (7)                                                         |
| `tests/unit/notion-tools.test.ts`                                        | Testijiet tal-iskop tal-għodda Notion (10)                                                   |
| `tests/unit/db/notion.test.mjs`                                          | Testijiet tal-modulu Notion DB (3)                                                           |
