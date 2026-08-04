---
title: "Dokumentacja bazy kodu OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Dokumentacja bazy kodu OmniRoute

> **Wersja:** v3.8.0
> **Ostatnia aktualizacja:** 2026-06-28
> **Odbiorcy:** Inżynierowie współtworzący OmniRoute lub budujący na nim integracje.
>
> Diagramy architektury wysokiego poziomu i uzasadnienie każdego podsystemu znajdziesz w
> [ARCHITECTURE.md](./ARCHITECTURE.md). Szczegółowe opracowania poszczególnych podsystemów
> (Auto Combo, serwer MCP, serwer A2A, Skills, Memory, Cloud Agents, Resilience,
> Compression, itd.) są w dedykowanych plikach w tym katalogu `docs/`.

Ten plik opisuje **to, co dziś jest w repozytorium**, żeby nowy inżynier
mógł przejść drzewo katalogów, zrozumieć warstwy runtime i wiedzieć, gdzie dodać kod
bez wymyślania nowych modułów.

---

## 1. Stos technologiczny

| Zagadnienie    | Wybór                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Web framework  | **Next.js 16** (App Router, stialone output, brak globalnego middleware)                                                 |
| Język          | **TypeScript 6.0+** — target `ES2022`, `module: esnext`, `moduleResolution: bundler`, `strict: false`                    |
| Runtime        | **Node.js** `>=22.22.2 <23` lub `>=24.0.0 <27` (wymuszane przez `engines` + `SUPPORTED_NODE_RANGE`)                      |
| Baza danych    | **SQLite** przez `better-sqlite3` (singleton, journalowanie WAL)                                                         |
| Desktop        | **Electron 41** + `electron-builder` 26.10 (osobny workspace w `electron/`)                                              |
| Testy          | **Node native test runner** (unit/integration), **Vitest** (MCP, autoCombo, cache), **Playwright** (e2e + protocols-e2e) |
| Build          | Next.js stialone przez `scripts/build/build-next-isolated.mjs`                                                           |
| Lint/format    | ESLint flat config + Prettier (`lint-staged` przez Husky pre-commit)                                                     |
| System modułów | ESM wszędzie (`"type": "module"`)                                                                                        |
| Workspaces     | npm workspace — `open-sse` to jedyny pod-workspace                                                                       |

Aliasy ścieżek (`tsconfig.json`):

- `@/*` → `src/*`
- `@omniroute/open-sse` → `open-sse/index.ts`
- `@omniroute/open-sse/*` → `open-sse/*`

Domyślny port HTTP: **`20128`** (API i dashboard współdzielą ten sam proces). Katalog
danych to zmienna środowiskowa `DATA_DIR`, domyślnie `~/.omniroute/`.

---

## 2. Układ repozytorium

```
OmniRoute/
├── src/                  Aplikacja Next.js (App Router, libs, domain, server, shared)
├── open-sse/             Workspace silnika streamingu (@omniroute/open-sse)
├── electron/             Opakowanie desktopowe (Electron 41 main + preload)
├── bin/                  Punkty wejścia CLI (omniroute, reset-password)
├── tests/                Unit, integration, e2e, protocols-e2e, translator, security, fixtures
├── scripts/              Skrypty build, sync, check, migracji i pomocnicze runtime
├── docs/                 Dokumentacja publiczna (ten katalog)
├── public/               Zasoby statyczne, manifest PWA, service worker
├── config/               Przykłady konfiguracji runtime
├── images/               Zasoby marketingowe / zrzuty ekranu
├── _ideia/, _references/, _mono_repo/, _tasks/   Wewnętrzne notatki / planowanie (nie wydawane)
├── CLAUDE.md             Reguły repo dla Claude Code
├── AGENTS.md             Głębsza referencja architektury dla agentów
├── package.json          v3.8.0, korzeń workspace
└── tsconfig.json         Aliasy ścieżek + główne opcje kompilatora
```

---

## 3. `src/` — Aplikacja Next.js

```
src/
├── app/                  Strony App Router + trasy API
├── lib/                  Biblioteki rdzeniowe (DB, auth, OAuth, skills, memory, …)
├── domain/               Czysta warstwa domenowa (policy, fallback, cost, lockout, …)
├── server/               Moduły tylko serwerowe (authz, cors, auth)
├── shared/               Typy, stałe, walidacja, kontrakty, utils (bezpieczne cross-boundary)
├── mitm/                 Pomocniki proxy MITM do integracji CLI
├── models/               Lokalne metadane modeli / aliasowanie
├── sse/                  Legacy handlery SSE nadal w src/ (nie open-sse/)
├── store/                Magazyny stanu po stronie klienta
├── middleware/           Narzędzia middleware na poziomie trasy (nie globalne middleware Next.js)
├── scripts/              Skrypty w drzewie importowalne przez kod aplikacji
├── types/                Ambient i współdzielone typy TS
├── i18n/                 Pakiety locale
├── instrumentation.ts    Hook instrumentation Next.js
├── instrumentation-node.ts
├── server-init.ts        Bootstrap na poziomie procesu (env, DB, jobs, sync)
└── proxy.ts              Pomocnik bootstrapu proxy najwyższego poziomu
```

### 3.1 `src/app/` — App Router

App Router udostępnia zarówno UI dashboardu, jak i publiczne/zarządcze HTTP API.
Nie ma **globalnego middleware** — przechwytywanie jest per-trasa.

Segmenty najwyższego poziomu w `src/app/`:

| Ścieżka                                                                       | Przeznaczenie                                |
| ----------------------------------------------------------------------------- | -------------------------------------------- |
| `api/`                                                                        | Wszystkie trasy HTTP API (rozbicie poniżej)  |
| `a2a/`                                                                        | A2A JSON-RPC 2.0 endpoint (`POST /a2a`)      |
| `.well-known/agent.json/`                                                     | Dokument discovery A2A Agent Card            |
| `(dashboard)/`                                                                | UI dashboardu (grupa tras, bez prefiksu URL) |
| `auth/`, `login/`, `forgot-password/`, `callback/`                            | Przepływy auth                               |
| `liing/`                                                                      | Marketing/liing page                         |
| `docs/`                                                                       | Wbudowana przeglądarka docs API              |
| `status/`, `maintenance/`, `offline/`                                         | Strony operacyjne                            |
| `privacy/`, `terms/`                                                          | Strony prawne                                |
| `400/`, `401/`, `403/`, `408/`, `429/`, `500/`, `502/`, `503/`                | Statyczne strony błędów                      |
| `error.tsx`, `global-error.tsx`, `not-found.tsx`, `forbidden/`, `loading.tsx` | Granice error/loading frameworka             |
| `layout.tsx`, `page.tsx`, `globals.css`, `manifest.ts`                        | Powłoka root                                 |

#### 3.1.1 `src/app/(dashboard)/dashboard/` — Strony UI

