---
title: "Backendy routera i usługi osadzone (ADR)"
version: 3.8.43
lastUpdated: 2026-07-02
---

# Backendy routera i usługi osadzone — kontrakt architektoniczny (ADR)

> **Status:** Accepted · **Context:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Contract:** `domain/routing/routerBackends.ts`
> (typed registry — kod ląduje wraz z [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868))

Ten ADR precyzuje, jak silniki `ts` (native), `bifrost`, `cliproxy`, `9router` oraz
kompatybilne z VibeProxy odnoszą się do siebie, aby kontrybutorzy przestali
mieszać dwie rzeczy, które są architektonicznie odrębne. Dokumentuje typed
registry wprowadzony w ramach prac router-backend-registry jako jedyne źródło
prawdy dla tego modelu.

## Kluczowe rozróżnienie — dwie ortogonalne osie

Rola silnika jest opisana przez **dwie niezależne osie**, zakodowane łącznie w
`RouterBackendDefinition` rejestru:

1. **Lifecycle** (`RouterBackendLifecycle`) — _jak silnik działa_:
   - `in-process` — działa wewnątrz procesu Node OmniRoute (natywny pipeline TS).
   - `supervised` — lokalny proces potomny, który OmniRoute instaluje/uruchamia/zatrzymuje/sprawdza
     health przez `ServiceSupervisor`, a następnie konsumuje jako połączenie providera.
   - `external` — endpoint HTTP, do którego OmniRoute dysponuje żądania, ale którego **nie**
     zarządza (konfigurowany przez bazowy URL ze zmiennej środowiskowej).
   - `disabled` — zarejestrowany, ale nie do wyboru.
