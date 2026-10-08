# Skills Framework (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md)

---

> **真實來源：** `src/lib/skills/` 與 `src/app/api/skills/`
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 提供可擴充的 Skills 框架，讓語言模型（及操作人員）能組合可重複使用的能力——從檔案系統讀取和 HTTP 請求，到沙箱化程式碼執行及精選市集技能。

技能是具有版本、由結構描述定義的工作單元。OmniRoute 可將技能作為工具定義注入傳出請求、攔截模型傳回的工具呼叫、執行相符的處理常式，並將結果傳回模型，使對話得以繼續。模型永遠不會看到實作內容——只會看到工具介面。

---

## Agent Skills 與 Omni Skills

OmniRoute 有兩套截然不同但相輔相成的技能系統：

| 維度         | **Omni Skills**（本文件）                            | **Agent Skills**                                                                           |
| :----------- | :--------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| 用途         | LLM 工具注入 + 沙箱化執行                            | 供外部代理程式探索及使用的 SKILL.md 目錄                                                   |
| 真實來源     | `src/lib/skills/` + 市集                             | `src/lib/agentSkills/` + `skills/` 目錄                                                    |
| 執行階段模式 | 注入傳出請求，並在工具呼叫事件發生時執行             | 靜態 Markdown 目錄 + REST/MCP/A2A 探索端點                                                 |
| 使用者       | OmniRoute 本身（組合路由、傳入 LLM 呼叫）            | 外部代理程式、MCP 用戶端、A2A 協調器                                                       |
| 數量         | 不固定（由市集驅動）                                 | 45 個目錄項目（23 個 API + 21 個 CLI + 1 個設定）                                          |
| 格式         | 含工具結構描述及處理常式的 `SkillDefinition`         | `SKILL.md` frontmatter + Markdown 內文                                                     |
| 探索         | `/api/skills/*` REST + `omniroute_skills_*` MCP 工具 | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP 工具 + A2A `list-capabilities` |

**Omni Skills** 是執行引擎——它們定義當 LLM 叫用工具時，OmniRoute _能做什麼_。

**Agent Skills** 是文件目錄——它們透過可直接送入代理程式提示詞的結構化 SKILL.md 檔案，向外部代理程式說明 _如何使用_ OmniRoute 的 REST API 與 CLI。

如需 Agent Skills 目錄、產生器、MCP 工具及 A2A 技能的資訊，請參閱 [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md)。

---

## 概念

### 技能來源

三種技能來源共存於同一個登錄檔中：

1. **內建技能**（`src/lib/skills/builtins.ts`）——隨 OmniRoute 一同提供，涵蓋常見使用情境：
   - `file_read`、`file_write`——位於 `<DATA_DIR>/skills/workspaces/<hashed-key>/` 下、按 API 金鑰隔離的沙箱工作區
   - `http_request`——透過 `safeOutboundFetch` 傳送的對外 HTTP 請求，並使用 `guard: "public-only"`
   - `web_search`——具備快取功能的可插拔搜尋提供者（`executeWebSearch`）
   - `eval_code`——在 Docker 沙箱中執行 `node` 或 `python`
   - `execute_command`——在 Docker 沙箱中執行 shell 命令
   - `browser`——由 Playwright 支援的基礎架構，預設停用（`builtin/browser.ts`）
2. **SkillsMP**（OmniRoute 市集）——從 `https://skillsmp.com/api/v1/skills/search` 擷取。需要在「設定」中提供 `skillsmpApiKey`。
3. **SkillsSH**（`skills.sh` 社群目錄）——從 `https://skills.sh/api/search` 擷取。不需要驗證；SKILL.md 內容從 GitHub raw 取得。

單一「作用中提供者」控制儀表板從哪個目錄安裝技能（`src/lib/skills/providerSettings.ts`）。可在 **設定 → 記憶體與技能** 下切換。預設值：`skillsmp`。

### 技能識別資訊

技能在記憶體內登錄檔（`src/lib/skills/registry.ts`）中以 `name@version` 作為索引鍵。版本必須符合 semver（`^\d+\.\d+\.\d+$`）。`resolveVersion()` 支援 `^`、`~`、`>`、`>=`、`<`、`<=`、`==` 及完全相符限制條件。

