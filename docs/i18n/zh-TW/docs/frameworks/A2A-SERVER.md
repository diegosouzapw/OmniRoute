# OmniRoute A2A Server Documentation (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — OmniRoute 作為智慧路由代理程式

A2A 介面有兩種形式：

- **JSON-RPC 2.0**：位於 `POST /a2a`（標準進入點，定義於 `src/app/a2a/route.ts`）。
- **REST**：位於 `/api/a2a/*`，供儀表板與工具使用（狀態、任務清單、取消）。

任務由 `A2ATaskManager` 追蹤（`src/lib/a2a/taskManager.ts`，預設 TTL 為 5 分鐘）。技能透過 `src/lib/a2a/taskExecution.ts` 中的 `A2A_SKILL_HANDLERS` 分派。

## 代理程式探索

```bash
curl http://localhost:20128/.well-known/agent.json
```

傳回描述 OmniRoute 功能、技能及驗證需求的代理程式資訊卡。

代理程式資訊卡的 `version` 欄位來源為 `process.env.npm_package_version`（請參閱 `src/app/.well-known/agent.json/route.ts:13`），因此每次發行時都會與 `package.json` 自動同步。

---

## 驗證

所有 `/a2a` 請求都必須透過 `Authorization` 標頭提供 API 金鑰：

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

若伺服器未設定 API 金鑰，則會略過驗證。

## 啟用

A2A 由 **Endpoints → A2A** 切換開關控制，預設為停用。停用時，
`GET /api/a2a/status` 會回報 `status: "disabled"` 與 `online: false`；對
`POST /a2a` 的 JSON-RPC 呼叫會傳回 HTTP 503，並包含 JSON-RPC 錯誤代碼 `-32000`。

---

## JSON-RPC 2.0 方法

### `message/send` — 同步執行

將訊息傳送給技能，並等待完整回應。

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

### `message/stream` — SSE 串流

與 `message/send` 相同，但會傳回伺服器傳送事件，以進行即時串流。

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

### `tasks/get` — 查詢任務狀態

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — 取消任務

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## 可用技能

OmniRoute 公開了 6 項 A2A 技能，並於 `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS` 中完成連接。每個技能模組皆位於 `src/lib/a2a/skills/`。

| 技能         | ID                   | 說明                                                                                                                          | 標籤             | 範例                          |
| :----------- | :------------------- | :---------------------------------------------------------------------------------------------------------------------------- | :--------------- | :---------------------------- |
| 智慧路由     | `smart-routing`      | 使用 OmniRoute 的組合引擎與評分機制，透過最佳提供者／組合路由提示詞                                                           | 路由、提供者     | 「透過最佳模型路由此提示詞」  |
| 配額管理     | `quota-management`   | 回報各提供者的配額狀態，協助呼叫端判斷何時應限流／切換                                                                        | 配額、提供者     | 「檢查 anthropic 的配額」     |
| 提供者探索   | `provider-discovery` | 列出已安裝的提供者及其功能、免費方案標記與 OAuth 狀態                                                                         | 提供者、探索     | 「有哪些可用的提供者？」      |
| 成本分析     | `cost-analysis`      | 根據目錄與近期使用情況，估算請求／對話的成本                                                                                  | 成本、使用情況   | 「估算此對話的成本」          |
| 健康狀態報告 | `health-report`      | 彙整各提供者的斷路器、冷卻與鎖定狀態                                                                                          | 健康狀態、韌性   | 「顯示所有提供者的健康狀態」  |
| 列出功能     | `list-capabilities`  | 以 markdown 表格傳回完整的 45 項 Agent Skills 目錄（23 項 API + 21 項 CLI + 1 項設定），並附上用於內容注入的原始 SKILL.md URL | 目錄、探索、技能 | 「列出 OmniRoute 的所有功能」 |

> Agent Card 應與即時的 352 個提供者目錄保持一致；提供者數量及免費／無需驗證的中繼資料皆取自執行階段登錄檔。

### `list-capabilities` 技能詳細資訊

`list-capabilities` 技能對於需要先探索 OmniRoute 所公開功能，再傳送 API 呼叫的外部代理程式特別實用。它會傳回結構化的 markdown 表格成品：

