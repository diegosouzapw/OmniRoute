# ACP (Agent Client Protocol) (Deutsch)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **TL;DR**: Mit ACP kann OmniRoute CLI-Agenten (wie Claude Code oder Codex) als untergeordnete Prozesse starten, anstatt HTTP-APIs zu verwenden. Dadurch erhalten Sie einen „CLI-as-Backend“-Transport.

---

## Was ist ACP?

ACP (Agent Client Protocol) ist ein **„CLI-as-Backend“-Transport** für OmniRoute. Anstatt HTTP-API-Aufrufe an KI-Anbieter abzufangen, **startet ACP CLI-Agenten als untergeordnete Prozesse** und übermittelt Prompts über deren native Schnittstelle.

### Warum ACP verwenden?

| Vorteil                          | Beschreibung                                               |
| -------------------------------- | ---------------------------------------------------------- |
| **Keine API-Schlüssel benötigt** | Verwendet Ihre bestehende CLI-Authentifizierung            |
| **Natives Protokoll**            | Verwendet das native Ein-/Ausgabeformat der jeweiligen CLI |
| **Automatische Erkennung**       | Erkennt auf Ihrem System installierte CLIs                 |
| **15 integrierte Agenten**       | Für beliebte CLI-Tools vorkonfiguriert                     |
| **Benutzerdefinierte Agenten**   | Fügen Sie über die Einstellungen eigene CLI-Tools hinzu    |
| **Prozessverwaltung**            | Verwaltet den Lebenszyklus (Starten, Senden, Beenden)      |

---

## Unterstützte CLI-Agenten

ACP unterstützt standardmäßig **15 integrierte CLI-Agenten**:

| Agenten-ID    | Anzeigename        | Binärdatei    | Protokoll |
| ------------- | ------------------ | ------------- | --------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio     |
| `claude`      | Claude Code CLI    | `claude`      | stdio     |
| `goose`       | Goose CLI          | `goose`       | stdio     |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio     |
| `aider`       | Aider              | `aider`       | stdio     |
| `opencode`    | OpenCode           | `opencode`    | stdio     |
| `cline`       | Cline              | `cline`       | stdio     |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio     |
| `forge`       | ForgeCode          | `forge`       | stdio     |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio     |
| `interpreter` | Open Interpreter   | `interpreter` | stdio     |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio     |
| `warp`        | Warp AI            | `warp`        | stdio     |
| `gemini`      | Gemini CLI         | `gemini`      | stdio     |
| `zcode`       | ZCode              | `zcode`       | stdio     |

### Benutzerdefinierte Agenten

Sie können über die Einstellungen eigene CLI-Agenten hinzufügen. Benutzerdefinierte Agenten unterstützen dieselben Funktionen wie integrierte Agenten.

---

## Schnellstart

### Schritt 1: Einen CLI-Agenten installieren

```bash
# Beispiel: Claude Code CLI installieren
npm install -g @anthropic-ai/claude-code

# Installation überprüfen
claude --version
```

### Schritt 2: Automatische ACP-Erkennung

ACP erkennt auf Ihrem System installierte CLI-Agenten automatisch. Es ist keine Konfiguration erforderlich!

### Schritt 3: ACP-Transport verwenden

Nach der Erkennung kann ACP als Transport für jeden unterstützten Anbieter verwendet werden. OmniRoute verwendet ACP automatisch, wenn die CLI verfügbar ist.

---

## Funktionsweise von ACP

### Architektur

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP-Proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│ Untergeordneter │
│ Prozess         │
│ (CLI-Agent)     │
│                 │
│  stdin  ◄──────┤  Prompt senden
│  stdout ──────►│  Antwort empfangen
│  stderr ──────►│  Fehler empfangen
└─────────────────┘
```

### Prozesslebenszyklus

1. **Starten** — ACP erstellt einen untergeordneten Prozess für den CLI-Agenten
2. **Senden** — ACP schreibt Prompts in stdin des Prozesses
3. **Empfangen** — ACP liest Antworten aus stdout/stderr
4. **Inaktivitätserkennung** — ACP wartet 2 Sekunden ohne Aktivität, bevor die Antwort als vollständig betrachtet wird
5. **Beenden** — ACP beendet den Prozess (SIGTERM, anschließend SIGKILL nach 5 Sekunden)

### Kommunikationsprotokoll

ACP verwendet **stdio** (Standardeingabe/-ausgabe) für die Kommunikation mit CLI-Agenten. Das Protokoll funktioniert folgendermaßen:

1. **Prompt senden** — Mit einem Zeilenumbruch in stdin schreiben
2. **Auf Antwort warten** — Aus stdout lesen, bis Inaktivität eintritt (2 Sekunden ohne Ausgabe)
3. **Zeitüberschreitung** — Standardmäßig 120 Sekunden (konfigurierbar)

---

## API-Referenz

### Registry-Funktionen

#### `detectInstalledAgents()`

Erkennt alle auf dem System installierten CLI-Agenten. Die Ergebnisse werden 60 Sekunden lang zwischengespeichert.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Gibt zurück: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // z. B. "codex", "claude"
  name: string; // Anzeigename
  binary: string; // Name der auszuführenden Binärdatei
  versionCommand: string; // Befehl zur Versionserkennung
  version: string | null; // Erkannte Version (null, falls nicht installiert)
  installed: boolean; // Gibt an, ob der Agent installiert ist
  providerAlias: string; // Anbieter-ID in OmniRoute
  spawnArgs: string[]; // Beim Start zu übergebende Argumente
  protocol: "stdio" | "http"; // Kommunikationsprotokoll
  isCustom?: boolean; // Gibt an, ob dies ein benutzerdefinierter Agent ist
}
```

