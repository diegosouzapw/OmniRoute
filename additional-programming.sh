#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# additional-programming.sh — append OmniRoute fork configs to Hermes
#
# This does NOT replace your existing Hermes setup. It APPENDS fork-specific
# additions (provider, presets, MCP tool, SOUL policy) to whatever you
# already have. A timestamped backup is created before any change.
#
# Safe to run multiple times — skips anything already present.
#
# Usage:
#   ./additional-programming.sh              # interactive
#   ./additional-programming.sh --dry-run    # preview only
#   ./additional-programming.sh --rollback   # restore last backup
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

HERMES_DIR="${HOME}/.hermes"
BACKUP_DIR="${HERMES_DIR}/backup-$(date +%Y%m%d_%H%M%S)"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OMNIROUTE_KEY="${OMNIROUTE_KEY:-}"
DRY_RUN=false
ROLLBACK=false

for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --rollback) ROLLBACK=true ;;
    --help|-h)
      echo "Usage: $0 [--dry-run] [--rollback]"
      echo "  --dry-run   Show what would change without modifying anything"
      echo "  --rollback  Restore the most recent backup"
      exit 0 ;;
  esac
done

log()  { echo "[additional] $*"; }
warn() { echo "[additional] WARNING: $*" >&2; }

# ─── Rollback ───────────────────────────────────────────────────────────────
if [ "$ROLLBACK" = true ]; then
  LATEST=$(ls -dt "${HERMES_DIR}"/backup-* 2>/dev/null | head -1)
  [ -z "$LATEST" ] && { warn "No backup found"; exit 1; }
  log "Restoring from ${LATEST} ..."
  for f in config.yaml SOUL.md .env; do
    [ -f "${LATEST}/${f}" ] && cp "${LATEST}/${f}" "${HERMES_DIR}/${f}"
  done
  for d in profiles mcp-servers skills; do
    [ -d "${LATEST}/${d}" ] && cp -r "${LATEST}/${d}" "${HERMES_DIR}/${d}"
  done
  log "Rollback complete. Restart your shell: exec bash"
  exit 0
fi

# ─── Backup (always, before any change) ────────────────────────────────────
if [ "$DRY_RUN" = false ]; then
  mkdir -p "$BACKUP_DIR"
  for f in config.yaml SOUL.md .env; do
    [ -f "${HERMES_DIR}/${f}" ] && cp "${HERMES_DIR}/${f}" "${BACKUP_DIR}/${f}" 2>/dev/null
  done
  for d in profiles mcp-servers skills; do
    [ -d "${HERMES_DIR}/${d}" ] && cp -r "${HERMES_DIR}/${d}" "${BACKUP_DIR}/${d}" 2>/dev/null
  done
  log "Backup saved to ${BACKUP_DIR}"
fi

# ─── 1. SOUL.md — append execution policy ──────────────────────────────────
SOUL_ADDITION='
## EXECUTION POLICY — OmniRoute fork (appended)

### Model selection — task-driven, not auto/

Do NOT rely on OmniRoute `auto/` routing. Instead:

1. Classify the task: code, analysis, writing, multimodal, math, research
2. Query models: `curl -s localhost:20128/v1/models -H "Authorization: Bearer $KEY"`
3. Filter to connected providers (kiro, nvidia, kr — exclude dead lmarena)
4. Rank: `curl -s -X POST localhost:20128/v1/route -d '"'"'{"task":"..."}'"'"'`
5. Pick the top model for single tasks
6. For parallel: one diverse model per subtask from the ranked list
7. Never show model IDs to the user

### Multimodal input

When user sends image/audio/video:
1. Detect media type from extension
2. Convert to base64, send as `{"type":"image_url","image_url":{"url":"data:..."}}`
3. Route to vision-capable model (kiro/claude-haiku-4.5 or kiro/claude-sonnet-4.5)
4. Present result naturally — never mention base64 or data URIs

### MoE escalation

- "moe mode" / "MoE" / "expert panel" = direct order → `moe chat --oneshot -q`
- Complex multi-part tasks → auto-escalate silently (no prompt)
- Max one panel invocation per task — never re-invoke failed slots
- Fallback: `omniroute-duo` preset or single best model
'

if [ "$DRY_RUN" = true ]; then
  if grep -q "OmniRoute fork" "${HERMES_DIR}/SOUL.md" 2>/dev/null; then
    log "SOUL.md: OmniRoute policy already present — would skip"
  else
    log "SOUL.md: would append execution policy"
  fi
