#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# hermes-setup.sh — auto-apply Hermes config for the OmniRoute fork
#
# Usage:
#   ./hermes-setup.sh              # interactive (prompts for API key)
#   ./hermes-setup.sh --unattended # non-interactive (reads OMNIROUTE_KEY env)
#   ./hermes-setup.sh --dry-run    # show what would be done
#
# What it does:
#   1. Backs up existing ~/.hermes/ configs (timestamped)
#   2. Copies SOUL.md, MCP server, skill, profile
#   3. Adds OmniRoute provider to config.yaml (merges, doesn't overwrite)
#   4. Adds MoA presets (omniroute-duo + omniroute-moe)
#   5. Registers MCP server (omni-swarm)
#   6. Appends auto-boot wrapper to ~/.bashrc
#   7. Creates ~/.hermes/.env with API key if not present
#   8. Validates everything works (health check + model list)
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
HERMES_DIR="${HOME}/.hermes"
BACKUP_DIR="${HERMES_DIR}/backup-$(date +%Y%m%d_%H%M%S)"
OMNIROUTE_DIR="${SCRIPT_DIR}"
OMNIROUTE_URL="${OMNIROUTE_URL:-http://localhost:20128}"
DRY_RUN=false
UNATTENDED=false

# Parse args
for arg in "$@"; do
  case "$arg" in
    --dry-run) DRY_RUN=true ;;
    --unattended) UNATTENDED=true ;;
    --help|-h)
      echo "Usage: $0 [--dry-run] [--unattended]"
      echo "  --dry-run     Show what would be done without making changes"
      echo "  --unattended  Non-interactive (reads OMNIROUTE_KEY env var)"
      exit 0
      ;;
  esac
done

log()  { echo "[hermes-setup] $*"; }
warn() { echo "[hermes-setup] WARNING: $*" >&2; }
fail() { echo "[hermes-setup] FATAL: $*" >&2; exit 1; }

# ─── Preflight ──────────────────────────────────────────────────────────────
command -v hermes >/dev/null 2>&1 || fail "hermes not found in PATH"
command -v curl   >/dev/null 2>&1 || fail "curl not found"
command -v python3 >/dev/null 2>&1 || fail "python3 not found"
command -v jq     >/dev/null 2>&1 || fail "jq not found (install: sudo apt install jq)"

log "Preflight OK — hermes $(hermes --version 2>/dev/null || echo '?')"

# ─── API key ────────────────────────────────────────────────────────────────
if [ -z "${OMNIROUTE_KEY:-}" ]; then
  if [ "$UNATTENDED" = true ]; then
    fail "OMNIROUTE_KEY not set. Export it or run without --unattended"
  fi
  # Check if key already exists in .env
  if [ -f "${HERMES_DIR}/.env" ] && grep -q "HERMES_CUSTOM_LOCALHOST_20128_API_KEY" "${HERMES_DIR}/.env" 2>/dev/null; then
    EXISTING_KEY=$(grep "HERMES_CUSTOM_LOCALHOST_20128_API_KEY" "${HERMES_DIR}/.env" | cut -d= -f2)
    log "Existing API key found in ~/.hermes/.env"
    read -rp "Keep existing key? [Y/n]: " KEEP
    if [[ "${KEEP,,}" == "n" ]]; then
      read -rp "Enter OmniRoute API key: " OMNIROUTE_KEY
    else
      OMNIROUTE_KEY="$EXISTING_KEY"
    fi
  else
    read -rp "Enter OmniRoute API key (from Dashboard → Keys): " OMNIROUTE_KEY
  fi
fi
[ -z "$OMNIROUTE_KEY" ] && fail "No API key provided"

# ─── Backup ─────────────────────────────────────────────────────────────────
if [ "$DRY_RUN" = true ]; then
  log "DRY RUN — would backup to ${BACKUP_DIR}"
else
  mkdir -p "$BACKUP_DIR"
  for f in config.yaml SOUL.md .env; do
    [ -f "${HERMES_DIR}/${f}" ] && cp "${HERMES_DIR}/${f}" "${BACKUP_DIR}/${f}" 2>/dev/null
  done
  [ -d "${HERMES_DIR}/profiles" ] && cp -r "${HERMES_DIR}/profiles" "${BACKUP_DIR}/profiles" 2>/dev/null
  [ -d "${HERMES_DIR}/mcp-servers" ] && cp -r "${HERMES_DIR}/mcp-servers" "${BACKUP_DIR}/mcp-servers" 2>/dev/null
  [ -d "${HERMES_DIR}/skills" ] && cp -r "${HERMES_DIR}/skills" "${BACKUP_DIR}/skills" 2>/dev/null
  log "Backed up existing configs to ${BACKUP_DIR}"
