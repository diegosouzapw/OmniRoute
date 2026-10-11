# Feature Flags (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/FEATURE_FLAGS.md) · 🇪🇹 [am](../../../am/docs/reference/FEATURE_FLAGS.md) · 🇸🇦 [ar](../../../ar/docs/reference/FEATURE_FLAGS.md) · 🇦🇿 [az](../../../az/docs/reference/FEATURE_FLAGS.md) · 🇧🇬 [bg](../../../bg/docs/reference/FEATURE_FLAGS.md) · 🇧🇩 [bn](../../../bn/docs/reference/FEATURE_FLAGS.md) · 🇧🇦 [bs](../../../bs/docs/reference/FEATURE_FLAGS.md) · 🇨🇿 [cs](../../../cs/docs/reference/FEATURE_FLAGS.md) · 🇩🇰 [da](../../../da/docs/reference/FEATURE_FLAGS.md) · 🇩🇪 [de](../../../de/docs/reference/FEATURE_FLAGS.md) · 🇬🇷 [el](../../../el/docs/reference/FEATURE_FLAGS.md) · 🇪🇸 [es](../../../es/docs/reference/FEATURE_FLAGS.md) · 🇪🇪 [et](../../../et/docs/reference/FEATURE_FLAGS.md) · 🇮🇷 [fa](../../../fa/docs/reference/FEATURE_FLAGS.md) · 🇫🇮 [fi](../../../fi/docs/reference/FEATURE_FLAGS.md) · 🇫🇷 [fr](../../../fr/docs/reference/FEATURE_FLAGS.md) · 🇮🇪 [ga](../../../ga/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [gu](../../../gu/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ha](../../../ha/docs/reference/FEATURE_FLAGS.md) · 🇮🇱 [he](../../../he/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [hi](../../../hi/docs/reference/FEATURE_FLAGS.md) · 🇭🇷 [hr](../../../hr/docs/reference/FEATURE_FLAGS.md) · 🇭🇺 [hu](../../../hu/docs/reference/FEATURE_FLAGS.md) · 🇦🇲 [hy](../../../hy/docs/reference/FEATURE_FLAGS.md) · 🇮🇩 [id](../../../id/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [ig](../../../ig/docs/reference/FEATURE_FLAGS.md) · 🇮🇹 [it](../../../it/docs/reference/FEATURE_FLAGS.md) · 🇯🇵 [ja](../../../ja/docs/reference/FEATURE_FLAGS.md) · 🇬🇪 [ka](../../../ka/docs/reference/FEATURE_FLAGS.md) · 🇰🇭 [km](../../../km/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [kn](../../../kn/docs/reference/FEATURE_FLAGS.md) · 🇱🇹 [lt](../../../lt/docs/reference/FEATURE_FLAGS.md) · 🇱🇻 [lv](../../../lv/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ml](../../../ml/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [mr](../../../mr/docs/reference/FEATURE_FLAGS.md) · 🇲🇾 [ms](../../../ms/docs/reference/FEATURE_FLAGS.md) · 🇲🇹 [mt](../../../mt/docs/reference/FEATURE_FLAGS.md) · 🇲🇲 [my](../../../my/docs/reference/FEATURE_FLAGS.md) · 🇳🇵 [ne](../../../ne/docs/reference/FEATURE_FLAGS.md) · 🇳🇱 [nl](../../../nl/docs/reference/FEATURE_FLAGS.md) · 🇳🇴 [no](../../../no/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [or](../../../or/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [pa](../../../pa/docs/reference/FEATURE_FLAGS.md) · 🇵🇭 [phi](../../../phi/docs/reference/FEATURE_FLAGS.md) · 🇵🇱 [pl](../../../pl/docs/reference/FEATURE_FLAGS.md) · 🇵🇹 [pt](../../../pt/docs/reference/FEATURE_FLAGS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/FEATURE_FLAGS.md) · 🇷🇴 [ro](../../../ro/docs/reference/FEATURE_FLAGS.md) · 🇷🇺 [ru](../../../ru/docs/reference/FEATURE_FLAGS.md) · 🇱🇰 [si](../../../si/docs/reference/FEATURE_FLAGS.md) · 🇸🇰 [sk](../../../sk/docs/reference/FEATURE_FLAGS.md) · 🇸🇮 [sl](../../../sl/docs/reference/FEATURE_FLAGS.md) · 🇷🇸 [sr](../../../sr/docs/reference/FEATURE_FLAGS.md) · 🇸🇪 [sv](../../../sv/docs/reference/FEATURE_FLAGS.md) · 🇰🇪 [sw](../../../sw/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [ta](../../../ta/docs/reference/FEATURE_FLAGS.md) · 🇮🇳 [te](../../../te/docs/reference/FEATURE_FLAGS.md) · 🇹🇭 [th](../../../th/docs/reference/FEATURE_FLAGS.md) · 🇹🇷 [tr](../../../tr/docs/reference/FEATURE_FLAGS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/FEATURE_FLAGS.md) · 🇵🇰 [ur](../../../ur/docs/reference/FEATURE_FLAGS.md) · 🇺🇿 [uz](../../../uz/docs/reference/FEATURE_FLAGS.md) · 🇻🇳 [vi](../../../vi/docs/reference/FEATURE_FLAGS.md) · 🇳🇬 [yo](../../../yo/docs/reference/FEATURE_FLAGS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/FEATURE_FLAGS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/FEATURE_FLAGS.md)

---

