# OmniRoute Auto-Combo Engine (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/AUTO-COMBO.md) · 🇪🇹 [am](../../../am/docs/routing/AUTO-COMBO.md) · 🇸🇦 [ar](../../../ar/docs/routing/AUTO-COMBO.md) · 🇦🇿 [az](../../../az/docs/routing/AUTO-COMBO.md) · 🇧🇬 [bg](../../../bg/docs/routing/AUTO-COMBO.md) · 🇧🇩 [bn](../../../bn/docs/routing/AUTO-COMBO.md) · 🇧🇦 [bs](../../../bs/docs/routing/AUTO-COMBO.md) · 🇨🇿 [cs](../../../cs/docs/routing/AUTO-COMBO.md) · 🇩🇰 [da](../../../da/docs/routing/AUTO-COMBO.md) · 🇩🇪 [de](../../../de/docs/routing/AUTO-COMBO.md) · 🇬🇷 [el](../../../el/docs/routing/AUTO-COMBO.md) · 🇪🇸 [es](../../../es/docs/routing/AUTO-COMBO.md) · 🇪🇪 [et](../../../et/docs/routing/AUTO-COMBO.md) · 🇮🇷 [fa](../../../fa/docs/routing/AUTO-COMBO.md) · 🇫🇮 [fi](../../../fi/docs/routing/AUTO-COMBO.md) · 🇫🇷 [fr](../../../fr/docs/routing/AUTO-COMBO.md) · 🇮🇪 [ga](../../../ga/docs/routing/AUTO-COMBO.md) · 🇮🇳 [gu](../../../gu/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ha](../../../ha/docs/routing/AUTO-COMBO.md) · 🇮🇱 [he](../../../he/docs/routing/AUTO-COMBO.md) · 🇮🇳 [hi](../../../hi/docs/routing/AUTO-COMBO.md) · 🇭🇷 [hr](../../../hr/docs/routing/AUTO-COMBO.md) · 🇭🇺 [hu](../../../hu/docs/routing/AUTO-COMBO.md) · 🇦🇲 [hy](../../../hy/docs/routing/AUTO-COMBO.md) · 🇮🇩 [id](../../../id/docs/routing/AUTO-COMBO.md) · 🇳🇬 [ig](../../../ig/docs/routing/AUTO-COMBO.md) · 🇮🇹 [it](../../../it/docs/routing/AUTO-COMBO.md) · 🇯🇵 [ja](../../../ja/docs/routing/AUTO-COMBO.md) · 🇬🇪 [ka](../../../ka/docs/routing/AUTO-COMBO.md) · 🇰🇭 [km](../../../km/docs/routing/AUTO-COMBO.md) · 🇮🇳 [kn](../../../kn/docs/routing/AUTO-COMBO.md) · 🇱🇹 [lt](../../../lt/docs/routing/AUTO-COMBO.md) · 🇱🇻 [lv](../../../lv/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ml](../../../ml/docs/routing/AUTO-COMBO.md) · 🇮🇳 [mr](../../../mr/docs/routing/AUTO-COMBO.md) · 🇲🇾 [ms](../../../ms/docs/routing/AUTO-COMBO.md) · 🇲🇹 [mt](../../../mt/docs/routing/AUTO-COMBO.md) · 🇲🇲 [my](../../../my/docs/routing/AUTO-COMBO.md) · 🇳🇵 [ne](../../../ne/docs/routing/AUTO-COMBO.md) · 🇳🇱 [nl](../../../nl/docs/routing/AUTO-COMBO.md) · 🇳🇴 [no](../../../no/docs/routing/AUTO-COMBO.md) · 🇮🇳 [or](../../../or/docs/routing/AUTO-COMBO.md) · 🇮🇳 [pa](../../../pa/docs/routing/AUTO-COMBO.md) · 🇵🇭 [phi](../../../phi/docs/routing/AUTO-COMBO.md) · 🇵🇱 [pl](../../../pl/docs/routing/AUTO-COMBO.md) · 🇵🇹 [pt](../../../pt/docs/routing/AUTO-COMBO.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/AUTO-COMBO.md) · 🇷🇴 [ro](../../../ro/docs/routing/AUTO-COMBO.md) · 🇷🇺 [ru](../../../ru/docs/routing/AUTO-COMBO.md) · 🇱🇰 [si](../../../si/docs/routing/AUTO-COMBO.md) · 🇸🇰 [sk](../../../sk/docs/routing/AUTO-COMBO.md) · 🇸🇮 [sl](../../../sl/docs/routing/AUTO-COMBO.md) · 🇷🇸 [sr](../../../sr/docs/routing/AUTO-COMBO.md) · 🇸🇪 [sv](../../../sv/docs/routing/AUTO-COMBO.md) · 🇰🇪 [sw](../../../sw/docs/routing/AUTO-COMBO.md) · 🇮🇳 [ta](../../../ta/docs/routing/AUTO-COMBO.md) · 🇮🇳 [te](../../../te/docs/routing/AUTO-COMBO.md) · 🇹🇭 [th](../../../th/docs/routing/AUTO-COMBO.md) · 🇹🇷 [tr](../../../tr/docs/routing/AUTO-COMBO.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/AUTO-COMBO.md) · 🇵🇰 [ur](../../../ur/docs/routing/AUTO-COMBO.md) · 🇺🇿 [uz](../../../uz/docs/routing/AUTO-COMBO.md) · 🇻🇳 [vi](../../../vi/docs/routing/AUTO-COMBO.md) · 🇳🇬 [yo](../../../yo/docs/routing/AUTO-COMBO.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/AUTO-COMBO.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/AUTO-COMBO.md)

---

> **사용자용**: 빠르게 시작하고 싶으신가요? 간단한 설명과 예제는 [Auto-Combo 사용자 가이드](../getting-started/AUTO-COMBO-GUIDE.md)를 참조하세요.

> 적응형 점수 계산과 무설정 자동 라우팅을 사용하는 자체 관리형 모델 체인

## 무설정 자동 라우팅 (`auto/` 접두사)

> **신규:** 콤보를 생성할 필요가 없습니다. 모든 클라이언트에서 `auto/` 접두사를 바로 사용하세요.

### 빠른 예제

| 모델 ID        | 변형    | 동작                                                     |
| -------------- | ------- | -------------------------------------------------------- |
| `auto`         | 기본값  | 연결된 모든 제공자, LKGP 전략, 균형 잡힌 가중치          |
| `auto/coding`  | coding  | 품질 우선 가중치, 코드 생성에 적합                       |
| `auto/fast`    | fast    | 지연 시간이 짧은 대상에 가중치를 둔 선택                 |
| `auto/cheap`   | cheap   | 비용 최적화 라우팅(비용이 가장 낮은 대상 우선)           |
| `auto/offline` | offline | 할당량 가용성이 가장 높은 제공자를 선호                  |
| `auto/smart`   | smart   | 품질 우선 + 더 나은 모델 탐색을 위한 높은 탐색 비율(10%) |
| `auto/lkgp`    | lkgp    | 명시적 LKGP(기본 `auto`와 동일)                          |
| `auto/chaos`   | chaos   | 복원력 테스트를 위한 결함 주입 가중치(카오스 엔지니어링) |

### 카테고리 × 티어 조합 (`auto/<category>:<tier>`)