### 技能模式

每項技能都有一個執行階段模式，用於控制何時注入該技能：

| 模式   | 行為                                                          |
| ------ | ------------------------------------------------------------- |
| `on`   | 一律作為工具定義注入                                          |
| `off`  | 永不注入，也永遠不可執行                                      |
| `auto` | 依傳入請求評分；僅在分數 ≥ `AUTO_MIN_SCORE`（預設為 3）時注入 |

`auto` 是從市集安裝之技能的預設值。`enabled=true` 與 `mode="off"` 同時存在表示「已登錄但未啟用」——透過舊版欄位切換 `enabled` 時，也會同步更新 `mode`，使較舊的程式碼路徑保持一致（`src/app/api/skills/[id]/route.ts`）。

### 狀態（執行）

技能執行記錄於 `skill_executions` 資料表中，並具有以下狀態（`src/lib/skills/types.ts`）：

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### 登錄檔快取

`SkillRegistry` 是具有 60 秒 TTL 快取的單例（`registry.ts:14`）。`loadFromDatabase()` 具有冪等性，並透過 `pendingLoad` 對並行呼叫進行去重。任何寫入操作（`register`/`unregister`/`unregisterById`）都會使快取失效。可透過 `getSkillVersions(name)` 與 `resolveVersion(name, constraint)` 查詢版本。

### 感知提供者的注入

`src/lib/skills/injection.ts` 中的 `injectSkills()` 是將已登錄技能轉換為提供者特定工具定義的進入點：

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

工具名稱會編碼為 `name@version`，以便處理常式在模型回呼時選擇正確的版本。

### AUTO 評分

當 `mode="auto"` 時，系統會根據請求上下文對每個候選技能進行評分（`injection.ts` 中的 `scoreAutoSkill()`）：

| 訊號                               | 分數        |
| ---------------------------------- | ----------- |
| 技能名稱逐字出現在上下文中         | +6          |
| 每個名稱權杖與上下文權杖相符       | +2          |
| 每個標籤子字串與上下文相符         | +3          |
| 每個描述權杖與上下文相符           | +1          |
| 背景原因與名稱權杖相符             | 每個權杖 +2 |
| 背景原因與標籤相符                 | 每個權杖 +2 |
| 標籤中的提供者提示與請求提供者相符 | +2 / −2     |

系統會注入排名最高、`score >= AUTO_MIN_SCORE = 3` 的 `AUTO_MAX_SKILLS = 5` 個技能。若分數相同，則先依 `installCount`（降冪）排序，再依名稱字母順序排序（`injection.ts:225-235`）。

### 工具呼叫攔截

上游傳回工具呼叫回應後，聊天處理常式會叫用 `src/lib/skills/interception.ts` 中的 `handleToolCallExecution()`：

1. `extractToolCalls()` 會讀取提供者特定的格式（OpenAI `tool_calls` / Responses `function_call`、Anthropic `tool_use`、Gemini `functionCalls`）。
2. 先解析內建工具別名（例如 `omniroute_web_search` → `web_search`）。內建處理常式會直接執行。
3. 其他所有呼叫都會透過 `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })` 路由。
4. 結果會視情況插回回應中，成為 `tool_results`、`function_call_output` 項目，或 Anthropic `tool_result` 區塊。

執行上下文中的 `customSkillExecutionEnabled` 可設為 `false`，以僅允許內建攔截（供明確停用使用者定義處理常式的請求路徑使用）。

---

## Docker 沙箱

