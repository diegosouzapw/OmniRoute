# Contributing to OmniRoute (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

感谢您对贡献的兴趣！本指南涵盖了入门所需的一切内容。

有关官方的每次更改工作流程，请从
[贡献黄金路径](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) 开始。它映射了提供者、路由、
UI/UX、i18n、CLI、数据库和构建/部署更改到其合同、重点测试、CI
覆盖率和协调步骤。

---

## 开发设置

### 前提条件

- **Node.js** `>=22.22.3 <23`，或 `>=24.0.0 <27`（推荐：24 LTS）
- **npm** 10+

> **npm v11+ 用户（Node 24+）：** 在 `npm install` 之后，验证原生模块是否已安装：
> `node -e "require('better-sqlite3')"`。如果失败并显示 `MODULE_NOT_FOUND`，
> 请运行 `npm approve-scripts better-sqlite3 && npm install`。请参阅
> [故障排除](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)。

- **Git**

### 克隆与安装

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### 环境变量

```bash
# 从模板创建您的 .env 文件
cp .env.example .env

# 生成所需的密钥
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

开发的关键变量：

| 变量                   | 开发默认值               | 描述           |
| ---------------------- | ------------------------ | -------------- |
| `PORT`                 | `20128`                  | 服务器端口     |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | 前端的基准 URL |
| `JWT_SECRET`           | （上方生成）             | JWT 签名密钥   |
| `INITIAL_PASSWORD`     | `CHANGEME`               | 首次登录密码   |
| `APP_LOG_LEVEL`        | `info`                   | 日志详细级别   |

### 仪表盘设置

仪表盘提供了功能的 UI 开关，这些功能也可以通过环境变量进行配置：

| 设置位置    | 开关         | 描述                   |
| ----------- | ------------ | ---------------------- |
| 设置 → 高级 | 调试模式     | 启用调试请求日志（UI） |
| 设置 → 常规 | 侧边栏可见性 | 显示/隐藏侧边栏部分    |

这些设置存储在数据库中，并在重启后持续存在，设置后会覆盖环境变量默认值。

### 本地运行

```bash
# 开发模式（热重载）
npm run dev

# 生产构建
npm run build    # next build → .build/next/ 然后 assembleStandalone → dist/
npm run start

# 为贡献者更改快速编译后端/仅 API
npm run build:contributor

# 发布构建（清理重建 + HEAD 哨兵 — 部署必需）
npm run build:release   # rm -rf .build dist && 构建 + 写入 dist/BUILD_SHA

# 常见端口配置
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

贡献者构建执行仅编译验证：它不会组装独立
分发或构建可选的原生打包资产。当您
需要验证可交付的捆绑包时，请使用常规的生产构建。

### 构建输出布局

| 目录      | 内容                                                              | 跟踪 |
| --------- | ----------------------------------------------------------------- | ---- |
| `src/`    | 应用程序源代码（TypeScript / TSX）                                | 是   |
| `.build/` | 中间文件 — `next build` 输出（git 忽略，`distDir = .build/next`） | 否   |
| `dist/`   | 可交付捆绑包 — 由 `assembleStandalone` 组装（git 忽略）           | 否   |

构建管道是单次传递：

```
npm run build
  └─ next build → .build/next/standalone  （Next.js 输出）
  └─ assembleStandalone()                 （复制 standalone + static + public + 原生资产）
       └─ 输出: dist/                   （server.js, .next/static/, public/, node_modules/）
```

`npm run build:release` 还会首先清理两个目录并写入
`dist/BUILD_SHA`（= `git rev-parse --short HEAD`）作为部署完整性哨兵。

`npm run build:contributor` 使用仅后端的构建配置文件。它临时存根
仪表盘 UI 文件同时构建，保留 API 路由处理程序，并在构建后恢复原始文件
。对于影响仪表盘 UI 或需要完整
发布验证的更改，请使用 `npm run build`；贡献者配置文件不能替代发布构建。

> **VPS 部署说明：** 远程镜像目录 `/usr/lib/node_modules/omniroute/app/`
> 保持不变。部署技能将 `dist/` 的内容 rsync 到其中。
> 只有仓库内的构建输出路径发生了变化（`app/` → `dist/`）。

默认 URL：

- **仪表盘**：`http://localhost:20128/dashboard`
- **API**：`http://localhost:20128/v1`

---

## Git 工作流

> ⚠️ **绝 NEVER 直接提交到 `main`。** 始终使用功能分支。
>
> **PR 基准分支：**目标应为当前活动的 `release/vX.Y.Z` 分支（而不是 `main`）。有关
> release-per-branch + tag-at-ship 模型，请参阅
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md)。

