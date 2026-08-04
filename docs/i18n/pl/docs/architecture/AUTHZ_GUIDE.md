---
title: "Przewodnik po autoryzacji"
version: 3.8.40
lastUpdated: 2026-06-28
---

# Przewodnik po autoryzacji

> **Source of truth:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Last updated:** 2026-06-28 — v3.8.40

OmniRoute ma potok autoryzacji zależny od trasy, który bramkuje każde żądanie API. Klasyfikacja jest **deterministyczna** i **fail-closed** — wszystko, czego nie da się sklasyfikować, trafia do `MANAGEMENT` i wymaga sesji albo tokenu klasy management. Ta strona opisuje model dla inżynierów utrzymujących trasy lub projektujących nowe endpointy.

![AuthZ pipeline (3 route classes + policy evaluation)](../diagrams/exported/authz-pipeline.svg)

> Source: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Dwa tryby uwierzytelniania

### 1. API Key (Bearer)

Używany dla klienckich API zgodnych z OpenAI/Anthropic/Gemini oraz dla kilku tras management, gdy klucz ma scope `manage`.

```
Authorization: Bearer <api-key>
```

Walidowane przez `isValidApiKey()` / `extractApiKey()` w `src/sse/services/auth.ts` i reeksportowane przez `src/shared/utils/apiAuth.ts`. Walidator akceptuje też zmienne środowiskowe `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` jako trwałe klucze passthrough (issue #1350).

### 2. Sesja dashboardu (ciastko auth_token)

Dla stron dashboardu i operacji administracyjnych.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

Weryfikowane przez `isDashboardSessionAuthenticated()` w `src/shared/utils/apiAuth.ts`. Potok automatycznie odświeża JWT, gdy zostało mniej niż 7 dni z 30-dniowego czasu życia.

Niektóre trasy management akceptują **którykolwiek** tryb: ciastko LUB `Bearer <key>`, gdy klucz API ma scope `manage` (lub `admin`). To umożliwia workflow „konfigurowalne przez wywołania API” dodany w v3.8.

## Klasy tras

`src/server/authz/types.ts` definiuje trzy klasy; każda trasa, której nie da się sklasyfikować deterministycznie, spada do `MANAGEMENT`.

| Class        | Description                                                                                                                                            | Auth required                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| `PUBLIC`     | Jawnie bezpieczne trasy — login, logout, status, init, health, bootstrap onboardingu.                                                                  | Brak                                                              |
| `CLIENT_API` | Endpointy serwujące modele — `/api/v1/*`, `/api/v1beta/*`, plus aliasy `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Klucz Bearer, gdy efektywna flaga `REQUIRE_API_KEY` jest włączona |
| `MANAGEMENT` | Strony dashboardu, ustawienia, providery, klucze, endpointy admin i diagnostyczne.                                                                     | Sesja dashboardu LUB Bearer ze scope `manage`                     |

## Potok

```
Incoming request → src/proxy.ts
  → runAuthzPipeline() in src/server/authz/pipeline.ts
    1. Strip trusted internal headers (x-omniroute-auth-*, x-omniroute-route-class)
    2. Generate request id, classify route via classifyRoute()
    3. If pathname == "/" → redirect /dashboard
    4. If draining (graceful shutdown) and /api/* → 503
    5. If non-GET /api/* → checkBodySize() guard
    6. If OPTIONS → CORS preflight 204
    7. If options.enforce == false → pass-through with route-class headers
    8. Otherwise: POLICIES[routeClass].evaluate(ctx)
       - allow  → stamp x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → JSON error w/ correlation_id (dashboard pages → 302 /login)
```

Zaufane nagłówki wewnętrzne (zdefiniowane w `src/server/authz/headers.ts`) są **usuwane z przychodzących żądań** przed klasyfikacją — klienci nie mogą wcześniej ustawić `x-omniroute-auth-*`, aby podszyć się pod subject.

### Kontrakty polityk

Każda klasa trasy ma politykę w `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — zawsze zwraca `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — wyciąga Bearer, waliduje przez `validateApiKey()`. Przechodzi do anonymous tylko gdy efektywna flaga `REQUIRE_API_KEY` jest wyłączona. Efektywna flaga jest rozwiązywana przez `isRequireApiKeyEnabled()` (`DB feature flag override > process.env.REQUIRE_API_KEY > default`), więc Dashboard Feature Flags i zmienne środowiskowe spójnie rządzą `/api/v1/*`, `/api/v1beta/*` oraz aliasami; awarie resolvera kończą się fail-closed. Dopuszcza żądania z sesją dashboardu na trasach client API (w tym `/api/v1/models`, używane przez katalog modeli w dashboardzie).
- **`managementPolicy`** (`policies/management.ts`) — akceptuje sesję dashboardu, wewnętrzne żądania model-sync (dopasowane do `/api/providers/[name]/(sync-models|models)`) albo całkowicie pomija auth, jeśli `isAuthRequired()` zwraca false. Zwraca 403 (`AUTH_001`), gdy token Bearer jest obecny, ale nieprawidłowy, w przeciwnym razie 401. Egzekwuje też poziomy route-guard (LOCAL_ONLY / ALWAYS_PROTECTED) przed jakąkolwiek gałęzią auth — zob. [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md). Ścieżki LOCAL_ONLY w `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (dziś: `/api/mcp/`) mogą być dostępne spoza loopback, gdy klucz Bearer ma scope `manage`; wszystkie pozostałe ścieżki LOCAL_ONLY pozostają ściśle loopback niezależnie od scope.

Udana polityka zwraca `AuthSubject` z `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Handlery downstream mogą to odczytać przez `assertAuth(request, "CLIENT_API")` w `src/server/authz/assertAuth.ts` zamiast ponownie uruchamiać logikę auth.

## Lista tras publicznych

`src/shared/constants/publicApiRoutes.ts` to jawna allowlista:

```ts
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/v1/", // treated as CLIENT_API in classify, not as "no-auth public"
  "/api/cloud/",
  "/api/sync/bundle",
  "/api/oauth/",
];

PUBLIC_READONLY_API_ROUTE_PREFIXES = ["/api/monitoring/health", "/api/settings/require-login"];

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Prefiksy tylko do odczytu są publiczne **wyłącznie** dla bezpiecznych metod. Uwaga: `classifyRoute()` wyklucza `/api/v1/*` i `/api/v1beta/*` z fall-through PUBLIC — te trasy są zawsze `CLIENT_API`, więc polityka klucza Bearer nadal obowiązuje.

## Dodawanie nowej trasy

### Wzorzec 1 — Publiczny endpoint client API (Bearer-auth)

Trasy pod `/api/v1/` i `/api/v1beta/` są automatycznie klasyfikowane jako `CLIENT_API`. Middleware egzekwuje sprawdzenie Bearer; handlery tras nie muszą tego powtarzać, ale mogą odczytać subject, jeśli jest to przydatne.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... handler logic
}
```

### Wzorzec 2 — Endpoint management (sesja lub Bearer + manage)

Użyj `requireManagementAuth()` z `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... handler logic
}
```

`requireManagementAuth()` zwraca `null` przy sukcesie albo błąd JSON `Response`:

- 401 `AUTH_001` "Authentication required" — brak jakichkolwiek poświadczeń
- 403 — nieprawidłowy Bearer **lub** Bearer obecny, ale klucz nie ma scope `manage` / `admin`

`hasManageScope(scopes)` zwraca true dla `"manage"` lub `"admin"`.

### Wzorzec 3 — Dodanie do publicznej allowlisty

Dodaj prefiks do `PUBLIC_API_ROUTE_PREFIXES` (lub `PUBLIC_READONLY_API_ROUTE_PREFIXES` dla GET-only). Zaktualizuj testy jednostkowe w `tests/unit/public-api-routes.test.ts` i `tests/unit/authz/classify.test.ts`.

## Scope'y

Klucze API niosą tablicę `scopes` (przechowywaną jako JSON w `api_keys.scopes`, zob. `src/lib/db/apiKeys.ts`).

### Scope management

- `manage` / `admin` — daje kluczowi dostęp do endpointów management API przy wysyłce jako Bearer.

### Scope'y MCP (`src/shared/constants/mcpScopes.ts`)

Każde narzędzie MCP wymaga określonych scope'ów przez `MCP_TOOL_SCOPES`. Pełna lista (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Egzekwowanie scope w `open-sse/mcp-server/server.ts` przekazuje listę scope'ów każdego narzędzia do
`evaluateToolScopes()` po tym, jak `resolveCallerScopeContext()` rozwiąże scope'y z informacji auth MCP,
metadanych żądania lub `OMNIROUTE_MCP_SCOPES`.

## Przełącznik wymagania auth

`isAuthRequired()` w `src/shared/utils/apiAuth.ts` decyduje, czy dla żądania egzekwowane jest **jakiekolwiek** auth:

- `settings.requireLogin === false` → auth jest globalnie wyłączone.
- Brak skonfigurowanego hasła **oraz** brak zmiennej środowiskowej `INITIAL_PASSWORD` → tryb bootstrap dopuszcza kreator onboardingu i żądania loopback, ale żądania z wystawionej sieci nadal wymagają poświadczeń.
- Jakikolwiek błąd DB → fail-closed (secure-by-default).

Egzekwowanie klucza client API używa `isRequireApiKeyEnabled()` w `src/shared/utils/featureFlags.ts`, a nie bezpośredniego odczytu `process.env.REQUIRE_API_KEY`. To ma znaczenie dla wdrożonych instancji: przełączenie `REQUIRE_API_KEY` w Dashboard → Feature Flags zapisuje override w DB i natychmiast wpływa na `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` oraz inne sprawdzenia auth client API współdzielące ten helper. Jeśli magazynu flag nie da się odczytać, auth client API działa fail-closed i wymaga klucza.

## Breaking Change — v3.8.0

Endpointy `/api/v1/agents/tasks/*` oraz `/api/resilience/model-cooldowns` **wymagają teraz management auth** (commit `588a0333`). Klienci, którzy wcześniej wysyłali zwykły klucz API bez scope `manage`, otrzymują `403`. Migracja: nadaj kluczowi scope `manage` w dashboardzie API Keys albo użyj zalogowanej sesji dashboardu.

## Zmiana zachowania — v3.8.2

`/api/mcp/*` (zdalny serwer MCP) domyślnie nadal jest LOCAL_ONLY, ale teraz akceptuje żądania spoza loopback, gdy nagłówek `Authorization: Bearer <api-key>` niesie scope `manage`. Wyjątek jest jawnie bramkowany per-path przez `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` w `src/server/authz/routeGuard.ts`; siostrzany prefiks LOCAL_ONLY `/api/cli-tools/runtime/*` celowo NIE podlega bypassowi, bo może uruchamiać dowolne podprocesy. Anonimowe żądania do `/api/mcp/*` spoza loopback nadal zwracają `403 LOCAL_ONLY` — domyślnie każda nowa ścieżka LOCAL_ONLY pozostaje strict-loopback. Zob. [Route Guard Tiers](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Testowanie

- Testy jednostkowe: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Publiczna allowlista: `tests/unit/public-api-routes.test.ts`.
- Uruchomienie fokusowane: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Debugowanie

Potok zawsze stempluje odpowiedzi:

```
x-request-id:               <correlation id, echoed in error bodies>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Dla uwierzytelnionych żądań nagłówki żądania upstream (po stronie handlera) zawierają także:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<last-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (optional)
x-omniroute-auth-scopes:    comma-separated list
```

Używaj `assertAuth(req, expectedClass)` wewnątrz handlerów — rzuca `AuthzAssertionError` z kodem `AUTHZ_NOT_INITIALIZED`, jeśli middleware zostało ominięte (przydatne do łapania regresji konfiguracji w testach).

## Zobacz także

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — znacznik auth per endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — log audytu zdarzeń auth
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — szczegóły egzekwowania scope MCP
- Source: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
