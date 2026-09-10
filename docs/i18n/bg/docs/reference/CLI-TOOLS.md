# CLI-TOOLS (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI инструменти — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI инструменти — OmniRoute

Последно обновление: 2026-08-18

OmniRoute интегрира три категории CLI инструменти, разпределени на три специализирани страници на таблото:

| Страница       | Път                     | Концепция                                                                                     | Брой            |
| -------------- | ----------------------- | --------------------------------------------------------------------------------------------- | --------------- |
| **CLI Кодове** | `/dashboard/cli-code`   | Инструменти за кодиране, които насочвате към OmniRoute (Клиент → CLI → OmniRoute → Доставчик) | 26              |
| **CLI Агенти** | `/dashboard/cli-agents` | Автономни агенти, които насочвате към OmniRoute (същия поток, по-широк обхват)                | 8               |
| **ACP Агенти** | `/dashboard/acp-agents` | CLI, които OmniRoute създава като бекенд чрез stdio/ACP (обратен поток)                       | вижте регистъра |

Наследствените маршрути пренасочват чрез 308: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## Как работи

```
CLI Кодове / CLI Агенти (поток на потребление):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (всички насочват към OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute маршрутизира към правилния доставчик)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP Агенти (обратен поток на създаване):
    Клиентска заявка → OmniRoute → създава CLI чрез stdio/ACP → отговор
```

**Ползи:**

- Един API ключ за управление на всички инструменти
- Проследяване на разходите за всички CLI в таблото
- Смяна на модели без пренастройване на всеки инструмент
- Работи локално и на отдалечени сървъри (VPS, Docker, Akamai, Cloudflare Tunnel)

---

## Автоматична конфигурация с `setup-*`

Не е необходимо да пишете конфигурацията на всеки инструмент на ръка. OmniRoute предлага команда `setup-*`
за всеки поддържан CLI, която чете **активния** каталог на модели от работещ
OmniRoute (локален или отдалечен) и записва собствената конфигурация на инструмента на вашата машина:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

Всеки приема `--remote <url> --api-key <key>` (конфигуриране на локален инструмент спрямо
отдалечен OmniRoute), `--dry-run` (преглед без запис), и `--port`. Инструменти
без автоматично откриване на модел (Cline, Kilo, Roo, Goose, Aider, Qwen) приемат
`--model <id>` (и `--yes` за неинтерактивни изпълнения). За да стартирате CLI с
правилната среда инжектирана и без записана конфигурация, използвайте общия
`omniroute run <target>` стартер (claude, codex, aider, goose, opencode, qwen,
gemini — целите и алиасите идват от `bin/cli/cli-manifest.mjs`); наследствените
стартери за всеки инструмент `omniroute launch` (Claude Code) и `omniroute launch-codex`
(Codex) остават налични. Gemini CLI е само за стартиране: той е цел за `omniroute run`
но няма `setup-*`/`configure` рецепта.

> **Пълен справочник:** главната таблица — какво пише всяка команда, всеки флаг,
> локално срещу отдалечено, и кои инструменти искат суфикс `/v1` — се намира в
> **[CLI Интеграции](../guides/CLI-INTEGRATIONS.md)**.

### Изпълнение на тези команди в контейнер

