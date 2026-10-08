# OmniRoute A2A Server Documentation (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — 将 OmniRoute 作为智能路由代理

A2A 接口包含两种形式：

- **JSON-RPC 2.0**：位于 `POST /a2a`（规范入口点，定义于 `src/app/a2a/route.ts`）。
- **REST**：位于 `/api/a2a/*` 下，供仪表盘和工具使用（状态、任务列表、取消）。

任务由 `A2ATaskManager` 跟踪（`src/lib/a2a/taskManager.ts`，默认 TTL 为 5 分钟）。技能通过 `src/lib/a2a/taskExecution.ts` 中的 `A2A_SKILL_HANDLERS` 分派。

## 代理发现

```bash
curl http://localhost:20128/.well-known/agent.json
```

返回描述 OmniRoute 功能、技能和身份验证要求的代理卡片。

代理卡片的 `version` 字段来源于 `process.env.npm_package_version`（参见 `src/app/.well-known/agent.json/route.ts:13`），因此每次发布时都会与 `package.json` 自动保持同步。

---

## 身份验证

所有 `/a2a` 请求都需要通过 `Authorization` 标头提供 API 密钥：

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

如果服务器上未配置 API 密钥，则会跳过身份验证。

## 启用

A2A 由 **Endpoints → A2A** 开关控制，默认处于禁用状态。禁用后，
`GET /api/a2a/status` 会报告 `status: "disabled"` 和 `online: false`；对
`POST /a2a` 的 JSON-RPC 调用会返回 HTTP 503，并包含 JSON-RPC 错误代码 `-32000`。

---

## JSON-RPC 2.0 方法

### `message/send` — 同步执行

向技能发送消息并等待完整响应。

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**响应：**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — SSE 流式传输

与 `message/send` 相同，但返回服务器发送事件，以进行实时流式传输。

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**SSE 事件：**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — 查询任务状态

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — 取消任务

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## 可用技能

OmniRoute 提供了 6 个 A2A 技能，它们在 `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` 中完成连接。每个技能模块均位于 `src/lib/a2a/skills/` 中。

| 技能         | ID                   | 描述                                                                                                                                        | 标签             | 示例                        |
| :----------- | :------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ | :--------------- | :-------------------------- |
| 智能路由     | `smart-routing`      | 使用 OmniRoute 的组合引擎和评分机制，通过最优提供者/组合路由提示词                                                                          | 路由、提供者     | “通过最佳模型路由此提示词”  |
| 配额管理     | `quota-management`   | 报告各提供者的配额状态，帮助调用方决定何时限流/切换                                                                                         | 配额、提供者     | “检查 anthropic 的配额”     |
| 提供者发现   | `provider-discovery` | 列出已安装的提供者及其能力、免费套餐标记和 OAuth 状态                                                                                       | 提供者、发现     | “有哪些可用的提供者？”      |
| 成本分析     | `cost-analysis`      | 根据目录和近期使用情况，估算请求/对话的成本                                                                                                 | 成本、使用情况   | “估算此对话的成本”          |
| 健康状况报告 | `health-report`      | 汇总各提供者的断路器、冷却和锁定状态                                                                                                        | 健康状况、韧性   | “显示所有提供者的健康状态”  |
| 列出能力     | `list-capabilities`  | 以 Markdown 表格形式返回包含 45 个条目的完整 Agent Skills 目录（23 个 API + 21 个 CLI + 1 个配置），并附带用于上下文注入的原始 SKILL.md URL | 目录、发现、技能 | “列出 OmniRoute 的所有能力” |

> Agent Card 应与实时的 352 个提供者目录保持一致；提供者数量以及免费/无需身份验证的元数据均来自运行时注册表。

### `list-capabilities` 技能详情

`list-capabilities` 技能对于需要在发送 API 调用之前了解 OmniRoute 所提供功能的外部代理尤其有用。它会返回一个结构化的 Markdown 表格工件：

