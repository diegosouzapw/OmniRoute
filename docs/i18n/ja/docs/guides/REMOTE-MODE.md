# Remote Mode (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

OmniRoute 自体を別の場所（VPS、ホームサーバー、Tailnet 上の別マシン）で実行しながら、手元のノート PC で `omniroute` CLI を実行できます。
一度 `omniroute connect` でログインすれば、それ以降は **すべての** CLI コマンドがそのリモートサーバーを対象にします。コマンドも出力も同じで、リモートに対して実行される点だけが異なります。

別のツールをインストールする必要はありません。リモートモードで使用するのは、通常の `omniroute` CLI とスコープ付きの **アクセストークン** です。

```bash
npm install -g omniroute                 # 通常の CLI
omniroute connect 192.168.0.15           # ログイン（パスワード → スコープ付きトークン）
omniroute models list                    # ← リモートサーバーのモデルを一覧表示
omniroute configure codex                # ← リモートカタログからローカルの Codex プロファイルを書き込む
```

---

## 仕組み

```
あなたのノート PC                         リモートの OmniRoute（VPS）
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  （パスワード → トークン）   │
│  コンテキスト: vps │ ───────────────►  │ スコープ付きアクセストークンを発行 │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ 各管理ルートでトークンのスコープを │
│ 設定をローカルに   │ ◄───────────────  │ 確認                             │
│ 書き込む           │                   └───────────────────────────────┘
└────────────────────┘
```

- **コンテキスト**には、それぞれ 1 台のサーバーが保存されます（`~/.omniroute/config.json`、`chmod 600`）。
  `omniroute contexts use <name>` でアクティブなサーバーを切り替えます。`default` はローカルです。
- **アクセストークン**（`oma_live_…`）は、管理コマンドを認可します。
  推論 API キー（`sk-…`、`/v1/chat/completions` で使用）とは別のものです。
- サーバー側には、トークンの SHA-256 ハッシュのみが保存されます。平文は作成時に **一度だけ** 表示されます。

---

## 接続

### 管理パスワードを使用する場合（初期設定）

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128 の管理パスワード: ********
# ✔ http://192.168.0.15:20128 に接続しました — コンテキスト '192.168.0.15'（スコープ: admin）
```

パスワードによるフローでは、デフォルトで **admin** トークンが発行されます（パスワードを所有している時点で、すでに完全な制御権限を持っているためです）。`--scope` を使用すると、より狭いスコープを指定できます。

```bash
omniroute connect 192.168.0.15 --scope write
```

オプション: `--port <p>`（ホストにポートが含まれていない場合）、`--name <ctx>`（コンテキスト名）、
`--scope read|write|admin`。完全な URL はそのまま使用されます:
`omniroute connect https://omni.example.com`。

### 事前生成済みトークンを使用する場合

ダッシュボード（または `omniroute tokens create`）でスコープ付きトークンを生成して貼り付けます。パスワードは不要です。

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI は `GET /api/cli/whoami` を通じてトークンを検証し、アクティブなコンテキストとして保存します。

---

## スコープ

階層化された 3 つのレベルがあります（`admin ⊃ write ⊃ read`）。

| スコープ | 実行可能な操作                                                                |
| -------- | ----------------------------------------------------------------------------- |
| `read`   | 一覧表示／確認 — `models list`、`providers status`、`logs`、`usage`、`cost`   |
| `write`  | read **+** 設定／適用 — `setup-codex`、`keys add`、`config set`、コンボ       |
| `admin`  | write **+** 管理 — `tokens` CRUD、プロバイダー追加、サービス、ポリシー、oauth |

サーバーは、HTTP メソッド（`GET`→read、変更操作→write）と、機密性の高い操作対象に対する admin 許可リスト（`/api/cli/tokens`、`/api/providers` の変更操作、`/api/oauth`、`/api/services`、…）に基づいて、各ルートに必要なスコープを推測します。
スコープが不十分なトークンには、明確なメッセージとともに `403` が返されます。

> プロセスを起動するルート（`/api/services/*`、`/api/mcp/*`、…）は、
> **ループバック限定**のままです。スコープにかかわらず、リモートトークンからアクセスすることはできません。

