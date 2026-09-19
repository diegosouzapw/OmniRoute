# Embedded Services (Română)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Versiune:** v3.8.44
> **Ultima actualizare:** 2026-07-03
> **Public-țintă:** Ingineri care adaugă, întrețin sau depanează servicii încorporate (9Router, CLIProxyAPI, Mux, Bifrost).

Serviciile încorporate sunt instrumente auxiliare de tip sidecar, instalate local, pe care OmniRoute le instalează, le supraveghează și
le expune drept ținte de rutare de prim rang. Spre deosebire de furnizorii externi (care sunt accesați prin internet
folosind chei API), serviciile încorporate rulează pe aceeași mașină ca OmniRoute și comunică prin interfața loopback.

---

## Cuprins

1. [Prezentare generală](#1-overview)
2. [Arhitectură — 4 niveluri](#2-architecture--4-layers)
3. [Mașina de stări a ciclului de viață](#3-lifecycle-state-machine)
4. [Referință API](#4-api-reference)
5. [Securitate](#5-security)
6. [Adăugarea unui serviciu încorporat nou](#6-adding-a-new-embedded-service)
7. [Depanare](#7-troubleshooting)
8. [Întrebări frecvente](#8-faq)

---

## 1. Prezentare generală

### De ce servicii încorporate?

Sunt încorporate cinci servicii:

| Serviciu        | Pachet npm                                  | Port implicit | Scop                                                                                                                                                                                                                  |
| --------------- | ------------------------------------------- | :-----------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                                   |     20130     | Router AI pe care OmniRoute îl poate utiliza ca subfurnizor. Modelele sunt expuse sub forma `9router/{sub}/{model}`                                                                                                   |
| **CLIProxyAPI** | Binar dintr-o versiune GitHub (`cliproxy`)  |     8317      | Adaptor proxy local pentru fluxurile de autentificare Anthropic CLI. Oferă rutare de rezervă atunci când tokenurile OAuth expiră                                                                                      |
| **Mux**         | `mux` (`mux server` fără interfață grafică) |     8322      | Daemon local de orchestrare a agenților (coder/mux). Este doar gestionat pe durata ciclului de viață — nu reprezintă o țintă de rutare (fără proxy LLM).                                                              |
| **Bifrost**     | `@maximhq/bifrost`                          |     8080      | Backend de retransmisie pentru gateway-ul AI Go. Atunci când rulează, este selectat automat de ruta de retransmisie (`/v1/relay/`)                                                                                    |
| **Dario**       | `@askalf/dario`                             |     3456      | Proxy pentru abonamente Claude — alternativă/soluție de rezervă la CLIProxyAPI pentru trafic cu structura Claude Code; cheia injectată devine `DARIO_ADMIN_TOKEN`, care protejează planul de control OAuth `/admin/*` |

Toate cele cinci urmează același model de supraveghere:

- OmniRoute le instalează în `DATA_DIR/services/{name}/` (izolat de propriul fișier `package.json` al OmniRoute)
- OmniRoute le pornește și le monitorizează ca procese copil
- OmniRoute injectează o cheie API efemeră în mediul procesului copil și o rotește fără întreruperi (acolo unde este cazul)
- Toate rutele de administrare (`/api/services/*`) sunt **LOCAL_ONLY** — accesibile numai prin interfața loopback (regula strictă nr. 17)

### Decizii-cheie (din planul de proiectare)

| Decizie                                                   | Valoare                                                                                               |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Accesul din panoul de control la interfața nativă 9Router | Proxy invers la `/dashboard/providers/services/9router/embed/*`                                       |
| Mecanism de instalare                                     | `npm install {package}` prin `execFile` (fără interpolare în shell)                                   |
| Mod de utilizare                                          | Furnizor înregistrat ca `9router/{sub}/{model}` în motorul de rutare                                  |
| Gestionarea cheilor API                                   | OmniRoute le generează, le criptează în repaus (AES-256-GCM) și le injectează prin variabile de mediu |
| Locația în panoul de control                              | `/dashboard/providers/services` (trei file)                                                           |
| Pornire automată                                          | Comutator pentru fiecare serviciu, dezactivat implicit                                                |

---

## 2. Arhitectură — 4 straturi

```
┌────────────────────────────────────────────────────────────────────┐
│  Stratul 1 — Interfață utilizator                                  │
│  /dashboard/providers/services  (file: CLIProxyAPI | 9Router | Mux)│
│  Jurnale live (SSE), Pornire/Oprire/Repornire/Actualizare, Setări, Instalare│
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Cadru + rutare file prin ?tab=       │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (fetch Next.js)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Stratul 2 — API (LOCAL_ONLY — numai loopback)                     │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (proxy invers HTTP + WebSocket → sursa 9Router)                 │
│                                                                    │
│  Protecție: LOCAL_ONLY_API_PREFIXES include "/api/services/" și    │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ apeluri în cadrul procesului
┌──────────────────────▼─────────────────────────────────────────────┐
│  Stratul 3 — ServiceSupervisor (src/lib/services/)                 │
│                                                                    │
│  ServiceSupervisor.ts   Supervizor generic (child_process.spawn)   │
│    ├── install:    execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── start:      spawn(node, [entrypoint], {env, cwd})           │
│    ├── api_key:    crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── port:       20130 pentru 9Router (configurabil)             │
│    ├── logs:       buffer circular stdio de 5 MB → evenimente SSE  │
│    ├── health:     HTTP GET /health la fiecare 2–5 s, recuperare întârziată│
│    └── lifecycle:  SIGTERM 15 s → SIGKILL                          │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Inițializează toate SERVICES[] la pornirea procesului│
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       GET /v1/models periodic → tabelul service_models│
│  ringBuffer.ts      Buffer circular de jurnale (5 MB per serviciu) │
│  healthCheck.ts     Sondă HTTP periodică pentru starea de sănătate │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts             │
│                      (adaptoare de instalare)                      │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP compatibil cu OpenAI (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Stratul 4 — Furnizor / Rutare                                     │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Reobține portul și cheia API la fiecare solicitare (fără cache).│
│    Elimină prefixul "9router/" din ID-ul modelului înainte de proxy.│
│    Returnează 503 service_not_running dacă supervizorul nu este în "running".│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Intrare pentru "9router": isEmbeddedService: true               │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Modele stocate ca "9router/{sub}/{model}" (cu prefix).          │
│    Sincronizate la fiecare 5 min de modelSync.ts.                  │
│                                                                    │
│  Mux are gestionat NUMAI ciclul de viață (Straturile 1-3) — este un│
│  daemon de orchestrare a agenților, nu un proxy LLM, deci nu are o │
│  intrare de executor/furnizor în Stratul 4 și nu este niciodată o  │
│  țintă de rutare.                                                  │
└────────────────────────────────────────────────────────────────────┘
```

### Fișiere-sursă principale

| Fișier                                      | Rol                                                               |
| ------------------------------------------- | ----------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Clasa principală: ciclu de viață, blocare, stare, buffer circular |
| `src/lib/services/bootstrap.ts`             | Înregistrare la nivel de proces și pornire automată               |
| `src/lib/services/registry.ts`              | Mapă singleton `instrument → supervizor`                          |
| `src/lib/services/apiKey.ts`                | Generarea cheilor, criptare AES-256-GCM în repaus                 |
| `src/lib/services/modelSync.ts`             | Sincronizare periodică a modelelor (5 min) + la cerere            |
| `src/lib/services/ringBuffer.ts`            | Buffer circular de jurnale de 5 MB cu abonare SSE                 |
| `src/lib/services/healthCheck.ts`           | Verificare HTTP a stării (interval configurabil)                  |
| `src/lib/services/installers/ninerouter.ts` | Instalare/actualizare/dezinstalare npm pentru 9Router             |
| `src/lib/services/installers/cliproxy.ts`   | Instalare/actualizare/dezinstalare npm pentru CLIProxyAPI         |
| `src/lib/services/installers/mux.ts`        | Instalare/actualizare/dezinstalare npm pentru Mux                 |
| `src/app/api/services/9router/_lib.ts`      | Funcție auxiliară `getOrInitSupervisor()`                         |
| `src/app/api/services/[name]/logs/route.ts` | Endpoint partajat pentru jurnale SSE                              |
| `open-sse/executors/ninerouter.ts`          | Executor pentru furnizor (stratul 4)                              |

---

## 3. Mașina de stări a ciclului de viață

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
             verificare reușită    │         oprire / SIGTERM   │
                               ┌────▼─────┐  (ieșire în 5 s)    │
                               │ running  │──── oprire ─────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Stările sunt stocate în tabelul DB `version_manager` (coloana `status`) și reflectate
în starea din memorie a `ServiceSupervisor`. Starea din memorie este autoritară pentru
un proces care rulează; starea DB reprezintă opțiunea alternativă persistentă la pornire.

### Tranziții de stare

| De la           | Eveniment                                       | La                      |
| --------------- | ----------------------------------------------- | ----------------------- |
| `not_installed` | `install()` reușește                            | `stopped`               |
| `stopped`       | este apelat `start()`                           | `starting`              |
| `starting`      | verificarea de sănătate returnează 200          | `running`               |
| `starting`      | procesul se încheie înainte de a deveni sănătos | `error`                 |
| `running`       | este apelat `stop()`                            | `stopping` → `stopped`  |
| `running`       | procesul se încheie neașteptat (< 5 s)          | `error` (oprire rapidă) |
| `running`       | procesul se încheie neașteptat (> 5 s)          | `error`                 |
| `error`         | este apelat `start()`                           | `starting`              |
| orice stare     | `stop()` în timpul stării `stopping`            | nicio operație          |

### Blocarea operațiilor

`ServiceSupervisor` serializează operațiile ciclului de viață printr-o blocare asincronă a operațiilor
(`withLock()`). Apelurile concurente ale `start()` pe același supervisor determină exact
o singură lansare a procesului; al doilea apelant așteaptă și returnează starea existentă. Acest lucru previne
condițiile de cursă atunci când, de exemplu, pornirea automată și un buton din interfața cu utilizatorul sunt declanșate simultan.

---

## 4. Referință API

Toate rutele de sub `/api/services/` sunt **LOCAL_ONLY** (numai loopback, regula strictă #17).
Solicitările care nu provin de la loopback primesc `403 LOCAL_ONLY`, indiferent de tokenul de autentificare.

### 4.1 Endpointuri 9Router (11 rute)

#### `POST /api/services/9router/install`

Instalează 9Router din npm. Creează `DATA_DIR/services/9router/` cu propriile fișiere
`package.json` și `node_modules/`. Nu intră în conflict cu dependențele proprii ale OmniRoute.

**Corpul solicitării** (toate câmpurile sunt opționale):

```json
{ "version": "latest" }
```

| Câmp      | Tip      | Valoare implicită | Descriere                                       |
| --------- | -------- | ----------------- | ----------------------------------------------- |
| `version` | `string` | `"latest"`        | Etichetă de versiune npm sau semver de instalat |

**Răspunsuri:**

| Stare | Descriere                                                                     |
| ----- | ----------------------------------------------------------------------------- |
| `200` | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                        |
| `400` | Corp de solicitare nevalid (validarea Zod a eșuat)                            |
| `409` | Instalare deja în curs (blocare deținută)                                     |
| `500` | Instalarea npm a eșuat — consultați `message` pentru o eroare ușor de înțeles |

**Note:** Utilizează `execFile('npm', [...])` — fără shell, fără interpolare (regula strictă #13).
Erorile EACCES sunt prezentate sub forma unor mesaje ușor de înțeles.

---

#### `POST /api/services/9router/start`

Pornește 9Router. Înregistrează un supervisor dacă nu este deja înregistrat, apoi apelează
`supervisor.start()`. Este idempotent dacă serviciul rulează deja.

**Corpul solicitării:** niciunul

**Răspunsuri:**

| Stare | Descriere                                                    |
| ----- | ------------------------------------------------------------ |
| `200` | Obiect `ServiceStatus` (consultați schema de mai jos)        |
| `409` | 9Router nu este instalat (`status: "not_installed"`)         |
| `503` | Pornirea a eșuat (eroare de proces — consultați `lastError`) |

**Schema ServiceStatus:**

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

Oprește controlat 9Router. Trimite SIGTERM, așteaptă 15 s, apoi trimite SIGKILL dacă procesul încă rulează.
Este idempotent dacă serviciul este deja oprit.

**Corpul solicitării:** niciunul

**Răspunsuri:**

| Stare | Descriere                          |
| ----- | ---------------------------------- |
| `200` | `ServiceStatus` (state: "stopped") |
| `503` | Oprirea a eșuat în mod neașteptat  |

---

#### `POST /api/services/9router/restart`

Echivalent cu `stop()` urmat de `start()` sub blocarea operațiilor.

**Corpul solicitării:** niciunul

**Răspunsuri:** aceleași ca pentru `start` (returnează valoarea finală `ServiceStatus`).

---

#### `POST /api/services/9router/update`

Actualizează 9Router la o versiune npm mai nouă. Dacă serviciul rulează, acesta este oprit
mai întâi, este executată instalarea npm (instalând versiunea mai nouă în aceeași locație), iar apoi
serviciul este repornit.

**Corpul solicitării** (toate câmpurile sunt opționale):

```json
{ "version": "latest" }
```

**Răspunsuri:**

| Stare | Descriere                                                       |
| ----- | --------------------------------------------------------------- |
| `200` | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400` | Corp nevalid                                                    |
| `500` | Actualizarea npm a eșuat                                        |

---

#### `POST /api/services/9router/rotate-key`

Generează o nouă cheie API pentru 9Router, o criptează pentru stocare și repornește serviciul
(dacă rulează), astfel încât acesta să preia noua cheie din mediul său. Cheia veche este
invalidată imediat.

**Corpul cererii:** niciunul

**Răspunsuri:**

| Stare | Descriere                                  |
| ----- | ------------------------------------------ |
| `200` | `{ keyRotated: true, restarted: boolean }` |
| `500` | Rotirea a eșuat                            |

**Securitate:** Noua cheie nu este returnată niciodată în răspuns (fără scurgeri de credențiale).
Aceasta este stocată în formă criptată (AES-256-GCM) în tabelul `version_manager`.

---

#### `GET /api/services/9router/status`

Returnează starea combinată în timp real + din baza de date, inclusiv metadatele versiunii și previzualizarea cheii API.

**Răspunsuri:**

| Stare | Descriere                    |
| ----- | ---------------------------- |
| `200` | Consultați schema de mai jos |
| `500` | Citirea stării a eșuat       |

**Schema răspunsului:**

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

Comută indicatorul de pornire automată. Când `enabled: true`, serviciul pornește automat
data viitoare când pornește OmniRoute (dacă serviciul este instalat).

**Corpul cererii:**

```json
{ "enabled": true }
```

**Răspunsuri:**

| Stare | Descriere             |
| ----- | --------------------- |
| `200` | `{ autoStart: true }` |
| `400` | Corp nevalid          |

---

#### `GET /api/services/9router/logs`

Flux SSE de jurnale în timp real din memoria tampon circulară stdout/stderr a 9Router.

**Parametri de interogare:**

| Parametru | Tip       | Implicit | Descriere                                                                              |
| --------- | --------- | -------- | -------------------------------------------------------------------------------------- |
| `tail`    | `integer` | 200      | Numărul de linii istorice trimise inițial (maximum 1000)                               |
| `filter`  | `string`  | niciunul | Filtru de subșir fără a ține cont de majuscule (fără regex — protejat împotriva ReDoS) |

**Evenimente SSE:**

| Eveniment   | Date        | Descriere                             |
| ----------- | ----------- | ------------------------------------- |
| `snapshot`  | `LogLine[]` | Secțiunea istorică inițială           |
| `log`       | `LogLine`   | Linie de jurnal în timp real          |
| `heartbeat` | `{}`        | Menținerea conexiunii la fiecare 15 s |

**Schema LogLine:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Răspunsuri:**

| Stare | Descriere                                                    |
| ----- | ------------------------------------------------------------ |
| `200` | `text/event-stream`                                          |
| `400` | Parametrul `filter` este prea lung (> 200 caractere)         |
| `404` | Serviciul nu a fost găsit (supervizorul nu este înregistrat) |

---

### 4.2 Endpointuri CLIProxyAPI (10 rute)

CLIProxyAPI are aceeași structură de endpointuri ca 9Router, fără `rotate-key`, dar cu
`accounts`, `provider-expose` și `auto-restart-adopted`. Acum primește o
cheie API dedicată pentru planul de date, injectată la lansare (`needsApiKey: true` în
`bootstrap.ts`, utilizată pentru sincronizarea modelelor); `status` include mai puține câmpuri.

| Metodă | Cale                                | Descriere                                         |
| ------ | ----------------------------------- | ------------------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | Instalează CLIProxyAPI din npm                    |
| `POST` | `/api/services/cliproxy/start`      | Pornește CLIProxyAPI                              |
| `POST` | `/api/services/cliproxy/stop`       | Oprește CLIProxyAPI                               |
| `POST` | `/api/services/cliproxy/restart`    | Repornește CLIProxyAPI                            |
| `POST` | `/api/services/cliproxy/update`     | Actualizează la o versiune mai nouă               |
| `GET`  | `/api/services/cliproxy/status`     | Stare în timp real + din BD (fără `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Comută pornirea automată                          |

Endpointul comun `GET /api/services/{name}/logs` (consultați §4.1) funcționează pentru toate
cele patru servicii utilizând segmentul dinamic `[name]`.

---

### 4.3 Endpointuri Mux (8 rute)

Mux are aceeași structură de endpointuri ca CLIProxyAPI — fără ruta `rotate-key` în suprafața
API (tokenul bearer este generat în același mod ca al 9Router prin
`getOrCreateApiKey("mux")` și injectat prin variabila de mediu `MUX_SERVER_AUTH_TOKEN`, dar
încă nu există un endpoint dedicat pentru rotire). Mux este gestionat doar din punctul de vedere al ciclului de viață: spre deosebire de
9Router, nu are un executor Layer 4 și nu este înregistrat niciodată ca furnizor de rutare.

| Metodă | Cale                           | Descriere                               |
| ------ | ------------------------------ | --------------------------------------- |
| `POST` | `/api/services/mux/install`    | Instalează Mux din npm (`npm i mux`)    |
| `POST` | `/api/services/mux/start`      | Pornește Mux (`mux server`)             |
| `POST` | `/api/services/mux/stop`       | Oprește Mux                             |
| `POST` | `/api/services/mux/restart`    | Repornește Mux                          |
| `POST` | `/api/services/mux/update`     | Actualizează la o versiune npm mai nouă |
| `GET`  | `/api/services/mux/status`     | Stare în timp real + din BD             |
| `POST` | `/api/services/mux/auto-start` | Comută pornirea automată                |

---

### 4.4 Endpointuri Bifrost (8 rute)

Bifrost este un backend releu de tip gateway AI scris în Go (`@maximhq/bifrost`). Utilizează aceeași
structură de endpointuri ca CLIProxyAPI (fără `rotate-key` — Bifrost își gestionează propriile chei
de furnizor în `config.json`, în directorul său `-app-dir`).

| Metodă | Cale                               | Descriere                                                                      |
| ------ | ---------------------------------- | ------------------------------------------------------------------------------ |
| `POST` | `/api/services/bifrost/install`    | Instalează Bifrost din npm (`@maximhq/bifrost`)                                |
| `POST` | `/api/services/bifrost/start`      | Pornește Bifrost pe portul 8080 (implicit)                                     |
| `POST` | `/api/services/bifrost/stop`       | Oprește Bifrost                                                                |
| `POST` | `/api/services/bifrost/restart`    | Repornește Bifrost                                                             |
| `POST` | `/api/services/bifrost/update`     | Actualizează la o versiune mai nouă                                            |
| `GET`  | `/api/services/bifrost/status`     | Stare în timp real + BD                                                        |
| `POST` | `/api/services/bifrost/auto-start` | Activează/dezactivează pornirea automată                                       |
| `GET`  | `/api/services/bifrost/logs`       | Flux SSE de la finalul jurnalului (prin ruta dinamică partajată `[name]/logs`) |

**Configurarea rutării:** Când `BIFROST_BASE_URL` nu este setată, iar instanța Bifrost
supravegheată rulează, `getBifrostRoutingConfig()` (din `routingBackend.ts`) utilizează automat
`http://127.0.0.1:{port}` drept URL de bază pentru retransmitere. Variabila de mediu `BIFROST_BASE_URL`
setată explicit are întotdeauna prioritate.

---

### 4.5 Endpointuri Dario (12 rute)

Aceeași structură a ciclului de viață ca pentru celelalte servicii (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`), plus un plan de control OAuth
protejat prin token sub `admin/`: `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (toate protejate prin `DARIO_ADMIN_TOKEN`).

### 4.6 Proxy invers (încorporarea panoului de control 9Router)

Panoul de control încorporează interfața web 9Router într-un iframe prin intermediul unui proxy
invers intern la:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Acest proxy:

- Redirecționează cererea către `http://127.0.0.1:{port}/{path}` (doar prin interfața loopback)
- Elimină anteturile `cookie` și `authorization` din cererea primită (fără divulgarea sesiunii OmniRoute)
- Injectează `Authorization: Bearer {apiKey}` pentru autentificarea 9Router
- Elimină din răspuns `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*`
- Rescrie răspunsurile HTML pentru a injecta `<base href>` și a normaliza căile absolute (`/foo` → `/dashboard/.../embed/foo`)

Actualizările WebSocket pentru panoul de control încorporat sunt gestionate de un server asociat pe un
port dedicat (consultați `src/lib/services/embedWsProxy.ts`).

**Securitate:** Rutele proxy-ului de încorporare sunt clasificate sub `LOCAL_ONLY_API_PREFIXES`
și pot fi accesate numai prin interfața loopback. Un atacator care obține un JWT printr-un
tunel Cloudflare/Ngrok nu poate folosi proxy-ul pentru a accesa serviciile încorporate.

---

## 5. Securitate

### Aplicarea LOCAL_ONLY (regula strictă #17)

Toate rutele din `/api/services/` și `/dashboard/providers/services/*/embed/` sunt
clasificate drept LOCAL_ONLY în `src/server/authz/routeGuard.ts`. Verificarea loopback
rulează necondiționat înaintea oricărei ramuri de autentificare:

```
sosește solicitarea
  → isLocalOnlyPath(path)?
      → non-loopback → 403 LOCAL_ONLY (întotdeauna, înaintea verificării autentificării)
      → loopback     → continuă cu autentificarea normală
```

Acest lucru împiedică un JWT compromis (de exemplu, printr-un tunel) să declanșeze `npm install` sau
pornirea proceselor. Consultați `docs/security/ROUTE_GUARD_TIERS.md` pentru matricea
completă a nivelurilor.

### Injectarea cheii API

9Router și Mux necesită o cheie API/un token bearer pentru propriile endpointuri HTTP.
OmniRoute:

1. Generează o cheie prin `crypto.randomBytes(32).toString("base64url")`, cu un
   prefix specific serviciului (`nr_` pentru 9Router, `mx_` pentru Mux).
2. O criptează în repaus utilizând AES-256-GCM (același cifru utilizat pentru acreditările furnizorilor).
3. O decriptează și o injectează ca variabilă de mediu la pornire —
   `NINEROUTER_API_KEY` pentru 9Router, `MUX_SERVER_AUTH_TOKEN` pentru Mux (niciodată un flag CLI,
   astfel încât tokenul să nu apară niciodată în `ps`/listele de procese).
4. Nu returnează niciodată cheia în text clar în niciun răspuns HTTP.

CLIProxyAPI primește o cheie dedicată pentru planul de date, injectată la pornire
(`needsApiKey: true` — utilizată pentru sincronizarea modelelor cu adaptorul).

### Protecție împotriva SSRF

Proxy-ul HTTP invers (`/dashboard/.../embed/[...path]`) este configurat explicit să redirecționeze
numai către `http://127.0.0.1:{port}`. Acesta nu urmează niciodată redirecționări către destinații
non-loopback. Biblioteca `ssrf-req-filter` este utilizată pentru a respinge orice URL upstream care
se rezolvă în afara intervalului loopback.

### Siguranța shell-ului (regula strictă #13)

`npm install` este invocat prin `execFile('npm', ['install', pkg, '--prefix', dir])` —
fără șabloane literale, fără shell, fără interpolarea căilor externe în șirul comenzii.
Valorile din timpul execuției (porturi, chei API) sunt transmise prin obiectul `env` al procesului copil.

### Igienizarea erorilor (regula strictă #12)

Toate răspunsurile de eroare de la `/api/services/*` trec prin `buildErrorBody()` sau
`sanitizeErrorMessage()`. Valorile brute `err.stack` și `err.message` nu sunt returnate niciodată
ca atare apelantului.

---

## 6. Adăugarea unui nou serviciu încorporat

Urmați acești 8 pași. Consultați implementările existente din `src/lib/services/installers/`
și `src/app/api/services/` drept referință canonică.

### Pasul 1 — Creați programul de instalare

Creați `src/lib/services/installers/{name}.ts` după modelul `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // alegeți un port liber

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Utilizați `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` din `installers/utils.ts`
— niciodată `execSync` sau interpolarea prin shell.

### Pasul 2 — Înregistrați în bootstrap

Adăugați un `ServiceEntry` în matricea `SERVICES` din `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false dacă nu este necesară nicio cheie API
}
```

Extindeți `buildSpawnArgsFactory()` pentru a gestiona `cfg.tool === "myservice"`.

#### Contract extensibil pentru pluginurile furnizorilor (Faza 1, #7333)

`src/lib/services/providerPlugins/` introduce un contract `ServiceProviderPlugin` care
împachetează câmpurile `ServiceEntry` din `bootstrap.ts` ale unui backend și câmpurile șablonului
de manifest din `serviceBackends.ts` într-un singur obiect, în loc ca structura aceluiași backend să fie
exprimată separat în două fișiere fără legătură. La momentul redactării, **doar `9router` a fost
migrat** — `bootstrap.ts` își derivă intrarea `SERVICES[]` din
`getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`),
generând o eroare la pornire dacă pluginul lipsește vreodată. `cliproxy`, `mux` și `bifrost`
rămân neschimbate, folosind literalii inline `SERVICES[]` preexistenți.

`open-sse/config/providerPluginManifest.ts` a primit și o funcție auxiliară aditivă
`createServiceBackendManifestEntry(pluginId, template)`, care construiește o intrare
`ProviderPluginManifestEntry` corect formată dintr-o intrare `SERVICE_BACKEND_MANIFEST_TEMPLATE` — aceasta
**nu** este încă integrată în nicio cale activă de solicitare (nici în `generateProviderPluginManifestFromRegistry()`,
nici în `/v1/providers/[provider]/models`); acest lucru rămâne de realizat ulterior, după ce contractul este
validat pentru un al doilea backend.

Amânate pentru PR-uri ulterioare și urmărite în problema #7333: migrarea `cliproxyapi` prin același
registru, generalizarea `mux`/`bifrost` în uniunea `ServiceBackendPluginId`,
integrarea tratării speciale a rutării executorului (`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`) în contractul pluginului și conectarea
`createServiceBackendManifestEntry()` la o cale activă de cod pentru manifest/modele.

### Pasul 3 — Adăugați migrarea și datele inițiale în BD

Asigurați-vă că serviciul are un rând în `version_manager` printr-o migrare din
`src/lib/db/migrations/`. Rândul trebuie să conțină:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Pasul 4 — Creați cele 7 endpointuri API

În `src/app/api/services/{name}/`:

```
_lib.ts            funcția auxiliară getOrInitSupervisor()
install/route.ts   POST — apelează installer.install()
start/route.ts     POST — apelează supervisor.start()
stop/route.ts      POST — apelează supervisor.stop()
restart/route.ts   POST — apelează supervisor.restart()
update/route.ts    POST — apelează installer.update()
status/route.ts    GET  — combină starea live cu cea din BD
auto-start/route.ts POST — comută flagul auto_start
```

Ruta partajată `GET /api/services/[name]/logs` este deja configurată — nu sunt necesare
modificări acolo.

Delegați toate răspunsurile de eroare prin `createErrorResponse()` / `buildErrorBody()`.

### Pasul 5 — Adăugarea în LOCAL_ONLY_API_PREFIXES

În `src/server/authz/routeGuard.ts`, verificați dacă `/api/services/` este deja inclus.
Dacă introduceți un prefix nou (de exemplu, `/api/tools/`), adăugați-l atât în
`LOCAL_ONLY_API_PREFIXES`, cât și, dacă lansează procese, în `SPAWN_CAPABLE_PREFIXES`.
Adăugați un test în `tests/unit/authz/routeGuard.test.ts`.

### Pasul 6 — Adăugarea filei în interfața cu utilizatorul

Creați `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Reutilizați componentele partajate:

- `ServiceStatusCard` — stare în timp real + indicator de funcționare
- `ServiceLifecycleButtons` — Pornire / Oprire / Repornire / Actualizare
- `ServiceLogsPanel` — afișarea în timp real a jurnalelor prin SSE (se conectează la `/api/services/{name}/logs`)
- `ApiKeyCard` — afișarea + rotirea cheii (dacă `needsApiKey: true`)

Înregistrați fila în `ServicesPageShell.tsx`.

### Pasul 7 — Adăugarea intrării furnizorului (dacă serviciul este o destinație de rutare)

Dacă serviciul încorporat expune un endpoint `/v1/chat/completions` compatibil cu OpenAI:

1. Adăugați o intrare de furnizor în `src/shared/constants/providers.ts` cu `isEmbeddedService: true`.
2. Creați `open-sse/executors/{name}.ts` care extinde `BaseExecutor`. Reobțineți portul și
   cheia API pentru fiecare solicitare (nu le stocați niciodată în memoria cache în constructor). Returnați un răspuns
   `503 service_not_running` atunci când starea supervizorului nu este `"running"`.
3. Înregistrați modelele în `open-sse/config/providerRegistry.ts` folosind prefixul serviciului
   (de exemplu, `myservice/sub/model`). `modelSync.ts` le va menține actualizate.

### Pasul 8 — Documentare și testare

1. Actualizați `docs/frameworks/EMBEDDED-SERVICES.md` (acest fișier) — adăugați serviciul în
   tabelul din §1 și orice endpoint-uri noi în §4.
2. Adăugați teste unitare în `tests/unit/services/` (ciclu de viață, program de instalare, structura API).
3. Adăugați un test de integrare în `tests/integration/services/` (condiționat de `RUN_SERVICES_INT=1`).
4. Actualizați `docs/openapi.yaml` cu noile endpoint-uri.

---

## 7. Depanarea problemelor

### Serviciul nu pornește

**Simptome:** Butonul de pornire returnează 503, iar starea rămâne `"error"` sau `"starting"`.

**Listă de verificare:**

1. Verificați `GET /api/services/{name}/logs` (sau panoul Logs din tabloul de bord). Căutați
   linii precum `Error: ENOENT`, `address already in use` sau `Cannot find module`.
2. Verificați dacă `npm` se află în PATH: rulați `which npm` din același cont de utilizator care rulează OmniRoute.
3. Verificați dacă serviciul este instalat: consultați `GET /api/services/{name}/status` pentru
   `installedVersion`. Dacă este `null`, executați mai întâi instalarea.
4. Verificați dacă `DATA_DIR/services/{name}/node_modules/` există și nu este gol.
5. Verificați câmpul `lastError` din răspunsul de stare pentru motivul filtrat al închiderii.

---

### Pornirea la rece este lentă (> 10 s până la atingerea stării `running`)

**Simptome:** Starea rămâne `"starting"` mult timp înainte de a trece la `"running"` sau `"error"`.

**Explicație:** Pornirea la rece a 9Router include importarea unor arbori mari de dependențe (module DNS,
tunel și MITM). Intervalul implicit al verificării stării de funcționare este de 2 s, cu 3 încercări înainte ca
supervizorul să declare expirarea timpului de așteptare (dar continuă interogarea).

**Remediere:** Valoarea `healthIntervalMs` și timpul de așteptare pentru `waitForHealthy`
(`healthIntervalMs * 3`) pot fi configurate în `bootstrap.ts`. Pentru serviciile cu timpi de
pornire mai lungi, măriți `healthIntervalMs` la 5000 și `stopTimeoutMs` la 30 000.

---

### Conflict de port (`EADDRINUSE`)

**Simptome:** Jurnalele afișează `address already in use :::20130`.

**Cauze:**

- Un alt proces utilizează deja portul 20130.
- Un proces 9Router anterior nu a fost oprit complet (PID zombie).

**Remediere:**

1. Schimbați portul implicit prin variabila de mediu `NINEROUTER_PORT` din `.env`.
2. Găsiți și opriți forțat procesul care provoacă acest conflict: `lsof -ti :20130 | xargs kill -9`.
3. Portul poate fi configurat pentru fiecare serviciu în `bootstrap.ts`, prin câmpul `port`.

**Notă:** 9Router utilizează implicit portul 20130 tocmai pentru a evita un conflict cu
portul implicit 20128 al OmniRoute.

---

### Permisiune refuzată (EACCES) la instalare

**Simptome:** Instalarea returnează 500, iar jurnalele afișează `EACCES` sau `permission denied`.

**Cauze:**

- `DATA_DIR` sau directorul său părinte nu permite scrierea de către procesul OmniRoute.
- Rularea într-un container Docker fără privilegii root, fără acces de scriere la volumul mapat.

**Remediere:**

1. Verificați `DATA_DIR` (implicit: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Asigurați-vă că utilizatorul procesului OmniRoute deține directorul: `chown -R $USER ~/.omniroute/`
3. În Docker, asigurați-vă că montarea volumului are permisiunile corecte pentru utilizatorul containerului.

---

### Actualizarea eșuează (expirarea timpului de așteptare pentru `npm install` sau eroare de rețea)

**Simptome:** Actualizarea returnează 500 cu `InstallError`, iar jurnalele afișează expirarea timpului de așteptare al rețelei.

**Listă de verificare:**

1. Confirmați că registrul npm este accesibil: `npm ping`.
2. Verificați dacă există un proxy corporativ: `npm config get proxy`, `npm config get https-proxy`.
3. Încercați instalarea manuală: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Dacă sistemul este izolat de rețea, descărcați în prealabil arhiva și utilizați `npm install /path/to/tarball.tgz`.

---

### Serviciul afișează starea `"error"` imediat după pornire (blocare rapidă)

**Simptome:** Starea trece de la `"starting"` la `"error"` în mai puțin de 5 secunde.
`lastError` afișează `"Fast crash (exited with code 1)"`.

**Listă de verificare:**

1. Citiți întreaga secțiune finală a jurnalului: `GET /api/services/{name}/logs?tail=500`.
2. Cauză frecventă: lipsesc variabilele de mediu necesare serviciului.
3. Pentru 9Router: verificați dacă `NINEROUTER_DISABLE_MITM=true` și
   `NINEROUTER_DISABLE_TUNNEL=true` se află în mediul transmis la generarea procesului (consultați
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. Întrebări frecvente

**Î: Pot expune endpoint-urile serviciilor încorporate clienților non-loopback?**

Nu. Nivelul LOCAL_ONLY este intenționat (regula strictă nr. 17). Rutele care pot invoca
`npm install` sau pot porni procese `node` nu trebuie să fie accesibile traficului
non-loopback, deoarece un JWT divulgat printr-un tunel (Cloudflare, Ngrok, Tailscale)
ar permite altfel pornirea arbitrară a proceselor. Nu există nicio excepție opțională
pentru `/api/services/` — spre deosebire de `/api/mcp/`, acesta este exclus din lista
de ocolire pentru domeniul de acces manage. Consultați `docs/security/ROUTE_GUARD_TIERS.md`.

---

**Î: Vor fi disponibile 9Router și CLIProxyAPI în implementările de producție/cloud?**

Da. Ambele servicii urmează același model local-first ca OmniRoute. Acestea rulează
pe aceeași mașină și comunică prin loopback. „Producție” înseamnă aici VPS-ul sau
serverul local pe care este implementat OmniRoute, nu un furnizor cloud la distanță.

---

**Î: Cum depanez supervizorul?**

1. Urmăriți fluxul de jurnale SSE: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Verificați jurnalele structurate din ieșirea pino a OmniRoute, filtrate după
   spațiul de nume `service:supervisor`.
3. Inspectați rândul din baza de date: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Utilizați `GET /api/services/9router/status` pentru a vedea într-un singur apel starea curentă în timp real, PID-ul, starea de sănătate
   și `lastError`.

---

**Î: Supervizorul afișează `health: "degraded"` sau `health: "unknown"`, dar starea este `"running"`. Este o problemă?**

`"degraded"` înseamnă că verificarea stării de sănătate a returnat un răspuns diferit de 200. `"unknown"` înseamnă că nicio
verificare nu s-a încheiat încă (condiție de cursă cu prima interogare). Ambele sunt tranzitorii în timpul pornirii.
Dacă starea de sănătate rămâne `"degraded"` mai mult de `healthIntervalMs * 3` ms după
`"running"`, serviciul încorporat rulează, dar API-ul său HTTP nu răspunde. Verificați
dacă portul este corect în răspunsul de stare și dacă serviciul ascultă efectiv
pe acel port.

---

**Î: Pot schimba cheia API 9Router fără o repornire completă?**

Nu. Cheia API este transmisă către 9Router printr-o variabilă de mediu în momentul pornirii procesului.
Variabilele de mediu nu pot fi modificate într-un proces aflat în execuție. `POST .../rotate-key`
oprește și repornește automat serviciul pentru a aplica noua cheie. Rotația cheii
intră în vigoare în limita valorii `stopTimeoutMs` a serviciului (implicit 15 s), plus timpul său
de pornire.

---

**Î: Care este limita bufferului circular și ce se întâmplă când acesta se umple?**

Fiecare serviciu are un buffer circular dedicat de 5 MB. Când bufferul este plin, cele mai vechi
linii de jurnal sunt eliminate pentru a face loc celor noi. Evenimentul SSE `snapshot` returnează
cele mai recente linii în limita `tail`. Jurnalele nu sunt păstrate pe disc decât dacă
`logsBufferPath` este setat în rândul din baza de date.

---

## Consultați și

- `docs/security/ROUTE_GUARD_TIERS.md` — detalii despre nivelul LOCAL_ONLY
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 Maparea modulului Servicii încorporate
- `docs/architecture/ARCHITECTURE.md` — context la nivel de sistem
- `docs/openapi.yaml` — definiții ale endpoint-urilor într-un format prelucrabil automat
- `CLAUDE.md` §„Adăugarea unui nou serviciu încorporat” — listă de verificare pentru consultare rapidă
