# Adaptive Routing: Routing Events, Quality Feedback & Explainability (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/ADAPTIVE_ROUTING.md) · 🇪🇹 [am](../../../am/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇦 [ar](../../../ar/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇿 [az](../../../az/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇬 [bg](../../../bg/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇩 [bn](../../../bn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇦 [bs](../../../bs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇿 [cs](../../../cs/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇰 [da](../../../da/docs/architecture/ADAPTIVE_ROUTING.md) · 🇩🇪 [de](../../../de/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇷 [el](../../../el/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇸 [es](../../../es/docs/architecture/ADAPTIVE_ROUTING.md) · 🇪🇪 [et](../../../et/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇷 [fa](../../../fa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇮 [fi](../../../fi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇫🇷 [fr](../../../fr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇪 [ga](../../../ga/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [gu](../../../gu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ha](../../../ha/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇱 [he](../../../he/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [hi](../../../hi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇷 [hr](../../../hr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇭🇺 [hu](../../../hu/docs/architecture/ADAPTIVE_ROUTING.md) · 🇦🇲 [hy](../../../hy/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇩 [id](../../../id/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [ig](../../../ig/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇹 [it](../../../it/docs/architecture/ADAPTIVE_ROUTING.md) · 🇯🇵 [ja](../../../ja/docs/architecture/ADAPTIVE_ROUTING.md) · 🇬🇪 [ka](../../../ka/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇭 [km](../../../km/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [kn](../../../kn/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇹 [lt](../../../lt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇻 [lv](../../../lv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ml](../../../ml/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [mr](../../../mr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇾 [ms](../../../ms/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇹 [mt](../../../mt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇲🇲 [my](../../../my/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇵 [ne](../../../ne/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇱 [nl](../../../nl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇴 [no](../../../no/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [or](../../../or/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [pa](../../../pa/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇭 [phi](../../../phi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇱 [pl](../../../pl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇹 [pt](../../../pt/docs/architecture/ADAPTIVE_ROUTING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇴 [ro](../../../ro/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇺 [ru](../../../ru/docs/architecture/ADAPTIVE_ROUTING.md) · 🇱🇰 [si](../../../si/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇰 [sk](../../../sk/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇮 [sl](../../../sl/docs/architecture/ADAPTIVE_ROUTING.md) · 🇷🇸 [sr](../../../sr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇸🇪 [sv](../../../sv/docs/architecture/ADAPTIVE_ROUTING.md) · 🇰🇪 [sw](../../../sw/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [ta](../../../ta/docs/architecture/ADAPTIVE_ROUTING.md) · 🇮🇳 [te](../../../te/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇭 [th](../../../th/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇷 [tr](../../../tr/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/ADAPTIVE_ROUTING.md) · 🇵🇰 [ur](../../../ur/docs/architecture/ADAPTIVE_ROUTING.md) · 🇺🇿 [uz](../../../uz/docs/architecture/ADAPTIVE_ROUTING.md) · 🇻🇳 [vi](../../../vi/docs/architecture/ADAPTIVE_ROUTING.md) · 🇳🇬 [yo](../../../yo/docs/architecture/ADAPTIVE_ROUTING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/ADAPTIVE_ROUTING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/ADAPTIVE_ROUTING.md)

---

이 문서는 OmniRoute에 추가된 피드백 기반 적응형 라우팅 기반 구조를 설명합니다.
의도적으로 작은 범위로 구성되어 있으며, 타입이 지정된 라우팅 결과 채널, 기존
auto-combo 스코어러에 반영되는 온라인 품질 신호, 선택적 OpenTelemetry 익스포터,
그리고 설명 가능성 엔드포인트를 도입합니다. 이 기능은 기존 복원력 스택(서킷 브레이커,
연결 쿨다운, 모델 잠금, 상태 매트릭스, 오토파일럿)을 대체하지 **않으며**, 이를
보완합니다.

## 1. 아키텍처 컨텍스트

OmniRoute는 **요청 핫 패스**와 **제어/인텔리전스 플레인**으로 구성된 데이터
플레인입니다. 핫 패스는 빠르고, 메모리 효율적이며, 비동기적이고, 복원력이 높으며,
예측 가능한 상태를 유지해야 합니다. 평가, 품질 스코어링, 실험 및 과거 데이터 분석은
제어 플레인에 속합니다.

