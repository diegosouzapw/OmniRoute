---
title: "Plan pokrycia testami"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Plan pokrycia testami

Ostatnia aktualizacja: 2026-06-28

> Status zmierzony 2026-05-13: lines 82.58%, statements 82.58%, functions 84.23%, branches 75.22%. Fazy 1–5 zakończone. Obecny fokus to Faza 6 (>=85%) i Faza 7 (>=90%).

## Linia bazowa

Istnieje kilka wartości pokrycia w zależności od sposobu liczenia raportu. Do planowania przydatna jest tylko jedna z nich.

| Metryka              | Zakres                                    | Statements / Lines | Branches | Functions | Uwagi                                               |
| -------------------- | ----------------------------------------- | -----------------: | -------: | --------: | --------------------------------------------------- |
| Legacy               | Stare `npm run test:coverage`             |             79.42% |   75.15% |    67.94% | Zawyżone: liczy pliki testowe i wyklucza `open-sse` |
| Diagnostic           | Tylko źródła, bez testów i bez `open-sse` |             68.16% |   63.55% |    64.06% | Przydatne wyłącznie do izolacji `src/**`            |
| Recommended baseline | Tylko źródła, bez testów, z `open-sse`    |             82.58% |   75.22% |    84.23% | To jest ogólna linia bazowa projektu do poprawy     |

Zalecana linia bazowa to liczba, względem której należy optymalizować.

## Zasady

- Cele pokrycia dotyczą plików źródłowych, nie `tests/**`.
- `open-sse/**` jest częścią produktu i musi pozostać w zakresie.
- Nowy kod nie powinien obniżać pokrycia w dotykanych obszarach.
- Preferuj testowanie zachowania i wyników gałęzi zamiast szczegółów implementacji.
- Preferuj tymczasowe bazy SQLite i małe fixtury zamiast szerokich mocków dla `src/lib/db/**`.

## Aktualny zestaw poleceń

- `npm run test:coverage`
  - Główna bramka pokrycia źródeł dla pakietu testów jednostkowych
  - Generuje `text-summary`, `html`, `json-summary` oraz `lcov`
- `npm run coverage:report`
  - Szczegółowy raport plik po pliku z ostatniego uruchomienia
- `npm run test:coverage:legacy`
  - Wyłącznie do porównania historycznego

## Kamienie milowe

| Faza    |                    Cel | Fokus                                                  | Status      |
| ------- | ---------------------: | ------------------------------------------------------ | ----------- |
| Phase 1 | 60% statements / lines | Szybkie wygrane i niskoryzykowne pokrycie utility      | ✅ Done     |
| Phase 2 | 65% statements / lines | Fundamenty DB i tras                                   | ✅ Done     |
| Phase 3 | 70% statements / lines | Walidacja providerów i analityka użycia                | ✅ Done     |
| Phase 4 | 75% statements / lines | Translatory i helpery `open-sse`                       | ✅ Done     |
| Phase 5 | 80% statements / lines | Handlery `open-sse` i gałęzie executorów               | ✅ Done     |
| Phase 6 | 85% statements / lines | Trudniejsze edge case’y, dług gałęzi, suite’y regresji | In progress |
| Phase 7 | 90% statements / lines | Finalny przegląd, domknięcie luk, ścisły ratchet       | Pending     |

Branches i functions powinny rosnąć (ratchet) z każdą fazą, ale głównym twardym celem są statements / lines.

## Priorytetowe hotspoty

Te pliki mają dziś najniższe pokrycie linii (< 60%) i dają najlepszy zwrot dla Faz 6–7. Wygenerowano z `coverage/coverage-summary.json` w dniu 2026-05-13:

| #   | Plik                                                         | Lines % |
| --- | ------------------------------------------------------------ | ------: |
| 1   | `open-sse/services/compression/validation.ts`                |   7.87% |
| 2   | `src/app/api/v1/batches/route.ts`                            |   9.67% |
| 3   | `src/app/docs/components/FeedbackWidget.tsx`                 |   9.80% |
| 4   | `open-sse/services/compression/toolResultCompressor.ts`      |  10.00% |
| 5   | `src/app/docs/components/DocCodeBlocks.tsx`                  |  10.63% |
| 6   | `open-sse/services/compression/engines/rtk/lineFilter.ts`    |  10.96% |
| 7   | `open-sse/services/specificityRules.ts`                      |  11.28% |
| 8   | `src/mitm/systemCommands.ts`                                 |  12.19% |
| 9   | `open-sse/services/compression/aggressive.ts`                |  12.77% |
| 10  | `src/app/api/v1/batches/[id]/cancel/route.ts`                |  12.98% |
| 11  | `open-sse/services/compression/progressiveAging.ts`          |  13.26% |
| 12  | `open-sse/services/compression/engines/rtk/smartTruncate.ts` |  13.43% |
| 13  | `open-sse/services/compression/engines/rtk/deduplicator.ts`  |  13.51% |
| 14  | `src/lib/cloudAgent/agents/jules.ts`                         |  13.52% |
| 15  | `open-sse/services/compression/lite.ts`                      |  14.46% |
| 16  | `src/app/api/v1/rerank/route.ts`                             |  14.94% |
| 17  | `open-sse/services/compression/preservation.ts`              |  15.07% |
| 18  | `src/lib/cloudAgent/agents/codex.ts`                         |  15.54% |
| 19  | `open-sse/services/tierResolver.ts`                          |  16.66% |
| 20  | `src/app/docs/components/DocsLazyWrapper.tsx`                |  16.66% |

