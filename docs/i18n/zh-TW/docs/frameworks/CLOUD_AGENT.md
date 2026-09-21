# Cloud Agents (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/CLOUD_AGENT.md) · 🇪🇹 [am](../../../am/docs/frameworks/CLOUD_AGENT.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/CLOUD_AGENT.md) · 🇦🇿 [az](../../../az/docs/frameworks/CLOUD_AGENT.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/CLOUD_AGENT.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/CLOUD_AGENT.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/CLOUD_AGENT.md) · 🇩🇰 [da](../../../da/docs/frameworks/CLOUD_AGENT.md) · 🇩🇪 [de](../../../de/docs/frameworks/CLOUD_AGENT.md) · 🇬🇷 [el](../../../el/docs/frameworks/CLOUD_AGENT.md) · 🇪🇸 [es](../../../es/docs/frameworks/CLOUD_AGENT.md) · 🇪🇪 [et](../../../et/docs/frameworks/CLOUD_AGENT.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/CLOUD_AGENT.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/CLOUD_AGENT.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/CLOUD_AGENT.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/CLOUD_AGENT.md) · 🇮🇱 [he](../../../he/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/CLOUD_AGENT.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/CLOUD_AGENT.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/CLOUD_AGENT.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/CLOUD_AGENT.md) · 🇮🇩 [id](../../../id/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/CLOUD_AGENT.md) · 🇮🇹 [it](../../../it/docs/frameworks/CLOUD_AGENT.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/CLOUD_AGENT.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/CLOUD_AGENT.md) · 🇰🇭 [km](../../../km/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/CLOUD_AGENT.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/CLOUD_AGENT.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/CLOUD_AGENT.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/CLOUD_AGENT.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/CLOUD_AGENT.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/CLOUD_AGENT.md) · 🇲🇲 [my](../../../my/docs/frameworks/CLOUD_AGENT.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/CLOUD_AGENT.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/CLOUD_AGENT.md) · 🇳🇴 [no](../../../no/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [or](../../../or/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/CLOUD_AGENT.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/CLOUD_AGENT.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/CLOUD_AGENT.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/CLOUD_AGENT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/CLOUD_AGENT.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/CLOUD_AGENT.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/CLOUD_AGENT.md) · 🇱🇰 [si](../../../si/docs/frameworks/CLOUD_AGENT.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/CLOUD_AGENT.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/CLOUD_AGENT.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/CLOUD_AGENT.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/CLOUD_AGENT.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/CLOUD_AGENT.md) · 🇮🇳 [te](../../../te/docs/frameworks/CLOUD_AGENT.md) · 🇹🇭 [th](../../../th/docs/frameworks/CLOUD_AGENT.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/CLOUD_AGENT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/CLOUD_AGENT.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/CLOUD_AGENT.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/CLOUD_AGENT.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/CLOUD_AGENT.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/CLOUD_AGENT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/CLOUD_AGENT.md)

---

> **真實來源：** `src/lib/cloudAgent/` 與 `src/app/api/v1/agents/tasks/`
> **最後更新：** 2026-06-28 — v3.8.40（更新 frontmatter；共 4 個代理，包括 cursor-cloud）

OmniRoute 將第三方雲端託管的程式設計代理（Codex Cloud、Cursor、
Devin、Jules）協調為長時間執行的任務。每個代理都封裝於統一介面之後，
讓用戶端可以提交提示詞 + 儲存庫 URL 並接收結果，而不必處理
提供者特定的 API。

Cloud Agent 任務**不是**一般的聊天補全。它是一個持久、包含多個步驟的
工作單元，可能需要數分鐘到數小時才能完成，能以 Pull Request 作為其
產出，並支援後續訊息以及（在部分提供者中）計畫核准閘門。

![Cloud Agent 任務生命週期](../diagrams/exported/cloud-agent-flow.svg)

> 來源：[diagrams/cloud-agent-flow.mmd](../diagrams/cloud-agent-flow.mmd)

## 支援的代理

