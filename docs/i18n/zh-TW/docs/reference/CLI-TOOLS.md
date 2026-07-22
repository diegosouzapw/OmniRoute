---
title: "CLI 工具 — OmniRoute"
version: 3.8.40
lastUpdated: 2026-06-28
---

# CLI 工具 — OmniRoute

最後更新：2026-06-28

OmniRoute 整合了三類 CLI 工具，分別對應三個專屬儀表板頁面：

| 頁面             | 路由                       | 概念                                                         | 數量             |
| ---------------- | -------------------------- | ------------------------------------------------------------ | ---------------- |
| **CLI 程式碼工具** | `/dashboard/cli-code`      | 指向 OmniRoute 的程式碼工具（客戶端 → CLI → OmniRoute → 提供商） | 21               |
| **CLI 代理工具**   | `/dashboard/cli-agents`    | 指向 OmniRoute 的自動代理工具（相同流程，範圍更廣）            | 6                |
| **ACP 代理**       | `/dashboard/acp-agents`    | OmniRoute 透過 stdio/ACP 以反向流程衍生的 CLI                | 參見註冊表       |

舊版路由透過 308 重新導向：`/dashboard/cli-tools` → `/dashboard/cli-code`，`/dashboard/agents` → `/dashboard/acp-agents`。

---

## 運作方式

```
CLI 程式碼工具 / CLI 代理工具（消費流程）：
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  （全部指向 OmniRoute）
    http://YOUR_SERVER:20128/v1
           │
           ▼  （OmniRoute 路由至對應提供商）
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP 代理（反向衍生流程）：
    客戶端請求 → OmniRoute → 透過 stdio/ACP 衍生 CLI → 回應
```

**優勢：**

- 只需一個 API 金鑰管理所有工具
- 在儀表板中追蹤所有 CLI 的費用
- 切換模型無需重新設定每個工具
- 可在本機及遠端伺服器上運作（VPS、Docker、Akamai、Cloudflare Tunnel）

---

## 使用 `setup-*` 自動設定

您無需手動編寫每個工具的設定檔。OmniRoute 為每個受支援的 CLI 提供了 `setup-*` 指令，可讀取執行中 OmniRoute（本機或遠端）的**即時**模型目錄，並在您的機器上寫入該工具的設定檔：

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

每個指令都接受 `--remote <url> --api-key <key>`（針對遠端 OmniRoute 設定本機工具）、`--dry-run`（預覽不寫入）和 `--port`。不支援模型自動探索的工具（Cline、Kilo、Roo、Goose、Aider、Gemini）需要 `--model <id>`（以及用於非互動執行的 `--yes`）。啟動器 `omniroute launch`（Claude Code）和 `omniroute launch-codex`（Codex）會以正確的環境變數注入來衍生 CLI，完全不寫入設定檔。

> **完整參考：** 主要表格 — 每個指令寫入的內容、所有旗標、本機 vs 遠端，以及哪些工具需要加上 `/v1` 字尾 — 請參閱 **[CLI 整合指南](../guides/CLI-INTEGRATIONS.md)**。

---

## 資料來源

統一目錄位於 `src/shared/constants/cliTools.ts`，型別為 `CLI_TOOLS: Record<string, CliCatalogEntry>`。

每個條目包含以下欄位（定義於 `src/shared/schemas/cliCatalog.ts`）：

| 欄位                                             | 型別                                                         | 說明                                      |
| ------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------------- |
| `category`                                       | `"code" \| "agent"`                                           | 工具顯示在哪個頁面                        |
| `vendor`                                         | `string`                                                     | 工具來源（"Anthropic"、"OSS (P. Gauthier)"） |
| `acpSpawnable`                                   | `boolean`                                                    | 也可用作 ACP 代理（顯示徽章）             |
| `baseUrlSupport`                                 | `"full" \| "partial" \| "none"`                               | 自訂端點支援程度。`"none"` = MITM 待辦事項 |
| `configType`                                     | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | 設定機制                                   |
| `id`、`name`、`color`、`description`、`docsUrl` | 標準                                                         | 核心顯示欄位                               |

