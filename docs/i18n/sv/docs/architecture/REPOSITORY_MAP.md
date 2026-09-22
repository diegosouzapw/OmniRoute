# Repository Map (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Enradig beskrivning av varje katalog och rotfil.**
> Senast uppdaterad: 2026-06-28 — OmniRoute v3.8.40
>
> Använd den här kartan för att snabbt navigera i kodbasen. Följ länkarna till den särskilda dokumentationen för djupgående information.

## Träd på toppnivå

```
OmniRoute/
├── src/                  # Next.js 16-applikation (UI + API-rutter + bibliotek + domän + server)
├── open-sse/             # Arbetsyta för strömningsmotorn (hanterare, exekverare, översättare, MCP-server)
├── electron/             # Skrivbordsomslag (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI-startpunkt och kommandohanterare
├── scripts/              # Skript för byggande, kontroller, synkronisering och engångsåtgärder
├── docs/                 # Offentlig dokumentation (du är här)
├── tests/                # Alla testsviter (enhets-, integrations-, e2e- och protokollklienttester)
├── public/               # Statiska Next.js-resurser, PWA-manifest, service worker, ikoner
├── config/               # Statisk konfiguration + kvalitetsgrindens tillstånd (i18n, payloadRules, quality/)
├── images/               # Bildresurser för marknadsföring/README
├── @omniroute/           # Publicerbara kompletterande paket (opencode-plugin, opencode-provider)
├── skills/               # Färdighetspaket för CLI/agenter (cli-* + omni-* + config-codex-cli)
├── examples/             # Exempelinsticksprogram + startmall för omniroute-cmd-hello
├── contrib/              # Bidrag från communityn (podman/)
├── .source/              # Fumadocs-källkonfiguration (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions-arbetsflöden + ärendemallar + PR-mall
├── .husky/               # Git-krokar (pre-commit, pre-push)
├── .claude/              # Snedstreckskommandon för Claude Code (projektspecifika)
├── .agents/              # Arbetsflöden + färdigheter för Codex/generiska agenter (spegel av .claude/)
├── .vscode/              # Inställningar för VS Code-arbetsytan
├── _ideia/               # Planeringsanteckningar (informella; distribueras inte)
├── _mono_repo/           # Historiska delprojekt (cloud, site, vscode-extension)
├── _references/          # Skrivskyddade referenskloner från relaterade OSS-projekt
├── _tasks/               # Filer för versionsspecifik uppgiftsspårning (informella)
├── .build/ .worktrees/ dist/   # Lokalt arbetsmaterial för byggnation/git-worktree/byggutdata (gitignored)
├── .issues/              # Lokal ärendecache (gitignored)
├── .playwright-mcp/      # Testartefakter för Playwright MCP
├── coverage/             # Täckningsutdata från c8 (gitignored)
├── logs/                 # Körningsloggar (gitignored)
├── node_modules/         # Beroenden (gitignored)
├── package/              # Mellanlagringsområde för npm pack (byggartefakt)
├── .next/                # Byggutdata från Next.js (gitignored)
└── (rotfiler — se nedan)
```

---

## Rotfiler

