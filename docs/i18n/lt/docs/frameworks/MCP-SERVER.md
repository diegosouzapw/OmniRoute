# MCP-SERVER (Lietuvių)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

---

title: "OmniRoute MCP serverio dokumentacija"
version: 3.8.50
lastUpdated: 2026-08-08
---

# OmniRoute MCP serverio dokumentacija

> Modelio konteksto protokolo serveris su 110 įrankių, apimančių maršruto parinkimo, podėlio, glaudinimo, atminties, įgūdžių, tarpinio serverio, telkinio, Radar ir konteksto šaltinių operacijas.
>
> Patikimas šaltinis: `open-sse/mcp-server/server.ts` naudodamas `countUniqueMcpTools()` apskaičiuoja **110 unikalių įrankių**: 45 kanoninius aprašus (įskaitant šešis CCR gyvavimo ciklo įrankius, agento įgūdžių trejetą, `omniroute_radar_catalog` ir `omniroute_x_search`), taip pat atminties (3), įgūdžių (4), GitHub įgūdžių (3), telkinio (6), žaidybinimo (8), papildinių (8), Notion (6), Obsidian (22), vietinio tekstyno (3) ir du tik RTK skirtus glaudinimo įrankius.

## Diegimas

OmniRoute MCP yra integruotas. Paleiskite jį naudodami:

```bash
omniroute --mcp
```

Arba naudodami open-sse transportą:

```bash
# HTTP srautinio perdavimo transportas (prievadas 20130)
omniroute --dev  # MCP automatiškai paleidžiamas galiniame taške /mcp
```

## Transportai

MCP serveris pateikia tris transportus, kuriuos visus palaiko ta pati `createMcpServer()` kūrimo funkcija:

| Transportas       | Kur                                         | Kada naudoti                                               |
| :---------------- | :------------------------------------------ | :--------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE integracijoms (Claude Desktop, Cursor ir kt.)          |
| `sse`             | `POST/GET /api/mcp/sse` per `httpTransport` | Naršyklės / agento klientams, kuriems reikia įvykių srauto |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | Kelių seansų HTTP klientams (`mcp-session-id` antraštė)    |

Aktyvus HTTP transportas (`sse` arba `streamable-http`) pasirenkamas `mcpTransport` nustatymu. Perjungus transportą, uždaromi visi esami kito transporto seansai.

### Nuotolinė prieiga (`manage` aprėpties apėjimas)

`/api/mcp/*` priklauso LOCAL_ONLY lygiui (`src/server/authz/routeGuard.ts`) — pagal numatytuosius nustatymus jį gali pasiekti tik vietinio ciklo adresai (`localhost`, `127.0.0.1`, `::1`). Nuo v3.8.2 ne vietinio ciklo klientai gali prisijungti pateikę `Authorization: Bearer <api-key>`, kurio raktui suteikta `manage` aprėptis. Tai vienintelis būdas pasiekti nuotolinį MCP serverį per tunelį, atvirkštinį tarpinį serverį arba viešą pagrindinio kompiuterio vardą.