`baseUrlSupport: "none"` 的條目**不會**顯示在儀表板頁面上 — 它們會註冊在 MITM 待辦事項中，屬於 plan 11 的範疇（參見 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`）。

---

## 1. CLI 程式碼工具目錄（25 個工具）

所有出現在 `/dashboard/cli-code` 的工具。`baseUrlSupport: none` 的工具會透過 MITM 或手動指南而非自訂基礎 URL 來連接：

| id             | 名稱                | 供應商                   | baseUrlSupport | configType      | acpSpawnable |
| -------------- | ------------------- | ------------------------ | -------------- | --------------- | ------------ |
| claude         | Claude Code         | Anthropic                | full           | env             | true         |
| codex          | OpenAI Codex CLI    | OpenAI                   | full           | custom          | true         |
| cline          | Cline               | OSS（前 Claude Dev）     | full           | custom          | true         |
| kilo           | Kilo Code           | Kilo-Org                 | full           | custom          | false        |
| roo            | Roo Code            | Roo（OSS）               | full           | guide           | false        |
| continue       | Continue            | continue.dev             | full           | guide           | false        |
| aider          | Aider               | OSS（P. Gauthier）       | full           | guide           | true         |
| forge          | ForgeCode           | Antinomy HQ              | full           | custom          | true         |
| jcode          | jcode               | 1jehuang（OSS）          | full           | custom          | false        |
| deepseek-tui   | DeepSeek TUI        | Hunter Bown（OSS）       | full           | custom          | false        |
| codewhale      | CodeWhale           | Hmbown（OSS）            | full           | custom          | false        |
| opencode       | OpenCode            | Anomaly（前 SST）        | full           | guide           | true         |
| droid          | Factory Droid       | Factory AI               | partial        | guide           | false        |
| copilot        | GitHub Copilot CLI  | GitHub/MS                | full           | custom          | false        |
| cursor-cli     | Cursor CLI          | Anysphere                | partial        | guide           | true         |
| smelt          | Smelt               | leonardcser（OSS）       | full           | custom          | false        |
| pi             | Pi（pi-coding-agent） | M. Zechner（OSS）        | full           | custom          | false        |
| grok-build     | Grok Build          | xAI                      | full           | custom          | false        |
| crush          | Crush               | OSS（Charm）             | full           | custom          | false        |
| qwen           | Qwen Code           | Alibaba                  | full           | guide           | true         |
| cursor         | Cursor              | Anysphere                | none           | guide           | false        |
| antigravity    | Antigravity         | Google                   | none           | mitm            | false        |
| hermes         | Hermes              | Nous Research            | none           | guide           | false        |
| kiro           | Kiro AI             | Amazon                   | none           | mitm            | false        |
| custom         | 自訂 CLI            | —                        | full           | custom-builder  | false        |

`baseUrlSupport: "partial"` 的工具會在儀表板卡片上顯示「⚠ 基礎 URL 部分支援」徽章。

---

## 2. CLI 代理工具目錄（8 個工具）

出現在 `/dashboard/cli-agents` 的自動代理工具：

| id           | 名稱                | 供應商                    | baseUrlSupport | acpSpawnable |
| ------------ | ------------------- | ------------------------- | -------------- | ------------ |
| hermes-agent | Hermes Agent        | Nous Research             | full           | false        |
| openclaw     | OpenClaw            | OSS（P. Steinberger）     | full           | true         |
| goose        | Goose               | Block / Linux Foundation  | full           | true         |
| interpreter  | Open Interpreter    | OSS                       | full           | true         |
| warp         | Warp AI             | Warp Inc.                 | partial        | true         |
| agent-deck   | Agent Deck          | asheshgoplani（OSS）      | full           | false        |
| omp          | Oh My Pi            | OSS                       | full           | true         |
| letta        | Letta CLI           | Letta                     | full           | false        |

---

## 3. ACP 代理（/dashboard/acp-agents）

此頁面（從 `/dashboard/agents` 重新命名而來）顯示 OmniRoute 可以**衍生**為後端執行引擎（透過 stdio/ACP 協定）的 CLI。目錄獨立維護於 `src/lib/acp/registry.ts`，**不同於** `CLI_TOOLS`。

---

## 4. MITM 待辦事項（不在儀表板中顯示）

以下 CLI 原生不支援自訂基礎 URL，**不會列出**在 CLI 程式碼工具或 CLI 代理工具頁面中。它們是 plan 11 中 MITM 攔截的候選對象：

| CLI                   | 原因                                              |
| --------------------- | ------------------------------------------------- |
| windsurf              | BYOK 僅限特定 Claude 模型 + 企業 URL/Token        |
| amp                   | 封閉生態系統（Sourcegraph）                        |
| amazon-q / kiro-cli   | AWS SSO 認證，無自訂 URL                          |
| cowork                | Anthropic Desktop，無可設定的端點                  |

完整交叉參考請參閱 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`。

