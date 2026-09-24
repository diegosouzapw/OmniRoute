# Tunnels Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/TUNNELS_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/TUNNELS_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/TUNNELS_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/TUNNELS_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/TUNNELS_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/TUNNELS_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/TUNNELS_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/TUNNELS_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/TUNNELS_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/TUNNELS_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/TUNNELS_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/TUNNELS_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/TUNNELS_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/TUNNELS_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/TUNNELS_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/TUNNELS_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/TUNNELS_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/TUNNELS_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/TUNNELS_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/TUNNELS_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/TUNNELS_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/TUNNELS_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/TUNNELS_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/TUNNELS_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/TUNNELS_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/ops/TUNNELS_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/TUNNELS_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/TUNNELS_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/TUNNELS_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/TUNNELS_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/TUNNELS_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/TUNNELS_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/TUNNELS_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/TUNNELS_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/TUNNELS_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/TUNNELS_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/TUNNELS_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/TUNNELS_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/TUNNELS_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/TUNNELS_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/TUNNELS_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/TUNNELS_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/TUNNELS_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/TUNNELS_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/TUNNELS_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/TUNNELS_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/TUNNELS_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/TUNNELS_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/TUNNELS_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/TUNNELS_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/TUNNELS_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/TUNNELS_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/TUNNELS_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/TUNNELS_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/TUNNELS_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/TUNNELS_GUIDE.md)

---

> **信頼できる情報源:** `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`、`src/app/api/tunnels/`
> **最終更新:** 2026-06-28 — v3.8.40

OmniRoute は、3 種類のトンネルバックエンドを介してローカルサーバー（`http://localhost:20128`）を公開インターネットに公開できます。これは次の用途に役立ちます。

- 公開アクセス可能なリダイレクト URL を必要とするクラウドプロバイダー（Antigravity、Gemini、Cursor）からの OAuth コールバック。
- VM をデプロイせずにローカルインスタンスをチームメンバーと共有。
- モバイル、リモート、または異なるネットワーク間でのテスト。

3 つのバックエンドはすべてプロセス内で管理されます。OmniRoute は、ダッシュボードまたは REST API から基盤となるバイナリや SDK を起動／停止します。リバースプロキシや systemd の設定は不要です。

## バックエンドの概要

| バックエンド                | 永続性                                               | コスト         | セットアップ                                            |
| --------------------------- | ---------------------------------------------------- | -------------- | ------------------------------------------------------- |
| **Cloudflare Quick Tunnel** | 一時的（再起動のたびに URL が変わる）                | 無料           | 不要 — `cloudflared` を自動インストール                 |
| **ngrok**                   | 有料プランまたは固定ドメインが設定されている間は固定 | 無料枠 + 有料  | ngrok アカウント + authtoken が必要                     |
| **Tailscale Funnel**        | tailnet 内のノードごとに固定                         | 個人利用は無料 | Tailscale のインストール + ログイン + Funnel ACL が必要 |

実装は `src/lib/cloudflaredTunnel.ts`、`src/lib/ngrokTunnel.ts`、`src/lib/tailscaleTunnel.ts` にあります。3 つとも、`phase`、`running`、`publicUrl`、`apiUrl`、`targetUrl`、`lastError` フィールドを持つ共通形式の `status` オブジェクトを返すため、ダッシュボードでは同じ形式で表示できます。

## 1. Cloudflare Tunnel（Quick Tunnel + Named Tunnel）

`src/lib/cloudflaredTunnel.ts` は `cloudflared` を子プロセスとして実行します。名前付きトンネルの設定が指定されているかどうかに応じて、次の 2 つのモードをサポートします。

- **Quick tunnel（デフォルト）。** `cloudflared tunnel --url
http://localhost:<apiPort>` を実行し、割り当てられた `*.trycloudflare.com` URL
  を標準出力から解析します。URL は一時的で、再起動のたびに変わります。
- **Named tunnel（オプトイン）。** `CLOUDFLARED_CONFIG` がローカル管理の
  cloudflared `config.yml` を指している場合、OmniRoute は `cloudflared tunnel --no-autoupdate
--config <path> run` を実行し、**固定された名前付きホスト名**を提供します。設定ファイルがトンネル UUID、`credentials-file`、`ingress` ルーティングを提供するため、
  `--url` は渡されず、Zero Trust ダッシュボードのトークンも必要ありません。`run` は
  設定内の絶対 `credentials-file` パスから認証情報を読み取ります。`cert.pem`
  は不要です（これはトンネルのライフサイクル管理にのみ使用されます）。

主な動作:

- **自動インストール。** 初回使用時に、OmniRoute は公式 GitHub リリースから最新の `cloudflared`
  バイナリをダウンロードします（管理対象のインストール先は
  `DATA_DIR/cloudflared/`）。実行前に、ダウンロードしたアセットの SHA256 が
  リリースマニフェストに照らして検証されます。
