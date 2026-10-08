# OmniRoute MCP Server Documentation (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Server Model Context Protocol cu 110 instrumente pentru operațiuni de rutare, cache, compresie, memorie, abilități, proxy, pool, Radar și surse de context.
>
> Sursa de adevăr: `open-sse/mcp-server/server.ts` calculează **110 instrumente unice** cu `countUniqueMcpTools()`: 45 de definiții canonice (inclusiv cele șase instrumente pentru ciclul de viață CCR, trioul agent-skills, `omniroute_radar_catalog` și `omniroute_x_search`), plus memorie (3), abilități (4), abilități GitHub (3), pool (6), gamificare (8), pluginuri (8), Notion (6), Obsidian (22), corpus local (3) și două instrumente de compresie exclusiv RTK.

## Instalare

OmniRoute MCP este integrat. Porniți-l cu:

```bash
omniroute --mcp
```

Sau prin transportul open-sse:

```bash
# Transport HTTP cu streaming (portul 20130)
omniroute --dev  # MCP pornește automat la endpoint-ul /mcp
```

Transporturile HTTP (`sse` / `streamable-http`, furnizate în același proces de serverul tabloului de bord) sunt
dezactivate în mod implicit și, anterior, puteau fi comutate numai din pagina `/dashboard/mcp`. Începând cu v3.8.51,
CLI-ul oferă funcționalitate echivalentă:

```bash
omniroute mcp status                                  # activat/online, transport, numărul de instrumente
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resetează sesiunile sse/streamable-http active
```

`mcp enable`/`mcp disable` trimit o solicitare PATCH pentru aceeași setare `mcpEnabled` (și, opțional, `mcpTransport`)
pe care tabloul de bord o comută prin `/api/settings`. `mcp restart` apelează `POST /api/mcp/restart`: închide
sesiunile `sse`/`streamable-http` active, astfel încât următoarea solicitare să efectueze o reinițializare curată, returnează
`409` dacă MCP este dezactivat și `501` pentru transportul `stdio` (clienții stdio își gestionează propriul
subproces — nu există niciun identificator intern de proces care să poată fi repornit).

## Transporturi

Serverul MCP expune trei transporturi, toate bazate pe aceeași fabrică `createMcpServer()`:

| Transport         | Unde                                         | Când se utilizează                                          |
| :---------------- | :------------------------------------------- | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`              | Integrări IDE (Claude Desktop, Cursor etc.)                 |
| `sse`             | `POST/GET /api/mcp/sse` prin `httpTransport` | Clienți browser/agent care necesită un flux de evenimente   |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`            | Clienți HTTP cu sesiuni multiple (antetul `mcp-session-id`) |

Transportul HTTP activ (`sse` sau `streamable-http`) este selectat prin setarea `mcpTransport`. Schimbarea transportului închide sesiunile existente pe celălalt transport.

### Acces de la distanță (ocolire prin domeniul manage)

`/api/mcp/*` se află în nivelul LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — în mod implicit, numai gazdele loopback (`localhost`, `127.0.0.1`, `::1`) îl pot accesa. Începând cu v3.8.2, clienții non-loopback se pot conecta dacă prezintă un antet `Authorization: Bearer <api-key>` a cărui cheie include domeniul `manage`. Aceasta este singura modalitate de a accesa serverul MCP de la distanță printr-un tunel, un proxy invers sau un nume de gazdă public.

