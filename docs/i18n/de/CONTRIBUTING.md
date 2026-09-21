# Contributing to OmniRoute (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## Entwicklungsumgebung

### Voraussetzungen

- **Node.js** `>=22.22.3 <23` oder `>=24.0.0 <27` (empfohlen: 24 LTS)
- **npm** 10+

> **Benutzer von npm v11+ (Node 24+):** Überprüfen Sie nach `npm install`, ob die nativen Module installiert wurden:
> `node -e "require('better-sqlite3')"`. Falls der Befehl mit `MODULE_NOT_FOUND` fehlschlägt,
> führen Sie `npm approve-scripts better-sqlite3 && npm install` aus. Siehe
> [Fehlerbehebung](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### Klonen und installieren

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### Umgebungsvariablen

```bash
# Erstellen Sie Ihre .env aus der Vorlage
cp .env.example .env

# Erforderliche Geheimnisse generieren
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

Wichtige Variablen für die Entwicklung:

| Variable               | Entwicklungsstandardwert | Beschreibung                              |
| ---------------------- | ------------------------ | ----------------------------------------- |
| `PORT`                 | `20128`                  | Server-Port                               |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | Basis-URL für das Frontend                |
| `JWT_SECRET`           | (oben generieren)        | Geheimnis für JWT-Signaturen              |
| `INITIAL_PASSWORD`     | `CHANGEME`               | Passwort für die erste Anmeldung          |
| `APP_LOG_LEVEL`        | `info`                   | Ausführlichkeitsstufe der Protokollierung |

### Dashboard-Einstellungen

Das Dashboard bietet UI-Umschalter für Funktionen, die auch über Umgebungsvariablen konfiguriert werden können:

| Ort der Einstellung       | Umschalter                    | Beschreibung                                  |
| ------------------------- | ----------------------------- | --------------------------------------------- |
| Einstellungen → Erweitert | Debug-Modus                   | Debug-Protokolle für Anfragen aktivieren (UI) |
| Einstellungen → Allgemein | Sichtbarkeit der Seitenleiste | Bereiche der Seitenleiste ein-/ausblenden     |

Diese Einstellungen werden in der Datenbank gespeichert, bleiben über Neustarts hinweg erhalten und überschreiben nach ihrer Festlegung die Standardwerte der Umgebungsvariablen.

### Lokal ausführen

```bash
# Entwicklungsmodus (automatisches Neuladen)
npm run dev

# Produktions-Build
npm run build    # next build → .build/next/, dann assembleStandalone → dist/
npm run start

# Schnelle reine Backend-/API-Kompilierung für Änderungen von Mitwirkenden
npm run build:contributor

# Release-Build (vollständiger Neuaufbau + HEAD-Sentinel — für die Bereitstellung erforderlich)
npm run build:release   # rm -rf .build dist && Build + schreibt dist/BUILD_SHA

# Übliche Port-Konfiguration
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

Der Contributor-Build führt ausschließlich eine Kompilierungsvalidierung durch: Er erstellt weder die eigenständige
Distribution noch optionale native Paketierungsartefakte. Verwenden Sie den regulären Produktions-Build, wenn
Sie das auslieferbare Bundle validieren müssen.

### Struktur der Build-Ausgabe

| Verzeichnis | Inhalt                                                                                     | Versioniert |
| ----------- | ------------------------------------------------------------------------------------------ | ----------- |
| `src/`      | Anwendungsquellcode (TypeScript / TSX)                                                     | Ja          |
| `.build/`   | Zwischenergebnisse — Ausgabe von `next build` (von Git ignoriert, `distDir = .build/next`) | Nein        |
| `dist/`     | Auslieferbares Bundle — von `assembleStandalone` zusammengestellt (von Git ignoriert)      | Nein        |

Die Build-Pipeline besteht aus einem einzigen Durchlauf:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js-Ausgabe)
  └─ assembleStandalone()                 (kopiert Standalone-Dateien + statische Dateien + öffentliche Dateien + native Assets)
       └─ Ausgabe: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` bereinigt zunächst zusätzlich beide Verzeichnisse und schreibt
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) als Integritäts-Sentinel für die Bereitstellung.

`npm run build:contributor` verwendet das reine Backend-Build-Profil. Während des Builds werden
Dashboard-UI-Dateien vorübergehend durch Stubs ersetzt, API-Routen-Handler beibehalten und die Originaldateien
nach dem Build wiederhergestellt. Verwenden Sie `npm run build` für Änderungen an der Dashboard-UI oder für eine
vollständige Release-Validierung; das Contributor-Profil ist kein Ersatz für den Release-Build.

> **Hinweis zur VPS-Bereitstellung:** Das Remote-Image-Verzeichnis `/usr/lib/node_modules/omniroute/app/`
> bleibt unverändert. Die Bereitstellungs-Skills synchronisieren den Inhalt von `dist/` per rsync dorthin.
> Nur der Pfad der Build-Ausgabe im Repository wurde geändert (`app/` → `dist/`).

Standard-URLs:

- **Dashboard**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git-Workflow

> ⚠️ **NIEMALS direkt in `main` committen.** Verwende immer Feature-Branches.
>
> **PR-Basis:** Verwende den aktiven `release/vX.Y.Z`-Branch als Ziel (nicht `main`). Siehe
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) für das Modell
> „ein Branch pro Release“ mit Tagging bei der Veröffentlichung.

```bash
# Vom aktuellen Stand des aktiven Release-Branches abzweigen (Beispiel: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... Änderungen vornehmen ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# Einen Pull Request mit base = release/v3.8.49 öffnen
```

### Branch-Benennung

| Präfix      | Zweck                             |
| ----------- | --------------------------------- |
| `feat/`     | Neue Funktionen                   |
| `fix/`      | Fehlerbehebungen                  |
| `refactor/` | Umstrukturierung des Codes        |
| `docs/`     | Änderungen an der Dokumentation   |
| `test/`     | Ergänzungen/Korrekturen von Tests |
| `chore/`    | Tooling, CI, Abhängigkeiten       |

### Commit-Nachrichten

Befolge [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## Tests ausführen

```bash
# Alle Tests (Unit + Vitest + Ökosystem + E2E)
npm run test:all

