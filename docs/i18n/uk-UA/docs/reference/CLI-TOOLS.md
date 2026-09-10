# CLI-TOOLS (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI Інструменти — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI Інструменти — OmniRoute

Останнє оновлення: 2026-08-18

OmniRoute інтегрується з трьома категоріями CLI інструментів, розподілених по трьом спеціалізованим панелям:

| Сторінка       | Маршрут                 | Концепція                                                                             | Кількість   |
| -------------- | ----------------------- | ------------------------------------------------------------------------------------- | ----------- |
| **CLI Код**    | `/dashboard/cli-code`   | Інструменти коду, які ви вказуєте на OmniRoute (Клієнт → CLI → OmniRoute → Провайдер) | 26          |
| **CLI Агенти** | `/dashboard/cli-agents` | Автономні агенти, які ви вказуєте на OmniRoute (той самий потік, ширший обсяг)        | 8           |
| **ACP Агенти** | `/dashboard/acp-agents` | CLI, які OmniRoute створює як бекенд через stdio/ACP (обернений потік)                | див. реєстр |

Спадкові маршрути перенаправляються через 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Як це працює

```
CLI Код / CLI Агенти (потік споживання):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (всі вказують на OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute маршрутизує до правильного провайдера)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Агенти (обернений потік створення):
    Запит клієнта → OmniRoute → створює CLI через stdio/ACP → відповідь
```

**Переваги:**

- Один API ключ для управління всіма інструментами
- Відстеження витрат по всіх CLI на панелі
- Перемикання моделей без повторної конфігурації кожного інструмента
- Працює локально та на віддалених серверах (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Авто-конфігурація з `setup-*`

Вам не потрібно писати конфігурацію кожного інструмента вручну. OmniRoute постачає команду `setup-*`
для кожного підтримуваного CLI, яка читає **живий** каталог моделей з працюючого
OmniRoute (локально або віддалено) і записує власну конфігурацію інструмента на вашому комп'ютері:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Кожна команда приймає `--remote <url> --api-key <key>` (конфігурація локального інструмента для
віддаленого OmniRoute), `--dry-run` (перегляд без запису) та `--port`. Інструменти
без автоматичного виявлення моделі (Cline, Kilo, Roo, Goose, Aider, Qwen) приймають
`--model <id>` (і `--yes` для неінтерактивних запусків). Щоб запустити CLI з
правильним середовищем, яке впроваджено, і без запису конфігурації, використовуйте загальний
запуск `omniroute run <target>` (claude, codex, aider, goose, opencode, qwen,
gemini — цілі та псевдоніми беруться з `bin/cli/cli-manifest.mjs`); спадкові
запуски для кожного інструмента `omniroute launch` (Claude Code) та `omniroute launch-codex`
(Codex) залишаються доступними. Gemini CLI є лише для запуску: це ціль `omniroute run`,
але не має рецепту `setup-*`/`configure`.

> **Повна довідка:** основна таблиця — що кожна команда записує, кожен прапор,
> локально проти віддалено, і які інструменти потребують суфікса `/v1` — знаходиться в
> **[CLI Інтеграції](../guides/CLI-INTEGRATIONS.md)**.

### Запуск цих команд всередині контейнера

Команда `setup-*`, виконана всередині контейнера OmniRoute, записує в
власну домашню директорію контейнера, яку жоден хост CLI не читає і яка зникає з
контейнером. OmniRoute виявляє це і виходить з кодом `2` з інструкціями, а не
записує. Два підтримувані способи — встановити CLI на хості та
`omniroute connect` до контейнера, або зв'язати директорії конфігурацій і встановити
`CLI_CONFIG_HOME` (профіль композу `host`). Кожна команда `setup-*`, плюс
`omniroute configure` та `omniroute config set`, приймає
`--allow-container-write`, коли конфігурація власних CLI контейнера є тим, що ви
насправді мали на увазі; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` робить те ж саме для
сервера. Дивіться
[Посібник Docker → Конфігурація CLI інструментів хоста](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

**Точка застосування** панелі (`POST /api/cli-tools/apply`) забезпечує
ту ж саму перевірку: у контейнері, запис, ціль якого не зв'язана з хостом, відповідає
**`422`** з `containerEphemeralTarget: true`, безпечним текстом помилки та — для інструментів з рецептом хоста (claude, codex, opencode, cline,
kilo, continue) — командою `hostSetupCommand` (наприклад, `omniroute setup-opencode`), яку потрібно виконати
на хості замість цього; нічого не записується. `dryRun: true` продовжує працювати в режимі контейнера
і повертає згенерований вміст + шлях до цілі без зміни диска, тому
ви можете переглянути з панелі та застосувати на хості. Ця поведінка є
умисною і захищена від регресії за допомогою
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — ніколи не "виправляйте" 422,
видаляючи перевірку.

---

## Джерело істини

Уніфікований каталог знаходиться в `src/shared/constants/cliTools.ts` як `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Кожен запис має ці поля (визначені в `src/shared/schemas/cliCatalog.ts`):

