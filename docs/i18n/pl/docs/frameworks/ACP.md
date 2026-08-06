---
title: ACP (Agent Client Protocol)
---

# ACP (Agent Client Protocol)

> **TL;DR**: ACP pozwala OmniRoute uruchamiać agentów CLI (np. Claude Code, Codex) jako procesy potomne zamiast korzystać z API HTTP. Daje to transport typu „CLI-as-backend”.

---

## Czym jest ACP?

ACP (Agent Client Protocol) to transport **"CLI-as-backend"** dla OmniRoute. Zamiast przechwytywać wywołania HTTP API do dostawców AI, ACP **uruchamia agentów CLI jako procesy potomne** i przekazuje prompty przez ich natywny interfejs.

### Po co używać ACP?

| Korzyść                    | Opis                                                |
| -------------------------- | --------------------------------------------------- |
| **Bez kluczy API**         | Korzysta z istniejącego uwierzytelniania CLI        |
| **Natywny protokół**       | Używa natywnego formatu wejścia/wyjścia każdego CLI |
| **Auto-wykrywanie**        | Wykrywa zainstalowane CLI w systemie                |
| **13 wbudowanych agentów** | Wstępnie skonfigurowane popularne narzędzia CLI     |
| **Własne agenty**          | Dodawanie własnych narzędzi CLI w ustawieniach      |
| **Zarządzanie procesami**  | Obsługa cyklu życia (spawn, send, kill)             |

---

## Obsługiwane agenty CLI

ACP obsługuje **13 wbudowanych agentów CLI** od razu po instalacji:

| Agent ID      | Display Name       | Binary        | Protocol |
| ------------- | ------------------ | ------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio    |
| `claude`      | Claude Code CLI    | `claude`      | stdio    |
| `goose`       | Goose CLI          | `goose`       | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio    |
| `aider`       | Aider              | `aider`       | stdio    |
| `opencode`    | OpenCode           | `opencode`    | stdio    |
| `cline`       | Cline              | `cline`       | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio    |
| `forge`       | ForgeCode          | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio    |
| `interpreter` | Open Interpreter   | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio    |
| `warp`        | Warp AI            | `warp`        | stdio    |

### Własne agenty

Możesz dodać własne agenty CLI w ustawieniach. Własne agenty obsługują te same funkcje co wbudowane.

---

## Szybki start

### Krok 1: Zainstaluj agenta CLI

```bash
# Example: Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

### Krok 2: Auto-wykrywanie ACP

ACP automatycznie wykrywa zainstalowane agenty CLI w systemie. Konfiguracja nie jest wymagana!

### Krok 3: Użyj transportu ACP

Po wykryciu ACP może służyć jako transport dla dowolnego obsługiwanego providera. OmniRoute automatycznie użyje ACP, gdy CLI jest dostępne.

---

## Jak działa ACP

### Architektura

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP Proxy)   │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  Child Process  │
│  (CLI Agent)    │
│                 │
│  stdin  ◄──────┤  Send prompt
│  stdout ──────►│  Receive response
│  stderr ──────►│  Receive errors
└─────────────────┘
```

### Cykl życia procesu

1. **Spawn** — ACP tworzy proces potomny dla agenta CLI
2. **Send** — ACP zapisuje prompty na stdin procesu
3. **Receive** — ACP odczytuje odpowiedzi z stdout/stderr
4. **Idle Detection** — ACP czeka 2 sekundy bez aktywności, zanim uzna odpowiedź za kompletną
5. **Kill** — ACP kończy proces (SIGTERM, potem SIGKILL po 5 s)

### Protokół komunikacji

ACP używa **stdio** (standardowe wejście/wyjście) do komunikacji z agentami CLI. Protokół wygląda tak:

1. **Send prompt** — zapis na stdin z znakiem nowej linii
2. **Wait for response** — odczyt z stdout aż do stanu idle (2 s bez wyjścia)
3. **Timeout** — domyślnie 120 sekund (konfigurowalne)

---