fi

# ─── 1. SOUL.md ─────────────────────────────────────────────────────────────
if [ "$DRY_RUN" = true ]; then
  log "DRY RUN — would install SOUL.md"
else
  cp "${SCRIPT_DIR}/SOUL.md" "${HERMES_DIR}/SOUL.md"
  log "Installed SOUL.md"
fi

# ─── 2. MCP server (omni-swarm) ────────────────────────────────────────────
if [ "$DRY_RUN" = true ]; then
  log "DRY RUN — would install omni-swarm MCP server"
else
  mkdir -p "${HERMES_DIR}/mcp-servers/omni-swarm"
  cp "${SCRIPT_DIR}/mcp-servers/omni-swarm/server.py" "${HERMES_DIR}/mcp-servers/omni-swarm/server.py"
  log "Installed omni-swarm MCP server"
fi

# ─── 3. Skill (omni-swarm) ─────────────────────────────────────────────────
if [ "$DRY_RUN" = true ]; then
  log "DRY RUN — would install omni-swarm skill"
else
  mkdir -p "${HERMES_DIR}/skills/omni-swarm"
  cp "${SCRIPT_DIR}/skills/omni-swarm/SKILL.md" "${HERMES_DIR}/skills/omni-swarm/SKILL.md"
  cp "${SCRIPT_DIR}/skills/omni-swarm/DESCRIPTION.md" "${HERMES_DIR}/skills/omni-swarm/DESCRIPTION.md"
  log "Installed omni-swarm skill"
fi

# ─── 4. MoE profile ────────────────────────────────────────────────────────
if [ "$DRY_RUN" = true ]; then
  log "DRY RUN — would create moe profile"
else
  mkdir -p "${HERMES_DIR}/profiles"
  cat > "${HERMES_DIR}/profiles/moe" << 'PROFILE'
model: moa:omniroute-moe
PROFILE
  log "Created moe profile"
fi

# ─── 5. .env — API key ─────────────────────────────────────────────────────
if [ "$DRY_RUN" = true ]; then
  log "DRY RUN — would set API key in .env"
else
  if [ -f "${HERMES_DIR}/.env" ] && grep -q "HERMES_CUSTOM_LOCALHOST_20128_API_KEY" "${HERMES_DIR}/.env" 2>/dev/null; then
    # Update existing
    sed -i "s|^HERMES_CUSTOM_LOCALHOST_20128_API_KEY=.*|HERMES_CUSTOM_LOCALHOST_20128_API_KEY=${OMNIROUTE_KEY}|" "${HERMES_DIR}/.env"
    log "Updated API key in .env"
  else
    # Append
    echo "HERMES_CUSTOM_LOCALHOST_20128_API_KEY=${OMNIROUTE_KEY}" >> "${HERMES_DIR}/.env"
    log "Added API key to .env"
  fi
fi

# ─── 6. config.yaml — provider + MoA presets ───────────────────────────────
if [ "$DRY_RUN" = true ]; then
  log "DRY RUN — would merge provider + MoA presets into config.yaml"
else
  python3 << 'PYEOF'
import yaml, os, sys

hermes_dir = os.path.expanduser("~/.hermes")
config_path = os.path.join(hermes_dir, "config.yaml")

# Load existing config
with open(config_path) as f:
    cfg = yaml.safe_load(f) or {}

# --- Provider ---
providers = cfg.get("providers", [])
omnirouter = next((p for p in providers if p.get("name") == "Omnirouter"), None)

if not omnirouter:
    providers.append({
        "name": "Omnirouter",
        "base_url": "http://localhost:20128/v1",
        "key_env": "HERMES_CUSTOM_LOCALHOST_20128_API_KEY",
        "model": "auto/best-coding",
        "models": {}
    })
    cfg["providers"] = providers
    print("[hermes-setup] Added Omnirouter provider to config.yaml")
else:
    print("[hermes-setup] Omnirouter provider already exists — skipping")

