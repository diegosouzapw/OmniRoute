---
title: "Mapa repozytorium"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Mapa repozytorium

> **Jednowierszowy opis każdego katalogu i pliku w katalogu głównym.**
> Ostatnia aktualizacja: 2026-06-28 — OmniRoute v3.8.40
>
> Użyj tej mapy, aby szybko nawigować po bazie kodu. Po głębsze analizy przejdź do dedykowanych dokumentów.

## Drzewo najwyższego poziomu

```
OmniRoute/
├── src/                  # Aplikacja Next.js 16 (UI + trasy API + libs + domain + server)
├── open-sse/             # Workspace silnika streamingu (handlery, executory, translator, serwer MCP)
├── electron/             # Nakładka desktopowa (Electron 41 + electron-builder 26.10)
├── bin/                  # Punkt wejścia CLI i handlery komend
├── scripts/              # Skrypty build, check, sync i jednorazowe
├── docs/                 # Dokumentacja publiczna (jesteś tutaj)
├── tests/                # Wszystkie zestawy testów (unit, integration, e2e, protocols-e2e)
├── public/               # Statyczne zasoby Next.js, manifest PWA, service worker, ikony
├── config/               # Statyczna konfiguracja + stan quality-gate (i18n, payloadRules, quality/)
├── images/               # Zasoby graficzne marketing / README
├── @omniroute/           # Publikowalne pakiety towarzyszące (opencode-plugin, opencode-provider)
├── skills/               # Paczki skilli CLI/agent (cli-* + omni-* + config-codex-cli)
├── examples/             # Przykładowe pluginy + starter omniroute-cmd-hello
├── contrib/              # Wkłady społeczności (podman/)
├── .source/              # Konfiguracja źródła Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Workflowy GitHub Actions + szablony issue + szablon PR
├── .husky/               # Haki Gita (pre-commit, pre-push)
├── .claude/              # Komendy slash Claude Code (w zakresie projektu)
├── .agents/              # Workflowy Codex / generycznych agentów + skille (lustro .claude/)
├── .vscode/              # Ustawienia workspace VS Code
├── _ideia/               # Notatki planistyczne (nieformalne; nie dostarczane)
├── _mono_repo/           # Historyczne podprojekty (cloud, site, vscode-extension)
├── _references/          # Klonowane referencje tylko do odczytu z powiązanych projektów OSS
├── _tasks/               # Pliki śledzenia zadań per-release (nieformalne)
├── .build/ .worktrees/ dist/   # lokalny build / git-worktree / scratch wyjścia builda (w .gitignore)
├── .issues/              # Lokalny cache issue (w .gitignore)
├── .playwright-mcp/      # Artefakty testów Playwright MCP
├── coverage/             # Wyjście pokrycia c8 (w .gitignore)
├── logs/                 # Logi runtime (w .gitignore)
├── node_modules/         # Zależności (w .gitignore)
├── package/              # Obszar staging npm pack (artefakt builda)
├── .next/                # Wyjście builda Next.js (w .gitignore)
└── (pliki w katalogu głównym — patrz poniżej)
```

---

## Pliki w katalogu głównym

