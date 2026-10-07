# OmniRoute MCP Server Documentation (Čeština)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server protokolu Model Context Protocol se 110 nástroji pro operace se směrováním, mezipamětí, kompresí, pamětí, dovednostmi, proxy, poolem, Radarem a zdroji kontextu.
>
> Zdroj pravdy: `open-sse/mcp-server/server.ts` vypočítává pomocí `countUniqueMcpTools()` **110 jedinečných nástrojů**: 45 kanonických definic (včetně šesti nástrojů životního cyklu CCR, trojice agent-skills, `omniroute_radar_catalog` a `omniroute_x_search`), plus nástroje pro paměť (3), dovednosti (4), dovednosti GitHubu (3), pool (6), gamifikaci (8), pluginy (8), Notion (6), Obsidian (22), lokální korpus (3) a dva kompresní nástroje určené pouze pro RTK.

## Instalace

OmniRoute MCP je integrován. Spustíte jej pomocí:

```bash
omniroute --mcp
```

Nebo prostřednictvím transportu open-sse:

```bash
# Streamovatelný transport HTTP (port 20130)
omniroute --dev  # MCP se automaticky spustí na koncovém bodu /mcp
```

Transporty HTTP (`sse` / `streamable-http`, obsluhované přímo v procesu serverem řídicího panelu) jsou
ve výchozím nastavení vypnuté a dříve je bylo možné přepínat pouze na stránce `/dashboard/mcp`. Od verze v3.8.51
nabízí stejné možnosti také CLI:

```bash
omniroute mcp status                                  # povoleno/online, transport, počet nástrojů
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resetuje aktivní relace sse/streamable-http
```

`mcp enable`/`mcp disable` pomocí metody PATCH mění stejné nastavení `mcpEnabled` (a volitelně `mcpTransport`),
které řídicí panel přepíná prostřednictvím `/api/settings`. `mcp restart` volá `POST /api/mcp/restart`: ukončí
aktivní relace `sse`/`streamable-http`, aby se následující požadavek znovu inicializoval v čistém stavu, vrací
`409`, pokud je MCP zakázáno, a `501` pro transport `stdio` (klienti stdio vlastní svůj vlastní
podproces — neexistuje žádný procesní popisovač, který by bylo možné restartovat).

## Transporty

Server MCP zpřístupňuje tři transporty, přičemž všechny využívají stejnou tovární funkci `createMcpServer()`:

| Transport         | Kde                                          | Kdy použít                                                  |
| :---------------- | :------------------------------------------- | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | Integrace s IDE (Claude Desktop, Cursor atd.)               |
| `sse`             | `POST/GET /api/mcp/sse` přes `httpTransport` | Klienti v prohlížeči/agenti, kteří potřebují proud událostí |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | Vícerelační klienti HTTP (hlavička `mcp-session-id`)        |

Aktivní transport HTTP (`sse` nebo `streamable-http`) se vybírá pomocí nastavení `mcpTransport`. Přepnutí transportu ukončí existující relace druhého transportu.

### Vzdálený přístup (obejití pomocí oprávnění manage)

`/api/mcp/*` se nachází v úrovni LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — ve výchozím nastavení k němu mají přístup pouze hostitelé zpětné smyčky (`localhost`, `127.0.0.1`, `::1`). Od verze v3.8.2 se mohou připojit i klienti mimo zpětnou smyčku, pokud uvedou hlavičku `Authorization: Bearer <api-key>`, jejíž klíč má oprávnění `manage`. Toto je jediný způsob, jak získat přístup ke vzdálenému serveru MCP prostřednictvím tunelu, reverzní proxy nebo veřejného názvu hostitele.

