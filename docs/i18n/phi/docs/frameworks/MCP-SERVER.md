# OmniRoute MCP Server Documentation (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server ng Model Context Protocol na may 110 tool para sa routing, cache, compression, memory, skills, proxy, pool, Radar, at mga operasyon ng context source.
>
> Pinagmumulan ng katotohanan: kinakalkula ng `open-sse/mcp-server/server.ts` ang **110 natatanging tool** gamit ang `countUniqueMcpTools()`: 45 canonical na depinisyon (kabilang ang anim na CCR lifecycle tool, ang agent-skills trio, `omniroute_radar_catalog`, at `omniroute_x_search`), kasama ang memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), local corpus (3), at dalawang compression tool na para lamang sa RTK.

## Pag-install

Built-in ang OmniRoute MCP. Simulan ito gamit ang:

```bash
omniroute --mcp
```

O sa pamamagitan ng open-sse transport:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # Awtomatikong nagsisimula ang MCP sa /mcp endpoint
```

Naka-off bilang default ang mga HTTP transport (`sse` / `streamable-http`, na inihahatid nang in-process ng dashboard server) at dati ay maaari lamang i-toggle mula sa pahinang `/dashboard/mcp`. Simula sa v3.8.51, mayroon nang kaparehong kakayahan ang CLI:

```bash
omniroute mcp status                                  # enabled/online, transport, bilang ng tool
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # nire-reset ang mga aktibong sse/streamable-http session
```

Pina-PATCH ng `mcp enable`/`mcp disable` ang parehong setting na `mcpEnabled` (at opsyonal na `mcpTransport`) na tina-toggle ng dashboard sa pamamagitan ng `/api/settings`. Tinatawag ng `mcp restart` ang `POST /api/mcp/restart`: isinasara nito ang mga aktibong `sse`/`streamable-http` session upang malinis na makapag-reinitialize ang susunod na request, nagbabalik ng `409` kung disabled ang MCP, at `501` para sa `stdio` transport (ang mga stdio client ang namamahala sa sarili nilang subprocess — walang in-process handle na maaaring i-restart).

## Mga Transport

Naglalantad ang MCP server ng tatlong transport, na lahat ay sinusuportahan ng parehong `createMcpServer()` factory:

| Transport         | Saan                                                      | Kailan gagamitin                                            |
| :---------------- | :-------------------------------------------------------- | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                           | Mga integration sa IDE (Claude Desktop, Cursor, atbp.)      |
| `sse`             | `POST/GET /api/mcp/sse` sa pamamagitan ng `httpTransport` | Mga browser/agent client na nangangailangan ng event stream |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                         | Mga multi-session HTTP client (`mcp-session-id` header)     |

Pinipili ang aktibong HTTP transport (`sse` o `streamable-http`) sa pamamagitan ng setting na `mcpTransport`. Kapag nagpapalit ng transport, isinasara ang mga umiiral na session sa kabilang transport.

### Remote access (pag-bypass gamit ang manage scope)

Nasa LOCAL_ONLY tier ang `/api/mcp/*` (`src/server/authz/routeGuard.ts`) — bilang default, mga loopback host (`localhost`, `127.0.0.1`, `::1`) lamang ang makaka-access dito. Simula sa v3.8.2, maaaring kumonekta ang mga non-loopback client kung magpapakita sila ng `Authorization: Bearer <api-key>` na ang key ay may `manage` scope. Ito ang tanging paraan upang ma-access ang remote MCP server sa pamamagitan ng tunnel, reverse proxy, o pampublikong hostname.

```bash
# Ibigay ang manage scope: buksan ang pahina ng API Keys sa dashboard at i-toggle
# ang "Management Access" sa key, o i-POST ang scopes:["manage"] kapag gumagawa nito.

# Pagkatapos, kumonekta mula sa isang remote MCP client:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Nagbabalik ang key na walang manage scope (o walang Bearer) ng `403 LOCAL_ONLY`. Sadyang HINDI maaaring i-bypass ang sibling prefix na `/api/cli-tools/runtime/*` — tingnan ang [Route Guard Tiers — Pagbubukod para sa manage scope](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Configuration ng IDE

Tingnan ang [Configuration ng MCP Client](../guides/SETUP_GUIDE.md#mcp-client-configuration) para sa pag-setup ng Claude Desktop,
Cursor, Cline, at mga compatible na MCP client.

---

## Mahahalagang Tool (14) — Yugto 1

| Tool                            | Mga Saklaw            | Paglalarawan                                                                                                                                                             |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Uptime, memory, mga circuit breaker, mga limitasyon sa rate, mga estadistika ng cache                                                                                    |
| `omniroute_list_combos`         | `read:combos`         | Lahat ng naka-configure na combo kasama ang mga estratehiya (opsyonal na mga sukatan)                                                                                    |
| `omniroute_get_combo_metrics`   | `read:combos`         | Mga sukatan ng performance para sa isang partikular na combo                                                                                                             |
| `omniroute_switch_combo`        | `write:combos`        | I-activate o i-deactivate ang isang combo                                                                                                                                |
| `omniroute_create_combo`        | `write:combos`        | Gumawa ng validated na combo sa pamamagitan ng kasalukuyang combo API                                                                                                    |
| `omniroute_check_quota`         | `read:quota`          | Nagamit/kabuuang quota, porsiyentong natitira, oras ng pag-reset, kalagayan ng token                                                                                     |
| `omniroute_route_request`       | `execute:completions` | Magpadala ng chat completion sa pamamagitan ng routing ng OmniRoute                                                                                                      |
| `omniroute_cost_report`         | `read:usage`          | Ulat ng gastos ayon sa panahon (session/araw/linggo/buwan)                                                                                                               |
| `omniroute_list_models_catalog` | `read:models`         | Kumpletong catalog ng modelo kasama ang mga kakayahan, status, at presyo                                                                                                 |
| `omniroute_radar_catalog`       | `read:radar`          | Lokal at nilagdaang Radar catalog; mga opsyonal na filter ayon sa provider/family                                                                                        |
| `omniroute_tool_search`         | `read:tools`          | Tumuklas ng mga tool mula sa nakarehistrong MCP catalog                                                                                                                  |
| `omniroute_web_search`          | `execute:search`      | Maghanap sa web sa pamamagitan ng mga naka-configure na search provider. Hindi para sa X/Twitter.                                                                        |
| `omniroute_x_search`            | `execute:search`      | Maghanap sa X sa pamamagitan ng xAI/SuperGrok, o piliin ang `xquik-search` para sa mga resulta ng Xquik API. Nangangailangan ng mga credential para sa napiling backend. |
| `omniroute_web_fetch`           | `execute:search`      | Kunin ang nilalaman ng web sa pamamagitan ng mga naka-configure na fetch provider                                                                                        |

## Mga Advanced na Tool (11) — Yugto 2

| Tool                               | Mga Saklaw                           | Paglalarawan                                                                                              |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Dry-run na simulation ng pagruruta na may fallback tree                                                   |
| `omniroute_set_budget_guard`       | `write:budget`                       | Badyet ng session na may aksyong degrade/block/alert                                                      |
| `omniroute_set_routing_strategy`   | `write:combos`                       | I-update ang estratehiya ng combo habang tumatakbo (priority/weighted/auto/etc.)                          |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Ilapat ang preset ng resilience na `aggressive` / `balanced` / `conservative`                             |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Live na pagsubok sa bawat provider sa isang combo gamit ang tunay na upstream call                        |
| `omniroute_get_provider_metrics`   | `read:health`                        | Mga sukatan kada provider na may p50/p95/p99 latency at estado ng circuit breaker                         |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Magrekomenda ng combo ayon sa uri ng gawain na may mga limitasyon sa badyet/latency                       |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Ipaliwanag kung bakit niruta ang isang request sa isang provider (mga salik ng pagmamarka + mga fallback) |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Buong snapshot ng session: gastos, mga token, nangungunang modelo/provider, mga error, at budget guard    |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Suriin (at opsyonal na awtomatikong ayusin) ang database drift gaya ng sirang combo refs / mga orphan row |
| `omniroute_sync_pricing`           | `pricing:write`                      | I-sync ang datos ng pagpepresyo mula sa mga panlabas na source (LiteLLM); sinusuportahan ang `dryRun`     |

## Mga Tool sa Cache (2)

| Tool                    | Mga Saklaw    | Paglalarawan                                                    |
| :---------------------- | :------------ | :-------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Mga estadistika ng semantic cache, prompt-cache, at idempotency |
| `omniroute_cache_flush` | `write:cache` | I-flush ang cache sa kabuuan o ayon sa signature/model          |

## Mga Tool sa Compression (13)

| Tool                                | Mga Saklaw          | Paglalarawan                                                                                                                                                      |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Mga setting ng compression, buod ng analytics, at mga estadistikang isinasaalang-alang ang cache (kabilang ang metadata ng `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | I-configure ang compression mode, threshold, target ratio, pagpapanatili ng system-prompt, at toggle ng MCP description compression                               |
| `omniroute_set_compression_engine`  | `write:compression` | Piliin ang aktibong engine (off/caveman/rtk/stacked) at intensity ng Caveman/RTK                                                                                  |
| `omniroute_list_compression_combos` | `read:compression`  | Ilista ang mga pinangalanang compression combo at ang kanilang mga engine pipeline                                                                                |
| `omniroute_compression_combo_stats` | `read:compression`  | Analytics na pinangkat ayon sa compression combo at engine                                                                                                        |
| `omniroute_ccr_store`               | `write:compression` | I-store ang content na nakahiwalay ayon sa caller sa bounded in-memory CCR store at magbalik ng marker kasama ang `ccr://` reference                              |
| `omniroute_ccr_retrieve`            | `read:compression`  | Kunin ang buong CCR content o gamitin ang mga mode na head, tail, lines, grep, at stats                                                                           |
| `omniroute_ccr_inspect`             | `read:compression`  | Siyasatin ang caller-owned CCR metadata nang hindi ibinabalik ang content                                                                                         |
| `omniroute_ccr_list`                | `read:compression`  | Ilista ang naka-page na metadata para sa mga caller-owned CCR block                                                                                               |
| `omniroute_ccr_delete`              | `write:compression` | Magtanggal ng caller-owned CCR block                                                                                                                              |
| `omniroute_ccr_stats`               | `read:compression`  | Iulat ang paggamit ng memory na saklaw ng caller, mga lifecycle counter, at mga limitasyon ng store                                                               |
| `omniroute_rtk_discover`            | `read:compression`  | Tuklasin ang umuulit na noise sa mga opt-in na sample ng RTK output                                                                                               |
| `omniroute_rtk_learn`               | `read:compression`  | Bumuo ng masusuring draft ng RTK filter mula sa mga opt-in na sample                                                                                              |

Ang mga CCR entry ay nasa memory lamang at nawawala kapag nag-restart. Ang bawat block ay limitado sa 2 MiB, ang bawat
principal sa 16 MiB, at ang global store sa 64 MiB. Ang default na TTL ng mga entry ay 24 na oras (maximum na
pitong araw). Ang buong MCP retrieval ay limitado sa 256 KiB; mananatiling available ang mas malalaking block sa pamamagitan ng
mga ranged at grep mode. Ang storage, retrieval, listing, inspection, deletion, at stats ay nakahiwalay ayon sa
authenticated na API-key principal. Ang mga audit record ay naglalaman ng mga hash at metadata ng laki, at hindi kailanman ng content.

Ang `omniroute_compression_status` ay hiwalay na nag-uulat ng compression ng paglalarawan ng MCP sa ilalim ng
`analytics.mcpDescriptionCompression`. Ang mga halagang iyon ay mga pagtatantya sa laki ng metadata para sa mga
paglalarawang maaaring ilista ng MCP (`tools`, `prompts`, `resources`, at `resourceTemplates`); hindi
ang mga ito mga resibo ng paggamit ng provider at minarkahan ang mga ito ng `source: "mcp_metadata_estimate"`.

### Filter ng Accessibility Tree ng MCP (v3.8.0)

Hiwalay sa mga compression tool sa itaas, may post-execution filter ang OmniRoute na
nagko-compress sa mga **resulta ng tool** ng mga browser/accessibility tool ng MCP bago ibalik ang mga ito sa
agent. Ang filter na ito ay hindi mismo isang tool — transparent itong tumatakbo sa anumang resulta ng tool na naglalaman ng
detalyadong accessibility-tree o browser-snapshot na text (≥2000 character).

Mahahalagang gawi:

- Pinagsasama ang ≥30 magkakasunod na nauulit na sibling line sa buod na may simula + dulo
- Pinapanatili ang mga anchor na `[ref=eXX]` na kinakailangan ng Playwright/computer-use
- Mahigpit na pinuputol ang sobrang laking text (>50,000 character) na may pahiwatig sa navigation
- Inaasahang matitipid: **60–80%** sa mga payload ng browser snapshot

Configuration: `compression.mcpAccessibility` sa mga global setting (migration 056).
Implementation: `open-sse/services/compression/engines/mcpAccessibility/`.
Buong dokumentasyon: [Mga Compression Engine — Filter ng Accessibility Tree ng MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Tingnan ang [Mga Compression Engine](../compression/COMPRESSION_ENGINES.md) at [RTK Compression](../compression/RTK_COMPRESSION.md) para sa
runtime compression model na ginagamit ng mga tool na ito.

## Mga Tool ng 1Proxy (3)

| Tool                        | Mga Scope      | Paglalarawan                                                                                        |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Kumuha ng mga libreng proxy mula sa 1proxy marketplace (mga filter ng protocol/bansa/kalidad/limit) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Kunin ang susunod na available na proxy ayon sa estratehiya (`random` / `quality` / `sequential`)   |
| `omniroute_oneproxy_stats`  | `read:proxies` | Mga estadistika ng pool, katayuan ng pag-sync, distribusyon ayon sa protocol at bansa               |

## Mga Tool ng Memory (3)

Tinukoy sa `open-sse/mcp-server/tools/memoryTools.ts`. Ipinapatupad ang auth/scope sa pamamagitan ng karaniwang pipeline ng scope ng MCP.

| Tool                      | Mga Scope      | Paglalarawan                                                                                              |
| :------------------------ | :------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Maghanap ng mga memory ayon sa query / uri / API key na may pagpapatupad ng token budget                  |
| `omniroute_memory_add`    | `write:memory` | Magdagdag ng bagong entry sa memory (`factual` / `episodic` / `procedural` / `semantic`)                  |
| `omniroute_memory_clear`  | `write:memory` | I-clear ang mga memory para sa isang API key, na maaaring i-filter ayon sa uri o timestamp na `olderThan` |

## Mga Tool ng Skill (4)

Tinukoy sa `open-sse/mcp-server/tools/skillTools.ts`. Sinusuportahan ng `src/lib/skills/registry` + `src/lib/skills/executor`.

| Tool                          | Mga Scope        | Paglalarawan                                                                                                     |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Ilista ang mga nakarehistrong skill na may opsyonal na pag-filter ayon sa API key, pangalan, o enabled na estado |
| `omniroute_skills_enable`     | `write:skills`   | I-enable o i-disable ang isang partikular na skill ayon sa ID                                                    |
| `omniroute_skills_execute`    | `execute:skills` | Isagawa ang isang skill gamit ang ibinigay na input at ibalik ang rekord ng pagpapatupad                         |
| `omniroute_skills_executions` | `read:skills`    | Ilista ang kamakailang kasaysayan ng pagpapatupad ng skill                                                       |

## Notion Context Source (6)

Tinukoy sa `open-sse/mcp-server/tools/notionTools.ts`. Nakaimbak ang token sa talahanayang `key_value` sa pamamagitan ng `src/lib/db/notion.ts`. Ang REST client ay nasa `src/lib/notion/api.ts`. Ang Settings API ay nasa `src/app/api/settings/notion/route.ts`. Ang Dashboard UI ay nasa `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

I-configure ang iyong Notion integration token mula sa tab na **Context Sources** sa Endpoint dashboard, o sa pamamagitan ng REST API:

```bash
# Itakda ang token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Suriin ang katayuan
curl http://localhost:20128/api/settings/notion

# Idiskonekta
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Tool                         | Mga Scope      | Paglalarawan                                                                      |
| :--------------------------- | :------------- | :-------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Full-text na paghahanap sa lahat ng page at database                              |
| `notion_get_page`            | `read:notion`  | Kunin ang isang page ayon sa ID kasama ang mga property nito                      |
| `notion_list_block_children` | `read:notion`  | Ilista ang mga child block ng isang page o block                                  |
| `notion_query_database`      | `read:notion`  | Mag-query ng database gamit ang mga filter, pag-uuri, at pagination               |
| `notion_get_database`        | `read:notion`  | Kunin ang schema ng database ayon sa ID                                           |
| `notion_append_blocks`       | `write:notion` | Magdagdag ng mga child block sa isang parent block (maximum na 100 bawat request) |

## Mga Tool ng Catalog ng Agent Skill (3)

Tinukoy sa `open-sse/mcp-server/tools/agentSkillTools.ts`. Sinusuportahan ng `src/lib/agentSkills/catalog`. Inilalantad ng mga tool na ito ang 45-entry na catalog ng dokumentasyon ng Agent Skills sa mga MCP client at external agent. Saklaw: `read:catalog`.

| Tool                              | Mga Saklaw     | Paglalarawan                                                                                                                                 |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Ilista ang lahat ng 45 agent skill na may opsyonal na mga filter na `category` (api\|cli) at `area`; ibinabalik ang metadata + coverage      |
| `omniroute_agent_skills_get`      | `read:catalog` | Kunin ang buong metadata + nilalaman ng SKILL.md para sa isang skill ayon sa canonical na `id`                                               |
| `omniroute_agent_skills_coverage` | `read:catalog` | Mga estadistika ng coverage: ilan sa 23 API, 21 CLI, at 1 config skill ang may mga SKILL.md file sa filesystem kumpara sa kabuuan sa catalog |

Tingnan ang [AGENT-SKILLS.md](./AGENT-SKILLS.md) para sa buong catalog at kung paano ito ginagamit ng mga external agent.

## Mga Kaugnay na Framework (v3.8.0)

Ang imbentaryo ng MCP tool sa itaas (110 natatanging tool, kinuwenta ng `countUniqueMcpTools()`) ay sadyang
nakatuon sa mga operasyon ng runtime routing/cache/compression/memory/skills/proxy/context-source. Dalawang katabing
framework ang kasama ng MCP server sa v3.8.0 at hiwalay na nakadokumento:

### Mga Cloud Agent

Ang mga Cloud Agent ay mga out-of-process na AI coding agent (codex-cloud, cursor-cloud, devin, jules) na nakakonekta sa
OmniRoute sa pamamagitan ng parehong modelo ng koneksyon na ginagamit para sa mga LLM provider. Inilalantad ang mga ito sa pamamagitan ng
sarili nilang REST interface (`/api/v1/agents/*`) at **hindi** bahagi ng catalog ng MCP tool
— ang pagtawag sa isang Cloud Agent ay hindi gumagamit ng MCP scope.

- Implementasyon: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Lifecycle: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentasyon: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Mga Guardrail

Ang mga guardrail ay mga pre/post-execution filter (vision-bridge, pii-masker, prompt-injection)
na inilalapat sa loob ng chat pipeline. Tumatakbo ang mga ito bago maabot ang layer ng MCP tool/route
at naglalabas ng mga structured violation sa audit pipeline; hindi ginagamit ang mga ito bilang mga MCP tool.

- Implementasyon: `src/lib/guardrails/`.
- Dokumentasyon: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Kapag nagde-debug ng isang MCP call na tila naka-block, suriin kapwa ang MCP audit log
(mga entry na `scope_denied:*`) at ang guardrails audit trail — maaaring tanggihan ang isang request ng
isang guardrail **bago** pa man nito maabot ang layer ng pagpapatupad ng MCP scope.

---

## Mga REST API Endpoint

| Endpoint               | Paraan                | Paglalarawan                                                                                                    | Auth                       |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | Status ng server: heartbeat, estado ng HTTP transport, buod ng aktibidad sa audit                               | Pamamahala (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Catalog ng tool (pangalan, paglalarawan, mga scope, phase, mga source endpoint)                                 | Pamamahala                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transport endpoint (nililimitahan ng `mcpEnabled` + `mcpTransport === "sse"`)                               | API key + mga scope        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamable HTTP transport (ginagamit ang `mcp-session-id` header; tinatapos ng `DELETE` ang session)            | API key + mga scope        |
| `/api/mcp/audit`       | `GET`                 | Mga entry ng audit log mula sa `mcp_tool_audit` (mga filter: `limit`, `offset`, `tool`, `success`, `apiKeyId`)  | Pamamahala                 |
| `/api/mcp/audit/stats` | `GET`                 | Pinagsama-samang mga estadistika ng audit (`totalCalls`, `successRate`, `avgDurationMs`, mga nangungunang tool) | Pamamahala                 |

Mga source file: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Naka-block ang parehong SSE at Streamable HTTP transport hanggang sa i-enable ang MCP server sa Settings (`mcpEnabled`) at piliin ang naaangkop na `mcpTransport`. Kung maling transport ang naka-configure, nagbabalik ang route ng HTTP 400 na may pahiwatig na baguhin ang settings.

---

## Authentication at Mga Saklaw

Ang mga MCP tool ay pinapatotohanan sa pamamagitan ng mga saklaw ng API key. Ang pagpapatupad ng mga saklaw ay sentralisado sa
`open-sse/mcp-server/scopeEnforcement.ts`. Nangangailangan ang bawat tool ng mga partikular na saklaw:

| Saklaw                | Mga Tool                                                                                                                                                                          |
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
| `read:obsidian`       | 13 tool sa pagbasa — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 na tool sa pagsusulat — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …          |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                 |

Sinusuportahan ang mga wildcard scope: ang `read:*` ay nagbibigay ng lahat ng read-scope, at ang `*` ay nagbibigay ng ganap na access.

### `mcp:connect` — limitadong kakayahan sa route (#7895)

Ang pag-access sa HTTP/SSE MCP transport (`/api/mcp/*`) mula sa non-loopback ay nangangailangan ng
`/api/mcp/` LOCAL_ONLY carve-out (tingnan ang `docs/security/ROUTE_GUARD_TIERS.md`). Dati,
tanging API key na may buong `manage`/`admin` scope ang tinatanggap ng carve-out na iyon — masyadong
malawak para sa caller na kailangan lamang makipag-ugnayan sa MCP. Ini-export na ngayon ng
`src/shared/constants/managementScopes.ts` ang `MCP_CONNECT_SCOPE = "mcp:connect"`: isang
pandagdag at limitadong scope (kaparehong precedent ng `SELF_USAGE_SCOPE`) na nagbibigay-awtorisasyon
LAMANG sa `/api/mcp/` bypass sa `src/server/authz/policies/management.ts` — hindi ito nagbibigay
ng access sa anumang iba pang management route at sadyang HINDI isinama sa
`MANAGEMENT_API_KEY_SCOPES`. Ang key na may `manage`/`admin` ay pumapasa pa rin sa carve-out nang
walang pagbabago; ang `mcp:connect` ay alternatibong may mas mababang pribilehiyo para sa mga remote
caller na MCP lamang, na sinusuri sa pamamagitan ng `hasMcpConnectOrManageScope()`.

### Pag-uugnay ng HTTP scope sa bawat key (#7895)

Sa HTTP/SSE, kinukuha na ngayon ng `open-sse/mcp-server/httpTransport.ts` ang aktuwal na
`api_keys.scopes` ng caller sa pamamagitan ng `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
at ipinapasa ito sa `transport.handleRequest(req, { authInfo })` ng MCP SDK, upang ang
`extra.authInfo.scopes` na nakakarating sa bawat tool call ay sumasalamin sa sariling mga scope ng
Bearer key. Inuuna na ng `resolveCallerScopeContext()` ng `scopeEnforcement.ts` ang `authInfo` kaysa
sa `_meta` at sa env fallback na `OMNIROUTE_MCP_SCOPES` — pinupunan lamang nito ang una at
pinakamataas ang priyoridad na source, na dati ay walang natatanggap na data sa HTTP. Kapag walang
nalutas na API key (walang header o invalid ang key), nananatiling `undefined` ang `authInfo` at
bumabagsak ang resolution sa umiiral na `meta`/env chain nang walang pagbabago. HINDI nito binabago
ang default ng `OMNIROUTE_MCP_ENFORCE_SCOPES` — kailangan pa ring tahasang i-enable ang enforcement;
tinitiyak lamang ng pagbabagong ito na mauuna ang per-key path kapag naka-enable na ito. Walang
per-caller identity ang stdio (tingnan ang `mcpCallerIdentity.ts`) at hindi ito naaapektuhan —
mananatili ito sa `_meta`/env fallback chain.

---

## Mga Variable ng Kapaligiran

| Variable                                | Default                                        | Layunin                                                                                                                                                                   |
| :-------------------------------------- | :--------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                       | Base URL na ginagamit ng MCP server kapag tumatawag sa mga internal API ng OmniRoute                                                                                      |
| `OMNIROUTE_API_KEY`                     | (walang laman)                                 | API key na ipinapasa bilang `Authorization: Bearer` sa mga internal API call                                                                                              |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (`"true"` lamang ang nagpapagana rito) | Kapag pinagana, tatanggihan ng mga nawawalang scope ang mga tool call at itatala ang `scope_denied:<reason>` sa audit log                                                 |
| `OMNIROUTE_MCP_SCOPES`                  | (walang laman)                                 | Listahan ng mga scope na pinaghihiwalay ng kuwit at itinuturing na "available" bilang default (ginagamit kapag hindi nagbibigay ang tumatawag ng sarili nitong mga scope) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (hindi nakatakda = naka-on)                    | Kapag itinakda sa `0/false/off/no`, hindi pinapagana ang compression ng paglalarawan ng MCP sa oras ng pagpaparehistro                                                    |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (hindi nakatakda = naka-on)                    | Alternatibong alias para sa toggle sa itaas                                                                                                                               |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                        | Takdang oras bago i-abort ang mga internal management read (health, resilience, combos, quota, usage)                                                                     |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                        | Takdang oras bago i-abort ang mga hop na naghihintay sa isang provider (`route_request`, `web_search`, `web_fetch`)                                                       |
| `MCP_TOOL_DENY`                         | (hindi nakatakda = walang filter)              | Mga pangalan ng tool na pinaghihiwalay ng kuwit na aalisin mula sa `tools/list` (pagbabawas ng dami ng tool — tingnan sa ibaba)                                           |
| `MCP_TOOL_ALLOW`                        | (hindi nakatakda = walang filter)              | Mga pangalan ng tool na pinaghihiwalay ng kuwit na eksklusibong pananatilihin (allow-list mode — tingnan sa ibaba)                                                        |
| `DATA_DIR`                              | `~/.omniroute`                                 | Isinusulat ang heartbeat file sa `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                 |

---

## Compression ng Paglalarawan

Maaaring i-compress ng mga registry ng tool, prompt, at resource ng MCP ang mga paglalarawan sa oras ng pagpaparehistro/paglilista upang mabawasan ang laki ng metadata na inilalantad sa mga client (at samakatuwid ay ang gastos sa konteksto ng prompt). Matatagpuan ang implementasyon sa `open-sse/mcp-server/descriptionCompressor.ts` at isinama ito sa MCP server sa pamamagitan ng `compressMcpRegistryMetadata` sa loob ng `createMcpServer()`.

- Isinasagawa ang compression sa teksto ng paglalarawan gamit ang ruleset ng Caveman (`getRulesForContext("all", "full")`) na may preserved-block extraction (mga code span, fenced block, atbp.) upang hindi mabago ang istruktural na nilalaman.
- I-toggle para sa bawat deployment sa pamamagitan ng value na `compression.mcpDescriptionCompressionEnabled` sa talahanayan ng mga setting na `key_value` (default: pinagana) — makikita sa UI bilang **Analytics → MCP description compression**.
- I-toggle sa buong proseso sa pamamagitan ng alinman sa `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` o `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Ipinapakita ang mga realtime na estadistika sa pamamagitan ng `omniroute_compression_status` sa ilalim ng `analytics.mcpDescriptionCompression` at tina-tag na `source: "mcp_metadata_estimate"` upang maiba sa mga resibo ng aktuwal na paggamit ng provider.

---

## Pagbabawas ng Bilang ng Tool (F4.3)

Pinaliliit ng description compression ang metadata ng bawat tool; ang **tool-cardinality reduction** ay humahakbang pa sa pamamagitan ng pagbabawas sa _dami_ ng mga tool na ipinapaalam. Ang pag-aanunsiyo ng mas kaunting tool sa manifest na `tools/list` ay nagpapababa sa per-request na token cost na binabayaran ng modelo ng client para sa catalog ng tool ("layer 5" compression). Ang implementasyon ay isang purong stateless na filter sa `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), na nakakabit sa registration loop sa `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Opt-in, naka-off bilang default.** Tumatakbo lamang ang filter kapag nakatakda ang kahit isa sa dalawang environment variable; kapag walang nakatakda sa dalawa, ipinapaalam ang lahat ng 110 tool nang walang pagbabago.

| Variable         | Mode                                                                                                                              |
| :--------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Blacklist — mga pangalan ng tool na pinaghihiwalay ng kuwit at palaging inaalis sa `tools/list`                                   |
| `MCP_TOOL_ALLOW` | Allow-list — mga pangalan ng tool na pinaghihiwalay ng kuwit; ang mga ito lamang ang pinananatili, at inaalis ang lahat ng iba pa |

Mas mataas ang priyoridad ng `deny` kaysa sa `allow`. Pinaghihiwalay ng kuwit ang mga pangalan, inaalis ang sobrang espasyo, at binabalewala ang mga entry na walang laman. Mga halimbawa:

```bash
# Mag-alis ng dalawang tool mula sa catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Ang mga tool lamang para sa routing at quota ang ipaalam (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Paano inaalis ang mga na-filter na tool:** palaging nagtatagumpay ang registration; pagkatapos ay `.disable()`d sa MCP SDK handle ang isang tool na tinatanggihan ng profile, kaya hindi ito kailanman lumilitaw sa `tools/list` ngunit nananatiling buo ang wiring (malinis na enable/disable, walang muling registration). Ang profile parser ay `readMcpToolProfileFromEnv(process.env)`, na nagbabalik ng `null` (walang filtering) kapag walang laman ang parehong variable.

Sinusuportahan din ng mas kumpletong anyo ng `ToolProfile` sa likod ng `reduceToolManifest` ang scope-intersection filtering (`allowScopes`, na may `read:*`-style na wildcard matching) at isang deterministic na `maxTools` cap, ngunit kailangan ng dalawang opsyong iyon ang buong manifest sa oras ng registration at **hindi** pa inilalantad sa pamamagitan ng mga environment variable sa kasalukuyan (isang `tools/list`-level hook ang sinusubaybayang follow-up). Magagamit ang `estimateManifestTokens()` upang ihambing ang token cost ng manifest bago at pagkatapos ng pagbabawas.

---

## Runtime Heartbeat

Itinatala ng stdio transport ang liveness sa `${DATA_DIR}/runtime/mcp-heartbeat.json` kada 5 segundo. Binabasa ng dashboard (`/api/mcp/status`) ang file na ito kasama ang PID liveness upang matukoy ang `online`. Sa halip, nag-uulat ang mga HTTP transport ng state mula sa in-process na `getMcpHttpStatus()` (walang pagsusulat sa file).

Naglalaman ang heartbeat snapshot ng:

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

## Audit Logging

Itinatala sa SQLite table na `mcp_tool_audit` ang bawat tawag sa tool ng `open-sse/mcp-server/audit.ts`:

- Pangalan ng tool, mga argument (naka-hash/naka-truncate ayon sa per-tool na `auditLevel`), resulta
- Tagal sa ms, flag ng tagumpay/pagkabigo, mensahe ng error (kapag naaangkop)
- Hash ng API key, timestamp
- Itinatala ang mga pagtanggi dahil sa scope bilang `scope_denied:<reason>` kasama ang listahan ng mga nawawalang scope

Gamitin ang dashboard o ang mga REST endpoint na `/api/mcp/audit` at `/api/mcp/audit/stats` upang suriin ang mga kamakailang tawag.

---

## Mga File

| File                                                                     | Layunin                                                                       |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Factory ng MCP server, stdio entry point, at mga scoped tool registration     |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transport (pamamahala ng session)                       |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Pagsusuri ng tool scope at pagtukoy sa caller                                 |
| `open-sse/mcp-server/audit.ts`                                           | Audit logging ng tool call (`mcp_tool_audit`)                                 |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio heartbeat writer (`mcp-heartbeat.json`)                                 |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Pag-compress ng paglalarawan para sa mga registry ng tool / prompt / resource |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Mga Zod schema + tool registry (`MCP_TOOLS`, 45 entry)                        |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Mga handler ng Phase 2 + cache + 1proxy tool                                  |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Mga handler ng compression tool                                               |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Mga depinisyon ng memory tool (3 tool)                                        |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Mga depinisyon ng skill tool (4 tool)                                         |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Mga depinisyon ng tool para sa Notion context source (6 na tool)              |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Mga depinisyon ng gamification tool (8 tool)                                  |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Mga tool para sa pagpaparehistro at pamamahala ng plugin (8 tool)             |
| `src/app/api/mcp/status/route.ts`                                        | Endpoint na `/api/mcp/status`                                                 |
| `src/app/api/mcp/tools/route.ts`                                         | Endpoint na `/api/mcp/tools`                                                  |
| `src/app/api/mcp/sse/route.ts`                                           | Route ng SSE transport na `/api/mcp/sse`                                      |
| `src/app/api/mcp/stream/route.ts`                                        | Route ng Streamable HTTP transport na `/api/mcp/stream`                       |
| `src/app/api/mcp/audit/route.ts`                                         | Query sa audit log na `/api/mcp/audit`                                        |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Pinagsama-samang audit metrics ng `/api/mcp/audit/stats`                      |
| `src/lib/notion/api.ts`                                                  | Client ng Notion REST API (retry, timeout, pag-uuri ng error)                 |
| `src/lib/db/notion.ts`                                                   | Pagpapanatili ng Notion token (`key_value` table)                             |
| `src/app/api/settings/notion/route.ts`                                   | API ng mga setting ng Notion (GET/POST/DELETE)                                |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI para sa pamamahala ng Notion token                                         |
| `tests/unit/notion-api.test.ts`                                          | Mga test ng Notion API client (7)                                             |
| `tests/unit/notion-tools.test.ts`                                        | Mga test sa pagpapatupad ng scope ng Notion tools (10)                        |
| `tests/unit/db/notion.test.mjs`                                          | Mga test ng Notion DB module (3)                                              |
