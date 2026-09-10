# CLI-TOOLS (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇰🇷 [ko](../../../ko/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI 工具 — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI 工具 — OmniRoute

最後更新：2026-08-18

OmniRoute 整合了三類 CLI 工具，分佈在三個專用的儀表板頁面上：

| 頁面         | 路徑                    | 概念                                                          | 數量       |
| ------------ | ----------------------- | ------------------------------------------------------------- | ---------- |
| **CLI 代碼** | `/dashboard/cli-code`   | 指向 OmniRoute 的編碼工具 (客戶端 → CLI → OmniRoute → 提供者) | 26         |
| **CLI 代理** | `/dashboard/cli-agents` | 指向 OmniRoute 的自主代理 (相同流程，更廣泛的範圍)            | 8          |
| **ACP 代理** | `/dashboard/acp-agents` | OmniRoute 通過 stdio/ACP 反向生成的 CLI (反向流程)            | 參見註冊表 |

舊路徑通過 308 重定向：`/dashboard/cli-tools` → `/dashboard/cli-code`，`/dashboard/agents` → `/dashboard/acp-agents`。

---

## 工作原理

```
CLI 代碼 / CLI 代理 (消費流程):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (全部指向 OmniRoute)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute 將請求路由到正確的提供者)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP 代理 (反向生成流程):
    客戶端請求 → OmniRoute → 通過 stdio/ACP 生成 CLI → 回應
```

**好處：**

- 一個 API 金鑰管理所有工具
- 儀表板中所有 CLI 的成本追蹤
- 模型切換無需重新配置每個工具
- 在本地和遠程伺服器上運行 (VPS、Docker、Akamai、Cloudflare Tunnel)

---

## 使用 `setup-*` 自動配置

您不必手動編寫每個工具的配置。OmniRoute 為每個支持的 CLI 提供一個 `setup-*`
命令，該命令從運行中的 OmniRoute (本地或遠程) 讀取 **實時** 模型目錄，並在您的機器上寫入工具的配置：

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

每個命令接受 `--remote <url> --api-key <key>` (將本地工具配置為遠程 OmniRoute)，`--dry-run` (預覽而不寫入)，以及 `--port`。沒有模型自動發現的工具 (Cline、Kilo、Roo、Goose、Aider、Qwen) 需要 `--model <id>` (並且 `--yes` 用於非互動運行)。要啟動一個 CLI，並注入正確的環境而不寫入任何配置，請使用通用的 `omniroute run <target>` 啟動器 (claude、codex、aider、goose、opencode、qwen、gemini — 目標和別名來自 `bin/cli/cli-manifest.mjs`)；舊的每個工具啟動器 `omniroute launch` (Claude Code) 和 `omniroute launch-codex` (Codex) 仍然可用。Gemini CLI 只能啟動：它是 `omniroute run` 的目標，但沒有 `setup-*`/`configure` 配方。

> **完整參考：** 主表 — 每個命令寫入的內容、每個標誌、本地與遠程，以及哪些工具需要 `/v1` 後綴 — 存在於
> **[CLI 整合](../guides/CLI-INTEGRATIONS.md)**。

### 在容器內運行這些命令

在 OmniRoute 容器內執行的 `setup-*` 命令會寫入容器自己的主目錄，主機 CLI 無法讀取，並且隨著容器消失。OmniRoute 檢測到這一點，並以指示退出 `2`，而不是寫入。有兩種支持的解決方案 — 在主機上安裝 CLI，並使用 `omniroute connect` 連接到容器，或綁定掛載配置目錄並設置 `CLI_CONFIG_HOME` (compose `host` 配置)。每個 `setup-*` 命令，加上 `omniroute configure` 和 `omniroute config set`，在配置容器自己的 CLI 時接受 `--allow-container-write`；`OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true` 對伺服器也有相同的效果。請參見
[Docker 指南 → 配置主機 CLI 工具](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker)。

