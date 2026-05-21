# CLAUDE.md (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md)

---

该文件为在此代码库中使用 Claude Code (claude.ai/code) 提供指导。

## 快速开始

```bash
npm install                    # 安装依赖（从 .env.example 自动生成 .env）
npm run dev                    # 开发服务器在 http://localhost:20128
npm run build                  # 生产构建（Next.js 16 独立版）
npm run lint                   # ESLint（预期 0 个错误；警告为先前存在）
npm run typecheck:core         # TypeScript 检查（应为干净）
npm run typecheck:noimplicit:core  # 严格检查（无隐式 any）
npm run test:coverage          # 单元测试 + 覆盖门槛（75/75/75/70 — 语句/行/函数/分支）
npm run check                  # lint + 测试组合
npm run check:cycles           # 检测循环依赖
```

### 运行测试

```bash
# 单个测试文件（Node.js 原生测试运行器 — 大多数测试）
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest（MCP 服务器，autoCombo，缓存）
npm run test:vitest

# 所有测试套件
npm run test:all
```

有关完整的测试矩阵，请参见 `CONTRIBUTING.md` → "运行测试"。有关深层架构，请参见 `AGENTS.md`。

---

## 项目概览

**OmniRoute** — 统一的 AI 代理/路由器。一个端点，160+ LLM 提供者，自动回退。

| 层级       | 位置                    | 目的                                                             |
| ---------- | ----------------------- | ---------------------------------------------------------------- |
| API 路由   | `src/app/api/v1/`       | Next.js 应用路由 — 入口点                                        |
| 处理程序   | `open-sse/handlers/`    | 请求处理（聊天、嵌入等）                                         |
| 执行器     | `open-sse/executors/`   | 特定提供者的 HTTP 调度                                           |
| 转换器     | `open-sse/translator/`  | 格式转换（OpenAI↔Claude↔Gemini）                                 |
| 转换器     | `open-sse/transformer/` | 响应 API ↔ 聊天完成                                              |
| 服务       | `open-sse/services/`    | 组合路由、速率限制、缓存等                                       |
| 数据库     | `src/lib/db/`           | SQLite 域模块（45+ 文件，55 次迁移）                             |
| 域/策略    | `src/domain/`           | 策略引擎、成本规则、回退逻辑                                     |
| MCP 服务器 | `open-sse/mcp-server/`  | 37 个工具（30 基础 + 3 内存 + 4 技能），3 个传输，大约 13 个范围 |
| A2A 服务器 | `src/lib/a2a/`          | JSON-RPC 2.0 代理协议                                            |
| 技能       | `src/lib/skills/`       | 可扩展的技能框架                                                 |
| 内存       | `src/lib/memory/`       | 持久化对话内存                                                   |

Monorepo: `src/`（Next.js 16 应用），`open-sse/`（流媒体引擎工作区），`electron/`（桌面应用），`tests/`，`bin/`（CLI 入口点）。

---

## 请求管道

```
客户端 → /v1/chat/completions (Next.js 路由)
  → CORS → Zod 验证 → 认证? → 策略检查 → 提示注入保护
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → 缓存检查 → 速率限制 → 组合路由?
      → resolveComboTargets() → 针对每个目标调用 handleSingleModel()
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() 上游 → 重试 w/ 回退
    → 响应翻译 → SSE 流或 JSON
    → 如果是 Responses API: responsesTransformer.ts TransformStream
```

API 路由遵循一致的模式：`路由 → CORS 预检 → Zod 请求体验证 → 可选认证 (extractApiKey/isValidApiKey) → API 密钥策略执行 → 处理程序委派 (open-sse)`。没有全局的 Next.js 中间件 — 拦截是路由特定的。

