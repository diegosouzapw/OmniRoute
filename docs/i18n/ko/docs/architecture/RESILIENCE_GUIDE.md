# Resilience Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute에는 서로 구분되지만 관련성이 있는 세 가지 복원력 메커니즘이 있습니다. 각 메커니즘은 범위와 목적이 다릅니다. 라우팅 동작을 디버깅할 때는 이들을 서로 구분해서 다루십시오.

![3계층 복원력 모델](../diagrams/exported/resilience-3layers.svg)

> 출처: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. 공급자 서킷 브레이커

**범위:** 공급자 전체(예: `glm`, `openai`, `anthropic`).

**목적:** 업스트림/서비스 수준에서 반복적으로 실패하는 공급자에게 트래픽을 보내지 않도록 합니다.

**구현:**

- 핵심 클래스: `src/shared/utils/circuitBreaker.ts`
- 연결: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- 상태 API: `GET /api/monitoring/health`
- 재설정 API: `POST /api/resilience/reset`
- 래퍼: `open-sse/services/accountFallback.ts`
- DB 테이블: `domain_circuit_breakers`

**상태:**

- `CLOSED` — 정상 트래픽 허용
- `DEGRADED` — 트래픽은 계속 허용되지만, 증가한 공급자 장애를 추적함
- `OPEN` — 공급자가 일시적으로 차단되며, 조합 라우팅에서 건너뜀
- `HALF_OPEN` — 재설정 타임아웃이 경과하여 프로브 요청이 허용됨

**설정 가능한 기본값(`open-sse/config/constants.ts`, 대시보드 → 설정 → 복원력에서 제공):**

| 클래스 | 성능 저하 진입 기준 | 차단 기준 | 재설정 타임아웃 |
| ------ | ------------------- | --------- | --------------- |
| OAuth  | 5회 실패            | 8회 실패  | 60s             |
| API 키 | 7회 실패            | 12회 실패 | 30s             |
| 로컬   | 파생값              | 2회 실패  | 15s             |

`degradationThreshold`는 공급자가 `DEGRADED` 상태로 진입하는 시점을 제어하고, `failureThreshold`는 공급자가 차단되어 건너뛰어지는 시점을 제어합니다. 로컬 공급자 프로필은 아직 복원력 설정 페이지에 표시되지 않습니다.

**트립 코드:** 공급자 수준 상태 `[408, 500, 502, 503, 504]`만 해당합니다. 계정 수준 오류(대부분의 401/403/429)에는 트립하지 **마십시오**. 이러한 오류는 쿨다운 또는 잠금에 해당합니다.

**지연 복구:** `OPEN`이 만료되면 `getStatus()`, `canExecute()`, `getRetryAfterMs()`가 상태를 `HALF_OPEN`으로 갱신합니다. 백그라운드 타이머는 필요하지 않습니다.

---

### 선택적 전역 공급자 쿨다운(윈도우 게이트)

네 번째 **선택적** 계층(`PROVIDER_COOLDOWN_ENABLED`, 기본값 **꺼짐**)은
`open-sse/services/providerCooldownTracker.ts`에서 실패한 공급자에 대한
요청 간 메모리를 유지합니다. 조합 대상 확인 시 이를 참조하므로, 연속된 조합 요청이 방금
실패한 공급자를 다시 순회하지 않습니다. 공급자 수준 항목에는 `PROVIDER_PROFILES` 윈도우 게이트가 적용됩니다.

| 프로필 | 다음 횟수 이후 트립(`providerFailureThreshold`) | 해당 기간 내(`providerFailureWindowMs`) | 쿨다운 기간(`providerCooldownMs`) |
| ------ | ----------------------------------------------: | --------------------------------------: | --------------------------------: |
| OAuth  |                                            `10` |                                 `15min` |                            `5min` |
| API 키 |                                            `15` |                                 `30min` |                           `10min` |

임계값 미만에서는 공급자가 쿨다운 중인 것으로 간주되지 않으며, 성공하면
윈도우가 초기화됩니다. 대신 연결 수준 항목(`provider:connectionId`)은
지수형 `minRetryCooldownMs → maxRetryCooldownMs` 백오프를 유지합니다. 재정의:
`OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
회귀 방지 테스트: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. 연결 쿨다운

**범위:** 단일 공급자 연결/계정/키.

**목적:** 동일한 공급자의 다른 연결은 계속 요청을 처리하는 동안 문제가 있는 키 하나를 건너뜁니다.

**구현:**

- 사용 불가 표시: `src/sse/services/auth.ts::markAccountUnavailable()`
- 선택: 동일한 파일의 `getProviderCredentials*`
- 쿨다운 계산: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 설정: `src/lib/resilience/settings.ts`

**연결별 필드:**

- `rateLimitedUntil` — 쿨다운이 만료되는 시점의 타임스탬프
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — 지수 백오프 카운터

**기본 쿨다운:**

- OAuth 기본값: 5초
- API 키 기본값: 3초
- API 키 429: 업스트림 `Retry-After`/재설정 헤더/파싱 가능한 재설정 텍스트를 우선 사용
- 백오프: `baseCooldownMs * 2 ** failureIndex`

**동시 재시도 폭주 방지 가드:** 동시 실패로 인해 쿨다운이 과도하게 연장되거나 `backoffLevel`이 중복 증가하는 것을 방지합니다.

**종료 상태(쿨다운 아님):**

- `banned` — 차단 키워드/계정 차단 감지([BAN_DETECTION](../security/BAN_DETECTION.md) 참조) 및 업스트림의 요청별 거부가 3회 연속 발생하면 설정됩니다(`request_rejected`, 예: Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`). 한 번의 거부는 연결을 쿨다운 상태로만 전환합니다.
- `expired` (제한된 횟수의 재시도 후 종료 상태로 전환 — 지수 백오프와 함께 `EXPIRED_RETRY_MAX = 3` 적용 — 따라서 일시적인 OAuth 오류는 계정이 영구적으로 비활성화되기 전에 자체 복구될 수 있습니다)
- `credits_exhausted`

이러한 상태는 자격 증명이 변경되거나 운영자가 재설정할 때까지 유지됩니다. 종료 상태를 일시적인 쿨다운 상태로 덮어쓰지 마십시오.

**지연 복구:** `rateLimitedUntil`이 지나면 연결을 다시 사용할 수 있습니다. 성공적으로 사용되면 `clearAccountError()`가 모든 오류 필드를 지웁니다.

### Claude OAuth 사용량 제한: 낮은 우선순위 레인 + 세션 제한 재설정

**범위:** 하나의 Claude 구독(OAuth) 연결. 두 기능 모두 **연결별 옵트인
기능**이며(연결 편집 → Claude 섹션 → `providerSpecificData`의 `lowPriorityMode` /
`autoLimitReset`, 둘 다 기본적으로 꺼짐), Claude Code의 `/low-priority` 및
`/limit-reset` 명령을 그대로 구현합니다(Claude Code 2.1.263에서 와이어 계약 캡처).

**구현:**

- 상태 머신 + 응답 분류: `open-sse/services/claudeLowPriority.ts`
- 재설정 상태/클레임 클라이언트: `open-sse/services/claudeLimitReset.ts`
- 실행기 훅(헤더 삽입 + 동일 계정 재시도): `open-sse/executors/base.ts::execute()`
- 옵트인 설정 영속화: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**트리거:** 5시간 사용량 제한 — 헤더에
`anthropic-ratelimit-unified-status: rejected`가 포함되고, 계정이 대상인 경우
`anthropic-ratelimit-unified-slow-offer: treatment`도 포함된 `429`. 첫 번째 제한
429가 발생하기 전에는 아무것도 전송되지 않습니다. 통합 헤더가 없는 버스트 429는 일반 쿨다운 경로로 처리됩니다.

