---
title: "Pakiet homologacji (npm run homolog)"
version: 3.8.49
lastUpdated: 2026-07-14
---

# Pakiet homologacji (`npm run homolog`)

Walidacja E2E w rzeczywistym środowisku wdrożenia OmniRoute działającego na VPS homologacji
(`HOMOLOG_BASE_URL`, np. `http://192.168.0.15:20128`). Jedno polecenie zastępuje ręczną
check-listę release STOP #2 zautomatyzowanym przebiegiem generującym dowody.

## Co obejmuje

| Warstwa                | Co sprawdza                                                                                                                                                                                       | Implementacja                                                                 |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| L0 — health/parity     | `/api/monitoring/health` odpowiada `200` ze `status: "healthy"` i oczekiwaną wersją                                                                                                               | `scripts/homolog/lib/parity.mjs`                                              |
| L1a — ephemeral key    | Logowanie admina → `POST /api/keys` tworzy scoped klucz API na przebieg, unieważniany (`DELETE /api/keys/:id`) w bloku `finally` niezależnie od wyniku                                            | `scripts/homolog/lib/adminClient.mjs`                                         |
| L1b — API surface      | Katalog `/v1/models`, prawdziwe non-streaming chat completion (model tier-critical, `max_tokens: 5`), invalid-key `401` oraz publiczne `/api/monitoring/health`                                   | `tests/homolog/api/core.http` (httpYac)                                       |
| L1c — SSE streaming    | Prawdziwe streaming chat completion; asercje `text/event-stream`, co najmniej jedna content delta oraz terminator `[DONE]`                                                                        | `scripts/homolog/lib/sseCheck.mjs`                                            |
| L2 — real providers    | Jeden minimal-cost chat request na każdego krytycznego providera obecnego w żywym katalogu `/v1/models`, generowany w locie przez promptfoo                                                       | `scripts/homolog/gen-promptfoo.mjs` + `scripts/homolog/lib/providerTiers.mjs` |
| L4a — UI auth          | Loguje się raz przez prawdziwy formularz logowania i ponownie używa sesji (`storageState`) w warstwie UI                                                                                          | `tests/homolog/ui/auth.setup.ts`                                              |
| L4b — UI routes        | Każdy statyczny `page.tsx` pod `src/app/(dashboard)/dashboard` (odkryty z systemu plików, dynamiczne trasy `[param]` pomijane) ładuje się bez błędu HTTP, błędu strony ani error boundary Next.js | `tests/homolog/ui/routes.spec.ts`                                             |
| L4c — UI critical flow | Tworzy klucz API przez UI dashboardu i ponownie go unieważnia (nie zostawia śladów na VPS)                                                                                                        | `tests/homolog/ui/api-key-flow.spec.ts`                                       |
| L5 — unified report    | Scala httpYac (przez `junit-to-ctrf`), adapter promptfoo→CTRF oraz reporter Playwright CTRF w jeden `homolog-ctrf.json`, plus czytelny dla człowieka `homolog-report/summary.md`                  | `scripts/homolog/run.mjs`                                                     |

Zero udziału LLM w samym replayu — to deterministyczna bateria regresyjna,
nie ewaluacja. AI wkracza dopiero w przyszłych pracach utrzymaniowych (zob. Roadmap poniżej).

## Wymagania wstępne

1. Skopiuj `.env.homolog.example` do `.env.homolog` (gitignored — nigdy go nie commituj) i uzupełnij:
   - `HOMOLOG_BASE_URL` — docelowe wdrożenie, np. `http://192.168.0.15:20128`.
   - `HOMOLOG_ADMIN_PASSWORD` — hasło zarządzania dashboardem dla tego wdrożenia.
   - `HOMOLOG_CRITICAL_PROVIDERS` — prefiksy providerów oddzielone przecinkami, które dostają prawdziwy
     smoke chat request (np. `openai,anthropic,gemini,codex,grok,glm,deepseek,openrouter`).
   - `HOMOLOG_API_KEY` — w normalnych przebiegach zostaw puste; pakiet tworzy i unieważnia własny
     efemeryczny klucz. Ustaw tylko do debugowania pojedynczej warstwy w izolacji.