else
  if grep -q "OmniRoute fork" "${HERMES_DIR}/SOUL.md" 2>/dev/null; then
    log "SOUL.md: OmniRoute policy already present — skipping"
  else
    echo "$SOUL_ADDITION" >> "${HERMES_DIR}/SOUL.md"
    log "SOUL.md: appended execution policy"
  fi
fi

# ─── 2. .env — add API key if missing ──────────────────────────────────────
if [ -z "$OMNIROUTE_KEY" ]; then
  if [ -f "${HERMES_DIR}/.env" ] && grep -q "HERMES_CUSTOM_LOCALHOST_20128_API_KEY" "${HERMES_DIR}/.env" 2>/dev/null; then
    log ".env: API key already present — skipping"
  elif [ "$DRY_RUN" = false ]; then
    read -rp "Enter OmniRoute API key (Dashboard → Keys): " OMNIROUTE_KEY
    if [ -n "$OMNIROUTE_KEY" ]; then
      echo "HERMES_CUSTOM_LOCALHOST_20128_API_KEY=${OMNIROUTE_KEY}" >> "${HERMES_DIR}/.env"
      log ".env: added API key"
    fi
  else
    log ".env: would add API key"
  fi
else
  if grep -q "HERMES_CUSTOM_LOCALHOST_20128_API_KEY" "${HERMES_DIR}/.env" 2>/dev/null; then
    log ".env: API key already present — skipping"
  elif [ "$DRY_RUN" = false ]; then
    echo "HERMES_CUSTOM_LOCALHOST_20128_API_KEY=${OMNIROUTE_KEY}" >> "${HERMES_DIR}/.env"
    log ".env: added API key"
  fi
fi

# ─── 3. config.yaml — merge provider + presets (append, never overwrite) ────
if [ "$DRY_RUN" = true ]; then
  log "config.yaml: would merge Omnirouter provider + MoA presets"
else
  python3 << 'PYEOF'
import yaml, os

hermes_dir = os.path.expanduser("~/.hermes")
config_path = os.path.join(hermes_dir, "config.yaml")

with open(config_path) as f:
    cfg = yaml.safe_load(f) or {}

changed = False

# --- Provider (append, never replace) ---
providers = cfg.get("providers", [])
if not any(p.get("name") == "Omnirouter" for p in providers):
    providers.append({
        "name": "Omnirouter",
        "base_url": "http://localhost:20128/v1",
        "key_env": "HERMES_CUSTOM_LOCALHOST_20128_API_KEY",
        "model": "auto/best-coding",
        "models": {}
    })
    cfg["providers"] = providers
    changed = True
    print("[additional] Added Omnirouter provider")
else:
    print("[additional] Omnirouter provider exists — skipping")

# --- MoA presets (append, never replace) ---
moa = cfg.setdefault("moa", {})
presets = moa.setdefault("presets", {})

if "omniroute-duo" not in presets:
    presets["omniroute-duo"] = {
        "enabled": True,
        "reference_models": [
            {"provider": "custom:omnirouter", "model": "kiro/claude-sonnet-4.5"},
            {"provider": "custom:omnirouter", "model": "kr/qwen3-coder-next"},
        ],
        "aggregator": {"provider": "custom:omnirouter", "model": "kr/qwen3-coder-next"},
    }
    changed = True
    print("[additional] Added omniroute-duo preset")
else:
    print("[additional] omniroute-duo exists — skipping")

if "omniroute-moe" not in presets:
    presets["omniroute-moe"] = {
        "enabled": True,
        "reference_models": [
            {"provider": "custom:omnirouter", "model": "kiro/claude-sonnet-4.5"},
            {"provider": "custom:omnirouter", "model": "kiro/claude-haiku-4.5"},
            {"provider": "custom:omnirouter", "model": "kiro/deepseek-3.2"},
            {"provider": "custom:omnirouter", "model": "kr/qwen3-coder-next"},
            {"provider": "custom:omnirouter", "model": "nvidia/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning"},
        ],
        "aggregator": {"provider": "custom:omnirouter", "model": "kr/qwen3-coder-next"},
    }
    changed = True
    print("[additional] Added omniroute-moe preset")
else:
    print("[additional] omniroute-moe exists — skipping")

moa.setdefault("default_preset", "omniroute-duo")

if changed:
    with open(config_path, "w") as f:
        yaml.dump(cfg, f, default_flow_style=False, sort_keys=False, allow_unicode=True)
    print("[additional] config.yaml updated")
else:
    print("[additional] config.yaml unchanged")
PYEOF
fi