```
| ID | 名称 | 类别 | 领域 | 端点/命令 | 原始 URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | 身份验证与会话 | api | 身份验证 | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

每一行都包含 `rawUrl` 列，以便代理可以立即获取完整的 SKILL.md。`metadata.totalSkills` 字段与目录大小保持一致（目前为 45）。实现：`src/lib/a2a/skills/listCapabilities.ts`。另请参阅 [AGENT-SKILLS.md](./AGENT-SKILLS.md)。

---

## REST API（辅助）

JSON-RPC 端点 `/a2a` 是规范的 A2A 入口点。以下 REST 端点为仪表板和外部工具提供辅助访问：

| 端点                         | 方法 | 描述                                                       | 认证                                           |
| :--------------------------- | :--- | :--------------------------------------------------------- | :--------------------------------------------- |
| `/api/a2a/status`            | GET  | 服务器状态、已注册技能                                     | （公开）                                       |
| `/api/a2a/tasks`             | GET  | 使用筛选条件列出任务                                       | 管理                                           |
| `/api/a2a/tasks/[id]`        | GET  | 按 ID 获取任务                                             | 管理                                           |
| `/api/a2a/tasks/[id]/cancel` | POST | 取消正在运行的任务                                         | 管理                                           |
| `/.well-known/agent.json`    | GET  | Agent Card（A2A 发现）                                     | （公开，缓存 3600s）                           |
| `/api/a2a/tasks`             | POST | 向 OmniConductor 工作群组进行入站委派（Conductor PRD RF5） | Bearer 对照 `OMNIROUTE_API_KEY` + `a2aEnabled` |

**入站 Conductor 委派（`POST /api/a2a/tasks`）：**外部 A2A 代理通过 OmniRoute 将编码工作委派给 OmniConductor 工作群组。请求体：`{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }`——仅可委派 Conductor 工作群组技能（即 Agent Card 上公布的技能）；`metadata.conductor.repo.url` 为必填项（该工作群组处理 git 仓库）。该路由使用服务器端的 `CONDUCTOR_ORCHESTRATOR_TOKEN`（回退为 `CONDUCTOR_HUB_TOKEN`）转换为中心节点的 `POST /v1/tasks`，并返回 `201 { conductor_task_id, state: "submitted" }`；任务状态通过 SSE→A2A 镜像（RF1）回传，并可通过 `GET /api/a2a/tasks?skill=conductor` 查看。

---

## 添加新技能

1. **创建技能文件：**`src/lib/a2a/skills/<your-skill>.ts`

   导出一个异步函数 `(task: A2ATask) => Promise<{ artifacts, metadata }>`。遵循现有技能（例如 `smartRouting.ts`）的结构。

2. **注册处理程序：**在 `src/lib/a2a/taskExecution.ts` 中，向 `A2A_SKILL_HANDLERS` 添加一个条目：

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...现有技能
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **在 Agent Card 中公开：**在 `src/app/.well-known/agent.json/route.ts` 中，追加到 `skills` 数组：

   ```json
   {
     "id": "your-skill",
     "name": "您的技能",
     "description": "简短且聚焦意图的描述",
     "tags": ["路由", "配额"],
     "examples": ["自然语言调用示例"]
   }
   ```

4. **编写测试：**`tests/unit/a2a-<your-skill>.test.ts`。覆盖正常路径和错误路径。

5. **记录文档：**在此文件的 `Available Skills` 表格中记录新技能。

---

## 任务 TTL

任务会在 `ttlMinutes` 后过期（默认为 5 分钟）——该值在 `src/lib/a2a/taskManager.ts:82` 的 `A2ATaskManager` 构造函数中配置。如需自定义，请派生 `A2ATaskManager` 实例化逻辑，并传入其他值（例如，使用 `new A2ATaskManager(15)` 将 TTL 设置为 15 分钟）。后台定时任务每 60 秒清理一次过期任务。

---

## 任务生命周期

```
已提交 → 处理中 → 已完成
                 → 失败
                 → 已取消
```

- 默认情况下，任务会在 5 分钟后过期（请参阅[任务 TTL](#task-ttl)）
- 终止状态：`completed`、`failed`、`cancelled`
- 事件日志会记录每次状态转换

---

## 错误代码

| 代码   | 含义                    |
| :----- | :---------------------- |
| -32700 | 解析错误（无效的 JSON） |
| -32600 | 无效请求 / 未授权       |
| -32601 | 未找到方法或技能        |
| -32602 | 无效参数                |
| -32603 | 内部错误                |
| -32000 | A2A 端点已禁用          |

---

## 集成示例

### Python（requests）

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript（fetch）

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