儀表板的 **應用端點** (`POST /api/cli-tools/apply`) 強制執行相同的保護：在容器中，目標不是從主機綁定掛載的寫入會返回 **`422`**，並帶有 `containerEphemeralTarget: true`，安全錯誤文本，以及 — 對於具有主機配方的工具 (claude、codex、opencode、cline、kilo、continue) — 一個 `hostSetupCommand` (例如 `omniroute setup-opencode`) 以便在主機上運行；不會寫入任何內容。`dryRun: true` 在容器模式下繼續工作，並返回生成的內容 + 目標路徑而不觸及磁碟，因此您可以從儀表板預覽並在主機上應用。這種行為是故意的，並由 `tests/unit/api/cli-tools/apply-container-guard.test.ts` 進行回歸保護 — 永遠不要通過刪除保護來“修復” 422。

---

## 真實來源

統一目錄位於 `src/shared/constants/cliTools.ts` 中，作為 `CLI_TOOLS: Record<string, CliCatalogEntry>`。

每個條目都有以下字段（在 `src/shared/schemas/cliCatalog.ts` 中定義）：

| 字段                                            | 類型                                                         | 描述                                         |
| ----------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | 工具出現的頁面                               |
| `vendor`                                        | `string`                                                     | 工具來源（"Anthropic", "OSS (P. Gauthier)"） |
| `acpSpawnable`                                  | `boolean`                                                    | 也可用作 ACP Agent（顯示徽章）               |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | 自定義端點支持級別。`"none"` = MITM 待辦事項 |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | 配置機制                                     |
| `id`, `name`, `color`, `description`, `docsUrl` | 標準                                                         | 核心顯示字段                                 |

具有 `baseUrlSupport: "none"` 的條目在儀表板頁面中**不顯示** — 它們在 MITM 待辦事項中註冊，計劃 11（見 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`）。

### 能力層級（已編目 × 可檢測 × 可配置 × 可啟動）

並非每個已編目的工具都是可檢測的、可配置的或可啟動的。每個層級都有一個
聲明來源，並且漂移測試保持它們的一致性：

| 層級       | 意義                                                     | 聲明於                                                       |
| ---------- | -------------------------------------------------------- | ------------------------------------------------------------ |
| **已編目** | 出現在儀表板目錄中（名稱、提供者、文件、配置類型）       | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)             |
| **可檢測** | 二進制/配置檢測、健康檢查、配置路徑                      | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` 運行時目錄) |
| **可配置** | 由 `omniroute configure <cli>` 支持（存在設置食譜）      | `bin/cli/cli-manifest.mjs` (`configure: true`)               |
| **可啟動** | 由 `omniroute run <target>` 支持（定義了 env/args 注入） | `bin/cli/cli-manifest.mjs` (`run: true`)                     |

`bin/cli/cli-manifest.mjs` 是 CLI 命令的標準可執行清單：
`run`、`configure` 和 shell 完成生成器都從中派生其
目標列表、別名解析（例如 `kilocode`/`kilo-code`/`kilo_cli` → `kilo`）
和 `--model` 標誌接線。漂移保護
`tests/unit/cli/cli-manifest-drift.test.ts` 斷言清單、運行時
目錄、UI 目錄和每個消費者表面保持同步 — 一個表面添加的目標
而其他表面未添加將使測試失敗，而不是靜默漂移。

## 1. CLI 代碼目錄 (26 種工具)

所有出現在 `/dashboard/cli-code` 的工具。那些 `baseUrlSupport: none` 的工具是通過 MITM 或手動指南連接，而不是自定義基本 URL：

