#!/bin/bash
# [MANAGED BY: architect-agent]
# Ralph Loop Orchestrator (R-A-L-P-H) using opencode

TASK="$1"
if [ -z "$TASK" ]; then
  echo "Usage: $0 \"<task description>\""
  exit 1
fi

echo "🌀 Starting Ralph Loop: $TASK"
[ -f "scripts/tg-notify.sh" ] && bash scripts/tg-notify.sh "Запуск автономного Ralph Loop: \`$TASK\`" loop || true
MAX_ATTEMPTS=3
PASS_SCORE=7
ATTEMPT=1
SCORE=0

# R - Retrieve
echo "─── [R] Retrieve ───"
# Query NotebookLM for context (graceful failure allowed)
CONTEXT=""
if [ -f "scripts/nb-advisor.sh" ]; then
  echo "Querying NotebookLM..."
  bash scripts/nb-advisor.sh "$TASK" > .state/current-task-advice.md 2>/dev/null
  if [ -s ".state/current-task-advice.md" ]; then
    CONTEXT=$(cat .state/current-task-advice.md)
  fi
fi

while [ $ATTEMPT -le $MAX_ATTEMPTS ]; do
  echo "─── [A] Act (Attempt $ATTEMPT/$MAX_ATTEMPTS) ───"
  
  # Prepare task file for opencode
  mkdir -p .tasks
  cat > .tasks/ralph-current.md << EOF
# Task
$TASK

# Additional Context / NotebookLM Advice
$CONTEXT

# Attempt
This is attempt $ATTEMPT of $MAX_ATTEMPTS.
EOF

  # Run opencode
  doppler run --project serpent --config dev -- ./scripts/auto-opencode.exp run "Execute this task autonomously" -f ".tasks/ralph-current.md" --model opencode-zen/kimi-k2.6
  
  echo "─── [L] Learn ───"
  # Run the judge
  chmod +x scripts/ralph-judge.sh
  SCORE=$(bash scripts/ralph-judge.sh "$TASK")
  
  echo "Judge gave score: $SCORE"
  if [ "$SCORE" -ge "$PASS_SCORE" ]; then
    echo "✅ PASS (Score >= $PASS_SCORE)"
    break
  else
    echo "⚠️ WARN (Score < $PASS_SCORE). Retrying..."
    CONTEXT="$CONTEXT\n\nPrevious attempt failed with score $SCORE. Please fix the implementation."
    # Revert failed changes to try again from clean state
    git checkout -- . 2>/dev/null || true
  fi
  
  ATTEMPT=$((ATTEMPT + 1))
done

echo "─── [P] Persist ───"
mkdir -p .agent
cat > .agent/SESSION.json << EOF
{
  "last_task": "$TASK",
  "score": $SCORE,
  "timestamp": "$(date -Iseconds)"
}
EOF

echo "─── [H] Handoff ───"
if [ "$SCORE" -ge "$PASS_SCORE" ]; then
  git add -A
  git commit -m "feat(ralph): autonomous loop success for: $TASK" --no-verify || true
  # Optionally push
  # git push origin main
  echo "🎉 Ralph Loop Successfully Completed!"
  [ -f "scripts/tg-notify.sh" ] && bash scripts/tg-notify.sh "Успешно завершен Ralph Loop для задачи: \`$TASK\` (Оценка судьи: $SCORE/10)" success || true
else
  echo "❌ Ralph Loop Failed after $MAX_ATTEMPTS attempts."
  # Create a blocker issue
  echo "BLOCKED: $TASK (Score: $SCORE)" >> OS-NOTES.md
  [ -f "scripts/tg-notify.sh" ] && bash scripts/tg-notify.sh "Ошибка Ralph Loop для задачи: \`$TASK\` после $MAX_ATTEMPTS попыток (Оценка судьи: $SCORE/10)" error || true
  exit 1
fi
