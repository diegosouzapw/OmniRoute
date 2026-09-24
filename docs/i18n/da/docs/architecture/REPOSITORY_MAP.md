# Repository Map (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Beskrivelse på én linje af hver mappe og fil i roden.**
> Senest opdateret: 2026-06-28 — OmniRoute v3.8.40
>
> Brug dette kort til hurtigt at navigere i kodebasen. Følg links til dedikeret dokumentation for at gå i dybden.

## Træ på øverste niveau

```
OmniRoute/
├── src/                  # Next.js 16-applikation (brugergrænseflade + API-ruter + biblioteker + domæne + server)
├── open-sse/             # Arbejdsområde til streamingmotoren (håndteringsfunktioner, eksekveringsfunktioner, oversætter, MCP-server)
├── electron/             # Skrivebordsindpakning (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI-indgangspunkt og kommandohåndteringsfunktioner
├── scripts/              # Scripts til bygning, kontrol, synkronisering og enkeltstående opgaver
├── docs/                 # Offentlig dokumentation (du er her)
├── tests/                # Alle testsuiter (enheds-, integrations- og e2e-tests samt protokolklienter)
├── public/               # Statiske Next.js-aktiver, PWA-manifest, service worker, ikoner
├── config/               # Statisk konfiguration + kvalitetstærsklens tilstand (i18n, payloadRules, quality/)
├── images/               # Billedaktiver til markedsføring/README
├── @omniroute/           # Ledsagende pakker, der kan udgives (opencode-plugin, opencode-provider)
├── skills/               # Færdighedspakker til CLI/agenter (cli-* + omni-* + config-codex-cli)
├── examples/             # Eksempelplugins + omniroute-cmd-hello-startskabelon
├── contrib/              # Bidrag fra fællesskabet (podman/)
├── .source/              # Fumadocs-kildekonfiguration (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions-arbejdsgange + issueskabeloner + PR-skabelon
├── .husky/               # Git-hooks (pre-commit, pre-push)
├── .claude/              # Claude Code-skråstregskommandoer (projektspecifikke)
├── .agents/              # Arbejdsgange + færdigheder til Codex/generiske agenter (spejling af .claude/)
├── .vscode/              # Indstillinger for VS Code-arbejdsområdet
├── _ideia/               # Planlægningsnoter (uformelle; leveres ikke)
├── _mono_repo/           # Historiske underprojekter (cloud, site, vscode-extension)
├── _references/          # Skrivebeskyttede referencekloner fra relaterede OSS-projekter
├── _tasks/               # Filer til opgavesporing for hver udgivelse (uformelle)
├── .build/ .worktrees/ dist/   # Lokalt kladdeområde til builds/git-worktrees/buildoutput (ignoreres af Git)
├── .issues/              # Lokal issuecache (ignoreres af Git)
├── .playwright-mcp/      # Playwright MCP-testartefakter
├── coverage/             # c8-dækningsoutput (ignoreres af Git)
├── logs/                 # Kørselslogfiler (ignoreres af Git)
├── node_modules/         # Afhængigheder (ignoreres af Git)
├── package/              # Midlertidigt område til npm pack (buildartefakt)
├── .next/                # Next.js-buildoutput (ignoreres af Git)
└── (filer i roden — se nedenfor)
```

---

## Filer i roden

