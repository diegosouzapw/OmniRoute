---
title: "Agent Protocols Guide"
version: 3.8.0
lastUpdated: 2026-05-13
---

# Agent Protocols Guide

> **Source:** `src/lib/{a2a,acp,cloudAgent}/`, `src/app/api/{a2a,acp,cloud}/`, `src/app/api/v1/agents/`
> **Last updated:** 2026-05-13 — v3.8.0

OmniRoute exposes three different agent-related surfaces. They look similar at first glance but solve different problems. Use this page to pick the right one.

## TL;DR

| Surface                       | Best for                                                                                                                                   | Transport                   | Standard             |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------- | -------------------- |
| **A2A — Agent-to-Agent**      | Cross-agent collaboration with peer agents that speak the A2A protocol                                                                     | JSON-RPC 2.0 over HTTP      | A2A v0.3 (open spec) |
| **ACP — CLI Agents Registry** | Detecting / registering / launching CLI coding agents installed on the user's machine (Cursor, Cline, Codex CLI, Claude Code, Aider, etc.) | HTTP REST                   | OmniRoute-specific   |
| **Cloud Agents**              | Submitting long-running coding tasks to external cloud services (Codex Cloud, Devin, Jules)                                                | HTTP REST + DB-backed tasks | OmniRoute-specific   |

The three are independent — pick any subset.

## Decision Tree

```
Do you need a cloud service to do work outside this machine (Codex Cloud / Devin / Jules)?
├─ YES → Cloud Agents (POST /api/v1/agents/tasks)
└─ NO → Continue
    │
    Do you have a peer agent that speaks A2A and wants to collaborate?
    ├─ YES → A2A (POST /a2a)
    └─ NO → Continue
        │
        Do you need to list / configure CLI coding agents installed locally?
        ├─ YES → ACP (GET /api/acp/agents)
        └─ NO → Use plain /v1/chat/completions
```

## 1. A2A — Agent-to-Agent

**Spec:** [A2A v0.3](https://a2a-protocol.org)
**OmniRoute endpoint:** `POST /a2a` (JSON-RPC 2.0)
**Agent Card:** `GET /.well-known/agent.json`

### When to use

- Building a multi-agent system where OmniRoute is one of the peers
- Exposing OmniRoute's routing intelligence (smart-routing, quota-management, etc.) to agents in frameworks like Google ADK or generic agent meshes
- Wrapping OmniRoute behind a standard discovery + invocation surface

### Methods

- `message/send` — submit a message, receive sync response
- `message/stream` — submit + receive SSE-streamed progress events
- `tasks/get` — read task by ID
- `tasks/cancel` — cancel a running task

### Built-in skills (5)

- `smart-routing` — route a prompt through the optimal combo
- `quota-management` — report per-provider quota state
- `provider-discovery` — list installed providers with capabilities
- `cost-analysis` — estimate cost of a request/conversation
- `health-report` — aggregate breaker/cooldown/lockout state per provider

### Deep dive

See [A2A-SERVER.md](./A2A-SERVER.md) for transport details, agent card structure, task TTL config, and the template for adding new skills.

## 2. ACP — CLI Agents Registry

**OmniRoute endpoint:** `GET /api/acp/agents`
**Source:** `src/lib/acp/{index,manager,registry}.ts`

### What it is

ACP is OmniRoute's **local CLI agent inventory**. It detects which coding CLIs are installed on the host (Cursor, Cline, Claude Code, Codex CLI, Continue, etc.), resolves their versions, and surfaces them to the dashboard so the user can wire each CLI to point at OmniRoute.

This is NOT an external protocol — it's an internal registry that powers the "CLI Tools" UI and the CLI fingerprint tracking (see [CLI-TOOLS.md](../reference/CLI-TOOLS.md)).

### What it does

- Probes the host for installed CLI binaries (uses `which` / `where` per OS)
- Reads each CLI's version (calls `<bin> --version`)
- Optionally accepts user-defined custom agents (binary path + version probe + spawn args)
- Persists custom agents in settings
- Returns the unified list to the dashboard

### REST API

| Endpoint          | Method | Description                                                   | Auth    |
| ----------------- | ------ | ------------------------------------------------------------- | ------- |
| `/api/acp/agents` | GET    | List detected + custom agents (installed/total counts)        | API key |
| `/api/acp/agents` | POST   | Add/update/remove custom agent (action discriminator in body) | API key |

Body shape for POST (`customAgentBodySchema` in `src/app/api/acp/agents/route.ts`):

```json
{
  "action": "add|update|remove",
  "id": "cursor",
  "name": "Cursor",
  "binary": "/usr/local/bin/cursor",
  "versionCommand": "--version",
  "providerAlias": "cursor",
  "spawnArgs": ["--api-base", "http://localhost:20128"],
  "protocol": "stdio"
}
```

### Use cases

- Dashboard "CLI Tools" page lists what's installed and helps you point each at OmniRoute
- Custom agents let power users register internal/proprietary CLIs that OmniRoute doesn't know about by default
- Detection result fuels the `cli-tools` fingerprint matrix

### When NOT to use ACP

- ACP doesn't _run_ tasks. It only detects + configures CLIs. To actually invoke a CLI, you launch it yourself with the env vars OmniRoute provides (`OPENAI_BASE_URL`, `OPENAI_API_KEY`, etc.).

## 3. Cloud Agents

**OmniRoute endpoints:** `/api/v1/agents/tasks/*` (lifecycle) + `/api/cloud/*` (plumbing)
**Source:** `src/lib/cloudAgent/`

### What it is

A uniform interface over third-party cloud coding agents. You submit a prompt + repo URL, OmniRoute dispatches to the right cloud agent, polls status, returns results.

### Supported agents (3, all confirmed in `src/lib/cloudAgent/agents/`)

- `codex-cloud` — OpenAI Codex Cloud
- `devin` — Cognition Devin
- `jules` — Google Jules

### Lifecycle

```
POST /api/v1/agents/tasks
  → BaseAgent.createTask() per agent class
  → external service starts work
  → task row created in DB (cloud_agent_tasks)
  ↓
GET /api/v1/agents/tasks/[id]
  → lazy status sync from provider
  → returns current status + plan + activity log
  ↓
POST /api/v1/agents/tasks/[id]   (action: "approve" | "message" | "cancel")
  → forwards to provider (or marks cancelled locally)
  ↓
DELETE /api/v1/agents/tasks/[id]
  → local cancel
```

### Auth

⚠️ **All `/api/v1/agents/tasks/*` endpoints require management auth** (commit `588a0333`). Bearer-only callers receive 401 since v3.8.0.

### Deep dive

See [CLOUD_AGENT.md](./CLOUD_AGENT.md) for the `CloudAgentBase` contract, per-agent specifics, schema details, and credential plumbing endpoints.

## Comparison: A2A vs Cloud Agents

Both have "long-running tasks" but at different layers:

| Aspect             | A2A                                                                               | Cloud Agents                             |
| ------------------ | --------------------------------------------------------------------------------- | ---------------------------------------- |
| Standard           | Open A2A v0.3                                                                     | OmniRoute-specific                       |
| Where compute runs | Inside OmniRoute (uses configured combos)                                         | External (Codex / Devin / Jules servers) |
| Task duration      | Default TTL 5 min (configurable in `TaskManager`)                                 | Minutes to hours                         |
| Repo-aware         | No (passes prompts only)                                                          | Yes (repo URL + branch)                  |
| Use case           | Cross-agent collab, smart routing as a service                                    | Delegate "implement feature X in repo Y" |
| Auth               | Optional `OMNIROUTE_API_KEY` for `/a2a`; management for `/api/a2a/*` REST helpers | Always management                        |

## Integration Examples

### Discover OmniRoute's A2A capabilities

```bash
curl http://localhost:20128/.well-known/agent.json
```

Returns the Agent Card with all 5 skills, transports, and version.

### Call OmniRoute as an A2A agent

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "message/send",
    "params": {
      "messages": [{"role": "user", "content": "Route this prompt"}],
      "skillId": "smart-routing"
    },
    "id": 1
  }'