```bash
# Suteikite manage aprėptį: atverkite valdymo skydelio API raktų puslapį ir rakte įjunkite
# „Management Access“ arba kurdami siųskite POST su scopes:["manage"].

# Tada prisijunkite iš nuotolinio MCP kliento:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Raktas be `manage` aprėpties (arba be Bearer) grąžina `403 LOCAL_ONLY`. Susijusio prefikso `/api/cli-tools/runtime/*` tyčia NEGALIMA apeiti — žr. [Maršrutų apsaugos lygiai — `manage` aprėpties išimtis](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE konfigūracija

Žr. [MCP kliento konfigūraciją](../guides/SETUP_GUIDE.md#mcp-client-configuration), skirtą Claude Desktop,
Cursor, Cline ir suderinamiems MCP klientams nustatyti.

---

## Pagrindiniai įrankiai (14) — 1 etapas

| Įrankis                         | Teisės                | Aprašymas                                                                                                                                                   |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Veikimo trukmė, atmintis, grandinės pertraukikliai, dažnio ribojimai, podėlio statistika                                                                    |
| `omniroute_list_combos`         | `read:combos`         | Visi sukonfigūruoti deriniai ir jų strategijos (pasirinktinai metrika)                                                                                      |
| `omniroute_get_combo_metrics`   | `read:combos`         | Konkretaus derinio našumo metrika                                                                                                                           |
| `omniroute_switch_combo`        | `write:combos`        | Aktyvinti arba išjungti derinį                                                                                                                              |
| `omniroute_create_combo`        | `write:combos`        | Sukurti patikrintą derinį naudojant esamą derinių API                                                                                                       |
| `omniroute_check_quota`         | `read:quota`          | Panaudota ir bendra kvota, likęs procentas, atkūrimo laikas, prieigos raktų būklė                                                                           |
| `omniroute_route_request`       | `execute:completions` | Siųsti pokalbio užbaigimo užklausą naudojant OmniRoute maršruto parinkimą                                                                                   |
| `omniroute_cost_report`         | `read:usage`          | Išlaidų ataskaita pagal laikotarpį (seansą / dieną / savaitę / mėnesį)                                                                                      |
| `omniroute_list_models_catalog` | `read:models`         | Visas modelių katalogas su galimybėmis, būsena ir kainodara                                                                                                 |
| `omniroute_radar_catalog`       | `read:radar`          | Vietinis pasirašytas Radar katalogas; pasirinktiniai teikėjo ar šeimos filtrai                                                                              |
| `omniroute_tool_search`         | `read:tools`          | Atrasti įrankius registruotame MCP kataloge                                                                                                                 |
| `omniroute_web_search`          | `execute:search`      | Ieškoti žiniatinklyje naudojant sukonfigūruotus paieškos teikėjus. Ne X/Twitter.                                                                            |
| `omniroute_x_search`            | `execute:search`      | Ieškoti X naudojant xAI/SuperGrok arba pasirinkti `xquik-search`, kad būtų pateikti Xquik API rezultatai. Pasirinktai sistemai reikia prisijungimo duomenų. |
| `omniroute_web_fetch`           | `execute:search`      | Gauti žiniatinklio turinį naudojant sukonfigūruotus gavimo teikėjus                                                                                         |

## Išplėstiniai įrankiai (11) — 2 etapas

| Įrankis                            | Aprėptys                             | Aprašymas                                                                                                                              |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Bandomasis maršruto parinkimo modeliavimas su atsarginių variantų medžiu                                                               |
| `omniroute_set_budget_guard`       | `write:budget`                       | Seanso biudžetas su kokybės mažinimo, blokavimo arba įspėjimo veiksmu                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Derinio strategijos atnaujinimas vykdymo metu (prioritetinė / svertinė / automatinė / kt.)                                             |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Pritaikyti `aggressive` / `balanced` / `conservative` atsparumo išankstinę parinktį                                                    |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Tiesiogiai išbandyti kiekvieną derinio teikėją, atliekant tikrą išorinę užklausą                                                       |
| `omniroute_get_provider_metrics`   | `read:health`                        | Kiekvieno teikėjo metrika su p50/p95/p99 delsa ir grandinės pertraukiklio būsena                                                       |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Rekomenduoti derinį pagal užduoties tipą, atsižvelgiant į biudžeto ir delsos apribojimus                                               |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Paaiškinti, kodėl užklausa buvo nukreipta konkrečiam teikėjui (vertinimo veiksniai ir atsarginiai variantai)                           |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Visa seanso momentinė kopija: sąnaudos, atpažinimo ženklai, populiariausi modeliai / teikėjai, klaidos, biudžeto apsauga               |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnozuoti (ir pasirinktinai automatiškai ištaisyti) duomenų bazės neatitiktis, pvz., sugadintas derinių nuorodas / našlaičių eilutes |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sinchronizuoti kainodaros duomenis iš išorinių šaltinių (LiteLLM); palaiko `dryRun`                                                    |

## Podėlio įrankiai (2)

| Įrankis                 | Aprėptys      | Aprašymas                                                           |
| :---------------------- | :------------ | :------------------------------------------------------------------ |
| `omniroute_cache_stats` | `read:cache`  | Semantinio podėlio, raginimų podėlio ir idempotentiškumo statistika |
| `omniroute_cache_flush` | `write:cache` | Išvalyti podėlį visuotinai arba pagal parašą / modelį               |

## Glaudinimo įrankiai (13)

| Įrankis                             | Aprėptys            | Aprašymas                                                                                                                                |
| :---------------------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Glaudinimo nuostatos, analizės suvestinė ir podėlį įvertinanti statistika (įskaitant `analytics.mcpDescriptionCompression` metaduomenis) |
| `omniroute_compression_configure`   | `write:compression` | Konfigūruoti glaudinimo režimą, slenkstį, tikslinį santykį, sistemos raginimo išsaugojimą ir MCP aprašymų glaudinimo perjungiklį         |
| `omniroute_set_compression_engine`  | `write:compression` | Pasirinkti aktyvų variklį (off/caveman/rtk/stacked) ir Caveman / RTK intensyvumą                                                         |
| `omniroute_list_compression_combos` | `read:compression`  | Pateikti įvardytų glaudinimo derinių ir jų variklių konvejerių sąrašą                                                                    |
| `omniroute_compression_combo_stats` | `read:compression`  | Analizė, sugrupuota pagal glaudinimo derinį ir variklį                                                                                   |
| `omniroute_ccr_store`               | `write:compression` | Saugoti nuo kvietėjo izoliuotą turinį ribotoje atmintinėje CCR saugykloje ir grąžinti žymeklį bei `ccr://` nuorodą                       |
| `omniroute_ccr_retrieve`            | `read:compression`  | Gauti visą CCR turinį arba naudoti head, tail, lines, grep ir stats režimus                                                              |
| `omniroute_ccr_inspect`             | `read:compression`  | Patikrinti kvietėjui priklausančius CCR metaduomenis negrąžinant turinio                                                                 |
| `omniroute_ccr_list`                | `read:compression`  | Pateikti puslapiais suskirstytus kvietėjui priklausančių CCR blokų metaduomenis                                                          |
| `omniroute_ccr_delete`              | `write:compression` | Pašalinti kvietėjui priklausantį CCR bloką                                                                                               |
| `omniroute_ccr_stats`               | `read:compression`  | Pateikti kvietėjo aprėpties atminties naudojimą, gyvavimo ciklo skaitiklius ir saugyklos ribas                                           |
| `omniroute_rtk_discover`            | `read:compression`  | Aptikti pasikartojantį triukšmą pasirinktiniu būdu pateiktuose RTK išvesties pavyzdžiuose                                                |
| `omniroute_rtk_learn`               | `read:compression`  | Iš pasirinktiniu būdu pateiktų pavyzdžių sugeneruoti peržiūrimą RTK filtro juodraštį                                                     |

CCR įrašai saugomi tik atmintyje ir paleidus iš naujo išnyksta. Kiekvieno bloko dydis ribojamas iki 2 MiB, kiekvieno
subjekto — iki 16 MiB, o visos saugyklos — iki 64 MiB. Pagal numatytąsias nuostatas įrašų TTL yra 24 valandos (daugiausia
septynios dienos). Visas MCP išgavimas ribojamas iki 256 KiB; didesnius blokus vis tiek galima pasiekti naudojant
diapazonų ir grep režimus. Saugojimas, išgavimas, sąrašų pateikimas, tikrinimas, šalinimas ir statistika izoliuojami pagal
autentifikuotą API rakto subjektą. Audito įrašuose pateikiamos maišos ir dydžio metaduomenys, bet niekada ne pats turinys.

`omniroute_compression_status` pateikia MCP aprašymų glaudinimą atskirai, skiltyje
`analytics.mcpDescriptionCompression`. Šios reikšmės yra MCP sąrašuose pateikiamų
aprašymų (`tools`, `prompts`, `resources` ir `resourceTemplates`) metaduomenų dydžio įverčiai; tai nėra teikėjo naudojimo
apskaitos įrašai, ir jie pažymėti `source: "mcp_metadata_estimate"`.

### MCP pritaikymo neįgaliesiems medžio filtras (v3.8.0)

Be pirmiau nurodytų glaudinimo įrankių, OmniRoute apima filtrą, kuris po vykdymo
suglaudina MCP naršyklės / pritaikymo neįgaliesiems įrankių **rezultatus**, prieš juos grąžinant
agentui. Pats šis filtras nėra įrankis — jis skaidriai vykdomas bet kokiam įrankio rezultatui, kuriame yra
išsamus pritaikymo neįgaliesiems medžio arba naršyklės momentinės kopijos tekstas (≥2000 simbolių).

Pagrindinės ypatybės:

- Sutraukia ≥30 iš eilės pasikartojančių to paties lygmens eilučių į pradžios ir pabaigos suvestinę
- Išsaugo `[ref=eXX]` inkarus, reikalingus Playwright / kompiuterio valdymui
- Griežtai sutrumpina per didelį tekstą (>50,000 simbolių), pateikdamas naršymo užuominą
- Tikėtinas sutaupymas: **60–80%** naršyklės momentinių kopijų duomenims

Konfigūracija: `compression.mcpAccessibility` visuotinėse nuostatose (migracija 056).
Įgyvendinimas: `open-sse/services/compression/engines/mcpAccessibility/`.
Visa dokumentacija: [Glaudinimo varikliai — MCP pritaikymo neįgaliesiems medžio filtras](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Žr. [Glaudinimo varikliai](../compression/COMPRESSION_ENGINES.md) ir [RTK glaudinimas](../compression/RTK_COMPRESSION.md), kur aprašytas
šių įrankių vykdymo metu naudojamas glaudinimo modelis.

## 1Proxy įrankiai (3)

| Įrankis                     | Aprėptys       | Aprašymas                                                                                                 |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Gauti nemokamus tarpinius serverius iš 1proxy prekyvietės (protokolo / šalies / kokybės / kiekio filtrai) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Gauti kitą pasiekiamą tarpinį serverį pagal strategiją (`random` / `quality` / `sequential`)              |
| `omniroute_oneproxy_stats`  | `read:proxies` | Fondo statistika, sinchronizavimo būsena, pasiskirstymas pagal protokolą ir šalį                          |

## Atminties įrankiai (3)

Apibrėžti faile `open-sse/mcp-server/tools/memoryTools.ts`. Autentifikavimas ir aprėptis užtikrinami naudojant standartinę MCP aprėpčių apdorojimo grandinę.

| Įrankis                   | Aprėptys       | Aprašymas                                                                                             |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Ieškoti atminties įrašų pagal užklausą / tipą / API raktą, taikant žetonų biudžeto apribojimą         |
| `omniroute_memory_add`    | `write:memory` | Pridėti naują atminties įrašą (`factual` / `episodic` / `procedural` / `semantic`)                    |
| `omniroute_memory_clear`  | `write:memory` | Išvalyti API rakto atminties įrašus, pasirinktinai filtruojant pagal tipą arba `olderThan` laiko žymą |

## Įgūdžių įrankiai (4)

Apibrėžti faile `open-sse/mcp-server/tools/skillTools.ts`. Veikia naudojant `src/lib/skills/registry` ir `src/lib/skills/executor`.

| Įrankis                       | Aprėptys         | Aprašymas                                                                                                   |
| :---------------------------- | :--------------- | :---------------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Išvardyti užregistruotus įgūdžius, pasirinktinai filtruojant pagal API raktą, pavadinimą ar įjungimo būseną |
| `omniroute_skills_enable`     | `write:skills`   | Įjungti arba išjungti konkretų įgūdį pagal ID                                                               |
| `omniroute_skills_execute`    | `execute:skills` | Vykdyti įgūdį su pateiktais įvesties duomenimis ir grąžinti vykdymo įrašą                                   |
| `omniroute_skills_executions` | `read:skills`    | Išvardyti naujausių įgūdžių vykdymų istoriją                                                                |

## Notion konteksto šaltinis (6)

Apibrėžta faile `open-sse/mcp-server/tools/notionTools.ts`. Žetonas saugomas lentelėje `key_value` naudojant `src/lib/db/notion.ts`. REST klientas yra faile `src/lib/notion/api.ts`. Nustatymų API yra faile `src/app/api/settings/notion/route.ts`. Valdymo skydelio naudotojo sąsaja yra faile `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Sukonfigūruokite Notion integracijos žetoną galinio taško valdymo skydelio kortelėje **Konteksto šaltiniai** arba naudodami REST API:

```bash
# Nustatyti žetoną
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Patikrinti būseną
curl http://localhost:20128/api/settings/notion

# Atsijungti
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Įrankis                      | Aprėptys       | Aprašymas                                                                             |
| :--------------------------- | :------------- | :------------------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Vykdyti viso teksto paiešką visuose puslapiuose ir duomenų bazėse                     |
| `notion_get_page`            | `read:notion`  | Gauti puslapį pagal ID kartu su jo ypatybėmis                                         |
| `notion_list_block_children` | `read:notion`  | Išvardyti antrinius puslapio arba bloko elementus                                     |
| `notion_query_database`      | `read:notion`  | Pateikti duomenų bazės užklausą su filtrais, rikiavimu ir puslapių skaidymu           |
| `notion_get_database`        | `read:notion`  | Gauti duomenų bazės schemą pagal ID                                                   |
| `notion_append_blocks`       | `write:notion` | Pridėti antrinius blokus prie pirminio bloko (ne daugiau kaip 100 vienoje užklausoje) |

## Agentų įgūdžių katalogo įrankiai (3)

Apibrėžti faile `open-sse/mcp-server/tools/agentSkillTools.ts`. Veikimą užtikrina `src/lib/agentSkills/catalog`. Šie įrankiai suteikia MCP klientams ir išoriniams agentams prieigą prie 45 įrašų agentų įgūdžių dokumentacijos katalogo. Apimtis: `read:catalog`.

| Įrankis                           | Apimtys        | Aprašymas                                                                                                                                                   |
| :-------------------------------- | :------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Pateikia visus 45 agentų įgūdžius su pasirenkamais `category` (api\|cli) ir `area` filtrais; grąžina metaduomenis ir aprėptį                                |
| `omniroute_agent_skills_get`      | `read:catalog` | Pagal kanoninį `id` gauna visus vieno įgūdžio metaduomenis ir SKILL.md turinį                                                                               |
| `omniroute_agent_skills_coverage` | `read:catalog` | Aprėpties statistika: kiek iš 23 API, 21 CLI ir 1 konfigūracijos įgūdžio turi SKILL.md failus failų sistemoje, palyginti su katalogo bendraisiais skaičiais |

Visą katalogą ir informaciją, kaip jį naudoja išoriniai agentai, rasite [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## Susijusios sistemos (v3.8.0)

Pirmiau pateiktas MCP įrankių sąrašas (110 unikalių įrankių, apskaičiuotų naudojant `countUniqueMcpTools()`) yra sąmoningai
apribotas vykdymo maršruto parinkimo, talpyklos, glaudinimo, atminties, įgūdžių, tarpinio serverio ir konteksto šaltinio operacijomis. Dvi gretimos
sistemos pateikiamos kartu su MCP serveriu versijoje v3.8.0 ir yra dokumentuotos atskirai:

### Debesijos agentai

Debesijos agentai yra už proceso ribų veikiantys DI programavimo agentai (codex-cloud, cursor-cloud, devin, jules), integruoti į
OmniRoute naudojant tą patį ryšio modelį, kuris naudojamas LLM teikėjams. Jie pasiekiami per
atskirą REST sąsają (`/api/v1/agents/*`) ir **nėra** MCP įrankių katalogo dalis
— iškviečiant debesijos agentą MCP apimtis nenaudojama.

- Įgyvendinimas: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Gyvavimo ciklas: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentacija: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Apsaugos priemonės

Apsaugos priemonės yra prieš vykdymą ir po jo taikomi filtrai (vision-bridge, pii-masker, prompt-injection),
naudojami pokalbio apdorojimo sekoje. Jie vykdomi prieš pasiekiant MCP įrankių ar maršrutų sluoksnį
ir audito apdorojimo sekai perduoda struktūrizuotus pažeidimus; jie nėra iškviečiami kaip MCP įrankiai.

- Įgyvendinimas: `src/lib/guardrails/`.
- Dokumentacija: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Derindami MCP iškvietimą, kuris atrodo užblokuotas, patikrinkite ir MCP audito žurnalą
(`scope_denied:*` įrašus), ir apsaugos priemonių audito seką — užklausa gali būti atmesta apsaugos priemonės
**prieš** jai apskritai pasiekiant MCP apimčių taikymo sluoksnį.

---

## REST API galiniai taškai

| Galinis taškas         | Metodas               | Aprašymas                                                                                                     | Autentifikavimas                      |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------ |
| `/api/mcp/status`      | `GET`                 | Serverio būsena: gyvybingumo signalas, HTTP transporto būsena, audito veiklos suvestinė                       | Valdymas (seansas / administratorius) |
| `/api/mcp/tools`       | `GET`                 | Įrankių katalogas (pavadinimas, aprašymas, apimtys, etapas, šaltinio galiniai taškai)                         | Valdymas                              |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE transporto galinis taškas (valdomas pagal `mcpEnabled` + `mcpTransport === "sse"`)                        | API raktas + apimtys                  |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Srautinis HTTP transportas (naudoja `mcp-session-id` antraštę; `DELETE` užbaigia seansą)                      | API raktas + apimtys                  |
| `/api/mcp/audit`       | `GET`                 | Audito žurnalo įrašai iš `mcp_tool_audit` (filtrai: `limit`, `offset`, `tool`, `success`, `apiKeyId`)         | Valdymas                              |
| `/api/mcp/audit/stats` | `GET`                 | Apibendrinta audito statistika (`totalCalls`, `successRate`, `avgDurationMs`, dažniausiai naudojami įrankiai) | Valdymas                              |

Šaltinio failai: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

SSE ir srautinis HTTP transportas blokuojami, kol MCP serveris neįjungtas nustatymuose (`mcpEnabled`) ir nepasirinktas tinkamas `mcpTransport`. Jei sukonfigūruotas netinkamas transportas, maršrutas grąžina HTTP 400 su užuomina pakeisti nustatymus.

---

## Autentifikavimas ir aprėptys

MCP įrankiai autentifikuojami naudojant API rakto aprėptis. Aprėpčių taikymas centralizuotas
`open-sse/mcp-server/scopeEnforcement.ts`. Kiekvienam įrankiui reikalingos konkrečios aprėptys:

| Aprėptis              | Įrankiai                                                                                                                                                                           |
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
| `read:obsidian`       | 13 skaitymo įrankių — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 rašymo įrankiai — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                 |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                  |

Palaikomos aprėptys su pakaitos simboliais: `read:*` suteikia visas skaitymo aprėptis, o `*` suteikia visišką prieigą.

### `mcp:connect` — siaura maršruto galimybė (#7895)

Norint pasiekti HTTP/SSE MCP transportą (`/api/mcp/*`) ne iš vietinio grįžtamojo ryšio
adreso, reikalinga `/api/mcp/` LOCAL_ONLY išimtis (žr. `docs/security/ROUTE_GUARD_TIERS.md`). Anksčiau
ši išimtis priimdavo tik visą `manage`/`admin` aprėptį turintį API raktą — tai pernelyg plačios
teisės kvietėjui, kuriam reikia tik palaikyti ryšį su MCP. `src/shared/constants/managementScopes.ts` dabar
eksportuoja `MCP_CONNECT_SCOPE = "mcp:connect"`: papildomą siaurą aprėptį (pagal tą patį precedentą kaip
`SELF_USAGE_SCOPE`), kuri autorizuoja TIK `/api/mcp/` apėjimą faile
`src/server/authz/policies/management.ts` — ji nesuteikia prieigos prie jokių kitų valdymo maršrutų
ir sąmoningai NĖRA įtraukta į `MANAGEMENT_API_KEY_SCOPES`. `manage`/`admin` aprėptį turintis raktas
vis tiek be pakeitimų atitinka išimties sąlygas; `mcp:connect` yra mažiau privilegijų turinti alternatyva
nuotoliniams, tik MCP naudojantiems kvietėjams, tikrinama naudojant `hasMcpConnectOrManageScope()`.

### HTTP aprėpčių susiejimas su konkrečiu raktu (#7895)

Naudojant HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` dabar nustato tikrąsias kvietėjo
`api_keys.scopes` per `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
ir perduoda jas MCP SDK metodui `transport.handleRequest(req, { authInfo })`, todėl
kiekvieną įrankio iškvietimą pasiekiančios `extra.authInfo.scopes` atspindi paties „Bearer“ rakto aprėptis.
`scopeEnforcement.ts` funkcija `resolveCallerScopeContext()` jau teikė pirmenybę `authInfo`, o ne
`_meta` ir `OMNIROUTE_MCP_SCOPES` aplinkos kintamojo atsarginiams šaltiniams — šis pakeitimas tik užpildo tą pirmąjį,
aukščiausio prioriteto šaltinį, kuriam anksčiau naudojant HTTP duomenys nebuvo perduodami. Kai nepavyksta nustatyti
jokio API rakto (nėra antraštės arba raktas negalioja), `authInfo` lieka `undefined`, o nustatymas be pakeitimų
pereina prie esamos `meta` / aplinkos šaltinių grandinės. Tai NEPAKEIČIA `OMNIROUTE_MCP_ENFORCE_SCOPES`
numatytosios reikšmės — taikymą vis tiek reikia aiškiai įjungti; šis pakeitimas tik užtikrina, kad
jį įjungus konkretaus rakto kelias turėtų pirmenybę. stdio neturi konkretaus kvietėjo tapatybės (žr.
`mcpCallerIdentity.ts`) ir šis pakeitimas jam įtakos neturi — jis ir toliau naudoja `_meta` / aplinkos atsarginių šaltinių grandinę.

---

## Aplinkos kintamieji

| Kintamasis                              | Numatytoji reikšmė             | Paskirtis                                                                                                                                                             |
| :-------------------------------------- | :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`       | Bazinis URL, kurį MCP serveris naudoja iškviesdamas vidines OmniRoute API                                                                                             |
| `OMNIROUTE_API_KEY`                     | (tuščia)                       | API raktas, persiunčiamas kaip `Authorization: Bearer` vidinėms API užklausoms                                                                                        |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (įjungia tik `"true"`) | Kai įjungta, trūkstamos aprėptys neleidžia iškviesti įrankių, o audito žurnale įrašoma `scope_denied:<reason>`                                                        |
| `OMNIROUTE_MCP_SCOPES`                  | (tuščia)                       | Kableliais atskirtas aprėpčių, kurios pagal numatytąją nuostatą laikomos „pasiekiamomis“, leidžiamasis sąrašas (naudojamas, kai iškvietėjas nepateikia savo aprėpčių) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nenustatyta = įjungta)        | Nustačius `0/false/off/no`, išjungiamas MCP aprašų glaudinimas registracijos metu                                                                                     |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nenustatyta = įjungta)        | Alternatyvus pirmiau nurodyto perjungiklio pseudonimas                                                                                                                |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                        | Nutraukimo laiko limitas vidinėms valdymo skaitymo operacijoms (būklė, atsparumas, deriniai, kvota, naudojimas)                                                       |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                        | Nutraukimo laiko limitas etapams, kurie laukia paslaugų teikėjo (`route_request`, `web_search`, `web_fetch`)                                                          |
| `MCP_TOOL_DENY`                         | (nenustatyta = nėra filtro)    | Kableliais atskirti įrankių pavadinimai, kuriuos reikia pašalinti iš `tools/list` (įrankių kardinalumo mažinimas — žr. toliau)                                        |
| `MCP_TOOL_ALLOW`                        | (nenustatyta = nėra filtro)    | Kableliais atskirti įrankių pavadinimai, kuriuos reikia išimtinai palikti (leidžiamojo sąrašo režimas — žr. toliau)                                                   |
| `DATA_DIR`                              | `~/.omniroute`                 | Gyvybingumo signalų failas įrašomas į `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                                        |

---

## Aprašų glaudinimas

MCP įrankių, užklausų ir išteklių registrai gali glaudinti aprašus registracijos ir (arba) sąrašo sudarymo metu, kad sumažėtų klientams pateikiamų metaduomenų apimtis (o kartu ir užklausos konteksto sąnaudos). Realizacija yra faile `open-sse/mcp-server/descriptionCompressor.ts` ir integruota į MCP serverį naudojant `compressMcpRegistryMetadata` funkcijoje `createMcpServer()`.

- Aprašo tekstas glaudinamas naudojant Caveman taisyklių rinkinį (`getRulesForContext("all", "full")`) ir išskiriant išsaugotinus blokus (kodo fragmentus, aptvertus blokus ir kt.), todėl struktūrinis turinys nekeičiamas.
- Kiekviename diegime šią funkciją galima perjungti naudojant `compression.mcpDescriptionCompressionEnabled` reikšmę `key_value` nustatymų lentelėje (numatytoji reikšmė: įjungta) — naudotojo sąsajoje ji pateikiama kaip **Analitika → MCP aprašų glaudinimas**.
- Viso proceso mastu šią funkciją galima perjungti naudojant `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` arba `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Realaus laiko statistika pateikiama per `omniroute_compression_status`, skiltyje `analytics.mcpDescriptionCompression`, ir pažymima `source: "mcp_metadata_estimate"`, kad būtų galima atskirti nuo faktinių paslaugų teikėjo naudojimo kvitų.

---

## Įrankių kardinalumo mažinimas (F4.3)

Aprašų glaudinimas sumažina kiekvieno įrankio metaduomenų apimtį; **įrankių kardinalumo mažinimas** žengia dar vieną žingsnį ir sumažina _paskelbiamų_ įrankių skaičių. Pateikiant mažiau įrankių `tools/list` manifeste, sumažinamos kiekvienos užklausos žymų sąnaudos, kurias kliento modelis patiria dėl įrankių katalogo („5 sluoksnio“ glaudinimas). Įgyvendinimas yra grynas, būsenos nekaupiantis filtras faile `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), integruotas į registravimo ciklą funkcijoje `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Pasirenkama funkcija, pagal numatytuosius nustatymus išjungta.** Filtras vykdomas tik tada, kai nustatytas bent vienas iš dviejų aplinkos kintamųjų; jei nenustatytas nė vienas, visi 110 įrankių paskelbiami nepakeisti.

| Kintamasis       | Režimas                                                                                                  |
| :--------------- | :------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Juodasis sąrašas — kableliais atskirti įrankių pavadinimai, kurie visada pašalinami iš `tools/list`      |
| `MCP_TOOL_ALLOW` | Leidžiamųjų sąrašas — kableliais atskirti įrankių pavadinimai; paliekami tik jie, o visa kita pašalinama |

`deny` turi pirmenybę prieš `allow`. Pavadinimai atskiriami kableliais, pašalinami jų pradžioje ir pabaigoje esantys tarpai, o tušti įrašai ignoruojami. Pavyzdžiai:

```bash
# Pašalinti du įrankius iš katalogo
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Paskelbti tik maršruto parinkimo ir kvotų įrankius (leidžiamųjų sąrašo režimas)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Kaip pašalinami išfiltruoti įrankiai:** registracija visada pavyksta; profilio atmestam įrankiui tada MCP SDK deskriptoriuje iškviečiamas `.disable()`, todėl jis niekada nepasirodo `tools/list`, tačiau susiejimas išlieka nepakitęs (tvarkingas įjungimas ir išjungimas, be pakartotinės registracijos). Profilio analizatorius yra `readMcpToolProfileFromEnv(process.env)`, kuris grąžina `null` (nefiltruojama), kai abu kintamieji yra tušti.

Išsamesnė `ToolProfile` struktūra, naudojama už `reduceToolManifest`, taip pat palaiko filtravimą pagal aprėpčių sankirtą (`allowScopes`, su `read:*` tipo pakaitos simbolių atitiktimi) ir deterministinę `maxTools` ribą, tačiau šioms dviem parinktims registravimo metu reikia viso manifesto, todėl šiuo metu jos **nepasiekiamos** per aplinkos kintamuosius (`tools/list` lygmens sąsaja suplanuota kaip tolesnis darbas). `estimateManifestTokens()` galima naudoti manifesto žymų sąnaudoms prieš sumažinimą ir po jo palyginti.

---

## Vykdymo aplinkos gyvybingumo signalas

Stdio transportas kas 5 sekundes įrašo gyvybingumo būseną į `${DATA_DIR}/runtime/mcp-heartbeat.json`. Valdymo skydelis (`/api/mcp/status`) nuskaito šį failą ir PID gyvybingumo būseną, kad nustatytų `online`. HTTP transportai vietoje to pateikia būseną iš tame pačiame procese veikiančios `getMcpHttpStatus()` funkcijos (failas nerašomas).

Gyvybingumo signalo momentinėje kopijoje yra:

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

## Audito registravimas

Kiekvienas įrankio iškvietimas registruojamas SQLite lentelėje `mcp_tool_audit`, naudojant `open-sse/mcp-server/audit.ts`:

- Įrankio pavadinimas, argumentai (maišos reikšmės apskaičiuotos arba sutrumpinti pagal kiekvieno įrankio `auditLevel`), rezultatas
- Trukmė milisekundėmis, sėkmės arba nesėkmės žymė, klaidos pranešimas (kai taikoma)
- API rakto maišos reikšmė, laiko žyma
- Aprėpčių atmetimai registruojami kaip `scope_denied:<reason>` kartu su trūkstamų aprėpčių sąrašu

Naujausius iškvietimus tikrinkite valdymo skydelyje arba naudodami `/api/mcp/audit` ir `/api/mcp/audit/stats` REST galinius taškus.

---

## Failai

| Failas                                                                   | Paskirtis                                                                                  |
| :----------------------------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP serverio gamykla, stdio įvesties taškas, registracijos pagal sritis                    |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP transportas (sesijų valdymas)                                        |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Įrankių sričių vertinimas ir kvietėjo nustatymas                                           |
| `open-sse/mcp-server/audit.ts`                                           | Įrankių iškvietimų audito registravimas (`mcp_tool_audit`)                                 |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio gyvybingumo signalo rašymas (`mcp-heartbeat.json`)                                   |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Įrankių / užklausų / išteklių registrų aprašų glaudinimas                                  |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod schemos + įrankių registras (`MCP_TOOLS`, 45 įrašai)                                   |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | 2 etapo + podėlio + 1proxy įrankių apdorojimo funkcijos                                    |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Glaudinimo įrankių apdorojimo funkcijos                                                    |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Atminties įrankių apibrėžtys (3 įrankiai)                                                  |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Įgūdžių įrankių apibrėžtys (4 įrankiai)                                                    |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Notion konteksto šaltinio įrankių apibrėžtys (6 įrankiai)                                  |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Žaidybinimo įrankių apibrėžtys (8 įrankiai)                                                |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Papildinių registravimo ir valdymo įrankiai (8 įrankiai)                                   |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status` galinis taškas                                                           |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools` galinis taškas                                                            |
| `src/app/api/mcp/sse/route.ts`                                           | `/api/mcp/sse` SSE transporto maršrutas                                                    |
| `src/app/api/mcp/stream/route.ts`                                        | `/api/mcp/stream` Streamable HTTP transporto maršrutas                                     |
| `src/app/api/mcp/audit/route.ts`                                         | `/api/mcp/audit` audito žurnalo užklausa                                                   |
| `src/app/api/mcp/audit/stats/route.ts`                                   | `/api/mcp/audit/stats` agreguota audito metrika                                            |
| `src/lib/notion/api.ts`                                                  | Notion REST API klientas (pakartotiniai bandymai, skirtasis laikas, klaidų klasifikavimas) |
| `src/lib/db/notion.ts`                                                   | Notion prieigos rakto išsaugojimas (`key_value` lentelė)                                   |
| `src/app/api/settings/notion/route.ts`                                   | Notion nustatymų API (GET/POST/DELETE)                                                     |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Notion prieigos rakto valdymo naudotojo sąsaja                                             |
| `tests/unit/notion-api.test.ts`                                          | Notion API kliento testai (7)                                                              |
| `tests/unit/notion-tools.test.ts`                                        | Notion įrankių sričių taikymo testai (10)                                                  |
| `tests/unit/db/notion.test.mjs`                                          | Notion DB modulio testai (3)                                                               |
