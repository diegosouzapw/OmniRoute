# Cloud Agents (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/CLOUD_AGENT.md)

---

> **事实来源：** `src/lib/cloudAgent/` 和 `src/app/api/v1/agents/tasks/`
> **最后更新：** 2026-06-28 — v3.8.40（刷新 frontmatter；包含 cursor-cloud 在内的 4 个智能体）

OmniRoute 将第三方云托管编码智能体（Codex Cloud、Cursor、Devin、Jules）编排为长时间运行的任务。每个智能体都封装在统一接口之后，因此客户端可以提交提示词和仓库 URL 并接收结果，而无需处理提供者特定的 API。

Cloud Agent 任务**不是**常规的聊天补全。它是一个持久化的多步骤工作单元，可能需要数分钟到数小时才能完成，可以生成 Pull Request 作为产物，并支持后续消息以及（部分提供者支持的）计划审批门禁。

![Cloud Agent 任务生命周期](../diagrams/exported/cloud-agent-flow.svg)

> 来源：[diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## 支持的智能体

| 提供者 ID      | 类                 | 源文件                                | 上游基础 URL                            | 计划审批   |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ---------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | 是         |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | 是         |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | 否（自动） |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | 否（自动） |

注册表：`src/lib/cloudAgent/registry.ts` — 导出 `getAgent(providerId)`、`getAvailableAgents()` 和 `isCloudAgentProvider(providerId)`。该注册表是一个普通的内存中 `Record<string, CloudAgentBase>`，在模块加载时填充。

## 架构

```
客户端（仪表板 / CLI / API）
  → POST /api/v1/agents/tasks（需要管理身份验证）
    → CreateCloudAgentTaskSchema 验证（Zod）
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ 从 getProviderConnections({ provider, isActive: true }) 获取
         （优先使用 apiKey，回退到 accessToken）
    → agent.createTask({ prompt, source, options }, credentials)
      └─ 向上游提供者 API 发出 HTTP POST
      └─ 返回包含内部 id 和 externalId 的 CloudAgentTask
    → 将 insertCloudAgentTask(...) 写入 cloud_agent_tasks（SQLite）

轮询（读取时延迟同步）：
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // 刷新状态和活动
    → 使用新状态、结果和 completed_at 调用 updateCloudAgentTask(...)
    → 返回序列化后的任务

交互：
  POST /api/v1/agents/tasks/[id]  请求体：{ action: "approve" | "message" | "cancel" }
    → 对于 "approve"，调用 agent.approvePlan(externalId, credentials)
    → 对于 "message"，调用 agent.sendMessage(externalId, message, credentials)
    → 对于 "cancel"，状态切换为 "cancelled"（仅限本地）
```

同步是**延迟执行的**：每次调用 `GET /tasks/[id]` 时，都会从上游刷新状态。系统没有后台轮询器。需要获取最新状态的仪表板应以合理的时间间隔轮询该 GET 端点。

## `CloudAgentBase` 接口

来源：`src/lib/cloudAgent/baseAgent.ts`

```typescript
export interface AgentCredentials {
  apiKey: string;
  baseUrl?: string;
}

export interface CreateTaskParams {
  prompt: string;
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
}

export interface GetStatusResult {
  status: CloudAgentStatus;
  externalId?: string;
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
}

export abstract class CloudAgentBase {
  abstract readonly providerId: string;
  abstract readonly baseUrl: string;

  abstract createTask(p: CreateTaskParams, c: AgentCredentials): Promise<CloudAgentTask>;
  abstract getStatus(externalId: string, c: AgentCredentials): Promise<GetStatusResult>;
  abstract approvePlan(externalId: string, c: AgentCredentials): Promise<void>;
  abstract sendMessage(
    externalId: string,
    message: string,
    c: AgentCredentials
  ): Promise<CloudAgentActivity>;
  abstract listSources(
    c: AgentCredentials
  ): Promise<{ name: string; url: string; branch?: string }[]>;

  protected mapStatus(raw: string): CloudAgentStatus; // 启发式地将上游字符串映射到枚举
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` 会有意抛出异常——Codex Cloud 会自动规划，因此没有审批关卡。`CodexCloudAgent.listSources` 返回 `[]`。

`CursorCloudAgent` 通过 Cursor 的官方 REST API（`api.cursor.com/v0`），使用**用户或服务账户 API 密钥**来驱动 Cursor 的后台/云端智能体——相比重复使用 Cursor IDE 的 OAuth 会话（提供者 `cursor`，存在封禁风险警告），这是一种更安全的官方方案。它是一个纯 REST 适配器（没有 `@cursor/sdk` 原生依赖）。`approvePlan` 会抛出异常（Cursor 智能体自主运行）；`listSources` 列出该密钥可以访问的代码仓库。Cursor 返回大写状态枚举（`CREATING`/`RUNNING`/`FINISHED`/`ERROR`），这些枚举会被显式映射到共享的 `CloudAgentStatus`。可以针对每组凭据覆盖 `baseUrl`，从而无需修改代码即可更正 API 版本/路径。

## 领域类型

来源：`src/lib/cloudAgent/types.ts`

```typescript
export const CLOUD_AGENT_STATUS = {
  QUEUED: "queued",
  RUNNING: "running",
  AWAITING_APPROVAL: "awaiting_approval",
  COMPLETED: "completed",
  FAILED: "failed",
  CANCELLED: "cancelled",
} as const;

export interface CloudAgentSource {
  repoName: string;
  repoUrl: string; // 必须是有效的 URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // 秒，正整数
  cost?: number; // 正浮点数
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // 内部 `task_...` ID
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // 上游提供者的 ID
  status: CloudAgentStatus;
  prompt: string; // 1..10000 个字符
  source: CloudAgentSource;
  options: {
    autoCreatePr?: boolean;
    planApprovalRequired?: boolean;
    environment?: Record<string, string>;
  };
  result?: CloudAgentResult;
  activities: CloudAgentActivity[];
  error?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}
```

验证模式（`CreateCloudAgentTaskSchema`、`UpdateCloudAgentTaskSchema`）与这些类型一起导出，并由路由处理程序使用。

## 数据库

源文件：`src/lib/cloudAgent/db.ts` — 表通过 `createCloudAgentTaskTable()` 延迟创建（`src/lib/cloudAgent/index.ts` 在模块导入时也会调用该函数）。

```sql
CREATE TABLE IF NOT EXISTS cloud_agent_tasks (
  id           TEXT PRIMARY KEY,
  provider_id  TEXT NOT NULL,
  external_id  TEXT,
  status       TEXT NOT NULL DEFAULT 'queued',
  prompt       TEXT NOT NULL,
  source       TEXT NOT NULL,             -- JSON
  options      TEXT DEFAULT '{}',         -- JSON
  result       TEXT,                       -- JSON
  activities   TEXT DEFAULT '[]',          -- JSON
  error        TEXT,
  created_at   TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT NOT NULL DEFAULT (datetime('now')),
  completed_at TEXT
);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_provider ON cloud_agent_tasks(provider_id);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_status   ON cloud_agent_tasks(status);
CREATE INDEX IF NOT EXISTS idx_cloud_agent_tasks_created  ON cloud_agent_tasks(created_at DESC);
```

`updateCloudAgentTask` 强制实施**列白名单**以防止 SQL 注入：
`status`、`prompt`、`source`、`options`、`result`、`activities`、`error`、
`completed_at`。部分更新中的任何其他键都会被静默丢弃。

## REST API — 任务生命周期

**认证：**所有 `/api/v1/agents/tasks*` 端点均要求**管理认证**
（`requireCloudAgentManagementAuth` 封装了来自
`src/lib/api/requireManagementAuth` 的 `requireManagementAuth`）。此要求在提交 `588a0333`
（_"fix(auth): 要求代理和冷却 API 使用管理认证"_）之后强制执行。

| 方法    | 路径                          | 用途                                                |
| ------- | ----------------------------- | --------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS 预检                                           |
| GET     | `/api/v1/agents/tasks`        | 列出任务（筛选：`provider`、`status`、`limit≤500`） |
| POST    | `/api/v1/agents/tasks`        | 创建任务（分派至上游并持久化）                      |
| DELETE  | `/api/v1/agents/tasks?id=...` | 按查询参数 id 删除任务（**不会**取消上游任务）      |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS 预检                                           |
| GET     | `/api/v1/agents/tasks/[id]`   | 读取任务并从上游延迟同步状态                        |
| POST    | `/api/v1/agents/tasks/[id]`   | 操作：`approve` / `message` / `cancel`              |
| DELETE  | `/api/v1/agents/tasks/[id]`   | 按路径 id 删除任务                                  |

### 创建任务

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "providerId": "devin",
    "prompt": "Fix the bug in src/foo.ts where the parser returns null",
    "source": {
      "repoName": "user/repo",
      "repoUrl": "https://github.com/user/repo",
      "branch": "main"
    },
    "options": {
      "autoCreatePr": true,
      "planApprovalRequired": false
    }
  }'
