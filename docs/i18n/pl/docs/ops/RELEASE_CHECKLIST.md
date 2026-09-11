---
title: "Checklista wydania"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Checklista wydania

> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40
> Uproszczony przepływ wydania wykorzystujący skill-e Claude Code do automatyzacji.
>
> **Utrzymuj kolejkę/gałąź na zielono między wydaniami:** zobacz [RELEASE_GREEN.md](./RELEASE_GREEN.md)
> (rodzina `/green-prs` + `npm run check:release-green` + `/babysit` + nightly). Uruchamianie
> tego okresowo — a zwłaszcza **przed** tą checklistą — sprawia, że PR wydania startuje na zielono.

## TL;DR

```bash
# 1. Bump version + generate CHANGELOG (skill)
/version-bump-cc patch    # or minor/major

# 2. Run quality gate locally
npm run check              # lint + tests
npm run test:coverage      # full coverage gate (60/60/60/60)

# 3. Build & smoke
npm run build
npm run test:e2e           # optional but recommended

# 4. Generate release (skill)
/generate-release-cc

# 5. Deploy (skill)
/deploy-vps-both-cc        # or akamai-cc / local-cc

# 6. Capture release evidences (skill)
/capture-release-evidences-cc
```

## Publikacja etapowa npm (domyślnie od v3.8.49 — WS1.3/D2)

Workflow npm-publish nie publikuje już bezpośrednio: bootuje spakowany tarball
(`check:pack-boot`), a następnie uruchamia `npm stage publish` — dokładne bajty są parkowane w
rejestrze, **nie da się ich zainstalować**, dopóki właściciel nie zatwierdzi. Ludzka bramka 2FA
przeniosła się na PO dowodzie, a nie przed nim.

**Przepływ właściciela po zejściu workflow na zielono:**

1. `npm stage list omniroute` — znajdź stage id (wypisywany też w podsumowaniu workflow).
2. Zweryfikuj zaparkowane bajty (zalecane): `npm stage download <id>`, potem zainstaluj
   pobrany tarball do tymczasowego prefiksu i zbootuj go (`npm run check:pack-boot` automatyzuje
   ten sam werdykt pack→install→boot w CI).
3. `npm stage approve <id>` — monity 2FA TO jest publikacja. `npm stage reject <id>` odrzuca.
4. Siatka po publikacji: weryfikator post-publish (WS1.4 planu v3.8.49) instaluje
   opublikowaną wersję z publicznego rejestru w czystym kontenerze i ją bootuje.

**Awaryjny fallback:** `workflow_dispatch` z `publish_mode=direct` przywraca
legacy natychmiastowe `npm publish` (używaj tylko gdy sam staging się psuje; zanotuj dlaczego).

**Jednorazowe utwardzenie (właściciel, npmjs.com):** skonfiguruj Trusted Publisher dla
`omniroute` w trybie stage-only, żeby wycieknięty długotrwały token nie mógł `npm publish`
bezpośrednio skądkolwiek — CI może tylko stage'ować; tylko 2FA właściciela wypuszcza.

**Playbook zepsutego artefaktu (bez zmian):** `npm deprecate omniroute@<bad> "<reason> — use <fixed>"`
jako domyślny odruch (minuty, odwracalne); `npm unpublish` tylko w oknie 72h/no-dependents
i nigdy jako pierwszy ruch. Docker: nigdy nie nadpisuj tagu wersji — rollback to
przepięcie `latest` na ostatni dobry digest.

## Szybki pas hotfix (etykieta `hotfix`)

PR z etykietą `hotfix` pomija ciężką macierz CI (9-shard E2E, coverage ratchet,
quality-gate, quality-extended) i zostawia szybkie, wysokosygnałowe bramki: build,
unit shards, integration, vitest, lint/typecheck, docs-sync, `check:pack-artifact`
oraz tarball boot-smoke (`check:pack-boot`). Cel: zieleń w ≤15 min zamiast ~33 min.

**Polityka wejścia — wszystkie cztery wymagane (wzorowane na pasach awaryjnych Chromium/VS Code/Node):**

1. **Severity**: produkcja jest zepsuta — opublikowany artefakt pada przy bootcie / poprawka
   bezpieczeństwa / każdy użytkownik wydania jest dotknięty. „Ważne” to nie „zepsute”.
