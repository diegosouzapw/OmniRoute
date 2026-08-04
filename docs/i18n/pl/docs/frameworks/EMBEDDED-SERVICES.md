---
title: "Usługi wbudowane"
description: "Reference for 9Router, CLIProxyAPI, Mux, and Bifrost"
---

# Usługi wbudowane

> **Version:** v3.8.44
> **Last updated:** 2026-07-03
> **Audience:** Inżynierowie dodający, utrzymujący lub debugujący usługi wbudowane (9Router, CLIProxyAPI, Mux, Bifrost).

Usługi wbudowane to lokalnie instalowane procesy sidecar, które OmniRoute instaluje, nadzoruje i
udostępnia jako pełnoprawne cele routingu. W przeciwieństwie do zewnętrznych providerów (osiąganych przez internet
przez klucze API), usługi wbudowane działają na tej samej maszynie co OmniRoute i komunikują się przez loopback.

---

## Spis treści

1. [Przegląd](#1-przegląd)
2. [Architektura — 4 warstwy](#2-architektura--4-warstwy)
3. [Maszyna stanów cyklu życia](#3-maszyna-stanów-cyklu-życia)
4. [Referencja API](#4-referencja-api)
5. [Bezpieczeństwo](#5-bezpieczeństwo)
6. [Dodawanie nowej usługi wbudowanej](#6-dodawanie-nowej-usługi-wbudowanej)
7. [Rozwiązywanie problemów](#7-rozwiązywanie-problemów)
8. [FAQ](#8-faq)

---

## 1. Przegląd

### Po co usługi wbudowane?

Od v3.8.44 wbudowane są cztery usługi:

| Usługa          | Pakiet npm                                     | Port domyślny | Cel                                                                                                                        |
| --------------- | ---------------------------------------------- | :-----------: | -------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                                      |     20130     | Router AI, którego OmniRoute może używać jako sub-providera. Modele jako `9router/{sub}/{model}`                           |
| **CLIProxyAPI** | `@anthropic/cli-proxy` (via `cliproxy` binary) |     auto      | Lokalny adapter proxy dla przepływów auth Anthropic CLI. Zapewnia routing fallback, gdy wygasają tokeny OAuth              |
| **Mux**         | `mux` (headless `mux server`)                  |     8322      | Lokalny daemon orkiestracji agentów (coder/mux). Tylko zarządzanie cyklem życia — nie jest celem routingu (bez proxy LLM). |
| **Bifrost**     | `@maximhq/bifrost`                             |     8080      | Backend relay bramy AI w Go. Gdy działa, automatycznie wybierany przez trasę relay (`/v1/relay/`)                          |

Wszystkie cztery podlegają temu samemu modelowi nadzoru:

- OmniRoute instaluje je pod `DATA_DIR/services/{name}/` (odizolowane od własnego `package.json` OmniRoute)
- OmniRoute uruchamia je i monitoruje jako procesy potomne
- OmniRoute wstrzykuje efemeryczny klucz API do środowiska potomka i rotuje go bez przestoju (gdzie dotyczy)
- Wszystkie trasy zarządzania (`/api/services/*`) są **LOCAL_ONLY** — dostępne tylko z loopback (hard rule #17)

### Kluczowe decyzje (z planu projektowego)

| Decyzja                                   | Wartość                                                                   |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| Dostęp dashboardu do natywnego UI 9Router | Reverse proxy pod `/dashboard/providers/services/9router/embed/*`         |
| Mechanizm instalacji                      | `npm install {package}` przez `execFile` (bez interpolacji shella)        |
| Tryb konsumpcji                           | Provider zarejestrowany jako `9router/{sub}/{model}` w silniku routingu   |
| Zarządzanie kluczem API                   | OmniRoute generuje, szyfruje at-rest (AES-256-GCM) i wstrzykuje przez env |
| Lokalizacja dashboardu                    | `/dashboard/providers/services` (trzy zakładki)                           |
| Auto-start                                | Przełącznik per usługa, domyślnie OFF                                     |

---

## 2. Architektura — 4 warstwy

```
┌────────────────────────────────────────────────────────────────────┐
│  Layer 1 — UI                                                      │
│  /dashboard/providers/services  (tabs: CLIProxyAPI | 9Router | Mux)│
│  Logs live (SSE), Start/Stop/Restart/Update, Settings, Install     │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Shell + tab routing by ?tab=         │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Layer 2 — API (LOCAL_ONLY — loopback only)                        │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (reverse HTTP + WebSocket proxy → 9Router upstream)             │
│                                                                    │
│  Gate: LOCAL_ONLY_API_PREFIXES includes "/api/services/" and       │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ in-process calls
┌──────────────────────▼─────────────────────────────────────────────┐
│  Layer 3 — ServiceSupervisor (src/lib/services/)                   │
│                                                                    │
│  ServiceSupervisor.ts   Generic supervisor (child_process.spawn)   │
│    ├── install:    execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── start:      spawn(node, [entrypoint], {env, cwd})           │
│    ├── api_key:    crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── port:       20130 for 9Router (configurable)                │
│    ├── logs:       stdio ring buffer 5 MB → SSE events             │
│    ├── health:     HTTP GET /health every 2–5 s, lazy recovery     │
│    └── lifecycle:  SIGTERM 15 s → SIGKILL                          │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Bootstraps all SERVICES[] at process start     │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       Periodic GET /v1/models → service_models table │
│  ringBuffer.ts      Circular log buffer (5 MB per service)         │
│  healthCheck.ts     Polling HTTP health probe                      │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts             │
│                      (installer adapters)                          │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ OpenAI-compatible HTTP (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Layer 4 — Provider / Routing                                      │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Re-looks up port and API key per-request (no caching).          │
│    Strips "9router/" prefix from model id before proxying.         │
│    Returns 503 service_not_running if supervisor not in "running". │
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Entry for "9router": isEmbeddedService: true                    │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Models stored as "9router/{sub}/{model}" (prefixed).            │
│    Synced every 5 min by modelSync.ts.                             │
│                                                                    │
│  Mux is lifecycle-managed ONLY (Layers 1-3) — it is an agent-       │
│  orchestration daemon, not an LLM proxy, so it has no Layer 4      │
│  executor/provider entry and is never a routing target.            │
└────────────────────────────────────────────────────────────────────┘
```

### Kluczowe pliki źródłowe

| Plik                                        | Rola                                                |
| ------------------------------------------- | --------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Klasa rdzenia: lifecycle, lock, health, ring buffer |
| `src/lib/services/bootstrap.ts`             | Rejestracja na poziomie procesu i auto-start        |
| `src/lib/services/registry.ts`              | Mapa singleton `tool → supervisor`                  |
| `src/lib/services/apiKey.ts`                | Generowanie kluczy, szyfrowanie AES-256-GCM at-rest |
| `src/lib/services/modelSync.ts`             | Okresowa synchronizacja modeli (5 min) + on-demand  |
| `src/lib/services/ringBuffer.ts`            | Okrągły bufor logów 5 MB z subskrypcją SSE          |
| `src/lib/services/healthCheck.ts`           | Sonda HTTP health (konfigurowalny interwał)         |
| `src/lib/services/installers/ninerouter.ts` | npm install/update/uninstall dla 9Router            |
| `src/lib/services/installers/cliproxy.ts`   | npm install/update/uninstall dla CLIProxyAPI        |
| `src/lib/services/installers/mux.ts`        | npm install/update/uninstall dla Mux                |
| `src/app/api/services/9router/_lib.ts`      | Helper `getOrInitSupervisor()`                      |
| `src/app/api/services/[name]/logs/route.ts` | Współdzielony endpoint logów SSE                    |
| `open-sse/executors/ninerouter.ts`          | Executor providera (Layer 4)                        |

---

## 3. Maszyna stanów cyklu życia

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
                  health probe ok   │         crash / SIGTERM    │
                               ┌────▼─────┐  (exit within 5s)   │
                               │ running  │──── crash ──────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Stany są przechowywane w tabeli DB `version_manager` (kolumna `status`) i mirrored
w stanie in-memory `ServiceSupervisor`. Stan in-memory jest autorytatywny dla
działającego procesu; stan DB to trwały fallback przy starcie.

### Przejścia stanów

| Z               | Zdarzenie                             | Do                     |
| --------------- | ------------------------------------- | ---------------------- |
| `not_installed` | `install()` sukces                    | `stopped`              |
| `stopped`       | wywołano `start()`                    | `starting`             |
| `starting`      | sonda health zwraca 200               | `running`              |
| `starting`      | proces kończy się przed healthy       | `error`                |
| `running`       | wywołano `stop()`                     | `stopping` → `stopped` |
| `running`       | nieoczekiwane wyjście procesu (< 5 s) | `error` (fast crash)   |
| `running`       | nieoczekiwane wyjście procesu (> 5 s) | `error`                |
| `error`         | wywołano `start()`                    | `starting`             |
| any             | `stop()` podczas `stopping`           | no-op                  |

### Blokada operacji

`ServiceSupervisor` serializuje operacje cyklu życia przez asynchroniczną blokadę operacji
(`withLock()`). Równoległe wywołania `start()` na tym samym supervisorze dają dokładnie
jeden spawn; drugi caller czeka i zwraca istniejący status. Zapobiega to
race condition, gdy np. auto-start i przycisk UI odpalą się jednocześnie.

---

## 4. Referencja API

Wszystkie trasy pod `/api/services/` są **LOCAL_ONLY** (tylko loopback, hard rule #17).
Żądania spoza loopback dostają `403 LOCAL_ONLY` niezależnie od tokenu auth.

### 4.1 Endpointy 9Router (8 tras)

#### `POST /api/services/9router/install`

Instaluje 9Router z npm. Tworzy `DATA_DIR/services/9router/` z własnym
`package.json` i `node_modules/`. Nie koliduje z zależnościami OmniRoute.

**Body żądania** (wszystkie opcjonalne):

```json
{ "version": "latest" }
```

| Pole      | Typ      | Domyślnie  | Opis                                    |
| --------- | -------- | ---------- | --------------------------------------- |
| `version` | `string` | `"latest"` | Tag wersji npm lub semver do instalacji |

**Odpowiedzi:**

| Status | Opis                                                                  |
| ------ | --------------------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                |
| `400`  | Nieprawidłowe body żądania (błąd walidacji Zod)                       |
| `409`  | Już trwa instalacja (lock held)                                       |
| `500`  | npm install nie powiodło się — zobacz `message` dla przyjaznego błędu |

**Uwagi:** Używa `execFile('npm', [...])` — bez shella, bez interpolacji (hard rule #13).
Błędy EACCES są zwracane jako przyjazne komunikaty.

---

#### `POST /api/services/9router/start`

Uruchamia 9Router. Rejestruje supervisor, jeśli jeszcze nie zarejestrowany, potem wywołuje
`supervisor.start()`. Idempotentne, gdy już działa.

**Body żądania:** brak

**Odpowiedzi:**

| Status | Opis                                                       |
| ------ | ---------------------------------------------------------- |
| `200`  | Obiekt `ServiceStatus` (zob. schemat poniżej)              |
| `409`  | 9Router nie jest zainstalowany (`status: "not_installed"`) |
| `503`  | Start nie powiódł się (błąd procesu — zobacz `lastError`)  |

**Schemat ServiceStatus:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

Graceful stop 9Router. Wysyła SIGTERM, czeka 15 s, potem SIGKILL jeśli nadal żyje.
Idempotentne, gdy już zatrzymane.

**Body żądania:** brak

**Odpowiedzi:**

| Status | Opis                                 |
| ------ | ------------------------------------ |
| `200`  | `ServiceStatus` (state: "stopped")   |
| `503`  | Stop nie powiódł się niespodziewanie |

---

#### `POST /api/services/9router/restart`

Równoważne `stop()` potem `start()` pod blokadą operacji.

**Body żądania:** brak

**Odpowiedzi:** takie same jak `start` (zwraca finalny `ServiceStatus`).

---

#### `POST /api/services/9router/update`

Aktualizuje 9Router do nowszej wersji npm. Jeśli usługa działa, najpierw jest zatrzymywana,
uruchamiane jest npm install (instalacja nowszej wersji in-place), a potem
usługa jest restartowana.

**Body żądania** (wszystkie opcjonalne):

```json
{ "version": "latest" }
```

**Odpowiedzi:**

| Status | Opis                                                            |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Nieprawidłowe body                                              |
| `500`  | npm update nie powiodło się                                     |

---

#### `POST /api/services/9router/rotate-key`

Generuje nowy klucz API dla 9Router, szyfruje go at-rest i restartuje usługę
(jeśli działa), żeby pobrała nowy klucz ze środowiska. Stary klucz jest
unieważniany natychmiast.

**Body żądania:** brak

**Odpowiedzi:**

| Status | Opis                                       |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Rotacja nie powiodła się                   |

**Bezpieczeństwo:** Nowy klucz nigdy nie wraca w odpowiedzi (brak wycieku credentials).
Jest przechowywany zaszyfrowany (AES-256-GCM) w tabeli `version_manager`.

---

#### `GET /api/services/9router/status`

Zwraca połączony status live + DB, w tym metadane wersji i podgląd klucza API.

**Odpowiedzi:**

| Status | Opis                           |
| ------ | ------------------------------ |
| `200`  | Zobacz schemat poniżej         |
| `500`  | Odczyt statusu nie powiódł się |

**Schemat odpowiedzi:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

Przełącza flagę auto-start. Gdy `enabled: true`, usługa startuje automatycznie
przy następnym boot OmniRoute (jeśli jest zainstalowana).

**Body żądania:**

```json
{ "enabled": true }
```

**Odpowiedzi:**

| Status | Opis                  |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | Nieprawidłowe body    |

---

#### `GET /api/services/9router/logs`

Strumień SSE żywych logów z ring buffera stdout/stderr 9Router.

**Parametry query:**

| Param    | Typ       | Domyślnie | Opis                                                     |
| -------- | --------- | --------- | -------------------------------------------------------- |
| `tail`   | `integer` | 200       | Ile historycznych linii wysłać najpierw (max 1000)       |
| `filter` | `string`  | none      | Filtr podciągu case-insensitive (bez regex — ReDoS-safe) |

**Zdarzenia SSE:**

| Event       | Data        | Opis                        |
| ----------- | ----------- | --------------------------- |
| `snapshot`  | `LogLine[]` | Początkowy historyczny tail |
| `log`       | `LogLine`   | Żywa linia logu             |
| `heartbeat` | `{}`        | Keep-alive co 15 s          |

**Schemat LogLine:**

```json
{ "ts": 1716633600000, "stream": "stdout", "line": "[9router] Listening on :20130" }
```

**Odpowiedzi:**

| Status | Opis                                                  |
| ------ | ----------------------------------------------------- |
| `200`  | `text/event-stream`                                   |
| `400`  | Parametr `filter` za długi (> 200 znaków)             |
| `404`  | Usługa nie znaleziona (supervisor nie zarejestrowany) |

---

### 4.2 Endpointy CLIProxyAPI (7 tras)

CLIProxyAPI ma ten sam kształt endpointów co 9Router minus `rotate-key` (CLIProxyAPI
nie wymaga wstrzykniętego klucza API; uwierzytelnia się przez istniejącą konfigurację CLI
hosta), a `status` zawiera mniej pól.

| Method | Path                                | Opis                                  |
| ------ | ----------------------------------- | ------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | Instalacja CLIProxyAPI z npm          |
| `POST` | `/api/services/cliproxy/start`      | Start CLIProxyAPI                     |
| `POST` | `/api/services/cliproxy/stop`       | Stop CLIProxyAPI                      |
| `POST` | `/api/services/cliproxy/restart`    | Restart CLIProxyAPI                   |
| `POST` | `/api/services/cliproxy/update`     | Aktualizacja do nowszej wersji        |
| `GET`  | `/api/services/cliproxy/status`     | Status live + DB (bez `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Przełączanie auto-start               |

Współdzielony endpoint `GET /api/services/{name}/logs` (zob. §4.1) działa dla wszystkich
czterech usług przez dynamiczny segment `[name]`.

---

### 4.3 Endpointy Mux (7 tras)

Mux ma ten sam kształt endpointów co CLIProxyAPI — brak trasy `rotate-key` w powierzchni API
(token bearer jest generowany tak samo jak u 9Router przez
`getOrCreateApiKey("mux")` i wstrzykiwany przez env `MUX_SERVER_AUTH_TOKEN`, ale
nie ma jeszcze dedykowanego endpointu rotacji). Mux jest zarządzany tylko cyklem życia: w przeciwieństwie do
9Router nie ma executora Layer 4 i nigdy nie jest rejestrowany jako provider routingu.

| Method | Path                           | Opis                               |
| ------ | ------------------------------ | ---------------------------------- |
| `POST` | `/api/services/mux/install`    | Instalacja Mux z npm (`npm i mux`) |
| `POST` | `/api/services/mux/start`      | Start Mux (`mux server`)           |
| `POST` | `/api/services/mux/stop`       | Stop Mux                           |
| `POST` | `/api/services/mux/restart`    | Restart Mux                        |
| `POST` | `/api/services/mux/update`     | Aktualizacja do nowszej wersji npm |
| `GET`  | `/api/services/mux/status`     | Status live + DB                   |
| `POST` | `/api/services/mux/auto-start` | Przełączanie auto-start            |

---

### 4.4 Endpointy Bifrost (7 tras)

Bifrost to backend relay bramy AI w Go (`@maximhq/bifrost`). Używa tego samego
kształtu endpointów co CLIProxyAPI (bez `rotate-key` — Bifrost zarządza własnymi kluczami
providerów w `config.json` pod swoim `-app-dir`).

| Method | Path                               | Opis                                                                |
| ------ | ---------------------------------- | ------------------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | Instalacja Bifrost z npm (`@maximhq/bifrost`)                       |
| `POST` | `/api/services/bifrost/start`      | Start Bifrost na porcie 8080 (domyślnie)                            |
| `POST` | `/api/services/bifrost/stop`       | Stop Bifrost                                                        |
| `POST` | `/api/services/bifrost/restart`    | Restart Bifrost                                                     |
| `POST` | `/api/services/bifrost/update`     | Aktualizacja do nowszej wersji                                      |
| `GET`  | `/api/services/bifrost/status`     | Status live + DB                                                    |
| `POST` | `/api/services/bifrost/auto-start` | Przełączanie auto-start                                             |
| `GET`  | `/api/services/bifrost/logs`       | Tail logów SSE (przez współdzieloną dynamiczną trasę `[name]/logs`) |

**Podpięcie routingu:** Gdy `BIFROST_BASE_URL` nie jest ustawione i nadzorowana instancja Bifrost
działa, `getBifrostRoutingConfig()` (w `routingBackend.ts`) automatycznie
używa `http://127.0.0.1:{port}` jako bazowego URL relay. Jawne env `BIFROST_BASE_URL`
zawsze ma pierwszeństwo.

---

### 4.4 Reverse proxy (embed dashboardu 9Router)

Dashboard osadza web UI 9Router w iframe przez wewnętrzny reverse
proxy pod:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Ten proxy:

- Przekazuje żądanie do `http://127.0.0.1:{port}/{path}` (tylko loopback)
- Usuwa przychodzące nagłówki `cookie` i `authorization` (brak wycieku sesji OmniRoute)
- Wstrzykuje `Authorization: Bearer {apiKey}` do uwierzytelnienia 9Router
- Usuwa z odpowiedzi `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*`
- Przepisuje odpowiedzi HTML, wstrzykując `<base href>` i normalizując ścieżki absolutne (`/foo` → `/dashboard/.../embed/foo`)

Upgrade WebSocket dla osadzonego dashboardu obsługuje companion server na
dedykowanym porcie (zob. `src/lib/services/embedWsProxy.ts`).

**Bezpieczeństwo:** Trasy embed proxy są sklasyfikowane pod `LOCAL_ONLY_API_PREFIXES`
i dostępne tylko z loopback. Atakujący, który uzyska JWT przez
tunel Cloudflare/Ngrok, nie może proxy'ować do usług wbudowanych.

---

## 5. Bezpieczeństwo

### Egzekwowanie LOCAL_ONLY (hard rule #17)

Wszystkie trasy pod `/api/services/` i `/dashboard/providers/services/*/embed/` są
sklasyfikowane jako LOCAL_ONLY w `src/server/authz/routeGuard.ts`. Sprawdzenie loopback
działa bezwarunkowo przed jakąkolwiek gałęzią auth:

```
request arrives
  → isLocalOnlyPath(path)?
      → non-loopback → 403 LOCAL_ONLY (always, before auth check)
      → loopback    → fall through to normal auth
```

To zapobiega temu, by wyciekły JWT (np. przez tunel) wywołał `npm install` lub
spawn procesów. Pełna macierz tierów: `docs/security/ROUTE_GUARD_TIERS.md`.

### Wstrzykiwanie klucza API

9Router i Mux wymagają klucza API / tokenu bearer dla własnych endpointów HTTP.
OmniRoute:

1. Generuje klucz przez `crypto.randomBytes(32).toString("base64url")` z
   prefiksem specyficznym dla usługi (`nr_` dla 9Router, `mx_` dla Mux).
2. Szyfruje go at-rest AES-256-GCM (ten sam cipher co credentials providerów).
3. Deszyfruje i wstrzykuje jako zmienną środowiskową przy spawn —
   `NINEROUTER_API_KEY` dla 9Router, `MUX_SERVER_AUTH_TOKEN` dla Mux (nigdy flaga CLI,
   więc token nie pojawia się w `ps`/listach procesów).
4. Nigdy nie zwraca plaintext klucza w żadnej odpowiedzi HTTP.

CLIProxyAPI nie wymaga wstrzykniętego klucza (uwierzytelnia się przez istniejącą
konfigurację CLI hosta).

### Obrona SSRF

Reverse HTTP proxy (`/dashboard/.../embed/[...path]`) jest na sztywno ustawiony, by forwardować
tylko do `http://127.0.0.1:{port}`. Nigdy nie podąża za redirectami poza
loopback. Biblioteka `ssrf-req-filter` odrzuca każdy upstream URL, który
resolvuje poza zakres loopback.

### Bezpieczeństwo shella (hard rule #13)

`npm install` jest wywoływane przez `execFile('npm', ['install', pkg, '--prefix', dir])` —
bez template literal, bez shella, bez interpolacji zewnętrznych ścieżek w string
komend. Wartości runtime (porty, klucze API) są przekazywane przez obiekt `env` potomka.

### Sanityzacja błędów (hard rule #12)

Wszystkie odpowiedzi błędów z `/api/services/*` przechodzą przez `buildErrorBody()` lub
`sanitizeErrorMessage()`. Surowe `err.stack` i `err.message` nigdy nie wracają
verbatim do callera.

---

## 6. Dodawanie nowej usługi wbudowanej

Wykonaj te 8 kroków. Kanoniczna referencja: istniejące implementacje w `src/lib/services/installers/`
i `src/app/api/services/`.

### Krok 1 — Utwórz installer

Utwórz `src/lib/services/installers/{name}.ts` wzorując się na `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // pick a free port

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Używaj `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` z `installers/utils.ts`
— nigdy `execSync` ani interpolacji shella.

### Krok 2 — Zarejestruj w bootstrap

Dodaj `ServiceEntry` do tablicy `SERVICES` w `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false if no API key needed
}
```

Rozszerz `buildSpawnArgsFactory()`, by obsłużyć `cfg.tool === "myservice"`.

#### Kontrakt pluginów providerów (Phase 1, #7333)

`src/lib/services/providerPlugins/` wprowadza kontrakt `ServiceProviderPlugin`, który
pakuje pola `ServiceEntry` z `bootstrap.ts` backendu oraz pola szablonu manifestu
`serviceBackends.ts` w jeden obiekt, zamiast wyrażać kształt tego samego backendu
osobno w dwóch niepowiązanych plikach. Na chwilę pisania **tylko `9router` jest
zmigrowany** — `bootstrap.ts` wyprowadza wpis `SERVICES[]` z
`getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`),
rzucając błąd startu, jeśli plugin kiedykolwiek zniknie. `cliproxy`, `mux` i `bifrost`
pozostają na dotychczasowych inline literalach `SERVICES[]` bez zmian.

`open-sse/config/providerPluginManifest.ts` dostał też addytywny helper
`createServiceBackendManifestEntry(pluginId, template)`, który buduje poprawny
`ProviderPluginManifestEntry` z wpisu `SERVICE_BACKEND_MANIFEST_TEMPLATE` — **nie**
jest jeszcze podpięty do żadnej żywej ścieżki żądań (ani `generateProviderPluginManifestFromRegistry()`,
ani `/v1/providers/[provider]/models`); to follow-up, gdy kontrakt sprawdzi się
dla drugiego backendu.

Odłożone do follow-up PR-ów, śledzone pod issue #7333: migracja `cliproxyapi` przez
ten sam registry, uogólnienie `mux`/`bifrost` do unii `ServiceBackendPluginId`,
wciągnięcie special-case routingu executora (`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`) do kontraktu pluginu oraz podpięcie
`createServiceBackendManifestEntry()` do żywej ścieżki manifest/models.

### Krok 3 — Dodaj migrację i seed DB

Upewnij się, że usługa ma wiersz w `version_manager` przez migrację w
`src/lib/db/migrations/`. Wiersz powinien mieć:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Krok 4 — Utwórz 7 endpointów API

Pod `src/app/api/services/{name}/`:

```
_lib.ts            getOrInitSupervisor() helper
install/route.ts   POST — calls installer.install()
start/route.ts     POST — calls supervisor.start()
stop/route.ts      POST — calls supervisor.stop()
restart/route.ts   POST — calls supervisor.restart()
update/route.ts    POST — calls installer.update()
status/route.ts    GET  — merges live + DB status
auto-start/route.ts POST — toggles auto_start flag
```

Współdzielona trasa `GET /api/services/[name]/logs` jest już podpięta — nie trzeba
tam nic zmieniać.

Deleguj wszystkie odpowiedzi błędów przez `createErrorResponse()` / `buildErrorBody()`.

### Krok 5 — Dodaj do LOCAL_ONLY_API_PREFIXES

W `src/server/authz/routeGuard.ts` sprawdź, że `/api/services/` jest już na liście.
Jeśli wprowadzasz nowy prefiks (np. `/api/tools/`), dodaj go do obu:
`LOCAL_ONLY_API_PREFIXES` oraz, jeśli spawnuje procesy, do `SPAWN_CAPABLE_PREFIXES`.
Dodaj test w `tests/unit/authz/routeGuard.test.ts`.

### Krok 6 — Dodaj zakładkę UI

Utwórz `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Użyj współdzielonych komponentów:

- `ServiceStatusCard` — stan live + badge health
- `ServiceLifecycleButtons` — Start / Stop / Restart / Update
- `ServiceLogsPanel` — tail logów SSE (łączy się z `/api/services/{name}/logs`)
- `ApiKeyCard` — reveal + rotate klucza (jeśli `needsApiKey: true`)

Zarejestruj zakładkę w `ServicesPageShell.tsx`.

### Krok 7 — Dodaj wpis providera (jeśli usługa jest celem routingu)

Jeśli usługa wbudowana eksponuje endpoint OpenAI-compatible `/v1/chat/completions`:

1. Dodaj wpis providera w `src/shared/constants/providers.ts` z `isEmbeddedService: true`.
2. Utwórz `open-sse/executors/{name}.ts` rozszerzający `BaseExecutor`. Ponownie lookup portu i
   klucza API per-request (nigdy nie cache'uj w konstruktorze). Zwróć `503 service_not_running`,
   gdy stan supervisora nie jest `"running"`.
3. Zarejestruj modele w `open-sse/config/providerRegistry.ts` z prefiksem usługi
   (np. `myservice/sub/model`). `modelSync.ts` będzie je aktualizować.

### Krok 8 — Udokumentuj i przetestuj

1. Zaktualizuj `docs/frameworks/EMBEDDED-SERVICES.md` (ten plik) — dodaj usługę do
   tabeli w §1 i ewentualne nowe endpointy do §4.
2. Dodaj testy jednostkowe w `tests/unit/services/` (lifecycle, installer, kształt API).
3. Dodaj test integracyjny w `tests/integration/services/` (za `RUN_SERVICES_INT=1`).
4. Zaktualizuj `docs/openapi.yaml` o nowe endpointy.

---

## 7. Rozwiązywanie problemów

### Usługa nie startuje

**Objawy:** Przycisk Start zwraca 503, stan zostaje `"error"` lub `"starting"`.

**Checklista:**

1. Sprawdź `GET /api/services/{name}/logs` (lub panel Logs w dashboardzie). Szukaj
   linii typu `Error: ENOENT`, `address already in use` lub `Cannot find module`.
2. Zweryfikuj, że `npm` jest w PATH: `which npm` z tego samego konta użytkownika, które uruchamia OmniRoute.
3. Zweryfikuj instalację usługi: sprawdź `GET /api/services/{name}/status` pod kątem
   `installedVersion`. Jeśli `null`, najpierw uruchom install.
4. Sprawdź, że `DATA_DIR/services/{name}/node_modules/` istnieje i nie jest puste.
5. Sprawdź pole `lastError` w odpowiedzi statusu pod kątem sanityzowanego powodu wyjścia.

---

### Cold start jest wolny (> 10 s do osiągnięcia `running`)

**Objawy:** Stan zostaje `"starting"` długo, zanim przejdzie do `"running"` lub `"error"`.

**Wyjaśnienie:** Cold start 9Router obejmuje import dużych drzew zależności (DNS,
tunnel, moduły MITM). Domyślny interwał health to 2 s z 3 próbami, zanim
supervisor ogłosi timeout (ale dalej polluje).

**Naprawa:** `healthIntervalMs` i timeout `waitForHealthy`
(`healthIntervalMs * 3`) są konfigurowalne w `bootstrap.ts`. Dla usług z dłuższym
czasem startu zwiększ `healthIntervalMs` do 5000 i `stopTimeoutMs` do 30 000.

---

### Kolizja portu (`EADDRINUSE`)

**Objawy:** Logi pokazują `address already in use :::20130`.

**Przyczyny:**

- Inny proces już używa portu 20130.
- Poprzedni proces 9Router nie został w pełni zatrzymany (zombie PID).

**Naprawa:**

1. Zmień domyślny port przez zmienną środowiskową `NINEROUTER_PORT` w `.env`.
2. Znajdź i zabij kolidujący proces: `lsof -ti :20130 | xargs kill -9`.
3. Port jest konfigurowalny per usługa w `bootstrap.ts` przez pole `port`.

**Uwaga:** 9Router domyślnie używa portu 20130 właśnie po to, by nie kolidować z
domyślnym portem OmniRoute 20128.

---

### Permission denied (EACCES) przy install

**Objawy:** Install zwraca 500, logi pokazują `EACCES` lub `permission denied`.

**Przyczyny:**

- `DATA_DIR` lub jego rodzic nie jest zapisywalny przez proces OmniRoute.
- Uruchomienie w Docker rootless bez zapisu do zamapowanego volume.

**Naprawa:**

1. Sprawdź `DATA_DIR` (domyślnie: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Upewnij się, że użytkownik procesu OmniRoute jest właścicielem katalogu: `chown -R $USER ~/.omniroute/`
3. W Docker upewnij się, że mount volume ma poprawne uprawnienia dla użytkownika kontenera.

---

### Update fails (`npm install` timeout lub błąd sieci)

**Objawy:** Update zwraca 500 z `InstallError`, logi pokazują network timeout.

**Checklista:**

1. Potwierdź dostępność rejestru npm: `npm ping`.
2. Sprawdź corporate proxy: `npm config get proxy`, `npm config get https-proxy`.
3. Spróbuj instalacji ręcznie: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Przy air-gap pre-download tarball i użyj `npm install /path/to/tarball.tgz`.

---

### Usługa pokazuje stan `"error"` zaraz po starcie (fast crash)

**Objawy:** Stan przechodzi z `"starting"` do `"error"` w mniej niż 5 sekund.
`lastError` pokazuje `"Fast crash (exited with code 1)"`.

**Checklista:**

1. Przeczytaj pełny tail logów: `GET /api/services/{name}/logs?tail=500`.
2. Częsta przyczyna: brakujące zmienne środowiskowe oczekiwane przez usługę.
3. Dla 9Router: zweryfikuj, że `NINEROUTER_DISABLE_MITM=true` i
   `NINEROUTER_DISABLE_TUNNEL=true` są w env przekazanym przy spawn (zob.
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. FAQ

**Q: Czy mogę udostępnić endpointy usług wbudowanych klientom spoza loopback?**

Nie. Tier LOCAL_ONLY jest zamierzony (hard rule #17). Trasy mogące wywołać
`npm install` lub spawn procesów `node` nie mogą być osiągalne z ruchu spoza loopback,
bo wyciekły JWT przez tunel (Cloudflare, Ngrok, Tailscale) pozwalałby
inaczej na arbitralny spawn procesów. Nie ma opt-out carve-out dla
`/api/services/` — w przeciwieństwie do `/api/mcp/` jest wykluczone z listy manage-scope bypass.
Zob. `docs/security/ROUTE_GUARD_TIERS.md`.

---

**Q: Czy 9Router i CLIProxyAPI będą dostępne w deploymentach production/cloud?**

Tak. Obie usługi idą tym samym modelem local-first co sam OmniRoute. Działają
na tej samej maszynie i komunikują się przez loopback. „Production” oznacza tu VPS
lub lokalny serwer, na którym wdrożono OmniRoute, a nie zdalnego providera chmurowego.

---

**Q: Jak debugować supervisor?**

1. Tail strumienia logów SSE: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Sprawdź strukturalne logi w output pino OmniRoute filtrowane po
   namespace `service:supervisor`.
3. Podejrzyj wiersz DB: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Użyj `GET /api/services/9router/status`, by zobaczyć bieżący stan live, PID, health
   i `lastError` w jednym wywołaniu.

---

**Q: Supervisor pokazuje `health: "degraded"` lub `health: "unknown"`, ale stan to `"running"`. Czy to problem?**

`"degraded"` oznacza, że sonda health zwróciła odpowiedź inną niż 200. `"unknown"` oznacza, że żadna
sonda jeszcze się nie zakończyła (race z pierwszym pollem). Oba są przejściowe przy starcie.
Jeśli health zostaje `"degraded"` dłużej niż `healthIntervalMs * 3` ms po
`"running"`, usługa wbudowana działa, ale jej HTTP API nie odpowiada. Sprawdź,
czy port w odpowiedzi statusu jest poprawny i czy usługa faktycznie
nasłuchuje na tym porcie.

---

**Q: Czy mogę zmienić klucz API 9Router bez pełnego restartu?**

Nie. Klucz API jest przekazywany do 9Router przez zmienną środowiskową przy spawn.
Zmiennych środowiskowych nie da się zmienić w działającym procesie. `POST .../rotate-key`
automatycznie stopuje i restartuje usługę, by zastosować nowy klucz. Rotacja klucza
wchodzi w życie w czasie `stopTimeoutMs` usługi (domyślnie 15 s) plus jej czas
startu.

---

**Q: Jaki jest limit ring buffera i co się dzieje, gdy się zapełni?**

Każda usługa ma dedykowany ring buffer 5 MB. Gdy bufor jest pełny, najstarsze
linie logów są usuwane, by zrobić miejsce na nowe. Zdarzenie SSE `snapshot` zwraca
najnowsze linie w limicie `tail`. Logi nie są persystowane na dysk, chyba że
`logsBufferPath` jest ustawione w wierszu DB.

---

## Zobacz też

- `docs/security/ROUTE_GUARD_TIERS.md` — szczegóły tieru LOCAL_ONLY
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 mapowanie modułu Embedded Services
- `docs/architecture/ARCHITECTURE.md` — kontekst systemowy
- `docs/openapi.yaml` — maszynowo czytelne definicje endpointów
- `CLAUDE.md` §"Adding a New Embedded Service" — checklista szybkiej referencji
