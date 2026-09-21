# Router Backends & Embedded Services — architecture contract (ADR) (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ROUTER_BACKENDS.md) · 🇪🇹 [am](../../../am/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇿 [az](../../../az/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇰 [da](../../../da/docs/architecture/ROUTER_BACKENDS.md) · 🇩🇪 [de](../../../de/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇷 [el](../../../el/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇸 [es](../../../es/docs/architecture/ROUTER_BACKENDS.md) · 🇪🇪 [et](../../../et/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ROUTER_BACKENDS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇱 [he](../../../he/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ROUTER_BACKENDS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ROUTER_BACKENDS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇩 [id](../../../id/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇹 [it](../../../it/docs/architecture/ROUTER_BACKENDS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ROUTER_BACKENDS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇭 [km](../../../km/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ROUTER_BACKENDS.md) · 🇲🇲 [my](../../../my/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇴 [no](../../../no/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [or](../../../or/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ROUTER_BACKENDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ROUTER_BACKENDS.md) · 🇱🇰 [si](../../../si/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ROUTER_BACKENDS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ROUTER_BACKENDS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ROUTER_BACKENDS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ROUTER_BACKENDS.md) · 🇮🇳 [te](../../../te/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇭 [th](../../../th/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ROUTER_BACKENDS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ROUTER_BACKENDS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ROUTER_BACKENDS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ROUTER_BACKENDS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ROUTER_BACKENDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ROUTER_BACKENDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ROUTER_BACKENDS.md)

---