`agents`, `analytics`, `api-manager`, `audit`, `auto-combo`, `batch`, `cache`,
`changelog`, `cli-tools`, `cloud-agents`, `combos`, `compression`, `context`,
`costs`, `endpoint`, `health`, `limits`, `logs`, `memory`, `onboarding`,
`playground`, `providers`, `search-tools`, `settings`, `skills`, `system`,
`translator`, `usage`, `webhooks`, plus root `page.tsx`, `HomePageClient.tsx`,
`BootstrapBanner.tsx`.

#### 3.1.2 `src/app/api/` — Grupy API najwyższego poziomu

```
src/app/api/
├── a2a/{status, tasks}
├── acp/
├── admin/
├── analytics/
├── assess/
├── auth/
├── batches/
├── cache/
├── cli-tools/
├── cloud/{codex-responses-ws}
├── combos/
├── compliance/
├── compression/
├── context/
├── db/, db-backups/
├── evals/
├── fallback/
├── files/
├── health/
├── init/
├── internal/{concurrency}
├── keys/
├── logs/
├── mcp/{audit, sse, status, stream, tools}
├── memory/{health, [id]/, route.ts}
├── model-combo-mappings/
├── models/
├── monitoring/
├── oauth/
├── openapi/
├── policies/
├── pricing/
├── provider-metrics/, provider-models/, provider-nodes/
├── providers/
├── rate-limit/, rate-limits/
├── resilience/
├── restart/, shutdown/
├── search/
├── sessions/
├── settings/
├── skills/{executions, [id], install, marketplace, route.ts, skillssh}
├── storage/
├── sync/, synced-available-models/
├── system/
├── tags/
├── telemetry/
├── token-health/
├── translator/
├── tunnels/
├── services/   Zarządzanie usługami wbudowanymi (9router, cliproxy) — LOCAL_ONLY
├── upstream-proxy/
├── usage/
├── v1/         Publiczne API zgodne z OpenAI
├── v1beta/     Compat w stylu Gemini
├── version-manager/
└── webhooks/
```

#### 3.1.2a `src/app/api/services/` — Zarządzanie Embedded Services

