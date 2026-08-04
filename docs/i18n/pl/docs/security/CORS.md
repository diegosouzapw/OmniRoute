---
title: Konfiguracja CORS i bezpieczeństwo
---

# Konfiguracja CORS i bezpieczeństwo

OmniRoute kontroluje, które **origin przeglądarki** mogą odczytywać odpowiedzi cross-origin
z jednej, scentralizowanej listy dozwolonych (allowlist). Model jest **fail-closed domyślnie**:
żaden origin nie jest dozwolony, dopóki go nie dodasz. Ta strona opisuje, jak resolve'owana jest
allowlist, co faktycznie udostępnia `CORS_ALLOW_ALL=true` (i — co ważne — czego **nie**
udostępnia), jak bezpiecznie skonfigurować dev vs production oraz ostrzeżenie runtime,
które dashboard pokazuje, gdy wildcard jest aktywny.

**Źródło prawdy:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). Allowlist jest stosowana raz, w
middleware (`src/server/authz/pipeline.ts`) — handlery per-route same nie ustawiają
`Access-Control-Allow-Origin`.

## Jak resolve'owany jest origin

Dla każdego żądania middleware wylicza wartość `Access-Control-Allow-Origin`
w tej kolejności:

1. **`CORS_ALLOW_ALL=true`** (lub legacy `CORS_ORIGIN=*`) → echo `Origin`
   wywołującego (lub `*`, gdy nie ma nagłówka `Origin`), z `Vary: Origin`,
   żeby cache'e pozostały poprawne. Ten sam chokepoint `applyCorsHeaders()` dokleja też
   `Vary: Accept-Encoding` do każdej odpowiedzi 2xx-z-ciałem na powierzchni token-authenticated
   `/v1*`/`/v1beta*` (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), żeby
   downstream/shared cache'e mogły poprawnie rozróżniać warianty skompresowane i nieskompresowane.
2. W przeciwnym razie `Origin` żądania jest normalizowany (małe litery, usunięty trailing slash)
   i dopasowywany do **zmergowanej allowlist**:
   - env **`CORS_ALLOWED_ORIGINS`** — lista rozdzielona przecinkami, oraz
   - runtime'owe ustawienie **`corsOrigins`** (Dashboard → Security → _CORS Allowed
     Origins_), wstrzykiwane przez `setRuntimeAllowedOrigins()` z
     `src/lib/config/runtimeSettings.ts`.
3. Brak dopasowania → **nagłówek `Access-Control-Allow-Origin` nie jest emitowany**. Przeglądarka
   blokuje odczyt cross-origin. To zamierzone domyślne zachowanie fail-closed.

| Env var                | Znaczenie                                                                               |
| ---------------------- | --------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | CSV dokładnych originów do zezwolenia (zalecane).                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → echo dowolnego originu (wildcard). Tylko dev.                              |
| `CORS_ORIGIN`          | Legacy. `*` zachowuje się jak `CORS_ALLOW_ALL`; pojedyncza wartość trafia na allowlist. |

## Model zagrożeń — co naprawdę udostępnia `CORS_ALLOW_ALL=true`

Ogólne ostrzeżenie OWASP („wildcard CORS = dowolna strona może wywołać Twoje API”) warto
traktować poważnie, ale ekspozycja OmniRoute jest **węższa niż w przypadku ogólnym**,
z powodu jednego konkretnego faktu implementacyjnego:

> **Centralne `applyCorsHeaders()` nigdy nie emituje
> `Access-Control-Allow-Credentials`.** Przeglądarka nie udostępni _credentialed_
> (z cookie) odpowiedzi cross-origin, dopóki serwer nie wyśle
> `Access-Control-Allow-Credentials: true`. Wspólna ścieżka CORS OmniRoute nigdy
> tego nie robi.

Co to oznacza per powierzchnia, nawet przy `CORS_ALLOW_ALL=true`:

| Surface                             | Mechanizm auth              | Efekt wildcard CORS                                                                                                                                                                                                               |
| ----------------------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`     | Cookie session              | Origin jest echo'wany, ale **bez `Allow-Credentials`** przeglądarka **blokuje** credentialed read. Złośliwa strona cross-origin **nie może odczytać** uwierzytelnionych odpowiedzi dashboardu, a cookie sesji nie jest ujawnione. |
| Client API `/v1/*`, `/v1beta/*`     | Bearer / `x-api-key` header | Już permisywne **z założenia** (`relaxForTokenAuth`): przeglądarki nigdy nie dołączają automatycznie `Authorization`/`x-api-key`, więc strona atakującego nie może podać Twojego klucza. `CORS_ALLOW_ALL` tego nie poszerza.      |
| Public read-only (`/api/health`, …) | Brak                        | Niewrażliwe; wildcard jest nieszkodliwy.                                                                                                                                                                                          |

Zatem **residualna** ekspozycja `CORS_ALLOW_ALL=true` ogranicza się do: (a)
nie-credentialed cross-origin **odczytów** już nieuwierzytelnionych danych oraz (b)
przepuszczania CORS **preflight** na management routes — które i tak wymagają auth,
którego strona cross-origin nie może dostarczyć. To **nie** jest wektor session-hijack ani
kradzieży credentiali na wspólnej ścieżce CORS.

### Jeden rzeczywisty wyjątek — `/api/v1/agents/`

Route'y Cloud-Agent (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ustawiają
**własne** nagłówki CORS
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) i **emitują**
`Access-Control-Allow-Origin: <origin>|*` razem z
`Access-Control-Allow-Credentials: true`. To jedyna powierzchnia, na której
origin-echo i credentials współistnieją, i jest **niezależna od
`CORS_ALLOW_ALL`**. Te route'y są management-authenticated
(`requireManagementAuth`); operatorzy wystawiający dashboard poza hostem powinni
mieć świadomość, że to jedyne miejsce, w którym credentialed read cross-origin jest
dozwolony przez nagłówki odpowiedzi. Zacieśnienie do jawnej allowlist jest śledzone
osobno względem tego przewodnika CORS.

## Checklist produkcyjny

- **Nigdy nie ustawiaj `CORS_ALLOW_ALL=true` w production.** Zostaw nieustawione.
- Ustaw **jawną** listę originów — albo przez env var, albo pole w zakładce Security:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- Jeśli OmniRoute działa za reverse proxy / tunnel (nginx, Caddy, Cloudflare
  Tunnel, Tailscale), CORS to **nie** jedyna kontrola — loopback route
  guard nadal chroni route'y spawn-capable (zob.
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md)). Nie fałszuj
  `X-Forwarded-For: 127.0.0.1`, żeby „naprawić” 403; to ponownie otwiera klasę RCE,
  którą route guard zamyka.
- Potwierdź stan runtime: dashboard pokazuje **trwały bursztynowy baner**
  pod Dashboard → Security → Authorization Inventory, gdy
  `CORS_ALLOW_ALL=true` jest aktywne, a `/api/settings/authz-inventory` zwraca
  envelope `cors: { allowAll, allowedOrigins }`, który narzędzia monitoringowe mogą poll'ować.

## Wygoda deweloperska — zezwól na konkretne lokalne originy

Nawet w dev rzadko potrzebujesz wildcarta. Zezwól tylko na dev serwery, których używasz:

```bash
# Vite (5173) + Next.js (3000) dev servers calling a local OmniRoute
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

Originy są dopasowywane case-insensitively z ignorowanym trailing slash, więc
`http://localhost:3000` i `http://localhost:3000/` są równoważne. Ten sam CSV
można ustawić w runtime w **Dashboard → Security → CORS Allowed Origins** bez
restartu.

## Klucze API vs sesje cookie

- **Bearer / `x-api-key` (powierzchnia inference `/v1/*`):** przeglądarki nigdy nie dołączają
  ich automatycznie. CORS nie jest tu sensowną barierą — barierą jest klucz API —
  dlatego ta powierzchnia jest celowo permisywna, żeby klienci browser i
  Electron mogli odczytywać odpowiedzi, do których już są uprawnieni.
- **Cookie session (dashboard):** chroniona przez domyślne fail-closed **oraz**
  brak `Access-Control-Allow-Credentials` na wspólnej ścieżce. Trzymaj
  originy management/dashboard poza jakąkolwiek permisywną konfiguracją; muszą pozostać ściśle
  fail-closed.

## Przykład: reverse proxy przed OmniRoute

CORS jest egzekwowany przez samo OmniRoute, więc proxy generalnie **nie powinno** dodawać ani
przepisywać nagłówków `Access-Control-*` (podwójne nagłówki psują przeglądarki). Terminuj TLS
i forwarduj — niech OmniRoute odpowiada na preflight:

```nginx
# nginx — forward to OmniRoute; do NOT inject Access-Control-* here
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # Do NOT set X-Forwarded-For to 127.0.0.1 — it defeats the loopback route guard.
}
```

Ustaw dozwolone originy przeglądarki w OmniRoute (`CORS_ALLOWED_ORIGINS` lub
zakładka Security), nie w proxy.

## Pliki źródłowe

| Concern                                         | File                                                                 |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| Allowlist resolution + `getCorsStatus()`        | `src/server/cors/origins.ts`                                         |
| Middleware application (single source of truth) | `src/server/authz/pipeline.ts`                                       |
| Settings → runtime origin injection             | `src/lib/config/runtimeSettings.ts`                                  |
| Runtime status for the dashboard                | `src/app/api/settings/authz-inventory/route.ts`                      |
| Dashboard warning banner                        | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins field                      | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent per-route CORS (the exception)      | `src/lib/cloudAgent/api.ts`                                          |

## Zobacz też

- [Route Guard Tiers](./ROUTE_GUARD_TIERS.md) — egzekwowanie loopback dla
  route'ów spawn-capable (osobna, komplementarna kontrola).
- [Authorization Guide](../architecture/AUTHZ_GUIDE.md) — pełny pipeline auth.