非內建程式碼路徑（`eval_code`、`execute_command`）會透過 `SandboxRunner`（`src/lib/skills/sandbox.ts`）在 Docker 內執行。每個容器啟動時都會使用：

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only（當 readOnly=true 時）
```

預設值（`SandboxRunner.DEFAULT_CONFIG`）：

| 欄位             | 預設值           | 備註                                              |
| ---------------- | ---------------- | ------------------------------------------------- |
| `cpuLimit`       | 100（= 0.1 CPU） | 傳遞給 `--cpus` 前先除以 1000                     |
| `memoryLimit`    | 256 MB           | 硬性限制                                          |
| `timeout`        | 30000 ms         | 透過 `SIGTERM` + `docker kill` 進行軟終止         |
| `networkEnabled` | `false`          | 會轉換為 `--network none`                         |
| `readOnly`       | `true`           | 根檔案系統為唯讀；`/tmp` 和 `/workspace` 為 tmpfs |

`SandboxRunner.kill(id)` 和 `killAll()` 會公開供關閉時使用；執行中的容器會追蹤於 `runningContainers: Map<string, ChildProcess>` 中。

### 沙箱環境變數

透過 `src/lib/skills/builtins.ts` 中的 `process.env` 設定：

| 環境變數                          | 預設值            | 用途                                                            |
| --------------------------------- | ----------------- | --------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576`（1 MB） | `file_read` 和 `file_write` 的大小上限                          |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`          | `http_request` 回應本文的大小上限                               |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`          | 傳回給呼叫端的 stdout/stderr 字元數上限                         |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`           | 沙箱命令的預設逾時時間；上限為 60 s                             |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`           | 對外連線的總開關。設為 `1` 或 `true` 可允許每次呼叫個別選擇啟用 |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | （見下文）        | 以逗號分隔的 Docker 映像檔允許清單                              |

預設允許的映像檔：`alpine:3.20`、`node:22-alpine`、`python:3.12-alpine`。透過 `SKILLS_ALLOWED_SANDBOX_IMAGES` 新增的任何項目都會與預設值合併；`normalizeImage()` 會拒絕未知的映像檔。

> 注意：沒有獨立的 `SKILLS_EXECUTION_TIMEOUT_MS` 環境變數。非沙箱處理常式的逾時時間在 `SkillExecutor`（`executor.ts:13`）中硬編碼為 30 s，但可在執行階段透過 `skillExecutor.setTimeout(ms)` 覆寫。

### 工作區隔離

`file_read` 和 `file_write` 會將每個路徑解析為相對於各 API 金鑰專屬工作區的路徑：`<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`。在進行任何磁碟 I/O 前，會拒絕路徑穿越（`..`）及禁止的區段（`.env`、`.git`、`.ssh`、`.omniroute`、`.codex`、`secrets`）。

### HTTP 強化

`http_request`（`builtins.ts:257`）：

