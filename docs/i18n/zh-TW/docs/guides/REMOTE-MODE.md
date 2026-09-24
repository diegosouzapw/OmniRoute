# Remote Mode (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md)

---

在您的筆記型電腦上執行 `omniroute` CLI，而 OmniRoute 本身則執行於其他位置
（VPS、家用伺服器，或 Tailnet 上的另一台機器）。您只需透過
`omniroute connect` 登入一次，之後的**每一個** CLI 命令都會以該遠端
伺服器為目標——命令相同、輸出相同，只是在遠端執行。

無須安裝第二套工具：遠端模式就是一般的 `omniroute` CLI
搭配限定範圍的**存取權杖**。

```bash
npm install -g omniroute                 # 一般的 CLI
omniroute connect 192.168.0.15           # 登入（密碼 → 限定範圍的權杖）
omniroute models list                    # ← 現在會列出遠端伺服器的模型
omniroute configure codex                # ← 根據遠端目錄寫入本機 Codex 設定檔
```

---

## 運作方式

```
您的筆記型電腦                          遠端 OmniRoute（VPS）
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  （密碼 → 權杖）             │
│  context: vps      │ ───────────────►  │ 簽發限定範圍的存取權杖           │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ 每個管理路由都會依權杖範圍        │
│ 在本機寫入設定      │ ◄───────────────  │ 進行檢查                        │
│                    │                   └───────────────────────────────┘
└────────────────────┘
```

- **內容環境**各自儲存一部伺服器的資訊（`~/.omniroute/config.json`、`chmod 600`）。
  `omniroute contexts use <name>` 可切換作用中的伺服器；`default` 代表本機。
- **存取權杖**（`oma_live_…`）用於授權管理命令。它們與推論 API 金鑰
  （`sk-…`，用於 `/v1/chat/completions`）不同。
- 伺服器端只會儲存權杖的 SHA-256 雜湊。明文只會在建立時顯示
  **一次**。

---

## 連線

### 使用管理密碼（初始設定）

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128 的管理密碼：********
# ✔ 已連線至 http://192.168.0.15:20128 — 內容環境 '192.168.0.15'（範圍：admin）
```

密碼流程預設會簽發 **admin** 權杖（您持有密碼，因此
已具備完整控制權）。可使用 `--scope` 縮小權限範圍：

```bash
omniroute connect 192.168.0.15 --scope write
```

選項：`--port <p>`（當主機未指定連接埠時）、`--name <ctx>`（內容環境名稱）、
`--scope read|write|admin`。完整 URL 會依原樣使用：
`omniroute connect https://omni.example.com`。

### 使用預先產生的權杖

在儀表板中產生限定範圍的權杖（或使用 `omniroute tokens create`），然後
貼上即可——不需要密碼：

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI 會透過 `GET /api/cli/whoami` 驗證權杖，並將其儲存為作用中的內容環境。

---

## 權限範圍

共有三個階層式等級（`admin ⊃ write ⊃ read`）：

| 權限範圍 | 可執行的操作                                                               |
| -------- | -------------------------------------------------------------------------- |
| `read`   | 列出／檢視——`models list`、`providers status`、`logs`、`usage`、`cost`     |
| `write`  | read **加上**設定／套用——`setup-codex`、`keys add`、`config set`、組合功能 |
| `admin`  | write **加上**管理——`tokens` CRUD、新增提供者、服務、原則、oauth           |

伺服器會根據 HTTP 方法推斷每個路由所需的權限範圍
（`GET`→read、變更操作→write），並針對敏感介面套用 admin 允許清單
（`/api/cli/tokens`、`/api/providers` 變更操作、`/api/oauth`、`/api/services`、……）。
權限範圍不足的權杖會收到 `403`，並附上清楚的訊息。

> 會啟動程序的路由（`/api/services/*`、`/api/mcp/*`、……）仍然
> **僅限迴環位址**——無論權限範圍為何，遠端權杖都永遠無法存取這些路由。

---

## 在遠端安裝環境中連線 Antigravity

Antigravity 使用 Google 的第一方／原生應用程式同意畫面。只有在**核准登入的瀏覽器能夠連線至迴送重新導向位址**
（`http://127.0.0.1:<port>/callback`）時，Google 才會
發放授權碼。在遠端 VPS 安裝環境中，該迴送位址位於伺服器上，
而不是您的機器上，因此同意畫面會**永遠卡住，且絕不會
產生授權碼**——一般的「貼上回呼 URL」備援方式沒有任何內容可
貼上。（這是 Google 端的限制：任何使用內建 Antigravity 桌面用戶端
的代理都會發生相同的卡住情況，並非只有 OmniRoute。）

