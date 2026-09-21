# Repository Map (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

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

## `src/` — aplikacja Next.js

```
src/
├── app/                 # App Router (strony + trasy API + strony statusu + strona docelowa)
├── lib/                 # Biblioteki podstawowe / moduły domenowe (80 podkatalogów + ~70 plików najwyższego poziomu)
├── domain/              # Czysta logika domenowa (silnik zasad, mechanizm rezerwowy, koszt, blokada, comboResolver, ocena)
├── server/              # Moduły wyłącznie serwerowe (potok authz, cors, oprogramowanie pośredniczące uwierzytelniania) — nie można ich importować po stronie klienta
├── shared/              # Elementy współdzielone między serwerem a klientem, gdy jest to bezpieczne (stałe, typy, walidacja, kontrakty, narzędzia)
├── i18n/                # Konfiguracja next-intl + pliki JSON z komunikatami dla poszczególnych ustawień regionalnych (42 ustawienia regionalne)
├── middleware/          # Oprogramowanie pośredniczące Next.js (wzbogacanie żądań, wykrywanie ustawień regionalnych)
├── mitm/                # Rdzeń proxy MITM: generowanie/instalowanie certyfikatów, procedury obsługi, cele, inspektor, maski, przekazywanie bez zmian
│   ├── handlers/        # 9 klas obsługi agentów IDE rozszerzających MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Warstwa przechwytywania ruchu: bufor (pierścieniowy w pamięci), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Kod integrujący adaptery modeli (starsza warstwa zgodności)
├── scripts/             # Wewnętrzne skrypty konserwacyjne (np. backfillAggregation)
├── sse/                 # Starsze procedury obsługi/usługi SSE (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Starszy magazyn w pamięci (stopniowo zastępowany przez src/lib/db)
├── types/               # Współdzielone pliki typów TS
├── instrumentation.ts   # Punkt zaczepienia telemetrii Next.js (przeglądarka + środowisko brzegowe)
├── instrumentation-node.ts  # Instrumentacja wyłącznie dla Node
└── proxy.ts             # Wejściowa warstwa zgodności proxy HTTP
```

### `src/app/` — App Router (Next.js 16)

