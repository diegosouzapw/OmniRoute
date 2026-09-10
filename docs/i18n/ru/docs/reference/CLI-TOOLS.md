# CLI-TOOLS (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Инструменты — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Инструменты — OmniRoute

Последнее обновление: 2026-08-18

OmniRoute интегрируется с тремя категориями CLI инструментов, распределенными по трем специализированным страницам панели управления:

| Страница       | Маршрут                 | Концепция                                                                                            | Количество |
| -------------- | ----------------------- | ---------------------------------------------------------------------------------------------------- | ---------- |
| **CLI Код**    | `/dashboard/cli-code`   | Инструменты кодирования, которые вы настраиваете на OmniRoute (Клиент → CLI → OmniRoute → Провайдер) | 26         |
| **CLI Агенты** | `/dashboard/cli-agents` | Автономные агенты, которые вы настраиваете на OmniRoute (тот же поток, более широкий охват)          | 8          |
| **ACP Агенты** | `/dashboard/acp-agents` | CLI, которые OmniRoute создает как бэкенд через stdio/ACP (обратный поток)                           | см. реестр |

Устаревшие маршруты перенаправляют через 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Как это работает

```
CLI Код / CLI Агенты (поток потребления):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (все указывают на OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute направляет к правильному провайдеру)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Агенты (обратный поток создания):
    Запрос клиента → OmniRoute → создает CLI через stdio/ACP → ответ
```

**Преимущества:**