| Fil                                         | Formål                                                                                                |
| ------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **README.md**                               | Marketinglandingsside + hurtigstart + funktionsmatrix (se også `llm.txt`)                             |
| **CHANGELOG.md**                            | Ændringslog pr. udgivelse (automatisk genereret af `/version-bump-cc`-færdigheden)                    |
| **LICENSE**                                 | MIT-licenstekst                                                                                       |
| **CLAUDE.md**                               | Projektregler for Claude Code-agenter (ufravigelige regler, konventioner, scenarier)                  |
| **AGENTS.md**                               | Samme som CLAUDE.md, men for AI-agenter, der ikke er Claude (Codex, Cursor osv.)                      |
| **GEMINI.md**                               | Kortfattede regler for Gemini-baserede agenter (delmængde af CLAUDE.md)                               |
| **CONTRIBUTING.md**                         | Bidragydervejledning: opsætning, konventionelle commits, test, PR-flow                                |
| **SECURITY.md**                             | Politik for rapportering af sårbarheder, understøttede versioner, trusselsmodel                       |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — forventninger til adfærd i fællesskabet                                        |
| **llm.txt**                                 | Landingsside i ren tekst optimeret til LLM-crawlere (SEO for AI-assistenter)                          |
| **package.json**                            | npm-manifest, scripts, afhængigheder, engines, c8-dækningsgrænse                                      |
| **package-lock.json**                       | Låst afhængighedstræ                                                                                  |
| **tsconfig.json**                           | TypeScript-rodkonfiguration                                                                           |
| **tsconfig.typecheck-core.json**            | Typekontrolkonfiguration for kernen i `src/`                                                          |
| **tsconfig.typecheck-noimplicit-core.json** | Streng typekontrol (`noImplicitAny`)                                                                  |
| **tsconfig.tsbuildinfo**                    | TS-cache til inkrementel kompilering (ignoreret af Git)                                               |
| **next.config.mjs**                         | Next.js 16-kompileringskonfiguration (selvstændigt output)                                            |
| **next-env.d.ts**                           | Automatisk genererede miljøtyper fra Next.js                                                          |
| **eslint.config.mjs**                       | Flad ESLint-konfiguration (regler pr. projektområde)                                                  |
| **prettier.config.mjs**                     | Prettier-formateringsregler                                                                           |
| **postcss.config.mjs**                      | PostCSS-konfiguration for Tailwind/CSS-pipelinen                                                      |
| **playwright.config.ts**                    | Konfiguration af Playwright-E2E-tests                                                                 |
| **vitest.config.ts**                        | Vitest-konfiguration (standardtestsuite)                                                              |
| **vitest.mcp.config.ts**                    | Vitest-konfiguration for MCP-server-/autoCombo-/cache-testsuiter                                      |
| **sonar-project.properties**                | SonarQube/SonarCloud-konfiguration (kodekvalitet)                                                     |
| **Dockerfile**                              | Docker-build i flere trin (builder → runner-base → runner-cli)                                        |
| **docker-compose.yml**                      | Udviklings-compose med 4 profiler (base, cli, host, cliproxyapi) + redis-sidecar                      |
| **docker-compose.prod.yml**                 | Produktions-compose (port 20130, redis, navngivne diskenheder)                                        |
| **.dockerignore**                           | Filer, der er udelukket fra Docker-konteksten                                                         |
| **fly.toml**                                | Fly.io-implementeringskonfiguration (region `sin`, port 20128, /data-diskenhed)                       |
| **.env.example**                            | Skabelon til miljøfil (kopieres automatisk til `.env` ved første installation)                        |
| **.gitignore**                              | Git-ignoreringsmønstre                                                                                |
| **.npmignore**                              | Ekskluderingsliste for npm-udgivelse                                                                  |
| **.npmrc**                                  | npm-konfiguration (registreringsdatabase, lockfile-politik)                                           |
| **.node-version**                           | Fastlåst Node-version (bruges af nvm-kompatible værktøjer)                                            |
| **.nvmrc**                                  | Fastlåst Node-version til nvm                                                                         |
| **eslint.complexity.config.mjs**            | ESLint-konfiguration til kompleksitetsskralden (`scripts/check/check-complexity.mjs --config`)        |
| **eslint.sonarjs.config.mjs**               | ESLint-konfiguration til SonarJS-regler (kognitiv kompleksitet/duplikering)                           |
| **source.config.ts**                        | Fumadocs-`defineDocs`-kildekonfiguration (leverer data til `.source/`)                                |
| **knip.json**                               | Knip-konfiguration — ubrugte filer/eksporter/afhængigheder (leverer data til kontrollen for død kode) |
| **stryker.conf.json**                       | Konfiguration til Stryker-mutationstest                                                               |
| **.size-limit.json**                        | Konfiguration af størrelsesbudget for size-limit                                                      |
| **promptfooconfig.yaml**                    | promptfoo-evalueringskonfiguration                                                                    |
| **.gitleaks.toml**                          | gitleaks-regelsæt til scanning efter hemmeligheder                                                    |
| **.zizmor.yml**                             | zizmor-konfiguration til sikkerhedslinting af GitHub Actions                                          |
| **socket.yml**                              | Socket.dev-konfiguration til forsyningskæden                                                          |
| **news.json**                               | Lokaliseret v2-meddelelsesfeed; Radar-lanceringselementet leveres inaktivt                            |
| **flake.nix** / **flake.lock**              | Definition af Nix-udviklingsskal + lås                                                                |
| **.env**                                    | Lokale hemmeligheder (ignoreret af Git — genereret fra `.env.example`)                                |

