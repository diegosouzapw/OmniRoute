# Repository Map (Українська)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Однорядковий опис кожного каталогу та кореневого файлу.**
> Останнє оновлення: 2026-06-28 — OmniRoute v3.8.40
>
> Використовуйте цю мапу для швидкої навігації кодовою базою. Для детального ознайомлення переходьте за посиланнями на спеціалізовану документацію.

## Дерево верхнього рівня

```
OmniRoute/
├── src/                  # Застосунок Next.js 16 (інтерфейс + маршрути API + бібліотеки + домен + сервер)
├── open-sse/             # Робочий простір потокового рушія (обробники, виконавці, транслятор, сервер MCP)
├── electron/             # Обгортка для настільного застосунку (Electron 41 + electron-builder 26.10)
├── bin/                  # Точка входу CLI та обробники команд
├── scripts/              # Скрипти збирання, перевірки, синхронізації та одноразового використання
├── docs/                 # Загальнодоступна документація (ви перебуваєте тут)
├── tests/                # Усі набори тестів (модульні, інтеграційні, наскрізні, клієнти протоколів)
├── public/               # Статичні ресурси Next.js, маніфест PWA, service worker, піктограми
├── config/               # Статична конфігурація + стан контролю якості (i18n, payloadRules, quality/)
├── images/               # Ресурси зображень для маркетингу / README
├── @omniroute/           # Супровідні пакети для публікації (opencode-plugin, opencode-provider)
├── skills/               # Пакети навичок CLI/агентів (cli-* + omni-* + config-codex-cli)
├── examples/             # Приклади плагінів + початковий шаблон omniroute-cmd-hello
├── contrib/              # Внески спільноти (podman/)
├── .source/              # Конфігурація джерел Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Робочі процеси GitHub Actions + шаблони задач + шаблон запиту на злиття
├── .husky/               # Git-хуки (pre-commit, pre-push)
├── .claude/              # Slash-команди Claude Code (у межах проєкту)
├── .agents/              # Робочі процеси та навички Codex / універсальних агентів (дзеркало .claude/)
├── .vscode/              # Налаштування робочого простору VS Code
├── _ideia/               # Нотатки з планування (неформальні; не постачаються)
├── _mono_repo/           # Історичні підпроєкти (cloud, site, vscode-extension)
├── _references/          # Доступні лише для читання клони пов’язаних проєктів із відкритим кодом
├── _tasks/               # Файли відстеження завдань для кожного випуску (неформальні)
├── .build/ .worktrees/ dist/   # Локальні тимчасові файли збирання / git-worktree / результатів збирання (ігноруються Git)
├── .issues/              # Локальний кеш задач (ігнорується Git)
├── .playwright-mcp/      # Артефакти тестування Playwright MCP
├── coverage/             # Результати покриття c8 (ігноруються Git)
├── logs/                 # Журнали виконання (ігноруються Git)
├── node_modules/         # Залежності (ігноруються Git)
├── package/              # Проміжна область npm pack (артефакт збирання)
├── .next/                # Результат збирання Next.js (ігнорується Git)
└── (кореневі файли — див. нижче)
```

---

## Кореневі файли

