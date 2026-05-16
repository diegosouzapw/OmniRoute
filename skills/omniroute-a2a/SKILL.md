---
name: omniroute-a2a
description: OmniRoute exposes an A2A (Agent-to-Agent) JSON-RPC 2.0 server with 5 skills (smart-routing, quota-management, provider-discovery, cost-analysis, health-report). Use when the user wants OmniRoute to act as an agent peer in an A2A network or multi-agent pipeline.
---

# OmniRoute — A2A Protocol

Requires `OMNIROUTE_URL` and `OMNIROUTE_KEY`. See [entry-point SKILL](https://raw.githubusercontent.com/diegosouzapw/OmniRoute/main/skills/omniroute/SKILL.md) for setup.

OmniRoute publishes an Agent Card at `/.well-known/agent.json` and accepts
JSON-RPC 2.0 calls at `/a2a`.

## Discovery

```bash
curl $OMNIROUTE_URL/.well-known/agent.json
```

Returns Agent Card with skills, endpoints, auth scheme.

## Available skills

| Skill                | Purpose                                                                             |
| -------------------- | ----------------------------------------------------------------------------------- |
| `smart-routing`      | Given a prompt, recommends best provider/model combo                                |
| `quota-management`   | Reports quota balance for given provider/account                                    |
| `provider-discovery` | Lists providers matching capability filters (vision, JSON mode, tools, max-context) |
| `cost-analysis`      | Estimates cost for a given request shape                                            |
| `health-report`      | Returns system health (circuit states, latencies, errors)                           |

## Call example (JSON-RPC 2.0)

```bash
curl -X POST $OMNIROUTE_URL/a2a \
  -H "Authorization: Bearer $OMNIROUTE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tasks/send",
    "params": {
      "skillId": "smart-routing",
      "input": { "prompt_length": 4000, "tools": true, "vision": false }
    },
    "id": 1
  }'
```

## Response shape

```json
{
  "jsonrpc": "2.0",
  "result": {
    "taskId": "...",
    "status": "completed",
    "output": { "recommended_combo": "...", "reasoning": "..." }
  },
  "id": 1
}
```

## Errors

- `-32600` → invalid request (bad JSON-RPC envelope)
- `-32601` → method not found (check `method` field)
- `-32602` → invalid params (check `skillId` against Agent Card)
- `401` → missing/invalid `OMNIROUTE_KEY`

## Reference

Full docs: https://github.com/diegosouzapw/OmniRoute/blob/main/docs/frameworks/A2A-SERVER.md
