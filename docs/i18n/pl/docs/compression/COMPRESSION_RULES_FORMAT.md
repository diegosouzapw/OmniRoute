---
title: "Format reguł kompresji"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Format reguł kompresji

Reguły kompresji to pliki JSON wczytywane w czasie działania. Są celowo wyłącznie danymi, dzięki czemu nowe
language packi i filtry poleceń RTK można przeglądać bez zmian w kodzie silnika.

> **Kanoniczny schemat (źródło prawdy):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).
> Przykłady poniżej mają charakter ilustracyjny — w razie wątpliwości zwaliduj pack względem `_schema.json`.

## Paczki reguł Caveman

Paczki reguł Caveman znajdują się w:

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

Każda paczka zawiera zamiany stosowane do zwykłej prozy po wyizolowaniu chronionych regionów.

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### Pola Caveman

| Pole                     | Wymagane | Opis                                                               |
| ------------------------ | -------- | ------------------------------------------------------------------ |
| `language`               | tak      | Klucz języka w stylu BCP-47, np. `en`, `pt-BR`, `es`               |
| `category`               | tak      | Kategoria pliku/paczki, np. `filler` lub `dedup`                   |
| `rules`                  | tak      | Tablica reguł zamiany regex                                        |
| `rules[].name`           | tak      | Stabilna nazwa reguły                                              |
| `rules[].pattern`        | tak      | Źródło regex JavaScript                                            |
| `rules[].flags`          | nie      | Flagi regex JavaScript; domyślnie `gi`                             |
| `rules[].replacement`    | nie      | Ciąg zamiany lub fallback, gdy brak trafienia w `replacementMap`   |
| `rules[].replacementMap` | nie      | Zamiany zależne od dopasowania, kluczowane znormalizowanym tekstem |
| `rules[].context`        | nie      | `all`, `user`, `assistant` lub `system`; domyślnie `all`           |
| `rules[].category`       | nie      | `filler`, `context`, `structural`, `dedup`, `terse` lub `ultra`    |
| `rules[].minIntensity`   | nie      | `lite`, `full` lub `ultra`; domyślnie `lite`                       |
| `rules[].description`    | nie      | Czytelne dla człowieka podsumowanie reguły                         |

Użyj `flags`, gdy ma znaczenie dopasowanie z uwzględnieniem wielkości liter, np. usuwanie przedimków przed prozą
małą literą bez wycinania `the OpenAI API`. Użyj `replacementMap`, gdy jeden regex ma wiele alternatyw
wymagających różnych wyjść; dzięki temu paczki reguł JSON pozostają wyłącznie danymi, zachowując zachowanie
bogatszych wbudowanych funkcji zamiany TypeScript.

## Paczki filtrów RTK

Filtry RTK znajdują się w:

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

Każdy filtr opisuje, jak rozpoznać i skompresować rodzinę wyjść poleceń.

```json
{
  "id": "test-vitest",
  "label": "Vitest output",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      { "pattern": "All tests passed", "message": "vitest: ok", "unless": "FAIL|Error:" }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: ok",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "keeps failing tests",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### Pola RTK

| Pole                       | Wymagane | Opis                                                                             |
| -------------------------- | -------- | -------------------------------------------------------------------------------- |
| `id`                       | tak      | Stabilny identyfikator filtra                                                    |
| `label`                    | tak      | Nazwa czytelna w dashboardzie                                                    |
| `category`                 | tak      | Rodzina filtrów: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | nie      | Wyższy priorytet wygrywa, gdy pasuje wiele filtrów                               |
| `match.outputTypes`        | nie      | Identyfikatory wyjść detektora wybierające ten filtr                             |
| `match.commands`           | nie      | Tokeny poleceń wybierające ten filtr                                             |
| `match.patterns`           | nie      | Wzorce regex wybierające ten filtr z tekstu wyjścia                              |
| `rules.stripAnsi`          | nie      | Usuń sekwencje escape ANSI przed etapami regex                                   |
| `rules.replace`            | nie      | Uporządkowane podstawienia regex stosowane linia po linii                        |
| `rules.matchOutput`        | nie      | Reguły wyjścia z short-circuit i opcjonalną strażą `unless`                      |
| `rules.includePatterns`    | nie      | Linie preferowane do zachowania                                                  |
| `rules.dropPatterns`       | nie      | Linie do usunięcia jako szum                                                     |
| `rules.collapsePatterns`   | nie      | Powtarzające się pasujące linie, które można zwinąć                              |
| `rules.deduplicate`        | nie      | Zwiń zduplikowane znormalizowane linie                                           |
| `rules.truncateLineAt`     | nie      | Limit znaków na linię bezpieczny dla Unicode                                     |
| `rules.maxLines`           | nie      | Maksymalna liczba zachowanych linii przed ochroną ogona                          |
| `rules.headLines`          | nie      | Linie nagłówka zachowane przy obcinaniu                                          |
| `rules.tailLines`          | nie      | Linie ogona zachowane dla świeżego kontekstu                                     |
| `rules.onEmpty`            | nie      | Komunikat zapasowy, gdy filtrowanie usuwa całą treść                             |
| `rules.filterStderr`       | nie      | Normalizuj typowe prefiksy stderr przed kolejnymi etapami filtrowania            |
| `preserve.errorPatterns`   | nie      | Linie błędów, które powinny przetrwać obcinanie                                  |
| `preserve.summaryPatterns` | nie      | Linie podsumowań, które powinny przetrwać obcinanie                              |
| `tests[]`                  | nie      | Wbudowane próbki weryfikacji używane przez bramkę verify RTK                     |

RTK stosuje deklaratywne etapy w tej kolejności: `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines` oraz `onEmpty`.

Własne filtry można wczytać z:

1. Plików projektowych `.rtk/filters.json` dopiero po obecności pasującego hasha `.rtk/trust.json` lub
   włączeniu `trustProjectFilters`.
2. Globalnego `DATA_DIR/rtk/filters.json`.
3. Filtrów wbudowanych.

Pliki własne projektu/globalne mogą zawierać jeden obiekt filtra lub tablicę obiektów filtrów. Nieprawidłowe
filtry własne są pomijane z diagnostyką; nieprawidłowe filtry wbudowane powodują błąd walidacji.

Plik zaufania projektu:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

Nadpisanie środowiskowe `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1` ufa filtrom projektu bez hasha
i powinno być ograniczone do kontrolowanego lokalnego developmentu.

## Reguły bezpieczeństwa

- Utrzymuj reguły idempotentne: ponowne uruchomienie tego samego filtra nie powinno psuć wyjścia.
- Zachowuj dokładny tekst błędów, ścieżki plików, numery linii i podsumowania poleceń, gdzie to możliwe.
- Unikaj reguł modyfikujących bloki kodu, payloady JSON, URL-e lub sekrety.
- Dodawaj pokrycie unit testami dla nowych rodzin poleceń w testach detektora/filtra.
- Dodawaj próbki `tests[]` do każdego wbudowanego filtra oraz do współdzielonych filtrów własnych.

## Walidacja

Paczki reguł są walidowane przed użyciem. Wbudowane paczki Caveman i wbudowane filtry RTK kończą się błędem
podczas walidacji (fail fast), dzięki czemu uszkodzone assety wydania są wykrywane przed wysyłką. Własne filtry RTK są
pomijane z diagnostyką, gdy parsowanie lub walidacja zaufania się nie powiedzie.

Ukierunkowana walidacja:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
