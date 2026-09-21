# Quota Sharing Engine (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/QUOTA_SHARE.md) · 🇪🇹 [am](../../../am/docs/routing/QUOTA_SHARE.md) · 🇸🇦 [ar](../../../ar/docs/routing/QUOTA_SHARE.md) · 🇦🇿 [az](../../../az/docs/routing/QUOTA_SHARE.md) · 🇧🇬 [bg](../../../bg/docs/routing/QUOTA_SHARE.md) · 🇧🇩 [bn](../../../bn/docs/routing/QUOTA_SHARE.md) · 🇨🇿 [cs](../../../cs/docs/routing/QUOTA_SHARE.md) · 🇩🇰 [da](../../../da/docs/routing/QUOTA_SHARE.md) · 🇩🇪 [de](../../../de/docs/routing/QUOTA_SHARE.md) · 🇬🇷 [el](../../../el/docs/routing/QUOTA_SHARE.md) · 🇪🇸 [es](../../../es/docs/routing/QUOTA_SHARE.md) · 🇪🇪 [et](../../../et/docs/routing/QUOTA_SHARE.md) · 🇮🇷 [fa](../../../fa/docs/routing/QUOTA_SHARE.md) · 🇫🇮 [fi](../../../fi/docs/routing/QUOTA_SHARE.md) · 🇫🇷 [fr](../../../fr/docs/routing/QUOTA_SHARE.md) · 🇮🇪 [ga](../../../ga/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [gu](../../../gu/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ha](../../../ha/docs/routing/QUOTA_SHARE.md) · 🇮🇱 [he](../../../he/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [hi](../../../hi/docs/routing/QUOTA_SHARE.md) · 🇭🇷 [hr](../../../hr/docs/routing/QUOTA_SHARE.md) · 🇭🇺 [hu](../../../hu/docs/routing/QUOTA_SHARE.md) · 🇦🇲 [hy](../../../hy/docs/routing/QUOTA_SHARE.md) · 🇮🇩 [id](../../../id/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [ig](../../../ig/docs/routing/QUOTA_SHARE.md) · 🇮🇹 [it](../../../it/docs/routing/QUOTA_SHARE.md) · 🇯🇵 [ja](../../../ja/docs/routing/QUOTA_SHARE.md) · 🇬🇪 [ka](../../../ka/docs/routing/QUOTA_SHARE.md) · 🇰🇭 [km](../../../km/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [kn](../../../kn/docs/routing/QUOTA_SHARE.md) · 🇱🇹 [lt](../../../lt/docs/routing/QUOTA_SHARE.md) · 🇱🇻 [lv](../../../lv/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ml](../../../ml/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [mr](../../../mr/docs/routing/QUOTA_SHARE.md) · 🇲🇾 [ms](../../../ms/docs/routing/QUOTA_SHARE.md) · 🇲🇹 [mt](../../../mt/docs/routing/QUOTA_SHARE.md) · 🇲🇲 [my](../../../my/docs/routing/QUOTA_SHARE.md) · 🇳🇵 [ne](../../../ne/docs/routing/QUOTA_SHARE.md) · 🇳🇱 [nl](../../../nl/docs/routing/QUOTA_SHARE.md) · 🇳🇴 [no](../../../no/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [or](../../../or/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [pa](../../../pa/docs/routing/QUOTA_SHARE.md) · 🇵🇭 [phi](../../../phi/docs/routing/QUOTA_SHARE.md) · 🇵🇱 [pl](../../../pl/docs/routing/QUOTA_SHARE.md) · 🇵🇹 [pt](../../../pt/docs/routing/QUOTA_SHARE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/QUOTA_SHARE.md) · 🇷🇴 [ro](../../../ro/docs/routing/QUOTA_SHARE.md) · 🇷🇺 [ru](../../../ru/docs/routing/QUOTA_SHARE.md) · 🇱🇰 [si](../../../si/docs/routing/QUOTA_SHARE.md) · 🇸🇰 [sk](../../../sk/docs/routing/QUOTA_SHARE.md) · 🇸🇮 [sl](../../../sl/docs/routing/QUOTA_SHARE.md) · 🇷🇸 [sr](../../../sr/docs/routing/QUOTA_SHARE.md) · 🇸🇪 [sv](../../../sv/docs/routing/QUOTA_SHARE.md) · 🇰🇪 [sw](../../../sw/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [ta](../../../ta/docs/routing/QUOTA_SHARE.md) · 🇮🇳 [te](../../../te/docs/routing/QUOTA_SHARE.md) · 🇹🇭 [th](../../../th/docs/routing/QUOTA_SHARE.md) · 🇹🇷 [tr](../../../tr/docs/routing/QUOTA_SHARE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/QUOTA_SHARE.md) · 🇵🇰 [ur](../../../ur/docs/routing/QUOTA_SHARE.md) · 🇺🇿 [uz](../../../uz/docs/routing/QUOTA_SHARE.md) · 🇻🇳 [vi](../../../vi/docs/routing/QUOTA_SHARE.md) · 🇳🇬 [yo](../../../yo/docs/routing/QUOTA_SHARE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/QUOTA_SHARE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/QUOTA_SHARE.md)