```bash
# Acordați domeniul manage: deschideți pagina API Keys din tabloul de bord și activați
# „Management Access” pentru cheie sau trimiteți POST cu scopes:["manage"] la creare.

# Apoi conectați-vă de la un client MCP aflat la distanță:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

O cheie fără domeniul manage (sau absența Bearer) returnează `403 LOCAL_ONLY`. Prefixul înrudit `/api/cli-tools/runtime/*` NU poate fi ocolit în mod intenționat — consultați [Nivelurile de protecție a rutelor — excepția pentru domeniul manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Configurarea IDE-ului

Consultați [Configurarea clientului MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration) pentru configurarea Claude Desktop,
Cursor, Cline și a clienților MCP compatibili.

---

## Instrumente esențiale (14) — Faza 1

| Instrument                      | Domenii               | Descriere                                                                                                                                |
| :------------------------------ | :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Durata de funcționare, memoria, întrerupătoarele de circuit, limitele de rată, statisticile cache-ului                                   |
| `omniroute_list_combos`         | `read:combos`         | Toate combinațiile configurate, împreună cu strategiile (metrici opționale)                                                              |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metrici de performanță pentru o anumită combinație                                                                                       |
| `omniroute_switch_combo`        | `write:combos`        | Activează sau dezactivează o combinație                                                                                                  |
| `omniroute_create_combo`        | `write:combos`        | Creează o combinație validată prin API-ul existent pentru combinații                                                                     |
| `omniroute_check_quota`         | `read:quota`          | Cotă utilizată/totală, procent rămas, momentul resetării, starea tokenului                                                               |
| `omniroute_route_request`       | `execute:completions` | Trimite o solicitare de completare a conversației prin rutarea OmniRoute                                                                 |
| `omniroute_cost_report`         | `read:usage`          | Raport de costuri pe perioadă (sesiune/zi/săptămână/lună)                                                                                |
| `omniroute_list_models_catalog` | `read:models`         | Catalog complet de modele, cu funcționalități, stare și prețuri                                                                          |
| `omniroute_radar_catalog`       | `read:radar`          | Catalog Radar local semnat; filtre opționale după furnizor/familie                                                                       |
| `omniroute_tool_search`         | `read:tools`          | Descoperă instrumente din catalogul MCP înregistrat                                                                                      |
| `omniroute_web_search`          | `execute:search`      | Căutare pe web prin furnizorii de căutare configurați. Nu pentru X/Twitter.                                                              |
| `omniroute_x_search`            | `execute:search`      | Caută pe X prin xAI/SuperGrok sau alege `xquik-search` pentru rezultate din API-ul Xquik. Necesită acreditări pentru backendul selectat. |
| `omniroute_web_fetch`           | `execute:search`      | Preia conținut web prin furnizorii de preluare configurați                                                                               |

## Instrumente avansate (11) — Faza 2

| Instrument                         | Domenii de acces                     | Descriere                                                                                                                                  |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulare de rutare fără execuție, cu arbore de rezervă                                                                                     |
| `omniroute_set_budget_guard`       | `write:budget`                       | Buget de sesiune cu acțiune de degradare/blocare/alertare                                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Actualizează strategia combinației în timpul rulării (prioritate/ponderată/automată/etc.)                                                  |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Aplică o presetare de reziliență `aggressive` / `balanced` / `conservative`                                                                |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Testează în timp real fiecare furnizor dintr-o combinație, folosind un apel real către serviciul din amonte                                |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metrici per furnizor, cu latențe p50/p95/p99 și starea întrerupătorului de circuit                                                         |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Recomandă o combinație în funcție de tipul sarcinii, cu constrângeri de buget/latență                                                      |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Explică de ce o cerere a fost rutată către un furnizor (factori de punctaj + opțiuni de rezervă)                                           |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Instantaneu complet al sesiunii: cost, tokenuri, modele/furnizori principali, erori, protecție de buget                                    |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnostichează (și, opțional, remediază automat) neconcordanțele bazei de date, precum referințe defecte ale combinațiilor/rânduri orfane |
| `omniroute_sync_pricing`           | `pricing:write`                      | Sincronizează datele de tarifare din surse externe (LiteLLM); acceptă `dryRun`                                                             |

## Instrumente pentru cache (2)

| Instrument              | Domenii de acces | Descriere                                                                 |
| :---------------------- | :--------------- | :------------------------------------------------------------------------ |
| `omniroute_cache_stats` | `read:cache`     | Statistici pentru cache-ul semantic, cache-ul prompturilor și idempotенță |
| `omniroute_cache_flush` | `write:cache`    | Golește cache-ul global sau după semnătură/model                          |

## Instrumente de compresie (13)

| Instrument                          | Domenii de acces    | Descriere                                                                                                                                |
| :---------------------------------- | :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Setări de compresie, rezumat analitic și statistici care țin cont de cache (include metadatele `analytics.mcpDescriptionCompression`)    |
| `omniroute_compression_configure`   | `write:compression` | Configurează modul de compresie, pragul, raportul țintă, păstrarea promptului de sistem și comutatorul pentru compresia descrierilor MCP |
| `omniroute_set_compression_engine`  | `write:compression` | Selectează motorul activ (off/caveman/rtk/stacked) și intensitatea Caveman/RTK                                                           |
| `omniroute_list_compression_combos` | `read:compression`  | Listează combinațiile de compresie denumite și fluxurile lor de motoare                                                                  |
| `omniroute_compression_combo_stats` | `read:compression`  | Analize grupate după combinația de compresie și motor                                                                                    |
| `omniroute_ccr_store`               | `write:compression` | Stochează conținut izolat per apelant în spațiul CCR limitat din memorie și returnează un marcaj plus o referință `ccr://`               |
| `omniroute_ccr_retrieve`            | `read:compression`  | Recuperează integral conținutul CCR sau folosind modurile de început, sfârșit, linii, grep și statistici                                 |
| `omniroute_ccr_inspect`             | `read:compression`  | Inspectează metadatele CCR deținute de apelant fără a returna conținutul                                                                 |
| `omniroute_ccr_list`                | `read:compression`  | Listează metadatele paginate pentru blocurile CCR deținute de apelant                                                                    |
| `omniroute_ccr_delete`              | `write:compression` | Șterge un bloc CCR deținut de apelant                                                                                                    |
| `omniroute_ccr_stats`               | `read:compression`  | Raportează utilizarea memoriei per apelant, contoarele ciclului de viață și limitele spațiului de stocare                                |
| `omniroute_rtk_discover`            | `read:compression`  | Descoperă zgomotul recurent în eșantioanele de ieșire RTK incluse voluntar                                                               |
| `omniroute_rtk_learn`               | `read:compression`  | Generează o versiune preliminară revizuibilă a filtrului RTK din eșantioanele incluse voluntar                                           |

Intrările CCR sunt păstrate doar în memorie și dispar la repornire. Fiecare bloc este limitat la 2 MiB, fiecare
principal la 16 MiB, iar spațiul de stocare global la 64 MiB. În mod implicit, intrările au un TTL de 24 de ore (maximum
șapte zile). Recuperarea MCP integrală este limitată la 256 KiB; blocurile mai mari rămân disponibile prin
modurile cu intervale și grep. Stocarea, recuperarea, listarea, inspectarea, ștergerea și statisticile sunt izolate în funcție de
principalul cheii API autentificate. Înregistrările de audit conțin hash-uri și metadate privind dimensiunea, niciodată conținutul.

`omniroute_compression_status` raportează separat compresia descrierilor MCP în
`analytics.mcpDescriptionCompression`. Valorile respective sunt estimări ale dimensiunii metadatelor pentru descrierile MCP care pot fi listate
(`tools`, `prompts`, `resources` și `resourceTemplates`); acestea nu sunt înregistrări ale utilizării furnizorului
și sunt marcate cu `source: "mcp_metadata_estimate"`.

### Filtrul arborelui de accesibilitate MCP (v3.8.0)

Separat de instrumentele de compresie de mai sus, OmniRoute include un filtru post-execuție care
comprimă **rezultatele instrumentelor** MCP pentru browser/accesibilitate înainte ca acestea să fie returnate
agentului. Acest filtru nu este el însuși un instrument — rulează transparent pentru orice rezultat al unui instrument care conține
text detaliat al arborelui de accesibilitate sau al instantaneului browserului (≥2000 de caractere).

Comportamente principale:

- Restrânge ≥30 de linii-surori consecutive repetate într-un rezumat cu începutul + sfârșitul
- Păstrează ancorele `[ref=eXX]` necesare pentru Playwright/utilizarea computerului
- Trunchiază forțat textul supradimensionat (>50.000 de caractere), incluzând un indiciu de navigare
- Economii estimate: **60–80%** pentru sarcinile utile ale instantaneelor browserului

Configurare: `compression.mcpAccessibility` în setările globale (migrarea 056).
Implementare: `open-sse/services/compression/engines/mcpAccessibility/`.
Documentație completă: [Motoare de compresie — Filtrul arborelui de accesibilitate MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Consultați [Motoare de compresie](../compression/COMPRESSION_ENGINES.md) și [Compresia RTK](../compression/RTK_COMPRESSION.md) pentru
modelul de compresie la execuție pe care se bazează aceste instrumente.

## Instrumente 1Proxy (3)

| Instrument                  | Domenii        | Descriere                                                                                  |
| :-------------------------- | :------------- | :----------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Preia proxy-uri gratuite de pe piața 1proxy (filtre după protocol/țară/calitate/limită)    |
| `omniroute_oneproxy_rotate` | `read:proxies` | Obține următorul proxy disponibil conform strategiei (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistici despre grup, starea sincronizării și distribuția în funcție de protocol și țară |

## Instrumente de memorie (3)

Definite în `open-sse/mcp-server/tools/memoryTools.ts`. Autentificarea/domeniul de acces sunt aplicate prin mecanismul standard pentru domenii MCP.

| Instrument                | Domenii        | Descriere                                                                                         |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | Caută în memorii după interogare / tip / cheie API, cu aplicarea limitei bugetului de tokenuri    |
| `omniroute_memory_add`    | `write:memory` | Adaugă o nouă intrare în memorie (`factual` / `episodic` / `procedural` / `semantic`)             |
| `omniroute_memory_clear`  | `write:memory` | Șterge memoriile pentru o cheie API, filtrate opțional după tip sau marcajul temporal `olderThan` |

## Instrumente pentru abilități (4)

Definite în `open-sse/mcp-server/tools/skillTools.ts`. Susținute de `src/lib/skills/registry` + `src/lib/skills/executor`.

| Instrument                    | Domenii          | Descriere                                                                                       |
| :---------------------------- | :--------------- | :---------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Listează abilitățile înregistrate, cu filtrare opțională după cheia API, nume sau starea activă |
| `omniroute_skills_enable`     | `write:skills`   | Activează sau dezactivează o anumită abilitate după ID                                          |
| `omniroute_skills_execute`    | `execute:skills` | Execută o abilitate cu datele de intrare furnizate și returnează înregistrarea execuției        |
| `omniroute_skills_executions` | `read:skills`    | Listează istoricul recent al execuțiilor abilităților                                           |

## Sursă de context Notion (6)

Definită în `open-sse/mcp-server/tools/notionTools.ts`. Tokenul este stocat în tabelul `key_value` prin `src/lib/db/notion.ts`. Clientul REST se află în `src/lib/notion/api.ts`. API-ul pentru setări se află în `src/app/api/settings/notion/route.ts`. Interfața panoului de control se află în `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Configurați tokenul integrării Notion din fila **Surse de context** din panoul de control al punctului final sau prin API-ul REST:

```bash
# Setați tokenul
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Verificați starea
curl http://localhost:20128/api/settings/notion

# Deconectați
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Instrument                   | Domenii        | Descriere                                                                       |
| :--------------------------- | :------------- | :------------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Caută în textul integral al tuturor paginilor și bazelor de date                |
| `notion_get_page`            | `read:notion`  | Obține o pagină după ID, împreună cu proprietățile acesteia                     |
| `notion_list_block_children` | `read:notion`  | Listează blocurile copil ale unei pagini sau ale unui bloc                      |
| `notion_query_database`      | `read:notion`  | Interoghează o bază de date folosind filtre, sortări și paginare                |
| `notion_get_database`        | `read:notion`  | Obține schema bazei de date după ID                                             |
| `notion_append_blocks`       | `write:notion` | Adaugă blocuri copil la un bloc părinte (maximum 100 pentru fiecare solicitare) |

## Instrumente pentru catalogul de abilități ale agenților (3)

Definite în `open-sse/mcp-server/tools/agentSkillTools.ts`. Susținute de `src/lib/agentSkills/catalog`. Aceste instrumente expun catalogul de documentație cu 45 de intrări pentru abilitățile agenților către clienții MCP și agenții externi. Domeniu: `read:catalog`.

| Instrument                        | Domenii        | Descriere                                                                                                                                                                  |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Listează toate cele 45 de abilități ale agenților, cu filtre opționale `category` (api\|cli) și `area`; returnează metadate + acoperire                                    |
| `omniroute_agent_skills_get`      | `read:catalog` | Obține metadatele complete + conținutul SKILL.md pentru o singură abilitate, pe baza `id`-ului canonic                                                                     |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statistici de acoperire: câte dintre cele 23 de abilități API, 21 CLI și 1 de configurare au fișiere SKILL.md în sistemul de fișiere, comparativ cu totalurile din catalog |

Consultați [AGENT-SKILLS.md](./AGENT-SKILLS.md) pentru catalogul complet și modul în care îl utilizează agenții externi.

## Cadre conexe (v3.8.0)

Inventarul de instrumente MCP de mai sus (110 instrumente unice, calculat de `countUniqueMcpTools()`) este în mod intenționat
limitat la operațiunile de rutare/cache/comprimare/memorie/abilități/proxy/surse de context din timpul execuției. Două cadre adiacente
sunt livrate împreună cu serverul MCP în v3.8.0 și sunt documentate separat:

### Agenți cloud

Agenții cloud sunt agenți AI de programare care rulează în afara procesului (codex-cloud, cursor-cloud, devin, jules), integrați în
OmniRoute prin același model de conexiune utilizat pentru furnizorii LLM. Aceștia sunt expuși prin
propria interfață REST (`/api/v1/agents/*`) și **nu** fac parte din catalogul de instrumente MCP
— apelarea unui agent cloud nu consumă un domeniu MCP.

- Implementare: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Ciclu de viață: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Documentație: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Mecanisme de protecție

Mecanismele de protecție sunt filtre pre/post-execuție (vision-bridge, pii-masker, prompt-injection)
aplicate în interiorul fluxului de chat. Acestea rulează înainte ca nivelul instrumentelor/rutelor MCP să fie accesat
și emit încălcări structurate către fluxul de audit; nu sunt invocate ca instrumente MCP.

- Implementare: `src/lib/guardrails/`.
- Documentație: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Atunci când depanați un apel MCP care pare blocat, verificați atât jurnalul de audit MCP
(intrările `scope_denied:*`), cât și istoricul de audit al mecanismelor de protecție — o cerere poate fi respinsă de
un mecanism de protecție **înainte** de a ajunge la nivelul de aplicare a domeniilor MCP.

---

## Endpointuri API REST

| Endpoint               | Metodă                | Descriere                                                                                                 | Autentificare                |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------- | :--------------------------- |
| `/api/mcp/status`      | `GET`                 | Starea serverului: semnal de activitate, starea transportului HTTP, rezumatul activității de audit        | Administrare (sesiune/admin) |
| `/api/mcp/tools`       | `GET`                 | Catalogul de instrumente (nume, descriere, domenii, fază, endpointuri sursă)                              | Administrare                 |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint de transport SSE (condiționat de `mcpEnabled` + `mcpTransport === "sse"`)                        | Cheie API + domenii          |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Transport HTTP cu streaming (utilizează antetul `mcp-session-id`; `DELETE` încheie sesiunea)              | Cheie API + domenii          |
| `/api/mcp/audit`       | `GET`                 | Intrări din jurnalul de audit `mcp_tool_audit` (filtre: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Administrare                 |
| `/api/mcp/audit/stats` | `GET`                 | Statistici de audit agregate (`totalCalls`, `successRate`, `avgDurationMs`, instrumentele principale)     | Administrare                 |

Fișiere sursă: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Atât transportul SSE, cât și transportul HTTP cu streaming sunt blocate până când serverul MCP este activat în Setări (`mcpEnabled`) și este selectat `mcpTransport` corespunzător. Dacă este configurat transportul greșit, ruta returnează HTTP 400 cu o sugestie de modificare a setărilor.

---

## Autentificare și Scopes

Instrumentul MCP citește șirurile de scope de la apelant. Această verificare este unul dintre cele trei spații de nume independente. O trecere de la un verificator nu este o trecere de la ceilalți. Regulile sunt [Trei spații de nume pentru scope](#trei-spații-de-nume-pentru-scope). Catalogul de instrumente este [Scopes pentru instrumentul MCP](#scopes-pentru-instrumentul-mcp).

### Trei spații de nume pentru scope

`manage` pe o cheie API, `read:compression` pe un instrument MCP și `read` pe un token de acces `oma_live_…` sunt trei granturi diferite. Apelanții care trimit un token de acces `read` către o rută de management care modifică datele primesc HTTP 403 `Access token scope 'read' is insufficient; 'write' required.` Acest rang este `scopeSatisfies`. Nu consultă tabelul MCP, iar potrivitorul MCP nu îl consultă.

| Spațiu de nume        | Credențial                                                       | Verificator            | O trecere permite                                            |
| :-------------------- | :--------------------------------------------------------------- | :--------------------- | :----------------------------------------------------------- |
| Management cheie API  | `api_keys.scopes`                                                | `hasManageScope`       | REST de management pentru acea cheie Bearer                  |
| Aditiv cheie API      | același array, un șir exact                                      | ajutorul numit mai jos | Doar acea capacitate                                         |
| Scopes instrument MCP | același array, altfel MCP `_meta`, altfel `OMNIROUTE_MCP_SCOPES` | `scopeMatches`         | Acel instrument, odată ce aplicarea este activată            |
| Token de acces        | `oma_live_…`                                                     | `scopeSatisfies`       | Ruta de management a cărei metodă și cale necesită acel rang |

Crearea fiecărui credențial este acoperită în [Autentificare Management](../guides/MANAGEMENT-AUTH.md).

#### Scopes cheie API

Un array `api_keys.scopes` alimentează două sarcini. Acestea utilizează funcții diferite.

**REST de management.** `manage` și `admin` sunt membrii `MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`). `hasManageScope` este ceea ce autorizează rutele de management pentru acea cheie. `admin` are capacități de management pe acele rute. Cuvântul `admin` aici nu este rangul tokenului de acces și nu se extinde în scopes-urile instrumentului MCP.

**Șiruri aditive.** Fiecare este un test de membru exact, și fiecare rămâne în afara `MANAGEMENT_API_KEY_SCOPES`.

| Scope                          | O trecere permite                                                                                                                                                          |
| :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Excepția non-loopback `/api/mcp/` LOCAL_ONLY (`hasMcpConnectOrManageScope`). O cheie cu `manage` sau `admin` trece totuși de acea excepție.                                |
| `self:usage`                   | `GET /api/v1/me/status` pentru această cheie (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` adaugă acest scope la creare (`normalizeSelfServiceScopesForCreate`). |
| `self:account-quota`           | Cotele de cont upstream în acel payload de stare (`src/lib/usage/apiKeySelfService.ts`). Ruta de stare necesită în continuare `self:usage`.                                |
| `policy:bypass-provider-quota` | Apelurile de inferență ale acestei chei sar peste politica de cotă a furnizorului (`hasProviderQuotaBypassScope` în `src/sse/handlers/chat.ts`).                           |

#### Potrivire

Catalogul este tabelul de sub [Scopes pentru instrumentul MCP](#scopes-pentru-instrumentul-mcp). Nu tratați `MCP_SCOPE_LIST` din `src/shared/constants/mcpScopes.ts` ca acel catalog: este subsetul tipizat original. Instrumentele ulterioare declară scopes suplimentare pe lângă acesta (`read:notion`, `read:skills`, `read:local-corpus` și restul tabelului).

`evaluateToolScopes` din `open-sse/mcp-server/scopeEnforcement.ts` permite un apel atunci când fiecare scope necesar se potrivește cu un scope acordat:

- `*` se potrivește cu fiecare scope necesar.
- Un scope acordat care se termină cu `*` se potrivește cu un scope necesar care începe cu prefixul dinaintea asteriscului. `read:*` se potrivește cu `read:compression`.
- Fiecare alt scope acordat se potrivește doar cu șirul necesar identic.

O cheie ale cărei scopes sunt `["manage"]` eșuează `scopeMatches` pentru `read:compression`. Același apel eșuează pentru `admin`, `mcp:connect`, `read` și `write` atunci când acestea sunt singurele șiruri acordate. Nu există o ierarhie între scopes-urile instrumentului MCP dincolo de `*` final.

Aplicarea este dezactivată dacă `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (implicit `false`). Cât timp este dezactivată, `evaluateToolScopes` permite apelul și sare peste catalog. Cât timp este activată, HTTP utilizează `api_keys.scopes` ale cheii Bearer ca `authInfo` (vezi [Legarea scope-ului HTTP per-cheie](#legarea-scope-ului-http-per-cheie-7895)). Când niciun scope de cheie nu se rezolvă, setul acordat trece la MCP `_meta`, apoi `OMNIROUTE_MCP_SCOPES`.

#### Scopes token de acces

Tokenurile `oma_live_…` (`src/lib/accessTokens/scopes.ts`) poartă `read`, `write` sau `admin`. `scopeSatisfies` este un rang: `admin` acoperă `write` și `read`, iar `write` acoperă `read`. Scopes-urile necunoscute nu acoperă nimic.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) compară acel rang cu `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` și `OPTIONS` necesită `read`.
- Fiecare altă metodă necesită `write`.
- Căile din `ADMIN_SCOPE_PREFIXES` necesită `admin` pentru fiecare metodă. `/api/mcp` este pe acea listă, deci un token de acces `write` nu poate apela în continuare suprafața HTTP a MCP.
- Căile din `ADMIN_MUTATION_PREFIXES` necesită `admin` doar pentru mutații.

`PATCH /api/keys/{id}` este o mutație și nu se află pe acele liste de administratori, deci un token de
`read` primește 403
`Domeniul tokenului de acces 'read' este insuficient; este necesar 'write'.`
Un token de acces `write` sau `admin` satisface această rută. Un JWT de tablou de bord,
tokenul machine-id al CLI-ului loopback și o cheie API cu `manage` sau `admin` iau
alte ramuri și nu sunt restrânse de acest rang.

Un token de acces care trece `scopeSatisfies` pentru `/api/mcp` a trecut doar
poarta de management. Apelurile instrumentelor rulează în continuare `scopeMatches`
împotriva domeniilor cheilor API. Rangul tokenului de acces nu este o intrare pentru `scopeMatches`.

### Domeniile instrumentelor MCP

Aplicarea domeniului este centralizată în `open-sse/mcp-server/scopeEnforcement.ts`.
Fiecare instrument necesită domenii specifice:

| Scop                  | Instrumente                                                                                                                                                                             |
| :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                       |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                               |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                  |
| `read:quota`          | `check_quota`                                                                                                                                                                           |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                  |
| `read:models`         | `list_models_catalog`                                                                                                                                                                   |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                           |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                   |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                      |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                             |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                          |
| `read:cache`          | `cache_stats`                                                                                                                                                                           |
| `write:cache`         | `cache_flush`                                                                                                                                                                           |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                              |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                       |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                   |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                        |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                  |
| `read:memory`         | `memory_search`                                                                                                                                                                         |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                            |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                      |
| `write:skills`        | `skills_enable`                                                                                                                                                                         |
| `execute:skills`      | `skills_execute`                                                                                                                                                                        |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                        |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                                 |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                               |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                        |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                          |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                      |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                         |
| `read:obsidian`       | 13 instrumente de citire — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 instrumente de scriere — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …               |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                       |

Sunt acceptate scope-uri wildcard: `read:*` acordă toate scope-urile de citire, `*` acordă acces complet.

### `mcp:connect` — capacitate de rută îngustă (#7895)

Atingerea transportului HTTP/SSE MCP (`/api/mcp/*`) din afara loopback-ului necesită excepția LOCAL_ONLY `/api/mcp/` (vezi `docs/security/ROUTE_GUARD_TIERS.md`). Istoric, acea excepție accepta doar o cheie API cu scope `manage`/`admin` complet — prea largă pentru un apelant care are nevoie doar să comunice cu MCP. `src/shared/constants/managementScopes.ts` exportă acum `MCP_CONNECT_SCOPE = "mcp:connect"`: un scope aditiv, îngust (același precedent ca `SELF_USAGE_SCOPE`) care autorizează DOAR ocolirea `/api/mcp/` în `src/server/authz/policies/management.ts` — nu acordă niciun alt acces la rutele de management și este păstrat în mod deliberat ÎN AFARA `MANAGEMENT_API_KEY_SCOPES`. O cheie care deține `manage`/`admin` trece în continuare de excepție neschimbată; `mcp:connect` este o alternativă cu privilegii mai mici pentru apelurile MCP-only la distanță, verificată prin `hasMcpConnectOrManageScope()`.

### Legarea scope-ului HTTP per-cheie (#7895)

Peste HTTP/SSE, `open-sse/mcp-server/httpTransport.ts` rezolvă acum `api_keys.scopes` real al apelantului prin `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`) și îl transmite către `transport.handleRequest(req, { authInfo })` al SDK-ului MCP, astfel încât `extra.authInfo.scopes` care ajunge la fiecare apel de instrument reflectă scope-urile cheii Bearer. `resolveCallerScopeContext()` din `scopeEnforcement.ts` a prioritizat deja `authInfo` față de `_meta` și fallback-ul de mediu `OMNIROUTE_MCP_SCOPES` — aceasta doar populează acea primă sursă, cu cea mai mare prioritate, care anterior nu era alimentată prin HTTP. Când nicio cheie API nu se rezolvă (fără antet, cheie invalidă), `authInfo` rămâne `undefined` și rezoluția trece la lanțul `meta`/env existent neschimbat. Aceasta NU inversează valoarea implicită a `OMNIROUTE_MCP_ENFORCE_SCOPES` — aplicarea trebuie încă activată explicit; această modificare face doar ca calea per-cheie să aibă prioritate odată ce este activată. stdio nu are identitate per-apelant (vezi `mcpCallerIdentity.ts`) și nu este afectat — rămâne pe lanțul de fallback `_meta`/env.

---

## Variabile de mediu

| Variabilă                               | Valoare implicită                    | Scop                                                                                                                                                    |
| :-------------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`             | URL-ul de bază utilizat de serverul MCP când apelează API-urile interne OmniRoute                                                                       |
| `OMNIROUTE_API_KEY`                     | (gol)                                | Cheia API transmisă ca `Authorization: Bearer` către apelurile API interne                                                                              |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (doar `"true"` îl activează) | Când este activată, absența domeniilor de acces refuză apelurile instrumentelor și înregistrează `scope_denied:<reason>` în jurnalul de audit           |
| `OMNIROUTE_MCP_SCOPES`                  | (gol)                                | Lista de domenii de acces permise, separate prin virgule, considerate implicit „disponibile” (utilizată când apelantul nu furnizează propriile domenii) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nesetat = activat)                  | Când este setată la `0/false/off/no`, dezactivează comprimarea descrierilor MCP în momentul înregistrării                                               |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nesetat = activat)                  | Alias alternativ pentru aceeași opțiune de mai sus                                                                                                      |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                              | Intervalul până la anulare pentru citirile interne de administrare (stare, reziliență, combinații, cotă, utilizare)                                     |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                              | Intervalul până la anulare pentru etapele care așteaptă un furnizor (`route_request`, `web_search`, `web_fetch`)                                        |
| `MCP_TOOL_DENY`                         | (nesetat = fără filtru)              | Numele instrumentelor, separate prin virgule, care trebuie eliminate din `tools/list` (reducerea cardinalității instrumentelor — vezi mai jos)          |
| `MCP_TOOL_ALLOW`                        | (nesetat = fără filtru)              | Numele instrumentelor, separate prin virgule, care trebuie păstrate exclusiv (mod listă de permisiuni — vezi mai jos)                                   |
| `DATA_DIR`                              | `~/.omniroute`                       | Fișierul de semnalizare periodică este scris în `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                |

---

## Comprimarea descrierilor

Registrele MCP de instrumente, prompturi și resurse pot comprima descrierile în momentul înregistrării/listării pentru a reduce volumul de metadate expus clienților (și, prin urmare, costul contextului promptului). Implementarea se află în `open-sse/mcp-server/descriptionCompressor.ts` și este integrată în serverul MCP prin `compressMcpRegistryMetadata` în cadrul `createMcpServer()`.

- Comprimarea este aplicată textului descrierii utilizând setul de reguli Caveman (`getRulesForContext("all", "full")`), cu extragerea blocurilor protejate (secvențe de cod, blocuri delimitate etc.), astfel încât conținutul structural să nu fie modificat.
- Activați sau dezactivați pentru fiecare implementare prin valoarea `compression.mcpDescriptionCompressionEnabled` din tabelul de setări `key_value` (implicit: activată) — disponibilă în interfața cu utilizatorul ca **Analiză → Comprimarea descrierilor MCP**.
- Activați sau dezactivați la nivelul întregului proces prin `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` sau `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Statisticile în timp real sunt expuse prin `omniroute_compression_status` în `analytics.mcpDescriptionCompression` și etichetate cu `source: "mcp_metadata_estimate"` pentru a le diferenția de înregistrările reale de utilizare furnizate de furnizor.

---

## Reducerea cardinalității instrumentelor (F4.3)

Comprimarea descrierilor micșorează metadatele fiecărui instrument; **reducerea cardinalității instrumentelor** merge cu un pas mai departe, reducând _numărul_ instrumentelor anunțate. Publicarea unui număr mai mic de instrumente în manifestul `tools/list` reduce costul în tokenuri per solicitare pe care îl suportă modelul clientului pentru catalogul de instrumente (comprimarea „stratului 5”). Implementarea este un filtru pur, fără stare, în `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), integrat în bucla de înregistrare din `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Opțional, dezactivat implicit.** Filtrul rulează numai atunci când este setată cel puțin una dintre cele două variabile de mediu; dacă niciuna nu este setată, toate cele 110 instrumente sunt anunțate fără modificări.

| Variabilă        | Mod                                                                                                                           |
| :--------------- | :---------------------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Listă neagră — nume de instrumente separate prin virgulă, care sunt întotdeauna eliminate din `tools/list`                    |
| `MCP_TOOL_ALLOW` | Listă de permisiuni — nume de instrumente separate prin virgulă; numai acestea sunt păstrate, toate celelalte fiind eliminate |

`deny` are prioritate față de `allow`. Numele sunt separate prin virgulă, spațiile de la margini sunt eliminate, iar intrările goale sunt ignorate. Exemple:

```bash
# Elimină două instrumente din catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Anunță numai instrumentele de rutare și cotă (mod cu listă de permisiuni)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Cum sunt eliminate instrumentele filtrate:** înregistrarea reușește întotdeauna; unui instrument respins de profil i se aplică apoi `.disable()` pe handle-ul SDK MCP, astfel încât acesta nu apare niciodată în `tools/list`, dar conexiunile rămân intacte (activare/dezactivare curată, fără reînregistrare). Parserul de profil este `readMcpToolProfileFromEnv(process.env)`, care returnează `null` (fără filtrare) atunci când ambele variabile sunt goale.

Structura mai bogată `ToolProfile` din spatele `reduceToolManifest` acceptă și filtrarea prin intersecția domeniilor (`allowScopes`, cu potrivire prin caractere wildcard de tipul `read:*`) și o limită deterministă `maxTools`, însă aceste două opțiuni necesită manifestul complet la momentul înregistrării și **nu** sunt expuse în prezent prin variabilele de mediu (un hook la nivelul `tools/list` este planificat ca îmbunătățire ulterioară). `estimateManifestTokens()` este disponibil pentru compararea costului în tokenuri al manifestului înainte și după reducere.

---

## Semnalul periodic de funcționare

Transportul stdio salvează starea de funcționare în `${DATA_DIR}/runtime/mcp-heartbeat.json` la fiecare 5 secunde. Panoul de control (`/api/mcp/status`) citește acest fișier și verifică dacă PID-ul este activ pentru a determina valoarea `online`. În schimb, transporturile HTTP raportează starea prin `getMcpHttpStatus()` din cadrul procesului (fără scriere în fișier).

Instantaneul semnalului periodic conține:

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

## Jurnalizarea auditului

Fiecare apel de instrument este înregistrat în tabelul SQLite `mcp_tool_audit` de către `open-sse/mcp-server/audit.ts`:

- Numele instrumentului, argumentele (transformate în hash/trunchiate conform `auditLevel` al fiecărui instrument), rezultatul
- Durata în ms, indicatorul de reușită/eșec, mesajul de eroare (dacă este cazul)
- Hash-ul cheii API, marcajul temporal
- Refuzurile legate de domenii sunt înregistrate ca `scope_denied:<reason>`, împreună cu lista domeniilor lipsă

Utilizați panoul de control sau endpointurile REST `/api/mcp/audit` și `/api/mcp/audit/stats` pentru a inspecta apelurile recente.

---

## Fișiere

| Fișier                                                                   | Scop                                                                                               |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Fabrică de servere MCP, punct de intrare stdio, înregistrări de instrumente cu domeniu de aplicare |
| `open-sse/mcp-server/httpTransport.ts`                                   | Transport SSE + HTTP fluxabil (gestionarea sesiunilor)                                             |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Evaluarea domeniului de aplicare al instrumentelor și identificarea apelantului                    |
| `open-sse/mcp-server/audit.ts`                                           | Jurnalizarea de audit a apelurilor instrumentelor (`mcp_tool_audit`)                               |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Proces de scriere a semnalului periodic stdio (`mcp-heartbeat.json`)                               |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Comprimarea descrierilor pentru registrele de instrumente / prompturi / resurse                    |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Scheme Zod + registru de instrumente (`MCP_TOOLS`, 45 de intrări)                                  |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Rutine de gestionare pentru instrumentele din faza 2 + cache + 1proxy                              |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Rutine de gestionare pentru instrumentele de comprimare                                            |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definiții ale instrumentelor de memorie (3 instrumente)                                            |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definiții ale instrumentelor pentru abilități (4 instrumente)                                      |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definiții ale instrumentelor pentru sursa de context Notion (6 instrumente)                        |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definiții ale instrumentelor de gamificare (8 instrumente)                                         |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Instrumente pentru înregistrarea și gestionarea pluginurilor (8 instrumente)                       |
| `src/app/api/mcp/status/route.ts`                                        | Endpoint-ul `/api/mcp/status`                                                                      |
| `src/app/api/mcp/tools/route.ts`                                         | Endpoint-ul `/api/mcp/tools`                                                                       |
| `src/app/api/mcp/sse/route.ts`                                           | Rută de transport SSE `/api/mcp/sse`                                                               |
| `src/app/api/mcp/stream/route.ts`                                        | Rută de transport HTTP fluxabil `/api/mcp/stream`                                                  |
| `src/app/api/mcp/audit/route.ts`                                         | Interogarea jurnalului de audit `/api/mcp/audit`                                                   |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Metrici de audit agregate `/api/mcp/audit/stats`                                                   |
| `src/lib/notion/api.ts`                                                  | Client pentru API-ul REST Notion (reîncercare, expirare, clasificarea erorilor)                    |
| `src/lib/db/notion.ts`                                                   | Persistența tokenului Notion (tabelul `key_value`)                                                 |
| `src/app/api/settings/notion/route.ts`                                   | API pentru setările Notion (GET/POST/DELETE)                                                       |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Interfață pentru gestionarea tokenului Notion                                                      |
| `tests/unit/notion-api.test.ts`                                          | Teste pentru clientul API Notion (7)                                                               |
| `tests/unit/notion-tools.test.ts`                                        | Teste pentru aplicarea domeniului de acces al instrumentelor Notion (10)                           |
| `tests/unit/db/notion.test.mjs`                                          | Teste pentru modulul DB Notion (3)                                                                 |