---

## 5. 批次偵測 API

所有工具偵測透過單一端點匯總：

**`GET /api/cli-tools/all-statuses`**

- 身份驗證：`requireCliToolsAuth(request)`（與其他 `/api/cli-tools/` 路由相同）
- 回傳：`Record<toolId, ToolBatchStatus>`（型別：`src/shared/types/cliBatchStatus.ts`）
- 策略：對所有工具執行 `Promise.all`，每個工具 5 秒逾時
- 快取：記憶體中 LRU，以設定檔 `mtime` 作為索引。當 `mtime` 變更時失效。伺服器重新啟動時重設。

每個工具的回應結構：

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // 已清理，無堆疊追蹤
}
```

---

## 6. 新工具的設定處理器

`configType: "custom"` 的新工具擁有專屬的設定 API 路由：

| 路由                                              | 工具                                |
| ------------------------------------------------- | ----------------------------------- |
| `POST /api/cli-tools/forge-settings`              | ForgeCode（.forge.toml）            |
| `POST /api/cli-tools/jcode-settings`              | jcode（--base-url 旗標）            |
| `POST /api/cli-tools/deepseek-tui-settings`       | DeepSeek TUI（OPENAI_BASE_URL，舊版） |
| `POST /api/cli-tools/codewhale-settings`          | CodeWhale（OPENAI_BASE_URL，主要 + 舊版 `~/.deepseek` 同步） |
| `POST /api/cli-tools/smelt-settings`              | Smelt                               |
| `POST /api/cli-tools/pi-settings`                 | Pi 程式碼代理                        |
| `POST /api/cli-tools/grok-build-settings`         | Grok Build（~/.grok/config.toml，`[model.omniroute]`） |
| `POST /api/cli-tools/qwen-settings`               | Qwen Code（`~/.qwen/settings.json` + 專用 `.env` 金鑰） |

所有路由都使用 `sanitizeErrorMessage()` 處理錯誤回應（硬性規則 #12）。

---

## 7. 儀表板頁面架構

### CLI 程式碼工具（`/dashboard/cli-code`）

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — 伺服器元件
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — 客戶端網格
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — 工具詳細頁面
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 個專用工具卡片 + `ToolDetailClient.tsx`

### CLI 代理工具（`/dashboard/cli-agents`）

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — 伺服器元件
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — 客戶端網格
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — 重複使用 `ToolDetailClient`

### ACP 代理（`/dashboard/acp-agents`）

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — 伺服器元件（從 `agents/` 遷移）

### 共用 UI 元件（`src/shared/components/cli/`）

| 檔案                     | 用途                                           |
| ------------------------ | ---------------------------------------------- |
| `CliToolCard.tsx`        | 智慧型狀態卡片（偵測 + 設定 + 端點）           |
| `CliConceptCard.tsx`     | 各頁面概念說明卡片                             |
| `CliComparisonCard.tsx`  | 三欄 CLI 類型比較卡片                          |
| `BaseUrlSelect.tsx`      | 端點下拉選單（本機/雲端/自訂）                 |
| `ApiKeySelect.tsx`       | API 金鑰選擇器                                 |
| `ManualConfigModal.tsx`  | 可複製的設定片段模態框                         |

### 共用 Hook（`src/shared/hooks/cli/`）

| 檔案                         | 用途                                        |
| ---------------------------- | ------------------------------------------- |
| `useToolBatchStatuses.ts`    | 擷取 `/api/cli-tools/all-statuses`，管理載入/重新整理狀態 |

---

## 8. 國際化（i18n）

plan 14 F9 中新增的命名空間：

| 命名空間      | 用途                                        |
| ------------- | ------------------------------------------- |
| `cliCommon`   | 共用字串（卡片標籤、概念/比較文字、詳細頁面標籤） |
| `cliCode`     | CLI 程式碼工具頁面字串                      |
| `cliAgents`   | CLI 代理工具頁面字串                        |
| `acpAgents`   | ACP 代理頁面字串                            |

已提供完整的巴西葡萄牙文（PT-BR）和英文（EN）翻譯。其他 39 種語言會透過 `src/i18n/request.ts` 中的命名空間層級合併自動回退為英文。

---

## 9. 快速入門

### 步驟 1 — 取得 OmniRoute API 金鑰

1. 開啟 `/dashboard/api-manager` → **建立 API 金鑰**
2. 為金鑰命名（例如 `cli-tools`）並選取所有權限
3. 複製金鑰 — 下方每個 CLI 都會用到

> 您的金鑰格式如：`«redacted:sk-…»`

---

### 步驟 2 — 安裝 CLI 工具

所有基於 npm 的工具都需要 Node.js 22.22.2+ 或 24.x：

```bash
# Claude Code（Anthropic）
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # 基於 Rust