| 提供者 ID      | 類別               | 原始碼                                | 上游基礎 URL                            | 計畫核准   |
| -------------- | ------------------ | ------------------------------------- | --------------------------------------- | ---------- |
| `jules`        | `JulesAgent`       | `src/lib/cloudAgent/agents/jules.ts`  | `https://jules.googleapis.com/v1alpha`  | 是         |
| `devin`        | `DevinAgent`       | `src/lib/cloudAgent/agents/devin.ts`  | `https://api.devin.ai/v1`               | 是         |
| `codex-cloud`  | `CodexCloudAgent`  | `src/lib/cloudAgent/agents/codex.ts`  | `https://api.openai.com/v1/codex/cloud` | 否（自動） |
| `cursor-cloud` | `CursorCloudAgent` | `src/lib/cloudAgent/agents/cursor.ts` | `https://api.cursor.com/v0`             | 否（自動） |

登錄檔：`src/lib/cloudAgent/registry.ts` — 匯出 `getAgent(providerId)`、
`getAvailableAgents()` 與 `isCloudAgentProvider(providerId)`。登錄檔是一個
普通的記憶體內 `Record<string, CloudAgentBase>`，於模組載入時填入內容。

## 架構

```
用戶端（儀表板 / CLI / API）
  → POST /api/v1/agents/tasks（需要管理驗證）
    → CreateCloudAgentTaskSchema 驗證（Zod）
    → registry.getAgent(providerId)
    → getCloudAgentCredentials(providerId)
      └─ 從 getProviderConnections({ provider, isActive: true }) 取得
         （優先使用 apiKey，若無則改用 accessToken）
    → agent.createTask({ prompt, source, options }, credentials)
      └─ 向上游提供者 API 傳送 HTTP POST
      └─ 傳回包含內部 id + externalId 的 CloudAgentTask
    → 將 insertCloudAgentTask(...) 寫入 cloud_agent_tasks（SQLite）

輪詢（讀取時延遲同步）：
  GET /api/v1/agents/tasks/[id]
    → getCloudAgentTaskById(id)
    → agent.getStatus(externalId, credentials)  // 重新整理狀態 + 活動
    → 使用新狀態、結果、completed_at 執行 updateCloudAgentTask(...)
    → 傳回序列化後的任務

互動：
  POST /api/v1/agents/tasks/[id]  內文：{ action: "approve" | "message" | "cancel" }
    → agent.approvePlan(externalId, credentials)        用於 "approve"
    → agent.sendMessage(externalId, message, credentials) 用於 "message"
    → 狀態變更為 "cancelled"                           用於 "cancel"（僅限本機）
```

同步採用**延遲**模式：每次呼叫 `GET /tasks/[id]` 時，都會從上游重新整理狀態。
沒有背景輪詢器。需要最新狀態的儀表板應以合理的時間間隔輪詢 GET
端點。

## `CloudAgentBase` 介面

