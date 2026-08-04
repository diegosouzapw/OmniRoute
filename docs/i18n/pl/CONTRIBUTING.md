# Współtworzenie OmniRoute

Dziękujemy za zainteresowanie współtworzeniem projektu! Ten przewodnik zawiera wszystko, czego potrzebujesz, aby zacząć.

---

## Konfiguracja środowiska deweloperskiego

### Wymagania wstępne

- **Node.js** `>=22.22.3 <23`, lub `>=24.0.0 <27` (zalecane: 24 LTS)
- **npm** 10+
- **Git**

### Klonowanie i instalacja

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Zmienne środowiskowe

```bash
# Create your .env from the template
cp .env.example .env

# Generate required secrets
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Kluczowe zmienne na potrzeby developmentu:

| Zmienna                | Domyślna (dev)           | Opis                        |
| ---------------------- | ------------------------ | --------------------------- |
| `PORT`                 | `20128`                  | Port serwera                |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Bazowy URL frontendu        |
| `JWT_SECRET`           | (wygeneruj powyżej)      | Sekret do podpisywania JWT  |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Hasło pierwszego logowania  |
| `APP_LOG_LEVEL`        | `info`                   | Poziom szczegółowości logów |

### Ustawienia dashboardu

Dashboard udostępnia przełączniki UI dla funkcji, które można też konfigurować przez zmienne środowiskowe:

| Lokalizacja ustawienia | Przełącznik        | Opis                              |
| ---------------------- | ------------------ | --------------------------------- |
| Settings → Advanced    | Debug Mode         | Włącz logi debugowania żądań (UI) |
| Settings → General     | Sidebar Visibility | Pokaż/ukryj sekcje paska bocznego |

Te ustawienia są przechowywane w bazie danych i utrzymują się po restarcie, nadpisując domyślne wartości env var, gdy są ustawione.

### Uruchamianie lokalnie

```bash
# Development mode (hot reload)
npm run dev

# Production build
npm run build    # next build → .build/next/ then assembleStandalone → dist/
npm run start

# Release build (clean rebuild + HEAD sentinel — required for deploy)
npm run build:release   # rm -rf .build dist && build + writes dist/BUILD_SHA

# Common port configuration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

### Układ artefaktów builda

| Katalog   | Zawartość                                                                    | Śledzony |
| --------- | ---------------------------------------------------------------------------- | -------- |
| `src/`    | Kod źródłowy aplikacji (TypeScript / TSX)                                    | Tak      |
| `.build/` | Pliki pośrednie — wyjście `next build` (gitignored, `distDir = .build/next`) | Nie      |
| `dist/`   | Pakiet do dystrybucji — składany przez `assembleStandalone` (gitignored)     | Nie      |

Pipeline builda to jedno przejście:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js output)
  └─ assembleStandalone()                 (copies standalone + static + public + native assets)
       └─ output: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` dodatkowo najpierw czyści oba katalogi i zapisuje
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) jako sentinel integralności deployu.

> **Uwaga o deployu VPS:** zdalny katalog obrazu `/usr/lib/node_modules/omniroute/app/`
> pozostaje bez zmian. Skille deployu robią rsync zawartości `dist/` do tego katalogu.
> Zmieniła się tylko ścieżka wyjścia builda w repozytorium (`app/` → `dist/`).

Domyślne URL-e:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Przepływ pracy Git

> ⚠️ **NIGDY nie commituj bezpośrednio do `main`.** Zawsze używaj branchy funkcyjnych.
>
> **Baza PR:** celuj w aktywny branch `release/vX.Y.Z` (nie `main`). Zobacz
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) dla modelu
> release-per-branch + tag-at-ship.

```bash
# Branch from the active release tip (example: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... make changes ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Open a Pull Request with base = release/v3.8.49
```

### Nazewnictwo branchy

| Prefiks     | Przeznaczenie             |
| ----------- | ------------------------- |
| `feat/`     | Nowe funkcje              |
| `fix/`      | Poprawki błędów           |
| `refactor/` | Restrukturyzacja kodu     |
| `docs/`     | Zmiany w dokumentacji     |
| `test/`     | Dodawanie/poprawki testów |
| `chore/`    | Tooling, CI, zależności   |

### Komunikaty commitów

Stosuj [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Uruchamianie testów

```bash
# All tests (unit + vitest + ecosystem + e2e)
npm run test:all

# Single test file (Node.js native test runner — most tests use this)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E tests (requires Playwright)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem compatibility tests
npm run test:ecosystem

# Coverage gate: 60% statements/lines/functions/branches
npm run test:coverage
npm run coverage:report

# Lint + format check
npm run lint
npm run check

