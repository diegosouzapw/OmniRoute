# OmniRoute MCP Server Documentation (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol server sa 110 alata za operacije usmjeravanja, keširanja, kompresije, memorije, vještina, proxyja, poola, Radara i izvora konteksta.
>
> Izvor istine: `open-sse/mcp-server/server.ts` izračunava **110 jedinstvenih alata** pomoću `countUniqueMcpTools()`: 45 kanonskih definicija (uključujući šest CCR alata životnog ciklusa, trio agent-skills, `omniroute_radar_catalog` i `omniroute_x_search`), plus memorija (3), vještine (4), GitHub vještine (3), pool (6), gamifikacija (8), dodaci (8), Notion (6), Obsidian (22), lokalni korpus (3) i dva alata za kompresiju namijenjena isključivo RTK-u.

## Instalacija

OmniRoute MCP je ugrađen. Pokrenite ga pomoću:

```bash
omniroute --mcp
```

Ili putem open-sse transporta:

```bash
# HTTP transport sa strujanjem (port 20130)
omniroute --dev  # MCP se automatski pokreće na /mcp krajnjoj tački
```

HTTP transporti (`sse` / `streamable-http`, koje unutar procesa poslužuje server kontrolne ploče)
podrazumijevano su isključeni i ranije su se mogli uključivati samo sa stranice `/dashboard/mcp`. Od v3.8.51
CLI ima iste mogućnosti:

```bash
omniroute mcp status                                  # omogućeno/na mreži, transport, broj alata
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resetuje aktivne sse/streamable-http sesije
```

`mcp enable`/`mcp disable` putem PATCH zahtjeva mijenjaju istu postavku `mcpEnabled` (i opcionalno `mcpTransport`)
koju kontrolna ploča mijenja putem `/api/settings`. `mcp restart` poziva `POST /api/mcp/restart`: prekida
aktivne `sse`/`streamable-http` sesije kako bi se sljedeći zahtjev ponovo ispravno inicijalizirao, vraća
`409` ako je MCP onemogućen i `501` za transport `stdio` (stdio klijenti upravljaju vlastitim
podprocesom — ne postoji ručica unutar procesa za ponovno pokretanje).

## Transporti

MCP server pruža tri transporta, a svi se zasnivaju na istoj `createMcpServer()` tvornici:

| Transport         | Gdje                                          | Kada koristiti                                           |
| :---------------- | :-------------------------------------------- | :------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`               | IDE integracije (Claude Desktop, Cursor itd.)            |
| `sse`             | `POST/GET /api/mcp/sse` putem `httpTransport` | Klijenti preglednika/agenta kojima treba tok događaja    |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`             | HTTP klijenti s više sesija (`mcp-session-id` zaglavlje) |

Aktivni HTTP transport (`sse` ili `streamable-http`) bira se pomoću postavke `mcpTransport`. Promjena transporta zatvara postojeće sesije na drugom transportu.

### Udaljeni pristup (zaobilaženje putem manage opsega)

`/api/mcp/*` je u LOCAL_ONLY nivou (`src/server/authz/routeGuard.ts`) — podrazumijevano mu mogu pristupiti samo lokalni hostovi (`localhost`, `127.0.0.1`, `::1`). Od v3.8.2, klijenti koji nisu lokalni mogu se povezati ako dostave `Authorization: Bearer <api-key>` čiji ključ ima `manage` opseg. Ovo je jedini način pristupa udaljenom MCP serveru kroz tunel, obrnuti proxy ili javno ime hosta.

