# Repository Map (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇧🇦 [bs](../../../bs/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Einzeilige Beschreibung für jedes Verzeichnis und jede Datei im Stammverzeichnis.**
> Zuletzt aktualisiert: 2026-06-28 — OmniRoute v3.8.40
>
> Verwenden Sie diese Übersicht, um sich schnell in der Codebasis zurechtzufinden. Für ausführliche Informationen folgen Sie den Links zu den entsprechenden Dokumentationen.

## Verzeichnisstruktur der obersten Ebene

```
OmniRoute/
├── src/                  # Next.js-16-Anwendung (UI + API-Routen + Bibliotheken + Domäne + Server)
├── open-sse/             # Workspace der Streaming-Engine (Handler, Executors, Übersetzer, MCP-Server)
├── electron/             # Desktop-Wrapper (Electron 41 + electron-builder 26.10)
├── bin/                  # CLI-Einstiegspunkt und Befehlshandler
├── scripts/              # Build-, Prüf-, Synchronisierungs- und einmalig verwendete Skripte
├── docs/                 # Öffentliche Dokumentation (Sie befinden sich hier)
├── tests/                # Alle Testsuiten (Unit-, Integrations-, E2E- und Protokoll-Client-Tests)
├── public/               # Statische Next.js-Assets, PWA-Manifest, Service Worker und Symbole
├── config/               # Statische Konfiguration + Quality-Gate-Status (i18n, payloadRules, quality/)
├── images/               # Bild-Assets für Marketing und README
├── @omniroute/           # Veröffentlichbare Begleitpakete (opencode-plugin, opencode-provider)
├── skills/               # Skill-Pakete für CLI/Agenten (cli-* + omni-* + config-codex-cli)
├── examples/             # Beispiel-Plug-ins + Starter für omniroute-cmd-hello
├── contrib/              # Beiträge der Community (podman/)
├── .source/              # Fumadocs-Quellkonfiguration (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub-Actions-Workflows + Issue-Vorlagen + PR-Vorlage
├── .husky/               # Git-Hooks (pre-commit, pre-push)
├── .claude/              # Slash-Befehle für Claude Code (projektspezifisch)
├── .agents/              # Workflows + Skills für Codex/generische Agenten (Spiegelung von .claude/)
├── .vscode/              # VS-Code-Workspace-Einstellungen
├── _ideia/               # Planungsnotizen (informell; nicht ausgeliefert)
├── _mono_repo/           # Historische Teilprojekte (cloud, site, vscode-extension)
├── _references/          # Schreibgeschützte Referenzklone verwandter OSS-Projekte
├── _tasks/               # Dateien zur auf einzelne Releases bezogenen Aufgabenverfolgung (informell)
├── .build/ .worktrees/ dist/   # Lokale temporäre Build-/Git-Worktree-/Build-Ausgabedaten (von Git ignoriert)
├── .issues/              # Lokaler Issue-Cache (von Git ignoriert)
├── .playwright-mcp/      # Playwright-MCP-Testartefakte
├── coverage/             # c8-Coverage-Ausgabe (von Git ignoriert)
├── logs/                 # Laufzeitprotokolle (von Git ignoriert)
├── node_modules/         # Abhängigkeiten (von Git ignoriert)
├── package/              # Staging-Bereich für npm pack (Build-Artefakt)
├── .next/                # Next.js-Build-Ausgabe (von Git ignoriert)
└── (Dateien im Stammverzeichnis — siehe unten)
```

---

## Dateien im Stammverzeichnis

