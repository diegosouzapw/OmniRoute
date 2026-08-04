---
title: "Search Tools Studio"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Search Tools Studio

> **Funkcja:** Search Tools Studio — ujednolicony workspace narzędzi webowych dla `/dashboard/search-tools`.
> **Plany:** `18-search-tools-studio-redesign.plan.md` + `_orchestration/master-plan-group-C.md`
> **Status:** Wydane w v3.8.6

---

## Przegląd

Search Tools Studio przekształca `/dashboard/search-tools` z podstawowego placu zabaw wyszukiwania w
trzyzakładkowe Studio łączące wyszukiwanie w sieci, scrapowanie stron oraz porównanie providerów
obok siebie.

```
┌ Search Tools ──────────────────────────────────────────────────────────┐
│ [🔍 Search] [📄 Scrape] [⚖ Compare]             142ms · $0.001  </>    │
│ ⓘ [Modalities guide]                                                    │
├──────────────────────────────────────────┬─────────────────────────────┤
│  {active tab content}                    │ ─ Config                    │
│                                          │ Provider [auto ∨]           │
│                                          │   🟢 Serper  $0.001         │
│                                          │   🟢 Tavily  $0.008         │
│                                          │   🔥 Firecrawl (fetch)      │
│                                          │ Type   [web | news]         │
│                                          │ Full page [ ] (scrape)      │
│                                          │ Format [md|text|html]       │
│                                          │ Rerank model [∨]            │
└──────────────────────────────────────────┴─────────────────────────────┘
```

---

## Zakładki

### Zakładka Search

Rozwija istniejące `SearchForm` + `ResultsPanel` + `RerankPanel` w zakładkę:

- Zapytanie → wyniki (title, URL, snippet, relevance score).
- Metadane providera w panelu Config (cost, quota, status).
- Sekcja Rerank: wybór modelu rerank, zmiana kolejności wyników, wyświetlenie `positionDelta`.
- Stan pusty z CTA, gdy nie skonfigurowano żadnych providerów wyszukiwania.
- Historia wyszukiwań przez `SearchHistory.tsx` + `searchHistory.ts` (localStorage).

### Zakładka Scrape

Nowe UI nad istniejącym `POST /api/v1/fetch`:

- Wejście URL + przełącznik full-page + selektor formatu (md / text / html).
- Podgląd wyrenderowanej treści + surowy widok Markdown/HTML.
- Przycisk Copy + eksport do pliku.
- Wybór providera fetch (Firecrawl, Jina, Exa Contents, Parallel Extract, Tavily Extract,
  ScrapingBee, Bright Data).
- Stan pusty z CTA, gdy nie skonfigurowano żadnych providerów fetch.

### Zakładka Compare

Uruchamia to samo zapytanie na wielu providerach jednocześnie:

- Multi-select providerów (checkboxy).
- Karty wyników side-by-side z latencją, kosztem i liczbą wyników.
- Podświetlenie unikalnych / wspólnych URL-i między providerami.
- Wymaga ≥2 skonfigurowanych providerów wyszukiwania.

---

## Architektura plików

```
src/components/search/
├── SearchToolsStudio.tsx       # Shell: tabs + shared Config pane + latency/cost bar
├── SearchTab.tsx               # Search form + results + rerank
├── ScrapeTab.tsx               # URL input + format + content preview
├── CompareTab.tsx              # Multi-provider fan-out + side-by-side cards
├── ConfigPane.tsx              # Shared right pane (provider, type, format, rerank)
├── ResultsPanel.tsx            # (existing) result cards
├── RerankPanel.tsx             # (existing) rerank controls
├── SearchForm.tsx              # (existing) query input
├── SearchHistory.tsx           # (existing) localStorage history
├── ProviderBadge.tsx           # (existing) provider status badge
└── types.ts                    # Shared types (SearchResult, etc.)

src/app/dashboard/search-tools/
└── page.tsx                    # Renders <SearchToolsStudio />

src/app/api/v1/search/compare/
└── route.ts                    # NEW — multi-provider fan-out endpoint
```