2. `npm install` w repozytorium (zależności pakietu — `httpyac`, `promptfoo`,
   `playwright-ctrf-json-reporter`, `junit-to-ctrf`, `ctrf` — to zwykłe devDependencies).
3. `npx playwright install`, jeśli binaria przeglądarki nie są jeszcze obecne.

## Jak uruchomić

```bash
npm run homolog
```

Aby walidować wdrożenie, którego wersja nie zgadza się z lokalnym `package.json`
(np. skrzynka homologacji wciąż na poprzednim patch release), nadpisz oczekiwaną
wersję jawnie:

```bash
HOMOLOG_EXPECT_VERSION=3.8.47 npm run homolog
```

Przebieg kończy się kodem niezerowym, jeśli którakolwiek warstwa zawiedzie, i zawsze próbuje unieważnić
efemeryczny klucz API, który utworzył, nawet przy awarii (blok `finally` w `scripts/homolog/run.mjs`).

## Odczyt raportu

Całe wyjście trafia do `homolog-report/` (gitignored):

- `summary.md` — ta sama tabela wypisywana na stdout, jeden wiersz na warstwę (✅/❌ + szczegóły).
- `homolog-ctrf.json` — ujednolicony raport CTRF (scalenie wyników API/SSE, provider-smoke oraz
  UI) — to artefakt do dołączenia do check-listy release STOP #2.
- `httpyac-junit.xml`, `api-ctrf.json`, `providers-ctrf.json`, `ui-ctrf.json` — surowe/pośrednie
  raporty per warstwa.
- `promptfooconfig.yaml`, `provider-misses.json` — wygenerowana konfiguracja promptfoo dla
  bieżącego przebiegu oraz krytyczni providerzy nieobecni w żywym katalogu.

Nieudane L0 przerywa natychmiast (efemeryczny klucz nie jest tworzony), ponieważ niedopasowanie
wersji/health oznaczałoby, że każda dalsza warstwa walidowałaby złe wdrożenie.

## Ponowne bazowanie, gdy UI zmienia się zasadnie

L4b (route smoke) i L4c (przepływ UI klucza API) opierają się na prawdziwych lokatorach DOM, nie
na snapshotach, więc większość zasadnych zmian UI nie wymaga aktualizacji pakietu. Gdy zmiana
jednak zepsuje lokator (np. zmieniona etykieta przycisku lub przeniesiona strona ustawień):

1. Ponownie potwierdź lokator względem bieżącego źródła (specyfikacje już dokumentują, względem
   którego pliku/linii każdy lokator był potwierdzony — trzymaj się tego wzorca, nie zgaduj).
2. Zaktualizuj spec w `tests/homolog/ui/`.
3. Uruchom ponownie `npm run homolog` (albo tylko dotknięty spec Playwright) względem VPS, aby
   potwierdzić poprawkę, a następnie zrób commit.

W tym pakiecie nie ma wizualnej/pikselowej bazy (F1) — zob. Roadmap.

## Roadmap (F2 / F3)

Projekt i etapowe wdrażanie są w wewnętrznej specyfikacji planistycznej
`_tasks/superpowers/specs/2026-07-13-homolog-e2e-suite-design.md` (bez linku — wewnętrzny
artefakt `_tasks/`, nie część śledzonej dokumentacji tego repozytorium). Podsumowanie:

- **F2** — pełne nagranie przejścia → Playwright Test Agents (`planner`/`generator`)
  zamieniają je na specyfikacje przepływów (create combo, test provider, edit settings, MCP tools) +
  baza regresji wizualnej (Lost Pixel) z maskami na dane dynamiczne (metryki,
  znaczniki czasu, logi) + rutyna utrzymaniowa `healer` na każdy release.
- **F3** — pokrycie resilience/contract/wiring: toxiproxy + fałszywy OpenAI-compatible
  provider na devboxie, combo `homolog-resilience` na VPS wskazujące na niego
  (wstrzyknięty timeout → asercja fallback + otwarcie/zamknięcie circuit breakera przez
  `/api/monitoring/health`); bramkowane testy kontraktowe Schemathesis względem
  `docs/openapi.yaml` (niskie `--max-examples`, stałe seed-y, tylko endpointy non-LLM); oraz
  podpięcie `npm run homolog` + jego `summary.md` do fazy STOP #2 w `/generate-release`.
