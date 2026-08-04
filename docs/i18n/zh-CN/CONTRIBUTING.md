# Contributing to OmniRoute (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md)

---

感谢你对 OmniRoute 的关注！本文档将引导你从零开始参与项目贡献。

---

## 开发环境搭建

### 前置条件

- **Node.js** `>=22.22.3 <23` 或 `>=24.0.0 <27`（推荐：24 LTS）
- **npm** 10+
- **Git**

### 克隆与安装

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### 环境变量

```bash
# 根据模板创建 .env 文件
cp .env.example .env

# 生成必需的密钥
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

开发环境关键变量：

| 变量                     | 开发环境默认值           | 说明               |
| ------------------------ | ------------------------ | ------------------ |
| `PORT`                   | `20128`                  | 服务器端口         |
| `NEXT_PUBLIC_BASE_URL`   | `http://localhost:20128` | 前端 Base URL      |
| `JWT_SECRET`             | （通过上方命令生成）     | JWT 签名密钥       |
| `INITIAL_PASSWORD`       | `CHANGEME`               | 首次登录密码       |
| `APP_LOG_LEVEL`          | `info`                   | 日志详细级别       |

### 控制台设置

控制台为部分功能提供了界面开关，这些功能也可通过环境变量配置：

| 设置位置       | 开关               | 说明                         |
| -------------- | ------------------ | ---------------------------- |
| 设置 → 高级    | 调试模式           | 启用调试请求日志（界面端）   |
| 设置 → 常规    | 侧边栏可见性       | 显示/隐藏侧边栏分区          |

这些设置存储在数据库中，重启后仍然有效，设置后会覆盖环境变量的默认值。

### 本地运行

```bash
# 开发模式（热重载）
npm run dev

# 生产构建
npm run build    # next build → .build/next/ 然后 assembleStandalone → dist/
npm run start

# 发布构建（清理重建 + HEAD 哨兵 — 部署必需）
npm run build:release   # rm -rf .build dist && build + 写入 dist/BUILD_SHA

# 常用端口配置
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

### 构建产物布局

| 目录      | 内容                                                                         | 版本追踪 |
| --------- | ---------------------------------------------------------------------------- | -------- |
| `src/`    | 应用源码（TypeScript / TSX）                                                 | 是       |
| `.build/` | 中间产物 — `next build` 输出（已 gitignore，`distDir = .build/next`）        | 否       |
| `dist/`   | 可交付的打包产物 — 由 `assembleStandalone` 组装（已 gitignore）              | 否       |

构建流水线为单次执行：

```
npm run build
  └─ next build → .build/next/standalone  （Next.js 输出）
  └─ assembleStandalone()                 （复制 standalone + static + public + 本地原生资产）
       └─ 输出: dist/                     （server.js, .next/static/, public/, node_modules/）
```

`npm run build:release` 会额外清理上述两个目录，并写入
`dist/BUILD_SHA`（= `git rev-parse --short HEAD`）作为部署完整性哨兵。

> **VPS 部署说明：** 远程镜像目录 `/usr/lib/node_modules/omniroute/app/`
> 保持不变。部署脚本会将 `dist/` 的内容 rsync 到该目录中。
> 仅仓库内的构建输出路径发生了变动（`app/` → `dist/`）。

默认地址：

- **控制台**：`http://localhost:20128/dashboard`
- **API**：`http://localhost:20128/v1`

---

## Git 工作流

> ⚠️ **切勿直接提交到 `main` 分支。** 始终使用功能分支。

```bash
git checkout -b feat/your-feature-name
# ... 进行修改 ...
git commit -m "feat: 描述你的改动"
git push -u origin feat/your-feature-name
# 在 GitHub 上发起 Pull Request
```

### 分支命名

| 前缀        | 用途                   |
| ----------- | ---------------------- |
| `feat/`     | 新功能                 |
| `fix/`      | Bug 修复               |
| `refactor/` | 代码重构               |
| `docs/`     | 文档修改               |
| `test/`     | 测试新增/修复          |
| `chore/`    | 工具链、CI、依赖项     |

