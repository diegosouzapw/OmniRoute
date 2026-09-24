# Monitoring & Observability Guide (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/MONITORING_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/MONITORING_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/MONITORING_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/MONITORING_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/MONITORING_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/MONITORING_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/MONITORING_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/MONITORING_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/MONITORING_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/MONITORING_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/MONITORING_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/MONITORING_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/MONITORING_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/MONITORING_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/MONITORING_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/MONITORING_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/MONITORING_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/MONITORING_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/MONITORING_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/MONITORING_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/MONITORING_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/MONITORING_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/MONITORING_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/MONITORING_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/MONITORING_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/MONITORING_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/MONITORING_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/MONITORING_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/MONITORING_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/MONITORING_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/MONITORING_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/MONITORING_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/MONITORING_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/MONITORING_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/MONITORING_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/MONITORING_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/MONITORING_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/MONITORING_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/MONITORING_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/MONITORING_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/MONITORING_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/MONITORING_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/MONITORING_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/MONITORING_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/MONITORING_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/MONITORING_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/MONITORING_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/MONITORING_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/MONITORING_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/MONITORING_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/MONITORING_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/MONITORING_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/MONITORING_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/MONITORING_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/MONITORING_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/MONITORING_GUIDE.md)

---

> **TL;DR**: OmniRoute wird mit integrierter Zustandsüberwachung, Provider-Autopilot, Kontingentverfolgung und Observability-Hooks ausgeliefert. Dieser Leitfaden behandelt das Dashboard, Warnmeldungen und die Fehlerbehebung.

**Quellen:**

- `src/lib/monitoring/observability.ts` — Observability-Momentaufnahme
- `src/lib/monitoring/comboHealthAutopilot.ts` — Autopilot für den Combo-Zustand
- `src/lib/monitoring/providerHealthAutopilot.ts` — Provider-Autopilot
- `src/lib/monitoring/providerHealthMatrix.ts` — Provider-Zustandsmatrix
- `src/lib/localHealthCheck.ts` — lokale Zustandsprüfung
- `src/lib/tokenHealthCheck.ts` — Zustand der Token-Aktualisierung
- `src/lib/proxyHealth.ts` — Proxy-Zustands-Cache (behandelt in PROXY_GUIDE.md)

---

## Übersicht

OmniRoute verfügt über **3 Überwachungsebenen**:

```
┌──────────────────────────────────────────────────────────────┐
│  Ebene 1: Systemzustand (Serverebene)                         │
│  ├─ localHealthCheck.ts — DB, Ports, native Abhängigkeiten    │
│  ├─ db/healthCheck.ts — Integrität, FK, verwaiste Artefakte   │
│  └─ Dashboard: /dashboard/health                              │
├──────────────────────────────────────────────────────────────┤
│  Ebene 2: Provider-Zustand (Resilienz pro Provider)           │
│  ├─ providerHealthAutopilot.ts — Circuit Breaker, Cooldowns   │
│  ├─ providerHealthMatrix.ts — Zustandswerte nach Provider/Modell │
│  └─ Dashboard: /dashboard/providers                           │
├──────────────────────────────────────────────────────────────┤
│  Ebene 3: Live-Observability (Laufzeit-Momentaufnahmen)        │
│  ├─ observability.ts — Circuit Breaker, Sitzungen, Kontingent │
│  ├─ tokenHealthCheck.ts — Zustand der OAuth-Token-Aktualisierung │
│  └─ MCP-Tools: omniroute_get_health, omniroute_get_session_snapshot │
└──────────────────────────────────────────────────────────────┘
```

---

## Dashboard-Seiten

### `/dashboard/health` (Systemzustand)

Das übergeordnete Zustands-Dashboard zeigt:

| Abschnitt              | Angezeigte Informationen                                       |
| ---------------------- | -------------------------------------------------------------- |
| **Serverstatus**       | Betriebszeit, Version, Port, aktive Verbindungen               |
| **Datenbank**          | Verbindung, Integrität, WAL-Größe, kürzliche Migrationen       |
| **Provider-Übersicht** | Anzahl aktiver und fehlerfreier Provider sowie offener Breaker |
| **Kontingentmonitore** | Aktive Sitzungen, Warnstatus, ausgeschöpfte Kontingente        |
| **Kürzliche Fehler**   | Letzte 10 Fehler mit Stacktraces                               |
| **Ressourcennutzung**  | Arbeitsspeicher, CPU, Indikator für Heap-Auslastung            |

### `/dashboard/providers` (Provider-Zustand)

Dashboard pro Provider:

| Spalte       | Beschreibung                                                |
| ------------ | ----------------------------------------------------------- |
| Provider     | Provider-ID und Anzeigename                                 |
| Zustand      | Grüner/gelber/roter Status                                  |
| Schaltkreis  | Zustand „offen“, „geschlossen“ oder „halboffen“             |
| Verbindungen | Anzahl der Verbindungen, letzte Aktualisierung              |
| Modelle      | Verfügbare Modelle, Zustand pro Modell                      |
| Kosten       | Heutige Kosten, 7-Tage-Trend                                |
| Fehler       | Fehleranzahl der letzten 24 Stunden, häufigste Fehlerklasse |

Klicken Sie auf einen Provider, um Folgendes anzuzeigen:

- Kürzliche Anfragen mit Latenzaufschlüsselung
- Zustandswerte pro Verbindung
- Sperren pro Modell
- Autopilot-Empfehlungen

### `/dashboard/quota` (Kontingentverfolgung)

Für jeden API-Schlüssel:

- Aktuelle Nutzung im Vergleich zum Limit (Fortschrittsbalken)
- Kontingenttrend (30-Tage-Diagramm)
- Zeitpunkt der nächsten Zurücksetzung
- Warnungsverlauf

### `/dashboard/combos` (Combo-Zustand)

Pro Combo:

- Strategie und Ziele
- Zustand pro Ziel
- Kürzliche Fallback-Ereignisse
- Erfolgsquote (24 Std., 7 Tage, 30 Tage)

---

## Health-Check-API

OmniRoute stellt **zwei** HTTP-Endpunkte für Zustandsprüfungen bereit. Für Orchestratoren sind sie nicht austauschbar.

| Pfad                         | Zweck                                                                          | Aufwand                                      | Verwendung für                                                               |
| ---------------------------- | ------------------------------------------------------------------------------ | -------------------------------------------- | ---------------------------------------------------------------------------- |
| `GET /healthz`               | Verfügbarkeit/Bereitschaft im Lebenszyklus (`ok` / `starting` / `stopping`)    | Minimal (nur Phasen-Flag)                    | Kubernetes-**Readiness**; einfache **Liveness**, falls HTTP erforderlich ist |
| `GET /api/monitoring/health` | Detaillierte System- und Provider-Zusammenfassung (DB, Heap, Kataloganzahl, …) | Hoch (synchrone DB-/Monitoring-Verarbeitung) | Dashboards, detaillierte Blackbox-Prüfungen, integrierter Docker-Healthcheck |

> **Hinweis:** Provider-Zustandsmatrizen, Autopilot-Probleme, Kontingentüberwachung, Token-Zustand und Latenzdetails, die über `/api/monitoring/health` hinausgehen, sind über das **MCP-Tool** `observability_snapshot` oder die **Dashboard-Seiten** verfügbar – dafür gibt es keine dedizierten REST-Routen.

Beide Routen werden in derselben **Node-Ereignisschleife** wie die Anfrageverarbeitung ausgeführt. Ein CPU-intensiver Pfad (umfangreiche Katalogverarbeitung für `GET /v1/models`, Komprimierung langer Kontexte / Token-Zählung) kann **alle** HTTP-Handler verzögern, einschließlich `/healthz`. Eine ausgelastete Ereignisschleife ≠ ein abgestürzter Prozess. Beheben Sie vorzugsweise den Ressourcenfresser; die Anpassung von Probes reduziert lediglich fälschliche Beendigungen.

### Leichtgewichtige Orchestrator-Probe

```bash
GET /healthz
# oder HEAD /healthz
```