儀表板會在您卡住前偵測到此情況：從非 localhost 位址開啟 **Providers → Antigravity →
Connect** 時，原本通用的「複製回呼 URL」提示會替換為以下兩種解決方法，
其中已預先填入您的主機與連接埠。
（LAN 位址也算在內——就此回呼而言，`192.168.x.x` 並不是 localhost。）

有兩種支援的方法可將 Antigravity 連線至遠端 OmniRoute。

### 選項 A——本機登入輔助程式（建議）

請在**您自己的電腦**上執行 OAuth，因為該處可以連線至 `127.0.0.1`。輔助程式
會直接與 Google 通訊，因此能在儀表板版本無法完成同意流程的地方
完成該流程。

**如果您已連線**（`omniroute connect <host>`），便不需要複製
任何內容——輔助程式會替您將憑證傳送至該安裝環境：

```bash
# 在您的本機上（需要 Node.js 與瀏覽器）：
omniroute connect 192.168.0.15        # 僅需一次——產生具管理員範圍的內容權杖
npx omniroute login antigravity
#   ↳ 開啟 Google 同意畫面、在本機迴送連接埠擷取回呼、
#     交換憑證，並將憑證 POST 至作用中的內容：
#
#   Antigravity 已連線至 http://192.168.0.15:20128（連線 abc123）。
#   不需要貼上任何內容——您可以關閉此終端機。
```

只要作用中的內容指向另一部機器，就會自動推送。
可使用 `--push` / `--no-push` 強制指定是否推送，或使用
`--context <name>` 指定特定內容。

**如果您的機器無法連線至 VPS**（受防火牆阻擋、沒有 SSH、實體隔離的工作環境），
輔助程式仍然可以運作——它實際上只_需要_ Google。請使用 `--no-push`，或直接讓
推送失敗：它會改為列印憑證資料，而不是捨棄您已完成的
授權。

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

然後在**遠端**儀表板中前往：**Providers → Antigravity → Connect**，並將
`omniroute-cred-v1.…` 憑證資料貼入 **Step 2** 欄位（該欄位接受
回呼 URL 或憑證資料）。OmniRoute 會解碼該資料、在伺服器端執行 Cloud Code
引導設定，並保存連線。

> 該憑證資料包含重新整理權杖——請像保護密碼一樣保護它。使用推送流程時，它會
> 透過您內容的已驗證連線傳送一次；使用貼上流程時，則透過
> 您的儀表板連線傳送。無論哪種方式，儲存時都會加密，而且
> 推送成功後絕不會將其列印至您的終端機。

旗標：`--no-browser`（列印 URL，而不是自動開啟）、`--port <n>`
（固定迴送連接埠）、`--timeout <ms>`、`--push` / `--no-push`（覆寫
自動傳送行為）、`--context <name>`（以特定內容為目標）。

### 選項 B——SSH 本機轉送通道

如果您具有 VPS 的 SSH 存取權限，請轉送儀表板連接埠，使
迴送回呼能夠透過通道重新到達伺服器：

```bash
# 在您的本機上：
ssh -L 20128:127.0.0.1:20128 user@your-vps
# 接著在您的本機瀏覽器中開啟 http://localhost:20128，並正常連線 Antigravity
# ——現在 127.0.0.1:20128/callback 重新導向會透過 SSH 到達 VPS。
```

由於您是透過 `localhost:20128` 存取儀表板，因此 Google 同意流程
能夠完成，而回呼也會透過相同通道傳送至伺服器——
不需要憑證資料。請保持通道開啟，直到連線顯示為作用中。

不同於下方使用固定迴送位址的提供者，這裡**只需要一個轉送**：
Antigravity 回呼使用的就是儀表板連接埠，因此不需要轉送第二個
提供者專用連接埠。

> 完全無頭的替代方案（不使用輔助程式或通道）是設定您**自己的**
> Google OAuth 網頁憑證與公開基底 URL；請參閱該提供者的 OAuth
> 環境變數。上述兩個選項都不需要額外設定 Google。

---

## 在遠端安裝環境中連線 Codex / Grok（固定迴環位址提供者）

Codex、xAI (`xai-oauth`) 與 Grok CLI (`grok-cli`) 會向其上游 OAuth 應用程式註冊一個**固定的**迴環
`redirect_uri`。OmniRoute 無法變更它——提供者一律會將瀏覽器重新導向至相同的硬編碼位址：