---

## リモートインストール上の Antigravity への接続

Antigravity は Google の firstparty/nativeapp 同意画面を使用します。Google が認証コードを発行するのは、**ループバックリダイレクト**（`http://127.0.0.1:<port>/callback`）に、**サインインを承認するブラウザから到達できる場合**に限られます。リモート VPS にインストールした場合、このループバックはユーザーのマシンではなくサーバー上に存在するため、同意画面は**永遠に停止したまま、コードを発行しません**。そのため、通常の「コールバック URL を貼り付ける」フォールバックでも、貼り付けるものがありません。（これは Google 側の制約です。同梱の Antigravity デスクトップクライアントを使用するすべてのプロキシで同じ停止が発生し、OmniRoute に限った問題ではありません。）

ダッシュボードは、操作不能になる前にこれを検出します。localhost 以外のアドレスから **Providers → Antigravity → Connect** を開くと、一般的な「コールバック URL をコピー」する案内の代わりに、以下の 2 つの解決方法が表示され、ホストとポートはあらかじめ入力されています。（LAN アドレスも該当します。このコールバックに関しては、`192.168.x.x` は localhost ではありません。）

Antigravity をリモートの OmniRoute に接続する方法は、次の 2 つです。

### オプション A — ローカルログインヘルパー（推奨）

`127.0.0.1` に到達できる**ご自身のコンピューター**上で OAuth を実行します。ヘルパーは Google と直接通信するため、ダッシュボード版では完了できない同意処理を完了できます。

**すでに接続済みの場合**（`omniroute connect <host>`）、コピーするものはありません。ヘルパーが認証情報を対象のインストール環境へ自動的に送信します。

```bash
# ローカルマシン上で実行（Node.js とブラウザが必要）:
omniroute connect 192.168.0.15        # 初回のみ — 管理者スコープのコンテキストトークンを発行
npx omniroute login antigravity
#   ↳ Google の同意画面を開き、ローカルのループバックポートでコールバックを受信し、
#     コードを交換して、認証情報をアクティブなコンテキストへ POST します:
#
#   Antigravity connected on http://192.168.0.15:20128 (connection abc123).
#   貼り付けるものはありません。このターミナルを閉じても構いません。
```

アクティブなコンテキストが別のマシンを指している場合、プッシュは自動的に実行されます。`--push` / `--no-push` でいずれかの動作を強制するか、`--context <name>` で特定のコンテキストを指定できます。

**ご自身のマシンから VPS に到達できない場合**（ファイアウォール、SSH なし、ネットワークから隔離された端末など）でも、ヘルパーは機能します。必ず必要なのは Google への接続だけです。`--no-push` を使用するか、そのままプッシュを失敗させてください。すでに完了した認証を破棄する代わりに、認証情報 blob の出力へフォールバックします。

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

次に、**リモート**ダッシュボードで **Providers → Antigravity → Connect** を開き、`omniroute-cred-v1.…` blob を **Step 2** フィールドに貼り付けます（コールバック URL または認証情報 blob のどちらも受け付けます）。OmniRoute はそれをデコードし、サーバー側で Cloud Code のオンボーディングを実行して、接続を永続化します。

> blob にはリフレッシュトークンが含まれているため、パスワードと同様に取り扱ってください。プッシュ経由の場合は、コンテキストの認証済み接続を介して一度だけ送信されます。貼り付け経由の場合は、ダッシュボード接続を介して送信されます。どちらの場合も保存時には暗号化され、プッシュが成功した場合はターミナルに出力されません。

フラグ: `--no-browser`（自動的に開く代わりに URL を出力）、`--port <n>`（ループバックポートを固定）、`--timeout <ms>`、`--push` / `--no-push`（自動送信の動作を上書き）、`--context <name>`（特定のコンテキストを指定）。

### オプション B — SSH ローカルフォワードトンネル

VPS に SSH でアクセスできる場合は、ダッシュボードのポートを転送し、ループバックコールバックがトンネル経由でサーバーに到達するようにします。