Команда `setup-*`, изпълнена в контейнера на OmniRoute, записва в
собствената домашна директория на контейнера, която никой хост CLI не чете и която изчезва с
контейнера. OmniRoute открива това и излиза с `2` с инструкции, вместо да записва. Два поддържани начина напред — инсталирайте CLI на хоста и
`omniroute connect` към контейнера, или свържете директориите за конфигурация и задайте
`CLI_CONFIG_HOME` (профил на compose `host`). Всяка команда `setup-*`, плюс
`omniroute configure` и `omniroute config set`, приема
`--allow-container-write`, когато конфигурирането на собствените CLI на контейнера е това, което наистина имате предвид; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` прави същото за
сървъра. Вижте
[Docker Ръководство → Конфигуриране на инструменти CLI на хоста](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker).

**apply endpoint** на таблото (`POST /api/cli-tools/apply`) налага
същата защита: в контейнер, запис, чиято цел не е свързана от хоста, отговаря с **`422`** с `containerEphemeralTarget: true`, безопасен текст за грешка и — за инструментите с рецепта за хост (claude, codex, opencode, cline,
kilo, continue) — `hostSetupCommand` (например `omniroute setup-opencode`), който да се изпълни
на хоста вместо това; нищо не се записва. `dryRun: true` продължава да работи в режим на контейнер
и връща генерираното съдържание + целевия път без да докосва диска, така че
можете да прегледате от таблото и да приложите на хоста. Това поведение е
намерено и защитено от регресия с
`tests/unit/api/cli-tools/apply-container-guard.test.ts` — никога не "поправяйте" 422
чрез премахване на защитата.

---

## Източник на истината

Обединеният каталог се намира в `src/shared/constants/cliTools.ts` като `CLI_TOOLS: Record<string, CliCatalogEntry>`.

Всеки запис има тези полета (определени в `src/shared/schemas/cliCatalog.ts`):

| Поле                                            | Тип                                                          | Описание                                                                   |
| ----------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | На коя страница се появява инструментът                                    |
| `vendor`                                        | `string`                                                     | Произход на инструмента ("Anthropic", "OSS (P. Gauthier)")                 |
| `acpSpawnable`                                  | `boolean`                                                    | Също така използваем като ACP агент (показан значка)                       |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | Ниво на поддръжка на персонализирани крайни точки. `"none"` = MITM backlog |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | Механизъм за конфигурация                                                  |
| `id`, `name`, `color`, `description`, `docsUrl` | стандарт                                                     | Основни полета за показване                                                |

Записите с `baseUrlSupport: "none"` **не се показват** на страниците на таблото — те са регистрирани в MITM backlog за план 11 (виж `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### Нива на способности (каталогизирани × откриваеми × конфигурируеми × стартиваеми)

Не всеки каталогизиран инструмент е откриваем, конфигурируем или стартиваем. Всяко ниво има един
деклариращ източник, а тест за отклонение ги поддържа синхронизирани:

| Ниво               | Значение                                                                                  | Декларирано в                                                     |
| ------------------ | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Каталогизирано** | Появява се в каталога на таблото (име, производител, документация, тип конфигурация)      | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **Откриваемо**     | Откритие на бинарни/конфигурационни файлове, проверки на здравето, пътища за конфигурация | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` runtime catalog) |
| **Конфигурируемо** | Поддържа се от `omniroute configure <cli>` (съществува рецепта за настройка)              | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **Стартиваемо**    | Поддържа се от `omniroute run <target>` (определено инжектиране на env/args)              | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs` е каноничният изпълним манифест за командата CLI
повърхности: `run`, `configure` и генераторите за завършване на командния ред произвеждат своите
списъци с цели, разрешаване на псевдоними (например `kilocode`/`kilo-code`/`kilo_cli` → `kilo`)
и свързване на флага `--model` от него. Тестът за отклонение
`tests/unit/cli/cli-manifest-drift.test.ts` удостоверява, че манифестът, времевият
каталог, UI каталогът и всяка повърхност на потребителя остават синхронизирани — цел, добавена към
една повърхност без другите, проваля тестовия пакет вместо да се отклонява безшумно.

## 1. Каталог на CLI кода (26 инструмента)

Всички инструменти, които се появяват в `/dashboard/cli-code`. Тези с `baseUrlSupport: none` са свързани чрез MITM или ръководство вместо персонализиран базов URL:

