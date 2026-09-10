# CLI-INTEGRATIONS (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI 整合 — 將任何編碼 CLI 指向 OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI 整合

OmniRoute 提供一系列 `setup-*` 命令，用於配置編碼 CLI（Codex、Claude Code、OpenCode、Cline 等）以使用 OmniRoute 作為其後端 — 這樣工具只需與 **一個** 端點通信，OmniRoute 會自動將請求路由到正確的提供者並進行自動回退。每個命令都從運行中的 OmniRoute（本地或遠程）讀取 **實時** 模型目錄，並在 **你的** 機器上寫入工具自己的配置文件。API 密鑰在工具支持的地方通過環境變量引用。持久化工具本地環境文件的命令如下所示。

還有一個通用啟動器 — `omniroute run <target>` — 它會啟動 `claude`、`codex`、`aider`、`goose`、`opencode`、`qwen` 或 `gemini`，並注入正確的環境，而無需寫入任何配置。目標及其別名來自於標準清單 `bin/cli/cli-manifest.mjs`（`claude-code|cc|anthropic`、`codex-cli|openai-codex|openai`、`goose-cli`、`open-code`、`qwen-code`、`gemini-cli`），而 `omniroute completion` 提供相同的基於清單的目標詞。舊版每個工具的啟動器 — `omniroute launch`（Claude Code）和 `omniroute launch-codex`（Codex） — 仍然可用。

提供者的入門可以從相同的本地/遠程上下文中進行。下面的 API 首先命令將管理身份驗證與提供者憑據分開，並且從不在結構化輸出中打印憑據：

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

對於腳本，建議使用 `--credential-stdin` 或 `--credential-env`；`--credential` 保留用於受控的本地使用。`providers remove` 在非互動終端上需要 `--yes`，所有五個命令都遵循活動上下文或全域的 `--base-url`/`--api-key` 選項。

有關兩個最豐富整合的一次性手動基本設置，請參見每個工具的深入探討：

- [Claude Code 配置](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI 配置](./CODEX-CLI-CONFIGURATION.md)
- [遠程模式](./REMOTE-MODE.md) — 從你的筆記本電腦驅動遠程 OmniRoute（VPS / Tailnet）
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot 擴展；它也可以在編輯器內為你運行這些 `setup-*` 命令

---

## 主表

每個命令都遵循 **活動上下文**（通過 `omniroute connect` 設置，請參見 [遠程模式](./REMOTE-MODE.md)）或明確的 `--remote <url> --api-key <key>` 標誌。下面的 "本地與遠程" 意味著：不帶標誌時，它的目標是 `http://localhost:20128`；帶有 `--remote`（或活動的遠程上下文）時，它從該服務器獲取目錄並在本地寫入配置。