> **상태:** 승인됨 · **맥락:** [#5670](https://github.com/diegosouzapw/OmniRoute/issues/5670),
> [#5603](https://github.com/diegosouzapw/OmniRoute/issues/5603) · **계약:** `domain/routing/routerBackends.ts`
> (타입이 지정된 레지스트리 — 코드는 [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)과 함께 반영됨)

이 ADR은 기여자들이 아키텍처상 서로 구별되는 두 개념을 혼동하지 않도록 `ts`(네이티브), `bifrost`, `cliproxy`, `9router` 및 VibeProxy 호환 엔진 간의 관계를 명확히 규정합니다. 또한 라우터 백엔드 레지스트리 작업에서 도입된 타입이 지정된 레지스트리를 해당 모델의 단일 진실 공급원으로 문서화합니다.

## 핵심적인 구분 — 서로 직교하는 두 축

엔진의 역할은 레지스트리의 `RouterBackendDefinition`에 함께 인코딩된 **서로 독립적인 두 축**으로 설명됩니다.

1. **수명 주기**(`RouterBackendLifecycle`) — _엔진이 실행되는 방식_:
   - `in-process` — OmniRoute Node 프로세스 내부에서 실행됩니다(네이티브 TS 파이프라인).
   - `supervised` — OmniRoute가 `ServiceSupervisor`를 통해 설치/시작/중지/상태 확인하는 로컬 자식 프로세스이며, 이후 공급자 연결로 사용됩니다.
   - `external` — OmniRoute가 요청을 디스패치하지만 관리하지는 **않는** HTTP 엔드포인트입니다(환경 변수의 기본 URL로 구성).
   - `disabled` — 등록되어 있지만 선택할 수 없습니다.
2. **선택 축**(릴레이 라우팅 백엔드) — _릴레이가 해당 엔진으로 디스패치하는지 여부_:
   `src/app/api/v1/relay/chat/completions/routingBackend.ts`의
   `RelayRoutingBackend = "ts" | "bifrost" | "auto"`.

피해야 할 실수는 "임베디드 서비스"와 "라우팅 백엔드"를 하나의 목록으로 취급하는 것입니다. 이 둘은 같지 않습니다. `supervised` 엔진(9router/cliproxy)은 **네이티브 파이프라인에서 사용하는 공급자 연결**이지, 릴레이 디스패치를 위한 대체 백엔드가 아닙니다. `bifrost`는 그 반대입니다. 즉, (역사적으로) `external` 전용이었던 릴레이 디스패치 백엔드입니다.

## 레지스트리 — 단일 진실 공급원

`domain/routing/routerBackends.ts` 계약(코드는 [#5868](https://github.com/diegosouzapw/OmniRoute/pull/5868)과 함께 반영됨)은 각 엔진을 수명 주기, 기능, 서비스 ID, 기본 포트, 상태 확인 구성 및 텔레메트리 지원과 함께 한 번씩 선언합니다. 소비자는 각 사이드카를 개별적으로 특수 처리하는 대신 `getRouterBackend(id)`, `listRouterBackends()`, `listRouterBackendsByCapability(cap)`을 통해 엔진을 조회합니다.

| 백엔드      | 수명 주기    | 서비스(축 A) | 릴레이 백엔드(축 B) | 상태 확인     | 기본 포트 |
| ----------- | ------------ | ------------ | ------------------- | ------------- | --------- |
| `ts`        | `in-process` | —            | `ts`(네이티브)      | —             | —         |
| `bifrost`   | `external`¹  | —¹           | `bifrost` / `auto`  | `/health`     | —         |
| `cliproxy`  | `supervised` | `cliproxy`   | — (공급자)          | `/v1/models`  | 8317      |
| `9router`   | `supervised` | `9router`    | — (공급자)          | `/api/health` | 20130     |
| `vibeproxy` | `external`   | —            | — (공급자 어댑터)   | `/v1/models`  | —         |

¹ Bifrost를 `/api/services/bifrost/`에서 설치/시작할 수 있는 `supervised` 임베디드 서비스로 승격하는 작업은 [#5817](https://github.com/diegosouzapw/OmniRoute/pull/5817)에서 추적됩니다. 이 변경이 병합되기 전까지 Bifrost는 `external` 전용입니다(`BIFROST_BASE_URL`을 통해서만 접근 가능).

`capabilities`(`chat`, `responses`, `streaming`, `tools`, `vision`, `oauth-backed`, `dashboard-embed`, `model-sync`, `native-hot-path`)를 사용하면 호출자가 ID별 분기를 하드 코딩하지 않고 엔진이 실제로 수행할 수 있는 기능을 기준으로 필터링할 수 있습니다.

## 축 A — 임베디드 서비스(감독 대상 프로세스 측)

- **감독 대상 프로세스 레지스트리:** `src/lib/services/bootstrap.ts` `SERVICES[]`
  (현재: `9router`, `cliproxy`).
- **수명 주기 소유자:** `src/lib/services/ServiceSupervisor.ts` — `start()`는 자식
  프로세스를 생성하고, `waitForHealthy()`가 완료될 때까지 대기하며, stdout/stderr를 링 버퍼에
  수집합니다. `stop()`은 SIGTERM→SIGKILL 순으로 처리하며, 모든 작업은 잠금 아래에서 직렬화됩니다.
- **상태 유니온** (`src/lib/services/types.ts`):
  `not_installed | stopped | starting | running | stopping | error`와,
  이와 직교하는 `HealthState = healthy | unhealthy | unknown`.
- **프로세스 내부 SDK가 아닌 별도 프로세스인 이유는 무엇인가요?** 프로세스 격리를 통해
  각 사이드카의 설치/시작/중지/상태/로그를 독립적으로 제어할 수 있고,
  루프백 생성 가드를 적용할 수 있습니다. 프로세스 내부 어댑터 모델링은 향후 작업이며,
  이를 표현하는 곳은 `native-hot-path` 기능 플래그입니다.

### 수명 주기 라우트 계약 (`/api/services/<tool>/…`)

상태 코드는 **의도적으로 상태/동작/경로별로 다르게 지정됩니다**. 이는 비일관성이 아니라
계약입니다.

| 호출                         | 조건                                   | 상태                                 |
| ---------------------------- | -------------------------------------- | ------------------------------------ |
| `POST .../start`             | 서비스가 `not_installed` 상태          | **409** (전제 조건)                  |
| `POST .../stop`              | 이미 중지됨                            | **200** (멱등적 무작업)              |
| `GET .../status`             | 정상                                   | **200** (`live ?? row ?? "unknown"`) |
| `POST .../start`             | 생성 실패                              | **503** (일시적 오류)                |
| `GET .../status`, `.../stop` | 처리되지 않은 오류                     | **500**                              |
| `GET /api/services/<x>/logs` | 알 수 없는 도구 `<x>`                  | **404** `Service '<x>' not found`    |
| `GET .../status?reveal=key`  | `X-Reveal-Confirm: yes` 누락           | **403** (9router에만 해당)           |
| **모든** `/api/services/*`   | 호출자가 루프백/사설 LAN에 속하지 않음 | **403 LOCAL_ONLY**                   |

모든 오류 본문은 `createErrorResponse()`에 의해 →
`{ error: { message, type }, requestId }` 형식으로 생성됩니다. 여기서 `type`은 상태 코드로부터
파생되며(`500→server_error`, `404→not_found`, `409→conflict`, 그 외에는 `invalid_request`),
머신이 처리할 수 있는 판별자입니다. 메시지는 사전에 정제됩니다
(`sanitizeErrorMessage()`, 엄격 규칙 #12).

**루프백 가드**는 `403`의 가장 흔한 원인입니다. `/api/services/`는
`LOCAL_ONLY_API_PREFIXES` (`src/server/authz/routeGuard.ts`)에 포함되며,
`src/server/authz/policies/management.ts`는 루프백 또는 사설 LAN에 속하지 않는
모든 호출자를 **인증 전에** 거부합니다. 이러한 라우트가 자식 프로세스를 생성하기 때문입니다
(엄격 규칙 15 및 17). 공개 터널을 통해 이 라우트에 접근하면 의도적으로 `403`이 반환됩니다.

## 축 B — 릴레이 라우팅 백엔드(디스패치 측)

릴레이 프록시 경로 `/api/v1/relay/chat/completions`만 디스패치 백엔드를
선택합니다. 기본 `/api/v1/chat/completions` 인터페이스는
`routingBackend.ts`를 절대 참조하지 않습니다.

- **선택** (`resolveRelayRoutingBackend`): 단일 전역 환경 변수 토글 —
  `OMNIROUTE_RELAY_BACKEND` / `RELAY_ROUTING_BACKEND` ∈ {`ts`, `bifrost`, `auto`}.
  설정되지 않은 경우 Bifrost가 구성되고 활성화되어 있으면 `auto`, 그렇지 않으면 `ts`입니다.
- **동작:**
  - `bifrost` (강제): Bifrost 실패 → 즉시 `502`, 폴백 없음.
  - `auto`: Bifrost를 시도하고, 실패하거나 쿨다운 중이면 별도 알림 없이 네이티브로 폴스루합니다.
  - `ts` / 폴백 이후: 네이티브 `open-sse` 변환기/실행기 파이프라인.
- **쿨다운:** `bifrostCooldown.ts`에서 `baseUrl`별 실패 쿨다운을 관리합니다.

현재 선택은 **릴레이 수준에서 전부 아니면 전무 방식**입니다. `release/v3.8.43`에는 공급자별
또는 요청별 엔진 전환이 없습니다. 요청별 게이트는 사이드카 매니페스트 작업을 통해 추가되고 있습니다
([#5869](https://github.com/diegosouzapw/OmniRoute/pull/5869) 매니페스트 +
[#5870](https://github.com/diegosouzapw/OmniRoute/pull/5870) `shouldTryBifrostForRequest`).
이를 통해 `auto`는 매니페스트에서 적격으로 지정된 공급자만 Bifrost를 통해 라우팅할 수 있습니다.

## 대시보드 통합

서비스 대시보드는
`src/app/(dashboard)/dashboard/providers/services/hooks/useServiceStatus.ts`를 통해 5s마다
`GET /api/services/<tool>/status`를 폴링하며, `{ tool, state, pid, port, health, installedVersion, latestVersion,
updateAvailable, autoStart, … }`를 반환합니다. 공유 가용성 컨텍스트 프로바이더는 없으며,
각 컴포넌트가 도구별로 훅을 호출합니다. 현재 `!res.ok`일 때 훅은 별도의 설명 없이
`HTTP <status>`만 표시합니다. `error.type` 필드를 사용자가 이해할 수 있는 설명에 매핑하는 것은
추적 중인 UX 개선 사항이지, 계약 변경 사항이 아닙니다.

## 결과

- 새 엔진은 `ROUTER_BACKENDS`에 한 번만 등록되며, 소비자는 새로운 ID별 분기 없이 기능
  쿼리를 통해 해당 엔진을 사용할 수 있습니다.
- "이것이 서비스인가, 아니면 라우팅 백엔드인가?"라는 질문의 답은 ID가 우연히 어느 목록에
  나타나는지가 아니라 `lifecycle` 필드로 결정됩니다.
- Bifrost 감독 기능(#5817)과 네이티브 핫패스 마이그레이션(#5670)은 각 사이드카를
  특수 처리하는 대신 이 공유 계약을 기반으로 구축됩니다.
