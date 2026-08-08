#!/usr/bin/env bash
# subbot-manager.sh — Subbots Delegation, Auto Check & Stall Recovery for Serpent OS
# Usage:
#   bash scripts/subbot-manager.sh delegate <zeroclaw|opencode|ollama|jarvis> "<task>"
#   bash scripts/subbot-manager.sh check
#   bash scripts/subbot-manager.sh autocorrect

set -euo pipefail

WORK_DIR="/Users/work/serpentos"
LOG_FILE="/tmp/serpent-subbot-manager.log"

log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

ACTION="${1:-check}"
shift || true

case "$ACTION" in
  delegate)
    SUBBOT="${1:?subbot name required (zeroclaw|opencode|ollama|jarvis)}"
    TASK="${2:?task description required}"
    log "▶ Delegating task to subbot '$SUBBOT': $TASK"
    case "$SUBBOT" in
      zeroclaw)
        bash "$WORK_DIR/scripts/delegate.sh" zeroclaw "$TASK"
        ;;
      opencode)
        doppler run --project serpent --config dev -- opencode run "$TASK" -m opencode-zen/qwen3.6-plus-free
        ;;
      ollama)
        curl -s -X POST http://localhost:11434/api/generate -d "{\"model\":\"qwen2.5-coder:3b\",\"prompt\":\"$TASK\",\"stream\":false}" | grep -o '"response":"[^"]*' | cut -d'"' -f4
        ;;
      jarvis)
        npx tsx "$WORK_DIR/packages/jarvis/cli/src/index.ts" plan "$TASK"
        ;;
      *)
        echo "❌ Unknown subbot: $SUBBOT" >&2
        exit 1
        ;;
    esac
    ;;

  check)
    log "🔍 Running Subbots Auto Check & Health Diagnosis..."
    STATUS_MSG="🤖 [Subbots Auto Check Report]\n"
    ISSUES=0

    # 1. Check 9Router
    if curl -s -L --max-time 2 -o /dev/null -w "%{http_code}" http://localhost:20128/ | grep -E "200|307|308|404" >/dev/null; then
      STATUS_MSG+="✅ 9Router (:20128) — ONLINE\n"
    else
      STATUS_MSG+="❌ 9Router (:20128) — OFFLINE\n"
      ISSUES=$((ISSUES + 1))
    fi

    # 2. Check TokenSaver
    if curl -s -f http://localhost:4000/health >/dev/null 2>&1; then
      STATUS_MSG+="✅ TokenSaver (:4000) — ONLINE\n"
    else
      STATUS_MSG+="❌ TokenSaver (:4000) — OFFLINE\n"
      ISSUES=$((ISSUES + 1))
    fi

    # 3. Check Ollama
    if curl -s -f http://localhost:11434/api/tags >/dev/null 2>&1; then
      STATUS_MSG+="✅ Ollama (:11434) — ONLINE\n"
    else
      STATUS_MSG+="❌ Ollama (:11434) — OFFLINE\n"
      ISSUES=$((ISSUES + 1))
    fi

    # 4. Check Jarvis Daemon
    if curl -s -o /dev/null -w "%{http_code}" http://localhost:7001/api/status | grep -E "200|401" >/dev/null; then
      STATUS_MSG+="✅ Jarvis Daemon (:7001) — ONLINE\n"
    else
      STATUS_MSG+="⚠️ Jarvis Daemon (:7001) — OFFLINE (attempting restart...)\n"
      pkill -f "jarvis/daemon/src/index.ts" 2>/dev/null || true
      rm -f /tmp/jarvis.sock
      cd "$WORK_DIR" && npx tsx packages/jarvis/daemon/src/index.ts > /tmp/serpent-jarvis-daemon.log 2>&1 &
      sleep 3
      if curl -s -o /dev/null -w "%{http_code}" http://localhost:7001/api/status | grep -E "200|401" >/dev/null; then
        STATUS_MSG+="✅ Jarvis Daemon (:7001) — RECOVERED & ONLINE\n"
      else
        STATUS_MSG+="❌ Jarvis Daemon (:7001) — RECOVERY FAILED\n"
        ISSUES=$((ISSUES + 1))
      fi
    fi

    # 5. Check memory/CPU stalls for subbot processes
    ZOMBIES=$(ps aux | grep -E "opencode|zeroclaw|tsx" | grep -v grep | awk '$3 > 85.0 || $4 > 15.0 {print $2}' || true)
    if [[ -n "$ZOMBIES" ]]; then
      log "⚠️ Detected high CPU/Memory subbot processes (PIDs: $ZOMBIES). Terminating stalled workers..."
      for pid in $ZOMBIES; do
        kill -9 "$pid" 2>/dev/null || true
      done
      STATUS_MSG+="🧹 Terminated $ZOMBIES stalled subbot processes.\n"
      ISSUES=$((ISSUES + 1))
    else
      STATUS_MSG+="⚡ All subbot worker processes operating within normal memory/CPU boundaries.\n"
    fi

    echo -e "$STATUS_MSG"
    exit $ISSUES
    ;;

  autocorrect)
    log "🛠️ Running Subbot Autocorrect Routine..."
    if ! bash "$0" check; then
      log "⚠️ Issues detected during check. Dispatching Telegram alert..."
      bash "$WORK_DIR/scripts/tg-notify.sh" "⚠️ [Subbot Watchdog Alert] Auto-recovery initiated for offline or stalled subbots. Check /tmp/serpent-subbot-manager.log for details."
    else
      log "✅ All subbots healthy. No recovery needed."
    fi
    ;;

  *)
    echo "Usage: $0 {delegate <subbot> <task>|check|autocorrect}" >&2
    exit 1
    ;;
esac