OpenRouter 스타일 접미사는 **어떤 종류의 경로인지**(카테고리)와 **어떻게 최적화할지**(티어)를 분리하므로 자유롭게 조합할 수 있습니다(#4235 Phase B, `open-sse/services/autoCombo/suffixComposition.ts`):

- **카테고리**(기능에 따라 후보 풀 필터링): `coding` · `reasoning` · `vision` · `chat` · `multimodal`. `vision`/`multimodal`은 비전 기능을 지원하는 모델을 유지하고, `reasoning`은 추론/사고 모델을 유지합니다.
- **티어**(점수 계산 가중치/풀 필터 선택): `fast`(빠른 제공) · `cheap`(별칭 `floor`, 비용 절감) · `reliable`(서킷 브레이커 상태 + 지연 시간 안정성) · `free` / `pro`(`classifyTier`를 통해 모델 티어별로 풀 필터링 — 무료 티어 대 프리미엄).

| 예제                   | 해석 결과                                               |
| ---------------------- | ------------------------------------------------------- |
| `auto/coding:fast`     | coding 풀, 짧은 지연 시간 가중치                        |
| `auto/coding:cheap`    | coding 풀, 비용 최적화(별칭 `auto/coding:floor`)        |
| `auto/reasoning:pro`   | 추론/사고 모델만 포함, 프리미엄 티어                    |
| `auto/vision`          | 비전 기능을 지원하는 모델(티어 없음 → 균형 잡힌 가중치) |
| `auto/multimodal:free` | 멀티모달 기능을 지원하는 모델, 무료 티어만 포함         |

유효한 모든 `auto/<category>[:<tier>]`는 요청 시 해석됩니다. 엄선된 일부 항목은 `/v1/models`와 대시보드(`open-sse/services/autoCombo/builtinCatalog.ts`의 `AUTO_SUFFIX_VARIANTS`)에 표시됩니다. 필터링은 **장애 시 허용(fail-open)** 방식입니다. 제약 조건과 일치하는 연결 모델이 없으면 전체 풀을 사용하므로 라우팅이 중단되지 않습니다. 핵심 점수 계산기(`combo.ts`)는 변경되지 않았으며, 카테고리/티어 필터는 `buildAutoCandidates`에서 적용됩니다.

> **실시간 모델 인텔리전스:** `ARENA_ELO_SYNC_ENABLED` 플래그가 켜져 있으면 실시간 **Arena ELO** 순위와 **models.dev** 티어 데이터를 자동 라우팅 적합성 판단에 활용합니다(그렇지 않으면 정적 적합성 맵으로 대체).

**사용 방법:**

```bash
# OpenAI 형식을 지원하는 모든 IDE 또는 CLI 도구
Base URL: http://localhost:20128/v1
API Key:  <엔드포인트-키>

# 코드/구성에서 모델을 다음과 같이 설정합니다.
model: "auto"                 # 균형 잡힌 기본값
model: "auto/coding"          # 코딩 작업에 가장 적합
model: "auto/fast"            # 사용 가능한 항목 중 가장 빠름
model: "auto/cheap"           # 토큰당 비용이 가장 저렴
```

**처리 과정:**

1. OmniRoute가 `src/sse/handlers/chat.ts`에서 `auto/` 접두사를 감지합니다
2. 데이터베이스에서 모든 **활성 제공자 연결**을 조회합니다
3. 유효한 자격 증명(API 키 또는 OAuth 토큰)이 있는 연결만 필터링합니다
4. 연결별 모델을 결정합니다(`connection.defaultModel` 또는 제공자의 첫 번째 모델)
5. 메모리 내에 **가상 콤보**를 구성합니다(DB에 저장하지 않음)
6. 선택한 변형의 가중치 프로필과 LKGP 전략을 사용하여 라우팅합니다

**주요 특성:**

- ✅ **상시 활성화:** 토글, 콤보 생성 또는 구성이 필요하지 않음
- ✅ **동적:** 현재 연결된 제공자를 자동으로 반영
- ✅ **세션 고정성:** LKGP를 통해 마지막으로 성공한 제공자에 우선순위 부여
- ✅ **다중 계정 인식:** 각 제공자 연결이 별도의 후보가 됨
- ✅ **DB 쓰기 없음:** 가상 콤보는 요청에만 존재하며 영속성 오버헤드가 없음

### 키별 후보 제어(#7819, Level 1+2)

`GET /v1/auto-combo/{channel}/candidates`(`{channel}` = `auto/` 뒤의 접미사 또는
기본 채널을 나타내는 리터럴 `auto`)는 기존 복원력 조회를 재사용하여
실시간 도달 가능성 정보가 추가된 `auto/*` 채널의 현재 후보 풀을 나열하는
**읽기 전용** 엔드포인트입니다(브레이커의 원시 `state`는 절대 사용하지 않음):

- 제공자 서킷 브레이커 — `getCircuitBreaker(provider).getStatus()` / `.canExecute()`
- 연결 쿨다운 — 해석된 `provider_connections` 행의 `rateLimitedUntil` / `testStatus`
- 모델 잠금 — `isModelLocked(provider, connectionId, model)`

각 후보에는 이 API 키의 `excluded` 플래그도 포함됩니다. 제외 설정은
API 키별로 저장되며(`auto_candidate_overrides` 테이블, 마이그레이션 `128`) — OmniRoute는
`users` 테이블이 없는 단일 테넌트이므로 `apiKeyId`가 실제 호출자별
ID에 가장 가깝습니다 — 순수하며 단위 테스트를 거친
`filterExcludedCandidates()`(`open-sse/services/autoCombo/candidateOverrides.ts`)를 통해
`open-sse/services/autoCombo/virtualFactory.ts`의 후보 풀 병목 지점에서 적용됩니다.
필터는 **장애 시 허용(fail-open)** 방식입니다. 설정되지 않은 apiKeyId/channel 또는 DB 조회 실패는 모두
풀을 필터링하지 않은 상태로 유지하므로, 재정의가 구성되지 않은 운영자에게는 이 기능을
도입하기 전과 바이트 단위로 동일한 라우팅이 제공됩니다.

**후속 이슈로 연기됨:** 후보별 가중치 + 명시적 순서 지정(Level 3
— 기존 가중치/우선순위 전략 경로에 연결) 및 `auto/*` 채널별 특정
`combo.ts` 전략 고정(Level 4). 단일 테넌트 모델을 고려할 때 오버라이드를 API 키별로 유지할지,
아니면 전역으로 전환할지에 대한 미결 사항은 #7819 계획을 참조하세요.

**내부 동작:**

```txt
요청: { model: "auto/coding" }
   ↓
src/sse/handlers/chat.ts에서 접두사 감지
   ↓
createVirtualAutoCombo('coding') → 활성 연결에서 candidatePool 생성
   ↓
handleComboChat(영구 저장된 콤보와 동일한 엔진)
   ↓
자동 점수 산정이 요청별로 최적의 제공자/모델 선택
```

**구현 파일:**

| 파일                                                      | 용도                                    |
| --------------------------------------------------------- | --------------------------------------- |
| `open-sse/services/autoCombo/autoPrefix.ts`               | 접두사 파서(`parseAutoPrefix`)          |
| `open-sse/services/autoCombo/virtualFactory.ts`           | 가상 `AutoComboConfig` 객체 생성        |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | 제공자 레지스트리 모킹을 위한 테스트 훅 |
| `src/sse/handlers/chat.ts`                                | 통합: auto 접두사 단축 처리             |
| `src/shared/constants/providers.ts`                       | `SYSTEM_PROVIDERS.auto` 시스템 항목     |

## 실제 모델 ID와 일치하는 콤보 이름

`name`이 접두사 없는 모델 ID와 동일한 콤보(예: 이름이 `gpt-5.5`인 콤보)는 버그가 아니라 **의도적으로 지원되는 패턴**입니다. 이는 [#6940](https://github.com/diegosouzapw/OmniRoute/issues/6940)에 문서화된 모델 ID별 공급자 폴백 메커니즘입니다. 접두사 없는 모델 ID를 확인하기 전에 콤보 해석을 먼저 확인하므로(`src/sse/services/model.ts`의 `getComboForModel()`), 접두사 없는 ID `gpt-5.5`에 대한 요청은 단일 공급자로 곧바로 전달되지 않고 콤보의 대상(예: `acme-responses/gpt-5.5`, `backup-responses/gpt-5.5`)을 통해 라우팅됩니다. 이는 [#3227/#3233](https://github.com/diegosouzapw/OmniRoute/issues/3227)을 위해 구현된 재작성 전 콤보 우선순위를 재사용하며, `tests/unit/responses-combo-resolution-3227.test.ts` 및 `tests/unit/combo-name-codex-responses-rewrite.test.ts`에서 회귀 테스트됩니다.

실제 모델 ID를 가리는 이름으로 콤보를 생성하거나 이름을 변경하는 작업은 **절대로 거부되지 않습니다**. 이를 거부하면 문서화된 이 워크플로가 중단되기 때문입니다. 대신 (#8530), 새 이름이 실제 모델 ID와 충돌하면 `POST /api/combos`와 `PUT /api/combos/[id]`가 응답에 비차단 `warning` 필드를 추가합니다.

```json
{
  "warning": {
    "code": "COMBO_NAME_SHADOWS_MODEL",
    "modelId": "gpt-5.5",
    "providerId": "openai"
  }
}
```

부팅 시 `scanComboModelNameCollisionsAtBoot()`(`src/instrumentation-node.ts`)는 모델 ID를 가리는 기존의 모든 콤보를 나열하는 한 줄짜리 `[STARTUP]` 경고도 기록합니다. 따라서 #6940에 따라 의도적으로 사용한 경우가 아니라 실수로 이 상황을 초래한 운영자도 이를 인지할 수 있습니다. 감지 헬퍼는 `src/lib/combos/modelNameCollision.ts`에 있습니다.

## 클라이언트에서 사용자 지정 콤보 호출하기

영구 저장된 콤보(Settings → Combos)는 클라이언트가 `model` 필드에 콤보의 **정확한 이름**을 전송할 때만 사용됩니다. 콤보 이름에 대한 유사 또는 부분 일치는 없으며, `auto/` 접두사도 사용되지 않습니다. 해석 순서(`src/sse/services/model.ts`의 `getComboForModel()`):

1. 정확한 콤보 이름 일치(`model: "my-combo"`),
2. `combo/<name>` 접두사(`model: "combo/my-combo"`),
3. 모델→콤보 glob 매핑(`/api/model-combo-mappings`).

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"my-combo","messages":[{"role":"user","content":"Hello"}]}'
```

흔히 발생하는 두 가지 문제:

- **`auto`는 사용자의 콤보를 사용하지 않습니다.** `auto`/`auto/*`는 자체적인 무설정 후보 풀을 구성하며, 콤보 이름이 문자 그대로 `auto`인 경우에만 영구 저장된 콤보를 참조합니다(권장하지 않음). 콤보를 통해 라우팅하려면 `auto`가 아니라 해당 콤보의 정확한 이름을 전송하세요.
- **`openrouter/auto`는 실제 유료 OpenRouter 제품**("Auto Best Available")이며 OmniRoute 별칭이 아닙니다. 이는 OpenRouter 레지스트리(`open-sse/config/providers/registry/openrouter/index.ts`)의 단일 정적 모델 항목이며 별도로 요금이 청구됩니다. `auto` 풀에서 제외하려면 Settings → Routing → Hide paid models를 사용하세요.

이 문서에서 다루는 최초의 혼동에 대해서는 [#7992](https://github.com/diegosouzapw/OmniRoute/issues/7992) 및 [#7111](https://github.com/diegosouzapw/OmniRoute/issues/7111)을 참조하세요.

## 작동 방식 (영구 저장되는 자동 조합)

자동 조합 엔진은 **16개 요소의 점수 계산 함수**(`open-sse/services/autoCombo/scoring.ts` → `DEFAULT_WEIGHTS`에 정의됨)를 사용하여 각 요청에 가장 적합한 제공자/모델을 동적으로 선택합니다. 기본 가중치의 합은 `1.0`이며, 사용자 지정 가중치는 `normalizeScoringWeights()`를 통해 다시 정규화됩니다. 16개 요소 중 `cacheAffinity`와 `resetWindowAffinity`의 기본 가중치는 `0`입니다. `reliability`는 `DEFAULT_WEIGHTS`에서 `0`이지만 일반 팩에서는 `0.03`, `reliability-first`에서는 `0.04`이고, `quality`는 팩에서 `0.02`(`quality-first`에서는 `0.03`)입니다. 이러한 요소는 여전히 모든 후보에 대해 계산되며, `cacheAffinity`는 점수 계산 외부에서 프롬프트 캐시 중복 제거 여부를 제어합니다. 따라서 기본 가중치가 0인 요소는 기본적으로 점수에 영향을 주지 않지만, 팩에서는 영향을 줍니다.

![자동 조합 16개 요소 점수 계산](../diagrams/exported/auto-combo-scoring.svg)

> 출처: [diagrams/auto-combo-scoring.mmd](../diagrams/auto-combo-scoring.mmd) (`npm run docs:render-diagrams`를 통해 다시 생성). 파일 이름은 이전 명칭을 그대로 사용한 것입니다. 소스와 렌더링된 다이어그램에는 `DEFAULT_WEIGHTS`에 선언된 16개 요소가 모두 표시됩니다.

| 요소                  | 기본 가중치 | 설명                                                                                                                                                                                  |
| :-------------------- | :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `quota`               | 0.1429      | 남은 할당량 / 속도 제한 여유 [0..1]                                                                                                                                                   |
| `health`              | 0.1605      | 서킷 브레이커의 상태 점수(CLOSED=1.0, HALF_OPEN=0.5, OPEN=0.0)                                                                                                                        |
| `costInv`             | 0.1429      | **혼합된** 비용의 역수(입력 토큰 가격 60% + 출력 토큰 가격 40%, 정규화됨) — 저렴할수록 점수가 높음                                                                                    |
| `latencyInv`          | 0.1143      | 풀을 기준으로 정규화된 p95 지연 시간의 역수 — 빠를수록 점수가 높음                                                                                                                    |
| `taskFit`             | 0.0762      | 작업 유형 적합도(코딩, 검토, 계획, 분석, 디버깅, 문서화)                                                                                                                              |
| `stability`           | 0.0476      | 지연 시간 표준 편차를 기반으로 한 안정성 — 응답 시간이 크게 변동하는 후보는 더 낮은 점수를 받음                                                                                       |
| `tierPriority`        | 0.0476      | 계정 티어 우선순위 — Ultra=1.0, Pro=0.67, Standard=0.33, Free=0.0                                                                                                                     |
| `tierAffinity`        | 0.0476      | 후보의 티어와 매니페스트가 권장하는 티어 간의 선호도                                                                                                                                  |
| `specificityMatch`    | 0.0476      | 요청 구체성(매니페스트 힌트)과 모델 티어 간의 일치도                                                                                                                                  |
| `contextAffinity`     | 0.0476      | 요청에 필요한 컨텍스트 창과 모델의 컨텍스트 창 간의 선호도                                                                                                                            |
| `sessionAvailability` | 0.0476      | 이 세션에 대한 후보 연결의 OAuth 세션 가용성(`getOAuthSessionAvailability()`; OAuth가 아닌 연결은 1.0점을 받음)                                                                       |
| `connectionDensity`   | 0.0476      | 동일한 제공자의 여러 연결에 부하를 분산함(집중 방지)                                                                                                                                  |
| `cacheAffinity`       | 0.00        | 이 요청의 프롬프트 캐시 접두사를 이미 보유하고 있을 가능성이 가장 높은 연결에 대한 랑데부 해시 선호도(`open-sse/services/combo/promptCacheAffinity.ts`); 기본적으로 비활성화됨(#8008) |
| `resetWindowAffinity` | 0.00        | 할당량 재설정 기간이 유리한 연결을 선호하도록 조정(기본적으로 비활성화됨)                                                                                                             |
| `quality`             | 0.03        | 라우팅 이벤트 품질 추적기에서 제공하는 피드백 기반 출력 품질 신호. 관측값이 없는 후보는 중립 점수인 0.5를 받음                                                                        |
| `reliability`         | 0.00        | 최소 10개 샘플 기준을 충족하는 24시간 사용 기록에서 계산된 관측 성공 비율 `1 - failureRate`(그 외에는 실시간 메트릭 사용). 관측값이 없는 후보는 1.0으로 처리됨. 기본적으로 비활성화됨 |

**합계:** `DEFAULT_WEIGHTS`에 선언된 대로 `0.1429 + 0.1605 + 0.1429 + 0.1143 + 0.0762 + (7 × 0.0476) + 0.00 + 0.00 + 0.03 + 0.00 = 1.0`이며, 사용자 구성 가중치는 점수를 계산하기 전에 `normalizeScoringWeights()`를 통해 분포로 다시 정규화됩니다.

## 모드 팩

`open-sse/services/autoCombo/modePacks.ts`에 사전 정의된 6개의 가중치 프로필이 있습니다. 각 팩은 기본 가중치를 완전히 대체하여 선택이 하나의 목표를 우선하도록 편향시킵니다. 모든 팩의 합계는 이미 `1.0`(소수점 넷째 자리까지 표시하면 `0.9999`)이므로, 팩이 활성화된 경우 `normalizeScoringWeights()`가 실질적으로 보정할 부분은 없습니다. 아래 값은 반올림 오차를 제외하면 스코어러가 적용하는 값입니다.

| 요소                  | ship-fast  | cost-saver | quality-first | offline-friendly | reliability-first | chaos-mode |
| :-------------------- | :--------- | :--------- | :------------ | :--------------- | :---------------- | :--------- |
| `quota`               | 0.1133     | 0.1133     | 0.0752        | **0.3324**       | 0.1133            | 0.0376     |
| `health`              | 0.2667     | 0.1810     | 0.1714        | 0.2667           | **0.3524**        | **0.4000** |
| `costInv`             | 0.0276     | **0.3324** | 0.0276        | 0.0752           | 0.0181            | 0.0140     |
| `latencyInv`          | **0.3048** | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0186     |
| `taskFit`             | 0.0952     | 0.0952     | **0.3524**    | 0.0000           | 0.0952            | 0.1905     |
| `stability`           | 0.0000     | 0.0476     | 0.1429        | 0.0952           | 0.1905            | 0.1714     |
| `tierPriority`        | 0.0376     | 0.0376     | 0.0276        | 0.0376           | 0.0276            | 0.0040     |
| `tierAffinity`        | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `specificityMatch`    | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `contextAffinity`     | 0.0095     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0186     |
| `sessionAvailability` | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `resetWindowAffinity` | 0.0000     | 0.0000     | 0.0000        | 0.0000           | 0.0000            | 0.0000     |
| `connectionDensity`   | 0.0476     | 0.0476     | 0.0476        | 0.0476           | 0.0476            | 0.0476     |
| `quality`             | 0.02       | 0.02       | **0.03**      | 0.02             | 0.02              | 0.02       |
| `reliability`         | 0.03       | 0.03       | 0.03          | 0.03             | **0.04**          | 0.03       |

참고:

- **팩에는 `quality`와 `reliability`가 포함되며**(`quality 0.02`, `quality-first 0.03`; `reliability 0.03`, `reliability-first 0.04`), 가중치 맵을 병합하지 않고 통째로 대체합니다(`weights = pack`). `DEFAULT_WEIGHTS`에는 `quality 0.03 / reliability 0`이 포함되어 있습니다. `balanced`/`default`를 선택하면 이러한 기본값이 유지되고, 팩을 선택하면 위에 나온 해당 팩의 값이 사용됩니다. 콜드 풀(아직 관측값이 없어 `quality 0.5`, `reliability 1`인 경우)에서는 이 두 요소가 일반 팩에서 `+0.04`(`0.03 + 0.01`), `quality-first`에서 `+0.045`, `reliability-first`에서 `+0.05`를 추가합니다.
- 모든 팩에서 `tierAffinity`, `specificityMatch`, `resetWindowAffinity`는 명시적으로 `0`입니다.
- 각 팩의 핵심 강조점을 요약하면 다음과 같습니다.
  - **ship-fast** → latencyInv 0.3048 + health 0.2667(지연 시간이 짧고 정상 상태인 연결)
  - **cost-saver** → costInv 0.3324(가장 저렴한 토큰이 우선)
  - **quality-first** → taskFit 0.3524 + stability 0.1429 + quality 0.03으로 모든 팩 중 가장 높음(작업에 가장 적합하고 일관된 모델)
  - **offline-friendly** → quota 0.3324 + health 0.2667(속도/비용과 관계없이 최대 여유 용량)
  - **reliability-first** → health 0.3524 + stability 0.1905 + reliability 0.04로 모든 팩 중 가장 높음(예상치 못한 상황 최소화)
  - **chaos-mode** → health 0.4000 + taskFit 0.1905(장애 주입 프로필)

### 요청별 제어(헤더) — #6023 / #6024 / #6025 / #3470

콤보에 저장된 구성을 변경하지 않고도 세 가지 헤더를 통해 **요청별로** `auto` 콤보를 제어할 수 있습니다. 이 설정은 `auto` 전략에만 적용되며 해당 헤더가 포함된 요청에만 적용됩니다. 헤더가 없으면 콤보에 저장된 `modePack`/`budgetCap`/`budgetFallback`이 사용됩니다.

| 헤더                          | 허용 값                                                                                                                                                                           | 효과                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `X-OmniRoute-Mode`            | 프리셋 별칭(`fast`, `balanced`, `quality`, `cheap`, `reliable`, `offline`) 또는 원시 팩 이름(`ship-fast`, `cost-saver`, `quality-first`, `offline-friendly`, `reliability-first`) | 이 요청의 점수 산정 가중치를 재정의합니다. `balanced`/`default`는 기본 가중치를 강제로 적용합니다(팩 없음). 알 수 없는 값은 무시됩니다(설정 유지).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `X-OmniRoute-Budget`          | 양수(요청당 최대 USD)                                                                                                                                                             | 엄격한 비용 상한: 예상 비용이 상한을 초과하는 후보는 선택 전에 필터링됩니다. **모든** 후보가 상한을 초과할 때의 동작은 아래의 `X-OmniRoute-Budget-Fallback`으로 제어됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| `X-OmniRoute-Budget-Fallback` | `cheapest`(기본값, 별칭: `cheapest-viable`, `soft`) 또는 `strict`(별칭: `block`, `hard`)                                                                                          | `cheapest`: 여전히 상한을 초과하더라도 전체 후보 중 가장 저렴한 후보로 대체합니다(레거시 동작). `strict`: 선택을 거부합니다. 즉, 조용히 예산을 초과하는 대신 요청이 `HTTP 402`와 함께 즉시 실패합니다. 알 수 없는 값은 무시됩니다.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `X-OmniRoute-Effort`          | `auto`(다른 값은 예약됨)                                                                                                                                                          | 적응형 사고 예산: 요청에 어떤 형태의 추론 필드도(`reasoning_effort`, `reasoning`, `thinking`) **없는** 경우, 게이트웨이는 결정론적 요청 형태 신호(마지막 사용자 메시지 길이, 마지막 사용자 메시지까지의 컨텍스트 크기, 이전 도구 결과, 도구 루프 깊이)를 바탕으로 `auto`를 `low`/`medium`/`high`로 결정합니다. 신호는 현재 턴으로 범위가 제한되며, 마지막 사용자 메시지 이후의 모든 내용은 무시됩니다. 따라서 도구 루프의 모든 요청은 동일한 수준으로 결정됩니다(턴별 무상태 고정, 세션 상태 없음, 업스트림 프롬프트 캐시 접두사를 손상시킬 수 있는 루프 도중의 단계 상향 없음). 클라이언트가 명시적으로 지정한 추론 필드가 항상 우선합니다. 업스트림 디스패치가 OpenAI Chat Completions 형태(`targetFormat === FORMATS.OPENAI`)로 결정되는 요청으로 범위가 제한됩니다. `reasoning_effort`는 OpenAI 형태의 필드이므로 Claude 또는 Gemini를 대상으로 하는 요청에서는 이 헤더가 아무런 효과도 내지 않습니다(`open-sse/handlers/chatCore/adaptiveEffortWiring.ts` 참조). |

```bash
# 가장 빠른 프로필을 강제하고, 이 요청의 비용을 $0.05로 제한하며, 예산 초과 지출 대신 강제로 차단합니다
curl -sS http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "X-OmniRoute-Mode: fast" \
  -H "X-OmniRoute-Budget: 0.05" \
  -H "X-OmniRoute-Budget-Fallback: strict" \
  -d '{"model":"auto","messages":[{"role":"user","content":"hi"}]}'
```

해석은 순수 함수(`open-sse/services/autoCombo/requestControls.ts`)로 수행되며, 해석된 값은 엔진의 기존 `config.modePack` / `config.budgetCap` / `config.budgetFallback` 입력으로 전달됩니다. 콤보에 저장된 `config.budgetFallback`("strict" | "cheapest")은 영구 정책을 설정하며, 헤더는 단일 요청에 한해 이를 재정의합니다.

## 모든 라우팅 전략

OmniRoute의 콤보 엔진은 **19가지 라우팅 전략**을 지원합니다(`src/shared/constants/routingStrategies.ts` → `ROUTING_STRATEGY_VALUES`에 선언됨). Auto Combo 엔진 자체는 `auto` 전략으로 제공되며, 나머지 전략은 저장된 콤보에서 사용할 수 있습니다.

| 전략                | 설명                                                                                                                                                                                     |
| :------------------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `priority`          | 명시적 우선순위가 지정된 첫 번째 대상 우선 순서 목록                                                                                                                                     |
| `weighted`          | 대상별 가중치에 따른 가중 무작위 선택                                                                                                                                                    |
| `round-robin`       | 순서대로 대상을 순환                                                                                                                                                                     |
| `context-relay`     | 대상 간에 컨텍스트를 전달(긴 대화)                                                                                                                                                       |
| `fill-first`        | 다음 대상으로 이동하기 전에 각 대상의 할당량을 모두 사용                                                                                                                                 |
| `p2c`               | 2개 선택지의 거듭제곱(Power-of-2-choices) 방식 무작위 부하 분산                                                                                                                          |
| `random`            | 균등 무작위 선택                                                                                                                                                                         |
| `least-used`        | 현재 부하가 가장 낮은 대상을 선택                                                                                                                                                        |
| `cost-optimized`    | 카탈로그 가격을 기준으로 요청당 비용 최소화                                                                                                                                              |
| `reset-aware` ⭐    | 할당량 재설정 시간을 기준으로 우선순위 지정 — 재설정 주기가 짧을수록 높은 순위                                                                                                           |
| `reset-window`      | 할당량 기간이 가장 빨리 재설정되는 대상을 우선 선택                                                                                                                                      |
| `headroom`          | 남은 할당량 여유가 가장 큰 대상을 선택                                                                                                                                                   |
| `strict-random`     | 반복 항목을 중복 제거하지 않고 무작위 선택                                                                                                                                               |
| `auto`              | Auto Combo 점수 산정(16개 요소) 사용 — **권장**                                                                                                                                          |
| `lkgp`              | 마지막으로 정상 작동한 경로(마지막으로 성공한 공급자에 고정한 후 규칙에 따라 대체 경로 사용)                                                                                             |
| `context-optimized` | 현재 컨텍스트 크기에 가장 적합한 대상을 선택                                                                                                                                             |
| `cache-optimized`   | 프롬프트 캐시 선호도에 따라 대상 순서 재정렬 — 이 요청의 캐시된 접두사를 이미 보유하고 있을 가능성이 가장 높은 연결을 먼저 시도(`open-sse/services/combo/promptCacheAffinity.ts`, #8008) |
| `fusion` 🧬         | 여러 모델 패널에 병렬로 요청한 후 판정 모델을 통해 하나의 답변으로 종합(아래 참조)                                                                                                       |
| `pipeline`          | 대상을 순차적으로 실행하며 각 단계의 출력을 다음 단계의 입력으로 전달하고, 최종 답변만 반환(#6396)                                                                                       |

⭐ = v3.8.0에서 추가 · 🧬 = v3.8.36에서 추가

### `weighted` 동작 방식

`weighted`는 균등화 방식이 아니라 **요청별 비례 무작위 추첨** 방식입니다
(`open-sse/services/combo/targetSorters.ts` → `selectWeightedTarget`).

- 각 요청은 `weight / totalWeight` 확률로 **하나의** 단계를 추첨하며, 나머지 단계는
  해당 요청의 대체 경로 체인으로서 가중치 내림차순으로 정렬됩니다.
- 가중치가 `0`이거나 지정되지 않은 단계는 다른 단계 중 하나라도 가중치가
  0보다 크면 **절대 추첨되지 않습니다**. 이러한 단계는 추첨된 단계가 실패한 후에만
  대체 경로로 사용될 수 있습니다. **모든** 가중치가 0인 경우에만 균등 선택으로 전환됩니다.
- 대상이 모두 사용할 수 없는 단계(공급자 회로 차단기 `OPEN`, 연결
  쿨다운, 모델 잠금)는 추첨 전에 제거되므로
  (`open-sse/services/combo/targetResolution.ts`), 정상 상태인 단계가 하나뿐이라면 일시적으로
  모든 요청에 선택될 수 있습니다.
- `stickyWeightedLimit`(콤보 설정, 기본값 `1` = 비활성화)은 다시 추첨하기 전에 지정된 횟수만큼
  연속으로 성공할 때까지 추첨된 단계를 고정합니다.

엄격한 순환 방식이 필요하면 `round-robin`을 사용하세요. `weighted`에서 동일한 가중치는
엄격한 균형이 아니라 통계적 균형을 제공합니다.

## Fusion 전략

`fusion`은 단일 대상을 선택하지 **않는** 유일한 전략입니다. 프롬프트를
**모든 패널 모델에 병렬로** 전달한 다음, 구성 가능한 **판정 모델**이 모든 패널 응답을
하나의 최종 답변으로 종합합니다. 업스트림 `decolua/9router`
(OpenRouter의 Fusion 설계)에서 포팅되었으며, 구현은 `open-sse/services/fusion.ts`에 있습니다.

작동 방식:

0. **도구 포함 요청 우회** — 비어 있지 않은 `tools` 배열을 포함하고
   `tool_choice`가 명시적으로 `"none"`이 아닌 요청은 패널을 완전히 건너뜁니다. 즉,
   단일 모델(구성된 판정 모델 또는 `panel[0]`)로 직접 라우팅되며 `tools`/`tool_choice`는
   변경 없이 전달됩니다. 패널 구성원은 도구에 접근할 수 없고 판정 모델의
   종합 지시문은 도구 호출 생성을 억제하므로, 에이전트형/도구 호출 클라이언트는
   종합된 산문 대신 실제 도구 호출 결정을 받게 됩니다(#6771).
1. **팬아웃**(도구를 포함하지 않은 요청만 해당) — 프롬프트를 모든 패널
   모델에 동시에 전송하며, 도구를 제거한 상태로 비스트리밍을 강제합니다(판정 모델이
   종합하려면 완전한 산문이 필요하기 때문입니다).
2. **쿼럼 유예 수집** — `minPanel`개의 답변이 도착하는 즉시 뒤처진 모델을 위한 짧은
   유예 타이머가 시작되며, 이후에는 그때까지 수집된 응답을 사용해 fusion을 진행합니다.
   이렇게 하면 가장 느린 모델로 인한 경과 시간 지연이 제한되며, 하드 타임아웃으로
   상한이 정해집니다.
3. **판정 모델 종합** — 패널 답변은 익명화(`Source 1`, `Source 2`, … — 판정 모델이
   모델 브랜드가 아닌 내용에 가중치를 두도록 함)되어 판정 모델에 전달됩니다. 판정 모델은
   합의 / 모순 / 부분적 범위 / 고유한 통찰 / 사각지대를 분석한 다음,
   권위 있는 답변 **하나**를 작성합니다. 판정 모델 호출은 클라이언트의 원래
   `stream` 플래그와 도구를 유지하므로 스트리밍과 다운스트림 도구 사용도 계속 작동합니다.
4. **점진적 성능 저하** — 패널 답변 0개 → `503`, 생존 응답이 정확히 1개 → 해당 답변을
   직접 반환(종합할 것이 없음), 단일 모델 패널 → 직접 응답합니다.

패널 구성원은 다른 콤보를 참조하는 `combo-ref` 단계(`{kind: "combo-ref", comboName: "..."}`)일 수도
있습니다. 이 단계는 **하나의 블랙박스 패널 의견**으로 해석됩니다(해당 콤보 자체의 대상들을 팬아웃하는
것이 아니라 참조된 콤보로 완전한 재귀 디스패치를 수행함). 이때 다른 모든 combo-ref 사용 전략에서
이미 사용하는 것과 동일한 깊이/순환 보호가 적용됩니다(#6764).

### 구성

콤보의 `config` 블롭에서 구성합니다(스키마 마이그레이션 없음 — 기존
`combos` 테이블을 재사용함).

| 필드                                     | 유형     | 기본값            | 목적                                                                              |
| :--------------------------------------- | :------- | :---------------- | :-------------------------------------------------------------------------------- |
| `config.judgeModel`                      | `string` | 첫 번째 패널 모델 | 최종 답변을 종합하는 모델                                                         |
| `config.fusionTuning.minPanel`           | `number` | `2`               | 유예 타이머가 시작되기 전에 필요한 성공한 답변 수(`[2, panelSize]` 범위로 제한됨) |
| `config.fusionTuning.stragglerGraceMs`   | `number` | `8000`            | 쿼럼에 도달한 후 지연 중인 모델을 기다리는 시간                                   |
| `config.fusionTuning.panelHardTimeoutMs` | `number` | `90000`           | 응답이 멈춘 모델 하나가 요청을 지연시키지 못하도록 하는 절대 상한                 |

기본값은 `FUSION_DEFAULTS`(`open-sse/services/fusion.ts`)에 있습니다.

### 예시

```bash
curl -X POST http://localhost:20128/api/combos \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "fusion-panel",
    "strategy": "fusion",
    "targets": [
      { "model": "cc/claude-opus-4-7" },
      { "model": "cx/gpt-5.5" },
      { "model": "glm/glm-5.1" }
    ],
    "config": {
      "judgeModel": "cc/claude-opus-4-7",
      "fusionTuning": { "minPanel": 2, "stragglerGraceMs": 8000, "panelHardTimeoutMs": 90000 }
    }
  }'
```

그런 다음 다른 콤보와 마찬가지로 `{"model":"fusion-panel","messages":[...]}` 형식으로 호출합니다.

## 가상 Auto-Combo 팩토리

Auto Combo 엔진에는 사전 정의된 콤보가 필요하지 않습니다. 대신 `open-sse/services/autoCombo/virtualFactory.ts`가 즉석에서 후보를 생성합니다.

1. `getProviderConnections({ isActive: true })`를 호출합니다(활성화된 모든 연결).
2. 유효한 자격 증명(API 키 또는 `hasUsableOAuthToken()`을 통해 확인된 만료되지 않은 OAuth 토큰)이 있는 연결만 필터링합니다.
3. 모델 가용성 및 가격 정보를 확인하기 위해 `getProviderRegistry()`와 교차 참조합니다.
4. 각 `(provider, model, connection)` 튜플에 대해 `VirtualAutoComboCandidate`를 생성합니다.
5. `connection.defaultModel`(또는 레지스트리의 첫 번째 모델)을 디스패치 대상으로 선택합니다.
6. 16개 요소로 구성된 `scorePool()`과 변형의 가중치 팩을 사용해 각 후보의 점수를 계산합니다.
7. 결과로 생성된 인메모리 `AutoComboConfig`를 `handleComboChat()`에 반환하며, DB에는 절대 저장하지 않습니다.

즉, **`auto/*`가 활성화된 새 공급자를 추가하면 후보 풀이 자동으로 확장됩니다**. 수동으로 콤보를 편집할 필요가 없습니다. 가상 콤보는 요청마다 다시 생성되므로 새로 추가되거나 상태가 새롭게 정상화된 연결이 즉시 반영됩니다.

## 자가 복구

- **일시적 제외**: 점수 < 0.2 → 5분 동안 제외(점진적 백오프, 최대 30분)
- **서킷 브레이커 인식**: OPEN → 자동 제외, HALF_OPEN → 프로브 요청
- **인시던트 모드**: OPEN 상태가 50% 초과 → 탐색을 비활성화하고 안정성을 극대화
- **쿨다운 복구**: 제외 기간이 끝난 후 첫 번째 요청은 타임아웃이 단축된 "프로브"로 처리

## 밴딧 탐색

요청의 5%(설정 가능)는 탐색을 위해 무작위 공급자로 라우팅됩니다. 인시던트 모드에서는 비활성화됩니다.

## API

**전용 `POST /api/combos/auto` 엔드포인트는 없습니다**. Auto-Combo는 다음 두 가지 방식으로 사용됩니다.

1. **무설정 방식(권장):** `model: "auto"` 또는 `model: "auto/<variant>"`를 사용해 임의의 채팅 완성 요청을 전송합니다. 가상 팩토리가 요청마다 콤보를 생성하므로 저장이나 API 호출이 필요하지 않습니다.

2. **`strategy: "auto"`를 사용하는 저장형 콤보:** `POST /api/combos`를 통해 일반 콤보를 생성하고 `strategy: "auto"`와 함께 `config.auto.weights` / `config.auto.candidatePool`을 설정합니다. 동일한 점수 계산 엔진이 사용되며, 콤보는 `combos`에 저장되어 ID로 재사용할 수 있습니다.

탐색을 위해 `GET /api/combos/auto`는 각 변형을 확정된 후보 풀과 함께 나열하며, 후보 풀의 컨텍스트 창 중 최댓값인 `context_length` / `max_output_tokens`도 제공합니다. 클라이언트(예: opencode 플러그인)는 `0` 대신 이러한 값을 알려야 합니다. 컨텍스트가 0이면 opencode의 자동 압축이 완전히 비활성화되어 세션이 게이트웨이의 기록 삭제로 컨텍스트가 손실될 때까지 계속 커집니다. Auto-Combo의 컨텍스트 사전 필터가 크기가 초과된 요청을 대규모 컨텍스트 창 후보로 라우팅하므로 최댓값을 알리는 것이 안전합니다.

```bash
# 무설정 사용법(콤보 생성 불필요)
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Authorization: Bearer <key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"auto/coding","messages":[{"role":"user","content":"Hello"}]}'

# 일반 콤보 엔드포인트를 통한 저장형 자동 콤보
curl -X POST http://localhost:20128/api/combos \
  -H "Content-Type: application/json" \
  -d '{"id":"my-auto","name":"Auto Coder","strategy":"auto","config":{"auto":{"candidatePool":["anthropic","google","openai"],"weights":{"quota":0.15,"health":0.3,"costInv":0.05,"latencyInv":0.35,"taskFit":0.1,"stability":0,"tierPriority":0.05}}}}'
```

### 자동 라우터 전략

저장형 `strategy: "auto"` 콤보는 `config.routerStrategy`(또는 레거시
`config.auto.routerStrategy`)를 다음 중 하나로 설정할 수 있습니다.

- `rules` — 기본 가중치 기반 점수 계산
- `score` — 설정된 가중 점수가 가장 높은 후보를 선택합니다. 점수가 정확히 같으면 설정된
  후보 순서가 유지되며, 기존 `explorationRate`는 순위가 매겨진 전체 풀에서 샘플링합니다.
- `cost` / `eco` — 가장 저렴하고 정상 상태인 공급자
- `latency` / `fast` — 신뢰성 페널티를 반영한 가장 낮은 p95 지연 시간
- `sla-aware` / `sla` — p95 지연 시간, 오류율 및 선택적
  비용 SLO를 충족하는 후보를 우선합니다.
- `lkgp` — 마지막으로 정상 작동한 공급자를 우선합니다.

### 라우터 전략 상세 정보

Auto-Combo 엔진은 `config.routerStrategy`(또는 레거시 `config.auto.routerStrategy`)를
통해 교체할 수 있는 6개의 플러그형 **RouterStrategy** 구현을 제공합니다.
각 전략은 `RoutingContext`(작업 유형, 도구/비전 힌트, 토큰 추정치, 선택적 SLA 정책,
선택적 마지막 정상 작동 공급자)를 기반으로 후보 풀에서 하나의 공급자를 선택합니다.

#### 1. `rules` (기본값) — 16개 요소 기반 가중치 점수 계산

기존 점수 계산 엔진을 래핑합니다. `OPEN` 상태의 서킷 브레이커
후보를 필터링한 다음, 현재 작업 유형 및 `getTaskFitness()`와 함께 `scorePool()`을
실행하여 점수가 가장 높은 공급자를 선택합니다.

```ts
class RulesStrategyImpl implements RouterStrategy {
  readonly name = "rules";
  readonly description = "16-factor weighted scoring (see DEFAULT_WEIGHTS)";

  select(pool, context) {
    const eligible = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const ranked = scorePool(
      eligible.length > 0 ? eligible : pool,
      context.taskType,
      undefined,
      getTaskFitness
    );
    return { provider: ranked[0].provider /* ... */ };
  }
}
```

**사용 시점**: 기본값입니다. 모든 신호 사이에서 균형 잡힌 절충이 필요할 때 사용합니다.

**별칭**: `rules` (별칭 없음)

---

#### 2. `cost` / `eco` — 가장 저렴하고 정상 상태인 공급자

후보 풀을 `costPer1MTokens` 기준으로 오름차순 정렬하고 가장 저렴한 후보를 선택합니다.
먼저 `OPEN` 상태인 후보를 필터링합니다.

```ts
class CostStrategyImpl implements RouterStrategy {
  readonly name = "cost";
  readonly description = "Always selects cheapest available provider";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort((a, b) => a.costPer1MTokens - b.costPer1MTokens);
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**사용 시점**: 비용에 민감한 워크로드, 배치 처리 또는 백그라운드 작업에 사용합니다.

**별칭**: `cost`, `eco`

---

#### 3. `latency` / `fast` — 신뢰성 페널티를 반영한 가장 낮은 p95 지연 시간

`p95LatencyMs + (errorRate * 1000)`을 기준으로 정렬합니다. 오류율 페널티를 적용하여
명목상 지연 시간이 짧더라도 신뢰할 수 없는 제공자는 더 낮은 순위에 배치됩니다.

```ts
class LatencyStrategyImpl implements RouterStrategy {
  readonly name = "latency";
  readonly description = "Prioritizes lowest p95 latency with reliability weighting";

  select(pool, context) {
    const healthy = pool.filter((c) => c.circuitBreakerState !== "OPEN");
    const sorted = [...healthy].sort(
      (a, b) => a.p95LatencyMs + a.errorRate * 1000 - (b.p95LatencyMs + b.errorRate * 1000)
    );
    return { provider: sorted[0].provider /* ... */ };
  }
}
```

**사용 시점**: 실시간 채팅, 자동 완성 또는 대화형 코딩 어시스턴트와 같이
지연 시간에 민감한 워크로드.

**별칭**: `latency`, `fast`

---

#### 4. `sla-aware` / `sla` — 지연 시간/오류/비용 SLO 준수

구성된 SLO 정책을 각 후보가 얼마나 잘 충족하는지에 따라 점수를 산정합니다.

| 요소           | 가중치 | 공식                                              |
| -------------- | ------ | ------------------------------------------------- |
| 지연 시간 점수 | 35%    | `threshold / max(value, ε)`                       |
| 오류 점수      | 35%    | `threshold / max(value, ε)`                       |
| 상태 점수      | 15%    | `1.0` (CLOSED) / `0.5` (HALF_OPEN) / `0.0` (OPEN) |
| 비용 점수      | 10%    | `threshold / max(value, ε)` 또는 역정규화         |
| 안정성 점수    | 5%     | 지연 시간 표준 편차의 역정규화                    |

`hardConstraints: true`인 경우 후보는 먼저 **위반 점수**
(SLO를 초과한 정도)를 기준으로 정렬된 다음, 종합 점수를 기준으로 정렬됩니다. 그렇지 않으면
종합 점수만 사용합니다.

```ts
class SLAStrategyImpl implements RouterStrategy {
  readonly name = "sla-aware";
  readonly description =
    "Selects the provider most likely to satisfy latency, error-rate, and cost SLOs";

  select(pool, context) {
    // 정책에 따라 각 후보의 점수를 산정합니다: { targetP95Ms, maxErrorRate, maxCostPer1MTokens, hardConstraints }
  }
}
```

**SLA 필드**(콤보 구성에 설정):

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

**사용 시점**: 지연 시간, 오류율 또는 비용 예산이 엄격한 프로덕션 워크로드.

**별칭**: `sla-aware`, `sla`

---

#### 5. `lkgp` — 마지막으로 정상 동작한 제공자를 우선 사용

설정되어 있는 경우 **마지막으로 정상 동작한 제공자**를 먼저 시도한 다음,
`rules` 전략으로 폴백합니다. 세션 고정성에 유용하며, 대화의 후속 요청을
동일한 제공자가 처리하도록 합니다.

```ts
class LKGPStrategyImpl implements RouterStrategy {
  readonly name = "lkgp";
  readonly description = "Tries last known good provider first, then falls back to rules";

  select(pool, context) {
    if (context.lkgpEnabled === false) {
      return getStrategy("rules").select(pool, context);
    }

    if (context.lastKnownGoodProvider) {
      const candidates = pool.filter(
        (c) => c.provider === context.lastKnownGoodProvider && c.circuitBreakerState !== "OPEN"
      );
      if (candidates.length > 0) {
        return { provider: candidates[0].provider /* ... */ };
      }
    }

    // rules 전략으로 폴백
    return getStrategy("rules").select(pool, context);
  }
}
```

**사용 시점**: 동일한 제공자가 후속 요청을 처리하도록 하려는
멀티턴 대화(예: 캐싱, 컨텍스트 연속성 또는 가격 일관성을 위해).

**별칭**: `lkgp`(별도의 별칭 없음)

---

### 사용자 지정 라우터 전략

공개 API를 통해 자체 `RouterStrategy` 구현을 등록할 수 있습니다.

```ts
import {
  registerStrategy,
  type RouterStrategy,
} from "@omniroute/open-sse/services/autoCombo/routerStrategy";

class MyCustomStrategy implements RouterStrategy {
  readonly name = "my-custom";
  readonly description = "My custom routing strategy";

  select(pool, context) {
    // 여기에 라우팅 로직을 작성합니다
    return {
      provider: pool[0].provider,
      model: pool[0].model,
      strategy: this.name,
      reason: "MyCustomStrategy: ...",
      candidatesConsidered: pool.length,
      finalScore: 1.0,
    };
  }
}

registerStrategy("my-custom", new MyCustomStrategy());
```

그런 다음 다음과 같이 사용합니다.

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "my-custom"
  }
}
```

---

### 라우터 전략 선택 가이드

| 사용 사례          | 전략        | 이유                                   |
| ------------------ | ----------- | -------------------------------------- |
| 균형 잡힌 워크로드 | `rules`     | 기본값 — 모든 요소를 고려              |
| 비용 최소화        | `cost`      | 항상 가장 저렴한 옵션 선택             |
| 지연 시간 최소화   | `latency`   | 가장 빠르고 신뢰할 수 있는 제공자 선택 |
| 엄격한 SLO         | `sla-aware` | p95/오류/비용 임계값으로 필터링        |
| 멀티턴 채팅        | `lkgp`      | 세션 고정성                            |

SLA 인식 필드:

```json
{
  "strategy": "auto",
  "config": {
    "routerStrategy": "sla-aware",
    "slaTargetP95Ms": 1500,
    "slaMaxErrorRate": 0.05,
    "slaMaxCostPer1MTokens": 5,
    "slaHardConstraints": true
  }
}
```

## 작업 적합도

6가지 작업 유형(`coding`, `review`, `planning`, `analysis`, `debugging`, `documentation`)에 걸쳐 30개 이상의 모델에 점수가 부여됩니다. 와일드카드 패턴도 지원합니다(예: `*-coder` → 높은 코딩 점수).

## 자동 변형 요약

기본 `auto`와 `autoPrefix.ts`에 선언된 6개의 `AutoVariant` 값을 포함하면, **호출 가능한 모델 ID는 7개**입니다.

`auto`, `auto/coding`, `auto/fast`, `auto/cheap`, `auto/offline`, `auto/smart`, `auto/lkgp`

(`AutoVariant` 자체는 6개의 값을 열거합니다. 7번째 옵션은 "변형 없음"을 의미하는 기본 `auto`이며, `parseAutoPrefix()`에서 `variant: undefined`로 처리됩니다.)

## 티어가 Auto-Combo에 적용되는 방식

16개 요소로 구성된 점수 산정 함수(`open-sse/services/autoCombo/scoring.ts`)는 티어
소속 여부를 `tierPriority`(0.0476)와 `tierAffinity`(0.0476)라는 두 가지 신호로 처리합니다. 전체
`DEFAULT_WEIGHTS` 세트는 위의 표준 [점수 산정 요소 표](#how-it-works-persisted-auto-combos)를
참조하세요. 팩별 재정의(ship-fast/cost-saver/quality-first/
offline-friendly)는 "팩별 가중치 프로필" 표에 나와 있습니다.

티어만으로는 Tier 1이 먼저 선택되도록 **강제되지 않습니다**. Tier 1의 지연 시간이 길거나
비용 대비 품질이 최적이 아닌 경우 Tier 2가 선택됩니다. 티어 순서를 강제하려면 콤보
전략 `priority`를 사용하고 공급자를 티어 순서에 따라 배치하세요.

Tier 1(구독)을 강하게 선호하려면 `tierPriority` 가중치를 높이세요.

```json
{
  "strategy": "auto",
  "config": { "auto": { "weights": { "tierPriority": 0.3, "costInv": 0.05 } } }
}
```

티어 정의와 공급자 분류는 `docs/marketing/TIERS.md`를 참조하세요.

## 테스트 및 커버리지

### 결정론적 라우팅 결정 매트릭스(`npm run test:combo:matrix`)

`tests/integration/combo-matrix/*.test.ts`는 모의 업스트림을 사용하는 실제 콤보 파이프라인을 통해
19개의 모든 공개 전략에 대한 라우팅 **결정**을 엔드투엔드로 검증합니다.
커버리지에는 다음이 포함됩니다.

- 19개의 모든 `ROUTING_STRATEGY_VALUES` 전략(ordered, weighted, cost, context, fusion, …).
- `quota-share`(내부) 엔드투엔드: 실제 `selectQuotaShareTarget` 연결 지점(`registerQuotaFetcher` / `setLKGP` /
  `__setHeadroomSaturationFetcherForTests`)을 통한 DRR 공정성 및 포화 상태 우선순위 하향 조정.
- 모든 대상 수에 대한 `context-relay` 범용 핸드오프 커버리지.

이 테스트 모음은 결정론적 동작을 보장하고 실제 자격 증명이 필요하지 않도록
`--test-concurrency=1` 및 `--test-force-exit` 옵션과 함께 CI(`test:integration` 작업)에서 실행됩니다.

### 조건부 실제 스모크 테스트(CI에서는 실행하지 않음 — 실제 공급자)

| 명령어                                 | 수행 내용                                                                                |
| :------------------------------------- | :--------------------------------------------------------------------------------------- |
| `npm run test:combo:live`              | `RUN_COMBO_LIVE=1`을 사용하는 프로세스 내 실제 라우팅. 실제 OmniRoute DB의 스냅샷을 생성 |
| `npm run test:combo:live:vps`          | 실제 OmniRoute 서버에 HTTP 요청 전송(`COMBO_LIVE_BASE_URL` 설정)                         |
| `npm run test:combo:live:vps:failover` | 의도적인 장애 조치 시나리오를 포함해 동일하게 수행                                       |

이러한 스모크 테스트는 실제 통신 경로(콤보 → 공급자 → 완성)를 검증합니다. 실제 자격 증명과
VPS 액세스가 필요하므로 의도적으로 CI에서 제외됩니다.

---

## 파일

| 파일                                                      | 용도                                                                                                     |
| :-------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- |
| `open-sse/services/autoCombo/scoring.ts`                  | 16개 요소 점수 계산 함수, `DEFAULT_WEIGHTS`, 풀 정규화                                                   |
| `open-sse/services/autoCombo/taskFitness.ts`              | 모델 × 작업 적합도 조회                                                                                  |
| `open-sse/services/autoCombo/engine.ts`                   | 선택 로직, 밴딧, 예산 상한                                                                               |
| `open-sse/services/autoCombo/selfHealing.ts`              | 제외, 프로브, 인시던트 모드                                                                              |
| `open-sse/services/autoCombo/modePacks.ts`                | 6개 가중치 프로필(ship-fast, cost-saver, quality-first, offline-friendly, reliability-first, chaos-mode) |
| `open-sse/services/autoCombo/autoPrefix.ts`               | `auto/` 접두사 파서 + 6개 변형                                                                           |
| `open-sse/services/autoCombo/virtualFactory.ts`           | 활성 연결에서 인메모리 `AutoComboConfig` 구성                                                            |
| `open-sse/services/autoCombo/providerRegistryAccessor.ts` | 제공자 레지스트리를 모킹하기 위한 테스트 훅                                                              |
| `src/shared/constants/routingStrategies.ts`               | `ROUTING_STRATEGY_VALUES`(19개 전략)                                                                     |
| `src/sse/handlers/chat.ts`                                | 통합: auto-prefix 단락 평가                                                                              |
