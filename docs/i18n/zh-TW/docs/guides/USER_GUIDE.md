---
title: "使用者指南"
version: 3.8.40
lastUpdated: 2026-06-28
---

# 使用者指南

🌐 **語言：** 🇺🇸 [English](./USER_GUIDE.md) | 🇧🇷 [Português (Brasil)](../i18n/pt-BR/docs/guides/USER_GUIDE.md) | 🇪🇸 [Español](../i18n/es/docs/guides/USER_GUIDE.md) | 🇫🇷 [Français](../i18n/fr/docs/guides/USER_GUIDE.md) | 🇮🇹 [Italiano](../i18n/it/docs/guides/USER_GUIDE.md) | 🇷🇺 [Русский](../i18n/ru/docs/guides/USER_GUIDE.md) | 🇨🇳 [中文 (简体)](../i18n/zh-CN/docs/guides/USER_GUIDE.md) | 🇩🇪 [Deutsch](../i18n/de/docs/guides/USER_GUIDE.md) | 🇮🇳 [हिन्दी](../i18n/in/docs/guides/USER_GUIDE.md) | 🇹🇭 [ไทย](../i18n/th/docs/guides/USER_GUIDE.md) | 🇺🇦 [Українська](../i18n/uk-UA/docs/guides/USER_GUIDE.md) | 🇸🇦 [العربية](../i18n/ar/docs/guides/USER_GUIDE.md) | 🇯🇵 [日本語](../i18n/ja/docs/guides/USER_GUIDE.md) | 🇻🇳 [Tiếng Việt](../i18n/vi/docs/guides/USER_GUIDE.md) | 🇧🇬 [Български](../i18n/bg/docs/guides/USER_GUIDE.md) | 🇩🇰 [Dansk](../i18n/da/docs/guides/USER_GUIDE.md) | 🇫🇮 [Suomi](../i18n/fi/docs/guides/USER_GUIDE.md) | 🇮🇱 [עברית](../i18n/he/docs/guides/USER_GUIDE.md) | 🇭🇺 [Magyar](../i18n/hu/docs/guides/USER_GUIDE.md) | 🇮🇩 [Bahasa Indonesia](../i18n/id/docs/guides/USER_GUIDE.md) | 🇰🇷 [한국어](../i18n/ko/docs/guides/USER_GUIDE.md) | 🇲🇾 [Bahasa Melayu](../i18n/ms/docs/guides/USER_GUIDE.md) | 🇳🇱 [Nederlands](../i18n/nl/docs/guides/USER_GUIDE.md) | 🇳🇴 [Norsk](../i18n/no/docs/guides/USER_GUIDE.md) | 🇵🇹 [Português (Portugal)](../i18n/pt/docs/guides/USER_GUIDE.md) | 🇷🇴 [Română](../i18n/ro/docs/guides/USER_GUIDE.md) | 🇵🇱 [Polski](../i18n/pl/docs/guides/USER_GUIDE.md) | 🇸🇰 [Slovenčina](../i18n/sk/docs/guides/USER_GUIDE.md) | 🇸🇪 [Svenska](../i18n/sv/docs/guides/USER_GUIDE.md) | 🇵🇭 [Filipino](../i18n/phi/docs/guides/USER_GUIDE.md) | 🇨🇿 [Čeština](../i18n/cs/docs/guides/USER_GUIDE.md)

設定提供者、建立組合、整合 CLI 工具及部署 OmniRoute 的完整指南。

---

## 目錄

