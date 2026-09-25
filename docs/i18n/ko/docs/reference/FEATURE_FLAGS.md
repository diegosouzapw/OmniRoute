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

6개 카테고리에 걸쳐 77개의 플래그가 있습니다. **기본값**은 정의된 기본값입니다. 이는 DB 재정의나 환경 변수가 없을 때 사용되는 값입니다.

### 보안 (10)

| 키                                      | 유형    | 기본값   | 설명                                                                                                                                                                                                                                                              |
| :-------------------------------------- | :------ | :------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `REQUIRE_API_KEY`                       | boolean | `false`  | 모든 수신 요청에 API 키를 요구합니다.                                                                                                                                                                                                                             |
| `INPUT_SANITIZER_ENABLED`               | boolean | `true`   | 모든 요청에 대해 입력 새니타이징을 활성화합니다.                                                                                                                                                                                                                  |
| `INJECTION_GUARD_MODE`                  | enum    | `off`    | 프롬프트 인젝션 방어 모드. 값: `off`, `warn`, `block`, `redact`.                                                                                                                                                                                                  |
| `PII_REDACTION_ENABLED`                 | boolean | `false`  | 요청에서 PII를 수정합니다 (`INPUT_SANITIZER_MODE`와 무관).                                                                                                                                                                                                        |
| `PII_RESPONSE_SANITIZATION`             | boolean | `false`  | 제공자 응답에서 PII를 새니타이징합니다.                                                                                                                                                                                                                           |
| `PII_RESPONSE_SANITIZATION_MODE`        | enum    | `redact` | PII 응답 새니타이징 모드. 값: `redact`, `warn`, `block`, `off`.                                                                                                                                                                                                   |
| `OUTBOUND_SSRF_GUARD_ENABLED`           | boolean | `true`   | 개인/내부 IP 범위로의 아웃바운드 요청을 차단합니다.                                                                                                                                                                                                               |
| `ALLOW_API_KEY_REVEAL`                  | boolean | `false`  | 인증된 대시보드 사용자가 마스킹된 값만 보는 대신 저장된 API 키를 공개할 수 있도록 허용합니다.                                                                                                                                                                     |
| `AUTH_LOG_INCLUDE_ACCOUNT_ID`           | boolean | `false`  | AUTH 로그 라인에 계정 접두사를 포함합니다 (예: "Using <provider> account: abc12345..."). 기본적으로 비활성화되어 있어 공유/멀티테넌트 프로세스 로그에서 계정 식별자가 수정됩니다. 디버그 모드와는 독립적이며, 디버그 모드를 전환해도 이 정보가 공개되지 않습니다. |
| `OMNIROUTE_OIDC_DISABLE_PASSWORD_LOGIN` | boolean | `false`  | OIDC가 활성화된 경우, 사용자가 OIDC Single Sign-On을 통해서만 인증할 수 있도록 비밀번호 로그인을 비활성화합니다. 비활성화된 경우(기본값), 비밀번호 로그인과 OIDC 모두 사용할 수 있습니다.                                                                         |

### 네트워크 (19)

