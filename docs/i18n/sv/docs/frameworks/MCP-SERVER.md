# OmniRoute MCP Server Documentation (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Model Context Protocol-server med 110 verktyg för routning, cache, komprimering, minne, färdigheter, proxy, pool, Radar och kontextkällåtgärder.
>
> Sanningskälla: `open-sse/mcp-server/server.ts` beräknar **110 unika verktyg** med `countUniqueMcpTools()`: 45 kanoniska definitioner (inklusive de sex CCR-livscykelverktygen, trion med agentfärdigheter, `omniroute_radar_catalog` och `omniroute_x_search`), plus minne (3), färdigheter (4), GitHub-färdigheter (3), pool (6), spelifiering (8), insticksprogram (8), Notion (6), Obsidian (22), lokal korpus (3) och två komprimeringsverktyg enbart för RTK.

## Installation

OmniRoute MCP är inbyggt. Starta det med:

```bash
omniroute --mcp
```

Eller via open-sse-transporten:

```bash
# HTTP-transport med strömning (port 20130)
omniroute --dev  # MCP startas automatiskt på /mcp-slutpunkten
```

HTTP-transporterna (`sse` / `streamable-http`, som tillhandahålls i samma process av instrumentpanelens server) är
inaktiverade som standard och kunde tidigare endast aktiveras eller inaktiveras från sidan `/dashboard/mcp`. Från och med v3.8.51
har CLI:n motsvarande funktionalitet:

```bash
omniroute mcp status                                  # aktiverad/online, transport, antal verktyg
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # återställer aktiva sse/streamable-http-sessioner
```

`mcp enable`/`mcp disable` skickar PATCH för samma inställning `mcpEnabled` (och valfritt `mcpTransport`)
som instrumentpanelen växlar via `/api/settings`. `mcp restart` anropar `POST /api/mcp/restart`: det avslutar
aktiva `sse`/`streamable-http`-sessioner så att nästa begäran initieras om på ett rent sätt, returnerar
`409` om MCP är inaktiverat och `501` för transporten `stdio` (stdio-klienter äger sin egen
underprocess — det finns inget handtag i processen att starta om).

## Transporter

MCP-servern exponerar tre transporter, alla baserade på samma `createMcpServer()`-fabrik:

| Transport         | Var                                         | När den ska användas                                        |
| :---------------- | :------------------------------------------ | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | IDE-integrationer (Claude Desktop, Cursor osv.)             |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | Webbläsar-/agentklienter som behöver en händelseström       |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | HTTP-klienter med flera sessioner (`mcp-session-id`-header) |

Den aktiva HTTP-transporten (`sse` eller `streamable-http`) väljs med inställningen `mcpTransport`. När du byter transport stängs befintliga sessioner för den andra transporten.

### Fjärråtkomst (förbigång med manage-behörighet)

`/api/mcp/*` finns på nivån LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — som standard kan endast loopback-värdar (`localhost`, `127.0.0.1`, `::1`) nå den. Sedan v3.8.2 kan klienter som inte använder loopback ansluta om de skickar en `Authorization: Bearer <api-key>` vars nyckel har behörigheten `manage`. Detta är det enda sättet att nå MCP-fjärrservern genom en tunnel, omvänd proxy eller ett offentligt värdnamn.