# ─── 4. MCP server — copy omni-swarm (append, never replace) ───────────────
MCP_DIR="${HERMES_DIR}/mcp-servers/omni-swarm"
if [ -f "${MCP_DIR}/server.py" ]; then
  log "MCP omni-swarm: already present — skipping"
else
  if [ "$DRY_RUN" = true ]; then
    log "MCP omni-swarm: would install"
  else
    mkdir -p "$MCP_DIR"
    cp "${SCRIPT_DIR}/hermes-config/mcp-servers/omni-swarm/server.py" "${MCP_DIR}/server.py"
    log "MCP omni-swarm: installed"
    # Register if not already
    if ! hermes mcp list 2>/dev/null | grep -q "omni-swarm"; then
      VENV_PY="${HERMES_DIR}/hermes-agent/venv/bin/python"
      [ ! -f "$VENV_PY" ] && VENV_PY="$(which python3)"
      echo Y | hermes mcp add omni-swarm \
        --command "$VENV_PY" \
        --args "${MCP_DIR}/server.py" 2>/dev/null || true
      log "MCP omni-swarm: registered"
    fi
  fi
fi

# ─── 5. Skill — copy omni-swarm skill (append) ─────────────────────────────
SKILL_DIR="${HERMES_DIR}/skills/omni-swarm"
if [ -d "$SKILL_DIR" ]; then
  log "Skill omni-swarm: already present — skipping"
else
  if [ "$DRY_RUN" = true ]; then
    log "Skill omni-swarm: would install"
  else
    mkdir -p "$SKILL_DIR"
    cp "${SCRIPT_DIR}/hermes-config/skills/omni-swarm/SKILL.md" "${SKILL_DIR}/SKILL.md"
    cp "${SCRIPT_DIR}/hermes-config/skills/omni-swarm/DESCRIPTION.md" "${SKILL_DIR}/DESCRIPTION.md"
    log "Skill omni-swarm: installed"
  fi
fi

# ─── 6. MoE profile (append) ───────────────────────────────────────────────
MOE_PROFILE="${HERMES_DIR}/profiles/moe"
if [ -f "$MOE_PROFILE" ]; then
  log "Profile moe: already present — skipping"
else
  if [ "$DRY_RUN" = true ]; then
    log "Profile moe: would create"
  else
    mkdir -p "${HERMES_DIR}/profiles"
    echo "model: moa:omniroute-moe" > "$MOE_PROFILE"
    log "Profile moe: created"
  fi
fi

# ─── 7. Bashrc wrapper (append, never duplicate) ───────────────────────────
if grep -q "OmniRoute auto-boot" "${HOME}/.bashrc" 2>/dev/null; then
  log "Bashrc wrapper: already present — skipping"
else
  if [ "$DRY_RUN" = true ]; then
    log "Bashrc wrapper: would append"
  else
    cat >> "${HOME}/.bashrc" << 'BASHRC'

# ── OmniRoute auto-boot for Hermes ──
OMNIROUTE_DIR="/var/home/ansh/OmniDEV/OmniRoute"
OMNIROUTE_HEALTH_URL="http://localhost:20128/api/monitoring/health"
hermes() {
  local _need_server=1 _a
  for _a in "$@"; do
    case "$_a" in -h|--help|-V|--version) _need_server=0; break ;; esac
  done
  if [ "$_need_server" = "1" ]; then
    case "${1:-}" in
      config|model|moa|hooks|doctor|status|auth|login|logout|completion|
      skin|update|migrate|backup|logs|dashboard|pairing|prompt-size|
      version|worktree) _need_server=0 ;;
    esac
  fi
  if [ "$_need_server" = "1" ]; then
    if ! curl -sf --max-time 2 "$OMNIROUTE_HEALTH_URL" 2>/dev/null | grep -q '"healthy"'; then
      if [ -d "$OMNIROUTE_DIR/node_modules" ]; then
        echo "[hermes] Starting OmniRoute ..." >&2
        (cd "$OMNIROUTE_DIR" && setsid npm run dev >>"$HOME/.omniroute-dev.log" 2>&1 < /dev/null &)
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
BASHRC
    log "Bashrc wrapper: appended"
  fi
fi

# ─── Summary ────────────────────────────────────────────────────────────────
if [ "$DRY_RUN" = true ]; then
  log ""
  log "=== DRY RUN COMPLETE — no changes made ==="
  log "Run without --dry-run to apply"
else
  log ""
  log "=== DONE ==="
  log "Backup: ${BACKUP_DIR}"
  log "Rollback: $0 --rollback"
  log "Reload: exec bash"
  log "Test: hermes chat --oneshot -m moa:omniroute-duo -q 'Say OK'"
fi
