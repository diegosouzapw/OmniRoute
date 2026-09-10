# CLI-INTEGRATIONS (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

---

title: "CLI統合 — OmniRouteに任意のコーディングCLIをポイントする"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI統合

OmniRouteは、コーディングCLI（Codex、Claude Code、OpenCode、Clineなど）をOmniRouteをバックエンドとして使用するように設定する`setup-*`コマンドのファミリーを提供します。これにより、ツールは**1つの**エンドポイントと通信し、OmniRouteが自動的に適切なプロバイダーにルーティングします。各コマンドは、実行中のOmniRoute（ローカルまたはリモート）から**ライブ**モデルカタログを読み取り、**あなたの**マシン上にツール自身の設定ファイルを書き込みます。APIキーは、ツールがサポートする場所で環境変数によって参照されます。ツールローカルの環境ファイルを永続化するコマンドは、以下に記載されています。

また、`omniroute run <target>`という汎用ランチャーもあり、適切な環境を注入して`claude`、`codex`、`aider`、`goose`、`opencode`、`qwen`、または`gemini`を起動します。設定ファイルは一切書き込まれません。ターゲットとそのエイリアスは、標準的なマニフェスト`bin/cli/cli-manifest.mjs`から取得されます（`claude-code|cc|anthropic`、`codex-cli|openai-codex|openai`、`goose-cli`、`open-code`、`qwen-code`、`gemini-cli`）、`omniroute completion`は同じマニフェストから派生したターゲットワードを提供します。レガシーのツールごとのランチャーである`omniroute launch`（Claude Code）と`omniroute launch-codex`（Codex）は引き続き利用可能です。

プロバイダーのオンボーディングは、同じローカル/リモートコンテキストから利用可能です。以下のAPIファーストコマンドは、管理認証をプロバイダーの資格情報から分離し、構造化された出力に資格情報を決して表示しません：

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

スクリプトの場合は、`--credential-stdin`または`--credential-env`を優先してください；`--credential`は制御されたローカル使用のために保持されています。`providers remove`は非対話型ターミナルで`--yes`を必要とし、すべての5つのコマンドはアクティブなコンテキストまたはグローバルな`--base-url`/`--api-key`オプションを尊重します。

2つの最もリッチな統合のための一度きりの手書きの基本設定については、ツールごとの詳細を参照してください：

- [Claude Code設定](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI設定](./CODEX-CLI-CONFIGURATION.md)
- [リモートモード](./REMOTE-MODE.md) — ラップトップからリモートOmniRoute（VPS / Tailnet）を操作する
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot拡張機能；エディタ内からこれらの`setup-*`コマンドを実行することもできます

---

## マスターテーブル

すべてのコマンドは、**アクティブなコンテキスト**（`omniroute connect`で設定、[リモートモード](./REMOTE-MODE.md)を参照）または明示的な`--remote <url> --api-key <key>`フラグを尊重します。以下の「ローカル対リモート」とは、フラグなしで`http://localhost:20128`をターゲットにし、`--remote`（またはアクティブなリモートコンテキスト）でそのサーバーからカタログを取得し、ローカルに設定を書き込むことを意味します。

