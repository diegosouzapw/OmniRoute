# Evaluations (Evals) (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **事实来源：** `src/lib/evals/`、`src/lib/db/evals.ts`、`src/app/api/evals/`
> **最后更新：** 2026-06-28 — v3.8.40

OmniRoute 提供了一个通用评估框架，可用于对路由配置、单个提供者/模型或内置的“黄金集”套件进行基准测试。可使用它来验证路由变更、验证新的提供者，并在将版本部署到生产流量之前设置发布门禁。

该框架由以下部分组成：

- 纯运行器（`src/lib/evals/evalRunner.ts`）：注册内存中的内置套件，根据预期标准评估输出，并汇总评分卡。
- 持久化层（`src/lib/db/evals.ts`）：将自定义（用户定义的）套件和历史运行记录存储在 SQLite 中。
- 编排层（`src/lib/evals/runtime.ts`）：通过向 `POST /v1/chat/completions` 发送真实请求来执行每个用例、捕获延迟和输出，并持久化运行记录。
- `/api/evals/*` 下的 REST 端点（仅限管理身份验证）。
- 位于 `Dashboard → Usage → Evals` 的仪表板界面（`EvalsTab.tsx`）。

## 概念

### 套件

套件是一组具有名称的测试用例集合，包含一个 `description` 和一个或多个用例。套件有两个来源：

| 来源       | 定义位置                                      | 运行时可变？      |
| ---------- | --------------------------------------------- | ----------------- |
| `built-in` | 启动时通过 `registerSuite()` 注册             | 否（由代码定义）  |
| `custom`   | 存储在 SQLite 的 `eval_suites` + `eval_cases` | 是（通过 API/UI） |

当前的内置套件（请参阅 `src/lib/evals/evalRunner.ts`）：

- `golden-set` — 涵盖问候/数学/翻译/安全的 10 个基准用例
- `coding-proficiency` — Python/JS/SQL/TS/缺陷检测
- `reasoning-logic` — 三段论、文字题、模式识别
- `multilingual` — 翻译和语言检测
- `safety-guardrails` — PII、越狱、拒绝响应、偏见意识
- `instruction-following` — 仅 JSON、编号列表、语言约束
- `codex-comparison` — 用于比较模式的正面对比编程任务

### 用例

每个用例包含：

| 字段       | 描述                                                        |
| ---------- | ----------------------------------------------------------- |
| `id`       | 稳定标识符（用于关联输出和指标）                            |
| `name`     | 人类可读的标签                                              |
| `model`    | 运行使用 `suite-default` 目标时的默认模型                   |
| `input`    | `{ messages, max_tokens? }` — 发送至 `/v1/chat/completions` |
| `expected` | `{ strategy, value }` — 评分标准（见下文）                  |
| `tags`     | 可选标签（例如 `safety`、`pii`、`jailbreak`）               |

### 目标

同一套件可以针对不同目标运行。目标架构为 `src/shared/validation/schemas.ts` 中的 `evalTargetSchema`：

| 目标类型        | `id`     | 行为                                          |
| --------------- | -------- | --------------------------------------------- |
| `suite-default` | `null`   | 每个用例使用其内置的 `model` 字段             |
| `model`         | 模型名称 | 强制所有用例使用一个直接模型（例如 `gpt-4o`） |
| `combo`         | 组合名称 | 通过一个组合运行所有用例（用于测试路由引擎）  |

对于 `model` 和 `combo`，`id` 字段为必填项（由 Zod `superRefine` 强制执行）。提供 `compareTarget` 时，两个目标必须不同——运行器会使用同一个 `runGroupId` 持久化两次运行，以便进行 A/B 比较。

## 评分规则

在 `evaluateCase()`（evalRunner.ts）中实现：

| 策略       | 通过条件                                                            |
| ---------- | ------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                   |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())` |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` 为真                |
| `custom`   | `expected.fn(actualOutput, evalCase)` 返回真（仅限内置套件）        |

**注意：** 自定义函数评分仅用于代码中定义的（内置）套件，因为函数无法通过 API 序列化。对于用户创建的套件，`evalCaseBuilderSchema` 仅接受 `contains | exact | regex`。

目前没有以 LLM 作为评判者或基于嵌入相似度的评分器——可在 `evaluateCase()` 中方便地对此进行扩展。

## 数据库架构

共有三个表（迁移文件 `030_create_eval_runs.sql` 和 `031_create_eval_suites.sql`）：

| 表            | 用途                                                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `eval_suites` | 自定义套件元数据（`id`、`name`、`description`）                                                                          |
| `eval_cases`  | 每个套件的用例——`input_json`、`expected_*`、`tags_json`                                                                  |
| `eval_runs`   | 历史运行记录——`pass_rate`、`total`、`passed`、`failed`、`avg_latency_ms`、`summary_json`、`results_json`、`outputs_json` |

内置套件**不会**存储在数据库中。它们驻留在内存里，并且每次导入 `evalRunner.ts` 时都会重新注册。

## REST API

所有端点都需要管理身份验证（`requireManagementAuth`）——它们不属于公共代理接口。