來源：`src/lib/cloudAgent/baseAgent.ts`

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

  protected mapStatus(raw: string): CloudAgentStatus; // 啟發式將上游字串 → 列舉
  protected generateTaskId(): string; // `task_<ts>_<rand>`
  protected generateActivityId(): string; // `act_<ts>_<rand>`
}
```

`CodexCloudAgent.approvePlan` 會刻意擲出例外——Codex Cloud 會自動規劃，且沒有核准閘門。`CodexCloudAgent.listSources` 會回傳 `[]`。

`CursorCloudAgent` 透過 Cursor 的官方 REST API（`api.cursor.com/v0`），使用**使用者或服務帳戶 API 金鑰**來驅動 Cursor 的 Background / Cloud Agents——相較於重複使用 Cursor IDE 的 OAuth 工作階段（提供者 `cursor`，帶有帳號遭封鎖的風險警告），這是更安全的第一方替代方案。它是純 REST 轉接器（不含 `@cursor/sdk` 原生相依套件）。`approvePlan` 會擲出例外（Cursor 代理程式會自主執行）；`listSources` 會列出該金鑰可存取的儲存庫。Cursor 會回傳大寫狀態列舉（`CREATING`/`RUNNING`/`FINISHED`/`ERROR`），這些值會明確對應至共用的 `CloudAgentStatus`。每組認證均可覆寫 `baseUrl`，因此無須變更程式碼即可修正 API 版本／路徑。

## 領域類型

來源：`src/lib/cloudAgent/types.ts`

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
  repoUrl: string; // 必須是有效的 URL
  branch?: string;
}

export interface CloudAgentResult {
  prUrl?: string;
  prNumber?: number;
  commitMessage?: string;
  diffUrl?: string;
  summary?: string;
  duration?: number; // 秒數，正整數
  cost?: number; // 正浮點數
}

export interface CloudAgentActivity {
  id: string;
  type: "plan" | "command" | "code_change" | "message" | "error" | "completion";
  content: string;
  timestamp: string; // ISO 8601
  metadata?: Record<string, unknown>;
}

export interface CloudAgentTask {
  id: string; // 內部 `task_...` ID
  providerId: "jules" | "devin" | "codex-cloud" | "cursor-cloud";
  externalId?: string; // 上游提供者的 ID
  status: CloudAgentStatus;
  prompt: string; // 1..10000 個字元
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

驗證結構描述（`CreateCloudAgentTaskSchema`、`UpdateCloudAgentTaskSchema`）會與這些類型一同匯出，並由路由處理常式使用。

## 資料庫

來源：`src/lib/cloudAgent/db.ts` — 資料表會透過
`createCloudAgentTaskTable()` 延遲建立（亦會在匯入
`src/lib/cloudAgent/index.ts` 模組時呼叫）。

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

`updateCloudAgentTask` 會強制執行**欄位白名單**以防止 SQL 注入：
`status`、`prompt`、`source`、`options`、`result`、`activities`、`error`、
`completed_at`。部分更新中的任何其他鍵都會被靜默捨棄。

## REST API — 任務生命週期

**驗證：**所有 `/api/v1/agents/tasks*` 端點都需要**管理驗證**
（`requireCloudAgentManagementAuth` 會包裝來自
`src/lib/api/requireManagementAuth` 的 `requireManagementAuth`）。此要求於提交 `588a0333`
（_"fix(auth): require management auth for agent and cooldown APIs"_）之後強制執行。

| 方法    | 路徑                          | 用途                                                    |
| ------- | ----------------------------- | ------------------------------------------------------- |
| OPTIONS | `/api/v1/agents/tasks`        | CORS 預檢                                               |
| GET     | `/api/v1/agents/tasks`        | 列出任務（篩選條件：`provider`、`status`、`limit≤500`） |
| POST    | `/api/v1/agents/tasks`        | 建立任務（分派至上游並持久化）                          |
| DELETE  | `/api/v1/agents/tasks?id=...` | 依查詢參數 id 刪除任務（**不會**取消上游任務）          |
| OPTIONS | `/api/v1/agents/tasks/[id]`   | CORS 預檢                                               |
| GET     | `/api/v1/agents/tasks/[id]`   | 讀取任務並從上游延遲同步狀態                            |
| POST    | `/api/v1/agents/tasks/[id]`   | 動作：`approve` / `message` / `cancel`                  |
| DELETE  | `/api/v1/agents/tasks/[id]`   | 依路徑 id 刪除任務                                      |

### 建立任務

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

回應 `201`：

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

### 核准計畫

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"action":"approve"}'
```

### 傳送後續訊息

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"message","message":"Also add a unit test for the parser"}'
```

### 取消（僅限本機狀態）

```bash
curl -X POST http://localhost:20128/api/v1/agents/tasks/<id> \
  -d '{"action":"cancel"}'