**组合路由** (`open-sse/services/combo.ts`): 14 种策略（优先级、加权、优先填充、轮询、P2C、随机、最少使用、成本优化、重置感知、严格随机、自动、lkgp、上下文优化、上下文中继）。每个目标调用 `handleSingleModel()`，该函数用每个目标的错误处理和电路断路器检查包装 `handleChatCore()`。有关 9 因子自动组合评分的信息，请参见 `docs/routing/AUTO-COMBO.md`，有关 3 层弹性的信息，请参见 `docs/architecture/RESILIENCE_GUIDE.md`。

---

## 弹性运行时状态

OmniRoute 有三种相关但不同的临时故障机制。在调试路由行为时，请保持它们的范围分开。请参见
[3 层弹性图](./docs/diagrams/exported/resilience-3layers.svg)
（来源: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd)）
以获取一目了然的地图。

### 提供者电路断路器

**范围**: 整个提供者，例如 `glm`、`openai`、`anthropic`。

**目的**: 停止向一个在上游/服务级别反复失败的提供者发送流量，以便一个不健康的提供者不会减慢每个请求的速度。

**实现**:

- 核心类: `src/shared/utils/circuitBreaker.ts`
- 聊天门控/执行连接: `src/sse/handlers/chatHelpers.ts`，`src/sse/handlers/chat.ts`
- 运行时状态 API: `src/app/api/monitoring/health/route.ts`
- 共享包装器: `open-sse/services/accountFallback.ts`
- 持久化状态表: `domain_circuit_breakers`

**状态**:

- `CLOSED`: 允许正常流量。
- `OPEN`: 提供者暂时被阻止；调用者会收到提供者电路打开的响应，或者组合路由跳过到另一个目标。
- `HALF_OPEN`: 重置超时已过；允许探测请求。成功关闭断路器，失败再次打开。

**默认值** (`open-sse/config/constants.ts`):

- OAuth 提供者: 阈值 `3`，重置超时 `60s`。
- API 密钥提供者: 阈值 `5`，重置超时 `30s`。
- 本地提供者: 阈值 `2`，重置超时 `15s`。

只有提供者级别的故障状态应该触发提供者断路器：

```ts
(408, 500, 502, 503, 504);
```

不要因正常的账户/密钥/模型错误（如大多数 `401`、`403` 或 `429` 情况）而触发整个提供者断路器。这些通常属于连接冷却或模型锁定。除非被归类为终端提供者/账户错误，否则通用 API 密钥提供者的 `403` 应该是可恢复的。

断路器使用懒惰恢复，而不是后台定时器。当 `OPEN` 过期时，像 `getStatus()`、`canExecute()` 和 `getRetryAfterMs()` 这样的读取会将状态刷新为 `HALF_OPEN`，以便仪表板和组合候选构建器不会永远排除一个过期的提供者。

### 连接冷却

**范围**: 一个提供者连接/账户/密钥。

**目的**: 暂时跳过一个坏的密钥/账户，同时允许同一提供者的其他连接继续处理请求。

**实现**:

- 写入/更新路径: `src/sse/services/auth.ts::markAccountUnavailable()`
- 账户选择/过滤: `src/sse/services/auth.ts::getProviderCredentials...`
- 冷却计算: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 设置: `src/lib/resilience/settings.ts`

提供者连接上的重要字段：

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

在账户选择期间，当以下条件成立时，连接会被跳过：

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

冷却也是懒惰的：当 `rateLimitedUntil` 在过去时，连接再次变得合格。在成功使用时，`clearAccountError()` 会清除 `testStatus`、`rateLimitedUntil`、错误字段和 `backoffLevel`。

默认连接冷却行为：

- OAuth 基础冷却: `5s`。
- API 密钥基础冷却: `3s`。
- API 密钥 `429` 应优先考虑上游重试提示（`Retry-After`、重置头或可解析的重置文本），如果可用。
- 重复的可恢复故障使用指数回退：

```ts
baseCooldownMs * 2 ** failureIndex;
```

反雷霆集群保护防止同一连接上的并发故障反复延长冷却或双重增加 `backoffLevel`。

