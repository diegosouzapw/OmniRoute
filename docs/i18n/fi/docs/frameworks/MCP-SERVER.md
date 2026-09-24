# OmniRoute MCP Server Documentation (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol -palvelin 110 työkalulla, jotka kattavat reitityksen, välimuistin, pakkauksen, muistin, taitojen, välityspalvelimen, poolin, Radarin ja kontekstilähteen toiminnot.
>
> Totuuden lähde: `open-sse/mcp-server/server.ts` laskee **110 ainutlaatuista työkalua** `countUniqueMcpTools()`-funktiolla: 45 kanonista määritelmää (mukaan lukien kuusi CCR-elinkaarityökalua, agentti-taidot-kolmikko, `omniroute_radar_catalog` ja `omniroute_x_search`), sekä muisti (3), taidot (4), GitHub-taidot (3), pooli (6), pelillistäminen (8), laajennukset (8), Notion (6), Obsidian (22), paikallinen korpus (3) ja kaksi vain RTK:lle tarkoitettua pakkaustyökalua.

## Asennus

OmniRoute MCP on sisäänrakennettu. Käynnistä se näin:

```bash
omniroute --mcp
```

Tai open-sse-siirtoprotokollan kautta:

```bash
# HTTP streamable -siirtoprotokolla (portti 20130)
omniroute --dev  # MCP käynnistyy automaattisesti /mcp-päätepisteessä
```

HTTP-siirtoprotokollat (`sse` / `streamable-http`, joita palvelin tarjoaa prosessin sisällä) ovat
oletuksena pois päältä ja olivat aiemmin kytkettävissä päälle vain `/dashboard/mcp`-sivulta. Versiosta v3.8.51 alkaen
CLI:llä on vastaavat toiminnot:

```bash
omniroute mcp status                                  # käytössä/online, siirtoprotokolla, työkalujen määrä
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # nollaa aktiiviset sse/streamable-http-istunnot
```

`mcp enable`/`mcp disable` PATCHaa saman `mcpEnabled` (ja valinnaisesti `mcpTransport`) -asetuksen,
jonka hallintapaneeli vaihtaa `/api/settings`-kautta. `mcp restart` kutsuu `POST /api/mcp/restart`: se purkaa
aktiiviset `sse`/`streamable-http`-istunnot, jotta seuraava pyyntö alustetaan puhtaasti, palauttaa
`409`, jos MCP on poissa käytöstä, ja `501` `stdio`-siirtoprotokollalle (stdio-asiakkaat hallitsevat omaa
aliprosessiaan – prosessin sisällä ei ole kahvaa uudelleenkäynnistykseen).

## Siirtoprotokollat

MCP-palvelin tarjoaa kolme siirtoprotokollaa, jotka kaikki perustuvat samaan `createMcpServer()`-tehtaaseen:

| Siirtoprotokolla  | Missä                                          | Milloin käyttää                                             |
| :---------------- | :--------------------------------------------- | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                | IDE-integraatiot (Claude Desktop, Cursor jne.)              |
| `sse`             | `POST/GET /api/mcp/sse` `httpTransport`-kautta | Selain-/agenttiasiakkaat, jotka tarvitsevat tapahtumavirran |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`              | Moni-istuntoiset HTTP-asiakkaat (`mcp-session-id`-otsake)   |

Aktiivinen HTTP-siirtoprotokolla (`sse` tai `streamable-http`) valitaan `mcpTransport`-asetuksella. Siirtoprotokollan vaihtaminen sulkee olemassa olevat istunnot toisessa siirtoprotokollassa.

### Etäkäyttö (manage-scope-ohitus)

`/api/mcp/*` kuuluu LOCAL_ONLY-tasoon (`src/server/authz/routeGuard.ts`) – oletuksena vain loopback-isännät (`localhost`, `127.0.0.1`, `::1`) voivat tavoittaa sen. Versiosta v3.8.2 alkaen muut kuin loopback-asiakkaat voivat muodostaa yhteyden, jos he esittävät `Authorization: Bearer <api-key>` -otsakkeen, jonka avaimella on `manage`-laajuus. Tämä on ainoa tapa tavoittaa etä-MCP-palvelin tunnelin, käänteisen välityspalvelimen tai julkisen isäntänimen kautta.

```bash
# Myönnä manage-laajuus: avaa hallintapaneelin API-avainsivu ja kytke
# "Management Access" päälle avaimelle, tai POST scopes:["manage"] luodessasi.

# Yhdistä sitten etä-MCP-asiakkaasta:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ei-manage-avain (tai ei Bearer-otsaketta) palauttaa `403 LOCAL_ONLY`. Sisarprefiksin `/api/cli-tools/runtime/*` ohitus ei ole tarkoituksellisesti mahdollista – katso [Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE-kokoonpano

Katso [MCP-asiakaskokoonpano](../guides/SETUP_GUIDE.md#mcp-client-configuration) Claude Desktopin, Cursorin, Clinen ja yhteensopivien MCP-asiakasohjelmien asetuksia varten.

---

## Olennaiset työkalut (14) — Vaihe 1

| Työkalu                         | Laajuudet             | Kuvaus                                                                                                                                    |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Käyttöaika, muisti, katkaisijat, nopeusrajoitukset, välimuistin tilastot                                                                  |
| `omniroute_list_combos`         | `read:combos`         | Kaikki määritetyt yhdistelmät strategioineen (valinnaiset mittarit)                                                                       |
| `omniroute_get_combo_metrics`   | `read:combos`         | Tietyn yhdistelmän suorituskykymittarit                                                                                                   |
| `omniroute_switch_combo`        | `write:combos`        | Aktivoi tai deaktivoi yhdistelmä                                                                                                          |
| `omniroute_create_combo`        | `write:combos`        | Luo validoitu yhdistelmä olemassa olevan yhdistelmä-API:n kautta                                                                          |
| `omniroute_check_quota`         | `read:quota`          | Käytetty/kokonaiskiintiö, jäljellä oleva prosenttiosuus, nollausaika, tunnuksen tila                                                      |
| `omniroute_route_request`       | `execute:completions` | Lähetä chat-valmistuminen OmniRoute-reitityksen kautta                                                                                    |
| `omniroute_cost_report`         | `read:usage`          | Kustannusraportti ajanjakson mukaan (istunto/päivä/viikko/kuukausi)                                                                       |
| `omniroute_list_models_catalog` | `read:models`         | Täydellinen malliluettelo ominaisuuksineen, tiloineen, hinnoitteluineen                                                                   |
| `omniroute_radar_catalog`       | `read:radar`          | Paikallisesti allekirjoitettu Radar-luettelo; valinnaiset palveluntarjoaja-/perhesuodattimet                                              |
| `omniroute_tool_search`         | `read:tools`          | Löydä työkaluja rekisteröidystä MCP-luettelosta                                                                                           |
| `omniroute_web_search`          | `execute:search`      | Verkkohaku määritettyjen hakupalveluntarjoajien kautta. Ei X/Twitter.                                                                     |
| `omniroute_x_search`            | `execute:search`      | Hae X:stä xAI/SuperGrokin kautta tai valitse `xquik-search` Xquik API -tuloksia varten. Vaatii tunnistetiedot valitulle taustaohjelmalle. |
| `omniroute_web_fetch`           | `execute:search`      | Hae verkkosisältöä määritettyjen hakupalveluntarjoajien kautta                                                                            |

## Edistyneet työkalut (11) — Vaihe 2

| Työkalu                            | Laajuudet                            | Kuvaus                                                                                                                            |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Kuiva-ajo reitityssimulaatio varapuun kanssa                                                                                      |
| `omniroute_set_budget_guard`       | `write:budget`                       | Istunnon budjetti heikennys-/esto-/hälytystoiminnolla                                                                             |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Päivitä yhdistelmästrategia ajon aikana (prioriteetti/painotettu/auto/jne.)                                                       |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Käytä `aggressiivista` / `tasapainoista` / `konservatiivista` joustavuuden esiasetusta                                            |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Jokaisen palveluntarjoajan reaaliaikainen testaus yhdistelmässä käyttäen todellista ylävirran kutsua                              |
| `omniroute_get_provider_metrics`   | `read:health`                        | Palveluntarjoajakohtaiset mittarit p50/p95/p99 viiveellä ja katkaisijan tilalla                                                   |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Suosittele yhdistelmää tehtävätyypin mukaan budjetti-/viiverajoituksilla                                                          |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Selitä, miksi pyyntö reititettiin palveluntarjoajalle (pisteytystekijät + vararatkaisut)                                          |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Täysi istunnon tilannekuva: kustannukset, tokenit, parhaat mallit/palveluntarjoajat, virheet, budjettisuoja                       |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnosoi (ja valinnaisesti korjaa automaattisesti) tietokannan poikkeamat, kuten rikkinäiset yhdistelmäviittaukset / orvot rivit |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synkronoi hintatiedot ulkoisista lähteistä (LiteLLM); tukee `dryRun`-toimintoa                                                    |

## Välimuistityökalut (2)

| Työkalu                 | Laajuudet     | Kuvaus                                                                    |
| :---------------------- | :------------ | :------------------------------------------------------------------------ |
| `omniroute_cache_stats` | `read:cache`  | Semanttisen välimuistin, kehotevälimuistin ja idempotenttisuuden tilastot |
| `omniroute_cache_flush` | `write:cache` | Tyhjennä välimuisti globaalisti tai allekirjoituksen/mallin mukaan        |

## Pakkaustyökalut (13)

| Työkalu                             | Laajuudet           | Kuvaus                                                                                                                               |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Pakkausasetukset, analytiikan yhteenveto ja välimuistitietoiset tilastot (sisältää `analytics.mcpDescriptionCompression`-metatiedot) |
| `omniroute_compression_configure`   | `write:compression` | Määritä pakkaustila, kynnysarvo, tavoitesuhde, järjestelmäkehotteen säilytys, MCP-kuvauksen pakkauksen kytkin                        |
| `omniroute_set_compression_engine`  | `write:compression` | Valitse aktiivinen moottori (pois päältä/caveman/rtk/stacked) ja Caveman/RTK-intensiteetti                                           |
| `omniroute_list_compression_combos` | `read:compression`  | Listaa nimetyt pakkausyhdistelmät ja niiden moottoriputket                                                                           |
| `omniroute_compression_combo_stats` | `read:compression`  | Analytiikka ryhmiteltynä pakkausyhdistelmän ja moottorin mukaan                                                                      |
| `omniroute_ccr_store`               | `write:compression` | Tallenna kutsujakohtainen sisältö rajattuun muistissa olevaan CCR-varastoon ja palauta merkki sekä `ccr://`-viittaus                 |
| `omniroute_ccr_retrieve`            | `read:compression`  | Hae CCR-sisältö kokonaan tai head-, tail-, lines-, grep- ja stats-tiloilla                                                           |
| `omniroute_ccr_inspect`             | `read:compression`  | Tarkasta kutsujan omistamat CCR-metatiedot palauttamatta sisältöä                                                                    |
| `omniroute_ccr_list`                | `read:compression`  | Listaa sivutetut metatiedot kutsujan omistamille CCR-lohkoille                                                                       |
| `omniroute_ccr_delete`              | `write:compression` | Poista kutsujan omistama CCR-lohko                                                                                                   |
| `omniroute_ccr_stats`               | `read:compression`  | Raportoi kutsujakohtainen muistin käyttö, elinkaarilaskurit ja tallennusrajat                                                        |
| `omniroute_rtk_discover`            | `read:compression`  | Löydä toistuvaa kohinaa opt-in RTK-tulosesimerkeistä                                                                                 |
| `omniroute_rtk_learn`               | `read:compression`  | Luo tarkistettava RTK-suodatinluonnos opt-in-näytteistä                                                                              |

CCR-merkinnät ovat vain muistissa ja katoavat uudelleenkäynnistyksen yhteydessä. Jokainen lohko on rajoitettu 2 MiB:iin, jokainen pääkäyttäjä 16 MiB:iin ja globaali tallennustila 64 MiB:iin. Merkintöjen oletus-TTL on 24 tuntia (enintään seitsemän päivää). Täysi MCP-haku on rajoitettu 256 KiB:iin; suuremmat lohkot ovat edelleen saatavilla alueellisten ja grep-tilojen kautta. Tallennus, haku, listaus, tarkastus, poisto ja tilastot on eristetty todennetun API-avaimen pääkäyttäjän toimesta. Tarkastustietueet sisältävät tiivisteitä ja kokometatietoja, ei koskaan sisältöä.

`omniroute_compression_status` raportoi MCP-kuvausten pakkauksen erikseen kohdassa `analytics.mcpDescriptionCompression`. Nämä arvot ovat MCP:n listattavien kuvausten (`tools`, `prompts`, `resources` ja `resourceTemplates`) metatietojen kokonaisarvioita; ne eivät ole palveluntarjoajan käyttökuitteja ja ne on merkitty tunnisteella `source: "mcp_metadata_estimate"`.

### MCP-saavutettavuuspuun suodatin (v3.8.0)

Edellä mainituista pakkaustyökaluista erillään OmniRoute sisältää suorituksen jälkeisen suodattimen, joka pakkaa MCP-selain-/saavutettavuustyökalujen **työkalutulokset** ennen niiden palauttamista agentille. Tämä suodatin ei itsessään ole työkalu – se toimii läpinäkyvästi kaikissa työkalutuloksissa, jotka sisältävät yksityiskohtaista saavutettavuuspuu- tai selainkuvatekstiä (≥2000 merkkiä).

Keskeiset ominaisuudet:

- Tiivistää ≥30 peräkkäistä toistuvaa sisarlinjaa alku- ja loppuyhteenvedoksi
- Säilyttää `[ref=eXX]`-ankkurit, jotka Playwright/tietokonekäyttö edellyttää
- Katkaisee ylisuuren tekstin (>50 000 merkkiä) jyrkästi navigointivihjeellä
- Odotetut säästöt: **60–80 %** selaimen tilannekuvien kuormituksessa

Konfiguraatio: `compression.mcpAccessibility` globaaleissa asetuksissa (migraatio 056).
Toteutus: `open-sse/services/compression/engines/mcpAccessibility/`.
Täydelliset dokumentit: [Pakkausmoottorit — MCP-saavutettavuuspuun suodatin](../compression/COMPRESSION_ENGIINES.md#mcp-accessibility-tree-filter).

Katso [Pakkausmoottorit](../compression/COMPRESSION_ENGIINES.md) ja [RTK-pakkaus](../compression/RTK_COMPRESSION.md) näiden työkalujen taustalla olevasta ajonaikaisesta pakkausmallista.

## 1Proxy-työkalut (3)

| Työkalu                     | Laajuudet      | Kuvaus                                                                                                |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Hae ilmaisia välityspalvelimia 1proxy-markkinapaikalta (protokolla/maa/laatu/rajoitus-suodattimet)    |
| `omniroute_oneproxy_rotate` | `read:proxies` | Hae seuraava saatavilla oleva välityspalvelin strategian mukaan (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Poolin tilastot, synkronoinnin tila, jakautuminen protokollan ja maan mukaan                          |

## Muistityökalut (3)

Määritelty tiedostossa `open-sse/mcp-server/tools/memoryTools.ts`. Todennus/laajuus pannaan täytäntöön standardin MCP-laajuusputken kautta.

| Työkalu                   | Laajuudet      | Kuvaus                                                                                              |
| :------------------------ | :------------- | :-------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Hae muistoja kyselyn / tyypin / API-avaimen perusteella token-budjetin valvonnalla                  |
| `omniroute_memory_add`    | `write:memory` | Lisää uusi muistimerkintä (`factual` / `episodic` / `procedural` / `semantic`)                      |
| `omniroute_memory_clear`  | `write:memory` | Tyhjennä muistot API-avaimelle, valinnaisesti suodatettuna tyypin tai `olderThan`-aikaleiman mukaan |

## Taitotyökalut (4)

Määritelty tiedostossa `open-sse/mcp-server/tools/skillTools.ts`. Taustalla `src/lib/skills/registry` + `src/lib/skills/executor`.

| Työkalu                       | Laajuudet        | Kuvaus                                                                                                      |
| :---------------------------- | :--------------- | :---------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Listaa rekisteröidyt taidot valinnaisella suodatuksella API-avaimen, nimen tai käytössä olevan tilan mukaan |
| `omniroute_skills_enable`     | `write:skills`   | Ota käyttöön tai poista käytöstä tietty taito ID:n perusteella                                              |
| `omniroute_skills_execute`    | `execute:skills` | Suorita taito annetulla syötteellä ja palauta suoritustietue                                                |
| `omniroute_skills_executions` | `read:skills`    | Listaa viimeaikainen taitojen suoritushistoria                                                              |

## Notion-kontekstilähde (6)

Määritelty tiedostossa `open-sse/mcp-server/tools/notionTools.ts`. Tunnus (token) tallennetaan `key_value`-tauluun `src/lib/db/notion.ts`:n kautta. REST-asiakasohjelma tiedostossa `src/lib/notion/api.ts`. Asetusten API tiedostossa `src/app/api/settings/notion/route.ts`. Hallintapaneelin käyttöliittymä tiedostossa `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Määritä Notion-integraatiotunnuksesi **Context Sources** -välilehdeltä Endpoint-hallintapaneelissa tai REST API:n kautta:

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

| Työkalu                      | Laajuudet      | Kuvaus                                                             |
| :--------------------------- | :------------- | :----------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Koko tekstin haku kaikilta sivuilta ja tietokannoista              |
| `notion_get_page`            | `read:notion`  | Hae sivu ID:n perusteella sen ominaisuuksineen                     |
| `notion_list_block_children` | `read:notion`  | Listaa sivun tai lohkon lapsilohkot                                |
| `notion_query_database`      | `read:notion`  | Kysely tietokannasta suodattimilla, lajitteluilla ja sivutuksella  |
| `notion_get_database`        | `read:notion`  | Hae tietokannan skeema ID:n perusteella                            |
| `notion_append_blocks`       | `write:notion` | Liitä lapsilohkoja vanhempaan lohkoon (enintään 100 pyyntöä kohti) |

## Agenttitaidon luettelotyökalut (3)

Määritelty tiedostossa `open-sse/mcp-server/tools/agentSkillTools.ts`. Taustalla `src/lib/agentSkills/catalog`. Nämä työkalut paljastavat 45-merkinnän Agenttitaitojen dokumentaatioluettelon MCP-asiakkaille ja ulkoisille agenteille. Laajuus: `read:catalog`.

| Työkalu                           | Laajuudet      | Kuvaus                                                                                                                                                          |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Listaa kaikki 45 agenttitaitoa valinnaisilla `category` (api\|cli) ja `area` -suodattimilla; palauttaa metatiedot + kattavuuden                                 |
| `omniroute_agent_skills_get`      | `read:catalog` | Hae täydelliset metatiedot + SKILL.md-sisältö yhdelle taidolle kanonisella `id`:llä                                                                             |
| `omniroute_agent_skills_coverage` | `read:catalog` | Kattavuustilastot: kuinka monella 23 API-, 21 CLI- ja 1 konfiguraatiotaidosta on SKILL.md-tiedostot tiedostojärjestelmässä verrattuna luettelon kokonaismääriin |

Katso [AGENT-SKILLS.md](./AGENT-SKILLS.md) koko luettelosta ja siitä, miten ulkoiset agentit käyttävät sitä.

## Liittyvät viitekehykset (v3.8.0)

Yllä oleva MCP-työkaluluettelo (110 yksilöllistä työkalua, laskettu `countUniqueMcpTools()`-funktiolla) on tarkoituksellisesti
rajattu ajonaikaisiin reititys-/välimuisti-/pakkaus-/muisti-/taito-/välityspalvelin-/kontekstilähde-toimintoihin. Kaksi vierekkäistä
viitekehystä toimitetaan MCP-palvelimen mukana versiossa v3.8.0 ja ne on dokumentoitu erikseen:

### Pilviagentit

Pilviagentit ovat prosessin ulkopuolisia tekoälykoodausagentteja (codex-cloud, cursor-cloud, devin, jules), jotka on kytketty
OmniRouteen samalla yhteysmallilla, jota käytetään LLM-palveluntarjoajille. Ne paljastetaan
oman REST-rajapintansa (`/api/v1/agents/*`) kautta, eivätkä ne **ole** osa MCP-työkaluluetteloa
— pilviagentin kutsuminen ei kuluta MCP-laajuutta.

- Toteutus: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Elinkaari: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentaatio: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Suojakaiteet

Suojakaiteet ovat ennen/jälkeen suoritettavia suodattimia (vision-bridge, pii-masker, prompt-injection),
joita sovelletaan keskusteluputkessa. Ne suoritetaan ennen kuin MCP-työkalu-/reitityskerros saavutetaan
ja ne lähettävät jäsenneltyjä rikkomuksia auditointiputkeen; niitä ei kutsuta MCP-työkaluina.

- Toteutus: `src/lib/guardrails/`.
- Dokumentaatio: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Kun debuggaat MCP-kutsua, joka näyttää olevan estetty, tarkista sekä MCP:n auditointiloki
(`scope_denied:*` -merkinnät) että suojakaiteiden auditointijälki – pyyntö voidaan hylätä
suojakaiteen toimesta **ennen** kuin se edes saavuttaa MCP:n laajuuden valvontakerroksen.

---

## REST-rajapinnan päätepisteet

| Päätepiste             | Metodi                | Kuvaus                                                                                                            | Todennus                      |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------------- | :---------------------------- |
| `/api/mcp/status`      | `GET`                 | Palvelimen tila: syke, HTTP-siirtotila, auditointitoiminnan yhteenveto                                            | Hallinta (istunto/ylläpitäjä) |
| `/api/mcp/tools`       | `GET`                 | Työkaluluettelo (nimi, kuvaus, laajuudet, vaihe, lähdepäätepisteet)                                               | Hallinta                      |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE-siirtopäätepiste (rajattu `mcpEnabled` + `mcpTransport === "sse"` -asetuksilla)                               | API-avain + laajuudet         |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Suoratoistettava HTTP-siirto (käyttää `mcp-session-id` -otsikkoa; `DELETE` päättää istunnon)                      | API-avain + laajuudet         |
| `/api/mcp/audit`       | `GET`                 | Auditointilokimerkinnät `mcp_tool_audit`-taulusta (suodattimet: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Hallinta                      |
| `/api/mcp/audit/stats` | `GET`                 | Aggregoidut auditointitilastot (`totalCalls`, `successRate`, `avgDurationMs`, suosituimmat työkalut)              | Hallinta                      |

Lähdetiedostot: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Sekä SSE- että suoratoistettavat HTTP-siirrot ovat estettyjä, kunnes MCP-palvelin on otettu käyttöön asetuksissa (`mcpEnabled`) ja sopiva `mcpTransport` on valittu. Jos väärä siirto on määritetty, reitti palauttaa HTTP 400 -virheen ja vihjeen asetusten vaihtamisesta.

---

## Todennus ja laajuudet

MCP-työkalu kutsuu lukulaajuusmerkkijonoja kutsujalta. Tämä tarkistus on yksi kolmesta
itsenäisestä nimiavaruudesta. Yhden tarkistajan läpäisy ei ole läpäisy muilta.
Säännöt ovat [Kolme laajuusnimiavaruutta](#kolme-laajuusnimiavaruutta).
Työkaluluettelo on [MCP-työkalun laajuudet](#mcp-työkalun-laajuudet).

### Kolme laajuusnimiavaruutta

`manage` API-avaimella, `read:compression` MCP-työkalulla ja `read`
`oma_live_…` -käyttöoikeustunnuksella ovat kolme eri myöntämistä. Kutsujat, jotka lähettävät `read`
-käyttöoikeustunnuksen muuttavalle hallintareitille, saavat HTTP 403
`Access token scope 'read' is insufficient; 'write' required.`
Tämä sijoitus on `scopeSatisfies`. Se ei konsultoi MCP-taulukkoa, eikä MCP-vastaaja konsultoi sitä.

| Nimiavaruus            | Tunnus                                                           | Tarkistaja         | Läpäisy sallii                                                      |
| :--------------------- | :--------------------------------------------------------------- | :----------------- | :------------------------------------------------------------------ |
| API-avaimen hallinta   | `api_keys.scopes`                                                | `hasManageScope`   | Hallinta-REST kyseiselle Bearer-avaimelle                           |
| API-avaimen lisäys     | sama taulukko, yksi tarkka merkkijono                            | alla nimetty apuri | Vain kyseinen ominaisuus                                            |
| MCP-työkalun laajuudet | sama taulukko, muuten MCP `_meta`, muuten `OMNIROUTE_MCP_SCOPES` | `scopeMatches`     | Kyseinen työkalu, kun valvonta on päällä                            |
| Käyttöoikeustunnus     | `oma_live_…`                                                     | `scopeSatisfies`   | Hallintareitti, jonka metodi ja polku vaativat kyseisen sijoituksen |

Jokaisen tunnuksen luominen käsitellään kohdassa
[Hallinnan todennus](../guides/MANAGEMENT-AUTH.md).

#### API-avaimen laajuudet

Yksi `api_keys.scopes` -taulukko syöttää kahta työtä. Ne käyttävät eri funktioita.

**Hallinta-REST.** `manage` ja `admin` ovat jäseniä
`MANAGEMENT_API_KEY_SCOPES` -vakiossa (`src/shared/constants/managementScopes.ts`).
`hasManageScope` valtuuttaa hallintareitit kyseiselle avaimelle. `admin` on
hallintakykyinen kyseisillä reiteillä. Sana `admin` tässä ei ole
käyttöoikeustunnuksen sijoitus, eikä se laajene MCP-työkalun laajuuksiin.

**Lisämerkkijonot.** Jokainen on tarkka jäsenyystesti, ja jokainen pysyy
`MANAGEMENT_API_KEY_SCOPES` -vakiosta ulkopuolella.

| Laajuus                        | Läpäisy sallii                                                                                                                                                                    |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Ei-loopback `/api/mcp/` LOCAL_ONLY -leikkaus vain (`hasMcpConnectOrManageScope`). Avain, jolla on `manage` tai `admin`, läpäisee edelleen kyseisen leikkauksen.                   |
| `self:usage`                   | `GET /api/v1/me/status` tälle avaimelle (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` lisää tämän laajuuden luonnin yhteydessä (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Ylävirran tilikiintiöt kyseisen tilatiedon sisällä (`src/lib/usage/apiKeySelfService.ts`). Tilareitti vaatii edelleen `self:usage`.                                               |
| `policy:bypass-provider-quota` | Tämän avaimen päättelykutsut ohittavat palveluntarjoajan kiintiöpolitiikan (`hasProviderQuotaBypassScope` tiedostossa `src/sse/handlers/chat.ts`).                                |

#### Vastaavuus

Luettelo on taulukko kohdassa [MCP-työkalun laajuudet](#mcp-työkalun-laajuudet). Älä
käsittele `MCP_SCOPE_LIST` tiedostossa `src/shared/constants/mcpScopes.ts` luettelona:
se on alkuperäinen tyypitetty alijoukko. Myöhemmät työkalut ilmoittavat lisälaajuuksia sen
lisäksi (`read:notion`, `read:skills`, `read:local-corpus` ja loput taulukosta).

`evaluateToolScopes` tiedostossa `open-sse/mcp-server/scopeEnforcement.ts` sallii kutsun,
kun jokainen vaadittu laajuus vastaa jotakin myönnettyä laajuutta:

- `*` vastaa jokaista vaadittua laajuutta.
- Myönnetty laajuus, joka päättyy `*`-merkkiin, vastaa vaadittua laajuutta, joka alkaa
  tähteä edeltävällä etuliitteellä. `read:*` vastaa `read:compression`.
- Jokainen muu myönnetty laajuus vastaa vain identtistä vaadittua merkkijonoa.

Avain, jonka laajuudet ovat `["manage"]`, epäonnistuu `scopeMatches` -tarkistuksessa `read:compression` -laajuudelle.
Sama kutsu epäonnistuu `admin`, `mcp:connect`, `read` ja `write` -laajuuksille, kun ne
ovat ainoat myönnetyt merkkijonot. MCP-työkalun laajuuksissa ei ole hierarkiaa
muuta kuin loppuva `*`.

Valvonta on pois päältä, ellei `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (oletus
`false`). Kun se on pois päältä, `evaluateToolScopes` sallii kutsun ja ohittaa
luettelon. Kun se on päällä, HTTP käyttää Bearer-avaimen `api_keys.scopes`
`authInfo` -tietona (katso [Avainkohtainen HTTP-laajuussidonta](#per-key-http-scope-binding-7895)).
Kun avaimen laajuudet eivät ratkea, myönnetty joukko putoaa MCP `_meta` -tietoon, sitten
`OMNIROUTE_MCP_SCOPES` -tietoon.

#### Käyttöoikeustunnuksen laajuudet

`oma_live_…` -tunnukset (`src/lib/accessTokens/scopes.ts`) sisältävät `read`, `write`
tai `admin`. `scopeSatisfies` on sijoitus: `admin` kattaa `write` ja `read`, ja
`write` kattaa `read`. Tuntemattomat laajuudet eivät kata mitään.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) vertaa tätä
sijoitusta `inferRequiredScope` -funktioon (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` ja `OPTIONS` vaativat `read`.
- Jokainen muu metodi vaatii `write`.
- Polut `ADMIN_SCOPE_PREFIXES` -vakiossa vaativat `admin` jokaiselle metodille. `/api/mcp`
  on tällä listalla, joten `write` -käyttöoikeustunnus ei silti voi kutsua MCP HTTP -pintaa.
- Polut `ADMIN_MUTATION_PREFIXES` -vakiossa vaativat `admin` vain mutaatioille.

`PATCH /api/keys/{id}` on mutaatio eikä se ole näillä ylläpitäjälistoilla, joten `read`-tunnus saa 403-virheen `Access token scope 'read' is insufficient; 'write' required.`. `write`- tai `admin`-käyttötunnus kelpaa tälle reitille. Kojelaudan JWT, loopback CLI:n kone-ID-tunnus ja API-avain, jolla on `manage`- tai `admin`-oikeudet, käyttävät muita haaroja, eikä tämä rankki rajoita niitä.

Käyttötunnus, joka läpäisee `scopeSatisfies`-tarkistuksen `/api/mcp`-reitille, on läpäissyt vain hallintaportin. Työkalukutsut suorittavat edelleen `scopeMatches`-tarkistuksen API-avaimen scopeja vastaan. Käyttötunnuksen rankki ei ole syöte `scopeMatches`-funktiolle.

### MCP-työkalujen scopet

Scopen valvonta on keskitetty tiedostoon `open-sse/mcp-server/scopeEnforcement.ts`. Jokainen työkalu vaatii tietyt scopet:

| Laajuus               | Työkalut                                                                                                                                                                       |
| :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                              |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                      |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                         |
| `read:quota`          | `check_quota`                                                                                                                                                                  |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                         |
| `read:models`         | `list_models_catalog`                                                                                                                                                          |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                  |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                          |
| `write:budget`        | `set_budget_guard`                                                                                                                                                             |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                    |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                 |
| `read:cache`          | `cache_stats`                                                                                                                                                                  |
| `write:cache`         | `cache_flush`                                                                                                                                                                  |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                     |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                              |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                          |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                               |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                         |
| `read:memory`         | `memory_search`                                                                                                                                                                |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                   |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                             |
| `write:skills`        | `skills_enable`                                                                                                                                                                |
| `execute:skills`      | `skills_execute`                                                                                                                                                               |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                               |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                        |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                      |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                               |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                 |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                             |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                |
| `read:obsidian`       | 13 lukutyökalua — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 kirjoitustyökalua — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …           |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                              |

Wildcard-laajuudet ovat tuettuja: `read:*` myöntää kaikki lukulaajuudet, `*` myöntää täyden pääsyn.

### `mcp:connect` – kapea reittikyky (#7895)

HTTP/SSE MCP-kuljetukseen (`/api/mcp/*`) pääsy muualta kuin loopbackista vaatii
`/api/mcp/` LOCAL_ONLY -poikkeuksen (katso `docs/security/ROUTE_GUARD_TIERS.md`). Historiallisesti
tämä poikkeus hyväksyi vain täyden `manage`/`admin`-laajuuden API-avaimen – liian laaja
kutsujalle, joka tarvitsee vain MCP:n kanssa kommunikointia. `src/shared/constants/managementScopes.ts`
vie nyt `MCP_CONNECT_SCOPE = "mcp:connect"`: lisätty, kapea laajuus (sama ennakkotapaus kuin
`SELF_USAGE_SCOPE`), joka valtuuttaa AINOASTAAN `/api/mcp/` ohituksen
`src/server/authz/policies/management.ts` -tiedostossa – se ei myönnä muuta hallintareitin pääsyä
ja on tarkoituksella pidetty POISSA `MANAGEMENT_API_KEY_SCOPES` -listasta. Avain, jolla on `manage`/`admin`,
läpäisee edelleen poikkeuksen muuttumattomana; `mcp:connect` on alemman etuoikeuden vaihtoehto
etäisille vain MCP-kutsujille, tarkistettuna `hasMcpConnectOrManageScope()` -funktiolla.

### Avainkohtainen HTTP-laajuuden sidonta (#7895)

HTTP/SSE:n kautta `open-sse/mcp-server/httpTransport.ts` ratkaisee nyt kutsujan todelliset
`api_keys.scopes` -arvot `resolveMcpCallerAuthInfo()` -funktion kautta (`open-sse/mcp-server/httpAuthContext.ts`)
ja välittää ne MCP SDK:n `transport.handleRequest(req, { authInfo })` -funktiolle, jotta
`extra.authInfo.scopes`, joka saavuttaa jokaisen työkalukutsun, heijastaa Bearer-avaimen omia laajuuksia.
`scopeEnforcement.ts`:n `resolveCallerScopeContext()` priorisoi jo `authInfo`:n
`_meta` ja `OMNIROUTE_MCP_SCOPES` -ympäristömuuttujan varajärjestelmän yli – tämä vain täyttää sen ensimmäisen,
korkeimman prioriteetin lähteen, joka oli aiemmin syöttämätön HTTP:n kautta. Kun API-avainta ei ratkaista
(ei otsikkoa, virheellinen avain), `authInfo` pysyy `undefined` ja ratkaisu jatkuu
olemassa olevaan `meta`/ympäristömuuttujan ketjuun muuttumattomana. Tämä EI muuta `OMNIROUTE_MCP_ENFORCE_SCOPES`:n
oletusarvoa – valvonta on edelleen otettava käyttöön erikseen; tämä muutos vain saa
avainkohtaisen polun etusijalle, kun se on käytössä. Stdio:lla ei ole kutsujakohtaista identiteettiä (katso
`mcpCallerIdentity.ts`) ja se ei vaikuta – se pysyy `_meta`/ympäristömuuttujan varajärjestelmän ketjussa.

---

## Ympäristömuuttujat

| Muuttuja                                | Oletusarvo                                 | Tarkoitus                                                                                                                                     |
| :-------------------------------------- | :----------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                   | MCP-palvelimen käyttämä perus-URL kutsuessaan OmniRouten sisäisiä API-rajapintoja                                                             |
| `OMNIROUTE_API_KEY`                     | (tyhjä)                                    | API-avain, joka välitetään `Authorization: Bearer` -muodossa sisäisiin API-kutsuihin                                                          |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (vain `"true"` ottaa sen käyttöön) | Kun käytössä, puuttuvat laajuudet estävät työkalukutsut ja kirjaavat `scope_denied:<reason>` tarkastuslokiin                                  |
| `OMNIROUTE_MCP_SCOPES`                  | (tyhjä)                                    | Pilkulla eroteltu sallittujen laajuuksien luettelo, joita pidetään oletuksena "saatavilla" (käytetään, kun kutsuja ei anna omia laajuuksiaan) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (määrittämätön = päällä)                   | Kun asetettu arvoon `0/false/off/no`, poistaa MCP-kuvausten pakkauksen käytöstä rekisteröinnin yhteydessä                                     |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (määrittämätön = päällä)                   | Vaihtoehtoinen alias samalle kytkimelle kuin yllä                                                                                             |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                    | Keskeytysbudjetti sisäisille hallintalukemille (tila, joustavuus, yhdistelmät, kiintiö, käyttö)                                               |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                    | Keskeytysbudjetti hyppyille, jotka odottavat palveluntarjoajaa (`route_request`, `web_search`, `web_fetch`)                                   |
| `MCP_TOOL_DENY`                         | (määrittämätön = ei suodatusta)            | Pilkulla erotellut työkalujen nimet, jotka poistetaan `tools/list` -luettelosta (työkalujen kardinaliteetin vähentäminen – katso alta)        |
| `MCP_TOOL_ALLOW`                        | (määrittämätön = ei suodatusta)            | Pilkulla erotellut työkalujen nimet, jotka pidetään yksinomaan (sallittujen luettelon tila – katso alta)                                      |
| `DATA_DIR`                              | `~/.omniroute`                             | Heartbeat-tiedosto kirjoitetaan kohteeseen `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                           |

---

## Kuvausten pakkaus

MCP-työkalujen, kehotteiden ja resurssirekisterit voivat pakata kuvauksia rekisteröinnin/listauksen yhteydessä vähentääkseen asiakkaille paljastettua metatietojen jalanjälkeä (ja siten kehotteen kontekstikustannuksia). Toteutus sijaitsee tiedostossa `open-sse/mcp-server/descriptionCompressor.ts` ja on kytketty MCP-palvelimeen `compressMcpRegistryMetadata` -funktion kautta `createMcpServer()` -funktion sisällä.

- Pakkaus suoritetaan kuvaustekstille käyttäen Caveman-sääntöjoukkoa (`getRulesForContext("all", "full")`) säilytetyllä lohkon poiminnalla (koodijaksot, aidatut lohkot jne.), jotta rakenteellinen sisältö ei muutu.
- Kytke käyttöön käyttöönoton mukaan `compression.mcpDescriptionCompressionEnabled` -arvolla `key_value`-asetustaulukossa (oletus: käytössä) – näkyy käyttöliittymässä nimellä **Analytics → MCP description compression**.
- Kytke prosessikohtaisesti joko `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` tai `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Reaaliaikaiset tilastot näkyvät `omniroute_compression_status` -kohdassa `analytics.mcpDescriptionCompression` -otsikon alla ja ne on merkitty tunnisteella `source: "mcp_metadata_estimate"` erottamaan ne todellisista palveluntarjoajan käyttökuitteista.

---

## Työkalujen kardinaliteetin vähentäminen (F4.3)

Kuvausten pakkaus pienentää kunkin työkalun metatietoja; **työkalujen kardinaliteetin vähentäminen** menee askeleen pidemmälle vähentämällä _kuinka monta_ työkalua ylipäätään ilmoitetaan. Harvempien työkalujen mainostaminen `tools/list`-manifestissa vähentää pyyntökohtaista token-kustannusta, jonka asiakkaan malli maksaa työkalukatalogista ("kerroksen 5" pakkaus). Toteutus on puhdas, tilaton suodatin tiedostossa `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), joka on kytketty rekisteröintilooppiin funktiossa `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Valinnainen, oletuksena pois päältä.** Suodatin käynnistyy vain, jos vähintään toinen kahdesta ympäristömuuttujasta on asetettu; jos kumpikaan ei ole asetettu, kaikki 110 työkalua ilmoitetaan muuttumattomina.

| Muuttuja         | Tila                                                                                            |
| :--------------- | :---------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Musta lista — pilkulla eroteltuja työkalunimiä, jotka poistetaan aina `tools/list`-listasta     |
| `MCP_TOOL_ALLOW` | Sallittujen lista — pilkulla eroteltuja työkalunimiä; vain nämä säilyvät, kaikki muu poistetaan |

`deny` on etusijalla `allow`-listaan nähden. Nimet erotellaan pilkulla, ne trimmataan, ja tyhjät merkinnät ohitetaan. Esimerkkejä:

```bash
# Poista kaksi työkalua katalogista
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Ilmoita vain reititys- ja kiintiötyökalut (sallittujen lista -tila)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Miten suodatetut työkalut poistetaan:** rekisteröinti onnistuu aina; profiilin hylkäämä työkalu `.disable()`-oidaan MCP SDK -käsittelijässä, joten se ei koskaan ilmesty `tools/list`-listaan, mutta johdotus pysyy ehjänä (siisti käyttöön/pois käytöstä -kytkentä, ei uudelleenrekisteröintiä). Profiilijäsennin on `readMcpToolProfileFromEnv(process.env)`, joka palauttaa `null` (ei suodatusta), kun molemmat muuttujat ovat tyhjiä.

Rikkaampi `ToolProfile`-muoto `reduceToolManifest`-funktion takana tukee myös laajuuden leikkaussuodatusta (`allowScopes`, `read:*`-tyyppisellä jokerimerkkivastineella) ja determinististä `maxTools`-rajaa, mutta nämä kaksi säätönuppia tarvitsevat täyden manifestin rekisteröintiaikana, eivätkä ne ole **nyt** saatavilla ympäristömuuttujien kautta ( `tools/list`-tason koukku on seurannassa oleva jatkotoimi). `estimateManifestTokens()` on käytettävissä vertaamaan manifestin token-kustannuksia ennen ja jälkeen vähennyksen.

---

## Käyttöaikainen syke

Stdio-kuljetus tallentaa elossaolon tilaa tiedostoon `${DATA_DIR}/runtime/mcp-heartbeat.json` 5 sekunnin välein. Kojelauta (`/api/mcp/status`) lukee tämän tiedoston ja PID:n elossaolon tilan määrittääkseen `online`-tilan. HTTP-kuljetukset raportoivat tilan prosessin sisäisestä `getMcpHttpStatus()`-funktiosta (ei tiedoston kirjoitusta).

Syketilannekuva sisältää:

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

## Tarkastusloki

Jokainen työkalukutsu kirjataan SQLite-tauluun `mcp_tool_audit` tiedoston `open-sse/mcp-server/audit.ts` toimesta:

- Työkalun nimi, argumentit (hajautettu/katkaistu työkalukohtaisen `auditLevel`-tason mukaisesti), tulos
- Kesto millisekunteina, onnistumis-/epäonnistumistunnus, virheilmoitus (tarvittaessa)
- API-avaimen hajautusarvo, aikaleima
- Laajuuden eväämiset kirjataan muodossa `scope_denied:<reason>` puuttuvan laajuuslistan kanssa

Käytä kojelautaa tai `/api/mcp/audit` ja `/api/mcp/audit/stats` REST-päätepisteitä tarkastellaksesi viimeaikaisia kutsuja.

---

## Tiedostot

| Tiedosto                                                                 | Tarkoitus                                                                      |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP-palvelimen tehdas, stdio-sisääntulopiste, rajatut työkalurekisteröinnit    |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + striimattava HTTP-siirto (istunnonhallinta)                              |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Työkalun soveltamisalan arviointi ja kutsujan ratkaisu                         |
| `open-sse/mcp-server/audit.ts`                                           | Työkalukutsujen auditointiloki (`mcp_tool_audit`)                              |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio-sykkeen kirjoittaja (`mcp-heartbeat.json`)                               |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kuvausten pakkaus työkalu- / kehotus- / resurssirekistereille                  |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod-skeemat + työkalurekisteri (MCP_TOOLS, 45 merkintää)                       |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Vaiheen 2 + välimuistin + 1proxy-työkalujen käsittelijät                       |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Pakkaustyökalujen käsittelijät                                                 |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Muistityökalujen määrittelyt (3 työkalua)                                      |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Taitotyökalujen määrittelyt (4 työkalua)                                       |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion-kontekstilähdetyökalujen määrittelyt (6 työkalua)                       |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Pelillistämistyökalujen määrittelyt (8 työkalua)                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Liitännäisten rekisteröinti- ja hallintatyökalut (8 työkalua)                  |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status`-päätepiste                                                   |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools`-päätepiste                                                    |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE-siirtoreitti                                                |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` striimattava HTTP-siirtoreitti                               |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` auditointilokikysely                                          |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` kootut auditointimittarit                               |
| `src/lib/notion/api.ts`                                                  | Notion REST API -asiakas (uudelleenyritys, aikakatkaisu, virheiden luokittelu) |
| `src/lib/db/notion.ts`                                                   | Notion-tunnuksen pysyvyys (`key_value`-taulu)                                  |
| `src/app/api/settings/notion/route.ts`                                   | Notion-asetusten API (GET/POST/DELETE)                                         |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion-tunnusten hallintakäyttöliittymä                                        |
| `tests/unit/notion-api.test.ts`                                          | Notion API -asiakastestit (7)                                                  |
| `tests/unit/notion-tools.test.ts`                                        | Notion-työkalujen soveltamisalan valvontatestit (10)                           |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB -moduulitestit (3)                                                   |