```bash
# Udělení oprávnění manage: otevřete na řídicím panelu stránku API Keys a u klíče zapněte
# možnost „Management Access“, případně při vytváření odešlete metodou POST scopes:["manage"].

# Poté se připojte ze vzdáleného klienta MCP:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Klíč bez oprávnění `manage` (nebo požadavek bez Bearer) vrací `403 LOCAL_ONLY`. Související prefix `/api/cli-tools/runtime/*` záměrně NELZE obejít — viz [Úrovně ochrany tras — výjimka pro oprávnění manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Konfigurace IDE

Informace o nastavení Claude Desktop, Cursoru, Cline a kompatibilních klientů MCP najdete v části [Konfigurace klienta MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration).

---

## Základní nástroje (14) — Fáze 1

| Nástroj                         | Oprávnění             | Popis                                                                                                                                                |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Doba provozu, paměť, jističe, limity požadavků, statistiky mezipaměti                                                                                |
| `omniroute_list_combos`         | `read:combos`         | Všechna nakonfigurovaná komba se strategiemi (volitelně včetně metrik)                                                                               |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metriky výkonu konkrétního komba                                                                                                                     |
| `omniroute_switch_combo`        | `write:combos`        | Aktivace nebo deaktivace komba                                                                                                                       |
| `omniroute_create_combo`        | `write:combos`        | Vytvoření ověřeného komba prostřednictvím stávajícího API pro komba                                                                                  |
| `omniroute_check_quota`         | `read:quota`          | Využitá/celková kvóta, zbývající procenta, čas obnovení, stav tokenu                                                                                 |
| `omniroute_route_request`       | `execute:completions` | Odeslání dokončení chatu prostřednictvím směrování OmniRoute                                                                                         |
| `omniroute_cost_report`         | `read:usage`          | Přehled nákladů podle období (relace/den/týden/měsíc)                                                                                                |
| `omniroute_list_models_catalog` | `read:models`         | Úplný katalog modelů s možnostmi, stavem a cenami                                                                                                    |
| `omniroute_radar_catalog`       | `read:radar`          | Lokální podepsaný katalog Radar; volitelné filtry podle poskytovatele/rodiny                                                                         |
| `omniroute_tool_search`         | `read:tools`          | Vyhledávání nástrojů v registrovaném katalogu MCP                                                                                                    |
| `omniroute_web_search`          | `execute:search`      | Vyhledávání na webu prostřednictvím nakonfigurovaných poskytovatelů vyhledávání. Nezahrnuje X/Twitter.                                               |
| `omniroute_x_search`            | `execute:search`      | Vyhledávání na X prostřednictvím xAI/SuperGrok nebo pomocí `xquik-search` pro výsledky z API Xquik. Vyžaduje přihlašovací údaje pro vybraný backend. |
| `omniroute_web_fetch`           | `execute:search`      | Načítání webového obsahu prostřednictvím nakonfigurovaných poskytovatelů                                                                             |

## Pokročilé nástroje (11) — Fáze 2

| Nástroj                            | Oprávnění                            | Popis                                                                                                                              |
| :--------------------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulace směrování nanečisto se stromem záložních možností                                                                         |
| `omniroute_set_budget_guard`       | `write:budget`                       | Rozpočet relace s akcí snížení kvality, blokování nebo upozornění                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Aktualizace strategie kombinace za běhu (prioritní/vážená/automatická/atd.)                                                        |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Použití předvolby odolnosti `aggressive` / `balanced` / `conservative`                                                             |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Živý test každého poskytovatele v kombinaci pomocí skutečného volání upstreamové služby                                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metriky jednotlivých poskytovatelů s latencí p50/p95/p99 a stavem jističe                                                          |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Doporučení kombinace podle typu úlohy s omezeními rozpočtu a latence                                                               |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Vysvětlení, proč byl požadavek směrován k poskytovateli (faktory hodnocení + záložní volby)                                        |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Úplný snímek relace: náklady, tokeny, hlavní modely/poskytovatelé, chyby, ochrana rozpočtu                                         |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnostika (a volitelná automatická oprava) nekonzistence databáze, například neplatných odkazů na kombinace nebo osiřelých řádků |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synchronizace cenových údajů z externích zdrojů (LiteLLM); podporuje `dryRun`                                                      |

## Nástroje mezipaměti (2)

| Nástroj                 | Oprávnění     | Popis                                                              |
| :---------------------- | :------------ | :----------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Statistiky sémantické mezipaměti, mezipaměti promptů a idempotence |
| `omniroute_cache_flush` | `write:cache` | Vyprázdnění mezipaměti globálně nebo podle podpisu/modelu          |

## Nástroje komprese (13)

| Nástroj                             | Oprávnění           | Popis                                                                                                                           |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | Nastavení komprese, souhrn analytiky a statistiky zohledňující mezipaměť (včetně metadat `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Konfigurace režimu komprese, prahové hodnoty, cílového poměru, zachování systémového promptu a přepínače komprese popisů MCP    |
| `omniroute_set_compression_engine`  | `write:compression` | Výběr aktivního enginu (off/caveman/rtk/stacked) a intenzity Caveman/RTK                                                        |
| `omniroute_list_compression_combos` | `read:compression`  | Výpis pojmenovaných kombinací komprese a jejich řetězců enginů                                                                  |
| `omniroute_compression_combo_stats` | `read:compression`  | Analytika seskupená podle kombinace komprese a enginu                                                                           |
| `omniroute_ccr_store`               | `write:compression` | Uložení obsahu izolovaného podle volajícího do omezeného úložiště CCR v paměti a vrácení značky spolu s odkazem `ccr://`        |
| `omniroute_ccr_retrieve`            | `read:compression`  | Načtení celého obsahu CCR nebo jeho části v režimech začátek, konec, řádky, grep a statistiky                                   |
| `omniroute_ccr_inspect`             | `read:compression`  | Kontrola metadat CCR vlastněných volajícím bez vrácení obsahu                                                                   |
| `omniroute_ccr_list`                | `read:compression`  | Výpis stránkovaných metadat bloků CCR vlastněných volajícím                                                                     |
| `omniroute_ccr_delete`              | `write:compression` | Odstranění bloku CCR vlastněného volajícím                                                                                      |
| `omniroute_ccr_stats`               | `read:compression`  | Přehled využití paměti v rozsahu volajícího, čítačů životního cyklu a limitů úložiště                                           |
| `omniroute_rtk_discover`            | `read:compression`  | Detekce opakujícího se šumu ve vzorcích výstupu RTK poskytnutých na základě výslovného souhlasu                                 |
| `omniroute_rtk_learn`               | `read:compression`  | Vygenerování návrhu filtru RTK určeného ke kontrole ze vzorků poskytnutých na základě výslovného souhlasu                       |

Položky CCR existují pouze v paměti a po restartu zmizí. Každý blok je omezen na 2 MiB, každý
principal na 16 MiB a globální úložiště na 64 MiB. Výchozí TTL položek je 24 hodin (maximálně
sedm dní). Úplné načtení přes MCP je omezeno na 256 KiB; větší bloky zůstávají dostupné prostřednictvím
režimů načítání rozsahů a grep. Ukládání, načítání, výpis, kontrola, odstraňování a statistiky jsou izolovány podle
principalu ověřeného klíčem API. Auditní záznamy obsahují hodnoty hash a metadata velikosti, nikdy však samotný obsah.

`omniroute_compression_status` hlásí kompresi popisů MCP samostatně v části
`analytics.mcpDescriptionCompression`. Tyto hodnoty jsou odhady velikosti metadat pro popisy MCP,
které lze vypsat (`tools`, `prompts`, `resources` a `resourceTemplates`); nejde o potvrzení využití
od poskytovatele a jsou označeny pomocí `source: "mcp_metadata_estimate"`.

### Filtr stromu přístupnosti MCP (v3.8.0)

Nezávisle na výše uvedených kompresních nástrojích obsahuje OmniRoute filtr následného zpracování,
který komprimuje **výsledky nástrojů** prohlížeče/přístupnosti MCP před jejich vrácením agentovi.
Tento filtr není sám o sobě nástrojem — spouští se transparentně nad každým výsledkem nástroje,
který obsahuje podrobný text stromu přístupnosti nebo snímku prohlížeče (≥2000 znaků).

Klíčové chování:

- Sbalí ≥30 po sobě jdoucích opakovaných sourozeneckých řádků do souhrnu obsahujícího začátek a konec
- Zachovává kotvy `[ref=eXX]` vyžadované nástroji Playwright/computer-use
- Natvrdo zkrátí příliš dlouhý text (>50 000 znaků) a přidá navigační nápovědu
- Očekávaná úspora: **60–80 %** u dat snímků prohlížeče

Konfigurace: `compression.mcpAccessibility` v globálním nastavení (migrace 056).
Implementace: `open-sse/services/compression/engines/mcpAccessibility/`.
Úplná dokumentace: [Kompresní moduly — filtr stromu přístupnosti MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Informace o modelu běhové komprese, na němž jsou tyto nástroje založeny, najdete v dokumentech
[Kompresní moduly](../compression/COMPRESSION_ENGINES.md) a [Komprese RTK](../compression/RTK_COMPRESSION.md).

## Nástroje 1Proxy (3)

| Nástroj                     | Rozsahy        | Popis                                                                             |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Načte bezplatné proxy z tržiště 1proxy (filtry protokolu/země/kvality/limitu)     |
| `omniroute_oneproxy_rotate` | `read:proxies` | Získá další dostupnou proxy podle strategie (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistiky fondu, stav synchronizace a distribuce podle protokolu a země          |

## Nástroje paměti (3)

Definovány v `open-sse/mcp-server/tools/memoryTools.ts`. Ověřování a rozsah oprávnění jsou vynucovány prostřednictvím standardní pipeline rozsahů MCP.

| Nástroj                   | Rozsahy        | Popis                                                                                            |
| :------------------------ | :------------- | :----------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Vyhledává vzpomínky podle dotazu / typu / klíče API s vynucením rozpočtu tokenů                  |
| `omniroute_memory_add`    | `write:memory` | Přidá nový záznam do paměti (`factual` / `episodic` / `procedural` / `semantic`)                 |
| `omniroute_memory_clear`  | `write:memory` | Vymaže vzpomínky pro klíč API, volitelně filtrované podle typu nebo časového razítka `olderThan` |

## Nástroje dovedností (4)

Definovány v `open-sse/mcp-server/tools/skillTools.ts`. Využívají `src/lib/skills/registry` + `src/lib/skills/executor`.

| Nástroj                       | Rozsahy          | Popis                                                                                              |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Vypíše registrované dovednosti s volitelným filtrováním podle klíče API, názvu nebo stavu povolení |
| `omniroute_skills_enable`     | `write:skills`   | Povolí nebo zakáže konkrétní dovednost podle ID                                                    |
| `omniroute_skills_execute`    | `execute:skills` | Spustí dovednost se zadaným vstupem a vrátí záznam o spuštění                                      |
| `omniroute_skills_executions` | `read:skills`    | Vypíše historii nedávných spuštění dovedností                                                      |

## Kontextový zdroj Notion (6)

Definován v `open-sse/mcp-server/tools/notionTools.ts`. Token je uložen v tabulce `key_value` prostřednictvím `src/lib/db/notion.ts`. Klient REST se nachází v `src/lib/notion/api.ts`. API nastavení se nachází v `src/app/api/settings/notion/route.ts`. Uživatelské rozhraní ovládacího panelu se nachází v `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Nakonfigurujte integrační token Notion na kartě **Zdroje kontextu** v ovládacím panelu koncového bodu nebo prostřednictvím REST API:

```bash
# Nastavení tokenu
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Kontrola stavu
curl http://localhost:20128/api/settings/notion

# Odpojení
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Nástroj                      | Rozsahy        | Popis                                                                   |
| :--------------------------- | :------------- | :---------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Fulltextové vyhledávání napříč všemi stránkami a databázemi             |
| `notion_get_page`            | `read:notion`  | Získá stránku podle ID včetně jejích vlastností                         |
| `notion_list_block_children` | `read:notion`  | Vypíše podřízené bloky stránky nebo bloku                               |
| `notion_query_database`      | `read:notion`  | Dotáže se na databázi pomocí filtrů, řazení a stránkování               |
| `notion_get_database`        | `read:notion`  | Získá schéma databáze podle ID                                          |
| `notion_append_blocks`       | `write:notion` | Přidá podřízené bloky k nadřazenému bloku (max. 100 na jeden požadavek) |

## Nástroje katalogu dovedností agentů (3)

Definovány v `open-sse/mcp-server/tools/agentSkillTools.ts`. Využívají `src/lib/agentSkills/catalog`. Tyto nástroje zpřístupňují katalog dokumentace Agent Skills se 45 položkami klientům MCP a externím agentům. Rozsah: `read:catalog`.

| Nástroj                           | Rozsahy        | Popis                                                                                                                           |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog` | Vypíše všech 45 dovedností agentů s volitelnými filtry `category` (api\|cli) a `area`; vrací metadata a pokrytí                 |
| `omniroute_agent_skills_get`      | `read:catalog` | Získá úplná metadata a obsah souboru SKILL.md pro jednu dovednost podle kanonického `id`                                        |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistiky pokrytí: kolik z 23 API, 21 CLI a 1 konfigurační dovednosti má v souborovém systému soubory SKILL.md oproti katalogu |

Úplný katalog a informace o tom, jak jej využívají externí agenti, najdete v [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## Související frameworky (v3.8.0)

Výše uvedený inventář nástrojů MCP (110 jedinečných nástrojů, vypočítáno pomocí `countUniqueMcpTools()`) je záměrně
omezen na běhové operace směrování, mezipaměti, komprese, paměti, dovedností, proxy a zdrojů kontextu. Společně
se serverem MCP jsou ve v3.8.0 dodávány dva související frameworky, které jsou zdokumentovány samostatně:

### Cloudoví agenti

Cloudoví agenti jsou AI agenti pro programování běžící mimo proces (codex-cloud, cursor-cloud, devin, jules), kteří jsou
propojeni s OmniRoute prostřednictvím stejného modelu připojení, jaký se používá pro poskytovatele LLM. Jsou zpřístupněni
prostřednictvím vlastního rozhraní REST (`/api/v1/agents/*`) a **nejsou** součástí katalogu nástrojů MCP
— volání cloudového agenta nespotřebovává rozsah MCP.

- Implementace: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Životní cyklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentace: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Ochranná pravidla

Ochranná pravidla jsou filtry aplikované před spuštěním nebo po něm (vision-bridge, pii-masker, prompt-injection)
uvnitř konverzačního řetězce. Spouštějí se před dosažením vrstvy nástrojů/směrování MCP
a odesílají strukturovaná porušení do auditního řetězce; nejsou vyvolávána jako nástroje MCP.

- Implementace: `src/lib/guardrails/`.
- Dokumentace: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Při ladění zdánlivě blokovaného volání MCP zkontrolujte auditní protokol MCP
(položky `scope_denied:*`) i auditní stopu ochranných pravidel — požadavek může být ochranným pravidlem zamítnut
**dříve**, než vůbec dosáhne vrstvy vynucování rozsahů MCP.

---

## Koncové body REST API

| Koncový bod            | Metoda                | Popis                                                                                                     | Ověření                       |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------- | :---------------------------- |
| `/api/mcp/status`      | `GET`                 | Stav serveru: prezenční signál, stav přenosu HTTP, souhrn auditní aktivity                                | Správa (relace/administrátor) |
| `/api/mcp/tools`       | `GET`                 | Katalog nástrojů (název, popis, rozsahy, fáze, zdrojové koncové body)                                     | Správa                        |
| `/api/mcp/sse`         | `GET` / `POST`        | Koncový bod přenosu SSE (řízený pomocí `mcpEnabled` + `mcpTransport === "sse"`)                           | Klíč API + rozsahy            |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamovatelný přenos HTTP (používá hlavičku `mcp-session-id`; `DELETE` ukončí relaci)                    | Klíč API + rozsahy            |
| `/api/mcp/audit`       | `GET`                 | Položky auditního protokolu z `mcp_tool_audit` (filtry: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Správa                        |
| `/api/mcp/audit/stats` | `GET`                 | Agregované auditní statistiky (`totalCalls`, `successRate`, `avgDurationMs`, nejpoužívanější nástroje)    | Správa                        |

Zdrojové soubory: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Přenosy SSE i Streamable HTTP jsou blokovány, dokud není server MCP povolen v nastavení (`mcpEnabled`) a není vybrána odpovídající hodnota `mcpTransport`. Pokud je nakonfigurován nesprávný přenos, trasa vrátí HTTP 400 s doporučením změnit nastavení.

---

## Ověřování a rozsahy oprávnění

Volání nástrojů MCP čtou řetězce rozsahů od volajícího. Tato kontrola je jedním ze tří
nezávislých jmenných prostorů. Úspěch v jedné kontrole neznamená úspěch v ostatních.
Pravidla jsou popsána v části [Tři jmenné prostory rozsahů](#three-scope-namespaces).
Katalog nástrojů je uveden v části [Rozsahy nástrojů MCP](#mcp-tool-scopes).

### Tři jmenné prostory rozsahů

`manage` na klíči API, `read:compression` na nástroji MCP a `read` na
přístupovém tokenu `oma_live_…` představují tři různá oprávnění. Volající, kteří odešlou přístupový
token `read` do měnící trasy správy, obdrží HTTP 403
`Access token scope 'read' is insufficient; 'write' required.`
Toto pořadí vyhodnocuje `scopeSatisfies`. Tabulku MCP nekonzultuje a porovnávání MCP
nekonzultuje toto pořadí.

| Jmenný prostor              | Přihlašovací údaj                                            | Kontrola                    | Úspěch povoluje                                          |
| :-------------------------- | :----------------------------------------------------------- | :-------------------------- | :------------------------------------------------------- |
| Správa pomocí klíče API     | `api_keys.scopes`                                            | `hasManageScope`            | Správcovské REST API pro daný klíč Bearer                |
| Doplňkové rozsahy klíče API | stejné pole, jeden přesný řetězec                            | pomocná funkce uvedená níže | Pouze danou konkrétní schopnost                          |
| Rozsahy nástrojů MCP        | stejné pole, jinak `_meta` MCP, jinak `OMNIROUTE_MCP_SCOPES` | `scopeMatches`              | Daný nástroj, jakmile je vynucování zapnuto              |
| Přístupový token            | `oma_live_…`                                                 | `scopeSatisfies`            | Trasu správy, jejíž metoda a cesta vyžadují danou úroveň |

Vytváření jednotlivých přihlašovacích údajů je popsáno v části
[Ověřování správy](../guides/MANAGEMENT-AUTH.md).

#### Rozsahy klíčů API

Jedno pole `api_keys.scopes` slouží ke dvěma účelům. Pro každý se používají jiné funkce.

**Správcovské REST API.** `manage` a `admin` jsou položkami
`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`).
Správcovské trasy pro daný klíč autorizuje `hasManageScope`. `admin` na těchto
trasách umožňuje správu. Slovo `admin` zde neoznačuje úroveň
přístupového tokenu a nerozšiřuje se na rozsahy nástrojů MCP.

**Doplňkové řetězce.** Každý z nich se ověřuje přesným testem členství a všechny zůstávají
mimo `MANAGEMENT_API_KEY_SCOPES`.

| Rozsah                         | Úspěch povoluje                                                                                                                                                          |
| :----------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Pouze výjimku LOCAL_ONLY pro `/api/mcp/` mimo loopback (`hasMcpConnectOrManageScope`). Touto výjimkou stále projde i klíč s `manage` nebo `admin`.                       |
| `self:usage`                   | `GET /api/v1/me/status` pro tento klíč (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` přidá tento rozsah při vytvoření (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Kvóty upstream účtů v datové části této odpovědi (`src/lib/usage/apiKeySelfService.ts`). Stavová trasa stále vyžaduje `self:usage`.                                      |
| `policy:bypass-provider-quota` | Inferenční volání tohoto klíče přeskočí zásadu kvót poskytovatele (`hasProviderQuotaBypassScope` v `src/sse/handlers/chat.ts`).                                          |

#### Porovnávání

Katalogem je tabulka v části [Rozsahy nástrojů MCP](#mcp-tool-scopes). Za tento katalog
nepovažujte `MCP_SCOPE_LIST` v `src/shared/constants/mcpScopes.ts`:
jde o původní typovanou podmnožinu. Později přidané nástroje deklarují vedle ní další rozsahy
(`read:notion`, `read:skills`, `read:local-corpus` a zbytek tabulky).

`evaluateToolScopes` v `open-sse/mcp-server/scopeEnforcement.ts` povolí volání,
pokud každý požadovaný rozsah odpovídá některému udělenému rozsahu:

- `*` odpovídá každému požadovanému rozsahu.
- Udělený rozsah končící na `*` odpovídá požadovanému rozsahu, který začíná
  prefixem před hvězdičkou. `read:*` odpovídá `read:compression`.
- Každý jiný udělený rozsah odpovídá pouze totožnému řetězci požadovaného rozsahu.

Klíč s rozsahy `["manage"]` neprojde kontrolou `scopeMatches` pro `read:compression`.
Stejné volání neprojde ani pro `admin`, `mcp:connect`, `read` a `write`, pokud jsou
jedinými udělenými řetězci. Mezi rozsahy nástrojů MCP neexistuje žádná hierarchie
kromě koncového `*`.

Vynucování je vypnuto, pokud není nastaveno `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (výchozí hodnota
je `false`). Dokud je vypnuto, `evaluateToolScopes` volání povolí a katalog
přeskočí. Když je zapnuto, HTTP používá `api_keys.scopes` klíče Bearer jako
`authInfo` (viz [Navázání rozsahů HTTP na jednotlivé klíče](#per-key-http-scope-binding-7895)).
Pokud se nepodaří určit žádné rozsahy klíče, sada udělených rozsahů přejde na `_meta` MCP a poté
na `OMNIROUTE_MCP_SCOPES`.

#### Rozsahy přístupových tokenů

Tokeny `oma_live_…` (`src/lib/accessTokens/scopes.ts`) nesou `read`, `write`
nebo `admin`. `scopeSatisfies` pracuje s pořadím úrovní: `admin` zahrnuje `write` a `read`
a `write` zahrnuje `read`. Neznámé rozsahy nezahrnují nic.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) porovnává tuto
úroveň s výsledkem `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` a `OPTIONS` vyžadují `read`.
- Každá jiná metoda vyžaduje `write`.
- Cesty v `ADMIN_SCOPE_PREFIXES` vyžadují `admin` pro každou metodu. `/api/mcp`
  je na tomto seznamu, takže přístupový token `write` stále nemůže volat rozhraní MCP přes HTTP.
- Cesty v `ADMIN_MUTATION_PREFIXES` vyžadují `admin` pouze pro mutace.

`PATCH /api/keys/{id}` je mutace a není na těchto seznamech pro správce, takže token
s oprávněním `read` obdrží odpověď 403:
`Access token scope 'read' is insufficient; 'write' required.`
Přístupový token s oprávněním `write` nebo `admin` požadavky této trasy splňuje. JWT ovládacího panelu,
token ID zařízení rozhraní CLI pro loopback a klíč API s oprávněním `manage` nebo `admin`
procházejí jinými větvemi a toto pořadí je neomezuje.

Přístupový token, který projde kontrolou `scopeSatisfies` pro `/api/mcp`, překonal
pouze bránu pro správu. Volání nástrojů nadále spouštějí kontrolu `scopeMatches` vůči rozsahům
klíče API. Pořadí přístupového tokenu není vstupem funkce `scopeMatches`.

### Rozsahy nástrojů MCP

Vynucování rozsahů je centralizováno v `open-sse/mcp-server/scopeEnforcement.ts`.
Každý nástroj vyžaduje konkrétní rozsahy:

| Rozsah oprávnění      | Nástroje                                                                                                                                                                             |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                    |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                            |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                               |
| `read:quota`          | `check_quota`                                                                                                                                                                        |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                               |
| `read:models`         | `list_models_catalog`                                                                                                                                                                |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                        |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                   |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                          |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                       |
| `read:cache`          | `cache_stats`                                                                                                                                                                        |
| `write:cache`         | `cache_flush`                                                                                                                                                                        |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                           |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                    |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                     |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                               |
| `read:memory`         | `memory_search`                                                                                                                                                                      |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                         |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                   |
| `write:skills`        | `skills_enable`                                                                                                                                                                      |
| `execute:skills`      | `skills_execute`                                                                                                                                                                     |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                     |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                              |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                            |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                     |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                       |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                   |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                      |
| `read:obsidian`       | 13 nástrojů pro čtení — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 nástrojů pro zápis — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                    |

Jsou podporovány rozsahy se zástupnými znaky: `read:*` uděluje všechny rozsahy pro čtení, `*` uděluje plný přístup.

### `mcp:connect` — úzce vymezená schopnost přístupu k trase (#7895)

Přístup k transportu HTTP/SSE MCP (`/api/mcp/*`) z adres mimo loopback vyžaduje
výjimku LOCAL_ONLY pro `/api/mcp/` (viz `docs/security/ROUTE_GUARD_TIERS.md`). Historicky
tato výjimka přijímala pouze klíč API s plným rozsahem `manage`/`admin` — což bylo příliš široké pro
volajícího, který potřebuje komunikovat pouze s MCP. `src/shared/constants/managementScopes.ts` nyní
exportuje `MCP_CONNECT_SCOPE = "mcp:connect"`: doplňkový, úzce vymezený rozsah (podle stejného precedentu jako
`SELF_USAGE_SCOPE`), který autorizuje POUZE obejití ochrany `/api/mcp/` v
`src/server/authz/policies/management.ts` — neuděluje přístup k žádným jiným trasám pro správu
a záměrně NENÍ zahrnut v `MANAGEMENT_API_KEY_SCOPES`. Klíč s rozsahem `manage`/`admin`
nadále touto výjimkou projde beze změny; `mcp:connect` je alternativou s nižšími oprávněními pro
vzdálené volající používající pouze MCP a ověřuje se pomocí `hasMcpConnectOrManageScope()`.

### Vazba rozsahů HTTP na jednotlivé klíče (#7895)

Přes HTTP/SSE nyní `open-sse/mcp-server/httpTransport.ts` zjišťuje skutečné
`api_keys.scopes` volajícího pomocí `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
a předává je SDK MCP prostřednictvím `transport.handleRequest(req, { authInfo })`, takže
`extra.authInfo.scopes`, které se dostanou ke každému volání nástroje, odpovídají vlastním rozsahům klíče Bearer.
Funkce `resolveCallerScopeContext()` v `scopeEnforcement.ts` již upřednostňovala `authInfo` před
záložními hodnotami `_meta` a proměnné prostředí `OMNIROUTE_MCP_SCOPES` — tato změna pouze naplňuje tento první
zdroj s nejvyšší prioritou, který dříve při použití HTTP nebyl naplňován. Když se nepodaří určit žádný klíč API
(chybějící hlavička, neplatný klíč), `authInfo` zůstane `undefined` a vyhodnocení pokračuje beze změny
stávajícím řetězcem `meta`/proměnná prostředí. Tato změna NEMĚNÍ výchozí hodnotu `OMNIROUTE_MCP_ENFORCE_SCOPES` —
vynucování musí být stále explicitně povoleno; změna pouze zajistí, že cesta specifická pro daný klíč
získá po povolení přednost. stdio nemá identitu jednotlivých volajících (viz
`mcpCallerIdentity.ts`) a změna se ho netýká — nadále používá záložní řetězec `_meta`/proměnná prostředí.

---

## Proměnné prostředí

| Proměnná                                | Výchozí hodnota                   | Účel                                                                                                                                                          |
| :-------------------------------------- | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`          | Základní URL, kterou server MCP používá při volání interních API OmniRoute                                                                                    |
| `OMNIROUTE_API_KEY`                     | (prázdné)                         | Klíč API předávaný interním voláním API jako `Authorization: Bearer`                                                                                          |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (aktivuje pouze `"true"`) | Pokud je povoleno, chybějící rozsahy oprávnění zamítnou volání nástrojů a do auditního protokolu zapíší `scope_denied:<reason>`                               |
| `OMNIROUTE_MCP_SCOPES`                  | (prázdné)                         | Čárkami oddělený seznam povolených rozsahů, které jsou ve výchozím nastavení považovány za „dostupné“ (použije se, pokud volající neposkytne vlastní rozsahy) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nenastaveno = zapnuto)           | Při nastavení na `0/false/off/no` zakáže kompresi popisů MCP během registrace                                                                                 |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nenastaveno = zapnuto)           | Alternativní alias pro stejný přepínač jako výše                                                                                                              |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                           | Časový limit pro přerušení interních řídicích čtení (stav, odolnost, kombinace, kvóta, využití)                                                               |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                           | Časový limit pro přerušení kroků čekajících na poskytovatele (`route_request`, `web_search`, `web_fetch`)                                                     |
| `MCP_TOOL_DENY`                         | (nenastaveno = bez filtru)        | Čárkami oddělené názvy nástrojů, které mají být odebrány z `tools/list` (snížení počtu nástrojů — viz níže)                                                   |
| `MCP_TOOL_ALLOW`                        | (nenastaveno = bez filtru)        | Čárkami oddělené názvy nástrojů, které mají být zachovány výhradně (režim seznamu povolených položek — viz níže)                                              |
| `DATA_DIR`                              | `~/.omniroute`                    | Soubor prezenčního signálu se zapisuje do `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                            |

---

## Komprese popisů

Registry nástrojů, výzev a prostředků MCP mohou během registrace či výpisu komprimovat popisy, aby se zmenšil objem metadat poskytovaných klientům (a tím i náklady na kontext výzvy). Implementace se nachází v `open-sse/mcp-server/descriptionCompressor.ts` a je zapojena do serveru MCP prostřednictvím `compressMcpRegistryMetadata` uvnitř `createMcpServer()`.

- Komprese se provádí nad textem popisu pomocí sady pravidel Caveman (`getRulesForContext("all", "full")`) s extrakcí zachovávaných bloků (úseky kódu, ohraničené bloky atd.), takže strukturální obsah zůstává nezměněn.
- Pro jednotlivá nasazení ji lze přepínat pomocí hodnoty `compression.mcpDescriptionCompressionEnabled` v tabulce nastavení `key_value` (výchozí stav: povoleno) — v uživatelském rozhraní je dostupná jako **Analytika → Komprese popisů MCP**.
- V rámci celého procesu ji lze přepínat pomocí `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` nebo `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Statistiky v reálném čase jsou dostupné prostřednictvím `omniroute_compression_status` v části `analytics.mcpDescriptionCompression` a jsou označeny `source: "mcp_metadata_estimate"`, aby je bylo možné odlišit od skutečných záznamů o využití poskytovatele.

---

## Snížení počtu nástrojů (F4.3)

Komprese popisu zmenšuje metadata jednotlivých nástrojů; **snížení počtu nástrojů** jde ještě o krok dál tím, že omezuje, _kolik_ nástrojů je vůbec zveřejněno. Zveřejnění menšího počtu nástrojů v manifestu `tools/list` snižuje náklady na tokeny za katalog nástrojů, které model klienta platí při každém požadavku (komprese „vrstvy 5“). Implementace je čistý filtr bez uchovávání stavu v `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), zapojený do registrační smyčky v `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Volitelné, ve výchozím nastavení vypnuté.** Filtr se spustí pouze tehdy, když je nastavena alespoň jedna ze dvou proměnných prostředí; pokud není nastavena ani jedna, všech 110 nástrojů se zveřejní beze změny.

| Proměnná         | Režim                                                                                                      |
| :--------------- | :--------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Seznam zakázaných — čárkami oddělené názvy nástrojů, které jsou vždy vynechány z `tools/list`              |
| `MCP_TOOL_ALLOW` | Seznam povolených — čárkami oddělené názvy nástrojů; zachovají se pouze tyto, všechny ostatní se vynechají |

`deny` má přednost před `allow`. Názvy jsou oddělené čárkami, okolní mezery se odstraní a prázdné položky se ignorují. Příklady:

```bash
# Vynechání dvou nástrojů z katalogu
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Zveřejnění pouze nástrojů pro směrování a kvóty (režim seznamu povolených)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Jak se filtrované nástroje odstraňují:** registrace vždy proběhne úspěšně; nástroj odmítnutý profilem je poté deaktivován pomocí `.disable()` na popisovači SDK MCP, takže se nikdy neobjeví v `tools/list`, ale propojení zůstane zachováno (čistá aktivace/deaktivace bez opětovné registrace). Analyzátor profilu je `readMcpToolProfileFromEnv(process.env)`, který vrací `null` (bez filtrování), pokud jsou obě proměnné prázdné.

Rozšířenější struktura `ToolProfile`, na které je založena funkce `reduceToolManifest`, podporuje také filtrování podle průniku rozsahů (`allowScopes`, s porovnáváním zástupných vzorů typu `read:*`) a deterministický limit `maxTools`, ale tyto dva parametry vyžadují při registraci úplný manifest a dnes **nejsou** zpřístupněny prostřednictvím proměnných prostředí (navazující podpora na úrovni `tools/list` je evidována). Funkce `estimateManifestTokens()` umožňuje porovnat tokenové náklady manifestu před redukcí a po ní.

---

## Prezenční signál běhového prostředí

Transport stdio ukládá každých 5 sekund informace o dostupnosti do `${DATA_DIR}/runtime/mcp-heartbeat.json`. Řídicí panel (`/api/mcp/status`) čte tento soubor spolu se stavem procesu podle PID a na jejich základě odvozuje hodnotu `online`. Transporty HTTP místo toho hlásí stav z procesní funkce `getMcpHttpStatus()` (bez zápisu do souboru).

Snímek prezenčního signálu obsahuje:

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

## Protokolování auditu

Každé volání nástroje se pomocí `open-sse/mcp-server/audit.ts` zaznamenává do tabulky SQLite `mcp_tool_audit`:

- Název nástroje, argumenty (hašované/zkrácené podle hodnoty `auditLevel` daného nástroje), výsledek
- Doba trvání v ms, příznak úspěchu/neúspěchu, chybová zpráva (pokud je relevantní)
- Hash klíče API, časové razítko
- Zamítnutí rozsahu se zaznamenávají jako `scope_denied:<reason>` se seznamem chybějících rozsahů

K prohlížení nedávných volání použijte řídicí panel nebo koncové body REST `/api/mcp/audit` a `/api/mcp/audit/stats`.

---

## Soubory

| Soubor                                                                   | Účel                                                                             |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Továrna MCP serveru, vstupní bod stdio, registrace nástrojů dle rozsahu          |
| `open-sse/mcp-server/httpTransport.ts`                                   | Transport SSE + Streamable HTTP (správa relací)                                  |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Vyhodnocení rozsahu nástrojů a určení volajícího                                 |
| `open-sse/mcp-server/audit.ts`                                           | Auditní protokolování volání nástrojů (`mcp_tool_audit`)                         |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Zapisovač signálu aktivity stdio (`mcp-heartbeat.json`)                          |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Komprese popisů pro registry nástrojů, promptů a zdrojů                          |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Schémata Zod + registr nástrojů (`MCP_TOOLS`, 45 položek)                        |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Obslužné rutiny nástrojů fáze 2, mezipaměti a 1proxy                             |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Obslužné rutiny nástrojů pro kompresi                                            |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definice nástrojů pro paměť (3 nástroje)                                         |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definice nástrojů pro dovednosti (4 nástroje)                                    |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definice nástrojů zdroje kontextu Notion (6 nástrojů)                            |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definice nástrojů pro gamifikaci (8 nástrojů)                                    |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Nástroje pro registraci a správu pluginů (8 nástrojů)                            |
| `src/app/api/mcp/status/route.ts`                                        | Koncový bod `/api/mcp/status`                                                    |
| `src/app/api/mcp/tools/route.ts`                                         | Koncový bod `/api/mcp/tools`                                                     |
| `src/app/api/mcp/sse/route.ts`                                           | Trasa transportu SSE `/api/mcp/sse`                                              |
| `src/app/api/mcp/stream/route.ts`                                        | Trasa transportu Streamable HTTP `/api/mcp/stream`                               |
| `src/app/api/mcp/audit/route.ts`                                         | Dotaz na auditní protokol `/api/mcp/audit`                                       |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Agregované auditní metriky `/api/mcp/audit/stats`                                |
| `src/lib/notion/api.ts`                                                  | Klient REST API služby Notion (opakování pokusů, časový limit, klasifikace chyb) |
| `src/lib/db/notion.ts`                                                   | Trvalé uložení tokenu Notion (tabulka `key_value`)                               |
| `src/app/api/settings/notion/route.ts`                                   | API nastavení služby Notion (GET/POST/DELETE)                                    |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Uživatelské rozhraní pro správu tokenu Notion                                    |
| `tests/unit/notion-api.test.ts`                                          | Testy klienta API služby Notion (7)                                              |
| `tests/unit/notion-tools.test.ts`                                        | Testy vynucování rozsahu nástrojů Notion (10)                                    |
| `tests/unit/db/notion.test.mjs`                                          | Testy databázového modulu Notion (3)                                             |