# --- MoA presets ---
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
    print("[hermes-setup] Added omniroute-duo preset")
else:
    print("[hermes-setup] omniroute-duo preset already exists — skipping")

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
    print("[hermes-setup] Added omniroute-moe preset")
else:
    print("[hermes-setup] omniroute-moe preset already exists — skipping")

moa.setdefault("default_preset", "omniroute-duo")

with open(config_path, "w") as f:
    yaml.dump(cfg, f, default_flow_style=False, sort_keys=False, allow_unicode=True)
print("[hermes-setup] config.yaml updated")
PYEOF
fi

# ─── 7. Bashrc auto-boot wrapper ───────────────────────────────────────────
if [ "$DRY_RUN" = true ]; then
  log "DRY RUN — would append auto-boot wrapper to ~/.bashrc"
else
  if grep -q "hermes()" "${HOME}/.bashrc" 2>/dev/null; then
    log "Auto-boot wrapper already in ~/.bashrc — skipping"
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
    log "Appended auto-boot wrapper to ~/.bashrc"
  fi
fi

# ─── 8. MCP server registration ────────────────────────────────────────────
if [ "$DRY_RUN" = true ]; then
  log "DRY RUN — would register omni-swarm MCP server"
else
  if hermes mcp list 2>/dev/null | grep -q "omni-swarm"; then
    log "omni-swarm MCP server already registered — skipping"
  else
    VENV_PY="${HERMES_DIR}/hermes-agent/venv/bin/python"
    [ ! -f "$VENV_PY" ] && VENV_PY="$(which python3)"
    echo Y | hermes mcp add omni-swarm \
      --command "$VENV_PY" \
      --args "${HERMES_DIR}/mcp-servers/omni-swarm/server.py" 2>/dev/null || true
    log "Registered omni-swarm MCP server"
  fi
fi

# ─── 9. Validate ────────────────────────────────────────────────────────────
if [ "$DRY_RUN" = true ]; then
  log "DRY RUN — would validate (health check + model list)"
  log "=== DRY RUN COMPLETE ==="
  exit 0
fi

log "Validating..."

# Health check
HEALTH=$(curl -sf --max-time 5 "${OMNIROUTE_URL}/api/monitoring/health" 2>/dev/null || echo '{"status":"unreachable"}')
if echo "$HEALTH" | grep -q '"healthy"'; then
  log "Health: OK"
else
  warn "OmniRoute not reachable at ${OMNIROUTE_URL} — start it with: cd ${OMNIROUTE_DIR} && npm run dev"
fi

# Model list
MODELS=$(curl -sf --max-time 5 "${OMNIROUTE_URL}/v1/models" \
  -H "Authorization: Bearer ${OMNIROUTE_KEY}" 2>/dev/null || echo '{"data":[]}')
MODEL_COUNT=$(echo "$MODELS" | python3 -c "import sys,json; print(len(json.load(sys.stdin).get('data',[])))" 2>/dev/null || echo 0)
log "Models available: ${MODEL_COUNT}"

# Provider check
PROVIDERS=$(echo "$MODELS" | python3 -c "
import sys, json
d = json.load(sys.stdin)
owners = sorted(set(m.get('owned_by','?') for m in d.get('data',[])))
print(', '.join(owners[:10]))
" 2>/dev/null || echo "?")
log "Providers: ${PROVIDERS}"

# MCP check
if hermes mcp list 2>/dev/null | grep -q "omni-swarm"; then
  log "MCP omni-swarm: registered"
else
  warn "MCP omni-swarm not found — register manually with: hermes mcp add omni-swarm ..."
fi

# Ledger
if [ -f "${HERMES_DIR}/omni-swarm/ledger.json" ]; then
  LEDGER_COUNT=$(python3 -c "import json; print(len(json.load(open('${HERMES_DIR}/omni-swarm/ledger.json'))))" 2>/dev/null || echo 0)
  log "Swarm ledger: ${LEDGER_COUNT} models tracked"
else
  log "Swarm ledger: will be created on first swarm invocation"
fi

log ""
log "=== SETUP COMPLETE ==="
log "Backup location: ${BACKUP_DIR}"
log "To reload bashrc: source ~/.bashrc"
log "To test: hermes chat --oneshot -m moa:omniroute-duo -q 'Say OK'"