| Datei                                       | Zweck                                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **README.md**                               | Marketing-Landingpage + Schnellstart + Funktionsmatrix (siehe auch `llm.txt`)                     |
| **CHANGELOG.md**                            | Änderungsprotokoll pro Release (automatisch durch den Skill `/version-bump-cc` generiert)         |
| **LICENSE**                                 | Text der MIT-Lizenz                                                                               |
| **CLAUDE.md**                               | Projektregeln für Claude-Code-Agenten (verbindliche Regeln, Konventionen, Szenarien)              |
| **AGENTS.md**                               | Wie CLAUDE.md, jedoch für andere KI-Agenten als Claude (Codex, Cursor usw.)                       |
| **GEMINI.md**                               | Kompakte Regeln für Gemini-basierte Agenten (Teilmenge von CLAUDE.md)                             |
| **CONTRIBUTING.md**                         | Leitfaden für Mitwirkende: Einrichtung, Conventional Commits, Tests, PR-Ablauf                    |
| **SECURITY.md**                             | Richtlinie zur Meldung von Sicherheitslücken, unterstützte Versionen, Bedrohungsmodell            |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — Erwartungen an das Verhalten in der Community                              |
| **llm.txt**                                 | Für LLM-Crawler optimierte Nur-Text-Landingpage (SEO für KI-Assistenten)                          |
| **package.json**                            | npm-Manifest, Skripte, Abhängigkeiten, Engines, c8-Coverage-Schranke                              |
| **package-lock.json**                       | Festgeschriebener Abhängigkeitsbaum                                                               |
| **tsconfig.json**                           | TypeScript-Stammkonfiguration                                                                     |
| **tsconfig.typecheck-core.json**            | Typprüfungskonfiguration für den Kern unter `src/`                                                |
| **tsconfig.typecheck-noimplicit-core.json** | Strikte Typprüfung (`noImplicitAny`)                                                              |
| **tsconfig.tsbuildinfo**                    | Cache für inkrementelle TS-Builds (von Git ignoriert)                                             |
| **next.config.mjs**                         | Next.js-16-Build-Konfiguration (eigenständige Ausgabe)                                            |
| **next-env.d.ts**                           | Automatisch generierte Umgebungstypen von Next.js                                                 |
| **eslint.config.mjs**                       | Flache ESLint-Konfiguration (Regeln pro Projektbereich)                                           |
| **prettier.config.mjs**                     | Prettier-Formatierungsregeln                                                                      |
| **postcss.config.mjs**                      | PostCSS-Konfiguration für die Tailwind-/CSS-Pipeline                                              |
| **playwright.config.ts**                    | Playwright-Konfiguration für E2E-Tests                                                            |
| **vitest.config.ts**                        | Vitest-Konfiguration (Standard-Suite)                                                             |
| **vitest.mcp.config.ts**                    | Vitest-Konfiguration für MCP-Server-/autoCombo-/Cache-Suites                                      |
| **sonar-project.properties**                | SonarQube-/SonarCloud-Konfiguration (Codequalität)                                                |
| **Dockerfile**                              | Mehrstufiger Docker-Build (builder → runner-base → runner-cli)                                    |
| **docker-compose.yml**                      | Entwicklungs-Compose mit 4 Profilen (base, cli, host, cliproxyapi) + Redis-Sidecar                |
| **docker-compose.prod.yml**                 | Produktions-Compose (Port 20130, Redis, benannte Volumes)                                         |
| **.dockerignore**                           | Vom Docker-Kontext ausgeschlossene Dateien                                                        |
| **fly.toml**                                | Fly.io-Deployment-Konfiguration (Region `sin`, Port 20128, /data-Volume)                          |
| **.env.example**                            | Vorlage für Umgebungsdatei (wird bei der ersten Installation automatisch nach `.env` kopiert)     |
| **.gitignore**                              | Git-Ignoriermuster                                                                                |
| **.npmignore**                              | Ausschlussliste für die npm-Veröffentlichung                                                      |
| **.npmrc**                                  | npm-Konfiguration (Registry, Lockfile-Richtlinie)                                                 |
| **.node-version**                           | Festgelegte Node-Version (von nvm-kompatiblen Tools verwendet)                                    |
| **.nvmrc**                                  | Festgelegte Node-Version für nvm                                                                  |
| **eslint.complexity.config.mjs**            | ESLint-Konfiguration für die Komplexitäts-Ratsche (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | ESLint-Konfiguration für SonarJS-Regeln (kognitive Komplexität/Duplizierung)                      |
| **source.config.ts**                        | Fumadocs-`defineDocs`-Quellkonfiguration (speist `.source/`)                                      |
| **knip.json**                               | Knip-Konfiguration — ungenutzte Dateien/Exporte/Abhängigkeiten (speist die Dead-Code-Schranke)    |
| **stryker.conf.json**                       | Stryker-Konfiguration für Mutationstests                                                          |
| **.size-limit.json**                        | size-limit-Konfiguration für das Bundle-Budget                                                    |
| **promptfooconfig.yaml**                    | promptfoo-Evaluierungskonfiguration                                                               |
| **.gitleaks.toml**                          | gitleaks-Regelsatz für Geheimnis-Scans                                                            |
| **.zizmor.yml**                             | zizmor-Konfiguration für GitHub-Actions-Sicherheits-Linting                                       |
| **socket.yml**                              | Socket.dev-Konfiguration für die Lieferkette                                                      |
| **news.json**                               | Lokalisierter v2-Ankündigungsfeed; Radar-Launch-Eintrag wird inaktiv ausgeliefert                 |
| **flake.nix** / **flake.lock**              | Definition und Lockdatei der Nix-Entwicklungs-Shell                                               |
| **.env**                                    | Lokale Geheimnisse (von Git ignoriert — aus `.env.example` generiert)                             |

> **In v3.8.26 aus dem Stammverzeichnis verschoben (Bereinigung):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` und die generierte Datei `quality-metrics.json` (von Git ignoriert). Siehe [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js-Anwendung

```
src/
├── app/                 # App Router (Seiten + API-Routen + Statusseiten + Landingpage)
├── lib/                 # Kernbibliotheken / Domänenmodule (80 Unterverzeichnisse + ~70 Dateien auf oberster Ebene)
├── domain/              # Reine Domänenlogik (Policy-Engine, Fallback, Kosten, Sperrung, comboResolver, Bewertung)
├── server/              # Ausschließlich serverseitige Module (Autorisierungspipeline, CORS, Authentifizierungs-Middleware) — können nicht vom Client importiert werden
├── shared/              # Gemeinsame, sicher zwischen Server und Client nutzbare Komponenten (Konstanten, Typen, Validierung, Verträge, Hilfsfunktionen)
├── i18n/                # next-intl-Konfiguration + Nachrichten-JSON je Gebietsschema (42 Gebietsschemas)
├── middleware/          # Next.js-Middleware (Anreicherung von Anfragen, Erkennung des Gebietsschemas)
├── mitm/                # MITM-Proxy-Kern: Zertifikatserzeugung/-installation, Handler, Ziele, Inspektor, Masken, Durchleitung
│   ├── handlers/        # 9 IDE-Agent-Handlerklassen, die MitmHandlerBase erweitern (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Ebene zur Datenverkehrserfassung: Puffer (In-Memory-Ringpuffer), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Bindeglied für Modelladapter (Legacy-Shim)
├── scripts/             # Im Quellbaum enthaltene Wartungsskripte (z. B. backfillAggregation)
├── sse/                 # Veraltete SSE-Handler/-Dienste (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Veralteter In-Memory-Speicher (wird schrittweise durch src/lib/db ersetzt)
├── types/               # Gemeinsam genutzte TS-Typdateien
├── instrumentation.ts   # Next.js-Telemetrie-Hook (Browser + Edge)
├── instrumentation-node.ts  # Ausschließlich Node-spezifische Instrumentierung
└── proxy.ts             # Einstiegspunkt-Shim für HTTP-Proxy
```

### `src/app/` — App Router (Next.js 16)

| Pfad                                                                         | Zweck                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Öffentliche OpenAI-kompatible API (~25 Unterrouten: Chat, Vervollständigungen, Embeddings, Dateien, Batches, Audio, Bilder, Videos, Musik, Reranking, Moderation, Suche, WS, Agenten, Konten, Anbieter usw.)                                                                                                                            |
| `app/api/v1beta/`                                                            | API-Endpunkte im Gemini-Stil                                                                                                                                                                                                                                                                                                            |
| `app/api/playground/`                                                        | Playground-Studio-Routen: `improve-prompt/` (POST — LLM-Prompt-Umschreiber), `presets/` (GET-Liste / POST-Erstellung), `presets/[id]/` (GET / PUT / DELETE) — siehe `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                              |
| `app/api/` (nicht v1)                                                        | Verwaltungs-/Admin-Routen (~60 Verzeichnisse: Anbieter, Kombinationen, Einstellungen, MCP, A2A, Evaluierungen, Speicher, Fähigkeiten, Webhooks, Compliance, Resilienz, Monitoring, Tunnel, CLI-Tools usw.)                                                                                                                              |
| `app/api/tools/agent-bridge/`                                                | AgentBridge-REST-API — 12 Routen (Serversteuerung, Agentenstatus/DNS/Zuordnungen, Umgehung, Zertifikat, Upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Siehe `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                            |
| `app/api/tools/traffic-inspector/`                                           | Traffic-Inspector-REST- und WS-API — 16+ Routen (Anfragen, Sitzungen, Hosts, Erfassungsmodi, Export, WS). LOCAL_ONLY + SPAWN_CAPABLE. Siehe `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                                  |
| `app/a2a/`                                                                   | A2A-JSON-RPC-2.0-Einstiegspunkt (`POST /a2a`)                                                                                                                                                                                                                                                                                           |
| `app/.well-known/agent.json/`                                                | A2A-Agentenkarte (Erkennung)                                                                                                                                                                                                                                                                                                            |
| `app/(dashboard)/dashboard/`                                                 | Dashboard-UI-Seiten (50+ Bereiche, ~118 page.tsx-Dateien: Anbieter, Kombinationen, Einstellungen, Speicher, Fähigkeiten, Webhooks, Evaluierungen, Audit, Batch, Cache, Kosten, Zustand, System, Aktivität usw.)                                                                                                                         |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search-Tools-Studio-UI (3 Registerkarten: Suche/Scraping/Vergleich + SearchConceptCard + ProviderCatalog) — siehe `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                              |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (Plan 21): `page.tsx` (Grundgerüst mit 3 Registerkarten), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge-Dashboard-Seite — Serverkarte, 9 Agentenkarten, Einrichtungsassistent, Modellzuordnung, Umgehungsliste. i18n PT-BR + EN. Siehe `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                                            |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic-Inspector-Dashboard-Seite — DevTools-Aufteilung, 7 Detailregisterkarten, 4 Schalter für Erfassungsmodi, Sitzungsaufzeichnung, Kontextfarbgebung. i18n PT-BR + EN. Siehe `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                                                 |
| `app/(dashboard)/dashboard/activity/`                                        | Aktivitätsfeed-Seite (Gruppe B): `page.tsx` (Server) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — siehe `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                             |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Kontingentfreigabe-Seite (Gruppe B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                        |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Seite zur Konfiguration von Anbieterplänen (Gruppe B): `page.tsx` + `ProviderPlanConfigClient.tsx` — Überschreibung der Kontingentdimensionen pro Verbindung                                                                                                                                                                            |
| `app/docs/`                                                                  | Eingebetteter Dokumentations-Viewer (rendert `docs/*.md`)                                                                                                                                                                                                                                                                               |
| `app/landing/`                                                               | Marketing-Landingpage                                                                                                                                                                                                                                                                                                                   |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Authentifizierungsbezogene Seiten                                                                                                                                                                                                                                                                                                       |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP-Fehlerseiten                                                                                                                                                                                                                                                                                                                       |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Statische Seiten/Statusseiten                                                                                                                                                                                                                                                                                                           |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Root-Layout, Startseite, PWA-Manifest, globales CSS                                                                                                                                                                                                                                                                                     |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Fehlergrenzen                                                                                                                                                                                                                                                                                                                           |

### `src/lib/` — Kernbibliotheken (~50 Module)

| Modul                                       | Zweck                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                      | A2A-Protokoll-Task-Manager, Skills (5), Streaming                                                                                                                                                                                                                                                                                        |
| `acp/`                                      | CLI-Agentenregister (lokale CLI-Erkennung — siehe `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                            |
| `api/`                                      | Gemeinsam genutzte API-Hilfsfunktionen (`requireManagementAuth`, Validierung)                                                                                                                                                                                                                                                            |
| `auth/`                                     | Sitzung, Passwort-Hashing, Token-Validierung                                                                                                                                                                                                                                                                                             |
| `batches/`                                  | Handler für die OpenAI Batches API                                                                                                                                                                                                                                                                                                       |
| `catalog/`                                  | Zod-Validierung des Anbieterkatalogs + Auflösung von Fähigkeiten                                                                                                                                                                                                                                                                         |
| `cloudAgent/`                               | Cloud-Agenten (Codex Cloud, Devin, Jules) — siehe `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                       |
| `combos/`                                   | Hilfsfunktionen für Combo-Auflösung und Neuanordnung                                                                                                                                                                                                                                                                                     |
| `audit/`                                    | Hilfsfunktionen für den Aktivitäts-Feed: `highLevelActions.ts` (Zulassungsliste + `isHighLevelAction()`), `activityIcons.ts` (Zuordnung von Aktion → Symbol/Verb), `timeline.ts` (groupByDay/relativeTime) — siehe `docs/architecture/MONITORING_SECTIONS.md`                                                                            |
| `compliance/`                               | Audit-Protokoll + Anbieter-Audit — siehe `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                                   |
| `compression/`                              | Anbindung der Komprimierungs-Engine (Engines befinden sich in `open-sse/services/compression/`)                                                                                                                                                                                                                                          |
| `config/`                                   | Hilfsfunktionen für die Laufzeitkonfiguration                                                                                                                                                                                                                                                                                            |
| `db/`                                       | Über 120 domänenspezifische DB-Module + 168 Migrationen (für SQLite immer diese Module verwenden)                                                                                                                                                                                                                                        |
| `quota/`                                    | Engine zur Kontingentfreigabe: `dimensions.ts` (Typen/Zod), `types.ts` (`QuotaStore`-Schnittstelle), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — siehe `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                    | Client für den Radar-Katalog kostenloser Modelle: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — siehe `docs/frameworks/RADAR.md`                                                                                                                                          |
| `display/`                                  | Hilfsfunktionen zur UI-Formatierung (Kosten, Latenz usw.)                                                                                                                                                                                                                                                                                |
| `embeddings/`                               | Hilfsfunktionen für den Embeddings-Dienst                                                                                                                                                                                                                                                                                                |
| `env/`                                      | Parsen und Validieren von Umgebungsvariablen                                                                                                                                                                                                                                                                                             |
| `evals/`                                    | Eval-Framework (Suiten, Runner, Laufzeit) — siehe `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                                             |
| `guardrails/`                               | PII-Maskierung, Prompt-Injection, Vision-Bridge — siehe `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                                    |
| `jobs/`                                     | Hintergrundaufgaben (Cron-ähnlich)                                                                                                                                                                                                                                                                                                       |
| `memory/`                                   | Konversationsspeicher (SQLite FTS5 + hybrides sqlite-vec-RRF + Qdrant-Stufe 2) — siehe `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                       |
| `memory/embedding/`                         | Embedding-Schicht mit mehreren Quellen: `index.ts` (Resolver), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (Plan 21)                                                                                                                                                                                  |
| `memory/vectorStore.ts`                     | Wrapper für sqlite-vec v0.1.9 — KNN-Brute-Force + hybrides RRF (FTS5 + Vektor, k=60). Verzögerte Initialisierung, mit kontrollierter Funktionseinschränkung, wenn sqlite-vec nicht verfügbar ist. (Plan 21)                                                                                                                              |
| `memory/reindex.ts`                         | `runReindexBatch()` — verarbeitet Speicherobjekte mit `needs_reindex=1` im Hintergrund; wird von `POST /api/memory/reindex` und dem Lazy-Backfill-Pfad aufgerufen. (Plan 21)                                                                                                                                                             |
| `monitoring/`                               | Integritätsprüfungen, Ausgabe von Metriken                                                                                                                                                                                                                                                                                               |
| `oauth/`                                    | OAuth-/Importabläufe für 22 Anbietermodule (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                                   |
| `plugins/`                                  | Plugin-Register                                                                                                                                                                                                                                                                                                                          |
| `promptCache/`                              | Prompt-Cache-Haltepunkte im Anthropic-Stil                                                                                                                                                                                                                                                                                               |
| `skills/`                                   | Skills-Framework (integriert + Marketplace + SkillsSH) — siehe `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                               |
| `playground/`                               | Gemeinsam genutzte Hilfsfunktionen für Playground Studio: `codeExport.ts` (curl-/Python-/TS-Generator), `promptImprover.ts` (Meta-Prompt-Builder), `streamMetrics.ts` (reines TTFT/TPS), `types.ts` (Preistabelle) — siehe `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                        |
| `webhookDispatcher.ts`                      | HMAC-Webhook-Zustellung — siehe `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                            |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts`    | Tunnel-Manager — siehe `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                                       |
| `cloudSync.ts`, `initCloudSync.ts`          | Optionale Cloud-Synchronisierung des Zustands                                                                                                                                                                                                                                                                                            |
| `localDb.ts`                                | Re-Export-Barrel für DB-Module (keine Logik — ausschließlich Re-Exporte)                                                                                                                                                                                                                                                                 |
| `cacheLayer.ts`, `idempotencyLayer.ts`      | Anfrage-Caching + Idempotenz                                                                                                                                                                                                                                                                                                             |
| (ca. 30 weitere Dateien auf oberster Ebene) | Spezialisierte Hilfsfunktionen (logEnv, modelsDevSync, piiSanitizer usw.)                                                                                                                                                                                                                                                                |

### `src/lib/db/` — Datenbank (122 Module + 168 Migrationen)

| Unterverzeichnis          | Zweck                                                                                                                                                                                |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `db/core.ts`              | `getDbInstance()`-Singleton mit WAL-Journaling                                                                                                                                       |
| `db/migrations/`          | Versionierte SQL-Dateien (idempotent, transaktional). `073_memory_vec.sql` fügt `memory_vec_meta` und die Spalte `needs_reindex` hinzu (Plan 21).                                    |
| `db/playgroundPresets.ts` | CRUD-Modul für Voreinstellungen von Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD für `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) sowie `markMemoryNeedsReindex`, `getMemoryReindexQueue` usw. (Plan 21)                       |
| `db/<domain>.ts`          | Ein Modul pro Domäne: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache usw.             |

### `src/domain/`

| Modul                  | Zweck                                             |
| ---------------------- | ------------------------------------------------- |
| `policy.ts`            | Richtlinien-Engine                                |
| `fallbackPolicy.ts`    | Fallback-Entscheidungsbaum                        |
| `costRules.ts`         | Regeln zur Kostenberechnung                       |
| `lockoutPolicy.ts`     | Sperrrichtlinie für Modelle/Verbindungen          |
| `tagRouter.ts`         | Tag-basiertes Routing                             |
| `comboResolver.ts`     | Combo-Auflösung (von der Combo-Engine verwendet)  |
| `modelAvailability.ts` | Verfügbarkeitsprüfung pro Modell                  |
| `assessment/`          | Modellbewertung (Phase 1 von RFC-AUTO-ASSESSMENT) |

### `src/server/`

| Modul    | Zweck                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------- |
| `authz/` | Autorisierungs-Pipeline: `classify` → `policies` → `enforce` — siehe `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS-Konfiguration                                                                                      |
| `auth/`  | Sitzungs-Middleware                                                                                     |

### `src/shared/`

| Modul                            | Zweck                                                                                 |
| -------------------------------- | ------------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 Anbieter** mit Zod-Validierung (maßgebliche Quelle)                             |
| `constants/cliTools.ts`          | Register externer CLI-Tools                                                           |
| `constants/routingStrategies.ts` | **19 Routing-Strategien** mit Prioritäten                                             |
| `constants/publicApiRoutes.ts`   | Routen, die Bearer-Authentifizierung (statt Verwaltungs-Authentifizierung) erfordern  |
| `constants/upstreamHeaders.ts`   | Sperrliste für Header von Upstream-Anfragen                                           |
| `validation/schemas.ts`          | ~80 Zod-Schemas (einzige maßgebliche Quelle für API-Verträge)                         |
| `validation/helpers.ts`          | Hilfsfunktionen für die Zod-Validierung (`validateBody` usw.)                         |
| `types/`                         | Gemeinsam genutzte TS-Typen                                                           |
| `contracts/`                     | Öffentliche API-Verträge (verwendet von `files:` in `package.json`)                   |
| `utils/circuitBreaker.ts`        | Anbieter-Circuit-Breaker (siehe `docs/architecture/RESILIENCE_GUIDE.md`)              |
| `utils/apiAuth.ts`               | API-Schlüsselvalidierung, Bereichsprüfung                                             |
| `utils/fetchTimeout.ts`          | Timeout-/Abbruch-Wrapper für Upstream-Abrufe                                          |
| `utils/releaseNotes.ts`          | Parser für geschlossene v2-/Legacy-Ankündigungen, Lokalisierung und Verwerfen nach ID |

---

## `open-sse/` — Arbeitsbereich der Streaming-Engine

Separater npm-Arbeitsbereich (`@omniroute/open-sse`). Übernimmt die Anfrageverarbeitung und die Ausführung durch Anbieter.

```
open-sse/
├── handlers/            # 16 Dateien (12 Handler + 4 Hilfsdateien): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search usw.
├── executors/           # 67 anbieterspezifische Executors (erweitern BaseExecutor)
├── translator/          # Formatkonverter (9 für Anfragen, 9 für Antworten, 9 Hilfsdateien)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ Servicemodule (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM usw.)
├── mcp-server/          # MCP-Server (110 Tools, 3 Transports, 33 Scopes)
├── config/              # Anbieter-/Modellregister, Header-Konfiguration, Modellaliase
├── utils/               # TLS-Client, Proxy-Fetch/Dispatcher, Netzwerkhilfen
├── index.ts             # Einstiegspunkt des Arbeitsbereichs
├── package.json         # Manifest des Arbeitsbereichs
├── tsconfig.json        # TS-Konfiguration des Arbeitsbereichs
└── types.d.ts           # Typdeklarationen des Arbeitsbereichs
```

### `open-sse/mcp-server/`

| Pfad                        | Zweck                                                                            |
| --------------------------- | -------------------------------------------------------------------------------- |
| `server.ts`                 | Lebenszyklus des MCP-Servers (stdio- und HTTP-Transports)                        |
| `httpTransport.ts`          | HTTP-Streamable- und SSE-Transports (`/api/mcp/sse`, `/api/mcp/stream`)          |
| `audit.ts`                  | Audit-Protokollierung in der Tabelle `mcp_tool_audit`                            |
| `scopeEnforcement.ts`       | Tool-spezifische Scope-Validierung                                               |
| `runtimeHeartbeat.ts`       | Zustands-Heartbeat an `DATA_DIR/runtime/mcp-heartbeat.json`                      |
| `descriptionCompressor.ts`  | Komprimiert Metadaten von Tool-Beschreibungen, um Kontext zu sparen              |
| `schemas/tools.ts`          | 36 grundlegende Tool-Definitionen + Scopes                                       |
| `tools/advancedTools.ts`    | Implementierungen erweiterter Tools                                              |
| `tools/memoryTools.ts`      | 3 Speicher-Tools (Suchen/Hinzufügen/Löschen)                                     |
| `tools/skillTools.ts`       | 4 Skill-Tools (Auflisten/Aktivieren/Ausführen/Ausführungen)                      |
| `tools/compressionTools.ts` | 5 Komprimierungs-Tools                                                           |
| `README.md`                 | Interne README des MCP-Servers (Querverweis aus `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Desktop-Wrapper

| Datei            | Zweck                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------ |
| `main.js`        | Electron-Hauptprozess (BrowserWindow, eingebetteter Next.js-Server, Tray, automatische Aktualisierung) |
| `preload.js`     | IPC-Bridge (contextBridge → `window.omniroute`)                                                        |
| `package.json`   | electron-builder-Konfiguration + Abhängigkeiten Electron 41 + electron-builder 26.10                   |
| `assets/`        | App-Symbole (Windows .ico, macOS .icns, Linux .png)                                                    |
| `dist-electron/` | Build-Ausgabe (von Git ignoriert)                                                                      |
| `types.d.ts`     | Typdeklarationen für die Renderer-Bridge                                                               |
| `README.md`      | Interne Electron-README (siehe auch `docs/guides/ELECTRON_GUIDE.md`)                                   |

---

## `bin/` — CLI

| Datei                                                                                                       | Zweck                                                                                                                               |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Haupt-CLI-Einstiegspunkt — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` usw. |
| `reset-password.mjs`                                                                                        | Eigenständige CLI zum Zurücksetzen des Passworts                                                                                    |
| `cli/commands/setup.mjs`                                                                                    | Interaktiver und nicht interaktiver Einrichtungsassistent                                                                           |
| `cli/commands/doctor.mjs`                                                                                   | Systemdiagnose (8+ Prüfungen)                                                                                                       |
| `cli/commands/providers.mjs`                                                                                | Anbieter auflisten/testen/validieren                                                                                                |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI-Hilfsmodule                                                                                                                     |
| `cli/tray/tray.ts`                                                                                          | Taskleistenintegration (plattformübergreifend: NotifyIcon unter Windows, systray2 unter macOS/Linux)                                |
| `cli/tray/tray.ps1`                                                                                         | PowerShell-NotifyIcon-Backend (Windows, keine neuen Binärdateien)                                                                   |
| `cli/tray/autostart.ts`                                                                                     | Plattformübergreifender Autostart (LaunchAgent / .desktop / Registrierung)                                                          |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-stufige Auflösungskette für SQLite-Treiber (gebündelt → Laufzeit → verzögerte Installation → node:sqlite → sql.js)                |
| `cli/runtime/magicBytes.mjs`                                                                                | Validierung binärer Magic Bytes (ELF / Mach-O / Mach-O Fat / PE)                                                                    |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — löst Treiber bei der Nachinstallation / beim ersten Start vorab auf                                            |
| `nodeRuntimeSupport.mjs`                                                                                    | Unterstützte Node.js-Version bei der Installation validieren                                                                        |

---

## `skills/` — Öffentliche Agenten-Skills

| Datei                        | Zweck                                                                              |
| ---------------------------- | ---------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 Skill-Manifeste für externe KI-Agenten (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Build- und Prüfskripte

| Skript                              | Zweck                                                                                                        |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | Entwicklungs-/Start-Runner mit Umgebungsvariablen-Hydration                                                  |
| `build-next-isolated.mjs`           | Eigenständiger Build (Next.js 16 Standalone)                                                                 |
| `prepublish.ts`                     | Paketvorbereitung vor `npm pack`                                                                             |
| `postinstall.mjs`                   | Automatisches Erstellen von `.env` aus `.env.example` bei der ersten Installation                            |
| `sync-env.mjs`                      | Erneutes Synchronisieren der Schlüssel in `.env` mit `.env.example`                                          |
| `check-cycles.mjs`                  | Erkennen zirkulärer Abhängigkeiten                                                                           |
| `check-route-validation.mjs`        | Überprüfen, ob alle API-Routen über eine Zod-Validierung verfügen                                            |
| `check-t11-any-budget.mjs`          | Durchsetzen eines expliziten `any`-Budgets pro Datei                                                         |
| `check-docs-sync.mjs`               | Überprüfen der Versionssynchronisierung der Dokumentation (bestehender Pre-Commit-Check)                     |
| **`check-env-doc-sync.mjs`**        | NEU: Abgleich der Umgebungsvariablen im Code mit `.env.example` und `ENVIRONMENT.md`                         |
| **`check-docs-counts-sync.mjs`**    | NEU: Überprüfen, ob Anzahlen (Executors, Strategien, OAuth, A2A-Skills) mit der Dokumentation übereinstimmen |
| **`check-deprecated-versions.mjs`** | NEU: Kennzeichnen veralteter Versionen/Datumsangaben in der Dokumentation                                    |
| `check-supported-node-runtime.ts`   | Überprüfen, ob die aktuelle Node-Version unterstützt wird                                                    |
| `check-pr-test-policy.mjs`          | Durchsetzen der Regel „Tests erforderlich“ bei Änderungen am Produktionscode                                 |
| **`gen-provider-reference.ts`**     | NEU: Automatisches Generieren von `docs/reference/PROVIDER_REFERENCE.md` aus dem Katalog                     |
| `i18n/generate-multilang.mjs`       | Übersetzen von UI-Strings und Dokumentation über Google Translate                                            |
| `i18n_autotranslate.py`             | LLM-basierte Pipeline zur Übersetzung der Dokumentation                                                      |
| `validate_translation.py`           | Überprüfen der Übersetzung für jede Locale                                                                   |
| `check_translations.py`             | Code-seitige Überprüfung der i18n-Schlüssel                                                                  |
| `run-playwright-tests.mjs`          | Playwright-E2E-Runner                                                                                        |
| `run-protocol-clients-tests.mjs`    | MCP/A2A-E2E-Runner                                                                                           |
| `run-ecosystem-tests.mjs`           | Ökosystemtests (Provider-Integration)                                                                        |
| `test-report-summary.mjs`           | Generieren einer Markdown-Zusammenfassung der Testabdeckung                                                  |
| `smoke-electron-packaged.mjs`       | Smoke-Test des paketierten Electron-Builds                                                                   |
| `native-binary-compat.mjs`          | Überprüfen, ob native Abhängigkeiten (`better-sqlite3`) zur Node-Version von Electron passen                 |
| `validate-pack-artifact.ts`         | Überprüfen der Ausgabe von `npm pack`                                                                        |
| `responses-ws-proxy.mjs`            | WebSocket-Bridge für die Codex Responses API                                                                 |
| `v1-ws-bridge.mjs`                  | WebSocket-Bridge für den Endpunkt `/api/v1/ws`                                                               |
| `standalone-server-ws.mjs`          | Eigenständiger WS-Server-Runner                                                                              |
| `system-info.mjs`                   | Ausgeben von System-/Laufzeitinformationen für den Support                                                   |
| `healthcheck.mjs`                   | Einmalige Zustandsprüfung (wird von Docker HEALTHCHECK verwendet)                                            |
| `uninstall.mjs`                     | Skript zur vollständigen Deinstallation                                                                      |

---

## `docs/` — Öffentliche Dokumentation (7 Dateien im Stammverzeichnis + 17 Unterverzeichnisse)

### Übergeordnete Leitfäden

| Dokument                    | Zweck                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Architekturübersicht, Subsystemübersicht, Dashboard-Oberfläche                                          |
| `CODEBASE_DOCUMENTATION.md` | Technische Referenz: Verzeichnisse, Module, Konventionen                                                |
| `FEATURES.md`               | Funktionsmatrix mit den Highlights von v3.8                                                             |
| `USER_GUIDE.md`             | Benutzerhandbuch (Einrichtung, Modelle, Kombinationen, CLIs, Audio usw.)                                |
| `API_REFERENCE.md`          | Referenz der API-Endpunkte einschließlich Authentifizierungsmodell                                      |
| `openapi.yaml`              | OpenAPI-3.0-Spezifikation (121 Pfade)                                                                   |
| `SETUP_GUIDE.md`            | Installationsmethoden (npm, npx, Docker, Electron, Termux, Quellcode)                                   |
| `ENVIRONMENT.md`            | Alle Umgebungsvariablen (~800 dokumentiert, `.env.example` mit ~3.050 Zeilen)                           |
| `TROUBLESHOOTING.md`        | Häufige Fehler + bekannte Probleme in v3.8.0                                                            |
| `RELEASE_CHECKLIST.md`      | Vollständiger Release-Ablauf (Skills, Husky, Conventional Commits, Bereitstellung)                      |
| `COVERAGE_PLAN.md`          | Abdeckungsziele und aktueller Stand                                                                     |
| `FREE_TIERS.md`             | Kuratierte Anbieter mit kostenlosen Tarifen (48+ kostenlos + 11 OAuth)                                  |
| `CLI-TOOLS.md`              | Externe CLI-Integrationen + interne OmniRoute-CLI                                                       |
| `I18N.md`                   | i18n-Architektur, Hinzufügen einer Sprache, 42 Gebietsschemata                                          |
| `UNINSTALL.md`              | Schritte zur vollständigen Deinstallation                                                               |
| `PROVIDER_REFERENCE.md`     | **Automatisch generierter** Katalog mit 355 Anbietern (Regenerierung: `npm run gen:provider-reference`) |

### Vertiefungen zu Subsystemen

| Dokument                                   | Zweck                                                                                     |
| ------------------------------------------ | ----------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                            | MCP-Server: 110 Tools, 3 Transporte, 33 Bereiche, REST-Endpunkte                          |
| `A2A-SERVER.md`                            | A2A v0.3: JSON-RPC, 6 Skills, REST-Hilfsfunktionen, Agentenkarte                          |
| `AGENT_PROTOCOLS_GUIDE.md`                 | Einheitlicher Leitfaden: A2A vs. ACP vs. Cloud-Agenten                                    |
| `CLOUD_AGENT.md`                           | Orchestrierung von Codex Cloud / Devin / Jules                                            |
| `SKILLS.md`                                | Skills-Framework (integriert + Marketplace + SkillsSH + Sandbox)                          |
| `RADAR.md`                                 | Radar-Katalog-Overlay für kostenlose Modelle (`RADAR_ENABLED`, standardmäßig deaktiviert) |
| `MEMORY.md`                                | Speichersystem (SQLite FTS5 + Qdrant)                                                     |
| `EVALS.md`                                 | Evaluierungsframework (Suiten, Durchläufe, Bewertungsraster)                              |
| `GUARDRAILS.md`                            | PII-Maskierung, Prompt-Injection, Vision-Bridge                                           |
| `COMPLIANCE.md`                            | Audit-Protokoll, Aufbewahrung, `noLog`-Opt-out                                            |
| `WEBHOOKS.md`                              | HMAC-signierte Webhook-Zustellung                                                         |
| `REASONING_REPLAY.md`                      | Hybrider Speicher-/SQLite-Cache für `reasoning_content`                                   |
| `AUTHZ_GUIDE.md`                           | Autorisierungspipeline (`classify` → `policies` → `enforce`)                              |
| `RESILIENCE_GUIDE.md`                      | Leistungsschalter + Abklingzeit + Modellsperre                                            |
| `docs/security/STEALTH_GUIDE.md` (nur Git) | TLS-Fingerprinting (JA3/JA4), Claude Code CCH, MITM-Zertifikat                            |
| `AUTO-COMBO.md`                            | Auto-Combo-Engine (Bewertung anhand von 16 Faktoren, 6 Moduspakete, virtuelle Factory)    |

### Komprimierung

| Dokument                        | Zweck                                      |
| ------------------------------- | ------------------------------------------ |
| `COMPRESSION_GUIDE.md`          | Übersicht der Komprimierungsmodi + Roadmap |
| `COMPRESSION_ENGINES.md`        | Caveman- und RTK-Engines, Registry-Vertrag |
| `COMPRESSION_RULES_FORMAT.md`   | JSON-Schema für Caveman-Regelpakete        |
| `COMPRESSION_LANGUAGE_PACKS.md` | Bestand sprachspezifischer Regelpakete     |
| `RTK_COMPRESSION.md`            | Deklarative RTK-Pipeline (49 Filter)       |

### Bereitstellung

| Dokument                     | Zweck                                                               |
| ---------------------------- | ------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker-Build, Profile (base/cli/host/cliproxyapi), Redis-Sidecar    |
| `VM_DEPLOYMENT_GUIDE.md`     | Generische VM-/VPS-Bereitstellung (Ubuntu/Debian + nginx + systemd) |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io-Bereitstellung (derzeit nur auf Chinesisch)                  |
| `TERMUX_GUIDE.md`            | Headless-Betrieb unter Android über Termux                          |
| `PWA_GUIDE.md`               | Installation als Progressive Web App + Service Worker               |
| `ELECTRON_GUIDE.md`          | Desktop-App erstellen + signieren + verteilen                       |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                              |
| `PROXY_GUIDE.md`             | 4-stufiger ausgehender Proxy + 1proxy-Marketplace                   |

### Unterverzeichnisse

| Unterverzeichnis      | Zweck                                                                                                                                                                                                                                                 |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Lokalisierte Übersetzungen der Dokumentation (41 Sprachversionen)                                                                                                                                                                                     |
| `docs/screenshots/`   | Bildressourcen für Anleitungen                                                                                                                                                                                                                        |
| `_tasks/superpowers/` | Pläne/Spezifikationen aus superpowers (`writing-plans`/`brainstorming`) + Recherche — isoliertes, separat versioniertes Repository, das vom Haupt-Repository per gitignore ausgeschlossen wird. Siehe CLAUDE.md → „Planungs- und Rechercheartefakte“. |

---

## `tests/` — Testsammlungen

| Unterverzeichnis                     | Typ                                         | Runner                                    |
| ------------------------------------ | ------------------------------------------- | ----------------------------------------- |
| `tests/unit/`                        | Unit-Tests (~4.800 Dateien, am schnellsten) | Nativer Node-Test-Runner                  |
| `tests/integration/`                 | Modulübergreifende + DB-Integrationstests   | Nativer Node-Test-Runner (Parallelität 1) |
| `tests/e2e/`                         | UI- + Workflow-E2E-Tests                    | Playwright                                |
| `tests/e2e/protocol-clients.test.ts` | MCP- + A2A-E2E-Tests mit realen Clients     | Benutzerdefinierte Protokoll-Clients      |
| `tests/e2e/ecosystem.test.ts`        | Provider-Integration (mit Netzwerkzugriff)  | Nativer Node-Test-Runner                  |

---

## `public/` — Statische Assets

| Pfad                | Zweck                                                           |
| ------------------- | --------------------------------------------------------------- |
| `public/` (Wurzel)  | Favicons, robots.txt, Manifest, Service Worker, Marketingbilder |
| `public/providers/` | Provider-Logos im PNG-/SVG-Format (im Dashboard verwendet)      |

---

## `config/` — Statische Konfigurationen + Quality-Gate-Status

Ausgelieferte Konfigurationsvorlagen sowie die eingecheckten Quality-Gate-Baselines
(in v3.8.26 aus dem Repository-Stammverzeichnis hierher verschoben, um dieses schlank zu halten).

| Pfad                                          | Zweck                                                                                           |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Liste der Gebietsschemata + Metadaten (kanonische Quelle für die Anzahl von 42 Gebietsschemata) |
| `config/i18n-schema.json`                     | JSON-Schema zur Validierung von `i18n.json`                                                     |
| `config/payloadRules.json`                    | Regeln zur Bereinigung von Upstream-Payloads                                                    |
| `config/quality/quality-baseline.json`        | Ratchet-Baseline mit mehreren Metriken (`scripts/quality/check-quality-ratchet.mjs`)            |
| `config/quality/complexity-baseline.json`     | Eingefrorene ESLint-Komplexitätsbaseline (`check-complexity.mjs`)                               |
| `config/quality/duplication-baseline.json`    | Eingefrorene jscpd-Duplikationsbaseline (`check-duplication.mjs`)                               |
| `config/quality/file-size-baseline.json`      | Eingefrorene Baseline für die Größe einzelner Dateien (`check-file-size.mjs`)                   |
| `config/quality/test-discovery-baseline.json` | Eingefrorene Baseline für verwaiste Tests (`check-test-discovery.mjs`)                          |
| `config/quality/dependency-allowlist.json`    | Positivliste genehmigter Abhängigkeiten (`check-deps.mjs`)                                      |
| `config/quality/.license-allowlist.json`      | Positivliste für SPDX-Lizenzen (`check-licenses.mjs`)                                           |
| `config/quality/quality-metrics.json`         | Temporär erfasste Metriken (generiert von `collect-metrics.mjs`; **von Git ignoriert**)         |

---

## `.github/` — GitHub-Integration

| Pfad                               | Zweck                                                               |
| ---------------------------------- | ------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub-Actions-CI/CD-Workflows (Linting, Tests, Abdeckung, Release) |
| `.github/ISSUE_TEMPLATE/`          | Vorlagen für Fehler- und Feature-Issues                             |
| `.github/pull_request_template.md` | PR-Vorlage                                                          |
| `.github/dependabot.yml`           | Konfiguration für Abhängigkeitsaktualisierungen                     |

---

## `.husky/` — Git-Hooks

| Datei        | Zweck                                                                        |
| ------------ | ---------------------------------------------------------------------------- |
| `pre-commit` | Führt `lint-staged + check-docs-sync + check:any-budget:t11` aus             |
| `pre-push`   | Derzeit deaktiviert (auskommentiert). `npm run test:unit` manuell ausführen. |
| `_/`         | Husky-Interna                                                                |

---

## `.claude/` — Slash-Befehle für Claude Code

| Datei                                               | Zweck                                                                   |
| --------------------------------------------------- | ----------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — Version erhöhen + automatisches Änderungsprotokoll |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — vollständiger Release-Workflow                 |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Bereitstellung auf VPS                                                  |
| `commands/capture-release-evidences-cc.md`          | Neue Funktionen im Browser als WebP aufzeichnen                         |
| `commands/review-{prs,discussions}-cc.md`           | GitHub-PRs/-Diskussionen sichten und priorisieren                       |
| `commands/{review-issues,implement-features}-cc.md` | Issue-Workflows                                                         |
| `settings.local.json`                               | Projektspezifische Claude-Code-Einstellungen                            |

---

## `.agents/` — Generische Agenten-Workflows (Codex / Cursor / usw.)

| Pfad                     | Zweck                                                         |
| ------------------------ | ------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 Workflow-Definitionen (Spiegelung von `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 Skill-Definitionen mit Codex-Ausführungshinweisen           |

> **Hinweis:** Workflows und Befehle sind derzeit Byte für Byte identisch. Wenn `.agents/` für eine andere Agentenlaufzeit (Codex) vorgesehen ist, müssen sich die Varianten sinnvoll unterscheiden.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Außerhalb des Projektbaums

Diese mit einem Unterstrich beginnenden Verzeichnisse enthalten Inhalte, die nicht ausgeliefert werden:

- **`_ideia/`** — Designnotizen (Kategorien „defer“ / „notfit“ / „viable“)
- **`_mono_repo/`** — historische Unterprojekte (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — schreibgeschützte Klone verwandter OSS-Projekte (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api usw.) zum projektübergreifenden Nachschlagen während der Entwicklung
- **`_tasks/`** — informelle Dateien zur Aufgabenverfolgung je Release

Nicht in der Ausgabe von `npm pack` enthalten. Siehe `.npmignore`.

---

## Generiert / von Git ignoriert

| Pfad                   | Zweck                        |
| ---------------------- | ---------------------------- |
| `node_modules/`        | npm-Abhängigkeiten           |
| `.next/`               | Next.js-Build-Ausgabe        |
| `coverage/`            | c8-Coverage-Berichte         |
| `logs/`                | Laufzeitprotokolle           |
| `package/`             | Staging für npm pack         |
| `.playwright-mcp/`     | Playwright-MCP-Testartefakte |
| `.issues/`             | Lokaler Issue-Cache          |
| `tsconfig.tsbuildinfo` | Inkrementeller TS-Cache      |

---

## Hinweise zur Navigation

- **Neu im Projekt?** Lies `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Einen Provider hinzufügen?** Folge `docs/architecture/ARCHITECTURE.md § Adding a New Provider` und gleiche die Informationen mit `docs/reference/PROVIDER_REFERENCE.md` ab.
- **Eine Route hinzufügen?** `docs/architecture/ARCHITECTURE.md § Adding a New API Route` + `src/shared/validation/schemas.ts`.
- **Ein MCP-Tool hinzufügen?** `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Einen A2A-Skill hinzufügen?** `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Lokal ausführen?** `docs/guides/SETUP_GUIDE.md`.
- **Bereitstellen?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Eine Veröffentlichung erstellen?** `docs/ops/RELEASE_CHECKLIST.md` (und der Claude-Code-Skill `/generate-release-cc`).
