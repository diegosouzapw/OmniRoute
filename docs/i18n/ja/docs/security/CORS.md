# CORS Configuration & Security (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute は、一元管理された単一の許可リストを使用して、どの **ブラウザオリジン** がクロスオリジンレスポンスを読み取れるかを制御します。このモデルは **デフォルトでフェイルクローズ** です。明示的に許可するまで、どのオリジンも許可されません。このページでは、許可リストの解決方法、`CORS_ALLOW_ALL=true` が実際に何を公開するのか（そして重要な点として、何を公開 **しない** のか）、開発環境と本番環境を安全に設定する方法、およびワイルドカードが有効な場合にダッシュボードに表示されるランタイム警告について説明します。

**信頼できる情報源:** `src/server/cors/origins.ts`（`resolveAllowedOrigin`、`applyCorsHeaders`、`getCorsStatus`）。許可リストはミドルウェア（`src/server/authz/pipeline.ts`）で一度だけ適用されます。ルートごとのハンドラーが独自に `Access-Control-Allow-Origin` を設定することはありません。

## オリジンの解決方法

リクエストごとに、ミドルウェアは次の順序で `Access-Control-Allow-Origin` の値を算出します。

1. **`CORS_ALLOW_ALL=true`**（または従来の `CORS_ORIGIN=*`）→ 呼び出し元の `Origin` をそのまま返します（`Origin` ヘッダーがない場合は `*`）。また、キャッシュが正しく機能するように `Vary: Origin` を設定します。同じ `applyCorsHeaders()` チョークポイントは、トークン認証された `/v1*`/`/v1beta*` サーフェス上で、本文を含むすべての 2xx レスポンスに `Vary: Accept-Encoding` も追加します（`relaxForTokenAuth`、RFC 9110 §12.5.5、issue #6737）。これにより、ダウンストリームキャッシュや共有キャッシュは、圧縮版と非圧縮版を正しく区別できます。
2. それ以外の場合、リクエストの `Origin` を正規化し（小文字化し、末尾のスラッシュを削除）、次の **統合された許可リスト** と照合します。
   - env **`CORS_ALLOWED_ORIGINS`** — カンマ区切りのリスト、および
   - ランタイムの **`corsOrigins`** 設定（Dashboard → Security → _CORS Allowed Origins_）。これは `src/lib/config/runtimeSettings.ts` から `setRuntimeAllowedOrigins()` を介して注入されます。
3. 一致しない場合 → **`Access-Control-Allow-Origin` ヘッダーは送信されません**。ブラウザはクロスオリジンでの読み取りをブロックします。これが意図されたフェイルクローズのデフォルト動作です。

| 環境変数               | 意味                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | 許可する完全一致のオリジンを指定する CSV（推奨）。                                       |
| `CORS_ALLOW_ALL`       | `true`/`1` → 任意のオリジンをそのまま返す（ワイルドカード）。開発環境専用。              |
| `CORS_ORIGIN`          | 従来の設定。`*` は `CORS_ALLOW_ALL` と同様に動作し、単一の値は許可リストに追加されます。 |

## 脅威モデル — `CORS_ALLOW_ALL=true` が実際に公開するもの

一般的な OWASP の警告（「ワイルドカード CORS = どのサイトからでも API を呼び出せる」）は真剣に受け止めるべきですが、OmniRoute での公開範囲は、次の具体的な実装上の事実により、**一般的なケースよりも限定的** です。

> **中央の `applyCorsHeaders()` は
> `Access-Control-Allow-Credentials` を決して送信しません。** サーバーが
> `Access-Control-Allow-Credentials: true` を送信しない限り、ブラウザは
> _認証情報付き_（Cookie を含む）のクロスオリジンレスポンスを公開しません。
> OmniRoute の共有 CORS パスがこれを送信することはありません。

これは、`CORS_ALLOW_ALL=true` の場合でも、各サーフェスで次のことを意味します。