| Поле                                            | Тип                                                          | Опис                                                                       |
| ----------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | На якій сторінці з'являється інструмент                                    |
| `vendor`                                        | `string`                                                     | Походження інструмента ("Anthropic", "OSS (P. Gauthier)")                  |
| `acpSpawnable`                                  | `boolean`                                                    | Також може використовуватися як ACP Agent (значок показується)             |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Рівень підтримки користувацького кінцевого пункту. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Механізм конфігурації                                                      |
| `id`, `name`, `color`, `description`, `docsUrl` | стандарт                                                     | Основні поля відображення                                                  |

Записи з `baseUrlSupport: "none"` **не відображаються** на сторінках інформаційної панелі — вони зареєстровані в MITM backlog для плану 11 (див. `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Рівні можливостей (каталогізовані × виявлені × конфігуровані × запускні)

Не кожен каталогізований інструмент є виявленим, конфігурованим або запускним. Кожен рівень має одне
джерело оголошення, а тест на відхилення підтримує їх узгодженість:

| Рівень              | Значення                                                                                         | Оголошено в                                                       |
| ------------------- | ------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **Каталогізований** | З'являється в каталозі інформаційної панелі (ім'я, постачальник, документація, тип конфігурації) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Виявлений**       | Виявлення бінарних/конфігураційних файлів, перевірки стану, шляхи конфігурації                   | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Конфігурований**  | Підтримується `omniroute configure <cli>` (існує рецепт налаштування)                            | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Запускний**       | Підтримується `omniroute run <target>` (визначено впорскування env/args)                         | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` є канонічним виконуваним маніфестом для команд CLI
поверхонь: `run`, `configure` та генератори автозавершення оболонки всі отримують свої
списки цілей, розв'язання псевдонімів (наприклад, `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
та підключення прапора `--model` з нього. Охоронець відхилень
`tests/unit/cli/cli-manifest-drift.test.ts` стверджує, що маніфест, каталог виконання,
каталог UI та кожна споживча поверхня залишаються синхронізованими — ціль, додана до
однієї поверхні без інших, призводить до збою тестування замість тихого відхилення.

## 1. Каталог CLI Кодів (26 інструментів)

Усі інструменти, які з'являються в `/dashboard/cli-code`. Ті, що мають `baseUrlSupport: none`, підключені через MITM або ручний посібник замість користувацької базової URL:

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

Інструменти з `baseUrlSupport: "partial"` показують значок "⚠ Часткова базова URL" на картці інформаційної панелі.

## 2. Каталог CLI Агентів (8 інструментів)

Автономні агенти, які з'являються в `/dashboard/cli-agents`:

| id           | name                    | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ----------------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Агент Гермес            | Nous Research            | full           | false        |
| openclaw     | OpenClaw                | OSS (P. Steinberger)     | full           | true         |
| goose        | Гусак                   | Block / Linux Foundation | full           | true         |
| interpreter  | Відкритий Інтерпретатор | OSS                      | full           | true         |
| warp         | Warp AI                 | Warp Inc.                | partial        | true         |
| agent-deck   | Пакет Агентів           | asheshgoplani (OSS)      | full           | false        |
| omp          | Oh My Pi                | OSS                      | full           | true         |
| letta        | Letta CLI               | Letta                    | full           | false        |

---

## 3. Агенті ACP (/dashboard/acp-agents)

Ця сторінка (перейменована з `/dashboard/agents`) показує CLI, які OmniRoute може **створювати** як бекенд-двигуни виконання через протокол stdio/ACP. Каталог підтримується окремо в `src/lib/acp/registry.ts` і **не** є тим самим, що `CLI_TOOLS`.

---

## 4. Черга MITM (не показується в панелі)

Наступні CLI не підтримують власний базовий URL нативно і **не внесені** в сторінки коду CLI або агентів CLI. Вони є кандидатами на перехоплення MITM у плані 11:

| CLI                 | Причина                                                           |
| ------------------- | ----------------------------------------------------------------- |
| windsurf            | BYOK обмежено вибраними моделями Claude + корпоративний URL/токен |
| amp                 | Закрита екосистема (Sourcegraph)                                  |
| amazon-q / kiro-cli | AWS SSO аутентифікація, без власного URL                          |
| cowork              | Anthropic Desktop, без налаштовуваного кінцевого пункту           |

Дивіться `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` для повного перехресного посилання.

---

## 5. API Виявлення Пакетів

Всі виявлення інструментів агрегуються через єдину точку доступу:

**`GET /api/cli-tools/all-statuses`**

- Auth: `requireCliToolsAuth(request)` (так само, як і інші маршрути `/api/cli-tools/`)
- Повертає: `Record<toolId, ToolBatchStatus>` (тип: `src/shared/types/cliBatchStatus.ts`)
- Стратегія: `Promise.all` для всіх інструментів, тайм-аут 5с на інструмент
- Кеш: в пам'яті LRU, індексований за `mtime` файлу конфігурації. Кеш скидається, коли `mtime` змінюється. Скидається при перезавантаженні сервера.

Форма відповіді для кожного інструмента:

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
  error?: string; // очищено, без трасувань стеку
}
```

## 6. Обробники Налаштувань для Нових Інструментів

Нові інструменти з `configType: "custom"` мають спеціалізовані маршрути API для налаштувань:

| Маршрут                                     | Інструмент                                                       |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

Всі маршрути використовують `sanitizeErrorMessage()` для відповідей про помилки (Жорстке правило #12).

---

## 7. Архітектура Сторінок Панелі

### CLI Код (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — серверний компонент
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — клієнтська сітка
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — сторінка деталей інструмента
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 спеціалізованих карток інструментів + `ToolDetailClient.tsx`

### CLI Агенти (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — серверний компонент
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — клієнтська сітка
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — повторно використовує `ToolDetailClient`

### ACP Агенти (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — серверний компонент (переміщено з `agents/`)

### Спільні UI Компоненти (`src/shared/components/cli/`)

| Файл                    | Призначення                                                       |
| ----------------------- | ----------------------------------------------------------------- |
| `CliToolCard.tsx`       | Розумна картка статусу (виявлення + налаштування + кінцева точка) |
| `CliConceptCard.tsx`    | Картка пояснення концепції на сторінці                            |
| `CliComparisonCard.tsx` | Порівняння трьох колонок між типами CLI                           |
| `BaseUrlSelect.tsx`     | Випадний список кінцевих точок (Локальна/Хмара/Користувацька)     |
| `ApiKeySelect.tsx`      | Вибірник API ключа                                                |
| `ManualConfigModal.tsx` | Модальне вікно з копійованим фрагментом конфігурації              |

### Спільний Хук (`src/shared/hooks/cli/`)

| Файл                      | Призначення                                                                   |
| ------------------------- | ----------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | Отримує `/api/cli-tools/all-statuses`, управляє станом завантаження/оновлення |

## 8. i18n

Нові простори імен додані в план 14 F9:

| Простір імен | Призначення                                                                      |
| ------------ | -------------------------------------------------------------------------------- |
| `cliCommon`  | Спільні рядки (мітки карток, тексти концепцій/порівнянь, мітки сторінок деталей) |
| `cliCode`    | Рядки сторінки CLI Code                                                          |
| `cliAgents`  | Рядки сторінки CLI Agents                                                        |
| `acpAgents`  | Рядки сторінки ACP Agents                                                        |

Повні переклади на PT-BR та EN надані. 39 інших локалей автоматично переходять на EN через об'єднання на рівні простору імен у `src/i18n/request.ts`.

---

## 9. Швидкий старт

### Крок 1 — Отримайте ключ API OmniRoute

1. Відкрийте `/dashboard/api-manager` → **Створити ключ API**
2. Дайте йому ім'я (наприклад, `cli-tools`) і виберіть всі дозволи
3. Скопіюйте ключ — він знадобиться для кожного CLI нижче

> Ваш ключ виглядає так: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Крок 2 — Встановіть інструменти CLI

Всі інструменти на базі npm вимагають Node.js 22.22.2+ або 24.x:

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

# Google Gemini CLI (запускається через `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # на базі Rust

