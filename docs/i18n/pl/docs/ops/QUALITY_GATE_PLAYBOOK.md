---
title: "Playbook bramek jakości"
---

# System bramek jakości — ocena krytyczna, katalog i playbook replikacji

> **Czym jest ten dokument.** Krytyczna ocena systemu bramek jakości OmniRoute
> na tle najlepszych praktyk branżowych, **plus** pełny katalog wszystkich punktów
> kontrolnych jakości oraz **niezależny od narzędzi plan replikacji** tego samego
> systemu w dowolnym projekcie. Wygenerowano 2026-06-16 na podstawie rzeczywistego
> stanu repozytorium (nie z pamięci).
>
> Benchmarki: OWASP DSOMM · OpenSSF Scorecard · SLSA · SonarQube "Clean as You Code" ·
> wzorzec Quality-Ratchet · DORA 2024 · OWASP LLM Top 10 (2025) · najlepsze praktyki mutation-testing.

---

## Część 1 — Werdykt i klasyfikacja dojrzałości

**Ocena ogólna: A− / „Advanced”. Top ~5–10% projektów.** System niezależnie
wdraża kilka wzorców, które branża wprost nazywa — to najsilniejszy sygnał
zbieżności (nie skopiowaliśmy checklisty; zeszliśmy się na właściwych praktykach).

| Framework referencyjny                   | Gdzie stoimy                                                                                                                                                                                                                           | Ocena                       |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| **OWASP DSOMM** (5 levels, 5 dimensions) | Solidny Level 3, z dojściem do 4 w _Test Intensity_ i _Static Depth_. Większość organizacji siedzi na 1–2.                                                                                                                             | **L3→L4**                   |
| **OpenSSF Scorecard** (18 checks)        | Przechodzimy CI-Tests, Code-Review, Dependency-Update-Tool, Fuzzing, SAST, Signed-Releases (provenance), Token-Permissions, Vulnerabilities, Dangerous-Workflow. **Luki:** Branch-Protection na `main` OFF; część actions niepinowana. | **~7–8/10**                 |
| **SLSA** (4 levels)                      | `npm publish --provenance` + `id-token: write` + build hostowany na GitHub = **L2**, zbliżamy się do L3. Brak utwardzonego/hermetycznego buildera dla L3+.                                                                             | **L2→L3**                   |
| **SonarQube "Clean as You Code"**        | Identyczna filozofia: ratchet bramkuje _non-regression_ (nowy kod nie pogarsza metryki). **Rozbieżność:** Sonar zaleca **niewiele** warunków; my mamy ~46 bramek (ryzyko zmęczenia).                                                   | **Zgodne, z zastrzeżeniem** |
| **Quality-Ratchet pattern**              | Implementacja referencyjna: ratchet + `dedicatedGate` + `tightenSlack` + `--require-tighten` + graceful-skip. Bardziej wyrafinowana niż większość publicznych przykładów.                                                              | **Wzorcowa**                |
| **DORA 2024**                            | Bardzo mocno na osi _stability_. Ryzyko: ciężkie bramki mogą kosztować _lead time_ — łagodzone podziałem fast-gates, ale z luką pokrycia (zob. Część 2).                                                                               | **Mocne (stability)**       |
| **OWASP LLM Top 10 (2025)**              | Pokrywamy risk #1 (prompt-injection) przez runtime guard + promptfoo (eval) + garak (red-team). Standardowe narzędzia branżowe.                                                                                                        | **Covered**                 |
| **Mutation testing**                     | Stryker nightly, progi 70/50, 8 critical modules. Konsensus branżowy (60% existing / 80% new, nightly) — **bijemy go**. **Luka:** score nie jest jeszcze ratchetem.                                                                    | **Almost there**            |

---

## Część 2 — Ocena krytyczna (mocne strony + uczciwe słabości)

### Mocne strony (co jest powyżej średniej)

