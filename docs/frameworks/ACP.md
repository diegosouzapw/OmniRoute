---
title: ACP (Agent Client Protocol)
---

# ACP (Agent Client Protocol)

> **TL;DR**: ACP lets OmniRoute spawn CLI agents (like Claude Code, Codex, Gemini CLI) as child processes instead of using HTTP APIs. This gives you "CLI-as-backend" transport.

---

## What Is ACP?

ACP (Agent Client Protocol) is a **"CLI-as-backend" transport** for OmniRoute. Instead of intercepting HTTP API calls to AI providers, ACP **spawns CLI agents as child processes** and feeds prompts through their native interface.

### Why Use ACP?

| Benefit | Description |
|---------|-------------|
| **No API keys needed** | Uses your existing CLI authentication |
| **Native protocol** | Uses each CLI's native input/output format |
| **Auto-discovery** | Detects installed CLIs on your system |
| **14 built-in agents** | Pre-configured for popular CLI tools |
| **Custom agents** | Add your own CLI tools via settings |
| **Process management** | Handles lifecycle (spawn, send, kill) |

---

## Supported CLI Agents

ACP supports **14 built-in CLI agents** out of the box:

| Agent ID | Display Name | Binary | Protocol |
|----------|--------------|--------|----------|
| `codex` | OpenAI Codex CLI | `codex` | stdio |
| `claude` | Claude Code CLI | `claude` | stdio |
| `goose` | Goose CLI | `goose` | stdio |
| `gemini-cli` | Gemini CLI | `gemini` | stdio |
| `openclaw` | OpenClaw | `openclaw` | stdio |
| `aider` | Aider | `aider` | stdio |
| `opencode` | OpenCode | `opencode` | stdio |
| `cline` | Cline | `cline` | stdio |
| `qwen-code` | Qwen Code | `qwen` | stdio |
| `forge` | ForgeCode | `forge` | stdio |
| `amazon-q` | Amazon Q Developer | `q` | stdio |
| `interpreter` | Open Interpreter | `interpreter` | stdio |
| `cursor-cli` | Cursor CLI | `cursor` | stdio |
| `warp` | Warp AI | `warp` | stdio |

### Custom Agents

You can add your own CLI agents via settings. Custom agents support the same features as built-in agents.

---

## Quick Start

### Step 1: Install a CLI Agent

```bash
# Example: Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Verify installation
claude --version
```

### Step 2: ACP Auto-Detection

ACP automatically detects installed CLI agents on your system. No configuration needed!

### Step 3: Use ACP Transport

Once detected, ACP can be used as a transport for any supported provider. OmniRoute will automatically use ACP when the CLI is available.

---

## How ACP Works

### Architecture

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

### Process Lifecycle

1. **Spawn** — ACP creates a child process for the CLI agent
2. **Send** — ACP writes prompts to the process's stdin
3. **Receive** — ACP reads responses from stdout/stderr
4. **Idle Detection** — ACP waits 2 seconds of inactivity before considering the response complete
5. **Kill** — ACP terminates the process (SIGTERM, then SIGKILL after 5s)

### Communication Protocol

ACP uses **stdio** (standard input/output) for communication with CLI agents. The protocol is:

1. **Send prompt** — Write to stdin with a newline
2. **Wait for response** — Read from stdout until idle (2s of no output)
3. **Timeout** — Default 120 seconds (configurable)

---

## API Reference

### Registry Functions

#### `detectInstalledAgents()`

Detects all installed CLI agents on the system. Results are cached for 60 seconds.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// Returns: CliAgentInfo[]

interface CliAgentInfo {
  id: string;                    // e.g., "codex", "claude"
  name: string;                  // Display name
  binary: string;                // Binary name to spawn
  versionCommand: string;        // Version detection command
  version: string | null;        // Detected version (null if not installed)
  installed: boolean;            // Whether the agent is installed
  providerAlias: string;         // Provider ID in OmniRoute
  spawnArgs: string[];           // Arguments to pass when spawning
  protocol: "stdio" | "http";    // Communication protocol
  isCustom?: boolean;            // Whether this is a user-defined custom agent
}
```

#### `getAvailableAgents()`

Gets only the agents that are installed and available for ACP.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// Returns: CliAgentInfo[] (only installed agents)
```

#### `getAgentById(id)`

Gets a specific agent by ID.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// Returns: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

Sets custom agent definitions from settings.

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

### Manager Functions

#### `acpManager.spawn(agentId, binary, args, env)`

Spawns a new CLI agent process.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn(
  "claude",
  "claude",
  ["--print", "--output-format", "json"],
  { /* custom env vars */ }
);
// Returns: AcpSession
```

**Allowed agent IDs**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

Sends a prompt to a CLI agent and collects the response.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000  // 2 minutes timeout
);
// Returns: Promise<string>
```

#### `acpManager.kill(sessionId)`

