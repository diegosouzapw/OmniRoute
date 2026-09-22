# Authorization Guide (日本語)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **信頼できる唯一の情報源:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **最終更新:** 2026-06-28 — v3.8.40

OmniRoute には、すべての API リクエストを制御する、ルートを認識する認可パイプラインがあります。分類は**決定論的**かつ**フェイルクローズ**です。つまり、分類できないものはすべて `MANAGEMENT` として扱われ、セッションまたは管理レベルのトークンが必要になります。このページでは、ルートを保守するエンジニアや新しいエンドポイントを設計するエンジニア向けに、このモデルについて説明します。

![AuthZ パイプライン（3 つのルートクラス + ポリシー評価）](../diagrams/exported/authz-pipeline.svg)

> 出典: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## 2 つの認証モード

### 1. API キー（Bearer）

OpenAI/Anthropic/Gemini 互換のクライアント API、およびキーに `manage` スコープがある場合の一部の管理ルートで使用されます。

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` の `isValidApiKey()` / `extractApiKey()` によって検証され、`src/shared/utils/apiAuth.ts` を通じて再エクスポートされます。バリデーターは、永続的なパススルーキーとして `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境変数も受け付けます（issue #1350）。

### 2. ダッシュボードセッション（auth_token cookie）

ダッシュボードページおよび管理者操作で使用されます。

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT の検証に成功し、**かつ** `authenticated: true` が含まれている場合に限り、cookie はセッションとして扱われます
（`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`）。この
cookie を利用するすべてのコンシューマー（ルートガード、AuthZ パイプラインの更新、WebSocket ハンドシェイク、ライブ
サーバー、`/api/settings/require-login`、`/api/auth/status`）は、このヘルパーを経由します。
`JWT_SECRET` で署名された別の JWT も存在します。Cursor CLI パススルーは、キー保有者向けに
`iss "omniroute" / aud "cursor-cli"` トークンを発行しますが、これらがセッションとして扱われることはありません
（#13298）。

`src/shared/utils/apiAuth.ts` の `isDashboardSessionAuthenticated()` によって検証されます。パイプラインは、有効期間が 30 日間の JWT の残存期間が 7 日未満になると、自動的に更新します。

一部の管理ルートでは、cookie、または API キーに `manage`（もしくは `admin`）スコープがある場合の `Bearer <key>` の、**いずれか**のモードを受け付けます。これにより、v3.8 で追加された「API 呼び出しによる設定」ワークフローが実現されています。

#### オプションの OIDC ログインゲート（#6973）

ダッシュボードの管理者ログインでは、デフォルトのパスワードログインに加えて、**オプトイン**の OIDC（OpenID Connect）フローもサポートしています。パスワードログインが削除されることはなく、あくまで補完されます。