- Один API ключ для управления всеми инструментами
- Отслеживание затрат по всем CLI в панели управления
- Переключение моделей без перенастройки каждого инструмента
- Работает локально и на удаленных серверах (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Автоконфигурация с `setup-*`

Вам не нужно вручную писать конфигурацию для каждого инструмента. OmniRoute поставляется с командой `setup-*`
для каждого поддерживаемого CLI, которая считывает **живой** каталог моделей из работающего
OmniRoute (локально или удаленно) и записывает собственную конфигурацию инструмента на вашем компьютере:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Каждая команда принимает `--remote <url> --api-key <key>` (настроить локальный инструмент для работы с удаленным OmniRoute), `--dry-run` (предварительный просмотр без записи) и `--port`. Инструменты без автоматического обнаружения модели (Cline, Kilo, Roo, Goose, Aider, Qwen) принимают
`--model <id>` (и `--yes` для неинтерактивных запусков). Чтобы запустить CLI с правильной средой и без записи конфигурации, используйте универсальный
`omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — цели и псевдонимы берутся из `bin/cli/cli-manifest.mjs`); устаревшие
запускатели для каждого инструмента `omniroute launch` (Claude Code) и `omniroute launch-codex`
(Codex) остаются доступными. Gemini CLI является только для запуска: это цель `omniroute run`,
но не имеет рецепта `setup-*`/`configure`.

> **Полная справка:** мастер-таблица — что каждая команда записывает, каждый флаг,
> локально против удаленно, и какие инструменты требуют суффикс `/v1` — находится в
> **[CLI Интеграции](../guides/CLI-INTEGRATIONS.md)**.

### Запуск этих команд внутри контейнера

Команда `setup-*`, выполненная внутри контейнера OmniRoute, записывает в
домашнюю директорию контейнера, которую ни один хост CLI не считывает и которая исчезает с
контейнером. OmniRoute это обнаруживает и завершает работу с кодом `2`, предоставляя инструкции вместо записи. Два поддерживаемых способа — установить CLI на хосте и
`omniroute connect` к контейнеру, или смонтировать директории конфигурации и установить
`CLI_CONFIG_HOME` (профиль `host` в compose). Каждая команда `setup-*`, а также
`omniroute configure` и `omniroute config set`, принимает
`--allow-container-write`, когда вы на самом деле имели в виду настроить собственные CLI контейнера; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` делает то же самое для
сервера. См.
[Docker Guide → Конфигурирование CLI инструментов на хосте](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

**Точка применения** панели управления (`POST /api/cli-tools/apply`) применяет
такую же защиту: в контейнере запись, цель которой не смонтирована с хоста, отвечает **`422`** с `containerEphemeralTarget: true`, безопасным текстом ошибки и — для инструментов с рецептом на хосте (claude, codex, opencode, cline,
kilo, continue) — командой `hostSetupCommand` (например, `omniroute setup-opencode`), которую нужно выполнить на хосте вместо этого; ничего не записывается. `dryRun: true` продолжает работать в режиме контейнера
и возвращает сгенерированное содержимое + целевой путь без изменения диска, так что
вы можете предварительно просмотреть из панели управления и применить на хосте. Это поведение
намеренное и защищено от регрессий с помощью
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — никогда не "исправляйте" 422, удаляя защиту.

---

## Источник правды

Унифицированный каталог находится в `src/shared/constants/cliTools.ts` как `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Каждая запись имеет следующие поля (определены в `src/shared/schemas/cliCatalog.ts`):

| Поле                                            | Тип                                                          | Описание                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | На какой странице появляется инструмент                                       |
| `vendor`                                        | `string`                                                     | Происхождение инструмента ("Anthropic", "OSS (P. Gauthier)")                  |
| `acpSpawnable`                                  | `boolean`                                                    | Также может использоваться как ACP Agent (значок отображается)                |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Уровень поддержки пользовательского конечного пункта. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Механизм конфигурации                                                         |
| `id`, `name`, `color`, `description`, `docsUrl` | стандарт                                                     | Основные поля отображения                                                     |

Записи с `baseUrlSupport: "none"` **не отображаются** на страницах панели управления — они зарегистрированы в MITM backlog для плана 11 (см. `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Уровни возможностей (каталогизированные × обнаруживаемые × настраиваемые × запускаемые)

Не каждый каталогизированный инструмент является обнаруживаемым, настраиваемым или запускаемым. Каждый уровень имеет один
объявляющий источник, и тест на отклонение поддерживает их согласованность:

| Уровень                | Значение                                                                                 | Объявлено в                                                       |
| ---------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Каталогизированный** | Появляется в каталоге панели управления (имя, поставщик, документация, тип конфигурации) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Обнаруживаемый**     | Обнаружение бинарных файлов/конфигураций, проверки состояния, пути конфигурации          | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Настраиваемый**      | Поддерживается `omniroute configure <cli>` (существует рецепт настройки)                 | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Запускаемый**        | Поддерживается `omniroute run <target>` (определена инъекция env/args)                   | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` является каноническим исполняемым манифестом для команд CLI
поверхностей: `run`, `configure` и генераторы автозаполнения оболочки все получают свои
списки целей, разрешение псевдонимов (например, `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
и подключение флага `--model` из него. Защитник отклонений
`tests/unit/cli/cli-manifest-drift.test.ts` утверждает, что манифест, каталог времени выполнения,
каталог UI и каждая поверхность потребителя остаются синхронизированными — цель, добавленная к
одной поверхности без других, приводит к сбою тестов вместо тихого отклонения.

## 1. Каталог CLI-кода (26 инструментов)

Все инструменты, которые появляются в `/dashboard/cli-code`. Те, у которых `baseUrlSupport: none`, подключены через MITM или с помощью ручного руководства вместо пользовательского базового URL:

| id           | name                    | vendor              | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code             | Anthropic           | full           | env            | true         |
| codex        | OpenAI Codex CLI        | OpenAI              | full           | custom         | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | none           | custom         | false        |
| cline        | Cline                   | OSS (ex-Claude Dev) | full           | custom         | true         |
| kilo         | Kilo Code               | Kilo-Org            | full           | custom         | false        |
| roo          | Roo Code                | Roo (OSS)           | full           | guide          | false        |
| continue     | Continue                | continue.dev        | full           | guide          | false        |
| aider        | Aider                   | OSS (P. Gauthier)   | full           | guide          | true         |
| forge        | ForgeCode               | Antinomy HQ         | full           | custom         | true         |
| jcode        | jcode                   | 1jehuang (OSS)      | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | full           | custom         | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)        | full           | custom         | false        |
| opencode     | OpenCode                | Anomaly (ex-SST)    | full           | guide          | true         |
| droid        | Factory Droid           | Factory AI          | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | full           | custom         | false        |
| cursor-cli   | Cursor CLI              | Anysphere           | partial        | guide          | true         |
| smelt        | Smelt                   | leonardcser (OSS)   | full           | custom         | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | full           | custom         | false        |
| grok-build   | Grok Build              | xAI                 | full           | custom         | false        |
| crush        | Crush                   | OSS (Charm)         | full           | custom         | false        |
| qwen         | Qwen Code               | Alibaba             | full           | guide          | true         |
| cursor       | Cursor                  | Anysphere           | none           | guide          | false        |
| antigravity  | Antigravity             | Google              | none           | mitm           | false        |
| hermes       | Hermes                  | Nous Research       | none           | guide          | false        |
| kiro         | Kiro AI                 | Amazon              | none           | mitm           | false        |
| custom       | Custom CLI              | —                   | full           | custom-builder | false        |

Инструменты с `baseUrlSupport: "partial"` показывают значок "⚠ Частичный базовый URL" на карточке панели управления.

## 2. Каталог CLI-агентов (8 инструментов)

Автономные агенты, которые появляются в `/dashboard/cli-agents`:

| id           | name                   | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ---------------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Агент Гермес           | Nous Research            | полный         | ложь         |
| openclaw     | OpenClaw               | OSS (P. Steinberger)     | полный         | истина       |
| goose        | Гусь                   | Block / Linux Foundation | полный         | истина       |
| interpreter  | Открытый Интерпретатор | OSS                      | полный         | истина       |
| warp         | Warp AI                | Warp Inc.                | частичный      | истина       |
| agent-deck   | Колода агентов         | asheshgoplani (OSS)      | полный         | ложь         |
| omp          | Oh My Pi               | OSS                      | полный         | истина       |
| letta        | Letta CLI              | Letta                    | полный         | ложь         |

---

## 3. ACP-агенты (/dashboard/acp-agents)

Эта страница (переименованная из `/dashboard/agents`) показывает CLI, которые OmniRoute может **создавать** в качестве движков выполнения на стороне сервера через протокол stdio/ACP. Каталог поддерживается отдельно в `src/lib/acp/registry.ts` и **не** является тем же, что и `CLI_TOOLS`.

---

## 4. MITM-отложенные задачи (не отображаются на панели управления)

Следующие CLI не поддерживают пользовательский базовый URL нативно и **не перечислены** на страницах кода CLI или агентов CLI. Они являются кандидатами для перехвата MITM в плане 11:

| CLI                 | Причина                                                         |
| ------------------- | --------------------------------------------------------------- |
| windsurf            | BYOK ограничен выбором моделей Claude + корпоративный URL/токен |
| amp                 | Закрытая экосистема (Sourcegraph)                               |
| amazon-q / kiro-cli | AWS SSO аутентификация, нет пользовательского URL               |
| cowork              | Anthropic Desktop, нет настраиваемой конечной точки             |

Смотрите `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` для полного перекрестного ссылки.

---

## 5. API обнаружения пакетов

Все обнаружения инструментов агрегируются через единую конечную точку:

**`GET /api/cli-tools/all-statuses`**

- Аутентификация: `requireCliToolsAuth(request)` (так же, как и другие маршруты `/api/cli-tools/`)
- Возвращает: `Record<toolId, ToolBatchStatus>` (тип: `src/shared/types/cliBatchStatus.ts`)
- Стратегия: `Promise.all` для всех инструментов, таймаут 5 секунд на инструмент
- Кэш: в памяти LRU, индексированный по `mtime` конфигурационного файла. Кэш недействителен, когда `mtime` изменяется. Сбрасывается при перезапуске сервера.

Форма ответа для каждого инструмента:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // очищено, без трассировок стека
}
```

## 6. Обработчики настроек для новых инструментов

Новые инструменты с `configType: "custom"` имеют выделенные маршруты API настроек:

| Маршрут                                     | Инструмент                                                       |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

Все маршруты используют `sanitizeErrorMessage()` для ответов об ошибках (Жесткое правило #12).

---

## 7. Архитектура страниц панели управления

### CLI Код (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — серверный компонент
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — клиентская сетка
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — страница деталей инструмента
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 специализированных карточек инструментов + `ToolDetailClient.tsx`

### CLI Агенты (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — серверный компонент
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — клиентская сетка
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — повторно использует `ToolDetailClient`

### ACP Агенты (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — серверный компонент (перемещен из `agents/`)

### Общие UI Компоненты (`src/shared/components/cli/`)

| Файл                    | Назначение                                                             |
| ----------------------- | ---------------------------------------------------------------------- |
| `CliToolCard.tsx`       | Умная карточка статуса (обнаружение + конфигурация + конечная точка)   |
| `CliConceptCard.tsx`    | Карточка объяснения концепции на странице                              |
| `CliComparisonCard.tsx` | Сравнение по трем колонкам между типами CLI                            |
| `BaseUrlSelect.tsx`     | Выпадающий список конечных точек (Локальная/Облачная/Пользовательская) |
| `ApiKeySelect.tsx`      | Выбор ключа API                                                        |
| `ManualConfigModal.tsx` | Модальное окно с копируемым фрагментом конфигурации                    |

### Общий Хук (`src/shared/hooks/cli/`)

| Файл                      | Назначение                                                                       |
| ------------------------- | -------------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Получает `/api/cli-tools/all-statuses`, управляет состоянием загрузки/обновления |

## 8. i18n

Новые пространства имен добавлены в план 14 F9:

| Пространство имен | Назначение                                                                         |
| ----------------- | ---------------------------------------------------------------------------------- |
| `cliCommon`       | Общие строки (ярлыки карточек, тексты концепций/сравнений, ярлыки страниц деталей) |
| `cliCode`         | Строки страниц CLI Code                                                            |
| `cliAgents`       | Строки страниц CLI Agents                                                          |
| `acpAgents`       | Строки страниц ACP Agents                                                          |

Полные переводы на португальский (Бразилия) и английский предоставлены. 39 других локалей автоматически используют английский через объединение на уровне пространства имен в `src/i18n/request.ts`.

---

## 9. Быстрый старт

### Шаг 1 — Получите ключ API OmniRoute

1. Откройте `/dashboard/api-manager` → **Создать ключ API**
2. Дайте ему имя (например, `cli-tools`) и выберите все разрешения
3. Скопируйте ключ — он вам понадобится для каждого CLI ниже

> Ваш ключ выглядит так: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Шаг 2 — Установите инструменты CLI

Все инструменты на основе npm требуют Node.js 22.22.2+ или 24.x:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (запускается через `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # на основе Rust