#### `getAvailableAgents()`

Ruft nur die Agenten ab, die installiert und für ACP verfügbar sind.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Gibt zurück: CliAgentInfo[] (nur installierte Agenten)
```

#### `getAgentById(id)`

Ruft einen bestimmten Agenten anhand seiner ID ab.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Gibt zurück: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Legt benutzerdefinierte Agentendefinitionen aus den Einstellungen fest.

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### Manager-Funktionen

#### `acpManager.spawn(agentId, binary, args, env)`

Startet einen neuen CLI-Agentenprozess.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* benutzerdefinierte Umgebungsvariablen */
});
// Gibt zurück: AcpSession
```

**Zulässige Agenten-IDs**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Sendet eine Eingabeaufforderung an einen CLI-Agenten und erfasst die Antwort.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // Zeitüberschreitung nach 2 Minuten
);
// Gibt zurück: Promise<string>
```

#### `acpManager.kill(sessionId)`

Beendet eine Sitzung und führt die Bereinigung durch.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Gibt zurück: boolean
```

#### `acpManager.getActiveSessions()`

Ruft alle aktiven Sitzungen ab.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Gibt zurück: AcpSession[]
```

#### `acpManager.killAll()`

Beendet alle Sitzungen.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Sitzungsschnittstelle

```typescript
interface AcpSession {
  id: string; // Eindeutige Sitzungs-ID
  agentId: string; // Agenten-ID (z. B. "claude")
  process: ChildProcess; // Handle des untergeordneten Prozesses
  alive: boolean; // Gibt an, ob der Prozess aktiv ist
  stdoutBuffer: string; // Akkumulierter stdout-Puffer
  stderrBuffer: string; // Akkumulierter stderr-Puffer
  createdAt: Date; // Erstellungszeitstempel
}
```

### Ereignisse

Der `AcpManager` erweitert `EventEmitter` und löst die folgenden Ereignisse aus:

#### `stdout`

Wird ausgelöst, wenn der CLI-Agent in stdout schreibt.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Wird ausgelöst, wenn der CLI-Agent in stderr schreibt.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Wird ausgelöst, wenn der CLI-Agentenprozess beendet wird.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Wird ausgelöst, wenn beim CLI-Agentenprozess ein Fehler auftritt.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfiguration

### Umgebungsvariablen

ACP übernimmt alle Umgebungsvariablen des übergeordneten Prozesses und kann um benutzerdefinierte Umgebungsvariablen erweitert werden:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Startargumente

Jeder Agent verfügt über standardmäßige Startargumente, die in der Registry definiert sind. Sie können diese überschreiben:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Zeitüberschreitungen

Die standardmäßige Zeitüberschreitung für Prompts beträgt **120 Sekunden** (2 Minuten). Sie können sie überschreiben:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 Minuten
```

### Erkennungs-Cache

Die Agentenerkennung wird für **60 Sekunden** zwischengespeichert, um aufwendige Dateisystem-Scans zu vermeiden. So erzwingen Sie eine Aktualisierung:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Sicherheit

### Verhinderung von Befehlsinjektionen

ACP validiert Versionsbefehle, um Angriffe durch Befehlsinjektion zu verhindern:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Versionsbefehle, die diese Zeichen enthalten, werden abgelehnt:

- `;` — Befehlstrennzeichen
- `&` — Hintergrundprozess
- `|` — Pipe
- `<`, `>` — Umleitung
- `` ` `` — Befehlsersetzung
- `$` — Variablenexpansion
- `\r`, `\n` — Zeilenumbrüche

### Validierung des Binärdateinamens

ACP validiert, dass die Binärdatei des Versionsbefehls dem erwarteten Binärdateinamen entspricht (außer bei benutzerdefinierten Agenten).

### Prozessisolierung

Jede ACP-Sitzung wird in einem eigenen untergeordneten Prozess ausgeführt. Der Prozess wird beendet, wenn die Sitzung endet oder das Zeitlimit überschritten wird.

---

## Leistung

### Erkennungsleistung

- **Erster Aufruf**: ~50-200ms (führt für jeden Agenten den Befehl `version` aus)
- **Zwischengespeicherte Aufrufe**: <1ms (Rückgabe aus dem Cache)
- **Cache-TTL**: 60 Sekunden

### Prompt-Leistung

- **Starten**: ~50-100ms
- **Prompt senden**: ~10-50ms
- **Auf Antwort warten**: Hängt vom CLI-Agenten ab (typischerweise 1-30 Sekunden)
- **Beenden**: ~5 Sekunden (SIGTERM) + sofort (SIGKILL)

### Ressourcennutzung

- **Arbeitsspeicher pro Sitzung**: ~10-50MB (hängt vom CLI-Agenten ab)
- **CPU**: Minimal (E/A-gebunden)
- **Festplatte**: Keine

---

## Fehlerbehebung

### Fehler „Unknown agent“

**Problem**: `acpManager.spawn()` löst `Unknown agent: <id>` aus

**Lösung**: In `spawn()` sind nur diese Agenten zulässig:

- `claude`
- `codex`
- `gemini`
- `qwen`

Andere Agenten müssen manuell oder über benutzerdefinierte Agentendefinitionen gestartet werden.

### Fehler „Session not alive“

**Problem**: `acpManager.sendPrompt()` löst `Session ${sessionId} is not alive` aus

**Lösung**: Die Sitzung wurde möglicherweise beendet oder abgebrochen. Überprüfen Sie den Sitzungsstatus:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Sitzung erneut starten
  acpManager.spawn("claude", "claude", [], {});
}
```

### Fehler „ACP timeout“

**Problem**: `acpManager.sendPrompt()` löst `ACP timeout after 120000ms` aus

**Lösung**: Erhöhen Sie die Zeitüberschreitung:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 Minuten
```

### CLI nicht erkannt

**Problem**: `detectInstalledAgents()` findet Ihre CLI nicht

**Lösungen**:

1. **PATH überprüfen**: Stellen Sie sicher, dass sich die CLI im PATH Ihres Systems befindet
2. **Versionsbefehl überprüfen**: Führen Sie `claude --version` manuell aus
3. **Berechtigungen überprüfen**: Stellen Sie sicher, dass die CLI ausführbar ist
4. **Benutzerdefinierter Agent**: Fügen Sie eine benutzerdefinierte Agentendefinition für nicht standardmäßige CLIs hinzu

### Zugriff verweigert

**Problem**: ACP kann die CLI nicht ausführen

**Lösungen**:

1. **Dateiberechtigungen überprüfen**: `chmod +x /usr/local/bin/claude`
2. **Eigentümer überprüfen**: Stellen Sie sicher, dass OmniRoute über Lese- und Ausführungsberechtigungen verfügt
3. **SELinux/AppArmor überprüfen**: Kann das Starten von Prozessen blockieren

---

## Beispiele

### Beispiel 1: Claude Code starten und verwenden

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Installierte Agenten erkennen
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Eine neue Sitzung starten
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Einen Prompt senden
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Ressourcen bereinigen
  acpManager.kill(session.id);
}
```

### Beispiel 2: Automatische Erkennung mit Ausweichlösung

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Zuerst Claude versuchen, andernfalls auf Codex ausweichen
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("No ACP-compatible CLI agent found");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Hello!");

acpManager.kill(session.id);
```

### Beispiel 3: Benutzerdefinierter Agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Einen benutzerdefinierten CLI-Agenten registrieren
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// detectInstalledAgents() enthält nun auch "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Wie geht es weiter?

- **[API-Referenz](../reference/API_REFERENCE.md)** — REST-API-Endpunkte
- **[Anbieterreferenz](../reference/PROVIDER_REFERENCE.md)** — Alle 352 Anbieter
- **[MCP-Server](./MCP-SERVER.md)** — Integration des Model Context Protocol
- **[A2A-Server](./A2A-SERVER.md)** — Agent-to-Agent-Protokoll
- **[Cloud-Agent](./CLOUD_AGENT.md)** — Cloudbasierte Agenten

---

## Referenz

- [AionUi-Projekt](https://github.com/iOfficeAI/AionUi) — Inspiration für die automatische ACP-Erkennung
- [ACP-Quellcode](../../src/lib/acp/) — Implementierungsdetails
  - `manager.ts` — Verwaltung des Prozesslebenszyklus
  - `registry.ts` — Erkennung und Registrierung von Agenten
  - `index.ts` — Exporte der öffentlichen API
