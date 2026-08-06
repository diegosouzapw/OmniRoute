---
title: "Rankingi darmowych providerów (Arena ELO)"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Rankingi darmowych providerów (Arena ELO)

> **TL;DR**: OmniRoute rankinguje swoje **darmowe** providery według jakości modeli, używając **wyników ELO Arena AI
> (w stylu LMArena)**. Otwórz stronę **Free Provider Rankings** w
> dashboardzie, aby zobaczyć, które darmowe providery oferują najsilniejsze modele do Twojego zadania —
> ogólnie albo z filtrem kategorii (coding, review, documentation, debugging).

---

## Czym to jest

OmniRoute agreguje 329 wpisów katalogu providerów, z których wiele udostępnia **darmowy tier** (no-auth,
darmowy OAuth albo darmowy klucz API — zobacz
[Przewodnik Free Tiers](../getting-started/FREE-TIERS-GUIDE.md) oraz pełny
[katalog Free Tiers](../reference/FREE_TIERS.md)). Haczyk: darmowi providerzy różnią się
jakością modeli diametralnie. Provider no-auth z modelem frontierowym jest znacznie bardziej użyteczny
niż taki z małym, legacy modelem.

**Free Provider Rankings** odpowiada na pytanie „**który darmowy provider daje mi najlepszy model?**”,
łącząc katalog każdego darmowego providera z **crowd-sourcingowymi ocenami jakości** z
**rankingu Arena AI** (ELO oparte na preferencjach ludzi — ta sama idea co arena chatbotów
LMArena). Providery są następnie rankingowane według siły ich **najlepszego darmowego modelu**.

Ranking jest wyliczany z trzech rzeczywistych źródeł:

1. Listy darmowych providerów — `NOAUTH_PROVIDERS` oraz wpisy `OAUTH_PROVIDERS` /
   `APIKEY_PROVIDERS` z flagą `hasFree`
   (`src/shared/constants/providers.ts`).
2. Katalog modeli każdego providera z rejestru providerów
   (`open-sse/config/providerRegistry.ts`).
3. Wyniki task-fit pochodzące z ELO, przechowywane w tabeli DB `model_intelligence` przez
   silnik synchronizacji Arena ELO (`src/lib/arenaEloSync.ts`).

Logika join żyje w `src/lib/freeProviderRankings.ts`.

---

## Jak uzyskać dostęp

### Strona dashboardu

Otwórz dashboard i przejdź do **Costs → Free Provider Rankings** albo wejdź bezpośrednio na:

```
/dashboard/free-provider-rankings
```

Strona (`src/app/(dashboard)/dashboard/free-provider-rankings/page.tsx`) pokazuje:

- **Podium top-3** (🥇 🥈 🥉) najlepiej rankingowanych darmowych providerów.
- Pełną **tabelę rankingu** z kolumnami: **Rank**, **Provider**, **Top Model**,
  **Score**, **Avg Score**, **Models**, **Type**.
- **Przyciski filtra kategorii**: _All Categories_, _Default_, _Coding_, _Review_,
  _Documentation_, _Debugging_.

Odznaka **Type** każdego providera mówi, w jaki sposób jest darmowy:

| Odznaka  | Znaczenie                                            |
| -------- | ---------------------------------------------------- |
| `NOAUTH` | Zawsze darmowy, bez potrzeby poświadczeń             |
| `OAUTH`  | Provider OAuth z darmowym tierem (`hasFree`)         |
| `APIKEY` | Provider z kluczem API i darmowym tierem (`hasFree`) |

Wyniki są pokazywane jako czytelne etykiety (np. _Elite_, _Excellent_, _Very Good_,
_Good_, _Average_), a nie surowe liczby, bo wartość bazowa to względna
jakość w rankingu, nie procent.

### Endpoint API

Strona opiera się na publicznym endpointcie odczytu
(`src/app/api/free-provider-rankings/route.ts`):

```
GET /api/free-provider-rankings
GET /api/free-provider-rankings?category=coding
GET /api/free-provider-rankings?category=coding&limit=20
```

Parametry zapytania (walidowane Zodem):

