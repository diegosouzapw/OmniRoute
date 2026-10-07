# OmniRoute MCP Server Documentation (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server protokolu Model Context Protocol so 110 nástrojmi pre smerovanie, cache, kompresiu, pamäť, zručnosti, proxy, pool, Radar a operácie zdrojov kontextu.
>
> Zdroj pravdy: `open-sse/mcp-server/server.ts` vypočítava **110 unikátnych nástrojov** pomocou `countUniqueMcpTools()`: 45 kanonických definícií (vrátane šiestich nástrojov životného cyklu CCR, trojice agent-skills, `omniroute_radar_catalog` a `omniroute_x_search`), plus pamäť (3), zručnosti (4), GitHub zručnosti (3), pool (6), gamifikácia (8), pluginy (8), Notion (6), Obsidian (22), lokálny korpus (3) a dva nástroje na kompresiu len pre RTK.

## Inštalácia

OmniRoute MCP je vstavaný. Spustite ho pomocou:

```bash
omniroute --mcp
```

Alebo cez open-sse transport:

```bash
# HTTP streamovateľný transport (port 20130)
omniroute --dev  # MCP sa automaticky spustí na /mcp koncovom bode
```

HTTP transporty (`sse` / `streamable-http`, obsluhované v rámci procesu serverom dashboardu) sú
predvolene vypnuté a predtým boli prepínateľné iba zo stránky `/dashboard/mcp`. Od verzie v3.8.51
má CLI paritu:

```bash
omniroute mcp status                                  # povolené/online, transport, počet nástrojov
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resetuje aktívne sse/streamable-http relácie
```

`mcp enable`/`mcp disable` PATCHujú rovnaké nastavenie `mcpEnabled` (a voliteľne `mcpTransport`),
ktoré dashboard prepína cez `/api/settings`. `mcp restart` volá `POST /api/mcp/restart`: ukončí
aktívne `sse`/`streamable-http` relácie, aby sa ďalšia požiadavka čisto reinicializovala, vráti
`409`, ak je MCP zakázané, a `501` pre `stdio` transport (klienti stdio spravujú svoj vlastný
podproces – neexistuje žiadny in-process handle na reštart).

## Transporty

MCP server vystavuje tri transporty, všetky podporené rovnakou továrenskou funkciou `createMcpServer()`:

| Transport         | Kde                                         | Kedy použiť                                                    |
| :---------------- | :------------------------------------------ | :------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | Integrácie IDE (Claude Desktop, Cursor, atď.)                  |
| `sse`             | `POST/GET /api/mcp/sse` cez `httpTransport` | Klienti prehliadača/agenta, ktorí potrebujú prúd udalostí      |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | HTTP klienti s viacerými reláciami (`mcp-session-id` hlavička) |

Aktívny HTTP transport (`sse` alebo `streamable-http`) sa vyberá nastavením `mcpTransport`. Prepínanie transportov zatvára existujúce relácie na druhom transporte.

### Vzdialený prístup (obídenie rozsahu spravovania)

`/api/mcp/*` je v úrovni LOCAL_ONLY (`src/server/authz/routeGuard.ts`) – predvolene k nemu majú prístup iba loopback hostitelia (`localhost`, `127.0.0.1`, `::1`). Od verzie v3.8.2 sa môžu pripojiť aj non-loopback klienti, ak predložia `Authorization: Bearer <api-key>`, ktorého kľúč obsahuje rozsah `manage`. Toto je jediný spôsob, ako sa dostať k vzdialenému MCP serveru cez tunel, reverznú proxy alebo verejný názov hostiteľa.

