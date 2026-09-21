# ACP (Agent Client Protocol) (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md)

---

> **TL;DR**：ACP 讓 OmniRoute 能以子行程方式啟動 CLI 代理程式（例如 Claude Code、Codex），而非使用 HTTP API。這為你提供「以 CLI 作為後端」的傳輸方式。

---

## 什麼是 ACP？

ACP（Agent Client Protocol，代理程式用戶端協定）是 OmniRoute 的一種 **「以 CLI 作為後端」的傳輸方式**。ACP 不會攔截傳送至 AI 提供者的 HTTP API 呼叫，而是**以子行程方式啟動 CLI 代理程式**，並透過其原生介面傳入提示詞。

### 為什麼要使用 ACP？

| 優點                  | 說明                             |
| --------------------- | -------------------------------- |
| **不需要 API 金鑰**   | 使用你現有的 CLI 驗證            |
| **原生協定**          | 使用各 CLI 的原生輸入／輸出格式  |
| **自動探索**          | 偵測系統上已安裝的 CLI           |
| **15 個內建代理程式** | 已針對熱門 CLI 工具完成預先設定  |
| **自訂代理程式**      | 透過設定新增你自己的 CLI 工具    |
| **行程管理**          | 處理生命週期（啟動、傳送、終止） |

---

## 支援的 CLI 代理程式

ACP 開箱即支援 **15 個內建 CLI 代理程式**：

| 代理程式 ID   | 顯示名稱           | 執行檔        | 協定  |
| ------------- | ------------------ | ------------- | ----- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio |
| `claude`      | Claude Code CLI    | `claude`      | stdio |
| `goose`       | Goose CLI          | `goose`       | stdio |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio |
| `aider`       | Aider              | `aider`       | stdio |
| `opencode`    | OpenCode           | `opencode`    | stdio |
| `cline`       | Cline              | `cline`       | stdio |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio |
| `forge`       | ForgeCode          | `forge`       | stdio |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio |
| `interpreter` | Open Interpreter   | `interpreter` | stdio |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio |
| `warp`        | Warp AI            | `warp`        | stdio |
| `gemini`      | Gemini CLI         | `gemini`      | stdio |
| `zcode`       | ZCode              | `zcode`       | stdio |

### 自訂代理程式

你可以透過設定新增自己的 CLI 代理程式。自訂代理程式支援與內建代理程式相同的功能。

---

## 快速開始

### 步驟 1：安裝 CLI 代理程式

```bash
# 範例：安裝 Claude Code CLI
npm install -g @anthropic-ai/claude-code

# 驗證安裝
claude --version
```

### 步驟 2：ACP 自動偵測

ACP 會自動偵測系統上已安裝的 CLI 代理程式，無須進行任何設定！

### 步驟 3：使用 ACP 傳輸

偵測到代理程式後，即可將 ACP 用作任何受支援提供者的傳輸方式。當 CLI 可用時，OmniRoute 會自動使用 ACP。

---

## ACP 的運作方式

### 架構

```
┌─────────────────┐
│  OmniRoute      │
│  （HTTP Proxy） │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  子行程         │
│  （CLI 代理程式）│
│                 │
│  stdin  ◄──────┤  傳送提示詞
│  stdout ──────►│  接收回應
│  stderr ──────►│  接收錯誤
└─────────────────┘
```

### 行程生命週期

1. **啟動** — ACP 為 CLI 代理程式建立子行程
2. **傳送** — ACP 將提示詞寫入行程的 stdin
3. **接收** — ACP 從 stdout/stderr 讀取回應
4. **閒置偵測** — ACP 等待 2 秒無活動後，才會將回應視為完成
5. **終止** — ACP 終止行程（先傳送 SIGTERM，5 秒後再傳送 SIGKILL）

### 通訊協定

ACP 使用 **stdio**（標準輸入／輸出）與 CLI 代理程式通訊。其協定如下：