终端状态不是冷却状态。`banned`、`expired` 和 `credits_exhausted` 旨在保持不可用，直到凭据/设置更改或操作员重置它们。不要用瞬态冷却状态覆盖终端状态。

### 模型锁定

**范围**: 提供者 + 连接 + 模型。

**目的**: 避免在只有一个模型不可用或配额限制的情况下禁用整个连接。

示例：

- 每模型配额提供者返回 `429`。
- 本地提供者因缺少一个模型返回 `404`。
- 提供者特定的模式/模型权限失败，例如选择的 Grok 模式。

模型锁定位于 `open-sse/services/accountFallback.ts`，允许同一连接继续处理其他模型。

### 调试指导

- 如果一个提供者的所有密钥都被跳过，请检查提供者断路器状态和每个连接的 `rateLimitedUntil`/`testStatus`。
- 如果一个提供者在重置窗口后似乎被永久排除，请检查代码是否在读取原始 `state` 而不是使用 `getStatus()`/`canExecute()`。
- 如果一个提供者密钥失败但其他密钥应该有效，请优先考虑连接冷却而不是提供者断路器。
- 如果只有一个模型失败，请优先考虑模型锁定而不是连接冷却。
- 如果一个状态应该自我恢复，它应该有一个未来的时间戳/重置超时和一个读取路径来刷新过期状态。永久状态需要手动凭据或配置更改。

## 关键约定

### 代码风格

- **2个空格**，分号，双引号，100字符宽度，es5尾随逗号（通过lint-staged和Prettier强制执行）
- **导入**：外部 → 内部（`@/`，`@omniroute/open-sse`）→ 相对
- **命名**：文件=camelCase/kebab，组件=PascalCase，常量=UPPER_SNAKE
- **ESLint**：`no-eval`，`no-implied-eval`，`no-new-func` = 在任何地方都报错；`no-explicit-any` = 在`open-sse/`和`tests/`中警告
- **TypeScript**：`strict: false`，目标ES2022，模块esnext，解析器为打包器。优先使用显式类型。

### 数据库

- **始终**通过`src/lib/db/`域模块 — **绝不**在路由或处理程序中编写原始SQL
- **绝不**在`src/lib/localDb.ts`中添加逻辑（仅为重新导出层）
- **绝不**从`localDb.ts`进行桶导入 — 而是导入特定的`db/`模块
- DB单例：`getDbInstance()`来自`src/lib/db/core.ts`（WAL日志记录）
- 迁移：`src/lib/db/migrations/` — 版本化的SQL文件，幂等，在事务中运行

### 错误处理

- 使用特定错误类型的try/catch，使用pino上下文记录
- 在SSE流中绝不吞噬错误 — 使用中止信号进行清理
- 返回适当的HTTP状态码（4xx/5xx）

### 安全性

- **绝不**使用`eval()`，`new Function()`或隐式eval
- 使用Zod模式验证所有输入
- 在静态存储中加密凭据（AES-256-GCM）
- 上游头部拒绝列表：`src/shared/constants/upstreamHeaders.ts` — 编辑时保持清理、Zod模式和单元测试一致
- **公共上游凭据**（Gemini/Antigravity/Windsurf风格的OAuth client_id/secret + 从公共CLI提取的Firebase Web密钥）：**必须**通过`resolvePublicCred()`嵌入，来自`open-sse/utils/publicCreds.ts` — **绝不**作为字符串字面量。请参见`docs/security/PUBLIC_CREDS.md`以获取强制模式。
- **错误响应**（HTTP / SSE / 执行器 / MCP处理程序）：**必须**通过`buildErrorBody()`或`sanitizeErrorMessage()`路由，来自`open-sse/utils/error.ts` — **绝不**将原始`err.stack`或`err.message`放入响应体中。请参见`docs/security/ERROR_SANITIZATION.md`。
- **从变量构建的Shell命令**：在调用`exec()`/`spawn()`时，如果脚本需要运行时值，通过`env`选项传递（自动进行Shell转义） — **绝不**将不受信任/外部路径字符串插入脚本体中。参考：`src/mitm/cert/install.ts::updateNssDatabases`。
- **默认安全库**（[tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)）：在添加新的安全敏感表面时，优先使用Helmet.js、DOMPurify、ssrf-req-filter、safe-regex、Google Tink，而不是自定义实现。

