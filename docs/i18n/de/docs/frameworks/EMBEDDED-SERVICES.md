# Embedded Services (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **Version:** v3.8.44
> **Zuletzt aktualisiert:** 2026-09-09
> **Zielgruppe:** Entwickler, die eingebettete Dienste (9Router, CLIProxyAPI, Mux, Bifrost, open-wa) hinzufügen, warten oder debuggen.

Eingebettete Dienste sind lokal installierte Sidecar-Prozesstools, die OmniRoute installiert, überwacht und
als vollwertige Routing-Ziele bereitstellt. Im Gegensatz zu externen Anbietern (die über das Internet
mithilfe von API-Schlüsseln erreicht werden) laufen eingebettete Dienste auf demselben Rechner wie OmniRoute und kommunizieren über die Loopback-Schnittstelle.

---

## Inhaltsverzeichnis

1. [Übersicht](#1-overview)
2. [Architektur — 4 Ebenen](#2-architecture--4-layers)
3. [Lebenszyklus-Zustandsautomat](#3-lifecycle-state-machine)
4. [API-Referenz](#4-api-reference)
5. [Sicherheit](#5-security)
6. [Hinzufügen eines neuen eingebetteten Dienstes](#6-adding-a-new-embedded-service)
7. [Fehlerbehebung](#7-troubleshooting)
8. [FAQ](#8-faq)

---

## 1. Übersicht

### Warum eingebettete Dienste?

Sechs Dienste sind eingebettet:

| Dienst          | npm-Paket                              | Standardport | Zweck                                                                                                                                                                                                                                  |
| --------------- | -------------------------------------- | :----------: | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **9Router**     | `9router`                              |    20130     | KI-Router, den OmniRoute als Unteranbieter verwenden kann. Modelle werden als `9router/{sub}/{model}` bereitgestellt                                                                                                                   |
| **CLIProxyAPI** | GitHub-Release-Binärdatei (`cliproxy`) |     8317     | Lokaler Proxy-Adapter für Anthropic-CLI-Authentifizierungsabläufe. Bietet Fallback-Routing, wenn OAuth-Token ablaufen                                                                                                                  |
| **Mux**         | `mux` (headless `mux server`)          |     8322     | Lokaler Agenten-Orchestrierungs-Daemon (coder/mux). Wird ausschließlich hinsichtlich seines Lebenszyklus verwaltet — kein Routing-Ziel (kein LLM-Proxying).                                                                            |
| **Bifrost**     | `@maximhq/bifrost`                     |     8080     | Go-KI-Gateway-Relay-Backend. Wird bei laufendem Betrieb automatisch von der Relay-Route (`/v1/relay/`) ausgewählt                                                                                                                      |
| **Dario**       | `@askalf/dario`                        |     3456     | Claude-Abonnement-Proxy — Alternative/Fallback zu CLIProxyAPI für Claude-Code-kompatiblen Datenverkehr; der injizierte Schlüssel wird zu `DARIO_ADMIN_TOKEN`, der den Zugriff auf die OAuth-Steuerungsebene unter `/admin/*` absichert |
| **open-wa**     | `@open-wa/wa-automate`                 |     8323     | WhatsApp-Web-Automatisierung (headless Chromium über Puppeteer). Wird ausschließlich hinsichtlich seines Lebenszyklus verwaltet — kein Routing-Ziel.                                                                                   |

Alle sechs folgen demselben Überwachungsmodell:

- OmniRoute installiert sie unter `DATA_DIR/services/{name}/` (isoliert von OmniRoutes eigener `package.json`)
- OmniRoute startet und überwacht sie als Kindprozesse
- OmniRoute injiziert einen flüchtigen API-Schlüssel in die Umgebung des Kindprozesses und rotiert ihn ohne Ausfallzeit (sofern anwendbar)
- Alle Verwaltungsrouten (`/api/services/*`) sind **LOCAL_ONLY** — ausschließlich über die Loopback-Schnittstelle zugänglich (verbindliche Regel Nr. 17)

### Wichtige Entscheidungen (aus dem Entwurfsplan)

| Entscheidung                                                | Wert                                                                                                                  |
| ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Dashboard-Zugriff auf die native 9Router-Benutzeroberfläche | Reverse-Proxy unter `/dashboard/providers/services/9router/embed/*`                                                   |
| Installationsmechanismus                                    | `npm install {package}` über `execFile` (keine Shell-Interpolation)                                                   |
| Nutzungsmodus                                               | Anbieter wird als `9router/{sub}/{model}` in der Routing-Engine registriert                                           |
| API-Schlüsselverwaltung                                     | OmniRoute generiert den Schlüssel, verschlüsselt ihn im Ruhezustand (AES-256-GCM) und injiziert ihn über die Umgebung |
| Dashboard-Speicherort                                       | `/dashboard/providers/services` (drei Registerkarten)                                                                 |
| Automatischer Start                                         | Umschalter pro Dienst, standardmäßig AUS                                                                              |

---

## 2. Architektur — 4 Schichten

```
┌────────────────────────────────────────────────────────────────────┐
│  Schicht 1 — Benutzeroberfläche                                    │
│  /dashboard/providers/services  (Tabs: CLIProxyAPI | 9Router | Mux)│
│  Live-Protokolle (SSE), Start/Stopp/Neustart/Update, Einstellungen,│
│  Installation                                                      │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               Oberfläche + Tab-Routing über ?tab=  │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Schicht 2 — API (LOCAL_ONLY — nur Loopback)                       │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (Reverse-HTTP- + WebSocket-Proxy → 9Router-Upstream)            │
│                                                                    │
│  Zugriffsschutz: LOCAL_ONLY_API_PREFIXES enthält "/api/services/"  │
│        und "/dashboard/providers/services/*/embed/"                │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ prozessinterne Aufrufe
┌──────────────────────▼─────────────────────────────────────────────┐
│  Schicht 3 — ServiceSupervisor (src/lib/services/)                 │
│                                                                    │
│  ServiceSupervisor.ts   Generischer Supervisor (child_process.spawn)│
│    ├── Installation: execFile('npm', ['install', pkg, '--prefix']) │
│    ├── Start:       spawn(node, [entrypoint], {env, cwd})          │
│    ├── API-Schlüssel: crypto.randomBytes(32) → env NINEROUTER_API_KEY│
│    ├── Port:        20130 für 9Router (konfigurierbar)             │
│    ├── Protokolle:  stdio-Ringpuffer mit 5 MB → SSE-Ereignisse    │
│    ├── Zustand:     HTTP GET /health alle 2–5 s, verzögerte Wiederherstellung│
│    └── Lebenszyklus: SIGTERM 15 s → SIGKILL                       │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       Initialisiert alle SERVICES[] beim Prozessstart│
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       Regelmäßiges GET /v1/models → Tabelle service_models│
│  ringBuffer.ts      Zirkulärer Protokollpuffer (5 MB pro Dienst)   │
│  healthCheck.ts     Periodische HTTP-Zustandsprüfung               │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts, openwa.ts  │
│                      (Installationsadapter)                        │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ OpenAI-kompatibles HTTP (Loopback)
┌──────────────────────▼─────────────────────────────────────────────┐
│  Schicht 4 — Anbieter / Routing                                    │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    Ruft Port und API-Schlüssel pro Anfrage erneut ab (kein Cache). │
│    Entfernt das Präfix "9router/" vor dem Proxying aus der Modell-ID.│
│    Gibt 503 service_not_running zurück, wenn der Supervisor nicht  │
│    im Zustand "running" ist.                                       │
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    Eintrag für "9router": isEmbeddedService: true                  │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    Modelle werden als "9router/{sub}/{model}" gespeichert (mit Präfix).│
│    Synchronisierung alle 5 Min. durch modelSync.ts.                │
│                                                                    │
│  Mux wird NUR hinsichtlich seines Lebenszyklus verwaltet           │
│  (Schichten 1–3) — es ist ein Agenten-Orchestrierungs-Daemon und   │
│  kein LLM-Proxy. Daher hat es keinen Executor-/Anbietereintrag in  │
│  Schicht 4 und ist niemals ein Routing-Ziel.                       │
└────────────────────────────────────────────────────────────────────┘
```

### Wichtige Quelldateien

| Datei                                       | Rolle                                                            |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `src/lib/services/ServiceSupervisor.ts`     | Kernklasse: Lebenszyklus, Sperre, Integrität, Ringpuffer         |
| `src/lib/services/bootstrap.ts`             | Registrierung auf Prozessebene und automatischer Start           |
| `src/lib/services/registry.ts`              | Singleton-Map `tool → supervisor`                                |
| `src/lib/services/apiKey.ts`                | Schlüsselerzeugung, AES-256-GCM-Verschlüsselung im Ruhezustand   |
| `src/lib/services/modelSync.ts`             | Regelmäßige Modellsynchronisierung (5 Min.) + bei Bedarf         |
| `src/lib/services/ringBuffer.ts`            | Zirkulärer 5-MB-Protokollpuffer mit SSE-Abonnement               |
| `src/lib/services/healthCheck.ts`           | HTTP-Integritätsprüfung (konfigurierbares Intervall)             |
| `src/lib/services/installers/ninerouter.ts` | npm-Installation/-Aktualisierung/-Deinstallation für 9Router     |
| `src/lib/services/installers/cliproxy.ts`   | npm-Installation/-Aktualisierung/-Deinstallation für CLIProxyAPI |
| `src/lib/services/installers/mux.ts`        | npm-Installation/-Aktualisierung/-Deinstallation für Mux         |
| `src/lib/services/installers/openwa.ts`     | npm-Installation/-Aktualisierung/-Deinstallation für open-wa     |
| `src/app/api/services/9router/_lib.ts`      | Hilfsfunktion `getOrInitSupervisor()`                            |
| `src/app/api/services/[name]/logs/route.ts` | Gemeinsamer SSE-Protokollendpunkt                                |
| `open-sse/executors/ninerouter.ts`          | Provider-Executor (Schicht 4)                                    |

---

## 3. Lifecycle-Zustandsautomat

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
          Zustandsprüfung erfolgreich│         Absturz / SIGTERM │
                               ┌────▼─────┐  (Ende innerhalb 5 s)│
                               │ running  │─── Absturz ─────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

Die Zustände werden in der DB-Tabelle `version_manager` (Spalte `status`) gespeichert und
im In-Memory-Zustand von `ServiceSupervisor` gespiegelt. Für einen laufenden Prozess ist
der In-Memory-Zustand maßgeblich; der DB-Zustand dient beim Start als dauerhafter Rückfallwert.

### Zustandsübergänge

| Von             | Ereignis                               | Nach                        |
| --------------- | -------------------------------------- | --------------------------- |
| `not_installed` | `install()` erfolgreich                | `stopped`                   |
| `stopped`       | `start()` aufgerufen                   | `starting`                  |
| `starting`      | Zustandsprüfung gibt 200 zurück        | `running`                   |
| `starting`      | Prozess endet vor Betriebsbereitschaft | `error`                     |
| `running`       | `stop()` aufgerufen                    | `stopping` → `stopped`      |
| `running`       | Prozess endet unerwartet (< 5 s)       | `error` (schneller Absturz) |
| `running`       | Prozess endet unerwartet (> 5 s)       | `error`                     |
| `error`         | `start()` aufgerufen                   | `starting`                  |
| beliebig        | `stop()` während `stopping`            | keine Aktion                |

### Operationssperre

`ServiceSupervisor` serialisiert Lifecycle-Operationen über eine asynchrone Operationssperre
(`withLock()`). Gleichzeitige `start()`-Aufrufe auf demselben Supervisor führen zu genau
einem Prozessstart; der zweite Aufrufer wartet und gibt den vorhandenen Status zurück. Dies verhindert
Race Conditions, wenn beispielsweise der automatische Start und eine UI-Schaltfläche gleichzeitig ausgelöst werden.

---

## 4. API-Referenz

Alle Routen unter `/api/services/` sind **LOCAL_ONLY** (nur Loopback, feste Regel Nr. 17).
Nicht über Loopback eingehende Anfragen erhalten unabhängig vom Authentifizierungstoken `403 LOCAL_ONLY`.

### 4.1 9Router-Endpunkte (11 Routen)

#### `POST /api/services/9router/install`

Installiert 9Router von npm. Erstellt `DATA_DIR/services/9router/` mit einer eigenen
`package.json` und eigenen `node_modules/`. Verursacht keine Konflikte mit den Abhängigkeiten von OmniRoute.

**Anfragetext** (alles optional):

```json
{ "version": "latest" }
```

| Feld      | Typ      | Standardwert | Beschreibung                                   |
| --------- | -------- | ------------ | ---------------------------------------------- |
| `version` | `string` | `"latest"`   | Zu installierendes npm-Versionstag oder Semver |

**Antworten:**

| Status | Beschreibung                                                                           |
| ------ | -------------------------------------------------------------------------------------- |
| `200`  | `{ ok: true, installedVersion: "x.y.z", path: "..." }`                                 |
| `400`  | Ungültiger Anfragetext (Zod-Validierung fehlgeschlagen)                                |
| `409`  | Installation läuft bereits (Sperre aktiv)                                              |
| `500`  | npm-Installation fehlgeschlagen — siehe `message` für eine verständliche Fehlermeldung |

**Hinweise:** Verwendet `execFile('npm', [...])` — keine Shell, keine Interpolation (feste Regel Nr. 13).
EACCES-Fehler werden als verständliche Meldungen ausgegeben.

---

#### `POST /api/services/9router/start`

Startet 9Router. Registriert einen Supervisor, sofern noch keiner registriert ist, und ruft anschließend
`supervisor.start()` auf. Ist idempotent, wenn der Dienst bereits ausgeführt wird.

**Anfragetext:** keiner

**Antworten:**

| Status | Beschreibung                                              |
| ------ | --------------------------------------------------------- |
| `200`  | `ServiceStatus`-Objekt (siehe Schema unten)               |
| `409`  | 9Router ist nicht installiert (`status: "not_installed"`) |
| `503`  | Start fehlgeschlagen (Prozessfehler — siehe `lastError`)  |

**ServiceStatus-Schema:**

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

Beendet 9Router ordnungsgemäß. Sendet SIGTERM, wartet 15 s und sendet anschließend SIGKILL, falls der Prozess noch aktiv ist.
Ist idempotent, wenn der Dienst bereits beendet ist.

**Anfragetext:** keiner

**Antworten:**

| Status | Beschreibung                       |
| ------ | ---------------------------------- |
| `200`  | `ServiceStatus` (state: "stopped") |
| `503`  | Beenden unerwartet fehlgeschlagen  |

---

#### `POST /api/services/9router/restart`

Entspricht `stop()` gefolgt von `start()` unter der Operationssperre.

**Anfragetext:** keiner

**Antworten:** wie bei `start` (gibt den endgültigen `ServiceStatus` zurück).

---

#### `POST /api/services/9router/update`

Aktualisiert 9Router auf eine neuere npm-Version. Wenn der Dienst ausgeführt wird, wird er
zuerst beendet, anschließend wird npm install ausgeführt (wobei die neuere Version direkt
über die vorhandene installiert wird) und danach wird der Dienst neu gestartet.

**Anfragetext** (alles optional):

```json
{ "version": "latest" }
```

**Antworten:**

| Status | Beschreibung                                                    |
| ------ | --------------------------------------------------------------- |
| `200`  | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400`  | Ungültiger Anfragetext                                          |
| `500`  | npm-Aktualisierung fehlgeschlagen                               |

---

#### `POST /api/services/9router/rotate-key`

Erzeugt einen neuen API-Schlüssel für 9Router, verschlüsselt ihn im Ruhezustand und startet den Dienst
(falls er ausgeführt wird) neu, damit der neue Schlüssel aus seiner Umgebung übernommen wird. Der alte Schlüssel wird
sofort ungültig gemacht.

**Anfragetext:** keiner

**Antworten:**

| Status | Beschreibung                               |
| ------ | ------------------------------------------ |
| `200`  | `{ keyRotated: true, restarted: boolean }` |
| `500`  | Schlüsselrotation fehlgeschlagen           |

**Sicherheit:** Der neue Schlüssel wird niemals in der Antwort zurückgegeben (kein Offenlegen von Anmeldedaten).
Er wird verschlüsselt (AES-256-GCM) in der Tabelle `version_manager` gespeichert.

---

#### `GET /api/services/9router/status`

Gibt den kombinierten Live- und Datenbankstatus einschließlich Versionsmetadaten und API-Schlüsselvorschau zurück.

**Antworten:**

| Status | Beschreibung                    |
| ------ | ------------------------------- |
| `200`  | Siehe Schema unten              |
| `500`  | Lesen des Status fehlgeschlagen |

**Antwortschema:**

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

Schaltet das Autostart-Flag um. Wenn `enabled: true` gesetzt ist, wird der Dienst beim
nächsten Start von OmniRoute automatisch gestartet (sofern der Dienst installiert ist).

**Anfragetext:**

```json
{ "enabled": true }
```

**Antworten:**

| Status | Beschreibung           |
| ------ | ---------------------- |
| `200`  | `{ autoStart: true }`  |
| `400`  | Ungültiger Anfragetext |

---

#### `GET /api/services/9router/logs`

SSE-Stream mit Live-Protokollen aus dem stdout/stderr-Ringpuffer von 9Router.

**Abfrageparameter:**

| Parameter | Typ       | Standardwert | Beschreibung                                                                                 |
| --------- | --------- | ------------ | -------------------------------------------------------------------------------------------- |
| `tail`    | `integer` | 200          | Anzahl der zuerst zu sendenden historischen Zeilen (maximal 1000)                            |
| `filter`  | `string`  | keiner       | Teilzeichenfolgenfilter ohne Beachtung der Groß-/Kleinschreibung (kein Regex — ReDoS-sicher) |

**SSE-Ereignisse:**

| Ereignis    | Daten       | Beschreibung                     |
| ----------- | ----------- | -------------------------------- |
| `snapshot`  | `LogLine[]` | Anfänglicher historischer Auszug |
| `log`       | `LogLine`   | Live-Protokollzeile              |
| `heartbeat` | `{}`        | Keep-Alive alle 15 s             |

**LogLine-Schema:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**Antworten:**

| Status | Beschreibung                                         |
| ------ | ---------------------------------------------------- |
| `200`  | `text/event-stream`                                  |
| `400`  | Parameter `filter` zu lang (> 200 Zeichen)           |
| `404`  | Dienst nicht gefunden (Supervisor nicht registriert) |

---

### 4.2 CLIProxyAPI-Endpunkte (10 Routen)

CLIProxyAPI hat dieselbe Endpunktstruktur wie 9Router, jedoch ohne `rotate-key` und
zusätzlich mit `accounts`, `provider-expose` und `auto-restart-adopted`. Es erhält nun
einen dedizierten Data-Plane-API-Schlüssel, der beim Start injiziert wird (`needsApiKey: true`
in `bootstrap.ts`, für die Modellsynchronisierung verwendet); `status` enthält weniger Felder.

| Methode | Pfad                                | Beschreibung                              |
| ------- | ----------------------------------- | ----------------------------------------- |
| `POST`  | `/api/services/cliproxy/install`    | CLIProxyAPI von npm installieren          |
| `POST`  | `/api/services/cliproxy/start`      | CLIProxyAPI starten                       |
| `POST`  | `/api/services/cliproxy/stop`       | CLIProxyAPI stoppen                       |
| `POST`  | `/api/services/cliproxy/restart`    | CLIProxyAPI neu starten                   |
| `POST`  | `/api/services/cliproxy/update`     | Auf eine neuere Version aktualisieren     |
| `GET`   | `/api/services/cliproxy/status`     | Live- und DB-Status (ohne `apiKeyMasked`) |
| `POST`  | `/api/services/cliproxy/auto-start` | Automatischen Start umschalten            |

Der gemeinsam genutzte Endpunkt `GET /api/services/{name}/logs` (siehe §4.1) funktioniert
für alle vier Dienste über das dynamische Segment `[name]`.

---

### 4.3 Mux-Endpunkte (8 Routen)

Mux hat dieselbe Endpunktstruktur wie CLIProxyAPI – keine `rotate-key`-Route in der
API-Oberfläche (das Bearer-Token wird auf dieselbe Weise wie bei 9Router über
`getOrCreateApiKey("mux")` generiert und über die Umgebungsvariable `MUX_SERVER_AUTH_TOKEN`
injiziert, aber es gibt noch keinen dedizierten Rotationsendpunkt). Mux wird ausschließlich
über seinen Lebenszyklus verwaltet: Anders als 9Router verfügt es über keinen Layer-4-Executor
und wird niemals als Routing-Provider registriert.

| Methode | Pfad                           | Beschreibung                              |
| ------- | ------------------------------ | ----------------------------------------- |
| `POST`  | `/api/services/mux/install`    | Mux von npm installieren (`npm i mux`)    |
| `POST`  | `/api/services/mux/start`      | Mux starten (`mux server`)                |
| `POST`  | `/api/services/mux/stop`       | Mux stoppen                               |
| `POST`  | `/api/services/mux/restart`    | Mux neu starten                           |
| `POST`  | `/api/services/mux/update`     | Auf eine neuere npm-Version aktualisieren |
| `GET`   | `/api/services/mux/status`     | Live- und DB-Status                       |
| `POST`  | `/api/services/mux/auto-start` | Automatischen Start umschalten            |

---

### 4.4 Bifrost-Endpunkte (8 Routen)

Bifrost ist ein in Go implementiertes AI-Gateway-Relay-Backend (`@maximhq/bifrost`). Es
verwendet dieselbe Endpunktstruktur wie CLIProxyAPI (kein `rotate-key` – Bifrost verwaltet
seine eigenen Provider-Schlüssel in `config.json` unter seinem `-app-dir`).

| Methode | Pfad                               | Beschreibung                                                      |
| ------- | ---------------------------------- | ----------------------------------------------------------------- |
| `POST`  | `/api/services/bifrost/install`    | Bifrost von npm installieren (`@maximhq/bifrost`)                 |
| `POST`  | `/api/services/bifrost/start`      | Bifrost auf Port 8080 starten (Standard)                          |
| `POST`  | `/api/services/bifrost/stop`       | Bifrost stoppen                                                   |
| `POST`  | `/api/services/bifrost/restart`    | Bifrost neu starten                                               |
| `POST`  | `/api/services/bifrost/update`     | Auf eine neuere Version aktualisieren                             |
| `GET`   | `/api/services/bifrost/status`     | Live- und DB-Status                                               |
| `POST`  | `/api/services/bifrost/auto-start` | Automatischen Start umschalten                                    |
| `GET`   | `/api/services/bifrost/logs`       | SSE-Log-Tail (über die gemeinsame dynamische Route `[name]/logs`) |

**Routing-Verknüpfung:** Wenn `BIFROST_BASE_URL` nicht gesetzt ist und die überwachte
Bifrost-Instanz ausgeführt wird, verwendet `getBifrostRoutingConfig()` (in `routingBackend.ts`)
automatisch `http://127.0.0.1:{port}` als Basis-URL des Relays. Eine explizit gesetzte
Umgebungsvariable `BIFROST_BASE_URL` hat stets Vorrang.

---

### 4.5 Dario-Endpunkte (12 Routen)

Dieselbe Lebenszyklusstruktur wie bei den anderen Diensten (`install`, `start`, `stop`,
`restart`, `update`, `status`, `auto-start`, `auto-restart-adopted`) sowie eine
token-geschützte OAuth-Steuerungsebene unter `admin/`: `admin/accounts`,
`admin/import-from-omniroute`, `admin/login-start`, `admin/login-complete` (alle durch
`DARIO_ADMIN_TOKEN` geschützt).

### 4.6 open-wa-Endpunkte (7 Routen)

open-wa (`@open-wa/wa-automate`) steuert eine Headless-Chromium-Instanz (über
Puppeteer), um WhatsApp Web zu automatisieren. Es verwendet dieselbe Endpunktstruktur
wie Mux (noch keine `rotate-key`-Route). Es wird ausschließlich über seinen Lebenszyklus
verwaltet – es ist kein Routing-Ziel und besitzt keinen Layer-4-Executor/Provider-Eintrag.

| Methode | Pfad                              | Beschreibung                                                      |
| ------- | --------------------------------- | ----------------------------------------------------------------- |
| `POST`  | `/api/services/openwa/install`    | open-wa über npm (`@open-wa/wa-automate`) installieren            |
| `POST`  | `/api/services/openwa/start`      | open-wa auf Port 8323 starten (Standard)                          |
| `POST`  | `/api/services/openwa/stop`       | open-wa stoppen                                                   |
| `POST`  | `/api/services/openwa/restart`    | open-wa neu starten                                               |
| `POST`  | `/api/services/openwa/update`     | Auf eine neuere Version aktualisieren                             |
| `GET`   | `/api/services/openwa/status`     | Live- und DB-Status                                               |
| `POST`  | `/api/services/openwa/auto-start` | Automatischen Start umschalten                                    |
| `GET`   | `/api/services/openwa/logs`       | SSE-Log-Tail (über die gemeinsame dynamische Route `[name]/logs`) |

**API-Schlüssel:** Wird als `WA_KEY` injiziert — die generische, mit `WA_*`
präfixierte Umgebungsvariablenüberschreibung von open-wa ordnet ihn der
CLI-Option `--key`/`-k` zu (`dist/cli/setup.js::envArgs()`, anhand des
installierten Pakets in Version 4.76.0 verifiziert). Bei der Generierung durch
`generateServiceApiKey()` wird `ow_` vorangestellt. open-wa liest den Schlüssel
aus einem `key`/`api_key`-HTTP-Header aus (nicht aus `Authorization: Bearer`);
`/api-docs*` ist ausdrücklich von der Prüfung ausgenommen
(`setupAuthenticationLayer` in `dist/cli/server.js`), sodass der
Integritätscheck keinen Authentifizierungs-Header benötigt.

**Kopplung:** open-wa ist inoffiziell und steht in keiner Verbindung zu
WhatsApp — für die verbundene Nummer besteht aufgrund der WhatsApp-eigenen
Automatisierungserkennung das Risiko einer Sperrung. Beim ersten Start wird der
QR-Code zur Kopplung auf stdout ausgegeben und über das vorhandene
Protokollfenster bzw. den SSE-Stream bereitgestellt — diese Integration verfügt
noch über keinen eigenen QR-Bild-Endpunkt.

---

### 4.7 Reverse-Proxy (Einbettung des 9Router-Dashboards)

Das Dashboard bettet die 9Router-Weboberfläche über einen internen
Reverse-Proxy in einen iframe ein:

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

Dieser Proxy:

- Leitet die Anfrage an `http://127.0.0.1:{port}/{path}` weiter (nur Loopback)
- Entfernt eingehende `cookie`- und `authorization`-Header (keine Offenlegung der OmniRoute-Sitzung)
- Injiziert `Authorization: Bearer {apiKey}` für die 9Router-Authentifizierung
- Entfernt `set-cookie`, `content-security-policy`, `x-frame-options` und `cross-origin-*` aus der Antwort
- Schreibt HTML-Antworten um, um `<base href>` zu injizieren und absolute Pfade zu normalisieren (`/foo` → `/dashboard/.../embed/foo`)

WebSocket-Upgrades für das eingebettete Dashboard werden von einem begleitenden
Server auf einem dedizierten Port verarbeitet (siehe
`src/lib/services/embedWsProxy.ts`).

**Sicherheit:** Die Embed-Proxy-Routen sind unter `LOCAL_ONLY_API_PREFIXES`
klassifiziert und können nur über Loopback erreicht werden. Ein Angreifer, der
über einen Cloudflare-/Ngrok-Tunnel ein JWT erlangt, kann keine Anfragen per
Proxy an eingebettete Dienste weiterleiten.

---

## 5. Sicherheit

### LOCAL_ONLY-Durchsetzung (strikte Regel #17)

Alle Routen unter `/api/services/` und `/dashboard/providers/services/*/embed/` sind
in `src/server/authz/routeGuard.ts` als LOCAL_ONLY klassifiziert. Die Loopback-Prüfung
wird bedingungslos vor jedem Authentifizierungszweig ausgeführt:

```
Anfrage trifft ein
  → isLocalOnlyPath(path)?
      → kein Loopback → 403 LOCAL_ONLY (immer, vor der Authentifizierungsprüfung)
      → Loopback      → mit normaler Authentifizierung fortfahren
```

Dadurch wird verhindert, dass ein offengelegtes JWT (z. B. über einen Tunnel)
`npm install` oder das Starten von Prozessen auslösen kann. Die vollständige
Stufenmatrix finden Sie unter `docs/security/ROUTE_GUARD_TIERS.md`.

### Einschleusung von API-Schlüsseln

9Router und Mux benötigen einen API-Schlüssel bzw. ein Bearer-Token für ihre eigenen
HTTP-Endpunkte. OmniRoute:

1. Generiert mittels `crypto.randomBytes(32).toString("base64url")` einen Schlüssel
   mit einem dienstspezifischen Präfix (`nr_` für 9Router, `mx_` für Mux).
2. Verschlüsselt ihn im Ruhezustand mit AES-256-GCM (dieselbe Verschlüsselung, die
   für Anbieter-Anmeldedaten verwendet wird).
3. Entschlüsselt ihn beim Starten und schleust ihn als Umgebungsvariable ein —
   `NINEROUTER_API_KEY` für 9Router, `MUX_SERVER_AUTH_TOKEN` für Mux (niemals als
   CLI-Flag, damit das Token nie in `ps`- bzw. Prozessauflistungen erscheint).
4. Gibt den Schlüssel im Klartext niemals in einer HTTP-Antwort zurück.

CLIProxyAPI erhält einen dedizierten, beim Starten eingeschleusten
Datenebenen-Schlüssel (`needsApiKey: true` — für die Modellsynchronisierung mit dem
Adapter verwendet).

### SSRF-Schutz

Der Reverse-HTTP-Proxy (`/dashboard/.../embed/[...path]`) ist fest so konfiguriert,
dass er ausschließlich an `http://127.0.0.1:{port}` weiterleitet. Er folgt niemals
Weiterleitungen zu Zielen außerhalb des Loopback-Bereichs. Die Bibliothek
`ssrf-req-filter` wird verwendet, um alle Upstream-URLs abzulehnen, deren Auflösung
außerhalb des Loopback-Bereichs liegt.

### Shell-Sicherheit (strikte Regel #13)

`npm install` wird über `execFile('npm', ['install', pkg, '--prefix', dir])`
aufgerufen — keine Template-Literale, keine Shell und keine Interpolation externer
Pfade in die Befehlszeichenfolge. Laufzeitwerte (Ports, API-Schlüssel) werden über
das `env`-Objekt des Kindprozesses übergeben.

### Fehlerbereinigung (strikte Regel #12)

Alle Fehlerantworten von `/api/services/*` werden durch `buildErrorBody()` oder
`sanitizeErrorMessage()` verarbeitet. Rohe Werte von `err.stack` und `err.message`
werden niemals unverändert an den Aufrufer zurückgegeben.

---

## 6. Hinzufügen eines neuen eingebetteten Dienstes

Führen Sie diese 8 Schritte aus. Verwenden Sie die vorhandenen Implementierungen in
`src/lib/services/installers/` und `src/app/api/services/` als maßgebliche Referenz.

### Schritt 1 — Installationsprogramm erstellen

Erstellen Sie `src/lib/services/installers/{name}.ts` nach dem Vorbild von
`ninerouter.ts`:

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // freien Port auswählen

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

Verwenden Sie `runNpm(['install', NAME_PACKAGE, '--prefix', dir])` aus
`installers/utils.ts` — niemals `execSync` oder Shell-Interpolation.

### Schritt 2 — Beim Bootstrap registrieren

Fügen Sie dem `SERVICES`-Array in `src/lib/services/bootstrap.ts` einen
`ServiceEntry` hinzu:

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // false, wenn kein API-Schlüssel benötigt wird
}
```

Erweitern Sie `buildSpawnArgsFactory()`, sodass `cfg.tool === "myservice"`
unterstützt wird.

#### Austauschbarer Anbieter-Plugin-Vertrag (Phase 1, #7333)

`src/lib/services/providerPlugins/` führt einen `ServiceProviderPlugin`-Vertrag ein,
der die `ServiceEntry`-Felder aus `bootstrap.ts` und die
Manifestvorlagen-Felder aus `serviceBackends.ts` eines Backends in einem Objekt
bündelt, anstatt die Struktur desselben Backends separat in zwei voneinander
unabhängigen Dateien auszudrücken. Zum Zeitpunkt der Erstellung dieses Dokuments
ist **nur `9router` migriert** — `bootstrap.ts` leitet seinen Eintrag für
`SERVICES[]` von `getServiceProviderPlugin("9router")`
(`src/lib/services/providerPlugins/registry.ts`) ab und löst beim Start einen Fehler
aus, falls das Plugin jemals fehlen sollte. `cliproxy`, `mux` und `bifrost`
verwenden weiterhin unverändert die bereits vorhandenen Inline-Literale von
`SERVICES[]`.

`open-sse/config/providerPluginManifest.ts` wurde außerdem um die additive
Hilfsfunktion `createServiceBackendManifestEntry(pluginId, template)` ergänzt, die
aus einem Eintrag von `SERVICE_BACKEND_MANIFEST_TEMPLATE` einen korrekt aufgebauten
`ProviderPluginManifestEntry` erstellt — sie ist **noch nicht** in einen aktiven
Anfragepfad eingebunden (weder in `generateProviderPluginManifestFromRegistry()`
noch in `/v1/providers/[provider]/models`); dies bleibt eine Folgeaufgabe, sobald
der Vertrag für ein zweites Backend erprobt wurde.

Auf nachfolgende PRs verschoben und unter Issue #7333 nachverfolgt sind: die
Migration von `cliproxyapi` über dieselbe Registry, die Generalisierung von
`mux`/`bifrost` in die Union `ServiceBackendPluginId`, die Integration der
Sonderbehandlung für Executor-Routing (`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`) in den Plugin-Vertrag sowie die
Einbindung von `createServiceBackendManifestEntry()` in einen aktiven
Manifest-/Modell-Codepfad.

### Schritt 3 — Migration und DB-Seed hinzufügen

Stellen Sie über eine Migration in `src/lib/db/migrations/` sicher, dass der Dienst
eine Zeile in `version_manager` besitzt. Die Zeile sollte Folgendes enthalten:

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### Schritt 4 — Die 7 API-Endpunkte erstellen

Unter `src/app/api/services/{name}/`:

```
_lib.ts            Hilfsfunktion getOrInitSupervisor()
install/route.ts   POST — ruft installer.install() auf
start/route.ts     POST — ruft supervisor.start() auf
stop/route.ts      POST — ruft supervisor.stop() auf
restart/route.ts   POST — ruft supervisor.restart() auf
update/route.ts    POST — ruft installer.update() auf
status/route.ts    GET  — führt Live- und DB-Status zusammen
auto-start/route.ts POST — schaltet das auto_start-Flag um
```

Die gemeinsam genutzte Route `GET /api/services/[name]/logs` ist bereits angebunden — dort sind keine Änderungen erforderlich.

Delegiere alle Fehlerantworten über `createErrorResponse()` / `buildErrorBody()`.

### Schritt 5 — Zu LOCAL_ONLY_API_PREFIXES hinzufügen

Überprüfe in `src/server/authz/routeGuard.ts`, ob `/api/services/` bereits aufgeführt ist.
Falls du ein neues Präfix einführst (z. B. `/api/tools/`), füge es sowohl zu
`LOCAL_ONLY_API_PREFIXES` als auch, sofern darüber Prozesse gestartet werden, zu `SPAWN_CAPABLE_PREFIXES` hinzu.
Füge einen Test in `tests/unit/authz/routeGuard.test.ts` hinzu.

### Schritt 6 — UI-Tab hinzufügen

Erstelle `src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`.
Verwende die gemeinsam genutzten Komponenten wieder:

- `ServiceStatusCard` — Live-Status + Zustands-Badge
- `ServiceLifecycleButtons` — Starten / Stoppen / Neu starten / Aktualisieren
- `ServiceLogsPanel` — SSE-Log-Ausgabe (stellt eine Verbindung zu `/api/services/{name}/logs` her)
- `ApiKeyCard` — Schlüssel anzeigen + rotieren (falls `needsApiKey: true`)

Registriere den Tab in `ServicesPageShell.tsx`.

### Schritt 7 — Provider-Eintrag hinzufügen (wenn der Dienst ein Routing-Ziel ist)

Wenn der eingebettete Dienst einen OpenAI-kompatiblen Endpunkt `/v1/chat/completions` bereitstellt:

1. Füge in `src/shared/constants/providers.ts` einen Provider-Eintrag mit `isEmbeddedService: true` hinzu.
2. Erstelle `open-sse/executors/{name}.ts`, das `BaseExecutor` erweitert. Ermittle Port und
   API-Schlüssel für jede Anfrage erneut (niemals im Konstruktor zwischenspeichern). Gib eine Antwort vom Typ `503 service_not_running`
   zurück, wenn der Supervisor-Status nicht `"running"` ist.
3. Registriere Modelle in `open-sse/config/providerRegistry.ts` mit dem Dienstpräfix
   (z. B. `myservice/sub/model`). `modelSync.ts` hält sie auf dem neuesten Stand.

### Schritt 8 — Dokumentieren und testen

1. Aktualisiere `docs/frameworks/EMBEDDED-SERVICES.md` (diese Datei) — füge den Dienst zur
   Tabelle in §1 und alle neuen Endpunkte zu §4 hinzu.
2. Füge Unit-Tests in `tests/unit/services/` hinzu (Lebenszyklus, Installer, API-Form).
3. Füge einen Integrationstest in `tests/integration/services/` hinzu (hinter `RUN_SERVICES_INT=1`).
4. Aktualisiere `docs/openapi.yaml` um die neuen Endpunkte.

---

## 7. Fehlerbehebung

### Dienst startet nicht

**Symptome:** Die Start-Schaltfläche gibt 503 zurück, der Status bleibt bei `"error"` oder `"starting"`.

**Checkliste:**

1. Prüfen Sie `GET /api/services/{name}/logs` (oder den Protokollbereich im Dashboard). Suchen
   Sie nach Zeilen wie `Error: ENOENT`, `address already in use` oder `Cannot find module`.
2. Überprüfen Sie, ob sich `npm` im PATH befindet: Führen Sie `which npm` unter demselben Benutzerkonto aus, unter dem OmniRoute ausgeführt wird.
3. Überprüfen Sie, ob der Dienst installiert ist: Prüfen Sie `GET /api/services/{name}/status` auf
   `installedVersion`. Wenn der Wert `null` ist, führen Sie zuerst die Installation aus.
4. Prüfen Sie, ob `DATA_DIR/services/{name}/node_modules/` vorhanden und nicht leer ist.
5. Prüfen Sie das Feld `lastError` in der Statusantwort auf den bereinigten Beendigungsgrund.

---

### Kaltstart ist langsam (> 10 s bis zum Erreichen von `running`)

**Symptome:** Der Status bleibt lange bei `"starting"`, bevor er zu `"running"` oder `"error"` wechselt.

**Erklärung:** Der Kaltstart von 9Router umfasst das Importieren großer Abhängigkeitsbäume (DNS-,
Tunnel- und MITM-Module). Das standardmäßige Zustandsprüfungsintervall beträgt 2 s mit 3 Versuchen, bevor
der Supervisor eine Zeitüberschreitung meldet (die Abfrage jedoch fortsetzt).

**Lösung:** `healthIntervalMs` und die Zeitüberschreitung von `waitForHealthy`
(`healthIntervalMs * 3`) können in `bootstrap.ts` konfiguriert werden. Erhöhen Sie für Dienste mit längeren
Startzeiten `healthIntervalMs` auf 5000 und `stopTimeoutMs` auf 30 000.

---

### Portkonflikt (`EADDRINUSE`)

**Symptome:** Die Protokolle zeigen `address already in use :::20130`.

**Ursachen:**

- Ein anderer Prozess verwendet bereits Port 20130.
- Ein vorheriger 9Router-Prozess wurde nicht vollständig beendet (Zombie-PID).

**Lösung:**

1. Ändern Sie den Standardport über die Umgebungsvariable `NINEROUTER_PORT` in `.env`.
2. Ermitteln und beenden Sie den kollidierenden Prozess: `lsof -ti :20130 | xargs kill -9`.
3. Der Port kann in `bootstrap.ts` über das Feld `port` für jeden Dienst separat konfiguriert werden.

**Hinweis:** 9Router verwendet standardmäßig Port 20130, um gezielt einen Konflikt mit
dem Standardport 20128 von OmniRoute zu vermeiden.

---

### Zugriff bei der Installation verweigert (EACCES)

**Symptome:** Die Installation gibt 500 zurück, die Protokolle zeigen `EACCES` oder `permission denied`.

**Ursachen:**

- `DATA_DIR` oder das übergeordnete Verzeichnis ist für den OmniRoute-Prozess nicht beschreibbar.
- Die Ausführung erfolgt in einem Rootless-Docker-Container ohne Schreibzugriff auf das eingebundene Volume.

**Lösung:**

1. Prüfen Sie `DATA_DIR` (Standard: `~/.omniroute/`): `ls -la ~/.omniroute/`
2. Stellen Sie sicher, dass das Verzeichnis dem Benutzer des OmniRoute-Prozesses gehört: `chown -R $USER ~/.omniroute/`
3. Stellen Sie in Docker sicher, dass der Volume-Mount die richtigen Berechtigungen für den Container-Benutzer besitzt.

---

### Aktualisierung schlägt fehl (`npm install`-Zeitüberschreitung oder Netzwerkfehler)

**Symptome:** Die Aktualisierung gibt 500 mit `InstallError` zurück, die Protokolle zeigen eine Netzwerkzeitüberschreitung.

**Checkliste:**

1. Prüfen Sie, ob die npm-Registry erreichbar ist: `npm ping`.
2. Prüfen Sie, ob ein Unternehmensproxy verwendet wird: `npm config get proxy`, `npm config get https-proxy`.
3. Versuchen Sie die Installation manuell: `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. Laden Sie bei einer Air-Gap-Umgebung den Tarball vorab herunter und verwenden Sie `npm install /path/to/tarball.tgz`.

---

### Dienst zeigt direkt nach dem Start den Status `"error"` an (schneller Absturz)

**Symptome:** Der Status wechselt in weniger als 5 Sekunden von `"starting"` zu `"error"`.
`lastError` zeigt `"Fast crash (exited with code 1)"`.

**Checkliste:**

1. Lesen Sie das vollständige Protokollende: `GET /api/services/{name}/logs?tail=500`.
2. Häufige Ursache: vom Dienst erwartete Umgebungsvariablen fehlen.
3. Für 9Router: Überprüfen Sie, ob `NINEROUTER_DISABLE_MITM=true` und
   `NINEROUTER_DISABLE_TUNNEL=true` in der beim Start übergebenen Umgebung enthalten sind (siehe
   `resolveSpawnArgs` in `installers/ninerouter.ts`).

---

## 8. FAQ

**F: Kann ich die Endpunkte der eingebetteten Dienste für Clients außerhalb des Loopbacks freigeben?**

Nein. Die LOCAL_ONLY-Stufe ist beabsichtigt (feste Regel #17). Routen, die
`npm install` ausführen oder `node`-Prozesse starten können, dürfen nicht über
Nicht-Loopback-Datenverkehr erreichbar sein, da ein über einen Tunnel (Cloudflare,
Ngrok, Tailscale) offengelegtes JWT andernfalls das Starten beliebiger Prozesse
ermöglichen würde. Für `/api/services/` gibt es keine Ausnahme — anders als
`/api/mcp/` ist dieser Pfad von der Umgehungsliste für den manage-Scope ausgeschlossen.
Siehe `docs/security/ROUTE_GUARD_TIERS.md`.

---

**F: Werden 9Router und CLIProxyAPI in Produktions-/Cloud-Bereitstellungen verfügbar sein?**

Ja. Beide Dienste folgen demselben Local-first-Modell wie OmniRoute selbst. Sie
laufen auf demselben Rechner und kommunizieren über Loopback. „Produktion“ bezeichnet
hier den VPS oder lokalen Server, auf dem OmniRoute bereitgestellt ist, nicht einen
entfernten Cloud-Anbieter.

---

**F: Wie debugge ich den Supervisor?**

1. Verfolgen Sie den SSE-Protokollstream: `curl -N http://localhost:20128/api/services/9router/logs`.
2. Prüfen Sie die strukturierten Protokolle in der pino-Ausgabe von OmniRoute,
   gefiltert nach dem Namespace `service:supervisor`.
3. Prüfen Sie den DB-Datensatz: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. Verwenden Sie `GET /api/services/9router/status`, um den aktuellen Live-Status,
   die PID, den Zustand und `lastError` in einem einzigen Aufruf anzuzeigen.

---

**F: Der Supervisor zeigt `health: "degraded"` oder `health: "unknown"` an, der Status ist jedoch `"running"`. Ist das ein Problem?**

`"degraded"` bedeutet, dass die Zustandsprüfung eine Nicht-200-Antwort zurückgegeben
hat. `"unknown"` bedeutet, dass noch keine Prüfung abgeschlossen wurde
(Wettlaufsituation bei der ersten Abfrage). Beide Zustände sind während des Starts
vorübergehend. Wenn der Zustand länger als `healthIntervalMs * 3` ms nach
`"running"` auf `"degraded"` bleibt, läuft der eingebettete Dienst, aber seine
HTTP-API antwortet nicht. Prüfen Sie, ob der Port in der Statusantwort korrekt ist
und ob der Dienst tatsächlich an diesem Port lauscht.

---

**F: Kann ich den 9Router-API-Schlüssel ohne vollständigen Neustart ändern?**

Nein. Der API-Schlüssel wird beim Starten über eine Umgebungsvariable an 9Router
übergeben. Umgebungsvariablen können in einem laufenden Prozess nicht geändert
werden. `POST .../rotate-key` beendet den Dienst automatisch und startet ihn neu,
um den neuen Schlüssel anzuwenden. Die Schlüsselrotation wird innerhalb des
`stopTimeoutMs` des Dienstes (standardmäßig 15 s) zuzüglich seiner Startzeit
wirksam.

---

**F: Wie groß ist das Ringpuffer-Limit und was geschieht, wenn es erreicht wird?**

Jeder Dienst verfügt über einen eigenen 5-MB-Ringpuffer. Wenn der Puffer voll ist,
werden die ältesten Protokollzeilen entfernt, um Platz für neue zu schaffen. Das
SSE-Ereignis `snapshot` gibt die neuesten Zeilen innerhalb des `tail`-Limits zurück.
Protokolle werden nicht auf der Festplatte gespeichert, sofern `logsBufferPath`
nicht im DB-Datensatz festgelegt ist.

---

## Siehe auch

- `docs/security/ROUTE_GUARD_TIERS.md` — Details zur LOCAL_ONLY-Stufe
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 Modulzuordnung eingebetteter Dienste
- `docs/architecture/ARCHITECTURE.md` — Kontext auf Systemebene
- `docs/openapi.yaml` — maschinenlesbare Endpunktdefinitionen
- `CLAUDE.md` §„Hinzufügen eines neuen eingebetteten Dienstes“ — Kurzübersichts-Checkliste