**낮은 우선순위 레인** (`lowPriorityMode`):

- 제한 429가 발생하면 실행기는 제안을 수락하고 **동일한** 계정에
  `anthropic-usage-limit: slow`를 사용하여 즉시 재시도합니다. 레인은 공지된
  `anthropic-ratelimit-unified-reset`(+60초 유예)까지 활성 상태로 유지되며, 해당
  기간의 모든 요청에 이 헤더가 포함됩니다. 가로챈 429는 `handleChatCore`에
  도달하지 않으므로 연결은 쿨다운 상태가 **되지 않으며** 다른 연결로 순환되지도 않습니다.
- 이후 응답의 `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`는
  레인을 유지합니다. `slot_busy`(429) 또는 `529`가 발생하면 서버의
  `anthropic-ratelimit-unified-slow-retry-after`(기본값 20초, 5~~600초로 제한, ±30% 지터)만큼
  기다렸다가 재시도하며, `anthropic-ratelimit-unified-slow-max-wait`(기본값 20분, 1분~~6시간으로
  제한)을 상한으로 적용합니다. 이 시간을 초과하면 레인이 종료되고 10분의 냉각 기간 동안
  재수락이 차단됩니다. 또한 대기 시간은 요청 자체의 업스트림 시작 타임아웃
  (`resolveFetchStartTimeout`, 기본값 10분)에서 5초의 여유 시간을 뺀 나머지 시간으로
  제한됩니다. 이 제한이 없으면 기본 최대 대기 시간인 20분이 요청 수명보다 길어져 대기
  도중 절전이 중단되고, 정상적인 `max_wait` 종료 + 냉각 대신 `TimeoutError`가 노출됩니다.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5시간 창의 롤오버 또는
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`(유료 초과 사용량이 이제
  제한을 처리하므로 상태와 관계없이 `extra_usage`로 종료)가 발생하면 레인이 종료됩니다.
  이후 응답은 일반 쿨다운 경로로 전달됩니다. `budget_exhausted`는 공지된 예산 재설정
  시점(≤ 8일)까지 기억됩니다.
- 제한 검사는 실행기 자체의 400 기반 시도 내 재시도(컨텍스트 편집, 사고/노력 수준 제한,
  매개변수 자동 학습) 이후에 실행되므로, 그러한 재시도 중 하나에서만 나타나는 제한 429도
  쿨다운 경로에 도달하는 대신 여전히 가로채집니다.
- 상태는 연결별로 메모리에 저장됩니다(재시작하면 다시 수락하기 위해 제한 429가 한 번 더 필요합니다).

**세션 제한 재설정** (`autoLimitReset`, 둘 다 켜져 있으면 레인보다 먼저 시도):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  블록. `arm: "reset"`이고 `available: true`이면
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`를
  `{ "program": "juniper_tide" }`와 함께 호출합니다(조직 UUID는
  `providerSpecificData.organizationUUID`에서 가져오며, 부트스트랩 폴백 사용).
- `result: reset|not_limited` → 요청을 최대 속도로 재시도합니다(느린 레인 헤더 없음).
  `already_used` / `not_offered`는 `next_available_at`(기본값 1주)을 메모이즈하며,
  실패 시 15분 동안 백오프합니다. 재설정은 일주일에 한 번 가능하며 여전히 주간 제한에 포함됩니다.

회귀 방지 테스트: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### 세션 어피니티(#7274)

**범위:** 하나의 연결에 고정된 단일 클라이언트 세션(`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` 헤더)이며, **모든** 공급자에 적용됩니다.

**목적:** 여러 요청에 걸쳐 멀티턴 에이전트(Claude Code, aider, 커스텀 에이전트)가 동일한 계정을 유지하도록 하여, 계정 간 컨텍스트 손실과 계정별 세션 상태를 사용하는 제공자에서 반복적으로 발생하는 콜드 스타트 `429`를 줄입니다.

**구현:**

- TTL 결정: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- 핀 선택/생성: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- 헤더 추출(모든 제공자에 공통): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- 영구 저장 핀 테이블: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- 설정: `sessionAffinityTtlMs`(밀리초 단위의 전역 TTL, `0`이면 비활성화) — `src/lib/db/settings.ts`. 마이그레이션 `124_generic_session_affinity_ttl.sql`을 통해 Codex 전용이었던 `codexSessionAffinityTtlMs`에서 이름이 변경되었으며, 이전에 구성된 Codex TTL이 있으면 이를 새로운 기본값으로 이전합니다.

#7274 이전에는 `resolveSessionAffinityTtlMs()`가 `codex`를 제외한 모든 제공자에 대해 무조건 `0`을 반환했으므로, 핀 고정 메커니즘과 헤더 추출이 이미 제공자에 구애받지 않았음에도 TTL 설정과 세션 헤더는 다른 어느 곳에서도 효과가 없었습니다. 수정 사항에서는 이러한 조기 반환을 제거했으며, 이제 TTL을 전역적으로 `0`보다 큰 값으로 설정하면 모든 제공자에 동일하게 적용됩니다.

세 가지 세션 선호도 헤더는 업스트림으로 절대 전달되지 않습니다. 실행기는 클라이언트 헤더를 그대로 전달하지 않고 자체 업스트림 헤더를 처음부터 구성하므로, 이는 내부 상관관계 ID로만 유지됩니다.

### 독점 관리형 세션 연결 임대

**범위:** 하나의 활성 관리형 HTTP 클라이언트/세션이 하나의 적격 OmniRoute 연결을 소유합니다.

**목적:** 여러 요청에 걸쳐 강력한 라우팅 경계가 필요한 클라이언트에 지속적인 독점 연결 소유권을 제공합니다. 이는 소프트 연속성 선호 방식인 세션 선호도와 다릅니다. 독점 임대는 수명 주기 상태를 SQLite에 영구 저장하고, 활성 소유자와 활성 연결의 전역 고유성을 강제하며, 제공자 디스패치 전에 오래된 세대를 거부합니다.

이 기능은 API 키별로 명시적으로 활성화해야 합니다. 관리형 키에는 `lease:exclusive` 범위와 명시적인 비어 있지 않은 `allowedConnections` 목록이 있어야 합니다. 모든 HTTP 클라이언트가 수명 주기 엔드포인트를 사용할 수 있으며, 클라이언트 이름, 사용자 에이전트, 제공자, OAuth 방식 또는 모델은 필요하지 않습니다. 임대는 모델이 아니라 연결을 소유하므로, 연결이 일반적인 적격 상태를 유지하는 동안에는 모델이 변경되어도 바인딩이 유지됩니다. 일반적인 모델, 할당량, 상태, 쿨다운 및 허용 목록 규칙은 계속 우선 적용되며, 동일한 세대를 다른 사용 가능한 적격 연결로 전환할 수 있습니다.

수명 주기는 JSON 작업 `acquire`, `renew`, `release`를 사용하는 `POST /api/v1/session-leases`입니다. 관리형 추론 요청은 불투명한 `X-OmniRoute-Lease-Owner` 값과 정확한 `X-OmniRoute-Lease-Generation`을 제공합니다. 소유자 값은 `vlo_` 다음에 43자의 base64url 문자가 오는 형식이며, 해당 값의 SHA-256 해시만 저장됩니다. 모든 최종 디스패치 경계는 인증된 API 키 ID와 활성 연결 ID에도 바인딩됩니다. 임대 제어 헤더는 로그, 보존된 요청 스냅샷 및 업스트림 실행기 헤더에서 제거됩니다.