| Key                                             | Type    | Default | Restart | Description                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------------------------------------------- | :------ | :------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ENABLE_TLS_FINGERPRINT`                        | boolean | `false` | ✓       | TLS 지문 스텔스 모드를 활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                |
| `AUDIO_REMOTE_PROVIDER_NODES`                   | boolean | `false` |         | /v1/audio/* 경로가 localhost 외부에서 호스팅되는 OpenAI 호환 제공자 노드를 사용하도록 허용합니다. 기본적으로 비활성화되어 있습니다. 원격 호스트로 오디오를 라우팅하면 이그레스(송신) ID가 변경되므로 명시적인 운영자 결정이 필요합니다. 루프백 노드는 항상 허용되며 영향을 받지 않습니다.                                                                                                                           |
| `RERANK_REMOTE_PROVIDER_NODES`                  | boolean | `false` |         | POST /v1/rerank (및 메모리 엔진의 루프백 재순위 지정 단계)가 localhost 외부에서 호스팅되는 OpenAI 호환 제공자 노드를 사용하도록 허용합니다. 기본적으로 비활성화되어 있습니다. 원격 호스트로 라우팅하면 이그레스(송신) ID가 변경되므로 명시적인 운영자 결정이 필요합니다. 루프백 노드는 항상 허용되며, 원격 노드는 제공자 아웃바운드 URL 정책도 통과해야 합니다.                                                     |
| `PROXY_AUTO_SELECT_ENABLED`                     | boolean | `false` |         | 연결에 프록시가 할당되지 않은 경우, 레지스트리에서 작동하는 첫 번째 프록시를 자동으로 선택합니다. 기본적으로 비활성화되어 있습니다 (그렇지 않으면 모든 레지스트리 프록시가 전역 대체(fallback)가 됩니다 — #3332).                                                                                                                                                                                                   |
| `OMNIROUTE_CONTROL_PLANE_PROXY_DIRECT_FALLBACK` | boolean | `false` |         | 프록시 연결 가능성 사전 검사가 실패할 경우, OAuth 및 제공자 유효성 검사 흐름이 고정된 프록시를 우회하고 직접 연결하도록 허용합니다. 이그레스(송신) IP를 변경할 수 있으므로 기본적으로 비활성화되어 있습니다.                                                                                                                                                                                                        |
| `NETWORK_ROTATION_SHARED_EGRESS_GUARD`          | boolean | `true`  |         | 다중 계정 로테이션 실행기에서 네트워크 예외(타임아웃, 연결 거부/재설정)가 발생하고 실패한 계정에 전용 프록시가 없는 경우, 짧은 쿨다운을 적용하고 나머지 요청에 대해 다른 프록시 없는 계정을 각각 재시도하는 대신 건너뜠니다. 기본적으로 활성화되어 있습니다 (안전: 이그레스 IP 변경 없음, 공유 이그레스 계정의 지연 시간/쿨다운 위험만 줄임). 비활성화하면 첫 번째 프록시 없는 예외 발생 시 즉시 전파가 복원됩니다. |
| `ROTATION_ATTRIBUTION`                          | boolean | `false` |         | Opencode 로테이션은 어떤 계정이 서비스를 제공했거나 건너뛰어졌는지 (마스킹된 ID만, 전체 계정 ID는 아님) 기록하고, 프록시 로그 항목을 해당 요청에 연결하여 운영자가 건너뛴 계정과 사용되지 않은 계정을 구분할 수 있도록 합니다. 기본적으로 비활성화되어 있습니다.                                                                                                                                                    |
| `PROXY_SKIP_RECENTLY_FAILED`                    | boolean | `false` |         | 프록시 풀과 opencode의 계정별 로테이션은 방금 실패한 프록시(TCP 프로브 거부 또는 429 응답 수신)를 반복할 때마다 두 배로 늘어나는 프로세스별 기간 동안 (최대 한도까지) 다시 제공하지 않습니다. 프록시 상태는 기록되지 않습니다. 모든 후보가 제외되더라도 선택은 변경되지 않습니다. 기본적으로 비활성화되어 있습니다.                                                                                                 |
| `PROXY_POOL_EGRESS_OBSERVATION`                 | boolean | `false` |         | 대시보드의 프록시 풀 아래에 지난 24시간 동안 해당 멤버에게 서비스를 제공한 관찰된 이그레스(송신) IP 수와 이를 사용한 연결 수를 표시합니다. 읽기 전용이며, 프록시 로그에서 계산되며 라우팅에는 사용되지 않습니다. 기본적으로 비활성화되어 있습니다.                                                                                                                                                                  |
| `OPENCODE_RESPONSES_STALL_ROTATION`             | boolean | `false` |         | OpenCode 실행기의 경우, 스트리밍된 응답 회신(창: `RESPONSES_FIRST_BYTE_TIMEOUT_MS`, 기본값 `15000`)의 첫 번째 본문 바이트를 감시합니다. 창을 지나도 계속 침묵하는 2xx 응답 스트림은 정체된 것으로 간주됩니다. 계정은 냉각되고 요청은 다음 계정으로 한 번 회전합니다. 두 번째 정체는 빠르게 실패합니다. 기본적으로 비활성화되어 있습니다. 정체된 스트림은 스트림 준비 시간 초과까지 오늘날의 대기 상태를 유지합니다. |
| `OPENCODE_USER_BLOCKED_ROTATION`                | boolean | `false` |         | OpenCode 실행기: `user_blocked` 거부(지리적, Cloudflare 지문 거부 아님)를 포함하는 403/451에 대해 거부된 계정을 냉각시키고 요청당 최대 한 번 다음 계정으로 회전합니다. 두 번째 거부는 성공 표시 없이 있는 그대로 반환됩니다. 기본적으로 비활성화되어 있습니다. 업스트림 사용자 차단을 우회하는 것은 회피처럼 보일 수 있으며 플래그를 전체 플릿에 퍼뜨릴 수 있습니다.                                                |
| `OPENCODE_TRANSIENT_FAILOVER_BACKOFF`           | boolean | `false` |         | OpenCode 회전: 두 번 연속적인 일시적인 업스트림 실패(5xx 또는 빈 400) 후 다음 계정으로 이동하기 전에 일시 중지합니다. 추가 실패당 1.5초씩 두 배로 증가하며, 일시 중지당 6초, 요청당 10초로 제한되며, 클라이언트 연결 해제 시 건너뜁니다. 대기하기 전에 실패한 본문이 해제됩니다. 기본적으로 비활성화되어 있습니다. 페일오버는 즉시 유지됩니다.                                                                      |
| `OPENCODE_PARK_AND_RESUME`                      | boolean | `false` |         | OpenCode 회전: 반복되는 일시적인 429(또는 새로운 풀-스트레인 마커) 후 하트비트와 함께 요청을 파킹한 다음, 전체 플릿을 분산하는 대신 최대 3개의 순차 계정으로 구성된 하나의 제한된 레그를 재생합니다. 기본적으로 비활성화되어 있습니다. 모든 429는 이전과 똑같이 다음 계정으로 회전합니다.                                                                                                                           |
| `FLUSH_EMPTY_RETRY_ENABLED`                     | boolean | `false` |         | 번역된 스트리밍 턴에서 업스트림 턴에 사용할 수 있는 콘텐츠가 없는 경우(추론 전용 완료 또는 가치 있는 청크 없음) 클라이언트에 노출되기 전에 일반 자격 증명 경로를 통해 제한된 재시도(`STREAM_RECOVERY.EMPTY_TURN_RETRY_MAX`까지)를 발행합니다. 기본적으로 비활성화되어 있습니다. 빈 턴은 현재 동작(빈 200 또는 빈 콘텐츠 502)을 유지합니다.                                                                          |
| `OPENCODE_RATE_LIMITED_429_EARLY_STOP`          | boolean | `false` |         | OpenCode 회전: 실제 속도 제한으로 분류된 첫 번째 429(파싱 가능한 `Retry-After` 또는 속도/사용량 제한을 명시하는 본문)에서 계정 웨이브를 중지하고 해당 업스트림 429를 변경하지 않고 반환합니다. 분류되지 않은 429는 계속 회전합니다. 기본적으로 비활성화되어 있습니다. 무료 티어는 이그레스 IP당 제한되므로(#9611) 모든 429는 회전하고 소진된 웨이브는 마지막 업스트림 429를 반환합니다.                             |
| `MITM_DISABLE_TLS_VERIFY`                       | boolean | `false` | ✓       | MITM 프록시에 대한 TLS 인증서 확인을 비활성화합니다. **위험.**                                                                                                                                                                                                                                                                                                                                                      |
| `OMNIROUTE_ALLOW_PRIVATE_PROVIDER_URLS`         | boolean | `false` |         | 개인/내부 네트워크를 가리키는 공급자 URL을 허용합니다.                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_ALLOW_LOCAL_PROVIDER_URLS`           | boolean | `true`  |         | 로컬/개인 주소(127.0.0.1, localhost, LAN)에 공급자를 추가/유효성 검사하는 것을 허용합니다. 기본적으로 활성화되어 있습니다(로컬 우선). 엄격한 공용 전용 차단을 위해 비활성화합니다. 클라우드 메타데이터는 계속 차단됩니다.                                                                                                                                                                                           |
| `ENABLE_CC_COMPATIBLE_PROVIDER`                 | boolean | `false` | ✓       | Claude Code 호환 공급자 모드를 활성화합니다.                                                                                                                                                                                                                                                                                                                                                                        |