# Gated real-upstream combo smoke (requires VPS access + real provider credits)
# Hits REAL providers — costs a little. NEVER runs in CI. Skips cleanly without the gate.
# Needs: ssh root@192.168.0.15 access (sources a read-only DB snapshot from the VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — plain Node ESM scripts, hit the live .15 server directly.
# Requires: ssh root@192.168.0.15 access (combos created/torn down via SSH sqlite).
# Hits REAL providers (small cost). Creates/deletes only __live_test__* combos. NEVER runs in CI.
# REQUIRE_API_KEY=false on .15 so no API key needed, but honors COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY if set.
npm run test:combo:live:vps              # 7 HTTP scenarios (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # adds a real cross-provider failover scenario (8 total)
```

Uwagi o coverage:

- `npm run test:coverage` mierzy pokrycie źródeł głównego pakietu testów jednostkowych, wyklucza `tests/**` i obejmuje `open-sse/**`
- Pull requesty muszą utrzymywać próg coverage na poziomie **60%+** statements/lines/functions/branches
- Jeśli PR zmienia kod produkcyjny w `src/`, `open-sse/`, `electron/` lub `bin/`, musi dodać lub zaktualizować automatyczne testy w tym samym PR
- `npm run coverage:report` wypisuje szczegółowy raport plik po pliku z ostatniego uruchomienia coverage
- `npm run test:coverage:legacy` zachowuje starszą metrykę do porównań historycznych
- Zobacz `docs/ops/COVERAGE_PLAN.md` dla etapowego planu poprawy coverage

### Wymagania wobec pull requestów

Przed otwarciem PR uruchom skupioną pętlę dla tego, co zmieniłeś. Pełny pakiet testów
jednostkowych (4 shardy CI), Vitest, próg coverage **60%+** oraz build produkcyjny to
odpowiedzialność CI — lokalne ich uruchamianie nie daje sygnału, którego nie dadzą już
checki PR, a na mniejszych maszynach może nasycić host (#8084):

- Uruchom pliki testów obejmujące Twoją zmianę: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Uruchom `npm run lint`
- Dołącz lub zaktualizuj automatyczne testy w tym samym PR przy każdej zmianie kodu produkcyjnego
- W opisie PR wymień zmienione lub dodane pliki testów, gdy zmieniał się kod produkcyjny
- Sprawdź wynik SonarQube na PR, gdy sekrety projektu są skonfigurowane w CI

Aktualny status testów: **122 pliki testów jednostkowych** obejmujące:

- Translatory providerów i konwersję formatów
- Rate limiting, circuit breaker i resilience
- Semantic cache, idempotency, śledzenie postępu
- Operacje na bazie danych i schemat (21 modułów DB)
- Przepływy OAuth i uwierzytelnianie
- Walidację endpointów API (Zod v4)
- Narzędzia serwera MCP i egzekwowanie scope’ów
- Systemy Memory i Skills

---

## Styl kodu

- **ESLint** — Uruchom `npm run lint` przed commitem
- **Prettier** — Autoformatowanie przez `lint-staged` przy commicie (2 spacje, średniki, podwójne cudzysłowy, szerokość 100 znaków, przecinki końcowe es5)
- **TypeScript** — Cały kod w `src/` używa `.ts`/`.tsx`; `open-sse/` używa `.ts`/`.js`; dokumentuj przez TSDoc (`@param`, `@returns`, `@throws`)
- **Bez `eval()`** — ESLint egzekwuje `no-eval`, `no-implied-eval`, `no-new-func`
- **Walidacja Zod** — Używaj schematów Zod v4 do walidacji wszystkich wejść API
- **Nazewnictwo**: Pliki = camelCase/kebab-case, komponenty = PascalCase, stałe = UPPER_SNAKE

### Obsługa błędów / puste bloki catch

Nigdy nie zostawiaj `catch` bez wyjaśnienia. Przypisz go do jednego z dwóch kubełków (operacjonalizuje
twardą regułę „nigdy nie połykaj po cichu błędów w strumieniach SSE”):

- **Zamierzone (nasze własne best-effort cleanup/telemetry)** — awaria tutaj jest oczekiwana i
  nieszkodliwa; dodaj jednoliniowy komentarz z uzasadnieniem, bez logowania (logowanie przy każdym
  żądaniu to szum, którego ta konwencja unika).

  ```ts
  } catch {} // closing an already-closed controller after client disconnect is expected
  ```

- **Należy zalogować (kod zewnętrzny/dostarczony przez wywołującego, albo połykanie zmienia flow sterowania)** — zachowaj
  catch (nigdy nie pozwól mu przerwać streamu), ale wyemituj kontekstowy `console.debug`/`warn`, aby
  awaria była wykrywalna.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure callback error:", e);
  }
  ```

Zobacz `open-sse/utils/stream.ts` i `open-sse/utils/streamHandler.ts` jako zastosowane przykłady.

---

## Struktura projektu

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (21 modules + 16 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (177), MCP scopes, 14 routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 14 provider-specific request executors
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (25 tools, 3 transports, 10 scopes)
├── services/               # 36+ services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (1,574 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/
├── adr/                     # Architecture Decision Records
├── architecture/            # System architecture & resilience
├── comparison/              # OmniRoute vs alternatives
├── compression/             # Compression guides & rules
├── dev/                     # Development guides
├── diagrams/                # Architecture diagrams
├── frameworks/              # MCP, A2A, OpenCode, Memory, Skills
├── guides/                  # User guide, Docker, setup, troubleshooting
├── i18n/                    # Internationalized README translations
├── marketing/               # Marketing materials
├── ops/                     # Deployment, proxy, coverage, releases
├── providers/               # Provider-specific docs
├── reference/               # API reference, env vars, CLI tools, free tiers
├── releases/                # Release notes
├── routing/                 # Auto-combo engine, reasoning replay
├── screenshots/             # Dashboard screenshots
├── security/                # Guardrails, compliance, stealth, tokens
└── specs/                   # Design specs
```

---

## Dodawanie nowego providera

### Krok 1: Zarejestruj stałe providera

Dodaj do `src/shared/constants/providers.ts` — walidacja Zod przy ładowaniu modułu.

### Krok 2: Dodaj executor (jeśli potrzebna logika niestandardowa)

Utwórz executor w `open-sse/executors/your-provider.ts` rozszerzający bazowy executor.

### Krok 3: Dodaj translator (jeśli format inny niż OpenAI)

Utwórz translatory request/response w `open-sse/translator/`.

### Krok 4: Dodaj konfigurację OAuth (jeśli oparty o OAuth)

Dodaj poświadczenia OAuth w `src/lib/oauth/constants/oauth.ts` oraz serwis w `src/lib/oauth/services/`.

Jeśli upstream provider dystrybuuje publiczny OAuth client_id/secret lub klucz Firebase Web API w swoim publicznym CLI / pakiecie przeglądarkowym, **nie** osadzaj go jako literału stringowego. Użyj `resolvePublicCred()` z `open-sse/utils/publicCreds.ts` i dodaj zamaskowany wpis bajtowy do `EMBEDDED_DEFAULTS`. Pełny obowiązkowy workflow jest udokumentowany w [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md).

Wewnątrz handlers/executors komunikaty błędów docierające do klienta muszą przechodzić przez `buildErrorBody()` / `sanitizeErrorMessage()` z `open-sse/utils/error.ts` — nigdy nie umieszczaj surowego `err.stack` ani `err.message` w ciele Response. Zobacz [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Krok 5: Zarejestruj modele

Dodaj definicje modeli w `open-sse/config/providerRegistry.ts`.

### Krok 6: Dodaj testy

Napisz testy jednostkowe w `tests/unit/` obejmujące co najmniej:

- Rejestrację providera
- Translację request/response
- Obsługę błędów

---

## Checklista pull requesta

- [ ] Testy przechodzą (`npm test`)
- [ ] Linting przechodzi (`npm run lint`)
- [ ] Build się udaje (`npm run build`)
- [ ] Dodane typy TypeScript dla nowych publicznych funkcji i interfejsów
- [ ] Brak zahardkodowanych sekretów lub wartości fallback
- [ ] Publiczne poświadczenia upstream osadzone przez `resolvePublicCred()` (zobacz [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), nigdy jako literały
- [ ] Odpowiedzi błędów idą przez `buildErrorBody()` / `sanitizeErrorMessage()` — bez surowych stack trace’ów w ciałach odpowiedzi (zobacz [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Komendy powłoki (`exec` / `spawn`) przekazują wartości runtime przez `env`, nie przez interpolację stringów
- [ ] Wszystkie wejścia walidowane schematami Zod
- [ ] Dodany **fragment** changelogu w `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` dla zmian widocznych dla użytkownika (zobacz [`changelog.d/README.md`](./changelog.d/README.md)) — **nie** edytuj `CHANGELOG.md` bezpośrednio; fragmenty są agregowane w czasie release i nigdy nie kolidują między PR-ami
- [ ] Zaktualizowana dokumentacja (jeśli dotyczy)
- [ ] Brak nowych alertów CodeQL / Secret-Scanning, albo każdy odrzucony z technicznym uzasadnieniem odwołującym się do odpowiedniego dokumentu w `docs/security/`
- [ ] Trasy uruchamiające procesy potomne (`/api/mcp/`, `/api/cli-tools/runtime/`) sklasyfikowane jako `isLocalOnlyPath()` w `src/server/authz/routeGuard.ts` — zobacz [Hard Rule #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Brak trailerów `Co-Authored-By` w komunikatach commitów — commity muszą figurować wyłącznie pod tożsamością Git właściciela repozytorium (Hard Rule #16)

---

## Wydawanie wersji

Wydania są zarządzane przez workflow `/generate-release`. Gdy tworzony jest nowy GitHub Release, pakiet jest **automatycznie publikowany do npm** przez GitHub Actions.

Do deployów VPS używaj `npm run build:release` (nie `npm run build`) — wykonuje czysty
rebuild, składa pakiet do `dist/` i zapisuje sentinel `dist/BUILD_SHA`.
Następnie użyj skilli `/deploy-vps-*-cc`, które robią rsync `dist/` do zdalnego katalogu `app/`.

---

## Pomoc

- **Architektura**: Zobacz [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **Dokumentacja API**: Zobacz [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Dokumenty bezpieczeństwa**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Dokumenty ops**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR-y**: Zobacz `docs/adr/` dla architectural decision records
