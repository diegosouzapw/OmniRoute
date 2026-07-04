# CLAUDE.md (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md)

---

该文件为在此代码库中使用 Claude Code (claude.ai/code) 提供指导。

## 快速开始

```bash
npm install                    # 安装依赖（自动从 .env.example 生成 .env）
npm run dev                    # 开发服务器，地址为 http://localhost:20128
npm run build                  # 生产构建（Next.js 16 standalone）
npm run lint                   # ESLint（预期 0 错误；警告为已有）
npm run typecheck:core         # TypeScript 检查（应无错误）
npm run typecheck:noimplicit:core  # 严格检查（无隐式 any）
npm run test:coverage          # 单元测试 + 覆盖率门禁（60/60/60/60 — 语句/行/函数/分支）
npm run check                  # lint + test 组合
npm run check:cycles           # 检测循环依赖
```

### 运行测试

```bash
# 运行单个测试文件（Node.js 原生测试运行器 — 大部分测试）
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest（MCP 服务器、autoCombo、缓存）
npm run test:vitest

# 全部测试套件
npm run test:all
```

完整测试矩阵见 `CONTRIBUTING.md` → "Running Tests"。深度架构见 `AGENTS.md`。

---

## 项目概览

**OmniRoute** — 统一的 AI 代理/路由。一个端点接入 236 家 LLM 服务商，自动容灾。

| 层级         | 位置                    | 用途                                                                                 |
| ------------ | ----------------------- | ------------------------------------------------------------------------------------ |
| API 路由     | `src/app/api/v1/`       | Next.js App Router — 入口点                                                          |
| 处理器       | `open-sse/handlers/`    | 请求处理（对话、嵌入等）                                                             |
| 执行器       | `open-sse/executors/`   | 服务商特定的 HTTP 分发                                                               |
| 翻译器       | `open-sse/translator/`  | 格式转换（OpenAI↔Claude↔Gemini）                                                     |
| 转换器       | `open-sse/transformer/` | Responses API ↔ Chat Completions                                                     |
| 服务         | `open-sse/services/`    | Combo 路由、速率限制、缓存等                                                         |
| 数据库       | `src/lib/db/`           | SQLite 领域模块（94 个文件，106 个迁移）                                             |
| 领域/策略    | `src/domain/`           | 策略引擎、成本规则、容灾逻辑                                                         |
| MCP 服务器   | `open-sse/mcp-server/`  | 94 个工具（34 个基础 + memory/skill/agentSkill/pool/notion/obsidian/gamification/plugin 模块），3 种传输（stdio / SSE / Streamable HTTP），30 个权限域 |
| A2A 服务器   | `src/lib/a2a/`          | JSON-RPC 2.0 代理协议                                                                |
| 技能         | `src/lib/skills/`       | 可扩展技能框架                                                                       |
| 记忆         | `src/lib/memory/`       | 持久化对话记忆                                                                       |

Monorepo：`src/`（Next.js 16 应用）、`open-sse/`（流式引擎 workspace）、`electron/`（桌面应用）、`tests/`、`bin/`（CLI 入口点）。

---

## 请求管线

```
Client → /v1/chat/completions (Next.js 路由)
  → CORS → Zod 校验 → 鉴权？ → 策略检查 → 提示注入安全护栏
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → 缓存检查 → 速率限制 → Combo 路由？
      → resolveComboTargets() → 每个目标调用 handleSingleModel()
    → translateRequest() → getExecutor() → executor.execute()
      → 向上游发送 fetch() → 带退避重试
    → 响应转换 → SSE 流或 JSON
    → 如果是 Responses API：responsesTransformer.ts TransformStream
```

API 路由遵循一致的模式：`路由 → CORS 预检 → Zod 请求体校验 → 可选鉴权（extractApiKey/isValidApiKey）→ API Key 策略执行 → 处理器委派（open-sse）`。没有全局 Next.js 中间件 — 拦截在路由级别进行。

**Combo 路由** (`open-sse/services/combo.ts`)：17 种策略（priority、weighted、fill-first、round-robin、P2C、random、least-used、cost-optimized、reset-aware、reset-window、headroom、strict-random、auto、lkgp、context-optimized、context-relay、fusion）。每个目标调用 `handleSingleModel()`，该函数封装了 `handleChatCore()` 并附带逐目标的错误处理和熔断器检查。`fusion` 策略是一个例外：它并行扇出到一组模型面板，然后由裁判模型综合出一个最终答案 (`open-sse/services/fusion.ts`)。关于 12 因子 Auto-Combo 评分及完整策略表，见 `docs/routing/AUTO-COMBO.md`；关于 3 层容灾机制，见 `docs/architecture/RESILIENCE_GUIDE.md`。

---

## 容灾运行时状态

OmniRoute 有三个彼此相关但各自独立的临时故障机制。调试路由行为时请保持它们的作用域分离。快速概览参见 [3 层容灾示意图](./docs/diagrams/exported/resilience-3layers.svg)（源文件：[docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd)）。

### 服务商熔断器

**作用域**：整个服务商，例如 `glm`、`openai`、`anthropic`。

**目的**：当一个服务商在上游/服务层面反复失败时，停止向其发送流量，避免一个不健康的服务商拖慢所有请求。

**实现**：

