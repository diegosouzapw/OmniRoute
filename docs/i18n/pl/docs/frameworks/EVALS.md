---
title: "Ewaluacje (Evals)"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Ewaluacje (Evals)

> **Źródło prawdy:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **Ostatnia aktualizacja:** 2026-06-28 — v3.8.40

OmniRoute dostarcza generyczny framework ewaluacji, którym możesz benchmarkować
konfiguracje routingu, pojedyncze providery/modele albo dołączone suite'y
„golden set”. Używaj go do weryfikacji zmian w routingu, walidacji nowych
providerów oraz bramkowania release'ów przed wypuszczeniem ich na ruch
produkcyjny.

Framework składa się z:

- Czystego runnera (`src/lib/evals/evalRunner.ts`), który rejestruje wbudowane
  suite'y w pamięci, ocenia wyjścia względem oczekiwanych kryteriów i agreguje
  scorecardy.
- Warstwy persystencji (`src/lib/db/evals.ts`) dla własnych (zdefiniowanych przez
  użytkownika) suite'ów oraz historycznych runów w SQLite.
- Warstwy orkiestracji (`src/lib/evals/runtime.ts`), która wykonuje każdy case
  przez realne wywołania `POST /v1/chat/completions`, zbiera latency i wyjścia
  oraz zapisuje run.
- Endpointów REST pod `/api/evals/*` (wyłącznie management-auth).
- Powierzchni w dashboardzie pod `Dashboard → Usage → Evals` (`EvalsTab.tsx`).

## Pojęcia

### Suite

Suite to nazwana kolekcja case'ów testowych z `description` oraz jednym lub
więcej case'ami. Suite'y pochodzą z dwóch źródeł:

| Źródło     | Gdzie zdefiniowane                                  | Modyfikowalne w runtime?    |
| ---------- | --------------------------------------------------- | --------------------------- |
| `built-in` | Rejestrowane przez `registerSuite()` przy starcie   | Nie (zdefiniowane w kodzie) |
| `custom`   | Przechowywane w SQLite `eval_suites` + `eval_cases` | Tak (przez API/UI)          |

Aktualne wbudowane suite'y (zob. `src/lib/evals/evalRunner.ts`):

- `golden-set` — 10 bazowych case'ów obejmujących greeting/math/translation/safety
- `coding-proficiency` — Python/JS/SQL/TS/wykrywanie bugów
- `reasoning-logic` — sylogizmy, zadania tekstowe, rozpoznawanie wzorców
- `multilingual` — tłumaczenie i detekcja języka
- `safety-guardrails` — PII, jailbreak, refusal, świadomość biasu
- `instruction-following` — tylko JSON, listy numerowane, ograniczenia językowe
- `codex-comparison` — head-to-head zadania codingowe przeznaczone do trybu compare

### Case

Każdy case zawiera:

| Pole       | Opis                                                             |
| ---------- | ---------------------------------------------------------------- |
| `id`       | Stabilny identyfikator (kluczuje wyjścia i metryki)              |
| `name`     | Etykieta czytelna dla człowieka                                  |
| `model`    | Domyślny model, gdy run używa targetowania `suite-default`       |
| `input`    | `{ messages, max_tokens? }` — wysyłane do `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — rubryka scoringu (patrz niżej)           |
| `tags`     | Opcjonalne etykiety (np. `safety`, `pii`, `jailbreak`)           |

### Target

Ten sam suite można uruchomić względem różnych targetów. Schemat targetu to
`evalTargetSchema` w `src/shared/validation/schemas.ts`:

| Typ targetu     | `id`         | Zachowanie                                                      |
| --------------- | ------------ | --------------------------------------------------------------- |
| `suite-default` | `null`       | Każdy case używa swojego wbudowanego pola `model`               |
| `model`         | nazwa modelu | Wymusza każdy case przez jeden bezpośredni model (np. `gpt-4o`) |
| `combo`         | nazwa combo  | Uruchamia każdy case przez jedno combo (ćwiczy silnik routingu) |

Dla `model` i `combo` pole `id` jest wymagane (wymuszane przez Zod
`superRefine`). Gdy podano `compareTarget`, oba targety muszą się różnić —
runner zapisuje oba runy pod tym samym `runGroupId` na potrzeby porównania A/B.

## Rubryki scoringu

Zaimplementowane w `evaluateCase()` (evalRunner.ts):

| Strategia  | Pass gdy…                                                            |
| ---------- | -------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                    |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`  |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` jest truthy          |
| `custom`   | `expected.fn(actualOutput, evalCase)` zwraca truthy (tylko built-in) |

**Uwaga:** Scoring funkcją custom jest zarezerwowany dla suite'ów zdefiniowanych
w kodzie (built-in), bo funkcji nie da się zserializować przez API.
`evalCaseBuilderSchema` akceptuje dla suite'ów tworzonych przez użytkownika
tylko `contains | exact | regex`.

Na dziś nie ma scorera LLM-as-judge ani similarity opartego o embeddingi —
byłby to czysty punkt rozszerzenia w `evaluateCase()`.

## Schemat bazy danych

Trzy tabele (migracje `030_create_eval_runs.sql` oraz
`031_create_eval_suites.sql`):

| Tabela        | Cel                                                                                                                           |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | Metadane własnych suite'ów (`id`, `name`, `description`)                                                                      |
| `eval_cases`  | Case'y per suite — `input_json`, `expected_*`, `tags_json`                                                                    |
| `eval_runs`   | Historyczne runy — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

Wbudowane suite'y **nie** są przechowywane w DB. Żyją w pamięci i są
re-rejestrowane przy każdym imporcie `evalRunner.ts`.

## REST API

Wszystkie endpointy wymagają management auth (`requireManagementAuth`) — nie są
częścią publicznej powierzchni proxy.

| Endpoint                      | Metoda   | Opis                                                              |
| ----------------------------- | -------- | ----------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | Lista suite'ów + ostatnie runy + scorecard + targety + klucze     |
| `/api/evals`                  | `POST`   | Uruchom suite (single lub compare) — schemat `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | Pobierz jeden suite (built-in lub custom)                         |
| `/api/evals/suites`           | `POST`   | Utwórz własny suite — schemat `evalSuiteSaveSchema`               |
| `/api/evals/suites/{suiteId}` | `GET`    | Pobierz własny suite                                              |
| `/api/evals/suites/{suiteId}` | `PUT`    | Zastąp własny suite (case'y są wstawiane od nowa)                 |
| `/api/evals/suites/{suiteId}` | `DELETE` | Usuń własny suite wraz z jego case'ami                            |

### Uruchamianie suite'u

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

Pola opcjonalne:

- `outputs` — `Record<caseId, string>` z precomputed outputs. Gdy podane,
  runner **pomija dispatch** i tylko scoruje zcache'owane wyjścia (przydatne do
  ewaluacji offline).