---

## Endpoint API

### `POST /api/v1/search/compare`

Uruchamia to samo zapytanie na N providerach równolegle.

**Request:**

```json
{
  "query": "latest AI news",
  "providers": ["serper", "tavily", "exa"],
  "searchType": "web",
  "maxResults": 5
}
```

**Response:**

```json
{
  "query": "latest AI news",
  "results": {
    "serper": {
      "provider": "serper",
      "latencyMs": 142,
      "cost": 0.001,
      "results": [{ "title": "...", "url": "...", "snippet": "..." }],
      "error": null
    },
    "tavily": {
      "provider": "tavily",
      "latencyMs": 310,
      "cost": 0.008,
      "results": [],
      "error": "rate_limited"
    }
  }
}
```

Każdy provider jest odpytywany niezależnie — awaria jednego nie psuje pozostałych
(izolacja per provider z `Promise.allSettled`).

---

## Współdzielony panel Config

Prawy panel utrzymuje stan współdzielony między zakładkami:

| Kontrolka         | Zakładki        | Opis                                           |
| ----------------- | --------------- | ---------------------------------------------- |
| Provider          | Search, Scrape  | Dropdown z auto + ręczny wybór                 |
| Type              | Search, Compare | `web` \| `news`                                |
| Full page         | Scrape          | Checkbox — pełna treść strony vs snippet       |
| Format            | Scrape          | `md` \| `text` \| `html`                       |
| Rerank model      | Search          | Opcjonalny model do ponownego rankingu wyników |
| Providers (multi) | Compare         | Multi-select checkboxy                         |

---

## Pasek latencji / kosztu

Stały pasek w nagłówku pokazuje:

- **Latency** ostatniego żądania (ms)
- **Szacowany koszt** ostatniego żądania ($)
- Przycisk **View code** (`</>`) — generuje gotowy do wklejenia snippet curl / Python / JS
  dla aktualnej konfiguracji zakładki

---

## Integracja Modalities Guide

Baner info na górze linkuje do przewodnika Modalities
(`/dashboard/docs` → sekcja Modalities), wyjaśniając różnicę między
wyszukiwaniem web, scrapowaniem a ekstrakcją treści.

---

## Providerzy

### Providery wyszukiwania (Search + Compare)

Serper, Tavily, Exa, Parallel, Brave, Bing, Perplexity Search i inne
zarejestrowane w katalogu providerów wyszukiwania. Auto-select wybiera najtańszy
zdrowy provider.

### Providery fetch/scrape (Scrape)

Firecrawl, Jina Reader, Exa Contents, Parallel Extract, Tavily Extract,
ScrapingBee, Bright Data. Trasowane przez `POST /api/v1/fetch`.

---

## i18n

Wszystkie stringi UI używają `useTranslations("searchTools")` z kluczami w
`src/i18n/messages/en.json` (i 40+ locale). Nowe klucze dodane dla zakładek Scrape/Compare,
stanów pustych i etykiet porównania.

---

## Testy

| Plik                                     | Co pokrywa                                     |
| ---------------------------------------- | ---------------------------------------------- |
| `tests/unit/search-compare-api.test.ts`  | Walidacja body, fan-out, izolacja błędów       |
| `tests/unit/search-tools-studio.test.ts` | Logika przełączania zakładek, stan Config pane |

```bash
node --import tsx/esm --test tests/unit/search-compare-api.test.ts
node --import tsx/esm --test tests/unit/search-tools-studio.test.ts
```

---

## Powiązane

- [Web Search](../features/WEB_SEARCH.md) — backend wyszukiwania i katalog providerów
- [API Reference](../reference/API_REFERENCE.md) — `POST /api/v1/search`, `POST /api/v1/fetch`
- Plan: `18-search-tools-studio-redesign.plan.md`
