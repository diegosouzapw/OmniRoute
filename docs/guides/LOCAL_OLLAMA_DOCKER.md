# Local Ollama + Docker OmniRoute

Guide for running **OmniRoute in Docker** while **Ollama runs natively on the host** — the setup used with VS Code OmniCopilot and other OpenAI-compatible clients.

## Architecture

```
VS Code / OmniCopilot
        ↓  :20128
OmniRoute (Docker)
        ↓  host.docker.internal:11434
Ollama (native, GPU)
        ↓
your model (e.g. qwen35b-highctx:latest)
```

## Quick start

1. Install and start Ollama on the host (`ollama serve`, bound to `0.0.0.0:11434` if remote clients need access).

2. Start OmniRoute with the local Ollama compose overlay:

   ```bash
   docker compose -f docker-compose.ollama-local.yml up -d
   ```

3. In the OmniRoute dashboard, add an **OpenAI-compatible** provider:
   - **Base URL:** `http://host.docker.internal:11434/v1`
   - **Prefix:** `ollama` (optional, for `ollama/model-name` routing)

4. Point your client at OmniRoute:
   - **VS Code OmniCopilot:** `omnicopilot.baseUrl` → `http://<host-ip>:20128`
   - **Model:** `ollama/<model-name>`

## Verify Docker → Ollama connectivity

```bash
docker exec omniroute getent hosts host.docker.internal
# → 172.17.0.1  host.docker.internal

docker exec omniroute node -e \
  "fetch('http://host.docker.internal:11434/api/tags').then(r=>r.json()).then(j=>console.log(j.models.length,'models')).catch(console.error)"
```

## Troubleshooting: `Direct response did not start within 30000ms`

### Root cause

This 504 originates in **OmniRoute**, not OmniCopilot. The direct (no-proxy) fetch path uses `resolveDirectHeadersTimeoutMs()` in `open-sse/utils/directResponseStartTimeout.ts`. When `OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS` is unset, the default per-attempt budget is **30 seconds**. OmniRoute retries once on a fresh socket, so failures often appear at **~60 seconds** total.

Large local models (22B+ MoE) and VS Code Copilot agent requests (big system prompt + tools) can exceed 30s **time-to-first-byte**, especially on cold start.

Simple `curl` tests with small prompts may succeed while Copilot fails.

### Fix (v3.8.51+)

OmniRoute now auto-raises the direct response-start floor to **300s** for local/self-hosted targets (`host.docker.internal`, `192.168.x.x`, `localhost`, etc.).

For older images or explicit control, set in `docker-compose.ollama-local.yml`:

```yaml
environment:
  - OMNIROUTE_DIRECT_HEADERS_TIMEOUT_MS=300000
  - OMNIROUTE_LOCAL_DIRECT_HEADERS_TIMEOUT_MS=300000
  - STREAM_IDLE_TIMEOUT_MS=600000
  - RATE_LIMIT_EXECUTION_MAX_WAIT_MS=300000
  - RATE_LIMIT_MAX_WAIT_MS=300000
  - OMNIROUTE_DIRECT_DISPATCHER_CONNECTIONS=32
```

### Secondary error: rate-limit execution timeout (120s)

Heavy agent sessions can also hit `RATE_LIMIT_EXECUTION_TIMEOUT` when concurrent requests queue behind a long SSE stream. Increase `RATE_LIMIT_EXECUTION_MAX_WAIT_MS` and `RATE_LIMIT_MAX_WAIT_MS` as shown above.

## Related

- [DOCKER_GUIDE.md](./DOCKER_GUIDE.md) — full compose profiles
- [OmniCopilot](https://github.com/diegosouzapw/OmniCopilot) — VS Code extension (no request timeout settings; errors come from OmniRoute)
