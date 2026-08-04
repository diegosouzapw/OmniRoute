---
title: "Dokumentacja serwera MCP OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Dokumentacja serwera MCP OmniRoute

> Serwer Model Context Protocol z 104 narzędziami obejmującymi routing, cache, kompresję, pamięć, skills, proxy, pool oraz operacje na źródłach kontekstu.
>
> Źródło prawdy: `open-sse/mcp-server/server.ts` wylicza **104 unikalne narzędzia** przez `countUniqueMcpTools()`: 42 kanoniczne definicje (w tym sześć narzędzi cyklu życia CCR oraz trio agent-skills), plus memory (3), skills (4), GitHub skills (3), pool (6), gamification (8), plugins (8), Notion (6), Obsidian (22) oraz dwa narzędzia kompresji wyłącznie RTK.

## Instalacja

OmniRoute MCP jest wbudowany. Uruchom go poleceniem:

```bash
omniroute --mcp
```

Albo przez transport open-sse:

```bash
# HTTP streamable transport (port 20130)
omniroute --dev  # MCP auto-starts on /mcp endpoint
```

## Transporty

Serwer MCP udostępnia trzy transporty, wszystkie oparte o tę samą fabrykę `createMcpServer()`:

| Transport         | Gdzie                                       | Kiedy używać                                                    |
| :---------------- | :------------------------------------------ | :-------------------------------------------------------------- |
| `stdio`           | `open-sse/mcp-server/server.ts`             | Integracje IDE (Claude Desktop, Cursor itd.)                    |
| `sse`             | `POST/GET /api/mcp/sse` via `httpTransport` | Klienci przeglądarkowi/agentowi potrzebujący strumienia zdarzeń |
| `streamable-http` | `POST/GET/DELETE /api/mcp/stream`           | Wielosesyjne klienty HTTP (nagłówek `mcp-session-id`)           |

Aktywny transport HTTP (`sse` lub `streamable-http`) wybiera ustawienie `mcpTransport`. Przełączenie transportu zamyka istniejące sesje na drugim transporcie.

### Dostęp zdalny (bypass scope manage)

`/api/mcp/*` jest w warstwie LOCAL_ONLY (`src/server/authz/routeGuard.ts`) — domyślnie docierają do niego tylko hosty loopback (`localhost`, `127.0.0.1`, `::1`). Od v3.8.2 klienci spoza loopback mogą się łączyć, jeśli przedstawią `Authorization: Bearer <api-key>`, a klucz ma scope `manage`. To jedyny sposób na dostęp do zdalnego serwera MCP przez tunel, reverse proxy lub publiczną nazwę hosta.

```bash
# Grant manage scope: open the dashboard API Keys page and toggle
# "Management Access" on the key, or POST scopes:["manage"] when creating.

# Then connect from a remote MCP client:
curl -i \
  -H "Host: your-public-host.example" \
  -H "Authorization: Bearer sk-…" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-03-26","capabilities":{},"clientInfo":{"name":"my-client","version":"0"}}}' \
  https://your-public-host.example/api/mcp/stream
```