2. **Selection axis** (backend routingu relay) — _czy relay do niego dysponuje_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` w
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Błąd, którego należy unikać: traktowanie „embedded service” i „routing backend” jako jednej
listy. Nie są nimi. Silnik `supervised` (9router/cliproxy) to **połączenie
providera konsumowane przez natywny pipeline**, a nie alternatywny backend dyspozycji
relay. `bifrost` to odwrotność — backend dyspozycji relay, który (historycznie)
był wyłącznie `external`.

## Rejestr — jedyne źródło prawdy

Kontrakt `domain/routing/routerBackends.ts` (kod ląduje wraz z
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)) deklaruje każdy silnik raz, z jego
lifecycle, capabilities, tożsamością usługi, domyślnym portem, konfiguracją health oraz
wsparciem telemetrii. Konsumenci wyszukują silniki przez `getRouterBackend(id)`,
`listRouterBackends()` oraz `listRouterBackendsByCapability(cap)` zamiast
obsługiwać każdy sidecar osobno.

| Backend     | Lifecycle    | Service (oś A) | Relay backend (oś B) | Health        | Default port |
| ----------- | ------------ | -------------- | -------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —              | `ts` (native)        | —             | —            |
| `bifrost`   | `external`¹  | —¹             | `bifrost` / `auto`   | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`     | — (provider)         | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`      | — (provider)         | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —              | — (provider adapter) | `/v1/models`  | —            |

¹ Promocja Bifrost do osadzonej usługi `supervised` (instalowalnej/uruchamialnej
z `/api/services/bifrost/`) jest śledzona w
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817); do czasu merge
Bifrost jest wyłącznie `external` (osiągalny tylko przez `BIFROST_BASE_URL`).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) pozwalają wywołującym
filtrować według tego, co silnik faktycznie potrafi, zamiast hardkodować gałęzie per-id.

## Oś A — usługi osadzone (strona procesu supervised)

- **Rejestr procesów supervised:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (obecnie: `9router`, `cliproxy`).
- **Właściciel lifecycle:** `src/lib/services/ServiceSupervisor.ts` — `start()` spawn’uje
  potomka, czeka na `waitForHealthy()`, przekierowuje stdout/stderr do ring buffer;
  `stop()` SIGTERM→SIGKILL; wszystko serializowane pod lockiem.
- **Unia stanów** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, plus
  ortogonalny `HealthState = healthy | unhealthy | unknown`.
- **Dlaczego osobny proces (a nie SDK in-proc)?** Izolacja procesów sprawia, że
  install/start/stop/health/logs są niezależnie sterowalne per sidecar i pozwala
  zastosować loopback spawn-guard. Modelowanie adaptera in-proc to praca przyszła — flaga
  capability `native-hot-path` to miejsce, w którym zostałoby to wyrażone.

### Kontrakt tras lifecycle (`/api/services/<tool>/…`)

Kody statusu są **z założenia zależne od stanu/czasownika/ścieżki** — to jest kontrakt, a nie
niespójność:

| Call                         | Condition                       | Status                               |
| ---------------------------- | ------------------------------- | ------------------------------------ |
| `POST .../start`             | service `not_installed`         | **409** (precondition)               |
| `POST .../stop`              | already stopped                 | **200** (idempotent no-op)           |
| `GET .../status`             | OK                              | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | spawn failure                   | **503** (transient)                  |
| `GET .../status`, `.../stop` | uncaught error                  | **500**                              |
| `GET /api/services/<x>/logs` | unknown tool `<x>`              | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | missing `X-Reveal-Confirm: yes` | **403** (9router only)               |
| **any** `/api/services/*`    | caller not loopback/private-LAN | **403 LOCAL_ONLY**                   |

Wszystkie ciała błędów są kształtowane przez `createErrorResponse()` →
`{ error: { message, type }, requestId }`, gdzie `type` jest wyprowadzany ze statusu
(`500→server_error`, `404→not_found`, `409→conflict`, else `invalid_request`) i jest
maszynowo użytecznym dyskryminatorem. Komunikaty są wstępnie sanityzowane
(`sanitizeErrorMessage()`, Hard Rule #12).

**Loopback guard** to najczęstsze źródło `403`: `/api/services/` jest w
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`), a
`src/server/authz/policies/management.ts` odrzuca każdego wywołującego spoza loopback / private-LAN
**przed auth**, ponieważ te trasy spawn’ują procesy potomne (Hard Rules 15
i 17). Dostęp przez publiczny tunnel to `403` z założenia.

## Oś B — backend routingu relay (strona dyspozycji)

Tylko ścieżka proxy relay `/api/v1/relay/chat/completions` wybiera backend
dyspozycji; główna powierzchnia `/api/v1/chat/completions` nigdy nie konsultuje
`routingBackend.ts`.

- **Selection** (`resolveRelayRoutingBackend`): jeden globalny przełącznik env —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Jeśli nieustawiony: `auto` gdy Bifrost jest skonfigurowany+włączony, w przeciwnym razie `ts`.
- **Behavior:**
  - `bifrost` (forced): awaria Bifrost → twarde `502`, bez fallbacku.
  - `auto`: spróbuj Bifrost; przy awarii/cooldown cicho przejdź na native.
  - `ts` / post-fallback: natywny pipeline translator/executor `open-sse`.
- **Cooldown:** cooldown awarii per-`baseUrl` w `bifrostCooldown.ts`.

Selection jest **dziś wszystko-albo-nic na poziomie relay** — na `release/v3.8.43` nie ma
podmiany silnika per-provider ani per-request. Bramka per-request jest dodawana
w ramach prac sidecar-manifest
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
która pozwala `auto` kierować przez Bifrost tylko providery kwalifikujące się według manifestu.

## Integracja z dashboardem

Dashboard usług odpytuje `GET /api/services/<tool>/status` co 5s przez
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`,
zwracając `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`. Nie ma wspólnego providera kontekstu dostępności —
każdy komponent wywołuje hook per tool. Przy `!res.ok` hook obecnie pokazuje
gołe `HTTP <status>`; mapowanie pola `error.type` na ludzkie wyjaśnienie to
śledzona poprawa UX, a nie zmiana kontraktu.

## Konsekwencje

- Nowe silniki rejestrują się raz w `ROUTER_BACKENDS`; konsumenci uzyskują je przez zapytania
  capability bez nowych gałęzi per-id.
- Na pytanie „czy to service, czy routing backend?” odpowiada pole `lifecycle`, a nie
  to, na której liście akurat pojawia się id.
- Supervisja Bifrost (#5817) i migracja native hot-path (#5670) budują na tym
  wspólnym kontrakcie zamiast specjalnie obsługiwać każdy sidecar.