- `compareTarget` — drugi target uruchamiany równolegle; oba runy dzielą
  wygenerowany `runGroupId` do widoku head-to-head.
- `apiKeyId` — wewnętrzny API key używany do autentykacji dispatchowanych
  wywołań `/v1/chat/completions`. Wymagany, gdy włączone jest `REQUIRE_API_KEY`.

### Tworzenie własnego suite'u

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## Pipeline dispatchu

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. Rozwiązuje suite (built-in lub custom).
2. Dla każdego case'a buduje `Request` do `/v1/chat/completions` z
   `messages` case'a, rozwiązanym `model`, `stream: false` oraz `max_tokens: 512`
   (albo override z case'a).
3. Wywołuje chat handler bezpośrednio (in-process — bez dodatkowego hopa HTTP).
4. Zbiera latency i wyciąga tekst z `choices[0].message.content`
   albo z payloadu Responses-API `output[]`.
5. Scoruje wszystkie wyjścia przez `runSuite()`, potem zapisuje przez `saveEvalRun()`.

Case'y uruchamiane są **sekwencyjnie**. Na dziś nie ma flagi concurrency.

## Dashboard

UI znajduje się pod `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). Stamtąd możesz:

- Przeglądać wbudowane i własne suite'y z podglądem case po case.
- Tworzyć/edytować/usuwać własne suite'y w case builderze.
- Wybrać target (domyślne suite / model / combo), opcjonalnie drugi
  `compareTarget`, opcjonalnie API key, a potem uruchomić na żądanie.
- Przeglądać historię runów, pass/fail per case, latency oraz przechwycone
  wyjścia.
- Widzieć rolling scorecard zagregowany po najnowszym runie w zakresie
  `(suite, target)`.

## Relacja z RFC Auto-Assessment

Osobny, węższy subsystem assessmentu żyje w `src/domain/assessment/`
(zob. też [AUTO-COMBO.md](../routing/AUTO-COMBO.md) dla silnika scoringu na
żywo). Ten subsystem celuje w silnik Auto Combo — automatycznie scoruje
providery i modele, żeby combo mogły się self-healować, gdy upstreamy padają.
Używa własnego runnera, własnego kategoryzatora i własnej logiki scoringu.

Framework Evals opisany tutaj to **szersza, ogólnego przeznaczenia powierzchnia
testowa**. Preferuj go do dowolnych suite'ów regresyjnych, porównań A/B oraz
smoke testów per-release. Subsystem Auto-Assessment używaj, gdy potrzebujesz
healthu providerów w czasie rzeczywistym do wpływania na decyzje routingu.

## Integracja z CI

Na dziś nie ma dedykowanego skryptu npm `eval:ci`. Dwie ścieżki, jeśli chcesz
bramkować release'y wynikami evali:

- **Ścieżka HTTP**: postaw serwer, uderz w `POST /api/evals` ze znanym
  `suiteId` + `target` i asertuj `runs[].summary.passRate >= N` w odpowiedzi.
- **Ścieżka in-process**: zaimportuj `runEvalSuiteAgainstTarget()` z
  `@/lib/evals/runtime` w skrypcie, uruchom względem testowej DB i sprawdź
  zwrócone `PersistedEvalRun.summary`.

Testy pokrywające route i historię leżą w
`tests/unit/evals-route.test.ts` oraz `tests/unit/evals-history.test.ts`.

## Punkty rozszerzeń

Typowe zmiany i gdzie je robić:

- **Nowa strategia scoringu** — rozszerz blok `switch (evalCase.expected.strategy)`
  w `evaluateCase()` (`evalRunner.ts`) i poszerz `EvalCaseStrategy` w
  `src/lib/db/evals.ts` oraz `evalCaseBuilderSchema` w `schemas.ts`.
- **Nowy wbudowany suite** — zdefiniuj obiekt suite i wywołaj `registerSuite()` na
  dole `evalRunner.ts`. Zostanie auto-odkryty przez `listSuites()`.
- **Run z concurrency** — zamień sekwencyjną pętlę `for` w
  `runEvalSuiteAgainstTarget()` na ograniczony `Promise.all` (dziś nie ma
  kontroli concurrency).
- **Case'y stream/tool-call** — obecnie runner wymusza `stream: false`.
  Ewaluacja streamingowa lub tool-aware wymagałaby zmian w `runtime.ts`
  (przechwytywanie i agregacja chunków SSE przed scoringiem).

## Zobacz też

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — ogólny przewodnik po produkcie
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — referencja pipeline'u żądań
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — silnik scoringu Auto Combo (live runtime)
- Źródło: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
