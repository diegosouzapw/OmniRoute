# Resilience Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/RESILIENCE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/RESILIENCE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/RESILIENCE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/RESILIENCE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/RESILIENCE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/RESILIENCE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/RESILIENCE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/RESILIENCE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/RESILIENCE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/RESILIENCE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/RESILIENCE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/RESILIENCE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/RESILIENCE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/RESILIENCE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/RESILIENCE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/RESILIENCE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/RESILIENCE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/RESILIENCE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/RESILIENCE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/RESILIENCE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/RESILIENCE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/RESILIENCE_GUIDE.md)

---

OmniRoute에는 서로 구별되지만 관련된 세 가지 복원력(resilience) 메커니즘이 있습니다. 각각의 범위와 목적이 다릅니다. 라우팅 동작을 디버깅할 때는 이들을 구분해서 생각하세요.

![3-layer resilience model](../diagrams/exported/resilience-3layers.svg)

> 출처: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd)

## 1. 프로바이더 서킷 브레이커

**범위:** 프로바이더 전체(예: `glm`, `openai`, `anthropic`).

**목적:** 업스트림/서비스 수준에서 반복적으로 실패하는 프로바이더로의 트래픽 전송을 중단합니다.

**구현:**

- 핵심 클래스: `src/shared/utils/circuitBreaker.ts`
- 연결 지점: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- 상태 API: `GET /api/monitoring/health`
- 리셋 API: `POST /api/resilience/reset`
- 래퍼: `open-sse/services/accountFallback.ts`
- DB 테이블: `domain_circuit_breakers`

**상태:**

- `CLOSED` — 정상 트래픽 허용
- `DEGRADED` — 트래픽은 여전히 허용되지만, 프로바이더 실패 증가가 추적되고 있는 상태. 충분한 성공이 누적되거나, 유효한 연결 테스트가 통과되거나, 마지막 실패 유형에 대한 가장 긴 `OPEN` 유지 시간(해당 `cooldownByKind` 값, 없으면 `resetTimeout`에 `maxBackoffMultiplier`를 곱한 값, 최소 한 번의 쿨다운) 동안 새로운 실패 없이 경과하면 `CLOSED`로 복귀
- `OPEN` — 프로바이더가 일시적으로 차단됨. 콤보 라우팅에서 건너뜀
- `HALF_OPEN` — 리셋 타임아웃이 경과됨. 프로브 요청 허용

**설정 가능한 기본값(`open-sse/config/constants.ts`, Dashboard → Settings → Resilience에서 노출됨):**

| 클래스  | Degraded 진입 | Open 진입 | 리셋 타임아웃 |
| ------- | ------------- | --------- | ------------- |
| OAuth   | 5회 실패      | 8회 실패  | 60초          |
| API-key | 7회 실패      | 12회 실패 | 30초          |
| Local   | 파생됨        | 2회 실패  | 15초          |

`degradationThreshold`는 프로바이더가 `DEGRADED`로 진입하는 시점을 제어하고, `failureThreshold`는 프로바이더가 열리고(open) 건너뛰어지는 시점을 제어합니다. Local 프로바이더 프로필은 아직 Resilience 설정 페이지에 노출되지 않습니다.

**트립 코드:** 프로바이더 수준 상태 코드 `[408, 500, 502, 503, 504]`에서만 트립됩니다. 계정 수준 오류(대부분의 401/403/429 — 이들은 쿨다운 또는 잠금에 해당)에서는 트립되지 **않습니다**.

**지연 복구(lazy recovery):** `OPEN` 상태가 만료되면 `getStatus()`, `canExecute()`, `getRetryAfterMs()` 호출이 상태를 `HALF_OPEN`으로 갱신합니다. 동일한 읽기 호출(그리고 다음 실패)은 오래된 `DEGRADED` 상태를 `CLOSED`로 감쇠시킵니다. 백그라운드 타이머가 필요 없습니다.

---

### 옵트인 전역 프로바이더 쿨다운 (윈도우 게이트)

네 번째 **옵트인** 계층(`PROVIDER_COOLDOWN_ENABLED`, 기본값 **off**)은 실패한 프로바이더에 대한 요청 간 메모리를 `open-sse/services/providerCooldownTracker.ts`에 유지하며, 콤보 대상 결정(combo target resolution)에서 참조되어 연속적인 콤보 요청이 방금 실패한 프로바이더를 다시 탐색하지 않도록 합니다. 프로바이더 수준 항목은 `PROVIDER_PROFILES` 윈도우 게이트를 따릅니다:

| 프로필  | 트립 조건 (`providerFailureThreshold`) | 윈도우 (`providerFailureWindowMs`) | 쿨다운 (`providerCooldownMs`) |
| ------- | -------------------------------------: | ---------------------------------: | ----------------------------: |
| OAuth   |                                   `10` |                            `15min` |                        `5min` |
| API key |                                   `15` |                            `30min` |                       `10min` |

임계값 미만에서는 프로바이더가 쿨다운 중으로 간주되지 **않으며**, 성공하면 윈도우가 초기화됩니다. 연결 수준 항목(`provider:connectionId`)은 대신 지수적 `minRetryCooldownMs → maxRetryCooldownMs` 백오프를 유지합니다. 재정의: `OMNIROUTE_PROVIDER_BREAKER_{OAUTH,API_KEY}_{FAILURE_THRESHOLD,FAILURE_WINDOW_MS,COOLDOWN_MS}`.
회귀 방지 테스트: `tests/unit/provider-cooldown-window-gate.test.ts`.

## 2. 연결 쿨다운

**범위:** 단일 프로바이더 연결/계정/키.

**목적:** 같은 프로바이더의 다른 연결은 계속 서비스를 제공하는 동안 문제가 있는 키 하나만 건너뜁니다.

**구현:**

- 사용 불가 표시: `src/sse/services/auth.ts::markAccountUnavailable()`
- 선택: 같은 파일의 `getProviderCredentials*`
- 쿨다운 계산: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 설정: `src/lib/resilience/settings.ts`

**연결별 필드:**

- `rateLimitedUntil` — 쿨다운이 만료되는 시점의 타임스탬프
- `testStatus: "unavailable"`
- `lastError`, `lastErrorType`, `errorCode`
- `backoffLevel` — 지수 백오프 카운터

**기본 쿨다운:**

- OAuth 기본: 5초
- API 키 기본: 3초
- API 키 429: 업스트림 `Retry-After`/리셋 헤더/파싱 가능한 리셋 텍스트를 우선 사용
- 백오프: `baseCooldownMs * 2 ** failureIndex`

**썬더링 허드(thundering herd) 방지 가드:** 동시에 발생한 실패가 쿨다운을 과도하게 연장하거나 `backoffLevel`을 중복으로 증가시키는 것을 방지합니다.

