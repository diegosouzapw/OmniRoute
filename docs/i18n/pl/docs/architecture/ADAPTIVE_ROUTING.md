# Adaptive Routing: Routing Events, Quality Feedback & Explainability (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

Ten dokument opisuje fundament adaptacyjnego routingu opartego na informacji zwrotnej, dodany do
OmniRoute. Jest on celowo niewielki: wprowadza typowany kanał wyników routingu,
sygnał jakości aktualizowany na bieżąco, który zasila istniejący mechanizm oceny auto-combo,
opcjonalny eksporter OpenTelemetry oraz endpoint zapewniający wyjaśnialność. **Nie**
zastępuje istniejącego stosu odporności (wyłącznika obwodu, okresu karencji połączenia,
blokady modelu, macierzy kondycji, autopilota) — lecz go uzupełnia.

## 1. Kontekst architektoniczny

OmniRoute jest płaszczyzną danych z **krytyczną ścieżką żądania** oraz **płaszczyzną
sterowania/inteligencji**. Ścieżka krytyczna musi pozostać szybka, oszczędna pod względem pamięci, asynchroniczna, odporna i
przewidywalna. Ewaluacja, ocena jakości, eksperymenty i analiza historyczna należą
do płaszczyzny sterowania.

```
Agent AI / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   płaszczyzna danych (szybka, synchroniczna, w pamięci)
│  routing / failover │
│  kondycja / reguły  │
│  cache / streaming  │
└──────────┬──────────┘
           │ RoutingEvent (wyślij i zapomnij, ~0.2µs)
           ▼
┌─────────────────────┐
│  Odbiorniki feedbacku│   płaszczyzna sterowania (asynchroniczna, best-effort)
│  śledzenie jakości  │
│  eksporter OTel     │
│  magazyn wyjaśnień  │
└──────────┬──────────┘
           ▼  wynik jakości
      mechanizm oceny auto-combo
```

### Co już istniało (sprawdzone, bez duplikowania)

| Koncepcja                                  | Istniejąca implementacja                                                                                               |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| Dostępność (czy można wysłać ruch?)        | Wyłącznik obwodu (CLOSED/DEGRADED/OPEN/HALF_OPEN, utrwalany w bazie danych), okres karencji połączenia, blokada modelu |
| Raportowanie kondycji                      | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                                                                |
| Ruch w tle                                 | `open-sse/services/combo/shadowRouting.ts`                                                                             |
| Reguły ochronne                            | `src/lib/guardrails/` (hooki przed/po)                                                                                 |
| Pamięć podręczna exact                     | `src/lib/semanticCache.ts` (oparta na sygnaturach)                                                                     |
| Ewaluatory / routing oparty na ewaluacji   | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                                                                   |
| Wyjaśnialność decyzji combo                | `open-sse/services/combo/decisionTrace.ts`                                                                             |
| Zdarzenia dashboardu w czasie rzeczywistym | `src/lib/events/eventBus.ts` (kanał powiadomień interfejsu użytkownika, payloady `unknown`, historia 100 wpisów)       |

Warstwa zdarzeń routingu **nie** jest ponowną implementacją `eventBus`: ta magistrala jest
kanałem powiadomień dashboardu w czasie rzeczywistym (typowane _nazwy zdarzeń_, nieprzejrzyste
payloady, konsumenci interfejsu użytkownika). `RoutingEvent` jest typowaną strukturą _wyniku_
(opóźnienie/tokeny/koszt/wynik/przyczyna zakończenia), wykorzystywaną przez odbiorniki
informacji zwrotnej płaszczyzny sterowania (mechanizm śledzenia jakości, eksporter OTel, magazyn wyjaśnień).

### Czego brakowało (dodane tutaj)