- [價錢一覽](#-價錢一覽)
- [使用情境](#-使用情境)
- [提供者設定](#-提供者設定)
- [CLI 整合](#-cli-整合)
- [部署](#-部署)
- [可用模型](#-可用模型)
- [進階功能](#-進階功能)
- [自動路由（零配置）](#-自動路由零配置)
- [MCP 與 A2A 整合](#-mcp-與-a2a-整合)
- [技能系統](#-技能系統)
- [記憶系統](#-記憶系統)
- [Webhooks](#-webhooks)
- [雲端代理](#-雲端代理)
- [程式化管理](#-程式化管理)
- [內部 CLI](#-內部-cli)
- [桌面應用程式（Electron）](#-桌面應用程式electron)

---

## 💰 價錢一覽

| 方案                | 提供者            | 費用        | 額度重置       | 最適合               |
| ------------------- | ----------------- | ----------- | -------------- | -------------------- |
| **💳 訂閱制**       | Claude Code (Pro) | $20/月      | 5 小時 + 每週  | 已訂閱使用者         |
|                     | Codex (Plus/Pro)  | $20-200/月  | 5 小時 + 每週  | OpenAI 使用者        |
|                     | GitHub Copilot    | $10-19/月   | 每月           | GitHub 使用者        |
| **🔑 API 金鑰**    | DeepSeek          | 按用量計費  | 無             | 便宜的推理模型       |
|                     | Groq              | 按用量計費  | 無             | 超快速推論           |
|                     | xAI (Grok)        | 按用量計費  | 無             | Grok 4 推理          |
|                     | Mistral           | 按用量計費  | 無             | 歐盟託管模型         |
|                     | Perplexity        | 按用量計費  | 無             | 結合搜尋功能         |
|                     | Together AI       | 按用量計費  | 無             | 開源模型             |
|                     | Fireworks AI      | 按用量計費  | 無             | 快速 FLUX 圖片生成   |
|                     | Cerebras          | 按用量計費  | 無             | 晶圓級速度           |
|                     | Cohere            | 按用量計費  | 無             | Command R+ RAG       |
|                     | NVIDIA NIM        | 按用量計費  | 無             | 企業級模型           |
|                     | Baidu Qianfan     | 按用量計費  | 無             | ERNIE 模型           |
| **💰 便宜方案**    | GLM-4.7           | $0.6/百萬  | 每日上午 10 點 | 預算備用             |
|                     | MiniMax M2.1      | $0.2/百萬  | 5 小時滾動     | 最便宜的選擇         |
|                     | Kimi K2           | $9/月固定  | 每月 1,000 萬  | 可預測成本           |
| **🆓 免費方案**    | Qoder             | $0          | 無限制         | 8 個模型免費         |
|                     | Qwen              | $0          | 無限制         | 3 個模型免費         |
|                     | Kiro              | $0          | 約 50 點/月    | Claude 免費使用      |

---

## 🎯 使用情境

### 情境 1：「我有 Claude Pro 訂閱」

**問題：** 額度用不完、密集編碼時遇到速率限制

```
Combo：「maximize-claude」
  1. cc/claude-opus-4-7        （充分利用訂閱）
  2. glm/glm-4.7               （額度用盡時的便宜備援）
  3. if/qwen3.8-max-preview    （免費緊急備援）

每月費用：$20（訂閱）+ ~$5（備援）= $25 總計
vs. $20 + 碰到限制 = 挫折感
```

### 情境 2：「我想要零成本」

**問題：** 負擔不起訂閱，需要可靠的 AI 編碼

```
Combo：「free-forever」
  1. if/kimi-k2.7-code          （無限制免費）
  2. kr/qwen3-coder-next        （Kiro 免費備援）

每月費用：$0
品質：可用於生產的模型
```

### 情境 3：「我需要 24/7 不中斷編碼」

**問題：** 截止日期逼近，無法承受停機

```
Combo：「always-on」
  1. cc/claude-opus-4-7        （最佳品質）
  2. cx/gpt-5.5                （第二訂閱）
  3. glm/glm-4.7               （便宜，每日重置）
  4. minimax/MiniMax-M2.1      （最便宜，5 小時重置）
  5. if/deepseek-v4-flash       （免費無限制）

結果：5 層備援 = 零停機
每月費用：$20-200（訂閱）+ $10-20（備援）
```

### 情境 4：「我想要 OpenClaw 中的免費 AI」

**問題：** 需要在即時通訊應用程式中使用 AI 助手，完全免費

```
Combo：「openclaw-free」
  1. if/qwen3.8-max-preview     （無限制免費）
  2. if/deepseek-v4-flash       （無限制免費）
  3. if/kimi-k2.7-code          （無限制免費）

每月費用：$0
可透過：WhatsApp、Telegram、Slack、Discord、iMessage、Signal...
```

---

## 📖 提供者設定

### 🔐 訂閱制提供者

#### Claude Code（Pro/Max）

```bash
控制台 → 提供者 → 連接 Claude Code
→ OAuth 登入 → 自動權杖重新整理
→ 5 小時 + 每週額度追蹤

模型：
  cc/claude-opus-4-7
  cc/claude-sonnet-4-6
  cc/claude-haiku-4-5-20251001
```

**小撇步：** 複雜任務使用 Opus，追求速度使用 Sonnet。OmniRoute 會追蹤每個模型的額度！

Claude 及與 Claude Code 相容的路由會保留 Opus 和 Sonnet 模型的 `max` 思考強度設定。
Haiku 模型不接受 `max` 思考強度層級，因此 OmniRoute 會在將請求發送給上游之前，
將該設定降級為較高的思考預算。

#### OpenAI Codex（Plus/Pro）

```bash
控制台 → 提供者 → 連接 Codex
→ OAuth 登入（連接埠 1455）
→ 5 小時 + 每週重置

模型：
  cx/gpt-5.5
  cx/gpt-5.4
  cx/gpt-5.3-codex
  cx/gpt-5.3-codex-spark
```

#### GitHub Copilot

```bash
控制台 → 提供者 → 連接 GitHub
→ 透過 GitHub OAuth
→ 每月重置（每月 1 日）

模型：
  gh/gpt-5.5
  gh/gpt-5.4
  gh/claude-sonnet-4.6
  gh/claude-opus-4.7
  gh/gemini-3.1-pro-preview
```

### 💰 便宜提供者

#### GLM-4.7（每日重置，$0.6/百萬）

1. 註冊：[智譜 AI](https://open.bigmodel.cn)
2. 從 Coding Plan 取得 API 金鑰
3. 控制台 → 新增 API 金鑰：提供者：`glm`，API 金鑰：`your-key`

**使用：** `glm/glm-4.7` — **小撇步：** Coding Plan 提供 3 倍額度，僅需 1/7 費用！每日上午 10:00 重置。

#### MiniMax M2.1（5 小時重置，$0.20/百萬）

1. 註冊：[MiniMax](https://www.minimax.io)
2. 取得 API 金鑰 → 控制台 → 新增 API 金鑰

**使用：** `minimax/MiniMax-M2.1` — **小撇步：** 長上下文（100 萬權杖）的最便宜選擇！

#### Kimi K2（每月 $9 固定）

1. 訂閱：[Moonshot AI](https://platform.moonshot.ai)
2. 取得 API 金鑰 → 控制台 → 新增 API 金鑰

**使用：** `kimi/kimi-k2.5` — **小撇步：** 每月 $9 固定費用，1,000 萬權杖 = 每百萬權杖 $0.90 有效成本！

#### 百度千帆 / ERNIE

1. 註冊：[百度 AI 雲千帆](https://cloud.baidu.com/product/wenxinworkshop)
2. 建立千帆 API 金鑰 → 控制台 → 新增 API 金鑰：提供者：`qianfan`

**使用：** `qianfan/ernie-5.1`、`qianfan/ernie-x1.1`，或其他千帆 OpenAI 相容模型 ID。

### 🆓 免費提供者

無需驗證的免費提供者在其提供者頁面上有一個**無需身份驗證**的開關。
關閉該開關會停用該提供者，將其從「提供者配置」/「精簡檢視」中移除，
並從 `/v1/models` 中移除其模型。

#### Qoder（9 個免費模型）

```bash
控制台 → 連接 Qoder → OAuth 登入 → 無限制使用

模型：if/qwen3.8-max-preview, if/qwen3.7-max, if/qwen3.7-plus, if/kimi-k3, if/kimi-k2.7-code, if/glm-5.2, if/deepseek-v4-pro, if/deepseek-v4-flash, if/minimax-m3
```

#### Kiro（Claude 免費使用）

```bash
控制台 → 連接 Kiro → AWS Builder ID 或 Google/GitHub → 約 50 點/月

模型：kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 組合

您可以直接在**控制台 → 組合**中透過拖曳卡片上的手柄來重新排序組合卡片。順序會儲存在 SQLite 中，並在重新載入時恢復。

### 範例 1：最大化訂閱 → 便宜備援

```
控制台 → 組合 → 建立新組合

名稱：premium-coding
模型：
  1. cc/claude-opus-4-7 （訂閱主要）
  2. glm/glm-4.7 （便宜備援，$0.6/百萬）
  3. minimax/MiniMax-M2.7 （最便宜備援，$0.3/百萬）

在 CLI 中使用：premium-coding
```

### 範例 2：僅免費（零成本）

```
名稱：free-combo
模型：
  1. if/kimi-k2.7-code（無限制）
  2. kr/qwen3-coder-next（Kiro 免費備援）

費用：永遠 $0！
```

---

## 🔧 CLI 整合

### Cursor IDE

```
設定 → 模型 → 進階：
  OpenAI API 基礎網址：http://localhost:20128/v1
  OpenAI API 金鑰：［取自 omniroute 控制台］
  模型：cc/claude-opus-4-7
```

### Claude Code

編輯 `~/.claude/settings.json`：

```json
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "your-omniroute-api-key"
  }
}
```

在此處使用與 Claude 相容的根端點。請勿在 `ANTHROPIC_BASE_URL` 後附加 `/v1`。

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
```

### OpenClaw

編輯 `~/.openclaw/openclaw.json`：

```json
{
  "agents": {
    "defaults": {
      "model": { "primary": "omniroute/if/kimi-k2.7-code" }
    }
  },
  "models": {
    "providers": {
      "omniroute": {
        "baseUrl": "http://localhost:20128/v1",
        "apiKey": "your-omniroute-api-key",
        "api": "openai-completions",
        "models": [{ "id": "if/kimi-k2.7-code", "name": "Kimi K2.7 Code" }]
      }
    }
  }
}
```

**或使用控制台：** CLI 工具 → OpenClaw → 自動配置

### Cline / Continue / RooCode

```
提供者：OpenAI 相容
基礎網址：http://localhost:20128/v1
API 金鑰：［取自控制台］
模型：cc/claude-opus-4-7
```

---

## 🚀 部署

### 全域 npm 安裝（建議）

```bash
npm install -g omniroute

# 建立配置目錄
mkdir -p ~/.omniroute

# 建立 .env 檔案（參閱 .env.example）
cp .env.example ~/.omniroute/.env

# 啟動伺服器
omniroute
# 或使用自訂連接埠：
omniroute --port 3000
```

CLI 會自動從 `~/.omniroute/.env` 或 `./.env` 載入 `.env`。

### 解除安裝

當您不再需要 OmniRoute 時，我們提供兩個快速腳本進行乾淨移除：

| 指令                    | 動作                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------ |
| `npm run uninstall`      | 移除系統應用程式，但**保留您的資料庫和配置**於 `~/.omniroute`。                      |
| `npm run uninstall:full` | 移除應用程式並永久**清除所有配置、金鑰和資料庫**。                                    |

> 注意：若要執行這些指令，請導航至 OmniRoute 專案資料夾（如果您是透過複製倉庫的方式）並執行。或者，若是全域安裝，您可以直接執行 `npm uninstall -g omniroute`。

### VPS 部署

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute && npm install && npm run build

export JWT_SECRET="your-secure-secret-change-this"
export INITIAL_PASSWORD="your-password"
export DATA_DIR="/var/lib/omniroute"
export PORT="20128"
export HOSTNAME="0.0.0.0"
export NODE_ENV="production"
export NEXT_PUBLIC_BASE_URL="http://localhost:20128"
export API_KEY_SECRET="endpoint-proxy-api-key-secret"

npm run start
# 或：pm2 start npm --name omniroute -- start
```

### PM2 部署（低記憶體）

對於記憶體有限的伺服器，可使用記憶體限制選項：

```bash
# 使用 512MB 限制（預設）
pm2 start npm --name omniroute -- start

# 或使用自訂記憶體限制
OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# 或使用 ecosystem.config.js
pm2 start ecosystem.config.js
```

建立 `ecosystem.config.js`：

```javascript
module.exports = {
  apps: [
    {
      name: "omniroute",
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        OMNIROUTE_MEMORY_MB: "512",
        JWT_SECRET: "your-secret",
        INITIAL_PASSWORD: "your-password",
      },
      node_args: "--max-old-space-size=512",
      max_memory_restart: "300M",
    },
  ],
};
```

### Docker

```bash
# 建立映像檔（預設 = runner-cli 搭配內建的 codex/claude/droid）
docker build -t omniroute:cli .

# 可攜式模式（建議）
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

如需整合主機模式搭配 CLI 二進位檔，請參閱主要文件中的 Docker 章節。

### Void Linux（xbps-src）

Void Linux 使用者可以使用 `xbps-src` 跨編譯框架，以原生方式封裝並安裝 OmniRoute。這會自動化 Node.js 獨立建置以及所需的 `better-sqlite3` 原生繫結。

<details>
<summary><b>檢視 xbps-src 模板</b></summary>

```bash
# Template file for 'omniroute'
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
checksum=009400afee90a9f32599d8fe734145cfd84098140b7287990183dde45ae2245b
system_accounts="_omniroute"
omniroute_homedir="/var/lib/omniroute"
export NODE_ENV=production
export npm_config_engine_strict=false
export npm_config_loglevel=error
export npm_config_fund=false
export npm_config_audit=false

do_build() {
	# Determine target CPU arch for node-gyp
	local _gyp_arch
	case "$XBPS_TARGET_MACHINE" in
		aarch64*) _gyp_arch=arm64 ;;
		armv7*|armv6*) _gyp_arch=arm ;;
		i686*) _gyp_arch=ia32 ;;
		*) _gyp_arch=x64 ;;
	esac

	# 1) Install all deps – skip scripts
	NODE_ENV=development npm ci --ignore-scripts

	# 2) Build the Next.js standalone bundle
	npm run build

	# 3) Copy static assets into standalone
	cp -r .next/static .next/standalone/.next/static
	[ -d public ] && cp -r public .next/standalone/public || true

	# 4) Compile better-sqlite3 native binding
	local _node_gyp=/usr/lib/node_modules/npm/node_modules/node-gyp/bin/node-gyp.js
	(cd node_modules/better-sqlite3 && node "$_node_gyp" rebuild --arch="$_gyp_arch")

	# 5) Place the compiled binding into the standalone bundle
	local _bs3_release=.next/standalone/node_modules/better-sqlite3/build/Release
	mkdir -p "$_bs3_release"
	cp node_modules/better-sqlite3/build/Release/better_sqlite3.node "$_bs3_release/"

	# 6) Remove arch-specific sharp bundles
	rm -rf .next/standalone/node_modules/@img

	# 7) Copy pino runtime deps omitted by Next.js static analysis:
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

	# Prevent removal of empty Next.js app router dirs by the post-install hook
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

</details>

### 環境變數

| 變數                                   | 預設值                                | 說明                                                                                       |
| --------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------ |
| `JWT_SECRET`                            | `omniroute-default-secret-change-me` | JWT 簽署密鑰（**生產環境務必修改**）                                                        |
| `INITIAL_PASSWORD`                      | `CHANGEME`                           | 首次登入密碼                                                                                |
| `DATA_DIR`                              | `~/.omniroute`                       | 資料目錄（資料庫、用量、日誌）                                                                |
| `PORT`                                  | framework 預設                       | 服務連接埠（範例中為 `20128`）                                                                |
| `HOSTNAME`                              | framework 預設                       | 繫結主機（Docker 預設為 `0.0.0.0`）                                                          |
| `NODE_ENV`                              | runtime 預設                         | 部署時設定為 `production`                                                                    |
| `NEXT_PUBLIC_BASE_URL`                  | `http://localhost:20128`             | 公開的基礎網址，顯示於控制台並暴露給伺服器（取代舊的 `BASE_URL`）                              |
| `NEXT_PUBLIC_CLOUD_URL`                 | `https://omniroute.dev`              | 雲端同步端點基礎網址（取代舊的 `CLOUD_URL`）                                                  |
| `API_KEY_SECRET`                        | `endpoint-proxy-api-key-secret`      | 用於產生 API 金鑰的 HMAC 密鑰                                                                 |
| `REQUIRE_API_KEY`                       | `false`                              | 對 `/v1/*` 強制要求 Bearer API 金鑰                                                          |
| `ALLOW_API_KEY_REVEAL`                  | `false`                              | 允許已驗證的控制台使用者按需顯示完整儲存的 API 金鑰值                                          |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70`                                 | 提供者限制快取資料的伺服器端重新整理頻率；UI 重新整理按鈕仍會觸發手動同步                     |
| `DISABLE_SQLITE_AUTO_BACKUP`            | `false`                              | 停用在寫入/匯入/還原前自動建立 SQLite 快照；手動備份仍可正常使用                               |
| `APP_LOG_TO_FILE`                       | `true`                               | 啟用將應用程式和稽核日誌輸出至磁碟                                                             |
| `AUTH_COOKIE_SECURE`                    | `false`                              | 強制使用安全 `Secure` 認證 Cookie（在 HTTPS 反向代理後方）                                    |
| `CLOUDFLARED_BIN`                       | 未設定                               | 使用既有的 `cloudflared` 二進位檔而非受管理的下載                                              |
| `CLOUDFLARED_PROTOCOL`                  | `http2`                              | 受管理快速隧道的傳輸協定（`http2`、`quic` 或 `auto`）                                         |
| `OMNIROUTE_MEMORY_MB`                   | `512`                                | Node.js 堆積限制（MB）                                                                       |
| `PROMPT_CACHE_MAX_SIZE`                 | `50`                                 | 提示快取最大條目數                                                                           |
| `SEMANTIC_CACHE_MAX_SIZE`               | `100`                                | 語意快取最大條目數                                                                           |

如需完整的環境變數參考，請參閱 [README](../README.md)。

---

## 📊 可用模型

<details>
<summary><b>檢視所有可用模型</b></summary>

> 以下列表取自 v3.8.0 的 `open-sse/config/providerRegistry.ts`。雲端目錄（Gemini、OpenRouter 等）會動態同步 — 如需完整的即時目錄，請開啟**控制台 → 提供者 → [提供者] → 可用模型**或呼叫 `GET /api/models/catalog`。

**Claude Code（`cc/`）** — Pro/Max OAuth：`cc/claude-opus-4-8`, `cc/claude-opus-4-7`, `cc/claude-opus-4-6`, `cc/claude-opus-4-5-20251101`, `cc/claude-sonnet-4-6`, `cc/claude-sonnet-4-5-20250929`, `cc/claude-haiku-4-5-20251001`

**Codex（`cx/`）** — Plus/Pro OAuth：`cx/gpt-5.5`（+ 強度層級：`gpt-5.5-xhigh`, `gpt-5.5-high`, `gpt-5.5-medium`, `gpt-5.5-low`）, `cx/gpt-5.4`, `cx/gpt-5.4-mini`, `cx/gpt-5.3-codex`, `cx/gpt-5.3-codex-spark`

**GitHub Copilot（`gh/`）** — OAuth：`gh/gpt-5.5`, `gh/gpt-5.4`, `gh/gpt-5.4-mini`, `gh/gpt-5-mini`, `gh/gpt-5.3-codex`, `gh/claude-opus-4.7`, `gh/claude-opus-4.6`, `gh/claude-opus-4-5-20251101`, `gh/claude-sonnet-4.6`, `gh/claude-sonnet-4.5`, `gh/claude-haiku-4.5`, `gh/gemini-3.1-pro-preview`, `gh/gemini-3-flash-preview`, `gh/oswe-vscode-prime`

**Kiro（`kr/`）** — 免費 OAuth：`kr/auto-kiro`, `kr/claude-opus-4.7`, `kr/claude-opus-4.6`, `kr/claude-sonnet-4.6`, `kr/claude-sonnet-4.5`, `kr/claude-haiku-4.5`, `kr/deepseek-3.2`, `kr/minimax-m2.5`, `kr/minimax-m2.1`, `kr/glm-5`, `kr/qwen3-coder-next`

**Qoder（`if/`）** — 免費 OAuth：`if/qwen3.8-max-preview`, `if/qwen3.7-max`, `if/qwen3.7-plus`, `if/kimi-k3`, `if/kimi-k2.7-code`, `if/glm-5.2`, `if/deepseek-v4-pro`, `if/deepseek-v4-flash`, `if/minimax-m3`

**GLM（`glm/`, `glm-cn/`, `zai/`, `glmt/`）** — $0.2–0.6/百萬：`glm/glm-5.1`, `glm/glm-5`, `glm/glm-5-turbo`, `glm/glm-4.7`, `glm/glm-4.7-flash`, `glm/glm-4.6`, `glm/glm-4.6v`, `glm/glm-4.5`, `glm/glm-4.5v`, `glm/glm-4.5-air`

**MiniMax（`minimax/`, `minimax-cn/`）** — $0.2/百萬：`minimax/MiniMax-M2.7`, `minimax/MiniMax-M2.7-highspeed`, `minimax/MiniMax-M2.5`, `minimax/MiniMax-M2.5-highspeed`

**Kimi（`kimi/`, `kimi-coding/`, `kimi-coding-apikey/`）** — 每月 $9 固定或按用量計費：`kimi/kimi-k2.6`, `kimi/kimi-k2.5`

**DeepSeek（`ds/`）** — API 金鑰：`ds/deepseek-v4-pro`, `ds/deepseek-v4-flash`

**Groq（`groq/`）** — 超快速：`groq/llama-3.3-70b-versatile`, `groq/meta-llama/llama-4-maverick-17b-128e-instruct`, `groq/qwen/qwen3-32b`, `groq/openai/gpt-oss-120b`

**xAI（`xai/`）** — Grok 原生：`xai/grok-4.3`, `xai/grok-4.20-multi-agent-0309`, `xai/grok-4.20-0309-reasoning`, `xai/grok-4.20-0309-non-reasoning`

**Mistral（`mistral/`）** — 歐盟託管：`mistral/mistral-large-latest`, `mistral/mistral-medium-3-5`, `mistral/mistral-small-latest`, `mistral/devstral-latest`, `mistral/codestral-latest`

**Perplexity（`pplx/`）** — 結合搜尋功能：`pplx/sonar-deep-research`, `pplx/sonar-reasoning-pro`, `pplx/sonar-pro`, `pplx/sonar`

**Together AI（`together/`）** — 開源：`together/meta-llama/Llama-3.3-70B-Instruct-Turbo-Free`（免費）, `together/meta-llama/Llama-Vision-Free`, `together/deepseek-ai/DeepSeek-R1-Distill-Llama-70B-Free`, `together/deepseek-ai/DeepSeek-R1`, `together/Qwen/Qwen3-235B-A22B`, `together/meta-llama/Llama-4-Maverick-17B-128E-Instruct-FP8`

**Fireworks AI（`fireworks/`）** — 快速推論：`fireworks/accounts/fireworks/models/kimi-k2p6`, `fireworks/accounts/fireworks/models/minimax-m2p7`, `fireworks/accounts/fireworks/models/qwen3p6-plus`, `fireworks/accounts/fireworks/models/glm-5p1`, `fireworks/accounts/fireworks/models/deepseek-v4-pro`

**Cerebras（`cerebras/`）** — 晶圓級：`cerebras/zai-glm-4.7`, `cerebras/gpt-oss-120b`

**Cohere（`cohere/`）** — 專注 RAG：`cohere/command-a-reasoning-08-2025`, `cohere/command-a-vision-07-2025`, `cohere/command-a-03-2025`, `cohere/command-r-08-2024`

**NVIDIA NIM（`nvidia/`）** — 企業級：`nvidia/z-ai/glm-5.1`, `nvidia/minimaxai/minimax-m2.7`, `nvidia/google/gemma-4-31b-it`, `nvidia/mistralai/mistral-small-4-119b-2603`, `nvidia/mistralai/mistral-large-3-675b-instruct-2512`, `nvidia/qwen/qwen3.5-397b-a17b`, `nvidia/deepseek-ai/deepseek-v4-pro`, `nvidia/openai/gpt-oss-120b`, `nvidia/nvidia/nemotron-3-super-120b-a12b`

**百度千帆（`qianfan/`）** — ERNIE：`qianfan/ernie-5.1`, `qianfan/ernie-5.0-thinking-latest`, `qianfan/ernie-x1.1`

**Ollama Cloud（`ollama-cloud/`）**：`ollama-cloud/deepseek-v4-pro`, `ollama-cloud/deepseek-v4-flash`, `ollama-cloud/kimi-k2.6`, `ollama-cloud/glm-5.1`, `ollama-cloud/minimax-m2.7`, `ollama-cloud/gemma4:31b`, `ollama-cloud/qwen3.5:397b`

**Gemini（Google Cloud `gemini/`）**：依 API 金鑰從 Google 即時同步 — 無靜態清單。在**控制台 → 提供者**中連接金鑰，然後使用**可用模型**匯入當前目錄（例如 `gemini/gemini-3-pro`, `gemini/gemini-3-flash`）。

**其他相容提供者**（部分）：`cohere`, `databricks`, `snowflake`, `together`, `vertex`, `alibaba`, `alibaba-cn`, `bedrock`（透過 `aws-bedrock`）, `azure-ai`, `openrouter`（直通目錄）, `siliconflow`, `hyperbolic`, `huggingface`, `featherless-ai`, `cloudflare-ai`, `scaleway`, `deepinfra`, `vercel-ai-gateway`, `bazaarlink`, `friendliai`, `nous-research`, `reka`, `volcengine`, `ai21`, `gigachat`。每個都在 `providerRegistry.ts` 中維護自己的模型清單，並可在提供者公開 `/models` 端點時自動同步。

**關於模型 ID 的說明：** OmniRoute 使用提供者原生 ID（`claude-opus-4-8`, `gpt-5.5`, `glm-5.1`, `MiniMax-M2.7`, `kimi-k2.5`, `grok-4.20-0309-reasoning`）。部分 ID 包含帶點號的版本號，因為上游 API 期望如此。如果以上未列出某個模型，請執行 `omniroute models --search <term>` 或存取 `GET /api/models/catalog` 以確認可用性。

</details>

---

## 🧩 進階功能

### 自訂模型

無需等待應用程式更新，即可將任何模型 ID 新增至任何提供者：

```bash
# 透過 API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-5.2", "modelName": "GPT-5.2"}'

# 列出：curl http://localhost:20128/api/provider-models?provider=openai
# 移除：curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-5.2"
```

或使用控制台：**提供者 → [提供者] → 自訂模型**。

注意：

- OpenRouter 和 OpenAI/Anthropic 相容提供者僅透過**可用模型**管理。手動新增、匯入和自動同步都會匯入同一個可用模型清單，因此這些提供者沒有獨立的自訂模型區塊。
- **自訂模型**區塊專為不提供受管可用模型匯入的提供者而設計。

### 串聯 OmniRoute 對等節點

另一個 OmniRoute 閘道可以作為**自訂 OpenAI 相容**提供者加入。使用
對等節點的 `/v1` 基礎網址以及由該對等節點簽發的專用最小權限 API 金鑰。

對於雙向或多跳鍊，請在每個閘道上啟用選擇性迴圈防護：

```bash
# gateway-a
OMNIROUTE_INSTANCE_ID=gateway-a
OMNIROUTE_PEER_URLS=http://gateway-b:20128/v1
OMNIROUTE_PEER_MAX_HOPS=4
```

```bash
# gateway-b
OMNIROUTE_INSTANCE_ID=gateway-b
OMNIROUTE_PEER_URLS=http://gateway-a:20128/v1
OMNIROUTE_PEER_MAX_HOPS=4
```

只有發送到明確允許清單中的對等節點網址的請求，才會收到
`X-OmniRoute-Peer-Trace` 標頭。閘道在遇到重複的執行個體 ID 或用盡跳數
預算時，會回應 `508 Loop Detected`；一般上游提供者不會收到任何對等節點中繼資料。

對等串聯並非資料庫複寫或主機容錯移轉。每個閘道維護獨立的
SQLite 狀態、快取、速率計數器和工作階段。請使用健康檢查反向代理或用戶端
容錯移轉來實現主動/被動或主動/主動的高可用性，且絕不要將一個 SQLite 資料庫
掛載到多個正在執行的 OmniRoute 執行個體中。

### 專用提供者路由

將請求直接路由到特定提供者，並附帶模型驗證：

```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations
```

若缺少提供者前綴，會自動補上。模型不符時會回傳 `400` 錯誤。

### 網路代理配置

```bash
# 設定全域代理
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# 各提供者獨立代理
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# 測試代理
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
```

**優先順序：** 金鑰特定 → 組合特定 → 提供者特定 → 全域 → 環境變數。

### 模型目錄 API

```bash
curl http://localhost:20128/api/models/catalog
```

回傳按提供者分組的模型，包含類型（`chat`、`embedding`、`image`）。

### 雲端同步

- 跨裝置同步提供者、組合和設定
- 自動背景同步，附帶超時和快速失敗機制
- 生產環境中建議使用伺服器端的 `NEXT_PUBLIC_BASE_URL` / `NEXT_PUBLIC_CLOUD_URL`

### Cloudflare 快速隧道

- 在**控制台 → 端點**中可用，適用於 Docker 和其他自架部署
- 建立一個暫時的 `https://*.trycloudflare.com` 網址，轉發到您目前的 OpenAI 相容 `/v1` 端點
- 首次啟用時僅在需要時安裝 `cloudflared`；後續重啟會重複使用相同的受管理二進位檔
- 快速隧道在 OmniRoute 或容器重啟後不會自動恢復；請在需要時從控制台重新啟用
- 隧道網址是暫時的，每次停止/啟動隧道時都會變更
- 受管理的快速隧道預設使用 HTTP/2 傳輸，以避免在受限容器中產生大量的 QUIC UDP 緩衝區警告
- 如果您想覆蓋受管理的傳輸選擇，請設定 `CLOUDFLARED_PROTOCOL=quic` 或 `auto`
- 如果您偏好使用預先安裝的 `cloudflared` 二進位檔而非受管理的下載，請設定 `CLOUDFLARED_BIN`
- Cloudflare 快速隧道、Tailscale Funnel 和 ngrok 隧道面板可在**設定 → 外觀**中顯示或隱藏。隱藏面板不會停止正在執行的隧道。

### LLM 閘道智慧功能（第 9 階段）

- **語意快取** — 自動快取非串流、temperature=0 的回應（可透過 `X-OmniRoute-No-Cache: true` 繞過）
- **請求冪等性** — 透過 `Idempotency-Key` 或 `X-Request-Id` 標頭在 5 秒內去重複請求
- **進度追蹤** — 選擇性 SSE `event: progress` 事件，透過 `X-OmniRoute-Progress: true` 標頭啟用

---

### 翻譯器測試平台

透過**控制台 → 翻譯器**存取。偵錯並視覺化 OmniRoute 如何在提供者之間轉換 API 請求。

| 模式              | 用途                                                                                   |
| ----------------- | -------------------------------------------------------------------------------------- |
| **測試平台**      | 選擇來源/目標格式，貼上請求，即可即時查看轉換後的輸出                                     |
| **聊天測試器**    | 透過代理發送即時聊天訊息，並檢查完整的請求/回應週期                                       |
| **測試台**        | 跨多種格式組合執行批次測試，驗證轉換正確性                                                 |
| **即時監控**      | 即時觀察請求流經代理時的轉換過程                                                          |

**使用情境：**

- 偵錯特定用戶端/提供者組合為何失敗
- 驗證思考標籤、工具呼叫和系統提示是否正確轉換
- 比較 OpenAI、Claude、Gemini 和 Responses API 格式之間的差異

---

### 路由策略

透過**控制台 → 設定 → 路由**配置。控制台顯示六種最常用的策略；組合和自動路由器內部支援更廣泛的範圍。

**控制台可見策略（帳戶層級路由）：**

| 策略                            | 說明                                                                                     |
| ------------------------------- | ---------------------------------------------------------------------------------------- |
| **填滿優先**                    | 按優先順序使用帳戶 — 主要帳戶處理所有請求，直到無法使用為止                               |
| **循環輪詢**                    | 在所有帳戶之間循環，附帶可配置的黏性限制（預設每個帳戶 3 次呼叫）                           |
| **P2C（雙隨機選擇）**           | 選取 2 個隨機帳戶，路由到健康狀態較佳的那個 — 在負載與健康感知間取得平衡                    |
| **隨機**                        | 使用 Fisher-Yates 洗牌法隨機為每個請求選取帳戶                                              |
| **最少使用**                    | 路由到 `lastUsedAt` 時間戳記最舊的帳戶，平均分配流量                                       |
| **成本最佳化**                  | 路由到優先級值最低的帳戶，以最低成本提供者為最佳化目標                                      |

**進階組合和自動策略**（可依組合配置，或透過 `auto/*` 前綴使用 — 參閱 [AUTO-COMBO.md](../routing/AUTO-COMBO.md)）：

- `priority` — 嚴格順序，不進行循環輪詢
- `weighted` — 依各模型權重按比例分配流量
- `fill-first` — 耗盡第一個模型直到達到限制
- `round-robin` / `strict-random` / `random`
- `p2c`（雙隨機選擇）
- `least-used` 和 `cost-optimized`
- `auto` — 跨所有候選者的評分驅動路由
- `lkgp`（Last Known Good Provider）— 鎖定每個工作階段最後成功的模型
- `context-optimized` — 選取可用上下文視窗最大的模型
- `context-relay` — 串聯長上下文模型以處理後續回合

#### 外部黏性工作階段標頭

用於外部工作階段親和性（例如，反向代理後方的 Claude Code/Codex 代理），請發送：

```http
X-Session-Id: your-session-key
```

OmniRoute 也接受 `x_session_id`，並在 `X-OmniRoute-Session-Id` 中回傳有效的會話金鑰。

如果您使用 Nginx 並發送底線格式的標頭，請啟用：

```nginx
underscores_in_headers on;
```

#### 萬用字元模型別名

建立萬用字元模式來重新對應模型名稱：

```
模式：claude-sonnet-*     →  目標：cc/claude-sonnet-4-6
模式：gpt-*               →  目標：gh/gpt-5.3-codex
```

萬用字元支援 `*`（任意字元）和 `?`（單一字元）。

#### 備援鏈

定義套用至所有請求的全域備援鏈：

```
鏈：production-fallback
  1. cc/claude-opus-4-7
  2. gh/gpt-5.3-codex
  3. glm/glm-4.7
```

---

### 韌性與斷路器

透過**控制台 → 設定 → 韌性**配置。

OmniRoute 提供五個元件的提供者層級韌性：

1. **請求佇列與節流** — 系統層級的請求塑形：
   - **每分鐘請求數（RPM）** — 每個帳戶每分鐘的最大請求數
   - **請求間最小間隔** — 請求之間的最小間隔（毫秒）
   - **最大並發請求數** — 每個帳戶的最大同時請求數

2. **連線冷卻** — 在可重試失敗後，依驗證類型為單一連線配置：
   - **基礎冷卻** — 可重試上游失敗的預設冷卻視窗
   - **使用上游重試提示** — 在有提供時，遵循權威性的 `Retry-After` 或重置提示
   - **最大退避步數** — 重複失敗的最大指數退避層級

3. **提供者斷路器** — 追蹤端到端的提供者失敗，在達到配置的警告門檻時將提供者標記為降級，並在達到配置的失敗門檻時開啟斷路器：
   - **降級門檻** — 進入 `DEGRADED` 狀態前的連續提供者失敗次數
   - **失敗門檻** — 進入 `OPEN` 狀態前的連續提供者失敗次數
   - **重置超時** — 再次測試提供者前的時間視窗
   - **CLOSED（健康）** — 請求正常流動
   - **DEGRADED（降級）** — 請求仍可流動，但同時追蹤升高的失敗率
   - **OPEN（開啟）** — 重複失敗後暫時阻擋提供者
   - **HALF_OPEN（半開）** — 測試提供者是否已恢復

   連線層級的 `429` 速率限制會留在**連線冷卻**中，不計入提供者斷路器。

   提供者斷路器的執行時期狀態僅顯示於**控制台 → 健康狀態**。

4. **等待冷卻** — 如果所有候選連線都處於冷卻狀態，OmniRoute 可以等待最早的冷卻結束，並自動重試相同的用戶端請求。

5. **速率限制自動偵測** — 當上游提供者回傳明確的等待視窗時，這些提示會在啟用設定時覆蓋本機連線冷卻。

**小撇步：** 使用**健康狀態**頁面來檢查並在故障後重設即時提供者斷路器。韌性頁面僅變更配置。

---

### 資料庫匯出 / 匯入

在**控制台 → 設定 → 系統與儲存**中管理資料庫備份。

| 動作                      | 說明                                                                                                              |
| ------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| **匯出資料庫**            | 將目前的 SQLite 資料庫下載為 `.sqlite` 檔案                                                                        |
| **全部匯出（.tar.gz）**   | 下載完整的備份封存檔，包含：資料庫、設定、組合、提供者連線（不含憑證）、API 金鑰中繼資料                            |
| **匯入資料庫**            | 上傳 `.sqlite` 檔案以取代目前的資料庫。除非 `DISABLE_SQLITE_AUTO_BACKUP=true`，否則會自動建立匯入前備份             |

```bash
# API：匯出資料庫
curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API：全部匯出（完整封存檔）
curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API：匯入資料庫
curl -X POST http://localhost:20128/api/db-backups/import \
  -F "file=@backup.sqlite"
```

**匯入驗證：** 匯入的檔案會進行完整性檢查（SQLite pragma 檢查）、必要表格檢查（`provider_connections`, `provider_nodes`, `combos`, `api_keys`）以及大小檢查（最大 100MB）。

**使用情境：**

- 在機器間遷移 OmniRoute
- 建立外部備份以進行災難復原
- 在團隊成員之間分享配置（全部匯出 → 分享封存檔）

---

### 設定控制台

設定頁面分為 **7 個標籤**，方便導覽：

| 標籤              | 內容                                                                                                               |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| **一般**          | 系統儲存工具、預設行為、端點隧道可見性                                                                             |
| **外觀**          | 主題控制（淺色/深色/系統）、側邊欄可見性、Cloudflare/Tailscale/ngrok 隧道卡片的開關                                |
| **AI**            | 思考預算配置、全域系統提示注入、提示快取統計                                                                       |
| **安全性**        | 登入/密碼設定、IP 存取控制、`/models` 的 API 驗證、提供者封鎖、提示注入防護                                        |
| **路由**          | 全域路由策略（填滿優先 / 循環輪詢 / P2C / 隨機 / 最少使用 / 成本最佳化）、萬用字元模型別名、備援鏈、組合預設        |
| **韌性**          | 請求佇列、連線冷卻、提供者斷路器配置、以及等待冷卻行為                                                             |
| **進階**          | 全域代理配置（HTTP/SOCKS5）、各提供者代理覆蓋設定                                                                  |

一般標籤不再重複顯示唯讀的日誌和快取說明。資料庫保留和
最佳化設定透過 `/api/settings/database` 持續保存；手動清除快取使用
`DELETE /api/cache`。請求和代理日誌行數上限由
`CALL_LOGS_TABLE_MAX_ROWS` 和 `PROXY_LOGS_TABLE_MAX_ROWS` 控制。

---

### 費用與預算管理

透過**控制台 → 費用**存取。

| 標籤        | 用途                                                                                        |
| ------------ | ------------------------------------------------------------------------------------------- |
| **預算**     | 為每個 API 金鑰設定每日/每週/每月的支出限制，並提供即時追蹤                                  |
| **定價**     | 檢視和編輯模型定價條目 — 各提供者的每千輸入/輸出權杖費用                                     |

```bash
# API：設定預算
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API：取得目前預算狀態
curl http://localhost:20128/api/usage/budget
```

**費用追蹤：** 每個請求都會記錄權杖使用量，並使用定價表計算費用。在**控制台 → 用量**中依提供者、模型和 API 金鑰檢視明細。

---

### 音訊轉錄

OmniRoute 透過 OpenAI 相容端點支援音訊轉錄：

```bash
POST /v1/audio/transcriptions
Authorization: Bearer ***
Content-Type: multipart/form-data

# 使用 curl 的範例
curl -X POST http://localhost:20128/v1/audio/transcriptions \
  -H "Authorization: Bearer ***" \
  -F "file=@audio.mp3" \
  -F "model=deepgram/nova-3"
```

**語音轉文字（轉錄）** 提供者：

- `openai/`（whisper 相容）
- `groq/`（Groq Whisper Turbo）
- `deepgram/`（Nova 系列）
- `assemblyai/`
- `nvidia/`（Parakeet, Canary）
- `huggingface/`（whisper 變體）
- `qwen/`

**文字轉語音（`POST /v1/audio/speech`）** 提供者：

- `openai/`（tts-1, tts-1-hd）
- `hyperbolic/`
- `deepgram/`（Aura）
- `nvidia/`（Magpie TTS）
- `elevenlabs/`
- `huggingface/`
- `inworld/`
- `cartesia/`
- `playht/`
- `kie/`
- `aws-polly/`
- `xiaomi-mimo/`
- `edgetts/`（Microsoft Edge「朗讀功能」— 免費，無需 API 金鑰；非官方/逆向工程端點）
- `coqui/`, `tortoise/`
- `qwen/`

支援的轉錄音訊格式：`mp3`, `wav`, `m4a`, `flac`, `ogg`, `webm`。TTS 輸出格式取決於提供者（mp3, wav, opus, pcm, mulaw）。

---

### 組合平衡策略

在**控制台 → 組合 → 建立/編輯 → 策略**中配置每個組合的平衡策略。

| 策略              | 說明                                                               |
| ----------------- | ------------------------------------------------------------------ |
| **循環輪詢**      | 依序輪換模型                                                       |
| **優先級**        | 始終嘗試第一個模型；僅在出錯時才進行備援                           |
| **隨機**          | 為每個請求從組合中隨機選取一個模型                                  |
| **加權**          | 根據每個模型的指定權重按比例路由                                    |
| **最少使用**      | 路由到近期請求最少的模型（使用組合指標）                            |
| **成本最佳化**    | 路由到最便宜的可用模型（使用定價表）                                |

全域組合預設可在**控制台 → 設定 → 路由 → 組合預設**中設定。
組合目標超時預設會繼承當前請求的超時設定。僅在需要更短的
單目標限制以觸發更快的備援時，才使用組合預設或個別組合上的**目標超時（秒）**。

零延遲組合最佳化為選擇性功能。請保持**零延遲最佳化**停用，以
防止這些延遲功能搶跑備援目標、根據 TTFT 歷史記錄跳過目標，或壓縮備援請求；啟用此選項會允許配置的避險策略、預測性 TTFT
跳過，以及主動式備援壓縮，以路由/請求正確性換取更低的尾端
延遲。

當上游提供者要求嚴格的 `max_tokens` / `maxOutputTokens` 限制時，請停用**推理權杖緩衝區**。啟用時，組合路由僅在模型有已知輸出上限時為推理模型增加
緩衝空間，若安全的緩衝值超過該上限，則保留用戶端權杖限制不變。如果用戶端限制已高於已知上限，
OmniRoute 會在發送上游請求前將其限制在該上限內。

---

### 健康狀態控制台

透過**控制台 → 健康狀態**存取。即時系統健康狀態總覽，包含 6 張卡片：

| 卡片                    | 顯示內容                                          |
| ----------------------- | ------------------------------------------------- |
| **系統狀態**            | 運作時間、版本、記憶體使用量、資料目錄              |
| **提供者健康狀態**      | 全域提供者斷路器執行時期狀態                        |
| **速率限制**            | 各帳戶的活躍連線冷卻狀態及剩餘時間                  |
| **活躍鎖定**            | 活躍的模型層級鎖定和暫時排除                        |
| **簽章快取**            | 去重複快取統計（活躍金鑰數、命中率）                |
| **延遲遙測**            | 各提供者的 p50/p95/p99 延遲匯總                     |

**小撇步：** 健康狀態頁面每 10 秒自動重新整理。使用斷路器卡片來識別哪些提供者正在發生問題。

---

## 🤖 自動路由（零配置）

OmniRoute 內建**評分驅動的自動路由器**，會為每次請求在已連線的所有提供者中選取最佳模型 — 無需維護組合。只需使用 `auto/*` 前綴發送請求，OmniRoute 就會即時組裝一個虛擬組合，依據延遲、成本、成功率、上下文適應性、模型對任務的適合度、近期失敗、額度和斷路器狀態對候選者進行評分。

| 前綴             | 最佳化目標                                                                    |
| ---------------- | ---------------------------------------------------------------------------- |
| `auto`           | 平衡預設（延遲 × 成本 × 成功率）                                             |
| `auto/coding`    | 編碼任務：偏好 Claude、GPT-5、GLM、Kimi、Qwen Coder、DeepSeek 程式模型       |
| `auto/cheap`     | 最低 $/權杖，可接受較高延遲                                                   |
| `auto/fast`      | 最低延遲，忽略成本                                                            |
| `auto/offline`   | 僅限本地提供者（Ollama, vLLM, llama.cpp）— 適用於隔離環境                     |
| `auto/smart`     | 推理品質優先（Opus, GPT-5 xhigh, R1, GLM 5.1 推理）                          |
| `auto/lkgp`      | 「Last Known Good Provider」— 鎖定最近一次成功的目標                           |

範例：

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer ***" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "auto/coding",
    "messages": [{ "role": "user", "content": "重構這個 Python 函式" }],
    "stream": true
  }'
```

自動路由器的完整說明請見 [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — 包括如何調整評分權重、封鎖特定提供者，以及在**控制台 → 自動組合**中檢查路由決策。

---

## 🔌 MCP 與 A2A 整合

OmniRoute 既是 **MCP 伺服器**（模型上下文協定），也是 **A2A 伺服器**（代理間 JSON-RPC 2.0）。任何相容 MCP 的 IDE 或代理主機都可以直接呼叫 OmniRoute 工具 — 無需額外的包裝器。

### MCP 傳輸方式

- **SSE**：`http://localhost:20128/api/mcp/sse`
- **可串流 HTTP**：`http://localhost:20128/api/mcp/stream`
- **stdio**：`omniroute --mcp`（適用於偏好 stdio 的 IDE 外掛程式）

### 連接 Claude Desktop

編輯 `~/Library/Application Support/Claude/claude_desktop_config.json`（macOS）或 Windows/Linux 的對應路徑：

```json
{
  "mcpServers": {
    "omniroute": {
      "command": "omniroute",
      "args": ["--mcp"]
    }
  }
}
```

### 連接 Cursor / Continue / VS Code MCP

使用 SSE 網址 `http://localhost:20128/api/mcp/sse` 和在**控制台 → API 金鑰**中產生的 Bearer API 金鑰。

### 範圍

MCP 工具分為 10 個範圍：`analytics`、`auth`、`billing`、`combos`、`health`、`keys`、`memory`、`models`、`providers`、`system`。每個 Bearer 金鑰可以限制在特定範圍內 — 完整工具目錄請參閱 [MCP-SERVER.md](../frameworks/MCP-SERVER.md)，JSON-RPC 架構請參閱 [A2A-SERVER.md](../frameworks/A2A-SERVER.md)。

---

## 🧠 技能系統

OmniRoute 提供可擴充的**技能框架**（`src/lib/skills/`），讓代理和 A2A 端點可以執行領域特定的常式（例如 `code-review`、`summarize`、`extract-facts`、`web-research`）。

- **市集 UI** — 從**控制台 → 技能**瀏覽和安裝技能
- **各金鑰範圍** — 限制哪些 API 金鑰可以呼叫哪些技能
- **自訂技能** — 將 TypeScript 檔案放入 `src/lib/a2a/skills/`，註冊後即可透過 A2A 立即呼叫

完整參考：[SKILLS.md](../frameworks/SKILLS.md)。

---

## 💾 記憶系統

OmniRoute 使用混合檢索來持久保存**長期對話記憶**：

- **SQLite FTS5** 用於跨回合的關鍵字搜尋
- **Qdrant 向量儲存**（選擇性）用於語意回憶
- **自動事實提取** — 每次工作階段後會總結實體、偏好和決策，儲存在 `memory_facts` 表中
- 記憶按 API 金鑰和工作階段範圍劃分

在**控制台 → 記憶**中管理記憶（搜尋、編輯、匯出、清除）。HTTP 介面（`/api/memory/*`）讓代理可以程式化地推送和查詢事實 — 請參閱 [MEMORY.md](../frameworks/MEMORY.md)。

---

## 🔔 Webhooks

訂閱 OmniRoute 事件以進行即時監控和自動化。

- 在**控制台 → Webhooks** 中建立 webhook，包含目標網址和 HMAC 簽署密鑰
- 可用事件：`request.completed`, `request.failed`, `provider.unavailable`, `budget.exceeded`, `combo.switched`, `circuit_breaker.opened`, `circuit_breaker.closed`
- 每個承載都包含 `X-OmniRoute-Signature`（HMAC-SHA256）以供驗證
- 重試：3 次嘗試，使用指數退避，之後進入死信佇列

完整架構請見 [WEBHOOKS.md](../frameworks/WEBHOOKS.md)。

---

## ☁️ 雲端代理

OmniRoute 與雲端編碼代理（**OpenAI Codex Cloud**, **Devin**, **Jules**, **Antigravity**）整合，讓您可以從處理本地路由的同一個控制台分派長時間執行的任務。

- 在**控制台 → 雲端代理**或透過 `POST /api/v1/agents/tasks` 建立任務
- 追蹤每個任務的狀態、日誌和產出物
- 自備每個提供者的 API 金鑰 — 憑證絕不會離開 OmniRoute 實例

完整參考：[CLOUD_AGENT.md](../frameworks/CLOUD_AGENT.md)。

---

## 🛠️ 程式化管理

您可以使用具有 `manage` 範圍的 **Bearer 金鑰**，透過 HTTP 管理所有 OmniRoute 資源（提供者、組合、金鑰、設定）。

在**控制台 → API 金鑰 → 新增金鑰 → 範圍：manage** 中產生金鑰，然後：

```bash
# 列出提供者
curl http://localhost:20128/api/providers \
  -H "Authorization: Bearer $OMNIR..._KEY"

# 新增提供者連線
curl -X POST http://localhost:20128/api/providers \
  -H "Authorization: Bearer $OMNIR..._KEY" \
  -H "Content-Type: application/json" \
  -d '{ "provider": "openai", "apiKey": "sk-...", "name": "main" }'

# 建立組合
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer $OMNIR..._KEY" \
  -H "Content-Type: application/json" \
  -d '{ "name": "premium", "strategy": "priority", "models": [{ "model": "cc/claude-opus-4-7" }, { "model": "glm/glm-5.1" }] }'

# 列出/建立 API 金鑰
curl http://localhost:20128/api/keys -H "Authorization: Bearer $OMNIR..._KEY"
curl -X POST http://localhost:20128/api/keys -H "Authorization: Bearer $OMNIR..._KEY" \
  -d '{ "name": "ci-bot", "scopes": ["chat"] }'
```

完整的端點目錄和請求/回應架構請參閱 [API_REFERENCE.md](../reference/API_REFERENCE.md)。

---

## 💻 內部 CLI

OmniRoute 內建一個內部 CLI（`omniroute …`），用於設定、診斷和執行時期控制。這**與控制台中的「CLI 工具」頁面不同**，後者用於配置第三方 CLI（Claude Code, Cursor, Codex, Cline, …）使其能夠與 OmniRoute 通訊。

```bash
omniroute setup                    # 互動式精靈（密碼、提供者、組合）
omniroute setup --non-interactive  # CI 友善模式
omniroute doctor                   # 健康診斷（資料目錄、資料庫、提供者、連接埠）
omniroute providers available      # 列出支援的提供者
omniroute providers list           # 列出已配置的連線
omniroute providers test <id>      # 即時測試提供者連線
omniroute combos list              # 列出組合
omniroute combos switch <name>     # 設定預設組合
omniroute models                   # 列出可用模型（--json, --search）
omniroute keys add | list | remove # 從終端機管理 API 金鑰
omniroute backup                   # 快照配置 + 資料庫
omniroute restore [<timestamp>]    # 從快照還原
omniroute health                   # 詳細健康狀態（斷路器、快取、記憶體）
omniroute quota                    # 提供者額度使用情況
omniroute mcp status               # MCP 伺服器狀態
omniroute a2a status               # A2A 伺服器狀態
omniroute tunnel list|create|stop  # Cloudflare/Tailscale/ngrok 隧道
omniroute reset-password           # 重設管理員密碼
omniroute --mcp                    # 透過 stdio 啟動 MCP 伺服器
omniroute --port 3000              # 在自訂連接埠上啟動伺服器
```

提示：將 `omniroute doctor --json` 與您的監控工具搭配使用，可在提供者連線異常時發出警報。

---

## 🖥️ 桌面應用程式（Electron）

OmniRoute 也可作為 Windows、macOS 和 Linux 的原生桌面應用程式使用。

### 安裝

```bash
# 從 electron 目錄：
cd electron
npm install

# 開發模式（連接到執行中的 Next.js 開發伺服器）：
npm run dev

# 生產模式（使用獨立建置）：
npm start
```

### 建置安裝程式

```bash
cd electron
npm run build          # 當前平台
npm run build:win      # Windows（.exe NSIS）
npm run build:mac      # macOS（.dmg 通用版）
npm run build:linux    # Linux（.AppImage）
```

輸出 → `electron/dist-electron/`

### 主要功能

| 功能                        | 說明                                              |
| --------------------------- | ------------------------------------------------- |
| **伺服器就緒檢查**          | 在顯示視窗前輪詢伺服器（無空白畫面）              |
| **系統托盤**                | 最小化至托盤、變更連接埠、從托盤選單退出           |
| **連接埠管理**              | 從托盤變更伺服器連接埠（自動重新啟動伺服器）       |
| **內容安全策略**            | 透過工作階段標頭實施嚴格的 CSP                     |
| **單一實例**                | 一次只能執行一個應用程式實例                       |
| **離線模式**                | 內建 Next.js 伺服器，無需網路即可運作              |

### 環境變數

| 變數                   | 預設值  | 說明                              |
| ---------------------- | ------- | --------------------------------- |
| `OMNIROUTE_PORT`       | `20128` | 伺服器連接埠                       |
| `OMNIROUTE_MEMORY_MB`  | `512`   | Node.js 堆積限制（64–16384 MB）    |

📖 完整文件：[`electron/README.md`](../../electron/README.md)
