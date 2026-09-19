# OmniRoute MCP Server Documentation (Suomi)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol -palvelin, jossa on 110 työkalua reititykseen, välimuistiin, pakkaukseen, muistiin, taitoihin, välityspalvelimeen, pooliin, Radariin ja kontekstilähdetoimintoihin.
>
> Ensisijainen totuuden lähde: `open-sse/mcp-server/server.ts` laskee **110 yksilöllistä työkalua** `countUniqueMcpTools()`-funktiolla: 45 kanonista määritelmää (mukaan lukien kuusi CCR-elinkaarityökalua, agenttitaitojen kolmikko, `omniroute_radar_catalog` ja `omniroute_x_search`), sekä muisti (3), taidot (4), GitHub-taidot (3), pooli (6), pelillistäminen (8), liitännäiset (8), Notion (6), Obsidian (22), paikallinen korpus (3) ja kaksi vain RTK:ssa käytettävää pakkaustyökalua.

## Asennus

OmniRoute MCP on sisäänrakennettu. Käynnistä se näin:

```bash
omniroute --mcp
```

Tai open-sse-siirtotavan kautta:

```bash
# Suoratoistettava HTTP-siirtotapa (portti 20130)
omniroute --dev  # MCP käynnistyy automaattisesti /mcp-päätepisteessä
```

HTTP-siirtotavat (`sse` / `streamable-http`, joita hallintapaneelipalvelin tarjoaa prosessin sisällä) ovat
oletusarvoisesti pois käytöstä, ja aiemmin niitä voitiin vaihtaa vain `/dashboard/mcp`-sivulta. Versiosta v3.8.51
alkaen komentorivi tarjoaa samat toiminnot:

```bash
omniroute mcp status                                  # käytössä/verkossa, siirtotapa, työkalujen määrä
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # nollaa aktiiviset sse/streamable-http-istunnot
```

`mcp enable`/`mcp disable` lähettää PATCH-pyynnön samalle `mcpEnabled`-asetukselle (ja valinnaisesti `mcpTransport`-asetukselle),
jota hallintapaneeli vaihtaa `/api/settings`-rajapinnan kautta. `mcp restart` kutsuu päätepistettä `POST /api/mcp/restart`: se sulkee
aktiiviset `sse`/`streamable-http`-istunnot, jotta seuraava pyyntö alustuu puhtaasti, palauttaa
`409`, jos MCP on poistettu käytöstä, ja `501` siirtotavalle `stdio` (stdio-asiakkaat hallitsevat omia
aliprosessejaan — prosessin sisällä ei ole uudelleenkäynnistettävää kahvaa).

## Siirtotavat

MCP-palvelin tarjoaa kolme siirtotapaa, jotka kaikki perustuvat samaan `createMcpServer()`-tehtaaseen:

| Siirtotapa        | Sijainti                                         | Käyttötilanne                                               |
| :---------------- | :----------------------------------------------- | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`                  | IDE-integraatiot (Claude Desktop, Cursor jne.)              |
| `sse`             | `POST/GET /api/mcp/sse` `httpTransport`:n kautta | Selain-/agenttiasiakkaat, jotka tarvitsevat tapahtumavirran |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`                | Usean istunnon HTTP-asiakkaat (`mcp-session-id`-otsake)     |

Aktiivinen HTTP-siirtotapa (`sse` tai `streamable-http`) valitaan `mcpTransport`-asetuksella. Siirtotavan vaihtaminen sulkee toisen siirtotavan olemassa olevat istunnot.

### Etäkäyttö (manage-käyttöalueen ohitus)

`/api/mcp/*` kuuluu LOCAL_ONLY-tasoon (`src/server/authz/routeGuard.ts`) — oletusarvoisesti sitä voivat käyttää vain silmukkaosoitteet (`localhost`, `127.0.0.1`, `::1`). Versiosta v3.8.2 alkaen muut kuin silmukka-asiakkaat voivat muodostaa yhteyden, jos ne lähettävät `Authorization: Bearer <api-key>` -otsakkeen, jonka avaimella on `manage`-käyttöalue. Tämä on ainoa tapa käyttää MCP-etäpalvelinta tunnelin, käänteisen välityspalvelimen tai julkisen isäntänimen kautta.