2. **Authority**: tylko właściciel repozytorium nakłada etykietę `hotfix`. Etykieta JEST
   zatwierdzeniem — nigdy self-serve na PR-ze kampanii.
3. **Evidence**: treść PR linkuje poprzedni w pełni zielony heavy run (suite, którą
   pominięte joby by ponownie walidowały) plus własny test poprawki failing-then-passing.
4. **Scope**: wyłącznie cherry-pick — minimalna poprawka, bez refaktorów, bez ride-alongów.

Pominięta powierzchnia coverage/ratchet jest ponownie walidowana przez kolejny pełny run na
gałęzi release (continuous release-green) — pas pomija OCZEKIWANIE, nigdy walidację.
Diffy tylko-testowe (wszystkie pliki pod `tests/`, żaden pod `tests/e2e/`) pomijają macierz E2E
automatycznie, bez żadnej etykiety.

## Szczegółowa checklista

### Przed wydaniem

- [ ] Wszystkie PR-y celujące w to wydanie są zmergowane do `release/vX.Y.0`
- [ ] Wszystkie otwarte pozycje Linear/issue dla tej wersji są zamknięte lub przeniesione do następnego milestone
- [ ] CI zielone na gałęzi `release/vX.Y.0`
- [ ] Brak markerów `TODO(release)` w kodzie: `grep -r "TODO(release)" src/ open-sse/`
- [ ] Obraz bazowy Docker aktualny (obecnie `node:24.15.0-trixie-slim`)

### Wersja i changelog

- [ ] Uruchom `/version-bump-cc <patch|minor|major>` (skill Claude Code)
  - Podbija `package.json`, `electron/package.json`
  - Regeneruje `CHANGELOG.md` z commitów gita od ostatniego tagu
  - Aktualizuje badge'e w README.md
- [ ] Ręcznie przejrzyj CHANGELOG.md i w razie potrzeby wyczyść komunikaty commitów
- [ ] Upewnij się, że najnowsza sekcja semver w `CHANGELOG.md` równa się wersji z `package.json`
- [ ] Zachowaj `## [Unreleased]` jako pierwszą sekcję changelogu na nadchodzącą pracę
- [ ] Zaktualizuj `docs/openapi.yaml` → `info.version` musi równać się wersji z `package.json`

### Jakość kodu

- [ ] `npm run lint` — 0 błędów (ostrzeżenia są preexisting)
- [ ] `npm run typecheck:core` — czysto
- [ ] `npm run typecheck:noimplicit:core` — czysto (strict)
- [ ] `npm run check:cycles` — brak cyklicznych zależności
- [ ] `npm run check:any-budget:t11` — w budżecie
- [ ] `npm run check:route-validation:t06` — czysto
- [ ] `npm run check:node-runtime` — spełnione minimum wspieranego runtime (`>=22.22.2 <23`, `>=24.0.0 <27`, wg `SUPPORTED_NODE_RANGE` w `src/shared/utils/nodeRuntimeSupport.ts`; zgodne z `engines` w `package.json`)

### Testy

- [ ] `npm run test:unit` — pass
- [ ] `npm run test:vitest` — pass (MCP server, autoCombo, cache)
- [ ] `npm run test:coverage` — bramka 60/60/60/60 spełniona (statements/lines/functions/branches)
- [ ] `npm run test:integration` — pass (jeśli zmiany dotykają DB / handlerów)
- [ ] `npm run test:combo:matrix` — pass (macierz strategii combo: deterministycznie dowodzi decyzji selekcji wszystkich 19 publicznych strategii routingu; uruchamiaj przy zmianach combo routing, strategy resolution lub logiki fallback)
- [ ] `RUN_COMBO_LIVE=1 npm run test:combo:live` — **opcjonalne/ręczne** (bramkowany smoke na realnym upstreamie; bierze snapshot DB tylko do odczytu z VPS `root@192.168.0.15`; uderza w realnych providerów, zużywa kredyty; nigdy nie biegnie w CI; bez bramki pomija się czysto)
- [ ] `npm run test:combo:live:vps` — **opcjonalne/ręczne** (Phase-3 VPS live smoke: 7 scenariuszy HTTP przeciw żywemu serwerowi `.15` przez plain Node ESM; wymaga `ssh root@192.168.0.15`; tworzy/usuwa tylko combo `__live_test__*`; uderza w realnych providerów; nigdy nie biegnie w CI)
- [ ] `npm run test:e2e` — pass (zmiany UI)
- [ ] `npm run test:protocols:e2e` — pass (zmiany MCP/A2A)
- [ ] `npm run test:ecosystem` — pass