| 命令                       | 工具                    | 寫入內容                                                                                                                           | 主要標誌                                                                                                                                   | 本地與遠程 |
| -------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `omniroute setup-codex`    | OpenAI Codex CLI        | `~/.codex/<name>.config.toml` — 每個兼容文本模型的一個配置文件（`codex --profile <name>`）                                         | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | 兩者       |
| `omniroute setup-claude`   | Claude Code             | `~/.claude/profiles/<name>/settings.json` — 每個匹配模型的一個配置文件（`CLAUDE_CONFIG_DIR`）                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | 兩者       |
| `omniroute setup-opencode` | OpenCode（兼容 openai） | `~/.config/opencode/opencode.json` — 包含每個目錄模型的 `omniroute` 提供者（`opencode -m omniroute/<model>`）                      | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | 兩者       |
| `omniroute setup-cline`    | Cline                   | `~/.cline/data/{globalState,secrets}.json`（CLI 模式） + 打印 VS Code 擴展設置                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | 兩者       |
| `omniroute setup-kilo`     | Kilo Code               | `~/.local/share/kilo/auth.json`（CLI） + 如果存在，將 `kilocode.*` 合併到 VS Code 的 `settings.json`                               | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | 兩者       |
| `omniroute setup-continue` | Continue / `cn` CLI     | `~/.continue/config.yaml` — `provider: openai` 模型，密鑰通過 `${{ secrets.OMNIROUTE_API_KEY }}`                                   | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 兩者       |
| `omniroute setup-cursor`   | Cursor                  | 無 — 打印應用內步驟（Cursor 配置是模糊的 SQLite）                                                                                  | `--remote` `--api-key` `--only` `--port`                                                                                                   | 兩者       |
| `omniroute setup-roo`      | Roo Code                | `~/.omniroute/roo-settings.json`（導入文件） + 如果存在 VS Code 的 `settings.json`，設置 `roo-cline.autoImportSettingsPath`        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | 兩者       |
| `omniroute setup-crush`    | Crush                   | `~/.config/crush/crush.json` — `openai-compat` 提供者，密鑰通過 `$OMNIROUTE_API_KEY`                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 兩者       |
| `omniroute setup-goose`    | Goose                   | `~/.config/goose/config.yaml`（`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`） + 打印環境配方                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 兩者       |
| `omniroute setup-aider`    | Aider                   | `~/.aider.conf.yml`（`openai-api-base` + `model: openai/<id>`） + 打印環境配方                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 兩者       |
| `omniroute setup-qwen`     | Qwen Code               | `~/.qwen/settings.json` — V4 `modelProviders.openai` 陣列 + `OMNIROUTE_API_KEY` 在 `~/.qwen/.env`                                  | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | 兩者       |
| `omniroute run <target>`   | 運行時啟動（通用）      | 無 — 啟動 `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`，並帶有正確的環境和參數；Qwen 和 Gemini 使用臨時隔離的主目錄 | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | 兩者       |
| `omniroute launch`         | Claude Code             | 無 — 啟動 `claude`，並注入 `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`                                                             | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | 兩者       |
| `omniroute launch-codex`   | OpenAI Codex CLI        | 無 — 啟動 `codex`，並通過 `-c` 標誌注入 `omniroute` 提供者                                                                         | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | 兩者       |

有關標誌的說明（在命令源中已驗證）：

- `--remote <url>` — 從遠程 OmniRoute 獲取目錄（覆蓋 `--port` 和活動上下文）。`--api-key <key>` 提供該服務器的憑據（預設為 `OMNIROUTE_API_KEY` 環境變量，或活動上下文的令牌）。
- `--only <patterns>` — 以逗號分隔的子字串；僅保留匹配的模型 ID（例如 `--only glm,kimi`）。可用於 `setup-codex`、`setup-claude`、`setup-opencode`、`setup-continue`、`setup-cursor`、`setup-crush`。
- `--dry-run` — 打印將要寫入的內容，而不觸及文件系統。可用於每個 `setup-*` 命令 **除了** `setup-cursor`（該命令從不寫入文件）。
- `--model <id>` — 對於沒有模型自動發現的工具是必需的（或交互選擇）：Cline、Kilo、Roo、Goose、Qwen、Aider。這些工具也接受 `--yes` 以進行非交互式運行（這樣則需要 `--model`）。`setup-opencode` 需要 `--model` 來設置預設的頂級模型。
- `--model <id>` 在 `omniroute run` 上遵循清單的每個目標接線（`bin/cli/cli-manifest.mjs`）：**aider** 接收 `--model openai/<id>`，**opencode** 接收 `--model omniroute/<id>`（前綴僅在 ID 不包含時添加）；**qwen** 和 **gemini** 直接接收 ID；**claude** 通過 `ANTHROPIC_MODEL` 獲得，**goose** 通過 `GOOSE_MODEL` 獲得，**codex** 通過 `-c model_providers.omniroute.*` 參數獲得。**Qwen 是唯一一個強制要求 `--model` 的運行目標** — `omniroute run qwen` 如果沒有它將以明確錯誤退出 `2`。
- `--port <port>` — 本地 OmniRoute 端口（預設為 `20128`，設置 `--remote` 時忽略）。在所有 `setup-*` 和兩個啟動器上均存在。
- `omniroute run` 退出代碼：子 CLI 的自身退出代碼被逐字傳遞；`2` = 無效參數（不支持的目標，缺少必需的 `--model`，容器保護）；`127` = 目標二進制文件不在 `PATH` 中；`130`/`143`/`129` 當啟動被 `SIGINT`/`SIGTERM`/`SIGHUP` 終止時；`1` = 其他運行時啟動失敗。
- 兩個啟動器（`launch`、`launch-codex`）接受 `--profile <name>` 以選擇由 `setup-claude` / `setup-codex` 寫入的配置文件，並傳遞底層 `claude` / `codex` 二進制文件的參數。

