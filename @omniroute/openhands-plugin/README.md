# @omniroute/openhands-plugin

OpenHands integration for the **OmniRoute AI Gateway**. Generates the OpenHands
environment and Docker config that wires an OpenHands agent-server to a running
OmniRoute instance — with the integration gotchas already handled.

## Why

Running OpenHands against OmniRoute directly hits several wall:

1. **Model name mismatch** — OpenHands sends `model: "deepseek-chat"`, OmniRoute
   uses provider-prefixed IDs (`ds/deepseek-v4-flash`) or combos.
2. **Python 3.13 sandbox** — `socket.socketpair()` fails under Docker's default
   seccomp profile; the agent-server needs `privileged: true`.
3. **Host reachability** — the sandbox can't resolve `localhost` to the OmniRoute
   host; needs `host.docker.internal:host-gateway`.
4. **Lost state** — conversations die with the container unless
   `OH_PERSISTENCE_DIR` is a host volume.
5. **CORS** — the dashboard origin can't reach agent-server unless
   `PERMITTED_CORS_ORIGINS` allows it.

This plugin encodes all of that into one command.

## Install

```bash
npm install -g @omniroute/openhands-plugin
# or: npx @omniroute/openhands-plugin ...
```

## Quick start

Generate the OpenHands `.env`:

```bash
omniroute-openhands env \
  --api-key sk-... \
  --model deepseek-chat \
  --url http://192.168.3.106:20128
```

Generate a `docker-compose.yml` service:

```bash
omniroute-openhands compose \
  --api-key sk-... \
  --model glm-5.2 \
  --persistence-dir /Users/me/.openhands-state \
  --cors-origins http://100.73.44.17:3000
```

Or a plain `docker run`:

```bash
omniroute-openhands docker-run \
  --api-key sk-... \
  --model vivanta-core \
  --persistence-dir /Users/me/.openhands-state
```

## Commands

| Command | Description |
|---------|-------------|
| `env` | Print OpenHands `.env` contents |
| `compose` | Print a Docker Compose service block |
| `docker-run` | Print a full `docker run` command |
| `models` | Print the default OpenHands → OmniRoute model map |

### Common options

| Flag | Description | Default |
|------|-------------|---------|
| `--api-key` | OmniRoute API key (`sk-...`) | — |
| `--model` | OpenHands model name or OmniRoute combo | — |
| `--url` | OmniRoute base URL | `http://localhost:20128` |
| `--persistence-dir` | Host dir for conversation state | `.openhands-state` |
| `--cors-origins` | Comma-separated allowed origins | `localhost:3000,3001` |
| `--sandbox-image` | OpenHands sandbox base image | — |

## Model mapping

OpenHands-friendly names are mapped to OmniRoute IDs/combo names:

| OpenHands sends | OmniRoute resolves to |
|-----------------|----------------------|
| `deepseek-chat` | `ds/deepseek-v4-flash` |
| `deepseek-reasoner` | `ds/deepseek-v4-pro` |
| `glm-5.2` | `nvidia/z-ai/glm-5.2` |
| `gpt-4o` | `openai/gpt-4o` |
| `claude-sonnet-4.5` | `anthropic/claude-sonnet-4.5` |
| ... | ... |

Or just pass an OmniRoute combo name (e.g. `--model vivanta-core`) — the Model
Alias Resolver and combo router accept it directly.

## Library usage

```ts
import {
  buildOpenHandsEnv,
  serializeOpenHandsEnv,
  buildOpenHandsCompose,
  resolveOpenHandsModel,
} from "@omniroute/openhands-plugin";

const env = buildOpenHandsEnv({
  apiKey: "sk-...",
  model: resolveOpenHandsModel("deepseek-chat"),
  omnirouteUrl: "http://localhost:20128",
  persistenceDir: "/Users/me/.openhands-state",
});
console.log(serializeOpenHandsEnv(env));
```

## License

MIT — same as OmniRoute.
