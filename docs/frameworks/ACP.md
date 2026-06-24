---
title: ACP (Agent Client Protocol)
---

# ACP (Agent Client Protocol)

> **TL;DR**: ACP Agents lets OmniRoute discover local CLI agents (like Claude Code,
> Codex, Gemini CLI) and manage custom agent definitions for the `/dashboard/acp-agents`
> registry.

---

## What Is ACP?

ACP (Agent Client Protocol) is OmniRoute's local CLI-agent registry. It detects installed
agent binaries, records custom agent definitions, and exposes the catalog through
`GET /api/acp/agents` for the dashboard and integrations.

### Why Use ACP?

| Benefit                | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| **No API keys needed** | Uses your existing CLI authentication when an integration runs |
| **Native protocol**    | Records each CLI's intended stdio/http protocol                |
| **Auto-discovery**     | Detects installed CLIs on your system                          |
| **14 built-in agents** | Pre-configured for popular CLI tools                           |
| **Custom agents**      | Add your own CLI tools via settings                            |
| **Safe probes**        | Validates custom version commands before execution             |

---

## Supported CLI Agents

ACP supports **14 built-in CLI agents** out of the box:

| Agent ID      | Display Name       | Binary        | Protocol |
| ------------- | ------------------ | ------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio    |
| `claude`      | Claude Code CLI    | `claude`      | stdio    |
| `goose`       | Goose CLI          | `goose`       | stdio    |
| `gemini-cli`  | Gemini CLI         | `gemini`      | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio    |
| `aider`       | Aider              | `aider`       | stdio    |
| `opencode`    | OpenCode           | `opencode`    | stdio    |
| `cline`       | Cline              | `cline`       | stdio    |
| `qwen-code`   | Qwen Code          | `qwen`        | stdio    |
| `forge`       | ForgeCode          | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio    |
| `interpreter` | Open Interpreter   | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio    |
| `warp`        | Warp AI            | `warp`        | stdio    |

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

### Step 3: Manage ACP Agents

Open `/dashboard/acp-agents` or call `GET /api/acp/agents` to view detected agents.
Use `POST /api/acp/agents` to register custom agents or refresh detection.

---

## How ACP Works

### Architecture

```
┌─────────────────┐
│  OmniRoute      │
│  (ACP API)      │
└────────┬────────┘
         │
         │ version probe
         ▼
┌─────────────────┐
│  CLI Binary     │
│                 │
│  --version ────►│  Detect availability
└─────────────────┘
```

### Detection Lifecycle

1. **Load definitions** — Built-in agents are defined in `src/lib/acp/registry.ts`.
2. **Merge custom agents** — `setCustomAgents()` loads settings-backed custom agents.
3. **Validate probes** — `resolveVersionProbe()` rejects shell metacharacters and mismatched
   custom binaries.
4. **Detect** — `detectInstalledAgents()` runs the safe version probe and caches results for
   60 seconds.
5. **Refresh** — `refreshAgentCache()` clears the cache and runs detection again.

### Communication Protocol

The active ACP module records whether an agent is intended for `stdio` or `http`, but it does not
own a process manager. Runtime integrations that launch an agent should use the registry output and
apply their own lifecycle handling.

---

## API Reference

### Registry Functions

#### `detectInstalledAgents()`

Detects all installed CLI agents on the system. Results are cached for 60 seconds.

```typescript
import { detectInstalledAgents } from "@/lib/acp/registry";

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

#### `setCustomAgents(agents)`

Sets custom agent definitions from settings.

```typescript
import { setCustomAgents } from "@/lib/acp/registry";

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

## Configuration

### Environment Variables

ACP detection inherits the OmniRoute server environment when it runs version probes.

### Spawn Arguments

Each agent has default spawn arguments defined in the registry. Custom agents can provide
`spawnArgs` through `POST /api/acp/agents`.

### Detection Cache

Agent detection is cached for **60 seconds** to avoid expensive filesystem scans. Force refresh:

```typescript
import { refreshAgentCache } from "@/lib/acp/registry";

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

### Resource Usage

- **Memory**: Detection cache stores the current agent list.
- **CPU**: Version probes are short-lived child processes.
- **Disk**: Custom agents are persisted through settings.

---

## Troubleshooting

### CLI Not Detected

**Problem**: `detectInstalledAgents()` doesn't find your CLI

**Solutions**:

1. **Check PATH**: Ensure the CLI is in your system PATH
2. **Check version command**: Run `claude --version` manually
3. **Check permissions**: Ensure the CLI is executable
4. **Custom agent**: Add a custom agent definition for non-standard CLIs

### Version Probe Rejected

**Problem**: `POST /api/acp/agents` rejects a custom `versionCommand`.

**Solutions**:

1. Use the configured binary as the first token.
2. Pass plain arguments only, for example `mycli --version`.
3. Do not use shell metacharacters such as `;`, `&`, `|`, redirects, or command substitution.

### Permission Denied

**Problem**: ACP can't execute the CLI

**Solutions**:

1. **Check file permissions**: `chmod +x /usr/local/bin/claude`
2. **Check ownership**: Ensure OmniRoute has read/execute permissions
3. **Check sandboxing**: System policies may block version probes

---

## Examples

### Example 1: Detect Installed Agents

```typescript
import { detectInstalledAgents } from "@/lib/acp/registry";

const agents = detectInstalledAgents();
const installed = agents.filter((agent) => agent.installed);
```

### Example 2: Refresh Through The REST API

```bash
curl -X POST http://localhost:20128/api/acp/agents \
  -H "Content-Type: application/json" \
  -d '{"action":"refresh"}'
```

### Example 3: Custom Agent

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp/registry";

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
  - `registry.ts` — Agent discovery and registration