互動選擇器也由設置配方共享：

```bash
# 從活動的本地或遠程模型目錄中選擇並配置目標。
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` 目前委託給 `codex`、`claude`、`opencode`、`qwen`、`aider`、`goose`、`cline`、`continue` 和 `kilo` 的測試配方。僅限 IDE、MITM 和僅限指南的目錄條目仍然是明確的 `setup-*`/手動流程，並不作為可啟動的目標呈現。

> `setup-opencode` 是 **輕量級的 openai 兼容** OpenCode 整合。
> 還有一個更豐富的插件整合 — `omniroute setup opencode` — 它安裝 `@omniroute/opencode-plugin`。這是不同的命令；上面的表格記錄了 `setup-opencode`。

---

## 本地使用

在 `localhost:20128` 上運行 OmniRoute，只需為您的工具運行設置命令。目錄是從本地服務器獲取的。

```bash
# Codex: 為每個匹配的模型寫入配置文件到 ~/.codex/
omniroute setup-codex
codex --profile glm52            # 使用生成的配置文件

# Claude Code: 為每個模型寫入配置文件，然後啟動一個
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: 寫入與所有目錄模型兼容的 openai 提供者
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # 通過 {env:OMNIROUTE_API_KEY} 引用，永遠不會寫入磁碟
opencode -m omniroute/glm/glm-5.2 "..."

# 沒有自動發現的工具需要明確的模型：
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# 預覽而不寫入任何內容：
omniroute setup-continue --dry-run
```

在不寫入任何配置的情況下啟動（僅環境注入）：

```bash
omniroute launch                 # Claude Code → 本地 OmniRoute
omniroute launch-codex           # Codex CLI → 本地 OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# 明確的命令路徑：傳遞任何在 -- 之後的內容
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## 遠程使用

將任何設置命令指向遠程 OmniRoute，使用 `--remote` + `--api-key`。目錄是從遠程獲取的；配置寫入您的本地機器。

```bash
# OpenCode 對遠程 VPS，僅保留 glm/kimi 模型
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # 首先導出 OMNIROUTE_API_KEY

# 從遠程目錄獲取 Codex 配置文件
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# 直接對遠程啟動 CLI
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

不必每次都傳遞 `--remote`/`--api-key`，只需登錄一次，讓 **活動上下文** 自動提供它們：

```bash
omniroute connect 192.168.0.15        # 創建一個範圍令牌，存儲上下文
omniroute setup-codex                 # ← 現在使用遠程目錄
omniroute setup-opencode              # ← 同上
omniroute launch                      # ← Claude Code 對遠程
```

請參見 [遠程模式](./REMOTE-MODE.md) 以了解上下文、範圍和令牌管理。

---

## 基本 URL 約定（哪些工具需要 `/v1`）

OmniRoute 在 `/v1` 上公開 OpenAI 接口，在根目錄上公開 Anthropic 接口，並在 `/v1beta` 上公開原生 Gemini 接口。每個集成都連接到其工具所期望的形式（在命令源中驗證）：

