# OmniRoute MCP Server Documentation (Polski)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/MCP-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/MCP-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/MCP-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/MCP-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/MCP-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/MCP-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/MCP-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/MCP-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/MCP-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/MCP-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/MCP-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/MCP-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/MCP-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/MCP-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/MCP-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/MCP-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/MCP-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/MCP-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/MCP-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/MCP-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/MCP-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/MCP-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/MCP-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/MCP-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/MCP-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/MCP-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/MCP-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/MCP-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/MCP-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/MCP-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/MCP-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/MCP-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/MCP-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/MCP-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/MCP-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/MCP-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/MCP-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/MCP-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/MCP-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/MCP-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/MCP-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/MCP-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/MCP-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/MCP-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/MCP-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/MCP-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/MCP-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/MCP-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/MCP-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/MCP-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/MCP-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/MCP-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/MCP-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/MCP-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/MCP-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/MCP-SERVER.md)

---

> Serwer Model Context Protocol ze 110 narzędziami do obsługi routingu, pamięci podręcznej, kompresji, pamięci, umiejętności, proxy, puli, Radar oraz operacji na źródłach kontekstu.
>
> Źródło prawdy: `open-sse/mcp-server/server.ts` wylicza **110 unikalnych narzędzi** za pomocą `countUniqueMcpTools()`: 45 definicji kanonicznych (w tym sześć narzędzi cyklu życia CCR, trzy narzędzia agent-skills, `omniroute_radar_catalog` i `omniroute_x_search`), a także narzędzia pamięci (3), umiejętności (4), umiejętności GitHub (3), puli (6), grywalizacji (8), wtyczek (8), Notion (6), Obsidian (22), lokalnego korpusu (3) oraz dwa narzędzia kompresji dostępne wyłącznie w RTK.

## Instalacja

OmniRoute MCP jest wbudowany. Uruchom go za pomocą:

```bash
omniroute --mcp
```

Lub za pośrednictwem transportu open-sse:

```bash
# Transport strumieniowy HTTP (port 20130)
omniroute --dev  # MCP uruchamia się automatycznie w punkcie końcowym /mcp
```

Transporty HTTP (`sse` / `streamable-http`, obsługiwane w ramach procesu przez serwer panelu) są
domyślnie wyłączone i wcześniej można je było przełączać wyłącznie na stronie `/dashboard/mcp`. Od v3.8.51
CLI zapewnia te same możliwości:

```bash
omniroute mcp status                                  # stan włączenia/dostępności, transport, liczba narzędzi
omniroute mcp enable [--transport stdio|sse|streamable-http]
omniroute mcp disable
omniroute mcp restart                                 # resetuje aktywne sesje sse/streamable-http
```

`mcp enable`/`mcp disable` wysyłają żądanie PATCH dla tego samego ustawienia `mcpEnabled` (oraz opcjonalnie `mcpTransport`),
które panel przełącza za pośrednictwem `/api/settings`. `mcp restart` wywołuje `POST /api/mcp/restart`: zamyka
aktywne sesje `sse`/`streamable-http`, dzięki czemu następne żądanie wykonuje czystą ponowną inicjalizację; zwraca
`409`, jeśli MCP jest wyłączony, oraz `501` dla transportu `stdio` (klienci stdio zarządzają własnymi
podprocesami — nie istnieje uchwyt wewnątrz procesu, który można ponownie uruchomić).

## Transporty

Serwer MCP udostępnia trzy transporty, wszystkie oparte na tej samej fabryce `createMcpServer()`:

| Transport         | Lokalizacja                                   | Kiedy używać                                                |
| :---------------- | :-------------------------------------------- | :---------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`               | Integracje z IDE (Claude Desktop, Cursor itp.)              |
| `sse`             | `POST/GET /api/mcp/sse` przez `httpTransport` | Klienci przeglądarkowi/agenci wymagający strumienia zdarzeń |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`             | Wielosesyjni klienci HTTP (nagłówek `mcp-session-id`)       |

Aktywny transport HTTP (`sse` lub `streamable-http`) jest wybierany za pomocą ustawienia `mcpTransport`. Zmiana transportu zamyka istniejące sesje korzystające z drugiego transportu.

### Dostęp zdalny (obejście za pomocą zakresu manage)

`/api/mcp/*` znajduje się w warstwie LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — domyślnie dostęp do niego mają wyłącznie hosty interfejsu pętli zwrotnej (`localhost`, `127.0.0.1`, `::1`). Od v3.8.2 klienci spoza interfejsu pętli zwrotnej mogą się łączyć, jeśli przedstawią nagłówek `Authorization: Bearer <api-key>`, którego klucz ma zakres `manage`. Jest to jedyny sposób uzyskania dostępu do zdalnego serwera MCP przez tunel, odwrotne proxy lub publiczną nazwę hosta.