---

## 常见修改场景

### 添加新提供者

1. 在`src/shared/constants/providers.ts`中注册（加载时进行Zod验证）
2. 如果需要自定义逻辑，则在`open-sse/executors/`中添加执行器（扩展`BaseExecutor`）
3. 如果是非OpenAI格式，则在`open-sse/translator/`中添加翻译器
4. 如果基于OAuth，则在`src/lib/oauth/constants/oauth.ts`中添加OAuth配置 — 如果上游CLI提供公共client_id/secret，则通过`resolvePublicCred()`嵌入（见`docs/security/PUBLIC_CREDS.md`），**绝不**作为字面量
5. 在`open-sse/config/providerRegistry.ts`中注册模型
6. 在`tests/unit/`中编写测试（如果添加了新的嵌入默认，则包括publicCreds形状断言）

### 添加新API路由

1. 在`src/app/api/v1/your-route/`下创建目录
2. 创建`route.ts`，包含`GET`/`POST`处理程序
3. 遵循模式：CORS → Zod主体验证 → 可选身份验证 → 处理程序委托
4. 处理程序放在`open-sse/handlers/`中（从那里导入，而不是内联）
5. 错误响应使用`buildErrorBody()` / `errorResponse()`来自`open-sse/utils/error.ts`（自动清理 — 绝不将`err.stack`或`err.message`原样放入主体中）。请参见`docs/security/ERROR_SANITIZATION.md`。
6. 添加测试 — 包括至少一个断言，确保错误响应不泄露堆栈跟踪（`!body.error.message.includes("at /")`）

### 添加新DB模块

1. 创建`src/lib/db/yourModule.ts` — 从`./core.ts`导入`getDbInstance`
2. 导出您的域表的CRUD函数
3. 如果需要新表，则在`src/lib/db/migrations/`中添加迁移
4. 从`src/lib/localDb.ts`重新导出（仅添加到重新导出列表中）
5. 编写测试

### 添加新MCP工具

1. 在`open-sse/mcp-server/tools/`中添加工具定义，包含Zod输入模式 + 异步处理程序
2. 在工具集中注册（通过`createMcpServer()`连接）
3. 分配给适当的范围
4. 编写测试（工具调用记录到`mcp_audit`表中）

### 添加新A2A技能

1. 在`src/lib/a2a/skills/`中创建技能（已有5个：智能路由、配额管理、提供者发现、成本分析、健康报告）
2. 技能接收任务上下文（消息、元数据）→ 返回结构化结果
3. 在`src/lib/a2a/taskExecution.ts`中的`A2A_SKILL_HANDLERS`中注册
4. 在`src/app/.well-known/agent.json/route.ts`中公开（代理卡）
5. 在`tests/unit/`中编写测试
6. 在`docs/frameworks/A2A-SERVER.md`技能表中记录

### 添加新云代理

1. 在`src/lib/cloudAgent/agents/`中创建代理类，扩展`CloudAgentBase`（已有3个：codex-cloud、devin、jules）
2. 实现`createTask`、`getStatus`、`approvePlan`、`sendMessage`、`listSources`
3. 在`src/lib/cloudAgent/registry.ts`中注册
4. 如果需要，添加OAuth/凭据处理（`src/lib/oauth/providers/`）
5. 测试 + 在`docs/frameworks/CLOUD_AGENT.md`中记录

### 添加新护栏 / 评估 / 技能 / Webhook事件

