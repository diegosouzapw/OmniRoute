# Management Authentication (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/MANAGEMENT-AUTH.md) · 🇪🇹 [am](../../../am/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇦 [ar](../../../ar/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇿 [az](../../../az/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇬 [bg](../../../bg/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇩 [bn](../../../bn/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇦 [bs](../../../bs/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇿 [cs](../../../cs/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇰 [da](../../../da/docs/guides/MANAGEMENT-AUTH.md) · 🇩🇪 [de](../../../de/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇷 [el](../../../el/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇸 [es](../../../es/docs/guides/MANAGEMENT-AUTH.md) · 🇪🇪 [et](../../../et/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇷 [fa](../../../fa/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇮 [fi](../../../fi/docs/guides/MANAGEMENT-AUTH.md) · 🇫🇷 [fr](../../../fr/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇪 [ga](../../../ga/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [gu](../../../gu/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ha](../../../ha/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇱 [he](../../../he/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [hi](../../../hi/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇷 [hr](../../../hr/docs/guides/MANAGEMENT-AUTH.md) · 🇭🇺 [hu](../../../hu/docs/guides/MANAGEMENT-AUTH.md) · 🇦🇲 [hy](../../../hy/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇩 [id](../../../id/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [ig](../../../ig/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇹 [it](../../../it/docs/guides/MANAGEMENT-AUTH.md) · 🇬🇪 [ka](../../../ka/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇭 [km](../../../km/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [kn](../../../kn/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇷 [ko](../../../ko/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇹 [lt](../../../lt/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇻 [lv](../../../lv/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ml](../../../ml/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [mr](../../../mr/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇾 [ms](../../../ms/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇹 [mt](../../../mt/docs/guides/MANAGEMENT-AUTH.md) · 🇲🇲 [my](../../../my/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇵 [ne](../../../ne/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇱 [nl](../../../nl/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇴 [no](../../../no/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [or](../../../or/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [pa](../../../pa/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇭 [phi](../../../phi/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇱 [pl](../../../pl/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇹 [pt](../../../pt/docs/guides/MANAGEMENT-AUTH.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇴 [ro](../../../ro/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇺 [ru](../../../ru/docs/guides/MANAGEMENT-AUTH.md) · 🇱🇰 [si](../../../si/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇰 [sk](../../../sk/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇮 [sl](../../../sl/docs/guides/MANAGEMENT-AUTH.md) · 🇷🇸 [sr](../../../sr/docs/guides/MANAGEMENT-AUTH.md) · 🇸🇪 [sv](../../../sv/docs/guides/MANAGEMENT-AUTH.md) · 🇰🇪 [sw](../../../sw/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [ta](../../../ta/docs/guides/MANAGEMENT-AUTH.md) · 🇮🇳 [te](../../../te/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇭 [th](../../../th/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇷 [tr](../../../tr/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/MANAGEMENT-AUTH.md) · 🇵🇰 [ur](../../../ur/docs/guides/MANAGEMENT-AUTH.md) · 🇺🇿 [uz](../../../uz/docs/guides/MANAGEMENT-AUTH.md) · 🇻🇳 [vi](../../../vi/docs/guides/MANAGEMENT-AUTH.md) · 🇳🇬 [yo](../../../yo/docs/guides/MANAGEMENT-AUTH.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/MANAGEMENT-AUTH.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/MANAGEMENT-AUTH.md)

---

OmniRouteには、管理ルートを認証できる**4つの認証情報ファミリー**があります。
これらは互換性がありません。推論APIキー (`sk-…`) は、明示的に `manage` または `admin` スコープが付与されていない限り、サーバーを管理**しません**。

正規の実装: `src/lib/api/requireManagementAuth.ts`。

