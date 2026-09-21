# Repository Map (Русский)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Однострочное описание каждого каталога и файла в корне.**
> Последнее обновление: 2026-06-28 — OmniRoute v3.8.40
>
> Используйте эту карту для быстрой навигации по кодовой базе. Для подробного изучения переходите по ссылкам на специализированную документацию.

## Дерево верхнего уровня

```
OmniRoute/
├── src/                  # Приложение Next.js 16 (интерфейс + маршруты API + библиотеки + предметная область + сервер)
├── open-sse/             # Рабочее пространство потокового движка (обработчики, исполнители, транслятор, сервер MCP)
├── electron/             # Обёртка настольного приложения (Electron 41 + electron-builder 26.10)
├── bin/                  # Точка входа CLI и обработчики команд
├── scripts/              # Скрипты сборки, проверки, синхронизации и разовых задач
├── docs/                 # Общедоступная документация (вы находитесь здесь)
├── tests/                # Все наборы тестов (модульные, интеграционные, e2e, клиенты протоколов)
├── public/               # Статические ресурсы Next.js, манифест PWA, сервис-воркер, значки
├── config/               # Статическая конфигурация + состояние контрольных точек качества (i18n, payloadRules, quality/)
├── images/               # Изображения для маркетинговых материалов / README
├── @omniroute/           # Публикуемые сопутствующие пакеты (opencode-plugin, opencode-provider)
├── skills/               # Пакеты навыков CLI/агентов (cli-* + omni-* + config-codex-cli)
├── examples/             # Примеры плагинов + стартовый шаблон omniroute-cmd-hello
├── contrib/              # Вклад сообщества (podman/)
├── .source/              # Конфигурация исходников Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Рабочие процессы GitHub Actions + шаблоны задач + шаблон PR
├── .husky/               # Git-хуки (pre-commit, pre-push)
├── .claude/              # Слеш-команды Claude Code (на уровне проекта)
├── .agents/              # Рабочие процессы и навыки Codex / универсальных агентов (зеркало .claude/)
├── .vscode/              # Настройки рабочего пространства VS Code
├── _ideia/               # Заметки по планированию (неформальные; не входят в поставку)
├── _mono_repo/           # Исторические подпроекты (cloud, site, vscode-extension)
├── _references/          # Доступные только для чтения клоны связанных OSS-проектов
├── _tasks/               # Файлы отслеживания задач для отдельных выпусков (неформальные)
├── .build/ .worktrees/ dist/   # Локальные временные данные сборки / рабочих деревьев git / результатов сборки (игнорируются git)
├── .issues/              # Локальный кеш задач (игнорируется git)
├── .playwright-mcp/      # Артефакты тестирования Playwright MCP
├── coverage/             # Результаты покрытия c8 (игнорируются git)
├── logs/                 # Журналы среды выполнения (игнорируются git)
├── node_modules/         # Зависимости (игнорируются git)
├── package/              # Промежуточная область npm pack (артефакт сборки)
├── .next/                # Результаты сборки Next.js (игнорируются git)
└── (корневые файлы — см. ниже)
```

---

## Корневые файлы

