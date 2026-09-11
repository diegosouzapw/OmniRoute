# MCP-SERVER (Eesti)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

---

title: "OmniRoute MCP serveri dokumentatsioon"
version: 3.8.50
lastUpdated: 2026-08-08
---

# OmniRoute MCP serveri dokumentatsioon

> Model Context Protocol server 110 tööriistaga, mis hõlmavad ruutimist, vahemälu, tihendamist, mälu, oskuseid, puhverserverit, basseini, Radari ja kontekstiallika toiminguid.
>
> Tõe allikas: `open-sse/mcp-server/server.ts` arvutab välja **110 unikaalset tööriista**, kasutades funktsiooni `countUniqueMcpTools()`: 45 kanoonilist definitsiooni (kaasa arvatud kuus CCR eluringi tööriista, agendi oskuste kolmik, `omniroute_radar_catalog` ja `omniroute_x_search`), pluss mälu (3), oskused (4), GitHubi oskused (3), bassein (6), gamifikatsioon (8), pluginad (8), Notion (6), Obsidian (22), lokaalne korpus (3) ja kaks ainult RTK-le kuuluvat tihendustööriista.

## Paigaldamine

OmniRoute MCP on sisseehitatud. Käivita see käsuga:

```bash
omniroute --mcp
```

Või open-sse transpordi kaudu:

```bash
# HTTP voogesitatav transport (port 20130)
omniroute --dev  # MCP käivitub automaatselt /mcp lõpp-punktis
```

## Transpordid

MCP server pakub kolme transporti, mis kõik põhinevad samal `createMcpServer()` tehasel:

| Transport         | Kus                                          | Millal kasutada                                         |
| :---------------- | :------------------------------------------- | :------------------------------------------------------ |
| `stdio`           | `open-sse/mcp-server/server.ts`              | IDE integratsioonid (Claude Desktop, Cursor jne)        |
| `sse`             | `POST/GET /api/mcp/sse` läbi `httpTransport` | Brauseri/agendi kliendid, mis vajavad sündmustevoogu    |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | Mitme sessiooniga HTTP kliendid (`mcp-session-id` päis) |

Aktiivne HTTP transport (`sse` või `streamable-http`) valitakse `mcpTransport` seadistuse alusel. Transportide vahetamine sulgeb olemasolevad sessioonid teisel transpordil.

### Kaugjuurdepääs (haldusõiguse ulatuse möödaminek)

`/api/mcp/*` kuulub LOCAL_ONLY tasemesse (`src/server/authz/routeGuard.ts`) — vaikimisi pääsevad sellele ligi ainult tagasisideühenduse hostid (`localhost`, `127.0.0.1`, `::1`). Alates versioonist v3.8.2 võivad mitte-tagasisideühenduse kliendid ühenduse luua, kui nad esitavad `Authorization: Bearer <api-key>` päise, mille võtmel on `manage` õiguste ulatus. See on ainus viis jõuda kaugjuhitava MCP serverini tunneli, pöördpuhverserveri või avaliku hostinime kaudu.

