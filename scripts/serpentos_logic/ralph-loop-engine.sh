#!/usr/bin/env bash
# ralph-loop-engine.sh — Advanced Ralph Loop Orchestrator & DoD Settings Engine
# Features:
#   1. Configurable PASS_SCORE and MAX_ATTEMPTS via environment or CLI flags
#   2. Pre-execution NotebookLM check (R phase)
#   3. Execution via OpenCode Zen / Kimi (A phase)
#   4. DoD multi-tier verification via ralph-judge.sh (L phase)
#   5. Session persistence and auto-handoff logging to OS-NOTES.md (P & H phases)
#
# Usage:
#   bash scripts/ralph-loop-engine.sh "<task>" [--attempts 5] [--pass-score 8]

set -euo pipefail

WORK_DIR="/Users/work/serpentos"
cd "$WORK_DIR"

TASK=""
MAX_ATTEMPTS=${RALPH_MAX_ATTEMPTS:-3}
PASS_SCORE=${RALPH_PASS_SCORE:-7}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --attempts)
      MAX_ATTEMPTS="$2"
      shift 2
      ;;
    --pass-score)
      PASS_SCORE="$2"
      shift 2
      ;;
    *)
      if [[ -z "$TASK" ]]; then
        TASK="$1"
      else
        echo "Unknown argument: $1"
        exit 1
      fi
      shift
      ;;
  esac
done

if [[ -z "$TASK" ]]; then
  echo "Usage: $0 \"<task description>\" [--attempts N] [--pass-score N]"
  exit 1
fi

echo "=================================================="
echo "🌀 [Ralph Loop Engine] Starting task: '$TASK'"
echo "⚙️  Settings: MAX_ATTEMPTS=$MAX_ATTEMPTS | PASS_SCORE=$PASS_SCORE/10"
echo "=================================================="

export RALPH_MAX_ATTEMPTS="$MAX_ATTEMPTS"
export RALPH_PASS_SCORE="$PASS_SCORE"

# Run the core loop
if bash "$WORK_DIR/scripts/ralph-loop.sh" "$TASK"; then
  echo "✅ Ralph Loop Engine finished with SUCCESS."
  # Log to OS-NOTES.md
  echo "- [DONE] $(date '+%Y-%m-%d %H:%M'): Ralph Loop finished autonomously: '$TASK' (Score >= $PASS_SCORE)" >> "$WORK_DIR/OS-NOTES.md"
  exit 0
else
  echo "❌ Ralph Loop Engine finished with FAILURE."
  echo "- [BLOCKED] $(date '+%Y-%m-%d %H:%M'): Ralph Loop failed after $MAX_ATTEMPTS attempts: '$TASK'" >> "$WORK_DIR/OS-NOTES.md"
  exit 1
fi