### 提交信息

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 为服务商调用添加熔断器
fix: 解决 JWT 密钥校验的边界情况
docs: 更新 SECURITY.md 增加 PII 保护内容
test: 添加可观测性单元测试
refactor(db): 合并速率限制相关数据表
```

作用域（v3.8）：`db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`、`cloud-agent`、`guardrails`、`compression`、`auto-combo`、`resilience`、`providers`、`executors`、`translator`、`domain`、`authz`。

---

## 运行测试

```bash
# 全部测试（unit + vitest + ecosystem + e2e）
npm run test:all

# 单个测试文件（Node.js 原生测试运行器 — 大多数测试使用此方式）
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest（MCP server、autoCombo、缓存）
npm run test:vitest

# E2E 测试（需要 Playwright）
npm run test:e2e

# 协议客户端 E2E（MCP 传输、A2A）
npm run test:protocols:e2e

# 生态兼容性测试
npm run test:ecosystem

# 覆盖率关卡：60% 语句/行/函数/分支
npm run test:coverage
npm run coverage:report

# 代码检查 + 格式检查
npm run lint
npm run check

# 关卡验证的线上 Combo 冒烟测试（需要 VPS 访问权限 + 真实服务商积分）
# 会打到真实服务商 — 会产生少量费用。不在 CI 中运行。缺少关卡条件时优雅跳过。
# 需要：ssh root@192.168.0.15 访问权限（从 VPS 拉取只读数据库快照）。
RUN_COMBO_LIVE=1 npm run test:combo:live