### Hooki (walidowane Husky)

Hooki Husky leżą w `.husky/` i uruchamiają się automatycznie przy operacjach gita.

- **pre-commit:** `npx lint-staged + node scripts/check/check-docs-sync.mjs + npm run check:any-budget:t11`
- **pre-push:** szybkie deterministyczne bramki — `npm run check:any-budget:t11 && npm run check:tracked-artifacts` (aktywowane 2026-06-13). Celowo wyklucza `test:unit` (wolne; pokryte przez job CI `test-unit`).
  - Uruchom `npm run test:unit` ręcznie przed pushem gałęzi release.

Jeśli hook padnie: napraw przyczynę, nie omijaj przez `--no-verify`.

### Conventional Commits

Wszystkie commity idące do wydania muszą mieć format `type(scope): subject`.

**Dozwolone typy:** `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `style`, `ci`

**Dozwolone scope'y:** `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`

Breaking changes: dodaj stopkę `BREAKING CHANGE:` albo `!` po scope (np. `feat(api)!: drop /v0`).

### Dokumentacja

- [ ] `npm run check:docs-sync` przechodzi (auto-run w pre-commit)
- [ ] `npm run check:docs-all` przechodzi (parasol: docs-sync + docs-counts + env-doc-sync + deprecated-versions + doc-links)
- [ ] `npm run check:env-doc-sync` kończy się kodem 0 — kontrakt env code ↔ `.env.example` ↔ `docs/reference/ENVIRONMENT.md` jest nienaruszony
- [ ] `npm run check:doc-links` kończy się kodem 0 — brak zepsutych wewnętrznych referencji markdown po restrukturyzacji
- [ ] `docs/architecture/ARCHITECTURE.md` przejrzany pod dryf storage/runtime
- [ ] `docs/guides/TROUBLESHOOTING.md` przejrzany pod dryf env var i operacyjny
- [ ] Jeśli `.env.example` się zmienił: zaktualizowano `docs/reference/ENVIRONMENT.md`
- [ ] Jeśli nowa funkcja ma UI: `docs/guides/USER_GUIDE.md` o niej wspomina
- [ ] Jeśli nowa funkcja ma API: zaktualizowano `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`
- [ ] Jeśli nowa funkcja to moduł: istnieje dedykowany `docs/<MODULE>.md`
- [ ] Jeśli breaking change: `docs/guides/TROUBLESHOOTING.md` ma notatkę migracyjną

### i18n

- [ ] `npm run i18n:check` kończy się kodem 0 — stan tłumaczeń (`.i18n-state.json`) zsynchronizowany ze źródłowymi docs (brak dryfujących źródeł w trybie strict; doradztwo warn-mode jest akceptowalne przy last-minute poprawkach docs, ale przed tagowaniem powinno być 0)
- [ ] `npm run i18n:check-ui-coverage` kończy się kodem 0 — każdy locale UI na lub powyżej progu pokrycia 80%
- [ ] `npm run i18n:sync-ui:dry` raportuje 0 brakujących kluczy we wszystkich 42 locale
- [ ] Jeśli źródłowe angielskie docs się zmieniły, uruchom `npm run i18n:run` (wymaga `OMNIROUTE_TRANSLATION_API_KEY` w `.env`) przed tagowaniem
- [ ] Wkłady tłumaczeniowe można odłożyć na następne wydanie, jeśli drobne (śledź w CHANGELOG)

### Migracje bazy danych

- [ ] Jeśli `src/lib/db/migrations/` ma nowe pliki:
  - [ ] Każda migracja jest idempotentna (`CREATE TABLE IF NOT EXISTS` itd.)
  - [ ] Migracje owinięte w transakcje
  - [ ] Ponumerowane poprawnie (bez luk w sekwencji)
- [ ] Test na świeżej instalacji: usuń `~/.omniroute/omniroute.db` i uruchom `npm run dev`
- [ ] Test na istniejącej instalacji: backup DB, uruchom migrację, zweryfikuj schemat
- [ ] Pliki WAL (`-wal`, `-shm`) obsłużone poprawnie, jeśli migracja przepisuje tabele

### Katalog providerów (walidowany Zod)

- [ ] Schemat Zod `src/shared/constants/providers.ts` poprawny w czasie ładowania
  - [ ] Wszyscy providerzy mają wymagane pola (`id`, `label`, `kind` itd.)
  - [ ] `freeNote` podane dla nowych darmowych providerów
  - [ ] Providerzy OAuth mają `oauthConfig` zarejestrowany w `src/lib/oauth/constants/oauth.ts`
- [ ] Jeśli dodano nowego providera: odpowiadający executor w `open-sse/executors/`
- [ ] Jeśli format inny niż OpenAI: translator w `open-sse/translator/`
- [ ] Modele zarejestrowane w `open-sse/config/providerRegistry.ts`
- [ ] Testy jednostkowe w `tests/unit/` pokrywają klasyfikację i routing providerów

### Desktop (Electron)

Jeśli zmieniło się `electron/`:

- [ ] `npm run electron:smoke:packaged` przechodzi
- [ ] Buildy przetestowane dla co najmniej jednego z `:win`, `:mac`, `:linux`
- [ ] Certyfikaty code signing nie wygasły (jeśli signing)
- [ ] Wersja `electron/package.json` zgadza się z root `package.json`
- [ ] Wskaźnik kanału auto-update zaktualizowany, jeśli wypuszczasz na `stable`

### Układ buildu

Repozytorium używa trzech odrębnych katalogów wyjściowych — nigdy ich nie myl:

| Directory | Purpose                                                  | Tracked?        |
| --------- | -------------------------------------------------------- | --------------- |
| `src/`    | Application source (TypeScript / TSX)                    | Yes             |
| `.build/` | Build intermediates — `next build` output (`distDir`)    | No (gitignored) |
| `dist/`   | Shippable npm bundle — assembled by `assembleStandalone` | No (gitignored) |

> **Notatka operatorska:** zdalny katalog obrazu VPS pozostaje `/usr/lib/node_modules/omniroute/app/`.
> Przeniesione zostało tylko wyjście buildu **w repo** (`app/` → `dist/`). Skill-e deploy rsyncują
> zawartość `dist/` do zdalnego katalogu `app/` — nie wymagane żadne zmiany ścieżek VPS.

**Przepływ single-build:**

```
npm run build:release
  └─ rm -rf .build dist          (clean)
  └─ next build → .build/next/   (intermediates)
  └─ assembleStandalone          (copies standalone + static + public + natives → dist/)
  └─ writes dist/BUILD_SHA       (HEAD sentinel)
