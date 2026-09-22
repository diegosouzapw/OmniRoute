# OmniRoute MCP Server Documentation (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol-server met 110 tools voor routering, cache, compressie, geheugen, skills, proxy, pool, Radar en contextbronbewerkingen.
>
> Gezaghebbende bron: `open-sse/mcp-server/server.ts` berekent **110 unieke tools** met `countUniqueMcpTools()`: 45 canonieke definities (inclusief de zes CCR-levenscyclustools, het agent-skills-trio, `omniroute_radar_catalog` en `omniroute_x_search`), plus geheugen (3), skills (4), GitHub-skills (3), pool (6), gamificatie (8), plug-ins (8), Notion (6), Obsidian (22), lokaal corpus (3) en twee compressietools die alleen voor RTK beschikbaar zijn.

## Installatie

OmniRoute MCP is ingebouwd. Start het met:

```bash
omniroute --mcp
```

Of via het open-sse-transport:

```bash
# Streambaar HTTP-transport (poort 20130)
omniroute --dev  # MCP start automatisch op het /mcp-eindpunt
```

De HTTP-transporten (`sse` / `streamable-http`, die in hetzelfde proces door de dashboardserver worden aangeboden) zijn
standaard uitgeschakeld en konden voorheen alleen via de pagina `/dashboard/mcp` worden in- en uitgeschakeld. Sinds v3.8.51
biedt de CLI dezelfde functionaliteit:

```bash
omniroute mcp status                                  # ingeschakeld/online, transport, aantal tools
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # stelt actieve sse/streamable-http-sessies opnieuw in
```

`mcp enable`/`mcp disable` voeren een PATCH uit op dezelfde instelling `mcpEnabled` (en optioneel `mcpTransport`)
die het dashboard via `/api/settings` in- en uitschakelt. `mcp restart` roept `POST /api/mcp/restart` aan: deze opdracht beëindigt
actieve `sse`/`streamable-http`-sessies, zodat het volgende verzoek opnieuw correct wordt geïnitialiseerd, retourneert
`409` als MCP is uitgeschakeld en `501` voor het `stdio`-transport (stdio-clients beheren hun eigen
subproces — er is geen handvat binnen het proces om opnieuw te starten).

## Transporten

De MCP-server biedt drie transporten, allemaal aangestuurd door dezelfde `createMcpServer()`-factory:

| Transport         | Waar                                        | Wanneer te gebruiken                                        |
| :---------------- | :------------------------------------------ | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE-integraties (Claude Desktop, Cursor enz.)               |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | Browser-/agentclients die een eventstream nodig hebben      |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | HTTP-clients met meerdere sessies (`mcp-session-id`-header) |

Het actieve HTTP-transport (`sse` of `streamable-http`) wordt geselecteerd met de instelling `mcpTransport`. Bij het wisselen van transport worden bestaande sessies op het andere transport gesloten.

### Externe toegang (omzeiling met manage-scope)

`/api/mcp/*` bevindt zich in het niveau LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — standaard is het alleen bereikbaar via loopback-hosts (`localhost`, `127.0.0.1`, `::1`). Sinds v3.8.2 kunnen niet-loopbackclients verbinding maken als ze een `Authorization: Bearer <api-key>` meesturen waarvan de sleutel de scope `manage` heeft. Dit is de enige manier om via een tunnel, reverse proxy of openbare hostnaam toegang te krijgen tot de externe MCP-server.