# Pi 程式碼代理
# 請參閱 https://github.com/zechnerj/pi-coding-agent 了解安裝方式

# jcode
# 請參閱 https://github.com/1jehuang/jcode 了解安裝方式
```

---

### 步驟 3 — 透過儀表板設定

1. 前往 `http://localhost:20128/dashboard/cli-code`
2. 在網格中尋找您的工具
3. 點選卡片開啟工具詳細頁面
4. 選取您的 API 金鑰和基礎 URL
5. 點選**套用設定**或複製手動設定片段

---

### 步驟 4 — 設定全域環境變數

```bash
# OmniRoute 通用端點
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="«redacted:sk-…»"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="«redacted:sk-…»"
export GEMINI_BASE_URL="http://localhost:20128/v1"
export GEMINI_API_KEY="«redacted:sk-…»"
```

> 若使用**遠端伺服器**，請將 `localhost:20128` 替換為伺服器 IP 或網域名稱，
> 例如 `http://<your-server-ip>:20128`。

---

### 步驟 4 — 設定各個工具

#### Claude Code

```bash
# 建立 ~/.claude/settings.json：
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "«redacted:sk-…»"
  }
}
EOF
```

請使用統一的 Anthropic 閘道根路徑來設定 Claude Code。此處不要加上 `/v1`。

**測試：** `claude "say hello"`

---

#### OpenAI Codex

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.yaml << EOF
model: auto
apiKey: ***
apiBaseUrl: http://localhost:20128/v1
EOF
```

**測試：** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "«redacted:sk-…»"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**測試：** `opencode`

> 使用 `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`
> 來發送思考變體。

---

#### Cline（CLI 或 VS Code）

**CLI 模式：**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "«redacted:sk-…»"
}
EOF
```

