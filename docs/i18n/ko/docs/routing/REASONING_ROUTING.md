# Reasoning Routing (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_ROUTING.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_ROUTING.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_ROUTING.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_ROUTING.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_ROUTING.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_ROUTING.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_ROUTING.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_ROUTING.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_ROUTING.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_ROUTING.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_ROUTING.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_ROUTING.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_ROUTING.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_ROUTING.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_ROUTING.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_ROUTING.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_ROUTING.md)

---

추론 라우팅 규칙은 기존 모델 및 콤보 라우팅을 확장합니다. 활성 규칙과 일치하는 항목이 없으면
기존의 thinking, suffix, connection-default 및 provider-translation 동작은
변경되지 않습니다.

## 관리

규칙 관리는 **Settings → Global Routing**에서 사용할 수 있습니다. API 키 편집기에서는 선택한 키로
필터링된 동일한 관리 UI를 제공합니다.

관리 API는 다음 라우트를 통해 제공됩니다.

- `/api/settings/reasoning-routing-rules`의 `GET` 및 `POST`
- `/api/settings/reasoning-routing-rules/[id]`의 `GET`, `PATCH` 및 `DELETE`
- `/api/settings/reasoning-routing-rules/simulate`의 `POST`

모든 라우트는 `requireManagementAuth`를 사용합니다. 입력은
`src/shared/validation/schemas/reasoningRouting.ts`의 스키마로 검증됩니다. 시뮬레이터는 업스트림 호출을 수행하지 않습니다.

## 규칙 결정

초기 평가는 정확히 하나의 규칙을 선택합니다. 범위는 다음 순서로 확인됩니다.

1. `apiKey`
2. `combo`
3. `model`
4. `global`

범위 내에서는 먼저 `priority`가 높은 항목이 우선하며, 그다음으로 glob 패턴보다 정확한 모델 일치가 우선되고,
이후 안정적인 `createdAt` 및 `id` 순서가 적용됩니다. `requestTags`는 `metadata.tags`에서만
읽으며 `any` 또는 `all` 일치를 지원합니다.

`connection` 규칙은 초기 규칙이 선택되지 않았고 구체적인 공급자 연결이
이미 선택된 경우에만 평가됩니다. 이 규칙은 effort와 budget만 변경할 수 있습니다.

## Effort 및 Budget

`sourceEffort`는 `any`, `missing`, `none`, `low`, `medium`, `high`, `xhigh`, `max` 및
`ultra`를 허용합니다. `missing`은 요청에 개별 effort, thinking 토글 또는 thinking budget이
모두 포함되지 않았음을 의미합니다. 따라서 budget만 있는 신호는 `any`로만 일치합니다.

`effortMode`에는 세 가지 변형이 있습니다.

- `inherit`는 클라이언트 effort를 유지하면서도 모델 또는 콤보를 변경할 수 있게 합니다.
- `default`는 명시적인 추론 신호가 없는 경우에만 `targetEffort`를 설정합니다.
- `force`는 개별 effort를 `targetEffort`로 대체합니다.

이와 별개로 `budgetAction`은 `preserve`, `remove` 또는 `set`일 수 있습니다. `none`을 사용하는 `force`는
인식되는 모든 effort 및 budget 필드를 제거합니다. `none`과 `set`을 함께 사용하는 것은 유효하지 않습니다.

알려진 비호환 모델을 대상으로 하는 요청은 업스트림 호출 전에 거부됩니다. 콤보
대상의 경우 비호환 항목이 제거되며, 남은 항목이 없으면 요청은 상태 `400`을 반환합니다.
알 수 없는 기능 데이터는 경고를 생성하지만 규칙은 활성 상태로 유지됩니다.

## 보안 및 전송 방식

소스 및 대상 모델이나 소스 및 대상 콤보에는 기존 API 키
정책이 계속 적용됩니다. 추론 규칙은 모델, 콤보 또는 할당량 권한을 확장하지 않습니다.

엔진은 Chat Completions, Responses, Anthropic Messages 및 내부
Codex WebSocket 경로에 통합됩니다. WebSocket 경로는 Codex 대상 모델만 허용하며 콤보 대상은
해당 경로에서 실행할 수 없습니다. 규칙 결정은 비밀 정보 없이 기존 라우트 추적에 저장됩니다.

## 영속성

마이그레이션 `src/lib/db/migrations/126_reasoning_routing_rules.sql`은
`reasoning_routing_rules` 테이블을 생성합니다. 규칙은 저장된 API 키, 콤보 및 공급자 연결을 참조합니다.
삭제 시 관련 규칙도 정리됩니다. `src/lib/db/reasoningRoutingRules.ts`의 데이터베이스 액세스 계층은
요청 경로를 위한 무효화 가능한 캐시를 유지합니다.

규칙은 SQLite 백업, 전체 데이터베이스 내보내기 및 config-sync 번들에 포함됩니다.
`reconcileReasoningRulesForSync`는 참조가 누락된 가져온 규칙을 비활성화하고 해당
충돌을 보고합니다.
