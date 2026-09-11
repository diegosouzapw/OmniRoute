# MCP-SERVER (Latviešu)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

---

title: "OmniRoute MCP servera dokumentācija"
version: 3.8.50
lastUpdated: 2026-08-08
---

# OmniRoute MCP servera dokumentācija

> Model Context Protocol serveris ar 110 rīkiem maršrutēšanas, kešatmiņas, saspiešanas, atmiņas, prasmju, starpniekservera, kopuma, Radar un konteksta avotu darbībām.
>
> Patiesais avots: `open-sse/mcp-server/server.ts` aprēķina **110 unikālus rīkus**, izmantojot `countUniqueMcpTools()`: 45 kanoniskas definīcijas (tostarp sešus CCR dzīves cikla rīkus, aģentu prasmju trijnieku, `omniroute_radar_catalog` un `omniroute_x_search`), kā arī memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), local corpus (3) un divus tikai RTK paredzētus saspiešanas rīkus.

## Instalēšana

OmniRoute MCP ir iebūvēts. Palaidiet to ar:

```bash
omniroute --mcp
```

Vai, izmantojot open-sse transportu:

```bash
# HTTP straumējams transports (ports 20130)
omniroute --dev  # MCP automātiski tiek palaists /mcp galapunktā
```

## Transporti

MCP serveris nodrošina trīs transportus, kas visi izmanto vienu un to pašu `createMcpServer()` rūpnīcu:

| Transports        | Atrašanās vieta                             | Kad izmantot                                                           |
| :---------------- | :------------------------------------------ | :--------------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE integrācijām (Claude Desktop, Cursor u. c.)                        |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | Pārlūkprogrammu/aģentu klientiem, kuriem nepieciešama notikumu straume |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | HTTP klientiem ar vairākām sesijām (`mcp-session-id` galvene)          |

Aktīvo HTTP transportu (`sse` vai `streamable-http`) izvēlas `mcpTransport` iestatījums. Pārslēdzot transportu, esošās sesijas otrā transportā tiek aizvērtas.

### Attālā piekļuve (manage tvēruma apiešana)

`/api/mcp/*` atrodas LOCAL_ONLY līmenī (`src/server/authz/routeGuard.ts`) — pēc noklusējuma tam var piekļūt tikai cilpas resursdatori (`localhost`, `127.0.0.1`, `::1`). Sākot ar v3.8.2, klienti, kas nav cilpas resursdatori, var izveidot savienojumu, ja tie nosūta `Authorization: Bearer <api-key>`, kura atslēgai ir `manage` tvērums. Tas ir vienīgais veids, kā piekļūt attālajam MCP serverim, izmantojot tuneli, reverso starpniekserveri vai publisku resursdatora nosaukumu.