# Pi coding agent
# см. https://github.com/zechnerj/pi-coding-agent для установки

# jcode
# см. https://github.com/1jehuang/jcode для установки
```

---

### Шаг 3 — Настройте через панель управления

1. Перейдите по адресу `http://localhost:20128/dashboard/cli-code`
2. Найдите ваш инструмент в сетке
3. Нажмите на карточку, чтобы открыть страницу деталей инструмента
4. Выберите ваш ключ API и базовый URL
5. Нажмите **Применить конфигурацию** или скопируйте фрагмент конфигурации вручную

---

### Шаг 4 — Установите глобальные переменные окружения

```bash
# Универсальная конечная точка OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI читает GOOGLE_GEMINI_BASE_URL на корне (его SDK добавляет /v1beta/... самостоятельно)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Для **удаленного сервера** замените `localhost:20128` на IP-адрес или домен сервера,
> например, `http://<your-server-ip>:20128`.

---

### Шаг 4 — Настройте каждый инструмент

#### Claude Code

```bash
# Создайте ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Используйте единый корень шлюза Anthropic для Claude Code. Не добавляйте `/v1` здесь.

**Тест:** `claude "say hello"`

---

#### OpenAI Codex

Современный Codex (v0.137+) читает `~/.codex/config.toml` только — старый
`config.yaml` принадлежит устаревшему npm CLI и игнорируется без предупреждений. Ключ API
остается в переменной окружения `OMNIROUTE_API_KEY` (`env_key`), никогда
не внутри файла:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

Полная справка (профили, `wire_api`, контекстные окна): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**Тест:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**Тест:** `opencode`

> Используйте `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> для отправки вариантов мышления.