```bash
# 从当前活动的 release tip 创建分支（示例：release/v3.8.49）
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... 进行更改 ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# 创建一个基准分支为 release/v3.8.49 的 Pull Request
```

### 分支命名

| 前缀        | 用途             |
| ----------- | ---------------- |
| `feat/`     | 新功能           |
| `fix/`      | Bug 修复         |
| `refactor/` | 代码重构         |
| `docs/`     | 文档更改         |
| `test/`     | 添加/修复测试    |
| `chore/`    | 工具、CI、依赖项 |

### 提交消息

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

作用域（v3.8）：`db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`、`cloud-agent`、`guardrails`、`compression`、`auto-combo`、`resilience`、`providers`、`executors`、`translator`、`domain`、`authz`。

---

## 运行测试

```bash
# 所有测试（unit + vitest + ecosystem + e2e）
npm run test:all

# 单个测试文件（Node.js 原生测试运行器——大多数测试使用此运行器）
node --import tsx/esm --test tests/unit/your-file.test.ts

# 仅运行受更改影响的单元测试（与 CI 门禁使用相同的 TIA 选择器，#8084）
npm run test:scoped            # 上一次提交中的更改（或工作树中的更改）
npm run test:scoped:staged     # 仅暂存的更改——适合与提交前运行配合使用
npm run test:scoped:full       # 首先重建导入图映射（添加/移动文件后）
# 退出码为 1 且提示“run the full suite”表示某个中心文件（tsconfig、package.json 等）或未映射的源文件发生了更改——
# 选择器会安全失败，绝不会静默跳过。

# Vitest（MCP server、autoCombo、cache）
npm run test:vitest

# E2E 测试（需要 Playwright）
npm run test:e2e

# 协议客户端 E2E（MCP transports、A2A）
npm run test:protocols:e2e

# 生态系统兼容性测试
npm run test:ecosystem

# 覆盖率门禁：语句/行/函数/分支均为 60%
npm run test:coverage
npm run coverage:report

# Lint + 格式检查
npm run lint
npm run check

# 受门禁控制的真实上游组合冒烟测试（需要 VPS 访问权限 + 真实 provider 额度）
# 会调用真实 provider——会产生少量费用。绝 NEVER 在 CI 中运行。没有门禁时会正常跳过。
# 需要：ssh root@192.168.0.15 访问权限（从 VPS 获取只读 DB 快照）。
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS 实时冒烟测试——纯 Node ESM 脚本，直接调用实时 .15 server。
# 需要：ssh root@192.168.0.15 访问权限（通过 SSH sqlite 创建/拆除组合）。
# 会调用真实 provider（少量费用）。仅创建/删除 __live_test__* 组合。绝 NEVER 在 CI 中运行。
# .15 上的 REQUIRE_API_KEY=false，因此不需要 API key，但如果设置了 COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY，则会遵循其配置。
npm run test:combo:live:vps              # 7 个 HTTP 场景（priority/round-robin/weighted/cost/fusion/auto + health）
npm run test:combo:live:vps:failover     # 添加一个真实的跨 provider 故障转移场景（共 8 个）
```

覆盖率说明：

- `npm run test:coverage` 测量主单元测试套件的源代码覆盖率，排除 `tests/**`，并包含 `open-sse/**`
- Pull Request 必须将覆盖率门禁维持在语句/行/函数/分支 **60% 以上**
- 如果 PR 更改了 `src/`、`open-sse/`、`electron/` 或 `bin/` 中的生产代码，则必须在同一个 PR 中添加或更新自动化测试
- `npm run coverage:report` 会输出最近一次覆盖率运行的逐文件详细报告
- `npm run test:coverage:legacy` 保留旧版指标，以便进行历史比较
- 分阶段覆盖率改进路线图请参阅 `docs/ops/COVERAGE_PLAN.md`

### Pull Request 要求

在创建 PR 之前，请使用
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) 为
所做的更改运行聚焦循环。完整的单元测试套件（4 个 CI 分片）、Vitest、**60% 以上**的覆盖率门禁以及
生产构建由 CI 负责——在本地运行它们不会提供 PR 检查无法提供的额外信号，并且在较小的机器上可能会使主机过载（#8084）：

- 运行覆盖所做更改的测试文件：`node --import tsx/esm --test tests/unit/<file>.test.ts`
- 运行 `npm run lint`
- 每当生产代码发生更改时，在同一个 PR 中添加或更新自动化测试
- 当生产代码发生更改时，在 PR 描述中包含已更改或新增的测试文件
- 当项目密钥已在 CI 中配置时，检查 PR 上的 SonarQube 结果

