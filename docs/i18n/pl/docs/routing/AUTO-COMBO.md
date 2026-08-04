---
title: "Silnik OmniRoute Auto-Combo"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Silnik OmniRoute Auto-Combo

> **Dla użytkowników**: Szukasz szybkiego startu? Zobacz [Przewodnik użytkownika Auto-Combo](../getting-started/AUTO-COMBO-GUIDE.md) — proste wyjaśnienia i przykłady.

> Samozarządzające łańcuchy modeli z adaptacyjnym scoringiem + auto-routing bez konfiguracji

## Auto-routing bez konfiguracji (prefiks `auto/`)

> **NOWOŚĆ:** Tworzenie combo nie jest wymagane. Użyj prefiksu `auto/` bezpośrednio w dowolnym kliencie.

### Szybkie przykłady

| Model ID       | Wariant | Zachowanie                                                                           |
| -------------- | ------- | ------------------------------------------------------------------------------------ |
| `auto`         | default | Wszyscy podłączeni providerzy, strategia LKGP, zrównoważone wagi                     |
| `auto/coding`  | coding  | Wagi quality-first, odpowiednie do generowania kodu                                  |
| `auto/fast`    | fast    | Selekcja ważona pod niską latencję                                                   |
| `auto/cheap`   | cheap   | Routing zoptymalizowany kosztowo (najpierw najniższy koszt)                          |
| `auto/offline` | offline | Preferuje providerów z najwyższą dostępnością quota                                  |
| `auto/smart`   | smart   | Quality-first + wyższy współczynnik eksploracji (10%) dla lepszego odkrywania modeli |
| `auto/lkgp`    | lkgp    | Jawne LKGP (to samo co domyślne `auto`)                                              |

### Kompozycja Category × Tier (`auto/<category>:<tier>`)

