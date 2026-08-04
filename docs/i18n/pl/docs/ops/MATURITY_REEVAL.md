---
title: "Ponowna ocena dojrzałości quality-gate (Fase 9)"
---

# Ponowna ocena dojrzałości — po falach 0–3 (Quality-Gate v2)

> **Czym jest ten dokument.** Ponowny pomiar dojrzałości systemu quality-gates
> **po** falach 0–3 programu Quality-Gate v2, w porównaniu z baseline zapisanym w
> [`QUALITY_GATE_PLAYBOOK.md`](./QUALITY_GATE_PLAYBOOK.md) (2026-06-16). Mierzy, co się zmieniło,
> względem DSOMM L5 / OpenSSF Scorecard 9 / SLSA L3, rozdzielając to, co jest **mierzalne w CI**
> (już dostarczone / możliwe do dostarczenia kodem) od tego, co jest **procesem/właścicielem** (ustawienia organizacji).
>
> **Data:** 2026-06-30. Wygenerowano ze rzeczywistego stanu repozytorium, nie z pamięci.
> **Benchmarki:** OWASP DSOMM · OpenSSF Scorecard · SLSA · SonarQube "Clean as You Code".

---

## 1. Zaktualizowany werdykt

**Ocena ogólna: A− → A („Advanced”, top ~5%).** **Dwie największe słabości strukturalne**
baseline z 06-16 — _fast-gates gap_ oraz _mutation-score-not-a-ratchet_ — zostały **zamknięte**.
Pozostałe luki do „absolutnego maksimum” są niemal wyłącznie **zależne od właściciela/infrastruktury** (branch-protection,
SLSA L3, CodeQL advanced); strona kodowa programu jest zasadniczo ukończona.

| Framework referencyjny            | Baseline 06-16               | Teraz 06-30                                                          | Ruch | Dowód                                                                       |
| --------------------------------- | ---------------------------- | -------------------------------------------------------------------- | ---- | --------------------------------------------------------------------------- |
| **OWASP DSOMM** (5 levels)        | L3→L4                        | **L4** w _Test Intensity_ i _Static Depth_; solidne L3 w pozostałych | ▲    | blocking mutation-ratchet + deterministic suite at merge gate               |
| **OpenSSF Scorecard**             | ~7–8/10                      | ~7–8/10 (bez zmian — bramka to **właściciel**)                       | =    | brak Branch-Protection na `main` (ustawienie właściciela) + actions pinning |
| **SLSA**                          | L2→L3                        | **L2** (zbliżanie się do L3)                                         | =    | brak hermetic/reproducible builder (infra/właściciel)                       |
| **SonarQube "Clean as You Code"** | Zgodne z zastrzeżeniem       | Zgodne z zastrzeżeniem                                               | =    | zastrzeżenie _sprawl_ (~46+ gates) nadal — przegląd ROI w toku              |
| **Quality-Ratchet pattern**       | Exemplar                     | **Exemplar+**                                                        | ▲    | nowy `dedicatedGate` dla `mutationScore` (direction up)                     |
| **Mutation testing**              | „Almost there” (nie ratchet) | **Active ratchet**                                                   | ▲▲   | `check-mutation-ratchet.mjs` + seeded baseline + blocking nightly job       |

---

## 2. Delty od 2026-06-16 (co dostarczyły fale 0–3)

### 2.1 🔴→✅ Luka fast-gates ZAMKNIĘTA (była słabość strukturalna #1)

Baseline ostrzegał: `quality.yml` (PR→`release/**`) uruchamiał **tylko filesystem gates** — bez
typecheck, tests ani build —, więc deterministyczne regresje wybuchały dopiero przy PR→`main`.
**Dziś** `.github/workflows/quality.yml` uruchamia w jobie _Fast Quality Gates_: `typecheck:core`,
**blocking impacted unit tests (TIA) z fail-safe do pełnego suite**,
vitest fast-path oraz unit shards. Bramka działa teraz **tam, gdzie następuje merge** (shift-left),
dokładnie zgodnie z zasadą cross-cutting przepisaną w playbooku.

### 2.2 🟠→✅ Mutation score stał się RATCHETEM (była słabość #3 / P0 #1)

Najsilniejsze antidotum na coverage-gaming było **advisory**. **Dziś**:

- `scripts/check/check-mutation-ratchet.mjs` (domyślnie advisory, `--ratchet` blocking, graceful skip);
- `config/quality/quality-baseline.json` ma zaseedowane wpisy `mutationScore.<module>` (`direction: up`, `dedicatedGate`);
- `.github/workflows/nightly-mutation.yml` ma job **"Mutation score ratchet (blocking)"**, który unifikuje raporty batch i ratchetuje scalone wyniki per-module.

Skutek: per-module mutation score **nie może regredować** — coverage przestał być vanity metric.

### 2.3 ✅ Bramki quick-win (Phase 6A/7) dostarczone