- 核心类：`src/shared/utils/circuitBreaker.ts`
- 对话门禁/执行接线：`src/sse/handlers/chatHelpers.ts`、`src/sse/handlers/chat.ts`
- 运行时状态 API：`src/app/api/monitoring/health/route.ts`
- 共享封装：`open-sse/services/accountFallback.ts`
- 持久化状态表：`domain_circuit_breakers`

**状态**：

- `CLOSED`：允许正常流量。
- `OPEN`：服务商被暂时阻断；调用方收到 provider-circuit-open 响应，或 Combo 路由跳转到其他目标。
- `HALF_OPEN`：重置超时已过；允许一次探测请求。成功则闭合熔断器，失败则重新打开。

**默认值** (`open-sse/config/constants.ts`)：

- OAuth 服务商：阈值 `3`，重置超时 `60s`。
- API Key 服务商：阈值 `5`，重置超时 `30s`。
- 本地服务商：阈值 `2`，重置超时 `15s`。

仅服务商级别的失败状态才应触发服务商熔断器：

```ts
(408, 500, 502, 503, 504);
```

不要为普通的账户/密钥/模型错误（如大多数 `401`、`403` 或 `429` 情况）触发整个服务商的熔断器。这些通常归属于连接冷却或模型锁定。通用 API Key 服务商的 `403` 应该是可恢复的，除非被归类为终端服务商/账户错误。

熔断器采用惰性恢复，而不是后台定时器。当 `OPEN` 过期时，对 `getStatus()`、`canExecute()` 和 `getRetryAfterMs()` 的读取会将状态刷新为 `HALF_OPEN`，这样仪表盘和 Combo 候选构建器就不会无限期地排除已过期的服务商。

### 连接冷却

**作用域**：单个服务商连接/账户/密钥。

**目的**：暂时跳过一个有问题的密钥/账户，同时让同一服务商的其他连接继续处理请求。

**实现**：

- 写入/更新路径：`src/sse/services/auth.ts::markAccountUnavailable()`
- 账户选择/过滤：`src/sse/services/auth.ts::getProviderCredentials...`
- 冷却计算：`open-sse/services/accountFallback.ts::checkFallbackError()`
- 设置：`src/lib/resilience/settings.ts`

服务商连接上的重要字段：

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

在选择账户期间，满足以下条件时连接被跳过：

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

冷却同样是惰性的：当 `rateLimitedUntil` 已过期时，连接重新变为可用。成功使用后，`clearAccountError()` 会清除 `testStatus`、`rateLimitedUntil`、错误字段和 `backoffLevel`。

默认连接冷却行为：

- OAuth 基础冷却：`5s`。
- API Key 基础冷却：`3s`。
- API Key 的 `429` 应优先使用上游重试提示（`Retry-After`、重置头或可解析的重置文本），如果可用的话。
- 连续的可恢复失败采用指数退避：

```ts
baseCooldownMs * 2 ** failureIndex;
```

防惊群效应守卫阻止同一连接上的并发失败反复延长冷却时间或重复递增 `backoffLevel`。

终端状态不是冷却行为。`banned`、`expired` 和 `credits_exhausted` 应当保持不可用，直到凭据/设置发生变化或运维人员手动重置。不要用临时冷却状态覆盖终端状态。

### 模型锁定

**作用域**：服务商 + 连接 + 模型。

**目的**：当只有一个模型不可用或被该连接配额限制时，避免禁用整个连接。

示例：

- 按模型配额的服务商返回 `429`。
- 本地服务商对某个缺失模型返回 `404`。
- 服务商特定的模式/模型权限失败，例如选定的 Grok 模式。

模型锁定位于 `open-sse/services/accountFallback.ts` 中，允许同一连接继续为其他模型提供服务。

### 调试指导

- 如果某个服务商的所有密钥都被跳过，检查服务商熔断器状态和每个连接的 `rateLimitedUntil`/`testStatus`。
- 如果某个服务商在重置窗口后似乎被永久排除，检查代码是否在直接读取原始的 `state`，而不是使用 `getStatus()`/`canExecute()`。
- 如果某个服务商的一个密钥失败但其他密钥应该可用，优先采用连接冷却而非服务商熔断器。
- 如果只有一个模型失败，优先采用模型锁定而非连接冷却。
- 如果一个状态应该自动恢复，它应该有一个未来的时间戳/重置超时，以及一个能刷新过期状态的读取路径。永久状态需要手动修改凭据或配置。

---

## 关键约定

### 代码风格

- **2 空格**，分号，双引号，100 字符宽度，es5 尾逗号（由 lint-staged 通过 Prettier 强制执行）
- **导入顺序**：外部 → 内部 (`@/`、`@omniroute/open-sse`) → 相对路径
- **命名规范**：文件=camelCase/kebab、组件=PascalCase、常量=UPPER_SNAKE
- **ESLint**：`no-eval`、`no-implied-eval`、`no-new-func` 在所有位置均为 error；`no-explicit-any` 在 `open-sse/` 和 `tests/` 中为 warn
- **TypeScript**：`strict: false`，目标 ES2022，模块 esnext，解析策略 bundler。首选显式类型。

### 数据库

