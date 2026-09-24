# CLI Integrations (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇯🇵 [ja](../../../ja/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRoute 提供一系列 `setup-*` 命令，用於配置編碼 CLI (Codex, Claude Code, OpenCode, Cline, …) 以使用 OmniRoute 作為其後端 — 這樣工具只需與**一個**端點通訊，OmniRoute 便會自動回退並路由到正確的提供者。每個命令都會從正在運行的 OmniRoute（本地或遠端）讀取**即時**模型目錄，並在**您的**機器上寫入工具自己的配置文件。只要工具支援，API 金鑰就會透過環境變數引用。下面列出了會持久化工具本地環境文件的命令。

還有一個通用啟動器 — `omniroute run <target>` — 它會在不寫入任何配置的情況下，注入正確的環境變數來啟動 `claude`、`codex`、`aider`、`goose`、`opencode`、`qwen` 或 `gemini`。目標及其別名來自規範清單 `bin/cli/cli-manifest.mjs` (`claude-code|cc|anthropic`, `codex-cli|openai-codex|openai`, `goose-cli`, `open-code`, `qwen-code`, `gemini-cli`)，而 `omniroute completion` 則提供相同的、源自清單的目標詞。傳統的每個工具啟動器 — `omniroute launch` (Claude Code) 和 `omniroute launch-codex` (Codex) — 仍然可用。

提供者上線可從相同的本地/遠端上下文取得。下面這些 API 優先的命令將管理驗證與提供者憑證分開，並且從不在結構化輸出中列印憑證：

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

對於腳本，請優先使用 `--credential-stdin` 或 `--credential-env`；`--credential` 則保留用於受控的本地使用。在非互動式終端機上，`providers remove` 需要 `--yes` 選項，並且所有這五個命令都遵循活動上下文或全域 `--base-url`/`--api-key` 選項。

提供者選擇器會拒絕模糊的 ID 前綴、名稱或提供者名稱；當有多個連接匹配時，請使用完整的連接 ID。建立和編輯命令會讀回已儲存的連接，而移除操作則會驗證該連接是否不再可讀。匯入操作會跳過現有的提供者/名稱對。匯入的條目不能覆蓋提供給 CLI 的管理端點、上下文或管理憑證。

對於兩個最豐富整合的一次性手動基礎設定，請參閱各工具的深入探討：

- [Claude Code 配置](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI 配置](./CODEX-CLI-CONFIGURATION.md)
- [遠端模式](./REMOTE-MODE.md) — 從您的筆記型電腦驅動遠端 OmniRoute (VPS / Tailnet)
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot 擴充功能；它也可以在編輯器內部為您執行這些 `setup-*` 命令

---

## 總表

每個指令都會遵循**作用中的情境**（使用 `omniroute connect` 設定，請參閱
[遠端模式](./REMOTE-MODE.md)），或使用明確的 `--remote <url> --api-key <key>` 旗標。
下方的「本機與遠端」意指：未指定旗標時，目標為 `http://localhost:20128`；
使用 `--remote`（或作用中的遠端情境）時，則會從該伺服器擷取目錄，並將設定寫入本機。

