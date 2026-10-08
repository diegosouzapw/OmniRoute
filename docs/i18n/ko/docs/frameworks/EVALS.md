# Evaluations (Evals) (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **신뢰할 수 있는 원본:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **최종 업데이트:** 2026-06-28 — v3.8.40

OmniRoute는 라우팅 구성, 단일 제공업체/모델 또는 번들로 제공되는 "골든 세트" 스위트를 벤치마킹하는 데 사용할 수 있는 범용 평가 프레임워크를 제공합니다.
프로덕션 트래픽에 적용하기 전에 이 프레임워크를 사용하여 라우팅 변경 사항을 검증하고, 새로운 제공업체를 검증하며, 릴리스 승인 여부를 결정할 수 있습니다.

프레임워크는 다음과 같이 구현됩니다.

- 인메모리 기본 제공 스위트를 등록하고, 예상 기준에 따라 출력을 평가하며, 스코어카드를 집계하는 순수 실행기(`src/lib/evals/evalRunner.ts`).
- 사용자 지정(사용자 정의) 스위트 및 과거 실행 기록을 SQLite에 저장하는 지속성 계층(`src/lib/db/evals.ts`).
- 각 케이스를 실행하기 위해 `POST /v1/chat/completions`로 실제 요청을 전송하고, 지연 시간과 출력을 캡처하며, 실행 결과를 저장하는 오케스트레이션 계층(`src/lib/evals/runtime.ts`).
- `/api/evals/*` 아래의 REST 엔드포인트(관리 인증 전용).
- `Dashboard → Usage → Evals`의 대시보드 화면(`EvalsTab.tsx`).

## 개념

### 스위트

스위트는 `description`과 하나 이상의 케이스로 구성된, 이름이 지정된 테스트 케이스 모음입니다. 스위트는 두 가지 소스에서 제공됩니다.

| 소스       | 정의 위치                                  | 런타임에 변경 가능? |
| ---------- | ------------------------------------------ | ------------------- |
| `built-in` | 부팅 시 `registerSuite()`를 통해 등록      | 아니요(코드로 정의) |
| `custom`   | SQLite `eval_suites` + `eval_cases`에 저장 | 예(API/UI를 통해)   |

현재 기본 제공 스위트(`src/lib/evals/evalRunner.ts` 참조):

- `golden-set` — 인사/수학/번역/안전성 전반에 걸친 10개의 기준 케이스
- `coding-proficiency` — Python/JS/SQL/TS/버그 탐지
- `reasoning-logic` — 삼단논법, 문장제, 패턴 인식
- `multilingual` — 번역 및 언어 감지
- `safety-guardrails` — PII, 탈옥, 요청 거부, 편향 인식
- `instruction-following` — JSON 전용, 번호 매기기 목록, 언어 제약
- `codex-comparison` — 비교 모드를 위한 일대일 코딩 작업

### 케이스

각 케이스에는 다음 항목이 포함됩니다.

| 필드       | 설명                                                        |
| ---------- | ----------------------------------------------------------- |
| `id`       | 안정적인 식별자(출력 및 메트릭의 키로 사용)                 |
| `name`     | 사람이 읽을 수 있는 레이블                                  |
| `model`    | 실행에서 `suite-default` 대상을 사용할 때의 기본 모델       |
| `input`    | `{ messages, max_tokens? }` — `/v1/chat/completions`로 전송 |
| `expected` | `{ strategy, value }` — 채점 기준(아래 참조)                |
| `tags`     | 선택적 레이블(예: `safety`, `pii`, `jailbreak`)             |

### 대상

동일한 스위트를 서로 다른 대상에 대해 실행할 수 있습니다. 대상 스키마는 `src/shared/validation/schemas.ts`의 `evalTargetSchema`입니다.

| 대상 유형       | `id`      | 동작                                                           |
| --------------- | --------- | -------------------------------------------------------------- |
| `suite-default` | `null`    | 각 케이스가 자체 기본 제공 `model` 필드를 사용                 |
| `model`         | 모델 이름 | 모든 케이스가 하나의 직접 모델을 사용하도록 강제(예: `gpt-4o`) |
| `combo`         | 콤보 이름 | 모든 케이스를 하나의 콤보를 통해 실행(라우팅 엔진 검증)        |