```
AI 에이전트 / IDE
      │
      ▼
┌─────────────────────┐
│    OmniRoute        │   데이터 플레인(고속, 동기식, 인메모리)
│  라우팅 / 장애 조치 │
│  상태 / 가드레일    │
│  캐시 / 스트리밍    │
└──────────┬──────────┘
           │ RoutingEvent (fire-and-forget, ~0.2µs)
           ▼
┌─────────────────────┐
│  피드백 싱크        │   제어 플레인(비동기, 최선형)
│  품질 추적기        │
│  OTel 익스포터      │
│  설명 저장소        │
└──────────┬──────────┘
           ▼  품질 점수
      auto-combo 스코어러
```

### 기존에 이미 존재했던 항목(감사 완료, 중복 구현하지 않음)

| 개념                               | 기존 구현                                                                          |
| ---------------------------------- | ---------------------------------------------------------------------------------- |
| 가용성(트래픽을 전송할 수 있는가?) | 서킷 브레이커(CLOSED/DEGRADED/OPEN/HALF_OPEN, DB에 영속화), 연결 쿨다운, 모델 잠금 |
| 상태 보고                          | `providerHealthMatrix.ts`, `providerHealthAutopilot.ts`                            |
| 섀도 트래픽                        | `open-sse/services/combo/shadowRouting.ts`                                         |
| 가드레일                           | `src/lib/guardrails/` (사전/사후 훅)                                               |
| 정확 일치 캐시                     | `src/lib/semanticCache.ts` (시그니처 기반)                                         |
| 평가기 / 평가 기반 라우팅          | `src/lib/evals/`, `open-sse/services/evalRouting.ts`                               |
| Combo 결정 설명 가능성             | `open-sse/services/combo/decisionTrace.ts`                                         |
| 대시보드 실시간 이벤트             | `src/lib/events/eventBus.ts` (UI 알림 채널, `unknown` 페이로드, 100개 항목 기록)   |

라우팅 이벤트 계층은 `eventBus`를 다시 구현한 것이 **아닙니다**. 해당 버스는
대시보드의 실시간 알림 채널로서, 타입이 지정된 _이벤트 이름_, 불투명한 페이로드,
UI 소비자로 구성됩니다. `RoutingEvent`는 타입이 지정된 _결과_ 구조체
(지연 시간/토큰/비용/결과/완료 사유)이며, 제어 플레인의 피드백 싱크
(품질 추적기, OTel 익스포터, 설명 저장소)에서 사용합니다.

### 기존에 없어서 이번에 추가된 항목

1. **타입이 지정된 라우팅 결과 이벤트 + 싱크 추상화** (`RoutingEvent` /
   `RoutingEventSink`). `decisionTrace`는 combo 범위로 한정되며 인메모리
   전용입니다. `comboMetrics`는 누적 카운터이고, `call_logs`는 원시 비동기
   영속화입니다. 이들 중 어느 것도 품질 추적기, OTel 익스포터 또는
   Future-AGI 스타일 평가기가 구독할 수 있는 타입 기반 싱크형 결과 채널이
   아닙니다.
2. 출력 품질에 대한 **온라인 품질 신호**(EWMA). 이전 스코어러는 정적 작업
   적합도와 선택적으로 활성화되는 평가 통과율만을 통해 "품질"을 간접적으로
   추정했습니다.
3. GenAI 시맨틱 규칙을 사용하는 **선택적 무의존성 OTel 익스포터**.
4. 실제 라우팅 결정과 품질 상태를 반환하는 **설명 가능성 엔드포인트**.

## 2. 라우팅 이벤트(피드백 기반)

파일: `open-sse/services/routing/events.ts`, `.../index.ts`

`RoutingEvent`는 라우팅 메타데이터만 전달합니다.

```ts
interface RoutingEvent {
  requestId: string;
  provider: string;
  model: string;
  strategy: string; // "auto" | "priority" | "direct" | ...
  latencyMs: number;
  ttftMs: number | null;
  inputTokens: number | null;
  outputTokens: number | null;
  cost: number | null;
  retries: number;
  fallbackUsed: boolean;
  outcome: RoutingOutcome; // 허용 목록에 정의된 유니온
  status: number | null;
  finishReason: string | null;
  connectionId: string | null;
  ts: number;
}
```

`RoutingEventSink`는 TypeScript에서 `Send+Sync` 스타일의 트레이트입니다.

```ts
interface RoutingEventSink {
  readonly name: string;
  record(event: RoutingEvent): void; // O(1)이어야 하며 동기 I/O는 허용되지 않음
}
```

