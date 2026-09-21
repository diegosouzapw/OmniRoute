# Repository Map (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/REPOSITORY_MAP.md) · 🇪🇹 [am](../../../am/docs/architecture/REPOSITORY_MAP.md) · 🇸🇦 [ar](../../../ar/docs/architecture/REPOSITORY_MAP.md) · 🇦🇿 [az](../../../az/docs/architecture/REPOSITORY_MAP.md) · 🇧🇬 [bg](../../../bg/docs/architecture/REPOSITORY_MAP.md) · 🇧🇩 [bn](../../../bn/docs/architecture/REPOSITORY_MAP.md) · 🇨🇿 [cs](../../../cs/docs/architecture/REPOSITORY_MAP.md) · 🇩🇰 [da](../../../da/docs/architecture/REPOSITORY_MAP.md) · 🇩🇪 [de](../../../de/docs/architecture/REPOSITORY_MAP.md) · 🇬🇷 [el](../../../el/docs/architecture/REPOSITORY_MAP.md) · 🇪🇸 [es](../../../es/docs/architecture/REPOSITORY_MAP.md) · 🇪🇪 [et](../../../et/docs/architecture/REPOSITORY_MAP.md) · 🇮🇷 [fa](../../../fa/docs/architecture/REPOSITORY_MAP.md) · 🇫🇮 [fi](../../../fi/docs/architecture/REPOSITORY_MAP.md) · 🇫🇷 [fr](../../../fr/docs/architecture/REPOSITORY_MAP.md) · 🇮🇪 [ga](../../../ga/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [gu](../../../gu/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ha](../../../ha/docs/architecture/REPOSITORY_MAP.md) · 🇮🇱 [he](../../../he/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [hi](../../../hi/docs/architecture/REPOSITORY_MAP.md) · 🇭🇷 [hr](../../../hr/docs/architecture/REPOSITORY_MAP.md) · 🇭🇺 [hu](../../../hu/docs/architecture/REPOSITORY_MAP.md) · 🇦🇲 [hy](../../../hy/docs/architecture/REPOSITORY_MAP.md) · 🇮🇩 [id](../../../id/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [ig](../../../ig/docs/architecture/REPOSITORY_MAP.md) · 🇮🇹 [it](../../../it/docs/architecture/REPOSITORY_MAP.md) · 🇯🇵 [ja](../../../ja/docs/architecture/REPOSITORY_MAP.md) · 🇬🇪 [ka](../../../ka/docs/architecture/REPOSITORY_MAP.md) · 🇰🇭 [km](../../../km/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [kn](../../../kn/docs/architecture/REPOSITORY_MAP.md) · 🇰🇷 [ko](../../../ko/docs/architecture/REPOSITORY_MAP.md) · 🇱🇹 [lt](../../../lt/docs/architecture/REPOSITORY_MAP.md) · 🇱🇻 [lv](../../../lv/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ml](../../../ml/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [mr](../../../mr/docs/architecture/REPOSITORY_MAP.md) · 🇲🇾 [ms](../../../ms/docs/architecture/REPOSITORY_MAP.md) · 🇲🇹 [mt](../../../mt/docs/architecture/REPOSITORY_MAP.md) · 🇲🇲 [my](../../../my/docs/architecture/REPOSITORY_MAP.md) · 🇳🇵 [ne](../../../ne/docs/architecture/REPOSITORY_MAP.md) · 🇳🇱 [nl](../../../nl/docs/architecture/REPOSITORY_MAP.md) · 🇳🇴 [no](../../../no/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [or](../../../or/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [pa](../../../pa/docs/architecture/REPOSITORY_MAP.md) · 🇵🇭 [phi](../../../phi/docs/architecture/REPOSITORY_MAP.md) · 🇵🇱 [pl](../../../pl/docs/architecture/REPOSITORY_MAP.md) · 🇵🇹 [pt](../../../pt/docs/architecture/REPOSITORY_MAP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/REPOSITORY_MAP.md) · 🇷🇴 [ro](../../../ro/docs/architecture/REPOSITORY_MAP.md) · 🇷🇺 [ru](../../../ru/docs/architecture/REPOSITORY_MAP.md) · 🇱🇰 [si](../../../si/docs/architecture/REPOSITORY_MAP.md) · 🇸🇰 [sk](../../../sk/docs/architecture/REPOSITORY_MAP.md) · 🇸🇮 [sl](../../../sl/docs/architecture/REPOSITORY_MAP.md) · 🇷🇸 [sr](../../../sr/docs/architecture/REPOSITORY_MAP.md) · 🇸🇪 [sv](../../../sv/docs/architecture/REPOSITORY_MAP.md) · 🇰🇪 [sw](../../../sw/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [ta](../../../ta/docs/architecture/REPOSITORY_MAP.md) · 🇮🇳 [te](../../../te/docs/architecture/REPOSITORY_MAP.md) · 🇹🇭 [th](../../../th/docs/architecture/REPOSITORY_MAP.md) · 🇹🇷 [tr](../../../tr/docs/architecture/REPOSITORY_MAP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/REPOSITORY_MAP.md) · 🇵🇰 [ur](../../../ur/docs/architecture/REPOSITORY_MAP.md) · 🇺🇿 [uz](../../../uz/docs/architecture/REPOSITORY_MAP.md) · 🇻🇳 [vi](../../../vi/docs/architecture/REPOSITORY_MAP.md) · 🇳🇬 [yo](../../../yo/docs/architecture/REPOSITORY_MAP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/REPOSITORY_MAP.md)

---

> **每个目录和根文件的一行说明。**
> 最后更新：2026-06-28 — OmniRoute v3.8.40
>
> 使用此目录图快速浏览代码库。如需深入了解，请访问对应的专门文档链接。

## 顶层目录树