```bash
# Bevilja manage-behörighet: öppna sidan API Keys i instrumentpanelen och aktivera
# "Management Access" för nyckeln, eller ange POST scopes:["manage"] när den skapas.

# Anslut sedan från en MCP-fjärrklient:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

En nyckel utan `manage` (eller utan Bearer) returnerar `403 LOCAL_ONLY`. Syskonprefixet `/api/cli-tools/runtime/*` går avsiktligen INTE att kringgå — se [Nivåer för routningsskydd — undantag för manage-behörighet](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## IDE-konfiguration

Se [MCP-klientkonfiguration](../guides/SETUP_GUIDE.md#mcp-client-configuration) för konfiguration av Claude Desktop,
Cursor, Cline och kompatibla MCP-klienter.

---

## Grundläggande verktyg (14) — Fas 1

| Verktyg                         | Behörigheter          | Beskrivning                                                                                                                    |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Drifttid, minne, kretsbrytare, hastighetsgränser, cachestatistik                                                               |
| `omniroute_list_combos`         | `read:combos`         | Alla konfigurerade kombinationer med strategier (valfria mätvärden)                                                            |
| `omniroute_get_combo_metrics`   | `read:combos`         | Prestandamätvärden för en specifik kombination                                                                                 |
| `omniroute_switch_combo`        | `write:combos`        | Aktivera eller inaktivera en kombination                                                                                       |
| `omniroute_create_combo`        | `write:combos`        | Skapa en validerad kombination via det befintliga kombinations-API:et                                                          |
| `omniroute_check_quota`         | `read:quota`          | Använd/total kvot, återstående procent, återställningstid, tokenstatus                                                         |
| `omniroute_route_request`       | `execute:completions` | Skicka en chattkomplettering via OmniRoute-dirigering                                                                          |
| `omniroute_cost_report`         | `read:usage`          | Kostnadsrapport per period (session/dag/vecka/månad)                                                                           |
| `omniroute_list_models_catalog` | `read:models`         | Fullständig modellkatalog med funktioner, status och prissättning                                                              |
| `omniroute_radar_catalog`       | `read:radar`          | Lokal signerad Radar-katalog; valfria filter för leverantör/familj                                                             |
| `omniroute_tool_search`         | `read:tools`          | Upptäck verktyg från det registrerade MCP-katalogen                                                                            |
| `omniroute_web_search`          | `execute:search`      | Webbsökning via de konfigurerade sökleverantörerna. Inte X/Twitter.                                                            |
| `omniroute_x_search`            | `execute:search`      | Sök på X via xAI/SuperGrok, eller välj `xquik-search` för Xquik API-resultat. Kräver autentiseringsuppgifter för vald backend. |
| `omniroute_web_fetch`           | `execute:search`      | Hämta webbinnehåll via de konfigurerade hämtningsleverantörerna                                                                |

## Avancerade verktyg (11) — Fas 2

| Verktyg                            | Behörigheter                         | Beskrivning                                                                                                                 |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Simulering av dirigering utan körning, med reservträd                                                                       |
| `omniroute_set_budget_guard`       | `write:budget`                       | Sessionsbudget med åtgärd för nedgradering/blockering/avisering                                                             |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Uppdatera kombinationsstrategin under körning (prioritet/viktad/automatisk/osv.)                                            |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Tillämpa förinställningen `aggressive` / `balanced` / `conservative` för motståndskraft                                     |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Livetest av varje leverantör i en kombination med ett verkligt anrop till uppströmstjänsten                                 |
| `omniroute_get_provider_metrics`   | `read:health`                        | Mätvärden per leverantör med p50/p95/p99-latens och kretsbrytarstatus                                                       |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Rekommendera kombination efter uppgiftstyp med budget-/latensbegränsningar                                                  |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Förklara varför en begäran dirigerades till en leverantör (poängfaktorer + reservvägar)                                     |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Fullständig sessionsögonblicksbild: kostnad, token, toppmodeller/-leverantörer, fel, budgetskydd                            |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnostisera (och eventuellt reparera automatiskt) databasavvikelser som trasiga kombinationsreferenser/föräldralösa rader |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synkronisera prisdata från externa källor (LiteLLM); stöder `dryRun`                                                        |

## Cacheverktyg (2)

| Verktyg                 | Behörigheter  | Beskrivning                                               |
| :---------------------- | :------------ | :-------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Statistik för semantisk cache, promptcache och idempotens |
| `omniroute_cache_flush` | `write:cache` | Töm cachen globalt eller efter signatur/modell            |

## Komprimeringsverktyg (13)

| Verktyg                             | Behörigheter        | Beskrivning                                                                                                                                  |
| :---------------------------------- | :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Komprimeringsinställningar, analyssammanfattning och cachemedveten statistik (inkluderar metadata för `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Konfigurera komprimeringsläge, tröskelvärde, målförhållande, bevarande av systemprompt och växling av MCP-beskrivningskomprimering           |
| `omniroute_set_compression_engine`  | `write:compression` | Välj aktiv motor (off/caveman/rtk/stacked) och intensitet för Caveman/RTK                                                                    |
| `omniroute_list_compression_combos` | `read:compression`  | Lista namngivna komprimeringskombinationer och deras motorpipelines                                                                          |
| `omniroute_compression_combo_stats` | `read:compression`  | Analys grupperad efter komprimeringskombination och motor                                                                                    |
| `omniroute_ccr_store`               | `write:compression` | Lagra anroparisolerat innehåll i det storleksbegränsade CCR-minnet och returnera en markör samt en `ccr://`-referens                         |
| `omniroute_ccr_retrieve`            | `read:compression`  | Hämta CCR-innehåll i sin helhet eller med lägen för början, slutet, rader, grep och statistik                                                |
| `omniroute_ccr_inspect`             | `read:compression`  | Inspektera anroparägd CCR-metadata utan att returnera innehåll                                                                               |
| `omniroute_ccr_list`                | `read:compression`  | Lista sidindelad metadata för anroparägda CCR-block                                                                                          |
| `omniroute_ccr_delete`              | `write:compression` | Ta bort ett anroparägt CCR-block                                                                                                             |
| `omniroute_ccr_stats`               | `read:compression`  | Rapportera anroparspecifik minnesanvändning, livscykelräknare och lagringsgränser                                                            |
| `omniroute_rtk_discover`            | `read:compression`  | Upptäck återkommande brus i frivilligt tillhandahållna RTK-utdataexempel                                                                     |
| `omniroute_rtk_learn`               | `read:compression`  | Generera ett granskningsbart utkast till RTK-filter från frivilligt tillhandahållna exempel                                                  |

CCR-poster lagras endast i minnet och försvinner vid omstart. Varje block är begränsat till 2 MiB, varje
huvudman till 16 MiB och det globala lagret till 64 MiB. Poster har som standard en TTL på 24 timmar (högst
sju dagar). Fullständig hämtning via MCP är begränsad till 256 KiB; större block förblir tillgängliga via
intervall- och grep-lägena. Lagring, hämtning, listning, inspektion, borttagning och statistik isoleras efter
den autentiserade API-nyckelns huvudman. Granskningsposter innehåller hashvärden och storleksmetadata, aldrig innehåll.

`omniroute_compression_status` rapporterar komprimering av MCP-beskrivningar separat under
`analytics.mcpDescriptionCompression`. Dessa värden är uppskattningar av metadatastorleken för
listbara MCP-beskrivningar (`tools`, `prompts`, `resources` och `resourceTemplates`); de är inte
leverantörskvitton för användning och är markerade med `source: "mcp_metadata_estimate"`.

### MCP-filter för tillgänglighetsträd (v3.8.0)

Utöver komprimeringsverktygen ovan innehåller OmniRoute ett filter efter körning som
komprimerar **verktygsresultaten** från MCP-webbläsar-/tillgänglighetsverktyg innan de returneras till
agenten. Detta filter är inte i sig ett verktyg — det körs transparent på alla verktygsresultat som innehåller
utförlig text från tillgänglighetsträd eller webbläsarögonblicksbilder (≥2000 tecken).

Viktiga beteenden:

- Komprimerar ≥30 efterföljande upprepade syskonrader till en sammanfattning med början + slut
- Bevarar `[ref=eXX]`-ankare som krävs av Playwright/datoranvändning
- Hårdkapning av överdimensionerad text (>50 000 tecken) med en navigeringstips
- Förväntad besparing: **60–80 %** för nyttolaster med webbläsarögonblicksbilder

Konfiguration: `compression.mcpAccessibility` i globala inställningar (migrering 056).
Implementering: `open-sse/services/compression/engines/mcpAccessibility/`.
Fullständig dokumentation: [Komprimeringsmotorer — MCP-filter för tillgänglighetsträd](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Se [Komprimeringsmotorer](../compression/COMPRESSION_ENGINES.md) och [RTK-komprimering](../compression/RTK_COMPRESSION.md) för
modellen för körningskomprimering bakom dessa verktyg.

## 1Proxy-verktyg (3)

| Verktyg                     | Behörigheter   | Beskrivning                                                                                            |
| :-------------------------- | :------------- | :----------------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Hämta kostnadsfria proxyservrar från 1proxy-marknadsplatsen (filter för protokoll/land/kvalitet/antal) |
| `omniroute_oneproxy_rotate` | `read:proxies` | Hämta nästa tillgängliga proxyserver enligt strategi (`random` / `quality` / `sequential`)             |
| `omniroute_oneproxy_stats`  | `read:proxies` | Poolstatistik, synkroniseringsstatus och fördelning efter protokoll och land                           |

## Minnesverktyg (3)

Definieras i `open-sse/mcp-server/tools/memoryTools.ts`. Autentisering/behörighet tillämpas via MCP:s standardpipeline för behörigheter.

| Verktyg                   | Behörigheter   | Beskrivning                                                                                    |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Sök i minnen efter fråga/typ/API-nyckel med tillämpning av tokenbudget                         |
| `omniroute_memory_add`    | `write:memory` | Lägg till en ny minnespost (`factual` / `episodic` / `procedural` / `semantic`)                |
| `omniroute_memory_clear`  | `write:memory` | Rensa minnen för en API-nyckel, eventuellt filtrerade efter typ eller tidsstämpeln `olderThan` |

## Färdighetsverktyg (4)

Definieras i `open-sse/mcp-server/tools/skillTools.ts`. Stöds av `src/lib/skills/registry` + `src/lib/skills/executor`.

| Verktyg                       | Behörigheter     | Beskrivning                                                                                         |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Lista registrerade färdigheter med valfri filtrering efter API-nyckel, namn eller aktiveringsstatus |
| `omniroute_skills_enable`     | `write:skills`   | Aktivera eller inaktivera en specifik färdighet efter ID                                            |
| `omniroute_skills_execute`    | `execute:skills` | Kör en färdighet med angivna indata och returnera körningsposten                                    |
| `omniroute_skills_executions` | `read:skills`    | Lista den senaste historiken över färdighetskörningar                                               |

## Notion-kontextkälla (6)

Definieras i `open-sse/mcp-server/tools/notionTools.ts`. Token lagras i tabellen `key_value` via `src/lib/db/notion.ts`. REST-klienten finns i `src/lib/notion/api.ts`. Inställnings-API:t finns i `src/app/api/settings/notion/route.ts`. Instrumentpanelens användargränssnitt finns i `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Konfigurera din Notion-integrationstoken från fliken **Kontextkällor** i slutpunktens instrumentpanel eller via REST API:t:

```bash
# Ange token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Kontrollera status
curl http://localhost:20128/api/settings/notion

# Koppla från
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Verktyg                      | Behörigheter   | Beskrivning                                                                 |
| :--------------------------- | :------------- | :-------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Fulltextsökning på alla sidor och i alla databaser                          |
| `notion_get_page`            | `read:notion`  | Hämta en sida efter ID tillsammans med dess egenskaper                      |
| `notion_list_block_children` | `read:notion`  | Lista underordnade block för en sida eller ett block                        |
| `notion_query_database`      | `read:notion`  | Sök i en databas med filter, sortering och paginering                       |
| `notion_get_database`        | `read:notion`  | Hämta databasschemat efter ID                                               |
| `notion_append_blocks`       | `write:notion` | Lägg till underordnade block i ett överordnat block (högst 100 per begäran) |

## Verktyg för Agent Skill-katalogen (3)

Definieras i `open-sse/mcp-server/tools/agentSkillTools.ts`. Stöds av `src/lib/agentSkills/catalog`. Dessa verktyg exponerar dokumentationskatalogen med 45 Agent Skills för MCP-klienter och externa agenter. Omfattning: `read:catalog`.

| Verktyg                           | Omfattningar   | Beskrivning                                                                                                                                                |
| :-------------------------------- | :------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Lista alla 45 agentfärdigheter med valfria filter för `category` (api\|cli) och `area`; returnerar metadata + täckning                                     |
| `omniroute_agent_skills_get`      | `read:catalog` | Hämta fullständig metadata + innehållet i SKILL.md för en enskild färdighet via kanoniskt `id`                                                             |
| `omniroute_agent_skills_coverage` | `read:catalog` | Täckningsstatistik: hur många av de 23 API-, 21 CLI- och 1 konfigurationsfärdigheterna som har SKILL.md-filer i filsystemet jämfört med katalogens totaler |

Se [AGENT-SKILLS.md](./AGENT-SKILLS.md) för hela katalogen och hur externa agenter använder den.

## Relaterade ramverk (v3.8.0)

Inventeringen av MCP-verktyg ovan (110 unika verktyg, beräknat av `countUniqueMcpTools()`) är avsiktligt
avgränsad till åtgärder för routning, cachelagring, komprimering, minne, färdigheter, proxy och kontextkällor under körning. Två närliggande
ramverk levereras tillsammans med MCP-servern i v3.8.0 och dokumenteras separat:

### Molnagenter

Molnagenter är AI-kodningsagenter utanför processen (codex-cloud, cursor-cloud, devin, jules) som är anslutna till
OmniRoute genom samma anslutningsmodell som används för LLM-leverantörer. De exponeras via
sitt eget REST-gränssnitt (`/api/v1/agents/*`) och ingår **inte** i MCP-verktygskatalogen
— att anropa en molnagent förbrukar inte någon MCP-omfattning.

- Implementering: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Livscykel: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentation: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Skyddsräcken

Skyddsräcken är filter före/efter körning (vision-bridge, pii-masker, prompt-injection)
som tillämpas inuti chattflödet. De körs innan MCP-verktygs-/routningslagret nås
och skickar strukturerade överträdelser till granskningsflödet; de anropas inte som MCP-verktyg.

- Implementering: `src/lib/guardrails/`.
- Dokumentation: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

När du felsöker ett MCP-anrop som verkar vara blockerat ska du kontrollera både MCP-granskningsloggen
(`scope_denied:*`-poster) och skyddsräckenas granskningsspår — en begäran kan avvisas av
ett skyddsräcke **innan** den når MCP-lagret för tillämpning av omfattningar.

---

## REST API-slutpunkter

| Slutpunkt              | Metod                 | Beskrivning                                                                                            | Autentisering             |
| :--------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------- | :------------------------ |
| `/api/mcp/status`      | `GET`                 | Serverstatus: heartbeat, HTTP-transportstatus, sammanfattning av granskningsaktivitet                  | Hantering (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Verktygskatalog (namn, beskrivning, omfattningar, fas, källslutpunkter)                                | Hantering                 |
| `/api/mcp/sse`         | `GET` / `POST`        | SSE-transportslutpunkt (styrs av `mcpEnabled` + `mcpTransport === "sse"`)                              | API-nyckel + omfattningar |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Strömningsbar HTTP-transport (använder headern `mcp-session-id`; `DELETE` avslutar sessionen)          | API-nyckel + omfattningar |
| `/api/mcp/audit`       | `GET`                 | Granskningsloggposter från `mcp_tool_audit` (filter: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Hantering                 |
| `/api/mcp/audit/stats` | `GET`                 | Aggregerad granskningsstatistik (`totalCalls`, `successRate`, `avgDurationMs`, vanligaste verktygen)   | Hantering                 |

Källfiler: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Både SSE- och strömningsbara HTTP-transporter blockeras tills MCP-servern aktiveras i Inställningar (`mcpEnabled`) och lämplig `mcpTransport` väljs. Om fel transport är konfigurerad returnerar routen HTTP 400 med en uppmaning att ändra inställningarna.

---

## Autentisering och behörighetsomfattningar

MCP-verktyg autentiseras genom API-nycklars behörighetsomfattningar. Tillämpningen av behörighetsomfattningar är centraliserad i
`open-sse/mcp-server/scopeEnforcement.ts`. Varje verktyg kräver specifika behörighetsomfattningar:

| Omfattning            | Verktyg                                                                                                                                                                      |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                            |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                    |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                       |
| `read:quota`          | `check_quota`                                                                                                                                                                |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                       |
| `read:models`         | `list_models_catalog`                                                                                                                                                        |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                        |
| `write:budget`        | `set_budget_guard`                                                                                                                                                           |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                  |
| `pricing:write`       | `sync_pricing`                                                                                                                                                               |
| `read:cache`          | `cache_stats`                                                                                                                                                                |
| `write:cache`         | `cache_flush`                                                                                                                                                                |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                   |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                            |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                        |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                             |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                       |
| `read:memory`         | `memory_search`                                                                                                                                                              |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                 |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                           |
| `write:skills`        | `skills_enable`                                                                                                                                                              |
| `execute:skills`      | `skills_execute`                                                                                                                                                             |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                             |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                      |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                    |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                             |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                               |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                           |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                              |
| `read:obsidian`       | 13 läsverktyg — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 skrivverktyg — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …              |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                            |

Jokertecken stöds för behörighetsomfång: `read:*` ger alla läsbehörighetsomfång, `*` ger fullständig åtkomst.

### `mcp:connect` — snäv routningsbehörighet (#7895)

För att nå HTTP/SSE MCP-transporten (`/api/mcp/*`) från en adress som inte är loopback krävs
LOCAL_ONLY-undantaget för `/api/mcp/` (se `docs/security/ROUTE_GUARD_TIERS.md`). Historiskt
accepterade det undantaget endast en API-nyckel med fullständigt behörighetsomfång för `manage`/`admin` — för brett för en
anropare som endast behöver kommunicera med MCP. `src/shared/constants/managementScopes.ts` exporterar nu
`MCP_CONNECT_SCOPE = "mcp:connect"`: ett additivt, snävt behörighetsomfång (enligt samma princip som
`SELF_USAGE_SCOPE`) som ENDAST auktoriserar förbikopplingen för `/api/mcp/` i
`src/server/authz/policies/management.ts` — det ger ingen annan åtkomst till administrationsrutter
och hålls avsiktligt UTANFÖR `MANAGEMENT_API_KEY_SCOPES`. En nyckel med `manage`/`admin`
passerar fortfarande undantaget utan ändringar; `mcp:connect` är ett alternativ med lägre behörighet för
fjärranropare som endast använder MCP och kontrolleras via `hasMcpConnectOrManageScope()`.

### Bindning av HTTP-behörighetsomfång per nyckel (#7895)

Över HTTP/SSE hämtar `open-sse/mcp-server/httpTransport.ts` nu anroparens faktiska
`api_keys.scopes` via `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
och skickar dem till MCP-SDK:ts `transport.handleRequest(req, { authInfo })`, så att
`extra.authInfo.scopes` som når varje verktygsanrop återspeglar Bearer-nyckelns egna behörighetsomfång.
`scopeEnforcement.ts`:s `resolveCallerScopeContext()` prioriterade redan `authInfo` framför
reservalternativen `_meta` och miljövariabeln `OMNIROUTE_MCP_SCOPES` — detta fyller endast i den första källan
med högst prioritet, som tidigare inte tillhandahölls över HTTP. När ingen API-nyckel kan hämtas
(inget huvud, ogiltig nyckel) förblir `authInfo` `undefined` och upplösningen fortsätter genom den
befintliga meta-/miljövariabelkedjan utan ändringar. Detta ändrar INTE standardvärdet för `OMNIROUTE_MCP_ENFORCE_SCOPES` —
tillämpningen måste fortfarande aktiveras uttryckligen; denna ändring gör endast att
sökvägen per nyckel får företräde när den väl har aktiverats. stdio har ingen identitet per anropare (se
`mcpCallerIdentity.ts`) och påverkas inte — den fortsätter använda reservkedjan `_meta`/miljövariabel.

---

## Miljövariabler

| Variabel                                | Standardvärde                           | Syfte                                                                                                                                   |
| :-------------------------------------- | :-------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`                | Bas-URL som MCP-servern använder vid anrop till OmniRoutes interna API:er                                                               |
| `OMNIROUTE_API_KEY`                     | (tomt)                                  | API-nyckel som vidarebefordras som `Authorization: Bearer` till interna API-anrop                                                       |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (endast `"true"` aktiverar det) | När detta är aktiverat nekas verktygsanrop om omfång saknas, och `scope_denied:<reason>` loggas i granskningsloggen                     |
| `OMNIROUTE_MCP_SCOPES`                  | (tomt)                                  | Kommaseparerad lista över omfång som betraktas som ”tillgängliga” som standard (används när anroparen inte tillhandahåller egna omfång) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (ej angivet = på)                       | När värdet anges som `0/false/off/no` inaktiveras komprimering av MCP-beskrivningar vid registrering                                    |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (ej angivet = på)                       | Alternativt alias för samma inställning som ovan                                                                                        |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                                 | Tidsgräns för avbrott vid interna administrationsläsningar (hälsa, motståndskraft, kombinationer, kvot, användning)                     |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                                 | Tidsgräns för avbrott vid hopp som väntar på en leverantör (`route_request`, `web_search`, `web_fetch`)                                 |
| `MCP_TOOL_DENY`                         | (ej angivet = inget filter)             | Kommaseparerade verktygsnamn som ska tas bort från `tools/list` (minskning av antalet verktyg — se nedan)                               |
| `MCP_TOOL_ALLOW`                        | (ej angivet = inget filter)             | Kommaseparerade verktygsnamn som exklusivt ska behållas (tillåtelseläge — se nedan)                                                     |
| `DATA_DIR`                              | `~/.omniroute`                          | Heartbeat-filen skrivs till `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                    |

---

## Komprimering av beskrivningar

MCP-register för verktyg, prompter och resurser kan komprimera beskrivningar vid registrering/listning för att minska mängden metadata som exponeras för klienter (och därmed kostnaden för promptkontext). Implementationen finns i `open-sse/mcp-server/descriptionCompressor.ts` och är integrerad i MCP-servern via `compressMcpRegistryMetadata` inuti `createMcpServer()`.

- Komprimeringen körs på beskrivningstexten med Caveman-regeluppsättningen (`getRulesForContext("all", "full")`) och extrahering av skyddade block (kodspann, inhägnade block osv.), så att strukturellt innehåll inte ändras.
- Växla per driftsättning via värdet `compression.mcpDescriptionCompressionEnabled` i inställningstabellen `key_value` (standard: aktiverat) — tillgängligt i användargränssnittet som **Analys → Komprimering av MCP-beskrivningar**.
- Växla för hela processen via antingen `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` eller `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Realtidsstatistik visas via `omniroute_compression_status` under `analytics.mcpDescriptionCompression` och märks med `source: "mcp_metadata_estimate"` för att skilja den från faktiska användningskvitton från leverantörer.

---

## Minskning av verktygskardinalitet (F4.3)

Beskrivningskomprimering minskar metadata för varje verktyg; **minskning av verktygskardinalitet** går ett steg längre genom att minska _hur många_ verktyg som över huvud taget annonseras. Genom att annonsera färre verktyg i manifestet `tools/list` minskar tokenkostnaden per begäran som klientens modell betalar för verktygskatalogen (komprimering på ”lager 5”). Implementationen är ett rent, tillståndslöst filter i `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), integrerat i registreringsloopen i `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Aktiveras uttryckligen och är inaktiverat som standard.** Filtret körs endast när minst en av två miljövariabler har angetts. Om ingen av dem har angetts annonseras alla 110 verktyg oförändrade.

| Variabel         | Läge                                                                                      |
| :--------------- | :---------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Svartlista — kommaseparerade verktygsnamn som alltid tas bort från `tools/list`           |
| `MCP_TOOL_ALLOW` | Tillåtelselista — kommaseparerade verktygsnamn; endast dessa behålls, allt annat tas bort |

`deny` har företräde framför `allow`. Namnen är kommaseparerade, omgivande blanksteg tas bort och tomma poster ignoreras. Exempel:

```bash
# Ta bort två verktyg från katalogen
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Annonsera endast verktygen för routning och kvoter (läge med tillåtelselista)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Så tas filtrerade verktyg bort:** registreringen lyckas alltid. Ett verktyg som profilen avvisar inaktiveras därefter med `.disable()` på MCP SDK-referensen, så att det aldrig visas i `tools/list`, samtidigt som kopplingarna förblir intakta (ren aktivering/inaktivering utan omregistrering). Profiltolken är `readMcpToolProfileFromEnv(process.env)`, som returnerar `null` (ingen filtrering) när båda variablerna är tomma.

Den mer omfattande `ToolProfile`-strukturen bakom `reduceToolManifest` stöder även filtrering genom skärningsmängder av omfång (`allowScopes`, med jokerteckenmatchning av typen `read:*`) och en deterministisk gräns med `maxTools`, men dessa två inställningar behöver hela manifestet vid registreringstillfället och exponeras **inte** via miljövariablerna i dag (en hook på `tools/list`-nivå är en planerad uppföljning). `estimateManifestTokens()` kan användas för att jämföra manifestets tokenkostnad före och efter minskningen.

---

## Pulssignal vid körning

Stdio-transporten sparar livssignalen till `${DATA_DIR}/runtime/mcp-heartbeat.json` var femte sekund. Kontrollpanelen (`/api/mcp/status`) läser den här filen tillsammans med PID-processens status för att fastställa `online`. HTTP-transporter rapporterar i stället tillståndet från `getMcpHttpStatus()` i den aktuella processen (ingen fil skrivs).

Pulssignalsögonblicksbilden innehåller:

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

## Granskningsloggning

Varje verktygsanrop loggas i SQLite-tabellen `mcp_tool_audit` av `open-sse/mcp-server/audit.ts`:

- Verktygsnamn, argument (hashade/avkortade enligt verktygets `auditLevel`) och resultat
- Varaktighet i ms, indikator för lyckat/misslyckat anrop samt felmeddelande (när tillämpligt)
- API-nyckelhash och tidsstämpel
- Nekade omfång loggas som `scope_denied:<reason>` tillsammans med listan över saknade omfång

Använd kontrollpanelen eller REST-slutpunkterna `/api/mcp/audit` och `/api/mcp/audit/stats` för att granska de senaste anropen.

---

## Filer

| Fil                                                                      | Syfte                                                                            |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | MCP-serverfabrik, startpunkt för stdio, omfångsbegränsade verktygsregistreringar |
| `open-sse/mcp-server/httpTransport.ts`                                   | SSE + Streamable HTTP-transport (sessionshantering)                              |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Utvärdering av verktygsomfång och identifiering av anropare                      |
| `open-sse/mcp-server/audit.ts`                                           | Granskningsloggning av verktygsanrop (`mcp_tool_audit`)                          |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Heartbeat-skrivare för stdio (`mcp-heartbeat.json`)                              |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Beskrivningskomprimering för verktygs-, prompt- och resursregister               |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Zod-scheman + verktygsregister (`MCP_TOOLS`, 45 poster)                          |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Verktygshanterare för fas 2 + cache + 1proxy                                     |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Hanterare för komprimeringsverktyg                                               |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definitioner av minnesverktyg (3 verktyg)                                        |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definitioner av färdighetsverktyg (4 verktyg)                                    |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Verktygsdefinitioner för Notion-kontextkällor (6 verktyg)                        |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definitioner av spelifieringsverktyg (8 verktyg)                                 |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Verktyg för registrering och hantering av insticksprogram (8 verktyg)            |
| `src/app/api/mcp/status/route.ts`                                        | `/api/mcp/status`-slutpunkt                                                      |
| `src/app/api/mcp/tools/route.ts`                                         | `/api/mcp/tools`-slutpunkt                                                       |
| `src/app/api/mcp/sse/route.ts`                                           | SSE-transportväg för `/api/mcp/sse`                                              |
| `src/app/api/mcp/stream/route.ts`                                        | Streamable HTTP-transportväg för `/api/mcp/stream`                               |
| `src/app/api/mcp/audit/route.ts`                                         | Fråga mot granskningsloggen via `/api/mcp/audit`                                 |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Aggregerade granskningsmått via `/api/mcp/audit/stats`                           |
| `src/lib/notion/api.ts`                                                  | Klient för Notion REST API (återförsök, tidsgräns, felklassificering)            |
| `src/lib/db/notion.ts`                                                   | Beständig lagring av Notion-token (`key_value`-tabellen)                         |
| `src/app/api/settings/notion/route.ts`                                   | API för Notion-inställningar (GET/POST/DELETE)                                   |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Användargränssnitt för hantering av Notion-token                                 |
| `tests/unit/notion-api.test.ts`                                          | Tester av Notion API-klienten (7)                                                |
| `tests/unit/notion-tools.test.ts`                                        | Tester av omfångskontroll för Notion-verktyg (10)                                |
| `tests/unit/db/notion.test.mjs`                                          | Tester av Notion-databasmodulen (3)                                              |