```

NIE uruchamiaj `npm run build` a potem osobnego `npm run build:cli` pod deploy — użyj
`npm run build:release`, które robi czysty rebuild + sentinel w jednej komendzie.

### Walidacja artefaktów

- [ ] `npm run build:release` kończy się sukcesem i `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] `npm run check:pack-artifact` czysto — brak `app.__qa_backup`, `scripts/scratch`, `package-lock.json` ani innego lokalnego residualu
- [ ] `dist/server.js` istnieje po buildzie

### Tagowanie i release

- [ ] Uruchom `/generate-release-cc` (skill Claude Code):
  - Tworzy tag `vX.Y.Z`
  - Pushuje tag i gałąź
  - Otwiera GitHub Release z ciałem changelogu
  - Dołącza instalatory Electron (jeśli zbudowane)
- [ ] Albo ręcznie:
  ```bash
  git tag -a vX.Y.Z -m "Release vX.Y.Z"
  git push origin vX.Y.Z
  gh release create vX.Y.Z --notes-from-tag
  ```

### Deploy

Skill-e deploy używają lekkiego przepływu rsync — bez `npm pack`, bez `npm i -g`:

- [ ] Użyj skill-a deploy pasującego do celu:
  - `/deploy-vps-local-cc` — lokalny VPS (192.168.0.15)
  - `/deploy-vps-akamai-cc` — Akamai VPS (69.164.221.35)
  - `/deploy-vps-both-cc` — oba