```bash
# Anna manage õiguste ulatus: ava juhtpaneelil API Keys leht ja lülita
# "Management Access" võtmel sisse, või teosta POST päring scopes:["manage"] loomise ajal.

# Seejärel loo ühendus kaugjuhitavast MCP kliendist:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Ilma haldusõiguseta võtme (või Bearer-i puudumise) korral tagastatakse `403 LOCAL_ONLY`. Kõrvutine tee-eesliide `/api/cli-tools/runtime/*` on tahtlikult NII, et sellest ei saa mööda minna — vaata [Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE seadistamine

Vaata [MCP kliendi seadistamise](../guides/SETUP_GUIDE.md#mcp-client-configuration) juhendit Claude Desktop,
Cursor, Cline ja ühilduvate MCP klientide seadistamiseks.

---

## Olulisimad tööriistad (14) — 1. faas

| Tööriist                        | Õigused               | Kirjeldus                                                                                                                  |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Tööaeg, mälu, katkestuslülitid (circuit breakers), kiiruspiirangud, vahemälu statistika                                    |
| `omniroute_list_combos`         | `read:combos`         | Kõik seadistatud kombod koos strateegiatega (valikuline mõõdikud)                                                          |
| `omniroute_get_combo_metrics`   | `read:combos`         | Konkreetse kombo jõudlusmõõdikud                                                                                           |
| `omniroute_switch_combo`        | `write:combos`        | Kombo aktiveerimine või deaktiveerimine                                                                                    |
| `omniroute_create_combo`        | `write:combos`        | Kinnitatud kombo loomine olemasoleva kombo API kaudu                                                                       |
| `omniroute_check_quota`         | `read:quota`          | Kasutatud/koguhulk kvoot, protsent järelejäänud, taaskäivituse aeg, tokeni tervis                                          |
| `omniroute_route_request`       | `execute:completions` | Vestluse lõpetamise (chat completion) päringu saatmine läbi OmniRoute suunamise                                            |
| `omniroute_cost_report`         | `read:usage`          | Kuluaruanne perioodi kaupa (seanss/päev/nädal/kuu)                                                                         |
| `omniroute_list_models_catalog` | `read:models`         | Täielik mudelikataloog koos võimaluste, olekute ja hindadega                                                               |
| `omniroute_radar_catalog`       | `read:radar`          | Lokaalne allkirjastatud Radar kataloog; valikulised pakkuja/perekonna filtrid                                              |
| `omniroute_tool_search`         | `read:tools`          | Tööriistade avastamine registreeritud MCP kataloogist                                                                      |
| `omniroute_web_search`          | `execute:search`      | Veebiotsing seadistatud otsingupakkujate kaudu. Ei hõlma X/Twitterit.                                                      |
| `omniroute_x_search`            | `execute:search`      | X-i otsimine xAI/SuperGrok kaudu, või vali `xquik-search` Xquik API tulemuste jaoks. Vajab valitud tagaosa jaoks mandaate. |
| `omniroute_web_fetch`           | `execute:search`      | Veebisisu toomine seadistatud toomispakkujate kaudu                                                                        |

## Täiustatud tööriistad (11) — Faas 2

| Tööriist                           | Õigused                              | Kirjeldus                                                                                                        |
| :--------------------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Kuivkäivituse ruutimissimulatsioon koos varuahelaga (fallback tree)                                              |
| `omniroute_set_budget_guard`       | `write:budget`                       | Seansi eelarvekaitse degradeerimis-/blokeerimis-/hoiatustegevusega                                               |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Kombo strateegia värskendamine käitusajal (priority/weighted/auto/jne.)                                          |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` vastupidavuse eelseadistuse rakendamine                               |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Kombo kõikide pakkujate reaalajaline testimine tegeliku ülesvoolu (upstream) kõne abil                           |
| `omniroute_get_provider_metrics`   | `read:health`                        | Pakkuja-põhised meetrikud koos p50/p95/p99 latentsuse ja katkestaja (circuit breaker) olekuga                    |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Kombo soovitus ülesande tüübi järgi eelarve/latentsuse piirangutega                                              |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Selgitab, miks päring suunati konkreetsele pakkujale (skoorimistegurid + varuvõimalused)                         |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Täielik seansi ülevaade: maksumus, tokenid, populaarsemad mudelid/pakkujad, vead, eelarvekaitse                  |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnoosib (ja soovi korral parandab automaatselt) andmebaasi nihkeid, nagu katkised kombo-viited / orbrittiread |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sünkroonib hinnaandmed välistest allikatest (LiteLLM); toetab `dryRun`                                           |

## Vahemälu tööriistad (2)

| Tööriist                | Õigused       | Kirjeldus                                                        |
| :---------------------- | :------------ | :--------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Semantilise vahemälu, viipavahemälu ja idempotentsuse statistika |
| `omniroute_cache_flush` | `write:cache` | Vahemälu tühjendamine globaalselt või signatuuri/mudeli järgi    |

## Tihendamise tööriistad (13)

| Tööriist                            | Õigused             | Kirjeldus                                                                                                                            |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Tihendamise seaded, analüütika kokkuvõte ja vahemälu-teadlik statistika (sisaldab `analytics.mcpDescriptionCompression` metaandmeid) |
| `omniroute_compression_configure`   | `write:compression` | Konfigureerib tihendusrežiimi, läve, sihttihendussuhte, süsteemiviipa säilitamise, MCP kirjelduse tihenduse lüliti                   |
| `omniroute_set_compression_engine`  | `write:compression` | Aktiivse mootori valik (off/caveman/rtk/stacked) ja Caveman/RTK intensiivsus                                                         |
| `omniroute_list_compression_combos` | `read:compression`  | Loetleb nimetatud tihenduskombod ja nende mootorite töövood                                                                          |
| `omniroute_compression_combo_stats` | `read:compression`  | Analüütika, mis on grupeeritud tihenduskombo ja mootori järgi                                                                        |
| `omniroute_ccr_store`               | `write:compression` | Salvestab kutsuja-isoleeritud sisu piiratud mahulise mällu sees olevasse CCR-hoidlasse ja tagastab markeri koos `ccr://` viitega     |
| `omniroute_ccr_retrieve`            | `read:compression`  | Toob CCR sisu tervikuna või päise, saba, ridade, grep- ja statistikarežiimides                                                       |
| `omniroute_ccr_inspect`             | `read:compression`  | Vaatab kutsujale kuuluvaid CCR metaandmeid, tagastamata sisu                                                                         |
| `omniroute_ccr_list`                | `read:compression`  | Loetleb kutsujale kuuluvate CCR-plokkide metaandmed lehekülgede kaupa                                                                |
| `omniroute_ccr_delete`              | `write:compression` | Kustutab kutsujale kuuluva CCR-ploki                                                                                                 |
| `omniroute_ccr_stats`               | `read:compression`  | Annab teada kutsuja-põhise mälukasutuse, elutsükli loendurid ja hoidla piirangud                                                     |
| `omniroute_rtk_discover`            | `read:compression`  | Avastab korduvat müra vabatahtlikult esitatud RTK väljundnäidistest                                                                  |
| `omniroute_rtk_learn`               | `read:compression`  | Loob ülevaatamiseks mõeldud RTK filtri mustandi vabatahtlikult esitatud näidistest                                                   |

CCR kirjed asuvad ainult mälus ja kaovad taaskäivitamisel. Iga plokk on piiratud 2 MiB-ga, iga
printsiip 16 MiB-ga ja globaalne hoidla 64 MiB-ga. Kirjete vaikimisi eluiga (TTL) on 24 tundi (maksimaalselt
seitse päeva). Täielik MCP toomine on piiratud 256 KiB-ga; suuremad plokid jäävad kättesaadavaks
piiratud vahemiku ja grep-režiimide kaudu. Salvestamine, toomine, loetlemine, kontrollimine, kustutamine ja statistika on
isoleeritud autenditud API-võtme printsiibi järgi. Auditkirjed sisaldavad räsisid ja suurusandmeid, mitte kunagi sisu.

`omniroute_compression_status` esitab MCP kirjelduse tihenduse eraldi
`analytics.mcpDescriptionCompression` all. Need väärtused on metaandmete suuruse hinnangud MCP loetletavate
kirjelduste jaoks (`tools`, `prompts`, `resources` ja `resourceTemplates`); need ei ole pakkuja kasutuse
kviitungid ja on märgistatud kui `source: "mcp_metadata_estimate"`.

### MCP ligipääsetavuspuu filter (v3.8.0)

Eraldiseisvalt ülalkirjeldatud tihendustööriistadest sisaldab OmniRoute käitusjärgset filtrit, mis
tihendab MCP brauseri/ligipääsetavuse tööriistade **tulemusi** enne nende tagastamist agendile. See
filter ei ole iseenesest tööriist — see töötab läbipaistvalt igal tööriistatulemusel, mis sisaldab
paljusõnalist ligipääsetavuspuu- või brauserimomenttõmmise teksti (≥2000 tähemärki).

Peamised käitumisomadused:

- Ahendab ≥30 järjestikust korduvat vennalise-elemendi rida päise- ja sabakokkuvõtteks
- Säilitab `[ref=eXX]` ankrud, mida Playwright/computer-use vajab
- Tükeldab liigsuured tekstid (>50 000 tähemärki) navigeerimisvihjega
- Eeldatav kokkuhoid: **60–80%** brauseri momenttõmmiste kasuliku koormuse osas

Konfiguratsioon: `compression.mcpAccessibility` globaalsetes seadetes (migratsioon 056).
Rakendus: `open-sse/services/compression/engines/mcpAccessibility/`.
Täielik dokumentatsioon: [Tihendusmootorid — MCP ligipääsetavuspuu filter](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Vaata [Tihendusmootorid](../compression/COMPRESSION_ENGINES.md) ja [RTK tihendamine](../compression/RTK_COMPRESSION.md), et
mõista neid tööriistu toetavat käitusaegset tihendusmudelit.

## 1Proxy tööriistad (3)

| Tööriist                    | Ulatused       | Kirjeldus                                                                                      |
| :-------------------------- | :------------- | :--------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Toob tasuta puhverserverid 1proxy turuplatsist (protokolli/riigi/kvaliteedi/limiidi filtrid)   |
| `omniroute_oneproxy_rotate` | `read:proxies` | Toob järgmise saadaoleva puhverserveri strateegia (`random` / `quality` / `sequential`) alusel |
| `omniroute_oneproxy_stats`  | `read:proxies` | Pooli statistika, sünkroonimise olek, jaotus protokolli ja riigi kaupa                         |

## Mälu tööriistad (3)

Defineeritud failis `open-sse/mcp-server/tools/memoryTools.ts`. Autentimine/ulatus jõustatakse standardse MCP ulatuse (scope) toru abil.

| Tööriist                  | Ulatused       | Kirjeldus                                                                                       |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Otsi mälukirjeid päringu / tüübi / API-võtme alusel, jõustades märgieelarve (token-budget)      |
| `omniroute_memory_add`    | `write:memory` | Lisa uus mälukirje (`factual` / `episodic` / `procedural` / `semantic`)                         |
| `omniroute_memory_clear`  | `write:memory` | Kustuta API-võtme mälukirjed, valikuliselt filtreerituna tüübi või `olderThan` ajatempli alusel |

## Oskuste tööriistad (4)

Defineeritud failis `open-sse/mcp-server/tools/skillTools.ts`. Toetub `src/lib/skills/registry` + `src/lib/skills/executor` peale.

| Tööriist                      | Ulatused         | Kirjeldus                                                                                          |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Loetle registreeritud oskused, valikuliselt filtreerituna API-võtme, nime või lubatud oleku alusel |
| `omniroute_skills_enable`     | `write:skills`   | Luba või keela konkreetne oskus ID alusel                                                          |
| `omniroute_skills_execute`    | `execute:skills` | Käivita oskus etteantud sisendiga ja tagasta täitmise kirje                                        |
| `omniroute_skills_executions` | `read:skills`    | Loetle viimane oskuste täitmise ajalugu                                                            |

## Notioni kontekstiallikas (6)

Defineeritud failis `open-sse/mcp-server/tools/notionTools.ts`. Token salvestatakse `key_value` tabelis failis `src/lib/db/notion.ts` kaudu. REST klient on failis `src/lib/notion/api.ts`. Seadete API asub failis `src/app/api/settings/notion/route.ts`. Töölaua kasutajaliides asub failis `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Seadista oma Notioni integratsiooni token **Context Sources** vahekaardilt Endpoint töölaual, või REST API kaudu:

```bash
# Sea token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Kontrolli olekut
curl http://localhost:20128/api/settings/notion

# Katkesta ühendus
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Tööriist                     | Ulatused       | Kirjeldus                                                            |
| :--------------------------- | :------------- | :------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Täistekstiotsing kõikidest lehtedest ja andmebaasidest               |
| `notion_get_page`            | `read:notion`  | Lehe hankimine ID alusel koos selle atribuutidega                    |
| `notion_list_block_children` | `read:notion`  | Lehe või ploki alamplokkide loetlemine                               |
| `notion_query_database`      | `read:notion`  | Andmebaasi päring filtrite, sortimise ja lehekülgede kaupa jaotusega |
| `notion_get_database`        | `read:notion`  | Andmebaasi skeemi hankimine ID alusel                                |
| `notion_append_blocks`       | `write:notion` | Alamplokkide lisamine emaplokile (maksimaalselt 100 päringu kohta)   |

## Agendioskuste kataloogi tööriistad (3)

Defineeritud failis `open-sse/mcp-server/tools/agentSkillTools.ts`. Töötab `src/lib/agentSkills/catalog` toel. Need tööriistad avavad 45-kirjelise Agendioskuste dokumentatsiooni kataloogi MCP klientidele ja välistele agentidele. Ulatus: `read:catalog`.

| Tööriist                          | Ulatused       | Kirjeldus                                                                                                                                       |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Loetleb kõik 45 agendioskust valikuliste `category` (api\|cli) ja `area` filtritega; tagastab metaandmed + katvuse                              |
| `omniroute_agent_skills_get`      | `read:catalog` | Hangib ühe oskuse täieliku metaandmestiku + SKILL.md sisu kanoonilise `id` järgi                                                                |
| `omniroute_agent_skills_coverage` | `read:catalog` | Katvuse statistika: kui paljudel 23 API, 21 CLI ja 1 konfiguratsiooni oskusest on failisüsteemis SKILL.md failid võrreldes kataloogi koguarvuga |

Vaata [AGENT-SKILLS.md](./AGENT-SKILLS.md) täielikku kataloogi ja seda, kuidas välised agendid seda kasutavad.

## Seotud raamistikud (v3.8.0)

Eelpool toodud MCP tööriistade nimekiri (110 unikaalset tööriista, arvutatud funktsiooniga `countUniqueMcpTools()`) on tahtlikult
piiratud käitusaegse ruutimise/vahemälu/tihendamise/mälu/oskuste/proksi/kontekstiallika toimingutega. Kaks kõrvutist
raamistikku käivad MCP serveriga kaasas versioonis v3.8.0 ning on dokumenteeritud eraldi:

### Pilveagendid

Pilveagendid on protsessivälised AI koodiagendid (codex-cloud, cursor-cloud, devin, jules), mis on ühendatud
OmniRoute'iga sama ühendusmudeli kaudu, mida kasutatakse LLM pakkujate puhul. Need on eksponeeritud
oma REST liidese kaudu (`/api/v1/agents/*`) ja **ei** ole MCP tööriistade kataloogi osa
— Pilveagendi kutsumine ei tarbi MCP ulatust.

- Rakendus: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Elutsükkel: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentatsioon: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Kaitsepiirded (Guardrails)

Kaitsepiirded on enne/pärast-täitmise filtrid (vision-bridge, pii-masker, prompt-injection),
mida rakendatakse vestlusahela sees. Need töötavad enne, kui jõutakse MCP tööriista/marsruudi kihini,
ja saadavad struktureeritud rikkumised auditi ahelasse; neid ei kutsuta MCP tööriistadena.

- Rakendus: `src/lib/guardrails/`.
- Dokumentatsioon: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Kui silud MCP kutsungit, mis tundub blokeerituna, kontrolli nii MCP auditi logi
(`scope_denied:*` kirjed) kui ka kaitsepiirete auditi rada — päring võidakse tagasi lükata
kaitsepiirde poolt **enne**, kui see jõuab kunagi MCP ulatuse jõustamise kihini.

---

## REST API lõpp-punktid

| Lõpp-punkt             | Meetod                | Kirjeldus                                                                                                | Autentimine                    |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------- | :----------------------------- |
| `/api/mcp/status`      | `GET`                 | Serveri olek: südamelöök, HTTP transpordi seisund, auditi tegevuse kokkuvõte                             | Haldus (seanss/administraator) |
| `/api/mcp/tools`       | `GET`                 | Tööriistade kataloog (nimi, kirjeldus, ulatused, faas, allika lõpp-punktid)                              | Haldus                         |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transpordi lõpp-punkt (piiratud `mcpEnabled` + `mcpTransport === "sse"` kaudu)                       | API võti + ulatused            |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Voogesitatav HTTP transport (kasutab `mcp-session-id` päist; `DELETE` lõpetab seansi)                    | API võti + ulatused            |
| `/api/mcp/audit`       | `GET`                 | Auditi logi kirjed tabelist `mcp_tool_audit` (filtrid: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Haldus                         |
| `/api/mcp/audit/stats` | `GET`                 | Koondatud auditi statistika (`totalCalls`, `successRate`, `avgDurationMs`, populaarseimad tööriistad)    | Haldus                         |

Lähtefailid: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Nii SSE kui ka Voogesitatava HTTP transpordi kasutamine on blokeeritud, kuni MCP server on Seadetes lubatud (`mcpEnabled`) ja on valitud sobiv `mcpTransport`. Kui vale transport on konfigureeritud, tagastab marsruut HTTP 400 vea koos vihjega seadete muutmiseks.

---

## Autentimine ja õigused (scopes)

MCP tööriistad autenditakse API võtme õiguste (scopes) kaudu. Õiguste jõustamine on tsentraliseeritud
failis `open-sse/mcp-server/scopeEnforcement.ts`. Igal tööriistal on vaja konkreetseid õigusi:

| Õigus                 | Tööriistad                                                                                                                                                                         |
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
| `read:obsidian`       | 13 lugemistööriista — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 kirjutustööriista — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                  |

Toetatud on metamärgiga (wildcard) õigused: `read:*` annab kõik lugemisõigused, `*` annab täisligipääsu.

### `mcp:connect` — kitsas ruuteerimisõigus (#7895)

HTTP/SSE MCP transpordile (`/api/mcp/*`) pääsemine mitte-loopback päringutest eeldab
`/api/mcp/` LOCAL_ONLY erandit (vaata `docs/security/ROUTE_GUARD_TIERS.md`). Ajalooliselt
aktsepteeris see erand ainult täieliku `manage`/`admin`-õigusega API võtit — see oli liiga
lai kutsujale, kes vajab ainult MCP-ga suhtlemist. `src/shared/constants/managementScopes.ts`
ekspordib nüüd `MCP_CONNECT_SCOPE = "mcp:connect"`: täiendava, kitsa õiguse (samal
eeskujul kui `SELF_USAGE_SCOPE`), mis lubab AINULT `/api/mcp/` erandit failis
`src/server/authz/policies/management.ts` — see ei annavastu muid haldusteede ligipääsu
õigusi ja on teadlikult jäetud VÄLJA `MANAGEMENT_API_KEY_SCOPES`-st. Võti, millel on
`manage`/`admin`, läbib erandi endiselt muutumatult; `mcp:connect` on madalama õigusega
alternatiiv kaugetele, ainult MCP-le suunatud kutsujatele, mida kontrollitakse
funktsiooniga `hasMcpConnectOrManageScope()`.

### Võtmepõhine HTTP õiguste seondamine (#7895)

HTTP/SSE kaudu lahendab `open-sse/mcp-server/httpTransport.ts` nüüd kutsuja tegelikud
`api_keys.scopes` funktsiooniga `resolveMcpCallerAuthInfo()`
(`open-sse/mcp-server/httpAuthContext.ts`) ja edastab need MCP SDK
funktsioonile `transport.handleRequest(req, { authInfo })`, nii et
`extra.authInfo.scopes`, mis jõuab igasse tööriistakutsesse, peegeldab Bearer-võtme
enda õigusi. Fail `scopeEnforcement.ts` funktsioon `resolveCallerScopeContext()` andis
juba varem `authInfo`-le eelisõiguse `_meta` ja `OMNIROUTE_MCP_SCOPES` keskkonnamuutuja
varulahenduse ees — see muudatus lihtsalt täidab selle esimese, kõrgeima prioriteediga
allika, mis oli varem HTTP kaudu tühjalt jäänud. Kui ühtegi API võtit ei õnnestu
lahendada (päist puudub või võti on kehtetu), jääb `authInfo` väärtuseks `undefined` ja
lahendus liigub olemasolevasse `meta`/keskkonnamuutuja ahelasse muutumatult. See EI
muuda `OMNIROUTE_MCP_ENFORCE_SCOPES` vaikeväärtust — jõustamine tuleb endiselt eraldi
sisse lülitada; see muudatus tagab vaid, et võtmepõhine tee saab eelisõiguse, kui see
juba sisse lülitatud on. stdio-l puudub kutsujapõhine identiteet (vaata
`mcpCallerIdentity.ts`) ja see jääb mõjutamata — see jääb `_meta`/keskkonnamuutuja
varulahenduse ahelale.

---

## Keskkonnamuutujad

| Muutuja                                 | Vaikeväärtus                          | Eesmärk                                                                                                                               |
| :-------------------------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`              | Baas-URL, mida MCP server kasutab OmniRoute sisemiste API-de kutsumisel                                                               |
| `OMNIROUTE_API_KEY`                     | (tühi)                                | API-võti, mis edastatakse sisemistele API-kõnedele kui `Authorization: Bearer`                                                        |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (ainult `"true"` lubab selle) | Kui lubatud, keelavad puuduvad õigused (scope) tööriista kutsed ning logitakse `scope_denied:<reason>` auditlogisse                   |
| `OMNIROUTE_MCP_SCOPES`                  | (tühi)                                | Komadega eraldatud lubatud õiguste (scope) nimekiri, mida peetakse vaikimisi "saadavaks" (kasutusel, kui kutsuja ei esita omi õigusi) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (määramata = sees)                    | Kui väärtuseks on määratud `0/false/off/no`, lülitab registreerimise ajal MCP kirjelduste tihendamise välja                           |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (määramata = sees)                    | Alternatiivne nimi samale lülitile kui ülal                                                                                           |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                               | Katkestamise ajapiirang sisemiste haldusandmete lugemiseks (health, resilience, combos, quota, usage)                                 |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                               | Katkestamise ajapiirang hüpetele, mis ootavad teenusepakkujat (`route_request`, `web_search`, `web_fetch`)                            |
| `MCP_TOOL_DENY`                         | (määramata = filtreerimist ei toimu)  | Komadega eraldatud tööriistade nimed, mis jäetakse `tools/list` loendist välja (tööriistade arvu vähendamine — vaata allpool)         |
| `MCP_TOOL_ALLOW`                        | (määramata = filtreerimist ei toimu)  | Komadega eraldatud tööriistade nimed, mida ainsana säilitatakse (lubatud nimekirja režiim — vaata allpool)                            |
| `DATA_DIR`                              | `~/.omniroute`                        | Südamelöögi (heartbeat) fail kirjutatakse asukohta `${DATA_DIR}/runtime/mcp-heartbeat.json`                                           |

---

## Kirjelduste tihendamine

MCP tööriistade, promptide ja ressursside registrid saavad registreerimise/loendamise ajal kirjeldusi tihendada, et vähendada klientidele avaldatavate metaandmete mahtu (ja seega prompti konteksti maksumust). Teostus asub failis `open-sse/mcp-server/descriptionCompressor.ts` ning on MCP serverisse ühendatud funktsiooni `compressMcpRegistryMetadata` abil, mis kutsutakse `createMcpServer()` sees.

- Tihendamine töötleb kirjeldusteksti, kasutades Caveman reeglistikku (`getRulesForContext("all", "full")`), koos säilitatavate blokkide eraldamisega (kooditükid, piiratud plokid jne), et struktuurset sisu ei muudetaks.
- Lülita seadistuse kaupa sisse/välja `key_value` seadistuste tabeli väärtusega `compression.mcpDescriptionCompressionEnabled` (vaikimisi: lubatud) — kasutajaliideses näidatud kui **Analytics → MCP description compression**.
- Lülita protsessi tasemel sisse/välja kasutades `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` või `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Reaalajastatistika kuvatakse `omniroute_compression_status` alt teekonnal `analytics.mcpDescriptionCompression` ja on märgistatud sildiga `source: "mcp_metadata_estimate"`, et eristada seda päris teenusepakkuja kasutuse andmetest.

---

## Tööriistade arvukuse vähendamine (F4.3)

Kirjelduse tihendamine kahandab iga tööriista metaandmeid; **tööriistade arvukuse vähendamine** läheb sammu kaugemale, vähendades, _mitu_ tööriista üldse teatavaks tehakse. Vähemate tööriistade reklaamimine `tools/list` manifestis kärbib kliendi mudeli poolt tööriistakataloogi eest makstavat token-maksumust päringu kohta ("kihi 5" tihendus). Realisatsioon on puhas, olekuta filter failis `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), mis on ühendatud registreerimistsükliga `createMcpServer()`-is (`open-sse/mcp-server/server.ts`).

**Sisselülitatav, vaikimisi väljas.** Filter töötab ainult siis, kui vähemalt üks kahest keskkonnamuutujast on seatud; kui mitte kumbki ei ole seatud, teatatakse kõik 110 tööriista muutmata kujul.

| Muutuja          | Režiim                                                                                              |
| :--------------- | :-------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Nimekirja keeld — komadega eraldatud tööriistanimed, mis alati eemaldatakse `tools/list`-ist        |
| `MCP_TOOL_ALLOW` | Lubatavate nimekiri — komadega eraldatud tööriistanimed; ainult need jäävad, ülejäänud eemaldatakse |

`deny` on prioriteetsem kui `allow`. Nimed on komadega eraldatud, trimmitud, ja tühjad kirjed eiratakse. Näited:

```bash
# Eemalda kataloogist kaks tööriista
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Teata ainult ruutimise + kvoodi tööriistad (lubatavate nimekirja režiim)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Kuidas filtreeritud tööriistad eemaldatakse:** registreerimine õnnestub alati; tööriist, mille profiil tagasi lükkab, seejärel `.disable()`itakse MCP SDK käepidemel, nii et see ei ilmu kunagi `tools/list`-is, kuid ühendus jääb terveks (puhas lubamine/keelamine, pole vajadust uuesti registreerida). Profiili parser on `readMcpToolProfileFromEnv(process.env)`, mis tagastab `null` (filtreerimist ei toimu), kui mõlemad muutujad on tühjad.

Rikkalikum `ToolProfile` kuju `reduceToolManifest` taga toetab ka ulatuse-ühisosa filtreerimist (`allowScopes`, `read:*`-stiilis metamärgi vastavusega) ja deterministlikku `maxTools` ülemmäära, kuid need kaks lülitit vajavad registreerimise ajal täielikku manifesti ja need **ei ole** täna keskkonnamuutujate kaudu kättesaadavad (`tools/list`-tasandi konks on jälgitav järeltegevus). `estimateManifestTokens()` on saadaval manifesti token-maksumuse võrdlemiseks enne ja pärast vähendamist.

---

## Käitusaja südamelöök (Heartbeat)

Stdio transport salvestab elushoidmise andmed faili `${DATA_DIR}/runtime/mcp-heartbeat.json` iga 5 sekundi järel. Töölaud (`/api/mcp/status`) loeb seda faili ja PID-i elushoidmise andmeid, tuletamaks `online` väärtust. HTTP transportid raporteerivad olekut protsessisisesest `getMcpHttpStatus()`-ist (faili ei kirjutata).

Südamelöögi hetktõmmis sisaldab:

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

## Auditi logimine

Iga tööriistakõne logitakse SQLite `mcp_tool_audit` tabelisse faili `open-sse/mcp-server/audit.ts` poolt:

- Tööriista nimi, argumendid (räsitud/kärbitud vastavalt tööriistapõhisele `auditLevel`-ile), tulemus
- Kestus millisekundites, õnnestumise/ebaõnnestumise lipp, veateade (kui asjakohane)
- API võtme räsi, ajatempel
- Ulatuse keeldumised logitakse kujul `scope_denied:<põhjus>` koos puuduvate ulatuste loendiga

Kasuta töölauda või `/api/mcp/audit` ja `/api/mcp/audit/stats` REST lõpp-punkte, et vaadata viimaseid kõnesid.

---

## Failid

| Fail                                                                     | Otstarve                                                                                 |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP serveri tehas, stdio sisenemispunkt, piiratud ulatusega tööriistade registreerimised |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transport (seansihaldus)                                           |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Tööriista ulatuse hindamine ja kutsuja lahendamine                                       |
| `open-sse/mcp-server/audit.ts`                                           | Tööriistakutsete auditilogimine (`mcp_tool_audit`)                                       |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio südamelöögi kirjutaja (`mcp-heartbeat.json`)                                       |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kirjelduste tihendamine tööriistade / promptide / ressursside registrites                |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod skeemid + tööriistade register (`MCP_TOOLS`, 45 kirjet)                              |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 2. faasi + vahemälu + 1proxy tööriistade käitlejad                                       |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Tihendustööriistade käitlejad                                                            |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Mälutööriistade definitsioonid (3 tööriista)                                             |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Oskustööriistade definitsioonid (4 tööriista)                                            |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notioni kontekstiallika tööriistade definitsioonid (6 tööriista)                         |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Mängustamise tööriistade definitsioonid (8 tööriista)                                    |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Pluginate registreerimise ja haldamise tööriistad (8 tööriista)                          |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` lõpp-punkt                                                             |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` lõpp-punkt                                                              |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE transpordi tee                                                        |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP transpordi tee                                         |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` auditilogi päring                                                       |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` koondatud auditimõõdikud                                          |
| `src/lib/notion/api.ts`                                                  | Notioni REST API klient (uuesti proovimine, ajapiirang, veaklassifikatsioon)             |
| `src/lib/db/notion.ts`                                                   | Notioni tokeni püsisalvestus (`key_value` tabel)                                         |
| `src/app/api/settings/notion/route.ts`                                   | Notioni seadete API (GET/POST/DELETE)                                                    |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notioni tokeni haldamise kasutajaliides                                                  |
| `tests/unit/notion-api.test.ts`                                          | Notioni API kliendi testid (7)                                                           |
| `tests/unit/notion-tools.test.ts`                                        | Notioni tööriistade ulatuse jõustamise testid (10)                                       |
| `tests/unit/db/notion.test.mjs`                                          | Notioni andmebaasi mooduli testid (3)                                                    |
