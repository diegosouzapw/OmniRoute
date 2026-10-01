# CLI Integrations (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/CLI-INTEGRATIONS.md) · 🇪🇹 [am](../../../am/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇦 [ar](../../../ar/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇿 [az](../../../az/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇬 [bg](../../../bg/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇩 [bn](../../../bn/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇦 [bs](../../../bs/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇿 [cs](../../../cs/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇰 [da](../../../da/docs/guides/CLI-INTEGRATIONS.md) · 🇩🇪 [de](../../../de/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇷 [el](../../../el/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇸 [es](../../../es/docs/guides/CLI-INTEGRATIONS.md) · 🇪🇪 [et](../../../et/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇷 [fa](../../../fa/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇮 [fi](../../../fi/docs/guides/CLI-INTEGRATIONS.md) · 🇫🇷 [fr](../../../fr/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇪 [ga](../../../ga/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [gu](../../../gu/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ha](../../../ha/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇱 [he](../../../he/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [hi](../../../hi/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇷 [hr](../../../hr/docs/guides/CLI-INTEGRATIONS.md) · 🇭🇺 [hu](../../../hu/docs/guides/CLI-INTEGRATIONS.md) · 🇦🇲 [hy](../../../hy/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇩 [id](../../../id/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [ig](../../../ig/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇹 [it](../../../it/docs/guides/CLI-INTEGRATIONS.md) · 🇬🇪 [ka](../../../ka/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇭 [km](../../../km/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [kn](../../../kn/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇷 [ko](../../../ko/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇹 [lt](../../../lt/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇻 [lv](../../../lv/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ml](../../../ml/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [mr](../../../mr/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇾 [ms](../../../ms/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇹 [mt](../../../mt/docs/guides/CLI-INTEGRATIONS.md) · 🇲🇲 [my](../../../my/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇵 [ne](../../../ne/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇱 [nl](../../../nl/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇴 [no](../../../no/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [or](../../../or/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [pa](../../../pa/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇭 [phi](../../../phi/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇱 [pl](../../../pl/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇹 [pt](../../../pt/docs/guides/CLI-INTEGRATIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇴 [ro](../../../ro/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇺 [ru](../../../ru/docs/guides/CLI-INTEGRATIONS.md) · 🇱🇰 [si](../../../si/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇰 [sk](../../../sk/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇮 [sl](../../../sl/docs/guides/CLI-INTEGRATIONS.md) · 🇷🇸 [sr](../../../sr/docs/guides/CLI-INTEGRATIONS.md) · 🇸🇪 [sv](../../../sv/docs/guides/CLI-INTEGRATIONS.md) · 🇰🇪 [sw](../../../sw/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [ta](../../../ta/docs/guides/CLI-INTEGRATIONS.md) · 🇮🇳 [te](../../../te/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇭 [th](../../../th/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇷 [tr](../../../tr/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/CLI-INTEGRATIONS.md) · 🇵🇰 [ur](../../../ur/docs/guides/CLI-INTEGRATIONS.md) · 🇺🇿 [uz](../../../uz/docs/guides/CLI-INTEGRATIONS.md) · 🇻🇳 [vi](../../../vi/docs/guides/CLI-INTEGRATIONS.md) · 🇳🇬 [yo](../../../yo/docs/guides/CLI-INTEGRATIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/CLI-INTEGRATIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/CLI-INTEGRATIONS.md)

---

OmniRouteは、コーディングCLI（Codex、Claude Code、OpenCode、Clineなど）をOmniRouteをバックエンドとして使用するように設定する`setup-*`コマンド群を提供しています。これにより、ツールは**1つ**のエンドポイントと通信し、OmniRouteが自動フォールバック付きで適切なプロバイダーにルーティングします。各コマンドは、実行中のOmniRoute（ローカルまたはリモート）から**ライブ**モデルカタログを読み取り、**あなたの**マシンにツールの設定ファイルを書き込みます。APIキーは、ツールがサポートする場所では環境変数によって参照されます。ツールローカルの環境ファイルを永続化するコマンドは以下に記載されています。