| id           | име                     | доставчик             | baseUrlSupport | тип конфигурация | acpSpawnable |
| ------------ | ----------------------- | --------------------- | -------------- | ---------------- | ------------ |
| claude       | Claude Code             | Anthropic             | full           | env              | true         |
| codex        | OpenAI Codex CLI        | OpenAI                | full           | custom           | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                  | none           | custom           | false        |
| cline        | Cline                   | OSS (бивш Claude Dev) | full           | custom           | true         |
| kilo         | Kilo Code               | Kilo-Org              | full           | custom           | false        |
| roo          | Roo Code                | Roo (OSS)             | full           | guide            | false        |
| continue     | Continue                | continue.dev          | full           | guide            | false        |
| aider        | Aider                   | OSS (П. Готие)        | full           | guide            | true         |
| forge        | ForgeCode               | Antinomy HQ           | full           | custom           | true         |
| jcode        | jcode                   | 1jehuang (OSS)        | full           | custom           | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)     | full           | custom           | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)          | full           | custom           | false        |
| opencode     | OpenCode                | Anomaly (бивш SST)    | full           | guide            | true         |
| droid        | Factory Droid           | Factory AI            | partial        | guide            | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS             | full           | custom           | false        |
| cursor-cli   | Cursor CLI              | Anysphere             | partial        | guide            | true         |
| smelt        | Smelt                   | leonardcser (OSS)     | full           | custom           | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)      | full           | custom           | false        |
| grok-build   | Grok Build              | xAI                   | full           | custom           | false        |
| crush        | Crush                   | OSS (Charm)           | full           | custom           | false        |
| qwen         | Qwen Code               | Alibaba               | full           | guide            | true         |
| cursor       | Cursor                  | Anysphere             | none           | guide            | false        |
| antigravity  | Antigravity             | Google                | none           | mitm             | false        |
| hermes       | Hermes                  | Nous Research         | none           | guide            | false        |
| kiro         | Kiro AI                 | Amazon                | none           | mitm             | false        |
| custom       | Custom CLI              | —                     | full           | custom-builder   | false        |

Инструментите с `baseUrlSupport: "partial"` показват значка "⚠ Частичен базов URL" в картата на таблото.

## 2. Каталог на CLI агенти (8 инструмента)

Автономни агенти, които се появяват в `/dashboard/cli-agents`:

| id           | име              | доставчик                | поддръжка на baseUrl | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | пълна                | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | пълна                | true         |
| goose        | Goose            | Block / Linux Foundation | пълна                | true         |
| interpreter  | Open Interpreter | OSS                      | пълна                | true         |
| warp         | Warp AI          | Warp Inc.                | частична             | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | пълна                | false        |
| omp          | Oh My Pi         | OSS                      | пълна                | true         |
| letta        | Letta CLI        | Letta                    | пълна                | false        |

---

## 3. ACP агенти (/dashboard/acp-agents)

Тази страница (преименувана от `/dashboard/agents`) показва CLI, които OmniRoute може да **създаде** като бекенд изпълнителни двигатели чрез протокола stdio/ACP. Каталогът се поддържа отделно в `src/lib/acp/registry.ts` и **не** е същият като `CLI_TOOLS`.

---

## 4. MITM задължения (не показани в таблото)

Следните CLI не поддържат персонализиран base URL по подразбиране и **не са изброени** в страниците на CLI Code или CLI Agents. Те са кандидати за MITM прихващане в план 11:

| CLI                 | Причина                                                             |
| ------------------- | ------------------------------------------------------------------- |
| windsurf            | BYOK ограничен до избрани модели на Claude + корпоративен URL/токен |
| amp                 | Затворена екосистема (Sourcegraph)                                  |
| amazon-q / kiro-cli | AWS SSO удостоверяване, без персонализиран URL                      |
| cowork              | Anthropic Desktop, без конфигурируем крайна точка                   |

Вижте `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` за пълния крос-референс.

---

## 5. API за откриване на партиди

Всички открития на инструменти се агрегат чрез единен крайна точка:

**`GET /api/cli-tools/all-statuses`**

- Удостоверяване: `requireCliToolsAuth(request)` (същото като другите маршрути `/api/cli-tools/`)
- Връща: `Record<toolId, ToolBatchStatus>` (тип: `src/shared/types/cliBatchStatus.ts`)
- Стратегия: `Promise.all` за всички инструменти, 5s таймаут на инструмент
- Кеш: в паметта LRU, индексиран по конфигурационен файл `mtime`. Кешът се невалидира, когато mtime се променя. Нулира се при рестарт на сървъра.

