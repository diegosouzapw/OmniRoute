#!/bin/bash
# claude_hcom_listener.sh
# Запускать на машине где работает Claude Code Desktop
# Поллинг hcom шины каждые 10 секунд

set -e
LOG_FILE=".state/claude-hcom-listener.log"
mkdir -p .state

echo "[✅ claude-hcom-listener] Started. Listening for @claude-code tasks..."

while true; do
  TASKS=$(hcom list 2>/dev/null | grep "claude-code" || true)

  if [ -n "$TASKS" ]; then
    SESSION_ID=$(echo "$TASKS" | head -1 | awk '{print $1}')
    TASK_MSG=$(hcom r "$SESSION_ID" 2>/dev/null | head -5 || true)

    if [ -n "$TASK_MSG" ]; then
      echo "[$(date)] TASK received: $TASK_MSG" >> "$LOG_FILE"
      echo "[📨 hcom] Task: $TASK_MSG"

      # Извлечь тело задачи после "TASK:"
      CLAUDE_TASK=$(echo "$TASK_MSG" | sed 's/.*TASK: //' | cut -d'|' -f1 | xargs)

      echo "[🤖 claude] Running: $CLAUDE_TASK"
      claude --print "$CLAUDE_TASK" 2>&1 | tee -a "$LOG_FILE"

      # Отправить результат обратно
      RESULT=$(tail -3 "$LOG_FILE")
      hcom send -b @hermes "DONE: $CLAUDE_TASK | result: $RESULT"
      echo "[✅ hcom] Reply sent to @hermes"
    fi
  fi

  sleep 10
done
