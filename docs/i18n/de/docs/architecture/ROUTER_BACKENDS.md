# Router Backends & Embedded Services — architecture contract (ADR) (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **Status:** Akzeptiert · **Kontext:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **Vertrag:** `domain/routing/routerBackends.ts`
> (typisierte Registry — der Code wird mit [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) integriert)

Dieser ADR legt fest, wie `ts` (nativ), `bifrost`, `cliproxy`, `9router` und
VibeProxy-kompatible Engines zueinander in Beziehung stehen, damit Mitwirkende
nicht länger zwei architektonisch unterschiedliche Konzepte miteinander
vermischen. Er dokumentiert die durch die Arbeiten an der Router-Backend-Registry
eingeführte typisierte Registry als zentrale Quelle der Wahrheit für dieses Modell.

## Der zentrale Unterschied — zwei orthogonale Achsen

Die Rolle einer Engine wird durch **zwei unabhängige Achsen** beschrieben, die
gemeinsam im `RouterBackendDefinition` der Registry abgebildet sind:

1. **Lebenszyklus** (`RouterBackendLifecycle`) — _wie die Engine ausgeführt wird_:
   - `in-process` — wird innerhalb des OmniRoute-Node-Prozesses ausgeführt (die native TS-Pipeline).
   - `supervised` — ein lokaler Kindprozess, den OmniRoute über `ServiceSupervisor`
     installiert/startet/stoppt/auf Funktionsfähigkeit prüft und anschließend als Provider-Verbindung verwendet.
   - `external` — ein HTTP-Endpunkt, an den OmniRoute Anfragen weiterleitet, den es
     jedoch **nicht** verwaltet (konfiguriert über eine Basis-URL in einer Umgebungsvariable).
   - `disabled` — registriert, aber nicht auswählbar.
2. **Auswahlachse** (Relay-Routing-Backend) — _ob das Relay Anfragen dorthin weiterleitet_:
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"` in
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`.

Der zu vermeidende Fehler: „eingebetteten Dienst“ und „Routing-Backend“ als eine
gemeinsame Liste zu behandeln. Das sind sie nicht. Eine `supervised`-Engine
(9router/cliproxy) ist eine **von der nativen Pipeline verwendete
Provider-Verbindung** und kein alternatives Backend für die Relay-Weiterleitung.
Bei `bifrost` verhält es sich umgekehrt — es ist ein Backend für die
Relay-Weiterleitung, das (historisch) ausschließlich `external` war.

## Die Registry — zentrale Quelle der Wahrheit

Das Vertragsmodul `domain/routing/routerBackends.ts` (der Code wird mit
[#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868) integriert) deklariert jede Engine genau einmal,
einschließlich ihres Lebenszyklus, ihrer Fähigkeiten, Dienstidentität, ihres
Standardports, ihrer Health-Konfiguration und ihrer Telemetrieunterstützung.
Verbraucher rufen Engines über `getRouterBackend(id)`, `listRouterBackends()` und
`listRouterBackendsByCapability(cap)` ab, anstatt jeden Sidecar gesondert zu
behandeln.

| Backend     | Lebenszyklus | Dienst (Achse A) | Relay-Backend (Achse B) | Health        | Standardport |
| ----------- | ------------ | ---------------- | ----------------------- | ------------- | ------------ |
| `ts`        | `in-process` | —                | `ts` (nativ)            | —             | —            |
| `bifrost`   | `external`¹  | —¹               | `bifrost` / `auto`      | `/health`     | —            |
| `cliproxy`  | `supervised` | `cliproxy`       | — (Provider)            | `/v1/models`  | 8317         |
| `9router`   | `supervised` | `9router`        | — (Provider)            | `/api/health` | 20130        |
| `vibeproxy` | `external`   | —                | — (Provider-Adapter)    | `/v1/models`  | —            |

¹ Die Hochstufung von Bifrost zu einem `supervised` eingebetteten Dienst (über
`/api/services/bifrost/` installierbar/startbar) wird in
[#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817) nachverfolgt; bis dieser PR integriert ist,
ist Bifrost ausschließlich `external` (nur über `BIFROST_BASE_URL` erreichbar).

`capabilities` (`chat`, `responses`, `streaming`, `tools`, `vision`,
`oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`) ermöglichen
es Aufrufern, danach zu filtern, was eine Engine tatsächlich leisten kann,
anstatt für jede ID fest codierte Verzweigungen zu verwenden.

## Achse A — eingebettete Dienste (Seite der überwachten Prozesse)

- **Registry der überwachten Prozesse:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (derzeit: `9router`, `cliproxy`).
- **Verantwortliche Komponente für den Lebenszyklus:** `src/lib/services/ServiceSupervisor.ts` — `start()` startet den
  Kindprozess, wartet mittels `waitForHealthy()` auf Betriebsbereitschaft und leitet stdout/stderr in einen Ringpuffer;
  `stop()` verwendet SIGTERM→SIGKILL; alles wird unter einer Sperre serialisiert.
- **Zustands-Union** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`, zusätzlich der
  orthogonale `HealthState = healthy | unhealthy | unknown`.