```bash
# ローカルマシン上で実行:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# 次に、ローカルブラウザで http://localhost:20128 を開き、通常どおり Antigravity に接続します
# — これで 127.0.0.1:20128/callback へのリダイレクトが SSH 経由で VPS に到達します。
```

ダッシュボードへ `localhost:20128` としてアクセスするため、Google の同意処理が完了し、同じトンネルを介してコールバックがサーバーへ送信されます。blob は不要です。接続がアクティブと表示されるまで、トンネルを開いたままにしてください。

以下の固定ループバックプロバイダーとは異なり、ここでは**転送は 1 つで十分です**。Antigravity のコールバックはダッシュボードのポート自体を使用するため、プロバイダー固有の 2 つ目のポートをトンネルする必要はありません。

> 完全なヘッドレス環境向けの代替方法（ヘルパーもトンネルも使用しない方法）として、**独自の** Google OAuth ウェブ認証情報と公開ベース URL を設定できます。プロバイダーの OAuth 環境変数を参照してください。上記 2 つのオプションでは、Google 側で追加設定を行う必要はありません。

---

## リモートインストール上の Codex / Grok への接続（固定ループバックプロバイダー）

Codex、xAI（`xai-oauth`）、Grok CLI（`grok-cli`）は、上流の OAuth アプリに**固定された**ループバック
`redirect_uri` を登録します。OmniRoute からこれを変更することはできません。プロバイダーは常に、ブラウザを同じハードコードされたアドレスへリダイレクトします。

| プロバイダー | プロバイダーがリダイレクトする固定コールバック |
| ------------ | ---------------------------------------------- |
| `codex`      | `http://localhost:1455/auth/callback`          |
| `xai-oauth`  | `http://127.0.0.1:56121/callback`              |
| `grok-cli`   | `http://127.0.0.1:56122/callback`              |

ここでの `localhost` は**ブラウザを実行しているマシン**を意味しますが、OmniRoute の PKCE
コールバックサーバーは**サーバー側**のループバックでリッスンします。`http://192.168.0.15:20128` のような LAN
アドレスでダッシュボードを開くと、この 2 つが接続されることはありません。認可コードは自分のノート PC の
`localhost:1455` に送信されますが、そこでは何もリッスンしていないため、プロバイダーはエラーを表示することなくサインインに失敗します。

ダッシュボードは、ポップアップを開く前にこの状況を検出し、ログインを何も表示せずに失敗させる代わりに、トンネルコマンドを表示します（#8046）。

### 修正方法 — **両方**のポートを転送する

```bash
# ブラウザを実行しているマシン上で:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# 次に http://localhost:20128 を開き、そこから Codex に接続します
```

2 つの転送が必要です。片方だけを転送しても失敗します。

- **`20128`**（ダッシュボードポート）によってオリジンが真の localhost になり、OmniRoute が PKCE
  コールバックサーバーを起動するようになります。LAN オリジンでは、この分岐に到達しません。
- **`1455`**（プロバイダーの固定コールバックポート）は、ブラウザのリダイレクト先です。
  ここからサーバーのループバックまでトンネルする必要があります。

xAI または Grok CLI に接続する場合は、`1455` を `56121`/`56122` に置き換え、`20128` は実際のダッシュボードポートに置き換えてください。接続がアクティブと表示されるまで、トンネルを開いたままにしてください。

> **SSH アクセスがありませんか？** Codex と Grok CLI では、貼り付けたトークンも使用できます。接続ダイアログの **Paste API
> Key** / **Import auth.json** タブを使用してください。この方法ではループバックコールバックを使用しないため、どのオリジンからでも機能します。Codex ではさらに、単体のアクセストークンまたは `~/.codex/auth.json` セッション BLOB も使用できます。

---

