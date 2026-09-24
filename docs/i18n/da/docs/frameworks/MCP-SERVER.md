# OmniRoute MCP Server Documentation (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol-server med 110 værktøjer på tværs af routing, cache, komprimering, hukommelse, færdigheder, proxy, pool, Radar og kontekstkildehandlinger.
>
> Autoritativ kilde: `open-sse/mcp-server/server.ts` beregner **110 unikke værktøjer** med `countUniqueMcpTools()`: 45 kanoniske definitioner (inklusive de seks CCR-livscyklusværktøjer, agent-skills-trioen, `omniroute_radar_catalog` og `omniroute_x_search`) samt hukommelse (3), færdigheder (4), GitHub-færdigheder (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22), lokalt korpus (3) og to komprimeringsværktøjer, der kun er tilgængelige i RTK.

## Installation

OmniRoute MCP er indbygget. Start den med:

```bash
omniroute --mcp
```

Eller via open-sse-transporten:

```bash
# HTTP-transport med streaming (port 20130)
omniroute --dev  # MCP starter automatisk på /mcp-slutpunktet
```

HTTP-transporterne (`sse` / `streamable-http`, der leveres i samme proces af dashboardserveren) er
som standard deaktiveret og kunne tidligere kun slås til og fra fra siden `/dashboard/mcp`. Fra og med v3.8.51
har CLI'en tilsvarende funktionalitet:

```bash
omniroute mcp status                                  # aktiveret/online, transport, antal værktøjer
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # nulstiller aktive sse/streamable-http-sessioner
```

`mcp enable`/`mcp disable` sender PATCH til den samme indstilling, `mcpEnabled` (og valgfrit `mcpTransport`),
som dashboardet slår til og fra via `/api/settings`. `mcp restart` kalder `POST /api/mcp/restart`: Kommandoen lukker
aktive `sse`/`streamable-http`-sessioner ned, så den næste anmodning geninitialiseres korrekt, returnerer
`409`, hvis MCP er deaktiveret, og `501` for `stdio`-transporten (stdio-klienter ejer deres egen
underproces — der findes intet håndtag i processen, som kan genstartes).

## Transporter

MCP-serveren eksponerer tre transporter, som alle understøttes af den samme `createMcpServer()`-factory:

| Transport         | Hvor                                        | Hvornår den skal bruges                                     |
| :---------------- | :------------------------------------------ | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE-integrationer (Claude Desktop, Cursor osv.)             |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | Browser-/agentklienter, der kræver en hændelsesstrøm        |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | HTTP-klienter med flere sessioner (`mcp-session-id`-header) |

Den aktive HTTP-transport (`sse` eller `streamable-http`) vælges med indstillingen `mcpTransport`. Når der skiftes transport, lukkes eksisterende sessioner på den anden transport.

### Fjernadgang (omgåelse med manage-scope)

`/api/mcp/*` er i LOCAL_ONLY-niveauet (`src/server/authz/routeGuard.ts`) — som standard er det kun loopback-værter (`localhost`, `127.0.0.1`, `::1`), der kan tilgå det. Siden v3.8.2 kan ikke-loopback-klienter oprette forbindelse, hvis de angiver en `Authorization: Bearer <api-key>`, hvis nøgle har `manage`-scope. Dette er den eneste måde at tilgå den eksterne MCP-server via en tunnel, reverse proxy eller et offentligt værtsnavn.