| id           | name                 | vendor               | baseUrlSupport | configType     | acpSpawnable |
| ------------ | -------------------- | -------------------- | -------------- | -------------- | ------------ |
| claude       | Claude 代碼          | Anthropic            | full           | env            | true         |
| codex        | OpenAI Codex CLI     | OpenAI               | full           | custom         | true         |
| zcode        | ZCode (GLM 編碼計劃) | Z.ai                 | none           | custom         | false        |
| cline        | Cline                | OSS (前 Claude 開發) | full           | custom         | true         |
| kilo         | Kilo 代碼            | Kilo-Org             | full           | custom         | false        |
| roo          | Roo 代碼             | Roo (OSS)            | full           | guide          | false        |
| continue     | Continue             | continue.dev         | full           | guide          | false        |
| aider        | Aider                | OSS (P. Gauthier)    | full           | guide          | true         |
| forge        | ForgeCode            | Antinomy HQ          | full           | custom         | true         |
| jcode        | jcode                | 1jehuang (OSS)       | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI         | Hunter Bown (OSS)    | full           | custom         | false        |
| codewhale    | CodeWhale            | Hmbown (OSS)         | full           | custom         | false        |
| opencode     | OpenCode             | Anomaly (前 SST)     | full           | guide          | true         |
| droid        | Factory Droid        | Factory AI           | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI   | GitHub/MS            | full           | custom         | false        |
| cursor-cli   | Cursor CLI           | Anysphere            | partial        | guide          | true         |
| smelt        | Smelt                | leonardcser (OSS)    | full           | custom         | false        |
| pi           | Pi (pi-coding-agent) | M. Zechner (OSS)     | full           | custom         | false        |
| grok-build   | Grok Build           | xAI                  | full           | custom         | false        |
| crush        | Crush                | OSS (Charm)          | full           | custom         | false        |
| qwen         | Qwen 代碼            | Alibaba              | full           | guide          | true         |
| cursor       | Cursor               | Anysphere            | none           | guide          | false        |
| antigravity  | Antigravity          | Google               | none           | mitm           | false        |
| hermes       | Hermes               | Nous Research        | none           | guide          | false        |
| kiro         | Kiro AI              | Amazon               | none           | mitm           | false        |
| custom       | 自定義 CLI           | —                    | full           | custom-builder | false        |

具有 `baseUrlSupport: "partial"` 的工具在儀表板卡片上顯示徽章 "⚠ 基本 URL 部分"。

## 2. CLI 代理目錄 (8 種工具)

出現在 `/dashboard/cli-agents` 的自主代理：

| id           | name             | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | full           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | full           | true         |
| goose        | Goose            | Block / Linux Foundation | full           | true         |
| interpreter  | Open Interpreter | OSS                      | full           | true         |
| warp         | Warp AI          | Warp Inc.                | partial        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | full           | false        |
| omp          | Oh My Pi         | OSS                      | full           | true         |
| letta        | Letta CLI        | Letta                    | full           | false        |

---

## 3. ACP 代理 (/dashboard/acp-agents)

此頁面（從 `/dashboard/agents` 重新命名）顯示 OmniRoute 可以通過 stdio/ACP 協議 **生成** 的後端執行引擎 CLI。目錄在 `src/lib/acp/registry.ts` 中單獨維護，並且 **不** 與 `CLI_TOOLS` 相同。

---

## 4. MITM 待辦事項 (未在儀表板中顯示)

以下 CLI 原生不支持自定義基本 URL，並且 **未列出** 在 CLI 代碼或 CLI 代理頁面中。它們是計劃 11 中 MITM 攔截的候選者：

| CLI                 | 理由                                           |
| ------------------- | ---------------------------------------------- |
| windsurf            | BYOK 限制於選定的 Claude 模型 + 企業 URL/token |
| amp                 | 封閉生態系統 (Sourcegraph)                     |
| amazon-q / kiro-cli | AWS SSO 認證，無自定義 URL                     |
| cowork              | Anthropic Desktop，無可配置的端點              |

請參見 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md` 以獲取完整的交叉參考。

---

## 5. 批量檢測 API

所有工具檢測通過單一端點聚合：

**`GET /api/cli-tools/all-statuses`**

- 認證: `requireCliToolsAuth(request)`（與其他 `/api/cli-tools/` 路由相同）
- 返回: `Record<toolId, ToolBatchStatus>`（類型: `src/shared/types/cliBatchStatus.ts`）
- 策略: 對所有工具使用 `Promise.all`，每個工具 5 秒超時
- 快取: 記憶體 LRU，按配置文件 `mtime` 索引。當 mtime 更改時，快取失效。伺服器重啟時重置。

每個工具的回應形狀：

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
  error?: string; // 已清理，無堆棧跟蹤
}
```