- **プロセス監視。** cloudflared の PID と解決済み URL は
  `quick-tunnel-state.json` に永続化されるため、ダッシュボードを再読み込みしてもステータスを復元できます。

### Named tunnel のセットアップ（固定ホスト名）

1. cloudflared CLI を使用して、ローカル管理のトンネルを作成します（初回のみ）。

   ```bash
   cloudflared tunnel login
   cloudflared tunnel create omniroute
   cloudflared tunnel route dns omniroute ai.example.com
   ```

2. ホスト名を OmniRoute のローカル API ポート（デフォルトは 20128）へルーティングする
   `~/.cloudflared/config.yml` を作成します。

   ```yaml
   tunnel: <UUID-from-create>
   credentials-file: /home/you/.cloudflared/<UUID>.json
   ingress:
     - hostname: ai.example.com
       service: http://127.0.0.1:20128
     - service: http_status:404
   ```

3. OmniRoute に設定ファイルを指定し、トンネルを（再）起動します。

   ```bash
   export CLOUDFLARED_CONFIG="/home/you/.cloudflared/config.yml"
   # 任意 — OmniRoute が報告するホスト名を上書きします。指定しない場合は
   # 設定の最初の ingress ルールから読み取られます。
   # export CLOUDFLARED_HOSTNAME="ai.example.com"
   ```

   Quick tunnel と同じ方法（以下の REST／ダッシュボード／CLI）でトンネルを有効化します。Named tunnel は取得可能な公開 URL を出力しないため、cloudflared がエッジ接続を登録したことによって準備完了を検出し、`publicUrl`／`apiUrl` は `CLOUDFLARED_HOSTNAME`（または設定内の最初の ingress ホスト名）から報告されます。

### REST による有効化／無効化

このエンドポイントは個別の `start`／`stop` パスではなく、`{action: "enable" | "disable"}` ボディを使用します。管理認証（管理者セッションまたは管理者 API キー）が必要です。

```bash
# 有効化
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# ステータス
curl http://localhost:20128/api/tunnels/cloudflared \
  -H "Cookie: auth_token=..."

# 無効化
curl -X POST http://localhost:20128/api/tunnels/cloudflared \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

またはダッシュボードから: **Settings → Tunnels → Cloudflare**。

### 任意の環境変数

| 変数                                                 | 用途                                                                                                                                                                                          |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLOUDFLARED_BIN`                                    | バイナリのパスを上書きします。設定されており有効な場合、OmniRoute はダウンロードする代わりにそのバイナリを使用します。                                                                        |
| `CLOUDFLARED_PROTOCOL` / `TUNNEL_TRANSPORT_PROTOCOL` | トランスポートプロトコル（デフォルトは `http2`。`quic`、`auto` も指定可能）。                                                                                                                 |
| `CLOUDFLARED_CONFIG`                                 | ローカルで管理されている cloudflared の `config.yml` へのパス。設定すると、OmniRoute はクイックトンネルではなく、**名前付き／永続的な**トンネル（`tunnel --config <path> run`）を実行します。 |
| `CLOUDFLARED_HOSTNAME`                               | 名前付きトンネルで報告される公開ホスト名（例：`ai.example.com`）を上書きします。未設定の場合は、設定内の最初の `ingress` ホスト名から読み取ります。                                           |

## 2. ngrok

`src/lib/ngrokTunnel.ts` は **`@ngrok/ngrok` SDK** を使用します（プロセス内で実行され、CLI サブプロセスは使用しません）。ビルド済みバイナリがないプラットフォームでも起動時にアプリが動作不能にならないよう、ネイティブモジュールは初回起動時に遅延インポートされます。

### 前提条件

1. <https://ngrok.com> でアカウントを作成します。
2. ngrok ダッシュボードから authtoken をコピーします。
3. 次のいずれかの方法で指定します。
   - `.env`: `NGROK_AUTHTOKEN=<token>`、または
   - ダッシュボード: **Settings → Tunnels → ngrok**、または
   - REST ボディ（1 回限り）: `{"action":"enable","authToken":"<token>"}`。

いずれも設定されていない場合、ステータスは `phase: "needs_auth"` を返します。

### REST による有効化 / 無効化

```bash
# 有効化（環境変数の NGROK_AUTHTOKEN を使用）
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable"}'

# インラインのトークンを使用して有効化
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"enable","authToken":"2abc..."}'

# ステータス
curl http://localhost:20128/api/tunnels/ngrok \
  -H "Cookie: auth_token=..."

# 無効化
curl -X POST http://localhost:20128/api/tunnels/ngrok \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"action":"disable"}'
```