| 命令                       | 工具                    | 寫入內容                                                                                                                                                   | 主要旗標                                                                                                                                   | 本機與遠端 |
| -------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ---------- |
| `omniroute setup-codex`    | OpenAI Codex CLI        | `~/.codex/<name>.config.toml` — 每個相容的文字模型各一個設定檔（`codex --profile <name>`）                                                                 | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | 兩者       |
| `omniroute setup-claude`   | Claude Code             | `~/.claude/profiles/<name>/settings.json` — 每個符合的模型各一個設定檔（`CLAUDE_CONFIG_DIR`）                                                              | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | 兩者       |
| `omniroute setup-opencode` | OpenCode（OpenAI 相容） | `~/.config/opencode/opencode.json` — 包含目錄中所有模型的 `omniroute` 提供者（`opencode -m omniroute/<model>`）                                            | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | 兩者       |
| `omniroute setup-cline`    | Cline                   | `~/.cline/data/{globalState,secrets}.json`（CLI 模式）+ 輸出 VS Code 擴充功能設定                                                                          | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | 兩者       |
| `omniroute setup-kilo`     | Kilo Code               | `~/.local/share/kilo/auth.json`（CLI）+ 若存在 VS Code `settings.json`，則將 `kilocode.*` 合併至其中                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | 兩者       |
| `omniroute setup-continue` | Continue / `cn` CLI     | `~/.continue/config.yaml` — `provider: openai` 模型，金鑰透過 `${{ secrets.OMNIROUTE_API_KEY }}` 提供                                                      | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 兩者       |
| `omniroute setup-cursor`   | Cursor                  | 不寫入任何內容 — 輸出應用程式內的操作步驟（Cursor 設定是不透明的 SQLite）                                                                                  | `--remote` `--api-key` `--only` `--port`                                                                                                   | 兩者       |
| `omniroute setup-roo`      | Roo Code                | `~/.omniroute/roo-settings.json`（匯入文件）+ 若存在 VS Code `settings.json`，則設定 `roo-cline.autoImportSettingsPath`                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | 兩者       |
| `omniroute setup-crush`    | Crush                   | `~/.config/crush/crush.json` — `openai-compat` 提供者，金鑰透過 `$OMNIROUTE_API_KEY` 提供                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 兩者       |
| `omniroute setup-goose`    | Goose                   | `~/.config/goose/config.yaml`（`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`）+ 輸出環境變數設定方式                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 兩者       |
| `omniroute setup-aider`    | Aider                   | `~/.aider.conf.yml`（`openai-api-base` + `model: openai/<id>`）+ 輸出環境變數設定方式                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 兩者       |
| `omniroute setup-qwen`     | Qwen Code               | `~/.qwen/settings.json` — V4 `modelProviders.openai` 陣列 + `~/.qwen/.env` 中的 `OMNIROUTE_API_KEY`                                                        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | 兩者       |
| `omniroute setup-5dive`    | 5dive（代理程式叢集）   | 不在 `$HOME` 下寫入任何內容 — 透過 `5dive agent auth set` 寫入 5dive **驗證設定檔**（`/var/lib/5dive/auth-profiles/<name>/`）；僅限 root，於叢集主機上執行 | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | 兩者       |
| `omniroute run <target>`   | 執行階段啟動（通用）    | 不寫入任何內容 — 使用正確的環境變數和引數啟動 `claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`；Qwen 和 Gemini 使用暫時的隔離主目錄             | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | 兩者       |
| `omniroute launch`         | Claude Code             | 不寫入任何內容 — 注入 `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN` 後啟動 `claude`                                                                          | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | 兩者       |
| `omniroute launch-codex`   | OpenAI Codex CLI        | 不寫入任何內容 — 透過 `-c` 旗標注入 `omniroute` 提供者後啟動 `codex`                                                                                       | `--remote` `--api-key` `--profile`（`-p`）`--port`                                                                                         | 兩者       |

旗標注意事項（已在命令原始碼中驗證）：

- `--remote <url>` — 從遠端 OmniRoute 擷取目錄（會覆寫 `--port`
  與作用中的內容）。`--api-key <key>` 提供該伺服器的憑證
  （預設使用 `OMNIROUTE_API_KEY` 環境變數，或作用中內容的權杖）。
- `--only <patterns>` — 以逗號分隔的子字串；僅保留相符的模型 ID
  （例如 `--only glm,kimi`）。適用於 `setup-codex`、`setup-claude`、
  `setup-opencode`、`setup-continue`、`setup-cursor`、`setup-crush`。
- `--dry-run` — 精確印出將寫入的內容，但不會變更檔案系統。
  適用於所有 `setup-*` 命令，**但不包括** `setup-cursor`
  （該命令本來就不會寫入檔案）。
- `--model <id>` — 對於無法自動探索模型的工具，此選項為必要項目
  （或以互動方式選取）：Cline、Kilo、Roo、Goose、Qwen、Aider、5dive。
  這些工具也接受 `--yes` 以進行非互動式執行（此時必須提供 `--model`）。
  `setup-opencode` 接受 `--model`，以設定預設的頂層模型。