**VS Code 模式：**
Cline 擴充功能設定 → API Provider：`OpenAI Compatible` → Base URL：`http://localhost:20128/v1`

或使用 OmniRoute 儀表板 → **CLI 工具 → Cline → 套用設定**。

---

#### KiloCode（CLI 或 VS Code）

**CLI 模式：**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key «redacted:sk-…»
```

**VS Code 設定：**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "«redacted:sk-…»"
}
```

或使用 OmniRoute 儀表板 → **CLI 工具 → KiloCode → 套用設定**。

---

#### Continue（VS Code 擴充功能）

編輯 `~/.continue/config.yaml`：

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: ***
    default: true
```

編輯後重新啟動 VS Code。

---

#### VS Code Insiders（`chatLanguageModels.json`）

當 VS Code Insiders 設定為使用自訂端點模型，且您希望 OmniRoute 在無需自訂標頭欄位的情況下運作時使用。

**建議位置：**

- Linux：`~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows：`%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**使用 Token 化 OmniRoute 別名的範例：**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/«redacted:sk-…»/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/«redacted:sk-…»/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**注意事項：**

- 將 `«redacted:sk-…»` 替換為在 OmniRoute 中建立的 API 金鑰。
- `url` 欄位應指向 `/api/v1/vscode/{token}/chat/completions`。
- `modelsUrl` 欄位應指向 `/api/v1/vscode/{token}/models`。
- 如果客戶端支援自訂標頭，建議使用標準的 `/v1` + Bearer 標頭流程。
- 內嵌 URL 的 Token 是相容性備援方案，可能會出現在編輯器日誌或代理歷史記錄中。

---

#### Kiro CLI（Amazon）

```bash
# 登入您的 AWS/Kiro 帳戶：
kiro-cli login

# CLI 使用自己的認證機制 — Kiro CLI 本身不需要 OmniRoute 作為後端。
# 請將 kiro-cli 與 OmniRoute 搭配使用於其他工具。
kiro-cli status
```

至於 **Kiro IDE** 桌面應用程式，請使用 OmniRoute 在 `/dashboard/cli-tools → Kiro` 提供的 MITM 端點。

---

## 10. 內部 OmniRoute CLI

`omniroute` 二進位檔提供用於伺服器生命週期管理、設定、診斷和提供商管理的指令。進入點：`bin/omniroute.mjs`。

```bash
omniroute                              # 啟動伺服器（預設通訊埠 20128）
omniroute setup                        # 互動式設定精靈
omniroute doctor                       # 檢查設定、資料庫、通訊埠、執行環境
omniroute providers list               # 已設定的提供商連線
omniroute providers test-all           # 測試每個作用中連線
omniroute reset-password               # 重設管理員密碼
omniroute logs                         # 串流要求日誌
omniroute health                       # 詳細健康狀態（斷路器、快取、記憶體）
omniroute --version                    # 顯示版本
omniroute --help                       # 顯示所有指令
```

### 設定與初始化

```bash
omniroute setup                        # 互動式設定精靈
omniroute setup --non-interactive      # CI/自動化模式（讀取環境變數 + 旗標）
omniroute setup --password '<value>'   # 直接設定管理員密碼
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # 一氣呵成新增並測試提供商
```

非互動式設定可識別的環境變數：

| 變數                 | 用途                                      |
| -------------------- | ----------------------------------------- |
| `OMNIROUTE_API_KEY`  | 提供商 API 金鑰（透過 Commander `.env()` 繫結至 `--api-key`） |
| `DATA_DIR`           | 覆寫 OmniRoute 資料目錄                   |

所有其他非互動式輸入皆以旗標傳遞（非環境變數）：
`--password`、`--provider`、`--provider-name`、`--provider-base-url`、`--default-model`
（請參閱上方 `omniroute setup` 選項）。

### 診斷

```bash
omniroute doctor                       # 檢查設定、資料庫、通訊埠、執行環境、記憶體、運作狀態
omniroute doctor --json                # 機器可讀的 JSON
omniroute doctor --no-liveness         # 跳過 HTTP 健康狀態探測
omniroute doctor --host 0.0.0.0        # 覆寫運作狀態主機
omniroute doctor --liveness-url <url>  # 完整健康端點 URL 覆寫
```

doctor 會執行以下檢查：`Config`、`Database`、`Storage/encryption`、
`Port availability`、`Node runtime`、`Native binary`（better-sqlite3）、
`Memory` 和 `Server liveness`。若有任一檢查結果為 `fail`，則以非零退出碼結束。

### 提供商管理

```bash
omniroute providers available                       # OmniRoute 提供商目錄
omniroute providers available --search openai       # 依 ID/名稱/別名/類別過濾目錄
omniroute providers available --category api-key    # 依類別過濾（api-key、oauth、free 等）
omniroute providers available --json                # 機器可讀的 JSON

