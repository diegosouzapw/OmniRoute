#!/bin/bash
# Автоматический бэкап монорепозитория serpentos на внешний диск

SOURCE_DIR="/Users/work/serpentos"
# Задайте правильный путь к внешнему диску ниже (по умолчанию берем первую найденную флешку или диск в /Volumes, кроме Macintosh HD)
EXTERNAL_DRIVE=$(ls -1d /Volumes/* 2>/dev/null | grep -v "Macintosh HD" | head -n 1)

if [ -z "$EXTERNAL_DRIVE" ]; then
  echo "[$(date)] Ошибка: Внешний диск не найден в /Volumes/" >> /Users/work/serpentos/.state/backup.log
  exit 1
fi

DEST_DIR="$EXTERNAL_DRIVE/serpentos_backups"
mkdir -p "$DEST_DIR"

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_FILE="$DEST_DIR/serpentos_backup_$TIMESTAMP.tar.gz"

echo "[$(date)] Начало бэкапа в $BACKUP_FILE" >> /Users/work/serpentos/.state/backup.log

# Архивируем папку, исключая node_modules, .git и виртуальные окружения для экономии места
tar --exclude='node_modules' --exclude='.git' --exclude='venv' --exclude='.state' -czf "$BACKUP_FILE" -C /Users/work serpentos >> /Users/work/serpentos/.state/backup.log 2>&1

if [ $? -eq 0 ]; then
  echo "[$(date)] Успех: Бэкап сохранен" >> /Users/work/serpentos/.state/backup.log
else
  echo "[$(date)] Ошибка: Сбой при архивации" >> /Users/work/serpentos/.state/backup.log
fi

# Удаляем старые бэкапы (оставляем только последние 7 дней)
find "$DEST_DIR" -name "serpentos_backup_*.tar.gz" -mtime +7 -exec rm {} \;