Trasy do instalacji, startu, stopu i monitorowania 9Router oraz CLIProxyAPI.
Wszystkie ścieżki są sklasyfikowane jako **LOCAL_ONLY** (tylko loopback, hard rule #17), bo
mogą wywołać `npm install` i uruchamiać procesy potomne.

```
src/app/api/services/
├── 9router/
│   ├── _lib.ts             helper getOrInitSupervisor()
│   ├── install/route.ts    POST — npm install przez execFile
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install nowszej wersji
│   ├── rotate-key/route.ts POST — generuj nowy klucz API + restart
│   ├── status/route.ts     GET  — status live + DB + metadane wersji
│   └── auto-start/route.ts POST — przełącz flagę auto_start
├── cliproxy/
│   ├── _lib.ts             helper getOrInitSupervisor()
│   ├── install/route.ts    POST — npm install
│   ├── start/route.ts      POST — supervisor.start()
│   ├── stop/route.ts       POST — supervisor.stop()
│   ├── restart/route.ts    POST — supervisor.restart()
│   ├── update/route.ts     POST — npm install nowszej wersji
│   ├── status/route.ts     GET  — status live + DB + metadane wersji
│   └── auto-start/route.ts POST — przełącz flagę auto_start
└── [name]/
    └── logs/route.ts       GET  — SSE log tail (współdzielone przez wszystkie usługi)
```

Odpowiednie UI dashboardu:
`src/app/(dashboard)/dashboard/providers/services/` — strona z dwiema zakładkami (CLIProxyAPI + 9Router).
Reverse proxy dla wbudowanego UI 9Router:
`src/app/(dashboard)/dashboard/providers/services/[name]/embed/[...path]/route.ts`

Deep-dive: `docs/frameworks/EMBEDDED-SERVICES.md`

#### 3.1.3 `src/app/api/v1/` — Publiczne API zgodne z OpenAI

```
v1/
├── accounts/[id]/                       lookup konta
├── agents/tasks/[id]/, agents/tasks/    endpointy tasków w stylu A2A
├── api/                                 wewnętrzne helpery API pod v1/api
├── audio/{speech, transcriptions}/      TTS + STT
├── batches/[id]/{cancel}, batches/      OpenAI Batches API
├── chat/completions/                    Chat Completions (główny endpoint)
├── chatgpt-web/                         compat ChatGPT-Web
├── completions/                         Legacy text completions
├── embeddings/                          Embeddings
├── files/[id]/, files/                  Pliki API
├── _helpers/                            Współdzielone helpery tras (bez publicznego URL)
├── images/{edits, generations}/         Generowanie + edycja obrazów
├── issues/                              Endpointy pomocnicze triage
├── management/{proxies}/                Trasy w zakresie management wewnątrz v1
├── messages/{count_tokens}/             Compat messages w stylu Anthropic
├── models/                              Lista modeli (`route.ts`, `catalog.ts`)
├── moderations/                         Moderation
├── music/                               Generowanie muzyki
├── providers/[provider]/                Operacje per-provider
├── quotas/{check}                       Sondy quota
├── registered-keys/                     Admin zarejestrowanych kluczy
├── rerank/                              Reranking
├── responses/[...path]/                 OpenAI Responses API (catch-all)
├── search/                              Wyszukiwanie w sieci
├── videos/                              Generowanie wideo
├── ws/                                  Most WebSocket
└── route.ts                             Hiler indeksu
```

Każdy plik trasy stosuje ten sam wzorzec:

```
Route → CORS preflight → walidacja body Zod → opcjonalny auth
      → egzekwowanie polityki klucza API → delegacja do handlera (open-sse)
```

`v1beta/` to powierzchnia compat w stylu Gemini (cienka warstwa, która tłumaczy do
tego samego pipeline'u `open-sse/handlers/`).

### 3.2 `src/lib/` — Biblioteki rdzeniowe

Zawsze importuj dane, sync, OAuth, skill, memory itd. przez te moduły. Tabela
grupuje rzeczywiste katalogi i istotne pliki najwyższego poziomu.

| Moduł             | Przeznaczenie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`            | Serwer protokołu A2A: `taskManager.ts`, `streaming.ts`, `taskExecution.ts`, `routingLogger.ts`, `skills/` (6 skilli: cost analysis, health report, provider discovery, quota management, smart routing, list-capabilities)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `acp/`            | Agent-Control-Protocol: `index.ts`, `manager.ts`, `registry.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `api/`            | Wewnętrzne helpery API: `requireManagementAuth.ts`, `requireCliToolsAuth.ts`, `errorResponse.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `auth/`           | `managementPassword.ts` (reset hasła / hashowanie)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `batches/`        | Usługa OpenAI Batches API (`service.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `catalog/`        | Sync katalogu OpenRouter (`openrouterCatalog.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `cloudAgent/`     | Rejestr cloud agent: `api.ts`, `baseAgent.ts`, `db.ts`, `index.ts`, `registry.ts`, `types.ts`, `agents/{codex, devin, jules}.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `combos/`         | Helpery resolucji combo                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `compliance/`     | Audit + provider audit: `index.ts`, `providerAudit.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `config/`         | Klej konfiguracji runtime                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `db/`             | Moduły domenowe SQLite (zob. §3.2.1)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `display/`        | Helpery UI/display używane przez odpowiedzi API                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `embeddings/`     | Rejestr usług embedding                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `env/`            | Ładowanie env + introspekcja                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `evals/`          | Runtime ewaluacji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `guardrails/`     | `piiMasker.ts`, `promptInjection.ts`, `visionBridge.ts`, `visionBridgeHelpers.ts`, `registry.ts`, `base.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `jobs/`           | Zadania w tle (`autoUpdate.ts`, …)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `memory/`         | Trwała pamięć: `store.ts`, `cache.ts`, `retrieval.ts`, `summarization.ts`, `extraction.ts`, `injection.ts`, `qdrant.ts`, `settings.ts`, `verify.ts`, `schemas.ts`, `types.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `monitoring/`     | `observability.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `oauth/`          | Providery OAuth (13): `antigravity`, `claude`, `cline`, `codex`, `cursor`, `gemini`, `github`, `gitlab-duo`, `kilocode`, `kimi-coding`, `kiro`, `qoder`, `windsurf` plus `services/`, `utils/{pkce, server, banner, codexAuthFile, ui}`, `constants/oauth.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `plugins/`        | Loader wtyczek (`index.ts`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `promptCache/`    | `prefixAnalyzer.ts`, `index.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `providerModels/` | Cykl życia managed models: `modelDiscovery.ts`, `managedModelImport.ts`, `managedAvailableModels.ts`, `cursorAgent.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `providers/`      | Helpery providerów: `catalog.ts`, `validation.ts`, `imageValidation.ts`, `claudeExtraUsage.ts`, `codexConnectionDefaults.ts`, `codexFastTier.ts`, `webCookieAuth.ts`, `managedAvailableModels.ts`, `requestDefaults.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `resilience/`     | `settings.ts` — ustawienia circuit breakera, cooldown, lockout                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `runtime/`        | Wykrywanie feature'ów runtime                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `search/`         | `executeWebSearch.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `services/`       | Framework usług wbudowanych: `ServiceSupervisor.ts` (generyczny supervisor procesów potomnych z operation lock, ring buffer, health checker), `bootstrap.ts` (process-level registration i auto-start), `registry.ts` (mapa tool → supervisor), `apiKey.ts` (magazyn kluczy AES-256-GCM), `modelSync.ts` (okresowy sync modeli), `ringBuffer.ts` (okrągły bufor logów 5 MB), `healthCheck.ts` (sonda health HTTP), `types.ts`, `embedWsProxy.ts` (proxy WebSocket), `installers/{ninerouter,cliproxy}.ts`. See `docs/frameworks/EMBEDDED-SERVICES.md`                                                                                                                                          |
| `agentSkills/`    | Katalog + generator Agent Skills: `catalog.ts` (getCatalog/getSkillById/filterCatalog/computeCoverage), `generator.ts` (generateAgentSkills → zapisuje `skills/{id}/SKILL.md`), `openapiParser.ts` (wyciąga endpointy REST ze specyfikacji OpenAPI), `cliRegistryParser.ts` (extracts CLI subcommands from bin/cli-registry), `schemas.ts` (Zod: AgentSkillSchema, SkillCoverageSchema, ListQuerySchema, GenerateBodySchema), `types.ts` (AgentSkill, SkillCoverage, SkillMarkdown, GeneratorReport). Konsumowane przez trasy REST (`/api/agent-skills/*`), narzędzia MCP (`omniroute_agent_skills_*`), i A2A skill `list-capabilities`. See [AGENT-SKILLS.md](../frameworks/AGENT-SKILLS.md). |
| `skills/`         | Framework skilli: `registry.ts`, `executor.ts`, `interception.ts`, `injection.ts`, `sibox.ts`, `custom.ts`, `hybrid.ts`, `builtins.ts`, `a2a.ts`, `providerSettings.ts`, `schemas.ts`, `skillssh.ts`, `types.ts`, plus `builtin/browser.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `spend/`          | `batchWriter.ts` (bufor write-behind)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `sync/`           | `bundle.ts`, `tokens.ts` (Cloud Sync)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `system/`         | Helpery systemowe                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `translator/`     | Klej translatora najwyższego poziomu (deleguje do `open-sse/translator/`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `usage/`          | Księgowanie użycia: `costCalculator.ts`, `tokenAccounting.ts`, `usageHistory.ts`, `aggregateHistory.ts`, `usageStats.ts`, `callLogs.ts`, `callLogArtifacts.ts`, `fetcher.ts`, `providerLimits.ts`, `migrations.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `versionManager/` | Auto-update + manifest wersji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `ws/`             | Most WebSocket                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `zed-oauth/`      | Przepływ OAuth edytora Zed                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |

Pliki najwyższego poziomu w `src/lib/`:

- `localDb.ts` — wyłącznie warstwa re-export. **Nigdy** nie dodawaj tu logiki.
- `proxyHealth.ts`, `proxyLogger.ts`, `tokenHealthCheck.ts`, `localHealthCheck.ts`
- `oneproxyRotator.ts`, `oneproxySync.ts`
- `apiBridgeServer.ts`, `cacheLayer.ts`, `semanticCache.ts`, `settingsCache.ts`
- `cloudSync.ts`, `initCloudSync.ts`
- `cloudflaredTunnel.ts`, `ngrokTunnel.ts`, `tailscaleTunnel.ts`
- `consoleInterceptor.ts`, `container.ts`, `gracefulShutdown.ts`, `idempotencyLayer.ts`
- `ipUtils.ts`, `logEnv.ts`, `logPayloads.ts`, `logRotation.ts`
- `modelAliasSeed.ts`, `modelCapabilities.ts`, `modelMetadataRegistry.ts`, `modelsDevSync.ts`
- `piiSanitizer.ts`, `pricingSync.ts`
- `apiKeyExposure.ts`, `cacheControlSettings.ts`, `dataPaths.ts`, `toolPolicy.ts`
- `translatorEvents.ts`, `usageDb.ts`, `usageAnalytics.ts`, `webhookDispatcher.ts`

#### 3.2.1 `src/lib/db/`

Singletonowa baza SQLite (`getDbInstance()` w `core.ts`, journalowanie WAL).
**Nigdy nie pisz surowego SQL w trasach ani handlerach** — idź przez te moduły.

![Przegląd schematu bazy (wybrane tabele rdzeniowe)](../diagrams/exported/db-schema-overview.svg)

> Źródło: [diagrams/db-schema-overview.mmd](../diagrams/db-schema-overview.mmd)

Moduły domenowe (każdy posiada jedną lub więcej tabel): `apiKeys.ts`, `backup.ts`,
`batches.ts`, `cleanup.ts`, `cliToolState.ts`, `combos.ts`,
`commiCodeAuth.ts`, `compression.ts`, `compressionAnalytics.ts`,
`compressionCacheStats.ts`, `compressionCombos.ts`, `compressionScheduler.ts`,
`contextHioffs.ts`, `core.ts`, `creditBalance.ts`, `databaseSettings.ts`,
`detailedLogs.ts`, `domainState.ts`, `encryption.ts`, `evals.ts`, `files.ts`,
`healthCheck.ts`, `jsonMigration.ts`, `migrationRunner.ts`,
`modelComboMappings.ts`, `models.ts`, `oneproxy.ts`, `prompts.ts`,
`providers.ts`, `providerLimits.ts`, `proxies.ts`, `quotaSnapshots.ts`,
`readCache.ts`, `reasoningCache.ts`, `registeredKeys.ts`, `secrets.ts`,
`sessionAccountAffinity.ts`, `settings.ts`, `stateReset.ts`, `stats.ts`,
`syncTokens.ts`, `tierConfig.ts`, `upstreamProxy.ts`, `versionManager.ts`,
`webhooks.ts`.

`migrations/` zawiera 55 wersjonowanych plików `.sql` (idempotentne, transakcyjne) i jest
wykonywany przez `migrationRunner.ts` przy starcie.

Tabele utworzone w migracjach (łącznie 52):

`a`, `account_key_limits`, `api_keys`, `batches`, `call_logs`,
`combo_adaptation_state`, `combos`, `commi_code_auth_sessions`,
`compression_analytics`, `compression_cache_stats`,
`compression_combo_assignments`, `compression_combos`, `context_hioffs`,
`daily_usage_summary`, `db_meta`, `domain_budgets`, `domain_circuit_breakers`,
`domain_cost_history`, `domain_fallback_chains`, `domain_lockout_state`,
`eval_cases`, `eval_runs`, `eval_suites`, `files`, `hourly_usage_summary`,
`key_value`, `mcp_tool_audit`, `memories`, `model_combo_mappings`,
`provider_connections`, `provider_key_limits`, `provider_nodes`,
`proxy_assignments`, `proxy_logs`, `proxy_registry`, `quota_snapshots`,
`reasoning_cache`, `registered_keys`, `request_detail_logs`,
`routing_decisions`, `semantic_cache`, `session_account_affinity`,
`skill_executions`, `skills`, `sync_tokens`, `tier_assignments`,
`tier_config`, `upstream_proxy_config`, `usage_history`, `version_manager`,
`webhooks` (plus wirtualne tabele FTS5 do wyszukiwania w memory).

### 3.3 `src/domain/` — Warstwa domenowa

Czysta logika biznesowa, bez I/O. Importowana przez trasy i handlery.

| Plik                                       | Przeznaczenie                                     |
| ------------------------------------------ | ------------------------------------------------- |
| `policyEngine.ts`                          | Resolver polityki najwyższego poziomu             |
| `fallbackPolicy.ts`                        | Drzewo decyzji fallbacku                          |
| `costRules.ts`                             | Reguły kalkulacji kosztów                         |
| `lockoutPolicy.ts`                         | Decyzje lockout modelu                            |
| `tagRouter.ts`                             | Routing oparty na tagach                          |
| `comboResolver.ts`                         | Resolucja combo z requestu → lista targetów       |
| `connectionModelRules.ts`                  | Filtry modeli per-połączenie                      |
| `modelAvailability.ts`                     | Sprawdzanie dostępności modelu                    |
| `degradation.ts`                           | Przejścia trybu zdegradowanego                    |
| `providerExpiration.ts`                    | Wykrywanie wygasłego konta/klucza                 |
| `quotaCache.ts`                            | Cache'owane decyzje quota                         |
| `responses.ts`, `omnirouteResponseMeta.ts` | Helpery kształtu odpowiedzi                       |
| `configAudit.ts`                           | Audyt zmian konfiguracji                          |
| `assessment/`                              | Ocena modelu (wg RFC, częściowo zaimplementowane) |
| `types.ts`                                 | Współdzielone typy domenowe                       |

### 3.4 `src/server/` — Tylko serwer

Nie może być importowany z komponentów klienckich.

```
server/
├── auth/loginGuard.ts
├── authz/
│   ├── classify.ts        Klasyfikuje trasy jako public vs management
│   ├── assertAuth.ts      Helper asercji
│   ├── context.ts         Kontekst authz per-request
│   ├── headers.ts
│   ├── pipeline.ts        Pipeline authz
│   ├── policies/          Konkretne polityki
│   └── types.ts
└── cors/origins.ts        Allowlista origin CORS
```

### 3.5 `src/shared/` — Bezpieczne do współdzielenia

Podzielone na skupione podkatalogi:

- `constants/` — `providers.ts` (katalog providerów walidowany Zod), `models.ts`,
  `modelSpecs.ts`, `modelCompat.ts`, `pricing.ts`, `cliTools.ts`,
  `cliCompatProviders.ts`, `routingStrategies.ts`, `comboConfigMode.ts`,
  `headers.ts`, `upstreamHeaders.ts` (denylist), `mcpScopes.ts`,
  `errorCodes.ts`, `publicApiRoutes.ts`, `batch.ts`, `batchEndpoints.ts`,
  `bodySize.ts`, `colors.ts`, `appConfig.ts`, `config.ts`,
  `sidebarVisibility.ts`, `visionBridgeDefaults.ts`.
- `validation/` — `schemas.ts` (~80 schematów Zod), `compressionConfigSchemas.ts`,
  `oneproxySchemas.ts`, `providerSchema.ts`, `settingsSchemas.ts`, `helpers.ts`.
- `contracts/` — publiczne kontrakty API dostarczane do npm.
- `types/` — współdzielone typy TS.
- `utils/` — `circuitBreaker.ts`, `apiAuth.ts`, `apiKey.ts`, `apiKeyPolicy.ts`,
  `apiResponse.ts`, `api.ts`, `classify429.ts`, `cliCompat.ts`, `clipboard.ts`,
  `cloud.ts`, `cn.ts`, `cors.ts`, `costEstimator.ts`, `featureFlags.ts`,
  `fetchTimeout.ts`, `formatting.ts`, `inputSanitizer.ts`, `logger.ts`,
  `machine.ts`, `machineId.ts`, `maskEmail.ts`, `modelCatalogSearch.ts`,
  `nodeRuntimeSupport.ts`, `parseApiKeys.ts`, `providerHints.ts`,
  `providerModelAliases.ts`, `rateLimiter.ts`, `releaseNotes.ts`,
  `a11yAudit.ts`, plus hooki/komponenty dashboardu w `services/`, `network/`,
  `middleware/`, `schemas/`, `hooks/`, `components/`.

---

## 4. `open-sse/` — Workspace silnika streamingu

Osobny npm workspace publikowany jako `@omniroute/open-sse`. Odpowiada za
przetwarzanie requestów, executory, translatory, services, transformer i serwer MCP.

```
open-sse/
├── index.ts                Publiczne eksporty
├── package.json            Manifest workspace
├── tsconfig.json
├── types.d.ts
├── config/                 Rejestry providerów, profile nagłówków, identity, …
├── handlers/               Hilery requestów (chat, embeddings, audio, image, …)
├── executors/              84 executory HTTP specyficzne dla providerów
├── translator/             Konwersja formatów (OpenAI ↔ Claude ↔ Gemini ↔ Cursor ↔ Kiro)
├── transformer/            Transformer strumienia Responses API ↔ Chat Completions
├── services/               80+ modułów services (combos, fallback, quotas, identity, …)
├── utils/                  Helpery streamingu, klient TLS, AWS SigV4, proxy fetch, …
└── mcp-server/             serwer MCP (3 transports, 32 scopes, 99 tools)
```

### 4.1 `open-sse/handlers/`

| Hiler                   | Przeznaczenie                                                                |
| ----------------------- | ---------------------------------------------------------------------------- |
| `chatCore.ts`           | Główny pipeline chatu (cache, rate limit, routing combo, dispatch executora) |
| `responsesHiler.ts`     | Punkt wejścia OpenAI Responses API                                           |
| `embeddings.ts`         | Embeddings                                                                   |
| `imageGeneration.ts`    | Generowanie obrazów                                                          |
| `audioSpeech.ts`        | Text-to-speech                                                               |
| `audioTranscription.ts` | Speech-to-text                                                               |
| `videoGeneration.ts`    | Generowanie wideo                                                            |
| `musicGeneration.ts`    | Generowanie muzyki                                                           |
| `rerank.ts`             | Reranking                                                                    |
| `moderations.ts`        | Moderacja                                                                    |
| `search.ts`             | Wyszukiwanie w sieci                                                         |
| `sseParser.ts`          | Parser eventów SSE                                                           |
| `usageExtractor.ts`     | Wyciąganie liczby tokenów ze strumieni upstream                              |
| `responseSanitizer.ts`  | Usuwanie szumu specyficznego dla providera                                   |
| `responseTranslator.ts` | Klej między odpowiedzią providera a warstwą translatora                      |

### 4.2 `open-sse/executors/`

84 executory providerów, każdy rozszerza `BaseExecutor` (`base.ts`):

`antigravity`, `azure-openai`, `blackbox-web`, `chatgpt-web`, `cliproxyapi`,
`cloudflare-ai`, `codex`, `commiCode`, `cursor`, `default`, `devin-cli`,
`muse-spark-web`, `nlpcloud`, `opencode`, `perplexity-web`, `petals`,
`pollinations`, `puter`, `qoder`, `vertex`, `windsurf`, plus `claudeIdentity.ts`
(współdzielony helper identity) i `index.ts` (rejestr).

> Uwaga: providery niewymienione tutaj są obsługiwane przez `default.ts` z generycznym
> executorem zgodnym z OpenAI. Pełny katalog providerów (268 wpisów) jest w
> `src/shared/constants/providers.ts`.

### 4.3 `open-sse/translator/`

Tłumaczenie hub-i-spoke (OpenAI jest hubem).

- **9 translatorów request** (`translator/request/`):
  `antigravity-to-openai`, `claude-to-gemini`, `claude-to-openai`,
  `gemini-to-openai`, `openai-responses`, `openai-to-claude`,
  `openai-to-cursor`, `openai-to-gemini`, `openai-to-kiro`.
- **9 translatorów response** (`translator/response/`):
  `claude-to-openai`, `cursor-to-openai`, `gemini-to-claude`, `gemini-to-openai`,
  `kiro-to-openai`, `openai-responses`, `openai-to-antigravity`,
  `openai-to-claude`.
- **9 helperów** (`translator/helpers/`):
  `claudeHelper`, `geminiHelper`, `geminiToolsSanitizer`, `maxTokensHelper`,
  `openaiHelper`, `responsesApiHelper`, `schemaCoercion`, `toolCallHelper`, plus
  testy helperów.
- **Helpery obrazów** (`translator/image/sizeMapper.ts`).
- Najwyższy poziom: `bootstrap.ts`, `formats.ts`, `registry.ts`, `index.ts`.

### 4.4 `open-sse/transformer/`

- `responsesTransformer.ts` — konwerter Responses API ↔ Chat oparty na `TransformStream`
  Completions (używany przez catch-all trasy `responses/`).

### 4.5 `open-sse/services/`

Wyróżniki (pełna lista w `open-sse/services/`):

| Zagadnienie           | Pliki                                                                                                                                                                                                                                           |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Combo routing         | `combo.ts` (17 strategies), `comboConfig.ts`, `comboMetrics.ts`, `comboManifestMetrics.ts`, `comboAgentMiddleware.ts`                                                                                                                           |
| Silnik Auto Combo     | `autoCombo/` — `engine.ts`, `scoring.ts`, `taskFitness.ts`, `virtualFactory.ts`, `modePacks.ts`, `autoPrefix.ts`, `persistence.ts`, `providerDiversity.ts`, `providerRegistryAccessor.ts`, `routerStrategy.ts`, `selfHealing.ts`, `index.ts`    |
| Resilience            | `accountFallback.ts` (cooldown + lockout), `errorClassifier.ts`, `emergencyFallback.ts`, `rateLimitManager.ts`, `rateLimitSemaphore.ts`, `accountSemaphore.ts`, `accountSelector.ts`                                                            |
| Quotas                | `quotaMonitor.ts`, `quotaPreflight.ts`, `bailianQuotaFetcher.ts`, `codexQuotaFetcher.ts`, `deepseekQuotaFetcher.ts`, `openrouterQuotaFetcher.ts`, `openrouterFreeWindow.ts`, `crofUsageFetcher.ts`, `antigravityCredits.ts`                     |
| Caching               | `reasoningCache.ts`, `searchCache.ts`, `signatureCache.ts`, `requestDedup.ts`                                                                                                                                                                   |
| Inteligencja routingu | `intentClassifier.ts`, `taskAwareRouter.ts`, `backgroundTaskDetector.ts`, `volumeDetector.ts`, `wildcardRouter.ts`, `workflowFSM.ts`, `specificityDetector.ts`, `specificityRules.ts`, `specificityTypes.ts`                                    |
| Obsługa modeli        | `modelCapabilities.ts`, `modelDeprecation.ts`, `modelFamilyFallback.ts`, `modelStrip.ts`, `model.ts`, `provider.ts`, `providerRequestDefaults.ts`, `providerCostData.ts`, `payloadRules.ts`                                                     |
| Compression           | `compression/` — pełne okablowanie silnika kompresji                                                                                                                                                                                            |
| Token + sesja         | `tokenRefresh.ts`, `sessionManager.ts`, `apiKeyRotator.ts`, `contextManager.ts`, `contextHioff.ts`, `systemPrompt.ts`, `roleNormalizer.ts`, `responsesInputSanitizer.ts`, `toolSchemaSanitizer.ts`, `toolLimitDetector.ts`, `thinkingBudget.ts` |
| Tier / manifest       | `tierResolver.ts`, `tierConfig.ts`, `tierDefaults.json`, `tierTypes.ts`, `manifestAdapter.ts`                                                                                                                                                   |
| IP / sieć             | `ipFilter.ts`, `webSearchFallback.ts`                                                                                                                                                                                                           |
| Batches               | `batchProcessor.ts`                                                                                                                                                                                                                             |
| Usage                 | `usage.ts`                                                                                                                                                                                                                                      |

### 4.6 `open-sse/mcp-server/`

- **31 registered tools** wired in `server.ts` (12 scoped under `schemas/tools.ts`,
  5 compression tools, 3 memory tools, 4 skills tools, plus advanced tools added
  through `advancedTools.ts`).
- **3 transports**: stdio, HTTP Streamable, SSE.
- **13 scopes** declared in `src/shared/constants/mcpScopes.ts`.
- Audit table: `mcp_tool_audit` (populated by `audit.ts`).
- Pliki: `server.ts`, `index.ts`, `httpTransport.ts`, `audit.ts`, `scopeEnforcement.ts`,
  `runtimeHeartbeat.ts`, `descriptionCompressor.ts`, `schemas/{tools, a2a, audit, index}.ts`,
  `tools/{advancedTools, compressionTools, memoryTools, skillTools}.ts`,
  plus tests under `__tests__/`.
- See [MCP-SERVER.md](../frameworks/MCP-SERVER.md) for the full tool catalog.

### 4.7 `open-sse/config/`

Provider registries (`providerRegistry.ts`, `providerModels.ts`,
`providerHeaderProfiles.ts`), per-format model registries (`audioRegistry.ts`,
`embeddingRegistry.ts`, `imageRegistry.ts`, `moderationRegistry.ts`,
`musicRegistry.ts`, `rerankRegistry.ts`, `searchRegistry.ts`, `videoRegistry.ts`),
identity helpers (`codexIdentity.ts`, `codexInstructions.ts`,
`anthropicHeaders.ts`, `antigravityUpstream.ts`, `antigravityModelAliases.ts`,
`cliFingerprints.ts`, `toolCloaking.ts`, `defaultThinkingSignature.ts`),
credential helpers (`credentialLoader.ts`, `codexClient.ts`), i cloud
adapters (`azureAi.ts`, `bedrock.ts`, `datarobot.ts`, `glmProvider.ts`,
`maritalk.ts`, `oci.ts`, `petals.ts`, `runway.ts`, `sap.ts`, `watsonx.ts`,
`ollamaModels.ts`, `errorConfig.ts`, `constants.ts`, `registryUtils.ts`).

### 4.8 `open-sse/utils/`

Streaming primitives i provider helpers: `stream.ts`, `streamHiler.ts`,
`streamHelpers.ts`, `streamPayloadCollector.ts`, `streamReadiness.ts`,
`sseHeartbeat.ts`, `proxyFetch.ts`, `proxyDispatcher.ts`, `tlsClient.ts`,
`networkProxy.ts`, `awsSigV4.ts`, `cacheControlPolicy.ts`,
`cursorChecksum.ts`, `cursorAgentProtobuf.ts`, `cursorVersionDetector.ts`,
`comfyuiClient.ts`, `kieTask.ts`, `bypassHiler.ts`, `aiSdkCompat.ts`,
`thinkTagParser.ts`, `urlSanitize.ts`, `usageTracking.ts`, `requestLogger.ts`,
`progressTracker.ts`, `cors.ts`, `error.ts`, `logger.ts`, `sleep.ts`,
`ollamaTransform.ts`.

---

## 5. `electron/` — Opakowanie desktopowe

```
electron/
├── main.js                  Proces main Electron
├── preload.js               Most preload (contextIsolation włączony)
├── types.d.ts
├── package.json             konfiguracja electron-builder, wersja 3.8.0
├── README.md
├── assets/                  Zasoby build (ikony, entitlements, …)
├── node_modules/            Dedykowane node_modules (better-sqlite3, electron-updater)
└── dist-electron/           Wynik build (nie commitowany)
```

Pięć skryptów npm w korzeniu workspace: `electron:dev`, `electron:build`,
`electron:build:{win,mac,linux}`, `electron:smoke:packaged`. Auto-update przez
`electron-updater` wskazujący na feed wydań GitHub.

---

## 6. `bin/` — CLI

```
bin/
├── omniroute.mjs           Główne wejście CLI (Node ESM)
├── reset-password.mjs      Reset hasła management z CLI
├── mcp-server.mjs          Launcher serwera MCP (stdio)
├── nodeRuntimeSupport.mjs  Strażnik wersji Node
└── cli/
    ├── program.mjs         Builder programu Commander
    ├── runtime.mjs         helper withRuntime (server-first/db-fallback)
    ├── output.mjs          Formattery wyjścia (json/jsonl/table/csv)
    ├── i18n.mjs            helper t() z locale
    ├── api.mjs             Helper fetch API
    ├── data-dir.mjs
    ├── encryption.mjs
    ├── sqlite.mjs
    └── commands/
        ├── registry.mjs    Rejestracja komend
        ├── setup.mjs
        ├── doctor.mjs
        ├── providers.mjs
        └── ...             (jeden plik na komendę/grupę)
```

Dwa binaria są wystawione w `package.json` → `bin`:

- `omniroute` → `bin/omniroute.mjs`
- `omniroute-reset-password` → `bin/reset-password.mjs`

---

## 7. `tests/`

| Katalog                                                                        | Typ                                                                                                       |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------- |
| `tests/unit/`                                                                  | Testy jednostkowe przez Node native test runner (1821 plików, plus `api/`, `auth/`, `authz/` podkatalogi) |
| `tests/integration/`                                                           | Testy cross-module + stan DB                                                                              |
| `tests/e2e/`                                                                   | Playwright UI tests                                                                                       |
| `tests/protocols-e2e/`                                                         | MCP/A2A protocol e2e                                                                                      |
| `tests/translator/`                                                            | Translator-specific tests                                                                                 |
| `tests/security/`                                                              | Security regressions                                                                                      |
| `tests/load/`                                                                  | Load / stress tests                                                                                       |
| `tests/golden-set/`                                                            | Reference outputs for translator regressions                                                              |
| `tests/helpers/`, `tests/fixtures/`, `tests/manual/`, `tests/scratch_test.mjs` | Support                                                                                                   |

Common commands:

| Command                                                  | What it runs                                                     |
| -------------------------------------------------------- | ---------------------------------------------------------------- |
| `npm run test:unit`                                      | All `tests/unit/*.test.ts` via Node test runner (concurrency 10) |
| `npm run test:vitest`                                    | Vitest suite (MCP, autoCombo, cache)                             |
| `npm run test:e2e`                                       | Pakiet UI Playwright                                             |
| `npm run test:protocols:e2e`                             | e2e protokołów MCP + A2A                                         |
| `npm run test:coverage`                                  | Coverage gate (≥60% lines/statements/functions/branches)         |
| `node --import tsx/esm --test tests/unit/<file>.test.ts` | Single file run                                                  |

---

## 8. `scripts/`

Zorganizowane w 6 podkatalogów według przeznaczenia.

- **`scripts/build/`** — `build-next-isolated.mjs`, `prepublish.ts`,
  `prepare-electron-standalone.mjs`, `pack-artifact-policy.ts`,
  `validate-pack-artifact.ts`, `postinstall.mjs`, `postinstallSupport.mjs`,
  `uninstall.mjs`, `bootstrap-env.mjs`, `runtime-env.mjs`,
  `native-binary-compat.mjs`.
- **`scripts/dev/`** — `run-next.mjs`, `run-next-playwright.mjs`,
  `run-standalone.mjs`, `standalone-server-ws.mjs`, `responses-ws-proxy.mjs`,
  `v1-ws-bridge.mjs`, `smoke-electron-packaged.mjs`,
  `run-playwright-tests.mjs`, `run-ecosystem-tests.mjs`,
  `run-protocol-clients-tests.mjs`, `sync-env.mjs`, `healthcheck.mjs`,
  `system-info.mjs`.
- **`scripts/check/`** — `check-cycles.mjs`, `check-docs-sync.mjs`,
  `check-docs-counts-sync.mjs`, `check-env-doc-sync.mjs`,
  `check-deprecated-versions.mjs`, `check-route-validation.mjs`,
  `check-t11-any-budget.mjs`, `check-pr-test-policy.mjs`,
  `check-supported-node-runtime.ts`, `test-report-summary.mjs`.
- **`scripts/docs/`** — `generate-docs-index.mjs`, `gen-provider-reference.ts`.
- **`scripts/i18n/`** — `generate-multilang.mjs`, `run-visual-qa.mjs`,
  `generate-qa-checklist.mjs`, `apply-priority-overrides.mjs`,
  `validate_translation.py`, `check_translations.py`, `i18n_autotranslate.py`,
  `untranslatable-keys.json`.
- **`scripts/ad-hoc/`** — `cursor-tap.cjs`, `sync-cursor-models.mjs`,
  `migrate-env.mjs`, `dbsetup.js`.

---

## 9. Pipeline requestu (podsumowanie)

![Pipeline requestu (/v1/chat/completions)](../diagrams/exported/request-pipeline.svg)

> Źródło: [diagrams/request-pipeline.mmd](../diagrams/request-pipeline.mmd)

```
Client request
  → /v1/chat/completions (route.ts)
     CORS preflight check
     Zod validation (chatCompletionsSchema in shared/validation/schemas.ts)
     Auth (extractApiKey + isValidApiKey OR requireManagementAuth)
     Policy engine (src/server/authz/pipeline.ts)
     Guardrails (PII masker, prompt injection, vision bridge)
  → handleChatCore() (open-sse/handlers/chatCore.ts)
     Cache check (semantic + read cache)
     Rate limit (rateLimitManager, accountSemaphore)
     Combo routing (if model resolves to a combo)
       comboResolver → loop per target → handleSingleModel()
     translateRequest()  (open-sse/translator/request/*)
     getExecutor(providerId).execute()  (open-sse/executors/*)
       fetch upstream → retry/backoff via accountFallback
     translateResponse() (open-sse/translator/response/*)
     SSE stream OR JSON response
     Jeśli Responses API: TransformStream via open-sse/transformer/responsesTransformer.ts
  → Compliance audit (src/lib/compliance/)
  → Odpowiedź do klienta
```

### Stan runtime resilience (trzy mechanizmy)

| Mechanizm                | Zakres                        | Gdzie                                                                                                             |
| ------------------------ | ----------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Provider circuit breaker | Cały provider                 | `src/shared/utils/circuitBreaker.ts`, utrwalany w `domain_circuit_breakers`                                       |
| Connection cooldown      | Jedno konto/klucz             | `markAccountUnavailable()` w `src/sse/services/auth.ts`; konsumowany przez `accountFallback.checkFallbackError()` |
| Model lockout            | Provider + connection + model | `open-sse/services/accountFallback.ts`, utrwalany w `domain_lockout_state`                                        |

Zob. [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) oraz dedykowaną sekcję w
[CLAUDE.md](../../CLAUDE.md).

---

## 10. Jak współtworzyć

### Dodaj nowego providera

1. Zarejestruj w `src/shared/constants/providers.ts` (walidacja Zod przy ładowaniu).
2. Dodaj executor w `open-sse/executors/`, jeśli wymagana jest własna logika
   (rozszerz `BaseExecutor`).
3. Dodaj translator w `open-sse/translator/`, jeśli nie mówi formatem OpenAI.
4. Jeśli OAuth, dodaj konfigurację w `src/lib/oauth/providers/` oraz
   `src/lib/oauth/services/`.
5. Zarejestruj modele w `open-sse/config/providerRegistry.ts` (lub w rejestrze
   specyficznym dla formatu w `open-sse/config/`).
6. Napisz testy w `tests/unit/`.

### Dodaj nową trasę API

1. Utwórz `src/app/api/your-route/route.ts`.
2. Stosuj wzorzec: CORS → walidacja body Zod → auth → delegacja do handlera.
3. Jeśli nowy kształt requestu: dodaj schemat Zod w `src/shared/validation/schemas.ts`.
4. Jeśli tylko management: dodaj ścieżkę do `src/shared/constants/publicApiRoutes.ts`
   (denylist dla publicznej powierzchni API).
5. Dodaj testy w `tests/unit/`.
6. Zaktualizuj `docs/reference/API_REFERENCE.md` oraz `docs/openapi.yaml`.

### Dodaj nowy moduł DB

1. Utwórz `src/lib/db/yourModule.ts` i importuj `getDbInstance()` z `./core.ts`.
2. Eksportuj funkcje CRUD dla swojej domeny.
3. Jeśli nowe tabele: dodaj migrację w `src/lib/db/migrations/`, numerowaną
   sekwencyjnie, idempotentną, transakcyjną.
4. Re-export z `src/lib/localDb.ts` (tylko re-export — **bez logiki**).
5. Dodaj testy w `tests/unit/`.

### Dodaj nowe narzędzie MCP

1. Dodaj definicję narzędzia w `open-sse/mcp-server/tools/` (lub rozszerz
   `open-sse/mcp-server/schemas/tools.ts`).
2. Przypisz odpowiednie scope'y w `src/shared/constants/mcpScopes.ts`.
3. Zarejestruj narzędzie w `open-sse/mcp-server/server.ts`.
4. Dodaj testy w `open-sse/mcp-server/__tests__/`.
5. Zaktualizuj [MCP-SERVER.md](../frameworks/MCP-SERVER.md).

### Dodaj nowy skill A2A

Zob. [A2A-SERVER.md § Adding a New Skill](../frameworks/A2A-SERVER.md). Skille żyją w
`src/lib/a2a/skills/` i są rejestrowane przez task manager A2A.

---

## 11. Konwencje

- **Styl kodu**: wcięcie 2 spacje, podwójne cudzysłowy, szerokość 100 znaków, średniki,
  trailing commas `es5` — egzekwowane przez Prettier via `lint-staged`.
- **Importy**: external → internal (`@/`, `@omniroute/open-sse`) → relative.
- **Nazewnictwo**: pliki `camelCase` lub `kebab-case`, komponenty `PascalCase`,
  stałe `UPPER_SNAKE`.
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = `error` wszędzie;
  `no-explicit-any` = `warn` w `open-sse/` i `tests/`, error gdzie indziej.
- **TypeScript**: `strict: false` (postawa legacy). Preferuj jawne typy zamiast
  inferencji na granicach między modułami.
- **Baza danych**: nigdy nie pisz surowego SQL w trasach ani handlerach — zawsze idź przez
  moduły `src/lib/db/`. Nigdy nie dodawaj logiki do `src/lib/localDb.ts`.
- **Typowanie encji DB (#3512)**: funkcja, która zapisuje lub czyta kształt wiersza tabeli DB,
  powinna przyjmować/zwracać nazwany interfejs TS odzwierciedlający kolumny tej tabeli
  1:1, a nie `any` ani anonimowy typ inline w miejscu wywołania. Umieść
  interfejs obok funkcji (np. `export interface UsageEntry` w
  `src/lib/usage/usageHistory.ts` nad `saveRequestUsage`), trzymaj poszczególne
  pola opcjonalne/nullable, gdy różni writerzy wypełniają wiersz
  przyrostowo, i preferuj `unknown` zamiast `any` dla pola, którego kształt
  różni się między callerami (udokumentowane na polu, np. `UsageEntry.tokens`
  akceptuje zarówno surowe usage w kształcie providera, jak i znormalizowany kształt). Gdy
  liczba `any` w pliku spadnie w ten sposób do zera, dodaj go do
  allowlisty `check:any-budget:t11` (`scripts/check/check-t11-any-budget.mjs`,
  `maxAny: 0`), żeby nie regresował. To konwencja first-slice — szersze
  sprzątanie „no anonymous `any`” jest iteracyjne w reszcie
  codebase.
- **Błędy**: try/catch ze specyficznymi typami błędów, loguj z kontekstem pino. Nigdy
  nie połykaj błędów w strumieniach SSE; używaj abort signal do cleanup.
- **Bezpieczeństwo**: nigdy nie używaj `eval()` / `new Function()` / implied eval. Waliduj
  wszystkie wejścia Zod. Szyfruj poświadczenia w spoczynku (AES-256-GCM). Trzymaj
  denylist `src/shared/constants/upstreamHeaders.ts` zsynchronizowaną z
  warstwą sanitize/validation.
- **Commity**: Conventional Commits — `feat(scope): subject`. Dozwolone scope'y:
  `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`,
  `a2a`, `memory`, `skills`.
- **Branche**: prefiksy `feat/`, `fix/`, `refactor/`, `docs/`, `test/`,
  `chore/`. Nigdy nie commituj bezpośrednio do `main`.
- **Husky**: pre-commit uruchamia `lint-staged` + `check:docs-sync` +
  `check:any-budget:t11`; pre-push uruchamia `check:any-budget:t11` + `check:tracked-artifacts` (szybkie bramki; wyklucza `test:unit`).

---

## 12. Twarde reguły (z CLAUDE.md)

1. Nigdy nie commituj sekretów ani poświadczeń.
2. Nigdy nie dodawaj logiki do `src/lib/localDb.ts`.
3. Nigdy nie używaj `eval()` / `new Function()` / implied eval.
4. Nigdy nie commituj bezpośrednio do `main`.
5. Nigdy nie pisz surowego SQL w trasach — zawsze idź przez moduły `src/lib/db/`.
6. Nigdy nie połykaj błędów w strumieniach SSE.
7. Zawsze waliduj wejścia schematami Zod.
8. Zawsze dołączaj testy przy zmianie kodu produkcyjnego.
9. Pokrycie musi pozostać ≥ 60% (statements, lines, functions, branches).

---

## 13. Zobacz też

- [ARCHITECTURE.md](./ARCHITECTURE.md) — architektura wysokiego poziomu i odpowiedzialności
  modułów.
- [API_REFERENCE.md](../reference/API_REFERENCE.md) — referencja publicznego + management API.
- [FEATURES.md](../guides/FEATURES.md) — macierz feature'ów i wyróżniki wersji.
- [RESILIENCE_GUIDE.md](./RESILIENCE_GUIDE.md) — circuit breaker, cooldown,
  deep dive lockout.
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — scoring i strategie Auto Combo.
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — pełny katalog narzędzi MCP + transporty.
- [A2A-SERVER.md](../frameworks/A2A-SERVER.md) — skille protokołu A2A i discovery.
- [COMPRESSION_GUIDE.md](../compression/COMPRESSION_GUIDE.md) — kompresja RTK + Caveman.
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — integracje CLI.
- [ELECTRON_GUIDE.md](../guides/ELECTRON_GUIDE.md) (jeśli obecny), [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md), [FLY_IO_DEPLOYMENT_GUIDE.md](../ops/FLY_IO_DEPLOYMENT_GUIDE.md), [VM_DEPLOYMENT_GUIDE.md](../ops/VM_DEPLOYMENT_GUIDE.md), [TERMUX_GUIDE.md](../guides/TERMUX_GUIDE.md), [PWA_GUIDE.md](../guides/PWA_GUIDE.md) — cele wdrożenia.
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — typowe problemy operacyjne.
- [CONTRIBUTING.md](../../CONTRIBUTING.md) — workflow kontrybutora.
- [CLAUDE.md](../../CLAUDE.md) — reguły repo dla Claude Code (źródło prawdy
  dla wielu powyższych konwencji).
- [AGENTS.md](../../AGENTS.md) — głębsza referencja architektury używana przez agentów.