omniroute providers list                            # 已設定的提供商連線
omniroute providers list --json

omniroute providers test <id|name>                  # 測試一個已設定的連線
omniroute providers test-all                        # 測試每個作用中連線
omniroute providers validate                        # 僅限本機的結構驗證
```

> `providers available` 讀取 OmniRoute 目錄；`providers list/test/test-all/validate`
> 直接讀取本機 SQLite 資料庫，無需伺服器執行中。

### 復原與重設

```bash
omniroute reset-password                # 重設管理員密碼（亦可使用：omniroute-reset-password）
omniroute reset-encrypted-columns       # 顯示警告 + 加密憑證重設的試執行
omniroute reset-encrypted-columns --force  # 實際將 SQLite 中的加密憑證設為 null
```

### 憑證匯出（⚠ 請謹慎處理）

```bash
omniroute auth export                                 # 顯示警告 + 確認閘道 — 不會存取資料庫
omniroute auth export --force                          # 將所有連線的**解密後**憑證匯出至 stdout 為 JSON
omniroute auth export --force --id <id>                 # 僅匯出符合條件的連線
omniroute auth export --force --format env               # 輸出為 OMNIROUTE_<PROVIDER>_<FIELD>=<value> 格式
omniroute auth export --force --out creds.json           # 寫入檔案（以 0600 權限建立）
```

`auth export` 是**僅限本機**（直接讀取 SQLite，無 HTTP 路由），且故意將
**明文** `apiKey`/`accessToken`/`refreshToken`/`idToken` 值寫入/輸出 — 這是功能，不是錯誤。
若未使用 `--force`，則不會從資料庫讀取任何內容，也不會解密任何內容。在輸出任何明文之前，
stderr 上一定會顯示警告橫幅。需要設定 `STORAGE_ENCRYPTION_KEY`。
如果某個欄位解密失敗（金鑰過期、密文損毀），會回報為
`<field>DecryptFailed: true`，而非中止整個匯出作業或洩漏底層錯誤。

### 其他子指令

以下指令假設 OmniRoute 伺服器正在執行中，除非另有說明：

```bash
omniroute status                       # 完整的執行時期狀態
omniroute logs                         # 串流要求日誌（--json、--search、--follow）
omniroute config show                  # 顯示目前設定

omniroute provider list                # 列出可用提供商（providers list 的別名）
omniroute provider add                 # 將 OmniRoute 註冊為工具上的提供商
omniroute keys add | list | remove     # 管理 API 金鑰
omniroute models [provider]            # 列出模型（--json、--search）
omniroute combo list | switch | create | delete

omniroute backup                       # 快照設定 + 資料庫
omniroute restore                      # 從先前的快照還原

omniroute health                       # 詳細健康狀態（斷路器、快取、記憶體）
omniroute quota                        # 提供商配額使用情況
omniroute cache                        # 快取狀態
omniroute cache clear                  # 清除語意 + 簽章快取

