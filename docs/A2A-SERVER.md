# OmniRoute A2A Server Documentation

> Agent-to-Agent Protocol v0.3 — OmniRoute as an intelligent routing agent

## Agent Discovery

```bash
curl http://localhost:20128/.well-known/agent.json
```

Returns the Agent Card describing OmniRoute's capabilities, skills, and authentication requirements.

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

| Skill              | Description                                                                                                                     |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `smart-routing`    | Routes prompts through OmniRoute's intelligent pipeline. Returns response with routing explanation, cost, and resilience trace. |
| `quota-management` | Answers natural-language queries about provider quotas, suggests free combos, and provides quota rankings.                      |

---

## Task Lifecycle

```
submitted → working → completed
                    → failed
                    → cancelled
```

- Tasks expire after 5 minutes (configurable)
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