| Fil                                         | Syfte                                                                                        |
| ------------------------------------------- | -------------------------------------------------------------------------------------------- |
| **README.md**                               | Marknadsföringssida + snabbstart + funktionsmatris (se även `llm.txt`)                       |
| **CHANGELOG.md**                            | Ändringslogg per version (autogenererad av färdigheten `/version-bump-cc`)                   |
| **LICENSE**                                 | MIT-licenstext                                                                               |
| **CLAUDE.md**                               | Projektregler för Claude Code-agenter (strikta regler, konventioner, scenarier)              |
| **AGENTS.md**                               | Samma som CLAUDE.md, men för andra AI-agenter än Claude (Codex, Cursor osv.)                 |
| **GEMINI.md**                               | Kortfattade regler för Gemini-baserade agenter (delmängd av CLAUDE.md)                       |
| **CONTRIBUTING.md**                         | Bidragsguide: konfiguration, konventionella commits, testning, PR-flöde                      |
| **SECURITY.md**                             | Policy för rapportering av sårbarheter, versioner som stöds, hotmodell                       |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — förväntningar på beteende i gemenskapen                               |
| **llm.txt**                                 | Landningssida i klartext optimerad för LLM-sökrobotar (SEO för AI-assistenter)               |
| **package.json**                            | npm-manifest, skript, beroenden, motorer, c8-täckningsgräns                                  |
| **package-lock.json**                       | Låst beroendeträd                                                                            |
| **tsconfig.json**                           | TypeScript-rotkonfiguration                                                                  |
| **tsconfig.typecheck-core.json**            | Typkontrollskonfiguration för kärnan i `src/`                                                |
| **tsconfig.typecheck-noimplicit-core.json** | Strikt typkontroll (`noImplicitAny`)                                                         |
| **tsconfig.tsbuildinfo**                    | Cache för inkrementell TS-kompilering (ignoreras av git)                                     |
| **next.config.mjs**                         | Byggkonfiguration för Next.js 16 (fristående utdata)                                         |
| **next-env.d.ts**                           | Autogenererade miljötyper för Next.js                                                        |
| **eslint.config.mjs**                       | Platt ESLint-konfiguration (regler per projektområde)                                        |
| **prettier.config.mjs**                     | Formateringsregler för Prettier                                                              |
| **postcss.config.mjs**                      | PostCSS-konfiguration för Tailwind/CSS-pipelinen                                             |
| **playwright.config.ts**                    | Konfiguration för E2E-tester med Playwright                                                  |
| **vitest.config.ts**                        | Vitest-konfiguration (standardsvit)                                                          |
| **vitest.mcp.config.ts**                    | Vitest-konfiguration för MCP-servern samt sviterna autoCombo och cache                       |
| **sonar-project.properties**                | SonarQube/SonarCloud-konfiguration (kodkvalitet)                                             |
| **Dockerfile**                              | Docker-bygge i flera steg (builder → runner-base → runner-cli)                               |
| **docker-compose.yml**                      | Utvecklingskonfiguration med 4 profiler (base, cli, host, cliproxyapi) + redis-sidovagn      |
| **docker-compose.prod.yml**                 | Produktionskonfiguration (port 20130, redis, namngivna volymer)                              |
| **.dockerignore**                           | Filer som undantas från Docker-kontexten                                                     |
| **fly.toml**                                | Distributionskonfiguration för Fly.io (region `sin`, port 20128, /data-volym)                |
| **.env.example**                            | Mall för miljöfil (kopieras automatiskt till `.env` vid första installationen)               |
| **.gitignore**                              | Ignoreringsmönster för git                                                                   |
| **.npmignore**                              | Undantagslista för npm-publicering                                                           |
| **.npmrc**                                  | npm-konfiguration (register, policy för låsfil)                                              |
| **.node-version**                           | Låst Node-version (används av nvm-kompatibla verktyg)                                        |
| **.nvmrc**                                  | Låst Node-version för nvm                                                                    |
| **eslint.complexity.config.mjs**            | ESLint-konfiguration för komplexitetsspärren (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | ESLint-konfiguration för SonarJS-regler (kognitiv komplexitet/dubblering)                    |
| **source.config.ts**                        | Fumadocs `defineDocs`-källkonfiguration (matar `.source/`)                                   |
| **knip.json**                               | Knip-konfiguration — oanvända filer/exporter/beroenden (matar spärren för död kod)           |
| **stryker.conf.json**                       | Konfiguration för mutationstestning med Stryker                                              |
| **.size-limit.json**                        | Konfiguration av paketstorleksbudget för size-limit                                          |
| **promptfooconfig.yaml**                    | Utvärderingskonfiguration för promptfoo                                                      |
| **.gitleaks.toml**                          | Regeluppsättning för hemlighetsskanning med gitleaks                                         |
| **.zizmor.yml**                             | Konfiguration för säkerhetsanalys av GitHub Actions med zizmor                               |
| **socket.yml**                              | Konfiguration för leveranskedjan med Socket.dev                                              |
| **news.json**                               | Lokaliserat v2-meddelandeflöde; lanseringspost för Radar levereras inaktiv                   |
| **flake.nix** / **flake.lock**              | Definition av Nix-utvecklingsskal + låsfil                                                   |
| **.env**                                    | Lokala hemligheter (ignoreras av git — genereras från `.env.example`)                        |

> **Flyttat från roten i v3.8.26 (rensning):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` och den genererade `quality-metrics.json` (ignoreras av git). Se [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js-applikation

```
src/
├── app/                 # App Router (sidor + API-rutter + statussidor + landningssida)
├── lib/                 # Kärnbibliotek/domänmoduler (80 underkataloger + ~70 filer på toppnivå)
├── domain/              # Ren domänlogik (policymotor, reservlösning, kostnad, utelåsning, comboResolver, bedömning)
├── server/              # Moduler endast för servern (auktoriseringspipeline, cors, autentiseringsmiddleware) — kan inte importeras från klienten
├── shared/              # Delas mellan server och klient där det är säkert (konstanter, typer, validering, kontrakt, verktyg)
├── i18n/                # next-intl-konfiguration + meddelande-JSON per språkvariant (42 språkvarianter)
├── middleware/          # Next.js-middleware (berikning av förfrågningar, identifiering av språkvariant)
├── mitm/                # MITM-proxykärna: generering/installation av certifikat, hanterare, mål, inspektör, masker, direktvidarebefordran
│   ├── handlers/        # 9 hanterarklasser för IDE-agenter som utökar MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Lager för trafikinsamling: buffert (ringbuffert i minnet), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Kopplingskod för modelladaptrar (äldre kompatibilitetslager)
├── scripts/             # Underhållsskript i källträdet (t.ex. backfillAggregation)
├── sse/                 # Äldre SSE-hanterare/-tjänster (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Äldre minnesbaserat datalager (fasas ut till förmån för src/lib/db)
├── types/               # Delade TS-typfiler
├── instrumentation.ts   # Next.js-telemetrikrok (webbläsare + edge)
├── instrumentation-node.ts  # Instrumentering endast för Node
└── proxy.ts             # Ingångskompatibilitetslager för HTTP-proxy
```

### `src/app/` — App Router (Next.js 16)

| Sökväg                                                                       | Syfte                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | Publikt OpenAI-kompatibelt API (~25 underrutter: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers osv.)                                                                                                                         |
| `app/api/v1beta/`                                                            | API-slutpunkter i Gemini-stil                                                                                                                                                                                                                                                                                            |
| `app/api/playground/`                                                        | Rutter för Playground Studio: `improve-prompt/` (POST — LLM-baserad omformulering av prompter), `presets/` (GET-lista/POST-skapa), `presets/[id]/` (GET/PUT/DELETE) — se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                          |
| `app/api/` (ej v1)                                                           | Hanterings-/administrationsrutter (~60 kataloger: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools osv.)                                                                                                                                   |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 rutter (serverstyrning, agentstatus/DNS/mappningar, förbikoppling, certifikat, överordnad CA). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                             |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ rutter (förfrågningar, sessioner, värdar, insamlingslägen, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                  |
| `app/a2a/`                                                                   | Startpunkt för A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                            |
| `app/.well-known/agent.json/`                                                | A2A-agentkort (identifiering)                                                                                                                                                                                                                                                                                            |
| `app/(dashboard)/dashboard/`                                                 | Gränssnittssidor för instrumentpanelen (50+ sektioner, ~118 page.tsx-filer: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity osv.)                                                                                                                     |
| `app/(dashboard)/dashboard/search-tools/`                                    | Gränssnitt för Search Tools Studio (3 flikar: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — se `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                 |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (skal med 3 flikar), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Instrumentpanelssida för AgentBridge — serverkort, 9 agentkort, konfigurationsguide, modellmappning, lista över förbikopplingar. i18n PT-BR + EN. Se `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                   |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Instrumentpanelssida för Traffic Inspector — DevTools-delad vy, 7 detaljflikar, 4 växlingsknappar för insamlingsläge, sessionsinspelare, kontextfärgläggning. i18n PT-BR + EN. Se `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                |
| `app/(dashboard)/dashboard/activity/`                                        | Aktivitetsflödessida (grupp B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — se `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                  |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Sida för kvotdelning (grupp B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                              |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Konfigurationssida för leverantörsplaner (grupp B): `page.tsx` + `ProviderPlanConfigClient.tsx` — åsidosättning av kvotdimensioner per anslutning                                                                                                                                                                        |
| `app/docs/`                                                                  | Inbäddad dokumentationsvisare (renderar `docs/*.md`)                                                                                                                                                                                                                                                                     |
| `app/landing/`                                                               | Marknadsföringslandningssida                                                                                                                                                                                                                                                                                             |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Autentiseringsrelaterade sidor                                                                                                                                                                                                                                                                                           |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP-felsidor                                                                                                                                                                                                                                                                                                            |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statiska sidor/statussidor                                                                                                                                                                                                                                                                                               |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Rotlayout, startsida, PWA-manifest, global CSS                                                                                                                                                                                                                                                                           |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Felgränser                                                                                                                                                                                                                                                                                                               |

### `src/lib/` — Kärnbibliotek (~50 moduler)

| Modul                                    | Syfte                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Uppgiftshanterare för A2A-protokollet, färdigheter (5), strömning                                                                                                                                                                                                                                                          |
| `acp/`                                   | CLI-agentregister (lokal CLI-identifiering — se `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                |
| `api/`                                   | Gemensamma API-hjälpfunktioner (`requireManagementAuth`, validering)                                                                                                                                                                                                                                                       |
| `auth/`                                  | Session, lösenordshashning, tokenvalidering                                                                                                                                                                                                                                                                                |
| `batches/`                               | Hanterare för OpenAI Batches API                                                                                                                                                                                                                                                                                           |
| `catalog/`                               | Zod-validering av leverantörskatalogen + matchning av funktioner                                                                                                                                                                                                                                                           |
| `cloudAgent/`                            | Molnagenter (Codex Cloud, Devin, Jules) — se `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                              |
| `combos/`                                | Matchning av kombinationer + hjälpfunktioner för omordning                                                                                                                                                                                                                                                                 |
| `audit/`                                 | Hjälpfunktioner för aktivitetsflödet: `highLevelActions.ts` (tillåtelselista + `isHighLevelAction()`), `activityIcons.ts` (mappning från åtgärd → ikon/verb), `timeline.ts` (groupByDay/relativeTime) — se `docs/architecture/MONITORING_SECTIONS.md`                                                                      |
| `compliance/`                            | Granskningslogg + leverantörsgranskning — se `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                 |
| `compression/`                           | Integrationskod för komprimeringsmotorn (motorerna finns i `open-sse/services/compression/`)                                                                                                                                                                                                                               |
| `config/`                                | Hjälpfunktioner för körningskonfiguration                                                                                                                                                                                                                                                                                  |
| `db/`                                    | Över 120 DB-moduler för domäner + 168 migreringar (gå alltid via dessa för SQLite)                                                                                                                                                                                                                                         |
| `quota/`                                 | Motor för kvotdelning: `dimensions.ts` (typer/Zod), `types.ts` (`QuotaStore`-gränssnitt), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — se `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Katalogklient för kostnadsfria modeller i Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — se `docs/frameworks/RADAR.md`                                                                                                                                |
| `display/`                               | Hjälpfunktioner för UI-formatering (kostnad, latens osv.)                                                                                                                                                                                                                                                                  |
| `embeddings/`                            | Hjälpfunktioner för embeddingtjänsten                                                                                                                                                                                                                                                                                      |
| `env/`                                   | Tolkning och validering av miljövariabler                                                                                                                                                                                                                                                                                  |
| `evals/`                                 | Ramverk för utvärderingar (sviter, körare, körtidsmiljö) — se `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                   |
| `guardrails/`                            | Maskering av personuppgifter, promptinjektion, brygga för bildbehandling — se `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                |
| `jobs/`                                  | Bakgrundsjobb (cron-liknande)                                                                                                                                                                                                                                                                                              |
| `memory/`                                | Konversationsminne (SQLite FTS5 + sqlite-vec hybrid-RRF + Qdrant-nivå 2) — se `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                  |
| `memory/embedding/`                      | Embeddinglager med flera källor: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                           |
| `memory/vectorStore.ts`                  | Omslag för sqlite-vec v0.1.9 — KNN-råstyrkesökning + hybrid-RRF (FTS5 + vektor, k=60). Initieras vid behov och degraderas kontrollerat när sqlite-vec inte är tillgängligt. (plan 21)                                                                                                                                      |
| `memory/reindex.ts`                      | `runReindexBatch()` — bearbetar minnen med `needs_reindex=1` i bakgrunden; anropas av `POST /api/memory/reindex` och sökvägen för bakåtfyllnad vid behov. (plan 21)                                                                                                                                                        |
| `monitoring/`                            | Hälsokontroller, generering av mätvärden                                                                                                                                                                                                                                                                                   |
| `oauth/`                                 | OAuth-/importflöden för 22 leverantörsmoduler (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                  |
| `plugins/`                               | Pluginregister                                                                                                                                                                                                                                                                                                             |
| `promptCache/`                           | Brytpunkter för promptcache i Anthropic-stil                                                                                                                                                                                                                                                                               |
| `skills/`                                | Färdighetsramverk (inbyggt + marknadsplats + SkillsSH) — se `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                    |
| `playground/`                            | Delade hjälpmoduler för Playground Studio: `codeExport.ts` (generator för curl/Python/TS), `promptImprover.ts` (metapromptbyggare), `streamMetrics.ts` (ren TTFT/TPS), `types.ts` (pristabell) — se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                 |
| `webhookDispatcher.ts`                   | HMAC-leverans av webhooks — se `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                               |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tunnelhanterare — se `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                           |
| `cloudSync.ts`, `initCloudSync.ts`       | Valfri molnsynkronisering av tillstånd                                                                                                                                                                                                                                                                                     |
| `localDb.ts`                             | Återexporterande samlingsmodul för db-moduler (ingen logik — endast återexporter)                                                                                                                                                                                                                                          |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Cachelagring av förfrågningar + idempotens                                                                                                                                                                                                                                                                                 |
| (~30 fler filer på toppnivå)             | Specialiserade hjälpmoduler (logEnv, modelsDevSync, piiSanitizer osv.)                                                                                                                                                                                                                                                     |

### `src/lib/db/` — Databas (122 moduler + 168 migreringar)

| Underkatalog              | Syfte                                                                                                                                                                            |
| ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton-instansen `getDbInstance()` med WAL-journalföring                                                                                                                      |
| `db/migrations/`          | Versionshanterade SQL-filer (idempotenta, transaktionella). `073_memory_vec.sql` lägger till `memory_vec_meta` + kolumnen `needs_reindex` (plan 21).                             |
| `db/playgroundPresets.ts` | CRUD-modul för Playground Studio-förinställningar (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD för `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` osv. (plan 21)                       |
| `db/<domain>.ts`          | En modul per domän: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache osv.           |

### `src/domain/`

| Modul                  | Syfte                                             |
| ---------------------- | ------------------------------------------------- |
| `policy.ts`            | Policymotor                                       |
| `fallbackPolicy.ts`    | Beslutsträd för reservlösningar                   |
| `costRules.ts`         | Regler för kostnadsberäkning                      |
| `lockoutPolicy.ts`     | Spärrpolicy för modell/anslutning                 |
| `tagRouter.ts`         | Taggbaserad dirigering                            |
| `comboResolver.ts`     | Combo-matchning (används av combo-motorn)         |
| `modelAvailability.ts` | Tillgänglighetskontroll per modell                |
| `assessment/`          | Modellutvärdering (fas 1 av RFC-AUTO-ASSESSMENT ) |

### `src/server/`

| Modul    | Syfte                                                                                               |
| -------- | --------------------------------------------------------------------------------------------------- |
| `authz/` | Auktoriseringspipeline: `classify` → `policies` → `enforce` — se `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS-konfiguration                                                                                  |
| `auth/`  | Middleware för sessioner                                                                            |

### `src/shared/`

| Modul                            | Syfte                                                                              |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 leverantörer** med Zod-validering (den enda sanningskällan)                  |
| `constants/cliTools.ts`          | Register över externa CLI-verktyg                                                  |
| `constants/routingStrategies.ts` | **19 routningsstrategier** med prioriteter                                         |
| `constants/publicApiRoutes.ts`   | Rutter som kräver Bearer-autentisering (i stället för hanteringsautentisering)     |
| `constants/upstreamHeaders.ts`   | Lista över förbjudna headers för upstream-förfrågningar                            |
| `validation/schemas.ts`          | ~80 Zod-scheman (den enda sanningskällan för API-kontrakt)                         |
| `validation/helpers.ts`          | Hjälpfunktioner för Zod-validering (`validateBody` osv.)                           |
| `types/`                         | Delade TS-typer                                                                    |
| `contracts/`                     | Publika API-kontrakt (används av `files:` i `package.json`)                        |
| `utils/circuitBreaker.ts`        | Kretsbrytare för leverantörer (se `docs/architecture/RESILIENCE_GUIDE.md`)         |
| `utils/apiAuth.ts`               | Validering av API-nycklar och kontroll av behörighetsomfång                        |
| `utils/fetchTimeout.ts`          | Wrappers för timeout/avbrott vid upstream-fetch                                    |
| `utils/releaseNotes.ts`          | Parser för avslutade v2-/äldre meddelanden, lokalisering och ID-baserad avfärdning |

---

## `open-sse/` — Arbetsyta för strömningsmotor

Separat npm-arbetsyta (`@omniroute/open-sse`). Hanterar bearbetning av förfrågningar samt körning mot leverantörer.

```
open-sse/
├── handlers/            # 16 filer (12 hanterare + 4 hjälpfunktioner): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search osv.
├── executors/           # 67 leverantörsspecifika exekverare (utökar BaseExecutor)
├── translator/          # Formatkonverterare (9 för förfrågningar, 9 för svar, 9 hjälpfunktioner)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ tjänstemoduler (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM osv.)
├── mcp-server/          # MCP-server (110 verktyg, 3 transporter, 33 omfång)
├── config/              # Leverantörs-/modellregister, konfiguration av headers, modellalias
├── utils/               # TLS-klient, proxy-fetch/dispatcher, nätverkshjälpfunktioner
├── index.ts             # Arbetsytans startpunkt
├── package.json         # Arbetsytans manifest
├── tsconfig.json        # Arbetsytans TS-konfiguration
└── types.d.ts           # Arbetsytans typdeklarationer
```

### `open-sse/mcp-server/`

| Sökväg                      | Syfte                                                                           |
| --------------------------- | ------------------------------------------------------------------------------- |
| `server.ts`                 | MCP-serverns livscykel (stdio- + HTTP-transporter)                              |
| `httpTransport.ts`          | HTTP Streamable- + SSE-transporter (`/api/mcp/sse`, `/api/mcp/stream`)          |
| `audit.ts`                  | Revisionsloggning till tabellen `mcp_tool_audit`                                |
| `scopeEnforcement.ts`       | Omfångsvalidering per verktyg                                                   |
| `runtimeHeartbeat.ts`       | Hälsopuls till `DATA_DIR/runtime/mcp-heartbeat.json`                            |
| `descriptionCompressor.ts`  | Komprimerar metadata för verktygsbeskrivningar för att spara kontext            |
| `schemas/tools.ts`          | 36 grundläggande verktygsdefinitioner + omfång                                  |
| `tools/advancedTools.ts`    | Avancerade verktygsimplementationer                                             |
| `tools/memoryTools.ts`      | 3 minnesverktyg (sök/lägg till/rensa)                                           |
| `tools/skillTools.ts`       | 4 färdighetsverktyg (lista/aktivera/kör/körningar)                              |
| `tools/compressionTools.ts` | 5 komprimeringsverktyg                                                          |
| `README.md`                 | Intern README för MCP-servern (korslänkad från `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Skrivbordsomslag

| Fil              | Syfte                                                                                               |
| ---------------- | --------------------------------------------------------------------------------------------------- |
| `main.js`        | Electrons huvudprocess (BrowserWindow, inbäddad Next.js-server, systemfält, automatisk uppdatering) |
| `preload.js`     | IPC-brygga (contextBridge → `window.omniroute`)                                                     |
| `package.json`   | electron-builder-konfiguration + beroenden för Electron 41 + electron-builder 26.10                 |
| `assets/`        | Appikoner (Windows .ico, macOS .icns, Linux .png)                                                   |
| `dist-electron/` | Byggutdata (ignoreras av git)                                                                       |
| `types.d.ts`     | Typdeklarationer för renderarbryggan                                                                |
| `README.md`      | Intern README för Electron (se även `docs/guides/ELECTRON_GUIDE.md`)                                |

---

## `bin/` — CLI

| Fil                                                                                                         | Syfte                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Huvudsaklig CLI-startpunkt — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` osv. |
| `reset-password.mjs`                                                                                        | Fristående CLI för lösenordsåterställning                                                                                             |
| `cli/commands/setup.mjs`                                                                                    | Interaktiv och icke-interaktiv installationsguide                                                                                     |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostik av systemets hälsa (8+ kontroller)                                                                                         |
| `cli/commands/providers.mjs`                                                                                | Lista/testa/validera leverantörer                                                                                                     |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Hjälpmoduler för CLI                                                                                                                  |
| `cli/tray/tray.ts`                                                                                          | Integrering med systemfältet (plattformsoberoende: NotifyIcon i Windows, systray2 i macOS/Linux)                                      |
| `cli/tray/tray.ps1`                                                                                         | PowerShell-bakände för NotifyIcon (Windows, inga nya binärfiler)                                                                      |
| `cli/tray/autostart.ts`                                                                                     | Plattformsoberoende automatisk start (LaunchAgent / .desktop / registret)                                                             |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Upplösningskedja i fem steg för SQLite-drivrutiner (medföljande → körningsmiljö → behovsinstallation → node:sqlite → sql.js)          |
| `cli/runtime/magicBytes.mjs`                                                                                | Validering av binära magiska byte (ELF / Mach-O / Mach-O fat / PE)                                                                    |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — förhandsupplöser drivrutiner vid postinstall/första starten                                                      |
| `nodeRuntimeSupport.mjs`                                                                                    | Validerar att Node.js-versionen stöds vid installation                                                                                |

---

## `skills/` — Publika agentfärdigheter

| Fil                          | Syfte                                                                                 |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 färdighetsmanifest för externa AI-agenter (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Bygg- och kontrollskript

| Skript                              | Syfte                                                                                                 |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Utvecklings-/startkörning med inläsning av miljövariabler                                             |
| `build-next-isolated.mjs`           | Fristående bygge (fristående Next.js 16)                                                              |
| `prepublish.ts`                     | Paketförberedelse före `npm pack`                                                                     |
| `postinstall.mjs`                   | Skapa automatiskt `.env` från `.env.example` vid den första installationen                            |
| `sync-env.mjs`                      | Synkronisera om nycklar i `.env` med `.env.example`                                                   |
| `check-cycles.mjs`                  | Identifiera cirkulära beroenden                                                                       |
| `check-route-validation.mjs`        | Validera att alla API-rutter har Zod-validering                                                       |
| `check-t11-any-budget.mjs`          | Framtvinga en uttrycklig budget för `any` per fil                                                     |
| `check-docs-sync.mjs`               | Validera synkronisering av dokumentationsversioner (befintlig kontroll före incheckning)              |
| **`check-env-doc-sync.mjs`**        | NYTT: jämför miljövariabler i koden med `.env.example` och `ENVIRONMENT.md`                           |
| **`check-docs-counts-sync.mjs`**    | NYTT: validera att antal (exekverare, strategier, OAuth, A2A-färdigheter) stämmer med dokumentationen |
| **`check-deprecated-versions.mjs`** | NYTT: flagga inaktuella versioner/datum i dokumentationen                                             |
| `check-supported-node-runtime.ts`   | Validera att den aktuella Node-versionen stöds                                                        |
| `check-pr-test-policy.mjs`          | Framtvinga regeln ”tester krävs” vid ändringar i produktionskod                                       |
| **`gen-provider-reference.ts`**     | NYTT: generera automatiskt `docs/reference/PROVIDER_REFERENCE.md` från katalogen                      |
| `i18n/generate-multilang.mjs`       | Översätt gränssnittstexter och dokumentation via Google Translate                                     |
| `i18n_autotranslate.py`             | LLM-baserad pipeline för dokumentöversättning                                                         |
| `validate_translation.py`           | Validering av översättningar per språkvariant                                                         |
| `check_translations.py`             | Kodbaserad kontroll av i18n-nycklar                                                                   |
| `run-playwright-tests.mjs`          | Playwright-körning för E2E-tester                                                                     |
| `run-protocol-clients-tests.mjs`    | MCP/A2A-körning för E2E-tester                                                                        |
| `run-ecosystem-tests.mjs`           | Ekosystemtester (leverantörsintegrering)                                                              |
| `test-report-summary.mjs`           | Generera en sammanfattning av täckningen i markdown                                                   |
| `smoke-electron-packaged.mjs`       | Röktesta paketerat Electron-bygge                                                                     |
| `native-binary-compat.mjs`          | Validera att systemspecifika beroenden (`better-sqlite3`) matchar Electrons Node                      |
| `validate-pack-artifact.ts`         | Validera utdata från npm-paketering                                                                   |
| `responses-ws-proxy.mjs`            | WebSocket-brygga för Codex Responses API                                                              |
| `v1-ws-bridge.mjs`                  | WebSocket-brygga för slutpunkten `/api/v1/ws`                                                         |
| `standalone-server-ws.mjs`          | Körning av fristående WS-server                                                                       |
| `system-info.mjs`                   | Skriv ut system-/körningsmiljöinformation för support                                                 |
| `healthcheck.mjs`                   | Hälsokontroll som körs en gång (används av Docker HEALTHCHECK)                                        |
| `uninstall.mjs`                     | Skript för ren avinstallation                                                                         |

---

## `docs/` — Offentlig dokumentation (7 rotfiler + 17 underkataloger)

### Övergripande guider

| Dokument                    | Syfte                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ARCHITECTURE.md`           | Övergripande arkitektur, karta över delsystem, instrumentpanelens gränssnitt                           |
| `CODEBASE_DOCUMENTATION.md` | Teknisk referens: kataloger, moduler, konventioner                                                     |
| `FEATURES.md`               | Funktionsmatris med höjdpunkter i v3.8                                                                 |
| `USER_GUIDE.md`             | Användarhandbok (konfiguration, modeller, kombinationer, CLI:er, ljud osv.)                            |
| `API_REFERENCE.md`          | Referens för API-slutpunkter med autentiseringsmodell                                                  |
| `openapi.yaml`              | OpenAPI 3.0-specifikation (121 sökvägar)                                                               |
| `SETUP_GUIDE.md`            | Installationsmetoder (npm, npx, Docker, Electron, Termux, källkod)                                     |
| `ENVIRONMENT.md`            | Alla miljövariabler (~800 dokumenterade, ~3 050 rader i `.env.example`)                                |
| `TROUBLESHOOTING.md`        | Vanliga fel + kända problem i v3.8.0                                                                   |
| `RELEASE_CHECKLIST.md`      | Fullständigt utgivningsflöde (färdigheter, husky, konventionella commits, driftsättning)               |
| `COVERAGE_PLAN.md`          | Täckningsmål och aktuell status                                                                        |
| `FREE_TIERS.md`             | Kurerade leverantörer med kostnadsfria nivåer (48+ kostnadsfria + 11 OAuth)                            |
| `CLI-TOOLS.md`              | Externa CLI-integrationer + intern OmniRoute-CLI                                                       |
| `I18N.md`                   | i18n-arkitektur, hur ett språk läggs till, 42 språkversioner                                           |
| `UNINSTALL.md`              | Steg för fullständig avinstallation                                                                    |
| `PROVIDER_REFERENCE.md`     | **Automatiskt genererad** katalog över 355 leverantörer (regenerera: `npm run gen:provider-reference`) |

### Fördjupningar om delsystem

| Dokument                                      | Syfte                                                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `MCP-SERVER.md`                               | MCP-server: 110 verktyg, 3 transporter, 33 omfång, REST-slutpunkter                        |
| `A2A-SERVER.md`                               | A2A v0.3: JSON-RPC, 6 färdigheter, REST-hjälpfunktioner, agentkort                         |
| `AGENT_PROTOCOLS_GUIDE.md`                    | Samlad guide: A2A kontra ACP kontra molnagenter                                            |
| `CLOUD_AGENT.md`                              | Orkestrering av Codex Cloud / Devin / Jules                                                |
| `SKILLS.md`                                   | Ramverk för färdigheter (inbyggda + marknadsplats + SkillsSH + sandlåda)                   |
| `RADAR.md`                                    | Radar-överlägg för katalogen över kostnadsfria modeller (`RADAR_ENABLED`, av som standard) |
| `MEMORY.md`                                   | Minnessystem (SQLite FTS5 + Qdrant)                                                        |
| `EVALS.md`                                    | Ramverk för utvärderingar (sviter, körningar, bedömningsmatriser)                          |
| `GUARDRAILS.md`                               | Maskering av personuppgifter, promptinjektion, brygga för bildanalys                       |
| `COMPLIANCE.md`                               | Granskningslogg, lagringstid, avanmälan via noLog                                          |
| `WEBHOOKS.md`                                 | HMAC-signerad webhook-leverans                                                             |
| `REASONING_REPLAY.md`                         | Hybrid minnes-/SQLite-cache för `reasoning_content`                                        |
| `AUTHZ_GUIDE.md`                              | Auktoriseringspipeline (`classify` → `policies` → `enforce`)                               |
| `RESILIENCE_GUIDE.md`                         | Kretsbrytare + nedkylning + modellspärr                                                    |
| `docs/security/STEALTH_GUIDE.md` (endast git) | TLS-fingeravtryck (JA3/JA4), Claude Code CCH, MITM-certifikat                              |
| `AUTO-COMBO.md`                               | Auto Combo-motor (poängsättning med 16 faktorer, 6 lägespaket, virtuell fabrik)            |

### Komprimering

| Dokument                        | Syfte                                       |
| ------------------------------- | ------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Översikt över komprimeringslägen + färdplan |
| `COMPRESSION_ENGINES.md`        | Caveman- och RTK-motorer, registerkontrakt  |
| `COMPRESSION_RULES_FORMAT.md`   | JSON-schema för Caveman-regelpaket          |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inventering av regelpaket per språk         |
| `RTK_COMPRESSION.md`            | Deklarativ RTK-pipeline (49 filter)         |

### Driftsättning

| Dokument                     | Syfte                                                              |
| ---------------------------- | ------------------------------------------------------------------ |
| `DOCKER_GUIDE.md`            | Docker-bygge, profiler (base/cli/host/cliproxyapi), Redis-sidovagn |
| `VM_DEPLOYMENT_GUIDE.md`     | Generisk VM-/VPS-driftsättning (Ubuntu/Debian + nginx + systemd)   |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io-driftsättning (för närvarande endast på kinesiska)          |
| `TERMUX_GUIDE.md`            | Android utan grafiskt gränssnitt via Termux                        |
| `PWA_GUIDE.md`               | Installation av progressiv webbapp + service worker                |
| `ELECTRON_GUIDE.md`          | Bygg + signera + distribuera skrivbordsappen                       |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                             |
| `PROXY_GUIDE.md`             | Utgående proxy i 4 nivåer + marknadsplatsen 1proxy                 |

### Underkataloger

| Underkatalog          | Syfte                                                                                                                                                                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokaliserade dokumentationsöversättningar (41 språkversioner)                                                                                                                                                        |
| `docs/screenshots/`   | Bildresurser för guider                                                                                                                                                                                              |
| `_tasks/superpowers/` | Planer/specifikationer från superpowers (`writing-plans`/`brainstorming`) + forskning — isolerat repo med separat versionshantering, ignorerat av Git i huvudträdet. Se CLAUDE.md → "Planning & Research Artifacts". |

---

## `tests/` — Testsviter

| Underkatalog                         | Typ                                       | Testkörare                                |
| ------------------------------------ | ----------------------------------------- | ----------------------------------------- |
| `tests/unit/`                        | Enhetstester (~4 800 filer, snabbast)     | Nodes inbyggda testkörare                 |
| `tests/integration/`                 | Integreringstester för flera moduler + DB | Nodes inbyggda testkörare (samtidighet 1) |
| `tests/e2e/`                         | E2E för användargränssnitt + arbetsflöde  | Playwright                                |
| `tests/e2e/protocol-clients.test.ts` | E2E med verkliga klienter för MCP + A2A   | Anpassade protokollklienter               |
| `tests/e2e/ecosystem.test.ts`        | Leverantörsintegrering (använder nätverk) | Nodes inbyggda testkörare                 |

---

## `public/` — Statiska resurser

| Sökväg              | Syfte                                                                  |
| ------------------- | ---------------------------------------------------------------------- |
| `public/` (rot)     | Favikoner, robots.txt, manifest, service worker, marknadsföringsbilder |
| `public/providers/` | Leverantörslogotyper i PNG/SVG-format (används i kontrollpanelen)      |

---

## `config/` — Statiska konfigurationer + status för kvalitetsgrindar

Levererade konfigurationsmallar samt incheckade baslinjer för kvalitetsgrindar
(flyttades hit från lagringsplatsens rot i v3.8.26 för att hålla roten avskalad).

| Sökväg                                        | Syfte                                                                                      |
| --------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `config/i18n.json`                            | Lista över språkversioner + metadata (kanonisk källa för antalet 42 språkversioner)        |
| `config/i18n-schema.json`                     | JSON-schema som validerar `i18n.json`                                                      |
| `config/payloadRules.json`                    | Regler för sanering av nyttolast från uppströmskällor                                      |
| `config/quality/quality-baseline.json`        | Ratchet-baslinje med flera mätvärden (`scripts/quality/check-quality-ratchet.mjs`)         |
| `config/quality/complexity-baseline.json`     | Låst baslinje för ESLint-komplexitet (`check-complexity.mjs`)                              |
| `config/quality/duplication-baseline.json`    | Låst baslinje för jscpd-duplicering (`check-duplication.mjs`)                              |
| `config/quality/file-size-baseline.json`      | Låst baslinje för storlek per fil (`check-file-size.mjs`)                                  |
| `config/quality/test-discovery-baseline.json` | Låst baslinje för fristående tester (`check-test-discovery.mjs`)                           |
| `config/quality/dependency-allowlist.json`    | Tillåtelselista över godkända beroenden (`check-deps.mjs`)                                 |
| `config/quality/.license-allowlist.json`      | Tillåtelselista över SPDX-licenser (`check-licenses.mjs`)                                  |
| `config/quality/quality-metrics.json`         | Tillfälligt insamlade mätvärden (genereras av `collect-metrics.mjs`; **ignoreras av git**) |

---

## `.github/` — GitHub-integration

| Sökväg                             | Syfte                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions-arbetsflöden för CI/CD (lintning, test, täckning, release) |
| `.github/ISSUE_TEMPLATE/`          | Ärendemallar för buggar/funktioner                                        |
| `.github/pull_request_template.md` | PR-mall                                                                   |
| `.github/dependabot.yml`           | Konfiguration för beroendeuppdateringar                                   |

---

## `.husky/` — Git-hooks

| Fil          | Syfte                                                                           |
| ------------ | ------------------------------------------------------------------------------- |
| `pre-commit` | Kör `lint-staged + check-docs-sync + check:any-budget:t11`                      |
| `pre-push`   | För närvarande inaktiverad (bortkommenterad). Kör `npm run test:unit` manuellt. |
| `_/`         | Huskys internfiler                                                              |

---

## `.claude/` — Snedstreckskommandon för Claude Code

| Fil                                                 | Syfte                                                            |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — uppdatera version + automatisk ändringslogg |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — fullständigt releasearbetsflöde         |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Driftsätt till VPS                                               |
| `commands/capture-release-evidences-cc.md`          | Webbläsarspela in nya funktioner som WebP                        |
| `commands/review-{prs,discussions}-cc.md`           | Triagera GitHub-PR:er/diskussioner                               |
| `commands/{review-issues,implement-features}-cc.md` | Arbetsflöden för ärenden                                         |
| `settings.local.json`                               | Projektspecifika inställningar för Claude Code                   |

---

## `.agents/` — Generiska agentarbetsflöden (Codex/Cursor/etc.)

| Sökväg                   | Syfte                                                         |
| ------------------------ | ------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 arbetsflödesdefinitioner (spegling av `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 färdighetsdefinitioner med Codex-körningsanteckningar       |

> **Obs!** Arbetsflöden och kommandon är för närvarande identiska byte för byte. Om `.agents/` är avsedd för en annan agentkörmiljö (Codex) behöver varianterna skilja sig åt på ett meningsfullt sätt.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Utanför trädet

Dessa kataloger med understrecksprefix innehåller material som inte distribueras:

- **`_ideia/`** — designanteckningar (kategorierna defer/notfit/viable)
- **`_mono_repo/`** — historiska delprojekt (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — skrivskyddade kloner av relaterade OSS-projekt (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api osv.) för korsreferenser under utvecklingen
- **`_tasks/`** — informella filer för uppgiftsspårning per release

Ingår inte i utdata från `npm pack`. Se `.npmignore`.

---

## Genererat / ignorerat av Git

| Sökväg                 | Syfte                              |
| ---------------------- | ---------------------------------- |
| `node_modules/`        | npm-beroenden                      |
| `.next/`               | Byggutdata från Next.js            |
| `coverage/`            | Täckningsrapporter från c8         |
| `logs/`                | Körningsloggar                     |
| `package/`             | Förberedelseområde för npm pack    |
| `.playwright-mcp/`     | Testartefakter från Playwright MCP |
| `.issues/`             | Lokal ärendecache                  |
| `tsconfig.tsbuildinfo` | Inkrementell cache för TS          |

---

## Navigeringstips

- **Ny bidragsgivare?** Läs `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Lägger du till en leverantör?** Följ `docs/architecture/ARCHITECTURE.md § Adding a New Provider` och dubbelkolla mot `docs/reference/PROVIDER_REFERENCE.md`.
- **Lägger du till en rutt?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **Lägger du till ett MCP-verktyg?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Lägger du till en A2A-färdighet?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Kör du lokalt?** `docs/guides/SETUP_GUIDE.md`.
- **Driftsätter du?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Publicerar du en ny version?** `docs/ops/RELEASE_CHECKLIST.md` (och Claude Code-färdigheten `/generate-release-cc`).