핫 패스는 완료된 요청마다 `emitRoutingEvent(event)`를 한 번 호출합니다
(스트리밍 완료 콜백, 비스트리밍 성공 경로 및 `handleChatCore`의
잘못된 형식의 200 응답 실패 경로). 디스패치는 등록된 싱크에 동기식으로
팬아웃되지만, 각 싱크는 인메모리 상태를 큐에 추가하거나 업데이트하기만 합니다. **핫
패스에서는 동기식 데이터베이스 쓰기나 네트워크 I/O가 발생하지 않습니다.**

기본 싱크:

- `MemoryRoutingEventStore` — explain 엔드포인트를 위한 크기 제한(500)의
  최신 항목 우선 링 버퍼입니다.
- `QualityTracker` 소비자 — EWMA 품질 추정치를 업데이트합니다.
- `OtlpHttpsEventSink` — 선택 사항이며, `OMNIROUTE_OTEL_ENDPOINT`
  (또는 `OTEL_EXPORTER_OTLP_ENDPOINT`)가 설정된 경우에만 활성화됩니다.

### 측정된 오버헤드(정직한 비교)

이 워크스테이션에서 `npm run bench:routing-events`를 실행했습니다(10만 회 반복;
연산당 백분위수가 `performance.now()` 타이머 해상도보다 낮으므로 1µs 미만의 연산은
집계된 µs/op로 측정함).

| 시나리오                        | µs/op  | ops/s  |
| ------------------------------- | ------ | ------ |
| 기준선(스코어링만)              | ~0.045 | ~22 M  |
| 기준선 + RoutingEvent(싱크 2개) | ~0.168 | ~5.9 M |
| 기준선 + 이벤트 + OTel 큐 추가  | ~0.163 | ~6.1 M |
| 동시 실행(교차 배치 8개)        | ~0.18  | —      |

기준선 스코어링 대비 이벤트 디스패치의 차이는 요청당 약 0.12µs이며, OTel 싱크는
큐에 추가하기만 하므로(O(1) 버퍼 푸시) 측정 가능한 오버헤드를 추가하지 않습니다. 이 수치는
특정 머신에 종속적인 상대적 결과이며, 프로덕션 환경에 대한 보장이 아닙니다. v1의 "~0.2 µs"
수치는 집계된 추정치였습니다. 이 방법론은 스코어링 기준선과
이벤트 디스패치 비용을 분리합니다.

## 3. 품질 신호(피드백 기반 제공자 상태)

파일: `open-sse/services/routing/quality.ts`

v2는 **운영** 품질과 **의미론적** 품질을 분리합니다.

- **운영** — 라우팅 핫 패스에서 도출됩니다(HTTP 4xx/5xx, 연결
  실패, 429, 잘못된 형식의 응답, 스트림 중단, `finish_reason=length`,
  출력이 0인 성공, 지연 시간/TTFT EWMA). 200 응답은 의미론적
  품질로 취급되지 **않습니다**.
- **의미론적** — 생성된 출력의 실제 가치입니다. 평가자가
  `setSemanticQuality()`를 통해서만 생성할 수 있습니다. 평가자가 값을 제공하기 전까지는 `null`이며
  운영 점수에 절대 반영되지 않습니다.

각 (provider, model)별 상태(EWMA + 제한된 카운터):

- `successEwma` — 결과 성공 여부의 EWMA(α=0.2).
- `latencyEwma` / `ttftEwma` — 지연 시간의 EWMA(α=0.1).
- `samples`, `anomalies`, `rateLimited`, `semantic`, `semanticConfidence`.
- `recencyMs` — 해당 모델이 마지막으로 관측된 후 경과한 시간.

### 신뢰도/샘플 인지

`confidence = clamp01(samples / 50)`이며, 스코어러에 반환되는 점수는
중립 중간값에 가깝도록 혼합됩니다.

```
score = 0.5 + confidence * (operational - 0.5)
```

결과(테스트로 검증됨):

- 콜드 제공자(샘플 0개)의 점수는 **0.5**입니다. 부당하게 불이익을 받지는 않지만,
  수천 개의 우수한 관측치를 보유한 제공자를 압도할 수는 없습니다.
- 운 좋게 7번 성공한 제공자의 점수는 0.5 쪽으로 조정됩니다(낙관적인
  초기화만으로 우위를 차지하지 않음).
- 샘플이 50개 이상인 제공자는 실제 운영 점수에 수렴합니다.
- 성능 저하와 복구는 점진적으로 이루어지며(EWMA), 단 한 번의 고립된 실패가
  정상적인 제공자를 망가뜨리지 않습니다.

