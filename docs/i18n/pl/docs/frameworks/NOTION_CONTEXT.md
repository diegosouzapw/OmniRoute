---
title: "Źródło kontekstu Notion"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Źródło kontekstu Notion

> **Source of truth:** `src/lib/notion/api.ts` (klient REST), `src/lib/db/notion.ts`
> (trwałość tokenu), `open-sse/mcp-server/tools/notionTools.ts` (6 narzędzi MCP),
> `src/app/api/settings/notion/route.ts` (API ustawień). Rejestracja narzędzi i podłączenie
> scope'ów znajdują się w `open-sse/mcp-server/server.ts`.

## Czym to jest

OmniRoute może połączyć się z workspace'em **Notion** jako **źródłem kontekstu** — bazą
wiedzy do odczytu i zapisu, do której agenci docierają przez wbudowany serwer MCP. Po
skonfigurowaniu tokenu integracji Notion narzędzia MCP pozwalają LLM wyszukiwać strony
i bazy danych, czytać treść stron i drzewa bloków, odpytywać bazy z filtrami/sortowaniem
oraz dopisywać nowe bloki — wszystko proksowane przez OmniRoute (z retry, timeoutem
i klasyfikacją błędów), dzięki czemu model nigdy nie wywołuje Notion API bezpośrednio.

Integracja to cienka, utwardzona nakładka na oficjalne Notion REST API
(`https://api.notion.com/v1`, `Notion-Version: 2026-03-11`). Klient
(`src/lib/notion/api.ts`) dodaje:

- **Retry z exponential backoff** (do 3 prób) dla `429` i `5xx`.
- **55-sekundowy request timeout** przez `AbortController`.
- **Typowaną klasyfikację błędów** — `NotionAuthError` (401/403),
  `NotionNotFoundError` (404), `NotionRateLimitError` (429, honoruje wskazówki
  `retry after`), `NotionValidationError` (400/409), `NotionServerError` (5xx),
  `NotionTimeoutError`.
- **Sanityzację komunikatów**, która usuwa fragmenty przypominające stack trace przed
  ich ujawnieniem.

## Konfiguracja

**Nie ma zmiennej środowiskowej** na token Notion — jest przechowywany w tabeli
SQLite `key_value` (namespace `notion`, klucz `integration_token`) przez
`src/lib/db/notion.ts`. Skonfiguruj go w zakładce **Context Sources** dashboardu
Endpoint (`NotionSourceCard` — odpowiednik `ObsidianSourceCard`) albo przez REST API
ustawień.