- `omniroute run` 上的 `--model <id>` 會遵循資訊清單中各目標的連接方式
  （`bin/cli/cli-manifest.mjs`）：**aider** 會收到 `--model openai/<id>`，
  **opencode** 會收到 `--model omniroute/<id>`（僅在 id 尚未包含該前綴時
  才加入）；**qwen** 與 **gemini** 會原樣收到 id；**claude** 會透過
  `ANTHROPIC_MODEL` 取得，**goose** 會透過 `GOOSE_MODEL` 取得，而
  **codex** 則透過 `-c model_providers.omniroute.*` 引數取得。
  **Qwen 是唯一強制要求 `--model` 的執行目標** — 未提供該選項的
  `omniroute run qwen` 會顯示明確錯誤並以 `2` 結束。
- `--port <port>` — 本機 OmniRoute 連接埠（預設為 `20128`；設定
  `--remote` 時會忽略）。所有 `setup-*` 與兩個啟動器都支援此選項。
- `omniroute run` 結束代碼：子 CLI 自身的結束代碼會原樣傳遞；
  `2` = 引數無效（不支援的目標、缺少必要的 `--model`、容器防護）；
  `127` = `PATH` 中不存在目標二進位檔；由 `SIGINT`/`SIGTERM`/`SIGHUP`
  終止啟動時為 `130`/`143`/`129`；`1` = 其他執行階段啟動失敗。
- 兩個啟動器（`launch`、`launch-codex`）接受 `--profile <name>`，
  用來選取由 `setup-claude` / `setup-codex` 寫入的設定檔，並可將引數
  直接傳遞給底層的 `claude` / `codex` 二進位檔。

設定配方也共用互動式選擇器：

```bash
# 從作用中的本機或遠端模型目錄中選取，並設定目標。
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` 目前會委派給已測試的 `codex`、`claude`、
`opencode`、`qwen`、`aider`、`goose`、`cline`、`continue`、`kilo`
與 `5dive` 配方。僅供 IDE 使用、MITM 及僅供指南使用的目錄項目，
仍採用明確的 `setup-*`／手動流程，且不會顯示為可啟動的目標。

> `setup-opencode` 是**輕量級、與 OpenAI 相容**的 OpenCode 整合。
> 另有功能更豐富的外掛程式整合 — `omniroute setup opencode` —
> 會安裝 `@omniroute/opencode-plugin`。這些是不同的命令；上表記錄的是
> `setup-opencode`。
>
> 此外掛程式分為兩個套件，分別對應一個 OpenCode 主要版本，因為兩個
> 載入器預期不同的進入點：
> OpenCode v1 使用 `@omniroute/opencode-plugin`，
> OpenCode v2 使用 `@omniroute/opencode-plugin-v2`。v2 套件是新增的
> （`0.1.0`），並遵循仍在變動中的主機合約，因此它會讀取 OpenCode
> 植入目錄草稿的結構，而不會預先假定其形式。若要安裝，請在
> `opencode.json` 中新增 `plugins` 項目；`omniroute setup opencode`
> 仍會安裝 v1 套件。選項與憑證查詢順序記載於套件 README。

---

## 本機使用方式

當 OmniRoute 在 `localhost:20128` 上執行時，只需為您的工具執行設定命令。模型目錄會從本機伺服器擷取。

```bash
# Codex：將每個相符模型的設定檔寫入 ~/.codex/
omniroute setup-codex
codex --profile glm52            # 使用產生的設定檔

# Claude Code：寫入各模型的設定檔，然後啟動其中一個
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode：寫入包含模型目錄中所有模型、與 openai 相容的提供者
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # 透過 {env:OMNIROUTE_API_KEY} 參照，絕不寫入磁碟
opencode -m omniroute/glm/glm-5.2 "..."

# 不支援自動探索的工具需要明確指定模型：
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# 預覽而不寫入任何內容：
omniroute setup-continue --dry-run
```

完全不寫入任何設定即可啟動（僅注入環境變數）：

```bash
omniroute launch                 # Claude Code → 本機 OmniRoute
omniroute launch-codex           # Codex CLI → 本機 OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# 明確指定命令路徑：原樣傳遞 -- 之後的所有內容
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## 遠端使用方式

使用 `--remote` + `--api-key` 將任何設定命令指向遠端 OmniRoute。模型目錄會從遠端擷取；設定則會寫入您的本機電腦。

```bash
# 對遠端 VPS 使用 OpenCode，僅保留 glm/kimi 模型
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # 請先匯出 OMNIROUTE_API_KEY

