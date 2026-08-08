# SKILL: hermes-claude-bridge

## Назначение
Оркестрация Claude Code Desktop через Hermes (Telegram).
Принимает команды в Telegram → передаёт Claude Code CLI через hcom bus → возвращает результат.

## Архитектура

```
Telegram User
    │
    ▼ /generate | /claude | /status | /rotate
Hermes Bot (bot.py)
    │
    ├── /generate SCENE_05  →  graph.py → Kling + Flow + Wan2.1 → clips
    ├── /claude "task"       →  hcom send @claude-code "task"
    ├── /status             →  .state/kling-usage.json + git log
    └── /rotate             →  сброс usage счётчиков Kling

Claude Code Desktop
    │
    └── hcom list → hcom r <id>  →  выполняет задачу → hcom reply
```

## Команды Telegram

| Команда | Действие |
|---|---|
| `/generate SCENE_05` | Запуск graph.py сцена 05 |
| `/generate SCENE_05 --provider kling` | Принудить провайдер |
| `/claude "write scene_06_prompts.json"` | Передать задачу Claude Code Desktop |
| `/status` | Статус Kling-аккаунтов + последний commit |
| `/rotate` | Сброс usage-счётчиков Kling |
| `/help` | Справка |

## hcom протокол

```bash
# Hermes пишет задачу:
hcom send -b @claude-code "TASK: <task> | project: 777ladies | branch: main"

# Claude Code Desktop читает:
hcom list
hcom r <session_id>

# После выполнения отвечает:
hcom send -b @hermes "DONE: <result>"
```

## Настройка Claude Code Desktop

```bash
# В Claude Code Desktop — постоянно слушать hcom:
watch -n 5 'hcom list | grep claude-code'
# или циклический скрипт:
bash scripts/claude-hcom-listener.sh
```

## Быстрый старт

```bash
# 1. Добавить секреты
doppler secrets set KLING_KEY_1="..." KLING_KEY_2="..."
doppler secrets set WAN2_API_KEY="sk-..."
doppler secrets set FLOW_GOOGLE_COOKIES="__Secure-1PSID=..."
doppler secrets set TELEGRAM_BOT_TOKEN="..."

# 2. Запустить Hermes
doppler run --project serpent --config dev -- python bot.py

# 3. В Telegram:
# /generate SCENE_05
```

## Структура файлов

```
skills/hermes-claude-bridge/
├── SKILL.md                  ← этот файл
├── bot.py                    ← обновлённый Hermes bot
└── claude_hcom_listener.sh   ← поллинг hcom для Claude Code
```