```bash
# Myönnä manage-käyttöalue: avaa hallintapaneelin API Keys -sivu ja ota käyttöön
# avaimen "Management Access" tai lähetä avainta luotaessa POST-pyynnössä scopes:["manage"].

# Muodosta sitten yhteys MCP-etäasiakkaasta:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Avain, jolla ei ole `manage`-käyttöaluetta (tai pyyntö ilman Bearer-tunnistautumista), palauttaa `403 LOCAL_ONLY`. Rinnakkaista etuliitettä `/api/cli-tools/runtime/*` ei tarkoituksellisesti VOI ohittaa — katso [Route Guard -tasot — manage-käyttöalueen poikkeus](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE-määritykset

Katso ohjeet Claude Desktopin, Cursorin, Clinen ja yhteensopivien MCP-asiakkaiden määrittämiseen kohdasta [MCP-asiakkaan määritykset](../guides/SETUP_GUIDE.md#mcp-client-configuration).

---

## Olennaiset työkalut (14) — Vaihe 1

| Työkalu                         | Käyttöoikeudet        | Kuvaus                                                                                                                                     |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Käyttöaika, muisti, katkaisijat, nopeusrajoitukset ja välimuistitilastot                                                                   |
| `omniroute_list_combos`         | `read:combos`         | Kaikki määritetyt yhdistelmät strategioineen (valinnaiset mittarit)                                                                        |
| `omniroute_get_combo_metrics`   | `read:combos`         | Tietyn yhdistelmän suorituskykymittarit                                                                                                    |
| `omniroute_switch_combo`        | `write:combos`        | Ota yhdistelmä käyttöön tai poista se käytöstä                                                                                             |
| `omniroute_create_combo`        | `write:combos`        | Luo validoitu yhdistelmä olemassa olevan yhdistelmärajapinnan kautta                                                                       |
| `omniroute_check_quota`         | `read:quota`          | Käytetty kokonaiskiintiö, jäljellä oleva prosenttiosuus, nollausaika ja tunnuksen tila                                                     |
| `omniroute_route_request`       | `execute:completions` | Lähetä keskustelun täydennyspyyntö OmniRoute-reitityksen kautta                                                                            |
| `omniroute_cost_report`         | `read:usage`          | Kustannusraportti ajanjaksoittain (istunto/päivä/viikko/kuukausi)                                                                          |
| `omniroute_list_models_catalog` | `read:models`         | Täydellinen malliluettelo ominaisuuksineen, tiloineen ja hintoineen                                                                        |
| `omniroute_radar_catalog`       | `read:radar`          | Paikallinen allekirjoitettu Radar-luettelo; valinnaiset palveluntarjoaja- ja malliperhesuodattimet                                         |
| `omniroute_tool_search`         | `read:tools`          | Etsi työkaluja rekisteröidystä MCP-luettelosta                                                                                             |
| `omniroute_web_search`          | `execute:search`      | Verkkohaku määritettyjen hakupalveluntarjoajien kautta. Ei X/Twitter.                                                                      |
| `omniroute_x_search`            | `execute:search`      | Hae X:stä xAI:n/SuperGrokin kautta tai valitse `xquik-search` Xquik API -tuloksia varten. Edellyttää valitun taustajärjestelmän tunnuksia. |
| `omniroute_web_fetch`           | `execute:search`      | Nouda verkkosisältöä määritettyjen noutopalveluntarjoajien kautta                                                                          |

## Edistyneet työkalut (11) — Vaihe 2

| Työkalu                            | Käyttöoikeudet                       | Kuvaus                                                                                                                                  |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Reitityksen kuiva-ajosimulointi varautumispuulla                                                                                        |
| `omniroute_set_budget_guard`       | `write:budget`                       | Istuntobudjetti, jonka toiminto on laadun alentaminen, estäminen tai hälyttäminen                                                       |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Yhdistelmän strategian päivittäminen ajon aikana (prioriteetti/painotettu/automaattinen jne.)                                           |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Käytä `aggressive`- / `balanced`- / `conservative`-valmismääritystä vikasietoisuudelle                                                  |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Yhdistelmän jokaisen palveluntarjoajan reaaliaikainen testi aidolla ylävirran kutsulla                                                  |
| `omniroute_get_provider_metrics`   | `read:health`                        | Palveluntarjoajakohtaiset mittarit, mukaan lukien p50/p95/p99-viive ja katkaisijan tila                                                 |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Suosittele yhdistelmää tehtävätyypin perusteella budjetti- ja viiverajoitteet huomioiden                                                |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Selitä, miksi pyyntö reititettiin tietylle palveluntarjoajalle (pisteytystekijät + varareitit)                                          |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Istunnon täydellinen tilannekuva: kustannukset, tunnisteet, suosituimmat mallit/palveluntarjoajat, virheet ja budjettisuoja             |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnosoi (ja valinnaisesti korjaa automaattisesti) tietokannan poikkeamat, kuten rikkinäiset yhdistelmäviittaukset ja irralliset rivit |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synkronoi hintatiedot ulkoisista lähteistä (LiteLLM); tukee `dryRun`-tilaa                                                              |

## Välimuistityökalut (2)

| Työkalu                 | Käyttöoikeudet | Kuvaus                                                               |
| :---------------------- | :------------- | :------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`   | Semanttisen välimuistin, kehotevälimuistin ja idempotenssin tilastot |
| `omniroute_cache_flush` | `write:cache`  | Tyhjennä välimuisti yleisesti tai allekirjoituksen/mallin mukaan     |

## Pakkaustyökalut (13)

| Työkalu                             | Käyttöoikeudet      | Kuvaus                                                                                                                               |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Pakkausasetukset, analytiikan yhteenveto ja välimuistitietoiset tilastot (sisältää `analytics.mcpDescriptionCompression`-metatiedot) |
| `omniroute_compression_configure`   | `write:compression` | Määritä pakkaustila, kynnysarvo, tavoitesuhde, järjestelmäkehotteen säilyttäminen ja MCP-kuvausten pakkauksen valitsin               |
| `omniroute_set_compression_engine`  | `write:compression` | Valitse aktiivinen moottori (off/caveman/rtk/stacked) sekä Cavemanin/RTK:n voimakkuus                                                |
| `omniroute_list_compression_combos` | `read:compression`  | Luettele nimetyt pakkausyhdistelmät ja niiden moottoriputket                                                                         |
| `omniroute_compression_combo_stats` | `read:compression`  | Pakkausyhdistelmän ja moottorin mukaan ryhmitelty analytiikka                                                                        |
| `omniroute_ccr_store`               | `write:compression` | Tallenna kutsujakohtaisesti eristetty sisältö rajattuun muistinsisäiseen CCR-säilöön ja palauta merkintä sekä `ccr://`-viite         |
| `omniroute_ccr_retrieve`            | `read:compression`  | Nouda CCR-sisältö kokonaan tai käyttäen alku-, loppu-, rivi-, grep- tai tilastotilaa                                                 |
| `omniroute_ccr_inspect`             | `read:compression`  | Tarkasta kutsujan omistamat CCR-metatiedot palauttamatta sisältöä                                                                    |
| `omniroute_ccr_list`                | `read:compression`  | Luettele kutsujan omistamien CCR-lohkojen sivutetut metatiedot                                                                       |
| `omniroute_ccr_delete`              | `write:compression` | Poista kutsujan omistama CCR-lohko                                                                                                   |
| `omniroute_ccr_stats`               | `read:compression`  | Raportoi kutsujakohtainen muistinkäyttö, elinkaarilaskurit ja säilön rajat                                                           |
| `omniroute_rtk_discover`            | `read:compression`  | Tunnista toistuva kohina erikseen sallituista RTK-tulosten näytteistä                                                                |
| `omniroute_rtk_learn`               | `read:compression`  | Luo tarkastettava RTK-suodatinluonnos erikseen sallituista näytteistä                                                                |

CCR-merkinnät sijaitsevat vain muistissa ja katoavat uudelleenkäynnistyksen yhteydessä. Kukin lohko on rajoitettu 2 MiB:iin, kukin
päämies 16 MiB:iin ja yleinen säilö 64 MiB:iin. Merkintöjen oletusarvoinen TTL on 24 tuntia (enintään
seitsemän päivää). Täysi MCP-nouto on rajoitettu 256 KiB:iin; suuremmat lohkot ovat edelleen käytettävissä
alue- ja grep-tilojen kautta. Tallennus, nouto, luettelointi, tarkastus, poisto ja tilastot eristetään
todennetun API-avaimen päämiehen mukaan. Tarkastuslokit sisältävät tiivisteet ja kokometatiedot, eivät koskaan sisältöä.

`omniroute_compression_status` raportoi MCP-kuvausten pakkauksen erikseen kohdassa
`analytics.mcpDescriptionCompression`. Nämä arvot ovat metatietojen kokoarvioita MCP:n lueteltavissa oleville
kuvauksille (`tools`, `prompts`, `resources` ja `resourceTemplates`); ne eivät ole palveluntarjoajan käyttöä
koskevia tositteita, ja niihin on merkitty `source: "mcp_metadata_estimate"`.

### MCP:n saavutettavuuspuusuodatin (v3.8.0)

Edellä mainituista pakkaustyökaluista erillään OmniRoute sisältää suorituksen jälkeisen suodattimen, joka
pakkaa MCP:n selain- ja saavutettavuustyökalujen **työkalutulokset** ennen niiden palauttamista
agentille. Tämä suodatin ei itsessään ole työkalu — se suoritetaan läpinäkyvästi kaikille työkalutuloksille, jotka sisältävät
monisanaista saavutettavuuspuu- tai selaimen tilannevedostekstiä (≥2 000 merkkiä).

Keskeiset toimintatavat:

- Tiivistää ≥30 peräkkäistä toistuvaa sisarriviä alku- ja loppuosan sisältäväksi yhteenvedoksi
- Säilyttää Playwrightin/tietokonekäytön edellyttämät `[ref=eXX]`-ankkurit
- Katkaisee liian suuren tekstin (>50 000 merkkiä) kiinteästi ja lisää navigointivihjeen
- Odotetut säästöt: **60–80 %** selaimen tilannevedosten hyötykuormissa

Määritys: `compression.mcpAccessibility` yleisissä asetuksissa (migraatio 056).
Toteutus: `open-sse/services/compression/engines/mcpAccessibility/`.
Täydellinen dokumentaatio: [Pakkausmoottorit — MCP:n saavutettavuuspuusuodatin](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Katso näiden työkalujen taustalla oleva ajonaikainen pakkausmalli kohdista [Pakkausmoottorit](../compression/COMPRESSION_ENGINES.md) ja [RTK-pakkaus](../compression/RTK_COMPRESSION.md).

## 1Proxy-työkalut (3)

| Työkalu                     | Käyttöoikeudet | Kuvaus                                                                                                   |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Hae ilmaisia välityspalvelimia 1proxy-markkinapaikasta (protokolla-/maa-/laatu-/määräsuodattimet)        |
| `omniroute_oneproxy_rotate` | `read:proxies` | Hae seuraava käytettävissä oleva välityspalvelin strategian mukaan (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Poolin tilastot, synkronoinnin tila sekä jakauma protokollan ja maan mukaan                              |

## Muistityökalut (3)

Määritetty tiedostossa `open-sse/mcp-server/tools/memoryTools.ts`. Todennus ja käyttöoikeusalueet pakotetaan MCP:n vakiomuotoisen käyttöoikeusalueputken kautta.

| Työkalu                   | Käyttöoikeudet | Kuvaus                                                                                    |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Hae muistoja kyselyn, tyypin tai API-avaimen perusteella tunnistebudjetti huomioiden      |
| `omniroute_memory_add`    | `write:memory` | Lisää uusi muistimerkintä (`factual` / `episodic` / `procedural` / `semantic`)            |
| `omniroute_memory_clear`  | `write:memory` | Tyhjennä API-avaimen muistot, valinnaisesti tyypin tai `olderThan`-aikaleiman perusteella |

## Taitotyökalut (4)

Määritetty tiedostossa `open-sse/mcp-server/tools/skillTools.ts`. Taustalla toimivat `src/lib/skills/registry` ja `src/lib/skills/executor`.

| Työkalu                       | Käyttöoikeudet   | Kuvaus                                                                                                 |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Luettele rekisteröidyt taidot ja suodata niitä valinnaisesti API-avaimen, nimen tai käyttötilan mukaan |
| `omniroute_skills_enable`     | `write:skills`   | Ota tietty taito käyttöön tai poista se käytöstä tunnuksen perusteella                                 |
| `omniroute_skills_execute`    | `execute:skills` | Suorita taito annetulla syötteellä ja palauta suoritustietue                                           |
| `omniroute_skills_executions` | `read:skills`    | Luettele viimeaikainen taitojen suoritushistoria                                                       |

## Notion-kontekstilähde (6)

Määritetty tiedostossa `open-sse/mcp-server/tools/notionTools.ts`. Tunniste tallennetaan `key_value`-tauluun tiedoston `src/lib/db/notion.ts` kautta. REST-asiakasohjelma sijaitsee tiedostossa `src/lib/notion/api.ts`. Asetusten API sijaitsee tiedostossa `src/app/api/settings/notion/route.ts`. Hallintapaneelin käyttöliittymä sijaitsee tiedostossa `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Määritä Notion-integraatiosi tunniste Endpoint-hallintapaneelin **Kontekstilähteet**-välilehdellä tai REST-rajapinnan kautta:

```bash
# Aseta tunniste
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Tarkista tila
curl http://localhost:20128/api/settings/notion

# Katkaise yhteys
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Työkalu                      | Käyttöoikeudet | Kuvaus                                                           |
| :--------------------------- | :------------- | :--------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Tee kokotekstihaku kaikilta sivuilta ja kaikista tietokannoista  |
| `notion_get_page`            | `read:notion`  | Hae sivu tunnuksen perusteella ominaisuuksineen                  |
| `notion_list_block_children` | `read:notion`  | Luettele sivun tai lohkon alilohkot                              |
| `notion_query_database`      | `read:notion`  | Tee tietokantakysely suodattimilla, lajittelulla ja sivutuksella |
| `notion_get_database`        | `read:notion`  | Hae tietokannan skeema tunnuksen perusteella                     |
| `notion_append_blocks`       | `write:notion` | Lisää alilohkoja päälohkoon (enintään 100 pyyntöä kohden)        |

## Agenttitaitojen luettelotyökalut (3)

Määritelty tiedostossa `open-sse/mcp-server/tools/agentSkillTools.ts`. Taustajärjestelmänä toimii `src/lib/agentSkills/catalog`. Nämä työkalut tuovat 45 kohteen Agent Skills -dokumentaatioluettelon MCP-asiakkaiden ja ulkoisten agenttien saataville. Käyttöalue: `read:catalog`.

| Työkalu                           | Käyttöalueet   | Kuvaus                                                                                                                                                    |
| :-------------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Luettelee kaikki 45 agenttitaitoa valinnaisilla `category`- (api\|cli) ja `area`-suodattimilla; palauttaa metatiedot + kattavuuden                        |
| `omniroute_agent_skills_get`      | `read:catalog` | Hakee yhden taidon täydet metatiedot + SKILL.md-sisällön kanonisen `id`-tunnisteen perusteella                                                            |
| `omniroute_agent_skills_coverage` | `read:catalog` | Kattavuustilastot: kuinka monella 23 API-, 21 CLI- ja 1 määritystaidosta on SKILL.md-tiedosto tiedostojärjestelmässä verrattuna luettelon kokonaismääriin |

Katso täydellinen luettelo ja ohjeet siihen, kuinka ulkoiset agentit käyttävät sitä: [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## Liittyvät kehykset (v3.8.0)

Yllä oleva MCP-työkaluvalikoima (110 yksilöllistä työkalua, laskettu funktiolla `countUniqueMcpTools()`) on tarkoituksellisesti
rajattu suorituksenaikaisiin reititys-, välimuisti-, pakkaus-, muisti-, taito-, välityspalvelin- ja kontekstilähdetoimintoihin. Kaksi viereistä
kehystä toimitetaan MCP-palvelimen rinnalla versiossa v3.8.0, ja ne on dokumentoitu erikseen:

### Pilviagentit

Pilviagentit ovat prosessin ulkopuolisia tekoälykoodausagentteja (codex-cloud, cursor-cloud, devin, jules), jotka on yhdistetty
OmniRouteen samalla yhteysmallilla, jota käytetään LLM-palveluntarjoajille. Ne ovat käytettävissä
oman REST-rajapintansa (`/api/v1/agents/*`) kautta, eivätkä ne ole osa MCP-työkaluluetteloa
— pilviagentin kutsuminen ei kuluta MCP-käyttöaluetta.

- Toteutus: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Elinkaari: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentaatio: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Suojaukset

Suojaukset ovat ennen suoritusta ja sen jälkeen käytettäviä suodattimia (vision-bridge, pii-masker, prompt-injection),
joita sovelletaan keskusteluputkessa. Ne suoritetaan ennen MCP-työkalu-/reitityskerroksen saavuttamista
ja lähettävät jäsennellyt rikkomustiedot auditointiputkeen; niitä ei kutsuta MCP-työkaluina.

- Toteutus: `src/lib/guardrails/`.
- Dokumentaatio: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Kun selvität estetyltä vaikuttavan MCP-kutsun vikaa, tarkista sekä MCP-auditointiloki
(`scope_denied:*`-merkinnät) että suojausten auditointijälki — suojaus saattaa hylätä pyynnön
**ennen** kuin se saavuttaa MCP:n käyttöalueiden valvontakerroksen.

---

## REST API -päätepisteet

| Päätepiste             | Menetelmä             | Kuvaus                                                                                                             | Todennus                               |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------------- | :------------------------------------- |
| `/api/mcp/status`      | `GET`                 | Palvelimen tila: syke, HTTP-siirron tila, yhteenveto auditointitoiminnasta                                         | Hallinta (istunto/järjestelmänvalvoja) |
| `/api/mcp/tools`       | `GET`                 | Työkaluluettelo (nimi, kuvaus, käyttöalueet, vaihe, lähdepäätepisteet)                                             | Hallinta                               |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE-siirtopäätepiste (edellyttää `mcpEnabled` + `mcpTransport === "sse"`)                                          | API-avain + käyttöalueet               |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Suoratoistettava HTTP-siirto (käyttää `mcp-session-id`-otsaketta; `DELETE` päättää istunnon)                       | API-avain + käyttöalueet               |
| `/api/mcp/audit`       | `GET`                 | Auditointilokimerkinnät kohteesta `mcp_tool_audit` (suodattimet: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Hallinta                               |
| `/api/mcp/audit/stats` | `GET`                 | Koostetut auditointitilastot (`totalCalls`, `successRate`, `avgDurationMs`, yleisimmät työkalut)                   | Hallinta                               |

Lähdetiedostot: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Sekä SSE- että suoratoistettavat HTTP-siirrot on estetty, kunnes MCP-palvelin otetaan käyttöön asetuksissa (`mcpEnabled`) ja asianmukainen `mcpTransport` valitaan. Jos väärä siirtotapa on määritetty, reitti palauttaa HTTP 400 -vastauksen ja vihjeen asetusten vaihtamisesta.

---

## Todennus ja käyttöoikeusalueet

MCP-työkalut todennetaan API-avaimen käyttöoikeusalueiden avulla. Käyttöoikeusalueiden valvonta on keskitetty tiedostoon
`open-sse/mcp-server/scopeEnforcement.ts`. Kukin työkalu edellyttää tiettyjä käyttöoikeusalueita:

| Käyttöalue            | Työkalut                                                                                                                                                                       |
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

Yleismerkkejä sisältäviä oikeusalueita tuetaan: `read:*` myöntää kaikki lukuoikeusalueet, `*` myöntää täydet käyttöoikeudet.

### `mcp:connect` — rajattu reittioikeus (#7895)

HTTP/SSE MCP -siirtotavan (`/api/mcp/*`) käyttäminen muusta kuin loopback-osoitteesta edellyttää
`/api/mcp/` LOCAL_ONLY -poikkeusta (katso `docs/security/ROUTE_GUARD_TIERS.md`). Aiemmin
tämä poikkeus hyväksyi vain API-avaimen, jolla oli täydet `manage`/`admin`-oikeusalueet — ne olivat liian laajat
kutsujalle, jonka tarvitsee vain viestiä MCP:n kanssa. `src/shared/constants/managementScopes.ts` vie nyt
ulos vakion `MCP_CONNECT_SCOPE = "mcp:connect"`: täydentävän, rajatun oikeusalueen (sama ennakkotapaus kuin
`SELF_USAGE_SCOPE`), joka valtuuttaa VAIN `/api/mcp/`-ohituksen tiedostossa
`src/server/authz/policies/management.ts` — se ei myönnä pääsyä muille hallintareiteille
ja se on tarkoituksella jätetty POIS luettelosta `MANAGEMENT_API_KEY_SCOPES`. Avain, jolla on `manage`/`admin`-oikeusalue,
läpäisee poikkeuksen edelleen muuttumattomasti; `mcp:connect` on vähäisempien oikeuksien vaihtoehto
vain MCP:tä käyttäville etäkutsujille, ja se tarkistetaan funktiolla `hasMcpConnectOrManageScope()`.

### HTTP-oikeusalueiden avainkohtainen sidonta (#7895)

HTTP/SSE:n kautta `open-sse/mcp-server/httpTransport.ts` selvittää nyt kutsujan todelliset
`api_keys.scopes`-arvot funktiolla `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
ja välittää ne MCP SDK:n kutsulle `transport.handleRequest(req, { authInfo })`, joten
jokaiseen työkalukutsuun välittyvä `extra.authInfo.scopes` vastaa Bearer-avaimen omia oikeusalueita.
`scopeEnforcement.ts`-tiedoston `resolveCallerScopeContext()` asetti jo `authInfo`-tiedot
`_meta`-tietojen ja `OMNIROUTE_MCP_SCOPES`-ympäristömuuttujan varamenettelyn edelle — tämä muutos vain täyttää ensimmäisen,
korkeimman prioriteetin lähteen, jota ei aiemmin syötetty HTTP:n kautta. Kun mitään API-avainta ei voida selvittää
(otsake puuttuu tai avain on virheellinen), `authInfo` säilyy arvossa `undefined`, ja selvitys siirtyy
olemassa olevaan `meta`-/ympäristömuuttujaketjuun muuttumattomana. Tämä EI muuta `OMNIROUTE_MCP_ENFORCE_SCOPES`-muuttujan
oletusarvoa — valvonta on edelleen otettava erikseen käyttöön; muutos ainoastaan asettaa
avainkohtaisen polun etusijalle, kun valvonta on käytössä. stdio ei sisällä kutsujakohtaista identiteettiä (katso
`mcpCallerIdentity.ts`), eikä muutos vaikuta siihen — se käyttää edelleen `_meta`-/ympäristömuuttujan varaketjua.

---

## Ympäristömuuttujat

| Muuttuja                                | Oletusarvo                             | Tarkoitus                                                                                                                                                                      |
| :-------------------------------------- | :------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`               | Perus-URL, jota MCP-palvelin käyttää kutsuessaan OmniRouten sisäisiä API-rajapintoja                                                                                           |
| `OMNIROUTE_API_KEY`                     | (tyhjä)                                | API-avain, joka välitetään muodossa `Authorization: Bearer` sisäisiin API-kutsuihin                                                                                            |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (vain `"true"` ottaa käyttöön) | Kun käytössä, puuttuvat käyttöoikeusalueet estävät työkalukutsut ja kirjaavat valvontalokiin merkinnän `scope_denied:<reason>`                                                 |
| `OMNIROUTE_MCP_SCOPES`                  | (tyhjä)                                | Pilkuin eroteltu sallittujen käyttöoikeusalueiden luettelo, joiden katsotaan olevan oletusarvoisesti käytettävissä (käytetään, kun kutsuja ei anna omia käyttöoikeusalueitaan) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (asettamatta = käytössä)               | Kun arvoksi asetetaan `0/false/off/no`, MCP-kuvausten pakkaus poistetaan käytöstä rekisteröinnin yhteydessä                                                                    |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (asettamatta = käytössä)               | Vaihtoehtoinen alias yllä olevalle samalle asetukselle                                                                                                                         |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                | Keskeytyksen aikaraja sisäisille hallintaluvuille (terveys, häiriönsietokyky, yhdistelmät, kiintiö, käyttö)                                                                    |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                | Keskeytyksen aikaraja palveluntarjoajaa odottaville vaiheille (`route_request`, `web_search`, `web_fetch`)                                                                     |
| `MCP_TOOL_DENY`                         | (asettamatta = ei suodatusta)          | Pilkuin erotellut työkalujen nimet, jotka poistetaan kohteesta `tools/list` (työkalujen määrän vähentäminen — katso alta)                                                      |
| `MCP_TOOL_ALLOW`                        | (asettamatta = ei suodatusta)          | Pilkuin erotellut työkalujen nimet, jotka säilytetään yksinomaan (sallittujen luettelon tila — katso alta)                                                                     |
| `DATA_DIR`                              | `~/.omniroute`                         | Heartbeat-tiedosto kirjoitetaan polkuun `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                               |

---

## Kuvausten pakkaus

MCP:n työkalu-, kehote- ja resurssirekisterit voivat pakata kuvaukset rekisteröinnin tai luetteloinnin yhteydessä asiakkaille näkyvän metadatan määrän (ja siten kehotekontekstin kustannusten) pienentämiseksi. Toteutus sijaitsee tiedostossa `open-sse/mcp-server/descriptionCompressor.ts`, ja se on kytketty MCP-palvelimeen funktion `compressMcpRegistryMetadata` kautta funktion `createMcpServer()` sisällä.

- Pakkaus käsittelee kuvaustekstin Caveman-sääntöjoukolla (`getRulesForContext("all", "full")`) käyttäen säilytettävien lohkojen erottelua (koodikatkelmat, aidatut lohkot jne.), jotta rakenteellista sisältöä ei muuteta.
- Ota käyttöön tai poista käytöstä käyttöönottokohtaisesti `key_value`-asetustaulun arvolla `compression.mcpDescriptionCompressionEnabled` (oletus: käytössä) — käyttöliittymässä tämä näkyy nimellä **Analytiikka → MCP-kuvausten pakkaus**.
- Ota käyttöön tai poista käytöstä koko prosessin laajuisesti joko asetuksella `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` tai `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Reaaliaikaiset tilastot näytetään kohteen `omniroute_compression_status` kautta kohdassa `analytics.mcpDescriptionCompression`, ja niihin lisätään tunniste `source: "mcp_metadata_estimate"`, jotta ne voidaan erottaa palveluntarjoajan todellisista käyttökuiteista.

---

## Työkalujen määrän vähentäminen (F4.3)

Kuvausten pakkaaminen pienentää kunkin työkalun metatietoja; **työkalujen määrän vähentäminen** menee askeleen pidemmälle vähentämällä ylipäätään ilmoitettavien työkalujen _määrää_. Kun `tools/list`-manifestissa ilmoitetaan vähemmän työkaluja, asiakkaan mallille työkaluluettelosta aiheutuva pyyntökohtainen token-kustannus pienenee ("tason 5" pakkaus). Toteutus on puhdas, tilaton suodatin tiedostossa `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), ja se on kytketty `createMcpServer()`-funktion rekisteröintisilmukkaan (`open-sse/mcp-server/server.ts`).

**Valinnainen, oletusarvoisesti poissa käytöstä.** Suodatin suoritetaan vain, kun vähintään toinen kahdesta ympäristömuuttujasta on asetettu. Jos kumpaakaan ei ole asetettu, kaikki 110 työkalua ilmoitetaan muuttamattomina.

| Muuttuja         | Tila                                                                                                    |
| :--------------- | :------------------------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | Estolista — pilkuilla erotellut työkalujen nimet, jotka poistetaan aina `tools/list`-luettelosta        |
| `MCP_TOOL_ALLOW` | Sallittujen lista — pilkuilla erotellut työkalujen nimet; vain nämä säilytetään, kaikki muut poistetaan |

`deny` on ensisijainen suhteessa `allow`-asetukseen. Nimet erotellaan pilkuilla, niiden ympäriltä poistetaan välilyönnit ja tyhjät merkinnät ohitetaan. Esimerkkejä:

```bash
# Poista kaksi työkalua luettelosta
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Ilmoita vain reititys- ja kiintiötyökalut (sallittujen listan tila)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Suodatettujen työkalujen poistaminen:** rekisteröinti onnistuu aina. Profiilin hylkäämälle työkalulle kutsutaan tämän jälkeen MCP SDK -kahvan `.disable()`-metodia, joten se ei koskaan näy `tools/list`-luettelossa, mutta kytkennät säilyvät ennallaan (siisti käyttöönotto ja käytöstäpoisto ilman uudelleenrekisteröintiä). Profiilin jäsennin on `readMcpToolProfileFromEnv(process.env)`, joka palauttaa arvon `null` (ei suodatusta), kun molemmat muuttujat ovat tyhjiä.

`reduceToolManifest`-funktion taustalla oleva monipuolisempi `ToolProfile`-rakenne tukee myös käyttöalueiden leikkaukseen perustuvaa suodatusta (`allowScopes`, jossa on `read:*`-tyylinen jokerimerkkivastaavuus) ja determinististä `maxTools`-rajoitusta. Nämä kaksi asetusta tarvitsevat kuitenkin koko manifestin rekisteröinnin aikana, eikä niitä **tällä hetkellä** voi määrittää ympäristömuuttujilla (`tools/list`-tason käsittelijä on seurannassa oleva jatkokehityskohde). `estimateManifestTokens()`-funktiolla voidaan vertailla manifestin token-kustannusta ennen vähennystä ja sen jälkeen.

---

## Suorituksenaikainen elossaolosignaali

stdio-siirtotapa tallentaa elossaolotiedon tiedostoon `${DATA_DIR}/runtime/mcp-heartbeat.json` viiden sekunnin välein. Hallintapaneeli (`/api/mcp/status`) lukee tämän tiedoston ja tarkistaa lisäksi PID-prosessin elossaolon määrittääkseen `online`-tilan. HTTP-siirtotavat ilmoittavat sen sijaan tilan prosessin sisäisen `getMcpHttpStatus()`-funktion kautta (tiedostoon ei kirjoiteta).

Elossaolotilannevedos sisältää seuraavat tiedot:

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

## Valvontalokitus

Jokainen työkalukutsu kirjataan SQLiten `mcp_tool_audit`-tauluun tiedoston `open-sse/mcp-server/audit.ts` toimesta:

- Työkalun nimi, argumentit (tiivistettyinä tai lyhennettyinä työkalukohtaisen `auditLevel`-arvon mukaisesti), tulos
- Kesto millisekunteina, onnistumis- tai epäonnistumismerkintä, virheilmoitus (soveltuvin osin)
- API-avaimen tiiviste, aikaleima
- Käyttöalueiden perusteella tehdyt estot kirjataan muodossa `scope_denied:<reason>` yhdessä puuttuvien käyttöalueiden luettelon kanssa

Tarkastele viimeisimpiä kutsuja hallintapaneelissa tai REST-päätepisteiden `/api/mcp/audit` ja `/api/mcp/audit/stats` kautta.

---

## Tiedostot

| Tiedosto                                                                 | Tarkoitus                                                                              |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP-palvelintehdas, stdio-käynnistyspiste ja käyttöaluekohtaiset työkalurekisteröinnit |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE- ja Streamable HTTP -siirtokerros (istuntojen hallinta)                            |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Työkalujen käyttöalueiden arviointi ja kutsujan selvitys                               |
| `open-sse/mcp-server/audit.ts`                                           | Työkalukutsujen auditointiloki (`mcp_tool_audit`)                                      |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio-sydämenlyöntitiedoston kirjoittaja (`mcp-heartbeat.json`)                        |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kuvausten pakkaus työkalu-, kehote- ja resurssirekistereille                           |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod-skeemat ja työkalurekisteri (`MCP_TOOLS`, 45 merkintää)                            |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Vaiheen 2, välimuistin ja 1proxy-työkalujen käsittelijät                               |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Pakkaustyökalujen käsittelijät                                                         |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Muistityökalujen määritykset (3 työkalua)                                              |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Taitotyökalujen määritykset (4 työkalua)                                               |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion-kontekstilähteen työkalumääritykset (6 työkalua)                                |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Pelillistämistyökalujen määritykset (8 työkalua)                                       |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Liitännäisten rekisteröinti- ja hallintatyökalut (8 työkalua)                          |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status`-päätepiste                                                           |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools`-päätepiste                                                            |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse`-SSE-siirtoreitti                                                        |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream`-Streamable HTTP -siirtoreitti                                        |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit`-auditointilokin kysely                                                |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats`-päätepisteen koostetut auditointimittarit                       |
| `src/lib/notion/api.ts`                                                  | Notion REST API -asiakas (uudelleenyritys, aikakatkaisu, virheluokittelu)              |
| `src/lib/db/notion.ts`                                                   | Notion-tunnuksen säilytys (`key_value`-taulu)                                          |
| `src/app/api/settings/notion/route.ts`                                   | Notion-asetusten API (GET/POST/DELETE)                                                 |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion-tunnuksen hallinnan käyttöliittymä                                              |
| `tests/unit/notion-api.test.ts`                                          | Notion API -asiakkaan testit (7)                                                       |
| `tests/unit/notion-tools.test.ts`                                        | Notion-työkalujen käyttöalueiden valvontatestit (10)                                   |
| `tests/unit/db/notion.test.mjs`                                          | Notion-tietokantamoduulin testit (3)                                                   |
