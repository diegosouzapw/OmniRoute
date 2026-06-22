---
title: "ACP (Agent Client Protocol) Integration"
version: 3.8.16
lastUpdated: 2026-06-08
---

# ACP (Agent Client Protocol) Integration

> **TL;DR**: ACP is OmniRoute's "CLI-as-backend" transport. Instead of calling an LLM API, you spawn a local CLI tool (Claude Code, Codex, OpenClaw, Aider, etc.) as a subprocess and exchange messages via JSON-over-stdio. This is how OmniRoute works with subscription-based coding agents.

**Source:** `src/lib/acp/` — registry, manager, and 14 built-in CLI agents

**Related:**

- [ACP.md](./ACP.md) — overview and architecture
- [AGENT_PROTOCOLS_GUIDE.md](./AGENT_PROTOCOLS_GUIDE.md) — A2A / ACP / Cloud comparison
- [CLI_TOKEN.md](../security/CLI_TOKEN.md) — CLI authentication

---

## What is ACP?

ACP is OmniRoute's protocol for **spawning CLI agents as backend services**. Instead of forwarding requests to a remote API, OmniRoute can:

1. **Spawn** a local CLI process (e.g., `claude`, `codex`, `openclaw`)
2. **Pipe JSON messages** to its stdin
3. **Read JSON responses** from its stdout
4. **Manage the lifecycle** of the child process (start, monitor, terminate)

This enables OmniRoute to work with **subscription-based coding agents** that have a CLI but no public API.

```
┌──────────────────────────────────────────────────────────────┐
│  OmniRoute Request                                              │
│    "user": "Refactor the auth module"                            │
│    "model": "auto/coding"                                       │
└────────────────┬─────────────────────────────────────────────────┘
                 │
                 ▼
┌──────────────────────────────────────────────────────────────┐
│  ACP Manager                                                    │
│  - Looks up available CLI agent (e.g., claude-code)            │
│  - Spawns child process: claude --stdio                         │
│  - Pipes request as JSON to stdin                               │
│  - Reads streamed JSON responses from stdout                     │
└────────────────┬─────────────────────────────────────────────────┘
                 │ JSON-over-stdio
                 ▼
┌──────────────────────────────────────────────────────────────┐
│  Claude Code CLI (child process)                                │
│  - Reads JSON request from stdin                                │
│  - Performs the work (LLM calls, file edits, etc.)              │
│  - Writes JSON responses to stdout                              │
│  - Exits when done                                               │
└──────────────────────────────────────────────────────────────┘
```

---

## The 14 Built-in ACP Agents

OmniRoute ships with **14 ready-to-use ACP agents** defined in `src/lib/acp/registry.ts` (AGENT_DEFINITIONS):