> 재배포 **없이** OmniRoute의 동작을 변경하는 런타임 토글입니다.
> 여기에 나열된 모든 플래그는
> [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)에
> 정의되어 있으며, 이 파일이 단일 진실 공급원입니다. 대시보드와 REST API 모두
> 해당 파일을 읽으므로 아래 표는 이 파일과 1:1로 일치하도록 생성됩니다.

---

## 기능 플래그란?

기능 플래그는 런타임에 값을 변경하여 데이터베이스에 영구 저장할 수 있는 이름이 지정된 토글(boolean 또는 enum)이며, 프로세스를 재배포할 필요가 없습니다. 각 플래그는 `key`, `label`,
`description`, `category`, `defaultValue`, `type`, `requiresRestart` 힌트를 포함하는 `FeatureFlagDefinition`으로 설명됩니다.

### 결정 우선순위

플래그의 **유효 값**은
[`resolveFeatureFlag()`](../../src/shared/utils/featureFlags.ts)에 의해 다음
우선순위로 결정됩니다(위쪽 항목이 우선함).

1. **DB 재정의** — `feature_flags` 네임스페이스 아래의 `key_value` 테이블에
   저장된 값입니다(대시보드 또는 REST API를 통해 설정).
2. **환경 변수** — 설정되어 있고 비어 있지 않은 경우의 `process.env[<KEY>]`.
3. **정의의 기본값** — `featureFlagDefinitions.ts`의 `defaultValue`.

boolean 플래그는 유효 값이 `"true"`, `"1"` 또는 `"yes"`일 때
**활성화**된 것으로 간주됩니다(`isFeatureFlagEnabled()` 참조).

> [!NOTE]
> 대부분의 플래그에는 [`ENVIRONMENT.md`](./ENVIRONMENT.md)에 문서화된
> **동일한 이름**의 환경 변수도 있습니다. 플래그의 DB 재정의 값은 해당 환경 변수보다
> 우선합니다. `requiresRestart: true`인 플래그는 즉시 영구 저장되지만 프로세스가
> 시작될 때만 다시 읽힙니다. 이 플래그를 전환하면 대시보드에 **"서버 다시 시작"**
> 배너가 표시됩니다.

---

## 플래그 카탈로그

6개 카테고리에 걸쳐 82개의 플래그가 있습니다. **기본값**은 정의에 지정된 기본값으로, DB 재정의나 환경 변수가
모두 없을 때 사용되는 값입니다.

### 보안 (10)

| 키                                      | 유형   | 기본값   | 설명                                                                                                                                                                                                                                                                 |
| --------------------------------------- | ------ | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | 불리언 | `false`  | 들어오는 모든 요청에 API 키를 요구합니다.                                                                                                                                                                                                                            |
| `INPUT_SANITIZER_ENABLED`               | 불리언 | `true`   | 모든 요청에 대한 입력 무해화를 활성화합니다.                                                                                                                                                                                                                         |
| `INJECTION_GUARD_MODE`                  | 열거형 | `off`    | 프롬프트 인젝션 방어 모드입니다. 값: `off`, `warn`, `block`, `redact`.                                                                                                                                                                                               |
| `PII_REDACTION_ENABLED`                 | 불리언 | `false`  | 요청에서 PII를 마스킹합니다(`INPUT_SANITIZER_MODE`와 독립적).                                                                                                                                                                                                        |
| `PII_RESPONSE_SANITIZATION`             | 불리언 | `false`  | 공급자 응답에서 PII를 무해화합니다.                                                                                                                                                                                                                                  |
| `PII_RESPONSE_SANITIZATION_MODE`        | 열거형 | `redact` | PII 응답 무해화 모드입니다. 값: `redact`, `warn`, `block`, `off`.                                                                                                                                                                                                    |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | 불리언 | `true`   | 레거시 별칭: 이 플래그의 대시보드 토글에 저장된 값은 환경 변수보다 먼저 읽힙니다. 둘 중 하나에 `false`, `0`, `no` 또는 `off`가 설정되면 `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`와 마찬가지로 아웃바운드 URL 보호 기능의 호스트 검사가 비활성화됩니다.                |
| `ALLOW_API_KEY_REVEAL`                  | 불리언 | `false`  | 인증된 대시보드 사용자가 마스킹된 값만 보는 대신 저장된 API 키를 표시할 수 있도록 허용합니다.                                                                                                                                                                        |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | 불리언 | `false`  | AUTH 로그 줄에 계정 접두사를 포함합니다(예: "Using <provider> account: abc12345..."). 공유/멀티테넌트 프로세스 로그에서 계정 식별자가 마스킹되도록 기본적으로 비활성화되어 있습니다. 디버그 모드와는 독립적이며, 디버그 모드를 전환해도 이 정보가 표시되지 않습니다. |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | 불리언 | `false`  | OIDC가 활성화된 경우 사용자가 OIDC Single Sign-On을 통해서만 인증할 수 있도록 비밀번호 로그인을 비활성화합니다. 비활성화된 경우(기본값) 비밀번호 로그인과 OIDC를 모두 사용할 수 있습니다.                                                                            |

### 네트워크 (23)

