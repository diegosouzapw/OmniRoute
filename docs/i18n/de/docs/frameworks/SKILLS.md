# Skills Framework (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **Maßgebliche Quelle:** `src/lib/skills/` und `src/app/api/skills/`
> **Zuletzt aktualisiert:** 2026-06-28 — v3.8.40

OmniRoute stellt ein erweiterbares Skills-Framework bereit, mit dem Sprachmodelle (und Operatoren) wiederverwendbare Fähigkeiten kombinieren können — vom Lesen aus dem Dateisystem und HTTP-Anfragen bis hin zur Sandbox-Codeausführung und kuratierten Marketplace-Skills.

Ein Skill ist eine versionierte, schemadefinierte Arbeitseinheit. OmniRoute kann Skills als Tool-Definitionen in ausgehende Anfragen einfügen, vom Modell zurückkommende Tool-Aufrufe abfangen, den passenden Handler ausführen und das Ergebnis an das Modell zurückgeben, damit die Konversation fortgesetzt werden kann. Das Modell sieht niemals die Implementierung — nur die Tool-Schnittstelle.

---

## Agent Skills im Vergleich zu Omni Skills

OmniRoute verfügt über zwei eigenständige, aber einander ergänzende Skill-Systeme:

| Dimension          | **Omni Skills** (dieses Dokument)                                       | **Agent Skills**                                                                            |
| :----------------- | :---------------------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| Zweck              | LLM-Tool-Injektion + Sandbox-Ausführung                                 | SKILL.md-Katalog zur Ermittlung und Nutzung durch externe Agenten                           |
| Maßgebliche Quelle | `src/lib/skills/` + Marketplace                                         | `src/lib/agentSkills/` + Verzeichnis `skills/`                                              |
| Laufzeitmodus      | In ausgehende Anfragen eingefügt, bei Tool-Aufrufereignissen ausgeführt | Statischer Markdown-Katalog + REST-/MCP-/A2A-Discovery-Endpunkte                            |
| Verwendet von      | OmniRoute selbst (Combo-Routing, eingehende LLM-Aufrufe)                | Externen Agenten, MCP-Clients, A2A-Orchestratoren                                           |
| Anzahl             | Variabel (Marketplace-gesteuert)                                        | 45 Katalogeinträge (23 API + 21 CLI + 1 Konfiguration)                                      |
| Format             | `SkillDefinition` mit Tool-Schema + Handler                             | `SKILL.md`-Frontmatter + Markdown-Inhalt                                                    |
| Ermittlung         | `/api/skills/*` REST + `omniroute_skills_*` MCP-Tools                   | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP-Tools + A2A `list-capabilities` |

**Omni Skills** sind die Ausführungs-Engine — sie definieren, was OmniRoute _tun kann_, wenn ein LLM ein Tool aufruft.

**Agent Skills** sind der Dokumentationskatalog — sie erklären externen Agenten _wie_ die REST-API und CLI von OmniRoute verwendet werden, und zwar mithilfe strukturierter SKILL.md-Dateien, die direkt in Agent-Prompts eingespeist werden können.

Weitere Informationen zum Agent-Skills-Katalog, Generator, zu den MCP-Tools und zum A2A-Skill finden Sie unter [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md).

---

## Konzepte

### Skill-Quellen

Drei Skill-Quellen existieren gemeinsam in derselben Registry:

1. **Integrierte Skills** (`src/lib/skills/builtins.ts`) — werden mit OmniRoute ausgeliefert. Sie decken die gängigen Anwendungsfälle ab:
   - `file_read`, `file_write` — Sandbox-Arbeitsbereich pro API-Schlüssel unter `<DATA_DIR>/skills/workspaces/<hashed-key>/`
   - `http_request` — ausgehendes HTTP über `safeOutboundFetch` mit `guard: "public-only"`
   - `web_search` — austauschbarer Suchanbieter mit Caching (`executeWebSearch`)
   - `eval_code` — Docker-isolierte Ausführung von `node` oder `python`
   - `execute_command` — Docker-isolierter Shell-Befehl
   - `browser` — Playwright-basiertes Grundgerüst, standardmäßig deaktiviert (`builtin/browser.ts`)