## Referencja API

### Funkcje rejestru

#### `detectInstalledAgents()`

Wykrywa wszystkie zainstalowane agenty CLI w systemie. Wyniki są cache'owane przez 60 sekund.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Returns: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // e.g., "codex", "claude"
  name: string; // Display name
  binary: string; // Binary name to spawn
  versionCommand: string; // Version detection command
  version: string | null; // Detected version (null if not installed)
  installed: boolean; // Whether the agent is installed
  providerAlias: string; // Provider ID in OmniRoute
  spawnArgs: string[]; // Arguments to pass when spawning
  protocol: "stdio" | "http"; // Communication protocol
  isCustom?: boolean; // Whether this is a user-defined custom agent
}
```

#### `getAvailableAgents()`

Zwraca tylko te agenty, które są zainstalowane i dostępne dla ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Returns: CliAgentInfo[] (only installed agents)
```

#### `getAgentById(id)`

Pobiera konkretnego agenta po ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Returns: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Ustawia definicje własnych agentów z ustawień.

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

### Funkcje managera

#### `acpManager.spawn(agentId, binary, args, env)`

Uruchamia nowy proces agenta CLI.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* custom env vars */
});
// Returns: AcpSession
```

**Dozwolone ID agentów**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Wysyła prompt do agenta CLI i zbiera odpowiedź.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 2 minutes timeout
);
// Returns: Promise<string>
```

#### `acpManager.kill(sessionId)`

Kończy sesję i sprząta zasoby.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Returns: boolean
```

#### `acpManager.getActiveSessions()`

Zwraca wszystkie aktywne sesje.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Returns: AcpSession[]
```

#### `acpManager.killAll()`

Kończy wszystkie sesje.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Interfejs sesji

```typescript
interface AcpSession {
  id: string; // Unique session ID
  agentId: string; // Agent ID (e.g., "claude")
  process: ChildProcess; // Child process handle
  alive: boolean; // Whether the process is alive
  stdoutBuffer: string; // Accumulated stdout buffer
  stderrBuffer: string; // Accumulated stderr buffer
  createdAt: Date; // Created timestamp
}
```

### Zdarzenia

`AcpManager` rozszerza `EventEmitter` i emituje następujące zdarzenia:

#### `stdout`

Emitowane, gdy agent CLI pisze na stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Emitowane, gdy agent CLI pisze na stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Emitowane, gdy proces agenta CLI kończy działanie.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Emitowane, gdy proces agenta CLI zgłasza błąd.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Konfiguracja

### Zmienne środowiskowe

ACP dziedziczy wszystkie zmienne środowiskowe z procesu nadrzędnego i może je rozszerzać o własne:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Argumenty spawn

Każdy agent ma domyślne argumenty spawn zdefiniowane w rejestrze. Możesz je nadpisać:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Timeouty

Domyślny timeout promptu to **120 sekund** (2 minuty). Możesz go nadpisać:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutes
```

### Cache wykrywania

Wykrywanie agentów jest cache'owane przez **60 sekund**, aby uniknąć kosztownych skanów systemu plików. Wymuszenie odświeżenia:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Bezpieczeństwo

### Zapobieganie wstrzykiwaniu poleceń

ACP waliduje polecenia wersji, aby zapobiec atakom typu command injection:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Polecenia wersji zawierające te znaki są odrzucane:

- `;` — separator poleceń
- `&` — proces w tle
- `|` — potok (pipe)
- `<`, `>` — przekierowanie
- `` ` `` — podstawienie polecenia
- `$` — rozwijanie zmiennych
- `\r`, `\n` — znaki nowej linii

### Walidacja nazwy binarki

ACP sprawdza, czy binarka w poleceniu wersji zgadza się z oczekiwaną nazwą binarki (chyba że to własny agent).

### Izolacja procesów

Każda sesja ACP działa we własnym procesie potomnym. Proces jest zabijany, gdy sesja się kończy lub wygasa timeout.

---

## Wydajność

### Wydajność wykrywania

