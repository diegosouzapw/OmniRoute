---
title: "Cursor Image Generation"
version: 3.8.49
lastUpdated: 2026-07-23
---

# Cursor Image Generation

OmniRoute exposes Cursor plan **image generation** on `POST /v1/images/generations` through the same provider id as chat: `cursor` (alias `cu`).

| Field | Value |
|-------|--------|
| `IMAGE_PROVIDERS` id | `cursor` |
| Format | `cursor-agent-image` |
| Auth | Same OAuth / API-key connection as chat (`provider_connections.provider = "cursor"`) |
| Models | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5` |

## Why the Agent CLI

Cursor chat in OmniRoute uses `agent.v1.AgentService/Run` (protobuf). That path **rejects** built-in client tools (shell, write, …). Image generation is a Cursor-native tool executed by the **`agent` CLI** against the seat. The image handler therefore spawns `agent` with a locked prompt and a per-request temp workspace (same shape as community seat bridges), then returns OpenAI-compatible `b64_json`.

## Access restriction (Hard Rules #15 + #17)

This is the only `IMAGE_PROVIDERS` format that spawns a child process (the `agent`
binary). Because `POST /v1/images/generations` is shared by ~40 other, non-spawning
image providers that remote callers legitimately use, the whole route is **not**
classified `LOCAL_ONLY` — instead `handleCursorAgentImageGeneration` enforces its own
gate using the trusted `AUTHZ_HEADER_PEER_LOCALITY` verdict the authz pipeline stamps
on every request (from the real TCP peer, never the spoofable `Host` header): only
`loopback` and `lan` callers may reach the spawn; everything else (including a leaked
API key replayed over a public tunnel) gets `403` before any credential lookup or
process spawn happens. See `src/server/authz/policies/management.ts` for the same
policy applied to the rest of the `LOCAL_ONLY` tier.

## Concurrency gate is module-level (single-instance limitation)

`CURSOR_IMG_MAX_CONCURRENT` is enforced by an in-memory counter/queue scoped to the
Node module instance (`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`).
It correctly limits concurrent `agent` spawns within one OmniRoute process, but does
**not** coordinate across multiple processes/instances sharing the same Cursor seat
(e.g. a multi-replica deployment) — each instance enforces its own independent limit.
For a single-instance deployment (the default) this is exact; horizontally scaled
deployments should keep `CURSOR_IMG_MAX_CONCURRENT` conservative per instance or route
Cursor image traffic to a single instance.

## Requirements

1. A connected Cursor account in the dashboard (OAuth or `crsr_…` API key).
2. The Cursor Agent binary available to the OmniRoute process:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, or
   - `~/.local/bin/agent`, or
   - `providerSpecificData.agentBin` on the Cursor connection.

Optional tuning:

| Env | Default | Meaning |
|-----|---------|---------|
| `CURSOR_IMG_TIMEOUT_MS` | `210000` | Per-image wall clock |
| `CURSOR_IMG_MAX_CONCURRENT` | `2` | Shared-seat concurrency gate |
| `CURSOR_IMG_MODEL` | (request model / `auto`) | Override CLI `--model` |

## Example

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

Generation typically takes 1–2 minutes. Prefer an internal network path; edge proxies with ~100s timeouts will fail.

## LiteLLM

Register an image model with `mode: image_generation`, `api_base: http://omniroute:20128/v1`, and `model: openai/cursor/auto` (or bare `cursor/auto` depending on your LiteLLM version).
