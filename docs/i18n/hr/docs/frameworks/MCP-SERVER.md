# MCP-SERVER (Hrvatski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

---

title: "OmniRoute MCP Server Dokumentacija"
version: 3.8.50
lastUpdated: 2026-08-08
---

# OmniRoute MCP Server Dokumentacija

> Model Context Protocol server s 110 alata za usmjeravanje, predmemoriju, kompresiju, memoriju, vještine, proxy, pool, Radar i operacije kontekstnih izvora.
>
> Izvor istine: `open-sse/mcp-server/server.ts` izračunava **110 jedinstvenih alata** pomoću `countUniqueMcpTools()`: 45 kanonskih definicija (uključujući šest CCR lifecycle alata, trio agent-skills, `omniroute_radar_catalog` i `omniroute_x_search`), plus memorija (3), vještine (4), GitHub vještine (3), pool (6), gamifikacija (8), dodaci (8), Notion (6), Obsidian (22), lokalni korpus (3) i dva RTK-ekskluzivna alata za kompresiju.

## Instalacija

OmniRoute MCP je ugrađen. Pokrenite ga s:

```bash
omniroute --mcp
```

Ili putem open-sse transporta:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP se automatski pokreće na /mcp endpointu
```

## Transporti

MCP server izlaže tri transporta, svi podržani istom `createMcpServer()` tvornicom:

| Transport         | Lokacija                                      | Kada koristiti                                                |
| :---------------- | :-------------------------------------------- | :------------------------------------------------------------ |
| `stdio`           | `open-sse/mcp-server/server.ts`               | Integracije s IDE-ovima (Claude Desktop, Cursor, itd.)        |
| `sse`             | `POST/GET /api/mcp/sse` putem `httpTransport` | Klijenti u pregledniku/agentu kojima je potreban tok događaja |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`             | HTTP klijenti s više sesija (zaglavlje `mcp-session-id`)      |

Aktivni HTTP transport (`sse` ili `streamable-http`) odabire se postavkom `mcpTransport`. Promjena transporta zatvara postojeće sesije na drugom transportu.

### Udaljeni pristup (zaobilaženje manage-scope)

`/api/mcp/*` je u LOCAL_ONLY razini (`src/server/authz/routeGuard.ts`) — prema zadanim postavkama samo loopback domaćini (`localhost`, `127.0.0.1`, `::1`) mogu mu pristupiti. Od verzije v3.8.2, klijenti koji nisu loopback mogu se spojiti ako predaju `Authorization: Bearer <api-key>` čiji ključ nosi opseg `manage`. To je jedini način za pristup udaljenom MCP serveru kroz tunel, obratni proxy ili javno ime domaćina.