---

#### Cline (CLI или VS Code)

**Режим CLI:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**Режим VS Code:**
Настройки расширения Cline → Поставщик API: `OpenAI Compatible` → Базовый URL: `http://localhost:20128/v1`

Или используйте панель управления OmniRoute → **CLI Tools → Cline → Применить конфигурацию**.

---

#### KiloCode (CLI или VS Code)

**Режим CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Настройки VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Или используйте панель управления OmniRoute → **CLI Tools → KiloCode → Применить конфигурацию**.

---

#### Continue (расширение VS Code)

Отредактируйте `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Перезапустите VS Code после редактирования.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Используйте это, когда VS Code Insiders настроен для пользовательских моделей конечных точек, и вы хотите, чтобы OmniRoute работал без пользовательского заголовка.

**Рекомендуемое местоположение:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Пример с использованием токенизированного псевдонима OmniRoute:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**Примечания:**

- Замените `sk-your-omniroute-key` на ключ API, созданный в OmniRoute.
- Поле `url` должно указывать на `/api/v1/vscode/{token}/chat/completions`.
- Поле `modelsUrl` должно указывать на `/api/v1/vscode/{token}/models`.
- Предпочитайте обычный поток `/v1` + заголовок Bearer, когда клиент поддерживает пользовательские заголовки.
- Встроенные в URL токены являются запасным вариантом совместимости и могут появляться в журналах редактора или истории прокси.

---

#### Kiro CLI (Amazon)

```bash
# Войдите в свою учетную запись AWS/Kiro:
kiro-cli login