| 認証情報                     | 一般的な形式                                 | 作成場所                                               | 用途                     | 管理機能                                                                               |
| ---------------------------- | -------------------------------------------- | ------------------------------------------------------ | ------------------------ | -------------------------------------------------------------------------------------- |
| ダッシュボードJWTセッション  | `auth_token` クッキー                        | ダッシュボードログイン                                 | ブラウザUI               | CSRF、ローカリティ、および常に保護されるルートのルールに従う、完全なダッシュボード管理 |
| CLIマシンIDトークン          | 内部 / ローカル                              | CLIブートストラップ (同じマシン上の `omniroute`)       | ローカルCLI              | ローカル管理のみ                                                                       |
| スコープ付きアクセストークン | `oma_live_…`                                 | **設定 → アクセストークン** または `omniroute connect` | リモートCLIおよび管理API | ルートが要求する `read`、`write`、または `admin` スコープを満たす必要があります        |
| 推論APIキー                  | `sk-…` (およびその他のAPIキープレフィックス) | **APIマネージャー / APIキー**                          | `/v1/*` 推論             | キーのメタデータに `manage` または `admin` が含まれていない限り**なし**                |

`oma_` 認証情報は管理/CLI認証情報です。これらは推論APIキーでは**ありません**。

サーバーでログイン/APIキー認証が無効になっている場合、一部の管理ルートは認証されていない呼び出しを受け入れることがあります。ローカル専用ルートおよび常に保護されるルートは、引き続き独自のルールを適用します。したがって、これらの認証情報のいずれかを提示することが常に必須であるわけではなく、必要なスコープとルートのローカリティなしに、いずれかを持っていることが常に十分であるわけでもありません。

関連: [リモートモード](./REMOTE-MODE.md) (`oma_live_…` がリモートCLI用にどのように発行されるか)。

---

## スコープマトリックス

