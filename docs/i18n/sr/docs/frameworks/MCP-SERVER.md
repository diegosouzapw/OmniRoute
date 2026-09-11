# MCP-SERVER (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

---

title: "Документација OmniRoute MCP сервера"
version: 3.8.50
lastUpdated: 2026-08-08
---

# Документација OmniRoute MCP сервера

> Model Context Protocol сервер са 110 алата за рутирање, кеш, компресију, меморију, вештине, прокси, пул, Radar и операције извора контекста.
>
> Извор истине: `open-sse/mcp-server/server.ts` рачуна **110 уникатних алата** уз помоћ `countUniqueMcpTools()`: 45 канонских дефиниција (укључујући шест CCR life­cycle алата, трио agent-skills, `omniroute_radar_catalog` и `omniroute_x_search`), плус меморија (3), вештине (4), GitHub вештине (3), пул (6), гамификација (8), додаци (8), Notion (6), Obsidian (22), локални корпус (3) и два алата за компресију само за RTK.

## Инсталација

OmniRoute MCP је уграђен. Покрените га са:

```bash
omniroute --mcp
```

Или преко open-sse транспорта:

```bash
# HTTP streamable транспорт (порт 20130)
omniroute --dev  # MCP се аутоматски покреће на /mcp путањи
```

## Транспорти

MCP сервер излаже три транспорта, све на основу исте `createMcpServer()` фабрике:

| Транспорт         | Где                                           | Када користити                                            |
| :---------------- | :-------------------------------------------- | :-------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`               | IDE интеграције (Claude Desktop, Cursor, итд.)            |
| `sse`             | `POST/GET /api/mcp/sse` преко `httpTransport` | Клијенти у прегледачу/агенти којима је потребан event ток |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`             | HTTP клијенти са више сесија (`mcp-session-id` заглавље)  |

Активни HTTP транспорт (`sse` или `streamable-http`) се бира преко подешавања `mcpTransport`. Промена транспорта затвара постојеће сесије на другом транспорту.

### Удаљени приступ (manage-scope заобилажење)

`/api/mcp/*` је у LOCAL_ONLY нивоу (`src/server/authz/routeGuard.ts`) — по подразумеваним подешавањима само loopback хостови (`localhost`, `127.0.0.1`, `::1`) могу да му приступе. Од верзије v3.8.2, клијенти који нису loopback могу се повезати ако представе `Authorization: Bearer <api-key>` чији кључ носи `manage` опсег. Ово је једини начин да се дође до удаљеног MCP сервера преко тунела, reverse proxy-ja или јавног хост имена.