Tematy dla Faz 6–7:

- `open-sse/services/compression/**` to najgęstszy klaster niskiego pokrycia i dominuje pozostałą lukę.
- Trasy API batch i rerank (`src/app/api/v1/batches/**`, `src/app/api/v1/rerank/route.ts`) potrzebują testów na poziomie handlerów.
- Adaptery cloud agent (`src/lib/cloudAgent/agents/jules.ts`, `codex.ts`) oraz `tierResolver.ts` potrzebują testów scenariuszowych.
- Komponenty UI docs oraz `src/mitm/systemCommands.ts` mają niższy priorytet, ale dają tanie wygrane na gałęziach.

## Checklista realizacji

### Faza 1: 56.95% -> 60%

- [x] Napraw metrykę pokrycia, aby odzwierciedlała kod źródłowy zamiast plików testowych
- [x] Zachowaj legacy skrypt pokrycia do porównań
- [x] Zanotuj linię bazową i hotspoty w repozytorium
- [ ] Dodaj ukierunkowane testy dla niskoryzykownych utility:
  - `src/shared/utils/upstreamError.ts`
  - `src/shared/utils/fetchTimeout.ts`
  - `src/lib/api/errorResponse.ts`
  - `src/shared/utils/apiAuth.ts`
  - `src/lib/display/names.ts`
- [ ] Dodaj testy tras dla:
  - `src/app/api/settings/require-login/route.ts`
  - `src/app/api/providers/[id]/models/route.ts`

### Faza 2: 60% -> 65%

- [ ] Dodaj testy oparte o DB dla:
  - `src/lib/db/modelComboMappings.ts`
  - `src/lib/db/settings.ts`
  - `src/lib/db/registeredKeys.ts`
- [ ] Pokryj zachowanie gałęzi w:
  - `src/lib/providers/validation.ts`
  - `src/app/api/v1/embeddings/route.ts`
  - `src/app/api/v1/moderations/route.ts`

### Faza 3: 65% -> 70%

- [ ] Dodaj testy analityki użycia dla:
  - `src/lib/usage/usageHistory.ts`
  - `src/lib/usage/usageStats.ts`
  - `src/lib/usage/costCalculator.ts`
- [ ] Rozszerz pokrycie tras dla zarządzania proxy i gałęzi ustawień

### Faza 4: 70% -> 75%

- [ ] Pokryj helpery translatora i centralne ścieżki tłumaczenia:
  - `open-sse/translator/index.ts`
  - `open-sse/translator/helpers/*`
  - `open-sse/translator/request/*`
  - `open-sse/translator/response/*`

### Faza 5: 75% -> 80%

- [ ] Dodaj testy na poziomie handlerów dla:
  - `open-sse/handlers/chatCore.ts`
  - `open-sse/handlers/responsesHandler.js`
  - `open-sse/handlers/imageGeneration.js`
  - `open-sse/handlers/embeddings.js`
- [ ] Dodaj pokrycie gałęzi executorów dla auth specyficznego dla providera, retry i nadpisań endpointów

### Faza 6: 80% -> 85%

- [ ] Dołącz więcej suite’ów edge case do głównej ścieżki pokrycia
- [ ] Zwiększ pokrycie funkcji dla modułów DB ze słabym pokryciem konstruktorów/helperów
- [ ] Domknij luki gałęzi w `settings.ts`, `registeredKeys.ts`, `validation.ts` oraz helperach translatora

### Faza 7: 85% -> 90%

- [ ] Traktuj pozostałe pliki o niskim pokryciu jako blockery
- [ ] Dodaj testy regresji dla każdego niepokrytego błędu produkcyjnego naprawionego podczas dojścia do 90%
- [ ] Podnieś bramkę pokrycia w CI dopiero gdy lokalna linia bazowa będzie stabilna przez co najmniej dwa kolejne uruchomienia

## Polityka ratchet

Aktualizuj progi `npm run test:coverage` dopiero gdy projekt faktycznie przekroczy kolejny kamień milowy z komfortowym buforem.

**Aktualna bramka:** `npm run test:coverage` wymusza **60 statements / 60 lines / 60 functions / 60 branches** (metryka została zrebasowana w Quality-Gates Fase 6A.1 — wcześniejsza linia bazowa 82.58% była zawyżona, bo liczyła pliki testowe i wykluczała `open-sse`). Polecenie `test:coverage:legacy` zachowuje starą metrykę 50/50/50 do porównania historycznego.

Do doraźnych sprawdzeń progów względem najnowszego raportu użyj:

```bash
node scripts/check/test-report-summary.mjs --threshold 75
```

Zalecana sekwencja ratchet (kolejność to `statements-lines / branches / functions`):

1. 55/60/55
2. 60/62/58
3. 65/64/62
4. 70/66/66
5. 75/70/72 <-- current gate (75/70/75)
6. 80/75/78
7. 85/80/84
8. 90/85/88

Następny cel ratchet to `80/75/78`, gdy pokrycie gałęzi utrzyma się powyżej 78% przez dwa kolejne uruchomienia.

## Znana luka

Aktualne polecenie pokrycia mierzy główny pakiet testów jednostkowych Node i obejmuje źródła z niego osiągane, w tym `open-sse`. Nie scala jeszcze pokrycia Vitest w jeden ujednolicony raport. To scalenie warto zrobić później, ale nie jest blockerem do rozpoczęcia wspinaczki 60% -> 80%.
