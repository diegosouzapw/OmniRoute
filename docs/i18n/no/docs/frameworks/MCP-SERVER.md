# OmniRoute MCP Server Documentation (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol-server med 110 verktøy på tvers av operasjoner for ruting, hurtigbuffer, komprimering, minne, ferdigheter, proxy, pool, Radar og kontekstkilder.
>
> Autoritativ kilde: `open-sse/mcp-server/server.ts` beregner **110 unike verktøy** med `countUniqueMcpTools()`: 45 kanoniske definisjoner (inkludert de seks CCR-livssyklusverktøyene, agent-skills-trioen, `omniroute_radar_catalog` og `omniroute_x_search`), pluss minne (3), ferdigheter (4), GitHub-ferdigheter (3), pool (6), spillifisering (8), programtillegg (8), Notion (6), Obsidian (22), lokalt korpus (3) og to komprimeringsverktøy kun for RTK.

## Installasjon

OmniRoute MCP er innebygd. Start den med:

```bash
omniroute --mcp
```

Eller via open-sse-transporten:

```bash
# HTTP-transport med strømming (port 20130)
omniroute --dev  # MCP starter automatisk på /mcp-endepunktet
```

HTTP-transportene (`sse` / `streamable-http`, som leveres i samme prosess av kontrollpanelserveren) er
deaktivert som standard og kunne tidligere bare slås av og på fra siden `/dashboard/mcp`. Fra og med v3.8.51
har CLI-en tilsvarende funksjonalitet:

```bash
omniroute mcp status                                  # aktivert/tilkoblet, transport, antall verktøy
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # tilbakestiller aktive sse/streamable-http-økter
```

`mcp enable`/`mcp disable` sender PATCH til den samme innstillingen `mcpEnabled` (og eventuelt `mcpTransport`)
som kontrollpanelet slår av og på via `/api/settings`. `mcp restart` kaller `POST /api/mcp/restart`: den avslutter
aktive `sse`/`streamable-http`-økter, slik at neste forespørsel initialiseres på nytt uten gammel tilstand, returnerer
`409` hvis MCP er deaktivert, og `501` for `stdio`-transporten (stdio-klienter eier sin egen
underprosess — det finnes ikke noe prosessinternt håndtak som kan startes på nytt).

## Transporter

MCP-serveren tilbyr tre transporter, alle basert på den samme `createMcpServer()`-fabrikken:

| Transport         | Hvor                                        | Når den bør brukes                                      |
| :---------------- | :------------------------------------------ | :------------------------------------------------------ |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE-integrasjoner (Claude Desktop, Cursor osv.)         |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | Nettleser-/agentklienter som trenger en hendelsesstrøm  |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | HTTP-klienter med flere økter (`mcp-session-id`-header) |

Den aktive HTTP-transporten (`sse` eller `streamable-http`) velges med innstillingen `mcpTransport`. Bytte av transport lukker eksisterende økter på den andre transporten.

### Ekstern tilgang (omgåelse med manage-tilgang)

`/api/mcp/*` er i LOCAL_ONLY-nivået (`src/server/authz/routeGuard.ts`) — som standard er det bare loopback-verter (`localhost`, `127.0.0.1`, `::1`) som har tilgang. Siden v3.8.2 kan klienter som ikke bruker loopback, koble til hvis de oppgir `Authorization: Bearer <api-key>`, der nøkkelen har `manage`-tilgang. Dette er den eneste måten å nå den eksterne MCP-serveren på gjennom en tunnel, reversproxy eller et offentlig vertsnavn.

