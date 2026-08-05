---
name: omni-openhands
description: "Integrate OpenHands agent-server with OmniRoute. Generate OpenHands env/Docker config (LLM_MODEL, LLM_BASE_URL, LLM_API_KEY, sandbox privileges, host-gateway, persistence, CORS)."
---

# OmniRoute — OpenHands Integration

Wire an OpenHands agent-server to a running OmniRoute instance.

## Overview

OpenHands is a Docker/Python agent runtime. Pointing it at OmniRoute requires
model-name mapping, sandbox privileges (Python 3.13 socketpair), host-gateway
networking, persistent state and CORS. The `@omniroute/openhands-plugin` package
generates all of it.

## Install

```bash
npm install -g @omniroute/openhands-plugin
# or: npx @omniroute/openhands-plugin ...
```

## Generate OpenHands `.env`

```bash
omniroute-openhands env \
  --api-key sk-... \
  --model deepseek-chat \
  --url http://192.168.3.106:20128 \
  --persistence-dir /Users/me/.openhands-state \
  --cors-origins http://100.73.44.17:3000
```

Output:

```
LLM_MODEL=deepseek-chat
LLM_BASE_URL=http://192.168.3.106:20128/v1
LLM_API_KEY=sk-...
OH_PERSISTENCE_DIR=/Users/me/.openhands-state
PERMITTED_CORS_ORIGINS=http://100.73.44.17:3000
```

## Generate Docker Compose

```bash
omniroute-openhands compose \
  --api-key sk-... \
  --model glm-5.2 \
  --persistence-dir /Users/me/.openhands-state
```

Produces a service with:

- `privileged: true` — required for Python 3.13 `socket.socketpair()` under
  Docker seccomp
- `extra_hosts: host.docker.internal:host-gateway` — sandbox reaches OmniRoute
  on the host
- host volume for `OH_PERSISTENCE_DIR` — conversations survive `docker rm`
- `PERMITTED_CORS_ORIGINS` — dashboard origin can hit agent-server

## Model mapping

OpenHands sends model names OmniRoute doesn't recognize. Map them:

| OpenHands | OmniRoute |
|-----------|-----------|
| `deepseek-chat` | `ds/deepseek-v4-flash` |
| `deepseek-reasoner` | `ds/deepseek-v4-pro` |
| `glm-5.2` | `nvidia/z-ai/glm-5.2` |
| `gpt-4o` | `openai/gpt-4o` |
| `claude-sonnet-4.5` | `anthropic/claude-sonnet-4.5` |

Or pass an OmniRoute combo name directly (`--model vivanta-core`) — OmniRoute's
Model Alias Resolver and combo router accept it.

List the full map:

```bash
omniroute-openhands models
```

## CLI reference

| Command | Description |
|---------|-------------|
| `env` | Print OpenHands `.env` |
| `compose` | Print Docker Compose service block |
| `docker-run` | Print a `docker run` command |
| `models` | Print the default model map |

| Flag | Description | Default |
|------|-------------|---------|
| `--api-key` | OmniRoute API key | — |
| `--model` | OpenHands model or OmniRoute combo | — |
| `--url` | OmniRoute base URL | `http://localhost:20128` |
| `--persistence-dir` | Host state dir | `.openhands-state` |
| `--cors-origins` | Allowed origins | `localhost:3000,3001` |
| `--sandbox-image` | Sandbox base image | — |