| 提供者      | 提供者重新導向至的固定回呼位址        |
| ----------- | ------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback` |
| `xai-oauth` | `http://127.0.0.1:56121/callback`     |
| `grok-cli`  | `http://127.0.0.1:56122/callback`     |

此處的 `localhost` 指的是**執行瀏覽器的機器**，而 OmniRoute 的 PKCE
回呼伺服器則監聽於**伺服器的**迴環介面。若透過像 `http://192.168.0.15:20128`
這樣的 LAN 位址開啟儀表板，兩者便永遠無法連通：授權碼會被傳送至您自己筆記型電腦的
`localhost:1455`，但該處沒有任何程式正在監聽，因此提供者會讓登入失敗，且不顯示任何錯誤。

儀表板會在開啟彈出視窗前偵測到此情況，並顯示通道命令，而不是讓登入靜默失敗
(#8046)。

### 修正方式——轉送**兩個**連接埠

```bash
# 在執行瀏覽器的機器上：
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# 然後瀏覽至 http://localhost:20128，並從該處連線 Codex
```

必須設定兩個轉送，只轉送其中一個仍會失敗：

- **`20128`**（儀表板連接埠）會讓來源成為真正的 localhost，這正是
  讓 OmniRoute 啟動 PKCE 回呼伺服器的必要條件——LAN 來源永遠不會
  進入該分支。
- **`1455`**（提供者的固定回呼連接埠）是瀏覽器被重新導向返回的位置；
  它必須透過通道連至伺服器的迴環介面。

連線 xAI 或 Grok CLI 時，請將 `1455` 替換為 `56121`/`56122`，並將 `20128`
替換為您實際使用的儀表板連接埠。請保持通道開啟，直到連線顯示為
作用中。

> **沒有 SSH 存取權限？** Codex 與 Grok CLI 也接受貼上的權杖——連線對話方塊中的
> **貼上 API 金鑰** / **匯入 auth.json** 分頁。此方式沒有迴環
> 回呼，因此可從任何來源使用。Codex 另外也接受純存取
> 權杖或 `~/.codex/auth.json` 工作階段資料。

---

## 管理權杖

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ 只顯示一次密鑰——請立即複製
omniroute tokens list                 # 已遮罩：id、名稱、範圍、前綴、狀態、到期時間
omniroute tokens revoke <id|prefix>   # 立即撤銷
omniroute tokens scopes               # 說明三種範圍
```

`tokens` 命令需要 **admin** 憑證。您也可以在儀表板的
**設定 → 存取權杖**中管理權杖（建立、撤銷、僅可複製一次）。

---

## 從遠端目錄設定程式設計 CLI

`omniroute configure` 會讀取**作用中伺服器的**即時模型目錄，並在
**您的**機器上寫入設定。

```bash
omniroute configure codex
#   提供者：glm、kmc、ollamacloud、opencode-go、…
#   提供者：glm
#   模型 id：glm/glm-5.2
#   ✔ 已寫入 ~/.codex/glm52.config.toml
#   使用方式：codex --profile glm52

# 非互動模式
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# 將常用模型保留在互動式選擇器頂端
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

選擇器只會將模型 ID（絕不包含 URL 或憑證）保存在本機
`model-preferences.json` 檔案中，並依情境與 CLI 目標劃分。收藏項目會顯示在
最近選擇之前；使用 `--unfavorite` 可從該情境／目標清單中移除所選模型。

寫入的設定檔會透過環境變數參照推論金鑰
(`OMNIROUTE_API_KEY`)——密鑰絕不會寫入磁碟。關於一次性的
Codex 基礎設定（`[model_providers.omniroute]` 區塊），請參閱
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md)。

### 啟動 CLI 以連線遠端（不寫入設定）

