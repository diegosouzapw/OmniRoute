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