- **200** + Antworttext `ok`, wenn die Lebenszyklusphase des Servers bereit ist
- **503** + `starting` / `stopping` während des Starts oder Herunterfahrens
- Implementierung: `src/app/healthz/route.ts` (kein DB-Ping)

### Systemzustand (detailliert)

```bash
GET /api/monitoring/health
```

Antwort:

```json
{
  "status": "healthy",
  "version": "3.8.16",
  "uptime": 123456,
  "checks": {
    "database": { "status": "pass", "latency_ms": 2 },
    "writeable": { "status": "pass" },
    "integrity": { "status": "pass", "result": "ok" },
    "foreign_keys": { "status": "pass", "violations": 0 },
    "heap_pressure": { "status": "pass", "usage_mb": 142, "threshold_mb": 512 },
    "active_sessions": 12,
    "providers": {
      "total": 7,
      "healthy": 6,
      "degraded": 1,
      "down": 0
    }
  }
}
```

#### `credentialHealth`: Probe-Cache gegenüber SQLite-`test_status`

`GET /api/monitoring/health` → `credentialHealth` ist die **In-Memory-Anzeige des Probe-Caches**
und kein Live-Dump von `provider_connections.test_status`. Seit #12532 liest der
Anfragepfad ausschließlich `getCachedCredentialHealthSummary()`; Hintergrund-Probes
aktualisieren den Cache außerhalb der Ereignisschleife.

| Ebene                                    | Ort                                                                   | Bedeutung                                                                                                                                                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Probe-Cache-Anzeige                      | `credentialHealth.total` / `healthy` / `failed` / `unknown` / `stale` | Die letzten Ergebnisse der Anmeldedaten-Zustandsprüfung, die sich noch im Prozessspeicher befinden. `source` ist immer `probe-cache`.                                                                                         |
| Details zu fehlgeschlagenen Verbindungen | `credentialHealth.failedConnections`                                  | Nur vorhanden, **wenn `failed > 0`**. Begrenzte Liste von Cache-Zeilen mit `status=error` (`connectionId`, `status`, bereinigtes `lastError` / `lastErrorType`). `failedOmitted` wird gesetzt, wenn die Liste begrenzt wurde. |
| Persistenter SQLite-Status               | `credentialHealth.staleDbNonOkCount`                                  | Anzahl **aktiver** (`is_active=1`) Verbindungszeilen, deren persistierter `test_status` einen bekannten Nicht-OK-Wert aufweist (`error`, `expired`, `credits_exhausted`, `banned`, `deactivated`, `unavailable`).             |

Die beiden Ebenen können absichtlich voneinander abweichen:

- Anzeige `failed=0`, während `staleDbNonOkCount>0` – SQLite enthält weiterhin einen persistenten
  `test_status` (beispielsweise `expired` oder `credits_exhausted`), den der aktuelle
  Probe-Cache-Snapshot nicht als `status=error` zählt.
- Anzeige `failed>0`, während SQLite einen fehlerfreien Zustand zeigt – eine kürzlich ausgeführte Probe ist fehlgeschlagen und wurde
  zwischengespeichert; die DB-Zeile wurde noch nicht aktualisiert oder später zurückgesetzt.

Lösen Sie beim Abrufen dieses Endpunkts keine Warnung ausschließlich aufgrund von
`provider_connections.test_status` aus. Verwenden Sie `failed` + `failedConnections` für aktuelle Probe-Fehler und
`staleDbNonOkCount`, wenn Sie die Anzahl persistenter Statuswerte benötigen.

### Empfehlungen für Kubernetes-Probes

OmniRoute ist ein **einzelner Node-Prozess** (eine Ereignisschleife). Der standardmäßige Docker-`HEALTHCHECK` verwendet den leichtgewichtigen Endpunkt `/healthz`. `/api/monitoring/health` ist für Liveness-Intervalle des kubelet **zu aufwendig**.

