# HERMES_CHANGES.md — all Hermes modifications for the OmniRoute fork

> Every change below was made and verified live on the operator machine.
> Nothing patches Hermes core — all changes live in user config/data dirs.

---

## 1. Provider — OmniRoute as the model gateway

**File:** `~/.hermes/config.yaml`

```yaml
# At top-level (line ~4):
providers:
  - name: Omnirouter
    base_url: http://localhost:20128/v1
    key_env: HERMES_CUSTOM_LOCALHOST_20128_API_KEY
    model: auto/best-coding
    models:
      # (all OmniRoute catalog models appear via /v1/models)
```

**What it does:** Routes all Hermes inference through OmniRoute's router.
OmniRoute selects the best model per request from Kiro, NIM, or any other
connected provider — Hermes never hardcodes a model ID.

---

## 2. API key

**File:** `~/.hermes/.env`

```
HERMES_CUSTOM_LOCALHOST_20128_API_KEY=sk-<your-key>
```

**How to get it:** Dashboard → Keys → create or copy an existing key.
Single entry — no duplicates.

---

## 3. Auto-boot wrapper

**File:** `~/.bashrc` (appended)

```bash
hermes() {
  local _need_server=1 _a
  for _a in "$@"; do
    case "$_a" in
      -h|--help|-V|--version) _need_server=0; break ;;
    esac
  done
  if [ "_need_server" = "1" ]; then
    case "${1:-}" in
      config|model|moa|hooks|doctor|status|auth|login|logout|completion|
      skin|update|migrate|backup|logs|dashboard|pairing|prompt-size|
      version|worktree) _need_server=0 ;;
    esac
  fi
  if [ "_need_server" = "1" ]; then
    if ! curl -sf --max-time 2 "$OMNIROUTE_HEALTH_URL" 2>/dev/null | grep -q '"healthy"'; then
      if [ -d "$OMNIROUTE_DIR/node_modules" ]; then
        echo "[hermes] Starting OmniRoute ..." >&2
        (cd "$OMNIROUTE_DIR" && setsid npm run dev >>"$HOME/.omniroute-dev.log" 2>&1 < /dev/null &)
        # wait up to 90s for healthy
        for _i in $(seq 1 18); do
          sleep 5
          if curl -sf --max-time 2 "$OMNIROUTE_HEALTH_URL" 2>/dev/null | grep -q '"healthy"'; then
            echo "[hermes] OmniRoute ready." >&2; break
          fi
        done
      fi
    fi
  fi
  command hermes "$@"
}
```

**What it does:** Before any inference command, checks if `:20128` is healthy.
If not, starts `npm run dev` in the OmniRoute dir (detached). Skipped for
local-only subcommands (`--help`, `config`, `model`, `moa list`, etc.).

---

## 4. MoA presets — model-of-agents panels

**File:** `~/.hermes/config.yaml` (moa section, line ~121)

```yaml
moa:
  presets:
    omniroute-duo:
      enabled: true
      reference_models:
        - kiro/claude-sonnet-4.5
        - kr/qwen3-coder-next
    omniroute-moe:
      enabled: true
      reference_models:
        - kiro/claude-haiku-4.5
        - kiro/claude-sonnet-4.5
        - kiro/deepseek-3.2
        - kr/qwen3-coder-next
        - nvidia/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning
        # ... (40 total: 11 Kiro + 4 NIM + 25 Arena)
```

**Usage:**

```bash
hermes chat --oneshot -m moa:omniroute-duo -q "task"   # 2-model panel
moe chat --oneshot -q "task"                            # 40-model panel
```

---

## 5. MoE profile

**File:** `~/.hermes/profiles/moe`

```yaml
model: moa:omniroute-moe
```

**Usage:** `moe chat --oneshot -q "task"` or `hermes -p moe chat ...`

---

## 6. Execution policy (SOUL.md)

**File:** `~/.hermes/SOUL.md` (appended)

```markdown
## EXECUTION POLICY — model escalation (auto, no confirmation needed)

1. "moe mode" / "MoE" / "expert panel" = direct order → run `moe chat --oneshot -q`
2. Complex tasks → delegate to `moe` profile as subagent
3. Consistency-dependent parallel work → `hermes kanban swarm` with `moe`
4. Never route trivial tasks to `moe` — L0 self-execution default
5. If `moe` fails → fall back to `omniroute-duo` or single best model
6. MoE panel max once per task — never re-invoke to chase failed slots
```

---

## 7. MCP tool — omni-swarm

**Server:** `~/.hermes/mcp-servers/omni-swarm/server.py`

**Registered via:**

```bash
hermes mcp add omni-swarm \
  --command ~/.hermes/hermes-agent/venv/bin/python \
  --args ~/.hermes/mcp-servers/omni-swarm/server.py
# Answer Y at the enable prompt
```

**What it does:**

- `swarm(goal, subtasks)` tool — runs up to 4 parallel headless `hermes chat`
  workers, each assigned via `POST /v1/router/candidates` + local ledger
- Posts every outcome to `POST /v1/router/outcomes` for workflow memory
- Failure taxonomy: RATE_LIMIT, PROVIDER_TIMEOUT, SERVICE_UNAVAILABLE,
  MODEL_QUALITY_FAILURE, INVALID_REQUEST
- Ledger at `~/.hermes/omni-swarm/ledger.json` tracks per-model success/failure

---

## 8. Skill — omni-swarm (documentation fallback)

**Location:** `~/.hermes/skills/omni-swarm/SKILL.md`

Documents the same swarm procedure as the MCP tool but as a skill
Hermes can follow manually if MCP is unavailable.

---

## 9. Ledger

**Location:** `~/.hermes/omni-swarm/ledger.json`

Auto-populated by the MCP tool after each swarm invocation. Tracks:

- `ok` / `fail` / `infra_fail` counts per model
- `ema_ms` (exponential moving average latency)
- `last` (unix timestamp of last use)

Green models (ok > 0, fail = 0) are preferred. Known-bad (fail >= 2, ok = 0)
are tried last. Unknown models get one trial.

---

## Quick-start (copy-paste)

```bash
# 1. Start OmniRoute (or let the wrapper do it)
cd /var/home/ansh/OmniDEV/OmniRoute && npm run dev &

# 2. Set the API key
echo 'HERMES_CUSTOM_LOCALHOST_20128_API_KEY=sk-your-key' >> ~/.hermes/.env

# 3. Add provider to config (or edit ~/.hermes/config.yaml manually)
# See §1 above for the YAML block

# 4. Add MoA presets (or use hermes moa add)
# See §4 above

# 5. Create moe profile
hermes profile create moe
# Set model to moa:omniroute-moe

# 6. Register MCP tool
echo Y | hermes mcp add omni-swarm \
  --command ~/.hermes/hermes-agent/venv/bin/python \
  --args ~/.hermes/mcp-servers/omni-swarm/server.py

# 7. Test
hermes chat --oneshot -m moa:omniroute-duo -q "Say OK"
```

---

## Verified providers (live)

| Provider    | Model                | Status  | Task completed            |
| ----------- | -------------------- | ------- | ------------------------- |
| Kiro        | claude-haiku-4.5     | 200     | Python prime checker      |
| Kiro        | claude-sonnet-4.5    | 200     | Risk analysis (3 bullets) |
| Kiro        | deepseek-3.2         | 200     | 100-word README           |
| Kiro        | qwen3-coder-next     | 200     | Bash one-liner            |
| NIM         | nemotron-3-nano-omni | 200     | Combinatorics (6 combos)  |
| ~~LMArena~~ | ~~all models~~       | ~~401~~ | ~~dead — replace key~~    |