# 從遠端模型目錄建立 Codex 設定檔
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# 直接針對遠端啟動 CLI
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

無須每次都傳入 `--remote`/`--api-key`，您可以登入一次，讓**作用中的情境**自動提供這些參數：

```bash
omniroute connect 192.168.0.15        # 簽發具有限定範圍的權杖，並儲存情境
omniroute setup-codex                 # ← 現在會使用遠端模型目錄
omniroute setup-opencode              # ← 同上
omniroute launch                      # ← Claude Code 連線至遠端
```

如需瞭解情境、範圍與權杖管理，請參閱[遠端模式](./REMOTE-MODE.md)。

---

## 5dive 代理程式叢集

[5dive](https://5dive.ai) 執行由長時間運作的程式設計代理程式所組成的叢集，每個代理程式皆是在其各自 Unix 使用者帳號下執行的 systemd 單元。它本身並不是程式設計 CLI，因此 `omniroute run` 沒有任何可啟動的項目——`5dive` 是一個**僅供設定**的目標。

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

這兩種形式都會寫入一個 5dive **驗證設定檔**，此後綁定至該設定檔的每個 `claude` 席位都會與 OmniRoute 通訊。此目標有三項特殊之處：

- **它會以 root 身分在叢集主機上執行。** 5dive 的動作會操作本機 systemd 單元與由 root 擁有的狀態目錄；不支援遠端模式。當程序尚未以 root 身分執行時，此方案會透過 `sudo` 重新執行自身（`--no-sudo` 會停用此行為，改為印出命令）。
- **除非端點是回環位址，否則必須使用 `https://`。** 代理程式的 API 金鑰會隨每個請求透過該 URL 傳送，而 5dive 會拒絕未加密的外部端點。私人 LAN 位址也不例外。
- **每個席位自身固定的模型優先於設定檔。** 設定檔包含 `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL`，但仍固定至原廠模型 ID 的席位會在第一次互動時失敗，並顯示 _"所選模型發生問題"_。請傳入 `--agent <name>`（可重複指定）以一併固定席位；若未指定，方案會印出相關命令。

API 金鑰會透過 **stdin**（`--api-key=-`）交給 5dive，因此絕不會出現在 `ps` 輸出中。

將設定檔指向 OmniRoute **組合**而非單一模型，即可讓叢集獲得提供者容錯移轉能力：在
[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) 所記錄的執行過程中，主要端點在互動途中完全中斷後，代理程式仍透過備援端點完成其餘步驟，且未將中斷情況呈現給使用者。

---

## Base URL 慣例（哪些工具需要 `/v1`）

OmniRoute 在 `/v1` 提供 OpenAI 介面、在根路徑提供 Anthropic 介面，
並在 `/v1beta` 提供原生 Gemini 介面。每項整合都會依照其工具預期的形式進行設定
（已在命令原始碼中驗證）：

| 整合                                                                       | 寫入的 Base URL | `/v1`？                                    |
| -------------------------------------------------------------------------- | --------------- | ------------------------------------------ |
| `setup-cline` (`openAiBaseUrl`)                                            | 根路徑          | 否 — Cline 會附加 `/v1/chat/completions`   |
| `setup-goose` (`OPENAI_HOST`)                                              | 根路徑          | 否 — Goose 會附加路徑                      |
| `setup-aider` (`OPENAI_API_BASE`)                                          | 根路徑          | 否 — LiteLLM 會附加 `/v1/chat/completions` |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | 包含 `/v1`      | 是                                         |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | 根路徑          | 否 — Claude Code 會附加 `/v1/messages`     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | 包含 `/v1`      | 是                                         |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | 包含 `/v1`      | 是                                         |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | 根路徑          | 否 — SDK 會附加 `/v1beta/models/…`         |
| `setup-5dive`（驗證設定檔中的 `ANTHROPIC_BASE_URL`）                       | 根路徑          | 否 — Claude Code 會附加 `/v1/messages`     |

---

## 更新時保留原生相依套件：`--include=optional`

當您使用 `omniroute update` 進行更新時（確認後，或搭配 `--apply`），
OmniRoute 執行安裝時會內建使用 `--include=optional`：

```bash
npm install -g omniroute@latest --include=optional
```

這**不是**您需要傳給 `omniroute update` 的旗標，而是更新程式一律會套用的選項。
它可確保即使您的 npm 設定中已設置 `omit=optional`，`optionalDependencies`
（`better-sqlite3`、`keytar`、`tls-client`、LLMLingua SLM 堆疊）仍會在更新後保留；
否則，原生 SQLite 驅動程式與作業系統鑰匙圈繫結可能會在無提示的情況下遭到移除。
若要預覽確切命令而不實際套用：

```bash
omniroute update --dry-run
# [試執行] 將會執行：npm install -g omniroute@latest --include=optional
```

其他 `omniroute update` 旗標（已在原始碼中驗證）：`--check`（若已過期則以狀態碼 1
結束）、`--apply`（不提示直接安裝）、`--changelog`、`--no-backup`、
`--yes`。

---

## 透過 `omniroute run gemini` 使用 Google Gemini CLI

已針對 `@google/gemini-cli` 0.50.0 驗證契約：該 CLI 會遵循
`GOOGLE_GEMINI_BASE_URL`，並向其發出 `POST /v1beta/models/<model>:generateContent`
（以及 `:streamGenerateContent?alt=sse`）請求——這正是 OmniRoute 的原生
Gemini 介面（`/v1beta`）。`omniroute run gemini` 會自動完成以下設定：

- `GOOGLE_GEMINI_BASE_URL` → 目前啟用的 OmniRoute Base URL（根路徑，不含 `/v1`）；
- `GEMINI_API_KEY` → 解析後的 OmniRoute 憑證（選項／環境變數／情境）；
- 一個**暫時且隔離的 `GEMINI_CLI_HOME`**，其 `.gemini/settings.json`
  會選用 `gemini-api-key` 驗證，確保已儲存的 Google OAuth 工作階段（Code Assist）
  絕不會覆寫導向 OmniRoute 的啟動設定——結束後會予以移除；
- **環境變數清理**：子程序環境會移除 `GOOGLE_API_KEY`、
  `GOOGLE_GENAI_USE_VERTEXAI` 與 `GOOGLE_GENAI_USE_GCA`（這些變數會將驗證
  重新導向 Vertex/Code Assist），並將 `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key`
  設為多一層保障的備援設定——其他 `run` 目標也會針對各自衝突的變數接受相同處理；
- 從 `--provider`／`--model` 注入 `--model <id>`。

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini 的工作區信任防護在無介面模式下仍然適用——請自行傳入
`--skip-trust`（或以互動方式信任該目錄）；啟動器刻意不繞過此防護。
此啟動器不同於 **ACP 註冊**（`src/lib/acp/registry.ts`、`gemini --acp`），後者仍是
`/dashboard/acp-agents` 的代理程式通訊協定整合。

---

## 真實冒煙掃描（選擇性啟用）

確定性的啟動計畫迴歸測試會在 CI 中執行（`tests/unit/cli/run-command.test.ts`、
`tests/unit/cli/run-execution.test.ts`）。若要使用真實的 OmniRoute 伺服器驗證真實的二進位檔，可選擇性啟用位於
`tests/integration/upstream-cli-smoke.int.test.ts` 的測試框架。它絕不會自動執行
（除非設定 `RUN_CLI_SMOKE=1`，否則每個子測試都會略過）、透過環境變數名稱
（絕不透過值）傳遞憑證、從任何記錄的輸出中遮蔽看似金鑰的字串、略過
未安裝二進位檔的目標，並將失敗分類為
驗證 / 上游 / 設定，而非單純的布林值：

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

選用：`OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` 可限制掃描範圍；
`OMNIROUTE_SMOKE_TIMEOUT_MS` 可覆寫每個目標 120 秒的逾時設定。

---

## 另請參閱

- [Claude Code 設定](./CLAUDE-CODE-CONFIGURATION.md) — 更深入的 Claude Code 指南
- [Codex CLI 設定](./CODEX-CLI-CONFIGURATION.md) — 一次性的 `[model_providers.omniroute]` 基礎設定
- [遠端模式](./REMOTE-MODE.md) — 上下文、具範圍限制的存取權杖，以及操作遠端伺服器
- [CLI 工具參考](../reference/CLI-TOOLS.md) — 支援工具與儀表板頁面的完整目錄
- [設定指南](./SETUP_GUIDE.md) — 安裝方法與首次執行的導覽流程