2. **SkillsMP** (der OmniRoute Marketplace) — wird von `https://skillsmp.com/api/v1/skills/search` abgerufen. Erfordert `skillsmpApiKey` in den Einstellungen.
3. **SkillsSH** (`skills.sh`-Community-Katalog) — wird von `https://skills.sh/api/search` abgerufen. Keine Authentifizierung erforderlich; SKILL.md-Inhalte werden direkt aus GitHub Raw geladen.

Ein einzelner „aktiver Anbieter“ steuert, aus welchem Katalog das Dashboard installiert (`src/lib/skills/providerSettings.ts`). Wechseln Sie ihn unter **Einstellungen → Speicher & Skills**. Standard: `skillsmp`.

### Skill-Identität

Skills werden in der In-Memory-Registry (`src/lib/skills/registry.ts`) anhand von `name@version` indiziert. Die Version muss dem semantischen Versionierungsschema entsprechen (`^\d+\.\d+\.\d+$`). `resolveVersion()` unterstützt die Einschränkungen `^`, `~`, `>`, `>=`, `<`, `<=`, `==` sowie exakte Übereinstimmungen.

### Skill-Modus

Jeder Skill verfügt über einen Laufzeitmodus, der steuert, wann er eingefügt wird:

| Modus  | Verhalten                                                                                                                 |
| ------ | ------------------------------------------------------------------------------------------------------------------------- |
| `on`   | Wird immer als Tool-Definition eingefügt                                                                                  |
| `off`  | Wird niemals eingefügt und kann niemals ausgeführt werden                                                                 |
| `auto` | Wird anhand der eingehenden Anfrage bewertet; wird nur eingefügt, wenn die Bewertung ≥ `AUTO_MIN_SCORE` ist (Standard: 3) |

`auto` ist der Standard für über den Marketplace installierte Skills. `enabled=true` und `mode="off"` bedeuten zusammen „registriert, aber inaktiv“ — das Umschalten von `enabled` über die Legacy-Spalte aktualisiert auch `mode`, damit ältere Codepfade konsistent bleiben (`src/app/api/skills/[id]/route.ts`).

### Status (Ausführungen)

Skill-Ausführungen werden in der Tabelle `skill_executions` mit den folgenden Statuswerten nachverfolgt (`src/lib/skills/types.ts`):

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### Registry-Cache

`SkillRegistry` ist ein Singleton mit einem TTL-Cache von 60 Sekunden (`registry.ts:14`). `loadFromDatabase()` ist idempotent und dedupliziert gleichzeitige Aufrufe über `pendingLoad`. Jeder Schreibvorgang (`register`/`unregister`/`unregisterById`) invalidiert den Cache. Versionen können über `getSkillVersions(name)` und `resolveVersion(name, constraint)` nachgeschlagen werden.

### Anbieterabhängige Injektion

`injectSkills()` in `src/lib/skills/injection.ts` ist der Einstiegspunkt, der registrierte Skills in anbieterspezifische Tool-Definitionen umwandelt:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

Der Toolname wird als `name@version` codiert, damit der Handler die richtige Version auswählen kann, wenn das Modell ihn aufruft.

### AUTO-Bewertung

Wenn `mode="auto"` gesetzt ist, wird jede infrage kommende Skill anhand des Anfragekontexts bewertet (`scoreAutoSkill()` in `injection.ts`):

| Signal                                                              | Punkte       |
| ------------------------------------------------------------------- | ------------ |
| Skill-Name erscheint unverändert im Kontext                         | +6           |
| Jedes Namenstoken stimmt mit einem Kontexttoken überein             | +2           |
| Jede Tag-Teilzeichenfolge stimmt mit dem Kontext überein            | +3           |
| Jedes Beschreibungstoken stimmt mit dem Kontext überein             | +1           |
| Hintergrundgrund stimmt mit einem Namenstoken überein               | +2 pro Token |
| Hintergrundgrund stimmt mit einem Tag überein                       | +2 pro Token |
| Anbieterhinweis in Tags stimmt mit dem Anbieter der Anfrage überein | +2 / −2      |

Die besten `AUTO_MAX_SKILLS = 5` Skills mit `score >= AUTO_MIN_SCORE = 3` werden injiziert. Bei Gleichstand wird zuerst nach `installCount` (absteigend) und anschließend nach dem Namen in alphabetischer Reihenfolge sortiert (`injection.ts:225-235`).