`model` 및 `combo`의 경우 `id` 필드가 필수입니다(Zod `superRefine`으로 적용).
`compareTarget`이 제공되면 두 대상은 서로 달라야 합니다. 실행기는 A/B 비교를 위해 두 실행을 동일한 `runGroupId`로 저장합니다.

## 채점 기준

`evaluateCase()`(evalRunner.ts)에 구현되어 있습니다:

| 전략       | 통과 조건…                                                          |
| ---------- | ------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                   |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())` |
| `regex`    | `new RegExp(expected.value).test(actualOutput)`이 참                |
| `custom`   | `expected.fn(actualOutput, evalCase)`가 참을 반환(기본 제공 항목만) |

**참고:** 함수는 API를 통해 직렬화할 수 없으므로 사용자 정의 함수 채점은 코드에 정의된(기본 제공)
스위트에만 사용할 수 있습니다. `evalCaseBuilderSchema`는 사용자가 생성한 스위트에 대해
`contains | exact | regex`만 허용합니다.

현재 LLM-as-judge 또는 임베딩 기반 유사도 채점기는 없습니다. 이는
`evaluateCase()`에서 깔끔하게 확장할 수 있는 지점입니다.

## 데이터베이스 스키마

세 개의 테이블(마이그레이션 `030_create_eval_runs.sql` 및
`031_create_eval_suites.sql`):

| 테이블        | 용도                                                                                                                        |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | 사용자 정의 스위트 메타데이터(`id`, `name`, `description`)                                                                  |
| `eval_cases`  | 스위트별 케이스 — `input_json`, `expected_*`, `tags_json`                                                                   |
| `eval_runs`   | 과거 실행 기록 — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

기본 제공 스위트는 DB에 저장되지 **않습니다**. 메모리에 존재하며
`evalRunner.ts`를 가져올 때마다 다시 등록됩니다.

## REST API

모든 엔드포인트에는 관리 인증(`requireManagementAuth`)이 필요하며, 공개 프록시
인터페이스에는 포함되지 않습니다.

| 엔드포인트                    | 메서드   | 설명                                                      |
| ----------------------------- | -------- | --------------------------------------------------------- |
| `/api/evals`                  | `GET`    | 스위트 + 최근 실행 + 스코어카드 + 대상 + 키 목록 조회     |
| `/api/evals`                  | `POST`   | 스위트 실행(단일 또는 비교) — 스키마 `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | 단일 스위트 조회(기본 제공 또는 사용자 정의)              |
| `/api/evals/suites`           | `POST`   | 사용자 정의 스위트 생성 — 스키마 `evalSuiteSaveSchema`    |
| `/api/evals/suites/{suiteId}` | `GET`    | 사용자 정의 스위트 조회                                   |
| `/api/evals/suites/{suiteId}` | `PUT`    | 사용자 정의 스위트 교체(케이스를 다시 삽입)               |
| `/api/evals/suites/{suiteId}` | `DELETE` | 사용자 정의 스위트 및 해당 케이스 삭제                    |

### 스위트 실행

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

선택적 필드:

- `outputs` — 미리 계산된 출력의 `Record<caseId, string>`입니다. 이 값이 제공되면
  실행기는 **디스패치를 건너뛰고** 캐시된 출력만 채점합니다(오프라인 평가에 유용).
- `compareTarget` — 병렬로 실행할 두 번째 대상입니다. 두 실행은 일대일 비교 보기를 위해
  생성된 `runGroupId`를 공유합니다.
- `apiKeyId` — 디스패치된 `/v1/chat/completions` 호출을 인증하는 데 사용되는 내부
  API 키입니다. `REQUIRE_API_KEY`가 활성화된 경우 필수입니다.

### 사용자 정의 스위트 생성

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## 디스패치 파이프라인

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. 스위트(기본 제공 또는 사용자 정의)를 확인합니다.
2. 각 케이스에 대해 해당 케이스의 `messages`, 확인된 `model`, `stream: false`, `max_tokens: 512`(또는 케이스별 재정의 값)를 사용하여 `/v1/chat/completions`에 보낼 `Request`를 생성합니다.
3. 채팅 핸들러를 직접 호출합니다(프로세스 내부 — 추가 HTTP 홉 없음).
4. 지연 시간을 측정하고 `choices[0].message.content` 또는 Responses API의 `output[]` 페이로드에서 텍스트를 추출합니다.
5. `runSuite()`를 통해 모든 출력을 채점한 다음 `saveEvalRun()`을 통해 영속화합니다.