```bash
# Udeľte rozsah spravovania: otvorte stránku API kľúčov dashboardu a prepnite
# "Management Access" na kľúči, alebo POST scopes:["manage"] pri vytváraní.

# Potom sa pripojte zo vzdialeného MCP klienta:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Kľúč bez rozsahu spravovania (alebo bez Bearer) vráti `403 LOCAL_ONLY`. Súrodený prefix `/api/cli-tools/runtime/*` nie je zámerne obchádzateľný – pozrite si [Úrovne Route Guard – výnimka rozsahu spravovania](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Konfigurácia IDE

Pozrite si [Konfiguráciu klienta MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) pre nastavenie Claude Desktop,
Cursor, Cline a kompatibilného klienta MCP.

---

## Základné nástroje (14) — Fáza 1

| Nástroj                         | Rozsahy               | Popis                                                                                                                       |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Doba prevádzky, pamäť, ističe, obmedzenia rýchlosti, štatistiky vyrovnávacej pamäte                                         |
| `omniroute_list_combos`         | `read:combos`         | Všetky nakonfigurované kombinácie so stratégiami (voliteľné metriky)                                                        |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metriky výkonu pre konkrétnu kombináciu                                                                                     |
| `omniroute_switch_combo`        | `write:combos`        | Aktivovať alebo deaktivovať kombináciu                                                                                      |
| `omniroute_create_combo`        | `write:combos`        | Vytvoriť validovanú kombináciu prostredníctvom existujúceho API pre kombinácie                                              |
| `omniroute_check_quota`         | `read:quota`          | Použitá/celková kvóta, zostávajúce percento, čas resetu, stav tokenu                                                        |
| `omniroute_route_request`       | `execute:completions` | Poslať dokončenie chatu cez smerovanie OmniRoute                                                                            |
| `omniroute_cost_report`         | `read:usage`          | Správa o nákladoch podľa obdobia (relácia/deň/týždeň/mesiac)                                                                |
| `omniroute_list_models_catalog` | `read:models`         | Kompletný katalóg modelov s možnosťami, stavom, cenami                                                                      |
| `omniroute_radar_catalog`       | `read:radar`          | Lokálny podpísaný katalóg Radar; voliteľné filtre poskytovateľa/rodiny                                                      |
| `omniroute_tool_search`         | `read:tools`          | Objavte nástroje z registrovaného katalógu MCP                                                                              |
| `omniroute_web_search`          | `execute:search`      | Webové vyhľadávanie prostredníctvom nakonfigurovaných poskytovateľov vyhľadávania. Nie X/Twitter.                           |
| `omniroute_x_search`            | `execute:search`      | Vyhľadávať X cez xAI/SuperGrok, alebo zvoliť `xquik-search` pre výsledky Xquik API. Vyžaduje poverenia pre vybraný backend. |
| `omniroute_web_fetch`           | `execute:search`      | Načítať webový obsah prostredníctvom nakonfigurovaných poskytovateľov načítania                                             |

## Pokročilé nástroje (11) — Fáza 2

| Nástroj                            | Rozsahy                              | Popis                                                                                                                       |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulácia smerovania na nečisto so záložným stromom                                                                         |
| `omniroute_set_budget_guard`       | `write:budget`                       | Rozpočet relácie s akciou degradácie/blokovania/upozornenia                                                                 |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Aktualizácia stratégie kombinácie za behu (priorita/vážená/auto/atď.)                                                       |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Použiť predvoľbu odolnosti `agresívna` / `vyvážená` / `konzervatívna`                                                       |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Živý test každého poskytovateľa v kombinácii pomocou skutočného volania upstreamu                                           |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metriky pre jednotlivých poskytovateľov s latenciou p50/p95/p99 a stavom ističa                                             |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Odporučiť kombináciu podľa typu úlohy s obmedzeniami rozpočtu/latencie                                                      |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Vysvetliť, prečo bola požiadavka smerovaná k poskytovateľovi (faktory bodovania + záložné možnosti)                         |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Úplná snímka relácie: náklady, tokeny, najlepšie modely/poskytovatelia, chyby, ochrana rozpočtu                             |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnostikovať (a voliteľne automaticky opraviť) odchýlky databázy, ako sú poškodené referencie kombinácií / osamelé riadky |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synchronizovať údaje o cenách z externých zdrojov (LiteLLM); podporuje `dryRun`                                             |

## Nástroje pre vyrovnávaciu pamäť (2)

| Nástroj                 | Rozsahy       | Popis                                                                                    |
| :---------------------- | :------------ | :--------------------------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Štatistiky sémantickej vyrovnávacej pamäte, vyrovnávacej pamäte pre výzvy a idempotencie |
| `omniroute_cache_flush` | `write:cache` | Vyprázdniť vyrovnávaciu pamäť globálne alebo podľa podpisu/modelu                        |

## Nástroje pre kompresiu (13)

| Nástroj                             | Rozsahy             | Popis                                                                                                                                   |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Nastavenia kompresie, súhrn analýz a štatistiky s ohľadom na vyrovnávaciu pamäť (zahŕňa metadáta `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Konfigurovať režim kompresie, prah, cieľový pomer, zachovanie systémovej výzvy, prepínač kompresie popisu MCP                           |
| `omniroute_set_compression_engine`  | `write:compression` | Vybrať aktívny engine (vypnutý/caveman/rtk/stacked) a intenzitu Caveman/RTK                                                             |
| `omniroute_list_compression_combos` | `read:compression`  | Zoznam pomenovaných kompresných kombinácií a ich engine pipeline                                                                        |
| `omniroute_compression_combo_stats` | `read:compression`  | Analýzy zoskupené podľa kompresnej kombinácie a enginu                                                                                  |
| `omniroute_ccr_store`               | `write:compression` | Uložiť obsah izolovaný volajúcim do obmedzeného in-memory CCR úložiska a vrátiť značku plus referenciu `ccr://`                         |
| `omniroute_ccr_retrieve`            | `read:compression`  | Načítať obsah CCR v plnom rozsahu alebo s režimami head, tail, lines, grep a stats                                                      |
| `omniroute_ccr_inspect`             | `read:compression`  | Skontrolovať metadáta CCR vlastnené volajúcim bez vrátenia obsahu                                                                       |
| `omniroute_ccr_list`                | `read:compression`  | Zoznam stránkovaných metadát pre CCR bloky vlastnené volajúcim                                                                          |
| `omniroute_ccr_delete`              | `write:compression` | Odstrániť CCR blok vlastnený volajúcim                                                                                                  |
| `omniroute_ccr_stats`               | `read:compression`  | Nahlásiť využitie pamäte v rozsahu volajúceho, počítadlá životného cyklu a limity úložiska                                              |
| `omniroute_rtk_discover`            | `read:compression`  | Objaviť opakujúci sa šum vo vzorkách výstupu RTK s povolením                                                                            |
| `omniroute_rtk_learn`               | `read:compression`  | Generovať návrh RTK filtra na kontrolu zo vzoriek s povolením                                                                           |

Záznamy CCR sú iba v pamäti a po reštarte zmiznú. Každý blok je obmedzený na 2 MiB, každý princípál na 16 MiB a globálne úložisko na 64 MiB. Záznamy majú predvolenú TTL 24 hodín (maximálne sedem dní). Úplné načítanie MCP je obmedzené na 256 KiB; väčšie bloky zostávajú dostupné prostredníctvom režimov rozsahu a grep. Ukladanie, načítanie, zoznam, kontrola, mazanie a štatistiky sú izolované autentifikovaným princípálom API kľúča. Auditné záznamy obsahujú haše a metadáta veľkosti, nikdy nie obsah.

`omniroute_compression_status` hlási kompresiu popisu MCP samostatne pod
`analytics.mcpDescriptionCompression`. Tieto hodnoty sú odhady veľkosti metadát pre popisy MCP, ktoré je možné zoznamovať
(`tools`, `prompts`, `resources`, a `resourceTemplates`); nie sú to potvrdenia o použití poskytovateľa a sú označené `source: "mcp_metadata_estimate"`.

### Filter stromu prístupnosti MCP (v3.8.0)

Oddelene od vyššie uvedených kompresných nástrojov, OmniRoute obsahuje filter po vykonaní, ktorý komprimuje **výsledky nástrojov** prehliadačových/prístupnostných nástrojov MCP predtým, ako sú vrátené agentovi. Tento filter sám o sebe nie je nástrojom — beží transparentne na akomkoľvek výsledku nástroja, ktorý obsahuje rozsiahly text stromu prístupnosti alebo snímky prehliadača (≥2000 znakov).

Kľúčové správanie:

- Zbalí ≥30 po sebe idúcich opakujúcich sa súrodeneckých riadkov do súhrnu hlavy + chvosta
- Zachováva kotvy `[ref=eXX]` vyžadované Playwright/computer-use
- Nekompromisne skracuje nadrozmerný text (>50 000 znakov) s navigačnou nápovedou
- Očakávané úspory: **60–80%** na dátových balíkoch snímok prehliadača

Konfigurácia: `compression.mcpAccessibility` v globálnych nastaveniach (migrácia 056).
Implementácia: `open-sse/services/compression/engines/mcpAccessibility/`.
Kompletná dokumentácia: [Kompresné enginy — Filter stromu prístupnosti MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Pozrite si [Kompresné enginy](../compression/COMPRESSION_ENGINES.md) a [RTK kompresiu](../compression/RTK_COMPRESSION.md) pre
model kompresie za behu, ktorý stojí za týmito nástrojmi.

## Nástroje 1Proxy (3)

| Nástroj                     | Rozsahy        | Popis                                                                               |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Získať bezplatné proxy z trhoviska 1proxy (filtre protokolu/krajiny/kvality/limitu) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Získať ďalšie dostupné proxy podľa stratégie (`random` / `quality` / `sequential`)  |
| `omniroute_oneproxy_stats`  | `read:proxies` | Štatistiky fondu, stav synchronizácie, distribúcia podľa protokolu a krajiny        |

## Nástroje pamäte (3)

Definované v `open-sse/mcp-server/tools/memoryTools.ts`. Autentifikácia/rozsah je vynucovaný prostredníctvom štandardného MCP rozsahu.

| Nástroj                   | Rozsahy        | Popis                                                                                           |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Vyhľadávanie pamätí podľa dotazu / typu / API kľúča s vynútením rozpočtu tokenov                |
| `omniroute_memory_add`    | `write:memory` | Pridať nový záznam pamäte (`factual` / `episodic` / `procedural` / `semantic`)                  |
| `omniroute_memory_clear`  | `write:memory` | Vymazať pamäte pre API kľúč, voliteľne filtrované podľa typu alebo časovej pečiatky `olderThan` |

## Nástroje zručností (4)

Definované v `open-sse/mcp-server/tools/skillTools.ts`. Podporené `src/lib/skills/registry` + `src/lib/skills/executor`.

| Nástroj                       | Rozsahy          | Popis                                                                                                 |
| :---------------------------- | :--------------- | :---------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Zoznam registrovaných zručností s voliteľným filtrovaním podľa API kľúča, názvu alebo stavu povolenia |
| `omniroute_skills_enable`     | `write:skills`   | Povoliť alebo zakázať konkrétnu zručnosť podľa ID                                                     |
| `omniroute_skills_execute`    | `execute:skills` | Vykonanie zručnosti s poskytnutým vstupom a vrátenie záznamu vykonania                                |
| `omniroute_skills_executions` | `read:skills`    | Zoznam nedávnej histórie vykonávania zručností                                                        |

## Zdroj kontextu Notion (6)

Definované v `open-sse/mcp-server/tools/notionTools.ts`. Token uložený v tabuľke `key_value` prostredníctvom `src/lib/db/notion.ts`. REST klient v `src/lib/notion/api.ts`. API nastavení v `src/app/api/settings/notion/route.ts`. Používateľské rozhranie dashboardu v `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Nakonfigurujte svoj integračný token Notion z karty **Context Sources** v dashboarde Endpoint, alebo prostredníctvom REST API:

```bash
# Set token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Check status
curl http://localhost:20128/api/settings/notion

# Disconnect
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Nástroj                      | Rozsahy        | Popis                                                                 |
| :--------------------------- | :------------- | :-------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Fulltextové vyhľadávanie naprieč všetkými stránkami a databázami      |
| `notion_get_page`            | `read:notion`  | Získať stránku podľa ID s jej vlastnosťami                            |
| `notion_list_block_children` | `read:notion`  | Zoznam podradených blokov stránky alebo bloku                         |
| `notion_query_database`      | `read:notion`  | Dotazovanie databázy s filtrami, triedením a stránkovaním             |
| `notion_get_database`        | `read:notion`  | Získať schému databázy podľa ID                                       |
| `notion_append_blocks`       | `write:notion` | Pripojiť podradené bloky k nadradenému bloku (max. 100 na požiadavku) |

## Nástroje katalógu zručností agenta (3)

Definované v `open-sse/mcp-server/tools/agentSkillTools.ts`. Podporené `src/lib/agentSkills/catalog`. Tieto nástroje sprístupňujú 45-položkový katalóg zručností agenta klientom MCP a externým agentom. Rozsah: `read:catalog`.

| Nástroj                           | Rozsahy        | Popis                                                                                                                                              |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Zoznam všetkých 45 zručností agenta s voliteľnými filtrami `category` (api\|cli) a `area`; vracia metadáta + pokrytie                              |
| `omniroute_agent_skills_get`      | `read:catalog` | Získanie úplných metadát + obsahu SKILL.md pre jednu zručnosť podľa kanonického `id`                                                               |
| `omniroute_agent_skills_coverage` | `read:catalog` | Štatistiky pokrytia: koľko z 23 API, 21 CLI a 1 konfiguračných zručností má súbory SKILL.md v súborovom systéme oproti celkovým katalógovým údajom |

Úplný katalóg a spôsob, akým ho využívajú externí agenti, nájdete v [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## Súvisiace frameworky (v3.8.0)

Vyššie uvedený inventár nástrojov MCP (110 unikátnych nástrojov, vypočítaných pomocou `countUniqueMcpTools()`) je zámerne
obmedzený na operácie smerovania/cache/kompresie/pamäte/zručností/proxy/kontextového zdroja za behu. Dva susedné
frameworky sa dodávajú spolu so serverom MCP vo verzii v3.8.0 a sú dokumentované samostatne:

### Cloudoví agenti

Cloudoví agenti sú externí agenti AI kódovania (codex-cloud, cursor-cloud, devin, jules) zapojení do
OmniRoute prostredníctvom rovnakého modelu pripojenia, aký sa používa pre poskytovateľov LLM. Sú sprístupnení prostredníctvom
vlastného REST rozhrania (`/api/v1/agents/*`) a **nie sú** súčasťou katalógu nástrojov MCP
— volanie cloudového agenta nespotrebúva rozsah MCP.

- Implementácia: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Životný cyklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentácia: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails sú filtre pred/po vykonaní (vision-bridge, pii-masker, prompt-injection)
aplikované v rámci chatovacieho potrubia. Spúšťajú sa predtým, než sa dosiahne vrstva nástrojov/smerovania MCP
a emitujú štruktúrované porušenia do auditovacieho potrubia; nie sú vyvolané ako nástroje MCP.

- Implementácia: `src/lib/guardrails/`.
- Dokumentácia: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Pri ladení volania MCP, ktoré sa zdá byť zablokované, skontrolujte auditovací záznam MCP
(položky `scope_denied:*`) aj auditovaciu stopu guardrails — požiadavka môže byť odmietnutá
guardrailom **predtým**, než sa vôbec dostane do vrstvy vynucovania rozsahu MCP.

---

## REST API koncové body

| Koncový bod            | Metóda                | Popis                                                                                           | Autentifikácia         |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------- | :--------------------- |
| `/api/mcp/status`      | `GET`                 | Stav servera: heartbeat, stav HTTP transportu, súhrn auditovacej aktivity                       | Správa (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Katalóg nástrojov (názov, popis, rozsahy, fáza, zdrojové koncové body)                          | Správa                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transportný koncový bod (chránený `mcpEnabled` + `mcpTransport === "sse"`)                  | API kľúč + rozsahy     |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamovateľný HTTP transport (používa hlavičku `mcp-session-id`; `DELETE` ukončuje reláciu)    | API kľúč + rozsahy     |
| `/api/mcp/audit`       | `GET`                 | Záznamy auditu z `mcp_tool_audit` (filtre: `limit`, `offset`, `tool`, `success`, `apiKeyId`)    | Správa                 |
| `/api/mcp/audit/stats` | `GET`                 | Agregované štatistiky auditu (`totalCalls`, `successRate`, `avgDurationMs`, najlepšie nástroje) | Správa                 |

Zdrojové súbory: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Oba transporty SSE a Streamable HTTP sú zablokované, kým nie je server MCP povolený v Nastaveniach (`mcpEnabled`) a nie je vybraný príslušný `mcpTransport`. Ak je nakonfigurovaný nesprávny transport, cesta vráti HTTP 400 s nápovedou na zmenu nastavení.

---

## Autentifikácia a rozsahy

Nástroj MCP volá reťazce rozsahu čítania od volajúceho. Táto kontrola je jedným z troch nezávislých menných priestorov. Prechod jedným kontrolórom neznamená prechod ostatnými. Pravidlá sú [Tri menné priestory rozsahu](#tri-menné-priestory-rozsahu). Katalóg nástrojov je [Rozsahy nástrojov MCP](#rozsahy-nástrojov-mcp).

### Tri menné priestory rozsahu

`manage` na API kľúči, `read:compression` na nástroji MCP a `read` na prístupovom tokene `oma_live_…` sú tri rôzne oprávnenia. Volajúci, ktorí pošlú prístupový token `read` na mutujúcu správcovskú cestu, dostanú HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Táto úroveň je `scopeSatisfies`. Nekonzultuje tabuľku MCP a matcher MCP ju nekonzultuje.

| Menný priestor        | Poverenie                                                   | Kontrolór              | Prechod umožňuje                                              |
| :-------------------- | :---------------------------------------------------------- | :--------------------- | :------------------------------------------------------------ |
| Správa API kľúčov     | `api_keys.scopes`                                           | `hasManageScope`       | Správcovské REST pre daný Bearer kľúč                         |
| Aditívny API kľúč     | rovnaké pole, jeden presný reťazec                          | pomocná funkcia nižšie | Len táto jedna schopnosť                                      |
| Rozsahy nástrojov MCP | rovnaké pole, inak MCP `_meta`, inak `OMNIROUTE_MCP_SCOPES` | `scopeMatches`         | Tento nástroj, akonáhle je vynútenie zapnuté                  |
| Prístupový token      | `oma_live_…`                                                | `scopeSatisfies`       | Správcovská cesta, ktorej metóda a cesta vyžadujú túto úroveň |

Vytváranie každého poverenia je popísané v [Správa autentifikácie](../guides/MANAGEMENT-AUTH.md).

#### Rozsahy API kľúčov

Jedno pole `api_keys.scopes` slúži dvom úlohám. Používajú rôzne funkcie.

**Správcovské REST.** `manage` a `admin` sú členmi `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` je to, čo autorizuje správcovské cesty pre daný kľúč. `admin` je schopný správy na týchto cestách. Slovo `admin` tu nie je úroveň prístupového tokenu a nerozširuje sa na rozsahy nástrojov MCP.

**Aditívne reťazce.** Každý z nich je presný test členstva a každý z nich zostáva mimo `MANAGEMENT_API_KEY_SCOPES`.

| Rozsah                         | Prechod umožňuje                                                                                                                                                           |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Iba non-loopback `/api/mcp/` LOCAL_ONLY výnimka (`hasMcpConnectOrManageScope`). Kľúč s `manage` alebo `admin` stále prechádza touto výnimkou.                              |
| `self:usage`                   | `GET /api/v1/me/status` pre tento kľúč (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` pridáva tento rozsah pri vytváraní (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Kvóty účtu upstream v rámci tohto stavového užitočného zaťaženia (`src/lib/usage/apiKeySelfService.ts`). Stavová cesta stále vyžaduje `self:usage`.                        |
| `policy:bypass-provider-quota` | Volania inferencie tohto kľúča preskakujú politiku kvóty poskytovateľa (`hasProviderQuotaBypassScope` v `src/sse/handlers/chat.ts`).                                       |

#### Zhoda

Katalóg je tabuľka pod [Rozsahy nástrojov MCP](#rozsahy-nástrojov-mcp). Nepovažujte `MCP_SCOPE_LIST` v `src/shared/constants/mcpScopes.ts` za tento katalóg: je to pôvodná typovaná podmnožina. Neskôr nástroje deklarujú ďalšie rozsahy popri ňom (`read:notion`, `read:skills`, `read:local-corpus` a zvyšok tabuľky).

`evaluateToolScopes` v `open-sse/mcp-server/scopeEnforcement.ts` umožňuje volanie, keď každý požadovaný rozsah zodpovedá nejakému udelenému rozsahu:

- `*` zodpovedá každému požadovanému rozsahu.
- Udelený rozsah, ktorý končí na `*`, zodpovedá požadovanému rozsahu, ktorý začína predponou pred hviezdičkou. `read:*` zodpovedá `read:compression`.
- Každý iný udelený rozsah zodpovedá iba identickému požadovanému reťazcu.

Kľúč, ktorého rozsahy sú `["manage"]`, zlyhá `scopeMatches` pre `read:compression`. Rovnaké volanie zlyhá pre `admin`, `mcp:connect`, `read` a `write`, keď sú to jediné udelené reťazce. Medzi rozsahmi nástrojov MCP neexistuje žiadna hierarchia okrem koncovej `*`.

Vynútenie je vypnuté, pokiaľ `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (predvolené `false`). Keď je vypnuté, `evaluateToolScopes` povolí volanie a preskočí katalóg. Keď je zapnuté, HTTP používa `api_keys.scopes` Bearer kľúča ako `authInfo` (pozri [Viazanie rozsahu HTTP pre každý kľúč](#per-key-http-scope-binding-7895)). Keď sa nerozriešia žiadne rozsahy kľúčov, udelená sada prejde na MCP `_meta`, potom na `OMNIROUTE_MCP_SCOPES`.

#### Rozsahy prístupových tokenov

Tokeny `oma_live_…` (`src/lib/accessTokens/scopes.ts`) nesú `read`, `write` alebo `admin`. `scopeSatisfies` je úroveň: `admin` pokrýva `write` a `read`, a `write` pokrýva `read`. Neznáme rozsahy nepokrývajú nič.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) porovnáva túto úroveň s `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` a `OPTIONS` vyžadujú `read`.
- Každá iná metóda vyžaduje `write`.
- Cesty v `ADMIN_SCOPE_PREFIXES` vyžadujú `admin` pre každú metódu. `/api/mcp` je na tomto zozname, takže prístupový token `write` stále nemôže volať povrch MCP HTTP.
- Cesty v `ADMIN_MUTATION_PREFIXES` vyžadujú `admin` iba pre mutácie.

`PATCH /api/keys/{id}` je mutácia a nie je na týchto administrátorských zoznamoch, takže token s právom
`read` dostane 403
`Rozsah prístupového tokenu 'read' je nedostatočný; vyžaduje sa 'write'.`
Prístupový token s právom `write` alebo `admin` vyhovuje tejto ceste. JWT z dashboardu, token machine-id z loopback CLI a API kľúč s právom `manage` alebo `admin` idú inými vetvami a nie sú obmedzené touto úrovňou.

Prístupový token, ktorý prejde `scopeSatisfies` pre `/api/mcp`, prešiel iba manažérskou bránou. Volania nástrojov stále spúšťajú `scopeMatches` proti rozsahom API kľúčov. Úroveň prístupového tokenu nie je vstupom pre `scopeMatches`.

### Rozsahy nástrojov MCP

Vynucovanie rozsahu je centralizované v `open-sse/mcp-server/scopeEnforcement.ts`.
Každý nástroj vyžaduje špecifické rozsahy:

| Rozsah                | Nástroje                                                                                                                                                                               |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                      |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                              |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                 |
| `read:quota`          | `check_quota`                                                                                                                                                                          |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                 |
| `read:models`         | `list_models_catalog`                                                                                                                                                                  |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                          |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                  |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                     |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                            |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                         |
| `read:cache`          | `cache_stats`                                                                                                                                                                          |
| `write:cache`         | `cache_flush`                                                                                                                                                                          |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                             |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                      |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                  |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                       |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                 |
| `read:memory`         | `memory_search`                                                                                                                                                                        |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                           |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                     |
| `write:skills`        | `skills_enable`                                                                                                                                                                        |
| `execute:skills`      | `skills_execute`                                                                                                                                                                       |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                       |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                              |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                       |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                         |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                     |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                        |
| `read:obsidian`       | 13 nástrojov na čítanie — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 nástrojov na zápis — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                  |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                      |

Podporované sú zástupné rozsahy (wildcard scopes): `read:*` udeľuje všetky rozsahy na čítanie, `*` udeľuje plný prístup.

### `mcp:connect` — úzka schopnosť smerovania (#7895)

Prístup k HTTP/SSE MCP transportu (`/api/mcp/*`) z iného než loopback rozhrania vyžaduje výnimku `/api/mcp/` LOCAL_ONLY (pozri `docs/security/ROUTE_GUARD_TIERS.md`). Historicky táto výnimka akceptovala iba API kľúč s plným rozsahom `manage`/`admin` — príliš široký pre volajúceho, ktorý potrebuje komunikovať iba s MCP. Súbor `src/shared/constants/managementScopes.ts` teraz exportuje `MCP_CONNECT_SCOPE = "mcp:connect"`: aditívny, úzky rozsah (rovnaký precedens ako `SELF_USAGE_SCOPE`), ktorý autorizuje IBA obchádzanie `/api/mcp/` v `src/server/authz/policies/management.ts` — neudeľuje žiadny iný prístup k manažérskym trasám a je zámerne vynechaný z `MANAGEMENT_API_KEY_SCOPES`. Kľúč s `manage`/`admin` stále prechádza výnimkou nezmenený; `mcp:connect` je alternatíva s nižšími oprávneniami pre vzdialených volajúcich iba pre MCP, kontrolovaná pomocou `hasMcpConnectOrManageScope()`.

### Viazať HTTP rozsah pre každý kľúč (#7895)

Cez HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` teraz rieši skutočné `api_keys.scopes` volajúceho prostredníctvom `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) a odovzdáva ich do `transport.handleRequest(req, { authInfo })` MCP SDK, takže `extra.authInfo.scopes` dosahujúce každé volanie nástroja odráža vlastné rozsahy Bearer kľúča. `resolveCallerScopeContext()` v `scopeEnforcement.ts` už uprednostňovalo `authInfo` pred `_meta` a záložným prostredím `OMNIROUTE_MCP_SCOPES` — toto iba napĺňa tento prvý, najvyššie prioritný zdroj, ktorý predtým nebol cez HTTP naplnený. Keď sa žiadny API kľúč nevyrieši (žiadna hlavička, neplatný kľúč), `authInfo` zostáva `undefined` a riešenie prechádza na existujúci reťazec `meta`/env nezmenené. Toto NEPREPÍNA predvolenú hodnotu `OMNIROUTE_MCP_ENFORCE_SCOPES` — vynútenie musí byť stále explicitne povolené; táto zmena iba zabezpečuje, že cesta pre každý kľúč má prednosť, keď je povolená. stdio nemá identitu pre každého volajúceho (pozri `mcpCallerIdentity.ts`) a je nedotknuté — zostáva na záložnom reťazci `_meta`/env.

---

## Premenné prostredia

| Premenná                                | Predvolené nastavenie              | Účel                                                                                                                                               |
| :-------------------------------------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`           | Základná URL, ktorú používa server MCP pri volaní interných API OmniRoute                                                                          |
| `OMNIROUTE_API_KEY`                     | (prázdne)                          | API kľúč preposlaný ako `Authorization: Bearer` pre volania interných API                                                                          |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (aktivuje sa iba `"true"`) | Ak je povolené, chýbajúce rozsahy zamietnu volania nástrojov a zaznamenajú `scope_denied:<reason>` do auditného záznamu                            |
| `OMNIROUTE_MCP_SCOPES`                  | (prázdne)                          | Zoznam povolených rozsahov oddelených čiarkami, ktoré sú predvolene považované za „dostupné“ (používa sa, keď volajúci neposkytne vlastné rozsahy) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nenastavené = zapnuté)            | Ak je nastavené na `0/false/off/no`, zakáže kompresiu popisu MCP v čase registrácie                                                                |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nenastavené = zapnuté)            | Alternatívny alias pre rovnaký prepínač ako vyššie                                                                                                 |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                            | Rozpočet na prerušenie pre interné riadiace čítania (zdravie, odolnosť, kombinácie, kvóta, využitie)                                               |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                            | Rozpočet na prerušenie pre skoky, ktoré čakajú na poskytovateľa (`route_request`, `web_search`, `web_fetch`)                                       |
| `MCP_TOOL_DENY`                         | (nenastavené = bez filtra)         | Názvy nástrojov oddelené čiarkami, ktoré sa majú odstrániť z `tools/list` (redukcia kardinality nástrojov – viď nižšie)                            |
| `MCP_TOOL_ALLOW`                        | (nenastavené = bez filtra)         | Názvy nástrojov oddelené čiarkami, ktoré sa majú výhradne ponechať (režim zoznamu povolených – viď nižšie)                                         |
| `DATA_DIR`                              | `~/.omniroute`                     | Súbor heartbeat sa zapisuje do `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                            |

---

## Kompresia popisu

Registry nástrojov, výziev a zdrojov MCP môžu komprimovať popisy v čase registrácie/zoznamu, aby sa zmenšila stopa metadát vystavených klientom (a tým aj náklady na kontext výzvy). Implementácia sa nachádza v `open-sse/mcp-server/descriptionCompressor.ts` a je zapojená do servera MCP prostredníctvom `compressMcpRegistryMetadata` v rámci `createMcpServer()`.

- Kompresia prebieha nad textom popisu pomocou súboru pravidiel Caveman (`getRulesForContext("all", "full")`) s extrakciou zachovaných blokov (rozsahy kódu, ohradené bloky atď.), takže štrukturálny obsah sa nemení.
- Prepínanie pre každé nasadenie prostredníctvom hodnoty `compression.mcpDescriptionCompressionEnabled` v tabuľke nastavení `key_value` (predvolené: povolené) – zobrazené v používateľskom rozhraní ako **Analytics → MCP description compression**.
- Prepínanie v rámci celého procesu prostredníctvom `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` alebo `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Štatistiky v reálnom čase sú zverejnené prostredníctvom `omniroute_compression_status` pod `analytics.mcpDescriptionCompression` a označené `source: "mcp_metadata_estimate"`, aby sa odlíšili od skutočných potvrdení o použití poskytovateľa.

---

## Redukcia Kardinality Nástrojov (F4.3)

Kompresia popisu zmenšuje metadáta každého nástroja; **redukcia kardinality nástrojov** ide o krok ďalej tým, že znižuje _počet_ oznamovaných nástrojov. Inzerovanie menšieho počtu nástrojov v manifeste `tools/list` znižuje náklady na tokeny na požiadavku, ktoré model klienta platí za katalóg nástrojov (kompresia "vrstvy 5"). Implementácia je čistý, bezstavový filter v `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), zapojený do registračnej slučky v `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Voliteľné, predvolene vypnuté.** Filter sa spustí len vtedy, ak je nastavená aspoň jedna z dvoch premenných prostredia; ak nie je nastavená žiadna, všetkých 110 nástrojov sa oznámi nezmenených.

| Premenná         | Režim                                                                                          |
| :--------------- | :--------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Blacklist — názvy nástrojov oddelené čiarkami, ktoré sú vždy vynechané z `tools/list`          |
| `MCP_TOOL_ALLOW` | Allow-list — názvy nástrojov oddelené čiarkami; prežijú len tieto, všetko ostatné je vynechané |

`deny` má prednosť pred `allow`. Názvy sú oddelené čiarkami, orezané a prázdne záznamy sú ignorované. Príklady:

```bash
# Vynechajte dva nástroje z katalógu
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Oznamujte iba nástroje pre smerovanie + kvóty (režim allow-list)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Ako sa odstraňujú filtrované nástroje:** registrácia vždy prebehne úspešne; nástroj, ktorý profil odmietne, je potom `.disable()`nutý na rukoväti MCP SDK, takže sa nikdy neobjaví v `tools/list`, ale zapojenie zostáva nedotknuté (čisté povolenie/zakázanie, žiadna opätovná registrácia). Parser profilu je `readMcpToolProfileFromEnv(process.env)`, ktorý vráti `null` (žiadne filtrovanie), keď sú obe premenné prázdne.

Bohatší tvar `ToolProfile` za `reduceToolManifest` tiež podporuje filtrovanie priesečníkov rozsahov (`allowScopes`, s wildcard zhodou v štýle `read:*`) a deterministický limit `maxTools`, ale tieto dva ovládače potrebujú kompletný manifest v čase registrácie a **nie sú** dnes vystavené prostredníctvom premenných prostredia (háčik na úrovni `tools/list` je sledovaný ako ďalší krok). `estimateManifestTokens()` je k dispozícii na porovnanie nákladov na tokeny manifestu pred a po redukcii.

---

## Heartbeat za Behu

Transport stdio udržiava životaschopnosť v `${DATA_DIR}/runtime/mcp-heartbeat.json` každých 5 sekúnd. Dashboard (`/api/mcp/status`) číta tento súbor plus životaschopnosť PID na odvodenie `online`. HTTP transporty namiesto toho hlásia stav z in-process `getMcpHttpStatus()` (žiadny zápis do súboru).

Snímka heartbeat obsahuje:

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

## Auditné Logovanie

Každé volanie nástroja je zaznamenané do tabuľky SQLite `mcp_tool_audit` pomocou `open-sse/mcp-server/audit.ts`:

- Názov nástroja, argumenty (hashované/skrátené podľa `auditLevel` pre daný nástroj), výsledok
- Trvanie v ms, príznak úspechu/zlyhania, chybové hlásenie (ak je relevantné)
- Hash API kľúča, časová pečiatka
- Odmietnutia rozsahu sú zaznamenané ako `scope_denied:<reason>` so zoznamom chýbajúcich rozsahov

Použite dashboard alebo REST koncové body `/api/mcp/audit` a `/api/mcp/audit/stats` na kontrolu nedávnych volaní.

## Súbory

| Súbor                                                                    | Účel                                                                    |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP server továreň, vstupný bod stdio, registrácie nástrojov s rozsahom |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamovateľný HTTP transport (správa relácií)                    |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Vyhodnocovanie rozsahu nástrojov a rozlíšenie volajúceho                |
| `open-sse/mcp-server/audit.ts`                                           | Auditné logovanie volaní nástrojov (`mcp_tool_audit`)                   |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Zapisovač heartbeatov stdio (`mcp-heartbeat.json`)                      |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kompresia popisov pre registre nástrojov / promptov / zdrojov           |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod schémy + register nástrojov (`MCP_TOOLS`, 45 záznamov)              |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Fáza 2 + cache + obsluhy nástrojov 1proxy                               |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Obsluhy kompresných nástrojov                                           |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definície pamäťových nástrojov (3 nástroje)                             |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definície nástrojov zručností (4 nástroje)                              |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definície nástrojov zdroja kontextu Notion (6 nástrojov)                |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definície nástrojov gamifikácie (8 nástrojov)                           |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Nástroje na registráciu a správu pluginov (8 nástrojov)                 |
| `src/app/api/mcp/status/route.ts`                                        | Endpoint `/api/mcp/status`                                              |
| `src/app/api/mcp/tools/route.ts`                                         | Endpoint `/api/mcp/tools`                                               |
| `src/app/api/mcp/sse/route.ts`                                           | Trasa SSE transportu `/api/mcp/sse`                                     |
| `src/app/api/mcp/stream/route.ts`                                        | Trasa streamovateľného HTTP transportu `/api/mcp/stream`                |
| `src/app/api/mcp/audit/route.ts`                                         | Dopyt na auditný log `/api/mcp/audit`                                   |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Agregované auditné metriky `/api/mcp/audit/stats`                       |
| `src/lib/notion/api.ts`                                                  | Klient Notion REST API (opakovanie, časový limit, klasifikácia chýb)    |
| `src/lib/db/notion.ts`                                                   | Perzistencia Notion tokenov (tabuľka `key_value`)                       |
| `src/app/api/settings/notion/route.ts`                                   | Notion API nastavení (GET/POST/DELETE)                                  |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI pre správu Notion tokenov                                            |
| `tests/unit/notion-api.test.ts`                                          | Testy klienta Notion API (7)                                            |
| `tests/unit/notion-tools.test.ts`                                        | Testy vynucovania rozsahu Notion nástrojov (10)                         |
| `tests/unit/db/notion.test.mjs`                                          | Testy modulu Notion DB (3)                                              |
