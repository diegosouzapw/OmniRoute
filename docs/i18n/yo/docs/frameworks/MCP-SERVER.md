# OmniRoute MCP Server Documentation (Yorùbá)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Sẹ́ńbà Model Context Protocol pẹ̀lú irinṣẹ́ 110 fún ìdarí ipa-ọ̀nà, àpamọ́, ìfúnpọ̀, ìrántí, àwọn ọgbọ́n, aṣojú, àkójọpọ̀, Radar, àti àwọn iṣẹ́ orísun àyíká.
>
> Orísun òtítọ́: `open-sse/mcp-server/server.ts` ṣe ìṣirò **àwọn irinṣẹ́ aláìlẹ́ẹ̀mejì 110** pẹ̀lú `countUniqueMcpTools()`: àwọn ìtumọ̀ àṣẹ 45 (tí ó ní àwọn irinṣẹ́ ìgbésí-ayé CCR mẹ́fà, ẹ̀ẹ̀mẹ́ta ti ọgbọ́n aṣojú, `omniroute_radar_catalog`, àti `omniroute_x_search`), pẹ̀lú ìrántí (3), àwọn ọgbọ́n (4), àwọn ọgbọ́n GitHub (3), àkójọpọ̀ (6), ṣíṣe bí eré (8), àwọn àfikún (8), Notion (6), Obsidian (22), àkójọ ọ̀rọ̀ abẹ́lé (3), àti àwọn irinṣẹ́ ìfúnpọ̀ méjì tí ó jẹ́ ti RTK nìkan.

## Fífi sori ẹrọ

OmniRoute MCP wà nínú rẹ̀ láti ìbẹ̀rẹ̀. Bẹ̀rẹ̀ rẹ̀ pẹ̀lú:

```bash
omniroute --mcp
```

Tàbí nípasẹ̀ ìrìnàjò open-sse:

```bash
# Ìrìnàjò HTTP tí a lè sanwọle (port 20130)
omniroute --dev  # MCP máa ń bẹ̀rẹ̀ fúnra rẹ̀ lórí endpoint /mcp
```

Àwọn ìrìnàjò HTTP (`sse` / `streamable-http`, tí server dashboard ń pèsè láàárín process náà) jẹ́
pípà nípa àìròtẹ́lẹ̀, àti pé tẹ́lẹ̀, ojú-ìwé `/dashboard/mcp` nìkan ni a ti lè tan tàbí pa wọ́n. Láti v3.8.51
lọ, CLI náà ní agbára kan náà:

```bash
omniroute mcp status                                  # enabled/online, ìrìnàjò, iye irinṣẹ́
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # tún àwọn session sse/streamable-http tó ń ṣiṣẹ́ ṣe
```

`mcp enable`/`mcp disable` máa ń fi PATCH ranṣẹ́ sí setting `mcpEnabled` kan náà (àti `mcpTransport` bí ó bá yẹ)
tí dashboard ń tàn tàbí pa nípasẹ̀ `/api/settings`. `mcp restart` máa ń pe `POST /api/mcp/restart`: ó máa ń
fopin sí àwọn session `sse`/`streamable-http` tó ń ṣiṣẹ́ kí request tó kàn lè tún bẹ̀rẹ̀ láìsí ìṣòro, ó máa ń dá
`409` padà bí MCP bá jẹ́ pípà, àti `501` fún ìrìnàjò `stdio` (àwọn client stdio ló ni subprocess tiwọn fúnra wọn —
kò sí handle inú process láti tún bẹ̀rẹ̀).

## Àwọn Transport

Olùpín MCP ń pèsè àwọn transport mẹ́ta, gbogbo wọn sì ń lo factory `createMcpServer()` kan náà:

| Transport         | Ibi                                            | Ìgbà tí a ó lò ó                                            |
| :---------------- | :--------------------------------------------- | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | Àwọn ìṣọ̀kan IDE (Claude Desktop, Cursor, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ)    |
| `sse`             | `POST/GET /api/mcp/sse` nípasẹ̀ `httpTransport` | Àwọn client browser/agent tí wọ́n nílò ìṣàn event            |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | Àwọn client HTTP onírúurú session (header `mcp-session-id`) |

Setting `mcpTransport` ló ń yan transport HTTP tó ń ṣiṣẹ́ (`sse` tàbí `streamable-http`). Yíyí transport padà máa ń pa àwọn session tó wà tẹ́lẹ̀ lórí transport kejì.

### Ìráàyèsí jíjìn (yíyẹ manage-scope kọjá)

`/api/mcp/*` wà ní ipele LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — ní àìyípadà, àwọn host loopback nìkan (`localhost`, `127.0.0.1`, `::1`) ló lè dé ọ̀dọ̀ rẹ̀. Láti v3.8.2, àwọn client tí kì í ṣe loopback lè sopọ̀ bí wọ́n bá fi `Authorization: Bearer <api-key>` hàn, tí key rẹ̀ sì ní scope `manage`. Èyí nìkan ni ọ̀nà láti dé olùpín MCP jíjìn nípasẹ̀ tunnel, reverse proxy, tàbí hostname gbogbogbò.