- `settings.oidcEnabled === true` であり、**かつ** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` がすべて設定されている場合（設定 → 認証）を除き、無効です。
  それ以外の場合、`GET /api/auth/oidc/login` は `400` を返します。
- `GET /api/auth/oidc/login` は、発行者の
  `/.well-known/openid-configuration` から `authorization_endpoint` を検出し（検出できない場合は
  `<issuer>/authorize` にフォールバック）、受信リクエストからリダイレクト URI を構築し
  （`x-forwarded-proto` を考慮）、ランダムな `state` を
  `httpOnly` の `oidc_state` cookie に保存したうえで IdP にリダイレクトします。
- `GET /api/auth/oidc/callback` は `state` を検証し、認可
  コードを交換して、発行者の JWKS を介して ID トークンの署名を検証します
  （`jose` の `createRemoteJWKSet` を使用し、JWKS URI ごとにキャッシュ）。その際、`issuer` / `audience`
  のチェックも行います。オプションの `oidcAllowedSubjects` 許可リストは、トークンの
  `sub` クレームまたは `email` クレームと照合されます。email クレームが認められるのは
  `email_verified === true` の場合のみであるため、IdP で未検証のメールアドレスが
  ゲートを通過することはありません。
- 成功すると、パスワードログイン
  （`src/app/api/auth/login/route.ts`）が発行するものと**まったく同じ**、有効期間 30 日間の `auth_token` JWT を発行します。そのため、ダッシュボードセッションの残りの
  パイプライン（自動更新、cookie フラグ）に変更はありません。
  OIDC が置き換えるのは cookie の発行方法だけであり、cookie によって付与される権限ではありません。

## ルートクラス

`src/server/authz/types.ts` では3つのクラスを定義しています。決定的に分類できないルートはすべて `MANAGEMENT` にフォールバックします。

| クラス       | 説明                                                                                                                                                       | 必要な認証                                                     |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `PUBLIC`     | 明示的に安全なルート — ログイン、ログアウト、ステータス、初期化、ヘルスチェック、オンボーディングのブートストラップ。                                      | なし                                                           |
| `CLIENT_API` | モデル提供エンドポイント — `/api/v1/*`、`/api/v1beta/*`、およびエイリアス `/v1/*`、`/v1beta/*`、`/chat/completions`、`/responses`、`/models`、`/codex/*`。 | 有効な `REQUIRE_API_KEY` 機能フラグが有効な場合はBearerキー    |
| `MANAGEMENT` | ダッシュボードページ、設定、プロバイダー、キー、管理および診断エンドポイント。                                                                             | ダッシュボードセッション、または `manage` スコープを持つBearer |

## パイプライン

```
受信リクエスト → src/proxy.ts
  → src/server/authz/pipeline.ts の runAuthzPipeline()
    1. 信頼済み内部ヘッダーを除去（x-omniroute-auth-*、x-omniroute-route-class）
    2. リクエストIDを生成し、classifyRoute() でルートを分類
    3. pathname == "/" の場合 → /dashboard にリダイレクト
    4. ドレイン中（グレースフルシャットダウン）かつ /api/* の場合 → 503
    5. GET以外の /api/* の場合 → checkBodySize() ガード
    6. OPTIONS の場合 → CORSプリフライト 204
    7. options.enforce == false の場合 → ルートクラスヘッダーを付けてそのまま通過
    8. それ以外の場合: POLICIES[routeClass].evaluate(ctx)
       - 許可  → x-omniroute-auth-{kind,id,label,scopes} を付与 → NextResponse.next()
       - 拒否 → correlation_id 付きのJSONエラー（ダッシュボードページの場合 → 302 /login）
```

信頼済み内部ヘッダー（`src/server/authz/headers.ts` で定義）は、分類前に**受信リクエストから除去されます**。クライアントが `x-omniroute-auth-*` を事前に設定して主体になりすますことはできません。

### ポリシーの契約

各ルートクラスには、`src/server/authz/policies/` 内にポリシーがあります。

- **`publicPolicy`**（`policies/public.ts`）— 常に `allow({ kind: "anonymous", id: "anonymous" })` を返します。
- **`clientApiPolicy`**（`policies/clientApi.ts`）— Bearerを抽出し、`validateApiKey()` で検証します。有効な `REQUIRE_API_KEY` 機能フラグが無効な場合に限り、匿名アクセスへフォールスルーします。有効なフラグは `isRequireApiKeyEnabled()`（`DB feature flag override > process.env.REQUIRE_API_KEY > default`）によって解決されるため、ダッシュボードの機能フラグと環境変数が `/api/v1/*`、`/api/v1beta/*`、およびエイリアスを一貫して制御します。リゾルバーで障害が発生した場合は、フェイルクローズします。クライアントAPIルートでのダッシュボードセッションリクエストを許可します（ダッシュボードのモデルカタログで使用される `/api/v1/models` を含む）。
- **`managementPolicy`**（`policies/management.ts`）— ダッシュボードセッション、内部モデル同期リクエスト（`/api/providers/[name]/(sync-models|models)` に対して照合）、または `isAuthRequired()` がfalseを返した場合は認証を完全にスキップします。Bearerトークンが存在するものの無効な場合は403（`AUTH_001`）を返し、それ以外の場合は401を返します。また、すべての認証分岐の前にルートガード階層（LOCAL_ONLY / ALWAYS_PROTECTED）も適用します。[ルートガード階層](../security/ROUTE_GUARD_TIERS.md)を参照してください。`LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` 内のLOCAL_ONLYパス（現時点では `/api/mcp/`）は、Bearerキーが `manage` スコープを持つ場合、非ループバックからアクセスできます。それ以外のすべてのLOCAL_ONLYパスは、スコープに関係なく厳密にループバック限定のままです。

ポリシーが成功すると、`kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` を持つ `AuthSubject` が返されます。後続のハンドラーは認証ロジックを再実行する代わりに、`src/server/authz/assertAuth.ts` の `assertAuth(request, "CLIENT_API")` を介してこれを読み取れます。

## 公開ルート一覧

`src/shared/constants/publicApiRoutes.ts` は明示的な許可リストです。

リストは**形状**ごとに分割されており、この分割はセキュリティ上不可欠です（GHSA-74g9-q8f6-793h）。プレフィックスは
`startsWith()` で照合されるため、先頭文字列が共通する隣接パスもすべて一致します。
`/api/usage/om-usage` をプレフィックスとして指定すると、`/api/usage/om-usage<anything>` がすべて公開され、
Next はこれを `/api/usage/[connectionId]`、つまり独自の認証を持たないハンドラーとして解決します。

```ts
// 真のサブツリー。各エントリは必ず "/" で終わる必要があります（単体テストで検証されます）。
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify では CLIENT_API として扱われ、「認証不要の公開」にはなりません
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// 単一ルート。完全一致で照合されます（末尾のスラッシュの有無は問いません）。
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// CORS オリジン制限の緩和も適用される、読み取り専用の単一ルート。
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS 制限の緩和が適用されない、読み取り専用の単一ルート。
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

読み取り専用ルートが公開されるのは、**安全なメソッドの場合のみ**です。注意：`classifyRoute()` は `/api/v1/*` と `/api/v1beta/*` を PUBLIC へのフォールスルーから除外します。これらは常に `CLIENT_API` となるため、Bearer キーのポリシーが引き続き適用されます。

## 新しいルートの追加

### パターン 1 — 公開クライアント API エンドポイント（Bearer 認証）

`/api/v1/` および `/api/v1beta/` 配下のルートは、自動的に `CLIENT_API` として分類されます。ミドルウェアが Bearer チェックを強制するため、ルートハンドラーで再度実行する必要はありませんが、必要に応じてサブジェクトを読み取ることができます。

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... ハンドラーのロジック
}
```

### パターン 2 — 管理エンドポイント（セッション、または Bearer + manage）

`src/lib/api/requireManagementAuth.ts` の `requireManagementAuth()` を使用します。

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... ハンドラーのロジック
}
```

`requireManagementAuth()` は、成功時には `null`、エラー時には JSON エラーの `Response` を返します。

- 401 `AUTH_001`「認証が必要です」— 認証情報がまったくない
- 403 — Bearer が無効、**または** Bearer は存在するものの、キーに `manage` / `admin` スコープがない

`hasManageScope(scopes)` は、`"manage"` または `"admin"` の場合に true を返します。

### パターン 3 — 公開許可リストへの追加

利便性ではなく、形状に基づいて追加先のセットを選択してください。単一ルートは `PUBLIC_API_ROUTES_EXACT`（GET 専用の場合は `PUBLIC_READONLY_CORS_API_ROUTES`）に追加します。真のサブツリーのみを `PUBLIC_API_ROUTE_PREFIXES` に追加でき、エントリは**必ず `/` で終わる必要があります**。単一ルートをプレフィックスリストに追加すると、先頭文字列が共通するすべての隣接パスも公開されます。これには、後から追加される動的セグメントの兄弟ルートも含まれます（GHSA-74g9-q8f6-793h）。`tests/unit/public-api-routes.test.ts`、`tests/unit/authz/public-route-exact-match.test.ts`、`tests/unit/authz/classify.test.ts` の単体テストも更新してください。

## スコープ

API キーは `scopes` 配列を持ちます（`api_keys.scopes` に JSON として保存されます。`src/lib/db/apiKeys.ts` を参照）。

### 管理スコープ

- `manage` / `admin` — Bearer として送信された場合、キーに管理 API エンドポイントへのアクセス権を付与します。

### MCP スコープ（`src/shared/constants/mcpScopes.ts`）

各 MCP ツールには、`MCP_TOOL_SCOPES` を介して特定のスコープが必要です。完全なリスト（`MCP_SCOPE_LIST`）：

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts` でのスコープ適用では、`resolveCallerScopeContext()` が MCP 認証情報、リクエストメタデータ、または `OMNIROUTE_MCP_SCOPES` からスコープを解決した後、各ツールのスコープリストを `evaluateToolScopes()` に渡します。

## 認証必須の切り替え

`src/shared/utils/apiAuth.ts` の `isAuthRequired()` は、リクエストに対して**何らかの**認証を適用するかどうかを決定します。

- `settings.requireLogin === false` → 認証はグローバルに無効になります。
- パスワードが設定されておらず、かつ `INITIAL_PASSWORD` 環境変数もない場合 → ブートストラップモードではオンボーディングウィザードとループバックリクエストが許可されますが、外部ネットワークに公開されたリクエストには引き続き認証情報が必要です。
- DB エラーが発生した場合 → フェイルクローズします（セキュア・バイ・デフォルト）。

クライアント API キーの適用では、`process.env.REQUIRE_API_KEY` を直接読み取るのではなく、`src/shared/utils/featureFlags.ts` の `isRequireApiKeyEnabled()` を使用します。これはデプロイ済みインスタンスで重要です。Dashboard → Feature Flags で `REQUIRE_API_KEY` を切り替えると、DB オーバーライドとして保存され、`/v1/*`、`/v1beta/*`、`/models`、`/responses`、`/chat/completions`、`/codex/*`、およびこのヘルパーを共有するその他のクライアント API 認証チェックに即座に反映されます。フィーチャーフラグストアを読み取れない場合、クライアント API 認証はフェイルクローズし、キーを必須とします。

## 破壊的変更 — v3.8.0

`/api/v1/agents/tasks/*` および `/api/resilience/model-cooldowns` エンドポイントは、**管理認証が必須**になりました（コミット `588a0333`）。以前のように `manage` スコープを持たない通常の API キーを送信するクライアントには、`403` が返されます。移行方法：API Keys ダッシュボードでキーに `manage` スコープを付与するか、ログイン済みのダッシュボードセッションを使用してください。

## 動作変更 — v3.8.2

`/api/mcp/*`（リモート MCP サーバー）は引き続きデフォルトで LOCAL_ONLY ですが、`Authorization: Bearer <api-key>` ヘッダーに `manage` スコープが含まれている場合、ループバック以外からのリクエストも受け付けるようになりました。この例外は、`src/server/authz/routeGuard.ts` の `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` を介してパスごとに明示的に制御されます。同じく LOCAL_ONLY プレフィックスである `/api/cli-tools/runtime/*` は、任意のサブプロセスを起動できるため、意図的にバイパスできないようになっています。ループバック以外から `/api/mcp/*` に送信された匿名リクエストには、引き続き `403 LOCAL_ONLY` が返されます。新しい LOCAL_ONLY パスのデフォルトは、今後も厳格なループバック限定です。[ルートガードの階層](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)を参照してください。

## テスト

- ユニットテスト：`tests/unit/authz/` — `classify.test.ts`、`pipeline.test.ts`、`client-api-policy.test.ts`、`management-policy.test.ts`、`public-policy.test.ts`。
- パブリック許可リスト：`tests/unit/public-api-routes.test.ts`。
- 対象を絞って実行：`node --import tsx/esm --test tests/unit/authz/classify.test.ts`。

## デバッグ

パイプラインは、レスポンスに常に以下のヘッダーを付与します。

```
x-request-id:               <相関 ID。エラーボディにも同じ値が含まれる>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

認証済みリクエストの場合、アップストリーム（ハンドラー側）のリクエストヘッダーには以下も含まれます。

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<末尾 4 文字> | "dashboard" | "anonymous"
x-omniroute-auth-label:     （任意）
x-omniroute-auth-scopes:    カンマ区切りのリスト
```

ハンドラー内では `assertAuth(req, expectedClass)` を使用してください。ミドルウェアが迂回された場合、コード `AUTHZ_NOT_INITIALIZED` の `AuthzAssertionError` がスローされます（テストで設定のリグレッションを検出する際に役立ちます）。

## 関連項目

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — エンドポイントごとの認証マーカー
- [COMPLIANCE.md](../security/COMPLIANCE.md) — 認証イベントの監査ログ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP スコープ適用の詳細
- ソース: `src/server/authz/`、`src/lib/api/requireManagementAuth.ts`
