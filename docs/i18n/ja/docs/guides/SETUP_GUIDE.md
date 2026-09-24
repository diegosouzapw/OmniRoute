# 📖 Setup Guide — OmniRoute (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/SETUP_GUIDE.md) · 🇪🇹 [am](../../../am/docs/guides/SETUP_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/guides/SETUP_GUIDE.md) · 🇦🇿 [az](../../../az/docs/guides/SETUP_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/guides/SETUP_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/guides/SETUP_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/guides/SETUP_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/guides/SETUP_GUIDE.md) · 🇩🇰 [da](../../../da/docs/guides/SETUP_GUIDE.md) · 🇩🇪 [de](../../../de/docs/guides/SETUP_GUIDE.md) · 🇬🇷 [el](../../../el/docs/guides/SETUP_GUIDE.md) · 🇪🇸 [es](../../../es/docs/guides/SETUP_GUIDE.md) · 🇪🇪 [et](../../../et/docs/guides/SETUP_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/guides/SETUP_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/guides/SETUP_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/guides/SETUP_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/guides/SETUP_GUIDE.md) · 🇮🇱 [he](../../../he/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/guides/SETUP_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/guides/SETUP_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/guides/SETUP_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/guides/SETUP_GUIDE.md) · 🇮🇩 [id](../../../id/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/guides/SETUP_GUIDE.md) · 🇮🇹 [it](../../../it/docs/guides/SETUP_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/guides/SETUP_GUIDE.md) · 🇰🇭 [km](../../../km/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/guides/SETUP_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/guides/SETUP_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/guides/SETUP_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/guides/SETUP_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/guides/SETUP_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/guides/SETUP_GUIDE.md) · 🇲🇲 [my](../../../my/docs/guides/SETUP_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/guides/SETUP_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/guides/SETUP_GUIDE.md) · 🇳🇴 [no](../../../no/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [or](../../../or/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/guides/SETUP_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/guides/SETUP_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/guides/SETUP_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/guides/SETUP_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/SETUP_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/guides/SETUP_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/guides/SETUP_GUIDE.md) · 🇱🇰 [si](../../../si/docs/guides/SETUP_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/guides/SETUP_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/guides/SETUP_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/guides/SETUP_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/guides/SETUP_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/guides/SETUP_GUIDE.md) · 🇮🇳 [te](../../../te/docs/guides/SETUP_GUIDE.md) · 🇹🇭 [th](../../../th/docs/guides/SETUP_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/guides/SETUP_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/SETUP_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/guides/SETUP_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/guides/SETUP_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/guides/SETUP_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/guides/SETUP_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/SETUP_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/SETUP_GUIDE.md)

---