```bash
# Nadaj zakres manage: otwórz stronę API Keys w panelu i włącz
# opcję „Management Access” dla klucza albo przekaż scopes:["manage"] podczas jego tworzenia.

# Następnie połącz się ze zdalnego klienta MCP:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Klucz bez zakresu `manage` (lub brak uwierzytelnienia Bearer) powoduje zwrócenie `403 LOCAL_ONLY`. Powiązanego prefiksu `/api/cli-tools/runtime/*` celowo nie można obejść — zobacz [Warstwy ochrony tras — wyjątek dla zakresu manage](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Konfiguracja IDE

Zobacz [Konfiguracja klienta MCP](../guides/SETUP_GUIDE.md#mcp-client-configuration), aby skonfigurować Claude Desktop,
Cursor, Cline oraz kompatybilne klienty MCP.

---

## Podstawowe narzędzia (14) — Etap 1

| Narzędzie                       | Zakresy               | Opis                                                                                                                                                          |
| :------------------------------ | :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `omniroute_get_health`          | `read:health`         | Czas działania, pamięć, wyłączniki obwodu, limity szybkości, statystyki pamięci podręcznej                                                                    |
| `omniroute_list_combos`         | `read:combos`         | Wszystkie skonfigurowane kombinacje wraz ze strategiami (opcjonalnie z metrykami)                                                                             |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metryki wydajności dla określonej kombinacji                                                                                                                  |
| `omniroute_switch_combo`        | `write:combos`        | Aktywowanie lub dezaktywowanie kombinacji                                                                                                                     |
| `omniroute_create_combo`        | `write:combos`        | Tworzenie zweryfikowanej kombinacji za pośrednictwem istniejącego API kombinacji                                                                              |
| `omniroute_check_quota`         | `read:quota`          | Wykorzystany/całkowity limit, pozostała wartość procentowa, czas resetowania, stan tokenu                                                                     |
| `omniroute_route_request`       | `execute:completions` | Wysyłanie żądania ukończenia czatu przez mechanizm routingu OmniRoute                                                                                         |
| `omniroute_cost_report`         | `read:usage`          | Raport kosztów według okresu (sesja/dzień/tydzień/miesiąc)                                                                                                    |
| `omniroute_list_models_catalog` | `read:models`         | Pełny katalog modeli wraz z możliwościami, stanem i cennikiem                                                                                                 |
| `omniroute_radar_catalog`       | `read:radar`          | Lokalny, podpisany katalog Radar; opcjonalne filtry według dostawcy/rodziny                                                                                   |
| `omniroute_tool_search`         | `read:tools`          | Wyszukiwanie narzędzi w zarejestrowanym katalogu MCP                                                                                                          |
| `omniroute_web_search`          | `execute:search`      | Wyszukiwanie w sieci za pośrednictwem skonfigurowanych dostawców wyszukiwania. Nie obejmuje X/Twittera.                                                       |
| `omniroute_x_search`            | `execute:search`      | Wyszukiwanie w X przez xAI/SuperGrok lub wybór `xquik-search` w celu uzyskania wyników z API Xquik. Wymaga danych uwierzytelniających dla wybranego zaplecza. |
| `omniroute_web_fetch`           | `execute:search`      | Pobieranie treści internetowych za pośrednictwem skonfigurowanych dostawców pobierania                                                                        |

## Narzędzia zaawansowane (11) — Faza 2

| Narzędzie                          | Zakresy                              | Opis                                                                                                                                             |
| :--------------------------------- | :----------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Symulacja routingu bez wykonywania żądania, z drzewem mechanizmów awaryjnych                                                                     |
| `omniroute_set_budget_guard`       | `write:budget`                       | Budżet sesji z działaniem polegającym na degradacji, blokowaniu lub alarmowaniu                                                                  |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Aktualizacja strategii kombinacji w czasie wykonywania (priorytetowa/ważona/automatyczna/itp.)                                                   |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Zastosowanie ustawienia odporności `aggressive` / `balanced` / `conservative`                                                                    |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Test każdego dostawcy w kombinacji na żywo przy użyciu rzeczywistego wywołania usługi nadrzędnej                                                 |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metryki poszczególnych dostawców z opóźnieniami p50/p95/p99 i stanem wyłącznika automatycznego                                                   |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Rekomendacja kombinacji według typu zadania, z uwzględnieniem ograniczeń budżetu i opóźnienia                                                    |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Wyjaśnienie, dlaczego żądanie skierowano do danego dostawcy (czynniki punktacji + opcje awaryjne)                                                |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Pełny obraz sesji: koszt, tokeny, najczęstsze modele/dostawcy, błędy i ochrona budżetu                                                           |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnozowanie (i opcjonalna automatyczna naprawa) niespójności bazy danych, takich jak uszkodzone odwołania do kombinacji lub osierocone wiersze |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synchronizacja danych cenowych ze źródeł zewnętrznych (LiteLLM); obsługuje `dryRun`                                                              |

## Narzędzia pamięci podręcznej (2)

| Narzędzie               | Zakresy       | Opis                                                                 |
| :---------------------- | :------------ | :------------------------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Statystyki pamięci semantycznej, pamięci promptów i idempotentności  |
| `omniroute_cache_flush` | `write:cache` | Opróżnienie pamięci podręcznej globalnie lub według sygnatury/modelu |

## Narzędzia kompresji (13)

| Narzędzie                           | Zakresy             | Opis                                                                                                                                                  |
| :---------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Ustawienia kompresji, podsumowanie analityczne i statystyki uwzględniające pamięć podręczną (obejmuje metadane `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Konfiguracja trybu kompresji, progu, docelowego współczynnika, zachowywania promptu systemowego i przełącznika kompresji opisów MCP                   |
| `omniroute_set_compression_engine`  | `write:compression` | Wybór aktywnego silnika (off/caveman/rtk/stacked) oraz intensywności Caveman/RTK                                                                      |
| `omniroute_list_compression_combos` | `read:compression`  | Lista nazwanych kombinacji kompresji i ich potoków silników                                                                                           |
| `omniroute_compression_combo_stats` | `read:compression`  | Dane analityczne pogrupowane według kombinacji kompresji i silnika                                                                                    |
| `omniroute_ccr_store`               | `write:compression` | Zapisanie zawartości izolowanej dla wywołującego w ograniczonym magazynie CCR w pamięci i zwrócenie znacznika wraz z odwołaniem `ccr://`              |
| `omniroute_ccr_retrieve`            | `read:compression`  | Pobranie pełnej zawartości CCR lub w trybie początku, końca, wierszy, grep albo statystyk                                                             |
| `omniroute_ccr_inspect`             | `read:compression`  | Sprawdzenie metadanych CCR należących do wywołującego bez zwracania zawartości                                                                        |
| `omniroute_ccr_list`                | `read:compression`  | Wyświetlenie stronicowanych metadanych bloków CCR należących do wywołującego                                                                          |
| `omniroute_ccr_delete`              | `write:compression` | Usunięcie bloku CCR należącego do wywołującego                                                                                                        |
| `omniroute_ccr_stats`               | `read:compression`  | Raportowanie użycia pamięci w zakresie wywołującego, liczników cyklu życia i limitów magazynu                                                         |
| `omniroute_rtk_discover`            | `read:compression`  | Wykrywanie powtarzających się zakłóceń w dobrowolnie udostępnionych próbkach danych wyjściowych RTK                                                   |
| `omniroute_rtk_learn`               | `read:compression`  | Generowanie możliwej do przejrzenia wersji roboczej filtra RTK na podstawie dobrowolnie udostępnionych próbek                                         |

Wpisy CCR są przechowywane wyłącznie w pamięci i znikają po ponownym uruchomieniu. Każdy blok ma limit 2 MiB, każdy
podmiot uwierzytelniony — 16 MiB, a globalny magazyn — 64 MiB. Domyślny czas TTL wpisów wynosi 24 godziny (maksymalnie
siedem dni). Pełne pobieranie przez MCP jest ograniczone do 256 KiB; większe bloki pozostają dostępne za pośrednictwem
trybów zakresowych i grep. Zapisywanie, pobieranie, wyświetlanie listy, sprawdzanie, usuwanie i statystyki są izolowane
według podmiotu uwierzytelnionego kluczem API. Rekordy audytu zawierają skróty i metadane rozmiaru, nigdy zawartość.

`omniroute_compression_status` raportuje kompresję opisów MCP osobno w polu
`analytics.mcpDescriptionCompression`. Wartości te są szacunkami rozmiaru metadanych dla opisów
MCP dostępnych na listach (`tools`, `prompts`, `resources` i `resourceTemplates`); nie są one
potwierdzeniami użycia dostawcy i są oznaczone jako `source: "mcp_metadata_estimate"`.

### Filtr drzewa dostępności MCP (v3.8.0)

Niezależnie od powyższych narzędzi do kompresji OmniRoute zawiera filtr wykonywany po zakończeniu
operacji, który kompresuje **wyniki narzędzi** przeglądarkowych/dostępności MCP, zanim zostaną one
zwrócone agentowi. Ten filtr sam w sobie nie jest narzędziem — działa w sposób przezroczysty na
każdym wyniku narzędzia zawierającym rozbudowany tekst drzewa dostępności lub migawki przeglądarki
(≥2000 znaków).

Najważniejsze zachowania:

- Zastępuje ≥30 kolejnych, powtarzających się wierszy elementów równorzędnych podsumowaniem zawierającym początek i koniec
- Zachowuje kotwice `[ref=eXX]` wymagane przez Playwright/obsługę komputera
- Twardo obcina zbyt długi tekst (>50 000 znaków), dodając wskazówkę dotyczącą nawigacji
- Oczekiwana oszczędność: **60–80%** dla danych migawek przeglądarki

Konfiguracja: `compression.mcpAccessibility` w ustawieniach globalnych (migracja 056).
Implementacja: `open-sse/services/compression/engines/mcpAccessibility/`.
Pełna dokumentacja: [Mechanizmy kompresji — filtr drzewa dostępności MCP](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Zobacz [Mechanizmy kompresji](../compression/COMPRESSION_ENGINES.md) i [Kompresja RTK](../compression/RTK_COMPRESSION.md), aby
poznać model kompresji w czasie wykonywania używany przez te narzędzia.

## Narzędzia 1Proxy (3)

| Narzędzie                   | Zakresy        | Opis                                                                                          |
| :-------------------------- | :------------- | :-------------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Pobiera bezpłatne serwery proxy z marketplace 1proxy (filtry protokołu/kraju/jakości/limitu)  |
| `omniroute_oneproxy_rotate` | `read:proxies` | Pobiera następny dostępny serwer proxy według strategii (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statystyki puli, stan synchronizacji oraz rozkład według protokołu i kraju                    |

## Narzędzia pamięci (3)

Zdefiniowane w `open-sse/mcp-server/tools/memoryTools.ts`. Uwierzytelnianie i zakresy są egzekwowane za pośrednictwem standardowego potoku zakresów MCP.

| Narzędzie                 | Zakresy        | Opis                                                                                                |
| :------------------------ | :------------- | :-------------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Wyszukuje wspomnienia według zapytania / typu / klucza API z egzekwowaniem budżetu tokenów          |
| `omniroute_memory_add`    | `write:memory` | Dodaje nowy wpis pamięci (`factual` / `episodic` / `procedural` / `semantic`)                       |
| `omniroute_memory_clear`  | `write:memory` | Usuwa wspomnienia dla klucza API, opcjonalnie filtrując według typu lub znacznika czasu `olderThan` |

## Narzędzia umiejętności (4)

Zdefiniowane w `open-sse/mcp-server/tools/skillTools.ts`. Obsługiwane przez `src/lib/skills/registry` + `src/lib/skills/executor`.

| Narzędzie                     | Zakresy          | Opis                                                                                                          |
| :---------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------ |
| `omniroute_skills_list`       | `read:skills`    | Wyświetla zarejestrowane umiejętności z opcjonalnym filtrowaniem według klucza API, nazwy lub stanu włączenia |
| `omniroute_skills_enable`     | `write:skills`   | Włącza lub wyłącza określoną umiejętność według identyfikatora                                                |
| `omniroute_skills_execute`    | `execute:skills` | Wykonuje umiejętność z podanymi danymi wejściowymi i zwraca rekord wykonania                                  |
| `omniroute_skills_executions` | `read:skills`    | Wyświetla historię ostatnich wykonań umiejętności                                                             |

## Źródło kontekstu Notion (6)

Zdefiniowane w `open-sse/mcp-server/tools/notionTools.ts`. Token jest przechowywany w tabeli `key_value` za pośrednictwem `src/lib/db/notion.ts`. Klient REST znajduje się w `src/lib/notion/api.ts`. Interfejs API ustawień znajduje się w `src/app/api/settings/notion/route.ts`. Interfejs panelu znajduje się w `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Skonfiguruj token integracji Notion na karcie **Źródła kontekstu** w panelu punktu końcowego lub za pośrednictwem interfejsu API REST:

```bash
# Ustaw token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Sprawdź stan
curl http://localhost:20128/api/settings/notion

# Rozłącz
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Narzędzie                    | Zakresy        | Opis                                                                      |
| :--------------------------- | :------------- | :------------------------------------------------------------------------ |
| `notion_search`              | `read:notion`  | Wyszukuje pełnotekstowo we wszystkich stronach i bazach danych            |
| `notion_get_page`            | `read:notion`  | Pobiera stronę według identyfikatora wraz z jej właściwościami            |
| `notion_list_block_children` | `read:notion`  | Wyświetla bloki podrzędne strony lub bloku                                |
| `notion_query_database`      | `read:notion`  | Wysyła zapytanie do bazy danych z filtrami, sortowaniem i paginacją       |
| `notion_get_database`        | `read:notion`  | Pobiera schemat bazy danych według identyfikatora                         |
| `notion_append_blocks`       | `write:notion` | Dołącza bloki podrzędne do bloku nadrzędnego (maksymalnie 100 na żądanie) |

## Narzędzia katalogu umiejętności agentów (3)

Zdefiniowane w `open-sse/mcp-server/tools/agentSkillTools.ts`. Obsługiwane przez `src/lib/agentSkills/catalog`. Narzędzia te udostępniają klientom MCP i zewnętrznym agentom katalog dokumentacji zawierający 45 umiejętności agentów. Zakres: `read:catalog`.

| Narzędzie                         | Zakresy        | Opis                                                                                                                                                                             |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_agent_skills_list`     | `read:catalog` | Wyświetla wszystkie 45 umiejętności agentów z opcjonalnymi filtrami `category` (api\|cli) i `area`; zwraca metadane oraz pokrycie                                                |
| `omniroute_agent_skills_get`      | `read:catalog` | Pobiera pełne metadane oraz zawartość SKILL.md dla pojedynczej umiejętności według kanonicznego `id`                                                                             |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statystyki pokrycia: liczba umiejętności spośród 23 API, 21 CLI i 1 konfiguracyjnej, które mają pliki SKILL.md w systemie plików, w porównaniu z łącznymi wartościami w katalogu |

Pełny katalog oraz informacje o tym, jak korzystają z niego zewnętrzni agenci, znajdują się w dokumencie [AGENT-SKILLS.md](./AGENT-SKILLS.md).

## Powiązane frameworki (v3.8.0)

Powyższy zestaw narzędzi MCP (110 unikalnych narzędzi, obliczonych przez `countUniqueMcpTools()`) jest celowo
ograniczony do operacji routingu, pamięci podręcznej, kompresji, pamięci, umiejętności, proxy i źródeł kontekstu w czasie wykonywania. Dwa sąsiednie
frameworki są dostarczane wraz z serwerem MCP w v3.8.0 i udokumentowane osobno:

### Agenci chmurowi

Agenci chmurowi to działający poza procesem agenci AI do programowania (codex-cloud, cursor-cloud, devin, jules), zintegrowani z
OmniRoute za pomocą tego samego modelu połączeń, który jest używany dla dostawców LLM. Są udostępniani za pośrednictwem
własnego interfejsu REST (`/api/v1/agents/*`) i **nie** stanowią części katalogu narzędzi MCP
— wywołanie agenta chmurowego nie wykorzystuje zakresu MCP.

- Implementacja: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex.ts`, `agents/cursor.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Cykl życia: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentacja: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Mechanizmy ochronne

Mechanizmy ochronne to filtry wykonywane przed operacją lub po niej (vision-bridge, pii-masker, prompt-injection),
stosowane wewnątrz potoku czatu. Działają przed dotarciem do warstwy narzędzi/routingu MCP
i wysyłają ustrukturyzowane informacje o naruszeniach do potoku audytu; nie są wywoływane jako narzędzia MCP.

- Implementacja: `src/lib/guardrails/`.
- Dokumentacja: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Podczas debugowania wywołania MCP, które wydaje się zablokowane, sprawdź zarówno dziennik audytu MCP
(wpisy `scope_denied:*`), jak i ścieżkę audytu mechanizmów ochronnych — żądanie może zostać odrzucone przez
mechanizm ochronny **przed** dotarciem do warstwy wymuszania zakresów MCP.

---

## Endpointy REST API

| Endpoint               | Metoda                | Opis                                                                                                        | Uwierzytelnianie                  |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| `/api/mcp/status`      | `GET`                 | Stan serwera: heartbeat, stan transportu HTTP, podsumowanie aktywności audytu                               | Zarządzanie (sesja/administrator) |
| `/api/mcp/tools`       | `GET`                 | Katalog narzędzi (nazwa, opis, zakresy, faza, endpointy źródłowe)                                           | Zarządzanie                       |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint transportu SSE (kontrolowany przez `mcpEnabled` + `mcpTransport === "sse"`)                        | Klucz API + zakresy               |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Strumieniowy transport HTTP (używa nagłówka `mcp-session-id`; `DELETE` kończy sesję)                        | Klucz API + zakresy               |
| `/api/mcp/audit`       | `GET`                 | Wpisy dziennika audytu z `mcp_tool_audit` (filtry: `limit`, `offset`, `tool`, `success`, `apiKeyId`)        | Zarządzanie                       |
| `/api/mcp/audit/stats` | `GET`                 | Zagregowane statystyki audytu (`totalCalls`, `successRate`, `avgDurationMs`, najczęściej używane narzędzia) | Zarządzanie                       |

Pliki źródłowe: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Transporty SSE i strumieniowy HTTP są blokowane do czasu włączenia serwera MCP w Ustawieniach (`mcpEnabled`) i wybrania odpowiedniej wartości `mcpTransport`. Jeśli skonfigurowano niewłaściwy transport, trasa zwraca kod HTTP 400 wraz ze wskazówką dotyczącą zmiany ustawień.

---

## Uwierzytelnianie i zakresy

Narzędzia MCP są uwierzytelniane za pomocą zakresów klucza API. Egzekwowanie zakresów jest scentralizowane w
`open-sse/mcp-server/scopeEnforcement.ts`. Każde narzędzie wymaga określonych zakresów:

| Zakres                | Narzędzia                                                                                                                                                                             |
| :-------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check`                                                                     |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                                                                                             |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                                                                                                |
| `read:quota`          | `check_quota`                                                                                                                                                                         |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                                                                                                |
| `read:models`         | `list_models_catalog`                                                                                                                                                                 |
| `execute:completions` | `route_request`, `test_combo`                                                                                                                                                         |
| `execute:search`      | `web_search`, `x_search`, `web_fetch`                                                                                                                                                 |
| `write:budget`        | `set_budget_guard`                                                                                                                                                                    |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                                                                                           |
| `pricing:write`       | `sync_pricing`                                                                                                                                                                        |
| `read:cache`          | `cache_stats`                                                                                                                                                                         |
| `write:cache`         | `cache_flush`                                                                                                                                                                         |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                                                                                            |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                                                                                     |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                                                                                                 |
| `read:notion`         | `notion_search`, `notion_get_page`, `notion_list_block_children`, `notion_query_database`, `notion_get_database`                                                                      |
| `write:notion`        | `notion_append_blocks`                                                                                                                                                                |
| `read:memory`         | `memory_search`                                                                                                                                                                       |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                                                                                          |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                                                                                    |
| `write:skills`        | `skills_enable`                                                                                                                                                                       |
| `execute:skills`      | `skills_execute`                                                                                                                                                                      |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                                                                                      |
| `read:tools`          | `omniroute_tool_search`                                                                                                                                                               |
| `read:radar`          | `omniroute_radar_catalog`                                                                                                                                                             |
| `read:gamification`   | `gamification_profile`, `gamification_rank`, `gamification_leaderboard`, `gamification_badges`, `gamification_servers`, `gamification_anomalies`                                      |
| `write:gamification`  | `gamification_invite`, `gamification_transfer`                                                                                                                                        |
| `read:plugins`        | `plugin_list`, `plugin_executions`                                                                                                                                                    |
| `write:plugins`       | `plugin_scan`, `plugin_install`, `plugin_uninstall`, `plugin_activate`, `plugin_deactivate`, `plugin_configure`                                                                       |
| `read:obsidian`       | 13 narzędzi do odczytu — `obsidian_list_vault`, `obsidian_read_note`, `obsidian_search_simple`, `obsidian_search_structured`, `obsidian_get_periodic_note`, `obsidian_sync_status`, … |
| `write:obsidian`      | 9 narzędzi do zapisu — `obsidian_write_note`, `obsidian_append_note`, `obsidian_patch_note`, `obsidian_move_note`, `obsidian_delete_note`, `obsidian_sync_trigger`, …                 |
| `read:local-corpus`   | `local_corpus_search`, `local_corpus_read`, `local_corpus_status`                                                                                                                     |

Obsługiwane są zakresy z symbolami wieloznacznymi: `read:*` przyznaje wszystkie zakresy odczytu, a `*` przyznaje pełny dostęp.

### `mcp:connect` — wąskie uprawnienie do trasy (#7895)

Dostęp do transportu HTTP/SSE MCP (`/api/mcp/*`) spoza interfejsu loopback wymaga
wyjątku LOCAL_ONLY dla `/api/mcp/` (zobacz `docs/security/ROUTE_GUARD_TIERS.md`). Dotychczas
ten wyjątek akceptował wyłącznie klucz API z pełnym zakresem `manage`/`admin` — zbyt szerokim dla
klienta, który potrzebuje jedynie komunikować się z MCP. Plik `src/shared/constants/managementScopes.ts`
eksportuje teraz `MCP_CONNECT_SCOPE = "mcp:connect"`: dodatkowy, wąski zakres (zgodnie z precedensem
`SELF_USAGE_SCOPE`), który autoryzuje WYŁĄCZNIE obejście dla `/api/mcp/` w
`src/server/authz/policies/management.ts` — nie przyznaje dostępu do żadnych innych tras zarządzania
i celowo NIE jest uwzględniony w `MANAGEMENT_API_KEY_SCOPES`. Klucz zawierający zakres `manage`/`admin`
nadal korzysta z wyjątku bez zmian; `mcp:connect` jest alternatywą o niższych uprawnieniach dla
zdalnych klientów korzystających wyłącznie z MCP, sprawdzaną za pomocą `hasMcpConnectOrManageScope()`.

### Powiązanie zakresów HTTP z poszczególnymi kluczami (#7895)

W przypadku HTTP/SSE plik `open-sse/mcp-server/httpTransport.ts` określa teraz rzeczywiste
`api_keys.scopes` klienta za pomocą `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
i przekazuje je do `transport.handleRequest(req, { authInfo })` zestawu SDK MCP, dzięki czemu
`extra.authInfo.scopes` docierające do każdego wywołania narzędzia odzwierciedlają zakresy własne klucza Bearer.
Funkcja `resolveCallerScopeContext()` z `scopeEnforcement.ts` już wcześniej nadawała `authInfo` wyższy
priorytet niż `_meta` i wartość rezerwową ze zmiennej środowiskowej `OMNIROUTE_MCP_SCOPES` — ta zmiana jedynie
uzupełnia to pierwsze źródło o najwyższym priorytecie, które wcześniej nie było zasilane w przypadku HTTP.
Gdy nie uda się rozpoznać żadnego klucza API (brak nagłówka, nieprawidłowy klucz), `authInfo` pozostaje
`undefined`, a rozpoznawanie przechodzi do istniejącego łańcucha `meta`/zmiennej środowiskowej bez zmian.
NIE zmienia to domyślnej wartości `OMNIROUTE_MCP_ENFORCE_SCOPES` — egzekwowanie nadal musi zostać jawnie
włączone; ta zmiana jedynie sprawia, że po jego włączeniu ścieżka dotycząca poszczególnych kluczy ma
pierwszeństwo. stdio nie ma tożsamości poszczególnych klientów (zobacz `mcpCallerIdentity.ts`) i pozostaje
bez zmian — nadal korzysta z rezerwowego łańcucha `_meta`/zmiennej środowiskowej.

---

## Zmienne środowiskowe

| Zmienna                                 | Wartość domyślna                  | Przeznaczenie                                                                                                                              |
| :-------------------------------------- | :-------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`          | Bazowy adres URL używany przez serwer MCP podczas wywoływania wewnętrznych interfejsów API OmniRoute                                       |
| `OMNIROUTE_API_KEY`                     | (pusta)                           | Klucz API przekazywany jako `Authorization: Bearer` do wewnętrznych wywołań API                                                            |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (włącza tylko `"true"`)   | Po włączeniu brakujące zakresy powodują odrzucenie wywołań narzędzi i zapisanie `scope_denied:<reason>` w dzienniku audytu                 |
| `OMNIROUTE_MCP_SCOPES`                  | (pusta)                           | Rozdzielona przecinkami lista dozwolonych zakresów uznawanych domyślnie za „dostępne” (używana, gdy wywołujący nie poda własnych zakresów) |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (nieustawiona = włączone)         | Ustawienie na `0/false/off/no` wyłącza kompresję opisów MCP podczas rejestracji                                                            |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (nieustawiona = włączone)         | Alternatywny alias tego samego przełącznika co powyżej                                                                                     |
| `OMNIROUTE_MCP_FETCH_TIMEOUT_MS`        | `10000`                           | Limit czasu do przerwania wewnętrznych odczytów zarządzania (kondycja, odporność, kombinacje, limity, użycie)                              |
| `OMNIROUTE_MCP_UPSTREAM_TIMEOUT_MS`     | `60000`                           | Limit czasu do przerwania etapów oczekujących na dostawcę (`route_request`, `web_search`, `web_fetch`)                                     |
| `MCP_TOOL_DENY`                         | (nieustawiona = brak filtrowania) | Rozdzielone przecinkami nazwy narzędzi usuwanych z `tools/list` (redukcja liczby narzędzi — zobacz poniżej)                                |
| `MCP_TOOL_ALLOW`                        | (nieustawiona = brak filtrowania) | Rozdzielone przecinkami nazwy narzędzi, które mają zostać zachowane jako jedyne (tryb listy dozwolonych — zobacz poniżej)                  |
| `DATA_DIR`                              | `~/.omniroute`                    | Plik pulsu jest zapisywany w `${DATA_DIR}/runtime/mcp-heartbeat.json`                                                                      |

---

## Kompresja opisów

Rejestry narzędzi, promptów i zasobów MCP mogą kompresować opisy podczas rejestracji lub wyświetlania listy, aby zmniejszyć ilość metadanych udostępnianych klientom (a tym samym koszt kontekstu promptu). Implementacja znajduje się w `open-sse/mcp-server/descriptionCompressor.ts` i jest zintegrowana z serwerem MCP za pośrednictwem `compressMcpRegistryMetadata` wewnątrz `createMcpServer()`.

- Kompresja jest wykonywana na tekście opisu przy użyciu zestawu reguł Caveman (`getRulesForContext("all", "full")`) z wyodrębnianiem zachowywanych bloków (fragmentów kodu, bloków ograniczonych znacznikami itp.), dzięki czemu treść strukturalna nie jest zmieniana.
- Przełączanie dla poszczególnych wdrożeń odbywa się za pomocą wartości `compression.mcpDescriptionCompressionEnabled` w tabeli ustawień `key_value` (domyślnie: włączone) — dostępnej w interfejsie użytkownika jako **Analityka → Kompresja opisów MCP**.
- Przełączanie dla całego procesu odbywa się za pomocą `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` lub `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Statystyki w czasie rzeczywistym są udostępniane za pośrednictwem `omniroute_compression_status` w `analytics.mcpDescriptionCompression` i oznaczane tagiem `source: "mcp_metadata_estimate"`, aby odróżnić je od rzeczywistych raportów użycia pochodzących od dostawców.

---

## Redukcja liczby narzędzi (F4.3)

Kompresja opisów zmniejsza metadane każdego narzędzia; **redukcja liczby narzędzi** idzie o krok dalej, ograniczając liczbę narzędzi, które są w ogóle ogłaszane. Udostępnianie mniejszej liczby narzędzi w manifeście `tools/list` obniża koszt tokenów ponoszony przy każdym żądaniu przez model klienta z tytułu katalogu narzędzi (kompresja „warstwy 5”). Implementacja jest czystym, bezstanowym filtrem w `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), podłączonym do pętli rejestracji w `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Funkcja opcjonalna, domyślnie wyłączona.** Filtr działa tylko wtedy, gdy ustawiona jest co najmniej jedna z dwóch zmiennych środowiskowych; jeśli żadna nie jest ustawiona, wszystkie 110 narzędzi jest ogłaszanych bez zmian.

| Zmienna          | Tryb                                                                                                                            |
| :--------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `MCP_TOOL_DENY`  | Czarna lista — rozdzielone przecinkami nazwy narzędzi, które zawsze są usuwane z `tools/list`                                   |
| `MCP_TOOL_ALLOW` | Lista dozwolonych — rozdzielone przecinkami nazwy narzędzi; zachowywane są tylko te narzędzia, a wszystkie pozostałe są usuwane |

`deny` ma wyższy priorytet niż `allow`. Nazwy są rozdzielane przecinkami, usuwane są otaczające je białe znaki, a puste wpisy są ignorowane. Przykłady:

```bash
# Usuń dwa narzędzia z katalogu
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Ogłaszaj tylko narzędzia routingu i limitów (tryb listy dozwolonych)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Sposób usuwania odfiltrowanych narzędzi:** rejestracja zawsze kończy się powodzeniem; narzędzie odrzucone przez profil jest następnie wyłączane za pomocą `.disable()` na uchwycie SDK MCP, dzięki czemu nigdy nie pojawia się w `tools/list`, ale konfiguracja połączeń pozostaje nienaruszona (czyste włączanie/wyłączanie bez ponownej rejestracji). Parser profilu to `readMcpToolProfileFromEnv(process.env)`, który zwraca `null` (brak filtrowania), gdy obie zmienne są puste.

Bardziej rozbudowana struktura `ToolProfile`, na której opiera się `reduceToolManifest`, obsługuje również filtrowanie przez przecięcie zakresów (`allowScopes`, z dopasowywaniem symboli wieloznacznych w stylu `read:*`) oraz deterministyczny limit `maxTools`, lecz te dwa ustawienia wymagają pełnego manifestu podczas rejestracji i **nie** są obecnie udostępniane za pośrednictwem zmiennych środowiskowych (obsługa na poziomie `tools/list` jest zaplanowana jako kolejny etap). Funkcja `estimateManifestTokens()` umożliwia porównanie kosztu tokenów manifestu przed redukcją i po niej.

---

## Sygnał aktywności środowiska uruchomieniowego

Transport stdio co 5 sekund zapisuje informacje o aktywności w `${DATA_DIR}/runtime/mcp-heartbeat.json`. Panel (`/api/mcp/status`) odczytuje ten plik oraz sprawdza aktywność PID, aby określić wartość `online`. Transporty HTTP raportują natomiast stan za pomocą działającej w procesie funkcji `getMcpHttpStatus()` (bez zapisu do pliku).

Migawka sygnału aktywności zawiera:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 110
}
```

---

## Rejestrowanie audytowe

Każde wywołanie narzędzia jest rejestrowane w tabeli SQLite `mcp_tool_audit` przez `open-sse/mcp-server/audit.ts`:

- Nazwa narzędzia, argumenty (haszowane/skracane zgodnie z właściwym dla narzędzia poziomem `auditLevel`), wynik
- Czas trwania w ms, flaga powodzenia/niepowodzenia, komunikat o błędzie (jeśli dotyczy)
- Skrót klucza API, znacznik czasu
- Odmowy dostępu do zakresów są rejestrowane jako `scope_denied:<reason>` wraz z listą brakujących zakresów

Aby sprawdzić ostatnie wywołania, użyj panelu lub punktów końcowych REST `/api/mcp/audit` i `/api/mcp/audit/stats`.

---

## Pliki

| Plik                                                                     | Przeznaczenie                                                                         |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------------------------ |
| `open-sse/mcp-server/server.ts`                                          | Fabryka serwera MCP, punkt wejścia stdio, rejestracja narzędzi z zakresami            |
| `open-sse/mcp-server/httpTransport.ts`                                   | Transport SSE + Streamable HTTP (zarządzanie sesjami)                                 |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Ocena zakresów narzędzi i rozpoznawanie wywołującego                                  |
| `open-sse/mcp-server/audit.ts`                                           | Rejestrowanie audytu wywołań narzędzi (`mcp_tool_audit`)                              |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Moduł zapisujący sygnał heartbeat dla stdio (`mcp-heartbeat.json`)                    |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kompresja opisów w rejestrach narzędzi, promptów i zasobów                            |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Schematy Zod + rejestr narzędzi (`MCP_TOOLS`, 45 wpisów)                              |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Procedury obsługi narzędzi fazy 2, pamięci podręcznej i 1proxy                        |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Procedury obsługi narzędzi kompresji                                                  |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definicje narzędzi pamięci (3 narzędzia)                                              |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definicje narzędzi umiejętności (4 narzędzia)                                         |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definicje narzędzi źródła kontekstu Notion (6 narzędzi)                               |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definicje narzędzi grywalizacji (8 narzędzi)                                          |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Narzędzia do rejestracji wtyczek i zarządzania nimi (8 narzędzi)                      |
| `src/app/api/mcp/status/route.ts`                                        | Punkt końcowy `/api/mcp/status`                                                       |
| `src/app/api/mcp/tools/route.ts`                                         | Punkt końcowy `/api/mcp/tools`                                                        |
| `src/app/api/mcp/sse/route.ts`                                           | Trasa transportu SSE `/api/mcp/sse`                                                   |
| `src/app/api/mcp/stream/route.ts`                                        | Trasa transportu Streamable HTTP `/api/mcp/stream`                                    |
| `src/app/api/mcp/audit/route.ts`                                         | Zapytanie dziennika audytu `/api/mcp/audit`                                           |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Zagregowane metryki audytu `/api/mcp/audit/stats`                                     |
| `src/lib/notion/api.ts`                                                  | Klient interfejsu REST API Notion (ponawianie prób, limit czasu, klasyfikacja błędów) |
| `src/lib/db/notion.ts`                                                   | Trwałe przechowywanie tokenu Notion (tabela `key_value`)                              |
| `src/app/api/settings/notion/route.ts`                                   | Interfejs API ustawień Notion (GET/POST/DELETE)                                       |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | Interfejs użytkownika do zarządzania tokenem Notion                                   |
| `tests/unit/notion-api.test.ts`                                          | Testy klienta interfejsu API Notion (7)                                               |
| `tests/unit/notion-tools.test.ts`                                        | Testy egzekwowania zakresów narzędzi Notion (10)                                      |
| `tests/unit/db/notion.test.mjs`                                          | Testy modułu bazy danych Notion (3)                                                   |