# 第三阶段 VPS 线上冒烟 — 纯 Node ESM 脚本，直接打到线上 .15 服务器。
# 需要：ssh root@192.168.0.15 访问权限（通过 SSH sqlite 创建/销毁 Combo）。
# 会打到真实服务商（少量费用）。仅创建/删除 __live_test__* 开头的 Combo。不在 CI 中运行。
# .15 上 REQUIRE_API_KEY=false 所以无需 API Key，但会遵循 COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY 设置。
npm run test:combo:live:vps              # 7 个 HTTP 场景（priority/round-robin/weighted/cost/fusion/auto + health）
npm run test:combo:live:vps:failover     # 额外增加跨服务商容灾切换场景（共 8 个）
```

覆盖率说明：

- `npm run test:coverage` 衡量主要单元测试套件的源码覆盖率，排除 `tests/**`，包含 `open-sse/**`
- Pull Request 必须将覆盖率关口维持在 **60%+**（语句/行/函数/分支）
- 如果 PR 修改了 `src/`、`open-sse/`、`electron/` 或 `bin/` 中的生产代码，必须在同一 PR 中添加或更新自动化测试
- `npm run coverage:report` 打印最近一次覆盖率运行后的逐文件详细报告
- `npm run test:coverage:legacy` 保留旧版指标，用于历史对比
- 分阶段覆盖率提升路线图请参阅 `docs/ops/COVERAGE_PLAN.md`

### Pull Request 要求

发起或合并 PR 前：

- 运行 `npm run test:unit`
- 运行 `npm run test:coverage`
- 确保覆盖率关口维持在 **60%+**（语句/行/函数/分支）
- 涉及生产代码变更时，在 PR 描述中包含新增或修改的测试文件
- 在 CI 中配置了项目密钥的情况下，检查 PR 上的 SonarQube 结果

当前测试状态：**122 个单元测试文件**，覆盖范围包括：

- 服务商翻译器与格式转换
- 速率限制、熔断器与容灾
- 语义缓存、幂等性、进度追踪
- 数据库操作与 Schema（21 个 DB 模块）
- OAuth 流程与认证
- API 端点校验（Zod v4）
- MCP Server 工具与权限域管控
- 记忆与技能系统

---

## 代码风格

- **ESLint** — 提交前运行 `npm run lint`
- **Prettier** — 提交时通过 `lint-staged` 自动格式化（2 空格、分号、双引号、100 字符宽、es5 尾逗号）
- **TypeScript** — 所有 `src/` 代码使用 `.ts`/`.tsx`；`open-sse/` 使用 `.ts`/`.js`；用 TSDoc 编写文档（`@param`、`@returns`、`@throws`）
- **禁止 `eval()`** — ESLint 执行 `no-eval`、`no-implied-eval`、`no-new-func` 规则
- **Zod 校验** — 所有 API 输入校验使用 Zod v4 Schema
- **命名规范**：文件 = camelCase/kebab-case，组件 = PascalCase，常量 = UPPER_SNAKE

---

## 项目结构

```
src/                        # TypeScript（.ts / .tsx）
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # 控制台页面（23 个分区）
│   ├── api/                # API 路由（51 个目录）
│   └── login/              # 认证页面（.tsx）
├── domain/                 # 策略引擎（policyEngine、comboResolver、costRules 等）
├── lib/                    # 核心业务逻辑（.ts）
│   ├── a2a/                # Agent-to-Agent v0.3 协议服务器
│   ├── acp/                # Agent Communication Protocol 注册中心
│   ├── compliance/         # 合规策略引擎
│   ├── db/                 # SQLite 数据库层（21 个模块 + 16 次迁移）
│   ├── memory/             # 持久化会话记忆
│   ├── oauth/              # OAuth 服务商、服务与工具
│   ├── skills/             # 可扩展技能框架
│   ├── usage/              # 用量追踪与成本计算
│   └── localDb.ts          # 仅作 re-export 层 — 切勿在此添加逻辑
├── middleware/              # 请求中间件（promptInjectionGuard）
├── mitm/                   # MITM 代理（证书、DNS、目标路由）
├── shared/
│   ├── components/         # React 组件（.tsx）
│   ├── constants/          # 服务商定义（177 个）、MCP 权限域、14 种路由策略
│   ├── utils/              # 熔断器、清洗器、认证辅助函数
│   └── validation/         # Zod v4 Schema
└── sse/                    # SSE 代理流水线

open-sse/                   # @omniroute/open-sse 工作区
├── executors/              # 14 个服务商专用请求执行器
├── handlers/               # 11 个请求处理器（chat、responses、embeddings、images 等）
├── mcp-server/             # MCP Server（25 个工具、3 种传输、10 个权限域）
├── services/               # 36+ 个服务（combo、autoCombo、rateLimitManager 等）
├── translator/             # 格式翻译器（OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama）
├── transformer/            # Responses API 变换器
└── utils/                  # 22 个工具模块（stream、TLS、proxy、logging）

electron/                   # Electron 桌面应用（跨平台）

tests/
├── unit/                   # Node.js 测试运行器（1,574 个测试文件）
├── integration/            # 集成测试
├── e2e/                    # Playwright 测试
├── security/               # 安全测试
├── translator/             # 翻译器专项测试
└── load/                   # 负载测试

docs/
├── adr/                     # 架构决策记录
├── architecture/            # 系统架构与容灾
├── comparison/              # OmniRoute 与竞品对比
├── compression/             # 压缩指南与规则
├── dev/                     # 开发指南
├── diagrams/                # 架构图
├── frameworks/              # MCP、A2A、OpenCode、记忆、技能
├── guides/                  # 用户指南、Docker、配置、故障排查
├── i18n/                    # 国际化 README 翻译
├── marketing/               # 营销材料
├── ops/                     # 部署、代理、覆盖率、发布
├── providers/               # 服务商文档
├── reference/               # API 参考、环境变量、CLI 工具、免费层
├── releases/                # 发布说明
├── routing/                 # Auto-Combo 引擎、推理回放
├── screenshots/             # 控制台截图
├── security/                # 安全护栏、合规、隐身、Token
└── specs/                   # 设计规格
```

---

## 添加新服务商

### 步骤一：注册服务商常量

在 `src/shared/constants/providers.ts` 中添加条目 — 模块加载时通过 Zod 校验。

### 步骤二：添加执行器（如需自定义逻辑）

在 `open-sse/executors/your-provider.ts` 中创建执行器，继承基础执行器。

### 步骤三：添加翻译器（如非 OpenAI 格式）

在 `open-sse/translator/` 中创建请求/响应翻译器。

### 步骤四：添加 OAuth 配置（如为 OAuth 类服务商）

在 `src/lib/oauth/constants/oauth.ts` 中添加 OAuth 凭证，在 `src/lib/oauth/services/` 中添加服务。

如果上游服务商在其公开的 CLI / 浏览器打包产物中分发了公开的 OAuth client_id/secret 或 Firebase Web API Key，**不要**将其作为字符串字面量嵌入代码。应使用 `open-sse/utils/publicCreds.ts` 中的 `resolvePublicCred()`，并在 `EMBEDDED_DEFAULTS` 中添加掩码字节条目。完整的强制工作流程参见 [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)。

在处理器/执行器内部，发往客户端的错误消息必须经过 `open-sse/utils/error.ts` 中的 `buildErrorBody()` / `sanitizeErrorMessage()` 处理 — 切勿在 Response body 中放入原始的 `err.stack` 或 `err.message`。参见 [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)。

### 步骤五：注册模型

在 `open-sse/config/providerRegistry.ts` 中添加模型定义。

### 步骤六：添加测试

在 `tests/unit/` 中编写单元测试，至少覆盖：

- 服务商注册
- 请求/响应翻译
- 错误处理

---

## Pull Request 检查清单

- [ ] 测试通过（`npm test`）
- [ ] 代码检查通过（`npm run lint`）
- [ ] 构建成功（`npm run build`）
- [ ] 为新增的公开函数与接口添加了 TypeScript 类型
- [ ] 无硬编码的密钥或兜底值
- [ ] 公开的上游凭证通过 `resolvePublicCred()` 嵌入（参见 [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)），严禁字面量形式
- [ ] 错误响应通过 `buildErrorBody()` / `sanitizeErrorMessage()` 处理 — Response body 中不含原始堆栈信息（参见 [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)）
- [ ] Shell 命令（`exec` / `spawn`）通过 `env` 传递运行时值，禁止使用字符串插值
- [ ] 所有输入使用 Zod Schema 校验
- [ ] CHANGELOG 已更新（如有面向用户的变更）
- [ ] 文档已更新（如适用）
- [ ] 未新增 CodeQL / 密钥扫描告警，或每条告警均已附技术说明予以忽略，并引用相关的 `docs/security/` 文档
- [ ] 产生子进程的路由（`/api/mcp/`、`/api/cli-tools/runtime/`）已在 `src/server/authz/routeGuard.ts` 中分类为 `isLocalOnlyPath()` — 参见 [Hard Rule #15](docs/security/ROUTE_GUARD_TIERS.md)
- [ ] 提交信息中不含 `Co-Authored-By` 尾部字段 — 提交必须仅出现在仓库所有者的 Git 身份下（Hard Rule #16）

---

## 发布

发布通过 `/generate-release` 工作流管理。当新的 GitHub Release 创建时，包会通过 GitHub Actions **自动发布到 npm**。

VPS 部署时，请使用 `npm run build:release`（而非 `npm run build`）— 它会执行清理重建，
将打包产物组装到 `dist/`，并写入 `dist/BUILD_SHA` 哨兵文件。
然后使用 `/deploy-vps-*-cc` 技能，将 `dist/` rsync 到远端 `app/` 目录。

---

## 获取帮助

- **架构**：参见 [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md)
- **API 参考**：参见 [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md)
- **安全文档**：[`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md)、[`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md)、[`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md)、[`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **运维文档**：[`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **问题反馈**：[github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **架构决策记录**：参见 `docs/adr/` 目录