1. **Silnik multi-metric ratchet.** Serce systemu. 24 metryki w `quality-baseline.json`
   - 4 dedykowane baseline'y, każda z kierunkiem (`up`/`down`), tolerancją (`eps`), slackiem
     (`tightenSlack`) i flagą `dedicatedGate`. To, co naprawione, **zostaje** naprawione — to
     antidotum na entropię codebase'u.
2. **Defense-in-depth dla supply-chain.** SAST (CodeQL/Sonar) + secrets (gitleaks z
   `useDefault`) + SCA (osv/npm-audit/Trivy/Dependabot) + licenses + lockfile + SBOM + SLSA
   provenance + Scorecard + utwardzanie workflowów (zizmor). Niewiele codebase'ów ma ten pełny stack.
3. **Antidota na Goodhart's Law.** Coverage jako cel to klasyczny anty-wzorzec
   („when the measure becomes the target, it ceases to be a good measure”). Mamy
   przeciwwagi: **mutation testing** (mierzy, czy test łapie buga, a nie tylko
   czy wykonuje linię), **`check-test-masking`** (blokuje osłabianie asercji, by przejść),
   **per-module coverage floors** (wymusza testowanie kodu HIGH-risk, nie tylko łatwych części) oraz
   **`check-pr-evidence`** (Hard Rule #18).
4. **Bramki anti-hallucination / consistency.** Rzadka i wartościowa kategoria: `check-known-symbols`,
   `check-fetch-targets`, `check-openapi-routes`, `check-docs-symbols` zapewniają, że docs, specs i
   string dispatch wskazują na żywe symbole. Łapie „gnicie”, którego lint/test nie widzą.
5. **Cykl życia advisory→blocking.** Nowe bramki wchodzą jako advisory (nie blokują merge'y w trakcie
   dojrzewania), a potem stają się blocking na końcu cyklu. Mniej tarcia bez utraty sufitu.
6. **Graceful skip przy braku infrastruktury.** Scannery (`--ratchet`) kończą się `exit 0`, jeśli binary/sieć
   zawiodą — brakująca infrastruktura nigdy nie blokuje legalnego PR. Dojrzała inżynieria.
7. **Skodyfikowana kultura.** Hard Rules + `trust-but-verify` + stale-allowlist + evidence-gate
   zamieniają dyscyplinę w automatyczną weryfikację.

### Uczciwe słabości (rzeczywiste luki)

1. **🔴 Podział fast-gates wciąż zostawia strukturalną dziurę.** `quality.yml` (PR→`release/**`)
   uruchamia teraz typecheck, szybkie testy deterministyczne oraz advisory production build dla PR z kodem,
   ale nadal nie odpala pełnej powierzchni release-PR z `ci.yml` (coverage ratchets,
   package artifact, integration, E2E, SonarQube). Motywacja (szybkość) jest słuszna, ale bramka
   powinna stać tam, gdzie dzieje się merge (shift-left). **Największa zaległa poprawka strukturalna.**
2. **🟠 Ryzyko sprawlu/zmęczenia bramkami.** ~46 bramek + 25 jobów to DUŻO. Sam Sonar ostrzega:
   zbyt wiele warunków powoduje „gate fatigue” i debaty o priorytetach, z ryzykiem że bramka zostanie
   zignorowana. DORA ostrzega, że ciężkie bramki kosztują lead-time. Łagodzimy to warstwami advisory i
   nieabsolutnymi ratchetami, ale brakuje **okresowego przeglądu ROI per bramka** (część mikro-bramek
   doc-sync da się skonsolidować).
3. **🟠 Mutation score nie jest jeszcze ratchetem.** Najsilniejsze antidotum na coverage-gaming jest
   **advisory**. To pozycja o najwyższej wartości wśród zaległości (i już w ~90% zbudowana).
4. **🟡 Advisory, które powinny blokować (z właściwym zakresem).** `osv` (vulnCount) i `oasdiff` są
   advisory mimo zamrożonych baseline'ów. osv-advisory ma sens (nowe CVE na starej zależności zablokowałoby
   niepowiązany PR) — ale jest złoty środek (blokuj tylko CRITICAL+fixable, jak zrobiliśmy z
   Trivy). oasdiff advisory oznacza, że zmiana łamiąca kontrakt może przejść.
