# CLAUDE.md (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

Diese Datei bietet Anleitungen für Claude Code (claude.ai/code) beim Arbeiten mit Code in diesem Repository.

## Schnellstart

```bash
npm install                    # Abhängigkeiten installieren (erstellt automatisch .env aus .env.example)
npm run dev                    # Entwicklungsserver unter http://localhost:20128
npm run build                  # Produktionsbuild (Next.js 16 standalone)
npm run lint                   # ESLint (0 Fehler erwartet; Warnungen sind bereits vorhanden)
npm run typecheck:core         # TypeScript-Überprüfung (sollte sauber sein)
npm run typecheck:noimplicit:core  # Strenge Überprüfung (kein implizites any)
npm run test:coverage          # Unit-Tests + Coverage-Gate (75/75/75/70 — Anweisungen/Zeilen/Funktionen/Zweige)
npm run check                  # lint + test kombiniert
npm run check:cycles           # Zirkuläre Abhängigkeiten erkennen
```

### Tests Ausführen

```bash
# Einzelne Testdatei (Node.js nativer Test-Runner — die meisten Tests)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP-Server, autoCombo, Cache)
npm run test:vitest

# Alle Suiten
npm run test:all
```

Für die vollständige Testmatrix siehe `CONTRIBUTING.md` → "Tests Ausführen". Für die tiefere Architektur siehe `AGENTS.md`.

---

## Projekt auf einen Blick

**OmniRoute** — einheitlicher KI-Proxy/Router. Ein Endpunkt, 160+ LLM-Anbieter, automatischer Fallback.

| Schicht        | Standort                | Zweck                                                                            |
| -------------- | ----------------------- | -------------------------------------------------------------------------------- |
| API-Routen     | `src/app/api/v1/`       | Next.js App Router — Einstiegspunkte                                             |
| Handler        | `open-sse/handlers/`    | Anfrageverarbeitung (Chat, Embeddings usw.)                                      |
| Executor       | `open-sse/executors/`   | Anbieter-spezifische HTTP-Zustellung                                             |
| Übersetzer     | `open-sse/translator/`  | Formatkonvertierung (OpenAI↔Claude↔Gemini)                                       |
| Transformator  | `open-sse/transformer/` | Antworten API ↔ Chat-Vervollständigungen                                         |
| Dienste        | `open-sse/services/`    | Kombinierte Routen, Ratenlimits, Caching usw.                                    |
| Datenbank      | `src/lib/db/`           | SQLite-Domain-Module (45+ Dateien, 55 Migrationen)                               |
| Domain/Politik | `src/domain/`           | Regel-Engine, Kostenregeln, Fallback-Logik                                       |
| MCP-Server     | `open-sse/mcp-server/`  | 37 Werkzeuge (30 Basis + 3 Speicher + 4 Fähigkeiten), 3 Transporte, ~13 Bereiche |
| A2A-Server     | `src/lib/a2a/`          | JSON-RPC 2.0 Agent-Protokoll                                                     |
| Fähigkeiten    | `src/lib/skills/`       | Erweiterbares Fähigkeitsframework                                                |
| Speicher       | `src/lib/memory/`       | Persistenter konversationeller Speicher                                          |

Monorepo: `src/` (Next.js 16 App), `open-sse/` (Streaming-Engine-Arbeitsbereich), `electron/` (Desktop-App), `tests/`, `bin/` (CLI-Einstiegspunkt).

---

## Anfrage-Pipeline

```
Client → /v1/chat/completions (Next.js Route)
  → CORS → Zod-Validierung → Auth? → Richtlinienprüfung → Schutz vor Eingabeinjektion
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → Cache-Prüfung → Ratenbegrenzung → Kombinationsrouting?
      → resolveComboTargets() → handleSingleModel() pro Ziel
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → erneut versuchen mit Backoff
    → Antwortübersetzung → SSE-Stream oder JSON
    → Wenn Responses API: responsesTransformer.ts TransformStream
```

API-Routen folgen einem konsistenten Muster: `Route → CORS Preflight → Zod Body-Validierung → Optionale Authentifizierung (extractApiKey/isValidApiKey) → Durchsetzung der API-Schlüsselrichtlinie → Handler-Delegation (open-sse)`. Kein globales Next.js-Middleware — die Abfangung ist routenspezifisch.

