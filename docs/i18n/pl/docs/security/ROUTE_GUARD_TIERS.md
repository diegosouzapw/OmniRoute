---
title: "Poziomy ochrony tras (Route Guard Tiers)"
---

# Poziomy ochrony tras (Route Guard Tiers)

## Przegląd

Wszystkie trasy management API OmniRoute są klasyfikowane do jednego z trzech
poziomów ochrony. Klasyfikacja jest statyczna, zdefiniowana w
`src/server/authz/routeGuard.ts`, i oceniana przed uruchomieniem jakiejkolwiek
innej gałęzi auth.

## Poziomy (Tiers)

### Tier 1 — LOCAL_ONLY

**Egzekwowane przez:** `isLocalOnlyPath(path)` → sprawdzenie hosta loopback
**Bypass:** Domyślnie brak. Wąski wyjątek (carve-out) dla ścieżek z
`LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`, gdy request niesie ważny
klucz API ze scope `manage` (zob. [Wyjątek manage-scope](#wyjątek-manage-scope)).

Te trasy uruchamiają procesy potomne lub wykonują kod runtime. Udostępnienie ich
ruchowi spoza loopback pozwoliłoby atakującemu, który zdobył ważny JWT (np.
przez tunel Cloudflared/Ngrok), wywołać spawnowanie procesów — znana klasa CVE
([GHSA-fhh6-4qxv-rpqj](https://github.com/advisories/GHSA-fhh6-4qxv-rpqj)).

**Czym jest GHSA-fhh6-4qxv-rpqj (klasa ataku):** serwer management/agent
udostępnia endpoint, który uruchamia subprocess (`npm install`, `node`, przeglądarkę,
proxy, `git`, `tar`, …). Jeśli ten endpoint jest osiągalny spoza hosta — bo
operator wystawił OmniRoute za tunelem nginx/Cloudflare/Tailscale i wyciekł JWT,
albo auth był źle skonfigurowany — atakujący zamienia „wywołaj API” na „uruchom
komendę na hoście” (remote code execution). OmniRoute zamyka to, egzekwując
**sprawdzenie hosta loopback bezwarunkowo, przed jakimkolwiek sprawdzeniem auth**,
na każdej trasie zdolnej do spawnu: wycieknięty token przez tunel nadal nie
dotrze do spawnu.

**Pełny zestaw LOCAL_ONLY.** Autorytatywnym źródłem są
`LOCAL_ONLY_API_PREFIXES` / `LOCAL_ONLY_API_PATTERNS` w
`src/server/authz/routeGuard.ts`; tabela poniżej odzwierciedla bieżący stan. Gate
`check-route-guard-membership` enumeruje każdy `route.ts` pod prefiksami
zdolnymi do spawnu i failuje CI, jeśli którykolwiek nie jest sklasyfikowany jako
local-only.

| Prefiks / wzorzec                   | Dlaczego local-only                                                                            | Bypass manage-scope?           |
| ----------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------ |
| `/api/mcp/`                         | Serwer MCP — spawnuje mosty stdio + handlery SSE                                               | **Tak** (jedyny)               |
| `/api/cli-tools/runtime/`           | Runtime narzędzi CLI — wykonuje dowolny kod pluginów                                           | Nie — spawn-capable            |
| `/api/services/`                    | Osadzone serwisy (9router/CLIProxy) — `npm install` + spawn                                    | Nie — spawn-capable            |
| `/dashboard/providers/services/`    | Reverse proxy do UI osadzonych serwisów                                                        | Nie                            |
| `/api/copilot/`                     | Nieuwierzytelniony driver LLM — domyślnie tylko CLI                                            | Opt-in operatora: manage/admin |
| `/api/tools/agent-bridge/`          | AgentBridge — spawnuje serwer MITM + edycje DNS                                                | Nie — spawn-capable            |
| `/api/tools/traffic-inspector/`     | Traffic Inspector — listener http-proxy + system proxy                                         | Nie — spawn-capable            |
| `/api/plugins/`, `/api/plugins`     | Pluginy — load/execute przez `worker_threads` + `child_process`                                | Nie — spawn-capable            |
| `/api/system/version`               | Auto-update (tylko POST; GET/HEAD/OPTIONS wyłączone) — spawnuje `git checkout` + `npm install` | Nie                            |
| `/api/db-backups/exportAll`         | Spawnuje `tar` dla archiwum eksportu                                                           | Nie                            |
| `/api/local/`                       | 1-klikowe launchery lokalne (dziś Redis) — spawnuje podman/docker                              | Nie — spawn-capable            |
| `/api/headroom/start`, `/stop`      | Cykl życia proxy Headroom — spawnuje python CLI / sygnały PID                                  | Nie — spawn-capable            |
| `/api/oauth/cursor/auto-import`     | `execFile("which", ["cursor"])` przed importem credentials                                     | Nie                            |
| `/api/providers/{id}/login` (regex) | Uruchamia headful Playwright Chromium do logowania web-cookie                                  | Nie                            |

**Odpowiedź przy naruszeniu:** `403 LOCAL_ONLY`

#### Wyjątek manage-scope

Podzbiór ścieżek LOCAL_ONLY MOŻE być dostępny także spoza loopback wtedy i tylko
wtedy, gdy request niesie `Authorization: Bearer <api-key>`, którego metadata
zawiera scope `manage` (lub `admin`). Wyjątek jest jawnie bramkowany per-path
przez `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`, więc domyślnie każda nowa
ścieżka LOCAL_ONLY pozostaje strict-loopback. Requesty nieuwierzytelnione oraz
z kluczami bez scope manage nadal są odrzucane z `403 LOCAL_ONLY`.

Dziś jedynym bypassowalnym prefiksem jest `/api/mcp/`. `/api/cli-tools/runtime/`
oraz `/api/services/` są celowo wykluczone, bo mogą spawnować dowolne
subprocessy (`npm install`, `node`), a to dokładnie ta klasa CVE, przed którą
chroni tier LOCAL_ONLY.

**#7895 — wąski scope `mcp:connect`:** carve-out `/api/mcp/` AKCEPTUJE także
klucz Bearer z wąskim scope `mcp:connect`
(`src/shared/constants/managementScopes.ts::MCP_CONNECT_SCOPE`), sprawdzany
przez `hasMcpConnectOrManageScope()` w `src/server/authz/policies/management.ts`.
Zakres to WYŁĄCZNIE `/api/mcp/` — `mcp:connect` nic nie daje na żadnej innej
trasie management (w tym na każdym innym prefiksie bypass LOCAL_ONLY, gdyby
kiedyś dodano), i jest celowo wykluczony z `MANAGEMENT_API_KEY_SCOPES`. Klucz
ze scope `manage`/`admin` nadal przechodzi carve-out jak wcześniej; `mcp:connect`
to nisko-uprzywilejowana alternatywa dla zdalnych callerów tylko-MCP, którzy nie
powinni potrzebować szerokiego dostępu management.

| Request                                         | Path                       | Wynik               |
| ----------------------------------------------- | -------------------------- | ------------------- |
| Non-loopback, brak Bearer                       | `/api/mcp/*`               | 403 LOCAL_ONLY      |
| Non-loopback, Bearer ze scope `manage`          | `/api/mcp/*`               | Allow               |
| Non-loopback, Bearer ze scope `mcp:connect`     | `/api/mcp/*`               | Allow               |
| Non-loopback, Bearer bez `manage`/`mcp:connect` | `/api/mcp/*`               | 403 LOCAL_ONLY      |
| Non-loopback, Bearer ze scope `mcp:connect`     | `/api/cli-tools/runtime/*` | 403 LOCAL_ONLY      |
| Non-loopback, Bearer ze scope `manage`          | `/api/cli-tools/runtime/*` | 403 LOCAL_ONLY      |
| Loopback, dowolny/brak Bearer                   | dowolny LOCAL_ONLY         | Allow (gate passes) |

#### Wskazówki dla operatora i audyt

Jeśli uruchamiasz OmniRoute za reverse proxy lub tunelem (nginx, Caddy, Cloudflare
Tunnel, Tailscale, Ngrok), sprawdzenie loopback nadal chroni powyższe trasy
spawn-capable — request, którego adres klienta nie jest loopback, jest odrzucany
z `403 LOCAL_ONLY` **zanim uruchomi się auth**, więc wycieknięty JWT nie dotrze
do spawnu. Zostają dwie odpowiedzialności operatora:

- **Nie „naprawiaj” 403 przez fałszowanie IP klienta jako loopback.** Ustawienie
  `X-Forwarded-For: 127.0.0.1` albo proxy, które przepisuje adres źródłowy na
  loopback, ponownie otwiera dokładnie tę klasę RCE, którą ten tier zamyka.
  Wystawiaj dashboard/API przez proxy — nigdy trasy spawn-capable.
- **Utrzymuj bypass manage-scope minimalny.** Tylko `/api/mcp/` jest bypassowalny
  i tylko z kluczem API ze scope `manage`. `SPAWN_CAPABLE_PREFIXES` nigdy nie mogą
  trafić na listę bypass — schemat zod je odrzuca, a
  `isLocalOnlyBypassableByManageScope` odmawia w runtime (defence-in-depth),
  i to właśnie dashboard oznacza przez „cannot be made bypassable”.

**Audyt dostępu** — żeby zweryfikować, że nic spoza hosta nie dociera do tych tras:

- Otwórz **Authorization Inventory** na `/dashboard/settings/security`: renderuje
  żywą listę prefiksów LOCAL_ONLY, które prefiksy są bypassowalne oraz
  compile-time zestaw spawn-capable („cannot be made bypassable”).
- Przeszukaj logi reverse-proxy / access pod kątem powyższych prefiksów w parze z
  adresem klienta non-loopback. Każde takie trafienie, które zwróciło `200` zamiast
  `403 LOCAL_ONLY`, oznacza, że proxy maskuje prawdziwe IP klienta — napraw proxy.
- `403 LOCAL_ONLY` w logach OmniRoute dla jednej z tych ścieżek to strażnik
  działający zgodnie z zamiarem, a nie błąd do wyciszenia.

### Tier 2 — ALWAYS_PROTECTED

**Egzekwowane przez:** `isAlwaysProtectedPath(path)` → pomija bypass `requireLogin=false`
**Bypass:** Brak przy `requireLogin=false`; JWT zawsze wymagany

Te trasy są destrukcyjne lub nieodwracalne. Dopuszczenie ich w instalacji
„bez hasła” oznaczałoby, że ktokolwiek w tej samej sieci LAN mógłby wymazać
bazę danych albo zabić proces serwera.

| Path                     | Powód                              |
| ------------------------ | ---------------------------------- |
| `/api/shutdown`          | Kończy proces serwera              |
| `/api/settings/database` | Eksport, import i wipe bazy danych |

**Odpowiedź przy naruszeniu:** `401 Authentication required`

### Tier 3 — MANAGEMENT (domyślny)

Wszystkie pozostałe trasy management. Auth wymagany, chyba że skonfigurowano
`requireLogin=false`. Tokeny CLI mogą uwierzytelniać te trasy (loopback + ważny HMAC).

## Kolejność ewaluacji

```
managementPolicy.evaluate(ctx)
  1. isLocalOnlyPath(path)?
     → loopback                                  → fall through
     → non-loopback, manage-scope Bearer
        AND isLocalOnlyBypassableByManageScope   → allow (management_key)
     → otherwise                                  → reject 403 LOCAL_ONLY
  2. isInternalModelSyncRequest(ctx)?
     → allow (system)
  3. hasValidCliToken(headers)?
     → allow (cli) [loopback + timingSafeEqual HMAC check]
  4. isAlwaysProtectedPath(path) or requireLogin=true?
     → isDashboardSessionAuthenticated?
        → allow (dashboard_session)
     → manage-scope Bearer on a non-bypassable path?
        → allow (management_key)
     → reject 401/403
  5. requireLogin=false?
     → allow (anonymous)
```

Gałąź manage-scope w kroku 1 to jedyna uwierzytelniona ścieżka, która może
spełnić trasę LOCAL_ONLY; tryb awarii auth-backend zwraca 503 (nie 403), żeby
wygasła baza nie downgrade'owała po cichu do „deny”.

## Dodawanie nowej trasy spawn-capable

1. Dodaj prefiks ścieżki do `LOCAL_ONLY_API_PREFIXES` w
   `src/server/authz/routeGuard.ts`
2. Dodaj test w `tests/unit/authz/routeGuard.test.ts` asertujący, że
   `isLocalOnlyPath()` zwraca true dla nowego prefiksu
3. **Nigdy nie pomijaj tego kroku** — zob. Hard Rule #15 w `CLAUDE.md`
4. Zdecyduj: czy ta trasa MA także należeć do `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`?
   Domyślna odpowiedź to **nie**. Opt-in tylko gdy trasa jest bezpieczna do
   wystawienia posiadaczowi manage-scope (tzn. NIE spawnuje dowolnego kodu
   kontrolowanego przez użytkownika).

## Dodawanie ścieżki z bypassem manage-scope

1. Potwierdź, że trasa nie wykonuje kodu ani komend dostarczonych przez użytkownika.
   Jeśli tak — stop; ten carve-out to złe narzędzie.
2. Dołącz prefiks do `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` w
   `src/server/authz/routeGuard.ts`
3. Dodaj pokrycie w `tests/unit/authz/management-policy.test.ts` dla wszystkich
   czterech kształtów requestu: brak Bearer (403), manage Bearer (allow),
   non-manage Bearer (403) oraz regresję per-prefiks, że
   `/api/cli-tools/runtime/*` pozostaje strict-loopback nawet z manage Bearer.

## Pliki

| Plik                                         | Cel                               |
| -------------------------------------------- | --------------------------------- |
| `src/server/authz/routeGuard.ts`             | Stałe i funkcje pomocnicze        |
| `src/server/authz/policies/management.ts`    | Logika ewaluacji                  |
| `tests/unit/authz/routeGuard.test.ts`        | Testy jednostkowe helperów tierów |
| `tests/unit/authz/management-policy.test.ts` | Testy jednostkowe evaluate()      |

## Dokumentowanie poziomów bezpieczeństwa w OpenAPI

Przy dodawaniu nowej trasy do `docs/openapi.yaml` zastosuj odpowiadające
rozszerzenie vendora, jeśli trasa jest klasyfikowana przez `routeGuard.ts`:

| Klasyfikacja routeGuard.ts    | Adnotacja YAML             | Egzekwowanie                                  |
| ----------------------------- | -------------------------- | --------------------------------------------- |
| `LOCAL_ONLY_API_PREFIXES`     | `x-loopback-only: true`    | Blokowane spoza loopback bezwarunkowo         |
| `ALWAYS_PROTECTED_API_PATHS`  | `x-always-protected: true` | Auth wymagany nawet przy `requireLogin=false` |
| Wewnętrzna trasa admin/debug  | `x-internal: true`         | Domyślnie ukryta z /dashboard/api-endpoints   |
| Brak (public / standard auth) | (adnotacja niepotrzebna)   | Standardowy dostęp sterowany `requireLogin`   |

### Walidacja

Dwa skrypty egzekwują spójność między adnotacjami YAML a `routeGuard.ts`:

- `scripts/check/check-openapi-coverage.mjs` — failuje, jeśli coverage < 99%
- `scripts/check/check-openapi-security-tiers.mjs` — failuje, jeśli adnotacje
  `x-loopback-only` lub `x-always-protected` rozjeżdżają się ze stałymi compile-time

Oba skrypty działają w pre-commit hooku oraz w CI.

### Reguła false positive

Jeśli `x-always-protected` lub `x-loopback-only` jest adnotowane na trasie, której
NIE ma w stałej `routeGuard.ts`, skrypt coverage failuje. Poprawka zawsze polega
na wyrównaniu YAML do tego, co faktycznie egzekwuje `routeGuard.ts` — a nie na
dodawaniu tras do `routeGuard.ts` bez implementacji logiki egzekwowania.

---

## Zobacz też

- `docs/security/CLI_TOKEN.md` — token machine-ID CLI
- `docs/architecture/AUTHZ_GUIDE.md` — pełny pipeline autoryzacji
- `docs/frameworks/MCP-SERVER.md` — transporty i scope'y serwera MCP
