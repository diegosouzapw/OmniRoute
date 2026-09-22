# OmniRoute MCP Server Documentation (Igbo)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Sava Model Context Protocol nwere ngwaọrụ 110 maka ọrụ ntụgharị ụzọ, cache, mkpakọ, ebe nchekwa, nka, proxy, pool, Radar, na isi mmalite context.
>
> Isi iyi nke eziokwu: `open-sse/mcp-server/server.ts` na-eji `countUniqueMcpTools()` gbakọọ **ngwaọrụ pụrụ iche 110**: nkọwa canonical 45 (gụnyere ngwaọrụ isii maka usoro ndụ CCR, ngwaọrụ atọ nke agent-skills, `omniroute_radar_catalog`, na `omniroute_x_search`), tinyere ebe nchekwa (3), nka (4), nka GitHub (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), corpus mpaghara (3), na ngwaọrụ mkpakọ abụọ nke bụ naanị maka RTK.

## Nwụnye

E tinyere OmniRoute MCP n’ime ya. Jiri nke a malite ya:

```bash
omniroute --mcp
```

Ma ọ bụ site na open-sse transport:

```bash
# HTTP transport nwere ike ibufe data n’usoro iyi (ọdụ ụgbọ mmiri 20130)
omniroute --dev  # MCP na-amalite na-akpaghị aka na /mcp endpoint
```

A na-agbanyụ HTTP transports (`sse` / `streamable-http`, nke dashboard server na-enye n’ime otu usoro ahụ)
na ndabara, ma na mbụ, naanị site na ibe `/dashboard/mcp` ka a pụrụ isi gbanye ma ọ bụ gbanyụọ ha. Malite na v3.8.51,
CLI nwekwara otu ikike ahụ:

```bash
omniroute mcp status                                  # agbanyere/online, transport, ọnụ ọgụgụ tools
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # na-atọgharị sessions sse/streamable-http ndị na-arụ ọrụ
```

`mcp enable`/`mcp disable` na-eji PATCH emelite otu ntọala `mcpEnabled` ahụ (yana `mcpTransport` ma ọ bụrụ na achọrọ)
nke dashboard na-agbanye ma ọ bụ na-agbanyụ site na `/api/settings`. `mcp restart` na-akpọ `POST /api/mcp/restart`: ọ na-emechi
sessions `sse`/`streamable-http` ndị na-arụ ọrụ ka arịrịọ na-esote nwee ike ịmalitegharị ha nke ọma, na-eweghachi
`409` ma ọ bụrụ na agbanyụrụ MCP, yana `501` maka `stdio` transport (ndị ahịa stdio na-achịkwa
subprocess nke ha — ọ dịghị handle dị n’ime usoro ahụ a ga-amalitegharị).

## Ụzọ Mbupu

Sava MCP na-enye ụzọ mbupu atọ, ha niile na-eji otu factory `createMcpServer()`:

| Ụzọ Mbupu         | Ebe                                             | Mgbe a ga-eji ya                                            |
| :---------------- | :---------------------------------------------- | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                 | Njikọ IDE (Claude Desktop, Cursor, wdg.)                    |
| `sse`             | `POST/GET /api/mcp/sse` site na `httpTransport` | Ndị ahịa browser/agent chọrọ event stream                   |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`               | Ndị ahịa HTTP nwere ọtụtụ session (`mcp-session-id` header) |

A na-ahọrọ HTTP transport na-arụ ọrụ (`sse` ma ọ bụ `streamable-http`) site na ntọala `mcpTransport`. Ịgbanwe transport na-emechi session ndị dị adị na transport nke ọzọ.

### Ịnweta site n'ebe dị anya (ịgafe manage-scope)

`/api/mcp/*` dị na ọkwa LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — na ndabara, naanị loopback hosts (`localhost`, `127.0.0.1`, `::1`) nwere ike iru ya. Kemgbe v3.8.2, ndị ahịa na-abụghị loopback nwere ike ijikọ ma ọ bụrụ na ha wetara `Authorization: Bearer <api-key>` nke key ya nwere scope `manage`. Nke a bụ naanị ụzọ e si eru sava MCP dị anya site na tunnel, reverse proxy, ma ọ bụ public hostname.

```bash
# Nye scope manage: mepee peeji API Keys na dashboard wee gbanye
# "Management Access" na key ahụ, ma ọ bụ POST scopes:["manage"] mgbe ị na-emepụta ya.

# Mgbe ahụ, jikọọ site na onye ahịa MCP dị anya:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Key na-enweghị `manage` (ma ọ bụ enweghị Bearer) na-eweghachi `403 LOCAL_ONLY`. E kpachapụrụ anya mee ka prefix ibe ya `/api/cli-tools/runtime/*` ghara inwe ike ịgafe mmachi ahụ — lee [Ọkwa Route Guard — Mwepu maka manage-scope](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Nhazi IDE

Lee [Nhazi MCP Client](../guides/SETUP_GUIDE.md#mcp-client-configuration) maka nhazi Claude Desktop,
Cursor, Cline, na MCP client ndị dakọtara.

---

## Ngwaọrụ Ndị Dị Mkpa (14) — Agba nke 1

| Ngwaọrụ                         | Ikike                 | Nkọwa                                                                                                                             |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Oge ọrụ, ebe nchekwa, circuit breakers, oke ọsọ, ọnụ ọgụgụ cache                                                                  |
| `omniroute_list_combos`         | `read:combos`         | Combo niile ahaziri yana usoro ha (metrics bụ nhọrọ)                                                                              |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metrics arụmọrụ maka otu combo a kapịrị ọnụ                                                                                       |
| `omniroute_switch_combo`        | `write:combos`        | Mee ka combo rụọ ọrụ ma ọ bụ kwụsị ya                                                                                             |
| `omniroute_create_combo`        | `write:combos`        | Mepụta combo a kwadoro site na combo API dị adị                                                                                   |
| `omniroute_check_quota`         | `read:quota`          | Quota e ji mee ihe/ngụkọta, pasent fọdụrụ, oge nrụgharị, ọnọdụ token                                                              |
| `omniroute_route_request`       | `execute:completions` | Zipu mmecha nkata site na ntụgharị ụzọ OmniRoute                                                                                  |
| `omniroute_cost_report`         | `read:usage`          | Akụkọ ọnụ ahịa dịka oge si dị (nnọkọ/ụbọchị/izu/ọnwa)                                                                             |
| `omniroute_list_models_catalog` | `read:models`         | Katalọgụ model zuru ezu nwere ikike, ọnọdụ, na ọnụ ahịa                                                                           |
| `omniroute_radar_catalog`       | `read:radar`          | Katalọgụ Radar mpaghara e binyere aka; nzacha provider/family bụ nhọrọ                                                            |
| `omniroute_tool_search`         | `read:tools`          | Chọpụta ngwaọrụ sitere na katalọgụ MCP edebanyere aha                                                                             |
| `omniroute_web_search`          | `execute:search`      | Chọọ na webụ site na ndị provider ọchụchọ ahaziri. Ọ bụghị X/Twitter.                                                             |
| `omniroute_x_search`            | `execute:search`      | Chọọ na X site na xAI/SuperGrok, ma ọ bụ họrọ `xquik-search` maka nsonaazụ Xquik API. Ọ chọrọ credentials maka backend ahọpụtara. |
| `omniroute_web_fetch`           | `execute:search`      | Weta ọdịnaya webụ site na ndị provider fetch ahaziri                                                                              |

## Ngwaọrụ Ndị Dị Elu (11) — Agba nke 2

| Ngwaọrụ                            | Oke Ikike                            | Nkọwa                                                                                                 |
| :--------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Nnwale ịmegharị nhazi ụzọ na-enweghị mmejuputa ya, tinyere osisi ụzọ ndabere                          |
| `omniroute_set_budget_guard`       | `write:budget`                       | Mmefu ego nnọkọ nwere omume ibelata ọrụ/igbochi/ịdọ aka ná ntị                                        |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Melite atụmatụ combo n'oge ọ na-arụ ọrụ (priority/weighted/auto/etc.)                                 |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Tinye ntọala nnagide `aggressive` / `balanced` / `conservative`                                       |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Nnwale ozugbo nke provider ọ bụla dị na combo site n'iji ezigbo oku upstream                          |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metrik nke provider ọ bụla nwere oge nzaghachi p50/p95/p99 na ọnọdụ circuit breaker                   |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Tụọ aro combo dabere n'ụdị ọrụ, tinyere mmachi mmefu ego/oge nzaghachi                                |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Kọwaa ihe mere e ji ziga arịrịọ na provider (ihe ndị e ji agbakọ akara + ụzọ ndabere)                 |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Nchịkọta nnọkọ zuru ezu: ụgwọ, token, model/provider ndị kachasị, njehie, onye nche mmefu ego         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Chọpụta (ma dozie onwe ya ma achọrọ) ndahie database dịka combo refs gbajiri agbaji / ahịrị ụmụ mgbei |
| `omniroute_sync_pricing`           | `pricing:write`                      | Mekọrịta data ọnụahịa site na isi mmalite mpụga (LiteLLM); na-akwado `dryRun`                         |

## Ngwaọrụ Cache (2)

| Ngwaọrụ                 | Oke Ikike     | Nkọwa                                                     |
| :---------------------- | :------------ | :-------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Ndekọ semantic cache, prompt-cache, na idempotency        |
| `omniroute_cache_flush` | `write:cache` | Hichapụ cache n'ebe niile ma ọ bụ site na signature/model |

## Ngwaọrụ Mkpakọ (13)

| Ngwaọrụ                             | Oke Ikike           | Nkọwa                                                                                                                                 |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Ntọala mkpakọ, nchịkọta nyocha, na ndekọ na-eburu cache n'uche (gụnyere metadata `analytics.mcpDescriptionCompression`)               |
| `omniroute_compression_configure`   | `write:compression` | Hazie ọnọdụ mkpakọ, oke mbido, oke nha ebumnuche, ichekwa system-prompt, na njikwa ịgbanye/ịgbanyụ mkpakọ nkọwa MCP                   |
| `omniroute_set_compression_engine`  | `write:compression` | Họrọ engine na-arụ ọrụ (off/caveman/rtk/stacked) na ogo ike Caveman/RTK                                                               |
| `omniroute_list_compression_combos` | `read:compression`  | Depụta compression combo ndị akpọrọ aha na usoro engine ha                                                                            |
| `omniroute_compression_combo_stats` | `read:compression`  | Nnyocha e kewara dịka compression combo na engine si dị                                                                               |
| `omniroute_ccr_store`               | `write:compression` | Chekwaa ọdịnaya e kewapụrụ maka onye na-akpọ oku n'ime ebe nchekwa CCR nwere oke dị na memory, ma weghachite akara na ntụaka `ccr://` |
| `omniroute_ccr_retrieve`            | `read:compression`  | Weghachite ọdịnaya CCR n'uju ma ọ bụ site na ọnọdụ head, tail, lines, grep, na stats                                                  |
| `omniroute_ccr_inspect`             | `read:compression`  | Nyochaa metadata CCR nke onye na-akpọ oku nwere n'eweghachighị ọdịnaya                                                                |
| `omniroute_ccr_list`                | `read:compression`  | Depụta metadata e kewara na peeji maka ngọngọ CCR nke onye na-akpọ oku nwere                                                          |
| `omniroute_ccr_delete`              | `write:compression` | Hichapụ ngọngọ CCR nke onye na-akpọ oku nwere                                                                                         |
| `omniroute_ccr_stats`               | `read:compression`  | Kọwaa ojiji memory nke onye na-akpọ oku, ọnụọgụ lifecycle, na oke ebe nchekwa                                                         |
| `omniroute_rtk_discover`            | `read:compression`  | Chọpụta mkpọtụ na-eme ugboro ugboro n'ime sample mmepụta RTK ndị e kwere ka e jiri mee ihe                                            |
| `omniroute_rtk_learn`               | `read:compression`  | Mepụta RTK filter draft enwere ike inyocha site na sample ndị e kwere ka e jiri mee ihe                                               |

Ndenye CCR dị naanị na memory ma na-apụ n'anya mgbe a malitegharịrị sistemụ. Oke ngọngọ ọ bụla bụ 2 MiB, oke
principal ọ bụla bụ 16 MiB, ebe oke ebe nchekwa zuru ụwa ọnụ bụ 64 MiB. Ndenye na-eji TTL nke awa 24 na ndabara (nke kachasị
bụ ụbọchị asaa). Nweghachite MCP zuru ezu nwere oke 256 KiB; ngọngọ ndị ka ukwuu ka dị site na
ọnọdụ ranged na grep. Nchekwa, nweghachite, ndepụta, nyocha, nhichapụ, na stats bụ ndị e kewapụrụ dịka
principal API-key e nyochara njirimara ya si dị. Ndekọ audit nwere hash na metadata nha, ọ dịghị mgbe ha na-enwe ọdịnaya.

`omniroute_compression_status` na-akọ mkpakọ nkọwa MCP iche n’okpuru
`analytics.mcpDescriptionCompression`. Uru ndị ahụ bụ atụmatụ nha metadata maka nkọwa MCP ndị enwere ike
idepụta (`tools`, `prompts`, `resources`, na `resourceTemplates`); ha abụghị ndekọ ojiji sitere n’aka onye
na-eweta ọrụ, a na-ejikwa `source: "mcp_metadata_estimate"` kaa ha akara.

### Nzacha Osisi Nnweta MCP (v3.8.0)

N’adabereghị na ngwaọrụ mkpakọ ndị dị n’elu, OmniRoute gụnyere nzacha na-arụ ọrụ mgbe mmezu gasịrị nke
na-akpakọ **nsonaazụ ngwaọrụ** nke ngwaọrụ ihe nchọgharị/nnweta MCP tupu eweghachite ha nye
onye nnọchi anya. Nzacha a abụghị ngwaọrụ n’onwe ya — ọ na-arụ ọrụ n’enweghị onye ọrụ ịhụ ya na nsonaazụ ngwaọrụ ọ bụla nwere
ederede osisi-nnweta ma ọ bụ nseta ihuenyo-ihe nchọgharị buru ibu (≥2000 mkpụrụedemede).

Omume ndị bụ isi:

- Na-achịkọta ahịrị ụmụnne ≥30 na-esochi ibe ha ma na-emegharị ugboro ugboro ka ọ bụrụ nchịkọta isi + ọdụ
- Na-echekwa njikọ-arịlịka `[ref=eXX]` ndị Playwright/computer-use chọrọ
- Na-ebipụ ederede buru oke ibu (>50,000 mkpụrụedemede) n’ụzọ siri ike ma tinye ntụnye maka ngagharị
- Nchekwa a na-atụ anya ya: **60–80%** na data nseta ihuenyo ihe nchọgharị

Nhazi: `compression.mcpAccessibility` n’ime ntọala zuru ụwa ọnụ (mbugharị 056).
Mmejuputa: `open-sse/services/compression/engines/mcpAccessibility/`.
Akwụkwọ nkọwa zuru ezu: [Igwe Mkpakọ — Nzacha Osisi Nnweta MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Lee [Igwe Mkpakọ](../compression/COMPRESSION_ENGINES.md) na [Mkpakọ RTK](../compression/RTK_COMPRESSION.md) maka
usoro mkpakọ oge-ọsọ nke na-akwado ngwaọrụ ndị a.

## Ngwaọrụ 1Proxy (3)

| Ngwaọrụ                     | Scopes         | Nkọwa                                                                            |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Nweta proxies efu site n'ahịa 1proxy (ihe nzacha protocol/country/quality/limit) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Nweta proxy ọzọ dịnụ site na atụmatụ (`random` / `quality` / `sequential`)       |
| `omniroute_oneproxy_stats`  | `read:proxies` | Ndekọ ọnụ ọgụgụ pool, ọnọdụ mmekọrịta, na nkesa dịka protocol na country si dị   |

## Ngwaọrụ Ebe Ncheta (3)

A kọwapụtara ha na `open-sse/mcp-server/tools/memoryTools.ts`. A na-amanye auth/scope site na pipeline scope MCP ọkọlọtọ.

| Ngwaọrụ                   | Scopes         | Nkọwa                                                                                                |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Jiri query / type / API key chọọ ebe ncheta, tinyere mmanye oke token                                |
| `omniroute_memory_add`    | `write:memory` | Tinye ndekọ ebe ncheta ọhụrụ (`factual` / `episodic` / `procedural` / `semantic`)                    |
| `omniroute_memory_clear`  | `write:memory` | Hichapụ ebe ncheta maka API key, ma ọ bụrụ na achọrọ, jiri type ma ọ bụ timestamp `olderThan` zaa ha |

## Ngwaọrụ Nka (4)

A kọwapụtara ha na `open-sse/mcp-server/tools/skillTools.ts`. `src/lib/skills/registry` + `src/lib/skills/executor` na-akwado ha.

| Ngwaọrụ                       | Scopes           | Nkọwa                                                                                                |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Depụta nka ndị e debanyere aha, jiri API key, name, ma ọ bụ ọnọdụ enabled zaa ha ma ọ bụrụ na achọrọ |
| `omniroute_skills_enable`     | `write:skills`   | Mee ka otu nka akọwapụtara site na ID rụọ ọrụ ma ọ bụ kwụsị ọrụ                                      |
| `omniroute_skills_execute`    | `execute:skills` | Jiri input e nyere mee otu nka ma weghachite ndekọ mmezu ya                                          |
| `omniroute_skills_executions` | `read:skills`    | Depụta akụkọ mmezu nka ndị mere n'oge na-adịbeghị anya                                               |

## Isi Iyi Context Notion (6)

A kọwapụtara ha na `open-sse/mcp-server/tools/notionTools.ts`. A na-echekwa token na tebụl `key_value` site na `src/lib/db/notion.ts`. REST client dị na `src/lib/notion/api.ts`. Settings API dị na `src/app/api/settings/notion/route.ts`. Dashboard UI dị na `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Hazie token njikọta Notion gị site na taabụ **Isi Iyi Context** dị na dashboard Endpoint, ma ọ bụ site na REST API:

```bash
# Tọọ token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Lelee ọnọdụ
curl http://localhost:20128/api/settings/notion

# Kwụpụ njikọ
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Ngwaọrụ                      | Scopes         | Nkọwa                                                               |
| :--------------------------- | :------------- | :------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Chọọ ederede zuru ezu n'ime ibe na database niile                   |
| `notion_get_page`            | `read:notion`  | Nweta ibe site na ID tinyere properties ya                          |
| `notion_list_block_children` | `read:notion`  | Depụta child blocks nke ibe ma ọ bụ block                           |
| `notion_query_database`      | `read:notion`  | Jiri filters, sorts, na pagination mee query na database            |
| `notion_get_database`        | `read:notion`  | Nweta schema database site na ID                                    |
| `notion_append_blocks`       | `write:notion` | Tinye children blocks na parent block (nke kachasị 100 kwa request) |

## Ngwa Katalọgụ Nka Ndị Agent (3)

A kọwara ha na `open-sse/mcp-server/tools/agentSkillTools.ts`. `src/lib/agentSkills/catalog` na-akwado ha. Ngwa ndị a na-eme ka katalọgụ dọkụmentị Agent Skills nwere ndenye 45 dịrị ndị ahịa MCP na agent ndị dị na mpụga. Oke: `read:catalog`.

| Ngwa                              | Oke            | Nkọwa                                                                                                                             |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Depụta nka agent 45 niile site na nzacha `category` (api\|cli) na `area` ndị enwere ike iji; ọ na-eweghachi metadata + mkpuchi    |
| `omniroute_agent_skills_get`      | `read:catalog` | Nweta metadata zuru ezu + ọdịnaya SKILL.md maka otu nka site na `id` canonical ya                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | Ọnụọgụ mkpuchi: ole n'ime nka API 23, CLI 21 na config 1 nwere faịlụ SKILL.md na filesystem ma e jiri ya tụnyere ngụkọta katalọgụ |

Lee [AGENT-SKILLS.md](./AGENT-SKILLS.md) maka katalọgụ zuru ezu na otu agent ndị dị na mpụga si eji ya.

## Framework Ndị Metụtara Ya (v3.8.0)

Ndepụta ngwa MCP dị n'elu (ngwa pụrụ iche 110, nke `countUniqueMcpTools()` gbakọrọ) bụ nke e kpachapụrụ anya
maka ọrụ routing/cache/compression/memory/skills/proxy/context-source n'oge runtime. Framework abụọ dị ya nso
na-eso sava MCP abịa na v3.8.0 ma nwee dọkụmentị nke ha iche:

### Cloud Agents

Cloud Agents bụ agent AI na-ede koodu ndị na-agba ọsọ n'èzí process (codex-cloud, cursor-cloud, devin, jules), nke ejikọrọ na
OmniRoute site n'otu ụdị njikọ a na-eji maka ndị na-eweta LLM. A na-ekpughe ha site na
REST interface nke ha (`/api/v1/agents/*`), ha abụghịkwa **akụkụ** nke katalọgụ ngwa MCP
— ịkpọ Cloud Agent anaghị eri oke MCP.

- Mmejuputa: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Usoro ndụ: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dọkụmentị: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails bụ nzacha tupu/mgbe mmezu (vision-bridge, pii-masker, prompt-injection)
nke a na-etinye n'ime usoro chat. Ha na-agba ọsọ tupu e ruo na oyi akwa ngwa/route MCP
ma na-eziga mmebi iwu a haziri ahazi na usoro audit; anaghị akpọ ha dịka ngwa MCP.

- Mmejuputa: `src/lib/guardrails/`.
- Dọkụmentị: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Mgbe ị na-achọpụta nsogbu oku MCP nke yiri ka egbochiri ya, lelee ma ndekọ audit MCP
(ndenye `scope_denied:*`) ma akara audit guardrails — guardrail nwere ike ịjụ arịrịọ
**tupu** o ruo na oyi akwa na-amanye oke MCP.

---

## Endpoint REST API

| Endpoint               | Usoro                 | Nkọwa                                                                                                    | Nnwale njirimara       |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------- | :--------------------- |
| `/api/mcp/status`      | `GET`                 | Ọnọdụ sava: heartbeat, ọnọdụ mbufe HTTP, nchịkọta ọrụ audit                                              | Njikwa (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Katalọgụ ngwa (aha, nkọwa, oke, phase, endpoint isi mmalite)                                             | Njikwa                 |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint mbufe SSE (nke `mcpEnabled` + `mcpTransport === "sse"` na-achịkwa)                              | Igodo API + oke        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Mbufe HTTP nwere ike ịgbasa data (na-eji header `mcp-session-id`; `DELETE` na-akwụsị session)            | Igodo API + oke        |
| `/api/mcp/audit`       | `GET`                 | Ndenye ndekọ audit sitere na `mcp_tool_audit` (nzacha: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Njikwa                 |
| `/api/mcp/audit/stats` | `GET`                 | Ọnụọgụ audit agbakọtara ọnụ (`totalCalls`, `successRate`, `avgDurationMs`, ngwa ndị kacha eji)           | Njikwa                 |

Faịlụ isi mmalite: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

A na-egbochi ma mbufe SSE ma Streamable HTTP ruo mgbe agbanyere sava MCP na Settings (`mcpEnabled`) ma họrọkwa `mcpTransport` kwesịrị ekwesị. Ọ bụrụ na ahaziri mbufe na-ezighi ezi, route ahụ na-eweghachi HTTP 400 yana ntụnye ka a gbanwee ntọala.

---

## Nyocha Njirimara & Oke Ikike

A na-eji oke ikike igodo API enyocha njirimara ngwaọrụ MCP. A na-achịkọta mmanye oke ikike n’otu ebe na
`open-sse/mcp-server/scopeEnforcement.ts`. Ngwaọrụ ọ bụla chọrọ oke ikike akọwapụtara:

| Oke ikike             | Ngwaọrụ                                                                                                                                                                         |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                               |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                       |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                          |
| `read:quota`          | `check_quota`                                                                                                                                                                   |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                          |
| `read:models`         | `list_models_catalog`                                                                                                                                                           |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                   |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                           |
| `write:budget`        | `set_budget_guard`                                                                                                                                                              |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                     |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                  |
| `read:cache`          | `cache_stats`                                                                                                                                                                   |
| `write:cache`         | `cache_flush`                                                                                                                                                                   |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                      |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                               |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                           |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                          |
| `read:memory`         | `memory_search`                                                                                                                                                                 |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                    |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                              |
| `write:skills`        | `skills_enable`                                                                                                                                                                 |
| `execute:skills`      | `skills_execute`                                                                                                                                                                |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                         |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                       |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                  |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                              |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                 |
| `read:obsidian`       | Ngwaọrụ ọgụgụ 13 — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | Ngwaọrụ odide 9 — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                               |

A na-akwado scope wildcard: `read:*` na-enye scope ọgụgụ niile, `*` na-enye ohere zuru ezu.

### `mcp:connect` — ikike route dị warara (#7895)

Iji ruo na HTTP/SSE MCP transport (`/api/mcp/*`) site na ebe na-abụghị loopback chọrọ
`/api/mcp/` LOCAL_ONLY carve-out (lee `docs/security/ROUTE_GUARD_TIERS.md`). N’oge gara aga,
carve-out ahụ na-anabata naanị API key nwere scope `manage`/`admin` zuru ezu — nke sara mbara
karịa ihe onye na-akpọ oku nke chọrọ naanị ka ya na MCP kwurịta okwu chọrọ.
`src/shared/constants/managementScopes.ts` na-ebupụzi
`MCP_CONNECT_SCOPE = "mcp:connect"`: scope mgbakwunye dị warara (na-agbaso otu ụkpụrụ ahụ dị ka
`SELF_USAGE_SCOPE`) nke na-enye ikike maka NAANỊ ngafe `/api/mcp/` dị na
`src/server/authz/policies/management.ts` — ọ naghị enye ohere ọ bụla ọzọ na route nchịkwa,
ma e kpachaara anya hapụ ya N’ÈZÍ `MANAGEMENT_API_KEY_SCOPES`. Key nwere `manage`/`admin`
ka na-agafe carve-out ahụ n’enweghị mgbanwe; `mcp:connect` bụ nhọrọ nwere ikike dị ala maka
ndị na-akpọ oku MCP-naanị site n’ebe dị anya, nke a na-enyocha site na `hasMcpConnectOrManageScope()`.

### Ijikọta scope HTTP n’otu key n’otu key (#7895)

Site na HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` na-achọpụtazi ezigbo
`api_keys.scopes` nke onye na-akpọ oku site na `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
ma nyefee ya na `transport.handleRequest(req, { authInfo })` nke MCP SDK, ka
`extra.authInfo.scopes` nke na-erute oku tool ọ bụla gosipụta scope nke Bearer key ahụ n’onwe ya.
`resolveCallerScopeContext()` nke `scopeEnforcement.ts` ebutelarị `authInfo` ụzọ karịa
`_meta` na ndabere env `OMNIROUTE_MCP_SCOPES` — nke a na-ejupụta naanị isi mmalite mbụ ahụ,
nke kacha nwee mkpa, nke HTTP anaghị enye data na mbụ. Mgbe a na-achọtaghị API key ọ bụla
(enweghị header, key adịghị irè), `authInfo` na-anọ `undefined`, mkpebi ahụ wee daba na usoro
`meta`/env dịbu adị n’enweghị mgbanwe. Nke a ADỊGHỊ agbanwe ndabara
`OMNIROUTE_MCP_ENFORCE_SCOPES` — a ka ga-agbanye enforcement n’ụzọ doro anya; mgbanwe a
na-eme naanị ka ụzọ otu-key n’otu-key buru ụzọ ozugbo agbanyere ya. stdio enweghị njirimara
onye na-akpọ oku n’otu n’otu (lee `mcpCallerIdentity.ts`), ya mere mgbanwe a anaghị emetụta ya —
ọ na-anọgide na usoro ndabere `_meta`/env.

---

## Ndị Ngbanwe Gburugburuwu

| Ngbanwe                                 | Ndabara                            | Ebumnuche                                                                                                                            |
| :-------------------------------------- | :--------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`           | URL ntọala nke sava MCP na-eji mgbe ọ na-akpọ API ime OmniRoute                                                                      |
| `OMNIROUTE_API_KEY`                     | (gụ oghere)                        | Igodo API a na-eziga dị ka `Authorization: Bearer` gaa na oku API ime                                                                |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (naanị `"true"` na-eme ya) | Mgbe agbanyere ya, scopes ndị na-adịghị ga-ajụ oku ngwaọrụ ma dekọọ `scope_denied:<reason>` na ndekọ nyocha                          |
| `OMNIROUTE_MCP_SCOPES`                  | (gụ oghere)                        | Ndepụta scopes ndị e ji rikoma kewaa, nke a na-ewere dị ka ndị “dị” na ndabara (a na-eji ya mgbe onye na-akpọ enyeghị scopes nke ya) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (edoghị = agbanyere)               | Mgbe edobere ya ka ọ bụrụ `0/false/off/no`, ọ na-agbanyụ mkpakọ nkọwa MCP n'oge ndebanye aha                                         |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (edoghị = agbanyere)               | Aha ọzọ maka otu njikwa ahụ dị n'elu                                                                                                 |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                            | Oke oge tupu a kwụsị ọgụgụ nchịkwa ime (ahụike, nkwụsi ike, ngwakọta, oke ojiji, ojiji)                                              |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                            | Oke oge tupu a kwụsị nzọụkwụ ndị na-eche onye na-enye ọrụ (`route_request`, `web_search`, `web_fetch`)                               |
| `MCP_TOOL_DENY`                         | (edoghị = enweghị nzacha)          | Aha ngwaọrụ ndị e ji rikoma kewaa ka ewepụ na `tools/list` (mbelata ọnụọgụ ngwaọrụ — lee n'okpuru)                                   |
| `MCP_TOOL_ALLOW`                        | (edoghị = enweghị nzacha)          | Aha ngwaọrụ ndị e ji rikoma kewaa ka a hapụ naanị ha (ọnọdụ ndepụta ikike — lee n'okpuru)                                            |
| `DATA_DIR`                              | `~/.omniroute`                     | A na-ede faịlụ akara ịdị ndụ na `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                             |

---

## Mkpakọ Nkọwa

Ndebanye ngwaọrụ, prompt, na akụ MCP nwere ike ịchịkọta nkọwa n'oge ndebanye/ndepụta iji belata ogo metadata a na-ekpughere ndị ahịa (ya mere, belatakwa ọnụ ahịa ọnọdụ prompt). Mmejuputa ya dị na `open-sse/mcp-server/descriptionCompressor.ts`, e jikọkwara ya na sava MCP site na `compressMcpRegistryMetadata` n'ime `createMcpServer()`.

- Mkpakọ na-arụ ọrụ n'elu ederede nkọwa site n'iji usoro iwu Caveman (`getRulesForContext("all", "full")`) yana mwepụ blọk echekwara (akụkụ koodu, blọk nwere ngere, wdg.) ka ọdịnaya nhazi ghara ịgbanwe.
- Jikwaa ya maka ntinye ọ bụla site na uru `compression.mcpDescriptionCompressionEnabled` dị na tebụl ntọala `key_value` (ndabara: agbanyere) — a na-egosi ya na UI dị ka **Nyocha → Mkpakọ nkọwa MCP**.
- Jikwaa ya n'ofe usoro niile site na `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ma ọ bụ `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- A na-egosi ọnụ ọgụgụ ozugbo site na `omniroute_compression_status` n'okpuru `analytics.mcpDescriptionCompression`, tinyekwa mkpado `source: "mcp_metadata_estimate"` iji kewapụ ya na nnata ojiji onye na-enye ọrụ n'ezie.

---

## Mbelata Ọnụọgụ Ngwaọrụ (F4.3)

Mkpakọ nkọwa na-ebelata metadata nke ngwaọrụ ọ bụla; **mbelata ọnụọgụ ngwaọrụ** na-aga otu nzọụkwụ n'ihu site n'ibelata _ọnụọgụ_ ngwaọrụ a na-akpọsa kpamkpam. Ịkpọsa ngwaọrụ ole na ole na manifest `tools/list` na-ebelata ọnụ ahịa token kwa arịrịọ nke model nke klayenti na-akwụ maka katalọgụ ngwaọrụ (mkpakọ “layer 5”). Mmejuputa ya bụ nzacha dị ọcha, nke na-enweghị state na `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), nke etinyere n'ime loop ndebanye aha dị na `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**A ga-ahọrọrịrị iji ya, agbanyụrụ ya na ndabara.** Nzacha ahụ na-arụ ọrụ naanị mgbe edobere opekata mpe otu n'ime environment variables abụọ ahụ; mgbe edoghị nke ọ bụla, a na-akpọsa ngwaọrụ 110 niile n'enweghị mgbanwe.

| Variable         | Ụdị ọrụ                                                                                             |
| :--------------- | :-------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Blacklist — aha ngwaọrụ ndị e ji rikoma kewaa nke a na-ewepụ mgbe niile na `tools/list`             |
| `MCP_TOOL_ALLOW` | Allow-list — aha ngwaọrụ ndị e ji rikoma kewaa; naanị ndị a ka a na-ahapụ, a na-ewepụ ndị ọzọ niile |

`deny` na-ebute ụzọ karịa `allow`. A na-eji rikoma ekewa aha, ewepụ oghere dị n'akụkụ ha, ma leghara ndenye efu anya. Ọmụmaatụ:

```bash
# Wepụ ngwaọrụ abụọ na katalọgụ ahụ
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Kpọsaa naanị ngwaọrụ routing + quota (ụdị allow-list)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Otu e si ewepụ ngwaọrụ ndị a zachara:** ndebanye aha na-aga nke ọma mgbe niile; emesịa, a na-akpọ `.disable()` na handle MCP SDK nke ngwaọrụ profile jụrụ, ya mere ọ naghị apụta na `tools/list`, mana njikọ ya ka na-adịgide (ịgbanye/ịgbanyụ n'ụzọ dị ọcha, enweghị ndebanye aha ọzọ). Parser profile ahụ bụ `readMcpToolProfileFromEnv(process.env)`, nke na-eweghachi `null` (enweghị nzacha) mgbe vars abụọ ahụ tọgbọ chakoo.

Ọdịdị `ToolProfile` sara mbara nke dị n'azụ `reduceToolManifest` na-akwado nzacha site na njikọ scope (`allowScopes`, yana wildcard matching ụdị `read:*`) na oke `maxTools` a na-ekpebi n'otu ụzọ mgbe niile, mana ntọala abụọ ahụ chọrọ manifest zuru ezu n'oge ndebanye aha, ya mere **anaghị** ekpughe ha site na environment variables ugbu a (hook dị na ọkwa `tools/list` bụ ọrụ nsonazụ a na-esochi). `estimateManifestTokens()` dị iji tụnyere ọnụ ahịa token nke manifest tupu na mgbe emechara mbelata.

---

## Heartbeat Oge Ọrụ

Transport stdio na-echekwa ozi ịdị ndụ na `${DATA_DIR}/runtime/mcp-heartbeat.json` kwa sekọnd 5. Dashboard (`/api/mcp/status`) na-agụ faịlụ a tinyere ịdị ndụ PID iji chọpụta `online`. Kama nke ahụ, HTTP transports na-akọ state site na `getMcpHttpStatus()` dị n'ime process (enweghị ide faịlụ).

Snapshot heartbeat ahụ nwere:

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

## Ndekọ Audit

A na-edekọ oku ngwaọrụ ọ bụla na tebụl SQLite `mcp_tool_audit` site na `open-sse/mcp-server/audit.ts`:

- Aha ngwaọrụ, arguments (e mere hash/belata dịka `auditLevel` nke ngwaọrụ ọ bụla si dị), result
- Ogologo oge na ms, akara ịga nke ọma/ọdịda, ozi njehie (mgbe ọ metụtara)
- Hash API key, timestamp
- A na-edekọ scope denials dịka `scope_denied:<reason>` tinyere ndepụta scope ndị na-efu

Jiri dashboard ma ọ bụ REST endpoints `/api/mcp/audit` na `/api/mcp/audit/stats` nyochaa oku ndị mere n'oge na-adịbeghị anya.

---

## Faịlụ

| Faịlụ                                                                    | Ebumnuche                                                       |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Ụlọ ọrụ sava MCP, ebe mbata stdio, ndebanye ngwaọrụ nwere oke   |
| `open-sse/mcp-server/httpTransport.ts`                                   | Mbupu SSE + HTTP Streamable (njikwa nnọkọ)                      |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Ntụle oke ngwaọrụ na ịchọpụta onye kpọrọ ya                     |
| `open-sse/mcp-server/audit.ts`                                           | Ndekọ nyocha oku ngwaọrụ (`mcp_tool_audit`)                     |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Onye na-ede akara obi stdio (`mcp-heartbeat.json`)              |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Mkpakọ nkọwa maka ndekọ ngwaọrụ / prompt / akụ                  |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod schemas + ndekọ ngwaọrụ (`MCP_TOOLS`, ntinye 45)            |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Phase 2 + cache + ndị njikwa ngwaọrụ 1proxy                     |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Ndị njikwa ngwaọrụ mkpakọ                                       |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Nkọwa ngwaọrụ ebe nchekwa (ngwaọrụ 3)                           |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Nkọwa ngwaọrụ nka (ngwaọrụ 4)                                   |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Nkọwa ngwaọrụ isi iyi ọnọdụ Notion (ngwaọrụ 6)                  |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Nkọwa ngwaọrụ ime ka ihe bụrụ egwuregwu (ngwaọrụ 8)             |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Ngwaọrụ ndebanye na njikwa plugin (ngwaọrụ 8)                   |
| `src/app/api/mcp/status/route.ts`                                        | Ebe njedebe `/api/mcp/status`                                   |
| `src/app/api/mcp/tools/route.ts`                                         | Ebe njedebe `/api/mcp/tools`                                    |
| `src/app/api/mcp/sse/route.ts`                                           | Ụzọ mbupu SSE `/api/mcp/sse`                                    |
| `src/app/api/mcp/stream/route.ts`                                        | Ụzọ mbupu HTTP Streamable `/api/mcp/stream`                     |
| `src/app/api/mcp/audit/route.ts`                                         | Ajụjụ ndekọ nyocha `/api/mcp/audit`                             |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Ọtụtụ metrik nyocha agbakọtara `/api/mcp/audit/stats`           |
| `src/lib/notion/api.ts`                                                  | Klayentị Notion REST API (nnwale ọzọ, ngafe oge, nhazi njehie)  |
| `src/lib/db/notion.ts`                                                   | Nchekwa na-adịgide adịgide nke token Notion (tebụl `key_value`) |
| `src/app/api/settings/notion/route.ts`                                   | API ntọala Notion (GET/POST/DELETE)                             |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI njikwa token Notion                                          |
| `tests/unit/notion-api.test.ts`                                          | Nnwale klayentị Notion API (7)                                  |
| `tests/unit/notion-tools.test.ts`                                        | Nnwale mmanye oke ngwaọrụ Notion (10)                           |
| `tests/unit/db/notion.test.mjs`                                          | Nnwale modulu DB Notion (3)                                     |
