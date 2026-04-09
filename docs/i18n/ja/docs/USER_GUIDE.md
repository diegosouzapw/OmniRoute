# User Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../docs/USER_GUIDE.md) · 🇪🇸 [es](../../es/docs/USER_GUIDE.md) · 🇫🇷 [fr](../../fr/docs/USER_GUIDE.md) · 🇩🇪 [de](../../de/docs/USER_GUIDE.md) · 🇮🇹 [it](../../it/docs/USER_GUIDE.md) · 🇷🇺 [ru](../../ru/docs/USER_GUIDE.md) · 🇨🇳 [zh-CN](../../zh-CN/docs/USER_GUIDE.md) · 🇯🇵 [ja](../../ja/docs/USER_GUIDE.md) · 🇰🇷 [ko](../../ko/docs/USER_GUIDE.md) · 🇸🇦 [ar](../../ar/docs/USER_GUIDE.md) · 🇮🇳 [hi](../../hi/docs/USER_GUIDE.md) · 🇮🇳 [in](../../in/docs/USER_GUIDE.md) · 🇹🇭 [th](../../th/docs/USER_GUIDE.md) · 🇻🇳 [vi](../../vi/docs/USER_GUIDE.md) · 🇮🇩 [id](../../id/docs/USER_GUIDE.md) · 🇲🇾 [ms](../../ms/docs/USER_GUIDE.md) · 🇳🇱 [nl](../../nl/docs/USER_GUIDE.md) · 🇵🇱 [pl](../../pl/docs/USER_GUIDE.md) · 🇸🇪 [sv](../../sv/docs/USER_GUIDE.md) · 🇳🇴 [no](../../no/docs/USER_GUIDE.md) · 🇩🇰 [da](../../da/docs/USER_GUIDE.md) · 🇫🇮 [fi](../../fi/docs/USER_GUIDE.md) · 🇵🇹 [pt](../../pt/docs/USER_GUIDE.md) · 🇷🇴 [ro](../../ro/docs/USER_GUIDE.md) · 🇭🇺 [hu](../../hu/docs/USER_GUIDE.md) · 🇧🇬 [bg](../../bg/docs/USER_GUIDE.md) · 🇸🇰 [sk](../../sk/docs/USER_GUIDE.md) · 🇺🇦 [uk-UA](../../uk-UA/docs/USER_GUIDE.md) · 🇮🇱 [he](../../he/docs/USER_GUIDE.md) · 🇵🇭 [phi](../../phi/docs/USER_GUIDE.md) · 🇧🇷 [pt-BR](../../pt-BR/docs/USER_GUIDE.md) · 🇨🇿 [cs](../../cs/docs/USER_GUIDE.md) · 🇹🇷 [tr](../../tr/docs/USER_GUIDE.md)

---

プロバイダーの構成、コンボの作成、CLI ツールの統合、OmniRoute の展開に関する完全なガイド。---

## Table of Contents