| Файл                                        | Назначение                                                                                         |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **README.md**                               | Маркетинговая посадочная страница + быстрый старт + матрица возможностей (см. также `llm.txt`)     |
| **CHANGELOG.md**                            | Журнал изменений для каждого релиза (автоматически создаётся навыком `/version-bump-cc`)           |
| **LICENSE**                                 | Текст лицензии MIT                                                                                 |
| **CLAUDE.md**                               | Правила проекта для агентов Claude Code (строгие правила, соглашения, сценарии)                    |
| **AGENTS.md**                               | То же, что и CLAUDE.md, но для ИИ-агентов, отличных от Claude (Codex, Cursor и т. д.)              |
| **GEMINI.md**                               | Краткие правила для агентов на базе Gemini (подмножество CLAUDE.md)                                |
| **CONTRIBUTING.md**                         | Руководство для участников: настройка, conventional commits, тестирование, процесс PR              |
| **SECURITY.md**                             | Политика сообщения об уязвимостях, поддерживаемые версии, модель угроз                             |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — требования к поведению участников сообщества                                |
| **llm.txt**                                 | Текстовая посадочная страница, оптимизированная для поисковых роботов LLM (SEO для ИИ-ассистентов) |
| **package.json**                            | Манифест npm, скрипты, зависимости, движки, порог покрытия c8                                      |
| **package-lock.json**                       | Зафиксированное дерево зависимостей                                                                |
| **tsconfig.json**                           | Корневая конфигурация TypeScript                                                                   |
| **tsconfig.typecheck-core.json**            | Конфигурация проверки типов для ядра `src/`                                                        |
| **tsconfig.typecheck-noimplicit-core.json** | Строгая проверка типов (`noImplicitAny`)                                                           |
| **tsconfig.tsbuildinfo**                    | Кеш инкрементальной сборки TS (игнорируется Git)                                                   |
| **next.config.mjs**                         | Конфигурация сборки Next.js 16 (автономный вывод)                                                  |
| **next-env.d.ts**                           | Автоматически создаваемые Next.js типы переменных окружения                                        |
| **eslint.config.mjs**                       | Плоская конфигурация ESLint (правила для каждой области проекта)                                   |
| **prettier.config.mjs**                     | Правила форматирования Prettier                                                                    |
| **postcss.config.mjs**                      | Конфигурация PostCSS для конвейера Tailwind/CSS                                                    |
| **playwright.config.ts**                    | Конфигурация сквозных тестов Playwright                                                            |
| **vitest.config.ts**                        | Конфигурация Vitest (набор тестов по умолчанию)                                                    |
| **vitest.mcp.config.ts**                    | Конфигурация Vitest для наборов тестов MCP-сервера / autoCombo / кеша                              |
| **sonar-project.properties**                | Конфигурация SonarQube/SonarCloud (качество кода)                                                  |
| **Dockerfile**                              | Многоэтапная сборка Docker (builder → runner-base → runner-cli)                                    |
| **docker-compose.yml**                      | Конфигурация Compose для разработки с 4 профилями (base, cli, host, cliproxyapi) + сервис Redis    |
| **docker-compose.prod.yml**                 | Конфигурация Compose для рабочей среды (порт 20130, Redis, именованные тома)                       |
| **.dockerignore**                           | Файлы, исключённые из контекста Docker                                                             |
| **fly.toml**                                | Конфигурация развёртывания Fly.io (регион `sin`, порт 20128, том /data)                            |
| **.env.example**                            | Шаблон файла переменных окружения (автоматически копируется в `.env` при первой установке)         |
| **.gitignore**                              | Шаблоны игнорирования Git                                                                          |
| **.npmignore**                              | Список исключений при публикации npm                                                               |
| **.npmrc**                                  | Конфигурация npm (реестр, политика lock-файлов)                                                    |
| **.node-version**                           | Закреплённая версия Node (используется инструментами, совместимыми с nvm)                          |
| **.nvmrc**                                  | Закреплённая версия Node для nvm                                                                   |
| **eslint.complexity.config.mjs**            | Конфигурация ESLint для контроля сложности (`scripts/check/check-complexity.mjs --config`)         |
| **eslint.sonarjs.config.mjs**               | Конфигурация ESLint для правил SonarJS (когнитивная сложность / дублирование)                      |
| **source.config.ts**                        | Конфигурация источника Fumadocs `defineDocs` (формирует `.source/`)                                |
| **knip.json**                               | Конфигурация Knip — неиспользуемые файлы/экспорты/зависимости (для проверки мёртвого кода)         |
| **stryker.conf.json**                       | Конфигурация мутационного тестирования Stryker                                                     |
| **.size-limit.json**                        | Конфигурация бюджета размера бандла size-limit                                                     |
| **promptfooconfig.yaml**                    | Конфигурация оценки promptfoo                                                                      |
| **.gitleaks.toml**                          | Набор правил gitleaks для сканирования секретов                                                    |
| **.zizmor.yml**                             | Конфигурация zizmor для проверки безопасности GitHub Actions                                       |
| **socket.yml**                              | Конфигурация Socket.dev для защиты цепочки поставок                                                |
| **news.json**                               | Локализованная лента объявлений v2; элемент запуска Radar поставляется неактивным                  |
| **flake.nix** / **flake.lock**              | Определение dev-оболочки Nix + файл блокировки                                                     |
| **.env**                                    | Локальные секреты (игнорируются Git — генерируется из `.env.example`)                              |

