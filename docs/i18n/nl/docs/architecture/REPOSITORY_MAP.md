# Repository Map (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Beschrijving van één regel voor elke map en elk bestand in de hoofdmap.**
> Laatst bijgewerkt: 2026-06-28 — OmniRoute v3.8.40
>
> Gebruik dit overzicht om snel door de codebase te navigeren. Volg voor diepgaande informatie de links naar de bijbehorende documentatie.

## Mappenstructuur op het hoogste niveau

```
OmniRoute/
├── src/                  # Next.js 16-applicatie (UI + API-routes + bibliotheken + domein + server)
├── open-sse/             # Werkruimte voor de streamingengine (handlers, executors, translator, MCP-server)
├── electron/             # Desktopwrapper (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI-toegangspunt en opdrachthandlers
├── scripts/              # Scripts voor builds, controles, synchronisatie en eenmalige taken
├── docs/                 # Openbare documentatie (u bent hier)
├── tests/                # Alle testsuites (unit, integratie, e2e, protocolclients)
├── public/               # Statische Next.js-assets, PWA-manifest, serviceworker, pictogrammen
├── config/               # Statische configuratie + status van kwaliteitscontroles (i18n, payloadRules, quality/)
├── images/               # Afbeeldingsassets voor marketing / README
├── @omniroute/           # Publiceerbare aanvullende pakketten (opencode-plugin, opencode-provider)
├── skills/               # Vaardigheidspakketten voor CLI/agents (cli-* + omni-* + config-codex-cli)
├── examples/             # Voorbeeldplugins + omniroute-cmd-hello-startsjabloon
├── contrib/              # Bijdragen vanuit de community (podman/)
├── .source/              # Fumadocs-bronconfiguratie (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions-workflows + issuesjablonen + PR-sjabloon
├── .husky/               # Git-hooks (pre-commit, pre-push)
├── .claude/              # Slash-opdrachten voor Claude Code (projectgebonden)
├── .agents/              # Workflows + vaardigheden voor Codex / generieke agents (spiegel van .claude/)
├── .vscode/              # Werkruimte-instellingen voor VS Code
├── _ideia/               # Planningsnotities (informeel; niet meegeleverd)
├── _mono_repo/           # Historische subprojecten (cloud, site, vscode-extension)
├── _references/          # Alleen-lezenreferentieklonen van gerelateerde OSS-projecten
├── _tasks/               # Taakregistratiebestanden per release (informeel)
├── .build/ .worktrees/ dist/   # Lokale tijdelijke opslag voor builds / git-worktrees / builduitvoer (genegeerd door Git)
├── .issues/              # Lokale issuecache (genegeerd door Git)
├── .playwright-mcp/      # Playwright MCP-testartefacten
├── coverage/             # c8-dekkingsuitvoer (genegeerd door Git)
├── logs/                 # Runtimelogboeken (genegeerd door Git)
├── node_modules/         # Afhankelijkheden (genegeerd door Git)
├── package/              # Tijdelijke map voor npm pack (buildartefact)
├── .next/                # Next.js-builduitvoer (genegeerd door Git)
└── (bestanden in de hoofdmap — zie hieronder)
```

---

## Bestanden in de hoofdmap

