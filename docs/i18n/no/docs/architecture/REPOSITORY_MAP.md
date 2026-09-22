# Repository Map (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Énlinjes beskrivelse av hver mappe og fil i rotkatalogen.**
> Sist oppdatert: 2026-06-28 — OmniRoute v3.8.40
>
> Bruk dette kartet til å navigere raskt i kodebasen. Følg lenkene til egen dokumentasjon for mer inngående informasjon.

## Trestruktur på toppnivå

```
OmniRoute/
├── src/                  # Next.js 16-applikasjon (grensesnitt + API-ruter + biblioteker + domene + server)
├── open-sse/             # Arbeidsområde for strømmemotoren (håndterere, eksekverere, oversetter, MCP-server)
├── electron/             # Skrivebordsinnpakning (Electron 41 + electron-builder 26.10)
├── bin/                  # Inngangspunkt for kommandolinjeverktøyet og kommandohåndterere
├── scripts/              # Skript for bygging, kontroll, synkronisering og engangsoppgaver
├── docs/                 # Offentlig dokumentasjon (du er her)
├── tests/                # Alle testpakker (enhets-, integrasjons- og e2e-tester samt protokollklienter)
├── public/               # Statiske Next.js-ressurser, PWA-manifest, service worker, ikoner
├── config/               # Statisk konfigurasjon + tilstand for kvalitetskontroller (i18n, payloadRules, quality/)
├── images/               # Bilderessurser for markedsføring / README
├── @omniroute/           # Publiserbare tilleggspakker (opencode-plugin, opencode-provider)
├── skills/               # Ferdighetspakker for kommandolinjeverktøy/agenter (cli-* + omni-* + config-codex-cli)
├── examples/             # Eksempeltillegg + omniroute-cmd-hello-startmal
├── contrib/              # Bidrag fra fellesskapet (podman/)
├── .source/              # Fumadocs-kildekonfigurasjon (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions-arbeidsflyter + saksmaler + PR-mal
├── .husky/               # Git-kroker (pre-commit, pre-push)
├── .claude/              # Claude Code-skråstrekkommandoer (prosjektavgrenset)
├── .agents/              # Codex / generiske agentarbeidsflyter + ferdigheter (speiling av .claude/)
├── .vscode/              # Innstillinger for VS Code-arbeidsområdet
├── _ideia/               # Planleggingsnotater (uformelle; distribueres ikke)
├── _mono_repo/           # Historiske delprosjekter (cloud, site, vscode-extension)
├── _references/          # Skrivebeskyttede referansekloner fra relaterte OSS-prosjekter
├── _tasks/               # Oppgavesporingsfiler for hver utgivelse (uformelle)
├── .build/ .worktrees/ dist/   # Lokal kladd for bygging / git-worktree / byggresultater (gitignored)
├── .issues/              # Lokal saksbuffer (gitignored)
├── .playwright-mcp/      # Playwright MCP-testartefakter
├── coverage/             # c8-dekningsresultater (gitignored)
├── logs/                 # Kjøretidslogger (gitignored)
├── node_modules/         # Avhengigheter (gitignored)
├── package/              # Klargjøringsområde for npm pack (byggeartefakt)
├── .next/                # Next.js-byggresultater (gitignored)
└── (filer i rotkatalogen — se nedenfor)
```

---

## Filer i rotkatalogen