| Parametr   | Typ    | Domyślnie | Uwagi                                                                                                    |
| ---------- | ------ | --------- | -------------------------------------------------------------------------------------------------------- |
| `category` | string | (brak)    | Jedna z: `default`, `coding`, `review`, `documentation`, `debugging`. Pomiń, aby dostać ranking łączony. |
| `limit`    | number | `50`      | Ograniczony do zakresu `1–100`.                                                                          |

Kształt odpowiedzi:

```json
{
  "rankings": [
    {
      "id": "<provider-id>",
      "name": "<provider name>",
      "icon": "<icon>",
      "color": "<hex color>",
      "textIcon": "<short label>",
      "category": "noauth | oauth | apikey",
      "topModel": {
        "modelId": "<registry model id>",
        "modelName": "<model display name>",
        "score": 0.0,
        "eloRaw": 0,
        "confidence": "high | medium | low",
        "category": "<task category>"
      },
      "averageScore": 0.0,
      "modelCount": 0
    }
  ]
}
```

`eloRaw` to oryginalna wartość Arena ELO; `score` to znormalizowana wartość task-fit
(patrz niżej). Providery bez ocenionych modeli są pomijane w odpowiedzi.

---

## Jak działają wyniki

### Źródło: ranking Arena AI

Silnik synchronizacji Arena ELO (`src/lib/arenaEloSync.ts`) pobiera dwa rankingi — `text`
oraz `code` — z API rankingu Arena AI
(`https://api.wulong.dev/arena-ai-leaderboards/v1/leaderboard`). Każdy wpis rankingu
niesie nazwę modelu, vendora, ELO `score`, przedział ufności oraz liczbę głosów.

Kategorie rankingu mapują się na kategorie zadań OmniRoute:

| Ranking Arena | Kategorie zadań OmniRoute                         |
| ------------- | ------------------------------------------------- |
| `text`        | `default`, `review`, `documentation`, `debugging` |
| `code`        | `coding`                                          |

### Normalizacja (wynik task-fit)

Surowe wyniki ELO są normalizowane per ranking do **wartości task-fit w `[0.4, 0.98]`**:

```
taskFit = 0.4 + 0.58 * ((elo - minElo) / (maxElo - minElo))
```

Wynik nigdy nie osiąga `0` ani `1`, zostawiając zapas na nadpisania użytkownika. To jest
pole `score`, które widzisz w odpowiedzi API oraz etykieta na dashboardzie.

### Confidence (pewność)

Każdy wpis dostaje poziom confidence na podstawie liczby głosów Arena:

| Pewność  | Głosy   |
| -------- | ------- |
| `high`   | ≥ 5,000 |
| `medium` | ≥ 1,000 |
| `low`    | < 1,000 |

### Przechowywanie i świeżość

Znormalizowane wpisy trafiają do tabeli DB `model_intelligence` z
`source = "arena_elo"` (`src/lib/db/modelIntelligence.ts`). Wpisy **wygasają po
7 dniach**, więc provider, który przestanie się synchronizować, w końcu wypada zamiast serwować
przestarzałe dane.

Synchronizacja jest **domyślnie włączona**:

- Uruchamia się raz przy starcie serwera, a potem na okresowym timerze
  (`src/lib/arenaEloSync.ts`, podpięte z `src/server-init.ts`).
- Jest **nieblokująca i nigdy nie jest fatalna** — jeśli fetch upstreamu się nie uda, OmniRoute dalej
  działa, a rankingi po prostu pokazują ostatnie dobre dane (albo stan pusty).

