---
title: Odniesienie do bramek jakości
---

# Odniesienie do bramek jakości

Ten dokument jest autorytatywnym odniesieniem dla wszystkich bramek jakości CI w OmniRoute.
Opisuje każdą bramkę, co waliduje, w którym jobie CI działa, czy używa
baseline ratchet albo polityki pass/fail, oraz czy blokuje build, czy jest advisory.

Krótkie podsumowanie i politykę allowlist znajdziesz w sekcji „Quality Gates & Ratchets”
w `CLAUDE.md`.

---

## Inwentarz bramek (~50 skryptów)

Skrypty leżą w `scripts/check/` (bramki polityk) oraz `scripts/quality/` (silnik ratchet).
Źródłem prawdy CI jest `.github/workflows/ci.yml`.

### Szybka ścieżka PR do release (`quality.yml`)

`.github/workflows/quality.yml` działa na PR-ach celujących w `release/**`. Utrzymuje ruch
gałęzi kontrybutorów dzięki szybkim bramkom filtrowanym po ścieżkach, plus jeden advisory sygnał production-build dla
zmian w kodzie:

| Job                                              | Zakres                                                                                                                                                                                                                   | Blokująca                                                                              |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `Build (advisory)`                               | Non-draft PR-y kodowe i gałęzie kolejki Mergify; Node 24, `npm-ci-retry`, `check:node-runtime`, `npm run build` z `OMNIROUTE_USE_TURBOPACK=1`; bez uploadu artefaktów, bo żaden downstream quality job ich nie konsumuje | **Advisory** (`continue-on-error: true`; usuń po tygodniu stabilnych runów release-PR) |
| `Docs Gates (fast-path)`                         | PR-y docs/kod; API docs refs i docs-all                                                                                                                                                                                  | Tak                                                                                    |
| `Fast Quality Gates`                             | PR-y kodowe; static checks, typecheck, dashboard typecheck, impacted unit tests                                                                                                                                          | Tak                                                                                    |
| `Vitest (fast-path)`                             | PR-y kodowe; szybki suite vitest                                                                                                                                                                                         | Tak                                                                                    |
| `Unit Tests fast-path`                           | PR-y kodowe; 4-shard suite unit                                                                                                                                                                                          | Tak                                                                                    |
| `No new ESLint warnings`                         | PR-y kodowe; strażnik lint świadomy suppressions                                                                                                                                                                         | Tak dla own-origin, advisory dla forków                                                |
| `Merge integrity (changelog + generated skills)` | Non-draft PR-y; sync changelog i wygenerowanych skills                                                                                                                                                                   | Tak dla own-origin, advisory dla forków                                                |

### Job: `lint`

Działa na każdym PR do `main`. Blokuje merge przy failure.