| コマンド                   | ツール                 | 書き込む内容                                                                                                                                         | 主要フラグ                                                                                                                                 | ローカル対リモート |
| -------------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `omniroute setup-codex`    | OpenAI Codex CLI       | `~/.codex/<name>.config.toml` — 互換性のあるテキストモデルごとに1つのプロファイル（`codex --profile <name>`）                                        | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | 両方               |
| `omniroute setup-claude`   | Claude Code            | `~/.claude/profiles/<name>/settings.json` — 一致するモデルごとに1つのプロファイル（`CLAUDE_CONFIG_DIR`）                                             | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | 両方               |
| `omniroute setup-opencode` | OpenCode（openai互換） | `~/.config/opencode/opencode.json` — すべてのカタログモデルを持つ`omniroute`プロバイダー（`opencode -m omniroute/<model>`）                          | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | 両方               |
| `omniroute setup-cline`    | Cline                  | `~/.cline/data/{globalState,secrets}.json`（CLIモード） + VS Code拡張設定を印刷                                                                      | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | 両方               |
| `omniroute setup-kilo`     | Kilo Code              | `~/.local/share/kilo/auth.json`（CLI） + 存在する場合は`kilocode.*`をVS Code `settings.json`にマージ                                                 | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | 両方               |
| `omniroute setup-continue` | Continue / `cn` CLI    | `~/.continue/config.yaml` — `provider: openai`モデル、キーは`${{ secrets.OMNIROUTE_API_KEY }}`                                                       | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 両方               |
| `omniroute setup-cursor`   | Cursor                 | 何も書き込まない — アプリ内の手順を印刷（Cursorの設定は不透明なSQLite）                                                                              | `--remote` `--api-key` `--only` `--port`                                                                                                   | 両方               |
| `omniroute setup-roo`      | Roo Code               | `~/.omniroute/roo-settings.json`（インポートドキュメント） + VS Codeの`settings.json`が存在する場合は`roo-cline.autoImportSettingsPath`を設定        | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | 両方               |
| `omniroute setup-crush`    | Crush                  | `~/.config/crush/crush.json` — `openai-compat`プロバイダー、キーは`$OMNIROUTE_API_KEY`                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 両方               |
| `omniroute setup-goose`    | Goose                  | `~/.config/goose/config.yaml`（`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`） + 環境レシピを印刷                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 両方               |
| `omniroute setup-aider`    | Aider                  | `~/.aider.conf.yml`（`openai-api-base` + `model: openai/<id>`） + 環境レシピを印刷                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 両方               |
| `omniroute setup-qwen`     | Qwen Code              | `~/.qwen/settings.json` — V4 `modelProviders.openai`配列 + `OMNIROUTE_API_KEY`は`~/.qwen/.env`に                                                     | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | 両方               |
| `omniroute run <target>`   | ランタイム起動（汎用） | 何も書き込まない — 適切な環境と引数で`claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`を起動；QwenとGeminiは一時的な隔離されたホームを使用 | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | 両方               |
| `omniroute launch`         | Claude Code            | 何も書き込まない — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`を注入して`claude`を起動                                                               | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | 両方               |
| `omniroute launch-codex`   | OpenAI Codex CLI       | 何も書き込まない — `-c`フラグを介して`omniroute`プロバイダーを注入して`codex`を起動                                                                  | `--remote` `--api-key` `--profile` (`-p`) `--port`                                                                                         | 両方               |

フラグに関する注意事項（コマンドソースで確認済み）：

- `--remote <url>` — リモートOmniRouteからカタログを取得します（`--port`およびアクティブなコンテキストをオーバーライドします）。`--api-key <key>`はそのサーバーの資格情報を提供します（デフォルトは`OMNIROUTE_API_KEY`環境変数、またはアクティブなコンテキストのトークンです）。
- `--only <patterns>` — カンマ区切りの部分文字列；一致するモデルIDのみを保持します（例：`--only glm,kimi`）。`setup-codex`、`setup-claude`、`setup-opencode`、`setup-continue`、`setup-cursor`、`setup-crush`で利用可能です。
- `--dry-run` — ファイルシステムに触れずに、正確に何が書き込まれるかを印刷します。すべての`setup-*`コマンドで利用可能ですが、`setup-cursor`（ファイルを書き込まない）を除きます。
- `--model <id>` — モデルの自動検出がないツールに必要（または対話的に選択）：Cline、Kilo、Roo、Goose、Qwen、Aider。これらのツールは、非対話型実行のために`--yes`も受け入れます（その場合は`--model`が必要です）。`setup-opencode`はデフォルトのトップレベルモデルを設定するために`--model`を受け入れます。
- `--model <id>`は`omniroute run`でマニフェストのターゲットごとの配線に従います（`bin/cli/cli-manifest.mjs`）：**aider**は`--model openai/<id>`を受け取り、**opencode**は`--model omniroute/<id>`を受け取ります（プレフィックスはIDがすでにそれを持っていない場合にのみ追加されます）；**qwen**と**gemini**はIDをそのまま受け取り、**claude**は`ANTHROPIC_MODEL`を介して、**goose**は`GOOSE_MODEL`を介して、**codex**は`-c model_providers.omniroute.*`引数を介して受け取ります。**Qwenは唯一の実行ターゲットで、`--model`が必須です** — `omniroute run qwen`はそれなしでは`2`で明示的なエラーで終了します。
- `--port <port>` — ローカルOmniRouteポート（デフォルトは`20128`、`--remote`が設定されている場合は無視されます）。すべての`setup-*`および両方のランチャーに存在します。
- `omniroute run`の終了コード：子CLIの独自の終了コードがそのまま伝播されます；`2` = 無効な引数（サポートされていないターゲット、必要な`--model`が欠如、コンテナガード）；`127` = ターゲットバイナリが`PATH`に存在しない；`130`/`143`/`129`は`SIGINT`/`SIGTERM`/`SIGHUP`によって起動が終了されたとき；`1` = その他のランタイム起動失敗。
- 2つのランチャー（`launch`、`launch-codex`）は、`setup-claude` / `setup-codex`によって書き込まれたプロファイルを選択するために`--profile <name>`を受け入れ、基盤となる`claude` / `codex`バイナリのための引き継ぎ引数を渡します。

インタラクティブピッカーは、設定レシピでも共有されています：

```bash
# アクティブなローカルまたはリモートモデルカタログから選択し、ターゲットを設定します。
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure`は現在、`codex`、`claude`、`opencode`、`qwen`、`aider`、`goose`、`cline`、`continue`、および`kilo`のテストされたレシピに委任しています。IDE専用、MITM、およびガイド専用のカタログエントリは、明示的な`setup-*`/手動フローとして残り、起動可能なターゲットとしては提示されません。

> `setup-opencode`は**軽量なopenai互換**のOpenCode統合です。
> よりリッチなプラグイン統合もあります — `omniroute setup opencode` — これは`@omniroute/opencode-plugin`をインストールします。これらは異なるコマンドです；上のテーブルは`setup-opencode`を文書化しています。

---

## ローカル使用法

`localhost:20128` で OmniRoute が実行されている場合、ツールのセットアップコマンドを実行するだけです。カタログはローカルサーバーから取得されます。

```bash
# Codex: 一致したモデルごとに ~/.codex/ にプロファイルを書き込む
omniroute setup-codex
codex --profile glm52            # 生成されたプロファイルを使用

