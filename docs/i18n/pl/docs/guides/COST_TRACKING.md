---
title: "Śledzenie kosztów i wydatków"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Śledzenie kosztów i wydatków

Jak OmniRoute szacuje, rejestruje i raportuje koszt każdego żądania — oraz dlaczego
liczba na dashboardzie to **tracker oszczędności**, a nie rachunek.

Zobacz też: [Przewodnik użytkownika](./USER_GUIDE.md) · [Galeria funkcji](./FEATURES.md)

---

## Czym jest (a czym nie jest)

OmniRoute przypisuje koszt w USD do każdego completion, mnożąc liczbę tokenów przez
stawki cenowe modelu. Te liczby zasilają dashboard **Costs**, CLI
`omniroute cost` / `omniroute usage`, eksporty CSV/JSON oraz budżety per klucz API.

> **„Koszt” na dashboardzie to tracker oszczędności, a nie rachunek.** OmniRoute nigdy
> Cię nie obciąża — kieruje żądania do providerów, których już podłączyłeś (własne
> subskrypcje, darmowe tiery i klucze API). „Łączny koszt $290” narosły wyłącznie na
> darmowych modelach oznacza mniej więcej **$290, których _nie_ zapłaciłeś** płatnemu
> API. Ta wartość to _szacunek_ tego, ile ten sam ruch kosztowałby według standardowych
> cenników — dzięki temu widać, gdzie koncentruje się użycie i ile oszczędzasz, kierując
> ruch do tańszych/darmowych providerów.

To ujęcie jest wprost w projekcie [README](../../README.md) („the dashboard
'cost' is a savings tracker, not a bill”).

Ponieważ liczba jest szacunkiem:

- Zależy od tabeli cen OmniRoute dla każdego modelu. Model bez wpisu cenowego
  wnosi koszt `0` (w explorerze widać go jako wiersz „Legacy / Free”).
- Ruch z free-tier i subskrypcji nadal narasta jako _szacowany_ koszt — to kwota,
  którą oszczędzasz, a nie kwota do zapłaty.

---

## Jak szacowane są koszty

### Źródło cen

Koszty pochodzą z tabeli cen rozwiązywanej w tej kolejności pierwszeństwa
([`src/lib/pricingSync.ts`](../../src/lib/pricingSync.ts)):

1. **Nadpisania użytkownika** — ceny ustawione w dashboardzie / przez `PATCH /api/pricing`.
2. **Zsynchronizowane ceny zewnętrzne** — pobierane z publicznego pliku LiteLLM
   `model_prices_and_context_window.json`, gdy sync jest włączony (przechowywane w osobnej
   przestrzeni nazw `pricing_synced`, więc nigdy nie nadpisują Twoich override’ów).
3. **Zakodowane na stałe domyślne** — dostarczane z OmniRoute.

Zewnętrzny sync cen jest **opt-in**, domyślnie wyłączony. Istotne zmienne środowiskowe
(zob. [`.env.example`](../../.env.example)):

| Env var                 | Default   | Cel                                                          |
| ----------------------- | --------- | ------------------------------------------------------------ |
| `PRICING_SYNC_ENABLED`  | `false`   | Włącza w tle sync cen LiteLLM przy starcie.                  |
| `PRICING_SYNC_INTERVAL` | `86400`   | Interwał sync w **sekundach** (domyślnie codziennie).        |
| `PRICING_SYNC_SOURCES`  | `litellm` | Lista źródeł rozdzielona przecinkami (dziś tylko `litellm`). |

### Formuła kosztu

Koszt jest liczony per request z liczby tokenów i stawek za milion tokenów w
[`src/lib/usage/costCalculator.ts`](../../src/lib/usage/costCalculator.ts)
(`computeCostFromPricing` / `calculateCost`):

- **Tokeny wejściowe** (minus odczyty cache i tokeny tworzenia cache) × stawka `input`.
- **Tokeny odczytu cache** × stawka `cached` (fallback do stawki input).
- **Tokeny tworzenia cache** × stawka `cache_creation` (fallback do stawki input).
- **Tokeny wyjściowe** × stawka `output`.
- **Tokeny reasoning** × stawka `reasoning` (fallback do stawki output).

Wszystkie stawki są interpretowane jako USD za 1 000 000 tokenów. Tier usługowy Codex
„fast”/„priority” lub „flex” stosuje mnożnik kosztu (`getCodexFastCostMultiplier`) —
np. flex jest rozliczany z 50% zniżką na tokeny, pokazywaną na dashboardzie jako
**flex savings**.

Nazwy modeli są najpierw normalizowane (prefiksy ścieżek providera, takie jak `openai/`
lub `accounts/fireworks/models/`, są usuwane), dzięki czemu historyczne wiersze nadal
pasują do ceny.

### Jak rejestrowane są wydatki

- Koszt per request jest liczony po odpowiedzi i zapisywany fire-and-forget, więc nie
  dodaje opóźnienia po stronie klienta. Zużycie shared-quota jest planowane na następnym
  ticku event-loop przez [`src/lib/quota/spendRecorder.ts`](../../src/lib/quota/spendRecorder.ts).