> **Flyttet ud af roden i v3.8.26 (oprydning):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` og den genererede `quality-metrics.json` (ignoreret af git). Se [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js-applikation

```
src/
├── app/                 # App Router (sider + API-ruter + statussider + landingsside)
├── lib/                 # Kernebiblioteker/domænemoduler (80 undermapper + ~70 filer på øverste niveau)
├── domain/              # Ren domænelogik (politikmotor, fallback, omkostninger, låsning, comboResolver, vurdering)
├── server/              # Moduler udelukkende til serveren (autorisationspipeline, CORS, godkendelsesmiddleware) — kan ikke importeres fra klienten
├── shared/              # Delt mellem server og klient, hvor det er sikkert (konstanter, typer, validering, kontrakter, hjælpefunktioner)
├── i18n/                # next-intl-konfiguration + JSON-meddelelser pr. landestandard (42 landestandarder)
├── middleware/          # Next.js-middleware (berigelse af forespørgsler, registrering af landestandard)
├── mitm/                # Kerne til MITM-proxy: generering/installation af certifikater, handlere, mål, inspektør, masker, passthrough
│   ├── handlers/        # 9 handlerklasser til IDE-agenter, der udvider MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Lag til opsamling af trafik: buffer (ringbuffer i hukommelsen), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Adapterkobling til modeller (ældre kompatibilitetslag)
├── scripts/             # Vedligeholdelsesscripts i projekttræet (f.eks. backfillAggregation)
├── sse/                 # Ældre SSE-handlere/-tjenester (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Ældre lager i hukommelsen (udfases til fordel for src/lib/db)
├── types/               # Delte TS-typefiler
├── instrumentation.ts   # Next.js-telemetrihook (browser + edge)
├── instrumentation-node.ts  # Instrumentering udelukkende til Node
└── proxy.ts             # Indgangskompatibilitetslag til HTTP-proxy
```

### `src/app/` — App Router (Next.js 16)

| Sti                                                                          | Formål                                                                                                                                                                                                                                                                                                                  |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Offentlig OpenAI-kompatibel API (~25 underruter: chat, fuldførelser, embeddings, filer, batches, lyd, billeder, videoer, musik, rerangering, moderering, søgning, ws, agenter, konti, udbydere osv.)                                                                                                                    |
| `app/api/v1beta/`                                                            | API-endepunkter i Gemini-stil                                                                                                                                                                                                                                                                                           |
| `app/api/playground/`                                                        | Playground Studio-ruter: `improve-prompt/` (POST — LLM-promptomskriver), `presets/` (GET-liste / POST-oprettelse), `presets/[id]/` (GET / PUT / DELETE) — se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                     |
| `app/api/` (ikke-v1)                                                         | Administrationsruter (~60 mapper: udbydere, kombinationer, indstillinger, mcp, a2a, evalueringer, hukommelse, færdigheder, webhooks, compliance, robusthed, overvågning, tunneler, cli-værktøjer osv.)                                                                                                                  |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST-API — 12 ruter (serverstyring, agenttilstand/DNS/tilknytninger, omgåelse, certifikat, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST- + WS-API — 16+ ruter (anmodninger, sessioner, værter, registreringstilstande, eksport, ws). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                           |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0-indgangspunkt (`POST /a2a`)                                                                                                                                                                                                                                                                            |
| `app/.well-known/agent.json/`                                                | A2A-agentkort (registrering)                                                                                                                                                                                                                                                                                            |
| `app/(dashboard)/dashboard/`                                                 | Dashboard-UI-sider (50+ sektioner, ~118 page.tsx-filer: udbydere, kombinationer, indstillinger, hukommelse, færdigheder, webhooks, evalueringer, revision, batch, cache, omkostninger, tilstand, system, aktivitet osv.)                                                                                                |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio-UI (3 faner: Søgning/Scraping/Sammenligning + SearchConceptCard + ProviderCatalog) — se `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                    |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (skal med 3 faner), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge-dashboardside — serverkort, 9 agentkort, opsætningsguide, modeltilknytning, omgåelsesliste. i18n PT-BR + EN. Se `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                           |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector-dashboardside — DevTools-opdeling, 7 detaljefaner, 4 skift til registreringstilstande, sessionsoptager, kontekstfarvelægning. i18n PT-BR + EN. Se `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                             |
| `app/(dashboard)/dashboard/activity/`                                        | Aktivitetsfeedside (gruppe B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — se `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                  |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Kvote-delingsside (gruppe B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                               |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Konfigurationsside til udbyderplaner (gruppe B): `page.tsx` + `ProviderPlanConfigClient.tsx` — tilsidesættelse af kvotedimensioner pr. forbindelse                                                                                                                                                                      |
| `app/docs/`                                                                  | Indlejret dokumentationsfremviser (renderer `docs/*.md`)                                                                                                                                                                                                                                                                |
| `app/landing/`                                                               | Marketinglandingsside                                                                                                                                                                                                                                                                                                   |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Godkendelsesrelaterede sider                                                                                                                                                                                                                                                                                            |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP-fejlsider                                                                                                                                                                                                                                                                                                          |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statiske sider/statussider                                                                                                                                                                                                                                                                                              |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Rodlayout, startside, PWA-manifest, global CSS                                                                                                                                                                                                                                                                          |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Fejlgrænser                                                                                                                                                                                                                                                                                                             |

### `src/lib/` — Kernebiblioteker (~50 moduler)

| Modul                                    | Formål                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A-protokollens opgavestyring, færdigheder (5), streaming                                                                                                                                                                                                                                                                |
| `acp/`                                   | CLI-agentregister (lokal CLI-registrering — se `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                |
| `api/`                                   | Delte API-hjælpefunktioner (`requireManagementAuth`, validering)                                                                                                                                                                                                                                                          |
| `auth/`                                  | Session, hashing af adgangskoder, tokenvalidering                                                                                                                                                                                                                                                                         |
| `batches/`                               | Handlers til OpenAI Batches API                                                                                                                                                                                                                                                                                           |
| `catalog/`                               | Zod-validering af udbyderkatalog + afklaring af funktionalitet                                                                                                                                                                                                                                                            |
| `cloudAgent/`                            | Cloud Agents (Codex Cloud, Devin, Jules) — se `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                            |
| `combos/`                                | Afklaring af kombinationer + hjælpefunktioner til omarrangering                                                                                                                                                                                                                                                           |
| `audit/`                                 | Hjælpefunktioner til aktivitetsfeed: `highLevelActions.ts` (tilladelsesliste + `isHighLevelAction()`), `activityIcons.ts` (handling → ikon/verbum-tilknytning), `timeline.ts` (groupByDay/relativeTime) — se `docs/architecture/MONITORING_SECTIONS.md`                                                                   |
| `compliance/`                            | Revisionslog + udbyderrevision — se `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                         |
| `compression/`                           | Integrationslag til komprimeringsmotoren (motorer findes i `open-sse/services/compression/`)                                                                                                                                                                                                                              |
| `config/`                                | Hjælpefunktioner til runtime-konfiguration                                                                                                                                                                                                                                                                                |
| `db/`                                    | Mere end 120 domænespecifikke DB-moduler + 168 migreringer (gå altid gennem disse for SQLite)                                                                                                                                                                                                                             |
| `quota/`                                 | Motor til kvotedeling: `dimensions.ts` (typer/Zod), `types.ts` (QuotaStore-grænseflade), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — se `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Klient til Radars katalog over gratis modeller: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — se `docs/frameworks/RADAR.md`                                                                                                                                |
| `display/`                               | Hjælpefunktioner til UI-formatering (omkostninger, ventetid osv.)                                                                                                                                                                                                                                                         |
| `embeddings/`                            | Hjælpefunktioner til embedding-tjenesten                                                                                                                                                                                                                                                                                  |
| `env/`                                   | Parsing og validering af miljøvariabler                                                                                                                                                                                                                                                                                   |
| `evals/`                                 | Evalueringsframework (suiter, runner, runtime) — se `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                            |
| `guardrails/`                            | Maskering af personhenførbare oplysninger, prompt-injektion, vision-bro — se `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                |
| `jobs/`                                  | Baggrundsjob (cron-lignende)                                                                                                                                                                                                                                                                                              |
| `memory/`                                | Samtalehukommelse (SQLite FTS5 + sqlite-vec hybrid-RRF + Qdrant-niveau 2) — se `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                |
| `memory/embedding/`                      | Embedding-lag med flere kilder: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                           |
| `memory/vectorStore.ts`                  | Wrapper til sqlite-vec v0.1.9 — KNN-brute-force + hybrid-RRF (FTS5 + vektor, k=60). Initialiseres ved behov og degraderer kontrolleret, når sqlite-vec ikke er tilgængelig. (plan 21)                                                                                                                                     |
| `memory/reindex.ts`                      | `runReindexBatch()` — behandler hukommelser med `needs_reindex=1` i baggrunden; kaldes af `POST /api/memory/reindex` og stien til lazy-backfill. (plan 21)                                                                                                                                                                |
| `monitoring/`                            | Sundhedstjek, udsendelse af målinger                                                                                                                                                                                                                                                                                      |
| `oauth/`                                 | OAuth-/importflows for 22 udbydermoduler (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                      |
| `plugins/`                               | Pluginregister                                                                                                                                                                                                                                                                                                            |
| `promptCache/`                           | Cachebrydepunkter til prompts i Anthropic-stil                                                                                                                                                                                                                                                                            |
| `skills/`                                | Framework til færdigheder (indbyggede + markedsplads + SkillsSH) — se `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                         |
| `playground/`                            | Delte hjælpefunktioner til Playground Studio: `codeExport.ts` (curl-/Python-/TS-generator), `promptImprover.ts` (meta-prompt-builder), `streamMetrics.ts` (ren TTFT/TPS), `types.ts` (pristabel) — se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                              |
| `webhookDispatcher.ts`                   | HMAC-webhooklevering — se `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                   |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tunneladministratorer — se `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                    |
| `cloudSync.ts`, `initCloudSync.ts`       | Valgfri cloud-synkronisering af tilstand                                                                                                                                                                                                                                                                                  |
| `localDb.ts`                             | Geneksportmodul for DB-moduler (ingen logik — kun geneksport)                                                                                                                                                                                                                                                             |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Caching af anmodninger + idempotens                                                                                                                                                                                                                                                                                       |
| (~30 yderligere filer på topniveau)      | Specialiserede hjælpefunktioner (logEnv, modelsDevSync, piiSanitizer osv.)                                                                                                                                                                                                                                                |

### `src/lib/db/` — Database (122 moduler + 168 migreringer)

| Undermappe                | Formål                                                                                                                                                                             |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()`-singleton med WAL-journalføring                                                                                                                                  |
| `db/migrations/`          | Versionsstyrede SQL-filer (idempotente, transaktionelle). `073_memory_vec.sql` tilføjer `memory_vec_meta` + kolonnen `needs_reindex` (plan 21).                                    |
| `db/playgroundPresets.ts` | CRUD-modul til Playground Studio-forudindstillinger (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD til `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` osv. (plan 21)                         |
| `db/<domain>.ts`          | Ét modul pr. domæne: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache osv.            |

### `src/domain/`

| Modul                  | Formål                                         |
| ---------------------- | ---------------------------------------------- |
| `policy.ts`            | Politikmotor                                   |
| `fallbackPolicy.ts`    | Beslutningstræ for fallback                    |
| `costRules.ts`         | Regler for omkostningsberegning                |
| `lockoutPolicy.ts`     | Politik for spærring af modeller/forbindelser  |
| `tagRouter.ts`         | Tagbaseret routing                             |
| `comboResolver.ts`     | Combo-opløsning (anvendes af combo-motoren)    |
| `modelAvailability.ts` | Tilgængelighedskontrol pr. model               |
| `assessment/`          | Modelvurdering (fase 1 af RFC-AUTO-ASSESSMENT) |

### `src/server/`

| Modul    | Formål                                                                                             |
| -------- | -------------------------------------------------------------------------------------------------- |
| `authz/` | Autorisationspipeline: `classify` → `policies` → `enforce` — se `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS-konfiguration                                                                                 |
| `auth/`  | Sessionsmiddleware                                                                                 |

### `src/shared/`

| Modul                            | Formål                                                                             |
| -------------------------------- | ---------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 udbydere** med Zod-validering (autoritativ kilde)                            |
| `constants/cliTools.ts`          | Register over eksterne CLI-værktøjer                                               |
| `constants/routingStrategies.ts` | **19 routingstrategier** med prioriteter                                           |
| `constants/publicApiRoutes.ts`   | Ruter, der kræver Bearer-godkendelse (i modsætning til administrationsgodkendelse) |
| `constants/upstreamHeaders.ts`   | Afvisningsliste over headere til upstream-anmodninger                              |
| `validation/schemas.ts`          | ~80 Zod-skemaer (enkelt autoritativ kilde til API-kontrakter)                      |
| `validation/helpers.ts`          | Hjælpefunktioner til Zod-validering (`validateBody` osv.)                          |
| `types/`                         | Delte TS-typer                                                                     |
| `contracts/`                     | Offentlige API-kontrakter (anvendes af `files:` i `package.json`)                  |
| `utils/circuitBreaker.ts`        | Circuit breaker til udbydere (se `docs/architecture/RESILIENCE_GUIDE.md`)          |
| `utils/apiAuth.ts`               | Validering af API-nøgler og kontrol af scopes                                      |
| `utils/fetchTimeout.ts`          | Timeout-/afbrydelseswrappere til upstream-fetch                                    |
| `utils/releaseNotes.ts`          | Parser til lukkede v2-/legacy-meddelelser, lokalisering og afvisning via ID        |

---

## `open-sse/` — Arbejdsområde til streamingmotor

Separat npm-arbejdsområde (`@omniroute/open-sse`). Håndterer behandling af anmodninger og udførelse hos udbydere.

```
open-sse/
├── handlers/            # 16 filer (12 handlere + 4 hjælpefunktioner): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search osv.
├── executors/           # 67 udbyderspecifikke eksekveringskomponenter (udvider BaseExecutor)
├── translator/          # Formatkonvertere (9 til anmodninger, 9 til svar, 9 hjælpefunktioner)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ tjenestemoduler (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM osv.)
├── mcp-server/          # MCP-server (110 værktøjer, 3 transporter, 33 scopes)
├── config/              # Udbyder-/modelregistre, headerkonfiguration, modelaliasser
├── utils/               # TLS-klient, proxy-fetch/dispatcher, netværkshjælpefunktioner
├── index.ts             # Indgangspunkt for arbejdsområdet
├── package.json         # Arbejdsområdets manifest
├── tsconfig.json        # Arbejdsområdets TS-konfiguration
└── types.d.ts           # Arbejdsområdets typedeklarationer
```

### `open-sse/mcp-server/`

| Sti                         | Formål                                                                           |
| --------------------------- | -------------------------------------------------------------------------------- |
| `server.ts`                 | MCP-serverens livscyklus (stdio- og HTTP-transporter)                            |
| `httpTransport.ts`          | HTTP Streamable- og SSE-transporter (`/api/mcp/sse`, `/api/mcp/stream`)          |
| `audit.ts`                  | Revisionslogning til tabellen `mcp_tool_audit`                                   |
| `scopeEnforcement.ts`       | Scopevalidering pr. værktøj                                                      |
| `runtimeHeartbeat.ts`       | Sundheds-heartbeat til `DATA_DIR/runtime/mcp-heartbeat.json`                     |
| `descriptionCompressor.ts`  | Komprimerer metadata for værktøjsbeskrivelser for at spare kontekst              |
| `schemas/tools.ts`          | 36 grundlæggende værktøjsdefinitioner + scopes                                   |
| `tools/advancedTools.ts`    | Avancerede værktøjsimplementeringer                                              |
| `tools/memoryTools.ts`      | 3 hukommelsesværktøjer (søg/tilføj/ryd)                                          |
| `tools/skillTools.ts`       | 4 færdighedsværktøjer (vis/aktivér/udfør/kørsler)                                |
| `tools/compressionTools.ts` | 5 komprimeringsværktøjer                                                         |
| `README.md`                 | Intern README til MCP-serveren (krydslinket fra `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Desktop-wrapper

| Fil              | Formål                                                                                               |
| ---------------- | ---------------------------------------------------------------------------------------------------- |
| `main.js`        | Electrons hovedproces (BrowserWindow, integreret Next.js-server, systembakke, automatisk opdatering) |
| `preload.js`     | IPC-bro (contextBridge → `window.omniroute`)                                                         |
| `package.json`   | electron-builder-konfiguration + Electron 41 + electron-builder 26.10-afhængigheder                  |
| `assets/`        | Appikoner (Windows .ico, macOS .icns, Linux .png)                                                    |
| `dist-electron/` | Build-output (ignoreret af git)                                                                      |
| `types.d.ts`     | Typedeklarationer til renderer-broen                                                                 |
| `README.md`      | Intern README til Electron (se også `docs/guides/ELECTRON_GUIDE.md`)                                 |

---

## `bin/` — CLI

| Fil                                                                                                         | Formål                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute.mjs`                                                                                             | Primært CLI-indgangspunkt — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` osv. |
| `reset-password.mjs`                                                                                        | Selvstændig CLI til nulstilling af adgangskode                                                                                       |
| `cli/commands/setup.mjs`                                                                                    | Interaktiv og ikke-interaktiv opsætningsguide                                                                                        |
| `cli/commands/doctor.mjs`                                                                                   | Diagnosticering af systemtilstand (8+ kontroller)                                                                                    |
| `cli/commands/providers.mjs`                                                                                | Visning, test og validering af udbydere                                                                                              |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI-hjælpemoduler                                                                                                                    |
| `cli/tray/tray.ts`                                                                                          | Integration med systembakken (på tværs af platforme: NotifyIcon på Windows, systray2 på macOS/Linux)                                 |
| `cli/tray/tray.ps1`                                                                                         | PowerShell-NotifyIcon-backend (Windows, ingen nye binære filer)                                                                      |
| `cli/tray/autostart.ts`                                                                                     | Automatisk opstart på tværs af platforme (LaunchAgent / .desktop / registreringsdatabase)                                            |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-trins løsningskæde for SQLite-driver (medfølgende → runtime → behovsinstallation → node:sqlite → sql.js)                           |
| `cli/runtime/magicBytes.mjs`                                                                                | Validering af binære magic bytes (ELF / Mach-O / Mach-O fat / PE)                                                                    |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — forhåndsopløser drivere ved postinstall / første opstart                                                        |
| `nodeRuntimeSupport.mjs`                                                                                    | Validerer den understøttede Node.js-version ved installation                                                                         |

---

## `skills/` — Offentlige agentfærdigheder

| Fil                          | Formål                                                                                      |
| ---------------------------- | ------------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 færdighedsmanifestfiler til eksterne AI-agenter (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Build- og kontrolscripts

| Script                              | Formål                                                                                                      |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Udviklings-/startkørsel med indlæsning af miljøvariabler                                                    |
| `build-next-isolated.mjs`           | Selvstændigt build (Next.js 16 standalone)                                                                  |
| `prepublish.ts`                     | Klargøring af pakke før `npm pack`                                                                          |
| `postinstall.mjs`                   | Opret automatisk `.env` ud fra `.env.example` ved første installation                                       |
| `sync-env.mjs`                      | Synkroniser nøgler i `.env` igen med `.env.example`                                                         |
| `check-cycles.mjs`                  | Registrer cirkulære afhængigheder                                                                           |
| `check-route-validation.mjs`        | Kontrollér, at alle API-ruter har Zod-validering                                                            |
| `check-t11-any-budget.mjs`          | Håndhæv eksplicit budget for `any` pr. fil                                                                  |
| `check-docs-sync.mjs`               | Kontrollér synkronisering af dokumentationsversioner (eksisterende pre-commit)                              |
| **`check-env-doc-sync.mjs`**        | NYT: Krydstjek miljøvariabler i kode mod `.env.example` og `ENVIRONMENT.md`                                 |
| **`check-docs-counts-sync.mjs`**    | NYT: Kontrollér, at antal (eksekveringsenheder, strategier, OAuth, A2A-færdigheder) matcher dokumentationen |
| **`check-deprecated-versions.mjs`** | NYT: Markér forældede versioner/datoer i dokumentationen                                                    |
| `check-supported-node-runtime.ts`   | Kontrollér, at den aktuelle Node-version understøttes                                                       |
| `check-pr-test-policy.mjs`          | Håndhæv reglen om, at test er påkrævet ved ændringer af produktionskode                                     |
| **`gen-provider-reference.ts`**     | NYT: Generér automatisk `docs/reference/PROVIDER_REFERENCE.md` fra kataloget                                |
| `i18n/generate-multilang.mjs`       | Oversæt UI-strenge og dokumentation via Google Translate                                                    |
| `i18n_autotranslate.py`             | LLM-baseret pipeline til oversættelse af dokumentation                                                      |
| `validate_translation.py`           | Validering af oversættelser pr. landestandard                                                               |
| `check_translations.py`             | Kontrol af i18n-nøgler på kodesiden                                                                         |
| `run-playwright-tests.mjs`          | Playwright E2E-testkørsel                                                                                   |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E-testkørsel                                                                                      |
| `run-ecosystem-tests.mjs`           | Test af økosystemet (udbyderintegrationer)                                                                  |
| `test-report-summary.mjs`           | Generér Markdown-oversigt over testdækning                                                                  |
| `smoke-electron-packaged.mjs`       | Røgtest af pakket Electron-build                                                                            |
| `native-binary-compat.mjs`          | Kontrollér, at native afhængigheder (`better-sqlite3`) matcher Electrons Node                               |
| `validate-pack-artifact.ts`         | Kontrollér output fra `npm pack`                                                                            |
| `responses-ws-proxy.mjs`            | WebSocket-bro til Codex Responses API                                                                       |
| `v1-ws-bridge.mjs`                  | WebSocket-bro til slutpunktet `/api/v1/ws`                                                                  |
| `standalone-server-ws.mjs`          | Selvstændig WS-serverkørsel                                                                                 |
| `system-info.mjs`                   | Udskriv system-/runtimeoplysninger til support                                                              |
| `healthcheck.mjs`                   | Engangs-sundhedskontrol (bruges af Docker HEALTHCHECK)                                                      |
| `uninstall.mjs`                     | Script til ren afinstallation                                                                               |

---

## `docs/` — Offentlig dokumentation (7 rodfiler + 17 undermapper)

### Overordnede vejledninger

| Dokument                    | Formål                                                                                              |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Overordnet arkitektur, oversigt over undersystemer, dashboardets grænseflade                        |
| `CODEBASE_DOCUMENTATION.md` | Teknisk reference: mapper, moduler, konventioner                                                    |
| `FEATURES.md`               | Funktionsmatrix med højdepunkter i v3.8                                                             |
| `USER_GUIDE.md`             | Slutbrugermanual (opsætning, modeller, kombinationer, CLI'er, lyd osv.)                             |
| `API_REFERENCE.md`          | Reference til API-endpoints med godkendelsesmodel                                                   |
| `openapi.yaml`              | OpenAPI 3.0-specifikation (121 stier)                                                               |
| `SETUP_GUIDE.md`            | Installationsmetoder (npm, npx, Docker, Electron, Termux, kildekode)                                |
| `ENVIRONMENT.md`            | Alle miljøvariabler (~800 dokumenteret, ~3.050 linjer i `.env.example`)                             |
| `TROUBLESHOOTING.md`        | Almindelige fejl + kendte problemer i v3.8.0                                                        |
| `RELEASE_CHECKLIST.md`      | Komplet udgivelsesproces (færdigheder, husky, konventionelle commits, udrulning)                    |
| `COVERAGE_PLAN.md`          | Mål for testdækning og aktuel status                                                                |
| `FREE_TIERS.md`             | Udvalgte udbydere med gratis niveauer (48+ gratis + 11 OAuth)                                       |
| `CLI-TOOLS.md`              | Eksterne CLI-integrationer + intern OmniRoute-CLI                                                   |
| `I18N.md`                   | i18n-arkitektur, tilføjelse af et sprog, 42 lokaliteter                                             |
| `UNINSTALL.md`              | Trin til fuldstændig afinstallation                                                                 |
| `PROVIDER_REFERENCE.md`     | **Automatisk genereret** katalog over 355 udbydere (regenerering: `npm run gen:provider-reference`) |

### Dybdegående beskrivelser af undersystemer

| Dokument                                   | Formål                                                                                 |
| ------------------------------------------ | -------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                            | MCP-server: 110 værktøjer, 3 transporter, 33 scopes, REST-endpoints                    |
| `A2A-SERVER.md`                            | A2A v0.3: JSON-RPC, 6 færdigheder, REST-hjælpere, agentkort                            |
| `AGENT_PROTOCOLS_GUIDE.md`                 | Samlet vejledning: A2A kontra ACP kontra cloud-agenter                                 |
| `CLOUD_AGENT.md`                           | Orkestrering af Codex Cloud / Devin / Jules                                            |
| `SKILLS.md`                                | Rammeværk til færdigheder (indbygget + markedsplads + SkillsSH + sandbox)              |
| `RADAR.md`                                 | Radar-katalogoverlay til gratis modeller (`RADAR_ENABLED`, deaktiveret som standard)   |
| `MEMORY.md`                                | Hukommelsessystem (SQLite FTS5 + Qdrant)                                               |
| `EVALS.md`                                 | Evalueringsrammeværk (suiter, kørsler, bedømmelseskriterier)                           |
| `GUARDRAILS.md`                            | PII-maskering, prompt-injektion, vision-bro                                            |
| `COMPLIANCE.md`                            | Revisionslog, opbevaring, fravalg med noLog                                            |
| `WEBHOOKS.md`                              | HMAC-signeret webhook-levering                                                         |
| `REASONING_REPLAY.md`                      | Hybrid hukommelses-/SQLite-cache til `reasoning_content`                               |
| `AUTHZ_GUIDE.md`                           | Autorisationspipeline (`classify` → `policies` → `enforce`)                            |
| `RESILIENCE_GUIDE.md`                      | Kredsløbsafbryder + nedkøling + modellåsning                                           |
| `docs/security/STEALTH_GUIDE.md` (kun git) | TLS-fingeraftryk (JA3/JA4), Claude Code CCH, MITM-certifikat                           |
| `AUTO-COMBO.md`                            | Auto Combo-motor (vurdering baseret på 16 faktorer, 6 tilstandspakker, virtuel fabrik) |

### Komprimering

| Dokument                        | Formål                                          |
| ------------------------------- | ----------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Oversigt over komprimeringstilstande + køreplan |
| `COMPRESSION_ENGINES.md`        | Caveman- + RTK-motorer, registreringskontrakt   |
| `COMPRESSION_RULES_FORMAT.md`   | JSON-skema til Caveman-regelpakker              |
| `COMPRESSION_LANGUAGE_PACKS.md` | Oversigt over regelpakker pr. sprog             |
| `RTK_COMPRESSION.md`            | Deklarativ RTK-pipeline (49 filtre)             |

### Udrulning

| Dokument                     | Formål                                                            |
| ---------------------------- | ----------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker-build, profiler (base/cli/host/cliproxyapi), Redis-sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | Generisk VM/VPS-udrulning (Ubuntu/Debian + nginx + systemd)       |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io-udrulning (i øjeblikket kun på kinesisk)                   |
| `TERMUX_GUIDE.md`            | Headless Android via Termux                                       |
| `PWA_GUIDE.md`               | Installation af Progressive Web App + service worker              |
| `ELECTRON_GUIDE.md`          | Build, signering og distribution af desktopapp                    |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                            |
| `PROXY_GUIDE.md`             | Udgående proxy i 4 niveauer + 1proxy-markedsplads                 |

### Undermapper

| Undermappe            | Formål                                                                                                                                                                                                                     |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokaliserede dokumentationsoversættelser (41 sprogvarianter)                                                                                                                                                               |
| `docs/screenshots/`   | Billedressourcer til vejledninger                                                                                                                                                                                          |
| `_tasks/superpowers/` | Planer/specifikationer fra superpowers (`writing-plans`/`brainstorming`) + research — isoleret repository med separat versionsstyring, ignoreret af hovedtræets git. Se CLAUDE.md → "Planlægnings- og researchartefakter". |

---

## `tests/` — Testsuiter

| Undermappe                           | Type                                      | Testkører                                  |
| ------------------------------------ | ----------------------------------------- | ------------------------------------------ |
| `tests/unit/`                        | Enhedstests (~4.800 filer, hurtigst)      | Nodes indbyggede testkører                 |
| `tests/integration/`                 | Integrations­tests med flere moduler + DB | Nodes indbyggede testkører (samtidighed 1) |
| `tests/e2e/`                         | E2E for brugergrænseflade + arbejdsgange  | Playwright                                 |
| `tests/e2e/protocol-clients.test.ts` | E2E med rigtige MCP- + A2A-klienter       | Brugerdefinerede protokolklienter          |
| `tests/e2e/ecosystem.test.ts`        | Udbyderintegration (med netværksadgang)   | Nodes indbyggede testkører                 |

---

## `public/` — Statiske ressourcer

| Sti                 | Formål                                                            |
| ------------------- | ----------------------------------------------------------------- |
| `public/` (rod)     | Favicons, robots.txt, manifest, service worker, marketingbilleder |
| `public/providers/` | Udbyderlogoer i PNG/SVG-format (bruges i kontrolpanelet)          |

---

## `config/` — Statiske konfigurationer + tilstand for kvalitetskontroller

Leverede konfigurationsskabeloner samt de versionsstyrede basislinjer for kvalitetskontroller
(flyttet hertil fra repositoryets rod i v3.8.26 for at holde roden overskuelig).

| Sti                                           | Formål                                                                                   |
| --------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Liste over lokaliteter + metadata (kanonisk kilde til antallet på 42 lokaliteter)        |
| `config/i18n-schema.json`                     | JSON-skema, der validerer `i18n.json`                                                    |
| `config/payloadRules.json`                    | Regler for rensning af payloads fra upstream-kilder                                      |
| `config/quality/quality-baseline.json`        | Ratchet-basislinje med flere målepunkter (`scripts/quality/check-quality-ratchet.mjs`)   |
| `config/quality/complexity-baseline.json`     | Fastfrosset basislinje for ESLint-kompleksitet (`check-complexity.mjs`)                  |
| `config/quality/duplication-baseline.json`    | Fastfrosset basislinje for jscpd-duplikering (`check-duplication.mjs`)                   |
| `config/quality/file-size-baseline.json`      | Fastfrosset basislinje for filstørrelse pr. fil (`check-file-size.mjs`)                  |
| `config/quality/test-discovery-baseline.json` | Fastfrosset basislinje for forældreløse tests (`check-test-discovery.mjs`)               |
| `config/quality/dependency-allowlist.json`    | Liste over godkendte afhængigheder (`check-deps.mjs`)                                    |
| `config/quality/.license-allowlist.json`      | Liste over tilladte SPDX-licenser (`check-licenses.mjs`)                                 |
| `config/quality/quality-metrics.json`         | Midlertidigt indsamlede målepunkter (genereret af `collect-metrics.mjs`; **gitignored**) |

---

## `.github/` — GitHub-integration

| Sti                                | Formål                                                          |
| ---------------------------------- | --------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD-workflows (lint, test, dækning, udgivelse) |
| `.github/ISSUE_TEMPLATE/`          | Skabeloner til fejlrapporter og funktionsforslag                |
| `.github/pull_request_template.md` | PR-skabelon                                                     |
| `.github/dependabot.yml`           | Konfiguration af afhængighedsopdateringer                       |

---

## `.husky/` — Git-hooks

| Fil          | Formål                                                                     |
| ------------ | -------------------------------------------------------------------------- |
| `pre-commit` | Kører `lint-staged + check-docs-sync + check:any-budget:t11`               |
| `pre-push`   | Deaktiveret i øjeblikket (udkommenteret). Kør `npm run test:unit` manuelt. |
| `_/`         | Interne Husky-filer                                                        |

---

## `.claude/` — Slash-kommandoer til Claude Code

| Fil                                                 | Formål                                                        |
| --------------------------------------------------- | ------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — opdater version + automatisk ændringslog |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — komplet udgivelsesworkflow           |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Udrul til VPS                                                 |
| `commands/capture-release-evidences-cc.md`          | Optag nye funktioner i browseren som WebP                     |
| `commands/review-{prs,discussions}-cc.md`           | Triager GitHub-PR'er/-diskussioner                            |
| `commands/{review-issues,implement-features}-cc.md` | Workflows til issues                                          |
| `settings.local.json`                               | Projektspecifikke Claude Code-indstillinger                   |

---

## `.agents/` — Generiske agentworkflows (Codex / Cursor / osv.)

| Sti                      | Formål                                                    |
| ------------------------ | --------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 workflowdefinitioner (spejling af `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 færdighedsdefinitioner med Codex Execution Notes        |

> **Bemærk:** Workflows og kommandoer er i øjeblikket identiske byte for byte. Hvis `.agents/` er beregnet til et andet agent-runtime (Codex), skal varianterne adskille sig på en meningsfuld måde.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Uden for kildetræet

Disse mapper med understregningspræfiks indeholder materiale, der ikke distribueres:

- **`_ideia/`** — designnoter (kategorierne defer / notfit / viable)
- **`_mono_repo/`** — historiske delprojekter (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — skrivebeskyttede kloner af relaterede OSS-projekter (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api osv.) til krydsreference under udviklingen
- **`_tasks/`** — opgaveregistreringsfiler pr. udgivelse (uformelle)

Ikke inkluderet i outputtet fra `npm pack`. Se `.npmignore`.

---

## Genereret / ignoreret af Git

| Sti                    | Formål                             |
| ---------------------- | ---------------------------------- |
| `node_modules/`        | npm-afhængigheder                  |
| `.next/`               | Next.js-buildoutput                |
| `coverage/`            | c8-dækningsrapporter               |
| `logs/`                | Kørselslogfiler                    |
| `package/`             | Midlertidige filer til npm-pakning |
| `.playwright-mcp/`     | Playwright MCP-testartefakter      |
| `.issues/`             | Lokal issue-cache                  |
| `tsconfig.tsbuildinfo` | Inkrementel TS-cache               |

---

## Navigationstips

- **Ny bidragyder?** Læs `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Tilføjer du en provider?** Følg `docs/architecture/ARCHITECTURE.md § Adding a New Provider`, og sammenhold med `docs/reference/PROVIDER_REFERENCE.md`.
- **Tilføjer du en route?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **Tilføjer du et MCP-værktøj?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Tilføjer du en A2A-skill?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Kører du lokalt?** `docs/guides/SETUP_GUIDE.md`.
- **Udruller du?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Udgiver du en release?** `docs/ops/RELEASE_CHECKLIST.md` (og Claude Code-skillen `/generate-release-cc`).