# Claude Code: モデルごとのプロファイルを書き込み、その後一つを起動
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: すべてのカタログモデルを持つ openai 互換プロバイダーを書き込む
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} 経由で参照、ディスク上には保存しない
opencode -m omniroute/glm/glm-5.2 "..."

# 自動検出がないツールには明示的なモデルが必要です：
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# 何も書き込まずにプレビュー：
omniroute setup-continue --dry-run
```

全く設定を書き込まずに起動する（環境注入のみ）：

```bash
omniroute launch                 # Claude Code → ローカル OmniRoute
omniroute launch-codex           # Codex CLI → ローカル OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# 明示的なコマンドパス： -- の後に続くものを通過させる
omniroute run claude -- --print-system-prompt "この差分をレビュー"
```

---

## リモート使用法

リモート OmniRoute に対してセットアップコマンドを `--remote` + `--api-key` で指定します。カタログはリモートから取得され、設定はローカルマシンに書き込まれます。

```bash
# リモート VPS に対する OpenCode、glm/kimi モデルのみを保持
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # まず OMNIROUTE_API_KEY をエクスポート

# リモートカタログからの Codex プロファイル
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# リモートに対して CLI を直接起動
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

毎回 `--remote`/`--api-key` を渡す代わりに、一度ログインして **アクティブコンテキスト** が自動的にそれらを供給するようにします：

```bash
omniroute connect 192.168.0.15        # スコープ付きトークンを生成し、コンテキストを保存
omniroute setup-codex                 # ← 現在リモートカタログを使用
omniroute setup-opencode              # ← 同じ
omniroute launch                      # ← リモートに対する Claude Code
```

コンテキスト、スコープ、およびトークン管理については [リモートモード](./REMOTE-MODE.md) を参照してください。

---

## ベース URL 規約（ツールが `/v1` を要求する場合）

OmniRoute は `/v1` で OpenAI サーフェスを公開し、ルートで Anthropic サーフェスを、`/v1beta` でネイティブ Gemini サーフェスを公開します。各統合は、そのツールが期待する形式に接続されています（コマンドソースで確認済み）：