### 정책 (5)

| 키                                                                                                             | 타입    | 기본값     | 설명                                                                                                                                                                           |
| -------------------------------------------------------------------------------------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `TOOL_POLICY_MODE`                                                                                             | enum    | `disabled` | 도구 사용 정책 적용 모드. 값: `disabled`, `warn`, `block`.                                                                                                                     |
| `RATE_LIMIT_AUTO_ENABLE`                                                                                       | boolean | `false`    | 사용 패턴에 따라 속도 제한을 자동으로 활성화합니다.                                                                                                                            |
| `DISABLE_CONTEXT_WINDOW_CHECKS`                                                                                | boolean | `false`    | 직접적인 단일 모델 요청에 대해 OmniRoute의 로컬 컨텍스트 윈도우 / 최대 입력 토큰 확인을 건너뜁니다. 업스트림 제한은 여전히 적용됩니다.                                         |
| `CAPABILITY_FILTER_ENABLED`                                                                                    | boolean | `false`    | 대상 모델에 필요한 기능(비전, 도구, 구조화된 출력, 컨텍스트 윈도우)이 부족할                                                                                                   |
| 경우 디스패치 전에 요청을 거부합니다. 콤보 계층 호환성 필터를 우회하는 직접적인 단일 공급자 요청을 보호합니다. |
| `RADAR_ENABLED`                                                                                                | boolean | `false`    | OmniRoute Radar 모듈(카탈로그 피드 화면 및 동기화)을 활성화합니다. 기본값은 꺼짐 상태이며, 활성화 시 UI만 잠금 해제됩니다. 데이터 동기화는 별도의 옵트인(opt-in)이 필요합니다. |