`ProviderQuality`는 `{ operational, semantic, confidence, samples, anomalies,
rateLimited, successEwma, latencyEwmaMs, ttftEwmaMs, recencyMs }`를 노출합니다.

이는 auto-combo 스코어러에 `quality` 스코어링 요소로 전달됩니다.

- `open-sse/services/autoCombo/scoring.ts`의
  `ScoringFactors.quality` / `ScoringWeights.quality`.
- `DEFAULT_WEIGHTS`: `health` 0.1905 → 0.1605, `quality` 0.03. 합계는 1.0으로 유지됩니다.
- `buildAutoCandidates`는 트래커에서 가져온 값으로 `candidate.quality`를 채웁니다. 데이터가
  없는 후보는 기본적으로 중립값인 **0.5**를 사용합니다(콜드 후보는 이득도
  불이익도 받지 않음).

폐쇄 루프:

```
RoutingEvent → QualityTracker → getQualityScore → auto-combo 품질 요소
      ↑                                                    │
      └────── 요청 결과(handleChatCore) ←──────────────────┘
```

### 하드 제외와 소프트 페널티

품질 신호는 **소프트 적응형 선호도**로만 사용됩니다. 하드 제외는
기존 복원력 스택이 계속 담당합니다. 회로 차단기 OPEN, 할당량 소진,
인증 실패, 모델 잠금은 어느 것도 품질 점수의 영향을 받지 않습니다.
품질 점수가 일시적으로 하락한 제공자는 선호도가 낮아질 뿐,
하드 비활성화되지 않습니다.

## 3b. 표준 스트림 타이밍 (TTFT / ITL)

파일: `open-sse/utils/streamTiming.ts`

`createStreamTiming()`은 스트리밍 경로의 단일 계측 지점이며,
`createSSEStream`에 연결됩니다(open-sse/utils/stream.ts):

- `markByte()` — 첫 번째 업스트림 청크를 수신합니다.
- `markForward()` — 클라이언트로 첫 번째 청크를 전달합니다(TTFT에 사용).
- `markInterrupted()` — 정상적으로 완료되기 전에 스트림 시간 초과/중단/오류가 발생합니다.
- `ttft()` = 첫 번째로 전달된 SSE 청크의 지연 시간. **이는 토큰 수준의 TTFT가 아닙니다** —
  단일 SSE 청크에는 0개/1개/여러 개의 토큰이 포함될 수 있습니다. 이 점은 명확히 문서화되어 있습니다.
- `avgItlMs()` = 평균 청크 간 간격(ITL을 대리하는 청크 지연 시간 지표).

TTFT/ITL/중단 여부는 `RoutingEvent`(`ttftMs`, `itlMs`)에 포함되며,
OTel 싱크에서 GenAI/OmniRoute 스팬 속성으로 내보냅니다.

## 4. OpenTelemetry / GenAI 관측 가능성

파일: `open-sse/services/routing/otel.ts`

- 의존성이 없는 OTLP/HTTP JSON 익스포터입니다(전역 `fetch`를 사용하며
  `@opentelemetry/*` SDK는 사용하지 않음).
- 스팬은 GenAI 의미 체계 규칙(`gen_ai.provider.name`,
  `gen_ai.request.model`, `gen_ai.usage.input_tokens/output_tokens`,
  `gen_ai.completion.finish_reason`, `gen_ai.system`)과 OmniRoute 라우팅
  속성(결과, 상태, TTFT, 재시도, 폴백)을 따릅니다.
- `record()`는 제한된 버퍼에 추가하기만 합니다(O(1)). 백그라운드 타이머가
  `POST {endpoint}/v1/traces`를 통해 비동기적으로 플러시합니다. 과부하 시에는
  가장 오래된 이벤트를 삭제하며(`dropped` 카운터), 데이터 플레인에
  절대 백프레셔를 가하지 않습니다.
- **구성하지 않으면 비활성화됩니다.** `OMNIROUTE_OTEL_ENDPOINT`(또는
  `OTEL_EXPORTER_OTLP_ENDPOINT`)를 설정해야 합니다. 그렇지 않으면 싱크가
  등록되지 않으며 OTel 코드는 전혀 실행되지 않습니다.

## 5. 설명 가능성

- `GET /v1/explain/routing`은 최근 `RoutingEvent`(최신 항목부터 정렬된 실제
  결정)와 공급자/모델별 품질 스냅샷을 반환합니다.
- 인증은 `/v1/combos`와 동일합니다(Bearer API 키 또는 대시보드 세션 사용,
  `REQUIRE_API_KEY=false`인 단일 사용자 로컬 배포에서는 익명 접근 허용).
