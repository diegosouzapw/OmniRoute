# SKILL: superpowers-tokensaver
> Оптимизация токенов, биллинг суб-агентов, кэш контекста.
> Применять: при любом вызове LLM (приоритет перед using-superpowers).

---

## 1. TokenSaver (:4000) — Claude Proxy

### Установка

```bash
cd ~ && git clone https://github.com/huivrotiki/token-saver.git
cd token-saver && pip install -r requirements.txt
```

### Запуск

```bash
python3 ~/token-saver/tokensaver.py --server &
curl http://localhost:4000/health
export ANTHROPIC_BASE_URL=http://localhost:4000
```

### Иерархия роутинга

```
Рутинные (статус, lint, parse)
  → NVIDIA NIM llama-3.1-8b (FREE, $0)
Сложные (код, архитектура)
  → Gemini 2.5 Flash/Pro (с Redis L2 кэшем)
Opus-задачи (planning, DoD)
  → Antigravity :8045 (claude-opus-4-8)
Всё остальное
  → claude-sonnet-4-5 / claude-sonnet-4-6
```

### Трекинг суб-агентов

```bash
# HTTP заголовок для трекинга:
X-Claude-Code-Agent-Id: video-gen-agent
X-Claude-Code-Agent-Id: research-agent
X-Claude-Code-Agent-Id: ceo-agent
```

---

## 2. Gemini Context Cache

### Правила

- Контекст > 20k токенов → обязательно кэшировать
- Тот же контекст ≥ 2 раза → всегда кэшировать
- TTL: 2 часа
- После обновления AGENTS.md → обновить кэш

### Что кэшировать

```
- AGENTS.md
- OS-NOTES.md (релевантный слайс)
- SESSION-LIMBO.md
- docs/architecture/*
```

### Команды

```bash
# Обновить кэш:
pnpm ts-node packages/shared/src/gemini-cache-manager.ts
# Проверка:
cat .state/gemini-cache.json
# Называние: cache/<date>-<phase>-<topic>
```

---

## 3. Semantic Compressor (сжатие при 80%+ окна)

```bash
mcp_semantic_compressor_compress ratio=0.5
# или в Claude:
/context-preservation-optimizer
```

---

## 4. Using-Superpowers — протокол

```
ДО начала любой задачи:
1. Проверить совпадение задачи со списком скилов (≥ 1%)
2. Если есть — загрузить скил ДО начала работы
3. Только потом — приступать к задаче
```

### Карта скилов

| Задача | Скил | Приоритет |
|---|---|---|
| Видеогенерация | `cinematic-video-generation` | всегда |
| Оркестрация | `serpent-master-orchestration` | всегда |
| Память | `notebooklm-obsidian` | перед каждым шагом |
| Токены | `superpowers-tokensaver` | при старте |
| Делегирование | `serpent-delegation` | передача задач |
| Ralph Loop | `ralph-loop:ralph-loop` | автоциклы |
| Vercel | `vercel-react-best-practices` | деплой |
| GitHub Actions | `github-actions` | CI/CD |
| Анти-галл | `notebooklm-query` | верификация |

### Verification правило

```
ДО завершения любой задачи:
1. /verify (skill: verification-before-completion)
2. Тесты, lint, пути файлов
3. Antigravity hallu-guard
4. Обновить OS-NOTES.md
5. Только потом — git push
```

---
*Last updated: 2026-07-14*
