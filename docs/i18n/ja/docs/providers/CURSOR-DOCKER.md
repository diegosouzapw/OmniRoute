# Cursor Provider in Docker Environments (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute を Docker 内で実行すると、コンテナからホスト側の Cursor
インストールを参照できないため、従来の **Import from Cursor IDE** /
`cursor-agent` フローは失敗します。代わりに **Login with Cursor**（deep-control PKCE）
を使用してください。

## IDE / CLI インポートが Docker で失敗する理由

1. **ファイルシステムの分離** — 自動インポートは、コンテナ _内_ の
   `~/.config/Cursor/User/globalStorage/state.vscdb` などの Linux パスを検索します。
   macOS 向け Docker Desktop では、ホスト IDE の DB はデフォルトでマウントされず、
   ホストが Darwin であってもコンテナ OS は Linux です。
2. **`cursor-agent` バイナリがない** — 公式 OmniRoute イメージには
   `cursor-agent` は含まれていません。以前の Available Models は
   `cursor-agent --list-models` をシェル経由で実行し、失敗した場合は静的カタログに
   フォールバックしていました。
3. **バイナリが不適切** — macOS の `cursor-agent` を Linux
   コンテナへバインドマウントしないでください。実行できません。

## 推奨: Login with Cursor

1. **Dashboard → Providers → Cursor** を開きます。
2. **Login with Cursor** タブを選択します。
3. **Login with Cursor** をクリックします。OmniRoute が
   **ホスト**のブラウザーで `https://cursor.com/loginDeepControl?…` を開きます。
4. ブラウザーでログインを承認してから、ダッシュボードに戻ります。OmniRoute は
   トークンを受信するまで `api2.cursor.sh/auth/poll` をポーリングします。
5. OmniRoute は **アクセス + リフレッシュ**トークンを保存し、
   `https://api2.cursor.sh/auth/exchange_user_api_key` を通じて更新します。

この方法では、コンテナ内に Cursor IDE や `cursor-agent` は必要ありません。

## モデル検出

ログイン済みの接続がある場合、**Available Models / Auto-Sync** は接続の Bearer
トークンを使用して、Cursor の HTTP `AiService/AvailableModels` カタログを優先します。
これが失敗した場合、OmniRoute は引き続きホストの `cursor-agent`（存在する場合）を試し、
その後、静的レジストリのシードを使用します。

OmniRoute は常に **`auto`**（表示名「Auto」）をカタログに公開し、それに加えて
OpenCodex 形式のルーターモード **`auto-cost`**、**`auto-balance`**、
**`auto-intelligence`** も公開します。通信上では、これらは Cursor の `default`
モデルにマッピングされます（3 つのバリアントでは `optimization` ModelParameter を使用）。
プレミアムモデルの使用量を使い切った場合は、`cu/auto` を優先してください。
Auto にはまだ利用枠が残っていることがあります。

### 同期済みの場合、ライブカタログのみを使用

Cursor モデルの同期に成功した後（`cursor-agent --list-models` → 永続化された
同期済みカタログ、または上記の Bearer 認証済み `AvailableModels` 取得）、
**dashboard**、**`/v1/models`**、および **Test All** には以下が表示されます。

1. ライブ同期によって返されたモデル
2. 注入された自動ルーター ID: `auto`、`auto-cost`、`auto-balance`、`auto-intelligence`
3. オペレーターの**カスタム**モデル（Import / manual）— 同期によって削除されることはありません

`open-sse/config/providers/registry/cursor/` 配下の大規模な静的レジストリは、
**オフライン時のフォールバック専用**です。同期済みカタログが空の場合
（または検出に失敗した場合）、一覧表示はそのレジストリにフォールバックします。

effort サフィックス付き ID（例: `claude-4.6-sonnet-high`）も、実行時には引き続き
**リクエスト**できます。`resolveRequestedModel` はサフィックスを分離して、通信用の
`ModelParameter` に変換します。排他的な一覧表示では、プローブ対象が Cursor から
実際に利用可能として返されるモデルと一致するように、これらの静的バリアントを
意図的に Test All から非表示にします。

### ヘルパー

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — ダッシュボードでのマージ
- `ensureCursorAutoCatalogEntry` — 検出 + 一覧表示時の auto* 注入
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` の静的ループ

## プロバイダー制限（クォータ）

Cursor の **Usage → Provider Limits** は、PKCE またはトークンインポート後に
`api2.cursor.sh` の Bearer API
（`GetCurrentPeriodUsage` → 使用量サマリー → auth/usage）を使用します。
従来の cookie / `cursor.com` ダッシュボード経由の方式は、以前の IDE インポート済み
セッション向けの最終フォールバックとして残されています。

通常、ウィンドウには **Total**、**Auto + Composer**、**API** が含まれます。
制限が空に見える場合は、**Login with Cursor** を再実行するか、トークンを再インポート
してください（IDE インポートだけを行う必要はなくなりました）。

## 空のターン / 使用量超過

Cursor が Run を受け付けたものの、アシスタントのテキストを返さない場合
（プレミアム使用量を使い切った際によく発生）、OmniRoute は単なる
「Provider returned empty content」ではなく、対応方法を示す **429**
（クォータの手掛かり）または **502** を返します。
`not_found: AI Model Not Found`（使用期間の利用枠超過）などのストリーミングエラーは、
**Cursor rate limit / usage exceeded** として分類され、そのメッセージは SSE
パイプライン全体で保持されます（共有の空ストリームガードは、すでに送信されたエラーを
上書きしません）。Provider Limits を確認し、モデル **`auto`** を試すか、
Cursor プランの上限を引き上げてください。

## クライアントバージョン（ヘッドレス）

ローカルに `cursor-agent` がインストールされていない場合、OmniRoute は
`x-cursor-client-version` を、まず環境変数 `CURSOR_AGENT_CLI_VERSION`、
次に Cursor インストーラースクリプトのスクレイピング結果を保存したディスクキャッシュ、
最後に固定されたビルド ID の順で解決します。必要に応じて
`CURSOR_AGENT_CLI_VERSION` で上書きしてください。

## フォールバック: 手動トークンインポート

ブラウザーでのログインを完了できない場合:

1. ホスト上で、Cursor の `state.vscdb` からトークンを抽出します。

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor の認証モーダルで **Import token** を開きます。
3. **Access Token** と、利用可能な場合は **Refresh Token**（自動更新に必要）を
   貼り付けます。Machine ID は任意です。

アクセストークンのみのインポートも機能しますが、リフレッシュトークンがない場合は
期限切れになります。チャットで認証エラーが返されたら、再度インポートしてください。

## 関連情報

- Zed Docker ガイド: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor ログインのリファレンス（外部）:
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