```

响应 `201`：

```json
{
  "data": {
    "id": "task_1731512345678_abc123def",
    "providerId": "devin",
    "externalId": "session_xyz",
    "status": "queued",
    "prompt": "...",
    "source": { "repoName": "user/repo", "repoUrl": "...", "branch": "main" },
    "options": { "autoCreatePr": true },
    "createdAt": "2026-05-13T12:34:56.789Z"
  }
}
```

### 批准计划

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### 发送后续消息

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### 取消（仅更新本地状态）

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` 会将本地数据库中的 `status` 更改为 `"cancelled"`，但**不会**调用上游提供者——`CloudAgentBase` 中没有中止 RPC。要停止上游计费，请在提供者自己的控制台中终止该任务。

## REST API — 云提供者基础设施

`src/app/api/cloud/` 下的这些辅助端点供远程客户端（CLI、Electron 应用或同步工作进程）使用，用于读取提供者连接元数据并解析模型别名。它们使用**常规 API 密钥**（通过 `validateApiKey`）进行身份验证，而不是任务端点所使用的管理身份验证。

| 方法 | 路径                            | 用途                                              |
| ---- | ------------------------------- | ------------------------------------------------- |
| POST | `/api/cloud/auth`               | 验证 API 密钥，返回脱敏的连接元数据和模型别名     |
| PUT  | `/api/cloud/credentials/update` | 刷新 `accessToken` / `refreshToken` / `expiresAt` |
| POST | `/api/cloud/model/resolve`      | 将模型别名解析为 `{ provider, model }`            |
| GET  | `/api/cloud/models/alias`       | 列出所有模型别名                                  |
| PUT  | `/api/cloud/models/alias`       | 设置模型别名（如果已启用，则自动同步到 Cloud）    |

