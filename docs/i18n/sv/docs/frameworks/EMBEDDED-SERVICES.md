# Embedded Services (Svenska)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Version:** v3.8.44
> **Senast uppdaterad:** 2026-07-03
> **Målgrupp:** Utvecklare som lägger till, underhåller eller felsöker inbäddade tjänster (9Router, CLIProxyAPI, Mux, Bifrost).

Inbäddade tjänster är lokalt installerade sidovagnsverktyg för processer som OmniRoute installerar, övervakar och
exponerar som fullvärdiga routningsmål. Till skillnad från externa leverantörer (som nås via internet
med API-nycklar) körs inbäddade tjänster på samma dator som OmniRoute och kommunicerar via loopback.

---

## Innehållsförteckning

1. [Översikt](#1-overview)
2. [Arkitektur — 4 lager](#2-architecture--4-layers)
3. [Tillståndsmaskin för livscykeln](#3-lifecycle-state-machine)
4. [API-referens](#4-api-reference)
5. [Säkerhet](#5-security)
6. [Lägga till en ny inbäddad tjänst](#6-adding-a-new-embedded-service)
7. [Felsökning](#7-troubleshooting)
8. [Vanliga frågor](#8-faq)

---

## 1. Översikt

### Varför inbäddade tjänster?

Fem tjänster är inbäddade:

| Tjänst          | npm-paket                                | Standardport | Syfte                                                                                                                                                                                                                |
| --------------- | ---------------------------------------- | :----------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                                |    20130     | AI-router som OmniRoute kan använda som underleverantör. Modeller exponeras som `9router/{sub}/{model}`                                                                                                              |
| **CLIProxyAPI** | Binärfil från GitHub-utgåva (`cliproxy`) |     8317     | Lokal proxyadapter för Anthropic CLI-autentiseringsflöden. Tillhandahåller reservroutning när OAuth-token upphör att gälla                                                                                           |
| **Mux**         | `mux` (huvudlös `mux server`)            |     8322     | Lokal daemon för agentorkestrering (coder/mux). Endast livscykelhanterad — inte ett routningsmål (ingen LLM-proxyhantering).                                                                                         |
| **Bifrost**     | `@maximhq/bifrost`                       |     8080     | Go-baserad reläbackend för AI-gateway. När den körs väljs den automatiskt av relärutten (`/v1/relay/`)                                                                                                               |
| **Dario**       | `@askalf/dario`                          |     3456     | Proxy för Claude-prenumeration — alternativ/reservlösning till CLIProxyAPI för trafik utformad för Claude Code; den injicerade nyckeln blir `DARIO_ADMIN_TOKEN` som skyddar dess OAuth-kontrollplan under `/admin/*` |

Alla fem följer samma övervakningsmodell:

- OmniRoute installerar dem under `DATA_DIR/services/{name}/` (isolerat från OmniRoutes egen `package.json`)
- OmniRoute startar och övervakar dem som underordnade processer
- OmniRoute injicerar en tillfällig API-nyckel i den underordnade processens miljö och roterar den utan driftstopp (där det är tillämpligt)
- Alla hanteringsrutter (`/api/services/*`) är **LOCAL_ONLY** — endast åtkomliga från loopback (strikt regel #17)

### Viktiga beslut (från designplanen)

| Beslut                                                         | Värde                                                                                     |
| -------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Åtkomst till 9Routers inbyggda gränssnitt från kontrollpanelen | Omvänd proxy på `/dashboard/providers/services/9router/embed/*`                           |
| Installationsmekanism                                          | `npm install {package}` via `execFile` (ingen skalinterpolering)                          |
| Användningsläge                                                | Leverantören registreras som `9router/{sub}/{model}` i routningsmotorn                    |
| Hantering av API-nycklar                                       | OmniRoute genererar, krypterar vid lagring (AES-256-GCM) och injicerar via miljövariabler |
| Kontrollpanelens plats                                         | `/dashboard/providers/services` (tre flikar)                                              |
| Automatisk start                                               | Växlingsknapp per tjänst, som standard AV                                                 |

---

## 2. Arkitektur — 4 lager

```
┌────────────────────────────────────────────────────────────────────┐
│  Lager 1 — Användargränssnitt                                     │
│  /dashboard/providers/services  (flikar: CLIProxyAPI | 9Router | Mux)│
│  Livestreamade loggar (SSE), Starta/Stoppa/Starta om/Uppdatera, Inställningar, Installera│
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Skal + flikdirigering via ?tab=      │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Lager 2 — API (LOCAL_ONLY — endast loopback)                      │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (omvänd HTTP- och WebSocket-proxy → 9Router uppströms)          │
│                                                                    │
│  Spärr: LOCAL_ONLY_API_PREFIXES inkluderar "/api/services/" och    │
│         "/dashboard/providers/services/*/embed/"                   │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ anrop inom processen
┌──────────────────────▼─────────────────────────────────────────────┐
│  Lager 3 — ServiceSupervisor (src/lib/services/)                   │
│                                                                    │
│  ServiceSupervisor.ts   Generisk övervakare (child_process.spawn)  │
│    ├── install:    execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── start:      spawn(node, [entrypoint], {env, cwd})           │
│    ├── api_key:    crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── port:       20130 för 9Router (konfigurerbar)               │
│    ├── logs:       stdio-ringbuffert på 5 MB → SSE-händelser       │
│    ├── health:     HTTP GET /health var 2–5:e s, trög återställning│
│    └── lifecycle:  SIGTERM 15 s → SIGKILL                          │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Initierar alla SERVICES[] vid processtart      │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       Periodisk GET /v1/models → tabellen service_models│
│  ringBuffer.ts      Cirkulär loggbuffert (5 MB per tjänst)         │
│  healthCheck.ts     Pollande HTTP-hälsokontroll                    │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts             │
│                      (installationsadaptrar)                       │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ OpenAI-kompatibel HTTP (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Lager 4 — Leverantör/dirigering                                   │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Slår upp port och API-nyckel på nytt för varje begäran (ingen cachelagring).│
│    Tar bort prefixet "9router/" från modell-id före proxyförmedling.│
│    Returnerar 503 service_not_running om övervakaren inte är i tillståndet "running".│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Post för "9router": isEmbeddedService: true                     │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Modeller lagras som "9router/{sub}/{model}" (med prefix).       │
│    Synkroniseras var 5:e minut av modelSync.ts.                    │
│                                                                    │
│  Mux livscykelhanteras ENDAST (lager 1–3) — det är en daemon för   │
│  agentorkestrering, inte en LLM-proxy, så den har ingen exekverar-/│
│  leverantörspost i lager 4 och är aldrig ett dirigeringsmål.       │
└────────────────────────────────────────────────────────────────────┘
```

### Viktiga källfiler

| Fil                                         | Roll                                                          |
| ------------------------------------------- | ------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Kärnklass: livscykel, lås, hälsa, ringbuffert                 |
| `src/lib/services/bootstrap.ts`             | Registrering på processnivå och automatisk start              |
| `src/lib/services/registry.ts`              | Singleton-karta `tool → supervisor`                           |
| `src/lib/services/apiKey.ts`                | Nyckelgenerering, AES-256-GCM-kryptering vid lagring          |
| `src/lib/services/modelSync.ts`             | Periodisk modellsynkronisering (5 min) + på begäran           |
| `src/lib/services/ringBuffer.ts`            | 5 MB cirkulär loggbuffert med SSE-prenumeration               |
| `src/lib/services/healthCheck.ts`           | HTTP-hälsokontroll (konfigurerbart intervall)                 |
| `src/lib/services/installers/ninerouter.ts` | npm-installation/-uppdatering/-avinstallation för 9Router     |
| `src/lib/services/installers/cliproxy.ts`   | npm-installation/-uppdatering/-avinstallation för CLIProxyAPI |
| `src/lib/services/installers/mux.ts`        | npm-installation/-uppdatering/-avinstallation för Mux         |
| `src/app/api/services/9router/_lib.ts`      | Hjälpfunktion för `getOrInitSupervisor()`                     |
| `src/app/api/services/[name]/logs/route.ts` | Delad slutpunkt för SSE-loggar                                |
| `open-sse/executors/ninerouter.ts`          | Leverantörsexekverare (lager 4)                               |

---

## 3. Livscykelns tillståndsmaskin

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
                  hälsokontroll ok  │         krasch / SIGTERM  │
                               ┌────▼─────┐  (avslut inom 5 s)  │
                               │ running  │──── krasch ─────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Tillstånden lagras i DB-tabellen `version_manager` (kolumnen `status`) och speglas
i minnestillståndet i `ServiceSupervisor`. Minnestillståndet är auktoritativt för
en process som körs; DB-tillståndet är den beständiga reservlösningen vid uppstart.

### Tillståndsövergångar

| Från            | Händelse                                 | Till                   |
| --------------- | ---------------------------------------- | ---------------------- |
| `not_installed` | `install()` lyckas                       | `stopped`              |
| `stopped`       | `start()` anropas                        | `starting`             |
| `starting`      | hälsokontrollen returnerar 200           | `running`              |
| `starting`      | processen avslutas innan den är frisk    | `error`                |
| `running`       | `stop()` anropas                         | `stopping` → `stopped` |
| `running`       | processen avslutas oväntat (< 5 s)       | `error` (snabb krasch) |
| `running`       | processen avslutas oväntat (> 5 s)       | `error`                |
| `error`         | `start()` anropas                        | `starting`             |
| valfritt        | `stop()` medan tillståndet är `stopping` | ingen åtgärd           |

### Operationslås

`ServiceSupervisor` serialiserar livscykelåtgärder genom ett asynkront operationslås
(`withLock()`). Samtidiga anrop till `start()` på samma övervakare resulterar i exakt
en processstart; den andra anroparen väntar och returnerar den befintliga statusen. Detta
förhindrar konkurrenstillstånd när exempelvis automatisk start och en knapp i
användargränssnittet utlöses samtidigt.

---

## 4. API-referens

Alla routes under `/api/services/` är **LOCAL_ONLY** (endast loopback, strikt regel nr 17).
Förfrågningar som inte kommer via loopback får `403 LOCAL_ONLY` oavsett autentiseringstoken.

### 4.1 9Router-endpoints (11 routes)

#### `POST /api/services/9router/install`

Installera 9Router från npm. Skapar `DATA_DIR/services/9router/` med en egen
`package.json` och `node_modules/`. Detta orsakar inga konflikter med OmniRoutes egna beroenden.

**Förfrågningsinnehåll** (allt är valfritt):

```json
{ "version": "latest" }
```

| Fält      | Typ      | Standardvärde | Beskrivning                                  |
| --------- | -------- | ------------- | -------------------------------------------- |
| `version` | `string` | `"latest"`    | npm-versionstagg eller semver att installera |

**Svar:**

| Status | Beskrivning                                                                  |
| ------ | ---------------------------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                       |
| `400`  | Ogiltigt förfrågningsinnehåll (Zod-valideringen misslyckades)                |
| `409`  | Installation pågår redan (låset hålls)                                       |
| `500`  | npm install misslyckades — se `message` för ett lättbegripligt felmeddelande |

**Anmärkningar:** Använder `execFile('npm', [...])` — inget skal, ingen interpolering (strikt regel nr 13).
EACCES-fel visas som lättbegripliga meddelanden.

---

#### `POST /api/services/9router/start`

Starta 9Router. Registrerar en övervakare om ingen redan är registrerad och anropar
sedan `supervisor.start()`. Idempotent om tjänsten redan körs.

**Förfrågningsinnehåll:** inget

**Svar:**

| Status | Beskrivning                                             |
| ------ | ------------------------------------------------------- |
| `200`  | `ServiceStatus`-objekt (se schemat nedan)               |
| `409`  | 9Router är inte installerad (`status: "not_installed"`) |
| `503`  | Starten misslyckades (processfel — se `lastError`)      |

**ServiceStatus-schema:**

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

Stoppa 9Router kontrollerat. Skickar SIGTERM, väntar 15 s och skickar sedan SIGKILL
om processen fortfarande körs. Idempotent om tjänsten redan är stoppad.

**Förfrågningsinnehåll:** inget

**Svar:**

| Status | Beskrivning                        |
| ------ | ---------------------------------- |
| `200`  | `ServiceStatus` (state: "stopped") |
| `503`  | Stoppet misslyckades oväntat       |

---

#### `POST /api/services/9router/restart`

Motsvarar `stop()` följt av `start()` under operationslåset.

**Förfrågningsinnehåll:** inget

**Svar:** samma som för `start` (returnerar slutgiltig `ServiceStatus`).

---

#### `POST /api/services/9router/update`

Uppdaterar 9Router till en nyare npm-version. Om tjänsten körs stoppas den
först, npm install körs (och installerar den nyare versionen på plats), varefter
tjänsten startas om.

**Förfrågningsinnehåll** (allt är valfritt):

```json
{ "version": "latest" }
```

**Svar:**

| Status | Beskrivning                                                     |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Ogiltigt innehåll                                               |
| `500`  | npm update misslyckades                                         |

---

#### `POST /api/services/9router/rotate-key`

Genererar en ny API-nyckel för 9Router, krypterar den vid lagring och startar om tjänsten
(om den körs) så att den hämtar den nya nyckeln från sin miljö. Den gamla nyckeln
ogiltigförklaras omedelbart.

**Begärandetext:** ingen

**Svar:**

| Status | Beskrivning                                |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Rotationen misslyckades                    |

**Säkerhet:** Den nya nyckeln returneras aldrig i svaret (inga autentiseringsuppgifter läcker).
Den lagras krypterad (AES-256-GCM) i tabellen `version_manager`.

---

#### `GET /api/services/9router/status`

Returnerar kombinerad live- och databasstatus, inklusive versionsmetadata och en förhandsvisning av API-nyckeln.

**Svar:**

| Status | Beskrivning               |
| ------ | ------------------------- |
| `200`  | Se schemat nedan          |
| `500`  | Statusen kunde inte läsas |

**Svarsschema:**

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

Växla flaggan för automatisk start. När `enabled: true` startas tjänsten automatiskt
nästa gång OmniRoute startar (om tjänsten är installerad).

**Begärandetext:**

```json
{ "enabled": true }
```

**Svar:**

| Status | Beskrivning           |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | Ogiltig text          |

---

#### `GET /api/services/9router/logs`

SSE-ström med liveloggar från 9Routers ringbuffert för stdout/stderr.

**Frågeparametrar:**

| Parameter | Typ       | Standardvärde | Beskrivning                                                       |
| --------- | --------- | ------------- | ----------------------------------------------------------------- |
| `tail`    | `integer` | 200           | Antal historiska rader som ska skickas först (högst 1000)         |
| `filter`  | `string`  | inget         | Skiftlägesokänsligt delsträngsfilter (inget regex — ReDoS-säkert) |

**SSE-händelser:**

| Händelse    | Data        | Beskrivning                               |
| ----------- | ----------- | ----------------------------------------- |
| `snapshot`  | `LogLine[]` | Inledande historiska rader                |
| `log`       | `LogLine`   | Liveloggrad                               |
| `heartbeat` | `{}`        | Håll anslutningen vid liv var 15:e sekund |

**LogLine-schema:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Svar:**

| Status | Beskrivning                                              |
| ------ | -------------------------------------------------------- |
| `200`  | `text/event-stream`                                      |
| `400`  | Parametern `filter` är för lång (> 200 tecken)           |
| `404`  | Tjänsten hittades inte (övervakaren är inte registrerad) |

---

### 4.2 CLIProxyAPI-slutpunkter (10 rutter)

CLIProxyAPI har samma slutpunktsstruktur som 9Router, förutom `rotate-key`, samt
`accounts`, `provider-expose` och `auto-restart-adopted`. Den får nu en
dedikerad API-nyckel för dataplanet som injiceras vid start (`needsApiKey: true` i
`bootstrap.ts`, används för modellsynkronisering); `status` innehåller färre fält.

| Metod  | Sökväg                              | Beskrivning                                   |
| ------ | ----------------------------------- | --------------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | Installera CLIProxyAPI från npm               |
| `POST` | `/api/services/cliproxy/start`      | Starta CLIProxyAPI                            |
| `POST` | `/api/services/cliproxy/stop`       | Stoppa CLIProxyAPI                            |
| `POST` | `/api/services/cliproxy/restart`    | Starta om CLIProxyAPI                         |
| `POST` | `/api/services/cliproxy/update`     | Uppdatera till en nyare version               |
| `GET`  | `/api/services/cliproxy/status`     | Live- och databasstatus (utan `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Växla automatisk start                        |

Den delade slutpunkten `GET /api/services/{name}/logs` (se §4.1) fungerar för alla
fyra tjänsterna med det dynamiska segmentet `[name]`.

---

### 4.3 Mux-slutpunkter (8 rutter)

Mux har samma slutpunktsstruktur som CLIProxyAPI — ingen `rotate-key`-rutt i API-ytan
(bearer-token genereras på samma sätt som för 9Router via
`getOrCreateApiKey("mux")` och injiceras via miljövariabeln `MUX_SERVER_AUTH_TOKEN`, men
det finns ännu ingen särskild slutpunkt för rotation). Mux hanteras endast genom sin
livscykel: till skillnad från 9Router har den ingen exekverare för lager 4 och registreras
aldrig som en routningsleverantör.

| Metod  | Sökväg                         | Beskrivning                           |
| ------ | ------------------------------ | ------------------------------------- |
| `POST` | `/api/services/mux/install`    | Installera Mux från npm (`npm i mux`) |
| `POST` | `/api/services/mux/start`      | Starta Mux (`mux server`)             |
| `POST` | `/api/services/mux/stop`       | Stoppa Mux                            |
| `POST` | `/api/services/mux/restart`    | Starta om Mux                         |
| `POST` | `/api/services/mux/update`     | Uppdatera till en nyare npm-version   |
| `GET`  | `/api/services/mux/status`     | Live- och databasstatus               |
| `POST` | `/api/services/mux/auto-start` | Växla automatisk start                |

---

### 4.4 Bifrost-slutpunkter (8 rutter)

Bifrost är en AI-gateway-reläbackend skriven i Go (`@maximhq/bifrost`). Den använder samma
slutpunktsstruktur som CLIProxyAPI (ingen `rotate-key` — Bifrost hanterar sina egna
leverantörsnycklar i `config.json` under sin `-app-dir`).

| Metod  | Sökväg                             | Beskrivning                                                   |
| ------ | ---------------------------------- | ------------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | Installera Bifrost från npm (`@maximhq/bifrost`)              |
| `POST` | `/api/services/bifrost/start`      | Starta Bifrost på port 8080 (standard)                        |
| `POST` | `/api/services/bifrost/stop`       | Stoppa Bifrost                                                |
| `POST` | `/api/services/bifrost/restart`    | Starta om Bifrost                                             |
| `POST` | `/api/services/bifrost/update`     | Uppdatera till en nyare version                               |
| `GET`  | `/api/services/bifrost/status`     | Aktuell status + DB-status                                    |
| `POST` | `/api/services/bifrost/auto-start` | Slå på eller av automatisk start                              |
| `GET`  | `/api/services/bifrost/logs`       | SSE-loggsvans (via den delade dynamiska rutten `[name]/logs`) |

**Konfiguration av routning:** När `BIFROST_BASE_URL` inte har angetts och den övervakade
Bifrost-instansen körs använder `getBifrostRoutingConfig()` (i `routingBackend.ts`) automatiskt
`http://127.0.0.1:{port}` som bas-URL för reläet. Ett uttryckligen angivet `BIFROST_BASE_URL` i miljön
har alltid företräde.

---

### 4.5 Dario-slutpunkter (12 rutter)

Samma livscykelstruktur som de andra tjänsterna (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`) plus ett token-skyddat OAuth-
kontrollplan under `admin/`: `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (alla skyddas av `DARIO_ADMIN_TOKEN`).

### 4.6 Omvänd proxy (inbäddning av 9Router-instrumentpanelen)

Instrumentpanelen bäddar in 9Routers webbgränssnitt i en iframe via en intern omvänd
proxy på:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Denna proxy:

- Vidarebefordrar begäran till `http://127.0.0.1:{port}/{path}` (endast loopback)
- Tar bort inkommande `cookie`- och `authorization`-headers (ingen exponering av OmniRoute-sessionen)
- Infogar `Authorization: Bearer {apiKey}` för 9Router-autentisering
- Tar bort `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*` från svaret
- Skriver om HTML-svar för att infoga `<base href>` och normalisera absoluta sökvägar (`/foo` → `/dashboard/.../embed/foo`)

WebSocket-uppgraderingar för den inbäddade instrumentpanelen hanteras av en kompletterande server på en
dedikerad port (se `src/lib/services/embedWsProxy.ts`).

**Säkerhet:** Proxy-rutterna för inbäddning klassificeras under `LOCAL_ONLY_API_PREFIXES`
och kan endast nås via loopback. En angripare som får tag på en JWT via en
Cloudflare-/Ngrok-tunnel kan inte använda proxyn för att nå inbäddade tjänster.

---

## 5. Säkerhet

### LOCAL_ONLY-tillämpning (hård regel #17)

Alla routes under `/api/services/` och `/dashboard/providers/services/*/embed/`
klassificeras som LOCAL_ONLY i `src/server/authz/routeGuard.ts`. Loopback-kontrollen
körs ovillkorligen före alla autentiseringsgrenar:

```
begäran anländer
  → isLocalOnlyPath(path)?
      → ej loopback → 403 LOCAL_ONLY (alltid, före autentiseringskontrollen)
      → loopback    → fortsätt till normal autentisering
```

Detta förhindrar att en läckt JWT (t.ex. via en tunnel) utlöser `npm install` eller
start av processer. Se `docs/security/ROUTE_GUARD_TIERS.md` för den fullständiga
nivåmatrisen.

### Injektion av API-nyckel

9Router och Mux kräver en API-nyckel/bearer-token för sina egna HTTP-endpoints.
OmniRoute:

1. Genererar en nyckel via `crypto.randomBytes(32).toString("base64url")` med ett
   tjänstespecifikt prefix (`nr_` för 9Router, `mx_` för Mux).
2. Krypterar den vid lagring med AES-256-GCM (samma chiffer som används för leverantörsuppgifter).
3. Dekrypterar och injicerar den som en miljövariabel när processen startas —
   `NINEROUTER_API_KEY` för 9Router, `MUX_SERVER_AUTH_TOKEN` för Mux (aldrig en CLI-
   flagga, så token visas aldrig i `ps`/processlistor).
4. Returnerar aldrig nyckeln i klartext i något HTTP-svar.

CLIProxyAPI får en dedikerad dataplanenyckel som injiceras vid start
(`needsApiKey: true` — används för modellsynkronisering mot adaptern).

### SSRF-skydd

Den omvända HTTP-proxyn (`/dashboard/.../embed/[...path]`) är hårdkodad för att endast
vidarebefordra till `http://127.0.0.1:{port}`. Den följer aldrig omdirigeringar till
destinationer som inte är loopback. Biblioteket `ssrf-req-filter` används för att
avvisa alla uppströms-URL:er som matchas mot en adress utanför loopback-intervallet.

### Skalsäkerhet (hård regel #13)

`npm install` anropas via `execFile('npm', ['install', pkg, '--prefix', dir])` —
inga mallitteraler, inget skal och ingen interpolering av externa sökvägar i
kommandosträngen. Värden vid körning (portar, API-nycklar) skickas via den underordnade
processens `env`-objekt.

### Sanering av fel (hård regel #12)

Alla felsvar från `/api/services/*` går genom `buildErrorBody()` eller
`sanitizeErrorMessage()`. Råa `err.stack` och `err.message` returneras aldrig
ordagrant till anroparen.

---

## 6. Lägga till en ny inbäddad tjänst

Följ dessa 8 steg. Läs de befintliga implementationerna i `src/lib/services/installers/`
och `src/app/api/services/` som den kanoniska referensen.

### Steg 1 — Skapa installeraren

Skapa `src/lib/services/installers/{name}.ts` med `ninerouter.ts` som modell:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // välj en ledig port

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Använd `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` från `installers/utils.ts`
— aldrig `execSync` eller skalinterpolering.

### Steg 2 — Registrera i bootstrap

Lägg till en `ServiceEntry` i `SERVICES`-arrayen i `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false om ingen API-nyckel behövs
}
```

Utöka `buildSpawnArgsFactory()` för att hantera `cfg.tool === "myservice"`.

#### Utbytbart kontrakt för leverantörsplugin (Fas 1, #7333)

`src/lib/services/providerPlugins/` introducerar ett `ServiceProviderPlugin`-kontrakt som
samlar fälten från en backends `bootstrap.ts`-`ServiceEntry` och manifestmallfälten i
`serviceBackends.ts` i ett enda objekt, i stället för att samma backends struktur
uttrycks separat i två filer utan koppling till varandra. I skrivande stund är
**endast `9router` migrerad** — `bootstrap.ts` härleder sin post i `SERVICES[]` från
`getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`)
och utlöser ett startfel om pluginen någonsin saknas. `cliproxy`, `mux` och `bifrost`
använder fortfarande de befintliga infogade literalerna i `SERVICES[]` oförändrade.

`open-sse/config/providerPluginManifest.ts` har också fått hjälpfunktionen
`createServiceBackendManifestEntry(pluginId, template)`, som bygger en välformad
`ProviderPluginManifestEntry` från en post i `SERVICE_BACKEND_MANIFEST_TEMPLATE` — den
är **ännu inte** inkopplad i någon aktiv sökväg för begäranden (varken
`generateProviderPluginManifestFromRegistry()` eller `/v1/providers/[provider]/models`);
detta återstår som en uppföljning när kontraktet har verifierats för en andra backend.

Följande har skjutits upp till uppföljande PR:er och spåras under ärende #7333:
migrering av `cliproxyapi` genom samma register, generalisering av `mux`/`bifrost` till
unionen `ServiceBackendPluginId`, införlivning av specialfallen för exekverarroutning
(`open-sse/executors/index.ts`, `open-sse/handlers/chatCore/executorProxy.ts`) i
pluginkontraktet samt inkoppling av `createServiceBackendManifestEntry()` i en aktiv
kodsökväg för manifest/modeller.

### Steg 3 — Lägg till migrering och initiala databasdata

Säkerställ att tjänsten har en rad i `version_manager` via en migrering i
`src/lib/db/migrations/`. Raden ska innehålla:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Steg 4 — Skapa de 7 API-endpointsen

Under `src/app/api/services/{name}/`:

```
_lib.ts            hjälpfunktionen getOrInitSupervisor()
install/route.ts   POST — anropar installer.install()
start/route.ts     POST — anropar supervisor.start()
stop/route.ts      POST — anropar supervisor.stop()
restart/route.ts   POST — anropar supervisor.restart()
update/route.ts    POST — anropar installer.update()
status/route.ts    GET  — slår samman live- och DB-status
auto-start/route.ts POST — växlar flaggan auto_start
```

Den delade rutten `GET /api/services/[name]/logs` är redan inkopplad — inga ändringar
behövs där.

Delegera alla felsvar via `createErrorResponse()` / `buildErrorBody()`.

### Steg 5 — Lägg till i LOCAL_ONLY_API_PREFIXES

Verifiera i `src/server/authz/routeGuard.ts` att `/api/services/` redan finns med.
Om du introducerar ett nytt prefix (t.ex. `/api/tools/`), lägg till det i både
`LOCAL_ONLY_API_PREFIXES` och, om det startar processer, i `SPAWN_CAPABLE_PREFIXES`.
Lägg till ett test i `tests/unit/authz/routeGuard.test.ts`.

### Steg 6 — Lägg till UI-fliken

Skapa `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Återanvänd delade komponenter:

- `ServiceStatusCard` — aktuell status + hälsomärke
- `ServiceLifecycleButtons` — Starta / Stoppa / Starta om / Uppdatera
- `ServiceLogsPanel` — SSE-loggsvans (ansluter till `/api/services/{name}/logs`)
- `ApiKeyCard` — visa + rotera nyckel (om `needsApiKey: true`)

Registrera fliken i `ServicesPageShell.tsx`.

### Steg 7 — Lägg till providerposten (om tjänsten är ett routningsmål)

Om den inbäddade tjänsten exponerar en OpenAI-kompatibel `/v1/chat/completions`-slutpunkt:

1. Lägg till en providerpost i `src/shared/constants/providers.ts` med `isEmbeddedService: true`.
2. Skapa `open-sse/executors/{name}.ts` som utökar `BaseExecutor`. Slå upp port och
   API-nyckel på nytt för varje begäran (cacha dem aldrig i konstruktorn). Returnera ett
   `503 service_not_running`-svar när övervakarens tillstånd inte är `"running"`.
3. Registrera modeller i `open-sse/config/providerRegistry.ts` med tjänsteprefixet
   (t.ex. `myservice/sub/model`). `modelSync.ts` håller dem uppdaterade.

### Steg 8 — Dokumentera och testa

1. Uppdatera `docs/frameworks/EMBEDDED-SERVICES.md` (den här filen) — lägg till tjänsten i
   tabellen i §1 och eventuella nya slutpunkter i §4.
2. Lägg till enhetstester i `tests/unit/services/` (livscykel, installerare, API-form).
3. Lägg till ett integrationstest i `tests/integration/services/` (bakom `RUN_SERVICES_INT=1`).
4. Uppdatera `docs/openapi.yaml` med de nya slutpunkterna.

---

## 7. Felsökning

### Tjänsten startar inte

**Symptom:** Startknappen returnerar 503, tillståndet förblir `"error"` eller `"starting"`.

**Checklista:**

1. Kontrollera `GET /api/services/{name}/logs` (eller loggpanelen i kontrollpanelen). Leta
   efter rader som `Error: ENOENT`, `address already in use` eller `Cannot find module`.
2. Verifiera att `npm` finns i PATH: kör `which npm` från samma användarkonto som kör OmniRoute.
3. Verifiera att tjänsten är installerad: kontrollera `GET /api/services/{name}/status` för
   `installedVersion`. Om värdet är `null` ska du först köra installationen.
4. Kontrollera att `DATA_DIR/services/{name}/node_modules/` finns och inte är tom.
5. Kontrollera fältet `lastError` i statussvaret för den rensade orsaken till avslutet.

---

### Kallstarten är långsam (> 10 s innan `running` nås)

**Symptom:** Tillståndet förblir `"starting"` under lång tid innan det övergår till `"running"` eller `"error"`.

**Förklaring:** 9Routers kallstart innefattar import av stora beroendeträd (DNS-,
tunnel- och MITM-moduler). Standardintervallet för hälsokontroller är 2 s med 3 försök innan
övervakaren rapporterar en tidsgränsöverskridning (men fortsätter att kontrollera).

**Åtgärd:** Tidsgränsen för `healthIntervalMs` och `waitForHealthy`
(`healthIntervalMs * 3`) kan konfigureras i `bootstrap.ts`. För tjänster med längre
starttider kan du öka `healthIntervalMs` till 5000 och `stopTimeoutMs` till 30 000.

---

### Portkonflikt (`EADDRINUSE`)

**Symptom:** Loggarna visar `address already in use :::20130`.

**Orsaker:**

- En annan process använder redan port 20130.
- En tidigare 9Router-process stoppades inte helt (zombie-PID).

**Åtgärd:**

1. Ändra standardporten via miljövariabeln `NINEROUTER_PORT` i `.env`.
2. Hitta och avsluta processen som orsakar konflikten: `lsof -ti :20130 | xargs kill -9`.
3. Porten kan konfigureras per tjänst i `bootstrap.ts` via fältet `port`.

**Obs!** 9Router använder som standard port 20130 specifikt för att undvika konflikt med
OmniRoutes standardport 20128.

---

### Åtkomst nekad (EACCES) vid installation

**Symptom:** Installationen returnerar 500 och loggarna visar `EACCES` eller `permission denied`.

**Orsaker:**

- `DATA_DIR` eller dess överordnade katalog är inte skrivbar för OmniRoute-processen.
- Körning i rootless Docker utan skrivåtkomst till den monterade volymen.

**Åtgärd:**

1. Kontrollera `DATA_DIR` (standard: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Säkerställ att OmniRoute-processens användare äger katalogen: `chown -R $USER ~/.omniroute/`
3. I Docker ska du säkerställa att den monterade volymen har rätt behörigheter för containeranvändaren.

---

### Uppdateringen misslyckas (tidsgränsöverskridning eller nätverksfel för `npm install`)

**Symptom:** Uppdateringen returnerar 500 med `InstallError` och loggarna visar en nätverkstidsgränsöverskridning.

**Checklista:**

1. Bekräfta att npm-registret kan nås: `npm ping`.
2. Kontrollera om en företagsproxy används: `npm config get proxy`, `npm config get https-proxy`.
3. Prova installationen manuellt: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Om systemet körs bakom ett isolerat nätverk ska du hämta tar-arkivet i förväg och använda `npm install /path/to/tarball.tgz`.

---

### Tjänsten visar tillståndet `"error"` omedelbart efter start (snabb krasch)

**Symptom:** Tillståndet övergår från `"starting"` till `"error"` på mindre än 5 sekunder.
`lastError` visar `"Fast crash (exited with code 1)"`.

**Checklista:**

1. Läs hela slutet av loggen: `GET /api/services/{name}/logs?tail=500`.
2. Vanlig orsak: miljövariabler som tjänsten förväntar sig saknas.
3. För 9Router: verifiera att `NINEROUTER_DISABLE_MITM=true` och
   `NINEROUTER_DISABLE_TUNNEL=true` finns i miljön som skickas vid processstart (se
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. Vanliga frågor

**F: Kan jag exponera slutpunkterna för de inbäddade tjänsterna för klienter utanför loopback?**

Nej. LOCAL_ONLY-nivån är avsiktlig (strikt regel nr 17). Rutter som kan köra
`npm install` eller starta `node`-processer får inte vara åtkomliga från trafik
utanför loopback, eftersom en läckt JWT via en tunnel (Cloudflare, Ngrok, Tailscale)
annars skulle möjliggöra godtycklig processstart. Det finns inget undantag för
`/api/services/` — till skillnad från `/api/mcp/` är den exkluderad från listan över
undantag för hanteringsbehörighet. Se `docs/security/ROUTE_GUARD_TIERS.md`.

---

**F: Kommer 9Router och CLIProxyAPI att vara tillgängliga i produktions-/molndistributioner?**

Ja. Båda tjänsterna följer samma lokalt orienterade modell som OmniRoute. De körs
på samma dator och kommunicerar via loopback. Med ”produktion” avses här den VPS
eller lokala server där OmniRoute är distribuerat, inte en extern molnleverantör.

---

**F: Hur felsöker jag övervakaren?**

1. Följ SSE-loggströmmen: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Kontrollera de strukturerade loggarna i OmniRoutes pino-utdata, filtrerade efter
   namnrymden `service:supervisor`.
3. Inspektera databasraden: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Använd `GET /api/services/9router/status` för att se aktuellt körningstillstånd, PID, hälsa
   och `lastError` i ett enda anrop.

---

**F: Övervakaren visar `health: "degraded"` eller `health: "unknown"`, men tillståndet är `"running"`. Är det ett problem?**

`"degraded"` innebär att hälsokontrollen returnerade ett svar som inte var 200. `"unknown"` innebär att ingen
kontroll har slutförts ännu (kapplöpning med den första avläsningen). Båda är tillfälliga under uppstart.
Om hälsan förblir `"degraded"` i mer än `healthIntervalMs * 3` ms efter
`"running"` körs den inbäddade tjänsten, men dess HTTP-API svarar inte. Kontrollera
om porten är korrekt i statussvaret och om tjänsten faktiskt
lyssnar på den porten.

---

**F: Kan jag ändra API-nyckeln för 9Router utan en fullständig omstart?**

Nej. API-nyckeln skickas till 9Router via en miljövariabel när processen startas.
Miljövariabler kan inte ändras i en process som körs. `POST .../rotate-key`
stoppar och startar automatiskt om tjänsten för att tillämpa den nya nyckeln. Nyckelrotationen
träder i kraft inom tjänstens `stopTimeoutMs` (standardvärde 15 s) plus dess uppstartstid.

---

**F: Vilken är ringbuffertens gräns och vad händer när den blir full?**

Varje tjänst har en dedikerad ringbuffert på 5 MB. När bufferten är full tas de äldsta
loggraderna bort för att ge plats åt nya. SSE-händelsen `snapshot` returnerar
de senaste raderna inom gränsen `tail`. Loggar sparas inte på disk om inte
`logsBufferPath` har angetts i databasraden.

---

## Se även

- `docs/security/ROUTE_GUARD_TIERS.md` — information om LOCAL_ONLY-nivån
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 mappning av modulen för inbäddade tjänster
- `docs/architecture/ARCHITECTURE.md` — kontext på systemnivå
- `docs/openapi.yaml` — maskinläsbara slutpunktsdefinitioner
- `CLAUDE.md` §”Lägga till en ny inbäddad tjänst” — checklista för snabbreferens