## トークンの管理

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ シークレットは一度だけ表示されます — 今すぐコピーしてください
omniroute tokens list                 # マスク表示: ID、名前、スコープ、プレフィックス、ステータス、有効期限
omniroute tokens revoke <id|prefix>   # 即座に取り消す
omniroute tokens scopes               # 3 つのスコープを説明する
```

`tokens` コマンドには **admin** 認証情報が必要です。ダッシュボードの
**Settings → Access Tokens** でもトークンを管理できます（作成、取り消し、一度だけのコピー）。

---

## リモートカタログからコーディング CLI を設定する

`omniroute configure` は**アクティブなサーバー**のライブモデルカタログを読み取り、**ユーザーの**マシンに設定を書き込みます。

```bash
omniroute configure codex
#   プロバイダー: glm、kmc、ollamacloud、opencode-go、…
#   プロバイダー: glm
#   モデル ID: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml に書き込みました
#   使用方法:  codex --profile glm52

# 非対話モード
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# 頻繁に使用するモデルを対話型選択画面の先頭に保持する
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

選択画面では、ローカルの `model-preferences.json` ファイルにモデル ID のみが保持され（URL や認証情報は保存されません）、コンテキストおよび CLI ターゲットごとにスコープされます。お気に入りは最近の選択より前に表示されます。選択したモデルをそのコンテキスト／ターゲットのリストから削除するには、`--unfavorite` を使用してください。

書き込まれるプロファイルは、環境変数
（`OMNIROUTE_API_KEY`）を使用して推論キーを参照します。シークレットがディスクに書き込まれることはありません。一度限りの Codex
基本設定（`[model_providers.omniroute]` ブロック）については、
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) を参照してください。

### リモートを対象に CLI を起動する（設定の書き込みなし）

`omniroute run <target>` もアクティブなコンテキストに従います。リモートのベース URL
とコンテキストの認証情報は、起動されたプロセスにのみ注入されます。

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → リモート
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# 起動される内容を正確にプレビューします（環境変数のキー名のみ。値は一切表示されません）:
omniroute run codex --dry-run --json
```

ターゲット: `claude`、`codex`、`aider`、`goose`、`opencode`、`qwen`、`gemini`
（単一のソース: `bin/cli/cli-manifest.mjs`）。Qwen と Gemini は、終了時に削除される一時的な分離ホームで実行されるため、この起動によって個人用ツール設定が変更されたり、その設定に情報が漏れたりすることはありません。

### CLI ごとのセットアップコマンド

サポートされる各 CLI には、リモート対応のセットアップコマンドがあります（すべてアクティブなコンテキスト、または `--remote <url> --api-key <key>` に従います）。

| CLI         | コマンド                   | 書き込まれる内容                                                                                                                                                             |
| ----------- | -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` プロファイル（モデルごと）                                                                                                                     |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json`（モデルごと）                                                                                                                      |
| OpenCode    | `omniroute setup-opencode` | すべてのカタログモデルを含む `omniroute` OpenAI 互換プロバイダーを `~/.config/opencode/opencode.json` に書き込み（`opencode -m omniroute/<model>` で実行）                   |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json`（CLI モード）に書き込み、貼り付け用の VS Code 拡張機能設定を表示（OpenAI 互換、ベース URL は `/v1` **なし**）                     |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json`（CLI）および VS Code の `kilocode.*` 設定に書き込み — OpenAI 互換、ベース URL は `/v1` **あり**                                              |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml`（VS Code/JetBrains および `cn` CLI）に書き込み — `provider: openai`、`apiBase` は `/v1` **あり**、キーは `${{ secrets.OMNIROUTE_API_KEY }}` 経由   |
| Cursor      | `omniroute setup-cursor`   | アプリ内での手順を表示（Settings → Models → Override OpenAI Base URL（`/v1` **あり**）+ キー + モデル）。Cursor の設定は不透明な SQLite 形式 — チャットパネルのみ            |
| Roo Code    | `omniroute setup-roo`      | Roo インポート用 JSON（`~/.omniroute/roo-settings.json`）を書き込み、`roo-cline.autoImportSettingsPath` を設定し、UI 手順を表示（OpenAI 互換、ベース URL は `/v1` **あり**） |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` に書き込み — `openai-compat` プロバイダー、`base_url` は `/v1` **あり**、キーは `$OMNIROUTE_API_KEY` 経由                                       |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml`（`GOOSE_PROVIDER=openai` + `OPENAI_HOST` は `/v1` **なし** + `GOOSE_MODEL`）および環境変数の設定例                                             |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml`（`openai-api-base` は `/v1` **なし** + `model: openai/<id>`）および環境変数の設定例（`aider --message --yes`）                                           |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` の V4 `modelProviders.openai` エントリ、および `~/.qwen/.env` 内の `OMNIROUTE_API_KEY`                                                               |