# CLI использует свою собственную аутентификацию — OmniRoute не нужен как бэкенд для самого Kiro CLI.
# Используйте kiro-cli вместе с OmniRoute для других инструментов.
kiro-cli status
```

Для настольного приложения **Kiro IDE** используйте конечную точку MITM, предоставленную OmniRoute
по адресу `/dashboard/cli-tools → Kiro`.

---

## 10. Внутренний OmniRoute CLI

Бинарный файл `omniroute` предоставляет команды для жизненного цикла сервера, настройки, диагностики и управления провайдерами. Точка входа: `bin/omniroute.mjs`.

```bash
omniroute                              # Запустить сервер (порт по умолчанию 20128)
omniroute setup                        # Интерактивный мастер настройки
omniroute doctor                       # Проверить конфигурацию, БД, порты, время выполнения
omniroute providers list               # Настроенные соединения провайдеров
omniroute providers test-all           # Протестировать каждое активное соединение
omniroute reset-password               # Сбросить пароль администратора
omniroute logs                         # Поток журналов запросов
omniroute health                       # Подробное состояние (размыкатели, кэш, память)
omniroute --version                    # Печать версии
omniroute --help                       # Показать все команды
```

### Настройка и инициализация

```bash
omniroute setup                        # Интерактивный мастер настройки
omniroute setup --non-interactive      # CI/автоматизированный режим (читает переменные окружения + флаги)
omniroute setup --password '<value>'   # Установить пароль администратора напрямую
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Добавить и протестировать провайдера за один раз
```

Признанные переменные окружения для неинтерактивной настройки:

| Var                 | Назначение                                                          |
| ------------------- | ------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | API-ключ провайдера (связан с `--api-key` через Commander `.env()`) |
| `DATA_DIR`          | Переопределить каталог данных OmniRoute                             |

Все остальные неинтерактивные вводы передаются как флаги, а не переменные окружения:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(см. опции `omniroute setup` выше).

### Диагностика

```bash
omniroute doctor                       # Проверить конфигурацию, БД, порты, время выполнения, память, работоспособность
omniroute doctor --json                # Читаемый машиной JSON
omniroute doctor --no-liveness         # Пропустить HTTP-пробу работоспособности
omniroute doctor --host 0.0.0.0        # Переопределить хост работоспособности
omniroute doctor --liveness-url <url>  # Полное переопределение URL конечной точки здоровья
```

Доктор выполняет следующие проверки: `Конфигурация`, `База данных`, `Хранение/шифрование`,
`Доступность порта`, `Время выполнения узла`, `Нативный бинарный файл` (better-sqlite3),
`Память` и `Работоспособность сервера`. Он завершает работу с ненулевым кодом, если любая проверка не удалась.

### Управление провайдерами

```bash
omniroute providers available                       # Каталог провайдеров OmniRoute
omniroute providers available --search openai       # Фильтровать каталог по id/имени/псевдониму/категории
omniroute providers available --category api-key    # Фильтровать по категории (api-key, oauth, free, ...)
omniroute providers available --json                # Читаемый машиной JSON

