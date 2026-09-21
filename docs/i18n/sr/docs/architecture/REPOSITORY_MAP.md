# Repository Map (Српски)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **Опис у једном реду за сваки директоријум и датотеку у корену.**
> Последње ажурирање: 2026-06-28 — OmniRoute v3.8.40
>
> Користите ову мапу за брзо кретање кроз базу кода. За детаљније информације пратите везе до наменске документације.

## Стабло највишег нивоа

```
OmniRoute/
├── src/                  # Next.js 16 апликација (кориснички интерфејс + API руте + библиотеке + домен + сервер)
├── open-sse/             # Радни простор механизма за стримовање (обрађивачи, извршиоци, преводилац, MCP сервер)
├── electron/             # Омотач за десктоп (Electron 41 + electron-builder 26.10)
├── bin/                  # Улазна тачка CLI-ја и обрађивачи команди
├── scripts/              # Скрипте за изградњу, проверу, синхронизацију и једнократне задатке
├── docs/                 # Јавна документација (овде се налазите)
├── tests/                # Сви скупови тестова (јединични, интеграциони, e2e, клијенти протокола)
├── public/               # Next.js статички ресурси, PWA манифест, сервисни радник, иконе
├── config/               # Статичка конфигурација + стање контроле квалитета (i18n, payloadRules, quality/)
├── images/               # Сликовни ресурси за маркетинг / README
├── @omniroute/           # Пратећи пакети за објављивање (opencode-plugin, opencode-provider)
├── skills/               # Пакети вештина за CLI/агенте (cli-* + omni-* + config-codex-cli)
├── examples/             # Примери додатака + почетни пројекат omniroute-cmd-hello
├── contrib/              # Доприноси заједнице (podman/)
├── .source/              # Конфигурација Fumadocs извора (source.config.mjs + server/browser/dynamic)
├── .github/              # GitHub Actions радни токови + шаблони проблема + PR шаблон
├── .husky/               # Git куке (pre-commit, pre-push)
├── .claude/              # Claude Code команде са косом цртом (на нивоу пројекта)
├── .agents/              # Codex / генерички радни токови и вештине агената (одраз .claude/)
├── .vscode/              # Подешавања VS Code радног простора
├── _ideia/               # Белешке о планирању (неформалне; не испоручују се)
├── _mono_repo/           # Историјски потпројекти (cloud, site, vscode-extension)
├── _references/          # Референтни клонови повезаних OSS пројеката, само за читање
├── _tasks/               # Датотеке за праћење задатака по издању (неформалне)
├── .build/ .worktrees/ dist/   # Привремени локални садржај за изградњу / git-worktree / излаз изградње (gitignored)
├── .issues/              # Локални кеш проблема (gitignored)
├── .playwright-mcp/      # Артефакти Playwright MCP тестова
├── coverage/             # Излаз c8 покривености (gitignored)
├── logs/                 # Евиденције током извршавања (gitignored)
├── node_modules/         # Зависности (gitignored)
├── package/              # Простор за припрему npm pack пакета (артефакт изградње)
├── .next/                # Излаз Next.js изградње (gitignored)
└── (датотеке у корену — погледајте испод)
```

---

## Датотеке у корену

| Датотека                                    | Намена                                                                                                  |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **README.md**                               | Маркетиншка почетна страница + брзи почетак + матрица функција (погледајте и `llm.txt`)                 |
| **CHANGELOG.md**                            | Дневник измена по издању (аутоматски генерисан вештином `/version-bump-cc`)                             |
| **LICENSE**                                 | Текст MIT лиценце                                                                                       |
| **CLAUDE.md**                               | Правила пројекта за Claude Code агенте (строга правила, конвенције, сценарији)                          |
| **AGENTS.md**                               | Исто као CLAUDE.md, али за AI агенте који нису Claude (Codex, Cursor итд.)                              |
| **GEMINI.md**                               | Сажета правила за агенте засноване на Gemini-ју (подскуп датотеке CLAUDE.md)                            |
| **CONTRIBUTING.md**                         | Водич за доприносиоце: подешавање, конвенционални комити, тестирање, ток PR-а                           |
| **SECURITY.md**                             | Политика пријављивања рањивости, подржане верзије, модел претњи                                         |
| **CODE_OF_CONDUCT.md**                      | Contributor Covenant — очекивања у погледу понашања у заједници                                         |
| **llm.txt**                                 | Текстуална почетна страница оптимизована за LLM пописиваче (SEO за AI асистенте)                        |
| **package.json**                            | npm манифест, скрипте, зависности, механизми, c8 праг покривености                                      |
| **package-lock.json**                       | Закључано стабло зависности                                                                             |
| **tsconfig.json**                           | Корена TypeScript конфигурација                                                                         |
| **tsconfig.typecheck-core.json**            | Конфигурација провере типова за језгро у `src/`                                                         |
| **tsconfig.typecheck-noimplicit-core.json** | Строга (`noImplicitAny`) провера типова                                                                 |
| **tsconfig.tsbuildinfo**                    | Кеш инкременталне TS изградње (игнорише га git)                                                         |
| **next.config.mjs**                         | Конфигурација Next.js 16 изградње (самостални излаз)                                                    |
| **next-env.d.ts**                           | Аутоматски генерисани Next.js типови окружења                                                           |
| **eslint.config.mjs**                       | ESLint равна конфигурација (правила по областима пројекта)                                              |
| **prettier.config.mjs**                     | Правила Prettier форматирања                                                                            |
| **postcss.config.mjs**                      | PostCSS конфигурација за Tailwind/CSS процес обраде                                                     |
| **playwright.config.ts**                    | Конфигурација Playwright E2E тестова                                                                    |
| **vitest.config.ts**                        | Vitest конфигурација (подразумевани скуп тестова)                                                       |
| **vitest.mcp.config.ts**                    | Vitest конфигурација за MCP сервер / autoCombo / скупове тестова кеша                                   |
| **sonar-project.properties**                | SonarQube/SonarCloud конфигурација (квалитет кода)                                                      |
| **Dockerfile**                              | Вишефазна Docker изградња (builder → runner-base → runner-cli)                                          |
| **docker-compose.yml**                      | Развојна compose конфигурација са 4 профила (base, cli, host, cliproxyapi) + redis пратећи контејнер    |
| **docker-compose.prod.yml**                 | Продукциона compose конфигурација (порт 20130, redis, именовани волумени)                               |
| **.dockerignore**                           | Датотеке изузете из Docker контекста                                                                    |
| **fly.toml**                                | Fly.io конфигурација примене (регион `sin`, порт 20128, волумен /data)                                  |
| **.env.example**                            | Шаблон датотеке окружења (аутоматски се копира у `.env` при првој инсталацији)                          |
| **.gitignore**                              | Git обрасци за игнорисање                                                                               |
| **.npmignore**                              | Листа изузетака при npm објављивању                                                                     |
| **.npmrc**                                  | npm конфигурација (регистар, политика lockfile датотеке)                                                |
| **.node-version**                           | Фиксирана Node верзија (користе је алати компатибилни са nvm-ом)                                        |
| **.nvmrc**                                  | Фиксирана Node верзија за nvm                                                                           |
| **eslint.complexity.config.mjs**            | ESLint конфигурација за постепено ограничење сложености (`scripts/check/check-complexity.mjs --config`) |
| **eslint.sonarjs.config.mjs**               | ESLint конфигурација за SonarJS правила (когнитивна сложеност / дуплирање)                              |
| **source.config.ts**                        | Fumadocs `defineDocs` конфигурација извора (попуњава `.source/`)                                        |
| **knip.json**                               | Knip конфигурација — некоришћене датотеке/извози/зависности (улаз за проверу мртвог кода)               |
| **stryker.conf.json**                       | Конфигурација Stryker мутационог тестирања                                                              |
| **.size-limit.json**                        | Конфигурација ограничења величине пакета за size-limit                                                  |
| **promptfooconfig.yaml**                    | Конфигурација евалуације за promptfoo                                                                   |
| **.gitleaks.toml**                          | Скуп правила за скенирање тајни помоћу gitleaks                                                         |
| **.zizmor.yml**                             | Конфигурација безбедносне провере GitHub Actions-а помоћу zizmor                                        |
| **socket.yml**                              | Конфигурација ланца снабдевања за Socket.dev                                                            |
| **news.json**                               | Локализовани ток обавештења за v2; ставка о покретању Radar-а испоручује се неактивна                   |
| **flake.nix** / **flake.lock**              | Дефиниција Nix развојног окружења + датотека за закључавање                                             |
| **.env**                                    | Локалне тајне (игнорише их git — генерисано из `.env.example`)                                          |