| サーフェス                           | 認証メカニズム                | ワイルドカード CORS の影響                                                                                                                                                                                                                                      |
| ------------------------------------ | ----------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`      | Cookie セッション             | オリジンはそのまま返されますが、**`Allow-Credentials` がないため**、ブラウザは **認証情報付きの読み取りをブロック** します。悪意のあるクロスオリジンサイトが認証済みのダッシュボードレスポンスを **読み取ることはできず**、セッション Cookie も公開されません。 |
| Client API `/v1/*`, `/v1beta/*`      | Bearer / `x-api-key` ヘッダー | **設計上、すでに許容的** です（`relaxForTokenAuth`）。ブラウザが `Authorization`/`x-api-key` を自動的に付加することはないため、攻撃者のページがユーザーのキーを提供することはできません。`CORS_ALLOW_ALL` によってこの範囲が拡大することはありません。          |
| 公開読み取り専用（`/api/health`、…） | なし                          | 機密性がないため、ワイルドカードでも問題ありません。                                                                                                                                                                                                            |

したがって、`CORS_ALLOW_ALL=true` による **残余** の公開範囲は、次のものに限定されます。(a) すでに未認証で利用可能なデータに対する、認証情報を伴わないクロスオリジンの **読み取り**、および (b) 管理ルートで CORS **プリフライトを通過させること**。ただし、これらのルートには引き続き認証が必要であり、クロスオリジンページがその認証を提供することはできません。共有 CORS パスにおいて、これはセッションハイジャックや認証情報窃取の攻撃経路では **ありません**。

### 唯一の実質的な例外 — `/api/v1/agents/`

Cloud-Agent ルート（`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`）は **独自の** CORS ヘッダー（`src/lib/cloudAgent/api.ts`、`getCloudAgentCorsHeaders`）を設定し、`Access-Control-Allow-Origin: <origin>|*` と `Access-Control-Allow-Credentials: true` を同時に送信 **します**。これはオリジンのエコーと認証情報が共存する唯一のサーフェスであり、`CORS_ALLOW_ALL` とは **独立しています**。これらのルートは管理認証（`requireManagementAuth`）で保護されています。ダッシュボードをホスト外部に公開する運用担当者は、レスポンスヘッダーによってクロスオリジンの認証情報付き読み取りが許可される唯一の箇所がここであることを認識しておく必要があります。これを明示的な許可リストに制限する対応は、この CORS ガイダンスとは別に追跡されています。

## 本番環境向けチェックリスト

- **本番環境では絶対に `CORS_ALLOW_ALL=true` を設定しないでください。** 未設定のままにしてください。
- 環境変数または Security タブのフィールドで、**明示的な**オリジンリストを設定してください。

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute がリバースプロキシ／トンネル（nginx、Caddy、Cloudflare
  Tunnel、Tailscale）の背後で動作する場合、CORS は**唯一の**制御手段ではありません。ループバックルート
  ガードは引き続き、プロセス起動が可能なルートを保護します（
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) を参照）。403 を「修正」するために
  `X-Forwarded-For: 127.0.0.1` を偽装しないでください。これを行うと、ルートガードが
  防いでいる RCE クラスの脆弱性が再び生じます。
- ランタイム状態を確認してください。`CORS_ALLOW_ALL=true` が有効な間、ダッシュボードの
  Dashboard → Security → Authorization Inventory の下には**常時表示される琥珀色のバナー**
  が表示され、`/api/settings/authz-inventory` は監視ツールがポーリングできる
  `cors: { allowAll, allowedOrigins }` エンベロープを返します。

## 開発時の利便性 — 特定のローカルオリジンを許可する

開発環境でも、ワイルドカードが必要になることはほとんどありません。使用する開発サーバーだけを許可してください。

```bash
# ローカルの OmniRoute を呼び出す Vite (5173) + Next.js (3000) 開発サーバー
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

オリジンは大文字と小文字を区別せず、末尾のスラッシュを無視して照合されるため、
`http://localhost:3000` と `http://localhost:3000/` は同等です。同じ CSV を
**Dashboard → Security → CORS Allowed Origins** で設定すれば、再起動せずにランタイムへ
反映できます。

## API キーと Cookie セッションの比較

- **Bearer / `x-api-key`（`/v1/*` 推論サーフェス）：** ブラウザーがこれらを自動的に
  付加することはありません。ここでは CORS は意味のある防壁ではなく、API キーが
  防壁です。そのため、このサーフェスは意図的に寛容に設定されており、ブラウザーおよび
  Electron クライアントは、すでにアクセス権を持つレスポンスを読み取れます。
- **Cookie セッション（ダッシュボード）：** フェイルクローズのデフォルト設定**と**
  共有パスに `Access-Control-Allow-Credentials` が存在しないことによって保護されます。
  管理／ダッシュボードのオリジンを寛容な設定に含めないでください。これらは厳密に
  フェイルクローズのままにする必要があります。

## 例：OmniRoute の前段にあるリバースプロキシ

CORS は OmniRoute 自体によって適用されるため、通常、プロキシは `Access-Control-*`
ヘッダーを追加または書き換えるべきではありません（ヘッダーが重複するとブラウザーで
問題が発生します）。TLS を終端して転送し、プリフライトには OmniRoute が応答するようにしてください。

```nginx
# nginx — OmniRoute に転送する。ここでは Access-Control-* を挿入しないこと
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For を 127.0.0.1 に設定しないこと。ループバックルートガードが無効になります。
}
```

許可するブラウザーオリジンは、プロキシではなく OmniRoute（`CORS_ALLOWED_ORIGINS` または
Security タブ）で設定してください。

## ソースファイル

| 対象                                         | ファイル                                                             |
| -------------------------------------------- | -------------------------------------------------------------------- |
| 許可リストの解決 + `getCorsStatus()`         | `src/server/cors/origins.ts`                                         |
| ミドルウェアの適用（信頼できる唯一の情報源） | `src/server/authz/pipeline.ts`                                       |
| Settings → ランタイムへのオリジン注入        | `src/lib/config/runtimeSettings.ts`                                  |
| ダッシュボード向けのランタイム状態           | `src/app/api/settings/authz-inventory/route.ts`                      |
| ダッシュボードの警告バナー                   | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins フィールド              | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent のルート単位 CORS（例外）        | `src/lib/cloudAgent/api.ts`                                          |

## 関連項目

- [ルートガードの階層](./ROUTE_GUARD_TIERS.md) — spawn 対応ルートに対するループバックの強制
  （独立した補完的な制御）。
- [認可ガイド](../architecture/AUTHZ_GUIDE.md) — 認証・認可パイプラインの全体像。