```bash
# Gi manage-tilgang: åpne siden for API-nøkler i kontrollpanelet og slå på
# "Administrasjonstilgang" for nøkkelen, eller send POST med scopes:["manage"] ved opprettelse.

# Koble deretter til fra en ekstern MCP-klient:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

En nøkkel uten manage-tilgang (eller uten Bearer) returnerer `403 LOCAL_ONLY`. Søsterprefikset `/api/cli-tools/runtime/*` kan med hensikt IKKE omgås — se [Route Guard-nivåer — unntak for manage-tilgang](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE-konfigurasjon

Se [MCP-klientkonfigurasjon](../guides/SETUP_GUIDE.md#mcp-client-configuration) for oppsett av Claude Desktop,
Cursor, Cline og kompatible MCP-klienter.

---

## Viktige verktøy (14) — Fase 1

| Verktøy                         | Tilganger             | Beskrivelse                                                                                                                         |
| :------------------------------ | :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Oppetid, minne, effektbrytere, hastighetsgrenser, hurtigbufferstatistikk                                                            |
| `omniroute_list_combos`         | `read:combos`         | Alle konfigurerte kombinasjoner med strategier (valgfrie måledata)                                                                  |
| `omniroute_get_combo_metrics`   | `read:combos`         | Ytelsesmålinger for en bestemt kombinasjon                                                                                          |
| `omniroute_switch_combo`        | `write:combos`        | Aktiver eller deaktiver en kombinasjon                                                                                              |
| `omniroute_create_combo`        | `write:combos`        | Opprett en validert kombinasjon gjennom det eksisterende API-et for kombinasjoner                                                   |
| `omniroute_check_quota`         | `read:quota`          | Brukt/total kvote, prosentandel som gjenstår, tilbakestillingstidspunkt, tokenstatus                                                |
| `omniroute_route_request`       | `execute:completions` | Send en chatfullføring gjennom OmniRoute-ruting                                                                                     |
| `omniroute_cost_report`         | `read:usage`          | Kostnadsrapport etter periode (økt/dag/uke/måned)                                                                                   |
| `omniroute_list_models_catalog` | `read:models`         | Fullstendig modellkatalog med funksjoner, status og priser                                                                          |
| `omniroute_radar_catalog`       | `read:radar`          | Lokal, signert Radar-katalog; valgfrie filtre for leverandør/familie                                                                |
| `omniroute_tool_search`         | `read:tools`          | Finn verktøy i den registrerte MCP-katalogen                                                                                        |
| `omniroute_web_search`          | `execute:search`      | Nettsøk gjennom de konfigurerte søkeleverandørene. Ikke X/Twitter.                                                                  |
| `omniroute_x_search`            | `execute:search`      | Søk på X gjennom xAI/SuperGrok, eller velg `xquik-search` for Xquik API-resultater. Krever påloggingsinformasjon for valgt backend. |
| `omniroute_web_fetch`           | `execute:search`      | Hent nettinnhold gjennom de konfigurerte henteleverandørene                                                                         |

## Avanserte verktøy (11) — Fase 2

| Verktøy                            | Tilganger                            | Beskrivelse                                                                                                            |
| :--------------------------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulering av ruting uten utførelse, med reservetre                                                                    |
| `omniroute_set_budget_guard`       | `write:budget`                       | Øktbudsjett med handling for nedgradering/blokkering/varsling                                                          |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Oppdater kombinasjonsstrategien under kjøring (prioritet/vektet/automatisk/osv.)                                       |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Bruk forhåndsinnstillingen `aggressive` / `balanced` / `conservative` for robusthet                                    |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Sanntidstest av hver leverandør i en kombinasjon ved hjelp av et reelt oppstrømskall                                   |
| `omniroute_get_provider_metrics`   | `read:health`                        | Måledata per leverandør med p50/p95/p99-latens og tilstand for effektbryter                                            |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Anbefal kombinasjon etter oppgavetype, med budsjett- og latensbegrensninger                                            |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Forklar hvorfor en forespørsel ble rutet til en leverandør (poengfaktorer + reserveløsninger)                          |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Fullstendig øyeblikksbilde av økten: kostnad, tokener, toppmodeller/-leverandører, feil, budsjettvern                  |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnostiser (og reparer eventuelt automatisk) databaseavvik, som ødelagte kombinasjonsreferanser / foreldreløse rader |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synkroniser prisdata fra eksterne kilder (LiteLLM); støtter `dryRun`                                                   |

## Hurtigbufferverktøy (2)

| Verktøy                 | Tilganger     | Beskrivelse                                                                |
| :---------------------- | :------------ | :------------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Statistikk for semantisk hurtigbuffer, ledeteksthurtigbuffer og idempotens |
| `omniroute_cache_flush` | `write:cache` | Tøm hurtigbufferen globalt eller etter signatur/modell                     |

## Komprimeringsverktøy (13)

| Verktøy                             | Tilganger           | Beskrivelse                                                                                                                                     |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Komprimeringsinnstillinger, analysesammendrag og hurtigbufferbevisst statistikk (inkluderer metadata for `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Konfigurer komprimeringsmodus, terskel, målforhold, bevaring av systemledetekst og bryter for komprimering av MCP-beskrivelser                  |
| `omniroute_set_compression_engine`  | `write:compression` | Velg den aktive motoren (off/caveman/rtk/stacked) og intensitet for Caveman/RTK                                                                 |
| `omniroute_list_compression_combos` | `read:compression`  | Vis navngitte komprimeringskombinasjoner og deres motorforløp                                                                                   |
| `omniroute_compression_combo_stats` | `read:compression`  | Analyse gruppert etter komprimeringskombinasjon og motor                                                                                        |
| `omniroute_ccr_store`               | `write:compression` | Lagre innhold som er isolert per innringer, i det avgrensede CCR-minnelageret, og returner en markør samt en `ccr://`-referanse                 |
| `omniroute_ccr_retrieve`            | `read:compression`  | Hent CCR-innhold i sin helhet eller med moduser for begynnelse, slutt, linjer, grep og statistikk                                               |
| `omniroute_ccr_inspect`             | `read:compression`  | Inspiser innringereide CCR-metadata uten å returnere innhold                                                                                    |
| `omniroute_ccr_list`                | `read:compression`  | Vis sideinndelte metadata for innringereide CCR-blokker                                                                                         |
| `omniroute_ccr_delete`              | `write:compression` | Slett en innringereid CCR-blokk                                                                                                                 |
| `omniroute_ccr_stats`               | `read:compression`  | Rapporter minnebruk avgrenset til innringeren, livssyklustellere og lagergrenser                                                                |
| `omniroute_rtk_discover`            | `read:compression`  | Oppdag gjentakende støy i aktivt valgte RTK-utdataeksempler                                                                                     |
| `omniroute_rtk_learn`               | `read:compression`  | Generer et RTK-filterutkast som kan gjennomgås, fra aktivt valgte eksempler                                                                     |

CCR-oppføringer finnes bare i minnet og forsvinner ved omstart. Hver blokk er begrenset til 2 MiB, hver
prinsipal til 16 MiB og det globale lageret til 64 MiB. Oppføringer har som standard en TTL på 24 timer (maksimalt
sju dager). Fullstendig MCP-henting er begrenset til 256 KiB; større blokker er fortsatt tilgjengelige gjennom
område- og grep-modusene. Lagring, henting, oppføring, inspeksjon, sletting og statistikk er isolert etter
prinsipalen til den autentiserte API-nøkkelen. Revisjonslogger inneholder hasher og størrelsesmetadata, aldri innhold.

`omniroute_compression_status` rapporterer komprimering av MCP-beskrivelser separat under
`analytics.mcpDescriptionCompression`. Disse verdiene er estimater for metadatastørrelsen til MCP-beskrivelser
som kan listes opp (`tools`, `prompts`, `resources` og `resourceTemplates`); de er ikke kvitteringer for
leverandørbruk og er merket med `source: "mcp_metadata_estimate"`.

### MCP-filter for tilgjengelighetstrær (v3.8.0)

Uavhengig av komprimeringsverktøyene ovenfor inkluderer OmniRoute et filter som kjøres etter
utførelse og komprimerer **verktøyresultatene** fra MCP-verktøy for nettlesere/tilgjengelighet før de
returneres til agenten. Dette filteret er ikke i seg selv et verktøy — det kjøres transparent på alle
verktøyresultater som inneholder omfattende tekst fra tilgjengelighetstrær eller nettleserøyeblikksbilder
(≥2000 tegn).

Viktig funksjonalitet:

- Slår sammen ≥30 påfølgende, gjentatte søskenlinjer til et sammendrag med begynnelse + avslutning
- Bevarer `[ref=eXX]`-ankre som kreves av Playwright/datamaskinbruk
- Hardavkorter overdimensjonert tekst (>50,000 tegn) med et navigasjonstips
- Forventet besparelse: **60–80%** for nyttelast fra nettleserøyeblikksbilder

Konfigurasjon: `compression.mcpAccessibility` i globale innstillinger (migrering 056).
Implementasjon: `open-sse/services/compression/engines/mcpAccessibility/`.
Fullstendig dokumentasjon: [Komprimeringsmotorer — MCP-filter for tilgjengelighetstrær](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Se [Komprimeringsmotorer](../compression/COMPRESSION_ENGINES.md) og [RTK-komprimering](../compression/RTK_COMPRESSION.md) for
kjøretidsmodellen for komprimering som ligger til grunn for disse verktøyene.

## 1Proxy-verktøy (3)

| Verktøy                     | Tilganger      | Beskrivelse                                                                               |
| :-------------------------- | :------------- | :---------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Hent gratis proxyer fra 1proxy-markedsplassen (filtre for protokoll/land/kvalitet/antall) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Hent neste tilgjengelige proxy etter strategi (`random` / `quality` / `sequential`)       |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statistikk for utvalget, synkroniseringsstatus og fordeling etter protokoll og land       |

## Minneverktøy (3)

Definert i `open-sse/mcp-server/tools/memoryTools.ts`. Autentisering/tilgang håndheves gjennom standardprosessen for MCP-tilganger.

| Verktøy                   | Tilganger      | Beskrivelse                                                                               |
| :------------------------ | :------------- | :---------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Søk i minner etter spørring/type/API-nøkkel med håndheving av tokenbudsjett               |
| `omniroute_memory_add`    | `write:memory` | Legg til en ny minneoppføring (`factual` / `episodic` / `procedural` / `semantic`)        |
| `omniroute_memory_clear`  | `write:memory` | Tøm minner for en API-nøkkel, eventuelt filtrert etter type eller `olderThan`-tidsstempel |

## Ferdighetsverktøy (4)

Definert i `open-sse/mcp-server/tools/skillTools.ts`. Støttet av `src/lib/skills/registry` + `src/lib/skills/executor`.

| Verktøy                       | Tilganger        | Beskrivelse                                                                                       |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | Vis registrerte ferdigheter med valgfri filtrering etter API-nøkkel, navn eller aktivert tilstand |
| `omniroute_skills_enable`     | `write:skills`   | Aktiver eller deaktiver en bestemt ferdighet etter ID                                             |
| `omniroute_skills_execute`    | `execute:skills` | Kjør en ferdighet med angitte inndata, og returner kjøringsoppføringen                            |
| `omniroute_skills_executions` | `read:skills`    | Vis nylig kjøringshistorikk for ferdigheter                                                       |

## Notion-kontekstkilde (6)

Definert i `open-sse/mcp-server/tools/notionTools.ts`. Token lagres i `key_value`-tabellen via `src/lib/db/notion.ts`. REST-klient i `src/lib/notion/api.ts`. API for innstillinger i `src/app/api/settings/notion/route.ts`. Brukergrensesnitt for kontrollpanelet i `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Konfigurer Notion-integrasjonstokenet ditt fra fanen **Kontekstkilder** i endepunktets kontrollpanel, eller via REST-API-et:

```bash
# Angi token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Kontroller status
curl http://localhost:20128/api/settings/notion

# Koble fra
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Verktøy                      | Tilganger      | Beskrivelse                                                                     |
| :--------------------------- | :------------- | :------------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Fulltekstsøk på tvers av alle sider og databaser                                |
| `notion_get_page`            | `read:notion`  | Hent en side etter ID sammen med egenskapene                                    |
| `notion_list_block_children` | `read:notion`  | Vis underordnede blokker for en side eller blokk                                |
| `notion_query_database`      | `read:notion`  | Spørr en database med filtre, sortering og paginering                           |
| `notion_get_database`        | `read:notion`  | Hent databaseskjema etter ID                                                    |
| `notion_append_blocks`       | `write:notion` | Legg til underordnede blokker i en overordnet blokk (maks. 100 per forespørsel) |

## Verktøy for Agent Skill-katalogen (3)

Definert i `open-sse/mcp-server/tools/agentSkillTools.ts`. Støttet av `src/lib/agentSkills/catalog`. Disse verktøyene gjør dokumentasjonskatalogen med 45 Agent Skills tilgjengelig for MCP-klienter og eksterne agenter. Omfang: `read:catalog`.

| Verktøy                           | Omfang         | Beskrivelse                                                                                                                                            |
| :-------------------------------- | :------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Vis alle de 45 agentferdighetene med valgfrie filtre for `category` (api\|cli) og `area`; returnerer metadata + dekning                                |
| `omniroute_agent_skills_get`      | `read:catalog` | Hent fullstendige metadata + innholdet i SKILL.md for én ferdighet etter kanonisk `id`                                                                 |
| `omniroute_agent_skills_coverage` | `read:catalog` | Dekningsstatistikk: hvor mange av de 23 API-, 21 CLI- og 1 konfigurasjonsferdighetene som har SKILL.md-filer i filsystemet kontra totalene i katalogen |

Se [AGENT-SKILLS.md](./AGENT-SKILLS.md) for hele katalogen og hvordan eksterne agenter bruker den.

## Relaterte rammeverk (v3.8.0)

Oversikten over MCP-verktøy ovenfor (110 unike verktøy, beregnet av `countUniqueMcpTools()`) er bevisst
avgrenset til operasjoner for ruting, hurtigbuffer, komprimering, minne, ferdigheter, proxy og kontekstkilder under kjøring. To tilstøtende
rammeverk leveres sammen med MCP-serveren i v3.8.0 og er dokumentert separat:

### Skyagenter

Skyagenter er KI-kodeagenter som kjører utenfor prosessen (codex-cloud, cursor-cloud, devin, jules), og som er koblet til
OmniRoute gjennom den samme tilkoblingsmodellen som brukes for LLM-leverandører. De eksponeres via
sitt eget REST-grensesnitt (`/api/v1/agents/*`) og er **ikke** en del av MCP-verktøykatalogen
— et kall til en skyagent bruker ikke et MCP-omfang.

- Implementasjon: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Livssyklus: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentasjon: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Sikkerhetsrekkverk

Sikkerhetsrekkverk er filtre før/etter kjøring (vision-bridge, pii-masker, prompt-injection)
som brukes inne i chatforløpet. De kjører før MCP-verktøy-/rutingslaget nås
og sender strukturerte brudd til revisjonsforløpet; de kalles ikke som MCP-verktøy.

- Implementasjon: `src/lib/guardrails/`.
- Dokumentasjon: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Når du feilsøker et MCP-kall som ser ut til å være blokkert, bør du kontrollere både MCP-revisjonsloggen
(`scope_denied:*`-oppføringer) og revisjonssporet for sikkerhetsrekkverk — en forespørsel kan bli avvist av
et sikkerhetsrekkverk **før** den når frem til laget som håndhever MCP-omfang.

---

## REST API-endepunkter

| Endepunkt              | Metode                | Beskrivelse                                                                                              | Autentisering              |
| :--------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | Serverstatus: livssignal, HTTP-transportstatus, sammendrag av revisjonsaktivitet                         | Administrasjon (økt/admin) |
| `/api/mcp/tools`       | `GET`                 | Verktøykatalog (navn, beskrivelse, omfang, fase, kildeendepunkter)                                       | Administrasjon             |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE-transportendepunkt (styrt av `mcpEnabled` + `mcpTransport === "sse"`)                                | API-nøkkel + omfang        |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Strømmbar HTTP-transport (bruker `mcp-session-id`-headeren; `DELETE` avslutter økten)                    | API-nøkkel + omfang        |
| `/api/mcp/audit`       | `GET`                 | Revisjonsloggoppføringer fra `mcp_tool_audit` (filtre: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Administrasjon             |
| `/api/mcp/audit/stats` | `GET`                 | Aggregert revisjonsstatistikk (`totalCalls`, `successRate`, `avgDurationMs`, mest brukte verktøy)        | Administrasjon             |

Kildefiler: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Både SSE- og strømbare HTTP-transporter er blokkert frem til MCP-serveren aktiveres i Innstillinger (`mcpEnabled`) og riktig `mcpTransport` velges. Hvis feil transport er konfigurert, returnerer ruten HTTP 400 med et tips om å endre innstillingene.

---

## Autentisering og tilganger

MCP-verktøy autentiseres gjennom API-nøkkeltilganger. Håndheving av tilganger er sentralisert i
`open-sse/mcp-server/scopeEnforcement.ts`. Hvert verktøy krever bestemte tilganger:

| Omfang                | Verktøy                                                                                                                                                                       |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                             |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                     |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                        |
| `read:quota`          | `check_quota`                                                                                                                                                                 |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                        |
| `read:models`         | `list_models_catalog`                                                                                                                                                         |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                 |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                         |
| `write:budget`        | `set_budget_guard`                                                                                                                                                            |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                   |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                |
| `read:cache`          | `cache_stats`                                                                                                                                                                 |
| `write:cache`         | `cache_flush`                                                                                                                                                                 |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                    |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                             |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                         |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                              |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                        |
| `read:memory`         | `memory_search`                                                                                                                                                               |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                  |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                            |
| `write:skills`        | `skills_enable`                                                                                                                                                               |
| `execute:skills`      | `skills_execute`                                                                                                                                                              |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                              |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                       |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                     |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                              |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                            |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                               |
| `read:obsidian`       | 13 leseverktøy — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 skriveverktøy — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …              |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                             |

Jokertegnomfang støttes: `read:*` gir alle lesetilganger, `*` gir full tilgang.

### `mcp:connect` — begrenset rutefunksjonalitet (#7895)

Tilgang til HTTP/SSE MCP-transporten (`/api/mcp/*`) fra adresser som ikke er loopback, krever
`/api/mcp/`-unntaket fra LOCAL_ONLY (se `docs/security/ROUTE_GUARD_TIERS.md`). Tidligere
godtok dette unntaket bare en API-nøkkel med fullt `manage`/`admin`-omfang — for bredt for en
klient som bare trenger å kommunisere med MCP. `src/shared/constants/managementScopes.ts`
eksporterer nå `MCP_CONNECT_SCOPE = "mcp:connect"`: et additivt, begrenset omfang (etter samme
presedens som `SELF_USAGE_SCOPE`) som KUN autoriserer omgåelsen for `/api/mcp/` i
`src/server/authz/policies/management.ts` — det gir ingen annen tilgang til administrasjonsruter
og holdes med hensikt UTENFOR `MANAGEMENT_API_KEY_SCOPES`. En nøkkel med `manage`/`admin`
passerer fortsatt unntaket uendret; `mcp:connect` er et alternativ med lavere privilegier for
eksterne klienter som kun bruker MCP, kontrollert via `hasMcpConnectOrManageScope()`.

### HTTP-omfangsbinding per nøkkel (#7895)

Over HTTP/SSE slår `open-sse/mcp-server/httpTransport.ts` nå opp innringerens faktiske
`api_keys.scopes` via `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
og sender det til MCP SDK-ens `transport.handleRequest(req, { authInfo })`, slik at
`extra.authInfo.scopes` som når hvert verktøykall, gjenspeiler Bearer-nøkkelens egne omfang.
`resolveCallerScopeContext()` i `scopeEnforcement.ts` prioriterte allerede `authInfo` over
reserveløsningen med `_meta` og miljøvariabelen `OMNIROUTE_MCP_SCOPES` — dette fyller bare ut
den første kilden med høyest prioritet, som tidligere ikke ble matet over HTTP. Når ingen
API-nøkkel kan slås opp (manglende header eller ugyldig nøkkel), forblir `authInfo` `undefined`,
og oppslaget går videre til den eksisterende `meta`/miljøvariabel-kjeden uendret. Dette endrer
IKKE standardverdien for `OMNIROUTE_MCP_ENFORCE_SCOPES` — håndheving må fortsatt aktiveres
eksplisitt; denne endringen gjør bare at banen per nøkkel får forrang når den er aktivert.
stdio har ingen identitet per innringer (se `mcpCallerIdentity.ts`) og påvirkes ikke — den
fortsetter å bruke reserveløsningen med `_meta`/miljøvariabel-kjeden.

---

## Miljøvariabler

| Variabel                                | Standardverdi                         | Formål                                                                                                                                             |
| :-------------------------------------- | :------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`              | Basis-URL-en MCP-serveren bruker ved kall til interne OmniRoute-API-er                                                                             |
| `OMNIROUTE_API_KEY`                     | (tom)                                 | API-nøkkel som videresendes som `Authorization: Bearer` til interne API-kall                                                                       |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (bare `"true"` aktiverer det) | Når aktivert vil manglende virkeområder avvise verktøykall og logge `scope_denied:<reason>` i revisjonsloggen                                      |
| `OMNIROUTE_MCP_SCOPES`                  | (tom)                                 | Kommaseparert tillatelsesliste over virkeområder som anses som «tilgjengelige» som standard (brukes når innringeren ikke oppgir egne virkeområder) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (ikke angitt = på)                    | Når satt til `0/false/off/no`, deaktiveres komprimering av MCP-beskrivelser ved registrering                                                       |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (ikke angitt = på)                    | Alternativt alias for samme innstilling som ovenfor                                                                                                |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                               | Tidsgrense for avbrudd ved interne administrasjonslesinger (helse, robusthet, kombinasjoner, kvote, bruk)                                          |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                               | Tidsgrense for avbrudd ved hopp som venter på en leverandør (`route_request`, `web_search`, `web_fetch`)                                           |
| `MCP_TOOL_DENY`                         | (ikke angitt = intet filter)          | Kommaseparerte verktøynavn som skal fjernes fra `tools/list` (reduksjon av antall verktøy — se nedenfor)                                           |
| `MCP_TOOL_ALLOW`                        | (ikke angitt = intet filter)          | Kommaseparerte verktøynavn som skal beholdes eksklusivt (tillatelseslistemodus — se nedenfor)                                                      |
| `DATA_DIR`                              | `~/.omniroute`                        | Heartbeat-filen skrives til `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                               |

---

## Beskrivelseskomprimering

MCP-registre for verktøy, ledetekster og ressurser kan komprimere beskrivelser ved registrering/visning for å redusere mengden metadata som eksponeres for klienter (og dermed kostnaden for ledetekstkontekst). Implementasjonen ligger i `open-sse/mcp-server/descriptionCompressor.ts` og er koblet til MCP-serveren via `compressMcpRegistryMetadata` i `createMcpServer()`.

- Komprimering kjøres på beskrivelsesteksten ved hjelp av Caveman-regelsettet (`getRulesForContext("all", "full")`) med uttrekking av bevarte blokker (kodeutdrag, inngjerdede blokker osv.), slik at strukturelt innhold ikke endres.
- Aktiver eller deaktiver per distribusjon via verdien `compression.mcpDescriptionCompressionEnabled` i innstillingstabellen `key_value` (standard: aktivert) — tilgjengelig i brukergrensesnittet som **Analyse → Komprimering av MCP-beskrivelser**.
- Aktiver eller deaktiver for hele prosessen via enten `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` eller `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Sanntidsstatistikk vises via `omniroute_compression_status` under `analytics.mcpDescriptionCompression` og merkes med `source: "mcp_metadata_estimate"` for å skille den fra faktiske bruksdata fra leverandører.

---

## Reduksjon av verktøyantall (F4.3)

Beskrivelseskomprimering reduserer metadataene til hvert verktøy. **Reduksjon av verktøyantall** går ett skritt videre ved å redusere _hvor mange_ verktøy som i det hele tatt annonseres. Ved å annonsere færre verktøy i `tools/list`-manifestet reduseres tokenkostnaden per forespørsel som klientens modell betaler for verktøykatalogen («lag 5»-komprimering). Implementasjonen er et rent, tilstandsløst filter i `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), koblet inn i registreringsløkken i `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Må aktiveres, deaktivert som standard.** Filteret kjører bare når minst én av to miljøvariabler er angitt. Når ingen av dem er angitt, annonseres alle de 110 verktøyene uendret.

| Variabel         | Modus                                                                                 |
| :--------------- | :------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | Blokkeringsliste — kommaseparerte verktøynavn som alltid fjernes fra `tools/list`     |
| `MCP_TOOL_ALLOW` | Tillatelsesliste — kommaseparerte verktøynavn; bare disse beholdes, alt annet fjernes |

`deny` har prioritet over `allow`. Navnene er kommaseparerte, mellomrom fjernes, og tomme oppføringer ignoreres. Eksempler:

```bash
# Fjern to verktøy fra katalogen
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Annonser bare rutings- og kvoteverktøyene (tillatelseslistemodus)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Slik fjernes filtrerte verktøy:** Registreringen lykkes alltid. Et verktøy som avvises av profilen, blir deretter deaktivert med `.disable()` på MCP SDK-håndtaket, slik at det aldri vises i `tools/list`, samtidig som koblingen forblir intakt (ryddig aktivering/deaktivering, uten ny registrering). Profilparseren er `readMcpToolProfileFromEnv(process.env)`, som returnerer `null` (ingen filtrering) når begge variablene er tomme.

Den mer omfattende `ToolProfile`-strukturen bak `reduceToolManifest` støtter også filtrering etter overlappende omfang (`allowScopes`, med jokertegnmatching av typen `read:*`) og en deterministisk `maxTools`-grense, men disse to innstillingene krever hele manifestet ved registrering og er **ikke** tilgjengelige via miljøvariablene i dag (en hook på `tools/list`-nivå er registrert som en oppfølging). `estimateManifestTokens()` kan brukes til å sammenligne manifestets tokenkostnad før og etter reduksjon.

---

## Kjøretidssignal

Stdio-transporten lagrer et signal om aktiv tilstand i `${DATA_DIR}/runtime/mcp-heartbeat.json` hvert 5. sekund. Kontrollpanelet (`/api/mcp/status`) leser denne filen sammen med PID-statusen for å utlede `online`. HTTP-transporter rapporterer i stedet status fra `getMcpHttpStatus()` i den kjørende prosessen (ingen filskriving).

Øyeblikksbildet av kjøretidssignalet inneholder:

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

## Revisjonslogging

Hvert verktøykall logges i SQLite-tabellen `mcp_tool_audit` av `open-sse/mcp-server/audit.ts`:

- Verktøynavn, argumenter (hashet/avkortet i henhold til verktøyets `auditLevel`), resultat
- Varighet i ms, flagg for vellykket/mislykket kjøring, feilmelding (når aktuelt)
- API-nøkkelhash, tidsstempel
- Omfangsavvisninger logges som `scope_denied:<reason>` med listen over manglende omfang

Bruk kontrollpanelet eller REST-endepunktene `/api/mcp/audit` og `/api/mcp/audit/stats` til å inspisere nylige kall.

---

## Filer

| Fil                                                                      | Formål                                                                       |
| :----------------------------------------------------------------------- | :--------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP-serverfabrikk, stdio-inngangspunkt, omfangsbaserte verktøyregistreringer |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE- og Streamable HTTP-transport (sesjonshåndtering)                        |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Evaluering av verktøyomfang og identifisering av anroper                     |
| `open-sse/mcp-server/audit.ts`                                           | Revisjonslogging av verktøykall (`mcp_tool_audit`)                           |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | stdio-hjerteslagskriver (`mcp-heartbeat.json`)                               |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Komprimering av beskrivelser for verktøy-, ledetekst- og ressursregistre     |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod-skjemaer og verktøyregister (`MCP_TOOLS`, 45 oppføringer)                |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Behandlere for fase 2-, hurtigbuffer- og 1proxy-verktøy                      |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Behandlere for komprimeringsverktøy                                          |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definisjoner av minneverktøy (3 verktøy)                                     |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definisjoner av ferdighetsverktøy (4 verktøy)                                |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Verktøydefinisjoner for Notion-kontekstkilder (6 verktøy)                    |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definisjoner av spillifiseringsverktøy (8 verktøy)                           |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Verktøy for registrering og administrasjon av programtillegg (8 verktøy)     |
| `src/app/api/mcp/status/route.ts`                                        | Endepunktet `/api/mcp/status`                                                |
| `src/app/api/mcp/tools/route.ts`                                         | Endepunktet `/api/mcp/tools`                                                 |
| `src/app/api/mcp/sse/route.ts`                                           | SSE-transportrute for `/api/mcp/sse`                                         |
| `src/app/api/mcp/stream/route.ts`                                        | Streamable HTTP-transportrute for `/api/mcp/stream`                          |
| `src/app/api/mcp/audit/route.ts`                                         | Spørring i revisjonsloggen for `/api/mcp/audit`                              |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Aggregerte revisjonsmålinger for `/api/mcp/audit/stats`                      |
| `src/lib/notion/api.ts`                                                  | Klient for Notion REST API (nye forsøk, tidsavbrudd, feilklassifisering)     |
| `src/lib/db/notion.ts`                                                   | Lagring av Notion-token (`key_value`-tabellen)                               |
| `src/app/api/settings/notion/route.ts`                                   | API for Notion-innstillinger (GET/POST/DELETE)                               |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Brukergrensesnitt for administrasjon av Notion-token                         |
| `tests/unit/notion-api.test.ts`                                          | Tester av Notion API-klienten (7)                                            |
| `tests/unit/notion-tools.test.ts`                                        | Tester av omfangshåndheving for Notion-verktøy (10)                          |
| `tests/unit/db/notion.test.mjs`                                          | Tester av Notion-databasemodulen (3)                                         |