```bash
# Tildel manage-scope: Åbn siden API Keys i dashboardet, og slå
# "Management Access" til for nøglen, eller send POST med scopes:["manage"] ved oprettelsen.

# Opret derefter forbindelse fra en ekstern MCP-klient:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

En nøgle uden manage-scope (eller uden Bearer) returnerer `403 LOCAL_ONLY`. Søskendepræfikset `/api/cli-tools/runtime/*` kan med vilje IKKE omgås — se [Route Guard-niveauer — undtagelse med manage-scope](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE-konfiguration

Se [Konfiguration af MCP-klient](../guides/SETUP_GUIDE.md#mcp-client-configuration) for opsætning af Claude Desktop,
Cursor, Cline og kompatible MCP-klienter.

---

## Væsentlige værktøjer (14) — Fase 1

| Værktøj                         | Adgangsområder        | Beskrivelse                                                                                                                             |
| :------------------------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Oppetid, hukommelse, kredsløbsafbrydere, hastighedsbegrænsninger og cachestatistik                                                      |
| `omniroute_list_combos`         | `read:combos`         | Alle konfigurerede kombinationer med strategier (valgfri målinger)                                                                      |
| `omniroute_get_combo_metrics`   | `read:combos`         | Ydelsesmålinger for en bestemt kombination                                                                                              |
| `omniroute_switch_combo`        | `write:combos`        | Aktivér eller deaktivér en kombination                                                                                                  |
| `omniroute_create_combo`        | `write:combos`        | Opret en valideret kombination via det eksisterende kombinations-API                                                                    |
| `omniroute_check_quota`         | `read:quota`          | Brugt/samlet kvote, resterende procent, nulstillingstidspunkt og tokenstatus                                                            |
| `omniroute_route_request`       | `execute:completions` | Send en chatfuldførelse via OmniRoute-routing                                                                                           |
| `omniroute_cost_report`         | `read:usage`          | Omkostningsrapport efter periode (session/dag/uge/måned)                                                                                |
| `omniroute_list_models_catalog` | `read:models`         | Fuldt modelkatalog med funktioner, status og priser                                                                                     |
| `omniroute_radar_catalog`       | `read:radar`          | Lokalt signeret Radar-katalog; valgfrie filtre efter udbyder/familie                                                                    |
| `omniroute_tool_search`         | `read:tools`          | Find værktøjer i det registrerede MCP-katalog                                                                                           |
| `omniroute_web_search`          | `execute:search`      | Websøgning via de konfigurerede søgeudbydere. Ikke X/Twitter.                                                                           |
| `omniroute_x_search`            | `execute:search`      | Søg på X via xAI/SuperGrok, eller vælg `xquik-search` for Xquik API-resultater. Kræver legitimationsoplysninger til den valgte backend. |
| `omniroute_web_fetch`           | `execute:search`      | Hent webindhold via de konfigurerede udbydere til indholdshentning                                                                      |

## Avancerede værktøjer (11) — Fase 2

| Værktøj                            | Adgangsområder                       | Beskrivelse                                                                                                            |
| :--------------------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulering af routing uden udførelse med fallback-træ                                                                  |
| `omniroute_set_budget_guard`       | `write:budget`                       | Sessionsbudget med handlingen nedgradering/blokering/advarsel                                                          |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Opdater kombinationsstrategien under kørsel (prioritet/vægtet/automatisk/osv.)                                         |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Anvend den forudindstillede robusthedsprofil `aggressive` / `balanced` / `conservative`                                |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Livetest af hver udbyder i en kombination ved hjælp af et reelt upstream-kald                                          |
| `omniroute_get_provider_metrics`   | `read:health`                        | Målinger pr. udbyder med p50-/p95-/p99-latenstid og tilstand for kredsløbsafbryder                                     |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Anbefal en kombination efter opgavetype med budget- og latenstidsbegrænsninger                                         |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Forklar, hvorfor en anmodning blev routet til en udbyder (scoringsfaktorer + fallbacks)                                |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Komplet sessionssnapshot: omkostning, tokens, topmodeller/-udbydere, fejl og budgetkontrol                             |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnosticer (og reparer eventuelt automatisk) databasedrift såsom ugyldige kombinationsreferencer/forældreløse rækker |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synkroniser prisdata fra eksterne kilder (LiteLLM); understøtter `dryRun`                                              |

## Cacheværktøjer (2)

| Værktøj                 | Adgangsområder | Beskrivelse                                              |
| :---------------------- | :------------- | :------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`   | Statistik for semantisk cache, promptcache og idempotens |
| `omniroute_cache_flush` | `write:cache`  | Ryd cache globalt eller efter signatur/model             |

## Komprimeringsværktøjer (13)

| Værktøj                             | Adgangsområder      | Beskrivelse                                                                                                                                  |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Komprimeringsindstillinger, analyseoversigt og cachebevidst statistik (omfatter metadata for `analytics.mcpDescriptionCompression`)          |
| `omniroute_compression_configure`   | `write:compression` | Konfigurer komprimeringstilstand, tærskel, målforhold, bevarelse af systemprompt og til/fra-indstilling for komprimering af MCP-beskrivelser |
| `omniroute_set_compression_engine`  | `write:compression` | Vælg den aktive motor (off/caveman/rtk/stacked) og intensiteten for Caveman/RTK                                                              |
| `omniroute_list_compression_combos` | `read:compression`  | Vis navngivne komprimeringskombinationer og deres motorpipelines                                                                             |
| `omniroute_compression_combo_stats` | `read:compression`  | Analyse grupperet efter komprimeringskombination og motor                                                                                    |
| `omniroute_ccr_store`               | `write:compression` | Gem indhold isoleret pr. kalder i det begrænsede CCR-lager i hukommelsen, og returner en markør samt en `ccr://`-reference                   |
| `omniroute_ccr_retrieve`            | `read:compression`  | Hent CCR-indhold i sin helhed eller med tilstandene start, slut, linjer, grep og statistik                                                   |
| `omniroute_ccr_inspect`             | `read:compression`  | Inspicer kalderens egne CCR-metadata uden at returnere indhold                                                                               |
| `omniroute_ccr_list`                | `read:compression`  | Vis sideinddelte metadata for CCR-blokke, som ejes af kalderen                                                                               |
| `omniroute_ccr_delete`              | `write:compression` | Slet en CCR-blok, som ejes af kalderen                                                                                                       |
| `omniroute_ccr_stats`               | `read:compression`  | Rapportér hukommelsesforbrug pr. kalder, livscyklustællere og lagergrænser                                                                   |
| `omniroute_rtk_discover`            | `read:compression`  | Find tilbagevendende støj i tilvalgte RTK-outputeksempler                                                                                    |
| `omniroute_rtk_learn`               | `read:compression`  | Generer et RTK-filterudkast, der kan gennemgås, ud fra tilvalgte eksempler                                                                   |

CCR-poster findes kun i hukommelsen og forsvinder ved genstart. Hver blok er begrænset til 2 MiB, hver
principal til 16 MiB og det globale lager til 64 MiB. Poster har som standard en TTL på 24 timer (maksimalt
syv dage). Fuld MCP-hentning er begrænset til 256 KiB; større blokke er fortsat tilgængelige via tilstandene
for intervaller og grep. Lagring, hentning, visning, inspektion, sletning og statistik er isoleret efter
den godkendte API-nøgleprincipal. Revisionsposter indeholder hashes og størrelsesmetadata, aldrig indhold.

`omniroute_compression_status` rapporterer komprimering af MCP-beskrivelser separat under
`analytics.mcpDescriptionCompression`. Disse værdier er estimater af metadatastørrelsen for MCP-beskrivelser,
der kan vises på lister (`tools`, `prompts`, `resources` og `resourceTemplates`); de er ikke kvitteringer for
udbyderforbrug og er markeret med `source: "mcp_metadata_estimate"`.

### MCP-tilgængelighedstræfilter (v3.8.0)

Uafhængigt af komprimeringsværktøjerne ovenfor indeholder OmniRoute et filter, der efter udførelse
komprimerer **værktøjsresultaterne** fra MCP-browser-/tilgængelighedsværktøjer, før de returneres til
agenten. Dette filter er ikke i sig selv et værktøj — det kører transparent på ethvert værktøjsresultat, der
indeholder udførlig tekst fra tilgængelighedstræer eller browsersnapshots (≥2000 tegn).

Vigtigste egenskaber:

- Samler ≥30 på hinanden følgende gentagne søskendelinjer i en oversigt med begyndelse + slutning
- Bevarer `[ref=eXX]`-ankre, der kræves af Playwright/computer-use
- Hårdafkorter for stor tekst (>50,000 tegn) med et navigationstip
- Forventet besparelse: **60–80%** på browsersnapshot-payloads

Konfiguration: `compression.mcpAccessibility` i globale indstillinger (migrering 056).
Implementering: `open-sse/services/compression/engines/mcpAccessibility/`.
Fuld dokumentation: [Komprimeringsmotorer — MCP-tilgængelighedstræfilter](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Se [Komprimeringsmotorer](../compression/COMPRESSION_ENGINES.md) og [RTK-komprimering](../compression/RTK_COMPRESSION.md) for
den runtime-komprimeringsmodel, der ligger bag disse værktøjer.

## 1Proxy-værktøjer (3)

| Værktøj                     | Adgangsområder | Beskrivelse                                                                             |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Hent gratis proxyer fra 1proxy-markedspladsen (filtre for protokol/land/kvalitet/antal) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Hent den næste tilgængelige proxy efter strategi (`random` / `quality` / `sequential`)  |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistik for puljen, synkroniseringsstatus samt fordeling efter protokol og land       |

## Hukommelsesværktøjer (3)

Defineret i `open-sse/mcp-server/tools/memoryTools.ts`. Godkendelse/adgangsområde håndhæves via standardpipelinjen for MCP-adgangsområder.

| Værktøj                   | Adgangsområder | Beskrivelse                                                                                             |
| :------------------------ | :------------- | :------------------------------------------------------------------------------------------------------ |
| `omniroute_memory_search` | `read:memory`  | Søg i hukommelseselementer efter forespørgsel/type/API-nøgle med håndhævelse af tokenbudget             |
| `omniroute_memory_add`    | `write:memory` | Tilføj et nyt hukommelseselement (`factual` / `episodic` / `procedural` / `semantic`)                   |
| `omniroute_memory_clear`  | `write:memory` | Ryd hukommelseselementer for en API-nøgle, eventuelt filtreret efter type eller `olderThan`-tidsstempel |

## Færdighedsværktøjer (4)

Defineret i `open-sse/mcp-server/tools/skillTools.ts`. Understøttet af `src/lib/skills/registry` + `src/lib/skills/executor`.

| Værktøj                       | Adgangsområder   | Beskrivelse                                                                                       |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | Vis registrerede færdigheder med valgfri filtrering efter API-nøgle, navn eller aktiveringsstatus |
| `omniroute_skills_enable`     | `write:skills`   | Aktivér eller deaktivér en bestemt færdighed efter ID                                             |
| `omniroute_skills_execute`    | `execute:skills` | Kør en færdighed med det angivne input, og returner kørselsposten                                 |
| `omniroute_skills_executions` | `read:skills`    | Vis historikken over de seneste færdighedskørsler                                                 |

## Notion-kontekstkilde (6)

Defineret i `open-sse/mcp-server/tools/notionTools.ts`. Token gemmes i tabellen `key_value` via `src/lib/db/notion.ts`. REST-klienten findes i `src/lib/notion/api.ts`. Indstillings-API'et findes i `src/app/api/settings/notion/route.ts`. Dashboardbrugerfladen findes i `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Konfigurer dit Notion-integrationstoken fra fanen **Kontekstkilder** i slutpunktets dashboard eller via REST-API'et:

```bash
# Angiv token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Kontrollér status
curl http://localhost:20128/api/settings/notion

# Afbryd forbindelsen
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Værktøj                      | Adgangsområder | Beskrivelse                                                              |
| :--------------------------- | :------------- | :----------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Fuldtekstsøgning på tværs af alle sider og databaser                     |
| `notion_get_page`            | `read:notion`  | Hent en side efter ID sammen med dens egenskaber                         |
| `notion_list_block_children` | `read:notion`  | Vis underordnede blokke for en side eller blok                           |
| `notion_query_database`      | `read:notion`  | Forespørg en database med filtre, sortering og sideinddeling             |
| `notion_get_database`        | `read:notion`  | Hent databaseskemaet efter ID                                            |
| `notion_append_blocks`       | `write:notion` | Føj underordnede blokke til en overordnet blok (maks. 100 pr. anmodning) |

## Værktøjer til Agent Skill-kataloget (3)

Defineret i `open-sse/mcp-server/tools/agentSkillTools.ts`. Understøttet af `src/lib/agentSkills/catalog`. Disse værktøjer gør dokumentationskataloget med 45 Agent Skills tilgængeligt for MCP-klienter og eksterne agenter. Omfang: `read:catalog`.

| Værktøj                           | Omfang         | Beskrivelse                                                                                                                                        |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Vis alle 45 agentfærdigheder med valgfrie filtre for `category` (api\|cli) og `area`; returnerer metadata + dækning                                |
| `omniroute_agent_skills_get`      | `read:catalog` | Hent komplette metadata + indholdet af SKILL.md for en enkelt færdighed via kanonisk `id`                                                          |
| `omniroute_agent_skills_coverage` | `read:catalog` | Dækningsstatistik: hvor mange af de 23 API-, 21 CLI- og 1 konfigurationsfærdigheder der har SKILL.md-filer i filsystemet kontra katalogets totaler |

Se [AGENT-SKILLS.md](./AGENT-SKILLS.md) for hele kataloget, og hvordan eksterne agenter bruger det.

## Relaterede frameworks (v3.8.0)

Oversigten over MCP-værktøjer ovenfor (110 unikke værktøjer, beregnet af `countUniqueMcpTools()`) er bevidst
afgrænset til handlinger vedrørende routing/cache/komprimering/hukommelse/færdigheder/proxy/kontekstkilder under kørsel. To tilstødende
frameworks leveres sammen med MCP-serveren i v3.8.0 og er dokumenteret separat:

### Cloud Agents

Cloud Agents er AI-kodningsagenter, der kører uden for processen (codex-cloud, cursor-cloud, devin, jules), og som er integreret i
OmniRoute via den samme forbindelsesmodel, der bruges til LLM-udbydere. De eksponeres via
deres egen REST-grænseflade (`/api/v1/agents/*`) og er **ikke** en del af MCP-værktøjskataloget
— kald af en Cloud Agent bruger ikke et MCP-omfang.

- Implementering: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Livscyklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentation: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails er filtre før/efter udførelse (vision-bridge, pii-masker, prompt-injection),
der anvendes i chatpipelineen. De kører, før MCP-værktøjs-/routinglaget nås,
og sender strukturerede overtrædelser til revisionspipelineen; de kaldes ikke som MCP-værktøjer.

- Implementering: `src/lib/guardrails/`.
- Dokumentation: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Ved fejlfinding af et MCP-kald, der ser ud til at være blokeret, skal du kontrollere både MCP-revisionsloggen
(`scope_denied:*`-poster) og guardrails-revisionssporet — en anmodning kan blive afvist af
en guardrail, **før** den overhovedet når MCP-laget til håndhævelse af omfang.

---

## REST API-endpoints

| Endpoint               | Metode                | Beskrivelse                                                                                           | Godkendelse                    |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------- | :----------------------------- |
| `/api/mcp/status`      | `GET`                 | Serverstatus: heartbeat, HTTP-transportstatus, oversigt over revisionsaktivitet                       | Administration (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Værktøjskatalog (navn, beskrivelse, omfang, fase, kildeendpoints)                                     | Administration                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE-transportendpoint (styret af `mcpEnabled` + `mcpTransport === "sse"`)                             | API-nøgle + omfang             |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Streambar HTTP-transport (bruger `mcp-session-id`-headeren; `DELETE` afslutter sessionen)             | API-nøgle + omfang             |
| `/api/mcp/audit`       | `GET`                 | Revisionslogposter fra `mcp_tool_audit` (filtre: `limit`, `offset`, `tool`, `success`, `apiKeyId`)    | Administration                 |
| `/api/mcp/audit/stats` | `GET`                 | Aggregeret revisionsstatistik (`totalCalls`, `successRate`, `avgDurationMs`, mest anvendte værktøjer) | Administration                 |

Kildefiler: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Både SSE- og streambare HTTP-transporter er blokeret, indtil MCP-serveren er aktiveret i Indstillinger (`mcpEnabled`), og den relevante `mcpTransport` er valgt. Hvis den forkerte transport er konfigureret, returnerer routen HTTP 400 med et tip om at ændre indstillingerne.

---

## Godkendelse og scopes

MCP-værktøjskald læser scope-strenge fra kalderen. Denne kontrol er ét af tre
uafhængige navnerum. En godkendelse fra én kontrollør er ikke en godkendelse fra de andre.
Reglerne findes under [Tre scope-navnerum](#three-scope-namespaces).
Værktøjskataloget findes under [Scopes for MCP-værktøjer](#mcp-tool-scopes).

### Tre scope-navnerum

`manage` på en API-nøgle, `read:compression` på et MCP-værktøj og `read` på et
`oma_live_…`-adgangstoken er tre forskellige tilladelser. Kaldere, der sender et `read`-
adgangstoken til en muterende administrationsrute, får HTTP 403
`Access token scope 'read' is insufficient; 'write' required.`
Denne rangering er `scopeSatisfies`. Den konsulterer ikke MCP-tabellen, og MCP-
matcheren konsulterer ikke den.

| Navnerum                 | Legitimationsoplysninger                                       | Kontrollør                      | En godkendelse tillader                                       |
| :----------------------- | :------------------------------------------------------------- | :------------------------------ | :------------------------------------------------------------ |
| API-nøgleadministration  | `api_keys.scopes`                                              | `hasManageScope`                | Administrations-REST for den pågældende Bearer-nøgle          |
| Additiv API-nøgle        | samme array, én eksakt streng                                  | hjælpefunktionen nævnt nedenfor | Kun den ene funktionalitet                                    |
| Scopes for MCP-værktøjer | samme array, ellers MCP `_meta`, ellers `OMNIROUTE_MCP_SCOPES` | `scopeMatches`                  | Det pågældende værktøj, når håndhævelse er slået til          |
| Adgangstoken             | `oma_live_…`                                                   | `scopeSatisfies`                | Den administrationsrute, hvis metode og sti kræver denne rang |

Oprettelse af hver type legitimationsoplysning er beskrevet i
[Administrationsgodkendelse](../guides/MANAGEMENT-AUTH.md).

#### API-nøglescopes

Ét `api_keys.scopes`-array bruges til to opgaver. De anvender forskellige funktioner.

**Administrations-REST.** `manage` og `admin` er medlemmerne af
`MANAGEMENT_API_KEY_SCOPES` (`src/shared/constants/managementScopes.ts`).
`hasManageScope` er det, der godkender administrationsruter for den pågældende nøgle. `admin` har
administrationsrettigheder på disse ruter. Ordet `admin` her er ikke
adgangstokenets rang og udvides ikke til scopes for MCP-værktøjer.

**Additive strenge.** Hver enkelt kontrolleres for eksakt medlemskab, og hver enkelt forbliver
uden for `MANAGEMENT_API_KEY_SCOPES`.

| Scope                          | En godkendelse tillader                                                                                                                                                            |
| :----------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mcp:connect`                  | Kun LOCAL_ONLY-undtagelsen for `/api/mcp/`, når der ikke bruges loopback (`hasMcpConnectOrManageScope`). En nøgle med `manage` eller `admin` godkendes stadig af denne undtagelse. |
| `self:usage`                   | `GET /api/v1/me/status` for denne nøgle (`src/app/api/v1/me/status/route.ts`). `POST /api/keys` tilføjer dette scope ved oprettelse (`normalizeSelfServiceScopesForCreate`).       |
| `self:account-quota`           | Kvoter for upstream-konti i denne statuspayload (`src/lib/usage/apiKeySelfService.ts`). Statusruten kræver stadig `self:usage`.                                                    |
| `policy:bypass-provider-quota` | Denne nøgles inferenskald springer politikken for udbyderkvoter over (`hasProviderQuotaBypassScope` i `src/sse/handlers/chat.ts`).                                                 |

#### Matchning

Kataloget er tabellen under [Scopes for MCP-værktøjer](#mcp-tool-scopes). Betragt ikke
`MCP_SCOPE_LIST` i `src/shared/constants/mcpScopes.ts` som dette katalog:
det er den oprindelige typede delmængde. Senere værktøjer deklarerer yderligere scopes ved siden af det
(`read:notion`, `read:skills`, `read:local-corpus` og resten af tabellen).

`evaluateToolScopes` i `open-sse/mcp-server/scopeEnforcement.ts` tillader et kald,
når hvert påkrævet scope matcher et af de tildelte scopes:

- `*` matcher hvert påkrævet scope.
- Et tildelt scope, der ender på `*`, matcher et påkrævet scope, der begynder med
  præfikset før stjernen. `read:*` matcher `read:compression`.
- Alle andre tildelte scopes matcher kun den identiske påkrævede streng.

En nøgle, hvis scopes er `["manage"]`, fejler `scopeMatches` for `read:compression`.
Det samme kald fejler for `admin`, `mcp:connect`, `read` og `write`, når disse
er de eneste tildelte strenge. Der er intet hierarki blandt scopes for MCP-værktøjer
ud over det afsluttende `*`.

Håndhævelse er slået fra, medmindre `OMNIROUTE_MCP_ENFORCE_SCOPES=true` (standardværdien er
`false`). Mens den er slået fra, tillader `evaluateToolScopes` kaldet og springer
kataloget over. Mens den er slået til, bruger HTTP Bearer-nøglens `api_keys.scopes` som
`authInfo` (se [HTTP-scopebinding pr. nøgle](#per-key-http-scope-binding-7895)).
Når ingen nøglescopes kan findes, falder det tildelte sæt tilbage til MCP `_meta` og derefter
`OMNIROUTE_MCP_SCOPES`.

#### Adgangstokenscopes

`oma_live_…`-tokens (`src/lib/accessTokens/scopes.ts`) indeholder `read`, `write`
eller `admin`. `scopeSatisfies` er en rangering: `admin` dækker `write` og `read`, og
`write` dækker `read`. Ukendte scopes dækker intet.

`evaluateAccessTokenAuth` (`src/server/authz/accessTokenAuth.ts`) sammenligner denne
rangering med `inferRequiredScope` (`src/server/authz/accessScopes.ts`):

- `GET`, `HEAD` og `OPTIONS` kræver `read`.
- Alle andre metoder kræver `write`.
- Stier i `ADMIN_SCOPE_PREFIXES` kræver `admin` for alle metoder. `/api/mcp`
  findes på denne liste, så et `write`-adgangstoken kan stadig ikke kalde MCP's HTTP-
  grænseflade.
- Stier i `ADMIN_MUTATION_PREFIXES` kræver kun `admin` ved mutationer.

`PATCH /api/keys/{id}` er en mutation og findes ikke på disse administratorlister, så et
`read`-token modtager 403:
`Access token scope 'read' is insufficient; 'write' required.`
Et adgangstoken med `write` eller `admin` opfylder kravene for denne rute. En dashboard-JWT,
loopback-CLI'ens machine-id-token og en API-nøgle med `manage` eller `admin` følger
andre grene og begrænses ikke af denne rang.

Et adgangstoken, der består `scopeSatisfies` for `/api/mcp`, har kun passeret
administrationskontrollen. Værktøjskald kører stadig `scopeMatches` mod API-nøglens
scopes. Adgangstokenets rang er ikke input til `scopeMatches`.

### MCP-værktøjsscopes

Håndhævelsen af scopes er centraliseret i `open-sse/mcp-server/scopeEnforcement.ts`.
Hvert værktøj kræver specifikke scopes:

| Omfang                | Værktøjer                                                                                                                                                                       |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                               |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                       |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                          |
| `read:quota`          | `check_quota`                                                                                                                                                                   |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                          |
| `read:models`         | `list_models_catalog`                                                                                                                                                           |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                   |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                           |
| `write:budget`        | `set_budget_guard`                                                                                                                                                              |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                     |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                  |
| `read:cache`          | `cache_stats`                                                                                                                                                                   |
| `write:cache`         | `cache_flush`                                                                                                                                                                   |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                      |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                               |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                           |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                          |
| `read:memory`         | `memory_search`                                                                                                                                                                 |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                    |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                              |
| `write:skills`        | `skills_enable`                                                                                                                                                                 |
| `execute:skills`      | `skills_execute`                                                                                                                                                                |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                         |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                       |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                  |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                              |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                 |
| `read:obsidian`       | 13 læseværktøjer — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 skriveværktøjer — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …              |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                               |

Jokertegnsomfang understøttes: `read:*` giver alle læseomfang, og `*` giver fuld adgang.

### `mcp:connect` — afgrænset rutekapabilitet (#7895)

Adgang til HTTP/SSE MCP-transporten (`/api/mcp/*`) fra adresser, der ikke er loopback-adresser, kræver
`/api/mcp/`-undtagelsen fra LOCAL_ONLY (se `docs/security/ROUTE_GUARD_TIERS.md`). Historisk set
accepterede denne undtagelse kun en API-nøgle med fuldt `manage`/`admin`-omfang — for bredt for en
klient, der kun skal kommunikere med MCP. `src/shared/constants/managementScopes.ts` eksporterer nu
`MCP_CONNECT_SCOPE = "mcp:connect"`: et supplerende, afgrænset omfang (samme præcedens som
`SELF_USAGE_SCOPE`), der KUN godkender `/api/mcp/`-omgåelsen i
`src/server/authz/policies/management.ts` — det giver ingen anden adgang til administrationsruter
og er bevidst holdt UDEN FOR `MANAGEMENT_API_KEY_SCOPES`. En nøgle med `manage`/`admin`
passerer stadig undtagelsen uændret; `mcp:connect` er et alternativ med færre privilegier for
fjernklienter, der kun bruger MCP, og kontrolleres via `hasMcpConnectOrManageScope()`.

### HTTP-omfangsbinding pr. nøgle (#7895)

Over HTTP/SSE finder `open-sse/mcp-server/httpTransport.ts` nu klientens faktiske
`api_keys.scopes` via `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
og videregiver dem til MCP-SDK'ets `transport.handleRequest(req, { authInfo })`, så
`extra.authInfo.scopes`, der når hvert værktøjskald, afspejler Bearer-nøglens egne omfang.
`scopeEnforcement.ts`'s `resolveCallerScopeContext()` prioriterede allerede `authInfo` over
`_meta` og miljøvariablen `OMNIROUTE_MCP_SCOPES` som reserve — dette udfylder blot den første
kilde med højeste prioritet, som tidligere ikke blev forsynet over HTTP. Når ingen API-nøgle kan
findes (intet headerfelt, ugyldig nøgle), forbliver `authInfo` `undefined`, og opløsningen fortsætter
uændret gennem den eksisterende `meta`-/miljøkæde. Dette ændrer IKKE standardværdien for
`OMNIROUTE_MCP_ENFORCE_SCOPES` — håndhævelse skal stadig aktiveres eksplicit; denne ændring sikrer
blot, at stien pr. nøgle får forrang, når den er aktiveret. stdio har ingen identitet pr. klient (se
`mcpCallerIdentity.ts`) og påvirkes ikke — den fortsætter med reservekæden `_meta`/miljø.

---

## Miljøvariabler

| Variabel                                | Standardværdi                        | Formål                                                                                                                                     |
| :-------------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`             | Basis-URL, som MCP-serveren bruger ved kald til interne OmniRoute-API'er                                                                   |
| `OMNIROUTE_API_KEY`                     | (tom)                                | API-nøgle, der videresendes som `Authorization: Bearer` til interne API-kald                                                               |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (kun `"true"` aktiverer det) | Når aktiveret afviser manglende scopes værktøjskald og logger `scope_denied:<reason>` i revisionsloggen                                    |
| `OMNIROUTE_MCP_SCOPES`                  | (tom)                                | Kommasepareret tilladelsesliste over scopes, der som standard betragtes som "tilgængelige" (bruges, når kalderen ikke angiver egne scopes) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (ikke angivet = aktiveret)           | Når den sættes til `0/false/off/no`, deaktiveres komprimering af MCP-beskrivelser på registreringstidspunktet                              |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (ikke angivet = aktiveret)           | Alternativt alias for den samme indstilling som ovenfor                                                                                    |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                              | Afbrydelsesgrænse for interne administrationslæsninger (sundhed, robusthed, kombinationer, kvote, forbrug)                                 |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                              | Afbrydelsesgrænse for trin, der venter på en udbyder (`route_request`, `web_search`, `web_fetch`)                                          |
| `MCP_TOOL_DENY`                         | (ikke angivet = intet filter)        | Kommaseparerede værktøjsnavne, der skal fjernes fra `tools/list` (reduktion af værktøjskardinalitet — se nedenfor)                         |
| `MCP_TOOL_ALLOW`                        | (ikke angivet = intet filter)        | Kommaseparerede værktøjsnavne, der udelukkende skal beholdes (tilstand med tilladelsesliste — se nedenfor)                                 |
| `DATA_DIR`                              | `~/.omniroute`                       | Heartbeat-filen skrives til `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                       |

---

## Komprimering af beskrivelser

MCP-registre for værktøjer, prompts og ressourcer kan komprimere beskrivelser ved registrering eller oplistning for at reducere mængden af metadata, der eksponeres for klienter (og dermed omkostningen til promptkontekst). Implementeringen findes i `open-sse/mcp-server/descriptionCompressor.ts` og er integreret i MCP-serveren via `compressMcpRegistryMetadata` i `createMcpServer()`.

- Komprimeringen køres på beskrivelsesteksten med Caveman-regelsættet (`getRulesForContext("all", "full")`) og udtrækning af bevarede blokke (kodeområder, indhegnede blokke osv.), så strukturelt indhold ikke ændres.
- Slå funktionen til eller fra for hver udrulning via værdien `compression.mcpDescriptionCompressionEnabled` i indstillingstabellen `key_value` (standard: aktiveret) — tilgængelig i brugergrænsefladen som **Analyse → Komprimering af MCP-beskrivelser**.
- Slå funktionen til eller fra for hele processen via enten `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` eller `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Realtidsstatistik vises via `omniroute_compression_status` under `analytics.mcpDescriptionCompression` og mærkes med `source: "mcp_metadata_estimate"` for at skelne den fra faktiske forbrugskvitteringer fra udbydere.

---

## Reduktion af antal værktøjer (F4.3)

Beskrivelseskomprimering reducerer metadataene for hvert værktøj; **reduktion af antal værktøjer** går et skridt videre ved at reducere, _hvor mange_ værktøjer der overhovedet annonceres. Annoncering af færre værktøjer i `tools/list`-manifestet reducerer den tokenomkostning pr. anmodning, som klientens model betaler for værktøjskataloget ("lag 5"-komprimering). Implementeringen er et rent, tilstandsløst filter i `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), som er integreret i registreringsløkken i `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Valgfrit, deaktiveret som standard.** Filteret kører kun, når mindst én af to miljøvariabler er angivet. Hvis ingen af dem er angivet, annonceres alle 110 værktøjer uændret.

| Variabel         | Tilstand                                                                               |
| :--------------- | :------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Sortliste — kommaseparerede værktøjsnavne, der altid fjernes fra `tools/list`          |
| `MCP_TOOL_ALLOW` | Tilladelsesliste — kommaseparerede værktøjsnavne; kun disse bevares, alt andet fjernes |

`deny` har prioritet over `allow`. Navne er kommaseparerede, mellemrum omkring dem fjernes, og tomme elementer ignoreres. Eksempler:

```bash
# Fjern to værktøjer fra kataloget
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Annoncer kun værktøjerne til routing og kvoter (tilstand med tilladelsesliste)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Sådan fjernes filtrerede værktøjer:** Registreringen gennemføres altid. Et værktøj, som profilen afviser, deaktiveres derefter med `.disable()` på MCP SDK-håndtaget, så det aldrig vises i `tools/list`, mens forbindelsen forbliver intakt (ren aktivering/deaktivering uden genregistrering). Profilparseren er `readMcpToolProfileFromEnv(process.env)`, som returnerer `null` (ingen filtrering), når begge variabler er tomme.

Den mere omfattende `ToolProfile`-struktur bag `reduceToolManifest` understøtter også filtrering ved skæringspunkt mellem scopes (`allowScopes`, med jokertegnsmatchning i stil med `read:*`) og en deterministisk `maxTools`-grænse, men disse to indstillinger kræver adgang til hele manifestet på registreringstidspunktet og er **ikke** tilgængelige via miljøvariablerne i dag (en hook på `tools/list`-niveau er registreret som en opfølgende opgave). `estimateManifestTokens()` kan bruges til at sammenligne manifestets tokenomkostning før og efter reduktion.

---

## Runtime-heartbeat

Stdio-transporten gemmer en liveness-status i `${DATA_DIR}/runtime/mcp-heartbeat.json` hvert 5. sekund. Dashboardet (`/api/mcp/status`) læser denne fil samt PID'ets liveness-status for at udlede `online`. HTTP-transporter rapporterer i stedet status fra `getMcpHttpStatus()` i processen (ingen filskrivning).

Heartbeat-øjebliksbilledet indeholder:

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

## Revisionslogning

Hvert værktøjskald logges i SQLite-tabellen `mcp_tool_audit` af `open-sse/mcp-server/audit.ts`:

- Værktøjsnavn, argumenter (hashet/afkortet i henhold til det enkelte værktøjs `auditLevel`) og resultat
- Varighed i ms, indikator for succes/fejl og fejlmeddelelse (når relevant)
- API-nøglehash og tidsstempel
- Scope-afvisninger logges som `scope_denied:<reason>` sammen med listen over manglende scopes

Brug dashboardet eller REST-slutpunkterne `/api/mcp/audit` og `/api/mcp/audit/stats` til at gennemgå de seneste kald.

---

## Filer

| Fil                                                                      | Formål                                                                          |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------ |
| `open-sse/mcp-server/server.ts`                                          | MCP-serverfabrik, stdio-indgangspunkt, omfangsbegrænsede værktøjsregistreringer |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP-transport (sessionshåndtering)                            |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Evaluering af værktøjsomfang og identifikation af kalder                        |
| `open-sse/mcp-server/audit.ts`                                           | Revisionslogning af værktøjskald (`mcp_tool_audit`)                             |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio-heartbeat-skriver (`mcp-heartbeat.json`)                                  |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Komprimering af beskrivelser for værktøjs-, prompt- og ressourceregistre        |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod-skemaer + værktøjsregister (`MCP_TOOLS`, 45 poster)                         |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Værktøjshåndteringer til fase 2 + cache + 1proxy                                |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Håndteringer til komprimeringsværktøjer                                         |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definitioner af hukommelsesværktøjer (3 værktøjer)                              |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definitioner af færdighedsværktøjer (4 værktøjer)                               |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Værktøjsdefinitioner for Notion-kontekstkilder (6 værktøjer)                    |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definitioner af gamification-værktøjer (8 værktøjer)                            |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Værktøjer til registrering og administration af plugins (8 værktøjer)           |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status`-slutpunkt                                                     |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools`-slutpunkt                                                      |
| `src/app/api/mcp/sse/route.ts`                                           | SSE-transportrute til `/api/mcp/sse`                                            |
| `src/app/api/mcp/stream/route.ts`                                        | Streamable HTTP-transportrute til `/api/mcp/stream`                             |
| `src/app/api/mcp/audit/route.ts`                                         | Forespørgsel i revisionsloggen via `/api/mcp/audit`                             |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Aggregerede revisionsmålinger via `/api/mcp/audit/stats`                        |
| `src/lib/notion/api.ts`                                                  | Klient til Notion REST API (gentagne forsøg, timeout, fejlklassificering)       |
| `src/lib/db/notion.ts`                                                   | Lagring af Notion-token (`key_value`-tabel)                                     |
| `src/app/api/settings/notion/route.ts`                                   | API til Notion-indstillinger (GET/POST/DELETE)                                  |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Brugergrænseflade til administration af Notion-token                            |
| `tests/unit/notion-api.test.ts`                                          | Test af Notion API-klienten (7)                                                 |
| `tests/unit/notion-tools.test.ts`                                        | Test af omfangshåndhævelse for Notion-værktøjer (10)                            |
| `tests/unit/db/notion.test.mjs`                                          | Test af Notion-databasemodulet (3)                                              |
