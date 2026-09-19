# OmniRoute MCP Server Documentation (Bosanski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server Context Protocol Model sa 110 alata za rutiranje, keširanje, kompresiju, memoriju, vještine, proxyje, pool, Radar i operacije s izvorom konteksta.
>
> Izvor istine:`open-sse/mcp-server/server.ts`izračunava **110 jedinstvenih alata** korištenjem funkcije `countUniqueMcpTools()` 45 kanonskih definicija (uključujući šest alata za životni ciklus CCR-a, trio vještina agenta,`omniroute_radarski_katalog`ja`omniroute_x_search`), uz alate za memoriju (3), vještine (4), GitHub vještine (3), skup (6), gamifikaciju (8), dodatke (8), Notion (6), Obsidian (22), lokalni korpus (3) i dva alata za kompresiju namijenjena isključivo RTK-u.

## Instalacija

OmniRoute MCP je ugrađen. Pokrenite ga sa:

bash
omniroute --mcp

```

Ili putem otvorenog sse transporta:

bash
# HTTP transport sa streamingom (port 20130)
omniroute --dev  # MCP se automatski pokreće na krajnjoj tački /mcp
```

HTTP transport (`sse`/`streamable-http`, koje opslužuje server kontrolne ploče unutar procesa)
su podrazumevano isključeni, a ranije su se mogli uključiti i isključiti samo na stranici`/kontrolna ploča/mcp`Od verzije v3.8.51
CLI nudi iste mogućnosti:

bash
omniroute MCP status # omogućeno/na mreži, transport, broj alata
omniroute MCP omogućiti[--transportstdio|sse|streamable-http]
omniroute MCP onemogućiti
omniroute MCP ponovo pokrenite # resetovanje aktivnih sse/streamable-http sesija

