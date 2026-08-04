---
title: "OmniRoute A2A 伺服器文件"
version: 3.8.40
lastUpdated: 2026-06-28
---

# OmniRoute A2A 伺服器文件

> Agent-to-Agent 協定 v0.3 — OmniRoute 作為智慧路由代理

A2A 介面包含兩個面向：

- **JSON-RPC 2.0** 位於 `POST /a2a`（標準進入點，定義於 `src/app/a2a/route.ts`）。
- **REST** 位於 `/api/a2a/*`，供儀表板和工具使用（狀態、任務清單、取消）。

任務由 `A2ATaskManager`（`src/lib/a2a/taskManager.ts`，預設 5 分鐘 TTL）追蹤。技能透過 `A2A_SKILL_HANDLERS`（位於 `src/lib/a2a/taskExecution.ts`）調度。

## 代理探索

```bash
curl http://localhost:20128/.well-known/agent.json
```

回傳描述 OmniRoute 能力、技能及驗證需求的 Agent Card。

Agent Card 中的 `version` 欄位源自 `process.env.npm_package_version`（參見 `src/app/.well-known/agent.json/route.ts:13`），因此每次發版都會與 `package.json` 自動同步。

---

## 驗證

所有 `/a2a` 請求都需要透過 `Authorization` 標頭提供 API 金鑰：

```
Authorization: Bearer YOUR_O..._KEY
```

若伺服器未設定 API 金鑰，則跳過驗證。

## 啟用

A2A 由 **Endpoints → A2A** 開關控制，預設為停用。停用時，
`GET /api/a2a/status` 回報 `status: "disabled"` 及 `online: false`；對
`POST /a2a` 的 JSON-RPC 呼叫則回傳 HTTP 503 及 JSON-RPC 錯誤碼 `-32000`。

---

## JSON-RPC 2.0 方法

### `message/send` — 同步執行

發送訊息給技能並等待完整回應。

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ***" \
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

**回應：**

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

### `message/stream` — SSE 串流

與 `message/send` 相同，但回傳 Server-Sent Events 以實現即時串流。

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ***" \
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

### `tasks/get` — 查詢任務狀態

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ***" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — 取消任務

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ***" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## 可用技能

OmniRoute 提供 6 個 A2A 技能，配置於 `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`。每個技能模組位於 `src/lib/a2a/skills/`。

| 技能               | ID                    | 描述                                                                               | 標籤                        | 範例                                   |
| :----------------- | :-------------------- | :--------------------------------------------------------------------------------- | :-------------------------- | :------------------------------------- |
| Smart Routing      | `smart-routing`       | 透過 OmniRoute 的 combo 引擎 + 評分，將提示路由至最佳提供者/組合                       | routing, providers          | "Route this prompt via the best model" |
| Quota Management   | `quota-management`    | 回報各提供者的配額狀態，協助呼叫端決定何時限流或切換                                     | quota, providers            | "Check quota for anthropic"            |
| Provider Discovery | `provider-discovery`  | 列出已安裝的提供者及其能力、免費方案標記、OAuth 狀態                                    | providers, discovery        | "What providers are available?"        |
| Cost Analysis      | `cost-analysis`       | 根據目錄及近期使用量，估算請求/對話的成本                                               | cost, usage                 | "Estimate cost for this conversation"  |
| Health Report      | `health-report`       | 彙總各提供者的斷路器、冷卻、鎖定狀態                                                  | health, resilience          | "Show health status of all providers"  |
| List Capabilities  | `list-capabilities`   | 回傳完整的 42 項代理技能目錄，以 Markdown 表格呈現，附原始 SKILL.md 網址供注入上下文     | catalog, discovery, skills  | "List all OmniRoute capabilities"      |

> 注意：Agent Card 描述目前標示「36+ 個提供者」（`src/app/.well-known/agent.json/route.ts:26` 及 `:55`）。實際目錄已成長至 180+ 個提供者——該字串應在後續變更中更新（另開文件/程式碼待辦事項追蹤；此處不修改）。

### `list-capabilities` 技能詳情

`list-capabilities` 技能對於需要在發送 API 呼叫前探索 OmniRoute 能力的外部代理尤其有用。它回傳結構化的 Markdown 表格產出：

```
| ID | Name | Category | Area | Endpoints/Commands | Raw URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | Auth & Sessions | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

每一列都包含 `rawUrl` 欄位，讓代理可直接擷取完整的 SKILL.md。`metadata.totalSkills` 欄位固定為 `42`。實作位於：`src/lib/a2a/skills/listCapabilities.ts`。另請參閱 [AGENT-SKILLS.md](./AGENT-SKILLS.md)。

---

## REST API（輔助）

JSON-RPC 端點 `/a2a` 是標準的 A2A 進入點。以下 REST 端點為儀表板和外部工具提供輔助存取：

| 端點                          | 方法   | 描述                      | 驗證方式               |
| :---------------------------- | :----- | :------------------------ | :--------------------- |
| `/api/a2a/status`             | GET    | 伺服器狀態、已註冊技能    | (公開)                 |
| `/api/a2a/tasks`              | GET    | 列出任務（可篩選）        | management             |
| `/api/a2a/tasks/[id]`         | GET    | 依 ID 取得任務            | management             |
| `/api/a2a/tasks/[id]/cancel`  | POST   | 取消執行中的任務           | management             |
| `/.well-known/agent.json`     | GET    | Agent Card（A2A 探索）    | (公開，快取 3600 秒)   |

---

## 新增技能

1. **建立技能檔案：** `src/lib/a2a/skills/<your-skill>.ts`

   匯出一個非同步函式 `(task: A2ATask) => Promise<{ artifacts, metadata }>`。請遵循現有技能（如 `smartRouting.ts`）的結構。

2. **註冊處理器：** 在 `src/lib/a2a/taskExecution.ts` 中，將項目加入 `A2A_SKILL_HANDLERS`：

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...existing skills
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **在 Agent Card 中揭露：** 在 `src/app/.well-known/agent.json/route.ts` 中，附加至 `skills` 陣列：

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "簡短、聚焦意圖的描述",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **撰寫測試：** `tests/unit/a2a-<your-skill>.test.ts`。涵蓋正常路徑及錯誤路徑。

5. **撰寫文件：** 將新技能加入本文件的「可用技能」表格。

---

## 任務 TTL

任務在 `ttlMinutes`（預設 5 分鐘）後過期——此參數配置於 `src/lib/a2a/taskManager.ts:82` 的 `A2ATaskManager` 建構子中。若要自訂，請複製 `A2ATaskManager` 實體化並傳入不同的值（例如 `new A2ATaskManager(15)` 代表 15 分鐘 TTL）。背景排程器每 60 秒清除一次過期任務。

---

## 任務生命週期

```
submitted → working → completed
                    → failed
                    → cancelled
```

- 任務預設在 5 分鐘後過期（參見[任務 TTL](#任務-ttl)）
- 終止狀態：`completed`、`failed`、`cancelled`
- 事件日誌追蹤每一次狀態轉換

---

## 錯誤碼

| 代碼   | 含義                        |
| :----- | :-------------------------- |
| -32700 | 解析錯誤（JSON 格式無效）   |
| -32600 | 無效請求 / 未授權           |
| -32601 | 方法或技能不存在            |
| -32602 | 參數無效                    |
| -32603 | 內部錯誤                    |
| -32000 | A2A 端點已停用              |

---

## 整合範例

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
