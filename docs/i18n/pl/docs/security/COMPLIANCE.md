---
title: "Zgodność i audyt"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Zgodność i audyt

> **Source of truth:** `src/lib/compliance/`, `src/app/api/compliance/`
> **Last updated:** 2026-06-28 — v3.8.40

OmniRoute zapisuje akcje administracyjne, zdarzenia uwierzytelniania, zmiany
cyklu życia poświadczeń providerów oraz wywołania narzędzi MCP w tabelach
audytu opartych o SQLite. Ta strona opisuje, co jest logowane, gdzie to
mieszka, jak długo jest przechowywane, jak klucze API mogą się wypisać
(opt-out) oraz jak odpytywać te dane.

Implementacja znajduje się w `src/lib/compliance/index.ts` (T-43 — "Compliance
Controls") oraz `src/lib/compliance/providerAudit.ts`. Zapis audytu nigdy nie
rzuca wyjątku: przy dowolnej awarii wywołanie jest cicho połykane, żeby
logowanie audytu nie mogło przerwać głównego przepływu żądania.

## Co jest logowane

### Administracyjne zdarzenia audytu (`audit_log`)

Każde wywołanie `logAuditEvent({ action, actor, target, details, ... })` tworzy
jeden wiersz. Ciągi akcji mają wzorzec `domain.verb` (lub `domain.verb.outcome`).
Potwierdzone w drzewie źródłowym typy akcji obejmują:

| Action                               | Source                                  |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

Każdy wpis przechowuje `action`, `actor` (domyślnie `"system"`), `target`,
`details`/`metadata` (JSON), `ip_address`, `resource_type`, `status`,
`request_id` oraz `timestamp`. Wrażliwe klucze (`apiKey`, `accessToken`,
`refreshToken`, `password`, wszystko pasujące do `*token`/`*secret`/`*apikey`
itp.) są rekurencyjnie redagowane do `"[redacted]"` przed zapisem wiersza.

### Wywołania narzędzi MCP (`mcp_tool_audit`)

Każde wywołanie narzędzia MCP zapisuje wiersz przez
`open-sse/mcp-server/audit.ts`. Schemat (z
`src/lib/db/migrations/002_mcp_a2a_tables.sql`):

| Column           | Notes                                        |
| ---------------- | -------------------------------------------- |
| `id`             | autoincrement                                |
| `tool_name`      | identyfikator narzędzia MCP                  |
| `input_hash`     | sha256 wejścia (bez przechowywania payloadu) |
| `output_summary` | krótkie, obcięte podsumowanie                |
| `duration_ms`    | czas ściany (wall time)                      |
| `api_key_id`     | wywołujący (nullable)                        |
| `success`        | `1` / `0`                                    |
| `error_code`     | kod błędu końcowego przy awarii              |
| `created_at`     | znacznik czasu ISO                           |

### Logi żądań / użycia

To telemetria operacyjna (nie ściśle admin audit), ale dzieli ten sam
pipeline retencji:

- `usage_history` — agregat użycia per żądanie
- `call_logs` — pełny log per żądanie (objęty limitem wierszy, patrz niżej)
- `proxy_logs` — log ruchu proxy (objęty limitem wierszy)
- `request_detail_logs` — legacy szczegółowy log żądań (nadal przycinany, jeśli obecny)

## Schemat przechowywania

`audit_log` jest tworzony leniwie przez `ensureAuditLogSchema()` przy pierwszym użyciu:

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

Indeksy są tworzone na `timestamp`, `action`, `actor`, `resource_type`,
`status` oraz `request_id`. Brakujące kolumny w legacy DB są dodawane przez
`ALTER TABLE` na żądanie.

## Retencja i czyszczenie

Honorowane są dwa osobne okna retencji:

| Env var                     | Default  | Applies to                                                        |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | Row-cap trim for `call_logs`                                      |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | Row-cap trim for `proxy_logs`                                     |

`cleanupExpiredLogs()` uruchamia przebieg retencji. Jest wywoływany przy starcie
serwera z `src/server-init.ts` oraz `src/instrumentation-node.ts`. Każdy przebieg
loguje zdarzenie audytu `compliance.cleanup` z liczbami usunięć per tabela.
Przycinanie logów proxy/call jest batchowane (`BATCH_SIZE = 5000`), żeby uniknąć
długich blokad zapisu.

Ręczne czyszczenie historii żądań jest oddzielone od retencji. Strona Request Logs
wywołuje `POST /api/settings/purge-request-history`, które usuwa `call_logs`,
legacy `request_detail_logs` oraz lokalne artefakty żądań pod
`${DATA_DIR}/call_logs/`.

Domyślne wartości są zdefiniowane w `src/lib/logEnv.ts`
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## Opt-out `noLog` (per klucz API)

Klucze API można oznaczyć tak, by ich downstreamowy ruch wywołań nie był
logowany. Flaga żyje w tabeli `api_keys` (`no_log INTEGER DEFAULT 0`) i jest
odzwierciedlana w zbiorze w pamięci do szybkich lookupów na hot-path.

```bash
# Create a no-log key (management auth required)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

Helpery (`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — przełącza wpis w pamięci
- `isNoLog(apiKeyId)` — sprawdzane na ścieżce żądania; w razie potrzeby
  spada do odczytu z cache 30 s z `api_keys.no_log`
- `NO_LOG_API_KEY_IDS` (env, lista rozdzielona przecinkami) — wstępnie
  ładowane do zbioru w pamięci przy starcie; przydatne, gdy nie możesz
  przełączyć kolumny bezpośrednio

Administracyjne zdarzenia audytu (login, zmiany providerów, wywołania narzędzi MCP itd.)
**nie** są objęte przez `noLog` — opt-out dotyczy tylko logowania ruchu per żądanie.

## REST API

| Endpoint                    | Method | Description                                | Auth       |
| --------------------------- | ------ | ------------------------------------------ | ---------- |
| `/api/compliance/audit-log` | `GET`  | Stronicowane wpisy audytu admin z filtrami | management |
| `/api/mcp/audit`            | `GET`  | Stronicowane wpisy audytu narzędzi MCP     | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`  | Zagregowane statystyki audytu MCP          | (open-sse) |

Dziś nie ma wbudowanego endpointu eksportu CSV — eksportuj z dashboardu albo
odpytuj bazę SQLite bezpośrednio.

### Odpytywanie `/api/compliance/audit-log`

Obsługiwane query params (wszystkie opcjonalne; filtry tekstowe używają
dopasowania `LIKE %value%`):

- `action`, `actor`, `target`, `resourceType` (lub `resource_type`),
  `status`, `requestId` (lub `request_id`)
- `from` / `since`, `to` / `until` — znaczniki czasu ISO
- `limit` (domyślnie `50`, min `1`, max `500`)
- `offset` (domyślnie `0`, max `10_000`)

Odpowiedź to tablica JSON. Metadane paginacji wracają w nagłówkach:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## Dashboard

Dashboard udostępnia dane audytu pod **`/dashboard/audit`**
(`src/app/(dashboard)/dashboard/audit/page.tsx`). Strona ma dwie zakładki:

- **Compliance** (`ComplianceTab.tsx`) — administracyjne zdarzenia audytu z
  `/api/compliance/audit-log`. Filtry po typie zdarzenia, severity (info / warning
  / critical, wyprowadzone z action + status) oraz zakresie dat. Severity jest
  liczone po stronie klienta z ciągów action/status.
- **MCP** (`McpAuditTab.tsx`) — audyt narzędzi MCP z `/api/mcp/audit`, z
  filtrami po nazwie narzędzia oraz success/failure.

Obie zakładki paginują z rozmiarami strony `50` (compliance) i `25` (MCP).

## Helpery poświadczeń providerów

`src/lib/compliance/providerAudit.ts` dostarcza helpery kształtujące używane
przez trasy zarządzania providerami przy emisji zdarzeń poświadczeń:

- `summarizeProviderConnectionForAudit(connection)` — usuwa `apiKey`,
  `accessToken`, `refreshToken`, `idToken` oraz
  `providerSpecificData.consoleApiKey` zanim snapshot połączenia trafi do
  `details`.
- `getProviderAuditTarget(connection)` — składa stabilny ciąg
  `"<provider>:<name|id>"` dla pola `target`.
- `extractProviderWarnings(...payloads)` — skanuje odpowiedzi providerów pod kątem
  ostrzeżeń policy/safety (`[sanitizer]`, `prompt injection detected`,
  `content has been filtered`, `safety filter`, `policy violation`) i
  zwraca do 5 trafień, każde obcięte do 400 znaków.

## Dobre praktyki

- Oznaczaj klucze API obsługujące PII (prawo, medycyna itd.) flagą `noLog: true`.
- Dostosuj `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS` do swojej
  polityki retencji. Domyślne 7 dni są konserwatywne.
- Eksportuj tabelę audytu poza platformę (`sqlite3 dump`) w cyklu wymaganym
  przez twój program compliance — nie ma wbudowanej archiwizacji.
- Śledź liczby `auth.login.failed` i `auth.login.locked` pod kątem wykrywania
  brute-force.
- Przy dodawaniu nowych endpointów admin wywołuj `logAuditEvent({ ... })` ze
  stabilnym ciągiem akcji `domain.verb.outcome` i przekazuj kontekst żądania
  przez `getAuditRequestContext(request)`, żeby IP oraz `requestId` były
  przechwytywane automatycznie.

## Zobacz też

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — maskowanie PII, prompt injection
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — katalog narzędzi MCP i scopes
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — pełna referencja zmiennych env
- Źródło: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