- 护栏：`src/lib/guardrails/` → 文档：`docs/security/GUARDRAILS.md`
- 评估套件：`src/lib/evals/` → 文档：`docs/frameworks/EVALS.md`
- 技能（沙盒）：`src/lib/skills/` → 文档：`docs/frameworks/SKILLS.md`
- Webhook事件：`src/lib/webhookDispatcher.ts` → 文档：`docs/frameworks/WEBHOOKS.md`

## 参考文档

对于任何非平凡的更改，请先阅读相应的深入分析：

| 领域                            | 文档                                                              |
| ------------------------------- | ----------------------------------------------------------------- |
| 仓库导航                        | `docs/architecture/REPOSITORY_MAP.md`                             |
| 架构                            | `docs/architecture/ARCHITECTURE.md`                               |
| 工程参考                        | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| 自动组合（9因子评分，14种策略） | `docs/routing/AUTO-COMBO.md`                                      |
| 弹性（3种机制）                 | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| 推理重放                        | `docs/routing/REASONING_REPLAY.md`                                |
| 技能框架                        | `docs/frameworks/SKILLS.md`                                       |
| 内存系统（FTS5 + Qdrant）       | `docs/frameworks/MEMORY.md`                                       |
| 云代理                          | `docs/frameworks/CLOUD_AGENT.md`                                  |
| 保护措施（PII / 注入 / 视觉）   | `docs/security/GUARDRAILS.md`                                     |
| 公共上游凭证（Gemini等）        | `docs/security/PUBLIC_CREDS.md`                                   |
| 错误信息清理                    | `docs/security/ERROR_SANITIZATION.md`                             |
| 评估                            | `docs/frameworks/EVALS.md`                                        |
| 合规 / 审计                     | `docs/security/COMPLIANCE.md`                                     |
| Webhooks                        | `docs/frameworks/WEBHOOKS.md`                                     |
| 授权管道                        | `docs/architecture/AUTHZ_GUIDE.md`                                |
| 隐身（TLS / 指纹）              | `docs/security/STEALTH_GUIDE.md`                                  |
| 代理协议（A2A / ACP / 云）      | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP 服务器                      | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A 服务器                      | `docs/frameworks/A2A-SERVER.md`                                   |
| API 参考 + OpenAPI              | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| 提供者目录（自动生成）          | `docs/reference/PROVIDER_REFERENCE.md`                            |
| 发布流程                        | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## 测试

| 内容                    | 命令                                                      |
| ----------------------- | --------------------------------------------------------- |
| 单元测试                | `npm run test:unit`                                       |
| 单个文件                | `node --import tsx/esm --test tests/unit/file.test.ts`    |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                     |
| E2E (Playwright)        | `npm run test:e2e`                                        |
| 协议 E2E (MCP+A2A)      | `npm run test:protocols:e2e`                              |
| 生态系统                | `npm run test:ecosystem`                                  |
| 覆盖门限                | `npm run test:coverage` (75/75/75/70 — 语句/行/函数/分支) |
| 覆盖报告                | `npm run coverage:report`                                 |

**PR 规则**：如果您更改了 `src/`、`open-sse/`、`electron/` 或 `bin/` 中的生产代码，您必须在同一 PR 中包含或更新测试。

**测试层级偏好**：单元测试优先 → 集成测试（多模块或数据库状态） → E2E（仅限 UI/工作流）。在修复之前或同时将错误重现编码为自动化测试。

**Copilot 覆盖政策**：当 PR 更改生产代码且覆盖率低于 75%（语句/行/函数）或 70%（分支）时，不仅仅报告 — 添加或更新测试，重新运行覆盖门限，然后请求确认。在 PR 报告中包含运行的命令、已更改的测试文件和最终覆盖结果。

---

## Git 工作流

```bash
# 永远不要直接提交到 main
git checkout -b feat/your-feature
git commit -m "feat: 描述您的更改"
git push -u origin feat/your-feature
```

**分支前缀**：`feat/`、`fix/`、`refactor/`、`docs/`、`test/`、`chore/`