- 方法允許清單：`GET, HEAD, POST, PUT, PATCH, DELETE`
- 封鎖的對外標頭：`host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- 停用重新導向（`allowRedirect: false`）
- 經由採用 `guard: "public-only"` 的 `safeOutboundFetch` 路由（封鎖私有／回送位址範圍）
- 回應會在 `SKILLS_MAX_HTTP_RESPONSE_BYTES` 處截斷；用戶端會看到 `truncated: true`

---

## 混合執行器（預覽版）

`src/lib/skills/hybrid.ts` 定義了一個 `HybridExecutor`，它會針對每次呼叫決定採用 `direct`（程序內）或 `sandbox` 執行，並在逾時／記憶體錯誤時透過 `autoUpgrade` 路徑重試。已接入的 `directExecutor` / `sandboxRunner` 實作目前是存根（`executeDirect`、`executeInSandbox` 會傳回預留位置物件）——請將此模組視為仍在建構中的契約。實際執行仍透過 `skillExecutor` + `SandboxRunner` 進行。

---

## 儲存空間

結構描述位於兩個遷移檔案中：

- `src/lib/db/migrations/016_create_skills.sql` — 基礎 `skills` 與 `skill_executions` 資料表，並為 `(api_key_id, name)` 和 `(skill_id, status, created_at)` 建立索引。
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — 將 `mode`、`source_provider`、`tags`（JSON）、`install_count` 新增至 `skills`。

`skill_executions.status` 在資料庫層級受到約束：`CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`。

---

## REST API

所有端點皆位於 `src/app/api/skills/` 下。管理端點（`/api/skills`、`/api/skills/[id]`、`/api/skills/install`）需要透過 `requireManagementAuth()` 進行**管理驗證**。市集／安裝流程使用較輕量的 `isAuthenticated()`（工作階段或 API 金鑰）。

| 端點 | 方法 | 用途 |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | 列出已註冊的技能。支援 `?q=`、`?mode=on                                 | off | auto`、`?source=skillsmp | skillssh | local`、分頁 |
| `/api/skills/[id]` | PUT | 更新 `enabled` 或 `mode` |
| `/api/skills/[id]` | DELETE | 依 id 取消註冊 |
| `/api/skills/install` | POST | 安裝自訂技能（處理常式程式碼 + 結構描述） |
| `/api/skills/marketplace` | GET | 搜尋 SkillsMP 目錄（當 `q` 為空時傳回熱門預設項目） |
| `/api/skills/marketplace/install` | POST | 安裝 SkillsMP 技能（需要使用中的提供者 = `skillsmp`） |
| `/api/skills/skillssh` | GET | 搜尋 skills.sh 目錄（`?q=&limit=`，上限為 100） |
| `/api/skills/skillssh/install` | POST | 安裝 skills.sh 技能（需要使用中的提供者 = `skillssh`） |
| `/api/skills/executions` | GET | 分頁顯示執行歷程（`?apiKeyId=`） |
| `/api/skills/executions` | POST | 臨時執行已註冊的技能 |

當 `settings.skillsEnabled === false` 時，`POST /api/skills/executions` 端點會傳回 HTTP `503`，內容為 `{ error: "Skills execution is disabled..." }`（`executor.ts:42-45`）。操作人員可從**設定 → AI** 切換總開關。

### 範例：安裝自訂技能

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

`handlerCode` 字串是**處理常式名稱查詢值**，而不是可執行程式碼。執行器會透過 `skillExecutor.registerHandler(name, fn)` 對其進行映射（`executor.ts:25`）。市集安裝會將 SKILL.md 文字儲存在此欄位中作為文件，並透過模型產生的工具呼叫來路由執行。系統不會對使用者任意提供的原始碼執行 eval。

---

## MCP 工具

四個 MCP 工具封裝了技能介面 (`open-sse/mcp-server/tools/skillTools.ts`)。它們會在 MCP 伺服器啟動時自動註冊。

| 工具                          | 說明                                                  |
| ----------------------------- | ----------------------------------------------------- |
| `omniroute_skills_list`       | 列出技能，可選篩選條件：`apiKeyId`、`name`、`enabled` |
| `omniroute_skills_enable`     | 依 `skillId` 啟用／停用技能                           |
| `omniroute_skills_execute`    | 使用輸入承載資料執行技能                              |
| `omniroute_skills_executions` | 最近的執行歷史記錄（預設 50，最多 100）               |

傳輸設定與範圍指派請參閱 [MCP-SERVER.md](./MCP-SERVER.md)。

---

## A2A 整合

`src/lib/skills/a2a.ts` 會匯出 `memory_aware_routing` A2A 技能描述元及 `registerA2ASkill(registry)` 輔助函式。自訂 A2A 技能位於 `src/lib/a2a/skills/`，並透過 `A2A_SKILL_HANDLERS` (`src/lib/a2a/taskExecution.ts`) 分派。完整的任務生命週期請參閱 [A2A-SERVER.md](./A2A-SERVER.md)。

---

## 新增內建技能

1. **定義處理常式**於 `src/lib/skills/builtins.ts`（或 `src/lib/skills/builtin/` 下的同層檔案）。簽章：`(input, { apiKeyId, sessionId }) => Promise<output>`。
2. **需要使用沙箱程式碼路徑？** 呼叫 `sandboxRunner.run(image, command, env, sandboxConfig({...}))`。使用 `normalizeImage()` 對照允許清單。
3. **需要使用檔案系統路徑？** 存取磁碟前，一律先將其傳入 `resolveWorkspacePath(input, context)`。
4. **需要呼叫網路？** 使用 `safeOutboundFetch` 並設定 `guard: "public-only"`；透過 `sanitizeHeaders()` 清理標頭。
5. **註冊**時，將項目新增至 `builtinSkills`（或在啟動時呼叫 `registerBrowserSkill(executor)` 類型的函式）。
6. **連接內建工具別名**（選用）：若上游模型產生不同名稱，請在 `BUILTIN_TOOL_ALIASES` (`interception.ts:23`) 中設定。
7. **測試**位於 `src/lib/skills/__tests__/`（Vitest）。

---

## 新增自訂（非內建）技能

1. 在處理程序啟動時註冊處理常式：
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. 透過 `POST /api/skills/install` 新增技能（`handlerCode` 欄位必須符合已註冊的處理常式名稱）。
3. 透過 `PUT /api/skills/[id]` 將 `mode` 切換為 `on` 或 `auto`。

---

## 操作提示

- **總開關：** `settings.skillsEnabled = false` 會封鎖所有執行，並使 `/api/skills/executions` 傳回 HTTP `503`。登錄檔仍會繼續載入。
- **鎖定對外連線：** 若要讓沙箱完全與網路隔離，請勿設定 `SKILLS_SANDBOX_NETWORK_ENABLED`（預設）。每次呼叫所設定的 `networkEnabled: true` 仍需通過總閘門。
- **允許特定映像檔：** 設定 `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"` 以擴充允許清單。
- **稽核執行記錄：** `/dashboard/skills/executions` 與 `omniroute_skills_executions` 都會查詢 `skill_executions`。成功的執行包含 `durationMs`；失敗則包含 `errorMessage`。
- **快取失效：** 手動編輯資料庫後，呼叫 `skillRegistry.invalidateCache()`；否則請等待 60 秒。
- **匿名工作區：** 當 `apiKeyId` 為空時，所有呼叫都會雜湊至相同的 `"anonymous"` 工作區——需要考量共享情境的程式碼應一律傳入真實金鑰。

