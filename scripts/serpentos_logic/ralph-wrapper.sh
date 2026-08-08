#!/bin/bash
TASK="$1"
CMD="$2"
LOCKFILE="/tmp/ralph-$(echo "$TASK" | tr -d ' ' | tr '[:upper:]' '[:lower:]').lock"

# Защита от наложения (если прошлый цикл еще идет, не запускаем новый)
exec 200>$LOCKFILE
if ! flock -n 200; then
    echo "⚠️ Ralph Loop для '$TASK' уже запущен. Пропускаем этот тик."
    exit 0
fi

echo "🚀 Ralph-обертка: выполнение '$TASK'..."
eval "$CMD" > .state/ralph-last-run.log 2>&1
STATUS=$?

# Оценка (Judge)
if [ -f "scripts/ralph-judge.sh" ]; then
    SCORE=$(bash scripts/ralph-judge.sh "$TASK")
    if [ $STATUS -eq 0 ] && [ "$SCORE" -ge 7 ]; then
        echo "✅ Ralph-проверка: PASS (Score: $SCORE)"
    else
        echo "⚠️ Ralph-проверка: WARN/FAIL (Score: $SCORE). Требуется внимание."
    fi
else
    echo "❌ ralph-judge.sh не найден!"
fi