| 키                                              | 유형    | 기본값  | 재시작 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------------------------------- | ------- | ------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓      | TLS 지문 은폐 모드를 활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |        | /v1/audio/* 경로에서 localhost 외부에 호스팅된 OpenAI 호환 제공자 노드를 사용할 수 있도록 허용합니다. 기본적으로 비활성화되어 있습니다. 오디오를 원격 호스트로 라우팅하면 송신 ID가 변경되므로 운영자가 명시적으로 결정해야 합니다. 루프백 노드는 항상 허용되며 영향을 받지 않습니다.                                                                                                                                                                            |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |        | POST /v1/rerank(및 메모리 엔진의 루프백 재순위화 단계)에서 localhost 외부에 호스팅된 OpenAI 호환 제공자 노드를 사용할 수 있도록 허용합니다. 기본적으로 비활성화되어 있습니다. 원격 호스트로 라우팅하면 송신 ID가 변경되므로 운영자가 명시적으로 결정해야 합니다. 루프백 노드는 항상 허용되며, 원격 노드는 제공자의 아웃바운드 URL 정책도 통과해야 합니다.                                                                                                        |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |        | 연결에 프록시가 할당되지 않은 경우 레지스트리에서 작동하는 첫 번째 프록시를 자동으로 선택합니다. 기본적으로 비활성화되어 있습니다. 그렇지 않으면 레지스트리의 모든 프록시가 전역 폴백이 됩니다(#3332).                                                                                                                                                                                                                                                           |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |        | 프록시 도달 가능성 사전 검사가 실패할 때 OAuth 및 제공자 검증 흐름이 고정된 프록시를 우회하여 직접 연결할 수 있도록 허용합니다. 송신 IP가 변경될 수 있으므로 기본적으로 비활성화되어 있습니다.                                                                                                                                                                                                                                                                   |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |        | 다중 계정 로테이션 실행기에서 네트워크 예외(시간 초과, 연결 거부/재설정)가 발생했을 때 실패한 계정에 전용 프록시가 없으면, 각 계정을 재시도하는 대신 짧은 쿨다운을 적용하고 해당 요청의 나머지 처리 동안 프록시가 없는 다른 계정을 건너뜁니다. 기본적으로 활성화되어 있습니다(안전함: 송신 IP는 변경되지 않으며 공유 송신 계정의 지연 시간/쿨다운 위험만 줄입니다). 프록시가 없는 첫 번째 예외 발생 시 즉시 전파하는 동작을 복원하려면 비활성화하십시오.         |
| `ROTATION_ATTRIBUTION`                          | boolean | `false` |        | Opencode 로테이션에서 어떤 계정이 요청을 처리했거나 건너뛰어졌는지 기록하고(마스킹된 ID만 사용하며 전체 계정 ID는 절대 사용하지 않음), 프록시 로그 항목을 해당 요청에 연결하여 운영자가 건너뛴 계정과 사용되지 않은 계정을 구분할 수 있게 합니다. 기본적으로 비활성화되어 있습니다.                                                                                                                                                                              |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `true`  |        | 프록시 풀과 opencode의 계정별 로테이션에서 방금 실패한 프록시(TCP 프로브 거부 또는 해당 프록시를 통해 수신된 429)를 프로세스별 기간 동안 다시 제공하지 않습니다. 이 기간은 실패가 반복될 때마다 두 배로 늘어나며 상한이 있습니다. 프록시 상태는 기록되지 않으며, 모든 후보가 제외되면 선택 결과는 변경되지 않습니다. 기본적으로 활성화되어 있으며, `false`로 설정하면 일반 선택 방식이 복원됩니다.                                                               |
| `PROXY_POOL_SHARED_EGRESS_ORDER`                | boolean | `false` |        | 할당량이 송신 주소별로 버킷화되는 제공자의 경우, 최근 거부된 멤버에서 관찰된 송신 주소를 공유하는 풀 멤버의 우선순위를 정상 멤버 바로 아래로 지정합니다. 순서만 조정하며 절대 제외하지 않습니다. 이 기능이 읽는 거부 신호를 생성하는 `PROXY_SKIP_RECENTLY_FAILED`가 필요합니다. 기본적으로 비활성화되어 있습니다.                                                                                                                                                |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |        | 대시보드의 프록시 풀 아래에 지난 24시간 동안 해당 멤버에 서비스를 제공한 관찰된 송신 IP 수와 이를 사용한 연결 수를 표시합니다. 읽기 전용이며 프록시 로그에서 계산되고 라우팅에는 사용되지 않습니다. 기본적으로 비활성화되어 있습니다.                                                                                                                                                                                                                            |
| `PROXY_OPERATOR_EGRESS_ENABLED`                 | boolean | `false` |        | 운영자가 각 풀 멤버에 대해 푸시한 날짜가 지정된 관찰 주소를 수락하고, 표시 및 풀 순서 지정에 사용하기 위해 저널에서 읽은 주소와 병합합니다. 기본적으로 비활성화되어 있으며, 푸시 경로는 404로 응답하고 풀 읽기는 이전과 정확히 동일하게 동작합니다.                                                                                                                                                                                                              |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |        | OpenCode 실행기의 경우 스트리밍된 Responses 응답의 첫 번째 본문 바이트를 감시합니다(시간 범위: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`, 기본값 `15000`). 시간 범위를 넘도록 아무 데이터도 보내지 않는 2xx Responses 스트림은 정체된 것으로 처리됩니다. 즉, 계정에 쿨다운을 적용하고 요청을 다음 계정으로 한 번 전환하며, 두 번째 정체 발생 시 즉시 실패합니다. 기본적으로 비활성화되어 있으며, 정체된 스트림은 현재와 마찬가지로 스트림 준비 시간 제한까지 대기합니다. |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |        | OpenCode 실행기: `user_blocked` 거부가 포함된 403/451 응답(지역 제한이나 Cloudflare 지문 거부가 아닌 경우)이 발생하면 거부된 계정에 쿨다운을 적용하고 요청당 최대 한 번 다음 계정으로 전환합니다. 두 번째 거부는 성공 표시 없이 그대로 반환됩니다. 기본적으로 비활성화되어 있습니다. 업스트림 사용자 차단을 우회하여 라우팅하면 회피 행위로 보일 수 있으며 전체 계정군에 플래그가 확산될 수 있습니다.                                                            |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |        | OpenCode 전환: 일시적인 업스트림 실패(5xx 또는 빈 400)가 연속으로 두 번 발생하면 다음 계정으로 넘어가기 전에 일시 중지합니다. 추가 실패마다 1.5초부터 두 배씩 늘어나며, 일시 중지당 최대 6초 및 요청당 최대 10초로 제한되고 클라이언트 연결 해제 시에는 건너뜁니다. 실패한 본문은 대기 전에 해제됩니다. 기본적으로 비활성화되어 있으며, 장애 조치는 즉시 수행됩니다.                                                                                             |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |        | OpenCode 전환: 일시적인 429가 반복해서 발생하거나 새로운 풀 부하 마커가 있으면 하트비트와 함께 요청을 보류한 다음, 전체 계정군으로 확산하는 대신 순차 계정 최대 3개로 제한된 단일 구간을 재실행합니다. 기본적으로 비활성화되어 있으며, 모든 429는 이전과 정확히 동일하게 다음 계정으로 전환됩니다.                                                                                                                                                               |
| `STREAM_READINESS_STALL_RETRY`                  | boolean | `false` |        | 스트리밍 채팅: 사용 가능한 이벤트를 생성하기 전에 첫 번째 업스트림 본문이 정체되면 동일한 준비 시간 예산과 계정 페널티 없이 같은 라우팅 경로를 통해 제한된 두 번째 시도를 한 번 수행합니다. 기본적으로 비활성화되어 있으며, 첫 번째 본문이 정체되면 재시도 없이 요청이 실패합니다.                                                                                                                                                                               |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |        | 변환된 스트리밍 턴에서 업스트림 턴에 사용 가능한 콘텐츠가 없으면(추론 전용 완료 또는 유의미한 청크가 0개인 경우), 클라이언트에 아무것도 노출하기 전에 일반 자격 증명 경로를 통해 제한적으로 재시도합니다(최대 `STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`). 기본적으로 비활성화되어 있으며, 빈 턴은 현재 동작(빈 200 또는 빈 콘텐츠 502)을 유지합니다.                                                                                                                |
| `OPENCODE_POOL_RESELECT`                        | boolean | `false` |        | OpenCode 전환: 주변 풀 컨텍스트에서 프록시가 없는 계정이 송신 주소별로 버킷화되는 제공자로부터 429를 받은 경우, 동일한 송신 주소를 다시 시도하는 대신 다음 시도에서 다른 멤버를 사용하도록 연결 풀에 요청합니다. 순서만 조정하며 절대 제외하지 않습니다. 풀이 고갈되면 현재 동작을 유지합니다. 기본적으로 비활성화되어 있으며, 모든 429는 이전과 정확히 동일하게 다음 계정으로 전환됩니다.                                                                       |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |        | OpenCode 로테이션: 실제 속도 제한으로 분류된 첫 번째 429(해석 가능한 `Retry-After` 또는 속도/사용량 제한을 명시한 본문)에서 계정 순회를 중단하고 해당 업스트림 429를 변경 없이 반환합니다. 분류되지 않은 429에서는 계속 로테이션합니다. 기본적으로 꺼져 있습니다. 무료 티어는 송신 IP별로 제한되므로(#9611), 모든 429에서 로테이션하며 모든 계정이 소진되면 마지막 업스트림 429를 반환합니다.                                                                    |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓      | MITM 프록시의 TLS 인증서 검증을 비활성화합니다. **위험합니다.**                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |        | 공급자 URL 검증, 모델 검색, 공급자 노드 기본 URL, 프록시 폴백 테스트에서 클라우드 메타데이터 차단을 포함한 아웃바운드 URL 가드의 호스트 검사를 끄고 비공개 웹훅 대상을 허용합니다. 로컬 및 LAN URL은 검증, 검색, 공급자 노드 경로에서 이미 기본적으로 허용됩니다(`OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`). 프록시 폴백 테스트와 비공개 웹훅 대상은 `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`만 확인하며, 이 옵션이 꺼져 있으면 로컬/LAN 호스트를 차단합니다.         |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |        | 로컬/비공개 주소(127.0.0.1, localhost, LAN)의 공급자 URL을 허용합니다. 기본적으로 켜져 있습니다(로컬 우선). 이 경우 가드는 클라우드 메타데이터 엔드포인트(169.254.0.0/16 전체 및 알려진 메타데이터 호스트 이름)를 차단합니다. 공개 주소만 엄격하게 허용하려면 비활성화하세요. 그러면 비공개 및 루프백 호스트도 차단됩니다.                                                                                                                                       |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓      | Claude Code 호환 공급자 모드를 활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                     |

### 정책 (5)

| 키                              | 유형    | 기본값     | 설명                                                                                                                                                                           |
| ------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `TOOL_POLICY_MODE`              | enum    | `disabled` | 도구 사용 정책 적용 모드입니다. 값: `disabled`, `warn`, `block`.                                                                                                               |
| `RATE_LIMIT_AUTO_ENABLE`        | boolean | `false`    | 사용 패턴에 따라 속도 제한을 자동으로 활성화합니다.                                                                                                                            |
| `DISABLE_CONTEXT_WINDOW_CHECKS` | boolean | `false`    | 직접 단일 모델 요청에 대한 OmniRoute의 로컬 컨텍스트 창/최대 입력 토큰 검사를 건너뜁니다. 업스트림 제한은 계속 적용됩니다.                                                     |
| `CAPABILITY_FILTER_ENABLED`     | boolean | `false`    | 대상 모델에 필요한 기능(비전, 도구, 구조화된 출력, 컨텍스트 창)이 없으면 디스패치 전에 요청을 거부합니다. 콤보 계층 호환성 필터를 우회하는 직접 단일 공급자 요청을 보호합니다. |
| `RADAR_ENABLED`                 | boolean | `false`    | OmniRoute Radar 모듈(카탈로그 피드 화면 및 동기화)을 활성화합니다. 기본적으로 꺼져 있으며, 활성화해도 UI만 사용할 수 있게 됩니다. 데이터 동기화는 별도로 옵트인해야 합니다.    |

### 런타임 (34)

| 키                                          | 유형    | 기본값  | 재시작 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------------------- | ------- | ------- | ------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |        | 콤보 라우팅이 모델을 전환할 때 대화 요약을 생성하고 주입합니다. 모델 전환을 독립적으로 처리하고 기존 및 향후의 모든 콤보에 대한 백그라운드 핸드오프 요청을 방지하려면 비활성화하세요.                                                                                                                                                                                                                                                                                                                                                                                                   |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |        | 클라이언트에 전달하기 전에 Responses API 패스스루 스트림에서 내부 코멘터리 단계 출력 항목을 제거합니다. 원시 업스트림 코멘터리를 수신하려면 비활성화하세요.                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `false` |        | MCP 도구 액세스에 범위 제한을 적용합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |        | 토큰 사용량을 줄이기 위해 MCP 도구 설명을 압축합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |        | 런타임에서 백그라운드 작업 처리를 활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓      | 모든 백그라운드 서비스(할당량 새로 고침, 동기화 등)를 비활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |        | 검증 없이 프로젝트 수준 RTK 필터를 신뢰합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓      | 가져올 때 실시간 대시보드 WebSocket 서버를 시작합니다(기본 포트: 20132).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |        | Codex가 Responses-over-WebSocket 전송 방식을 사용하도록 허용합니다. 비활성화하면 Codex는 HTTP Responses로 대체합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |        | Codex가 로컬 app-server WebSocket JSON-RPC 전송 방식(codexTransport=app-server)을 사용하도록 허용합니다. 비활성화하면 app-server 사용을 선택한 연결은 Codex의 다른 전송 방식으로 대체됩니다.                                                                                                                                                                                                                                                                                                                                                                                            |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |        | 예산이 소진된 요청을 비상용 무료 대체 공급자/모델로 라우팅합니다. (아래의 [비상 예산 대체](#emergency-budget-fallback)를 참조하세요.)                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |        | 응답 바이트가 클라이언트에 도달하기 전에 잘린 업스트림 SSE 스트림을 투명하게 조기 재시도하도록 활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |        | 바이트가 이미 클라이언트에 도달한 후 스트림 복구를 위해 응답을 다시 요청하고 이어 붙이도록 허용합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |        | 스트림 중간 연속 처리를 도구 호출에 안전하게 만듭니다. 도구 호출이 생성된 후에는(진행 중이거나 `finish_reason`이 `tool_calls`로 이미 완료된 경우) 중단된 스트림을 절대 재개하지 않으며, 전체 예산을 소모하는 대신 한 번의 빈 연속 응답 후 종료합니다. 비활성화: 릴리스 동작.                                                                                                                                                                                                                                                                                                            |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |        | SSE 스트림이 유용한 프레임을 하나도 내보내기 전에 종료되고 제한된 동일 연결 재시도까지 소진된 경우, 형제 연결로 한 번 장애 조치합니다. 사용 가능한 형제 연결이 없으면 원래의 `STREAM_EARLY_EOF` 502가 반환됩니다. 기본값은 비활성화입니다. 비활성화하면 동일 연결 재시도 후 조기 EOF가 최종 오류로 유지됩니다.                                                                                                                                                                                                                                                                          |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |        | `/v1/models` 응답에 표시하기 편한 이름 필드를 포함합니다. 모델 ID만 예상하는 클라이언트의 경우 비활성화하세요.                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |        | /v1/models에서 모델 ID에 접두사를 붙이는 방식을 제어합니다. 'dual'(기본값)은 이전 버전과의 호환성을 위해 별칭 접두사와 정식 공급자 ID 접두사를 모두 내보냅니다. 'alias'는 짧은 별칭 접두사만 내보냅니다(예: deepseek-web/model이 아닌 ds-web/model). 'canonical'은 전체 공급자 ID 접두사만 내보냅니다. 값: `dual`, `alias`, `canonical`.                                                                                                                                                                                                                                                |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |        | 모델 인텔리전스 순위를 위해 Arena AI 리더보드 ELO를 주기적으로 동기화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |        | Claude Code 게이트웨이의 모델 탐색에 Claude가 아닌 모델도 표시되도록 `/v1/models`에 `claude/<provider>/<model>` 미러 ID를 노출합니다. 3단계 게이트의 전역 수준입니다(env가 대시보드 재정의보다 우선함). [Claude Code 구성](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)을 참조하세요.                                                                                                                                                                                                                                       |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |        | no-think/<provider>/<model> 게이트웨이 별칭의 마스터 스위치입니다. 활성화(기본값): /v1/models는 적합한 모든 사고 지원 Claude 모델에 대해 사고하지 않는 변형을 노출하며, 요청에 전송된 no-think/ ID는 추론이 억제된 실제 모델로 다시 확인됩니다. 비활성화: 변형이 노출되지 않으며 no-think/ ID는 다른 알 수 없는 모델 ID와 동일하게 처리됩니다. 활성화된 동안에도 모델별 ModelSpec.noThinkingAlias 옵트인/옵트아웃이 적용됩니다.                                                                                                                                                         |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |        | /v1/models 카탈로그에서 사고 수준 변형(예: -low, -medium, -high) 생성을 비활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓      | 공급자 디스패치를 위해 테넌트별 적응형 가상 승인 레인을 활성화합니다(#9654). 이제 한 테넌트의 요청 폭주로 인해 다른 테넌트에 503이 발생하지 않습니다. `OMNIROUTE_CHAT_VIRTUAL_LANES` env var가 이 대시보드 재정의보다 우선하며, 변경 사항은 서버 재시작 시 적용됩니다.                                                                                                                                                                                                                                                                                                                  |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |        | 정식 소유자에게 활성 자격 증명이 없지만 활성 자격 증명이 있는 패스스루 게이트웨이가 라우팅하는 모델에 대해 /v1/models에 <gateway-alias>/<model> 미러 ID를 표시합니다. 경고: 전역으로 활성화하면 모든 클라이언트의 카탈로그에 항목이 추가됩니다.                                                                                                                                                                                                                                                                                                                                         |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |        | New-API / One-API / Sub2API 애그리게이터 호환 노드에 대한 잔액 감지를 활성화합니다. 활성화하면 애그리게이터 플래그가 설정된 호환 노드가 대시보드 및 할당량 사전 확인 라우팅에 잔액을 보고합니다.                                                                                                                                                                                                                                                                                                                                                                                        |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |        | 모델이 클라이언트에서 사용할 수 있는 응답을 반환할 때까지 비스트리밍 방식의 서버 소유 도구 호출을 계속합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |        | 검색 통계와 최근 검색에서 아직 활성 연결이 있는 제공자만 집계합니다(duckduckgo-free처럼 키가 필요 없는 제공자는 항상 집계됨). 비활성화하면 제공자 ID가 있는 보존된 모든 검색 행을 유지합니다.                                                                                                                                                                                                                                                                                                                                                                                           |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |        | 대시보드 제공자 페이지: 제공자가 실제로 지원하는 신호에만 무료 배지를 표시합니다. 문서화된 무료 티어가 없는 등록 제공자의 표시 이름 기반 추론, 불리언이 아닌 무료 필드, :free 접미사는 제외됩니다. 비활성화하면 기존 배지 규칙을 유지합니다.                                                                                                                                                                                                                                                                                                                                            |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |        | 집계된 429/503 사용 불가 응답에서 구체적인 향후 재시도 시각을 알 수 없는 경우, 인위적인 1초 값 대신 `Retry-After`를 생략하고 `error.retry_after_provenance`(`signal` \| `none`)를 추가하며, 콤보 드레인 경로가 JSON 및 일반 텍스트 업스트림 본문의 서술형 재시도 힌트를 읽도록 합니다. 이 필드는 `unavailableResponse()`로 생성된 응답에만 나타나며, 다른 429/503 본문은 변경되지 않습니다.                                                                                                                                                                                             |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |        | 할당량 소진 시에만 폴백하도록 표시된 `priority` 콤보 대상이 할당량 문제가 아님이 명백한 원인(제공자 회로 차단기 열림, 예측 지연 시간으로 인한 건너뛰기)으로 콤보를 중단하면, 할당량 문제처럼 보이는 503 대신 502로 응답합니다. 잠금, 쿨다운, 사용 불가, 소진 및 동시성 상한으로 인한 중단은 계속 503을 사용합니다.                                                                                                                                                                                                                                                                      |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |        | 별도의 Mistral 401(`{"detail":"Unauthorized"}`, 명시적인 인증 신호 없음)은 폐기된 키와 할당량이 소진된 키에서 동일하게 나타납니다. 활성화하면 연결을 `expired`로 지정해 정지시키는 대신 쿨다운하며, 연결당 시간당 최대 3회까지 적용합니다. 그다음 발생 시에는 정지시키므로 폐기된 키도 결국 정지 상태에 도달합니다. 기본값은 비활성화이며, 이전과 마찬가지로 별도의 Mistral 401이 발생할 때마다 연결을 정지시킵니다.                                                                                                                                                                    |
| `GROK_SUBSCRIPTION_IMAGES_ENABLED`          | boolean | `false` |        | xai-oauth (xao) 및 grok-cli 이미지 라우트를 등록하고 OpenAI 품질 high/hd를 xAI medium에 매핑합니다. 기본적으로 비활성화됩니다. API 키를 사용하는 xAI 이미지 경로는 기존 OpenAI 호환 요청을 그대로 사용하며 구독 라우트는 등록되지 않습니다.                                                                                                                                                                                                                                                                                                                                             |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `true`  |        | 고정된 정적 시드 대신 OAuth bearer token을 사용하여 https://api.x.ai/v1/models 에서 xai-oauth 연결용 최신 xAI 모델 카탈로그를 가져옵니다. 기본적으로 활성화됩니다. 정적 시드를 계속 제공하려면 이 플래그를 false로 설정하세요. HTTP 오류가 발생하면 검색 라우트에서 시드로 대체되며, 플래그 getter 자체는 HTTP 요청을 실행하지 않습니다.                                                                                                                                                                                                                                                |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |        | 자동 정리 작업이 `OMNIROUTE_BATCH_RETENTION_DAYS`보다 오래된 최종 상태(completed/failed/cancelled/expired)의 Batch API 작업과 해당 작업의 줄별 체크포인트를 삭제하고, 자체 `expires_at`이 지난 업로드 파일의 BLOB 콘텐츠를 지우도록 허용합니다. 기본적으로 비활성화됩니다. 운영자가 명시적으로 활성화하기 전까지 모든 기존 설치는 이 데이터를 이전과 똑같이 유지합니다. 운영자가 실행하는 `DELETE /api/v1/batches/delete-completed` 라우트는 설정 여부와 관계없이 영향을 받지 않습니다. 이 라우트는 별도의 무조건적인 공개 API 계약입니다.                                              |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |        | 요청이 선택한 Antigravity 계정을 해당 요청의 스트리밍 수명 주기 동안 예약하여, 동시 재시도 또는 자격 증명 인계 시 이미 진행 중인 스트림에 할당된 계정이 다시 선택되지 않도록 합니다. 예약 범위는 (connection, callable upstream model)이므로 하나의 계정이 동시에 서로 다른 두 모델을 계속 제공할 수 있습니다. 해당 모델에 적합한 모든 계정이 이미 임대된 경우, 요청을 사용 중인 계정에 누적시키는 대신 제한된 `Retry-After`가 포함된 구조화된 503 `antigravity_pool_busy` 응답을 반환합니다. 기본적으로 비활성화됩니다. 계정 선택은 이전과 똑같이 유지되며 예약이 이루어지지 않습니다. |

### CLI (5)

| 키                                    | 유형    | 기본값  | 재시작 | 설명                                                                                                                                                                                                               |
| ------------------------------------- | ------- | ------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓      | 모든 CLI 클라이언트에 대해 호환성 모드를 활성화합니다.                                                                                                                                                             |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |        | 모델 별칭 호환성 계층을 활성화합니다.                                                                                                                                                                              |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |        | 가격 데이터 자동 동기화를 활성화합니다(`PRICING_SYNC_ENABLED` 환경 변수도 필요함).                                                                                                                                 |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |        | 제공자 모델 동기화 후 최신 카탈로그를 기반으로 ~/.codex/*.config.toml 프로필 파일을 자동으로 (다시) 작성합니다. 활성/기본 Codex 구성은 절대 변경하지 않습니다. 기본적으로 비활성화됩니다.                          |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |        | 제공자 모델 동기화 후 최신 카탈로그를 기반으로 ~/.claude/profiles/<name>/settings.json Claude Code 프로필을 자동으로 (다시) 작성합니다. 활성/기본 Claude 구성은 절대 변경하지 않습니다. 기본적으로 비활성화됩니다. |

### 상태 확인 (5)

| 키                                        | 유형    | 기본값  | 설명                                                                                                                                                                                                                                                                                |
| ----------------------------------------- | ------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | 로컬 인스턴스 상태 확인 엔드포인트를 비활성화합니다.                                                                                                                                                                                                                                |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | 토큰 검증 상태 확인을 비활성화합니다.                                                                                                                                                                                                                                               |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | 스킬 샌드박스 환경에서 네트워크 액세스를 활성화합니다.                                                                                                                                                                                                                              |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | 프록시 상태 점검에서 대상이 거부한 프로브(401/403/429)가 프록시의 연속 실패 횟수를 초기화합니다. 기본값은 꺼짐입니다. 거부는 중립 상태로 유지됩니다(#10654). 어느 경우든 5xx는 판단 보류 상태로 유지되며, 거부로 인해 프록시가 제거되거나 비활성화 또는 재활성화되는 일은 없습니다. |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | 시작이 완료될 때까지 차단하는 대신, 서버가 요청 수락을 시작한 후(`setImmediate`를 통해) 시작 DB 무결성/상태 확인을 실행합니다(#13717). 기본값은 꺼짐입니다. 시작 과정은 이 PR 이전과 완전히 동일하게 차단됩니다.                                                                    |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD`와 기존 별칭인
> `INJECTION_GUARD_BLOCK_THRESHOLD`는 `INJECTION_GUARD_MODE`의
> `block` 모드를 조정하지만,
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)에서 읽는 일반 환경 변수이며,
> 기능 플래그가 아닙니다. DB 재정의나 대시보드 토글이 없습니다. 자세한 내용은
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)를 참조하세요.

> [!NOTE]
> `Restart` 열은 `requiresRestart: true`인 플래그를 표시합니다. 값은
> 즉시 저장되지만 프로세스를 다시 로드한 후에만 적용됩니다. 열거형
> 플래그는 허용된 집합에 포함되지 않은 모든 값을 거부합니다(서버 측에서
> `setFeatureFlagOverride()`와 REST `PUT` 핸들러 모두를 통해 검증됨).

---

## 플래그 전환

### 대시보드

**대시보드 → 설정 → 기능 플래그** (`/dashboard/settings/feature-flags`)로 이동하세요. 그리드 (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagsGrid.tsx`)는 다음을 지원합니다:

- 키 또는 설명으로 **검색**하고, 카테고리별로 **필터링**할 수 있습니다 (합성 **재시작 필요** 보기 포함).
- 부울 플래그를 위한 **토글**과 열거형 플래그를 위한 **드롭다운** (`src/app/(dashboard)/dashboard/settings/components/FeatureFlagCard.tsx`)을 제공합니다.
- 각 플래그에 대한 **소스 배지** — `DB`, `ENV`, 또는 `DEF` — 는 유효 값이 어디에서 왔는지 보여줍니다.
- 오버라이드를 해제하는 **재설정** 버튼 (`DB` 소스 플래그에만 표시됨)과 하단에 **모든 오버라이드 재설정** 버튼이 있습니다.
- `requiresRestart` 플래그가 변경될 때 **서버 재시작** 배너가 표시됩니다.

### REST API

모든 작업은 단일 경로를 통해 이루어집니다: [`src/app/api/settings/feature-flags/route.ts`](../../src/app/api/settings/feature-flags/route.ts). 모든 메서드는 인증된 대시보드 세션을 필요로 합니다 (그렇지 않으면 `401`).

#### `GET /api/settings/feature-flags`

각 플래그의 유효 값, 소스 및 요약을 반환합니다.

```jsonc
{
  "flags": [
    {
      "key": "REQUIRE_API_KEY",
      "label": "Require API Key",
      "description": "Require an API key for all incoming requests",
      "category": "security",
      "type": "boolean",
      "enumValues": null,
      "defaultValue": "false",
      "effectiveValue": "false",
      "source": "default", // "db" | "env" | "default"
      "requiresRestart": false,
      "warningLevel": "caution",
    },
    // ... all 77 flags
  ],
  "summary": {
    "total": 56,
    "active": 0,
    "inactive": 0,
    "overriddenByDb": 0,
    "overriddenByEnv": 0,
  },
}
```

#### `PUT /api/settings/feature-flags`

단일 오버라이드를 설정하거나 제거합니다. 본문: `{ key: string; value?: string }`. `value`를 생략하면 오버라이드가 제거됩니다 (환경 변수/기본값으로 복원).

```bash
# Set a DB override
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY","value":"true"}'

# Remove the override (no "value")
curl -X PUT http://localhost:20128/api/settings/feature-flags \
  -H "Content-Type: application/json" \
  -d '{"key":"REQUIRE_API_KEY"}'
```

응답은 새로운 `effectiveValue`/`source`, `previousValue`/`previousSource`, 그리고 `requiresRestart`를 반영합니다. 알 수 없는 키와 범위를 벗어난 열거형 값은 `400`으로 거부됩니다.

#### `DELETE /api/settings/feature-flags`

모든 DB 오버라이드를 한 번에 지워 각 플래그를 환경 변수/기본값으로 복원합니다. `{ cleared: <count>, message: "..." }`를 반환합니다.

> [!NOTE]
> `requiresRestart: true`인 플래그는 프로세스 재로드 후에만 적용됩니다. 대시보드의 재시작 흐름은 `POST /api/restart`를 호출한 다음 서버가 다시 시작될 때까지 `GET /api/health/ping`을 폴링합니다.

---

## 긴급 예산 폴백

`OMNIROUTE_EMERGENCY_FALLBACK`(카테고리 `runtime`, 기본값 `true`)은
[`open-sse/services/emergencyFallback.ts`](../../open-sse/services/emergencyFallback.ts)의
긴급 무료 폴백 경로를 제어합니다.
활성화하면 예산을 모두 소진한 요청은 즉시 실패하는 대신 무료 폴백
제공자/모델로 라우팅됩니다. 이 동작을 비활성화하여 예산을 소진한 요청이
실패하도록 하려면 대시보드 토글, DB 재정의 또는
`OMNIROUTE_EMERGENCY_FALLBACK` 환경 변수를 통해 값을 `false`(또는 `0`)로
설정하세요. (PR #3741 / #3752에서 대시보드 토글로 제공됨.)

이 폴백을 통해 제공된 응답에는
`X-OmniRoute-Emergency-Fallback: from=<provider/model>; to=<provider/model>`이
포함되므로, 클라이언트는 `X-OmniRoute-Provider`를 요청과 비교하지 않고도
요청이 재라우팅되었는지 확인할 수 있습니다. 이 헤더는 그 외 모든 응답에는
포함되지 않습니다.

---

## 참고 항목

- [환경 변수 참조](./ENVIRONMENT.md) — 대부분의 플래그에는 동일한 이름의
  환경 변수가 문서화되어 있습니다(DB 재정의가 환경 변수보다 우선합니다).
- [`src/shared/constants/featureFlagDefinitions.ts`](../../src/shared/constants/featureFlagDefinitions.ts)
  — 모든 플래그에 대한 신뢰 가능한 원본입니다.
- [`src/shared/utils/featureFlags.ts`](../../src/shared/utils/featureFlags.ts)
  — 결정 로직(`resolveFeatureFlag`, `isFeatureFlagEnabled`,
  `resolveAllFeatureFlags`).
- [`src/lib/db/featureFlags.ts`](../../src/lib/db/featureFlags.ts) — `key_value` 테이블의
  `feature_flags` 네임스페이스에 DB 재정의를 영구 저장합니다.