- Wydatki kluczy API są buforowane i flushowane partiami przez
  [`SpendBatchWriter`](../../src/lib/spend/batchWriter.ts) (domyślny interwał flush 60 s,
  bufor 1000 wpisów). Konfigurowalne przez:

  | Env var                             | Default | Cel                                             |
  | ----------------------------------- | ------- | ----------------------------------------------- |
  | `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS` | `60000` | Interwał flush w milisekundach.                 |
  | `OMNIROUTE_SPEND_MAX_BUFFER_SIZE`   | `1000`  | Maks. liczba buforowanych wpisów przed flushem. |

Liczby kosztów na dashboardzie **nie** pochodzą z zapisanej kwoty dolarowej per wiersz —
są przeliczane w locie z liczby tokenów i bieżącej tabeli cen przy każdym wywołaniu
endpointu analytics. Dzięki temu poprawa błędnej ceny (i ponowny sync) aktualizuje
historyczne szacunki kosztów z mocą wsteczną.

---

## Dashboard: strona Costs

Strona **Costs** jest pod `/dashboard/costs`
(`src/app/(dashboard)/dashboard/costs/`).
Główny widok to zakładka **Cost Overview**
(`src/app/(dashboard)/dashboard/costs/CostOverviewTab.tsx`),
która ładuje wszystko z `GET /api/usage/analytics`.

Co pokazuje:

- **Kafelki wydatków** — szacowany wydatek za _Today (1d)_, _7d_, _30d_ oraz wybrany
  zakres. Selektor zakresu: `7d`, `30d`, `90d`, `all`.
- **Metryki nagłówkowe** — żądania w oknie, aktywni providerzy, aktywne modele, średni
  koszt na żądanie.
- **Cost Explorer** — sortowalna/filtrowalna tabela grupowana po **provider**, **model**,
  **API key**, **account** lub **service tier**, z kosztem, żądaniami, tokenami, średnim
  kosztem/żądanie oraz udziałem w całości w %.
- **Zużycie tokenów** — tokeny total / input / output oraz stosunek input:output.
- **Efektywność routingu** — liczba fallbacków, wskaźnik fallback oraz pokrycie
  żądanego modelu.
- **Prognoza miesięczna** — projekcja wydatku na koniec miesiąca ze średniej dziennej.
- **Porównanie okresów** — zmiana % między pierwszą a drugą połową okna.
- **Wykresy** — dzienny trend kosztów, udział providerów (pie), top providerzy, top
  modele, koszt wg klucza API, koszt wg konta, tygodniowy wzorzec użycia oraz heatmapa
  aktywności.
- **Eksport** — pobranie bieżącego okna jako **CSV** lub **JSON** (przyciski pojawiają
  się, gdy są niezerowe dane kosztowe).

Gdy nie ma wycenionego ruchu, wiersze renderują etykietę „Legacy / Free” zamiast `$0`,
zgodnie z modelem trackera oszczędności.

### Powiązane podstrony Costs

Obszar Costs hostuje też (wszystko pod `/dashboard/costs/`):

- **Pricing** (`/dashboard/costs/pricing`) — podgląd i nadpisywanie cen per model
  (renderuje wspólną zakładkę Pricing).
- **Budget** (`/dashboard/costs/budget`) — limity wydatków per scope (renderuje wspólną
  zakładkę Budget).
- **Quota Share** (`/dashboard/costs/quota-share`) — pule shared-quota i widoki
  burn-rate.

---

## Endpointy API

Wszystkie wymagają management auth (loopback/JWT, przez `requireManagementAuth`), o ile
nie zaznaczono inaczej.

### Analityka użycia i kosztów

