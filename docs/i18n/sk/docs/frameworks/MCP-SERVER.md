# OmniRoute MCP Server Documentation (Slovenčina)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server Model Context Protocol so 110 nástrojmi pre operácie smerovania, vyrovnávacej pamäte, kompresie, pamäte, zručností, proxy, fondu, Radaru a zdrojov kontextu.
>
> Zdroj pravdy: `open-sse/mcp-server/server.ts` vypočítava pomocou `countUniqueMcpTools()` **110 jedinečných nástrojov**: 45 kanonických definícií (vrátane šiestich nástrojov životného cyklu CCR, trojice agent-skills, `omniroute_radar_catalog` a `omniroute_x_search`) plus pamäť (3), zručnosti (4), zručnosti GitHubu (3), fond (6), gamifikácia (8), pluginy (8), Notion (6), Obsidian (22), lokálny korpus (3) a dva kompresné nástroje určené iba pre RTK.

## Inštalácia

OmniRoute MCP je zabudovaný. Spustíte ho pomocou:

```bash
omniroute --mcp
```

Alebo prostredníctvom transportu open-sse:

```bash
# Streamovateľný transport HTTP (port 20130)
omniroute --dev  # MCP sa automaticky spustí na koncovom bode /mcp
```

Transporty HTTP (`sse` / `streamable-http`, obsluhované priamo procesom servera riadiaceho panela) sú
predvolene vypnuté a predtým ich bolo možné prepínať iba na stránke `/dashboard/mcp`. Od verzie v3.8.51
ponúka CLI rovnaké možnosti:

```bash
omniroute mcp status                                  # stav zapnutia/online, transport, počet nástrojov
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resetuje aktívne relácie sse/streamable-http
```

`mcp enable`/`mcp disable` upravujú pomocou požiadavky PATCH rovnaké nastavenie `mcpEnabled` (a voliteľne `mcpTransport`),
ktoré riadiaci panel prepína prostredníctvom `/api/settings`. `mcp restart` volá `POST /api/mcp/restart`: ukončí
aktívne relácie `sse`/`streamable-http`, aby sa nasledujúca požiadavka znova inicializovala bez problémov, vráti
`409`, ak je MCP vypnutý, a `501` pre transport `stdio` (klienti stdio vlastnia svoj vlastný
podproces — neexistuje žiadny obslužný objekt v rámci procesu, ktorý by bolo možné reštartovať).

## Transporty

Server MCP poskytuje tri transporty, pričom všetky používajú rovnakú factory funkciu `createMcpServer()`:

| Transport         | Kde                                         | Kedy použiť                                                    |
| :---------------- | :------------------------------------------ | :------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | Integrácie IDE (Claude Desktop, Cursor atď.)                   |
| `sse`             | `POST/GET /api/mcp/sse` cez `httpTransport` | Klienti prehliadača/agenta, ktorí potrebujú tok udalostí       |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | HTTP klienti s viacerými reláciami (hlavička `mcp-session-id`) |

Aktívny transport HTTP (`sse` alebo `streamable-http`) sa vyberá nastavením `mcpTransport`. Prepnutím transportov sa zatvoria existujúce relácie druhého transportu.

### Vzdialený prístup (obídenie pomocou rozsahu manage)

`/api/mcp/*` patrí do úrovne LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — predvolene k nemu môžu pristupovať iba hostitelia spätnej slučky (`localhost`, `127.0.0.1`, `::1`). Od verzie v3.8.2 sa môžu pripojiť aj klienti mimo spätnej slučky, ak uvedú hlavičku `Authorization: Bearer <api-key>`, ktorej kľúč má rozsah `manage`. Toto je jediný spôsob prístupu k vzdialenému serveru MCP cez tunel, reverzný proxy server alebo verejný názov hostiteľa.