- [価格の概要](#-価格の概要)
- [ユースケース](#-use-cases)
- [プロバイダーのセットアップ](#-provider-setup)
- [CLI統合](#-cli-integration)
- [展開](#-展開)
- [利用可能なモデル](#-available-models)
- [高度な機能](#-advanced-features)---

## 💰 Pricing at a Glance

| 階層                      | プロバイダー               | コスト                | クォータのリセット  | 最適な用途             |
| ------------------------- | -------------------------- | --------------------- | ------------------- | ---------------------- |
| **💳 サブスクリプション** | クロード・コード (プロ)    | $20/月                | 5 時間 + 毎週       | すでに購読済み         |
|                           | コーデックス (プラス/プロ) | $20-200/月            | 5 時間 + 毎週       | OpenAI ユーザー        |
|                           | ジェミニ CLI               | **無料**              | 180K/月 + 1K/日     | みんな！               |
|                           | GitHub コパイロット        | $10-19/月             | 月刊                | GitHub ユーザー        |
| **🔑 API キー**           | ディープシーク             | 使用ごとに支払い      | なし                | 安っぽい推論           |
|                           | グロク                     | 使用ごとに支払い      | なし                | 超高速推論             |
|                           | xAI (グロック)             | 使用ごとに支払い      | なし                | Grok 4 の推論          |
|                           | ミストラル                 | 使用ごとに支払い      | なし                | EU がホストするモデル  |
|                           | 困惑                       | 使用ごとに支払い      | なし                | 検索拡張               |
|                           | 一緒にAI                   | 使用ごとに支払い      | なし                | オープンソース モデル  |
|                           | 花火AI                     | 使用ごとに支払い      | なし                | 高速 FLUX 画像         |
|                           | 大脳                       | 使用ごとに支払い      | なし                | ウェーハスケールの速度 |
|                           | コヒア                     | 使用ごとに支払い      | なし                | コマンド R+ RAG        |
|                           | NVIDIA NIM                 | 使用ごとに支払い      | なし                | エンタープライズモデル |
| **💰安い**                | GLM-4.7                    | $0.6/100万            | 毎日午前 10 時      | 予算のバックアップ     |
|                           | ミニマックス M2.1          | $0.2/100万            | 5時間ローリング     | 最も安いオプション     |
|                           | キミ K2                    | 月額 9 ドルのフラット | 1,000 万トークン/月 | 予測可能なコスト       |
| **🆓 無料**               | コーダー                   | $0                    | 無制限              | 8 モデルは無料         |
|                           | クウェン                   | $0                    | 無制限              | 3 モデルは無料         |
|                           | キロ                       | $0                    | 無制限              | クロード・フリー       |

**💡 プロのヒント:**Gemini CLI (180K 無料/月) + Qoder (無制限の無料) コンボ = コスト 0 ドルから始めましょう!---

## 🎯 Use Cases

### Case 1: "I have Claude Pro subscription"

**問題:**大量のコーディング中にクォータが使用されずに期限切れになり、レート制限が発生する```
Combo: "maximize-claude"

1. cc/claude-opus-4-6 (use subscription fully)
2. glm/glm-4.7 (cheap backup when quota out)
3. if/kimi-k2-thinking (free emergency fallback)

Monthly cost: $20 (subscription) + ~$5 (backup) = $25 total
vs. $20 + hitting limits = frustration

````

### Case 2: "I want zero cost"

**問題:**サブスクリプションを購入する余裕がないため、信頼性の高い AI コーディングが必要です```
Combo: "free-forever"
  1. gc/gemini-3-flash         (180K free/month)
  2. if/kimi-k2-thinking       (unlimited free)
  3. qw/qwen3-coder-plus       (unlimited free)

Monthly cost: $0
Quality: Production-ready models
````

### Case 3: "I need 24/7 coding, no interruptions"

**問題:**締め切りが迫っており、ダウンタイムを許すことができません```
Combo: "always-on"

1. cc/claude-opus-4-6 (best quality)
2. cx/gpt-5.2-codex (second subscription)
3. glm/glm-4.7 (cheap, resets daily)
4. minimax/MiniMax-M2.1 (cheapest, 5h reset)
5. if/kimi-k2-thinking (free unlimited)

Result: 5 layers of fallback = zero downtime
Monthly cost: $20-200 (subscriptions) + $10-20 (backup)

````

### Case 4: "I want FREE AI in OpenClaw"

**問題:**メッセージング アプリには AI アシスタントが必要ですが、完全に無料です```
Combo: "openclaw-free"
  1. if/glm-4.7                (unlimited free)
  2. if/minimax-m2.1           (unlimited free)
  3. if/kimi-k2-thinking       (unlimited free)

Monthly cost: $0
Access via: WhatsApp, Telegram, Slack, Discord, iMessage, Signal...
````

---

## 📖 Provider Setup

### 🔐 Subscription Providers

#### Claude Code (Pro/Max)

```bash
Dashboard → Providers → Connect Claude Code
→ OAuth login → Auto token refresh
→ 5-hour + weekly quota tracking

Models:
  cc/claude-opus-4-6
  cc/claude-sonnet-4-5-20250929
  cc/claude-haiku-4-5-20251001
```

**プロのヒント:**複雑なタスクには Opus を使用し、速度を求める場合は Sonnet を使用します。 OmniRoute はモデルごとの割り当てを追跡します。#### OpenAI Codex (Plus/Pro)

```bash
Dashboard → Providers → Connect Codex
→ OAuth login (port 1455)
→ 5-hour + weekly reset

Models:
  cx/gpt-5.2-codex
  cx/gpt-5.1-codex-max
```

#### Gemini CLI (FREE 180K/month!)

```bash
Dashboard → Providers → Connect Gemini CLI
→ Google OAuth
→ 180K completions/month + 1K/day

Models:
  gc/gemini-3-flash-preview
  gc/gemini-2.5-pro
```

**ベストバリュー:**膨大な無料枠!有料レベルの前にこれを使用してください。#### GitHub Copilot

```bash
Dashboard → Providers → Connect GitHub
→ OAuth via GitHub
→ Monthly reset (1st of month)

Models:
  gh/gpt-5
  gh/claude-4.5-sonnet
  gh/gemini-3.1-pro-preview
```

### 💰 Cheap Providers

#### GLM-4.7 (Daily reset, $0.6/1M)

1. サインアップ: [Zhipu AI](https://open.bigmodel.cn/) 2.コーディングプランからAPIキーを取得
2. ダッシュボード → API キーの追加: プロバイダー: `glm`、API キー: `your-key`

**使用方法:**`glm/glm-4.7` —**プロのヒント:**コーディング プランは 1/7 のコストで 3 倍のクォータを提供します。毎日午前 10 時にリセットされます。#### MiniMax M2.1 (5h reset, $0.20/1M)

1. サインアップ：[MiniMax](https://www.minimax.io/)
2. APIキーの取得 → ダッシュボード → APIキーの追加

**使用方法:**`minimax/MiniMax-M2.1` —**プロのヒント:**長いコンテキスト (100 万トークン) の最も安価なオプション!#### Kimi K2 ($9/month flat)

1. 購読：[ムーンショット AI](https://platform.moonshot.ai/)
2. APIキーの取得 → ダッシュボード → APIキーの追加

**使用方法:**`kimi/kimi-latest` —**プロのヒント:**1,000 万トークンの固定 $9/月 = 0.90 ドル/100 万の実効コスト!### 🆓 FREE Providers

#### Qoder (8 FREE models)

```bash
Dashboard → Connect Qoder → OAuth login → Unlimited usage

Models: if/kimi-k2-thinking, if/qwen3-coder-plus, if/glm-4.7, if/minimax-m2, if/deepseek-r1
```

#### Qwen (3 FREE models)

```bash
Dashboard → Connect Qwen → Device code auth → Unlimited usage

Models: qw/qwen3-coder-plus, qw/qwen3-coder-flash
```

#### Kiro (Claude FREE)

```bash
Dashboard → Connect Kiro → AWS Builder ID or Google/GitHub → Unlimited

Models: kr/claude-sonnet-4.5, kr/claude-haiku-4.5
```

---

## 🎨 Combos

### Example 1: Maximize Subscription → Cheap Backup

```
Dashboard → Combos → Create New

Name: premium-coding
Models:
  1. cc/claude-opus-4-6 (Subscription primary)
  2. glm/glm-4.7 (Cheap backup, $0.6/1M)
  3. minimax/MiniMax-M2.1 (Cheapest fallback, $0.20/1M)

Use in CLI: premium-coding
```

### Example 2: Free-Only (Zero Cost)

```
Name: free-combo
Models:
  1. gc/gemini-3-flash-preview (180K free/month)
  2. if/kimi-k2-thinking (unlimited)
  3. qw/qwen3-coder-plus (unlimited)

Cost: $0 forever!
```

---

## 🔧 CLI Integration

### Cursor IDE

```
Settings → Models → Advanced:
  OpenAI API Base URL: http://localhost:20128/v1
  OpenAI API Key: [from omniroute dashboard]
  Model: cc/claude-opus-4-6
```

### Claude Code

`~/.claude/config.json` を編集します。```json
{
"anthropic_api_base": "http://localhost:20128/v1",
"anthropic_api_key": "your-omniroute-api-key"
}

````

### Codex CLI

```bash
export OPENAI_BASE_URL="http://localhost:20128"
export OPENAI_API_KEY="your-omniroute-api-key"
codex "your prompt"
````

### OpenClaw

`~/.openclaw/openclaw.json` を編集します。```json
{
"agents": {
"defaults": {
"model": { "primary": "omniroute/if/glm-4.7" }
}
},
"models": {
"providers": {
"omniroute": {
"baseUrl": "http://localhost:20128/v1",
"apiKey": "your-omniroute-api-key",
"api": "openai-completions",
"models": [{ "id": "if/glm-4.7", "name": "glm-4.7" }]
}
}
}
}

```

**またはダッシュボードを使用します:**CLI ツール → OpenClaw → 自動構成### Cline / Continue / RooCode

```

Provider: OpenAI Compatible
Base URL: http://localhost:20128/v1
API Key: [from dashboard]
Model: cc/claude-opus-4-6

````

---

## デプロイ

### Global npm install (Recommended)

```bash
npm install -g omniroute

# Create config directory
mkdir -p ~/.omniroute

# Create .env file (see .env.example)
cp .env.example ~/.omniroute/.env

# Start server
omniroute
# Or with custom port:
omniroute --port 3000
````

CLI は、`~/.omniroute/.env` または `./.env` から `.env` を自動的にロードします。### VPS Deployment

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
# Or: pm2 start npm --name omniroute -- start
```

### PM2 Deployment (Low Memory)

RAM が制限されているサーバーの場合は、メモリ制限オプションを使用します。```bash

# With 512MB limit (default)

pm2 start npm --name omniroute -- start

# Or with custom memory limit

OMNIROUTE_MEMORY_MB=512 pm2 start npm --name omniroute -- start

# Or using ecosystem.config.js

pm2 start ecosystem.config.js

````

「ecosystem.config.js」を作成します。```javascript
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
````

### Docker

```bash
# Build image (default = runner-cli with codex/claude/droid preinstalled)
docker build -t omniroute:cli .

# Portable mode (recommended)
docker run -d --name omniroute -p 20128:20128 --env-file ./.env -v omniroute-data:/app/data omniroute:cli
```

CLI バイナリを使用したホスト統合モードについては、メイン ドキュメントの Docker セクションを参照してください。### Void Linux (xbps-src)

Void Linux ユーザーは、「xbps-src」クロスコンパイル フレームワークを使用して、OmniRoute をネイティブにパッケージ化し、インストールできます。これにより、必要な「better-sqlite3」ネイティブ バインディングとともに Node.js スタンドアロン ビルドが自動化されます。

<詳細>

<summary><b>xbps-src テンプレートの表示</b></summary>```bash
# Template file for 'omniroute'
pkgname=omniroute
version=3.2.4
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

do_build() { # Determine target CPU arch for node-gyp
local \_gyp_arch
case "$XBPS_TARGET_MACHINE" in
aarch64*) \_gyp_arch=arm64 ;;
armv7*|armv6*) \_gyp_arch=arm ;;
i686*) \_gyp_arch=ia32 ;;
\*) \_gyp_arch=x64 ;;
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

````

</details>

### Environment Variables

|変数 |デフォルト |説明 |
| -------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| `JWT_SECRET` | `omniroute-default-secret-change-me` | JWT 署名シークレット (**本番環境での変更**) |
| `初期パスワード` | `123456` |初回ログインパスワード |
| `DATA_DIR` | `~/.omniroute` |データ ディレクトリ (データベース、使用状況、ログ) |
| `ポート` |フレームワークのデフォルト |サービスポート (例では「20128」) |
| `ホスト名` |フレームワークのデフォルト |ホストをバインドします (Docker のデフォルトは「0.0.0.0」です)。
| `NODE_ENV` |実行時のデフォルト |デプロイ用に「production」を設定 |
| `BASE_URL` | `http://localhost:20128` |サーバー側の内部ベース URL |
| `CLOUD_URL` | `https://omniroute.dev` |クラウド同期エンドポイントのベース URL |
| `API_KEY_SECRET` | `エンドポイント プロキシ API キー シークレット` |生成された API キーの HMAC シークレット |
| `REQUIRE_API_KEY` | `偽` | Bearer API キーを `/v1/*` に強制する |
| `ALLOW_API_KEY_REVEAL` | `偽` | API Manager が完全な API キーをオンデマンドでコピーできるようにする |
| `PROVIDER_LIMITS_SYNC_INTERVAL_MINUTES` | `70` |キャッシュされたプロバイダー制限データのサーバー側の更新頻度。 UI 更新ボタンは引き続き手動同期をトリガーします。
| `DISABLE_SQLITE_AUTO_BACKUP` | `偽` |書き込み/インポート/復元の前に自動 SQLite スナップショットを無効にします。手動バックアップは引き続き機能します。
| `APP_LOG_TO_FILE`                       | `true`                               | Enables application and audit log output to disk                                                          |
| `AUTH_COOKIE_SECURE` | `偽` | 「セキュア」認証 Cookie を強制する (HTTPS リバース プロキシの背後で) |
| `CLOUDFLARED_BIN` |設定を解除する |管理されたダウンロードの代わりに既存の「cloudflared」バイナリを使用します。
| `CLOUDFLARED_PROTOCOL` | `http2` |管理されたクイック トンネルのトランスポート (`http2`、`quic`、または `auto`) |
| `OMNIROUTE_MEMORY_MB` | `512` | Node.js ヒープ制限 (MB) |
| `PROMPT_CACHE_MAX_SIZE` | `50` |プロンプト キャッシュ エントリの最大数 |
| `SEMANTIC_CACHE_MAX_SIZE` | `100` |セマンティック キャッシュ エントリの最大数 |環境変数の完全なリファレンスについては、[README](../README.md) を参照してください。---

## 📊 Available Models

<詳細>
<summary><b>利用可能なすべてのモデルを表示する</b></summary>

**クロード コード (`cc/`)**— Pro/Max: `cc/claude-opus-4-6`、`cc/claude-sonnet-4-5-20250929`、`cc/claude-haiku-4-5-20251001`

**コーデックス (`cx/`)**— Plus/Pro: `cx/gpt-5.2-codex`、`cx/gpt-5.1-codex-max`

**Gemini CLI (`gc/`)**— 無料: `gc/gemini-3-flash-preview`、`gc/gemini-2.5-pro`

**GitHub コパイロット (`gh/`)**: `gh/gpt-5`、`gh/claude-4.5-sonnet`

**GLM (`glm/`)**— $0.6/1M: `glm/glm-4.7`

**MiniMax (`minimax/`)**— $0.2/1M: `minimax/MiniMax-M2.1`

**Qoder (`if/`)**— 無料: `if/kimi-k2- Thinking`、`if/qwen3-coder-plus`、`if/deepseek-r1`

**Qwen (`qw/`)**— 無料: `qw/qwen3-coder-plus`、`qw/qwen3-coder-flash`

**キロ (`kr/`)**— 無料: `kr/claude-sonnet-4.5`、`kr/claude-haiku-4.5`

**ディープシーク (`ds/`)**: `ds/deepseek-chat`、`ds/deepseek-reasoner`

**Groq (`groq/`)**: `groq/llama-3.3-70b-versatile`、`groq/llama-4-maverick-17b-128e-instruct`

**xAI (`xai/`)**: `xai/grok-4`、`xai/grok-4-0709-fast-reasoning`、`xai/grok-code-mini`

**ミストラル (`mistral/`)**: `mistral/mistral-large-2501`、`mistral/codestral-2501`

**混乱 (`pplx/`)**: `pplx/sonar-pro`、`pplx/sonar`

**Together AI (`together/`)**: `together/meta-llama/Llama-3.3-70B-Instruct-Turbo`

**Fireworks AI (`fireworks/`)**: `fireworks/accounts/fireworks/models/deepseek-v3p1`

**セレブラス (`cerebras/`)**: `cerebras/llama-3.3-70b`

**Cohere (`cohere/`)**: `cohere/command-r-plus-08-2024`

**NVIDIA NIM (`nvidia/`)**: `nvidia/nvidia/llama-3.3-70b-instruct`</details>

---

## 🧩 Advanced Features

### Custom Models

アプリの更新を待たずに、任意のモデル ID を任意のプロバイダーに追加します。```bash
# Via API
curl -X POST http://localhost:20128/api/provider-models \
  -H "Content-Type: application/json" \
  -d '{"provider": "openai", "modelId": "gpt-4.5-preview", "modelName": "GPT-4.5 Preview"}'

# List: curl http://localhost:20128/api/provider-models?provider=openai
# Remove: curl -X DELETE "http://localhost:20128/api/provider-models?provider=openai&model=gpt-4.5-preview"
````

または、ダッシュボードを使用します:**プロバイダー → [プロバイダー] → カスタム モデル**。

注:

- OpenRouter および OpenAI/Anthropic 互換プロバイダーは、**利用可能なモデル**からのみ管理されます。手動による追加、インポート、および自動同期はすべて同じ利用可能なモデルのリストに含まれるため、これらのプロバイダー用の個別のカスタム モデル セクションはありません。-**カスタム モデル**セクションは、管理された利用可能なモデルのインポートを公開しないプロバイダーを対象としています。### Dedicated Provider Routes

モデル検証を使用してリクエストを特定のプロバイダーに直接ルーティングします。```bash
POST http://localhost:20128/v1/providers/openai/chat/completions
POST http://localhost:20128/v1/providers/openai/embeddings
POST http://localhost:20128/v1/providers/fireworks/images/generations

````

プロバイダーのプレフィックスが存在しない場合は、自動的に追加されます。モデルが一致しない場合は「400」が返されます。### Network Proxy Configuration

```bash
# Set global proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"global": {"type":"http","host":"proxy.example.com","port":"8080"}}'

# Per-provider proxy
curl -X PUT http://localhost:20128/api/settings/proxy \
  -d '{"providers": {"openai": {"type":"socks5","host":"proxy.example.com","port":"1080"}}}'

# Test proxy
curl -X POST http://localhost:20128/api/settings/proxy/test \
  -d '{"proxy":{"type":"socks5","host":"proxy.example.com","port":"1080"}}'
````

**優先順位:**キー固有 → コンボ固有 → プロバイダー固有 → グローバル → 環境。### Model Catalog API

```bash
curl http://localhost:20128/api/models/catalog
```

タイプ (`chat`、`embedding`、`image`) を持つプロバイダーごとにグループ化されたモデルを返します。### Cloud Sync

- デバイス間でプロバイダー、コンボ、設定を同期します
- タイムアウト + フェイルファストによる自動バックグラウンド同期
- 運用環境ではサーバー側の `BASE_URL`/`CLOUD_URL` を優先します### Cloudflare Quick Tunnel

- Docker およびその他のセルフホスト型デプロイメントでは、**ダッシュボード → エンドポイント**で利用可能
- 現在の OpenAI 互換の `/v1` エンドポイントに転送する一時的な `https://*.trycloudflare.com` URL を作成します
- まず、必要な場合にのみ「cloudflared」のインストールを有効にします。後で再起動すると同じマネージドバイナリが再利用されます
- クイック トンネルは、OmniRoute またはコンテナの再起動後に自動復元されません。必要に応じてダッシュボードから再度有効化します
- トンネル URL は一時的なものであり、トンネルを停止/開始するたびに変更されます。
- マネージド クイック トンネルはデフォルトで HTTP/2 トランスポートになり、制限されたコンテナ内でのノイズの多い QUIC UDP バッファ警告を回避します
- マネージドトランスポートの選択をオーバーライドする場合は、「CLOUDFLARED_PROTOCOL=quic」または「auto」を設定します。
- 管理されたダウンロードの代わりにプレインストールされた `cloudflared` バイナリを使用したい場合は、`CLOUDFLARED_BIN` を設定します。### LLM Gateway Intelligence (Phase 9)

-**セマンティック キャッシュ**— 非ストリーミング、温度=0 の応答を自動キャッシュします (「X-OmniRoute-No-Cache: true」でバイパス) -**リクエスト冪等性**— `Idempotency-Key` または `X-Request-Id` ヘッダーを介して 5 秒以内にリクエストの重複を排除します。-**進行状況の追跡**— `X-OmniRoute-Progress: true` ヘッダーを介した SSE `event: progress` イベントのオプトイン---

### Translator Playground

**ダッシュボード → トランスレーター**からアクセスします。 OmniRoute がプロバイダー間で API リクエストをどのように変換するかをデバッグして視覚化します。

| モード                | 目的                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------- |
| **遊び場**            | ソース/ターゲット形式を選択し、リクエストを貼り付けると、翻訳された出力が即座に表示されます。 |
| **チャット テスター** | プロキシ経由でライブ チャット メッセージを送信し、完全な要求/応答サイクルを検査します。       |
| **テストベンチ**      | 複数の形式の組み合わせに対してバッチ テストを実行して、翻訳の正確さを検証します。             |
| **ライブモニター**    | リクエストがプロキシを通過するときにリアルタイムの翻訳を監視します。                          |

**使用例:**

- 特定のクライアント/プロバイダーの組み合わせが失敗する理由をデバッグする
- 思考タグ、ツール呼び出し、システム プロンプトが正しく翻訳されていることを確認します。
- OpenAI、Claude、Gemini、および Responses API 形式間の形式の違いを比較します。---

### Routing Strategies

**[ダッシュボード] → [設定] → [ルーティング]**から設定します。

| 戦略                         | 説明                                                                                                                                      |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| **最初に入力してください**   | 優先順位に従ってアカウントを使用します。プライマリ アカウントは利用できなくなるまですべてのリクエストを処理します。                       |
| **ラウンドロビン**           | 設定可能なスティッキー制限を使用して、すべてのアカウントを循環します (デフォルト: アカウントごとに 3 コール)。                            |
| **P2C (2 つの選択肢の累乗)** | ランダムな 2 つのアカウントを選択し、より健全なアカウントにルーティングします — 健康を意識しながら負荷のバランスをとります                |
| **ランダム**                 | Fisher-Yates shuffle                                                                                                                      | を使用してリクエストごとにアカウントをランダムに選択します。 |
| **使用頻度が最も低い**       | 最も古い「lastusedAt」タイムスタンプを持つアカウントにルーティングし、トラフィックを均等に分散します。                                    |
| **コストの最適化**           | 最も低い優先順位の値を持つアカウントにルーティングし、最もコストの低いプロバイダー向けに最適化します。#### External Sticky Session Header |

外部セッション アフィニティ (リバース プロキシの背後にある Claude Code/Codex エージェントなど) の場合は、次を送信します。```http
X-Session-Id: your-session-key

````

OmniRoute は「x_session_id」も受け入れ、有効なセッション キーを「X-OmniRoute-Session-Id」に返します。

Nginx を使用し、アンダースコア形式のヘッダーを送信する場合は、次を有効にします。```nginx
underscores_in_headers on;
````

#### Wildcard Model Aliases

ワイルドカード パターンを作成してモデル名を再マッピングします。```
Pattern: claude-sonnet-_ → Target: cc/claude-sonnet-4-5-20250929
Pattern: gpt-_ → Target: gh/gpt-5.1-codex

````

ワイルドカードは「*」（任意の文字）と「?」（単一文字）をサポートします。#### Fallback Chains

すべてのリクエストに適用されるグローバル フォールバック チェーンを定義します。```
Chain: production-fallback
  1. cc/claude-opus-4-6
  2. gh/gpt-5.1-codex
  3. glm/glm-4.7
````

---

### Resilience & Circuit Breakers

**ダッシュボード → 設定 → レジリエンス**から設定します。

OmniRoute は、次の 4 つのコンポーネントでプロバイダー レベルの復元力を実装します。

1.**プロバイダー プロファイル**— 以下のプロバイダーごとの構成:

- 失敗しきい値 (開くまでに何回失敗したか)
- クールダウン期間
- レート制限検出感度
- 指数バックオフパラメータ

  2.**編集可能なレート制限**— ダッシュボードで構成可能なシステムレベルのデフォルト: -**1 分あたりのリクエスト数 (RPM)**— アカウントごとの 1 分あたりの最大リクエスト数 -**リクエスト間の最小時間**— リクエスト間の最小ギャップ (ミリ秒単位) -**最大同時リクエスト**— アカウントあたりの最大同時リクエスト

- [**編集**] をクリックして変更し、**保存**または**キャンセル**をクリックします。値は復元 API を介して保持されます。

  3.**サーキット ブレーカー**— プロバイダーごとに障害を追跡し、しきい値に達すると自動的に回線を開きます。-**クローズ**(正常) — リクエストは正常に流れます -**OPEN**— プロバイダーは失敗が繰り返された後、一時的にブロックされています -**HALF_OPEN**— プロバイダーが回復したかどうかをテストします

  4.**ポリシーとロックされた識別子**— 強制ロック解除機能を備えたサーキット ブレーカーのステータスとロックされた識別子を表示します。

  5.**レート制限の自動検出**- 「429」ヘッダーと「Retry-After」ヘッダーを監視して、プロバイダーのレート制限に達することを事前に回避します。

**プロのヒント:**プロバイダーが停止から回復したときに、**すべてリセット**ボタンを使用して、すべてのサーキット ブレーカーとクールダウンをクリアします。---

### Database Export / Import

**[ダッシュボード] > [設定] > [システムとストレージ]**でデータベースのバックアップを管理します。

| アクション                       | 説明                                                                                                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **データベースのエクスポート**   | 現在の SQLite データベースを `.sqlite` ファイルとしてダウンロードします。                                                                                                      |
| **すべてエクスポート (.tar.gz)** | データベース、設定、コンボ、プロバイダー接続 (認証情報なし)、API キー メタデータを含む完全なバックアップ アーカイブをダウンロードします。                                      |
| **データベースのインポート**     | `.sqlite` ファイルをアップロードして現在のデータベースを置き換えます。 `DISABLE_SQLITE_AUTO_BACKUP=true` でない限り、インポート前のバックアップは自動的に作成されます。```bash |

# API: Export database

curl -o backup.sqlite http://localhost:20128/api/db-backups/export

# API: Export all (full archive)

curl -o backup.tar.gz http://localhost:20128/api/db-backups/exportAll

# API: Import database

curl -X POST http://localhost:20128/api/db-backups/import \
 -F "file=@backup.sqlite"

````

**インポートの検証:**インポートされたファイルは、整合性 (SQLite プラグマ チェック)、必要なテーブル (`provider_connections`、`provider_nodes`、`combos`、`api_keys`)、およびサイズ (最大 100MB) について検証されます。

**使用例:**

- マシン間で OmniRoute を移行する
- 災害復旧のために外部バックアップを作成する
- チームメンバー間で設定を共有（すべてエクスポート→アーカイブを共有）---

### Settings Dashboard

設定ページは 6 つのタブで構成されており、簡単にナビゲーションできます。

|タブ |目次 |
| -------------- | ---------------------------------------------------------------------------------------------- |
|**一般**|システム ストレージ ツール、外観設定、テーマ コントロール、項目ごとのサイドバーの表示設定 |
|**セキュリティ**|ログイン/パスワード設定、IP アクセス制御、`/models` の API 認証、およびプロバイダーのブロック |
|**ルーティング**|グローバル ルーティング戦略 (6 つのオプション)、ワイルドカード モデル エイリアス、フォールバック チェーン、コンボ デフォルト |
|**回復力**|プロバイダー プロファイル、編集可能なレート制限、サーキット ブレーカーのステータス、ポリシー、ロックされた識別子 |
|**AI**|予算構成、グローバル システム プロンプト インジェクション、プロンプト キャッシュ統計を考える |
|**上級**|グローバル プロキシ構成 (HTTP/SOCKS5) |---

### Costs & Budget Management

**[ダッシュボード] → [コスト]**からアクセスします。

|タブ |目的 |
| ----------- | -------------------------------------------------------------------------------------- |
|**予算**|日次/週次/月次の予算とリアルタイムの追跡を使用して、API キーごとに支出制限を設定 |
|**価格**|モデル価格エントリの表示と編集 - プロバイダーごとの 1K 入出力トークンあたりのコスト |```bash
# API: Set a budget
curl -X POST http://localhost:20128/api/usage/budget \
  -H "Content-Type: application/json" \
  -d '{"keyId": "key-123", "limit": 50.00, "period": "monthly"}'

# API: Get current budget status
curl http://localhost:20128/api/usage/budget
````

**コスト追跡:**すべてのリクエストはトークンの使用状況を記録し、価格表を使用してコストを計算します。**[ダッシュボード] → [使用状況]**で、プロバイダー、モデル、API キーごとの内訳を表示します。---

### Audio Transcription

OmniRoute は、OpenAI 互換エンドポイントを介した音声転写をサポートしています。```bash
POST /v1/audio/transcriptions
Authorization: Bearer your-api-key
Content-Type: multipart/form-data

# Example with curl

curl -X POST http://localhost:20128/v1/audio/transcriptions \
 -H "Authorization: Bearer your-api-key" \
 -F "file=@audio.mp3" \
 -F "model=deepgram/nova-3"

````

利用可能なプロバイダー:**Deepgram**(`deepgram/`)、**AssemblyAI**(`assemblyai/`)。

サポートされているオーディオ形式: `mp3`、`wav`、`m4a`、`flac`、`ogg`、`webm`。---

### Combo Balancing Strategies

**ダッシュボード → コンボ → 作成/編集 → 戦略**でコンボごとのバランスを設定します。

|戦略 |説明 |
| ------------------ | ---------------------------------------------------------------------- |
|**ラウンドロビン**|モデルを順番に回転します。
|**優先度**|常に最初のモデルを試します。エラーの場合のみフォールバック |
|**ランダム**|各リクエストのコンボからランダムなモデルを選択します。
|**加重**|モデルごとに割り当てられた重みに基づいて比例的にルーティングします。
|**Least-Used**    |最近のリクエストが最も少ないモデルにルーティングします (コンボ メトリックを使用) |
|**コストの最適化**|利用可能な最も安価なモデルへのルート (価格表を使用) |

グローバル コンボ デフォルトは、**[ダッシュボード] → [設定] → [ルーティング] → [コンボ デフォルト]**で設定できます。---

### Health Dashboard

**「ダッシュボード」→「ヘルス」**からアクセスします。 6 枚のカードによるリアルタイムのシステム状態の概要:

|カード |それが示すもの |
| --------------------- | -------------------------------------------------------- |
|**システムステータス**| Uptime, version, memory usage, data directory               |
|**プロバイダーの状態**|プロバイダーごとのサーキット ブレーカーの状態 (クローズ/オープン/ハーフオープン) |
|**レート制限**|アカウントごとのアクティブなレート制限クールダウンと残り時間 |
|**アクティブなロックアウト**|ロックアウト ポリシーによって一時的にブロックされたプロバイダー |
|**署名キャッシュ**|重複排除キャッシュの統計 (アクティブなキー、ヒット率) |
|**レイテンシ テレメトリ**|プロバイダーごとの p50/p95/p99 レイテンシの集計 |

**プロのヒント:**[ヘルス] ページは 10 秒ごとに自動更新されます。サーキット ブレーカー カードを使用して、どのプロバイダーで問題が発生しているかを特定します。---

## 🖥️ Desktop Application (Electron)

OmniRoute は、Windows、macOS、および Linux のネイティブ デスクトップ アプリケーションとして利用できます。### インストール

```bash
# From the electron directory:
cd electron
npm install

# Development mode (connect to running Next.js dev server):
npm run dev

# Production mode (uses standalone build):
npm start
````

### Building Installers

```bash
cd electron
npm run build          # Current platform
npm run build:win      # Windows (.exe NSIS)
npm run build:mac      # macOS (.dmg universal)
npm run build:linux    # Linux (.AppImage)
```

出力 → `electron/dist-electron/`### Key Features

| 特集                                 | 説明                                                                        |
| ------------------------------------ | --------------------------------------------------------------------------- | ------------------------- |
| **サーバーの準備状況**               | ウィンドウを表示する前にサーバーをポーリングします (空白の画面はありません) |
| **システム トレイ**                  | トレイに最小化、ポートを変更、トレイメニューから終了                        |
| **ポート管理**                       | トレイからサーバー ポートを変更する (サーバーの自動再起動)                  |
| **コンテンツ セキュリティ ポリシー** | セッションヘッダーによる制限的な CSP                                        |
| **単一インスタンス**                 | 一度に実行できるアプリ インスタンスは 1 つだけです                          |
| **オフライン モード**                | バンドルされた Next.js サーバーはインターネットなしで動作します             | ### Environment Variables |

| 変数                  | デフォルト | 説明                                |
| --------------------- | ---------- | ----------------------------------- |
| `オムニルート_ポート` | `20128`    | サーバーポート                      |
| `OMNIROUTE_MEMORY_MB` | `512`      | Node.js ヒープ制限 (64 ～ 16384 MB) |

📖 完全なドキュメント: [`electron/README.md`](../electron/README.md)