| Skrypt (`npm run ...`)         | Waliduje                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Blokująca                                |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `check:node-runtime`           | Wersja Node.js mieści się w wspieranym zakresie                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Tak                                      |
| `check:cycles`                 | Circular imports — wszystkie moduły `src/` + `open-sse/`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Tak                                      |
| `check:route-validation:t06`   | Schematy Zod obecne na wszystkich trasach (polityka Tier 6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | Tak                                      |
| `check:any-budget:t11`         | Liczba `@ts-expect-error // any` nie przekracza budżetu (Tier 11 catraca)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Tak                                      |
| `check:provider-consistency`   | Każdy provider w `providers.ts` ma pasujący wpis w `providerRegistry.ts` (i odwrotnie, w ramach allowlist)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Tak                                      |
| `check:fetch-targets`          | Każdy `fetch("/api/...")` w client-side `src/` resolve’uje się do prawdziwego `route.ts`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | Tak                                      |
| `check:deps`                   | Wszystkie zależności instalowalne przez `npm install` we wszystkich `package.json` w repo są w `dependency-allowlist.json`; nowe unpinned lub slopsquatted pakiety flagowane                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Tak                                      |
| `audit:deps`                   | `npm audit` (root + electron) — brak high/critical advisories (nakłada się z osv `check:vuln-ratchet`; zob. Backlog racjonalizacji)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Tak                                      |
| `check:lockfile`               | Integralność `package-lock.json` — rejestr https, hashe integrity, brak host overrides                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Tak                                      |
| `check:licenses`               | Allowlist licencji SPDX dla zależności produkcyjnych                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Tak                                      |
| `check:tracked-artifacts`      | Brak artefaktów build / zcommitowanych symlinków `node_modules` (też w husky pre-commit; pre-push celowo lekki — #6716)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Tak                                      |
| `check:file-size`              | Żaden plik źródłowy nie przekracza capu per-extension (ratchet: frozen large files na liście `frozen`)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Tak                                      |
| `check:error-helper`           | Odpowiedzi błędów w executorach/handlerach używają `buildErrorBody()` / `sanitizeErrorMessage()` (Hard Rule #12)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                      |
| `check:migration-numbering`    | Pliki migracji SQL numerowane sekwencyjnie, bez luk i duplikatów                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                      |
| `check:public-creds`           | Brak literalnych OAuth `client_id`/`client_secret` ani kluczy Firebase Web poza `publicCreds.ts` (Hard Rule #11)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                      |
| `check:db-rules`               | Brak raw SQL poza modułami `src/lib/db/`; brak barrel-importów z `localDb.ts` (Hard Rules #2/#5)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                      |
| `check:known-symbols`          | Executory providerów, strategie routingu i translatory zarejestrowane w swoich dispatch tables odpowiadają plikom na dysku — brak orphaned lub undeclared symbols                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Tak                                      |
| `check:route-guard-membership` | Każda trasa spawnująca child process jest sklasyfikowana przez `isLocalOnlyPath()` (Hard Rules #15/#17)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Tak                                      |
| `check:test-discovery`         | Każdy plik `*.test.ts` / `*.spec.ts` w repo jest zbierany przez co najmniej jeden test runner (ratchet: lista orphan w `test-discovery-baseline.json` może tylko maleć)                                                                                                                                                                                                                                                                                                                                                                                                                                                       | Tak                                      |
| `check:docs-sync`              | Wersja CHANGELOG, wersja OpenAPI i `llm.txt` są zsynchronizowane                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | Tak                                      |
| `typecheck:core`               | Kompilacja TypeScript bez błędów (tylko advisory warnings)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Tak                                      |
| `typecheck:noimplicit:core`    | Strict `noImplicitAny` — forward-looking; wiele istniejących call sites wciąż wymaga adnotacji                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | **Advisory** (`continue-on-error: true`) |
| `check:dashboard-typecheck`    | `tsc` scoped do `src/app/(dashboard)/**` (#7033) — curated 27-plikowa allowlist `typecheck:core` nie obejmuje żadnego dashboard TSX, a `next build` też tego nie type-checkuje (`next.config.mjs` ustawia `ignoreBuildErrors: true`), więc regresje orphaned-identifier tam (#6625/#6909) były niewidoczne dla CI. Diff względem frozen baseline liczby per-file/per-TS-code (`config/quality/dashboard-typecheck-baseline.json`, ten sam wzorzec stale-enforcement co `check:known-symbols`) — tylko NOWE błędy ponad baselined count failują bramkę; ratchet down przez `--update`, gdy pre-existing error jest naprawiony. | Tak                                      |

### Job: `quality-gate`

Działa po `test-coverage`. Blokuje merge przy failure.

| Skrypt                       | Waliduje                                                                                                                   | Blokująca                 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| `quality:collect`            | Emits `quality-metrics.json` (liczba ESLint warnings, coverage ze scalanego raportu shardów)                               | Tak (upstream of ratchet) |
| `quality:ratchet`            | Każda metryka w `quality-baseline.json` nie zregresowała (ESLint warnings ≤ baseline; coverage ≥ baseline)                 | Tak                       |
| `check:duplication`          | Duplikacja kodu (jscpd@4) nie przekracza baseline w `quality-baseline.json`                                                | Tak                       |
| `check:complexity`           | File-level cyclomatic complexity nie przekracza capu (core ESLint `complexity` + `max-lines-per-function`)                 | Tak                       |
| `check:cognitive-complexity` | Ratchet cognitive complexity (`eslint-plugin-sonarjs`) — osobny pass ESLint; mergeable z `check:complexity` (zob. Backlog) | Tak                       |
| `check:dead-code`            | Ratchet unused exports / files (knip) nie regresie względem baseline                                                       | Tak                       |
| `check:type-coverage`        | Ratchet percent-typed (`type-coverage`) nie regresie; w dużej mierze subsumuje `typecheck:noimplicit:core`                 | Tak                       |
| `check:codeql-ratchet`       | Liczba otwartych alertów CodeQL nie regresie (odczyt przez `gh api`; graceful-skip bez tokenu)                             | Tak                       |

### Job: `quality-extended`

Cały job jest advisory (`continue-on-error: true`). Ratchety oparte o npm działają
na serio; zewnętrzne skanery instalują się przez `gh release download` i same się pomijają (exit 0),
gdy binarka wciąż jest nieobecna.

| Skrypt                   | Waliduje                                                                                                                                                                            | Blokująca    |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `check:circular-deps`    | Brak circular dependencies (dpdm)                                                                                                                                                   | **Advisory** |
| `check:bundle-size`      | Rozmiar bundle nie przekracza capu                                                                                                                                                  | **Advisory** |
| `check:secrets`          | Skanowanie sekretów (gitleaks) — pomija, gdy brak binarki                                                                                                                           | **Advisory** |
| `check:vuln-ratchet`     | Podatności zależności (osv-scanner) nie regresują — pomija, gdy brak binarki                                                                                                        | **Advisory** |
| `check:workflows`        | Lint workflowów (actionlint + zizmor) — pomija, gdy brak binarek                                                                                                                    | **Advisory** |
| `check:openapi-breaking` | Breaking changes w publicznym kontrakcie API (`openapi.yaml`) względem base branch (oasdiff) — emituje `openapiBreaking=N`; pomija, gdy brak oasdiff lub base spec nierozwiązywalny | **Advisory** |

### Job: `docs-sync-strict`

Działa na każdym PR do `main`. Blokuje merge przy failure.

| Skrypt                         | Waliduje                                                                                                                                          | Blokująca                   |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| `check:docs-all`               | Meta-bramka uruchamiająca sekwencyjnie 6 sub-bramek poniżej                                                                                       | Tak                         |
| ↳ `check:docs-sync`            | Spójność wersji CHANGELOG / OpenAPI / llm.txt                                                                                                     | Tak                         |
| ↳ `check:docs-counts`          | Liczniki w prozie (provider count, migration count itd.) mieszczą się w oknie ratchet rzeczywistych liczb                                         | Tak                         |
| ↳ `check:env-doc-sync`         | Każda env var w `.env.example` jest udokumentowana w tabeli docs i odwrotnie                                                                      | Tak                         |
| ↳ `check:deprecated-versions`  | Brak deprecated version strings w docs                                                                                                            | Tak                         |
| ↳ `check:doc-links`            | Wewnętrzne linki markdown w docs resolve’ują się do prawdziwych plików (forma `[text]`/`(path)`)                                                  | Tak                         |
| ↳ `check:fabricated-docs`      | Trasy, env vars, komendy CLI, nazwy hooków i ścieżki plików cytowane w docs istnieją w codebase. Hard gate przez `--strict`; soft-fail bez flagi. | Tak (przez `--strict` w CI) |
| `check:cli-i18n`               | Stringi komend CLI są obecne we wszystkich plikach locale i18n                                                                                    | Tak                         |
| `check:openapi-coverage`       | Spec OpenAPI pokrywa co najmniej ratcheted floor prawdziwych tras                                                                                 | Tak                         |
| `check:openapi-security-tiers` | Adnotacje security tier w `openapi.yaml` są spójne z klasyfikacjami `routeGuard.ts`                                                               | **Advisory**                |
| `check:openapi-routes`         | Każda ścieżka w `openapi.yaml` resolve’uje się do prawdziwego `route.ts` (anti-hallucination)                                                     | Tak                         |
| `check:docs-symbols`           | Każde odniesienie `/api/...` w `docs/**/*.md` resolve’uje się do prawdziwego `route.ts` (anti-hallucination)                                      | Tak                         |
| `i18n translation drift`       | Nieprzetłumaczone klucze w plikach locale i18n — tylko warn                                                                                       | **Advisory**                |

### Job: `i18n-ui-coverage`

| Skrypt                            | Waliduje                                                      | Blokująca |
| --------------------------------- | ------------------------------------------------------------- | --------- |
| `check-ui-keys-coverage` (inline) | Pokrycie kluczy UI i18n jest ≥ 65%                            | Tak       |
| `check-ui-value-drift` (inline)   | Przepisana angielska **value** nie zostawia stale translation | Tak       |

Wymaga `fetch-depth: 0` — bramka value-drift diffuje `en.json` względem merge base.

#### `check-ui-value-drift` — bramka stale-translation

Łapie jedną regresję i18n, której inne bramki strukturalnie nie widzą: angielska wartość
jest przepisana, a tłumaczenia wyprowadzone z _poprzedniego_ angielskiego zostają w tyle, więc
nieangielscy użytkownicy nadal czytają pewnie sformułowany, już błędny tekst.

To się wydarzyło na serio. `oauthModal.googleOAuthWarning` zostało przepisane, gdy helper logowania Antigravity
wylądował (#5203); **39 z 43 locale** zachowało tekst mówiący operatorom, by „skopiować
pełny URL i wkleić go poniżej” — flow, którego dla tego providera nie da się dokończyć. Przeszło
niezauważone aż do #8463, bo:

- `sync-ui-keys` uzupełnia tylko klucze, które są **nieobecne**, nigdy te, które są **stale**;
- `check-ui-keys-coverage` liczy _obecność_ kluczy, więc stale translation liczy się jako covered;
- `check-translation-drift` śledzi lustra dokumentacji `docs/i18n/<locale>/**.md` —
  nigdy nie czyta `src/i18n/messages/*.json`.

**Diff-aware, nie oparte o baseline.** Porównuje `en.json` na merge base z
working tree; dla każdego klucza, którego angielska wartość się zmieniła, każdy locale wciąż trzymający
nietknięte tłumaczenie jest stale. To celowo **zamraża istniejący dług** — diff
nie ujawni, z którego starego angielskiego pochodzi długotrwałe tłumaczenie, więc bramka ocenia
tylko to, czego dotyczy bieżąca zmiana. Alternatywa (baseline hash per klucz) kosztowałaby
wygenerowany plik ~600 KB, 3× największy istniejący baseline, churnujący przy każdym i18n PR.

Dwa sposoby, by ją spełnić:

1. zaktualizować dotknięte tłumaczenia, albo
2. ustawić je na `__MISSING__:<new english>` — runtime serwuje wtedy poprawiony angielski
   (`src/i18n/request.ts::deepMergeFallback`, #7258), a klucz trafia do kolejki tłumaczeń.

Jeśli **znaczenie** stringa się zmieniło, preferuj **rename klucza**: nowy klucz nie może odziedziczyć
stale translation. To wzorzec użyty w #8463.

```bash
npm run i18n:check-value-drift          # strict (what CI runs)
npm run i18n:check-value-drift:warn     # report only
BASE_REF=origin/release/vX.Y.Z npm run i18n:check-value-drift
```

Wychodzi z 0 z `SKIP reason=base-unresolved`, gdy katalog bazowy nie da się odczytać (shallow
clone bez base ref), lustrzanie `check-openapi-breaking`.

### Job: `i18n`

Pełna macierz walidacji i18n (jeden job na locale). Cały job jest advisory.

| Skrypt                          | Waliduje                         | Blokująca                                               |
| ------------------------------- | -------------------------------- | ------------------------------------------------------- |
| `validate_translation.py quick` | Kompletność tłumaczeń per locale | **Advisory** (`continue-on-error: true` na całym jobie) |

### Job: `pr-test-policy`

Działa tylko na pull requestach.

| Skrypt                 | Waliduje                                                                                                                            | Blokująca |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | --------- |
| `check:pr-test-policy` | PR-y zmieniające production code w `src/`, `open-sse/`, `electron/` lub `bin/` muszą zawierać lub aktualizować testy (Hard Rule #8) | Tak       |
| `check:test-masking`   | Zmienione pliki testów nie zmniejszają net assert count ani nie dodają tautologii `assert.ok(true)`                                 | Tak       |
| `check:pr-evidence`    | Treść PR cytuje evidence test/VPS dla zmiany (mechanizuje Hard Rule #18 przez grepping prozy PR — kruche, zob. Backlog)             | Tak       |

### Job: `test-vitest`

Działa po `build`. Blokuje merge przy failure.

| Suite            | Waliduje                                                | Blokująca                                                                  |
| ---------------- | ------------------------------------------------------- | -------------------------------------------------------------------------- |
| `test:vitest`    | MCP server (107 tools), autoCombo, cache — vitest runner | Tak                                                                        |
| `test:vitest:ui` | Testy komponentów UI — vitest runner                    | **Advisory** (`continue-on-error: true`) — failing aż do triage UI Fase 6A |

### Workflowy nightly (harmonogram, advisory)

Te działają na cronie (oraz `workflow_dispatch`), nigdy na PR-ach. Wszystkie są advisory.

| Workflow               | Waliduje                                                                                                                                                   | Blokująca    |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| `nightly-property`     | Testy property fast-check z losowym seedem + wysokim run count                                                                                             | **Advisory** |
| `nightly-resilience`   | Bramka heap-growth, chaos fault-injection, k6 load/soak                                                                                                    | **Advisory** |
| `nightly-llm-security` | promptfoo injection guard (block mode) + probe garak (pomijane bez provider secret)                                                                        | **Advisory** |
| `nightly-schemathesis` | Fuzzing kontraktu OpenAPI (schemathesis) względem żywego OmniRoute z użyciem `docs/openapi.yaml` — ujawnia naruszenia spec / nieobsłużone 500 (Fase 8 B.4) | **Advisory** |

---

## Baseline ratchet (`quality-baseline.json`)

Silnik ratchet (`scripts/quality/check-quality-ratchet.mjs`) czyta `quality-baseline.json`
i porównuje go ze świeżo zebranym `quality-metrics.json`. Każda metryka, która regresie
poza swoje epsilon, failuje build.

Aktualnie śledzone metryki:

| Metryka               | Kierunek | Znaczenie                              |
| --------------------- | -------- | -------------------------------------- |
| `eslintWarnings`      | `down`   | Liczba ESLint warnings nie może rosnąć |
| `coverage.statements` | `up`     | Statement coverage nie może spadać     |
| `coverage.lines`      | `up`     | Line coverage nie może spadać          |
| `coverage.functions`  | `up`     | Function coverage nie może spadać      |
| `coverage.branches`   | `up`     | Branch coverage nie może spadać        |

Aby zaktualizować baseline po genuine improvement:

```bash
npm run quality:ratchet -- --update
git add quality-baseline.json
```

Flaga `--update` zapisuje bieżące zmierzone wartości do `quality-baseline.json`.
Commituj ten plik wraz ze zmianą, która poprawiła metrykę. PR, który poprawia
metrykę bez aktualizacji baseline, złapie `--require-tighten` (Fase 6A.5,
oczekuje implementacji).

---

## Polityka retry testów (WS5.4, v3.8.49)

Retry jest per-runner, nigdy globalny blanket — blanket retry zamienia prawdziwe regresje
w niewidoczne flake:

| Runner           | Polityka                                                                                                        | Dlaczego                                                                                                                 |
| ---------------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Playwright (e2e) | `retries: 1` tylko w CI, z `trace: on-first-retry`                                                              | Timing przeglądarki/sieci jest naprawdę niedeterministyczny; jeden retry z trace zamienia flake w diagnozowalny artefakt |
| Vitest           | BEZ globalnego retry. Udowodniony flaky test dostaje jawny per-test retry (widoczny w diffie, reviewowany w PR) | Trzyma listę quarantine w repo, nigdy opaque                                                                             |
| node:test (unit) | NIGDY żadnego retry                                                                                             | Flaky unit test to bug w teście — napraw go, nie re-rolluj                                                               |

Docelowe SLO, gdy wyląduje telemetria flake (WS5.2/5.3): <1% flake rate na test
(próg „fix now”), ≥95% pass rate na pipeline. Wartości referencyjne branży —
rekalibruj względem własnych pomiarów.

## Drift ratchet na poziomie release (WS5.5, v3.8.49)

Gdy ratchet (file-size, complexity, eslint warnings) regresie na CZYSTYM tipie release
— tzn. KOMBINACJA merge’y go zregresowała, a żaden pojedynczy PR nie reprodukuje
regresji na własnej gałęzi — fix należy do **release captain, raz, na
gałęzi release**: preferuj extraction/refactor; rebaseline tylko z udokumentowanym
wpisem justification. Nigdy nie spychaj combination drift na PR kontrybutora i nigdy
nie rebaselinuj per-PR (to ukrywa prawdziwe regresje). Najpierw dyskryminuj: zreprodukuj
czerwień względem pure tip w probe worktree, zanim założysz, że spowodował ją Twój PR.

## Banking ratchet shrinks — kierunek w dół (#8584)

Ratchet jest tylko w połowie automatyczny i to w złej połowie. **Podniesienie** capu to
ręczna edycja JSON, która zajmuje dziesięć sekund i jest najszybszym sposobem odblokowania czerwonego PR.
**Obniżenie** wymaga, by ktoś uruchomił `--update` i zcommitował wynik — a aż do
wylądowania joba `bank-ratchet-shrinks` żaden workflow tego nie robił. Zmierzona konsekwencja
(2026-07-25): 18 frozen files już na lub poniżej 800-liniowego capu new-file, najgorszy
przy 132× (`src/shared/validation/schemas.ts`, 19 linii niosących cap 2,523);
ceiling complexity szedł `1794 → 2169` przez ~37 rebaseline notes z dokładnie jednym
spadkiem (−1); oraz „tighten via `--update` next cycle” napisane 31 razy i honorowane
raz. Cap, który przeżywa kod, który go wypracował, po cichu zamienia każdą ukończoną
dekompozycję w growth allowance dla kogoś, kto edytuje plik jako następny.

`nightly-release-green.yml` → job **`bank-ratchet-shrinks`** zamyka tę pętlę:

|             |                                                                                                     |
| ----------- | --------------------------------------------------------------------------------------------------- |
| Uruchamiany | `schedule` (3×/dzień) + `workflow_dispatch` — celowo **nie** `push`                                 |
| Mierzy      | najwyższy `release/vX.Y.Z`, ta sama resolution + injection guard co `release-green`                 |
| Zapisuje    | `check:file-size --update` i `check:complexity-ratchets --update` (oba shrink-only by construction) |
| Weryfikuje  | `npm run check:ratchet-bank` (`scripts/quality/verify-ratchet-bank.mjs`)                            |
| Dostarcza   | jeden always-current PR względem gałęzi release — force-updated, nigdy spamowany                    |

Banking jest batchowany, a nie per-push, bo nie ma wymogu latency (shrink
zbankowany w ciągu 8h jest OK), podczas gdy run per-merge przebudowywałby gałąź PR wielokrotnie
podczas kampanii merge i płacił za pełny ESLint walk za każdym razem. Detection zostaje
na push (`release-green`); tylko banking jest batchowany.

### Weryfikator bezpieczeństwa

Job zapisuje do baseline’ów bez nadzoru, więc `verify-ratchet-bank.mjs` sprawia,
że to jest akceptowalne. Diffuje drzewo po `--update` względem `HEAD` i **przerywa job
zanim powstanie jakikolwiek commit** — nie otwierając PR — chyba że każda zmiana to jedno z:

- wpis numeryczny `frozen` / `testFrozen` **obniżony** lub **usunięty**
- `complexity-baseline.json` → `count` **obniżony**
- `quality-baseline.json` → `metrics.cognitiveComplexity.value` **obniżone**

Wszystko inne failuje: podniesienie liczby, dodanie wpisu, zmiana `cap`/`testCap`, albo
usunięcie/przepisanie notatki `_rebaseline_*` (te notatki to audit trail dlaczego każdy
ceiling istnieje i są przechowywane w tym samym obiekcie `frozen` co wpisy plików).
Bot, który mógłby podnieść cap, byłby ściśle gorszy niż status quo. Guard regresji:
`tests/unit/verify-ratchet-bank.test.ts`.

Job nigdy nie pushuje do `release/*` — człowiek merge’uje PR, więc zły pomiar
nie może wylądować bez review.

## Polityka allowlist

Każda bramka, która nie może failować na istniejących wcześniej naruszeniach, używa frozen allowlist
(np. `KNOWN_STALE_DOC_REFS`, `KNOWN_MISSING`, `KNOWN_RAW_SQL`). Polityka brzmi:

**Napraw root cause; używaj allowlist tylko gdy naruszenie jest pre-existing i
nie da się go naprawić w tym samym PR.**

Przy dodawaniu wpisu do allowlist:

1. Dołącz komentarz z justification.
2. Odnieś się do tracking issue (np. `// #3498 — Phase 2 feature, not yet implemented`).
3. Usuń wpis w tym samym PR, który naprawia naruszenie — stale entry, które już nie
   tłumi aktywnego naruszenia, samo jest defektem (6A.3 stale-enforcement
   failuje bramkę na orphaned allowlist entry, gdy zostanie zaimplementowane).

**Nie** dodawaj wpisów allowlist, by testy szybciej przechodziły. Zielona bramka z rosnącą
allowlist to fałszywe poczucie jakości.

### Gdy bramka failuje na Twoim PR

1. **Przeczytaj output bramki uważnie** — mówi dokładnie, który plik lub symbol naruszył
   regułę.
2. **Napraw naruszenie** — większość bramek to deterministyczne checki filesystem, które przechodzą,
   gdy tylko kod jest poprawny.
3. **Jeśli naruszenie jest pre-existing** (tzn. nie Ty je wprowadziłeś, ale bramka teraz
   je obejmuje): dodaj wpis allowlist z komentarzem justification i tracking issue.
4. **Jeśli bramka to ratchet** (coverage, ESLint warnings, duplication, complexity):
   Twoja zmiana pogorszyła metrykę. Napraw underlying issue, albo (rzadko) uruchom
   `npm run quality:ratchet -- --update`, jeśli zmiana jest celowa i degradacja
   metryki jest akceptowalna — ale udokumentuj dlaczego w opisie PR.
5. **Bramki advisory** (`continue-on-error: true`) są informacyjne — nie blokują
   merge, ale pojawiają się w podsumowaniu CI. I tak je naprawiaj.

---

## Dodawanie nowej bramki

1. Utwórz `scripts/check/check-<name>.mjs` (lub `.ts`). Bramki polityk wychodzą z 0/1.
   Bramki w stylu ratchet emitują metrykę do `quality-metrics.json` przez `collect-metrics.mjs`.
2. Dodaj `"check:<name>": "node scripts/check/check-<name>.mjs"` do `package.json`.
3. Podłącz w `.github/workflows/ci.yml` pod odpowiednim jobem
   (policy → `lint` lub `docs-sync-strict`; ratchet → `quality-gate`).
4. Jeśli ma allowlist, zastosuj `reportStaleEntries()` z
   `scripts/check/lib/allowlist.mjs`, by stale entries były wykrywane automatycznie.
5. Napisz test w `tests/unit/build/` pokrywający logikę detekcji bramki.
6. Zaktualizuj ten dokument (dodaj wiersz do tabeli odpowiedniego joba).

---

## Tooling agentów: LSP-in-the-loop (opt-in)

Poza bramkami CI OmniRoute dostarcza **opt-in** scaffold `agent-lsp`
(projektowy `.mcp.json`, Fase 7 Task 15). Utwórz `.mcp.json`,
by wystawić TypeScript language server agentom kodującym, żeby resolve’owały symbole /
diagnostics **zanim** napiszą kod — companion compile-before-claim do
`typecheck:core`, który tnie błędy „invented symbol” u źródła. Celowo
nie jest auto-ładowany (Ty wybierasz i weryfikujesz most MCP↔LSP); zepsuty wpis tylko loguje
błąd połączenia i nigdy nie psuje sesji.

---

## Backlog racjonalizacji (przegląd ROI — Fase 9 Onda 3)

Ten inwentarz został uzgodniony z `ci.yml` 2026-06-17 (poprzednia wersja pomijała
`audit:deps`, `check:tracked-artifacts`, `check:lockfile`, `check:licenses`,
`check:dead-code`, `check:cognitive-complexity`, `check:type-coverage`,
`check:codeql-ratchet`, `check:pr-evidence`). Przegląd ROI uzgodnionego zbioru
zidentyfikował poniższych kandydatów racjonalizacji. **Merge’e to mechaniczne zmiany CI;
flip/drop to decyzje polityczne zarezerwowane dla operatora.** Nic poniżej
nie jest jeszcze zastosowane.

**Także nieudokumentowane powyżej** (advisory, niski sygnał): job `docs-lint`
(markdownlint + Vale, cały job `continue-on-error`) oraz standalone workflowy skanerów
`semgrep.yml` / `codeql.yml` / `scorecard.yml`. `semgrepFindings: 0` jest w
`quality-baseline.json`, ale nie jest podpięty do blocking ratchet w `ci.yml` — metryka jest
obecnie orphaned.

### Merge / dedup (mechaniczne, niższe ryzyko)

Każdy kandydat został zwalidowany względem żywego stanu bramek 2026-06-17 (trust-but-verify);
kilka „oczywistych” merge’y okazało się ukrywać dług i **nie** jest czystymi drop-in.

- **`check:docs-sync` uruchamia się dwa razy** — standalone w jobie `lint` i ponownie wewnątrz `check:docs-all` (`docs-sync-strict`) oraz hooka husky pre-commit. ✅ **DONE** — standalone wywołanie `lint` usunięte.
- **Skanowanie CVE** — ❌ **NIE jest czystym merge.** `audit:deps` hard-failuje na każdym high/critical CVE; `check:vuln-ratchet` (osv) failuje tylko na _regresji_ względem baseline (obecnie 1 MODERATE). Inna semantyka — usunięcie `audit:deps` straciłoby absolutną bramkę high/critical. Zostaw obie.
- **Wykrywanie cykli** — ❌ **NIE jest czystym merge.** `check:circular-deps` (dpdm) raportuje **91 cykli** (dlatego jest advisory); nie da się go wypromować do blocking bez wcześniejszego ich rozwiązania, i ma szerszy scope niż zielony, curated `check:cycles`. Zostaw `check:cycles` jako blocking; rozwiązanie 91 cykli dpdm to osobny backlog.
- **Complexity** — ✅ **DONE** (`check:complexity-ratchets` / `eslint.complexity-ratchets.config.mjs`): jeden ESLint walk, liczniki po ruleId, więc baseline’y cyclomatic+max-lines i cognitive zostają niezależne; indywidualne `check:complexity` / `check:cognitive-complexity` zostają do lokalnego `--update`.
- **`/api` anti-hallucination** — ✅ **DONE** (`check:api-docs-refs` + `scripts/check/lib/apiRoutes.mjs`): jeden inventarz FS `src/app/api`, openapi-routes + docs-symbols nadal raportują niezależnie; individuals zostają do lokalnych runów.
- **`check:node-runtime` działa w 11 jobach** — ⚠️ **niski ROI.** Każdy to osobny runner, a check trwa <1s; łączne oszczędności ~10s, kosztem utraty taniego guarda per-job. Nie warte churnu.
- **`typecheck:noimplicit:core` na CI lint** — ✅ **usunięty z joba lint** (był advisory `continue-on-error`); blocking type surface to `typecheck:core` + `check:type-coverage`. Lokalny skrypt zachowany.

### Flip / decide (polityka operatora)

- `check:openapi-security-tiers` (advisory) — ❌ **NIE da się czysto przełączyć.** Wychodzi z 0, ale ostrzega, że kilka tras `traffic-inspector` pod `LOCAL_ONLY_API_PREFIXES` nie ma adnotacji `x-loopback-only: true`. Wymuszenie wymaga najpierw dodania tych adnotacji do `openapi.yaml`.
- `typecheck:noimplicit:core` (advisory) — w dużej mierze subsumowany przez blocking ratchet `check:type-coverage`. Przełącz na ratchet albo usuń zbędny drugi pass `tsc`.
- `test:vitest:ui` (advisory, 14 parked fails) — fix-and-block albo usuń; nie zostawiaj gnić.
- `check:secrets` (gitleaks, blocking ratchet zamrożony na 3 udokumentowanych false-positives) — allowlist tych 3 do 0, albo zdegraduj do advisory. Nakłada się z natywnym secret-scanning GitHub + `check:public-creds`.
- `check:pr-evidence` (blocking, greps prozę body PR) — wysokie ryzyko false-positive; osłabia egzekucję Hard Rule #18 przy usunięciu, więc to prawdziwa decyzja polityczna.
- `semgrep` (advisory standalone) — nakłada się z CodeQL dla rodzin OWASP; podepnij jego baseline do ratchet albo usuń.

---

## Powiązana dokumentacja

- Supply-chain (provenance, SBOM, Trivy, Scorecard): [`docs/security/SUPPLY_CHAIN.md`](../security/SUPPLY_CHAIN.md)