omniroute mcp status | restart         # MCP 伺服器狀態 / 重新啟動
omniroute a2a status | card            # A2A 伺服器狀態 / 代理卡片

omniroute tunnel list | create | stop  # 管理通道（cloudflare/tailscale/ngrok）
omniroute env show | get <k> | set <k> <v>  # 檢查 / 設定環境變數（暫時性）

omniroute test                         # 提供商連線冒煙測試
omniroute update                       # 檢查更新
omniroute completion                   # 產生 Shell 補全
```

### 常用旗標

| 旗標                | 說明                                      |
| ------------------- | ----------------------------------------- |
| `--no-open`         | 啟動時不自動開啟瀏覽器                    |
| `--port <n>`        | 覆寫 API 通訊埠（預設 20128）             |
| `--mcp`             | 以 MCP 伺服器模式透過 stdio 執行（用於 IDE）|
| `--non-interactive` | CI 模式（無提示；從環境變數/旗標讀取）    |
| `--json`            | 機器可讀的 JSON 輸出（doctor、providers 等）|
| `--help`、`-h`      | 顯示指令專屬說明                          |
| `--version`、`-v`   | 顯示已安裝版本                            |

---

## 可用 API 端點

| 端點                        | 說明              | 用途                    |
| --------------------------- | ----------------- | ----------------------- |
| `/v1/chat/completions`      | 標準聊天（所有提供商）| 所有現代工具            |
| `/v1/responses`             | Responses API（OpenAI 格式）| Codex、代理工作流程    |
| `/v1/completions`           | 舊版文字補全      | 使用 `prompt:` 的較舊工具 |
| `/v1/embeddings`            | 文字嵌入          | RAG、搜尋               |
| `/v1/images/generations`    | 圖片生成          | GPT-Image、Flux 等      |
| `/v1/audio/speech`          | 文字轉語音        | ElevenLabs、OpenAI TTS  |
| `/v1/audio/transcriptions`  | 語音轉文字        | Deepgram、AssemblyAI    |

可直接貼上的 Token 化 OmniRoute URL 範例：

```txt
Token 範例：«redacted:sk-…»

標準 OpenAI 基礎：http://localhost:20128/v1
VS Code 模型：http://localhost:20128/api/v1/vscode/«redacted:sk-…»/models
VS Code 聊天：http://localhost:20128/api/v1/vscode/«redacted:sk-…»/chat/completions
VS Code responses：http://localhost:20128/api/v1/vscode/«redacted:sk-…»/responses
Ollama tags：http://localhost:20128/api/v1/vscode/«redacted:sk-…»/api/tags
Ollama 聊天：http://localhost:20128/api/v1/vscode/«redacted:sk-…»/api/chat
```

---

## 故障排除

| 錯誤                                           | 原因                      | 解決方式                                        |
| ---------------------------------------------- | ------------------------- | ----------------------------------------------- |
| `Connection refused`                           | OmniRoute 未執行          | `omniroute serve`                               |
| `401 Unauthorized`                             | API 金鑰錯誤              | 在 `/dashboard/api-manager` 中檢查              |
| `No combo configured`                          | 無作用中路由組合          | 在 `/dashboard/combos` 中設定                   |
| CLI 顯示「not installed」                        | 二進位檔不在 PATH 中      | 檢查 `which <command>`                          |
| 儀表板在安裝後顯示「not detected」               | 快取過期                  | 點選儀表板中的「⟳ 重新整理偵測」                 |
| 舊連結 `/dashboard/cli-tools`                   | v3.8.6 之前的書籤         | 自動重新導向至 `/dashboard/cli-code`（308）     |
| 舊連結 `/dashboard/agents`                      | v3.8.6 之前的書籤         | 自動重新導向至 `/dashboard/acp-agents`（308）   |