| Agent         | CLI tool   | Subscription       | Use case                     |
| ------------- | ---------- | ------------------ | ---------------------------- |
| `claude`      | `claude`   | Claude Pro/Max     | Anthropic's coding agent     |
| `codex`       | `codex`    | ChatGPT Plus/Pro   | OpenAI's coding agent        |
| `gemini-cli`  | `gemini`   | Gemini Advanced    | Google's coding agent        |
| `openclaw`    | `openclaw` | Free / paid        | OmniClaw (omniroute's own)   |
| `aider`       | `aider`    | Bring-your-own key | Open-source pair programming |
| `opencode`    | `opencode` | Free tier          | OpenCode CLI                 |
| `cline`       | `cline`    | Bring-your-own key | VS Code AI assistant         |
| `qwen-code`   | `qwen`     | Alibaba Cloud      | Alibaba's coding agent       |
| `forge`       | `forge`    | Various            | AI engineering platform      |
| `amazon-q`    | `q`        | AWS account        | Amazon's coding agent        |
| `interpreter` | `i`        | Open source        | Open Interpreter             |
| `cursor-cli`  | `cursor`   | Cursor Pro         | Cursor's CLI                 |
| `warp`        | `warp`     | Warp account       | Warp terminal AI             |
| `goose`       | `goose`    | Goose AI platform  | Goose CLI                    |

### Checking Availability

```bash
GET /api/acp/agents
```

Response:

```json
{
  "agents": [
    {
      "id": "claude",
      "name": "Claude Code",
      "cliPath": "claude",
      "installed": true,
      "version": "1.0.42",
      "subscription": "Claude Pro",
      "status": "available"
    },
    {
      "id": "openclaw",
      "name": "OpenClaw",
      "cliPath": "openclaw",
      "installed": false,
      "status": "not_installed"
    }
  ]
}
```

---

## Quick Start

### 1. Install the CLI Tool

For example, Claude Code:

```bash
npm install -g @anthropic-ai/claude-code
# or
brew install claude-code
```

### 2. Authenticate the CLI

Each CLI tool has its own auth flow:

```bash
# Claude Code
claude login

# Codex
codex auth

# OpenClaw
openclaw login
```

### 3. Test the ACP Connection

```bash
# Verify the CLI is reachable
GET /api/acp/agents
```

```json
{
  "id": "claude-code",
  "status": "available",
  "version": "1.0.42",
  "lastHealthCheck": "2026-06-08T12:00:00Z"
}
```

### 4. Send a Request

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "claude-code/claude-sonnet-4-5",
    "messages": [{"role": "user", "content": "Refactor the auth module"}]
  }'