`omniroute run <target>` 也會遵循作用中的情境：遠端基礎 URL
與情境憑證只會注入至產生的程序中。

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → 遠端
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# 精確預覽將產生的內容（僅顯示環境變數金鑰名稱，絕不顯示值）：
omniroute run codex --dry-run --json
```

目標：`claude`、`codex`、`aider`、`goose`、`opencode`、`qwen`、`gemini`
（單一來源：`bin/cli/cli-manifest.mjs`）。Qwen 與 Gemini 會使用
暫時且隔離的主目錄執行，該目錄會在結束時移除，因此啟動程序絕不會更動——
或洩漏至——您的個人工具設定。

### 各 CLI 的設定命令

每個受支援的 CLI 都有可感知遠端環境的設定命令（全都會遵循作用中的
情境，或使用 `--remote <url> --api-key <key>`）：

| CLI         | 指令                       | 寫入內容                                                                                                                                                     |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` 設定檔（每個模型各一份）                                                                                                       |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json`（每個模型各一份）                                                                                                  |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — 包含目錄中所有模型的 `omniroute` OpenAI 相容提供者（執行 `opencode -m omniroute/<model>`）                              |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json`（CLI 模式）+ 印出要貼上的 VS Code 擴充功能設定（OpenAI 相容，Base URL **不含** `/v1`）                            |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json`（CLI）+ VS Code `kilocode.*` 設定 — OpenAI 相容，Base URL **包含** `/v1`                                                     |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml`（VS Code/JetBrains + `cn` CLI）— `provider: openai`、`apiBase` **包含** `/v1`，金鑰透過 `${{ secrets.OMNIROUTE_API_KEY }}` 提供    |
| Cursor      | `omniroute setup-cursor`   | 印出應用程式內的操作步驟（Settings → Models → Override OpenAI Base URL **包含** `/v1` + 金鑰 + 模型）。Cursor 設定儲存在不透明的 SQLite 中 — 僅限聊天面板    |
| Roo Code    | `omniroute setup-roo`      | 寫入 Roo 匯入用 JSON（`~/.omniroute/roo-settings.json`）+ 設定 `roo-cline.autoImportSettingsPath` + 印出 UI 操作步驟（OpenAI 相容，Base URL **包含** `/v1`） |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` 提供者，`base_url` **包含** `/v1`，金鑰透過 `$OMNIROUTE_API_KEY` 提供                                         |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml`（`GOOSE_PROVIDER=openai` + `OPENAI_HOST` **不含** `/v1` + `GOOSE_MODEL`）+ 環境變數設定方式                                    |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml`（`openai-api-base` **不含** `/v1` + `model: openai/<id>`）+ 環境變數設定方式（`aider --message --yes`）                                  |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` V4 的 `modelProviders.openai` 項目 + `~/.qwen/.env` 中的 `OMNIROUTE_API_KEY`                                                         |

```bash
# OpenCode（OpenAI 相容提供者、所有目錄模型、遠端 VPS）
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # 僅保留相符的模型
opencode -m omniroute/glm/glm-5.2 "..."          # 請先匯出 OMNIROUTE_API_KEY
```

> OpenCode 也提供功能更豐富的**外掛程式**整合：`omniroute setup opencode`
> （現在可透過 `--remote` 支援遠端）會安裝 `@omniroute/opencode-plugin`。
> `setup-opencode` 是輕量級的 OpenAI 相容替代方案。API 金鑰會透過 `{env:OMNIROUTE_API_KEY}` 參照 — 絕不寫入磁碟。
>
> 在 OpenCode v2 上，請改用 `@omniroute/opencode-plugin-v2`：使用相同的目錄，
> 但載入器合約不同。連接整合後，它會從 OpenCode 自己的認證
> 儲存區讀取金鑰，因此遠端閘道完全不需要在
> `opencode.json` 中設定金鑰。

---

## 管理內容（切換伺服器）

**內容**（context）是已儲存的伺服器設定（baseUrl + 憑證 + 範圍）。`omniroute connect`
會建立一個內容並將其設為作用中；此後，每個命令都會以該內容為目標。使用
`omniroute contexts` 管理及切換內容：

```bash
omniroute contexts list            # 所有內容；作用中的內容會標示 ●
omniroute contexts current         # 作用中的伺服器、驗證狀態、範圍
```

```text
  | 名稱    | 基礎 URL                  | 驗證  | 範圍  | 說明
● | vps     | http://100.67.86.91:20128 | token | admin | 遠端 OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**切換伺服器** — 之後的每個命令都會跟隨作用中的內容：

```bash
omniroute contexts use vps         # → 現在所有命令都會送至遠端 VPS
omniroute tokens list              #   （針對 VPS 執行）

omniroute contexts use default     # → 返回 localhost
omniroute tokens list              #   （針對本機伺服器執行）
```

**手動新增內容**（而非使用 `connect`）、檢視或重新命名：

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # 顯示單一內容的完整詳細資料
omniroute contexts rename staging stg
```

**移除內容** — 系統會提示確認；傳入 `--yes` 可略過確認
（指令碼／非互動式 shell 必須使用，否則會為安全起見拒絕執行）：