```

`omogući mcp`/`mcp onemogućavanje`korištenje PATCH metode za promjenu iste postavke`mcpOmogućeno`(i opcionalno`mcpTransport`)
putem kojeg se kontrolna ploča uključuje i isključuje`/api/postavke`.`mcp ponovno pokretanje`pozivi`POST /api/mcp/restart`prekida
aktivan`sse`/`streamable-http`sesija tako da se sljedeći zahtjev može ispravno reinicijalizirati, vraća
`409`ako je MCP onemogućen i`501`za prijevoz`stdio`(stdio klijenti upravljaju svojim vlastitim
podproces — unutar procesa ne postoji identifikator koji bi se mogao ponovo pokrenuti).

## Prijevoz

MCP server nudi tri transporta, a sve ih podržava isti`createMcpServer()`tvornica:

| Prijevoz | Lokacija | Kada koristiti |
| :---------------- | :-------------------------------------------- | :------------------------------------------------------------ |
|`stdio`|`open-sse/mcp-server/server.ts`               | Integracije s IDE-ovima (Claude Desktop, Cursor, itd.)        |
|`sse`|`POST/GET /api/mcp/sse`možemo`httpTransport`| Klijenti u pregledniku/agentu kojima je potreban tok događaja |
|`streamable-http`|`POST/GET/DELETE /api/mcp/stream`| HTTP klijenti s više sesija (zaglavlje`mcp-id-sesije`) |

Aktivni HTTP transport (`sse`ili`streamable-http`) odabire se postavkom `mcpTransport`. Promjena transporta zatvara postojeće sesije na drugom transportu.

### Udaljeni pristup (zaobilaženje manage-scope-a)

`/api/mcp/*`je na LOKALNO_SAMO nivou (`src/server/authz/routeGuard.ts`) — prema zadanim postavkama samo hostovi povratne petlje (`lokalni host`,`127.0.0.1`,`::1`) mogu mu pristupiti. Od verzije v3.8.2, klijenti koji nisu loopback mogu se spojiti ako predaju `Autorizacija: Nosilac <api-ključ>`čiji je ključ opseg`upravljati`. To je jedini način za pristup udaljenom MCP serveru kroz tunel, obratni proxy ili javno ime domaćina.

bash
# Dodijeli opseg upravljanja: otvori stranicu API ključevi u kontrolnoj ploči i uključ
# "Upravljački pristup" na ključu ili POST scopes:["manage"] prilikom kreiranja.

# Zatim se povežite s udaljenog MCP klijenta:
kovrčati -i \
-H "Host: vaš-javni-host.primjer" \
  -H "Autorizacija: Nosilac sk-…" \
-H "Vrsta sadržaja: aplikacija/json" \
  -H "Prihvati: aplikacija/json, tekst/tok-događaja" \
-d '{"jsonrpc":"2.0","id":1,"metoda":"inicijaliziraj","params":{"protocolVersion":"2025-03-26","mogućnosti":{},"clientInfo":{"naziv":"moj-klijent","verzija":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ključ bez manage opsega (ili bez Bearera) vraća `403 SAMO_LOKALNO`Susjedni prefiks`/api/cli-tools/runtime/*`NE može se namjerno zaobići — pogledajte [Nivoi zaštite rute — izuzetak upravljanja opsegom](../sigurnost/ROUTE_GUARD_TIERS.md#upravljanje-opsega-izdvajanjem).

## Konfiguracija IDE-a

Vidi [Konfiguracija MCP klijenta](../guides/SETUP_GUIDE.md#mcp-client-configuration) za postavljanje Claude Desktopa,
Cursor, Cline i kompatibilni MCP klijenti.

---

## Osnovni alati (14) — Faza 1

| Alati                           | Opcije              | Opis                                                                                                                                 |
| :------------------------------ | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `čitaj:zdravlje`    | Dostupnost, memorija, prekidači, ograničenja brzine, statistika keš memorije                                                         |
| `omniroute_list_combos`         | `čitaj:kombinacije` | Sve konfigurirane kombinacije sa strategijama (opcionalne metrike)                                                                   |
| `omniroute_get_combo_metrics`   | `čitaj:kombinacije` | Metrike performansi za određenu kombinaciju                                                                                          |
| `omniroute_switch_combo`        | `write:combos`      | Aktiviranje ili deaktiviranje kombinacije                                                                                            |
| `omniroute_create_combo`        | `write:combos`      | Stvaranje validirane kombinacije putem postojećeg API-ja za kombinacije                                                              |
| `omniroute_check_quota`         | `čitaj:kvota`       | Iskorištena/Ukupna kvota, Preostali postotak, Vrijeme resetiranja, Stanje tokena                                                     |
| `omniroute_ruta_zahtjev`        | `izvrši:dovršenja`  | Slanje zahtjeva za završetak razgovora putem OmniRoute usmjeravanja                                                                  |
| `omniroute_cost_report`         | `čitaj:korištenje`  | Izvještaj o troškovima po periodu (sesija/dan/sedmica/mjesec)                                                                        |
| `omniroute_list_modela_katalog` | `čitaj:modeli`      | Kompletan katalog modela sa karakteristikama, statusom i cijenama                                                                    |
| `omniroute_radarski_katalog`    | `čitaj:radar`       | Lokalni potpisani katalog radara; opcionalni filteri po provajderu/porodici                                                          |
| `omniroute_tool_search`         | `čitaj:alati`       | Otkrivanje alata iz registrovanog MCP kataloga                                                                                       |
| `omniroute_web_search`          | `izvrši:pretraži`   | Pretražujte web koristeći konfigurirane pružatelje usluga pretraživanja. Ne X/Twitter.                                               |
| `omniroute_x_search`            | `izvrši:pretraži`   | Pretražite X putem xAI/SuperGrok ili odaberite`xquik-pretraga`za rezultate Xquik API-ja. Potrebni su akreditivi za odabrani backend. |
| `omniroute_web_fetch`           | `izvrši:pretraži`   | Preuzimanje web sadržaja putem konfiguriranih pružatelja usluga pretraživanja                                                        |

## Napredni alati (11) — Faza 2

| Alati                                       | Opcije                                 | Opis                                                                                                                                           |
| :------------------------------------------ | :------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`                  | `čitaj:zdravlje`,`čitaj:kombinacije`   | Simulacija rutiranja bez stvarnog izvršenja s prikazom alternativnog stabla ruta                                                               |
| `omniroute_set_budget_guard`                | `write:budžet`                         | Ograničenje budžeta sesije sa akcijama snižavanja ranga/blokiranja/upozorenja                                                                  |
| `omniroute_set_routing_strategy`            | `write:combos`                         | Ažuriranje kombinovane strategije rute za izvršenja (prioritet/ponderisano/automatsko/itd.)                                                    |
| `omniroute_set_resilience_profile`          | `write:resilience`                     | Primjena obrasca otpornostiagresivan/`uravnotežen`/konzervativan                                                                               |
| `omniroute_test_combo`                      | `izvrši:dovršenja`,`čitaj:kombinacije` | Testiranje svakog provajdera u kombinaciji putem stvarnog poziva uzvodnom izvoru                                                               |
| `omniroute_get_provider_metrics`            | `čitaj:zdravlje`                       | Metrike po provajderu sa latencijom p50/p95/p99 i statusom prekidača                                                                           |
| `omniroute_najbolja_kombinacija_za_zadatak` | `čitaj:kombinacije`,`čitaj:zdravlje`   | Preporuka za kombinacije prema vrsti zadatka s ograničenjima budžeta/latencije                                                                 |
| `omniroute_objasni_rutu`                    | `čitaj:zdravlje`,`čitaj:korištenje`    | Objašnjenje zašto je zahtjev usmjeren određenom pružatelju usluga (faktori ocjenjivanja + alternativne rute)                                   |
| `omniroute_get_session_snapshot`            | `čitaj:korištenje`                     | Snimak cijele sesije: troškovi, tokeni, vodeći modeli/pružatelji usluga, greške, zaštita budžeta                                               |
| `omniroute_db_health_check`                 | `čitaj:zdravlje`,`write:resilience`    | Dijagnosticira (i automatski ispravlja ako je potrebno) anomalije baze podataka kao što su neispravne kombinacije referenci / osiroćeni redovi |
| `omniroute_sync_pricing`                    | `cijena:napiši`                        | Sinhronizacija podataka o cijenama iz eksternih izvora (LiteLLM); podrška`probni rad`                                                          |

## Alati za keširanje (2)

| Alati                   | Opcije        | Opis                                                   |
| :---------------------- | :------------ | :----------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Semantički keš, keš upita i statistika idempotentnosti |
| `omniroute_cache_flush` | `write:cache` | Globalno brisanje keš memorije ili po potpisu/modelu   |

## Alati za kompresiju (13)

| Alati                               | Opcije              | Opis                                                                                                                                             |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `čitaj:kompresija`  | Postavke kompresije, sažetak analitike i statistika uzimajući u obzir keš memoriju (uključuje metapodatke)`analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Konfiguriranje načina kompresije, praga, ciljnog omjera, očuvanja sistemskog upita i prekidača za kompresiju MCP opisa                           |
| `omniroute_set_compression_engine`  | `write:compression` | Odabir aktivnog mehanizma (off/caveman/rtk/stacked) i intenziteta Caveman/RTK                                                                    |
| `omniroute_list_compression_combos` | `čitaj:kompresija`  | Lista imenovanih kombinacija kompresije i njihovih mehanizama cjevovoda                                                                          |
| `omniroute_compression_combo_stats` | `čitaj:kompresija`  | Analitika grupirana po kombinaciji i mehanizmu kompresije                                                                                        |
| `omniroute_ccr_store`               | `write:compression` | Pohranjivanje izoliranog sadržaja pozivatelja u ograničeni CCR bafer u memoriji i vraćanje oznake i`ccr://`referenca                             |
| `omniroute_ccr_retrieve`            | `čitaj:kompresija`  | Preuzmi CCR sadržaj u cijelosti ili u načinima zaglavlja, repa, linije, grep i statistike                                                        |
| `omniroute_ccr_inspect`             | `čitaj:kompresija`  | Inspekcija CCR metapodataka u vlasništvu pozivatelja bez vraćanja sadržaja                                                                       |
| `omniroute_ccr_list`                | `čitaj:kompresija`  | Popis straničnih metapodataka za CCR blokove u vlasništvu pozivatelja                                                                            |
| `omniroute_ccr_delete`              | `write:compression` | Brisanje CCR bloka u vlasništvu pozivatelja                                                                                                      |
| `omniroute_ccr_stats`               | `čitaj:kompresija`  | Izvještaj o korištenju memorije ograničene od strane pozivatelja, brojači životnog vijeka i ograničenja memorije                                 |
| `omniroute_rtk_discover`            | `čitaj:kompresija`  | Detekcija ponavljajuće buke u RTK izlaznim uzorcima sa omogućenim pristankom                                                                     |
| `omniroute_rtk_learn`               | `čitaj:kompresija`  | Generiranje nacrta pregleda RTK filtera iz uzoraka s omogućenim pristankom                                                                       |

CCR unosi postoje samo u memoriji i nestaju pri ponovnom pokretanju. Svaki blok je ograničen na 2 MiB, svaki
nosač na 16 MiB, a globalna pohrana na 64 MiB. Zadani TTL unosa je 24 sata (maksimalno
sedam dana). Potpuno dohvaćanje MCP-a ograničeno je na 256 KiB; veći blokovi ostaju dostupni putem
modusa raspona i grep-a. Pohrana, dohvaćanje, listanje, inspekcija, brisanje i statistike izolirani su prema
autentificiranom vlasniku API ključa. Zapisnici revizije sadrže heševe i metapodatke o veličini, nikada sadržaj.

`omniroute_compression_status` zasebno prikazuje kompresiju MCP opisa pod
`analytics.mcpDescriptionCompression`Ove vrijednosti su procjene veličine metapodataka za MCP deskriptore.
opis (alati,`uplikovi`,resursija`resourceTemplates`); nisu potvrde korištenja provajdera
i označeni su sa`izvor: "mcp_metadata_estimate"`.

### Filter stabla pristupačnosti MCP-a (v3.8.0)

Odvojeno od gore navedenih alata za kompresiju, OmniRoute uključuje filtar koji se izvodi nakon izvođenja i
obloge**rezultati alata**MCP alate za preglednik/pristupačnost prije nego što se vrate agentu.
Ovaj filter nije alat sam po sebi — transparentno se primjenjuje na bilo koji rezultat alata koji sadrži
Opsežan tekst stabla pristupačnosti ili snimci preglednika (≥2000 znakova).

Ključna ponašanja:

-Sumira ≥30 uzastopnih ponavljajućih redova istih podređenih elemenata u sumarni prikaz "glava + rep".
-Čuva sidra`[ref=eXX]`koji zahtijevaju dramsko pisanje/korištenje računara
-Teško skraćuje predugačak tekst (>50.000 znakova) navigacijskim savjetima
-Očekivane uštede:**60–80%**na korisnim podacima snimka preglednika

Konfiguracija:`compression.mcpAccessibility`u globalnim postavkama (migracija 056).
Implementacija:`open-sse/services/compression/engines/mcpAccessibility/`.
Potpuna dokumentacija: [Mehanizmi kompresije — MCP filter stabla pristupačnosti](../kompresija/KOMPRESIJSKI_ENGINES.md#mcp-filter-drveta-pristupačnosti).

Za detalje o modelu kompresije koji stoji iza ovih alata pogledajte [Mehanizmi kompresije](../kompresija/KOMPRESIJSKI_MOTORI.md) ja [RTK kompresija](../kompresija/RTK_KOMPRESIJA.md).

## 1Proxy Uvijek (3)

| Alati                       | Opcije         | Opis                                                                                      |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `čitaj:proksi` | Dohvaća besplatne proxyje s 1proxy tržišta (filteri protokol/zemlja/kvalitet/ograničenja) |
| `omniroute_oneproxy_rotate` | `čitaj:proksi` | Dohvaća sljedeći dostupni proxy prema strategiji (`slučajno`/`kvaliteta`/`sekvencijalno`) |
| `omniroute_oneproxy_stats`  | `čitaj:proksi` | Postavljanje statistike, statusa sinhronizacije, distribucije po protokolu i državi       |

## Alati za pamćenje (3)

Definirano u`open-sse/mcp-server/tools/memoryTools.ts`Autorizacija/opsezi se implementiraju putem standardnog MCP cjevovoda opsega.

| Alati                     | Opcije           | Opis                                                                                           |
| :------------------------ | :--------------- | :--------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `čitaj:memorija` | Pretražuje memorije po upitu / tipu / API ključu primjenjujući ograničenja tokena              |
| `omniroute_memory_add`    | `write:memorija` | Dodaje novi unos u memoriju (`činjenično`/epizodno/`proceduralno`/`semantički`)                |
| `omniroute_memory_clear`  | `write:memorija` | Briše memorije za API ključ, opcionalno filtrirane po vrsti ili vremenskoj oznaci `stariji od` |

## Alati za vještine (4)

Definirano u`open-sse/mcp-server/tools/skillTools.ts`Podržano od strane`src/lib/skills/registry`+`src/lib/skills/executor`.

| Alati                         | Opcije            | Opis                                                                                       |
| :---------------------------- | :---------------- | :----------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `čitaj:vještine`  | Prikazuje registrirane vještine s opcionalnim filtriranjem po API ključu, imenu ili stanju |
| `omniroute_skills_enable`     | `write:skills`    | Omogućava ili onemogućava određenu vještinu prema ID-u                                     |
| `omniroute_skills_execute`    | `izvrši:vještine` | Izvršava vještinu sa navedenim ulazom i vraća zapis o izvršenju                            |
| `omniroute_skills_executions` | `čitaj:vještine`  | Prikazuje nedavnu historiju izvršavanja vještina                                           |

## Izvor pojma Kontekst (6)

Definirano u`open-sse/mcp-server/tools/notionTools.ts`Token pohranjen u tabeli`ključ_vrijednost`možemo`src/lib/db/notion.ts`REST klijent i`src/lib/notion/api.ts`Postavke API-ja u`src/app/api/settings/notion/route.ts`Korisnički interfejs kontrolne ploče u`src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Konfigurišite svoj Notion token za integraciju sa kartice**Izvori konteksta**na kontrolnoj ploči krajnje tačke ili putem REST API-ja:

bash

# Postavi token

kovrčati -X POŠTA http://localhost:20128/api/settings/notion \
-H "Vrsta sadržaja: aplikacija/json" \
-d '{"token": "ntn_..."}'

# Provjeri status

kovrčati http://localhost:20128/api/settings/notion

# Prekini vezu

kovrčati -X IZBRIŠI http://localhost:20128/api/settings/notion

```

| Alati | Opcije | Opis |
| :-------------------------- | :-------------- | :-------------------------------------------------------------------- |
|`pretraga_pojma`|`čitaj:pojam`  | Pretraživanje cijelog teksta na svim stranicama i bazama podataka      |
|`notion_get_page`|`čitaj:pojam`| Dohvaća stranicu po ID-u zajedno s njenim svojstvima |
|`pojam_lista_blokova_djeca`|`čitaj:pojam`| Prikazuje podblokove stranice ili bloka |
|`notion_query_database`|`čitaj:pojam`| Upiti bazi podataka s filterima, sortiranjem i straničenjem |
|`notion_get_database`|`čitaj:pojam`| Dohvaća shemu baze podataka po ID-u |
|`notion_append_blocks`|`write:notion` | Dodaje podređene blokove nadređenom bloku (maksimalno 100 po zahtjevu) |

## Alati kataloga vještina agenata (3)

Definirano u`open-sse/mcp-server/tools/agentSkillTools.ts`Podržano od strane`src/lib/agentSkills/catalog`Ovi alati pružaju MCP klijentima i eksternim agentima katalog dokumentacije o vještinama agenata sa 45 unosa. Opseg:`čitaj:katalog`.

| Alati | Opcije | Opis |
| :-------------------------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
|`omniroute_agent_skills_list`|`čitaj:katalog`| Lista svih 45 vještina agenta s opcionalnim filterima`kategorija`(api\|cli) i`područje`vraća metapodatke + pokrivenost |
|`omniroute_agent_skills_get`|`čitaj:katalog`| Dohvaća pune metapodatke + SKILL.md sadržaj za pojedinačnu vještinu prema kanonskom`id`-u |
|`omniroute_agent_skills_coverage`|`čitaj:katalog`| Statistika pokrivenosti: koliko od 23 API, 21 CLI i 1 konfiguracijske vještine ima SKILL.md datoteke u datotečnom sistemu u odnosu na ukupan broj u katalogu |

Vidi [AGENT-VJEŠTINE.md](./AGENT-VJEŠTINE.md) za kompletan katalog i kako ga koriste vanjski agenti.

## Povezani okviri (v3.8.0)

Gornja lista MCP alata (110 jedinstvenih alata, izračunatih korištenjem`countUniqueMcpTools()`) je namjerno
ograničeno na operacije usmjeravanja/keširanja/kompresije/memorije/vještina/proxyja/izvora konteksta u realnom vremenu. Dva susjedna
Okviri se isporučuju s MCP serverom u verziji 3.8.0 i dokumentirani su zasebno:

### Agenti u oblaku

Cloud Agenti su AI agenti koji kodiraju izvan procesa (codex-cloud, cursor-cloud, devin, jules) i koji su povezani sa
OmniRoute koristi isti model povezivanja koji se koristi za pružatelje LLM usluga. Izloženi su putem
vlastite REST površine (`/api/v1/agents/*`) ja**oni nisu**dio kataloga alata MCP
— pozivanje Cloud Agenta ne troši MCP propusni opseg.

-Implementacija:`src/lib/cloudAgent/`(`registry.ts`,`agenti/codex.ts`,`agents/cursor.ts`,`agenti/devin.ts`,`agents/jules.ts`).
-Životni ciklus:`createTask`,`getStatus`,`odobriPlan`,`pošalji poruku`,`listSources`.
-Dokumentacija: [dokumenti/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Zaštitne mjere

Zaštitne mjere su filteri prije/poslije izvršenja (vidni most, pii-masker, prompt-injection)
koji se primjenjuju unutar konverzacijskog cjevovoda. Pokreću se prije nego što se dođe do MCP alata/sloja usmjeravanja
i emituju strukturirane prekršaje u revizijski proces; oni se ne pozivaju kao MCP alati.

-Implementacija:`src/lib/guardrails/`.
-Dokumentacija: [dokumenti/sigurnost/GUARRAILS.md](../sigurnost/GUARRAILS.md).

Prilikom otklanjanja grešaka u MCP pozivu koji izgleda blokiran, provjerite i MCP zapisnik revizije
(unesite`opseg_odbijen:*`) i revizijski trag zaštitnih mjera — zahtjev može biti odbijen od strane
zaštitne mjere**prije**nego što ikada stigne do sloja za provjeru opsega MCP-a.

---

## REST API krajnje tačke

| Krajnja tačka | Metoda | Opis | Autentifikacija |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------ | :------------------------ |
|`/api/mcp/status`|`DOBITI`| Status servera: otkucaji srca, stanje HTTP transporta, sažetak aktivnosti revizije | Upravljanje (sesija/administracija) |
|`/api/mcp/alati`|`DOBITI`| Katalog alata (naziv, opis, opseg, faza, izvorne krajnje tačke) | Upravljanje |
|`/api/mcp/sse`|`DOBITI`/`POST`| SSE krajnja tačka transporta (uslovljena od strane`mcpOmogućeno`+`mcpTransport === "do"`) | API ključ + rasponi |
|`/api/mcp/stream`|`POST`/`DOBITI`/`IZBRIŠI`| HTTP transport koji se može strujati (koristi zaglavlje`mcp-id-sesije`;`IZBRIŠI` završava sesiju)                  | API ključ + opsezi         |
|`/api/mcp/audit`|`DOBITI`| Unosi u dnevnik revizije iz`mcp_tool_audit`(filteri:`granica`,`offset`,`alat`,`uspjeh`,`apiKeyId`) | Upravljanje |
|`/api/mcp/audit/stats`|`DOBITI`| Agregirana statistička analiza revizije (`ukupniPozivi`,`Stopa uspjeha`,`prosj.TrajanjeMs`, najpopularniji alati) | Upravljanje |

Izvorne datoteke:`src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

I SSE i Streamable HTTP transporti su blokirani dok se MCP server ne omogući u Postavkama (`mcpOmogućeno`) i odgovarajući`mcpTransport`nije odabrano. Ako je konfiguriran pogrešan transport, ruta vraća HTTP 400 s uputama za promjenu postavki.

---

## Autentifikacija i opsezi

MCP alati se autentificiraju putem opsega API ključeva. Primjena opsega centralizirana je u
`open-sse/mcp-server/scopeEnforcement.ts`Svaki alat zahtijeva određene oblasti primjene:

| Opseg | Alati |
| :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|`čitaj:zdravlje`|`get_health`,`get_provider_metrics`,`simuliraj_rutu`,`objasni_rutu`,`najbolja_kombinacija_za_zadatak`,`db_health_check`|
|`čitaj:kombinacije`|`lista_kombinacija`,`get_combo_metrics`,`simuliraj_rutu`,`najbolja_kombinacija_za_zadatak`,`test_combo`|
|`write:combos`|`prekidačka_kombinacija`,`postavi_strategiju_usmjeravanja`|
|`čitaj:kvota`|`provjeri_kvotu`|
|`čitaj:korištenje`|`izvještaj_o_troškovima`,`get_session_snapshot`,`objasni_rutu`|
|`čitaj:modeli`|`katalog_liste_modela`|
|`izvrši:dovršenja`|`zahtjev_za_rutu`,`test_combo`|
|`izvrši:pretraži`|`web_search`,`x_search`,`web_fetch`|
|`write:budžet`|`set_budget_guard`|
|`write:resilience`|`postavi_profil_otpornosti`,`db_health_check`|
|`cijena:napiši`|`sinhronizacija_cijena`|
|`read:cache`|`stats_cache`|
|`write:cache`|`ispranje_predmemorije`|
|`čitaj:kompresija`|`status_kompresije`,`lista_kombinacija_kompresije`,`statistika_kombinacije_kompresije`|
|`write:compression`|`konfiguracija_kompresije`,`postavi_motor_kompresije`|
|`čitaj:proksi`|`oneproxy_fetch`,`oneproxy_rotate`,`oneproxy_stats`|
|`čitaj:pojam`|`pretraga_pojma`,`notion_get_page`,`pojam_lista_blokova_djeca`,`notion_query_database`,`notion_get_database`|
|`write:notion`|`notion_append_blocks`|
|`čitaj:memorija`|`pretraga_memorije`|
|`write:memorija`|`dodavanje_memorije`,`brisanje_memorije`|
|`čitaj:vještine`|`lista_vještina`,`izvršenja_vještina`|
|`write:skills`|`skills_enable`|
|`izvrši:vještine`|`izvršavanje_vještina`|
|`čitaj:katalog`|`lista_vještina_agenta`,`agent_skills_get`,`pokrivenost_vještinama_agenta`|
|`čitaj:alati`|`omniroute_tool_search`|
|`čitaj:radar`|`omniroute_radarski_katalog`|
|`čitaj:gamifikacija`|`gamifikacijski_profil`,`rang_gamifikacije`,`gamifikacijska_ljestvica`,`gamifikacijske_značke`,`gamifikacijski_serveri`,`anomalije_gamifikacije`|
|`write:gamifikacija`|`gamifikacija_poziv`,`gamifikacijski_transfer`|
|`čitaj:dodaci`|`list_plug-inova`,`izvršavanja_dodataka`|
|`write:plugins`|`plugin_scan`,`instalacija_plugina`,`deinstalacija_plugina`,`plugin_activate`,`deaktiviraj_plugin`,`konfiguracija_plugina`|
|`čitaj:opsidijan`| 13 alata za čitanje —`obsidian_list_vault`,`obsidian_read_note`,`obsidian_search_simple`,`obsidian_search_structured`,`obsidian_get_periodic_note`,`obsidian_sync_status`, … |
|`napiši:opsidijan`| 9 alata za pisanje —`obsidian_write_note`,`obsidian_append_note`,`opsidian_patch_note`,`opsidian_move_note`,`obsidian_delete_note`,`obsidian_sync_trigger`, … |
|`čitaj:lokalni-korpus`|`lokalna_pretraga_korpusa`,`lokalni_korpus_čitan`,`lokalni_status_korpusa`|

Alternativni rasponi su također podržani:`čitaj:*`dodjeljuje sve opsege za čitanje,`*`omogućava potpuni pristup.

### `mcp:connect` — autorizacija uskog usmjeravanja (#7895)

Pristup HTTP/SSE MCP transportu (`/api/mcp/*`) sa nepovratnim adresama zahtijeva
izuzeće`SAMO_LOKALNO`za`/api/mcp/`(vidi`docs/security/ROUTE_GUARD_TIERS.md`). Historijski gledano
Izgleda da je to izuzeće prihvatalo samo API ključ punog opsega.`upravljati`/`admin`— preširoko za
pozivalac čija je jedina potreba da razgovara sa MCP-om.`src/dijeljene/konstante/managementScopes.ts`sada
izvoz`MCP_CONNECT_SCOPE = "mcp:povezivanje"`: dodatni, uski opseg (isti presedan kao
`SELF_USAGE_SCOPE`) što ovlašćuje EKSKLUZIVNO zaobilaženje`/api/mcp/`u
`src/server/authz/policies/management.ts`— ne dozvoljava nikakav drugi pristup upravljačkim rutama
i namjerno je izostavljen iz`OPSEZI_KLJUČEVA_API_UPRAVLJANJA`Ključ koji on posjeduje`upravljati`/`admin`
i dalje prolazi oslobođenje nepromijenjeno;`mcp:povezivanje`je alternativa sa nižim snagama za
udaljeni pozivaoci koji koriste samo MCP i verifikovani putem`hasMcpConnectOrManageScope()`.

### Povezivanje HTTP opsega ključem (#7895)

Putem HTTP/SSE,`open-sse/mcp-server/httpTransport.ts`sada rješava stvarni
`api_keys.scopes`pozivalac putem`resolveMcpCallerAuthInfo()`(`open-sse/mcp-server/httpAuthContext.ts`)
i prosljeđuje ih MCP SDK-u`transport.handleRequest(req, { authInfo })`, tako da
`extra.authInfo.scopes` koji pristiže svakom pozivu alata odražava vlastite opsege Bearer ključa.
`resolveCallerScopeContext()`od`scopeEnforcement.ts`on je već dao prioritet`InfoOauth`ispred
`_meta`i rezervno rješenje s varijablom env`OMNIROUTE_MCP_SCOPES`— ova promjena samo popunjava
taj prvi, prioritetni izvor koji je prethodno bio nenapunjen putem HTTP-a. Kada se nijedan API ključ
ne može razriješiti (nema zaglavlja, nevažeći ključ), `InfoOauth`ostaci`nedefinirano`i rezolucija
pada nazad na stalni lanac`meta`/env ostaje nepromijenjen. Ova promjena NE mijenja zadanu vrijednost
`OMNIROUTE_MCP_ENFORCE_SCOPES` — primjena opsega i dalje mora biti eksplicitno omogućena; ova
promjena samo osigurava prednost puta po ključu jednom kada je primjena aktivirana. stdio nema
identifikacija pozivaoca (pogledajte`mcpCallerIdentity.ts`) i nije zahvaćen — ostaje na rezervnom lancu
`_meta`/okruženje

---

## Varijable okruženja

| Varijabla | Zadana vrijednost | Svrha |
| :----------------------------------------------------- | :------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------- |
|`OMNIROUTE_BASE_URL`|`http://localhost:20128`| Osnovni URL koji MCP server koristi prilikom pozivanja internih OmniRoute API-ja |
|`OMNIROUTE_API_KEY`| (prazno) | API ključ koji će biti proslijeđen kao`Ovlaštenje: Donosilac`interni API pozivi |
|`OMNIROUTE_MCP_ENFORCE_SCOPES`|`lažno`(samo`"tačno"`aktiviraj) | Kada je omogućeno, nedostajući opseg odbijaju pozive alata i evidentiraju se`opseg_odbijen:<razlog>`u zapisniku revizije |
|`OMNIROUTE_MCP_SCOPES`| (prazno) | Zarezima odvojena lista dozvoljenih opsega koji se podrazumijevano smatraju "dostupnima" (koristi se kada pozivalac ne specificira vlastite opsege) |
|`OMNIROUTE_MCP_KOMPRESIJA_OPISA`| (nije postavljeno = uključeno) | Kada je postavljeno na`0/netačno/isključeno/ne`, onemogućuje kompresiju MCP opisa pri registraciji                                                           |
|`OMNIROUTE_MCP_OPIS_KOMPRESIJE` | (nije postavljeno = uključeno)   | Alternativni alias za isti prekidač kao gore                                                                                                         |
|`OMNIROUTE_MCP_FETCH_TIMEOUT_MS`|`10000`                          | Vremenski budžet za interna upravljačka čitanja (zdravlje, otpornost, kombinacije, kvota, korištenje)                                                |
|`OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`|60000| Vremenski budžet za čekanje na provajdera usluge (`zahtjev_za_rutu`,`web_search`,`web_fetch`) |
|`MCP_TOOL_DENY`| (nije postavljeno = nema filtera) | Nazivi alata odvojeni zarezima koji se odbacuju iz`alati/lista`(smanjenje kardinalnosti alata — pogledajte dolje) |
|`MCP_TOOL_ALLOW`| (nije postavljeno = nema filtera) | Nazivi alata odvojeni zarezima koji se isključivo zadržavaju (režim bijele liste — pogledajte dolje) |
|`DATA_DIR`|`~/.omniroute`| Datoteka otkucaja srca se zapisuje u`${DATA_DIR}/runtime/mcp-heartbeat.json`|

---

## Kompresija opisa

MCP alati, upiti i registri resursa mogu komprimirati opise prilikom registracije/navođenja kako bi smanjili otisak metapodataka izložen klijentima (a time i troškove konteksta upita). Implementacija se nalazi u`open-sse/mcp-server/descriptionCompressor.ts`i povezan je sa MCP serverom putem`komprimirajMcpRegistryMetadata`unutra`createMcpServer()`.

-Kompresija se vrši nad tekstom opisa korištenjem skupa pravila Caveman (`getRulesForContext("sve", "puno")`) s ekstrakcijom sačuvanih blokova (blokovi koda, ograđeni blokovi itd.) kako strukturni sadržaj ne bi bio izmijenjen.
-Prebacivanje po implementaciji po vrijednosti`compression.mcpDescriptionCompressionEnabled`u tabeli postavki`ključ_vrijednost`(zadano: omogućeno) — prikazano u korisničkom interfejsu kao**Analitika → Kompresija opisa MCP-a**.
-Prebacite se za cijeli proces putem`OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false`ili`OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
-Statistike u realnom vremenu dostupne su putem`omniroute_compression_status`ispod`analytics.mcpDescriptionCompression`i označeni su sa`izvor: "mcp_metadata_estimate"`kako bi se razlikovalo od stvarnih potvrda korištenja usluga od strane pružatelja usluga.

---

## Smanji kardinalnost alata (F4.3)

Kompresija opisa smanjuje metapodatke svakog alata;**smanjenje kardinalnosti alata**ide korak dalje smanjenjem_broj_alati koji se uopšte objavljuju. Deklarišite manje alata u manifestu`alati/lista` smanjuje trošak tokena po zahtjevu koji klijentov model plaća za katalog alata (kompresija „sloja 5"). Implementacija je čisti, bespovratni filtar u `open-sse/mcp-server/toolCardinality.ts`(`reduceToolManifest`), uključeno u petlju registracije u`createMcpServer()`(`open-sse/mcp-server/server.ts`).

**Uključeno po potrebi, isključeno prema zadanim postavkama.**Filter se pokreće samo kada je postavljena barem jedna od dvije varijable okruženja; ako nijedna nije postavljena, svih 110 alata se objavljuje bez promjena.

| Varijabla | Način rada |
| :---------------- | :----------------------------------------------------------------------------------------- |
|`MCP_TOOL_DENY`| Crna lista — nazivi alata odvojeni zarezima koji se uvijek uklanjaju iz`alati/lista`|
|`MCP_TOOL_ALLOW`| Bijela lista — imena alata odvojena zarezima; samo ova preživljavaju, sve ostalo se uklanja |

`odbiti`ima prioritet nad`dozvoliti`Imena su odvojena zarezima, skraćena, a prazni unosi se ignorišu. Primjeri:

bash
# Uklonite dva alata iz kataloga
MCP_ALAT_ODBIJANJE="omniroute_get_health, omniroute_list_combos" omniroute --mcp

# Objavljivanje samo alata za usmjeravanje i kvote (režim bijele liste)
MCP_ALAT_DOZVOLJENO="omniroute_zahtjev_za_rutu, omniroute_provjera_kvote" omniroute --mcp
```

**Kako se uklanjaju filtrirani alati:**Registracija uvijek uspije; tada se poziva alat koji odbija profil`.onemogući()`onemogućava ga na MCP SDK handle-u, tako da se nikada ne pojavljuje u`alati/lista`, ali ožičenje ostaje netaknuto (uredno omogućavanje/onemogućavanje, bez ponovne registracije). Parser profila je `readMcpToolProfileFromEnv(process.env)`, koji vraća`null`(bez filtriranja) kada su obje varijable prazne.

Bogatiji oblik`Profil alata`iza`reduceToolManifest`također podržava filtriranje po presjeku raspona (`allowScopes`, sa podudaranjem džoker znakova u stilu`čitaj:*`) i determinističko ograničenje`maxTools`, ali ova dva parametra zahtijevaju potpuni manifest u trenutku registracije i**oni nisu**danas izloženi kroz varijable okoline (udica na nivou`alati/lista`se prati kao zadatak za buduće).`estimateManifestTokens()`dostupno je za poređenje cijene manifestnih tokena prije i poslije smanjenja.

---

## Otkucaj srca performansi

Stdio transport bilježi živost svakih 5 sekundi u`${DATA_DIR}/runtime/mcp-heartbeat.json`Kontrolna ploča (`/api/mcp/status`) čita tu datoteku zajedno s živošću PID-a kako bi izvela stanje `online`HTTP transporti umjesto toga izvještavaju o stanju iz internog procesa`getMcpHttpStatus()`(bez pisanja u datoteku).

Snimak otkucaja srca sadrži:

```json
{
  "pid":12345,
  "Počelo je u":"2026-05-13T12:34:56.000Z",
  "zadnjiOtkucajSrcaU":"2026-05-13T12:35:01.000Z",
  "verzija":"1.8.1",
  "prijevoz":"stdio",
  "opseziProvedeno":lažno,
  "dozvoljeniOpsezi": [],
  "broj alata":110
}
```

---

## Zapisivanje revizije

Svaki poziv alata se evidentira u SQLite tabeli`mcp_tool_audit`možemo`open-sse/mcp-server/audit.ts`:

-Naziv alata, argumenti (heširani/skraćeni prema`nivo_revizije`svaki alat), rezultat
-Trajanje u ms, oznaka uspjeha/neuspjeha, poruka o grešci (kada je primjenjivo)
-Heš API ključa, vremenska oznaka
-Odbijanja opsega se evidentiraju kao`opseg_odbijen:<razlog>` s popisom nedostajućih opsega

Koristite kontrolnu ploču ili REST krajnje tačke`/api/mcp/audit`ja`/api/mcp/audit/stats`da pregledate nedavne pozive.

---

## Datoteke

| Datoteka                                                                 | Svrha                                                                                    |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP Server Factory, ulazna tačka stdio-a, registracije sveobuhvatnih alata               |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transport (upravljanje sesijama)                                   |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Evaluacija opsega alata i rješavanje poziva                                              |
| `open-sse/mcp-server/audit.ts`                                           | Zapisivanje poziva alata u reviziji (`mcp_tool_audit`)                                   |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Stdio snimač otkucaja srca (`mcp-heartbeat.json`)                                        |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kompresija opisa za registre alata / upita / resursa                                     |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod shema + alati za registraciju (`MCP_ALATI`, 45 unosa)                                |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Alati za rukovanje za Fazu 2 + Predmemorija + 1proxy                                     |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Operateri alata za kompresiju                                                            |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definicije alata za pamćenje (3 alata)                                                   |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definicije alata za vještine (4 alata)                                                   |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definicije alata za Notion izvore konteksta (6 alata)                                    |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definicije alata za gamifikaciju (8 alata)                                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Alati za registraciju i upravljanje dodacima (8 alata)                                   |
| `src/app/api/mcp/status/route.ts`                                        | Krajnja tačka`/api/mcp/status`                                                           |
| `src/app/api/mcp/tools/route.ts`                                         | Krajnja tačka`/api/mcp/alati`                                                            |
| `src/app/api/mcp/sse/route.ts`                                           | SSE transportna ruta`/api/mcp/sse`                                                       |
| `src/app/api/mcp/stream/route.ts`                                        | Streamable HTTP transportna ruta`/api/mcp/stream`                                        |
| `src/app/api/mcp/audit/route.ts`                                         | Upit u zapisniku revizije`/api/mcp/audit`                                                |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Agregirane metrike revizije`/api/mcp/audit/stats`                                        |
| `src/lib/notion/api.ts`                                                  | Notion REST API klijent (ponovni pokušaji, vremenska ograničenja, klasifikacija grešaka) |
| `src/lib/db/notion.ts`                                                   | Skladištenje tokena (`ključ_vrijednost`stol)                                             |
| `src/app/api/settings/notion/route.ts`                                   | API postavke za Notion (GET/POST/DELETE)                                                 |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Korisnički interfejs za upravljanje Notion tokenima                                      |
| `testovi/jedinica/pojam-api.test.ts`                                     | Testovi Notion API klijenta (7)                                                          |
| `testovi/jedinica/pojam-alati.test.ts`                                   | Testovi implementacije opsega alata za pojam (10)                                        |
| `testovi/jedinica/baza/pojam.test.mjs`                                   | Testovi modula baze podataka Notion (3)                                                  |
