# OmniRoute A2A Server Documentation

> Agent-to-Agent Protocol v0.3 — OmniRoute as an intelligent routing agent

The A2A surface has two faces:

- **JSON-RPC 2.0** at `POST /a2a` (canonical entry point, defined in `src/app/a2a/route.ts`).
- **REST** under `/api/a2a/*` for dashboards and tooling (status, task list, cancel).

Tasks are tracked by `A2ATaskManager` (`src/lib/a2a/taskManager.ts`, default 5-minute TTL). Skills are dispatched via `A2A_SKILL_HANDLERS` in `src/lib/a2a/taskExecution.ts`.

## Agent Discovery

```bash
curl http://localhost:20128/.well-known/agent.json
```

Returns the Agent Card describing OmniRoute's capabilities, skills, and authentication requirements.

The Agent Card's `version` field is sourced from `process.env.npm_package_version` (see `src/app/.well-known/agent.json/route.ts:13`), so it stays auto-synced with `package.json` on every release.

---

## Authentication

All `/a2a` requests require an API key via the `Authorization` header:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

If no API key is configured on the server, authentication is bypassed.

## Enablement

A2A is controlled by the **Endpoints → A2A** toggle and is disabled by default. When disabled,
`GET /api/a2a/status` reports `status: "disabled"` and `online: false`; JSON-RPC calls to
`POST /a2a` return HTTP 503 with JSON-RPC error code `-32000`.

---

## JSON-RPC 2.0 Methods

### `message/send` — Synchronous Execution

Sends a message to a skill and waits for the complete response.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**Response:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — SSE Streaming

Same as `message/send` but returns Server-Sent Events for real-time streaming.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**SSE Events:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — Query Task Status

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — Cancel a Task

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## Available Skills

OmniRoute exposes 5 A2A skills wired in `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`. Each skill module lives in `src/lib/a2a/skills/`.

| Skill              | ID                   | Description                                                                                 |
| :----------------- | :------------------- | :------------------------------------------------------------------------------------------ |
| Smart Routing      | `smart-routing`      | Routes a prompt through the optimal provider/combo using OmniRoute's combo engine + scoring |
| Quota Management   | `quota-management`   | Reports per-provider quota state, helps callers decide when to throttle/switch              |
| Provider Discovery | `provider-discovery` | Lists installed providers with capabilities, free-tier flags, OAuth status                  |
| Cost Analysis      | `cost-analysis`      | Estimates cost of a request/conversation given the catalog + recent usage                   |
| Health Report      | `health-report`      | Aggregates circuit breaker, cooldown, lockout state per provider                            |

> Note: the Agent Card description currently advertises "36+ providers" (`src/app/.well-known/agent.json/route.ts:26` and `:55`). The actual catalog has grown to 180+ providers — the string should be updated in a follow-up change (tracked as a separate doc/code TODO; not modified here).

---

## REST API (auxiliary)

The JSON-RPC endpoint `/a2a` is the canonical A2A entry point. The REST endpoints below provide auxiliary access for dashboards and external tooling:

| Endpoint                     | Method | Description                      | Auth                   |
| :--------------------------- | :----- | :------------------------------- | :--------------------- |
| `/api/a2a/status`            | GET    | Server status, registered skills | (public)               |
| `/api/a2a/tasks`             | GET    | List tasks with filters          | management             |
| `/api/a2a/tasks/[id]`        | GET    | Get task by ID                   | management             |
| `/api/a2a/tasks/[id]/cancel` | POST   | Cancel running task              | management             |
| `/.well-known/agent.json`    | GET    | Agent Card (A2A discovery)       | (public, cached 3600s) |

---

## Adding a New Skill

1. **Create skill file:** `src/lib/a2a/skills/<your-skill>.ts`

   Export an async function `(task: A2ATask) => Promise<{ artifacts, metadata }>`. Follow the shape of existing skills such as `smartRouting.ts`.

2. **Register handler:** in `src/lib/a2a/taskExecution.ts`, add an entry to `A2A_SKILL_HANDLERS`:

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **Expose in Agent Card:** in `src/app/.well-known/agent.json/route.ts`, append to the `skills` array:

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **Write tests:** `tests/unit/a2a-<your-skill>.test.ts`. Cover happy path + error path.

5. **Document** the new skill in this file's `Available Skills` table.

---

## Task TTL

Tasks expire after `ttlMinutes` (default 5 min) — configured in the `A2ATaskManager` constructor at `src/lib/a2a/taskManager.ts:82`. To customize, fork the `A2ATaskManager` instantiation and pass a different value (e.g., `new A2ATaskManager(15)` for 15-minute TTL). A background interval sweeps expired tasks every 60 seconds.

---

## Task Lifecycle

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Tasks expire after 5 minutes by default (see [Task TTL](#task-ttl))
- Terminal states: `completed`, `failed`, `cancelled`
- Event log tracks every state transition

---

## Error Codes

| Code   | Meaning                        |
| :----- | :----------------------------- |
| -32700 | Parse error (invalid JSON)     |
| -32600 | Invalid request / Unauthorized |
| -32601 | Method or skill not found      |
| -32602 | Invalid params                 |
| -32603 | Internal error                 |
| -32000 | A2A endpoint is disabled       |

---

## Integration Examples

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