---

> **문서 참조**: `docs/routing/QUOTA_SHARE.md`
> Group B (계획 16 + 22)의 일부입니다.

---

## 개요

할당량 공유 엔진은 동일한 연결을 공유하는 여러 API 키에 공급자의 시간 기반 할당량(예: Codex
5시간 윈도우, Kimi 1500 req/h)을 공정하게 분배합니다.

**해결하는 문제:** OmniRoute는 동일한 업스트림 공급자 계정에 여러 API 키를 프록시합니다.
공유 로직이 없으면 키 A에서 발생한 요청 급증으로 해당 시간의 공급자 할당량이 소진되어,
윈도우가 재설정될 때까지 키 B와 C가 차단될 수 있습니다.
엔진은 다음과 같은 방식으로 이를 방지합니다.

1. 각 차원(%, 요청 수, 토큰 수, $)에 대한 각 키의 롤링 사용량을 추적합니다.
2. 작업 보존형 공정 분배 알고리즘을 적용합니다. 글로벌 풀이 포화되지 않은 동안에는 키가
   유휴 지분을 빌려 사용할 수 있습니다.
3. 요청이 업스트림 실행기에 도달하기 전에 핫 패스(`chatCore.ts`)에서 결과를 적용합니다.

---

## 알고리즘: 작업 보존형 공정 분배

`src/lib/quota/fairShare.ts`에 구현되어 있습니다.

### 모드

| 조건                                       | 모드       | 동작                                                 |
| ------------------------------------------ | ---------- | ---------------------------------------------------- |
| `globalUsedPercent < saturationThreshold`  | **관대함** | 키는 글로벌 한도에서 총사용량을 뺀 만큼 빌릴 수 있음 |
| `globalUsedPercent >= saturationThreshold` | **엄격함** | 개별 공정 지분을 엄격하게 적용                       |

기본값은 `saturationThreshold = 0.5`(환경 변수 `QUOTA_SATURATION_THRESHOLD`)입니다.

### 차원별 결정

풀의 각 활성 차원에 대해 엔진은 다음을 계산합니다.

```
fairShareAllowed = poolLimit × (allocationWeight / 100)
consumed        = 이 키의 현재 롤링 값(QuotaStore.peek에서 가져옴)
remaining       = fairShareAllowed - consumed
```

그런 다음:

- **`policy = hard`**: `consumed > fairShareAllowed`이고 모드가 엄격함이면 → **차단**합니다.
- **`policy = soft`**: `consumed > fairShareAllowed`이고 모드가 엄격함이면 → **페널티를 적용**합니다(콤보에서 우선순위를 낮추며, 하드 차단은 하지 않음).
- **`policy = burst`**: 공정 지분과 관계없이 글로벌 여유분이 있는 동안 허용합니다.

### 절대 상한

할당의 `capValue` + `capUnit`은 모드나 정책과 무관한 하드 상한입니다.
`consumed >= capValue`인 모든 차원은 항상 요청을 **차단**합니다.

### 다차원 검사

풀의 차원 중 **하나라도** 차단 조건을 충족하면 요청이 차단됩니다. 각 차원은
독립적이므로 5h% 소진은 weekly% 차원에 영향을 주지 않습니다.

### 차용

관대함 모드에서는 할당량을 적게 사용한 키가 다른 키의 미할당 지분에서 남는 양을
사용할 수 있습니다. 공식은 다음과 같습니다.

```
maxAllowed = globalLimit - consumedByOtherKeys
```

여기서 `consumedByOtherKeys = consumedTotal - consumedByThisKey`입니다. 글로벌 상한
(해당 차원의 풀 `limit`)은 항상 하드 상한입니다.

---

## 슬라이딩 윈도우 카운터

`src/lib/quota/sqliteQuotaStore.ts`와 `redisQuotaStore.ts`에 구현되어 있습니다.

각 `(apiKeyId, dimensionKey)`에 대해 두 개의 버킷을 사용합니다.