5. **🟡 Runtime security tylko nightly.** schemathesis/garak/promptfoo/chaos/k6 lecą w nocy.
   Słuszna decyzja (wolne, potrzebują żywego serwera), ale PR może wprowadzić regresję injection-guard,
   która złapie się dopiero następnej nocy.
6. **🟡 Branch-protection na `main` jest OFF.** `BRANCH_LOCK_TOKEN` blokuje gałęzie _release_, ale
   sam `main` jest niechroniony. Minus w Scorecard/DSOMM. Wymaga akcji właściciela.
7. **🟡 CodeQL default-setup; semgrep nieskodyfikowany.** default-setup działa (0 alertów), ale
   zacommitowany `codeql.yml` daje więcej kontroli; semgrep leci przez zewnętrzną platformę cloud, nie
   jest wersjonowany w repo.

---

## Część 3 — Pełny katalog punktów kontrolnych jakości (przenośny)

Poniższe 12 kategorii to „system jakości” w formie wielokrotnego użytku. Każda wymienia
**cel** (co chronić), **narzędzia, których używamy** oraz **odpowiednik niezależny od narzędzi**
do replikacji na dowolnym stacku.

### 1. Style & formatting (deterministyczne, szybkie)

- **OmniRoute:** Prettier + ESLint przez lint-staged (pre-commit), 2-spaces/double-quotes/100col.
- **Generic:** jeden auto-fixowalny formatter + jeden linter, w pre-commit na staged files.

### 2. Types

- **OmniRoute:** `typecheck:core` (blocking) + `typecheck:noimplicit:core` (advisory) + `type-coverage` ratchet 92.17% + per-file any-budget.
- **Generic:** ścisły typecheck w CI + ratcheted type-coverage metric + per-file budżet `any`/escape-hatch.

### 3. Tests (intensity)

- **OmniRoute:** 2 niepokrywające się runnery (Node native + vitest), 8 shards, global coverage 60/60/60/60 + ratchet ~76% + **8 per-module floors for critical modules** + nightly property tests + **mutation testing** nightly.
- **Generic:** test runner(s) + **absolute** coverage floor (anti-zero) + coverage **ratchet** (anti-regression) + **per-module floors for high-risk code** (anti-Goodhart) + property-based dla pure logic + **mutation testing** nightly jako prawdziwa miara jakości testów.

### 4. Test policy (anti-gaming)

- **OmniRoute:** `pr-test-policy` (kod prod wymaga testu), `check-test-masking` (blokuje osłabione asercje), `pr-evidence` (claim sukcesu wymaga bloku evidence), `test-discovery` (każdy test zbierany przez runner).
- **Generic:** bramka „new code ⇒ new test” + detektor usuniętych asercji/tautologii + wymóg evidence (TDD lub living test) + gwarancja, że żaden test nie jest sierotą poza globami.

### 5. Complexity & code health (ratchets)

- **OmniRoute:** ESLint-warnings (3769↓), jscpd duplication (5.72%↓), cyclomatic+max-lines complexity (1800↓), cognitive complexity sonarjs (753↓), dead-code/unused-exports knip (339↓), per-file file-size (frozen, shrink-only), circular-deps (custom Tarjan, blocking).
- **Generic:** ratchetuj każdą metrykę zdrowia (warnings, duplication, cyclomatic **oraz** cognitive complexity, dead code, file size, import cycles). Kierunek zawsze „don't regress”.

### 6. Static security (SAST + secrets)