| Файл                                        | Призначення                                                                                             |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Маркетингова цільова сторінка + швидкий старт + матриця функцій (див. також `llm.txt`)                  |
| **CHANGELOG.md**                            | Журнал змін для кожного випуску (автоматично генерується навичкою `/version-bump-cc`)                   |
| **LICENSE**                                 | Текст ліцензії MIT                                                                                      |
| **CLAUDE.md**                               | Правила проєкту для агентів Claude Code (жорсткі правила, домовленості, сценарії)                       |
| **AGENTS.md**                               | Те саме, що й CLAUDE.md, але для ШІ-агентів, відмінних від Claude (Codex, Cursor тощо)                  |
| **GEMINI.md**                               | Стислі правила для агентів на базі Gemini (підмножина CLAUDE.md)                                        |
| **CONTRIBUTING.md**                         | Посібник для учасників: налаштування, conventional commits, тестування, процес створення PR             |
| **SECURITY.md**                             | Політика повідомлення про вразливості, підтримувані версії, модель загроз                               |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — очікування щодо поведінки в спільноті                                            |
| **llm.txt**                                 | Текстова цільова сторінка, оптимізована для сканерів LLM (SEO для ШІ-помічників)                        |
| **package.json**                            | Маніфест npm, скрипти, залежності, рушії, поріг покриття c8                                             |
| **package-lock.json**                       | Зафіксоване дерево залежностей                                                                          |
| **tsconfig.json**                           | Коренева конфігурація TypeScript                                                                        |
| **tsconfig.typecheck-core.json**            | Конфігурація перевірки типів для ядра `src/`                                                            |
| **tsconfig.typecheck-noimplicit-core.json** | Сувора перевірка типів (`noImplicitAny`)                                                                |
| **tsconfig.tsbuildinfo**                    | Кеш інкрементального складання TS (ігнорується Git)                                                     |
| **next.config.mjs**                         | Конфігурація складання Next.js 16 (автономний результат)                                                |
| **next-env.d.ts**                           | Автоматично згенеровані Next.js типи змінних середовища                                                 |
| **eslint.config.mjs**                       | Плоска конфігурація ESLint (правила для кожної частини проєкту)                                         |
| **prettier.config.mjs**                     | Правила форматування Prettier                                                                           |
| **postcss.config.mjs**                      | Конфігурація PostCSS для конвеєра Tailwind/CSS                                                          |
| **playwright.config.ts**                    | Конфігурація наскрізних тестів Playwright                                                               |
| **vitest.config.ts**                        | Конфігурація Vitest (набір тестів за замовчуванням)                                                     |
| **vitest.mcp.config.ts**                    | Конфігурація Vitest для сервера MCP / autoCombo / наборів тестів кешу                                   |
| **sonar-project.properties**                | Конфігурація SonarQube/SonarCloud (якість коду)                                                         |
| **Dockerfile**                              | Багатоетапне складання Docker (builder → runner-base → runner-cli)                                      |
| **docker-compose.yml**                      | Конфігурація Compose для розробки з 4 профілями (base, cli, host, cliproxyapi) + sidecar Redis          |
| **docker-compose.prod.yml**                 | Конфігурація Compose для продакшену (порт 20130, Redis, іменовані томи)                                 |
| **.dockerignore**                           | Файли, виключені з контексту Docker                                                                     |
| **fly.toml**                                | Конфігурація розгортання Fly.io (регіон `sin`, порт 20128, том /data)                                   |
| **.env.example**                            | Шаблон файла змінних середовища (автоматично копіюється до `.env` під час першого встановлення)         |
| **.gitignore**                              | Шаблони ігнорування Git                                                                                 |
| **.npmignore**                              | Список виключень під час публікації npm                                                                 |
| **.npmrc**                                  | Конфігурація npm (реєстр, політика lock-файла)                                                          |
| **.node-version**                           | Закріплена версія Node (використовується інструментами, сумісними з nvm)                                |
| **.nvmrc**                                  | Закріплена версія Node для nvm                                                                          |
| **eslint.complexity.config.mjs**            | Конфігурація ESLint для механізму контролю складності (`scripts/check/check-complexity.mjs --config`)   |
| **eslint.sonarjs.config.mjs**               | Конфігурація ESLint для правил SonarJS (когнітивна складність / дублювання)                             |
| **source.config.ts**                        | Конфігурація джерела Fumadocs `defineDocs` (наповнює `.source/`)                                        |
| **knip.json**                               | Конфігурація Knip — невикористані файли/експорти/залежності (використовується перевіркою мертвого коду) |
| **stryker.conf.json**                       | Конфігурація мутаційного тестування Stryker                                                             |
| **.size-limit.json**                        | Конфігурація бюджету розміру бандла size-limit                                                          |
| **promptfooconfig.yaml**                    | Конфігурація оцінювання promptfoo                                                                       |
| **.gitleaks.toml**                          | Набір правил gitleaks для сканування секретів                                                           |
| **.zizmor.yml**                             | Конфігурація zizmor для перевірки безпеки GitHub Actions                                                |
| **socket.yml**                              | Конфігурація Socket.dev для безпеки ланцюга постачання                                                  |
| **news.json**                               | Локалізована стрічка оголошень v2; елемент запуску Radar постачається неактивним                        |
| **flake.nix** / **flake.lock**              | Визначення середовища розробки Nix + файл блокування                                                    |
| **.env**                                    | Локальні секрети (ігнорується git — генерується з `.env.example`)                                       |