# Pi coding agent
# дивіться https://github.com/zechnerj/pi-coding-agent для встановлення

# jcode
# дивіться https://github.com/1jehuang/jcode для встановлення
```

---

### Крок 3 — Налаштуйте через панель управління

1. Перейдіть на `http://localhost:20128/dashboard/cli-code`
2. Знайдіть свій інструмент у сітці
3. Клікніть на картку, щоб відкрити сторінку деталей інструмента
4. Виберіть свій ключ API та базову URL
5. Клікніть **Застосувати конфігурацію** або скопіюйте фрагмент конфігурації вручну

---

### Крок 4 — Встановіть глобальні змінні середовища

```bash
# Універсальна точка доступу OmniRoute
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI читає GOOGLE_GEMINI_BASE_URL на ROOT (його SDK самостійно додає /v1beta/... )
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> Для **віддаленого сервера** замініть `localhost:20128` на IP-адресу або домен сервера,
> наприклад, `http://<your-server-ip>:20128`.

---

### Крок 4 — Налаштуйте кожен інструмент

#### Claude Code

```bash
# Створіть ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Використовуйте єдиний корінь шлюзу Anthropic для Claude Code. Не додавайте `/v1` тут.

**Тест:** `claude "say hello"`

---

#### OpenAI Codex

Сучасний Codex (v0.137+) читає `~/.codex/config.toml` лише — старий
`config.yaml` належить до застарілого npm CLI і тихо ігнорується. Ключ API
залишається в змінній середовища `OMNIROUTE_API_KEY` (`env_key`), ніколи
всередині файлу:

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

Повна довідка (профілі, `wire_api`, вікна контексту): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

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

> Використовуйте `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> щоб надіслати варіанти мислення.

