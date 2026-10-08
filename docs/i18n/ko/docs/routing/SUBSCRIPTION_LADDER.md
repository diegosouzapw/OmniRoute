# Subscription-first routing (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇦 [bs](../../../bs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [mr](../../../mr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> 두 개의 새로운 `auto/*` ID인 `auto/subscription`과 `auto/thrifty`가 추가되었습니다. 둘 다 요청을 통해 명시적으로 활성화해야 합니다.
> 호출자가 이름으로 해당 ID를 요청하지 않는 한 어떤 요청도 이를 통해 라우팅되지 않으며,
> 기존 풀, 전략 또는 기본값은 변경되지 않습니다.

## 이 기능이 존재하는 이유

OmniRoute는 이미 비용에 관한 두 가지 질문에 답하지만, 어느 것도 대부분의 운영자가 묻는 질문은 아닙니다.

| 기존 메커니즘                                            | 답하는 질문                                 |
| -------------------------------------------------------- | ------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "이 모델은 무료로 분류되어 있는가?"         |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "이 연결에서 비용이 청구될 수 있는가?"      |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "이 연결이 한도에 가까워졌는가?"            |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "지출을 제한하고 가장 저렴한 옵션으로 전환" |

모든 무료 전용 메커니즘은 **실패 시 차단됩니다**. 즉, 소진된 무료 풀은 빈 풀일 뿐,
유료 옵션으로 상향 전환되지 않습니다. 또한 모든 유료 측 메커니즘은 티어를 구분하지 않습니다.
어느 쪽도 다음 질문에는 답하지 못합니다.

> "이미 비용을 지불한 할당량을 사용하라. 할당량이 소진되면 중단하거나,
> 가장 저렴한 유료 옵션부터 한 단계씩 상향 전환하고, 할당량이 재설정되는 즉시 다시 돌아가라."

## 과금은 모델이 아닌 연결의 속성입니다

`classifyTier()` (`open-sse/services/tierResolver.ts`)는 `(provider, model)`을 기준으로
카탈로그 가격에서 `free | cheap | premium`을 반환합니다. 그러나 요청에 추가 비용이
발생하는지는 **어떤 연결이 요청을 처리하는지**에 따라 달라집니다. 동일한 모델이라도
Claude Code OAuth 연결을 통해서는 플랜에 포함되지만, API 키 연결을 통해서는 토큰별로
요금이 청구됩니다.

`provider_connections.auth_type`은 어느 방향으로도 안전한 대리 지표가 아닙니다.
종량제 OAuth 연결도 존재하고, 플랜에 포함된 API 키 연결도 존재합니다(Copilot 시트
토큰은 종량제 API 키가 아닙니다). 따라서 과금 클래스는 각 제공자의 공개 약관을
바탕으로 수동 설정된 **선별 카탈로그**인
`open-sse/config/connectionBillingCatalog.ts`에서 가져옵니다. 이는
`FreeModelBudget.hardStopGuaranteed`가 무료 모델에 대해 이미 확립한 것과 동일한
패턴입니다.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

확인 순서(`autoCombo/connectionBilling.ts`)는 다음과 같습니다. 합성된 무인증 센티널 →
`keyless`, 제공자와 `authType`이 **모두** 일치하는 카탈로그 항목, 제공자 전체에 적용되는
항목, 그 외에는 `unknown`입니다. **선별되지 않았다고 무료인 것은 아닙니다**.
`unknown`은 모든 곳에서 `metered`로 취급되므로, 내일 추가되는 제공자는 구독 단계
외부에서 시작하며 의도적으로 카탈로그에 등록해야 합니다.

## 단계 모델

상향 전환 순서에 따라 다섯 단계가 있습니다. 이들은 가격만 다른 것이 아닙니다.
각 단계에는 **자체적인** 소진 신호가 있으므로, 이는 단순한 정렬이 아닙니다.

| #   | 단계           | 소속                                        | 소진 조건                      |
| --- | -------------- | ------------------------------------------- | ------------------------------ |
| 0   | `subscription` | 선별된 `billing: "subscription"`            | 할당량 기간이 컷오프 이하일 때 |
| 1   | `keyless`      | 합성된 무인증 경로                          | 연결 쿨다운 / 차단기           |
| 2   | `free`         | 종량제 연결, `classifyTier() === "free"`    | 무료 허용량 소진               |
| 3   | `cheap`        | 종량제 연결, `classifyTier() === "cheap"`   | 단계별 예산 소진               |
| 4   | `premium`      | 종량제 연결, `classifyTier() === "premium"` | 단계별 예산 소진               |