| Bestand                                     | Doel                                                                                                  |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **README.md**                               | Marketinglandingspagina + snelstartgids + functieoverzicht (zie ook `llm.txt`)                        |
| **CHANGELOG.md**                            | Wijzigingslogboek per release (automatisch gegenereerd door de skill `/version-bump-cc`)              |
| **LICENSE**                                 | Tekst van de MIT-licentie                                                                             |
| **CLAUDE.md**                               | Projectregels voor Claude Code-agents (strikte regels, conventies, scenario's)                        |
| **AGENTS.md**                               | Hetzelfde als CLAUDE.md, maar voor niet-Claude-AI-agents (Codex, Cursor enz.)                         |
| **GEMINI.md**                               | Beknopte regels voor Gemini-gebaseerde agents (subset van CLAUDE.md)                                  |
| **CONTRIBUTING.md**                         | Bijdragershandleiding: installatie, conventional commits, testen, PR-proces                           |
| **SECURITY.md**                             | Beleid voor het melden van kwetsbaarheden, ondersteunde versies, dreigingsmodel                       |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — verwachtingen voor gedrag binnen de gemeenschap                                |
| **llm.txt**                                 | Landingspagina in platte tekst, geoptimaliseerd voor LLM-crawlers (SEO voor AI-assistenten)           |
| **package.json**                            | npm-manifest, scripts, afhankelijkheden, engines, c8-dekkingsdrempel                                  |
| **package-lock.json**                       | Vergrendelde afhankelijkheidsboom                                                                     |
| **tsconfig.json**                           | TypeScript-hoofdconfiguratie                                                                          |
| **tsconfig.typecheck-core.json**            | Typecheckconfiguratie voor de kern in `src/`                                                          |
| **tsconfig.typecheck-noimplicit-core.json** | Strikte (`noImplicitAny`) typecheck                                                                   |
| **tsconfig.tsbuildinfo**                    | Cache voor incrementele TS-builds (door git genegeerd)                                                |
| **next.config.mjs**                         | Next.js 16-buildconfiguratie (zelfstandige uitvoer)                                                   |
| **next-env.d.ts**                           | Automatisch gegenereerde omgevingstypen van Next.js                                                   |
| **eslint.config.mjs**                       | Platte ESLint-configuratie (regels per projectgebied)                                                 |
| **prettier.config.mjs**                     | Prettier-opmaakregels                                                                                 |
| **postcss.config.mjs**                      | PostCSS-configuratie voor de Tailwind/CSS-pijplijn                                                    |
| **playwright.config.ts**                    | Playwright-configuratie voor E2E-tests                                                                |
| **vitest.config.ts**                        | Vitest-configuratie (standaardsuite)                                                                  |
| **vitest.mcp.config.ts**                    | Vitest-configuratie voor MCP-server-/autoCombo-/cachesuites                                           |
| **sonar-project.properties**                | SonarQube-/SonarCloud-configuratie (codekwaliteit)                                                    |
| **Dockerfile**                              | Docker-build met meerdere fasen (builder → runner-base → runner-cli)                                  |
| **docker-compose.yml**                      | Compose-configuratie voor ontwikkeling met 4 profielen (base, cli, host, cliproxyapi) + Redis-sidecar |
| **docker-compose.prod.yml**                 | Compose-configuratie voor productie (poort 20130, Redis, benoemde volumes)                            |
| **.dockerignore**                           | Bestanden die van de Docker-context zijn uitgesloten                                                  |
| **fly.toml**                                | Fly.io-implementatieconfiguratie (regio `sin`, poort 20128, /data-volume)                             |
| **.env.example**                            | Sjabloon voor omgevingsbestand (bij de eerste installatie automatisch gekopieerd naar `.env`)         |
| **.gitignore**                              | Git-negeerpatronen                                                                                    |
| **.npmignore**                              | Uitsluitingslijst voor npm-publicatie                                                                 |
| **.npmrc**                                  | npm-configuratie (register, lockfilebeleid)                                                           |
| **.node-version**                           | Vastgezette Node-versie (gebruikt door nvm-compatibele tools)                                         |
| **.nvmrc**                                  | Vastgezette Node-versie voor nvm                                                                      |
| **eslint.complexity.config.mjs**            | ESLint-configuratie voor de complexiteitsratel (`scripts/check/check-complexity.mjs --config`)        |
| **eslint.sonarjs.config.mjs**               | ESLint-configuratie voor SonarJS-regels (cognitieve complexiteit / duplicatie)                        |
| **source.config.ts**                        | Fumadocs-`defineDocs`-bronconfiguratie (voedt `.source/`)                                             |
| **knip.json**                               | Knip-configuratie — ongebruikte bestanden/exports/afhankelijkheden (voedt de dead-codecontrole)       |
| **stryker.conf.json**                       | Stryker-configuratie voor mutatietests                                                                |
| **.size-limit.json**                        | size-limit-configuratie voor de bundelgrootte                                                         |
| **promptfooconfig.yaml**                    | promptfoo-evaluatieconfiguratie                                                                       |
| **.gitleaks.toml**                          | gitleaks-regelset voor het scannen op geheimen                                                        |
| **.zizmor.yml**                             | zizmor-configuratie voor beveiligingslinting van GitHub Actions                                       |
| **socket.yml**                              | Socket.dev-configuratie voor de softwaretoeleveringsketen                                             |
| **news.json**                               | Gelokaliseerde v2-aankondigingsfeed; Radar-lanceringsitem wordt inactief geleverd                     |
| **flake.nix** / **flake.lock**              | Definitie en lockbestand voor de Nix-ontwikkelshell                                                   |
| **.env**                                    | Lokale geheimen (genegeerd door git — gegenereerd vanuit `.env.example`)                              |

> **In v3.8.26 uit de hoofdmap verplaatst (opruiming):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` en het gegenereerde `quality-metrics.json` (genegeerd door git). Zie [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js-applicatie

```
src/
├── app/                 # App Router (pagina's + API-routes + statuspagina's + landingspagina)
├── lib/                 # Kernbibliotheken / domeinmodules (80 submappen + ~70 bestanden op het hoogste niveau)
├── domain/              # Zuivere domeinlogica (beleidsengine, fallback, kosten, vergrendeling, comboResolver, beoordeling)
├── server/              # Alleen-servermodules (authz-pijplijn, cors, auth-middleware) — kunnen niet vanuit de client worden geïmporteerd
├── shared/              # Waar veilig gedeeld tussen server en client (constanten, typen, validatie, contracten, hulpprogramma's)
├── i18n/                # next-intl-configuratie + JSON-berichten per locale (42 locales)
├── middleware/          # Next.js-middleware (verrijking van requests, localedetectie)
├── mitm/                # Kern van MITM-proxy: certificaatgeneratie/-installatie, handlers, doelen, inspectie, maskers, passthrough
│   ├── handlers/        # 9 handlerklassen voor IDE-agents die MitmHandlerBase uitbreiden (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Laag voor verkeersregistratie: buffer (ringbuffer in geheugen), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Koppelingscode voor modeladapters (legacy shim)
├── scripts/             # Onderhoudsscripts binnen de broncode (bijv. backfillAggregation)
├── sse/                 # Verouderde SSE-handlers/-services (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Verouderde in-memory store (wordt uitgefaseerd ten gunste van src/lib/db)
├── types/               # Gedeelde TS-typebestanden
├── instrumentation.ts   # Next.js-telemetriehook (browser + edge)
├── instrumentation-node.ts  # Instrumentatie alleen voor Node
└── proxy.ts             # Entry-shim voor HTTP-proxy
```

### `src/app/` — App Router (Next.js 16)

| Pad                                                                          | Doel                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Openbare OpenAI-compatibele API (~25 subroutes: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers, enz.)                                                                                                                                |
| `app/api/v1beta/`                                                            | API-eindpunten in Gemini-stijl                                                                                                                                                                                                                                                                                                  |
| `app/api/playground/`                                                        | Playground Studio-routes: `improve-prompt/` (POST — LLM-prompt herschrijven), `presets/` (GET-lijst / POST aanmaken), `presets/[id]/` (GET / PUT / DELETE) — zie `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                         |
| `app/api/` (niet-v1)                                                         | Beheer-/adminroutes (~60 mappen: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools, enz.)                                                                                                                                                          |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 routes (serverbeheer, agentstatus/DNS/toewijzingen, bypass, certificaat, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Zie `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                           |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ routes (verzoeken, sessies, hosts, opnamemodi, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Zie `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                                    |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0-toegangspunt (`POST /a2a`)                                                                                                                                                                                                                                                                                     |
| `app/.well-known/agent.json/`                                                | A2A Agent Card (detectie)                                                                                                                                                                                                                                                                                                       |
| `app/(dashboard)/dashboard/`                                                 | Dashboard-UI-pagina's (50+ secties, ~118 page.tsx-bestanden: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity, enz.)                                                                                                                                          |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio-UI (3 tabbladen: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — zie `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                                |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (omhulsel met 3 tabbladen), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge-dashboardpagina — serverkaart, 9 agentkaarten, configuratiewizard, modeltoewijzing, bypasslijst. i18n PT-BR + EN. Zie `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                             |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector-dashboardpagina — DevTools-splitsing, 7 detailtabbladen, 4 schakelaars voor opnamemodi, sessierecorder, contextinkleuring. i18n PT-BR + EN. Zie `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                                       |
| `app/(dashboard)/dashboard/activity/`                                        | Activiteitenfeedpagina (Groep B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — zie `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                      |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Pagina voor quotadeling (Groep B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                  |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Configuratiepagina voor providerplannen (Groep B): `page.tsx` + `ProviderPlanConfigClient.tsx` — quotadimensies per verbindingsoverschrijving                                                                                                                                                                                   |
| `app/docs/`                                                                  | Ingebouwde documentatieweergave (rendert `docs/*.md`)                                                                                                                                                                                                                                                                           |
| `app/landing/`                                                               | Marketinglandingspagina                                                                                                                                                                                                                                                                                                         |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Authenticatiegerelateerde pagina's                                                                                                                                                                                                                                                                                              |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP-foutpagina's                                                                                                                                                                                                                                                                                                               |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statische/statuspagina's                                                                                                                                                                                                                                                                                                        |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Hoofdlay-out, startpagina, PWA-manifest, globale CSS                                                                                                                                                                                                                                                                            |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Foutgrenzen                                                                                                                                                                                                                                                                                                                     |

### `src/lib/` — Kernbibliotheken (~50 modules)

| Module                                     | Doel                                                                                                                                                                                                                                                                                                                          |
| ------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                     | Taakbeheer voor het A2A-protocol, vaardigheden (5), streaming                                                                                                                                                                                                                                                                 |
| `acp/`                                     | CLI-agentregister (lokale CLI-detectie — zie `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                      |
| `api/`                                     | Gedeelde API-hulpfuncties (`requireManagementAuth`, validatie)                                                                                                                                                                                                                                                                |
| `auth/`                                    | Sessies, wachtwoordhashing, tokenvalidatie                                                                                                                                                                                                                                                                                    |
| `batches/`                                 | Handlers voor de OpenAI Batches API                                                                                                                                                                                                                                                                                           |
| `catalog/`                                 | Zod-validatie van de providercatalogus + bepaling van mogelijkheden                                                                                                                                                                                                                                                           |
| `cloudAgent/`                              | Cloudagents (Codex Cloud, Devin, Jules) — zie `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                |
| `combos/`                                  | Hulpfuncties voor het bepalen en opnieuw ordenen van combo's                                                                                                                                                                                                                                                                  |
| `audit/`                                   | Hulpfuncties voor de activiteitenfeed: `highLevelActions.ts` (toelatingslijst + `isHighLevelAction()`), `activityIcons.ts` (toewijzing van actie → pictogram/werkwoord), `timeline.ts` (groupByDay/relativeTime) — zie `docs/architecture/MONITORING_SECTIONS.md`                                                             |
| `compliance/`                              | Auditlogboek + provideraudit — zie `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                              |
| `compression/`                             | Koppellaag voor de compressie-engine (engines bevinden zich in `open-sse/services/compression/`)                                                                                                                                                                                                                              |
| `config/`                                  | Hulpfuncties voor runtimeconfiguratie                                                                                                                                                                                                                                                                                         |
| `db/`                                      | Meer dan 120 domeinspecifieke DB-modules + 168 migraties (gebruik hiervoor bij SQLite altijd deze map)                                                                                                                                                                                                                        |
| `quota/`                                   | Engine voor quotumdeling: `dimensions.ts` (typen/Zod), `types.ts` (`QuotaStore`-interface), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — zie `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                   | Client voor de Radar-catalogus met gratis modellen: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — zie `docs/frameworks/RADAR.md`                                                                                                                               |
| `display/`                                 | Hulpfuncties voor UI-opmaak (kosten, latentie enz.)                                                                                                                                                                                                                                                                           |
| `embeddings/`                              | Hulpfuncties voor de embeddingservice                                                                                                                                                                                                                                                                                         |
| `env/`                                     | Parseren en valideren van omgevingsvariabelen                                                                                                                                                                                                                                                                                 |
| `evals/`                                   | Evaluatieframework (suites, runner, runtime) — zie `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                 |
| `guardrails/`                              | PII-maskering, promptinjectie, vision-bridge — zie `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                              |
| `jobs/`                                    | Achtergrondtaken (cron-achtig)                                                                                                                                                                                                                                                                                                |
| `memory/`                                  | Gespreksgeheugen (SQLite FTS5 + hybride RRF met sqlite-vec + Qdrant-laag 2) — zie `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                 |
| `memory/embedding/`                        | Embeddinglaag met meerdere bronnen: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                           |
| `memory/vectorStore.ts`                    | Wrapper voor sqlite-vec v0.1.9 — KNN-bruteforce + hybride RRF (FTS5 + vector, k=60). Luie initialisatie; degradeert netjes wanneer sqlite-vec niet beschikbaar is. (plan 21)                                                                                                                                                  |
| `memory/reindex.ts`                        | `runReindexBatch()` — verwerkt herinneringen met `needs_reindex=1` op de achtergrond; aangeroepen door `POST /api/memory/reindex` en het pad voor luie backfill. (plan 21)                                                                                                                                                    |
| `monitoring/`                              | Gezondheidscontroles, uitsturen van metrieken                                                                                                                                                                                                                                                                                 |
| `oauth/`                                   | OAuth-/importstromen voor 22 providermodules (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                      |
| `plugins/`                                 | Pluginregister                                                                                                                                                                                                                                                                                                                |
| `promptCache/`                             | Onderbrekingspunten voor promptcaching in Anthropic-stijl                                                                                                                                                                                                                                                                     |
| `skills/`                                  | Skills-framework (ingebouwd + marketplace + SkillsSH) — zie `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                       |
| `playground/`                              | Gedeelde helpers voor Playground Studio: `codeExport.ts` (curl/Python/TS-generator), `promptImprover.ts` (meta-promptbouwer), `streamMetrics.ts` (zuivere TTFT/TPS), `types.ts` (prijstabel) — zie `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                     |
| `webhookDispatcher.ts`                     | HMAC-webhooklevering — zie `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                      |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`   | Tunnelbeheerders — zie `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                            |
| `cloudSync.ts`, `initCloudSync.ts`         | Optionele cloudsynchronisatie van status                                                                                                                                                                                                                                                                                      |
| `localDb.ts`                               | Centraal re-exportbestand voor db-modules (geen logica — alleen re-exports)                                                                                                                                                                                                                                                   |
| `cacheLayer.ts`, `idempotencyLayer.ts`     | Requestcaching + idempotentie                                                                                                                                                                                                                                                                                                 |
| (~30 meer bestanden op het hoogste niveau) | Gespecialiseerde helpers (logEnv, modelsDevSync, piiSanitizer, enz.)                                                                                                                                                                                                                                                          |

### `src/lib/db/` — Database (122 modules + 168 migraties)

| Submap                    | Doel                                                                                                                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()`-singleton met WAL-journaling                                                                                                                                |
| `db/migrations/`          | SQL-bestanden met versies (idempotent, transactioneel). `073_memory_vec.sql` voegt `memory_vec_meta` + de kolom `needs_reindex` toe (plan 21).                                |
| `db/playgroundPresets.ts` | CRUD-module voor presets van Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD voor `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue`, enz. (plan 21)                  |
| `db/<domain>.ts`          | Eén module per domein: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache, enz.    |

### `src/domain/`

| Module                 | Doel                                               |
| ---------------------- | -------------------------------------------------- |
| `policy.ts`            | Beleidsengine                                      |
| `fallbackPolicy.ts`    | Beslissingsboom voor fallback                      |
| `costRules.ts`         | Regels voor kostenberekening                       |
| `lockoutPolicy.ts`     | Uitsluitingsbeleid voor modellen/verbindingen      |
| `tagRouter.ts`         | Routering op basis van tags                        |
| `comboResolver.ts`     | Combo-resolutie (gebruikt door de combo-engine)    |
| `modelAvailability.ts` | Beschikbaarheidscontrole per model                 |
| `assessment/`          | Modelbeoordeling (fase 1 van RFC-AUTO-ASSESSMENT ) |

### `src/server/`

| Module   | Doel                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| `authz/` | Autorisatiepipeline: `classify` → `policies` → `enforce` — zie `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS-configuratie                                                                                 |
| `auth/`  | Sessiemiddleware                                                                                  |

### `src/shared/`

| Module                           | Doel                                                                          |
| -------------------------------- | ----------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 providers** met Zod-validatie (enige bron van waarheid)                 |
| `constants/cliTools.ts`          | Register van externe CLI-tools                                                |
| `constants/routingStrategies.ts` | **19 routeringsstrategieën** met prioriteiten                                 |
| `constants/publicApiRoutes.ts`   | Routes die Bearer-authenticatie vereisen (in plaats van beheer-authenticatie) |
| `constants/upstreamHeaders.ts`   | Blokkeerlijst voor headers van upstreamverzoeken                              |
| `validation/schemas.ts`          | ~80 Zod-schema's (enige bron van waarheid voor API-contracten)                |
| `validation/helpers.ts`          | Helpers voor Zod-validatie (`validateBody`, enz.)                             |
| `types/`                         | Gedeelde TS-typen                                                             |
| `contracts/`                     | Openbare API-contracten (gebruikt door `files:` in `package.json`)            |
| `utils/circuitBreaker.ts`        | Circuitbreaker voor providers (zie `docs/architecture/RESILIENCE_GUIDE.md`)   |
| `utils/apiAuth.ts`               | Validatie van API-sleutels en controle van scopes                             |
| `utils/fetchTimeout.ts`          | Timeout-/afbreekwrappers voor upstream-fetches                                |
| `utils/releaseNotes.ts`          | Parser voor gesloten v2-/legacy-aankondigingen, lokalisatie en ID-negering    |

---

## `open-sse/` — Werkruimte voor streamingengine

Afzonderlijke npm-werkruimte (`@omniroute/open-sse`). Verwerkt aanvragen en voert providers uit.

```
open-sse/
├── handlers/            # 16 bestanden (12 handlers + 4 helpers): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, enz.
├── executors/           # 67 providerspecifieke executors (breiden BaseExecutor uit)
├── translator/          # Formaatconverters (9 voor aanvragen, 9 voor antwoorden, 9 helpers)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ servicemodules (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM, enz.)
├── mcp-server/          # MCP-server (110 tools, 3 transporten, 33 scopes)
├── config/              # Provider-/modelregisters, headerconfiguratie, modelaliassen
├── utils/               # TLS-client, proxy-fetch/dispatcher, netwerkhelpers
├── index.ts             # Ingangspunt van werkruimte
├── package.json         # Werkruimtemanifest
├── tsconfig.json        # TS-configuratie van werkruimte
└── types.d.ts           # Typedeclaraties van werkruimte
```

### `open-sse/mcp-server/`

| Pad                         | Doel                                                                              |
| --------------------------- | --------------------------------------------------------------------------------- |
| `server.ts`                 | Levenscyclus van MCP-server (stdio- + HTTP-transporten)                           |
| `httpTransport.ts`          | HTTP Streamable- + SSE-transporten (`/api/mcp/sse`, `/api/mcp/stream`)            |
| `audit.ts`                  | Auditlogboekregistratie in de tabel `mcp_tool_audit`                              |
| `scopeEnforcement.ts`       | Scopevalidatie per tool                                                           |
| `runtimeHeartbeat.ts`       | Statusheartbeat naar `DATA_DIR/runtime/mcp-heartbeat.json`                        |
| `descriptionCompressor.ts`  | Comprimeert metadata van toolbeschrijvingen om context te besparen                |
| `schemas/tools.ts`          | 36 basistooldefinities + scopes                                                   |
| `tools/advancedTools.ts`    | Geavanceerde toolimplementaties                                                   |
| `tools/memoryTools.ts`      | 3 geheugentools (zoeken/toevoegen/wissen)                                         |
| `tools/skillTools.ts`       | 4 vaardigheidstools (weergeven/inschakelen/uitvoeren/uitvoeringen)                |
| `tools/compressionTools.ts` | 5 compressietools                                                                 |
| `README.md`                 | Interne README voor MCP-server (gekoppeld vanuit `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Desktopwrapper

| Bestand          | Doel                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------ |
| `main.js`        | Electron-hoofdproces (BrowserWindow, ingebedde Next.js-server, systeemvak, automatische updates) |
| `preload.js`     | IPC-bridge (contextBridge → `window.omniroute`)                                                  |
| `package.json`   | electron-builder-configuratie + Electron 41 + electron-builder 26.10-afhankelijkheden            |
| `assets/`        | App-pictogrammen (Windows .ico, macOS .icns, Linux .png)                                         |
| `dist-electron/` | Build-uitvoer (genegeerd door git)                                                               |
| `types.d.ts`     | Typedeclaraties voor rendererbridge                                                              |
| `README.md`      | Interne Electron-README (zie ook `docs/guides/ELECTRON_GUIDE.md`)                                |

---

## `bin/` — CLI

| Bestand                                                                                                     | Doel                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Hoofdingang voor de CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos`, enz. |
| `reset-password.mjs`                                                                                        | Zelfstandige CLI voor het opnieuw instellen van wachtwoorden                                                                        |
| `cli/commands/setup.mjs`                                                                                    | Interactieve en niet-interactieve installatiewizard                                                                                 |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostiek van de systeemstatus (8+ controles)                                                                                     |
| `cli/commands/providers.mjs`                                                                                | Providers weergeven/testen/valideren                                                                                                |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI-hulpmodules                                                                                                                     |
| `cli/tray/tray.ts`                                                                                          | Integratie met het systeemvak (platformonafhankelijk: NotifyIcon op Windows, systray2 op macOS/Linux)                               |
| `cli/tray/tray.ps1`                                                                                         | PowerShell-backend voor NotifyIcon (Windows, geen nieuwe binaire bestanden)                                                         |
| `cli/tray/autostart.ts`                                                                                     | Platformonafhankelijk automatisch opstarten (LaunchAgent / .desktop / register)                                                     |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Oplossingsketen in 5 stappen voor het SQLite-stuurprogramma (gebundeld → runtime → uitgestelde installatie → node:sqlite → sql.js)  |
| `cli/runtime/magicBytes.mjs`                                                                                | Validatie van magische bytes van binaire bestanden (ELF / Mach-O / Mach-O fat / PE)                                                 |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — lost stuurprogramma's vooraf op tijdens postinstall / eerste keer opstarten                                    |
| `nodeRuntimeSupport.mjs`                                                                                    | Ondersteunde Node.js-versie valideren tijdens de installatie                                                                        |

---

## `skills/` — Openbare agentvaardigheden

| Bestand                      | Doel                                                                                       |
| ---------------------------- | ------------------------------------------------------------------------------------------ |
| `skills/omniroute*/SKILL.md` | 10 vaardigheidsmanifesten voor externe AI-agenten (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Build- en controlescripts

| Script                              | Doel                                                                                                              |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Runner voor ontwikkeling/opstarten met het laden van omgevingsvariabelen                                          |
| `build-next-isolated.mjs`           | Zelfstandige build (zelfstandige modus van Next.js 16)                                                            |
| `prepublish.ts`                     | Pakketvoorbereiding vóór `npm pack`                                                                               |
| `postinstall.mjs`                   | Automatisch `.env` aanmaken op basis van `.env.example` bij de eerste installatie                                 |
| `sync-env.mjs`                      | Sleutels in `.env` opnieuw synchroniseren met `.env.example`                                                      |
| `check-cycles.mjs`                  | Circulaire afhankelijkheden detecteren                                                                            |
| `check-route-validation.mjs`        | Valideren dat alle API-routes Zod-validatie hebben                                                                |
| `check-t11-any-budget.mjs`          | Expliciet `any`-budget per bestand afdwingen                                                                      |
| `check-docs-sync.mjs`               | Synchronisatie van documentatieversies valideren (bestaande pre-commitcontrole)                                   |
| **`check-env-doc-sync.mjs`**        | NIEUW: omgevingsvariabelen in code vergelijken met `.env.example` en `ENVIRONMENT.md`                             |
| **`check-docs-counts-sync.mjs`**    | NIEUW: valideren dat aantallen (executors, strategieën, OAuth, A2A-vaardigheden) overeenkomen met de documentatie |
| **`check-deprecated-versions.mjs`** | NIEUW: verouderde versies/datums in documentatie markeren                                                         |
| `check-supported-node-runtime.ts`   | Valideren dat de huidige Node-versie wordt ondersteund                                                            |
| `check-pr-test-policy.mjs`          | Regel 'tests vereist' afdwingen bij wijzigingen in productiecode                                                  |
| **`gen-provider-reference.ts`**     | NIEUW: `docs/reference/PROVIDER_REFERENCE.md` automatisch genereren vanuit de catalogus                           |
| `i18n/generate-multilang.mjs`       | UI-tekenreeksen en documentatie vertalen via Google Translate                                                     |
| `i18n_autotranslate.py`             | LLM-gebaseerde pijplijn voor documentatievertaling                                                                |
| `validate_translation.py`           | Vertaling per landinstelling valideren                                                                            |
| `check_translations.py`             | i18n-sleutels aan de codezijde controleren                                                                        |
| `run-playwright-tests.mjs`          | Playwright E2E-runner                                                                                             |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E-runner                                                                                                |
| `run-ecosystem-tests.mjs`           | Tests voor het ecosysteem (providerintegratie)                                                                    |
| `test-report-summary.mjs`           | Markdown-overzicht van testdekking genereren                                                                      |
| `smoke-electron-packaged.mjs`       | Smoke-test voor de verpakte Electron-build                                                                        |
| `native-binary-compat.mjs`          | Valideren dat native afhankelijkheden (`better-sqlite3`) overeenkomen met de Node-versie van Electron             |
| `validate-pack-artifact.ts`         | Uitvoer van npm pack valideren                                                                                    |
| `responses-ws-proxy.mjs`            | WebSocket-bridge voor de Codex Responses API                                                                      |
| `v1-ws-bridge.mjs`                  | WebSocket-bridge voor het eindpunt `/api/v1/ws`                                                                   |
| `standalone-server-ws.mjs`          | Runner voor een zelfstandige WS-server                                                                            |
| `system-info.mjs`                   | Systeem-/runtime-informatie afdrukken voor ondersteuning                                                          |
| `healthcheck.mjs`                   | Eenmalige statuscontrole (gebruikt door Docker HEALTHCHECK)                                                       |
| `uninstall.mjs`                     | Script voor een schone de-installatie                                                                             |

---

## `docs/` — Openbare documentatie (7 hoofdbestanden + 17 submappen)

### Handleidingen op hoofdniveau

| Document                    | Doel                                                                                                           |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Architectuur op hoofdlijnen, overzicht van subsystemen, dashboardoppervlak                                     |
| `CODEBASE_DOCUMENTATION.md` | Technische referentie: mappen, modules, conventies                                                             |
| `FEATURES.md`               | Functiematrix met hoogtepunten van v3.8                                                                        |
| `USER_GUIDE.md`             | Gebruikershandleiding (configuratie, modellen, combo's, CLI's, audio enz.)                                     |
| `API_REFERENCE.md`          | Referentie voor API-endpoints met authenticatiemodel                                                           |
| `openapi.yaml`              | OpenAPI 3.0-specificatie (121 paden)                                                                           |
| `SETUP_GUIDE.md`            | Installatiemethoden (npm, npx, Docker, Electron, Termux, broncode)                                             |
| `ENVIRONMENT.md`            | Alle omgevingsvariabelen (~800 gedocumenteerd, `.env.example` van ~3.050 regels)                               |
| `TROUBLESHOOTING.md`        | Veelvoorkomende fouten + bekende problemen in v3.8.0                                                           |
| `RELEASE_CHECKLIST.md`      | Volledige releaseworkflow (skills, husky, conventional commits, implementatie)                                 |
| `COVERAGE_PLAN.md`          | Dekkingsdoelen en huidige status                                                                               |
| `FREE_TIERS.md`             | Samengestelde lijst met providers met een gratis niveau (48+ gratis + 11 OAuth)                                |
| `CLI-TOOLS.md`              | Externe CLI-integraties + interne OmniRoute CLI                                                                |
| `I18N.md`                   | i18n-architectuur, een taal toevoegen, 42 locales                                                              |
| `UNINSTALL.md`              | Stappen voor een volledige de-installatie                                                                      |
| `PROVIDER_REFERENCE.md`     | **Automatisch gegenereerde** catalogus van 355 providers (opnieuw genereren: `npm run gen:provider-reference`) |

### Verdieping per subsysteem

| Document                                         | Doel                                                                                         |
| ------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                                  | MCP-server: 110 tools, 3 transportmethoden, 33 scopes, REST-endpoints                        |
| `A2A-SERVER.md`                                  | A2A v0.3: JSON-RPC, 6 skills, REST-helpers, agentkaart                                       |
| `AGENT_PROTOCOLS_GUIDE.md`                       | Uniforme handleiding: A2A versus ACP versus Cloud Agents                                     |
| `CLOUD_AGENT.md`                                 | Orkestratie van Codex Cloud / Devin / Jules                                                  |
| `SKILLS.md`                                      | Skills-framework (ingebouwd + marketplace + SkillsSH + sandbox)                              |
| `RADAR.md`                                       | Radar-overlay voor catalogus met gratis modellen (`RADAR_ENABLED`, standaard uitgeschakeld)  |
| `MEMORY.md`                                      | Geheugensysteem (SQLite FTS5 + Qdrant)                                                       |
| `EVALS.md`                                       | Evaluatieframework (suites, uitvoeringen, beoordelingscriteria)                              |
| `GUARDRAILS.md`                                  | PII-maskering, promptinjectie, vision-bridge                                                 |
| `COMPLIANCE.md`                                  | Auditlogboek, retentie, afmelden via noLog                                                   |
| `WEBHOOKS.md`                                    | Met HMAC ondertekende webhooklevering                                                        |
| `REASONING_REPLAY.md`                            | Hybride geheugen-/SQLite-cache voor `reasoning_content`                                      |
| `AUTHZ_GUIDE.md`                                 | Autorisatiepijplijn (`classify` → `policies` → `enforce`)                                    |
| `RESILIENCE_GUIDE.md`                            | Circuit breaker + afkoelperiode + modelvergrendeling                                         |
| `docs/security/STEALTH_GUIDE.md` (alleen in git) | TLS-fingerprinting (JA3/JA4), Claude Code CCH, MITM-certificaat                              |
| `AUTO-COMBO.md`                                  | Auto Combo-engine (beoordeling op basis van 16 factoren, 6 moduspakketten, virtuele fabriek) |

### Compressie

| Document                        | Doel                                      |
| ------------------------------- | ----------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Overzicht van compressiemodi + roadmap    |
| `COMPRESSION_ENGINES.md`        | Caveman- en RTK-engines, registercontract |
| `COMPRESSION_RULES_FORMAT.md`   | JSON-schema voor Caveman-regelpakketten   |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventaris van regelpakketten per taal    |
| `RTK_COMPRESSION.md`            | Declaratieve RTK-pijplijn (49 filters)    |

### Implementatie

| Document                     | Doel                                                               |
| ---------------------------- | ------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Docker-build, profielen (base/cli/host/cliproxyapi), Redis-sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | Algemene VM-/VPS-implementatie (Ubuntu/Debian + nginx + systemd)   |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io-implementatie (momenteel alleen in het Chinees)             |
| `TERMUX_GUIDE.md`            | Headless Android via Termux                                        |
| `PWA_GUIDE.md`               | Installatie van Progressive Web App + serviceworker                |
| `ELECTRON_GUIDE.md`          | Desktop-app bouwen + ondertekenen + distribueren                   |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                             |
| `PROXY_GUIDE.md`             | Uitgaande proxy met 4 niveaus + 1proxy-marktplaats                 |

### Submappen

| Submap                | Doel                                                                                                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Gelokaliseerde documentatievertalingen (41 landinstellingen)                                                                                                                                                                          |
| `docs/screenshots/`   | Afbeeldingsbestanden voor handleidingen                                                                                                                                                                                               |
| `_tasks/superpowers/` | Plannen/specificaties van superpowers (`writing-plans`/`brainstorming`) + onderzoek — geïsoleerde repository met afzonderlijk versiebeheer, genegeerd door Git in de hoofdstructuur. Zie CLAUDE.md → "Planning & Research Artifacts". |

---

## `tests/` — Testsuites

| Submap                               | Type                                           | Runner                                         |
| ------------------------------------ | ---------------------------------------------- | ---------------------------------------------- |
| `tests/unit/`                        | Unittests (~4.800 bestanden, snelst)           | Ingebouwde testrunner van Node                 |
| `tests/integration/`                 | Integratietests voor meerdere modules + DB     | Ingebouwde testrunner van Node (concurrency 1) |
| `tests/e2e/`                         | E2E-tests voor UI + workflows                  | Playwright                                     |
| `tests/e2e/protocol-clients.test.ts` | E2E-tests met echte clients voor MCP + A2A     | Aangepaste protocolclients                     |
| `tests/e2e/ecosystem.test.ts`        | Providerintegratie (maakt netwerkverbindingen) | Ingebouwde testrunner van Node                 |

---

## `public/` — Statische assets

| Pad                  | Doel                                                                 |
| -------------------- | -------------------------------------------------------------------- |
| `public/` (hoofdmap) | Favicons, robots.txt, manifest, serviceworker, marketingafbeeldingen |
| `public/providers/`  | PNG-/SVG-providerlogo's (gebruikt in het dashboard)                  |

---

## `config/` — Statische configuraties + status van kwaliteitscontroles

Meegeleverde configuratiesjablonen plus de vastgelegde baselines voor kwaliteitscontroles
(verplaatst vanuit de hoofdmap van de repository in v3.8.26 om die overzichtelijk te houden).

| Pad                                           | Doel                                                                                                  |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lijst met locales + metadata (canonieke bron voor het aantal van 42 locales)                          |
| `config/i18n-schema.json`                     | JSON-schema voor de validatie van `i18n.json`                                                         |
| `config/payloadRules.json`                    | Regels voor het opschonen van upstream-payloads                                                       |
| `config/quality/quality-baseline.json`        | Ratchet-baseline met meerdere metriekwaarden (`scripts/quality/check-quality-ratchet.mjs`)            |
| `config/quality/complexity-baseline.json`     | Bevroren baseline voor ESLint-complexiteit (`check-complexity.mjs`)                                   |
| `config/quality/duplication-baseline.json`    | Bevroren baseline voor jscpd-duplicatie (`check-duplication.mjs`)                                     |
| `config/quality/file-size-baseline.json`      | Bevroren baseline voor de grootte per bestand (`check-file-size.mjs`)                                 |
| `config/quality/test-discovery-baseline.json` | Bevroren baseline voor verweesde tests (`check-test-discovery.mjs`)                                   |
| `config/quality/dependency-allowlist.json`    | Lijst met goedgekeurde afhankelijkheden (`check-deps.mjs`)                                            |
| `config/quality/.license-allowlist.json`      | Lijst met toegestane SPDX-licenties (`check-licenses.mjs`)                                            |
| `config/quality/quality-metrics.json`         | Tijdelijke verzamelde metriekwaarden (gegenereerd door `collect-metrics.mjs`; **genegeerd door git**) |

---

## `.github/` — GitHub-integratie

| Pad                                | Doel                                                               |
| ---------------------------------- | ------------------------------------------------------------------ |
| `.github/workflows/`               | GitHub Actions CI/CD-workflows (linting, testen, dekking, release) |
| `.github/ISSUE_TEMPLATE/`          | Issuetemplates voor bugs en functies                               |
| `.github/pull_request_template.md` | PR-template                                                        |
| `.github/dependabot.yml`           | Configuratie voor updates van afhankelijkheden                     |

---

## `.husky/` — Git-hooks

| Bestand      | Doel                                                                                   |
| ------------ | -------------------------------------------------------------------------------------- |
| `pre-commit` | Voert `lint-staged + check-docs-sync + check:any-budget:t11` uit                       |
| `pre-push`   | Momenteel uitgeschakeld (uitgecommentarieerd). Voer `npm run test:unit` handmatig uit. |
| `_/`         | Interne onderdelen van Husky                                                           |

---

## `.claude/` — Slashcommando's voor Claude Code

| Bestand                                             | Doel                                                          |
| --------------------------------------------------- | ------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — versie verhogen + automatische changelog |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — volledige releaseworkflow            |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Implementeren op VPS                                          |
| `commands/capture-release-evidences-cc.md`          | Nieuwe functies in de browser opnemen als WebP                |
| `commands/review-{prs,discussions}-cc.md`           | GitHub-PR's/discussies triëren                                |
| `commands/{review-issues,implement-features}-cc.md` | Issueworkflows                                                |
| `settings.local.json`                               | Projectspecifieke Claude Code-instellingen                    |

---

## `.agents/` — Algemene agentworkflows (Codex / Cursor / enz.)

| Pad                      | Doel                                                    |
| ------------------------ | ------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 workflowdefinities (spiegel van `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 vaardigheidsdefinities met Codex-uitvoeringsnotities  |

> **Opmerking:** Workflows en commando's zijn momenteel byte voor byte identiek. Als `.agents/` bedoeld is voor een andere agentruntime (Codex), moeten de varianten betekenisvol van elkaar verschillen.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Buiten de hoofdstructuur

Deze mappen met een voorlooponderstrepingsteken bevatten inhoud die niet wordt gedistribueerd:

- **`_ideia/`** — ontwerpnotities (categorieën defer / notfit / viable)
- **`_mono_repo/`** — historische subprojecten (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — alleen-lezenklonen van gerelateerde OSS-projecten (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, enz.) voor kruisverwijzingen tijdens de ontwikkeling
- **`_tasks/`** — bestanden voor taakregistratie per release (informeel)

Niet opgenomen in de uitvoer van `npm pack`. Zie `.npmignore`.

---

## Gegenereerd / genegeerd door Git

| Pad                    | Doel                          |
| ---------------------- | ----------------------------- |
| `node_modules/`        | npm-afhankelijkheden          |
| `.next/`               | Next.js-builduitvoer          |
| `coverage/`            | c8-dekkingsrapporten          |
| `logs/`                | Runtimelogboeken              |
| `package/`             | Tijdelijke map voor npm pack  |
| `.playwright-mcp/`     | Playwright MCP-testartefacten |
| `.issues/`             | Lokale issuecache             |
| `tsconfig.tsbuildinfo` | Incrementele TS-cache         |

---

## Navigatietips

- **Nieuwe bijdrager?** Lees `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Een provider toevoegen?** Volg `docs/architecture/ARCHITECTURE.md § Adding a New Provider` en controleer dit aan de hand van `docs/reference/PROVIDER_REFERENCE.md`.
- **Een route toevoegen?** Raadpleeg `docs/architecture/ARCHITECTURE.md § Adding a New API Route` en `src/shared/validation/schemas.ts`.
- **Een MCP-tool toevoegen?** Raadpleeg `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Een A2A-skill toevoegen?** Raadpleeg `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Lokaal uitvoeren?** Raadpleeg `docs/guides/SETUP_GUIDE.md`.
- **Implementeren?** Raadpleeg `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Een release uitbrengen?** Raadpleeg `docs/ops/RELEASE_CHECKLIST.md` (en de Claude Code-skill `/generate-release-cc`).