omniroute providers list                            # Настроенные соединения провайдеров
omniroute providers list --json

omniroute providers test <id|name>                  # Протестировать одно настроенное соединение
omniroute providers test-all                        # Протестировать каждое активное соединение
omniroute providers validate                        # Локальная структурная проверка
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Существующий OAuth поток
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` работают по принципу API и, следовательно, действуют в
активном локальном или удаленном контексте. Ввод учетных данных должен использовать
`--credential-stdin` или `--credential-env`; `--dry-run --json` сообщает только
о редактированных присутствии/форме. `providers available` читает каталог OmniRoute;
`providers list/test/test-all/validate` сохраняют свое локальное поведение SQLite и
не требуют, чтобы сервер работал.

### Восстановление и сброс

```bash
omniroute reset-password                # Сбросить пароль администратора (также: omniroute-reset-password)
omniroute reset-encrypted-columns       # Показать предупреждение + пробный запуск для сброса зашифрованных учетных данных
omniroute reset-encrypted-columns --force  # На самом деле обнулить зашифрованные учетные данные в SQLite
```

### Экспорт учетных данных (⚠ обращайтесь с осторожностью)

```bash
omniroute auth export                                 # Показать предупреждение + подтверждение — доступ к БД отсутствует
omniroute auth export --force                          # Экспортировать ВСЕ расшифрованные учетные данные соединений в stdout в формате JSON
omniroute auth export --force --id <id>                 # Экспортировать только соответствующее соединение
omniroute auth export --force --format env               # Вывести строки OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Записать в файл (созданный с правами 0600)
```

`auth export` является **локальным** (прямое чтение из SQLite, без HTTP маршрута) и намеренно печатает/записывает
**в открытом виде** значения `apiKey`/`accessToken`/`refreshToken`/`idToken` — это функция, а не
ошибка. Ничего не читается из базы данных, и ничего не расшифровывается без `--force`. Перед выводом любого открытого текста всегда печатается предупреждающий баннер в stderr. Требуется установить `STORAGE_ENCRYPTION_KEY`.
Поле, которое не удалось расшифровать (устаревший ключ, поврежденный шифротекст), сообщается как
`<field>DecryptFailed: true`, вместо того чтобы прерывать весь экспорт или утекать основную ошибку.

### Другие подкоманды

Эти команды предполагают работающий сервер OmniRoute, если не указано иное:

```bash
omniroute status                       # Комплексный статус времени выполнения
omniroute logs                         # Поток журналов запросов (--json, --search, --follow)
omniroute config show                  # Показать текущую конфигурацию

