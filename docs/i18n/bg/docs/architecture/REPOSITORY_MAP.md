# Repository Map (Български)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Описание в един ред за всяка директория и всеки файл в корена.**
> Последна актуализация: 2026-06-28 — OmniRoute v3.8.40
>
> Използвайте тази карта за бърза навигация в кодовата база. За по-задълбочена информация следвайте връзките към специализираната документация.

## Дърво на най-горно ниво

```
OmniRoute/
├── src/                  # Приложение с Next.js 16 (потребителски интерфейс + API маршрути + библиотеки + домейн + сървър)
├── open-sse/             # Работно пространство на машината за поточно предаване (обработчици, изпълнители, транслатор, MCP сървър)
├── electron/             # Обвивка за настолно приложение (Electron 41 + electron-builder 26.10)
├── bin/                  # Входна точка на CLI и обработчици на команди
├── scripts/              # Скриптове за компилиране, проверки, синхронизиране и еднократни задачи
├── docs/                 # Публична документация (намирате се тук)
├── tests/                # Всички набори от тестове (модулни, интеграционни, e2e, протоколни клиенти)
├── public/               # Статични ресурси на Next.js, PWA манифест, service worker, икони
├── config/               # Статична конфигурация + състояние на критериите за качество (i18n, payloadRules, quality/)
├── images/               # Изображения за маркетингови материали / README
├── @omniroute/           # Съпътстващи пакети за публикуване (opencode-plugin, opencode-provider)
├── skills/               # Пакети с умения за CLI/агенти (cli-* + omni-* + config-codex-cli)
├── examples/             # Примерни приставки + начален проект omniroute-cmd-hello
├── contrib/              # Приноси от общността (podman/)
├── .source/              # Конфигурация на източника за Fumadocs (source.config.mjs + server/browser/dynamic)
├── .github/              # Работни процеси за GitHub Actions + шаблони за проблеми + шаблон за PR
├── .husky/               # Git куки (pre-commit, pre-push)
├── .claude/              # Команди с наклонена черта за Claude Code (на ниво проект)
├── .agents/              # Работни процеси + умения за Codex / общи агенти (огледално копие на .claude/)
├── .vscode/              # Настройки на работното пространство във VS Code
├── _ideia/               # Бележки за планиране (неформални; не се разпространяват)
├── _mono_repo/           # Исторически подпроекти (cloud, site, vscode-extension)
├── _references/          # Референтни клонинги само за четене от свързани OSS проекти
├── _tasks/               # Файлове за проследяване на задачите за всяка версия (неформални)
├── .build/ .worktrees/ dist/   # Временни локални данни от компилиране / git-worktree / резултати от компилирането (игнорирани от git)
├── .issues/              # Локален кеш на проблеми (игнориран от git)
├── .playwright-mcp/      # Артефакти от MCP тестове с Playwright
├── coverage/             # Резултати за покритието от c8 (игнорирани от git)
├── logs/                 # Дневници по време на изпълнение (игнорирани от git)
├── node_modules/         # Зависимости (игнорирани от git)
├── package/              # Временна директория за npm pack (артефакт от компилирането)
├── .next/                # Резултати от компилирането на Next.js (игнорирани от git)
└── (файлове в корена — вижте по-долу)
```

---

## Файлове в корена