---

## 執行生命週期 (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`) 是一個管理每次技能呼叫的**單例**。瞭解其生命週期對於偵錯逾時、重試及執行狀態至關重要。

### 五階段生命週期

```
   呼叫 execute()
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← 已排入佇列，尚未開始（已建立資料庫資料列）
  └──────┬──────┘
         │ 啟動處理常式
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← 以逾時限制呼叫處理常式
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   （沒有其他路徑 — 由父程序終止）
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   使用狀態、輸出及 durationMs 更新資料庫資料列
```

### 預設設定

| 設定         | 預設值        | 設定方式                             |
| ------------ | ------------- | ------------------------------------ |
| `timeout`    | `30000` (30s) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`           | `skillExecutor.setMaxRetries(count)` |

> **重要**：執行器是單例 — 呼叫 `setTimeout()` 會全域影響之後的所有呼叫。目前不支援個別技能的逾時設定；如果需要為不同技能設定不同的逾時時間，請提交個別程序或建立執行器的分支版本。

### 狀態值

來自 `src/lib/skills/types.ts`：

```ts
enum SkillStatus {
  PENDING = "pending", // 已排入佇列，尚未開始
  RUNNING = "running", // 已呼叫處理常式
  SUCCESS = "success", // 處理常式傳回有效輸出
  ERROR = "error", // 處理常式擲回例外
  TIMEOUT = "timeout", // 超過執行器的逾時時間
}
```

> **注意**：`TIMEOUT` 狀態雖已在列舉中定義，但目前的執行器實作**實際上不會將其寫入資料庫** — 逾時會呈現為 `ERROR`，並帶有訊息 `"Skill execution timed out"`。此狀態列舉值保留供未來使用。

### 檢查執行記錄

```ts
import { skillExecutor } from "omniroute/skills/executor";

// 依 ID 取得特定執行記錄
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// 列出某個 API 金鑰最近的執行記錄
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// 計算執行總數
const total = skillExecutor.countExecutions("api-key-id");
```

### 重試行為

`maxRetries` 設定會被儲存，但執行器的 `execute()` 方法**目前並未使用**它 — 該方法只會嘗試執行一次。`maxRetries` 值已公開，以供未來實作及需要讀取它的掛鉤使用。

目前，重試必須在技能處理常式本身內實作。內建技能會註冊至執行器（例如 `src/lib/skills/builtin/` 中的 `registerBuiltinSkills(executor)` / `registerBrowserSkill(executor)`）；無論註冊哪個處理常式，都可以包裝自己的重試迴圈：

```ts
// 位於技能處理常式內
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode 詳解