```bash
# Piešķiriet manage tvērumu: atveriet informācijas paneļa API Keys lapu un pārslēdziet
# "Management Access" uz atslēgas, vai izveides laikā nosūtiet POST scopes:["manage"].

# Pēc tam izveidojiet savienojumu no attāla MCP klienta:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Atslēga bez manage tvēruma (vai bez Bearer) atgriež `403 LOCAL_ONLY`. Blakus prefiksu `/api/cli-tools/runtime/*` apiet nav iespējams — skatiet [Maršrutu aizsardzības līmeņi — manage tvēruma izņēmums](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE konfigurācija

Skatiet [MCP klienta konfigurācija](../guides/SETUP_GUIDE.md#mcp-client-configuration), lai iegūtu informāciju par Claude Desktop,
Cursor, Cline un saderīgu MCP klientu iestatīšanu.

---

## Būtiskie rīki (14) — 1. fāze

| Tool                            | Scopes                | Description                                                                                                                                                     |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Darbspējas laiks, atmiņa, ķēdes pārtraucēji, ātruma ierobežojumi, kešatmiņas statistika                                                                         |
| `omniroute_list_combos`         | `read:combos`         | Visas konfigurētās kombinācijas ar stratēģijām (neobligāti rādītāji)                                                                                            |
| `omniroute_get_combo_metrics`   | `read:combos`         | Konkrētas kombinācijas veiktspējas rādītāji                                                                                                                     |
| `omniroute_switch_combo`        | `write:combos`        | Aktivizēt vai deaktivizēt kombināciju                                                                                                                           |
| `omniroute_create_combo`        | `write:combos`        | Izveidot validētu kombināciju, izmantojot esošo kombināciju API                                                                                                 |
| `omniroute_check_quota`         | `read:quota`          | Izmantotā/kopējā kvota, atlikušais procentuālais daudzums, atiestatīšanas laiks, tokenu stāvoklis                                                               |
| `omniroute_route_request`       | `execute:completions` | Nosūtīt tērzēšanas pabeigšanas pieprasījumu, izmantojot OmniRoute maršrutēšanu                                                                                  |
| `omniroute_cost_report`         | `read:usage`          | Izmaksu pārskats pēc perioda (sesija/diena/nedēļa/mēnesis)                                                                                                      |
| `omniroute_list_models_catalog` | `read:models`         | Pilns modeļu katalogs ar iespējām, statusu un cenām                                                                                                             |
| `omniroute_radar_catalog`       | `read:radar`          | Lokāls parakstīts Radar katalogs; neobligāti pakalpojumu sniedzēju/saimes filtri                                                                                |
| `omniroute_tool_search`         | `read:tools`          | Atklāt rīkus no reģistrētā MCP kataloga                                                                                                                         |
| `omniroute_web_search`          | `execute:search`      | Meklēt tīmeklī, izmantojot konfigurētos meklēšanas pakalpojumu sniedzējus. Neattiecas uz X/Twitter.                                                             |
| `omniroute_x_search`            | `execute:search`      | Meklēt X, izmantojot xAI/SuperGrok, vai izvēlēties `xquik-search`, lai iegūtu Xquik API rezultātus. Nepieciešami izvēlētās aizmugursistēmas akreditācijas dati. |
| `omniroute_web_fetch`           | `execute:search`      | Iegūt tīmekļa saturu, izmantojot konfigurētos satura iegūšanas pakalpojumu sniedzējus                                                                           |

## Papildu rīki (11) — 2. fāze

| Rīks                               | Tvērumi                              | Apraksts                                                                                                                   |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Maršrutēšanas simulācija testa režīmā ar atkāpju koku                                                                      |
| `omniroute_set_budget_guard`       | `write:budget`                       | Sesijas budžets ar samazināšanas/ bloķēšanas/brīdināšanas darbību                                                          |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Kombināciju stratēģijas atjaunināšana izpildes laikā (prioritāte/svēršana/automātiski u.c.)                                |
| `omniroute_set_resilience_profile` | `write:resilience`                   | `aggressive` / `balanced` / `conservative` noturības priekšiestatījuma lietošana                                           |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Katrs kombinācijas nodrošinātājs tiek pārbaudīts tiešraidē, izmantojot reālu augšupējo izsaukumu                           |
| `omniroute_get_provider_metrics`   | `read:health`                        | Katra nodrošinātāja metrika ar p50/p95/p99 latentumu un ķēdes pārtraucēja stāvokli                                         |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Ieteikt kombināciju pēc uzdevuma veida, ņemot vērā budžeta/latentuma ierobežojumus                                         |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Izskaidrot, kāpēc pieprasījums tika maršrutēts pie nodrošinātāja (vērtēšanas faktori + atkāpšanās iespējas)                |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Pilns sesijas momentuzņēmums: izmaksas, marķieri, populārākie modeļi/nodrošinātāji, kļūdas, budžeta aizsargs               |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnosticēt (un pēc izvēles automātiski labot) datubāzes novirzes, piemēram, bojātas kombināciju atsauces / bāreņu rindas |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sinhronizēt cenu datus no ārējiem avotiem (LiteLLM); atbalsta `dryRun`                                                     |

## Kešatmiņas rīki (2)

| Rīks                    | Tvērumi       | Apraksts                                                              |
| :---------------------- | :------------ | :-------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Semantiskās kešatmiņas, uzvedņu kešatmiņas un idempotences statistika |
| `omniroute_cache_flush` | `write:cache` | Iztīrīt kešatmiņu globāli vai pēc paraksta/modeļa                     |

## Saspiešanas rīki (13)

| Rīks                                | Tvērumi             | Apraksts                                                                                                                                   |
| :---------------------------------- | :------------------ | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Saspiešanas iestatījumi, analītikas kopsavilkums un kešatmiņu apzinoša statistika (ietver `analytics.mcpDescriptionCompression` metadatus) |
| `omniroute_compression_configure`   | `write:compression` | Konfigurēt saspiešanas režīmu, slieksni, mērķa attiecību, sistēmas uzvednes saglabāšanu un MCP aprakstu saspiešanas pārslēgu               |
| `omniroute_set_compression_engine`  | `write:compression` | Izvēlēties aktīvo dzini (off/caveman/rtk/stacked) un Caveman/RTK intensitāti                                                               |
| `omniroute_list_compression_combos` | `read:compression`  | Uzskaitīt nosauktās saspiešanas kombinācijas un to dzinēju cauruļvadus                                                                     |
| `omniroute_compression_combo_stats` | `read:compression`  | Analītika, grupēta pēc saspiešanas kombinācijas un dzinēja                                                                                 |
| `omniroute_ccr_store`               | `write:compression` | Saglabāt izsaucēja izolētu saturu ierobežotā atmiņas CCR krātuvē un atgriezt marķieri ar `ccr://` atsauci                                  |
| `omniroute_ccr_retrieve`            | `read:compression`  | Iegūt CCR saturu pilnībā vai režīmos head, tail, lines, grep un stats                                                                      |
| `omniroute_ccr_inspect`             | `read:compression`  | Pārbaudīt izsaucējam piederošus CCR metadatus, neatgriežot saturu                                                                          |
| `omniroute_ccr_list`                | `read:compression`  | Uzskaitīt lapotos metadatus izsaucējam piederošajiem CCR blokiem                                                                           |
| `omniroute_ccr_delete`              | `write:compression` | Dzēst izsaucējam piederošu CCR bloku                                                                                                       |
| `omniroute_ccr_stats`               | `read:compression`  | Ziņot par izsaucēja tvērumam piesaistīto atmiņas lietojumu, dzīves cikla skaitītājiem un krātuves ierobežojumiem                           |
| `omniroute_rtk_discover`            | `read:compression`  | Atklāt atkārtotu troksni izvēles RTK izvades paraugos                                                                                      |
| `omniroute_rtk_learn`               | `read:compression`  | Ģenerēt pārskatāmu RTK filtra melnrakstu no izvēles paraugiem                                                                              |

CCR ieraksti pastāv tikai atmiņā un pazūd pēc restartēšanas. Katra bloka lielums ir ierobežots līdz
2 MiB, katra principāla — līdz 16 MiB, bet globālās krātuves — līdz 64 MiB. Ierakstu noklusējuma
TTL ir 24 stundas (maksimums — septiņas dienas). Pilna MCP izgūšana ir ierobežota līdz 256 KiB;
lielāki bloki paliek pieejami, izmantojot diapazona un grep režīmus. Glabāšana, izgūšana, uzskaitīšana,
pārbaude, dzēšana un statistika ir izolēta pēc autentificētās API atslēgas principāla. Audita ieraksti
satur jaucējvērtības un lieluma metadatus, bet nekad — saturu.

`omniroute_compression_status` atsevišķi ziņo par MCP aprakstu saspiešanu sadaļā
`analytics.mcpDescriptionCompression`. Šīs vērtības ir MCP uzskaitāmo aprakstu
(`tools`, `prompts`, `resources` un `resourceTemplates`) metadatu lieluma aprēķini; tās nav
nodrošinātāja lietojuma uzskaites dati, un tās ir marķētas ar `source: "mcp_metadata_estimate"`.

### MCP pieejamības koka filtrs (v3.8.0)

Atsevišķi no iepriekš minētajiem saspiešanas rīkiem OmniRoute ietver pēciekses filtru, kas saspiež
MCP pārlūkprogrammas/pieejamības rīku **rīku rezultātus**, pirms tie tiek atgriezti aģentam. Šis
filtrs pats par sevi nav rīks — tas darbojas caurspīdīgi ar jebkuru rīka rezultātu, kas satur
detalizētu pieejamības koka vai pārlūkprogrammas momentuzņēmuma tekstu (≥2000 rakstzīmju).

Galvenā darbība:

- Sakļauj ≥30 secīgas atkārtotas blakus mezglu rindas galvenes + beigu kopsavilkumā
- Saglabā `[ref=eXX]` enkurus, kas nepieciešami Playwright/datora lietošanai
- Stingri saīsina pārāk lielu tekstu (>50,000 rakstzīmju), pievienojot navigācijas norādi
- Paredzamais ietaupījums: **60–80%** pārlūkprogrammas momentuzņēmumu lietderīgajā slodzē

Konfigurācija: `compression.mcpAccessibility` globālajos iestatījumos (migrācija 056).
Implementācija: `open-sse/services/compression/engines/mcpAccessibility/`.
Pilna dokumentācija: [Saspiešanas dzinēji — MCP pieejamības koka filtrs](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Skatiet [Saspiešanas dzinēji](../compression/COMPRESSION_ENGINES.md) un [RTK saspiešana](../compression/RTK_COMPRESSION.md),
lai uzzinātu par šo rīku pamatā esošo izpildes laika saspiešanas modeli.

## 1Proxy rīki (3)

| Rīks                        | Tvērumi        | Apraksts                                                                                             |
| :-------------------------- | :------------- | :--------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Iegūt bezmaksas starpniekserverus no 1proxy tirgus (protokola/valsts/kvalitātes/ierobežojuma filtri) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Iegūt nākamo pieejamo starpniekserveri pēc stratēģijas (`random` / `quality` / `sequential`)         |
| `omniroute_oneproxy_stats`  | `read:proxies` | Kopas statistika, sinhronizācijas statuss, sadalījums pēc protokola un valsts                        |

## Atmiņas rīki (3)

Definēti failā `open-sse/mcp-server/tools/memoryTools.ts`. Autentifikācija/tvērums tiek nodrošināts, izmantojot standarta MCP tvērumu apstrādes konveijeru.

| Rīks                      | Tvērumi        | Apraksts                                                                                  |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Meklēt atmiņas pēc vaicājuma / tipa / API atslēgas, ievērojot marķieru budžetu            |
| `omniroute_memory_add`    | `write:memory` | Pievienot jaunu atmiņas ierakstu (`factual` / `episodic` / `procedural` / `semantic`)     |
| `omniroute_memory_clear`  | `write:memory` | Notīrīt API atslēgas atmiņas, pēc izvēles filtrējot pēc tipa vai `olderThan` laikspiedoga |

## Prasmju rīki (4)

Definēti failā `open-sse/mcp-server/tools/skillTools.ts`. Darbina `src/lib/skills/registry` + `src/lib/skills/executor`.

| Rīks                          | Tvērumi          | Apraksts                                                                                                   |
| :---------------------------- | :--------------- | :--------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Uzskaitīt reģistrētās prasmes, pēc izvēles filtrējot pēc API atslēgas, nosaukuma vai iespējošanas stāvokļa |
| `omniroute_skills_enable`     | `write:skills`   | Iespējot vai atspējot konkrētu prasmi pēc ID                                                               |
| `omniroute_skills_execute`    | `execute:skills` | Izpildīt prasmi ar norādīto ievadi un atgriezt izpildes ierakstu                                           |
| `omniroute_skills_executions` | `read:skills`    | Uzskaitīt neseno prasmju izpildes vēsturi                                                                  |

## Notion konteksta avots (6)

Definēts failā `open-sse/mcp-server/tools/notionTools.ts`. Pilnvara tiek glabāta `key_value` tabulā, izmantojot `src/lib/db/notion.ts`. REST klients atrodas failā `src/lib/notion/api.ts`. Iestatījumu API atrodas failā `src/app/api/settings/notion/route.ts`. Informācijas paneļa saskarne atrodas failā `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Konfigurējiet Notion integrācijas pilnvaru Endpoint informācijas paneļa cilnē **Context Sources** vai izmantojot REST API:

```bash
# Iestatīt pilnvaru
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Pārbaudīt statusu
curl http://localhost:20128/api/settings/notion

# Atvienot
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Rīks                         | Tvērumi        | Apraksts                                                                        |
| :--------------------------- | :------------- | :------------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Pilna teksta meklēšana visās lapās un datubāzēs                                 |
| `notion_get_page`            | `read:notion`  | Iegūt lapu pēc ID ar tās rekvizītiem                                            |
| `notion_list_block_children` | `read:notion`  | Uzskaitīt lapas vai bloka bērnelementu blokus                                   |
| `notion_query_database`      | `read:notion`  | Vaicāt datubāzei, izmantojot filtrus, kārtošanu un lappušu numerāciju           |
| `notion_get_database`        | `read:notion`  | Iegūt datubāzes shēmu pēc ID                                                    |
| `notion_append_blocks`       | `write:notion` | Pievienot bērnelementu blokus vecākblokam (ne vairāk kā 100 vienā pieprasījumā) |

## Aģentu prasmju kataloga rīki (3)

Definēti failā `open-sse/mcp-server/tools/agentSkillTools.ts`. Nodrošināti ar `src/lib/agentSkills/catalog`. Šie rīki MCP klientiem un ārējiem aģentiem nodrošina piekļuvi 45 ierakstu Aģentu prasmju dokumentācijas katalogam. Tvērums: `read:catalog`.

| Rīks                              | Tvērumi        | Apraksts                                                                                                                                       |
| :-------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Uzskaitīt visas 45 aģentu prasmes ar neobligātiem `category` (api\|cli) un `area` filtriem; atgriež metadatus + pārklājumu                     |
| `omniroute_agent_skills_get`      | `read:catalog` | Iegūt pilnus metadatus + `SKILL.md` saturu vienai prasmei pēc kanoniskā `id`                                                                   |
| `omniroute_agent_skills_coverage` | `read:catalog` | Pārklājuma statistika: cik no 23 API, 21 CLI un 1 konfigurācijas prasmes failu sistēmā ir `SKILL.md` faili salīdzinājumā ar kataloga kopsummām |

Pilnu katalogu un informāciju par to, kā ārējie aģenti to izmanto, skatiet [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## Saistītie ietvari (v3.8.0)

Iepriekš minētais MCP rīku inventārs (110 unikāli rīki, aprēķināts ar `countUniqueMcpTools()`) ir apzināti ierobežots līdz izpildlaika maršrutēšanas/kešatmiņas/saspiešanas/atmiņas/prasmju/starpniekservera/konteksta avota darbībām. Divi blakus ietvari tiek piegādāti kopā ar MCP serveri v3.8.0 versijā un ir dokumentēti atsevišķi:

### Mākoņa aģenti

Mākoņa aģenti ir ārpusprocesa AI programmēšanas aģenti (codex-cloud, cursor-cloud, devin, jules), kas ir savienoti ar OmniRoute, izmantojot to pašu savienojuma modeli, ko izmanto LLM nodrošinātāji. Tie ir pieejami, izmantojot savu REST saskarni (`/api/v1/agents/*`), un **nav** MCP rīku kataloga daļa — mākoņa aģenta izsaukšana nepatērē MCP tvērumu.

- Implementācija: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Dzīves cikls: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentācija: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Aizsargmehānismi

Aizsargmehānismi ir pirms/pēc izpildes filtri (vision-bridge, pii-masker, prompt-injection), kas tiek lietoti tērzēšanas konveijerā. Tie darbojas, pirms tiek sasniegts MCP rīku/maršrutu slānis, un audita konveijeram izvada strukturētus pārkāpumus; tie netiek izsaukti kā MCP rīki.

- Implementācija: `src/lib/guardrails/`.
- Dokumentācija: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Atkļūdojot MCP izsaukumu, kas šķiet bloķēts, pārbaudiet gan MCP audita žurnālu (`scope_denied:*` ierakstus), gan aizsargmehānismu audita ceļu — pieprasījumu var noraidīt aizsargmehānisms **pirms**, tas vispār sasniedz MCP tvēruma izpildes slāni.

---

## REST API galapunkti

| Galapunkts             | Metode                | Apraksts                                                                                               | Autentifikācija           |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------ |
| `/api/mcp/status`      | `GET`                 | Servera statuss: sirdsdarbība, HTTP transporta stāvoklis, audita aktivitātes kopsavilkums              | Pārvaldība (sesija/admin) |
| `/api/mcp/tools`       | `GET`                 | Rīku katalogs (nosaukums, apraksts, tvērumi, fāze, avota galapunkti)                                   | Pārvaldība                |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transporta galapunkts (kontrolē `mcpEnabled` + `mcpTransport === "sse"`)                           | API atslēga + tvērumi     |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Straumējams HTTP transports (izmanto `mcp-session-id` galveni; `DELETE` pabeidz sesiju)                | API atslēga + tvērumi     |
| `/api/mcp/audit`       | `GET`                 | Audita žurnāla ieraksti no `mcp_tool_audit` (filtri: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Pārvaldība                |
| `/api/mcp/audit/stats` | `GET`                 | Apkopota audita statistika (`totalCalls`, `successRate`, `avgDurationMs`, populārākie rīki)            | Pārvaldība                |

Avota faili: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Gan SSE, gan straumējamais HTTP transports ir bloķēts, līdz MCP serveris tiek iespējots iestatījumos (`mcpEnabled`) un tiek atlasīts atbilstošais `mcpTransport`. Ja ir konfigurēts nepareizs transports, maršruts atgriež HTTP 400 ar norādi pārslēgt iestatījumus.

---

## Autentifikācija un tvērumi

MCP rīki tiek autentificēti, izmantojot API atslēgu tvērumus. Tvērumu piemērošana ir centralizēta failā
`open-sse/mcp-server/scopeEnforcement.ts`. Katram rīkam ir nepieciešami konkrēti tvērumi:

| Tvērums               | Rīki                                                                                                                                                                             |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                        |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                           |
| `read:quota`          | `check_quota`                                                                                                                                                                    |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                           |
| `read:models`         | `list_models_catalog`                                                                                                                                                            |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                    |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                            |
| `write:budget`        | `set_budget_guard`                                                                                                                                                               |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                      |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                   |
| `read:cache`          | `cache_stats`                                                                                                                                                                    |
| `write:cache`         | `cache_flush`                                                                                                                                                                    |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                       |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                            |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                 |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                           |
| `read:memory`         | `memory_search`                                                                                                                                                                  |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                     |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                               |
| `write:skills`        | `skills_enable`                                                                                                                                                                  |
| `execute:skills`      | `skills_execute`                                                                                                                                                                 |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                 |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                          |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                        |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                 |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                   |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                               |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                  |
| `read:obsidian`       | 13 lasīšanas rīki — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 rakstīšanas rīki — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …              |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                |

Tiek atbalstīti aizstājējzīmes tvērumi: `read:*` piešķir piekļuvi visiem lasīšanas tvērumiem, savukārt `*` piešķir pilnu piekļuvi.

### `mcp:connect` — ierobežota maršruta iespēja (#7895)

Lai sasniegtu HTTP/SSE MCP transportu (`/api/mcp/*`) no adreses, kas nav cilpas atgriezeniskā adrese, ir nepieciešama
`/api/mcp/` LOCAL_ONLY atkāpe (skatiet `docs/security/ROUTE_GUARD_TIERS.md`). Vēsturiski šī atkāpe pieņēma tikai API atslēgu ar pilnu
`manage`/`admin` tvērumu — tas ir pārāk plaši izsaucējam, kuram nepieciešama tikai saziņa ar MCP. `src/shared/constants/managementScopes.ts` tagad
eksportē `MCP_CONNECT_SCOPE = "mcp:connect"`: papildinošu, ierobežotu tvērumu (pēc tāda paša principa kā `SELF_USAGE_SCOPE`), kas autorizē TIKAI
`/api/mcp/` apiešanu failā `src/server/authz/policies/management.ts` — tas nepiešķir piekļuvi nevienam citam pārvaldības maršrutam un apzināti netiek iekļauts
`MANAGEMENT_API_KEY_SCOPES`. Atslēga ar `manage`/`admin` tvērumu joprojām iztur atkāpes pārbaudi bez izmaiņām; `mcp:connect` ir alternatīva ar mazākām privilēģijām attāliem MCP lietotājiem, kuriem nepieciešama tikai MCP piekļuve, un to pārbauda, izmantojot `hasMcpConnectOrManageScope()`.

### Tvērumu piesaiste katrai atslēgai, izmantojot HTTP (#7895)

Izmantojot HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` tagad atrisina izsaucēja faktiskos `api_keys.scopes`, izmantojot `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`),
un nodod tos MCP SDK `transport.handleRequest(req, { authInfo })`, tādējādi `extra.authInfo.scopes`, kas sasniedz katru rīka izsaukumu, atspoguļo pašas Bearer atslēgas tvērumus.
`scopeEnforcement.ts` funkcija `resolveCallerScopeContext()` jau piešķīra prioritāti `authInfo`, nevis `_meta` un `OMNIROUTE_MCP_SCOPES` vides atkāpēm — šīs izmaiņas tikai aizpilda pirmo,
augstākās prioritātes avotu, kas iepriekš netika padots, izmantojot HTTP. Ja neviena API atslēga netiek atrisināta
(nav galvenes vai atslēga ir nederīga), `authInfo` paliek `undefined`, un atrisināšana nemainītā veidā pāriet uz esošo `meta`/vides ķēdi. Tas NEIZMAINĀ
`OMNIROUTE_MCP_ENFORCE_SCOPES` noklusējuma vērtību — piemērošana joprojām ir jāiespējo tieši; šīs izmaiņas tikai nodrošina, ka katrai atslēgai paredzētais ceļš iegūst prioritāti, tiklīdz tas ir iespējots. stdio nav katra izsaucēja identitātes (skatiet
`mcpCallerIdentity.ts`), un tas netiek ietekmēts — tas joprojām izmanto `_meta`/vides atkāpju ķēdi.

---

## Vides mainīgie

| Mainīgais                               | Noklusējums                         | Nolūks                                                                                                                                                  |
| :-------------------------------------- | :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`            | Bāzes URL, ko MCP serveris izmanto, izsaucot OmniRoute iekšējās API                                                                                     |
| `OMNIROUTE_API_KEY`                     | (tukšs)                             | API atslēga, kas iekšējo API izsaukumiem tiek pārsūtīta kā `Authorization: Bearer`                                                                      |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (to iespējo tikai `"true"`) | Kad iespējots, trūkstoši tvērumi liedz izsaukt rīkus un audita žurnālā ieraksta `scope_denied:<reason>`                                                 |
| `OMNIROUTE_MCP_SCOPES`                  | (tukšs)                             | Ar komatiem atdalīts atļauto tvērumu saraksts, kas pēc noklusējuma tiek uzskatīts par “pieejamu” (tiek izmantots, ja izsaucējs nenorāda savus tvērumus) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nav iestatīts = ieslēgts)          | Ja iestatīts uz `0/false/off/no`, reģistrēšanas laikā atspējo MCP aprakstu saspiešanu                                                                   |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nav iestatīts = ieslēgts)          | Alternatīvs aizstājvārds iepriekš aprakstītajam pārslēdzim                                                                                              |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                             | Pārtraukšanas laika budžets iekšējiem pārvaldības lasījumiem (veselības stāvoklis, noturība, kombinācijas, kvota, lietojums)                            |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                             | Pārtraukšanas laika budžets lēcieniem, kas gaida pakalpojumu sniedzēja atbildi (`route_request`, `web_search`, `web_fetch`)                             |
| `MCP_TOOL_DENY`                         | (nav iestatīts = bez filtra)        | Ar komatiem atdalīti rīku nosaukumi, kas jāizslēdz no `tools/list` (rīku skaita samazināšana — skatiet tālāk)                                           |
| `MCP_TOOL_ALLOW`                        | (nav iestatīts = bez filtra)        | Ar komatiem atdalīti rīku nosaukumi, kurus atstāt (atļaušanas saraksta režīms — skatiet tālāk)                                                          |
| `DATA_DIR`                              | `~/.omniroute`                      | Sirdsdarbības fails tiek ierakstīts vietnē `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                     |

---

## Aprakstu saspiešana

MCP rīku, uzvedņu un resursu reģistri reģistrēšanas/saraksta izveides laikā var saspiest aprakstus, lai samazinātu klientiem atklāto metadatu apjomu (un līdz ar to arī uzvednes konteksta izmaksas). Īstenošana atrodas `open-sse/mcp-server/descriptionCompressor.ts` un ir pieslēgta MCP serverim, izmantojot `compressMcpRegistryMetadata` funkcijā `createMcpServer()`.

- Saspiešana tiek veikta apraksta tekstam, izmantojot Caveman noteikumu kopu (`getRulesForContext("all", "full")`) un saglabāto bloku izdalīšanu (koda fragmenti, norobežoti bloki u. c.), lai strukturālais saturs netiktu mainīts.
- Pārslēgšana katrai izvietošanai atsevišķi tiek veikta, izmantojot `compression.mcpDescriptionCompressionEnabled` vērtību `key_value` iestatījumu tabulā (pēc noklusējuma: iespējots) — lietotāja saskarnē pieejama sadaļā **Analītika → MCP aprakstu saspiešana**.
- Procesa mēroga pārslēgšana tiek veikta, izmantojot `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` vai `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Reāllaika statistika ir pieejama, izmantojot `omniroute_compression_status` sadaļā `analytics.mcpDescriptionCompression`, un tai ir pievienota atzīme `source: "mcp_metadata_estimate"`, lai to atšķirtu no faktiskajiem pakalpojumu sniedzēja lietojuma kvīšu datiem.

---

## Rīku kardinalitātes samazināšana (F4.3)

Apraksta saspiešana samazina katra rīka metadatus; **rīku kardinalitātes samazināšana** iet vēl vienu soli tālāk, samazinot _kopējo paziņoto rīku skaitu_. Mazāka rīku skaita reklamēšana `tools/list` manifestā samazina katra pieprasījuma marķieru izmaksas, ko klienta modelis maksā par rīku katalogu (“5. slāņa” saspiešana). Implementācija ir tīrs, bezstāvokļa filtrs failā `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), kas pievienots reģistrācijas ciklam funkcijā `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Pēc izvēles, pēc noklusējuma izslēgts.** Filtrs darbojas tikai tad, ja ir iestatīts vismaz viens no diviem vides mainīgajiem; ja neviens nav iestatīts, visi 110 rīki tiek paziņoti bez izmaiņām.

| Mainīgais        | Režīms                                                                                                       |
| :--------------- | :----------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Melnais saraksts — ar komatiem atdalīti rīku nosaukumi, kas vienmēr tiek izņemti no `tools/list`             |
| `MCP_TOOL_ALLOW` | Atļauju saraksts — ar komatiem atdalīti rīku nosaukumi; tiek saglabāti tikai šie, viss pārējais tiek izņemts |

`deny` ir prioritāte pār `allow`. Nosaukumi tiek atdalīti ar komatiem, apgrieztas atstarpes tiek noņemtas, un tukšie elementi tiek ignorēti. Piemēri:

```bash
# Izņemiet no kataloga divus rīkus
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Paziņojiet tikai maršrutēšanas + kvotu rīkus (atļauju saraksta režīms)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Kā filtrētie rīki tiek izņemti:** reģistrācija vienmēr ir veiksmīga; rīks, ko profils noraida, pēc tam MCP SDK apstrādes objektā tiek atspējots ar `.disable()`, tāpēc tas nekad neparādās `tools/list`, bet savienojums paliek neskarts (tīra iespējošana/atspējošana, bez atkārtotas reģistrācijas). Profila parsētājs ir `readMcpToolProfileFromEnv(process.env)`, kas atgriež `null` (bez filtrēšanas), ja abi mainīgie ir tukši.

Bagātīgākā `ToolProfile` struktūra, kas ir pamatā `reduceToolManifest`, atbalsta arī filtrēšanu pēc tvērumu krustpunkta (`allowScopes`, ar `read:*` tipa aizstājējzīmju atbilstību) un deterministisku `maxTools` ierobežojumu, taču šiem diviem iestatījumiem reģistrācijas laikā ir nepieciešams pilns manifests, un tie pašlaik **nav pieejami** caur vides mainīgajiem (kā turpmāks uzdevums tiek izsekots `tools/list` līmeņa āķis). `estimateManifestTokens()` ir pieejams, lai salīdzinātu manifesta marķieru izmaksas pirms un pēc samazināšanas.

---

## Darbības laika sirdsdarbība

stdio transports ik pēc 5 sekundēm saglabā dzīvotspējas informāciju failā `${DATA_DIR}/runtime/mcp-heartbeat.json`. Informācijas panelis (`/api/mcp/status`) nolasa šo failu un PID dzīvotspēju, lai noteiktu `online`. HTTP transporti tā vietā ziņo stāvokli no procesa iekšējā `getMcpHttpStatus()` (fails netiek rakstīts).

Sirdsdarbības momentuzņēmums satur:

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

## Audita reģistrēšana

Katrs rīka izsaukums tiek reģistrēts SQLite `mcp_tool_audit` tabulā, izmantojot `open-sse/mcp-server/audit.ts`:

- Rīka nosaukums, argumenti (sajaukti un saīsināti atbilstoši katra rīka `auditLevel`), rezultāts
- Ilgums milisekundēs, veiksmes/neveiksmes karodziņš, kļūdas ziņojums (ja piemērojams)
- API atslēgas jaucējvērtība, laikspiedols
- Tvēruma atteikumi tiek reģistrēti kā `scope_denied:<reason>` ar trūkstošo tvērumu sarakstu

Izmantojiet informācijas paneli vai REST galapunktus `/api/mcp/audit` un `/api/mcp/audit/stats`, lai pārbaudītu nesenos izsaukumus.

## Faili

| File                                                                     | Purpose                                                                       |
| :----------------------------------------------------------------------- | :---------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP servera rūpnīca, stdio ievades punkts, tvēruma rīku reģistrācija          |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transports (sesiju pārvaldība)                          |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Rīku tvēruma novērtēšana un izsaucēja atrisināšana                            |
| `open-sse/mcp-server/audit.ts`                                           | Rīku izsaukumu audita reģistrēšana (`mcp_tool_audit`)                         |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio sirdspukstu rakstītājs (`mcp-heartbeat.json`)                           |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Rīku / uzvedņu / resursu reģistru aprakstu saspiešana                         |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod shēmas + rīku reģistrs (`MCP_TOOLS`, 45 ieraksti)                         |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 2. fāzes + kešatmiņas + 1proxy rīku apstrādātāji                              |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Saspiešanas rīku apstrādātāji                                                 |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Atmiņas rīku definīcijas (3 rīki)                                             |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Prasmju rīku definīcijas (4 rīki)                                             |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion konteksta avota rīku definīcijas (6 rīki)                              |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Spēļošanas rīku definīcijas (8 rīki)                                          |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Spraudņu reģistrēšanas un pārvaldības rīki (8 rīki)                           |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` galapunkts                                                  |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` galapunkts                                                   |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE transporta maršruts                                        |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP transporta maršruts                         |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` audita žurnāla vaicājums                                     |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` apkopotie audita rādītāji                              |
| `src/lib/notion/api.ts`                                                  | Notion REST API klients (atkārtots mēģinājums, taimauts, kļūdu klasifikācija) |
| `src/lib/db/notion.ts`                                                   | Notion pilnvaras marķiera saglabāšana (`key_value` tabula)                    |
| `src/app/api/settings/notion/route.ts`                                   | Notion iestatījumu API (GET/POST/DELETE)                                      |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion pilnvaras marķiera pārvaldības UI                                      |
| `tests/unit/notion-api.test.ts`                                          | Notion API klienta testi (7)                                                  |
| `tests/unit/notion-tools.test.ts`                                        | Notion rīku tvēruma ievērošanas testi (10)                                    |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB moduļa testi (3)                                                    |