```
| ID | 名稱 | 類別 | 領域 | 端點／命令 | 原始 URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | 驗證與工作階段 | api | 驗證 | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

每一列皆包含 `rawUrl` 欄位，讓代理程式可以立即擷取完整的 SKILL.md。`metadata.totalSkills` 欄位反映目錄大小（目前為 45）。實作：`src/lib/a2a/skills/listCapabilities.ts`。另請參閱 [AGENT-SKILLS.md](./AGENT-SKILLS.md)。

---

## REST API（輔助）

JSON-RPC 端點 `/a2a` 是標準的 A2A 進入點。以下 REST 端點為儀表板與外部工具提供輔助存取：

| 端點                         | 方法 | 說明                                                     | 驗證                                           |
| :--------------------------- | :--- | :------------------------------------------------------- | :--------------------------------------------- |
| `/api/a2a/status`            | GET  | 伺服器狀態、已註冊的技能                                 | （公開）                                       |
| `/api/a2a/tasks`             | GET  | 使用篩選條件列出任務                                     | 管理                                           |
| `/api/a2a/tasks/[id]`        | GET  | 依 ID 取得任務                                           | 管理                                           |
| `/api/a2a/tasks/[id]/cancel` | POST | 取消執行中的任務                                         | 管理                                           |
| `/.well-known/agent.json`    | GET  | Agent Card（A2A 探索）                                   | （公開，快取 3600s）                           |
| `/api/a2a/tasks`             | POST | 將入站委派傳送至 OmniConductor 機群（Conductor PRD RF5） | Bearer 對照 `OMNIROUTE_API_KEY` + `a2aEnabled` |

**入站 Conductor 委派（`POST /api/a2a/tasks`）：**外部 A2A 代理程式透過 OmniRoute 將程式開發工作委派給 OmniConductor 機群。主體：`{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — 只有 Conductor 機群技能（即 Agent Card 上公告的技能）可供委派；`metadata.conductor.repo.url` 為必填（機群在 git 儲存庫上作業）。此路由會使用伺服器端的 `CONDUCTOR_ORCHESTRATOR_TOKEN`（備援為 `CONDUCTOR_HUB_TOKEN`）轉換為中樞的 `POST /v1/tasks`，並傳回 `201 { conductor_task_id, state: "submitted" }`；任務狀態會透過 SSE→A2A 鏡像（RF1）回傳，並可透過 `GET /api/a2a/tasks?skill=conductor` 查看。

---

## 新增技能

1. **建立技能檔案：**`src/lib/a2a/skills/<your-skill>.ts`

   匯出非同步函式 `(task: A2ATask) => Promise<{ artifacts, metadata }>`。請依循現有技能（例如 `smartRouting.ts`）的結構。

2. **註冊處理常式：**在 `src/lib/a2a/taskExecution.ts` 中，新增項目至 `A2A_SKILL_HANDLERS`：

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...現有技能
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **公開於 Agent Card：**在 `src/app/.well-known/agent.json/route.ts` 中，附加至 `skills` 陣列：

   ```json
   {
     "id": "your-skill",
     "name": "您的技能",
     "description": "以意圖為重點的簡短說明",
     "tags": ["路由", "配額"],
     "examples": ["自然語言呼叫範例"]
   }
   ```

4. **撰寫測試：**`tests/unit/a2a-<your-skill>.test.ts`。涵蓋成功路徑與錯誤路徑。

5. **記錄**此檔案之 `Available Skills` 表格中的新技能。

---

## 任務 TTL

任務會在 `ttlMinutes` 後到期（預設為 5 分鐘）— 此設定是在 `src/lib/a2a/taskManager.ts:82` 的 `A2ATaskManager` 建構函式中配置。若要自訂，請分叉 `A2ATaskManager` 的實例化程式碼，並傳入不同的值（例如，使用 `new A2ATaskManager(15)` 設定 15 分鐘的 TTL）。背景計時器每 60 秒會清除一次已到期的任務。

---

## 任務生命週期

```
已提交 → 處理中 → 已完成
                → 失敗
                → 已取消
```

- 任務預設會在 5 分鐘後到期（請參閱[任務 TTL](#task-ttl)）
- 終止狀態：`completed`、`failed`、`cancelled`
- 事件日誌會記錄每次狀態轉換

---

## 錯誤代碼

| 代碼   | 含義                    |
| :----- | :---------------------- |
| -32700 | 解析錯誤（無效的 JSON） |
| -32600 | 無效的請求／未授權      |
| -32601 | 找不到方法或技能        |
| -32602 | 無效的參數              |
| -32603 | 內部錯誤                |
| -32000 | A2A 端點已停用          |

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
