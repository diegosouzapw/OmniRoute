# OmniRoute A2A Server Documentation (中文 (简体))

🌐 **Languages:** 🇺🇸 [English](../../../../docs/A2A-SERVER.md) · 🇸🇦 [ar](../../ar/docs/A2A-SERVER.md) · 🇧🇬 [bg](../../bg/docs/A2A-SERVER.md) · 🇧🇩 [bn](../../bn/docs/A2A-SERVER.md) · 🇨🇿 [cs](../../cs/docs/A2A-SERVER.md) · 🇩🇰 [da](../../da/docs/A2A-SERVER.md) · 🇩🇪 [de](../../de/docs/A2A-SERVER.md) · 🇪🇸 [es](../../es/docs/A2A-SERVER.md) · 🇮🇷 [fa](../../fa/docs/A2A-SERVER.md) · 🇫🇮 [fi](../../fi/docs/A2A-SERVER.md) · 🇫🇷 [fr](../../fr/docs/A2A-SERVER.md) · 🇮🇳 [gu](../../gu/docs/A2A-SERVER.md) · 🇮🇱 [he](../../he/docs/A2A-SERVER.md) · 🇮🇳 [hi](../../hi/docs/A2A-SERVER.md) · 🇭🇺 [hu](../../hu/docs/A2A-SERVER.md) · 🇮🇩 [id](../../id/docs/A2A-SERVER.md) · 🇮🇹 [it](../../it/docs/A2A-SERVER.md) · 🇯🇵 [ja](../../ja/docs/A2A-SERVER.md) · 🇰🇷 [ko](../../ko/docs/A2A-SERVER.md) · 🇮🇳 [mr](../../mr/docs/A2A-SERVER.md) · 🇲🇾 [ms](../../ms/docs/A2A-SERVER.md) · 🇳🇱 [nl](../../nl/docs/A2A-SERVER.md) · 🇳🇴 [no](../../no/docs/A2A-SERVER.md) · 🇵🇭 [phi](../../phi/docs/A2A-SERVER.md) · 🇵🇱 [pl](../../pl/docs/A2A-SERVER.md) · 🇵🇹 [pt](../../pt/docs/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/A2A-SERVER.md) · 🇷🇴 [ro](../../ro/docs/A2A-SERVER.md) · 🇷🇺 [ru](../../ru/docs/A2A-SERVER.md) · 🇸🇰 [sk](../../sk/docs/A2A-SERVER.md) · 🇸🇪 [sv](../../sv/docs/A2A-SERVER.md) · 🇰🇪 [sw](../../sw/docs/A2A-SERVER.md) · 🇮🇳 [ta](../../ta/docs/A2A-SERVER.md) · 🇮🇳 [te](../../te/docs/A2A-SERVER.md) · 🇹🇭 [th](../../th/docs/A2A-SERVER.md) · 🇹🇷 [tr](../../tr/docs/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/A2A-SERVER.md) · 🇵🇰 [ur](../../ur/docs/A2A-SERVER.md) · 🇻🇳 [vi](../../vi/docs/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute 作为智能路由代理

A2A 层有两个入口：

- **JSON-RPC 2.0** 位于 `POST /a2a`（正式入口，定义在 `src/app/a2a/route.ts`）。
- **REST** 位于 `/api/a2a/*`，用于仪表盘和工具操作（状态、任务列表、取消）。

任务由 `A2ATaskManager`（`src/lib/a2a/taskManager.ts`，默认 5 分钟 TTL）跟踪。技能通过 `src/lib/a2a/taskExecution.ts` 中的 `A2A_SKILL_HANDLERS` 派发。

## 代理发现

```bash
curl http://localhost:20128/.well-known/agent.json
```

返回 Agent Card，其中描述 OmniRoute 的能力、技能和认证要求。

Agent Card 的 `version` 字段取自 `process.env.npm_package_version`（参见 `src/app/.well-known/agent.json/route.ts:13`），因此每次发布时都与 `package.json` 自动保持同步。

---

## 认证

所有 `/a2a` 请求均需通过 `Authorization` 请求头提供 API Key：

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

如果服务器未配置 API Key，认证将被跳过。

## 启用

A2A 通过 **端点 → A2A** 开关控制，默认禁用。禁用时，`GET /api/a2a/status` 返回 `status: "disabled"` 和 `online: false`；对 `POST /a2a` 的 JSON-RPC 调用返回 HTTP 503，附带 JSON-RPC 错误码 `-32000`。

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
      "cost_envelope": { "estimated": 0.005, "actual": 0.003, "currency": "USD" },
      "resilience_trace": [
        { "event": "primary_selected", "provider": "anthropic", "timestamp": "..." }
      ],
      "policy_verdict": { "allowed": true, "reason": "within budget and quota limits" }
    }
  }
}
```

### `message/stream` — SSE 流式传输

与 `message/send` 相同，但返回 Server-Sent Events 以进行实时流式传输。

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

OmniRoute 暴露了 6 个 A2A 技能，连接到 `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`。每个技能模块位于 `src/lib/a2a/skills/`。

| 技能 | ID | 描述 | 标签 | 示例 |
| :--- | :--- | :--- | :--- | :--- |
| Smart Routing | `smart-routing` | 通过 OmniRoute 的 Combo 引擎与评分，将提示路由到最优服务商/Combo | routing, 服务商 | "通过最佳模型路由此提示" |
| Quota Management | `quota-management` | 报告每个服务商的配额状态，帮助调用方决定何时限流/切换 | 配额, 服务商 | "检查 anthropic 的配额" |
| Provider Discovery | `provider-discovery` | 列出已安装的服务商及其能力、免费层标志、OAuth 状态 | 服务商, 发现 | "有哪些可用服务商？" |
| Cost Analysis | `cost-analysis` | 根据目录和近期用量估算请求/对话的成本 | 成本, 用量 | "估算本次对话的成本" |
| Health Report | `health-report` | 聚合每个服务商的熔断器、冷却、锁定状态 | 健康, 容灾 | "显示所有服务商的健康状态" |
| List Capabilities | `list-capabilities` | 返回完整的 42 项代理技能目录，以 Markdown 表格形式列出，附带原始 SKILL.md URL 用于上下文注入 | 目录, 发现, 技能 | "列出所有 OmniRoute 能力" |

> 注意：Agent Card 描述目前宣传 "36+ providers"（`src/app/.well-known/agent.json/route.ts:26` 和 `:55`）。实际目录已增长至 180+ 个服务商——该字符串应在后续变更中更新（作为单独的文档/代码 TODO 跟踪；此处不作修改）。

### `list-capabilities` 技能详情

`list-capabilities` 技能对于需要在发送 API 调用前了解 OmniRoute 暴露了哪些内容的外部代理尤为有用。它返回结构化的 Markdown 表格 artifact：

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

每行包含 `rawUrl` 列，以便代理可以立即获取完整的 SKILL.md。`metadata.totalSkills` 字段始终为 `42`。实现：`src/lib/a2a/skills/listCapabilities.ts`。另见 [AGENT-SKILLS.md](./AGENT-SKILLS.md)。

---

## REST API（辅助）

JSON-RPC 端点 `/a2a` 是 A2A 的正式入口。以下 REST 端点提供仪表盘和外部工具的辅助访问：

| 端点 | 方法 | 描述 | 认证 |
| :--- | :--- | :--- | :--- |
| `/api/a2a/status` | GET | 服务器状态、已注册技能 | （公开） |
| `/api/a2a/tasks` | GET | 列出任务（支持过滤） | 管理 |
| `/api/a2a/tasks/[id]` | GET | 按 ID 获取任务 | 管理 |
| `/api/a2a/tasks/[id]/cancel` | POST | 取消运行中的任务 | 管理 |
| `/.well-known/agent.json` | GET | Agent Card（A2A 发现） | （公开, 缓存 3600s） |

---

## 添加新技能

1. **创建技能文件：** `src/lib/a2a/skills/<your-skill>.ts`

   导出一个异步函数 `(task: A2ATask) => Promise<{ artifacts, metadata }>`。参照现有技能如 `smartRouting.ts` 的结构。

2. **注册处理器：** 在 `src/lib/a2a/taskExecution.ts` 中，向 `A2A_SKILL_HANDLERS` 添加一项：

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **在 Agent Card 中暴露：** 在 `src/app/.well-known/agent.json/route.ts` 中，追加到 `skills` 数组：

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **编写测试：** `tests/unit/a2a-<your-skill>.test.ts`。覆盖正常路径和错误路径。

5. 在本文档的`可用技能`表格中**记录**新技能。

---

## 任务 TTL

任务在 `ttlMinutes`（默认 5 分钟）后过期——可在 `src/lib/a2a/taskManager.ts:82` 的 `A2ATaskManager` 构造函数中配置。如需自定义，可复刻 `A2ATaskManager` 的实例化并传入不同值（例如 `new A2ATaskManager(15)` 设置 15 分钟 TTL）。后台定时器每 60 秒清理一次过期任务。

---

## 任务生命周期

```
submitted → working → completed
                    → failed
                    → cancelled
```

- 任务默认在 5 分钟后过期（参见[任务 TTL](#task-ttl)）
- 终态：`completed`、`failed`、`cancelled`
- 事件日志追踪每次状态转换

---

## 错误码

| Code | 含义 |
| :--- | :--- |
| -32700 | 解析错误（JSON 无效） |
| -32600 | 无效请求 / 未授权 |
| -32601 | 方法或技能未找到 |
| -32602 | 参数无效 |
| -32603 | 内部错误 |
| -32000 | A2A 端点已禁用 |

---

## 集成示例

### Python (requests)

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

### TypeScript (fetch)

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
