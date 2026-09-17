# OmniRoute — `fork/parallel-execution`

> **Original upstream readme:** [`Base-readme.md`](Base-readme.md)
> **Design constitution:** [`CORE.md`](CORE.md) · **Upgrade playbook:** [`UPGRADE.md`](UPGRADE.md) · **Hermes wiring:** [`HERMES_CHANGES.md`](HERMES_CHANGES.md)

This branch is a deployment-and-integration fork of the upstream OmniRoute.
It is tuned for running **parallel AI coding agents** (main agent + concurrent
subagents, MoA panels, swarms) against local providers, and it is wired into
the **Hermes agent** as its model federation layer.

Constitution and long-form design live outside this repo (operator docs):
`CORE.md` (design constitution) and `OmniRoute_Hermes_CORE.md` (architecture
and upgrade contract). When any document disagrees with code, code wins for
what exists today — fix the loser in the same change.

## How this fork differs from upstream

### 1. Parallel-execution admission profile (shipped in this fork's env)

Upstream gates heavy chat requests with a byte-budget-only default. This fork
ships a bounded admission profile for agent fan-out in `.env`:

- `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT=4` — one main agent + 3 concurrent subagents
- `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS=5000` — short bursts wait instead of instant 503
- `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES=16777216` — 16 MB parked-waiter budget
- `OMNIROUTE_PROXY_DISPATCHER_CONNECTIONS=64` — long-lived SSE tunnels per proxy

Verified live: 4 parallel chat completions flow with wall time equal to the
slowest single call (no serialization, no `chat_admission_busy` 503s).

### 2. Fix: duplicate call-log rows in the live feed (`18bd082`)

Retried requests persist each failed attempt under their pending request id
while still in-flight, so `GET /api/usage/call-logs` returned the same id
twice (active + persisted) and dashboard lists keyed by row id threw React
`two children with the same key` errors. The merge now skips active
in-memory entries whose id is already persisted (mirroring the existing
completed-entry guard). Regression test:
`tests/unit/call-logs-correlation-sort.test.ts`.

### 3. Fix: default per-account upstream concurrency cap (`578029e`)

With no `maxConcurrent` set on a connection, the per-account semaphore was
bypassed entirely (global and provider gates also default to uncapped), so
one fan-out could open unbounded concurrent sockets against a single
provider key. New env `OMNIROUTE_DEFAULT_ACCOUNT_CONCURRENCY` (default `8`,
documented in `.env.example` + `docs/reference/ENVIRONMENT.md`): explicit
per-connection values still win, explicit `0` still opts out. Excess
requests queue briefly instead of hammering. Regression tests in
`tests/unit/chatcore-executor-helpers.test.ts` (12/12 green).

## Hermes agent changes (what to set up to reproduce this stack)

All items below were set up and verified live on the operator machine.
Hermes config lives in `~/.hermes/`; nothing here patches Hermes core.

1. **Provider** — custom provider `Omnirouter` in `~/.hermes/config.yaml`:
   `base_url: http://localhost:20128/v1`,
   `key_env: HERMES_CUSTOM_LOCALHOST_20128_API_KEY`.
2. **API key** — a persistent OmniRoute key (Dashboard → Keys) stored as
   `HERMES_CUSTOM_LOCALHOST_20128_API_KEY` in `~/.hermes/.env` (one entry;
   Hermes loads this file itself).
3. **Auto-boot** — shell wrapper (in `~/.bashrc`) so any inference `hermes`
   invocation starts `npm run dev` in this repo if `:20128` is unhealthy
   (detached via `setsid`, logs to `~/.omniroute-dev.log`). Skipped for
   local-only subcommands (`--help`, `config`, `model`, `moa list`, …).
4. **MoA presets** — `omniroute-duo` (2 proven references) and
   `omniroute-moe` (40 slots: 11 Kiro + 4 Nvidia NIM + 25 Arena chat
   models). Correct headless form is
   `hermes chat --oneshot -m moa:<preset> -q "…"` — top-level
   `hermes -z -m moa:…` does NOT route to MoA (400).
5. **`moe` Bot profile** — `hermes profile create moe`, model pinned to
   `moa:omniroute-moe`. Invoke via the `moe` wrapper (`moe chat …`,
   i.e. `hermes -p moe`); the `HERMES_PROFILE` env var does NOT switch
   profiles.
6. **Execution policy** — appended to `~/.hermes/SOUL.md`: explicit
   "moe mode" requests are orders (run `moe chat --oneshot -q`), otherwise
   L0 self-execution by default with auto-escalation; MoE panel at most
   once per task (no re-fire loops), fall back to duo on failures.