Форма на отговора за всеки инструмент:

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
  error?: string; // санитаризирано, без стек трасове
}
```

## 6. Настройки на обработчиците за нови инструменти

Новите инструменти с `configType: "custom"` имат специализирани API маршрути за настройки:

| Маршрут                                     | Инструмент                                                                     |
| ------------------------------------------- | ------------------------------------------------------------------------------ |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                                        |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url флаг)                                                        |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, наследствен)                                    |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, основен + наследствен `~/.deepseek` синхронизация) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                                          |
| `POST /api/cli-tools/pi-settings`           | Pi кодов агент                                                                 |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)                          |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + специален `.env` ключ)                    |

Всички маршрути използват `sanitizeErrorMessage()` за отговори при грешки (Твърдо правило #12).

---

## 7. Архитектура на страниците на таблото

### CLI Код (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — сървърен компонент
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — клиентска решетка
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — страница с детайли за инструмента
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 специализирани карти за инструменти + `ToolDetailClient.tsx`

### CLI Агенти (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — сървърен компонент
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — клиентска решетка
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — повторно използва `ToolDetailClient`

### ACP Агенти (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — сървърен компонент (преместен от `agents/`)

### Споделени UI Компоненти (`src/shared/components/cli/`)

| Файл                    | Цел                                                           |
| ----------------------- | ------------------------------------------------------------- |
| `CliToolCard.tsx`       | Умен статусен картон (детекция + конфигурация + крайна точка) |
| `CliConceptCard.tsx`    | Карта с обяснение на концепцията на страницата                |
| `CliComparisonCard.tsx` | Сравнение в три колони между CLI типове                       |
| `BaseUrlSelect.tsx`     | Падащо меню за крайна точка (Локално/Облачно/Персонализирано) |
| `ApiKeySelect.tsx`      | Избор на API ключ                                             |
| `ManualConfigModal.tsx` | Модал за копируем фрагмент от конфигурация                    |

### Споделен Хук (`src/shared/hooks/cli/`)

| Файл                      | Цел                                                                                  |
| ------------------------- | ------------------------------------------------------------------------------------ |
| `useToolBatchStatuses.ts` | Извлича `/api/cli-tools/all-statuses`, управлява състоянието на зареждане/освежаване |

## 8. i18n

Нови пространства от имена добавени в план 14 F9:

| Пространство от имена | Цел                                                                                                |
| --------------------- | -------------------------------------------------------------------------------------------------- |
| `cliCommon`           | Споделени низове (етикети на карти, текстове за концепции/сравнения, етикети на детайлни страници) |
| `cliCode`             | Низове на страницата на CLI Code                                                                   |
| `cliAgents`           | Низове на страницата на CLI Agents                                                                 |
| `acpAgents`           | Низове на страницата на ACP Agents                                                                 |

Пълни преводи на PT-BR и EN са предоставени. 39 други локализации автоматично се връщат към EN чрез сливане на ниво пространство от имена в `src/i18n/request.ts`.

---

## 9. Бързо начало

### Стъпка 1 — Получете API ключ за OmniRoute

1. Отворете `/dashboard/api-manager` → **Създайте API ключ**
2. Дайте му име (например `cli-tools`) и изберете всички разрешения
3. Копирайте ключа — ще ви е необходим за всеки CLI по-долу

> Вашият ключ изглежда така: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### Стъпка 2 — Инсталирайте CLI инструменти

Всички инструменти, базирани на npm, изискват Node.js 22.22.2+ или 24.x:

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

# Google Gemini CLI (може да се стартира чрез `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Базиран на Rust

# Pi coding agent
# вижте https://github.com/zechnerj/pi-coding-agent за инсталация

# jcode
# вижте https://github.com/1jehuang/jcode за инсталация
```

---

### Стъпка 3 — Конфигурирайте чрез таблото

1. Отидете на `http://localhost:20128/dashboard/cli-code`
2. Намерете инструмента си в мрежата
3. Щракнете върху картата, за да отворите страницата с детайли на инструмента
4. Изберете вашия API ключ и основен URL
5. Щракнете **Приложи конфигурация** или копирайте ръчно фрагмента за конфигурация

---

### Стъпка 4 — Задайте глобални променливи на средата