| Ścieżka                                                                      | Przeznaczenie                                                                                                                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Publiczny interfejs API zgodny z OpenAI (~25 tras podrzędnych: czat, uzupełnienia, osadzenia, pliki, zadania wsadowe, dźwięk, obrazy, filmy, muzyka, ponowne rangowanie, moderacja, wyszukiwanie, ws, agenci, konta, dostawcy itp.)                                                                                        |
| `app/api/v1beta/`                                                            | Punkty końcowe API w stylu Gemini                                                                                                                                                                                                                                                                                          |
| `app/api/playground/`                                                        | Trasy Playground Studio: `improve-prompt/` (POST — moduł LLM przepisujący prompty), `presets/` (GET — lista / POST — tworzenie), `presets/[id]/` (GET / PUT / DELETE) — zobacz `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                      |
| `app/api/` (inne niż v1)                                                     | Trasy zarządzania/administracyjne (~60 katalogów: dostawcy, kombinacje, ustawienia, mcp, a2a, ewaluacje, pamięć, umiejętności, webhooki, zgodność, odporność, monitorowanie, tunele, narzędzia CLI itp.)                                                                                                                   |
| `app/api/tools/agent-bridge/`                                                | Interfejs REST API AgentBridge — 12 tras (sterowanie serwerem, stan/DNS/mapowania agenta, pomijanie, certyfikat, nadrzędny urząd certyfikacji). LOCAL_ONLY + SPAWN_CAPABLE. Zobacz `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                    |
| `app/api/tools/traffic-inspector/`                                           | Interfejs REST + WS API Traffic Inspector — ponad 16 tras (żądania, sesje, hosty, tryby przechwytywania, eksport, ws). LOCAL_ONLY + SPAWN_CAPABLE. Zobacz `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                       |
| `app/a2a/`                                                                   | Punkt wejścia A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                               |
| `app/.well-known/agent.json/`                                                | Karta agenta A2A (wykrywanie)                                                                                                                                                                                                                                                                                              |
| `app/(dashboard)/dashboard/`                                                 | Strony interfejsu panelu (~50 sekcji, ~118 plików page.tsx: dostawcy, kombinacje, ustawienia, pamięć, umiejętności, webhooki, ewaluacje, audyt, przetwarzanie wsadowe, pamięć podręczna, koszty, kondycja, system, aktywność itp.)                                                                                         |
| `app/(dashboard)/dashboard/search-tools/`                                    | Interfejs Search Tools Studio (3 karty: Wyszukiwanie/Pobieranie/Porównywanie + SearchConceptCard + ProviderCatalog) — zobacz `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                      |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (plan 21): `page.tsx` (powłoka z 3 kartami), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Strona panelu AgentBridge — karta serwera, 9 kart agentów, kreator konfiguracji, mapowanie modeli, lista pomijania. i18n PT-BR + EN. Zobacz `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                              |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Strona panelu Traffic Inspector — podzielony widok DevTools, 7 kart szczegółów, 4 przełączniki trybu przechwytywania, rejestrator sesji, kolorowanie kontekstowe. i18n PT-BR + EN. Zobacz `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                          |
| `app/(dashboard)/dashboard/activity/`                                        | Strona kanału aktywności (Grupa B): `page.tsx` (serwer) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — zobacz `docs/architecture/MONITORING_SECTIONS.md`                                                                                                            |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Strona współdzielenia limitów (Grupa B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                       |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Strona konfiguracji planu dostawcy (Grupa B): `page.tsx` + `ProviderPlanConfigClient.tsx` — nadpisanie wymiarów limitów dla poszczególnych połączeń                                                                                                                                                                        |
| `app/docs/`                                                                  | Osadzona przeglądarka dokumentacji (renderuje `docs/*.md`)                                                                                                                                                                                                                                                                 |
| `app/landing/`                                                               | Marketingowa strona docelowa                                                                                                                                                                                                                                                                                               |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Strony związane z uwierzytelnianiem                                                                                                                                                                                                                                                                                        |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Strony błędów HTTP                                                                                                                                                                                                                                                                                                         |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Strony statyczne/statusu                                                                                                                                                                                                                                                                                                   |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Główny układ, strona główna, manifest PWA, globalny CSS                                                                                                                                                                                                                                                                    |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Granice błędów                                                                                                                                                                                                                                                                                                             |

### `src/lib/` — Główne biblioteki (~50 modułów)

| Module                                       | Przeznaczenie                                                                                                                                                                                                                                                                                                                      |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                       | Menedżer zadań protokołu A2A, umiejętności (5), strumieniowanie                                                                                                                                                                                                                                                                    |
| `acp/`                                       | Rejestr agentów CLI (lokalne wykrywanie CLI — zobacz `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                   |
| `api/`                                       | Współdzielone funkcje pomocnicze API (`requireManagementAuth`, walidacja)                                                                                                                                                                                                                                                          |
| `auth/`                                      | Sesja, haszowanie haseł, walidacja tokenów                                                                                                                                                                                                                                                                                         |
| `batches/`                                   | Procedury obsługi OpenAI Batches API                                                                                                                                                                                                                                                                                               |
| `catalog/`                                   | Walidacja Zod katalogu dostawców + określanie możliwości                                                                                                                                                                                                                                                                           |
| `cloudAgent/`                                | Agenci chmurowi (Codex Cloud, Devin, Jules) — zobacz `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                              |
| `combos/`                                    | Funkcje pomocnicze do rozwiązywania i zmiany kolejności kombinacji                                                                                                                                                                                                                                                                 |
| `audit/`                                     | Funkcje pomocnicze kanału aktywności: `highLevelActions.ts` (lista dozwolonych + `isHighLevelAction()`), `activityIcons.ts` (mapowanie akcji → ikona/czasownik), `timeline.ts` (grupowanie według dnia/czas względny) — zobacz `docs/architecture/MONITORING_SECTIONS.md`                                                          |
| `compliance/`                                | Dziennik audytu + audyt dostawców — zobacz `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                           |
| `compression/`                               | Warstwa integracyjna silnika kompresji (silniki znajdują się w `open-sse/services/compression/`)                                                                                                                                                                                                                                   |
| `config/`                                    | Funkcje pomocnicze konfiguracji środowiska uruchomieniowego                                                                                                                                                                                                                                                                        |
| `db/`                                        | Ponad 120 domenowych modułów bazy danych + 168 migracji (w przypadku SQLite zawsze korzystaj z tej warstwy)                                                                                                                                                                                                                        |
| `quota/`                                     | Silnik współdzielenia limitów: `dimensions.ts` (typy/Zod), `types.ts` (interfejs QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — zobacz `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                     | Klient katalogu bezpłatnych modeli Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — zobacz `docs/frameworks/RADAR.md`                                                                                                                                           |
| `display/`                                   | Funkcje pomocnicze do formatowania interfejsu użytkownika (koszt, opóźnienie itp.)                                                                                                                                                                                                                                                 |
| `embeddings/`                                | Funkcje pomocnicze usługi embeddingów                                                                                                                                                                                                                                                                                              |
| `env/`                                       | Parsowanie i walidacja zmiennych środowiskowych                                                                                                                                                                                                                                                                                    |
| `evals/`                                     | Framework ewaluacji (zestawy, runner, środowisko wykonawcze) — zobacz `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                   |
| `guardrails/`                                | Maskowanie danych osobowych, ochrona przed wstrzykiwaniem promptów, most dla funkcji wizyjnych — zobacz `docs/security/GUARDRAILS.md`                                                                                                                                                                                              |
| `jobs/`                                      | Zadania w tle (podobne do cron)                                                                                                                                                                                                                                                                                                    |
| `memory/`                                    | Pamięć konwersacyjna (hybrydowe RRF oparte na SQLite FTS5 i sqlite-vec + Qdrant poziomu 2) — zobacz `docs/frameworks/MEMORY.md`                                                                                                                                                                                                    |
| `memory/embedding/`                          | Wieloźródłowa warstwa embeddingów: `index.ts` (resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (plan 21)                                                                                                                                                                                 |
| `memory/vectorStore.ts`                      | Wrapper sqlite-vec v0.1.9 — KNN metodą brute-force + hybrydowe RRF (FTS5 + wektory, k=60). Leniwa inicjalizacja i łagodne ograniczenie funkcjonalności, gdy sqlite-vec jest niedostępny. (plan 21)                                                                                                                                 |
| `memory/reindex.ts`                          | `runReindexBatch()` — przetwarza w tle wpisy pamięci z `needs_reindex=1`; wywoływane przez `POST /api/memory/reindex` oraz ścieżkę leniwego uzupełniania danych. (plan 21)                                                                                                                                                         |
| `monitoring/`                                | Kontrole stanu, emitowanie metryk                                                                                                                                                                                                                                                                                                  |
| `oauth/`                                     | Przepływy OAuth/importu dla 22 modułów dostawców (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                       |
| `plugins/`                                   | Rejestr wtyczek                                                                                                                                                                                                                                                                                                                    |
| `promptCache/`                               | Punkty podziału pamięci podręcznej promptów w stylu Anthropic                                                                                                                                                                                                                                                                      |
| `skills/`                                    | Framework umiejętności (wbudowane + marketplace + SkillsSH) — zobacz `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                   |
| `playground/`                                | Współdzielone narzędzia pomocnicze Playground Studio: `codeExport.ts` (generator curl/Python/TS), `promptImprover.ts` (konstruktor metapromptów), `streamMetrics.ts` (czyste TTFT/TPS), `types.ts` (tabela cen) — zobacz `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                    |
| `webhookDispatcher.ts`                       | Dostarczanie webhooków z użyciem HMAC — zobacz `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                       |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`     | Menedżery tuneli — zobacz `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                              |
| `cloudSync.ts`, `initCloudSync.ts`           | Opcjonalna synchronizacja stanu z chmurą                                                                                                                                                                                                                                                                                           |
| `localDb.ts`                                 | Moduł zbiorczy re-eksportujący moduły bazy danych (bez logiki — wyłącznie re-eksporty)                                                                                                                                                                                                                                             |
| `cacheLayer.ts`, `idempotencyLayer.ts`       | Buforowanie żądań + idempotentność                                                                                                                                                                                                                                                                                                 |
| (~30 dodatkowych plików najwyższego poziomu) | Specjalistyczne narzędzia pomocnicze (logEnv, modelsDevSync, piiSanitizer itd.)                                                                                                                                                                                                                                                    |

### `src/lib/db/` — Baza danych (122 moduły + 168 migracji)

| Podkatalog                | Przeznaczenie                                                                                                                                                                      |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` z księgowaniem WAL                                                                                                                                     |
| `db/migrations/`          | Wersjonowane pliki SQL (idempotentne, transakcyjne). `073_memory_vec.sql` dodaje `memory_vec_meta` oraz kolumnę `needs_reindex` (plan 21).                                         |
| `db/playgroundPresets.ts` | Moduł CRUD dla ustawień wstępnych Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | Operacje CRUD dla `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) oraz `markMemoryNeedsReindex`, `getMemoryReindexQueue` itd. (plan 21)             |
| `db/<domain>.ts`          | Jeden moduł na domenę: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache itd.          |

### `src/domain/`

| Moduł                  | Przeznaczenie                                              |
| ---------------------- | ---------------------------------------------------------- |
| `policy.ts`            | Silnik zasad                                               |
| `fallbackPolicy.ts`    | Drzewo decyzyjne mechanizmu rezerwowego                    |
| `costRules.ts`         | Reguły obliczania kosztów                                  |
| `lockoutPolicy.ts`     | Zasady blokowania modelu/połączenia                        |
| `tagRouter.ts`         | Trasowanie oparte na tagach                                |
| `comboResolver.ts`     | Rozwiązywanie kombinacji (używane przez silnik kombinacji) |
| `modelAvailability.ts` | Sprawdzanie dostępności poszczególnych modeli              |
| `assessment/`          | Ocena modelu (faza 1 dokumentu RFC-AUTO-ASSESSMENT)        |

### `src/server/`

| Moduł    | Przeznaczenie                                                                                      |
| -------- | -------------------------------------------------------------------------------------------------- |
| `authz/` | Potok autoryzacji: `classify` → `policies` → `enforce` — zobacz `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Konfiguracja CORS                                                                                  |
| `auth/`  | Oprogramowanie pośredniczące sesji                                                                 |

### `src/shared/`

| Moduł                            | Przeznaczenie                                                             |
| -------------------------------- | ------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 dostawców** z walidacją Zod (źródło prawdy)                         |
| `constants/cliTools.ts`          | Rejestr zewnętrznych narzędzi CLI                                         |
| `constants/routingStrategies.ts` | **19 strategii routingu** z priorytetami                                  |
| `constants/publicApiRoutes.ts`   | Trasy wymagające uwierzytelniania Bearer (zamiast administracyjnego)      |
| `constants/upstreamHeaders.ts`   | Lista niedozwolonych nagłówków dla żądań do usług nadrzędnych             |
| `validation/schemas.ts`          | ~80 schematów Zod (jedno źródło prawdy dla kontraktów API)                |
| `validation/helpers.ts`          | Funkcje pomocnicze walidacji Zod (`validateBody` itd.)                    |
| `types/`                         | Współdzielone typy TS                                                     |
| `contracts/`                     | Publiczne kontrakty API (używane przez `files:` w `package.json`)         |
| `utils/circuitBreaker.ts`        | Wyłącznik obwodu dostawcy (zob. `docs/architecture/RESILIENCE_GUIDE.md`)  |
| `utils/apiAuth.ts`               | Walidacja klucza API i sprawdzanie zakresu                                |
| `utils/fetchTimeout.ts`          | Mechanizmy limitu czasu/przerywania dla żądań do usług nadrzędnych        |
| `utils/releaseNotes.ts`          | Parser zamkniętych ogłoszeń v2/legacy, lokalizacja i odrzucanie według ID |

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
├── mcp-server/          # Serwer MCP (107 narzędzi, 3 transporty, 32 scope'y)
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

## `docs/` — Dokumentacja publiczna (7 plików głównych + 17 podkatalogów)

### Przewodniki najwyższego poziomu

| Dokument                    | Przeznaczenie                                                                                              |
| --------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Architektura wysokiego poziomu, mapa podsystemów, powierzchnia panelu                                      |
| `CODEBASE_DOCUMENTATION.md` | Dokumentacja inżynierska: katalogi, moduły, konwencje                                                      |
| `FEATURES.md`               | Macierz funkcji z najważniejszymi zmianami w wersji v3.8                                                   |
| `USER_GUIDE.md`             | Podręcznik użytkownika końcowego (konfiguracja, modele, kombinacje, CLI, audio itd.)                       |
| `API_REFERENCE.md`          | Dokumentacja punktów końcowych API wraz z modelem uwierzytelniania                                         |
| `openapi.yaml`              | Specyfikacja OpenAPI 3.0 (121 ścieżek)                                                                     |
| `SETUP_GUIDE.md`            | Metody instalacji (npm, npx, Docker, Electron, Termux, kod źródłowy)                                       |
| `ENVIRONMENT.md`            | Wszystkie zmienne środowiskowe (~800 udokumentowanych, ~3050 wierszy `.env.example`)                       |
| `TROUBLESHOOTING.md`        | Typowe błędy i znane problemy w wersji v3.8.0                                                              |
| `RELEASE_CHECKLIST.md`      | Pełny proces wydania (umiejętności, husky, konwencjonalne commity, wdrożenie)                              |
| `COVERAGE_PLAN.md`          | Cele pokrycia testami i bieżący stan                                                                       |
| `FREE_TIERS.md`             | Wyselekcjonowani dostawcy bezpłatnych planów (48+ bezpłatnych + 11 OAuth)                                  |
| `CLI-TOOLS.md`              | Zewnętrzne integracje CLI + wewnętrzne CLI OmniRoute                                                       |
| `I18N.md`                   | Architektura i18n, dodawanie języka, 42 ustawienia regionalne                                              |
| `UNINSTALL.md`              | Kroki pełnej dezinstalacji                                                                                 |
| `PROVIDER_REFERENCE.md`     | **Automatycznie generowany** katalog 355 dostawców (ponowne generowanie: `npm run gen:provider-reference`) |

### Szczegółowe opisy podsystemów

| Dokument                                     | Przeznaczenie                                                                             |
| -------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                              | Serwer MCP: 110 narzędzi, 3 transporty, 33 zakresy, punkty końcowe REST                   |
| `A2A-SERVER.md`                              | A2A v0.3: JSON-RPC, 6 umiejętności, pomocnicze interfejsy REST, karta agenta              |
| `AGENT_PROTOCOLS_GUIDE.md`                   | Ujednolicony przewodnik: A2A a ACP a Cloud Agents                                         |
| `CLOUD_AGENT.md`                             | Orkiestracja Codex Cloud / Devin / Jules                                                  |
| `SKILLS.md`                                  | Struktura umiejętności (wbudowane + rynek + SkillsSH + piaskownica)                       |
| `RADAR.md`                                   | Nakładka katalogu bezpłatnych modeli Radar (`RADAR_ENABLED`, domyślnie wyłączona)         |
| `MEMORY.md`                                  | System pamięci (SQLite FTS5 + Qdrant)                                                     |
| `EVALS.md`                                   | Struktura ewaluacji (zestawy, uruchomienia, kryteria)                                     |
| `GUARDRAILS.md`                              | Maskowanie danych osobowych, wstrzykiwanie promptów, most wizyjny                         |
| `COMPLIANCE.md`                              | Dziennik audytu, retencja, rezygnacja przez noLog                                         |
| `WEBHOOKS.md`                                | Dostarczanie webhooków podpisanych za pomocą HMAC                                         |
| `REASONING_REPLAY.md`                        | Hybrydowa pamięć/pamięć podręczna SQLite dla `reasoning_content`                          |
| `AUTHZ_GUIDE.md`                             | Potok autoryzacji (`classify` → `policies` → `enforce`)                                   |
| `RESILIENCE_GUIDE.md`                        | Wyłącznik obwodu + okres karencji + blokada modelu                                        |
| `docs/security/STEALTH_GUIDE.md` (tylko git) | Fingerprinting TLS (JA3/JA4), Claude Code CCH, certyfikat MITM                            |
| `AUTO-COMBO.md`                              | Silnik Auto Combo (ocena na podstawie 16 czynników, 6 pakietów trybów, wirtualna fabryka) |

### Kompresja

| Dokument                        | Przeznaczenie                                       |
| ------------------------------- | --------------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Omówienie trybów kompresji i plan rozwoju           |
| `COMPRESSION_ENGINES.md`        | Silniki Caveman + RTK, kontrakt rejestru            |
| `COMPRESSION_RULES_FORMAT.md`   | Schemat JSON pakietu reguł Caveman                  |
| `COMPRESSION_LANGUAGE_PACKS.md` | Inwentarz pakietów reguł dla poszczególnych języków |
| `RTK_COMPRESSION.md`            | Deklaratywny potok RTK (49 filtrów)                 |

### Wdrażanie

| Dokument                     | Przeznaczenie                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Kompilacja Docker, profile (base/cli/host/cliproxyapi), kontener pomocniczy Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Ogólne wdrażanie na VM/VPS (Ubuntu/Debian + nginx + systemd)                      |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Wdrażanie na Fly.io (obecnie tylko w języku chińskim)                             |
| `TERMUX_GUIDE.md`            | Android bez interfejsu graficznego za pośrednictwem Termux                        |
| `PWA_GUIDE.md`               | Instalacja Progressive Web App + service worker                                   |
| `ELECTRON_GUIDE.md`          | Kompilowanie, podpisywanie i dystrybucja aplikacji desktopowej                    |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                            |
| `PROXY_GUIDE.md`             | 4-poziomowy wychodzący serwer proxy + rynek 1proxy                                |

### Podkatalogi

| Podkatalog            | Przeznaczenie                                                                                                                                                                                                                          |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Zlokalizowane tłumaczenia dokumentacji (41 wersji językowych)                                                                                                                                                                          |
| `docs/screenshots/`   | Zasoby graficzne do przewodników                                                                                                                                                                                                       |
| `_tasks/superpowers/` | Plany/specyfikacje z superpowers (`writing-plans`/`brainstorming`) oraz materiały badawcze — odizolowane repozytorium z osobnym wersjonowaniem, ignorowane przez główne drzewo Git. Zobacz CLAUDE.md → „Artefakty planowania i badań”. |

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