また、汎用ランチャー `omniroute run <target>` もあり、これは設定を一切書き込まずに、適切な環境を注入して `claude`、`codex`、`aider`、`goose`、`opencode`、`qwen`、または `gemini` を起動します。ターゲットとそのエイリアスは、正規のマニフェスト `bin/cli/cli-manifest.mjs`（`claude-code|cc|anthropic`、`codex-cli|openai-codex|openai`、`goose-cli`、`open-code`、`qwen-code`、`gemini-cli`）から取得され、`omniroute completion` は同じマニフェスト由来のターゲットワードを提供します。レガシーなツールごとのランチャー — `omniroute launch` (Claude Code) および `omniroute launch-codex` (Codex) — も引き続き利用可能です。

プロバイダーのオンボーディングは、同じローカル/リモートコンテキストから利用できます。以下のAPIファーストコマンドは、管理認証をプロバイダーの認証情報とは別に保ち、構造化された出力に認証情報を表示することはありません。

```bash
omniroute providers add glm --credential-env GLM_API_KEY --name work
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth openai
omniroute providers edit <connection-id> --default-model glm/glm-5.2
omniroute providers remove <connection-id> --yes
```

スクリプトでは、`--credential-stdin` または `--credential-env` を推奨します。`--credential` は、制御されたローカル使用のために保持されています。非対話型ターミナルでは `providers remove` に `--yes` が必要であり、これら5つのコマンドはすべてアクティブなコンテキストまたはグローバルな `--base-url`/`--api-key` オプションを尊重します。

プロバイダーセレクターは、曖昧なIDプレフィックス、名前、またはプロバイダー名を拒否します。複数の接続が一致する場合は、完全な接続IDを使用してください。作成および編集コマンドは保存された接続を読み戻し、削除はそれがもはや読み取り不可能であることを検証します。インポートは、既存のプロバイダー/名前のペアをスキップします。インポートされたエントリは、CLIに提供された管理エンドポイント、コンテキスト、または管理認証情報を上書きすることはできません。

最も豊富な2つの統合の一度限りの手動による基本設定については、ツールごとの詳細な解説を参照してください。

- [Claude Code の設定](./CLAUDE-CODE-CONFIGURATION.md)
- [Codex CLI の設定](./CODEX-CLI-CONFIGURATION.md)
- [リモートモード](./REMOTE-MODE.md) — ラップトップからリモートのOmniRoute（VPS / Tailnet）を操作する
- [VS Code Copilot Chat](./VSCODE-COPILOT.md) — OmniCopilot拡張機能。エディター内からこれらの `setup-*` コマンドを実行することもできます

---

## マスター表

すべてのコマンドは、**アクティブなコンテキスト**（`omniroute connect` で設定。詳細は
[リモートモード](./REMOTE-MODE.md)を参照）または明示的な `--remote <url> --api-key <key>` フラグに従います。
以下の「ローカルとリモート」の意味は、フラグがない場合は `http://localhost:20128` を対象とし、
`--remote` を指定した場合（またはアクティブなリモートコンテキストがある場合）は、そのサーバーから
カタログを取得し、設定をローカルに書き込むということです。