```bash
# Fún un ní scope manage: ṣí ojú-ìwé API Keys lórí dashboard, kí o sì tan
# "Management Access" fún key náà, tàbí ṣe POST scopes:["manage"] nígbà tí o bá ń ṣẹ̀dá rẹ̀.

# Lẹ́yìn náà, sopọ̀ láti client MCP jíjìn:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Key tí kò ní `manage` (tàbí tí kò ní Bearer) máa dá `403 LOCAL_ONLY` padà. A kò mọ̀ọ́mọ̀ gba àkọ́lé ìbátan `/api/cli-tools/runtime/*` láàyè láti kọjá ààlà yìí — wo [Àwọn Ipele Route Guard — ààyè àkànṣe manage-scope](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Ìṣètò IDE

Wo [Ìṣètò Oníbàárà MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) fún ìṣètò Claude Desktop,
Cursor, Cline, àti àwọn oníbàárà MCP tó bá a mu.

---

## Àwọn Irinṣẹ́ Pàtàkì (14) — Ìpele 1

| Irinṣẹ́                          | Àwọn Àṣẹ              | Àpèjúwe                                                                                                                 |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Àkókò tí ó ti ń ṣiṣẹ́, ìrántí, àwọn olùdáwọ́lé àyíká, àwọn òpin ìwọ̀n, àwọn ìṣirò àpamọ́                                    |
| `omniroute_list_combos`         | `read:combos`         | Gbogbo àwọn combo tí a ti ṣètò pẹ̀lú àwọn ọgbọ́n ìlànà (àwọn ìwọ̀n iṣẹ́ jẹ́ àṣàyàn)                                          |
| `omniroute_get_combo_metrics`   | `read:combos`         | Àwọn ìwọ̀n iṣẹ́ fún combo kan pàtó                                                                                        |
| `omniroute_switch_combo`        | `write:combos`        | Mú combo kan ṣiṣẹ́ tàbí dá a dúró                                                                                        |
| `omniroute_create_combo`        | `write:combos`        | Ṣẹ̀dá combo tí a ti fìdí rẹ̀ múlẹ̀ nípasẹ̀ API combo tó wà tẹ́lẹ̀                                                             |
| `omniroute_check_quota`         | `read:quota`          | Ìpín tí a lò/lápapọ̀, ìdá ọgọ́rùn-ún tó kù, àkókò àtúntò, ìlera token                                                     |
| `omniroute_route_request`       | `execute:completions` | Fi ìbéèrè ìparí ìfọ̀rọ̀wérọ̀ ránṣẹ́ nípasẹ̀ ìdarí ọ̀nà OmniRoute                                                              |
| `omniroute_cost_report`         | `read:usage`          | Ìròyìn iye owó gẹ́gẹ́ bí àkókò (ìgbà/ọjọ́/ọ̀sẹ̀/oṣù)                                                                         |
| `omniroute_list_models_catalog` | `read:models`         | Àkójọ model kíkún pẹ̀lú àwọn agbára, ipò, àti ìdíyelé                                                                    |
| `omniroute_radar_catalog`       | `read:radar`          | Àkójọ Radar agbègbè tí a fọwọ́ sí; àwọn àsẹ̀ olùpèsè/ẹbí jẹ́ àṣàyàn                                                        |
| `omniroute_tool_search`         | `read:tools`          | Ṣàwárí àwọn irinṣẹ́ láti inú àkójọ MCP tí a forúkọsílẹ̀                                                                   |
| `omniroute_web_search`          | `execute:search`      | Ṣàwárí wẹ́ẹ̀bù nípasẹ̀ àwọn olùpèsè ìṣàwárí tí a ti ṣètò. Kì í ṣe X/Twitter.                                               |
| `omniroute_x_search`            | `execute:search`      | Ṣàwárí X nípasẹ̀ xAI/SuperGrok, tàbí yan `xquik-search` fún àwọn èsì Xquik API. Ó nílò ẹ̀rí ìdánimọ̀ fún backend tí a yàn. |
| `omniroute_web_fetch`           | `execute:search`      | Gba àkóónú wẹ́ẹ̀bù nípasẹ̀ àwọn olùpèsè ìgbàwá tí a ti ṣètò                                                                |

## Àwọn Irinṣẹ́ Onípele Gíga (11) — Ìpele 2

| Irinṣẹ́                             | Àwọn Ààyè Àṣẹ                        | Àpèjúwe                                                                                                   |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Ìfọwọ́ṣe ìdarí ọ̀nà láìṣe ìmúlò gidi pẹ̀lú igi ọ̀nà àfirọ́pò                                                   |
| `omniroute_set_budget_guard`       | `write:budget`                       | Ìṣúná sáà pẹ̀lú ìgbésẹ̀ ìdínkù/ìdènà/ìkìlọ̀                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Ṣàfikún ọgbọ́n combo ní àsìkò ìṣiṣẹ́ (ààyò/ìwọ̀n/àìfọwọ́yí/àti bẹ́ẹ̀ bẹ́ẹ̀ lọ)                                    |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Lo àgbékalẹ̀ ìfaradà `aggressive` / `balanced` / `conservative`                                            |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Ìdánwò tààrà fún gbogbo olùpèsè inú combo nípa lílo ìpè gidi sí upstream                                  |
| `omniroute_get_provider_metrics`   | `read:health`                        | Àwọn òṣùwọ̀n olùpèsè kọ̀ọ̀kan pẹ̀lú ìdádúró p50/p95/p99 àti ipò circuit breaker                               |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Dábàá combo gẹ́gẹ́ bí irú iṣẹ́, pẹ̀lú àwọn ààlà ìṣúná/ìdádúró                                                 |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Ṣàlàyé ìdí tí a fi darí ìbéèrè kan sí olùpèsè kan (àwọn kókó ìṣírò àmì + àwọn ọ̀nà àfirọ́pò)                |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Àwòrán-ẹ̀kúnrẹ́rẹ́ sáà: iye owó, token, àwọn model/olùpèsè àkọ́kọ́, àṣìṣe, olùṣọ́ ìṣúná                         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Ṣàyẹ̀wò (kí o sì túnṣe fúnra rẹ bí ó bá yẹ) yíyapa database bíi combo refs tó bàjẹ́ / àwọn ìlà aláìní-olùní |
| `omniroute_sync_pricing`           | `pricing:write`                      | Mú dátà ìdíyelé bá àwọn orísun ìta mu (LiteLLM); ó ṣe àtìlẹ́yìn `dryRun`                                   |

## Àwọn Irinṣẹ́ Cache (2)

| Irinṣẹ́                  | Àwọn Ààyè Àṣẹ | Àpèjúwe                                                  |
| :---------------------- | :------------ | :------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Àwọn ìṣirò semantic cache, prompt-cache, àti idempotency |
| `omniroute_cache_flush` | `write:cache` | Pa cache rẹ́ káàkiri tàbí nípasẹ̀ signature/model          |

## Àwọn Irinṣẹ́ Ìkójọpọ̀ (13)

| Irinṣẹ́                              | Àwọn Ààyè Àṣẹ       | Àpèjúwe                                                                                                                   |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Àwọn ètò ìkójọpọ̀, àkótán ìtúpalẹ̀, àti àwọn ìṣirò tó mọ̀ nípa cache (pẹ̀lú metadata `analytics.mcpDescriptionCompression`)   |
| `omniroute_compression_configure`   | `write:compression` | Ṣètò mode ìkójọpọ̀, ààlà, ìpín àfojúsùn, pípa system-prompt mọ́, àti títan tàbí pípa ìkójọpọ̀ àpèjúwe MCP                    |
| `omniroute_set_compression_engine`  | `write:compression` | Yan engine tó ń ṣiṣẹ́ (off/caveman/rtk/stacked) àti bí Caveman/RTK ṣe lágbára tó                                           |
| `omniroute_list_compression_combos` | `read:compression`  | Ṣe àkójọ àwọn combo ìkójọpọ̀ tí a fún ní orúkọ àti àwọn pipeline engine wọn                                                |
| `omniroute_compression_combo_stats` | `read:compression`  | Ìtúpalẹ̀ tí a pín sí ẹ̀ka gẹ́gẹ́ bí combo ìkójọpọ̀ àti engine                                                                  |
| `omniroute_ccr_store`               | `write:compression` | Fi àkóónú tí a yà sọ́tọ̀ fún olùpè sínú ibi ìpamọ́ CCR inú-memory tó ní ààlà, kí o sì dá àmì kan àti reference `ccr://` padà |
| `omniroute_ccr_retrieve`            | `read:compression`  | Gba àkóónú CCR padà ní ẹ̀kúnrẹ́rẹ́ tàbí pẹ̀lú mode head, tail, lines, grep, àti stats                                         |
| `omniroute_ccr_inspect`             | `read:compression`  | Ṣàyẹ̀wò metadata CCR tí olùpè ní láì dá àkóónú padà                                                                        |
| `omniroute_ccr_list`                | `read:compression`  | Ṣe àkójọ metadata ọlọ́jọ́-ojú-ìwé fún àwọn block CCR tí olùpè ní                                                            |
| `omniroute_ccr_delete`              | `write:compression` | Pa block CCR tí olùpè ní rẹ́                                                                                               |
| `omniroute_ccr_stats`               | `read:compression`  | Jábọ̀ lílo memory tó dá lórí olùpè, àwọn counter ìgbésí-ayé, àti àwọn ààlà ibi ìpamọ́                                       |
| `omniroute_rtk_discover`            | `read:compression`  | Ṣàwárí ariwo tó ń tún ara rẹ̀ ṣe nínú àwọn àpẹẹrẹ àbájáde RTK tí a yàn láti kópa                                           |
| `omniroute_rtk_learn`               | `read:compression`  | Ṣẹ̀dá àkọ́kọ́ filter RTK tí a lè ṣàyẹ̀wò láti inú àwọn àpẹẹrẹ tí a yàn láti kópa                                              |

Àwọn àkọsílẹ̀ CCR wà nínú memory nìkan, wọ́n sì máa parẹ́ nígbà tí a bá tún ètò náà bẹ̀rẹ̀. Block kọ̀ọ̀kan ní ààlà 2 MiB, principal kọ̀ọ̀kan
ní ààlà 16 MiB, ibi ìpamọ́ àgbáyé sì ní ààlà 64 MiB. Àwọn àkọsílẹ̀ máa ń lo TTL wákàtí 24 gẹ́gẹ́ bí àtẹ̀jáde (ọjọ́ méje
ni ó pọ̀ jù). Ìgbàpadà MCP ní ẹ̀kúnrẹ́rẹ́ ní ààlà 256 KiB; àwọn block tó tóbi jù ṣì wà nípasẹ̀
àwọn mode ranged àti grep. Ìpamọ́, ìgbàpadà, ṣíṣe àkójọ, àyẹ̀wò, ìparẹ́, àti àwọn stats jẹ́ èyí tí a yà sọ́tọ̀ nípasẹ̀
principal API-key tí a ti fi ìdánimọ̀ rẹ̀ múlẹ̀. Àwọn àkọsílẹ̀ audit ní hashes àti metadata ìwọ̀n nínú, kì í ṣe àkóónú.

`omniroute_compression_status` ń ṣe ìròyìn fúnmọ́ra MCP lọ́tọ̀ọ̀tọ̀ lábẹ́
`analytics.mcpDescriptionCompression`. Àwọn iye wọ̀nyẹn jẹ́ àfojúsùn ìwọ̀n metadata fún àwọn àpèjúwe MCP tí a lè ṣe àtòjọ
(`tools`, `prompts`, `resources`, àti `resourceTemplates`); wọn kì í ṣe ẹ̀rí lílò láti ọ̀dọ̀ olùpèsè,
a sì máa ń fi `source: "mcp_metadata_estimate"` sàmì sí wọn.

### Ajọ Igi Ìráàyèsí MCP (v3.8.0)

Yàtọ̀ sí àwọn irinṣẹ́ fúnmọ́ra tó wà lókè, OmniRoute ní ajọ lẹ́yìn-ìmúṣẹ tí
ó máa ń fún **àwọn èsì irinṣẹ́** ti àwọn irinṣẹ́ aṣàwákiri/ìráàyèsí MCP pọ̀ kí wọ́n tó dá wọn padà sí
aṣojú náà. Ajọ yìí kì í ṣe irinṣẹ́ fúnra rẹ̀ — ó máa ń ṣiṣẹ́ láìfarahàn lórí èsì irinṣẹ́ èyíkéyìí tó ní
ọ̀rọ̀ igi ìráàyèsí tàbí àwòrán-ìṣẹ́jú aṣàwákiri tó gùn jù (≥2000 àmì-ọ̀rọ̀).

Àwọn ìhùwàsí pàtàkì:

- Ó máa ń ṣókùn àwọn ìlà ará-ọ̀kan tó tún ara wọn ṣe ní ìtẹ̀lé ≥30 sí àkótán ìbẹ̀rẹ̀ + ìparí
- Ó máa ń pa àwọn àmì ìdákọ̀ró `[ref=eXX]` tí Playwright/computer-use nílò mọ́
- Ó máa ń gé ọ̀rọ̀ tó tóbi jù (>50,000 àmì-ọ̀rọ̀) pátápátá, pẹ̀lú ìtọ́kasí fún ìlọ kiri
- Ìfipamọ́ tí a ń retí: **60–80%** lórí ẹrù dátà àwòrán-ìṣẹ́jú aṣàwákiri

Ìṣètò: `compression.mcpAccessibility` nínú àwọn ààtò àgbáyé (migration 056).
Ìmúṣẹ: `open-sse/services/compression/engines/mcpAccessibility/`.
Àwọn àkọsílẹ̀ ẹ̀kúnrẹ́rẹ́: [Àwọn Ẹ́ńjìnnì Fúnmọ́ra — Ajọ Igi Ìráàyèsí MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Wo [Àwọn Ẹ́ńjìnnì Fúnmọ́ra](../compression/COMPRESSION_ENGINES.md) àti [Fúnmọ́ra RTK](../compression/RTK_COMPRESSION.md) fún
àwòṣe fúnmọ́ra àkókò-ṣiṣe tó wà lẹ́yìn àwọn irinṣẹ́ wọ̀nyí.

## Àwọn Irinṣẹ́ 1Proxy (3)

| Irinṣẹ́                      | Àwọn àyè ìwọlé | Àpèjúwe                                                                         |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Gba àwọn proxy ọ̀fẹ́ láti ọjà 1proxy (àwọn àsẹ protocol/orílẹ̀-èdè/dídára/òpin)    |
| `omniroute_oneproxy_rotate` | `read:proxies` | Gba proxy tó wà nílẹ̀ tó tẹ̀lé nípasẹ̀ ọgbọ́n (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Àwọn ìṣirò àkójọpọ̀, ipò ìṣiṣẹ́pọ̀, àti pínpín gẹ́gẹ́ bí protocol àti orílẹ̀-èdè      |

## Àwọn Irinṣẹ́ Ìrántí (3)

A ṣàlàyé wọn nínú `open-sse/mcp-server/tools/memoryTools.ts`. A ń fipá mú ìfàṣẹsí/àyè ìwọlé ṣiṣẹ́ nípasẹ̀ ìlànà àyè ìwọlé MCP tó ṣe déédé.

| Irinṣẹ́                    | Àwọn àyè ìwọlé | Àpèjúwe                                                                                     |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | Ṣàwárí àwọn ìrántí nípasẹ̀ ìbéèrè / irú / kọ́kọ́rọ́ API pẹ̀lú ìmúlò òfin ààlà token              |
| `omniroute_memory_add`    | `write:memory` | Ṣàfikún àkọsílẹ̀ ìrántí tuntun (`factual` / `episodic` / `procedural` / `semantic`)          |
| `omniroute_memory_clear`  | `write:memory` | Pa àwọn ìrántí fún kọ́kọ́rọ́ API kan rẹ́, pẹ̀lú àsẹ àṣàyàn nípasẹ̀ irú tàbí àmì-àkókò `olderThan` |

## Àwọn Irinṣẹ́ Ọgbọ́n (4)

A ṣàlàyé wọn nínú `open-sse/mcp-server/tools/skillTools.ts`. `src/lib/skills/registry` + `src/lib/skills/executor` ló ń ṣe àtìlẹ́yìn fún wọn.

| Irinṣẹ́                        | Àwọn àyè ìwọlé   | Àpèjúwe                                                                                        |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Ṣe àtòjọ àwọn ọgbọ́n tí a forúkọsílẹ̀ pẹ̀lú àsẹ àṣàyàn nípasẹ̀ kọ́kọ́rọ́ API, orúkọ, tàbí ipò ìmúṣiṣẹ́ |
| `omniroute_skills_enable`     | `write:skills`   | Mú ọgbọ́n pàtó kan ṣiṣẹ́ tàbí pa á nípasẹ̀ ID                                                     |
| `omniroute_skills_execute`    | `execute:skills` | Ṣe ọgbọ́n kan pẹ̀lú ìwọlé tí a pèsè, kí o sì dá àkọsílẹ̀ ìṣiṣẹ́ padà                               |
| `omniroute_skills_executions` | `read:skills`    | Ṣe àtòjọ ìtàn àwọn ìṣiṣẹ́ ọgbọ́n láìpẹ́                                                           |

## Orísun Àyíká-ọ̀rọ̀ Notion (6)

A ṣàlàyé wọn nínú `open-sse/mcp-server/tools/notionTools.ts`. A fi token pamọ́ sínú tábìlì `key_value` nípasẹ̀ `src/lib/db/notion.ts`. Oníbàárà REST wà nínú `src/lib/notion/api.ts`. API ètò wà nínú `src/app/api/settings/notion/route.ts`. UI pátákó ìṣàkóso wà nínú `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Ṣètò token ìṣọ̀kan Notion rẹ láti taabu **Àwọn Orísun Àyíká-ọ̀rọ̀** nínú pátákó ìṣàkóso Endpoint, tàbí nípasẹ̀ REST API:

```bash
# Ṣètò token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Ṣàyẹ̀wò ipò
curl http://localhost:20128/api/settings/notion

# Já ìsopọ̀
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Irinṣẹ́                       | Àwọn àyè ìwọlé | Àpèjúwe                                                                          |
| :--------------------------- | :------------- | :------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Ṣàwárí ọ̀rọ̀-kíkún jákèjádò gbogbo ojú-ewé àti ibi ìpamọ́ dátà                      |
| `notion_get_page`            | `read:notion`  | Gba ojú-ewé kan nípasẹ̀ ID pẹ̀lú àwọn ohun-ìní rẹ                                  |
| `notion_list_block_children` | `read:notion`  | Ṣe àtòjọ àwọn block ọmọ inú ojú-ewé tàbí block kan                               |
| `notion_query_database`      | `read:notion`  | Ṣe ìbéèrè sí ibi ìpamọ́ dátà pẹ̀lú àwọn àsẹ, àwọn ìtòlẹ́sẹẹsẹ, àti pípín sí ojú-ewé |
| `notion_get_database`        | `read:notion`  | Gba schema ibi ìpamọ́ dátà nípasẹ̀ ID                                              |
| `notion_append_blocks`       | `write:notion` | Ṣàfikún àwọn block ọmọ sí block òbí kan (ó pọ̀jù 100 fún ìbéèrè kọ̀ọ̀kan)           |

## Àwọn Irinṣẹ́ Àkójọ Ọgbọ́n Aṣojú (3)

A ṣàlàyé wọn nínú `open-sse/mcp-server/tools/agentSkillTools.ts`. `src/lib/agentSkills/catalog` ni ó ń pèsè àtìlẹ́yìn fún wọn. Àwọn irinṣẹ́ wọ̀nyí ń ṣí àkójọ ìwé àkọsílẹ̀ Ọgbọ́n Aṣojú tó ní àkọsílẹ̀ 45 sílẹ̀ fún àwọn oníbárà MCP àti àwọn aṣojú ìta. Ààlà: `read:catalog`.

| Irinṣẹ́                            | Àwọn Ààlà      | Àpèjúwe                                                                                                                                 |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Ṣe àkójọ gbogbo ọgbọ́n aṣojú 45 pẹ̀lú àwọn àsẹ̀ `category` (api\|cli) àti `area` tí kò pọndandan; ó dá metadata + coverage padà            |
| `omniroute_agent_skills_get`      | `read:catalog` | Gba metadata kíkún + àkóónú SKILL.md fún ọgbọ́n kan ṣoṣo nípasẹ̀ `id` àṣẹ                                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | Àwọn ìṣirò coverage: mélòó nínú ọgbọ́n API 23, CLI 21 àti config 1 ni àwọn fáìlì SKILL.md lórí ètò fáìlì ní ìfiwéra pẹ̀lú àpapọ̀ inú àkójọ |

Wo [AGENT-SKILLS.md](./AGENT-SKILLS.md) fún àkójọ kíkún àti bí àwọn aṣojú ìta ṣe ń lò ó.

## Àwọn Framework Tó Jẹmọ́ (v3.8.0)

Àkójọ irinṣẹ́ MCP tó wà lókè (àwọn irinṣẹ́ aláìlẹ́ẹ̀ke 110, tí `countUniqueMcpTools()` ṣírò) ni a mọ̀ọ́mọ̀
fi ààlà sí àwọn iṣẹ́ routing/cache/compression/memory/skills/proxy/context-source ní àkókò ìṣiṣẹ́. Àwọn
framework méjì tó sún mọ́ ọn wà pẹ̀lú olupin MCP nínú v3.8.0, a sì ṣe àkọsílẹ̀ wọn lọ́tọ̀ọ̀tọ̀:

### Àwọn Aṣojú Cloud

Àwọn Aṣojú Cloud jẹ́ àwọn aṣojú AI fún kíkọ kóòdù tí ń ṣiṣẹ́ níta process (codex-cloud, cursor-cloud, devin, jules), tí a so mọ́
OmniRoute nípasẹ̀ àwòṣe ìsopọ̀ kan náà tí a ń lò fún àwọn olùpèsè LLM. A ṣí wọn sílẹ̀ nípasẹ̀
REST surface tiwọn (`/api/v1/agents/*`), wọn kò sì jẹ́ apá kan nínú àkójọ irinṣẹ́ MCP
— pípè Aṣojú Cloud kan kì í lo ààlà MCP kan.

- Ìmúṣẹ: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Ìgbésí-ayé: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Ìwé àkọsílẹ̀: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Àwọn Guardrail

Àwọn Guardrail jẹ́ àsẹ̀ ṣáájú/lẹ́yìn ìmúṣẹ (vision-bridge, pii-masker, prompt-injection)
tí a fi sí inú pipeline ìbánisọ̀rọ̀. Wọn ń ṣiṣẹ́ kí a tó dé ipele irinṣẹ́/route MCP,
wọ́n sì ń fi àwọn ìrúfin tó ní ìṣètò ránṣẹ́ sí pipeline àyẹ̀wò; a kì í pè wọ́n gẹ́gẹ́ bí irinṣẹ́ MCP.

- Ìmúṣẹ: `src/lib/guardrails/`.
- Ìwé àkọsílẹ̀: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Nígbà tí o bá ń ṣàwárí àṣìṣe ìpè MCP kan tó dà bí ẹni pé a dínà rẹ̀, yẹ àkọsílẹ̀ àyẹ̀wò MCP méjèèjì wò
(àwọn àkọsílẹ̀ `scope_denied:*`) àti ipa ọ̀nà àyẹ̀wò guardrail — guardrail kan lè kọ ìbéèrè kan
**kí** ó tó dé ipele ìfipá-mú ààlà MCP rárá.

---

## Àwọn Endpoint REST API

| Endpoint               | Ọ̀nà                   | Àpèjúwe                                                                                               | Ìfàṣẹsí                 |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------- | :---------------------- |
| `/api/mcp/status`      | `GET`                 | Ipò olupin: heartbeat, ipò HTTP transport, àkótán iṣẹ́ àyẹ̀wò                                           | Ìṣàkóso (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Àkójọ irinṣẹ́ (orúkọ, àpèjúwe, àwọn ààlà, ipele, àwọn endpoint orísun)                                 | Ìṣàkóso                 |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint SSE transport (tí `mcpEnabled` + `mcpTransport === "sse"` ń ṣàkóso)                          | Kọ́kọ́rọ́ API + àwọn ààlà  |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamable HTTP transport (ń lo header `mcp-session-id`; `DELETE` ń parí session)                     | Kọ́kọ́rọ́ API + àwọn ààlà  |
| `/api/mcp/audit`       | `GET`                 | Àwọn àkọsílẹ̀ audit láti `mcp_tool_audit` (àwọn àsẹ̀: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Ìṣàkóso                 |
| `/api/mcp/audit/stats` | `GET`                 | Àwọn ìṣirò audit àpapọ̀ (`totalCalls`, `successRate`, `avgDurationMs`, àwọn irinṣẹ́ tó ga jù)           | Ìṣàkóso                 |

Àwọn fáìlì orísun: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

A dènà àwọn transport SSE àti Streamable HTTP méjèèjì títí a ó fi mú olupin MCP ṣiṣẹ́ nínú Àwọn Ètò (`mcpEnabled`) tí a sì yan `mcpTransport` tó yẹ. Bí transport tí a ṣètò kò bá tọ́, route náà yóò dá HTTP 400 padà pẹ̀lú ìtọ́kasí láti yí àwọn ètò padà.

---

## Ìfàṣẹsí & Àwọn Ààyè

Àwọn ìpè irinṣẹ́ MCP máa ń ka àwọn ọ̀rọ̀ ààyè láti ọ̀dọ̀ olùpè. Àyẹ̀wò yẹn jẹ́ ọ̀kan nínú àwọn namespace mẹ́ta
tí kò gbára lé ara wọn. Ìfọwọ́sí láti ọ̀dọ̀ olùṣàyẹ̀wò kan kì í ṣe ìfọwọ́sí láti ọ̀dọ̀ àwọn yòókù.
Àwọn òfin náà wà ní [Àwọn namespace ààyè mẹ́ta](#three-scope-namespaces).
Àkójọ irinṣẹ́ náà wà ní [Àwọn ààyè irinṣẹ́ MCP](#mcp-tool-scopes).

### Àwọn namespace ààyè mẹ́ta

`manage` lórí kọ́kọ́rọ́ API kan, `read:compression` lórí irinṣẹ́ MCP kan, àti `read` lórí
tóókìnnì ìráyè `oma_live_…` jẹ́ ìyọ̀ǹda mẹ́ta ọ̀tọ̀ọ̀tọ̀. Àwọn olùpè tí ó fi tóókìnnì ìráyè
`read` ránṣẹ́ sí route ìṣàkóso tí ń ṣe àtúnṣe máa gba HTTP 403
`Access token scope 'read' is insufficient; 'write' required.`
Ipò ìpele yẹn ni `scopeSatisfies`. Kò ṣàyẹ̀wò tábìlì MCP, bẹ́ẹ̀ sì ni matcher MCP
kò ṣàyẹ̀wò rẹ̀.

| Namespace            | Ẹ̀rí ìdánimọ̀                                                            | Olùṣàyẹ̀wò                   | Ohun tí ìfọwọ́sí ń gbà láàyè                        |
| :------------------- | :--------------------------------------------------------------------- | :-------------------------- | :------------------------------------------------- |
| Ìṣàkóso kọ́kọ́rọ́ API   | `api_keys.scopes`                                                      | `hasManageScope`            | REST ìṣàkóso fún kọ́kọ́rọ́ Bearer yẹn                 |
| Àfikún kọ́kọ́rọ́ API    | array kan náà, ọ̀rọ̀ kan pàtó                                            | helper tí a dárúkọ ní ìsàlẹ̀ | Agbára kan ṣoṣo yẹn                                |
| Àwọn ààyè irinṣẹ́ MCP | array kan náà, bí bẹ́ẹ̀ kọ́ MCP `_meta`, bí bẹ́ẹ̀ kọ́ `OMNIROUTE_MCP_SCOPES` | `scopeMatches`              | Irinṣẹ́ yẹn, lẹ́yìn tí a bá tan ìfipámúṣẹ            |
| Tóókìnnì ìráyè       | `oma_live_…`                                                           | `scopeSatisfies`            | Route ìṣàkóso tí method àti path rẹ̀ nílò ìpele yẹn |

Bí a ṣe ń ṣẹ̀dá ẹ̀rí ìdánimọ̀ kọ̀ọ̀kan ni a ṣàlàyé nínú
[Ìfàṣẹsí Ìṣàkóso](../guides/MANAGEMENT-AUTH.md).

#### Àwọn ààyè kọ́kọ́rọ́ API

Array `api_keys.scopes` kan ń ṣe iṣẹ́ méjì. Wọ́n ń lo àwọn function ọ̀tọ̀ọ̀tọ̀.

**REST Ìṣàkóso.** `manage` àti `admin` ni àwọn ọmọ ẹgbẹ́
`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`).
`hasManageScope` ni ohun tí ń fún àwọn route ìṣàkóso láṣẹ fún kọ́kọ́rọ́ yẹn. `admin`
ní agbára ìṣàkóso lórí àwọn route wọ̀nyẹn. Ọ̀rọ̀ `admin` níbí kì í ṣe
ìpele tóókìnnì ìráyè, kò sì fẹ̀ sí àwọn ààyè irinṣẹ́ MCP.

**Àwọn ọ̀rọ̀ àfikún.** Ọ̀kọ̀ọ̀kan jẹ́ àyẹ̀wò jíjẹ́ ọmọ ẹgbẹ́ pàtó, ọ̀kọ̀ọ̀kan wọn sì wà
lẹ́yìn òde `MANAGEMENT_API_KEY_SCOPES`.

| Ààyè                           | Ohun tí ìfọwọ́sí ń gbà láàyè                                                                                                                                                  |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Ìyọkúrò LOCAL_ONLY fún `/api/mcp/` tí kì í ṣe loopback nìkan (`hasMcpConnectOrManageScope`). Kọ́kọ́rọ́ tí ó ní `manage` tàbí `admin` ṣì máa ń kọjá ìyọkúrò yẹn.                 |
| `self:usage`                   | `GET /api/v1/me/status` fún kọ́kọ́rọ́ yìí (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` máa ń fi ààyè yìí kún un nígbà ìṣẹ̀dá (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Àwọn quota account upstream nínú payload ipò yẹn (`src/lib/usage/apiKeySelfService.ts`). Route ipò náà ṣì nílò `self:usage`.                                                 |
| `policy:bypass-provider-quota` | Àwọn ìpè inference kọ́kọ́rọ́ yìí máa foju kọ policy quota provider (`hasProviderQuotaBypassScope` nínú `src/sse/handlers/chat.ts`).                                             |

#### Ìbámu

Àkójọ náà ni tábìlì tó wà lábẹ́ [Àwọn ààyè irinṣẹ́ MCP](#mcp-tool-scopes). Má ṣe
ka `MCP_SCOPE_LIST` nínú `src/shared/constants/mcpScopes.ts` sí àkójọ yẹn:
ó jẹ́ subset atilẹba tí a ti fún ní type. Àwọn irinṣẹ́ tí a fi kún un lẹ́yìn náà kéde àwọn ààyè míì lẹ́gbẹ̀ẹ́ rẹ̀
(`read:notion`, `read:skills`, `read:local-corpus`, àti ìyókù tábìlì náà).

`evaluateToolScopes` nínú `open-sse/mcp-server/scopeEnforcement.ts` máa ń gba ìpè kan
láàyè nígbà tí gbogbo ààyè tí a nílò bá bá ààyè kan tí a ti yọ̀ǹda mu:

- `*` bá gbogbo ààyè tí a nílò mu.
- Ààyè tí a yọ̀ǹda tí ó parí sí `*` bá ààyè tí a nílò tí ó bẹ̀rẹ̀ pẹ̀lú
  prefix tó wà ṣáájú àmì ìràwọ̀ mu. `read:*` bá `read:compression` mu.
- Gbogbo ààyè mìíràn tí a yọ̀ǹda bá ọ̀rọ̀ ààyè tó jẹ́ ọ̀kan náà gangan nìkan mu.

Kọ́kọ́rọ́ tí àwọn ààyè rẹ̀ jẹ́ `["manage"]` kò kọjá `scopeMatches` fún `read:compression`.
Ìpè kan náà kò ní kọjá fún `admin`, `mcp:connect`, `read`, àti `write` nígbà tí àwọn wọ̀nyẹn
bá jẹ́ àwọn ọ̀rọ̀ kan ṣoṣo tí a yọ̀ǹda. Kò sí hierarchy láàárín àwọn ààyè irinṣẹ́ MCP
yàtọ̀ sí `*` tó wà ní ìparí.

Ìfipámúṣẹ kò ṣiṣẹ́ àfi tí `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (default
`false`). Nígbà tí kò ṣiṣẹ́, `evaluateToolScopes` máa gba ìpè náà láàyè, yóò sì foju kọ
àkójọ náà. Nígbà tí ó ṣiṣẹ́, HTTP máa ń lo `api_keys.scopes` ti kọ́kọ́rọ́ Bearer gẹ́gẹ́ bí
`authInfo` (wo [Ìsopọ̀ ààyè HTTP fún kọ́kọ́rọ́ kọ̀ọ̀kan](#per-key-http-scope-binding-7895)).
Nígbà tí kò bá sí ààyè kọ́kọ́rọ́ tí a lè pinnu, àkójọpọ̀ àwọn ààyè tí a yọ̀ǹda máa tẹ̀ síwájú sí MCP `_meta`, lẹ́yìn náà
`OMNIROUTE_MCP_SCOPES`.

#### Àwọn ààyè tóókìnnì ìráyè

Àwọn tóókìnnì `oma_live_…` (`src/lib/accessTokens/scopes.ts`) máa ń gbé `read`, `write`,
tàbí `admin`. `scopeSatisfies` jẹ́ ìpele: `admin` bo `write` àti `read`, àti pé
`write` bo `read`. Àwọn ààyè tí a kò mọ̀ kò bo ohunkóhun.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) ń fi ìpele yẹn wé
`inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD`, àti `OPTIONS` nílò `read`.
- Gbogbo method mìíràn nílò `write`.
- Àwọn path inú `ADMIN_SCOPE_PREFIXES` nílò `admin` fún gbogbo method. `/api/mcp`
  wà nínú àkójọ yẹn, nítorí náà tóókìnnì ìráyè `write` kan kò ṣì lè pe surface HTTP MCP.
- Àwọn path inú `ADMIN_MUTATION_PREFIXES` nílò `admin` fún àwọn ìyípadà nìkan.

`PATCH /api/keys/{id}` jẹ́ ìyípadà, kò sì sí nínú àwọn àtòjọ alákóso wọ̀nyẹn, nítorí náà àmì ìwọlé `read` kan máa gba 403
`Access token scope 'read' is insufficient; 'write' required.`
Àmì ìwọlé `write` tàbí `admin` máa ń tẹ́ ìbéèrè ipa-ọ̀nà yẹn lọ́rùn. JWT dasibodu kan, àmì machine-id CLI loopback, àti kọ́kọ́rọ́ API kan pẹ̀lú `manage` tàbí `admin` máa ń gba àwọn ẹ̀ka míì, ipò yìí kò sì dín wọn mọ́.

Àmì ìwọlé kan tí ó kọjá `scopeSatisfies` fún `/api/mcp` ti kọjá ẹnu-ọ̀nà ìṣàkóso nìkan. Àwọn ìpè irinṣẹ́ ṣì máa ń ṣiṣẹ́ `scopeMatches` lòdì sí àwọn àyè kọ́kọ́rọ́ API. Ipò àmì ìwọlé kì í ṣe àfikún sí `scopeMatches`.

### Àwọn àyè irinṣẹ́ MCP

Ìfipámú àyè wà ní àárín gbùngbùn nínú `open-sse/mcp-server/scopeEnforcement.ts`.
Irinṣẹ́ kọ̀ọ̀kan nílò àwọn àyè pàtó:

| Àyè                   | Àwọn irinṣẹ́                                                                                                                                                                        |
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
| `read:obsidian`       | Àwọn irinṣẹ́ kíkà 13 — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | Àwọn irinṣẹ́ kíkọ 9 — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                  |

Àwọn ààlà wildcard wà ní àtìlẹ́yìn: `read:*` ń fúnni ní gbogbo ààlà kíkà, `*` sì ń fúnni ní ààyè ìwọlé kíkún.

### `mcp:connect` — agbára ipa-ọ̀nà tó ní ààlà kékeré (#7895)

Láti dé ibi ìgbéka HTTP/SSE MCP (`/api/mcp/*`) láti ibi tí kì í ṣe loopback, a nílò
ìmúkúrò `LOCAL_ONLY` fún `/api/mcp/` (wo `docs/security/ROUTE_GUARD_TIERS.md`). Ní ìtàn ṣáájú,
ìmúkúrò yẹn gba kọ́kọ́rọ́ API tó ní ààlà `manage`/`admin` kíkún nìkan — èyí gbòòrò jù fún
olùpè kan tó nílò láti bá MCP sọ̀rọ̀ nìkan. `src/shared/constants/managementScopes.ts` ti ń
ṣe àgbéjáde `MCP_CONNECT_SCOPE = "mcp:connect"` báyìí: ààlà àfikún tó ní ààlà kékeré (tó tẹ̀lé àpẹẹrẹ kan náà bí
`SELF_USAGE_SCOPE`) tí ó fúnni láṣẹ fún ìrékọjá `/api/mcp/` NÌKAN nínú
`src/server/authz/policies/management.ts` — kò fúnni ní ààyè ìwọlé sí ipa-ọ̀nà ìṣàkóso mìíràn
kankan, a sì mọ̀ọ́mọ̀ pa á mọ́ SÍTA `MANAGEMENT_API_KEY_SCOPES`. Kọ́kọ́rọ́ tó ní `manage`/`admin`
ṣì ń kọjá ìmúkúrò náà láìsí àyípadà; `mcp:connect` jẹ́ àṣàyàn tó ní àṣẹ kékeré fún
àwọn olùpè MCP-nìkan láti ọ̀nà jíjìn, tí a ń ṣàyẹ̀wò nípasẹ̀ `hasMcpConnectOrManageScope()`.

### Ìsopọ̀ ààlà HTTP fún kọ́kọ́rọ́ kọ̀ọ̀kan (#7895)

Lórí HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` ń wá ojúlówó
`api_keys.scopes` olùpè báyìí nípasẹ̀ `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
ó sì ń fi í ránṣẹ́ sí `transport.handleRequest(req, { authInfo })` ti MCP SDK, kí
`extra.authInfo.scopes` tó dé ọ̀dọ̀ ìpè irinṣẹ́ kọ̀ọ̀kan lè ṣàfihàn àwọn ààlà ti kọ́kọ́rọ́ Bearer náà fúnra rẹ̀.
`resolveCallerScopeContext()` inú `scopeEnforcement.ts` ti ń fi `authInfo` sí ipò àkọ́kọ́ ju
`_meta` àti àṣàyàn ìpadà env `OMNIROUTE_MCP_SCOPES` lọ tẹ́lẹ̀ — èyí kàn ń pèsè ìsọfúnni fún orísun àkọ́kọ́ yẹn,
tó ní ipò ààyò tó ga jù, èyí tí kò gba ìsọfúnni rí lórí HTTP. Nígbà tí kò sí kọ́kọ́rọ́ API tó bá mu
(kò sí àkọlé, kọ́kọ́rọ́ kò fẹsẹ̀ múlẹ̀), `authInfo` máa dúró gẹ́gẹ́ bí `undefined`, ìwádìí yóò sì tẹ̀ síwájú lọ sí
ẹ̀wọ̀n `meta`/env tó ti wà tẹ́lẹ̀ láìsí àyípadà. stdio kò ní ìdánimọ̀ fún olùpè kọ̀ọ̀kan (wo
`mcpCallerIdentity.ts`), kò sì kan án — ó máa dúró lórí ẹ̀wọ̀n àṣàyàn ìpadà `_meta`/env.

**A máa fipá mú ìmúṣẹ ṣiṣẹ́ fún àwọn olùpè HTTP/SSE tó ní ààlà kékeré láìka
`OMNIROUTE_MCP_ENFORCE_SCOPES` sí.** Bí `OMNIROUTE_MCP_ENFORCE_SCOPES` ṣe ń lo `false` gẹ́gẹ́ bí àiyípadà jẹ́
àìléwu fún ìṣàn olùdarí-ẹyọkan local/stdio nìkan, níbi tí kò ti sí ìdánimọ̀ fún olùpè kọ̀ọ̀kan láti fi
ààlà lé lórí. `open-sse/mcp-server/server.ts::withScopeEnforcement()` máa ń tan ìmúṣẹ ààlà
fún irinṣẹ́ kọ̀ọ̀kan láìní àṣàyàn (`shouldForceScopeEnforcement()` nínú `scopeEnforcement.ts`)
ní gbogbo ìgbà tí `resolveCallerScopeContext()` bá yanjú
`source === "authInfo"` (ìyẹn ni, àkọlé HTTP Authorization ojúlówó fún kọ́kọ́rọ́ kọ̀ọ̀kan, fún HTTP/SSE nìkan) TÍ
kọ́kọ́rọ́ náà kò sì ní ààlà `manage`/`admin` kíkún. Èyí dí àlàfo tó lè jẹ́ kí kọ́kọ́rọ́ tó ní
ààlà ìrékọjá tóóró `mcp:connect` NÌKAN — tí a ṣàkọsílẹ̀ rẹ̀ lókè gẹ́gẹ́ bí ohun tó fúnni láṣẹ fún
ìmúkúrò `LOCAL_ONLY` ti `/api/mcp/` nìkan — lè pe gbogbo irinṣẹ́ MCP bí olùdarí kan bá ti
mú ààyè ìwọlé MCP jíjìn/tí kì í ṣe loopback ṣiṣẹ́, nítorí pé `OMNIROUTE_MCP_ENFORCE_SCOPES` ń wá pẹ̀lú
`false` gẹ́gẹ́ bí àiyípadà. Kọ́kọ́rọ́ `manage`/`admin` kíkún lórí HTTP, àti gbogbo olùpè stdio/local, ṣì pa
ìhùwàsí tó ti wà tẹ́lẹ̀, tí `OMNIROUTE_MCP_ENFORCE_SCOPES` ń ṣàkóso, mọ́ láìsí àyípadà.

---

## Àwọn Àyípadà Àyíká

| Àyípadà                                 | Àiyípadà                                 | Ète                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :-------------------------------------- | :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                 | URL ìpìlẹ̀ tí olupin MCP ń lò nígbà tí ó bá ń pe àwọn API abẹ́nú OmniRoute                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `OMNIROUTE_API_KEY`                     | (òfo)                                    | Kọ́kọ́rọ́ API tí a ń fi ránṣẹ́ sí àwọn ìpè API abẹ́nú gẹ́gẹ́ bí `Authorization: Bearer`                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` nìkan ló ń mú un ṣiṣẹ́) | Nígbà tí a bá mú un ṣiṣẹ́, àìsí àwọn scope yóò kọ àwọn ìpè irinṣẹ́, yóò sì kọ `scope_denied:<reason>` sínú àkọsílẹ̀ àyẹ̀wò. A tún máa fipá mú ìmúlò yìí ṣiṣẹ́ láìka àmì yìí sí fún olùpè HTTP/SSE èyíkéyìí tí a dá mọ̀ láti inú àkọlé Authorization fún kọ́kọ́rọ́ kọ̀ọ̀kan (`source === "authInfo"`) tí kò ní scope `manage`/`admin` kíkún — fún àpẹẹrẹ, kọ́kọ́rọ́ kan tí ó ní scope ìkọjá `mcp:connect` tóóró nìkan — nítorí náà, àiyípadà yìí kò léwu fún ìṣàn olùṣàkóso kan ṣoṣo ti agbègbè/stdio nìkan, kì í ṣe fún ìráàyèsí jíjìnnà tí kì í ṣe loopback láé |
| `OMNIROUTE_MCP_SCOPES`                  | (òfo)                                    | Àtòjọ àwọn scope tí a yà pẹ̀lú àmì kọ́má, tí a kà sí “tó wà” nípa àiyípadà (a máa ń lò ó nígbà tí olùpè kò bá pèsè àwọn scope tirẹ̀)                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (a kò ṣètò = ó ṣiṣẹ́)                     | Nígbà tí a bá ṣètò rẹ̀ sí `0/false/off/no`, ó máa dá fífúnpọ̀ àpèjúwe MCP dúró ní àkókò ìforúkọsílẹ̀                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (a kò ṣètò = ó ṣiṣẹ́)                     | Orúkọ àfidípò fún bọ́tìnì kan náà bí èyí tó wà lókè                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                  | Ìwọ̀n àkókò fífiṣẹ́ dúró fún àwọn ìkà ìṣàkóso abẹ́nú (ìlera, ìfaradà, àwọn àkójọpọ̀, ìpín, ìlò)                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                  | Ìwọ̀n àkókò fífiṣẹ́ dúró fún àwọn ìgbésẹ̀ tí ń dúró de olùpèsè kan (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `MCP_TOOL_DENY`                         | (a kò ṣètò = kò sí àlẹ́mọ́)                | Àwọn orúkọ irinṣẹ́ tí a yà pẹ̀lú àmì kọ́má láti yọ kúrò nínú `tools/list` (dídín iye àwọn irinṣẹ́ kù — wo ìsàlẹ̀)                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `MCP_TOOL_ALLOW`                        | (kò ṣètò = kò sí àlẹ́mọ́)                  | Àwọn orúkọ irinṣẹ́ tí a fi àmì kọ́má yà sọ́tọ̀ láti pa mọ́ ní àdáṣe (ipò àkójọ-ìyọ̀ǹda — wo ìsàlẹ̀)                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `DATA_DIR`                              | `~/.omniroute`                           | A kọ fáìlì heartbeat sí `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

---

## Ìkópọ̀ Àpèjúwe

Àwọn ibi ìforúkọsílẹ̀ irinṣẹ́, ìtọ́ni, àti ohun àmúlò MCP lè kó àwọn àpèjúwe pọ̀ ní àsìkò ìforúkọsílẹ̀/àkójọ láti dín iye metadata tí a fi hàn àwọn oníbàárà kù (àti nítorí náà, láti dín iye àyíká ìtọ́ni kù). Ìmúṣẹ náà wà nínú `open-sse/mcp-server/descriptionCompressor.ts`, a sì so ó mọ́ olupin MCP nípasẹ̀ `compressMcpRegistryMetadata` nínú `createMcpServer()`.

- Ìkópọ̀ máa ń ṣiṣẹ́ lórí ọ̀rọ̀ àpèjúwe ní lílo ètò òfin Caveman (`getRulesForContext("all", "full")`) pẹ̀lú yíyọ àwọn abala tí a dáàbò bo jáde (àwọn àlàfo kóòdù, àwọn búlọ́ọ̀kù tí a fi ààlà sí, àti bẹ́ẹ̀ bẹ́ẹ̀ lọ) kí àkóónú ìgbékalẹ̀ má bàa yí padà.
- Ṣàkóso rẹ̀ fún ìmúṣiṣẹ́ kọ̀ọ̀kan nípasẹ̀ iye `compression.mcpDescriptionCompressionEnabled` nínú tábìlì ètò `key_value` (àìyípadà: ó ṣiṣẹ́) — a fi hàn nínú UI gẹ́gẹ́ bí **Ìtúpalẹ̀ → Ìkópọ̀ àpèjúwe MCP**.
- Ṣàkóso rẹ̀ káàkiri gbogbo ìlànà nípasẹ̀ bóyá `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` tàbí `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- A fi àwọn ìṣirò àsìkò-gidi hàn nípasẹ̀ `omniroute_compression_status` lábẹ́ `analytics.mcpDescriptionCompression`, a sì fi àmì `source: "mcp_metadata_estimate"` sí wọn láti yà wọ́n sọ́tọ̀ kúrò nínú àwọn ẹ̀rí lílò olupèsè gidi.

---

## Ìdínkù Iye Àwọn Irinṣẹ́ (F4.3)

Ìkópọ̀ àpèjúwe máa ń dín metadata irinṣẹ́ kọ̀ọ̀kan kù; **ìdínkù iye àwọn irinṣẹ́** lọ síwájú sí i nípa dídín _iye_ àwọn irinṣẹ́ tí a kéde rárá kù. Kíkéde àwọn irinṣẹ́ díẹ̀ nínú manifest `tools/list` máa ń dín iye token fún ìbéèrè kọ̀ọ̀kan tí model oníbàárà ń ná lórí katalogi irinṣẹ́ kù (ìkópọ̀ “layer 5”). Ìmúṣẹ náà jẹ́ àsẹ̀ aláìní-state pátápátá nínú `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), tí a so mọ́ lúpù ìforúkọsílẹ̀ nínú `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**A gbọ́dọ̀ yàn án kí ó tó ṣiṣẹ́, ó sì wà ní pípa ní àkọ́kọ́.** Àsẹ̀ náà máa ń ṣiṣẹ́ nìkan nígbà tí ó kéré tán ọ̀kan lára àwọn environment variable méjì bá ti jẹ́ ṣíṣètò; tí a kò bá ṣètò èyíkéyìí, gbogbo irinṣẹ́ 110 ni a ó kéde láìsí ìyípadà.

| Variable         | Ìpo                                                                                                             |
| :--------------- | :-------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Àtòjọ-ìdènà — àwọn orúkọ irinṣẹ́ tí a fi àmì-comma yà, tí a máa ń yọ kúrò nínú `tools/list` ní gbogbo ìgbà       |
| `MCP_TOOL_ALLOW` | Àtòjọ-ìfàyègbà — àwọn orúkọ irinṣẹ́ tí a fi àmì-comma yà; àwọn wọ̀nyí nìkan ni yóò kù, gbogbo èyí tó kù ni a ó yọ |

`deny` ní ipò àkọ́kọ́ ju `allow` lọ. A fi àmì-comma ya àwọn orúkọ, a gé ààyè àfikún wọn kúrò, a sì kọbi ara sí àwọn àkọsílẹ̀ òfo. Àwọn àpẹẹrẹ:

```bash
# Yọ irinṣẹ́ méjì kúrò nínú katalogi
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Kéde àwọn irinṣẹ́ ìdarí-ọ̀nà àti quota nìkan (ìpo àtòjọ-ìfàyègbà)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Bí a ṣe ń yọ àwọn irinṣẹ́ tí a ti ṣe àsẹ̀ sí kúrò:** ìforúkọsílẹ̀ máa ń ṣàṣeyọrí ní gbogbo ìgbà; lẹ́yìn náà, irinṣẹ́ tí profile kọ̀ ni a máa ń `.disable()` lórí handle MCP SDK, nítorí náà kò ní farahàn nínú `tools/list`, ṣùgbọ́n àsopọ̀ rẹ̀ á dúró ṣinṣin (mímú ṣiṣẹ́/pípa tó mọ́, kò sí àtúnforúkọsílẹ̀). Parser profile náà ni `readMcpToolProfileFromEnv(process.env)`, èyí tí ó máa ń dá `null` padà (kò sí àsẹ̀) nígbà tí variable méjèèjì bá ṣófo.

Ìrísí `ToolProfile` tó kúnrẹ́rẹ́ sí i lẹ́yìn `reduceToolManifest` tún ṣe àtìlẹ́yìn fún àsẹ̀ ìkóríta scope (`allowScopes`, pẹ̀lú ìbámu wildcard irú `read:*`) àti ààlà `maxTools` tó máa ń fúnni ní àbájáde kan náà ní gbogbo ìgbà, ṣùgbọ́n àwọn ìṣàkóso méjèèjì yìí nílò manifest kíkún ní àkókò ìforúkọsílẹ̀, a kò sì tíì mú wọn jáde nípasẹ̀ àwọn environment variable lónìí (hook ní ipele `tools/list` jẹ́ iṣẹ́ ìtẹ̀lé tí a ń tọpinpin). `estimateManifestTokens()` wà fún fífi iye token manifest ṣáájú àti lẹ́yìn ìdínkù wéra.

---

## Ìlù-ọkàn Runtime

Transport stdio máa ń tọ́jú àmì pé ó ṣì wà láàyè sínú `${DATA_DIR}/runtime/mcp-heartbeat.json` ní gbogbo ìṣẹ́jú-àáyá 5. Dashboard (`/api/mcp/status`) máa ń ka fáìlì yìí pẹ̀lú àyẹ̀wò bóyá PID ṣì wà láàyè láti pinnu `online`. Àwọn transport HTTP máa ń fi state láti inú `getMcpHttpStatus()` tó ń ṣiṣẹ́ nínú process náà hàn dípò rẹ̀ (kò kọ fáìlì).

Snapshot ìlù-ọkàn náà ní:

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

## Ìkọ Àkọsílẹ̀ Àyẹ̀wò

Gbogbo ìpè irinṣẹ́ ni a máa ń kọ sínú tábìlì SQLite `mcp_tool_audit` nípasẹ̀ `open-sse/mcp-server/audit.ts`:

- Orúkọ irinṣẹ́, àwọn argument (tí a ṣe hash/gé kúrú gẹ́gẹ́ bí `auditLevel` irinṣẹ́ kọ̀ọ̀kan), àbájáde
- Iye àkókò ní ms, àmì àṣeyọrí/ìkùnà, ìfiránṣẹ́ àṣìṣe (nígbà tó bá yẹ)
- Hash kọ́kọ́rọ́ API, timestamp
- A máa ń kọ àwọn ìkọ̀sílẹ̀ scope sílẹ̀ gẹ́gẹ́ bí `scope_denied:<reason>` pẹ̀lú àtòjọ àwọn scope tí kò sí

Lo dashboard tàbí àwọn endpoint REST `/api/mcp/audit` àti `/api/mcp/audit/stats` láti ṣàyẹ̀wò àwọn ìpè àìpẹ́.

---

## Àwọn Fáìlì

| Fáìlì                                                                    | Ète                                                                     |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Ilé-iṣẹ́ olupin MCP, ibi ìbẹ̀rẹ̀ stdio, àwọn ìforúkọsílẹ̀ irinṣẹ́ tó ní ààlà |
| `open-sse/mcp-server/httpTransport.ts`                                   | Ìgbéjàde SSE + Streamable HTTP (ìṣàkóso session)                        |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Ìṣírò ààlà irinṣẹ́ àti ìyanjú olùpè                                      |
| `open-sse/mcp-server/audit.ts`                                           | Ìforúkọsílẹ̀ àyẹ̀wò ìpè irinṣẹ́ (`mcp_tool_audit`)                         |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Olùkọ heartbeat stdio (`mcp-heartbeat.json`)                            |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Ìfúnpọ̀ àpèjúwe fún àwọn ibi ìforúkọsílẹ̀ irinṣẹ́ / prompt / resource      |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Àwọn schema Zod + ibi ìforúkọsílẹ̀ irinṣẹ́ (`MCP_TOOLS`, àwọn àkọọlẹ̀ 45)  |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Phase 2 + cache + àwọn olùṣàkóso irinṣẹ́ 1proxy                          |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Àwọn olùṣàkóso irinṣẹ́ ìfúnpọ̀                                            |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Àwọn ìtumọ̀ irinṣẹ́ ìrántí (irinṣẹ́ 3)                                     |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Àwọn ìtumọ̀ irinṣẹ́ ọgbọ́n (irinṣẹ́ 4)                                      |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Àwọn ìtumọ̀ irinṣẹ́ orísun àyíká-ọ̀rọ̀ Notion (irinṣẹ́ 6)                    |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Àwọn ìtumọ̀ irinṣẹ́ ìsọdi-nǹkan-sí-eré (irinṣẹ́ 8)                         |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Ìforúkọsílẹ̀ plugin àti àwọn irinṣẹ́ ìṣàkóso (irinṣẹ́ 8)                   |
| `src/app/api/mcp/status/route.ts`                                        | Endpoint `/api/mcp/status`                                              |
| `src/app/api/mcp/tools/route.ts`                                         | Endpoint `/api/mcp/tools`                                               |
| `src/app/api/mcp/sse/route.ts`                                           | Ọ̀nà ìgbéjàde SSE `/api/mcp/sse`                                         |
| `src/app/api/mcp/stream/route.ts`                                        | Ọ̀nà ìgbéjàde Streamable HTTP `/api/mcp/stream`                          |
| `src/app/api/mcp/audit/route.ts`                                         | Ìbéèrè àkọsílẹ̀ àyẹ̀wò `/api/mcp/audit`                                   |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Àwọn òṣùwọ̀n àyẹ̀wò àkójọpọ̀ `/api/mcp/audit/stats`                        |
| `src/lib/notion/api.ts`                                                  | Oníbàárà Notion REST API (àtúnṣè, àkókò-parí, ìpínsísọ̀rí àṣìṣe)         |
| `src/lib/db/notion.ts`                                                   | Ìtọ́jú token Notion (`key_value` table)                                  |
| `src/app/api/settings/notion/route.ts`                                   | API ètò Notion (GET/POST/DELETE)                                        |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI ìṣàkóso token Notion                                                 |
| `tests/unit/notion-api.test.ts`                                          | Àwọn ìdánwò oníbàárà Notion API (7)                                     |
| `tests/unit/notion-tools.test.ts`                                        | Àwọn ìdánwò ìmúlò ààlà àwọn irinṣẹ́ Notion (10)                          |
| `tests/unit/db/notion.test.mjs`                                          | Àwọn ìdánwò module DB Notion (3)                                        |