- [ ] Przed deployem potwierdź `dist/BUILD_SHA` == `git rev-parse --short HEAD`
- [ ] Build musi iść tam, gdzie `node_modules` jest realne (główny checkout lub worktree po `npm ci` — NIE zlinkowany symlinkami worktree)
- [ ] Smoke test wdrożonej instancji:
  - Otwórz `/dashboard/health` → sprawdź, że string wersji pasuje do wydania
  - Uruchom request `/v1/chat/completions` przeciw znanemu providerowi
  - Zweryfikuj, że `/api/monitoring/health` zwraca circuit breakery `CLOSED`
  - Potwierdź, że transporty MCP odpowiadają (`/mcp` HTTP, `/mcp-sse` SSE)

### Po wydaniu

- [ ] Uruchom `/capture-release-evidences-cc` (skill Claude Code)
  - Przechwytuje zrzuty/nagrania WebP nowych funkcji
  - Dołącza do release notes / posta na blogu
- [ ] Zaktualizuj GitHub Discussions / Discord ogłoszeniem wydania
- [ ] Otwórz milestone na następną wersję
- [ ] Jeśli krytyczne: przypnij dyskusję lub wrzuć do `news.json` baner in-app

## Smoke embedded services (v3.8.4+)

Przed wypuszczeniem dowolnego wydania zawierającego zmiany embedded services zweryfikuj:

### Boot na świeżej DB (łapie kolizje migracji — dodane po hotfixie v3.8.4)

- [ ] `DATA_DIR=$(mktemp -d) npm start &` — poczekaj 10 s na boot
- [ ] `curl -s http://127.0.0.1:20128/api/services/9router/status | jq '.tool'` zwraca `"9router"` (NIE 404, NIE 500). Potwierdza, że migracja `071_services.sql` się zastosowała + wiersz zaseedowany.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(version_manager);" | grep -E "provider_expose|logs_buffer_path|last_sync_at"` zwraca 3 wiersze.
- [ ] `sqlite3 $DATA_DIR/storage.sqlite "PRAGMA table_info(webhooks);" | grep -E "kind|metadata_encrypted"` zwraca 2 wiersze (waliduje zastosowanie `070_webhooks_kind_metadata.sql`).
- [ ] `node --import tsx/esm --test tests/unit/db/no-migration-collisions.test.ts` przechodzi — strzeże przed przyszłymi kolizjami.

### 9Router

- [ ] `POST /api/services/9router/install` zwraca 200 z `installedVersion` w poniżej 2 min
- [ ] `POST /api/services/9router/start` zwraca 200 i `state: "running"` w poniżej 30 s
- [ ] `GET /api/services/9router/status` raportuje `health: "healthy"`
- [ ] `POST /v1/chat/completions` z `"model": "9router/auto/..."` zwraca 200 (routing end-to-end przez 9Router)
- [ ] `GET /dashboard/providers/services/9router/embed/dashboard` renderuje natywne UI 9Router wewnątrz proxy (bez bezpośredniego iframe `127.0.0.1:port`)
- [ ] `POST /api/services/9router/rotate-key` zwraca `{ keyRotated: true }` i usługa restartuje się czysto
- [ ] `POST /api/services/9router/stop` zwraca 200 i `state: "stopped"`
- [ ] `GET /api/services/9router/logs?tail=50` zwraca stream SSE z eventem `snapshot` zawierającym ostatnie linie
- [ ] Instalacja w środowisku bez `npm` w PATH zwraca 500 z przyjaznym (bez stack-trace) komunikatem błędu

### CLIProxyAPI

- [ ] `POST /api/services/cliproxy/install` zwraca 200 w poniżej 2 min
- [ ] `POST /api/services/cliproxy/start` zwraca 200 i `state: "running"` w poniżej 30 s
- [ ] `GET /api/services/cliproxy/status` raportuje `health: "healthy"`
- [ ] `POST /api/services/cliproxy/stop` zwraca 200 i `state: "stopped"`
- [ ] `GET /api/services/cliproxy/logs?tail=50` zwraca stream SSE

### Regresja bezpieczeństwa

- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/9router/start` zwraca `403 LOCAL_ONLY`
- [ ] `curl -H "X-Forwarded-For: 1.2.3.4" http://localhost:20128/api/services/cliproxy/start` zwraca `403 LOCAL_ONLY`
- [ ] Odpowiedzi błędów z `/api/services/*` nie zawierają `err.stack` ani bezwzględnych ścieżek plików

