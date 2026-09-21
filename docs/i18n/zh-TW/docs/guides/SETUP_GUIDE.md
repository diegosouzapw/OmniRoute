# 📖 Setup Guide — OmniRoute (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute 的完整設定參考。如需快速版本，請參閱 [README 中的快速入門](../README.md#-quick-start)。

## 目錄

- [安裝方式](#install-methods)
- [CLI 工具設定](#cli-tool-configuration)
- [通訊協定設定（MCP + A2A）](#protocol-setup-mcp--a2a)
- [逾時設定](#timeout-configuration)
- [分離連接埠模式](#split-port-mode)
- [Void Linux（xbps-src）](#void-linux-xbps-src-template)
- [解除安裝](#uninstalling)

---

## 安裝方式

### npm（建議）

```bash
npm install -g omniroute
omniroute
```

儀表板會在 `http://localhost:20128` 開啟，API 基礎 URL 為 `http://localhost:20128/v1`。

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm 使用者：**必須使用 `--allow-build` 旗標，才能啟用 `better-sqlite3` 和 `@swc/core` 的原生建置指令碼。pnpm v11 不支援對全域安裝使用 `pnpm approve-builds -g` 命令。

### Arch Linux（AUR）

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR 套件](https://aur.archlinux.org/packages/omniroute-bin)會安裝 OmniRoute，並提供 systemd 使用者服務。

### 從原始碼安裝

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows 注意事項：**根據預設，若舊版 `%USERPROFILE%\.omniroute` 目錄不存在，OmniRoute 會使用 `%APPDATA%\omniroute`。設定 `DATA_DIR` 即可選擇不同的資料目錄位置。

> **注意：**首次執行時，`npm install` 會從 `.env.example` 自動產生 `.env`。後續安裝不會覆寫現有的 `.env`，因此自訂設定會獲得保留。如需重新建立，請先刪除 `.env`，再重新執行。

### Docker

如需完整的 Docker 設定方式，包括 Compose 設定檔與 Caddy HTTPS，請參閱 [Docker 指南](./DOCKER_GUIDE.md)。

### 桌面應用程式（Electron）

OmniRoute 隨附以 Electron 41 + electron-builder 26.10 建置的桌面包裝程式。可用的指令碼（工作區根目錄）：

```bash
npm run electron:dev          # 使用熱重新載入執行桌面應用程式
npm run electron:build        # 為目前的作業系統建置（自動偵測）
npm run electron:build:win    # Windows 安裝程式（NSIS + 可攜版）
npm run electron:build:mac    # macOS（dmg + zip、arm64+x64）
npm run electron:build:linux  # Linux（AppImage + deb + rpm）
npm run electron:smoke:packaged  # 對封裝後的建置執行冒煙測試
```

桌面安裝程式的發行版本會附加至 GitHub Releases。如需完整深入瞭解 Electron（簽署、IPC 橋接、發行版），請參閱 [`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md) _（於後續階段建立）_。

### 無介面伺服器（CI／自動化）

對於無人值守的設定（Docker、Kubernetes、CI），請使用：

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

搭配環境變數（`INITIAL_PASSWORD`、`OMNIROUTE_WS_BRIDGE_SECRET` 等），即可完全透過指令碼啟動 OmniRoute 執行個體。

### CLI 選項

| 命令                    | 說明                                                   |
| ----------------------- | ------------------------------------------------------ |
| `omniroute`             | 啟動伺服器（`PORT=20128`，API 與儀表板使用相同連接埠） |
| `omniroute setup`       | 透過引導式 CLI 完成密碼與第一個提供者的初始設定        |
| `omniroute doctor`      | 在不啟動伺服器的情況下執行本機健康情況檢查             |
| `omniroute providers`   | 從 CLI 探索、列出、驗證及測試提供者                    |
| `omniroute config`      | CLI 工具設定——列出、取得、設定及驗證組態               |
| `omniroute status`      | 離線狀態儀表板——版本、DB、工具及組態                   |
| `omniroute logs`        | 從 API 串流使用情況記錄（支援 `--follow`）             |
| `omniroute update`      | 檢查或套用 OmniRoute 更新                              |
| `omniroute provider`    | 管理提供者連線——新增、列出、移除、測試及設為預設值     |
| `omniroute --port 3000` | 將標準／API 連接埠設為 3000                            |
| `omniroute --mcp`       | 啟動 MCP 伺服器（stdio 傳輸）                          |
| `omniroute --no-open`   | 不自動開啟瀏覽器                                       |
| `omniroute --help`      | 顯示說明                                               |

無介面設定可使用旗標或環境變數編寫成指令碼：

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

在不開啟儀表板的情況下執行本機診斷：

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

透過 SSH 或指令碼管理提供者，無須開啟儀表板：

```bash
omniroute providers available
omniroute providers available --search openai
omniroute providers available --category api-key
omniroute providers list
omniroute providers test <id-or-name>
omniroute providers test-all
omniroute providers validate
```

---

## CLI 工具設定

### 1) 連接提供者並建立 API 金鑰

1. 開啟儀表板 → `Providers`，並連接至少一個提供者（OAuth 或 API 金鑰）。
2. 開啟儀表板 → `Endpoints`，並建立 API 金鑰。
3. （選用）開啟儀表板 → `Combos`，並設定備援鏈。

### 2) 將程式設計工具指向服務

```txt
基礎 URL： http://localhost:20128/v1
API 金鑰： [從 Endpoint 頁面複製]
模型：     if/qwen3.8-max-preview（或任何提供者/模型前綴）
```

如果您的編輯器無法傳送 `Authorization: Bearer ...`，請改用包含權杖的相容性基礎位址：

```txt
基礎 URL： http://localhost:20128/api/v1/vscode/YOUR_KEY/
模型 URL： http://localhost:20128/api/v1/vscode/YOUR_KEY/models
聊天 URL： http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama 標籤 URL： http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

適用於 Claude Code、Codex CLI、Cursor、Cline、OpenClaw、OpenCode，以及相容 OpenAI 的 SDK。

#### 使用 `setup-*` 自動設定

無須手動貼上基礎 URL 和金鑰，讓 OmniRoute 根據即時模型目錄寫入各工具
自己的設定。每個工具使用一個命令：

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml 設定檔
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json（相容 openai）
omniroute setup-cline        # Cline CLI + VS Code 擴充功能設定
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml（Continue / cn）
omniroute setup-cursor       # 顯示 Cursor 的應用程式內操作步驟
omniroute setup-roo          # Roo Code 匯入 + autoImport 指標
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

每個命令都接受 `--remote <url> --api-key <key>`，可設定本機工具以連線至
**遠端** OmniRoute，並可使用 `--dry-run` 進行預覽。若要在完全不寫入設定的情況下，
注入正確的環境變數並啟動 CLI，請使用通用啟動器
`omniroute run <target>`（claude、codex、aider、goose、opencode、qwen、gemini）；
舊版的各工具啟動器 `omniroute launch`（Claude Code）和
`omniroute launch-codex`（Codex）仍可使用。

如需完整表格（每個命令會寫入的內容、所有旗標、本機與遠端模式、基礎 URL
`/v1` 慣例），請參閱 **[CLI 整合](./CLI-INTEGRATIONS.md)**。

如需各工具的詳細設定（Claude Code、Codex CLI、Cursor、Cline、OpenClaw、Kilo Code、Copilot 等），請參閱專門的 **[CLI 工具指南](../reference/CLI-TOOLS.md)**。

---

## 通訊協定設定（MCP + A2A）

### MCP 設定（模型上下文通訊協定）

以 stdio 模式啟動 MCP 傳輸：

```bash
omniroute --mcp
```

建議的驗證流程：

```bash
# 1. 啟動 MCP 伺服器
omniroute --mcp

# 2. 從您的 MCP 用戶端呼叫：
omniroute_get_health        # 應傳回系統健康狀態
omniroute_list_combos       # 應傳回作用中的組合

# 3. 或執行完整的 E2E 測試套件：
npm run test:protocols:e2e
```

#### MCP 用戶端設定

**Claude Code：**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline：**

新增至您的 MCP 設定：

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"],
      "env": {}
    }
  }
}
```

**完整 MCP 文件：** [MCP 伺服器 README](../../open-sse/mcp-server/README.md) — 110 個工具、IDE 設定，以及 Python/TS/Go 用戶端。

### A2A 設定（代理程式對代理程式通訊協定）

驗證 Agent Card：

```bash
curl http://localhost:20128/.well-known/agent.json
```

傳送工作：

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"請提供簡短的配額摘要。"}]}}'
```

**完整 A2A 文件：** [A2A 伺服器 README](../../src/lib/a2a/README.md) — JSON-RPC 2.0、技能、串流，以及工作生命週期。

---

## 逾時設定

### 基本逾時

對大多數部署而言，您只需要這兩個變數：

| 變數                     | 預設值                    | 用途                                                                                          |
| ------------------------ | ------------------------- | --------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                  | 上游開始回應逾時、隱藏的 Undici 逾時、TLS 指紋請求，以及 API 橋接請求／代理逾時所共用的基準值 |
| `STREAM_IDLE_TIMEOUT_MS` | 繼承 `REQUEST_TIMEOUT_MS` | 串流區塊之間允許的最大間隔；超過後 OmniRoute 將中止 SSE 串流                                  |

系統會維持向後相容性：現有的 `FETCH_TIMEOUT_MS`、`API_BRIDGE_PROXY_TIMEOUT_MS` 及其他各層級的逾時變數仍然有效，並會覆寫共用基準值。

### 提供者特定注意事項

對於與 Claude Code 相容的上游（`anthropic-compatible-cc-*`），OmniRoute 會根據解析後的擷取逾時推導出站的 `X-Stainless-Timeout` 標頭，讓提供者端的讀取逾時與您的環境設定保持一致。

對於第三方、與 Claude Code 相容的反向代理，OmniRoute 會維持較保守的預設 `anthropic-beta` 設定；當「用戶端快取控制」保留為「自動」時，只會轉送用戶端提供的 `cache_control` 標記。僅當上游明確要求經過遮蔽的 Claude 思考串流時，才啟用每個連線的「啟用 redact-thinking beta」切換選項。

### 進階逾時覆寫

| 變數                                     | 預設值                                     | 用途                                                  |
| ---------------------------------------- | ------------------------------------------ | ----------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | 繼承 `REQUEST_TIMEOUT_MS`                  | 在收到回應標頭之前所使用的上游開始回應逾時            |
| `FETCH_HEADERS_TIMEOUT_MS`               | 繼承 `FETCH_TIMEOUT_MS`                    | Undici 接收上游回應標頭的時間限制                     |
| `FETCH_BODY_TIMEOUT_MS`                  | 繼承 `FETCH_TIMEOUT_MS`                    | Undici 接收上游本文區塊之間的時間限制（`0` 表示停用） |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                    | Undici TCP 連線逾時                                   |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                     | Undici 閒置持續連線通訊端逾時                         |
| `TLS_CLIENT_TIMEOUT_MS`                  | 繼承 `FETCH_TIMEOUT_MS`                    | 透過 `wreq-js` 發出的 TLS 指紋請求逾時                |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | 繼承 `REQUEST_TIMEOUT_MS` 或 `600000`      | 從 API 連接埠將 `/v1` 代理轉送至儀表板連接埠的逾時    |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)` | API 橋接伺服器上的傳入請求逾時                        |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                    | API 橋接伺服器上的傳入標頭逾時                        |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                     | API 橋接伺服器上的持續連線逾時                        |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                        | API 橋接伺服器上的通訊端非活動逾時（`0` 表示停用）    |

> **注意：** 對於串流請求，`FETCH_TIMEOUT_MS` 僅涵蓋連線設定／等待第一個上游回應的時間。串流啟用後，OmniRoute 只會在實際停滯（`STREAM_IDLE_TIMEOUT_MS`）或 Undici 本文非活動（`FETCH_BODY_TIMEOUT_MS`）時中止串流。

### 反向代理相容性

如果您在 Nginx、Caddy、Cloudflare 或其他反向代理後方執行 OmniRoute，請確保代理逾時也高於 OmniRoute 的串流／擷取逾時。

---

## 分離連接埠模式

在不同的連接埠上執行 API 與儀表板，適用於進階情境（反向代理、容器網路）：

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API：      http://localhost:20128/v1
# 儀表板：   http://localhost:20129
```

---

## Void Linux（xbps-src）範本

Void Linux 使用者可使用 `xbps-src` 建置原生套件。請將此區塊儲存為 `srcpkgs/omniroute/template`：

```bash
# 'omniroute' 的範本檔案
pkgname=omniroute
version=3.8.0
revision=1
hostmakedepends="nodejs python3 make"
depends="openssl"
short_desc="Universal AI gateway with smart routing for multiple LLM providers"
maintainer="zenobit <zenobit@disroot.org>"
license="MIT"
homepage="https://github.com/diegosouzapw/OmniRoute"
distfiles="https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz"
# 每次發行時，請使用以下指令重新產生總和檢查碼：
#   curl -L -o /tmp/omniroute.tar.gz "https://github.com/diegosouzapw/OmniRoute/archive/refs/tags/v${version}.tar.gz" && sha256sum /tmp/omniroute.tar.gz
checksum=PLACEHOLDER_REGENERATE_PER_RELEASE
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	NODE_ENV=development npm ci --ignore-scripts
	npm run build
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	rm -rf .next/standalone/node_modules/@img

	for _mod in pino-abstract-transport split2 process-warning; do
		cp -r "node_modules/$_mod" .next/standalone/node_modules/
	done
}

do_check() {
	npm run test:unit
}

do_install() {
	vmkdir usr/lib/omniroute/.next
	vcopy .next/standalone/. usr/lib/omniroute/.next/standalone

	for _d in \
		.next/standalone/.next/server/app/dashboard \
		.next/standalone/.next/server/app/dashboard/settings \
		.next/standalone/.next/server/app/dashboard/providers; do
		touch "${DESTDIR}/usr/lib/omniroute/${_d}/.keep"
	done

	cat > "${WRKDIR}/omniroute" <<'EOF'
#!/bin/sh
export PORT="${PORT:-20128}"
export DATA_DIR="${DATA_DIR:-${XDG_DATA_HOME:-${HOME}/.local/share}/omniroute}"
export APP_LOG_TO_FILE="${APP_LOG_TO_FILE:-false}"
mkdir -p "${DATA_DIR}"
exec node /usr/lib/omniroute/.next/standalone/server.js "$@"
EOF
	vbin "${WRKDIR}/omniroute"
}

post_install() {
	vlicense LICENSE
}
```

---

## 解除安裝

| 指令                     | 動作                                                                 |
| ------------------------ | -------------------------------------------------------------------- |
| `npm run uninstall`      | 移除系統應用程式，但會在 `~/.omniroute` 中**保留您的資料庫與設定**。 |
| `npm run uninstall:full` | 移除應用程式，並永久**清除所有設定、金鑰及資料庫**。                 |

> 如需各種安裝方式的詳細解除安裝說明，請參閱 [UNINSTALL.md](./UNINSTALL.md)。