omniroute provider list                # Список доступных провайдеров (псевдоним для providers list)
omniroute provider add                 # Зарегистрировать OmniRoute как провайдера в инструменте
omniroute keys add | list | remove     # Управление API-ключами
omniroute models [provider]            # Список моделей (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Снимок конфигурации + БД
omniroute restore                      # Восстановление из предыдущего снимка

omniroute health                       # Подробное состояние (размыкатели, кэш, память)
omniroute quota                        # Использование квоты провайдера
omniroute cache                        # Статус кэша
omniroute cache clear                  # Очистить семантические + сигнатурные кэши

omniroute mcp status | restart         # Статус сервера MCP / перезапуск
omniroute a2a status | card            # Статус сервера A2A / карточка агента

omniroute tunnel list | create | stop  # Управление туннелями (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Просмотр / установка переменных окружения (временные)

omniroute test                         # Тест подключения провайдера
omniroute update                       # Проверка обновлений
omniroute completion                   # Генерация завершения для оболочки
```

### Общие флаги

| Флаг                | Описание                                               |
| ------------------- | ------------------------------------------------------ |
| `--no-open`         | Не открывать браузер автоматически при запуске         |
| `--port <n>`        | Переопределить порт API (по умолчанию 20128)           |
| `--mcp`             | Запускать как сервер MCP через stdio (для IDE)         |
| `--non-interactive` | CI режим (без запросов; читает из env/флагов)          |
| `--json`            | Читаемый машиной JSON вывод (doctor, providers и т.д.) |
| `--help`, `-h`      | Показать справку по конкретной команде                 |
| `--version`, `-v`   | Печать установленной версии                            |

---

## Доступные API конечные точки

| Конечная точка             | Описание                         | Используется для                           |
| -------------------------- | -------------------------------- | ------------------------------------------ |
| `/v1/chat/completions`     | Стандартный чат (все провайдеры) | Все современные инструменты                |
| `/v1/responses`            | API ответов (формат OpenAI)      | Codex, агентные рабочие процессы           |
| `/v1/completions`          | Устаревшие текстовые дополнения  | Старые инструменты, использующие `prompt:` |
| `/v1/embeddings`           | Текстовые встраивания            | RAG, поиск                                 |
| `/v1/images/generations`   | Генерация изображений            | GPT-Image, Flux и др.                      |
| `/v1/audio/speech`         | Текст в речь                     | ElevenLabs, OpenAI TTS                     |
| `/v1/audio/transcriptions` | Речь в текст                     | Deepgram, AssemblyAI                       |

Готовые к вставке примеры с токенизированным URL OmniRoute:

```txt
Token example: sk-a3ab3c080beaee3a-69f4a4-070d71af

Стандартная база OpenAI: http://localhost:20128/v1
Модели VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Чат VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Ответы VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Теги Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Чат Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Устранение неполадок

| Ошибка                                                      | Причина                    | Исправление                                           |
| ----------------------------------------------------------- | -------------------------- | ----------------------------------------------------- |
| `Connection refused`                                        | OmniRoute не запущен       | `omniroute serve`                                     |
| `401 Unauthorized`                                          | Неправильный API ключ      | Проверьте в `/dashboard/api-manager`                  |
| `No combo configured`                                       | Нет активной маршрутизации | Настройте в `/dashboard/combos`                       |
| CLI показывает "not installed"                              | Бинарный файл не в PATH    | Проверьте `which <command>`                           |
| Панель управления показывает "not detected" после установки | Кэш устарел                | Нажмите "⟳ Обновить обнаружение" на панели управления |
| Старая ссылка `/dashboard/cli-tools`                        | Закладка до v3.8.6         | Авто-перенаправление на `/dashboard/cli-code` (308)   |
| Старая ссылка `/dashboard/agents`                           | Закладка до v3.8.6         | Авто-перенаправление на `/dashboard/acp-agents` (308) |