1. **Typowanego zdarzenia wyniku routingu i abstrakcji odbiornika** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace` jest ograniczony do combo i działa wyłącznie w pamięci;
   `comboMetrics` to liczniki skumulowane; `call_logs` to nieprzetworzone dane utrwalane asynchronicznie.
   Żaden z tych elementów nie jest typowanym, opartym na odbiornikach kanałem wyników, który może subskrybować mechanizm śledzenia jakości, eksporter OTel
   lub ewaluator w stylu Future-AGI.
2. **Sygnału jakości aktualizowanego na bieżąco** (EWMA) dla jakości danych wyjściowych — wcześniej mechanizm oceny
   aproksymował „jakość” wyłącznie za pomocą statycznego dopasowania do zadania i współczynników zaliczania opcjonalnych ewaluacji.
3. **Opcjonalnego eksportera OTel bez zależności**, korzystającego z konwencji semantycznych GenAI.
4. **Endpointu wyjaśnialności**, zwracającego rzeczywiste decyzje routingu i stan jakości.

## 2. Zdarzenia routingu (podstawa sprzężenia zwrotnego)

Pliki: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent` zawiera wyłącznie metadane routingu:

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // unia z listą dozwolonych wartości
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink` jest odpowiednikiem cechy w stylu `Send+Sync` w TypeScript:

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // musi działać w O(1), bez synchronicznych operacji I/O
}
```

Ścieżka krytyczna wywołuje `emitRoutingEvent(event)` raz dla każdego zakończonego żądania
(w wywołaniu zwrotnym kończącym strumieniowanie, w ścieżce powodzenia bez strumieniowania oraz
w ścieżce błędu nieprawidłowej odpowiedzi 200 w `handleChatCore`). Dystrybucja odbywa się
synchronicznie do wszystkich zarejestrowanych odbiorników, ale każdy odbiornik jedynie
dodaje element do kolejki lub aktualizuje stan w pamięci. **Brak synchronicznych zapisów
do bazy danych i brak sieciowych operacji I/O na ścieżce krytycznej.**

Domyślne odbiorniki:

- `MemoryRoutingEventStore` — ograniczony (500 elementów) bufor pierścieniowy,
  od najnowszych wpisów, używany przez punkt końcowy objaśnień.
- Konsument `QualityTracker` — aktualizuje estymację jakości EWMA.
- `OtlpHttpsEventSink` — opcjonalny, włączany tylko wtedy, gdy ustawiono
  `OMNIROUTE_OTEL_ENDPOINT` (lub `OTEL_EXPORTER_OTLP_ENDPOINT`).

### Zmierzony narzut (rzetelne porównanie)

`npm run bench:routing-events` na tej stacji roboczej (100 tys. iteracji; operacje
poniżej mikrosekundy zmierzone jako zagregowane µs/op, ponieważ percentyle
poszczególnych operacji są poniżej rozdzielczości czasomierza `performance.now()`):

| Scenariusz                                   | µs/op  | operacje/s |
| -------------------------------------------- | ------ | ---------- |
| wartość bazowa (tylko punktacja)             | ~0.045 | ~22 mln    |
| wartość bazowa + RoutingEvent (2 odbiorniki) | ~0.168 | ~5,9 mln   |
| wartość bazowa + zdarzenie + kolejka OTel    | ~0.163 | ~6,1 mln   |
| współbieżność (8 przeplatanych serii)        | ~0.18  | —          |

Różnica wynikająca z dystrybucji zdarzenia względem bazowej punktacji wynosi około
0,12 µs/żądanie; odbiornik OTel jedynie dodaje elementy do kolejki (operacja dodania
do bufora O(1)), nie powodując mierzalnego narzutu. Te wartości są zależne od maszyny
i mają charakter względny — nie stanowią gwarancji dla środowiska produkcyjnego.
Wartość „~0,2 µs” z wersji v1 była estymacją zagregowaną; ta metodologia oddziela
bazową punktację od kosztu dystrybucji zdarzeń.

## 3. Sygnał jakości (stan dostawcy sterowany sprzężeniem zwrotnym)

Pliki: `open-sse/services/routing/quality.ts`