```bash
# Додели manage опсег: отворите страницу API Keys у контролној табли и укључите
# "Management Access" на кључу, или пошаљите POST scopes:["manage"] приликом креирања.

# Затим се повежите са удаљеног MCP клијента:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Кључ без manage опсега (или без Bearer заглавља) враћа `403 LOCAL_ONLY`. Сродни префикс `/api/cli-tools/runtime/*` намерно НИЈЕ могуће заобићи — погледајте [Нивои Route Guard-а — Изузетак за manage опсег](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE конфигурација

Погледајте [MCP Client Configuration](../guides/SETUP_GUIDE.md#mcp-client-configuration) за подешавање Claude Desktop,
Cursor, Cline и компатибилних MCP клијента.

---

## Основни алати (14) — Фаза 1

| Алат                            | Обим (Scopes)         | Опис                                                                                                                                |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Време рада, memory, circuit breakers, ограничења брзине, статистика кеша                                                            |
| `omniroute_list_combos`         | `read:combos`         | Сви конфигурисани combo-и са стратегијама (опционе метрике)                                                                         |
| `omniroute_get_combo_metrics`   | `read:combos`         | Метрике перформанси за одређени combo                                                                                               |
| `omniroute_switch_combo`        | `write:combos`        | Активирање или деактивирање combo-а                                                                                                 |
| `omniroute_create_combo`        | `write:combos`        | Креирање валидираног combo-а кроз постојећи combo API                                                                               |
| `omniroute_check_quota`         | `read:quota`          | Искоришћена/укупна квота, преостали проценат, време ресетовања, здравље токена                                                      |
| `omniroute_route_request`       | `execute:completions` | Слање chat completion-а кроз OmniRoute рутирање                                                                                     |
| `omniroute_cost_report`         | `read:usage`          | Извештај о трошковима по периоду (сесија/дан/недеља/месец)                                                                          |
| `omniroute_list_models_catalog` | `read:models`         | Потпун каталог модела са могућностима, статусом, ценама                                                                             |
| `omniroute_radar_catalog`       | `read:radar`          | Локални потписани Radar каталог; опциони филтери провајдера/фамилије                                                                |
| `omniroute_tool_search`         | `read:tools`          | Откривање алата из регистрованог MCP каталога                                                                                       |
| `omniroute_web_search`          | `execute:search`      | Претрага веба кроз конфигурисане претраживачке провајдере. Не X/Twitter.                                                            |
| `omniroute_x_search`            | `execute:search`      | Претрага X-а преко xAI/SuperGrok, или изаберите `xquik-search` за резултате Xquik API-ја. Захтева креденцијале за изабрани backend. |
| `omniroute_web_fetch`           | `execute:search`      | Преузимање веб садржаја кроз конфигурисане fetch провајдере                                                                         |

## Napredni alati (11) — Faza 2

| Alat                               | Obim                                 | Opis                                                                                                                                          |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulacija rutiranja bez izvršavanja (dry-run) sa stablom rezervnih opcija (fallback tree)                                                    |
| `omniroute_set_budget_guard`       | `write:budget`                       | Budžet sesije sa akcijom degrade/block/alert                                                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Ažuriranje strategije kombinacije u realnom vremenu (priority/weighted/auto/itd.)                                                             |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Primena preseta otpornosti `aggressive` / `balanced` / `conservative`                                                                         |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Testiranje uživo svakog provajdera u kombinaciji korišćenjem stvarnog upstream pozivа                                                         |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metrike po provajderu sa p50/p95/p99 latencijom i stanjem circuit breaker-a                                                                   |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Preporuka kombinacije po tipu zadatka sa ograničenjima budžeta/latencije                                                                      |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Objašnjava zašto je zahtev rutiran ka određenom provajderu (faktori bodovanja + rezervne opcije)                                              |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Kompletan snimak sesije: trošak, tokeni, top modeli/provajderi, greške, budget guard                                                          |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Dijagnostika (i opcionalno automatska popravka) drifta baze podataka kao što su slomljene referenca kombinacija / siroče redovi (orphan rows) |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sinhronizacija podataka o cenama iz eksternih izvora (LiteLLM); podržava `dryRun`                                                             |

## Alati za keš (2)

| Alat                    | Obim          | Opis                                                        |
| :---------------------- | :------------ | :---------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Statistika semantičkog keša, prompt-keša i idempotency keša |
| `omniroute_cache_flush` | `write:cache` | Brisanje keša globalno ili po potpisu/modelu                |

## Alati za kompresiju (13)

| Alat                                | Obim                | Opis                                                                                                                             |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Podešavanja kompresije, sažetak analitike i statistika svesna keša (uključuje metapodatke `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Konfigurisanje režima kompresije, praga, ciljanog odnosa, očuvanja sistemskog prompta, prekidača za kompresiju MCP opisa         |
| `omniroute_set_compression_engine`  | `write:compression` | Izbor aktivnog mehanizma (off/caveman/rtk/stacked) i intenziteta Caveman/RTK                                                     |
| `omniroute_list_compression_combos` | `read:compression`  | Ispis imenovanih kombinacija kompresije i njihovih tokova mehanizama (pipelines)                                                 |
| `omniroute_compression_combo_stats` | `read:compression`  | Analitika grupisana po kombinaciji kompresije i mehanizmu                                                                        |
| `omniroute_ccr_store`               | `write:compression` | Skladištenje sadržaja izolovanog po pozivaocu u ograničeno memorijsko skladište CCR i vraćanje markera plus referenca `ccr://`   |
| `omniroute_ccr_retrieve`            | `read:compression`  | Preuzimanje CCR sadržaja u celosti ili u režimima head, tail, lines, grep i stats                                                |
| `omniroute_ccr_inspect`             | `read:compression`  | Pregled metapodataka CCR koje poseduje pozivalac, bez vraćanja sadržaja                                                          |
| `omniroute_ccr_list`                | `read:compression`  | Ispis paginirаnih metapodataka za CCR blokove koje poseduje pozivalac                                                            |
| `omniroute_ccr_delete`              | `write:compression` | Brisanje CCR bloka koji poseduje pozivalac                                                                                       |
| `omniroute_ccr_stats`               | `read:compression`  | Izveštaj o korišćenju memorije po pozivaocu, brojačima životnog ciklusa i ograničenjima skladišta                                |
| `omniroute_rtk_discover`            | `read:compression`  | Otkrivanje ponavljajućeg šuma u opt-in uzorcima RTK izlaza                                                                       |
| `omniroute_rtk_learn`               | `read:compression`  | Generisanje nacrta RTK filtera za pregled na osnovu opt-in uzoraka                                                               |

CCR unosi postoje samo u memoriji i nestaju prilikom restarta. Svaki blok je ograničen na 2 MiB, svaki
principal na 16 MiB, a globalno skladište na 64 MiB. Unosi podrazumevano imaju TTL od 24 sata (maksimalno
sedam dana). Kompletno MCP preuzimanje je ograničeno na 256 KiB; veći blokovi ostaju dostupni kroz
opsegovne (ranged) i grep režime. Skladištenje, preuzimanje, ispisivanje, pregled, brisanje i statistika su izolovani po
autentifikovanom principalu API ključa. Zapisi revizije sadrže heš vrednosti i metapodatke o veličini, nikada sadržaj.

`omniroute_compression_status` prijavljuje kompresiju MCP opisa odvojeno pod
`analytics.mcpDescriptionCompression`. Te vrednosti su procene veličine metapodataka za MCP opise sa
mogućnošću ispisivanja (`tools`, `prompts`, `resources` i `resourceTemplates`); one nisu potvrde o
korišćenju provajdera i označene su sa `source: "mcp_metadata_estimate"`.

### MCP filter stabla pristupačnosti (v3.8.0)

Odvojeno od gore navedenih alata za kompresiju, OmniRoute uključuje filter posle izvršavanja koji
komprimuje **rezultate alata** MCP alata za pregledač/pristupačnost pre nego što se vrate agentu. Ovaj filter
nije sam po sebi alat — on radi transparentno na svakom rezultatu alata koji sadrži opsežan
tekst stabla pristupačnosti ili snimka pregledača (≥2000 karaktera).

Ključna ponašanja:

- Sažima ≥30 uzastopnih ponovljenih susedskih linija u sažetak head + tail
- Očuvava `[ref=eXX]` anchor tačke koje su potrebne za Playwright/computer-use
- Tvrdo skraćuje prevelike tekstove (>50.000 karaktera) sa savetom za navigaciju
- Očekivana ušteda: **60–80%** na payload-ovima snimaka pregledača

Konfiguracija: `compression.mcpAccessibility` u globalnim podešavanjima (migracija 056).
Implementacija: `open-sse/services/compression/engines/mcpAccessibility/`.
Potpuna dokumentacija: [Mehanizmi kompresije — MCP filter stabla pristupačnosti](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Pogledajte [Mehanizmi kompresije](../compression/COMPRESSION_ENGINES.md) i [RTK kompresija](../compression/RTK_COMPRESSION.md) za
model kompresije u realnom vremenu koji stoji iza ovih alata.

## 1Proxy алати (3)

| Алат                        | Опсези         | Опис                                                                                        |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Преузимање бесплатних proxy-ja са 1proxy тржишта (филтери за протокол/земљу/квалитет/лимит) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Добијање следећег доступног proxy-ja по стратегији (`random` / `quality` / `sequential`)    |
| `omniroute_oneproxy_stats`  | `read:proxies` | Статистика пула, статус синхронизације, дистрибуција по протоколу и земљи                   |

## Алати за меморију (3)

Дефинисани у `open-sse/mcp-server/tools/memoryTools.ts`. Ауторизација/опсег се примењује кроз стандардни MCP scope pipeline.

| Алат                      | Опсези         | Опис                                                                                       |
| :------------------------ | :------------- | :----------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Претрага меморија по упиту / типу / API кључу уз спровођење ограничења токена              |
| `omniroute_memory_add`    | `write:memory` | Додавање новог уноса меморије (`factual` / `episodic` / `procedural` / `semantic`)         |
| `omniroute_memory_clear`  | `write:memory` | Брисање меморија за API кључ, опционо филтрирано по типу или временској ознаци `olderThan` |

## Алати за вештине (4)

Дефинисани у `open-sse/mcp-server/tools/skillTools.ts`. Заснивају се на `src/lib/skills/registry` + `src/lib/skills/executor`.

| Алат                          | Опсези           | Опис                                                                                            |
| :---------------------------- | :--------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Приказ регистрованих вештина са опционим филтрирањем по API кључу, имену или статусу активности |
| `omniroute_skills_enable`     | `write:skills`   | Активирање или деактивирање одређене вештине по ID-у                                            |
| `omniroute_skills_execute`    | `execute:skills` | Извршавање вештине са задатим улазом и враћање записа о извршавању                              |
| `omniroute_skills_executions` | `read:skills`    | Приказ историје недавних извршавања вештина                                                     |

## Notion извор контекста (6)

Дефинисан у `open-sse/mcp-server/tools/notionTools.ts`. Токен се чува у табели `key_value` преко `src/lib/db/notion.ts`. REST клијент се налази у `src/lib/notion/api.ts`. Settings API у `src/app/api/settings/notion/route.ts`. Кориснички интерфејс контролне табле у `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Конфигуришите свој Notion integration токен из картице **Context Sources** у контролној табли Endpoint-а, или преко REST API-ja:

```bash
# Постављање токена
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Провера статуса
curl http://localhost:20128/api/settings/notion

# Прекид везе
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Алат                         | Опсези         | Опис                                                                      |
| :--------------------------- | :------------- | :------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Full-text претрага кроз све странице и базе података                      |
| `notion_get_page`            | `read:notion`  | Добијање странице по ID-у са њеним својствима                             |
| `notion_list_block_children` | `read:notion`  | Приказ подређених блокова странице или блока                              |
| `notion_query_database`      | `read:notion`  | Упит базе података са филтерима, сортирањем и пагинацијом                 |
| `notion_get_database`        | `read:notion`  | Добијање шеме базе података по ID-у                                       |
| `notion_append_blocks`       | `write:notion` | Додавање подређених блокова родитељском блоку (максимално 100 по захтеву) |

## Agent Skill Catalog Tools (3)

Definisano u `open-sse/mcp-server/tools/agentSkillTools.ts`. Podržano sa `src/lib/agentSkills/catalog`. Ovi alati izlažu katalog dokumentacije od 45 stavki Agent Skills MCP klijentima i eksternim agentima. Opseg: `read:catalog`.

| Alat                              | Opsezi         | Opis                                                                                                                                         |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Prikazuje svih 45 agent skill-ova sa opcionim filterima `category` (api\|cli) i `area`; vraća metapodatke + pokrivenost                      |
| `omniroute_agent_skills_get`      | `read:catalog` | Preuzima kompletne metapodatke + sadržaj SKILL.md fajla za pojedinačni skill po kanonskom `id`                                               |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistika pokrivenosti: koliko od 23 API, 21 CLI i 1 config skill-a ima SKILL.md fajlove na fajl sistemu u odnosu na ukupan broj u katalogu |

Pogledajte [AGENT-SKILLS.md](./AGENT-SKILLS.md) za kompletan katalog i način na koji eksterni agenti koriste ovo.

## Povezani frejmvorci (v3.8.0)

Gore navedeni inventar MCP alata (110 jedinstvenih alata, izračunato funkcijom `countUniqueMcpTools()`) je namerno
ograničen na operacije runtime rutiranja/keša/kompresije/memorije/skill-ova/proksija/context-source. Dva srodna
frejmvorka isporučuju se zajedno sa MCP serverom u v3.8.0 i dokumentovani su odvojeno:

### Cloud Agents

Cloud Agents su AI agenti za kodiranje koji rade van procesa (codex-cloud, cursor-cloud, devin, jules), povezani u
OmniRoute preko istog modela konekcije koji se koristi za LLM provajdere. Oni su izloženi preko
sopstvene REST površine (`/api/v1/agents/*`) i **nisu** deo MCP kataloga alata
— pozivanje Cloud Agent-a ne troši MCP opseg.

- Implementacija: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Životni ciklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentacija: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails su filteri koji se primenjuju pre/posle izvršavanja (vision-bridge, pii-masker, prompt-injection),
primenjeni unutar chat pipeline-a. Oni se izvršavaju pre nego što se dostigne sloj MCP alat/ruta
i emituju strukturisane prekršaje ka audit pipeline-u; ne pozivaju se kao MCP alati.

- Implementacija: `src/lib/guardrails/`.
- Dokumentacija: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Prilikom debagovanja MCP poziva koji izgleda blokiran, provjerite i MCP audit log
(`scope_denied:*` unosi) i audit trag guardrails-a — zahtev može biti odbijen od strane
guardrail-a **prije** nego što uopšte dođe do sloja za sprovođenje MCP opsega.

---

## REST API Endpoints

| Endpoint               | Metod                 | Opis                                                                                             | Autentikacija             |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------- | :------------------------ |
| `/api/mcp/status`      | `GET`                 | Status servera: heartbeat, stanje HTTP transporta, sažetak audit aktivnosti                      | Management (sesija/admin) |
| `/api/mcp/tools`       | `GET`                 | Katalog alata (naziv, opis, opsezi, faza, izvorne krajnje tačke)                                 | Management                |
| `/api/mcp/sse`         | `GET` / `POST`        | Krajnja tačka SSE transporta (uslovljeno sa `mcpEnabled` + `mcpTransport === "sse"`)             | API ključ + opsezi        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamable HTTP transport (koristi `mcp-session-id` header; `DELETE` završava sesiju)            | API ključ + opsezi        |
| `/api/mcp/audit`       | `GET`                 | Unosi audit loga iz `mcp_tool_audit` (filteri: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Management                |
| `/api/mcp/audit/stats` | `GET`                 | Agregirana statistika audita (`totalCalls`, `successRate`, `avgDurationMs`, top alati)           | Management                |

Izvorni fajlovi: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

I SSE i Streamable HTTP transport su blokirani sve dok se MCP server ne omogući u Settings (`mcpEnabled`) i ne izabere odgovarajući `mcpTransport`. Ako je konfigurisan pogrešan transport, ruta vraća HTTP 400 sa naznakom da promenite podešavanja.

---

## Autentikacija i opsezi (Scopes)

MCP alati se autentikuju putem opsega API ključa (API key scopes). Sprovođenje opsega je centralizovano u
`open-sse/mcp-server/scopeEnforcement.ts`. Svaki alat zahteva specifične opsege:

| Opseg                 | Alati                                                                                                                                                                              |
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
| `read:obsidian`       | 13 alata za čitanje — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 alata za pisanje — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                  |

Podržani su opsezi sa džokerom (wildcard): `read:*` dodeljuje sve opsege za čitanje, `*` dodeljuje pun pristup.

### `mcp:connect` — uzana mogućnost rute (#7895)

Dostupanje HTTP/SSE MCP transportu (`/api/mcp/*`) sa non-loopback zahteva
`/api/mcp/` LOCAL_ONLY izuzetak (carve-out) (vidi `docs/security/ROUTE_GUARD_TIERS.md`). Ranije je
taj izuzetak prihvatao samo API ključ sa punim `manage`/`admin` opsegom — što je bilo previše široko za
pozivača kome je potrebna samo komunikacija sa MCP. `src/shared/constants/managementScopes.ts` sada
izvozi `MCP_CONNECT_SCOPE = "mcp:connect"`: dodatan, uzan opseg (isti precedens kao
`SELF_USAGE_SCOPE`) koji autorizuje SAMO `/api/mcp/` premošćavanje (bypass) u
`src/server/authz/policies/management.ts` — ne dodeljuje nikakav drugi pristup upravljačkim rutama
i namerno je izostavljen iz `MANAGEMENT_API_KEY_SCOPES`. Ključ koji poseduje `manage`/`admin`
i dalje neizmenjeno prolazi kroz taj izuzetak; `mcp:connect` je alternativa nižih privilegija za
udaljene pozivače koji koriste samo MCP, provereno putem `hasMcpConnectOrManageScope()`.

### Vezivanje HTTP opsega po ključu (#7895)

Preko HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` sada razrešava stvarne opsege pozivača
`api_keys.scopes` putem `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
i prosleđuje ih MCP SDK-u kroz `transport.handleRequest(req, { authInfo })`, tako da
`extra.authInfo.scopes` koji stiže do svakog pozivanja alata odražava sopstvene opsege Bearer ključa.
`resolveCallerScopeContext()` u `scopeEnforcement.ts` je već dodeljivao prioritet `authInfo` u odnosu na
`_meta` i rezervnu (fallback) opciju `OMNIROUTE_MCP_SCOPES` env promenljive — ova izmena samo popunjava taj prvi,
prioritetni izvor, koji ranije nije bio popunjen preko HTTP-a. Kada se ne razreši nijedan API ključ
(nema zaglavlja, nevažeći ključ), `authInfo` ostaje `undefined` i razrešavanje se nepromenjeno vraća na
postojeći `meta`/env lanac. Ovo NE menja podrazumevanu vrednost za `OMNIROUTE_MCP_ENFORCE_SCOPES`—
sprovođenje se i dalje mora eksplicitno omogućiti; ova izmena samo omogućava da putanja po ključu ima prioritet
kada je omogućeno. stdio nema identitet po pozivaču (vidi
`mcpCallerIdentity.ts`) i na njega ovo ne utiče — ostaje na `_meta`/env rezervnom lancu.

---

## Environment Variables

| Varijabla                               | Podrazumevana vrednost               | Namena                                                                                                                                                |
| :-------------------------------------- | :----------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`             | Osnovni URL koji MCP server koristi prilikom pozivanja internih OmniRoute API-ja                                                                      |
| `OMNIROUTE_API_KEY`                     | (prazno)                             | API ključ koji se prosleđuje kao `Authorization: Bearer` internim API pozivima                                                                        |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (samo `"true"` je omogućava) | Kada je omogućeno, nedostajući opsezi (scopes) odbijaju pozive alata i upisuju `scope_denied:<reason>` u audit log                                    |
| `OMNIROUTE_MCP_SCOPES`                  | (prazno)                             | Lista opsega odvojenih zapetama koja se po podrazumevanom podešavanju smatra "dostupnom" (koristi se kada pozivač ne prosledi svoje sopstvene opsege) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nepostavljeno = uključeno)          | Kada je postavljeno na `0/false/off/no`, isključuje MCP kompresiju opisa u trenutku registracije                                                      |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nepostavljeno = uključeno)          | Alternativni alijas za isti prekidač kao gore                                                                                                         |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                              | Budžet za prekid operacije za interna upravljačka čitanja (health, resilience, combos, quota, usage)                                                  |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                              | Budžet za prekid operacije za skokove koji čekaju na provajdera (`route_request`, `web_search`, `web_fetch`)                                          |
| `MCP_TOOL_DENY`                         | (nepostavljeno = bez filtera)        | Nazivi alata odvojeni zapetama koje treba izbaciti iz `tools/list` (redukcija kardinalnosti alata — vidi ispod)                                       |
| `MCP_TOOL_ALLOW`                        | (nepostavljeno = bez filtera)        | Nazivi alata odvojeni zapetama koje treba isključivo zadržati (mod dozvoljene liste — vidi ispod)                                                     |
| `DATA_DIR`                              | `~/.omniroute`                       | Fajl otkucaja srca (heartbeat) se upisuje u `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                  |

---

## Kompresija opisa

MCP registri alata, upita (prompt) i resursa mogu kompresovati opise u trenutku registracije/listanja radi smanjenja metapodataka izloženih klijentima (a time i troška prostora u kontekstu upita). Implementacija se nalazi u `open-sse/mcp-server/descriptionCompressor.ts` i povezana je sa MCP serverom preko `compressMcpRegistryMetadata` unutar `createMcpServer()`.

- Kompresija se vrši nad tekstom opisa koristeći Caveman skup pravila (`getRulesForContext("all", "full")`) sa ekstrakcijom sačuvanih blokova (isečci koda, blokovi u ogradama itd.) tako da strukturni sadržaj ne bude izmenjen.
- Prekidač po instalaciji putem vrednosti `compression.mcpDescriptionCompressionEnabled` u tabeli podešavanja `key_value` (podrazumevano: uključeno) — izložen u korisničkom interfejsu kao **Analytics → MCP description compression**.
- Prekidač na nivou celog procesa putem `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ili `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Statistike u realnom vremenu prikazuju se putem `omniroute_compression_status` pod `analytics.mcpDescriptionCompression` i označene su sa `source: "mcp_metadata_estimate"` radi razlikovanja od stvarnih potvrda o potrošnji provajdera.

---

## Смањење кардиналности алата (F4.3)

Компресија описа смањује метаподатке сваког алата; **смањење кардиналности алата** иде корак даље — смањује _колико_ алата се уопште пријављује. Оглашавање мањег броја алата у манифесту `tools/list` смањује трошак токена по захтеву који клијентски модел плаћа за каталог алата ("layer 5" компресија). Имплементација је чист, бездржавни филтер у `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), укачен у петљу регистрације у `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Опционо, подразумевано искључено.** Филтер се покреће само ако је постављена бар једна од две променљиве окружења; ако ниједна није постављена, свих 110 алата се пријављује без измена.

| Променљива       | Режим                                                                               |
| :--------------- | :---------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Црна листа — имена алата раздвојена зарезом која се увек уклањају из `tools/list`   |
| `MCP_TOOL_ALLOW` | Бела листа — имена алата раздвојена зарезом; само она опстају, све остало се уклања |

`deny` има приоритет над `allow`. Имена се раздвајају зарезом, тримују се, а празни уноси се игноришу. Примери:

```bash
# Уклони два алата из каталога
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Пријави само алате за рутирање + квоту (режим беле листе)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Како се филтрирани алати уклањају:** регистрација увек успева; алат који профил одбије се затим `.disable()`-ује на MCP SDK хендлу, тако да се никада не појављује у `tools/list`, али каблирање остаје интактно (чисто укључивање/искључивање, без поновне регистрације). Парсер профила је `readMcpToolProfileFromEnv(process.env)`, који враћа `null` (без филтрирања) када су обе променљиве празне.

Богатији облик `ToolProfile` иза `reduceToolManifest` такође подржава филтрирање пресеком опсега (`allowScopes`, са подударањем по типу wildcard-а стила `read:*`) и детерминистички максимум `maxTools`, али та два прекидача захтевају цео манифест у тренутку регистрације и **нису** данас изложена преко променљивих окружења (кука на нивоу `tools/list` је планирана надоградња која се пратити). `estimateManifestTokens()` је доступна за поређење трошка токена манифеста пре и после смањења.

---

## Runtime Heartbeat (откуцај у раду)

Stdio транспорт трајно чува активност у `${DATA_DIR}/runtime/mcp-heartbeat.json` сваких 5 секунди. Контролна табла (`/api/mcp/status`) чита овај фајл плус активност PID-а да би извела `online`. HTTP транспорти пријављују стање из унутарпроцесног `getMcpHttpStatus()` уместо тога (без уписа у фајл).

Снимак откуцаја садржи:

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

## Audit Logging (Логовање провере)

Сваки позив алата се логује у SQLite табелу `mcp_tool_audit` преко `open-sse/mcp-server/audit.ts`:

- Име алата, аргументи (хеширани/скраћени према `auditLevel` за конкретан алат), резултат
- Трајање у ms, ознака успех/неуспех, порука о грешци (када је применљиво)
- Хеш API кључа, временска ознака
- Одбијања опсега се логују као `scope_denied:<reason>` са листом недостајућих опсега

Користите контролну таблу или REST крајње тачке `/api/mcp/audit` и `/api/mcp/audit/stats` за преглед недавних позива.

---

## Fajlovi

| Fajl                                                                     | Namena                                                                    |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------ |
| `open-sse/mcp-server/server.ts`                                          | Fabrika MCP servera, ulazna tačka za stdio, registracije alata sa opsegom |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transport (upravljanje sesijama)                    |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Evaluacija opsega alata i razrešavanje pozivača                           |
| `open-sse/mcp-server/audit.ts`                                           | Beleženje audita poziva alata (`mcp_tool_audit`)                          |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Pisač heartbeat-a za stdio (`mcp-heartbeat.json`)                         |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kompresija opisa za registre alata / promptova / resursa                  |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod šeme + registar alata (`MCP_TOOLS`, 45 stavki)                        |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Handleri alata za Fazu 2 + keš + 1proxy alate                             |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Handleri alata za kompresiju                                              |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definicije alata za memoriju (3 alata)                                    |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definicije alata za veštine (4 alata)                                     |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definicije alata za Notion izvore konteksta (6 alata)                     |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definicije alata za gamifikaciju (8 alata)                                |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Alati za registraciju i upravljanje pluginovima (8 alata)                 |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` endpoint                                                |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` endpoint                                                 |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE transportna ruta                                       |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP transportna ruta                        |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` upit nad audit logom                                     |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` agregirane metrike audita                          |
| `src/lib/notion/api.ts`                                                  | Notion REST API klijent (retry, timeout, klasifikacija grešaka)           |
| `src/lib/db/notion.ts`                                                   | Perzistencija Notion tokena (tabela `key_value`)                          |
| `src/app/api/settings/notion/route.ts`                                   | Notion podešavanja API (GET/POST/DELETE)                                  |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI za upravljanje Notion tokenom                                          |
| `tests/unit/notion-api.test.ts`                                          | Testovi Notion API klijenta (7)                                           |
| `tests/unit/notion-tools.test.ts`                                        | Testovi primene opsega Notion alata (10)                                  |
| `tests/unit/db/notion.test.mjs`                                          | Testovi Notion DB modula (3)                                              |