### 런타임 (33)

| 키                                          | 유형    | 기본값  | 재시작 | 설명                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------------------------------------------ | :------ | :------ | :----- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `UNIVERSAL_CONTEXT_HANDOFF_ENABLED`         | boolean | `true`  |        | 콤보 라우팅이 모델을 전환할 때 대화 요약을 생성하고 주입합니다. 비활성화하면 모델 전환을 독립적으로 처리하고 기존 및 향후 모든 콤보에 대한 백그라운드 핸드오프 요청을 방지합니다.                                                                                                                                                                                                                                                                                                                                                                                                              |
| `RESPONSES_PASSTHROUGH_DROP_COMMENTARY`     | boolean | `true`  |        | 클라이언트에 전달하기 전에 Responses API 패스스루 스트림에서 내부 주석 단계 출력 항목을 삭제합니다. 비활성화하면 원시 업스트림 주석을 수신합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_MCP_ENFORCE_SCOPES`              | boolean | `true`  |        | MCP 도구 접근에 대한 범위 제한을 적용합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| `OMNIROUTE_MCP_COMPRESS_DESCRIPTIONS`       | boolean | `false` |        | 토큰 사용량을 줄이기 위해 MCP 도구 설명을 압축합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_ENABLE_RUNTIME_BACKGROUND_TASKS` | boolean | `false` |        | 런타임에 백그라운드 작업 처리를 활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `OMNIROUTE_DISABLE_BACKGROUND_SERVICES`     | boolean | `false` | ✓      | 모든 백그라운드 서비스(할당량 새로 고침, 동기화 등)를 비활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS`       | boolean | `false` |        | 유효성 검사 없이 프로젝트 수준 RTK 필터를 신뢰합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `OMNIROUTE_ENABLE_LIVE_WS`                  | boolean | `true`  | ✓      | 가져오기 시 실시간 대시보드 WebSocket 서버를 시작합니다 (기본적으로 포트 20132).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `OMNIROUTE_CODEX_WS_ENABLED`                | boolean | `true`  |        | Codex가 Responses-over-WebSocket 전송을 사용하도록 허용합니다. 비활성화된 경우, Codex는 HTTP 응답으로 대체됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `OMNIROUTE_CODEX_APP_SERVER_ENABLED`        | boolean | `true`  |        | Codex가 로컬 앱 서버 WebSocket JSON-RPC 전송(codexTransport=app-server)을 사용하도록 허용합니다. 비활성화된 경우, 앱 서버를 선택한 연결은 Codex의 다른 전송으로 대체됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `OMNIROUTE_EMERGENCY_FALLBACK`              | boolean | `true`  |        | 예산이 소진된 요청을 비상 무료 대체 공급자/모델로 라우팅합니다. (아래 [비상 예산 대체](#emergency-budget-fallback) 참조).                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `STREAM_RECOVERY_ENABLED`                   | boolean | `false` |        | 응답 바이트가 클라이언트에 도달하기 전에 잘린 업스트림 SSE 스트림에 대한 투명한 조기 재시도를 활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `STREAM_RECOVERY_MIDSTREAM_ENABLED`         | boolean | `false` |        | 바이트가 이미 클라이언트에 도달한 후 스트림 복구가 응답을 다시 요청하고 연결하도록 허용합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `STREAM_RECOVERY_TOOLCALL_ORDER_FIX`        | boolean | `false` |        | 중간 스트림 연속 도구 호출을 안전하게 만듭니다: 도구 호출이 발생한 후(진행 중이거나 `finish_reason tool_calls`로 이미 완료된 경우) 잘린 스트림을 재개하지 않으며, 전체 예산을 소모하는 대신 하나의 빈 연속 후 닫습니다. 비활성화: 릴리스 동작.                                                                                                                                                                                                                                                                                                                                                 |
| `STREAM_EARLY_EOF_SIBLING_FAILOVER_ENABLED` | boolean | `false` |        | SSE 스트림이 유용한 프레임을 내보내기 전에 닫히고 바운드된 동일 연결 재시도가 소진되었을 때 형제 연결로 한 번 페일오버합니다. 사용할 수 있는 형제가 없으면 원래 `STREAM_EARLY_EOF` 502가 반환됩니다. 기본적으로 비활성화되어 있습니다. 동일 연결 재시도 후 초기 EOF는 터미널 상태로 유지됩니다.                                                                                                                                                                                                                                                                                                |
| `MODEL_CATALOG_INCLUDE_NAMES`               | boolean | `true`  |        | `/v1/models` 응답에 사용자 친화적인 이름 필드를 포함합니다. 모델 ID만 예상하는 클라이언트의 경우 비활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `MODELS_CATALOG_PREFIX_MODE`                | enum    | `dual`  |        | `/v1/models`에서 모델 ID에 접두사가 붙는 방식을 제어합니다. 'dual'(기본값)은 이전 버전과의 호환성을 위해 별칭과 정식 공급자 ID 접두사를 모두 내보냅니다. 'alias'는 짧은 별칭 접두사(예: ds-web/model, deepseek-web/model 아님)만 내보냅니다. 'canonical'은 전체 공급자 ID 접두사만 내보냅니다. 값: `dual`, `alias`, `canonical`.                                                                                                                                                                                                                                                               |
| `ARENA_ELO_SYNC_ENABLED`                    | boolean | `true`  |        | 모델 인텔리전스 순위를 위한 주기적인 Arena AI 리더보드 ELO 동기화를 활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `EXPOSE_CC_DISCOVERY_ALIASES`               | boolean | `false` |        | `/v1/models`에 `claude/<provider>/<model>` 미러 ID를 광고하여 Claude Code 게이트웨이 모델 검색이 비 Claude 모델을 나열하도록 합니다. 3단계 게이트의 전역 수준(환경 변수가 대시보드 재정의보다 우선합니다). [Claude Code 구성](../guides/CLAUDE-CODE-CONFIGURATION.md#discovery-aliases--surface-non-claude-models-in-the-model-picker)을 참조하십시오.                                                                                                                                                                                                                                         |
| `NO_THINKING_ALIAS_ENABLED`                 | boolean | `true`  |        | no-think/<provider>/<model> 게이트웨이 별칭의 마스터 스위치입니다. 켜짐(기본값): /v1/models는 모든 적격한 사고 가능 Claude 모델에 대해 no-thinking 변형을 광고하고, 요청에 전송된 no-think/ ID는 추론이 억제된 실제 모델로 다시 확인됩니다. 꺼짐: 변형이 광고되지 않으며 no-think/ ID는 다른 알 수 없는 모델 ID와 동일하게 처리됩니다. 이 스위치가 켜져 있는 동안에도 모델별 ModelSpec.noThinkingAlias 옵트인/옵트아웃은 여전히 적용됩니다.                                                                                                                                                    |
| `OMNIROUTE_DISABLE_THINKING_LEVEL_VARIANTS` | boolean | `false` |        | /v1/models 카탈로그에서 사고 수준 변형(예: -low, -medium, -high) 생성을 비활성화합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `OMNIROUTE_CHAT_VIRTUAL_LANES`              | boolean | `false` | ✓      | 공급자 디스패치를 위한 테넌트별 적응형 가상 승인 레인 활성화(#9654): 한 테넌트의 버스트가 더 이상 다른 테넌트의 503을 유발하지 않습니다. `OMNIROUTE_CHAT_VIRTUAL_LANES` 환경 변수가 이 대시보드 재정의보다 우선하며, 변경 사항은 서버 재시작 시 적용됩니다.                                                                                                                                                                                                                                                                                                                                    |
| `EXPOSE_FUNCTIONAL_GATEWAY_MIRRORS`         | boolean | `false` |        | 정식 소유자가 활성 자격 증명을 가지고 있지 않지만 활성 자격 증명을 가진 패스스루 게이트웨이가 라우팅하는 모델에 대해 `/v1/models`에 `<gateway-alias>/<model>` 미러 ID를 알립니다. 경고: 전역적으로 활성화하면 모든 클라이언트에 대한 카탈로그 항목이 추가됩니다.                                                                                                                                                                                                                                                                                                                               |
| `NEWAPI_AGGREGATOR_BALANCE`                 | boolean | `false` |        | New-API / One-API / Sub2API 애그리게이터 호환 노드에 대한 잔액 감지를 활성화합니다. 활성화되면 애그리게이터 플래그가 설정된 호환 노드는 대시보드 및 할당량 사전 검사 라우팅에서 잔액을 보고합니다.                                                                                                                                                                                                                                                                                                                                                                                             |
| `SERVER_OWNED_TOOL_LOOP_ENABLED`            | boolean | `false` |        | 모델이 클라이언트가 사용할 수 있는 응답을 반환할 때까지 스트리밍되지 않는 서버 소유 도구 호출을 계속합니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `SEARCH_STATS_HIDE_DELETED_CONNECTIONS`     | boolean | `false` |        | 검색 통계 및 최근 검색은 활성 연결이 있는 공급자만 계산합니다(duckduckgo-free와 같은 키 없는 공급자는 항상 계산됨). 비활성화하면 공급자 ID가 있는 모든 보존된 검색 행이 유지됩니다.                                                                                                                                                                                                                                                                                                                                                                                                            |
| `FREE_BADGE_REQUIRES_PROVIDER_FREE_TIER`    | boolean | `false` |        | 대시보드 공급자 페이지: 공급자가 제공하는 신호에만 무료 배지를 표시합니다. 즉, 표시 이름 휴리스틱, 비부울 무료 필드 및 문서화된 무료 티어가 없는 등록된 공급자의 `:free` 접미사를 삭제합니다. 비활성화하면 기존 배지 규칙이 유지됩니다.                                                                                                                                                                                                                                                                                                                                                        |
| `RETRY_AFTER_PROVENANCE_ENABLED`            | boolean | `false` |        | 집계된 429/503 사용 불가 응답에서 구체적인 미래 재시도 시간을 알 수 없는 경우(합성 1초 대신) `Retry-After`를 생략하고 `error.retry_after_provenance` (`signal` \| `none`)를 추가하며, 콤보 드레인 경로가 JSON 및 일반 텍스트 업스트림 본문에서 산문 재시도 힌트를 읽도록 합니다. 이 필드는 `unavailableResponse()`에 의해 생성된 응답에만 나타나며, 다른 429/503 본문은 변경되지 않습니다.                                                                                                                                                                                                     |
| `PROTECTED_PRIORITY_INFRA_502_ENABLED`      | boolean | `false` |        | 할당량 소진 시에만 대체로 표시된 `priority` 콤보 대상이 할당량이 아님이 입증된 원인(공급자 회로 차단기 열림, 예측 대기 시간 건너뛰기)으로 콤보를 중지할 때, 할당량처럼 보이는 503 대신 502를 응답합니다. 잠금, 쿨다운, 사용 불가, 소진 및 동시성 제한 중지는 503을 유지합니다.                                                                                                                                                                                                                                                                                                                 |
| `MISTRAL_AMBIGUOUS_401_SOFT_LOCKOUT`        | boolean | `false` |        | Mistral 401 (`{"detail":"Unauthorized"}`, 명시적 인증 신호 없음)은 취소된 키와 할당량 소진에 대해 동일합니다. 활성화되면 연결을 `expired`로 주차하는 대신 쿨다운하며, 연결당 시간당 최대 3회입니다. 다음 시도 시 주차되므로 취소된 키도 수렴됩니다. 기본적으로 비활성화되어 있으며, 모든 Mistral 401은 이전과 같이 연결을 주차합니다.                                                                                                                                                                                                                                                          |
| `XAI_OAUTH_LIVE_MODEL_DISCOVERY`            | boolean | `false` |        | `xai-oauth` 연결을 위해 OAuth 전달자 토큰을 사용하여 `https://api.x.ai/v1/models`에서 라이브 xAI 모델 카탈로그를 가져옵니다. 정적 시드 대신 사용됩니다. 기본적으로 비활성화되어 있습니다. `xai-oauth`는 정적 시드를 변경하지 않고 계속 제공합니다. 해결 오류가 발생하면 검색은 시드로 폴백됩니다(x.ai가 이 엔드포인트에서 OAuth 전달자를 허용하는지 확인되지 않음).                                                                                                                                                                                                                            |
| `BATCH_AND_FILE_AUTO_CLEANUP_ENABLED`       | boolean | `false` |        | 자동 정리 스윕이 `OMNIROUTE_BATCH_RETENTION_DAYS`보다 오래된 터미널(완료/실패/취소/만료) Batch API 작업을 해당 라인별 체크포인트와 함께 삭제하고, `expires_at`이 지난 업로드된 파일의 BLOB 콘텐츠를 지우도록 허용합니다. 기본적으로 비활성화되어 있습니다. 모든 기존 설치는 운영자가 선택하기 전까지 이 데이터를 이전과 동일하게 유지합니다. 운영자가 트리거하는 `DELETE /api/v1/batches/delete-completed` 경로는 어떤 경우에도 영향을 받지 않습니다. 이는 별도의 무조건적인 공개 API 계약입니다.                                                                                              |
| `ANTIGRAVITY_ACCOUNT_LEASE_ENABLED`         | boolean | `false` |        | 선택된 Antigravity 계정을 해당 계정을 선택한 요청의 스트리밍 수명 주기 동안 예약하여, 동시 재시도 또는 자격 증명 핸드오프가 이미 진행 중인 스트림에 할당된 계정을 다시 선택할 수 없도록 합니다. 예약은 (연결, 호출 가능한 업스트림 모델) 범위로 지정되므로 하나의 계정이 동시에 두 가지 다른 모델을 서비스할 수 있습니다. 해당 모델에 대해 모든 적격 계정이 이미 임대된 경우, 요청은 바쁜 계정에 쌓이는 대신 제한된 `Retry-After`와 함께 구조화된 503 `antigravity_pool_busy`를 반환합니다. 기본적으로 비활성화되어 있습니다. 계정 선택은 이전과 동일하게 유지되며 예약은 이루어지지 않습니다. |