## 6. 新工具的設定處理器

具有 `configType: "custom"` 的新工具擁有專用的設定 API 路徑：

| 路徑                                        | 工具                                                             |
| ------------------------------------------- | ---------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                          |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url flag)                                          |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, legacy)                           |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, primary + legacy `~/.deepseek` sync) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                            |
| `POST /api/cli-tools/pi-settings`           | Pi coding agent                                                  |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)            |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + dedicated `.env` key)       |

所有路徑都使用 `sanitizeErrorMessage()` 來處理錯誤回應（硬性規則 #12）。

---

## 7. 儀表板頁面架構

### CLI 代碼 (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — 伺服器組件
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — 客戶端網格
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — 工具詳細頁面
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12 個專用工具卡片 + `ToolDetailClient.tsx`

### CLI 代理 (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — 伺服器組件
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — 客戶端網格
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — 重用 `ToolDetailClient`

### ACP 代理 (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — 伺服器組件（從 `agents/` 移動過來）

### 共享 UI 組件 (`src/shared/components/cli/`)

| 檔案                    | 目的                               |
| ----------------------- | ---------------------------------- |
| `CliToolCard.tsx`       | 智能狀態卡片（檢測 + 設定 + 端點） |
| `CliConceptCard.tsx`    | 每頁概念解釋卡片                   |
| `CliComparisonCard.tsx` | 三欄比較不同 CLI 類型              |
| `BaseUrlSelect.tsx`     | 端點下拉選單（本地/雲端/自定義）   |
| `ApiKeySelect.tsx`      | API 金鑰選擇器                     |
| `ManualConfigModal.tsx` | 可複製的設定片段模態               |

### 共享 Hook (`src/shared/hooks/cli/`)

| 檔案                      | 目的                                                  |
| ------------------------- | ----------------------------------------------------- |
| `useToolBatchStatuses.ts` | 獲取 `/api/cli-tools/all-statuses`，管理加載/刷新狀態 |

## 8. i18n

在計劃 14 F9 中新增的命名空間：

| 命名空間    | 目的                                              |
| ----------- | ------------------------------------------------- |
| `cliCommon` | 共享字串（卡片標籤、概念/比較文本、詳細頁面標籤） |
| `cliCode`   | CLI 代碼的頁面字串                                |
| `cliAgents` | CLI 代理頁面字串                                  |
| `acpAgents` | ACP 代理頁面字串                                  |

提供完整的 PT-BR 和 EN 翻譯。其他 39 種語言通過 `src/i18n/request.ts` 中的命名空間級合併自動回退到 EN。

---

## 9. 快速開始

### 步驟 1 — 獲取 OmniRoute API 金鑰

1. 打開 `/dashboard/api-manager` → **創建 API 金鑰**
2. 給它命名（例如 `cli-tools`）並選擇所有權限
3. 複製金鑰 — 您將在下面的每個 CLI 中需要它

> 您的金鑰看起來像：`sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### 步驟 2 — 安裝 CLI 工具

所有基於 npm 的工具需要 Node.js 22.22.2+ 或 24.x：

```bash
# Claude Code (Anthropic)
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

# Google Gemini CLI (可通過 `omniroute run gemini` 啟動 → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # 基於 Rust

# Pi coding agent
# 請參見 https://github.com/zechnerj/pi-coding-agent 以獲取安裝信息

# jcode
# 請參見 https://github.com/1jehuang/jcode 以獲取安裝信息
```

---

### 步驟 3 — 通過儀表板配置

1. 前往 `http://localhost:20128/dashboard/cli-code`
2. 在網格中找到您的工具
3. 點擊卡片以打開工具詳細頁面
4. 選擇您的 API 金鑰和基本 URL
5. 點擊 **應用配置** 或複製手動配置片段

---

### 步驟 4 — 設置全域環境變量