### Abfangen von Tool-Aufrufen

`handleToolCallExecution()` in `src/lib/skills/interception.ts` wird vom Chat-Handler aufgerufen, nachdem der vorgelagerte Dienst eine Antwort mit einem Tool-Aufruf zurückgegeben hat:

1. `extractToolCalls()` liest anbieterspezifische Strukturen aus (OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`).
2. Integrierte Tool-Aliasse (z. B. `omniroute_web_search` → `web_search`) werden zuerst aufgelöst. Integrierte Handler werden inline ausgeführt.
3. Alles andere wird über `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` weitergeleitet.
4. Die Ergebnisse werden wieder in die Antwort eingefügt — je nach Bedarf als `tool_results`, `function_call_output`-Elemente oder Anthropic-`tool_result`-Blöcke.

`customSkillExecutionEnabled` kann im Ausführungskontext auf `false` gesetzt werden, um ausschließlich das Abfangen integrierter Tools zuzulassen. Dies wird von Anfragepfaden verwendet, die benutzerdefinierte Handler ausdrücklich deaktivieren.

---

## Docker-Sandbox

Nicht integrierte Codepfade (`eval_code`, `execute_command`) werden über `SandboxRunner` (`src/lib/skills/sandbox.ts`) innerhalb von Docker ausgeführt. Jeder Container wird mit folgenden Optionen gestartet:

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (wenn readOnly=true)
```

Standardwerte (`SandboxRunner.DEFAULT_CONFIG`):

| Feld             | Standardwert    | Hinweise                                                              |
| ---------------- | --------------- | --------------------------------------------------------------------- |
| `cpuLimit`       | 100 (= 0.1 CPU) | Wird vor der Übergabe an `--cpus` durch 1000 geteilt                  |
| `memoryLimit`    | 256 MB          | Festes Limit                                                          |
| `timeout`        | 30000 ms        | Kontrolliertes Beenden über `SIGTERM` + `docker kill`                 |
| `networkEnabled` | `false`         | Wird zu `--network none`                                              |
| `readOnly`       | `true`          | Root-Dateisystem schreibgeschützt; `/tmp` und `/workspace` sind tmpfs |

`SandboxRunner.kill(id)` und `killAll()` stehen zum Herunterfahren zur Verfügung; laufende Container werden in `runningContainers: Map<string, ChildProcess>` nachverfolgt.

### Sandbox-Umgebungsvariablen

Konfiguriert über `process.env` in `src/lib/skills/builtins.ts`:

| Umgebungsvariable                 | Standardwert     | Zweck                                                                                                            |
| --------------------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | Obergrenze für `file_read` und `file_write`                                                                      |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | Obergrenze für den Antworttext von `http_request`                                                                |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | Obergrenze für an den Aufrufer zurückgegebenes stdout/stderr                                                     |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | Standard-Timeout für Sandbox-Befehle; auf 60 s begrenzt                                                          |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | Hauptschalter für ausgehenden Datenverkehr. Auf `1` oder `true` setzen, um die Aktivierung pro Aufruf zuzulassen |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (siehe unten)    | Kommagetrennte Positivliste von Docker-Images                                                                    |

Standardmäßig zulässige Images: `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`. Ergänzungen über `SKILLS_ALLOWED_SANDBOX_IMAGES` werden mit den Standardwerten zusammengeführt; unbekannte Images werden von `normalizeImage()` abgelehnt.

> Hinweis: Es gibt keine separate Umgebungsvariable `SKILLS_EXECUTION_TIMEOUT_MS`. Der Timeout des Nicht-Sandbox-Handlers ist in `SkillExecutor` (`executor.ts:13`) fest auf 30 s eingestellt, kann aber zur Laufzeit über `skillExecutor.setTimeout(ms)` überschrieben werden.

### Workspace-Isolierung

`file_read` und `file_write` lösen jeden Pfad relativ zu einem API-Schlüssel-spezifischen Workspace unter `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/` auf. Pfadtraversierung (`..`) und unzulässige Segmente (`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`) werden vor jeglichem Festplattenzugriff abgelehnt.

### HTTP-Härtung

`http_request` (`builtins.ts:257`):

- Positivliste für Methoden: `GET, HEAD, POST, PUT, PATCH, DELETE`
- Blockierte ausgehende Header: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- Weiterleitungen deaktiviert (`allowRedirect: false`)
- Weiterleitung über `safeOutboundFetch` mit `guard: "public-only"` (private/Loopback-Adressbereiche werden blockiert)
- Antwort wird bei `SKILLS_MAX_HTTP_RESPONSE_BYTES` abgeschnitten; der Client erhält `truncated: true`

---

## Hybrider Executor (Vorschau)

`src/lib/skills/hybrid.ts` definiert einen `HybridExecutor`, der bei jedem Aufruf zwischen `direct`-Ausführung (im Prozess) und `sandbox`-Ausführung entscheidet und bei Zeitüberschreitungs-/Speicherfehlern einen `autoUpgrade`-Wiederholungsmechanismus verwendet. Die eingebundenen Implementierungen `directExecutor` / `sandboxRunner` sind Platzhalter (`executeDirect`, `executeInSandbox` geben Platzhalterobjekte zurück) — betrachten Sie dieses Modul als einen noch in Entwicklung befindlichen Vertrag. Die tatsächliche Ausführung erfolgt weiterhin über `skillExecutor` + `SandboxRunner`.

---

## Speicherung

Das Schema befindet sich in zwei Migrationen:

- `src/lib/db/migrations/016_create_skills.sql` — grundlegende Tabellen `skills` und `skill_executions` mit Indizes auf `(api_key_id, name)` und `(skill_id, status, created_at)`.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — fügt `mode`, `source_provider`, `tags` (JSON) und `install_count` zu `skills` hinzu.

`skill_executions.status` wird auf Datenbankebene eingeschränkt: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST-API

Alle Endpunkte befinden sich unter `src/app/api/skills/`. Verwaltungsendpunkte (`/api/skills`, `/api/skills/[id]`, `/api/skills/install`) erfordern eine **Verwaltungsauthentifizierung** über `requireManagementAuth()`. Die Marketplace-/Installationsabläufe verwenden das weniger strenge `isAuthenticated()` (Sitzung oder API-Schlüssel).

| Endpunkt | Methode | Zweck |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | Registrierte Skills auflisten. Unterstützt `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, Paginierung |
| `/api/skills/[id]` | PUT | `enabled` oder `mode` aktualisieren |
| `/api/skills/[id]` | DELETE | Registrierung anhand der ID aufheben |
| `/api/skills/install` | POST | Einen benutzerdefinierten Skill installieren (Handler-Code + Schema) |
| `/api/skills/marketplace` | GET | Den SkillsMP-Katalog durchsuchen (gibt beliebte Standardeinträge zurück, wenn `q` leer ist) |
| `/api/skills/marketplace/install` | POST | Einen SkillsMP-Skill installieren (erfordert den aktiven Anbieter = `skillsmp`) |
| `/api/skills/skillssh` | GET | Den skills.sh-Katalog durchsuchen (`?q=&limit=`, auf 100 begrenzt) |
| `/api/skills/skillssh/install` | POST | Einen skills.sh-Skill installieren (erfordert den aktiven Anbieter = `skillssh`) |
| `/api/skills/executions` | GET | Paginierter Ausführungsverlauf (`?apiKeyId=`) |
| `/api/skills/executions` | POST | Einen registrierten Skill ad hoc ausführen |

Der Endpunkt `POST /api/skills/executions` gibt HTTP `503` mit `{ error: "Skills execution is disabled..." }` zurück, wenn `settings.skillsEnabled === false` ist (`executor.ts:42-45`). Betreiber können den Hauptschalter unter **Einstellungen → KI** umlegen.

### Beispiel: Einen benutzerdefinierten Skill installieren

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

Die Zeichenfolge `handlerCode` dient zur **Suche nach einem Handler-Namen** — sie ist kein ausführbarer Code. Der Executor ordnet sie über `skillExecutor.registerHandler(name, fn)` zu (`executor.ts:25`). Marketplace-Installationen speichern den Text aus SKILL.md zu Dokumentationszwecken in diesem Feld und leiten die Ausführung über modellgenerierte Tool-Aufrufe. Beliebiger, von Benutzern bereitgestellter Quellcode wird nicht mit `eval` ausgeführt.

---

## MCP-Tools

Vier MCP-Tools kapseln die Skill-Oberfläche (`open-sse/mcp-server/tools/skillTools.ts`). Sie werden beim Start des MCP-Servers automatisch registriert.

| Tool                          | Beschreibung                                                      |
| ----------------------------- | ----------------------------------------------------------------- |
| `omniroute_skills_list`       | Skills auflisten, optionale Filter: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | Einen Skill über `skillId` aktivieren/deaktivieren                |
| `omniroute_skills_execute`    | Einen Skill mit einer Eingabenutzlast ausführen                   |
| `omniroute_skills_executions` | Letzte Ausführungshistorie (Standard: 50, Maximum: 100)           |

Informationen zur Transporteinrichtung und zu Bereichszuweisungen finden Sie unter [MCP-SERVER.md](./MCP-SERVER.md).

---

## A2A-Integration

`src/lib/skills/a2a.ts` exportiert den A2A-Skill-Deskriptor `memory_aware_routing` und eine Hilfsfunktion `registerA2ASkill(registry)`. Benutzerdefinierte A2A-Skills befinden sich in `src/lib/a2a/skills/` und werden über `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) weitergeleitet. Den vollständigen Aufgabenlebenszyklus finden Sie unter [A2A-SERVER.md](./A2A-SERVER.md).