| Prüfung                            | Empfohlenes Ziel                                                                    | Hinweise                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Start**                          | HTTP `GET /healthz` mit einem langen `failureThreshold` (oder großen `startPeriod`) | Kaltstart und SQLite-Migration können länger als einige Sekunden dauern                                                                                                                                                                                                                                                                                                                                                                                                       |
| **Bereitschaft**                   | HTTP `GET /healthz`                                                                 | Lebenszyklus `ok` / `starting` / `stopping` (200 vs. 503). Schwankt weiterhin, wenn die Schleife durch CPU-Last blockiert ist. Eine Antwort mit **200 nach mehreren Sekunden ist nicht gesund** (#10303) — sie bedeutet, dass die Ereignisschleife bereits ausgelastet war, bevor der 3-Byte-Handler ausgeführt wurde                                                                                                                                                         |
| **Lebendigkeit**                   | HTTP `GET /livez` **oder TCP** am Hauptdienst-Port (`PORT`, Standardwert `20128`)   | `/livez` prüft nur, ob der Prozess aktiv ist (immer 200, wenn der Handler ausgeführt wird). Der Endpunkt nutzt weiterhin dieselbe Ereignisschleife — beschäftigt ≠ tot, und er erkennt eine Überlastung der Ereignisschleife (#10303) nicht besser als TCP. Bevorzugen Sie **TCP**, wenn HTTP-Prüfungen unter Katalog-/Komprimierungslast Zeitüberschreitungen verursachen; beenden Sie den Pod in beiden Fällen **nicht** aufgrund kurzer Blockierungen der Ereignisschleife |
| **Tiefgehende Integritätsprüfung** | `GET /api/monitoring/health` von einem externen Prüfdienst                          | Nicht für die kubelet-`livenessProbe` oder eine eng getaktete `readinessProbe` geeignet                                                                                                                                                                                                                                                                                                                                                                                       |

Beispielkonfiguration (passen Sie die Schwellenwerte an Ihre Kaltstart- und Komprimierungslast an):

```yaml
ports:
  - name: http
    containerPort: 20128
startupProbe:
  httpGet:
    path: /healthz
    port: http
  failureThreshold: 30
  periodSeconds: 5
readinessProbe:
  httpGet:
    path: /healthz
    port: http
  periodSeconds: 5
  timeoutSeconds: 2
  failureThreshold: 6
livenessProbe:
  httpGet:
    path: /livez
    port: http
  periodSeconds: 10
  timeoutSeconds: 3
  failureThreshold: 6
  # Bei einer Blockierung der Ereignisschleife kann auch für HTTP /livez
  # eine Zeitüberschreitung auftreten. TCP ist die konservative Alternative:
  # tcpSocket:
  #   port: http
```

Richten Sie die kubelet-**Lebendigkeitsprüfung nicht** auf `/api/monitoring/health`. Dieser Pfad führt tatsächliche Datenbank-/Überwachungsarbeit aus und erzeugt unter Last falsch positive Ergebnisse.

Siehe auch: [#10052](https://github.com/diegosouzapw/OmniRoute/issues/10052) (Prüfungen, während die Ereignisschleife beschäftigt ist), [#9685](https://github.com/diegosouzapw/OmniRoute/issues/9685) / [#10055](https://github.com/diegosouzapw/OmniRoute/pull/10055) (Katalogpreisberechnung beansprucht zu viele Ressourcen), [#10117](https://github.com/diegosouzapw/OmniRoute/issues/10117) (Tokenzählung für die Komprimierung beansprucht zu viele Ressourcen).

### Optionale Verarbeitung im Anfragepfad (Speicher, Skills, Token-Aktualisierung)

Speicherextraktion, Skills-Injektion und OAuth-Token-Aktualisierung nutzen gemeinsam mit `/healthz` die **Node-Hauptereignisschleife**. Es handelt sich um über das Dashboard umschaltbare Funktionen (`memoryEnabled`, `skillsEnabled`), nicht um einen Worker-Pool. Siehe [Umgebung — Kosten für die Ereignisschleife durch Speicher, Skills und Token-Aktualisierung](../reference/ENVIRONMENT.md#event-loop-cost-of-memory-skills-and-token-refresh-10349).

### Anbieterintegrität

> **Kein REST-Endpunkt.** Daten zur Anbieterintegrität sind über das MCP-Tool `observability_snapshot` oder die Dashboard-Seite `/dashboard/providers` verfügbar.

### Anbieterdetails

> **Kein REST-Endpunkt.** Details zu einzelnen Anbietern sind über die Dashboard-Seite `/dashboard/providers` verfügbar.

---

## Provider-Zustandsautopilot

Das Modul `providerHealthAutopilot.ts` ist ein **selbstheilendes System**, das:

1. Provider-Probleme erkennt (offene Leistungsschalter, Abklingzeiten, Sperren, Kontingentwarnungen)
2. **Empfohlene Aktionen** zu deren Behebung generiert
3. Optional Aktionen mit geringem Risiko **automatisch ausführt**

### Erkannte Problemtypen

| Problemtyp                   | Schweregrad | Beispielbedingung                                        |
| ---------------------------- | ----------- | -------------------------------------------------------- |
| `provider_circuit_open`      | kritisch    | Leistungsschalter nach 5 Fehlern geöffnet                |
| `provider_circuit_half_open` | Warnung     | Leistungsschalter testet die Wiederherstellung           |
| `connection_cooldown`        | Warnung     | Verbindung nach 429 in Abklingphase                      |
| `stale_connection_error`     | Warnung     | Letzte Aktualisierung vor über 30 Minuten fehlgeschlagen |
| `terminal_connection_error`  | kritisch    | OAuth widerrufen, Schlüssel ungültig                     |
| `inactive_connection`        | Information | Verbindung in den Einstellungen deaktiviert              |
| `model_lockout`              | Warnung     | Bestimmtes Modell in Quarantäne                          |
| `quota_monitor_warning`      | Warnung     | Kontingent zu mindestens 80 % genutzt                    |

### Generierte Aktionstypen

| Aktion                         | Risiko | Beschreibung                                     |
| ------------------------------ | ------ | ------------------------------------------------ |
| `clear_provider_breaker`       | mittel | Leistungsschalter auf „geschlossen“ zurücksetzen |
| `clear_connection_cooldown`    | gering | Abklingphase einer Verbindung entfernen          |
| `clear_stale_connection_error` | gering | Veraltete Fehlermarkierung löschen               |
| `clear_model_lockout`          | gering | Modell in Quarantäne wieder aktivieren           |
| `reactivate_connection`        | mittel | Deaktivierte Verbindung wieder aktivieren        |
| `deactivate_connection`        | hoch   | Problematische Verbindung deaktivieren           |

### API

> **Kein REST-Endpunkt.** Autopilot-Probleme sind über das MCP-Tool `observability_snapshot` oder das Dashboard verfügbar. Der Autopilot wird intern ausgeführt; sein Verhalten wird über die Einstellungsdatenbank (das verbindungsspezifische Feld `autopilotMode`) und nicht über Umgebungsvariablen konfiguriert — `grep -rn` liefert für eine Umgebungsvariable des Autopilot-Modus keine Treffer.

### Autopilot-Modus

Der Autopilot arbeitet standardmäßig im **manuellen Modus** — er erkennt Probleme und generiert empfohlene Aktionen, wendet diese jedoch nicht automatisch an. Aktionen können über das Dashboard angewendet werden.

---

## Combo-Zustandsautopilot

`comboHealthAutopilot.ts` ist das **Combo-spezifische** Gegenstück zum Provider-Autopiloten. Er:

- Erkennt fehlerhafte Combos
- Empfiehlt eine Neuanordnung der Ziele
- Schlägt die Deaktivierung defekter Ziele vor
- Entfernt nicht mehr funktionsfähige Ziele nach N Fehlern automatisch

### Beispiele für Combo-Probleme

```
Combo "always-on" (Prioritätsstrategie)
├─ Ziel 1: openai/gpt-5 (fehlerfrei)
├─ Ziel 2: anthropic/claude-opus-4-6 (⚠️ Modellsperre bis 14:00 Uhr)
└─ Ziel 3: kiro/claude-sonnet-4-5 (fehlerfrei)

Empfohlene Aktion: Neu anordnen — kiro vor anthropic verschieben, bis die Sperre abläuft
```

---

## Kontingentüberwachung

`observability.ts` stellt **sitzungsspezifische Kontingentüberwachungen** für Abonnement-Provider (Claude Code, Codex, GitHub Copilot) bereit:

```ts
interface QuotaMonitorSnapshot {
  sessionId: string;
  provider: string;
  accountId: string;
  status: "starting" | "idle" | "healthy" | "warning" | "exhausted" | "error";
  lastQuotaPercent: number | null; // 0-100
  lastQuotaUsed: number | null;
  lastQuotaTotal: number | null;
  lastResetAt: string | null;
  nextPollAt: string | null;
  totalPolls: number;
  totalAlerts: number;
  consecutiveFailures: number;
}
```

### Bedeutung der Statuswerte

| Status      | Wann                                   | UI-Aktion                                      |
| ----------- | -------------------------------------- | ---------------------------------------------- |
| `starting`  | Erste Abfrage läuft                    | Ladeindikator                                  |
| `idle`      | Keine kürzliche Aktivität              | Im Dashboard ausgeblendet                      |
| `healthy`   | Mehr als 50 % Kontingent verbleiben    | Grüner Punkt                                   |
| `warning`   | Weniger als 50 % Kontingent verbleiben | Gelbe Warnung                                  |
| `exhausted` | Kontingent = 0 %                       | Roter Block, an nächsten Provider weiterleiten |
| `error`     | Abfrage fehlgeschlagen                 | Roter Punkt, bald erneut versuchen             |

### API

> **Kein REST-Endpunkt.** Daten der Kontingentüberwachung sind über das MCP-Tool `observability_snapshot` oder das Dashboard verfügbar.

---

## Observability-Snapshot

Das MCP-Tool `observability_snapshot` gibt einen **vollständigen System-Snapshot** für KI-Agenten zurück:

```json
{
  "circuitBreakers": [
    {
      "name": "openai",
      "state": "closed",
      "failureCount": 0,
      "lastFailureTime": null,
      "retryAfterMs": null
    }
  ],
  "sessions": [
    {
      "sessionId": "sess-123",
      "createdAt": 1234567890,
      "lastActive": 1234567999,
      "requestCount": 42,
      "connectionId": "conn-456",
      "ageMs": 109
    }
  ],
  "quotaMonitors": {/* siehe oben */},
  "uptime": 12345,
  "version": "3.8.16"
}
```

Agenten verwenden diesen Snapshot, um **Routing-Entscheidungen** zu treffen – beispielsweise: „Wenn der Schaltkreis von openai offen ist, leite die Anfrage zuerst an anthropic weiter.“

---

## Token-Zustandsprüfung

OAuth-Anbieter (Claude Code, GitHub Copilot, Cursor) benötigen eine **regelmäßige Token-Aktualisierung**. `src/lib/tokenHealthCheck.ts` führt einen Hintergrund-Scheduler aus:

- **Prüfzyklus**: alle 60 Sekunden (Prüfung in `TICK_MS = 60 * 1000` unter `src/lib/tokenHealthCheck.ts:30`)
- **Intervall für die Zustandsprüfung pro Verbindung**: standardmäßig 60 Minuten (`DEFAULT_HEALTH_CHECK_INTERVAL_MIN = 60`); über die Einstellungsdatenbank konfigurierbar
- **Präventive Aktualisierung bei 401**: wird vom verbindungsspezifischen Interceptor durchgeführt

### Token-Zustandsstatus

```ts
interface TokenHealth {
  connectionId: string;
  provider: string;
  status: "valid" | "expiring_soon" | "expired" | "refresh_failed";
  expiresAt: string;
  lastRefresh: string;
  nextRefresh: string;
  consecutiveFailures: number;
}
```

### Konfiguration

Die Konfiguration der Token-Zustandsprüfung wird intern von `tokenHealthCheck.ts` verwaltet.

### Token-Zustand

> **Kein REST-Endpunkt.** Token-Zustandsdaten sind über das Dashboard oder das MCP-Tool `observability_snapshot` verfügbar.

---

## Benachrichtigungen

### Integrierte Kanäle

OmniRoute unterstützt **3 Benachrichtigungskanäle**:

| Kanal            | Einrichtung       | Anwendungsfall                       |
| ---------------- | ----------------- | ------------------------------------ |
| Dashboard-Banner | Immer aktiviert   | Anwendungsinterne Benachrichtigungen |
| Webhook          | URL konfigurieren | Slack, Discord, PagerDuty            |
| Protokoll        | Standard          | Für die externe Protokollaggregation |

### Webhook-Konfiguration

> **Hinweis:** Die Konfiguration von Webhook-Benachrichtigungen erfolgt über die Seite „Einstellungen“ im Dashboard. Informationen zu Webhook-URL, Ereignisfilterung und Nutzdatenanpassung finden Sie in der Benutzeroberfläche für Einstellungen.

### Benachrichtigungstypen

| Benachrichtigung             | Zeitpunkt                                                    | Standardschweregrad |
| ---------------------------- | ------------------------------------------------------------ | ------------------- |
| `provider_circuit_open`      | Schaltkreis wird geöffnet                                    | kritisch            |
| `provider_circuit_half_open` | Schaltkreis testet die Wiederherstellung                     | Information         |
| `quota_warning`              | Kontingent zu mindestens 80 % ausgeschöpft                   | Warnung             |
| `quota_exhausted`            | Kontingent zu 100 % ausgeschöpft                             | kritisch            |
| `token_refresh_failed`       | Mindestens 3 aufeinanderfolgende Aktualisierungsfehler       | Warnung             |
| `token_expired`              | Token hat sein Ablaufdatum überschritten                     | kritisch            |
| `combo_target_unhealthy`     | Kombinationsziel seit mindestens 1 Stunde in der Abkühlphase | Warnung             |
| `db_integrity_warning`       | FK-Verstöße > 0                                              | Warnung             |
| `heap_pressure`              | Heap-Nutzung > 80 % des Schwellenwerts                       | Warnung             |

---

## Performance-Metriken

### Erfasste Metriken

| Metrik                  | Typ        | Quelle                          |
| ----------------------- | ---------- | ------------------------------- |
| `request_count`         | Zähler     | `services/usage.ts`             |
| `request_latency_ms`    | Histogramm | `services/usage.ts`             |
| `tokens_consumed`       | Zähler     | `services/usage.ts`             |
| `cost_usd`              | Zähler     | `services/usage.ts`             |
| `provider_errors`       | Zähler     | `services/errorClassifier.ts`   |
| `circuit_state_changes` | Zähler     | `services/resilience.ts`        |
| `cache_hits`            | Zähler     | `services/signatureCache.ts`    |
| `compression_savings`   | Histogramm | `services/compression/stats.ts` |
| `quota_used`            | Messwert   | `services/quotaMonitor.ts`      |
| `memory_used_mb`        | Messwert   | `observability.ts`              |

### Latenzperzentile (p50/p95/p99)

> **Kein REST-Endpunkt.** Daten zu Latenzperzentilen sind über die Dashboard-Seite `/dashboard/health` verfügbar. Der Export für Prometheus/OpenTelemetry ist für v3.9 geplant.

### Prometheus-/OpenTelemetry-Export (Phase 2)

Für v3.9 geplant: nativer Export nach Prometheus, OpenTelemetry und Datadog.

Rufen Sie vorerst `/api/monitoring/health` mit einem beliebigen HTTP-basierten Überwachungssystem ab (Prometheus Blackbox Exporter, Datadog HTTP Check usw.).

---

## Rezepte für Alarmierungen

### Slack

> **Hinweis:** Webhook-Alarmierungen werden über die Einstellungsseite des Dashboards konfiguriert — es gibt keine dedizierten Webhook-Umgebungsvariablen (`grep -rn` liefert keine Treffer). Informationen zur Webhook-URL, Ereignisfilterung und Anpassung der Nutzdaten finden Sie in der Einstellungsoberfläche.

### Discord

> Webhook-Alarmierungen verwenden denselben Ablauf in der Einstellungsoberfläche wie Slack. Discord akzeptiert dieselbe JSON-Nutzdatenstruktur.

### PagerDuty

> Webhook-Alarmierungen verwenden denselben Ablauf in der Einstellungsoberfläche. Routing-Schlüssel für die PagerDuty Events API v2 werden in der Einstellungsoberfläche konfiguriert.

### Benutzerdefinierter Webhook (JSON)

> Jeder HTTP-Endpunkt, der POST-Anfragen mit einem JSON-Anfragetext akzeptiert, funktioniert. Konfigurieren Sie die URL in der Einstellungsoberfläche.

---

## Dashboard-Konfiguration

### Status-Dashboard anpassen

Erstellen Sie eine Datei unter `~/.omniroute/dashboard.json`:

```json
{
  "health": {
    "sections": ["server_status", "database", "providers", "quota_monitors", "recent_errors"],
    "refresh_interval_ms": 5000
  }
}
```

### Einen Anbieter oben anheften

```json
{
  "health": {
    "pinned_providers": ["openai", "anthropic"]
  }
}
```

---

## Fehlerbehebung

### „Anbieter wird als fehlerfrei angezeigt, aber Anfragen schlagen fehl“

1. Prüfen Sie die **Autopilot-Probleme** — möglicherweise ist ein Modell gesperrt
2. Sehen Sie unter **Letzte Fehler** nach der spezifischen Fehlerklasse
3. Führen Sie den **Verbindungstest** auf der Anbieterkarte aus
4. Prüfen Sie, ob der Anbieter **upstream ratenbegrenzt** ist (lokal nicht sichtbar)

### „Kontingent wird als unproblematisch angezeigt, aber ich erhalte 429-Fehler“

- 429 bedeutet, dass Sie laut Anbieter Ihr Kontingent aufgebraucht haben
- Die Kontingentverfolgung von OmniRoute kann **veraltet** sein — maßgeblich sind die Upstream-Daten des Anbieters
- Kontingentdaten werden automatisch über den internen Kontingentmonitor aktualisiert

### „Kombination schlägt fehl, aber alle Ziele werden als fehlerfrei angezeigt“

- Prüfen Sie das Dashboard für den **Kombinationsstatus** auf Probleme mit der Zielreihenfolge
- Sehen Sie sich **Fallback-Ereignisse** an — möglicherweise erschöpft die Kombination ihre Optionen zu schnell
- Stellen Sie sicher, dass die **Strategie** zu Ihrem Anwendungsfall passt (Priorität vs. Round-Robin vs. automatisch)

### „Datenbank-Statusprüfung schlägt fehl“

- Führen Sie `sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"` aus
- Falls „ok“ ausgegeben wird — Fehlalarm, die Statusprüfung ist zu streng
- Bei jeder anderen Ausgabe — **stoppen Sie OmniRoute** und befolgen Sie den [Leitfaden zur Notfallwiederherstellung](./DATABASE_GUIDE.md#disaster-recovery)

### „Speicherdruck im Heap ist kritisch“

```bash
# Aktuellen Heap prüfen
node -e "console.log(process.memoryUsage())"

# Manuelle Garbage Collection auslösen (wenn --expose-gc)
node --expose-gc -e "global.gc(); console.log(process.memoryUsage())"

# Anzahl gleichzeitiger Anfragen reduzieren (über die Einstellungsseite des Dashboards festlegen, nicht über eine Umgebungsvariable)
# Es gibt keine Umgebungsvariable `MAX_CONCURRENT_REQUESTS` — konfigurieren Sie dies unter Einstellungen → Gleichzeitigkeit.
```

---

## Siehe auch

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — Nutzungs- und Kostenüberwachung
- [DATABASE_GUIDE.md](./DATABASE_GUIDE.md) — DB-Schema und Systemzustand
- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — Proxy-Systemzustand (separater Cache)
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — Systemarchitektur
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — Details zum Circuit Breaker
- Quelle: `src/lib/monitoring/` (4 Dateien, 2121 Codezeilen)