- **OmniRoute:** CodeQL (ratchet alerts = 0), gitleaks (`[extend] useDefault=true` — critical!), SonarQube, custom security rules (public-creds, error-helper, route-guard-membership, route-validation).
- **Generic:** SAST (CodeQL/Sonar/semgrep) z alert ratchet + secrets scanner z **odziedziczonym default ruleset** (custom config nadpisujący default = ślepota) + project-specific Hard Rule security gates.

### 7. Supply-chain (dependencies)

- **OmniRoute:** osv-scanner + npm-audit + Trivy + Dependabot (SCA), license-checker (SPDX allowlist), lockfile-lint (HTTPS+sha512+registry), `check-deps` anti-slopsquatting (allowlist + age ≥72h).
- **Generic:** multi-source SCA + license allowlist + lockfile integrity check + dependency allowlist z kontrolą age/typosquatting + grouped update bot.

### 8. Supply-chain (build & release)

- **OmniRoute:** SBOM (CycloneDX + syft), SLSA provenance (`--provenance`), OpenSSF Scorecard (weekly), workflow hardening (zizmor: artipacked→`persist-credentials:false`, cache-poisoning, token-permissions).
- **Generic:** generuj SBOM przy publish + signed provenance (SLSA L2+) + scheduled Scorecard + utwardź wszystkie workflowy (minimum-privilege tokens, brak persisted credentials na non-pusher checkout, actions pinowane po SHA).

### 9. Contracts & API

- **OmniRoute:** oasdiff (breaking-change OpenAPI), schemathesis (contract fuzz nightly), openapi-coverage (% documented routes, ratchet 38.3%), openapi-security-tiers (spec vs route-guard).
- **Generic:** breaking-change contract diff (oasdiff/buf) + property-based fuzz wobec spec (schemathesis) + ratcheted documentation coverage + spójność spec↔code.

### 10. Docs & i18n (anti-rot)

- **OmniRoute:** docs-sync (mirrored versions), docs-counts-sync (numbers in docs vs code), env-doc-sync, doc-links, fabricated-docs, cli-i18n, i18n-ui-coverage (`--threshold=65` + ratchet 80.1%).
- **Generic:** synchronizuj versions/counts/env-vars między docs a kodem (bramka, nie zaufanie) + waliduj linki wewnętrzne + ratcheted i18n coverage.

### 11. Anti-hallucination / consistency (rzadka kategoria)