# Einzelne Testdatei (nativer Test-Runner von Node.js — die meisten Tests verwenden diesen)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Nur die von deiner Änderung betroffenen Unit-Tests (derselbe TIA-Selektor wie beim CI-Gate, #8084)
npm run test:scoped            # Änderungen im letzten Commit (oder im Arbeitsverzeichnis)
npm run test:scoped:staged     # nur bereitgestellte Änderungen — eignet sich gut für einen Pre-Commit-Lauf
npm run test:scoped:full       # zuerst die Import-Graph-Zuordnung neu erstellen (nach dem Hinzufügen/Verschieben von Dateien)
# Exit 1 + „run the full suite“ bedeutet, dass eine Hub-Datei (tsconfig, package.json, …) oder eine
# nicht zugeordnete Quelldatei geändert wurde — der Selektor schlägt sicher fehl und überspringt niemals unbemerkt Tests.

# Vitest (MCP-Server, autoCombo, Cache)
npm run test:vitest

# E2E-Tests (erfordert Playwright)
npm run test:e2e

# E2E für Protokoll-Clients (MCP-Transporte, A2A)
npm run test:protocols:e2e

# Kompatibilitätstests für das Ökosystem
npm run test:ecosystem

# Coverage-Gate: 60 % Anweisungen/Zeilen/Funktionen/Verzweigungen
npm run test:coverage
npm run coverage:report

# Lint- und Formatierungsprüfung
npm run lint
npm run check