## Kontrole v3.8.0+

Przed wypuszczeniem dowolnego wydania v3.8.x zweryfikuj te dodatkowe pozycje:

- [ ] `omniroute --tray` bootuje na macOS (systray2 instalowany do `~/.omniroute/runtime/`)
- [ ] `omniroute --tray` bootuje na Linux (wymaga DISPLAY; graceful error jeśli nie ustawione)
- [ ] `omniroute --tray` bootuje na Windows (PowerShell NotifyIcon, bez dodatkowych binarek)
- [ ] `omniroute config tray enable` tworzy wpis autostart; disable go usuwa
- [ ] `npm install -g omniroute@<this-version>` uruchamia postinstall bez fatalnego wyjścia
- [ ] Ścieżka update zachowuje optional deps: `omniroute update --apply` i auto-updater
      uruchamiają `npm install -g … --include=optional`, żeby `optionalDependencies` (better-sqlite3,
      keytar, tls-client oraz stack SLM llmlingua: `@atjsh/llmlingua-2@2.0.5`,
      `js-tiktoken`) przeżyły update. Tier ultra `modelPath` SLM potrzebuje też
      modelu tinybert, auto-pobieranego do `${DATA_DIR}/models/llmlingua` przy pierwszym użyciu. Postinstall
      (`scripts/build/colocateOptionals.mjs`) następnie ko-lokuje opcjonalne zamknięcie SLM do
      `dist/node_modules`, żeby worker rozwiązywał JEDNĄ instancję `@huggingface/transformers` ^4.2.0
      — standalone trace bundluje tylko transformers, nie dynamicznie importowane
      optionals, więc bez tego worker załadowałby llmlingua-2 przeciw transformers z roota
      i tier SLM cicho fail-openowałby.
- [ ] `omniroute status` działa bez `.env` (ścieżka tokenu CLI, tylko loopback)
- [ ] `curl http://localhost:20128/api/shutdown` zwraca 401 (trasa zawsze chroniona)
- [ ] `curl -H "host: evil.com" http://localhost:20128/api/mcp/sse` zwraca 401 (strażnik loopback)
- [ ] Runtime SQLite resolvuje do `bundled` przy pierwszym uruchomieniu (bundlowana binarka poprawna dla platformy)
- [ ] Runtime SQLite spada na `runtime`, gdy `node_modules/better-sqlite3` jest usunięte
- [ ] Smart MCP filter kompresuje realny output `playwright-mcp browser_snapshot` (redukcja ≥50%)
- [ ] Wszystkie 10 plików `skills/omniroute*/SKILL.md` są publicznie pobieralne przez raw GitHub URL
- [ ] Kreator onboardingu pokazuje krok tour „How It Works” tier na świeżym setupie
- [ ] Widget pokrycia tierów na home dashboard pokazuje liczby configured/active

---

## Rollback

Jeśli wydanie ma krytyczny problem:

1. `gh release edit vX.Y.Z --prerelease` (oznacza jako nie-latest)
2. `git tag -d vX.Y.Z && git push --delete origin vX.Y.Z` (tylko jeśli użytkownicy jeszcze nie adoptowali)
3. Albo: hotfix na `release/vX.Y.0` → patch release `vX.Y.(Z+1)`
4. Natychmiast zakomunikuj w GitHub Discussions i Discord

## Twarde reguły

- Nigdy nie commituj bezpośrednio do `main`
- Nigdy nie używaj `git push --force` na gałęzie `main` ani `release/*`
- Nigdy nie pomijaj hooków Husky (`--no-verify`)
- Nigdy nie commituj sekretów, credentials ani plików `.env`
- Coverage musi zostać ≥60/60/60/60 (statements/lines/functions/branches)
- Zawsze dołączaj lub aktualizuj testy przy zmianie kodu produkcyjnego w `src/`, `open-sse/`, `electron/` lub `bin/`

## Automatyczna kontrola synchronizacji

Uruchom lokalnie strażnika sync docs przed otwarciem PR:

```bash
npm run check:docs-sync
```

CI też uruchamia tę kontrolę w `.github/workflows/ci.yml` (job lint).