일반 라우팅에 적격 관리형 후보가 있지만 사용 가능한 모든 후보가 다른 활성 임대에 의해 점유된 경우, OmniRoute는 HTTP `429`, 임대 용량 사용 불가 코드, 용량 대기 상태, 그리고 관련된 가장 이른 만료 시점에서 계산된 제한된 `Retry-After`를 반환합니다. 일반적인 적격 후보 없음은 임대 경합이 아니며 기존 라우팅 오류 의미 체계를 유지합니다.

관련 메커니즘은 서로 분리된 상태로 유지됩니다.

- OAuth 세션 점유는 OAuth 계정에 대한 프로세스 로컬 소프트 분산입니다.
- 계정 세마포어는 요청 동시성 허가를 부여하며 요청이 완료되면 종료됩니다.
- 독점 관리형 세션 임대는 세대 경계를 갖는 지속적인 수명 주기 소유권입니다.

---

## 3. 모델 잠금

**범위:** 제공자 + 연결 + 모델 조합.

**상태별 키 범위:** 실패 상태에 따라 잠금이 기록되는 키가 결정됩니다
(`open-sse/services/accountFallback/exactModelLock.ts`의 `resolveLockoutScope()`):

- `429` / `403` / `402` — 할당량 또는 사용 권한 신호 — **할당량 계열**을 잠급니다:
  codex의 경우 해당 연결의 전체 `codex` / `spark` 범위(모든 `gpt-5*` 모델),
  그 외 제공자의 경우 `getQuotaScopedModelForProvider()`.
- `404`는 기본 모델을 잠급니다(`getModelLockKey()`가 `not_found` 범위를 좁힘).
- 그 외 모든 상태 — `5xx` 전송/서버 실패와 품질 검증에서 OmniRoute가 자체적으로
  생성한 `502` — 는 정확한 제공자/연결/모델 조합만 잠급니다. 한 모델의 잘못된
  스트림은 계정 할당량에 문제가 있다는 증거가 아닙니다. 이 규칙이 도입되기
  전에는 `codex/gpt-5.6-luna`에서 빈 응답이 한 번만 발생해도 해당 연결의 모든
  `gpt-5*` 모델이 할당량에는 아무런 문제가 없음에도 라우팅에서 2~30분 동안
  제외되었습니다(시간은 점차 증가).
- 호출자가 명시적으로 지정한 `scope` 옵션이 항상 우선합니다(Antigravity는 `"exact"`를 전달).

**목적:** 모델 하나만 사용할 수 없거나 할당량 제한에 걸렸을 때 전체 연결이 비활성화되는 것을 방지합니다.

**예시:**

- 모델별 할당량을 적용하는 제공자가 429를 반환하는 경우
- 로컬 제공자가 누락된 모델 하나에 대해 404를 반환하는 경우
- 제공자별 모드/모델 권한 실패(예: Grok 모드)

**구현:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### 모델 쿨다운 대시보드 (v3.8.0)