```
OmniRoute/
├── src/                  # Next.js 16 应用程序（UI + API 路由 + 库 + 领域层 + 服务端）
├── open-sse/             # 流式传输引擎工作区（处理器、执行器、转换器、MCP 服务器）
├── electron/             # 桌面封装程序（Electron 41 + electron-builder 26.10）
├── bin/                  # CLI 入口点和命令处理器
├── scripts/              # 构建、检查、同步和一次性脚本
├── docs/                 # 公共文档（您当前所在位置）
├── tests/                # 所有测试套件（单元、集成、端到端、协议客户端）
├── public/               # Next.js 静态资源、PWA 清单、Service Worker、图标
├── config/               # 静态配置 + 质量门禁状态（i18n、payloadRules、quality/）
├── images/               # 营销材料 / README 图像资源
├── @omniroute/           # 可发布的配套包（opencode-plugin、opencode-provider）
├── skills/               # CLI/智能体技能包（cli-* + omni-* + config-codex-cli）
├── examples/             # 示例插件 + omniroute-cmd-hello 入门模板
├── contrib/              # 社区贡献（podman/）
├── .source/              # Fumadocs 源配置（source.config.mjs + server/browser/dynamic）
├── .github/              # GitHub Actions 工作流 + Issue 模板 + PR 模板
├── .husky/               # Git 钩子（pre-commit、pre-push）
├── .claude/              # Claude Code 斜杠命令（项目作用域）
├── .agents/              # Codex / 通用智能体工作流 + 技能（.claude/ 的镜像）
├── .vscode/              # VS Code 工作区设置
├── _ideia/               # 规划笔记（非正式；不随产品发布）
├── _mono_repo/           # 历史子项目（cloud、site、vscode-extension）
├── _references/          # 来自相关开源项目的只读参考克隆
├── _tasks/               # 各版本的任务跟踪文件（非正式）
├── .build/ .worktrees/ dist/   # 本地构建 / git-worktree / 构建输出暂存目录（已被 git 忽略）
├── .issues/              # 本地 Issue 缓存（已被 git 忽略）
├── .playwright-mcp/      # Playwright MCP 测试产物
├── coverage/             # c8 覆盖率输出（已被 git 忽略）
├── logs/                 # 运行时日志（已被 git 忽略）
├── node_modules/         # 依赖项（已被 git 忽略）
├── package/              # npm pack 暂存区域（构建产物）
├── .next/                # Next.js 构建输出（已被 git 忽略）
└── （根文件 — 见下文）
```

---

## 根文件

| 文件                                        | 用途                                                                                  |
| ------------------------------------------- | ------------------------------------------------------------------------------------- |
| **README.md**                               | 营销落地页 + 快速入门 + 功能矩阵（另请参阅 `llm.txt`）                                |
| **CHANGELOG.md**                            | 各版本变更日志（由 `/version-bump-cc` 技能自动生成）                                  |
| **LICENSE**                                 | MIT 许可证文本                                                                        |
| **CLAUDE.md**                               | Claude Code 智能体的项目规则（硬性规则、约定、场景）                                  |
| **AGENTS.md**                               | 与 CLAUDE.md 相同，但适用于非 Claude AI 智能体（Codex、Cursor 等）                    |
| **GEMINI.md**                               | Gemini 系智能体的精简规则（CLAUDE.md 的子集）                                         |
| **CONTRIBUTING.md**                         | 贡献者指南：设置、约定式提交、测试、PR 流程                                           |
| **SECURITY.md**                             | 漏洞报告策略、受支持版本、威胁模型                                                    |
| **CODE_OF_CONDUCT.md**                      | 贡献者公约——社区行为规范                                                              |
| **llm.txt**                                 | 针对 LLM 爬虫优化的纯文本落地页（面向 AI 助手的 SEO）                                 |
| **package.json**                            | npm 清单、脚本、依赖项、引擎、c8 覆盖率门禁                                           |
| **package-lock.json**                       | 锁定的依赖树                                                                          |
| **tsconfig.json**                           | 根 TypeScript 配置                                                                    |
| **tsconfig.typecheck-core.json**            | `src/` 核心代码的类型检查配置                                                         |
| **tsconfig.typecheck-noimplicit-core.json** | 严格（`noImplicitAny`）类型检查                                                       |
| **tsconfig.tsbuildinfo**                    | TS 增量构建缓存（已被 git 忽略）                                                      |
| **next.config.mjs**                         | Next.js 16 构建配置（独立输出）                                                       |
| **next-env.d.ts**                           | Next.js 自动生成的环境类型                                                            |
| **eslint.config.mjs**                       | ESLint 扁平配置（按项目区域划分规则）                                                 |
| **prettier.config.mjs**                     | Prettier 格式化规则                                                                   |
| **postcss.config.mjs**                      | Tailwind/CSS 流水线的 PostCSS 配置                                                    |
| **playwright.config.ts**                    | Playwright E2E 测试配置                                                               |
| **vitest.config.ts**                        | Vitest 配置（默认测试套件）                                                           |
| **vitest.mcp.config.ts**                    | MCP 服务器 / autoCombo / 缓存测试套件的 Vitest 配置                                   |
| **sonar-project.properties**                | SonarQube/SonarCloud 配置（代码质量）                                                 |
| **Dockerfile**                              | 多阶段 Docker 构建（builder → runner-base → runner-cli）                              |
| **docker-compose.yml**                      | 包含 4 个配置文件（base、cli、host、cliproxyapi）和 redis sidecar 的开发 compose 配置 |
| **docker-compose.prod.yml**                 | 生产环境 compose 配置（端口 20130、redis、命名卷）                                    |
| **.dockerignore**                           | 从 Docker 上下文中排除的文件                                                          |
| **fly.toml**                                | Fly.io 部署配置（区域 `sin`、端口 20128、/data 卷）                                   |
| **.env.example**                            | 环境文件模板（首次安装时自动复制到 `.env`）                                           |
| **.gitignore**                              | Git 忽略模式                                                                          |
| **.npmignore**                              | npm 发布排除列表                                                                      |
| **.npmrc**                                  | npm 配置（注册表、锁文件策略）                                                        |
| **.node-version**                           | Node 版本锁定（由兼容 nvm 的工具使用）                                                |
| **.nvmrc**                                  | nvm 的 Node 版本锁定                                                                  |
| **eslint.complexity.config.mjs**            | 复杂度棘轮的 ESLint 配置（`scripts/check/check-complexity.mjs --config`）             |
| **eslint.sonarjs.config.mjs**               | SonarJS 规则的 ESLint 配置（认知复杂度 / 重复）                                       |
| **source.config.ts**                        | Fumadocs `defineDocs` 源配置（为 `.source/` 提供数据）                                |
| **knip.json**                               | Knip 配置——未使用的文件/导出/依赖项（用于死代码门禁）                                 |
| **stryker.conf.json**                       | Stryker 变异测试配置                                                                  |
| **.size-limit.json**                        | size-limit 打包体积预算配置                                                           |
| **promptfooconfig.yaml**                    | promptfoo 评估配置                                                                    |
| **.gitleaks.toml**                          | gitleaks 密钥扫描规则集                                                               |
| **.zizmor.yml**                             | zizmor GitHub Actions 安全检查配置                                                    |
| **socket.yml**                              | Socket.dev 软件供应链配置                                                             |
| **news.json**                               | 本地化的 v2 公告源；Radar 发布项默认处于未启用状态                                    |
| **flake.nix** / **flake.lock**              | Nix 开发 shell 定义及锁定文件                                                         |
| **.env**                                    | 本地密钥（已被 git 忽略——从 `.env.example` 生成）                                     |