`/api/cloud/auth` 绝不会返回原始的 `apiKey` / `accessToken` / `refreshToken`。它会返回 `hasApiKey`、`hasAccessToken`、`hasRefreshToken` 以及脱敏预览（`maskedApiKey`：前 4 个字符 + `****` + 后 4 个字符）。

## 凭据解析

`src/lib/cloudAgent/api.ts` 中的 `getCloudAgentCredentials(providerId)`：

1. 通过 `getProviderConnections({ provider: providerId, isActive: true })` 加载活跃的提供者连接。
2. 对于每个连接，优先使用 `apiKey`（去除首尾空白）。如果不可用，则回退到 `accessToken`。
3. 返回第一个非空令牌，并封装为 `{ apiKey: token }`。
4. 如果找不到可用令牌，则返回 `null`——API 会以 `400` 响应，并返回
   `"未为云代理提供者配置活跃凭据：<id>"`。

这意味着 Cloud Agents 与常规 LLM 提供者共用同一张 Provider Connection 表。要启用 Jules，请创建一个活跃连接，将 `provider` 设置为 `"jules"`，并填充 `apiKey`。

## 仪表板

源文件：`src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

一个使用 `"use client"` 的 React 页面，其功能包括：

- 列出任务（通过 `GET /api/v1/agents/tasks` 轮询）。
- 通过映射到 `CreateCloudAgentTaskSchema` 的表单提交新任务。
- 显示状态徽章（`queued`、`running`、`awaiting_approval`、`completed`、`failed`、`cancelled`），并渲染 `activities[]` 时间线。
- 当 `status === "completed"` 时，显示 `result.prUrl` / `commitMessage` / `summary`。

## 与 A2A 集成

可以通过注册一个 A2A 技能，将 Cloud Agents 公开为 A2A 技能。该技能会把其 `tasks/send` 处理程序委托给 `getAgent(...).createTask(...)`，并将 A2A 任务状态事件转换为 JSON-RPC 2.0 协议。请参阅 [A2A-SERVER.md](./A2A-SERVER.md)。

## 添加新的 Cloud Agent

1. 创建扩展 `CloudAgentBase` 的 `src/lib/cloudAgent/agents/<name>.ts`。
2. 实现 `createTask`、`getStatus`、`approvePlan`（如果不适用则抛出异常）、`sendMessage`、`listSources`。使用 `this.mapStatus(...)` 进行状态标准化。
3. 在 `src/lib/cloudAgent/registry.ts` 中使用稳定的 `providerId` 进行注册。
4. 扩展 `src/lib/cloudAgent/types.ts` 中的 `providerId` 字面量联合类型（`CloudAgentTask.providerId` 和 `CreateCloudAgentTaskSchema`）。
5. 如果该提供者需要连接记录，请将其添加到 `src/shared/constants/providers.ts`。基于 OAuth 的提供者还需要添加到 `src/lib/oauth/providers/`。
6. 在 `tests/unit/cloud-agent-*.test.ts` 下添加测试。
7. 更新本文档和仪表板的 `CLOUD_AGENTS` 常量。

## 配置

| 环境变量         | 用途                                              |
| ---------------- | ------------------------------------------------- |
| `DATA_DIR`       | 存放 `cloud_agent_tasks` 的 SQLite 数据库所在位置 |
| `JWT_SECRET`     | 任务端点的管理身份验证所必需                      |
| `API_KEY_SECRET` | 对静态存储的提供者连接凭据进行加密所必需          |

目前不存在 Cloud-Agent 专用的环境变量——所有密钥都存储在
`provider_connections` 表中。

## 另请参阅

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- 源代码：`src/lib/cloudAgent/`
- 路由：`src/app/api/v1/agents/tasks/`、`src/app/api/cloud/`
- 仪表板：`src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