- 기존 `decisionTrace.ts`를 통해 조합 수준의 호출별 추적을 계속 사용할 수
  있습니다(헤더 `X-OmniRoute-Combo-Trace`).
- 안전성: 이벤트에는 라우팅 메타데이터만 포함되며 프롬프트/본문/자격 증명은
  절대 포함되지 않습니다.

## 6. 평가 플레인 통합(Future AGI 대비)

OmniRoute는 Future AGI(또는 모든 평가기)를 **의존성이 아닌 잠재적
지능/평가 백엔드**로 취급합니다. 통합 지점은 다음과 같습니다.

- `RoutingEventSink`는 이벤트를 평가기로 비동기적으로 전달할 수 있습니다.
- `MemoryRoutingEventStore`와 품질 스냅샷은 평가기에 원시 결정 스트림을
  제공합니다.
- 향후 `Evaluator`(결정론적 평가기, 로컬 판정기, HTTP, WASM)는 이벤트/추적을
  소비하고 동일한 `getQualityScore`/품질 계수 경로에 반영되는
  `QualityScore`를 반환합니다.
- 기존 평가 기반 라우팅(`open-sse/services/evalRouting.ts`)은 활성화된 경우
  이미 `eval_runs` 통과율에 따라 조합 대상을 재정렬합니다.

요청 경로에서는 어떠한 평가도 동기적으로 실행되지 않으며, 평가기가 없어도
게이트웨이는 완전히 작동합니다.

## 7. 최종 아키텍처 검토

1. **동기식 핫 패스에 남아 있는 것은 무엇입니까?** 라우팅/점수 산정, 가드레일
   사전 검사, 캐시 조회, 인메모리 싱크로의 한 번의 `emitRoutingEvent` 팬아웃
   (기준 점수 산정 대비 약 0.12 µs)입니다.
2. **비동기 처리로 이동한 것은 무엇입니까?** OTel 내보내기(타이머 + fetch),
   `call_logs`/사용량 영속화, 시맨틱 캐시 쓰기입니다. 품질 처리는 인메모리이며
   O(1)이므로 비동기가 필요하지 않습니다.
3. **라우팅 결과는 어떻게 피드백이 됩니까?** `handleChatCore`가
   `RoutingEvent`를 방출 → `QualityTracker`가 EWMA 상태를 업데이트 →
   `getQualityScore`가 자동 조합의 `quality` 계수에 값을 제공합니다.
4. **품질은 향후 라우팅에 어떤 영향을 줍니까?** 낮은 품질 점수는
   `scoreAutoTargets`에서 해당 공급자/모델의 가중 점수를 낮춥니다. 따라서
   성능이 저하된 모델은 점진적으로 우선순위가 낮아지고, EWMA가 개선되면
   다시 복구됩니다.
5. **Future AGI는 의존성이 되지 않으면서 어떻게 통합될 수 있습니까?**
   `RoutingEventSink` 인터페이스/향후 `Evaluator` 어댑터를 통해 통합되며,
   하드코딩된 의존성은 없습니다.
6. **평가기를 사용할 수 없으면 어떻게 됩니까?** 라우팅에는 영향이 없으며,
   관측된 신호가 없는 모델의 품질은 중립값(1.0)으로 폴백됩니다.
7. **텔레메트리를 사용할 수 없으면 어떻게 됩니까?** OTel 싱크가 등록되지
   않을 뿐이며, 나머지 라우팅 계층은 변경 없이 실행됩니다.
8. **과부하 시에는 어떻게 됩니까?** OTel 버퍼가 가장 오래된 이벤트를
   삭제합니다. 품질 데이터와 링 버퍼는 설계상 크기가 제한되며 백프레셔는
   발생하지 않습니다.
9. **성능 저하 후 공급자 상태는 어떻게 복구됩니까?** 성공이 누적되면서
   EWMA가 다시 수렴합니다. 워밍업은 콜드 모델을 중립 상태로 유지하고,
   서킷 브레이커는 독립적으로 HALF_OPEN 프로브를 통해 복구됩니다.