当前测试状态：**122 个单元测试文件**，覆盖：

- Provider translator 和格式转换
- 速率限制、熔断器和弹性
- 语义缓存、幂等性、进度跟踪
- 数据库操作和 schema（21 个 DB 模块）
- OAuth 流程和身份验证
- API endpoint 验证（Zod v4）
- MCP server 工具和作用域强制执行
- Memory 和 Skills 系统

---

## 代码风格

- **ESLint** — 提交前运行 `npm run lint`
- **Prettier** — 提交时通过 `lint-staged` 自动格式化（2 个空格、分号、双引号、100 字符宽度、es5 尾随逗号）
- **TypeScript** — 所有 `src/` 代码均使用 `.ts`/`.tsx`；`open-sse/` 使用 `.ts`/`.js`；使用 TSDoc（`@param`、`@returns`、`@throws`）编写文档
- **禁止使用 `eval()`** — ESLint 强制执行 `no-eval`、`no-implied-eval`、`no-new-func`
- **Zod 验证** — 所有 API 输入验证均使用 Zod v4 schema
- **命名**：文件 = camelCase/kebab-case，组件 = PascalCase，常量 = UPPER_SNAKE

### 错误处理 / 空 catch 块

绝不要留下未作说明的 `catch`。将其归入以下两类之一（以此落实
“绝不能静默吞掉 SSE 流中的错误”这一硬性规则）：

- **有意为之（我们自己的尽力清理/遥测）** — 此处失败是预期且
  无害的；添加一行说明原因的注释，无需记录日志（此约定旨在避免
  每个请求都记录日志所产生的噪声）。

  ```ts
  } catch {} // 客户端断开连接后关闭已关闭的控制器属于预期情况
  ```

- **应记录日志（外部/调用方提供的代码，或吞掉错误会改变控制流）** — 保留
  catch（绝不能让它中断流），但应输出包含上下文的 `console.debug`/`warn`，以便
  能够发现该失败。

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure 回调错误：", e);
  }
  ```

有关实际应用示例，请参阅 `open-sse/utils/stream.ts` 和 `open-sse/utils/streamHandler.ts`。

---

## 项目结构

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # 仪表板页面（23 个分区）
│   ├── api/                # API 路由（51 个目录）
│   └── login/              # 身份验证页面 (.tsx)
├── domain/                 # 策略引擎（policyEngine、comboResolver、costRules 等）
├── lib/                    # 核心业务逻辑 (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 协议服务器
│   ├── acp/                # Agent Communication Protocol 注册表
│   ├── compliance/         # 合规策略引擎
│   ├── db/                 # SQLite 领域模块 + 130 个迁移
│   ├── memory/             # 持久化对话记忆
│   ├── oauth/              # OAuth 提供者、服务和工具
│   ├── skills/             # 可扩展技能框架
│   ├── usage/              # 使用量跟踪和成本计算
│   └── localDb.ts          # 仅用于重新导出——切勿在此添加逻辑
├── middleware/              # 请求中间件（promptInjectionGuard）
├── mitm/                   # MITM 代理（证书、DNS、目标路由）
├── shared/
│   ├── components/         # React 组件 (.tsx)
│   ├── constants/          # 提供者定义（329 个）、MCP 作用域、19 种路由策略
│   ├── utils/              # 断路器、清理器、身份验证辅助工具
│   └── validation/         # Zod v4 schema
└── sse/                    # SSE 代理管道

open-sse/                   # @omniroute/open-sse 工作区
├── executors/              # 89 个执行器实现模块
├── handlers/               # 11 个请求处理器（聊天、响应、嵌入、图像等）
├── mcp-server/             # MCP 服务器（110 个独立工具、3 种传输方式、33 个作用域）
├── services/               # 178 个顶层服务（combo、autoCombo、rateLimitManager 等）
├── translator/             # 格式转换器（OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama）
├── transformer/            # Responses API 转换器
└── utils/                  # 22 个工具模块（流、TLS、代理、日志记录）

electron/                   # Electron 桌面应用（跨平台）

tests/
├── unit/                   # Node.js 测试运行器（1,574 个测试文件）
├── integration/            # 集成测试
├── e2e/                    # Playwright 测试
├── security/               # 安全测试
├── translator/             # 转换器专项测试
└── load/                   # 负载测试

docs/
├── adr/                     # 架构决策记录
├── architecture/            # 系统架构与韧性
├── comparison/              # OmniRoute 与替代方案的比较
├── compression/             # 压缩指南与规则
├── dev/                     # 开发指南
├── diagrams/                # 架构图
├── frameworks/              # MCP、A2A、OpenCode、Memory、Skills
├── guides/                  # 用户指南、Docker、设置、故障排除
├── i18n/                    # 国际化 README 翻译
├── marketing/               # 营销材料
├── ops/                     # 部署、代理、覆盖率、发布
├── providers/               # 提供者专项文档
├── reference/               # API 参考、环境变量、CLI 工具、免费套餐
├── releases/                # 发布说明
├── routing/                 # 自动组合引擎、推理重放
├── screenshots/             # 仪表板截图
├── security/                # 防护措施、合规、隐匿、令牌
└── specs/                   # 设计规范
```