```bash
# OmniRoute универсален крайна точка
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI чете GOOGLE_GEMINI_BASE_URL на ROOT (неговият SDK сам добавя /v1beta/... )
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> За **отдалечен сървър** заменете `localhost:20128` с IP адреса или домейна на сървъра,
> например `http://<your-server-ip>:20128`.

---

### Стъпка 4 — Конфигурирайте всеки инструмент

#### Claude Code

```bash
# Създайте ~/.claude/settings.json:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Използвайте обединената коренова точка на Anthropic за Claude Code. Не добавяйте `/v1` тук.

**Тест:** `claude "say hello"`

---

#### OpenAI Codex

Съвременният Codex (v0.137+) чете `~/.codex/config.toml` само — старият
`config.yaml` принадлежи на наследения npm CLI и се игнорира безшумно. API
ключът остава в променливата на средата `OMNIROUTE_API_KEY` (`env_key`), никога
във файла:

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

Пълна справка (профили, `wire_api`, контекстни прозорци): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

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

> Използвайте `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> за да изпратите мисловни варианти.

---

#### Cline (CLI или VS Code)

**CLI режим:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code режим:**
Настройки на разширението Cline → API доставчик: `OpenAI Compatible` → Основен URL: `http://localhost:20128/v1`

Или използвайте таблото на OmniRoute → **CLI инструменти → Cline → Приложи конфигурация**.

---

#### KiloCode (CLI или VS Code)

**CLI режим:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**Настройки на VS Code:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

Или използвайте таблото на OmniRoute → **CLI инструменти → KiloCode → Приложи конфигурация**.

---

#### Continue (разширение за VS Code)

Редактирайте `~/.continue/config.yaml`:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

Рестартирайте VS Code след редактиране.

---

#### VS Code Insiders (`chatLanguageModels.json`)

Използвайте това, когато VS Code Insiders е конфигуриран за модели на персонализирани крайни точки и искате OmniRoute да работи без персонализирано поле на заглавката.

**Препоръчано местоположение:**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**Пример с токенизирания псевдоним на OmniRoute:**

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

**Бележки:**

- Заменете `sk-your-omniroute-key` с API ключ, създаден в OmniRoute.
- Полето `url` трябва да сочи към `/api/v1/vscode/{token}/chat/completions`.
- Полето `modelsUrl` трябва да сочи към `/api/v1/vscode/{token}/models`.
- Предпочитайте нормалния поток `/v1` + заглавка Bearer, когато клиентът поддържа персонализирани заглавки.
- Вградени токени в URL са съвместимостна резервна опция и могат да се появят в логовете на редактора или историята на проксито.

---

#### Kiro CLI (Amazon)

```bash
# Влезте в акаунта си в AWS/Kiro:
kiro-cli login

# CLI използва собствена автентикация — OmniRoute не е необходима като бекенд за Kiro CLI самата.
# Използвайте kiro-cli заедно с OmniRoute за други инструменти.
kiro-cli status
```

За настолната апликация **Kiro IDE** използвайте MITM крайна точка, предоставена от OmniRoute
под `/dashboard/cli-tools → Kiro`.

---

## 10. Вътрешен OmniRoute CLI

Бинарният файл `omniroute` предоставя команди за жизнения цикъл на сървъра, настройка, диагностика и управление на доставчици. Точка на вход: `bin/omniroute.mjs`.

```bash
omniroute                              # Стартиране на сървъра (по подразбиране порт 20128)
omniroute setup                        # Интерактивен помощник за настройка
omniroute doctor                       # Проверка на конфигурация, БД, портове, време на работа
omniroute providers list               # Конфигурирани връзки с доставчици
omniroute providers test-all           # Тест на всяка активна връзка
omniroute reset-password               # Нулиране на паролата на администратора
omniroute logs                         # Поток на логовете на заявките
omniroute health                       # Подробно здравословно състояние (разпределители, кеш, памет)
omniroute --version                    # Печат на версията
omniroute --help                       # Показване на всички команди
```

### Настройка и инициализация

```bash
omniroute setup                        # Интерактивен помощник за настройка
omniroute setup --non-interactive      # CI/автоматизираен режим (чете променливи на средата + флагове)
omniroute setup --password '<value>'   # Задаване на парола на администратора директно
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # Добавяне и тестване на доставчик в едно
```

