# CORS Configuration & Security (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute는 중앙에서 관리되는 단일 허용 목록을 통해 어떤 **브라우저 출처(origin)**가 교차 출처 응답을 읽을 수 있는지 제어합니다. 이 모델은 **기본적으로 차단(fail-closed)**됩니다. 명시적으로 허용하기 전까지는 어떤 출처도 허용되지 않습니다. 이 페이지에서는 허용 목록이 결정되는 방식, `CORS_ALLOW_ALL=true`가 실제로 노출하는 범위와 (중요하게도) **노출하지 않는 범위**, 개발 환경과 프로덕션 환경을 안전하게 구성하는 방법, 그리고 와일드카드가 활성화되었을 때 대시보드에 표시되는 런타임 경고를 설명합니다.

**신뢰할 수 있는 원본:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). 허용 목록은 미들웨어
(`src/server/authz/pipeline.ts`)에서 한 번 적용되며, 개별 라우트 핸들러는
`Access-Control-Allow-Origin`을 직접 설정하지 않습니다.

## 출처가 결정되는 방식

각 요청에 대해 미들웨어는 다음 순서로 `Access-Control-Allow-Origin` 값을 계산합니다.

1. **`CORS_ALLOW_ALL=true`**(또는 레거시 `CORS_ORIGIN=*`) → 호출자의
   `Origin`을 그대로 반환합니다(`Origin` 헤더가 없으면 `*`). 캐시가 올바르게 동작하도록
   `Vary: Origin`도 설정합니다. 동일한 `applyCorsHeaders()` 단일 제어 지점은 토큰 인증이 적용되는
   `/v1*`/`/v1beta*` 영역의 본문이 있는 모든 2xx 응답에
   `Vary: Accept-Encoding`도 추가합니다(`relaxForTokenAuth`, RFC 9110 §12.5.5, 이슈 #6737).
   따라서 다운스트림/공유 캐시는 압축된 응답과 압축되지 않은 응답을 올바르게 구분할 수 있습니다.
2. 그 외의 경우 요청의 `Origin`은 정규화(소문자 변환, 후행 슬래시 제거)된 후
   **병합된 허용 목록**과 대조됩니다.
   - 환경 변수 **`CORS_ALLOWED_ORIGINS`** — 쉼표로 구분된 목록
   - 런타임 **`corsOrigins`** 설정(대시보드 → 보안 → _CORS 허용 출처_).
     `src/lib/config/runtimeSettings.ts`의 `setRuntimeAllowedOrigins()`를 통해 주입됩니다.
3. 일치하는 항목이 없음 → **`Access-Control-Allow-Origin` 헤더를 전송하지 않습니다**.
   브라우저가 교차 출처 읽기를 차단합니다. 이것이 의도된 기본 차단 동작입니다.

| 환경 변수              | 의미                                                                           |
| ---------------------- | ------------------------------------------------------------------------------ |
| `CORS_ALLOWED_ORIGINS` | 허용할 정확한 출처의 CSV 목록(권장).                                           |
| `CORS_ALLOW_ALL`       | `true`/`1` → 모든 출처를 그대로 반환(와일드카드). 개발 환경 전용.              |
| `CORS_ORIGIN`          | 레거시. `*`는 `CORS_ALLOW_ALL`처럼 동작하며, 단일 값은 허용 목록에 추가됩니다. |

## 위협 모델 — `CORS_ALLOW_ALL=true`가 실제로 노출하는 범위

OWASP의 일반적인 경고("와일드카드 CORS = 모든 사이트가 API를 호출할 수 있음")는 진지하게 받아들일 가치가 있습니다. 하지만 OmniRoute의 노출 범위는 **일반적인 경우보다 좁습니다**. 이는 다음과 같은 구체적인 구현 특성 때문입니다.

> **중앙의 `applyCorsHeaders()`는 절대로
> `Access-Control-Allow-Credentials`를 전송하지 않습니다.** 서버가
> `Access-Control-Allow-Credentials: true`를 전송하지 않는 한 브라우저는 _자격 증명이 포함된_
> (쿠키를 포함한) 교차 출처 응답을 노출하지 않습니다. OmniRoute의 공유 CORS 경로는 이 헤더를
> 절대로 전송하지 않습니다.

따라서 `CORS_ALLOW_ALL=true`인 경우에도 각 영역에는 다음과 같은 의미가 있습니다.

| 영역                                | 인증 메커니즘             | 와일드카드 CORS의 영향                                                                                                                                                                                                         |
| ----------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 대시보드 / 관리 `/api/*`            | 쿠키 세션                 | 출처는 그대로 반환되지만 **`Allow-Credentials`가 없으므로** 브라우저가 자격 증명이 포함된 응답 읽기를 **차단**합니다. 악의적인 교차 출처 사이트는 인증된 대시보드 응답을 **읽을 수 없으며**, 세션 쿠키도 노출되지 않습니다.    |
| 클라이언트 API `/v1/*`, `/v1beta/*` | Bearer / `x-api-key` 헤더 | 이미 **의도적으로** 허용적입니다(`relaxForTokenAuth`). 브라우저는 `Authorization`/`x-api-key`를 자동으로 첨부하지 않으므로 공격자의 페이지가 사용자의 키를 제공할 수 없습니다. `CORS_ALLOW_ALL`은 이 범위를 확대하지 않습니다. |
| 공개 읽기 전용(`/api/health`, …)    | 없음                      | 민감하지 않으므로 와일드카드는 무해합니다.                                                                                                                                                                                     |

따라서 `CORS_ALLOW_ALL=true`의 **잔여** 노출은 다음으로 제한됩니다. (a) 이미 인증 없이 접근할 수 있는 데이터에 대한 자격 증명 없는 교차 출처 **읽기**, (b) 관리 라우트에서 CORS **프리플라이트를 통과**시키는 것. 단, 이러한 라우트에는 여전히 교차 출처 페이지가 제공할 수 없는 인증이 필요합니다. 공유 CORS 경로에서 이는 세션 탈취나 자격 증명 탈취 벡터가 **아닙니다**.

### 실제 예외 한 가지 — `/api/v1/agents/`

Cloud-Agent 라우트(`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`)는
**자체** CORS 헤더
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`)를 설정하며,
`Access-Control-Allow-Origin: <origin>|*`와
`Access-Control-Allow-Credentials: true`를 함께 전송합니다. 이는 출처 반환과 자격 증명이 공존하는 유일한 영역이며,
`CORS_ALLOW_ALL`과 **무관합니다**. 이러한 라우트에는 관리 인증이 적용됩니다
(`requireManagementAuth`). 대시보드를 호스트 외부에 노출하는 운영자는 응답 헤더가 교차 출처 자격 증명 포함 읽기를 허용하는 유일한 위치가 이곳이라는 점을 인지해야 합니다. 이를 명시적인 허용 목록으로 제한하는 작업은 이 CORS 지침과 별도로 추적됩니다.

## 프로덕션 체크리스트

- **프로덕션에서는 절대로 `CORS_ALLOW_ALL=true`로 설정하지 마세요.** 설정하지 않은 상태로 두세요.
- 명시적인 출처 목록을 설정하세요. 환경 변수 또는 보안 탭의 필드 중 하나를 사용하면 됩니다.

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute가 리버스 프록시/터널(nginx, Caddy, Cloudflare
  Tunnel, Tailscale) 뒤에서 실행되는 경우 CORS만이 유일한 제어 수단은
  **아닙니다**. 루프백 경로 가드는 여전히 프로세스를 생성할 수 있는 경로를
  보호합니다([ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) 참조). 403 오류를
  "해결"하기 위해 `X-Forwarded-For: 127.0.0.1`을 위조하지 마세요. 이렇게 하면
  경로 가드가 차단하는 RCE 취약점 유형이 다시 노출됩니다.
- 런타임 상태를 확인하세요. `CORS_ALLOW_ALL=true`가 적용되어 있으면 대시보드의
  대시보드 → 보안 → 권한 부여 인벤토리 아래에 **지속적으로 표시되는 주황색 배너**가
  나타나며, `/api/settings/authz-inventory`는 모니터링 도구가 폴링할 수 있는
  `cors: { allowAll, allowedOrigins }` 엔벌로프를 반환합니다.

## 개발 편의성 — 특정 로컬 출처 허용

개발 환경에서도 와일드카드는 거의 필요하지 않습니다. 사용하는 개발 서버만 허용하세요.

```bash
# 로컬 OmniRoute를 호출하는 Vite(5173) + Next.js(3000) 개발 서버
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

출처는 대소문자를 구분하지 않고 비교되며 후행 슬래시는 무시되므로,
`http://localhost:3000`과 `http://localhost:3000/`은 동일합니다. 재시작하지
않고도 **대시보드 → 보안 → CORS 허용 출처**에서 런타임에 동일한 CSV를 설정할 수
있습니다.

## API 키와 쿠키 세션 비교

- **Bearer / `x-api-key`(`/v1/*` 추론 인터페이스):** 브라우저는 이를 자동으로
  첨부하지 않습니다. 여기서 CORS는 유의미한 장벽이 아닙니다. API 키가 장벽 역할을
  합니다. 따라서 이 인터페이스는 브라우저 및 Electron 클라이언트가 이미 접근 권한이
  있는 응답을 읽을 수 있도록 의도적으로 허용 범위가 넓게 설정되어 있습니다.
- **쿠키 세션(대시보드):** 기본적으로 접근을 차단하는 설정과 공유 경로에
  `Access-Control-Allow-Credentials`가 없다는 점에 의해 보호됩니다. 관리/대시보드
  출처를 허용 범위가 넓은 구성에 포함하지 마세요. 해당 출처는 반드시 기본적으로
  접근이 차단되는 상태를 그대로 유지해야 합니다.

## 예시: OmniRoute 앞의 리버스 프록시

CORS는 OmniRoute 자체에서 적용되므로 일반적으로 프록시가 `Access-Control-*`
헤더를 추가하거나 다시 작성해서는 **안 됩니다**(헤더가 중복되면 브라우저가 제대로
작동하지 않습니다). TLS를 종료하고 요청을 전달하세요. 프리플라이트에는 OmniRoute가
응답하도록 하세요.

```nginx
# nginx — OmniRoute로 전달하며, 여기서 Access-Control-*을 삽입하지 마세요
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For를 127.0.0.1로 설정하지 마세요. 루프백 경로 가드가 무력화됩니다.
}
```

허용할 브라우저 출처는 프록시가 아니라 OmniRoute(`CORS_ALLOWED_ORIGINS` 또는
보안 탭)에서 설정하세요.

## 소스 파일

| 관련 항목                          | 파일                                                                 |
| ---------------------------------- | -------------------------------------------------------------------- |
| 허용 목록 확인 + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| 미들웨어 적용(단일 진실 공급원)    | `src/server/authz/pipeline.ts`                                       |
| 설정 → 런타임 출처 주입            | `src/lib/config/runtimeSettings.ts`                                  |
| 대시보드용 런타임 상태             | `src/app/api/settings/authz-inventory/route.ts`                      |
| 대시보드 경고 배너                 | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS 허용 출처 필드                | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent 경로별 CORS(예외)      | `src/lib/cloudAgent/api.ts`                                          |

## 참고 항목

- [라우트 가드 계층](./ROUTE_GUARD_TIERS.md) — 프로세스 생성 기능이 있는 라우트에 대한
  루프백 강제 적용(별도의 상호 보완적 제어).
- [인가 가이드](../architecture/AUTHZ_GUIDE.md) — 전체 인증 파이프라인.