0~~2단계는 관측 가능하고 이미 추적 중인 **할당량**에 따라 소진됩니다. 3~~4단계에는
할당량이 없습니다. 유료 연결은 계속해서 요청을 처리하므로, 합리적인 유일한 소진 신호는
단계별 **예산**입니다. 예산이 없다면 "저가 단계가 소진되면 상향 전환"을 촉발할 조건이
없습니다.

## `auto/subscription` — 실패 시 차단

풀 = 0단계만 포함하며, 초과 사용이 문서상 `hard-stop`으로 명시되고 할당량에 여유가 있음이 실시간으로 검증된 연결로 제한됩니다. 모호한 항목은 모두 제외됩니다. 선별되지 않은 제공자, 검증할 수 없는 할당량 수치, 오래된 수치 또는 유료로 계상되는 초과 사용이 여기에 해당합니다.

빈 풀은 결함이 아니라 **의도된** 결과입니다. 호출자의 기존 빈 풀 처리 경로는 이를 조용한 유료 폴백 대신 명확한 오류로 변환합니다. 이것이 이 id가 보장하는 전부입니다.

`keyless`는 의도적으로 자격 대상에 **포함되지 않습니다**. 이 그룹화는 "내가 비용을 지불하는 요금제"를 의미하므로, 인증이 필요 없는 백엔드는 여기에 속하지 않습니다. 그런 경우에는 `auto/thrifty`(또는 `auto/best-free`)를 사용하세요.

### 연결 안전성

후보가 항상 하나의 연결에만 묶이는 것은 아닙니다. 논리적 후보는 `allowedConnectionIds` 허용 목록을 가지며, 실제로 사용할 계정은 나중에 디스패치 시점에 `open-sse/services/combo/autoStrategy.ts`에서 선택됩니다. 따라서 두 그룹화 모두 **각 연결을 개별적으로** 검증하고 `allowedConnectionIds`를 정확히 살아남은 하위 집합으로 다시 작성합니다. 원래의 전체 목록이나 임의로 선택한 단일 항목으로 설정하는 일은 없습니다. `autoStrategy.ts`는 이미 이 배열을 엄격한 허용 목록으로 적용하므로, 여기서 다시 작성하면 "검증된" 집합과 "실제로 사용되는" 집합이 구조적으로 동일해집니다. 이는 [STRICT_ZERO_COST](./STRICT_ZERO_COST.md)와 동일한 불변 조건이며, 그 근거도 같습니다.

## `auto/thrifty` — 한 번에 한 단계씩 상향

풀 = 모든 단계이며 단계 인덱스 순으로 정렬되고, 소진된 후보는 제외됩니다. `auto` 엔진은 살아남은 풀 **내에서** 계속 점수를 계산합니다. 래더는 어떤 단계가 고려 대상인지 결정하고, 점수 계산은 그 안에서 어떤 후보가 선택될지를 결정합니다. 단계 내 순서는 안정적으로 유지되므로, 이 오버레이가 스코어러 자체의 순위를 재정렬하는 일은 없습니다.

이는 새로운 디스패처가 아니라 순서 지정 + 게이팅 오버레이입니다. `combo.ts`의 추측 실행 루프는 이미 대상을 순서대로 순회하며 실패 시 다음 대상으로 넘어가므로, 사전 점검에서 포착하지 못한 런타임 소진이 발생해도 동일한 요청 내에서 다음 단계로 계속 상향됩니다.

`auto/subscription`은 실패 시 **차단**하지만, `auto/thrifty`는 실패 시 **허용**합니다. 사용할 수 있는 할당량 수치가 없는 요금제 포함 연결도 여전히 가장 먼저 시도됩니다. 이를 시도하는 데는 비용이 들지 않으며, 실제로 소진된 것으로 판명되면 폴스루를 통해 다음 단계에 도달합니다. 반대로 시도 자체를 거부하면 텔레메트리가 누락되었다는 이유로 요청이 유료 단계로 전송되는데, 이는 이 그룹화가 방지하려는 바로 그 결과입니다.

## 재설정 후 요금제로 복귀

라우팅이 0단계로 돌아가려면 서로 독립적인 세 가지가 모두 만료되어야 합니다. 하나만 수정하면 요금제가 충전된 후에도 래더가 오랫동안 유료 단계에 고착됩니다.

