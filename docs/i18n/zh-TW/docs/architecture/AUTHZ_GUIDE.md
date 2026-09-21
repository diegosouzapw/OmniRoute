# Authorization Guide (中文 (繁體))

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md)

---

> **事實來源：** `src/server/authz/`、`src/shared/constants/publicApiRoutes.ts`、`src/lib/api/requireManagementAuth.ts`、`src/shared/utils/apiAuth.ts`
> **最後更新：** 2026-06-28 — v3.8.40

OmniRoute 擁有一套可感知路由的授權管線，會對每個 API 請求進行管控。分類是**確定性的**，且採取**失敗時關閉**原則——任何無法分類的項目最終都會歸類為 `MANAGEMENT`，並要求工作階段或管理級權杖。本頁針對維護路由或設計新端點的工程師說明此模型。

![授權管線（3 種路由類別 + 原則評估）](../diagrams/exported/authz-pipeline.svg)

> 來源：[diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## 兩種驗證模式

### 1. API 金鑰（Bearer）

用於與 OpenAI/Anthropic/Gemini 相容的用戶端 API，以及少數在金鑰具有 `manage` 範圍時可存取的管理路由。

```
Authorization: Bearer <api-key>
```

由 `src/sse/services/auth.ts` 中的 `isValidApiKey()` / `extractApiKey()` 驗證，並透過 `src/shared/utils/apiAuth.ts` 重新匯出。驗證器也接受 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 環境變數作為持久性透傳金鑰（議題 #1350）。

### 2. 儀表板工作階段（auth_token Cookie）

用於儀表板頁面與管理員操作。

```
Cookie: auth_token=<以 JWT_SECRET 簽署的 JWT>
```

只有當 JWT 驗證成功**且**帶有 `authenticated: true` 時，Cookie 才是工作階段
（`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`）。Cookie 的每個
使用端（路由守衛、授權管線重新整理、WebSocket 交握、即時
伺服器、`/api/settings/require-login`、`/api/auth/status`）都會透過該輔助函式處理。
另有其他以 `JWT_SECRET` 簽署的 JWT——Cursor CLI 透傳功能會為金鑰持有者建立
`iss "omniroute" / aud "cursor-cli"` 權杖——但這些權杖絕不會被視為工作階段
（#13298）。

由 `src/shared/utils/apiAuth.ts` 中的 `isDashboardSessionAuthenticated()` 驗證。當 JWT 在其 30 天有效期中剩餘不到 7 天時，管線會自動重新整理該 JWT。

部分管理路由接受**任一**模式：Cookie，或在 API 金鑰具有 `manage`（或 `admin`）範圍時使用 `Bearer <key>`。這正是 v3.8 新增的「可透過 API 呼叫設定」工作流程。

#### 選用的 OIDC 登入閘門（#6973）

儀表板管理員登入除了預設的密碼登入外，也支援**選擇啟用**的 OIDC（OpenID Connect）流程——密碼登入永遠不會被移除，只會加入額外的登入方式：

- 除非 `settings.oidcEnabled === true`，**且** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` 均已設定（設定 → 驗證），否則此功能將停用。
  在其他情況下，`GET /api/auth/oidc/login` 會傳回 `400`。
- `GET /api/auth/oidc/login` 會從簽發者的
  `/.well-known/openid-configuration` 探索 `authorization_endpoint`（若失敗則改用
  `<issuer>/authorize`），根據傳入的請求建立重新導向 URI
  （可感知 `x-forwarded-proto`），並使用儲存在 `httpOnly` `oidc_state` Cookie 中的隨機 `state`
  重新導向至 IdP。
- `GET /api/auth/oidc/callback` 會驗證 `state`、交換授權
  碼，並透過簽發者的 JWKS 驗證 ID 權杖的簽章
  （使用 `jose` 的 `createRemoteJWKSet`，依每個 JWKS URI 進行快取），同時執行 `issuer`/`audience`
  檢查。選用的 `oidcAllowedSubjects` 允許清單會比對權杖的
  `sub` 宣告或其 `email` 宣告——只有當
  `email_verified === true` 時才會採信電子郵件宣告，因此 IdP 上未經驗證的電子郵件絕不可能通過
  閘門。
- 成功後，系統會建立與密碼
  登入所核發的**完全相同**、有效期為 30 天的 `auth_token` JWT
  （`src/app/api/auth/login/route.ts`），因此儀表板工作階段管線的其餘部分
  （自動重新整理、Cookie 旗標）維持不變——OIDC 只會取代 Cookie 的建立方式，不會改變它所授予的權限。

## 路由類別

`src/server/authz/types.ts` 定義了三種類別；任何無法明確分類的路由都會回退至 `MANAGEMENT`。

| 類別         | 說明                                                                                                                                  | 所需驗證                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `PUBLIC`     | 明確安全的路由——登入、登出、狀態、初始化、健康檢查、初始設定引導。                                                                    | 無                                                      |
| `CLIENT_API` | 模型服務端點——`/api/v1/*`、`/api/v1beta/*`，以及別名 `/v1/*`、`/v1beta/*`、`/chat/completions`、`/responses`、`/models`、`/codex/*`。 | 有效的 `REQUIRE_API_KEY` 功能旗標啟用時需要 Bearer 金鑰 |
| `MANAGEMENT` | 儀表板頁面、設定、提供者、金鑰、管理及診斷端點。                                                                                      | 儀表板工作階段，或具有 `manage` 範圍的 Bearer           |

## 管線

```
傳入請求 → src/proxy.ts
  → src/server/authz/pipeline.ts 中的 runAuthzPipeline()
    1. 移除受信任的內部標頭（x-omniroute-auth-*、x-omniroute-route-class）
    2. 產生請求 ID，透過 classifyRoute() 分類路由
    3. 若 pathname == "/" → 重新導向至 /dashboard
    4. 若正在排空（優雅關閉）且為 /api/* → 503
    5. 若為非 GET 的 /api/* → 執行 checkBodySize() 防護檢查
    6. 若為 OPTIONS → CORS 預檢回應 204
    7. 若 options.enforce == false → 附帶路由類別標頭直接放行
    8. 否則：POLICIES[routeClass].evaluate(ctx)
       - allow  → 加入 x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - reject → 回傳包含 correlation_id 的 JSON 錯誤（儀表板頁面 → 302 /login）
```

受信任的內部標頭（定義於 `src/server/authz/headers.ts`）會在分類前**從傳入請求中移除**——用戶端無法預先填入 `x-omniroute-auth-*` 來冒充主體。

### 原則契約

每個路由類別在 `src/server/authz/policies/` 中都有一項原則：

- **`publicPolicy`**（`policies/public.ts`）——一律回傳 `allow({ kind: "anonymous", id: "anonymous" })`。
- **`clientApiPolicy`**（`policies/clientApi.ts`）——擷取 Bearer，並透過 `validateApiKey()` 驗證。只有在有效的 `REQUIRE_API_KEY` 功能旗標停用時，才會回退至匿名存取。有效旗標透過 `isRequireApiKeyEnabled()`（`DB 功能旗標覆寫 > process.env.REQUIRE_API_KEY > 預設值`）解析，因此儀表板功能旗標和環境變數會一致地管理 `/api/v1/*`、`/api/v1beta/*` 及其別名；解析器失敗時會採取拒絕存取的安全預設。允許具有儀表板工作階段的請求存取用戶端 API 路由（包括儀表板模型目錄所使用的 `/api/v1/models`）。
- **`managementPolicy`**（`policies/management.ts`）——接受儀表板工作階段、內部模型同步請求（比對 `/api/providers/[name]/(sync-models|models)`），或在 `isAuthRequired()` 回傳 false 時完全略過驗證。當存在 Bearer 權杖但無效時回傳 403（`AUTH_001`），否則回傳 401。此原則也會在任何驗證分支之前強制執行路由防護層級（LOCAL_ONLY / ALWAYS_PROTECTED）——請參閱[路由防護層級](../security/ROUTE_GUARD_TIERS.md)。`LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` 中的 LOCAL_ONLY 路徑（目前為 `/api/mcp/`），可在 Bearer 金鑰具有 `manage` 範圍時從非迴路位址存取；無論範圍為何，所有其他 LOCAL_ONLY 路徑仍嚴格限制為僅能從迴路位址存取。

成功的原則會回傳 `AuthSubject`，其 `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`。下游處理常式可透過 `src/server/authz/assertAuth.ts` 中的 `assertAuth(request, "CLIENT_API")` 讀取該主體，而無須重新執行驗證邏輯。

## 公開路由清單

`src/shared/constants/publicApiRoutes.ts` 是明確的允許清單：

此清單依照**形狀**拆分，而這項拆分至關重要（GHSA-74g9-q8f6-793h）：前綴會使用
`startsWith()` 進行比對，因此也會比對所有開頭字元相同的相鄰路徑。
將 `/api/usage/om-usage` 作為前綴，會把 `/api/usage/om-usage<anything>` 標記為公開，而 Next 會將其解析至
`/api/usage/[connectionId]`——一個本身沒有驗證機制的處理常式。

```ts
// 真正的子樹。每個項目都必須以 "/" 結尾（由單元測試斷言）。
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // 在 classify 中視為 CLIENT_API，而非「無需驗證的公開路由」
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// 單一路由，採用完全比對（無論是否有結尾斜線）。
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

// 唯讀的單一路由，也套用 CORS 來源限制放寬。
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// 不套用 CORS 限制放寬的唯讀單一路由。
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

唯讀路由**僅**在使用安全方法時才是公開的。請注意：`classifyRoute()` 會將 `/api/v1/*` 和 `/api/v1beta/*` 排除在 PUBLIC 後備分類之外——這些路由一律為 `CLIENT_API`，因此仍會套用 Bearer 金鑰政策。

## 新增路由

### 模式 1——公開用戶端 API 端點（Bearer 驗證）

位於 `/api/v1/` 和 `/api/v1beta/` 下的路由會自動分類為 `CLIENT_API`。中介軟體會強制執行 Bearer 檢查；路由處理常式不需要再次執行，但可在有需要時讀取主體。

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... 處理常式邏輯
}
```

### 模式 2——管理端點（工作階段或 Bearer + manage）

使用 `src/lib/api/requireManagementAuth.ts` 中的 `requireManagementAuth()`：

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... 處理常式邏輯
}
```

`requireManagementAuth()` 成功時會傳回 `null`，失敗時則會傳回包含 JSON 錯誤的 `Response`：

- 401 `AUTH_001`「需要驗證」——完全沒有憑證
- 403——Bearer 無效，**或**已提供 Bearer，但金鑰缺少 `manage` / `admin` 範圍

對於 `"manage"` 或 `"admin"`，`hasManageScope(scopes)` 會傳回 true。

### 模式 3——新增至公開允許清單

請根據形狀選擇集合，而非貪圖方便。單一路由應放入 `PUBLIC_API_ROUTES_EXACT`（若僅限 GET，則放入 `PUBLIC_READONLY_CORS_API_ROUTES`）；只有真正的子樹才能放入 `PUBLIC_API_ROUTE_PREFIXES`，且它**必須以 `/` 結尾**。將單一路由放入前綴清單，也會一併公開所有開頭字元相同的相鄰路徑——包括日後新增的動態區段同層路由（GHSA-74g9-q8f6-793h）。請更新 `tests/unit/public-api-routes.test.ts`、`tests/unit/authz/public-route-exact-match.test.ts` 和 `tests/unit/authz/classify.test.ts` 中的單元測試。

## 範圍

API 金鑰包含一個 `scopes` 陣列（以 JSON 儲存於 `api_keys.scopes`，請參閱 `src/lib/db/apiKeys.ts`）。

### 管理範圍

- `manage` / `admin` — 以 Bearer 傳送時，授予該金鑰存取管理 API 端點的權限。

### MCP 範圍（`src/shared/constants/mcpScopes.ts`）

每個 MCP 工具都會透過 `MCP_TOOL_SCOPES` 要求特定範圍。完整清單（`MCP_SCOPE_LIST`）：

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

在 `open-sse/mcp-server/server.ts` 中，`resolveCallerScopeContext()` 從 MCP 驗證資訊、請求中繼資料或 `OMNIROUTE_MCP_SCOPES` 解析範圍後，範圍強制執行機制會將每個工具的範圍清單傳入 `evaluateToolScopes()`。

## 必須驗證切換選項

`src/shared/utils/apiAuth.ts` 中的 `isAuthRequired()` 會決定是否對請求強制執行**任何**驗證：

- `settings.requireLogin === false` → 全域停用驗證。
- 未設定密碼，**且**沒有 `INITIAL_PASSWORD` 環境變數 → 啟動模式允許使用初始設定精靈與迴路位址請求，但暴露於網路的請求仍需要憑證。
- 任何資料庫錯誤 → 以拒絕存取作為失敗處理方式（預設安全）。

用戶端 API 金鑰的強制執行使用 `src/shared/utils/featureFlags.ts` 中的 `isRequireApiKeyEnabled()`，而非直接讀取 `process.env.REQUIRE_API_KEY`。這對已部署的執行個體很重要：在 Dashboard → Feature Flags 中切換 `REQUIRE_API_KEY` 會儲存資料庫覆寫值，並立即影響 `/v1/*`、`/v1beta/*`、`/models`、`/responses`、`/chat/completions`、`/codex/*`，以及共用此輔助函式的其他用戶端 API 驗證檢查。若無法讀取功能旗標儲存區，用戶端 API 驗證會以拒絕存取作為失敗處理方式，並要求提供金鑰。

## 破壞性變更 — v3.8.0

`/api/v1/agents/tasks/*` 與 `/api/resilience/model-cooldowns` 端點**現在需要管理驗證**（提交 `588a0333`）。先前傳送不含 `manage` 範圍之一般 API 金鑰的用戶端會收到 `403`。遷移方式：在 API Keys 儀表板中將 `manage` 範圍授予該金鑰，或使用已登入的儀表板工作階段。

## 行為變更 — v3.8.2

`/api/mcp/*`（遠端 MCP 伺服器）預設仍為 LOCAL_ONLY，但現在當 `Authorization: Bearer <api-key>` 標頭所帶的金鑰具有 `manage` 範圍時，會接受非迴路位址請求。此例外會透過 `src/server/authz/routeGuard.ts` 中的 `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`，明確地依各路徑加以控管；同屬 LOCAL_ONLY 的前綴 `/api/cli-tools/runtime/*` 刻意不允許略過此限制，因為它可以產生任意子行程。來自非迴路位址、對 `/api/mcp/*` 發出的匿名請求仍會傳回 `403 LOCAL_ONLY`——任何新的 LOCAL_ONLY 路徑預設仍會嚴格限制為僅允許迴路位址。請參閱[路由防護層級](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)。

## 測試

- 單元測試：`tests/unit/authz/` — `classify.test.ts`、`pipeline.test.ts`、`client-api-policy.test.ts`、`management-policy.test.ts`、`public-policy.test.ts`。
- 公開允許清單：`tests/unit/public-api-routes.test.ts`。
- 執行特定測試：`node --import tsx/esm --test tests/unit/authz/classify.test.ts`。

## 偵錯

管線一律會在回應中加上：

```
x-request-id:               <關聯 ID，也會回傳於錯誤回應本文中>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

對於已驗證的請求，上游（處理常式端）的請求標頭還會包含：

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<末 4 碼> | "dashboard" | "anonymous"
x-omniroute-auth-label:     （選用）
x-omniroute-auth-scopes:    以逗號分隔的清單
```

請在處理常式內使用 `assertAuth(req, expectedClass)`——若中介軟體遭到繞過，它會擲出代碼為 `AUTHZ_NOT_INITIALIZED` 的 `AuthzAssertionError`（有助於在測試中發現設定退步問題）。

## 另請參閱

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 各端點的驗證標記
- [COMPLIANCE.md](../security/COMPLIANCE.md) — 驗證事件的稽核記錄
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP 範圍強制執行詳細資訊
- 原始碼：`src/server/authz/`、`src/lib/api/requireManagementAuth.ts`
