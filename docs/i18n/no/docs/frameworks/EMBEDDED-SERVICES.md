# Embedded Services (Norsk)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Versjon:** v3.8.44
> **Sist oppdatert:** 2026-09-09
> **Målgruppe:** Ingeniører som legger til, vedlikeholder eller feilsøker innebygde tjenester (9Router, CLIProxyAPI, Mux, Bifrost, open-wa).

Innebygde tjenester er lokalt installerte sideverktøy for prosesser som OmniRoute installerer, overvåker og
eksponerer som fullverdige rutingsmål. I motsetning til eksterne leverandører (som nås over internett
via API-nøkler) kjører innebygde tjenester på samme maskin som OmniRoute og kommuniserer via loopback.

---

## Innholdsfortegnelse

1. [Oversikt](#1-overview)
2. [Arkitektur — 4 lag](#2-architecture--4-layers)
3. [Tilstandsmaskin for livssyklus](#3-lifecycle-state-machine)
4. [API-referanse](#4-api-reference)
5. [Sikkerhet](#5-security)
6. [Legge til en ny innebygd tjeneste](#6-adding-a-new-embedded-service)
7. [Feilsøking](#7-troubleshooting)
8. [Vanlige spørsmål](#8-faq)

---

## 1. Oversikt

### Hvorfor innebygde tjenester?

Seks tjenester er innebygd:

| Tjeneste        | npm-pakke                                  | Standardport | Formål                                                                                                                                                                                                       |
| --------------- | ------------------------------------------ | :----------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **9Router**     | `9router`                                  |    20130     | AI-ruter som OmniRoute kan bruke som en underleverandør. Modeller eksponeres som `9router/{sub}/{model}`                                                                                                     |
| **CLIProxyAPI** | Binærfil fra GitHub-utgivelse (`cliproxy`) |     8317     | Lokal proxyadapter for autentiseringsflyter i Anthropic CLI. Tilbyr reserveruting når OAuth-tokener utløper                                                                                                  |
| **Mux**         | `mux` (hodeløs `mux server`)               |     8322     | Lokal daemon for agentorkestrering (coder/mux). Kun livssyklusadministrert — ikke et rutingsmål (ingen LLM-proxying).                                                                                        |
| **Bifrost**     | `@maximhq/bifrost`                         |     8080     | Go-basert AI-gateway-relébackend. Når den kjører, velges den automatisk av reléruten (`/v1/relay/`)                                                                                                          |
| **Dario**       | `@askalf/dario`                            |     3456     | Proxy for Claude-abonnement — alternativ/reserveløsning til CLIProxyAPI for trafikk utformet som Claude Code; den injiserte nøkkelen blir `DARIO_ADMIN_TOKEN`, som beskytter OAuth-kontrollplanet `/admin/*` |
| **open-wa**     | `@open-wa/wa-automate`                     |     8323     | WhatsApp Web-automatisering (hodeløs Chromium via Puppeteer). Kun livssyklusadministrert — ikke et rutingsmål.                                                                                               |

Alle seks følger samme administrasjonsmodell:

- OmniRoute installerer dem under `DATA_DIR/services/{name}/` (isolert fra OmniRoutes egen `package.json`)
- OmniRoute starter og overvåker dem som underprosesser
- OmniRoute injiserer en midlertidig API-nøkkel i underprosessens miljø og roterer den uten nedetid (der det er aktuelt)
- Alle administrasjonsruter (`/api/services/*`) er **LOCAL_ONLY** — kun tilgjengelige fra loopback (ufravikelig regel nr. 17)

### Viktige beslutninger (fra designplanen)

| Beslutning                                                | Verdi                                                                                    |
| --------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Dashboardtilgang til 9Routers innebygde brukergrensesnitt | Omvendt proxy på `/dashboard/providers/services/9router/embed/*`                         |
| Installasjonsmekanisme                                    | `npm install {package}` via `execFile` (ingen skallinterpolering)                        |
| Bruksmodus                                                | Leverandør registrert som `9router/{sub}/{model}` i rutingsmotoren                       |
| Administrasjon av API-nøkler                              | OmniRoute genererer, krypterer ved lagring (AES-256-GCM) og injiserer via miljøvariabler |
| Plassering i dashboardet                                  | `/dashboard/providers/services` (tre faner)                                              |
| Automatisk oppstart                                       | Bryter per tjeneste, AV som standard                                                     |

---

## 2. Arkitektur — 4 lag

```
┌────────────────────────────────────────────────────────────────────┐
│  Lag 1 — Brukergrensesnitt                                         │
│  /dashboard/providers/services  (faner: CLIProxyAPI | 9Router | Mux)│
│  Direktelogger (SSE), start/stopp/omstart/oppdater, innstillinger, installer│
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Ramme + faneruting via ?tab=          │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Lag 2 — API (LOCAL_ONLY — kun tilbakekobling)                     │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (omvendt HTTP- og WebSocket-proxy → 9Router-oppstrøm)           │
│                                                                    │
│  Sperre: LOCAL_ONLY_API_PREFIXES inkluderer "/api/services/" og    │
│          "/dashboard/providers/services/*/embed/"                  │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ kall i samme prosess
┌──────────────────────▼─────────────────────────────────────────────┐
│  Lag 3 — ServiceSupervisor (src/lib/services/)                     │
│                                                                    │
│  ServiceSupervisor.ts   Generisk overvåker (child_process.spawn)   │
│    ├── installer:  execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── starter:    spawn(node, [entrypoint], {env, cwd})           │
│    ├── API-nøkkel: crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── port:       20130 for 9Router (konfigurerbar)               │
│    ├── logger:     stdio-ringbuffer på 5 MB → SSE-hendelser         │
│    ├── helse:      HTTP GET /health hvert 2.–5. s, behovsstyrt gjenoppretting│
│    └── livssyklus: SIGTERM 15 s → SIGKILL                          │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Initialiserer alle SERVICES[] ved prosesstart  │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       Periodisk GET /v1/models → service_models-tabell│
│  ringBuffer.ts      Sirkulær loggbuffer (5 MB per tjeneste)        │
│  healthCheck.ts     Regelmessig HTTP-helsekontroll                 │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts, openwa.ts  │
│                      (installasjonsadaptere)                        │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ OpenAI-kompatibel HTTP (tilbakekobling)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Lag 4 — Leverandør/ruting                                         │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Slår opp port og API-nøkkel på nytt per forespørsel (ingen hurtigbuffer).│
│    Fjerner prefikset "9router/" fra modell-ID-en før videresending.│
│    Returnerer 503 service_not_running hvis overvåkeren ikke er i "running".│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Oppføring for "9router": isEmbeddedService: true                │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Modeller lagres som "9router/{sub}/{model}" (med prefiks).       │
│    Synkroniseres hvert 5. minutt av modelSync.ts.                  │
│                                                                    │
│  Mux er KUN livssyklusadministrert (lag 1–3) — det er en daemon for│
│  agentorkestrering, ikke en LLM-proxy, og har derfor ingen kjører-/│
│  leverandøroppføring i lag 4 og er aldri et rutingsmål.            │
└────────────────────────────────────────────────────────────────────┘
```

### Viktige kildefiler

| Fil                                         | Rolle                                                         |
| ------------------------------------------- | ------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Kjerneklasse: livssyklus, lås, tilstand, ringbuffer           |
| `src/lib/services/bootstrap.ts`             | Registrering på prosessnivå og automatisk oppstart            |
| `src/lib/services/registry.ts`              | Singleton-kart `verktøy → supervisor`                         |
| `src/lib/services/apiKey.ts`                | Nøkkelgenerering, AES-256-GCM-kryptering ved lagring          |
| `src/lib/services/modelSync.ts`             | Periodisk modellsynkronisering (5 min) + ved behov            |
| `src/lib/services/ringBuffer.ts`            | 5 MB sirkulær loggbuffer med SSE-abonnement                   |
| `src/lib/services/healthCheck.ts`           | HTTP-tilstandssjekk (konfigurerbart intervall)                |
| `src/lib/services/installers/ninerouter.ts` | npm-installasjon/-oppdatering/-avinstallering for 9Router     |
| `src/lib/services/installers/cliproxy.ts`   | npm-installasjon/-oppdatering/-avinstallering for CLIProxyAPI |
| `src/lib/services/installers/mux.ts`        | npm-installasjon/-oppdatering/-avinstallering for Mux         |
| `src/lib/services/installers/openwa.ts`     | npm-installasjon/-oppdatering/-avinstallering for open-wa     |
| `src/app/api/services/9router/_lib.ts`      | Hjelpefunksjonen `getOrInitSupervisor()`                      |
| `src/app/api/services/[name]/logs/route.ts` | Delt endepunkt for SSE-logger                                 |
| `open-sse/executors/ninerouter.ts`          | Leverandøreksekutor (lag 4)                                   |

---

## 3. Livssyklustilstandsmaskin

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
                  helsesjekk ok     │         krasj / SIGTERM    │
                               ┌────▼─────┐  (avsluttes innen 5s)│
                               │ running  │──── krasj ──────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Tilstander lagres i DB-tabellen `version_manager` (`status`-kolonnen) og speiles
i minnetilstanden til `ServiceSupervisor`. Minnetilstanden er autoritativ for
en kjørende prosess. DB-tilstanden er den varige reserveløsningen ved oppstart.

### Tilstandsoverganger

| Fra             | Hendelse                             | Til                    |
| --------------- | ------------------------------------ | ---------------------- |
| `not_installed` | `install()` lykkes                   | `stopped`              |
| `stopped`       | `start()` kalles                     | `starting`             |
| `starting`      | helsesjekken returnerer 200          | `running`              |
| `starting`      | prosessen avsluttes før den er frisk | `error`                |
| `running`       | `stop()` kalles                      | `stopping` → `stopped` |
| `running`       | prosessen avsluttes uventet (< 5 s)  | `error` (rask krasj)   |
| `running`       | prosessen avsluttes uventet (> 5 s)  | `error`                |
| `error`         | `start()` kalles                     | `starting`             |
| alle            | `stop()` under `stopping`            | ingen operasjon        |

### Operasjonslås

`ServiceSupervisor` serialiserer livssyklusoperasjoner gjennom en asynkron operasjonslås
(`withLock()`). Samtidige kall til `start()` på samme supervisor fører til nøyaktig
én opprettelse av en prosess. Den andre kalleren venter og returnerer den eksisterende statusen. Dette forhindrer
kappløpstilstander når for eksempel automatisk oppstart og en knapp i brukergrensesnittet utløses samtidig.

---

## 4. API-referanse

Alle ruter under `/api/services/` er **LOCAL_ONLY** (kun loopback, absolutt regel nr. 17).
Forespørsler som ikke kommer fra loopback, mottar `403 LOCAL_ONLY` uavhengig av autentiseringstoken.

### 4.1 9Router-endepunkter (11 ruter)

#### `POST /api/services/9router/install`

Installer 9Router fra npm. Oppretter `DATA_DIR/services/9router/` med sin egen
`package.json` og `node_modules/`. Dette kommer ikke i konflikt med OmniRoutes egne avhengigheter.

**Forespørselsinnhold** (alle felter er valgfrie):

```json
{ "version": "latest" }
```

| Felt      | Type     | Standardverdi | Beskrivelse                                        |
| --------- | -------- | ------------- | -------------------------------------------------- |
| `version` | `string` | `"latest"`    | npm-versjonstagg eller semver som skal installeres |

**Svar:**

| Status | Beskrivelse                                                               |
| ------ | ------------------------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                    |
| `400`  | Ugyldig forespørselsinnhold (Zod-valideringsfeil)                         |
| `409`  | Installasjon pågår allerede (lås er aktiv)                                |
| `500`  | npm-installasjonen mislyktes — se `message` for en forståelig feilmelding |

**Merknader:** Bruker `execFile('npm', [...])` — ingen shell, ingen interpolasjon (absolutt regel nr. 13).
EACCES-feil vises som forståelige feilmeldinger.

---

#### `POST /api/services/9router/start`

Start 9Router. Registrerer en supervisor hvis en ikke allerede er registrert, og kaller deretter
`supervisor.start()`. Idempotent hvis tjenesten allerede kjører.

**Forespørselsinnhold:** ingen

**Svar:**

| Status | Beskrivelse                                            |
| ------ | ------------------------------------------------------ |
| `200`  | `ServiceStatus`-objekt (se skjemaet nedenfor)          |
| `409`  | 9Router er ikke installert (`status: "not_installed"`) |
| `503`  | Oppstart mislyktes (prosessfeil — se `lastError`)      |

**ServiceStatus-skjema:**

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

Stopp 9Router kontrollert. Sender SIGTERM, venter i 15 s og sender deretter SIGKILL hvis prosessen fortsatt kjører.
Idempotent hvis tjenesten allerede er stoppet.

**Forespørselsinnhold:** ingen

**Svar:**

| Status | Beskrivelse                        |
| ------ | ---------------------------------- |
| `200`  | `ServiceStatus` (state: "stopped") |
| `503`  | Stopp mislyktes uventet            |

---

#### `POST /api/services/9router/restart`

Tilsvarer `stop()` etterfulgt av `start()` under operasjonslåsen.

**Forespørselsinnhold:** ingen

**Svar:** samme som for `start` (returnerer endelig `ServiceStatus`).

---

#### `POST /api/services/9router/update`

Oppdaterer 9Router til en nyere npm-versjon. Hvis tjenesten kjører, stoppes den
først, npm install kjøres (og installerer den nyere versjonen på stedet), og deretter
startes tjenesten på nytt.

**Forespørselsinnhold** (alle felter er valgfrie):

```json
{ "version": "latest" }
```

**Svar:**

| Status | Beskrivelse                                                     |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Ugyldig innhold                                                 |
| `500`  | npm-oppdateringen mislyktes                                     |

---

#### `POST /api/services/9router/rotate-key`

Genererer en ny API-nøkkel for 9Router, krypterer den ved lagring og starter tjenesten
på nytt (hvis den kjører), slik at den henter den nye nøkkelen fra miljøet. Den gamle nøkkelen
ugyldiggjøres umiddelbart.

**Forespørselsinnhold:** ingen

**Svar:**

| Status | Beskrivelse                                |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Nøkkelrotasjon mislyktes                   |

**Sikkerhet:** Den nye nøkkelen returneres aldri i svaret (ingen lekkasje av legitimasjon).
Den lagres kryptert (AES-256-GCM) i `version_manager`-tabellen.

---

#### `GET /api/services/9router/status`

Returnerer kombinert sanntids- og DB-status, inkludert versjonsmetadata og forhåndsvisning av API-nøkkelen.

**Svar:**

| Status | Beskrivelse                |
| ------ | -------------------------- |
| `200`  | Se skjemaet nedenfor       |
| `500`  | Lesing av status mislyktes |

**Svarskjema:**

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

Slå automatisk oppstart av eller på. Når `enabled: true`, starter tjenesten automatisk
neste gang OmniRoute starter (hvis tjenesten er installert).

**Forespørselsinnhold:**

```json
{ "enabled": true }
```

**Svar:**

| Status | Beskrivelse           |
| ------ | --------------------- |
| `200`  | `{ autoStart: true }` |
| `400`  | Ugyldig innhold       |

---

#### `GET /api/services/9router/logs`

SSE-strøm med sanntidslogger fra ringbufferen for stdout/stderr i 9Router.

**Spørringsparametere:**

| Parameter | Type      | Standardverdi | Beskrivelse                                                                             |
| --------- | --------- | ------------- | --------------------------------------------------------------------------------------- |
| `tail`    | `integer` | 200           | Antall historiske linjer som skal sendes først (maks. 1000)                             |
| `filter`  | `string`  | ingen         | Delstrengfilter uten skille mellom store og små bokstaver (ingen regex — ReDoS-sikkert) |

**SSE-hendelser:**

| Hendelse    | Data        | Beskrivelse                         |
| ----------- | ----------- | ----------------------------------- |
| `snapshot`  | `LogLine[]` | Innledende historisk utdrag         |
| `log`       | `LogLine`   | Logglinje i sanntid                 |
| `heartbeat` | `{}`        | Hold forbindelsen aktiv hvert 15. s |

**LogLine-skjema:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Svar:**

| Status | Beskrivelse                                            |
| ------ | ------------------------------------------------------ |
| `200`  | `text/event-stream`                                    |
| `400`  | Parameteren `filter` er for lang (> 200 tegn)          |
| `404`  | Tjenesten ble ikke funnet (supervisor ikke registrert) |

---

### 4.2 CLIProxyAPI-endepunkter (10 ruter)

CLIProxyAPI har samme endepunktstruktur som 9Router, bortsett fra `rotate-key`, i tillegg til
`accounts`, `provider-expose` og `auto-restart-adopted`. Den mottar nå en
dedikert API-nøkkel for dataplanet som injiseres ved oppstart (`needsApiKey: true` i
`bootstrap.ts`, brukt til modellsynkronisering); `status` inneholder færre felt.

| Metode | Bane                                | Beskrivelse                                 |
| ------ | ----------------------------------- | ------------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | Installer CLIProxyAPI fra npm               |
| `POST` | `/api/services/cliproxy/start`      | Start CLIProxyAPI                           |
| `POST` | `/api/services/cliproxy/stop`       | Stopp CLIProxyAPI                           |
| `POST` | `/api/services/cliproxy/restart`    | Start CLIProxyAPI på nytt                   |
| `POST` | `/api/services/cliproxy/update`     | Oppdater til en nyere versjon               |
| `GET`  | `/api/services/cliproxy/status`     | Sanntids- + DB-status (uten `apiKeyMasked`) |
| `POST` | `/api/services/cliproxy/auto-start` | Slå automatisk start av eller på            |

Det delte endepunktet `GET /api/services/{name}/logs` (se §4.1) fungerer for alle
de fire tjenestene ved hjelp av det dynamiske segmentet `[name]`.

---

### 4.3 Mux-endepunkter (8 ruter)

Mux har samme endepunktstruktur som CLIProxyAPI — ingen `rotate-key`-rute i API-
grensesnittet (bearer-tokenet genereres på samme måte som for 9Router via
`getOrCreateApiKey("mux")` og injiseres via miljøvariabelen `MUX_SERVER_AUTH_TOKEN`, men
det finnes ennå ikke noe dedikert endepunkt for rotasjon). Mux administreres kun gjennom livssyklusen: i motsetning til
9Router har den ingen lag 4-eksekutor og registreres aldri som en rutingstilbyder.

| Metode | Bane                           | Beskrivelse                         |
| ------ | ------------------------------ | ----------------------------------- |
| `POST` | `/api/services/mux/install`    | Installer Mux fra npm (`npm i mux`) |
| `POST` | `/api/services/mux/start`      | Start Mux (`mux server`)            |
| `POST` | `/api/services/mux/stop`       | Stopp Mux                           |
| `POST` | `/api/services/mux/restart`    | Start Mux på nytt                   |
| `POST` | `/api/services/mux/update`     | Oppdater til en nyere npm-versjon   |
| `GET`  | `/api/services/mux/status`     | Sanntids- + DB-status               |
| `POST` | `/api/services/mux/auto-start` | Slå automatisk start av eller på    |

---

### 4.4 Bifrost-endepunkter (8 ruter)

Bifrost er en AI-gateway-relétjeneste skrevet i Go (`@maximhq/bifrost`). Den bruker samme
endepunktstruktur som CLIProxyAPI (ingen `rotate-key` — Bifrost administrerer sine egne tilbyder-
nøkler i `config.json` under sin `-app-dir`).

| Metode | Bane                               | Beskrivelse                                                |
| ------ | ---------------------------------- | ---------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | Installer Bifrost fra npm (`@maximhq/bifrost`)             |
| `POST` | `/api/services/bifrost/start`      | Start Bifrost på port 8080 (standard)                      |
| `POST` | `/api/services/bifrost/stop`       | Stopp Bifrost                                              |
| `POST` | `/api/services/bifrost/restart`    | Start Bifrost på nytt                                      |
| `POST` | `/api/services/bifrost/update`     | Oppdater til en nyere versjon                              |
| `GET`  | `/api/services/bifrost/status`     | Sanntids- + DB-status                                      |
| `POST` | `/api/services/bifrost/auto-start` | Slå automatisk start av eller på                           |
| `GET`  | `/api/services/bifrost/logs`       | SSE-logghale (via den delte dynamiske ruten `[name]/logs`) |

**Rutingstilkobling:** Når `BIFROST_BASE_URL` ikke er angitt og den overvåkede Bifrost-
instansen kjører, bruker `getBifrostRoutingConfig()` (i `routingBackend.ts`) automatisk
`http://127.0.0.1:{port}` som reléets grunn-URL. En eksplisitt angitt miljøvariabel `BIFROST_BASE_URL`
har alltid forrang.

---

### 4.5 Dario-endepunkter (12 ruter)

Samme livssyklusstruktur som de andre tjenestene (`install`, `start`, `stop`, `restart`,
`update`, `status`, `auto-start`, `auto-restart-adopted`), i tillegg til et tokenbeskyttet OAuth-
kontrollplan under `admin/`: `admin/accounts`, `admin/import-from-omniroute`,
`admin/login-start`, `admin/login-complete` (alle beskyttet av `DARIO_ADMIN_TOKEN`).

### 4.6 open-wa-endepunkter (7 ruter)

open-wa (`@open-wa/wa-automate`) styrer en hodeløs Chromium-instans (via
Puppeteer) for å automatisere WhatsApp Web. Den bruker samme endepunktstruktur som Mux (ingen
`rotate-key`-rute ennå). Den administreres kun gjennom livssyklusen — den er ikke et rutingsmål
og har ingen lag 4-eksekutor-/tilbyderoppføring.

| Metode | Bane                              | Beskrivelse                                                    |
| ------ | --------------------------------- | -------------------------------------------------------------- |
| `POST` | `/api/services/openwa/install`    | Installer open-wa fra npm (`@open-wa/wa-automate`)             |
| `POST` | `/api/services/openwa/start`      | Start open-wa på port 8323 (standard)                          |
| `POST` | `/api/services/openwa/stop`       | Stopp open-wa                                                  |
| `POST` | `/api/services/openwa/restart`    | Start open-wa på nytt                                          |
| `POST` | `/api/services/openwa/update`     | Oppdater til en nyere versjon                                  |
| `GET`  | `/api/services/openwa/status`     | Sanntidsstatus + DB-status                                     |
| `POST` | `/api/services/openwa/auto-start` | Slå automatisk oppstart av/på                                  |
| `GET`  | `/api/services/openwa/logs`       | Løpende SSE-logg (via den delte dynamiske ruten `[name]/logs`) |

**API-nøkkel:** injiseres som `WA_KEY` — open-was generiske miljøoverstyring
med `WA_*`-prefiks tilordner den til CLI-alternativet `--key`/`-k`
(`dist/cli/setup.js::envArgs()`, verifisert mot den installerte
pakken 4.76.0). Får prefikset `ow_` når den genereres av
`generateServiceApiKey()`. open-wa leser nøkkelen fra en `key`/`api_key`-
HTTP-header (ikke `Authorization: Bearer`); `/api-docs*` er eksplisitt unntatt
fra kontrollen (`setupAuthenticationLayer` i `dist/cli/server.js`), så
helsesjekken trenger ingen autentiseringsheader.

**Paring:** open-wa er uoffisiell og ikke tilknyttet WhatsApp — det
tilkoblede nummeret risikerer å bli utestengt av WhatsApps egen deteksjon av
automatisering. Ved første oppstart skrives QR-koden for paring til stdout og
gjøres tilgjengelig via det eksisterende loggpanelet/SSE-strømmen — denne
integrasjonen har foreløpig ikke noe eget endepunkt for QR-bilder.

---

### 4.7 Omvendt proxy (innebygging av 9Router-kontrollpanelet)

Kontrollpanelet bygger inn 9Routers webgrensesnitt i en iframe via en intern
omvendt proxy på:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Denne proxyen:

- Videresender forespørselen til `http://127.0.0.1:{port}/{path}` (kun loopback)
- Fjerner innkommende `cookie`- og `authorization`-headere (ingen lekkasje av OmniRoute-økten)
- Injiserer `Authorization: Bearer {apiKey}` for 9Router-autentisering
- Fjerner `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*` fra responsen
- Omskriver HTML-responser for å injisere `<base href>` og normalisere absolutte baner (`/foo` → `/dashboard/.../embed/foo`)

WebSocket-oppgraderinger for det innebygde kontrollpanelet håndteres av en
tilhørende server på en dedikert port (se `src/lib/services/embedWsProxy.ts`).

**Sikkerhet:** Proxy-rutene for innebygging er klassifisert under
`LOCAL_ONLY_API_PREFIXES` og kan bare nås fra loopback. En angriper som får tak
i et JWT via en Cloudflare/Ngrok-tunnel, kan ikke bruke proxyen for å nå
innebygde tjenester.

---

## 5. Sikkerhet

### LOCAL_ONLY-håndheving (ufravikelig regel #17)

Alle ruter under `/api/services/` og `/dashboard/providers/services/*/embed/` er
klassifisert som LOCAL_ONLY i `src/server/authz/routeGuard.ts`. Tilbakesløyfekontrollen
kjøres ubetinget før enhver autentiseringsgren:

```
forespørselen ankommer
  → isLocalOnlyPath(path)?
      → ikke-tilbakesløyfe → 403 LOCAL_ONLY (alltid, før autentiseringskontroll)
      → tilbakesløyfe      → fortsett til normal autentisering
```

Dette hindrer at en lekket JWT (f.eks. via en tunnel) utløser `npm install` eller
prosessoppstart. Se `docs/security/ROUTE_GUARD_TIERS.md` for den fullstendige
nivåmatrisen.

### Injisering av API-nøkkel

9Router og Mux krever en API-nøkkel/bærertoken for sine egne HTTP-endepunkter.
OmniRoute:

1. Genererer en nøkkel via `crypto.randomBytes(32).toString("base64url")` med et
   tjenestespesifikt prefiks (`nr_` for 9Router, `mx_` for Mux).
2. Krypterer den ved lagring med AES-256-GCM (samme kryptering som brukes for leverandørlegitimasjon).
3. Dekrypterer og injiserer den som en miljøvariabel ved prosessoppstart —
   `NINEROUTER_API_KEY` for 9Router, `MUX_SERVER_AUTH_TOKEN` for Mux (aldri et
   CLI-flagg, slik at tokenet aldri vises i `ps`/prosesslister).
4. Returnerer aldri nøkkelen i klartekst i noe HTTP-svar.

CLIProxyAPI mottar en dedikert dataplannøkkel som injiseres ved prosessoppstart
(`needsApiKey: true` — brukes til modellsynkronisering mot adapteren).

### SSRF-forsvar

Den omvendte HTTP-proxyen (`/dashboard/.../embed/[...path]`) er hardkodet til kun å
videresende til `http://127.0.0.1:{port}`. Den følger aldri omdirigeringer til
destinasjoner utenfor tilbakesløyfen. Biblioteket `ssrf-req-filter` brukes til å avvise
enhver oppstrøms-URL som løses til en adresse utenfor tilbakesløyfeområdet.

### Skallsikkerhet (ufravikelig regel #13)

`npm install` startes via `execFile('npm', ['install', pkg, '--prefix', dir])` —
ingen malstrenger, intet skall og ingen interpolering av eksterne stier i
kommandostrengen. Kjøretidsverdier (porter, API-nøkler) sendes via underprosessens
`env`-objekt.

### Feilsanitering (ufravikelig regel #12)

Alle feilsvar fra `/api/services/*` går gjennom `buildErrorBody()` eller
`sanitizeErrorMessage()`. Rå `err.stack` og `err.message` returneres aldri
ordrett til klienten.

---

## 6. Legge til en ny innebygd tjeneste

Følg disse 8 trinnene. Les de eksisterende implementasjonene i `src/lib/services/installers/`
og `src/app/api/services/` som den autoritative referansen.

### Trinn 1 — Opprett installasjonsprogrammet

Opprett `src/lib/services/installers/{name}.ts` etter mønster av `ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // velg en ledig port

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Bruk `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` fra `installers/utils.ts`
— aldri `execSync` eller skallinterpolering.

### Trinn 2 — Registrer i bootstrap

Legg til en `ServiceEntry` i `SERVICES`-tabellen i `src/lib/services/bootstrap.ts`:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false hvis ingen API-nøkkel er nødvendig
}
```

Utvid `buildSpawnArgsFactory()` for å håndtere `cfg.tool === "myservice"`.

#### Utvidbar leverandørprogramtilleggskontrakt (fase 1, #7333)

`src/lib/services/providerPlugins/` introduserer en `ServiceProviderPlugin`-kontrakt som
samler feltene fra `ServiceEntry` i en backend-tjenestes `bootstrap.ts` og
manifestmalfeltene i `serviceBackends.ts` i ett objekt, i stedet for at formen til
samme backend uttrykkes separat i to filer uten tilknytning til hverandre. På
skrivetidspunktet er **bare `9router` migrert** — `bootstrap.ts` utleder sin
`SERVICES[]`-oppføring fra `getServiceProviderPlugin("9router")`
(`src/lib/services/providerPlugins/registry.ts`) og utløser en oppstartsfeil hvis
programtillegget noen gang mangler. `cliproxy`, `mux` og `bifrost` bruker fortsatt de
eksisterende innebygde `SERVICES[]`-literalene uendret.

`open-sse/config/providerPluginManifest.ts` har også fått en additiv
`createServiceBackendManifestEntry(pluginId, template)`-hjelpefunksjon som bygger en
velformet `ProviderPluginManifestEntry` fra en `SERVICE_BACKEND_MANIFEST_TEMPLATE`-oppføring
— den er **ennå ikke** koblet til noen aktiv forespørselsflyt (verken
`generateProviderPluginManifestFromRegistry()` eller `/v1/providers/[provider]/models`);
dette gjenstår som en oppfølging når kontrakten er utprøvd for en andre backend.

Utsatt til oppfølgende PR-er, sporet under sak #7333: migrering av `cliproxyapi` gjennom
det samme registeret, generalisering av `mux`/`bifrost` inn i unionen
`ServiceBackendPluginId`, innlemming av spesialhåndteringen for eksekveringsruting
(`open-sse/executors/index.ts`, `open-sse/handlers/chatCore/executorProxy.ts`) i
programtilleggskontrakten og tilkobling av `createServiceBackendManifestEntry()` til
en aktiv kodeflyt for manifest/modeller.

### Trinn 3 — Legg til migrering og DB-startdata

Sørg for at tjenesten har en rad i `version_manager` via en migrering i
`src/lib/db/migrations/`. Raden skal inneholde:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Trinn 4 — Opprett de 7 API-endepunktene

Under `src/app/api/services/{name}/`:

```
_lib.ts            hjelpefunksjonen getOrInitSupervisor()
install/route.ts   POST — kaller installer.install()
start/route.ts     POST — kaller supervisor.start()
stop/route.ts      POST — kaller supervisor.stop()
restart/route.ts   POST — kaller supervisor.restart()
update/route.ts    POST — kaller installer.update()
status/route.ts    GET  — slår sammen direkte- og DB-status
auto-start/route.ts POST — veksler auto_start-flagget
```

Den delte ruten `GET /api/services/[name]/logs` er allerede koblet opp — ingen endringer
er nødvendige der.

Deleger alle feilresponser gjennom `createErrorResponse()` / `buildErrorBody()`.

### Trinn 5 — Legg til i LOCAL_ONLY_API_PREFIXES

I `src/server/authz/routeGuard.ts`, kontroller at `/api/services/` allerede er oppført.
Hvis du introduserer et nytt prefiks (f.eks. `/api/tools/`), legger du det til i både
`LOCAL_ONLY_API_PREFIXES` og, hvis det starter prosesser, i `SPAWN_CAPABLE_PREFIXES`.
Legg til en test i `tests/unit/authz/routeGuard.test.ts`.

### Trinn 6 — Legg til fanen i brukergrensesnittet

Opprett `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Gjenbruk delte komponenter:

- `ServiceStatusCard` — sanntidsstatus + helsetilstandsmerke
- `ServiceLifecycleButtons` — Start / Stopp / Start på nytt / Oppdater
- `ServiceLogsPanel` — SSE-logghale (kobler til `/api/services/{name}/logs`)
- `ApiKeyCard` — visning + rotering av nøkkel (hvis `needsApiKey: true`)

Registrer fanen i `ServicesPageShell.tsx`.

### Trinn 7 — Legg til leverandøroppføringen (hvis tjenesten er et rutingsmål)

Hvis den innebygde tjenesten tilbyr et OpenAI-kompatibelt endepunkt på `/v1/chat/completions`:

1. Legg til en leverandøroppføring i `src/shared/constants/providers.ts` med `isEmbeddedService: true`.
2. Opprett `open-sse/executors/{name}.ts` som utvider `BaseExecutor`. Slå opp porten og
   API-nøkkelen på nytt for hver forespørsel (aldri bufre dem i konstruktøren). Returner en
   `503 service_not_running`-respons når tilsynsprosessens status ikke er `"running"`.
3. Registrer modeller i `open-sse/config/providerRegistry.ts` med tjenesteprefikset
   (f.eks. `myservice/sub/model`). `modelSync.ts` holder dem oppdatert.

### Trinn 8 — Dokumenter og test

1. Oppdater `docs/frameworks/EMBEDDED-SERVICES.md` (denne filen) — legg til tjenesten i
   tabellen i §1 og eventuelle nye endepunkter i §4.
2. Legg til enhetstester i `tests/unit/services/` (livssyklus, installasjonsprogram, API-struktur).
3. Legg til en integrasjonstest i `tests/integration/services/` (bak `RUN_SERVICES_INT=1`).
4. Oppdater `docs/openapi.yaml` med de nye endepunktene.

---

## 7. Feilsøking

### Tjenesten starter ikke

**Symptomer:** Startknappen returnerer 503, og tilstanden forblir `"error"` eller `"starting"`.

**Sjekkliste:**

1. Sjekk `GET /api/services/{name}/logs` (eller loggpanelet i kontrollpanelet). Se
   etter linjer som `Error: ENOENT`, `address already in use` eller `Cannot find module`.
2. Kontroller at `npm` finnes i PATH: Kjør `which npm` fra den samme brukerkontoen som kjører OmniRoute.
3. Kontroller at tjenesten er installert: Sjekk `GET /api/services/{name}/status` for
   `installedVersion`. Hvis verdien er `null`, må du kjøre installasjonen først.
4. Kontroller at `DATA_DIR/services/{name}/node_modules/` finnes og ikke er tom.
5. Sjekk feltet `lastError` i statusresponsen for den rensede avslutningsårsaken.

---

### Kaldstart er treg (> 10 s før tilstanden blir `running`)

**Symptomer:** Tilstanden forblir `"starting"` lenge før den endres til `"running"` eller `"error"`.

**Forklaring:** Kaldstart av 9Router omfatter import av store avhengighetstrær (DNS-,
tunnel- og MITM-moduler). Standardintervallet for helsesjekk er 2 s med 3 forsøk før
overvåkeren erklærer tidsavbrudd (men fortsetter å sjekke).

**Løsning:** `healthIntervalMs` og tidsavbruddet for `waitForHealthy`
(`healthIntervalMs * 3`) kan konfigureres i `bootstrap.ts`. For tjenester med lengre
oppstartstid kan du øke `healthIntervalMs` til 5000 og `stopTimeoutMs` til 30 000.

---

### Portkonflikt (`EADDRINUSE`)

**Symptomer:** Loggene viser `address already in use :::20130`.

**Årsaker:**

- En annen prosess bruker allerede port 20130.
- En tidligere 9Router-prosess ble ikke fullstendig stoppet (zombie-PID).

**Løsning:**

1. Endre standardporten via miljøvariabelen `NINEROUTER_PORT` i `.env`.
2. Finn og avslutt prosessen som forårsaker konflikten: `lsof -ti :20130 | xargs kill -9`.
3. Porten kan konfigureres per tjeneste i `bootstrap.ts` via feltet `port`.

**Merk:** 9Router bruker port 20130 som standard, spesielt for å unngå konflikt med
OmniRoutes standardport 20128.

---

### Ingen tilgang (EACCES) under installasjon

**Symptomer:** Installasjonen returnerer 500, og loggene viser `EACCES` eller `permission denied`.

**Årsaker:**

- `DATA_DIR` eller den overordnede katalogen er ikke skrivbar for OmniRoute-prosessen.
- Kjøring i Docker uten root-tilgang og uten skrivetilgang til det tilordnede volumet.

**Løsning:**

1. Sjekk `DATA_DIR` (standard: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Sørg for at brukeren som kjører OmniRoute-prosessen, eier katalogen: `chown -R $USER ~/.omniroute/`
3. I Docker må du sørge for at volummonteringen har riktige tillatelser for containerbrukeren.

---

### Oppdateringen mislykkes (tidsavbrudd eller nettverksfeil for `npm install`)

**Symptomer:** Oppdateringen returnerer 500 med `InstallError`, og loggene viser tidsavbrudd for nettverket.

**Sjekkliste:**

1. Bekreft at npm-registeret er tilgjengelig: `npm ping`.
2. Se etter bedriftsproxy: `npm config get proxy`, `npm config get https-proxy`.
3. Prøv installasjonen manuelt: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Hvis systemet er isolert fra nettverket, forhåndslast ned tarball-filen og bruk `npm install /path/to/tarball.tgz`.

---

### Tjenesten viser tilstanden `"error"` umiddelbart etter start (rask krasj)

**Symptomer:** Tilstanden endres fra `"starting"` til `"error"` på under 5 sekunder.
`lastError` viser `"Fast crash (exited with code 1)"`.

**Sjekkliste:**

1. Les hele slutten av loggen: `GET /api/services/{name}/logs?tail=500`.
2. Vanlig årsak: manglende miljøvariabler som tjenesten forventer.
3. For 9Router: Kontroller at `NINEROUTER_DISABLE_MITM=true` og
   `NINEROUTER_DISABLE_TUNNEL=true` finnes i miljøet som sendes ved oppstart (se
   `installers/ninerouter.ts` `resolveSpawnArgs`).

---

## 8. Vanlige spørsmål

**S: Kan jeg eksponere endepunktene for de innebygde tjenestene for klienter utenfor loopback?**

Nei. LOCAL_ONLY-nivået er tilsiktet (ufravikelig regel nr. 17). Ruter som kan kjøre
`npm install` eller starte `node`-prosesser, må ikke være tilgjengelige for trafikk
utenfor loopback, fordi en lekket JWT via en tunnel (Cloudflare, Ngrok, Tailscale)
ellers ville tillate vilkårlig oppstart av prosesser. Det finnes ikke noe unntak for
`/api/services/` — i motsetning til `/api/mcp/` er den utelatt fra listen over
omgåelser for administrasjonstilgang. Se `docs/security/ROUTE_GUARD_TIERS.md`.

---

**S: Vil 9Router og CLIProxyAPI være tilgjengelige i produksjons-/skyimplementeringer?**

Ja. Begge tjenestene følger den samme lokal-først-modellen som OmniRoute selv. De
kjører på samme maskin og kommuniserer via loopback. «Produksjon» betyr her VPS-en
eller den lokale serveren der OmniRoute er distribuert, ikke en ekstern skyleverandør.

---

**S: Hvordan feilsøker jeg prosessovervåkeren?**

1. Følg SSE-loggstrømmen: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Kontroller strukturerte logger i OmniRoutes pino-utdata, filtrert etter
   navnerommet `service:supervisor`.
3. Undersøk DB-raden: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Bruk `GET /api/services/9router/status` for å se gjeldende sanntidstilstand, PID,
   helsestatus og `lastError` i ett kall.

---

**S: Prosessovervåkeren viser `health: "degraded"` eller `health: "unknown"`, men tilstanden er `"running"`. Er det et problem?**

`"degraded"` betyr at helsesjekken returnerte et svar som ikke var 200. `"unknown"`
betyr at ingen sjekk er fullført ennå (kappløp med første spørring). Begge deler er
midlertidig under oppstart. Hvis helsetilstanden forblir `"degraded"` i mer enn
`healthIntervalMs * 3` ms etter `"running"`, kjører den innebygde tjenesten, men
HTTP-API-et svarer ikke. Kontroller om porten er riktig i statussvaret, og om
tjenesten faktisk lytter på den porten.

---

**S: Kan jeg endre API-nøkkelen for 9Router uten en fullstendig omstart?**

Nei. API-nøkkelen sendes til 9Router via en miljøvariabel når prosessen startes.
Miljøvariabler kan ikke endres i en kjørende prosess. `POST .../rotate-key` stopper
og starter tjenesten automatisk på nytt for å ta i bruk den nye nøkkelen.
Nøkkelrotasjonen trer i kraft innen tjenestens `stopTimeoutMs` (standardverdi 15 s)
pluss oppstartstiden.

---

**S: Hva er grensen for ringbufferen, og hva skjer når den blir full?**

Hver tjeneste har en egen ringbuffer på 5 MB. Når bufferen er full, fjernes de eldste
logglinjene for å gi plass til nye. SSE-hendelsen `snapshot` returnerer de nyeste
linjene innenfor `tail`-grensen. Logger lagres ikke på disk med mindre
`logsBufferPath` er angitt i DB-raden.

---

## Se også

- `docs/security/ROUTE_GUARD_TIERS.md` — detaljer om LOCAL_ONLY-nivået
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 modultilordning for innebygde tjenester
- `docs/architecture/ARCHITECTURE.md` — kontekst på systemnivå
- `docs/openapi.yaml` — maskinlesbare endepunktdefinisjoner
- `CLAUDE.md` §«Adding a New Embedded Service» — sjekkliste for hurtigreferanse