| コマンド                   | ツール                  | 書き込む内容                                                                                                                                                                                | 主なフラグ                                                                                                                                 | ローカル対リモート |
| -------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| `omniroute setup-codex`    | OpenAI Codex CLI        | `~/.codex/<name>.config.toml` — 互換性のあるテキストモデルごとに1つのプロファイル（`codex --profile <name>`）                                                                               | `--remote` `--api-key` `--only` `--dry-run` `--port` `--codex-home`                                                                        | 両方               |
| `omniroute setup-claude`   | Claude Code             | `~/.claude/profiles/<name>/settings.json` — 一致したモデルごとに1つのプロファイル（`CLAUDE_CONFIG_DIR`）                                                                                    | `--remote` `--api-key` `--only` `--dry-run` `--port` `--claude-home`                                                                       | 両方               |
| `omniroute setup-opencode` | OpenCode（OpenAI互換）  | `~/.config/opencode/opencode.json` — カタログ内の全モデルを含む`omniroute`プロバイダー（`opencode -m omniroute/<model>`）                                                                   | `--remote` `--api-key` `--only` `--model` `--dry-run` `--port`                                                                             | 両方               |
| `omniroute setup-cline`    | Cline                   | `~/.cline/data/{globalState,secrets}.json`（CLIモード）＋ VS Code拡張機能の設定を出力                                                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--cline-dir`                                                                | 両方               |
| `omniroute setup-kilo`     | Kilo Code               | `~/.local/share/kilo/auth.json`（CLI）＋ VS Codeの`settings.json`が存在する場合は`kilocode.*`をマージ                                                                                       | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--auth-path` `--vscode-settings`                                            | 両方               |
| `omniroute setup-continue` | Continue / `cn` CLI     | `~/.continue/config.yaml` — `provider: openai`モデル、キーは`${{ secrets.OMNIROUTE_API_KEY }}`経由                                                                                          | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 両方               |
| `omniroute setup-cursor`   | Cursor                  | なし — アプリ内での手順を出力（Cursorの設定は非公開のSQLite）                                                                                                                               | `--remote` `--api-key` `--only` `--port`                                                                                                   | 両方               |
| `omniroute setup-roo`      | Roo Code                | `~/.omniroute/roo-settings.json`（インポート用ドキュメント）＋ VS Codeの`settings.json`が存在する場合は`roo-cline.autoImportSettingsPath`を設定                                             | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--import-path` `--vscode-settings`                                          | 両方               |
| `omniroute setup-crush`    | Crush                   | `~/.config/crush/crush.json` — `openai-compat`プロバイダー、キーは`$OMNIROUTE_API_KEY`経由                                                                                                  | `--remote` `--api-key` `--only` `--dry-run` `--port` `--config-path`                                                                       | 両方               |
| `omniroute setup-goose`    | Goose                   | `~/.config/goose/config.yaml`（`GOOSE_PROVIDER`/`OPENAI_HOST`/`GOOSE_MODEL`）＋ 環境変数の設定手順を出力                                                                                    | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 両方               |
| `omniroute setup-aider`    | Aider                   | `~/.aider.conf.yml`（`openai-api-base`＋`model: openai/<id>`）＋ 環境変数の設定手順を出力                                                                                                   | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path`                                                              | 両方               |
| `omniroute setup-qwen`     | Qwen Code               | `~/.qwen/settings.json` — V4の`modelProviders.openai`配列＋`~/.qwen/.env`内の`OMNIROUTE_API_KEY`                                                                                            | `--remote` `--api-key` `--model` `--yes` `--dry-run` `--port` `--config-path` `--env-path`                                                 | 両方               |
| `omniroute setup-5dive`    | 5dive（エージェント群） | `$HOME`配下には何も書き込まない — `5dive agent auth set`を介して5diveの**認証プロファイル**（`/var/lib/5dive/auth-profiles/<name>/`）を書き込む。root専用で、エージェント群のホスト上で実行 | `--remote` `--api-key` `--model` `--auth-profile` `--agent` `--byo-provider` `--fivedive-bin` `--no-sudo` `--yes` `--dry-run` `--port`     | 両方               |
| `omniroute run <target>`   | ランタイム起動（汎用）  | なし — 適切な環境変数と引数を使用して`claude`/`codex`/`aider`/`goose`/`opencode`/`qwen`/`gemini`を起動。QwenとGeminiは一時的に分離されたホームを使用                                        | `--remote` `--base-url` `--context` `--provider` `--model` `--api-key` `--api-key-env` `--dry-run` `--json` `--port` `--profile` `--token` | 両方               |
| `omniroute launch`         | Claude Code             | なし — `ANTHROPIC_BASE_URL`/`ANTHROPIC_AUTH_TOKEN`を注入して`claude`を起動                                                                                                                  | `--remote` `--api-key` `--token` `--profile` `--port`                                                                                      | 両方               |
| `omniroute launch-codex`   | OpenAI Codex CLI        | なし — `-c`フラグを介して`omniroute`プロバイダーを注入し、`codex`を起動                                                                                                                     | `--remote` `--api-key` `--profile`（`-p`）`--port`                                                                                         | 両方               |

フラグに関する注記（コマンドのソースで確認済み）：

- `--remote <url>` — リモートの OmniRoute からカタログを取得します（`--port`
  およびアクティブなコンテキストを上書きします）。`--api-key <key>` はその
  サーバー用の認証情報を指定します（デフォルトは `OMNIROUTE_API_KEY` 環境変数、
  またはアクティブなコンテキストのトークンです）。
- `--only <patterns>` — カンマ区切りの部分文字列です。一致するモデル ID
  のみを保持します（例：`--only glm,kimi`）。`setup-codex`、`setup-claude`、
  `setup-opencode`、`setup-continue`、`setup-cursor`、`setup-crush` で使用できます。