レスポンスには、割り当てられた `publicUrl`（例:
`https://abcd-1234.ngrok-free.app`）が含まれます。カスタムドメイン、リージョン、およびポリシールールは ngrok ダッシュボードで設定する必要があります。OmniRoute 自体はローカルのターゲット URL を SDK に転送するだけです。

## 3. Tailscale Funnel

`src/lib/tailscaleTunnel.ts` は、システムの `tailscale` CLI を制御し、**Funnel**（serve 用の Tailscale パブリックインターネット出力）経由でローカル API ポートを公開します。インストール、ログイン、デーモンの起動、有効化、無効化というライフサイクル全体をサポートします。

実装では `tailscale funnel --bg <port>`（バックグラウンドモード）を呼び出します。公開 URL の形式は `https://<machine>.<tailnet>.ts.net/` です。

### 前提条件

1. Tailscale をインストールします（または OmniRoute にインストールさせます。下記の `install` エンドポイントを参照してください）。
2. サインインします（`tailscale login`、または OmniRoute の `login` エンドポイントを使用します）。
3. Tailscale 管理コンソールで tailnet の Funnel を有効にします:
   <https://login.tailscale.com/admin/settings/features>。

Linux および macOS では、デーモン（`tailscaled`）を制御するために `sudo` が必要です。POST エンドポイントはオプションの `sudoPassword` フィールドを受け付けます。このフィールドは、呼び出し中に OmniRoute の MITM パスワードキャッシュ（`getCachedPassword` / `setCachedPassword`）へ転送されます。Windows では、`C:\Program Files\Tailscale\tailscale.exe` にあるデフォルトのサービスインストールが使用されます。

### REST エンドポイント

Tailscale ではインストール、ログイン、デーモン、トンネルがそれぞれ独立しているため、他のバックエンドよりも多くの機能が提供されます。

| エンドポイント                        | メソッド | 目的                                                                        |
| ------------------------------------- | -------- | --------------------------------------------------------------------------- |
| `/api/tunnels/tailscale`              | `GET`    | トンネルの集約ステータス（`phase`、`tunnelUrl`、`apiUrl` など）             |
| `/api/tunnels/tailscale/check`        | `GET`    | 低レベルの確認: インストール済みか、ログイン済みか、デーモンが実行中か      |
| `/api/tunnels/tailscale/install`      | `POST`   | Tailscale をインストール（SSE で進捗イベントをストリーミング）— Linux/macOS |
| `/api/tunnels/tailscale/start-daemon` | `POST`   | Linux/macOS で `tailscaled` を起動                                          |
| `/api/tunnels/tailscale/login`        | `POST`   | ログインフローを開始し、ブラウザで開くための `authUrl` を返す               |
| `/api/tunnels/tailscale/enable`       | `POST`   | API ポート用の Funnel を開始                                                |
| `/api/tunnels/tailscale/disable`      | `POST`   | Funnel を停止                                                               |

すべての Tailscale エンドポイントでは管理認証が必要です（`routeUtils.ts ::
requireTailscaleAuth` を参照）。

有効化の例:

```bash
curl -X POST http://localhost:20128/api/tunnels/tailscale/enable \
  -H "Content-Type: application/json" \
  -H "Cookie: auth_token=..." \
  -d '{"sudoPassword":"<linux-pwd>","port":20128}'
```

管理コンソールで Funnel が有効になっていない場合、レスポンスには `funnelNotEnabled: true` と、ブラウザで開くための `enableUrl` が含まれます。

### オプションの環境変数

| 変数            | 目的                               |
| --------------- | ---------------------------------- |
| `TAILSCALE_BIN` | `tailscale` バイナリのパスを上書き |

## エンドポイント一覧

| エンドポイント                        | メソッド | ボディ                              | 認証   |
| ------------------------------------- | -------- | ----------------------------------- | ------ |
| `/api/tunnels/cloudflared`            | `GET`    | —                                   | 管理者 |
| `/api/tunnels/cloudflared`            | `POST`   | `{action: "enable" \| "disable"}`   | 管理者 |
| `/api/tunnels/ngrok`                  | `GET`    | —                                   | 管理者 |
| `/api/tunnels/ngrok`                  | `POST`   | `{action, authToken?}`              | 管理者 |
| `/api/tunnels/tailscale`              | `GET`    | —                                   | 管理者 |
| `/api/tunnels/tailscale/check`        | `GET`    | —                                   | 管理者 |
| `/api/tunnels/tailscale/install`      | `POST`   | `{sudoPassword?}` (SSE)             | 管理者 |
| `/api/tunnels/tailscale/start-daemon` | `POST`   | `{sudoPassword?}`                   | 管理者 |
| `/api/tunnels/tailscale/login`        | `POST`   | `{hostname?}`                       | 管理者 |
| `/api/tunnels/tailscale/enable`       | `POST`   | `{sudoPassword?, hostname?, port?}` | 管理者 |
| `/api/tunnels/tailscale/disable`      | `POST`   | `{sudoPassword?}`                   | 管理者 |

