#!/bin/bash
# Evaluator Bot
# Usage: ./evaluator_bot.sh "Task Description" "Actual Output/Log"

TASK="$1"
OUTPUT="$2"

echo "🤖 Evaluator Bot запускает проверку..."

# В реальных условиях здесь был бы вызов локальной LLM (например Ollama)
# ollama run qwen2.5-coder:3b "Evaluate from 1 to 10 if OUTPUT matches TASK. Reply ONLY with the number. Task: $TASK. Output: $OUTPUT"

# Для демонстрационной надежности мы будем парсить ключевые слова успеха в выводе
score=1

if echo "$OUTPUT" | grep -qi "error\|failed\|503\|401\|402"; then
    score=4
    echo "⚠️ Найдены ошибки в логах. Оценка: $score/10"
elif echo "$OUTPUT" | grep -qi "success\|ok\|200\|models\|omni"; then
    score=10
    echo "✅ Все проверки пройдены! Оценка: $score/10"
else
    score=7
    echo "ℹ️ Результат неопределенный, требуется доработка. Оценка: $score/10"
fi

echo "$score" > .eval_score
exit 0
