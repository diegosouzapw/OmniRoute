#!/bin/bash

# Скрипт для ежедневной сводки в Telegram
# Запуск через cron: 0 20 * * * /Users/work/serpentos/scripts/cron/telegram_daily_summary.sh

cd /Users/work/serpentos

# Получаем ключи из Doppler
export TELEGRAM_BOT_TOKEN=$(doppler run --project serpent --config dev_personal --command 'echo $TELEGRAM_BOT_TOKEN')
export TELEGRAM_CHAT_ID=$(doppler run --project serpent --config dev_personal --command 'echo $TELEGRAM_CHAT_ID')

if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
  echo "Ошибка: Не найдены TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID в Doppler."
  exit 1
fi

# Собираем данные за день из HANDOFF.md и AI-NOTES.md
REPORT="📊 *Ежедневная Сводка Serpent OS* %0A%0A"

if [ -f "HANDOFF.md" ]; then
  # Берем последние 10 строк из HANDOFF
  HANDOFF_CONTENT=$(head -n 15 HANDOFF.md | sed 's/$/%0A/' | tr -d '\n')
  REPORT+="*Текущий статус (HANDOFF):*%0A$HANDOFF_CONTENT%0A"
fi

REPORT+="%0A_Сгенерировано автоматически (cron)_"

# Отправляем в Telegram
curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
  -d "chat_id=${TELEGRAM_CHAT_ID}" \
  -d "text=${REPORT}" \
  -d "parse_mode=Markdown"

echo "Отчет отправлен в Telegram."
