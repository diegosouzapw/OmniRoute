# Account-Ban / Banned-Keyword Detection (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute는 공급자 **계정이 영구적으로 사용할 수 없는 상태**(정지 / 비활성화 / 이용약관 위반으로 차단됨)임을 나타내는 신호가 있는지 업스트림 오류 응답을 검사하고, 일치하는 경우 해당 연결을 **종결 `banned` 상태**로 전환하여 더 이상 요청에 선택되지 않도록 합니다. 이는 **Security → Banned Keywords** 설정 카드에서 구성하는 기능입니다("영구적인 계정 차단 감지를 트리거하는 추가 키워드입니다. 기본 제공 키워드는 항상 적용됩니다.").

이 페이지에서는 기본 제공 목록, 감지 흐름, 적용 범위, 사용자 지정 키워드를 안전하게 추가하는 방법, 플래그가 지정된 연결을 복구하는 방법을 설명합니다. 종결 상태 자체는 복원력 모델의 일부입니다.
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md)의 "종결 상태"를 참조하세요.

**신뢰할 수 있는 원본:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## 기본 제공 키워드

다음 8개의 부분 문자열은 사용자 지정 목록과 관계없이 항상 적용됩니다(대소문자 구분 없음).

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> 공급자가 차단 문구를 변경함에 따라 이 목록도 계속 변경됩니다. 권위 있는
> 원본은 `open-sse/services/accountFallback.ts`의 `ACCOUNT_DEACTIVATED_SIGNALS`이며,
> 위 블록은 특정 시점의 스냅샷으로 간주하세요.

동일한 파일에 서로 인접하지만 **별개인** 두 개의 신호 테이블이 있으며, 이는 차단 키워드 감지에 포함되지 _않습니다_.