```

OmniRoute will:

1. Resolve `claude-code/...` to the `claude-code` ACP agent
2. Spawn `claude --stdio` as a subprocess
3. Pipe the request to its stdin
4. Stream responses back via SSE

---

## ACP Protocol

> **Important:** All communication with ACP CLI agents must use JSON-RPC 2.0 format. Sending raw text directly (e.g., `echo 'hello world'` piped to the CLI) will fail because the agent expects valid JSON-RPC 2.0 payloads on stdin. Always structure requests as shown below.

### Request Format (OmniRoute → CLI)

Sent as one JSON object per line to the CLI's stdin:

```json
{
  "jsonrpc": "2.0",
  "id": "req-123",
  "method": "chat",
  "params": {
    "model": "claude-sonnet-4-5",
    "messages": [
      { "role": "system", "content": "You are a coding assistant" },
      { "role": "user", "content": "Refactor auth" }
    ],
    "stream": true,
    "tools": [],
    "temperature": 0.7
  }
}
```

### Response Format (CLI → OmniRoute)

Streamed as one JSON object per line on stdout:

**Streaming chunk:**

```json
{
  "jsonrpc": "2.0",
  "id": "req-123",
  "result": {
    "type": "delta",
    "content": "I'll refactor the auth module by..."
  }
}
```

**Tool call:**

```json
{
  "jsonrpc": "2.0",
  "id": "req-123",
  "result": {
    "type": "tool_call",
    "tool": "read_file",
    "arguments": { "path": "/src/auth.ts" }
  }
}
```

**Tool result (OmniRoute → CLI):**

```json
{
  "jsonrpc": "2.0",
  "method": "tool_result",
  "params": {
    "id": "tool-1",
    "result": "export function login() { ... }"
  }
}
```

**Final response:**

```json
{
  "jsonrpc": "2.0",
  "id": "req-123",
  "result": {
    "type": "complete",
    "usage": {
      "prompt_tokens": 1234,
      "completion_tokens": 567,
      "total_tokens": 1801
    }
  }
}
```

**Error:**

```json
{
  "jsonrpc": "2.0",
  "id": "req-123",
  "error": {
    "code": "rate_limit",
    "message": "Subscription quota exhausted"
  }
}
```

---

## Session Lifecycle

> **Note:** ACP session management is handled internally by `src/lib/acp/manager.ts`. Sessions are spawned automatically when a request is routed through an ACP agent (e.g., `model: "claude-code/default"`). There are no dedicated REST endpoints for spawning, sending to, or terminating ACP sessions — the session lifecycle is managed transparently by the request pipeline.

> There is no REST endpoint to terminate a running ACP session. Termination happens automatically via the inactivity timeout, or when the OmniRoute process exits.

### Auto-Timeout

Sessions auto-terminate after **5 minutes** of inactivity (configurable). Long-running tasks (e.g., refactoring a large codebase) may need periodic input to keep alive.

---

## ACP Registry

### Listing Agents

```bash
GET /api/acp/agents
```

Returns all 14 built-in agents with their installation status.

### Registering a Custom Agent

For a CLI tool not in the default registry:

```bash
POST /api/acp/agents
{
  "id": "my-custom-cli",
  "name": "My Custom CLI",
  "cliPath": "/usr/local/bin/mycli",
  "args": ["--stdio", "--auth-token", "..."],
  "versionCommand": "mycli --version",
  "authEnvVar": "MYCLI_TOKEN"
}
```

The new agent is now usable as `model: "my-custom-cli/<model-id>"`.

### Removing a Custom Agent

```bash
DELETE /api/acp/agents?id=my-custom-cli
```

---

## Configuration

### Environment Variables

ACP agents read their auth from environment variables:

| Agent         | Env var                                  | Source           |
| ------------- | ---------------------------------------- | ---------------- |
| `claude-code` | `CLAUDE_CODE_AUTH_TOKEN`                 | `claude login`   |
| `codex`       | `OPENAI_API_KEY` (or `CODEX_AUTH_TOKEN`) | `codex auth`     |
| `openclaw`    | `OPENCLAW_TOKEN`                         | `openclaw login` |
| `aider`       | `OPENAI_API_KEY` or `ANTHROPIC_API_KEY`  | manual           |
| `qwen-code`   | `QWEN_API_KEY`                           | Alibaba Cloud    |

### Configuration

ACP process limits and timeouts are **hardcoded** in `src/lib/acp/manager.ts`. Currently:

- **Concurrent sessions**: Unlimited (managed per-agent)
- **Session timeout**: 5 minutes (default)
- **Health check**: Every 30 seconds
- **Output limits**: Truncated automatically if >1MB

No environment variable overrides are supported. To customize these, modify `src/lib/acp/manager.ts` directly.

---

## Cost & Quota

ACP-spawned agents use the **subscription** of the underlying CLI, not OmniRoute's API key:

| Agent         | Cost model                        |
| ------------- | --------------------------------- |
| `claude-code` | Included in Claude Pro/Max        |
| `codex`       | Included in ChatGPT Plus/Pro      |
| `openclaw`    | Free tier available, or paid      |
| `aider`       | Pay for the underlying LLM (BYOK) |

**OmniRoute tracks usage** but doesn't bill for ACP-spawned sessions.

```bash
# ACP usage appears in /api/usage
GET /api/usage?provider=claude-code
```

---

## Error Handling

### Common Errors

| Error              | Cause                        | Action                            |
| ------------------ | ---------------------------- | --------------------------------- |
| `cli_not_found`    | CLI not installed            | Install the CLI                   |
| `auth_failed`      | Invalid/expired subscription | Re-authenticate                   |
| `quota_exhausted`  | Subscription limit hit       | Wait for reset or upgrade plan    |
| `spawn_failed`     | Process couldn't start       | Check `cliPath` and permissions   |
| `output_truncated` | Output too large             | Output is truncated automatically |

### Retry Strategy

OmniRoute **does not** automatically retry ACP failures. Implement retry at the combo level:

```json
{
  "name": "acp-with-fallback",
  "strategy": "priority",
  "targets": [
    { "provider": "claude-code", "model": "claude-sonnet-4-5", "priority": 1 },
    { "provider": "openai", "model": "gpt-5", "priority": 2 }
  ]
}
```

If `claude-code` fails (quota exhausted, etc.), OmniRoute falls back to OpenAI.

---

## Security

### Process Isolation

ACP-spawned processes:

- Run with **OmniRoute's user privileges** (no privilege escalation)
- Have **limited environment** (only the auth env var is passed)
- Are **sandboxed** via the process model (can't escape)
- Are **timeout-bounded** (no zombie processes)

### Subscription Token Security

ACP auth tokens:

- Stored in **encrypted** form (same as API keys)
- **Never** logged in plaintext
- **Never** sent to the client (only used for child process auth)
- Can be **rotated** via the CLI tool's auth flow

### Rate Limiting

ACP requests are subject to the **same rate limits** as API requests (per-API-key).

To prevent abuse:

```bash
# Per-key rate limit for ACP
POST /api/keys
{
  "name": "acp-only",
  "scopes": ["acp:use"],
  "rateLimit": { "requestsPerMinute": 10 }
}
```

---

## Performance

### Cold Start vs Warm

| State                          | Latency                    |
| ------------------------------ | -------------------------- |
| **Cold start** (first request) | 2-5s (CLI startup)         |
| **Warm** (subsequent requests) | 100-500ms (process reused) |
| **Cached** (idle < 5min)       | < 100ms                    |

ACP agents keep their child processes alive for 2 minutes by default. This is configured in the hardcoded defaults in `src/lib/acp/manager.ts`.

### Throughput

Each ACP session handles **one request at a time**. To increase throughput:

1. **Multiple agents** (run different CLI tools in parallel)
2. **Combo load balancing**:
   ```json
   {
     "strategy": "round-robin",
     "targets": [
       { "provider": "claude-code", "model": "claude-sonnet-4-5" },
       { "provider": "codex", "model": "o3" }
     ]
   }
   ```

### Resource Usage

Each ACP session consumes:

- **1 subprocess** (~50-100 MB RAM per agent)
- **1 CPU core** (varies by model)
- **Network** (only when the CLI makes API calls)

---

## Debugging

### Enable ACP Debug Logging

```bash
# .env
LOG_LEVEL=debug
```

ACP debug output is integrated into the standard OmniRoute logging pipeline.

### Inspect a Live Session

> **Note:** ACP session state is managed internally. There are no dedicated REST endpoints for listing or inspecting sessions. Session information is tracked in memory by `src/lib/acp/manager.ts`.

---

## Adding a Custom ACP Agent

### Step 1: Implement the Protocol

Your CLI must:

1. Read JSON requests from stdin (one per line)
2. Write JSON responses to stdout (one per line)
3. Handle `jsonrpc: "2.0"` format
4. Support `chat` and `tool_result` methods

### Step 2: Register the Agent

```bash
POST /api/acp/agents
{
  "id": "my-cli",
  "name": "My Custom CLI",
  "cliPath": "/usr/local/bin/mycli",
  "args": ["--acp-mode"],
  "versionCommand": "mycli --version",
  "authCommand": "mycli auth",
  "authEnvVar": "MYCLI_TOKEN"
}
```

### Step 3: Test

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "my-cli/default",
    "messages": [{"role": "user", "content": "test"}]
  }'
```

### Step 4: Submit to Marketplace (optional)

If you want others to use your ACP agent, submit it to the OmniRoute ACP registry (planned for v3.9).

---

## See Also

- [ACP.md](./ACP.md) — architecture overview
- [AGENT_PROTOCOLS_GUIDE.md](./AGENT_PROTOCOLS_GUIDE.md) — A2A / ACP / Cloud comparison
- [CLI_TOKEN.md](../security/CLI_TOKEN.md) — CLI auth tokens
- [INTERNAL_API_ROUTES.md](../reference/INTERNAL_API_ROUTES.md) — full ACP API
- [MONITORING_GUIDE.md](../ops/MONITORING_GUIDE.md) — ACP session monitoring
- Source: `src/lib/acp/` (registry + manager; 14 agent definitions in `registry.ts`)