```bash
# Verleen de scope manage: open de pagina API Keys van het dashboard en schakel
# "Management Access" in voor de sleutel, of gebruik POST scopes:["manage"] bij het aanmaken.

# Maak vervolgens verbinding vanaf een externe MCP-client:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Een sleutel zonder de scope `manage` (of zonder Bearer) retourneert `403 LOCAL_ONLY`. Het verwante voorvoegsel `/api/cli-tools/runtime/*` kan bewust NIET worden omzeild — zie [Route Guard-niveaus — uitzondering voor de manage-scope](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE-configuratie

Zie [MCP-clientconfiguratie](../guides/SETUP_GUIDE.md#mcp-client-configuration) voor het instellen van Claude Desktop,
Cursor, Cline en compatibele MCP-clients.

---

## Essentiële tools (14) — Fase 1

| Tool                            | Scopes                | Beschrijving                                                                                                                              |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Uptime, geheugen, circuitbreakers, snelheidslimieten, cachestatistieken                                                                   |
| `omniroute_list_combos`         | `read:combos`         | Alle geconfigureerde combo's met strategieën (optionele metriekgegevens)                                                                  |
| `omniroute_get_combo_metrics`   | `read:combos`         | Prestatiemetriekgegevens voor een specifieke combo                                                                                        |
| `omniroute_switch_combo`        | `write:combos`        | Een combo activeren of deactiveren                                                                                                        |
| `omniroute_create_combo`        | `write:combos`        | Een gevalideerde combo aanmaken via de bestaande combo-API                                                                                |
| `omniroute_check_quota`         | `read:quota`          | Gebruikt/totaal quotum, resterend percentage, resettijd, tokenstatus                                                                      |
| `omniroute_route_request`       | `execute:completions` | Een chatvoltooiing verzenden via de routering van OmniRoute                                                                               |
| `omniroute_cost_report`         | `read:usage`          | Kostenrapport per periode (sessie/dag/week/maand)                                                                                         |
| `omniroute_list_models_catalog` | `read:models`         | Volledige modelcatalogus met mogelijkheden, status en prijzen                                                                             |
| `omniroute_radar_catalog`       | `read:radar`          | Lokale ondertekende Radar-catalogus; optionele filters voor provider/familie                                                              |
| `omniroute_tool_search`         | `read:tools`          | Tools ontdekken in de geregistreerde MCP-catalogus                                                                                        |
| `omniroute_web_search`          | `execute:search`      | Zoeken op het web via de geconfigureerde zoekproviders. Niet voor X/Twitter.                                                              |
| `omniroute_x_search`            | `execute:search`      | X doorzoeken via xAI/SuperGrok, of `xquik-search` kiezen voor resultaten van de Xquik-API. Vereist inloggegevens voor de gekozen backend. |
| `omniroute_web_fetch`           | `execute:search`      | Webinhoud ophalen via de geconfigureerde ophaalproviders                                                                                  |

## Geavanceerde tools (11) — Fase 2

| Tool                               | Scopes                               | Beschrijving                                                                                                        |
| :--------------------------------- | :----------------------------------- | :------------------------------------------------------------------------------------------------------------------ |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Dry-run-routingsimulatie met fallbackstructuur                                                                      |
| `omniroute_set_budget_guard`       | `write:budget`                       | Sessiebudget met actie voor degraderen/blokkeren/waarschuwen                                                        |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Combostrategie tijdens runtime bijwerken (prioriteit/gewogen/automatisch/etc.)                                      |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Vooraf ingestelde veerkrachtconfiguratie `aggressive` / `balanced` / `conservative` toepassen                       |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Livetest van elke provider in een combo met een echte upstream-aanroep                                              |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metrieken per provider met p50/p95/p99-latentie en status van de circuitonderbreker                                 |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Combo aanbevelen per taaktype, met budget- en latentiebeperkingen                                                   |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Uitleggen waarom een aanvraag naar een provider is gerouteerd (scorefactoren + fallbacks)                           |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Volledig sessiemomentopname: kosten, tokens, topmodellen/providers, fouten, budgetbewaking                          |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Databaseafwijkingen diagnosticeren (en optioneel automatisch herstellen), zoals defecte comboverwijzingen/weesrijen |
| `omniroute_sync_pricing`           | `pricing:write`                      | Prijsgegevens synchroniseren vanuit externe bronnen (LiteLLM); ondersteunt `dryRun`                                 |

## Cachetools (2)

| Tool                    | Scopes        | Beschrijving                                                     |
| :---------------------- | :------------ | :--------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Statistieken voor semantische cache, promptcache en idempotentie |
| `omniroute_cache_flush` | `write:cache` | Cache globaal of per handtekening/model leegmaken                |

## Compressietools (13)

| Tool                                | Scopes              | Beschrijving                                                                                                                                  |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Compressie-instellingen, analyseoverzicht en cachebewuste statistieken (inclusief metagegevens van `analytics.mcpDescriptionCompression`)     |
| `omniroute_compression_configure`   | `write:compression` | Compressiemodus, drempelwaarde, doelverhouding, behoud van systeemprompts en schakeloptie voor compressie van MCP-beschrijvingen configureren |
| `omniroute_set_compression_engine`  | `write:compression` | De actieve engine (off/caveman/rtk/stacked) en Caveman/RTK-intensiteit kiezen                                                                 |
| `omniroute_list_compression_combos` | `read:compression`  | Benoemde compressiecombo's en hun enginepipelines weergeven                                                                                   |
| `omniroute_compression_combo_stats` | `read:compression`  | Analyses gegroepeerd per compressiecombo en engine                                                                                            |
| `omniroute_ccr_store`               | `write:compression` | Van de aanroeper geïsoleerde inhoud opslaan in het begrensde CCR-geheugen en een markering plus `ccr://`-verwijzing retourneren               |
| `omniroute_ccr_retrieve`            | `read:compression`  | CCR-inhoud volledig of via kop-, staart-, regel-, grep- en statistiekmodi ophalen                                                             |
| `omniroute_ccr_inspect`             | `read:compression`  | Metagegevens van CCR-blokken van de aanroeper inspecteren zonder inhoud te retourneren                                                        |
| `omniroute_ccr_list`                | `read:compression`  | Gepagineerde metagegevens voor CCR-blokken van de aanroeper weergeven                                                                         |
| `omniroute_ccr_delete`              | `write:compression` | Een CCR-blok van de aanroeper verwijderen                                                                                                     |
| `omniroute_ccr_stats`               | `read:compression`  | Geheugengebruik, levenscyclustellers en opslaglimieten binnen het bereik van de aanroeper rapporteren                                         |
| `omniroute_rtk_discover`            | `read:compression`  | Terugkerende ruis ontdekken in vrijwillig aangeleverde RTK-uitvoervoorbeelden                                                                 |
| `omniroute_rtk_learn`               | `read:compression`  | Een controleerbaar concept voor een RTK-filter genereren uit vrijwillig aangeleverde voorbeelden                                              |

CCR-vermeldingen bestaan uitsluitend in het geheugen en verdwijnen na een herstart. Elk blok is beperkt tot 2 MiB, elke
principal tot 16 MiB en de globale opslag tot 64 MiB. Vermeldingen hebben standaard een TTL van 24 uur (maximaal
zeven dagen). Volledig ophalen via MCP is beperkt tot 256 KiB; grotere blokken blijven beschikbaar via de
bereik- en grep-modi. Opslag, ophalen, weergeven, inspectie, verwijdering en statistieken worden geïsoleerd per
principal van de geverifieerde API-sleutel. Auditrecords bevatten hashes en metagegevens over de grootte, nooit inhoud.

`omniroute_compression_status` rapporteert MCP-beschrijvingscompressie afzonderlijk onder
`analytics.mcpDescriptionCompression`. Deze waarden zijn schattingen van de metadatagrootte voor opvraagbare MCP-
beschrijvingen (`tools`, `prompts`, `resources` en `resourceTemplates`); het zijn geen gebruiksbewijzen
van providers en ze zijn gemarkeerd met `source: "mcp_metadata_estimate"`.

### MCP-toegankelijkheidsboomfilter (v3.8.0)

Los van de bovenstaande compressietools bevat OmniRoute een filter voor na de uitvoering dat
de **toolresultaten** van MCP-browser-/toegankelijkheidstools comprimeert voordat ze aan de
agent worden geretourneerd. Dit filter is zelf geen tool — het wordt transparant uitgevoerd op elk toolresultaat dat
uitgebreide tekst van een toegankelijkheidsboom of browsersnapshot bevat (≥2000 tekens).

Belangrijkste gedragingen:

- Vouwt ≥30 opeenvolgende, herhaalde siblingregels samen tot een samenvatting met begin en einde
- Behoudt `[ref=eXX]`-ankers die vereist zijn door Playwright/computergebruik
- Kapt te lange tekst (>50.000 tekens) af met een navigatiehint
- Verwachte besparing: **60–80%** op browsersnapshot-payloads

Configuratie: `compression.mcpAccessibility` in de algemene instellingen (migratie 056).
Implementatie: `open-sse/services/compression/engines/mcpAccessibility/`.
Volledige documentatie: [Compressie-engines — MCP-toegankelijkheidsboomfilter](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Zie [Compressie-engines](../compression/COMPRESSION_ENGINES.md) en [RTK-compressie](../compression/RTK_COMPRESSION.md) voor
het runtimecompressiemodel achter deze tools.

## 1Proxy-tools (3)

| Tool                        | Scopes         | Beschrijving                                                                                       |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Gratis proxy's ophalen van de 1proxy-marktplaats (filters voor protocol/land/kwaliteit/limiet)     |
| `omniroute_oneproxy_rotate` | `read:proxies` | De volgende beschikbare proxy ophalen op basis van strategie (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Poolstatistieken, synchronisatiestatus en verdeling per protocol en land                           |

## Geheugentools (3)

Gedefinieerd in `open-sse/mcp-server/tools/memoryTools.ts`. Authenticatie/scopes worden afgedwongen via de standaard MCP-scopepipeline.

| Tool                      | Scopes         | Beschrijving                                                                                      |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | Geheugenitems zoeken op query / type / API-sleutel met handhaving van het tokenbudget             |
| `omniroute_memory_add`    | `write:memory` | Een nieuw geheugenitem toevoegen (`factual` / `episodic` / `procedural` / `semantic`)             |
| `omniroute_memory_clear`  | `write:memory` | Geheugenitems voor een API-sleutel wissen, optioneel gefilterd op type of `olderThan`-tijdstempel |

## Vaardigheidstools (4)

Gedefinieerd in `open-sse/mcp-server/tools/skillTools.ts`. Ondersteund door `src/lib/skills/registry` + `src/lib/skills/executor`.

| Tool                          | Scopes           | Beschrijving                                                                                           |
| :---------------------------- | :--------------- | :----------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Geregistreerde vaardigheden weergeven, met optionele filtering op API-sleutel, naam of inschakelstatus |
| `omniroute_skills_enable`     | `write:skills`   | Een specifieke vaardigheid op basis van ID in- of uitschakelen                                         |
| `omniroute_skills_execute`    | `execute:skills` | Een vaardigheid uitvoeren met de opgegeven invoer en het uitvoeringsrecord retourneren                 |
| `omniroute_skills_executions` | `read:skills`    | Recente uitvoeringsgeschiedenis van vaardigheden weergeven                                             |

## Notion-contextbron (6)

Gedefinieerd in `open-sse/mcp-server/tools/notionTools.ts`. Token opgeslagen in de tabel `key_value` via `src/lib/db/notion.ts`. REST-client in `src/lib/notion/api.ts`. Instellingen-API in `src/app/api/settings/notion/route.ts`. Dashboardinterface in `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Configureer het token voor je Notion-integratie via het tabblad **Contextbronnen** in het Endpoint-dashboard, of via de REST-API:

```bash
# Token instellen
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Status controleren
curl http://localhost:20128/api/settings/notion

# Verbinding verbreken
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Tool                         | Scopes         | Beschrijving                                                                         |
| :--------------------------- | :------------- | :----------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Zoeken in de volledige tekst van alle pagina's en databases                          |
| `notion_get_page`            | `read:notion`  | Een pagina op basis van ID ophalen, inclusief de eigenschappen ervan                 |
| `notion_list_block_children` | `read:notion`  | De onderliggende blokken van een pagina of blok weergeven                            |
| `notion_query_database`      | `read:notion`  | Een database doorzoeken met filters, sorteringen en paginering                       |
| `notion_get_database`        | `read:notion`  | Databaseschema op basis van ID ophalen                                               |
| `notion_append_blocks`       | `write:notion` | Onderliggende blokken aan een bovenliggend blok toevoegen (maximaal 100 per verzoek) |

## Agent Skill-catalogustools (3)

Gedefinieerd in `open-sse/mcp-server/tools/agentSkillTools.ts`. Ondersteund door `src/lib/agentSkills/catalog`. Deze tools stellen de documentatiecatalogus met 45 Agent Skills beschikbaar aan MCP-clients en externe agents. Scope: `read:catalog`.

| Tool                              | Scopes         | Beschrijving                                                                                                                                                       |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Vermeld alle 45 agent-skills met optionele filters voor `category` (api\|cli) en `area`; retourneert metadata + dekking                                            |
| `omniroute_agent_skills_get`      | `read:catalog` | Haal volledige metadata + SKILL.md-inhoud op voor één skill aan de hand van de canonieke `id`                                                                      |
| `omniroute_agent_skills_coverage` | `read:catalog` | Dekkingsstatistieken: hoeveel van de 23 API-, 21 CLI- en 1 configuratieskill SKILL.md-bestanden in het bestandssysteem hebben ten opzichte van de catalogustotalen |

Zie [AGENT-SKILLS.md](./AGENT-SKILLS.md) voor de volledige catalogus en hoe externe agents deze gebruiken.

## Gerelateerde frameworks (v3.8.0)

De bovenstaande inventaris van MCP-tools (110 unieke tools, berekend door `countUniqueMcpTools()`) is bewust
beperkt tot runtimebewerkingen voor routering, cache, compressie, geheugen, skills, proxy's en contextbronnen. Twee aangrenzende
frameworks worden in v3.8.0 samen met de MCP-server geleverd en worden afzonderlijk gedocumenteerd:

### Cloud Agents

Cloud Agents zijn AI-programmeeragents buiten het proces (codex-cloud, cursor-cloud, devin, jules) die met
OmniRoute zijn verbonden via hetzelfde verbindingsmodel dat voor LLM-providers wordt gebruikt. Ze worden beschikbaar gesteld via
hun eigen REST-interface (`/api/v1/agents/*`) en maken **geen** deel uit van de MCP-toolcatalogus
— het aanroepen van een Cloud Agent verbruikt geen MCP-scope.

- Implementatie: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Levenscyclus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Documentatie: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails zijn filters vóór/na uitvoering (vision-bridge, pii-masker, prompt-injection)
die binnen de chatpipeline worden toegepast. Ze worden uitgevoerd voordat de MCP-tool-/routeringslaag wordt bereikt
en sturen gestructureerde overtredingen naar de auditpipeline; ze worden niet aangeroepen als MCP-tools.

- Implementatie: `src/lib/guardrails/`.
- Documentatie: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Controleer bij het debuggen van een MCP-aanroep die geblokkeerd lijkt zowel het MCP-auditlogboek
(`scope_denied:*`-vermeldingen) als het auditspoor van de guardrails — een verzoek kan door
een guardrail worden geweigerd **voordat** het ooit de MCP-scopetoepassingslaag bereikt.

---

## REST API-eindpunten

| Eindpunt               | Methode               | Beschrijving                                                                                              | Authenticatie         |
| :--------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------- | :-------------------- |
| `/api/mcp/status`      | `GET`                 | Serverstatus: heartbeat, status van HTTP-transport, samenvatting van auditactiviteit                      | Beheer (sessie/admin) |
| `/api/mcp/tools`       | `GET`                 | Toolcatalogus (naam, beschrijving, scopes, fase, broneindpunten)                                          | Beheer                |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE-transporteindpunt (afgeschermd door `mcpEnabled` + `mcpTransport === "sse"`)                          | API-sleutel + scopes  |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streamable HTTP-transport (gebruikt de header `mcp-session-id`; `DELETE` beëindigt de sessie)             | API-sleutel + scopes  |
| `/api/mcp/audit`       | `GET`                 | Auditlogboekvermeldingen uit `mcp_tool_audit` (filters: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Beheer                |
| `/api/mcp/audit/stats` | `GET`                 | Geaggregeerde auditstatistieken (`totalCalls`, `successRate`, `avgDurationMs`, meestgebruikte tools)      | Beheer                |

Bronbestanden: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Zowel SSE- als Streamable HTTP-transporten worden geblokkeerd totdat de MCP-server is ingeschakeld in Instellingen (`mcpEnabled`) en het juiste `mcpTransport` is geselecteerd. Als het verkeerde transport is geconfigureerd, retourneert de route HTTP 400 met een aanwijzing om de instellingen te wijzigen.

---

## Authenticatie en scopes

MCP-tools worden geauthenticeerd via API-sleutelscopes. De afdwinging van scopes is gecentraliseerd in
`open-sse/mcp-server/scopeEnforcement.ts`. Voor elke tool zijn specifieke scopes vereist:

| Bereik                | Hulpmiddelen                                                                                                                                                                       |
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
| `read:obsidian`       | 13 leeshulpmiddelen — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 schrijfhulpmiddelen — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …             |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                  |

Wildcard-scopes worden ondersteund: `read:*` verleent alle read-scopes, `*` verleent volledige toegang.

### `mcp:connect` — beperkte routemogelijkheid (#7895)

Om het HTTP/SSE MCP-transport (`/api/mcp/*`) te bereiken vanaf een niet-loopbackadres is de
LOCAL_ONLY-uitzondering voor `/api/mcp/` vereist (zie `docs/security/ROUTE_GUARD_TIERS.md`). Historisch gezien
accepteerde die uitzondering alleen een API-sleutel met een volledige `manage`/`admin`-scope — te ruim voor een
aanroeper die alleen met MCP hoeft te communiceren. `src/shared/constants/managementScopes.ts` exporteert nu
`MCP_CONNECT_SCOPE = "mcp:connect"`: een aanvullende, beperkte scope (volgens hetzelfde precedent als
`SELF_USAGE_SCOPE`) die ALLEEN de omzeiling voor `/api/mcp/` in
`src/server/authz/policies/management.ts` autoriseert — deze verleent geen toegang tot andere beheerroutes
en wordt bewust BUITEN `MANAGEMENT_API_KEY_SCOPES` gehouden. Een sleutel met `manage`/`admin`
doorstaat de uitzondering nog steeds ongewijzigd; `mcp:connect` is een alternatief met minder rechten voor
externe aanroepers die uitsluitend MCP gebruiken, gecontroleerd via `hasMcpConnectOrManageScope()`.

### HTTP-scopebinding per sleutel (#7895)

Via HTTP/SSE haalt `open-sse/mcp-server/httpTransport.ts` nu de werkelijke
`api_keys.scopes` van de aanroeper op via `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
en geeft deze door aan `transport.handleRequest(req, { authInfo })` van de MCP SDK, zodat
`extra.authInfo.scopes` die elke toolaanroep bereikt de eigen scopes van de Bearer-sleutel weerspiegelt.
`resolveCallerScopeContext()` van `scopeEnforcement.ts` gaf al prioriteit aan `authInfo` boven
de `_meta`- en `OMNIROUTE_MCP_SCOPES`-env-fallback — hiermee wordt alleen die eerste bron met de
hoogste prioriteit gevuld, die voorheen via HTTP niet werd aangeleverd. Wanneer geen API-sleutel kan worden
gevonden (geen header, ongeldige sleutel), blijft `authInfo` `undefined` en valt de resolutie ongewijzigd terug op de
bestaande `meta`/env-keten. Dit wijzigt NIET de standaardwaarde van `OMNIROUTE_MCP_ENFORCE_SCOPES`;
handhaving moet nog steeds expliciet worden ingeschakeld. Deze wijziging zorgt er alleen voor dat het
pad per sleutel voorrang krijgt zodra dit het geval is. stdio heeft geen identiteit per aanroeper (zie
`mcpCallerIdentity.ts`) en wordt niet beïnvloed — het blijft de `_meta`/env-fallbackketen gebruiken.

---

## Omgevingsvariabelen

| Variabele                               | Standaardwaarde                           | Doel                                                                                                                                                          |
| :-------------------------------------- | :---------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                  | Basis-URL die de MCP-server gebruikt bij het aanroepen van interne API's van OmniRoute                                                                        |
| `OMNIROUTE_API_KEY`                     | (leeg)                                    | API-sleutel die als `Authorization: Bearer` wordt doorgestuurd naar interne API-aanroepen                                                                     |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (alleen `"true"` schakelt dit in) | Als dit is ingeschakeld, leiden ontbrekende scopes tot weigering van toolaanroepen en wordt `scope_denied:<reason>` in het auditlogboek vastgelegd            |
| `OMNIROUTE_MCP_SCOPES`                  | (leeg)                                    | Door komma's gescheiden acceptatielijst met scopes die standaard als 'beschikbaar' worden beschouwd (gebruikt wanneer de aanroeper geen eigen scopes opgeeft) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (niet ingesteld = aan)                    | Wanneer ingesteld op `0/false/off/no`, wordt compressie van MCP-beschrijvingen tijdens de registratie uitgeschakeld                                           |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (niet ingesteld = aan)                    | Alternatieve alias voor dezelfde instelling als hierboven                                                                                                     |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                   | Afbreeklimiet voor interne beheerleesbewerkingen (status, robuustheid, combinaties, quotum, gebruik)                                                          |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                   | Afbreeklimiet voor stappen die op een provider wachten (`route_request`, `web_search`, `web_fetch`)                                                           |
| `MCP_TOOL_DENY`                         | (niet ingesteld = geen filter)            | Door komma's gescheiden toolnamen die uit `tools/list` moeten worden verwijderd (vermindering van het aantal tools — zie hieronder)                           |
| `MCP_TOOL_ALLOW`                        | (niet ingesteld = geen filter)            | Door komma's gescheiden toolnamen die exclusief moeten worden behouden (acceptatielijstmodus — zie hieronder)                                                 |
| `DATA_DIR`                              | `~/.omniroute`                            | Het heartbeat-bestand wordt naar `${DATA_DIR}/runtime/mcp-heartbeat.json` geschreven                                                                          |

---

## Beschrijvingscompressie

Registers voor MCP-tools, prompts en resources kunnen beschrijvingen tijdens registratie of weergave comprimeren om de metadataomvang die aan clients wordt blootgesteld (en daarmee de kosten van de promptcontext) te verkleinen. De implementatie bevindt zich in `open-sse/mcp-server/descriptionCompressor.ts` en is via `compressMcpRegistryMetadata` binnen `createMcpServer()` geïntegreerd in de MCP-server.

- Compressie wordt op de beschrijvingstekst toegepast met de Caveman-regelset (`getRulesForContext("all", "full")`), waarbij te behouden blokken worden geëxtraheerd (codefragmenten, omheinde blokken enzovoort), zodat structurele inhoud niet wordt gewijzigd.
- Schakel dit per implementatie in of uit via de waarde `compression.mcpDescriptionCompressionEnabled` in de instellingentabel `key_value` (standaard: ingeschakeld) — in de gebruikersinterface beschikbaar als **Analyse → Compressie van MCP-beschrijvingen**.
- Schakel dit voor het hele proces in of uit via `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` of `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Realtime-statistieken zijn beschikbaar via `omniroute_compression_status` onder `analytics.mcpDescriptionCompression` en zijn voorzien van de tag `source: "mcp_metadata_estimate"` om ze te onderscheiden van daadwerkelijke gebruiksregistraties van providers.

---

## Reductie van toolcardinaliteit (F4.3)

Beschrijvingcompressie verkleint de metadata van elke tool; **reductie van toolcardinaliteit** gaat nog een stap verder door te verminderen _hoeveel_ tools überhaupt worden aangekondigd. Door minder tools in het `tools/list`-manifest te publiceren, dalen de tokenkosten per aanvraag die het model van de client voor de toolcatalogus betaalt ("laag 5"-compressie). De implementatie is een zuiver, statusloos filter in `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), dat is geïntegreerd in de registratielus in `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Opt-in, standaard uitgeschakeld.** Het filter wordt alleen uitgevoerd wanneer ten minste één van twee omgevingsvariabelen is ingesteld; als geen van beide is ingesteld, worden alle 110 tools ongewijzigd aangekondigd.

| Variabele        | Modus                                                                                                            |
| :--------------- | :--------------------------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Blokkeerlijst — door komma's gescheiden toolnamen die altijd uit `tools/list` worden verwijderd                  |
| `MCP_TOOL_ALLOW` | Toestaanlijst — door komma's gescheiden toolnamen; alleen deze blijven behouden, al het overige wordt verwijderd |

`deny` heeft voorrang op `allow`. Namen worden door komma's gescheiden, witruimte eromheen wordt verwijderd en lege vermeldingen worden genegeerd. Voorbeelden:

```bash
# Twee tools uit de catalogus verwijderen
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Alleen de routerings- en quotatools aankondigen (toestaanlijstmodus)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Hoe gefilterde tools worden verwijderd:** de registratie slaagt altijd; een tool die door het profiel wordt afgewezen, wordt vervolgens via `.disable()` uitgeschakeld op de MCP SDK-handle, zodat deze nooit in `tools/list` verschijnt, terwijl de bedrading intact blijft (netjes in- en uitschakelen, zonder herregistratie). De profielparser is `readMcpToolProfileFromEnv(process.env)`, die `null` retourneert (geen filtering) wanneer beide variabelen leeg zijn.

De uitgebreidere `ToolProfile`-structuur achter `reduceToolManifest` ondersteunt ook filtering op basis van bereikdoorsneden (`allowScopes`, met wildcardovereenkomsten in de stijl van `read:*`) en een deterministische `maxTools`-limiet, maar voor die twee instellingen is tijdens de registratie het volledige manifest nodig en ze worden momenteel **niet** via de omgevingsvariabelen beschikbaar gesteld (een hook op `tools/list`-niveau wordt als vervolgactie bijgehouden). `estimateManifestTokens()` is beschikbaar om de tokenkosten van het manifest vóór en na de reductie te vergelijken.

---

## Runtime-heartbeat

Het stdio-transport slaat elke 5 seconden liveness-informatie op in `${DATA_DIR}/runtime/mcp-heartbeat.json`. Het dashboard (`/api/mcp/status`) leest dit bestand en controleert daarnaast of de PID actief is om `online` te bepalen. HTTP-transporten rapporteren in plaats daarvan de status via de in-process-functie `getMcpHttpStatus()` (zonder naar een bestand te schrijven).

De heartbeat-snapshot bevat:

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

## Auditlogboekregistratie

Elke toolaanroep wordt door `open-sse/mcp-server/audit.ts` vastgelegd in de SQLite-tabel `mcp_tool_audit`:

- Toolnaam, argumenten (gehasht/afgekapt volgens het `auditLevel` per tool), resultaat
- Duur in ms, indicator voor succes/mislukking, foutmelding (indien van toepassing)
- Hash van de API-sleutel, tijdstempel
- Bereikweigeringen worden vastgelegd als `scope_denied:<reason>`, samen met de lijst met ontbrekende bereiken

Gebruik het dashboard of de REST-endpoints `/api/mcp/audit` en `/api/mcp/audit/stats` om recente aanroepen te bekijken.

---

## Bestanden

| Bestand                                                                  | Doel                                                                   |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP-serverfactory, stdio-toegangspunt, scopegebonden toolregistraties  |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE- en Streamable HTTP-transport (sessiebeheer)                       |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Evaluatie van toolscopes en bepaling van de aanroeper                  |
| `open-sse/mcp-server/audit.ts`                                           | Auditlogboekregistratie van toolaanroepen (`mcp_tool_audit`)           |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio-heartbeatschrijver (`mcp-heartbeat.json`)                        |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Beschrijvingscompressie voor tool-, prompt- en resourceregisters       |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod-schema's en toolregister (`MCP_TOOLS`, 45 vermeldingen)            |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Toolhandlers voor fase 2, cache en 1proxy                              |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Toolhandlers voor compressie                                           |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definities van geheugentools (3 tools)                                 |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definities van vaardigheidstools (4 tools)                             |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definities van tools voor Notion-contextbronnen (6 tools)              |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definities van gamificatietools (8 tools)                              |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Tools voor pluginregistratie en -beheer (8 tools)                      |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status`-endpoint                                             |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools`-endpoint                                              |
| `src/app/api/mcp/sse/route.ts`                                           | SSE-transportroute `/api/mcp/sse`                                      |
| `src/app/api/mcp/stream/route.ts`                                        | Streamable HTTP-transportroute `/api/mcp/stream`                       |
| `src/app/api/mcp/audit/route.ts`                                         | Query voor auditlogboek via `/api/mcp/audit`                           |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Geaggregeerde auditmetrieken via `/api/mcp/audit/stats`                |
| `src/lib/notion/api.ts`                                                  | Notion REST API-client (opnieuw proberen, time-out, foutclassificatie) |
| `src/lib/db/notion.ts`                                                   | Persistentie van Notion-token (`key_value`-tabel)                      |
| `src/app/api/settings/notion/route.ts`                                   | Notion-instellingen-API (GET/POST/DELETE)                              |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Gebruikersinterface voor Notion-tokenbeheer                            |
| `tests/unit/notion-api.test.ts`                                          | Tests voor Notion API-client (7)                                       |
| `tests/unit/notion-tools.test.ts`                                        | Tests voor scopehandhaving van Notion-tools (10)                       |
| `tests/unit/db/notion.test.mjs`                                          | Tests voor Notion-databasemodule (3)                                   |