```bash
# OmniRoute 通用端點
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI 在根目錄讀取 GOOGLE_GEMINI_BASE_URL（其 SDK 自行附加 /v1beta/...）
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> 對於 **遠程伺服器**，將 `localhost:20128` 替換為伺服器 IP 或域名，
> 例如 `http://<your-server-ip>:20128`。

---

### 步驟 5 — 配置每個工具

#### Claude Code

```bash
# 創建 ~/.claude/settings.json：
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

使用統一的 Anthropic 閘道根目錄來配置 Claude Code。此處不要附加 `/v1`。

**測試：** `claude "say hello"`

---

#### OpenAI Codex

現代 Codex (v0.137+) 僅讀取 `~/.codex/config.toml` — 舊的
`config.yaml` 屬於遺留的 npm CLI，並被靜默忽略。API
金鑰保留在 `OMNIROUTE_API_KEY` 環境變量中（`env_key`），永遠
不應放在文件內：

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

完整參考（配置文件、`wire_api`、上下文窗口）： [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md)。

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
        "apiKey": "sk-your-omniroute-key"
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

#### Cline (CLI 或 VS Code)

**CLI 模式：**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code 模式：**
Cline 擴展設置 → API 提供者：`OpenAI Compatible` → 基本 URL：`http://localhost:20128/v1`

或者使用 OmniRoute 儀表板 → **CLI 工具 → Cline → 應用配置**。

---

#### KiloCode (CLI 或 VS Code)

**CLI 模式：**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code 設置：**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

或者使用 OmniRoute 儀表板 → **CLI 工具 → KiloCode → 應用配置**。

---

#### Continue (VS Code 擴展)

編輯 `~/.continue/config.yaml`：

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

編輯後重新啟動 VS Code。

---

#### VS Code Insiders (`chatLanguageModels.json`)

當 VS Code Insiders 配置為自定義端點模型時，使用此配置以便 OmniRoute 在沒有自定義標頭字段的情況下工作。

**推薦位置：**

- Linux: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- Windows: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**使用標記的 OmniRoute 別名的示例：**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**注意：**

- 將 `sk-your-omniroute-key` 替換為在 OmniRoute 中創建的 API 金鑰。
- `url` 字段應指向 `/api/v1/vscode/{token}/chat/completions`。
- `modelsUrl` 字段應指向 `/api/v1/vscode/{token}/models`。
- 當客戶端支持自定義標頭時，優先使用正常的 `/v1` + Bearer 標頭流。
- 嵌入 URL 的令牌是兼容性回退，可能會出現在編輯器日誌或代理歷史中。

---

#### Kiro CLI (Amazon)

```bash
# 登錄到您的 AWS/Kiro 帳戶：
kiro-cli login

# CLI 使用其自己的身份驗證 — OmniRoute 不需要作為 Kiro CLI 本身的後端。
# 將 kiro-cli 與 OmniRoute 一起使用以支持其他工具。
kiro-cli status
```

對於 **Kiro IDE** 桌面應用程序，使用 OmniRoute 在 `/dashboard/cli-tools → Kiro` 下暴露的 MITM 端點。

---

## 10. 內部 OmniRoute CLI

`omniroute` 二進位檔提供伺服器生命週期、設置、診斷和提供者管理的命令。進入點：`bin/omniroute.mjs`。

```bash
omniroute                              # 啟動伺服器（預設端口 20128）
omniroute setup                        # 互動式設置嚮導
omniroute doctor                       # 檢查配置、數據庫、端口、運行時
omniroute providers list               # 已配置的提供者連接
omniroute providers test-all           # 測試每個活動連接
omniroute reset-password               # 重置管理員密碼
omniroute logs                         # 串流請求日誌
omniroute health                       # 詳細健康狀態（斷路器、快取、記憶體）
omniroute --version                    # 輸出版本
omniroute --help                       # 顯示所有命令
```

### 設置與初始化