**Kombinationsrouting** (`open-sse/services/combo.ts`): 14 Strategien (Priorität, gewichtet, zuerst auffüllen, Round-Robin, P2C, zufällig, am wenigsten verwendet, kostenoptimiert, reset-bewusst, strikt-zufällig, auto, lkgp, kontextoptimiert, kontextweiterleitung). Jedes Ziel ruft `handleSingleModel()` auf, das `handleChatCore()` mit fehlerbehandelnden und Schaltkreisprüfungen pro Ziel umschließt. Siehe `docs/routing/AUTO-COMBO.md` für die 9-Faktor Auto-Combo-Bewertung und `docs/architecture/RESILIENCE_GUIDE.md` für die 3 Resilienzschichten.

---

## Resilienz-Laufzeitstatus

OmniRoute hat drei verwandte, aber unterschiedliche Mechanismen für temporäre Fehler. Halten Sie ihren
Bereich beim Debuggen des Routing-Verhaltens getrennt. Siehe das
[3-Schichten-Resilienzdiagramm](./docs/diagrams/exported/resilience-3layers.svg)
(Quelle: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))
für eine Übersichtskarte.

### Anbieter-Schaltkreisunterbrecher

**Bereich**: ganzer Anbieter, z.B. `glm`, `openai`, `anthropic`.

**Zweck**: Stoppen des Datenverkehrs zu einem Anbieter, der wiederholt auf der
Upstream-/Service-Ebene ausfällt, damit ein ungesunder Anbieter nicht jede Anfrage verlangsamt.

**Implementierung**:

- Kernklasse: `src/shared/utils/circuitBreaker.ts`
- Chat-Gate/Ausführungsverkabelung: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- Laufzeitstatus-API: `src/app/api/monitoring/health/route.ts`
- Gemeinsame Wrapper: `open-sse/services/accountFallback.ts`
- Persistierte Status-Tabelle: `domain_circuit_breakers`

**Zustände**:

- `CLOSED`: normaler Datenverkehr ist erlaubt.
- `OPEN`: Anbieter ist vorübergehend blockiert; Anrufer erhalten eine Antwort mit Anbieter-Schaltkreis-offen
  oder das Kombinationsrouting überspringt zu einem anderen Ziel.
- `HALF_OPEN`: Reset-Timeout ist abgelaufen; eine Probeanforderung ist erlaubt. Erfolg schließt den
  Schalter, Misserfolg öffnet ihn erneut.

**Standardeinstellungen** (`open-sse/config/constants.ts`):

- OAuth-Anbieter: Schwellenwert `3`, Reset-Timeout `60s`.
- API-Schlüssel-Anbieter: Schwellenwert `5`, Reset-Timeout `30s`.
- Lokale Anbieter: Schwellenwert `2`, Reset-Timeout `15s`.

Nur Anbieter-spezifische Fehlerstatus sollten den Anbieter-Schalter auslösen:

```ts
(408, 500, 502, 503, 504);
```

Lösen Sie den gesamten Anbieter-Schalter nicht für normale Konto-/Schlüssel-/Modellfehler wie die meisten
`401`, `403` oder `429` Fälle aus. Diese gehören normalerweise zu Verbindungsabkühlung oder Modell
Sperrung. Ein generischer API-Schlüssel-Anbieter `403` sollte wiederherstellbar sein, es sei denn, er wird als
terminaler Anbieter/Konto-Fehler klassifiziert.

Der Schalter verwendet eine verzögerte Wiederherstellung, keinen Hintergrundtimer. Wenn `OPEN` abläuft, werden Lesevorgänge wie `getStatus()`, `canExecute()` und `getRetryAfterMs()` den Status auf
`HALF_OPEN` aktualisieren, sodass Dashboards und Kombinationskandidatenbauer einen
abgelaufenen Anbieter nicht für immer ausschließen.

### Verbindungsabkühlung

**Bereich**: eine Anbieter-Verbindung/Konto/Schlüssel.

**Zweck**: vorübergehend einen schlechten Schlüssel/Konto überspringen, während andere Verbindungen für
den gleichen Anbieter weiterhin Anfragen bedienen.

**Implementierung**:

- Schreib-/Aktualisierungspfad: `src/sse/services/auth.ts::markAccountUnavailable()`
- Kontenauswahl/-filterung: `src/sse/services/auth.ts::getProviderCredentials...`
- Abkühlungsberechnung: `open-sse/services/accountFallback.ts::checkFallbackError()`
- Einstellungen: `src/lib/resilience/settings.ts`

Wichtige Felder bei Anbieter-Verbindungen:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

Während der Kontenauswahl wird eine Verbindung übersprungen, während:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

Abkühlungen sind ebenfalls verzögert: Wenn `rateLimitedUntil` in der Vergangenheit liegt, wird die Verbindung
wieder berechtigt. Bei erfolgreicher Nutzung löscht `clearAccountError()` `testStatus`,
`rateLimitedUntil`, Fehlerfelder und `backoffLevel`.

Standardverhalten der Verbindungsabkühlung:

- OAuth-Basisabkühlung: `5s`.
- API-Schlüssel-Basisabkühlung: `3s`.
- API-Schlüssel `429` sollte bevorzugt Hinweise für erneute Versuche von upstream verwenden (`Retry-After`, Reset-Header oder
  parsebaren Reset-Text), wenn verfügbar.
- Wiederholte wiederherstellbare Fehler verwenden exponentielles Backoff:

```ts
baseCooldownMs * 2 ** failureIndex;
```

Der Anti-Thundering-Herd-Schutz verhindert, dass gleichzeitige Fehler bei derselben Verbindung die
Abkühlung wiederholt verlängern oder `backoffLevel` doppelt erhöhen.

Terminalzustände sind keine Abkühlungen. `banned`, `expired` und `credits_exhausted` sollen
unverfügbar bleiben, bis sich Anmeldeinformationen/Einstellungen ändern oder ein Betreiber sie zurücksetzt.
Überschreiben Sie keine terminalen Zustände mit transienten Abkühlungszuständen.

### Modell-Sperrung

**Bereich**: Anbieter + Verbindung + Modell.

**Zweck**: Vermeiden, dass eine ganze Verbindung deaktiviert wird, wenn nur ein Modell für diese Verbindung
nicht verfügbar oder kontingentbeschränkt ist.

Beispiele:

- Pro-Modell-Kontingent-Anbieter, die `429` zurückgeben.
- Lokale Anbieter, die `404` für ein fehlendes Modell zurückgeben.
- Anbieter-spezifische Modus-/Modellberechtigungsfehler wie ausgewählte Grok-Modi.

Die Modell-Sperrung befindet sich in `open-sse/services/accountFallback.ts` und ermöglicht es der gleichen
Verbindung, weiterhin andere Modelle zu bedienen.

### Debugging-Anleitung

- Wenn alle Schlüssel für einen Anbieter übersprungen werden, überprüfen Sie sowohl den Status des Anbieterschalters als auch `rateLimitedUntil`/`testStatus` jeder Verbindung.
- Wenn ein Anbieter nach dem Reset-Fenster dauerhaft ausgeschlossen erscheint, überprüfen Sie, ob der Code
  den Rohstatus `state` anstelle von `getStatus()`/`canExecute()` liest.
- Wenn ein Anbieter-Schlüssel fehlschlägt, aber andere funktionieren sollten, bevorzugen Sie die Verbindungsabkühlung gegenüber
  dem Anbieter-Schalter.
- Wenn nur ein Modell fehlschlägt, bevorzugen Sie die Modell-Sperrung gegenüber der Verbindungsabkühlung.
- Wenn ein Zustand sich selbst wiederherstellen sollte, sollte er einen zukünftigen Zeitstempel/Reset-Timeout und einen
  Leseweg haben, der abgelaufene Zustände aktualisiert. Permanente Status erfordern manuelle Änderungen an Anmeldeinformationen
  oder Konfiguration.

## Schlüsselkonventionen

### Code-Stil

- **2 Leerzeichen**, Semikolons, doppelte Anführungszeichen, 100 Zeichen Breite, es5 nachgestellte Kommas (durch lint-staged über Prettier durchgesetzt)
- **Imports**: extern → intern (`@/`, `@omniroute/open-sse`) → relativ
- **Benennung**: Dateien=camelCase/kebab, Komponenten=PascalCase, Konstanten=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = Fehler überall; `no-explicit-any` = Warnung in `open-sse/` und `tests/`
- **TypeScript**: `strict: false`, Ziel ES2022, Modul esnext, Auflösung Bundler. Bevorzugen Sie explizite Typen.