UI: 설정 → 모델 쿨다운 (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

활성 잠금을 제공자, 연결, 모델, 사유, expiresAt 정보와 함께 표시합니다. 운영자는 카드에서 모델을 수동으로 다시 활성화할 수 있습니다.

**REST API:**

- `GET /api/resilience/model-cooldowns` — 활성 잠금 목록 조회
- `DELETE /api/resilience/model-cooldowns` — 수동 재활성화. 본문: `{provider, connection, model}`. 인증: 관리 권한.

### 잠금 설정 UI + 성공 감쇠 복구 (v3.8.23)

모델 잠금은 항상 활성화된 하드코딩 동작에서 자체 설정 카드와 자가 복구 경로를
갖춘 완전히 구성 가능한 옵트인 기능으로 변경되었습니다.

**설정 카드:** 설정 → 모델 잠금
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
이는 위의 읽기 전용 `ModelCooldownsCard`(활성 잠금을 _나열_만 함)와
**별개**이며, 새 카드는 _매개변수를 구성_합니다. 기본값은
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`)에 정의되어 있습니다:

| 설정                    | 기본값                           | 의미                                                            |
| ----------------------- | -------------------------------- | --------------------------------------------------------------- |
| `enabled`               | `false`                          | 마스터 토글 — 모델 잠금은 **기본적으로 비활성화**되어 있습니다. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | 모델 범위 실패로 간주되는 업스트림 상태입니다.                  |
| `baseCooldownMs`        | `120_000` (120초)                | 첫 번째 실패에 적용되는 초기 잠금 시간입니다.                   |
| `maxCooldownMs`         | `1_800_000` (30분)               | 단계적으로 증가한 쿨다운의 상한입니다.                          |
| `maxBackoffSteps`       | `10`                             | 최대 지수 백오프 증가 단계 수입니다.                            |
| `useExponentialBackoff` | `true`                           | 반복되는 실패에 따라 쿨다운을 지수적으로 늘릴지 여부입니다.     |

설정은 일반 설정 저장소를 통해 유지되며 복원력 설정 스키마를 통해 검증됩니다.
카드는 `baseCooldownMs`/`maxCooldownMs`(`maxCooldownMs ≥ baseCooldownMs`)와
`maxBackoffSteps`를 허용 범위로 제한합니다.

**성공 감쇠 복구:** 복구는 단순히 타이머 만료에만 의존하지 **않습니다**. 정상
응답이 발생하면 모델의 실패 횟수가 점차 감소하므로, 기간 중간에 복구된 모델은
타이머가 만료되기 전에 증가가 멈추고 잠금이 해제됩니다. 조합 대상이 성공하면
`open-sse/services/combo.ts`가 `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`)를 호출하여 저장된
`failureCount`를 **절반으로 줄입니다**(`Math.floor(failureCount / 2)`).
값이 `0`에 도달하면 잠금 항목이 완전히 삭제됩니다. 이에 대응하는
`recordModelLockoutFailure()`는 증가 기간 내에 실패가 발생할 때 횟수를
증가시키고 쿨다운을 늘립니다. 이 성공 감쇠는 일반적인 타이머 만료에 더해
적용되며, 어느 경로를 통해서든 모델을 다시 활성화할 수 있습니다.

**상태:** 잠금은 DB에 유지되지 않고 **메모리 내**에 보관됩니다
(`provider:connectionId:model`을 키로 사용하는 프로세스별 `ModelLockoutEntry`
`Map`, 정확 범위 잠금은 `provider:connectionId:exact:model`을 키로 사용).
따라서 재시작하면 잠금이 사라집니다. _설정_은 유지되지만 활성 잠금 _상태_는
일시적입니다.

---

## 4. 할당량 공유 동시성 제어 (v3.8.36)

구독 계정(GLM, MiniMax 등)은 대개 약 1~3개의 동시 요청만 허용하며, 이를 초과하면 429 응답과 쿨다운이 발생합니다. 여러 API 키가 하나의 업스트림 계정을 공유하는 **할당량 공유**(`qtSd/…`) 콤보에서는 이 문제가 특히 심각합니다. 세 가지 계층을 통해 공유 계정에 요청이 과도하게 몰리는 것을 방지합니다.

### 연결별 동시성 상한 (`max_concurrent`)

각 공급자 연결은 `max_concurrent` 상한을 선언할 수 있습니다
(`provider_connections.max_concurrent`, 연결 모달/API/DB에서 설정).
제한을 두지 않으려면 비워 두십시오. 이 값은 아래 직렬화 계층을 제어하는 단일 설정입니다. 계정의 실제 동시성에 맞게 설정하십시오(예: GLM 약 1, MiniMax 약 2).

### 할당량 공유 요청 직렬화

할당량 공유 디스패치가 양수인 `max_concurrent`를 선언한 연결을 대상으로 할 경우, 해당 **계정**에 대한 동시 요청은 연결별 세마포어(키 `qsconn:<connectionId>`)를 통해 직렬화됩니다. 초과 요청은 계정에 한꺼번에 몰리는 대신 **대기열에서 기다립니다**. 이 기능은 **장애 시 개방(fail-open)** 방식으로 동작합니다. 즉, 대기열이 포화되거나 시간 초과가 발생하면 디스패치 가능한 요청을 거부하지 않고 슬롯 없이 진행합니다. **설정 → 복원력 → 할당량 공유 연결별 동시성**에서 전환할 수 있습니다(`resilienceSettings.quotaShareConcurrencyLimit.enabled`, 기본값은 활성화). `max_concurrent` 상한이 없으면 동작은 변경되지 않습니다.

> 할당량 공유 라우팅 게이트(`selectQuotaShareTarget`, DRR + P2C) 자체도
> 장애 시 개방 방식이며, 상한에 도달한 연결의 우선순위를 _낮추기만_ 합니다.
> 연결이 하나뿐인 풀에서는 엄격한 제한을 적용할 수 없으므로, 실제로 요청 폭주를
> 억제하는 것은 이 세마포어입니다.

### 쿨다운을 인식하는 콤보 재시도

모든 콤보 전략에서 이 기능이 활성화된 경우, 짧은 일시적 쿨다운으로 인해 429 응답이 확정될 요청은 429를 반환하는 대신 쿨다운이 끝날 때까지 기다린 후 다시 디스패치됩니다. 이는 다중 모델 콤보에서 Gemini 계열의 TPM/RPM 제한 시간대(약 60초의 retry-after)를 처리합니다. 예를 들어 2개 모델 콤보의 두 대상이 모두 모델별 속도 제한에 도달한 경우가 이에 해당합니다. **설정 → 복원력**의 `comboCooldownWait`(`enabled`, `maxWaitMs`, `maxAttempts`, `budgetMs`)에 의해 제한됩니다. `quota_exhausted`(자정까지 잠김) 또는 인증/찾을 수 없음 사유에는 절대 대기하지 않습니다.

---

## 5. 요청 큐 승인 제어 (v3.8.49 · 이슈 #6593)

**범위**: 위의 세 가지 메커니즘보다 한 계층 아래에 있는 로컬 provider+connection별 속도 제한 큐(`open-sse/services/rateLimitManager.ts`,
Bottleneck 기반).

**`maxWaitMs`는 큐 대기 시간을 제한하고, `executionMaxWaitMs`는 실행 시간을 제한합니다.**
이 둘은 의도적으로 분리되어 있으며, 어느 쪽도 다른 쪽에 영향을 주지 않습니다.

`resilienceSettings.requestQueue.maxWaitMs`는 **큐 대기 예산**입니다. provider 슬롯을 기다린 후 QUEUED 상태로 머무르는 시간을 포함하며, 작업이 QUEUED 상태를 벗어나 실행을 시작하는 순간 타이머가 해제됩니다
(`rateLimitManager.ts`, `wrappedFn`). 이 시간을 초과한 요청은 upstream에 도달하지 않습니다. 기본값은 30000ms이며, `src/lib/resilience/settings.ts`의 `DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`를 통해 제공되고
`tests/unit/ratelimit-admission-control-6593.test.ts`에서 고정되어 있으므로, 이 값을 변경하면 이 단락이 조용히 오래된 정보로 남는 대신 해당 테스트가 실패합니다.

`resilienceSettings.requestQueue.executionMaxWaitMs`는 Bottleneck이 작업의 `expiration`으로 받는 값이며, 이 타이머는 디스패치된 후에만 시작됩니다. 이는 자체 upstream 타임아웃이 없는 실행기를 위한 최후의 안전장치이며, 실행기 자체의 fetch 시작 타임아웃이 더 긴 경우에는 그 값으로 상향되므로 정상적으로 진행 중인 응답을 중간에 종료하지 않습니다. 기본값은 600000ms(10분)입니다.

큐 예산을 `expiration`에 전달하는 방식은 과거에 비증분형 게이트웨이를 실행 도중 종료하던 원인이었습니다. 해당 게이트웨이는 첫 바이트를 전송하기 전까지 정상적으로 수분 동안 실행될 수 있기 때문입니다. 이 때문에 expiration은 `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"`(HTTP 504)으로 노출되는 반면, 큐 예산에는 큐 타임아웃 코드가 사용됩니다. `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS`(환경 변수) 또는 대시보드
(**Settings → Resilience**)를 통해 각각 재정의할 수 있습니다. 둘 다 정규화 시 1ms–24h 범위로 제한됩니다.

**두 설정 모두에 적용되는 우선순위:** 환경 변수는 _기본값_만 제공합니다. `resilienceSettings.requestQueue`에 영속화된 값(대시보드/API 패치, `key_value`에 저장됨)이 환경 변수보다 우선하며, connection별
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs`가 그보다 우선합니다. 따라서 이미 영속화된 값이 있는 배포 환경에서 환경 변수를 설정해도 아무것도 변경되지 않습니다. 대신 영속화된 설정을 지우거나 업데이트해야 합니다.

큐 체류 시간은 `maxWaitMs`로 제한되며, 아래의 `maxQueueDepth`는 동시에 큐에 대기할 수 있는 호출자 수를 제한합니다.

**`maxQueueDepth` — 옵트인 승인 한도(신규).** `resilienceSettings.requestQueue.maxQueueDepth`는 하나의
provider+connection에 대해 아직 디스패치되지 않은 채 큐에서 대기할 수 있는 요청 수를 제한합니다. 큐에 이미 `maxQueueDepth`개의 요청이 있으면 새 요청은 `limiter.schedule()`에 도달하기 **전에** 타입이 지정된
`code: "RATE_LIMIT_QUEUE_FULL"` 오류와 함께 즉시 거부됩니다. 따라서 거부 비용이 적고, 해당 요청에 대한 downstream 프롬프트 압축/번역 작업보다 먼저 처리됩니다. 기본값 `0`은 비활성화를 의미하며 기존의 무제한 큐 동작을 유지합니다. 허용 범위는 0–100000입니다.
`RATE_LIMIT_MAX_QUEUE_DEPTH`(환경 변수) 또는
`resilienceSettings.requestQueue.maxQueueDepth`(대시보드/API 패치)를 통해 재정의할 수 있습니다.

승인 검사 자체는 순수 함수
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`)이므로 실제 Bottleneck limiter 없이 단위 테스트할 수 있습니다.