10. **제안된 기능 중 의도적으로 구현하지 않은 것은 무엇이며, 그 이유는 무엇입니까?**
    - 섀도 트래픽/실험 — 이미 구현되어 있음
      (`combo/shadowRouting.ts`), 재구현하지 않았습니다.
    - 가드레일 — 이미 구현되어 있음(`src/lib/guardrails/`), 중복 구현하지
      않았습니다.
    - 시맨틱 캐시 — 이미 구현되어 있음(`src/lib/semanticCache.ts`), 중복
      구현하지 않았습니다.
    - 완전한 실험 관리 플랫폼, 데이터셋 도구, 프롬프트 최적화 플랫폼,
      벡터 DB 또는 필수 외부 OTel 인프라 — 경량 데이터 플레인의 범위를
      벗어납니다.
    - Rust `RoutingEvent` 구조체 — 데이터 플레인은 TypeScript로 구현되어
      있으며, TS 타입이 이에 맞게 조정된 동등한 요소입니다.

## 8. 구성 참조

| 변수                          | 기본값        | 효과                                                                              |
| ----------------------------- | ------------- | --------------------------------------------------------------------------------- |
| `OMNIROUTE_OTEL_ENDPOINT`     | 설정되지 않음 | 설정하면 OTLP/HTTP 트레이스 익스포터를 활성화합니다(예: `http://collector:4318`). |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | 설정되지 않음 | OTLP 엔드포인트의 대체 별칭입니다.                                                |
| `OTEL_SERVICE_NAME`           | `omniroute`   | `service.name` 리소스 속성입니다.                                                 |

## 9. 테스트

- `tests/unit/routing-events.test.ts` — 이벤트 정규화, 상태
  분류, 크기가 제한된 링 버퍼, 싱크 팬아웃 및 격리.
- `tests/unit/routing-quality.test.ts` — EWMA 워밍업, 실패/성공 복구,
  이상 징후 페널티, 429 일시적 오류 처리, 스냅샷, 초기화.
- `tests/unit/routing-scoring-quality.test.ts` — 가중치 무결성, 중립
  기본값, 품질 계수 순위 지정.
- `tests/unit/routing-otel.test.ts` — 활성화 게이팅, GenAI 스팬 페이로드, 비동기
  플러시, 과부하 시 폐기.
- `tests/unit/routing-events-concurrency.test.ts` — 수천 개의 이벤트, 링
  버퍼 크기 제한, 예외 발생 싱크 격리, 인터리브된 비동기 버스트,
  삽입 중 초기화.
- `tests/unit/routing-adaptive-e2e.test.ts` — 실제
  `scoreAutoTargets` 스코어러를 통한 결정론적 엔드투엔드 루프: 정상 → 성능 저하 → 복구 → 일시적 이상, 그리고
  콜드 스타트 및 운 좋게 선택된 콜드 프로바이더 시나리오.
- `tests/unit/stream-timing.test.ts` — TTFT(처음 전달된 청크), ITL,
  첫 바이트와 첫 전달 비교, 중단, 잘못된 형식/빈 청크 안전성.

## 10. 기존 문제 상태(18단계)

| 문제                                             | 상태                       | 참고                                                                                                                                                                                                                                                    |
| ------------------------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `omniglyph` 내보내기 불일치                      | **수정됨(환경 문제)**      | `node_modules`가 `package-lock.json`과 동기화되지 않았습니다(설치된 버전 1.3.1, 잠긴 버전 1.4.0). `npm install omniglyph@1.4.0`을 실행하여 잠긴 버전을 복원했으며, 타입 오류가 0개로 줄었습니다. 매니페스트는 변경되지 않았습니다.                      |
| 오래된 `getKnownContextOverflow` 테스트          | **알려짐 — 수정되지 않음** | `combo-context-overflow-compression-probe.test.ts`가 `open-sse/services/combo.ts`에 더 이상 존재하지 않는 함수를 가져옵니다(주석에서만 참조됨). 수정하려면 해당 함수를 다시 구현하거나 테스트를 다시 작성해야 하며, 이는 관련 없는 아키텍처 변경입니다. |
| `combo-runtime-unit-concurrency.test.ts` DB 격리 | **알려짐 — 수정되지 않음** | 직접 실행할 때 테스트 하네스의 SQLite 격리 어설션이 실패하며, 기본 브랜치에서도 동일하게 실패합니다.                                                                                                                                                    |
| i18n `llm.txt` 불일치                            | **알려짐 — 수정되지 않음** | `docs/i18n/*/llm.txt`가 루트와 다르며, 이는 기존 문제로 문서 동기화용 커밋 전 게이트를 차단합니다.                                                                                                                                                      |

환경 문제와 코드 문제는 명확히 구분되며, 변경된 테스트 필터 뒤에 관련 없는 실패를
숨기지 않습니다.