- **Pierwsze wywołanie**: ~50–200 ms (uruchamia polecenie `version` dla każdego agenta)
- **Wywołania z cache**: <1 ms (zwrot z cache)
- **TTL cache**: 60 sekund

### Wydajność promptów

- **Spawn**: ~50–100 ms
- **Send prompt**: ~10–50 ms
- **Oczekiwanie na odpowiedź**: zależy od agenta CLI (zazwyczaj 1–30 sekund)
- **Kill**: ~5 sekund (SIGTERM) + natychmiast (SIGKILL)

### Zużycie zasobów

- **Pamięć na sesję**: ~10–50 MB (zależnie od agenta CLI)
- **CPU**: minimalne (ograniczone I/O)
- **Dysk**: brak

---

## Rozwiązywanie problemów

### Błąd „Unknown agent”

**Problem**: `acpManager.spawn()` rzuca `Unknown agent: <id>`

**Rozwiązanie**: W `spawn()` dozwolone są tylko te agenty:

- `claude`
- `codex`
- `gemini`
- `qwen`

Pozostałe agenty trzeba uruchamiać ręcznie albo przez definicje własnych agentów.

### Błąd „Session not alive”

**Problem**: `acpManager.sendPrompt()` rzuca `Session ${sessionId} is not alive`

**Rozwiązanie**: Sesja mogła się zakończyć lub zostać zabita. Sprawdź status sesji:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Re-spawn the session
  acpManager.spawn("claude", "claude", [], {});
}
```

### Błąd „ACP timeout”

**Problem**: `acpManager.sendPrompt()` rzuca `ACP timeout after 120000ms`

**Rozwiązanie**: Zwiększ timeout:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutes
```

### CLI nie wykryte

**Problem**: `detectInstalledAgents()` nie znajduje Twojego CLI

**Rozwiązania**:

1. **Sprawdź PATH**: upewnij się, że CLI jest w systemowym PATH
2. **Sprawdź polecenie wersji**: uruchom ręcznie `claude --version`
3. **Sprawdź uprawnienia**: upewnij się, że CLI jest wykonywalne
4. **Własny agent**: dodaj definicję własnego agenta dla niestandardowych CLI

### Brak uprawnień (Permission Denied)

**Problem**: ACP nie może uruchomić CLI

**Rozwiązania**:

1. **Sprawdź uprawnienia pliku**: `chmod +x /usr/local/bin/claude`
2. **Sprawdź właściciela**: upewnij się, że OmniRoute ma uprawnienia odczytu/wykonania
3. **Sprawdź SELinux/AppArmor**: mogą blokować tworzenie procesów

---

## Przykłady

### Przykład 1: Uruchomienie i użycie Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Detect installed agents
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Spawn a new session
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // Send a prompt
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // Clean up
  acpManager.kill(session.id);
}
```

### Przykład 2: Auto-wykrywanie z fallbackiem

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Try Claude first, fallback to Codex
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

### Przykład 3: Własny agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// Register a custom CLI agent
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

// Now detectInstalledAgents() will include "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## Co dalej?

- **[Referencja API](../reference/API_REFERENCE.md)** — endpointy REST API
- **[Referencja providerów](../reference/PROVIDER_REFERENCE.md)** — wszystkie 329 wpisów providerów
- **[Serwer MCP](./MCP-SERVER.md)** — integracja Model Context Protocol
- **[Serwer A2A](./A2A-SERVER.md)** — protokół Agent-to-Agent
- **[Cloud Agent](./CLOUD_AGENT.md)** — agenty chmurowe

---

## Odnośniki

- [Projekt AionUi](https://github.com/iOfficeAI/AionUi) — inspiracja dla auto-wykrywania ACP
- [Kod źródłowy ACP](../../src/lib/acp/) — szczegóły implementacji
  - `manager.ts` — zarządzanie cyklem życia procesów
  - `registry.ts` — odkrywanie i rejestracja agentów
  - `index.ts` — publiczne eksporty API