```

### List installed CLI agents via ACP

```bash
curl http://localhost:20128/api/acp/agents \
  -H "Authorization: Bearer <api-key>"
```

### Add a custom CLI agent

```bash
curl -X POST http://localhost:20128/api/acp/agents \
  -H "Authorization: Bearer <api-key>" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "add",
    "id": "my-custom-cli",
    "name": "My Custom CLI",
    "binary": "/opt/mycli/bin/mycli",
    "versionCommand": "--version",
    "providerAlias": "openai"
  }'
```

### Submit a Cloud Agent task

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "agentId": "devin",
    "prompt": "Implement feature X in repo Y",
    "repo": "https://github.com/user/repo",
    "branch": "main"
  }'
```

### Poll cloud task status

```bash
curl http://localhost:20128/api/v1/agents/tasks/<task-id> \
  -H "Cookie: auth_token=..."
```

## When to Use What

- **Chatbot / copilot frontend** → `/v1/chat/completions` (OpenAI-compat — not an agent protocol)
- **Multi-agent collaboration** → A2A
- **Listing local CLIs in the dashboard** → ACP
- **Delegating long-running coding tasks to cloud services** → Cloud Agents

## Internal Architecture

```
                ┌─────────────────────┐
                │   OmniRoute Core    │
                └─────────────────────┘
                  ↑       ↑        ↑
        ┌─────────┘       │        └─────────┐
        │                 │                  │
    ┌───────┐        ┌─────────┐       ┌────────────┐
    │  A2A  │        │   ACP   │       │  Cloud     │
    │ (/a2a)│        │ (/acp)  │       │  Agents    │
    └───────┘        └─────────┘       │ (/v1/agents│
        │                 │            │  /tasks)   │
        ↓                 ↓            └────────────┘
   External peer    Local CLI               │
   agents that      binaries on             ↓
   speak A2A v0.3   the host           Codex Cloud,
                                        Devin, Jules
```

## See Also

- [A2A-SERVER.md](./A2A-SERVER.md) — A2A deep dive
- [CLOUD_AGENT.md](./CLOUD_AGENT.md) — Cloud Agents deep dive
- [CLI-TOOLS.md](../reference/CLI-TOOLS.md) — External CLI integrations (uses ACP)
- [SKILLS.md](./SKILLS.md) — Skills framework (different from A2A skills — local execution sandbox)
- [API_REFERENCE.md](../reference/API_REFERENCE.md#agents-protocol) — endpoint reference
- Source: `src/lib/{a2a,acp,cloudAgent}/`