### Datenbank

- **Immer** über `src/lib/db/` Domänenmodule gehen — **nie** rohes SQL in Routen oder Handlern schreiben
- **Nie** Logik zu `src/lib/localDb.ts` hinzufügen (nur Re-Export-Schicht)
- **Nie** Barrel-Import von `localDb.ts` — stattdessen spezifische `db/`-Module importieren
- DB-Singleton: `getDbInstance()` aus `src/lib/db/core.ts` (WAL-Journaling)
- Migrationen: `src/lib/db/migrations/` — versionierte SQL-Dateien, idempotent, in Transaktionen ausführen

### Fehlerbehandlung

- try/catch mit spezifischen Fehlertypen, protokollieren mit pino-Kontext
- Nie Fehler in SSE-Streams unterdrücken — verwenden Sie Abbruchsignale zur Bereinigung
- Geben Sie die richtigen HTTP-Statuscodes zurück (4xx/5xx)

### Sicherheit

- **Nie** `eval()`, `new Function()`, oder implizites eval verwenden
- Validieren Sie alle Eingaben mit Zod-Schemas
- Verschlüsseln Sie Anmeldeinformationen im Ruhezustand (AES-256-GCM)
- Upstream-Header-Denylist: `src/shared/constants/upstreamHeaders.ts` — halten Sie Sanitär-, Zod-Schemas und Unit-Tests beim Bearbeiten synchron
- **Öffentliche Upstream-Anmeldeinformationen** (Gemini/Antigravity/Windsurf-Stil OAuth client_id/secret + Firebase Web-Schlüssel, die aus öffentlichen CLIs extrahiert wurden): **MÜSSEN** über `resolvePublicCred()` aus `open-sse/utils/publicCreds.ts` eingebettet werden — **nie** als String-Literale. Siehe `docs/security/PUBLIC_CREDS.md` für das obligatorische Muster.
- **Fehlerantworten** (HTTP / SSE / Executor / MCP-Handler): **MÜSSEN** über `buildErrorBody()` oder `sanitizeErrorMessage()` aus `open-sse/utils/error.ts` geleitet werden — **nie** rohes `err.stack` oder `err.message` in einem Antwortkörper einfügen. Siehe `docs/security/ERROR_SANITIZATION.md`.
- **Shell-Befehle, die aus Variablen erstellt werden**: beim Aufrufen von `exec()`/`spawn()` mit einem Skript, das Laufzeitwerte benötigt, übergeben Sie diese über die `env`-Option (automatisch shell-escaped) — **nie** untrusted/externe Pfade in den Skriptkörper interpolieren. Referenz: `src/mitm/cert/install.ts::updateNssDatabases`.
- **Sichere Standardbibliotheken** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): Bevorzugen Sie Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink gegenüber benutzerdefinierten Implementierungen, wenn Sie neue sicherheitskritische Oberflächen hinzufügen.

---

## Häufige Änderungszenarien

### Hinzufügen eines neuen Anbieters

1. Registrieren Sie sich in `src/shared/constants/providers.ts` (Zod-validiert beim Laden)
2. Fügen Sie einen Executor in `open-sse/executors/` hinzu, wenn benutzerdefinierte Logik benötigt wird (erweitern Sie `BaseExecutor`)
3. Fügen Sie einen Übersetzer in `open-sse/translator/` hinzu, wenn es sich um ein nicht-OpenAI-Format handelt
4. Fügen Sie die OAuth-Konfiguration in `src/lib/oauth/constants/oauth.ts` hinzu, wenn OAuth-basiert — wenn die Upstream-CLI eine öffentliche client_id/secret bereitstellt, betten Sie sie über `resolvePublicCred()` ein (siehe `docs/security/PUBLIC_CREDS.md`), **nie** als Literal
5. Registrieren Sie Modelle in `open-sse/config/providerRegistry.ts`
6. Schreiben Sie Tests in `tests/unit/` (einschließlich der öffentlichen Creds-Formassertion, wenn Sie ein neues eingebettetes Standard hinzugefügt haben)