> **Перемещено из корневого каталога в v3.8.26 (для упорядочивания):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` и генерируемый файл `quality-metrics.json` (игнорируется Git). См. [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — приложение Next.js

```
src/
├── app/                 # App Router (страницы + маршруты API + страницы состояния + лендинг)
├── lib/                 # Основные библиотеки / доменные модули (80 подкаталогов + ~70 файлов верхнего уровня)
├── domain/              # Чистая доменная логика (движок политик, резервные сценарии, стоимость, блокировка, comboResolver, оценка)
├── server/              # Только серверные модули (конвейер авторизации, cors, middleware аутентификации) — нельзя импортировать на клиенте
├── shared/              # Общий код для сервера и клиента там, где это безопасно (константы, типы, валидация, контракты, утилиты)
├── i18n/                # Конфигурация next-intl + JSON-файлы сообщений для каждой локали (42 локали)
├── middleware/          # Middleware Next.js (обогащение запросов, определение локали)
├── mitm/                # Ядро MITM-прокси: создание/установка сертификатов, обработчики, целевые сервисы, инспектор, маски, сквозная передача
│   ├── handlers/        # 9 классов обработчиков IDE-агентов, расширяющих MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Слой перехвата трафика: буфер (кольцевой буфер в памяти), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Связующий код адаптера моделей (устаревшая прослойка)
├── scripts/             # Встроенные скрипты обслуживания (например, backfillAggregation)
├── sse/                 # Устаревшие обработчики/сервисы SSE (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Устаревшее хранилище в памяти (постепенно заменяется на src/lib/db)
├── types/               # Общие файлы типов TS
├── instrumentation.ts   # Хук телеметрии Next.js (браузер + edge)
├── instrumentation-node.ts  # Инструментирование только для Node
└── proxy.ts             # Входная прослойка HTTP-прокси
```

### `src/app/` — App Router (Next.js 16)

| Путь                                                                         | Назначение                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Публичный API, совместимый с OpenAI (~25 подмаршрутов: чат, дополнения, эмбеддинги, файлы, пакеты, аудио, изображения, видео, музыка, переранжирование, модерация, поиск, ws, агенты, учётные записи, провайдеры и т. д.)                                                                                                     |
| `app/api/v1beta/`                                                            | Конечные точки API в стиле Gemini                                                                                                                                                                                                                                                                                             |
| `app/api/playground/`                                                        | Маршруты Playground Studio: `improve-prompt/` (POST — переформулирование промпта с помощью LLM), `presets/` (GET — список / POST — создание), `presets/[id]/` (GET / PUT / DELETE) — см. `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                               |
| `app/api/` (не v1)                                                           | Маршруты управления/администрирования (~60 каталогов: провайдеры, комбинации, настройки, mcp, a2a, оценки, память, навыки, вебхуки, соответствие требованиям, отказоустойчивость, мониторинг, туннели, инструменты CLI и т. д.)                                                                                               |
| `app/api/tools/agent-bridge/`                                                | REST API AgentBridge — 12 маршрутов (управление сервером, состояние агентов/DNS/сопоставления, обход, сертификат, вышестоящий центр сертификации). LOCAL_ONLY + SPAWN_CAPABLE. См. `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                       |
| `app/api/tools/traffic-inspector/`                                           | REST + WS API Traffic Inspector — более 16 маршрутов (запросы, сеансы, хосты, режимы захвата, экспорт, ws). LOCAL_ONLY + SPAWN_CAPABLE. См. `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                        |
| `app/a2a/`                                                                   | Точка входа A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                    |
| `app/.well-known/agent.json/`                                                | Карточка агента A2A (обнаружение)                                                                                                                                                                                                                                                                                             |
| `app/(dashboard)/dashboard/`                                                 | Страницы интерфейса панели управления (более 50 разделов, ~118 файлов page.tsx: провайдеры, комбинации, настройки, память, навыки, вебхуки, оценки, аудит, пакетная обработка, кэш, затраты, состояние, система, активность и т. д.)                                                                                          |
| `app/(dashboard)/dashboard/search-tools/`                                    | Интерфейс Search Tools Studio (3 вкладки: поиск/скрапинг/сравнение + SearchConceptCard + ProviderCatalog) — см. `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                      |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (план 21): `page.tsx` (оболочка с 3 вкладками), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Страница AgentBridge на панели управления — карточка сервера, 9 карточек агентов, мастер настройки, сопоставление моделей, список обхода. Интернационализация PT-BR + EN. См. `docs/frameworks/AGENTBRIDGE.md`.                                                                                                               |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Страница Traffic Inspector на панели управления — разделённый интерфейс DevTools, 7 вкладок с подробностями, 4 переключателя режимов захвата, средство записи сеансов, контекстная цветовая маркировка. Интернационализация PT-BR + EN. См. `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                           |
| `app/(dashboard)/dashboard/activity/`                                        | Страница ленты активности (группа B): `page.tsx` (сервер) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — см. `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Страница совместного использования квот (группа B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                               |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Страница конфигурации тарифного плана провайдера (группа B): `page.tsx` + `ProviderPlanConfigClient.tsx` — переопределение параметров квоты для каждого подключения                                                                                                                                                           |
| `app/docs/`                                                                  | Встроенное средство просмотра документации (отображает `docs/*.md`)                                                                                                                                                                                                                                                           |
| `app/landing/`                                                               | Маркетинговая целевая страница                                                                                                                                                                                                                                                                                                |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Страницы, связанные с аутентификацией                                                                                                                                                                                                                                                                                         |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Страницы ошибок HTTP                                                                                                                                                                                                                                                                                                          |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Статические страницы и страницы состояния                                                                                                                                                                                                                                                                                     |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Корневой макет, главная страница, манифест PWA, глобальные стили CSS                                                                                                                                                                                                                                                          |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Границы ошибок                                                                                                                                                                                                                                                                                                                |

### `src/lib/` — Основные библиотеки (~50 модулей)

| Модуль                                   | Назначение                                                                                                                                                                                                                                                                                                                                |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Диспетчер задач протокола A2A, навыки (5), потоковая передача                                                                                                                                                                                                                                                                             |
| `acp/`                                   | Реестр CLI-агентов (локальное обнаружение CLI — см. `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                           |
| `api/`                                   | Общие вспомогательные средства API (`requireManagementAuth`, валидация)                                                                                                                                                                                                                                                                   |
| `auth/`                                  | Сеансы, хеширование паролей, проверка токенов                                                                                                                                                                                                                                                                                             |
| `batches/`                               | Обработчики OpenAI Batches API                                                                                                                                                                                                                                                                                                            |
| `catalog/`                               | Валидация каталога провайдеров с помощью Zod и определение возможностей                                                                                                                                                                                                                                                                   |
| `cloudAgent/`                            | Облачные агенты (Codex Cloud, Devin, Jules) — см. `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                        |
| `combos/`                                | Определение комбинаций и вспомогательные средства изменения порядка                                                                                                                                                                                                                                                                       |
| `audit/`                                 | Вспомогательные средства ленты активности: `highLevelActions.ts` (список разрешённых действий и `isHighLevelAction()`), `activityIcons.ts` (сопоставление действия со значком/глаголом), `timeline.ts` (groupByDay/relativeTime) — см. `docs/architecture/MONITORING_SECTIONS.md`                                                         |
| `compliance/`                            | Журнал аудита и аудит провайдеров — см. `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                                     |
| `compression/`                           | Связующий код движка сжатия (движки находятся в `open-sse/services/compression/`)                                                                                                                                                                                                                                                         |
| `config/`                                | Вспомогательные средства конфигурации среды выполнения                                                                                                                                                                                                                                                                                    |
| `db/`                                    | Более 120 доменных модулей БД и 168 миграций (для SQLite всегда используйте этот модуль)                                                                                                                                                                                                                                                  |
| `quota/`                                 | Механизм совместного использования квот: `dimensions.ts` (типы/Zod), `types.ts` (интерфейс QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — см. `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Клиент каталога бесплатных моделей Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — см. `docs/frameworks/RADAR.md`                                                                                                                                                     |
| `display/`                               | Вспомогательные средства форматирования UI (стоимость, задержка и т. д.)                                                                                                                                                                                                                                                                  |
| `embeddings/`                            | Вспомогательные средства сервиса эмбеддингов                                                                                                                                                                                                                                                                                              |
| `env/`                                   | Разбор и проверка переменных окружения                                                                                                                                                                                                                                                                                                    |
| `evals/`                                 | Фреймворк оценки (наборы тестов, средство запуска, среда выполнения) — см. `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                     |
| `guardrails/`                            | Маскирование персональных данных, защита от инъекций в промпты, мост для обработки изображений — см. `docs/security/GUARDRAILS.md`                                                                                                                                                                                                        |
| `jobs/`                                  | Фоновые задачи (аналогичные cron)                                                                                                                                                                                                                                                                                                         |
| `memory/`                                | Диалоговая память (гибридный RRF на базе SQLite FTS5 и sqlite-vec + Qdrant второго уровня) — см. `docs/frameworks/MEMORY.md`                                                                                                                                                                                                              |
| `memory/embedding/`                      | Слой эмбеддингов с несколькими источниками: `index.ts` (резолвер), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (план 21)                                                                                                                                                                               |
| `memory/vectorStore.ts`                  | Обёртка для sqlite-vec v0.1.9 — полный перебор KNN + гибридный RRF (FTS5 + векторы, k=60). Ленивая инициализация, корректное снижение функциональности при недоступности sqlite-vec. (план 21)                                                                                                                                            |
| `memory/reindex.ts`                      | `runReindexBatch()` — обрабатывает в фоновом режиме записи памяти с `needs_reindex=1`; вызывается через `POST /api/memory/reindex` и при отложенном заполнении данных. (план 21)                                                                                                                                                          |
| `monitoring/`                            | Проверки работоспособности, отправка метрик                                                                                                                                                                                                                                                                                               |
| `oauth/`                                 | Потоки OAuth/импорта для 22 модулей поставщиков (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                               |
| `plugins/`                               | Реестр плагинов                                                                                                                                                                                                                                                                                                                           |
| `promptCache/`                           | Точки разрыва кеша промптов в стиле Anthropic                                                                                                                                                                                                                                                                                             |
| `skills/`                                | Фреймворк навыков (встроенные + маркетплейс + SkillsSH) — см. `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                                 |
| `playground/`                            | Общие вспомогательные модули Playground Studio: `codeExport.ts` (генератор curl/Python/TS), `promptImprover.ts` (конструктор метапромптов), `streamMetrics.ts` (чистые вычисления TTFT/TPS), `types.ts` (таблица цен) — см. `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                        |
| `webhookDispatcher.ts`                   | Доставка вебхуков с HMAC — см. `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                              |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Менеджеры туннелей — см. `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                                      |
| `cloudSync.ts`, `initCloudSync.ts`       | Необязательная облачная синхронизация состояния                                                                                                                                                                                                                                                                                           |
| `localDb.ts`                             | Модуль реэкспорта для модулей БД (без логики — только реэкспорт)                                                                                                                                                                                                                                                                          |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Кэширование запросов + идемпотентность                                                                                                                                                                                                                                                                                                    |
| (ещё ~30 файлов верхнего уровня)         | Специализированные вспомогательные модули (logEnv, modelsDevSync, piiSanitizer и т. д.)                                                                                                                                                                                                                                                   |

### `src/lib/db/` — База данных (122 модуля + 168 миграций)

| Подкаталог                | Назначение                                                                                                                                                                                          |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Синглтон `getDbInstance()` с журналированием WAL                                                                                                                                                    |
| `db/migrations/`          | Версионированные SQL-файлы (идемпотентные, транзакционные). `073_memory_vec.sql` добавляет `memory_vec_meta` + столбец `needs_reindex` (план 21).                                                   |
| `db/playgroundPresets.ts` | CRUD-модуль для предустановок Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                      |
| `db/memoryVec.ts`         | CRUD для `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` и т. д. (план 21)                                       |
| `db/<domain>.ts`          | По одному модулю на домен: провайдеры, комбинации, ключи API, пользователи, сессии, использование, audit*log, вебхуки, навыки, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache и т. д. |

### `src/domain/`

| Модуль                 | Назначение                                                 |
| ---------------------- | ---------------------------------------------------------- |
| `policy.ts`            | Механизм политик                                           |
| `fallbackPolicy.ts`    | Дерево решений для резервного переключения                 |
| `costRules.ts`         | Правила расчёта стоимости                                  |
| `lockoutPolicy.ts`     | Политика блокировки модели/подключения                     |
| `tagRouter.ts`         | Маршрутизация на основе тегов                              |
| `comboResolver.ts`     | Разрешение комбинаций (используется механизмом комбинаций) |
| `modelAvailability.ts` | Проверка доступности для каждой модели                     |
| `assessment/`          | Оценка модели (этап 1 RFC-AUTO-ASSESSMENT )                |

### `src/server/`

| Модуль   | Назначение                                                                                         |
| -------- | -------------------------------------------------------------------------------------------------- |
| `authz/` | Конвейер авторизации: `classify` → `policies` → `enforce` — см. `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Конфигурация CORS                                                                                  |
| `auth/`  | Промежуточное ПО для сеансов                                                                       |

### `src/shared/`

| Модуль                           | Назначение                                                                |
| -------------------------------- | ------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 провайдеров** с валидацией Zod (источник истины)                    |
| `constants/cliTools.ts`          | Реестр внешних инструментов CLI                                           |
| `constants/routingStrategies.ts` | **19 стратегий маршрутизации** с приоритетами                             |
| `constants/publicApiRoutes.ts`   | Маршруты, требующие Bearer-аутентификации (в отличие от административной) |
| `constants/upstreamHeaders.ts`   | Список запрещённых заголовков для восходящих запросов                     |
| `validation/schemas.ts`          | ~80 схем Zod (единый источник истины для контрактов API)                  |
| `validation/helpers.ts`          | Вспомогательные функции валидации Zod (`validateBody` и т. д.)            |
| `types/`                         | Общие типы TS                                                             |
| `contracts/`                     | Публичные контракты API (используются через `files:` в `package.json`)    |
| `utils/circuitBreaker.ts`        | Предохранитель провайдера (см. `docs/architecture/RESILIENCE_GUIDE.md`)   |
| `utils/apiAuth.ts`               | Валидация ключей API, проверка областей доступа                           |
| `utils/fetchTimeout.ts`          | Обёртки для тайм-аутов/прерывания восходящих запросов fetch               |
| `utils/releaseNotes.ts`          | Парсер закрытых объявлений v2/legacy, локализация и скрытие по ID         |

---

## `open-sse/` — Рабочее пространство потокового движка

Отдельное рабочее пространство npm (`@omniroute/open-sse`). Обрабатывает запросы и выполнение операций провайдерами.

```
open-sse/
├── handlers/            # 16 файлов (12 обработчиков + 4 вспомогательных модуля): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search и т. д.
├── executors/           # 67 исполнителей для конкретных провайдеров (расширяют BaseExecutor)
├── translator/          # Конвертеры форматов (9 для запросов, 9 для ответов, 9 вспомогательных)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ сервисных модулей (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM и т. д.)
├── mcp-server/          # Сервер MCP (110 инструментов, 3 транспорта, 33 области доступа)
├── config/              # Реестры провайдеров/моделей, конфигурация заголовков, псевдонимы моделей
├── utils/               # Клиент TLS, proxy fetch/dispatcher, сетевые вспомогательные модули
├── index.ts             # Точка входа рабочего пространства
├── package.json         # Манифест рабочего пространства
├── tsconfig.json        # Конфигурация TS рабочего пространства
└── types.d.ts           # Объявления типов рабочего пространства
```

### `open-sse/mcp-server/`

| Путь                        | Назначение                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------- |
| `server.ts`                 | Жизненный цикл сервера MCP (транспорты stdio + HTTP)                                        |
| `httpTransport.ts`          | Транспорты HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                        |
| `audit.ts`                  | Журналирование аудита в таблицу `mcp_tool_audit`                                            |
| `scopeEnforcement.ts`       | Проверка области доступа для каждого инструмента                                            |
| `runtimeHeartbeat.ts`       | Отправка сигнала работоспособности в `DATA_DIR/runtime/mcp-heartbeat.json`                  |
| `descriptionCompressor.ts`  | Сжатие метаданных описаний инструментов для экономии контекста                              |
| `schemas/tools.ts`          | 36 определений базовых инструментов + области доступа                                       |
| `tools/advancedTools.ts`    | Реализации расширенных инструментов                                                         |
| `tools/memoryTools.ts`      | 3 инструмента памяти (поиск/добавление/очистка)                                             |
| `tools/skillTools.ts`       | 4 инструмента навыков (список/включение/выполнение/выполнения)                              |
| `tools/compressionTools.ts` | 5 инструментов сжатия                                                                       |
| `README.md`                 | Внутренний файл README сервера MCP (перекрёстная ссылка из `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Оболочка настольного приложения

| Файл             | Назначение                                                                                                      |
| ---------------- | --------------------------------------------------------------------------------------------------------------- |
| `main.js`        | Основной процесс Electron (BrowserWindow, встроенный сервер Next.js, системный трей, автоматическое обновление) |
| `preload.js`     | Мост IPC (contextBridge → `window.omniroute`)                                                                   |
| `package.json`   | Конфигурация electron-builder + зависимости Electron 41 + electron-builder 26.10                                |
| `assets/`        | Значки приложения (Windows .ico, macOS .icns, Linux .png)                                                       |
| `dist-electron/` | Результаты сборки (игнорируются Git)                                                                            |
| `types.d.ts`     | Объявления типов для моста рендерера                                                                            |
| `README.md`      | Внутренний файл README Electron (см. также `docs/guides/ELECTRON_GUIDE.md`)                                     |

---

## `bin/` — CLI

| Файл                                                                                                        | Назначение                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Основная точка входа CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` и т. д. |
| `reset-password.mjs`                                                                                        | Автономный CLI для сброса пароля                                                                                                       |
| `cli/commands/setup.mjs`                                                                                    | Интерактивный и неинтерактивный мастер настройки                                                                                       |
| `cli/commands/doctor.mjs`                                                                                   | Диагностика состояния системы (более 8 проверок)                                                                                       |
| `cli/commands/providers.mjs`                                                                                | Просмотр списка, тестирование и проверка поставщиков                                                                                   |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Вспомогательные модули CLI                                                                                                             |
| `cli/tray/tray.ts`                                                                                          | Интеграция с системным треем (кроссплатформенная: NotifyIcon в Windows, systray2 в macOS/Linux)                                        |
| `cli/tray/tray.ps1`                                                                                         | Бэкенд NotifyIcon на PowerShell (Windows, без новых двоичных файлов)                                                                   |
| `cli/tray/autostart.ts`                                                                                     | Кроссплатформенный автозапуск (LaunchAgent / .desktop / реестр)                                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Пятиэтапная цепочка разрешения драйвера SQLite (встроенный → среда выполнения → отложенная установка → node:sqlite → sql.js)           |
| `cli/runtime/magicBytes.mjs`                                                                                | Проверка сигнатурных байтов двоичных файлов (ELF / Mach-O / универсальный Mach-O / PE)                                                 |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — предварительно разрешает драйверы при postinstall / первом запуске                                                |
| `nodeRuntimeSupport.mjs`                                                                                    | Проверка поддерживаемой версии Node.js при установке                                                                                   |

---

## `skills/` — Публичные навыки агентов

| Файл                         | Назначение                                                                            |
| ---------------------------- | ------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 манифестов навыков для внешних ИИ-агентов (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Скрипты сборки и проверки

| Скрипт                              | Назначение                                                                                                       |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Средство запуска в режиме разработки/обычном режиме с загрузкой переменных окружения                             |
| `build-next-isolated.mjs`           | Автономная сборка (автономный режим Next.js 16)                                                                  |
| `prepublish.ts`                     | Подготовка пакета перед `npm pack`                                                                               |
| `postinstall.mjs`                   | Автоматическое создание `.env` из `.env.example` при первой установке                                            |
| `sync-env.mjs`                      | Повторная синхронизация ключей `.env` с `.env.example`                                                           |
| `check-cycles.mjs`                  | Обнаружение циклических зависимостей                                                                             |
| `check-route-validation.mjs`        | Проверка наличия валидации Zod во всех маршрутах API                                                             |
| `check-t11-any-budget.mjs`          | Обеспечение соблюдения явного лимита `any` для каждого файла                                                     |
| `check-docs-sync.mjs`               | Проверка синхронизации версий документации (существующая проверка перед коммитом)                                |
| **`check-env-doc-sync.mjs`**        | НОВОЕ: перекрёстная проверка переменных окружения в коде, `.env.example` и `ENVIRONMENT.md`                      |
| **`check-docs-counts-sync.mjs`**    | НОВОЕ: проверка соответствия документации количественных показателей (исполнители, стратегии, OAuth, навыки A2A) |
| **`check-deprecated-versions.mjs`** | НОВОЕ: выявление устаревших версий/дат в документации                                                            |
| `check-supported-node-runtime.ts`   | Проверка поддержки текущей версии Node                                                                           |
| `check-pr-test-policy.mjs`          | Обеспечение соблюдения правила «тесты обязательны» при изменениях рабочего кода                                  |
| **`gen-provider-reference.ts`**     | НОВОЕ: автоматическое создание `docs/reference/PROVIDER_REFERENCE.md` из каталога                                |
| `i18n/generate-multilang.mjs`       | Перевод строк интерфейса и документации через Google Translate                                                   |
| `i18n_autotranslate.py`             | Конвейер перевода документации на основе LLM                                                                     |
| `validate_translation.py`           | Проверка перевода для каждой локали                                                                              |
| `check_translations.py`             | Проверка ключей i18n в коде                                                                                      |
| `run-playwright-tests.mjs`          | Средство запуска E2E-тестов Playwright                                                                           |
| `run-protocol-clients-tests.mjs`    | Средство запуска E2E-тестов MCP/A2A                                                                              |
| `run-ecosystem-tests.mjs`           | Тесты экосистемы (интеграции с провайдерами)                                                                     |
| `test-report-summary.mjs`           | Создание сводки покрытия в формате Markdown                                                                      |
| `smoke-electron-packaged.mjs`       | Дымовое тестирование упакованной сборки Electron                                                                 |
| `native-binary-compat.mjs`          | Проверка соответствия нативных зависимостей (`better-sqlite3`) версии Node в Electron                            |
| `validate-pack-artifact.ts`         | Проверка результата упаковки npm                                                                                 |
| `responses-ws-proxy.mjs`            | WebSocket-мост для Codex Responses API                                                                           |
| `v1-ws-bridge.mjs`                  | WebSocket-мост для конечной точки `/api/v1/ws`                                                                   |
| `standalone-server-ws.mjs`          | Средство запуска автономного WS-сервера                                                                          |
| `system-info.mjs`                   | Вывод информации о системе/среде выполнения для технической поддержки                                            |
| `healthcheck.mjs`                   | Однократная проверка работоспособности (используется Docker HEALTHCHECK)                                         |
| `uninstall.mjs`                     | Скрипт полного удаления                                                                                          |

---

## `docs/` — Публичная документация (7 корневых файлов + 17 подкаталогов)

### Основные руководства

| Документ                    | Назначение                                                                                                       |
| --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Высокоуровневая архитектура, карта подсистем, интерфейс панели управления                                        |
| `CODEBASE_DOCUMENTATION.md` | Инженерный справочник: каталоги, модули, соглашения                                                              |
| `FEATURES.md`               | Матрица функций с обзором ключевых возможностей v3.8                                                             |
| `USER_GUIDE.md`             | Руководство пользователя (настройка, модели, комбинации, CLI, аудио и т. д.)                                     |
| `API_REFERENCE.md`          | Справочник по конечным точкам API с моделью аутентификации                                                       |
| `openapi.yaml`              | Спецификация OpenAPI 3.0 (121 маршрут)                                                                           |
| `SETUP_GUIDE.md`            | Способы установки (npm, npx, Docker, Electron, Termux, из исходного кода)                                        |
| `ENVIRONMENT.md`            | Все переменные окружения (документировано ~800, ~3 050 строк в `.env.example`)                                   |
| `TROUBLESHOOTING.md`        | Распространённые ошибки + известные проблемы v3.8.0                                                              |
| `RELEASE_CHECKLIST.md`      | Полный процесс выпуска (навыки, husky, conventional commits, развёртывание)                                      |
| `COVERAGE_PLAN.md`          | Цели покрытия и текущее состояние                                                                                |
| `FREE_TIERS.md`             | Подобранные провайдеры с бесплатными тарифами (48+ бесплатных + 11 OAuth)                                        |
| `CLI-TOOLS.md`              | Интеграции с внешними CLI + внутренний CLI OmniRoute                                                             |
| `I18N.md`                   | Архитектура i18n, добавление языка, 42 локали                                                                    |
| `UNINSTALL.md`              | Шаги по полному удалению                                                                                         |
| `PROVIDER_REFERENCE.md`     | **Автоматически создаваемый** каталог из 355 провайдеров (повторная генерация: `npm run gen:provider-reference`) |

### Подробные обзоры подсистем

| Документ                                        | Назначение                                                                            |
| ----------------------------------------------- | ------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                                 | Сервер MCP: 110 инструментов, 3 транспорта, 33 области, конечные точки REST           |
| `A2A-SERVER.md`                                 | A2A v0.3: JSON-RPC, 6 навыков, вспомогательные средства REST, карточка агента         |
| `AGENT_PROTOCOLS_GUIDE.md`                      | Единое руководство: A2A, ACP и облачные агенты                                        |
| `CLOUD_AGENT.md`                                | Оркестрация Codex Cloud / Devin / Jules                                               |
| `SKILLS.md`                                     | Система навыков (встроенные + маркетплейс + SkillsSH + песочница)                     |
| `RADAR.md`                                      | Наложение каталога бесплатных моделей Radar (`RADAR_ENABLED`, по умолчанию отключено) |
| `MEMORY.md`                                     | Система памяти (SQLite FTS5 + Qdrant)                                                 |
| `EVALS.md`                                      | Система оценки (наборы, запуски, рубрики)                                             |
| `GUARDRAILS.md`                                 | Маскирование PII, защита от инъекций промптов, мост для компьютерного зрения          |
| `COMPLIANCE.md`                                 | Журнал аудита, хранение данных, отказ от журналирования через noLog                   |
| `WEBHOOKS.md`                                   | Доставка вебхуков с подписью HMAC                                                     |
| `REASONING_REPLAY.md`                           | Гибридный кэш памяти/SQLite для `reasoning_content`                                   |
| `AUTHZ_GUIDE.md`                                | Конвейер авторизации (`classify` → `policies` → `enforce`)                            |
| `RESILIENCE_GUIDE.md`                           | Автоматический выключатель + период восстановления + блокировка модели                |
| `docs/security/STEALTH_GUIDE.md` (только в git) | Цифровые отпечатки TLS (JA3/JA4), Claude Code CCH, сертификат MITM                    |
| `AUTO-COMBO.md`                                 | Движок Auto Combo (оценка по 16 факторам, 6 наборов режимов, виртуальная фабрика)     |

### Сжатие

| Документ                        | Назначение                                |
| ------------------------------- | ----------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Обзор режимов сжатия + план развития      |
| `COMPRESSION_ENGINES.md`        | Движки Caveman + RTK, контракт реестра    |
| `COMPRESSION_RULES_FORMAT.md`   | JSON-схема набора правил Caveman          |
| `COMPRESSION_LANGUAGE_PACKS.md` | Перечень наборов правил для каждого языка |
| `RTK_COMPRESSION.md`            | Декларативный конвейер RTK (49 фильтров)  |

### Развёртывание

| Документ                     | Назначение                                                        |
| ---------------------------- | ----------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Сборка Docker, профили (base/cli/host/cliproxyapi), сайдкар Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Развёртывание на типовой VM/VPS (Ubuntu/Debian + nginx + systemd) |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Развёртывание на Fly.io (в настоящее время только на китайском)   |
| `TERMUX_GUIDE.md`            | Работа без графического интерфейса на Android через Termux        |
| `PWA_GUIDE.md`               | Установка Progressive Web App + сервис-воркер                     |
| `ELECTRON_GUIDE.md`          | Сборка + подписание + распространение настольного приложения      |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                            |
| `PROXY_GUIDE.md`             | Четырёхуровневый исходящий прокси + маркетплейс 1proxy            |

### Подкаталоги

| Подкаталог            | Назначение                                                                                                                                                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Локализованные переводы документации (41 локаль)                                                                                                                                                                                  |
| `docs/screenshots/`   | Изображения для руководств                                                                                                                                                                                                        |
| `_tasks/superpowers/` | Планы/спецификации из superpowers (`writing-plans`/`brainstorming`) + исследования — изолированный репозиторий с отдельным версионированием, игнорируемый Git в основном дереве. См. CLAUDE.md → «Planning & Research Artifacts». |

---

## `tests/` — Наборы тестов

| Подкаталог                           | Тип                                            | Средство запуска                                  |
| ------------------------------------ | ---------------------------------------------- | ------------------------------------------------- |
| `tests/unit/`                        | Модульные тесты (~4 800 файлов, самые быстрые) | Встроенное средство запуска тестов Node           |
| `tests/integration/`                 | Интеграционные тесты нескольких модулей и БД   | Встроенное средство запуска тестов Node (1 поток) |
| `tests/e2e/`                         | E2E-тесты интерфейса и рабочих процессов       | Playwright                                        |
| `tests/e2e/protocol-clients.test.ts` | E2E-тесты MCP и A2A с реальными клиентами      | Специализированные клиенты протоколов             |
| `tests/e2e/ecosystem.test.ts`        | Интеграция с провайдерами (с доступом к сети)  | Встроенное средство запуска тестов Node           |

---

## `public/` — Статические ресурсы

| Путь                | Назначение                                                                   |
| ------------------- | ---------------------------------------------------------------------------- |
| `public/` (корень)  | Значки сайта, robots.txt, манифест, сервис-воркер, маркетинговые изображения |
| `public/providers/` | Логотипы провайдеров в форматах PNG/SVG (используются в панели управления)   |

---

## `config/` — Статические конфигурации и состояние проверок качества

Поставляемые шаблоны конфигурации и зафиксированные базовые показатели проверок качества
(перемещены сюда из корня репозитория в v3.8.26, чтобы не перегружать корневой каталог).

| Путь                                          | Назначение                                                                                        |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Список локалей и метаданные (канонический источник количества локалей — 42)                       |
| `config/i18n-schema.json`                     | Схема JSON для проверки `i18n.json`                                                               |
| `config/payloadRules.json`                    | Правила очистки входящих данных от вышестоящих систем                                             |
| `config/quality/quality-baseline.json`        | Базовый уровень многофакторного храпового механизма (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Зафиксированный базовый уровень сложности ESLint (`check-complexity.mjs`)                         |
| `config/quality/duplication-baseline.json`    | Зафиксированный базовый уровень дублирования jscpd (`check-duplication.mjs`)                      |
| `config/quality/file-size-baseline.json`      | Зафиксированный базовый размер для каждого файла (`check-file-size.mjs`)                          |
| `config/quality/test-discovery-baseline.json` | Зафиксированный базовый уровень потерянных тестов (`check-test-discovery.mjs`)                    |
| `config/quality/dependency-allowlist.json`    | Список разрешённых зависимостей (`check-deps.mjs`)                                                |
| `config/quality/.license-allowlist.json`      | Список разрешённых лицензий SPDX (`check-licenses.mjs`)                                           |
| `config/quality/quality-metrics.json`         | Временные собранные метрики (создаётся `collect-metrics.mjs`; **игнорируется Git**)               |

---

## `.github/` — Интеграция с GitHub

| Путь                               | Назначение                                                                  |
| ---------------------------------- | --------------------------------------------------------------------------- |
| `.github/workflows/`               | Рабочие процессы GitHub Actions для CI/CD (линтинг, тесты, покрытие, релиз) |
| `.github/ISSUE_TEMPLATE/`          | Шаблоны сообщений об ошибках и запросов функций                             |
| `.github/pull_request_template.md` | Шаблон PR                                                                   |
| `.github/dependabot.yml`           | Конфигурация обновления зависимостей                                        |

---

## `.husky/` — Git-хуки

| Файл         | Назначение                                                                            |
| ------------ | ------------------------------------------------------------------------------------- |
| `pre-commit` | Запускает `lint-staged + check-docs-sync + check:any-budget:t11`                      |
| `pre-push`   | В настоящее время отключён (закомментирован). Запускайте `npm run test:unit` вручную. |
| `_/`         | Внутренние компоненты Husky                                                           |

---

## `.claude/` — Slash-команды Claude Code

| Файл                                                | Назначение                                                   |
| --------------------------------------------------- | ------------------------------------------------------------ |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — повышение версии + автосписок изменений |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — полный процесс выпуска релиза       |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Развёртывание на VPS                                         |
| `commands/capture-release-evidences-cc.md`          | Запись новых функций в браузере в формате WebP               |
| `commands/review-{prs,discussions}-cc.md`           | Разбор PR и обсуждений GitHub                                |
| `commands/{review-issues,implement-features}-cc.md` | Рабочие процессы для задач                                   |
| `settings.local.json`                               | Настройки Claude Code для конкретного проекта                |

---

## `.agents/` — Универсальные рабочие процессы агентов (Codex / Cursor / и т. д.)

| Путь                     | Назначение                                                     |
| ------------------------ | -------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 определений рабочих процессов (зеркало `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 определений навыков с примечаниями по выполнению в Codex     |

> **Примечание:** Рабочие процессы и команды в настоящее время побайтово идентичны. Если `.agents/` предназначен для другой среды выполнения агентов (Codex), варианты должны существенно различаться.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Вне основного дерева

Эти каталоги с префиксом подчёркивания содержат материалы, не входящие в поставку:

- **`_ideia/`** — заметки по проектированию (категории defer / notfit / viable)
- **`_mono_repo/`** — исторические подпроекты (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — доступные только для чтения клоны связанных OSS-проектов (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api и т. д.) для перекрёстной сверки во время разработки
- **`_tasks/`** — неформальные файлы отслеживания задач для каждого релиза

Не включаются в вывод `npm pack`. См. `.npmignore`.

---

## Генерируемое / игнорируемое Git

| Путь                   | Назначение                      |
| ---------------------- | ------------------------------- |
| `node_modules/`        | Зависимости npm                 |
| `.next/`               | Результаты сборки Next.js       |
| `coverage/`            | Отчёты c8 о покрытии            |
| `logs/`                | Журналы выполнения              |
| `package/`             | Промежуточные файлы npm pack    |
| `.playwright-mcp/`     | Артефакты тестов Playwright MCP |
| `.issues/`             | Локальный кеш задач             |
| `tsconfig.tsbuildinfo` | Инкрементный кеш TS             |

---

## Советы по навигации

- **Новый участник?** Прочитайте `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Добавляете провайдера?** Следуйте разделу `docs/architecture/ARCHITECTURE.md § Adding a New Provider` и сверьтесь с `docs/reference/PROVIDER_REFERENCE.md`.
- **Добавляете маршрут?** См. `docs/architecture/ARCHITECTURE.md § Adding a New API Route` и `src/shared/validation/schemas.ts`.
- **Добавляете инструмент MCP?** См. `docs/frameworks/MCP-SERVER.md § Adding a Tool`.
- **Добавляете навык A2A?** См. `docs/frameworks/A2A-SERVER.md § Adding a New Skill`.
- **Запускаете локально?** См. `docs/guides/SETUP_GUIDE.md`.
- **Выполняете развёртывание?** См. `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Выпускаете релиз?** См. `docs/ops/RELEASE_CHECKLIST.md` (и навык Claude Code `/generate-release-cc`).