7. **Swarm as an MCP tool** — server at `~/.hermes/mcp-servers/omni-swarm/`,
   registered via `hermes mcp add omni-swarm --command <venv-python>
--args …/server.py` (answer `Y` at the enable prompt). Single tool
   `swarm(goal, subtasks)`: assigns each subtask from
   `POST /v1/router/candidates` tiers + local workload ledger
   (`~/.hermes/omni-swarm/ledger.json`), runs ≤4 real headless-worker chats
   in parallel (≤8 subtasks, dependency waves, one attempt each, infra vs
   quality failure taxonomy), posts every outcome to
   `POST /v1/router/outcomes`, and returns structured results for Hermes
   to synthesize. A `omni-swarm` skill with the same procedure exists as
   documentation fallback.

   **Provider-diversity rule (swarm assignment):** diversity is enforced at
   the _provider token_ level, not the raw model-ID level. The token is
   derived from the model ID as follows:

   - **Hub prefixes** (`nvidia`, `hf`, `huggingface`, `together`, `fireworks`,
     `azure`, `bedrock`) use **two** path segments as the token, because these
     are gateway aggregators that host multiple independent third-party labs.
     Example: `nvidia/moonshotai/kimi-k3` → token `nvidia/moonshotai`;
     `nvidia/deepseek-ai/deepseek-v4-pro-0813` → token `nvidia/deepseek-ai`.
     Picking one blocks the other within the same swarm wave.
   - **All other prefixes** use only the **first** segment. Example: `kiro`,
     `lma`, `kr`, `zc`. So `kiro/claude-haiku-4.5` and `kr/claude-haiku-4.5`
     get tokens `kiro` and `kr` respectively — they are **different providers**
     to the swarm even though both proxy Anthropic upstream, and are allowed to
     coexist in the same wave.

   In short: "provider" in this context means the OmniRoute
   account/gateway, not the upstream model vendor.

## Bug fixes and troubleshooting (all observed live)

| Symptom                                                                         | Cause                                                                                                                              | Fix                                                                                                                                                        |
| ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `npm run dev` dies ~5s after bootstrap log, `Bus error (core dumped)`, exit 135 | Truncated native binaries in npm cache (`@swc/core`, `@next/swc`, `@napi-rs/canvas` showed `missing section headers` under `file`) | `npm cache clean --force`, delete corrupt package dirs, reinstall; rescan every `*.node` file with the `file` command for `missing section headers` output |
| Dashboard `two children with the same key '<ts>-<hex>'` on live/request feeds   | Retry-persisted attempt rows share the in-flight request id; merge had no active-vs-persisted dedupe                               | Fixed in this fork (`18bd082`); restart server to pick up                                                                                                  |
| `[lmarena/*] 429` on most Arena models, hint never clears                       | Per-model quota gating on the LMArena key (not router behavior)                                                                    | Wait for reset / check key quota; working set observed: `claude-haiku-4-5`, `gemini-3.1-flash-lite`                                                        |
| `[401]: User not found` from lmarena                                            | LMArena key revoked server-side                                                                                                    | Replace the key on the connection (Dashboard → Providers)                                                                                                  |
| `Model 'x-low' is not available in the active live catalog for provider 'kiro'` | `-low/-medium/-high/-xhigh` effort suffixes are not real Kiro upstream IDs                                                         | Use base IDs (`claude-haiku-4.5`, …)                                                                                                                       |
| `hermes -z -m moa:<preset>` → 400 unknown model                                 | `moa:` routing lives in the chat layer, not top-level oneshot                                                                      | `hermes chat --oneshot -m moa:<preset> -q "…"`                                                                                                             |
| `HERMES_PROFILE=moe` silently uses the wrong model                              | Env var does not select profiles                                                                                                   | Use the `moe` wrapper (`hermes -p moe …`)                                                                                                                  |
| `hermes mcp add` ends with `Cancelled`                                          | Tool-enable prompt needs confirmation on a TTY                                                                                     | Pipe it: answer `Y` at the enable prompt (e.g. via stdin pipe)                                                                                             |
| MoE runaway: hundreds of calls, no convergence                                  | Agent re-invoked the 40-panel waiting on quota-dead stragglers                                                                     | Single-panel-per-task rule in `SOUL.md`; never refire dead slots                                                                                           |
| Default model `402` (`muse-spark-1.2`)                                          | Upstream payment/quota on that provider                                                                                            | Check provider billing/quota; pin a working model meanwhile                                                                                                |
| `/v1/models` → `Authentication required` while chat works keyless               | `REQUIRE_API_KEY=false` opens chat; models list still needs a key                                                                  | Call with `Authorization: Bearer <key>`                                                                                                                    |

## Useful commands

```bash
npm run dev                                   # dev server on :20128
curl -s localhost:20128/api/monitoring/health # expect {"status":"healthy",...}
hermes chat --oneshot -m moa:omniroute-duo -q "…"   # 2-model panel
moe chat --oneshot -q "…"                     # 40-model panel via moe profile
hermes moa list                               # show MoA presets
hermes mcp list                               # show MCP servers (omni-swarm)
```