- **始终**通过 `src/lib/db/` 领域模块操作 — **绝不**在路由或处理器中直接编写 SQL
- **绝不**向 `src/lib/localDb.ts` 添加逻辑（仅作为再导出层）
- **绝不**从 `localDb.ts` 做 barrel 导入 — 应导入具体的 `db/` 模块
- 数据库单例：`getDbInstance()`，来自 `src/lib/db/core.ts`（WAL 日志）
- 迁移：`src/lib/db/migrations/` — 版本化的 SQL 文件，幂等，在事务中运行

### 错误处理

- 使用 try/catch 并指定错误类型，通过 pino 上下文记录日志
- 绝不在 SSE 流中静默吞掉错误 — 使用 abort 信号进行清理
- 返回正确的 HTTP 状态码（4xx/5xx）

### 安全

- **绝不**使用 `eval()`、`new Function()` 或隐式 eval
- 使用 Zod Schema 校验所有输入
- 静态加密凭据（AES-256-GCM）
- 上游请求头黑名单：`src/shared/constants/upstreamHeaders.ts` — 编辑时保持 sanitize、Zod Schema 和单元测试一致
- **公开的上游凭据**（Gemini/Antigravity/Windsurf 风格的 OAuth client_id/secret + 从公开 CLI 提取的 Firebase Web 密钥）：**必须**通过 `open-sse/utils/publicCreds.ts` 中的 `resolvePublicCred()` 嵌入 — **绝不**使用字符串字面量。强制性模式见 `docs/security/PUBLIC_CREDS.md`。
- **错误响应**（HTTP / SSE / 执行器 / MCP 处理器）：**必须**通过 `open-sse/utils/error.ts` 中的 `buildErrorBody()` 或 `sanitizeErrorMessage()` 传递 — **绝不**在响应体中放入原始的 `err.stack` 或 `err.message`。详见 `docs/security/ERROR_SANITIZATION.md`。
- **由变量构建的 Shell 命令**：当使用需要运行时值的脚本调用 `exec()`/`spawn()` 时，通过 `env` 选项传递（自动 shell 转义）— **绝不**将不受信任的外部路径字符串插值到脚本体中。参考：`src/mitm/cert/install.ts::updateNssDatabases`。
- **安全优先的库**（[tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)）：在添加新的安全性敏感功能时，优先选择 Helmet.js、DOMPurify、ssrf-req-filter、safe-regex、Google Tink，而非自定义实现。

---

## 常见修改场景

### 新增服务商

1. 在 `src/shared/constants/providers.ts` 中注册（加载时使用 Zod 校验）
2. 如果存在自定义逻辑，在 `open-sse/executors/` 中添加执行器（继承 `BaseExecutor`）
3. 如果非 OpenAI 格式，在 `open-sse/translator/` 中添加翻译器
4. 如果是基于 OAuth 的，在 `src/lib/oauth/constants/oauth.ts` 中添加 OAuth 配置 — 如果上游 CLI 附带公开的 client_id/secret，通过 `resolvePublicCred()` 嵌入（参见 `docs/security/PUBLIC_CREDS.md`），**绝不**使用字面量
5. 在 `open-sse/config/providerRegistry.ts` 中注册模型
6. 在 `tests/unit/` 中编写测试（如果添加了新的嵌入式默认值，请包含 publicCreds 形态断言）

### 新增 API 路由

1. 在 `src/app/api/v1/your-route/` 下创建目录
2. 创建 `route.ts`，包含 `GET`/`POST` 处理器
3. 遵循模式：CORS → Zod 请求体校验 → 可选鉴权 → 处理器委派
4. 处理器放在 `open-sse/handlers/` 中（从那里导入，不要内联）
5. 错误响应使用 `open-sse/utils/error.ts` 中的 `buildErrorBody()` / `errorResponse()`（自动脱敏 — 绝不在响应体中放入原始的 `err.stack` 或 `err.message`）。详见 `docs/security/ERROR_SANITIZATION.md`。
6. 添加测试 — 包含至少一个断言，验证错误响应不会泄露堆栈跟踪 (`!body.error.message.includes("at /")`)

### 新增数据库模块

1. 创建 `src/lib/db/yourModule.ts` — 从 `./core.ts` 导入 `getDbInstance`
2. 为你的领域表导出 CRUD 函数
3. 如果需要新表，在 `src/lib/db/migrations/` 中添加迁移
4. 从 `src/lib/localDb.ts` 再导出（仅添加到再导出列表）
5. 编写测试

### 新增 MCP 工具

1. 在 `open-sse/mcp-server/tools/` 中添加工具定义，包含 Zod 输入 Schema + async 处理器
2. 在工具集中注册（由 `createMcpServer()` 连接）
3. 分配到适当的权限域
4. 编写测试（工具调用记录到 `mcp_audit` 表）

### 新增 A2A 技能

1. 在 `src/lib/a2a/skills/` 中创建技能（已有 5 个：smart-routing、quota-management、provider-discovery、cost-analysis、health-report）
2. 技能接收任务上下文（消息、元数据）→ 返回结构化结果
3. 在 `src/lib/a2a/taskExecution.ts` 的 `A2A_SKILL_HANDLERS` 中注册
4. 在 `src/app/.well-known/agent.json/route.ts`（Agent Card）中暴露
5. 在 `tests/unit/` 中编写测试
6. 在 `docs/frameworks/A2A-SERVER.md` 技能表中记录