1. **할당량 상태 캐시** — `freeAccessQuota.ts`는 `(provider, connection)`별로 180초 TTL을 사용해 캐시합니다. 자체 `resetAt`이 이미 지난 캐시 항목은 더 이상 존재하지 않는 기간을 나타내므로, 이제는 경과 시간과 **무관하게** 오래된 것으로 간주되어 새로고침을 강제합니다. 이렇게 하지 않으면 자정에 충전된 요금제가 TTL이 우연히 만료될 때까지 계속 소진 상태로 표시됩니다.
2. **래더 자체의 상태** — 설계상 그런 상태는 없습니다. 단계 적격성은 풀을 구성할 때마다 실시간 할당량 상태를 바탕으로 다시 계산됩니다. 재설정 이후에도 남아 라우팅을 고착시킬 수 있는 "현재 3단계에 있음"과 같은 영속 레코드는 존재하지 않습니다.
3. **연결 쿨다운** — 소진을 나타내는 429는 지수 백오프를 기반으로 `rateLimitedUntil`을 설정하며, 요금제 연결의 경우 실제 재설정 시점을 넘어설 수 있습니다. `clampCooldownToReset()`(`subscriptionLadder.ts`)은 쿨다운을 업스트림 자체의 재설정 시점까지 단축하며 절대로 연장하지 않습니다. **구현 및 테스트는 완료되었지만 아직 연결되지는 않았습니다**. `src/sse/services/auth.ts`에서는 쿨다운이 기록되기 _전에_ 할당량 캐시가 무효화되므로, 해당 함수의 더 앞부분에서 `resetAt`을 캡처해야 합니다. 이는 복원력 핵심 경로에 대한 변경이므로 별도로 검토되는 PR에서 처리해야 합니다. 그때까지는 연결 쿨다운이 끝나야 다시 진입할 수 있습니다(제공자가 업스트림 `Retry-After` 힌트를 보내는 경우에는 이미 이를 우선 사용합니다).

### 플래핑 방지

방금 재설정된 단계는 `reentryMinRemainingPercent`(기본값 5)를 초과해야 다시 허용되는 반면, 이미 사용 중인 연결은 `exitCutoffPercent`(기본값 2이며 `quotaPreflight.defaultThresholdPercent`와 동일)를 초과하기만 하면 유지됩니다. 이 차이가 히스테리시스 대역입니다. 이것이 없으면 임계값 부근을 오가는 연결이 연속 요청마다 단계 사이를 진동하게 됩니다.

## 구성

튜닝 전용입니다. 의도적으로 `enabled` 플래그는 **없습니다**. 이를 끌 수 있는 토글이 있다면
`auto/subscription`이 유료 모델을 포함한 전체 풀을, 그 반대를 약속하는 이름 아래에서
조용히 제공하게 됩니다.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0은 해당 단계를 완전히 비활성화합니다
  },
}
```

지출 해석기가 연결되기 전까지 예산 게이팅은 작동하지 않습니다. 회계 정보를 사용할 수 없으면 유료
단계의 순서는 정해지지만 게이팅되지는 않습니다. v3.8.51 기준으로 `rungBudgetUsd` 설정은
스키마에서 허용되지만 아직 적용되지는 **않습니다**. 활성 지출 한도가 아니라 예약된 구성으로 간주하세요. 단계 순서 지정, 할당량 기반 소진, 재설정 후 재진입은 모두
이 설정 없이도 작동합니다.

## 구성 방식

`subscription`과 `thrifty`는 `AutoTier` 값이므로 모든 카테고리와 조합할 수 있습니다.
예를 들면 `auto/coding:thrifty`, `auto/reasoning:subscription` 등이 있습니다. 두 개의 단순 id
(`auto/subscription`, `auto/thrifty`)는 `/v1/models`와 대시보드에 표시됩니다.

두 id 모두 유료 티어가 아니므로 `isPaidTierAutoId()`는 둘 다에 대해 `false`를 반환하며,
`auto/subscription`은 `hidePaidModels`가 적용되어도 유지됩니다.

## 코드 위치

| 관심사                         | 파일                                                |
| ------------------------------ | --------------------------------------------------- |
| 선별된 결제 정보               | `open-sse/config/connectionBillingCatalog.ts`       |
| 분류기                         | `open-sse/services/autoCombo/connectionBilling.ts`  |
| 단계, 두 그룹화, 재진입        | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| 후보 풀에 연결                 | `open-sse/services/autoCombo/virtualFactory.ts`     |
| 재설정을 고려한 캐시 만료 여부 | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| 티어 표면                      | `open-sse/services/autoCombo/suffixComposition.ts`  |
| 표시되는 id                    | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| 테스트                         | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