### Hinzufügen einer neuen API-Route

1. Erstellen Sie ein Verzeichnis unter `src/app/api/v1/your-route/`
2. Erstellen Sie `route.ts` mit `GET`/`POST`-Handlern
3. Folgen Sie dem Muster: CORS → Zod-Body-Validierung → optionale Authentifizierung → Handler-Delegation
4. Der Handler geht in `open-sse/handlers/` (von dort importieren, nicht inline)
5. Fehlerantworten verwenden `buildErrorBody()` / `errorResponse()` aus `open-sse/utils/error.ts` (automatisch sanitisiert — niemals `err.stack` oder `err.message` roh im Körper einfügen). Siehe `docs/security/ERROR_SANITIZATION.md`.
6. Fügen Sie Tests hinzu — einschließlich mindestens einer Assertion, dass Fehlerantworten keine Stack-Traces ausgeben (`!body.error.message.includes("at /")`)

### Hinzufügen eines neuen DB-Moduls

1. Erstellen Sie `src/lib/db/yourModule.ts` — importieren Sie `getDbInstance` aus `./core.ts`
2. Exportieren Sie CRUD-Funktionen für Ihre Domänentabelle(n)
3. Fügen Sie eine Migration in `src/lib/db/migrations/` hinzu, wenn neue Tabellen benötigt werden
4. Re-Exportieren Sie aus `src/lib/localDb.ts` (nur zur Re-Exportliste hinzufügen)
5. Schreiben Sie Tests

### Hinzufügen eines neuen MCP-Tools

1. Fügen Sie die Tool-Definition in `open-sse/mcp-server/tools/` mit Zod-Eingabeschema + asynchronem Handler hinzu
2. Registrieren Sie sich im Tool-Set (verkabelt durch `createMcpServer()`)
3. Weisen Sie die entsprechenden Bereiche zu
4. Schreiben Sie Tests (Toolaufruf wird in der `mcp_audit`-Tabelle protokolliert)

### Hinzufügen einer neuen A2A-Fähigkeit