- `CREDITS_EXHAUSTED_SIGNALS` — 결제 금액/할당량 소진(`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → 종결 `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **비종결** 상태이며 토큰을 새로 고치면 복구할 수 있습니다.

참고: **`rate limit`** / `429`와 같은 일반적인 일시적 문구는 속도 제한 / 연결 쿨다운 경로에서 처리되며 차단 신호가 **아닙니다**.

## 감지 흐름

```
업스트림 오류 응답
  → 본문을 문자열로 변환하고 소문자로 변경
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [부분 문자열 일치]
  → 일치하는가?
      → 연결의 testStatus = "banned"      (영구적 — 1년 쿨다운, 자동 복구되지 않음)
      → 설정 `autoDisableBannedAccounts`가 켜져 있고 `autoDisableBannedScope`가
        이 연결을 포함하는 경우(`all`, 또는 OAuth/쿠키/세션의 경우 `subscription`)
        → isActive = false도 설정됩니다. 범위가 `subscription`인 경우 선불 API 키는
        활성 상태로 유지됩니다.
      → 계정 선택 시 연결을 건너뜁니다(combo QUOTA_BLOCKING 상태)
```

- 일치는 응답 **본문**에 대한 **대소문자를 구분하지 않는 부분 문자열** 검색입니다
  (`isAccountDeactivated`, `accountFallback.ts`).
- 차단 신호가 본문에 있으면 **모든 HTTP 상태**에서 영구적인 `banned` 종결 처리가 실행됩니다(`markAccountUnavailable` → `checkFallbackError`를 통해). 더 좁은 의미의 **`deactivated`** 레이블(연결에 여분의 API 키가 없을 때 `isActive=false`)은 **HTTP 401 / 403**에서 인라인 `chatCore.ts` 경로가 기록합니다(`classifyProviderError` → `ACCOUNT_DEACTIVATED`로 분류). `markAccountUnavailable()` 경로는 동일한 `ACCOUNT_DEACTIVATED` 신호에 대해 `resolveTerminalConnectionStatus`를 통해 _다른_ 종결 상태인 **`expired`**를 기록하므로, 응답을 처리한 경로에 따라 동일한 차단이 `deactivated` 또는 `expired`로 나타날 수 있습니다. (이전 코드 주석에는 "401 본문에 이러한 문자열이 포함된 경우"라고 되어 있지만, 이는 현재 동작의 범위를 실제보다 좁게 설명합니다.)
- `banned` 연결은 종결 상태가 필터링되는 모든 위치에서 선택 대상에서 제외됩니다(`isTerminalConnectionStatus`, combo `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## 범위 — 검사되는 제공자

**모든 제공자입니다.** 이 검사는 실패한 모든 업스트림 요청이 거치는 일반 오류 처리 파이프라인에서 실행되며, OAuth/구독 스크레이퍼로 **제한되지 않습니다**. 그 결과로 생성되는 최종 상태는 제공자별이 아니라 **연결별**입니다.

다만 기본 제공 _문자열_은 실제 차단 위험이 있는 구독/OAuth 제공자(ChatGPT Web Codex, Claude Web, Codex, Muse Spark, Antigravity)를 대상으로 합니다. API 키 제공자의 경우 오류 본문에 해당 부분 문자열 중 하나가 문자 그대로 포함되어 있을 때만 감지기가 작동합니다.

`autoDisableBannedScope` (`all` | `subscription`, 기본값 `all`)는 일치 항목이 발견될 때 `isActive=false`도 설정할지 제어합니다. `subscription`은 로그인 방식의 계정 자리(유료 구독 및 무료 계정, 웹 쿠키 세션 포함)를 의미합니다. 선불 API 키에 대해서도 `testStatus=banned`는 기록하지만 라우팅 풀에는 그대로 유지합니다. 장기적인 설계는 제공자별 및 계정별 재정의이며, 전역 enum은 첫 번째 구현입니다.

## 사용자 지정 차단 키워드

**보안 → 차단 키워드**에서 키워드를 추가하거나 제거할 수 있습니다(`PATCH /api/settings`를 통해 전역 `customBannedSignals` 설정으로 영구 저장됨). 이 키워드들은 기본 제공 목록에 **추가되는** 것이며 절대 이를 대체하지 않습니다. 저장 시(그리고 시작 시) `setCustomBannedSignals()`를 통해 핫 리로드됩니다. 각 키워드는 최대 200자로 제한되며 배열 길이에는 제한이 없습니다.

**⚠ 오탐 위험 — 구체적인 문구를 선택하세요.** 감지는 전체 응답 본문을 대상으로 원시 부분 문자열 일치를 수행하며, 일치 결과는 **영구적**입니다(1년 쿨다운, 수동 복구). 너무 포괄적인 키워드는 완전히 정상적인 연결을 차단할 수 있습니다.

- **나쁜 예:** `quota`, `limit`, `error`, `denied` — 일시적인 오류에도 자주 나타납니다.
- **좋은 예:** 전체 차단 문장. 예: `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

실제 차단 시 제공자가 반환하는 문구 중 의미가 명확하면서 가장 긴 문구를 사용하세요. 확실하지 않다면 먼저 연결의 `lastError`를 확인한 다음 정확한 문구를 추가하세요.

## 플래그가 지정된 연결 복구

최종 `banned` / `deactivated` 상태는 **절대 자동 복구되지 않습니다**(선제적 복구 틱에서 제외되며, `unavailable` 쿨다운만 자체적으로 복구됩니다). 운영자가 명시적으로 해제해야 합니다.

1. **연결 다시 테스트** — 대시보드의 **테스트** 작업
   (`POST /api/providers/{id}/test`). 프로브에 성공하면 `testStatus`가
   `active`로 재설정되고 오류 필드가 지워집니다.
2. **재인증 / 자격 증명 편집** — OAuth 제공자의 경우 로그인
   / 갱신 흐름을 다시 실행합니다. 제공자 생성/가져오기 라우트는 `isActive = true`를 설정합니다.
3. **연결 다시 활성화** — 자동 비활성화로 `isActive = false`가 설정된 경우
   (범위가 `all`이거나 OAuth/쿠키/세션 연결에 대해 `subscription`인 경우),
   계정을 수정한 후 다시 켭니다.

별도의 "차단 플래그 해제" 버튼은 없습니다. 복구는 재테스트, 재인증 또는 재활성화를 통해 이루어지며, 이는 [RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md)의 일반적인 최종 상태 규칙을 따릅니다.

## 프로브 격리(모델 전체 테스트)

`runAsProbe` 내부에서 실행되는 **프로브 기원 실패**(모델 전체 테스트 / 상태 점검 디스패치)는 연결을 풀에서 제거하지 않습니다(#9817). 이는 **가시성을 위해 기록**되지만(`last_error`, `last_error_type`, `error_code`,
`last_error_at`) 쿨다운, 최종 상태(`banned` / `deactivated` / `credits_exhausted`), 모델별 잠금, 제공자 회로 차단기, 5분 할당량 캐시, OAuth 토큰 갱신 및 자동 비활성화를 포함한 **모든** 라우팅 변경을 건너뜁니다. 실제 요청 경로의 실패만 비활성화를 발생시킵니다. 기록된 오류를 통해 플래그가 지정된 계정이 계속 트래픽을 처리하는 동안에도 대시보드에 표시됩니다.

단일 결정 지점은 `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`)이며, 프로브 기원 실패로 인해 라우팅 상태를 변경할 수 있는 **모든** 위치에서 이를 확인합니다.

- `markAccountUnavailable` (`auth.ts`) — 기록만 수행(`lastError` 원시 텍스트,
  `lastErrorType`, `errorCode`, `lastErrorAt`; 선택 시 자동 감쇠를 유발하여
  기록을 지울 수 있는 `backoffLevel`은 의도적으로 **기록하지 않음**)
- `maybeAutoDisableBannedAccount` — 자동 비활성화하지 않음
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED(기록만 수행하고
  최종 `credits_exhausted` 상태로 설정하지 않음), GEO_BLOCKED(24시간 제외 없음),
  MODEL_NOT_FOUND(`lockModel` 호출 없음), codex 429 계정 순환 장애 조치
  (`markCodexScopeRateLimited` 호출 없음, `rate_limited_until` 영구 저장 없음,
  세션 선호도 해제 없음), `persistCodexQuotaState`(할당량 상태 쓰기 없음,
  캐시 무효화 없음), `recordKeyHealthStatus`(키 상태 로테이터를
  변경하지 않음)
- OAuth 갱신 — 실행기 기반 클래스의 선제적 갱신
  (`base.ts` `execute()`, 갱신 토큰 순환을 소비하지 않음)과
  `chatCore`의 반응형 401/403 경로(`expired` 비활성화 없음) 모두 해당
- `chat.ts` — 제공자 회로 차단기와 5분 할당량 캐시
  (`markAccountExhaustedFrom429`)를 절대 저하하지 않음

기록된 오류를 통해 플래그가 지정된 계정이 계속 트래픽을 처리하는 동안에도 대시보드에 표시됩니다. 참고: 프로브 기록에는 실제 경로의 `slice(0,100)` 잘림과 달리 **원시**(잘리지 않은) 오류 텍스트가 저장됩니다.

전체 테스트를 유지보수 도구로 사용하는 운영자는 다음 방법 중 하나를 통해 과거 동작(프로브를 실제 생성으로 간주)을 복원할 수 있습니다.

- `probeCanDisable` 설정(`{"probeCanDisable": true}`를 사용해
  `POST /api/settings`를 호출하거나 `key_value` DB를 직접 편집), 또는
- 기능 플래그 **`PROBE_CAN_DISABLE=true`**(환경 변수 또는 DB 재정의이며,
  설정값보다 우선함).

장애 안전성: 플래그 또는 설정 조회 중 예외가 발생하면 격리는 활성화된 상태로 유지됩니다.

## 소스 파일

| 관심 영역                      | 파일                                                                                                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| 신호 테이블 + 일치 처리        | `open-sse/services/accountFallback.ts`                                                                        |
| 종료 상태 처리 / 영속화        | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| 자동 비활성화 범위             | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| 인라인 분류                    | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| 종료 상태 복구 제외            | `src/lib/quota/connectionRecovery.ts`                                                                         |
| 사용자 지정 키워드 런타임 로드 | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| 설정 UI                        | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