---

## Hinzufügen eines neuen integrierten Skills

1. **Definieren Sie den Handler** in `src/lib/skills/builtins.ts` (oder in einer benachbarten Datei unter `src/lib/skills/builtin/`). Signatur: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **Sandbox-Codepfad?** Rufen Sie `sandboxRunner.run(image, command, env, sandboxConfig({...}))` auf. Verwenden Sie `normalizeImage()` zur Prüfung anhand der Zulassungsliste.
3. **Dateisystempfad?** Leiten Sie ihn immer durch `resolveWorkspacePath(input, context)`, bevor Sie auf den Datenträger zugreifen.
4. **Netzwerkaufruf?** Verwenden Sie `safeOutboundFetch` mit `guard: "public-only"`; bereinigen Sie Header über `sanitizeHeaders()`.
5. **Registrieren Sie den Skill**, indem Sie den Eintrag zu `builtinSkills` hinzufügen (oder beim Start eine Funktion nach dem Muster `registerBrowserSkill(executor)` aufrufen).
6. **Ordnen Sie integrierte Tool-Aliasse zu** (optional) in `BUILTIN_TOOL_ALIASES` (`interception.ts:23`), falls das vorgelagerte Modell einen anderen Namen ausgibt.
7. **Tests** in `src/lib/skills/__tests__/` (Vitest).