- `curr`: 현재 버킷(`floor(nowMs / windowMs)`)
- `prev`: 이전 버킷(`curr - 1`)

유효 롤링 값:

```
effectiveBucketIndex = floor(nowMs / windowMs)
bucketStartMs        = effectiveBucketIndex × windowMs
elapsed              = nowMs - bucketStartMs
weight               = 1 - elapsed / windowMs

effective = prev × weight + curr
```

**정밀도**: 약 99%의 정확도를 제공합니다. 버킷 경계에서 오차는 최대 윈도우 크기의
1%입니다(2버킷 근사 방식의 고유한 특성).

### 동시성

SQLite 드라이버: `(apiKeyId | dimensionKey)` 키별 인메모리 뮤텍스가
읽기-수정-쓰기 경쟁을 방지합니다. 이 패턴은 `src/sse/services/auth.ts`의 요청 폭주 방지 방식을 따릅니다.

Redis 드라이버: 원자적 증가를 위해 Lua EVAL 스크립트를 사용하며, 단일 Redis 명령으로 실행됩니다.

---

## 드라이버

### SQLite (기본값, 설치 불필요)

- 테이블: `quota_consumption`(마이그레이션 `073_quota_pools.sql` / `074_quota_consumption.sql` 참조).
- 단일 인스턴스 배포에 가장 적합합니다.
- 모든 영구 데이터는 기존 OmniRoute SQLite DB(`DATA_DIR/storage.sqlite`)에 저장됩니다.

### Redis (선택 사항, 다중 인스턴스)

- `ioredis` npm 패키지가 필요합니다.
- 카운터는 Redis에 저장되며, 메타데이터(풀/할당)는 계속 SQLite에 저장됩니다.
- 카운터를 공유해야 하는 다중 복제본 배포에 가장 적합합니다.

### 드라이버 전환

설정 UI(`/dashboard/settings` → 할당량 저장소) 또는 환경 변수를 통해 전환할 수 있습니다.

```bash
QUOTA_STORE_DRIVER=redis
QUOTA_STORE_REDIS_URL=redis://localhost:6379
```

DB 설정이 환경 변수보다 우선합니다. `driver=redis`이지만 URL이 없거나
`ioredis`가 설치되어 있지 않으면 팩토리는 SQLite로 대체하고 경고를 기록합니다.

드라이버 선택 순서:

1. DB 설정 `quotaStore.driver`
2. 환경 변수 `QUOTA_STORE_DRIVER`
3. 기본값: `sqlite`

---

## 다중 차원

하나의 풀에는 여러 차원이 있을 수 있습니다. 각 차원은 독립적입니다.

```ts
QuotaDimension {
  unit: "percent" | "requests" | "tokens" | "usd",
  window: "5h" | "hourly" | "daily" | "weekly" | "monthly",
  limit: number,  // 이 차원에 대한 전역 풀 상한
}
```

**예시: Codex 요금제**(5시간 백분율 + 주간 백분율):

```json
[
  { "unit": "percent", "window": "5h", "limit": 100 },
  { "unit": "percent", "window": "weekly", "limit": 100 }
]
```

요청이 허용되려면 모든 차원의 조건을 충족해야 합니다.

---

## 요금제 해석기

`src/lib/quota/planResolver.ts`에 구현되어 있습니다.

우선순위(높은 순서에서 낮은 순서):

1. **수동 DB 재정의** — `provider_plans` 테이블, `connectionId`별로 적용됩니다.
2. **알려진 카탈로그** — `src/lib/quota/planRegistry.ts`(데이터 전용).
3. **빈 요금제** — 차원이 없으며, 수동 구성이 필요합니다.

### 알려진 카탈로그

| 제공업체              | 차원                                                          |
| --------------------- | ------------------------------------------------------------- |
| `codex`               | `percent/5h/100`, `percent/weekly/100`                        |
| `glm`                 | `tokens/5h`(limit=0, 알 수 없음), `tokens/weekly`             |
| `minimax`             | `tokens/5h`, `tokens/weekly`                                  |
| `bailian`             | `percent/5h/100`, `percent/weekly/100`, `percent/monthly/100` |
| `kimi`                | `requests/hourly/1500`                                        |
| `alibaba`             | `requests/monthly/90000`                                      |
| `openai`, `anthropic` | 기본값 없음 — 수동 구성이 필요함                              |

---

## 파이프라인 통합

### PRE 훅(`open-sse/handlers/chatCore.ts`)

인증 및 정책 검사 후, 업스트림 실행기 전에 실행됩니다.