### 新增云代理

1. 在 `src/lib/cloudAgent/agents/` 中创建代理类，继承 `CloudAgentBase`（已有 3 个：codex-cloud、devin、jules）
2. 实现 `createTask`、`getStatus`、`approvePlan`、`sendMessage`、`listSources`
3. 在 `src/lib/cloudAgent/registry.ts` 中注册
4. 如需要，添加 OAuth/凭据处理 (`src/lib/oauth/providers/`)
5. 编写测试并在 `docs/frameworks/CLOUD_AGENT.md` 中记录

### 新增嵌入式服务

1. 在 `src/lib/services/installers/{name}.ts` 中参照 `ninerouter.ts` 创建安装器（使用 `installers/utils.ts` 中的 `runNpm` — 无 shell 插值，硬规则 #13）。
2. 在 `src/lib/services/bootstrap.ts` 中注册该服务（添加到 `SERVICES[]` 数组并扩展 `buildSpawnArgsFactory()`）。
3. 在 `src/lib/db/migrations/` 中为新服务添加数据库种子行（`version_manager` 表，`status='not_installed'`，`auto_start=0`）。
4. 在 `src/app/api/services/{name}/` 下创建 7 个 API 端点（`_lib.ts`、`install`、`start`、`stop`、`restart`、`update`、`status`、`auto-start`）。所有错误通过 `createErrorResponse()` 委托。共享的 `logs` 端点已通过 `[name]/logs/route.ts` 连接。
5. 确认 `/api/services/` 在 `src/server/authz/routeGuard.ts` 的 `LOCAL_ONLY_API_PREFIXES` 中；如果添加了新的前缀，添加一个测试断言 `isLocalOnlyPath()` 返回 `true`（硬规则 #17）。
6. 在 `src/app/(dashboard)/dashboard/providers/services/tabs/` 中添加 UI 标签页，复用 `ServiceStatusCard`、`ServiceLifecycleButtons`、`ServiceLogsPanel`。
7. 在 `docs/frameworks/EMBEDDED-SERVICES.md`（更新 §1 服务表 + §4 API 参考）和 `docs/openapi.yaml` 中记录。
8. 编写测试：单元测试 (`tests/unit/services/`)、集成测试 (`tests/integration/services/`，由 `RUN_SERVICES_INT=1` 门控），并更新 `docs/ops/RELEASE_CHECKLIST.md` 的冒烟测试章节。

### 新增安全护栏 / 评估 / 技能 / Webhook 事件

- 安全护栏：`src/lib/guardrails/` → 文档：`docs/security/GUARDRAILS.md`
- 评估套件：`src/lib/evals/` → 文档：`docs/frameworks/EVALS.md`
- 技能（沙箱）：`src/lib/skills/` → 文档：`docs/frameworks/SKILLS.md`
- Webhook 事件：`src/lib/webhookDispatcher.ts` → 文档：`docs/frameworks/WEBHOOKS.md`

---

## 参考文档

对于任何非平凡修改，请先阅读对应的深度文档：

| 领域                                    | 文档                                                     |
| --------------------------------------- | -------------------------------------------------------- |
| 仓库导航                                | `docs/architecture/REPOSITORY_MAP.md`                    |
| 架构                                    | `docs/architecture/ARCHITECTURE.md`                      |
| 工程参考                                | `docs/architecture/CODEBASE_DOCUMENTATION.md`            |
| Auto-Combo（12 因子评分，17 种策略）    | `docs/routing/AUTO-COMBO.md`                             |
| 容灾（3 种机制）                        | `docs/architecture/RESILIENCE_GUIDE.md`                  |
| 推理重播                                | `docs/routing/REASONING_REPLAY.md`                       |
| 技能框架                                | `docs/frameworks/SKILLS.md`                              |
| 记忆系统（FTS5 + Qdrant）               | `docs/frameworks/MEMORY.md`                              |
| 云代理                                  | `docs/frameworks/CLOUD_AGENT.md`                         |
| 安全护栏（PII / 注入 / 视觉）           | `docs/security/GUARDRAILS.md`                            |
| 公开上游凭据（Gemini 等）               | `docs/security/PUBLIC_CREDS.md`                          |
| 错误消息脱敏                            | `docs/security/ERROR_SANITIZATION.md`                    |
| 评估                                    | `docs/frameworks/EVALS.md`                               |
| 合规 / 审计                             | `docs/security/COMPLIANCE.md`                            |
| Webhook                                 | `docs/frameworks/WEBHOOKS.md`                            |
| 授权管线                                | `docs/architecture/AUTHZ_GUIDE.md`                       |
| 隐身（TLS / 指纹）                      | `docs/security/STEALTH_GUIDE.md`                         |
| 代理协议（A2A / ACP / Cloud）           | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`               |
| MCP 服务器                              | `docs/frameworks/MCP-SERVER.md`                          |
| A2A 服务器                              | `docs/frameworks/A2A-SERVER.md`                          |
| API 参考 + OpenAPI                      | `docs/reference/API_REFERENCE.md` + `docs/openapi.yaml`  |
| 服务商目录（自动生成）                  | `docs/reference/PROVIDER_REFERENCE.md`                   |
| 发布流程                                | `docs/ops/RELEASE_CHECKLIST.md`                          |
| 嵌入式服务                              | `docs/frameworks/EMBEDDED-SERVICES.md`                   |
| 质量门禁（约 48 个脚本，允许列表策略）  | `docs/architecture/QUALITY_GATES.md`                     |

---

## 测试

| 类型                    | 命令                                                                         |
| ----------------------- | ---------------------------------------------------------------------------- |
| 单元测试                | `npm run test:unit`                                                          |
| 单个文件                | `node --import tsx/esm --test tests/unit/file.test.ts`                       |
| Vitest（MCP, autoCombo）| `npm run test:vitest`                                                        |
| E2E（Playwright）       | `npm run test:e2e`                                                           |
| 协议 E2E（MCP+A2A）     | `npm run test:protocols:e2e`                                                 |
| 生态兼容                | `npm run test:ecosystem`                                                     |
| 覆盖率门禁              | `npm run test:coverage`（60/60/60/60 — 语句/行/函数/分支）                     |
| 覆盖率报告              | `npm run coverage:report`                                                    |

**PR 规则**：如果你修改了 `src/`、`open-sse/`、`electron/` 或 `bin/` 中的生产代码，必须在同一个 PR 中包含或更新测试。

**测试层级偏好**：单元测试优先 → 集成测试（多模块或数据库状态）→ E2E（仅 UI/工作流）。在修复 bug 之前或同时，将 bug 复现编码为自动化测试。

**两个测试运行器都必须通过**：`npm run test:unit`（Node 原生 — 大部分测试）和 `npm run test:vitest`（MCP 服务器、autoCombo、缓存）覆盖**不重叠的文件**。两者均在 CI 中连接（jobs `test-unit` 和 `test-vitest`），合并前必须都通过。一个只有单一套件通过的 PR 可能悄无声息地引入有问题的 MCP 工具或路由回退。

**Bug 修复 / Issue 分类协议（硬规则 #18）**：每个针对已报告 Issue 的修复必须通过以下之一验证 — 无例外：

1. **TDD（首选）** — 编写复现 bug 的失败测试 → 修复 → 确认测试通过。该测试成为永久回归守卫。只修改测试能证明需要修改的文件，不多改。
2. **真实环境测试（当 TDD 不可行时）** — 部署到生产 VPS (`root@192.168.0.15`)，执行有文档记录的真实测试。在 PR 描述中记录确切的命令和结果。适用于：OAuth 上游流程、Cloudflare/WS 上游行为、仅 UI 回退、硬件相关行为。
3. "本地跑通但未写测试"不算数。没有测试或 VPS 验证记录的修复不算修复 — 只是猜测。

为什么这一点很重要：修复 bug A 的同时引入 bug B 比不修复更糟。TDD/VPS 门禁强制控制变更范围 — 你只改动失败测试证明有问题的地方。曾经见效的案例：#3090 (claude-web 403)、#3113 (WS HTTP fallback)、#3052 (heap-guard auto-calibration)。

**Copilot 覆盖率策略**：当 PR 修改了生产代码且覆盖率低于 60%（语句/行/函数/分支）时，不要只是报告 — 请添加或更新测试，重新运行覆盖率门禁，然后请求确认。在 PR 报告中包含运行的命令、修改的测试文件和最终覆盖率结果。

---

## 规划与调研产物（superpowers、deep-research）

`_tasks/` 是一个**独立的隔离 git 仓库**，被主仓库的 `.gitignore` 忽略（`.gitignore` → `_tasks/`）。它是工作产物的规范存放地 — 计划、方案/设计、调研、交接 — 让它们**在自己的仓库中享受版本控制**，而不是污染主 OmniRoute 树。

**硬规则 — 绝不要将 superpowers / 规划 / 调研的输出写入 `docs/` 或仓库根目录。** superpowers 技能附带的默认值指向 `docs/…`（`writing-plans` → `docs/superpowers/plans/`，`brainstorming` → `docs/superpowers/specs/`）。这些默认值**在此处被覆盖**。每当你在此项目中调用 superpowers（或任何计划/方案/调研生成器）时，改为保存到 `_tasks/`，使用相同的文件名约定：

| 产物（技能）                       | 默认（不要用）            | 保存到这里                                                     |
| --------------------------------- | ------------------------- | -------------------------------------------------------------- |
| 计划 (`writing-plans`)            | `docs/superpowers/plans/`  | `_tasks/superpowers/plans/YYYY-MM-DD-<feature>.md`             |
| 方案 / 设计 (`brainstorming`)     | `docs/superpowers/specs/`  | `_tasks/superpowers/specs/YYYY-MM-DD-<topic>-design.md`        |
| 调研 (`deep-research`, 临时)      | `docs/research/`           | `_tasks/research/…`                                            |
| 交接 (`/handoff`)                 | —                          | `_tasks/hands-off/<YYYY-MM-DD>_<branch>_v<versão>_sess-<id>/`  |

当 superpowers 技能通告一个路径如 "saved to `docs/superpowers/plans/…`" 时，在写入前改写为 `_tasks/…` 等效路径。在 `_tasks/` 仓库内部提交这些产物 (`git -C _tasks …`)，绝不在主仓库中提交。

## Git 工作流

```bash
# 绝不要直接提交到 main
git checkout -b feat/your-feature
git commit -m "feat: describe your change"
git push -u origin feat/your-feature
```

**分支前缀**：`feat/`、`fix/`、`refactor/`、`docs/`、`test/`、`chore/`

**Commit 格式**（约定式提交）：`feat(db): add circuit breaker` — 作用域：`db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`

**Husky 钩子**：

- **pre-commit**：lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**：快速确定性门禁（`check:any-budget:t11` + `check:tracked-artifacts`）；故意排除 `test:unit`（太慢 — 由 CI `test-unit` job 覆盖）。于 2026-06-13 激活（质量门禁 Fase 6A.12）。

### Worktree 隔离（每次开发任务必做）

多个会话/代理并行操作此仓库。主工作区是**共享的**，因此在其上进行 `git checkout`/分支切换会静默丢弃另一个会话的未提交工作，并将在运行中的任何其他内容从分支上拉走（事故：2026-06-05、2026-06-13）。

**规则：绝不在共享的主工作区上进行开发。每个任务有其自己的专属分支的独立 git worktree，且必须在创建之前与运维人员确认基础分支。**

1. **先问 — 从哪个基础分支？** 在创建任何内容之前，通过 `AskUserQuestion` 询问运维人员（除非他们已经告诉你了）新 worktree/分支应该从哪个分支切出。不要假设 `main` 或"我现在在哪个分支上" — 通常是活跃的 `release/vX.Y.Z`，但也可能是其他 feature/release 分支。需要明确获取基础分支。
2. **基于该基础分支创建隔离的 worktree + 分支**（绝不复用主工作区）。
   **🔴 强制路径：每个 worktree 必须位于 `.claude/worktrees/` 下 — 且不得放在任何其他位置。**
   这是唯一规范的位置（与原生 `EnterWorktree` 工具使用的目录相同）。该目录被 gitignore，也在 `tsconfig.json` / `.dockerignore` 排除列表中，因此 worktree 绝不会泄漏到构建范围内。**绝不**使用 `.worktrees/`、仓库根目录或任何其他路径 — 位于 `.claude/worktrees/` 之外的 worktree (a) 逃脱了构建范围的排除，会毒化 `next build`（`tsconfig` 的 `include: **/*` 将 glob 扩展约 70 倍 → OOM；事故 2026-06-25），且 (b) 将 worktree 分散在两个目录中。

   ```bash
   BASE_BRANCH="release/vX.Y.Z"          # ← 运维人员在步骤 1 中确认的分支
   TASK="feat/your-feature"               # feat/ fix/ refactor/ docs/ test/ chore/
   git fetch origin "$BASE_BRANCH"
   git worktree add ".claude/worktrees/${TASK##*/}" -b "$TASK" "origin/$BASE_BRANCH"
   cd ".claude/worktrees/${TASK##*/}"
   # 从主工作区符号链接 node_modules，省去每个 worktree 的 npm install：
   ln -s "$(git -C <main_checkout> rev-parse --show-toplevel)/node_modules" node_modules
   ```

   在 Claude Code 中优先使用原生的 `EnterWorktree` 工具（它已经在 `.claude/worktrees/` 下创建 worktree）：先用上述命令创建 worktree，然后用其 `path` 调用 `EnterWorktree`。

3. **工作、提交、推送、发起 PR — 全部在 worktree 内部完成。** 绝不在另一个会话可能共享的 worktree 内 `git checkout` 不同分支。
4. **完成后仅拆除你自己的** worktree + 分支，从主工作区执行：
   `git worktree remove .claude/worktrees/<dir>` 然后 `git branch -D <task>`。绝不要通配删除 `fix/*`/`feat/*` — 其他会话保留自己的分支；只按名称删除你创建的分支。
5. **绝不要触碰其他会话的 worktree、分支或未提交的更改。** 如果 `git worktree list` 显示了你未创建的 worktree，请不要动它们。每次会话结束时，将主工作区恢复到开始时所在的分支（活跃的 `release/vX.Y.Z`，绝不是 `main`）。

---

## 环境

- **运行时**：Node.js ≥22.0.0 <23 || ≥24.0.0 <27，ES Modules
- **TypeScript**：6.0+，目标 ES2022，模块 esnext，解析策略 bundler
- **路径别名**：`@/*` → `src/`，`@omniroute/open-sse` → `open-sse/`，`@omniroute/open-sse/*` → `open-sse/*`
- **默认端口**：20128（API + 仪表盘在同一端口）
- **数据目录**：`DATA_DIR` 环境变量，默认 `~/.omniroute/`
- **关键环境变量**：`PORT`、`JWT_SECRET`、`API_KEY_SECRET`、`INITIAL_PASSWORD`、`REQUIRE_API_KEY`、`APP_LOG_LEVEL`
- 设置：`cp .env.example .env`，然后生成 `JWT_SECRET`（`openssl rand -base64 48`）和 `API_KEY_SECRET`（`openssl rand -hex 32`）

---

## 质量门禁与棘轮

OmniRoute 有**约 48 个质量门禁脚本**（`scripts/check/` + `scripts/quality/`），分布在
`.github/workflows/ci.yml` 的 **9 个门禁执行 job**（`lint`、`quality-gate`、
`quality-extended`、`docs-sync-strict`、`i18n-ui-coverage`、`i18n`、`pr-test-policy`、
`test-vitest`、`sonarqube`）中，外加 `quality.yml` 快速门禁 job（PR→`release/**`）和
3 个夜间工作流（`nightly-property`、`nightly-resilience`、`nightly-llm-security`；
`nightly-mutation` 合并后加入）。完整清单、按 job 分解和操作流程见 [`docs/architecture/QUALITY_GATES.md`](docs/architecture/QUALITY_GATES.md)。

**快速参考：**

- `lint` + `docs-sync-strict` job 中的门禁：通过/失败策略门禁 —
  修复违规，或在带有理由注释 + 跟踪 Issue 的情况下添加到允许列表。
- `quality-gate` job 中的门禁：棘轮 — 指标（ESLint 警告、代码覆盖率、重复率、复杂度）不得相对于 `quality-baseline.json` 回退。当某个指标确实改善时，通过 `npm run quality:ratchet -- --update` 更新。
- Job `test-vitest` 运行 `npm run test:vitest`（MCP 工具、autoCombo、缓存）— 阻断性。
  `test:vitest:ui` 在 UI 组件测试分类完成前为咨询性。

**允许列表策略（简短版）：** 修复原因；仅在无法在同一 PR 中修复已有违规时使用允许列表。添加带理由和 Issue 编号的注释。陈旧的允许列表条目（抑制不再存在的违规）将被 Fase 6A.3 添加的陈旧检测捕获。

---

## 硬规则

1. 绝不要提交密钥或凭据
2. 绝不要向 `localDb.ts` 添加逻辑
3. 绝不要使用 `eval()` / `new Function()` / 隐式 eval
4. 绝不要直接提交到 `main`
5. 绝不要在路由中编写原始 SQL — 使用 `src/lib/db/` 模块
6. 绝不要在 SSE 流中静默吞掉错误
7. 始终用 Zod Schema 校验输入
8. 修改生产代码时始终包含测试
9. 覆盖率不得回退到 `quality-baseline.json` 中冻结的基线以下（棘轮）；绝对下限为 60%（语句/行/函数/分支）。仅当覆盖率确实改善时通过 `npm run quality:ratchet -- --update` 更新基线。见 `docs/architecture/QUALITY_GATES.md`。
10. 绝不要在未经运维人员明确批准的情况下绕过 Husky 钩子（`--no-verify`、`--no-gpg-sign`）。
11. 绝不要将公开的上游 OAuth client_id/secret 或 Firebase Web 密钥作为字符串字面量嵌入 — 始终通过 `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`)。见 `docs/security/PUBLIC_CREDS.md`。
12. 绝不要在 HTTP / SSE / 执行器响应中返回原始的 `err.stack` / `err.message` — 始终通过 `buildErrorBody()` 或 `sanitizeErrorMessage()` (`open-sse/utils/error.ts`)。见 `docs/security/ERROR_SANITIZATION.md`。
13. 绝不要将外部路径或运行时值字符串插值到传递给 `exec()`/`spawn()` 的 Shell 脚本中 — 应通过 `env` 选项传递。参考：`src/mitm/cert/install.ts::updateNssDatabases`。
14. 绝不要在不检查 (a) 上述模式文档是否适用辅助工具，以及 (b) 在驳回注释中记录技术理由的情况下，驳回 CodeQL / Secret-Scanning 告警。先例：`js/stack-trace-exposure` 对已通过 `sanitizeErrorMessage()` 传递的调用点报告 — 这是已知的 CodeQL 局限性（无法识别自定义脱敏器）— 以 `false positive` 驳回，引用 `docs/security/ERROR_SANITIZATION.md`。
15. 绝不要在未在 `src/server/authz/routeGuard.ts` 中进行 `isLocalOnlyPath()` 分类的情况下暴露会派生子进程的路由（`/api/mcp/`、`/api/cli-tools/runtime/`）。loopback 强制在所有鉴权检查之前无条件执行 — 通过隧道泄露的 JWT 无法触发派生子进程。见 `docs/security/ROUTE_GUARD_TIERS.md`。
16. **绝不在任何 commit/PR 元数据中标注或宣传 AI 助手、LLM 或自动化账户。** 两种被禁止的形式，两者等效 — 它们将署名归给机器人账户（或宣传 AI 作者身份），隐藏真实作者 (`diegosouzapw`)：**(a)** 命名 AI/机器人的 `Co-Authored-By` 尾注（例如包含 "Claude"、"GPT"、"Copilot"、"Bot" 的名称；使用 `anthropic.com` / `openai.com` / 机器人拥有的 `noreply.github.com` 地址的电子邮件）；**(b)** commit 消息、PR 标题/正文或 CHANGELOG 中任何位置的 AI 生成页脚或描述 — 例如 `🤖 Generated with [Claude Code]`、"Generated with Claude Code"、"Made with <AI tool>"，或任何 `Co-authored-by: Claude/GPT/Copilot` 行。此规则**覆盖任何自动追加此类页脚的框架、模板或工具默认行为**（例如 Claude Code PR 正文/commit 的默认页脚）— 在推送前将其剥离；不要让它进入 commit、PR 或 CHANGELOG。人类协作者 — 包括上游 PR 作者和被移植到 OmniRoute 的 Issue 报告者 — 可以且应该使用标准的 `Co-authored-by: Name <email>` 尾注署名；上游移植工作流（`/port-upstream-features`、`/port-upstream-issues`）依赖于此。
17. 绝不要在未在 `src/server/authz/routeGuard.ts` 中进行 `isLocalOnlyPath()` 分类的情况下暴露 `/api/services/` 或 `/dashboard/providers/services/*/embed/` 下的路由。这些路由可以派生子进程（`npm install`、`node`）。loopback 强制在所有鉴权检查之前无条件执行 — 通过隧道泄露的 JWT 无法触发派生子进程。见 `docs/security/ROUTE_GUARD_TIERS.md`。
18. 每个 Bug 修复必须在交付前验证：一个失败后通过的单元/集成测试（TDD）或一份有文档记录的生产 VPS (192.168.0.15) 真实测试。两者都缺失的修复不会被合并。见测试 → "Bug 修复 / Issue 分类协议"了解完整决策树。
19. 绝不在共享的主工作区上进行开发。每次开发任务运行在属于自己的专属分支的独立 git worktree 中，且必须在创建 worktree/分支之前与运维人员确认基础分支（例如通过 `AskUserQuestion`）— 绝不要假设 `main` 或当前检出的分支。在共享工作区中的 `git checkout` 会静默销毁其他会话的未提交工作。只拆除你创建的 worktree/分支（按名称，绝不使用 `fix/*`/`feat/*` 通配符），不要动其他会话的 worktree，结束时回到开始所在的分支（活跃的 `release/vX.Y.Z`，绝不是 `main`）。见 Git 工作流 → "Worktree 隔离"。
20. PII 脱敏/净化是**主动选择加入 — 绝不要默认开启**。OmniRoute 为自托管/本地 LLM 做代理，运维人员拥有数据所有权，因此默认修改请求/响应载荷会悄无声息地损坏合法流量。两个会修改数据的 PII 功能标志**必须**在 `src/shared/constants/featureFlagDefinitions.ts` 中保持 `defaultValue: "false"`：`PII_REDACTION_ENABLED`（请求侧）和 `PII_RESPONSE_SANITIZATION`（响应 + 流式）。三个应用位置 — `src/lib/guardrails/piiMasker.ts`（请求安全护栏）、`src/lib/piiSanitizer.ts`（响应）、`src/lib/streamingPiiTransform.ts`（SSE）— 均受这些标志门控；两者均关闭时，`pii-masker` 安全护栏仍会运行但不会修改载荷（数据不变地通过）。将任何一个默认值翻转为 `"true"` 需要运维人员的明确批准。回归守卫是 `tests/unit/pii-opt-in-default.test.ts`（断言两个定义默认值 + 行为透传）。选择加入是每位运维人员通过环境变量或设置/DB 覆盖 (`src/lib/db/featureFlags.ts`) 进行，绝不是静默的默认行为。见 `docs/security/GUARDRAILS.md`。
21. **发布冻结 — 当 `/generate-release` 运行时，发布分支冻结，不接受 campaign 合并。** `/generate-release` 在开始协调时（Phase 0a）创建一个标记为 `release-freeze` 的标记 Issue，在 release PR 被 squash-merge 到 `main` 后关闭。在将**任何** PR 合并到活跃的 `release/vX.Y.Z` 分支之前，每个 campaign 工作流（`/review-issues`、`/review-prs`、`/implement-features`、`/green-prs`、`/port-upstream-*`）**必须**检查 `gh issue list --repo diegosouzapw/OmniRoute --label release-freeze --state open` — 如果冻结激活，**暂停合并**（保留 PR 处于 ready 和 open 状态；不要合并到 release 分支），告知运维人员，待冻结解除后再继续。这是一个**协调信号，而非权限锁**：release captain 和 campaign 会话共享 `diegosouzapw` 身份，因此 GitHub 分支保护锁无法区分二者 — 只有这个被遵循的标记能防止 v3.8.40/v3.8.41 中强制进行完整 CHANGELOG 重新协调的中间 release 提交冲突（并行 campaign 在运行过程中将 `release/vX.Y.Z` 推进了 34 个提交）。release captain 自己的协调/周期打开推送是豁免的 — 那些本身就是 release。必须在冻结期间落地的修复（例如 homologation 发现的问题）遵循合并后只读规则：先通过 `fix/release-vX.Y.Z-*` 落地到 `main`。

---

## PII 与流脱敏经验教训

### 1. 正则安全性（ReDoS）

所有匹配变长字符串的正则模式（例如 IPv6 地址、信用卡号）必须使用严格有界、不重叠的序列（例如用有界范围 `{1,7}` 限制出现次数），以防止在处理不受信任的输入时发生灾难性回溯。

### 2. SSE 快照处理

在解析流式 LLM 响应（例如 Responses API）时，检查数据块是否代表最终快照（`done` 或 `completed` 事件）。快照文本必须作为独立字符串直接脱敏处理（绕过滚动增量缓冲区），以防止在流末尾出现文本重复。

### 3. 测试中的数据库句柄

确保任何触发数据库迁移或建立 SQLite 连接的单元测试都调用 `resetDbInstance()` 并在 `test.after(...)` 钩子中正确清理和关闭所有数据库句柄。未能释放数据库连接句柄将导致 Node 的原生测试运行器无限挂起。