```bash
# Dodijelite manage opseg: otvorite stranicu API ključeva na upravljačkoj ploči i uključite
# "Management Access" na ključu, ili POST scopes:["manage"] prilikom stvaranja.

# Zatim se spojite s udaljenog MCP klijenta:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ključ bez manage opsega (ili bez Bearera) vraća `403 LOCAL_ONLY`. Susjedni prefiks `/api/cli-tools/runtime/*` namjerno se NE može zaobići — pogledajte [Razine Route Guarda — Iznimka manage-scope](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Konfiguracija IDE-a

Pogledajte [Konfiguraciju MCP klijenta](../guides/SETUP_GUIDE.md#mcp-client-configuration) za postavljanje Claude Desktop-a,
Cursor-a, Cline-a i kompatibilnih MCP klijenata.

---

## Osnovni alati (14) — Faza 1

| Alat                            | Opsezi                | Opis                                                                                                                                        |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_get_health`          | `read:health`         | Dostupnost, memorija, prekidači strujnog kruga, ograničenja brzine, statistike predmemorije                                                 |
| `omniroute_list_combos`         | `read:combos`         | Sve konfigurirane kombinacije sa strategijama (opcionalne metrike)                                                                          |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metrike performansi za određenu kombinaciju                                                                                                 |
| `omniroute_switch_combo`        | `write:combos`        | Aktiviranje ili deaktiviranje kombinacije                                                                                                   |
| `omniroute_create_combo`        | `write:combos`        | Stvaranje validirane kombinacije putem postojećeg API-ja za kombinacije                                                                     |
| `omniroute_check_quota`         | `read:quota`          | Iskorištena/ukupna kvota, preostali postotak, vrijeme resetiranja, stanje tokena                                                            |
| `omniroute_route_request`       | `execute:completions` | Slanje zahtjeva za dovršavanje razgovora putem OmniRoute usmjeravanja                                                                       |
| `omniroute_cost_report`         | `read:usage`          | Izvješće o troškovima po razdoblju (sesija/dan/tjedan/mjesec)                                                                               |
| `omniroute_list_models_catalog` | `read:models`         | Potpuni katalog modela s mogućnostima, statusom i cijenama                                                                                  |
| `omniroute_radar_catalog`       | `read:radar`          | Lokalni potpisani Radar katalog; opcionalni filteri po davatelju/obitelji                                                                   |
| `omniroute_tool_search`         | `read:tools`          | Otkrivanje alata iz registriranog MCP kataloga                                                                                              |
| `omniroute_web_search`          | `execute:search`      | Pretraživanje weba putem konfiguriranih davatelja usluga pretraživanja. Nije X/Twitter.                                                     |
| `omniroute_x_search`            | `execute:search`      | Pretraživanje X-a putem xAI/SuperGrok-a ili odaberite `xquik-search` za rezultate Xquik API-ja. Zahtijeva vjerodajnice za odabrani backend. |
| `omniroute_web_fetch`           | `execute:search`      | Dohvaćanje web sadržaja putem konfiguriranih davatelja usluga dohvaćanja                                                                    |

## Napredni Alati (11) — Faza 2

| Alat                               | Opsezi                               | Opis                                                                                                                              |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulacija usmjeravanja bez stvarnog izvođenja s prikazom stabla zamjenskih ruta                                                  |
| `omniroute_set_budget_guard`       | `write:budget`                       | Proračunsko ograničenje sesije s radnjama degradacije/blokiranja/upozorenja                                                       |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Ažuriranje strategije kombinirane rute za izvođenja (prioritet/ponderirano/automatski/itd.)                                       |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Primjena predloška otpornosti `aggressive` / `balanced` / `conservative`                                                          |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Testiranje svakog pružatelja u kombinaciji putem stvarnog poziva prema uzvodnom izvoru                                            |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metrike po pružatelju s latencijom p50/p95/p99 i stanjem prekidača strujnog kruga                                                 |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Preporuka kombinacije prema vrsti zadatka uz ograničenja proračuna/latencije                                                      |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Objašnjenje zašto je zahtjev usmjeren prema određenom pružatelju (faktori ocjenjivanja + zamjenske rute)                          |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Potpuni snimak sesije: troškovi, tokeni, vodeći modeli/pružatelji, pogreške, proračunska zaštita                                  |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Dijagnostika (i po potrebi automatski popravak) odstupanja baze podataka poput pokvarenih referenci kombinacija / siročadi redaka |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sinkronizacija podataka o cijenama iz vanjskih izvora (LiteLLM); podržava `dryRun`                                                |

## Alati za Predmemoriju (2)

| Alat                    | Opsezi        | Opis                                                                     |
| :---------------------- | :------------ | :----------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Statistike semantičke predmemorije, predmemorije upita i idempotentnosti |
| `omniroute_cache_flush` | `write:cache` | Ispražnjavanje predmemorije globalno ili prema potpisu/modelu            |

## Alati za Kompresiju (13)

| Alat                                | Opsezi              | Opis                                                                                                                                             |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Postavke kompresije, sažetak analitike i statistike uzimajući u obzir predmemoriju (uključuje metapodatke `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Konfiguriranje načina kompresije, praga, ciljnog omjera, očuvanja sistemskog upita i prekidača za kompresiju MCP opisa                           |
| `omniroute_set_compression_engine`  | `write:compression` | Odabir aktivnog mehanizma (off/caveman/rtk/stacked) i intenziteta Caveman/RTK                                                                    |
| `omniroute_list_compression_combos` | `read:compression`  | Popis imenovanih kombinacija kompresije i njihovih cjevovoda mehanizama                                                                          |
| `omniroute_compression_combo_stats` | `read:compression`  | Analitika grupirana prema kombinaciji kompresije i mehanizmu                                                                                     |
| `omniroute_ccr_store`               | `write:compression` | Pohrana izoliranog sadržaja pozivatelja u ograničenom CCR spremniku u memoriji i vraćanje oznake te `ccr://` reference                           |
| `omniroute_ccr_retrieve`            | `read:compression`  | Dohvaćanje CCR sadržaja u cijelosti ili u modusima glave, repa, redaka, grep-a i statistike                                                      |
| `omniroute_ccr_inspect`             | `read:compression`  | Inspekcija CCR metapodataka u vlasništvu pozivatelja bez vraćanja sadržaja                                                                       |
| `omniroute_ccr_list`                | `read:compression`  | Popis straničnih metapodataka za CCR blokove u vlasništvu pozivatelja                                                                            |
| `omniroute_ccr_delete`              | `write:compression` | Brisanje CCR bloka u vlasništvu pozivatelja                                                                                                      |
| `omniroute_ccr_stats`               | `read:compression`  | Izvješće o korištenju memorije ograničenom na pozivatelja, životnim brojačima i ograničenjima pohrane                                            |
| `omniroute_rtk_discover`            | `read:compression`  | Otkrivanje ponavljajućeg šuma u uzorcima RTK izlaza s uključenim pristankom                                                                      |
| `omniroute_rtk_learn`               | `read:compression`  | Generiranje preglednog nacrta RTK filtra iz uzoraka s uključenim pristankom                                                                      |

CCR unosi postoje isključivo u memoriji i nestaju pri ponovnom pokretanju. Svaki blok ograničen je na 2 MiB, svaki
nositelj na 16 MiB, a globalna pohrana na 64 MiB. Zadani TTL unosa je 24 sata (maksimalno
sedam dana). Puno MCP dohvaćanje ograničeno je na 256 KiB; veći blokovi ostaju dostupni putem
modusa raspona i grep-a. Pohrana, dohvaćanje, listanje, inspekcija, brisanje i statistike izolirani su prema
autentificiranom nositelju API ključa. Zapisi revizije sadrže hasheve i metapodatke veličine, nikada sadržaj.

`omniroute_compression_status` zasebno prikazuje kompresiju MCP opisa pod
`analytics.mcpDescriptionCompression`. Te vrijednosti su procjene veličine metapodataka za MCP opisive
opise (`tools`, `prompts`, `resources` i `resourceTemplates`); nisu potvrde korištenja pružatelja
i označene su s `source: "mcp_metadata_estimate"`.

### MCP Filtar Stabla Pristupačnosti (v3.8.0)

Odvojeno od gore navedenih alata za kompresiju, OmniRoute uključuje filtar koji se izvodi nakon izvođenja i
komprimira **rezultate alata** MCP alata za preglednik/pristupačnost prije nego što se vrate agentu.
Ovaj filtar sam po sebi nije alat — transparentno se izvodi na svakom rezultatu alata koji sadrži
opširni tekst stabla pristupačnosti ili snimke preglednika (≥2000 znakova).

Ključna ponašanja:

- Sažima ≥30 uzastopnih ponavljajućih redaka istih podređenih elemenata u sažetak glave + repa
- Čuva sidra `[ref=eXX]` koja zahtijevaju Playwright/computer-use
- Tvrdo skraćuje preopsežan tekst (>50.000 znakova) s navigacijskim savjetom
- Očekivane uštedine: **60–80%** na korisnim opterećenjima snimki preglednika

Konfiguracija: `compression.mcpAccessibility` u globalnim postavkama (migracija 056).
Implementacija: `open-sse/services/compression/engines/mcpAccessibility/`.
Potpuna dokumentacija: [Mehanizmi Kompresije — MCP Filtar Stabla Pristupačnosti](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Za detalje o modelu kompresije koji stoji iza ovih alata pogledajte [Mehanizme Kompresije](../compression/COMPRESSION_ENGINES.md) i [RTK Kompresiju](../compression/RTK_COMPRESSION.md).

## 1Proxy Alati (3)

| Alat                        | Opsezi         | Opis                                                                                        |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------ |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Dohvaća besplatne proxyje s 1proxy tržišta (filteri protokola/zemlje/kvalitete/ograničenja) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Dohvaća sljedeći dostupni proxy prema strategiji (`random` / `quality` / `sequential`)      |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistike skupa, status sinkronizacije, distribucija po protokolu i zemlji                 |

## Alati za Memoriju (3)

Definirani u `open-sse/mcp-server/tools/memoryTools.ts`. Autorizacija/opsezi provode se kroz standardni MCP cjevovod opsega.

| Alat                      | Opsezi         | Opis                                                                                          |
| :------------------------ | :------------- | :-------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Pretražuje memorije prema upitu / vrsti / API ključu uz primjenu ograničenja tokena           |
| `omniroute_memory_add`    | `write:memory` | Dodaje novi unos memorije (`factual` / `episodic` / `procedural` / `semantic`)                |
| `omniroute_memory_clear`  | `write:memory` | Briše memorije za API ključ, opcionalno filtrirane po vrsti ili vremenskoj oznaci `olderThan` |

## Alati za Vještine (4)

Definirani u `open-sse/mcp-server/tools/skillTools.ts`. Potkrijepljeni s `src/lib/skills/registry` + `src/lib/skills/executor`.

| Alat                          | Opsezi           | Opis                                                                                       |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Prikazuje registrirane vještine s opcionalnim filtriranjem po API ključu, imenu ili stanju |
| `omniroute_skills_enable`     | `write:skills`   | Omogućuje ili onemogućuje određenu vještinu prema ID-u                                     |
| `omniroute_skills_execute`    | `execute:skills` | Izvršava vještinu s navedenim unosom i vraća zapis izvršavanja                             |
| `omniroute_skills_executions` | `read:skills`    | Prikazuje nedavnu povijest izvršavanja vještina                                            |

## Notion Izvor Konteksta (6)

Definirano u `open-sse/mcp-server/tools/notionTools.ts`. Token pohranjen u tablici `key_value` putem `src/lib/db/notion.ts`. REST klijent u `src/lib/notion/api.ts`. API postavki u `src/app/api/settings/notion/route.ts`. Korisničko sučelje nadzorne ploče u `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Konfigurirajte svoj Notion integracijski token s kartice **Izvori Konteksta** na nadzornoj ploči krajnje točke ili putem REST API-ja:

```bash
# Postavi token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Provjeri status
curl http://localhost:20128/api/settings/notion

# Odspoji
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Alat                         | Opsezi         | Opis                                                                   |
| :--------------------------- | :------------- | :--------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Pretraživanje cijelog teksta na svim stranicama i bazama podataka      |
| `notion_get_page`            | `read:notion`  | Dohvaća stranicu prema ID-u zajedno s njezinim svojstvima              |
| `notion_list_block_children` | `read:notion`  | Prikazuje podređene blokove stranice ili bloka                         |
| `notion_query_database`      | `read:notion`  | Upituje bazu podataka s filtrima, sortiranjem i straničenjem           |
| `notion_get_database`        | `read:notion`  | Dohvaća shemu baze podataka prema ID-u                                 |
| `notion_append_blocks`       | `write:notion` | Dodaje podređene blokove nadređenom bloku (maksimalno 100 po zahtjevu) |

## Alati Kataloga Agentskih Vještina (3)

Definirani u `open-sse/mcp-server/tools/agentSkillTools.ts`. Potkrijepljeni s `src/lib/agentSkills/catalog`. Ovi alati izlažu katalog dokumentacije Agentskih Vještina s 45 unosa MCP klijentima i vanjskim agentima. Opseg: `read:catalog`.

| Alat                              | Opsezi         | Opis                                                                                                                                                        |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Popis svih 45 agentskih vještina s neobaveznim filtrima `category` (api\|cli) i `area`; vraća metapodatke + pokrivenost                                     |
| `omniroute_agent_skills_get`      | `read:catalog` | Dohvaća potpune metapodatke + sadržaj SKILL.md za pojedinačnu vještinu prema kanonskom `id`-u                                                               |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistike pokrivenosti: koliko od 23 API, 21 CLI i 1 konfiguracijske vještine ima SKILL.md datoteke u datotečnom sustavu nasuprot ukupnom broju u katalogu |

Pogledajte [AGENT-SKILLS.md](./AGENT-SKILLS.md) za potpuni katalog i način na koji ga vanjski agenti koriste.

## Povezani Okviri (v3.8.0)

Gornji popis MCP alata (110 jedinstvenih alata, izračunato pomoću `countUniqueMcpTools()`) namjerno je
ograničen na operacije usmjeravanja u stvarnom vremenu/predmemorije/kompresije/memorije/vještina/proxyja/kontekstnog izvora. Dva susjedna
okvira isporučuju se zajedno s MCP poslužiteljem u v3.8.0 i dokumentirani su zasebno:

### Cloud Agenti

Cloud Agenti su AI agenti za kodiranje izvan procesa (codex-cloud, cursor-cloud, devin, jules) koji su spojeni u
OmniRoute kroz isti model veze koji se koristi za LLM pružatelje usluga. Izloženi su putem
vlastite REST površine (`/api/v1/agents/*`) i **nisu** dio kataloga MCP alata
— pozivanje Cloud Agenta ne troši MCP opseg.

- Implementacija: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Životni ciklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentacija: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Zaštitne Mjere

Zaštitne mjere su filtri pred-/post-izvođenja (vision-bridge, pii-masker, prompt-injection)
koji se primjenjuju unutar cjevovoda razgovora. Pokreću se prije nego što se dosegne sloj MCP alata/usmjeravanja
i emitiraju strukturirane povrede u revizijski cjevovod; ne pozivaju se kao MCP alati.

- Implementacija: `src/lib/guardrails/`.
- Dokumentacija: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Prilikom otklanjanja pogrešaka MCP poziva koji izgleda blokiran, provjerite i MCP revizijski dnevnik
(unosi `scope_denied:*`) i revizijski trag zaštitnih mjera — zahtjev može biti odbijen od strane
zaštitne mjere **prije** nego što ikada dosegne sloj MCP provjere opsega.

---

## REST API Krajnje Točke

| Krajnja točka          | Metoda                | Opis                                                                                                      | Autentifikacija            |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | Status poslužitelja: otkucaj srca, stanje HTTP transporta, sažetak revizijske aktivnosti                  | Upravljanje (sesija/admin) |
| `/api/mcp/tools`       | `GET`                 | Katalog alata (naziv, opis, opsezi, faza, izvorne krajnje točke)                                          | Upravljanje                |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transportna krajnja točka (uvjetovana s `mcpEnabled` + `mcpTransport === "sse"`)                      | API ključ + opsezi         |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamable HTTP transport (koristi zaglavlje `mcp-session-id`; `DELETE` završava sesiju)                  | API ključ + opsezi         |
| `/api/mcp/audit`       | `GET`                 | Unosi revizijskog dnevnika iz `mcp_tool_audit` (filtri: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Upravljanje                |
| `/api/mcp/audit/stats` | `GET`                 | Agregirane statistike revizije (`totalCalls`, `successRate`, `avgDurationMs`, najpopularniji alati)       | Upravljanje                |

Izvorne datoteke: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

I SSE i Streamable HTTP transporti su blokirani dok MCP poslužitelj nije omogućen u Postavkama (`mcpEnabled`) i odgovarajući `mcpTransport` nije odabran. Ako je konfiguriran pogrešan transport, ruta vraća HTTP 400 s naputkom za promjenu postavki.

---

## Autentifikacija i opsezi

MCP alati se autentificiraju putem opsega API ključeva. Primjena opsega centralizirana je u
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

Podržani su i zamjenski opsezi: `read:*` dodjeljuje sve opsege za čitanje, `*` dodjeljuje potpuni pristup.

### `mcp:connect` — usko usmjerivačko ovlaštenje (#7895)

Pristup HTTP/SSE MCP transportu (`/api/mcp/*`) s ne-povratnih adresa zahtijeva
izuzeće `LOCAL_ONLY` za `/api/mcp/` (vidi `docs/security/ROUTE_GUARD_TIERS.md`). Povijesno
gledano, to izuzeće prihvaćalo je samo API ključ s punim opsegom `manage`/`admin` — preširo za
pozivatelja kojemu je jedina potreba razgovarati s MCP-om. `src/shared/constants/managementScopes.ts` sada
izvozi `MCP_CONNECT_SCOPE = "mcp:connect"`: dodatan, uzan opseg (isti presedan kao
`SELF_USAGE_SCOPE`) koji ovlašćuje ISKLJUČIVO zaobilazak `/api/mcp/` u
`src/server/authz/policies/management.ts` — ne dodjeljuje nikakav drugi pristup upravljačkim rutama
i namjerno je izostavljen iz `MANAGEMENT_API_KEY_SCOPES`. Ključ koji posjeduje `manage`/`admin`
i dalje prolazi izuzećem nepromijenjeno; `mcp:connect` je alternativa s nižim ovlastima za
udaljene pozivatelje koji koriste samo MCP, a provjerava se putem `hasMcpConnectOrManageScope()`.

### Vezivanje HTTP opsega po ključu (#7895)

Putem HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` sada razrješava stvarne
`api_keys.scopes` pozivatelja putem `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
i prosljeđuje ih MCP SDK-ovom `transport.handleRequest(req, { authInfo })`, tako da
`extra.authInfo.scopes` koji pristiže svakom pozivu alata odražava vlastite opsege Bearer ključa.
`resolveCallerScopeContext()` iz `scopeEnforcement.ts` već je davao prioritet `authInfo` ispred
`_meta` i rezervnog rješenja s env varijablom `OMNIROUTE_MCP_SCOPES` — ova promjena samo popunjava
taj prvi, prioritetni izvor koji je prethodno bio nenapunjen putem HTTP-a. Kada se nijedan API ključ
ne može razriješiti (nema zaglavlja, nevažeći ključ), `authInfo` ostaje `undefined` i razrješavanje
pada natrag na postojani lanac `meta`/env nepromijenjen. Ova promjena NE mijenja zadanu vrijednost
`OMNIROUTE_MCP_ENFORCE_SCOPES` — primjena opsega i dalje mora biti eksplicitno omogućena; ova
promjena samo osigurava prednost puta po ključu jednom kada je primjena aktivirana. stdio nema
identitet po pozivatelju (vidi `mcpCallerIdentity.ts`) i nije zahvaćen — ostaje na rezervnom lancu
`_meta`/env.

---

## Varijable okruženja

| Varijabla                               | Zadana vrijednost                | Svrha                                                                                                                                                |
| :-------------------------------------- | :------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`         | Osnovni URL koji MCP poslužitelj koristi pri pozivanju internih OmniRoute API-ja                                                                     |
| `OMNIROUTE_API_KEY`                     | (prazno)                         | API ključ koji se prosljeđuje kao `Authorization: Bearer` internim API pozivima                                                                      |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (samo `"true"` aktivira) | Kada je omogućeno, nedostajući opsezi odbijaju pozive alata i bilježe `scope_denied:<reason>` u revizijskom dnevniku                                 |
| `OMNIROUTE_MCP_SCOPES`                  | (prazno)                         | Dopušteni popis opsega odvojen zarezima koji se smatraju „dostupnima" prema zadanim postavkama (koristi se kad pozivatelj ne navede vlastite opsege) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nije postavljeno = uključeno)   | Kada je postavljeno na `0/false/off/no`, onemogućuje kompresiju MCP opisa pri registraciji                                                           |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nije postavljeno = uključeno)   | Alternativni alias za isti prekidač kao gore                                                                                                         |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                          | Vremenski budžet za interna upravljačka čitanja (zdravlje, otpornost, kombinacije, kvota, korištenje)                                                |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                          | Vremenski budžet za skokove koji čekaju na pružatelja usluge (`route_request`, `web_search`, `web_fetch`)                                            |
| `MCP_TOOL_DENY`                         | (nije postavljeno = bez filtra)  | Nazivi alata odvojeni zarezima koji se izbacuju iz `tools/list` (smanjenje kardinalnosti alata — pogledajte dolje)                                   |
| `MCP_TOOL_ALLOW`                        | (nije postavljeno = bez filtra)  | Nazivi alata odvojeni zarezima koji se isključivo zadržavaju (način rada s dopuštenim popisom — pogledajte dolje)                                    |
| `DATA_DIR`                              | `~/.omniroute`                   | Datoteka otkucaja srca zapisuje se u `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                        |

---

## Kompresija opisa

Registri alata, upita i resursa MCP-a mogu komprimirati opise pri registraciji/listanju kako bi smanjili metapodatkovni otisak izložen klijentima (i time trošak konteksta upita). Implementacija se nalazi u `open-sse/mcp-server/descriptionCompressor.ts` i povezana je s MCP poslužiteljem putem `compressMcpRegistryMetadata` unutar `createMcpServer()`.

- Kompresija se izvodi nad tekstom opisa koristeći skup pravila Caveman (`getRulesForContext("all", "full")`) s ekstrakcijom sačuvanih blokova (blokovi koda, ograđeni blokovi itd.) kako strukturni sadržaj ne bi bio izmijenjen.
- Prekidač po implementaciji putem vrijednosti `compression.mcpDescriptionCompressionEnabled` u tablici postavki `key_value` (zadano: omogućeno) — izloženo u korisničkom sučelju kao **Analytics → MCP description compression**.
- Prekidač za cijeli proces putem `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ili `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Statistike u stvarnom vremenu dostupne su putem `omniroute_compression_status` pod `analytics.mcpDescriptionCompression` i označene su s `source: "mcp_metadata_estimate"` radi razlikovanja od stvarnih potvrda o korištenju pružatelja usluge.

---

## Smanjenje kardinalnosti alata (F4.3)

Kompresija opisa smanjuje metapodatke svakog alata; **smanjenje kardinalnosti alata** ide korak dalje smanjujući _broj_ alata koji se uopće objavljuju. Oglašavanje manjeg broja alata u manifestu `tools/list` smanjuje trošak tokena po zahtjevu koji klijentov model plaća za katalog alata (kompresija „sloja 5"). Implementacija je čisti, bespovratni filtar u `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), uključen u petlju registracije u `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Uključuje se po potrebi, isključeno je prema zadanim postavkama.** Filtar se pokreće samo kada je postavljena barem jedna od dvije varijable okoline; ako nije postavljena ni jedna, svih 110 alata objavljuje se bez promjena.

| Varijabla        | Način rada                                                                                  |
| :--------------- | :------------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | Crna lista — nazivi alata odvojeni zarezom koji se uvijek uklanjaju iz `tools/list`         |
| `MCP_TOOL_ALLOW` | Bijela lista — nazivi alata odvojeni zarezom; samo ovi preživljavaju, sve ostalo se uklanja |

`deny` ima prednost nad `allow`. Nazivi su odvojeni zarezima, obrađeni su trimanjem, a prazni unosi se zanemaruju. Primjeri:

```bash
# Ukloni dva alata iz kataloga
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Objavi samo alate za usmjeravanje i kvotu (način rada bijele liste)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Način na koji se filtrirani alati uklanjaju:** registracija uvijek uspijeva; alat koji profil odbije potom se pozivom `.disable()` onemogućuje na MCP SDK ručici, pa se nikada ne pojavljuje u `tools/list`, ali ožičenje ostaje netaknuto (uredno omogućavanje/onemogućavanje, bez ponovne registracije). Parser profila je `readMcpToolProfileFromEnv(process.env)`, koji vraća `null` (bez filtriranja) kada su obje varijable prazne.

Bogatiji oblik `ToolProfile` iza `reduceToolManifest` također podržava filtriranje presjekom opsega (`allowScopes`, s podudaranjem zamjenskih znakova u stilu `read:*`) i deterministički cap `maxTools`, no ta dva parametra zahtijevaju puni manifest u trenutku registracije i **nisu** danas izloženi putem varijabli okoline (kuka na razini `tools/list` prati se kao zadatak za buduće). `estimateManifestTokens()` dostupna je za usporedbu troška tokena manifesta prije i nakon smanjenja.

---

## Otkucaj srca izvođenja

Stdio transport svake 5 sekundi zapisuje živost u `${DATA_DIR}/runtime/mcp-heartbeat.json`. Nadzorna ploča (`/api/mcp/status`) čita tu datoteku zajedno s živošću PID-a kako bi izvela stanje `online`. HTTP transporti umjesto toga prijavljuju stanje iz procesno internog `getMcpHttpStatus()` (bez zapisivanja u datoteku).

Snimka otkucaja srca sadrži:

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

## Zapisivanje revizije

Svaki poziv alata bilježi se u SQLite tablicu `mcp_tool_audit` putem `open-sse/mcp-server/audit.ts`:

- Naziv alata, argumenti (haširani/skraćeni prema `auditLevel` svakog alata), rezultat
- Trajanje u ms, zastavica uspjeha/neuspjeha, poruka greške (kada je primjenjivo)
- Hash API ključa, vremenska oznaka
- Odbijanja opsega bilježe se kao `scope_denied:<reason>` s popisom nedostajućih opsega

Koristite nadzornu ploču ili REST krajnje točke `/api/mcp/audit` i `/api/mcp/audit/stats` za pregled nedavnih poziva.

---

## Datoteke

| Datoteka                                                                 | Svrha                                                                              |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Tvornica MCP poslužitelja, stdio ulazna točka, registracije opsežnih alata         |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transport (upravljanje sesijama)                             |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Evaluacija opsega alata i razrješavanje pozivatelja                                |
| `open-sse/mcp-server/audit.ts`                                           | Revizijsko bilježenje poziva alata (`mcp_tool_audit`)                              |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Stdio pisač otkucaja srca (`mcp-heartbeat.json`)                                   |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kompresija opisa za registre alata / upita / resursa                               |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod sheme + registar alata (`MCP_TOOLS`, 45 unosa)                                 |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Rukovatelji alata za fazu 2 + predmemoriju + 1proxy                                |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Rukovatelji alata za kompresiju                                                    |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definicije alata za memoriju (3 alata)                                             |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definicije alata za vještine (4 alata)                                             |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definicije alata za Notion izvore konteksta (6 alata)                              |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definicije alata za gamifikaciju (8 alata)                                         |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Alati za registraciju i upravljanje dodacima (8 alata)                             |
| `src/app/api/mcp/status/route.ts`                                        | Krajnja točka `/api/mcp/status`                                                    |
| `src/app/api/mcp/tools/route.ts`                                         | Krajnja točka `/api/mcp/tools`                                                     |
| `src/app/api/mcp/sse/route.ts`                                           | SSE transportna ruta `/api/mcp/sse`                                                |
| `src/app/api/mcp/stream/route.ts`                                        | Streamable HTTP transportna ruta `/api/mcp/stream`                                 |
| `src/app/api/mcp/audit/route.ts`                                         | Upit revizijskog dnevnika `/api/mcp/audit`                                         |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Agregirane metrike revizije `/api/mcp/audit/stats`                                 |
| `src/lib/notion/api.ts`                                                  | Notion REST API klijent (ponovni pokušaji, istek vremena, klasifikacija pogrešaka) |
| `src/lib/db/notion.ts`                                                   | Pohrana Notion tokena (`key_value` tablica)                                        |
| `src/app/api/settings/notion/route.ts`                                   | API postavki za Notion (GET/POST/DELETE)                                           |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Korisničko sučelje za upravljanje Notion tokenima                                  |
| `tests/unit/notion-api.test.ts`                                          | Testovi Notion API klijenta (7)                                                    |
| `tests/unit/notion-tools.test.ts`                                        | Testovi provedbe opsega Notion alata (10)                                          |
| `tests/unit/db/notion.test.mjs`                                          | Testovi Notion DB modula (3)                                                       |