| 集成                                                                       | 寫入的基本 URL | `/v1`?                                   |
| -------------------------------------------------------------------------- | -------------- | ---------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | 根             | 否 — Cline 附加 `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | 根             | 否 — Goose 附加路徑                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | 根             | 否 — LiteLLM 附加 `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | 帶 `/v1`       | 是                                       |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | 根             | 否 — Claude Code 附加 `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | 帶 `/v1`       | 是                                       |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | 帶 `/v1`       | 是                                       |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | 根             | 否 — SDK 附加 `/v1beta/models/…`         |

---

## 保持原生依賴更新： `--include=optional`

當你使用 `omniroute update` 更新時（在確認後，或使用 `--apply`），
OmniRoute 會自動執行帶有 `--include=optional` 的安裝：

```bash
npm install -g omniroute@latest --include=optional
```

這**不是**你傳遞給 `omniroute update` 的標誌 — 它始終由更新器應用。這保證了 `optionalDependencies`（`better-sqlite3`、`keytar`、`tls-client`、LLMLingua SLM 堆疊）在更新過程中存活，即使你的 npm 配置設置了 `omit=optional`，這樣會默默地刪除原生 SQLite 驅動程序和 OS-keyring 綁定。要預覽確切的命令而不應用：

```bash
omniroute update --dry-run
# [DRY RUN] 會運行： npm install -g omniroute@latest --include=optional
```

其他 `omniroute update` 標誌（在源代碼中驗證）： `--check`（如果過時則退出 1）、`--apply`（無提示安裝）、`--changelog`、`--no-backup`、`--yes`。

---

## 通過 `omniroute run gemini` 使用 Google Gemini CLI

合約已針對 `@google/gemini-cli` 0.50.0 進行驗證：該 CLI 尊重
`GOOGLE_GEMINI_BASE_URL` 並對其發出 `POST /v1beta/models/<model>:generateContent`
（和 `:streamGenerateContent?alt=sse`）— 完全符合 OmniRoute 的原生
Gemini 接口（`/v1beta`）。`omniroute run gemini` 自動連接這些：

- `GOOGLE_GEMINI_BASE_URL` → 當前的 OmniRoute 基本 URL（根，不帶 `/v1`）；
- `GEMINI_API_KEY` → 解決的 OmniRoute 憑證（選項/環境/上下文）；
- 一個**臨時隔離的 `GEMINI_CLI_HOME`**，其 `.gemini/settings.json`
  選擇 `gemini-api-key` 認證，因此存儲的 Google OAuth 會話（代碼助手）
  永遠不會覆蓋 OmniRoute 指導的啟動 — 退出後刪除；
- **環境衛生**：子環境中刪除了 `GOOGLE_API_KEY`、
  `GOOGLE_GENAI_USE_VERTEXAI` 和 `GOOGLE_GENAI_USE_GCA`（這會將
  認證重定向到 Vertex/代碼助手），並設置 `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  作為備用 — 其他 `run` 目標也會對其自身的衝突變量進行相同處理；
- 從 `--provider`/`--model` 注入 `--model <id>`。

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini 的工作區信任保護在無頭模式下仍然適用 — 請自行傳遞
`--skip-trust`（或互動式信任目錄）；啟動器故意不繞過它。這個啟動器與
**ACP 註冊**（`src/lib/acp/registry.ts`，`gemini --acp`）不同，後者仍然是
`/dashboard/acp-agents` 的代理協議集成。

---

## 真實煙霧掃描（自選）

確定性啟動計劃回歸在 CI 中運行（`tests/unit/cli/run-command.test.ts`，
`tests/unit/cli/run-execution.test.ts`）。為了驗證 REAL 二進制文件與 REAL
OmniRoute 服務器的兼容性，存在一個自選的工具在
`tests/integration/upstream-cli-smoke.int.test.ts`。它從不自動運行
（每個子測試都會跳過，除非設置 `RUN_CLI_SMOKE=1`），通過環境變量
名稱傳遞憑證（從不通過值），從任何記錄的輸出中刪除關鍵字串，跳過
未安裝二進制文件的目標，並將失敗分類為
認證 / 上游 / 配置，而不是簡單的布爾值：

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

可選：`OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` 限制掃描；
`OMNIROUTE_SMOKE_TIMEOUT_MS` 覆蓋每個目標的 120 秒超時。

---

## 另請參閱

- [Claude Code 配置](./CLAUDE-CODE-CONFIGURATION.md) — 更深入的 Claude Code 指南
- [Codex CLI 配置](./CODEX-CLI-CONFIGURATION.md) — 一次性的 `[model_providers.omniroute]` 基本設置
- [遠端模式](./REMOTE-MODE.md) — 上下文、範圍訪問令牌、驅動遠端伺服器
- [CLI 工具參考](../reference/CLI-TOOLS.md) — 支援工具 + 儀表板頁面的完整目錄
- [安裝指南](./SETUP_GUIDE.md) — 安裝方法和首次運行的入門指導
