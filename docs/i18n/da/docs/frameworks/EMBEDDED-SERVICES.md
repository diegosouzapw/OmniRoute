# Embedded Services (Dansk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Version:** v3.8.44
> **Senest opdateret:** 2026-09-09
> **Målgruppe:** Ingeniører, der tilføjer, vedligeholder eller fejlsøger indlejrede tjenester (9Router, CLIProxyAPI, Mux, Bifrost, open-wa).

Indlejrede tjenester er lokalt installerede sidecar-procesværktøjer, som OmniRoute installerer, overvåger og
eksponerer som fuldgyldige routingmål. I modsætning til eksterne udbydere (som tilgås via internettet
ved hjælp af API-nøgler) kører indlejrede tjenester på samme maskine som OmniRoute og kommunikerer via loopback.

---

## Indholdsfortegnelse

1. [Oversigt](#1-overview)
2. [Arkitektur — 4 lag](#2-architecture--4-layers)
3. [Tilstandsmaskine for livscyklus](#3-lifecycle-state-machine)
4. [API-reference](#4-api-reference)
5. [Sikkerhed](#5-security)
6. [Tilføjelse af en ny indlejret tjeneste](#6-adding-a-new-embedded-service)
7. [Fejlfinding](#7-troubleshooting)
8. [Ofte stillede spørgsmål](#8-faq)

---

## 1. Oversigt

### Hvorfor indlejrede tjenester?

Seks tjenester er indlejret:

| Tjeneste        | npm-pakke                           | Standardport | Formål                                                                                                                                                                                                  |
| --------------- | ----------------------------------- | :----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                           |    20130     | AI-router, som OmniRoute kan bruge som underudbyder. Modeller eksponeres som `9router/{sub}/{model}`                                                                                                    |
| **CLIProxyAPI** | Binær GitHub-udgivelse (`cliproxy`) |     8317     | Lokal proxyadapter til Anthropic CLI-godkendelsesflows. Leverer reserverouting, når OAuth-tokens udløber                                                                                                |
| **Mux**         | `mux` (headless `mux server`)       |     8322     | Lokal daemon til agentorkestrering (coder/mux). Kun livscyklusstyret — ikke et routingmål (ingen LLM-proxying).                                                                                         |
| **Bifrost**     | `@maximhq/bifrost`                  |     8080     | Go-baseret AI-gateway-relaybackend. Når den kører, vælges den automatisk af relayruten (`/v1/relay/`)                                                                                                   |
| **Dario**       | `@askalf/dario`                     |     3456     | Claude-abonnementsproxy — alternativ/failover til CLIProxyAPI for trafik udformet som Claude Code; den injicerede nøgle bliver til `DARIO_ADMIN_TOKEN`, som beskytter dens `/admin/*`-OAuth-kontrolplan |
| **open-wa**     | `@open-wa/wa-automate`              |     8323     | WhatsApp Web-automatisering (headless Chromium via Puppeteer). Kun livscyklusstyret — ikke et routingmål.                                                                                               |

Alle seks følger den samme overvågningsmodel:

- OmniRoute installerer dem under `DATA_DIR/services/{name}/` (isoleret fra OmniRoutes egen `package.json`)
- OmniRoute starter og overvåger dem som underordnede processer
- OmniRoute injicerer en midlertidig API-nøgle i den underordnede proces' miljø og roterer den uden nedetid (hvor det er relevant)
- Alle administrationsruter (`/api/services/*`) er **LOCAL_ONLY** — kun tilgængelige fra loopback (ufravigelig regel nr. 17)

### Vigtige beslutninger (fra designplanen)

| Beslutning                                            | Værdi                                                                                    |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Dashboardadgang til 9Routers native brugergrænseflade | Reverse proxy på `/dashboard/providers/services/9router/embed/*`                         |
| Installationsmekanisme                                | `npm install {package}` via `execFile` (ingen shell-interpolation)                       |
| Anvendelsestilstand                                   | Udbyder registreret som `9router/{sub}/{model}` i routingmotoren                         |
| Administration af API-nøgler                          | OmniRoute genererer, krypterer ved lagring (AES-256-GCM) og injicerer via miljøvariabler |
| Placering i dashboardet                               | `/dashboard/providers/services` (tre faner)                                              |
| Automatisk start                                      | Til/fra-indstilling pr. tjeneste, deaktiveret som standard                               |

---

## 2. Arkitektur — 4 lag

```
┌────────────────────────────────────────────────────────────────────┐
│  Lag 1 — Brugergrænseflade                                        │
│  /dashboard/providers/services  (faner: CLIProxyAPI | 9Router | Mux)│
│  Livestreamede logfiler (SSE), Start/Stop/Genstart/Opdater,        │
│  Indstillinger, Installer                                          │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Skal + fanerouting via ?tab=          │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Lag 2 — API (LOCAL_ONLY — kun loopback)                           │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (omvendt HTTP- + WebSocket-proxy → 9Router-upstream)            │
│                                                                    │
│  Adgangskontrol: LOCAL_ONLY_API_PREFIXES inkluderer                │
│        "/api/services/" og                                        │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ kald i processen
┌──────────────────────▼─────────────────────────────────────────────┐
│  Lag 3 — ServiceSupervisor (src/lib/services/)                     │
│                                                                    │
│  ServiceSupervisor.ts   Generisk supervisor (child_process.spawn)  │
│    ├── installer:   execFile('npm', ['install', pkg, '--prefix'])  │
│    ├── starter:     spawn(node, [entrypoint], {env, cwd})          │
│    ├── API-nøgle:   crypto.randomBytes(32) → env NINEROUTER_API_KEY│
│    ├── port:        20130 for 9Router (kan konfigureres)           │
│    ├── logfiler:    stdio-ringbuffer på 5 MB → SSE-hændelser       │
│    ├── helbred:     HTTP GET /health hvert 2.–5. sek., træg genopretning│
│    └── livscyklus:  SIGTERM 15 sek. → SIGKILL                      │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Initialiserer alle SERVICES[] ved processtart  │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       Periodisk GET /v1/models → service_models-tabel│
│  ringBuffer.ts      Cirkulær logbuffer (5 MB pr. tjeneste)         │
│  healthCheck.ts     Regelmæssig HTTP-helbredskontrol               │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts, openwa.ts  │
│                      (installationsadaptere)                        │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ OpenAI-kompatibel HTTP (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Lag 4 — Udbyder/routing                                           │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Slår port og API-nøgle op igen for hver anmodning (ingen cache).│
│    Fjerner præfikset "9router/" fra model-id'et før proxying.       │
│    Returnerer 503 service_not_running, hvis supervisoren ikke er   │
│    i tilstanden "running".                                         │
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Post for "9router": isEmbeddedService: true                     │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Modeller gemmes som "9router/{sub}/{model}" (med præfiks).       │
│    Synkroniseres hvert 5. minut af modelSync.ts.                    │
│                                                                    │
│  Mux administreres KUN med hensyn til livscyklus (lag 1-3) — det   │
│  er en daemon til agentorkestrering, ikke en LLM-proxy, så den har │
│  ingen executor-/udbyderpost i lag 4 og er aldrig et routingmål.   │
└────────────────────────────────────────────────────────────────────┘
```

### Vigtige kildefiler

| Fil                                         | Rolle                                                       |
| ------------------------------------------- | ----------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Kerneklasse: livscyklus, lås, tilstand, ringbuffer          |
| `src/lib/services/bootstrap.ts`             | Registrering på procesniveau og automatisk start            |
| `src/lib/services/registry.ts`              | Singleton-map `tool → supervisor`                           |
| `src/lib/services/apiKey.ts`                | Nøglegenerering, AES-256-GCM-kryptering af lagrede data     |
| `src/lib/services/modelSync.ts`             | Periodisk modelsynkronisering (5 min.) + efter behov        |
| `src/lib/services/ringBuffer.ts`            | 5 MB cirkulær logbuffer med SSE-abonnement                  |
| `src/lib/services/healthCheck.ts`           | HTTP-tilstandskontrol (konfigurerbart interval)             |
| `src/lib/services/installers/ninerouter.ts` | npm-installation/-opdatering/-afinstallation af 9Router     |
| `src/lib/services/installers/cliproxy.ts`   | npm-installation/-opdatering/-afinstallation af CLIProxyAPI |
| `src/lib/services/installers/mux.ts`        | npm-installation/-opdatering/-afinstallation af Mux         |
| `src/lib/services/installers/openwa.ts`     | npm-installation/-opdatering/-afinstallation af open-wa     |
| `src/app/api/services/9router/_lib.ts`      | Hjælpefunktionen `getOrInitSupervisor()`                    |
| `src/app/api/services/[name]/logs/route.ts` | Fælles SSE-slutpunkt til logfiler                           |
| `open-sse/executors/ninerouter.ts`          | Leverandøreksekveringskomponent (lag 4)                     |

---

## 3. Livscyklustilstandsmaskine

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
                  sundhedstjek ok   │         nedbrud / SIGTERM  │
                               ┌────▼─────┐  (afslutning inden 5 s)
                               │ running  │──── nedbrud ─────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Tilstande gemmes i DB-tabellen `version_manager` (kolonnen `status`) og afspejles
i `ServiceSupervisor`'s tilstand i hukommelsen. Tilstanden i hukommelsen er autoritativ
for en kørende proces; DB-tilstanden er den permanente reservetilstand ved opstart.

### Tilstandsovergange

| Fra             | Hændelse                            | Til                       |
| --------------- | ----------------------------------- | ------------------------- |
| `not_installed` | `install()` lykkes                  | `stopped`                 |
| `stopped`       | `start()` kaldes                    | `starting`                |
| `starting`      | sundhedstjek returnerer 200         | `running`                 |
| `starting`      | processen afsluttes før sund        | `error`                   |
| `running`       | `stop()` kaldes                     | `stopping` → `stopped`    |
| `running`       | processen afsluttes uventet (< 5 s) | `error` (hurtigt nedbrud) |
| `running`       | processen afsluttes uventet (> 5 s) | `error`                   |
| `error`         | `start()` kaldes                    | `starting`                |
| enhver          | `stop()` under `stopping`           | ingen handling            |

### Operationslås

`ServiceSupervisor` serialiserer livscyklusoperationer via en asynkron operationslås
(`withLock()`). Samtidige kald til `start()` på den samme supervisor resulterer i præcis
én processtart; den anden kalder venter og returnerer den eksisterende status. Dette forhindrer
race conditions, når f.eks. automatisk start og en UI-knap udløses samtidigt.

---

## 4. API-reference

Alle ruter under `/api/services/` er **LOCAL_ONLY** (kun loopback, fast regel #17).
Anmodninger, der ikke kommer fra loopback, modtager `403 LOCAL_ONLY` uanset godkendelsestoken.

### 4.1 9Router-endpoints (11 ruter)

#### `POST /api/services/9router/install`

Installer 9Router fra npm. Opretter `DATA_DIR/services/9router/` med sin egen
`package.json` og `node_modules/`. Er ikke i konflikt med OmniRoutes egne afhængigheder.

**Anmodningstekst** (alle felter er valgfrie):

```json
{ "version": "latest" }
```

| Felt      | Type     | Standardværdi | Beskrivelse                                        |
| --------- | -------- | ------------- | -------------------------------------------------- |
| `version` | `string` | `"latest"`    | npm-versionstag eller semver, der skal installeres |

**Svar:**

| Status | Beskrivelse                                                                  |
| ------ | ---------------------------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                       |
| `400`  | Ugyldig anmodningstekst (Zod-valideringsfejl)                                |
| `409`  | Installation er allerede i gang (lås fastholdt)                              |
| `500`  | npm-installation mislykkedes — se `message` for en forståelig fejlmeddelelse |

**Bemærkninger:** Bruger `execFile('npm', [...])` — ingen shell, ingen interpolation (fast regel #13).
EACCES-fejl vises som forståelige meddelelser.

---

#### `POST /api/services/9router/start`

Start 9Router. Registrerer en supervisor, hvis en sådan ikke allerede er registreret, og kalder derefter
`supervisor.start()`. Idempotent, når tjenesten allerede kører.

**Anmodningstekst:** ingen

**Svar:**

| Status | Beskrivelse                                             |
| ------ | ------------------------------------------------------- |
| `200`  | `ServiceStatus`-objekt (se skemaet nedenfor)            |
| `409`  | 9Router er ikke installeret (`status: "not_installed"`) |
| `503`  | Start mislykkedes (procesfejl — se `lastError`)         |

**ServiceStatus-skema:**

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

Stop 9Router kontrolleret. Sender SIGTERM, venter 15 sek., og sender derefter SIGKILL, hvis processen stadig kører.
Idempotent, når tjenesten allerede er stoppet.

**Anmodningstekst:** ingen

**Svar:**

| Status | Beskrivelse                        |
| ------ | ---------------------------------- |
| `200`  | `ServiceStatus` (state: "stopped") |
| `503`  | Stop mislykkedes uventet           |

---

#### `POST /api/services/9router/restart`

Svarer til `stop()` efterfulgt af `start()` under handlingslåsen.

**Anmodningstekst:** ingen

**Svar:** samme som `start` (returnerer den endelige `ServiceStatus`).

---

#### `POST /api/services/9router/update`

Opdaterer 9Router til en nyere npm-version. Hvis tjenesten kører, stoppes den
først, npm-installationen køres (den nyere version installeres på stedet), og derefter
genstartes tjenesten.

**Anmodningstekst** (alle felter er valgfrie):

```json
{ "version": "latest" }
```

**Svar:**

| Status | Beskrivelse                                                     |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Ugyldig anmodningstekst                                         |
| `500`  | npm-opdatering mislykkedes                                      |

---

#### `POST /api/services/9router/rotate-key`

Genererer en ny API-nøgle til 9Router, krypterer den ved lagring og genstarter tjenesten
(hvis den kører), så den indlæser den nye nøgle fra sit miljø. Den gamle nøgle
ugyldiggøres med det samme.

**Anmodningstekst:** ingen

**Svar:**

| Status | Beskrivelse                                |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Rotation mislykkedes                       |

**Sikkerhed:** Den nye nøgle returneres aldrig i svaret (ingen lækage af legitimationsoplysninger).
Den gemmes krypteret (AES-256-GCM) i tabellen `version_manager`.

---

#### `GET /api/services/9router/status`

Returnerer kombineret live- og DB-status, herunder versionsmetadata og en forhåndsvisning af API-nøglen.

**Svar:**

| Status | Beskrivelse                   |
| ------ | ----------------------------- |
| `200`  | Se skemaet nedenfor           |
| `500`  | Læsning af status mislykkedes |

**Svarskema:**

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

Slå automatisk start til eller fra. Når `enabled: true`, starter tjenesten automatisk,
næste gang OmniRoute starter (hvis tjenesten er installeret).

**Anmodningstekst:**

```json
{ "enabled": true }
```

**Svar:**

| Status | Beskrivelse             |
| ------ | ----------------------- |
| `200`  | `{ autoStart: true }`   |
| `400`  | Ugyldig anmodningstekst |

---

#### `GET /api/services/9router/logs`

SSE-stream med live-logfiler fra 9Routers ringbuffer for stdout/stderr.

**Forespørgselsparametre:**

| Parameter | Type      | Standardværdi | Beskrivelse                                                                                |
| --------- | --------- | ------------- | ------------------------------------------------------------------------------------------ |
| `tail`    | `integer` | 200           | Antal historiske linjer, der først skal sendes (maks. 1000)                                |
| `filter`  | `string`  | ingen         | Filter for delstrenge uden forskel på store og små bogstaver (ingen regex — ReDoS-sikkert) |

**SSE-hændelser:**

| Hændelse    | Data        | Beskrivelse                     |
| ----------- | ----------- | ------------------------------- |
| `snapshot`  | `LogLine[]` | Indledende historisk afslutning |
| `log`       | `LogLine`   | Live-loglinje                   |
| `heartbeat` | `{}`        | Keep-alive hvert 15. sek.       |

**LogLine-skema:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Svar:**

| Status | Beskrivelse                                                   |
| ------ | ------------------------------------------------------------- |
| `200`  | `text/event-stream`                                           |
| `400`  | Parameteren `filter` er for lang (> 200 tegn)                 |
| `404`  | Tjenesten blev ikke fundet (supervisoren er ikke registreret) |

---

### 4.2 CLIProxyAPI-slutpunkter (10 ruter)

CLIProxyAPI har samme slutpunktsstruktur som 9Router, bortset fra `rotate-key`, plus
`accounts`, `provider-expose` og `auto-restart-adopted`. Den modtager nu en
dedikeret API-nøgle til dataplanet, som injiceres ved opstart (`needsApiKey: true` i
`bootstrap.ts`, bruges til modelsynkronisering); `status` indeholder færre felter.

| Metode | Sti                                 | Beskrivelse                             |
| ------ | ----------------------------------- | --------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | Installer CLIProxyAPI fra npm           |
| `POST` | `/api/services/cliproxy/start`      | Start CLIProxyAPI                       |
| `POST` | `/api/services/cliproxy/stop`       | Stop CLIProxyAPI                        |
| `POST` | `/api/services/cliproxy/restart`    | Genstart CLIProxyAPI                    |
| `POST` | `/api/services/cliproxy/update`     | Opdater til en nyere version            |
| `GET`  | `/api/services/cliproxy/status`     | Live- + DB-status (uden `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Slå automatisk start til eller fra      |

Det fælles slutpunkt `GET /api/services/{name}/logs` (se §4.1) fungerer for alle
fire tjenester ved hjælp af det dynamiske segment `[name]`.

---

### 4.3 Mux-slutpunkter (8 ruter)

Mux har samme slutpunktsstruktur som CLIProxyAPI — ingen `rotate-key`-rute i API-
overfladen (bearer-tokenet genereres på samme måde som 9Routers via
`getOrCreateApiKey("mux")` og injiceres via miljøvariablen `MUX_SERVER_AUTH_TOKEN`, men
der findes endnu ikke et dedikeret slutpunkt til rotation). Mux administreres kun gennem
sin livscyklus: I modsætning til 9Router har den ingen Layer 4-eksekutor og registreres
aldrig som routingudbyder.

| Metode | Sti                            | Beskrivelse                         |
| ------ | ------------------------------ | ----------------------------------- |
| `POST` | `/api/services/mux/install`    | Installer Mux fra npm (`npm i mux`) |
| `POST` | `/api/services/mux/start`      | Start Mux (`mux server`)            |
| `POST` | `/api/services/mux/stop`       | Stop Mux                            |
| `POST` | `/api/services/mux/restart`    | Genstart Mux                        |
| `POST` | `/api/services/mux/update`     | Opdater til en nyere npm-version    |
| `GET`  | `/api/services/mux/status`     | Live- + DB-status                   |
| `POST` | `/api/services/mux/auto-start` | Slå automatisk start til eller fra  |

---

### 4.4 Bifrost-slutpunkter (8 ruter)

Bifrost er en Go-baseret relay-backend til AI-gateways (`@maximhq/bifrost`). Den bruger
samme slutpunktsstruktur som CLIProxyAPI (ingen `rotate-key` — Bifrost administrerer
sine egne udbydernøgler i `config.json` under sin `-app-dir`).

| Metode | Sti                                | Beskrivelse                                               |
| ------ | ---------------------------------- | --------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | Installer Bifrost fra npm (`@maximhq/bifrost`)            |
| `POST` | `/api/services/bifrost/start`      | Start Bifrost på port 8080 (standard)                     |
| `POST` | `/api/services/bifrost/stop`       | Stop Bifrost                                              |
| `POST` | `/api/services/bifrost/restart`    | Genstart Bifrost                                          |
| `POST` | `/api/services/bifrost/update`     | Opdater til en nyere version                              |
| `GET`  | `/api/services/bifrost/status`     | Live- + DB-status                                         |
| `POST` | `/api/services/bifrost/auto-start` | Slå automatisk start til eller fra                        |
| `GET`  | `/api/services/bifrost/logs`       | SSE-loghale (via den fælles dynamiske rute `[name]/logs`) |

**Routingforbindelse:** Når `BIFROST_BASE_URL` ikke er angivet, og den overvågede
Bifrost-instans kører, bruger `getBifrostRoutingConfig()` (i `routingBackend.ts`)
automatisk `http://127.0.0.1:{port}` som relay-basis-URL. En eksplicit
miljøvariabel `BIFROST_BASE_URL` har altid forrang.

---

### 4.5 Dario-slutpunkter (12 ruter)

Samme livscyklusstruktur som de andre tjenester (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`) plus et tokenbeskyttet OAuth-
kontrolplan under `admin/`: `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (alle beskyttet af `DARIO_ADMIN_TOKEN`).

### 4.6 open-wa-slutpunkter (7 ruter)

open-wa (`@open-wa/wa-automate`) styrer en headless Chromium-instans (via
Puppeteer) for at automatisere WhatsApp Web. Den bruger samme slutpunktsstruktur som
Mux (ingen `rotate-key`-rute endnu). Den administreres kun gennem sin livscyklus —
den er ikke et routingmål og har ingen Layer 4-eksekutor-/udbyderpost.

| Metode | Sti                               | Beskrivelse                                                    |
| ------ | --------------------------------- | -------------------------------------------------------------- |
| `POST` | `/api/services/openwa/install`    | Installer open-wa fra npm (`@open-wa/wa-automate`)             |
| `POST` | `/api/services/openwa/start`      | Start open-wa på port 8323 (standard)                          |
| `POST` | `/api/services/openwa/stop`       | Stop open-wa                                                   |
| `POST` | `/api/services/openwa/restart`    | Genstart open-wa                                               |
| `POST` | `/api/services/openwa/update`     | Opdater til en nyere version                                   |
| `GET`  | `/api/services/openwa/status`     | Live- og DB-status                                             |
| `POST` | `/api/services/openwa/auto-start` | Slå automatisk start til eller fra                             |
| `GET`  | `/api/services/openwa/logs`       | SSE-logafslutning (via den delte dynamiske `[name]/logs`-rute) |

**API-nøgle:** injiceres som `WA_KEY` — open-wa's generiske miljøvariabeltilsidesættelse
med præfikset `WA_*` knytter den til CLI-indstillingen `--key`/`-k`
(`dist/cli/setup.js::envArgs()`, verificeret mod den installerede pakkeversion
4.76.0). Præfikset `ow_` tilføjes, når den genereres af `generateServiceApiKey()`. open-wa
læser nøglen fra en `key`/`api_key`-HTTP-header (ikke `Authorization:
Bearer`); `/api-docs*` er udtrykkeligt undtaget fra kontrollen
(`setupAuthenticationLayer` i `dist/cli/server.js`), så tilstandskontrollen
kræver ingen godkendelsesheader.

**Parring:** open-wa er uofficiel og ikke tilknyttet WhatsApp — det
tilsluttede nummer risikerer at blive udelukket som følge af WhatsApps egen registrering af automatisering.
Ved første start udskrives QR-koden til parring til stdout og vises via
det eksisterende logpanel/den eksisterende SSE-stream — der findes endnu ikke et dedikeret slutpunkt
til QR-billeder i denne integration.

---

### 4.7 Omvendt proxy (indlejring af 9Router-dashboard)

Dashboardet indlejrer 9Router-webbrugerfladen i en iframe via en intern omvendt
proxy på:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Denne proxy:

- Videresender anmodningen til `http://127.0.0.1:{port}/{path}` (kun loopback)
- Fjerner indgående `cookie`- og `authorization`-headere (ingen lækage af OmniRoute-sessionen)
- Injicerer `Authorization: Bearer {apiKey}` til 9Router-godkendelse
- Fjerner `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*` fra svaret
- Omskriver HTML-svar for at injicere `<base href>` og normalisere absolutte stier (`/foo` → `/dashboard/.../embed/foo`)

WebSocket-opgraderinger til det indlejrede dashboard håndteres af en ledsagende server på en
dedikeret port (se `src/lib/services/embedWsProxy.ts`).

**Sikkerhed:** Embed-proxyruterne er klassificeret under `LOCAL_ONLY_API_PREFIXES`
og kan kun tilgås fra loopback. En angriber, der får fat i en JWT via en
Cloudflare-/Ngrok-tunnel, kan ikke oprette en proxyforbindelse til indlejrede tjenester.

---

## 5. Sikkerhed

### Håndhævelse af LOCAL_ONLY (ufravigelig regel #17)

Alle ruter under `/api/services/` og `/dashboard/providers/services/*/embed/` er
klassificeret som LOCAL_ONLY i `src/server/authz/routeGuard.ts`. Loopback-kontrollen
kører ubetinget før enhver godkendelsesgren:

```
anmodning modtages
  → isLocalOnlyPath(path)?
      → ikke-loopback → 403 LOCAL_ONLY (altid før godkendelseskontrol)
      → loopback      → fortsæt til normal godkendelse
```

Dette forhindrer, at en lækket JWT (f.eks. via en tunnel) kan udløse `npm install`
eller oprettelse af processer. Se `docs/security/ROUTE_GUARD_TIERS.md` for den
komplette niveaumatrice.

### Injektion af API-nøgle

9Router og Mux kræver en API-nøgle/bearer-token til deres egne HTTP-slutpunkter.
OmniRoute:

1. Genererer en nøgle via `crypto.randomBytes(32).toString("base64url")` med et
   tjenestespecifikt præfiks (`nr_` for 9Router, `mx_` for Mux).
2. Krypterer den ved lagring med AES-256-GCM (samme kryptering som anvendes til
   udbyderlegitimationsoplysninger).
3. Dekrypterer og injicerer den som en miljøvariabel, når processen oprettes —
   `NINEROUTER_API_KEY` for 9Router, `MUX_SERVER_AUTH_TOKEN` for Mux (aldrig et
   CLI-flag, så tokenet aldrig vises i `ps`/procesoversigter).
4. Returnerer aldrig nøglen i klartekst i et HTTP-svar.

CLIProxyAPI modtager en dedikeret dataplansnøgle, der injiceres ved procesoprettelse
(`needsApiKey: true` — bruges til modelsynkronisering mod adapteren).

### Beskyttelse mod SSRF

Den omvendte HTTP-proxy (`/dashboard/.../embed/[...path]`) er hardkodet til kun at
videresende til `http://127.0.0.1:{port}`. Den følger aldrig omdirigeringer til
destinationer uden for loopback. Biblioteket `ssrf-req-filter` bruges til at afvise
enhver upstream-URL, der resolves til en adresse uden for loopback-området.

### Shell-sikkerhed (ufravigelig regel #13)

`npm install` kaldes via `execFile('npm', ['install', pkg, '--prefix', dir])` —
ingen skabelonstrenge, ingen shell og ingen interpolation af eksterne stier i
kommandostrengen. Kørselsværdier (porte, API-nøgler) videregives via den underordnede
proces' `env`-objekt.

### Fejlsanering (ufravigelig regel #12)

Alle fejlsvar fra `/api/services/*` går gennem `buildErrorBody()` eller
`sanitizeErrorMessage()`. Rå `err.stack` og `err.message` returneres aldrig
ordret til kalderen.

---

## 6. Tilføjelse af en ny integreret tjeneste

Følg disse 8 trin. Brug de eksisterende implementeringer i `src/lib/services/installers/`
og `src/app/api/services/` som den autoritative reference.

### Trin 1 — Opret installationsprogrammet

Opret `src/lib/services/installers/{name}.ts` med `ninerouter.ts` som model:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // vælg en ledig port

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Brug `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` fra `installers/utils.ts`
— aldrig `execSync` eller shell-interpolation.

### Trin 2 — Registrer i bootstrap

Føj en `ServiceEntry` til `SERVICES`-arrayet i `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false, hvis der ikke kræves en API-nøgle
}
```

Udvid `buildSpawnArgsFactory()` til at håndtere `cfg.tool === "myservice"`.

#### Udvidelig kontrakt for udbyderplugins (fase 1, #7333)

`src/lib/services/providerPlugins/` introducerer en `ServiceProviderPlugin`-kontrakt,
der samler felterne fra en backends `bootstrap.ts`-`ServiceEntry` og
manifest-skabelonfelterne fra `serviceBackends.ts` i ét objekt, i stedet for at den
samme backends struktur udtrykkes separat i to uafhængige filer. På nuværende tidspunkt
er **kun `9router` migreret** — `bootstrap.ts` udleder sin `SERVICES[]`-post fra
`getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`)
og udløser en opstartsfejl, hvis pluginet nogensinde mangler. `cliproxy`, `mux` og
`bifrost` bruger fortsat de allerede eksisterende indlejrede `SERVICES[]`-literaler
uændret.

`open-sse/config/providerPluginManifest.ts` har også fået en additiv
`createServiceBackendManifestEntry(pluginId, template)`-hjælpefunktion, der opbygger
en korrekt udformet `ProviderPluginManifestEntry` fra en
`SERVICE_BACKEND_MANIFEST_TEMPLATE`-post — den er **endnu ikke** forbundet til nogen
aktiv anmodningssti (hverken `generateProviderPluginManifestFromRegistry()` eller
`/v1/providers/[provider]/models`); det forbliver en opfølgning, når kontrakten er
afprøvet for endnu en backend.

Følgende er udskudt til opfølgende PR'er og spores under issue #7333: migrering af
`cliproxyapi` gennem samme register, generalisering af `mux`/`bifrost` til
`ServiceBackendPluginId`-unionen, indarbejdelse af særbehandlingen af executor-routing
(`open-sse/executors/index.ts`, `open-sse/handlers/chatCore/executorProxy.ts`) i
plugin-kontrakten samt tilslutning af `createServiceBackendManifestEntry()` til en
aktiv manifest-/modelkodesti.

### Trin 3 — Tilføj migrering og database-seed

Sørg for, at tjenesten har en række i `version_manager` via en migrering i
`src/lib/db/migrations/`. Rækken skal indeholde:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Trin 4 — Opret de 7 API-slutpunkter

Under `src/app/api/services/{name}/`:

```
_lib.ts            hjælpefunktion til getOrInitSupervisor()
install/route.ts   POST — kalder installer.install()
start/route.ts     POST — kalder supervisor.start()
stop/route.ts      POST — kalder supervisor.stop()
restart/route.ts   POST — kalder supervisor.restart()
update/route.ts    POST — kalder installer.update()
status/route.ts    GET  — kombinerer live- og databasestatus
auto-start/route.ts POST — skifter auto_start-flaget
```

Den delte `GET /api/services/[name]/logs`-rute er allerede forbundet — der er ikke behov for ændringer der.

Delegér alle fejlsvar gennem `createErrorResponse()` / `buildErrorBody()`.

### Trin 5 — Føj til LOCAL_ONLY_API_PREFIXES

Kontrollér i `src/server/authz/routeGuard.ts`, at `/api/services/` allerede er angivet.
Hvis du introducerer et nyt præfiks (f.eks. `/api/tools/`), skal du føje det til både
`LOCAL_ONLY_API_PREFIXES` og, hvis det starter processer, til `SPAWN_CAPABLE_PREFIXES`.
Tilføj en test i `tests/unit/authz/routeGuard.test.ts`.

### Trin 6 — Tilføj UI-fanen

Opret `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Genbrug delte komponenter:

- `ServiceStatusCard` — live-status + sundhedsbadge
- `ServiceLifecycleButtons` — Start / Stop / Genstart / Opdater
- `ServiceLogsPanel` — SSE-loghale (forbinder til `/api/services/{name}/logs`)
- `ApiKeyCard` — visning + rotation af nøgle (hvis `needsApiKey: true`)

Registrér fanen i `ServicesPageShell.tsx`.

### Trin 7 — Tilføj providerposten (hvis tjenesten er et routingmål)

Hvis den integrerede tjeneste eksponerer et OpenAI-kompatibelt `/v1/chat/completions`-slutpunkt:

1. Tilføj en providerpost i `src/shared/constants/providers.ts` med `isEmbeddedService: true`.
2. Opret `open-sse/executors/{name}.ts`, der udvider `BaseExecutor`. Slå port og
   API-nøgle op igen for hver anmodning (gem dem aldrig i konstruktøren). Returnér et
   `503 service_not_running`-svar, når supervisorens tilstand ikke er `"running"`.
3. Registrér modeller i `open-sse/config/providerRegistry.ts` med tjenestepræfikset
   (f.eks. `myservice/sub/model`). `modelSync.ts` holder dem opdaterede.

### Trin 8 — Dokumentér og test

1. Opdater `docs/frameworks/EMBEDDED-SERVICES.md` (denne fil) — føj tjenesten til
   tabellen i §1 og eventuelle nye slutpunkter til §4.
2. Tilføj enhedstests i `tests/unit/services/` (livscyklus, installationsprogram, API-form).
3. Tilføj en integrationstest i `tests/integration/services/` (bag `RUN_SERVICES_INT=1`).
4. Opdater `docs/openapi.yaml` med de nye slutpunkter.

---

## 7. Fejlfinding

### Tjenesten starter ikke

**Symptomer:** Startknappen returnerer 503, og tilstanden forbliver `"error"` eller `"starting"`.

**Tjekliste:**

1. Kontrollér `GET /api/services/{name}/logs` (eller panelet Logs i dashboardet). Se
   efter linjer som `Error: ENOENT`, `address already in use` eller `Cannot find module`.
2. Kontrollér, at `npm` findes i PATH: Kør `which npm` fra den samme brugerkonto, som kører OmniRoute.
3. Kontrollér, at tjenesten er installeret: Se `GET /api/services/{name}/status` efter
   `installedVersion`. Hvis værdien er `null`, skal du først køre installationen.
4. Kontrollér, at `DATA_DIR/services/{name}/node_modules/` findes og ikke er tom.
5. Kontrollér feltet `lastError` i statussvaret for den rensede afslutningsårsag.

---

### Koldstart er langsom (> 10 sek. før tilstanden `running` nås)

**Symptomer:** Tilstanden forbliver `"starting"` i lang tid, før den skifter til `"running"` eller `"error"`.

**Forklaring:** 9Routers koldstart omfatter import af store afhængighedstræer (DNS-,
tunnel- og MITM-moduler). Standardsundhedsintervallet er 2 sek. med 3 forsøg, før
supervisoren erklærer timeout (men fortsætter med at kontrollere).

**Løsning:** `healthIntervalMs` og timeoutværdien for `waitForHealthy`
(`healthIntervalMs * 3`) kan konfigureres i `bootstrap.ts`. For tjenester med længere
opstartstider skal `healthIntervalMs` øges til 5000 og `stopTimeoutMs` til 30 000.

---

### Portkonflikt (`EADDRINUSE`)

**Symptomer:** Logfilerne viser `address already in use :::20130`.

**Årsager:**

- En anden proces bruger allerede port 20130.
- En tidligere 9Router-proces blev ikke stoppet helt (zombie-PID).

**Løsning:**

1. Skift standardporten via miljøvariablen `NINEROUTER_PORT` i `.env`.
2. Find og afslut den konfliktende proces: `lsof -ti :20130 | xargs kill -9`.
3. Porten kan konfigureres for hver tjeneste i `bootstrap.ts` via feltet `port`.

**Bemærk:** 9Router bruger som standard port 20130 specifikt for at undgå konflikt med
OmniRoutes standardport 20128.

---

### Adgang nægtet (EACCES) under installation

**Symptomer:** Installationen returnerer 500, og logfilerne viser `EACCES` eller `permission denied`.

**Årsager:**

- `DATA_DIR` eller dens overordnede mappe er ikke skrivbar for OmniRoute-processen.
- Kørsel i Docker uden root, uden skriveadgang til den tilknyttede diskenhed.

**Løsning:**

1. Kontrollér `DATA_DIR` (standard: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Sørg for, at brugeren, der kører OmniRoute-processen, ejer mappen: `chown -R $USER ~/.omniroute/`
3. Sørg i Docker for, at diskenhedstilknytningen har de korrekte tilladelser for containerbrugeren.

---

### Opdatering mislykkes (timeout eller netværksfejl ved `npm install`)

**Symptomer:** Opdateringen returnerer 500 med `InstallError`, og logfilerne viser netværkstimeout.

**Tjekliste:**

1. Bekræft, at npm-registreringsdatabasen kan nås: `npm ping`.
2. Kontrollér, om der bruges en virksomhedsproxy: `npm config get proxy`, `npm config get https-proxy`.
3. Prøv installationen manuelt: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Hvis systemet er bag et air-gap, skal tarball-filen downloades på forhånd, hvorefter du kan bruge `npm install /path/to/tarball.tgz`.

---

### Tjenesten viser tilstanden `"error"` umiddelbart efter start (hurtigt nedbrud)

**Symptomer:** Tilstanden skifter fra `"starting"` til `"error"` på under 5 sekunder.
`lastError` viser `"Fast crash (exited with code 1)"`.

**Tjekliste:**

1. Læs hele slutningen af logfilen: `GET /api/services/{name}/logs?tail=500`.
2. Almindelig årsag: manglende miljøvariabler, som tjenesten forventer.
3. For 9Router: Kontrollér, at `NINEROUTER_DISABLE_MITM=true` og
   `NINEROUTER_DISABLE_TUNNEL=true` er i det miljø, der videregives ved oprettelse af processen (se
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. Ofte stillede spørgsmål

**Sp.: Kan jeg eksponere endpoints for de integrerede tjenester for klienter uden for loopback?**

Nej. LOCAL_ONLY-niveauet er tilsigtet (ufravigelig regel nr. 17). Ruter, der kan køre
`npm install` eller starte `node`-processer, må ikke være tilgængelige for trafik uden
for loopback, fordi en lækket JWT via en tunnel (Cloudflare, Ngrok, Tailscale) ellers
ville muliggøre vilkårlig start af processer. Der er ingen mulighed for at fravælge
denne begrænsning for `/api/services/` — i modsætning til `/api/mcp/` er den ikke
omfattet af listen over undtagelser for manage-scope. Se `docs/security/ROUTE_GUARD_TIERS.md`.

---

**Sp.: Vil 9Router og CLIProxyAPI være tilgængelige i produktions-/cloudinstallationer?**

Ja. Begge tjenester følger den samme local-first-model som OmniRoute selv. De kører
på den samme maskine og kommunikerer via loopback. "Produktion" betyder her den VPS
eller lokale server, hvor OmniRoute er installeret, ikke en ekstern cloududbyder.

---

**Sp.: Hvordan fejlsøger jeg supervisoren?**

1. Følg SSE-logstrømmen: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Kontrollér de strukturerede logfiler i OmniRoutes pino-output filtreret efter
   `service:supervisor`-navnerummet.
3. Inspicér rækken i databasen: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Brug `GET /api/services/9router/status` til at se den aktuelle live-tilstand, PID, sundhedsstatus
   og `lastError` i ét kald.

---

**Sp.: Supervisoren viser `health: "degraded"` eller `health: "unknown"`, men tilstanden er `"running"`. Er det et problem?**

`"degraded"` betyder, at sundhedsproben returnerede et svar, der ikke var 200. `"unknown"` betyder, at
ingen probe endnu er fuldført (kapløb med den første polling). Begge tilstande er midlertidige under opstart.
Hvis sundhedsstatus forbliver `"degraded"` i mere end `healthIntervalMs * 3` ms efter
`"running"`, kører den integrerede tjeneste, men dens HTTP-API svarer ikke. Kontrollér,
om porten er korrekt i statussvaret, og om tjenesten faktisk lytter på den pågældende
port.

---

**Sp.: Kan jeg ændre 9Router-API-nøglen uden en fuld genstart?**

Nej. API-nøglen videregives til 9Router via en miljøvariabel, når processen startes.
Miljøvariabler kan ikke ændres i en kørende proces. `POST .../rotate-key`
stopper og genstarter automatisk tjenesten for at anvende den nye nøgle. Nøglerotationen
træder i kraft inden for tjenestens `stopTimeoutMs` (standard: 15 s) plus dens
opstartstid.

---

**Sp.: Hvad er grænsen for ringbufferen, og hvad sker der, når den bliver fuld?**

Hver tjeneste har en dedikeret ringbuffer på 5 MB. Når bufferen er fuld, fjernes de
ældste loglinjer for at gøre plads til nye. SSE-hændelsen `snapshot` returnerer
de seneste linjer inden for `tail`-grænsen. Logfiler gemmes ikke permanent på disken, medmindre
`logsBufferPath` er angivet i databaserækken.

---

## Se også

- `docs/security/ROUTE_GUARD_TIERS.md` — oplysninger om LOCAL_ONLY-niveauet
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 moduloversigt for integrerede tjenester
- `docs/architecture/ARCHITECTURE.md` — kontekst på systemniveau
- `docs/openapi.yaml` — maskinlæsbare endpoint-definitioner
- `CLAUDE.md` §"Tilføjelse af en ny integreret tjeneste" — tjekliste til hurtig reference