> **Премештено из кореног директоријума у v3.8.26 (рашчишћавање):**
>
> - **→ `config/quality/`:** `quality-baseline.json`, `complexity-baseline.json`, `duplication-baseline.json`, `file-size-baseline.json`, `test-discovery-baseline.json`, `dependency-allowlist.json`, `.license-allowlist.json` и генерисани `quality-metrics.json` (игнорише га git). Погледајте [`## config/`](#config--static-configs--quality-gate-state).

---

## `src/` — Next.js апликација

```
src/
├── app/                 # App Router (странице + API руте + статусне странице + одредишна страница)
├── lib/                 # Основне библиотеке / модули домена (80 поддиректоријума + ~70 датотека највишег нивоа)
├── domain/              # Чиста логика домена (механизам политика, резервни механизам, трошкови, закључавање, comboResolver, процена)
├── server/              # Модули искључиво за сервер (authz ток обраде, cors, auth посреднички софтвер) — не могу се увозити из клијента
├── shared/              # Дељено између сервера и клијента тамо где је безбедно (константе, типови, валидација, уговори, помоћни алати)
├── i18n/                # next-intl конфигурација + JSON поруке за сваки локалитет (42 локалитета)
├── middleware/          # Next.js посреднички софтвер (обогаћивање захтева, откривање локалитета)
├── mitm/                # Језгро MITM проксија: генерисање/инсталирање сертификата, обрађивачи, циљеви, инспектор, маске, директно прослеђивање
│   ├── handlers/        # 9 класа обрађивача IDE агената које проширују MitmHandlerBase (antigravity, kiro, copilot, codex, cursor, zed, claudeCode, openCode, trae)
│   └── inspector/       # Слој за хватање саобраћаја: бафер (кружни бафер у меморији), sseMerger, conversationNormalizer, kindDetector, contextKey, httpProxyServer, systemProxyConfig
├── models/              # Повезујући код адаптера модела (застарели посреднички слој)
├── scripts/             # Скрипте за одржавање унутар стабла (нпр. backfillAggregation)
├── sse/                 # Застарели SSE обрађивачи/сервиси (chat.ts, chatHelpers.ts, services/auth.ts)
├── store/               # Застарело складиште у меморији (постепено се замењује са src/lib/db)
├── types/               # Дељене датотеке TS типова
├── instrumentation.ts   # Next.js телеметријска спона (прегледач + edge)
├── instrumentation-node.ts  # Инструментација искључиво за Node
└── proxy.ts             # Улазни посреднички слој за HTTP прокси
```

### `src/app/` — App Router (Next.js 16)

| Путања                                                                       | Намена                                                                                                                                                                                                                                                                                                                    |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | Јавни API компатибилан са OpenAI-јем (~25 подрута: chat, completions, embeddings, files, batches, audio, images, videos, music, rerank, moderations, search, ws, agents, accounts, providers итд.)                                                                                                                        |
| `app/api/v1beta/`                                                            | API крајње тачке у Gemini стилу                                                                                                                                                                                                                                                                                           |
| `app/api/playground/`                                                        | Руте за Playground Studio: `improve-prompt/` (POST — LLM алат за преформулисање упита), `presets/` (GET листа / POST креирање), `presets/[id]/` (GET / PUT / DELETE) — погледајте `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                  |
| `app/api/` (без v1)                                                          | Управљачке/администраторске руте (~60 директоријума: providers, combos, settings, mcp, a2a, evals, memory, skills, webhooks, compliance, resilience, monitoring, tunnels, cli-tools итд.)                                                                                                                                 |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 рута (контрола сервера, стање агента/DNS/мапирања, заобилажење, сертификат, изворни CA). LOCAL_ONLY + SPAWN_CAPABLE. Погледајте `docs/frameworks/AGENTBRIDGE.md §7`.                                                                                                                            |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16+ рута (захтеви, сесије, хостови, режими снимања, извоз, ws). LOCAL_ONLY + SPAWN_CAPABLE. Погледајте `docs/frameworks/TRAFFIC_INSPECTOR.md §8`.                                                                                                                                       |
| `app/a2a/`                                                                   | Улазна тачка за A2A JSON-RPC 2.0 (`POST /a2a`)                                                                                                                                                                                                                                                                            |
| `app/.well-known/agent.json/`                                                | A2A картица агента (откривање)                                                                                                                                                                                                                                                                                            |
| `app/(dashboard)/dashboard/`                                                 | Странице корисничког интерфејса контролне табле (50+ одељака, ~118 page.tsx датотека: providers, combos, settings, memory, skills, webhooks, evals, audit, batch, cache, costs, health, system, activity итд.)                                                                                                            |
| `app/(dashboard)/dashboard/search-tools/`                                    | Кориснички интерфејс Search Tools Studio (3 картице: Search/Scrape/Compare + SearchConceptCard + ProviderCatalog) — погледајте `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                   |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio (план 21): `page.tsx` (оквир са 3 картице), `components/` (MemoryConceptCard, MemoryEngineStatus, EmbeddingSourceSelector, EditMemoryModal, RetrievePreview, QdrantConfigCard, RerankConfigCard), `components/tabs/` (MemoriesTab, PlaygroundTab, EngineTab), `hooks/` (useEngineStatus, useMemorySettings) |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | Страница AgentBridge контролне табле — картица сервера, 9 картица агената, чаробњак за подешавање, мапирање модела, листа заобилажења. i18n PT-BR + EN. Погледајте `docs/frameworks/AGENTBRIDGE.md`.                                                                                                                      |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Страница Traffic Inspector контролне табле — DevTools подељени приказ, 7 картица са детаљима, 4 прекидача режима снимања, снимач сесија, бојење контекста. i18n PT-BR + EN. Погледајте `docs/frameworks/TRAFFIC_INSPECTOR.md`.                                                                                            |
| `app/(dashboard)/dashboard/activity/`                                        | Страница тока активности (Група B): `page.tsx` (сервер) + `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — погледајте `docs/architecture/MONITORING_SECTIONS.md`                                                                                                       |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | Страница дељења квоте (Група B): `QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                              |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | Страница за конфигурисање плана добављача (Група B): `page.tsx` + `ProviderPlanConfigClient.tsx` — замена димензија квоте по вези                                                                                                                                                                                         |
| `app/docs/`                                                                  | Уграђени приказивач документације (приказује `docs/*.md`)                                                                                                                                                                                                                                                                 |
| `app/landing/`                                                               | Маркетиншка одредишна страница                                                                                                                                                                                                                                                                                            |
| `app/login/`, `forgot-password/`, `forbidden/`                               | Странице у вези са аутентификацијом                                                                                                                                                                                                                                                                                       |
| `app/{400,401,403,408,429,500,502,503}/`                                     | Странице HTTP грешака                                                                                                                                                                                                                                                                                                     |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | Статичке/статусне странице                                                                                                                                                                                                                                                                                                |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | Коренски распоред, почетна страница, PWA манифест, глобални CSS                                                                                                                                                                                                                                                           |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | Границе грешака                                                                                                                                                                                                                                                                                                           |

### `src/lib/` — Основне библиотеке (~50 модула)

| Модул                                    | Намена                                                                                                                                                                                                                                                                                                                               |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `a2a/`                                   | Менаџер задатака A2A протокола, вештине (5), стримовање                                                                                                                                                                                                                                                                              |
| `acp/`                                   | Регистар CLI агената (локално откривање CLI алата — погледајте `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`)                                                                                                                                                                                                                           |
| `api/`                                   | Заједничке помоћне функције API-ја (`requireManagementAuth`, валидација)                                                                                                                                                                                                                                                             |
| `auth/`                                  | Сесија, хеширање лозинки, валидација токена                                                                                                                                                                                                                                                                                          |
| `batches/`                               | Обрађивачи OpenAI Batches API-ја                                                                                                                                                                                                                                                                                                     |
| `catalog/`                               | Zod валидација каталога провајдера + разрешавање могућности                                                                                                                                                                                                                                                                          |
| `cloudAgent/`                            | Агенти у облаку (Codex Cloud, Devin, Jules) — погледајте `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                                            |
| `combos/`                                | Разрешавање комбинација + помоћне функције за промену редоследа                                                                                                                                                                                                                                                                      |
| `audit/`                                 | Помоћне функције фида активности: `highLevelActions.ts` (листа дозвољених вредности + `isHighLevelAction()`), `activityIcons.ts` (мапирање радње → икона/глагол), `timeline.ts` (groupByDay/relativeTime) — погледајте `docs/architecture/MONITORING_SECTIONS.md`                                                                    |
| `compliance/`                            | Евиденција ревизије + ревизија провајдера — погледајте `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                 |
| `compression/`                           | Повезни слој механизма за компресију (механизми се налазе у `open-sse/services/compression/`)                                                                                                                                                                                                                                        |
| `config/`                                | Помоћне функције за конфигурацију током извршавања                                                                                                                                                                                                                                                                                   |
| `db/`                                    | Више од 120 доменских DB модула + 168 миграција (за SQLite увек приступајте преко овог модула)                                                                                                                                                                                                                                       |
| `quota/`                                 | Механизам за дељење квота: `dimensions.ts` (типови/Zod), `types.ts` (интерфејс QuotaStore), `sqliteQuotaStore.ts`, `redisQuotaStore.ts`, `storeFactory.ts`, `fairShare.ts`, `burnRate.ts`, `planResolver.ts`, `planRegistry.ts`, `saturationSignals.ts`, `enforce.ts`, `spendRecorder.ts` — погледајте `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Клијент каталога бесплатних модела Radar: `feedSchema.ts`, `pinnedKeys.ts`, `verify.ts`, `sync.ts`, `applyFeed.ts`, `index.ts` (`getRadarCatalog()`) — погледајте `docs/frameworks/RADAR.md`                                                                                                                                         |
| `display/`                               | Помоћне функције за форматирање корисничког интерфејса (цена, кашњење итд.)                                                                                                                                                                                                                                                          |
| `embeddings/`                            | Помоћне функције сервиса за угнежђавања                                                                                                                                                                                                                                                                                              |
| `env/`                                   | Рашчлањивање и валидација променљивих окружења                                                                                                                                                                                                                                                                                       |
| `evals/`                                 | Оквир за евалуацију (скупови, покретач, извршно окружење) — погледајте `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                    |
| `guardrails/`                            | Маскирање личних података, заштита од убризгавања упита, мост за обраду слика — погледајте `docs/security/GUARDRAILS.md`                                                                                                                                                                                                             |
| `jobs/`                                  | Позадински послови (налик на cron)                                                                                                                                                                                                                                                                                                   |
| `memory/`                                | Конверзацијска меморија (SQLite FTS5 + sqlite-vec хибридни RRF + Qdrant ниво 2) — погледајте `docs/frameworks/MEMORY.md`                                                                                                                                                                                                             |
| `memory/embedding/`                      | Слој за угнежђавања из више извора: `index.ts` (разрешивач), `remote.ts`, `staticPotion.ts`, `transformersLocal.ts`, `cache.ts`, `types.ts` (план 21)                                                                                                                                                                                |
| `memory/vectorStore.ts`                  | Омотач за sqlite-vec v0.1.9 — KNN груба претрага + хибридни RRF (FTS5 + вектор, k=60). Лења иницијализација, постепено смањује функционалност када sqlite-vec није доступан. (план 21)                                                                                                                                               |
| `memory/reindex.ts`                      | `runReindexBatch()` — обрађује меморије са `needs_reindex=1` у позадини; позивају га `POST /api/memory/reindex` и путања за лењу допуну. (план 21)                                                                                                                                                                                   |
| `monitoring/`                            | Провере стања, емитовање метрика                                                                                                                                                                                                                                                                                                     |
| `oauth/`                                 | OAuth/токови увоза за 22 модула добављача (agy, antigravity, claude, cline, codebuddy-cn, codex, cursor, devin-desktop, ghe-copilot, github, gitlab-duo, grok-cli-oauth, grok-cli, kilocode, kimi-coding, kiro, openference, qoder, trae, xai-oauth, zed-hosted, zed)                                                                |
| `plugins/`                               | Регистар додатака                                                                                                                                                                                                                                                                                                                    |
| `promptCache/`                           | Преломне тачке кеша упита у стилу Anthropic-а                                                                                                                                                                                                                                                                                        |
| `skills/`                                | Оквир за вештине (уграђене + тржиште + SkillsSH) — погледајте `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                            |
| `playground/`                            | Дељени помоћни модули за Playground Studio: `codeExport.ts` (генератор за curl/Python/TS), `promptImprover.ts` (градитељ мета-упита), `streamMetrics.ts` (чисти TTFT/TPS), `types.ts` (табела цена) — погледајте `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                              |
| `webhookDispatcher.ts`                   | Испорука webhook-ова помоћу HMAC-а — погледајте `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                        |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | Менаџери тунела — погледајте `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                                             |
| `cloudSync.ts`, `initCloudSync.ts`       | Опциона синхронизација стања са облаком                                                                                                                                                                                                                                                                                              |
| `localDb.ts`                             | Централни модул за поновни извоз db модула (без логике — само поновни извоз)                                                                                                                                                                                                                                                         |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | Кеширање захтева + идемпотентност                                                                                                                                                                                                                                                                                                    |
| (још око 30 датотека највишег нивоа)     | Специјализовани помоћни модули (logEnv, modelsDevSync, piiSanitizer итд.)                                                                                                                                                                                                                                                            |

### `src/lib/db/` — База података (122 модула + 168 миграција)

| Поддиректоријум           | Намена                                                                                                                                                                                          |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `db/core.ts`              | Јединствена инстанца `getDbInstance()` са WAL вођењем дневника                                                                                                                                  |
| `db/migrations/`          | Верзионисане SQL датотеке (идемпотентне, трансакционе). `073_memory_vec.sql` додаје `memory_vec_meta` + колону `needs_reindex` (план 21).                                                       |
| `db/playgroundPresets.ts` | CRUD модул за унапред подешене конфигурације Playground Studio-а (`listPlaygroundPresets`, `getPlaygroundPreset`, `createPlaygroundPreset`, `updatePlaygroundPreset`, `deletePlaygroundPreset`) |
| `db/memoryVec.ts`         | CRUD за `memory_vec_meta` (active_dim, embedding_signature, last_reset_at, vec_loaded) + `markMemoryNeedsReindex`, `getMemoryReindexQueue` итд. (план 21)                                       |
| `db/<domain>.ts`          | Један модул по домену: providers, combos, apiKeys, users, sessions, usage, audit*log, webhooks, skills, memory_entries, cloud_agent_tasks, evals*\*, reasoning_cache итд.                       |

### `src/domain/`

| Модул                  | Намена                                                        |
| ---------------------- | ------------------------------------------------------------- |
| `policy.ts`            | Механизам политика                                            |
| `fallbackPolicy.ts`    | Стабло одлучивања за резервни избор                           |
| `costRules.ts`         | Правила израчунавања трошкова                                 |
| `lockoutPolicy.ts`     | Политика блокирања модела/везе                                |
| `tagRouter.ts`         | Усмеравање засновано на ознакама                              |
| `comboResolver.ts`     | Разрешавање комбинација (користи га механизам за комбинације) |
| `modelAvailability.ts` | Провера доступности по моделу                                 |
| `assessment/`          | Процена модела (фаза 1 документа RFC-AUTO-ASSESSMENT)         |

### `src/server/`

| Модул    | Намена                                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------- |
| `authz/` | Ток ауторизације: `classify` → `policies` → `enforce` — погледајте `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS конфигурација                                                                                    |
| `auth/`  | Посреднички софтвер за сесије                                                                         |

### `src/shared/`

| Модул                            | Намена                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------ |
| `constants/providers.ts`         | **355 провајдера** са Zod валидацијом (извор истине)                           |
| `constants/cliTools.ts`          | Регистар спољних CLI алата                                                     |
| `constants/routingStrategies.ts` | **19 стратегија рутирања** са приоритетима                                     |
| `constants/publicApiRoutes.ts`   | Руте које захтевају Bearer аутентификацију (уместо управљачке аутентификације) |
| `constants/upstreamHeaders.ts`   | Листа забрањених заглавља за upstream захтеве                                  |
| `validation/schemas.ts`          | ~80 Zod шема (јединствени извор истине за API уговоре)                         |
| `validation/helpers.ts`          | Помоћне функције за Zod валидацију (`validateBody` итд.)                       |
| `types/`                         | Дељени TS типови                                                               |
| `contracts/`                     | Јавни API уговори (користи их `files:` у `package.json`)                       |
| `utils/circuitBreaker.ts`        | Заштитни прекидач провајдера (видети `docs/architecture/RESILIENCE_GUIDE.md`)  |
| `utils/apiAuth.ts`               | Валидација API кључа, провера опсега                                           |
| `utils/fetchTimeout.ts`          | Омотачи за временско ограничење/прекид upstream fetch захтева                  |
| `utils/releaseNotes.ts`          | Парсер затворених v2/legacy обавештења, локализација и одбацивање по ID-у      |

---

## `open-sse/` — Радни простор механизма за стримовање

Засебан npm радни простор (`@omniroute/open-sse`). Управља обрадом захтева и извршавањем добављача.

```
open-sse/
├── handlers/            # 16 датотека (12 руковалаца + 4 помоћна модула): chatCore, responsesHandler, embeddings, audio, image, video, music, rerank, moderations, search, итд.
├── executors/           # 67 извршилаца специфичних за добављаче (проширују BaseExecutor)
├── translator/          # Конвертори формата (9 за захтеве, 9 за одговоре, 9 помоћних)
├── transformer/         # Responses API ↔ Chat Completions (TransformStream)
├── services/            # ~80+ сервисних модула (combo, accountFallback, autoCombo, reasoningCache, claude code/chatgpt stealth, modelDeprecation, taskAwareRouter, workflowFSM, итд.)
├── mcp-server/          # MCP сервер (110 алата, 3 транспорта, 33 опсега)
├── config/              # Регистри добављача/модела, конфигурација заглавља, алијаси модела
├── utils/               # TLS клијент, proxy fetch/dispatcher, мрежни помоћни модули
├── index.ts             # Улазна тачка радног простора
├── package.json         # Манифест радног простора
├── tsconfig.json        # TS конфигурација радног простора
└── types.d.ts           # Декларације типова радног простора
```

### `open-sse/mcp-server/`

| Путања                      | Намена                                                                           |
| --------------------------- | -------------------------------------------------------------------------------- |
| `server.ts`                 | Животни циклус MCP сервера (stdio + HTTP транспорти)                             |
| `httpTransport.ts`          | HTTP Streamable + SSE транспорти (`/api/mcp/sse`, `/api/mcp/stream`)             |
| `audit.ts`                  | Евидентирање ревизије у табелу `mcp_tool_audit`                                  |
| `scopeEnforcement.ts`       | Валидација опсега за сваки алат                                                  |
| `runtimeHeartbeat.ts`       | Сигнал стања у `DATA_DIR/runtime/mcp-heartbeat.json`                             |
| `descriptionCompressor.ts`  | Компримује метаподатке описа алата ради уштеде контекста                         |
| `schemas/tools.ts`          | 36 дефиниција основних алата + опсези                                            |
| `tools/advancedTools.ts`    | Имплементације напредних алата                                                   |
| `tools/memoryTools.ts`      | 3 алата за меморију (претрага/додавање/брисање)                                  |
| `tools/skillTools.ts`       | 4 алата за вештине (листа/омогућавање/извршавање/извршења)                       |
| `tools/compressionTools.ts` | 5 алата за компресију                                                            |
| `README.md`                 | Интерни README MCP сервера (унакрсно повезан из `docs/frameworks/MCP-SERVER.md`) |

---

## `electron/` — Омотач за десктоп

| Датотека         | Намена                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| `main.js`        | Главни Electron процес (BrowserWindow, уграђени Next.js сервер, системска палета, аутоматско ажурирање) |
| `preload.js`     | IPC мост (contextBridge → `window.omniroute`)                                                           |
| `package.json`   | Конфигурација за electron-builder + зависности Electron 41 + electron-builder 26.10                     |
| `assets/`        | Иконе апликације (Windows .ico, macOS .icns, Linux .png)                                                |
| `dist-electron/` | Излаз изградње (игнорише га git)                                                                        |
| `types.d.ts`     | Декларације типова за мост рендерера                                                                    |
| `README.md`      | Интерни Electron README (погледајте и `docs/guides/ELECTRON_GUIDE.md`)                                  |

---

## `bin/` — CLI

| Датотека                                                                                                    | Намена                                                                                                                                |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | Главна улазна тачка CLI-ја — `omniroute serve`, `omniroute setup`, `omniroute doctor`, `omniroute providers`, `omniroute combos` итд. |
| `reset-password.mjs`                                                                                        | Самостални CLI за ресетовање лозинке                                                                                                  |
| `cli/commands/setup.mjs`                                                                                    | Интерактивни + неинтерактивни чаробњак за подешавање                                                                                  |
| `cli/commands/doctor.mjs`                                                                                   | Дијагностика стања система (8+ провера)                                                                                               |
| `cli/commands/providers.mjs`                                                                                | Листа/тестирање/валидација провајдера                                                                                                 |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | Помоћни CLI модули                                                                                                                    |
| `cli/tray/tray.ts`                                                                                          | Интеграција са системском палетом (више платформи: NotifyIcon на Windows-у, systray2 на macOS-у/Linux-у)                              |
| `cli/tray/tray.ps1`                                                                                         | PowerShell позадински систем за NotifyIcon (Windows, без нових бинарних датотека)                                                     |
| `cli/tray/autostart.ts`                                                                                     | Аутоматско покретање на више платформи (LaunchAgent / .desktop / регистар)                                                            |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | Ланац разрешавања SQLite управљачког програма у 5 корака (уграђени → извршно окружење → накнадна инсталација → node:sqlite → sql.js)  |
| `cli/runtime/magicBytes.mjs`                                                                                | Валидација бинарних магичних бајтова (ELF / Mach-O / Mach-O fat / PE)                                                                 |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — унапред разрешава управљачке програме током postinstall-а / првог покретања                                      |
| `nodeRuntimeSupport.mjs`                                                                                    | Валидација подржане верзије Node.js-а приликом инсталације                                                                            |

---

## `skills/` — Јавне вештине агената

| Датотека                     | Намена                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 10 манифеста вештина за спољне AI агенте (Claude Desktop, ChatGPT, Cursor, Cline) |

---

## `scripts/` — Скрипте за изградњу и проверу

| Скрипта                             | Намена                                                                                               |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `run-next.mjs`                      | Покретач за развој/покретање са учитавањем променљивих окружења                                      |
| `build-next-isolated.mjs`           | Самостална изградња (самостални Next.js 16)                                                          |
| `prepublish.ts`                     | Припрема пакета пре `npm pack`                                                                       |
| `postinstall.mjs`                   | Аутоматско прављење `.env` из `.env.example` при првој инсталацији                                   |
| `sync-env.mjs`                      | Поновна синхронизација кључева у `.env` са `.env.example`                                            |
| `check-cycles.mjs`                  | Откривање кружних зависности                                                                         |
| `check-route-validation.mjs`        | Провера да све API руте имају Zod валидацију                                                         |
| `check-t11-any-budget.mjs`          | Наметање експлицитног ограничења за `any` по датотеци                                                |
| `check-docs-sync.mjs`               | Провера синхронизације верзије документације (постојећа провера пре комитовања)                      |
| **`check-env-doc-sync.mjs`**        | НОВО: унакрсна провера променљивих окружења у коду, `.env.example` и `ENVIRONMENT.md`                |
| **`check-docs-counts-sync.mjs`**    | НОВО: провера да се бројеви (извршиоци, стратегије, OAuth, A2A вештине) подударају са документацијом |
| **`check-deprecated-versions.mjs`** | НОВО: означавање застарелих верзија/датума у документацији                                           |
| `check-supported-node-runtime.ts`   | Провера да ли је тренутна верзија Node-а подржана                                                    |
| `check-pr-test-policy.mjs`          | Спровођење правила „тестови су обавезни“ за измене продукционог кода                                 |
| **`gen-provider-reference.ts`**     | НОВО: аутоматско генерисање `docs/reference/PROVIDER_REFERENCE.md` из каталога                       |
| `i18n/generate-multilang.mjs`       | Превођење UI ниски и документације помоћу Google Translate-а                                         |
| `i18n_autotranslate.py`             | Процес превођења документације заснован на LLM-у                                                     |
| `validate_translation.py`           | Провера превода за сваки локалитет                                                                   |
| `check_translations.py`             | Провера i18n кључева на страни кода                                                                  |
| `run-playwright-tests.mjs`          | Покретач Playwright E2E тестова                                                                      |
| `run-protocol-clients-tests.mjs`    | Покретач MCP/A2A E2E тестова                                                                         |
| `run-ecosystem-tests.mjs`           | Тестови екосистема (интеграције добављача)                                                           |
| `test-report-summary.mjs`           | Генерисање markdown сажетка покривености                                                             |
| `smoke-electron-packaged.mjs`       | Основно тестирање запаковане Electron изградње                                                       |
| `native-binary-compat.mjs`          | Провера да ли се изворне зависности (`better-sqlite3`) подударају са Electron-овим Node-ом           |
| `validate-pack-artifact.ts`         | Провера излаза команде npm pack                                                                      |
| `responses-ws-proxy.mjs`            | WebSocket мост за Codex Responses API                                                                |
| `v1-ws-bridge.mjs`                  | WebSocket мост за крајњу тачку `/api/v1/ws`                                                          |
| `standalone-server-ws.mjs`          | Покретач самосталног WS сервера                                                                      |
| `system-info.mjs`                   | Приказ информација о систему/извршном окружењу за потребе подршке                                    |
| `healthcheck.mjs`                   | Једнократна провера исправности (користи је Docker HEALTHCHECK)                                      |
| `uninstall.mjs`                     | Скрипта за чисту деинсталацију                                                                       |

---

## `docs/` — Јавна документација (7 коренских датотека + 17 поддиректоријума)

### Водичи највишег нивоа

| Документ                    | Намена                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `ARCHITECTURE.md`           | Архитектура високог нивоа, мапа подсистема, површина контролне табле                                   |
| `CODEBASE_DOCUMENTATION.md` | Инжењерска референца: директоријуми, модули, конвенције                                                |
| `FEATURES.md`               | Матрица функционалности са најважнијим новинама у v3.8                                                 |
| `USER_GUIDE.md`             | Приручник за крајње кориснике (подешавање, модели, комбинације, CLI алати, звук итд.)                  |
| `API_REFERENCE.md`          | Референца API крајњих тачака са моделом аутентификације                                                |
| `openapi.yaml`              | OpenAPI 3.0 спецификација (121 путања)                                                                 |
| `SETUP_GUIDE.md`            | Начини инсталације (npm, npx, Docker, Electron, Termux, изворни кôд)                                   |
| `ENVIRONMENT.md`            | Све променљиве окружења (~800 документованих, ~3.050 редова у `.env.example`)                          |
| `TROUBLESHOOTING.md`        | Уобичајене грешке + познати проблеми у v3.8.0                                                          |
| `RELEASE_CHECKLIST.md`      | Комплетан ток објављивања (вештине, husky, конвенционални комитови, примена)                           |
| `COVERAGE_PLAN.md`          | Циљеви покривености и тренутно стање                                                                   |
| `FREE_TIERS.md`             | Одабрани провајдери бесплатних пакета (48+ бесплатних + 11 OAuth)                                      |
| `CLI-TOOLS.md`              | Интеграције спољних CLI алата + интерни OmniRoute CLI                                                  |
| `I18N.md`                   | i18n архитектура, додавање језика, 42 локализације                                                     |
| `UNINSTALL.md`              | Кораци за чисту деинсталацију                                                                          |
| `PROVIDER_REFERENCE.md`     | **Аутоматски генерисан** каталог 355 провајдера (поновно генерисање: `npm run gen:provider-reference`) |

### Детаљни прегледи подсистема

| Документ                                        | Намена                                                                              |
| ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| `MCP-SERVER.md`                                 | MCP сервер: 110 алата, 3 транспорта, 33 опсега, REST крајње тачке                   |
| `A2A-SERVER.md`                                 | A2A v0.3: JSON-RPC, 6 вештина, REST помоћне функције, картица агента                |
| `AGENT_PROTOCOLS_GUIDE.md`                      | Обједињени водич: A2A наспрам ACP наспрам Cloud Agents                              |
| `CLOUD_AGENT.md`                                | Оркестрација Codex Cloud / Devin / Jules                                            |
| `SKILLS.md`                                     | Оквир за вештине (уграђене + тржиште + SkillsSH + sandbox)                          |
| `RADAR.md`                                      | Radar преклопни каталог бесплатних модела (`RADAR_ENABLED`, подразумевано искључен) |
| `MEMORY.md`                                     | Систем меморије (SQLite FTS5 + Qdrant)                                              |
| `EVALS.md`                                      | Оквир за евалуацију (пакети, извршавања, критеријуми)                               |
| `GUARDRAILS.md`                                 | Маскирање личних података, убацивање упита, мост за вид                             |
| `COMPLIANCE.md`                                 | Дневник ревизије, задржавање, изузимање преко noLog                                 |
| `WEBHOOKS.md`                                   | Испорука webhook-ова потписаних HMAC-ом                                             |
| `REASONING_REPLAY.md`                           | Хибридни меморијски/SQLite кеш за `reasoning_content`                               |
| `AUTHZ_GUIDE.md`                                | Ток ауторизације (`classify` → `policies` → `enforce`)                              |
| `RESILIENCE_GUIDE.md`                           | Прекидач струјног кола + период хлађења + закључавање модела                        |
| `docs/security/STEALTH_GUIDE.md` (само у git-у) | TLS идентификација отиском (JA3/JA4), Claude Code CCH, MITM сертификат              |
| `AUTO-COMBO.md`                                 | Auto Combo механизам (оцењивање по 16 фактора, 6 пакета режима, виртуелна фабрика)  |

### Компресија

| Документ                        | Намена                                   |
| ------------------------------- | ---------------------------------------- |
| `COMPRESSION_GUIDE.md`          | Преглед режима компресије + план развоја |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK механизми, уговор регистра |
| `COMPRESSION_RULES_FORMAT.md`   | JSON шема Caveman пакета правила         |
| `COMPRESSION_LANGUAGE_PACKS.md` | Инвентар пакета правила по језицима      |
| `RTK_COMPRESSION.md`            | RTK декларативни ток обраде (49 филтера) |

### Примена

| Документ                     | Намена                                                            |
| ---------------------------- | ----------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker израда, профили (base/cli/host/cliproxyapi), Redis sidecar |
| `VM_DEPLOYMENT_GUIDE.md`     | Генеричка VM/VPS примена (Ubuntu/Debian + nginx + systemd)        |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io примена (тренутно само на кинеском)                        |
| `TERMUX_GUIDE.md`            | Android без графичког интерфејса преко Termux-а                   |
| `PWA_GUIDE.md`               | Инсталација прогресивне веб-апликације + service worker           |
| `ELECTRON_GUIDE.md`          | Израда + потписивање + дистрибуција десктоп апликације            |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                            |
| `PROXY_GUIDE.md`             | Четворостепени излазни proxy + 1proxy тржиште                     |

### Поддиректоријуми

| Потдиректоријум       | Намена                                                                                                                                                                                                                                         |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | Локализовани преводи документације (41 локалитет)                                                                                                                                                                                              |
| `docs/screenshots/`   | Сликовни ресурси за водиче                                                                                                                                                                                                                     |
| `_tasks/superpowers/` | Планови/спецификације из superpowers (`writing-plans`/`brainstorming`) + истраживање — изоловани репозиторијум са засебним верзионисањем, који главно стабло игнорише путем git-а. Погледајте CLAUDE.md → „Артефакти планирања и истраживања“. |

---

## `tests/` — Скупови тестова

| Потфасцикла                          | Тип                                          | Покретач                                         |
| ------------------------------------ | -------------------------------------------- | ------------------------------------------------ |
| `tests/unit/`                        | Јединични тестови (~4.800 датотека, најбржи) | Уграђени Node покретач тестова                   |
| `tests/integration/`                 | Вишемодулски + DB интеграциони тестови       | Уграђени Node покретач тестова (конкурентност 1) |
| `tests/e2e/`                         | E2E корисничког интерфејса + тока рада       | Playwright                                       |
| `tests/e2e/protocol-clients.test.ts` | E2E са стварним MCP + A2A клијентима         | Прилагођени клијенти протокола                   |
| `tests/e2e/ecosystem.test.ts`        | Интеграција добављача (са мрежним приступом) | Уграђени Node покретач тестова                   |

---

## `public/` — Статички ресурси

| Путања              | Намена                                                             |
| ------------------- | ------------------------------------------------------------------ |
| `public/` (корен)   | Фавикони, robots.txt, манифест, сервисни радник, маркетиншке слике |
| `public/providers/` | PNG/SVG логотипи добављача (користе се на контролној табли)        |

---

## `config/` — Статичке конфигурације + стање контроле квалитета

Испоручени шаблони конфигурације и верзионисане референтне вредности контроле квалитета
(премештени овде из корена репозиторијума у v3.8.26 како би корен остао прегледан).

| Путања                                        | Намена                                                                               |
| --------------------------------------------- | ------------------------------------------------------------------------------------ |
| `config/i18n.json`                            | Листа локалитета + метаподаци (канонски извор за број од 42 локалитета)              |
| `config/i18n-schema.json`                     | JSON шема која валидира `i18n.json`                                                  |
| `config/payloadRules.json`                    | Правила за пречишћавање узводних корисних садржаја                                   |
| `config/quality/quality-baseline.json`        | Референтна вредност вишеметричке рачне (`scripts/quality/check-quality-ratchet.mjs`) |
| `config/quality/complexity-baseline.json`     | Замрзнута референтна вредност ESLint сложености (`check-complexity.mjs`)             |
| `config/quality/duplication-baseline.json`    | Замрзнута референтна вредност jscpd дуплирања (`check-duplication.mjs`)              |
| `config/quality/file-size-baseline.json`      | Замрзнута референтна величина по датотеци (`check-file-size.mjs`)                    |
| `config/quality/test-discovery-baseline.json` | Замрзнута референтна вредност тестова без повезаности (`check-test-discovery.mjs`)   |
| `config/quality/dependency-allowlist.json`    | Листа дозвољених зависности (`check-deps.mjs`)                                       |
| `config/quality/.license-allowlist.json`      | Листа дозвољених SPDX лиценци (`check-licenses.mjs`)                                 |
| `config/quality/quality-metrics.json`         | Привремено прикупљене метрике (генерише `collect-metrics.mjs`; **игнорише их git**)  |

---

## `.github/` — GitHub интеграција

| Путања                             | Намена                                                                         |
| ---------------------------------- | ------------------------------------------------------------------------------ |
| `.github/workflows/`               | GitHub Actions CI/CD токови рада (линтовање, тестирање, покривеност, издавање) |
| `.github/ISSUE_TEMPLATE/`          | Шаблони за пријаве грешака/захтеве за функционалности                          |
| `.github/pull_request_template.md` | PR шаблон                                                                      |
| `.github/dependabot.yml`           | Конфигурација ажурирања зависности                                             |

---

## `.husky/` — Git куке

| Датотека     | Намена                                                                        |
| ------------ | ----------------------------------------------------------------------------- |
| `pre-commit` | Покреће `lint-staged + check-docs-sync + check:any-budget:t11`                |
| `pre-push`   | Тренутно је онемогућено (коментарисано). Ручно покрените `npm run test:unit`. |
| `_/`         | Husky интерни садржај                                                         |

---

## `.claude/` — Claude Code косе команде

| Датотека                                            | Намена                                                           |
| --------------------------------------------------- | ---------------------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — увећање верзије + аутоматски дневник измена |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — комплетан ток рада за издавање          |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | Примена на VPS                                                   |
| `commands/capture-release-evidences-cc.md`          | Снимање нових функционалности у прегледачу као WebP              |
| `commands/review-{prs,discussions}-cc.md`           | Тријажа GitHub PR-ова/дискусија                                  |
| `commands/{review-issues,implement-features}-cc.md` | Токови рада за GitHub пријаве                                    |
| `settings.local.json`                               | Claude Code подешавања по пројекту                               |

---

## `.agents/` — Генерички токови рада агената (Codex / Cursor / итд.)

| Путања                   | Намена                                                 |
| ------------------------ | ------------------------------------------------------ |
| `workflows/*-ag.md`      | 11 дефиниција токова рада (копија `.claude/commands/`) |
| `skills/<name>/SKILL.md` | 9 дефиниција вештина са Codex напоменама за извршавање |

> **Напомена:** Токови рада и команде су тренутно идентични бајт по бајт. Ако је `.agents/` намењен другом окружењу за извршавање агената (Codex), варијанте морају смислено да се разликују.

---

## `_ideia/`, `_mono_repo/`, `_references/`, `_tasks/` — Ван стабла

Ови директоријуми са доњом цртом као префиксом садрже материјал који се не испоручује:

- **`_ideia/`** — белешке о дизајну (категорије defer / notfit / viable)
- **`_mono_repo/`** — историјски потпројекти (omnirouteCloud, omnirouteSite, vscode-extension)
- **`_references/`** — клонови повезаних OSS пројеката само за читање (LiteLLM, 9router, ClawRouter, CLIProxyAPI, modelrelay, new-api, итд.) за унакрсно референцирање током развоја
- **`_tasks/`** — датотеке за праћење задатака по издању (неформално)

Није укључено у излаз команде `npm pack`. Погледајте `.npmignore`.

---

## Генерисано / игнорисано у Git-у

| Путања                 | Намена                              |
| ---------------------- | ----------------------------------- |
| `node_modules/`        | npm зависности                      |
| `.next/`               | Излаз Next.js процеса изградње      |
| `coverage/`            | c8 извештаји о покривености         |
| `logs/`                | Дневници извршавања                 |
| `package/`             | Привремени директоријум за npm pack |
| `.playwright-mcp/`     | Playwright MCP тестни артефакти     |
| `.issues/`             | Локални кеш проблема                |
| `tsconfig.tsbuildinfo` | TS инкрементални кеш                |

---

## Савети за навигацију

- **Нови сарадник?** Прочитајте `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`.
- **Додајете добављача?** Пратите `docs/architecture/ARCHITECTURE.md § Додавање новог добављача` и упоредите са `docs/reference/PROVIDER_REFERENCE.md`.
- **Додајете руту?** `docs/architecture/ARCHITECTURE.md § Додавање нове API руте` + `src/shared/validation/schemas.ts`.
- **Додајете MCP алатку?** `docs/frameworks/MCP-SERVER.md § Додавање алатке`.
- **Додајете A2A вештину?** `docs/frameworks/A2A-SERVER.md § Додавање нове вештине`.
- **Покрећете локално?** `docs/guides/SETUP_GUIDE.md`.
- **Примењујете?** `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`.
- **Објављујете издање?** `docs/ops/RELEASE_CHECKLIST.md` (и Claude Code вештина `/generate-release-cc`).