---

## Hinzufügen eines benutzerdefinierten (nicht integrierten) Skills

1. Registrieren Sie den Handler beim Prozessstart:
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. Fügen Sie den Skill über `POST /api/skills/install` ein (das Feld `handlerCode` muss dem Namen des registrierten Handlers entsprechen).
3. Setzen Sie `mode` über `PUT /api/skills/[id]` auf `on` oder `auto`.

---

## Hinweise zum Betrieb

- **Hauptschalter:** `settings.skillsEnabled = false` blockiert alle Ausführungen und gibt für `/api/skills/executions` HTTP `503` zurück. Die Registry wird weiterhin geladen.
- **Ausgehenden Datenverkehr sperren:** Lassen Sie `SKILLS_SANDBOX_NETWORK_ENABLED` für vollständig vom Netzwerk isolierte Sandboxen nicht gesetzt (Standard). `networkEnabled: true` pro Aufruf erfordert weiterhin die Freigabe durch den Hauptschalter.
- **Bestimmte Images zulassen:** Setzen Sie `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"`, um die Zulassungsliste zu erweitern.
- **Ausführungen prüfen:** `/dashboard/skills/executions` und `omniroute_skills_executions` fragen beide `skill_executions` ab. Erfolgreiche Ausführungen enthalten `durationMs`; fehlgeschlagene enthalten `errorMessage`.
- **Cache-Invalidierung:** Rufen Sie nach manuellen DB-Änderungen `skillRegistry.invalidateCache()` auf; andernfalls warten Sie 60 s.
- **Anonymer Arbeitsbereich:** Wenn `apiKeyId` leer ist, werden alle Aufrufe demselben Arbeitsbereich `"anonymous"` zugeordnet — Code, der gemeinsame Nutzung berücksichtigt, sollte immer einen echten Schlüssel übergeben.