```bash
# Dodijelite manage opseg: otvorite stranicu API ključeva na kontrolnoj ploči i uključite
# "Pristup upravljanju" za ključ ili pošaljite POST sa scopes:["manage"] prilikom kreiranja.

# Zatim se povežite iz udaljenog MCP klijenta:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ključ bez `manage` opsega (ili bez Bearer tokena) vraća `403 LOCAL_ONLY`. Srodni prefiks `/api/cli-tools/runtime/*` namjerno NIJE moguće zaobići — pogledajte [Nivoi zaštite ruta — izuzetak za manage opseg](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Konfiguracija IDE-a

Pogledajte [Konfiguracija MCP klijenta](../guides/SETUP_GUIDE.md#mcp-client-configuration) za postavljanje Claude Desktopa,
Cursora, Clinea i kompatibilnih MCP klijenata.

---

## Osnovni alati (14) — Faza 1

| Alat                            | Opsezi                | Opis                                                                                                                                                  |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Vrijeme rada, memorija, zaštitni prekidači, ograničenja brzine, statistika predmemorije                                                               |
| `omniroute_list_combos`         | `read:combos`         | Sve konfigurirane kombinacije sa strategijama (opcionalne metrike)                                                                                    |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metrike performansi za određenu kombinaciju                                                                                                           |
| `omniroute_switch_combo`        | `write:combos`        | Aktiviranje ili deaktiviranje kombinacije                                                                                                             |
| `omniroute_create_combo`        | `write:combos`        | Kreiranje validirane kombinacije putem postojećeg API-ja za kombinacije                                                                               |
| `omniroute_check_quota`         | `read:quota`          | Iskorištena/ukupna kvota, preostali postotak, vrijeme resetiranja, stanje tokena                                                                      |
| `omniroute_route_request`       | `execute:completions` | Slanje dovršetka razgovora putem OmniRoute usmjeravanja                                                                                               |
| `omniroute_cost_report`         | `read:usage`          | Izvještaj o troškovima po periodu (sesija/dan/sedmica/mjesec)                                                                                         |
| `omniroute_list_models_catalog` | `read:models`         | Potpuni katalog modela s mogućnostima, statusom i cijenama                                                                                            |
| `omniroute_radar_catalog`       | `read:radar`          | Lokalni potpisani Radar katalog; opcionalni filteri prema pružaocu/porodici                                                                           |
| `omniroute_tool_search`         | `read:tools`          | Otkrivanje alata iz registriranog MCP kataloga                                                                                                        |
| `omniroute_web_search`          | `execute:search`      | Pretraživanje weba putem konfiguriranih pružalaca pretrage. Ne uključuje X/Twitter.                                                                   |
| `omniroute_x_search`            | `execute:search`      | Pretraživanje X-a putem xAI/SuperGrok ili odabir `xquik-search` za rezultate Xquik API-ja. Zahtijeva pristupne podatke za odabrani pozadinski servis. |
| `omniroute_web_fetch`           | `execute:search`      | Dohvatanje web-sadržaja putem konfiguriranih pružalaca za dohvaćanje                                                                                  |

## Napredni alati (11) — Faza 2

| Alat                               | Opsezi                               | Opis                                                                                                                                              |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulacija usmjeravanja bez izvršavanja, sa stablom rezervnih opcija                                                                              |
| `omniroute_set_budget_guard`       | `write:budget`                       | Budžet sesije s radnjom degradiranja/blokiranja/upozorenja                                                                                        |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Ažuriranje kombinovane strategije tokom izvođenja (prioritetna/ponderisana/automatska/itd.)                                                       |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Primjena unaprijed definisanog profila otpornosti `aggressive` / `balanced` / `conservative`                                                      |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Testiranje uživo svakog pružatelja u kombinaciji pomoću stvarnog poziva prema vanjskom servisu                                                    |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metrike po pružatelju s p50/p95/p99 latencijom i stanjem prekidača kola                                                                           |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Preporučivanje kombinacije prema vrsti zadatka uz ograničenja budžeta/latencije                                                                   |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Objašnjenje zašto je zahtjev usmjeren pružatelju (faktori bodovanja + rezervne opcije)                                                            |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Potpuni snimak sesije: trošak, tokeni, najkorišteniji modeli/pružatelji, greške, zaštita budžeta                                                  |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Dijagnosticiranje (i opcionalno automatsko popravljanje) odstupanja baze podataka, kao što su neispravne reference kombinacija / napušteni redovi |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sinhroniziranje podataka o cijenama iz vanjskih izvora (LiteLLM); podržava `dryRun`                                                               |

## Alati za keširanje (2)

| Alat                    | Opsezi        | Opis                                                          |
| :---------------------- | :------------ | :------------------------------------------------------------ |
| `omniroute_cache_stats` | `read:cache`  | Statistika semantičkog keša, keša promptova i idempotentnosti |
| `omniroute_cache_flush` | `write:cache` | Pražnjenje keša globalno ili prema potpisu/modelu             |

## Alati za kompresiju (13)

| Alat                                | Opsezi              | Opis                                                                                                                                     |
| :---------------------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Postavke kompresije, sažetak analitike i statistika koja uzima u obzir keš (uključuje metapodatke `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Konfiguriranje načina kompresije, praga, ciljanog omjera, očuvanja sistemskog prompta i prekidača kompresije MCP opisa                   |
| `omniroute_set_compression_engine`  | `write:compression` | Odabir aktivnog mehanizma (off/caveman/rtk/stacked) i intenziteta Caveman/RTK                                                            |
| `omniroute_list_compression_combos` | `read:compression`  | Prikaz imenovanih kombinacija kompresije i njihovih cjevovoda mehanizama                                                                 |
| `omniroute_compression_combo_stats` | `read:compression`  | Analitika grupisana prema kombinaciji kompresije i mehanizmu                                                                             |
| `omniroute_ccr_store`               | `write:compression` | Pohranjivanje sadržaja izoliranog po pozivaocu u ograničeno CCR spremište u memoriji i vraćanje oznake uz `ccr://` referencu             |
| `omniroute_ccr_retrieve`            | `read:compression`  | Dohvaćanje CCR sadržaja u cijelosti ili pomoću načina rada za početak, kraj, redove, grep i statistiku                                   |
| `omniroute_ccr_inspect`             | `read:compression`  | Pregled metapodataka CCR-a u vlasništvu pozivaoca bez vraćanja sadržaja                                                                  |
| `omniroute_ccr_list`                | `read:compression`  | Prikaz straničenih metapodataka za CCR blokove u vlasništvu pozivaoca                                                                    |
| `omniroute_ccr_delete`              | `write:compression` | Brisanje CCR bloka u vlasništvu pozivaoca                                                                                                |
| `omniroute_ccr_stats`               | `read:compression`  | Izvještavanje o upotrebi memorije po pozivaocu, brojačima životnog ciklusa i ograničenjima spremišta                                     |
| `omniroute_rtk_discover`            | `read:compression`  | Otkrivanje ponavljajućeg šuma u dobrovoljno dostavljenim uzorcima RTK izlaza                                                             |
| `omniroute_rtk_learn`               | `read:compression`  | Generiranje nacrta RTK filtera za pregled iz dobrovoljno dostavljenih uzoraka                                                            |

CCR unosi postoje samo u memoriji i nestaju nakon ponovnog pokretanja. Svaki blok je ograničen na 2 MiB, svaki
principal na 16 MiB, a globalno spremište na 64 MiB. Zadani TTL unosa je 24 sata (najviše
sedam dana). Potpuno MCP dohvaćanje ograničeno je na 256 KiB; veći blokovi ostaju dostupni putem
načina rada s rasponima i grepom. Pohrana, dohvaćanje, prikaz, pregled, brisanje i statistika izolirani su prema
autenticiranom principalu API ključa. Zapisi revizije sadrže sažetke i metapodatke o veličini, ali nikada sadržaj.

`omniroute_compression_status` zasebno prijavljuje kompresiju MCP opisa pod
`analytics.mcpDescriptionCompression`. Te vrijednosti predstavljaju procjene veličine metapodataka za MCP opise
koji se mogu izlistati (`tools`, `prompts`, `resources` i `resourceTemplates`); one nisu potvrde o korištenju
pružaoca usluga i označene su sa `source: "mcp_metadata_estimate"`.

### MCP filter stabla pristupačnosti (v3.8.0)

Odvojeno od prethodno navedenih alata za kompresiju, OmniRoute uključuje filter nakon izvršavanja koji
komprimira **rezultate alata** MCP alata za preglednike/pristupačnost prije nego što se vrate
agentu. Ovaj filter sam po sebi nije alat — transparentno se izvršava nad svakim rezultatom alata koji sadrži
opširan tekst stabla pristupačnosti ili snimka preglednika (≥2000 znakova).

Ključna ponašanja:

- Sažima ≥30 uzastopnih ponovljenih redova istog nivoa u sažetak s početnim i završnim dijelom
- Zadržava sidra `[ref=eXX]` potrebna za Playwright/korištenje računara
- Prisilno skraćuje prevelik tekst (>50,000 znakova) uz uputu za navigaciju
- Očekivana ušteda: **60–80%** na sadržajima snimaka preglednika

Konfiguracija: `compression.mcpAccessibility` u globalnim postavkama (migracija 056).
Implementacija: `open-sse/services/compression/engines/mcpAccessibility/`.
Potpuna dokumentacija: [Mehanizmi kompresije — MCP filter stabla pristupačnosti](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Pogledajte [Mehanizmi kompresije](../compression/COMPRESSION_ENGINES.md) i [RTK kompresija](../compression/RTK_COMPRESSION.md) za
model kompresije tokom izvršavanja na kojem se zasnivaju ovi alati.

## 1Proxy alati (3)

| Alat                        | Opsezi         | Opis                                                                                        |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Dohvaća besplatne proxyje s 1proxy tržišta (filteri protokola/zemlje/kvaliteta/ograničenja) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Dohvaća sljedeći dostupni proxy prema strategiji (`random` / `quality` / `sequential`)      |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistika skupa, status sinhronizacije i raspodjela prema protokolu i zemlji               |

## Memorijski alati (3)

Definisani u `open-sse/mcp-server/tools/memoryTools.ts`. Autentifikacija/opseg provodi se kroz standardni MCP tok opsega.

| Alat                      | Opsezi         | Opis                                                                                                 |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Pretražuje memorije prema upitu / vrsti / API ključu uz provođenje ograničenja budžeta tokena        |
| `omniroute_memory_add`    | `write:memory` | Dodaje novi memorijski zapis (`factual` / `episodic` / `procedural` / `semantic`)                    |
| `omniroute_memory_clear`  | `write:memory` | Briše memorije za API ključ, uz opcionalno filtriranje prema vrsti ili vremenskoj oznaci `olderThan` |

## Alati vještina (4)

Definisani u `open-sse/mcp-server/tools/skillTools.ts`. Podržani putem `src/lib/skills/registry` + `src/lib/skills/executor`.

| Alat                          | Opsezi           | Opis                                                                                                    |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | Navodi registrirane vještine uz opcionalno filtriranje prema API ključu, nazivu ili stanju omogućenosti |
| `omniroute_skills_enable`     | `write:skills`   | Omogućava ili onemogućava određenu vještinu prema ID-u                                                  |
| `omniroute_skills_execute`    | `execute:skills` | Izvršava vještinu s navedenim ulaznim podacima i vraća zapis izvršenja                                  |
| `omniroute_skills_executions` | `read:skills`    | Navodi nedavnu historiju izvršavanja vještina                                                           |

## Notion izvor konteksta (6)

Definisan u `open-sse/mcp-server/tools/notionTools.ts`. Token je pohranjen u tabeli `key_value` putem `src/lib/db/notion.ts`. REST klijent nalazi se u `src/lib/notion/api.ts`. API postavki nalazi se u `src/app/api/settings/notion/route.ts`. Korisnički interfejs kontrolne ploče nalazi se u `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Konfigurišite svoj Notion integracijski token na kartici **Izvori konteksta** na kontrolnoj ploči krajnje tačke ili putem REST API-ja:

```bash
# Postavite token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Provjerite status
curl http://localhost:20128/api/settings/notion

# Prekinite vezu
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Alat                         | Opsezi         | Opis                                                                |
| :--------------------------- | :------------- | :------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Pretražuje puni tekst na svim stranicama i u svim bazama podataka   |
| `notion_get_page`            | `read:notion`  | Dohvaća stranicu prema ID-u zajedno s njenim svojstvima             |
| `notion_list_block_children` | `read:notion`  | Navodi podređene blokove stranice ili bloka                         |
| `notion_query_database`      | `read:notion`  | Pretražuje bazu podataka pomoću filtera, sortiranja i paginacije    |
| `notion_get_database`        | `read:notion`  | Dohvaća šemu baze podataka prema ID-u                               |
| `notion_append_blocks`       | `write:notion` | Dodaje podređene blokove nadređenom bloku (najviše 100 po zahtjevu) |

## Alati kataloga vještina agenata (3)

Definisani u `open-sse/mcp-server/tools/agentSkillTools.ts`. Podržani putem `src/lib/agentSkills/catalog`. Ovi alati izlažu katalog dokumentacije Agent Skills sa 45 stavki MCP klijentima i vanjskim agentima. Opseg: `read:catalog`.

| Alat                              | Opsezi         | Opis                                                                                                                                                         |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Navodi svih 45 vještina agenata uz opcionalne filtere `category` (api\|cli) i `area`; vraća metapodatke + pokrivenost                                        |
| `omniroute_agent_skills_get`      | `read:catalog` | Dohvata potpune metapodatke + sadržaj SKILL.md za jednu vještinu prema kanonskom `id`-u                                                                      |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistika pokrivenosti: koliko od 23 API, 21 CLI i 1 konfiguracijske vještine ima SKILL.md datoteke u datotečnom sistemu u odnosu na ukupan broj u katalogu |

Pogledajte [AGENT-SKILLS.md](./AGENT-SKILLS.md) za kompletan katalog i način na koji ga vanjski agenti koriste.

## Povezani radni okviri (v3.8.0)

Gornji inventar MCP alata (110 jedinstvenih alata, izračunato pomoću `countUniqueMcpTools()`) namjerno je
ograničen na operacije usmjeravanja/keširanja/kompresije/memorije/vještina/proxyja/izvora konteksta tokom izvršavanja. Dva susjedna
radna okvira isporučuju se uz MCP server u v3.8.0 i zasebno su dokumentovana:

### Agenti u oblaku

Agenti u oblaku su AI agenti za programiranje izvan procesa (codex-cloud, cursor-cloud, devin, jules), povezani s
OmniRouteom putem istog modela povezivanja koji se koristi za LLM pružaoce usluga. Izloženi su putem
vlastitog REST sučelja (`/api/v1/agents/*`) i **nisu** dio kataloga MCP alata
— pozivanje agenta u oblaku ne koristi MCP opseg.

- Implementacija: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Životni ciklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentacija: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Zaštitne mjere

Zaštitne mjere su filteri prije/nakon izvršavanja (vision-bridge, pii-masker, prompt-injection)
koji se primjenjuju unutar cjevovoda za razgovor. Izvršavaju se prije nego što se dosegne sloj MCP alata/usmjeravanja
i šalju strukturirana kršenja u cjevovod revizije; ne pozivaju se kao MCP alati.

- Implementacija: `src/lib/guardrails/`.
- Dokumentacija: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Prilikom otklanjanja grešaka MCP poziva koji izgleda blokiran, provjerite i MCP revizijski zapis
(`scope_denied:*` stavke) i revizijski trag zaštitnih mjera — zahtjev može biti odbijen zbog
zaštitne mjere **prije** nego što uopće dosegne sloj za provođenje MCP opsega.

---

## REST API krajnje tačke

| Krajnja tačka          | Metoda                | Opis                                                                                                      | Autentifikacija            |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | Status servera: signal aktivnosti, stanje HTTP transporta, sažetak revizijske aktivnosti                  | Upravljanje (sesija/admin) |
| `/api/mcp/tools`       | `GET`                 | Katalog alata (naziv, opis, opsezi, faza, izvorne krajnje tačke)                                          | Upravljanje                |
| `/api/mcp/sse`         | `GET` / `POST`        | Krajnja tačka SSE transporta (ograničena s `mcpEnabled` + `mcpTransport === "sse"`)                       | API ključ + opsezi         |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamable HTTP transport (koristi zaglavlje `mcp-session-id`; `DELETE` završava sesiju)                  | API ključ + opsezi         |
| `/api/mcp/audit`       | `GET`                 | Stavke revizijskog zapisa iz `mcp_tool_audit` (filteri: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Upravljanje                |
| `/api/mcp/audit/stats` | `GET`                 | Agregirana statistika revizije (`totalCalls`, `successRate`, `avgDurationMs`, najčešći alati)             | Upravljanje                |

Izvorne datoteke: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

I SSE i Streamable HTTP transporti blokirani su dok se MCP server ne omogući u postavkama (`mcpEnabled`) i ne odabere odgovarajući `mcpTransport`. Ako je konfigurisan pogrešan transport, ruta vraća HTTP 400 uz savjet za promjenu postavki.

---

## Autentifikacija i opsezi

MCP alati se autentificiraju putem opsega API ključa. Provođenje pravila opsega centralizirano je u
`open-sse/mcp-server/scopeEnforcement.ts`. Svaki alat zahtijeva određene opsege:

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

Podržani su zamjenski opsezi: `read:*` dodjeljuje sve opsege za čitanje, a `*` dodjeljuje puni pristup.

### `mcp:connect` — usko ograničena mogućnost rute (#7895)

Pristup HTTP/SSE MCP transportu (`/api/mcp/*`) izvan loopback interfejsa zahtijeva
LOCAL_ONLY izuzetak za `/api/mcp/` (pogledajte `docs/security/ROUTE_GUARD_TIERS.md`). Historijski
je taj izuzetak prihvatao samo API ključ s punim opsegom `manage`/`admin` — što je preširoko za
pozivaoca kojem je potrebna samo komunikacija s MCP-om. `src/shared/constants/managementScopes.ts` sada
izvozi `MCP_CONNECT_SCOPE = "mcp:connect"`: dodatni, usko ograničeni opseg (po istom presedanu kao
`SELF_USAGE_SCOPE`) koji autorizira ISKLJUČIVO zaobilaženje za `/api/mcp/` u
`src/server/authz/policies/management.ts` — ne dodjeljuje pristup nijednoj drugoj upravljačkoj ruti
i namjerno je IZOSTAVLJEN iz `MANAGEMENT_API_KEY_SCOPES`. Ključ koji sadrži `manage`/`admin`
i dalje nepromijenjeno prolazi kroz izuzetak; `mcp:connect` je alternativa s nižim privilegijama za
udaljene pozivaoce koji koriste samo MCP, a provjerava se putem `hasMcpConnectOrManageScope()`.

### Vezivanje HTTP opsega po ključu (#7895)

Preko HTTP/SSE-a, `open-sse/mcp-server/httpTransport.ts` sada razrješava stvarne
`api_keys.scopes` pozivaoca putem `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
i prosljeđuje ih MCP SDK-ovom pozivu `transport.handleRequest(req, { authInfo })`, tako da
`extra.authInfo.scopes`, koji stiže do svakog poziva alata, odražava vlastite opsege Bearer ključa.
`resolveCallerScopeContext()` iz `scopeEnforcement.ts` već je davao prednost `authInfo` u odnosu
na `_meta` i rezervnu opciju iz varijable okruženja `OMNIROUTE_MCP_SCOPES` — ovim se samo popunjava taj prvi
izvor najvišeg prioriteta, koji se ranije nije popunjavao preko HTTP-a. Kada se nijedan API ključ ne razriješi
(nema zaglavlja ili je ključ nevažeći), `authInfo` ostaje `undefined`, a razrješavanje se nepromijenjeno
nastavlja kroz postojeći lanac `meta`/varijabla okruženja. Ovo NE mijenja podrazumijevanu vrijednost za
`OMNIROUTE_MCP_ENFORCE_SCOPES` — provođenje se i dalje mora izričito omogućiti; ova promjena samo osigurava
da putanja po ključu dobije prednost nakon što se to učini. stdio nema identitet po pozivaocu (pogledajte
`mcpCallerIdentity.ts`) i ova promjena na njega ne utječe — ostaje na rezervnom lancu `_meta`/varijabla okruženja.

---

## Varijable okruženja

| Varijabla                               | Zadana vrijednost                    | Svrha                                                                                                                                         |
| :-------------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`             | Osnovni URL koji MCP server koristi prilikom pozivanja internih OmniRoute API-ja                                                              |
| `OMNIROUTE_API_KEY`                     | (prazno)                             | API ključ koji se prosljeđuje kao `Authorization: Bearer` internim API pozivima                                                               |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (omogućava ga samo `"true"`) | Kada je omogućeno, nedostajući opsezi odbijaju pozive alata i bilježe `scope_denied:<reason>` u zapisnik revizije                             |
| `OMNIROUTE_MCP_SCOPES`                  | (prazno)                             | Zarezima odvojena lista dozvoljenih opsega koji se podrazumijevano smatraju „dostupnim“ (koristi se kada pozivalac ne navede vlastite opsege) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nije postavljeno = uključeno)       | Kada je postavljeno na `0/false/off/no`, onemogućava kompresiju MCP opisa pri registraciji                                                    |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nije postavljeno = uključeno)       | Alternativni pseudonim za istu prethodno navedenu postavku                                                                                    |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                              | Vremensko ograničenje za prekid internih upravljačkih čitanja (stanje, otpornost, kombinacije, kvota, upotreba)                               |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                              | Vremensko ograničenje za prekid koraka koji čekaju pružaoca (`route_request`, `web_search`, `web_fetch`)                                      |
| `MCP_TOOL_DENY`                         | (nije postavljeno = bez filtera)     | Zarezima odvojeni nazivi alata koji se izostavljaju iz `tools/list` (smanjenje kardinalnosti alata — pogledajte u nastavku)                   |
| `MCP_TOOL_ALLOW`                        | (nije postavljeno = bez filtera)     | Zarezima odvojeni nazivi alata koji se isključivo zadržavaju (režim liste dozvoljenih — pogledajte u nastavku)                                |
| `DATA_DIR`                              | `~/.omniroute`                       | Datoteka signala aktivnosti zapisuje se u `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                            |

---

## Kompresija opisa

Registri MCP alata, upita i resursa mogu kompresovati opise prilikom registracije/izlistavanja kako bi smanjili količinu metapodataka izloženih klijentima (a time i trošak konteksta upita). Implementacija se nalazi u `open-sse/mcp-server/descriptionCompressor.ts` i povezana je s MCP serverom putem `compressMcpRegistryMetadata` unutar `createMcpServer()`.

- Kompresija se izvršava nad tekstom opisa koristeći skup pravila Caveman (`getRulesForContext("all", "full")`) uz izdvajanje sačuvanih blokova (isječci koda, ograđeni blokovi itd.) kako se strukturni sadržaj ne bi izmijenio.
- Uključite ili isključite za pojedinačnu implementaciju putem vrijednosti `compression.mcpDescriptionCompressionEnabled` u tabeli postavki `key_value` (zadano: omogućeno) — u korisničkom interfejsu dostupno kao **Analitika → Kompresija MCP opisa**.
- Uključite ili isključite za cijeli proces putem `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ili `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Statistike u stvarnom vremenu dostupne su putem `omniroute_compression_status` pod `analytics.mcpDescriptionCompression` i označene sa `source: "mcp_metadata_estimate"` kako bi se razlikovale od stvarnih potvrda o korištenju pružaoca.

---

## Smanjenje broja alata (F4.3)

Kompresija opisa smanjuje metapodatke svakog alata; **smanjenje broja alata** ide korak dalje smanjujući _broj_ alata koji se uopće objavljuju. Oglašavanje manjeg broja alata u manifestu `tools/list` smanjuje trošak tokena po zahtjevu koji klijentov model plaća za katalog alata (kompresija „sloja 5“). Implementacija je čisti filter bez stanja u `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), povezan s petljom registracije u `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Aktivira se po izboru i podrazumijevano je isključeno.** Filter se pokreće samo kada je postavljena najmanje jedna od dvije varijable okruženja; ako nijedna nije postavljena, svih 110 alata objavljuje se bez izmjena.

| Varijabla        | Način rada                                                                                     |
| :--------------- | :--------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Crna lista — nazivi alata odvojeni zarezima koji se uvijek uklanjaju iz `tools/list`           |
| `MCP_TOOL_ALLOW` | Lista dozvoljenih — nazivi alata odvojeni zarezima; samo oni ostaju, a svi ostali se uklanjaju |

`deny` ima prednost nad `allow`. Nazivi su odvojeni zarezima, uklanjaju se okolni razmaci, a prazni unosi se zanemaruju. Primjeri:

```bash
# Ukloni dva alata iz kataloga
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Objavi samo alate za usmjeravanje i kvote (način rada s listom dozvoljenih)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Kako se filtrirani alati uklanjaju:** registracija uvijek uspijeva; alat koji profil odbije zatim se onemogućava pomoću `.disable()` na MCP SDK ručki, tako da se nikada ne pojavljuje u `tools/list`, ali povezivanje ostaje netaknuto (uredno omogućavanje/onemogućavanje, bez ponovne registracije). Parser profila je `readMcpToolProfileFromEnv(process.env)`, koji vraća `null` (bez filtriranja) kada su obje varijable prazne.

Bogati oblik `ToolProfile` iza `reduceToolManifest` također podržava filtriranje presjekom opsega (`allowScopes`, s podudaranjem zamjenskih znakova poput `read:*`) i determinističko ograničenje `maxTools`, ali te dvije postavke zahtijevaju potpuni manifest u trenutku registracije i danas **nisu** dostupne putem varijabli okruženja (naknadna implementacija kuke na nivou `tools/list` evidentirana je za praćenje). `estimateManifestTokens()` je dostupan za poređenje troška tokena manifesta prije i poslije smanjenja.

---

## Signal aktivnosti izvršnog okruženja

Transport stdio bilježi stanje aktivnosti u `${DATA_DIR}/runtime/mcp-heartbeat.json` svakih 5 sekundi. Kontrolna tabla (`/api/mcp/status`) čita ovu datoteku zajedno sa stanjem aktivnosti PID-a kako bi odredila vrijednost `online`. HTTP transporti umjesto toga prijavljuju stanje putem `getMcpHttpStatus()` unutar procesa (bez upisivanja u datoteku).

Snimak signala aktivnosti sadrži:

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

## Evidentiranje revizije

Svaki poziv alata evidentira se u SQLite tabeli `mcp_tool_audit` putem `open-sse/mcp-server/audit.ts`:

- Naziv alata, argumenti (heširani/skraćeni u skladu s vrijednošću `auditLevel` za pojedinačni alat), rezultat
- Trajanje u ms, oznaka uspjeha/neuspjeha, poruka o grešci (kada je primjenjivo)
- Heš API ključa, vremenska oznaka
- Odbijanja opsega evidentiraju se kao `scope_denied:<reason>` s listom nedostajućih opsega

Koristite kontrolnu tablu ili REST krajnje tačke `/api/mcp/audit` i `/api/mcp/audit/stats` za pregled nedavnih poziva.

---

## Datoteke

| Datoteka                                                                 | Namjena                                                                                    |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Tvornica MCP servera, stdio ulazna tačka, registracije alata prema opsegu                  |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transport (upravljanje sesijama)                                     |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Evaluacija opsega alata i razrješavanje pozivaoca                                          |
| `open-sse/mcp-server/audit.ts`                                           | Evidentiranje poziva alata radi revizije (`mcp_tool_audit`)                                |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio zapisivač signala aktivnosti (`mcp-heartbeat.json`)                                  |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kompresija opisa za registre alata / upita / resursa                                       |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod sheme + registar alata (`MCP_TOOLS`, 45 unosa)                                         |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Rukovatelji alatima za fazu 2 + predmemoriju + 1proxy                                      |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Rukovatelji alatima za kompresiju                                                          |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definicije alata za memoriju (3 alata)                                                     |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definicije alata za vještine (4 alata)                                                     |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definicije alata za Notion izvor konteksta (6 alata)                                       |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definicije alata za gejmifikaciju (8 alata)                                                |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Alati za registraciju i upravljanje dodacima (8 alata)                                     |
| `src/app/api/mcp/status/route.ts`                                        | Krajnja tačka `/api/mcp/status`                                                            |
| `src/app/api/mcp/tools/route.ts`                                         | Krajnja tačka `/api/mcp/tools`                                                             |
| `src/app/api/mcp/sse/route.ts`                                           | Ruta SSE transporta `/api/mcp/sse`                                                         |
| `src/app/api/mcp/stream/route.ts`                                        | Ruta Streamable HTTP transporta `/api/mcp/stream`                                          |
| `src/app/api/mcp/audit/route.ts`                                         | Upit evidencije revizije `/api/mcp/audit`                                                  |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Agregirane metrike revizije `/api/mcp/audit/stats`                                         |
| `src/lib/notion/api.ts`                                                  | Klijent za Notion REST API (ponovni pokušaj, vremensko ograničenje, klasifikacija grešaka) |
| `src/lib/db/notion.ts`                                                   | Trajno čuvanje Notion tokena (tabela `key_value`)                                          |
| `src/app/api/settings/notion/route.ts`                                   | API za Notion postavke (GET/POST/DELETE)                                                   |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Korisničko sučelje za upravljanje Notion tokenima                                          |
| `tests/unit/notion-api.test.ts`                                          | Testovi Notion API klijenta (7)                                                            |
| `tests/unit/notion-tools.test.ts`                                        | Testovi provođenja opsega Notion alata (10)                                                |
| `tests/unit/db/notion.test.mjs`                                          | Testovi Notion DB modula (3)                                                               |
