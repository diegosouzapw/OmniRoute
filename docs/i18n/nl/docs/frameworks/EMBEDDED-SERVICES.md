# Embedded Services (Nederlands)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Versie:** v3.8.44
> **Laatst bijgewerkt:** 2026-07-03
> **Doelgroep:** Engineers die ingebedde services (9Router, CLIProxyAPI, Mux, Bifrost) toevoegen, onderhouden of debuggen.

Ingebedde services zijn lokaal geïnstalleerde proces-sidecartools die OmniRoute installeert, beheert en
beschikbaar stelt als volwaardige routeringsdoelen. In tegenstelling tot externe providers (die via internet
met API-sleutels worden benaderd), worden ingebedde services op dezelfde machine als OmniRoute uitgevoerd en communiceren ze via loopback.

---

## Inhoudsopgave

1. [Overzicht](#1-overview)
2. [Architectuur — 4 lagen](#2-architecture--4-layers)
3. [Levenscyclustoestandsmachine](#3-lifecycle-state-machine)
4. [API-referentie](#4-api-reference)
5. [Beveiliging](#5-security)
6. [Een nieuwe ingebedde service toevoegen](#6-adding-a-new-embedded-service)
7. [Probleemoplossing](#7-troubleshooting)
8. [Veelgestelde vragen](#8-faq)

---

## 1. Overzicht

### Waarom ingebedde services?

Er zijn vijf ingebedde services:

| Service         | npm-pakket                        | Standaardpoort | Doel                                                                                                                                                                                                                |
| --------------- | --------------------------------- | :------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                         |     20130      | AI-router die OmniRoute als subprovider kan gebruiken. Modellen worden beschikbaar gesteld als `9router/{sub}/{model}`                                                                                              |
| **CLIProxyAPI** | GitHub-releasebinary (`cliproxy`) |      8317      | Lokale proxyadapter voor Anthropic CLI-authenticatiestromen. Biedt fallback-routering wanneer OAuth-tokens verlopen                                                                                                 |
| **Mux**         | `mux` (headless `mux server`)     |      8322      | Lokale daemon voor agentorkestratie (coder/mux). Alleen levenscyclusbeheer — geen routeringsdoel (geen LLM-proxying).                                                                                               |
| **Bifrost**     | `@maximhq/bifrost`                |      8080      | Go AI-gateway-relaybackend. Wanneer deze actief is, wordt deze automatisch geselecteerd door de relayroute (`/v1/relay/`)                                                                                           |
| **Dario**       | `@askalf/dario`                   |      3456      | Claude-abonnementsproxy — alternatief/failover voor CLIProxyAPI voor verkeer in Claude Code-indeling; de geïnjecteerde sleutel wordt `DARIO_ADMIN_TOKEN`, waarmee het OAuth-beheervlak `/admin/*` wordt afgeschermd |

Alle vijf volgen hetzelfde supervisiemodel:

- OmniRoute installeert ze onder `DATA_DIR/services/{name}/` (geïsoleerd van OmniRoutes eigen `package.json`)
- OmniRoute start en bewaakt ze als onderliggende processen
- OmniRoute injecteert een tijdelijke API-sleutel in de omgeving van het onderliggende proces en roteert deze zonder downtime (waar van toepassing)
- Alle beheerroutes (`/api/services/*`) zijn **LOCAL_ONLY** — alleen toegankelijk via loopback (harde regel #17)

### Belangrijkste beslissingen (uit het ontwerpplan)

| Beslissing                                    | Waarde                                                                               |
| --------------------------------------------- | ------------------------------------------------------------------------------------ |
| Dashboardtoegang tot de native UI van 9Router | Reverse proxy op `/dashboard/providers/services/9router/embed/*`                     |
| Installatiemechanisme                         | `npm install {package}` via `execFile` (geen shellinterpolatie)                      |
| Gebruiksmodus                                 | Provider geregistreerd als `9router/{sub}/{model}` in de routeringsengine            |
| API-sleutelbeheer                             | OmniRoute genereert, versleutelt in rust (AES-256-GCM) en injecteert via de omgeving |
| Dashboardlocatie                              | `/dashboard/providers/services` (drie tabbladen)                                     |
| Automatisch starten                           | Schakeloptie per service, standaard UIT                                              |

---

## 2. Architectuur — 4 lagen

```
┌────────────────────────────────────────────────────────────────────┐
│  Laag 1 — UI                                                       │
│  /dashboard/providers/services  (tabbladen: CLIProxyAPI | 9Router | Mux)│
│  Live logs (SSE), Starten/Stoppen/Herstarten/Bijwerken, Instellingen, Installeren│
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Omhulsel + tabbladroutering via ?tab= │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Laag 2 — API (LOCAL_ONLY — alleen loopback)                       │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (omgekeerde HTTP- + WebSocket-proxy → 9Router-upstream)         │
│                                                                    │
│  Poortwachter: LOCAL_ONLY_API_PREFIXES bevat "/api/services/" en   │
│        "/dashboard/providers/services/*/embed/"                    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ aanroepen binnen hetzelfde proces
┌──────────────────────▼─────────────────────────────────────────────┐
│  Laag 3 — ServiceSupervisor (src/lib/services/)                    │
│                                                                    │
│  ServiceSupervisor.ts   Generieke supervisor (child_process.spawn) │
│    ├── installeren: execFile('npm', ['install', pkg, '--prefix'])   │
│    ├── starten:     spawn(node, [entrypoint], {env, cwd})           │
│    ├── api_key:     crypto.randomBytes(32) → env NINEROUTER_API_KEY │
│    ├── poort:       20130 voor 9Router (configureerbaar)            │
│    ├── logs:        stdio-ringbuffer van 5 MB → SSE-events          │
│    ├── status:      HTTP GET /health elke 2–5 s, lui herstel        │
│    └── levenscyclus: SIGTERM 15 s → SIGKILL                         │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Initialiseert alle SERVICES[] bij processtart  │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       Periodieke GET /v1/models → tabel service_models│
│  ringBuffer.ts      Circulaire logbuffer (5 MB per service)        │
│  healthCheck.ts     Periodieke HTTP-statuscontrole                 │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts             │
│                      (installatieadapters)                          │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ OpenAI-compatibele HTTP (loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Laag 4 — Provider / routering                                     │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Zoekt poort en API-sleutel per aanvraag opnieuw op (geen cache).│
│    Verwijdert het voorvoegsel "9router/" uit de model-id vóór het  │
│    proxyen.                                                        │
│    Retourneert 503 service_not_running als de supervisor niet de   │
│    status "running" heeft.                                         │
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Vermelding voor "9router": isEmbeddedService: true              │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Modellen opgeslagen als "9router/{sub}/{model}" (met voorvoegsel).│
│    Elke 5 min gesynchroniseerd door modelSync.ts.                  │
│                                                                    │
│  Mux wordt ALLEEN qua levenscyclus beheerd (lagen 1-3) — het is een│
│  daemon voor agentorkestratie, geen LLM-proxy, en heeft daarom geen│
│  executor-/providervermelding in laag 4 en is nooit een            │
│  routeringsdoel.                                                   │
└────────────────────────────────────────────────────────────────────┘
```

### Belangrijkste bronbestanden

| Bestand                                     | Rol                                                         |
| ------------------------------------------- | ----------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Kernklasse: levenscyclus, vergrendeling, status, ringbuffer |
| `src/lib/services/bootstrap.ts`             | Registratie op procesniveau en automatisch starten          |
| `src/lib/services/registry.ts`              | Singleton-map `tool → supervisor`                           |
| `src/lib/services/apiKey.ts`                | Sleutelgeneratie, AES-256-GCM-versleuteling in rust         |
| `src/lib/services/modelSync.ts`             | Periodieke modelsynchronisatie (5 min) + op aanvraag        |
| `src/lib/services/ringBuffer.ts`            | Circulaire logbuffer van 5 MB met SSE-abonnement            |
| `src/lib/services/healthCheck.ts`           | HTTP-statuscontrole (configureerbaar interval)              |
| `src/lib/services/installers/ninerouter.ts` | Installeren/bijwerken/verwijderen via npm voor 9Router      |
| `src/lib/services/installers/cliproxy.ts`   | Installeren/bijwerken/verwijderen via npm voor CLIProxyAPI  |
| `src/lib/services/installers/mux.ts`        | Installeren/bijwerken/verwijderen via npm voor Mux          |
| `src/app/api/services/9router/_lib.ts`      | Helper `getOrInitSupervisor()`                              |
| `src/app/api/services/[name]/logs/route.ts` | Gedeeld SSE-logeindpunt                                     |
| `open-sse/executors/ninerouter.ts`          | Provider-executor (laag 4)                                  |

---

## 3. Levenscyclusstatusmachine

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
                  statuscontrole ok │         crash / SIGTERM    │
                               ┌────▼─────┐  (afsluiten binnen 5 s)│
                               │ running  │──── crash ──────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Statussen worden opgeslagen in de DB-tabel `version_manager` (kolom `status`) en gespiegeld
in de status in het geheugen van `ServiceSupervisor`. De status in het geheugen is leidend voor
een actief proces; de DB-status is het duurzame terugvalmechanisme bij het opstarten.

### Statusovergangen

| Van             | Gebeurtenis                        | Naar                   |
| --------------- | ---------------------------------- | ---------------------- |
| `not_installed` | `install()` slaagt                 | `stopped`              |
| `stopped`       | `start()` aangeroepen              | `starting`             |
| `starting`      | statuscontrole retourneert 200     | `running`              |
| `starting`      | proces stopt voordat het gezond is | `error`                |
| `running`       | `stop()` aangeroepen               | `stopping` → `stopped` |
| `running`       | proces stopt onverwacht (< 5 s)    | `error` (snelle crash) |
| `running`       | proces stopt onverwacht (> 5 s)    | `error`                |
| `error`         | `start()` aangeroepen              | `starting`             |
| elke            | `stop()` tijdens `stopping`        | geen bewerking         |

### Bewerkingsvergrendeling

`ServiceSupervisor` voert levenscyclusbewerkingen serieel uit via een asynchrone bewerkingsvergrendeling
(`withLock()`). Gelijktijdige aanroepen van `start()` op dezelfde supervisor resulteren in precies
één gestart proces; de tweede aanroeper wacht en retourneert de bestaande status. Dit voorkomt
racecondities wanneer bijvoorbeeld automatisch starten en een UI-knop gelijktijdig worden geactiveerd.

---

## 4. API-referentie

Alle routes onder `/api/services/` zijn **LOCAL_ONLY** (alleen loopback, harde regel #17).
Niet-loopbackverzoeken ontvangen `403 LOCAL_ONLY`, ongeacht het authenticatietoken.

### 4.1 9Router-eindpunten (11 routes)

#### `POST /api/services/9router/install`

Installeer 9Router vanuit npm. Maakt `DATA_DIR/services/9router/` met een eigen
`package.json` en `node_modules/`. Conflicteert niet met de eigen afhankelijkheden van OmniRoute.

**Aanvraagbody** (alles optioneel):

```json
{ "version": "latest" }
```

| Veld      | Type     | Standaard  | Beschrijving                           |
| --------- | -------- | ---------- | -------------------------------------- |
| `version` | `string` | `"latest"` | Te installeren npm-versietag of semver |

**Antwoorden:**

| Status | Beschrijving                                                            |
| ------ | ----------------------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                  |
| `400`  | Ongeldige aanvraagbody (Zod-validatiefout)                              |
| `409`  | Installatie is al bezig (vergrendeling actief)                          |
| `500`  | npm-installatie mislukt — zie `message` voor een duidelijke foutmelding |

**Opmerkingen:** Gebruikt `execFile('npm', [...])` — geen shell, geen interpolatie (harde regel #13).
EACCES-fouten worden als duidelijke foutmeldingen weergegeven.

---

#### `POST /api/services/9router/start`

Start 9Router. Registreert een supervisor als die nog niet is geregistreerd en roept vervolgens
`supervisor.start()` aan. Idempotent wanneer de service al actief is.

**Aanvraagbody:** geen

**Antwoorden:**

| Status | Beschrijving                                              |
| ------ | --------------------------------------------------------- |
| `200`  | `ServiceStatus`-object (zie schema hieronder)             |
| `409`  | 9Router is niet geïnstalleerd (`status: "not_installed"`) |
| `503`  | Starten mislukt (procesfout — zie `lastError`)            |

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

Stop 9Router op gecontroleerde wijze. Verstuurt SIGTERM, wacht 15 s en verstuurt vervolgens SIGKILL als het proces nog actief is.
Idempotent wanneer de service al is gestopt.

**Aanvraagbody:** geen

**Antwoorden:**

| Status | Beschrijving                        |
| ------ | ----------------------------------- |
| `200`  | `ServiceStatus` (status: "stopped") |
| `503`  | Stoppen is onverwacht mislukt       |

---

#### `POST /api/services/9router/restart`

Gelijkwaardig aan `stop()` gevolgd door `start()` binnen de bewerkingsvergrendeling.

**Aanvraagbody:** geen

**Antwoorden:** hetzelfde als bij `start` (retourneert de uiteindelijke `ServiceStatus`).

---

#### `POST /api/services/9router/update`

Werkt 9Router bij naar een nieuwere npm-versie. Als de service actief is, wordt deze
eerst gestopt, wordt npm install uitgevoerd (waarbij de nieuwere versie ter plaatse wordt geïnstalleerd)
en wordt de service vervolgens opnieuw gestart.

**Aanvraagbody** (alles optioneel):

```json
{ "version": "latest" }
```

**Antwoorden:**

| Status | Beschrijving                                                    |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Ongeldige body                                                  |
| `500`  | npm-update mislukt                                              |

---

#### `POST /api/services/9router/rotate-key`

Genereert een nieuwe API-sleutel voor 9Router, versleutelt deze bij opslag en herstart de service
(indien actief), zodat deze de nieuwe sleutel uit zijn omgeving oppikt. De oude sleutel wordt
onmiddellijk ongeldig gemaakt.

**Requestbody:** geen

**Responses:**

| Status | Beschrijving                               |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Rotatie mislukt                            |

**Beveiliging:** De nieuwe sleutel wordt nooit in de response geretourneerd (geen lek van inloggegevens).
Deze wordt versleuteld opgeslagen (AES-256-GCM) in de tabel `version_manager`.

---

#### `GET /api/services/9router/status`

Retourneert de gecombineerde live- en databasestatus, inclusief versiemetadata en een voorbeeldweergave van de API-sleutel.

**Responses:**

| Status | Beschrijving                   |
| ------ | ------------------------------ |
| `200`  | Zie het onderstaande schema    |
| `500`  | Lezen van de status is mislukt |

**Responseschema:**

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

Schakelt de vlag voor automatisch starten in of uit. Wanneer `enabled: true`, wordt de service automatisch gestart
wanneer OmniRoute de volgende keer opstart (als de service is geïnstalleerd).

**Requestbody:**

```json
{ "enabled": true }
```

**Responses:**

| Status | Beschrijving          |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | Ongeldige requestbody |

---

#### `GET /api/services/9router/logs`

SSE-stream met live-logboeken uit de ringbuffer voor stdout/stderr van 9Router.

**Queryparameters:**

| Parameter | Type      | Standaardwaarde | Beschrijving                                                          |
| --------- | --------- | --------------- | --------------------------------------------------------------------- |
| `tail`    | `integer` | 200             | Aantal historische regels dat eerst wordt verzonden (max. 1000)       |
| `filter`  | `string`  | geen            | Hoofdletterongevoelig subtekenreeksfilter (geen regex — ReDoS-veilig) |

**SSE-events:**

| Event       | Gegevens    | Beschrijving                        |
| ----------- | ----------- | ----------------------------------- |
| `snapshot`  | `LogLine[]` | Initiële historische laatste regels |
| `log`       | `LogLine`   | Live-logregel                       |
| `heartbeat` | `{}`        | Keepalive om de 15 s                |

**LogLine-schema:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Responses:**

| Status | Beschrijving                                          |
| ------ | ----------------------------------------------------- |
| `200`  | `text/event-stream`                                   |
| `400`  | Parameter `filter` is te lang (> 200 tekens)          |
| `404`  | Service niet gevonden (supervisor niet geregistreerd) |

---

### 4.2 CLIProxyAPI-endpoints (10 routes)

CLIProxyAPI heeft dezelfde endpointstructuur als 9Router, maar zonder `rotate-key`, en met
`accounts`, `provider-expose` en `auto-restart-adopted`. De service ontvangt nu een
speciale API-sleutel voor het datavlak die bij het starten wordt geïnjecteerd (`needsApiKey: true` in
`bootstrap.ts`, gebruikt voor modelsynchronisatie); `status` bevat minder velden.

| Methode | Pad                                 | Beschrijving                                    |
| ------- | ----------------------------------- | ----------------------------------------------- |
| `POST`  | `/api/services/cliproxy/install`    | CLIProxyAPI installeren vanuit npm              |
| `POST`  | `/api/services/cliproxy/start`      | CLIProxyAPI starten                             |
| `POST`  | `/api/services/cliproxy/stop`       | CLIProxyAPI stoppen                             |
| `POST`  | `/api/services/cliproxy/restart`    | CLIProxyAPI herstarten                          |
| `POST`  | `/api/services/cliproxy/update`     | Bijwerken naar een nieuwere versie              |
| `GET`   | `/api/services/cliproxy/status`     | Live- en databasestatus (zonder `apiKeyMasked`) |
| `POST`  | `/api/services/cliproxy/auto-start` | Automatisch starten in- of uitschakelen         |

Het gedeelde endpoint `GET /api/services/{name}/logs` (zie §4.1) werkt voor alle
vier services via het dynamische segment `[name]`.

---

### 4.3 Mux-endpoints (8 routes)

Mux heeft dezelfde endpointstructuur als CLIProxyAPI — geen `rotate-key`-route in het API-
oppervlak (het bearer-token wordt op dezelfde manier gegenereerd als dat van 9Router via
`getOrCreateApiKey("mux")` en geïnjecteerd via de omgevingsvariabele `MUX_SERVER_AUTH_TOKEN`, maar
er is nog geen speciaal endpoint voor rotatie). Voor Mux wordt alleen de levenscyclus beheerd: in tegenstelling tot
9Router heeft het geen Layer 4-executor en wordt het nooit als routeringsprovider geregistreerd.

| Methode | Pad                            | Beschrijving                             |
| ------- | ------------------------------ | ---------------------------------------- |
| `POST`  | `/api/services/mux/install`    | Mux installeren vanuit npm (`npm i mux`) |
| `POST`  | `/api/services/mux/start`      | Mux starten (`mux server`)               |
| `POST`  | `/api/services/mux/stop`       | Mux stoppen                              |
| `POST`  | `/api/services/mux/restart`    | Mux herstarten                           |
| `POST`  | `/api/services/mux/update`     | Bijwerken naar een nieuwere npm-versie   |
| `GET`   | `/api/services/mux/status`     | Live- en databasestatus                  |
| `POST`  | `/api/services/mux/auto-start` | Automatisch starten in- of uitschakelen  |

---

### 4.4 Bifrost-endpoints (8 routes)

Bifrost is een in Go gebouwde AI-gateway-relaybackend (`@maximhq/bifrost`). Het gebruikt dezelfde
endpointstructuur als CLIProxyAPI (geen `rotate-key` — Bifrost beheert zijn eigen provider-
sleutels in `config.json` onder de bijbehorende `-app-dir`).

| Methode | Pad                                | Beschrijving                                                    |
| ------- | ---------------------------------- | --------------------------------------------------------------- |
| `POST`  | `/api/services/bifrost/install`    | Bifrost installeren vanuit npm (`@maximhq/bifrost`)             |
| `POST`  | `/api/services/bifrost/start`      | Bifrost starten op poort 8080 (standaard)                       |
| `POST`  | `/api/services/bifrost/stop`       | Bifrost stoppen                                                 |
| `POST`  | `/api/services/bifrost/restart`    | Bifrost opnieuw starten                                         |
| `POST`  | `/api/services/bifrost/update`     | Bijwerken naar een nieuwere versie                              |
| `GET`   | `/api/services/bifrost/status`     | Live- en DB-status                                              |
| `POST`  | `/api/services/bifrost/auto-start` | Automatisch starten in-/uitschakelen                            |
| `GET`   | `/api/services/bifrost/logs`       | SSE-logboekstaart (via gedeelde dynamische route `[name]/logs`) |

**Routeringsconfiguratie:** Wanneer `BIFROST_BASE_URL` niet is ingesteld en de bewaakte Bifrost-
instantie actief is, gebruikt `getBifrostRoutingConfig()` (in `routingBackend.ts`) automatisch
`http://127.0.0.1:{port}` als de basis-URL voor de relay. Een expliciet ingestelde
omgevingsvariabele `BIFROST_BASE_URL` heeft altijd voorrang.

---

### 4.5 Dario-eindpunten (12 routes)

Dezelfde levenscyclusstructuur als de andere services (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`), plus een door een token beveiligd OAuth-
besturingsvlak onder `admin/`: `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (allemaal beveiligd met `DARIO_ADMIN_TOKEN`).

### 4.6 Reverse proxy (ingesloten 9Router-dashboard)

Het dashboard sluit de 9Router-webinterface via een interne reverse proxy in een iframe in op:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Deze proxy:

- Stuurt het verzoek door naar `http://127.0.0.1:{port}/{path}` (alleen loopback)
- Verwijdert binnenkomende `cookie`- en `authorization`-headers (geen lekkage van de OmniRoute-sessie)
- Voegt `Authorization: Bearer {apiKey}` toe voor 9Router-authenticatie
- Verwijdert `set-cookie`, `content-security-policy`, `x-frame-options` en `cross-origin-*` uit het antwoord
- Herschrijft HTML-antwoorden om `<base href>` toe te voegen en absolute paden te normaliseren (`/foo` → `/dashboard/.../embed/foo`)

WebSocket-upgrades voor het ingesloten dashboard worden afgehandeld door een aanvullende server op een
speciale poort (zie `src/lib/services/embedWsProxy.ts`).

**Beveiliging:** De routes van de insluitproxy zijn geclassificeerd onder `LOCAL_ONLY_API_PREFIXES`
en zijn uitsluitend bereikbaar via loopback. Een aanvaller die via een
Cloudflare-/Ngrok-tunnel een JWT bemachtigt, kan geen proxyverbinding met ingesloten services maken.

---

## 5. Beveiliging

### LOCAL_ONLY-handhaving (harde regel #17)

Alle routes onder `/api/services/` en `/dashboard/providers/services/*/embed/` zijn
geclassificeerd als LOCAL_ONLY in `src/server/authz/routeGuard.ts`. De loopbackcontrole
wordt onvoorwaardelijk vóór elke authenticatievertakking uitgevoerd:

```
verzoek komt binnen
  → isLocalOnlyPath(path)?
      → geen loopback → 403 LOCAL_ONLY (altijd, vóór authenticatiecontrole)
      → loopback      → doorgaan met normale authenticatie
```

Dit voorkomt dat een gelekte JWT (bijvoorbeeld via een tunnel) `npm install` of
het starten van processen kan activeren. Zie `docs/security/ROUTE_GUARD_TIERS.md`
voor de volledige niveaumatrix.

### Injectie van API-sleutels

9Router en Mux vereisen een API-sleutel/bearertoken voor hun eigen HTTP-eindpunten.
OmniRoute:

1. Genereert een sleutel via `crypto.randomBytes(32).toString("base64url")` met een
   servicespecifiek voorvoegsel (`nr_` voor 9Router, `mx_` voor Mux).
2. Versleutelt deze in rust met AES-256-GCM (dezelfde versleuteling die voor providerreferenties wordt gebruikt).
3. Ontsleutelt en injecteert deze tijdens het starten als omgevingsvariabele —
   `NINEROUTER_API_KEY` voor 9Router, `MUX_SERVER_AUTH_TOKEN` voor Mux (nooit als CLI-
   vlag, zodat het token nooit in `ps`-/procesoverzichten verschijnt).
4. Retourneert de sleutel in platte tekst nooit in een HTTP-respons.

CLIProxyAPI ontvangt een speciale datavlaksleutel die tijdens het starten wordt geïnjecteerd
(`needsApiKey: true` — gebruikt voor modelsynchronisatie met de adapter).

### SSRF-verdediging

De omgekeerde HTTP-proxy (`/dashboard/.../embed/[...path]`) is hardgecodeerd om
alleen door te sturen naar `http://127.0.0.1:{port}`. Deze volgt nooit omleidingen
naar bestemmingen buiten loopback. De bibliotheek `ssrf-req-filter` wordt gebruikt om
elke upstream-URL te weigeren die wordt omgezet naar een adres buiten het loopbackbereik.

### Shellveiligheid (harde regel #13)

`npm install` wordt aangeroepen via `execFile('npm', ['install', pkg, '--prefix', dir])` —
geen templatestrings, geen shell en geen interpolatie van externe paden in de
opdrachtstring. Runtimewaarden (poorten, API-sleutels) worden doorgegeven via het
`env`-object van het onderliggende proces.

### Sanering van fouten (harde regel #12)

Alle foutresponsen van `/api/services/*` worden verwerkt via `buildErrorBody()` of
`sanitizeErrorMessage()`. Onbewerkte `err.stack` en `err.message` worden nooit
letterlijk aan de aanroeper geretourneerd.

---

## 6. Een nieuwe ingebedde service toevoegen

Volg deze 8 stappen. Gebruik de bestaande implementaties in `src/lib/services/installers/`
en `src/app/api/services/` als canonieke referentie.

### Stap 1 — Maak het installatieprogramma

Maak `src/lib/services/installers/{name}.ts`, gemodelleerd naar `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // kies een vrije poort

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Gebruik `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` uit `installers/utils.ts`
— nooit `execSync` of shellinterpolatie.

### Stap 2 — Registreer in bootstrap

Voeg een `ServiceEntry` toe aan de `SERVICES`-array in `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false als geen API-sleutel nodig is
}
```

Breid `buildSpawnArgsFactory()` uit om `cfg.tool === "myservice"` af te handelen.

#### Inplugbaar providerplugincontract (Fase 1, #7333)

`src/lib/services/providerPlugins/` introduceert een `ServiceProviderPlugin`-contract dat
de `ServiceEntry`-velden uit `bootstrap.ts` van een backend en de manifesttemplatesvelden
uit `serviceBackends.ts` in één object verpakt, in plaats van de vorm van dezelfde backend
afzonderlijk in twee niet-gerelateerde bestanden uit te drukken. Op het moment van schrijven
is **alleen `9router` gemigreerd** — `bootstrap.ts` leidt zijn vermelding in `SERVICES[]` af
van `getServiceProviderPlugin("9router")` (`src/lib/services/providerPlugins/registry.ts`)
en genereert een opstartfout als de plugin ooit ontbreekt. `cliproxy`, `mux` en `bifrost`
blijven ongewijzigd gebruikmaken van de reeds bestaande inline-literalen in `SERVICES[]`.

Aan `open-sse/config/providerPluginManifest.ts` is ook een aanvullende helper
`createServiceBackendManifestEntry(pluginId, template)` toegevoegd die een goed gevormde
`ProviderPluginManifestEntry` opbouwt vanuit een vermelding in `SERVICE_BACKEND_MANIFEST_TEMPLATE` —
deze is **nog niet** gekoppeld aan een actief verzoekpad (noch aan `generateProviderPluginManifestFromRegistry()`,
noch aan `/v1/providers/[provider]/models`); dat blijft vervolgwerk zodra het contract
voor een tweede backend is bewezen.

Uitgesteld naar vervolg-PR's, bijgehouden onder issue #7333: het migreren van `cliproxyapi`
via hetzelfde register, het generaliseren van `mux`/`bifrost` naar de `ServiceBackendPluginId`-union,
het opnemen van de speciale afhandeling voor executorroutering (`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`) in het plugincontract en het koppelen van
`createServiceBackendManifestEntry()` aan een actief manifest-/modelcodepad.

### Stap 3 — Voeg migratie en database-seed toe

Zorg via een migratie in `src/lib/db/migrations/` dat de service een rij heeft in
`version_manager`. De rij moet het volgende bevatten:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Stap 4 — Maak de 7 API-eindpunten

Onder `src/app/api/services/{name}/`:

```
_lib.ts            helper voor getOrInitSupervisor()
install/route.ts   POST — roept installer.install() aan
start/route.ts     POST — roept supervisor.start() aan
stop/route.ts      POST — roept supervisor.stop() aan
restart/route.ts   POST — roept supervisor.restart() aan
update/route.ts    POST — roept installer.update() aan
status/route.ts    GET  — voegt live- en databasestatus samen
auto-start/route.ts POST — schakelt de vlag auto_start om
```

De gedeelde route `GET /api/services/[name]/logs` is al gekoppeld — daar zijn geen wijzigingen
nodig.

Delegeer alle foutresponses via `createErrorResponse()` / `buildErrorBody()`.

### Stap 5 — Toevoegen aan LOCAL_ONLY_API_PREFIXES

Controleer in `src/server/authz/routeGuard.ts` of `/api/services/` al is opgenomen.
Als je een nieuw voorvoegsel introduceert (bijv. `/api/tools/`), voeg dit dan toe aan zowel
`LOCAL_ONLY_API_PREFIXES` als, als het processen start, aan `SPAWN_CAPABLE_PREFIXES`.
Voeg een test toe in `tests/unit/authz/routeGuard.test.ts`.

### Stap 6 — Het UI-tabblad toevoegen

Maak `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Hergebruik gedeelde componenten:

- `ServiceStatusCard` — actuele status + gezondheidsbadge
- `ServiceLifecycleButtons` — Starten / Stoppen / Herstarten / Bijwerken
- `ServiceLogsPanel` — SSE-logweergave (maakt verbinding met `/api/services/{name}/logs`)
- `ApiKeyCard` — sleutel weergeven + roteren (als `needsApiKey: true`)

Registreer het tabblad in `ServicesPageShell.tsx`.

### Stap 7 — De providervermelding toevoegen (als de service een routeringsdoel is)

Als de ingebedde service een OpenAI-compatibel `/v1/chat/completions`-eindpunt aanbiedt:

1. Voeg een providervermelding toe in `src/shared/constants/providers.ts` met `isEmbeddedService: true`.
2. Maak `open-sse/executors/{name}.ts` dat `BaseExecutor` uitbreidt. Zoek de poort en
   API-sleutel voor elk verzoek opnieuw op (sla deze nooit op in de constructor). Retourneer een
   `503 service_not_running`-respons wanneer de supervisorstatus niet `"running"` is.
3. Registreer modellen in `open-sse/config/providerRegistry.ts` met het servicevoorvoegsel
   (bijv. `myservice/sub/model`). `modelSync.ts` houdt ze actueel.

### Stap 8 — Documenteren en testen

1. Werk `docs/frameworks/EMBEDDED-SERVICES.md` (dit bestand) bij — voeg de service toe aan de
   tabel in §1 en eventuele nieuwe eindpunten aan §4.
2. Voeg unittests toe in `tests/unit/services/` (levenscyclus, installatieprogramma, API-structuur).
3. Voeg een integratietest toe in `tests/integration/services/` (achter `RUN_SERVICES_INT=1`).
4. Werk `docs/openapi.yaml` bij met de nieuwe eindpunten.

---

## 7. Problemen oplossen

### Service start niet

**Symptomen:** De startknop retourneert 503, de status blijft `"error"` of `"starting"`.

**Checklist:**

1. Controleer `GET /api/services/{name}/logs` (of het paneel Logs in het dashboard). Zoek
   naar regels zoals `Error: ENOENT`, `address already in use` of `Cannot find module`.
2. Controleer of `npm` in PATH staat: voer `which npm` uit vanuit hetzelfde gebruikersaccount waaronder OmniRoute wordt uitgevoerd.
3. Controleer of de service is geïnstalleerd: controleer `GET /api/services/{name}/status` op
   `installedVersion`. Als deze `null` is, voer dan eerst de installatie uit.
4. Controleer of `DATA_DIR/services/{name}/node_modules/` bestaat en niet leeg is.
5. Controleer het veld `lastError` in de statusrespons voor de opgeschoonde reden van afsluiten.

---

### Koude start is traag (> 10 s voordat `running` wordt bereikt)

**Symptomen:** De status blijft lange tijd `"starting"` voordat deze overgaat naar `"running"` of `"error"`.

**Uitleg:** De koude start van 9Router omvat het importeren van grote afhankelijkheidsstructuren (DNS-,
tunnel- en MITM-modules). Het standaardinterval voor statuscontroles is 2 s, met 3 pogingen voordat de
supervisor een time-out meldt (maar doorgaat met pollen).

**Oplossing:** De `healthIntervalMs` en de time-out van `waitForHealthy`
(`healthIntervalMs * 3`) kunnen worden geconfigureerd in `bootstrap.ts`. Verhoog voor services met langere
opstarttijden `healthIntervalMs` naar 5000 en `stopTimeoutMs` naar 30 000.

---

### Poortconflict (`EADDRINUSE`)

**Symptomen:** De logs tonen `address already in use :::20130`.

**Oorzaken:**

- Een ander proces gebruikt poort 20130 al.
- Een eerder 9Router-proces is niet volledig gestopt (zombie-PID).

**Oplossing:**

1. Wijzig de standaardpoort via de omgevingsvariabele `NINEROUTER_PORT` in `.env`.
2. Zoek en beëindig het conflicterende proces: `lsof -ti :20130 | xargs kill -9`.
3. De poort kan per service worden geconfigureerd in `bootstrap.ts` via het veld `port`.

**Opmerking:** 9Router gebruikt standaard specifiek poort 20130 om een conflict met
de standaardpoort 20128 van OmniRoute te voorkomen.

---

### Toegang geweigerd (EACCES) bij installatie

**Symptomen:** De installatie retourneert 500; de logs tonen `EACCES` of `permission denied`.

**Oorzaken:**

- `DATA_DIR` of de bovenliggende map is niet beschrijfbaar door het OmniRoute-proces.
- Uitvoering in rootless Docker zonder schrijftoegang tot het gekoppelde volume.

**Oplossing:**

1. Controleer `DATA_DIR` (standaard: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Zorg dat de gebruiker van het OmniRoute-proces eigenaar is van de map: `chown -R $USER ~/.omniroute/`
3. Zorg er in Docker voor dat de volumekoppeling de juiste machtigingen heeft voor de containergebruiker.

---

### Bijwerken mislukt (time-out of netwerkfout bij `npm install`)

**Symptomen:** De update retourneert 500 met `InstallError`; de logs tonen een netwerktime-out.

**Checklist:**

1. Controleer of het npm-register bereikbaar is: `npm ping`.
2. Controleer op een bedrijfsproxy: `npm config get proxy`, `npm config get https-proxy`.
3. Probeer de installatie handmatig: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Download bij een geïsoleerd netwerk de tarball vooraf en gebruik `npm install /path/to/tarball.tgz`.

---

### Service toont direct na het starten de status `"error"` (snelle crash)

**Symptomen:** De status gaat binnen 5 seconden over van `"starting"` naar `"error"`.
`lastError` toont `"Fast crash (exited with code 1)"`.

**Checklist:**

1. Lees het volledige einde van het logboek: `GET /api/services/{name}/logs?tail=500`.
2. Veelvoorkomende oorzaak: ontbrekende omgevingsvariabelen die door de service worden verwacht.
3. Controleer voor 9Router of `NINEROUTER_DISABLE_MITM=true` en
   `NINEROUTER_DISABLE_TUNNEL=true` aanwezig zijn in de omgeving die bij het starten wordt doorgegeven (zie
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. Veelgestelde vragen

**V: Kan ik de eindpunten van de ingebedde services toegankelijk maken voor niet-loopbackclients?**

Nee. Het LOCAL_ONLY-niveau is opzettelijk zo ontworpen (harde regel #17). Routes die
`npm install` kunnen uitvoeren of `node`-processen kunnen starten, mogen niet bereikbaar
zijn via niet-loopbackverkeer, omdat een gelekte JWT via een tunnel (Cloudflare, Ngrok,
Tailscale) anders het willekeurig starten van processen mogelijk zou maken. Er is geen
uitzondering om dit uit te schakelen voor `/api/services/` — in tegenstelling tot
`/api/mcp/` is dit uitgesloten van de lijst voor het omzeilen van de manage-scope.
Zie `docs/security/ROUTE_GUARD_TIERS.md`.

---

**V: Zijn 9Router en CLIProxyAPI beschikbaar in productie-/cloudimplementaties?**

Ja. Beide services volgen hetzelfde local-first-model als OmniRoute zelf. Ze draaien
op dezelfde machine en communiceren via loopback. Met 'productie' wordt hier de VPS
of lokale server bedoeld waarop OmniRoute is geïmplementeerd, niet een externe
cloudprovider.

---

**V: Hoe kan ik problemen met de supervisor opsporen?**

1. Volg de SSE-logstream: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Controleer de gestructureerde logs in de pino-uitvoer van OmniRoute, gefilterd op
   de namespace `service:supervisor`.
3. Inspecteer de databaserij: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Gebruik `GET /api/services/9router/status` om in één aanroep de huidige live-status, PID,
   gezondheid en `lastError` te bekijken.

---

**V: De supervisor toont `health: "degraded"` of `health: "unknown"`, maar de status is `"running"`. Is dat een probleem?**

`"degraded"` betekent dat de gezondheidscontrole een ander antwoord dan 200 heeft
geretourneerd. `"unknown"` betekent dat er nog geen controle is voltooid (race condition
met de eerste polling). Beide zijn tijdelijk tijdens het opstarten. Als de gezondheid
langer dan `healthIntervalMs * 3` ms na `"running"` op `"degraded"` blijft staan, draait
de ingebedde service wel, maar reageert de HTTP-API niet. Controleer of de poort in het
statusantwoord correct is en of de service daadwerkelijk op die poort luistert.

---

**V: Kan ik de API-sleutel van 9Router wijzigen zonder een volledige herstart?**

Nee. De API-sleutel wordt tijdens het starten via een omgevingsvariabele aan 9Router
doorgegeven. Omgevingsvariabelen kunnen niet worden gewijzigd in een actief proces.
`POST .../rotate-key` stopt en herstart de service automatisch om de nieuwe sleutel
toe te passen. De sleutelrotatie wordt van kracht binnen de `stopTimeoutMs` van de
service (standaard 15 s), plus de opstarttijd.

---

**V: Wat is de limiet van de ringbuffer en wat gebeurt er wanneer deze vol raakt?**

Elke service heeft een eigen ringbuffer van 5 MB. Wanneer de buffer vol is, worden de
oudste logregels verwijderd om ruimte te maken voor nieuwe. De SSE-gebeurtenis
`snapshot` retourneert de meest recente regels binnen de `tail`-limiet. Logs worden
niet op schijf opgeslagen, tenzij `logsBufferPath` in de databaserij is ingesteld.

---

## Zie ook

- `docs/security/ROUTE_GUARD_TIERS.md` — details over het LOCAL_ONLY-niveau
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 moduletoewijzing voor ingebedde services
- `docs/architecture/ARCHITECTURE.md` — context op systeemniveau
- `docs/openapi.yaml` — machineleesbare eindpuntdefinities
- `CLAUDE.md` §"Adding a New Embedded Service" — beknopte checklist