| 端点                          | 方法     | 描述                                                |
| ----------------------------- | -------- | --------------------------------------------------- |
| `/api/evals`                  | `GET`    | 列出套件、近期运行记录、记分卡、目标和密钥          |
| `/api/evals`                  | `POST`   | 运行套件（单目标或对比）——架构 `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | 获取单个套件（内置或自定义）                        |
| `/api/evals/suites`           | `POST`   | 创建自定义套件——架构 `evalSuiteSaveSchema`          |
| `/api/evals/suites/{suiteId}` | `GET`    | 获取自定义套件                                      |
| `/api/evals/suites/{suiteId}` | `PUT`    | 替换自定义套件（用例将被重新插入）                  |
| `/api/evals/suites/{suiteId}` | `DELETE` | 删除自定义套件及其用例                              |

### 运行套件

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

可选字段：

- `outputs`——预先计算的输出组成的 `Record<caseId, string>`。提供该字段后，运行器会**跳过分发**，仅对缓存的输出进行评分（适用于离线评估）。
- `compareTarget`——并行运行的第二个目标；两次运行共享生成的 `runGroupId`，以便进行正面对比查看。
- `apiKeyId`——用于验证所分发的 `/v1/chat/completions` 调用的内部 API 密钥。启用 `REQUIRE_API_KEY` 时必填。

### 创建自定义套件

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## 调度管线

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`)：

1. 解析套件（内置或自定义）。
2. 针对每个用例，使用该用例的 `messages`、解析后的 `model`、`stream: false` 和 `max_tokens: 512`（或用例的覆盖值），构建一个发往 `/v1/chat/completions` 的 `Request`。
3. 直接调用聊天处理程序（进程内——没有额外的 HTTP 跳转）。
4. 记录延迟，并从 `choices[0].message.content` 或 Responses API 的 `output[]` 载荷中提取文本。
5. 通过 `runSuite()` 对所有输出进行评分，然后通过 `saveEvalRun()` 持久化。

用例按**顺序**运行。目前没有并发标志。

## 仪表板

UI 位于 `Dashboard → Usage → Evals`
（`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`）。你可以在此：

- 浏览内置和自定义套件，并逐个预览用例。
- 使用用例构建器创建、编辑和删除自定义套件。
- 选择目标（套件默认值 / 模型 / 组合），可选择第二个 `compareTarget` 和 API 密钥，然后按需运行。
- 查看运行历史记录、各用例的通过/失败情况、延迟和捕获的输出。
- 查看计分卡，其中聚合了每个 `(suite, target)` 范围内最新一次运行的滚动得分。

## 与 Auto-Assessment RFC 的关系

另一个独立且范围更窄的评估子系统位于 `src/domain/assessment/`
（有关实时评分引擎，另请参阅 [AUTO-COMBO.md](../routing/AUTO-COMBO.md)）。
该子系统面向 Auto Combo 引擎——自动对提供者和模型进行评分，以便在上游发生故障时组合能够自我修复。它使用自己的运行器、分类器和评分逻辑。

本文档所述的 Evals 框架是**更广泛的通用测试界面**。对于任意回归套件、A/B 比较和每次发布的冒烟测试，应优先使用该框架。当你需要通过提供者的实时健康状况影响路由决策时，请使用 Auto-Assessment 子系统。

## CI 集成

目前没有专用的 `eval:ci` npm 脚本。如果希望根据评估结果设置发布门禁，可以采用以下两种方式：

- **HTTP 方式**：启动服务器，使用已知的 `suiteId` + `target` 调用 `POST /api/evals`，并断言响应中的 `runs[].summary.passRate >= N`。
- **进程内方式**：在脚本中从 `@/lib/evals/runtime` 导入 `runEvalSuiteAgainstTarget()`，针对测试数据库运行，并检查返回的 `PersistedEvalRun.summary`。

覆盖路由和历史记录的测试位于
`tests/unit/evals-route.test.ts` 和 `tests/unit/evals-history.test.ts`。

## 扩展点

常见变更及其修改位置：

- **新的评分策略**——扩展 `evaluateCase()`（`evalRunner.ts`）中的 `switch (evalCase.expected.strategy)` 代码块，并扩展 `src/lib/db/evals.ts` 中的 `EvalCaseStrategy` 以及 `schemas.ts` 中的 `evalCaseBuilderSchema`。
- **新的内置套件**——定义一个套件对象，并在 `evalRunner.ts` 底部调用 `registerSuite()`。它将由 `listSuites()` 自动发现。
- **并发运行**——将 `runEvalSuiteAgainstTarget()` 中的顺序 `for` 循环改为有界的 `Promise.all`（目前不存在并发控制）。
- **流式/工具调用用例**——当前运行器强制设置 `stream: false`。流式或工具感知型评估需要修改 `runtime.ts`（在评分前捕获并聚合 SSE 数据块）。

## 另请参阅

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — 产品整体使用指南
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — 请求管线参考
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo 评分引擎（实时运行时）
- 源代码：`src/lib/evals/`、`src/lib/db/evals.ts`、`src/app/api/evals/`
- UI：`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
