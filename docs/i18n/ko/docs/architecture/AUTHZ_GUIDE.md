# Authorization Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **신뢰할 수 있는 원본:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute에는 모든 API 요청을 제어하는 경로 인식 권한 부여 파이프라인이 있습니다. 분류는 **결정론적**이며 **실패 시 차단**됩니다. 즉, 분류할 수 없는 모든 요청은 `MANAGEMENT`로 처리되며 세션 또는 관리 등급 토큰을 요구합니다. 이 페이지에서는 경로를 유지 관리하거나 새 엔드포인트를 설계하는 엔지니어를 위해 이 모델을 설명합니다.

![AuthZ 파이프라인(3가지 경로 클래스 + 정책 평가)](../diagrams/exported/authz-pipeline.svg)

> 출처: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## 두 가지 인증 모드

### 1. API 키(Bearer)

OpenAI/Anthropic/Gemini 호환 클라이언트 API에 사용되며, 키에 `manage` 범위가 있는 경우 일부 관리 경로에도 사용됩니다.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts`의 `isValidApiKey()` / `extractApiKey()`로 검증되며 `src/shared/utils/apiAuth.ts`를 통해 다시 내보내집니다. 검증기는 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 환경 변수도 영구 패스스루 키로 허용합니다(이슈 #1350).

### 2. 대시보드 세션(auth_token 쿠키)

대시보드 페이지와 관리자 작업에 사용됩니다.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT 검증에 성공하고 `authenticated: true`를 포함하는 경우에만 쿠키가 세션으로 간주됩니다
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). 해당 쿠키를
사용하는 모든 구성 요소(경로 가드, authz 파이프라인 새로 고침, WebSocket 핸드셰이크, 라이브
서버, `/api/settings/require-login`, `/api/auth/status`)는 이 헬퍼를 거칩니다.
`JWT_SECRET`으로 서명된 다른 JWT도 존재합니다. Cursor CLI 패스스루는 키 소유자를 위해
`iss "omniroute" / aud "cursor-cli"` 토큰을 발급하지만, 이러한 토큰은 절대로 세션으로
간주되지 않습니다(#13298).

`src/shared/utils/apiAuth.ts`의 `isDashboardSessionAuthenticated()`로 검증됩니다. 파이프라인은 30일의 유효 기간 중 남은 기간이 7일 미만이면 JWT를 자동으로 갱신합니다.

일부 관리 경로는 두 모드 중 **어느 하나**를 허용합니다. 즉, 쿠키 또는 API 키에 `manage`(또는 `admin`) 범위가 있는 경우 `Bearer <key>`를 허용합니다. 이를 통해 v3.8에서 추가된 "API 호출을 통한 구성" 워크플로가 가능해집니다.

#### 선택적 OIDC 로그인 게이트(#6973)

대시보드 관리자 로그인은 기본 비밀번호 로그인과 함께 **옵트인 방식의** OIDC(OpenID Connect) 흐름도 지원합니다. 비밀번호 로그인은 제거되지 않으며, OIDC가 이를 보완할 뿐입니다.

- `settings.oidcEnabled === true`이고 `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret`이 모두 구성된 경우에만 활성화됩니다(설정 → 인증).
  그렇지 않으면 `GET /api/auth/oidc/login`은 `400`을 반환합니다.
- `GET /api/auth/oidc/login`은 발급자의
  `/.well-known/openid-configuration`에서 `authorization_endpoint`를 검색하고(실패 시
  `<issuer>/authorize`로 대체), 수신 요청을 기반으로 리디렉션 URI를 구성하며
  (`x-forwarded-proto` 인식), 무작위 `state`를 `httpOnly` `oidc_state` 쿠키에
  저장한 후 IdP로 리디렉션합니다.
- `GET /api/auth/oidc/callback`은 `state`를 검증하고, 인증 코드를 교환하며, 발급자의 JWKS를
  통해 ID 토큰의 서명을 검증합니다(`jose`의 `createRemoteJWKSet`, JWKS URI별 캐시).
  이때 `issuer`/`audience` 검사도 수행합니다. 선택적 `oidcAllowedSubjects` 허용 목록은
  토큰의 `sub` 클레임 또는 `email` 클레임과 일치 여부를 확인합니다. 이메일 클레임은
  `email_verified === true`일 때만 인정되므로 IdP에서 검증되지 않은 이메일은 절대로
  게이트를 통과할 수 없습니다.
- 성공하면 비밀번호 로그인이 발급하는 것과 **완전히 동일한** 30일짜리 `auth_token` JWT를
  발급합니다(`src/app/api/auth/login/route.ts`). 따라서 대시보드 세션 파이프라인의
  나머지 부분(자동 갱신, 쿠키 플래그)은 변경되지 않습니다. OIDC는 쿠키의 권한이 아니라
  쿠키가 발급되는 방식만 대체합니다.

## 라우트 클래스

`src/server/authz/types.ts`는 세 가지 클래스를 정의합니다. 결정론적으로 분류할 수 없는 모든 라우트는 `MANAGEMENT`로 대체됩니다.

| 클래스       | 설명                                                                                                                                        | 필요한 인증                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| `PUBLIC`     | 명시적으로 안전한 라우트 — 로그인, 로그아웃, 상태, 초기화, 상태 확인, 온보딩 부트스트랩.                                                    | 없음                                                           |
| `CLIENT_API` | 모델 제공 엔드포인트 — `/api/v1/*`, `/api/v1beta/*` 및 별칭 `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`. | 유효한 `REQUIRE_API_KEY` 기능 플래그가 활성화된 경우 Bearer 키 |
| `MANAGEMENT` | 대시보드 페이지, 설정, 제공자, 키, 관리자 및 진단 엔드포인트.                                                                               | 대시보드 세션 또는 `manage` 범위가 있는 Bearer                 |

## 파이프라인

```
수신 요청 → src/proxy.ts
  → src/server/authz/pipeline.ts의 runAuthzPipeline()
    1. 신뢰할 수 있는 내부 헤더 제거(x-omniroute-auth-*, x-omniroute-route-class)
    2. 요청 ID 생성, classifyRoute()를 통해 라우트 분류
    3. pathname == "/"인 경우 → /dashboard로 리디렉션
    4. 드레이닝(정상 종료) 중이고 /api/*인 경우 → 503
    5. GET이 아닌 /api/*인 경우 → checkBodySize() 보호 로직
    6. OPTIONS인 경우 → CORS 프리플라이트 204
    7. options.enforce == false인 경우 → route-class 헤더와 함께 그대로 전달
    8. 그 외의 경우: POLICIES[routeClass].evaluate(ctx)
       - 허용  → x-omniroute-auth-{kind,id,label,scopes} 설정 → NextResponse.next()
       - 거부 → correlation_id가 포함된 JSON 오류(대시보드 페이지 → 302 /login)
```

신뢰할 수 있는 내부 헤더(`src/server/authz/headers.ts`에 정의됨)는 분류 전에 **수신 요청에서 제거됩니다**. 따라서 클라이언트는 주체를 사칭하기 위해 `x-omniroute-auth-*`를 미리 설정할 수 없습니다.

### 정책 계약

각 라우트 클래스에는 `src/server/authz/policies/`의 정책이 적용됩니다.

- **`publicPolicy`** (`policies/public.ts`) — 항상 `allow({ kind: "anonymous", id: "anonymous" })`를 반환합니다.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer를 추출하고 `validateApiKey()`를 통해 검증합니다. 유효한 `REQUIRE_API_KEY` 기능 플래그가 비활성화된 경우에만 익명으로 폴스루합니다. 유효한 플래그는 `isRequireApiKeyEnabled()`(`DB 기능 플래그 재정의 > process.env.REQUIRE_API_KEY > 기본값`)를 통해 결정되므로 대시보드 기능 플래그와 환경 변수가 `/api/v1/*`, `/api/v1beta/*` 및 별칭에 일관되게 적용됩니다. 리졸버 오류가 발생하면 폐쇄형으로 실패합니다. 클라이언트 API 라우트에서 대시보드 세션 요청을 허용합니다(대시보드 모델 카탈로그에서 사용하는 `/api/v1/models` 포함).
- **`managementPolicy`** (`policies/management.ts`) — 대시보드 세션, 내부 모델 동기화 요청(`/api/providers/[name]/(sync-models|models)`와 일치) 또는 `isAuthRequired()`가 false를 반환하는 경우의 완전한 건너뛰기를 허용합니다. Bearer 토큰이 있지만 유효하지 않은 경우 403(`AUTH_001`)을 반환하고, 그 외에는 401을 반환합니다. 또한 모든 인증 분기 전에 라우트 가드 티어(LOCAL_ONLY / ALWAYS_PROTECTED)를 적용합니다. 자세한 내용은 [라우트 가드 티어](../security/ROUTE_GUARD_TIERS.md)를 참조하세요. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`에 속하는 LOCAL_ONLY 경로(현재: `/api/mcp/`)는 Bearer 키에 `manage` 범위가 있는 경우 루프백이 아닌 위치에서도 접근할 수 있습니다. 그 외의 모든 LOCAL_ONLY 경로는 범위와 관계없이 엄격하게 루프백으로 제한됩니다.

정책이 성공하면 `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }`인 `AuthSubject`를 반환합니다. 다운스트림 핸들러는 인증 로직을 다시 실행하는 대신 `src/server/authz/assertAuth.ts`의 `assertAuth(request, "CLIENT_API")`를 통해 이를 읽을 수 있습니다.

## 공개 라우트 목록

`src/shared/constants/publicApiRoutes.ts`는 명시적인 허용 목록입니다.

목록은 **형태**에 따라 나뉘며, 이 구분은 보안상 매우 중요합니다(GHSA-74g9-q8f6-793h). 접두사는 `startsWith()`로 일치 여부를 확인하므로, 선행 문자가 같은 모든 인접 경로와도 일치합니다.
접두사로 지정된 `/api/usage/om-usage`는 `/api/usage/om-usage<anything>`을 공개로 표시했고, Next는 이를 자체 인증이 없는 핸들러인 `/api/usage/[connectionId]`로 해석합니다.

```ts
// 실제 하위 트리입니다. 모든 항목은 "/"로 끝나야 합니다(단위 테스트에서 검증됨).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify에서 CLIENT_API로 취급되며, "인증 없는 공개"로 취급되지 않음
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// 단일 라우트이며, 후행 슬래시 유무와 관계없이 정확히 일치해야 합니다.
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

// CORS 출처 제한 완화도 적용되는 읽기 전용 단일 라우트입니다.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS 제한 완화가 적용되지 않는 읽기 전용 단일 라우트입니다.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

읽기 전용 라우트는 안전한 메서드에 대해서만 공개됩니다. 참고: `classifyRoute()`는 `/api/v1/*` 및 `/api/v1beta/*`를 PUBLIC 폴스루에서 제외합니다. 이들은 항상 `CLIENT_API`이므로 Bearer 키 정책이 계속 적용됩니다.

## 새 라우트 추가하기

### 패턴 1 — 공개 클라이언트 API 엔드포인트(Bearer 인증)

`/api/v1/` 및 `/api/v1beta/` 아래의 라우트는 자동으로 `CLIENT_API`로 분류됩니다. 미들웨어가 Bearer 검사를 적용하므로 라우트 핸들러에서 이를 다시 수행할 필요는 없지만, 필요한 경우 주체를 읽을 수 있습니다.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... 핸들러 로직
}
```

### 패턴 2 — 관리 엔드포인트(세션 또는 Bearer + manage)

`src/lib/api/requireManagementAuth.ts`의 `requireManagementAuth()`를 사용합니다.

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... 핸들러 로직
}
```

`requireManagementAuth()`는 성공 시 `null`을 반환하고, 실패 시 JSON 오류 `Response`를 반환합니다.

- 401 `AUTH_001` "인증 필요" — 자격 증명이 전혀 없음
- 403 — 유효하지 않은 Bearer이거나, Bearer가 있지만 키에 `manage` / `admin` 범위가 없음

`hasManageScope(scopes)`는 `"manage"` 또는 `"admin"`에 대해 true를 반환합니다.

### 패턴 3 — 공개 허용 목록에 추가하기

편의성이 아니라 형태에 따라 세트를 선택하세요. 단일 라우트는 `PUBLIC_API_ROUTES_EXACT`에 추가하고(GET 전용인 경우 `PUBLIC_READONLY_CORS_API_ROUTES`), 실제 하위 트리만 `PUBLIC_API_ROUTE_PREFIXES`에 추가해야 하며 반드시 `/`로 끝나야 합니다. 단일 라우트를 접두사 목록에 넣으면 선행 문자가 같은 모든 인접 경로도 공개됩니다. 여기에는 나중에 추가되는 동적 세그먼트 형제 라우트도 포함됩니다(GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts`, `tests/unit/authz/classify.test.ts`의 단위 테스트를 업데이트하세요.

## 범위

API 키는 `scopes` 배열을 포함합니다(JSON 형식으로 `api_keys.scopes`에 저장됨, `src/lib/db/apiKeys.ts` 참조).

### 관리 범위

- `manage` / `admin` — Bearer로 전송될 경우 키에 관리 API 엔드포인트에 대한 접근 권한을 부여합니다.

### MCP 범위 (`src/shared/constants/mcpScopes.ts`)

각 MCP 도구에는 `MCP_TOOL_SCOPES`를 통해 특정 범위가 필요합니다. 전체 목록(`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts`의 범위 적용 로직은 `resolveCallerScopeContext()`가 MCP 인증 정보,
요청 메타데이터 또는 `OMNIROUTE_MCP_SCOPES`에서 범위를 확인한 후 각 도구의 범위 목록을
`evaluateToolScopes()`에 전달합니다.

## 인증 필수 여부 전환

`src/shared/utils/apiAuth.ts`의 `isAuthRequired()`는 요청에 대해 **어떤 형태로든** 인증을 적용할지 결정합니다.

- `settings.requireLogin === false` → 인증이 전역적으로 비활성화됩니다.
- 비밀번호가 설정되어 있지 **않고** `INITIAL_PASSWORD` 환경 변수도 없는 경우 → 부트스트랩 모드에서는 온보딩 마법사와 루프백 요청을 허용하지만, 외부 네트워크에 노출된 요청에는 여전히 자격 증명이 필요합니다.
- DB 오류 발생 시 → 접근을 차단합니다(기본 보안 원칙).

클라이언트 API 키 적용은 `process.env.REQUIRE_API_KEY`를 직접 읽는 대신 `src/shared/utils/featureFlags.ts`의 `isRequireApiKeyEnabled()`를 사용합니다. 이는 배포된 인스턴스에서 중요합니다. Dashboard → Feature Flags에서 `REQUIRE_API_KEY`를 전환하면 DB 재정의가 저장되며, 이 헬퍼를 공유하는 `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` 및 기타 클라이언트 API 인증 검사에 즉시 적용됩니다. 기능 플래그 저장소를 읽을 수 없는 경우 클라이언트 API 인증은 접근을 차단하며 키를 요구합니다.

## 호환성을 깨는 변경 사항 — v3.8.0

`/api/v1/agents/tasks/*` 및 `/api/resilience/model-cooldowns` 엔드포인트는 **이제 관리 인증이 필요합니다**(커밋 `588a0333`). 이전처럼 `manage` 범위가 없는 일반 API 키를 보내는 클라이언트는 `403`을 받습니다. 마이그레이션: API Keys 대시보드에서 해당 키에 `manage` 범위를 부여하거나, 로그인된 대시보드 세션을 사용하세요.

## 동작 변경 사항 — v3.8.2

`/api/mcp/*`(원격 MCP 서버)는 여전히 기본적으로 LOCAL_ONLY이지만, 이제 `Authorization: Bearer <api-key>` 헤더에 `manage` 범위가 포함된 경우 비루프백 요청을 허용합니다. 이 예외는 `src/server/authz/routeGuard.ts`의 `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES`를 통해 경로별로 명시적으로 제한됩니다. 같은 계층의 LOCAL_ONLY 접두사인 `/api/cli-tools/runtime/*`는 임의의 하위 프로세스를 생성할 수 있으므로 의도적으로 우회할 수 없습니다. 비루프백에서 `/api/mcp/*`로 보내는 익명 요청은 계속 `403 LOCAL_ONLY`를 반환하며, 새로운 LOCAL_ONLY 경로의 기본값은 엄격한 루프백 전용으로 유지됩니다. [라우트 가드 계층](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out)을 참조하세요.

## 테스트

- 단위 테스트: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- 공개 허용 목록: `tests/unit/public-api-routes.test.ts`.
- 집중 실행: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## 디버깅

파이프라인은 항상 응답에 다음 헤더를 추가합니다.

```
x-request-id:               <상관관계 ID, 오류 본문에도 동일하게 포함>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

인증된 요청의 경우 업스트림(핸들러 측) 요청 헤더에 다음 항목도 포함됩니다.

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<마지막 4자리> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (선택 사항)
x-omniroute-auth-scopes:    쉼표로 구분된 목록
```

핸들러 내부에서 `assertAuth(req, expectedClass)`를 사용하세요. 미들웨어를 우회한 경우 코드가 `AUTHZ_NOT_INITIALIZED`인 `AuthzAssertionError`를 발생시킵니다(테스트에서 구성 회귀를 발견하는 데 유용합니다).

## 참고 항목

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 엔드포인트별 인증 표시
- [COMPLIANCE.md](../security/COMPLIANCE.md) — 인증 이벤트 감사 로그
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP 범위 적용 세부 정보
- 소스: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