---

#### Cline (CLI або VS Code)

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
Налаштування розширення Cline → API Provider: `OpenAI Compatible` → Base URL: `http://localhost:20128/v1`

Або використовуйте панель управління OmniRoute → **CLI Tools → Cline → Apply Config**.

---

#### KiloCode (CLI або VS Code)

**Режим CLI:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Налаштування VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Або використовуйте панель управління OmniRoute → **CLI Tools → KiloCode → Apply Config**.

---

#### Continue (Розширення VS Code)

Редагуйте `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Перезапустіть VS Code після редагування.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Використовуйте це, коли VS Code Insiders налаштовано для моделей з користувацькою точкою доступу, і ви хочете, щоб OmniRoute працював без поля заголовка.

**Рекомендоване місце:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Приклад використання токенізованого псевдоніма OmniRoute:**

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

**Примітки:**

- Замініть `sk-your-omniroute-key` на ключ API, створений в OmniRoute.
- Поле `url` повинно вказувати на `/api/v1/vscode/{token}/chat/completions`.
- Поле `modelsUrl` повинно вказувати на `/api/v1/vscode/{token}/models`.
- Віддавайте перевагу нормальному потоку `/v1` + заголовок Bearer, коли клієнт підтримує користувацькі заголовки.
- Токени, вбудовані в URL, є запасним варіантом сумісності і можуть з'являтися в журналах редактора або історії проксі.

---

#### Kiro CLI (Amazon)

```bash
# Увійдіть у свій обліковий запис AWS/Kiro:
kiro-cli login