```bash
omniroute contexts remove stg --yes
```

> `default`（localhost）無法移除。移除作用中的內容時，會退回
> `default`。提示：移除內容只會刪除**本機**儲存的憑證 —
> 若要實際撤銷存取權，請在伺服器上使用 `omniroute tokens revoke <id>` 撤銷權杖。

**匯出／匯入**內容（例如，在不同機器之間移動內容）。新內容只會保留
金鑰鏈參照；當作業系統金鑰鏈可用時，憑證不會複製到匯出檔案中：

```bash
omniroute contexts export --out contexts.json     # 預設：stdout
omniroute contexts import contexts.json            # 覆寫；使用 --merge 保留現有內容
omniroute contexts migrate --yes                  # 將舊版純文字權杖移至金鑰鏈
```

在沒有可用作業系統金鑰鏈的無頭系統上，CLI 會退回使用權限模式為
`0600` 的 `config.json`，並顯示一次性警告。請將此備援方式產生的匯出檔案
（以及遷移前的任何舊版設定）視為機密資料。

---

## 快速端對端檢查

以下是可複製貼上的完整生命週期，用於從頭驗證遠端設定 — 連線、建立
具範圍限制的權杖、將命令路由至遠端、切換回本機，然後清除設定。請將
`192.168.0.15` 替換為伺服器的主機名稱/IP（Tailscale、LAN 或公開的
`https://…` URL）。

```bash
# 1. 連線（密碼 → admin 權杖，儲存為內容並設為作用中）
omniroute connect 192.168.0.15                 # 或：--key oma_live_xxxx（不使用密碼）
omniroute contexts current                     # 顯示遠端伺服器 + 範圍

# 2. 使用它 — 管理命令現在會針對遠端執行
omniroute tokens create --name laptop --scope read   # 建立範圍較窄的權杖
omniroute tokens list                                 # 來自遠端、經遮蔽的清單

# 3. 來回切換
omniroute contexts use default                 # → 本機
omniroute contexts use 192-168-0-15            # → 再次切換至遠端（名稱取自 `contexts list`）

# 4. 清除。注意：`contexts remove` 只會刪除本機憑證 —
#    它不會撤銷伺服器上的權杖。如果想實際撤銷存取權，
#    請先在伺服器端撤銷。
omniroute tokens revoke <id|prefix>            # 撤銷伺服器上的存取權
omniroute contexts remove 192-168-0-15 --yes   # 刪除本機內容（即使為作用中 → 仍會退回 default），不顯示提示
```

> `--yes` 會讓 `contexts remove` 以非互動方式執行（指令碼/CI 必須使用；若未使用，
> 非互動式 shell 會為安全起見拒絕執行，而不會停滯）。移除
> **作用中**的內容時，會自動退回 `default`。

---

## 安全性注意事項

- 權杖的純文字只會顯示一次；系統僅會持久保存 SHA-256 雜湊（與 API 金鑰相同）。
- `omniroute connect` 會沿用登入暴力破解鎖定機制與稽核日誌記錄。
- 傳輸時建議使用 HTTPS 或 Tailnet；僅指定主機時，為方便 LAN/Tailscale 使用，預設會採用 `http://`
  ——若要使用 TLS，請傳入完整的 `https://…` URL。
- 建議使用的本機內容檔案為 `~/.omniroute/config.json`（`chmod 600`），
  其中僅包含 `credentialRef`；權杖本身儲存在作業系統的
  金鑰鏈（`keytar`）中，且絕不會列印在日誌裡。若無法使用原生
  金鑰鏈，無周邊裝置安裝會明確改用相同的 `0600` 檔案作為後備方案，
  並發出一次警告。安裝金鑰鏈後端後，請使用
  `omniroute contexts migrate --yes`。

---

## API 端點（參考）

| 方法   | 路由                  | 驗證方式 | 權限範圍              |
| ------ | --------------------- | -------- | --------------------- |
| POST   | `/api/cli/connect`    | 管理密碼 | —（公開，受密碼保護） |
| GET    | `/api/cli/whoami`     | 存取權杖 | 讀取                  |
| GET    | `/api/cli/tokens`     | 存取權杖 | 管理                  |
| POST   | `/api/cli/tokens`     | 存取權杖 | 管理                  |
| DELETE | `/api/cli/tokens/:id` | 存取權杖 | 管理                  |

完整結構描述請參閱 [openapi.yaml](../openapi.yaml)。