- **Warum ein separater Prozess (statt eines prozessinternen SDKs)?** Die Prozessisolierung ermöglicht es,
  Installation/Start/Stopp/Systemzustand/Protokolle für jeden Sidecar unabhängig zu steuern, und sorgt dafür, dass
  der Loopback-Spawn-Schutz greift. Die Modellierung eines prozessinternen Adapters ist zukünftige Arbeit — das
  Capability-Flag `native-hot-path` ist der Ort, an dem dies ausgedrückt würde.

### Vertrag der Lebenszyklusrouten (`/api/services/<tool>/…`)

Statuscodes sind **absichtlich zustands-/verb-/pfadspezifisch** — dies ist der Vertrag und keine
Inkonsistenz:

| Aufruf                         | Bedingung                                | Status                               |
| ------------------------------ | ---------------------------------------- | ------------------------------------ |
| `POST .../start`               | Dienst `not_installed`                   | **409** (Vorbedingung)               |
| `POST .../stop`                | bereits gestoppt                         | **200** (idempotente Nulloperation)  |
| `GET .../status`               | OK                                       | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`               | Fehler beim Starten des Prozesses        | **503** (vorübergehend)              |
| `GET .../status`, `.../stop`   | nicht abgefangener Fehler                | **500**                              |
| `GET /api/services/<x>/logs`   | unbekanntes Tool `<x>`                   | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`    | `X-Reveal-Confirm: yes` fehlt            | **403** (nur 9router)                |
| **beliebig** `/api/services/*` | Aufrufer nicht aus Loopback/privatem LAN | **403 LOCAL_ONLY**                   |

Alle Fehlerantworten werden durch `createErrorResponse()` geformt →
`{ error: { message, type }, requestId }`, wobei `type` vom Status abgeleitet wird
(`500→server_error`, `404→not_found`, `409→conflict`, andernfalls `invalid_request`) und als
maschinenverarbeitbares Unterscheidungsmerkmal dient. Meldungen werden vorab bereinigt
(`sanitizeErrorMessage()`, Strikte Regel Nr. 12).

**Der Loopback-Schutz** ist die häufigste Ursache für einen `403`: `/api/services/` befindet sich in
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`) und
`src/server/authz/policies/management.ts` weist jeden Aufrufer außerhalb von Loopback bzw. privatem LAN
**vor der Authentifizierung** zurück, da diese Routen Kindprozesse starten (Strikte Regeln 15
und 17). Der Zugriff über einen öffentlichen Tunnel führt absichtlich zu `403`.

## Achse B — Relay-Routing-Backend (Dispatch-Seite)

Nur der Relay-Proxy-Pfad `/api/v1/relay/chat/completions` wählt ein Dispatch-
Backend aus; die Hauptschnittstelle `/api/v1/chat/completions` bezieht
`routingBackend.ts` niemals ein.

- **Auswahl** (`resolveRelayRoutingBackend`): ein einzelner globaler Umschalter per Umgebungsvariable —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  Falls nicht gesetzt: `auto`, wenn Bifrost konfiguriert und aktiviert ist, andernfalls `ts`.
- **Verhalten:**
  - `bifrost` (erzwungen): Bifrost-Fehler → harter `502`, kein Fallback.
  - `auto`: Bifrost versuchen; bei Fehler/Abklingzeit stillschweigend auf die native Implementierung zurückfallen.
  - `ts` / nach einem Fallback: die native `open-sse`-Übersetzer-/Executor-Pipeline.
- **Abklingzeit:** Fehler-Abklingzeit pro `baseUrl` in `bifrostCooldown.ts`.

Die Auswahl erfolgt derzeit **auf Relay-Ebene nach dem Alles-oder-nichts-Prinzip** — in `release/v3.8.43` gibt es
keinen Engine-Wechsel pro Anbieter oder Anfrage. Die anfragebezogene Schranke wird derzeit
durch die Sidecar-Manifest-Arbeiten hinzugefügt
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) Manifest +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`),
wodurch `auto` nur noch laut Manifest geeignete Anbieter über Bifrost routen kann.

## Dashboard-Integration

Das Dienste-Dashboard fragt alle 5 Sekunden `GET /api/services/<tool>/status` über
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts` ab und
gibt `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }` zurück. Es gibt keinen gemeinsamen
Verfügbarkeitskontext-Provider – jede Komponente ruft den Hook für jedes Tool auf.
Bei `!res.ok` zeigt der Hook derzeit lediglich `HTTP <status>` an; die Zuordnung des
Feldes `error.type` zu einer verständlichen Erklärung ist eine erfasste
UX-Verbesserung und keine Vertragsänderung.

## Konsequenzen

- Neue Engines werden einmalig in `ROUTER_BACKENDS` registriert; Verbraucher erhalten
  sie über Funktionsabfragen, ohne neue ID-spezifische Verzweigungen.
- „Ist dies ein Dienst oder ein Routing-Backend?“ wird durch das Feld `lifecycle`
  beantwortet und nicht dadurch, in welcher Liste eine ID zufällig erscheint.
- Die Bifrost-Überwachung (#5817) und die native Hot-Path-Migration (#5670) bauen auf
  diesem gemeinsamen Vertrag auf, anstatt jeden Sidecar gesondert zu behandeln.