| Method | Endpoint                 | Cel                                                                                                                                                             |
| ------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/analytics`   | Pełna analityka kosztów/użycia: summary, dzienny trend, wg provider/model/API key/account/tier. Query: `range`, `startDate`, `endDate`, `apiKeyIds`, `presets`. |
| `GET`  | `/api/usage/utilization` | Wykorzystanie quota per provider w czasie. Query: `range` (`1h`/`24h`/`7d`/`30d`), `provider`.                                                                  |
| `GET`  | `/api/usage/history`     | Surowe wiersze historii użycia.                                                                                                                                 |
| `GET`  | `/api/usage/call-logs`   | Logi wywołań per request (model, tokeny, koszt, latency, status).                                                                                               |
| `GET`  | `/api/usage/quota`       | Status quota providera.                                                                                                                                         |
| `GET`  | `/api/usage/proxy-logs`  | Logi żądań proxy.                                                                                                                                               |

### Budżety

| Method | Endpoint                 | Cel                                                                                                  |
| ------ | ------------------------ | ---------------------------------------------------------------------------------------------------- |
| `GET`  | `/api/usage/budget`      | Podsumowanie kosztów + sprawdzenie budżetu dla jednego klucza API (wymagany query param `apiKeyId`). |
| `POST` | `/api/usage/budget`      | Ustawia limity USD dzienny/tygodniowy/miesięczny + próg ostrzeżenia dla klucza API.                  |
| `GET`  | `/api/usage/budget/bulk` | Zbiorcze podsumowania budżetów dla kluczy API.                                                       |

> API budżetu jest scoped per **API key** (`apiKeyId`). Limity zwracane przez
> `GET /api/usage/budget` obejmują `dailyLimitUsd`, `weeklyLimitUsd`, `monthlyLimitUsd`,
> `warningThreshold` oraz bieżące sumy (`totalCostToday`, `totalCostMonth`, …).

### Pricing

| Method   | Endpoint                | Cel                                                                                                |
| -------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/pricing`          | Bieżące scalone ceny (user + synced + defaults). `?includeSources=1`, by zobaczyć źródło per wpis. |
| `PATCH`  | `/api/pricing`          | Nadpisanie cen dla `{ provider: { model: { input, output, cached, … } } }`.                        |
| `DELETE` | `/api/pricing`          | Reset cen do domyślnych (opcjonalnie scoped przez `?provider=&model=`).                            |
| `GET`    | `/api/pricing/defaults` | Pokazuje domyślne stawki fallback per-1M.                                                          |
| `GET`    | `/api/pricing/models`   | Ceny kluczowane po modelu.                                                                         |
| `POST`   | `/api/pricing/sync`     | Ręczny sync ze źródeł zewnętrznych (LiteLLM).                                                      |
| `GET`    | `/api/pricing/sync`     | Bieżący status sync.                                                                               |
| `DELETE` | `/api/pricing/sync`     | Czyści wszystkie zsynchronizowane dane cenowe.                                                     |

### Inne endpointy związane z kosztami

| Method | Endpoint                      | Cel                                                                          |
| ------ | ----------------------------- | ---------------------------------------------------------------------------- |
| `GET`  | `/api/free-tier/summary`      | Sumy tokenów darmowych modeli, used-this-month oraz pozostały darmowy limit. |
| `GET`  | `/api/quota/pools/[id]/usage` | Użycie dla puli shared-quota.                                                |

---

## CLI

CLI OmniRoute udostępnia komendy cost, usage i pricing (zarejestrowane w
[`bin/cli/commands/registry.mjs`](../../bin/cli/commands/registry.mjs)).

### `omniroute cost`

Raport kosztów agregowany z `/api/usage/analytics`.

```bash
omniroute cost                          # last 30d, grouped by provider
omniroute cost --period 7d              # last 7 days
omniroute cost --group-by model         # group by provider | model | combo | api-key | day
omniroute cost --since 2026-06-01 --until 2026-06-13
omniroute cost --api-key <key> --limit 50
```

Kolumny: group, requests, tokens in/out, cost (USD) oraz % of total. Na końcu drukowana
jest linia grand total (tłumiona przez `--quiet` lub `--output json`).

### `omniroute usage`

```bash
omniroute usage analytics --period 30d [--provider <id>]   # per-provider cost summary
omniroute usage logs [--limit 100] [--follow] [--api-key <k>] [--search <q>]
omniroute usage quota [--provider <id>] [--check]
omniroute usage utilization [--api-key <k>]
omniroute usage history [--limit 100]
omniroute usage proxy-logs [--limit 100]

# Budgets
omniroute usage budget list
omniroute usage budget get [scope]
omniroute usage budget set <amount> [--scope global] [--period monthly]
omniroute usage budget reset [scope]
```

### `omniroute pricing`

```bash
omniroute pricing list [--provider <p>] [--model <m>] [--limit 200]
omniroute pricing get <model>
omniroute pricing sync [--provider <p>] [--force]   # POST /api/pricing/sync
omniroute pricing diff [--model <m>]
omniroute pricing defaults show
omniroute pricing defaults set [--input <p>] [--output <p>] [--cache-read <p>] [--cache-write <p>]
```

> `pricing defaults show` czyta `GET /api/pricing/defaults`. Aby edytować ceny
> poszczególnych modeli, użyj strony **Pricing** w dashboardzie lub `PATCH /api/pricing`.

---

## Rozwiązywanie problemów

- **Wszystkie koszty pokazują $0 / „Legacy / Free”.** Używane modele nie mają wpisu
  cenowego. Włącz zewnętrzny sync (`PRICING_SYNC_ENABLED=true`) i uruchom
  `omniroute pricing sync`, albo ustaw ceny ręcznie na stronie Pricing / przez
  `PATCH /api/pricing`.
- **Historyczny model ma złą cenę.** Popraw cenę (override lub re-sync) — koszt jest
  przeliczany z liczby tokenów przy każdym odczycie analytics, więc szacunki aktualizują
  się z mocą wsteczną.
- **Wydatki opóźniają się względem czasu rzeczywistego.** Spend per klucz jest batchowany;
  obniż `OMNIROUTE_SPEND_FLUSH_INTERVAL_MS`, jeśli potrzebujesz świeższych liczb.

---

Gdzie to pasuje w szerszym dashboardzie, zobacz [Przewodnik użytkownika](./USER_GUIDE.md) i
[Galerię funkcji](./FEATURES.md).