---

## 添加新提供者

### 步骤 1：注册提供者常量

添加到 `src/shared/constants/providers.ts`——在模块加载时通过 Zod 验证。

### 步骤 2：添加执行器（如需自定义逻辑）

在 `open-sse/executors/your-provider.ts` 中创建继承基础执行器的执行器。

### 步骤 3：添加转换器（如果不是 OpenAI 格式）

在 `open-sse/translator/` 中创建请求/响应转换器。

### 步骤 4：添加 OAuth 配置（如果基于 OAuth）

在 `src/lib/oauth/constants/oauth.ts` 中添加 OAuth 凭据，并在 `src/lib/oauth/services/` 中添加服务。

如果上游提供者在其公开 CLI / 浏览器包中分发公共 OAuth client_id/secret 或 Firebase Web API 密钥，**不要**将其作为字符串字面量嵌入。请使用 `open-sse/utils/publicCreds.ts` 中的 `resolvePublicCred()`，并向 `EMBEDDED_DEFAULTS` 添加一个掩码字节条目。完整的强制工作流程记录在 [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) 中。

在处理程序/执行器内部，发送到客户端的错误消息必须通过 `open-sse/utils/error.ts` 中的 `buildErrorBody()` / `sanitizeErrorMessage()` 处理——切勿将原始 `err.stack` 或 `err.message` 放入 Response 正文。请参阅 [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)。

### 步骤 5：注册模型

在 `open-sse/config/providerRegistry.ts` 中添加模型定义。

### 步骤 6：添加测试

在 `tests/unit/` 中编写单元测试，至少涵盖：

- 提供者注册
- 请求/响应转换
- 错误处理

---

## 拉取请求检查清单

- [ ] 测试通过（`npm test`）
- [ ] 代码检查通过（`npm run lint`）
- [ ] 构建成功（`npm run build`）
- [ ] 已为新的公共函数和接口添加 TypeScript 类型
- [ ] 不含硬编码密钥或回退值
- [ ] 通过 `resolvePublicCred()` 嵌入上游公共凭据（参阅 [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)），绝不使用字面量
- [ ] 错误响应通过 `buildErrorBody()` / `sanitizeErrorMessage()` 处理——响应正文中不含原始堆栈跟踪（参阅 [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)）
- [ ] Shell 命令（`exec` / `spawn`）通过 `env` 而非字符串插值传递运行时值
- [ ] 所有输入均使用 Zod 模式验证
- [ ] 对于面向用户的更改，已在 `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` 下添加变更日志**片段**（参阅 [`changelog.d/README.md`](./changelog.d/README.md)）——**不要**直接编辑 `CHANGELOG.md`；片段会在发布时聚合，且不同 PR 之间绝不会发生冲突
- [ ] 文档已更新（如适用）
- [ ] 未产生新的 CodeQL / Secret-Scanning 警报，或者每个警报均已驳回，并提供引用相关 `docs/security/` 文档的技术理由
- [ ] 会生成子进程的路由（`/api/mcp/`、`/api/cli-tools/runtime/`）已在 `src/server/authz/routeGuard.ts` 中归类为 `isLocalOnlyPath()`——参阅[硬性规则 #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] 提交消息中不含 `Co-Authored-By` 尾注——提交必须仅显示在仓库所有者的 Git 身份下（硬性规则 #16）

---

## 发布

发布通过 `/generate-release` 工作流进行管理。创建新的 GitHub Release 后，软件包会通过 GitHub Actions **自动发布到 npm**。

对于 VPS 部署，请使用 `npm run build:release`（而不是 `npm run build`）——该命令会执行全新构建，将软件包组装到 `dist/` 中，并写入 `dist/BUILD_SHA` 标记文件。
然后使用 `/deploy-vps-*-cc` 技能，通过 rsync 将 `dist/` 同步到远程 `app/` 目录。

---

## 获取帮助

- **架构**：请参阅 [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API 参考**：请参阅 [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **安全文档**：[`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md)、[`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md)、[`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)、[`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **运维文档**：[`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **问题反馈**：[github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