> #6593을 시작한 RFC에서는 `bypassCompressionOnRateLimit`
> 플래그도 제안했습니다. 이 저장소의 `open-sse/services/compression/` 파이프라인은
> 합성된 429 응답 본문의 HTTP 응답 압축이 아니라 outbound LLM 요청의 프롬프트/컨텍스트 압축(`chatCore.ts`의
> `resolveCompressionSettings`/`selectCompressionStrategy` 블록 주변)을 담당하므로, 문자 그대로의 우회 플래그에 대응하는
> 코드 경로가 없습니다. 또한 해당 프롬프트 압축 단계는 현재 요청 파이프라인에서 `withRateLimit()`보다 _먼저_ 실행되므로,
> 큐 가득 참으로 인한 거부 시 이 단계를 건너뛰도록 순서를 변경하는 작업은 이 이슈의 범위보다 별개의 더 큰 변경입니다. 이는 의도적으로
> 여기에서 구현하지 않았으며, CPU 절감 효과가 순서 변경의 위험을 감수할 가치가 있다면 후속 작업으로 남겨 두었습니다.

---

## 6. 저속 스트림 처리량 감시기 (#9709)

선택적 `resilienceSettings.streamRecovery.throughputWatchdog` 보호 기능은
업스트림이 계속 청크를 전송하고 있지만 구성된 유효 출력 속도보다 낮은 속도로
어시스턴트 출력을 생성하는 상황을 감지합니다. 이 기능은 유휴 시간 제한과 의도적으로
구분됩니다. 하트비트와 메타데이터는 어느 타이머도 초기화하지 않으며 진행으로
간주되지 않습니다. 또한 하드 시도 기한(#9153)과도 구분되며, 하드 시도 기한은 출력
품질과 관계없이 절대적인 안전 상한으로 유지됩니다.

감시기가 중단을 수행하려면 준비 기간이 지난 후 완전한 롤링 윈도우가 경과해야
합니다. Chat Completions 및 Responses API 출력 이벤트의 텍스트 델타를
계산하고(보수적인 UTF-8 바이트 근삿값), 사용량 전용 이벤트와 빈 이벤트는 무시하며,
도구 호출 또는 추론 이벤트가 진행 중인 동안에는 판단을 보류합니다. 기본적으로
비활성화되어 있으며 `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`로 활성화할 수 있습니다.
윈도우, 준비 기간, 최소 속도 및 측정 가능한 최소 출력은 일반적인 복원력 설정
정규화 계층의 범위 제한을 적용받습니다.

활성화된 경우 감시기 중단은 활성 업스트림 시도에만 적용됩니다. 클라이언트에 보이는
바이트가 전송되기 전이라면 기존의 동일 계정 조기 복구 경로에서 시도를 다시 열 수
있습니다. 커밋 후에는 스트림을 무조건 재생하지 않으며, 기존의 안전한 스트림 중간
이어가기 계약만 접미부를 연결할 수 있습니다. 최종화는 계속 한 번만 수행되므로
사용량 계산과 세마포어 해제가 중복되지 않습니다.

---

## 7. 업스트림 상태 재지정(잘못 표시된 할당량 오류)

**범위:** 일시적인 할당량 소진을 잘못된 HTTP 상태로 보고하는 하나의 업스트림 게이트웨이.

**목적:** 분류 전에 오해의 소지가 있는 상태를 수정하여 다운스트림 소비자(폴백 엔진, 콤보 집계, 클라이언트 대상 응답)가 실패의 실제 재시도 가능 특성을 인식하도록 합니다.

일부 게이트웨이는 일시적인 할당량 소진을 재시도할 수 없는 HTTP
상태로 알립니다. `agentrouter.org`는 표준 `429` 대신 중국어 본문
(`用户额度不足` / `额度不足`)과 함께 `403`(때로는 `400`)을 반환합니다. Claude
Code 같은 클라이언트는 `403`을 영구 오류로 간주하여 세션을 중단하며, 수정하지 않으면
폴백 엔진은 이를 할당량 이벤트가 아닌 `AUTH_ERROR`로 분류합니다.

**구현:**

- 레지스트리 + 매처: `open-sse/config/upstreamStatusRestatement.ts` — 공급자별
  규칙 목록(`{id, fromStatuses, toStatus, textMarkers,
excludeMarkers, defaultRetryAfterMs}`)이며, `applyStatusRestatement()`를 통해 매칭됩니다.
- 호출 위치: `open-sse/handlers/chatCore.ts`의 `providerFailure:` 블록
  (약 3654번째 줄)으로, `parseUpstreamError()`가 오류 HTTP 상태
  (`!providerResponse.ok`)의 업스트림 응답을 파싱한 직후이자 모든
  분류가 실행되기 전입니다. 따라서 모든 다운스트림 소비자가 수정된
  상태를 확인합니다. `200` SSE 스트림 안에 포함된 오류는 별도의
  후속 스트림 파싱 경로를 따르며 현재 이 훅의 적용 대상이 **아닙니다**. 이는
  알려진 제한 사항이지만, 오류 HTTP 상태로 표면화되는 agentrouter의 잘못된 상태에는
  아직 필요하지 않습니다.
- 재시도 적격성: `429`는 `RETRY_AFTER_ELIGIBLE_STATUSES`
  (`open-sse/services/combo/unavailableRetryGate.ts`)에 포함되어 있으므로 재지정된 오류에는
  무효한 `403`으로 노출되는 대신 실제 재시도 윈도우가 적용됩니다.
- 합성된 `60s` `defaultRetryAfterMs`(`upstreamStatusRestatement.ts`)는 재지정된 응답이
  **클라이언트**에 알려주는 값일 뿐이며, 연결의 내부 쿨다운/잠금 기간 자체가 아닙니다.
  내부 기간은 재지정된 오류를 실제로 처리하는 메커니즘에 의해 별도로 관리됩니다
  (Connection Cooldown의 단계적 백오프, §2, API 키 공급자의 기본값 `3s`;
  또는 agentrouter 같은 모델별 할당량 공급자를 위한 Model Lockout, §3).
  라우터는 클라이언트에 알린 60초 윈도우보다 더 일찍 내부적으로 재시도 가능 상태가
  될 수 있습니다. 이는 의도적인 여유분이지 버그가 아닙니다.

영구 오류(agentrouter의 `无权访问模型` — 이 모델에 접근할 수 없음)는
절대로 재지정되지 않습니다. `textMarkers`가 일치하더라도 `excludeMarkers`가 규칙을
거부하므로 오류는 원래 상태를 유지하며 어떠한 요소도 이를 무한히 재시도하지 않습니다.
이에 대응하는 공급자 분류 규칙
(`open-sse/config/providerErrorRules.ts`의 `agentrouter-model-access-denied`:
`reason: "auth_error"`, `scope: "model"`, 선언된 `6h` 기본 쿨다운)은
`checkFallbackError`(`open-sse/services/accountFallback.ts`)가 일반적인
apikey 범주의 `FORBIDDEN` 조기 반환보다 _먼저_ 참조하며,
`honorsRuleLockScope(provider)`를 조건으로 합니다(#10334 — 현재
`providerErrorRules.ts`의 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 허용 목록을 통해
agentrouter에만 적용됨). 규칙에 선언된 6시간 쿨다운은
`fallbackResult.baseCooldownMs`로 전달되지만, 여전히 기존의
모델별 할당량 잠금 경로(`lockModelIfPerModelQuota()` /
`recordModelLockoutFailure()`, 쿨다운 출처를 제외하면 #10334에서 변경되지 않음)에
입력됩니다. 다른 모든 모델 잠금과 마찬가지로 운영자의 `mlSettings.maxCooldownMs`
(기본값 `1_800_000ms` / 30분)로 하향 제한되며,
_영구 저장되는 잠금 사유_는 규칙의 `"auth_error"`가 아니라 기존에 하드코딩된
`"forbidden"`으로 유지됩니다. 즉, 사유 문자열이 아닌 쿨다운 기간만 종단 간
적용됩니다. 연결 자체는 활성 상태로 유지되며, 동일한 연결의 다른 모델에는
영향을 주지 않습니다.

재진술된 할당량 오류(`额度不足`)는 프로덕션에서 공급자 규칙과 일치합니다
(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope:
"connection"`, 자체적으로 선언된 쿨다운 없음 — 지속성 계층의 축소된 백오프
기본값이 적용됨). #10334 이후 `ProviderErrorRuleMatch`의 `scope`는
엔드 투 엔드로 실제 사용되지만, `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
허용 목록에 있는 공급자에 대해서만 적용됩니다(`providerErrorRules.ts` —
현재는 `"agentrouter"`만 해당하며 `honorsRuleLockScope()`를 통해 제한됨).
그 외 모든 공급자에서 `scope`는 #10334 이전과 똑같이 정보 제공용으로만
유지됩니다. `checkFallbackError`는 일치한 규칙의 범위를
`fallbackResult.ruleScope`로 노출하며, `isAgentrouterConnectionQuotaScope()`
(`src/sse/services/auth.ts`)는 `ruleScope`가 연결 전체에 적용되면서 자체
복구되는 신호로 처리해도 실제로 안전한지 확인하는 공유 가드입니다
(범위 `"connection"`, 사유 `quota_exhausted`, 절대로 `permanent`가 아니고,
절대로 `creditsExhausted`가 아님 — 향후 어떤 규칙이 범위
`"connection"`을 영구적인 계정 상태와 연결할 경우를 막기 위한 방어).
두 소비자가 이를 호출합니다:

- **지속성** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  패스스루 공급자의 **모델별** 잠금 분기로 빠지는 대신
  (agentrouter는 `passthroughModels: true`이므로 → `hasPerModelQuota()`가
  `true`를 반환함), **임시 연결 쿨다운**을 적용합니다 —
  `testStatus: "unavailable"` + `rateLimitedUntil`이며, 종료 상태
  (`credits_exhausted`/`banned`/`expired`)는 절대 적용하지 않습니다.
  따라서 쿨다운이 끝나면 수동으로 자격 증명을 재설정할 필요 없이 연결이
  자체 복구됩니다. `disableCooling: true`인 연결에서는 건너뜁니다(#2997).
  이 옵트아웃의 경우 대신 모델별 잠금으로 넘어갑니다(문서화된 절충안이며,
  해당 분기 위의 코드 주석 참조).
- **동일 요청 콤보 라우팅** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): 동일한 가드가 연결을
  `${provider}:${connectionId}` 키로 인메모리 `exhaustedConnections`
  집합에 표시합니다. 이는 자체 대상 객체에 정확히 같은 `connectionId`가
  이미 지정되어 있는 나머지 동일 요청 대상만 건너뜁니다
  (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`,
  `if (provider && connectionId)`가 `exhaustedConnections` 조회보다 먼저
  실행됨). 형제 대상에 고정된 자체 `connectionId`가 없고 응답의
  `X-OmniRoute-Selected-Connection-Id` 헤더를 통해 디스패치별로 하나가
  해석될 뿐인 일반 모델 목록 콤보는 해당 키와 절대 일치하지 않습니다.
  이 일반적인 경우, 나머지 구간이 방금 소진된 계정을 재사용하지 못하게
  하는 실질적인 보호 장치는 이 Set이 **아닙니다**. 그 역할은 위의 지속성
  계층(이제 연결의 `rateLimitedUntil`이 미래 시점으로 설정됨)과, 동일한
  가드가 해당 실패에 대해 `transientRateLimitedProviders`를 억제하는
  동작을 결합하여 수행합니다("2단계 설계" 및
  `targetExhaustion.ts`의 `isAgentrouterConnectionQuotaScope` 분기에 있는
  코드 주석 참조). 해당 Set이 표시되지 않은 상태에서는 `combo.ts`의
  `allowRateLimitedConnection` 강제 허용
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`)이 공급자의 나머지
  구간에 대해 작동하지 않습니다. 따라서 자격 증명 선택의
  `rateLimitedUntil` 필터(`src/sse/services/auth.ts:1238`)가 정상적으로
  적용되고, 나머지 구간은 아직 사용 가능한 다른 agentrouter 연결을
  선택하거나 사용 가능한 자격 증명이 없어 실패합니다. 이 분기가 방금
  쿨다운한 연결로 강제로 되돌아가지는 않습니다.

### 2단계 설계: 상태 재진술 후 분류

상태 재진술(`upstreamStatusRestatement.ts`)과 공급자 분류 규칙
(`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`)은 둘 다
공급자 ID와 텍스트 마커를 키로 사용하는 별도의 레지스트리이지만,
서로 다른 위치에서 실행되며 목적도 다릅니다. 재진술은
`chatCore.ts`의 초기에 HTTP 상태를 다시 작성하고, 분류 규칙은
`checkFallbackError()` 내부에서 폴백 `reason`과 잠금 `scope`
(`model` / `provider` / `connection`)를 선택합니다
(`open-sse/services/accountFallback.ts`).

분류 규칙은 `providerErrorRules.ts`의 `FULL_TEXT_RULE_PROVIDERS` 허용
목록에 나열된 공급자에 대해서만 전체 오류 **텍스트**를 확인합니다
(`额度不足` 같은 본문 마커와 일치시키는 데 필요함). 현재는
`"agentrouter"`만 해당합니다. 그 외 모든 **기본 제공 카탈로그**
공급자에 대해 `checkFallbackError`는 구조화된 오류(`{code, type}`)만
`getProviderErrorRuleMatch`에 전달합니다. 이는 헤더/상태/코드 기반 규칙에는
충분하지만 본문 텍스트 마커는 확인할 수 없습니다.
`resolveRuleMatchBody()` 도우미가 이 선택을 수행합니다. 허용 목록에 있는
공급자에는 전체 오류 텍스트를 사용하고, 그렇지 않은 경우에는 구조화된
오류를 사용합니다. **기본 제공** 공급자를 `FULL_TEXT_RULE_PROVIDERS`에
추가하는 것은 공급자별 명시적 옵트인입니다. 이 목록에 없는 모든 공급자의
기본 경로가 바이트 단위까지 변경되지 않은 상태로 유지되도록 하기 위해
존재합니다.

규칙의 `scope` (`model` / `provider` / `connection`)는
`FULL_TEXT_RULE_PROVIDERS`와 별개인 옵트인입니다. `checkFallbackError`는
이를 `fallbackResult.ruleScope`로만 노출하며, 다운스트림 소비자는 같은
파일의 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 허용 목록에 포함된 공급자에
대해서만 이를 정보 제공용 레이블 이외의 용도로 처리합니다
(`honorsRuleLockScope()`를 통해 제한됨 — 현재는 `"agentrouter"`만 해당).
공급자가 해당 허용 목록에 포함된 후 `scope: "connection"` 일치가 실제로
어떤 동작을 하는지는 위의 "재진술된 할당량 오류"를 참조하십시오.

**#11104 — 운영자가 선언한 규칙은 두 허용 목록을 모두 우회합니다.** 운영자는 이 파일을
수정하지 않고도 `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)를 통해
런타임에 공급자별 규칙을 선언할 수 있습니다. 내장 카탈로그 규칙의 **기본** 동작을
보호하기 위한 허용 목록인
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` 뒤에 운영자 규칙을
게이팅하면, 규칙 선언 자체가 이미 운영자의 명시적인 옵트인이므로 해당 설정 메커니즘은
그 목록에 이미 포함된 공급자를 제외한 모든 공급자에서 작동하지 않게 됩니다.
`resolveRuleMatchBody()`와 `honorsRuleLockScope()`는 둘 다
`hasOperatorRuleForProvider()`를 먼저 확인합니다. 운영자 규칙이 있는 공급자는 두 허용
목록 중 어느 쪽에 포함되어 있는지와 관계없이 원시 오류 텍스트를 전달받고, 선언된
`scope`가 적용됩니다.

**알려진 공백 — HTTP 400에서는 `providerRuleRegistry`가 전혀 참조되지 않습니다.**
`checkFallbackError`의 `BAD_REQUEST` 분기는 상태 400을 자체 패턴 배열
(`accountFallback.ts`의 `MODEL_ACCESS_DENIED_PATTERNS`,
`CONTEXT_OVERFLOW_PATTERNS` 등)만으로 분류한 후, 그 위의
`configuredRule`/`getProviderErrorRuleMatch` 분기에 도달하기 전에 반환합니다.
`status: 400`이 지정된 내장 카탈로그 규칙(또는 운영자 규칙)은 구문상 유효하지만 절대
발동하지 않습니다. 현재 400을 대상으로 하는 기존 규칙은 없으므로 프로덕션에는 아무런
영향이 없습니다. 그러나 향후 400 규칙을 추가하려면 먼저 이 분기를 수정해야 하며, 이는
규칙 하나를 추가하는 것보다 더 큰 변경입니다(이미 패턴 배열 동작에 의존하는 모든
공급자의 400 분류를 변경함). 따라서 단일 공급자 규칙 추가의 범위를 벗어납니다.

### 할당량을 잘못 표시하는 새 게이트웨이 추가

1. `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`)에 규칙 배열 하나를 등록합니다.
   `textMarkers`는 공급자별로 유지하며,
   `CREDITS_EXHAUSTED_SIGNALS` (`open-sse/services/accountFallback.ts`)와 충돌하는
   일반적인 영어 문구를 절대 재사용하지 마세요.
2. 올바른 잠금 범위(계정 전체 할당량에는 `connection`, 모델별 오류에는 `model`)를
   선택하려면 필요에 따라
   `open-sse/config/providerErrorRules.ts`의 `providerRuleRegistry`에 분류 규칙을
   등록합니다. 이 단계는 전체 오류 텍스트(본문 마커)가 필요한 공급자의 규칙에 대해서는
   다음 조건을 충족해야만 프로덕션에서 효력이 있습니다. 같은 파일의
   `FULL_TEXT_RULE_PROVIDERS`에 공급자 id를 추가하세요. 그렇지 않으면
   `checkFallbackError`는 구조화된 `{code, type}` 오류만 규칙에 전달하므로 본문 텍스트
   규칙은 실제 트래픽에서 절대 일치하지 않습니다. Opencode나 Minimax의 규칙처럼
   `status`/`headers`만으로 일치하는 규칙에는 이 옵트인이 필요하지 않습니다. 이와
   별개로, 규칙이 `scope: "connection"`을 선언하고 실제 의도가 단순한 정보성 레이블이
   아니라 실질적인 연결 전체 쿨다운과 동일 요청 내 조합 건너뛰기라면, 같은 파일의
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS`에 공급자 id를 추가하세요. 이 목록은
   `markAccountUnavailable()` (`src/sse/services/auth.ts`) 및
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)에서
   `isAgentrouterConnectionQuotaScope()` 방식의 소비를 게이팅합니다. 이 목록에 없으면
   `scope`는 여전히 `fallbackResult.ruleScope`를 통해 전달되지만 아무 로직도 이에 따라
   동작하지 않습니다.
3. `tests/unit/upstream-status-restatement.test.ts`와
   `tests/unit/agentrouter-error-rules.test.ts`를 본뜬 단위 테스트를 추가합니다
   (`not-permanent` / `not-creditsExhausted` 가드 포함). 또한 공급자에 허용 목록이
   필요하다면 `resolveRuleMatchBody()`가 해당 공급자에 대해서만 전체 텍스트를 반환하는지
   검증하는 테스트도 포함합니다.

`chatCore.ts`, `classifyError` 또는 combo는 변경할 필요가 없습니다.

#### 이그레스 버킷 기반 잠금(#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`에 속한 공급자(opencode 계열)는 IP 버킷 기반
업스트림으로 취급됩니다(opencode 무료 티어는 계정 버킷 기반이 아니라 IP 버킷
기반입니다. #9611 참조). `quota_exhausted` **또는** `rate_limit_exceeded`로 분류된
상태 429는 로테이션이 다른 연결을 시도하기 전에, 마지막으로 알려진 이그레스 IP가 실패한
연결의 IP와 일치하는 허용 목록 계열의 모든 연결을 쿨다운합니다. 이를 통해 실패가
보장된 N-1회의 업스트림 호출을 방지합니다(#10460/#10525와 동일한 형태).
`rate_limit_exceeded`는 의도적으로 포함되었습니다. `markAccountUnavailable` 경로에서는
opencode 전용 규칙이 절대 일치하지 않기 때문입니다(`checkFallbackError`에
headers/body가 전달되지 않고 opencode가 `FULL_TEXT_RULE_PROVIDERS`에 포함되지 않음).
따라서 본문에 구독 할당량 텍스트("monthly usage limit reached")가 포함된 429는
`status_429` 규칙에 도달하기 전에 할당량 텍스트 폴백
(`buildSubscriptionQuotaFallback`, `accountFallback.ts`; 1시간 쿨다운)에 의해
`quota_exhausted`로 분류됩니다. 반면 할당량 텍스트가 없는 429(일반적인 속도 제한)는
`status_429` 규칙을 통해 `rate_limit_exceeded`로 분류되며, 이 경우에도 해당 IP 계열
전체가 쿨다운됩니다. 허용 목록에 포함된 공급자에서는 IP 버킷 기반 속도 제한이 할당량
소진과 동일한 신호입니다. 명시적인 한계:

- **최선형(best-effort)**: 잠금은 `proxy_logs`에서 연결의 마지막으로 알려진 `egress_ip`를
  확인합니다(24시간 범위, 동기식, 캐시 없음). 콜드 캐시(송신
  IP가 한 번도 탐지되지 않음)이거나 행이 없는 경우에도 → 실패한 연결은 해당
  분기에 의해 계속 쿨다운되며(현재와 동일하게 기록됨), 형제 연결만 잠기지 않습니다.
- **절대 종결 상태가 아님**: 쿨다운은 갱신되는 할당량 기간입니다
  (`testStatus: "unavailable"`). IP 수준 신호로부터 영구 상태를 도출하지
  않습니다. `disableCooling` 연결은 이 분기를 완전히 건너뜁니다.
- **허용 목록에 포함된 계열의 잠금 세분성이 변경됨**: 이는 단순한 형제 연결
  최적화가 아니라 범위 변경입니다. opencode는 `passthroughModels`
  제공자이므로, 이 분기 이전에는 429로 인해 모델별 잠금이 발생했지만 이제는
  연결 쿨다운이 발생합니다. 이는 형제 연결 없이 단일 연결만 운영하는 경우도
  포함합니다. 이 세분성은 opencode 규칙 테이블에서 이미 올바른 것으로 선언되어
  있었지만(`scope: "connection"`,
  `providerErrorRules.ts`), opencode가
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`에 포함되지 않아 지금까지 적용된 적이
  없습니다. 이 분기는 연결 범위의 agentrouter 분기를 그대로 따라 실패한
  연결의 쿨다운과 `backoffLevel`을 직접 기록한 후 반환합니다. 따라서 아래의
  모델별 차단과 일반 경로에는 절대 도달하지 않습니다.
- **콤보 포함**: agentrouter 분기와 마찬가지로, 이 범위는 콤보 호출자가 429에
  적용하는 `persistUnavailableState`/`isCombo` 강등을 의도적으로
  무시합니다. 모델별 잠금은 이 범위의 더 약한 형태가 아니라 잘못된 단위입니다.
  소진된 IP에 관해 아무것도 나타내지 않으므로, 콤보 순환은 형제 연결마다 실패가
  보장된 호출을 하나씩 계속 소모하게 됩니다.
- **형제 연결 안전성**: 이미 종결 상태(banned/credits_exhausted)이거나 더 긴
  쿨다운 상태인 형제 연결은 절대 덮어쓰지 않습니다.
- **독점적 허용 목록**: `EGRESS_BUCKETED_LOCK_PROVIDERS` 확장은 명시적인
  소유자 결정이며, 일반적인 배선이 아닙니다(패턴 #10334/#10419). 형제 연결
  쿼리는 동일한 허용 목록을 SQL 리터럴로 반복하지 않고 바인딩하므로, 목록 확장은
  한 줄만 변경하면 됩니다.
- **양방향 송신 IP 순환**: 조회 범위(24시간)는 송신 IP 캐시 TTL(5분)보다
  훨씬 길기 때문에 "마지막으로 알려진 IP"는 현재 상태가 아니라 이력입니다.
  연결의 프록시가 해당 범위 내에서 순환된 경우 잠금이 실제로 공유되는 IP를
  **놓칠 수 있습니다**(기록된 IP가 소진되지 않은 새 IP이기 때문). 반대로,
  소진된 IP에서 이미 다른 IP로 **순환된 형제 연결을 쿨다운할 수도 있습니다**.
  후자의 경우 해당 형제 연결은 쿨다운 기간 하나만큼 비용을 치릅니다. 두 경우
  모두 이력 기반 조회에서 허용되는 최선형 한계입니다.
- **비용**: `proxy_logs`에 대한 두 번의 제한된 스캔
  (`idx_pl_timestamp`를 통해 기간 필터링)이며, 429 발생 빈도에서만
  수행됩니다. 새 인덱스는 추가하지 않습니다(마이그레이션 134 YAGNI).
  중간 규모의 실제 트래픽 DB 복사본에서 측정했습니다. 처리량이 높은 인스턴스는
  동일한 기간에 비례하여 더 많은 행을 보유합니다.

---

## 기타 복원력 기능

- **19가지 라우팅 전략**(priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, headroom, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md)를 참조하세요.
- **재설정 인식 라우팅**(v3.8.0) — 할당량 재설정 시간을 기준으로 연결의 우선순위를 지정합니다.
- **백그라운드 모드 성능 저하 처리** — Responses API의 `background: true`를 경고와 함께 동기 모드로 전환합니다.
- **동적 도구 제한 감지** — 도구 개수 제한에 도달하면 공급자에 대한 요청을 줄입니다.
- **긴급 폴백** — `OMNIROUTE_EMERGENCY_FALLBACK`으로 제어되며, 운영자는 재시작 없이 Feature Flags 페이지에서 이를 재정의할 수 있습니다.

---

## 디버깅

- 가중치 기반 콤보가 `503 all_targets_cooling_down`으로 응답함(`Retry-After`가 설정되고, `diagnostics.excluded`에 모든 대상이 `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`과 함께 나열됨) → 풀이 구성 및 연결되어 있지만, 모든 대상이 복원력 타이머에 의해 제외된 상태입니다. `[COMBO] Weighted selection: every target excluded before dispatch — …` 경고에 제외 이유와 남은 시간(초)이 표시됩니다. 동일한 콤보에서 발생하는 `404 no_executable_targets`는 복원력 타이머가 관여하지 않았음을 의미합니다(실행할 대상이 없거나 모든 계정이 가용성 프로브에 실패함). `targetResolution.ts`에서 수집된 제외 항목을 기반으로 `open-sse/services/combo/pinRecovery.ts`에 구현되어 있습니다.
- 특정 제공자의 모든 키가 건너뛰어짐 → 회로 차단기 상태와 각 연결의 `rateLimitedUntil`/`testStatus`를 모두 확인하세요.
- 재설정 기간 이후에도 제공자가 영구적으로 제외됨 → 코드가 `getStatus()`/`canExecute()` 대신 원시 `state`를 읽는지 확인하세요.
- 하나의 키가 실패해도 다른 키는 작동해야 함 → 회로 차단기보다 연결 쿨다운을 우선하세요.
- 하나의 모델만 실패함 → 연결 쿨다운보다 모델 잠금을 우선하세요.
- 상태가 자동으로 복구되어야 하지만 복구되지 않음 → 미래 타임스탬프와 만료된 상태를 새로 고치는 읽기 경로를 확인하세요. 영구 상태는 수동으로 변경해야 합니다.

---

## TLS 핑거프린팅 및 스텔스

공급자별 스텔스(JA3/JA4, CCH, 난독화)는 별도로 문서화되어 있습니다. `docs/security/STEALTH_GUIDE.md`를 참조하세요(git에만 있으며 `/docs`에는 컴파일되지 않음).

---

## 복원력 테스트(Phase 8 · Block C)

복원력 로직의 단위 테스트 외에도 실제 스트레스/장애 조건에서 런타임을
검증하는 세 가지 테스트가 있습니다(모두 통합/야간 테스트이며 PR을 차단하지 않음).

| 테스트       | 내용                                                                                                                                                                      | 실행                                  |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| 카오스       | 가짜 업스트림 노드가 실제 지연/재설정/타임아웃/503을 주입하며, 회로 차단기가 열리고 복구되는지와 `checkFallbackError`가 503을 복구 가능한 폴백으로 분류하는지 검증합니다. | `RUN_CHAOS_INT=1 npm run test:chaos`  |
| 힙 증가      | `--expose-gc` 환경에서 `createSSEStream`당 약 500개의 스트림을 생성하며, 힙이 상한을 초과하여 증가하면 실패합니다(OOM 보호 #3069).                                        | `npm run test:heap`                   |
| k6 장기 부하 | `/api/monitoring/health`에 지속적인 부하를 가하며 p95/오류 임계값을 검증합니다.                                                                                           | `k6 run tests/load/k6-soak.js` (야간) |

`.github/workflows/nightly-resilience.yml`에서 오케스트레이션됩니다(cron + dispatch). 기본
`test:integration`에서는 chaos와 heap이 자체적으로 건너뜁니다(`RUN_CHAOS_INT`/`--expose-gc`가 없는 경우).

---

## 참고 항목

- [아키텍처 가이드](./ARCHITECTURE.md) — 시스템 아키텍처 및 내부 구조
- [사용자 가이드](../guides/USER_GUIDE.md) — 프로바이더, 콤보, CLI 통합
- [자동 콤보 엔진](../routing/AUTO-COMBO.md) — 16개 요소 기반 점수 산정, 모드 팩