| 統合                                                                       | 書き込まれたベース URL | `/v1`?                                                  |
| -------------------------------------------------------------------------- | ---------------------- | ------------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | ルート                 | いいえ — Cline は `/v1/chat/completions` を追加します   |
| `setup-goose` (`OPENAI_HOST`)                                              | ルート                 | いいえ — Goose はパスを追加します                       |
| `setup-aider` (`OPENAI_API_BASE`)                                          | ルート                 | いいえ — LiteLLM は `/v1/chat/completions` を追加します |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` 付き             | はい                                                    |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | ルート                 | いいえ — Claude Code は `/v1/messages` を追加します     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` 付き             | はい                                                    |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` 付き             | はい                                                    |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | ルート                 | いいえ — SDK は `/v1beta/models/…` を追加します         |

---

## ネイティブ依存関係の更新を維持する: `--include=optional`

`omniroute update` を使用して更新する際（確認後、または `--apply` を使用して）、OmniRoute は `--include=optional` を組み込んでインストールを実行します:

```bash
npm install -g omniroute@latest --include=optional
```

これは `omniroute update` に渡すフラグではありません — 常にアップデーターによって適用されます。これにより、`optionalDependencies`（`better-sqlite3`、`keytar`、`tls-client`、LLMLingua SLM スタック）が更新後も生き残ることが保証されます。たとえ npm 設定に `omit=optional` が設定されていても、そうでなければネイティブ SQLite ドライバーと OS キーリングバインディングが静かに削除されてしまいます。適用せずに正確なコマンドをプレビューするには:

```bash
omniroute update --dry-run
# [DRY RUN] 実行されるコマンド: npm install -g omniroute@latest --include=optional
```

他の `omniroute update` フラグ（ソースで確認済み）: `--check`（古い場合は 1 で終了）、`--apply`（プロンプトなしでインストール）、`--changelog`、`--no-backup`、`--yes`。

---

## `omniroute run gemini` を介した Google Gemini CLI

契約は `@google/gemini-cli` 0.50.0 に対して確認済み: CLI は `GOOGLE_GEMINI_BASE_URL` を尊重し、`POST /v1beta/models/<model>:generateContent`（および `:streamGenerateContent?alt=sse`）を発行します — まさに OmniRoute のネイティブ Gemini サーフェス（`/v1beta`）です。`omniroute run gemini` はそれを自動的に接続します:

- `GOOGLE_GEMINI_BASE_URL` → アクティブな OmniRoute ベース URL（ルート、`/v1` は含まない）;
- `GEMINI_API_KEY` → 解決された OmniRoute 資格情報（オプション/環境/コンテキスト）;
- **一時的な隔離された `GEMINI_CLI_HOME`** その `.gemini/settings.json` が `gemini-api-key` 認証を選択し、保存された Google OAuth セッション（Code Assist）が OmniRoute 指向の起動を上書きしないようにします — 終了後に削除されます;
- **環境の衛生**: 子環境は `GOOGLE_API_KEY`、`GOOGLE_GENAI_USE_VERTEXAI`、`GOOGLE_GENAI_USE_GCA` を削除します（これらは認証を Vertex/Code Assist にリダイレクトします）、そして `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` がベルトとサスペンダーのバックアップとして設定されます — 他の `run` ターゲットもそれぞれの競合する変数に対して同様の処理を受けます;
- `--model <id>` の注入は `--provider`/`--model` から行われます。

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini のワークスペース信頼ガードはヘッドレスモードでも適用されます — `--skip-trust` を渡すか（またはディレクトリをインタラクティブに信頼する）必要があります; ランチャーは故意にそれをバイパスしません。このランチャーは **ACP 登録**（`src/lib/acp/registry.ts`、`gemini --acp`）とは異なり、`/dashboard/acp-agents` のエージェントプロトコル統合として残ります。

---

## 実際のスモークスイープ（オプトイン）

決定論的なランプラン回帰が CI で実行されます（`tests/unit/cli/run-command.test.ts`、`tests/unit/cli/run-execution.test.ts`）。REAL バイナリを REAL OmniRoute サーバーに対して検証するために、オプトインハーネスが存在します `tests/integration/upstream-cli-smoke.int.test.ts`。これは自動的には実行されず（`RUN_CLI_SMOKE=1` でない限り、すべてのサブテストはスキップされます）、環境変数 NAME で資格情報を渡し（値ではなく）、記録された出力からキー状の文字列を隠し、インストールされていないバイナリのターゲットをスキップし、失敗を認証 / アップストリーム / 設定として分類します（単なるブール値ではありません）:

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

オプション: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` はスイープを制限します; `OMNIROUTE_SMOKE_TIMEOUT_MS` は 120 秒のターゲットごとのタイムアウトをオーバーライドします。

---

## 参照

- [Claude Code 設定](./CLAUDE-CODE-CONFIGURATION.md) — より深い Claude Code ガイド
- [Codex CLI 設定](./CODEX-CLI-CONFIGURATION.md) — 一度だけの `[model_providers.omniroute]` 基本設定
- [リモートモード](./REMOTE-MODE.md) — コンテキスト、スコープ付きアクセストークン、リモートサーバーの操作
- [CLI ツールリファレンス](../reference/CLI-TOOLS.md) — サポートされているツール + ダッシュボードページの完全カタログ
- [セットアップガイド](./SETUP_GUIDE.md) — インストール方法と初回オンボーディング