| Файл                                        | Предназначение                                                                                       |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| **README.md**                               | Маркетингова целева страница + бърз старт + матрица на функционалностите (вижте също `llm.txt`)      |
| **CHANGELOG.md**                            | Списък с промени за всяка версия (автоматично генериран от умението `/version-bump-cc`)              |
| **LICENSE**                                 | Текст на MIT лиценза                                                                                 |
| **CLAUDE.md**                               | Правила на проекта за Claude Code агенти (строги правила, конвенции, сценарии)                       |
| **AGENTS.md**                               | Същото като CLAUDE.md, но за AI агенти, различни от Claude (Codex, Cursor и др.)                     |
| **GEMINI.md**                               | Кратки правила за базирани на Gemini агенти (подмножество на CLAUDE.md)                              |
| **CONTRIBUTING.md**                         | Ръководство за сътрудници: настройка, конвенционални комити, тестване, процес за PR                  |
| **SECURITY.md**                             | Политика за докладване на уязвимости, поддържани версии, модел на заплахите                          |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — очаквания за поведение в общността                                            |
| **llm.txt**                                 | Целева страница в обикновен текст, оптимизирана за LLM обхождащи роботи (SEO за AI асистенти)        |
| **package.json**                            | npm манифест, скриптове, зависимости, енджини, праг за покритие с c8                                 |
| **package-lock.json**                       | Заключено дърво на зависимостите                                                                     |
| **tsconfig.json**                           | Основна TypeScript конфигурация                                                                      |
| **tsconfig.typecheck-core.json**            | Конфигурация за проверка на типовете в ядрото `src/`                                                 |
| **tsconfig.typecheck-noimplicit-core.json** | Строга (`noImplicitAny`) проверка на типовете                                                        |
| **tsconfig.tsbuildinfo**                    | Кеш за инкрементално компилиране на TS (игнориран от git)                                            |
| **next.config.mjs**                         | Конфигурация за компилиране с Next.js 16 (самостоятелен изход)                                       |
| **next-env.d.ts**                           | Автоматично генерирани от Next.js типове за средата                                                  |
| **eslint.config.mjs**                       | Плоска конфигурация на ESLint (правила за всяка област на проекта)                                   |
| **prettier.config.mjs**                     | Правила за форматиране с Prettier                                                                    |
| **postcss.config.mjs**                      | Конфигурация на PostCSS за конвейера Tailwind/CSS                                                    |
| **playwright.config.ts**                    | Конфигурация за E2E тестове с Playwright                                                             |
| **vitest.config.ts**                        | Конфигурация на Vitest (стандартен набор)                                                            |
| **vitest.mcp.config.ts**                    | Конфигурация на Vitest за MCP сървъра / autoCombo / наборите за кеширане                             |
| **sonar-project.properties**                | Конфигурация на SonarQube/SonarCloud (качество на кода)                                              |
| **Dockerfile**                              | Многоетапно Docker компилиране (builder → runner-base → runner-cli)                                  |
| **docker-compose.yml**                      | Compose за разработка с 4 профила (base, cli, host, cliproxyapi) + допълнителен контейнер redis      |
| **docker-compose.prod.yml**                 | Compose за продукционна среда (порт 20130, redis, именувани томове)                                  |
| **.dockerignore**                           | Файлове, изключени от Docker контекста                                                               |
| **fly.toml**                                | Конфигурация за внедряване във Fly.io (регион `sin`, порт 20128, том /data)                          |
| **.env.example**                            | Шаблонен файл за средата (автоматично копиран като `.env` при първата инсталация)                    |
| **.gitignore**                              | Шаблони за игнориране от Git                                                                         |
| **.npmignore**                              | Списък за изключване при публикуване в npm                                                           |
| **.npmrc**                                  | Конфигурация на npm (регистър, политика за заключващия файл)                                         |
| **.node-version**                           | Фиксирана версия на Node (използвана от съвместими с nvm инструменти)                                |
| **.nvmrc**                                  | Фиксирана версия на Node за nvm                                                                      |
| **eslint.complexity.config.mjs**            | Конфигурация на ESLint за прага на сложност (`scripts/check/check-complexity.mjs --config`)          |
| **eslint.sonarjs.config.mjs**               | Конфигурация на ESLint за правилата на SonarJS (когнитивна сложност / дублиране)                     |
| **source.config.ts**                        | Конфигурация на източника `defineDocs` за Fumadocs (захранва `.source/`)                             |
| **knip.json**                               | Конфигурация на Knip — неизползвани файлове/експорти/зависимости (захранва проверката за мъртъв код) |
| **stryker.conf.json**                       | Конфигурация на Stryker за мутационно тестване                                                       |
| **.size-limit.json**                        | Конфигурация на бюджета за размера на пакета със size-limit                                          |
| **promptfooconfig.yaml**                    | Конфигурация на promptfoo за оценяване                                                               |
| **.gitleaks.toml**                          | Набор от правила на gitleaks за сканиране за тайни                                                   |
| **.zizmor.yml**                             | Конфигурация на zizmor за проверка на сигурността на GitHub Actions                                  |
| **socket.yml**                              | Конфигурация на Socket.dev за веригата за доставки                                                   |
| **news.json**                               | Локализиран поток със съобщения за v2; елементът за стартирането на Radar се доставя неактивен       |
| **flake.nix** / **flake.lock**              | Дефиниция на Nix среда за разработка + заключващ файл                                                |
| **.env**                                    | Локални тайни (игнорирани от git — генерирани от `.env.example`)                                     |