- **OmniRoute:** known-symbols (string dispatch ⇒ living symbol), provider-consistency, fetch-targets (client fetch ⇒ real route), docs-symbols, db-rules (Hard Rules #2/#5), migration-numbering.
- **Generic:** dla każdego „zduplikowanego źródła prawdy” (registry, string dispatch, cross-layer references) bramka, która dowodzi zgodności obu stron. Łapie gnicie, którego typecheck/test nie widzą.

### 12. Resilience & domain (product-specific)

- **OmniRoute:** chaos (fault-injection), heap-growth (leak), k6 (soak), promptfoo+garak (LLM red-team OWASP LLM Top 10), the 3 resilience laws (circuit-breaker/cooldown/lockout).
- **Generic:** zidentyfikuj tryby awarii **swojej** domeny i miej bramkę (nawet nightly) na każdy. Dla AI apps: injection red-team. Dla distributed systems: chaos + leak + soak.

---

## Część 4 — Plan replikacji dla dowolnego projektu

Buduj w **fazach**, z których każda sama w sobie dostarcza wartość. Nie próbuj wszystkich 12 kategorii naraz —
to dokładnie wywołuje gate fatigue, przed którym ostrzega Część 2. Każda nowa bramka wchodzi jako **advisory** i
staje się **blocking**, gdy jest stabilna.

### Wielokrotnego użytku rdzeń: „anatomia bramki ratchet”

Cały system kręci się wokół tego wzorca 3 plików. Skopiuj go najpierw:

1. **`baseline.json`** — zamrożona wartość metryki + `direction` (`up`/`down`) + `eps` (anti-flake) + `tightenSlack` + `dedicatedGate`.
2. **`collect-metrics.<ext>`** — uruchamia narzędzie, wyciąga liczbę, zapisuje `metrics.json`.
3. **`check-ratchet.<ext>`** — porównuje `metrics.json` z `baseline.json`; `exit 1` **tylko** przy regresji poza `eps`; `exit 0` (graceful skip), jeśli brakowało tool/infra; z `--require-tighten`, `exit 1`, jeśli metryka **się poprawiła** bez aktualizacji baseline (zamyka zysk).

Z tym na miejscu **każda** nowa metryka (coverage, complexity, warnings, SAST alerts, bundle size, mutation score…) to tylko jedna linia w baseline.

### Faza 0 — Fundament (tydzień 1)

CI istnieje; formatter + linter + typecheck + 1 test runner + **absolute** coverage floor
(np. 60%). Pre-commit odpala szybkie auto-fixowalne checki. _Wynik: żaden PR nie psuje podstaw._

### Faza 1 — Silnik ratchet (tydzień 2) — **fundament wszystkiego**

Zaimplementuj 3 pliki powyżej. Zamróź baseline'y dla: warnings, coverage, complexity, duplication,
dead code, file size. _Wynik: odtąd codebase może się tylko poprawiać._

### Faza 2 — Static depth (tydzień 3)

SAST (CodeQL/Sonar/semgrep) z alert ratchet; secrets scanner (**odziedzicz default ruleset**);
SCA (osv/Dependabot) + license allowlist + lockfile-lint. _Wynik: znane podatności i
wycieknięte sekrety nie przechodzą._

### Faza 3 — Build supply-chain (tydzień 4)

SBOM przy publish + signed provenance (SLSA L2) + scheduled Scorecard + workflow hardening
(zizmor: minimum tokens, brak persisted credentials, pinned actions). _Wynik: release'y śledzalne i
odporne na manipulację._

### Faza 4 — Test intensity (tydzień 5–6)

2. runner, jeśli ma sens; **per-module coverage floors for critical modules** (anti-Goodhart);
   property-based dla pure logic; **mutation testing nightly** → gdy przyjdzie 1. score, zrób
   `mutationScore` ratchetem. _Wynik: coverage przestaje być vanity metric; testy dowodnie łapią bugi._

### Faza 5 — Contract & dynamic (tydzień 7)

Jeśli jest publiczne API: oasdiff (breaking-change, **blocking**) + schemathesis (nightly fuzz).
DAST/red-team nightly stosownie do domeny. _Wynik: kontrakty nie łamią się po cichu._

### Faza 6 — Anti-hallucination & domain (tydzień 8)

Jedna bramka consistency na każdą „zduplikowaną prawdę” w projekcie. Domena-specyficzne bramki failure-mode
(dla AI: injection red-team). _Wynik: strukturalne gnicie i awarie domenowe mają siatkę bezpieczeństwa._

### Faza 7 — Governance (ciągłe)

- Cykl advisory→blocking dla każdej nowej bramki.
- `stale-allowlist`: każda supresja ma uzasadnienie + issue; przestarzała supresja jest łapana.
- `evidence-gate`: claim sukcesu w PR wymaga dowodu (test lub living test).
- **Kwartalny przegląd ROI per bramka** (zabij/odejmij funding tym, które się nie spłacają — walka ze zmęczeniem).
- Podnieś Hard Rules projektu do wykonywalnych bramek.

### Zasady przekrojowe (non-negotiable)

- **Ratchet, nie absolute.** Bramkuj _non-regression_, nie stałą liczbę (poza anti-zero floors).
- **Absolute floor + ratchet razem.** Floor zapobiega zapaści; ratchet zapobiega powolnej erozji.
- **Anti-Goodhart by design.** Każda metryka-cel potrzebuje przeciwwagi (coverage ⇒ mutation + anti-masking; per-module floors, by wymusić testowanie trudnego kodu).
- **Graceful skip.** Brakująca infrastruktura nigdy nie blokuje; blokuje tylko realna regresja.
- **`dedicatedGate` dla drogich metryk.** Metryki wymagające zewnętrznego binary dostają własny skrypt (ze skipem), poza synchronicznym centralnym ratchetem.
- **Bramka tam, gdzie dzieje się merge.** Nie zostawiaj luki między szybką bramką a właściwym merge (lekcja z podziału fast-gates).
- **Niewiele blocking bramek, dobrze dobranych.** Sonar/DORA: zbyt wiele warunków = zmęczenie. Preferuj advisory + ratchet zamiast muru blocking bramek.

---

## Część 5 — Rekomendowane usprawnienia (spriorytetyzowane, kompatybilne)

**P0 — najwyższe ROI, prawie gotowe**

1. **Mutation score ratchet** (po tym, jak 1. nightly Stryker wyprodukuje wartości). Kluczowe antidotum na coverage-Goodhart; ~90% gotowe.
2. **Zamknij pozostałą dziurę fast-gates** — promuj production build w `quality.yml` po jego
   tygodniu advisory i dalej przenoś deterministyczne checki tylko-release-PR na ścieżkę PR→release.
3. **Branch-protection na `main`** (ustawienie właściciela) — podnosi Scorecard, zamyka lukę DSOMM.

**P1 — wartościowe** 4. **osv/oasdiff → blocking z właściwym zakresem** — osv tylko CRITICAL+fixable (dwustopniowo jak Trivy); oasdiff blokuje breaking-changes. 5. **`require-tighten` → blocking** (koniec cyklu) — zamyka zyski metryk. 6. **Przegląd ROI/timing per-gate** w `ci-summary` — znajdź i przytnij wolne/niskowartościowe bramki.

**P2 — malejące zwroty** 7. **SLSA L3** — hermetic/reproducible builder (GitHub SLSA generator), jeśli chcesz wejść wyżej z L2. 8. **Zacommitowany CodeQL config + wersjonowany semgrep** — więcej kontroli/reprodukowalności. 9. **Per-PR DAST smoke** — szybki podzbiór schemathesis/promptfoo na endpointach najwyższego ryzyka (nie tylko nightly). 10. **Flakiness dashboard + DORA metrics** — upewnij się, że bramki nie erodują prędkości.

---

## Część 6 — Konkretne lekcje z release'ów (bramki do dodania w Fazie 9)

> Ta sekcja zapisuje rzeczywiste incydenty z domykania release'ów, gdzie bramki **brakowało**,
> z konkretnymi dowodami i proponowaną bramką. Każda pozycja jest kandydatem do Części 5.

### Lekcja v3.8.27 (2026-06-17) — „dziura fast-gates” pozwala deterministycznym regresjom dotrzeć do dnia release

**Co się stało.** Podczas v3.8.27 `/generate-release` release PR (`release/v3.8.27` → `main`)
był **pierwszym** uruchomieniem pełnej macierzy `ci.yml` w zintegrowanym cyklu. Wynik: 12 failures
naraz — **3 deterministyczne testy** + ~9 flakes/env. Żadne nie były żywymi regresjami produktu, ale
wszystkie umknęły, bo PR-y cyklu wchodzą na `release/**` przez **Fast QG
(`quality.yml`)**, który NIE odpala pełnego unit suite, ani `pr-test-policy` (test-masking), ani
pełnego integration suite, ani schema parity checking. Te 3 deterministyczne:

1. **Test przestarzały przez zmianę UI** — `permissions modal switch buttons declare button type`:
   #4034 dodało 4. switch (a11y `type="button"` utrzymane); count testu `=== 3` stał się
   nieaktualny. Analiza statyczna powinna to złapać w PR #4034.
2. **Test przestarzały przez zmianę packagowania** — `findMissingArtifactPaths ... root runtime files`:
   `dist/http-method-guard.cjs` stał się legalną required-path; expected list testu stała się
   nieaktualna.
3. **Lossy modularization divergence (najpoważniejsze)** — `settings schemas accept ... unprefixed
toggle`: **zmodularyzowany** `updateSettingsSchema` (`schemas/settings.ts`, utworzony przez #3988) rozjechał się
   z kanonicznym (`settingsSchemas.ts`): **45 fields vs 85 — 40 dropped + 6 divergent (qdrant\*)**. Był
   **dead-code** (runtime używa kanonicznego), więc bez żywego wpływu, ale złapał to tylko ręcznie napisany parity
   test. #4030 przywróciło 16 analogicznych dropów z #3988/#3993, ale ten się prześlizgnął.

**Proponowane bramki (Faza 9):**

- **G1 — Naprawdę zamknij dziurę fast-gates (rozszerza P0 #2).** W `quality.yml` (PR→`release/**`),
  poza typecheck + impacted tests, odpalaj **`pr-test-policy` (test-masking) + pełny deterministyczny
  unit suite** (albo przynajmniej pliki static/parity, które są szybkie i non-flaky).
  W ten sposób przestarzałe testy i usuwanie asercji łapią się w PR, który je wprowadza — nie w dniu
  release. Integration/e2e zostaw poza (wolne/flaky), ale warstwa deterministyczna NIE MOŻE zostać tylko
  w PR→main.
- **G2 — Bramka modularization parity (NOWA, dziś niepokryta).** Check, który dla każdego symbolu
  re-eksportowanego przez zmodularyzowany barrel (`src/shared/validation/schemas/*`, `providerRegistry`
  modules itd.) porównuje **shape** (`z.object` keys, registry entries) z kanonicznym
  źródłem i **failuje przy rozbieżności** (dropped/extra field). Złapałby 40-field drop z
  #3988 w tym samym PR. Uogólnia ręcznie pisane parity testy (które istnieją tylko tam, gdzie ktoś
  pamiętał je napisać). Tanie: importuje obie strony i diffuje `Object.keys(shape)`.
- **G3 — Deterministic flake triage (wsparcie).** LiveWS-startup i testy integration-combo/breaker
  padają przez server timeout/cascade w CI (env), nie logikę. Oznacz je jako
  `known-flaky` (kwarantanna z issue), żeby czerwień release-PR była **tylko realnymi sygnałami**, nie szumem
  maskującym deterministyczne regresje pośrodku.

**Zasada:** _bramka musi działać tam, gdzie dzieje się merge_ (już w „Zasadach przekrojowych”). Incydent
v3.8.27 pokazuje, że to dotyczy też **warstwy deterministycznych testów**, nie tylko lint/typecheck —
inaczej dług przestarzałych testów + lossy modularization pojawia się dopiero w PR→main, hurtowo, w
najgorszym momencie.

---

## Źródła (najlepsze praktyki branżowe)

- OWASP DevSecOps Maturity Model (DSOMM) — https://dsomm.owasp.org/about
- OpenSSF Scorecard / SLSA — https://openssf.org · https://slsa.dev
- SonarQube "Clean as You Code" — https://docs.sonarsource.com/sonarqube-server/latest/user-guide/clean-as-you-code
- Quality Ratchets (LeadDev) — https://leaddev.com/software-quality/introducing-quality-ratchets-tool-managing-complex-systems
- Continuous Code Improvement Using Ratcheting (Greiner) — https://robertgreiner.com/continuous-code-improvement-using-ratcheting/
- DORA 2024 State of DevOps — https://cloud.google.com/blog/products/devops-sre/announcing-the-2024-dora-report
- Mutation testing best practices (Stryker) — https://stryker-mutator.io
- Coverage as anti-pattern (Goodhart) — https://www.industriallogic.com/blog/code-coverage-complications/
- OWASP Top 10 for LLM Applications (2025) — https://owasp.org/www-project-top-10-for-large-language-model-applications/
- Contract testing (oasdiff/schemathesis) — https://www.oasdiff.com · https://schemathesis.readthedocs.io