1. Erstellen Sie die Fähigkeit in `src/lib/a2a/skills/` (5 existieren bereits: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. Die Fähigkeit erhält den Aufgaben-Kontext (Nachrichten, Metadaten) → gibt ein strukturiertes Ergebnis zurück
3. Registrieren Sie sich in `A2A_SKILL_HANDLERS` in `src/lib/a2a/taskExecution.ts`
4. Exponieren Sie in `src/app/.well-known/agent.json/route.ts` (Agent Card)
5. Schreiben Sie Tests in `tests/unit/`
6. Dokumentieren Sie in `docs/frameworks/A2A-SERVER.md` in der Fähigkeits-Tabelle

### Hinzufügen eines neuen Cloud-Agenten

1. Erstellen Sie die Agentenklasse in `src/lib/cloudAgent/agents/`, die `CloudAgentBase` erweitert (3 existieren bereits: codex-cloud, devin, jules)
2. Implementieren Sie `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources`
3. Registrieren Sie sich in `src/lib/cloudAgent/registry.ts`
4. Fügen Sie die OAuth-/Anmeldeinformationsbehandlung hinzu, falls erforderlich (`src/lib/oauth/providers/`)
5. Tests + Dokumentation in `docs/frameworks/CLOUD_AGENT.md`

### Hinzufügen eines neuen Guardrails / Eval / Skill / Webhook-Ereignis

- Guardrail: `src/lib/guardrails/` → Dokumente: `docs/security/GUARDRAILS.md`
- Eval-Suite: `src/lib/evals/` → Dokumente: `docs/frameworks/EVALS.md`
- Skill (Sandbox): `src/lib/skills/` → Dokumente: `docs/frameworks/SKILLS.md`
- Webhook-Ereignis: `src/lib/webhookDispatcher.ts` → Dokumente: `docs/frameworks/WEBHOOKS.md`

## Referenzdokumentation

Für jede nicht triviale Änderung lesen Sie zuerst das entsprechende Deep-Dive:

| Bereich                                                 | Dokument                                                          |
| ------------------------------------------------------- | ----------------------------------------------------------------- |
| Repo-Navigation                                         | `docs/architecture/REPOSITORY_MAP.md`                             |
| Architektur                                             | `docs/architecture/ARCHITECTURE.md`                               |
| Ingenieureferenzen                                      | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| Auto-Combo (9-Faktoren-Bewertung, 14 Strategien)        | `docs/routing/AUTO-COMBO.md`                                      |
| Resilienz (3 Mechanismen)                               | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| Reasoning Replay                                        | `docs/routing/REASONING_REPLAY.md`                                |
| Fähigkeiten-Rahmen                                      | `docs/frameworks/SKILLS.md`                                       |
| Gedächtnissystem (FTS5 + Qdrant)                        | `docs/frameworks/MEMORY.md`                                       |
| Cloud-Agenten                                           | `docs/frameworks/CLOUD_AGENT.md`                                  |
| Leitplanken (PII / Injektion / Vision)                  | `docs/security/GUARDRAILS.md`                                     |
| Öffentliche Upstream-Anmeldeinformationen (Gemini/etc.) | `docs/security/PUBLIC_CREDS.md`                                   |
| Fehlernachrichtensanitierung                            | `docs/security/ERROR_SANITIZATION.md`                             |
| Bewertungen                                             | `docs/frameworks/EVALS.md`                                        |
| Compliance / Audit                                      | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                                                | `docs/frameworks/WEBHOOKS.md`                                     |
| Autorisierungs-Pipeline                                 | `docs/architecture/AUTHZ_GUIDE.md`                                |
| Stealth (TLS / Fingerabdruck)                           | `docs/security/STEALTH_GUIDE.md`                                  |
| Agent-Protokolle (A2A / ACP / Cloud)                    | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP-Server                                              | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A-Server                                              | `docs/frameworks/A2A-SERVER.md`                                   |
| API-Referenz + OpenAPI                                  | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| Anbieterkatalog (automatisch generiert)                 | `docs/reference/PROVIDER_REFERENCE.md`                            |
| Release-Flow                                            | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## Testen

| Was                     | Befehl                                                                       |
| ----------------------- | ---------------------------------------------------------------------------- |
| Unit-Tests              | `npm run test:unit`                                                          |
| Einzelne Datei          | `node --import tsx/esm --test tests/unit/file.test.ts`                       |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                                        |
| E2E (Playwright)        | `npm run test:e2e`                                                           |
| Protokoll E2E (MCP+A2A) | `npm run test:protocols:e2e`                                                 |
| Ökosystem               | `npm run test:ecosystem`                                                     |
| Coverage-Gate           | `npm run test:coverage` (75/75/75/70 — Anweisungen/Zeilen/Funktionen/Zweige) |
| Coverage-Bericht        | `npm run coverage:report`                                                    |

**PR-Regel**: Wenn Sie Produktionscode in `src/`, `open-sse/`, `electron/` oder `bin/` ändern, müssen Sie Tests im selben PR einfügen oder aktualisieren.

**Testschicht-Präferenz**: Unit zuerst → Integration (Multi-Modul oder DB-Zustand) → E2E (UI/Workflow nur). Kodieren Sie Fehlerreproduktionen als automatisierte Tests vor oder zusammen mit der Behebung.

**Copilot-Coverage-Richtlinie**: Wenn ein PR Produktionscode ändert und die Abdeckung unter 75% (Anweisungen/Zeilen/Funktionen) oder 70% (Zweige) liegt, berichten Sie nicht nur — fügen Sie Tests hinzu oder aktualisieren Sie diese, führen Sie das Coverage-Gate erneut aus und bitten Sie um Bestätigung. Fügen Sie die ausgeführten Befehle, geänderten Testdateien und das endgültige Abdeckungsergebnis im PR-Bericht hinzu.

---

## Git-Workflow

```bash
# Niemals direkt in main committen
git checkout -b feat/your-feature
git commit -m "feat: beschreibe deine Änderung"
git push -u origin feat/your-feature
```

**Branch-Präfixe**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**Commit-Format** (Conventional Commits): `feat(db): circuit breaker hinzufügen` — Scopes: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky-Hooks**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## Umgebung

- **Laufzeit**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES-Module
- **TypeScript**: 5.9+, Ziel ES2022, Modul esnext, Auflösung Bundler
- **Pfad-Aliase**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **Standardport**: 20128 (API + Dashboard am selben Port)
- **Datenverzeichnis**: `DATA_DIR` Umgebungsvariable, standardmäßig `~/.omniroute/`
- **Wichtige Umgebungsvariablen**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- Einrichtung: `cp .env.example .env` und dann `JWT_SECRET` (`openssl rand -base64 48`) und `API_KEY_SECRET` (`openssl rand -hex 32`) generieren

---

## Harte Regeln

1. Niemals Geheimnisse oder Anmeldeinformationen committen
2. Niemals Logik in `localDb.ts` hinzufügen
3. Niemals `eval()` / `new Function()` / implizites eval verwenden
4. Niemals direkt in `main` committen
5. Niemals rohes SQL in Routen schreiben — verwenden Sie `src/lib/db/`-Module
6. Niemals Fehler in SSE-Streams stillschweigend unterdrücken
7. Immer Eingaben mit Zod-Schemas validieren
8. Immer Tests einfügen, wenn Produktionscode geändert wird
9. Die Abdeckung muss ≥75% (Anweisungen, Zeilen, Funktionen) / ≥70% (Zweige) bleiben. Aktuell gemessen: ~82%.
10. Niemals Husky-Hooks umgehen (`--no-verify`, `--no-gpg-sign`) ohne ausdrückliche Genehmigung des Betreibers.
11. Niemals öffentliche Upstream OAuth client_id/secret oder Firebase Web-Schlüssel als String-Literale einbetten — immer über `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`) gehen. Siehe `docs/security/PUBLIC_CREDS.md`.
12. Niemals rohes `err.stack` / `err.message` in HTTP / SSE / Executor-Antworten zurückgeben — immer über `buildErrorBody()` oder `sanitizeErrorMessage()` (`open-sse/utils/error.ts`) leiten. Siehe `docs/security/ERROR_SANITIZATION.md`.
13. Niemals externe Pfade oder Laufzeitwerte in Shell-Skripte interpolieren, die an `exec()`/`spawn()` übergeben werden — stattdessen über die `env`-Option übergeben. Referenz: `src/mitm/cert/install.ts::updateNssDatabases`.
14. Niemals einen CodeQL / Secret-Scanning-Alarm ohne (a) vorherige Überprüfung der Musterdokumentation oben, um zu sehen, ob der Helfer anwendbar ist, und (b) die technische Begründung im Ablehnungs-Kommentar aufzeichnen. Präzedenzfall: `js/stack-trace-exposure`, das an Callsites ausgelöst wird, die bereits über `sanitizeErrorMessage()` geleitet werden, ist eine bekannte CodeQL-Einschränkung (benutzerdefinierte Sanitizer werden nicht erkannt) — als `false positive` abweisen mit Verweis auf `docs/security/ERROR_SANITIZATION.md`.
15. Niemals Routen, die Kindprozesse erzeugen (`/api/mcp/`, `/api/cli-tools/runtime/`), ohne `isLocalOnlyPath()`-Klassifizierung in `src/server/authz/routeGuard.ts` einbeziehen. Die Loopback-Durchsetzung erfolgt bedingungslos vor jeder Authentifizierungsprüfung — ein durch Tunnel geleakter JWT kann keinen Prozessstart auslösen. Siehe `docs/security/ROUTE_GUARD_TIERS.md`.
16. Niemals `Co-Authored-By`-Trailer einfügen, die einen KI-Assistenten, LLM oder Automatisierungskonto würdigen (z. B. Namen mit "Claude", "GPT", "Copilot", "Bot"; E-Mails unter `anthropic.com` / `openai.com` / bot-eigenen `noreply.github.com`-Adressen). Solche Trailer leiten die Commit-Zuordnung auf das Bot-Konto auf GitHub um und verbergen den echten Autor (`diegosouzapw`) in der PR-Historie. Menschliche Mitwirkende — einschließlich Upstream-PR-Autoren und Issue-Berichterstattern, die in OmniRoute portiert werden — DÜRFEN und SOLLTEN mit standardmäßigen `Co-authored-by: Name <email>`-Trailern gewürdigt werden; die Upstream-Port-Workflows (`/port-upstream-features`, `/port-upstream-issues`) hängen davon ab.