1. **傳送提示詞** — 寫入 stdin，並附加換行字元
2. **等待回應** — 從 stdout 讀取內容，直到進入閒置狀態（2 秒無輸出）
3. **逾時** — 預設為 120 秒（可設定）

---

## API 參考

### 登錄函式

#### `detectInstalledAgents()`

偵測系統上所有已安裝的 CLI 代理程式。結果會快取 60 秒。

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// 傳回：CliAgentInfo[]

interface CliAgentInfo {
  id: string; // 例如："codex"、"claude"
  name: string; // 顯示名稱
  binary: string; // 要啟動的二進位檔名稱
  versionCommand: string; // 版本偵測命令
  version: string | null; // 偵測到的版本（若未安裝則為 null）
  installed: boolean; // 代理程式是否已安裝
  providerAlias: string; // OmniRoute 中的提供者 ID
  spawnArgs: string[]; // 啟動時要傳遞的引數
  protocol: "stdio" | "http"; // 通訊協定
  isCustom?: boolean; // 是否為使用者定義的自訂代理程式
}
```

#### `getAvailableAgents()`

僅取得已安裝且可供 ACP 使用的代理程式。

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// 傳回：CliAgentInfo[]（僅包含已安裝的代理程式）
```

#### `getAgentById(id)`

依 ID 取得特定代理程式。

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// 傳回：CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

從設定中設置自訂代理程式定義。

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### 管理器函式

#### `acpManager.spawn(agentId, binary, args, env)`

啟動新的 CLI 代理程式處理程序。

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* 自訂環境變數 */
});
// 傳回：AcpSession
```

**允許的代理程式 ID**：`["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

將提示傳送至 CLI 代理程式並收集回應。

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 逾時時間為 2 分鐘
);
// 傳回：Promise<string>
```

#### `acpManager.kill(sessionId)`

終止工作階段並進行清理。

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// 傳回：boolean
```

#### `acpManager.getActiveSessions()`

取得所有作用中的工作階段。

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// 傳回：AcpSession[]
```

#### `acpManager.killAll()`

終止所有工作階段。

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### 工作階段介面

```typescript
interface AcpSession {
  id: string; // 唯一工作階段 ID
  agentId: string; // 代理程式 ID（例如："claude"）
  process: ChildProcess; // 子處理程序控制代碼
  alive: boolean; // 處理程序是否仍在執行
  stdoutBuffer: string; // 累積的 stdout 緩衝區
  stderrBuffer: string; // 累積的 stderr 緩衝區
  createdAt: Date; // 建立時間戳記
}
```

### 事件

`AcpManager` 擴充了 `EventEmitter`，並會發出下列事件：

#### `stdout`

當 CLI 代理程式寫入 stdout 時發出。

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

當 CLI 代理程式寫入 stderr 時發出。

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

當 CLI 代理程式處理程序結束時發出。

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

當 CLI 代理程式處理程序發生錯誤時發出。

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## 設定

### 環境變數

ACP 會繼承父程序的所有環境變數，也可以使用自訂環境變數加以擴充：

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### 啟動參數

每個代理程式在登錄檔中都有預設的啟動參數。你可以覆寫這些參數：

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### 逾時

預設的提示逾時時間為 **120 秒**（2 分鐘）。你可以覆寫此設定：

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 分鐘
```

### 偵測快取

代理程式偵測結果會快取 **60 秒**，以避免成本高昂的檔案系統掃描。若要強制重新整理：

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## 安全性

### 防止命令注入

ACP 會驗證版本命令，以防止命令注入攻擊：

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

包含下列字元的版本命令將被拒絕：