---

## Ausführungslebenszyklus (v3.8.16+)

Der `SkillExecutor` (`src/lib/skills/executor.ts`) ist ein **Singleton**, das jeden Skill-Aufruf verwaltet. Das Verständnis seines Lebenszyklus ist entscheidend für die Fehlerbehebung bei Zeitüberschreitungen, Wiederholungsversuchen und dem Ausführungsstatus.

### Der 5-stufige Lebenszyklus

```
   execute() aufgerufen
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← in Warteschlange, noch nicht gestartet (DB-Zeile erstellt)
  └──────┬──────┘
         │ Handler starten
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← Handler mit Zeitlimit aufgerufen
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (kein anderer Pfad — vom übergeordneten Prozess beendet)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   DB-Zeile mit Status, Ausgabe und durationMs aktualisiert
```

### Standardkonfiguration

| Einstellung  | Standardwert  | Konfigurierbar über                  |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **Wichtig**: Der Executor ist ein Singleton — der Aufruf von `setTimeout()` wirkt sich global auf alle nachfolgenden Aufrufe aus. Skill-spezifische Zeitlimits werden derzeit nicht unterstützt. Wenn Sie für einzelne Skills unterschiedliche Zeitlimits benötigen, verwenden Sie separate Prozesse oder erstellen Sie einen Fork des Executors.

### Statuswerte

Aus `src/lib/skills/types.ts`:

```ts
enum SkillStatus {
  PENDING = "pending", // In Warteschlange, noch nicht gestartet
  RUNNING = "running", // Handler aufgerufen
  SUCCESS = "success", // Handler hat eine gültige Ausgabe zurückgegeben
  ERROR = "error", // Handler hat eine Ausnahme ausgelöst
  TIMEOUT = "timeout", // Zeitlimit des Executors überschritten
}
```

> **Hinweis**: Der Status `TIMEOUT` ist im Enum definiert, wird von der aktuellen Executor-Implementierung jedoch **nicht tatsächlich in die DB geschrieben** — Zeitüberschreitungen werden als `ERROR` mit der Meldung `"Skill execution timed out"` ausgegeben. Der Statuswert im Enum ist für die zukünftige Verwendung reserviert.

### Ausführungen untersuchen

```ts
import { skillExecutor } from "omniroute/skills/executor";

// Eine bestimmte Ausführung anhand ihrer ID abrufen
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// Kürzlich erfolgte Ausführungen für einen API-Schlüssel auflisten
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// Gesamtzahl der Ausführungen zählen
const total = skillExecutor.countExecutions("api-key-id");
```

### Wiederholungsverhalten

Die Einstellung `maxRetries` wird gespeichert, aber von der Methode `execute()` des Executors **derzeit nicht verwendet** — sie führt nur einen einzigen Versuch aus. Der Wert `maxRetries` wird für eine zukünftige Implementierung und für Hooks bereitgestellt, die ihn auslesen möchten.

Derzeit müssen Wiederholungsversuche innerhalb des Skill-Handlers selbst implementiert werden. Integrierte
Skills werden beim Executor registriert (z. B. `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)` in `src/lib/skills/builtin/`); jeder von Ihnen
registrierte Handler kann eine eigene Wiederholungsschleife einschließen:

```ts
// innerhalb eines Skill-Handlers
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode im Detail

Das `SkillMode`-Enum (`src/lib/skills/types.ts`) steuert, **wann und wie** Skills aufgerufen werden:

```ts
enum SkillMode {
  AUTO = "auto", // Das LLM entscheidet, wann der Skill aufgerufen wird
  MANUAL = "manual", // Wird nur durch eine ausdrückliche Benutzeranfrage aufgerufen
  HYBRID = "hybrid", // AUTO-Bewertung + manuelle Übersteuerung
}
```

> **Hinweis**: Die Codebasis definiert `SkillMode` (AUTO/MANUAL/HYBRID), während das Feld `Skill.mode` eine andere Form verwendet (`"on" | "off" | "auto"`). Sie stehen miteinander in Beziehung, sind aber nicht identisch — `SkillMode` ist für die Ausführungsrichtlinie vorgesehen, `Skill.mode` für die Aktivierung einzelner Skills.

### Wann welcher Modus verwendet werden sollte

| Modus    | LLM-Verhalten                                                                                     | Anwendungsfall                                              |
| -------- | ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `AUTO`   | Das LLM kann den Skill aufrufen, wenn es dies für erforderlich hält                               | Allgemeine Skills (Dateien lesen, HTTP-Anfragen)            |
| `MANUAL` | Das LLM kann den Skill nicht aufrufen; nur ein expliziter `executeSkill`-API-Aufruf führt ihn aus | Vertrauliche Vorgänge (Datenbankschreibvorgänge, Zahlungen) |
| `HYBRID` | Das LLM kann den Skill vorschlagen; der Benutzer muss ihn bestätigen                              | Skills mit Nebenwirkungen, die jedoch nicht gefährlich sind |

### AUTO-Bewertung

Wenn der Modus `AUTO` aktiv ist, wird jeder infrage kommende Skill anhand des
Anfragekontexts durch `scoreAutoSkill()` in `src/lib/skills/injection.ts` bewertet — mittels eines additiven
Ganzzahl-Punktesystems (Übereinstimmung mit dem Skill-Namen, Token-Überschneidungen bei Name/Tag/Beschreibung,
Hinweise aus Hintergrundgründen, Bonus/Abzug für Anbieterhinweise). Die besten
`AUTO_MAX_SKILLS = 5` Skills mit `score >= AUTO_MIN_SCORE = 3` werden als
aufrufbare Tools eingebunden; Gleichstände werden zunächst nach `installCount` und anschließend nach Name aufgelöst. Die vollständige Punktetabelle finden Sie
weiter oben in diesem Dokument unter [**Tool-Schema-Generierung → AUTO-Bewertung**](#auto-scoring);
es gibt weder einen Fließkomma-Schwellenwert im Stil von `0.6` noch eine Bewertung in `registry.ts`.

---

## Katalog integrierter Skills

OmniRoute enthält eine kuratierte Auswahl integrierter Skills in `src/lib/skills/builtin/`. Die gebräuchlichsten sind:

### Skill zur Browserautomatisierung

Der Browser-Skill (`src/lib/skills/builtin/browser.ts`) stellt über Playwright/Puppeteer eine Headless-Browserautomatisierung bereit. **Er ist implementiert, aber nicht im standardmäßigen Skill-Katalog enthalten** — um ihn zu verwenden, installieren Sie das Browser-Erweiterungs-Plugin separat.

```ts
// In Ihrer Konfiguration aktivieren
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // Immer einen expliziten Aufruf verlangen
  allowedSkills: ["browser"],
  timeout: 60000, // 60 s für das Laden von Seiten
  maxRetries: 1,
};
```

### Weitere integrierte Kategorien

| Kategorie      | Skills                                        | Modus  |
| -------------- | --------------------------------------------- | ------ |
| Datei-E/A      | `file_read`, `file_write`                     | AUTO   |
| HTTP           | `http_request`                                | AUTO   |
| Suche          | `web_search`                                  | AUTO   |
| Codeausführung | `eval_code` (JavaScript/Python in Sandbox)    | HYBRID |
| System         | `execute_command` (CLI-Ausführung in Sandbox) | MANUAL |

### Hinzufügen eines benutzerdefinierten Skills

Wie Sie über das Plugin-System einen benutzerdefinierten Skill hinzufügen, erfahren Sie unter [Plugin-SDK und Skill-Integration](./PLUGIN_SDK.md).

---

## Siehe auch

- [MCP-SERVER.md](./MCP-SERVER.md) — Registrierung von MCP-Tools und Transporte
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A-Aufgabenlebenszyklus und Skill-Weiterleitung
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — Einführung für Benutzer
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — Anfrageverarbeitung und Komponentenübersicht
- Quellcode: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- Tests: `src/lib/skills/__tests__/integration.test.ts`