```
resolveComboTargets / handleSingleModel
  → enforceQuotaShare(apiKeyId, connectionId, provider, estimatedCost)
      → 각 차원에 대해 getQuotaStore().peek()
      → fairShare.decideFairShare()
      → 차단하는 경우 → 429 반환(buildErrorBody, 강제 규칙 #12)
      → 허용 + 우선순위 낮춤인 경우 → 후보에 quotaSoftPenalty=true 설정
  → executor.execute()
```

**장애 시 허용**: `enforceQuotaShare`에서 예외가 발생하면 요청을 허용하고
`pino.warn` 로그를 기록합니다. 이를 통해 할당량 엔진의 버그가 모든
트래픽을 차단하는 것을 방지합니다.

### POST 훅(사용량 기록)

응답이 성공한 후:

```
executor가 성공 반환
  → spendRecorder.recordConsumption(apiKeyId, connectionId, provider, actualCost)
      → 각 차원에 대해 getQuotaStore().consume()
      → 장애 시 허용: 오류는 pino.warn으로 기록되며 클라이언트에 전파되지 않음
```

**편차 참고 사항**: 응답 후 `consume`이 실패하면 롤링 카운터가 실제보다 적게 집계됩니다.
제공업체의 포화 신호(예: `anthropic-ratelimit-unified-5h-utilization`)가
다음 요청에서 전역 추정치를 보정합니다.

### 콤보 소프트 페널티(`open-sse/services/combo.ts`)

`decision.deprioritize === true`인 경우:

```ts
if (candidate.quotaSoftPenalty) {
  score *= QUOTA_SOFT_DEPRIORITIZE_FACTOR; // 기본값 0.7
}
```

페널티는 다른 모든 점수 산정 요소가 적용된 후에 적용됩니다. 포화된 키를
자동 콤보에서 선택할 확률을 낮추되, 해당 키를 완전히 차단하지는 않습니다.

---

## UI 둘러보기

### `/dashboard/costs/quota-share` — 기본 풀 페이지

컴포넌트(모두 `src/app/(dashboard)/dashboard/costs/quota-share/`에 위치):

| 컴포넌트               | 용도                                                              |
| ---------------------- | ----------------------------------------------------------------- |
| `QuotaConceptCard`     | 신규 사용자에게 할당량 공유를 설명하는 소개 카드                  |
| `CreatePoolModal`      | 새 할당량 풀 생성(연결 + 이름 + 초기 할당)                        |
| `PoolCard`             | 풀별 요약: 이름, 연결, 할당 수                                    |
| `DimensionBar`         | 차원별 누적 막대: 각 키의 점유율 + 전체 사용량                    |
| `AllocationTable`      | 소비량, 공정 할당량, 부족분/잉여분, 차용 플래그를 표시하는 테이블 |
| `BurnRateChart`        | EMA 소진율 선형 차트(`dynamic()`을 통한 Recharts 지연 로딩)       |
| `EditAllocationsModal` | 풀의 할당 가중치, 상한 및 정책 편집                               |

페이지 훅:

- `usePools` — 30초마다 `GET /api/quota/pools`를 가져옵니다.
- `usePoolUsage` — 필요할 때 `GET /api/quota/pools/[id]/usage`를 가져옵니다.
- `useLocalStoragePoolMigration` — 마운트 시 한 번 실행되어 레거시 LS 데이터를 마이그레이션합니다.

### `/dashboard/costs/quota-share/plans` — 제공자 플랜 구성

- `ProviderPlanConfigClient.tsx`: 제공자를 선택하고, 확정된 플랜(카탈로그에서 자동으로 가져오거나 수동으로 재정의)을 확인하며, 차원을 편집할 수 있는 드롭다운입니다.
- 변경 사항은 `PUT /api/quota/plans/[connectionId]`에 기록됩니다.
- 삭제하면 카탈로그 플랜 또는 빈 플랜으로 되돌아갑니다.

---

## 환경 변수

| 변수                               | 기본값        | 설명                                                    |
| ---------------------------------- | ------------- | ------------------------------------------------------- |
| `QUOTA_STORE_DRIVER`               | `sqlite`      | 사용할 드라이버: `sqlite` 또는 `redis`                  |
| `QUOTA_STORE_REDIS_URL`            | _(비어 있음)_ | Redis URL, 예: `redis://localhost:6379`                 |
| `QUOTA_SATURATION_THRESHOLD`       | `0.5`         | 0..1; `>= threshold`이면 엄격 모드 활성화               |
| `QUOTA_SOFT_DEPRIORITIZE_FACTOR`   | `0.7`         | 0..1; 소프트 정책 조합 점수의 승수                      |
| `QUOTA_CONSUMPTION_RETENTION_DAYS` | `14`          | GC가 오래된 `quota_consumption` 버킷을 제거하기 전 일수 |