**동시성 제한 429는 백오프 단계를 올라가지 않습니다.** 본문에 동시성 제한
("too many concurrent requests", "concurrency limit", "parallel request
limit", GLM `并发数过高`)이 보고된 `429`는 계정이 정상이지만 바쁜 상태임을 의미합니다.
`checkFallbackError()`는 사유 `concurrency_limited`를 반환합니다: 즉시 다음
연결로 페일오버하고, 이 연결은 고정된 `CONCURRENCY_LIMIT_COOLDOWN_MS`(1초) 또는
업스트림 재시도 힌트만큼만 쿨다운하며, `backoffLevel`은 변경하지 않고 `skipProviderBreaker`를
설정합니다.
명시적인 쿼터 본문이 여전히 우선하므로, 쿼터 패턴에도 일치하는 본문은 쿼터
판정으로 유지됩니다. 감지: `src/shared/utils/classify429.ts`의
`looksLikeConcurrencyLimit()`; 판정: `open-sse/services/accountFallback/concurrencyLimit429.ts`.
`classify429()`(브레이커의 `FailureKind`)는 변경되지 않았으며 이러한 본문에 대해
여전히 `rate_limit`을 읽습니다.

**스트림 콘텐츠 스톨은 계정을 쿨다운하지 않습니다.** 콘텐츠 스톨 워치독
(`open-sse/utils/streamHandler.ts`)이 제시간에 모델 출력을 보내지 않은
스트림을 포기하면, `markAccountUnavailable()`은 연결에 오류를 기록하지만
쿨다운은 설정하지 않습니다: 이 스톨은 해당 요청에 속하는 것으로, 대부분 아직
출력이 없는 긴 추론 턴입니다. 운영자는 `resilienceSettings.streamStallCooldown.enabled`
(기본값 `false`)로 다시 활성화할 수 있습니다.

**추론 프레임은 콘텐츠 스톨 예산을 재시작합니다.** 추론 모델은 첫 번째
가시 토큰 전에 몇 분 동안 생각할 수 있습니다: Claude는 thinking 텍스트가
비어 있을 수 있는 `thinking_delta` 프레임을 스트리밍하고, Responses API는
추론 항목을 연속으로 스트리밍합니다. `isReasoningProgressFrame()`
(`open-sse/utils/streamReadiness.ts`)이 이러한 프레임을 인식하고, 워치독은
턴을 취소하는 대신 각 프레임마다 예산을 재시작합니다. 이들은 여전히 모델
출력이 아니므로, 추론만으로 끝나는 턴은 여전히 빈 것으로 보고되고, 추론을
멈추고 하트비트만 보내는 턴은 여전히 워치독을 트리거합니다.

서명이 비어 있지 않은 Kiro의 바이너리 `reasoningContentEvent` 프레임은 이 추론
활동을 빈 `reasoning_content` 델타로 변환하여 executor를 통과하며 보존합니다.
서명은 전달되지 않습니다. 메타데이터, 불완전한 프레임, 빈 서명은 콘텐츠 예산을
재시작하지 않으며, 독립적인 active-stream 타임아웃과 클라이언트 취소는
여전히 적용됩니다(`open-sse/executors/kiro/reasoning.ts`).

**터미널 상태(쿨다운이 아님):**

- `banned` — 금지 키워드/계정 차단 감지([BAN_DETECTION](../security/BAN_DETECTION.md) 참조)와 연속 세 번의 업스트림 요청별 거부(`request_rejected`, 예: Anthropic OAuth 403 "Request not allowed" — `open-sse/services/requestRejectedStreak.ts`)에 의해 설정됩니다. 단일 거부는 연결을 쿨다운시킬 뿐입니다
- `expired`(제한된 재시도 후 터미널로 전환 — 지수 백오프와 함께 `EXPIRED_RETRY_MAX = 3` — 따라서 일시적인 OAuth 오류는 계정이 영구적으로 비활성화되기 전에 자가 복구될 수 있습니다)
- `credits_exhausted`

이러한 상태는 자격 증명이 변경되거나 운영자가 재설정할 때까지 유지됩니다. 터미널 상태를 일시적인 쿨다운 상태로 덮어쓰지 마세요.

**지연 복구:** `rateLimitedUntil`이 지나면 연결이 다시 사용 가능해집니다. 성공적으로 사용되면 `clearAccountError()`가 모든 오류 필드를 지웁니다.

### Claude OAuth 사용량 벽: 낮은 우선순위 레인 + 세션 제한 리셋

**범위:** 하나의 Claude 구독(OAuth) 연결. 두 기능 모두 **연결별
옵트인**입니다(연결 편집 → Claude 섹션 → `providerSpecificData`의
`lowPriorityMode` / `autoLimitReset`, 둘 다 기본값 꺼짐). Claude Code의
`/low-priority` 및 `/limit-reset` 명령을 미러링합니다(와이어 계약은
Claude Code 2.1.263에서 캡처됨).

**구현:**

- 상태 머신 + 응답 분류: `open-sse/services/claudeLowPriority.ts`
- 리셋 상태/클레임 클라이언트: `open-sse/services/claudeLimitReset.ts`
- Executor 훅(헤더 주입 + 동일 계정 재시도): `open-sse/executors/base.ts::execute()`
- 옵트인 지속성: `src/lib/providers/requestDefaults.ts::normalizeProviderSpecificData()`

**트리거:** 5시간 사용량 벽 — 헤더에
`anthropic-ratelimit-unified-status: rejected`가 있고 계정이 자격이 있는 경우
`anthropic-ratelimit-unified-slow-offer: treatment`를 포함하는 `429`. 첫 번째 벽
429 전에는 아무것도 전송되지 않으며, unified 헤더가 없는 버스트 429는 일반 쿨다운 경로를 거칩니다.

**낮은 우선순위 레인**(`lowPriorityMode`):

- wall 429에서 실행기는 제안을 수락하고 `anthropic-usage-limit: slow`로 **동일한**
  계정을 즉시 재시도합니다. 레인은 통지된 `anthropic-ratelimit-unified-reset` 시점(+60초 유예)까지
  활성 상태로 유지되며, 해당 창 내의 모든 요청이 이 헤더를 전달합니다. 가로채인 429는
  `handleChatCore`에 도달하지 않으므로, 연결은 쿨다운 상태로 전환되지 **않고**
  로테이션에서 제외되지도 않습니다.
- 이후 응답의 `anthropic-ratelimit-unified-slow-status`: `active` / `not_needed`는
  레인을 유지합니다. `slot_busy` (429) 또는 `529`는 서버의
  `anthropic-ratelimit-unified-slow-retry-after`(기본값 20초, 5–600초로 클램프, ±30% 지터)만큼
  대기한 후 재시도하며, `anthropic-ratelimit-unified-slow-max-wait`(기본값 20분, 1분–6시간으로
  클램프)로 상한이 정해집니다. 이를 넘으면 레인이 종료되고 10분간의 쿨오프가 재수락을
  차단합니다. 이 대기 시간은 추가로 요청 자체의 업스트림 시작 타임아웃
  (`resolveFetchStartTimeout`, 기본값 10분)에서 5초의 마진을 뺀 남은 시간으로 제한됩니다.
  이 상한이 없으면 기본 20분의 최대 대기 시간이 요청보다 오래 지속되어 대기 도중 슬립이
  중단되고, 정상적인 `max_wait` 종료 + 쿨오프 대신 `TimeoutError`가 표면화될 것입니다.
- `weekly_limit` / `budget_exhausted` / `off` / `ineligible`, 5시간 창 롤오버, 또는
  `ineligible` + `anthropic-ratelimit-unified-overage-in-use: true`(유료 초과 사용이 이제
  wall을 커버하므로 어떤 상태에서든 `extra_usage`로 종료됨)는 레인을 종료시키며, 이후 응답은
  일반 쿨다운 경로로 흐릅니다. `budget_exhausted`는 통지된 예산 리셋(≤ 8일)까지 기억됩니다.
- wall 검사는 실행기 자체의 400 기반 시도 내 재시도(컨텍스트 편집, thinking/effort 클램프,
  파라미터 자동 학습) 이후에 실행되므로, 해당 재시도 중 하나에서만 표면화되는 wall 429도
  쿨다운 경로에 도달하는 대신 여전히 가로채집니다.
- 상태는 연결별로 인메모리에 저장됩니다(재시작하면 재수락을 위해 wall 429 하나가 추가로
  소요됩니다).

**세션 한도 리셋** (`autoLimitReset`, 둘 다 활성화된 경우 레인보다 먼저 시도됨):

- `GET https://api.anthropic.com/api/oauth/usage?at_wall=1&skip_spend=1` → `juniper_tide`
  블록; `arm: "reset"`이고 `available: true`인 경우,
  `{ "program": "juniper_tide" }`와 함께
  `POST https://api.anthropic.com/api/organizations/{orgUUID}/reset_rate_limits`
  (조직 UUID는 `providerSpecificData.organizationUUID`에서 가져오며, 부트스트랩 폴백 사용).
- `result: reset|not_limited` → 요청이 전속도로 재시도됩니다(slow 헤더 없음).
  `already_used` / `not_offered`는 `next_available_at`(기본값 1주일)을 메모합니다.
  실패 시 15분 백오프합니다. 리셋은 주 1회이며 여전히 주간 한도에 포함됩니다.

회귀 방지 테스트: `tests/unit/claude-low-priority-mode.test.ts`,
`tests/unit/claude-limit-reset.test.ts`, `tests/unit/claude-low-priority-executor.test.ts`.

### 세션 어피니티 (#7274)

**범위:** 하나의 클라이언트 세션(`X-Session-Id` / `x-codex-session-id` / `x-omniroute-session` 헤더)이 하나의 연결에 고정되며, **모든** 프로바이더에 적용됩니다.

**목적:** 멀티턴 에이전트(Claude Code, aider, 커스텀 에이전트)가 여러 요청에 걸쳐 동일한 계정에 머물도록 하여, 계정 간 컨텍스트 손실과 계정별 세션 상태를 가진 프로바이더에서 반복되는 콜드 스타트 429를 줄입니다.

**구현:**

- TTL 해석: `src/sse/services/sessionAffinityPin.ts::resolveSessionAffinityTtlMs()`
- 핀 선택/생성: `src/sse/services/sessionAffinityPin.ts::selectSessionAffinityConnection()`
- 헤더 추출(범용, 모든 프로바이더): `src/sse/services/auth.ts::extractSessionAffinityKey()`
- 영속화된 핀 테이블: `sessionAccountAffinity` (`src/lib/db/sessionAccountAffinity.ts`)
- 설정: `sessionAffinityTtlMs`(전역 TTL, ms 단위, `0`이면 비활성화) — `src/lib/db/settings.ts`. 마이그레이션 `124_generic_session_affinity_ttl.sql`에 의해 Codex 전용 `codexSessionAffinityTtlMs`에서 이름이 변경되었으며, 이 마이그레이션은 이전에 구성된 Codex TTL을 새 기본값으로 이월합니다.

#7274 이전에는 `resolveSessionAffinityTtlMs()`가 `codex`를 제외한 모든 프로바이더에 대해 무조건 `0`으로 종료했으므로, 핀 메커니즘과 헤더 추출이 이미 프로바이더에 구애받지 않았음에도 TTL 설정(및 세션 헤더)이 다른 곳에서는 아무런 효과가 없었습니다. 이 수정은 해당 조기 반환을 제거했으며, 이제 TTL이 전역으로 `0`보다 크게 설정되면 모든 프로바이더에 균일하게 적용됩니다.

세 개의 세션 어피니티 헤더는 절대 업스트림으로 전달되지 않습니다. 실행기는 클라이언트 헤더를 그대로 전달하는 대신 업스트림 헤더를 처음부터 직접 구성하므로, 이는 내부 상관관계 ID로만 유지됩니다.

### 독점 관리형 세션 연결 리스

**범위:** 하나의 활성 관리형 HTTP 클라이언트/세션이 하나의 적격 OmniRoute 연결을 소유합니다.

**목적:** 요청 전반에 걸쳐 확고한 라우팅 경계가 필요한 클라이언트에게 지속적인 독점 연결
소유권을 제공합니다. 이는 소프트한 연속성 선호에 해당하는 세션 어피니티와는 다릅니다.
독점 리스는 라이프사이클 상태를 SQLite에 영속화하고, 전역 활성 소유자 및 활성 연결
유일성을 강제하며, 프로바이더 디스패치 전에 오래된 제너레이션을 거부합니다.

이 기능은 API 키 단위로 옵트인됩니다. 관리형 키는 `lease:exclusive` 스코프와 명시적이고
비어 있지 않은 `allowedConnections` 목록을 가져야 합니다. 모든 HTTP 클라이언트가 라이프사이클
엔드포인트를 사용할 수 있으며, 클라이언트 이름, user-agent, 프로바이더, OAuth 방식 또는 모델이
요구되지 않습니다. 리스는 모델이 아닌 연결을 소유하므로, 연결이 정상적으로 적격 상태로
유지되는 동안에는 모델을 변경해도 바인딩이 유지됩니다. 일반적인 모델, 쿼터, 헬스, 쿨다운 및
허용 목록 규칙은 여전히 최종 권한을 가지며, 동일한 제너레이션을 다른 유휴 적격 연결로
전환할 수 있습니다.

수명 주기는 JSON 액션 `acquire`, `renew`, `release`를 사용하는 `POST /api/v1/session-leases`입니다.
관리형 인퍼런스 요청은 불투명한 `X-OmniRoute-Lease-Owner` 값과 정확한
`X-OmniRoute-Lease-Generation` 값을 제시합니다. 소유자는 `vlo_` 뒤에 43자의 base64url 문자가 오는 형식을 사용하며,
SHA-256 해시만 저장됩니다. 모든 최종 디스패치 펜스는 인증된 API 키 ID와
활성 연결 ID도 함께 바인딩합니다. 리스 제어 헤더는 로그, 보존된 요청 스냅샷,
업스트림 실행기 헤더에서 제거됩니다.

일반 라우팅에 적격한 관리형 후보가 존재하지만 모든 유휴 후보가
외부 활성 리스에 의해 점유되어 있는 경우, OmniRoute는 HTTP `429`, 리스 용량 사용 불가(lease-capacity-unavailable) 코드,
용량 대기(waiting-for-capacity) 상태, 그리고 가장 이른 관련 만료 시각에서 파생된 상한이 있는 `Retry-After`를 반환합니다.
일반적인 빈 적격성은 리스 경합이 아니며 기존 라우팅 오류 의미 체계를 그대로 유지합니다.

관련 메커니즘은 서로 별개로 유지됩니다:

- OAuth 세션 점유는 OAuth 계정을 위한 프로세스 로컬 소프트 분산입니다.
- 계정 세마포어는 요청 동시성 허가를 부여하며 요청이 완료되면 종료됩니다.
- 독점 관리형 세션 리스는 세대(generation) 펜스를 갖는 지속적인 수명 주기 소유권입니다.

---

## 3. 모델 잠금(Model Lockout)

**범위(Scope):** provider + connection + model 삼중 조합.

**상태별 키 범위:** 실패한 상태가 잠금이 어떤 키에 기록될지를 결정합니다
(`open-sse/services/accountFallback/exactModelLock.ts`의 `resolveLockoutScope()`):

- `429` / `403` / `402` — 쿼터 또는 권한(entitlement) 신호 — **쿼터 패밀리**를 잠급니다:
  codex의 경우 전체 `codex` / `spark` 범위(해당 커넥션의 모든 `gpt-5*` 모델),
  다른 provider의 경우 `getQuotaScopedModelForProvider()`.
- `404`는 개별 모델을 잠급니다(`getModelLockKey()`가 `not_found`를 좁힘).
- 그 외 모든 상태 — `5xx` 전송/서버 실패와 OmniRoute 자체 품질 검증에서 합성된
  `502` — 은 **정확한(exact)** provider/connection/model 튜플만 잠급니다.
  한 모델의 불량 스트림은 해당 계정의 쿼터에 대한 증거가 아닙니다; 이 규칙이
  적용되기 전에는 `codex/gpt-5.6-luna`에서 빈 응답 한 번이 발생하면 해당
  커넥션의 모든 `gpt-5*` 모델이 2~30분 동안(점진적으로 증가) 라우팅에서
  제외되었지만 쿼터는 그대로였습니다.
- 호출자의 명시적 `scope` 옵션이 항상 우선합니다(Antigravity는 `"exact"`를 전달).

**목적:** 하나의 모델만 사용 불가하거나 쿼터 제한이 걸렸을 때 전체 커넥션을
비활성화하지 않기 위함입니다.

**예시:**

- 모델별 쿼터를 적용하는 provider가 429를 반환하는 경우
- 로컬 provider가 누락된 모델 하나에 대해 404를 반환하는 경우
- provider별 모드/모델 권한 실패(예: Grok 모드)

**구현:** `open-sse/services/accountFallback.ts` — `lockModel()`, `clearModelLock()`, `getAllModelLockouts()`.

### 모델 쿨다운 대시보드 (v3.8.0)

UI: Settings → Model Cooldowns (`src/app/(dashboard)/dashboard/settings/components/ModelCooldownsCard.tsx`)

활성 잠금 목록을 다음 항목과 함께 표시합니다: provider, connection, model, reason, expiresAt. 운영자는 카드에서 모델을 수동으로 다시 활성화할 수 있습니다.

**REST API:**

- `GET /api/resilience/model-cooldowns` — 활성 잠금 목록 조회
- `DELETE /api/resilience/model-cooldowns` — 수동 재활성화. 본문: `{provider, connection, model}`. 인증: management.

### 쿨다운 관리자(Cooldown Manager)

UI: Monitoring → Cooldown Manager (`src/app/(dashboard)/dashboard/resilience/cooldowns/`).

일시적인 이유로 라우팅에서 제외된 모든 커넥션을 각 provider 페이지를 일일이
여는 대신 한 페이지에서 볼 수 있습니다. 커넥션 쿨다운, 모델 잠금, 터미널
상태를 나열하고, 커넥션별·선택 항목별·provider 전체 커넥션에 대해 해제할 수
있으며, 가장 자주 조정되는 쿨다운 규칙인 `streamStallCooldown.enabled`와
OAuth / API-key `connectionCooldown` 기본 쿨다운 및 최대 백오프 단계를 편집할 수
있습니다(`PATCH /api/resilience`를 통해 저장). 터미널 상태(`banned`,
`expired`, `credits_exhausted`)는 목록에 표시되지만 여기서는 절대 해제되지
않습니다.

**REST API** (`src/lib/resilience/cooldownManager.ts`, 인증: management):

- `GET /api/resilience/cooldowns[?provider=]` — 상태, 남은 쿨다운, 백오프
  레벨, 마지막 오류 유형, 모델 잠금이 포함된 커넥션 목록(자격 증명 제외)
- `POST /api/resilience/cooldowns` — 본문 `{connectionIds: string[]}` 또는
  `{all: true, provider?}`; `{cleared, unchanged, skippedTerminal, lockoutsCleared}` 반환

### 잠금 설정 UI + 성공-감쇠 복구 (v3.8.23)

모델 잠금이 항상 켜져 있는 하드코딩된 동작에서 전용 설정 카드와 자가 복구
경로를 갖춘 완전히 구성 가능한 옵트인 기능으로 변경되었습니다.

**설정 카드:** Settings → Model Lockout
(`src/app/(dashboard)/dashboard/settings/components/ModelLockoutCard.tsx`).
이 카드는 위의 읽기 전용 `ModelCooldownsCard`(활성 잠금을 _나열_만 함)와는
**별개**입니다 — 새 카드는 _파라미터를 구성_합니다. 기본값은
`DEFAULT_MODEL_LOCKOUT_SETTINGS`
(`src/lib/resilience/modelLockoutSettings.ts`)에 있습니다:

| 설정                    | 기본값                           | 의미                                                    |
| ----------------------- | -------------------------------- | ------------------------------------------------------- |
| `enabled`               | `false`                          | 마스터 토글 — 모델 잠금은 **기본적으로 꺼져 있습니다**. |
| `errorCodes`            | `[403, 404, 429, 502, 503, 504]` | 모델 범위 실패로 간주되는 업스트림 상태 코드.           |
| `baseCooldownMs`        | `120_000` (120초)                | 첫 번째 실패에 대한 초기 잠금 시간.                     |
| `maxCooldownMs`         | `1_800_000` (30분)               | 상승된 쿨다운의 상한.                                   |
| `maxBackoffSteps`       | `10`                             | 최대 지수 백오프 상승 단계 수.                          |
| `useExponentialBackoff` | `true`                           | 반복된 실패 시 쿨다운을 지수적으로 상승시킬지 여부.     |

설정은 일반 설정 저장소를 통해 지속되며 resilience 설정 스키마로 검증됩니다;
카드는 `baseCooldownMs`/`maxCooldownMs`(`maxCooldownMs ≥ baseCooldownMs` 조건
포함)와 `maxBackoffSteps`를 클램프합니다.

**성공-감쇠 복구:** 복구는 순수하게 타이머 만료에만 의존하지 **않습니다**.
정상 응답은 모델의 실패 카운트를 다시 낮춰, 윈도우 도중에 복구된 모델이
타이머가 만료되기 전에 상승을 멈추고(해제되고) 하도록 합니다. 콤보 대상이
성공하면 `open-sse/services/combo.ts`가 `decayModelFailureCount()`
(`open-sse/services/accountFallback.ts`)를 호출하며, 이는 저장된
`failureCount`를 **절반으로** 줄입니다(`Math.floor(failureCount / 2)`);
카운트가 `0`에 도달하면 잠금 항목이 완전히 삭제됩니다. 이에 대응되는
`recordModelLockoutFailure()`는 상승 윈도우 내의 실패에 대해 카운트를
증가시키고(쿨다운을 상승시킴) 있습니다. 이 성공-감쇠는 단순 타이머 만료에
추가로 적용됩니다 — 두 경로 모두 모델을 다시 활성화할 수 있습니다.

**상태:** 잠금은 **메모리 내**에 보관됩니다(`provider:connectionId:model`을
키로 하는 `ModelLockoutEntry`의 프로세스별 `Map`, exact-scope 잠금은
`provider:connectionId:exact:model`을 키로 함). DB에 지속되지 않습니다 —
재시작 시 소실됩니다. _설정_은 지속되지만, 활성 잠금 _상태_는 휘발성입니다.

---

## 4. Quota-Share 동시성 제어 (v3.8.36)

구독형 계정(GLM, MiniMax 등)은 보통 동시 요청을 ~1–3개만 허용하며, 이를 초과하면 429와 쿨다운이 발생합니다. 이 문제는 여러 API 키가 하나의 업스트림 계정을 공유하는 **quota-share**(`qtSd/…`) 콤보에서 특히 심각합니다. 세 개의 계층이 공유 계정이 폭주하지 않도록 막아줍니다.

### 연결별 동시성 상한 (`max_concurrent`)

각 프로바이더 연결은 `max_concurrent` 상한을 선언할 수 있습니다
(`provider_connections.max_concurrent`, 연결 모달 / API / DB에서 설정). 비워 두면 제한이 없습니다. 이것이 아래의 직렬화 계층을 구동하는 유일한 설정값입니다 — 계정의 실제 동시성에 맞춰 설정하세요 (예: GLM ~1, MiniMax ~2).

### 모델별 동시성 상한 (`modelConcurrency`)

연결은 추가로 `rateLimitOverrides` 맵 안에 정확한 모델별 동시성 상한을 선언할 수 있습니다:

```json
{
  "rateLimitOverrides": {
    "maxConcurrent": 4,
    "modelConcurrency": { "glm-5": 1, "glm-4.7": 3 }
  }
}
```

연결 모달(**Rate limit overrides → Per-model concurrency caps**, 한 줄에 `model=cap` 하나씩)에서 설정하거나, 동일한 JSON 형태로
`PATCH /api/providers/[id]`를 통해 설정할 수 있습니다. 핵심 의미는 다음과 같습니다:

- **연결 전체 vs 모델별:** `maxConcurrent`는 공유되는 연결 전체 상한으로 유지됩니다. 둘 다 적용되는 경우, 두 게이트는 동일한 복합 게이트
  (`global → provider → account → model`)에서 원자적으로 획득되며, 실효 동작은 적용 가능한 것 중 더 엄격한 제한이 됩니다.
- **정확한 모델 키 일치:** 키는 라우팅 해석 후 실행기(executor)에 전달되는 모델 문자열입니다 — 일반적으로 클라이언트 측 `provider/model` 별칭이 아닌 순수 업스트림 모델 id(`glm-5`)입니다 (`zai/glm-5`는
  `glm-5`와 일치하지 않습니다). 값은 양의 정수 동시 요청 상한입니다.
- **로컬 큐잉, 디스커버리 없음:** 초과 요청은 기존 큐/타임아웃 의미(타입화된 `SEMAPHORE_TIMEOUT` /
  `SEMAPHORE_QUEUE_FULL` 수락 오류)에 따라 로컬에서 큐잉됩니다. OmniRoute는 업스트림 정책을 탐지하거나 추론하지 않습니다 — 운영자가 구성한 정확한 상한만을 강제합니다. 포화된 모델 게이트는 프로바이더를 비활성화하지 않으며 영구적인 모델 잠금을 만들지도 않습니다; 업스트림 429/쿨다운/폴백 동작이 오류 안전장치로 남아 있습니다.
- **연결별, 프로세스별 범위:** 상한은 데이터베이스 연결별이며 인메모리에 유지되므로, 동일한 업스트림 API 키를 재사용하는 두 연결은 서로 조율하지 않습니다.
- **미구성은 변경 없음:** 맵을 생략하거나(또는 대시보드 필드를 비워 두면) 모델 게이트가 추가되지 않습니다. 보편적인 프로바이더 제한을 단정하지 않는 구성 예시:

```text
glm-5=1
glm-4.7=3
```

### Quota-share 요청 직렬화

quota-share 디스패치가 양의 `max_concurrent`를 선언한 연결을 대상으로 할 때, 해당 **계정**에 대한 동시 요청은 연결별 세마포어(키 `qsconn:<connectionId>`)를 통해 직렬화됩니다: 초과 요청은 계정을 폭주시키는 대신 **큐에서 대기**합니다. 이는 **fail-open**입니다 — 큐가 포화되거나 타임아웃이 발생해도 디스패치 가능한 요청을 거절하지 않고 슬롯 없이 진행합니다. **Settings → Resilience → Quota-share per-connection concurrency**에서 토글하세요 (`resilienceSettings.quotaShareConcurrencyLimit.enabled`, 기본값 켜짐). `max_concurrent` 상한이 없으면 동작은 변경되지 않습니다.

> quota-share 라우팅 게이트(`selectQuotaShareTarget`, DRR + P2C) 자체는 fail-open이며 상한에 도달한 연결을 _우선순위에서 밀어낼_ 뿐입니다 — 단일 연결 풀에서는 하드 제한을 할 수 없으므로, 실제로 폭주를 억제하는 것은 이 세마포어입니다.

### 콤보 쿨다운 인지 재시도

(활성화된 경우) 모든 콤보 전략에 대해, 짧은(SHORT) 일시적 쿨다운에 대해 429를 확정시킬 요청은 429를 반환하는 대신 기다렸다가 재디스패치합니다 — 이는 멀티모델 콤보에서 Gemini급 TPM/RPM 윈도우(~60초 retry-after)를 커버하며, 예를 들어 2-모델 콤보의 두 타깃이 모두 모델별 레이트 리밋에 걸리는 경우에 해당합니다. **Settings → Resilience**의 `comboCooldownWait`(`enabled`, `maxWaitMs`, `maxAttempts`,
`budgetMs`)로 상한이 정해집니다. `quota_exhausted`(자정까지 잠금)나 인증/찾을 수 없음 사유에 대해서는 절대 기다리지 않습니다.

동일한 게이트가 디스패치 전 사례(#16319)도 커버합니다: 콤보의 모든 타깃이 시도가 이루어지기 전에 모델이 짧은 일시적 잠금 상태에 있어 스킵될 때, 제로-시도 경로는 힌트 없는
`503 ALL_TARGETS_SKIPPED`로 응답하는 대신 동일한 상한 아래에서 잠금이 풀릴 때까지 기다렸다가 재디스패치합니다. 대기가 허용되지 않는 경우(상한, 시도 횟수 또는 예산 소진, 또는 기능 꺼짐), 최종 응답은 가장 빠른 일시적 잠금 만료 시점의 `retry_after` / `reset_at`을 담은
`429 rate_limit_error`로 업그레이드됩니다; 쿼터, 인증, 찾을 수 없음 잠금은 힌트 없는 503을 유지합니다.

```text
#16319 · comboCooldownWait · pre-dispatch (attempts = 0)
all targets skipped + transient model lockout:
  enabled ∧ 0 < waitMs ≤ maxWaitMs ∧ attempt < maxAttempts ∧ budgetLeftMs ≥ waitMs
    → wait → re-dispatch
  wait = false → HTTP 429 rate_limit_error
  retry_after / reset_at ← earliest transient lock expiry
quota_exhausted / auth_error / not_found / not_found_local:
  no transient hint → HTTP 503 ALL_TARGETS_SKIPPED
```

---

## 5. 요청 큐 어드미션 제어 (v3.8.49 · issue #6593)

**범위**: 로컬 프로바이더+커넥션별 레이트 리밋 큐(`open-sse/services/rateLimitManager.ts`,
Bottleneck 기반)이며, 위의 세 가지 메커니즘보다 한 단계 아래 계층이다.

**`maxWaitMs`는 큐 대기 시간을 제한하고, `executionMaxWaitMs`는 실행 시간을 제한한다.**
이 둘은 의도적으로 분리되어 있으며, 서로에게 영향을 주지 않는다.

`resilienceSettings.requestQueue.maxWaitMs`는 **큐 대기 예산**이다. 이는
프로바이더 슬롯을 기다리는 시간과 그 후 QUEUED 상태로 대기하는 시간을 포함하며,
작업이 QUEUED 상태를 벗어나 실행을 시작하는 순간 타이머가 해제된다
(`rateLimitManager.ts`, `wrappedFn`). 이 시간을 초과한 요청은 업스트림에 도달하지
못한다. 기본값은 30000ms이며, `src/lib/resilience/settings.ts`의
`DEFAULT_REQUEST_QUEUE_MAX_WAIT_MS`에서 제공되고
`tests/unit/ratelimit-admission-control-6593.test.ts`에서 고정(pinned)되므로,
이 값을 변경하면 이 문단이 조용히 오래된 상태로 남는 대신 해당 테스트가 실패하게 된다.

`resilienceSettings.requestQueue.executionMaxWaitMs`는 Bottleneck이 작업
`expiration`으로 받는 값이며, 이 타이머는 디스패치 후에만 시작된다. 자체적인
업스트림 타임아웃이 없는 executor를 위한 안전장치(backstop)이며, executor 자체의
fetch 시작 타임아웃이 더 길면 그 값으로 올라가므로, 정상적으로 진행 중인 응답을
끊을 수 없다. 기본값은 600000ms(10분)이다.

큐 예산을 `expiration`에 넣는 것이 과거에 비증분(non-incremental) 게이트웨이를
전송 중간에 죽이던 원인이었다 — 이들은 첫 바이트가 오기 전에 몇 분씩 정상적으로
실행된다 — 그리고 이것이 expiration이 `code:
"RATE_LIMIT_EXECUTION_TIMEOUT"`(HTTP 504)로 표면화되는 반면 큐 예산은
큐 타임아웃 코드를 갖는 이유이다. 둘 중 하나든 `RATE_LIMIT_MAX_WAIT_MS` /
`RATE_LIMIT_EXECUTION_MAX_WAIT_MS`(환경 변수) 또는 대시보드
(**Settings → Resilience**)를 통해 재정의할 수 있다. 둘 다 정규화 시 1ms~24시간으로
클램프된다.

**둘 모두의 우선순위:** 환경 변수는 _기본값_만 제공한다.
`resilienceSettings.requestQueue`에 저장된 값(대시보드 / API patch로 설정,
`key_value`에 저장)이 그것보다 우선하고, 커넥션별
`rateLimitOverrides.maxWaitMs` / `.executionMaxWaitMs`가 그보다 더 우선한다.
따라서 이미 저장된 값이 있는 배포 환경에서 환경 변수를 설정해도 아무것도 바뀌지
않는다 — 대신 저장된 설정을 지우거나 업데이트해야 한다.

큐 체류 시간은 `maxWaitMs`로 제한되며, 아래의 `maxQueueDepth`는 동시에 큐에
들어갈 수 있는 호출자 수를 제한한다.

**본문에 명시된 재시도: 페이싱 vs 잠금.** 429 응답 본문은 자체적인 대기 시간을
지정할 수 있으며(Gemini `RetryInfo.retryDelay`, "retry after Ns" 텍스트),
`updateFromResponseBody`가 이를 읽는다. 커넥션의 `maxWaitMs` 안에 들어오는
대기 시간은 페이싱이다: 리미터가 그 시간 동안 리저버를 비우고, 다시 채워지면
큐에 있던 호출이 디스패치된다. `maxWaitMs`보다 긴 대기는 큐가 버텨낼 수 있는
것이 아니다 — Gemini는 소진된 일일 쿼터에 대해 `retryDelay: "86399s"`로
응답한다. 재구성된 429에 전달되는 `Retry-After`(#16528)가 이미 폴백 엔진으로
하여금 해당 기간 동안 모델을 잠그게 하지만, 리미터까지 그 기간 동안 일시정지하면
키에 일찍 도달하는 모든 호출(예: resilience 리셋 이후)이 `maxWaitMs` 전체 동안
멈추게 된다. 이러한 대기가 타입이 지정된 Google `RetryInfo`
detail(`google_rpc_retry_info` 출처)에서 오고 키의 리미터가 이미 모델 단위로
스코프되어 있는 경우(`getLimiterKey` 참조), 429는 대신 해당 커넥션에서의 모델
잠금이 되고(`open-sse/services/rateLimitManager/bodyRetryPause.ts`의
`lockModelForLongBodyRetry`, 최대 24시간), 리미터는 일시정지되지 않은 상태로
남는다. 계정 선택은 `isModelLocked()`를 통해 해당 잠금을 건너뛰며, 해당
커넥션에 고정된 타겟에 대한 콤보 사전 디스패치 게이트도 마찬가지이다. 쿼터
패밀리 단위 리미터를 사용하는 antigravity에서는 잠금이 정확한 모델 단위로
적용되며, 이는 다른 쿼터 잠금과 동일하다. 별칭(alias)이 해당 모델로 해석된
경우 클라이언트가 요청한 이름도 잠기는데, 이는 이러한 검사들이 요청된 이름을
사용하기 때문이다. 잠금은 정확히 일치하는 이름에만 적용되므로(`lockExactModel`),
antigravity 쿼터 패밀리나 codex 스코프를 넘나드는 별칭은 자기 자신의 이름을
잠그지 않는다. 산문 힌트, 타입이 없는 `retryDelay`, 또는 전체 커넥션이 공유하는
리미터의 경우에는 일시정지가 유지된다. 429 경로가 방금 재구성한 리미터가
일시정지되는 경우, 남은 큐 시간이 일시정지보다 먼저 끝나는 호출자는 그 시간을
기다리지 않고 즉시 큐 타임아웃 코드로 거부된다(`checkLimiterPause`). 기록된
종료 시각은 리미터가 빌드되기 전 — Bottleneck이 갱신 시계를 시작하는 지점 — 에
고정되며, 이후 리저버에 대한 변경은 이를 잊는다.
`tests/unit/rate-limit-long-body-retry-lockout.test.ts`와
`tests/unit/rate-limit-body-retry-pause.test.ts`에서 다룬다.

**`maxQueueDepth` — 옵트인 어드미션 상한 (신규).** `resilienceSettings.requestQueue.maxQueueDepth`는
하나의 프로바이더+커넥션에 대해 동시에 큐에 대기할 수 있는(아직 디스패치되지
않은) 요청 수를 제한한다. 큐에 이미 `maxQueueDepth`개의 요청이 있는 경우,
새 요청은 `limiter.schedule()`에 도달하기 **전에** 타입이 지정된
`code: "RATE_LIMIT_QUEUE_FULL"` 오류로 빠르게 거부된다 — 따라서 거부 비용이
저렴하며 해당 요청에 대한 다운스트림 프롬프트 압축 / 변환 작업이 일어나기
전에 발생한다. 기본값 `0` = 비활성화로, 기존의 무제한 큐 동작을 유지하며,
0–100000 범위로 제한된다. `RATE_LIMIT_MAX_QUEUE_DEPTH`(환경 변수) 또는
`resilienceSettings.requestQueue.maxQueueDepth`(대시보드/API patch)로
재정의할 수 있다.

어드미션 검사 자체는 순수 함수이다
(`open-sse/services/rateLimitManager/admission.ts::checkQueueAdmission`).
따라서 실제 Bottleneck 리미터 없이도 단위 테스트가 가능하다.

> #6593을 연 RFC는 `bypassCompressionOnRateLimit` 플래그도 함께 제안했습니다.
> 이 저장소의 `open-sse/services/compression/` 파이프라인은 아웃바운드 LLM
> 요청(`chatCore.ts`의 `resolveCompressionSettings`/`selectCompressionStrategy`
> 블록 부근)에 대한 프롬프트/컨텍스트 압축이지, 합성된 429 본문에 대한 HTTP
> 응답 압축이 아닙니다. 따라서 문자 그대로의 바이패스 플래그에 대응하는 코드
> 경로는 존재하지 않습니다. 또한 이 프롬프트 압축 단계는 현재 요청 파이프라인에서
> `withRateLimit()` _보다 먼저_ 실행되므로, 큐가 가득 찬 상태의 거부 시 이를
> 건너뛰도록 순서를 변경하는 작업은 이 이슈의 범위를 넘어서는 별도의 더 큰
> 변경 사항입니다. 여기서는 의도적으로 구현하지 **않았으며**, CPU 절감 효과가
> 순서 변경에 따른 위험을 감수할 만큼 크다고 판단될 경우 후속 작업으로
> 남겨두었습니다.

### 레이트 리밋 자동 활성화 안전망 및 연결 보호 (`rateLimitProtection`)

**자동 활성화 안전망** (`resilienceSettings.requestQueue.autoEnableApiKeyProviders`, 기본값 `true`):
기본적으로 OmniRoute는 모든 활성 API 키 프로바이더 연결(`getProviderCategory(provider) === "apikey"`)에 대해 레이트 리밋 큐 보호를 자동으로 활성화합니다. 이를 통해 레이트에 민감한 업스트림 API 키로 들어오는 요청이 업스트림 429 오류로 폭주하는 대신 Bottleneck을 통해 큐에 쌓이고 스로틀링되도록 보장합니다. 이 안전망은 `RATE_LIMIT_AUTO_ENABLE` 환경 변수로 재정의할 수 있으며(`false`/`0`/`off`는 비활성화, `true`/`1`/`on`은 강제 활성화), 환경 변수가 대시보드에 저장된 설정(**설정 → 복원력** / `PATCH /api/resilience`)보다 우선합니다.

**연결별 `rateLimitProtection`의 의미:**
연결별 레이트 리밋 보호는 프로바이더 연결의 `rateLimitProtection` 불리언 필드로 추적됩니다(SQLite에는 `rate_limit_protection`으로 저장됨):

- **명시적 켜짐 (`rateLimitProtection === true`)**: 프로바이더 카테고리나 자동 활성화 안전망의 켜짐 여부와 관계없이, 이 연결에 대해 레이트 리밋 보호가 명시적으로 활성화됩니다.
- **명시적 꺼짐 (`rateLimitProtection === false`)**: 명시적 보호를 비활성화하지만, 활성 API 키 연결을 전역 자동 활성화 안전망에서 제외하지는 **않습니다**. `reconcileEnabledConnections`(`open-sse/services/rateLimitManager.ts`)에서 `false`와 `undefined`는 동일하게 취급됩니다. 즉, `rateLimitProtection === true`만 명시적 재정의로 처리됩니다. `rateLimitProtection`이 `false`(또는 미설정)이면 활성 API 키 연결은 여전히 자동 활성화 조건에 해당하며 레이트 리밋 보호 상태가 유지됩니다.
- **연결별 옵트아웃 불가**: 운영자는 현재 다른 연결들에는 자동 활성화를 유지하면서 "이 특정 활성 API 키 연결 하나만은 레이트 리밋 큐 보호 없이 실행해야 한다"고 표현할 수 없습니다. API 키 연결을 레이트 리밋 큐 없이 완전히 실행하려면 안전망을 전역적으로 꺼야 합니다(`RATE_LIMIT_AUTO_ENABLE=false` 또는 `resilienceSettings.requestQueue.autoEnableApiKeyProviders = false`).

**지원되는 쓰기 경로:**

- **`POST /api/rate-limits`**: 연결의 `rateLimitProtection`을 전환하기 위한 지원되는 관리용 쓰기 경로입니다(`{ connectionId: string, enabled: boolean }`). `enabled: true`로 호출하면 명시적 보호가 켜지고, `enabled: false`로 호출하면 명시적 보호가 해제됩니다(단, 자동 활성화가 켜져 있는 경우 활성 API 키 연결은 전역 안전망에 의해 계속 보호됩니다).
- **`PUT /api/providers/[id]`**: 의도적으로 `rateLimitProtection`을 받아들이거나 변경하지 **않습니다**(#11278). `PUT /api/providers/[id]`로 프로바이더 연결 메타데이터를 업데이트해도 저장된 레이트 리밋 보호 상태는 절대 변경되지 않습니다.

---

## 6. 저속 스트림 처리량 워치독 (#9709)

선택적 `resilienceSettings.streamRecovery.throughputWatchdog` 가드는 여전히 청크를
전송하고 있지만 설정된 유효 출력 속도 미만으로 어시스턴트 출력을 생성하는 업스트림을
감지합니다. 이는 유휴 타임아웃과 의도적으로 구분됩니다.
하트비트와 메타데이터는 두 타이머 중 어느 것도 재설정하지 않으며 진행으로 집계되지
않습니다. 또한 출력 품질과 관계없이 절대적인 안전 상한으로
유지되는 하드 시도 데드라인(#9153)과도 구분됩니다.

워치독은 중단할 수 있기 전에 워밍업 기간과 이어지는 완전한 롤링 윈도우를 필요로 합니다.
Chat Completions 및 Responses API 출력 이벤트의 텍스트 델타를
집계하며(보수적인 UTF-8 바이트 프록시), 사용량 전용 및 빈 이벤트는 무시하고,
도구 호출 또는 추론 이벤트가 진행 중인 동안에는 판단을 유보합니다. 이는
기본적으로 비활성화되어 있으며 `STREAM_THROUGHPUT_WATCHDOG_ENABLED=true`로
활성화할 수 있습니다. 윈도우, 워밍업, 최소 속도 및 최소 측정 가능 출력은
일반적인 복원력 설정 정규화 계층에 의해 제한됩니다.

활성화되면 워치독 중단은 활성 업스트림 시도에만 적용됩니다.
클라이언트에 보이는 바이트가 발생하기 전에는 기존의 동일 계정 조기 복구 경로가
시도를 다시 열 수 있습니다. 커밋 후에는 스트림이 무조건 재생되지 않으며,
기존의 안전한 중간 스트림 이어가기 계약만이 접미사를 이어 붙일 수 있습니다.
종결 처리는 단발성으로 유지되므로 사용량 계산 및 세마포어 해제가 중복되지 않습니다.

---

## 7. 업스트림 상태 재기술 (잘못 표기된 할당량 오류)

**범위:** 일시적인 할당량 소진을 잘못된 HTTP 상태로 보고하는 하나의 업스트림 게이트웨이.

**목적:** 분류가 이루어지기 전에 오도하는 상태를 수정하여, 다운스트림 소비자(폴백 엔진, 콤보 집계, 클라이언트 대면 응답)가 실패의 진정한 재시도 가능한 특성을 볼 수 있도록 합니다.

일부 게이트웨이는 일시적인 할당량 소진을 재시도 불가능한 HTTP 상태로 신호합니다. `agentrouter.org`는 표준 `429` 대신 중국어 본문(`用户额度不足` / `额度不足`)과 함께 `403`(때로는 `400`)을 반환합니다. Claude Code 같은 클라이언트는 `403`을 영구 오류로 간주하여 세션을 중단하며, 수정 없이는 폴백 엔진이 이를 할당량 이벤트 대신 `AUTH_ERROR`로 분류하게 됩니다.

**구현:**

- 레지스트리 + 매처: `open-sse/config/upstreamStatusRestatement.ts` — 프로바이더별 규칙 목록(`{id, fromStatuses, toStatus, textMarkers, excludeMarkers, defaultRetryAfterMs}`)이며, `applyStatusRestatement()`를 통해 매칭됩니다.
- 호출 지점: `open-sse/handlers/chatCore.ts`의 `providerFailure:` 블록(약 3654번째 줄)으로, `parseUpstreamError()`가 오류 HTTP 상태(`!providerResponse.ok`)를 가진 업스트림 응답을 파싱한 직후, 어떤 분류도 실행되기 전에 위치하여 모든 다운스트림 소비자가 수정된 상태를 보게 됩니다. `200` SSE 스트림 내부에 내장된 오류는 별도의 후속 스트림 파싱 경로를 따르며, 현재 이 훅의 적용을 받지 **않습니다** — 이는 알려진 제한 사항으로, agentrouter의 잘못된 상태(오류 HTTP 상태로 표면화됨)에는 아직 필요하지 않습니다.
- 재시도 적격성: `429`는 `RETRY_AFTER_ELIGIBLE_STATUSES`(`open-sse/services/combo/unavailableRetryGate.ts`)에 포함되어 있으므로, 재기술된 오류는 죽은 `403`으로 표면화되는 대신 실제 재시도 창을 갖게 됩니다.
- 합성된 `60s` `defaultRetryAfterMs`(`upstreamStatusRestatement.ts`)는 재기술된 응답이 **클라이언트**에게 알려주는 값일 뿐이며, 그 자체로 연결의 내부 쿨다운/잠금 지속 시간은 아닙니다. 이는 재기술된 오류를 실제로 처리하는 메커니즘(API 키 프로바이더의 경우 연결 쿨다운의 점진적 백오프, §2, 기본 `3s`; agentrouter 같은 모델별 할당량 프로바이더의 경우 모델 잠금, §3)에 의해 별도로 관리됩니다. 라우터는 클라이언트에게 알리는 60초 창보다 내부적으로 더 빨리 재시도 적격 상태가 될 수 있습니다 — 이는 의도된 여유이며 버그가 아닙니다.

영구 오류(agentrouter의 `无权访问模型` — 이 모델에 대한 접근 권한 없음)는 절대 재기술되지 않습니다. `textMarkers`가 일치하더라도 `excludeMarkers`가 규칙을 거부하므로, 오류는 원래 상태를 유지하고 어떤 것도 이를 무한히 재시도하지 않습니다. 일치하는 프로바이더 분류 규칙(`open-sse/config/providerErrorRules.ts`의 `agentrouter-model-access-denied`: `reason: "auth_error"`, `scope: "model"`, 선언된 기본 쿨다운 `6h`)은 `checkFallbackError`(`open-sse/services/accountFallback.ts`)에 의해 일반 apikey 카테고리 `FORBIDDEN` 조기 반환보다 _먼저_ 참조되며, `honorsRuleLockScope(provider)`로 게이트됩니다(#10334 — 현재는 `providerErrorRules.ts`의 `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 허용 목록을 통해 agentrouter 전용). 규칙에 선언된 6시간 쿨다운은 `fallbackResult.baseCooldownMs`로 전달되지만, 여전히 기존의 모델별 할당량 잠금 경로(`lockModelIfPerModelQuota()` / `recordModelLockoutFailure()`, 쿨다운 소스를 제외하고는 #10334에 의해 변경되지 않음)로 흘러갑니다. 다른 모든 모델 잠금과 마찬가지로 운영자의 `mlSettings.maxCooldownMs`(기본값 `1_800_000ms` / 30분)로 하한 제한되며, _영속화된 잠금 사유_는 규칙의 `"auth_error"`가 아닌 기존에 하드코딩된 `"forbidden"`으로 유지됩니다 — 사유 문자열이 아닌 쿨다운 지속 시간만이 엔드 투 엔드로 적용됩니다. 연결 자체는 활성 상태로 유지되며, 동일 연결의 형제 모델은 영향을 받지 않습니다.

재기술된 할당량 오류(`额度不足`)는 프로덕션에서 프로바이더 규칙(`agentrouter-user-quota-exhausted`: `reason: "quota_exhausted"`, `scope: "connection"`, 자체 선언 쿨다운 없음 — 영속화 계층의 스케일드 백오프 기본값이 적용됨)에 도달합니다. #10334 이후 `ProviderErrorRuleMatch`의 `scope`는 엔드 투 엔드로 소비되지만, `HONORS_RULE_LOCK_SCOPE_PROVIDERS` 허용 목록(`providerErrorRules.ts` — 현재는 `"agentrouter"`뿐이며, `honorsRuleLockScope()`으로 게이트됨)에 있는 프로바이더에**만** 적용됩니다. 다른 모든 프로바이더에서 `scope`는 #10334 이전과 정확히 동일하게 정보 제공용으로만 남아 있습니다. `checkFallbackError`는 일치한 규칙의 스코프를 `fallbackResult.ruleScope`로 표면화하며, `isAgentrouterConnectionQuotaScope()`(`src/sse/services/auth.ts`)는 `ruleScope`가 연결 전체에 적용되는 자체 복구 가능한 신호로 존중해도 진정으로 안전한지 확인하는 공유 가드입니다(스코프 `"connection"`, 사유 `quota_exhausted`, 절대 `permanent` 아님, 절대 `creditsExhausted` 아님 — 향후 규칙이 스코프 `"connection"`을 영구 계정 상태와 결합하는 경우에 대한 방어). 두 개의 소비자가 이를 호출합니다:

- **영속화** (`markAccountUnavailable()`, `src/sse/services/auth.ts`):
  패스스루 프로바이더의 **모델별** 잠금 브랜치로 빠지는 대신
  (agentrouter는 `passthroughModels: true`이므로 → `hasPerModelQuota()`가
  `true`를 반환), **임시 연결 쿨다운**을 적용합니다 —
  `testStatus: "unavailable"` + `rateLimitedUntil`을 설정하며, 종료 상태
  (`credits_exhausted`/`banned`/`expired`)는 절대 설정하지 않습니다 —
  따라서 수동 자격 증명 재설정이 필요한 대신 쿨다운이 끝나면 연결이
  스스로 복구됩니다. `disableCooling: true`인 연결에서는 건너뜁니다
  (#2997): 이 옵트아웃은 대신 모델별 잠금으로 넘어갑니다 (문서화된
  트레이드오프 — 해당 브랜치 위의 코드 주석 참조).
- **동일 요청 콤보 라우팅** (`applyComboTargetExhaustion()`,
  `open-sse/services/combo/targetExhaustion.ts`): 동일한 가드가 연결을
  인메모리 `exhaustedConnections` 집합에 `${provider}:${connectionId}`를
  키로 하여 표시합니다. 이것은 자신의 대상 객체에 _이미 정확히 그
  `connectionId`를 스스로 지니고 있는_ 남은 동일 요청(SAME-REQUEST)
  대상만 건너뜁니다 (`getExhaustedTargetSkipReason()`,
  `open-sse/services/combo/comboPredicates.ts`, `exhaustedConnections`
  조회 전의 `if (provider &&
connectionId)`) — 형제 대상들이 고정된
  `connectionId`를 지니지 않고 디스패치 시마다 응답의
  `X-OmniRoute-Selected-Connection-Id` 헤더로부터만 하나가 해석되는
  일반적인 모델-리스트 콤보는 이 키 매치에 절대 해당하지 않습니다. 이
  흔한 경우에, 방금 소진된 계정을 남은 레그가 재사용하는 것을 막는 진짜
  보호 장치는 이 Set이 아닙니다 — 바로 위의 영속화 계층(연결의
  `rateLimitedUntil`이 이제 미래 시각으로 설정됨)과, 이 실패에 대해
  동일한 가드가 `transientRateLimitedProviders`를 억제하는 것의
  조합입니다 ("2단계 설계" 및 `targetExhaustion.ts`의
  `isAgentrouterConnectionQuotaScope` 브랜치에 달린 코드 주석 참조):
  해당 Set이 표시되지 않은 상태로 남아 있으면, `combo.ts`의
  `allowRateLimitedConnection` 강제 허용
  (`open-sse/services/combo.ts:1005-1013`, `:2734-2738`)이 프로바이더의
  남은 레그에 대해 작동하지 않으므로, 자격 증명 선택의 `rateLimitedUntil`
  필터(`src/sse/services/auth.ts:1238`)가 정상적으로 적용되고, 남은
  레그는 아직 유효한 다른 agentrouter 연결을 선택하거나 사용 가능한
  자격 증명 없이 실패합니다 — 이 브랜치가 방금 쿨다운시킨 연결로
  억지로 되돌아가지는 않습니다.

### 2단계 설계: 상태 재해석, 그 다음 분류

상태 재해석(`upstreamStatusRestatement.ts`)과 프로바이더 분류 규칙
(`open-sse/config/providerErrorRules.ts`, `providerRuleRegistry`)은 둘 다
프로바이더 id와 텍스트 마커를 키로 사용하는 별개의 레지스트리이지만,
실행되는 위치와 목적이 다릅니다: 재해석은 `chatCore.ts` 초반부에서 HTTP
상태를 재작성하고, 분류 규칙은 `checkFallbackError()`
(`open-sse/services/accountFallback.ts`) 내부에서 폴백 `reason`을
선택하고 잠금 `scope`(`model` / `provider` / `connection`)를 결정합니다.

분류 규칙은 `providerErrorRules.ts`의 `FULL_TEXT_RULE_PROVIDERS` 허용
목록에 등재된 프로바이더에 대해서만 전체 오류 **텍스트**를 볼 수
있습니다 (`额度不足` 같은 본문 마커를 매칭하는 데 필요) — 현재는
`"agentrouter"`뿐입니다. 그 외 모든 **내장 카탈로그** 프로바이더에
대해 `checkFallbackError`는 `getProviderErrorRuleMatch`에 구조화된
오류(`{code, type}`)만 전달하며, 이는 헤더/상태/코드 기반 규칙에는
충분하지만 본문 텍스트 마커는 볼 수 없습니다. 헬퍼
`resolveRuleMatchBody()`가 이 선택을 수행합니다: 허용 목록에 있는
프로바이더에는 전체 오류 텍스트를, 그 외에는 구조화된 오류를
전달합니다. **내장** 프로바이더를 `FULL_TEXT_RULE_PROVIDERS`에 추가하는
것은 명시적인 프로바이더별 옵트인입니다 — 이는 목록에 없는 모든
프로바이더의 기본 경로가 바이트 단위까지 변경되지 않도록 하기 위해
존재합니다.

규칙의 `scope`(`model` / `provider` / `connection`)는
`FULL_TEXT_RULE_PROVIDERS`와는 별개의 옵트인입니다:
`checkFallbackError`는 이를 `fallbackResult.ruleScope`로만 노출하며,
다운스트림 소비자는 같은 파일의 `HONORS_RULE_LOCK_SCOPE_PROVIDERS`
허용 목록에 있는 프로바이더(`honorsRuleLockScope()`로 게이트됨 —
현재는 `"agentrouter"`뿐)에 대해서만 이를 정보성 레이블 이상의 의미로
적용합니다. 프로바이더가 해당 허용 목록에 올라간 후
`scope: "connection"` 매치가 실제로 무엇을 하는지는 위의 "재해석된
쿼터 오류"를 참조하세요.

**#11104 — 운영자 선언 규칙은 두 허용 목록을 모두 우회합니다.**
운영자는 이 파일을 편집하지 않고도 `settings.providerErrorRules`
(`open-sse/config/providerErrorRules.ts::setOperatorProviderErrorRules`)를
통해 런타임에 프로바이더별 규칙을 선언할 수 있습니다. 운영자 규칙을
`FULL_TEXT_RULE_PROVIDERS`/`HONORS_RULE_LOCK_SCOPE_PROVIDERS` — 내장
카탈로그 규칙의 **기본** 동작을 보호하기 위한 허용 목록 — 뒤로
게이트하면, 규칙을 선언하는 것 자체가 이미 운영자의 명시적
옵트인이므로, 이미 목록에 있는 프로바이더를 제외한 모든 프로바이더에
대해 설정 메커니즘이 무력해집니다. `resolveRuleMatchBody()`와
`honorsRuleLockScope()` 모두 `hasOperatorRuleForProvider()`를 먼저
확인합니다: 운영자 규칙이 있는 프로바이더는 어느 허용 목록에도
등장하는지와 관계없이 원시 오류 텍스트를 받고 선언된 `scope`가
적용됩니다.

**알려진 갭 — HTTP 400에 대해서는 `providerRuleRegistry`가 절대
참조되지 않습니다.** `checkFallbackError`의 `BAD_REQUEST` 브랜치는 상태
400을 전적으로 자체 패턴 배열(`accountFallback.ts`의
`MODEL_ACCESS_DENIED_PATTERNS`, `CONTEXT_OVERFLOW_PATTERNS` 등)을 통해
분류하고, 그 위의 `configuredRule`/`getProviderErrorRuleMatch` 브랜치에
도달하기 전에 반환합니다. `status: 400`인 내장 카탈로그 규칙(또는
운영자 규칙)은 구문상 유효하지만 절대 발동하지 않습니다. 현재 400을
대상으로 하는 기존 규칙이 없으므로 프로덕션에 영향은 없습니다 —
하지만 향후 400 규칙을 추가하려면 이 브랜치를 먼저 수정해야 하며,
이는 규칙 하나를 추가하는 것보다 큰 변경이고(패턴 배열 동작에 이미
의존하는 모든 프로바이더에 대해 400을 재분류함) 단일 프로바이더 규칙
추가의 범위를 벗어납니다.

### 할당량을 잘못 보고하는 새 게이트웨이 추가

1. `statusRestatementRegistry`
   (`open-sse/config/upstreamStatusRestatement.ts`)에 규칙 배열 하나를
   등록합니다. `textMarkers`는 프로바이더별로 유지하고,
   `CREDITS_EXHAUSTED_SIGNALS`(`open-sse/services/accountFallback.ts`)와
   충돌하는 일반적인 영어 문구는 절대 재사용하지 마세요.
2. 필요에 따라 `open-sse/config/providerErrorRules.ts`에 분류 규칙을
   등록(`providerRuleRegistry`)하여 올바른 잠금 범위(계정 전체 할당량이면
   `connection`, 모델별 오류면 `model`)를 선택합니다. 이 단계는 전체 오류
   텍스트(본문 마커)가 필요한 규칙을 가진 프로바이더에서만 프로덕션에
   적용됩니다: 같은 파일의 `FULL_TEXT_RULE_PROVIDERS`에 프로바이더 id를
   추가하세요 — 그렇지 않으면 `checkFallbackError`는 규칙에 구조화된
   `{code, type}` 오류만 전달하므로 본문 텍스트 규칙은 실제 트래픽에서 절대
   매칭되지 않습니다. 순수하게 `status`/`headers`만으로 매칭되는 규칙
   (Opencode나 Minimax의 규칙처럼)은 이 옵트인이 필요하지 않습니다. 별도로,
   규칙이 `scope: "connection"`을 선언하고 그 의도가 실제 연결 전체 쿨다운과
   동일 요청 내 콤보 건너뛰기(단순한 정보성 레이블이 아닌)라면, 같은 파일의
   `HONORS_RULE_LOCK_SCOPE_PROVIDERS`에 프로바이더 id를 추가하세요 — 바로
   이것이 `markAccountUnavailable()`(`src/sse/services/auth.ts`)와
   `applyComboTargetExhaustion()`
   (`open-sse/services/combo/targetExhaustion.ts`)에서
   `isAgentrouterConnectionQuotaScope()` 스타일 소비를 게이팅하는 요소입니다;
   이것이 없으면 `scope`는 여전히 `fallbackResult.ruleScope`를 통해
   흐르지만 이에 따라 동작하는 것은 아무것도 없습니다.
3. `tests/unit/upstream-status-restatement.test.ts`와
   `tests/unit/agentrouter-error-rules.test.ts`를 본뜬 단위 테스트를
   추가합니다(not-permanent / not-creditsExhausted 가드를 포함하고,
   프로바이더가 허용 목록을 필요로 하는 경우에는 `resolveRuleMatchBody()`가
   해당 프로바이더에 대해서만 전체 텍스트를 반환하는지 단언하는 테스트도
   포함).

`chatCore.ts`, `classifyError`, 콤보에는 변경이 필요하지 않습니다.

#### 이그레스 버킷 기반 잠금 (#10880)

`EGRESS_BUCKETED_LOCK_PROVIDERS`(opencode 계열)에 속한 프로바이더는 IP 버킷
단위 업스트림으로 처리됩니다(opencode 무료 티어는 계정 버킷이 아니라 IP 버킷
단위입니다 — #9611 참조): `quota_exhausted` **또는** `rate_limit_exceeded`로
분류된 status-429는 로테이션이 해당 연결들을 시도하기 전에, 마지막으로 알려진
이그레스 IP가 실패한 연결의 IP와 일치하는 허용 목록 계열의 모든 연결을
쿨다운시킵니다
— 이를 통해 실패가 보장된 N-1개의 업스트림 호출을 피합니다(#10460/#10525와
동일한 형태). `rate_limit_exceeded`가 의도적으로 포함된 것입니다:
`markAccountUnavailable` 경로에서는 opencode 전용 규칙이 절대 매칭되지
않고(`checkFallbackError`에 헤더/본문이 전달되지 않으며, opencode가
`FULL_TEXT_RULE_PROVIDERS`에 없음), 따라서 본문에 구독 할당량 텍스트
("monthly usage limit reached")를 포함하는 429는 `status_429` 규칙에 도달하기
전에 할당량 텍스트 폴백(`buildSubscriptionQuotaFallback`,
`accountFallback.ts`; 1시간 쿨다운)에 의해 `quota_exhausted`로 분류됩니다 —
반면 할당량 텍스트가 없는 429(순수한 레이트 리밋)는 `status_429` 규칙을 통해
`rate_limit_exceeded`로 분류되며 여전히 IP 계열을 쿨다운시킵니다. 허용 목록
프로바이더에서 IP 버킷 레이트 리밋은 할당량 소진과 동일한 신호입니다.
솔직한 한계:

- **최선 노력(best-effort)**: 이 락은 연결의 마지막으로 알려진 `egress_ip`를
  `proxy_logs`에서 조회합니다(24시간 윈도우, 동기식, 캐시 없음). 콜드
  캐시(egress IP가 한 번도 프로브된 적 없음)이거나 행이 없는 경우 → 실패한
  연결은 여전히 브랜치에 의해 쿨다운되며(현재와 동일하게 기록됨), 다만
  형제는 잠기지 않습니다.
- **종결 상태 아님**: 쿨다운은 갱신되는 할당량 윈도우
  (`testStatus: "unavailable"`)이며, IP 수준 신호에서 영구 상태는 절대
  파생되지 않습니다. `disableCooling` 연결은 이 브랜치를 완전히 건너뜁니다.
- **허용 목록 패밀리의 락 세분성 변경**: 이는 형제 최적화뿐만 아니라 범위
  변경입니다. opencode는 `passthroughModels` 프로바이더이므로, 이 브랜치
  이전에는 429가 모델 단위 잠금을 발생시켰지만 이제는 연결 쿨다운을
  발생시킵니다 — 형제가 전혀 없는 단일 연결을 운영하는 운영자의 경우도
  포함합니다. 이것이 opencode 규칙 테이블이 이미 올바르다고 선언하고 있는
  세분성(`scope: "connection"`, `providerErrorRules.ts`)이며, opencode가
  `HONORS_RULE_LOCK_SCOPE_PROVIDERS`에 없기 때문에 지금까지 한 번도
  적용되지 않았습니다. 이 브랜치는 연결 범위의 agentrouter 브랜치를
  미러링하여 실패한 연결의 쿨다운 + `backoffLevel`을 직접 기록하고
  반환합니다 — 모델 단위 블록과 아래의 일반 경로에는 절대 도달하지
  않습니다.
- **콤보 포함**: agentrouter 브랜치와 마찬가지로, 이 범위는 콤보 호출자가
  429에 적용하는 `persistUnavailableState`/`isCombo` 다운그레이드를
  의도적으로 무시합니다. 모델 단위 잠금은 이 범위의 약한 형태가 아니라
  잘못된 단위입니다: 소진된 IP에 대해서는 아무것도 말해주지 않으므로, 콤보
  로테이션은 형제마다 실패가 보장된 호출을 하나씩 계속 소모하게 됩니다.
- **형제 안전성**: 이미 종결 상태(banned/credits_exhausted)이거나 이미 더
  긴 쿨다운에 있는 형제는 절대 덮어쓰지 않습니다.
- **배타적 허용 목록**: `EGRESS_BUCKETED_LOCK_PROVIDERS`의 확장은 명시적인
  소유자 결정이며, 일반화된 와이어링은 없습니다(패턴 #10334/#10419). 형제
  쿼리는 동일한 허용 목록을 SQL 리터럴로 반복하는 대신 바인딩하므로,
  확장은 여전히 한 줄 변경으로 유지됩니다.
- **Egress IP 로테이션, 양방향**: 조회 윈도우(24시간)는 egress-IP 캐시
  TTL(5분)보다 훨씬 넓으므로, "마지막으로 알려진 IP"는 현재 상태가 아니라
  이력입니다. 연결의 프록시가 윈도우 내에서 로테이션된 경우 락이 실제로
  공유 중인 IP를 **놓칠 수** 있고(기록된 IP는 새롭고 소진되지 않은 IP),
  대칭적으로 소진된 IP에서 **이후 로테이션으로 벗어난 형제를 쿨다운시킬
  수도** 있습니다. 두 번째 경우는 해당 형제에게 쿨다운 윈도우 하나의
  비용이 들며, 둘 다 이력 기반 조회에서 수용되는 최선 노력 한계입니다.
- **비용**: `proxy_logs`에 대한 두 번의 제한된 스캔(`idx_pl_timestamp`로
  윈도우 필터링), 429 빈도에서만 발생합니다. 새 인덱스는 없습니다
  (마이그레이션 134 YAGNI). 중간 규모의 실제 트래픽 DB 복사본에서
  측정했으며, 처리량이 높은 인스턴스는 동일한 윈도우에 비례적으로 더 많은
  행을 보유합니다.

---

## 기타 복원력 기능

- **21가지 라우팅 전략** (priority, weighted, round-robin, context-relay, fill-first, p2c, random, least-used, cost-optimized, reset-aware, reset-window, expiry-first, headroom, quota-weighted, strict-random, auto, lkgp, context-optimized, cache-optimized, fusion, pipeline) — [AUTO-COMBO.md](../routing/AUTO-COMBO.md) 참조.
- **리셋 인식 라우팅** (v3.8.0) — 할당량 리셋 시간을 기준으로 연결의 우선순위를 지정합니다.
- **백그라운드 모드 저하** — Responses API의 `background: true`가 경고와 함께 동기 방식으로 저하됩니다.
- **동적 도구 제한 감지** — 도구 개수 제한에 도달하면 프로바이더를 백오프합니다.
- **긴급 폴백** — `OMNIROUTE_EMERGENCY_FALLBACK`으로 제어되며, 운영자는 재시작 없이 Feature Flags 페이지에서 재정의할 수 있습니다.

---

## 디버깅

- Weighted 콤보가 `503 all_targets_cooling_down`을 반환하는 경우 (`Retry-After`가 설정되고, `diagnostics.excluded`에 모든 대상이 `model_lockout` / `circuit_open` / `provider_cooldown` / `unavailable`로 나열됨) → 풀은 구성되고 연결되어 있으며, 모든 대상이 복원력 타이머에 의해 제외된 것뿐입니다. `[COMBO] Weighted selection: every target excluded before dispatch — …` 경고에 이유와 남은 초가 표시됩니다. 같은 콤보에서 `404 no_executable_targets`는 복원력 타이머가 관여하지 않았음을 의미합니다 (실행할 대상이 없거나 모든 계정이 가용성 프로브에 실패한 경우). `targetResolution.ts`에서 수집된 제외 항목을 바탕으로 `open-sse/services/combo/pinRecovery.ts`에 구축되었습니다.
- 프로바이더의 모든 키가 건너뛰어짐 → 서킷 브레이커 상태와 각 연결의 `rateLimitedUntil`/`testStatus`를 모두 확인하세요.
- 리셋 윈도우 이후 프로바이더가 영구적으로 제외됨 → `getStatus()`/`canExecute()` 대신 원시 `state`를 읽는 코드가 있는 경우입니다.
- 하나의 키가 실패하고 다른 키들은 작동해야 하는 경우 → 서킷 브레이커보다 연결 쿨다운을 우선적으로 확인하세요.
- 하나의 모델만 실패하는 경우 → 연결 쿨다운보다 모델 락아웃을 우선적으로 확인하세요.
- 상태가 자동으로 복구되어야 하는데 복구되지 않음 → 미래 타임스탬프와 만료된 상태를 갱신하는 읽기 경로를 확인하세요. 영구 상태는 수동 변경이 필요합니다.

---

## 런타임 상태 — 에이전트 빠른 참조

> 에이전트 가이드가 40k 컨텍스트 예산을 넘지 않도록 `AGENTS.md` → "Resilience Runtime State"에서 그대로 이동되었습니다 (PR #12743). 이것은 위 섹션들을 압축한 에이전트용 뷰이며, 번호가 매겨진 섹션들이 전체 참조로 남아 있습니다.

OmniRoute에는 서로 관련되어 있지만 구분되는 세 가지 일시적 장애 메커니즘이 있습니다. 라우팅 동작을 디버깅할 때 이들의 범위를 구분해서 다루세요. 한눈에 파악할 수 있는 맵은 [3계층 복원력 다이어그램](../diagrams/exported/resilience-3layers.svg) (소스: [diagrams/resilience-3layers.mmd](../diagrams/resilience-3layers.mmd))을 참조하세요.

### 프로바이더 서킷 브레이커

**범위**: 전체 프로바이더, 예: `glm`, `openai`, `anthropic`.

**목적**: 업스트림/서비스 수준에서 반복적으로 실패하는 프로바이더로 트래픽 전송을 중단하여, 하나의 비정상 프로바이더가 모든 요청을 느려지게 하지 않도록 합니다.

**구현**:

- 핵심 클래스: `src/shared/utils/circuitBreaker.ts`
- 채팅 게이트/실행 배선: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- 런타임 상태 API: `src/app/api/monitoring/health/route.ts`
- 공유 래퍼: `open-sse/services/accountFallback.ts`
- 영속 상태 테이블: `domain_circuit_breakers`

**상태** (4개 — `src/shared/utils/circuitBreaker.ts`):

- `CLOSED`: 정상 트래픽이 허용됩니다.
- `DEGRADED`: 조기 경고 구간 — 실패가 저하 임계값을 넘었지만 아직 브레이커 임계값에는 도달하지 않은 상태입니다. 트래픽은 계속 흐르고 대시보드에 경고가 표시됩니다. 유효한 연결 테스트가 성공하거나 새로운 실패가 없는 조용한 윈도우가 지나면 `CLOSED`로 돌아갑니다 (윈도우는 `docs/architecture/RESILIENCE_GUIDE.md`에 있음).
- `OPEN`: 프로바이더가 일시적으로 차단됩니다. 호출자는 프로바이더 서킷 오픈 응답을 받거나, 콤보 라우팅이 다른 대상으로 건너뜁니다.
- `HALF_OPEN`: 리셋 타임아웃이 경과했습니다. 프로브 요청을 허용합니다. 성공하면 브레이커가 닫히고, 실패하면 다시 열립니다.

**기본값** (`open-sse/config/constants.ts` → `PROVIDER_PROFILES`, `src/lib/resilience/settings.ts`의 `DEFAULT_RESILIENCE_SETTINGS.providerBreaker`를 통해 소비됨 → `src/sse/handlers/chatHelpers.ts`의 `getCircuitBreaker(provider, …)`). 전체 프로바이더 브레이커는 `circuitBreakerThreshold` / `circuitBreakerReset`으로 동작합니다:

| 프로필 | 저하 시점 | 개방 시점 (`circuitBreakerThreshold`) | 리셋 (`circuitBreakerReset`) |
| ------ | --------: | ------------------------------------: | ---------------------------: |
| OAuth  |       `5` |                                   `8` |                        `60s` |
| API 키 |       `7` |                                  `12` |                        `30s` |
| 로컬   |  (파생됨) |                                   `2` |                        `15s` |

`PROVIDER_PROFILES`는 `providerFailureThreshold` (10/15/2), `providerFailureWindowMs` (15/30/5분), `providerCooldownMs` (5/10/1분)도 정의합니다. 이들은 **옵트인 전역 Provider Cooldown의 윈도우 게이트**(`PROVIDER_COOLDOWN_ENABLED`, 기본값 꺼짐)를 구동합니다. `open-sse/services/providerCooldownTracker.ts`의 프로바이더 수준 항목은 `providerFailureWindowMs` 안에서 `providerFailureThreshold`회 실패한 후에야 쿨링 중으로 계산되며, 그 후 `providerCooldownMs` 동안 쿨링됩니다. 이들은 라이브 브레이커의 임계값이 아닙니다 — 브레이커 동작을 기대하며 이 값들을 튜닝하지 마세요. 모든 기본값은 `OMNIROUTE_PROVIDER_BREAKER_*` 및 `OMNIROUTE_CIRCUIT_BREAKER_*` 환경 변수로 재정의할 수 있으며, 런타임 기준으로 정확한 참조 표는 `docs/architecture/RESILIENCE_GUIDE.md`에 있습니다.

프로바이더 수준의 실패 상태만 프로바이더 브레이커를 트립해야 합니다:

```ts
(408, 500, 502, 503, 504);
```

대부분의 `401`, `403`, `429`와 같은 일반적인 계정/키/모델 오류에 대해서는 전체 프로바이더 브레이커를 트립하지 마세요. 이러한 오류는 일반적으로 연결 쿨다운 또는 모델 락아웃에 해당합니다. 일반적인 API 키 프로바이더의 `403`은 종결적인(terminal) 프로바이더/계정 오류로 분류되지 않는 한 복구 가능해야 합니다.

브레이커는 백그라운드 타이머가 아닌 지연 복구(lazy recovery)를 사용합니다. `OPEN` 상태가 만료되면 `getStatus()`, `canExecute()`, `getRetryAfterMs()` 같은 읽기 작업이 상태를 `HALF_OPEN`으로 갱신하므로, 대시보드와 콤보 후보 빌더가 만료된 프로바이더를 계속 제외하지 않습니다.

### 연결 쿨다운

**범위**: 프로바이더 연결/계정/키 하나.

**목적**: 문제가 있는 키/계정 하나를 일시적으로 건너뛰면서, 동일한 프로바이더의 다른 연결은 계속 요청을 처리할 수 있게 합니다.

**구현**:

- 쓰기/업데이트 경로: `src/sse/services/auth.ts::markAccountUnavailable()`
- 계정 선택/필터링: `src/sse/services/auth.ts::getProviderCredentials...`
- 쿨다운 계산: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 설정: `src/lib/resilience/settings.ts`

프로바이더 연결의 중요 필드:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

계정 선택 중에는 다음 조건일 때 연결이 건너뛰어집니다:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

쿨다운도 지연 방식입니다: `rateLimitedUntil`이 과거가 되면 연결은 다시 사용 가능해집니다. 성공적으로 사용되면 `clearAccountError()`가 `testStatus`, `rateLimitedUntil`, 오류 필드, `backoffLevel`을 지웁니다.

기본 연결 쿨다운 동작:

- OAuth 기본 쿨다운: `5s`.
- API 키 기본 쿨다운: `3s`.
- API 키 `429`는 가능한 경우 업스트림 재시도 힌트(`Retry-After`, 리셋 헤더, 또는 파싱 가능한 리셋 텍스트)를 우선해야 합니다.
- 반복되는 복구 가능한 실패는 지수 백오프를 사용합니다:

```ts
baseCooldownMs * 2 ** failureIndex;
```

썬더링 허드(thundering herd) 방지 가드는 동일한 연결에서의 동시 실패가 쿨다운을 반복적으로 연장하거나 `backoffLevel`을 이중으로 증가시키는 것을 방지합니다.

터미널 상태는 쿨다운이 아닙니다. `banned`, `expired`(`EXPIRED_RETRY_MAX`를 통해 N회의 제한된 재시도 후에만 터미널 상태가 됨), `credits_exhausted`는 자격 증명/설정이 변경되거나 운영자가 재설정할 때까지 사용 불가 상태로 유지되도록 의도된 것입니다. 터미널 상태를 일시적인 쿨다운 상태로 덮어쓰지 마세요.

### 모델 락아웃

**범위**: 프로바이더 + 연결 + 모델.

**목적**: 하나의 모델만 사용 불가능하거나 해당 연결에 대해 할당량 제한이 있는 경우 전체 연결을 비활성화하는 것을 방지합니다.

예시:

- 모델별 할당량 프로바이더가 `429`를 반환하는 경우.
- 로컬 프로바이더가 누락된 모델 하나에 대해 `404`를 반환하는 경우.
- 선택된 Grok 모드와 같은 프로바이더별 모드/모델 권한 실패.

모델 락아웃은 `open-sse/services/accountFallback.ts`에 있으며, 동일한 연결이 다른 모델을 계속 제공할 수 있게 합니다.

### 디버깅 가이드

- 프로바이더의 모든 키가 건너뛰어지는 경우, 프로바이더 브레이커 상태와 각 연결의 `rateLimitedUntil`/`testStatus`를 모두 확인하세요.
- 리셋 윈도우 이후에도 프로바이더가 영구적으로 제외된 것처럼 보이면, 코드가 `getStatus()`/`canExecute()`를 사용하는 대신 원시 `state`를 읽고 있는지 확인하세요.
- 프로바이더 키 하나가 실패하지만 다른 키는 작동해야 하는 경우, 프로바이더 브레이커보다 연결 쿨다운을 우선하세요.
- 하나의 모델만 실패하는 경우, 연결 쿨다운보다 모델 락아웃을 우선하세요.
- 상태가 자체 복구되어야 한다면, 미래 타임스탬프/리셋 타임아웃과 만료된 상태를 갱신하는 읽기 경로가 있어야 합니다. 영구 상태는 수동으로 자격 증명 또는 설정을 변경해야 합니다.

---

## TLS 지문 및 스텔스

프로바이더별 스텔스(JA3/JA4, CCH, 난독화)는 별도 문서로 제공됩니다 — `docs/security/STEALTH_GUIDE.md` 참조 (git에만 존재; `/docs`에 컴파일되지 않음).

---

## 복원력 테스트 (Phase 8 · Block C)

복원력 로직에 대한 단위 테스트 외에도, 세 가지 테스트가 실제 스트레스/장애 조건에서 런타임을 검증합니다 (모두 통합/나이틀리 테스트이며 PR을 차단하지 않음):

| 테스트      | 내용                                                                                                                                                        | 실행                                      |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Chaos       | 가짜 업스트림 노드가 실제 지연/리셋/타임아웃/503을 주입; 서킷 브레이커가 열리고 복구되며 `checkFallbackError`가 503을 복구 가능한 폴백으로 분류하는지 검증. | `RUN_CHAOS_INT=1 npm run test:chaos`      |
| Heap-growth | `--expose-gc` 하에서 `createSSEStream`당 약 500개의 스트림; 힙이 상한을 초과해 증가하면 실패 (OOM 가드 #3069).                                              | `npm run test:heap`                       |
| k6 soak     | `/api/monitoring/health`에 대한 지속적 부하; p95/오류 임계값.                                                                                               | `k6 run tests/load/k6-soak.js` (나이틀리) |

`.github/workflows/nightly-resilience.yml`에서 오케스트레이션됨 (cron + dispatch). 기본 `test:integration`에서는 chaos와 heap 테스트가 (`RUN_CHAOS_INT`/`--expose-gc` 없이) 자동으로 스킵됩니다.

---

## 참고

- [아키텍처 가이드](./ARCHITECTURE.md) — 시스템 아키텍처 및 내부 구조
- [사용자 가이드](../guides/USER_GUIDE.md) — 프로바이더, 콤보, CLI 통합
- [Auto-Combo 엔진](../routing/AUTO-COMBO.md) — 16요소 스코어링, 모드 팩