- `--dry-run` — ファイルシステムに変更を加えず、書き込まれる内容をそのまま
  出力します。`setup-cursor`（ファイルを一切書き込みません）を**除く**
  すべての `setup-*` コマンドで使用できます。
- `--model <id>` — モデルの自動検出機能がないツール（Cline、Kilo、Roo、
  Goose、Qwen、Aider、5dive）では必須です（または対話的に選択します）。
  これらのツールは非対話実行用の `--yes` も受け付けます（その場合は
  `--model` が必須です）。`setup-opencode` では、`--model` によって
  デフォルトのトップレベルモデルを設定します。
- `omniroute run` の `--model <id>` は、マニフェストのターゲットごとの配線
  （`bin/cli/cli-manifest.mjs`）に従います。**aider** には
  `--model openai/<id>`、**opencode** には `--model omniroute/<id>` が
  渡されます（ID にそのプレフィックスがまだ含まれていない場合にのみ追加されます）。
  **qwen** と **gemini** には ID がそのまま渡されます。**claude** には
  `ANTHROPIC_MODEL`、**goose** には `GOOSE_MODEL`、**codex** には
  `-c model_providers.omniroute.*` 引数を介して渡されます。
  **実行ターゲットの中で `--model` が厳密に必須なのは Qwen だけです**。
  `--model` なしで `omniroute run qwen` を実行すると、明示的なエラーとともに
  終了コード `2` で終了します。
- `--port <port>` — ローカル OmniRoute のポートです（デフォルトは `20128`。
  `--remote` が設定されている場合は無視されます）。すべての `setup-*`
  と両方のランチャーに存在します。
- `omniroute run` の終了コード：子 CLI 自体の終了コードがそのまま伝播されます。
  `2` = 無効な引数（未対応のターゲット、必須の `--model` の欠如、コンテナガード）、
  `127` = ターゲットのバイナリが `PATH` に存在しない、`130`/`143`/`129` =
  `SIGINT`/`SIGTERM`/`SIGHUP` によって起動が終了した場合、`1` =
  その他の実行時起動エラーです。
- 2 つのランチャー（`launch`、`launch-codex`）は、
  `setup-claude` / `setup-codex` によって書き込まれたプロファイルを選択する
  `--profile <name>` と、基盤となる `claude` / `codex` バイナリへの
  パススルー引数を受け付けます。

対話型ピッカーはセットアップレシピでも共有されます：

```bash
# アクティブなローカルまたはリモートのモデルカタログから選択し、ターゲットを設定します。
omniroute configure claude
omniroute configure opencode --provider glm
omniroute configure qwen --model qwen/qwen3.8-max-preview --yes
```

`configure` は現在、`codex`、`claude`、`opencode`、`qwen`、`aider`、
`goose`、`cline`、`continue`、`kilo`、`5dive` について、テスト済みの
レシピに処理を委譲します。IDE 専用、MITM、ガイド専用のカタログエントリは、
引き続き明示的な `setup-*` / 手動フローとなり、起動可能なターゲットとしては
表示されません。

> `setup-opencode` は、**軽量な openai-compatible** OpenCode
> インテグレーションです。より高機能なプラグインインテグレーション
> `omniroute setup opencode` もあり、こちらは `@omniroute/opencode-plugin`
> をインストールします。これらは異なるコマンドです。上記の表では
> `setup-opencode` について説明しています。
>
> このプラグインは OpenCode のメジャーバージョンごとに 1 つずつ、
> 2 つのパッケージで提供されます。これは、2 つのローダーが異なる
> エントリポイントを必要とするためです。OpenCode v1 向けの
> `@omniroute/opencode-plugin` と、OpenCode v2 向けの
> `@omniroute/opencode-plugin-v2` があります。v2 パッケージは新しく
> （`0.1.0`）、まだ変化しているホストコントラクトに従うため、特定の形式を
> 前提とせず、OpenCode がカタログドラフトに設定する構造を読み取ります。
> `opencode.json` に `plugins` エントリを追加してインストールしてください。
> `omniroute setup opencode` は引き続き v1 パッケージをインストールします。
> オプションと認証情報の検索順序については、パッケージの README を参照してください。

---

## ローカルでの使用