Разпознати променливи на средата за неинтерактивна настройка:

| Var                 | Purpose                                                                |
| ------------------- | ---------------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | API ключ на доставчика (свързан с `--api-key` чрез Commander `.env()`) |
| `DATA_DIR`          | Презаписване на директорията за данни на OmniRoute                     |

Всички останали неинтерактивни входове се предават като флагове, а не променливи на средата:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(вижте опциите за `omniroute setup` по-горе).

### Диагностика

```bash
omniroute doctor                       # Проверка на конфигурация, БД, портове, време на работа, памет, жизненост
omniroute doctor --json                # Машинно четим JSON
omniroute doctor --no-liveness         # Пропускане на HTTP проверката за здравословно състояние
omniroute doctor --host 0.0.0.0        # Презаписване на хоста за жизненост
omniroute doctor --liveness-url <url>  # Презаписване на пълния URL на крайна точка за здравословно състояние
```

Докторът извършва тези проверки: `Конфигурация`, `База данни`, `Съхранение/шифроване`,
`Наличност на порт`, `Време на работа на Node`, `Нативен бинарен файл` (better-sqlite3),
`Памет` и `Жизненост на сървъра`. Излиза с ненулев код, ако някоя проверка е `неуспешна`.

### Управление на доставчици

```bash
omniroute providers available                       # Каталог на доставчиците на OmniRoute
omniroute providers available --search openai       # Филтриране на каталога по id/име/псевдоним/категория
omniroute providers available --category api-key    # Филтриране по категория (api-key, oauth, free, ...)
omniroute providers available --json                # Машинно четим JSON

omniroute providers list                            # Конфигурирани връзки с доставчици
omniroute providers list --json

omniroute providers test <id|name>                  # Тест на една конфигурирана връзка
omniroute providers test-all                        # Тест на всяка активна връзка
omniroute providers validate                        # Локална структурна валидация
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # Съществуващ OAuth поток
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` са API-първи и следователно работят срещу
активния локален или отдалечен контекст. Входът на удостоверение трябва да използва
`--credential-stdin` или `--credential-env`; `--dry-run --json` отчита само
редактирана наличност/форма. `providers available` чете каталога на OmniRoute;
`providers list/test/test-all/validate` запазват локалното си SQLite поведение и
не изискват сървърът да работи.

### Възстановяване и нулиране

```bash
omniroute reset-password                # Нулиране на паролата на администратора (също: omniroute-reset-password)
omniroute reset-encrypted-columns       # Показване на предупреждение + пробен режим за нулиране на шифровани удостоверения
omniroute reset-encrypted-columns --force  # Всъщност нулира шифрованите удостоверения в SQLite
```

### Експорт на удостоверения (⚠ обработвайте с внимание)

```bash
omniroute auth export                                 # Показване на предупреждение + врата за потвърждение — без достъп до БД
omniroute auth export --force                          # Експорт на ВСИЧКИ DECRYPTED удостоверения на връзките в stdout като JSON
omniroute auth export --force --id <id>                 # Експорт само на съответстващата връзка
omniroute auth export --force --format env               # Изход OMNIROUTE_<PROVIDER>_<FIELD>=<value> редове
omniroute auth export --force --out creds.json           # Запис в файл (създаден с 0600 права)
```

`auth export` е **локален** (директно четене от SQLite, без HTTP маршрут) и умишлено печата/записва
**плоски** `apiKey`/`accessToken`/`refreshToken`/`idToken` стойности — това е функция, а не
грешка. Нищо не се чете от базата данни и нищо не се декриптира, без `--force`. Предупредителен банер
винаги се печата преди всяко излъчване на плоски данни. Изисква `STORAGE_ENCRYPTION_KEY` да
бъде зададен. Поле, което не успее да се декриптира (остарял ключ, повреден шифрован текст) се отчита като
`<field>DecryptFailed: true` вместо да прекратява целия експорт или да изтича основната грешка.

### Други подкоманди

Тези предполагат работещ сървър OmniRoute, освен ако не е посочено друго:

```bash
omniroute status                       # Обширен статус на времето на работа
omniroute logs                         # Поток на логовете на заявките (--json, --search, --follow)
omniroute config show                  # Показване на текущата конфигурация

omniroute provider list                # Списък на наличните доставчици (псевдоним на providers list)
omniroute provider add                 # Регистриране на OmniRoute като доставчик на инструмент
omniroute keys add | list | remove     # Управление на API ключове
omniroute models [provider]            # Списък на модели (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # Снимка на конфигурацията + БД
omniroute restore                      # Възстановяване от предишна снимка

omniroute health                       # Подробно здравословно състояние (разпределители, кеш, памет)
omniroute quota                        # Използване на квота на доставчика
omniroute cache                        # Статус на кеша
omniroute cache clear                  # Изчистване на семантични + подписващи кешове

omniroute mcp status | restart         # Статус на MCP сървъра / рестарт
omniroute a2a status | card            # Статус на A2A сървъра / карта на агента

omniroute tunnel list | create | stop  # Управление на тунели (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # Инспекция / задаване на променливи на средата (временни)

omniroute test                         # Тест за свързаност на доставчика
omniroute update                       # Проверка за актуализации
omniroute completion                   # Генериране на завършване на командния ред
```

### Общи флагове

| Flag                | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `--no-open`         | Не отваряйте автоматично браузъра при стартиране       |
| `--port <n>`        | Презаписване на API порта (по подразбиране 20128)      |
| `--mcp`             | Работете като MCP сървър през stdio (за IDE)           |
| `--non-interactive` | CI режим (без подканвания; чете от променливи/флагове) |
| `--json`            | Машинно четим JSON изход (doctor, providers и др.)     |
| `--help`, `-h`      | Показване на помощ, специфична за командата            |
| `--version`, `-v`   | Печат на инсталираната версия                          |

---

## Налични API крайни точки

| Крайна точка               | Описание                           | Използва се за                             |
| -------------------------- | ---------------------------------- | ------------------------------------------ |
| `/v1/chat/completions`     | Стандартен чат (всички доставчици) | Всички съвременни инструменти              |
| `/v1/responses`            | API за отговори (формат OpenAI)    | Codex, агентни работни потоци              |
| `/v1/completions`          | Остарели текстови завършвания      | По-стари инструменти, използващи `prompt:` |
| `/v1/embeddings`           | Текстови вграждания                | RAG, търсене                               |
| `/v1/images/generations`   | Генерация на изображения           | GPT-Image, Flux и др.                      |
| `/v1/audio/speech`         | Текст към реч                      | ElevenLabs, OpenAI TTS                     |
| `/v1/audio/transcriptions` | Реч към текст                      | Deepgram, AssemblyAI                       |

Примери, готови за поставяне с токенизиран OmniRoute URL:

```txt
Token пример: sk-a3ab3c080beaee3a-69f4a4-070d71af

Стандартен OpenAI базов: http://localhost:20128/v1
VS Code модели: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code чат: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code отговори: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama тагове: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama чат: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## Отстраняване на проблеми

| Грешка                                         | Причина                        | Решение                                                    |
| ---------------------------------------------- | ------------------------------ | ---------------------------------------------------------- |
| `Connection refused`                           | OmniRoute не работи            | `omniroute serve`                                          |
| `401 Unauthorized`                             | Грешен API ключ                | Проверете в `/dashboard/api-manager`                       |
| `No combo configured`                          | Няма активна рутинг комбинация | Настройте в `/dashboard/combos`                            |
| CLI показва "not installed"                    | Бинарният файл не е в PATH     | Проверете `which <command>`                                |
| Таблото показва "not detected" след инсталация | Кешът е остарял                | Кликнете "⟳ Refresh detection" в таблото                   |
| Стара връзка `/dashboard/cli-tools`            | Закладка преди v3.8.6          | Автоматично пренасочване към `/dashboard/cli-code` (308)   |
| Стара връзка `/dashboard/agents`               | Закладка преди v3.8.6          | Автоматично пренасочване към `/dashboard/acp-agents` (308) |