> **Переміщено з кореневого каталогу у v3.8.26 (для впорядкування):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` і згенерований `quality-metrics.json` (ігнорується git). Див. [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — застосунок Next.js

```
src/
├── app/                 # App Router (сторінки + маршрути API + сторінки стану + цільова сторінка)
├── lib/                 # Основні бібліотеки / доменні модулі (80 підкаталогів + ~70 файлів верхнього рівня)
├── domain/              # Чиста доменна логіка (рушій політик, резервний механізм, вартість, блокування, comboResolver, оцінювання)
├── server/              # Лише серверні модулі (конвеєр авторизації, cors, проміжне ПЗ автентифікації) — не можна імпортувати з клієнта
├── shared/              # Спільне для сервера й клієнта, де це безпечно (константи, типи, валідація, контракти, утиліти)
├── i18n/                # Конфігурація next-intl + JSON-повідомлення для кожної локалі (42 локалі)
├── middleware/          # Проміжне ПЗ Next.js (збагачення запитів, визначення локалі)
├── mitm/                # Ядро MITM-проксі: генерування/встановлення сертифікатів, обробники, цілі, інспектор, маски, наскрізне передавання
│   ├── handlers/        # 9 класів обробників IDE-агентів, що розширюють MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Рівень перехоплення трафіку: буфер (кільцевий у пам’яті), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Зв’язувальний код адаптерів моделей (застарілий шар сумісності)
├── scripts/             # Внутрішні скрипти обслуговування (наприклад, backfillAggregation)
├── sse/                 # Застарілі обробники/сервіси SSE (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Застаріле сховище в пам’яті (поступово замінюється на src/lib/db)
├── types/               # Спільні файли типів TS
├── instrumentation.ts   # Хук телеметрії Next.js (браузер + edge)
├── instrumentation-node.ts  # Інструментування лише для Node
└── proxy.ts             # Вхідний шар сумісності HTTP-проксі
```

### `src/app/` — App Router (Next.js 16)

| Шлях                                                                         | Призначення                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Публічний API, сумісний з OpenAI (~25 підмаршрутів: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers тощо)                                                                                                                           |
| `app/api/v1beta/`                                                            | Кінцеві точки API у стилі Gemini                                                                                                                                                                                                                                                                                              |
| `app/api/playground/`                                                        | Маршрути Playground Studio: `improve-prompt/` (POST — переформулювання запиту за допомогою LLM), `presets/` (GET — отримання списку / POST — створення), `presets/[id]/` (GET / PUT / DELETE) — див. `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                   |
| `app/api/` (не v1)                                                           | Маршрути керування та адміністрування (~60 каталогів: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools тощо)                                                                                                                                    |
| `app/api/tools/agent-bridge/`                                                | REST API AgentBridge — 12 маршрутів (керування сервером, стан агентів/DNS/зіставлення, обхід, сертифікат, upstream-CA). LOCAL_ONLY + SPAWN_CAPABLE. Див. `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                                 |
| `app/api/tools/traffic-inspector/`                                           | REST + WS API Traffic Inspector — понад 16 маршрутів (requests, sessions, hosts, capture-modes, export, ws). LOCAL_ONLY + SPAWN_CAPABLE. Див. `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                      |
| `app/a2a/`                                                                   | Точка входу A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                                    |
| `app/.well-known/agent.json/`                                                | Картка агента A2A (виявлення)                                                                                                                                                                                                                                                                                                 |
| `app/(dashboard)/dashboard/`                                                 | Сторінки інтерфейсу панелі керування (понад 50 розділів, ~118 файлів page.tsx: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity тощо)                                                                                                                       |
| `app/(dashboard)/dashboard/search-tools/`                                    | Інтерфейс Search Tools Studio (3 вкладки: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — див. `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                        |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (план 21): `page.tsx` (оболонка з 3 вкладками), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Сторінка AgentBridge на панелі керування — картка сервера, 9 карток агентів, майстер налаштування, зіставлення моделей, список обходу. i18n PT-BR + EN. Див. `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                                |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Сторінка Traffic Inspector на панелі керування — розділений інтерфейс DevTools, 7 вкладок із деталями, 4 перемикачі режимів захоплення, записувач сеансів, контекстне забарвлення. i18n PT-BR + EN. Див. `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                              |
| `app/(dashboard)/dashboard/activity/`                                        | Сторінка стрічки активності (група B): `page.tsx` (сервер) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — див. `docs/architecture/MONITORING_SECTIONS.md`                                                                                                              |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Сторінка спільного використання квот (група B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                   |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Сторінка конфігурації тарифного плану постачальника (група B): `page.tsx` + `ProviderPlanConfigClient.tsx` — перевизначення вимірів квоти для кожного підключення                                                                                                                                                             |
| `app/docs/`                                                                  | Вбудований засіб перегляду документації (відображає `docs/*.md`)                                                                                                                                                                                                                                                              |
| `app/landing/`                                                               | Маркетингова цільова сторінка                                                                                                                                                                                                                                                                                                 |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Сторінки, пов’язані з автентифікацією                                                                                                                                                                                                                                                                                         |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Сторінки помилок HTTP                                                                                                                                                                                                                                                                                                         |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Статичні сторінки та сторінки стану                                                                                                                                                                                                                                                                                           |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Кореневий макет, головна сторінка, маніфест PWA, глобальні CSS-стилі                                                                                                                                                                                                                                                          |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Межі обробки помилок                                                                                                                                                                                                                                                                                                          |

### `src/lib/` — Основні бібліотеки (~50 модулів)

| Модуль                                   | Призначення                                                                                                                                                                                                                                                                                                                          |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `a2a/`                                   | Менеджер завдань протоколу A2A, навички (5), потокове передавання                                                                                                                                                                                                                                                                    |
| `acp/`                                   | Реєстр CLI-агентів (локальне виявлення CLI — див. `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                        |
| `api/`                                   | Спільні допоміжні засоби API (`requireManagementAuth`, валідація)                                                                                                                                                                                                                                                                    |
| `auth/`                                  | Сесія, хешування паролів, валідація токенів                                                                                                                                                                                                                                                                                          |
| `batches/`                               | Обробники OpenAI Batches API                                                                                                                                                                                                                                                                                                         |
| `catalog/`                               | Валідація каталогу провайдерів за допомогою Zod + визначення можливостей                                                                                                                                                                                                                                                             |
| `cloudAgent/`                            | Хмарні агенти (Codex Cloud, Devin, Jules) — див. `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                    |
| `combos/`                                | Визначення комбінацій + допоміжні засоби зміни порядку                                                                                                                                                                                                                                                                               |
| `audit/`                                 | Допоміжні засоби стрічки активності: `highLevelActions.ts` (список дозволених дій + `isHighLevelAction()`), `activityIcons.ts` (зіставлення дії з піктограмою/дієсловом), `timeline.ts` (groupByDay/relativeTime) — див. `docs/architecture/MONITORING_SECTIONS.md`                                                                  |
| `compliance/`                            | Журнал аудиту + аудит провайдерів — див. `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                               |
| `compression/`                           | Зв’язувальний шар рушія стиснення (рушії розміщені в `open-sse/services/compression/`)                                                                                                                                                                                                                                               |
| `config/`                                | Допоміжні засоби конфігурації середовища виконання                                                                                                                                                                                                                                                                                   |
| `db/`                                    | Понад 120 доменних модулів БД + 168 міграцій (для SQLite завжди використовуйте цей модуль)                                                                                                                                                                                                                                           |
| `quota/`                                 | Рушій спільного використання квот: `dimensions.ts` (типи/Zod), `types.ts` (інтерфейс QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — див. `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Клієнт каталогу безкоштовних моделей Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — див. `docs/frameworks/RADAR.md`                                                                                                                                             |
| `display/`                               | Допоміжні засоби форматування інтерфейсу користувача (вартість, затримка тощо)                                                                                                                                                                                                                                                       |
| `embeddings/`                            | Допоміжні засоби сервісу векторних представлень                                                                                                                                                                                                                                                                                      |
| `env/`                                   | Розбір і перевірка змінних середовища                                                                                                                                                                                                                                                                                                |
| `evals/`                                 | Фреймворк оцінювання (набори, засіб запуску, середовище виконання) — див. `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                 |
| `guardrails/`                            | Маскувальник персональних даних, захист від ін’єкцій у промпти, міст для обробки зображень — див. `docs/security/GUARDRAILS.md`                                                                                                                                                                                                      |
| `jobs/`                                  | Фонові завдання (подібні до cron)                                                                                                                                                                                                                                                                                                    |
| `memory/`                                | Пам’ять розмов (гібридний RRF на основі SQLite FTS5 і sqlite-vec + Qdrant другого рівня) — див. `docs/frameworks/MEMORY.md`                                                                                                                                                                                                          |
| `memory/embedding/`                      | Багатоджерельний шар векторних представлень: `index.ts` (розпізнавач), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (план 21)                                                                                                                                                                      |
| `memory/vectorStore.ts`                  | Обгортка sqlite-vec v0.1.9 — повний перебір KNN + гібридний RRF (FTS5 + вектори, k=60). Лінива ініціалізація, коректно продовжує роботу, коли sqlite-vec недоступний. (план 21)                                                                                                                                                      |
| `memory/reindex.ts`                      | `runReindexBatch()` — обробляє у фоновому режимі записи пам’яті з `needs_reindex=1`; викликається через `POST /api/memory/reindex` і шлях лінивого дозаповнення. (план 21)                                                                                                                                                           |
| `monitoring/`                            | Перевірки працездатності, формування метрик                                                                                                                                                                                                                                                                                          |
| `oauth/`                                 | Потоки OAuth/імпорту для 22 модулів постачальників (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                       |
| `plugins/`                               | Реєстр плагінів                                                                                                                                                                                                                                                                                                                      |
| `promptCache/`                           | Точки розриву кешу промптів у стилі Anthropic                                                                                                                                                                                                                                                                                        |
| `skills/`                                | Фреймворк навичок (вбудовані + маркетплейс + SkillsSH) — див. `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                            |
| `playground/`                            | Спільні допоміжні засоби Playground Studio: `codeExport.ts` (генератор curl/Python/TS), `promptImprover.ts` (конструктор метапромптів), `streamMetrics.ts` (чисті TTFT/TPS), `types.ts` (таблиця цін) — див. `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                  |
| `webhookDispatcher.ts`                   | Доставка вебхуків із HMAC — див. `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                       |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Менеджери тунелів — див. `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                                 |
| `cloudSync.ts`, `initCloudSync.ts`       | Необов’язкова хмарна синхронізація стану                                                                                                                                                                                                                                                                                             |
| `localDb.ts`                             | Файл повторного експорту для модулів бази даних (без логіки — лише повторні експорти)                                                                                                                                                                                                                                                |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Кешування запитів + ідемпотентність                                                                                                                                                                                                                                                                                                  |
| (~30 інших файлів верхнього рівня)       | Спеціалізовані допоміжні засоби (logEnv, modelsDevSync, piiSanitizer тощо)                                                                                                                                                                                                                                                           |

### `src/lib/db/` — База даних (122 модулі + 168 міграцій)

| Підкаталог                | Призначення                                                                                                                                                                                 |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Одинак `getDbInstance()` із журналюванням WAL                                                                                                                                               |
| `db/migrations/`          | Версіоновані SQL-файли (ідемпотентні, транзакційні). `073_memory_vec.sql` додає `memory_vec_meta` + стовпець `needs_reindex` (план 21).                                                     |
| `db/playgroundPresets.ts` | CRUD-модуль для пресетів Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`)                   |
| `db/memoryVec.ts`         | CRUD для `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` тощо (план 21)                                  |
| `db/<domain>.ts`          | Один модуль на домен: провайдери, комбінації, ключі API, користувачі, сеанси, використання, audit*log, вебхуки, навички, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache тощо. |

### `src/domain/`

| Модуль                 | Призначення                                                 |
| ---------------------- | ----------------------------------------------------------- |
| `policy.ts`            | Рушій політик                                               |
| `fallbackPolicy.ts`    | Дерево рішень для резервного варіанта                       |
| `costRules.ts`         | Правила розрахунку вартості                                 |
| `lockoutPolicy.ts`     | Політика блокування моделі/підключення                      |
| `tagRouter.ts`         | Маршрутизація на основі тегів                               |
| `comboResolver.ts`     | Розв’язання комбінацій (використовується рушієм комбінацій) |
| `modelAvailability.ts` | Перевірка доступності для кожної моделі                     |
| `assessment/`          | Оцінювання моделі (етап 1 RFC-AUTO-ASSESSMENT)              |

### `src/server/`

| Модуль   | Призначення                                                                                        |
| -------- | -------------------------------------------------------------------------------------------------- |
| `authz/` | Конвеєр авторизації: `classify` → `policies` → `enforce` — див. `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Конфігурація CORS                                                                                  |
| `auth/`  | Проміжне ПЗ для сеансів                                                                            |

### `src/shared/`

| Модуль                           | Призначення                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------ |
| `constants/providers.ts`         | **355 провайдерів** із валідацією Zod (джерело істини)                         |
| `constants/cliTools.ts`          | Реєстр зовнішніх інструментів CLI                                              |
| `constants/routingStrategies.ts` | **19 стратегій маршрутизації** з пріоритетами                                  |
| `constants/publicApiRoutes.ts`   | Маршрути, що вимагають автентифікації Bearer (на відміну від керування)        |
| `constants/upstreamHeaders.ts`   | Список заборонених заголовків для запитів до висхідних сервісів                |
| `validation/schemas.ts`          | ~80 схем Zod (єдине джерело істини для контрактів API)                         |
| `validation/helpers.ts`          | Допоміжні засоби валідації Zod (`validateBody` тощо)                           |
| `types/`                         | Спільні типи TS                                                                |
| `contracts/`                     | Публічні контракти API (використовуються через `files:` у `package.json`)      |
| `utils/circuitBreaker.ts`        | Автоматичний вимикач провайдера (див. `docs/architecture/RESILIENCE_GUIDE.md`) |
| `utils/apiAuth.ts`               | Валідація ключа API, перевірка областей доступу                                |
| `utils/fetchTimeout.ts`          | Обгортки тайм-ауту/переривання для запитів fetch до висхідних сервісів         |
| `utils/releaseNotes.ts`          | Парсер закритих оголошень v2/legacy, локалізація та відхилення за ID           |

---

## `open-sse/` — Робочий простір потокового рушія

Окремий робочий простір npm (`@omniroute/open-sse`). Обробляє запити та виконання через провайдерів.

```
open-sse/
├── handlers/            # 16 файлів (12 обробників + 4 допоміжні модулі): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search тощо.
├── executors/           # 67 виконавців для окремих провайдерів (успадковують BaseExecutor)
├── translator/          # Перетворювачі форматів (9 для запитів, 9 для відповідей, 9 допоміжних)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ службових модулів (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM тощо)
├── mcp-server/          # Сервер MCP (110 інструментів, 3 транспорти, 33 області доступу)
├── config/              # Реєстри провайдерів/моделей, конфігурація заголовків, псевдоніми моделей
├── utils/               # Клієнт TLS, отримання даних через проксі/диспетчер, мережеві допоміжні модулі
├── index.ts             # Точка входу робочого простору
├── package.json         # Маніфест робочого простору
├── tsconfig.json        # Конфігурація TS робочого простору
└── types.d.ts           # Оголошення типів робочого простору
```

### `open-sse/mcp-server/`

| Шлях                        | Призначення                                                                            |
| --------------------------- | -------------------------------------------------------------------------------------- |
| `server.ts`                 | Життєвий цикл сервера MCP (транспорти stdio + HTTP)                                    |
| `httpTransport.ts`          | Транспорти HTTP Streamable + SSE (`/api/mcp/sse`, `/api/mcp/stream`)                   |
| `audit.ts`                  | Журналювання аудиту в таблицю `mcp_tool_audit`                                         |
| `scopeEnforcement.ts`       | Перевірка області доступу для кожного інструмента                                      |
| `runtimeHeartbeat.ts`       | Сигнал працездатності в `DATA_DIR/runtime/mcp-heartbeat.json`                          |
| `descriptionCompressor.ts`  | Стиснення метаданих описів інструментів для економії контексту                         |
| `schemas/tools.ts`          | 36 визначень базових інструментів + області доступу                                    |
| `tools/advancedTools.ts`    | Реалізації розширених інструментів                                                     |
| `tools/memoryTools.ts`      | 3 інструменти пам’яті (пошук/додавання/очищення)                                       |
| `tools/skillTools.ts`       | 4 інструменти навичок (список/увімкнення/виконання/виконання)                          |
| `tools/compressionTools.ts` | 5 інструментів стиснення                                                               |
| `README.md`                 | Внутрішній README сервера MCP (перехресне посилання з `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Обгортка для настільного застосунку

| Файл             | Призначення                                                                                                |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `main.js`        | Головний процес Electron (BrowserWindow, вбудований сервер Next.js, системний трей, автоматичне оновлення) |
| `preload.js`     | Міст IPC (contextBridge → `window.omniroute`)                                                              |
| `package.json`   | Конфігурація electron-builder + залежності Electron 41 + electron-builder 26.10                            |
| `assets/`        | Піктограми застосунку (Windows .ico, macOS .icns, Linux .png)                                              |
| `dist-electron/` | Результат збирання (ігнорується git)                                                                       |
| `types.d.ts`     | Оголошення типів для мосту рендерера                                                                       |
| `README.md`      | Внутрішній README Electron (див. також `docs/guides/ELECTRON_GUIDE.md`)                                    |

---

## `bin/` — CLI

| Файл                                                                                                        | Призначення                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Основна точка входу CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` тощо. |
| `reset-password.mjs`                                                                                        | Автономний CLI для скидання пароля                                                                                                  |
| `cli/commands/setup.mjs`                                                                                    | Інтерактивний і неінтерактивний майстер налаштування                                                                                |
| `cli/commands/doctor.mjs`                                                                                   | Діагностика стану системи (понад 8 перевірок)                                                                                       |
| `cli/commands/providers.mjs`                                                                                | Перегляд списку, тестування та перевірка постачальників                                                                             |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Допоміжні модулі CLI                                                                                                                |
| `cli/tray/tray.ts`                                                                                          | Інтеграція із системним треєм (кросплатформна: NotifyIcon у Windows, systray2 у macOS/Linux)                                        |
| `cli/tray/tray.ps1`                                                                                         | Серверна частина NotifyIcon на PowerShell (Windows, без додаткових бінарних файлів)                                                 |
| `cli/tray/autostart.ts`                                                                                     | Кросплатформний автозапуск (LaunchAgent / .desktop / реєстр)                                                                        |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-етапний ланцюжок визначення драйвера SQLite (вбудований → середовище виконання → відкладене встановлення → node:sqlite → sql.js)  |
| `cli/runtime/magicBytes.mjs`                                                                                | Перевірка сигнатурних байтів бінарних файлів (ELF / Mach-O / Mach-O fat / PE)                                                       |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — попередньо визначає драйвери під час postinstall / першого запуску                                             |
| `nodeRuntimeSupport.mjs`                                                                                    | Перевірка підтримуваної версії Node.js під час встановлення                                                                         |

---

## `skills/` — Публічні навички агентів

| Файл                         | Призначення                                                                             |
| ---------------------------- | --------------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 маніфестів навичок для зовнішніх ШІ-агентів (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Скрипти збирання та перевірки

| Скрипт                              | Призначення                                                                                      |
| ----------------------------------- | ------------------------------------------------------------------------------------------------ |
| `run-next.mjs`                      | Засіб запуску в режимі розробки/старту із завантаженням змінних середовища                       |
| `build-next-isolated.mjs`           | Автономне збирання (автономний режим Next.js 16)                                                 |
| `prepublish.ts`                     | Підготовка пакета перед `npm pack`                                                               |
| `postinstall.mjs`                   | Автоматичне створення `.env` із `.env.example` під час першого встановлення                      |
| `sync-env.mjs`                      | Повторна синхронізація ключів `.env` із `.env.example`                                           |
| `check-cycles.mjs`                  | Виявлення циклічних залежностей                                                                  |
| `check-route-validation.mjs`        | Перевірка наявності валідації Zod у всіх маршрутах API                                           |
| `check-t11-any-budget.mjs`          | Забезпечення дотримання явного ліміту `any` для кожного файла                                    |
| `check-docs-sync.mjs`               | Перевірка синхронізації версій документації (наявна перевірка перед комітом)                     |
| **`check-env-doc-sync.mjs`**        | НОВЕ: перехресна перевірка змінних середовища в коді, `.env.example` та `ENVIRONMENT.md`         |
| **`check-docs-counts-sync.mjs`**    | НОВЕ: перевірка відповідності документації кількості виконавців, стратегій, OAuth та навичок A2A |
| **`check-deprecated-versions.mjs`** | НОВЕ: позначення застарілих версій/дат у документації                                            |
| `check-supported-node-runtime.ts`   | Перевірка підтримки поточної версії Node                                                         |
| `check-pr-test-policy.mjs`          | Забезпечення дотримання правила «тести обов’язкові» для змін у робочому коді                     |
| **`gen-provider-reference.ts`**     | НОВЕ: автоматичне генерування `docs/reference/PROVIDER_REFERENCE.md` із каталогу                 |
| `i18n/generate-multilang.mjs`       | Переклад рядків інтерфейсу та документації за допомогою Google Translate                         |
| `i18n_autotranslate.py`             | Конвеєр перекладу документації на основі LLM                                                     |
| `validate_translation.py`           | Перевірка перекладу для кожної локалі                                                            |
| `check_translations.py`             | Перевірка ключів i18n у коді                                                                     |
| `run-playwright-tests.mjs`          | Засіб запуску наскрізних тестів Playwright                                                       |
| `run-protocol-clients-tests.mjs`    | Засіб запуску наскрізних тестів MCP/A2A                                                          |
| `run-ecosystem-tests.mjs`           | Тести екосистеми (інтеграції з провайдерами)                                                     |
| `test-report-summary.mjs`           | Генерування підсумкового звіту про покриття у форматі Markdown                                   |
| `smoke-electron-packaged.mjs`       | Димове тестування запакованої збірки Electron                                                    |
| `native-binary-compat.mjs`          | Перевірка відповідності нативних залежностей (`better-sqlite3`) версії Node в Electron           |
| `validate-pack-artifact.ts`         | Перевірка результату пакування npm                                                               |
| `responses-ws-proxy.mjs`            | Міст WebSocket для Codex Responses API                                                           |
| `v1-ws-bridge.mjs`                  | Міст WebSocket для кінцевої точки `/api/v1/ws`                                                   |
| `standalone-server-ws.mjs`          | Засіб запуску автономного сервера WS                                                             |
| `system-info.mjs`                   | Виведення інформації про систему/середовище виконання для служби підтримки                       |
| `healthcheck.mjs`                   | Одноразова перевірка стану (використовується Docker HEALTHCHECK)                                 |
| `uninstall.mjs`                     | Скрипт повного видалення                                                                         |

---

## `docs/` — Публічна документація (7 кореневих файлів + 17 підкаталогів)

### Посібники верхнього рівня

| Документ                    | Призначення                                                                                                       |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Високорівнева архітектура, мапа підсистем, інтерфейс панелі керування                                             |
| `CODEBASE_DOCUMENTATION.md` | Інженерний довідник: каталоги, модулі, угоди                                                                      |
| `FEATURES.md`               | Матриця функцій з основними нововведеннями v3.8                                                                   |
| `USER_GUIDE.md`             | Посібник користувача (налаштування, моделі, комбінації, CLI, аудіо тощо)                                          |
| `API_REFERENCE.md`          | Довідник кінцевих точок API з моделлю автентифікації                                                              |
| `openapi.yaml`              | Специфікація OpenAPI 3.0 (121 маршрут)                                                                            |
| `SETUP_GUIDE.md`            | Способи встановлення (npm, npx, Docker, Electron, Termux, із вихідного коду)                                      |
| `ENVIRONMENT.md`            | Усі змінні середовища (~800 задокументовано, ~3 050 рядків у `.env.example`)                                      |
| `TROUBLESHOOTING.md`        | Поширені помилки + відомі проблеми v3.8.0                                                                         |
| `RELEASE_CHECKLIST.md`      | Повний процес випуску (навички, husky, conventional commits, розгортання)                                         |
| `COVERAGE_PLAN.md`          | Цілі покриття та поточний стан                                                                                    |
| `FREE_TIERS.md`             | Добірка постачальників із безкоштовними рівнями (48+ безкоштовних + 11 OAuth)                                     |
| `CLI-TOOLS.md`              | Зовнішні інтеграції CLI + внутрішній CLI OmniRoute                                                                |
| `I18N.md`                   | Архітектура i18n, додавання мови, 42 локалі                                                                       |
| `UNINSTALL.md`              | Кроки повного видалення                                                                                           |
| `PROVIDER_REFERENCE.md`     | **Автоматично згенерований** каталог із 355 постачальників (повторна генерація: `npm run gen:provider-reference`) |

### Детальні огляди підсистем

| Документ                                    | Призначення                                                                          |
| ------------------------------------------- | ------------------------------------------------------------------------------------ |
| `MCP-SERVER.md`                             | Сервер MCP: 110 інструментів, 3 транспорти, 33 області, кінцеві точки REST           |
| `A2A-SERVER.md`                             | A2A v0.3: JSON-RPC, 6 навичок, допоміжні засоби REST, картка агента                  |
| `AGENT_PROTOCOLS_GUIDE.md`                  | Уніфікований посібник: A2A порівняно з ACP і Cloud Agents                            |
| `CLOUD_AGENT.md`                            | Оркестрація Codex Cloud / Devin / Jules                                              |
| `SKILLS.md`                                 | Фреймворк навичок (вбудовані + маркетплейс + SkillsSH + пісочниця)                   |
| `RADAR.md`                                  | Накладка каталогу безкоштовних моделей Radar (`RADAR_ENABLED`, типово вимкнено)      |
| `MEMORY.md`                                 | Система пам’яті (SQLite FTS5 + Qdrant)                                               |
| `EVALS.md`                                  | Фреймворк оцінювання (набори, запуски, рубрики)                                      |
| `GUARDRAILS.md`                             | Маскування PII, ін’єкція промптів, міст для зору                                     |
| `COMPLIANCE.md`                             | Журнал аудиту, зберігання, відмова через noLog                                       |
| `WEBHOOKS.md`                               | Доставка вебхуків із підписом HMAC                                                   |
| `REASONING_REPLAY.md`                       | Гібридний кеш пам’яті/SQLite для `reasoning_content`                                 |
| `AUTHZ_GUIDE.md`                            | Конвеєр авторизації (`classify` → `policies` → `enforce`)                            |
| `RESILIENCE_GUIDE.md`                       | Автоматичний вимикач + період очікування + блокування моделі                         |
| `docs/security/STEALTH_GUIDE.md` (лише git) | Цифрові відбитки TLS (JA3/JA4), Claude Code CCH, сертифікат MITM                     |
| `AUTO-COMBO.md`                             | Рушій Auto Combo (оцінювання за 16 факторами, 6 пакетів режимів, віртуальна фабрика) |

### Стиснення

| Документ                        | Призначення                             |
| ------------------------------- | --------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Огляд режимів стиснення + дорожня карта |
| `COMPRESSION_ENGINES.md`        | Рушії Caveman + RTK, контракт реєстру   |
| `COMPRESSION_RULES_FORMAT.md`   | Схема JSON пакета правил Caveman        |
| `COMPRESSION_LANGUAGE_PACKS.md` | Перелік пакетів правил для кожної мови  |
| `RTK_COMPRESSION.md`            | Декларативний конвеєр RTK (49 фільтрів) |

### Розгортання

| Документ                     | Призначення                                                       |
| ---------------------------- | ----------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Збірка Docker, профілі (base/cli/host/cliproxyapi), сайдкар Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Розгортання на типовій VM/VPS (Ubuntu/Debian + nginx + systemd)   |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Розгортання на Fly.io (наразі лише китайською)                    |
| `TERMUX_GUIDE.md`            | Android без графічного інтерфейсу через Termux                    |
| `PWA_GUIDE.md`               | Встановлення прогресивного вебзастосунку + service worker         |
| `ELECTRON_GUIDE.md`          | Збірка + підписання + розповсюдження настільного застосунку       |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                            |
| `PROXY_GUIDE.md`             | 4-рівневий вихідний проксі + маркетплейс 1proxy                   |

### Підкаталоги

| Підкаталог            | Призначення                                                                                                                                                                                                                                 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Локалізовані переклади документації (41 локаль)                                                                                                                                                                                             |
| `docs/screenshots/`   | Зображення для посібників                                                                                                                                                                                                                   |
| `_tasks/superpowers/` | Плани/специфікації із superpowers (`writing-plans`/`brainstorming`) + дослідження — ізольований репозиторій з окремим керуванням версіями, ігнорований через git у головному дереві. Див. CLAUDE.md → «Артефакти планування та досліджень». |

---

## `tests/` — Набори тестів

| Підкаталог                           | Тип                                                | Засіб запуску                                          |
| ------------------------------------ | -------------------------------------------------- | ------------------------------------------------------ |
| `tests/unit/`                        | Модульні тести (~4 800 файлів, найшвидші)          | Вбудований засіб запуску тестів Node                   |
| `tests/integration/`                 | Інтеграційні тести кількох модулів і БД            | Вбудований засіб запуску тестів Node (паралельність 1) |
| `tests/e2e/`                         | Наскрізні тести інтерфейсу та робочих процесів     | Playwright                                             |
| `tests/e2e/protocol-clients.test.ts` | Наскрізні тести MCP + A2A з реальними клієнтами    | Спеціалізовані клієнти протоколів                      |
| `tests/e2e/ecosystem.test.ts`        | Інтеграція з провайдерами (із мережевими запитами) | Вбудований засіб запуску тестів Node                   |

---

## `public/` — Статичні ресурси

| Шлях                | Призначення                                                                    |
| ------------------- | ------------------------------------------------------------------------------ |
| `public/` (корінь)  | Фавікони, robots.txt, маніфест, service worker, маркетингові зображення        |
| `public/providers/` | Логотипи провайдерів у форматах PNG/SVG (використовуються на панелі керування) |

---

## `config/` — Статичні конфігурації та стан контролю якості

Шаблони конфігурації, що постачаються, а також зафіксовані базові рівні контролю якості
(переміщено сюди з кореня репозиторію у v3.8.26, щоб не перевантажувати корінь).

| Шлях                                          | Призначення                                                                                         |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `config/i18n.json`                            | Список локалей і метадані (канонічне джерело кількості 42 локалей)                                  |
| `config/i18n-schema.json`                     | Схема JSON для перевірки `i18n.json`                                                                |
| `config/payloadRules.json`                    | Правила очищення вхідних корисних даних                                                             |
| `config/quality/quality-baseline.json`        | Базовий рівень храпового механізму для кількох метрик (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Зафіксований базовий рівень складності ESLint (`check-complexity.mjs`)                              |
| `config/quality/duplication-baseline.json`    | Зафіксований базовий рівень дублювання jscpd (`check-duplication.mjs`)                              |
| `config/quality/file-size-baseline.json`      | Зафіксований базовий рівень розміру для кожного файлу (`check-file-size.mjs`)                       |
| `config/quality/test-discovery-baseline.json` | Зафіксований базовий рівень тестів-сиріт (`check-test-discovery.mjs`)                               |
| `config/quality/dependency-allowlist.json`    | Список дозволених залежностей (`check-deps.mjs`)                                                    |
| `config/quality/.license-allowlist.json`      | Список дозволених ліцензій SPDX (`check-licenses.mjs`)                                              |
| `config/quality/quality-metrics.json`         | Тимчасові зібрані метрики (генеруються `collect-metrics.mjs`; **ігнорується Git**)                  |

---

## `.github/` — Інтеграція з GitHub

| Шлях                               | Призначення                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------- |
| `.github/workflows/`               | Робочі процеси CI/CD GitHub Actions (лінтинг, тестування, покриття, випуск) |
| `.github/ISSUE_TEMPLATE/`          | Шаблони повідомлень про помилки та запитів на функціональність              |
| `.github/pull_request_template.md` | Шаблон PR                                                                   |
| `.github/dependabot.yml`           | Конфігурація оновлення залежностей                                          |

---

## `.husky/` — Git-хуки

| Файл         | Призначення                                                             |
| ------------ | ----------------------------------------------------------------------- |
| `pre-commit` | Запускає `lint-staged + check-docs-sync + check:any-budget:t11`         |
| `pre-push`   | Наразі вимкнено (закоментовано). Запускайте `npm run test:unit` вручну. |
| `_/`         | Внутрішні компоненти Husky                                              |

---

## `.claude/` — Slash-команди Claude Code

| Файл                                                | Призначення                                                        |
| --------------------------------------------------- | ------------------------------------------------------------------ |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — підвищення версії та автоматичний журнал змін |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — повний процес випуску                     |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Розгортання на VPS                                                 |
| `commands/capture-release-evidences-cc.md`          | Запис нових функцій у браузері у форматі WebP                      |
| `commands/review-{prs,discussions}-cc.md`           | Сортування PR та обговорень GitHub                                 |
| `commands/{review-issues,implement-features}-cc.md` | Робочі процеси для завдань                                         |
| `settings.local.json`                               | Налаштування Claude Code для конкретного проєкту                   |

---

## `.agents/` — Універсальні робочі процеси агентів (Codex / Cursor / тощо)

| Шлях                     | Призначення                                               |
| ------------------------ | --------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 визначень робочих процесів (копії `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 визначень навичок із примітками щодо виконання в Codex  |

> **Примітка:** Робочі процеси та команди наразі побайтово ідентичні. Якщо `.agents/` призначено для іншого середовища виконання агентів (Codex), варіанти мають суттєво відрізнятися.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Поза основним деревом

Ці каталоги з префіксом підкреслення містять матеріали, які не входять до дистрибутива:

- **`_ideia/`** — нотатки щодо дизайну (категорії defer / notfit / viable)
- **`_mono_repo/`** — історичні підпроєкти (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — доступні лише для читання клони пов’язаних OSS-проєктів (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api тощо) для перехресного звіряння під час розробки
- **`_tasks/`** — неформальні файли відстеження завдань для кожного випуску

Не включено до результату `npm pack`. Див. `.npmignore`.

---

## Згенероване / ігнороване Git

| Шлях                   | Призначення                         |
| ---------------------- | ----------------------------------- |
| `node_modules/`        | залежності npm                      |
| `.next/`               | результати збірки Next.js           |
| `coverage/`            | звіти c8 про покриття               |
| `logs/`                | журнали виконання                   |
| `package/`             | проміжні файли npm pack             |
| `.playwright-mcp/`     | артефакти тестування Playwright MCP |
| `.issues/`             | локальний кеш задач                 |
| `tsconfig.tsbuildinfo` | кеш інкрементальної компіляції TS   |

---

## Поради щодо навігації

- **Новий учасник?** Прочитайте `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Додаєте провайдера?** Дотримуйтеся `docs/architecture/ARCHITECTURE.md § Додавання нового провайдера` та звіртеся з `docs/reference/PROVIDER_REFERENCE.md`.
- **Додаєте маршрут?** `docs/architecture/ARCHITECTURE.md § Додавання нового маршруту API` та `src/shared/validation/schemas.ts`.
- **Додаєте інструмент MCP?** `docs/frameworks/MCP-SERVER.md § Додавання інструмента`.
- **Додаєте навичку A2A?** `docs/frameworks/A2A-SERVER.md § Додавання нової навички`.
- **Запускаєте локально?** `docs/guides/SETUP_GUIDE.md`.
- **Розгортаєте?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Готуєте випуск?** `docs/ops/RELEASE_CHECKLIST.md` (і навичка Claude Code `/generate-release-cc`).