OmniRoute が `localhost:20128` で実行されている状態で、お使いのツール用のセットアップコマンドを実行するだけです。カタログはローカルサーバーから取得されます。

```bash
# Codex: 一致したモデルごとのプロファイルを ~/.codex/ に書き込む
omniroute setup-codex
codex --profile glm52            # 生成されたプロファイルを使用

# Claude Code: モデルごとのプロファイルを書き込み、そのうち1つを起動
omniroute setup-claude
omniroute launch --profile glm52

# OpenCode: すべてのカタログモデルを含む openai 互換プロバイダーを書き込む
omniroute setup-opencode
export OMNIROUTE_API_KEY=sk-...  # {env:OMNIROUTE_API_KEY} 経由で参照され、ディスクには保存されない
opencode -m omniroute/glm/glm-5.2 "..."

# 自動検出に対応していないツールでは、モデルを明示的に指定する必要がある:
omniroute setup-aider --model glm/glm-5.2
omniroute setup-qwen --model qwen/qwen3.8-max-preview

# 何も書き込まずにプレビュー:
omniroute setup-continue --dry-run
```

設定を一切書き込まずに起動します（環境変数の注入のみ）。

```bash
omniroute launch                 # Claude Code → ローカルの OmniRoute
omniroute launch-codex           # Codex CLI → ローカルの OmniRoute
omniroute launch-codex --profile glm52
omniroute run claude --model openai/gpt-5.4
omniroute run codex --model openai/gpt-5.4 --dry-run --json
omniroute run aider --model glm/glm-5.2 -- --message "reply OK"
omniroute run goose --model glm/glm-5.2
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"
omniroute run qwen --model glm/glm-5.2 -- -p "reply OK"
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "reply OK"

# 明示的なコマンドパス: -- より後にあるものをそのまま渡す
omniroute run claude -- --print-system-prompt "review this diff"
```

---

## リモートでの使用

任意のセットアップコマンドに `--remote` と `--api-key` を指定し、リモートの OmniRoute を参照させます。カタログはリモートから取得され、設定はローカルマシンに書き込まれます。

```bash
# リモート VPS 上の OpenCode で、glm/kimi モデルのみを保持
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx \
  --only glm,kimi
opencode -m omniroute/glm/glm-5.2 "..."   # 先に OMNIROUTE_API_KEY を export する

# リモートカタログから Codex プロファイルを生成
omniroute setup-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx

# リモートに直接接続して CLI を起動
omniroute launch       --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute launch-codex --remote http://192.168.0.15:20128 --api-key oma_live_xxx
```

毎回 `--remote`/`--api-key` を渡す代わりに、一度ログインして、**アクティブコンテキスト**から自動的に指定できます。

```bash
omniroute connect 192.168.0.15        # スコープ付きトークンを発行し、コンテキストを保存
omniroute setup-codex                 # ← 以降はリモートカタログを使用
omniroute setup-opencode              # ← 同様
omniroute launch                      # ← リモートに接続して Claude Code を起動
```

コンテキスト、スコープ、トークン管理については、[リモートモード](./REMOTE-MODE.md)を参照してください。

---

## 5dive エージェントフリート