# CLI використовує свою власну аутентифікацію — OmniRoute не потрібен як бекенд для Kiro CLI.
# Використовуйте kiro-cli разом з OmniRoute для інших інструментів.
kiro-cli status
```

Для настільного додатку **Kiro IDE** використовуйте точку доступу MITM, яку надає OmniRoute
під `/dashboard/cli-tools → Kiro`.

---

## 10. Внутрішній OmniRoute CLI

Бінарний файл `omniroute` надає команди для управління життєвим циклом сервера, налаштування, діагностики та управління провайдерами. Точка входу: `bin/omniroute.mjs`.

```bash
omniroute                              # Запустити сервер (порт за замовчуванням 20128)
omniroute setup                        # Інтерактивний майстер налаштування
omniroute doctor                       # Перевірити конфігурацію, БД, порти, виконання
omniroute providers list               # Налаштовані з'єднання з провайдерами
omniroute providers test-all           # Перевірити кожне активне з'єднання
omniroute reset-password               # Скинути пароль адміністратора
omniroute logs                         # Потік журналів запитів
omniroute health                       # Детальне здоров'я (перерви, кеш, пам'ять)
omniroute --version                    # Вивести версію
omniroute --help                       # Показати всі команди
```

### Налаштування та ініціалізація

```bash
omniroute setup                        # Інтерактивний майстер налаштування
omniroute setup --non-interactive      # CI/автоматизований режим (читає змінні середовища + прапори)
omniroute setup --password '<value>'   # Встановити пароль адміністратора безпосередньо
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Додати та протестувати провайдера за один раз
```

Визнані змінні середовища для неінтерактивного налаштування:

| Var                 | Мета                                                                      |
| ------------------- | ------------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | API-ключ провайдера (прив'язаний до `--api-key` через Commander `.env()`) |
| `DATA_DIR`          | Перезаписати каталог даних OmniRoute                                      |

Всі інші неінтерактивні введення передаються як прапори, а не змінні середовища:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(див. параметри `omniroute setup` вище).

### Діагностика

```bash
omniroute doctor                       # Перевірити конфігурацію, БД, порти, виконання, пам'ять, живість
omniroute doctor --json                # Машинозчитуваний JSON
omniroute doctor --no-liveness         # Пропустити HTTP перевірку здоров'я
omniroute doctor --host 0.0.0.0        # Перезаписати хост живості
omniroute doctor --liveness-url <url>  # Повний URL-адреса кінцевої точки здоров'я
```

Доктор виконує ці перевірки: `Конфігурація`, `База даних`, `Зберігання/шифрування`,
`Доступність порту`, `Виконання вузла`, `Рідний бінарний файл` (better-sqlite3),
`Пам'ять` та `Живість сервера`. Він виходить з ненульовим кодом, якщо будь-яка перевірка не пройшла.

### Управління провайдерами

```bash
omniroute providers available                       # Каталог провайдерів OmniRoute
omniroute providers available --search openai       # Фільтрувати каталог за id/назвою/псевдонімом/категорією
omniroute providers available --category api-key    # Фільтрувати за категорією (api-key, oauth, free, ...)
omniroute providers available --json                # Машинозчитуваний JSON

omniroute providers list                            # Налаштовані з'єднання з провайдерами
omniroute providers list --json

omniroute providers test <id|name>                  # Перевірити одне налаштоване з'єднання
omniroute providers test-all                        # Перевірити кожне активне з'єднання
omniroute providers validate                        # Локальна структурна валідація
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Існуючий OAuth потік
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` є API-орієнтованими і, отже, працюють проти
активного локального або віддаленого контексту. Введення облікових даних повинно використовувати
`--credential-stdin` або `--credential-env`; `--dry-run --json` звітує лише про
редаговану присутність/форму. `providers available` читає каталог OmniRoute;
`providers list/test/test-all/validate` зберігають свою локальну поведінку SQLite і
не вимагають, щоб сервер працював.

### Відновлення та скидання

```bash
omniroute reset-password                # Скинути пароль адміністратора (також: omniroute-reset-password)
omniroute reset-encrypted-columns       # Показати попередження + пробний запуск для скидання зашифрованих облікових даних
omniroute reset-encrypted-columns --force  # Насправді скинути зашифровані облікові дані в SQLite
```

### Експорт облікових даних (⚠ обробляти з обережністю)

```bash
omniroute auth export                                 # Показати попередження + підтвердження — без доступу до БД
omniroute auth export --force                          # Експортувати ВСІ РОЗШИФРОВАНІ облікові дані з'єднань у stdout як JSON
omniroute auth export --force --id <id>                 # Експортувати лише відповідне з'єднання
omniroute auth export --force --format env               # Вивести рядки OMNIROUTE_<PROVIDER>_<FIELD>=<value>
omniroute auth export --force --out creds.json           # Записати у файл (створений з правами 0600)
```

`auth export` є **локальним** (пряме читання з SQLite, без HTTP маршруту) і навмисно виводить/записує
**текстові** значення `apiKey`/`accessToken`/`refreshToken`/`idToken` — це функція, а не
помилка. Нічого не читається з бази даних, і нічого не розшифровується без `--force`. Попереджувальний банер завжди виводиться перед будь-яким текстовим виводом. Потрібно, щоб `STORAGE_ENCRYPTION_KEY`
був встановлений. Поле, яке не вдалося розшифрувати (застарілий ключ, пошкоджений шифротекст), повідомляється як
`<field>DecryptFailed: true` замість того, щоб переривати весь експорт або витікати основну помилку.