케이스는 **순차적으로** 실행됩니다. 현재 동시성 플래그는 없습니다.

## 대시보드

UI는 `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`)에 있습니다. 여기에서 다음 작업을 할 수 있습니다.

- 케이스별 미리보기와 함께 기본 제공 및 사용자 정의 스위트를 탐색합니다.
- 케이스 빌더를 사용하여 사용자 정의 스위트를 생성/편집/삭제합니다.
- 대상(스위트 기본값 / 모델 / 콤보)을 선택하고, 필요에 따라 두 번째 `compareTarget`과 API 키를 지정한 후 요청 시 실행합니다.
- 실행 기록, 케이스별 통과/실패, 지연 시간 및 캡처된 출력을 확인합니다.
- 각 `(suite, target)` 범위의 최신 실행을 기준으로 집계된 롤링 스코어카드를 확인합니다.

## Auto-Assessment RFC와의 관계

별도의 더 좁은 범위의 평가 하위 시스템은 `src/domain/assessment/`에 있습니다(실시간 채점 엔진에 대해서는 [AUTO-COMBO.md](../routing/AUTO-COMBO.md)도 참조하세요).
이 하위 시스템은 Auto Combo 엔진을 대상으로 하며, 공급자와 모델을 자동으로 채점하여 업스트림 장애 발생 시 콤보가 스스로 복구할 수 있도록 합니다. 이 시스템은 자체 실행기, 자체 분류기 및 자체 채점 로직을 사용합니다.

여기에서 설명하는 Evals 프레임워크는 **더 광범위한 범용 테스트 인터페이스**입니다. 임의의 회귀 테스트 스위트, A/B 비교 및 릴리스별 스모크 테스트에는 이 프레임워크를 사용하는 것이 좋습니다. 실시간 공급자 상태가 라우팅 결정에 영향을 미쳐야 하는 경우에는 Auto-Assessment 하위 시스템을 사용하세요.

## CI 통합

현재 전용 `eval:ci` npm 스크립트는 없습니다. 평가 결과에 따라 릴리스를 차단하려면 다음 두 가지 방법을 사용할 수 있습니다.

- **HTTP 경로**: 서버를 구동하고, 알려진 `suiteId` + `target`을 사용하여 `POST /api/evals`를 호출한 다음 응답에서 `runs[].summary.passRate >= N`을 검증합니다.
- **프로세스 내부 경로**: 스크립트에서 `@/lib/evals/runtime`의 `runEvalSuiteAgainstTarget()`을 가져와 테스트 DB를 대상으로 실행한 다음, 반환된 `PersistedEvalRun.summary`를 확인합니다.

라우트와 실행 기록을 다루는 테스트는
`tests/unit/evals-route.test.ts` 및 `tests/unit/evals-history.test.ts`에 있습니다.

## 확장 지점

일반적인 변경 사항과 해당 변경을 적용할 위치는 다음과 같습니다.

- **새로운 채점 전략** — `evaluateCase()`(`evalRunner.ts`)의 `switch (evalCase.expected.strategy)` 블록을 확장하고, `src/lib/db/evals.ts`의 `EvalCaseStrategy`와 `schemas.ts`의 `evalCaseBuilderSchema`를 확장합니다.
- **새로운 기본 제공 스위트** — 스위트 객체를 정의하고 `evalRunner.ts` 하단에서 `registerSuite()`를 호출합니다. `listSuites()`가 이를 자동으로 검색합니다.
- **동시 실행** — `runEvalSuiteAgainstTarget()`의 순차적 `for` 루프를 동시성 한도가 지정된 `Promise.all`로 변경합니다(현재 동시성 제어는 존재하지 않습니다).
- **스트리밍/도구 호출 케이스** — 현재 실행기는 `stream: false`를 강제합니다. 스트리밍 또는 도구 호출을 인식하는 평가를 지원하려면 `runtime.ts`를 변경해야 합니다(채점 전에 SSE 청크를 캡처하고 집계).

## 함께 보기

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — 전체 제품 사용 안내
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — 요청 파이프라인 참조
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo 점수 산정 엔진(실시간 런타임)
- 소스: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