Wersja v2 oddziela jakość **operacyjną** od **semantycznej**:

- **Operacyjna** — wyznaczana na podstawie ścieżki krytycznej routingu (HTTP 4xx/5xx,
  błędy połączeń, odpowiedzi 429, nieprawidłowe odpowiedzi, przerwania strumienia,
  `finish_reason=length`, udane odpowiedzi bez danych wyjściowych, EWMA opóźnienia/TTFT).
  Odpowiedź 200 NIE jest traktowana jako jakość semantyczna.
- **Semantyczna** — rzeczywista wartość wygenerowanych danych wyjściowych. Jest
  generowana WYŁĄCZNIE przez ewaluator za pośrednictwem `setSemanticQuality()`.
  Ma wartość `null`, dopóki ewaluator jej nie dostarczy, i nigdy nie przenika do
  wyniku operacyjnego.

Stan dla każdej pary (dostawca, model) (EWMA + ograniczone liczniki):

- `successEwma` — EWMA (α=0,2) pomyślności wyniku.
- `latencyEwma` / `ttftEwma` — EWMA opóźnienia (α=0,1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — czas, jaki upłynął od ostatniej obserwacji modelu.

### Uwzględnianie pewności i liczby próbek

`confidence = clamp01(samples / 50)`, a wynik zwracany do mechanizmu punktacji
jest przesuwany w kierunku neutralnego punktu środkowego:

```
score = 0.5 + confidence * (operational - 0.5)
```

Konsekwencje (potwierdzone testami):

- Dostawca bez historii (0 próbek) otrzymuje wynik **0,5** — nie jest
  niesprawiedliwie karany, ale nie może zdominować dostawcy z tysiącami
  solidnych obserwacji.
- Dostawca z 7 przypadkowymi sukcesami jest przesuwany w kierunku 0,5
  (nigdy nie dominuje dzięki optymistycznej inicjalizacji).
- Dostawca z co najmniej 50 próbkami zbiega do swojego rzeczywistego wyniku
  operacyjnego.
- Pogorszenie i odzyskiwanie jakości są stopniowe (EWMA), a pojedynczy,
  odosobniony błąd nie dyskwalifikuje sprawnego dostawcy.

`ProviderQuality` udostępnia `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`.

Dane te zasilają mechanizm punktacji auto-combo jako czynnik punktacji `quality`:

- `ScoringFactors.quality` / `ScoringWeights.quality` w
  `open-sse/services/autoCombo/scoring.ts`.
- `DEFAULT_WEIGHTS`: `health` 0,1905 → 0,1605, `quality` 0,03. Suma pozostaje równa 1,0.
- `buildAutoCandidates` ustawia `candidate.quality` na podstawie danych z trackera;
  kandydaci bez danych domyślnie otrzymują neutralne **0,5** (kandydat bez historii
  nie jest ani promowany, ani karany).

Zamknięta pętla:

```
RoutingEvent → QualityTracker → getQualityScore → czynnik jakości auto-combo
      ↑                                                    │
      └────── wynik żądania (handleChatCore) ←─────────────┘
```

### Twarde wykluczenie a miękka kara

Sygnał jakości stanowi wyłącznie **miękką preferencję adaptacyjną**. Twarde
wykluczenie pozostaje w istniejącym stosie odporności: stan OPEN wyłącznika
obwodu, wyczerpany limit, błąd uwierzytelniania, blokada modelu — wynik jakości
nie wpływa na żaden z tych mechanizmów. Dostawca, którego wynik jakości tymczasowo
spadnie, otrzymuje niższy priorytet, ale nigdy nie zostaje całkowicie wyłączony.

## 3b. Kanoniczny pomiar czasu strumienia (TTFT / ITL)

Pliki: `open-sse/utils/streamTiming.ts`

`createStreamTiming()` jest pojedynczym punktem instrumentacji ścieżki strumieniowej,
podłączonym do `createSSEStream` (`open-sse/utils/stream.ts`):

- `markByte()` — odebrano pierwszy fragment danych ze źródła nadrzędnego.
- `markForward()` — pierwszy fragment danych przekazano klientowi (używany do TTFT).
- `markInterrupted()` — przekroczenie limitu czasu, przerwanie lub błąd strumienia przed jego prawidłowym zakończeniem.
- `ttft()` = opóźnienie do pierwszego przekazanego fragmentu SSE. **NIE jest to TTFT na poziomie tokenów** —
  pojedynczy fragment SSE może zawierać zero, jeden lub wiele tokenów. Zostało to precyzyjnie udokumentowane.
- `avgItlMs()` = średni odstęp między fragmentami (przybliżona miara ITL oparta na opóźnieniu fragmentów).

TTFT/ITL oraz stan przerwania trafiają do `RoutingEvent` (`ttftMs`, `itlMs`) i są
eksportowane przez odbiornik OTel jako atrybuty spanów GenAI/OmniRoute.

## 4. Obserwowalność OpenTelemetry / GenAI

Pliki: `open-sse/services/routing/otel.ts`

- Eksporter OTLP/HTTP JSON bez zależności (używa globalnego `fetch`, bez
  SDK `@opentelemetry/*`).
- Spany są zgodne z konwencjami semantycznymi GenAI (`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`) oraz zawierają atrybuty
  routingu OmniRoute (wynik, stan, TTFT, ponowienia, użycie celu zapasowego).
- `record()` jedynie dodaje element do bufora o ograniczonym rozmiarze (O(1)); licznik czasu działający
  w tle asynchronicznie opróżnia bufor za pomocą `POST {endpoint}/v1/traces`. Przy przeciążeniu
  najstarsze zdarzenia są odrzucane (licznik `dropped`) — bez wywierania presji zwrotnej na
  płaszczyznę danych.
- **Wyłączone, jeśli nie skonfigurowano.** Musi być ustawiona zmienna `OMNIROUTE_OTEL_ENDPOINT` (lub
  `OTEL_EXPORTER_OTLP_ENDPOINT`); w przeciwnym razie odbiornik nie jest
  rejestrowany i żaden kod OTel nie jest uruchamiany.

## 5. Wyjaśnialność

- `GET /v1/explain/routing` zwraca ostatnie zdarzenia `RoutingEvent` (rzeczywiste
  decyzje, od najnowszych) oraz migawkę jakości dla poszczególnych dostawców/modeli.
- Uwierzytelnianie działa tak samo jak w `/v1/combos` (klucz API typu Bearer lub sesja panelu; dostęp anonimowy
  w lokalnych wdrożeniach dla jednego użytkownika z `REQUIRE_API_KEY=false`).
- Ślady wywołań na poziomie combo pozostają dostępne za pośrednictwem istniejącego
  `decisionTrace.ts` (nagłówek `X-OmniRoute-Combo-Trace`).
- Bezpieczeństwo: zdarzenia zawierają wyłącznie metadane routingu, nigdy prompty/treści żądań/dane uwierzytelniające.

## 6. Integracja z płaszczyzną ewaluacji (gotowość na Future AGI)

OmniRoute traktuje Future AGI (lub dowolny ewaluator) jako **potencjalny
backend inteligencji/ewaluacji, a nie zależność**. Punkty integracji:

- `RoutingEventSink` może asynchronicznie przekazywać zdarzenia do ewaluatora.
- `MemoryRoutingEventStore` wraz z migawką jakości udostępniają ewaluatorowi surowy
  strumień decyzji.
- Przyszły `Evaluator` (deterministyczny, lokalny sędzia, HTTP, WASM) będzie przetwarzać
  zdarzenia/ślady i zwracać `QualityScore`, który zasili tę samą ścieżkę
  `getQualityScore`/współczynnika jakości.
- Istniejący routing oparty na ewaluacji (`open-sse/services/evalRouting.ts`) już
  zmienia kolejność celów combo według współczynników zaliczeń `eval_runs`, gdy ta funkcja jest włączona.

Żadna ewaluacja nie jest uruchamiana synchronicznie na ścieżce żądania, a brama działa
w pełni także bez ewaluatora.

## 7. Końcowy przegląd architektury

1. **Co pozostaje na synchronicznej ścieżce krytycznej?** Routing/ocena, kontrole wstępne
   mechanizmów ochronnych, wyszukiwanie w pamięci podręcznej oraz pojedyncze wywołanie rozsyłające `emitRoutingEvent` (~0,12 µs ponad
   bazowy czas oceny) do odbiorników w pamięci.
2. **Co przeniesiono do przetwarzania asynchronicznego?** Eksport OTel (licznik czasu + fetch),
   utrwalanie `call_logs`/użycia, zapisy do semantycznej pamięci podręcznej; jakość jest przechowywana w pamięci
   i aktualizowana w czasie O(1) (asynchroniczność nie jest potrzebna).
3. **Jak wynik routingu staje się informacją zwrotną?** `handleChatCore` emituje
   `RoutingEvent` → `QualityTracker` aktualizuje stan EWMA → `getQualityScore`
   zasila współczynnik `quality` automatycznego combo.
4. **Jak jakość wpływa na przyszły routing?** Niska ocena jakości zmniejsza
   ważony wynik danego dostawcy/modelu w `scoreAutoTargets`, dzięki czemu zdegradowane
   modele są stopniowo wybierane rzadziej i odzyskują preferencję wraz z poprawą ich EWMA.
5. **Jak Future AGI może zostać zintegrowane bez stawania się zależnością?** Za pośrednictwem
   interfejsu `RoutingEventSink` / przyszłego adaptera `Evaluator` — bez zakodowanej na stałe
   zależności.
6. **Co się dzieje, gdy ewaluator jest niedostępny?** Routing pozostaje bez zmian;
   dla modeli bez zaobserwowanego sygnału jakość przyjmuje neutralną wartość (1.0).
7. **Co się dzieje, gdy telemetria jest niedostępna?** Odbiornik OTel po prostu nie jest
   rejestrowany; reszta warstwy routingu działa bez zmian.
8. **Co się dzieje przy przeciążeniu?** Bufor OTel odrzuca najstarsze zdarzenia; rozmiary danych jakości
   i bufora pierścieniowego są ograniczone konstrukcyjnie; nie występuje presja zwrotna.
9. **Jak stan dostawcy odzyskuje sprawność po degradacji?** EWMA ponownie osiąga zbieżność w miarę
   gromadzenia pomyślnych wyników; okres rozgrzewania utrzymuje neutralny stan nowych modeli; wyłącznik obwodu
   niezależnie przywraca działanie za pomocą prób w stanie HALF_OPEN.
10. **Których proponowanych funkcji celowo NIE zaimplementowano i dlaczego?**
    - Ruch lustrzany / eksperymenty — już zaimplementowane
      (`combo/shadowRouting.ts`); nie tworzono ich ponownie.
    - Mechanizmy ochronne — już zaimplementowane (`src/lib/guardrails/`); nie powielano ich.
    - Semantyczna pamięć podręczna — już zaimplementowana (`src/lib/semanticCache.ts`); nie
      powielano jej.
    - Pełna platforma do zarządzania eksperymentami, narzędzia do zbiorów danych, platforma optymalizacji
      promptów, wektorowa baza danych lub obowiązkowa zewnętrzna infrastruktura OTel — poza
      zakresem lekkiej płaszczyzny danych.
    - Struktura `RoutingEvent` w języku Rust — płaszczyzna danych jest napisana w TypeScript; typ TS
      stanowi dostosowany odpowiednik.

## 8. Dokumentacja konfiguracji

| Zmienna                       | Wartość domyślna | Działanie                                                                      |
| ----------------------------- | ---------------- | ------------------------------------------------------------------------------ |
| `OMNIROUTE_OTEL_ENDPOINT`     | nieustawiona     | Po ustawieniu włącza eksporter śladów OTLP/HTTP (np. `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | nieustawiona     | Zapasowy alias punktu końcowego OTLP.                                          |
| `OTEL_SERVICE_NAME`           | `omniroute`      | Atrybut zasobu `service.name`.                                                 |

## 9. Testy

- `tests/unit/routing-events.test.ts` — normalizacja zdarzeń, klasyfikacja
  statusów, ograniczony bufor cykliczny, rozsyłanie do ujść i ich izolacja.
- `tests/unit/routing-quality.test.ts` — rozgrzewanie EWMA, odzyskiwanie po
  niepowodzeniu/sukcesie, kary za anomalie, obsługa przejściowego błędu 429,
  migawka, resetowanie.
- `tests/unit/routing-scoring-quality.test.ts` — spójność wag, neutralna
  wartość domyślna, ranking według współczynnika jakości.
- `tests/unit/routing-otel.test.ts` — warunkowe włączanie, dane spanów GenAI,
  asynchroniczne opróżnianie, odrzucanie przy przeciążeniu.
- `tests/unit/routing-events-concurrency.test.ts` — tysiące zdarzeń, ograniczony
  rozmiar bufora cyklicznego, izolacja ujść zgłaszających wyjątki, przeplatane
  asynchroniczne serie, resetowanie podczas wstawiania.
- `tests/unit/routing-adaptive-e2e.test.ts` — deterministyczna pętla kompleksowa
  za pośrednictwem rzeczywistego mechanizmu oceny `scoreAutoTargets`: zdrowy →
  degradacja → odzyskanie → chwilowe zakłócenie, a także scenariusze zimnego
  startu i pomyślnego zimnego dostawcy.
- `tests/unit/stream-timing.test.ts` — TTFT (pierwszy przekazany fragment), ITL,
  pierwszy bajt a pierwsze przekazanie, przerwanie, bezpieczna obsługa
  nieprawidłowych/pustych fragmentów.

## 10. Stan wcześniej istniejących problemów (faza 18)

| Problem                                                         | Stan                          | Uwagi                                                                                                                                                                                                                                                                             |
| --------------------------------------------------------------- | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Niezgodność eksportu `omniglyph`                                | **NAPRAWIONO (środowiskowe)** | `node_modules` nie był zsynchronizowany z `package-lock.json` (zainstalowana wersja 1.3.1 zamiast zablokowanej 1.4.0). Uruchomienie `npm install omniglyph@1.4.0` przywróciło zablokowaną wersję; liczba błędów typów spadła do 0. Manifesty pozostały bez zmian.                 |
| Nieaktualne testy `getKnownContextOverflow`                     | **ZNANY — nie naprawiono**    | `combo-context-overflow-compression-probe.test.ts` importuje funkcję, która nie istnieje już w `open-sse/services/combo.ts` (odnoszą się do niej jedynie komentarze). Naprawa wymaga ponownej implementacji lub przepisania tych testów — to niezwiązana zmiana architektoniczna. |
| Izolacja bazy danych w `combo-runtime-unit-concurrency.test.ts` | **ZNANY — nie naprawiono**    | Asercja izolacji SQLite w środowisku testowym kończy się niepowodzeniem przy bezpośrednim uruchomieniu; identycznie kończy się niepowodzeniem w gałęzi bazowej.                                                                                                                   |
| Rozbieżność `llm.txt` w i18n                                    | **ZNANY — nie naprawiono**    | Pliki `docs/i18n/*/llm.txt` różnią się od pliku głównego; problem istniał wcześniej i blokuje bramkę synchronizacji dokumentacji przed zatwierdzeniem zmian.                                                                                                                      |

Problemy środowiskowe i problemy w kodzie są wyraźnie rozróżniane; żadne
niepowiązane niepowodzenia nie są ukrywane za zmienionymi filtrami testów.