| Plik                                        | Cel                                                                                        |
| ------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **README.md**                               | Landing marketingowy + szybki start + macierz funkcji (zob. też `llm.txt`)                 |
| **CHANGELOG.md**                            | Changelog per-release (auto-generowany przez skill `/version-bump-cc`)                     |
| **LICENSE**                                 | Tekst licencji MIT                                                                         |
| **CLAUDE.md**                               | Reguły projektu dla agentów Claude Code (twarde reguły, konwencje, scenariusze)            |
| **AGENTS.md**                               | To samo co CLAUDE.md, ale dla agentów AI innych niż Claude (Codex, Cursor itd.)            |
| **GEMINI.md**                               | Zwięzłe reguły dla agentów opartych o Gemini (podzbiór CLAUDE.md)                          |
| **CONTRIBUTING.md**                         | Przewodnik kontrybutora: setup, conventional commits, testy, flow PR                       |
| **SECURITY.md**                             | Polityka zgłaszania podatności, wspierane wersje, model zagrożeń                           |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — oczekiwania co do zachowania w społeczności                         |
| **llm.txt**                                 | Landing plain-text zoptymalizowany pod crawlers LLM (SEO dla asystentów AI)                |
| **package.json**                            | Manifest npm, skrypty, zależności, engines, bramka pokrycia c8                             |
| **package-lock.json**                       | Zablokowane drzewo zależności                                                              |
| **tsconfig.json**                           | Główna konfiguracja TypeScript                                                             |
| **tsconfig.typecheck-core.json**            | Konfiguracja typecheck dla rdzenia `src/`                                                  |
| **tsconfig.typecheck-noimplicit-core.json** | Ścisły typecheck (`noImplicitAny`)                                                         |
| **tsconfig.tsbuildinfo**                    | Przyrostowy cache builda TS (w .gitignore)                                                 |
| **next.config.mjs**                         | Konfiguracja builda Next.js 16 (wyjście standalone)                                        |
| **next-env.d.ts**                           | Auto-generowane typy env Next.js                                                           |
| **eslint.config.mjs**                       | Płaska konfiguracja ESLint (reguły per obszar projektu)                                    |
| **prettier.config.mjs**                     | Reguły formatowania Prettier                                                               |
| **postcss.config.mjs**                      | Konfiguracja PostCSS dla pipeline Tailwind/CSS                                             |
| **playwright.config.ts**                    | Konfiguracja testów E2E Playwright                                                         |
| **vitest.config.ts**                        | Konfiguracja Vitest (domyślny suite)                                                       |
| **vitest.mcp.config.ts**                    | Konfiguracja Vitest dla suite'ów MCP server / autoCombo / cache                            |
| **sonar-project.properties**                | Konfiguracja SonarQube/SonarCloud (jakość kodu)                                            |
| **Dockerfile**                              | Wielostopniowy build Docker (builder → runner-base → runner-cli)                           |
| **docker-compose.yml**                      | Compose deweloperski z 4 profilami (base, cli, host, cliproxyapi) + sidecar redis          |
| **docker-compose.prod.yml**                 | Compose produkcyjny (port 20130, redis, nazwane wolumeny)                                  |
| **.dockerignore**                           | Pliki wykluczone z kontekstu Docker                                                        |
| **fly.toml**                                | Konfiguracja wdrożenia Fly.io (region `sin`, port 20128, wolumen /data)                    |
| **.env.example**                            | Szablon pliku env (auto-kopiowany do `.env` przy pierwszej instalacji)                     |
| **.gitignore**                              | Wzorce .gitignore                                                                          |
| **.npmignore**                              | Lista wykluczeń publikacji npm                                                             |
| **.npmrc**                                  | Konfiguracja npm (registry, polityka lockfile)                                             |
| **.node-version**                           | Przypięcie wersji Node (używane przez narzędzia zgodne z nvm)                              |
| **.nvmrc**                                  | Przypięcie wersji Node dla nvm                                                             |
| **eslint.complexity.config.mjs**            | Konfiguracja ESLint dla ratchet złożoności (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | Konfiguracja ESLint dla reguł SonarJS (złożoność kognitywna / duplikacja)                  |
| **source.config.ts**                        | Konfiguracja źródła Fumadocs `defineDocs` (zasila `.source/`)                              |
| **knip.json**                               | Konfiguracja Knip — nieużywane pliki/eksporty/zależności (zasila bramkę dead-code)         |
| **stryker.conf.json**                       | Konfiguracja testów mutacyjnych Stryker                                                    |
| **.size-limit.json**                        | Konfiguracja budżetu bundle size-limit                                                     |
| **promptfooconfig.yaml**                    | Konfiguracja eval promptfoo                                                                |
| **.gitleaks.toml**                          | Zestaw reguł skanowania sekretów gitleaks                                                  |
| **.zizmor.yml**                             | Konfiguracja security-lint zizmor dla GitHub Actions                                       |
| **socket.yml**                              | Konfiguracja łańcucha dostaw Socket.dev                                                    |
| **news.json**                               | Feed notatek o wydaniu w aplikacji (czytany przez `src/shared/utils/releaseNotes.ts`)      |
| **flake.nix** / **flake.lock**              | Definicja dev-shell Nix + lock                                                             |
| **.env**                                    | Lokalne sekrety (w .gitignore — generowane z `.env.example`)                               |

> **Przeniesione z katalogu głównego w v3.8.26 (porządkowanie):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` oraz wygenerowany `quality-metrics.json` (w .gitignore). Zobacz [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Aplikacja Next.js

```
src/
├── app/                 # App Router (strony + trasy API + strony statusu + landing)
├── lib/                 # Biblioteki rdzeniowe / moduły domenowe (~50 podkatalogów + ~30 plików top-level)
├── domain/              # Czysta logika domenowa (silnik polityk, fallback, koszt, lockout, comboResolver, assessment)
├── server/              # Moduły tylko-serwerowe (pipeline authz, cors, middleware auth) — nie można importować z klienta
├── shared/              # Współdzielone między serwerem a klientem tam, gdzie bezpieczne (stałe, typy, walidacja, kontrakty, utils)
├── i18n/                # Konfiguracja next-intl + JSON komunikatów per-locale (30+ locale)
├── middleware/          # Middleware Next.js (wzbogacanie żądań, detekcja locale)
├── mitm/                # Rdzeń proxy MITM: gen/instalacja cert, handlery, cele, inspector, maski, passthrough
│   ├── handlers/        # 9 klas handlerów agentów IDE rozszerzających MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Warstwa przechwytywania ruchu: buffer (pierścień w pamięci), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Klej adaptera modeli (legacy shim)
├── scripts/             # Skrypty utrzymaniowe w drzewie (np. backfillAggregation)
├── sse/                 # Legacy handlery/serwisy SSE (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Legacy magazyn w pamięci (wycofywany na rzecz src/lib/db)
├── types/               # Współdzielone pliki typów TS
├── instrumentation.ts   # Hook telemetrii Next.js (browser + edge)
├── instrumentation-node.ts  # Instrumentacja tylko-Node
├── server-init.ts       # Bootstrap serwera (migracje DB, joby, cleanup)
└── proxy.ts             # Shim wejścia HTTP-proxy
```

### `src/app/` — App Router (Next.js 16)

| Ścieżka                                                                      | Cel                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Publiczne API zgodne z OpenAI (~25 podtras: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers itd.)                                                                                                                           |
| `app/api/v1beta/`                                                            | Endpointy API w stylu Gemini                                                                                                                                                                                                                                                                                          |
| `app/api/playground/`                                                        | Trasy Playground Studio: `improve-prompt/` (POST — rewriter promptów LLM), `presets/` (GET lista / POST utwórz), `presets/[id]/` (GET / PUT / DELETE) — zob. `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                   |
| `app/api/` (non-v1)                                                          | Trasy management/admin (~60 katalogów: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools itd.)                                                                                                                                           |
| `app/api/tools/agent-bridge/`                                                | REST API AgentBridge — 12 tras (kontrola serwera, stan agenta/DNS/mapowania, bypass, cert, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Zob. `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                        |
| `app/api/tools/traffic-inspector/`                                           | REST + WS API Traffic Inspector — 16+ tras (requests, sessions, hosts, capture-modes, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Zob. `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                        |
| `app/a2a/`                                                                   | Punkt wejścia A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                          |
| `app/.well-known/agent.json/`                                                | Karta agenta A2A (odkrywanie)                                                                                                                                                                                                                                                                                         |
| `app/(dashboard)/dashboard/`                                                 | Strony UI dashboardu (~35 stron: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity itd.)                                                                                                                                                             |
| `app/(dashboard)/dashboard/search-tools/`                                    | UI Search Tools Studio (3 karty: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — zob. `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                         |
| `app/(dashboard)/dashboard/`                                                 | Strony UI dashboardu (~30 stron: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system itd.)                                                                                                                                                                       |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (powłoka 3 kart), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Strona dashboardu AgentBridge — karta serwera, 9 kart agentów, kreator setupu, mapowanie modeli, lista bypass. i18n PT-BR + EN. Zob. `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Strona dashboardu Traffic Inspector — podział DevTools, 7 kart szczegółów, 4 przełączniki trybu przechwytywania, recorder sesji, koloryzacja kontekstu. i18n PT-BR + EN. Zob. `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                 |
| `app/(dashboard)/dashboard/activity/`                                        | Strona feedu aktywności (Group B): `page.tsx` (serwer) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — zob. `docs/architecture/MONITORING_SECTIONS.md`                                                                                                          |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Strona Quota Sharing (Group B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                           |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Strona konfiguracji planu providera (Group B): `page.tsx` + `ProviderPlanConfigClient.tsx` — wymiary quota z override per połączenie                                                                                                                                                                                  |
| `app/docs/`                                                                  | Wbudowany podgląd dokumentacji (renderuje `docs/*.md`)                                                                                                                                                                                                                                                                |
| `app/landing/`                                                               | Landing marketingowy                                                                                                                                                                                                                                                                                                  |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Strony związane z auth                                                                                                                                                                                                                                                                                                |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Strony błędów HTTP                                                                                                                                                                                                                                                                                                    |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Strony statyczne/statusu                                                                                                                                                                                                                                                                                              |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Layout główny, home, manifest PWA, globalny CSS                                                                                                                                                                                                                                                                       |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Granice błędów (error boundaries)                                                                                                                                                                                                                                                                                     |

### `src/lib/` — Biblioteki rdzeniowe (~50 modułów)

| Moduł                                    | Cel                                                                                                                                                                                                                                                                                                                     |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Task manager protokołu A2A, skille (5), streaming                                                                                                                                                                                                                                                                       |
| `acp/`                                   | Rejestr agentów CLI (lokalne odkrywanie CLI — zob. `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                          |
| `api/`                                   | Współdzielone helpery API (`requireManagementAuth`, walidacja)                                                                                                                                                                                                                                                          |
| `auth/`                                  | Sesja, hashowanie haseł, walidacja tokenów                                                                                                                                                                                                                                                                              |
| `batches/`                               | Handlery OpenAI Batches API                                                                                                                                                                                                                                                                                             |
| `catalog/`                               | Walidacja Zod katalogu providerów + rozwiązywanie capabilities                                                                                                                                                                                                                                                          |
| `cloudAgent/`                            | Cloud Agents (Codex Cloud, Devin, Jules) — zob. `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                        |
| `combos/`                                | Rozwiązywanie combo + helpery reorder                                                                                                                                                                                                                                                                                   |
| `audit/`                                 | Helpery feedu aktywności: `highLevelActions.ts` (allowlist + `isHighLevelAction()`), `activityIcons.ts` (mapa action → ikona/czasownik), `timeline.ts` (groupByDay/relativeTime) — zob. `docs/architecture/MONITORING_SECTIONS.md`                                                                                      |
| `compliance/`                            | Log audytu + audyt providerów — zob. `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                      |
| `compression/`                           | Klej silnika kompresji (silniki w `open-sse/services/compression/`)                                                                                                                                                                                                                                                     |
| `config/`                                | Helpery konfiguracji runtime                                                                                                                                                                                                                                                                                            |
| `db/`                                    | 95+ domenowych modułów DB + 110+ migracji (zawsze przechodź tędy dla SQLite)                                                                                                                                                                                                                                            |
| `quota/`                                 | Silnik Quota Sharing: `dimensions.ts` (typy/Zod), `types.ts` (interfejs QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — zob. `docs/routing/QUOTA_SHARE.md` |
| `display/`                               | Helpery formatowania UI (koszt, latency itd.)                                                                                                                                                                                                                                                                           |
| `embeddings/`                            | Helpery serwisu embeddings                                                                                                                                                                                                                                                                                              |
| `env/`                                   | Parsowanie + walidacja zmiennych env                                                                                                                                                                                                                                                                                    |
| `evals/`                                 | Framework ewaluacji (suite'y, runner, runtime) — zob. `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                        |
| `guardrails/`                            | Masker PII, prompt injection, vision bridge — zob. `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                        |
| `jobs/`                                  | Joby w tle (jak cron)                                                                                                                                                                                                                                                                                                   |
| `memory/`                                | Pamięć konwersacyjna (SQLite FTS5 + hybrydowe RRF sqlite-vec + Qdrant tier 2) — zob. `docs/frameworks/MEMORY.md`                                                                                                                                                                                                        |
| `memory/embedding/`                      | Warstwa embeddingów multi-source: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                       |
| `memory/vectorStore.ts`                  | Wrapper sqlite-vec v0.1.9 — KNN brute-force + hybrydowe RRF (FTS5 + vector, k=60). Lazy-init, łagodna degradacja gdy sqlite-vec niedostępne. (plan 21)                                                                                                                                                                  |
| `memory/reindex.ts`                      | `runReindexBatch()` — przetwarza pamięci z `needs_reindex=1` w tle; wywoływane przez `POST /api/memory/reindex` i ścieżkę lazy-backfill. (plan 21)                                                                                                                                                                      |
| `monitoring/`                            | Health checki, emisja metryk                                                                                                                                                                                                                                                                                            |
| `oauth/`                                 | Przepływy OAuth dla 13 providerów (claude, codex, antigravity, cursor, github, gemini, kimi-coding, kilocode, cline, kiro, qoder, gitlab-duo, windsurf)                                                                                                                                                                 |
| `plugins/`                               | Rejestr pluginów                                                                                                                                                                                                                                                                                                        |
| `promptCache/`                           | Breakpointy cache promptów w stylu Anthropic                                                                                                                                                                                                                                                                            |
| `skills/`                                | Framework skilli (wbudowane + marketplace + SkillsSH) — zob. `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                |
| `playground/`                            | Współdzielone helpery Playground Studio: `codeExport.ts` (generator curl/Python/TS), `promptImprover.ts` (builder meta-promptów), `streamMetrics.ts` (czyste TTFT/TPS), `types.ts` (tabela cen) — zob. `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                           |
| `webhookDispatcher.ts`                   | Dostarczanie webhooków HMAC — zob. `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                        |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Managery tuneli — zob. `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                      |
| `oneproxySync.ts`, `oneproxyRotator.ts`  | Marketplace darmowych proxy 1proxy — zob. `docs/ops/PROXY_GUIDE.md`                                                                                                                                                                                                                                                     |
| `cloudSync.ts`, `initCloudSync.ts`       | Opcjonalna synchronizacja stanu w chmurze                                                                                                                                                                                                                                                                               |
| `localDb.ts`                             | Barrel re-exportów modułów db (bez logiki — tylko re-eksporty)                                                                                                                                                                                                                                                          |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Cache żądań + idempotencja                                                                                                                                                                                                                                                                                              |
| (~30 more top-level files)               | Specjalistyczne helpery (logEnv, modelsDevSync, piiSanitizer itd.)                                                                                                                                                                                                                                                      |

### `src/db/` — Baza danych (94 moduły + 106 migracji)

| Podkatalog                | Cel                                                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` z journalingiem WAL                                                                                                                           |
| `db/migrations/`          | Wersjonowane pliki SQL (idempotentne, transakcyjne). `073_memory_vec.sql` dodaje `memory_vec_meta` + kolumnę `needs_reindex` (plan 21).                                   |
| `db/playgroundPresets.ts` | Moduł CRUD presetów Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)      |
| `db/memoryVec.ts`         | CRUD dla `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` itd. (plan 21)                |
| `db/<domain>.ts`          | Jeden moduł na domenę: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache itd. |

### `src/domain/`

| Moduł                  | Cel                                                              |
| ---------------------- | ---------------------------------------------------------------- |
| `policy.ts`            | Silnik polityk                                                   |
| `fallbackPolicy.ts`    | Drzewo decyzji fallback                                          |
| `costRules.ts`         | Reguły kalkulacji kosztów                                        |
| `lockoutPolicy.ts`     | Polityka lockout modelu/połączenia                               |
| `tagRouter.ts`         | Routing oparty o tagi                                            |
| `comboResolver.ts`     | Rozwiązywanie combo (używane przez silnik combo)                 |
| `modelAvailability.ts` | Sprawdzanie dostępności per-model                                |
| `assessment/`          | Ocena modeli (Faza 1 RFC-AUTO-ASSESSMENT — zob. `docs/archive/`) |

### `src/server/`

| Moduł    | Cel                                                                                                 |
| -------- | --------------------------------------------------------------------------------------------------- |
| `authz/` | Pipeline autoryzacji: `classify` → `policies` → `enforce` — zob. `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Konfiguracja CORS                                                                                   |
| `auth/`  | Middleware sesji                                                                                    |

### `src/shared/`

| Moduł                            | Cel                                                                       |
| -------------------------------- | ------------------------------------------------------------------------- |
| `constants/providers.ts`         | **236 providerów** z walidacją Zod (źródło prawdy)                        |
| `constants/cliTools.ts`          | Rejestr zewnętrznych narzędzi CLI                                         |
| `constants/routingStrategies.ts` | **17 strategii routingu** z priorytetami                                  |
| `constants/publicApiRoutes.ts`   | Trasy wymagające auth Bearer (vs management)                              |
| `constants/upstreamHeaders.ts`   | Denylist nagłówków dla żądań upstream                                     |
| `validation/schemas.ts`          | ~80 schematów Zod (jedno źródło prawdy dla kontraktów API)                |
| `validation/helpers.ts`          | Helpery walidacji Zod (`validateBody` itd.)                               |
| `types/`                         | Współdzielone typy TS                                                     |
| `contracts/`                     | Publiczne kontrakty API (konsumowane przez `files:` w `package.json`)     |
| `utils/circuitBreaker.ts`        | Circuit breaker providerów (zob. `docs/architecture/RESILIENCE_GUIDE.md`) |
| `utils/apiAuth.ts`               | Walidacja kluczy API, sprawdzanie scope                                   |
| `utils/fetchTimeout.ts`          | Wrappery timeout/abort dla fetch upstream                                 |

---

## `open-sse/` — Workspace silnika streamingu

Osobny workspace npm (`@omniroute/open-sse`). Obsługuje przetwarzanie żądań + wykonanie u providerów.

```
open-sse/
├── handlers/            # 16 plików (12 handlerów + 4 helpery): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search itd.
├── executors/           # 67 executorów specyficznych dla providerów (rozszerzają BaseExecutor)
├── translator/          # Konwertery formatów (9 request, 9 response, 9 helperów)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ modułów serwisowych (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM itd.)
├── mcp-server/          # Serwer MCP (99 narzędzi, 3 transporty, 32 scope'y)
├── config/              # Rejestry provider/model, konfiguracja nagłówków, aliasy modeli
├── utils/               # Klient TLS, proxy fetch/dispatcher, helpery sieciowe
├── index.ts             # Wejście workspace
├── package.json         # Manifest workspace
├── tsconfig.json        # Konfiguracja TS workspace
└── types.d.ts           # Deklaracje typów workspace
```

### `open-sse/mcp-server/`

| Ścieżka                     | Cel                                                                         |
| --------------------------- | --------------------------------------------------------------------------- |
| `server.ts`                 | Cykl życia serwera MCP (transporty stdio + HTTP)                            |
| `httpTransport.ts`          | Transporty HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)        |
| `audit.ts`                  | Logowanie audytu do tabeli `mcp_tool_audit`                                 |
| `scopeEnforcement.ts`       | Walidacja scope per-narzędzie                                               |
| `runtimeHeartbeat.ts`       | Heartbeat zdrowia do `DATA_DIR/runtime/mcp-heartbeat.json`                  |
| `descriptionCompressor.ts`  | Kompresja metadanych opisu narzędzi w celu oszczędności kontekstu           |
| `schemas/tools.ts`          | 36 bazowych definicji narzędzi + scope'y                                    |
| `tools/advancedTools.ts`    | Implementacje zaawansowanych narzędzi                                       |
| `tools/memoryTools.ts`      | 3 narzędzia memory (search/add/clear)                                       |
| `tools/skillTools.ts`       | 4 narzędzia skill (list/enable/execute/executions)                          |
| `tools/compressionTools.ts` | 5 narzędzi kompresji                                                        |
| `README.md`                 | Wewnętrzny README serwera MCP (linkowane z `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Nakładka desktopowa

| Plik             | Cel                                                                                 |
| ---------------- | ----------------------------------------------------------------------------------- |
| `main.js`        | Główny proces Electron (BrowserWindow, wbudowany serwer Next.js, tray, auto-update) |
| `preload.js`     | Most IPC (contextBridge → `window.omniroute`)                                       |
| `package.json`   | Konfiguracja electron-builder + Electron 41 + zależności electron-builder 26.10     |
| `assets/`        | Ikony aplikacji (Windows .ico, macOS .icns, Linux .png)                             |
| `dist-electron/` | Wyjście builda (w .gitignore)                                                       |
| `types.d.ts`     | Deklaracje typów mostu renderera                                                    |
| `README.md`      | Wewnętrzny README Electron (zob. też `docs/guides/ELECTRON_GUIDE.md`)               |

---

## `bin/` — CLI

| Plik                                                                                                        | Cel                                                                                                                           |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Główne wejście CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` itd. |
| `reset-password.mjs`                                                                                        | Samodzielne CLI resetu hasła                                                                                                  |
| `cli/commands/setup.mjs`                                                                                    | Interaktywny + nieinteraktywny kreator setupu                                                                                 |
| `cli/commands/doctor.mjs`                                                                                   | Diagnostyka zdrowia systemu (8+ checków)                                                                                      |
| `cli/commands/providers.mjs`                                                                                | Lista/test/walidacja providerów                                                                                               |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Moduły helperów CLI                                                                                                           |
| `cli/tray/tray.ts`                                                                                          | Integracja system tray (cross-platform: NotifyIcon na Windows, systray2 na macOS/Linux)                                       |
| `cli/tray/tray.ps1`                                                                                         | Backend PowerShell NotifyIcon (Windows, zero nowych binariów)                                                                 |
| `cli/tray/autostart.ts`                                                                                     | Autostart cross-platform (LaunchAgent / .desktop / rejestr)                                                                   |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-krokowy łańcuch rozwiązywania sterownika SQLite (bundled → runtime → lazy-install → node:sqlite → sql.js)                   |
| `cli/runtime/magicBytes.mjs`                                                                                | Walidacja magic-byte binariów (ELF / Mach-O / Mach-O fat / PE)                                                                |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — wstępnie rozwiązuje sterowniki przy postinstall / pierwszym starcie                                      |
| `nodeRuntimeSupport.mjs`                                                                                    | Walidacja wspieranej wersji Node.js przy instalacji                                                                           |

---

## `skills/` — Publiczne skille agentów

| Plik                         | Cel                                                                                       |
| ---------------------------- | ----------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 manifestów skilli dla zewnętrznych agentów AI (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Skrypty build i check

| Skrypt                              | Cel                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | Runner dev/start z hydracją env                                                            |
| `build-next-isolated.mjs`           | Build standalone (Next.js 16 standalone)                                                   |
| `prepublish.ts`                     | Przygotowanie pakietu przed `npm pack`                                                     |
| `postinstall.mjs`                   | Auto-tworzenie `.env` z `.env.example` przy pierwszej instalacji                           |
| `sync-env.mjs`                      | Ponowna synchronizacja kluczy `.env` z `.env.example`                                      |
| `check-cycles.mjs`                  | Wykrywanie cyklicznych zależności                                                          |
| `check-route-validation.mjs`        | Walidacja, że wszystkie trasy API mają walidację Zod                                       |
| `check-t11-any-budget.mjs`          | Wymuszanie budżetu jawnego `any` per plik                                                  |
| `check-docs-sync.mjs`               | Walidacja synchronizacji wersji docs (istniejący pre-commit)                               |
| **`check-env-doc-sync.mjs`**        | NOWE: cross-check zmiennych env w kodzie vs `.env.example` vs `ENVIRONMENT.md`             |
| **`check-docs-counts-sync.mjs`**    | NOWE: walidacja, że liczniki (executory, strategie, OAuth, skille A2A) zgadzają się z docs |
| **`check-deprecated-versions.mjs`** | NOWE: flagowanie nieaktualnych wersji/dat w docs                                           |
| `check-supported-node-runtime.ts`   | Walidacja, że bieżąca wersja Node jest wspierana                                           |
| `check-pr-test-policy.mjs`          | Wymusza regułę „wymagane testy” przy zmianach kodu produkcyjnego                           |
| **`gen-provider-reference.ts`**     | NOWE: auto-generowanie `docs/reference/PROVIDER_REFERENCE.md` z katalogu                   |
| `i18n/generate-multilang.mjs`       | Tłumaczenie stringów UI + docs przez Google Translate                                      |
| `i18n_autotranslate.py`             | Pipeline tłumaczenia docs oparty o LLM                                                     |
| `validate_translation.py`           | Walidacja tłumaczeń per-locale                                                             |
| `check_translations.py`             | Sprawdzanie kluczy i18n po stronie kodu                                                    |
| `run-playwright-tests.mjs`          | Runner E2E Playwright                                                                      |
| `run-protocol-clients-tests.mjs`    | Runner E2E MCP/A2A                                                                         |
| `run-ecosystem-tests.mjs`           | Testy ekosystemu (integracja providerów)                                                   |
| `test-report-summary.mjs`           | Generowanie podsumowania pokrycia w markdown                                               |
| `smoke-electron-packaged.mjs`       | Smoke-test spakowanego builda Electron                                                     |
| `native-binary-compat.mjs`          | Walidacja, że natywne zależności (`better-sqlite3`) pasują do Node Electrona               |
| `validate-pack-artifact.ts`         | Walidacja wyjścia npm pack                                                                 |
| `responses-ws-proxy.mjs`            | Most WebSocket dla Codex Responses API                                                     |
| `v1-ws-bridge.mjs`                  | Most WebSocket dla endpointu `/api/v1/ws`                                                  |
| `standalone-server-ws.mjs`          | Samodzielny runner serwera WS                                                              |
| `system-info.mjs`                   | Druk informacji system/runtime na potrzeby supportu                                        |
| `healthcheck.mjs`                   | Jednorazowy health check (używany przez Docker HEALTHCHECK)                                |
| `uninstall.mjs`                     | Skrypt czystej deinstalacji                                                                |

---

## `docs/` — Dokumentacja publiczna (44 pliki + 4 podkatalogi)

### Przewodniki najwyższego poziomu

| Dok                         | Cel                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------ |
| `ARCHITECTURE.md`           | Architektura wysokiego poziomu, mapa podsystemów, powierzchnia dashboardu            |
| `CODEBASE_DOCUMENTATION.md` | Referencja inżynierska: katalogi, moduły, konwencje                                  |
| `FEATURES.md`               | Macierz funkcji z highlightami v3.8                                                  |
| `USER_GUIDE.md`             | Podręcznik użytkownika końcowego (setup, modele, combo, CLI, audio itd.)             |
| `API_REFERENCE.md`          | Referencja endpointów API z modelem auth                                             |
| `openapi.yaml`              | Specyfikacja OpenAPI 3.0 (121 ścieżek)                                               |
| `SETUP_GUIDE.md`            | Metody instalacji (npm, npx, Docker, Electron, Termux, źródło)                       |
| `ENVIRONMENT.md`            | Wszystkie zmienne env (~219 używanych w kodzie, ~810 linii `.env.example`)           |
| `TROUBLESHOOTING.md`        | Częste błędy + znane problemy v3.8.0                                                 |
| `RELEASE_CHECKLIST.md`      | Pełny flow release (skille, husky, conventional commits, deploy)                     |
| `COVERAGE_PLAN.md`          | Cele pokrycia i stan bieżący                                                         |
| `FREE_TIERS.md`             | Wyselekcjonowani providerzy free-tier (48+ free + 11 OAuth)                          |
| `CLI-TOOLS.md`              | Integracje zewnętrznych CLI + wewnętrzne CLI OmniRoute                               |
| `I18N.md`                   | Architektura i18n, dodawanie języka, 30 locale                                       |
| `UNINSTALL.md`              | Kroki czystej deinstalacji                                                           |
| `PROVIDER_REFERENCE.md`     | **Auto-generowany** katalog 236 providerów (regen: `npm run gen:provider-reference`) |

### Głębokie analizy podsystemów

| Dok                        | Cel                                                                    |
| -------------------------- | ---------------------------------------------------------------------- |
| `MCP-SERVER.md`            | Serwer MCP: 99 narzędzi, 3 transporty, 32 scope'y, endpointy REST      |
| `A2A-SERVER.md`            | A2A v0.3: JSON-RPC, 5 skilli, helpery REST, karta agenta               |
| `AGENT_PROTOCOLS_GUIDE.md` | Ujednolicony przewodnik: A2A vs ACP vs Cloud Agents                    |
| `CLOUD_AGENT.md`           | Orkiestracja Codex Cloud / Devin / Jules                               |
| `SKILLS.md`                | Framework skilli (wbudowane + marketplace + SkillsSH + sandbox)        |
| `MEMORY.md`                | System pamięci (SQLite FTS5 + Qdrant)                                  |
| `EVALS.md`                 | Framework ewaluacji (suite'y, runy, rubryki)                           |
| `GUARDRAILS.md`            | Masker PII, prompt injection, vision bridge                            |
| `COMPLIANCE.md`            | Log audytu, retencja, opt-out noLog                                    |
| `WEBHOOKS.md`              | Dostarczanie webhooków podpisanych HMAC                                |
| `REASONING_REPLAY.md`      | Hybrydowy cache memory/SQLite dla `reasoning_content`                  |
| `AUTHZ_GUIDE.md`           | Pipeline autoryzacji (`classify` → `policies` → `enforce`)             |
| `RESILIENCE_GUIDE.md`      | Circuit breaker + cooldown + lockout modeli                            |
| `STEALTH_GUIDE.md`         | Fingerprint TLS (JA3/JA4), Claude Code CCH, cert MITM                  |
| `AUTO-COMBO.md`            | Silnik Auto Combo (scoring 9 czynników, 4 mode packi, virtual factory) |

### Kompresja

| Dok                             | Cel                                      |
| ------------------------------- | ---------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Przegląd trybów kompresji + roadmap      |
| `COMPRESSION_ENGINES.md`        | Silniki Caveman + RTK, kontrakt rejestru |
| `COMPRESSION_RULES_FORMAT.md`   | Schemat JSON paczki reguł Caveman        |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inwentarz paczek reguł per-język         |
| `RTK_COMPRESSION.md`            | Deklaratywny pipeline RTK (49 filtrów)   |

### Wdrożenie

| Dok                          | Cel                                                              |
| ---------------------------- | ---------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Build Docker, profile (base/cli/host/cliproxyapi), sidecar Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Generyczne wdrożenie VM/VPS (Ubuntu/Debian + nginx + systemd)    |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Wdrożenie Fly.io (obecnie tylko chińskie)                        |
| `TERMUX_GUIDE.md`            | Android headless przez Termux                                    |
| `PWA_GUIDE.md`               | Instalacja Progressive Web App + service worker                  |
| `ELECTRON_GUIDE.md`          | Build aplikacji desktop + podpis + dystrybucja                   |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                           |
| `PROXY_GUIDE.md`             | 4-poziomowe proxy outbound + marketplace 1proxy                  |

### Podkatalogi

| Podkatalog            | Cel                                                                                                                                                                                                  |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/archive/`       | Zarchiwizowane/historyczne docs (np. `RFC-AUTO-ASSESSMENT-DRAFT.md` — zastąpione przez EVALS)                                                                                                        |
| `docs/i18n/`          | Zlokalizowane tłumaczenia docs (~42 locale)                                                                                                                                                          |
| `docs/screenshots/`   | Zasoby graficzne do przewodników                                                                                                                                                                     |
| `_tasks/superpowers/` | Plany/specyfikacje z superpowers (`writing-plans`/`brainstorming`) + research — izolowane, osobno wersjonowane repo, w .gitignore głównego drzewa. Zob. CLAUDE.md → "Planning & Research Artifacts". |

---

## `tests/` — Zestawy testów

| Podkatalog             | Typ                                         | Runner                                   |
| ---------------------- | ------------------------------------------- | ---------------------------------------- |
| `tests/unit/`          | Testy jednostkowe (~500 plików, najszybsze) | Natywny test runner Node                 |
| `tests/integration/`   | Testy integracyjne multi-module + DB        | Natywny test runner Node (concurrency 1) |
| `tests/e2e/`           | E2E UI + workflow                           | Playwright                               |
| `tests/protocols-e2e/` | E2E real-client MCP + A2A                   | Własne klienty protokołów                |
| `tests/ecosystem/`     | Integracja providerów (dotykająca sieci)    | Natywny test runner Node                 |

---

## `public/` — Zasoby statyczne

| Ścieżka             | Cel                                                                 |
| ------------------- | ------------------------------------------------------------------- |
| `public/` (root)    | Favicony, robots.txt, manifest, service worker, obrazy marketingowe |
| `public/providers/` | Logo providerów PNG/SVG (używane w dashboardzie)                    |

---

## `config/` — Statyczne konfiguracje + stan quality-gate

Dostarczane szablony konfiguracji plus zacommitowane bazowe linie quality-gate
(przeniesione tu z katalogu głównego repo w v3.8.26, aby utrzymać root szczupły).

| Ścieżka                                       | Cel                                                                                    |
| --------------------------------------------- | -------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Lista locale + metadane (kanoniczne źródło liczby 42 locale)                           |
| `config/i18n-schema.json`                     | Schemat JSON walidujący `i18n.json`                                                    |
| `config/payloadRules.json`                    | Reguły sanityzacji payloadów upstream                                                  |
| `config/quality/quality-baseline.json`        | Bazowa linia ratchet multi-metryk (`scripts/quality/check-quality-ratchet.mjs`)        |
| `config/quality/complexity-baseline.json`     | Zamrożona bazowa linia złożoności ESLint (`check-complexity.mjs`)                      |
| `config/quality/duplication-baseline.json`    | Zamrożona bazowa linia duplikacji jscpd (`check-duplication.mjs`)                      |
| `config/quality/file-size-baseline.json`      | Zamrożona bazowa linia rozmiaru per-plik (`check-file-size.mjs`)                       |
| `config/quality/test-discovery-baseline.json` | Zamrożona bazowa linia orphan-test (`check-test-discovery.mjs`)                        |
| `config/quality/dependency-allowlist.json`    | Allowlista zatwierdzonych zależności (`check-deps.mjs`)                                |
| `config/quality/.license-allowlist.json`      | Allowlista licencji SPDX (`check-licenses.mjs`)                                        |
| `config/quality/quality-metrics.json`         | Efemeryczne zebrane metryki (generowane przez `collect-metrics.mjs`; **w .gitignore**) |

---

## `.github/` — Integracja GitHub

| Ścieżka                            | Cel                                                            |
| ---------------------------------- | -------------------------------------------------------------- |
| `.github/workflows/`               | Workflowy CI/CD GitHub Actions (lint, test, coverage, release) |
| `.github/ISSUE_TEMPLATE/`          | Szablony issue bug/feature                                     |
| `.github/PULL_REQUEST_TEMPLATE.md` | Szablon PR                                                     |
| `.github/dependabot.yml`           | Konfiguracja aktualizacji zależności                           |

---

## `.husky/` — Haki Gita

| Plik         | Cel                                                                     |
| ------------ | ----------------------------------------------------------------------- |
| `pre-commit` | Uruchamia `lint-staged + check-docs-sync + check:any-budget:t11`        |
| `pre-push`   | Obecnie wyłączone (zakomentowane). Uruchom `npm run test:unit` ręcznie. |
| `_/`         | Wewnętrzności Husky                                                     |

---

## `.claude/` — Komendy slash Claude Code

| Plik                                                | Cel                                                |
| --------------------------------------------------- | -------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — bump wersji + auto-changelog  |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — pełny workflow release    |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Wdrożenie na VPS                                   |
| `commands/capture-release-evidences-cc.md`          | Nagrywanie nowych funkcji w przeglądarce jako WebP |
| `commands/review-{prs,discussions}-cc.md`           | Triage PR/dyskusji GitHub                          |
| `commands/{review-issues,implement-features}-cc.md` | Workflowy issue                                    |
| `settings.local.json`                               | Ustawienia Claude Code per-projekt                 |

---

## `.agents/` — Generyczne workflow agentów (Codex / Cursor / itd.)

| Ścieżka                  | Cel                                                |
| ------------------------ | -------------------------------------------------- |
| `workflows/*-ag.md`      | 11 definicji workflow (lustro `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 definicji skilli z Codex Execution Notes         |

> **Uwaga:** Workflowy i komendy są obecnie identyczne bajt po bajcie. Jeśli `.agents/` ma celować w inny runtime agenta (Codex), warianty muszą się znacząco rozjechać.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Poza drzewem

Te katalogi z prefiksem podkreślenia zawierają treść niedostarczaną:

- **`_ideia/`** — notatki projektowe (kategorie defer / notfit / viable)
- **`_mono_repo/`** — historyczne podprojekty (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — klony tylko do odczytu powiązanych projektów OSS (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api itd.) do cross-reference podczas developmentu
- **`_tasks/`** — pliki śledzenia zadań per-release (nieformalne)

Nie uwzględnione w wyjściu `npm pack`. Zob. `.npmignore`.

---

## Generowane / w .gitignore

| Ścieżka                | Cel                             |
| ---------------------- | ------------------------------- |
| `node_modules/`        | Zależności npm                  |
| `.next/`               | Wyjście builda Next.js          |
| `coverage/`            | Raporty pokrycia c8             |
| `logs/`                | Logi runtime                    |
| `package/`             | Staging npm pack                |
| `.playwright-mcp/`     | Artefakty testów Playwright MCP |
| `.issues/`             | Lokalny cache issue             |
| `tsconfig.tsbuildinfo` | Przyrostowy cache TS            |

---

## Wskazówki nawigacyjne

- **Nowy kontrybutor?** Przeczytaj `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Dodajesz providera?** Postępuj według `docs/architecture/ARCHITECTURE.md § Adding a New Provider` + sprawdź `docs/reference/PROVIDER_REFERENCE.md`.
- **Dodajesz trasę?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **Dodajesz narzędzie MCP?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Dodajesz skill A2A?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Uruchamiasz lokalnie?** `docs/guides/SETUP_GUIDE.md`.
- **Wdrażasz?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Robisz release?** `docs/ops/RELEASE_CHECKLIST.md` (oraz skill Claude Code `/generate-release-cc`).