- `;` — 命令分隔符號
- `&` — 背景程序
- `|` — 管線
- `<`, `>` — 重新導向
- `` ` `` — 命令替換
- `$` — 變數展開
- `\r`, `\n` — 換行符號

### 二進位檔名稱驗證

ACP 會驗證版本命令中的二進位檔名稱是否符合預期的二進位檔名稱（自訂代理程式除外）。

### 程序隔離

每個 ACP 工作階段都在其各自的子程序中執行。工作階段結束或逾時時，該程序會被終止。

---

## 效能

### 偵測效能

- **首次呼叫**：約 50-200ms（為每個代理程式執行 `version` 命令）
- **快取呼叫**：<1ms（從快取傳回）
- **快取 TTL**：60 秒

### 提示效能

- **啟動**：約 50-100ms
- **傳送提示**：約 10-50ms
- **等待回應**：取決於 CLI 代理程式（通常為 1-30 秒）
- **終止**：約 5 秒（SIGTERM）+ 立即執行（SIGKILL）

### 資源使用量

- **每個工作階段的記憶體**：約 10-50MB（取決於 CLI 代理程式）
- **CPU**：極少（受 I/O 限制）
- **磁碟**：無

---

## 疑難排解

### 「Unknown agent」錯誤

**問題**：`acpManager.spawn()` 擲回 `Unknown agent: <id>`

**解決方案**：`spawn()` 僅允許使用下列代理程式：

- `claude`
- `codex`
- `gemini`
- `qwen`

其他代理程式必須手動啟動，或透過自訂代理程式定義啟動。

### 「Session not alive」錯誤

**問題**：`acpManager.sendPrompt()` 擲回 `Session ${sessionId} is not alive`

**解決方案**：工作階段可能已結束或遭到終止。請檢查工作階段狀態：

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // 重新啟動工作階段
  acpManager.spawn("claude", "claude", [], {});
}
```

### 「ACP timeout」錯誤

**問題**：`acpManager.sendPrompt()` 擲回 `ACP timeout after 120000ms`

**解決方案**：增加逾時時間：

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5 分鐘
```

### 未偵測到 CLI

**問題**：`detectInstalledAgents()` 找不到你的 CLI

**解決方案**：

1. **檢查 PATH**：確保 CLI 位於系統 PATH 中
2. **檢查版本命令**：手動執行 `claude --version`
3. **檢查權限**：確保 CLI 可執行
4. **自訂代理程式**：為非標準 CLI 新增自訂代理程式定義

### 權限遭拒

**問題**：ACP 無法執行 CLI

**解決方案**：

1. **檢查檔案權限**：`chmod +x /usr/local/bin/claude`
2. **檢查擁有權**：確保 OmniRoute 具有讀取／執行權限
3. **檢查 SELinux/AppArmor**：其可能會阻止程序啟動

---

## 範例

### 範例 1：啟動並使用 Claude Code

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// 偵測已安裝的代理程式
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // 啟動新的工作階段
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // 傳送提示詞
  const response = await acpManager.sendPrompt(
    session.id,
    "Explain quantum computing in 100 words"
  );

  console.log("Claude's response:", response);

  // 清理資源
  acpManager.kill(session.id);
}
```

### 範例 2：具備備援機制的自動探索

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// 優先嘗試 Claude，並以 Codex 作為備援
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("No ACP-compatible CLI agent found");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "Hello!");

acpManager.kill(session.id);
```

### 範例 3：自訂代理程式

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// 註冊自訂 CLI 代理程式
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// 現在 detectInstalledAgents() 將包含 "my-llm-cli"
const agents = detectInstalledAgents();
```

---

## 接下來呢？

- **[API 參考](../reference/API_REFERENCE.md)** — REST API 端點
- **[提供者參考](../reference/PROVIDER_REFERENCE.md)** — 全部 352 個提供者
- **[MCP 伺服器](./MCP-SERVER.md)** — Model Context Protocol 整合
- **[A2A 伺服器](./A2A-SERVER.md)** — 代理程式對代理程式協定
- **[雲端代理程式](./CLOUD_AGENT.md)** — 雲端型代理程式

---

## 參考資料

- [AionUi 專案](https://github.com/iOfficeAI/AionUi) — ACP 自動偵測的靈感來源
- [ACP 原始碼](../../src/lib/acp/) — 實作細節
  - `manager.ts` — 程序生命週期管理
  - `registry.ts` — 代理程式探索與註冊
  - `index.ts` — 公開 API 匯出