```bash
omniroute setup                        # 互動式設置嚮導
omniroute setup --non-interactive      # CI/自動化模式（讀取環境變數 + 標誌）
omniroute setup --password '<value>'   # 直接設置管理員密碼
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # 一次性添加並測試提供者
```

非互動式設置的環境變數：

| 變數                | 目的                                                          |
| ------------------- | ------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | 提供者 API 密鑰（通過 Commander `.env()` 綁定到 `--api-key`） |
| `DATA_DIR`          | 覆蓋 OmniRoute 數據目錄                                       |

所有其他非互動式輸入作為標誌傳遞，而不是環境變數：
`--password`、`--provider`、`--provider-name`、`--provider-base-url`、`--default-model`
（請參見上面的 `omniroute setup` 選項）。

### 診斷

```bash
omniroute doctor                       # 檢查配置、數據庫、端口、運行時、記憶體、存活性
omniroute doctor --json                # 機器可讀的 JSON
omniroute doctor --no-liveness         # 跳過 HTTP 健康探測
omniroute doctor --host 0.0.0.0        # 覆蓋存活性主機
omniroute doctor --liveness-url <url>  # 完整健康端點 URL 覆蓋
```

醫生運行這些檢查：`配置`、`數據庫`、`存儲/加密`、
`端口可用性`、`節點運行時`、`本地二進位檔`（better-sqlite3）、
`記憶體`和`伺服器存活性`。如果任何檢查失敗，則退出非零。

### 提供者管理

```bash
omniroute providers available                       # OmniRoute 提供者目錄
omniroute providers available --search openai       # 按 id/name/alias/category 過濾目錄
omniroute providers available --category api-key    # 按類別過濾（api-key、oauth、free 等）
omniroute providers available --json                # 機器可讀的 JSON

omniroute providers list                            # 已配置的提供者連接
omniroute providers list --json

omniroute providers test <id|name>                  # 測試一個已配置的連接
omniroute providers test-all                        # 測試每個活動連接
omniroute providers validate                        # 僅限本地的結構驗證
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # 現有的 OAuth 流程
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove` 是 API 首先，因此針對
活動的本地或遠程上下文工作。憑證輸入應使用
`--credential-stdin` 或 `--credential-env`；`--dry-run --json` 僅報告
已編輯的存在/形狀。`providers available` 讀取 OmniRoute 目錄；
`providers list/test/test-all/validate` 保留其本地 SQLite 行為，並且
不需要伺服器運行。

### 恢復與重置

```bash
omniroute reset-password                # 重置管理員密碼（也可用：omniroute-reset-password）
omniroute reset-encrypted-columns       # 顯示警告 + 加密憑證重置的乾運行
omniroute reset-encrypted-columns --force  # 實際清除 SQLite 中的加密憑證
```

### 憑證導出 (⚠ 請小心處理)

```bash
omniroute auth export                                 # 顯示警告 + 確認門檻 — 無法訪問數據庫
omniroute auth export --force                          # 將所有連接的解密憑證導出到 stdout 作為 JSON
omniroute auth export --force --id <id>                 # 僅導出匹配的連接
omniroute auth export --force --format env               # 輸出 OMNIROUTE_<PROVIDER>_<FIELD>=<value> 行
omniroute auth export --force --out creds.json           # 寫入文件（以 0600 權限創建）
```

`auth export` 是 **僅限本地**（直接 SQLite 讀取，無 HTTP 路由）並故意打印/寫入
**明文** `apiKey`/`accessToken`/`refreshToken`/`idToken` 值 — 這是功能，而不是
錯誤。沒有從數據庫讀取任何內容，並且在沒有 `--force` 的情況下不會解密。任何明文輸出之前，始終會打印 stderr 警告橫幅。需要設置 `STORAGE_ENCRYPTION_KEY`。無法解密的字段（過期密鑰、損壞的密文）將報告為
`<field>DecryptFailed: true`，而不是中止整個導出或洩漏底層錯誤。

### 其他子命令

這些假設正在運行的 OmniRoute 伺服器，除非另有說明：