**提交格式**（传统提交）：`feat(db): 添加电路断路器` — 范围：`db`、`sse`、`oauth`、`dashboard`、`api`、`cli`、`docker`、`ci`、`mcp`、`a2a`、`memory`、`skills`

**Husky 钩子**：

- **pre-commit**：lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**：`npm run test:unit`

---

## 环境

- **运行时**：Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES Modules
- **TypeScript**：5.9+，目标 ES2022，模块 esnext，解析器 bundler
- **路径别名**：`@/*` → `src/`，`@omniroute/open-sse` → `open-sse/`，`@omniroute/open-sse/*` → `open-sse/*`
- **默认端口**：20128（API + 仪表板在同一端口）
- **数据目录**：`DATA_DIR` 环境变量，默认为 `~/.omniroute/`
- **关键环境变量**：`PORT`、`JWT_SECRET`、`API_KEY_SECRET`、`INITIAL_PASSWORD`、`REQUIRE_API_KEY`、`APP_LOG_LEVEL`
- 设置：`cp .env.example .env` 然后生成 `JWT_SECRET` (`openssl rand -base64 48`) 和 `API_KEY_SECRET` (`openssl rand -hex 32`)

---

## 硬性规则

1. 永远不要提交秘密或凭据
2. 永远不要在 `localDb.ts` 中添加逻辑
3. 永远不要使用 `eval()` / `new Function()` / 隐式 eval
4. 永远不要直接提交到 `main`
5. 永远不要在路由中编写原始 SQL — 使用 `src/lib/db/` 模块
6. 永远不要在 SSE 流中静默吞噬错误
7. 始终使用 Zod 模式验证输入
8. 更改生产代码时始终包含测试
9. 覆盖率必须保持在 ≥75%（语句、行、函数）/ ≥70%（分支）。当前测量：~82%。
10. 在没有明确操作员批准的情况下，永远不要绕过 Husky 钩子（`--no-verify`，`--no-gpg-sign`）。
11. 永远不要将公共上游 OAuth client_id/secret 或 Firebase Web 密钥作为字符串文字嵌入 — 始终通过 `resolvePublicCred()` 处理（`open-sse/utils/publicCreds.ts`）。参见 `docs/security/PUBLIC_CREDS.md`。
12. 永远不要在 HTTP / SSE / 执行器响应中返回原始 `err.stack` / `err.message` — 始终通过 `buildErrorBody()` 或 `sanitizeErrorMessage()` 路由（`open-sse/utils/error.ts`）。参见 `docs/security/ERROR_SANITIZATION.md`。
13. 永远不要将外部路径或运行时值字符串插值到传递给 `exec()`/`spawn()` 的 shell 脚本中 — 应通过 `env` 选项传递。参考：`src/mitm/cert/install.ts::updateNssDatabases`。
14. 永远不要在没有 (a) 首先检查上述模式文档以查看帮助程序是否适用，以及 (b) 在驳回评论中记录技术理由的情况下驳回 CodeQL / Secret-Scanning 警报。先例：在已经通过 `sanitizeErrorMessage()` 路由的调用站点上引发的 `js/stack-trace-exposure` 是已知的 CodeQL 限制（自定义清理程序未被识别） — 驳回为 `false positive`，引用 `docs/security/ERROR_SANITIZATION.md`。
15. 永远不要暴露生成子进程的路由（`/api/mcp/`、`/api/cli-tools/runtime/`），而不在 `src/server/authz/routeGuard.ts` 中进行 `isLocalOnlyPath()` 分类。回环强制执行在任何身份验证检查之前无条件发生 — 通过隧道泄露的 JWT 不能触发进程生成。参见 `docs/security/ROUTE_GUARD_TIERS.md`。
16. 永远不要在提交消息中包含 `Co-Authored-By` 尾部。提交必须仅在存储库所有者的 Git 身份下出现（`diegosouzapw`）。`Co-Authored-By: Claude …` 行会导致 GitHub 将提交归因于 `claude` Anthropic 账户，从而隐藏 PR 历史中的真实作者。