| Fil                                         | Formål                                                                                        |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| **README.md**                               | Markedsføringsside + hurtigstart + funksjonsmatrise (se også `llm.txt`)                       |
| **CHANGELOG.md**                            | Endringslogg per utgivelse (automatisk generert av `/version-bump-cc`-ferdigheten)            |
| **LICENSE**                                 | MIT-lisenstekst                                                                               |
| **CLAUDE.md**                               | Prosjektregler for Claude Code-agenter (ufravikelige regler, konvensjoner, scenarioer)        |
| **AGENTS.md**                               | Samme som CLAUDE.md, men for AI-agenter som ikke er Claude (Codex, Cursor osv.)               |
| **GEMINI.md**                               | Kortfattede regler for Gemini-baserte agenter (delsett av CLAUDE.md)                          |
| **CONTRIBUTING.md**                         | Bidragsyterveiledning: oppsett, konvensjonelle commits, testing, PR-flyt                      |
| **SECURITY.md**                             | Retningslinjer for rapportering av sårbarheter, støttede versjoner, trusselmodell             |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — forventninger til atferd i fellesskapet                                |
| **llm.txt**                                 | Landingsside i ren tekst optimalisert for LLM-gjennomsøkere (SEO for AI-assistenter)          |
| **package.json**                            | npm-manifest, skript, avhengigheter, motorer, c8-dekningskrav                                 |
| **package-lock.json**                       | Låst avhengighetstre                                                                          |
| **tsconfig.json**                           | TypeScript-rotkonfigurasjon                                                                   |
| **tsconfig.typecheck-core.json**            | Typesjekk-konfigurasjon for kjernen i `src/`                                                  |
| **tsconfig.typecheck-noimplicit-core.json** | Streng (`noImplicitAny`) typesjekk                                                            |
| **tsconfig.tsbuildinfo**                    | TS-hurtigbuffer for inkrementell bygging (ignorert av git)                                    |
| **next.config.mjs**                         | Byggekonfigurasjon for Next.js 16 (frittstående utdata)                                       |
| **next-env.d.ts**                           | Automatisk genererte miljøtyper for Next.js                                                   |
| **eslint.config.mjs**                       | Flat ESLint-konfigurasjon (regler per prosjektområde)                                         |
| **prettier.config.mjs**                     | Formateringsregler for Prettier                                                               |
| **postcss.config.mjs**                      | PostCSS-konfigurasjon for Tailwind/CSS-pipelinen                                              |
| **playwright.config.ts**                    | Konfigurasjon for Playwright E2E-tester                                                       |
| **vitest.config.ts**                        | Vitest-konfigurasjon (standard testsamling)                                                   |
| **vitest.mcp.config.ts**                    | Vitest-konfigurasjon for MCP-server / autoCombo / hurtigbuffersamlinger                       |
| **sonar-project.properties**                | SonarQube/SonarCloud-konfigurasjon (kodekvalitet)                                             |
| **Dockerfile**                              | Flertrinns Docker-bygging (builder → runner-base → runner-cli)                                |
| **docker-compose.yml**                      | Utviklings-compose med 4 profiler (base, cli, host, cliproxyapi) + redis-sidevogn             |
| **docker-compose.prod.yml**                 | Produksjons-compose (port 20130, redis, navngitte volumer)                                    |
| **.dockerignore**                           | Filer som er ekskludert fra Docker-konteksten                                                 |
| **fly.toml**                                | Fly.io-distribusjonskonfigurasjon (region `sin`, port 20128, /data-volum)                     |
| **.env.example**                            | Mal for miljøfil (kopieres automatisk til `.env` ved første installasjon)                     |
| **.gitignore**                              | Ignoreringsmønstre for git                                                                    |
| **.npmignore**                              | Ekskluderingsliste for npm-publisering                                                        |
| **.npmrc**                                  | npm-konfigurasjon (register, policy for låsefil)                                              |
| **.node-version**                           | Låst Node-versjon (brukes av nvm-kompatible verktøy)                                          |
| **.nvmrc**                                  | Låst Node-versjon for nvm                                                                     |
| **eslint.complexity.config.mjs**            | ESLint-konfigurasjon for kompleksitetssperren (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | ESLint-konfigurasjon for SonarJS-regler (kognitiv kompleksitet / duplisering)                 |
| **source.config.ts**                        | Fumadocs-`defineDocs`-kildekonfigurasjon (forsyner `.source/`)                                |
| **knip.json**                               | Knip-konfigurasjon — ubrukte filer/eksporter/avhengigheter (forsyner sperren for død kode)    |
| **stryker.conf.json**                       | Konfigurasjon for mutasjonstesting med Stryker                                                |
| **.size-limit.json**                        | Konfigurasjon av pakkestørrelsesbudsjett for size-limit                                       |
| **promptfooconfig.yaml**                    | Evalueringskonfigurasjon for promptfoo                                                        |
| **.gitleaks.toml**                          | Regelsett for hemmelighetsskanning med gitleaks                                               |
| **.zizmor.yml**                             | Konfigurasjon for sikkerhetslinting av GitHub Actions med zizmor                              |
| **socket.yml**                              | Konfigurasjon for forsyningskjedesikkerhet med Socket.dev                                     |
| **news.json**                               | Lokalisert v2-kunngjøringsfeed; lanseringselementet for Radar leveres deaktivert              |
| **flake.nix** / **flake.lock**              | Nix-definisjon av utviklerskall + låsefil                                                     |
| **.env**                                    | Lokale hemmeligheter (gitignored — generert fra `.env.example`)                               |

> **Flyttet ut av roten i v3.8.26 (opprydding):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` og den genererte `quality-metrics.json` (gitignored). Se [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js-applikasjon

```
src/
├── app/                 # App Router (sider + API-ruter + statussider + landingsside)
├── lib/                 # Kjernebiblioteker/domene-moduler (80 undermapper + ~70 filer på toppnivå)
├── domain/              # Ren domenelogikk (policy-motor, reserve, kostnad, låsing, comboResolver, vurdering)
├── server/              # Moduler kun for server (autorisasjonskjede, CORS, autentiseringsmellomvare) — kan ikke importeres fra klienten
├── shared/              # Delt mellom server og klient der det er trygt (konstanter, typer, validering, kontrakter, verktøy)
├── i18n/                # next-intl-konfigurasjon + meldings-JSON per språkinnstilling (42 språkinnstillinger)
├── middleware/          # Next.js-mellomvare (berikelse av forespørsler, språkdeteksjon)
├── mitm/                # Kjerne for MITM-proxy: generering/installasjon av sertifikater, håndterere, mål, inspektør, masker, direkte videresending
│   ├── handlers/        # 9 håndteringsklasser for IDE-agenter som utvider MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Lag for trafikkregistrering: buffer (ringbuffer i minnet), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Koblingskode for modelladapter (eldre kompatibilitetslag)
├── scripts/             # Vedlikeholdsskript i kildetreet (f.eks. backfillAggregation)
├── sse/                 # Eldre SSE-håndterere/-tjenester (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Eldre minnelager (fases ut til fordel for src/lib/db)
├── types/               # Delte TS-typefiler
├── instrumentation.ts   # Next.js-hook for telemetri (nettleser + edge)
├── instrumentation-node.ts  # Instrumentering kun for Node
└── proxy.ts             # Inngangslag for HTTP-proxy
```

### `src/app/` — App Router (Next.js 16)

| Bane                                                                         | Formål                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `app/api/v1/`                                                                | Offentlig OpenAI-kompatibelt API (~25 underruter: chat, fullføringer, embeddings, filer, batcher, lyd, bilder, videoer, musikk, omrangering, moderering, søk, ws, agenter, kontoer, leverandører osv.)                                                                                                                   |
| `app/api/v1beta/`                                                            | API-endepunkter i Gemini-stil                                                                                                                                                                                                                                                                                            |
| `app/api/playground/`                                                        | Playground Studio-ruter: `improve-prompt/` (POST — LLM-omskriving av ledetekster), `presets/` (GET liste / POST opprett), `presets/[id]/` (GET / PUT / DELETE) — se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                               |
| `app/api/` (ikke-v1)                                                         | Administrasjonsruter (~60 mapper: leverandører, kombinasjoner, innstillinger, mcp, a2a, evalueringer, minne, ferdigheter, webhooks, samsvar, robusthet, overvåking, tunneler, CLI-verktøy osv.)                                                                                                                          |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST-API — 12 ruter (serverkontroll, agentstatus/DNS/tilordninger, omgåelse, sertifikat, oppstrøms-CA). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                  |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST- og WS-API — 16+ ruter (forespørsler, økter, verter, opptaksmoduser, eksport, ws). LOCAL_ONLY + SPAWN_CAPABLE. Se `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                      |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0-inngangspunkt (`POST /a2a`)                                                                                                                                                                                                                                                                             |
| `app/.well-known/agent.json/`                                                | A2A-agentkort (oppdagelse)                                                                                                                                                                                                                                                                                               |
| `app/(dashboard)/dashboard/`                                                 | Brukergrensesnittsider for kontrollpanelet (50+ seksjoner, ~118 page.tsx-filer: leverandører, kombinasjoner, innstillinger, minne, ferdigheter, webhooks, evalueringer, revisjon, batch, hurtigbuffer, kostnader, tilstand, system, aktivitet osv.)                                                                      |
| `app/(dashboard)/dashboard/search-tools/`                                    | Brukergrensesnitt for Search Tools Studio (3 faner: Søk/Innhenting/Sammenligning + SearchConceptCard + ProviderCatalog) — se `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                    |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (skall med 3 faner), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge-side i kontrollpanelet — serverkort, 9 agentkort, oppsettsveiviser, modelltilordning, omgåelsesliste. i18n PT-BR + EN. Se `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                  |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector-side i kontrollpanelet — DevTools-delt visning, 7 detaljfaner, 4 brytere for opptaksmodus, øktopptaker, kontekstfargelegging. i18n PT-BR + EN. Se `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                              |
| `app/(dashboard)/dashboard/activity/`                                        | Aktivitetsstrømside (gruppe B): `page.tsx` (server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — se `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                  |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Side for kvotedeling (gruppe B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                             |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Konfigurasjonsside for leverandørplan (gruppe B): `page.tsx` + `ProviderPlanConfigClient.tsx` — overstyring av kvotedimensjoner per tilkobling                                                                                                                                                                           |
| `app/docs/`                                                                  | Innebygd dokumentasjonsvisning (gjengir `docs/*.md`)                                                                                                                                                                                                                                                                     |
| `app/landing/`                                                               | Markedsføringsside                                                                                                                                                                                                                                                                                                       |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Autentiseringsrelaterte sider                                                                                                                                                                                                                                                                                            |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP-feilsider                                                                                                                                                                                                                                                                                                           |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statiske sider/statussider                                                                                                                                                                                                                                                                                               |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Rotoppsett, startside, PWA-manifest, global CSS                                                                                                                                                                                                                                                                          |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Feilgrenser                                                                                                                                                                                                                                                                                                              |

### `src/lib/` — Kjernebiblioteker (~50 moduler)

| Modul                                    | Formål                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Oppgavebehandling for A2A-protokollen, ferdigheter (5), strømming                                                                                                                                                                                                                                                           |
| `acp/`                                   | CLI-agentregister (lokal CLI-oppdagelse — se `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                    |
| `api/`                                   | Delte API-hjelpefunksjoner (`requireManagementAuth`, validering)                                                                                                                                                                                                                                                            |
| `auth/`                                  | Økter, passordhashing, tokenvalidering                                                                                                                                                                                                                                                                                      |
| `batches/`                               | Håndterere for OpenAI Batches API                                                                                                                                                                                                                                                                                           |
| `catalog/`                               | Zod-validering av leverandørkatalog + kapabilitetsavklaring                                                                                                                                                                                                                                                                 |
| `cloudAgent/`                            | Skyagenter (Codex Cloud, Devin, Jules) — se `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                |
| `combos/`                                | Kombinasjonsavklaring + hjelpefunksjoner for omorganisering                                                                                                                                                                                                                                                                 |
| `audit/`                                 | Hjelpefunksjoner for aktivitetsfeed: `highLevelActions.ts` (tillatelsesliste + `isHighLevelAction()`), `activityIcons.ts` (handling → ikon-/verbkart), `timeline.ts` (groupByDay/relativeTime) — se `docs/architecture/MONITORING_SECTIONS.md`                                                                              |
| `compliance/`                            | Revisjonslogg + leverandørrevisjon — se `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                       |
| `compression/`                           | Koblingskode for komprimeringsmotoren (motorene finnes i `open-sse/services/compression/`)                                                                                                                                                                                                                                  |
| `config/`                                | Hjelpefunksjoner for kjøretidskonfigurasjon                                                                                                                                                                                                                                                                                 |
| `db/`                                    | Over 120 domenespesifikke DB-moduler + 168 migreringer (gå alltid gjennom disse for SQLite)                                                                                                                                                                                                                                 |
| `quota/`                                 | Motor for kvotedeling: `dimensions.ts` (typer/Zod), `types.ts` (`QuotaStore`-grensesnitt), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — se `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Katalogklient for Radars gratis-modeller: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — se `docs/frameworks/RADAR.md`                                                                                                                                        |
| `display/`                               | Hjelpefunksjoner for formatering av brukergrensesnitt (kostnad, latenstid osv.)                                                                                                                                                                                                                                             |
| `embeddings/`                            | Hjelpefunksjoner for embeddingstjenesten                                                                                                                                                                                                                                                                                    |
| `env/`                                   | Tolkning og validering av miljøvariabler                                                                                                                                                                                                                                                                                    |
| `evals/`                                 | Evalueringsrammeverk (suiter, kjører, kjøretidsmiljø) — se `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                       |
| `guardrails/`                            | Maskering av personlig identifiserbar informasjon, promptinjeksjon, bildebro — se `docs/security/GUARDRAILS.md`                                                                                                                                                                                                             |
| `jobs/`                                  | Bakgrunnsjobber (cron-lignende)                                                                                                                                                                                                                                                                                             |
| `memory/`                                | Samtaleminne (SQLite FTS5 + sqlite-vec-hybrid RRF + Qdrant nivå 2) — se `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                         |
| `memory/embedding/`                      | Embeddingslag med flere kilder: `index.ts` (oppløser), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                             |
| `memory/vectorStore.ts`                  | Wrapper for sqlite-vec v0.1.9 — KNN-råstyrkesøk + hybrid RRF (FTS5 + vektor, k=60). Initialiseres ved behov og fortsetter med redusert funksjonalitet når sqlite-vec ikke er tilgjengelig. (plan 21)                                                                                                                        |
| `memory/reindex.ts`                      | `runReindexBatch()` — behandler minner med `needs_reindex=1` i bakgrunnen; kalles av `POST /api/memory/reindex` og banen for utsatt tilbakefylling. (plan 21)                                                                                                                                                               |
| `monitoring/`                            | Helsesjekker, utsending av måledata                                                                                                                                                                                                                                                                                         |
| `oauth/`                                 | OAuth-/importflyter for 22 leverandørmoduler (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                    |
| `plugins/`                               | Programtilleggsregister                                                                                                                                                                                                                                                                                                     |
| `promptCache/`                           | Bruddpunkter for promptbuffer i Anthropic-stil                                                                                                                                                                                                                                                                              |
| `skills/`                                | Ferdighetsrammeverk (innebygd + markedsplass + SkillsSH) — se `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                   |
| `playground/`                            | Delte hjelpefunksjoner for Playground Studio: `codeExport.ts` (curl/Python/TS-generator), `promptImprover.ts` (metapromptbygger), `streamMetrics.ts` (ren TTFT/TPS), `types.ts` (pristabell) — se `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                    |
| `webhookDispatcher.ts`                   | Levering av HMAC-webhooks — se `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Tunneladministratorer — se `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                      |
| `cloudSync.ts`, `initCloudSync.ts`       | Valgfri skysynkronisering av tilstand                                                                                                                                                                                                                                                                                       |
| `localDb.ts`                             | Reeksportmodul for databasemoduler (ingen logikk — kun reeksportering)                                                                                                                                                                                                                                                      |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Hurtigbufring av forespørsler + idempotens                                                                                                                                                                                                                                                                                  |
| (~30 flere filer på toppnivå)            | Spesialiserte hjelpefunksjoner (logEnv, modelsDevSync, piiSanitizer osv.)                                                                                                                                                                                                                                                   |

### `src/lib/db/` — Database (122 moduler + 168 migreringer)

| Underkatalog              | Formål                                                                                                                                                                                  |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | `getDbInstance()`-singleton med WAL-journalføring                                                                                                                                       |
| `db/migrations/`          | Versjonerte SQL-filer (idempotente, transaksjonelle). `073_memory_vec.sql` legger til `memory_vec_meta` + kolonnen `needs_reindex` (plan 21).                                           |
| `db/playgroundPresets.ts` | CRUD-modul for forhåndsinnstillinger i Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD for `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` osv. (plan 21)                              |
| `db/<domain>.ts`          | Én modul per domene: leverandører, kombinasjoner, API-nøkler, brukere, økter, bruk, audit*log, webhooks, ferdigheter, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache osv. |

### `src/domain/`

| Modul                  | Formål                                                  |
| ---------------------- | ------------------------------------------------------- |
| `policy.ts`            | Regelmotor                                              |
| `fallbackPolicy.ts`    | Beslutningstre for reserveløsning                       |
| `costRules.ts`         | Regler for kostnadsberegning                            |
| `lockoutPolicy.ts`     | Sperrepolicy for modell/tilkobling                      |
| `tagRouter.ts`         | Taggbasert ruting                                       |
| `comboResolver.ts`     | Løsing av kombinasjoner (brukes av kombinasjonsmotoren) |
| `modelAvailability.ts` | Tilgjengelighetskontroll per modell                     |
| `assessment/`          | Modellvurdering (fase 1 av RFC-AUTO-ASSESSMENT)         |

### `src/server/`

| Modul    | Formål                                                                                         |
| -------- | ---------------------------------------------------------------------------------------------- |
| `authz/` | Autorisasjonsflyt: `classify` → `policies` → `enforce` — se `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS-konfigurasjon                                                                             |
| `auth/`  | Mellomvare for økter                                                                           |

### `src/shared/`

| Modul                            | Formål                                                                                |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 leverandører** med Zod-validering (autoritativ kilde)                           |
| `constants/cliTools.ts`          | Register over eksterne CLI-verktøy                                                    |
| `constants/routingStrategies.ts` | **19 rutingsstrategier** med prioriteter                                              |
| `constants/publicApiRoutes.ts`   | Ruter som krever Bearer-autentisering (i motsetning til administrasjonsautentisering) |
| `constants/upstreamHeaders.ts`   | Liste over ikke-tillatte headere for oppstrømsforespørsler                            |
| `validation/schemas.ts`          | ~80 Zod-skjemaer (én autoritativ kilde for API-kontrakter)                            |
| `validation/helpers.ts`          | Hjelpefunksjoner for Zod-validering (`validateBody` osv.)                             |
| `types/`                         | Delte TS-typer                                                                        |
| `contracts/`                     | Offentlige API-kontrakter (brukt av `files:` i `package.json`)                        |
| `utils/circuitBreaker.ts`        | Effektbryter for leverandører (se `docs/architecture/RESILIENCE_GUIDE.md`)            |
| `utils/apiAuth.ts`               | Validering av API-nøkler og kontroll av tilganger                                     |
| `utils/fetchTimeout.ts`          | Wrappere for tidsavbrudd/avbrytelse ved oppstrøms fetch                               |
| `utils/releaseNotes.ts`          | Parser for lukkede v2-/eldre kunngjøringer, lokalisering og avvisning basert på ID    |

---

## `open-sse/` — Arbeidsområde for strømmemotor

Separat npm-arbeidsområde (`@omniroute/open-sse`). Håndterer behandling av forespørsler og kjøring mot leverandører.

```
open-sse/
├── handlers/            # 16 filer (12 håndterere + 4 hjelpefunksjoner): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search osv.
├── executors/           # 67 leverandørspesifikke eksekverere (utvider BaseExecutor)
├── translator/          # Formatkonverterere (9 for forespørsler, 9 for svar, 9 hjelpefunksjoner)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ tjenestemoduler (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM osv.)
├── mcp-server/          # MCP-server (110 verktøy, 3 transporter, 33 omfang)
├── config/              # Leverandør-/modellregistre, headerkonfigurasjon, modellaliaser
├── utils/               # TLS-klient, proxy-fetch/-dispatcher, nettverkshjelpere
├── index.ts             # Inngangspunkt for arbeidsområdet
├── package.json         # Arbeidsområdemanifest
├── tsconfig.json        # TS-konfigurasjon for arbeidsområdet
└── types.d.ts           # Typedeklarasjoner for arbeidsområdet
```

### `open-sse/mcp-server/`

| Bane                        | Formål                                                                           |
| --------------------------- | -------------------------------------------------------------------------------- |
| `server.ts`                 | Livssyklus for MCP-serveren (stdio- + HTTP-transporter)                          |
| `httpTransport.ts`          | HTTP Streamable- + SSE-transporter (`/api/mcp/sse`, `/api/mcp/stream`)           |
| `audit.ts`                  | Revisjonslogging til tabellen `mcp_tool_audit`                                   |
| `scopeEnforcement.ts`       | Omfangsvalidering per verktøy                                                    |
| `runtimeHeartbeat.ts`       | Helsepuls til `DATA_DIR/runtime/mcp-heartbeat.json`                              |
| `descriptionCompressor.ts`  | Komprimerer metadata for verktøybeskrivelser for å spare kontekst                |
| `schemas/tools.ts`          | 36 grunnleggende verktøydefinisjoner + omfang                                    |
| `tools/advancedTools.ts`    | Avanserte verktøyimplementasjoner                                                |
| `tools/memoryTools.ts`      | 3 minneverktøy (søk/legg til/tøm)                                                |
| `tools/skillTools.ts`       | 4 ferdighetsverktøy (liste/aktiver/kjør/kjøringer)                               |
| `tools/compressionTools.ts` | 5 komprimeringsverktøy                                                           |
| `README.md`                 | Intern README for MCP-serveren (krysslenket fra `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Skrivebordsinnpakning

| Fil              | Formål                                                                                             |
| ---------------- | -------------------------------------------------------------------------------------------------- |
| `main.js`        | Electron-hovedprosess (BrowserWindow, innebygd Next.js-server, systemfelt, automatisk oppdatering) |
| `preload.js`     | IPC-bro (contextBridge → `window.omniroute`)                                                       |
| `package.json`   | electron-builder-konfigurasjon + avhengigheter for Electron 41 + electron-builder 26.10            |
| `assets/`        | Appikoner (Windows .ico, macOS .icns, Linux .png)                                                  |
| `dist-electron/` | Byggresultat (gitignored)                                                                          |
| `types.d.ts`     | Typedeklarasjoner for rendererbroen                                                                |
| `README.md`      | Intern README for Electron (se også `docs/guides/ELECTRON_GUIDE.md`)                               |

---

## `bin/` — CLI

| Fil                                                                                                         | Formål                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Hovedinngangspunkt for CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` osv. |
| `reset-password.mjs`                                                                                        | Frittstående CLI for tilbakestilling av passord                                                                                       |
| `cli/commands/setup.mjs`                                                                                    | Interaktiv og ikke-interaktiv konfigurasjonsveiviser                                                                                  |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostikk av systemtilstand (8+ kontroller)                                                                                         |
| `cli/commands/providers.mjs`                                                                                | Liste over / testing / validering av leverandører                                                                                     |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Hjelpemoduler for CLI                                                                                                                 |
| `cli/tray/tray.ts`                                                                                          | Integrasjon med systemstatusfeltet (på tvers av plattformer: NotifyIcon på Windows, systray2 på macOS/Linux)                          |
| `cli/tray/tray.ps1`                                                                                         | PowerShell-basert NotifyIcon-motor (Windows, ingen nye binærfiler)                                                                    |
| `cli/tray/autostart.ts`                                                                                     | Automatisk oppstart på tvers av plattformer (LaunchAgent / .desktop / registeret)                                                     |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-trinns kjede for valg av SQLite-driver (inkludert → kjøretidsmiljø → utsatt installasjon → node:sqlite → sql.js)                    |
| `cli/runtime/magicBytes.mjs`                                                                                | Validering av magiske byte i binærfiler (ELF / Mach-O / Mach-O fat / PE)                                                              |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — forhåndsvelger drivere etter installasjon / ved første oppstart                                                  |
| `nodeRuntimeSupport.mjs`                                                                                    | Validerer støttet Node.js-versjon ved installasjon                                                                                    |

---

## `skills/` — Offentlige agentferdigheter

| Fil                          | Formål                                                                                   |
| ---------------------------- | ---------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 ferdighetsmanifester for eksterne KI-agenter (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Bygge- og kontrollskript

| Skript                              | Formål                                                                                                |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Utviklings-/oppstartskjører med innlasting av miljøvariabler                                          |
| `build-next-isolated.mjs`           | Frittstående bygg (Next.js 16 standalone)                                                             |
| `prepublish.ts`                     | Klargjøring av pakken før `npm pack`                                                                  |
| `postinstall.mjs`                   | Opprett `.env` automatisk fra `.env.example` ved første installasjon                                  |
| `sync-env.mjs`                      | Synkroniser nøklene i `.env` på nytt med `.env.example`                                               |
| `check-cycles.mjs`                  | Oppdag sirkulære avhengigheter                                                                        |
| `check-route-validation.mjs`        | Kontroller at alle API-ruter har Zod-validering                                                       |
| `check-t11-any-budget.mjs`          | Håndhev eksplisitt `any`-budsjett per fil                                                             |
| `check-docs-sync.mjs`               | Valider synkronisering av dokumentasjonsversjoner (eksisterende pre-commit)                           |
| **`check-env-doc-sync.mjs`**        | NY: kryssjekk miljøvariabler i koden mot `.env.example` og `ENVIRONMENT.md`                           |
| **`check-docs-counts-sync.mjs`**    | NY: valider at antall (eksekutorer, strategier, OAuth, A2A-ferdigheter) samsvarer med dokumentasjonen |
| **`check-deprecated-versions.mjs`** | NY: marker utdaterte versjoner/datoer i dokumentasjonen                                               |
| `check-supported-node-runtime.ts`   | Valider at gjeldende Node-versjon støttes                                                             |
| `check-pr-test-policy.mjs`          | Håndhev regelen om at «tester kreves» ved endringer i produksjonskode                                 |
| **`gen-provider-reference.ts`**     | NY: generer `docs/reference/PROVIDER_REFERENCE.md` automatisk fra katalogen                           |
| `i18n/generate-multilang.mjs`       | Oversett grensesnittstrenger og dokumentasjon via Google Translate                                    |
| `i18n_autotranslate.py`             | LLM-basert arbeidsflyt for dokumentoversettelse                                                       |
| `validate_translation.py`           | Valider oversettelser for hver språkvariant                                                           |
| `check_translations.py`             | Kontroller i18n-nøkler på kodesiden                                                                   |
| `run-playwright-tests.mjs`          | Playwright E2E-testkjører                                                                             |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E-testkjører                                                                                |
| `run-ecosystem-tests.mjs`           | Tester av økosystemet (leverandørintegrasjon)                                                         |
| `test-report-summary.mjs`           | Generer dekningssammendrag i Markdown                                                                 |
| `smoke-electron-packaged.mjs`       | Kjør røyktest av pakket Electron-bygg                                                                 |
| `native-binary-compat.mjs`          | Valider at opprinnelige avhengigheter (`better-sqlite3`) samsvarer med Electron sin Node              |
| `validate-pack-artifact.ts`         | Valider resultatet fra npm-pakking                                                                    |
| `responses-ws-proxy.mjs`            | WebSocket-bro for Codex Responses API                                                                 |
| `v1-ws-bridge.mjs`                  | WebSocket-bro for endepunktet `/api/v1/ws`                                                            |
| `standalone-server-ws.mjs`          | Frittstående WS-serverkjører                                                                          |
| `system-info.mjs`                   | Skriv ut system-/kjøretidsinformasjon for brukerstøtte                                                |
| `healthcheck.mjs`                   | Engangs helsesjekk (brukes av Docker HEALTHCHECK)                                                     |
| `uninstall.mjs`                     | Skript for ren avinstallering                                                                         |

---

## `docs/` — Offentlig dokumentasjon (7 rotfiler + 17 undermapper)

### Veiledninger på toppnivå

| Dokument                    | Formål                                                                                              |
| --------------------------- | --------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Overordnet arkitektur, oversikt over delsystemer, kontrollpanelgrensesnitt                          |
| `CODEBASE_DOCUMENTATION.md` | Teknisk referanse: mapper, moduler, konvensjoner                                                    |
| `FEATURES.md`               | Funksjonsmatrise med høydepunkter i v3.8                                                            |
| `USER_GUIDE.md`             | Sluttbrukerhåndbok (oppsett, modeller, kombinasjoner, CLI-er, lyd osv.)                             |
| `API_REFERENCE.md`          | Referanse for API-endepunkter med autentiseringsmodell                                              |
| `openapi.yaml`              | OpenAPI 3.0-spesifikasjon (121 baner)                                                               |
| `SETUP_GUIDE.md`            | Installasjonsmetoder (npm, npx, Docker, Electron, Termux, kildekode)                                |
| `ENVIRONMENT.md`            | Alle miljøvariabler (~800 dokumentert, ~3 050 linjer i `.env.example`)                              |
| `TROUBLESHOOTING.md`        | Vanlige feil + kjente problemer i v3.8.0                                                            |
| `RELEASE_CHECKLIST.md`      | Fullstendig utgivelsesprosess (ferdigheter, husky, conventional commits, utrulling)                 |
| `COVERAGE_PLAN.md`          | Dekningsmål og nåværende status                                                                     |
| `FREE_TIERS.md`             | Håndplukkede leverandører med gratisnivå (48+ gratis + 11 OAuth)                                    |
| `CLI-TOOLS.md`              | Eksterne CLI-integrasjoner + intern OmniRoute-CLI                                                   |
| `I18N.md`                   | i18n-arkitektur, hvordan legge til et språk, 42 lokaliteter                                         |
| `UNINSTALL.md`              | Trinn for ren avinstallering                                                                        |
| `PROVIDER_REFERENCE.md`     | **Automatisk generert** katalog over 355 leverandører (regenerer: `npm run gen:provider-reference`) |

### Detaljert dokumentasjon av delsystemer

| Dokument                                   | Formål                                                                       |
| ------------------------------------------ | ---------------------------------------------------------------------------- |
| `MCP-SERVER.md`                            | MCP-server: 110 verktøy, 3 transporter, 33 omfang, REST-endepunkter          |
| `A2A-SERVER.md`                            | A2A v0.3: JSON-RPC, 6 ferdigheter, REST-hjelpere, agentkort                  |
| `AGENT_PROTOCOLS_GUIDE.md`                 | Samlet veiledning: A2A kontra ACP kontra skyagenter                          |
| `CLOUD_AGENT.md`                           | Orkestrering av Codex Cloud / Devin / Jules                                  |
| `SKILLS.md`                                | Rammeverk for ferdigheter (innebygd + markedsplass + SkillsSH + sandkasse)   |
| `RADAR.md`                                 | Radar-katalogoverlegg for gratis modeller (`RADAR_ENABLED`, av som standard) |
| `MEMORY.md`                                | Minnesystem (SQLite FTS5 + Qdrant)                                           |
| `EVALS.md`                                 | Evalueringsrammeverk (suiter, kjøringer, rubrikker)                          |
| `GUARDRAILS.md`                            | Maskering av personopplysninger, promptinjeksjon, bildebro                   |
| `COMPLIANCE.md`                            | Revisjonslogg, oppbevaring, bortvalg via noLog                               |
| `WEBHOOKS.md`                              | Levering av HMAC-signerte webhooks                                           |
| `REASONING_REPLAY.md`                      | Hybrid minne-/SQLite-hurtigbuffer for `reasoning_content`                    |
| `AUTHZ_GUIDE.md`                           | Autorisasjonsflyt (`classify` → `policies` → `enforce`)                      |
| `RESILIENCE_GUIDE.md`                      | Kretsbryter + nedkjøling + modellutestenging                                 |
| `docs/security/STEALTH_GUIDE.md` (kun git) | TLS-fingeravtrykk (JA3/JA4), Claude Code CCH, MITM-sertifikat                |
| `AUTO-COMBO.md`                            | Auto Combo-motor (16-faktorpoengsetting, 6 moduspakker, virtuell fabrikk)    |

### Komprimering

| Dokument                        | Formål                                       |
| ------------------------------- | -------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Oversikt over komprimeringsmoduser + veikart |
| `COMPRESSION_ENGINES.md`        | Caveman- og RTK-motorer, registerkontrakt    |
| `COMPRESSION_RULES_FORMAT.md`   | JSON-skjema for Caveman-regelpakker          |
| `COMPRESSION_LANGUAGE_PACKS.md` | Oversikt over regelpakker for hvert språk    |
| `RTK_COMPRESSION.md`            | Deklarativ RTK-flyt (49 filtre)              |

### Utrulling

| Dokument                     | Formål                                                              |
| ---------------------------- | ------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker-bygging, profiler (base/cli/host/cliproxyapi), Redis-sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | Generisk VM/VPS-utrulling (Ubuntu/Debian + nginx + systemd)         |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Utrulling på Fly.io (for øyeblikket kun på kinesisk)                |
| `TERMUX_GUIDE.md`            | Hodeløs Android via Termux                                          |
| `PWA_GUIDE.md`               | Installasjon av progressiv nettapp + service worker                 |
| `ELECTRON_GUIDE.md`          | Bygging + signering + distribusjon av skrivebordsapp                |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                              |
| `PROXY_GUIDE.md`             | Utgående proxy på 4 nivåer + 1proxy-markedsplass                    |

### Undermapper

| Underkatalog          | Formål                                                                                                                                                                                                                          |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokaliserte dokumentoversettelser (41 språkinnstillinger)                                                                                                                                                                       |
| `docs/screenshots/`   | Bilderessurser for veiledninger                                                                                                                                                                                                 |
| `_tasks/superpowers/` | Planer/spesifikasjoner fra superpowers (`writing-plans`/`brainstorming`) + forskning — isolert repositorium med separat versjonskontroll, ignorert av Git i hovedtreet. Se CLAUDE.md → «Planleggings- og forskningsartefakter». |

---

## `tests/` — Testsett

| Underkatalog                         | Type                                         | Kjøreverktøy                               |
| ------------------------------------ | -------------------------------------------- | ------------------------------------------ |
| `tests/unit/`                        | Enhetstester (~4 800 filer, raskest)         | Nodes innebygde testkjører                 |
| `tests/integration/`                 | Integrasjonstester for flere moduler + DB    | Nodes innebygde testkjører (samtidighet 1) |
| `tests/e2e/`                         | E2E for brukergrensesnitt + arbeidsflyt      | Playwright                                 |
| `tests/e2e/protocol-clients.test.ts` | E2E med reelle klienter for MCP + A2A        | Egendefinerte protokollklienter            |
| `tests/e2e/ecosystem.test.ts`        | Leverandørintegrasjon (med nettverkstilgang) | Nodes innebygde testkjører                 |

---

## `public/` — Statiske ressurser

| Bane                | Formål                                                                     |
| ------------------- | -------------------------------------------------------------------------- |
| `public/` (rot)     | Favorittikoner, robots.txt, manifest, service worker, markedsføringsbilder |
| `public/providers/` | Leverandørlogoer i PNG/SVG-format (brukes i kontrollpanelet)               |

---

## `config/` — Statiske konfigurasjoner + status for kvalitetsporter

Konfigurasjonsmaler som distribueres, samt versjonslagrede referanseverdier for kvalitetsporter
(flyttet hit fra rotkatalogen i v3.8.26 for å holde roten ryddig).

| Bane                                          | Formål                                                                                            |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Liste over nasjonale innstillinger + metadata (kanonisk kilde for antallet på 42)                 |
| `config/i18n-schema.json`                     | JSON-skjema som validerer `i18n.json`                                                             |
| `config/payloadRules.json`                    | Regler for sanitering av oppstrøms nyttelast                                                      |
| `config/quality/quality-baseline.json`        | Referanseverdi med sperrehake for flere måleverdier (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Fryst referanseverdi for ESLint-kompleksitet (`check-complexity.mjs`)                             |
| `config/quality/duplication-baseline.json`    | Fryst referanseverdi for jscpd-duplisering (`check-duplication.mjs`)                              |
| `config/quality/file-size-baseline.json`      | Fryst referanseverdi for størrelse per fil (`check-file-size.mjs`)                                |
| `config/quality/test-discovery-baseline.json` | Fryst referanseverdi for foreldreløse tester (`check-test-discovery.mjs`)                         |
| `config/quality/dependency-allowlist.json`    | Tillatelsesliste over godkjente avhengigheter (`check-deps.mjs`)                                  |
| `config/quality/.license-allowlist.json`      | Tillatelsesliste over SPDX-lisenser (`check-licenses.mjs`)                                        |
| `config/quality/quality-metrics.json`         | Midlertidige innsamlede måleverdier (generert av `collect-metrics.mjs`; **ignorert av git**)      |

---

## `.github/` — GitHub-integrasjon

| Bane                               | Formål                                                                     |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions-arbeidsflyter for CI/CD (linting, test, dekning, utgivelse) |
| `.github/ISSUE_TEMPLATE/`          | Maler for feil- og funksjonsforespørsler                                   |
| `.github/pull_request_template.md` | PR-mal                                                                     |
| `.github/dependabot.yml`           | Konfigurasjon for avhengighetsoppdateringer                                |

---

## `.husky/` — Git-hooks

| Fil          | Formål                                                                       |
| ------------ | ---------------------------------------------------------------------------- |
| `pre-commit` | Kjører `lint-staged + check-docs-sync + check:any-budget:t11`                |
| `pre-push`   | For øyeblikket deaktivert (kommentert ut). Kjør `npm run test:unit` manuelt. |
| `_/`         | Internfiler for Husky                                                        |

---

## `.claude/` — Claude Code-skråstrekkommandoer

| Fil                                                 | Formål                                                      |
| --------------------------------------------------- | ----------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — øk versjonen + automatisk endringslogg |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — fullstendig utgivelsesarbeidsflyt  |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Distribuer til VPS                                          |
| `commands/capture-release-evidences-cc.md`          | Nettleseropptak av nye funksjoner som WebP                  |
| `commands/review-{prs,discussions}-cc.md`           | Sorter GitHub-PR-er/-diskusjoner                            |
| `commands/{review-issues,implement-features}-cc.md` | Arbeidsflyter for saker                                     |
| `settings.local.json`                               | Prosjektspesifikke Claude Code-innstillinger                |

---

## `.agents/` — Generiske agentarbeidsflyter (Codex / Cursor / osv.)

| Bane                     | Formål                                                       |
| ------------------------ | ------------------------------------------------------------ |
| `workflows/*-ag.md`      | 11 arbeidsflytdefinisjoner (speiling av `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 ferdighetsdefinisjoner med Codex-kjøringsmerknader         |

> **Merk:** Arbeidsflytene og kommandoene er for øyeblikket identiske byte for byte. Hvis `.agents/` er ment for et annet agentkjøremiljø (Codex), må variantene avvike på en meningsfull måte.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Utenfor treet

Disse katalogene med understrekprefiks inneholder materiale som ikke distribueres:

- **`_ideia/`** — designnotater (kategoriene defer / notfit / viable)
- **`_mono_repo/`** — historiske delprosjekter (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — skrivebeskyttede kloner av relaterte OSS-prosjekter (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api osv.) for kryssreferanser under utvikling
- **`_tasks/`** — filer for uformell oppgavesporing per utgivelse

Ikke inkludert i resultatet fra `npm pack`. Se `.npmignore`.

---

## Generert / ignorert av Git

| Bane                   | Formål                            |
| ---------------------- | --------------------------------- |
| `node_modules/`        | npm-avhengigheter                 |
| `.next/`               | Byggresultat fra Next.js          |
| `coverage/`            | Dekningsrapporter fra c8          |
| `logs/`                | Kjøretidslogger                   |
| `package/`             | Oppsamlingsområde for npm-pakking |
| `.playwright-mcp/`     | Testartefakter fra Playwright MCP |
| `.issues/`             | Lokal hurtigbuffer for saker      |
| `tsconfig.tsbuildinfo` | Inkrementell hurtigbuffer for TS  |

---

## Navigasjonstips

- **Ny bidragsyter?** Les `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Legge til en leverandør?** Følg `docs/architecture/ARCHITECTURE.md § Adding a New Provider` og kryssjekk med `docs/reference/PROVIDER_REFERENCE.md`.
- **Legge til en rute?** Se `docs/architecture/ARCHITECTURE.md § Adding a New API Route` og `src/shared/validation/schemas.ts`.
- **Legge til et MCP-verktøy?** Se `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Legge til en A2A-ferdighet?** Se `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Kjøre lokalt?** Se `docs/guides/SETUP_GUIDE.md`.
- **Distribuere?** Se `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Publisere en versjon?** Se `docs/ops/RELEASE_CHECKLIST.md` (og Claude Code-ferdigheten `/generate-release-cc`).