### CLI (5)

| 키                                    | 유형    | 기본값  | 재시작 | 설명                                                                                                                                                                                                                  |
| :------------------------------------ | :------ | :------ | :----- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `CLI_COMPAT_ALL`                      | boolean | `false` | ✓      | 모든 CLI 클라이언트에 대한 호환성 모드를 활성화합니다.                                                                                                                                                                |
| `MODEL_ALIAS_COMPAT_ENABLED`          | boolean | `false` |        | 모델 별칭 호환성 계층을 활성화합니다.                                                                                                                                                                                 |
| `PRICING_SYNC_ENABLED`                | boolean | `false` |        | 자동 가격 데이터 동기화를 활성화합니다(또한 `PRICING_SYNC_ENABLED` 환경 변수가 필요합니다).                                                                                                                           |
| `OMNIROUTE_AUTO_SYNC_CODEX_PROFILES`  | boolean | `false` |        | 공급자 모델 동기화 후, 라이브 카탈로그에서 ~/.codex/*.config.toml 프로필 파일을 자동으로 (다시) 작성합니다. 활성/기본 Codex 구성은 절대 변경하지 않습니다. 기본적으로 비활성화되어 있습니다.                          |
| `OMNIROUTE_AUTO_SYNC_CLAUDE_PROFILES` | boolean | `false` |        | 공급자 모델 동기화 후, 라이브 카탈로그에서 ~/.claude/profiles/<name>/settings.json Claude 코드 프로필을 자동으로 (다시) 작성합니다. 활성/기본 Claude 구성은 절대 변경하지 않습니다. 기본적으로 비활성화되어 있습니다. |

### Health (5)

| 키                                        | 유형    | 기본값  | 설명                                                                                                                                                                                                                                                                      |
| :---------------------------------------- | :------ | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_DISABLE_LOCAL_HEALTHCHECK`     | boolean | `false` | 로컬 인스턴스 상태 확인 엔드포인트를 비활성화합니다.                                                                                                                                                                                                                      |
| `OMNIROUTE_DISABLE_TOKEN_HEALTHCHECK`     | boolean | `false` | 토큰 유효성 검사 상태 확인을 비활성화합니다.                                                                                                                                                                                                                              |
| `SKILLS_SANDBOX_NETWORK_ENABLED`          | boolean | `false` | 스킬 샌드박스 환경에서 네트워크 액세스를 활성화합니다.                                                                                                                                                                                                                    |
| `PROXY_HEALTH_BLOCKED_RESETS_STREAK`      | boolean | `false` | 프록시 상태 스윕에서 대상이 거부한 프로브(401/403/429)는 프록시의 연속 실패 스트릭을 재설정합니다. 기본적으로 비활성화되어 있습니다. 거부는 중립을 유지합니다(#10654). 5xx는 어느 쪽이든 결론이 나지 않습니다. 거부는 프록시를 제거, 비활성화 또는 재활성화하지 않습니다. |
| `DB_HEALTHCHECK_STARTUP_DEFERRED_ENABLED` | boolean | `false` | 서버가 요청 수락을 시작한 후(`setImmediate`를 통해) 시작 DB 무결성/상태 확인을 실행합니다. 완료될 때까지 시작을 차단하지 않습니다(#13717). 기본적으로 비활성화되어 있습니다. 이 PR 이전과 동일하게 시작이 차단됩니다.                                                     |

> [!NOTE]
> `INPUT_SANITIZER_BLOCK_THRESHOLD` 및 레거시 별칭인
> `INJECTION_GUARD_BLOCK_THRESHOLD`는
> `INJECTION_GUARD_MODE`의 `block` 모드를 조정하지만,
> [`src/shared/utils/injectionSeverity.ts`](../../src/shared/utils/injectionSeverity.ts)에서
> 읽는 일반 환경 변수이며 기능 플래그가 아닙니다. 즉, DB 재정의나 대시보드 토글이 없습니다.
> [`ENVIRONMENT.md`](./ENVIRONMENT.md#4-security--authentication)를 참조하십시오.

> [!NOTE]
> `Restart` 열은 `requiresRestart: true` 플래그를 표시합니다. 값은 즉시 유지되지만 프로세스가 다시 로드된 후에만 적용됩니다. 열거형 플래그는 허용된 집합 외부의 모든 값을 거부합니다(`setFeatureFlagOverride()` 및 REST `PUT` 핸들러 모두에서 서버 측 유효성 검사).

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
활성화하면 예산을 모두 소진한 요청이 바로 실패하는 대신 무료 폴백
제공자/모델로 라우팅됩니다. 이 동작을 비활성화하여 예산을 소진한 요청이 실패하도록 하려면
대시보드 토글, DB 재정의 또는 `OMNIROUTE_EMERGENCY_FALLBACK`
환경 변수를 통해 값을 `false`(또는 `0`)로 설정합니다.
(PR #3741 / #3752에서 대시보드 토글로 제공됨.)

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