Klucz bez `manage` (lub brak Bearer) zwraca `403 LOCAL_ONLY`. Sąsiedni prefiks `/api/cli-tools/runtime/*` celowo NIE podlega bypassowi — zob. [Route Guard Tiers — Manage-scope carve-out](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Konfiguracja IDE

Zobacz [MCP Client Configuration](../guides/SETUP_GUIDE.md#mcp-client-configuration) dla Claude Desktop,
Cursor, Cline oraz kompatybilnych klientów MCP.

---

## Essential Tools (8) — Phase 1

| Tool                            | Scopes                | Description                                                        |
| :------------------------------ | :-------------------- | :----------------------------------------------------------------- |
| `omniroute_get_health`          | `read:health`         | Uptime, pamięć, circuit breakery, limity rate, statystyki cache    |
| `omniroute_list_combos`         | `read:combos`         | Wszystkie skonfigurowane combo ze strategiami (opcjonalne metryki) |
| `omniroute_get_combo_metrics`   | `read:combos`         | Metryki wydajności dla konkretnego combo                           |
| `omniroute_switch_combo`        | `write:combos`        | Aktywacja lub deaktywacja combo                                    |
| `omniroute_check_quota`         | `read:quota`          | Quota used/total, procent pozostały, czas resetu, health tokenów   |
| `omniroute_route_request`       | `execute:completions` | Wysłanie chat completion przez routing OmniRoute                   |
| `omniroute_cost_report`         | `read:usage`          | Raport kosztów wg okresu (session/day/week/month)                  |
| `omniroute_list_models_catalog` | `read:models`         | Pełny katalog modeli z capabilities, statusem i pricing            |

## Phase 1 — Search

| Tool                   | Scopes           | Description                                                                                                                            |
| :--------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_web_search` | `execute:search` | Wyszukiwanie w sieci przez bramkę search OmniRoute (Serper/Brave/Perplexity/Exa/Tavily/Google PSE/Linkup/SearchAPI/SearXNG) z failover |

## Advanced Tools (11) — Phase 2

| Tool                               | Scopes                               | Description                                                                                   |
| :--------------------------------- | :----------------------------------- | :-------------------------------------------------------------------------------------------- |
| `omniroute_simulate_route`         | `read:health`, `read:combos`         | Symulacja routingu dry-run z drzewem fallback                                                 |
| `omniroute_set_budget_guard`       | `write:budget`                       | Budżet sesji z akcją degrade/block/alert                                                      |
| `omniroute_set_routing_strategy`   | `write:combos`                       | Aktualizacja strategii combo w runtime (priority/weighted/auto itd.)                          |
| `omniroute_set_resilience_profile` | `write:resilience`                   | Zastosowanie presetu resilience `aggressive` / `balanced` / `conservative`                    |
| `omniroute_test_combo`             | `execute:completions`, `read:combos` | Live test każdego providera w combo przez realne wywołanie upstream                           |
| `omniroute_get_provider_metrics`   | `read:health`                        | Metryki per provider z latencją p50/p95/p99 i stanem circuit breakera                         |
| `omniroute_best_combo_for_task`    | `read:combos`, `read:health`         | Rekomendacja combo wg typu zadania z ograniczeniami budżetu/latencji                          |
| `omniroute_explain_route`          | `read:health`, `read:usage`          | Wyjaśnienie, dlaczego request poszedł do providera (czynniki scoringu + fallbacki)            |
| `omniroute_get_session_snapshot`   | `read:usage`                         | Pełny snapshot sesji: koszt, tokeny, top modele/providerzy, błędy, budget guard               |
| `omniroute_db_health_check`        | `read:health`, `write:resilience`    | Diagnoza (i opcjonalna auto-naprawa) driftu bazy, np. uszkodzone refy combo / wiersze-sieroty |
| `omniroute_sync_pricing`           | `pricing:write`                      | Synchronizacja danych cenowych ze źródeł zewnętrznych (LiteLLM); obsługuje `dryRun`           |

## Cache Tools (2)

| Tool                    | Scopes        | Description                                           |
| :---------------------- | :------------ | :---------------------------------------------------- |
| `omniroute_cache_stats` | `read:cache`  | Statystyki semantic cache, prompt-cache i idempotency |
| `omniroute_cache_flush` | `write:cache` | Flush cache globalnie albo wg signature/model         |

## Compression Tools (13)

| Tool                                | Scopes              | Description                                                                                                                       |
| :---------------------------------- | :------------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute_compression_status`      | `read:compression`  | Ustawienia kompresji, podsumowanie analytics oraz statystyki cache-aware (zawiera metadane `analytics.mcpDescriptionCompression`) |
| `omniroute_compression_configure`   | `write:compression` | Konfiguracja trybu kompresji, progu, target ratio, zachowania system-prompt oraz przełącznika kompresji opisów MCP                |
| `omniroute_set_compression_engine`  | `write:compression` | Wybór aktywnego silnika (off/caveman/rtk/stacked) oraz intensywności Caveman/RTK                                                  |
| `omniroute_list_compression_combos` | `read:compression`  | Lista nazwanych compression combo i ich pipeline'ów silników                                                                      |
| `omniroute_compression_combo_stats` | `read:compression`  | Analytics pogrupowane wg compression combo i silnika                                                                              |
| `omniroute_ccr_store`               | `write:compression` | Zapis izolowanej per-caller treści w ograniczonym in-memory magazynie CCR i zwrot markera plus referencji `ccr://`                |
| `omniroute_ccr_retrieve`            | `read:compression`  | Odczyt treści CCR w całości albo w trybach head, tail, lines, grep i stats                                                        |
| `omniroute_ccr_inspect`             | `read:compression`  | Podgląd metadanych CCR należących do callera bez zwracania treści                                                                 |
| `omniroute_ccr_list`                | `read:compression`  | Stronicowana lista metadanych bloków CCR należących do callera                                                                    |
| `omniroute_ccr_delete`              | `write:compression` | Usunięcie bloku CCR należącego do callera                                                                                         |
| `omniroute_ccr_stats`               | `read:compression`  | Raport użycia pamięci w zakresie callera, liczników cyklu życia i limitów magazynu                                                |
| `omniroute_rtk_discover`            | `read:compression`  | Wykrywanie powtarzającego się szumu w opt-in próbkach wyjścia RTK                                                                 |
| `omniroute_rtk_learn`               | `read:compression`  | Generowanie draftu filtra RTK do przeglądu na podstawie opt-in próbek                                                             |

Wpisy CCR są wyłącznie w pamięci i znikają po restarcie. Każdy blok ma limit 2 MiB, każdy
principal 16 MiB, a globalny magazyn 64 MiB. Wpisy domyślnie mają TTL 24 godziny (maksimum
siedem dni). Pełny odczyt MCP jest ograniczony do 256 KiB; większe bloki pozostają dostępne przez
tryby ranged i grep. Przechowywanie, odczyt, listowanie, inspekcja, usuwanie i statystyki są izolowane wg
uwierzytelnionego principalu klucza API. Rekordy audytu zawierają hashe i metadane rozmiaru, nigdy treść.

`omniroute_compression_status` raportuje kompresję opisów MCP osobno pod
`analytics.mcpDescriptionCompression`. Te wartości to szacunki rozmiaru metadanych listowalnych
opisów MCP (`tools`, `prompts`, `resources` i `resourceTemplates`); nie są to rachunki użycia
providera i są oznaczone `source: "mcp_metadata_estimate"`.

### MCP Accessibility Tree Filter (v3.8.0)

Osobno od powyższych narzędzi kompresji OmniRoute zawiera filtr post-execution, który
kompresuje **wyniki narzędzi** MCP przeglądarki/accessibility, zanim wrócą do
agenta. Ten filtr sam w sobie nie jest narzędziem — działa przejrzyście na każdym wyniku toola, który zawiera
rozwlekły tekst accessibility-tree lub browser-snapshot (≥2000 znaków).

Kluczowe zachowania:

- Zwijanie ≥30 kolejnych powtórzonych linii-rodzeństwa do podsumowania head + tail
- Zachowuje kotwice `[ref=eXX]` wymagane przez Playwright/computer-use
- Twardo ucina zbyt duży tekst (>50 000 znaków) z podpowiedzią nawigacji
- Oczekiwane oszczędności: **60–80%** na payloadach browser snapshot

Konfiguracja: `compression.mcpAccessibility` w ustawieniach globalnych (migracja 056).
Implementacja: `open-sse/services/compression/engines/mcpAccessibility/`.
Pełna dokumentacja: [Compression Engines — MCP Accessibility Tree Filter](../compression/COMPRESSION_ENGINES.md#mcp-accessibility-tree-filter).

Zobacz [Compression Engines](../compression/COMPRESSION_ENGINES.md) oraz [RTK Compression](../compression/RTK_COMPRESSION.md) dla
modelu kompresji runtime stojącego za tymi narzędziami.

## 1Proxy Tools (3)

| Tool                        | Scopes         | Description                                                                            |
| :-------------------------- | :------------- | :------------------------------------------------------------------------------------- |
| `omniroute_oneproxy_fetch`  | `read:proxies` | Pobranie darmowych proxy z marketplace 1proxy (filtry protocol/country/quality/limit)  |
| `omniroute_oneproxy_rotate` | `read:proxies` | Pobranie kolejnego dostępnego proxy wg strategii (`random` / `quality` / `sequential`) |
| `omniroute_oneproxy_stats`  | `read:proxies` | Statystyki poola, status sync, rozkład wg protocol i country                           |

## Memory Tools (3)

Zdefiniowane w `open-sse/mcp-server/tools/memoryTools.ts`. Auth/scope jest egzekwowany przez standardowy pipeline scope MCP.

| Tool                      | Scopes         | Description                                                                                    |
| :------------------------ | :------------- | :--------------------------------------------------------------------------------------------- |
| `omniroute_memory_search` | `read:memory`  | Wyszukiwanie pamięci po query / type / API key z egzekwowaniem token-budget                    |
| `omniroute_memory_add`    | `write:memory` | Dodanie nowego wpisu pamięci (`factual` / `episodic` / `procedural` / `semantic`)              |
| `omniroute_memory_clear`  | `write:memory` | Czyszczenie pamięci dla klucza API, opcjonalnie filtrowane po type lub timestampie `olderThan` |

## Skill Tools (4)

Zdefiniowane w `open-sse/mcp-server/tools/skillTools.ts`. Oparte o `src/lib/skills/registry` + `src/lib/skills/executor`.

| Tool                          | Scopes           | Description                                                                             |
| :---------------------------- | :--------------- | :-------------------------------------------------------------------------------------- |
| `omniroute_skills_list`       | `read:skills`    | Lista zarejestrowanych skills z opcjonalnym filtrem po API key, name lub stanie enabled |
| `omniroute_skills_enable`     | `write:skills`   | Włączenie lub wyłączenie konkretnego skilla po ID                                       |
| `omniroute_skills_execute`    | `execute:skills` | Wykonanie skilla z podanym inputem i zwrot rekordu wykonania                            |
| `omniroute_skills_executions` | `read:skills`    | Lista niedawnej historii wykonań skills                                                 |

## Notion Context Source (6)

Zdefiniowane w `open-sse/mcp-server/tools/notionTools.ts`. Token przechowywany w tabeli `key_value` przez `src/lib/db/notion.ts`. Klient REST w `src/lib/notion/api.ts`. API ustawień w `src/app/api/settings/notion/route.ts`. UI dashboardu w `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx`.

Skonfiguruj token integracji Notion w zakładce **Context Sources** w Endpoint dashboard albo przez REST API:

```bash
# Set token
curl -X POST http://localhost:20128/api/settings/notion \
  -H "Content-Type: application/json" \
  -d '{"token": "ntn_..."}'

# Check status
curl http://localhost:20128/api/settings/notion

# Disconnect
curl -X DELETE http://localhost:20128/api/settings/notion
```

| Tool                         | Scopes         | Description                                                      |
| :--------------------------- | :------------- | :--------------------------------------------------------------- |
| `notion_search`              | `read:notion`  | Wyszukiwanie full-text po wszystkich stronach i bazach           |
| `notion_get_page`            | `read:notion`  | Pobranie strony po ID wraz z properties                          |
| `notion_list_block_children` | `read:notion`  | Lista bloków-dzieci strony lub bloku                             |
| `notion_query_database`      | `read:notion`  | Zapytanie do bazy z filtrami, sortami i paginacją                |
| `notion_get_database`        | `read:notion`  | Pobranie schematu bazy po ID                                     |
| `notion_append_blocks`       | `write:notion` | Dołączenie bloków-dzieci do bloku-rodzica (maks. 100 na request) |

## Agent Skill Catalog Tools (3)

Zdefiniowane w `open-sse/mcp-server/tools/agentSkillTools.ts`. Oparte o `src/lib/agentSkills/catalog`. Te narzędzia udostępniają 42-elementowy katalog dokumentacji Agent Skills klientom MCP i zewnętrznym agentom. Scope: `read:catalog`.

| Tool                              | Scopes         | Description                                                                                                         |
| :-------------------------------- | :------------- | :------------------------------------------------------------------------------------------------------------------ |
| `omniroute_agent_skills_list`     | `read:catalog` | Lista wszystkich 42 agent skills z opcjonalnymi filtrami `category` (api\|cli) i `area`; zwraca metadata + coverage |
| `omniroute_agent_skills_get`      | `read:catalog` | Pełne metadata + treść SKILL.md dla pojedynczego skilla po kanonicznym `id`                                         |
| `omniroute_agent_skills_coverage` | `read:catalog` | Statystyki coverage: ile z 22 API i 20 CLI skills ma pliki SKILL.md na filesystemie względem sum katalogu           |

Zobacz [AGENT-SKILLS.md](./AGENT-SKILLS.md) po pełny katalog i sposób konsumowania przez zewnętrznych agentów.

## Pokrewne frameworki (v3.8.0)

Powyższy inwentarz narzędzi MCP (104 unikalne tools, wyliczane przez `countUniqueMcpTools()`) jest celowo
ograniczony do operacji runtime: routing/cache/compression/memory/skills/proxy/context-source. Dwa sąsiednie
frameworki dostarczane razem z serwerem MCP w v3.8.0 są udokumentowane osobno:

### Cloud Agents

Cloud Agents to poza-procesowe agenty AI do kodowania (codex-cloud, devin, jules) podpięte do
OmniRoute przez ten sam model połączeń co providery LLM. Są wystawione przez
własną powierzchnię REST (`/api/v1/agents/*`) i **nie** należą do katalogu narzędzi MCP
— wywołanie Cloud Agent nie zużywa scope MCP.

- Implementacja: `src/lib/cloudAgent/` (`registry.ts`, `agents/codex-cloud.ts`, `agents/devin.ts`, `agents/jules.ts`).
- Cykl życia: `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`.
- Dokumentacja: [docs/frameworks/CLOUD_AGENT.md](./CLOUD_AGENT.md).

### Guardrails

Guardrails to filtry pre/post-execution (vision-bridge, pii-masker, prompt-injection)
stosowane wewnątrz pipeline'u chat. Działają zanim dojdzie do warstwy narzędzi/routingu MCP
i emitują ustrukturyzowane naruszenia do pipeline'u audytu; nie są wywoływane jako narzędzia MCP.

- Implementacja: `src/lib/guardrails/`.
- Dokumentacja: [docs/security/GUARDRAILS.md](../security/GUARDRAILS.md).

Przy debugowaniu wywołania MCP, które wygląda na zablokowane, sprawdź zarówno log audytu MCP
(wpisy `scope_denied:*`), jak i ścieżkę audytu guardrails — request może zostać odrzucony przez
guardrail **zanim** dotrze do warstwy egzekwowania scope MCP.

---

## Endpointy REST API

| Endpoint               | Method                | Description                                                                                     | Auth                       |
| :--------------------- | :-------------------- | :---------------------------------------------------------------------------------------------- | :------------------------- |
| `/api/mcp/status`      | `GET`                 | Status serwera: heartbeat, stan transportu HTTP, podsumowanie aktywności audytu                 | Management (session/admin) |
| `/api/mcp/tools`       | `GET`                 | Katalog narzędzi (name, description, scopes, phase, source endpoints)                           | Management                 |
| `/api/mcp/sse`         | `GET` / `POST`        | Endpoint transportu SSE (bramkowany przez `mcpEnabled` + `mcpTransport === "sse"`)              | API key + scopes           |
| `/api/mcp/stream`      | `POST`/`GET`/`DELETE` | Transport Streamable HTTP (używa nagłówka `mcp-session-id`; `DELETE` kończy sesję)              | API key + scopes           |
| `/api/mcp/audit`       | `GET`                 | Wpisy logu audytu z `mcp_tool_audit` (filtry: `limit`, `offset`, `tool`, `success`, `apiKeyId`) | Management                 |
| `/api/mcp/audit/stats` | `GET`                 | Zagregowane statystyki audytu (`totalCalls`, `successRate`, `avgDurationMs`, top tools)         | Management                 |

Pliki źródłowe: `src/app/api/mcp/{status,tools,sse,stream,audit,audit/stats}/route.ts`.

Oba transporty SSE i Streamable HTTP są zablokowane, dopóki serwer MCP nie jest włączony w Settings (`mcpEnabled`) i nie wybrano odpowiedniego `mcpTransport`. Przy złym transporcie route zwraca HTTP 400 z podpowiedzią zmiany ustawień.

---

## Uwierzytelnianie i scope'y

Narzędzia MCP są uwierzytelniane przez scope'y kluczy API. Egzekwowanie scope jest scentralizowane w
`open-sse/mcp-server/scopeEnforcement.ts`. Każde narzędzie wymaga określonych scope'ów:

| Scope                 | Tools                                                                                                             |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------- |
| `read:health`         | `get_health`, `get_provider_metrics`, `simulate_route`, `explain_route`, `best_combo_for_task`, `db_health_check` |
| `read:combos`         | `list_combos`, `get_combo_metrics`, `simulate_route`, `best_combo_for_task`, `test_combo`                         |
| `write:combos`        | `switch_combo`, `set_routing_strategy`                                                                            |
| `read:quota`          | `check_quota`                                                                                                     |
| `read:usage`          | `cost_report`, `get_session_snapshot`, `explain_route`                                                            |
| `read:models`         | `list_models_catalog`                                                                                             |
| `execute:completions` | `route_request`, `test_combo`                                                                                     |
| `execute:search`      | `web_search`                                                                                                      |
| `write:budget`        | `set_budget_guard`                                                                                                |
| `write:resilience`    | `set_resilience_profile`, `db_health_check`                                                                       |
| `pricing:write`       | `sync_pricing`                                                                                                    |
| `read:cache`          | `cache_stats`                                                                                                     |
| `write:cache`         | `cache_flush`                                                                                                     |
| `read:compression`    | `compression_status`, `list_compression_combos`, `compression_combo_stats`                                        |
| `write:compression`   | `compression_configure`, `set_compression_engine`                                                                 |
| `read:proxies`        | `oneproxy_fetch`, `oneproxy_rotate`, `oneproxy_stats`                                                             |
| `read:notion`         | `notion_search`, `notion_list_databases`, `notion_get_database`, `notion_query_database`, `notion_read`           |
| `write:notion`        | `notion_append_blocks`                                                                                            |
| `read:memory`         | `memory_search`                                                                                                   |
| `write:memory`        | `memory_add`, `memory_clear`                                                                                      |
| `read:skills`         | `skills_list`, `skills_executions`                                                                                |
| `write:skills`        | `skills_enable`                                                                                                   |
| `execute:skills`      | `skills_execute`                                                                                                  |
| `read:catalog`        | `agent_skills_list`, `agent_skills_get`, `agent_skills_coverage`                                                  |

Obsługiwane są scope'y wildcard: `read:*` daje wszystkie scope'y read, `*` daje pełny dostęp.

### `mcp:connect` — wąska capability route (#7895)

Dostęp do transportu HTTP/SSE MCP (`/api/mcp/*`) spoza loopback wymaga carve-outu
LOCAL_ONLY dla `/api/mcp/` (zob. `docs/security/ROUTE_GUARD_TIERS.md`). Historycznie
ten carve-out przyjmował tylko klucz API z pełnym scope `manage`/`admin` — zbyt szeroki dla
callera, który potrzebuje wyłącznie MCP. `src/shared/constants/managementScopes.ts` eksportuje teraz
`MCP_CONNECT_SCOPE = "mcp:connect"`: addytywny, wąski scope (ten sam precedens co
`SELF_USAGE_SCOPE`), który autoryzuje WYŁĄCZNIE bypass `/api/mcp/` w
`src/server/authz/policies/management.ts` — nie daje dostępu do innych route'ów management
i celowo jest trzymany POZA `MANAGEMENT_API_KEY_SCOPES`. Klucz z `manage`/`admin`
nadal przechodzi carve-out bez zmian; `mcp:connect` to alternatywa o niższych uprawnieniach dla
zdalnych callerów wyłącznie MCP, sprawdzana przez `hasMcpConnectOrManageScope()`.

### Per-key HTTP scope binding (#7895)

Po HTTP/SSE `open-sse/mcp-server/httpTransport.ts` rozwiązuje teraz rzeczywiste
`api_keys.scopes` callera przez `resolveMcpCallerAuthInfo()` (`open-sse/mcp-server/httpAuthContext.ts`)
i przekazuje je do `transport.handleRequest(req, { authInfo })` SDK MCP, więc
`extra.authInfo.scopes` docierające do każdego wywołania toola odzwierciedla własne scope'y klucza Bearer.
`resolveCallerScopeContext()` w `scopeEnforcement.ts` już priorytetyzował `authInfo` nad
fallbackami `_meta` i env `OMNIROUTE_MCP_SCOPES` — ta zmiana tylko zapełnia to pierwsze,
najwyżej priorytetowe źródło, które wcześniej nie było karmione po HTTP. Gdy klucz API się nie rozwiąże
(brak nagłówka, nieprawidłowy klucz), `authInfo` pozostaje `undefined` i resolucja spada na
istniejący łańcuch `meta`/env bez zmian. To NIE zmienia domyślnej wartości `OMNIROUTE_MCP_ENFORCE_SCOPES`
— egzekwowanie nadal trzeba włączyć jawnie; ta zmiana sprawia tylko, że
ścieżka per-key ma pierwszeństwo, gdy jest włączone. stdio nie ma tożsamości per-caller (zob.
`mcpCallerIdentity.ts`) i pozostaje nietknięte — zostaje na łańcuchu fallback `_meta`/env.

---

## Zmienne środowiskowe

| Variable                                | Default                            | Purpose                                                                                                       |
| :-------------------------------------- | :--------------------------------- | :------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BASE_URL`                    | `http://localhost:20128`           | Bazowy URL używany przez serwer MCP przy wywołaniach wewnętrznych API OmniRoute                               |
| `OMNIROUTE_API_KEY`                     | (empty)                            | Klucz API przekazywany jako `Authorization: Bearer` do wewnętrznych wywołań API                               |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`          | `false` (only `"true"` enables it) | Po włączeniu brakujące scope'y odmawiają wywołań tooli i logują `scope_denied:<reason>` w audycie             |
| `OMNIROUTE_MCP_SCOPES`                  | (empty)                            | Lista scope'ów rozdzielona przecinkami uważanych domyślnie za „dostępne” (gdy caller nie podaje własnych)     |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`   | (unset = on)                       | Ustawienie na `0/false/off/no` wyłącza kompresję opisów MCP w czasie rejestracji                              |
| `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION` | (unset = on)                       | Alternatywny alias tego samego przełącznika co powyżej                                                        |
| `MCP_TOOL_DENY`                         | (unset = no filter)                | Nazwy tooli rozdzielone przecinkami do usunięcia z `tools/list` (redukcja kardynalności tooli — zob. poniżej) |
| `MCP_TOOL_ALLOW`                        | (unset = no filter)                | Nazwy tooli rozdzielone przecinkami do wyłącznego zachowania (tryb allow-list — zob. poniżej)                 |
| `DATA_DIR`                              | `~/.omniroute`                     | Plik heartbeat jest zapisywany do `${DATA_DIR}/runtime/mcp-heartbeat.json`                                    |

---

## Kompresja opisów

Rejestry tooli, promptów i resources MCP mogą kompresować opisy w czasie rejestracji/listowania, aby zmniejszyć ślad metadanych wystawianych klientom (a tym samym koszt kontekstu promptu). Implementacja żyje w `open-sse/mcp-server/descriptionCompressor.ts` i jest podpięta do serwera MCP przez `compressMcpRegistryMetadata` wewnątrz `createMcpServer()`.

- Kompresja działa na tekście opisu z użyciem rulesetu Caveman (`getRulesForContext("all", "full")`) z ekstrakcją zachowanych bloków (code spans, fenced blocks itd.), więc treść strukturalna nie jest zmieniana.
- Przełącznik per-deployment przez wartość `compression.mcpDescriptionCompressionEnabled` w tabeli ustawień `key_value` (domyślnie: włączone) — w UI jako **Analytics → MCP description compression**.
- Przełącznik process-wide przez `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS=false` albo `OMNIROUTE_MCP_DESCRIPTION_COMPRESSION=false`.
- Statystyki realtime są dostępne przez `omniroute_compression_status` pod `analytics.mcpDescriptionCompression` i oznaczone `source: "mcp_metadata_estimate"`, aby odróżnić je od rzeczywistych rachunków użycia providera.

---

## Redukcja kardynalności tooli (F4.3)

Kompresja opisów zmniejsza metadane każdego toola; **redukcja kardynalności tooli** idzie o krok dalej, ograniczając _ile_ tooli jest w ogóle ogłaszanych. Reklamowanie mniejszej liczby tooli w manifeście `tools/list` tnie koszt tokenów per-request, jaki model klienta płaci za katalog tooli (kompresja „warstwy 5”). Implementacja to czysty, bezstanowy filtr w `open-sse/mcp-server/toolCardinality.ts` (`reduceToolManifest`), podpięty do pętli rejestracji w `createMcpServer()` (`open-sse/mcp-server/server.ts`).

**Opt-in, domyślnie wyłączone.** Filtr działa tylko gdy ustawiona jest co najmniej jedna z dwóch zmiennych środowiskowych; bez żadnej wszystkie 104 tools są ogłaszane bez zmian.

| Variable         | Mode                                                                                         |
| :--------------- | :------------------------------------------------------------------------------------------- |
| `MCP_TOOL_DENY`  | Blacklist — nazwy tooli rozdzielone przecinkami zawsze usuwane z `tools/list`                |
| `MCP_TOOL_ALLOW` | Allow-list — nazwy tooli rozdzielone przecinkami; tylko te przechodzą, reszta jest dropowana |

`deny` ma priorytet nad `allow`. Nazwy są rozdzielone przecinkami, trimowane, a puste wpisy ignorowane. Przykłady:

```bash
# Drop two tools from the catalog
MCP_TOOL_DENY="omniroute_get_health,omniroute_list_combos" omniroute --mcp

# Announce only the routing + quota tools (allow-list mode)
MCP_TOOL_ALLOW="omniroute_route_request,omniroute_check_quota" omniroute --mcp
```

**Jak usuwane są odfiltrowane tool'e:** rejestracja zawsze się udaje; tool odrzucony przez profil jest potem `.disable()` na uchwycie SDK MCP, więc nie pojawia się w `tools/list`, ale okablowanie zostaje (czyste enable/disable, bez re-rejestracji). Parser profilu to `readMcpToolProfileFromEnv(process.env)`, który zwraca `null` (brak filtrowania), gdy obie zmienne są puste.

Bogatszy kształt `ToolProfile` za `reduceToolManifest` obsługuje też filtrowanie po przecięciu scope (`allowScopes`, z matchingiem wildcard w stylu `read:*`) oraz deterministyczny limit `maxTools`, ale te dwa pokrętła wymagają pełnego manifestu w czasie rejestracji i **nie** są dziś wystawione przez zmienne środowiskowe (hook na poziomie `tools/list` to śledzony follow-up). `estimateManifestTokens()` jest dostępne do porównania kosztu tokenów manifestu przed i po redukcji.

---

## Heartbeat runtime

Transport stdio zapisuje liveness do `${DATA_DIR}/runtime/mcp-heartbeat.json` co 5 sekund. Dashboard (`/api/mcp/status`) czyta ten plik plus liveness PID, aby wyliczyć `online`. Transporty HTTP raportują stan z in-process `getMcpHttpStatus()` (bez zapisu do pliku).

Snapshot heartbeat zawiera:

```json
{
  "pid": 12345,
  "startedAt": "2026-05-13T12:34:56.000Z",
  "lastHeartbeatAt": "2026-05-13T12:35:01.000Z",
  "version": "1.8.1",
  "transport": "stdio",
  "scopesEnforced": false,
  "allowedScopes": [],
  "toolCount": 43
}
```

---

## Logowanie audytu

Każde wywołanie toola jest logowane do tabeli SQLite `mcp_tool_audit` przez `open-sse/mcp-server/audit.ts`:

- Nazwa toola, argumenty (hashowane/obcinane wg per-tool `auditLevel`), wynik
- Czas trwania w ms, flaga success/failure, komunikat błędu (gdy dotyczy)
- Hash klucza API, timestamp
- Odmowy scope są logowane jako `scope_denied:<reason>` z listą brakujących scope'ów

Użyj dashboardu albo endpointów REST `/api/mcp/audit` i `/api/mcp/audit/stats`, aby przejrzeć niedawne wywołania.

---

## Pliki

| File                                                                     | Purpose                                                              |
| :----------------------------------------------------------------------- | :------------------------------------------------------------------- |
| `open-sse/mcp-server/server.ts`                                          | Fabryka serwera MCP, punkt wejścia stdio, rejestracje tooli ze scope |
| `open-sse/mcp-server/httpTransport.ts`                                   | Transporty SSE + Streamable HTTP (zarządzanie sesjami)               |
| `open-sse/mcp-server/scopeEnforcement.ts`                                | Ewaluacja scope tooli i resolucja callera                            |
| `open-sse/mcp-server/audit.ts`                                           | Logowanie audytu wywołań tooli (`mcp_tool_audit`)                    |
| `open-sse/mcp-server/runtimeHeartbeat.ts`                                | Writer heartbeat stdio (`mcp-heartbeat.json`)                        |
| `open-sse/mcp-server/descriptionCompressor.ts`                           | Kompresja opisów rejestrów tool / prompt / resource                  |
| `open-sse/mcp-server/schemas/tools.ts`                                   | Schematy Zod + rejestr tooli (`MCP_TOOLS`, 34 wpisy)                 |
| `open-sse/mcp-server/tools/advancedTools.ts`                             | Handlery tooli Phase 2 + cache + 1proxy                              |
| `open-sse/mcp-server/tools/compressionTools.ts`                          | Handlery tooli kompresji                                             |
| `open-sse/mcp-server/tools/memoryTools.ts`                               | Definicje tooli memory (3 tools)                                     |
| `open-sse/mcp-server/tools/skillTools.ts`                                | Definicje tooli skill (4 tools)                                      |
| `open-sse/mcp-server/tools/notionTools.ts`                               | Definicje tooli źródła kontekstu Notion (6 tools)                    |
| `open-sse/mcp-server/tools/gamificationTools.ts`                         | Definicje tooli gamification (8 tools)                               |
| `open-sse/mcp-server/tools/pluginTools.ts`                               | Tool'e rejestracji i zarządzania pluginami (8 tools)                 |
| `src/app/api/mcp/status/route.ts`                                        | Endpoint `/api/mcp/status`                                           |
| `src/app/api/mcp/tools/route.ts`                                         | Endpoint `/api/mcp/tools`                                            |
| `src/app/api/mcp/sse/route.ts`                                           | Route transportu SSE `/api/mcp/sse`                                  |
| `src/app/api/mcp/stream/route.ts`                                        | Route transportu Streamable HTTP `/api/mcp/stream`                   |
| `src/app/api/mcp/audit/route.ts`                                         | Zapytanie logu audytu `/api/mcp/audit`                               |
| `src/app/api/mcp/audit/stats/route.ts`                                   | Zagregowane metryki audytu `/api/mcp/audit/stats`                    |
| `src/lib/notion/api.ts`                                                  | Klient REST API Notion (retry, timeout, klasyfikacja błędów)         |
| `src/lib/db/notion.ts`                                                   | Persystencja tokenu Notion (tabela `key_value`)                      |
| `src/app/api/settings/notion/route.ts`                                   | API ustawień Notion (GET/POST/DELETE)                                |
| `src/app/(dashboard)/dashboard/endpoint/components/NotionSourceCard.tsx` | UI zarządzania tokenem Notion                                        |
| `tests/unit/notion-api.test.ts`                                          | Testy klienta API Notion (7)                                         |
| `tests/unit/notion-tools.test.ts`                                        | Testy egzekwowania scope tooli Notion (10)                           |
| `tests/unit/db/notion.test.mjs`                                          | Testy modułu DB Notion (3)                                           |