> [!NOTE]
> Token to **Notion internal integration token**. Utwórz integrację pod
> <https://www.notion.com/my-integrations>, a następnie udostępnij tej integracji
> strony/bazy, do których OmniRoute ma mieć dostęp (model uprawnień Notion opiera się
> na udostępnianiu, a nie na dostępie do całego workspace'u).

### Konfiguracja przez REST

```bash
# Save + validate the integration token (POST validates by issuing a test search)
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token":"ntn_xxx"}'

# Check connection status
curl http://localhost:20128/api/settings/notion

# Disconnect (clears the stored token)
curl -X DELETE http://localhost:20128/api/settings/notion
```

Wszystkie trzy metody wymagają uwierzytelnienia dashboardu (`isAuthenticated`). Przy
`POST` OmniRoute zapisuje token i od razu wykonuje testowe wyszukiwanie z 1 wynikiem;
jeśli Notion zwróci obiekt błędu, token jest czyszczony, a wywołanie kończy się
`400`.

## Narzędzia MCP (6)

Zdefiniowane w `open-sse/mcp-server/tools/notionTools.ts`. Token jest rozwiązywany
w momencie wywołania przez `getNotionToken()`; jeśli nie jest skonfigurowany, narzędzie
rzuca
`"Notion integration token not configured. Set it in Settings > Context Sources."`

| Tool                         | Scope          | Description                                                                            |
| ---------------------------- | -------------- | -------------------------------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Wyszukuje strony i bazy po zapytaniu tekstowym (zwraca titles, IDs, URLs). Paginowane. |
| `notion_get_page`            | `read:notion`  | Pobiera treść i metadane strony po jej ID.                                             |
| `notion_list_block_children` | `read:notion`  | Listuje wszystkie bloki-dzieci bloku lub strony (drzewo bloków). Paginowane.           |
| `notion_query_database`      | `read:notion`  | Odpytuje bazę z opcjonalnymi `filter` + `sorts` (format Notion API). Paginowane.       |
| `notion_get_database`        | `read:notion`  | Pobiera schemat/metadane bazy po ID.                                                   |
| `notion_append_blocks`       | `write:notion` | Dopisuje bloki-dzieci do istniejącego bloku lub strony (max 100 bloków na request).    |

### Parametry wejściowe

- `notion_search` — `query` (1–500 chars), `pageSize` (1–100, default 20),
  `startCursor` (optional).
- `notion_get_page` — `pageId` (32-char hex or UUID).
- `notion_list_block_children` — `blockId`, `pageSize` (1–100, default 50),
  `startCursor` (optional).
- `notion_query_database` — `databaseId`, `filter` (optional, Notion filter format),
  `sorts` (optional array), `pageSize` (1–100, default 50), `startCursor` (optional).
- `notion_get_database` — `databaseId`.
- `notion_append_blocks` — `blockId`, `children` (array of block objects),
  `after` (optional position).

### Scope'y

Narzędzia odczytu wymagają `read:notion`, a narzędzie zapisu — `write:notion`.
Scope'y są egzekwowane przez `withScopeEnforcement()` w
`open-sse/mcp-server/server.ts` tylko gdy `OMNIROUTE_MCP_ENFORCE_SCOPES=true`;
dozwolone scope'y wywołującego pochodzą z `OMNIROUTE_MCP_SCOPES` (rozdzielone
przecinkami) albo z kontekstu scope'ów uwierzytelnionego klucza API. Pełny model
scope'ów: [MCP-SERVER.md](./MCP-SERVER.md).

## Endpointy

| Method   | Path                   | Purpose                               |
| -------- | ---------------------- | ------------------------------------- |
| `GET`    | `/api/settings/notion` | Zwraca `{ connected, hasToken }`.     |
| `POST`   | `/api/settings/notion` | Zapisuje i waliduje token integracji. |
| `DELETE` | `/api/settings/notion` | Rozłącza (czyści zapisany token).     |

> To są trasy ustawień dashboardu. **Nie ma publicznego endpointu proxy Notion pod
> `/v1`** — do Notion dociera się wyłącznie przez powyższe narzędzia MCP.

## Przypadki użycia

- **Odpowiedzi oparte na wiedzy** — agent robi `notion_search` w workspace i
  `notion_get_page` na najlepszym trafieniu przed odpowiedzią, żeby cytować realne
  wewnętrzne dokumenty.
- **Workflowy oparte na bazach** — `notion_query_database` na bazie tasks/CRM z
  filtrami + sortami, potem podsumowanie lub triaż wierszy.
- **Write-back / logowanie** — `notion_append_blocks` dopisuje notatki ze spotkań,
  podsumowania runów albo output agenta do istniejącej strony (tylko append; bez
  destrukcyjnych edycji).
- **Eksploracja struktury** — `notion_list_block_children` do przejścia drzewa
  bloków strony albo `notion_get_database` do odkrycia schematu właściwości bazy
  przed jej odpytaniem.

## Powiązane

- [MCP Server](./MCP-SERVER.md) — transporty, egzekwowanie scope'ów, pełny inwentarz narzędzi.
- [Obsidian Context Source](./OBSIDIAN_CONTEXT.md) — drugie wbudowane źródło kontekstu.
- [Memory System](./MEMORY.md) — trwała pamięć konwersacyjna (komplementarna
  warstwa kontekstu, wstrzykiwana automatycznie zamiast pobierana narzędziami).
