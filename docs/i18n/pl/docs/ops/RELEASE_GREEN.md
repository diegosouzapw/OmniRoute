---
title: "Release-Green — utrzymywanie kolejki i gałęzi release na zielono"
---

# Release-Green: utrzymywanie kolejki i gałęzi release na zielono

## Problem, który to rozwiązuje

**Pełna bramka** (`.github/workflows/ci.yml` — unit shards, vitest, ratchets,
`package-artifact`, SonarQube, E2E) uruchamia się **tylko na PR release** (PR → `main`). PR-y celujące w
`release/**` dostają **fast-gates** (`quality.yml`: testy TIA-impacted + typecheck + lint)
oraz, przy zmianach w kodzie, **doradczy** build produkcyjny. Skutek: czerwone tylko na release mogą nadal
cicho gromadzić się na gałęzi release i **wybuchać warstwami po ~40 min** w momencie release,
jedna po drugiej.

Rodzina „release-green” istnieje po to, by **wyprzedzać** te czerwone — walidować odpowiednik pełnej
bramki **lokalnie / poza release**, w dowolnym momencie, tak aby PR release był już
zielony przy pierwszym przebiegu CI.

> **Nienegocjowalna zasada:** nic z tego nie blokuje kontrybutora. Nie dodajemy wymaganego
> checka, który oblewa jego PR. **Drift** (ratchets) jest do rebaseline’u przez maintainera przy release —
> nigdy nie jest sprawą kontrybutora. Żaden element **nie zamyka** PR-a (kradzież kredytu) ani
> **nie osłabia** testu, by przeszedł.

## Rodzina (4 elementy) — i jak każdy działa niezależnie

| Element                                                                    | Czym jest                                                                      | Kiedy uruchamiać                                                      | Zakres                         |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------- | ------------------------------ |
| **`/green-prs`** (Solution A)                                              | Skan na żądanie przez maintainera **kolejki otwartych PR-ów**                  | **Niezależnie, okresowo** — i zwłaszcza **przed** `/generate-release` | Cała kolejka PR → `release/**` |
| **`/validate-release-green`** (Solution C — `npm run check:release-green`) | Silnik walidacji: odtwarza pełną bramkę względem gałęzi LUB kandydata do merge | Niezależnie, w dowolnym momencie                                      | Konkretna gałąź lub merge-PR   |
| **`/babysit <PR#>`**                                                       | Prowadzi **żywe CI** **jednego** PR-a do zielonego                             | Niezależnie, per PR                                                   | Pojedynczy PR                  |
| **`nightly-release-green.yml`** (Solution D)                               | Zautomatyzowany nocny workflow; otwiera issue przy HARD red                    | Automatycznie (cron)                                                  | Aktywna gałąź release          |

**Krótka odpowiedź na „czy to tylko na release?”:** **nie.** `/green-prs` zaprojektowano tak, by
uruchamiać je **okresowo, między release’ami**. Niezależne uruchamianie to normalne użycie — release to tylko
moment, w którym uruchomienie daje największą wartość.

## Doradczy build PR-to-release

`quality.yml` zawiera teraz `Build (advisory)` dla niedraftowych PR-ów z kodem oraz gałęzi kolejki Mergify.
Odtwarza recepturę builda produkcyjnego z `ci.yml`: Node 24, `npm-ci-retry`,
`check:node-runtime` oraz `npm run build` z `OMNIROUTE_USE_TURBOPACK=1`. Celowo
nie wgrywa artefaktu builda, bo żaden dalszy job jakości w tym workflow go nie konsumuje.
Usuń `continue-on-error` po tygodniu stabilnych przebiegów PR-ów release, aby sygnał stał się
blokującą bramką PR-to-release.

## Solution C — `npm run check:release-green` (silnik)

Odtwarza walidację równoważną release względem bieżącego working tree i klasyfikuje każde czerwone:

- **HARD** (typecheck, lint errors, unit, vitest, db-rules, public-creds, opcjonalnie
  `package-artifact`) → **rzeczywista usterka**; `exit 1`. Naprawiane na gałęzi źródłowej (TDD, Rule #18).
- **DRIFT** (eslint **warnings**, cognitive-complexity, file-size) → drift ratchetów nagromadzony w
  cyklu, **nie wina kontrybutora**; jest tylko raportowany i **rebaselined przez maintainera przy
  release**. Drift **nigdy** nie zmienia kodu wyjścia — więc nikogo nie blokuje.

```bash
npm run check:release-green                 # current branch (working tree)
node scripts/quality/validate-release-green.mjs --json   # structured output
node scripts/quality/validate-release-green.mjs --quick  # skips unit+vitest (drift+typecheck+lint only)
node scripts/quality/validate-release-green.mjs --with-build  # includes package-artifact (slow)
```

Tylko diagnozuje i **raportuje** (bez auto-fix). Orkiestracja fix-to-green żyje w
`/green-prs` i `/review-prs`.

## Solution A — `/green-prs` (skan kolejki)

Procedura (skrót — szczegóły w skillu `green-prs`):

1. **Inwentaryzacja** kolejki otwartych PR-ów względem aktywnej gałęzi release.
2. **Triage** każdego PR-a (viable / reject-worthy / needs-author) — reject/needs-author są
   **raportowane, nie zamykane** (decyduje autor).
3. Dla każdego viable PR-a, w **izolowanym worktree** (Rule #19), dociągnij PR do tipa release i uruchom
   `npm run check:release-green`:
   - **HARD** → napraw **na gałęzi kontrybutora** przez co-authorship (zachowuje status autora „Merged”),
     powtarzaj aż wszystkie HARD znikną.
   - **DRIFT** → zostaw; zostanie zrebaselined przy release.
4. **Raport** tabela PR × (werdykt, HARD reds, fixed?, DRIFT, release-green now?).

Może **przygotować** kolejkę bez merge’owania; merge’uje tylko na wyraźne żądanie — i nigdy nie zamyka PR-a.

## Zalecany rytm

- Uruchamiaj **`/green-prs` okresowo** (np. co tydzień) i **zawsze przed
  `/generate-release`**.
- Trzymaj **`nightly-release-green.yml`** (Solution D) jako ciągły sygnał: gdy otworzy
  issue HARD red, czas na skan.
- Używaj **`/validate-release-green`** ad-hoc, by sprawdzić gałąź lub konkretnego kandydata do merge.
- Używaj **`/babysit <PR#>`**, gdy konkretny PR trzeba doprowadzić do zielonego na żywym CI.

## Relacja do release

- `/generate-release` wywołuje walidację w **Phase 0 (pre-flight)**: rebaselined DRIFT i naprawia
  HARD przed otwarciem PR-a release.
- `/review-prs` używa bramki release-green na etapie decyzji o merge (green-before-merge).

Cel wszystkich elementów jest ten sam: **zielony PR release przy pierwszym przebiegu CI**, zamiast surfowania
po czerwonych w 40-minutowych warstwach w dniu release.