- **a11y axe-core „fake-green” naprawione:** `@axe-core/playwright` w devDeps; `a11y.spec.ts` z warunkowym skip `REQUIRE_AXE`; job w `nightly-resilience.yml`.
- **complexity skanuje `bin/`+`electron`:** `check-complexity.mjs` obejmuje te katalogi w `ESLINT_ARGS`.
- **tracked-artifacts w pre-commit + pre-push:** `.husky/pre-commit` + `pre-push` blokują przypadkowo śledzone artefakty.

---

## 3. 12 kategorii — status (ukierunkowany na delty)

| #   | Kategoria                        | Status 06-30                                                                              |
| --- | -------------------------------- | ----------------------------------------------------------------------------------------- |
| 1   | Style & formatting               | ✅ bez zmian (Prettier+ESLint lint-staged)                                                |
| 2   | Types                            | ✅ **wzmocnione** — `typecheck:core` teraz także w bramce PR→release                      |
| 3   | Tests (intensity)                | ✅ **wzmocnione** — mutation testing stał się ratchetem; deterministic suite w merge gate |
| 4   | Test policy (anti-gaming)        | ✅ bez zmian (pr-test-policy/test-masking/pr-evidence)                                    |
| 5   | Complexity & health              | ✅ **wzmocnione** — complexity skanuje bin/electron                                       |
| 6   | Static security (SAST+secrets)   | 🟡 CodeQL default-setup (advanced = właściciel); semgrep cloud nie wersjonowany           |
| 7   | Supply-chain (deps)              | ✅ bez zmian (osv/audit/Trivy/Dependabot + allowlist)                                     |
| 8   | Supply-chain (build/release)     | 🟡 SLSA L2 (L3 = hermetic builder, właściciel/infra)                                      |
| 9   | Contracts & API                  | 🟡 oasdiff/osv advisory (kandydaci na blocking-with-scope, P1)                            |
| 10  | Docs & i18n (anti-rot)           | ✅ **wzmocnione** — `fabricated-docs --strict` blocking (exit 0 zweryfikowany)            |
| 11  | Anti-hallucination / consistency | ✅ bez zmian (known-symbols/fetch-targets/docs-symbols/db-rules)                          |
| 12  | Resilience & domain              | ✅ bez zmian (chaos/heap/k6/promptfoo/garak nightly)                                      |

---

## 4. Pozostałe luki do „absolutnego maksimum”

### 4.1 Mierzalne w CI / możliwe do dostarczenia kodem (backlog tego programu)

- **P1 — osv/oasdiff → blocking z właściwym zakresem:** osv tylko `CRITICAL`+fixable (dwuetapowo jak Trivy); oasdiff blokuje zmiany łamiące kontrakt.
- **P1 — `require-tighten` blocking (koniec cyklu):** blokuje zyski metryk (zapobiega poluzowaniu baseline bez zapisu).
- **P1/P2 — przegląd ROI / gate sprawl:** konsolidacja micro-gates doc-sync; pomiar czasu per-gate w `ci-summary` (walka z zmęczeniem — zastrzeżenie SonarQube/DORA). Odroczone merge ROI (unified complexity; unified `/api` anti-hallucination) trafiają tutaj.
- **P2 — CodeQL config w repo + semgrep wersjonowany:** więcej kontroli/reprodukowalności.

### 4.2 Proces / właściciel (CI nie może ruszyć — ustawienia organizacji)

- **Branch-protection na `main`** (podnosi Scorecard, zamyka lukę DSOMM). Zob. [`BRANCH_PROTECTION_MAIN.md`](./BRANCH_PROTECTION_MAIN.md).
- **CodeQL Default → Advanced setup.**
- **SLSA L3** — hermetic/reproducible builder (GitHub SLSA generator). Stretch (malejące zwroty).

### 4.3 Wyraźnie poza zakresem

- **DSOMM L5** jest w dużej mierze **na poziomie org / procesu** (nie da się zakodować w CI).
- **SLSA L4** (reprodukowalność bit-for-bit) to zadeklarowany stretch goal.

---

## 5. Elementy odroczone / usunięte (porządkowanie ogona)

- **`semcheck.yaml` (warstwa LLM na semantic drift docs↔code) — USUNIĘTE.** Było **osierocone**
  (żaden workflow/skrypt go nie wywoływał) i miało nieaktualne liczniki w regułach. Deterministyczne pokrycie
  już istnieje (`check:fabricated-docs --strict` + `check:docs-counts-sync` + `check:docs-symbols`),
  a zastrzeżenie _gate sprawl_ zniechęca do dodawania bramki LLM advisory z kosztem cyklicznym.
  Może zostać ponownie wprowadzone w przyszłości jako opt-in nightly job, jeśli semantic drift stanie się realnym problemem.
- **`agent-lsp` scaffold — ODROCZONE / opt-in nie włączone.** Istnieje jako wzmianka w docs
  (`docs/architecture/QUALITY_GATES.md`, CHANGELOG), ale **bez podpięcia** i bez `.mcp.json.example`
  w repo. Pozostaje udokumentowanym scaffoldem opt-in; nie jest aktywną bramką ani luką dojrzałości.