> **已在 v3.8.26 中移出根目录（精简整理）：**
>
> - **→ `config/quality/`：** `quality-baseline.json`、`complexity-baseline.json`、`duplication-baseline.json`、`file-size-baseline.json`、`test-discovery-baseline.json`、`dependency-allowlist.json`、`.license-allowlist.json`，以及生成的 `quality-metrics.json`（已被 git 忽略）。请参阅 [`## config/`](#config--static-configs--quality-gate-state)。

---

## `src/` — Next.js 应用

```
src/
├── app/                 # App Router（页面 + API 路由 + 状态页面 + 落地页）
├── lib/                 # 核心库 / 领域模块（80 个子目录 + 约 70 个顶层文件）
├── domain/              # 纯领域逻辑（策略引擎、回退、成本、锁定、comboResolver、评估）
├── server/              # 仅限服务端的模块（授权管道、cors、身份验证中间件）— 客户端无法导入
├── shared/              # 在安全的情况下由服务端和客户端共享（常量、类型、验证、契约、工具）
├── i18n/                # next-intl 配置 + 各语言区域的消息 JSON（42 个语言区域）
├── middleware/          # Next.js 中间件（请求扩充、语言区域检测）
├── mitm/                # MITM 代理核心：证书生成/安装、处理程序、目标、检查器、掩码、直通
│   ├── handlers/        # 9 个扩展 MitmHandlerBase 的 IDE 代理处理程序类（antigravity、kiro、copilot、codex、cursor、zed、claudeCode、openCode、trae）
│   └── inspector/       # 流量捕获层：缓冲区（内存环形缓冲区）、sseMerger、conversationNormalizer、kindDetector、contextKey、httpProxyServer、systemProxyConfig
├── models/              # 模型适配器粘合层（旧版垫片）
├── scripts/             # 源代码树内的维护脚本（例如 backfillAggregation）
├── sse/                 # 旧版 SSE 处理程序/服务（chat.ts、chatHelpers.ts、services/auth.ts）
├── store/               # 旧版内存存储（正逐步迁移至 src/lib/db）
├── types/               # 共享 TS 类型文件
├── instrumentation.ts   # Next.js 遥测钩子（浏览器 + 边缘运行时）
├── instrumentation-node.ts  # 仅限 Node 的检测逻辑
└── proxy.ts             # HTTP 代理入口垫片
```

### `src/app/` — App Router（Next.js 16）

| 路径                                                                         | 用途                                                                                                                                                                                                                                                                                                                         |
| ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app/api/v1/`                                                                | 公共 OpenAI 兼容 API（约 25 个子路由：聊天、补全、嵌入、文件、批处理、音频、图像、视频、音乐、重排序、内容审核、搜索、ws、智能体、账户、提供者等）                                                                                                                                                                           |
| `app/api/v1beta/`                                                            | Gemini 风格的 API 端点                                                                                                                                                                                                                                                                                                       |
| `app/api/playground/`                                                        | Playground Studio 路由：`improve-prompt/`（POST — LLM 提示词改写器）、`presets/`（GET 列表 / POST 创建）、`presets/[id]/`（GET / PUT / DELETE）— 参见 `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                                                                 |
| `app/api/`（非 v1）                                                          | 管理/管理员路由（约 60 个目录：提供者、组合、设置、mcp、a2a、评估、记忆、技能、Webhook、合规、韧性、监控、隧道、CLI 工具等）                                                                                                                                                                                                 |
| `app/api/tools/agent-bridge/`                                                | AgentBridge REST API — 12 个路由（服务器控制、智能体状态/DNS/映射、绕过、证书、上游 CA）。LOCAL_ONLY + SPAWN_CAPABLE。参见 `docs/frameworks/AGENTBRIDGE.md §7`。                                                                                                                                                             |
| `app/api/tools/traffic-inspector/`                                           | Traffic Inspector REST + WS API — 16 个以上的路由（请求、会话、主机、捕获模式、导出、ws）。LOCAL_ONLY + SPAWN_CAPABLE。参见 `docs/frameworks/TRAFFIC_INSPECTOR.md §8`。                                                                                                                                                      |
| `app/a2a/`                                                                   | A2A JSON-RPC 2.0 入口点（`POST /a2a`）                                                                                                                                                                                                                                                                                       |
| `app/.well-known/agent.json/`                                                | A2A 智能体卡片（发现）                                                                                                                                                                                                                                                                                                       |
| `app/(dashboard)/dashboard/`                                                 | 仪表板 UI 页面（50 多个版块，约 118 个 page.tsx 文件：提供者、组合、设置、记忆、技能、Webhook、评估、审计、批处理、缓存、成本、健康状况、系统、活动等）                                                                                                                                                                      |
| `app/(dashboard)/dashboard/search-tools/`                                    | Search Tools Studio UI（3 个选项卡：搜索/抓取/比较 + SearchConceptCard + ProviderCatalog）— 参见 `docs/frameworks/SEARCH_TOOLS_STUDIO.md`                                                                                                                                                                                    |
| `app/(dashboard)/dashboard/memory/`                                          | Memory Studio（计划 21）：`page.tsx`（3 个选项卡的外壳）、`components/`（MemoryConceptCard、MemoryEngineStatus、EmbeddingSourceSelector、EditMemoryModal、RetrievePreview、QdrantConfigCard、RerankConfigCard）、`components/tabs/`（MemoriesTab、PlaygroundTab、EngineTab）、`hooks/`（useEngineStatus、useMemorySettings） |
| `app/(dashboard)/dashboard/tools/agent-bridge/`                              | AgentBridge 仪表板页面 — 服务器卡片、9 个智能体卡片、设置向导、模型映射、绕过列表。国际化支持 PT-BR + EN。参见 `docs/frameworks/AGENTBRIDGE.md`。                                                                                                                                                                            |
| `app/(dashboard)/dashboard/tools/traffic-inspector/`                         | Traffic Inspector 仪表板页面 — DevTools 分栏视图、7 个详情选项卡、4 个捕获模式开关、会话记录器、上下文着色。国际化支持 PT-BR + EN。参见 `docs/frameworks/TRAFFIC_INSPECTOR.md`。                                                                                                                                             |
| `app/(dashboard)/dashboard/activity/`                                        | 活动动态页面（B 组）：`page.tsx`（服务端）+ `ActivityFeedClient.tsx` + `components/{ActivityFeed,ActivityItem,DayHeader,EventTypeFilter}.tsx` — 参见 `docs/architecture/MONITORING_SECTIONS.md`                                                                                                                              |
| `app/(dashboard)/dashboard/costs/quota-share/`                               | 配额共享页面（B 组）：`QuotaSharePageClient.tsx` + `components/{PoolCard,DimensionBar,AllocationTable,BurnRateChart,QuotaConceptCard,CreatePoolModal,EditAllocationsModal}.tsx` + `hooks/{usePools,usePoolUsage,useLocalStoragePoolMigration}.ts`                                                                            |
| `app/(dashboard)/dashboard/costs/quota-share/plans/`                         | 提供者套餐配置页面（B 组）：`page.tsx` + `ProviderPlanConfigClient.tsx` — 按连接覆盖配额维度                                                                                                                                                                                                                                 |
| `app/docs/`                                                                  | 嵌入式文档查看器（渲染 `docs/*.md`）                                                                                                                                                                                                                                                                                         |
| `app/landing/`                                                               | 营销落地页                                                                                                                                                                                                                                                                                                                   |
| `app/login/`, `forgot-password/`, `forbidden/`                               | 身份验证相关页面                                                                                                                                                                                                                                                                                                             |
| `app/{400,401,403,408,429,500,502,503}/`                                     | HTTP 错误页面                                                                                                                                                                                                                                                                                                                |
| `app/maintenance/`, `offline/`, `status/`, `privacy/`, `terms/`, `callback/` | 静态/状态页面                                                                                                                                                                                                                                                                                                                |
| `app/layout.tsx`, `page.tsx`, `manifest.ts`, `globals.css`                   | 根布局、首页、PWA 清单、全局 CSS                                                                                                                                                                                                                                                                                             |
| `app/error.tsx`, `global-error.tsx`, `not-found.tsx`, `loading.tsx`          | 错误边界                                                                                                                                                                                                                                                                                                                     |

### `src/lib/` — 核心库（约 50 个模块）

| 模块                                     | 用途                                                                                                                                                                                                                                                                                                        |
| ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `a2a/`                                   | A2A 协议任务管理器、技能（5 个）、流式传输                                                                                                                                                                                                                                                                  |
| `acp/`                                   | CLI 智能体注册表（本地 CLI 发现——参见 `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`）                                                                                                                                                                                                                          |
| `api/`                                   | 共享 API 辅助工具（`requireManagementAuth`、验证）                                                                                                                                                                                                                                                          |
| `auth/`                                  | 会话、密码哈希、令牌验证                                                                                                                                                                                                                                                                                    |
| `batches/`                               | OpenAI Batches API 处理程序                                                                                                                                                                                                                                                                                 |
| `catalog/`                               | 提供者目录的 Zod 验证与能力解析                                                                                                                                                                                                                                                                             |
| `cloudAgent/`                            | 云端智能体（Codex Cloud、Devin、Jules）——参见 `docs/frameworks/CLOUD_AGENT.md`                                                                                                                                                                                                                              |
| `combos/`                                | 组合解析与重新排序辅助工具                                                                                                                                                                                                                                                                                  |
| `audit/`                                 | 活动信息流辅助工具：`highLevelActions.ts`（允许列表 + `isHighLevelAction()`）、`activityIcons.ts`（操作 → 图标/动词映射）、`timeline.ts`（groupByDay/relativeTime）——参见 `docs/architecture/MONITORING_SECTIONS.md`                                                                                        |
| `compliance/`                            | 审计日志与提供者审计——参见 `docs/security/COMPLIANCE.md`                                                                                                                                                                                                                                                    |
| `compression/`                           | 压缩引擎粘合层（引擎位于 `open-sse/services/compression/`）                                                                                                                                                                                                                                                 |
| `config/`                                | 运行时配置辅助工具                                                                                                                                                                                                                                                                                          |
| `db/`                                    | 120 多个领域数据库模块与 168 个迁移（SQLite 操作始终通过此处进行）                                                                                                                                                                                                                                          |
| `quota/`                                 | 配额共享引擎：`dimensions.ts`（类型/Zod）、`types.ts`（QuotaStore 接口）、`sqliteQuotaStore.ts`、`redisQuotaStore.ts`、`storeFactory.ts`、`fairShare.ts`、`burnRate.ts`、`planResolver.ts`、`planRegistry.ts`、`saturationSignals.ts`、`enforce.ts`、`spendRecorder.ts`——参见 `docs/routing/QUOTA_SHARE.md` |
| `radar/`                                 | Radar 免费模型目录客户端：`feedSchema.ts`、`pinnedKeys.ts`、`verify.ts`、`sync.ts`、`applyFeed.ts`、`index.ts`（`getRadarCatalog()`）— 参见 `docs/frameworks/RADAR.md`                                                                                                                                      |
| `display/`                               | UI 格式化辅助工具（成本、延迟等）                                                                                                                                                                                                                                                                           |
| `embeddings/`                            | 嵌入服务辅助工具                                                                                                                                                                                                                                                                                            |
| `env/`                                   | 环境变量解析和验证                                                                                                                                                                                                                                                                                          |
| `evals/`                                 | 评测框架（套件、运行器、运行时）— 参见 `docs/frameworks/EVALS.md`                                                                                                                                                                                                                                           |
| `guardrails/`                            | PII 屏蔽器、提示词注入防护、视觉桥接 — 参见 `docs/security/GUARDRAILS.md`                                                                                                                                                                                                                                   |
| `jobs/`                                  | 后台任务（类似 cron）                                                                                                                                                                                                                                                                                       |
| `memory/`                                | 对话记忆（SQLite FTS5 + sqlite-vec 混合 RRF + Qdrant 第 2 层）— 参见 `docs/frameworks/MEMORY.md`                                                                                                                                                                                                            |
| `memory/embedding/`                      | 多源嵌入层：`index.ts`（解析器）、`remote.ts`、`staticPotion.ts`、`transformersLocal.ts`、`cache.ts`、`types.ts`（计划 21）                                                                                                                                                                                 |
| `memory/vectorStore.ts`                  | sqlite-vec v0.1.9 封装 — KNN 暴力搜索 + 混合 RRF（FTS5 + 向量，k=60）。延迟初始化；当 sqlite-vec 不可用时可优雅降级。（计划 21）                                                                                                                                                                            |
| `memory/reindex.ts`                      | `runReindexBatch()` — 在后台处理 `needs_reindex=1` 的记忆；由 `POST /api/memory/reindex` 和延迟回填路径调用。（计划 21）                                                                                                                                                                                    |
| `monitoring/`                            | 健康检查、指标发出                                                                                                                                                                                                                                                                                          |
| `oauth/`                                 | 22 个提供者模块的 OAuth/导入流程（agy、antigravity、claude、cline、codebuddy-cn、codex、cursor、devin-desktop、ghe-copilot、github、gitlab-duo、grok-cli-oauth、grok-cli、kilocode、kimi-coding、kiro、openference、qoder、trae、xai-oauth、zed-hosted、zed）                                               |
| `plugins/`                               | 插件注册表                                                                                                                                                                                                                                                                                                  |
| `promptCache/`                           | Anthropic 风格的提示词缓存断点                                                                                                                                                                                                                                                                              |
| `skills/`                                | 技能框架（内置 + 市场 + SkillsSH）— 参见 `docs/frameworks/SKILLS.md`                                                                                                                                                                                                                                        |
| `playground/`                            | Playground Studio 共享辅助工具：`codeExport.ts`（curl/Python/TS 生成器）、`promptImprover.ts`（元提示词构建器）、`streamMetrics.ts`（纯 TTFT/TPS）、`types.ts`（定价表）— 参见 `docs/frameworks/PLAYGROUND_STUDIO.md`                                                                                       |
| `webhookDispatcher.ts`                   | HMAC Webhook 投递 — 参见 `docs/frameworks/WEBHOOKS.md`                                                                                                                                                                                                                                                      |
| `cloudflaredTunnel.ts`, `ngrokTunnel.ts` | 隧道管理器 — 参见 `docs/ops/TUNNELS_GUIDE.md`                                                                                                                                                                                                                                                               |
| `cloudSync.ts`, `initCloudSync.ts`       | 可选的状态云同步                                                                                                                                                                                                                                                                                            |
| `localDb.ts`                             | db 模块的重新导出入口（无逻辑 — 仅重新导出）                                                                                                                                                                                                                                                                |
| `cacheLayer.ts`, `idempotencyLayer.ts`   | 请求缓存 + 幂等性                                                                                                                                                                                                                                                                                           |
| （约 30 个其他顶层文件）                 | 专用辅助工具（logEnv、modelsDevSync、piiSanitizer 等）                                                                                                                                                                                                                                                      |

### `src/lib/db/` — 数据库（122 个模块 + 168 个迁移）

| 子目录                    | 用途                                                                                                                                                                     |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `db/core.ts`              | 使用 WAL 日志模式的 `getDbInstance()` 单例                                                                                                                               |
| `db/migrations/`          | 带版本的 SQL 文件（幂等、事务式）。`073_memory_vec.sql` 添加 `memory_vec_meta` + `needs_reindex` 列（计划 21）。                                                         |
| `db/playgroundPresets.ts` | Playground Studio 预设的 CRUD 模块（`listPlaygroundPresets`、`getPlaygroundPreset`、`createPlaygroundPreset`、`updatePlaygroundPreset`、`deletePlaygroundPreset`）       |
| `db/memoryVec.ts`         | `memory_vec_meta`（active_dim、embedding_signature、last_reset_at、vec_loaded）的 CRUD，以及 `markMemoryNeedsReindex`、`getMemoryReindexQueue` 等（计划 21）             |
| `db/<domain>.ts`          | 每个领域对应一个模块：providers、combos、apiKeys、users、sessions、usage、audit*log、webhooks、skills、memory_entries、cloud_agent_tasks、evals*\*、reasoning_cache 等。 |

### `src/domain/`

| 模块                   | 用途                                        |
| ---------------------- | ------------------------------------------- |
| `policy.ts`            | 策略引擎                                    |
| `fallbackPolicy.ts`    | 回退决策树                                  |
| `costRules.ts`         | 成本计算规则                                |
| `lockoutPolicy.ts`     | 模型/连接锁定策略                           |
| `tagRouter.ts`         | 基于标签的路由                              |
| `comboResolver.ts`     | 组合解析（由组合引擎使用）                  |
| `modelAvailability.ts` | 按模型检查可用性                            |
| `assessment/`          | 模型评估（RFC-AUTO-ASSESSMENT 的第 1 阶段） |

### `src/server/`

| 模块     | 用途                                                                                    |
| -------- | --------------------------------------------------------------------------------------- |
| `authz/` | 授权管道：`classify` → `policies` → `enforce` — 参见 `docs/architecture/AUTHZ_GUIDE.md` |
| `cors/`  | CORS 配置                                                                               |
| `auth/`  | 会话中间件                                                                              |

### `src/shared/`

| 模块                             | 用途                                                         |
| -------------------------------- | ------------------------------------------------------------ |
| `constants/providers.ts`         | **355 个提供者**，使用 Zod 验证（唯一事实来源）              |
| `constants/cliTools.ts`          | 外部 CLI 工具注册表                                          |
| `constants/routingStrategies.ts` | **19 种路由策略**及其优先级                                  |
| `constants/publicApiRoutes.ts`   | 需要 Bearer 认证（而非管理认证）的路由                       |
| `constants/upstreamHeaders.ts`   | 上游请求的请求头拒绝列表                                     |
| `validation/schemas.ts`          | 约 80 个 Zod schema（API 契约的唯一事实来源）                |
| `validation/helpers.ts`          | Zod 验证辅助工具（`validateBody` 等）                        |
| `types/`                         | 共享 TS 类型                                                 |
| `contracts/`                     | 公共 API 契约（由 `package.json` 中的 `files:` 使用）        |
| `utils/circuitBreaker.ts`        | 提供者熔断器（参见 `docs/architecture/RESILIENCE_GUIDE.md`） |
| `utils/apiAuth.ts`               | API 密钥验证、作用域检查                                     |
| `utils/fetchTimeout.ts`          | 用于上游 fetch 的超时/中止封装                               |
| `utils/releaseNotes.ts`          | 已关闭的 v2/旧版公告解析器、本地化及按 ID 忽略功能           |

---

## `open-sse/` — 流式引擎工作区

独立的 npm 工作区（`@omniroute/open-sse`）。负责请求处理和提供者执行。

```
open-sse/
├── handlers/            # 16 个文件（12 个处理器 + 4 个辅助模块）：chatCore、responsesHandler、embeddings、audio、image、video、music、rerank、moderations、search 等
├── executors/           # 67 个提供者专用执行器（继承 BaseExecutor）
├── translator/          # 格式转换器（9 个请求转换器、9 个响应转换器、9 个辅助模块）
├── transformer/         # Responses API ↔ Chat Completions（TransformStream）
├── services/            # 约 80+ 个服务模块（combo、accountFallback、autoCombo、reasoningCache、claude code/chatgpt stealth、modelDeprecation、taskAwareRouter、workflowFSM 等）
├── mcp-server/          # MCP 服务器（110 个工具、3 种传输方式、33 个作用域）
├── config/              # 提供者/模型注册表、请求头配置、模型别名
├── utils/               # TLS 客户端、代理 fetch/dispatcher、网络辅助工具
├── index.ts             # 工作区入口
├── package.json         # 工作区清单
├── tsconfig.json        # 工作区 TS 配置
└── types.d.ts           # 工作区类型声明
```

### `open-sse/mcp-server/`

| 路径                        | 用途                                                                  |
| --------------------------- | --------------------------------------------------------------------- |
| `server.ts`                 | MCP 服务器生命周期（stdio + HTTP 传输）                               |
| `httpTransport.ts`          | HTTP Streamable + SSE 传输（`/api/mcp/sse`、`/api/mcp/stream`）       |
| `audit.ts`                  | 将审计日志记录到 `mcp_tool_audit` 表                                  |
| `scopeEnforcement.ts`       | 按工具进行作用域验证                                                  |
| `runtimeHeartbeat.ts`       | 将健康状态心跳写入 `DATA_DIR/runtime/mcp-heartbeat.json`              |
| `descriptionCompressor.ts`  | 压缩工具描述元数据以节省上下文                                        |
| `schemas/tools.ts`          | 36 个基础工具定义及其作用域                                           |
| `tools/advancedTools.ts`    | 高级工具实现                                                          |
| `tools/memoryTools.ts`      | 3 个记忆工具（搜索/添加/清除）                                        |
| `tools/skillTools.ts`       | 4 个技能工具（列出/启用/执行/执行记录）                               |
| `tools/compressionTools.ts` | 5 个压缩工具                                                          |
| `README.md`                 | 内部 MCP 服务器 README（与 `docs/frameworks/MCP-SERVER.md` 交叉链接） |

---

## `electron/` — 桌面封装程序

| 文件             | 用途                                                                        |
| ---------------- | --------------------------------------------------------------------------- |
| `main.js`        | Electron 主进程（BrowserWindow、嵌入式 Next.js 服务器、系统托盘、自动更新） |
| `preload.js`     | IPC 桥接（contextBridge → `window.omniroute`）                              |
| `package.json`   | electron-builder 配置 + Electron 41 + electron-builder 26.10 依赖           |
| `assets/`        | 应用图标（Windows .ico、macOS .icns、Linux .png）                           |
| `dist-electron/` | 构建输出（被 git 忽略）                                                     |
| `types.d.ts`     | 渲染进程桥接的类型声明                                                      |
| `README.md`      | 内部 Electron README（另请参阅 `docs/guides/ELECTRON_GUIDE.md`）            |

---

## `bin/` — CLI

| 文件                                                                                                        | 用途                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `omniroute.mjs`                                                                                             | 主 CLI 入口 — `omniroute serve`、`omniroute setup`、`omniroute doctor`、`omniroute providers`、`omniroute combos` 等 |
| `reset-password.mjs`                                                                                        | 独立的密码重置 CLI                                                                                                   |
| `cli/commands/setup.mjs`                                                                                    | 交互式 + 非交互式设置向导                                                                                            |
| `cli/commands/doctor.mjs`                                                                                   | 系统健康诊断（8 项以上检查）                                                                                         |
| `cli/commands/providers.mjs`                                                                                | 提供者列表/测试/验证                                                                                                 |
| `cli/{args,data-dir,encryption,io,provider-catalog,provider-store,provider-test,settings-store,sqlite}.mjs` | CLI 辅助模块                                                                                                         |
| `cli/tray/tray.ts`                                                                                          | 系统托盘集成（跨平台：Windows 上使用 NotifyIcon，macOS/Linux 上使用 systray2）                                       |
| `cli/tray/tray.ps1`                                                                                         | PowerShell NotifyIcon 后端（Windows，无需新增二进制文件）                                                            |
| `cli/tray/autostart.ts`                                                                                     | 跨平台自动启动（LaunchAgent / .desktop / 注册表）                                                                    |
| `cli/runtime/sqliteRuntime.mjs`                                                                             | 5 步 SQLite 驱动解析链（捆绑 → 运行时 → 延迟安装 → node:sqlite → sql.js）                                            |
| `cli/runtime/magicBytes.mjs`                                                                                | 二进制魔数字节验证（ELF / Mach-O / Mach-O fat / PE）                                                                 |
| `cli/runtime/index.mjs`                                                                                     | `warmUpRuntimes()` — 在 postinstall / 首次启动时预解析驱动程序                                                       |
| `nodeRuntimeSupport.mjs`                                                                                    | 安装时验证受支持的 Node.js 版本                                                                                      |

---

## `skills/` — 公共 Agent 技能

| 文件                         | 用途                                                                        |
| ---------------------------- | --------------------------------------------------------------------------- |
| `skills/omniroute*/SKILL.md` | 面向外部 AI Agent（Claude Desktop、ChatGPT、Cursor、Cline）的 10 个技能清单 |

---

## `scripts/` — 构建与检查脚本

| 脚本                                | 用途                                                                |
| ----------------------------------- | ------------------------------------------------------------------- |
| `run-next.mjs`                      | 支持环境变量注入的开发/启动运行器                                   |
| `build-next-isolated.mjs`           | 独立构建（Next.js 16 独立模式）                                     |
| `prepublish.ts`                     | 执行 `npm pack` 前的包准备                                          |
| `postinstall.mjs`                   | 首次安装时根据 `.env.example` 自动创建 `.env`                       |
| `sync-env.mjs`                      | 将 `.env` 中的键与 `.env.example` 重新同步                          |
| `check-cycles.mjs`                  | 检测循环依赖                                                        |
| `check-route-validation.mjs`        | 验证所有 API 路由是否使用 Zod 验证                                  |
| `check-t11-any-budget.mjs`          | 强制执行每个文件的显式 `any` 配额                                   |
| `check-docs-sync.mjs`               | 验证文档版本同步（现有的预提交检查）                                |
| **`check-env-doc-sync.mjs`**        | 新增：交叉核对代码、`.env.example` 和 `ENVIRONMENT.md` 中的环境变量 |
| **`check-docs-counts-sync.mjs`**    | 新增：验证数量（执行器、策略、OAuth、A2A 技能）是否与文档一致       |
| **`check-deprecated-versions.mjs`** | 新增：标记文档中过时的版本/日期                                     |
| `check-supported-node-runtime.ts`   | 验证当前 Node 版本是否受支持                                        |
| `check-pr-test-policy.mjs`          | 对生产代码变更强制执行“必须测试”规则                                |
| **`gen-provider-reference.ts`**     | 新增：根据目录自动生成 `docs/reference/PROVIDER_REFERENCE.md`       |
| `i18n/generate-multilang.mjs`       | 通过 Google Translate 翻译 UI 字符串和文档                          |
| `i18n_autotranslate.py`             | 基于 LLM 的文档翻译流水线                                           |
| `validate_translation.py`           | 按语言区域验证翻译                                                  |
| `check_translations.py`             | 代码侧 i18n 键检查                                                  |
| `run-playwright-tests.mjs`          | Playwright E2E 运行器                                               |
| `run-protocol-clients-tests.mjs`    | MCP/A2A E2E 运行器                                                  |
| `run-ecosystem-tests.mjs`           | 生态系统（提供者集成）测试                                          |
| `test-report-summary.mjs`           | 生成覆盖率摘要 Markdown                                             |
| `smoke-electron-packaged.mjs`       | 对已打包的 Electron 构建执行冒烟测试                                |
| `native-binary-compat.mjs`          | 验证原生依赖（`better-sqlite3`）是否与 Electron 的 Node 匹配        |
| `validate-pack-artifact.ts`         | 验证 npm 打包输出                                                   |
| `responses-ws-proxy.mjs`            | Codex Responses API 的 WebSocket 桥接                               |
| `v1-ws-bridge.mjs`                  | `/api/v1/ws` 端点的 WebSocket 桥接                                  |
| `standalone-server-ws.mjs`          | 独立 WS 服务器运行器                                                |
| `system-info.mjs`                   | 打印用于支持的系统/运行时信息                                       |
| `healthcheck.mjs`                   | 一次性健康检查（由 Docker HEALTHCHECK 使用）                        |
| `uninstall.mjs`                     | 完全卸载脚本                                                        |

---

## `docs/` — 公共文档（7 个根目录文件 + 17 个子目录）

### 顶层指南

| 文档                        | 用途                                                                              |
| --------------------------- | --------------------------------------------------------------------------------- |
| `ARCHITECTURE.md`           | 高层架构、子系统地图、仪表板界面                                                  |
| `CODEBASE_DOCUMENTATION.md` | 工程参考：目录、模块、约定                                                        |
| `FEATURES.md`               | 包含 v3.8 亮点的功能矩阵                                                          |
| `USER_GUIDE.md`             | 最终用户手册（设置、模型、组合、CLI、音频等）                                     |
| `API_REFERENCE.md`          | 包含身份验证模型的 API 端点参考                                                   |
| `openapi.yaml`              | OpenAPI 3.0 规范（121 条路径）                                                    |
| `SETUP_GUIDE.md`            | 安装方式（npm、npx、Docker、Electron、Termux、源码）                              |
| `ENVIRONMENT.md`            | 所有环境变量（约 800 个已有文档记录，`.env.example` 约 3,050 行）                 |
| `TROUBLESHOOTING.md`        | 常见错误 + v3.8.0 已知问题                                                        |
| `RELEASE_CHECKLIST.md`      | 完整发布流程（技能、husky、约定式提交、部署）                                     |
| `COVERAGE_PLAN.md`          | 覆盖率目标和当前状态                                                              |
| `FREE_TIERS.md`             | 精选免费套餐提供者（48+ 个免费提供者 + 11 个 OAuth 提供者）                       |
| `CLI-TOOLS.md`              | 外部 CLI 集成 + 内部 OmniRoute CLI                                                |
| `I18N.md`                   | i18n 架构、添加语言、42 个区域设置                                                |
| `UNINSTALL.md`              | 完全卸载步骤                                                                      |
| `PROVIDER_REFERENCE.md`     | 包含 355 个提供者的**自动生成**目录（重新生成：`npm run gen:provider-reference`） |

### 子系统深入解析

| 文档                                       | 用途                                                         |
| ------------------------------------------ | ------------------------------------------------------------ |
| `MCP-SERVER.md`                            | MCP 服务器：110 个工具、3 种传输方式、33 个作用域、REST 端点 |
| `A2A-SERVER.md`                            | A2A v0.3：JSON-RPC、6 个技能、REST 辅助工具、智能体卡片      |
| `AGENT_PROTOCOLS_GUIDE.md`                 | 统一指南：A2A 与 ACP 与 Cloud Agents 的对比                  |
| `CLOUD_AGENT.md`                           | Codex Cloud / Devin / Jules 编排                             |
| `SKILLS.md`                                | 技能框架（内置 + 市场 + SkillsSH + 沙箱）                    |
| `RADAR.md`                                 | Radar 免费模型目录覆盖层（`RADAR_ENABLED`，默认关闭）        |
| `MEMORY.md`                                | 记忆系统（SQLite FTS5 + Qdrant）                             |
| `EVALS.md`                                 | 评估框架（套件、运行、评分标准）                             |
| `GUARDRAILS.md`                            | PII 屏蔽器、提示词注入防护、视觉桥接                         |
| `COMPLIANCE.md`                            | 审计日志、保留策略、noLog 退出选项                           |
| `WEBHOOKS.md`                              | HMAC 签名的 Webhook 交付                                     |
| `REASONING_REPLAY.md`                      | 用于 `reasoning_content` 的混合内存/SQLite 缓存              |
| `AUTHZ_GUIDE.md`                           | 授权管道（`classify` → `policies` → `enforce`）              |
| `RESILIENCE_GUIDE.md`                      | 断路器 + 冷却 + 模型锁定                                     |
| `docs/security/STEALTH_GUIDE.md`（仅 git） | TLS 指纹识别（JA3/JA4）、Claude Code CCH、中间人证书         |
| `AUTO-COMBO.md`                            | Auto Combo 引擎（16 因素评分、6 个模式包、虚拟工厂）         |

### 压缩

| 文档                            | 用途                           |
| ------------------------------- | ------------------------------ |
| `COMPRESSION_GUIDE.md`          | 压缩模式概览 + 路线图          |
| `COMPRESSION_ENGINES.md`        | Caveman + RTK 引擎、注册表契约 |
| `COMPRESSION_RULES_FORMAT.md`   | Caveman 规则包 JSON 模式       |
| `COMPRESSION_LANGUAGE_PACKS.md` | 各语言规则包清单               |
| `RTK_COMPRESSION.md`            | RTK 声明式管道（49 个过滤器）  |

### 部署

| 文档                         | 用途                                                           |
| ---------------------------- | -------------------------------------------------------------- |
| `DOCKER_GUIDE.md`            | Docker 构建、配置文件（base/cli/host/cliproxyapi）、Redis 边车 |
| `VM_DEPLOYMENT_GUIDE.md`     | 通用 VM/VPS 部署（Ubuntu/Debian + nginx + systemd）            |
| `FLY_IO_DEPLOYMENT_GUIDE.md` | Fly.io 部署（目前仅提供中文版本）                              |
| `TERMUX_GUIDE.md`            | 通过 Termux 在 Android 上无头运行                              |
| `PWA_GUIDE.md`               | 渐进式 Web 应用安装 + Service Worker                           |
| `ELECTRON_GUIDE.md`          | 桌面应用构建 + 签名 + 分发                                     |
| `TUNNELS_GUIDE.md`           | Cloudflared + ngrok + Tailscale Funnel                         |
| `PROXY_GUIDE.md`             | 4 级出站代理 + 1proxy 市场                                     |

### 子目录

| 子目录                | 用途                                                                                                                                                                      |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `docs/i18n/`          | 本地化文档翻译（41 种语言区域）                                                                                                                                           |
| `docs/screenshots/`   | 指南所用的图片资源                                                                                                                                                        |
| `_tasks/superpowers/` | 来自 superpowers（`writing-plans`/`brainstorming`）的计划/规范及研究资料——独立存放、单独进行版本控制的仓库，并被主代码树的 git 忽略。请参阅 CLAUDE.md →“规划与研究产物”。 |

---

## `tests/` — 测试套件

| 子目录                               | 类型                                  | 运行器                            |
| ------------------------------------ | ------------------------------------- | --------------------------------- |
| `tests/unit/`                        | 单元测试（约 4,800 个文件，速度最快） | Node 原生测试运行器               |
| `tests/integration/`                 | 多模块 + 数据库集成测试               | Node 原生测试运行器（并发数为 1） |
| `tests/e2e/`                         | UI + 工作流端到端测试                 | Playwright                        |
| `tests/e2e/protocol-clients.test.ts` | MCP + A2A 真实客户端端到端测试        | 自定义协议客户端                  |
| `tests/e2e/ecosystem.test.ts`        | 提供者集成（涉及网络访问）            | Node 原生测试运行器               |

---

## `public/` — 静态资源

| 路径                | 用途                                                 |
| ------------------- | ---------------------------------------------------- |
| `public/`（根目录） | 网站图标、robots.txt、清单、Service Worker、营销图片 |
| `public/providers/` | 提供者徽标 PNG/SVG（用于仪表板）                     |

---

## `config/` — 静态配置 + 质量门禁状态

随附的配置模板以及已提交的质量门禁基线
（在 v3.8.26 中从仓库根目录移至此处，以保持根目录简洁）。

| 路径                                          | 用途                                                               |
| --------------------------------------------- | ------------------------------------------------------------------ |
| `config/i18n.json`                            | 语言区域列表 + 元数据（42 个语言区域数量的权威来源）               |
| `config/i18n-schema.json`                     | 用于验证 `i18n.json` 的 JSON 架构                                  |
| `config/payloadRules.json`                    | 上游有效载荷清理规则                                               |
| `config/quality/quality-baseline.json`        | 多指标棘轮基线（`scripts/quality/check-quality-ratchet.mjs`）      |
| `config/quality/complexity-baseline.json`     | 冻结的 ESLint 复杂度基线（`check-complexity.mjs`）                 |
| `config/quality/duplication-baseline.json`    | 冻结的 jscpd 重复代码基线（`check-duplication.mjs`）               |
| `config/quality/file-size-baseline.json`      | 冻结的逐文件大小基线（`check-file-size.mjs`）                      |
| `config/quality/test-discovery-baseline.json` | 冻结的孤立测试基线（`check-test-discovery.mjs`）                   |
| `config/quality/dependency-allowlist.json`    | 已批准的依赖项允许列表（`check-deps.mjs`）                         |
| `config/quality/.license-allowlist.json`      | SPDX 许可证允许列表（`check-licenses.mjs`）                        |
| `config/quality/quality-metrics.json`         | 临时收集的指标（由 `collect-metrics.mjs` 生成；**已被 git 忽略**） |

---

## `.github/` — GitHub 集成

| 路径                               | 用途                                                        |
| ---------------------------------- | ----------------------------------------------------------- |
| `.github/workflows/`               | GitHub Actions CI/CD 工作流（代码检查、测试、覆盖率、发布） |
| `.github/ISSUE_TEMPLATE/`          | Bug/功能议题模板                                            |
| `.github/pull_request_template.md` | PR 模板                                                     |
| `.github/dependabot.yml`           | 依赖项更新配置                                              |

---

## `.husky/` — Git 钩子

| 文件         | 用途                                                        |
| ------------ | ----------------------------------------------------------- |
| `pre-commit` | 运行 `lint-staged + check-docs-sync + check:any-budget:t11` |
| `pre-push`   | 当前已禁用（已注释）。请手动运行 `npm run test:unit`。      |
| `_/`         | Husky 内部文件                                              |

---

## `.claude/` — Claude Code 斜杠命令

| 文件                                                | 用途                                              |
| --------------------------------------------------- | ------------------------------------------------- |
| `commands/version-bump-cc.md`                       | `/version-bump-cc` — 提升版本号并自动生成变更日志 |
| `commands/generate-release-cc.md`                   | `/generate-release-cc` — 完整发布工作流           |
| `commands/deploy-vps-{local,akamai,both}-cc.md`     | 部署到 VPS                                        |
| `commands/capture-release-evidences-cc.md`          | 在浏览器中录制新功能并保存为 WebP                 |
| `commands/review-{prs,discussions}-cc.md`           | 分类处理 GitHub PR/讨论                           |
| `commands/{review-issues,implement-features}-cc.md` | 议题工作流                                        |
| `settings.local.json`                               | 项目级 Claude Code 设置                           |

---

## `.agents/` — 通用代理工作流（Codex / Cursor / 等）

| 路径                     | 用途                                          |
| ------------------------ | --------------------------------------------- |
| `workflows/*-ag.md`      | 11 个工作流定义（`.claude/commands/` 的镜像） |
| `skills/<name>/SKILL.md` | 9 个技能定义，包含 Codex 执行说明             |

> **注意：** 工作流和命令目前逐字节完全相同。如果 `.agents/` 旨在适配不同的代理运行时（Codex），则这些变体需要进行有实质意义的区分。

---

## `_ideia/`、`_mono_repo/`、`_references/`、`_tasks/` — 树外目录

这些以下划线为前缀的目录用于存放不随软件发布的内容：

- **`_ideia/`** — 设计说明（defer / notfit / viable 分类）
- **`_mono_repo/`** — 历史子项目（omnirouteCloud、omnirouteSite、vscode-extension）
- **`_references/`** — 相关 OSS 项目的只读克隆（LiteLLM、9router、ClawRouter、CLIProxyAPI、modelrelay、new-api 等），用于开发期间交叉参考
- **`_tasks/`** — 各版本的任务跟踪文件（非正式）

不包含在 `npm pack` 输出中。请参阅 `.npmignore`。

---

## 生成内容 / Git 忽略项

| 路径                   | 用途                    |
| ---------------------- | ----------------------- |
| `node_modules/`        | npm 依赖项              |
| `.next/`               | Next.js 构建输出        |
| `coverage/`            | c8 覆盖率报告           |
| `logs/`                | 运行时日志              |
| `package/`             | npm pack 暂存目录       |
| `.playwright-mcp/`     | Playwright MCP 测试产物 |
| `.issues/`             | 本地问题缓存            |
| `tsconfig.tsbuildinfo` | TS 增量编译缓存         |

---

## 导航提示

- **新贡献者？** 阅读 `CONTRIBUTING.md` → `CLAUDE.md` → `docs/architecture/ARCHITECTURE.md` → `docs/architecture/CODEBASE_DOCUMENTATION.md`。
- **添加提供者？** 按照 `docs/architecture/ARCHITECTURE.md § Adding a New Provider` 操作，并交叉核对 `docs/reference/PROVIDER_REFERENCE.md`。
- **添加路由？** 请参阅 `docs/architecture/ARCHITECTURE.md § Adding a New API Route` 和 `src/shared/validation/schemas.ts`。
- **添加 MCP 工具？** 请参阅 `docs/frameworks/MCP-SERVER.md § Adding a Tool`。
- **添加 A2A 技能？** 请参阅 `docs/frameworks/A2A-SERVER.md § Adding a New Skill`。
- **在本地运行？** 请参阅 `docs/guides/SETUP_GUIDE.md`。
- **部署？** 请参阅 `docs/guides/DOCKER_GUIDE.md` / `docs/ops/VM_DEPLOYMENT_GUIDE.md` / `docs/ops/FLY_IO_DEPLOYMENT_GUIDE.md`。
- **发布？** 请参阅 `docs/ops/RELEASE_CHECKLIST.md`（以及 `/generate-release-cc` Claude Code 技能）。