DB 설정(`quotaStore.*`)이 환경 변수를 재정의합니다.

---

## 문제 해결

### Redis가 구성되었지만 연결되지 않는 경우

`ioredis`가 설치되어 있고(`npm ls ioredis`) `QUOTA_STORE_REDIS_URL`에 접근할 수 있는지 확인하세요. 연결에 실패하면 팩토리는 SQLite로 대체됩니다(`warn` 수준으로 기록됨).

### `peek`가 오래된 결과를 반환하거나 장애 허용 방식으로 동작하는 경우

`peek`에서 예외가 발생하면 `enforceQuotaShare`는 결과를 "허용"으로 처리합니다(장애 허용 방식). 근본 원인을 파악하려면 `pino` 로그에서 `quota:enforce` 및 `quota:factory` 항목을 확인하세요.

### 소비 카운터 편차

실제 제공자 사용량이 카운터와 다르더라도 이는 예상된 동작입니다. 2버킷 슬라이딩 윈도우는 윈도우 경계에서 약 1%의 오차가 있으며, `consume`은 응답 후 비동기 실행 방식으로 처리됩니다. 포화 신호(`saturationSignals.ts`)는 30초 TTL로 실제 제공자 사용률을 읽고 그에 따라 `globalUsedPercent`를 조정합니다.

### 풀의 소진율에 "데이터 없음"이 표시되는 경우

`computeBurnRate`에는 최소 2개의 과거 샘플이 필요합니다. 이전 `consume` 호출이 없는 새 풀에는 `tokensPerSecond: 0` 및 `timeToExhaustionMs: null`이 표시됩니다.

---

## localStorage에서 마이그레이션

`/dashboard/costs/quota-share`가 처음 로드되면 훅 `useLocalStoragePoolMigration`은 다음을 확인합니다.

1. `localStorage.getItem("omniroute:quota-share:pools")`가 비어 있지 않습니다.
2. `GET /api/quota/pools`가 `[]`를 반환합니다(DB가 비어 있음).

두 조건이 모두 참이면 각 레거시 풀을 `POST /api/quota/pools`로 일괄 전송한 다음,
localStorage 키를 제거합니다. 마이그레이션은 멱등성을 보장합니다. 조건 2가
재마이그레이션을 방지합니다.

---

## 내부 전략 분류

`quota-share`는 **내부 전용** 라우팅 전략입니다(`src/shared/constants/routingStrategies.ts`의
`INTERNAL_ROUTING_STRATEGY_VALUES`). 시스템이 생성한 `qtSd/` 풀 콤보에서만 사용되며,
UI 또는 API에서 사용자가 선택할 수 있는 옵션으로 표시되지 않도록 `ROUTING_STRATEGY_VALUES`에서
의도적으로 제외되어 있습니다.

---

## 테스트 커버리지

quota-share 엔진에는 두 계층의 자동화된 테스트 커버리지가 포함되어 있습니다.

| 스위트            | 명령어                                                                 | 테스트 범위                                                                                                                                                                                  |
| :---------------- | :--------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 단위 테스트(29개) | `node --import tsx/esm --test tests/unit/quota-share-strategy.test.ts` | DRR 스케줄러, 포화도 게이팅, 동시성 상한, fairShare 계산, 백로그 큐잉                                                                                                                        |
| 통합 매트릭스     | `npm run test:combo:matrix`                                            | 실제 콤보 파이프라인을 통한 엔드투엔드 라우팅 결정, 라이브 심(`registerQuotaFetcher`, `setLKGP`, `__setHeadroomSaturationFetcherForTests`)을 통한 DRR 공정성 및 포화 상태 우선순위 하향 조정 |

통합 매트릭스는 CI에서 19개의 모든 공개 전략과 함께 실행됩니다. 단위 테스트 스위트는
독립적으로 실행할 수 있습니다.

---

## DB 스키마 요약

마이그레이션 `078`, `079`, `085`에서 다음 세 개의 테이블이 추가되었습니다.

- `quota_pools` + `quota_allocations` — 풀 정의 및 키별 할당.
- `quota_consumption` — 각 `(apiKeyId, dimensionKey)`에 대한 롤링 2버킷 카운터.
- `provider_plans` — 수동 공급자 요금제 재정의(connectionId별 dimensions JSON).

모든 테이블은 멱등성을 보장하는 `CREATE TABLE IF NOT EXISTS` 마이그레이션을 통해 추가되었습니다.