### Інші підкоманди

Ці команди передбачають, що сервер OmniRoute працює, якщо не зазначено інше:

```bash
omniroute status                       # Комплексний статус виконання
omniroute logs                         # Потік журналів запитів (--json, --search, --follow)
omniroute config show                  # Відобразити поточну конфігурацію

omniroute provider list                # Перелік доступних провайдерів (псевдонім команди providers list)
omniroute provider add                 # Зареєструвати OmniRoute як провайдера в інструменті
omniroute keys add | list | remove     # Управління API-ключами
omniroute models [provider]            # Перелік моделей (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Знімок конфігурації + БД
omniroute restore                      # Відновлення з попереднього знімка

omniroute health                       # Детальне здоров'я (перерви, кеш, пам'ять)
omniroute quota                        # Використання квоти провайдера
omniroute cache                        # Статус кешу
omniroute cache clear                  # Очистити семантичні + підписні кеші

omniroute mcp status | restart         # Статус сервера MCP / перезапуск
omniroute a2a status | card            # Статус сервера A2A / картка агента

omniroute tunnel list | create | stop  # Управління тунелями (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Перегляд / встановлення змінних середовища (тимчасово)

omniroute test                         # Тест на підключення провайдера
omniroute update                       # Перевірити наявність оновлень
omniroute completion                   # Генерувати завершення оболонки
```

### Загальні прапори

| Прапор              | Опис                                                 |
| ------------------- | ---------------------------------------------------- |
| `--no-open`         | Не відкривати браузер автоматично при запуску        |
| `--port <n>`        | Перезаписати порт API (за замовчуванням 20128)       |
| `--mcp`             | Запустити як сервер MCP через stdio (для IDE)        |
| `--non-interactive` | CI режим (без запитів; читає з env/flags)            |
| `--json`            | Машинозчитуваний JSON вивід (doctor, providers тощо) |
| `--help`, `-h`      | Показати специфічну допомогу для команди             |
| `--version`, `-v`   | Вивести встановлену версію                           |

---

## Доступні API кінцеві точки

| Кінцева точка              | Опис                             | Використовується для                           |
| -------------------------- | -------------------------------- | ---------------------------------------------- |
| `/v1/chat/completions`     | Стандартний чат (всі провайдери) | Усі сучасні інструменти                        |
| `/v1/responses`            | API відповідей (формат OpenAI)   | Codex, агентні робочі процеси                  |
| `/v1/completions`          | Спадкові текстові завершення     | Старі інструменти, що використовують `prompt:` |
| `/v1/embeddings`           | Текстові вектори                 | RAG, пошук                                     |
| `/v1/images/generations`   | Генерація зображень              | GPT-Image, Flux тощо                           |
| `/v1/audio/speech`         | Текст у мову                     | ElevenLabs, OpenAI TTS                         |
| `/v1/audio/transcriptions` | Мова в текст                     | Deepgram, AssemblyAI                           |

Готові до вставки приклади з токенізованим OmniRoute URL:

```txt
Token example: sk-a3ab3c080beaee3a-69f4a4-070d71af

Стандартна база OpenAI: http://localhost:20128/v1
Моделі VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
Чат VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
Відповіді VS Code: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Теги Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Чат Ollama: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Усунення неполадок

| Помилка                                                | Причина                      | Виправлення                                        |
| ------------------------------------------------------ | ---------------------------- | -------------------------------------------------- |
| `Connection refused`                                   | OmniRoute не працює          | `omniroute serve`                                  |
| `401 Unauthorized`                                     | Неправильний API ключ        | Перевірте в `/dashboard/api-manager`               |
| `No combo configured`                                  | Немає активного маршруту     | Налаштуйте в `/dashboard/combos`                   |
| CLI показує "not installed"                            | Бінарний файл не в PATH      | Перевірте `which <command>`                        |
| Панель приладів показує "not detected" після установки | Кеш застарілий               | Натисніть "⟳ Оновити виявлення" на панелі приладів |
| Старе посилання `/dashboard/cli-tools`                 | Закладка до версії до v3.8.6 | Авто-редирект на `/dashboard/cli-code` (308)       |
| Старе посилання `/dashboard/agents`                    | Закладка до версії до v3.8.6 | Авто-редирект на `/dashboard/acp-agents` (308)     |
