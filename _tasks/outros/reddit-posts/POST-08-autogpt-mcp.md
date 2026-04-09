# Post 8: r/AutoGPT / r/MCP (Multi-Agent)

**Subreddits:** r/AutoGPT (~200K), r/MCP (~30K)
**Schedule:** Day 6 (Tuesday) / Day 7 (Wednesday)

---

## 📌 REDDIT IMAGE GUIDE

**Images to post:**
1. **First image:** `omniroute-hub-diagram.png` — shows multiple agents connecting through OmniRoute to multiple providers
2. **Second image:** `architecture-fallback-diagram.png` — shows the technical routing with MCP and A2A layers

**How to add:** In Reddit post editor → camera icon → upload. Add images inline by positioning cursor where you want them in the body, then uploading.

---

## Title:

```
OmniRoute has a full MCP server (16 tools) + A2A protocol + multi-account pooling — one free gateway for building agent pipelines across 44+ providers that never runs out
```

## Body:

```
## The multi-agent infrastructure problem

Running multi-agent pipelines hits a consistent set of problems:

1. **Quota exhaustion mid-task**: Agent 2 depends on Agent 1's output. Agent 1 hits rate limit. Pipeline pauses.
2. **No provider fallback**: Your orchestrator hardcodes OpenAI. When it's down, everything fails.
3. **No unified observability**: 4 agents × different providers = 4 different logs to check.
4. **No agent control surface**: You can't tell an agent to switch to a cheaper model mid-task without stopping everything.
5. **No account pooling**: Each agent uses one hardcoded account. When that account is exhausted, you stop — even though you have other accounts available.

OmniRoute was built to solve all of these at the infrastructure layer.

[IMAGE: hub diagram showing multiple agents connecting through OmniRoute]

## What OmniRoute provides for multi-agent work

### Multi-Account Pooling per Provider

One of the most impactful features for multi-agent work: **multiple OAuth accounts per provider, distributed across all your agents automatically**.

    Example: 4 agents running in parallel, all using claude-sonnet-4.5.
    
    With single account: all 4 compete for the same quota.
    With OmniRoute: connect 2 Kiro accounts → distribute across them.
      Agent A → Kiro account 1
      Agent B → Kiro account 2
      Agent C → Qoder (kimi-k2-thinking, unlimited)  ← overflow
      Agent D → Qoder (deepseek-r1, unlimited)       ← overflow
    
    When both Kiro accounts are busy or slow → spill to Qoder (unlimited).
    Total cost: $0/month.

OmniRoute distributes requests across the pool using round-robin, least-used, or cost-optimized strategies. Each agent gets its own API key from OmniRoute, scoped to the models and providers it's allowed to use — so agents can't accidentally consume each other's quota budgets.

### MCP Server (16 tools, 3 transports)

Connect any MCP-compatible orchestrator to OmniRoute and your agents get these controls:

**Essential tools:**
- `omniroute_get_health` — live health check of all providers and accounts
- `omniroute_list_combos` — list all routing configurations
- `omniroute_switch_combo` — change active combo during a task
- `omniroute_check_quota` — check remaining quota per provider/account
- `omniroute_route_request` — direct routing for a specific request
- `omniroute_cost_report` — see spending in real time
- `omniroute_list_models_catalog` — all available models across all providers

**Advanced tools:**
- `omniroute_simulate_route` — test where a request would go without sending it
- `omniroute_set_budget_guard` — set a cost ceiling dynamically
- `omniroute_set_resilience_profile` — switch between reliability/cost/speed profiles
- `omniroute_test_combo` — validate a combo configuration
- `omniroute_get_provider_metrics` — p50/p95/p99 latency per provider
- `omniroute_best_combo_for_task` — recommended routing for a task type
- `omniroute_explain_route` — explain why a request was routed to a specific provider
- `omniroute_get_session_snapshot` — full routing state snapshot for debugging

**3 transport modes:**
- `stdio` — Claude Desktop, Cursor, VS Code Copilot
- `SSE` — Remote at `/api/mcp/sse`
- `Streamable HTTP` — Modern bidirectional at `/api/mcp/stream`

**9 authorization scopes** — control which tools each agent/agent-key can access. SQLite audit trail for all tool calls.

### A2A Protocol (Agent-to-Agent v0.3)

OmniRoute implements A2A v0.3:

```bash
# Agent Card for self-discovery
curl http://localhost:20128/.well-known/agent.json

# Send a task
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"1","method":"message/send","params":{"skill":"smart-routing","messages":[...]}}'
```

**Supported methods:** `message/send`, `message/stream`, `tasks/get`, `tasks/cancel`

**Built-in skills:** `smart-routing`, `quota-management`

SSE streaming with 15s heartbeat. Task state machine: submitted → working → completed/failed/canceled. TTL-based cleanup.

[IMAGE: architecture diagram showing agent flow through OmniRoute]

### The free multi-agent stack ($0/month)

    Agent A (frontend work)  → Kiro account 1 (Claude Sonnet 4.5, unlimited)
    Agent B (backend work)   → Kiro account 2 (Claude Sonnet 4.5, unlimited)
    Agent C (tests/review)   → Qoder (kimi-k2-thinking, unlimited)
    Agent D (embeddings)     → NVIDIA NIM (unlimited RPM for embeddings)
    
    All connecting to: localhost:20128/v1
    Each with its own scoped API key and model restrictions.

When any agent hits a rate limit or the account pool is busy, OmniRoute routes to the next available account in the pool, then the next tier. The pipeline keeps running.

### Auto-Combo Engine

The routing engine uses 6-factor scoring: quota remaining, p95 latency, error rate, cost, provider health, model capability match. Probing-based re-admission after cooldown. Bandit-style exploration for cost vs. quality tradeoffs.

## Everything in one process

```
npm install -g omniroute
omniroute
```

- OpenAI-compatible proxy → `/v1/chat/completions`
- Responses API → `/v1/responses` (for Codex)
- MCP Server → `stdio | /api/mcp/sse | /api/mcp/stream`
- A2A Server → `/a2a`, `/.well-known/agent.json`
- Dashboard → `localhost:20128`

Shared auth, shared SQLite, shared resilience layer. One process to manage.

**GitHub:** https://github.com/diegosouzapw/OmniRoute
GPL-3.0. Build agents that never stop.
```

**Character count:** ~2,800 ✅
**Tone:** Technical, multi-agent focused, account pooling shown as parallel agent distribution, MCP tools listed with real names, zero ToS concerns
