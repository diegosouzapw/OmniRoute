# OmniRoute MCP Server Documentation (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server protokola konteksta modela sa 110 alata za rutiranje, keširanje, kompresiju, memoriju, veštine, proksi, pul, Radar i operacije izvora konteksta.
>
> Izvor istine: `open-sse/mcp-server/server.ts` izračunava **110 jedinstvenih alata** sa `countUniqueMcpTools()`: 45 kanonskih definicija (uključujući šest CCR alata životnog ciklusa, trio alata za veštine agenta, `omniroute_radar_catalog` i `omniroute_x_search`), plus memorija (3), veštine (4), GitHub veštine (3), pul (6), gamifikacija (8), dodaci (8), Notion (6), Obsidian (22), lokalni korpus (3) i dva alata za kompresiju samo za RTK.

## Instalacija

OmniRoute MCP je ugrađen. Pokrenite ga sa:

```bash
omniroute --mcp
```

Ili putem open-sse transporta:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP se automatski pokreće na /mcp krajnjoj tački
```

HTTP transporti (`sse` / `streamable-http`, servirani unutar procesa od strane dashboard servera) su
podrazumevano isključeni i ranije su se mogli uključivati/isključivati samo sa `/dashboard/mcp` stranice. Od v3.8.51
CLI ima paritet:

```bash
omniroute mcp status                                  # omogućen/online, transport, broj alata
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resetuje aktivne sse/streamable-http sesije
```

`mcp enable`/`mcp disable` PATCH-uju isto `mcpEnabled` (i opciono `mcpTransport`) podešavanje
koje dashboard prebacuje putem `/api/settings`. `mcp restart` poziva `POST /api/mcp/restart`: on
prekida aktivne `sse`/`streamable-http` sesije tako da se sledeći zahtev čisto re-inicijalizuje, vraća
`409` ako je MCP onemogućen, i `501` za `stdio` transport (stdio klijenti poseduju sopstveni
podproces — ne postoji in-process ručka za restartovanje).

## Transporti

MCP server izlaže tri transporta, svi podržani istom `createMcpServer()` fabrikom:

| Transport         | Gde                                           | Kada koristiti                                               |
| :---------------- | :-------------------------------------------- | :----------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`               | IDE integracije (Claude Desktop, Cursor, itd.)               |
| `sse`             | `POST/GET /api/mcp/sse` putem `httpTransport` | Klijenti pretraživača/agenta kojima je potreban tok događaja |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`             | HTTP klijenti sa više sesija (`mcp-session-id` zaglavlje)    |

Aktivni HTTP transport (`sse` ili `streamable-http`) se bira pomoću `mcpTransport` podešavanja. Prebacivanje transporta zatvara postojeće sesije na drugom transportu.

### Daljinski pristup (zaobilaženje manage-scope)

`/api/mcp/*` je u LOCAL_ONLY nivou (`src/server/authz/routeGuard.ts`) — podrazumevano mu mogu pristupiti samo loopback hostovi (`localhost`, `127.0.0.1`, `::1`). Od v3.8.2, neloopback klijenti se mogu povezati ako predstave `Authorization: Bearer <api-key>` čiji ključ nosi `manage` opseg. Ovo je jedini način da se dođe do udaljenog MCP servera kroz tunel, reverzni proksi ili javno ime hosta.

```bash
# Dodeli manage opseg: otvori stranicu API ključeva na kontrolnoj tabli i uključi
# "Management Access" na ključu, ili POST scopes:["manage"] prilikom kreiranja.

# Zatim se poveži sa udaljenog MCP klijenta:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ključ bez `manage` opsega (ili bez Bearer-a) vraća `403 LOCAL_ONLY`. Srodni prefiks `/api/cli-tools/runtime/*` namerno NIJE zaobilazan — pogledajte [Nivoi zaštite ruta — Izuzetak za manage-scope](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Konfiguracija IDE-a

Pogledajte [Konfiguracija MCP klijenta](../guides/SETUP_GUIDE.md#mcp-client-configuration) za Claude Desktop,
Cursor, Cline i kompatibilno podešavanje MCP klijenta.

---

## Osnovni alati (14) — Faza 1

| Alat                            | Opsezi                | Opis                                                                                                                                |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Vreme rada, memorija, prekidači kola, ograničenja brzine, statistika keša                                                           |
| `omniroute_list_combos`         | `read:combos`         | Sve konfigurisane kombinacije sa strategijama (opciona metrika)                                                                     |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metrika performansi za specifičnu kombinaciju                                                                                       |
| `omniroute_switch_combo`        | `write:combos`        | Aktiviranje ili deaktiviranje kombinacije                                                                                           |
| `omniroute_create_combo`        | `write:combos`        | Kreiranje validirane kombinacije putem postojećeg API-ja za kombinacije                                                             |
| `omniroute_check_quota`         | `read:quota`          | Iskorišćena/ukupna kvota, preostali procenat, vreme resetovanja, stanje tokena                                                      |
| `omniroute_route_request`       | `execute:completions` | Slanje zahteva za dovršavanje ćaskanja putem OmniRoute rutiranja                                                                    |
| `omniroute_cost_report`         | `read:usage`          | Izveštaj o troškovima po periodu (sesija/dan/nedelja/mesec)                                                                         |
| `omniroute_list_models_catalog` | `read:models`         | Kompletan katalog modela sa mogućnostima, statusom, cenama                                                                          |
| `omniroute_radar_catalog`       | `read:radar`          | Lokalni potpisani Radar katalog; opcioni filteri provajdera/porodice                                                                |
| `omniroute_tool_search`         | `read:tools`          | Otkrivanje alata iz registrovanog MCP kataloga                                                                                      |
| `omniroute_web_search`          | `execute:search`      | Pretraga veba putem konfigurisanih provajdera pretrage. Nije X/Twitter.                                                             |
| `omniroute_x_search`            | `execute:search`      | Pretraga X-a putem xAI/SuperGrok-a, ili odaberite `xquik-search` za rezultate Xquik API-ja. Zahteva akreditive za odabrani bek-end. |
| `omniroute_web_fetch`           | `execute:search`      | Preuzimanje veb sadržaja putem konfigurisanih provajdera preuzimanja                                                                |

## Napredni alati (11) — Faza 2

| Alat                               | Opsezi                               | Opis                                                                                                                                          |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulacija rutiranja u probnom režimu sa rezervnim stablom                                                                                    |
| `omniroute_set_budget_guard`       | `write:budget`                       | Budžet sesije sa akcijama degradacije/blokiranja/upozorenja                                                                                   |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Ažuriranje strategije kombinacije u toku izvršavanja (prioritetna/ponderisana/automatska/itd.)                                                |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Primena `agresivnog` / `balansiranog` / `konzervativnog` profila otpornosti                                                                   |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Testiranje uživo svakog provajdera u kombinaciji korišćenjem stvarnog uzvodnog poziva                                                         |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metrike po provajderu sa p50/p95/p99 kašnjenjem i stanjem prekidača kola                                                                      |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Preporučite kombinaciju po tipu zadatka sa ograničenjima budžeta/kašnjenja                                                                    |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Objasnite zašto je zahtev rutiran ka provajderu (faktori bodovanja + rezervni mehanizmi)                                                      |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Potpuni snimak sesije: trošak, tokeni, najbolji modeli/provajderi, greške, zaštita budžeta                                                    |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Dijagnostikovanje (i opciono automatsko popravljanje) odstupanja baze podataka kao što su neispravne reference kombinacija / osamljeni redovi |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sinhronizacija podataka o cenama iz eksternih izvora (LiteLLM); podržava `dryRun`                                                             |

## Alati za keširanje (2)

| Alat                    | Opsezi        | Opis                                                   |
| :---------------------- | :------------ | :----------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Semantički keš, keš upita i statistika idempotentnosti |
| `omniroute_cache_flush` | `write:cache` | Brisanje keša globalno ili po potpisu/modelu           |

## Alati za kompresiju (13)

| Alat                                | Opsezi              | Opis                                                                                                                              |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Podešavanja kompresije, analitički pregled i statistika svesna keša (uključuje `analytics.mcpDescriptionCompression` metapodatke) |
| `omniroute_compression_configure`   | `write:compression` | Konfigurisanje režima kompresije, praga, ciljnog odnosa, očuvanja sistemskog upita, preklopnika kompresije opisa MCP-a            |
| `omniroute_set_compression_engine`  | `write:compression` | Odabir aktivnog mehanizma (isključeno/caveman/rtk/stacked) i intenziteta Caveman/RTK                                              |
| `omniroute_list_compression_combos` | `read:compression`  | Lista imenovanih kombinacija kompresije i njihovih mehanizama                                                                     |
| `omniroute_compression_combo_stats` | `read:compression`  | Analitika grupisana po kombinaciji kompresije i mehanizmu                                                                         |
| `omniroute_ccr_store`               | `write:compression` | Skladištenje sadržaja izolovanog po pozivaocu u ograničenom CCR skladištu u memoriji i vraćanje markera plus `ccr://` reference   |
| `omniroute_ccr_retrieve`            | `read:compression`  | Preuzimanje CCR sadržaja u celosti ili sa režimima glave, repa, linija, grep-a i statistike                                       |
| `omniroute_ccr_inspect`             | `read:compression`  | Pregled metapodataka CCR-a u vlasništvu pozivaoca bez vraćanja sadržaja                                                           |
| `omniroute_ccr_list`                | `read:compression`  | Lista paginiranih metapodataka za CCR blokove u vlasništvu pozivaoca                                                              |
| `omniroute_ccr_delete`              | `write:compression` | Brisanje CCR bloka u vlasništvu pozivaoca                                                                                         |
| `omniroute_ccr_stats`               | `read:compression`  | Izveštavanje o korišćenju memorije u opsegu pozivaoca, brojačima životnog ciklusa i ograničenjima skladišta                       |
| `omniroute_rtk_discover`            | `read:compression`  | Otkrivanje ponavljajućeg šuma u opt-in RTK izlaznim uzorcima                                                                      |
| `omniroute_rtk_learn`               | `read:compression`  | Generisanje nacrta RTK filtera za pregled iz opt-in uzoraka                                                                       |

CCR unosi su samo u memoriji i nestaju pri ponovnom pokretanju. Svaki blok je ograničen na 2 MiB, svaki princip na 16 MiB, a globalno skladište na 64 MiB. Unosi podrazumevano imaju TTL od 24 sata (maksimalno sedam dana). Potpuno preuzimanje MCP-a je ograničeno na 256 KiB; veći blokovi ostaju dostupni putem režima opsega i grep-a. Skladištenje, preuzimanje, listanje, inspekcija, brisanje i statistika su izolovani po autentifikovanom API-ključu principala. Zapisi revizije sadrže heševe i metapodatke o veličini, nikada sadržaj.

`omniroute_compression_status` izveštava o kompresiji MCP opisa zasebno pod `analytics.mcpDescriptionCompression`. Te vrednosti su procene veličine metapodataka za MCP opise koji se mogu listati (`tools`, `prompts`, `resources` i `resourceTemplates`); one nisu potvrde o korišćenju provajdera i označene su sa `source: "mcp_metadata_estimate"`.

### MCP Filter stabla pristupačnosti (v3.8.0)

Odvojeno od gore navedenih alata za kompresiju, OmniRoute uključuje filter koji se izvršava nakon izvršenja, a koji kompresuje **rezultate alata** MCP alata za pretraživač/pristupačnost pre nego što se vrate agentu. Ovaj filter sam po sebi nije alat — on se transparentno pokreće na bilo kom rezultatu alata koji sadrži opširan tekst stabla pristupačnosti ili snimka pretraživača (≥2000 karaktera).

Ključna ponašanja:

- Sažima ≥30 uzastopnih ponovljenih sestrinskih linija u sažetak glave + repa
- Čuva `[ref=eXX]` sidra potrebna za Playwright/korišćenje računara
- Nasilno skraćuje preveliki tekst (>50.000 karaktera) sa savetom za navigaciju
- Očekivane uštede: **60–80%** na opterećenjima snimaka pretraživača

Konfiguracija: `compression.mcpAccessibility` u globalnim podešavanjima (migracija 056).
Implementacija: `open-sse/services/compression/engines/mcpAccessibility/`.
Kompletna dokumentacija: [Mašine za kompresiju — MCP Filter stabla pristupačnosti](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Pogledajte [Mašine za kompresiju](../compression/COMPRESSION_ENGINES.md) i [RTK Kompresija](../compression/RTK_COMPRESSION.md) za model kompresije u toku izvršavanja koji stoji iza ovih alata.

## 1Proxy alati (3)

| Alatka                      | Opsezi         | Opis                                                                                          |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Preuzmite besplatne proksije sa 1proxy tržišta (filteri po protokolu/zemlji/kvalitetu/limitu) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Preuzmite sledeći dostupan proksi po strategiji (`random` / `quality` / `sequential`)         |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistike pula, status sinhronizacije, distribucija po protokolu i zemlji                    |

## Alati za memoriju (3)

Definisano u `open-sse/mcp-server/tools/memoryTools.ts`. Autentifikacija/opseg se primenjuje kroz standardni MCP pipeline opsega.

| Alatka                    | Opsezi         | Opis                                                                                         |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Pretraživanje memorija po upitu / tipu / API ključu uz primenu budžeta tokena                |
| `omniroute_memory_add`    | `write:memory` | Dodavanje novog unosa memorije (`factual` / `episodic` / `procedural` / `semantic`)          |
| `omniroute_memory_clear`  | `write:memory` | Brisanje memorija za API ključ, opciono filtrirano po tipu ili vremenskoj oznaci `olderThan` |

## Alati za veštine (4)

Definisano u `open-sse/mcp-server/tools/skillTools.ts`. Podržano od strane `src/lib/skills/registry` + `src/lib/skills/executor`.

| Alatka                        | Opsezi           | Opis                                                                                               |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Lista registrovanih veština sa opcionim filtriranjem po API ključu, imenu ili statusu omogućenosti |
| `omniroute_skills_enable`     | `write:skills`   | Omogućavanje ili onemogućavanje specifične veštine po ID-u                                         |
| `omniroute_skills_execute`    | `execute:skills` | Izvršavanje veštine sa datim ulazom i vraćanje zapisa o izvršenju                                  |
| `omniroute_skills_executions` | `read:skills`    | Lista nedavne istorije izvršavanja veština                                                         |

## Notion izvor konteksta (6)

Definisano u `open-sse/mcp-server/tools/notionTools.ts`. Token je sačuvan u tabeli `key_value` putem `src/lib/db/notion.ts`. REST klijent u `src/lib/notion/api.ts`. API za podešavanja u `src/app/api/settings/notion/route.ts`. Korisnički interfejs kontrolne table u `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Konfigurišite svoj Notion integracioni token sa kartice **Izvori konteksta** na Endpoint kontrolnoj tabli, ili putem REST API-ja:

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

| Alatka                       | Opsezi         | Opis                                                                        |
| :--------------------------- | :------------- | :-------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Pretraga celog teksta kroz sve stranice i baze podataka                     |
| `notion_get_page`            | `read:notion`  | Preuzimanje stranice po ID-u sa njenim svojstvima                           |
| `notion_list_block_children` | `read:notion`  | Lista podređenih blokova stranice ili bloka                                 |
| `notion_query_database`      | `read:notion`  | Upit baze podataka sa filterima, sortiranjem i paginacijom                  |
| `notion_get_database`        | `read:notion`  | Preuzimanje šeme baze podataka po ID-u                                      |
| `notion_append_blocks`       | `write:notion` | Dodavanje podređenih blokova roditeljskom bloku (maksimalno 100 po zahtevu) |

## Alati kataloga veština agenta (3)

Definisano u `open-sse/mcp-server/tools/agentSkillTools.ts`. Podržano od strane `src/lib/agentSkills/catalog`. Ovi alati izlažu katalog dokumentacije veština agenta sa 45 unosa MCP klijentima i eksternim agentima. Opseg: `read:catalog`.

| Alat                              | Opsezi         | Opis                                                                                                                                              |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog` | Izlistava svih 45 veština agenta sa opcionalnim `category` (api\|cli) i `area` filterima; vraća metapodatke + pokrivenost                         |
| `omniroute_agent_skills_get`      | `read:catalog` | Dobija pune metapodatke + SKILL.md sadržaj za jednu veštinu po kanoničkom `id`-u                                                                  |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistika pokrivenosti: koliko od 23 API, 21 CLI i 1 konfiguracione veštine ima SKILL.md fajlove na sistemu datoteka u odnosu na ukupne kataloge |

Pogledajte [AGENT-SKILLS.md](./AGENT-SKILLS.md) za kompletan katalog i kako ga eksterni agenti koriste.

## Povezani okviri (v3.8.0)

Gorenavedeni inventar MCP alata (110 jedinstvenih alata, izračunato pomoću `countUniqueMcpTools()`) je namerno
ograničen na operacije rutiranja/keširanja/kompresije/memorije/veština/proksija/kontekst-izvora u toku izvršavanja. Dva susedna
okvira isporučuju se zajedno sa MCP serverom u v3.8.0 i dokumentovana su zasebno:

### Agenti u oblaku

Agenti u oblaku su AI agenti za kodiranje van procesa (codex-cloud, cursor-cloud, devin, jules) povezani sa
OmniRoute-om putem istog modela veze koji se koristi za LLM provajdere. Izloženi su putem
sopstvenog REST interfejsa (`/api/v1/agents/*`) i **nisu** deo MCP kataloga alata
— pozivanje Agenta u oblaku ne troši MCP opseg.

- Implementacija: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Životni ciklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentacija: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Zaštitne ograde

Zaštitne ograde su filteri pre/posle izvršavanja (vision-bridge, pii-masker, prompt-injection)
primenjeni unutar chat pipeline-a. Oni se izvršavaju pre nego što se dosegne sloj MCP alata/rute
i emituju strukturirana kršenja u audit pipeline; ne pozivaju se kao MCP alati.

- Implementacija: `src/lib/guardrails/`.
- Dokumentacija: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Prilikom otklanjanja grešaka u MCP pozivu koji izgleda blokiran, proverite i MCP audit log
(`scope_denied:*` unosi) i audit trag zaštitnih ograda — zahtev može biti odbijen od strane
zaštitne ograde **pre** nego što ikada stigne do sloja za primenu MCP opsega.

---

## REST API krajnje tačke

| Krajnja tačka          | Metoda                | Opis                                                                                             | Autentifikacija            |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | Status servera: heartbeat, stanje HTTP transporta, sažetak audit aktivnosti                      | Upravljanje (sesija/admin) |
| `/api/mcp/tools`       | `GET`                 | Katalog alata (ime, opis, opsezi, faza, izvorne krajnje tačke)                                   | Upravljanje                |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transportna krajnja tačka (ograničena sa `mcpEnabled` + `mcpTransport === "sse"`)            | API ključ + opsezi         |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | HTTP transport sa strimovanjem (koristi `mcp-session-id` zaglavlje; `DELETE` završava sesiju)    | API ključ + opsezi         |
| `/api/mcp/audit`       | `GET`                 | Unosi audit loga iz `mcp_tool_audit` (filteri: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Upravljanje                |
| `/api/mcp/audit/stats` | `GET`                 | Agregirane audit statistike (`totalCalls`, `successRate`, `avgDurationMs`, najčešći alati)       | Upravljanje                |

Izvorni fajlovi: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

I SSE i HTTP transporti sa strimovanjem su blokirani dok se MCP server ne omogući u Podešavanjima (`mcpEnabled`) i ne izabere odgovarajući `mcpTransport`. Ako je pogrešan transport konfigurisan, ruta vraća HTTP 400 sa savetom za promenu podešavanja.

---

## Аутентификација и опсези

Позиви MCP алатки читају ниске опсега од позиваоца. Та провера је један од три
независна именска простора. Пролазак једне провере не значи пролазак осталих.
Правила су описана у [Три именска простора опсега](#three-scope-namespaces).
Каталог алатки је наведен у [Опсези MCP алатки](#mcp-tool-scopes).

### Три именска простора опсега

`manage` на API кључу, `read:compression` на MCP алатки и `read` на
`oma_live_…` приступном токену представљају три различита овлашћења. Позиваоци
који пошаљу `read` приступни токен рути за управљање која мења податке добијају
HTTP 403:
`Access token scope 'read' is insufficient; 'write' required.`
Тај ранг проверава `scopeSatisfies`. Он не користи MCP табелу, нити је MCP
механизам за упаривање користи.

| Именски простор      | Акредитив                                                 | Провера                         | Пролазак омогућава                                     |
| :------------------- | :-------------------------------------------------------- | :------------------------------ | :----------------------------------------------------- |
| Управљање API кључем | `api_keys.scopes`                                         | `hasManageScope`                | Управљачки REST за тај Bearer кључ                     |
| Додатак API кључу    | исти низ, једна потпуно подударна ниска                   | помоћна функција наведена испод | Само ту једну могућност                                |
| Опсези MCP алатки    | исти низ, иначе MCP `_meta`, иначе `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                  | Ту алатку, након укључивања примене правила            |
| Приступни токен      | `oma_live_…`                                              | `scopeSatisfies`                | Управљачку руту чији метод и путања захтевају тај ранг |

Издавање сваког акредитива обрађено је у
[Аутентификација за управљање](../guides/MANAGEMENT-AUTH.md).

#### Опсези API кључа

Један низ `api_keys.scopes` служи за два задатка. Они користе различите функције.

**Управљачки REST.** `manage` и `admin` су чланови
`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`).
`hasManageScope` је функција која одобрава приступ управљачким рутама за тај
кључ. `admin` омогућава управљање на тим рутама. Реч `admin` овде није ранг
приступног токена и не проширује се на опсеге MCP алатки.

**Додатне ниске.** Свака од њих проверава се као потпуно подударање са чланом
низа и свака остаје изван `MANAGEMENT_API_KEY_SCOPES`.

| Опсег                          | Пролазак омогућава                                                                                                                                                   |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Само LOCAL_ONLY изузетак за `/api/mcp/` ван loopback адресе (`hasMcpConnectOrManageScope`). Кључ са `manage` или `admin` такође пролази тај изузетак.                |
| `self:usage`                   | `GET /api/v1/me/status` за овај кључ (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` додаје овај опсег при креирању (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Квоте налога узводног система унутар тог садржаја статуса (`src/lib/usage/apiKeySelfService.ts`). Рута статуса и даље захтева `self:usage`.                          |
| `policy:bypass-provider-quota` | Позиви овог кључа за извођење закључака прескачу смерницу квоте добављача (`hasProviderQuotaBypassScope` у `src/sse/handlers/chat.ts`).                              |

#### Упаривање

Каталог је табела у одељку [Опсези MCP алатки](#mcp-tool-scopes). Немојте
сматрати `MCP_SCOPE_LIST` у `src/shared/constants/mcpScopes.ts` тим каталогом:
то је првобитни типизирани подскуп. Касније алатке декларишу додатне опсеге
поред њега (`read:notion`, `read:skills`, `read:local-corpus` и остатак табеле).

`evaluateToolScopes` у `open-sse/mcp-server/scopeEnforcement.ts` дозвољава позив
када се сваки захтевани опсег подудара са неким додељеним опсегом:

- `*` се подудара са сваким захтеваним опсегом.
- Додељени опсег који се завршава са `*` подудара се са захтеваним опсегом који
  почиње префиксом испред звездице. `read:*` се подудара са `read:compression`.
- Сваки други додељени опсег подудара се само са идентичном ниском захтеваног
  опсега.

Кључ чији су опсези `["manage"]` не пролази `scopeMatches` за
`read:compression`. Исти позив не пролази ни за `admin`, `mcp:connect`, `read`
и `write` када су то једине додељене ниске. Међу опсезима MCP алатки не постоји
хијерархија осим завршног знака `*`.

Примена правила је искључена осим ако је `OMNIROUTE_MCP_ENFORCE_SCOPES=true`
(подразумевано `false`). Док је искључена, `evaluateToolScopes` дозвољава позив
и прескаче каталог. Док је укључена, HTTP користи `api_keys.scopes` Bearer
кључа као `authInfo` (погледајте
[HTTP повезивање опсега по кључу](#per-key-http-scope-binding-7895)).
Када није могуће разрешити ниједан опсег кључа, скуп додељених опсега прелази
на MCP `_meta`, а затим на `OMNIROUTE_MCP_SCOPES`.

#### Опсези приступног токена

Токени `oma_live_…` (`src/lib/accessTokens/scopes.ts`) садрже `read`, `write`
или `admin`. `scopeSatisfies` представља ранг: `admin` обухвата `write` и
`read`, а `write` обухвата `read`. Непознати опсези не обухватају ништа.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) пореди тај
ранг са резултатом функције `inferRequiredScope`
(`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` и `OPTIONS` захтевају `read`.
- Сваки други метод захтева `write`.
- Путање у `ADMIN_SCOPE_PREFIXES` захтевају `admin` за сваки метод. `/api/mcp`
  је на тој листи, тако да приступни токен са `write` и даље не може да позове
  MCP HTTP површину.
- Путање у `ADMIN_MUTATION_PREFIXES` захтевају `admin` само за операције које
  мењају податке.

`PATCH /api/keys/{id}` је мутација и не налази се на тим администраторским листама, па
`read` токен добија 403:
`Access token scope 'read' is insufficient; 'write' required.`
Приступни токен са опсегом `write` или `admin` задовољава захтеве те руте. JWT контролне табле,
loopback CLI токен са machine-id-јем и API кључ са опсегом `manage` или `admin` пролазе
другим гранама и овај ранг их не ограничава.

Приступни токен који прође `scopeSatisfies` за `/api/mcp` прошао је само
управљачку проверу. Позиви алата и даље покрећу `scopeMatches` над опсезима
API кључа. Ранг приступног токена није улазни параметар за `scopeMatches`.

### Опсези MCP алата

Примена опсега централизована је у `open-sse/mcp-server/scopeEnforcement.ts`.
Сваки алат захтева одређене опсеге:

| Опсег                 | Алати                                                                                                                                                                             |
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
| `read:obsidian`       | 13 алата за читање — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 алата за писање — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                 |

Подржани су опсези са џокер-знаком: `read:*` додељује све опсеге за читање, док `*` додељује потпуни приступ.

### `mcp:connect` — уско дефинисана могућност приступа рути (#7895)

Приступ HTTP/SSE MCP транспорту (`/api/mcp/*`) са адресе која није loopback захтева
LOCAL_ONLY изузетак за `/api/mcp/` (погледајте `docs/security/ROUTE_GUARD_TIERS.md`). Раније
је тај изузетак прихватао само API кључ са пуним опсегом `manage`/`admin` — што је прешироко за
позиваоца коме је потребна само комуникација са MCP-ом. `src/shared/constants/managementScopes.ts` сада
извози `MCP_CONNECT_SCOPE = "mcp:connect"`: додатни, уско дефинисани опсег (по истом принципу као
`SELF_USAGE_SCOPE`) који овлашћује ИСКЉУЧИВО заобилажење за `/api/mcp/` у
`src/server/authz/policies/management.ts` — он не додељује приступ ниједној другој управљачкој рути
и намерно је ИЗОСТАВЉЕН из `MANAGEMENT_API_KEY_SCOPES`. Кључ који има `manage`/`admin`
и даље непромењено пролази кроз изузетак; `mcp:connect` је алтернатива са нижим привилегијама за
удаљене позиваоце који користе само MCP, а проверава се помоћу `hasMcpConnectOrManageScope()`.

### Везивање HTTP опсега за појединачни кључ (#7895)

Преко HTTP/SSE-а, `open-sse/mcp-server/httpTransport.ts` сада разрешава стварне
`api_keys.scopes` позиваоца помоћу `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
и прослеђује их MCP SDK-овом `transport.handleRequest(req, { authInfo })`, тако да
`extra.authInfo.scopes` који стиже до сваког позива алата одражава сопствене опсеге Bearer кључа.
`resolveCallerScopeContext()` из `scopeEnforcement.ts` већ је давао предност `authInfo` у односу
на `_meta` и резервну вредност из окружења `OMNIROUTE_MCP_SCOPES` — овим се само попуњава тај први
извор највишег приоритета, који се раније није попуњавао преко HTTP-а. Када се ниједан API кључ не
разреши (нема заглавља или је кључ неважећи), `authInfo` остаје `undefined`, а разрешавање се
непромењено наставља постојећим `meta`/env ланцем. stdio нема идентитет појединачног позиваоца (погледајте
`mcpCallerIdentity.ts`) и ова измена не утиче на њега — он остаје на резервном `_meta`/env ланцу.

**Примена ограничења се принудно укључује за HTTP/SSE позиваоце са уским опсегом, без обзира на
`OMNIROUTE_MCP_ENFORCE_SCOPES`.** Подразумевана вредност `false` за `OMNIROUTE_MCP_ENFORCE_SCOPES`
безбедна је само за локални/stdio ток рада са једним оператором, где не постоји идентитет појединачног
позиваоца у односу на који би се примењивао опсег. `open-sse/mcp-server/server.ts::withScopeEnforcement()`
безусловно укључује примену опсега за сваки алат (`shouldForceScopeEnforcement()` у `scopeEnforcement.ts`)
кад год је `resolveCallerScopeContext()` разрешио
`source === "authInfo"` (тј. стварно HTTP Authorization заглавље по кључу, искључиво за HTTP/SSE) И када тај
кључ нема пуни опсег `manage`/`admin`. Овим се отклања пропуст због којег би кључ који има САМО
уско дефинисани опсег заобилажења `mcp:connect` — горе документован као опсег који не овлашћује ништа осим
LOCAL_ONLY изузетка за `/api/mcp/` — иначе могао да позове сваки MCP алат након што оператор
омогући удаљени MCP приступ или приступ који није loopback, само зато што се
`OMNIROUTE_MCP_ENFORCE_SCOPES` подразумевано испоручује са вредношћу `false`. Кључ са пуним опсегом
`manage`/`admin` преко HTTP-а, као и сваки stdio/локални позивалац, задржава постојеће понашање
условљено променљивом `OMNIROUTE_MCP_ENFORCE_SCOPES`, без измена.

---

## Променљиве окружења

| Променљива                              | Подразумевано                        | Намена                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :-------------------------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`             | Основни URL који MCP сервер користи приликом позивања интерних OmniRoute API-ја                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_API_KEY`                     | (празно)                             | API кључ који се прослеђује као `Authorization: Bearer` интерним API позивима                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (омогућава га само `"true"`) | Када је омогућено, недостајући опсези онемогућавају позиве алата и бележе `scope_denied:<reason>` у евиденцији ревизије. Спровођење се ТАКОЂЕ принудно активира без обзира на ову заставицу за сваког HTTP/SSE позиваоца утврђеног на основу Authorization заглавља специфичног за кључ (`source === "authInfo"`) који нема пун опсег `manage`/`admin` — нпр. кључ који има само уски опсег заобилажења `mcp:connect` — па је ова подразумевана вредност безбедна само за локални/stdio ток са једним оператером, а никада за удаљени приступ ван повратне петље |
| `OMNIROUTE_MCP_SCOPES`                  | (празно)                             | Листа дозвољених опсега раздвојених зарезима који се подразумевано сматрају „доступним“ (користи се када позивалац не наведе сопствене опсеге)                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (није постављено = укључено)         | Када је постављено на `0/false/off/no`, онемогућава компресију MCP описа у тренутку регистрације                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (није постављено = укључено)         | Алтернативни псеудоним за исту опцију као изнад                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                              | Временско ограничење за прекид интерних управљачких читања (стање, отпорност, комбинације, квота, употреба)                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                              | Временско ограничење за прекид корака који чекају добављача (`route_request`, `web_search`, `web_fetch`)                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `MCP_TOOL_DENY`                         | (није постављено = без филтера)      | Зарезима раздвојени називи алата који се изостављају из `tools/list` (смањење кардиналности алата — видети испод)                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `MCP_TOOL_ALLOW`                        | (није подешено = без филтера)        | Називи алата раздвојени зарезима који се искључиво задржавају (режим листе дозвољених — погледајте испод)                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `DATA_DIR`                              | `~/.omniroute`                       | Датотека сигнала активности уписује се у `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

---

## Kompresija opisa

Registri MCP alata, promptova i resursa mogu komprimovati opise u trenutku registracije/listanja kako bi smanjili otisak metapodataka izložen klijentima (a time i troškove konteksta prompta). Implementacija se nalazi u `open-sse/mcp-server/descriptionCompressor.ts` i povezana je sa MCP serverom putem `compressMcpRegistryMetadata` unutar `createMcpServer()`.

- Kompresija se primenjuje na tekst opisa koristeći Caveman skup pravila (`getRulesForContext("all", "full")`) sa ekstrakcijom očuvanih blokova (rasponi koda, ograđeni blokovi, itd.) tako da strukturni sadržaj nije izmenjen.
- Uključivanje/isključivanje po implementaciji putem vrednosti `compression.mcpDescriptionCompressionEnabled` u tabeli podešavanja `key_value` (podrazumevano: omogućeno) — izloženo u korisničkom interfejsu kao **Analitika → Kompresija MCP opisa**.
- Uključivanje/isključivanje na nivou procesa putem `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` ili `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Statistike u realnom vremenu se prikazuju putem `omniroute_compression_status` pod `analytics.mcpDescriptionCompression` i označene su `source: "mcp_metadata_estimate"` kako bi se razlikovale od stvarnih potvrda o korišćenju provajdera.

---

## Smanjenje kardinalnosti alata (F4.3)

Kompresija opisa smanjuje metapodatke svakog alata; **smanjenje kardinalnosti alata** ide korak dalje smanjujući _koliko_ alata se uopšte objavljuje. Oglašavanje manjeg broja alata u `tools/list` manifestu smanjuje troškove tokena po zahtevu koje klijentov model plaća za katalog alata ("kompresija sloja 5"). Implementacija je čisti, bezstanja filter u `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), povezan sa petljom registracije u `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Opt-in, podrazumevano isključeno.** Filter se pokreće samo kada je postavljena bar jedna od dve promenljive okruženja; ako nijedna nije postavljena, svih 110 alata se objavljuje nepromenjeno.

| Varijabla        | Režim                                                                                   |
| :--------------- | :-------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Crna lista — nazivi alata razdvojeni zarezima koji se uvek izbacuju iz `tools/list`     |
| `MCP_TOOL_ALLOW` | Bela lista — nazivi alata razdvojeni zarezima; samo ovi opstaju, sve ostalo se izbacuje |

`deny` ima prioritet nad `allow`. Nazivi su razdvojeni zarezima, skraćeni, a prazni unosi se ignorišu. Primeri:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Kako se filtrirani alati uklanjaju:** registracija uvek uspeva; alat koji profil odbije se zatim `.disable()`-uje na MCP SDK hendlu, tako da se nikada ne pojavljuje u `tools/list`, ali ožičenje ostaje netaknuto (čisto omogućavanje/onemogućavanje, bez ponovne registracije). Parser profila je `readMcpToolProfileFromEnv(process.env)`, koji vraća `null` (bez filtriranja) kada su obe varijable prazne.

Bogatiji `ToolProfile` oblik iza `reduceToolManifest` takođe podržava filtriranje preseka opsega (`allowScopes`, sa `read:*`-stilom džoker podudaranja) i determinističko ograničenje `maxTools`, ali ta dva podešavanja zahtevaju kompletan manifest u vreme registracije i **nisu** danas izložena putem promenljivih okruženja (kuka na nivou `tools/list` je praćeni nastavak). `estimateManifestTokens()` je dostupan za poređenje troškova tokena manifesta pre i posle smanjenja.

---

## Otkucaji u radnom vremenu

`stdio` transport održava živost na `${DATA_DIR}/runtime/mcp-heartbeat.json` svakih 5 sekundi. Kontrolna tabla (`/api/mcp/status`) čita ovu datoteku plus živost PID-a da bi izvela `online` status. HTTP transporti prijavljuju stanje iz `getMcpHttpStatus()` unutar procesa (bez upisivanja u datoteku).

Snimak otkucaja srca sadrži:

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

## Revizorsko logovanje

Svaki poziv alata se loguje u SQLite `mcp_tool_audit` tabelu pomoću `open-sse/mcp-server/audit.ts`:

- Naziv alata, argumenti (heširani/skraćeni prema `auditLevel` za svaki alat), rezultat
- Trajanje u ms, zastavica uspeha/neuspjeha, poruka o grešci (kada je primenljivo)
- Heš API ključa, vremenska oznaka
- Odbijanja opsega se loguju kao `scope_denied:<reason>` sa listom nedostajućih opsega

Koristite kontrolnu tablu ili `/api/mcp/audit` i `/api/mcp/audit/stats` REST krajnje tačke za pregled nedavnih poziva.

---

## Fajlovi

| Fajl                                                                     | Svrha                                                                                   |
| :----------------------------------------------------------------------- | :-------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP fabrički server, stdio ulazna tačka, registracije alata sa opsegom                  |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + HTTP transport sa strimovanjem (upravljanje sesijama)                             |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Evaluacija opsega alata i razrešavanje pozivaoca                                        |
| `open-sse/mcp-server/audit.ts`                                           | Logovanje revizije poziva alata (`mcp_tool_audit`)                                      |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio pisac otkucaja srca (`mcp-heartbeat.json`)                                        |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kompresija opisa za registre alata / promptova / resursa                                |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod šeme + registar alata (`MCP_TOOLS`, 45 unosa)                                       |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Faza 2 + keš + 1proxy rukovaoci alata                                                   |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Rukovaoci alata za kompresiju                                                           |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definicije alata za memoriju (3 alata)                                                  |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definicije alata za veštine (4 alata)                                                   |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definicije alata za Notion izvor konteksta (6 alata)                                    |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definicije alata za gamifikaciju (8 alata)                                              |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Alati za registraciju i upravljanje dodacima (8 alata)                                  |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` krajnja tačka                                                         |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` krajnja tačka                                                          |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE ruta transporta                                                      |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` HTTP ruta transporta sa strimovanjem                                  |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` upit loga revizije                                                     |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` agregirane metrike revizije                                      |
| `src/lib/notion/api.ts`                                                  | Notion REST API klijent (ponovni pokušaj, vremensko ograničenje, klasifikacija grešaka) |
| `src/lib/db/notion.ts`                                                   | Notion perzistencija tokena (`key_value` tabela)                                        |
| `src/app/api/settings/notion/route.ts`                                   | Notion API za podešavanja (GET/POST/DELETE)                                             |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI za upravljanje Notion tokenima                                                       |
| `tests/unit/notion-api.test.ts`                                          | Notion API klijentski testovi (7)                                                       |
| `tests/unit/notion-tools.test.ts`                                        | Notion alati testovi sprovođenja opsega (10)                                            |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB modul testovi (3)                                                             |