# Durch Gate geschützter Combo-Smoke-Test mit echten Upstream-Diensten (erfordert VPS-Zugriff + Guthaben bei echten Anbietern)
# Greift auf ECHTE Anbieter zu — verursacht geringe Kosten. Wird NIEMALS in CI ausgeführt. Wird ohne Gate ordnungsgemäß übersprungen.
# Erforderlich: Zugriff per ssh root@192.168.0.15 (bezieht einen schreibgeschützten DB-Snapshot vom VPS).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Live-Smoke-Test für den Phase-3-VPS — reine Node-ESM-Skripte, die direkt auf den Live-Server .15 zugreifen.
# Erfordert: Zugriff per ssh root@192.168.0.15 (Combos werden per SSH sqlite erstellt/entfernt).
# Greift auf ECHTE Anbieter zu (geringe Kosten). Erstellt/löscht ausschließlich __live_test__*-Combos. Wird NIEMALS in CI ausgeführt.
# REQUIRE_API_KEY=false auf .15, daher ist kein API-Schlüssel erforderlich; COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY werden jedoch berücksichtigt, falls gesetzt.
npm run test:combo:live:vps              # 7 HTTP-Szenarien (Priorität/Round-Robin/gewichtet/Kosten/Fusion/automatisch + Zustand)
npm run test:combo:live:vps:failover     # fügt ein echtes anbieterübergreifendes Failover-Szenario hinzu (insgesamt 8)
```

Hinweise zur Testabdeckung:

- `npm run test:coverage` misst die Quellcodeabdeckung für die Haupt-Unit-Test-Suite, schließt `tests/**` aus und umfasst `open-sse/**`
- Pull Requests müssen das Coverage-Gate bei **60 %+** für Anweisungen/Zeilen/Funktionen/Verzweigungen halten
- Wenn ein PR Produktionscode in `src/`, `open-sse/`, `electron/` oder `bin/` ändert, müssen im selben PR automatisierte Tests hinzugefügt oder aktualisiert werden
- `npm run coverage:report` gibt den detaillierten Bericht für jede einzelne Datei aus dem letzten Coverage-Lauf aus
- `npm run test:coverage:legacy` behält die ältere Metrik für historische Vergleiche bei
- Siehe `docs/ops/COVERAGE_PLAN.md` für den phasenweisen Plan zur Verbesserung der Testabdeckung

### Anforderungen an Pull Requests

Verwende vor dem Öffnen eines PR den
[Golden Path für Beiträge](docs/ops/CONTRIBUTION_GOLDEN_PATH.md), um die fokussierte Schleife für
deine Änderungen auszuführen. Die vollständige Unit-Test-Suite (4 CI-Shards), Vitest, das Coverage-Gate von **60 %+** und
der Produktions-Build liegen in der Verantwortung von CI — sie lokal auszuführen, liefert keine zusätzlichen Erkenntnisse,
die dir die PR-Prüfungen nicht ohnehin liefern würden, und kann auf kleineren Rechnern den Host überlasten (#8084):

- Führe die Testdateien aus, die deine Änderung abdecken: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- Führe `npm run lint` aus
- Füge im selben PR automatisierte Tests hinzu oder aktualisiere sie, wenn Produktionscode geändert wird
- Nenne die geänderten oder hinzugefügten Testdateien in der PR-Beschreibung, wenn Produktionscode geändert wurde
- Prüfe das SonarQube-Ergebnis im PR, wenn die Projekt-Secrets in CI konfiguriert sind

Aktueller Teststatus: **122 Unit-Test-Dateien** mit Abdeckung für:

- Provider-Übersetzer und Formatkonvertierung
- Ratenbegrenzung, Circuit Breaker und Resilienz
- Semantischen Cache, Idempotenz und Fortschrittsverfolgung
- Datenbankoperationen und -schema (21 DB-Module)
- OAuth-Abläufe und Authentifizierung
- Validierung von API-Endpunkten (Zod v4)
- MCP-Server-Tools und Durchsetzung von Geltungsbereichen
- Speicher- und Skills-Systeme

---

## Codestil

- **ESLint** — Vor dem Commit `npm run lint` ausführen
- **Prettier** — Beim Commit automatisch über `lint-staged` formatiert (2 Leerzeichen, Semikolons, doppelte Anführungszeichen, 100 Zeichen Zeilenbreite, nachgestellte Kommas gemäß es5)
- **TypeScript** — Der gesamte Code unter `src/` verwendet `.ts`/`.tsx`; `open-sse/` verwendet `.ts`/`.js`; mit TSDoc dokumentieren (`@param`, `@returns`, `@throws`)
- **Kein `eval()`** — ESLint erzwingt `no-eval`, `no-implied-eval`, `no-new-func`
- **Zod-Validierung** — Zod-v4-Schemas für die Validierung aller API-Eingaben verwenden
- **Benennung**: Dateien = camelCase/kebab-case, Komponenten = PascalCase, Konstanten = UPPER_SNAKE

### Fehlerbehandlung / leere catch-Blöcke

Ein `catch` darf niemals unerklärt bleiben. Ordne es einer von zwei Kategorien zu (dies setzt
die strikte Regel „Fehler in SSE-Streams niemals stillschweigend verschlucken“ praktisch um):

- **Beabsichtigt (eigene Best-Effort-Bereinigung/Telemetrie)** — ein Fehler ist hier zu erwarten und
  harmlos; füge einen einzeiligen Kommentar zur Begründung hinzu, ohne Logging (diese Konvention
  vermeidet störende Log-Ausgaben bei jeder Anfrage).

  ```ts
  } catch {} // das Schließen eines bereits geschlossenen Controllers nach einem Client-Verbindungsabbruch ist zu erwarten
  ```

- **Sollte protokolliert werden (externer/vom Aufrufer bereitgestellter Code oder das Verschlucken ändert den Kontrollfluss)** — behalte
  den catch-Block bei (der Stream darf dadurch niemals unterbrochen werden), gib aber eine kontextbezogene `console.debug`-/`warn`-Meldung aus, damit der
  Fehler auffindbar ist.

  ```ts
  } catch (e) {
    console.debug("[STREAM] Fehler im onFailure-Callback:", e);
  }
  ```

Anwendungsbeispiele findest du unter `open-sse/utils/stream.ts` und `open-sse/utils/streamHandler.ts`.

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## Hinzufügen eines neuen Providers

### Schritt 1: Provider-Konstanten registrieren

Zu `src/shared/constants/providers.ts` hinzufügen — wird beim Laden des Moduls mit Zod validiert.

### Schritt 2: Executor hinzufügen (falls benutzerdefinierte Logik erforderlich ist)

Einen Executor in `open-sse/executors/your-provider.ts` erstellen, der den Basis-Executor erweitert.

### Schritt 3: Translator hinzufügen (falls kein OpenAI-Format verwendet wird)

Request-/Response-Translator in `open-sse/translator/` erstellen.

### Schritt 4: OAuth-Konfiguration hinzufügen (falls OAuth-basiert)

OAuth-Anmeldedaten in `src/lib/oauth/constants/oauth.ts` und den Service in `src/lib/oauth/services/` hinzufügen.

Wenn der Upstream-Provider eine öffentliche OAuth-client_id/ein öffentliches OAuth-Secret oder einen Firebase-Web-API-Schlüssel innerhalb seiner öffentlichen CLI bzw. seines Browser-Bundles bereitstellt, darf dieser **nicht** als Stringliteral eingebettet werden. `resolvePublicCred()` aus `open-sse/utils/publicCreds.ts` verwenden und einen maskierten Byte-Eintrag zu `EMBEDDED_DEFAULTS` hinzufügen. Der vollständige verpflichtende Workflow ist in [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) dokumentiert.

In Handlern/Executors müssen Fehlermeldungen, die den Client erreichen, über `buildErrorBody()` / `sanitizeErrorMessage()` aus `open-sse/utils/error.ts` verarbeitet werden — niemals unverarbeitete Werte aus `err.stack` oder `err.message` in einen Response-Body einfügen. Siehe [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md).

### Schritt 5: Modelle registrieren

Modelldefinitionen in `open-sse/config/providerRegistry.ts` hinzufügen.

### Schritt 6: Tests hinzufügen

Unit-Tests in `tests/unit/` schreiben, die mindestens Folgendes abdecken:

- Provider-Registrierung
- Request-/Response-Übersetzung
- Fehlerbehandlung

---

## Pull-Request-Checkliste

- [ ] Tests erfolgreich (`npm test`)
- [ ] Linting erfolgreich (`npm run lint`)
- [ ] Build erfolgreich (`npm run build`)
- [ ] TypeScript-Typen für neue öffentliche Funktionen und Schnittstellen hinzugefügt
- [ ] Keine hartcodierten Geheimnisse oder Fallback-Werte
- [ ] Öffentliche Upstream-Zugangsdaten über `resolvePublicCred()` eingebettet (siehe [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)), niemals als Literale
- [ ] Fehlerantworten werden über `buildErrorBody()` / `sanitizeErrorMessage()` geleitet – keine unverarbeiteten Stacktraces in Antworttexten (siehe [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md))
- [ ] Shell-Befehle (`exec` / `spawn`) übergeben Laufzeitwerte über `env`, nicht über String-Interpolation
- [ ] Alle Eingaben mit Zod-Schemas validiert
- [ ] Changelog-**Fragment** für benutzersichtbare Änderungen unter `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` hinzugefügt (siehe [`changelog.d/README.md`](./changelog.d/README.md)) – `CHANGELOG.md` **nicht** direkt bearbeiten; Fragmente werden zum Veröffentlichungszeitpunkt zusammengeführt und verursachen niemals Konflikte zwischen PRs
- [ ] Dokumentation aktualisiert (falls zutreffend)
- [ ] Keine neuen CodeQL- / Secret-Scanning-Warnungen ausgelöst oder jede einzelne mit einer technischen Begründung unter Verweis auf das relevante Dokument unter `docs/security/` verworfen
- [ ] Routen, die untergeordnete Prozesse starten (`/api/mcp/`, `/api/cli-tools/runtime/`), in `src/server/authz/routeGuard.ts` als `isLocalOnlyPath()` klassifiziert – siehe [Strikte Regel Nr. 15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] Keine `Co-Authored-By`-Trailer in Commit-Nachrichten – Commits dürfen ausschließlich unter der Git-Identität des Repository-Eigentümers erscheinen (Strikte Regel Nr. 16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## Hilfe erhalten

- **Architektur**: Siehe [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API-Referenz**: Siehe [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **Sicherheitsdokumentation**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **Betriebsdokumentation**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **Issues**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: Siehe `docs/adr/` für Aufzeichnungen zu Architekturentscheidungen