Sufiksy w stylu OpenRouter rozdzielają **jaki rodzaj trasy** (category) od **jak ją optymalizować** (tier), więc możesz je swobodnie składać (#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **Categories** (filtrują pulę kandydatów wg możliwości): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal` zostawiają modele z obsługą vision; `reasoning` zostawia modele reasoning/thinking.
- **Tiers** (wybór wag scoringu / filtra puli): `fast` (ship-fast) · `cheap` (alias `floor`, cost-saver) · `reliable` (health circuit-breakera + stabilność latencji) · `free` / `pro` (filtr puli wg tieru modelu przez `classifyTier` — free-tier vs. premium).

| Przykład               | Rozwiązuje się do                                                 |
| ---------------------- | ----------------------------------------------------------------- |
| `auto/coding:fast`     | pula coding, wagi niskiej latencji                                |
| `auto/coding:cheap`    | pula coding, zoptymalizowana kosztowo (alias `auto/coding:floor`) |
| `auto/reasoning:pro`   | tylko modele reasoning/thinking, tier premium                     |
| `auto/vision`          | modele z vision (brak tieru → zrównoważone wagi)                  |
| `auto/multimodal:free` | modele multimodal, tylko free tier                                |

Każdy poprawny `auto/<category>[:<tier>]` jest rozwiązywany na żądanie; wyselekcjonowany podzbiór jest reklamowany w `/v1/models` i dashboardzie (`AUTO_SUFFIX_VARIANTS` w `open-sse/services/autoCombo/builtinCatalog.ts`). Filtrowanie jest **fail-open** — jeśli ograniczenie nie pasuje do żadnego podłączonego modelu, używana jest pełna pula, więc routing się nie psuje. Rdzeń scorera (`combo.ts`) pozostaje bez zmian; filtr category/tier jest stosowany w `buildAutoCandidates`.

> **Live model intelligence:** dopasowanie fitness w auto-routingu korzysta z żywych rankingów **Arena ELO** + danych tierów **models.dev**, gdy flaga `ARENA_ELO_SYNC_ENABLED` jest włączona (w przeciwnym razie fallback do statycznej mapy fitness).

**Jak używać:**

```bash
# Any IDE or CLI tool that supports OpenAI format
Base URL: http://localhost:20128/v1
API Key:  <your-endpoint-key>

# In your code/config, set model to:
model: "auto"                 # balanced default
model: "auto/coding"          # best for coding tasks
model: "auto/fast"            # fastest available
model: "auto/cheap"           # cheapest per token
```

**Co się dzieje:**

1. OmniRoute wykrywa prefiks `auto/` w `src/sse/handlers/chat.ts`
2. Pobiera wszystkie **aktywne połączenia providerów** z bazy
3. Filtruje do tych z ważnymi poświadczeniami (klucz API lub token OAuth)
4. Ustala model na połączenie (`connection.defaultModel` lub pierwszy model providera)
5. Buduje **wirtualne combo** w pamięci (nie zapisywane w DB)
6. Routuje według profilu wag wybranego wariantu + strategii LKGP

**Kluczowe właściwości:**

- ✅ **Always-on:** Bez przełącznika, bez tworzenia combo, bez konfiguracji
- ✅ **Dynamiczne:** Automatycznie odzwierciedla aktualnie podłączonych providerów
- ✅ **Session stickiness:** LKGP priorytetyzuje ostatniego udanego providera
- ✅ **Świadomość multi-account:** Każde połączenie providera staje się osobnym kandydatem
- ✅ **Bez zapisów do DB:** Wirtualne combo istnieje tylko na czas żądania, zerowy narzut persystencji

### Kontrola kandydatów per-key (#7819, Level 1+2)

`GET /v1/auto-combo/{channel}/candidates` (`{channel}` = sufiks po `auto/`, albo
literalne `auto` dla kanału bazowego) to endpoint **tylko do odczytu**, który listuje
bieżącą pulę kandydatów kanału `auto/*` z dekoracją live reachability, korzystając
z istniejących odczytów resilience (nigdy surowego `state` breakera):

- circuit breaker providera — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- cooldown połączenia — `rateLimitedUntil` / `testStatus` na rozwiązanym
  wierszu `provider_connections`
- lockout modelu — `isModelLocked(provider, connectionId, model)`

Każdy kandydat niesie też flagę `excluded` tego klucza API. Wykluczenia są przechowywane
per-API-key (tabela `auto_candidate_overrides`, migracja `128`) — OmniRoute jest
single-tenant bez tabeli `users`, więc `apiKeyId` to najbliższa realna tożsamość per-caller —
i egzekwowane w wąskim gardle puli kandydatów w
`open-sse/services/autoCombo/virtualFactory.ts` przez czystą, unit-testowaną
`filterExcludedCandidates()` (`open-sse/services/autoCombo/candidateOverrides.ts`).
Filtr jest **fail-open**: brak apiKeyId/channel albo błąd odczytu DB zostawiają pulę
bez filtra, więc operator bez skonfigurowanych override’ów widzi routing
bajtowo identyczny jak przed tą funkcją.

**Odłożone do follow-up issue:** wagi per-kandydat + jawne porządkowanie (Level 3
— wchodzi w istniejące ścieżki strategii weighted/priority) oraz przypięcie konkretnej
strategii `combo.ts` per kanał `auto/*` (Level 4). Zobacz plan #7819 w sprawie otwartego
pytania, czy override’y powinny zostać per-API-key, czy stać się globalne przy modelu
single-tenant.

**Za kulisami:**

```txt
Request: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts detects prefix
   ↓
createVirtualAutoCombo('coding') → candidatePool from active connections
   ↓
handleComboChat (same engine as persisted combos)
   ↓
Auto-scoring selects best provider/model per request
```

**Pliki implementacji:**

| Plik                                                      | Cel                                            |
| --------------------------------------------------------- | ---------------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefiksu (`parseAutoPrefix`)            |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Tworzy wirtualne obiekty `AutoComboConfig`     |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Hook testowy do mockowania rejestru providerów |
| `src/sse/handlers/chat.ts`                                | Integracja: short-circuit prefiksu auto        |
| `src/shared/constants/providers.ts`                       | Wpis systemowy `SYSTEM_PROVIDERS.auto`         |

## Nazwy combo pokrywające się z realnym model id

Combo, którego `name` jest identyczne z gołym model id (np. combo o nazwie
`gpt-5.5`), to **zamierzony, wspierany wzorzec**, a nie bug: to mechanizm
fallbacku providera per-model-id udokumentowany w
[#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940). Ponieważ
rozwiązanie combo jest sprawdzane przed rozwiązaniem gołego model id
(`getComboForModel()` w `src/sse/services/model.ts`), żądanie gołego
id `gpt-5.5` jest routowane przez targety combo (np.
`acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`) zamiast prosto do
jednego providera — to wykorzystuje pierwszeństwo combo-before-rewrite zbudowane dla
[#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227) i jest
pokryte testami regresji `tests/unit/responses-combo-resolution-3227.test.ts` oraz
`tests/unit/combo-name-codex-responses-rewrite.test.ts`.

Tworzenie lub zmiana nazwy combo na nazwę zacieniającą realne model id
**nigdy nie jest odrzucane** — to złamałoby ten udokumentowany workflow. Zamiast tego
(#8530), `POST /api/combos` i `PUT /api/combos/[id]` dołączają nieblokujące
pole `warning` do odpowiedzi, gdy (nowa) nazwa koliduje z realnym
model id:

```json
{ "warning": { "code": "COMBO_NAME_SHADOWS_MODEL", "modelId": "gpt-5.5", "providerId": "openai" } }
```

Przy starcie `scanComboModelNameCollisionsAtBoot()`
(`src/instrumentation-node.ts`) loguje też jednoliniowe ostrzeżenie `[STARTUP]`
wymieniające każde istniejące combo zacieniające model id, więc operatorzy, którzy
trafią w to przypadkiem (a nie celowo, per #6940), mają sygnał.
Helper detekcji żyje w `src/lib/combos/modelNameCollision.ts`.

## Jak to działa (persystowane Auto-Combo)

Silnik Auto-Combo dynamicznie wybiera najlepszego providera/model dla każdego żądania przy użyciu **12-czynnikowej funkcji scoringu** (zdefiniowanej w `open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`). Wszystkie wagi sumują się do **1.0**.

![Auto-Combo 12-factor scoring](../diagrams/exported/auto-combo-12factor.svg)

> Źródło: [diagrams/auto-combo-12factor.mmd](../diagrams/auto-combo-12factor.mmd) (regeneruj przez `npm run docs:render-diagrams`).

| Czynnik               | Domyślna waga | Opis                                                                                                     |
| :-------------------- | :------------ | :------------------------------------------------------------------------------------------------------- |
| `health`              | 0.20          | Wynik health z circuit breakera (CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                    |
| `quota`               | 0.15          | Pozostała quota / headroom rate-limitu [0..1]                                                            |
| `costInv`             | 0.15          | Odwrotność **blended** cost (60% input + 40% output token price, znormalizowane) — tańszy = wyższy score |
| `latencyInv`          | 0.12          | Odwrotność latencji p95 znormalizowana do puli — szybszy = wyższy score                                  |
| `taskFit`             | 0.08          | Fitness typu zadania (coding, review, planning, analysis, debugging, docs)                               |
| `stability`           | 0.05          | Stabilność oparta na wariancji (niski stdDev latencji / error rate)                                      |
| `tierPriority`        | 0.05          | Priorytet tieru konta — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                     |
| `tierAffinity`        | 0.05          | Afinity między tierem kandydata a tierem rekomendowanym w manifeście                                     |
| `specificityMatch`    | 0.05          | Dopasowanie specificity żądania (hint z manifestu) do tieru modelu                                       |
| `contextAffinity`     | 0.05          | Afinity między potrzebą okna kontekstu żądania a oknem kontekstu modelu                                  |
| `connectionDensity`   | 0.05          | Rozkłada obciążenie między połączenia tego samego providera (anti-concentration)                         |
| `resetWindowAffinity` | 0.00          | Bias w stronę połączeń z korzystnym oknem resetu quota (domyślnie wyłączone)                             |

**Suma:** `0.20 + 0.15 + 0.15 + 0.12 + 0.08 + 0.05 + 0.05 + 0.05 + 0.05 + 0.05 + 0.05 + 0.00 = 1.0` (walidowane przez `validateWeights()`).

## Mode Packs

Cztery predefiniowane profile wag w `open-sse/services/autoCombo/modePacks.ts`. Każdy pack nadpisuje domyślne wagi, by przesunąć selekcję w stronę konkretnego celu. Poniżej **pełne tabele wag per pack** (każdy wiersz sumuje się do 1.0).

| Factor       | ship-fast | cost-saver | quality-first | offline-friendly |
| :----------- | :-------- | :--------- | :------------ | :--------------- |
| quota        | 0.14      | 0.14       | 0.10          | **0.37**         |
| health       | 0.28      | 0.19       | 0.18          | 0.28             |
| costInv      | 0.05      | **0.37**   | 0.05          | 0.10             |
| latencyInv   | **0.32**  | 0.05       | 0.05          | 0.05             |
| taskFit      | 0.10      | 0.10       | **0.37**      | 0.00             |
| stability    | 0.00      | 0.05       | 0.15          | 0.10             |
| tierPriority | 0.05      | 0.05       | 0.05          | 0.05             |

Uwagi:

- `tierAffinity` i `specificityMatch` nie są ustawiane w mode packs — `calculateScore()` traktuje je jako `?? 0`, gdy nieobecne.
- Nacisk każdego packa w skrócie:
  - **ship-fast** → latencyInv 0.32 + health 0.28 (niska latencja, zdrowe połączenia)
  - **cost-saver** → costInv 0.37 (wygrywają najtańsze tokeny)
  - **quality-first** → taskFit 0.37 + stability 0.15 (najlepszy model do zadania, spójny)
  - **offline-friendly** → quota 0.37 + health 0.28 (max headroom niezależnie od szybkości/kosztu)

### Kontrolki per-request (headery) — #6023 / #6024 / #6025 / #3470

Combo `auto` można sterować **per request** przez trzy headery, bez mutowania
zapisanej konfiguracji combo. Dotyczą tylko strategii `auto` i tylko żądania,
które je niesie; gdy headera brak, używane są zapisane
`modePack`/`budgetCap`/`budgetFallback` combo.

| Header                        | Accepts                                                                                                                                                                                 | Effect                                                                                                                                                                                                                                |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `X-OmniRoute-Mode`            | a preset alias (`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) or a raw pack name (`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | Nadpisuje wagi scoringu dla tego żądania. `balanced`/`default` wymuszają domyślne wagi (bez packa). Nieznane wartości są ignorowane (config zachowany).                                                                               |
| `X-OmniRoute-Budget`          | a positive number (max USD per request)                                                                                                                                                 | Twardy sufit kosztu: kandydaci, których szacowany koszt go przekracza, są filtrowani przed selekcją. Co się dzieje, gdy **każdy** kandydat przekracza limit, kontroluje `X-OmniRoute-Budget-Fallback` poniżej.                        |
| `X-OmniRoute-Budget-Fallback` | `cheapest` (default, aliases: `cheapest-viable`, `soft`) or `strict` (aliases: `block`, `hard`)                                                                                         | `cheapest`: fallback do globalnie najtańszego kandydata nawet jeśli nadal przekracza cap (zachowanie legacy). `strict`: odmawia selekcji — żądanie fail-fast z `HTTP 402` zamiast cichego overspend. Nieznane wartości są ignorowane. |

```bash
# Force the fastest profile, cap this request at $0.05, and hard-block instead of overspending
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

Rozwiązanie to czysta funkcja (`open-sse/services/autoCombo/requestControls.ts`);
rozwiązane wartości zasilają istniejące wejścia silnika `config.modePack` / `config.budgetCap` /
`config.budgetFallback`. Zapisane `config.budgetFallback` combo ("strict" |
"cheapest") ustawia politykę trwałą; header nadpisuje ją na jedno żądanie.

## Wszystkie strategie routingu

Silnik combo OmniRoute obsługuje **18 strategii routingu** (zadeklarowanych w `src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`). Sam silnik Auto Combo jest wystawiony pod strategią `auto`; pozostałe są dostępne dla persystowanych combo.

| Strategy            | Opis                                                                                                                                    |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | Uporządkowana lista first-target z jawnym priorytetem                                                                                   |
| `weighted`          | Losowanie ważone wg wagi per-target                                                                                                     |
| `round-robin`       | Cykl przez targety w kolejności                                                                                                         |
| `context-relay`     | Przekazywanie kontekstu między targetami (długie rozmowy)                                                                               |
| `fill-first`        | Wypełnij quota każdego targetu przed przejściem do następnego                                                                           |
| `p2c`               | Losowy load balancing Power-of-2-choices                                                                                                |
| `random`            | Jednorodny wybór losowy                                                                                                                 |
| `least-used`        | Wybierz target z najniższym bieżącym obciążeniem                                                                                        |
| `cost-optimized`    | Minimalizuj $ na żądanie wg cennika katalogowego                                                                                        |
| `reset-aware` ⭐    | Priorytet wg czasu resetu quota — krótsze okna resetu wyżej                                                                             |
| `reset-window`      | Preferuj targety, których okno quota resetuje się najszybciej                                                                           |
| `headroom`          | Wybierz target z największym pozostałym headroomem quota                                                                                |
| `strict-random`     | Losowo bez deduplikacji powtórzeń                                                                                                       |
| `auto`              | Scoring Auto Combo (9-factor) — **zalecane**                                                                                            |
| `lkgp`              | Last-Known-Good Path (lepka trasa do ostatniego udanego targetu)                                                                        |
| `context-optimized` | Wybierz target najlepiej pasujący do bieżącego rozmiaru kontekstu                                                                       |
| `fusion` 🧬         | Fan-out do panelu modeli równolegle, potem synteza jednej odpowiedzi przez judge (zob. poniżej)                                         |
| `pipeline`          | Uruchamia targety sekwencyjnie, przekładając output każdego kroku na input następnego; zwracana jest tylko ostateczna odpowiedź (#6396) |

⭐ = Nowe w v3.8.0 · 🧬 = Nowe w v3.8.36

## Strategia Fusion

`fusion` to jedyna strategia, która **nie** wybiera pojedynczego targetu. Rozsyła prompt
do **każdego modelu panelu równolegle**, a konfigurowalny **judge model** syntezuje
jedną ostateczną odpowiedź ze wszystkich odpowiedzi panelu. Port z upstream `decolua/9router`
(design Fusion OpenRouter); implementacja w `open-sse/services/fusion.ts`.

Jak działa:

0. **Bypass z tools** — żądanie z niepustą tablicą `tools` oraz
   `tool_choice` nie jawnie `"none"` pomija panel całkowicie: routuje wprost do
   jednego modelu (skonfigurowany judge albo `panel[0]`) z `tools`/`tool_choice`
   przekazanymi bez zmian. Członkowie panelu nie mają dostępu do tools, a dyrektywa
   syntezy judge’a zniechęca do emisji tool-call, więc klienci agentic/tool-calling
   dostają realną decyzję tool-call zamiast zsyntetyzowanej prozy (#6771).
1. **Fan-out** (tylko żądania bez tools) — prompt idzie do każdego modelu panelu
   naraz, wymuszone non-streaming z tools stripped (judge potrzebuje pełnej
   prozy do syntezy).
2. **Zbieranie quorum-grace** — gdy tylko dotrze `minPanel` odpowiedzi, startuje krótki
   timer grace dla spóźnialskich, potem fusion idzie z tym, co zebrano.
   To ogranicza karę najwolniejszego modelu na wall time, ograniczone twardym timeoutem.
3. **Synteza judge** — odpowiedzi panelu są anonimizowane (`Source 1`, `Source 2`, … — żeby
   judge ważył treść, nie markę modelu) i przekazywane judge’owi, który analizuje
   consensus / contradictions / partial coverage / unique insights / blind spots, potem
   pisze **jedną** autorytatywną odpowiedź. Wywołanie judge zachowuje oryginalny
   flag `stream` klienta + tools, więc streaming i dalsze użycie tools nadal działają.
4. **Graceful degradation** — 0 odpowiedzi panelu → `503`; dokładnie 1 ocalały → ta odpowiedź
   wraca wprost (nie ma czego fuse’ować); panel jedno-modelowy odpowiada wprost.

Członek panelu może też być krokiem `combo-ref` (`{kind: "combo-ref", comboName: "..."}`) wskazującym
inne combo — rozwiązuje się jako **jeden black-box głos panelu** (pełny rekursywny dispatch do
wskazanego combo, nie fan-out własnych targetów tego combo), z tą samą ochroną głębokości/cykli,
której używa każda inna strategia konsumująca combo-ref (#6764).

### Konfiguracja

Konfigurowane w blobie `config` combo (bez migracji schematu — reuse istniejącej
tabeli `combos`):

| Pole                                     | Typ      | Domyślnie         | Cel                                                                              |
| :--------------------------------------- | :------- | :---------------- | :------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | first panel model | Model syntezujący ostateczną odpowiedź                                           |
| `config.fusionTuning.minPanel`           | `number` | `2`               | Wymagane udane odpowiedzi zanim startuje grace timer (clamp do `[2, panelSize]`) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`            | Jak długo czekać na spóźnialskich po osiągnięciu quorum                          |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`           | Absolutny cap, by jeden zawieszony model nie zablokował żądania                  |

Domyślne wartości żyją w `FUSION_DEFAULTS` (`open-sse/services/fusion.ts`).

### Przykład

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

Potem wywołuj jak każde combo: `{"model":"fusion-panel","messages":[...]}`.

## Fabryka wirtualnego Auto-Combo

Silnik Auto Combo nie wymaga predefiniowanych combo. Zamiast tego `open-sse/services/autoCombo/virtualFactory.ts` buduje kandydatów w locie:

1. Pobiera `getProviderConnections({ isActive: true })` (wszystkie włączone połączenia)
2. Filtruje do tych z ważnymi poświadczeniami (klucz API lub niewygasły token OAuth przez `hasUsableOAuthToken()`)
3. Krzyżuje z `getProviderRegistry()` pod kątem dostępności modeli + cennika
4. Dla każdej krotki `(provider, model, connection)` buduje `VirtualAutoComboCandidate`
5. Wybiera `connection.defaultModel` (albo pierwszy model z rejestru) jako target dispatch
6. Scoruje każdego kandydata 9-czynnikowym `scorePool()` i packiem wag wariantu
7. Zwraca wynikowy in-memory `AutoComboConfig` dla `handleComboChat()` — nigdy nie persystowany do DB

To oznacza, że **dodanie nowego providera z włączonym `auto/*` automatycznie rozszerza pulę kandydatów** — bez ręcznej edycji combo. Wirtualne combo jest przebudowywane per request, więc nowo dodane lub nowo zdrowe połączenia są brane od razu.

## Self-Healing

- **Tymczasowe wykluczenie**: Score < 0.2 → wykluczenie na 5 min (progressive backoff, max 30 min)
- **Świadomość circuit breakera**: OPEN → auto-wykluczenie; HALF_OPEN → żądania probe
- **Tryb incydentu**: >50% OPEN → wyłącz eksplorację, maksymalizuj stabilność
- **Odzyskiwanie po cooldown**: Po wykluczeniu pierwsze żądanie to „probe” ze skróconym timeoutem

## Bandit Exploration

5% żądań (konfigurowalne) jest routowanych do losowych providerów w celach eksploracji. Wyłączone w trybie incydentu.

## API

**Nie ma dedykowanego endpointu `POST /api/combos/auto`** — Auto-Combo jest konsumowane na dwa sposoby:

1. **Zero-config (zalecane):** Wyślij dowolne żądanie chat completion z `model: "auto"` lub `model: "auto/<variant>"`. Fabryka wirtualna buduje combo per request — bez persystencji, bez dodatkowych wywołań API.

2. **Persystowane combo ze `strategy: "auto"`:** Utwórz zwykłe combo przez `POST /api/combos` i ustaw `strategy: "auto"` plus `config.auto.weights` / `config.auto.candidatePool`. Używany jest ten sam silnik scoringu; combo jest przechowywane w `combos` i reusable po ID.

Do discovery `GET /api/combos/auto` listuje każdy wariant z rozwiązaną pulą kandydatów oraz `context_length` / `max_output_tokens` — MAX spośród okien puli kandydatów. Klienci (np. plugin opencode) muszą reklamować te wartości zamiast `0`: zerowy context całkowicie wyłącza auto-compaction opencode, pozwalając sesjom rosnąć aż purge historii w gateway zniszczy kontekst. MAX jest bezpieczne do reklamowania, bo pre-filter kontekstu auto-combo kieruje oversized requesty do kandydatów z dużym oknem.

```bash
# Zero-config usage (no combo creation)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# Persisted auto combo via the regular combos endpoint
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### Strategie auto routera

Persystowane combo `strategy: "auto"` mogą ustawić `config.routerStrategy` (lub legacy
`config.auto.routerStrategy`) na jedną z:

- `rules` — domyślny scoring ważony
- `cost` / `eco` — najtańszy zdrowy provider
- `latency` / `fast` — najniższa latencja p95 z karą za reliability
- `sla-aware` / `sla` — preferuj kandydatów spełniających SLO p95 latency, error-rate i opcjonalnie cost
- `lkgp` — najpierw last known good provider

### Strategie routera w szczegółach

Silnik auto-combo wystawia 5 podpinanych implementacji **RouterStrategy**, które
możesz zamieniać przez `config.routerStrategy` (lub legacy `config.auto.routerStrategy`).
Każda strategia wybiera jednego providera z puli kandydatów, mając `RoutingContext`
(typ zadania, hinty tool/vision, szacunek tokenów, opcjonalna polityka SLA, opcjonalny
last-known-good provider).

#### 1. `rules` (default) — 6-czynnikowy scoring ważony

Owija istniejący silnik scoringu. Filtruje kandydatów z circuit-breakerem `OPEN`,
potem uruchamia `scorePool()` z bieżącym typem zadania i `getTaskFitness()`,
wybierając providera z najwyższym wynikiem.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description =
    "6-factor weighted scoring: quota, health, cost, latency, taskFit, stability";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**Kiedy używać**: Domyślnie. Gdy chcesz zrównoważony kompromis między wszystkimi sygnałami.

**Alias**: `rules` (brak aliasu)

---

#### 2. `cost` / `eco` — najtańszy zdrowy provider

Sortuje pulę kandydatów po `costPer1MTokens` (rosnąco) i wybiera najtańszego.
Najpierw filtruje kandydatów `OPEN`.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kiedy używać**: Workloady wrażliwe na koszt, batch processing lub background jobs.

**Aliasy**: `cost`, `eco`

---

#### 3. `latency` / `fast` — najniższa latencja p95 z karą reliability

Sortuje po `p95LatencyMs + (errorRate * 1000)`. Kara error-rate zapewnia,
że zawodni providerzy są niżej nawet przy niskiej nominalnej latencji.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**Kiedy używać**: Workloady wrażliwe na latencję: real-time chat, autocomplete lub
interaktywne asystenty kodowania.

**Aliasy**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — zgodność SLO latency/error/cost

Scoruje każdego kandydata wg tego, jak dobrze spełnia skonfigurowaną politykę SLO:

| Czynnik         | Waga | Formuła                                           |
| --------------- | ---- | ------------------------------------------------- |
| Latency score   | 35%  | `threshold / max(value, ε)`                       |
| Error score     | 35%  | `threshold / max(value, ε)`                       |
| Health score    | 15%  | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN) |
| Cost score      | 10%  | `threshold / max(value, ε)` or inverse normalized |
| Stability score | 5%   | inverse normalized latency stddev                 |

Gdy `hardConstraints: true`, kandydaci są sortowani głównie po **violation score**
(jak daleko przekraczają dowolne SLO), potem po composite score. W przeciwnym razie
tylko composite score.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // ... scores each candidate against policy: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**Pola SLA** (ustawiane w config combo):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**Kiedy używać**: Workloady produkcyjne z ostrymi budżetami latency, error-rate lub cost.

**Aliasy**: `sla-aware`, `sla`

---

#### 5. `lkgp` — najpierw last known good provider

Próbuje **last known good provider** (jeśli ustawiony) najpierw, potem fallback do
strategii `rules`. Przydatne do session stickiness — ten sam provider obsługuje
follow-up w rozmowie.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // Fallback to rules strategy
    return getStrategy("rules").select(pool, context);
  }
}
```

**Kiedy używać**: Multi-turn conversations, gdzie chcesz, by ten sam provider obsługiwał
follow-up (np. caching, ciągłość kontekstu lub spójność cenowa).

**Alias**: `lkgp` (brak aliasu)

---

### Własne strategie routera

Możesz zarejestrować własną implementację `RouterStrategy` przez publiczne API:

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // Your routing logic here
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

Potem użyj:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### Przewodnik wyboru strategii routera

| Przypadek użycia      | Strategy    | Powód                                       |
| --------------------- | ----------- | ------------------------------------------- |
| Zrównoważony workload | `rules`     | Domyślna — uwzględnia wszystkie czynniki    |
| Minimalizuj koszt     | `cost`      | Zawsze wybiera najtańszego                  |
| Minimalizuj latencję  | `latency`   | Wybiera najszybszego wiarygodnego providera |
| Ścisłe SLO            | `sla-aware` | Filtruje po progach p95/error/cost          |
| Multi-turn chat       | `lkgp`      | Session stickiness                          |

Pola SLA-aware:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## Task Fitness

30+ modeli scorowanych w 6 typach zadań (`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`). Wspiera wzorce wildcard (np. `*-coder` → wysoki coding score).

## Podsumowanie wariantów Auto

Wraz z gołym `auto` (default) plus 6 wartościami `AutoVariant` zadeklarowanymi w `autoPrefix.ts` jest **7 wywoływalnych model ID**:

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` samo enumeruje 6 wartości; 7. opcja to „brak wariantu” — gołe `auto` — obsługiwane przez `parseAutoPrefix()` jako `variant: undefined`.)

## Jak tiery pasują do Auto-Combo

12-czynnikowa funkcja scoringu (`open-sse/services/autoCombo/scoring.ts`) traktuje
przynależność do tieru jako dwa sygnały: `tierPriority` (0.05) i `tierAffinity` (0.05). Zobacz
kanoniczną [tabelę czynników scoringu](#jak-to-działa-persystowane-auto-combo) powyżej dla pełnego
zestawu `DEFAULT_WEIGHTS` — nadpisania per-pack (ship-fast/cost-saver/quality-first/
offline-friendly) są w tabeli „pełne tabele wag per pack”.

Sam tier **nie** wymusza Tier 1 na pierwszym miejscu — jeśli latencja Tier 1 jest zła lub
cost-vs-quality jest suboptymalne, wygrywa Tier 2. Aby wymusić kolejność tierów, użyj strategii
combo `priority` i ułóż providerów wg tieru.

Aby mocno faworyzować Tier 1 (subskrypcja), zwiększ wagę `tierPriority`:

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

Zobacz `docs/marketing/TIERS.md` dla definicji tierów i klasyfikacji providerów.

## Testy i pokrycie

### Deterministyczna macierz decyzji routingu (`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts` potwierdza **decyzję** routingu wszystkich 18
publicznych strategii end-to-end przez realny pipeline combo z mockowanym upstreamem.
Pokrycie obejmuje:

- Wszystkie 18 strategii `ROUTING_STRATEGY_VALUES` (ordered, weighted, cost, context, fusion, …).
- `quota-share` (wewnętrzne) end-to-end: fairness DRR + depriorytetyzacja saturacji przez
  realny szew `selectQuotaShareTarget` (`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`).
- Pokrycie universal-handoff `context-relay` dla każdej liczby targetów.

Ten suite leci w CI (job `test:integration`) z `--test-concurrency=1` i
`--test-force-exit`, więc jest deterministyczny i nie wymaga żywych poświadczeń.

### Gated live smoke (NIE w CI — realni providerzy)

| Komenda                                | Co robi                                                                         |
| :------------------------------------- | :------------------------------------------------------------------------------ |
| `npm run test:combo:live`              | In-process real routing z `RUN_COMBO_LIVE=1`; snapshot żywej DB OmniRoute       |
| `npm run test:combo:live:vps`          | Wywołania HTTP przeciw żywemu serwerowi OmniRoute (ustaw `COMBO_LIVE_BASE_URL`) |
| `npm run test:combo:live:vps:failover` | To samo, z celowymi scenariuszami failover                                      |

Te smoke testy ćwiczą realną ścieżkę wire (combo → provider → completion). Są
celowo wyłączone z CI, bo wymagają żywych poświadczeń i dostępu VPS.

---

## Pliki

| Plik                                                      | Cel                                                                    |
| :-------------------------------------------------------- | :--------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 9-czynnikowa funkcja scoringu, `DEFAULT_WEIGHTS`, pool norm            |
| `open-sse/services/autoCombo/taskFitness.ts`              | Lookup fitness model × task                                            |
| `open-sse/services/autoCombo/engine.ts`                   | Logika selekcji, bandit, budget cap                                    |
| `open-sse/services/autoCombo/selfHealing.ts`              | Wykluczenia, probe, tryb incydentu                                     |
| `open-sse/services/autoCombo/modePacks.ts`                | 4 profile wag (ship-fast, cost-saver, quality-first, offline-friendly) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | Parser prefiksu `auto/` + 6 wariantów                                  |
| `open-sse/services/autoCombo/virtualFactory.ts`           | Buduje in-memory `AutoComboConfig` z żywych połączeń                   |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | Hook testowy do mockowania rejestru providerów                         |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES` (18 strategii)                               |
| `src/sse/handlers/chat.ts`                                | Integracja: short-circuit prefiksu auto                                |