APIキー管理スコープとアクセストークンスコープは異なる語彙です。
MCPツールのスコープは第三の語彙であり、以下の表にあるどちらかの関数ではなく、`scopeMatches`でチェックされます。
比較: [3つのスコープ名前空間](../frameworks/MCP-SERVER.md#three-scope-namespaces)。

### アクセストークンスコープ (`oma_live_…`)

| スコープ | 一般的な操作                                                                                   |
| -------- | ---------------------------------------------------------------------------------------------- |
| `read`   | トークンが表示を許可されているリスト/ステータスのGET操作                                       |
| `write`  | 管理者権限未満の変更操作（作成/更新/削除）                                                     |
| `admin`  | 完全なリモートCLI / 接続トークン（パスワードブートストラップのデフォルトがここに適用されます） |

`read`スコープを持つトークンは、`write`ルートを呼び出すことはできません。ランタイムメッセージの形式:
`Access token scope '<have>' is insufficient; '<need>' required.`

### APIキー管理スコープ

| スコープ | 意味                                                           |
| -------- | -------------------------------------------------------------- |
| (none)   | 推論のみ。管理ルートは403を返します。                          |
| `manage` | 管理API（`requireManagementAuth` APIキーブランチと同じゲート） |
| `admin`  | `hasManageScope`も満たします（管理可能として扱われます）       |

APIキー / APIマネージャーUIで、キーに`manage`を有効にしてください。意図的にそのスコープを付与しない限り、チャットクライアントキーを自動化のために再利用しないでください。

---

## 作成および失効の方法

### ダッシュボード JWT セッション

1. `/login` を開き、管理パスワード（初回起動時は `INITIAL_PASSWORD`）でサインインします。
2. Cookie `auth_token` は HttpOnly です。ブラウザーのダッシュボードが自動的に使用します。
3. `/api/auth/logout` からログアウトします。コピー可能な長期有効シークレットはありません。

### CLI マシン ID トークン

1. サーバーと**同じホスト**（ループバック）で `omniroute` を実行します。
2. CLI は `~/.omniroute/` 配下にマシン ID トークンをブートストラップします（chmod 600）。
3. これは別のマシンからは機能**しません**。リモート CLI にはアクセストークンを使用してください。

### スコープ付きアクセストークン（`oma_live_…`）

1. ダッシュボード: **設定 → アクセストークン** → 作成（名前 + スコープ）。**シークレットが表示されるのは一度だけです。**
2. または CLI: `omniroute connect <host>`（パスワード → トークン）。[リモートモード](./REMOTE-MODE.md)を参照してください。
3. ヘッダー: `Authorization: Bearer oma_live_…`
4. 同じアクセストークンページから失効させます（または CLI コンテキストを削除します）。
5. サーバーはハッシュのみを保存します。平文はパスワードと同様に扱ってください。

### `manage` スコープ付き API キー

1. ダッシュボード: **API マネージャー / API キー** → キーを作成または編集 → `manage`（または `admin`）を有効化します。
2. ヘッダー: `Authorization: Bearer sk-…`（キーの実際のプレフィックス）。
3. 同じ UI でキーを失効させるか、`manage` を削除します。
4. CLI 以外の自動化には最小権限を適用してください。GET のみのジョブには `read` アクセストークンを推奨します。API キーの `manage` は、呼び出し元が `/v1` と管理 API の両方を使用する必要がある場合にのみ使用してください。

---

## ヘッダー形式

```http
Authorization: Bearer oma_live_<secret>
Authorization: Bearer sk-<secret>
Cookie: auth_token=<dashboard-jwt>
```

管理用認証情報を URL パスまたはクエリ文字列に含めないでください。管理用認証はヘッダーまたは Cookie でのみ受け付けられます。

---

## コピー＆ペースト可能な例

読み取り専用（プロバイダー一覧の取得）。`read` Access Token を使用します。

```bash
curl -sS "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<read-token>"
```

変更操作（プロバイダー接続の作成）。`write`/`admin` Access Token、または `manage` スコープを持つ API キーを使用します。

```bash
curl -sS -X POST "$OMNIROUTE_URL/api/providers" \
  -H "Authorization: Bearer oma_live_<write-or-admin-token>" \
  -H "Content-Type: application/json" \
  -d '{"provider":"openai","apiKey":"<upstream-key>"}'
```

推論（管理操作ではありません）。通常の API キーを使用し、`manage` は不要です。

```bash
curl -sS "$OMNIROUTE_URL/v1/models" \
  -H "Authorization: Bearer sk-<inference-key>"
```

---

## 現在のランタイムエラー（シークレットはエコーしない）

| 状況                                           | 通常のステータス | メッセージ（サニタイズ済み）                                         |
| :--------------------------------------------- | :--------------- | :------------------------------------------------------------------- |
| 認証情報なし                                   | 401              | `Authentication required`                                            |
| 無効/期限切れの `oma_live_…`                   | 401              | `Invalid or expired access token`                                    |
| `manage`/`admin` スコープのない有効な API キー | 403              | `API key lacks 'manage' scope. Enable it in the API Keys dashboard.` |
| 管理ルート上の無効な通常の API キー            | 403              | `Invalid management token`                                           |
| アクセストークンのスコープが低すぎる           | 403              | `Access token scope '<have>' is insufficient; '<need>' required.`    |

「Invalid management token」は、ベアラーが管理認証情報として**受け入れられなかった**ことを意味します。どのファミリーを生成すべきかは示されません。上記の表を使用してください。推論キーには `manage` スコープが必要です。リモート CLI には `oma_live_…` が必要です。ダッシュボードはセッションクッキーを使用します。

---

## 最小権限の推奨選択肢

| 呼び出し元                                    | 用途                                            |
| :-------------------------------------------- | :---------------------------------------------- |
| ブラウザ                                      | ダッシュボードセッション                        |
| サーバーホスト上のCLI                         | マシントークン                                  |
| リモートサーバーと通信するラップトップ上のCLI | `omniroute connect` からの `oma_live_…`         |
| CI / スクリプト (管理のみ)                    | 動作する最小スコープの `oma_live_…`             |
| `/v1` と `/api` の両方を呼び出す必要があるCI  | `manage` を持つAPIキー **または** 2つの認証情報 |