> **Преместено от кореновата директория във v3.8.26 (разчистване):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` и генерираният `quality-metrics.json` (игнориран от Git). Вижте [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js приложение

```
src/
├── app/                 # App Router (страници + API маршрути + страници за състояние + начална страница)
├── lib/                 # Основни библиотеки / домейн модули (80 поддиректории + ~70 файла на най-горно ниво)
├── domain/              # Чиста домейн логика (механизъм за политики, резервен вариант, разходи, блокиране, comboResolver, оценяване)
├── server/              # Модули само за сървъра (authz конвейер, cors, middleware за удостоверяване) — не могат да се импортират от клиента
├── shared/              # Споделено между сървъра и клиента, когато е безопасно (константи, типове, валидиране, договори, помощни функции)
├── i18n/                # Конфигурация на next-intl + JSON със съобщения за всеки локал (42 локала)
├── middleware/          # Next.js middleware (обогатяване на заявките, откриване на локала)
├── mitm/                # Ядро на MITM проксито: генериране/инсталиране на сертификати, обработчици, цели, инспектор, маски, директно пропускане
│   ├── handlers/        # 9 класа обработчици за IDE агенти, разширяващи MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Слой за прихващане на трафика: буфер (пръстеновиден в паметта), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Свързващ код за адаптери на модели (наследен shim)
├── scripts/             # Скриптове за поддръжка в дървото на проекта (напр. backfillAggregation)
├── sse/                 # Наследени SSE обработчици/услуги (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Наследено хранилище в паметта (постепенно заменяно от src/lib/db)
├── types/               # Споделени файлове с TS типове
├── instrumentation.ts   # Next.js hook за телеметрия (браузър + edge)
├── instrumentation-node.ts  # Инструментиране само за Node
└── proxy.ts             # Входен shim за HTTP прокси
```

### `src/app/` — App Router (Next.js 16)

| Път                                                                          | Предназначение                                                                                                                                                                                                                                                                                                             |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Публичен API, съвместим с OpenAI (~25 подмаршрута: чат, довършвания, вграждания, файлове, пакети, аудио, изображения, видеоклипове, музика, преранжиране, модериране, търсене, ws, агенти, акаунти, доставчици и др.)                                                                                                      |
| `app/api/v1beta/`                                                            | API крайни точки в стил Gemini                                                                                                                                                                                                                                                                                             |
| `app/api/playground/`                                                        | Маршрути на Playground Studio: `improve-prompt/` (POST — пренаписване на подкана чрез LLM), `presets/` (GET списък / POST създаване), `presets/[id]/` (GET / PUT / DELETE) — вижте `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                  |
| `app/api/` (извън v1)                                                        | Маршрути за управление/администриране (~60 директории: доставчици, комбинации, настройки, mcp, a2a, оценки, памет, умения, уеб куки, съответствие, устойчивост, наблюдение, тунели, CLI инструменти и др.)                                                                                                                 |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 маршрута (управление на сървъра, състояние/DNS/съпоставяния на агенти, заобикаляне, сертификат, upstream CA). LOCAL_ONLY + SPAWN_CAPABLE. Вижте `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                             |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — над 16 маршрута (заявки, сесии, хостове, режими на прихващане, експортиране, ws). LOCAL_ONLY + SPAWN_CAPABLE. Вижте `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                           |
| `app/a2a/`                                                                   | Входна точка за A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                             |
| `app/.well-known/agent.json/`                                                | Карта на A2A агент (откриване)                                                                                                                                                                                                                                                                                             |
| `app/(dashboard)/dashboard/`                                                 | Страници на потребителския интерфейс на таблото (~50 секции, ~118 файла page.tsx: доставчици, комбинации, настройки, памет, умения, уеб куки, оценки, одит, пакетна обработка, кеш, разходи, изправност, система, активност и др.)                                                                                         |
| `app/(dashboard)/dashboard/search-tools/`                                    | Потребителски интерфейс на Search Tools Studio (3 раздела: Търсене/Извличане/Сравняване + SearchConceptCard + ProviderCatalog) — вижте `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                            |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (план 21): `page.tsx` (обвивка с 3 раздела), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Страница на AgentBridge в таблото — карта на сървъра, 9 карти на агенти, съветник за настройване, съпоставяне на модели, списък за заобикаляне. i18n PT-BR + EN. Вижте `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                   |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Страница на Traffic Inspector в таблото — разделен изглед като DevTools, 7 раздела с подробности, 4 превключвателя за режимите на прихващане, записване на сесии, контекстно оцветяване. i18n PT-BR + EN. Вижте `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                    |
| `app/(dashboard)/dashboard/activity/`                                        | Страница с поток от активности (група B): `page.tsx` (сървър) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — вижте `docs/architecture/MONITORING_SECTIONS.md`                                                                                                       |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Страница за споделяне на квота (група B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                      |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Страница за конфигуриране на планове на доставчици (група B): `page.tsx` + `ProviderPlanConfigClient.tsx` — замяна на измеренията на квотата за отделна връзка                                                                                                                                                             |
| `app/docs/`                                                                  | Вграден визуализатор на документация (визуализира `docs/*.md`)                                                                                                                                                                                                                                                             |
| `app/landing/`                                                               | Маркетингова целева страница                                                                                                                                                                                                                                                                                               |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Страници, свързани с удостоверяването                                                                                                                                                                                                                                                                                      |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Страници за HTTP грешки                                                                                                                                                                                                                                                                                                    |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Статични страници/страници за състояние                                                                                                                                                                                                                                                                                    |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Основно оформление, начална страница, PWA манифест, глобален CSS                                                                                                                                                                                                                                                           |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Граници за обработка на грешки                                                                                                                                                                                                                                                                                             |

### `src/lib/` — Основни библиотеки (~50 модула)

| Модул                                    | Предназначение                                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | Диспечер на задачи за протокола A2A, умения (5), поточно предаване                                                                                                                                                                                                                                                                    |
| `acp/`                                   | Регистър на CLI агенти (локално откриване на CLI — вижте `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                                  |
| `api/`                                   | Споделени помощни функции за API (`requireManagementAuth`, валидиране)                                                                                                                                                                                                                                                                |
| `auth/`                                  | Сесии, хеширане на пароли, валидиране на токени                                                                                                                                                                                                                                                                                       |
| `batches/`                               | Обработчици за OpenAI Batches API                                                                                                                                                                                                                                                                                                     |
| `catalog/`                               | Zod валидиране на каталога с доставчици + определяне на възможностите                                                                                                                                                                                                                                                                 |
| `cloudAgent/`                            | Облачни агенти (Codex Cloud, Devin, Jules) — вижте `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                                   |
| `combos/`                                | Определяне на комбинации + помощни функции за преподреждане                                                                                                                                                                                                                                                                           |
| `audit/`                                 | Помощни функции за потока на активността: `highLevelActions.ts` (списък с разрешени действия + `isHighLevelAction()`), `activityIcons.ts` (съответствие действие → икона/глагол), `timeline.ts` (groupByDay/relativeTime) — вижте `docs/architecture/MONITORING_SECTIONS.md`                                                          |
| `compliance/`                            | Одитен журнал + одит на доставчици — вижте `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                              |
| `compression/`                           | Свързващ слой за механизма за компресиране (механизмите се намират в `open-sse/services/compression/`)                                                                                                                                                                                                                                |
| `config/`                                | Помощни функции за конфигурация по време на изпълнение                                                                                                                                                                                                                                                                                |
| `db/`                                    | Над 120 домейн модула за БД + 168 миграции (за SQLite винаги използвайте тях)                                                                                                                                                                                                                                                         |
| `quota/`                                 | Механизъм за споделяне на квоти: `dimensions.ts` (типове/Zod), `types.ts` (интерфейс QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — вижте `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Клиент за каталога с безплатни модели на Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — вижте `docs/frameworks/RADAR.md`                                                                                                                                         |
| `display/`                               | Помощни функции за форматиране в потребителския интерфейс (цена, латентност и др.)                                                                                                                                                                                                                                                    |
| `embeddings/`                            | Помощни функции за услугата за вграждания                                                                                                                                                                                                                                                                                             |
| `env/`                                   | Разбор + валидиране на променливи на средата                                                                                                                                                                                                                                                                                          |
| `evals/`                                 | Рамка за оценяване (набори, изпълнител, среда за изпълнение) — вижте `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                       |
| `guardrails/`                            | Маскиране на PII, инжектиране в подкани, мост за визуално съдържание — вижте `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                            |
| `jobs/`                                  | Фонови задачи (подобни на cron)                                                                                                                                                                                                                                                                                                       |
| `memory/`                                | Разговорна памет (хибриден RRF със SQLite FTS5 + sqlite-vec и Qdrant от ниво 2) — вижте `docs/frameworks/MEMORY.md`                                                                                                                                                                                                                   |
| `memory/embedding/`                      | Многoизточников слой за вграждания: `index.ts` (резолвер), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (план 21)                                                                                                                                                                                   |
| `memory/vectorStore.ts`                  | Обвивка за sqlite-vec v0.1.9 — KNN чрез груба сила + хибриден RRF (FTS5 + вектор, k=60). Отложена инициализация, запазва ограничена функционалност, когато sqlite-vec не е наличен. (план 21)                                                                                                                                         |
| `memory/reindex.ts`                      | `runReindexBatch()` — обработва във фонов режим спомените с `needs_reindex=1`; извиква се от `POST /api/memory/reindex` и пътя за отложено обратно попълване. (план 21)                                                                                                                                                               |
| `monitoring/`                            | Проверки на изправността, излъчване на метрики                                                                                                                                                                                                                                                                                        |
| `oauth/`                                 | Потоци за OAuth/импортиране за 22 модула на доставчици (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                    |
| `plugins/`                               | Регистър на плъгини                                                                                                                                                                                                                                                                                                                   |
| `promptCache/`                           | Точки за прекъсване на кеша за подкани в стил Anthropic                                                                                                                                                                                                                                                                               |
| `skills/`                                | Рамка за умения (вградени + пазар + SkillsSH) — вижте `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                                     |
| `playground/`                            | Споделени помощни функции за Playground Studio: `codeExport.ts` (генератор за curl/Python/TS), `promptImprover.ts` (конструктор на метаподкани), `streamMetrics.ts` (чисти TTFT/TPS), `types.ts` (таблица с цени) — вижте `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                      |
| `webhookDispatcher.ts`                   | Доставка на уеб куки чрез HMAC — вижте `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                                  |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Диспечери на тунели — вижте `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                               |
| `cloudSync.ts`, `initCloudSync.ts`       | Незадължителна облачна синхронизация на състоянието                                                                                                                                                                                                                                                                                   |
| `localDb.ts`                             | Централен файл за реекспортиране на модули за БД (без логика — само реекспортиране)                                                                                                                                                                                                                                                   |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Кеширане на заявки + идемпотентност                                                                                                                                                                                                                                                                                                   |
| (още ~30 файла от най-горно ниво)        | Специализирани помощни функции (logEnv, modelsDevSync, piiSanitizer и др.)                                                                                                                                                                                                                                                            |

### `src/lib/db/` — База данни (122 модула + 168 миграции)

| Поддиректория             | Предназначение                                                                                                                                                                                       |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Singleton `getDbInstance()` с WAL журнализиране                                                                                                                                                      |
| `db/migrations/`          | Версионирани SQL файлове (идемпотентни, транзакционни). `073_memory_vec.sql` добавя `memory_vec_meta` + колоната `needs_reindex` (план 21).                                                          |
| `db/playgroundPresets.ts` | CRUD модул за предварително зададените настройки на Playground Studio (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD за `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` и др. (план 21)                                           |
| `db/<domain>.ts`          | По един модул за всеки домейн: доставчици, комбинации, API ключове, потребители, сесии, използване, audit*log, уеб куки, умения, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache и др.  |

### `src/domain/`

| Модул                  | Предназначение                                                     |
| ---------------------- | ------------------------------------------------------------------ |
| `policy.ts`            | Механизъм за правила                                               |
| `fallbackPolicy.ts`    | Дърво за вземане на резервни решения                               |
| `costRules.ts`         | Правила за изчисляване на разходите                                |
| `lockoutPolicy.ts`     | Правила за блокиране на модели/връзки                              |
| `tagRouter.ts`         | Маршрутизиране въз основа на етикети                               |
| `comboResolver.ts`     | Разрешаване на комбинации (използва се от механизма за комбинации) |
| `modelAvailability.ts` | Проверка на наличността за всеки модел                             |
| `assessment/`          | Оценяване на модели (фаза 1 от RFC-AUTO-ASSESSMENT)                |

### `src/server/`

| Модул    | Предназначение                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------ |
| `authz/` | Конвейер за оторизация: `classify` → `policies` → `enforce` — вижте `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | Конфигурация на CORS                                                                                   |
| `auth/`  | Междинен софтуер за сесии                                                                              |

### `src/shared/`

| Модул                            | Предназначение                                                                      |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| `constants/providers.ts`         | **355 доставчици** със Zod валидиране (единствен източник на истина)                |
| `constants/cliTools.ts`          | Регистър на външни CLI инструменти                                                  |
| `constants/routingStrategies.ts` | **19 стратегии за маршрутизиране** с приоритети                                     |
| `constants/publicApiRoutes.ts`   | Маршрути, които изискват Bearer удостоверяване (вместо управленско удостоверяване)  |
| `constants/upstreamHeaders.ts`   | Списък със забранени заглавки за заявки към сървъри нагоре по веригата              |
| `validation/schemas.ts`          | ~80 Zod схеми (единствен източник на истина за API договорите)                      |
| `validation/helpers.ts`          | Помощни средства за Zod валидиране (`validateBody` и др.)                           |
| `types/`                         | Споделени TS типове                                                                 |
| `contracts/`                     | Публични API договори (използвани чрез `files:` в `package.json`)                   |
| `utils/circuitBreaker.ts`        | Прекъсвач на веригата за доставчици (вижте `docs/architecture/RESILIENCE_GUIDE.md`) |
| `utils/apiAuth.ts`               | Валидиране на API ключове, проверка на обхвати                                      |
| `utils/fetchTimeout.ts`          | Обвивки за изчакване/прекъсване на заявки към сървъри нагоре по веригата            |
| `utils/releaseNotes.ts`          | Анализатор на приключени v2/наследени съобщения, локализация и отхвърляне по ID     |

---

## `open-sse/` — Работно пространство на стрийминг енджина

Отделно npm работно пространство (`@omniroute/open-sse`). Обработва заявките и изпълнението от доставчиците.

```
open-sse/
├── handlers/            # 16 файла (12 обработчика + 4 помощни модула): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search и др.
├── executors/           # 67 специфични за доставчиците изпълнители (разширяват BaseExecutor)
├── translator/          # Конвертори на формати (9 за заявки, 9 за отговори, 9 помощни)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ сервизни модула (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM и др.)
├── mcp-server/          # MCP сървър (110 инструмента, 3 транспорта, 33 обхвата)
├── config/              # Регистри на доставчици/модели, конфигурация на заглавки, псевдоними на модели
├── utils/               # TLS клиент, proxy fetch/dispatcher, помощни модули за мрежата
├── index.ts             # Входна точка на работното пространство
├── package.json         # Манифест на работното пространство
├── tsconfig.json        # TS конфигурация на работното пространство
└── types.d.ts           # Декларации на типове за работното пространство
```

### `open-sse/mcp-server/`

| Път                         | Предназначение                                                                  |
| --------------------------- | ------------------------------------------------------------------------------- |
| `server.ts`                 | Жизнен цикъл на MCP сървъра (stdio + HTTP транспорти)                           |
| `httpTransport.ts`          | HTTP Streamable + SSE транспорти (`/api/mcp/sse`, `/api/mcp/stream`)            |
| `audit.ts`                  | Регистриране на одитни събития в таблицата `mcp_tool_audit`                     |
| `scopeEnforcement.ts`       | Проверка на обхвата за всеки инструмент                                         |
| `runtimeHeartbeat.ts`       | Сигнал за състоянието към `DATA_DIR/runtime/mcp-heartbeat.json`                 |
| `descriptionCompressor.ts`  | Компресира метаданните с описания на инструментите за пестене на контекст       |
| `schemas/tools.ts`          | 36 базови дефиниции на инструменти + обхвати                                    |
| `tools/advancedTools.ts`    | Разширени реализации на инструменти                                             |
| `tools/memoryTools.ts`      | 3 инструмента за памет (търсене/добавяне/изчистване)                            |
| `tools/skillTools.ts`       | 4 инструмента за умения (списък/активиране/изпълнение/изпълнения)               |
| `tools/compressionTools.ts` | 5 инструмента за компресиране                                                   |
| `README.md`                 | Вътрешен README за MCP сървъра (с препратка от `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Обвивка за настолни приложения

| Файл             | Предназначение                                                                                              |
| ---------------- | ----------------------------------------------------------------------------------------------------------- |
| `main.js`        | Основен процес на Electron (BrowserWindow, вграден Next.js сървър, системна област, автоматично обновяване) |
| `preload.js`     | IPC мост (contextBridge → `window.omniroute`)                                                               |
| `package.json`   | Конфигурация на electron-builder + зависимости Electron 41 + electron-builder 26.10                         |
| `assets/`        | Икони на приложението (Windows .ico, macOS .icns, Linux .png)                                               |
| `dist-electron/` | Резултат от компилацията (игнориран от git)                                                                 |
| `types.d.ts`     | Декларации на типове за моста към визуализатора                                                             |
| `README.md`      | Вътрешен README за Electron (вижте също `docs/guides/ELECTRON_GUIDE.md`)                                    |

---

## `bin/` — CLI

| Файл                                                                                                        | Предназначение                                                                                                                          |
| ----------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Основна входна точка на CLI — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` и др. |
| `reset-password.mjs`                                                                                        | Самостоятелен CLI за нулиране на парола                                                                                                 |
| `cli/commands/setup.mjs`                                                                                    | Интерактивен и неинтерактивен помощник за настройване                                                                                   |
| `cli/commands/doctor.mjs`                                                                                   | Диагностика на състоянието на системата (над 8 проверки)                                                                                |
| `cli/commands/providers.mjs`                                                                                | Изброяване/тестване/валидиране на доставчици                                                                                            |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Помощни модули за CLI                                                                                                                   |
| `cli/tray/tray.ts`                                                                                          | Интеграция със системната област (междуплатформена: NotifyIcon под Windows, systray2 под macOS/Linux)                                   |
| `cli/tray/tray.ps1`                                                                                         | PowerShell бекенд с NotifyIcon (Windows, без нови двоични файлове)                                                                      |
| `cli/tray/autostart.ts`                                                                                     | Междуплатформено автоматично стартиране (LaunchAgent / .desktop / системен регистър)                                                    |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5-стъпкова верига за намиране на SQLite драйвер (включен → среда за изпълнение → отложено инсталиране → node:sqlite → sql.js)           |
| `cli/runtime/magicBytes.mjs`                                                                                | Валидиране на магическите байтове на двоични файлове (ELF / Mach-O / Mach-O fat / PE)                                                   |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — предварително намира драйверите при postinstall / първо стартиране                                                 |
| `nodeRuntimeSupport.mjs`                                                                                    | Валидира поддържаната версия на Node.js при инсталиране                                                                                 |

---

## `skills/` — Публични умения за агенти

| Файл                         | Предназначение                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 манифеста на умения за външни AI агенти (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Скриптове за изграждане и проверки

| Скрипт                              | Предназначение                                                                                       |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Изпълнение в режим за разработка/стартиране със зареждане на променливи на средата                   |
| `build-next-isolated.mjs`           | Самостоятелно изграждане (самостоятелен режим на Next.js 16)                                         |
| `prepublish.ts`                     | Подготовка на пакета преди `npm pack`                                                                |
| `postinstall.mjs`                   | Автоматично създаване на `.env` от `.env.example` при първото инсталиране                            |
| `sync-env.mjs`                      | Повторно синхронизиране на ключовете в `.env` с `.env.example`                                       |
| `check-cycles.mjs`                  | Откриване на циклични зависимости                                                                    |
| `check-route-validation.mjs`        | Проверка дали всички API маршрути имат Zod валидиране                                                |
| `check-t11-any-budget.mjs`          | Налагане на изричен лимит за `any` за всеки файл                                                     |
| `check-docs-sync.mjs`               | Проверка на синхронизирането на версиите в документацията (съществуваща проверка преди commit)       |
| **`check-env-doc-sync.mjs`**        | НОВО: кръстосана проверка на променливите на средата в кода спрямо `.env.example` и `ENVIRONMENT.md` |
| **`check-docs-counts-sync.mjs`**    | НОВО: проверка дали броят (изпълнители, стратегии, OAuth, A2A умения) съответства на документацията  |
| **`check-deprecated-versions.mjs`** | НОВО: маркиране на остарели версии/дати в документацията                                             |
| `check-supported-node-runtime.ts`   | Проверка дали текущата версия на Node се поддържа                                                    |
| `check-pr-test-policy.mjs`          | Налагане на правилото „изискват се тестове“ при промени в продукционния код                          |
| **`gen-provider-reference.ts`**     | НОВО: автоматично генериране на `docs/reference/PROVIDER_REFERENCE.md` от каталога                   |
| `i18n/generate-multilang.mjs`       | Превод на низове от потребителския интерфейс и документация чрез Google Translate                    |
| `i18n_autotranslate.py`             | Процес за превод на документация, базиран на LLM                                                     |
| `validate_translation.py`           | Проверка на превода за всяка локализация                                                             |
| `check_translations.py`             | Проверка на i18n ключовете в кода                                                                    |
| `run-playwright-tests.mjs`          | Изпълнение на Playwright E2E тестове                                                                 |
| `run-protocol-clients-tests.mjs`    | Изпълнение на MCP/A2A E2E тестове                                                                    |
| `run-ecosystem-tests.mjs`           | Тестове на екосистемата (интеграция с доставчици)                                                    |
| `test-report-summary.mjs`           | Генериране на резюме за покритието във формат markdown                                               |
| `smoke-electron-packaged.mjs`       | Базов тест на пакетираното Electron приложение                                                       |
| `native-binary-compat.mjs`          | Проверка дали собствените зависимости (`better-sqlite3`) съответстват на Node версията на Electron   |
| `validate-pack-artifact.ts`         | Проверка на резултата от npm pack                                                                    |
| `responses-ws-proxy.mjs`            | WebSocket мост за Codex Responses API                                                                |
| `v1-ws-bridge.mjs`                  | WebSocket мост за крайната точка `/api/v1/ws`                                                        |
| `standalone-server-ws.mjs`          | Изпълнение на самостоятелен WS сървър                                                                |
| `system-info.mjs`                   | Извеждане на информация за системата/средата за изпълнение за нуждите на поддръжката                 |
| `healthcheck.mjs`                   | Еднократна проверка на състоянието (използвана от Docker HEALTHCHECK)                                |
| `uninstall.mjs`                     | Скрипт за чисто деинсталиране                                                                        |

---

## `docs/` — Публична документация (7 основни файла + 17 поддиректории)

### Ръководства от най-високо ниво

| Документ                    | Предназначение                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | Архитектура на високо ниво, карта на подсистемите, интерфейс на таблото                                     |
| `CODEBASE_DOCUMENTATION.md` | Инженерна справка: директории, модули, конвенции                                                            |
| `FEATURES.md`               | Матрица на функционалностите с акценти от v3.8                                                              |
| `USER_GUIDE.md`             | Ръководство за крайния потребител (настройка, модели, комбинации, CLI, аудио и др.)                         |
| `API_REFERENCE.md`          | Справочник за API крайните точки с модел за удостоверяване                                                  |
| `openapi.yaml`              | Спецификация OpenAPI 3.0 (121 пътя)                                                                         |
| `SETUP_GUIDE.md`            | Методи за инсталиране (npm, npx, Docker, Electron, Termux, от изходен код)                                  |
| `ENVIRONMENT.md`            | Всички променливи на средата (~800 документирани, ~3 050 реда в `.env.example`)                             |
| `TROUBLESHOOTING.md`        | Често срещани грешки + известни проблеми във v3.8.0                                                         |
| `RELEASE_CHECKLIST.md`      | Пълен процес за издание (умения, husky, конвенционални комити, внедряване)                                  |
| `COVERAGE_PLAN.md`          | Цели за покритие и текущо състояние                                                                         |
| `FREE_TIERS.md`             | Подбран списък с доставчици на безплатни планове (48+ безплатни + 11 OAuth)                                 |
| `CLI-TOOLS.md`              | Външни CLI интеграции + вътрешен CLI на OmniRoute                                                           |
| `I18N.md`                   | Архитектура на i18n, добавяне на език, 42 локала                                                            |
| `UNINSTALL.md`              | Стъпки за чисто деинсталиране                                                                               |
| `PROVIDER_REFERENCE.md`     | **Автоматично генериран** каталог на 355 доставчици (повторно генериране: `npm run gen:provider-reference`) |

### Подробни описания на подсистемите

| Документ                                      | Предназначение                                                                               |
| --------------------------------------------- | -------------------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                               | MCP сървър: 110 инструмента, 3 транспорта, 33 обхвата, REST крайни точки                     |
| `A2A-SERVER.md`                               | A2A v0.3: JSON-RPC, 6 умения, REST помощни компоненти, карта на агент                        |
| `AGENT_PROTOCOLS_GUIDE.md`                    | Унифицирано ръководство: A2A спрямо ACP спрямо облачни агенти                                |
| `CLOUD_AGENT.md`                              | Оркестрация на Codex Cloud / Devin / Jules                                                   |
| `SKILLS.md`                                   | Рамка за умения (вградени + пазар + SkillsSH + изолирана среда)                              |
| `RADAR.md`                                    | Наслагване на каталога с безплатни модели Radar (`RADAR_ENABLED`, изключено по подразбиране) |
| `MEMORY.md`                                   | Система за памет (SQLite FTS5 + Qdrant)                                                      |
| `EVALS.md`                                    | Рамка за оценяване (пакети, изпълнения, рубрики)                                             |
| `GUARDRAILS.md`                               | Маскиране на лични данни, инжектиране на подкани, мост за визуални данни                     |
| `COMPLIANCE.md`                               | Одитен журнал, съхранение, отказ чрез noLog                                                  |
| `WEBHOOKS.md`                                 | Доставка на webhook съобщения с HMAC подпис                                                  |
| `REASONING_REPLAY.md`                         | Хибриден кеш в паметта/SQLite за `reasoning_content`                                         |
| `AUTHZ_GUIDE.md`                              | Конвейер за упълномощаване (`classify` → `policies` → `enforce`)                             |
| `RESILIENCE_GUIDE.md`                         | Прекъсвач на веригата + период на изчакване + блокиране на модел                             |
| `docs/security/STEALTH_GUIDE.md` (само в git) | TLS снемане на отпечатъци (JA3/JA4), Claude Code CCH, MITM сертификат                        |
| `AUTO-COMBO.md`                               | Механизъм Auto Combo (оценяване по 16 фактора, 6 пакета режими, виртуална фабрика)           |

### Компресиране

| Документ                        | Предназначение                                        |
| ------------------------------- | ----------------------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Общ преглед на режимите за компресиране + пътна карта |
| `COMPRESSION_ENGINES.md`        | Механизми Caveman + RTK, договор на регистъра         |
| `COMPRESSION_RULES_FORMAT.md`   | JSON схема на пакета с правила на Caveman             |
| `COMPRESSION_LANGUAGE_PACKS.md` | Списък на пакетите с правила за всеки език            |
| `RTK_COMPRESSION.md`            | Декларативен конвейер RTK (49 филтъра)                |

### Внедряване

| Документ                     | Предназначение                                                                         |
| ---------------------------- | -------------------------------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Изграждане с Docker, профили (base/cli/host/cliproxyapi), допълнителен контейнер Redis |
| `VM_DEPLOYMENT_GUIDE.md`     | Общо внедряване на VM/VPS (Ubuntu/Debian + nginx + systemd)                            |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Внедряване във Fly.io (понастоящем само на китайски)                                   |
| `TERMUX_GUIDE.md`            | Android без графичен интерфейс чрез Termux                                             |
| `PWA_GUIDE.md`               | Инсталиране на прогресивно уеб приложение + service worker                             |
| `ELECTRON_GUIDE.md`          | Изграждане + подписване + разпространение на настолно приложение                       |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                                                 |
| `PROXY_GUIDE.md`             | 4-степенно изходящо прокси + пазар 1proxy                                              |

### Поддиректории

| Поддиректория         | Предназначение                                                                                                                                                                                                                   |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Локализирани преводи на документацията (41 локала)                                                                                                                                                                               |
| `docs/screenshots/`   | Изображения за ръководствата                                                                                                                                                                                                     |
| `_tasks/superpowers/` | Планове/спецификации от superpowers (`writing-plans`/`brainstorming`) + проучвания — изолирано хранилище с отделно версиониране, игнорирано от основното дърво чрез git. Вижте CLAUDE.md → „Артефакти за планиране и проучване“. |

---

## `tests/` — Набори от тестове

| Поддиректория                        | Тип                                                 | Изпълнител                                               |
| ------------------------------------ | --------------------------------------------------- | -------------------------------------------------------- |
| `tests/unit/`                        | Модулни тестове (~4 800 файла, най-бързи)           | Вграденият изпълнител на тестове на Node                 |
| `tests/integration/`                 | Интеграционни тестове с множество модули + БД       | Вграденият изпълнител на тестове на Node (паралелност 1) |
| `tests/e2e/`                         | E2E на потребителския интерфейс + работните процеси | Playwright                                               |
| `tests/e2e/protocol-clients.test.ts` | E2E с реални клиенти за MCP + A2A                   | Персонализирани протоколни клиенти                       |
| `tests/e2e/ecosystem.test.ts`        | Интеграция с доставчици (използва мрежата)          | Вграденият изпълнител на тестове на Node                 |

---

## `public/` — Статични ресурси

| Път                 | Предназначение                                                           |
| ------------------- | ------------------------------------------------------------------------ |
| `public/` (корен)   | Favикони, robots.txt, манифест, service worker, маркетингови изображения |
| `public/providers/` | Лога на доставчици във формат PNG/SVG (използвани в таблото)             |

---

## `config/` — Статични конфигурации + състояние на контролите за качество

Предоставяни шаблони за конфигурация плюс записаните в хранилището базови стойности за контролите за качество
(преместени тук от корена на хранилището във v3.8.26, за да остане коренът изчистен).

| Път                                           | Предназначение                                                                                   |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `config/i18n.json`                            | Списък с локали + метаданни (каноничен източник за броя от 42 локала)                            |
| `config/i18n-schema.json`                     | JSON схема за валидиране на `i18n.json`                                                          |
| `config/payloadRules.json`                    | Правила за прочистване на полезния товар от източника                                            |
| `config/quality/quality-baseline.json`        | Базова стойност на многоизмерния ratchet механизъм (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Фиксирана базова стойност за сложността на ESLint (`check-complexity.mjs`)                       |
| `config/quality/duplication-baseline.json`    | Фиксирана базова стойност за дублирането според jscpd (`check-duplication.mjs`)                  |
| `config/quality/file-size-baseline.json`      | Фиксирана базова стойност за размера на отделните файлове (`check-file-size.mjs`)                |
| `config/quality/test-discovery-baseline.json` | Фиксирана базова стойност за тестове сираци (`check-test-discovery.mjs`)                         |
| `config/quality/dependency-allowlist.json`    | Списък с разрешени одобрени зависимости (`check-deps.mjs`)                                       |
| `config/quality/.license-allowlist.json`      | Списък с разрешени SPDX лицензи (`check-licenses.mjs`)                                           |
| `config/quality/quality-metrics.json`         | Временно събрани метрики (генерирани от `collect-metrics.mjs`; **игнорирани от git**)            |

---

## `.github/` — Интеграция с GitHub

| Път                                | Предназначение                                                          |
| ---------------------------------- | ----------------------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD работни процеси (lint, тестове, покритие, издание) |
| `.github/ISSUE_TEMPLATE/`          | Шаблони за докладване на грешки/предложения за функционалности          |
| `.github/pull_request_template.md` | Шаблон за PR                                                            |
| `.github/dependabot.yml`           | Конфигурация за актуализиране на зависимости                            |

---

## `.husky/` — Git Hooks

| Файл         | Предназначение                                                                 |
| ------------ | ------------------------------------------------------------------------------ |
| `pre-commit` | Изпълнява `lint-staged + check-docs-sync + check:any-budget:t11`               |
| `pre-push`   | В момента е деактивирано (закоментирано). Изпълнете `npm run test:unit` ръчно. |
| `_/`         | Вътрешни компоненти на Husky                                                   |

---

## `.claude/` — Slash команди на Claude Code

| Файл                                                | Предназначение                                                       |
| --------------------------------------------------- | -------------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — увеличаване на версията + автоматичен changelog |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — пълен работен процес за издание             |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Разгръщане към VPS                                                   |
| `commands/capture-release-evidences-cc.md`          | Записване чрез браузъра на нови функционалности като WebP            |
| `commands/review-{prs,discussions}-cc.md`           | Преглед и категоризиране на GitHub PR-и/дискусии                     |
| `commands/{review-issues,implement-features}-cc.md` | Работни процеси за issues                                            |
| `settings.local.json`                               | Настройки на Claude Code за конкретния проект                        |

---

## `.agents/` — Общи работни процеси за агенти (Codex / Cursor / и др.)

| Път                      | Предназначение                                                 |
| ------------------------ | -------------------------------------------------------------- |
| `workflows/*-ag.md`      | 11 дефиниции на работни процеси (копие на `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 дефиниции на умения с бележки за изпълнение с Codex          |

> **Забележка:** В момента работните процеси и командите са идентични байт по байт. Ако `.agents/` е предназначена за различна среда за изпълнение на агенти (Codex), вариантите трябва да се различават съществено.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Извън основното дърво

Тези директории с префикс долна черта съдържат материали, които не се включват в разпространявания пакет:

- **`_ideia/`** — бележки за дизайна (категории defer / notfit / viable)
- **`_mono_repo/`** — исторически подпроекти (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — клонове само за четене на свързани OSS проекти (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api и др.) за съпоставка по време на разработката
- **`_tasks/`** — неформални файлове за проследяване на задачите за всяко издание

Не са включени в изхода на `npm pack`. Вижте `.npmignore`.

---

## Генерирани / игнорирани от Git

| Път                    | Предназначение                      |
| ---------------------- | ----------------------------------- |
| `node_modules/`        | npm зависимости                     |
| `.next/`               | Резултат от компилацията на Next.js |
| `coverage/`            | Отчети за покритие от c8            |
| `logs/`                | Логове по време на изпълнение       |
| `package/`             | Временна директория за npm pack     |
| `.playwright-mcp/`     | Тестови артефакти на Playwright MCP |
| `.issues/`             | Локален кеш на проблемите           |
| `tsconfig.tsbuildinfo` | Инкрементален кеш на TS             |

---

## Съвети за навигация

- **Нов участник?** Прочетете `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Добавяте доставчик?** Следвайте `docs/architecture/ARCHITECTURE.md § Добавяне на нов доставчик` и направете кръстосана проверка с `docs/reference/PROVIDER_REFERENCE.md`.
- **Добавяте маршрут?** `docs/architecture/ARCHITECTURE.md § Добавяне на нов API маршрут` + `src/shared/validation/schemas.ts`.
- **Добавяте MCP инструмент?** `docs/frameworks/MCP-SERVER.md § Добавяне на инструмент`.
- **Добавяте A2A умение?** `docs/frameworks/A2A-SERVER.md § Добавяне на ново умение`.
- **Стартирате локално?** `docs/guides/SETUP_GUIDE.md`.
- **Внедрявате?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Публикувате версия?** `docs/ops/RELEASE_CHECKLIST.md` (и Claude Code умението `/generate-release-cc`).