Sterują nią dwie zmienne środowiskowe (opisane w
[`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md)):

| Zmienna                   | Domyślnie     | Cel                                                       |
| ------------------------- | ------------- | --------------------------------------------------------- |
| `ARENA_ELO_SYNC_ENABLED`  | `true`        | Ustaw na `false`, aby wyłączyć wychodzącą synchronizację. |
| `ARENA_ELO_SYNC_INTERVAL` | `86400` (24h) | Interwał synchronizacji w sekundach.                      |

### Ręczna synchronizacja / status / czyszczenie

Dla operatorów uwierzytelniony endpoint managementu udostępnia ręczną kontrolę
(`src/app/api/intelligence/sync/route.ts` — wymaga management auth):

```
GET    /api/intelligence/sync          # current sync status (enabled, lastSync, nextSync, intervalMs)
POST   /api/intelligence/sync          # trigger a manual sync; body: { "dryRun": true } to preview without writing
DELETE /api/intelligence/sync          # clear all synced arena_elo intelligence entries
```

Jeśli strona rankingów jest pusta, ręczny `POST /api/intelligence/sync` (albo po prostu
restart serwera) uzupełnia ją ponownie.

### Dopasowywanie modeli do rankingu

ID modeli w rejestrze i nazwy modeli Arena nie zawsze pasują dokładnie. Ranking używa
elastycznego dopasowania (`findMatchingIntelligence` w `src/lib/freeProviderRankings.ts`):

1. Dokładne dopasowanie znormalizowanego ID modelu.
2. Dopasowanie po usunięciu końcówki wersji (np. `kimi-k2.6` → `kimi-k2`).
3. Dopasowanie prefiksu (nazwa modelu z rankingu jest prefiksem ID w rejestrze).

Po stronie sync znane prefiksy vendorów (`anthropic/`, `openai/`, `google/`, …) są
usuwane, a mała mapa aliasów rozwija kanoniczne nazwy do wariantów używanych wewnętrznie
przez OmniRoute, dzięki czemu modele da się znaleźć pod dowolną nazwą.

### Jak rankingowany jest provider

Dla każdego darmowego providera silnik ocenia każdy model w jego katalogu, a następnie:

- **Top Model** = model providera z najwyższym wynikiem.
- **Avg Score** = średni wynik ze wszystkich ocenionych modeli tego providera.
- **Models** = ile modeli providera miało wynik Arena.

Providery są sortowane najpierw według **wyniku top-model**, potem według średniego wyniku. To premiuje
providera, który oferuje przynajmniej jeden silny darmowy model.

---

## Jak używać tego do wyboru darmowych providerów

1. **Wybierz właściwą kategorię.** Użyj filtra **Coding** dla obciążeń agentic/code albo
   zostaw **All Categories** / **Default** dla ogólnego czatu. Ten sam provider może
   rankingować się inaczej w różnych kategoriach, bo jego top model różni się per ranking.
2. **Na start bierz podium.** Jeśli chcesz podłączyć tylko jednego lub dwóch darmowych
   providerów, zacznij od najwyżej rankingowanych w Twojej kategorii.
3. **Sprawdź odznakę Type.** Providery `NOAUTH` łączą się najszybciej (bez
   poświadczeń). Darmowe tiery `OAUTH` / `APIKEY` wymagają szybkiej rejestracji, ale często udostępniają
   silniejsze modele. Kroki połączenia: [Przewodnik Free Tiers](../getting-started/FREE-TIERS-GUIDE.md).
4. **Podłącz kilku i pozwól Auto-Combo decydować.** Te same dane Arena ELO, które napędzają
   tę stronę, zasilają też **czynnik task-fitness** silnika scoringu Auto-Combo
   (`open-sse/services/autoCombo/taskFitness.ts`, kolejność resolucji
   `user_override → arena_elo → models_dev_tier → static table`). Po podłączeniu
   top darmowych providerów routing z `model: "auto"` (np. `auto/coding`) będzie
   automatycznie preferował wyższej jakości darmowe modele per żądanie. Zobacz
   [Auto-Combo](../routing/AUTO-COMBO.md) po pełny scoring 13-czynnikowy.

---

## Powiązana dokumentacja

- [Przewodnik Free Tiers](../getting-started/FREE-TIERS-GUIDE.md) — jak podłączyć darmowych
  providerów, bez karty kredytowej.
- [Katalog Free Tiers](../reference/FREE_TIERS.md) — pełny katalog darmowych providerów
  i ich limitów.
- [Auto-Combo](../routing/AUTO-COMBO.md) — 13-czynnikowy silnik routingu, który konsumuje te
  same dane task-fitness Arena ELO.
- [Zmienne środowiskowe](../reference/ENVIRONMENT.md) — referencja `ARENA_ELO_SYNC_ENABLED` /
  `ARENA_ELO_SYNC_INTERVAL`.