```bash
# OpenCode（OpenAI 互換プロバイダー、すべてのカタログモデル、リモート VPS）
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # 一致するモデルのみを保持
opencode -m omniroute/glm/glm-5.2 "..."          # 最初に OMNIROUTE_API_KEY をエクスポート
```

> OpenCode には、より高機能な**プラグイン**統合もあります：`omniroute setup opencode`
> （現在は `--remote` によりリモートにも対応）は `@omniroute/opencode-plugin` をインストールします。
> `setup-opencode` は軽量な OpenAI 互換の代替手段です。API キーは
> `{env:OMNIROUTE_API_KEY}` 経由で参照され、ディスクには一切書き込まれません。
>
> OpenCode v2 では、代わりに `@omniroute/opencode-plugin-v2` を使用してください。同じカタログですが、
> ローダーの規約が異なります。統合が接続されている場合、OpenCode 自体の認証情報
> ストアからキーを読み取るため、リモートゲートウェイでも `opencode.json` にキーを
> 記載する必要はまったくありません。

---

## コンテキストの管理（サーバー間の切り替え）

**コンテキスト**とは、保存されたサーバー（baseUrl + 認証情報 + スコープ）のことです。`omniroute connect` はコンテキストを作成し、それをアクティブにします。それ以降のすべてのコマンドはそのコンテキストをターゲットとします。`omniroute contexts` を使用して、コンテキストを管理したり、切り替えたりできます。

```bash
omniroute contexts list            # すべてのコンテキストを表示します。アクティブなコンテキストには ● が付きます。
omniroute contexts current         # アクティブなサーバー、認証ステータス、スコープを表示します。
```

```text
  | Name    | Base URL                  | Auth  | Scope | Description
● | vps     | http://100.67.86.91:20128 | token | admin | Remote OmniRoute (…)
  | default | http://localhost:20128    | ✗     |       |
```

**サーバーを切り替える** — 以降のすべてのコマンドはアクティブなコンテキストに従います。

```bash
omniroute contexts use vps         # → すべてのコマンドがリモートVPSに送信されるようになります。
omniroute tokens list              #   (VPSに対して実行されます)

omniroute contexts use default     # → localhostに戻ります。
omniroute tokens list              #   (ローカルサーバーに対して実行されます)
```

`connect` の代わりに、**コンテキストを手動で追加**したり、検査したり、名前を変更したりできます。

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # 特定のコンテキストの詳細をすべて表示します。
omniroute contexts rename staging stg
```

**コンテキストを削除する** — 確認を求められます。これをスキップするには `--yes` を渡します（スクリプトや非対話型シェルでは必須です。これがないと安全に拒否されます）。

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) は削除できません。アクティブなコンテキストを削除すると、`default` にフォールバックします。ヒント: コンテキストを削除しても、**ローカルに**保存された認証情報が削除されるだけです。実際にアクセスを停止するには、サーバー上で `omniroute tokens revoke <id>` を使用してトークンを失効させてください。

コンテキストを**エクスポート/インポート**します（例: マシン間で移動する場合）。エクスポートでは、デフォルトで認証情報が省略されます。これには、ファイルフォールバックによって保存された認証情報も含まれます。ポータブルな認証情報を含むバックアップが必要な場合は、明示的に `--include-secrets` を使用してください。

```bash
omniroute contexts export --out contexts.json     # 編集済み; デフォルトの出力先: stdout
omniroute contexts export --include-secrets --out private-contexts.json
omniroute contexts import contexts.json            # 上書きします; 既存のものを保持するには --merge を使用します。
omniroute contexts migrate --yes                  # 従来のプレーンテキストトークンをキーチェーンに移動します。
```

`--include-secrets` は、エクスポートする前にキーチェーン参照を解決し、参照された認証情報のいずれかが読み取れない場合は失敗します。`--no-secrets` は常に優先されます。エクスポートファイルは、モード `0600` でアトミックに書き込まれます。明示的な秘密情報を含むエクスポートは、秘密情報として扱ってください。使用可能なOSキーチェーンがないヘッドレスシステムでは、CLIはモード `0600` の `config.json` にフォールバックし、一度限りの警告を出力します。このモードでは、デフォルトのエクスポートは編集されたままになります。

---

## クイック・エンドツーエンドチェック

リモートセットアップをゼロから検証するためにコピー＆ペーストで実行できる一連の手順です。接続し、
スコープ付きトークンを発行し、コマンドをルーティングし、ローカルに切り替えてから後片付けします。
`192.168.0.15` は、サーバーのホスト名/IP（Tailscale、LAN、または公開
`https://…` URL）に置き換えてください。