> OmniRoute の完全なセットアップリファレンスです。簡易版については、[README のクイックスタート](../README.md#-quick-start)を参照してください。

## 目次

- [インストール方法](#install-methods)
- [CLI ツールの設定](#cli-tool-configuration)
- [プロトコルのセットアップ（MCP + A2A）](#protocol-setup-mcp--a2a)
- [タイムアウト設定](#timeout-configuration)
- [分割ポートモード](#split-port-mode)
- [Void Linux（xbps-src）](#void-linux-xbps-src-template)
- [アンインストール](#uninstalling)

---

## インストール方法

### npm（推奨）

```bash
npm install -g omniroute
omniroute
```

ダッシュボードは `http://localhost:20128` で開き、API のベース URL は `http://localhost:20128/v1` です。

### pnpm

```bash
pnpm add -g omniroute@latest --allow-build=better-sqlite3 --allow-build=@swc/core
omniroute
```

> **pnpm ユーザー向け:** `better-sqlite3` と `@swc/core` のネイティブビルドスクリプトを有効にするには、`--allow-build` フラグが必要です。pnpm v11 では、グローバルインストールに対して `pnpm approve-builds -g` コマンドはサポートされていません。

### Arch Linux（AUR）

```bash
yay -S omniroute-bin
systemctl --user enable --now omniroute.service
```

[AUR パッケージ](https://aur.archlinux.org/packages/omniroute-bin)は OmniRoute をインストールし、systemd ユーザーサービスを提供します。

### ソースからのインストール

```bash
npm install
PORT=20128 DASHBOARD_PORT=20129 NEXT_PUBLIC_BASE_URL=http://localhost:20129 npm run dev
```

> **Windows に関する注意:** デフォルトでは、従来の `%USERPROFILE%\.omniroute` ディレクトリが存在しない場合、OmniRoute は `%APPDATA%\omniroute` を使用します。別のデータディレクトリの場所を選択するには、`DATA_DIR` を設定してください。

> **注意:** `npm install` は初回実行時に `.env.example` から `.env` を自動生成します。それ以降のインストールでは既存の `.env` は上書きされないため、カスタマイズ内容は保持されます。再生成するには、再実行する前に `.env` を削除してください。

### Docker

Compose プロファイルや Caddy HTTPS を含む Docker の完全なセットアップについては、[Docker ガイド](./DOCKER_GUIDE.md)を参照してください。

### デスクトップアプリ（Electron）

OmniRoute には、Electron 41 + electron-builder 26.10 で構築されたデスクトップラッパーが付属しています。利用可能なスクリプト（ワークスペースルート）は次のとおりです。

```bash
npm run electron:dev          # ホットリロードを使用してデスクトップ版を実行
npm run electron:build        # 現在の OS 向けにビルド（自動検出）
npm run electron:build:win    # Windows インストーラー（NSIS + ポータブル）
npm run electron:build:mac    # macOS（dmg + zip、arm64+x64）
npm run electron:build:linux  # Linux（AppImage + deb + rpm）
npm run electron:smoke:packaged  # パッケージ化されたビルドのスモークテスト
```

デスクトップインストーラーのリリースは GitHub Releases に添付されています。Electron の詳細（署名、IPC ブリッジ、ディストリビューション）については、[`ELECTRON_GUIDE.md`](./ELECTRON_GUIDE.md)を参照してください _（後のフェーズで作成）_。

### ヘッドレスサーバー（CI/自動化）

無人セットアップ（Docker、Kubernetes、CI）には、次を使用します。

```bash
omniroute setup --non-interactive
omniroute providers test-batch
```

環境変数（`INITIAL_PASSWORD`、`OMNIROUTE_WS_BRIDGE_SECRET` など）と組み合わせることで、完全にスクリプト化可能な OmniRoute インスタンスを起動できます。

### CLI オプション

| コマンド                | 説明                                                                    |
| ----------------------- | ----------------------------------------------------------------------- |
| `omniroute`             | サーバーを起動（`PORT=20128`、API とダッシュボードは同じポート）        |
| `omniroute setup`       | パスワードと最初のプロバイダーを設定する対話形式の CLI オンボーディング |
| `omniroute doctor`      | サーバーを起動せずにローカルの健全性チェックを実行                      |
| `omniroute providers`   | CLI からプロバイダーを検出、一覧表示、検証、テスト                      |
| `omniroute config`      | CLI ツールの設定 — 設定の一覧表示、取得、設定、検証                     |
| `omniroute status`      | オフラインステータスダッシュボード — バージョン、DB、ツール、設定       |
| `omniroute logs`        | API から使用状況ログをストリーミング（`--follow` をサポート）           |
| `omniroute update`      | OmniRoute の更新を確認または適用                                        |
| `omniroute provider`    | プロバイダー接続を管理 — 追加、一覧表示、削除、テスト、デフォルト設定   |
| `omniroute --port 3000` | 正規/API ポートを 3000 に設定                                           |
| `omniroute --mcp`       | MCP サーバーを起動（stdio トランスポート）                              |
| `omniroute --no-open`   | ブラウザーを自動的に開かない                                            |
| `omniroute --help`      | ヘルプを表示                                                            |

ヘッドレスセットアップは、フラグまたは環境変数を使用してスクリプト化できます。

```bash
omniroute setup --non-interactive --password "$OMNIROUTE_PASSWORD"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY"
omniroute setup --non-interactive --add-provider --provider openai --api-key "$OPENAI_API_KEY" --test-provider
```

ダッシュボードを開かずにローカル診断を実行します。

```bash
omniroute doctor
omniroute doctor --json
omniroute doctor --no-liveness
```

ダッシュボードを開かずに、SSH またはスクリプトからプロバイダーを管理します。

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

## CLI ツールの設定

### 1) プロバイダーを接続して API キーを作成

1. Dashboard → `Providers` を開き、少なくとも 1 つのプロバイダーを接続します（OAuth または API キー）。
2. Dashboard → `Endpoints` を開き、API キーを作成します。
3. （任意）Dashboard → `Combos` を開き、フォールバックチェーンを設定します。

### 2) コーディングツールの接続先を設定

```txt
ベース URL: http://localhost:20128/v1
API キー:   [Endpoint ページからコピー]
モデル:     if/qwen3.8-max-preview（または任意のプロバイダー/モデルのプレフィックス）
```

エディターが `Authorization: Bearer ...` を送信できない場合は、代わりにトークン埋め込み形式の互換ベース URL を使用します。

```txt
ベース URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/
モデル URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/models
チャット URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/chat/completions
Ollama タグ URL: http://localhost:20128/api/v1/vscode/YOUR_KEY/api/tags
```

Claude Code、Codex CLI、Cursor、Cline、OpenClaw、OpenCode、および OpenAI 互換 SDK で動作します。

#### `setup-*` による自動設定

ベース URL とキーを手動で貼り付ける代わりに、OmniRoute にライブモデルカタログから各ツール固有の設定を書き込ませることができます。ツールごとにコマンドを 1 つ使用します。

```bash
omniroute setup-codex        # ~/.codex/<name>.config.toml プロファイル
omniroute setup-claude       # ~/.claude/profiles/<name>/settings.json
omniroute setup-opencode     # ~/.config/opencode/opencode.json（OpenAI 互換）
omniroute setup-cline        # Cline CLI + VS Code 拡張機能の設定
omniroute setup-kilo         # Kilo Code
omniroute setup-continue     # ~/.continue/config.yaml（Continue / cn）
omniroute setup-cursor       # Cursor のアプリ内設定手順を表示
omniroute setup-roo          # Roo Code のインポート + autoImport ポインター
omniroute setup-crush        # ~/.config/crush/crush.json
omniroute setup-goose        # ~/.config/goose/config.yaml
omniroute setup-aider        # ~/.aider.conf.yml
omniroute setup-qwen         # ~/.qwen/settings.json + ~/.qwen/.env
```

各コマンドでは `--remote <url> --api-key <key>` を指定して、ローカルツールを**リモート**の OmniRoute に接続するよう設定できます。また、`--dry-run` で設定内容を事前確認できます。適切な環境変数を注入し、設定を一切書き込まずに CLI を起動するには、汎用ランチャー `omniroute run <target>`（claude、codex、aider、goose、opencode、qwen、gemini）を使用します。従来のツール別ランチャー `omniroute launch`（Claude Code）および `omniroute launch-codex`（Codex）も引き続き利用できます。

完全な一覧（各コマンドが書き込む内容、すべてのフラグ、ローカルとリモートの違い、ベース URL の `/v1` 規則）については、**[CLI インテグレーション](./CLI-INTEGRATIONS.md)**を参照してください。

ツールごとの詳細な設定（Claude Code、Codex CLI、Cursor、Cline、OpenClaw、Kilo Code、Copilot など）については、専用の**[CLI ツールガイド](../reference/CLI-TOOLS.md)**を参照してください。

---

## プロトコルのセットアップ（MCP + A2A）

### MCP のセットアップ（Model Context Protocol）

stdio モードで MCP トランスポートを起動します。

```bash
omniroute --mcp
```

推奨される検証フロー：

```bash
# 1. MCP サーバーを起動
omniroute --mcp

# 2. MCP クライアントから以下を呼び出す：
omniroute_get_health        # システムの正常性が返されること
omniroute_list_combos       # アクティブなコンボが返されること

# 3. または、完全な E2E スイートを実行：
npm run test:protocols:e2e
```

#### MCP クライアントの設定

**Claude Code：**

```bash
claude mcp add-server omniroute --type http --url http://localhost:20128/api/mcp/stream
```

**Cursor / Cline：**

MCP 設定に以下を追加します。

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

**MCP の完全なドキュメント：** [MCP Server README](../../open-sse/mcp-server/README.md) — 110 個のツール、IDE 設定、Python/TS/Go クライアント。

### A2A のセットアップ（Agent-to-Agent Protocol）

Agent Card を確認します。

```bash
curl http://localhost:20128/.well-known/agent.json
```

タスクを送信します。

```bash
curl -X POST http://localhost:20128/a2a \
  -H 'content-type: application/json' \
  -d '{"jsonrpc":"2.0","id":"quickstart","method":"message/send","params":{"skill":"quota-management","messages":[{"role":"user","content":"Give me a short quota summary."}]}}'
```

**A2A の完全なドキュメント：** [A2A Server README](../../src/lib/a2a/README.md) — JSON-RPC 2.0、スキル、ストリーミング、タスクのライフサイクル。

---

## タイムアウト設定

### 基本的なタイムアウト

ほとんどのデプロイでは、次の2つの変数のみが必要です。

| 変数                     | デフォルト値                | 用途                                                                                                                                                                   |
| ------------------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUEST_TIMEOUT_MS`     | `600000`                    | アップストリームのレスポンス開始タイムアウト、Undici の内部タイムアウト、TLS フィンガープリント要求、および API ブリッジの要求／プロキシタイムアウトで共有される基準値 |
| `STREAM_IDLE_TIMEOUT_MS` | `REQUEST_TIMEOUT_MS` を継承 | OmniRoute が SSE ストリームを中断するまでの、ストリーミングチャンク間の最大待機時間                                                                                    |

後方互換性は維持されています。既存の `FETCH_TIMEOUT_MS`、`API_BRIDGE_PROXY_TIMEOUT_MS`、およびその他のレイヤー別タイムアウト変数も引き続き機能し、共有の基準値を上書きします。

### プロバイダー固有の注意事項

Claude Code 互換のアップストリーム（`anthropic-compatible-cc-*`）では、プロバイダー側の読み取りタイムアウトが環境設定と一致するように、OmniRoute は解決済みのフェッチタイムアウトから送信 `X-Stainless-Timeout` ヘッダーを生成します。

サードパーティー製の Claude Code 互換リバースプロキシでは、OmniRoute はデフォルトの `anthropic-beta` セットを保守的に維持し、`Client Cache Control` が `Auto` のままの場合は、クライアントから提供された `cache_control` マーカーのみを転送します。アップストリームが編集済みの Claude 思考ストリームを明示的に必要とする場合にのみ、接続ごとの「Enable redact-thinking beta」切り替えを有効にしてください。

### 高度なタイムアウトの上書き

| 変数                                     | デフォルト値                                | 用途                                                                                   |
| ---------------------------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------- |
| `FETCH_TIMEOUT_MS`                       | `REQUEST_TIMEOUT_MS` を継承                 | レスポンスヘッダーを受信するまで使用されるアップストリームのレスポンス開始タイムアウト |
| `FETCH_HEADERS_TIMEOUT_MS`               | `FETCH_TIMEOUT_MS` を継承                   | アップストリームのレスポンスヘッダーを受信するための Undici の制限時間                 |
| `FETCH_BODY_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS` を継承                   | アップストリームのボディチャンク間に対する Undici の制限時間（`0` で無効化）           |
| `FETCH_CONNECT_TIMEOUT_MS`               | `30000`                                     | Undici の TCP 接続タイムアウト                                                         |
| `FETCH_KEEPALIVE_TIMEOUT_MS`             | `4000`                                      | Undici のアイドル keep-alive ソケットタイムアウト                                      |
| `TLS_CLIENT_TIMEOUT_MS`                  | `FETCH_TIMEOUT_MS` を継承                   | `wreq-js` を介して行われる TLS フィンガープリント要求のタイムアウト                    |
| `API_BRIDGE_PROXY_TIMEOUT_MS`            | `REQUEST_TIMEOUT_MS` または `600000` を継承 | API ポートからダッシュボードポートへの `/v1` プロキシ転送のタイムアウト                |
| `API_BRIDGE_SERVER_REQUEST_TIMEOUT_MS`   | `max(API_BRIDGE_PROXY_TIMEOUT_MS, 300000)`  | API ブリッジサーバーでの受信要求タイムアウト                                           |
| `API_BRIDGE_SERVER_HEADERS_TIMEOUT_MS`   | `60000`                                     | API ブリッジサーバーでの受信ヘッダータイムアウト                                       |
| `API_BRIDGE_SERVER_KEEPALIVE_TIMEOUT_MS` | `5000`                                      | API ブリッジサーバーでの keep-alive タイムアウト                                       |
| `API_BRIDGE_SERVER_SOCKET_TIMEOUT_MS`    | `0`                                         | API ブリッジサーバーでのソケット非アクティブタイムアウト（`0` で無効化）               |

> **注:** ストリーミング要求の場合、`FETCH_TIMEOUT_MS` が対象とするのは、接続のセットアップおよびアップストリームからの最初のレスポンスを待機する時間のみです。ストリームがアクティブになった後、OmniRoute が中断するのは、実際に停止状態になった場合（`STREAM_IDLE_TIMEOUT_MS`）または Undici のボディが非アクティブになった場合（`FETCH_BODY_TIMEOUT_MS`）のみです。

### リバースプロキシの互換性

Nginx、Caddy、Cloudflare、またはその他のリバースプロキシの背後で OmniRoute を実行する場合は、プロキシのタイムアウトも OmniRoute のストリーム／フェッチタイムアウトより長く設定してください。

---

## ポート分割モード

高度なシナリオ（リバースプロキシ、コンテナネットワーク）のために、API とダッシュボードを別々のポートで実行します：

```bash
PORT=20128 DASHBOARD_PORT=20129 omniroute
# API:             http://localhost:20128/v1
# ダッシュボード: http://localhost:20129
```

---

## Void Linux（xbps-src）テンプレート

Void Linux ユーザーは、`xbps-src` を使用してネイティブパッケージをビルドできます。このブロックを `srcpkgs/omniroute/template` として保存してください：

```bash
# 'omniroute' のテンプレートファイル
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
# リリースごとに次のコマンドでチェックサムを再生成してください：
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

## アンインストール

| コマンド                 | 操作                                                                            |
| ------------------------ | ------------------------------------------------------------------------------- |
| `npm run uninstall`      | システムアプリを削除しますが、`~/.omniroute` 内の **DB と設定は保持されます**。 |
| `npm run uninstall:full` | アプリを削除し、さらに **すべての設定、キー、データベースを完全に消去します**。 |

> すべての方法についての詳細なアンインストール手順は、[UNINSTALL.md](./UNINSTALL.md) を参照してください。