一元化された `/api/settings/tunnels` エンドポイントはありません。各バックエンドは
それぞれ独立しています。

## OAuth コールバックに関する考慮事項

トンネル経由で OmniRoute を公開する場合、ダッシュボードおよび OAuth フローでは、
`localhost` ではなく**公開**ホスト名を基準にコールバック URL を構築する必要があります。
そうしないと、OAuth プロバイダーは、そのサーバーから到達できない URL にユーザーを
リダイレクトするため、ハンドシェイクが失敗します。

ダッシュボードでの編集や設定の保存では、トンネルのホスト名を
`NEXT_PUBLIC_BASE_URL` に固定する必要はありません。認証済みダッシュボードは、
セッションに紐付けられた CSRF トークンを使用して同一オリジンへの安全でない
リクエストを送信するため、ログイン後は一時的な Cloudflare Quick Tunnel の
ホストでも通常の UI 管理に使用できます。

次のように設定します。

```bash
NEXT_PUBLIC_BASE_URL=https://<your-tunnel-host>
```

OAuth を開始する前に OmniRoute を再起動してください。一時的な Cloudflare Quick
Tunnel では再起動のたびに URL が変わるため、本番環境で OAuth を使用する場合は、
予約済みドメインを使用する ngrok または Tailscale Funnel を推奨します。

## ヘルスチェックと監視

ダッシュボードの **Settings → Tunnels** にトンネルの状態が表示されます。

- アクティブなバックエンドと現在の `phase`（`stopped`、`starting`、`running`、
  `needs_auth`、`error`）。
- 現在の公開 URL と、そこから生成された API URL（`<publicUrl>/v1`）。
- トンネルの転送先となるローカルターゲット URL。
- 最後のエラーメッセージ（存在する場合）。

プログラムから監視する場合は、バックエンドごとの `GET` エンドポイントを
ポーリングしてください。複数のバックエンドを同時に実行することも可能で、
OmniRoute はそれぞれを個別に追跡します。

## トラブルシューティング

### 「cloudflared バイナリが見つかりません」

OmniRoute は初回使用時に自動インストールを試みます。インストールがブロックされる場合
（ネットワークが制限されている、GitHub にアクセスできないなど）は、
<https://github.com/cloudflare/cloudflared/releases> から `cloudflared` を
手動でダウンロードし、`CLOUDFLARED_BIN=/path/to/cloudflared` を設定してください。

### 「ngrok: authtoken が必要です」

`phase: "needs_auth"` は、authtoken が見つからなかったことを意味します。
`.env` に `NGROK_AUTHTOKEN` を設定するか、ダッシュボードから設定するか、
有効化用 POST リクエストのボディに `authToken` を渡してください。

### 「tailscale: funnel が有効になっていません」

有効化レスポンスに `funnelNotEnabled: true` が含まれている場合、使用中の
tailnet では Funnel が無効になっています。返された `enableUrl`（または管理コンソールの
機能ページ）を開き、Funnel を有効にしてください。

### トンネル URL の変更によって OAuth が機能しなくなる

予約済みドメインを使用する ngrok または Tailscale Funnel（どちらもノードごとに
安定した URL）を使用してください。Cloudflare Quick Tunnel は仕様上、一時的な
ものであるため、長期間使用する OAuth コールバックには推奨されません。

### Linux/macOS で Tailscale のアクセス許可が拒否される

`tailscaled` には root 権限が必要です。該当する POST エンドポイントに
`sudoPassword` を指定するか、デーモンを自分で起動してください
（`sudo systemctl start tailscaled`）。

## 関連項目

- [PROXY_GUIDE.md](./PROXY_GUIDE.md) — 外向きトラフィック用のアウトバウンドプロキシ（1proxy、SOCKS5、HTTP）。
- [ENVIRONMENT.md](../reference/ENVIRONMENT.md) — `NEXT_PUBLIC_BASE_URL` を含む環境変数の完全な一覧。
- [FLY_IO_DEPLOYMENT_GUIDE.md](./FLY_IO_DEPLOYMENT_GUIDE.md)、
  [DOCKER_GUIDE.md](../guides/DOCKER_GUIDE.md) — 安定した公開ホスティングを実現するための、トンネリングに代わる手段。
- ソース: `src/lib/{cloudflaredTunnel,ngrokTunnel,tailscaleTunnel}.ts`、
  `src/app/api/tunnels/`。
