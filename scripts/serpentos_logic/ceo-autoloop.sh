#!/bin/bash
# [MANAGED BY: architect-agent]
# Autonomous CEO Agent Loop — Runs every 20 mins

cd /Users/work/serpentos/packages/ceo-agent || exit 1

LOG=ceo-loop.log

# Initialize SESSION.json if it doesn't exist
if [ ! -f SESSION.json ]; then
  cat > SESSION.json << 'EOF'
{
  "current_mrr": 0,
  "next_action": "Analyze competitors and create outreach template",
  "history": []
}
EOF
fi

# 1. Read state
mrr=$(jq -r '.current_mrr' SESSION.json)
next=$(jq -r '.next_action' SESSION.json)

# 2. Check goal
if [ "$mrr" -ge 10000 ] 2>/dev/null; then
  echo "$(date -Iseconds) 🎯 Goal reached! MRR €$mrr" >> "$LOG"
  crontab -l | grep -v 'ceo-autoloop.sh' | crontab -
  exit 0
fi

# 3. Idempotency: skip if this exact action already ran in the last 30 min
last_run=$(jq -r --arg act "$next" '[.history[] | select(.action==$act)] | last | .timestamp // ""' SESSION.json)
if [ -n "$last_run" ]; then
  last_epoch=$(date -j -f "%Y-%m-%dT%H:%M:%S%z" "$last_run" +%s 2>/dev/null || date -d "$last_run" +%s 2>/dev/null || echo 0)
  now_epoch=$(date +%s)
  age=$(( now_epoch - last_epoch ))
  if [ "$age" -lt 1800 ]; then
    echo "$(date -Iseconds) ⏭ '$next' ran ${age}s ago, skipping" >> "$LOG"
    exit 0
  fi
fi

# 4. Create task file for opencode
mkdir -p .tasks
cat > .tasks/dev-task.md << EOF
# Task: $next
Priority: High
Current MRR: €$mrr

Instructions:
- Complete the task above
- After completing, output a JSON block with:
  {"next_action": "<next logical task>", "mrr_delta": <amount if any>}
- Do not restart the same task if output files already exist
EOF

# 5. Run opencode with the task as a prompt (non-interactive, passes task via stdin)
echo "$(date -Iseconds) ▶ Starting: $next" >> "$LOG"
doppler run --project serpent --config dev_personal -- \
  opencode run "$(cat .tasks/dev-task.md)" --dangerously-skip-permissions >> "$LOG" 2>&1
rc=$?

# 6. Update SESSION.json — record completion
jq --arg act "$next" --arg ts "$(date -Iseconds)" \
  '.history += [{"action": $act, "timestamp": $ts}]' \
  SESSION.json > tmp.json && mv tmp.json SESSION.json

echo "$(date -Iseconds) ✅ Done (exit $rc): $next" >> "$LOG"

# 7. Git commit
git add SESSION.json .tasks/dev-task.md
git commit -m "CEO Agent: $next completed" --no-verify 2>/dev/null || true