```bash
# Udelenie rozsahu manage: otvorte stránku API Keys riadiaceho panela a prepnite
# možnosť „Management Access“ pre daný kľúč alebo pri vytváraní odošlite pomocou POST scopes:["manage"].

# Potom sa pripojte zo vzdialeného klienta MCP:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Kľúč bez rozsahu `manage` (alebo bez schémy Bearer) vráti `403 LOCAL_ONLY`. Súvisiaci prefix `/api/cli-tools/runtime/*` zámerne NIE JE možné obísť — pozrite si [Úrovne ochrany trás — výnimka pre rozsah manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Konfigurácia IDE

Informácie o nastavení klientov Claude Desktop, Cursor, Cline a kompatibilných klientov MCP nájdete v časti [Konfigurácia klienta MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration).

---

## Základné nástroje (14) — 1. fáza

| Nástroj                         | Rozsahy               | Popis                                                                                                                                                          |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Doba prevádzky, pamäť, ističe, limity požiadaviek, štatistiky vyrovnávacej pamäte                                                                              |
| `omniroute_list_combos`         | `read:combos`         | Všetky nakonfigurované kombinácie so stratégiami (voliteľne aj metriky)                                                                                        |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metriky výkonu konkrétnej kombinácie                                                                                                                           |
| `omniroute_switch_combo`        | `write:combos`        | Aktivácia alebo deaktivácia kombinácie                                                                                                                         |
| `omniroute_create_combo`        | `write:combos`        | Vytvorenie overenej kombinácie prostredníctvom existujúceho rozhrania API pre kombinácie                                                                       |
| `omniroute_check_quota`         | `read:quota`          | Využitá/celková kvóta, zostávajúce percentá, čas obnovenia, stav tokenu                                                                                        |
| `omniroute_route_request`       | `execute:completions` | Odoslanie požiadavky na dokončenie chatu prostredníctvom smerovania OmniRoute                                                                                  |
| `omniroute_cost_report`         | `read:usage`          | Prehľad nákladov podľa obdobia (relácia/deň/týždeň/mesiac)                                                                                                     |
| `omniroute_list_models_catalog` | `read:models`         | Úplný katalóg modelov s funkciami, stavom a cenami                                                                                                             |
| `omniroute_radar_catalog`       | `read:radar`          | Lokálny podpísaný katalóg Radar; voliteľné filtre podľa poskytovateľa/rodiny                                                                                   |
| `omniroute_tool_search`         | `read:tools`          | Vyhľadávanie nástrojov v zaregistrovanom katalógu MCP                                                                                                          |
| `omniroute_web_search`          | `execute:search`      | Vyhľadávanie na webe prostredníctvom nakonfigurovaných poskytovateľov vyhľadávania. Nie na X/Twitteri.                                                         |
| `omniroute_x_search`            | `execute:search`      | Vyhľadávanie na X prostredníctvom xAI/SuperGrok alebo výber `xquik-search` pre výsledky rozhrania Xquik API. Vyžaduje prihlasovacie údaje pre vybraný backend. |
| `omniroute_web_fetch`           | `execute:search`      | Načítanie webového obsahu prostredníctvom nakonfigurovaných poskytovateľov načítania                                                                           |

## Pokročilé nástroje (11) — Fáza 2

| Nástroj                            | Rozsahy                              | Popis                                                                                                                           |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulácia smerovania nanečisto so stromom záložných možností                                                                    |
| `omniroute_set_budget_guard`       | `write:budget`                       | Rozpočet relácie s akciou zníženia kvality/blokovania/upozornenia                                                               |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Aktualizácia stratégie kombinácie počas behu (prioritná/vážená/automatická/atď.)                                                |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Použitie predvoľby odolnosti `aggressive` / `balanced` / `conservative`                                                         |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Živý test každého poskytovateľa v kombinácii pomocou skutočného volania nadradenej služby                                       |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metriky jednotlivých poskytovateľov s latenciou p50/p95/p99 a stavom ističa                                                     |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Odporúčanie kombinácie podľa typu úlohy s obmedzeniami rozpočtu/latencie                                                        |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Vysvetlenie, prečo bola požiadavka smerovaná k poskytovateľovi (faktory hodnotenia + záložné možnosti)                          |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Úplná snímka relácie: náklady, tokeny, hlavné modely/poskytovatelia, chyby, ochrana rozpočtu                                    |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnostika (a voliteľná automatická oprava) nekonzistencií databázy, napr. nefunkčných odkazov na kombinácie/osirelých riadkov |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synchronizácia cenových údajov z externých zdrojov (LiteLLM); podporuje `dryRun`                                                |

## Nástroje vyrovnávacej pamäte (2)

| Nástroj                 | Rozsahy       | Popis                                                                                   |
| :---------------------- | :------------ | :-------------------------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Štatistiky sémantickej vyrovnávacej pamäte, vyrovnávacej pamäte promptov a idempotencie |
| `omniroute_cache_flush` | `write:cache` | Vyprázdnenie vyrovnávacej pamäte globálne alebo podľa podpisu/modelu                    |

## Nástroje kompresie (13)

| Nástroj                             | Rozsahy             | Popis                                                                                                                                      |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Nastavenia kompresie, súhrn analytiky a štatistiky zohľadňujúce vyrovnávaciu pamäť (zahŕňa metadáta `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Konfigurácia režimu kompresie, prahovej hodnoty, cieľového pomeru, zachovania systémového promptu a prepínača kompresie popisov MCP        |
| `omniroute_set_compression_engine`  | `write:compression` | Výber aktívneho mechanizmu (off/caveman/rtk/stacked) a intenzity Caveman/RTK                                                               |
| `omniroute_list_compression_combos` | `read:compression`  | Zoznam pomenovaných kombinácií kompresie a ich reťazcov mechanizmov                                                                        |
| `omniroute_compression_combo_stats` | `read:compression`  | Analytika zoskupená podľa kombinácie kompresie a mechanizmu                                                                                |
| `omniroute_ccr_store`               | `write:compression` | Uloženie obsahu izolovaného podľa volajúceho do kapacitne obmedzeného úložiska CCR v pamäti a vrátenie značky spolu s odkazom `ccr://`     |
| `omniroute_ccr_retrieve`            | `read:compression`  | Načítanie úplného obsahu CCR alebo jeho časti pomocou režimov začiatku, konca, riadkov, grep a štatistík                                   |
| `omniroute_ccr_inspect`             | `read:compression`  | Kontrola metadát CCR vlastnených volajúcim bez vrátenia obsahu                                                                             |
| `omniroute_ccr_list`                | `read:compression`  | Zoznam stránkovaných metadát blokov CCR vlastnených volajúcim                                                                              |
| `omniroute_ccr_delete`              | `write:compression` | Odstránenie bloku CCR vlastneného volajúcim                                                                                                |
| `omniroute_ccr_stats`               | `read:compression`  | Hlásenie využitia pamäte v rozsahu volajúceho, počítadiel životného cyklu a limitov úložiska                                               |
| `omniroute_rtk_discover`            | `read:compression`  | Zisťovanie opakujúceho sa šumu vo vzorkách výstupu RTK zahrnutých na základe súhlasu                                                       |
| `omniroute_rtk_learn`               | `read:compression`  | Vygenerovanie návrhu filtra RTK na kontrolu zo vzoriek zahrnutých na základe súhlasu                                                       |

Položky CCR sa uchovávajú iba v pamäti a po reštarte zmiznú. Každý blok je obmedzený na 2 MiB, každý
principál na 16 MiB a globálne úložisko na 64 MiB. Predvolená hodnota TTL položiek je 24 hodín (maximum
je sedem dní). Úplné načítanie cez MCP je obmedzené na 256 KiB; väčšie bloky zostávajú dostupné prostredníctvom
režimov rozsahu a grep. Ukladanie, načítanie, zobrazovanie zoznamu, kontrola, odstraňovanie a štatistiky sú izolované podľa
principálu autentizovaného kľúča API. Záznamy auditu obsahujú haše a metadáta o veľkosti, nikdy nie obsah.

`omniroute_compression_status` uvádza kompresiu popisov MCP samostatne v časti
`analytics.mcpDescriptionCompression`. Tieto hodnoty predstavujú odhady veľkosti metadát pre
popisy MCP, ktoré možno zobraziť v zozname (`tools`, `prompts`, `resources` a `resourceTemplates`);
nejde o záznamy o využití poskytovateľa a sú označené pomocou `source: "mcp_metadata_estimate"`.

### Filter stromu prístupnosti MCP (v3.8.0)

Nezávisle od vyššie uvedených nástrojov na kompresiu obsahuje OmniRoute filter po vykonaní, ktorý
komprimuje **výsledky nástrojov** prehliadača/prístupnosti MCP pred ich vrátením agentovi.
Tento filter nie je sám osebe nástrojom — transparentne sa spúšťa pri každom výsledku nástroja,
ktorý obsahuje podrobný text stromu prístupnosti alebo snímky prehliadača (≥2000 znakov).

Kľúčové správanie:

- Zbalí ≥30 po sebe nasledujúcich opakujúcich sa súrodeneckých riadkov do súhrnu začiatku a konca
- Zachová kotvy `[ref=eXX]` vyžadované nástrojmi Playwright/computer-use
- Natvrdo skráti príliš veľký text (>50,000 znakov) a pridá navigačnú nápovedu
- Očakávaná úspora: **60–80 %** pri dátach snímok prehliadača

Konfigurácia: `compression.mcpAccessibility` v globálnych nastaveniach (migrácia 056).
Implementácia: `open-sse/services/compression/engines/mcpAccessibility/`.
Úplná dokumentácia: [Kompresné mechanizmy — filter stromu prístupnosti MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Informácie o modeli kompresie za behu, ktorý používajú tieto nástroje, nájdete v dokumentoch
[Kompresné mechanizmy](../compression/COMPRESSION_ENGINES.md) a [Kompresia RTK](../compression/RTK_COMPRESSION.md).

## Nástroje 1Proxy (3)

| Nástroj                     | Rozsahy        | Popis                                                                                             |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Načítanie bezplatných proxy serverov z trhoviska 1proxy (filtre protokolu/krajiny/kvality/limitu) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Získanie ďalšieho dostupného proxy servera podľa stratégie (`random` / `quality` / `sequential`)  |
| `omniroute_oneproxy_stats`  | `read:proxies` | Štatistiky fondu, stav synchronizácie a distribúcia podľa protokolu a krajiny                     |

## Nástroje pamäte (3)

Definované v `open-sse/mcp-server/tools/memoryTools.ts`. Autorizácia/rozsah sa presadzuje prostredníctvom štandardného mechanizmu rozsahov MCP.

| Nástroj                   | Rozsahy        | Popis                                                                                                        |
| :------------------------ | :------------- | :----------------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Vyhľadávanie záznamov v pamäti podľa dotazu / typu / kľúča API s dodržaním limitu tokenov                    |
| `omniroute_memory_add`    | `write:memory` | Pridanie nového záznamu do pamäte (`factual` / `episodic` / `procedural` / `semantic`)                       |
| `omniroute_memory_clear`  | `write:memory` | Vymazanie záznamov v pamäti pre kľúč API, voliteľne filtrovaných podľa typu alebo časovej značky `olderThan` |

## Nástroje zručností (4)

Definované v `open-sse/mcp-server/tools/skillTools.ts`. Využívajú `src/lib/skills/registry` + `src/lib/skills/executor`.

| Nástroj                       | Rozsahy          | Popis                                                                                                     |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Zobrazenie registrovaných zručností s voliteľným filtrovaním podľa kľúča API, názvu alebo stavu povolenia |
| `omniroute_skills_enable`     | `write:skills`   | Povolenie alebo zakázanie konkrétnej zručnosti podľa ID                                                   |
| `omniroute_skills_execute`    | `execute:skills` | Vykonanie zručnosti so zadaným vstupom a vrátenie záznamu o vykonaní                                      |
| `omniroute_skills_executions` | `read:skills`    | Zobrazenie nedávnej histórie vykonaní zručností                                                           |

## Zdroj kontextu Notion (6)

Definované v `open-sse/mcp-server/tools/notionTools.ts`. Token je uložený v tabuľke `key_value` prostredníctvom `src/lib/db/notion.ts`. Klient REST sa nachádza v `src/lib/notion/api.ts`. API nastavení sa nachádza v `src/app/api/settings/notion/route.ts`. Používateľské rozhranie ovládacieho panela sa nachádza v `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Nakonfigurujte token integrácie Notion na karte **Zdroje kontextu** v ovládacom paneli koncového bodu alebo prostredníctvom API REST:

```bash
# Nastavenie tokenu
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Kontrola stavu
curl http://localhost:20128/api/settings/notion

# Odpojenie
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Nástroj                      | Rozsahy        | Popis                                                                    |
| :--------------------------- | :------------- | :----------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Fulltextové vyhľadávanie vo všetkých stránkach a databázach              |
| `notion_get_page`            | `read:notion`  | Získanie stránky podľa ID spolu s jej vlastnosťami                       |
| `notion_list_block_children` | `read:notion`  | Zobrazenie podradených blokov stránky alebo bloku                        |
| `notion_query_database`      | `read:notion`  | Dopytovanie databázy pomocou filtrov, zoradenia a stránkovania           |
| `notion_get_database`        | `read:notion`  | Získanie schémy databázy podľa ID                                        |
| `notion_append_blocks`       | `write:notion` | Pridanie podradených blokov k nadradenému bloku (max. 100 na požiadavku) |

## Nástroje katalógu Agent Skill (3)

Definované v `open-sse/mcp-server/tools/agentSkillTools.ts`. Podporované modulom `src/lib/agentSkills/catalog`. Tieto nástroje sprístupňujú klientom MCP a externým agentom katalóg dokumentácie Agent Skills so 45 položkami. Rozsah: `read:catalog`.

| Nástroj                           | Rozsahy        | Popis                                                                                                                                                                       |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Zobrazí všetkých 45 zručností agentov s voliteľnými filtrami `category` (api\|cli) a `area`; vráti metadáta + pokrytie                                                      |
| `omniroute_agent_skills_get`      | `read:catalog` | Získa úplné metadáta + obsah SKILL.md pre jednu zručnosť podľa kanonického `id`                                                                                             |
| `omniroute_agent_skills_coverage` | `read:catalog` | Štatistiky pokrytia: koľko z 23 zručností API, 21 zručností CLI a 1 konfiguračnej zručnosti má v súborovom systéme súbory SKILL.md v porovnaní s celkovým počtom v katalógu |

Úplný katalóg a spôsob, akým ho používajú externí agenti, nájdete v súbore [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## Súvisiace frameworky (v3.8.0)

Vyššie uvedený inventár nástrojov MCP (110 jedinečných nástrojov, vypočítaných pomocou `countUniqueMcpTools()`) je zámerne
obmedzený na operácie smerovania za behu, vyrovnávacej pamäte, kompresie, pamäte, zručností, proxy a zdrojov kontextu. Spolu
so serverom MCP sa vo verzii v3.8.0 dodávajú dva súvisiace frameworky, ktoré sú zdokumentované samostatne:

### Cloud Agents

Cloud Agents sú externé AI agenty na programovanie spúšťané mimo procesu (codex-cloud, cursor-cloud, devin, jules), ktoré sú prepojené
s OmniRoute prostredníctvom rovnakého modelu pripojenia, aký sa používa pre poskytovateľov LLM. Sú sprístupnené cez
vlastné rozhranie REST (`/api/v1/agents/*`) a **nie sú** súčasťou katalógu nástrojov MCP
— volanie Cloud Agent nespotrebúva rozsah MCP.

- Implementácia: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Životný cyklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentácia: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails sú filtre pred vykonaním a po vykonaní (vision-bridge, pii-masker, prompt-injection),
ktoré sa používajú v rámci konverzačného kanála. Spúšťajú sa pred dosiahnutím vrstvy nástrojov/smerovania MCP
a odosielajú štruktúrované porušenia do auditného kanála; nevyvolávajú sa ako nástroje MCP.

- Implementácia: `src/lib/guardrails/`.
- Dokumentácia: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Pri ladení volania MCP, ktoré sa javí ako zablokované, skontrolujte auditný protokol MCP
(položky `scope_denied:*`) aj auditnú stopu Guardrails — požiadavka môže byť odmietnutá
mechanizmom Guardrails **predtým**, než sa vôbec dostane k vrstve vynucovania rozsahov MCP.

---

## Koncové body REST API

| Koncový bod            | Metóda                | Popis                                                                                                     | Autentifikácia           |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------- | :----------------------- |
| `/api/mcp/status`      | `GET`                 | Stav servera: signál aktivity, stav transportu HTTP, súhrn auditnej aktivity                              | Správa (relácia/správca) |
| `/api/mcp/tools`       | `GET`                 | Katalóg nástrojov (názov, popis, rozsahy, fáza, zdrojové koncové body)                                    | Správa                   |
| `/api/mcp/sse`         | `GET` / `POST`        | Koncový bod transportu SSE (riadený pomocou `mcpEnabled` + `mcpTransport === "sse"`)                      | Kľúč API + rozsahy       |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamovateľný transport HTTP (používa hlavičku `mcp-session-id`; `DELETE` ukončí reláciu)                | Kľúč API + rozsahy       |
| `/api/mcp/audit`       | `GET`                 | Položky auditného protokolu z `mcp_tool_audit` (filtre: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Správa                   |
| `/api/mcp/audit/stats` | `GET`                 | Agregované štatistiky auditu (`totalCalls`, `successRate`, `avgDurationMs`, najpoužívanejšie nástroje)    | Správa                   |

Zdrojové súbory: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Transporty SSE aj Streamable HTTP sú blokované, kým nie je server MCP povolený v nastaveniach (`mcpEnabled`) a nie je vybraný príslušný `mcpTransport`. Ak je nakonfigurovaný nesprávny transport, trasa vráti HTTP 400 s odporúčaním zmeniť nastavenia.

---

## Autentifikácia a rozsahy

Nástroje MCP sa autentifikujú prostredníctvom rozsahov kľúča API. Vynucovanie rozsahov je centralizované v
`open-sse/mcp-server/scopeEnforcement.ts`. Každý nástroj vyžaduje konkrétne rozsahy:

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

Podporované sú aj rozsahy so zástupným znakom: `read:*` udeľuje všetky rozsahy na čítanie, `*` udeľuje úplný prístup.

### `mcp:connect` — úzko vymedzené oprávnenie pre trasu (#7895)

Prístup k transportu HTTP/SSE MCP (`/api/mcp/*`) z rozhrania, ktoré nie je loopback, vyžaduje
výnimku LOCAL_ONLY pre `/api/mcp/` (pozrite si `docs/security/ROUTE_GUARD_TIERS.md`). V minulosti
táto výnimka akceptovala iba kľúč API s úplným rozsahom `manage`/`admin` — čo je príliš široké
oprávnenie pre volajúceho, ktorý potrebuje iba komunikovať s MCP. Súbor `src/shared/constants/managementScopes.ts` teraz
exportuje `MCP_CONNECT_SCOPE = "mcp:connect"`: doplnkový, úzko vymedzený rozsah (podľa rovnakého precedensu ako
`SELF_USAGE_SCOPE`), ktorý autorizuje IBA obídenie ochrany pre `/api/mcp/` v
`src/server/authz/policies/management.ts` — neudeľuje prístup k žiadnej inej správcovskej trase
a zámerne NIE JE zahrnutý v `MANAGEMENT_API_KEY_SCOPES`. Kľúč s rozsahom `manage`/`admin`
naďalej prejde touto výnimkou bez zmeny; `mcp:connect` je alternatíva s nižšími oprávneniami pre
vzdialených volajúcich používajúcich iba MCP, ktorá sa kontroluje prostredníctvom `hasMcpConnectOrManageScope()`.

### Viazanie rozsahov HTTP podľa jednotlivých kľúčov (#7895)

Pri použití HTTP/SSE teraz `open-sse/mcp-server/httpTransport.ts` zisťuje skutočné
`api_keys.scopes` volajúceho prostredníctvom `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
a odovzdáva ich súprave MCP SDK cez `transport.handleRequest(req, { authInfo })`, takže
`extra.authInfo.scopes`, ktoré sa dostanú ku každému volaniu nástroja, zodpovedajú vlastným rozsahom kľúča Bearer.
Funkcia `resolveCallerScopeContext()` zo súboru `scopeEnforcement.ts` už uprednostňovala `authInfo` pred
`_meta` a záložnou hodnotou z premennej prostredia `OMNIROUTE_MCP_SCOPES` — táto zmena iba napĺňa tento prvý
zdroj s najvyššou prioritou, ktorý predtým pri použití HTTP nebol poskytovaný. Ak sa nepodarí nájsť žiadny kľúč API
(chýbajúca hlavička, neplatný kľúč), `authInfo` zostane `undefined` a zisťovanie pokračuje cez
existujúci reťazec `meta`/premenná prostredia bez zmeny. Táto zmena NEPREPÍNA predvolenú hodnotu
`OMNIROUTE_MCP_ENFORCE_SCOPES` — vynucovanie je stále potrebné výslovne povoliť; zmena iba zabezpečuje, že
po jeho povolení bude mať cesta podľa jednotlivých kľúčov prednosť. stdio nemá identitu pre jednotlivých volajúcich (pozrite si
`mcpCallerIdentity.ts`) a táto zmena sa ho netýka — naďalej používa záložný reťazec `_meta`/premenná prostredia.

---

## Premenné prostredia

| Premenná                                | Predvolená hodnota                 | Účel                                                                                                                                           |
| :-------------------------------------- | :--------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`           | Základná URL adresa, ktorú server MCP používa pri volaní interných API OmniRoute                                                               |
| `OMNIROUTE_API_KEY`                     | (prázdne)                          | Kľúč API odovzdávaný interným volaniam API ako `Authorization: Bearer`                                                                         |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (aktivuje sa iba `"true"`) | Ak je táto možnosť povolená, chýbajúce rozsahy zamietnu volania nástrojov a do protokolu auditu zaznamenajú `scope_denied:<reason>`            |
| `OMNIROUTE_MCP_SCOPES`                  | (prázdne)                          | Čiarkami oddelený zoznam povolených rozsahov, ktoré sa predvolene považujú za „dostupné“ (používa sa, keď volajúci neposkytne vlastné rozsahy) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nenastavené = zapnuté)            | Pri nastavení na `0/false/off/no` vypne kompresiu opisov MCP počas registrácie                                                                 |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nenastavené = zapnuté)            | Alternatívny alias pre rovnaký prepínač ako vyššie                                                                                             |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                            | Časový limit na prerušenie interných čítaní správy (stav, odolnosť, kombinácie, kvóta, využitie)                                               |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                            | Časový limit na prerušenie krokov čakajúcich na poskytovateľa (`route_request`, `web_search`, `web_fetch`)                                     |
| `MCP_TOOL_DENY`                         | (nenastavené = bez filtra)         | Čiarkami oddelené názvy nástrojov, ktoré sa majú odstrániť z `tools/list` (zníženie počtu nástrojov — pozri nižšie)                            |
| `MCP_TOOL_ALLOW`                        | (nenastavené = bez filtra)         | Čiarkami oddelené názvy nástrojov, ktoré sa majú ponechať výhradne (režim zoznamu povolených položiek — pozri nižšie)                          |
| `DATA_DIR`                              | `~/.omniroute`                     | Súbor signálu aktivity sa zapisuje do `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                 |

---

## Kompresia opisov

Registre nástrojov, výziev a zdrojov MCP môžu komprimovať opisy počas registrácie alebo výpisu, aby sa zmenšil objem metadát sprístupnených klientom (a tým aj náklady na kontext výzvy). Implementácia sa nachádza v `open-sse/mcp-server/descriptionCompressor.ts` a je prepojená so serverom MCP prostredníctvom `compressMcpRegistryMetadata` vo funkcii `createMcpServer()`.

- Kompresia sa vykonáva nad textom opisu pomocou súboru pravidiel Caveman (`getRulesForContext("all", "full")`) s extrakciou zachovaných blokov (úseky kódu, ohraničené bloky atď.), aby sa štrukturálny obsah nezmenil.
- Pre jednotlivé nasadenia ju možno prepínať pomocou hodnoty `compression.mcpDescriptionCompressionEnabled` v tabuľke nastavení `key_value` (predvolene: povolené) — v používateľskom rozhraní je dostupná ako **Analytika → Kompresia opisov MCP**.
- Pre celý proces ju možno prepínať pomocou `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` alebo `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Štatistiky v reálnom čase sú dostupné prostredníctvom `omniroute_compression_status` v položke `analytics.mcpDescriptionCompression` a sú označené `source: "mcp_metadata_estimate"`, aby sa odlíšili od skutočných záznamov o využití poskytovateľa.

---

## Zníženie počtu nástrojov (F4.3)

Kompresia opisov zmenšuje metadáta jednotlivých nástrojov; **zníženie počtu nástrojov** ide ešte o krok ďalej tým, že redukuje _počet_ nástrojov, ktoré sa vôbec oznamujú. Uvedenie menšieho počtu nástrojov v manifeste `tools/list` znižuje cenu v tokenoch za katalóg nástrojov, ktorú model klienta platí pri každej požiadavke (kompresia „vrstvy 5“). Implementácia je čistý filter bez stavových údajov v `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), zapojený do registračnej slučky v `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Voliteľné, predvolene vypnuté.** Filter sa spustí iba vtedy, keď je nastavená aspoň jedna z dvoch premenných prostredia; ak nie je nastavená ani jedna, všetkých 110 nástrojov sa oznámi bez zmien.

| Premenná         | Režim                                                                                                                |
| :--------------- | :------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Zoznam zakázaných položiek — názvy nástrojov oddelené čiarkami, ktoré sa vždy odstránia z `tools/list`               |
| `MCP_TOOL_ALLOW` | Zoznam povolených položiek — názvy nástrojov oddelené čiarkami; zachovajú sa iba tieto a všetky ostatné sa odstránia |

`deny` má prednosť pred `allow`. Názvy sú oddelené čiarkami, medzery na ich okrajoch sa odstránia a prázdne položky sa ignorujú. Príklady:

```bash
# Odstránenie dvoch nástrojov z katalógu
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Oznámenie iba nástrojov na smerovanie a kvóty (režim zoznamu povolených položiek)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Ako sa filtrované nástroje odstraňujú:** registrácia vždy uspeje; nástroj, ktorý profil odmietne, sa následne deaktivuje pomocou `.disable()` na rukoväti MCP SDK, takže sa nikdy nezobrazí v `tools/list`, no jeho prepojenie zostane zachované (čisté povolenie alebo zakázanie bez opätovnej registrácie). Parser profilu je `readMcpToolProfileFromEnv(process.env)`, ktorý vráti `null` (žiadne filtrovanie), keď sú obe premenné prázdne.

Rozšírenejšia štruktúra `ToolProfile` používaná funkciou `reduceToolManifest` podporuje aj filtrovanie podľa prieniku rozsahov (`allowScopes`, so zástupným porovnávaním v štýle `read:*`) a deterministický limit `maxTools`, tieto dve nastavenia však pri registrácii vyžadujú celý manifest a v súčasnosti **nie sú** sprístupnené prostredníctvom premenných prostredia (nadväzujúca podpora na úrovni `tools/list` je evidovaná ako plánovaná úloha). Funkcia `estimateManifestTokens()` je k dispozícii na porovnanie tokenových nákladov manifestu pred redukciou a po nej.

---

## Signál aktivity za behu

Transport stdio každých 5 sekúnd ukladá informácie o aktivite do `${DATA_DIR}/runtime/mcp-heartbeat.json`. Ovládací panel (`/api/mcp/status`) číta tento súbor spolu so stavom aktivity PID a na ich základe určuje hodnotu `online`. Transporty HTTP namiesto toho hlásia stav pomocou vnútroprocesovej funkcie `getMcpHttpStatus()` (bez zápisu do súboru).

Snímka signálu aktivity obsahuje:

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

## Protokolovanie auditu

Každé volanie nástroja sa zaznamenáva do tabuľky SQLite `mcp_tool_audit` pomocou `open-sse/mcp-server/audit.ts`:

- Názov nástroja, argumenty (hašované alebo skrátené podľa hodnoty `auditLevel` jednotlivého nástroja), výsledok
- Trvanie v ms, príznak úspechu alebo zlyhania, chybové hlásenie (ak sa uplatňuje)
- Haš kľúča API, časová pečiatka
- Zamietnutia rozsahov sa zaznamenávajú ako `scope_denied:<reason>` spolu so zoznamom chýbajúcich rozsahov

Na kontrolu nedávnych volaní použite ovládací panel alebo koncové body REST `/api/mcp/audit` a `/api/mcp/audit/stats`.

---

## Súbory

| Súbor                                                                    | Účel                                                                        |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Továreň servera MCP, vstupný bod stdio, registrácie nástrojov podľa rozsahu |
| `open-sse/mcp-server/httpTransport.ts`                                   | Prenos SSE + Streamable HTTP (správa relácií)                               |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Vyhodnocovanie rozsahu nástrojov a určovanie volajúceho                     |
| `open-sse/mcp-server/audit.ts`                                           | Auditné protokolovanie volaní nástrojov (`mcp_tool_audit`)                  |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Zapisovač signálu aktivity stdio (`mcp-heartbeat.json`)                     |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kompresia opisov pre registre nástrojov, výziev a zdrojov                   |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Schémy Zod + register nástrojov (`MCP_TOOLS`, 45 položiek)                  |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Obslužné rutiny nástrojov fázy 2, vyrovnávacej pamäte a 1proxy              |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Obslužné rutiny kompresných nástrojov                                       |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definície pamäťových nástrojov (3 nástroje)                                 |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definície nástrojov zručností (4 nástroje)                                  |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definície nástrojov zdroja kontextu Notion (6 nástrojov)                    |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definície gamifikačných nástrojov (8 nástrojov)                             |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Nástroje na registráciu a správu doplnkov (8 nástrojov)                     |
| `src/app/api/mcp/status/route.ts`                                        | Koncový bod `/api/mcp/status`                                               |
| `src/app/api/mcp/tools/route.ts`                                         | Koncový bod `/api/mcp/tools`                                                |
| `src/app/api/mcp/sse/route.ts`                                           | Trasa prenosu SSE `/api/mcp/sse`                                            |
| `src/app/api/mcp/stream/route.ts`                                        | Trasa prenosu Streamable HTTP `/api/mcp/stream`                             |
| `src/app/api/mcp/audit/route.ts`                                         | Dotaz na auditný protokol `/api/mcp/audit`                                  |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Agregované auditné metriky `/api/mcp/audit/stats`                           |
| `src/lib/notion/api.ts`                                                  | Klient REST API služby Notion (opakovanie, časový limit, klasifikácia chýb) |
| `src/lib/db/notion.ts`                                                   | Trvalé uloženie tokenu Notion (tabuľka `key_value`)                         |
| `src/app/api/settings/notion/route.ts`                                   | API nastavení služby Notion (GET/POST/DELETE)                               |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Používateľské rozhranie na správu tokenu Notion                             |
| `tests/unit/notion-api.test.ts`                                          | Testy klienta API služby Notion (7)                                         |
| `tests/unit/notion-tools.test.ts`                                        | Testy presadzovania rozsahu nástrojov Notion (10)                           |
| `tests/unit/db/notion.test.mjs`                                          | Testy databázového modulu Notion (3)                                        |