`SkillMode` 列舉（`src/lib/skills/types.ts`）控制技能在**何時以及如何**被叫用：

```ts
enum SkillMode {
  AUTO = "auto", // 由 LLM 決定何時叫用技能
  MANUAL = "manual", // 僅能透過使用者明確要求叫用
  HYBRID = "hybrid", // AUTO 評分 + 手動覆寫
}
```

> **注意**：程式碼庫定義了 `SkillMode`（AUTO/MANUAL/HYBRID），而 `Skill.mode` 欄位使用不同的型態（`"on" | "off" | "auto"`）。兩者彼此相關，但並不相同——`SkillMode` 用於執行器策略，`Skill.mode` 則用於控制各技能是否啟用。

### 各模式的使用時機

| 模式     | LLM 行為                                                     | 使用情境                        |
| -------- | ------------------------------------------------------------ | ------------------------------- |
| `AUTO`   | LLM 可在認為有需要時叫用技能                                 | 通用技能（讀取檔案、HTTP 請求） |
| `MANUAL` | LLM 無法叫用技能；僅明確的 `executeSkill` API 呼叫可觸發技能 | 敏感操作（資料庫寫入、付款）    |
| `HYBRID` | LLM 可建議使用技能；使用者必須確認                           | 具有副作用但並不危險的技能      |

### AUTO 評分

當 `AUTO` 模式啟用時，`src/lib/skills/injection.ts` 中的 `scoreAutoSkill()` 會根據請求
情境為每個候選技能評分——這是一套加總式整數計分系統（技能名稱相符、名稱／標籤／描述的權杖重疊、
背景原因提示、提供者提示加分／扣分）。評分最高且
`score >= AUTO_MIN_SCORE = 3` 的 `AUTO_MAX_SKILLS = 5` 個技能會被注入為
可叫用的工具；若分數相同，則依 `installCount`，再依名稱決定順序。完整計分表請參閱本文件前面的
[**工具結構描述產生 → AUTO 評分**](#auto-scoring)；此處沒有浮點數 `0.6` 類型的門檻，也沒有在 `registry.ts` 中進行評分。

---

## 內建技能目錄

OmniRoute 在 `src/lib/skills/builtin/` 中隨附了一組精心挑選的內建技能。最常見的包括：

### 瀏覽器自動化技能

瀏覽器技能（`src/lib/skills/builtin/browser.ts`）透過 Playwright/Puppeteer 提供無頭瀏覽器自動化功能。**此功能已實作，但不包含在預設技能目錄中**——若要使用，請另外安裝瀏覽器擴充套件外掛程式。

```ts
// 在設定中啟用
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // 一律要求明確叫用
  allowedSkills: ["browser"],
  timeout: 60000, // 頁面載入逾時為 60 秒
  maxRetries: 1,
};
```

### 其他內建類別

| 類別       | 技能                                    | 模式   |
| ---------- | --------------------------------------- | ------ |
| 檔案 I/O   | `file_read`, `file_write`               | AUTO   |
| HTTP       | `http_request`                          | AUTO   |
| 搜尋       | `web_search`                            | AUTO   |
| 程式碼執行 | `eval_code`（沙箱化 JavaScript/Python） | HYBRID |
| 系統       | `execute_command`（沙箱化 CLI 執行）    | MANUAL |

### 新增自訂技能

如需瞭解如何透過外掛程式系統新增自訂技能，請參閱[外掛程式 SDK 與技能整合](./PLUGIN_SDK.md)。

---

## 另請參閱

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP 工具註冊與傳輸方式
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A 任務生命週期與技能分派
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — 面向使用者的簡介
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — 請求處理管線與元件圖
- 原始碼：`src/lib/skills/`、`src/app/api/skills/`、`open-sse/mcp-server/tools/skillTools.ts`
- 測試：`src/lib/skills/__tests__/integration.test.ts`