```bash
omniroute status                       # 綜合運行時狀態
omniroute logs                         # 串流請求日誌 (--json, --search, --follow)
omniroute config show                  # 顯示當前配置

omniroute provider list                # 列出可用提供者（providers list 的別名）
omniroute provider add                 # 在工具上註冊 OmniRoute 作為提供者
omniroute keys add | list | remove     # 管理 API 密鑰
omniroute models [provider]            # 列出模型 (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # 快照配置 + 數據庫
omniroute restore                      # 從先前的快照恢復

omniroute health                       # 詳細健康狀態（斷路器、快取、記憶體）
omniroute quota                        # 提供者配額使用情況
omniroute cache                        # 快取狀態
omniroute cache clear                  # 清除語義 + 簽名快取

omniroute mcp status | restart         # MCP 伺服器狀態 / 重啟
omniroute a2a status | card            # A2A 伺服器狀態 / 代理卡

omniroute tunnel list | create | stop  # 管理隧道（cloudflare/tailscale/ngrok）
omniroute env show | get <k> | set <k> <v>  # 檢查 / 設置環境變數（臨時）

omniroute test                         # 提供者連接性煙霧測試
omniroute update                       # 檢查更新
omniroute completion                   # 生成 shell 完成
```

### 常見標誌

| 標誌                | 描述                                         |
| ------------------- | -------------------------------------------- |
| `--no-open`         | 啟動時不自動打開瀏覽器                       |
| `--port <n>`        | 覆蓋 API 端口（預設 20128）                  |
| `--mcp`             | 作為 MCP 伺服器通過 stdio 運行（用於 IDE）   |
| `--non-interactive` | CI 模式（無提示；從環境/標誌讀取）           |
| `--json`            | 機器可讀的 JSON 輸出（doctor、providers 等） |
| `--help`, `-h`      | 顯示命令特定的幫助                           |
| `--version`, `-v`   | 輸出已安裝版本                               |

## 可用的 API 端點

| 端點                       | 描述                    | 用途                    |
| -------------------------- | ----------------------- | ----------------------- |
| `/v1/chat/completions`     | 標準聊天（所有提供者）  | 所有現代工具            |
| `/v1/responses`            | 回應 API（OpenAI 格式） | Codex，代理工作流程     |
| `/v1/completions`          | 過時的文本補全          | 使用 `prompt:` 的舊工具 |
| `/v1/embeddings`           | 文本嵌入                | RAG，搜索               |
| `/v1/images/generations`   | 圖像生成                | GPT-Image，Flux 等      |
| `/v1/audio/speech`         | 文本轉語音              | ElevenLabs，OpenAI TTS  |
| `/v1/audio/transcriptions` | 語音轉文本              | Deepgram，AssemblyAI    |

準備好粘貼的示例，帶有標記的 OmniRoute URL：

```txt
Token example: sk-a3ab3c080beaee3a-69f4a4-070d71af

標準 OpenAI 基礎： http://localhost:20128/v1
VS Code 模型： http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code 聊天： http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code 回應： http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama 標籤： http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama 聊天： http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## 疑難排解

| 錯誤                            | 原因               | 修復                                       |
| ------------------------------- | ------------------ | ------------------------------------------ |
| `Connection refused`            | OmniRoute 未運行   | `omniroute serve`                          |
| `401 Unauthorized`              | 錯誤的 API 金鑰    | 在 `/dashboard/api-manager` 中檢查         |
| `No combo configured`           | 沒有活動的路由組合 | 在 `/dashboard/combos` 中設置              |
| CLI 顯示 "not installed"        | 二進制不在 PATH 中 | 檢查 `which <command>`                     |
| 儀表板安裝後顯示 "not detected" | 快取過期           | 在儀表板中點擊 "⟳ 刷新檢測"                |
| 舊連結 `/dashboard/cli-tools`   | v3.8.6 之前的書籤  | 自動重定向到 `/dashboard/cli-code` (308)   |
| 舊連結 `/dashboard/agents`      | v3.8.6 之前的書籤  | 自動重定向到 `/dashboard/acp-agents` (308) |
