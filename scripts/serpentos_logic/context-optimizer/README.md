# Context Optimizer — Serpent OS

Инструменты оптимизации заполнения контекста и живучести TokenSaver.

## Состав

| Файл                                  | Назначение                                                                                          |
| ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `../../.state/context-policy.json`    | Политика заполнения контекста: что грузить при bootstrap, пороги 75%/90%, правила tool-output, кэши |
| `../../.state/delegation-matrix.json` | Матрица делегирования: задача → модель/lane (TokenSaver, NIM, Vertex, opencode, фоновые агенты)     |
| `tokensaver-guard.applescript`        | Health-check `:4000` + авто-рестарт TokenSaver + уведомление macOS                                  |
| `context-handoff.applescript`         | Протокол context-90: wip-коммит + `docs/handoff-<ts>.md` + уведомление                              |
| `com.serpent.tokensaver-guard.plist`  | launchd-джоба guard'а каждые 10 мин (СОЗДАНА, но НЕ загружена)                                      |

## Запуск вручную

```bash
osascript scripts/context-optimizer/tokensaver-guard.applescript
osascript scripts/context-optimizer/context-handoff.applescript
```

## Автозапуск guard (по желанию, требует явного решения пользователя)

```bash
cp scripts/context-optimizer/com.serpent.tokensaver-guard.plist ~/Library/LaunchAgents/
launchctl load ~/Library/LaunchAgents/com.serpent.tokensaver-guard.plist
# выгрузить: launchctl unload ~/Library/LaunchAgents/com.serpent.tokensaver-guard.plist
```

## Подключение Claude Code к TokenSaver

```bash
export ANTHROPIC_BASE_URL=http://localhost:4000
```

Формат запросов — OpenAI `/v1/chat/completions` (НЕ `/v1/messages`). Детали: skill `tokensaver-setup`.