Kills a session and cleans up.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// Returns: boolean
```

#### `acpManager.getActiveSessions()`

Gets all active sessions.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// Returns: AcpSession[]
```

#### `acpManager.killAll()`

Kills all sessions.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### Session Interface

```typescript
interface AcpSession {
  id: string;                    // Unique session ID
  agentId: string;               // Agent ID (e.g., "claude")
  process: ChildProcess;          // Child process handle
  alive: boolean;                 // Whether the process is alive
  stdoutBuffer: string;           // Accumulated stdout buffer
  stderrBuffer: string;           // Accumulated stderr buffer
  createdAt: Date;                // Created timestamp
}
```

### Events

The `AcpManager` extends `EventEmitter` and emits the following events:

#### `stdout`

Emitted when the CLI agent writes to stdout.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

Emitted when the CLI agent writes to stderr.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

Emitted when the CLI agent process exits.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

Emitted when the CLI agent process errors.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## Configuration

### Environment Variables

ACP inherits all environment variables from the parent process and can be extended with custom env vars:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### Spawn Arguments

Each agent has default spawn arguments defined in the registry. You can override them:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### Timeouts

Default prompt timeout is **120 seconds** (2 minutes). You can override:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutes
```

### Detection Cache

Agent detection is cached for **60 seconds** to avoid expensive filesystem scans. Force refresh:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## Security

### Command Injection Prevention

ACP validates version commands to prevent command injection attacks:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

Version commands containing these characters are rejected:

- `;` — Command separator
- `&` — Background process
- `|` — Pipe
- `<`, `>` — Redirection
- `` ` `` — Command substitution
- `$` — Variable expansion
- `\r`, `\n` — Line breaks

### Binary Name Validation

ACP validates that the version command binary matches the expected binary name (unless it's a custom agent).

### Process Isolation

Each ACP session runs in its own child process. The process is killed when the session ends or times out.

---

## Performance

### Detection Performance

- **First call**: ~50-200ms (runs `version` command for each agent)
- **Cached calls**: <1ms (returns from cache)
- **Cache TTL**: 60 seconds

### Prompt Performance

- **Spawn**: ~50-100ms
- **Send prompt**: ~10-50ms
- **Wait for response**: Depends on CLI agent (typically 1-30 seconds)
- **Kill**: ~5 seconds (SIGTERM) + immediate (SIGKILL)

### Resource Usage

- **Memory per session**: ~10-50MB (depends on CLI agent)
- **CPU**: Minimal (I/O bound)
- **Disk**: None

---

## Troubleshooting

### "Unknown agent" Error

**Problem**: `acpManager.spawn()` throws `Unknown agent: <id>`

**Solution**: Only 4 agents are allowed in `spawn()`:
- `claude`
- `codex`
- `gemini`
- `qwen`

Other agents must be spawned manually or via custom agent definitions.

### "Session not alive" Error

**Problem**: `acpManager.sendPrompt()` throws `Session ${sessionId} is not alive`

**Solution**: The session may have exited or been killed. Check session status:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // Re-spawn the session
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" Error

**Problem**: `acpManager.sendPrompt()` throws `ACP timeout after 120000ms`

**Solution**: Increase the timeout:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 minutes
```

### CLI Not Detected

**Problem**: `detectInstalledAgents()` doesn't find your CLI

**Solutions**:
1. **Check PATH**: Ensure the CLI is in your system PATH
2. **Check version command**: Run `claude --version` manually
3. **Check permissions**: Ensure the CLI is executable
4. **Custom agent**: Add a custom agent definition for non-standard CLIs

### Permission Denied

**Problem**: ACP can't execute the CLI

**Solutions**:
1. **Check file permissions**: `chmod +x /usr/local/bin/claude`
2. **Check ownership**: Ensure OmniRoute has read/execute permissions
3. **Check SELinux/AppArmor**: May block process spawning

---

## Examples

### Example 1: Spawn and Use Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// Detect installed agents
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // Spawn a new session
  const session = acpManager.spawn(
    "claude",
    claude.binary,
    ["--print", "--output-format", "json"]
  );

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

### Example 2: Auto-Discovery with Fallback

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

### Example 3: Custom Agent

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

## What's Next?

- **[API Reference](../reference/API_REFERENCE.md)** — REST API endpoints
- **[Provider Reference](../reference/PROVIDER_REFERENCE.md)** — All 226 providers
- **[MCP Server](./MCP-SERVER.md)** — Model Context Protocol integration
- **[A2A Server](./A2A-SERVER.md)** — Agent-to-Agent protocol
- **[Cloud Agent](./CLOUD_AGENT.md)** — Cloud-based agents

---

## Reference

- [AionUi Project](https://github.com/iOfficeAI/AionUi) — Inspiration for ACP auto-detection
- [ACP Source Code](../../src/lib/acp/) — Implementation details
  - `manager.ts` — Process lifecycle management
  - `registry.ts` — Agent discovery and registration
  - `index.ts` — Public API exports