```bash
# 1. 接続（パスワード → admin トークン。アクティブになるコンテキストとして保存）
omniroute connect 192.168.0.15                 # または：--key oma_live_xxxx（パスワード不要）
omniroute contexts current                     # リモートサーバーとスコープを表示

# 2. 使用 — 管理コマンドはリモートに対して実行される
omniroute tokens create --name laptop --scope read   # より限定的なトークンを発行
omniroute tokens list                                 # リモートからマスク済みリストを取得

# 3. ローカルとリモートを切り替える
omniroute contexts use default                 # → ローカル
omniroute contexts use 192-168-0-15            # → 再びリモート（名前は `contexts list` で確認）

# 4. 後片付け。注意：`contexts remove` はローカルの認証情報のみを削除する —
#    サーバー上のトークンは失効しない。アクセスを実際に無効化する場合は、
#    先にサーバー側でトークンを失効させる。
omniroute tokens revoke <id|prefix>            # サーバー上のアクセスを無効化
omniroute contexts remove 192-168-0-15 --yes   # ローカルコンテキストを削除（アクティブでも → default にフォールバック）。確認なし
```

> `--yes` を指定すると、`contexts remove` は非対話形式になります（スクリプト/CI では必須です。
> 指定しない場合、非対話型シェルは停止したままになるのではなく、安全のため削除を拒否します）。
> **アクティブな**コンテキストを削除すると、自動的に `default` にフォールバックします。

---

## セキュリティに関する注意事項

- トークンの平文は一度だけ表示され、SHA-256 ハッシュのみが永続化されます（API キーと同様）。
- `omniroute connect` は、ログイン時の総当たり攻撃に対するロックアウト機能と監査ログを再利用します。
- 通信には HTTPS または Tailnet を推奨します。ホストのみを指定した場合、LAN/Tailscale での利便性のためデフォルトで `http://`
  が使用されます。TLS を使用するには完全な `https://…` URL を渡してください。
- 推奨されるローカルコンテキストファイルは `~/.omniroute/config.json`（`chmod 600`）で、
  `credentialRef` のみが含まれます。トークン自体は OS の
  キーチェーン（`keytar`）に保存され、ログに出力されることはありません。利用可能な
  ネイティブキーチェーンが存在しないヘッドレス環境では、明示的なフォールバックとして同じ `0600`
  ファイルを使用し、警告を一度だけ表示します。キーチェーンバックエンドをインストールした後、
  `omniroute contexts migrate --yes` を使用してください。

---

## API エンドポイント（リファレンス）

| メソッド | ルート                | 認証             | スコープ                            |
| -------- | --------------------- | ---------------- | ----------------------------------- |
| POST     | `/api/cli/connect`    | 管理パスワード   | —（公開、パスワードによる制限あり） |
| GET      | `/api/cli/whoami`     | アクセストークン | 読み取り                            |
| GET      | `/api/cli/tokens`     | アクセストークン | 管理                                |
| POST     | `/api/cli/tokens`     | アクセストークン | 管理                                |
| DELETE   | `/api/cli/tokens/:id` | アクセストークン | 管理                                |

完全なスキーマについては、[openapi.yaml](../openapi.yaml) を参照してください。