[5dive](https://5dive.ai) は、長時間稼働するコーディングエージェントのフリートを実行します。各エージェントは、それぞれ専用の Unix ユーザーで動作する systemd ユニットです。5dive 自体はコーディング CLI ではないため、`omniroute run` で起動するものはありません。`5dive` は**設定専用**のターゲットです。

```bash
omniroute configure 5dive --model failover-demo --yes
omniroute setup-5dive --model failover-demo --auth-profile omniroute --agent worker1
```

どちらの形式でも、1つの 5dive **認証プロファイル**を書き込みます。そのプロファイルに紐付けられたすべての `claude` シートは、その後 OmniRoute と通信します。このターゲットには、以下の3つの固有事項があります。

- **フリートホスト上で root として実行されます。** 5dive のコマンドはローカルの systemd ユニットと root 所有の状態ディレクトリに作用するため、リモートモードはありません。すでに root でない場合、レシピは `sudo` 経由で自身を再実行します（`--no-sudo` を指定すると、この動作を無効化し、代わりにコマンドを表示します）。
- **ループバックでない限り、エンドポイントは `https://` でなければなりません。** エージェントの API キーはリクエストのたびにその URL を通じて送信されるため、5dive はマシン外部への平文エンドポイントを拒否します。プライベート LAN アドレスも例外ではありません。
- **各シート独自のモデル固定設定は、プロファイルより優先されます。** プロファイルには `ANTHROPIC_DEFAULT_{OPUS,SONNET,HAIKU}_MODEL` が含まれますが、標準モデル ID に固定されたままのシートは、最初のターンで _「選択したモデルに問題があります」_ というエラーになります。シートも固定するには `--agent <name>` を渡します（複数回指定可能）。指定しない場合、レシピがコマンドを表示します。

API キーは **stdin**（`--api-key=-`）で 5dive に渡されるため、`ps` の出力には表示されません。

プロファイルを単一モデルではなく OmniRoute の **combo** に向けることで、フリートでプロバイダーのフェイルオーバーが利用可能になります。[#11578](https://github.com/diegosouzapw/OmniRoute/issues/11578) に記録された実行では、プライマリエンドポイントがターンの途中で完全にダウンした際、エージェントは残りのステップをフォールバック上で完了し、障害が表面化することはありませんでした。

---

## Base URL の規則（どのツールが `/v1` を必要とするか）

OmniRoute は OpenAI インターフェースを `/v1`、Anthropic インターフェースをルート、
ネイティブ Gemini インターフェースを `/v1beta` で公開します。各統合は、そのツールが
期待する形式に合わせて構成されています（コマンドのソースで確認済み）。

| 統合                                                                       | 書き込まれる Base URL | `/v1`?                                            |
| -------------------------------------------------------------------------- | --------------------- | ------------------------------------------------- |
| `setup-cline` (`openAiBaseUrl`)                                            | ルート                | いいえ — Cline が `/v1/chat/completions` を追加   |
| `setup-goose` (`OPENAI_HOST`)                                              | ルート                | いいえ — Goose がパスを追加                       |
| `setup-aider` (`OPENAI_API_BASE`)                                          | ルート                | いいえ — LiteLLM が `/v1/chat/completions` を追加 |
| `setup-kilo`, `setup-roo`, `setup-continue`, `setup-crush`, `setup-cursor` | `/v1` 付き            | はい                                              |
| `setup-claude` (`ANTHROPIC_BASE_URL`), `launch`                            | ルート                | いいえ — Claude Code が `/v1/messages` を追加     |
| `setup-codex`, `launch-codex` (`model_providers.omniroute.base_url`)       | `/v1` 付き            | はい                                              |
| `setup-qwen` (`modelProviders.openai[].baseUrl`)                           | `/v1` 付き            | はい                                              |
| `run gemini` (`GOOGLE_GEMINI_BASE_URL`)                                    | ルート                | いいえ — SDK が `/v1beta/models/…` を追加         |
| `setup-5dive`（認証プロファイル内の `ANTHROPIC_BASE_URL`）                 | ルート                | いいえ — Claude Code が `/v1/messages` を追加     |

---

## 更新時にネイティブ依存関係を維持する：`--include=optional`

`omniroute update` で更新すると（確認後、または `--apply` を指定した場合）、
OmniRoute は `--include=optional` を組み込んだ次のインストールコマンドを実行します。

```bash
npm install -g omniroute@latest --include=optional
```

これは `omniroute update` に渡すフラグでは**ありません**。アップデーターによって
常に適用されます。これにより、npm 設定で `omit=optional` が設定されていても、
`optionalDependencies`（`better-sqlite3`、`keytar`、`tls-client`、
LLMLingua SLM スタック）が更新後も維持されます。この指定がない場合、ネイティブの
SQLite ドライバーと OS キーリングのバインディングが通知なく削除される可能性があります。
適用せずに実際のコマンドをプレビューするには、次を実行します。

```bash
omniroute update --dry-run
# [ドライラン] 実行予定: npm install -g omniroute@latest --include=optional
```

その他の `omniroute update` フラグ（ソースで確認済み）：`--check`（古い場合は終了コード
1）、`--apply`（確認なしでインストール）、`--changelog`、`--no-backup`、
`--yes`。

---

## `omniroute run gemini` 経由での Google Gemini CLI

`@google/gemini-cli` 0.50.0 に対して契約を確認済みです。この CLI は
`GOOGLE_GEMINI_BASE_URL` を尊重し、そこに対して
`POST /v1beta/models/<model>:generateContent`
（および `:streamGenerateContent?alt=sse`）を発行します。これは OmniRoute の
ネイティブ Gemini インターフェース（`/v1beta`）と正確に一致します。
`omniroute run gemini` はこれを自動的に構成します。

- `GOOGLE_GEMINI_BASE_URL` → アクティブな OmniRoute の Base URL（ルート、`/v1` なし）。
- `GEMINI_API_KEY` → 解決済みの OmniRoute 認証情報（オプション／環境変数／コンテキスト）。
- `gemini-api-key` 認証を選択する `.gemini/settings.json` を含む、**一時的で隔離された `GEMINI_CLI_HOME`**。これにより、保存済みの Google OAuth セッション（Code Assist）が OmniRoute 向けの起動設定を上書きすることはありません。終了後に削除されます。
- **環境変数の衛生管理**：子プロセスの環境から `GOOGLE_API_KEY`、
  `GOOGLE_GENAI_USE_VERTEXAI`、`GOOGLE_GENAI_USE_GCA`（認証先を Vertex/Code Assist
  に変更する可能性があるもの）を除去し、念には念を入れたフォールバックとして
  `GEMINI_DEFAULT_AUTH_TYPE=gemini-api-key` を設定します。他の `run` ターゲットにも、
  それぞれ競合する変数に対して同様の処理が適用されます。
- `--provider`／`--model` に基づく `--model <id>` の挿入。

```bash
omniroute run gemini --model glm/glm-5.2 -- --skip-trust -p "hello"
```

Gemini のワークスペース信頼ガードはヘッドレスモードでも適用されます。`--skip-trust`
を自分で渡す（または対話形式でディレクトリを信頼する）必要があります。ランチャーは
意図的にこのガードを回避しません。このランチャーは **ACP 登録**
（`src/lib/acp/registry.ts`、`gemini --acp`）とは別のものであり、後者は引き続き
`/dashboard/acp-agents` 用のエージェントプロトコル統合です。

---

## 実環境スモークスイープ（オプトイン）

決定論的な起動プランの回帰テストは CI で実行されます（`tests/unit/cli/run-command.test.ts`、
`tests/unit/cli/run-execution.test.ts`）。実際の OmniRoute サーバーに対して実際のバイナリを検証するために、
オプトイン形式のテストハーネスが `tests/integration/upstream-cli-smoke.int.test.ts` に用意されています。
これは自動的には実行されません（`RUN_CLI_SMOKE=1` が設定されていない限り、すべてのサブテストがスキップされます）。
認証情報は値ではなく環境変数名で渡され、記録される出力からキー形式の文字列が編集除去されます。
また、バイナリがインストールされていないターゲットはスキップされ、失敗は単純な真偽値ではなく
認証 / アップストリーム / 設定に分類されます。

```bash
RUN_CLI_SMOKE=1 \
OMNIROUTE_SMOKE_BASE_URL="http://localhost:20128" \
OMNIROUTE_SMOKE_MODEL="<provider/model>" \
OMNIROUTE_SMOKE_API_KEY_ENV="OMNIROUTE_API_KEY" \
node --import tsx/esm --test tests/integration/upstream-cli-smoke.int.test.ts
```

任意: `OMNIROUTE_SMOKE_TARGETS="codex,opencode,qwen"` を指定するとスイープ対象を限定できます。
`OMNIROUTE_SMOKE_TIMEOUT_MS` を指定すると、ターゲットごとのデフォルトのタイムアウトである 120 秒を上書きできます。

---

## 関連項目

- [Claude Code の設定](./CLAUDE-CODE-CONFIGURATION.md) — Claude Code の詳細ガイド
- [Codex CLI の設定](./CODEX-CLI-CONFIGURATION.md) — 初回のみ必要な `[model_providers.omniroute]` の基本セットアップ
- [リモートモード](./REMOTE-MODE.md) — コンテキスト、スコープ付きアクセストークン、リモートサーバーの操作
- [CLI ツールリファレンス](../reference/CLI-TOOLS.md) — サポートされるツールとダッシュボードページの完全な一覧
- [セットアップガイド](./SETUP_GUIDE.md) — インストール方法と初回起動時のオンボーディング
