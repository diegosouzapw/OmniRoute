# SKILL: serpent-master-orchestration
> Главный скил оркестрации всех агентов SerpentOS через Hermes.
> Читать первым. Ссылаться из AGENTS.md и SESSION-GUIDE.md.

---

## 1. Карта агентов и ролей

| Агент | Роль | Модель | Запуск |
|---|---|---|---|
| **Claude Code Desktop** | Архитектор, план | Opus 4.8 via :4000 | `claude` + hcom listener |
| **OpenCode CLI** | Исполнитель кода, PR | kimi-k2.5-free / qwen | `opencode run "<task>"` |
| **AGY CLI** | Авт. ресёрчер, Ralph Loop | Gemini 2.5 Flash (free) | `agy run "<task>"` |
| **Antigravity** | Верификация, hallu-guard | Claude OAuth :8045 | `antigravity-manager` |
| **Hermes** | Telegram оркестратор | Qwen3-235B (OmniRoute) | `python bot.py` |
| **Jarvis :7001** | API-шлюз каскада | automodel 21+ провайдер | `:7001` daemon |
| **VideoGen Agent** | Kling + Flow + Wan2.1 | мульти-провайдер | `python graph.py` |
| **Goose** | VM/браузер | Gemini Flash | `goose session` |
| **Rovo Dev** | Аварийный Claude | Claude+GPT-5 24h | `rovo` |
| **Ollama** | Локальные модели фоном | qwen2.5/llama3.2 | `ollama serve &` |
| **Sub-bots** | marketing / QA / research | разные | `hcom send @<bot>` |

---

## 2. Модель роутинга и автопродление квот

```
[1] TokenSaver :4000     → Opus без Anthropic (экономия 95%)
[2] OmniRoute :20128     → 179+ провайдеров, kimi/qwen бесплатно
[3] Antigravity :8045    → отдельная квота Claude OAuth
[4] Rovo Dev             → Claude+GPT-5, 24h reset автоматически
[5] Gemini CLI #1/#2     → 2×1000 req/day бесплатно
[6] Jarvis :7001         → automodel фоновые задачи
[7] Ollama local         → zero cost, всегда доступен

Kling credits:
  → 66 кредитов/день × N аккаунтов
  → /rotate в Telegram каждое утро сбрасывает счётчик
  → Wan2.1 DashScope — отдельная квота
  → Flow Google — личный аккаунт cookie
```

**Авторотация по времени:**
```
0-5ч   → Claude Code Desktop (свежее окно)
5-10ч  → Antigravity :8045 (OAuth квота)
10-18ч → Rovo Dev 24h reset + Kimi/Qwen free
Ночь   → Ollama local + Jarvis :7001
```

---

## 3. Прокси и порты

| Сервис | Порт | Назначение |
|---|---|---|
| TokenSaver | :4000 | Claude Code прокси без Anthropic |
| OmniRoute | :20128 | 179+ провайдеров |
| Antigravity | :8045 | Claude OAuth отдельная квота |
| Jarvis Daemon | :7001 | automodel cascade, WS |
| ChromaDB | :8001 | векторная память |
| Hermes Bot | polling | Telegram оркестрация |

---

## 4. Ralph Loop (автономный цикл)

```
R — Research : AGY CLI + Gemini — исследование ниши
A — Analyze  : Antigravity — верификация, приоритеты
L — Launch   : OpenCode + VideoGen — код, видео, деплой
P — Pitch    : CEO Agent — аутрич, Telegram, лендинг
H — Handle   : Hermes — ответы, метрики, OS-NOTES
```

```bash
# Запуск цикла через hcom
hcom run ralph-loop "777ladies SCENE_06"
# или через Hermes Telegram:
# /ralph SCENE_06
```

---

## 5. Память (многослойная)

| Слой | Технология | Назначение |
|---|---|---|
| ChromaDB | векторный RAG | семантический поиск по коду |
| Obsidian | Markdown заметки | планы, доки |
| Memory MCP | SQLite | факты, преференции |
| Supermemory | кросс-проектная | долгосрочные инварианты |
| Gemini Cache | кеш больших контекстов | AGENTS.md / OS-NOTES >20k токенов |

```bash
# Кеширование контекста после обновления AGENTS.md:
pnpm ts-node packages/shared/src/gemini-cache-manager.ts
# Синк ChromaDB:
bash scripts/chroma-sync.sh
```

---

## 6. Скилы по задачам

| Задача | Скил | Агент |
|---|---|---|
| Видеогенерация | `cinematic-video-generation` | VideoGen |
| Veo сборка | `veo-showreel-assembler` | VideoGen |
| DaVinci сборка | `davinci-resolve-automation` | VideoGen |
| Hermes bridge | `hermes-claude-bridge` | Hermes |
| Ralph-луп | `ralph-loop:ralph-loop` | Antigravity |
| Память / синк | `unified-memory-sync` | все |
| Делегирование | `serpent-delegation` | Claude Code |
| Vercel деплой | `vercel-react-best-practices` | OpenCode |
| GitHub Actions | `github-actions` | OpenCode |
| Оптимизация токенов | `tokensaver-setup` | все |
| Биллинг агентов | `subagent-billing` | все |
| Анти-галлюцинации | `notebooklm-query` | Antigravity |

---

## 7. Предлагаемые новые скилы

| Скил | Зачем | Приоритет |
|---|---|---|
| `vercel-deploy-pipeline` | Авто-деплой 777ladies.com | 🔴 Высокий |
| `kling-account-manager` | Ротация 5+ Kling аккаунтов | 🔴 Высокий |
| `flow-google-session` | Авто-обновление Flow cookie через Goose | 🔴 Высокий |
| `github-actions-ci` | CI/CD lint+test+notify на push | 🔴 Высокий |
| `sub-bot-spawner` | Спавн marketing/QA/research суб-ботов | 🟡 Средний |
| `ollama-background-runner` | Локальные модели в фоне автоматически | 🟡 Средний |
| `doppler-secrets-audit` | Проверка секретов перед деплоем | 🟡 Средний |

---

## 8. GitHub Actions автоматизация

```yaml
# .github/workflows/hermes-deploy.yml
# Авто-деплой Hermes bot при push в main
# Авто-уведомление в Telegram о статусе
```
Файл: `.github/workflows/hermes-deploy.yml` (в репо)

---

## 9. Команды Hermes (Telegram)

| Команда | Что делает |
|---|---|
| `/generate SCENE_05` | Запускает graph.py → Kling + Flow + Wan2.1 |
| `/claude "task"` | Передаёт задачу Claude Code Desktop через hcom |
| `/status` | Статус всех провайдеров + last commit |
| `/rotate` | Сброс Kling credits (каждое утро) |
| `/ralph SCENE_06` | Ralph Loop: R→A→L→P→H |
| `/help` | Справка |

---

*Last updated: 2026-07-14 by Perplexity / Human session*
*Связано с: AGENTS.md · WORKFLOW.md · skills/hermes-claude-bridge/SKILL.md*
