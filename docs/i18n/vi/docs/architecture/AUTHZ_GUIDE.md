# Authorization Guide (Tiếng Việt)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **Nguồn chuẩn:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **Cập nhật lần cuối:** 2026-06-28 — v3.8.40

OmniRoute có một quy trình phân quyền nhận biết tuyến, kiểm soát mọi yêu cầu API. Việc phân loại mang tính **tất định** và **đóng khi lỗi** — bất kỳ nội dung nào không thể phân loại đều được xếp vào `MANAGEMENT` và yêu cầu phiên hoặc token cấp quản trị. Trang này giải thích mô hình dành cho các kỹ sư bảo trì tuyến hoặc thiết kế endpoint mới.

![Quy trình AuthZ (3 lớp tuyến + đánh giá chính sách)](../diagrams/exported/authz-pipeline.svg)

> Nguồn: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## Hai chế độ xác thực

### 1. Khóa API (Bearer)

Được sử dụng cho các API máy khách tương thích với OpenAI/Anthropic/Gemini và một số tuyến quản trị khi khóa có phạm vi `manage`.

```
Authorization: Bearer <api-key>
```

Được xác thực bởi `isValidApiKey()` / `extractApiKey()` trong `src/sse/services/auth.ts` và được tái xuất thông qua `src/shared/utils/apiAuth.ts`. Trình xác thực cũng chấp nhận các biến môi trường `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` làm khóa chuyển tiếp lâu dài (vấn đề #1350).

### 2. Phiên bảng điều khiển (cookie auth_token)

Dành cho các trang bảng điều khiển và thao tác quản trị.

```
Cookie: auth_token=<JWT được ký bằng JWT_SECRET>
```

Cookie chỉ là một phiên khi JWT được xác minh thành công **và** mang `authenticated: true`
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). Mọi
thành phần sử dụng cookie (bộ bảo vệ tuyến, làm mới quy trình authz, bắt tay WebSocket, máy chủ
trực tiếp, `/api/settings/require-login`, `/api/auth/status`) đều đi qua trình trợ giúp đó.
Các JWT khác được ký bằng `JWT_SECRET` vẫn tồn tại — tính năng chuyển tiếp Cursor CLI cấp
token `iss "omniroute" / aud "cursor-cli"` cho người giữ khóa — và chúng không bao giờ là phiên
(#13298).

Được xác minh bởi `isDashboardSessionAuthenticated()` trong `src/shared/utils/apiAuth.ts`. Quy trình tự động làm mới JWT khi thời hạn còn lại dưới 7 ngày trong tổng thời hạn 30 ngày.

Một số tuyến quản trị chấp nhận **một trong hai** chế độ: cookie HOẶC `Bearer <key>` khi khóa API có phạm vi `manage` (hoặc `admin`). Đây là cơ chế cho phép quy trình làm việc "có thể cấu hình thông qua lệnh gọi API" được bổ sung trong v3.8.

#### Cổng đăng nhập OIDC tùy chọn (#6973)

Đăng nhập quản trị trên bảng điều khiển cũng hỗ trợ quy trình OIDC (OpenID Connect) **tùy chọn tham gia**
song song với đăng nhập bằng mật khẩu mặc định — đăng nhập bằng mật khẩu không bao giờ bị loại bỏ mà chỉ
được bổ sung:

- Bị vô hiệu hóa trừ khi `settings.oidcEnabled === true` **và** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` đều được cấu hình (Cài đặt → Xác thực).
  Nếu không, `GET /api/auth/oidc/login` trả về `400`.
- `GET /api/auth/oidc/login` phát hiện `authorization_endpoint` từ
  `/.well-known/openid-configuration` của nhà phát hành (dự phòng về
  `<issuer>/authorize`), tạo URI chuyển hướng từ yêu cầu đến
  (có xét `x-forwarded-proto`) và chuyển hướng đến IdP với một `state` ngẫu nhiên
  được lưu trong cookie `oidc_state` `httpOnly`.
- `GET /api/auth/oidc/callback` xác thực `state`, trao đổi mã ủy quyền
  và xác minh chữ ký của token ID thông qua JWKS của nhà phát hành
  (`createRemoteJWKSet` của `jose`, được lưu vào bộ nhớ đệm theo từng URI JWKS), kèm các bước kiểm tra
  `issuer`/`audience`. Danh sách cho phép `oidcAllowedSubjects` tùy chọn khớp với
  claim `sub` hoặc claim `email` của token — claim email chỉ được chấp nhận khi
  `email_verified === true`, vì vậy email chưa được xác minh tại IdP không bao giờ có thể vượt qua
  cổng.
- Khi thành công, quy trình sẽ cấp **chính xác cùng một** JWT `auth_token` có thời hạn 30 ngày mà
  chức năng đăng nhập bằng mật khẩu cấp (`src/app/api/auth/login/route.ts`), vì vậy phần còn lại của
  quy trình phiên bảng điều khiển (tự động làm mới, cờ cookie) không thay đổi —
  OIDC chỉ thay thế cách cookie được cấp chứ không thay đổi quyền mà cookie đó cung cấp.

## Các lớp tuyến

`src/server/authz/types.ts` định nghĩa ba lớp; mọi tuyến không thể được phân loại một cách xác định đều mặc định thuộc `MANAGEMENT`.

| Lớp          | Mô tả                                                                                                                                                         | Yêu cầu xác thực                                                 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| `PUBLIC`     | Các tuyến được xác định rõ là an toàn — đăng nhập, đăng xuất, trạng thái, khởi tạo, kiểm tra tình trạng, bootstrap quy trình làm quen ban đầu.                | Không                                                            |
| `CLIENT_API` | Các endpoint phục vụ mô hình — `/api/v1/*`, `/api/v1beta/*`, cùng các bí danh `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | Khóa Bearer khi cờ tính năng `REQUIRE_API_KEY` hiệu lực được bật |
| `MANAGEMENT` | Các trang bảng điều khiển, cài đặt, nhà cung cấp, khóa, cùng các endpoint quản trị và chẩn đoán.                                                              | Phiên bảng điều khiển HOẶC Bearer có phạm vi `manage`            |

## Pipeline

```
Yêu cầu đến → src/proxy.ts
  → runAuthzPipeline() trong src/server/authz/pipeline.ts
    1. Loại bỏ các header nội bộ đáng tin cậy (x-omniroute-auth-*, x-omniroute-route-class)
    2. Tạo ID yêu cầu, phân loại tuyến qua classifyRoute()
    3. Nếu pathname == "/" → chuyển hướng đến /dashboard
    4. Nếu đang rút dần lưu lượng (tắt hệ thống an toàn) và /api/* → 503
    5. Nếu không phải GET và thuộc /api/* → áp dụng cơ chế bảo vệ checkBodySize()
    6. Nếu OPTIONS → CORS preflight 204
    7. Nếu options.enforce == false → cho đi qua kèm các header lớp tuyến
    8. Nếu không: POLICIES[routeClass].evaluate(ctx)
       - cho phép  → đóng dấu x-omniroute-auth-{kind,id,label,scopes} → NextResponse.next()
       - từ chối → lỗi JSON kèm correlation_id (các trang bảng điều khiển → 302 /login)
```

Các header nội bộ đáng tin cậy (được định nghĩa trong `src/server/authz/headers.ts`) được **loại bỏ khỏi các yêu cầu đến** trước khi phân loại — client không thể điền trước `x-omniroute-auth-*` để mạo danh một chủ thể.

### Hợp đồng chính sách

Mỗi lớp tuyến có một chính sách trong `src/server/authz/policies/`:

- **`publicPolicy`** (`policies/public.ts`) — luôn trả về `allow({ kind: "anonymous", id: "anonymous" })`.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — trích xuất Bearer, xác thực qua `validateApiKey()`. Chỉ chuyển sang chế độ ẩn danh khi cờ tính năng `REQUIRE_API_KEY` hiệu lực bị tắt. Cờ hiệu lực được phân giải thông qua `isRequireApiKeyEnabled()` (`ghi đè bằng cờ tính năng trong DB > process.env.REQUIRE_API_KEY > giá trị mặc định`) để các Cờ tính năng trên Bảng điều khiển và biến môi trường chi phối `/api/v1/*`, `/api/v1beta/*` và các bí danh một cách nhất quán; lỗi bộ phân giải sẽ mặc định từ chối. Cho phép các yêu cầu có phiên bảng điều khiển trên các tuyến API client (bao gồm `/api/v1/models`, được danh mục mô hình của bảng điều khiển sử dụng).
- **`managementPolicy`** (`policies/management.ts`) — chấp nhận phiên bảng điều khiển, các yêu cầu đồng bộ mô hình nội bộ (được đối sánh với `/api/providers/[name]/(sync-models|models)`), hoặc bỏ qua hoàn toàn nếu `isAuthRequired()` trả về false. Trả về 403 (`AUTH_001`) khi có token Bearer nhưng không hợp lệ, nếu không thì trả về 401. Đồng thời thực thi các cấp bảo vệ tuyến (LOCAL_ONLY / ALWAYS_PROTECTED) trước mọi nhánh xác thực — xem [Các cấp bảo vệ tuyến](../security/ROUTE_GUARD_TIERS.md). Các đường dẫn LOCAL_ONLY trong `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` (hiện tại: `/api/mcp/`) có thể được truy cập từ địa chỉ không phải loopback khi khóa Bearer có phạm vi `manage`; tất cả các đường dẫn LOCAL_ONLY khác vẫn bị giới hạn nghiêm ngặt ở loopback bất kể phạm vi.

Một chính sách thành công trả về `AuthSubject` với `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`. Các handler phía sau có thể đọc chủ thể này qua `assertAuth(request, "CLIENT_API")` trong `src/server/authz/assertAuth.ts` thay vì chạy lại logic xác thực.

## Danh sách route công khai

`src/shared/constants/publicApiRoutes.ts` là danh sách cho phép tường minh:

Danh sách được phân chia theo **hình dạng**, và sự phân chia này có ý nghĩa thiết yếu (GHSA-74g9-q8f6-793h): một tiền tố được
đối chiếu bằng `startsWith()`, vì vậy nó cũng khớp với mọi đường dẫn liền kề có chung các ký tự đầu.
Việc dùng `/api/usage/om-usage` làm tiền tố đã đánh dấu `/api/usage/om-usage<anything>` là CÔNG KHAI, và Next phân giải
đường dẫn đó thành `/api/usage/[connectionId]` — một trình xử lý không có cơ chế xác thực riêng.

```ts
// Các cây con thực sự. Mọi mục PHẢI kết thúc bằng "/" (được kiểm tra bằng unit test).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // được xử lý là CLIENT_API trong classify, không phải là công khai "không cần xác thực"
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// Các route đơn lẻ, được đối chiếu CHÍNH XÁC (có hoặc không có dấu gạch chéo ở cuối).
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

// Các route đơn lẻ chỉ đọc cũng được áp dụng chính sách nới lỏng origin CORS.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// Route đơn lẻ chỉ đọc KHÔNG áp dụng chính sách nới lỏng CORS.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

Các route chỉ đọc là công khai **chỉ** đối với các phương thức an toàn. Lưu ý: `classifyRoute()` loại `/api/v1/*` và `/api/v1beta/*` khỏi trường hợp dự phòng PUBLIC — chúng luôn là `CLIENT_API`, vì vậy chính sách khóa Bearer vẫn được áp dụng.

## Thêm route mới

### Mẫu 1 — Endpoint API công khai dành cho máy khách (xác thực bằng Bearer)

Các route trong `/api/v1/` và `/api/v1beta/` được tự động phân loại là `CLIENT_API`. Middleware thực thi bước kiểm tra Bearer; các trình xử lý route không cần thực hiện lại bước này nhưng có thể đọc chủ thể nếu cần.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... logic của trình xử lý
}
```

### Mẫu 2 — Endpoint quản lý (phiên hoặc Bearer + quyền manage)

Sử dụng `requireManagementAuth()` từ `src/lib/api/requireManagementAuth.ts`:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... logic của trình xử lý
}
```

`requireManagementAuth()` trả về `null` khi thành công hoặc một `Response` lỗi JSON:

- 401 `AUTH_001` "Yêu cầu xác thực" — hoàn toàn không có thông tin xác thực
- 403 — Bearer không hợp lệ **hoặc** có Bearer nhưng khóa không có phạm vi `manage` / `admin`

`hasManageScope(scopes)` trả về true đối với `"manage"` hoặc `"admin"`.

### Mẫu 3 — Thêm vào danh sách cho phép công khai

Chọn tập hợp dựa trên hình dạng, không phải sự tiện lợi. Một route đơn lẻ được đưa vào `PUBLIC_API_ROUTES_EXACT` (hoặc `PUBLIC_READONLY_CORS_API_ROUTES` nếu chỉ hỗ trợ GET); chỉ cây con thực sự mới được đưa vào `PUBLIC_API_ROUTE_PREFIXES`, và nó **phải kết thúc bằng `/`**. Việc đưa một route đơn lẻ vào danh sách tiền tố cũng công khai mọi đường dẫn liền kề có chung các ký tự đầu — bao gồm cả các đường dẫn ngang hàng có phân đoạn động được thêm sau này (GHSA-74g9-q8f6-793h). Cập nhật các unit test tại `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` và `tests/unit/authz/classify.test.ts`.

## Phạm vi

Các khóa API mang một mảng `scopes` (được lưu dưới dạng JSON trong `api_keys.scopes`, xem `src/lib/db/apiKeys.ts`).

### Phạm vi quản lý

- `manage` / `admin` — cấp cho khóa quyền truy cập vào các endpoint API quản lý khi được gửi dưới dạng Bearer.

### Phạm vi MCP (`src/shared/constants/mcpScopes.ts`)

Mỗi công cụ MCP yêu cầu các phạm vi cụ thể thông qua `MCP_TOOL_SCOPES`. Danh sách đầy đủ (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

Cơ chế thực thi phạm vi trong `open-sse/mcp-server/server.ts` truyền danh sách phạm vi của từng công cụ vào
`evaluateToolScopes()` sau khi `resolveCallerScopeContext()` phân giải các phạm vi từ thông tin xác thực MCP,
siêu dữ liệu yêu cầu hoặc `OMNIROUTE_MCP_SCOPES`.

## Tùy chọn bật/tắt yêu cầu xác thực

`isAuthRequired()` trong `src/shared/utils/apiAuth.ts` quyết định liệu **bất kỳ** hình thức xác thực nào có được áp dụng cho một yêu cầu hay không:

- `settings.requireLogin === false` → xác thực bị vô hiệu hóa trên toàn hệ thống.
- Không có mật khẩu nào được cấu hình **và** không có biến môi trường `INITIAL_PASSWORD` → chế độ khởi tạo cho phép trình hướng dẫn thiết lập ban đầu và các yêu cầu loopback, nhưng các yêu cầu mạng được công khai vẫn cần thông tin xác thực.
- Bất kỳ lỗi DB nào → từ chối mặc định (bảo mật theo mặc định).

Cơ chế thực thi khóa API phía client sử dụng `isRequireApiKeyEnabled()` trong `src/shared/utils/featureFlags.ts`, thay vì đọc trực tiếp `process.env.REQUIRE_API_KEY`. Điều này quan trọng đối với các phiên bản đã triển khai: việc chuyển đổi `REQUIRE_API_KEY` trong Dashboard → Feature Flags sẽ lưu một giá trị ghi đè vào DB và ngay lập tức ảnh hưởng đến `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` và các kiểm tra xác thực API client khác sử dụng chung helper này. Nếu không thể đọc kho lưu trữ cờ tính năng, xác thực API client sẽ từ chối mặc định và yêu cầu khóa.

## Thay đổi không tương thích — v3.8.0

Các endpoint `/api/v1/agents/tasks/*` và `/api/resilience/model-cooldowns` **hiện yêu cầu xác thực quản lý** (commit `588a0333`). Các client trước đây gửi khóa API thông thường không có phạm vi `manage` sẽ nhận được `403`. Cách chuyển đổi: cấp phạm vi `manage` cho khóa trong dashboard API Keys hoặc sử dụng một phiên dashboard đã đăng nhập.

## Thay đổi hành vi — v3.8.2

`/api/mcp/*` (máy chủ MCP từ xa) vẫn mặc định là LOCAL_ONLY nhưng hiện chấp nhận các yêu cầu không phải loopback khi header `Authorization: Bearer <api-key>` mang phạm vi `manage`. Ngoại lệ này được kiểm soát rõ ràng theo từng đường dẫn thông qua `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` trong `src/server/authz/routeGuard.ts`; tiền tố LOCAL_ONLY cùng cấp `/api/cli-tools/runtime/*` được chủ ý thiết kế để KHÔNG thể bỏ qua vì nó có thể khởi chạy các tiến trình con tùy ý. Các yêu cầu ẩn danh tới `/api/mcp/*` từ địa chỉ không phải loopback vẫn tiếp tục trả về `403 LOCAL_ONLY` — mặc định cho mọi đường dẫn LOCAL_ONLY mới vẫn là chỉ cho phép loopback một cách nghiêm ngặt. Xem [Các cấp độ Route Guard](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out).

## Kiểm thử

- Kiểm thử đơn vị: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- Danh sách cho phép công khai: `tests/unit/public-api-routes.test.ts`.
- Chạy kiểm thử tập trung: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## Gỡ lỗi

Pipeline luôn đóng dấu các phản hồi bằng:

```
x-request-id:               <ID tương quan, được lặp lại trong phần thân lỗi>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

Đối với các yêu cầu đã xác thực, các header yêu cầu ở phía upstream (phía handler) cũng bao gồm:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<4-ký-tự-cuối> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (tùy chọn)
x-omniroute-auth-scopes:    danh sách phân tách bằng dấu phẩy
```

Sử dụng `assertAuth(req, expectedClass)` bên trong các handler — hàm này ném `AuthzAssertionError` với mã `AUTHZ_NOT_INITIALIZED` nếu middleware bị bỏ qua (hữu ích để phát hiện các lỗi hồi quy cấu hình trong quá trình kiểm thử).

## Xem thêm

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — dấu xác thực cho từng endpoint
- [COMPLIANCE.md](../security/COMPLIANCE.md) — nhật ký kiểm toán cho các sự kiện xác thực
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — chi tiết về việc thực thi phạm vi MCP
- Mã nguồn: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
