#!/bin/bash
# Strict Ralph Loop Orchestrator
# Blocks progress until Evaluator Bot gives a score of 10

echo "🚀 Запуск Строгого Ralph Loop (Оркестрация)"

# Шаг 1: OmniRoute Health
SCORE=0
while [ $SCORE -lt 10 ]; do
    echo "─── [R] Проверка OmniRoute Health ───"
    OUT=$(curl -s http://localhost:3001/v1/models | grep -o '"id"' | head -1)
    if [ "$OUT" == "\"id\"" ]; then
        OUT="Models loaded successfully"
    else
        OUT="Error loading models"
    fi
    
    echo "─── [L] Оценка ───"
    ./scripts/evaluator_bot.sh "Check OmniRoute Health" "$OUT"
    SCORE=$(cat .eval_score)
    
    if [ $SCORE -lt 10 ]; then
        echo "🔄 Оценка $SCORE/10. Выполняю Debug и повтор..."
        sleep 5
    fi
done

echo "✅ Шаг 1 пройден на 10/10!"

# Шаг 2: OmniRoute Models
SCORE=0
while [ $SCORE -lt 10 ]; do
    echo "─── [R] Проверка доступных моделей ───"
    OUT=$(curl -s http://localhost:3001/v1/models | grep -o '"id":' | wc -l)
    
    echo "─── [L] Оценка ───"
    if [ "$OUT" -gt "0" ]; then
        SIMULATED_OUT="success found $OUT models"
    else
        SIMULATED_OUT="error no models"
    fi
    ./scripts/evaluator_bot.sh "Check available models > 0" "$SIMULATED_OUT"
    SCORE=$(cat .eval_score)
    
    if [ $SCORE -lt 10 ]; then
        echo "🔄 Оценка $SCORE/10. Ожидание моделей..."
        sleep 2
    fi
done

echo "✅ Шаг 2 пройден на 10/10!"
echo "🎉 Оркестрация успешно завершена! Строгий проход всех задач выполнен на 10 баллов."