```

`cancel` 會將本機資料庫中的 `status` 變更為 `"cancelled"`，但**不會**呼叫
上游提供者——`CloudAgentBase` 中沒有中止 RPC。若要停止上游計費，
請在提供者自己的主控台中終止任務。

## REST API — 雲端提供者基礎整合

`src/app/api/cloud/` 下的這些輔助端點供遠端用戶端
（CLI、Electron 應用程式或同步工作器）用來讀取提供者連線中繼資料
並解析模型別名。它們使用**一般 API 金鑰**
（透過 `validateApiKey`）進行驗證，而非任務端點所使用的管理驗證。

| 方法 | 路徑                            | 用途                                                |
| ---- | ------------------------------- | --------------------------------------------------- |
| POST | `/api/cloud/auth`               | 驗證 API 金鑰，傳回遮罩處理的連線中繼資料與模型別名 |
| PUT  | `/api/cloud/credentials/update` | 更新 `accessToken` / `refreshToken` / `expiresAt`   |
| POST | `/api/cloud/model/resolve`      | 將模型別名解析為 `{ provider, model }`              |
| GET  | `/api/cloud/models/alias`       | 列出所有模型別名                                    |
| PUT  | `/api/cloud/models/alias`       | 設定模型別名（若已啟用，會自動同步至 Cloud）        |

`/api/cloud/auth` 絕不會傳回原始的 `apiKey` / `accessToken` / `refreshToken`。它會
傳回 `hasApiKey`、`hasAccessToken`、`hasRefreshToken`，以及遮罩處理的預覽
（`maskedApiKey`：前 4 個字元 + `****` + 後 4 個字元）。

## 憑證解析

`src/lib/cloudAgent/api.ts` 中的 `getCloudAgentCredentials(providerId)`：

1. 透過 `getProviderConnections({ provider: providerId, isActive: true })` 載入作用中的提供者連線。
2. 對每個連線，優先使用 `apiKey`（去除前後空白）；若無，則改用 `accessToken`。
3. 傳回第一個非空白權杖，並包裝為 `{ apiKey: token }`。
4. 若找不到可用的權杖，則傳回 `null`；API 會回應 `400`，並附上
   `"未為雲端代理提供者設定作用中的憑證：<id>"`。

這表示 Cloud Agents 與一般 LLM
提供者共用同一個 Provider Connection 資料表。若要啟用 Jules，請建立一個作用中的連線，將 `provider` 設為 `"jules"`，
並填入 `apiKey`。

## 儀表板

原始碼：`src/app/(dashboard)/dashboard/cloud-agents/page.tsx`

一個使用 `"use client"` 的 React 頁面，可：

- 列出任務（透過 `GET /api/v1/agents/tasks` 輪詢）。
- 透過對應至 `CreateCloudAgentTaskSchema` 的表單提交新任務。
- 顯示狀態徽章（`queued`、`running`、`awaiting_approval`、`completed`、
  `failed`、`cancelled`），並呈現 `activities[]` 時間軸。
- 當 `status === "completed"` 時，顯示 `result.prUrl` / `commitMessage` / `summary`。

## 與 A2A 整合

透過註冊 A2A 技能，可以將 Cloud Agents 公開為 A2A 技能；該技能會將其
`tasks/send` 處理常式委派給 `getAgent(...).createTask(...)`，並將 A2A 任務
狀態事件轉換為 JSON-RPC 2.0 協定。請參閱 [A2A-SERVER.md](./A2A-SERVER.md)。

## 新增 Cloud Agent

1. 建立 `src/lib/cloudAgent/agents/<name>.ts`，並擴充 `CloudAgentBase`。
2. 實作 `createTask`、`getStatus`、`approvePlan`（若不適用則擲回例外）、
   `sendMessage`、`listSources`。使用 `this.mapStatus(...)` 進行狀態標準化。
3. 在 `src/lib/cloudAgent/registry.ts` 中使用穩定的 `providerId` 進行註冊。
4. 擴充 `src/lib/cloudAgent/types.ts` 中的 `providerId` 字面值聯集
   （`CloudAgentTask.providerId` 和 `CreateCloudAgentTaskSchema`）。
5. 如果該提供者需要連線
   記錄，請將其新增至 `src/shared/constants/providers.ts`。使用 OAuth 的提供者還需要新增至 `src/lib/oauth/providers/`。
6. 在 `tests/unit/cloud-agent-*.test.ts` 下新增測試。
7. 更新此文件及儀表板的 `CLOUD_AGENTS` 常數。

## 設定

| 環境變數         | 用途                                          |
| ---------------- | --------------------------------------------- |
| `DATA_DIR`       | 儲存 `cloud_agent_tasks` 的 SQLite 資料庫位置 |
| `JWT_SECRET`     | 任務端點上的管理驗證所必需                    |
| `API_KEY_SECRET` | 用於加密靜態儲存的提供者連線憑證              |

目前沒有 Cloud-Agent 專用的環境變數——所有密鑰都儲存在
`provider_connections` 資料表中。

## 另請參閱

- [A2A-SERVER.md](./A2A-SERVER.md)
- [API_REFERENCE.md](../reference/API_REFERENCE.md)
- [SKILLS.md](./SKILLS.md)
- [MEMORY.md](./MEMORY.md)
- 原始碼：`src/lib/cloudAgent/`
- 路由：`src/app/api/v1/agents/tasks/`、`src/app/api/cloud/`
- 儀表板：`src/app/(dashboard)/dashboard/cloud-agents/page.tsx`
