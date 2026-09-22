# Webhooks (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/WEBHOOKS.md) · 🇪🇹 [am](../../../am/docs/frameworks/WEBHOOKS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/WEBHOOKS.md) · 🇦🇿 [az](../../../az/docs/frameworks/WEBHOOKS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/WEBHOOKS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/WEBHOOKS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/WEBHOOKS.md) · 🇩🇰 [da](../../../da/docs/frameworks/WEBHOOKS.md) · 🇩🇪 [de](../../../de/docs/frameworks/WEBHOOKS.md) · 🇬🇷 [el](../../../el/docs/frameworks/WEBHOOKS.md) · 🇪🇸 [es](../../../es/docs/frameworks/WEBHOOKS.md) · 🇪🇪 [et](../../../et/docs/frameworks/WEBHOOKS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/WEBHOOKS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/WEBHOOKS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/WEBHOOKS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/WEBHOOKS.md) · 🇮🇱 [he](../../../he/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/WEBHOOKS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/WEBHOOKS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/WEBHOOKS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/WEBHOOKS.md) · 🇮🇩 [id](../../../id/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/WEBHOOKS.md) · 🇮🇹 [it](../../../it/docs/frameworks/WEBHOOKS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/WEBHOOKS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/WEBHOOKS.md) · 🇰🇭 [km](../../../km/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/WEBHOOKS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/WEBHOOKS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/WEBHOOKS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/WEBHOOKS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/WEBHOOKS.md) · 🇲🇲 [my](../../../my/docs/frameworks/WEBHOOKS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/WEBHOOKS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/WEBHOOKS.md) · 🇳🇴 [no](../../../no/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [or](../../../or/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/WEBHOOKS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/WEBHOOKS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/WEBHOOKS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/WEBHOOKS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/WEBHOOKS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/WEBHOOKS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/WEBHOOKS.md) · 🇱🇰 [si](../../../si/docs/frameworks/WEBHOOKS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/WEBHOOKS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/WEBHOOKS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/WEBHOOKS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/WEBHOOKS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/WEBHOOKS.md) · 🇮🇳 [te](../../../te/docs/frameworks/WEBHOOKS.md) · 🇹🇭 [th](../../../th/docs/frameworks/WEBHOOKS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/WEBHOOKS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/WEBHOOKS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/WEBHOOKS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/WEBHOOKS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/WEBHOOKS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/WEBHOOKS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/WEBHOOKS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/WEBHOOKS.md)

---

> **신뢰할 수 있는 원본:** `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`, `src/app/api/webhooks/`
> **마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute는 플랫폼 이벤트 발생 시 HTTP 웹훅을 전송할 수 있습니다. 이를 사용하여
Slack, PagerDuty, Datadog, 내부 알림 서비스 또는 모든 HTTP 수신기와 통합할 수 있습니다.

디스패처는 각 전송을 HMAC-SHA256으로 서명하고, 일시적인 장애가 발생하면
재시도하며, 웹훅별 전송 상태를 추적하고, 계속 실패하는 엔드포인트를
자동으로 비활성화합니다.

## 지원되는 이벤트

`WebhookEvent` 타입(`src/lib/webhooks/eventDescriptions.ts`, `src/lib/webhookDispatcher.ts`에서 사용)은 현재 정확히 네 가지 이벤트를 모델링합니다.

| 이벤트              | 발생 조건                                     |
| ------------------- | --------------------------------------------- |
| `request.completed` | 프록시된 요청이 성공적으로 완료될 때          |
| `request.failed`    | 모든 재시도/폴백 후 프록시된 요청이 실패할 때 |
| `quota.exceeded`    | API 키가 예산/할당량 임계값을 초과할 때       |
| `test.ping`         | 테스트 엔드포인트에서 사용하는 합성 이벤트    |

구독 시 리터럴 `"*"`를 지정하면 모든 이벤트를 수신할 수 있습니다. `events`에 있는
알 수 없는 이벤트 이름은 디스패치 시 무시됩니다.

> 참고: 디스패처 API는 연결되어 있지만, 일부 `test.ping` 이외 이벤트의 프로덕션
> 호출 지점은 아직 추가 중입니다. 현재 릴리스에서 어떤 경로가 디스패처를 호출하는지
> 확인하려면 `grep dispatchEvent`를 실행하세요.

## 아키텍처

```
호출자(핸들러, 서비스, 모니터)
  dispatchEvent(event, data)            [src/lib/webhookDispatcher.ts]
    -> getEnabledWebhooks()             [src/lib/db/webhooks.ts]
    -> webhook.events를 기준으로 필터링
    -> 일치하는 각 항목에 대해(병렬 실행):
       deliverWebhook(url, payload, secret)
         페이로드 { event, timestamp, data } 구성
         HMAC-SHA256으로 본문 서명(secret이 있는 경우)
         10초 타임아웃으로 POST
         5xx / 네트워크 오류 발생 시 최대 3회 재시도
       recordWebhookDelivery(id, status, success)
    -> disableWebhooksWithHighFailures(10)
```

호출자 입장에서 디스패치는 실행 후 잊어버리는 방식입니다. `Promise.allSettled`가
웹훅별 오류를 삼키므로, 하나의 잘못된 수신기가 다른 수신기를 차단할 수 없습니다.

## HMAC 서명

웹훅에 `secret`이 있으면 OmniRoute는 JSON 본문에 서명하고 다음 헤더를 전송합니다.

```
Content-Type: application/json
User-Agent: OmniRoute-Webhook/1.0
X-Webhook-Event: <event>
X-Webhook-Timestamp: <ISO-8601>
X-Webhook-Signature: sha256=<hex HMAC-SHA256(secret, body)>
```

> 헤더 이름은 `X-OmniRoute-*`가 아닌 `X-Webhook-*` 접두사를 사용합니다. 서명
> 값은 `sha256=<hex>` 형식이므로 전체 접두사를 포함하여 검증하세요.

`secret` 없이 `createWebhook`을 호출하면 DB 모듈이 시크릿
(`whsec_<48 hex>`)을 생성하므로, 기본적으로 모든 웹훅이 서명됩니다.

### 수신기에서 검증하기

```typescript
import { createHmac, timingSafeEqual } from "node:crypto";

function verify(rawBody: string, signature: string, secret: string) {
  const expected = "sha256=" + createHmac("sha256", secret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}
```

항상 JSON을 파싱하기 전에 **원시** 요청 본문을 기준으로 검증하세요.

## 재시도 및 실패 정책

`deliverWebhook(url, payload, secret, maxRetries = 3)`:

- 각 시도에는 10초의 시간 제한이 적용됩니다(`AbortController`).
- HTTP 2xx는 성공으로 간주됩니다.
- HTTP 3xx/4xx는 재시도할 수 없는 최종 상태로 간주되며, 전송 완료로 기록됩니다.
  이때 `success = res.ok`로 설정됩니다.
- HTTP 5xx 및 네트워크 오류는 다음과 같은 지수 백오프로 재시도됩니다.
  `2^attempt * 1000 ms`(1초, 2초, 4초).
- `maxRetries` 이후에는 전송 실패로 기록됩니다.
- 각 전송 시 `last_triggered_at`, `last_status`가 업데이트되며,
  `failure_count`는 초기화되거나 증가합니다.
- 디스패처는 각 팬아웃 후 `disableWebhooksWithHighFailures(10)`을 호출하므로,
  `failure_count >= 10`인 모든 웹훅은 자동으로 비활성화됩니다.

## 데이터베이스

`webhooks` 테이블(마이그레이션 `011_webhooks.sql`):

| 열                  | 타입    | 참고 사항                              |
| ------------------- | ------- | -------------------------------------- |
| `id`                | TEXT PK | UUID                                   |
| `url`               | TEXT    | 대상 URL                               |
| `events`            | TEXT    | JSON 배열. 기본값은 `["*"]`            |
| `secret`            | TEXT    | HMAC 시크릿(지정하지 않으면 자동 생성) |
| `enabled`           | INT     | 0/1. 기본값은 1                        |
| `description`       | TEXT    | 선택 사항인 사람이 읽을 수 있는 레이블 |
| `created_at`        | TEXT    | `datetime('now')`                      |
| `last_triggered_at` | TEXT    | 모든 전송 시도 시 업데이트             |
| `last_status`       | INT     | 마지막 시도의 HTTP 상태(0 = 네트워크)  |
| `failure_count`     | INT     | 성공 시 0으로 초기화, 실패 시 +1       |

전송 기록은 `webhooks` 행의 집계 카운터와 별도로 전용 `webhook_deliveries` 테이블에
영구 저장됩니다(마이그레이션 `069_webhook_deliveries.sql`, 각 시도마다
`src/lib/db/webhookDeliveries.ts::insertDelivery`를 통해 기록). 종류 메타데이터(Slack / Discord /
Telegram / 사용자 정의 페이로드 변환기)는 `070_webhooks_kind_metadata.sql`에서 추가되었습니다.

## REST API

모든 엔드포인트에는 관리 인증(`requireManagementAuth`)이 필요합니다.

| 엔드포인트                      | 메서드 | 설명                             |
| ------------------------------- | ------ | -------------------------------- |
| `/api/webhooks`                 | GET    | 웹훅 목록 조회(시크릿 마스킹)    |
| `/api/webhooks`                 | POST   | 웹훅 생성                        |
| `/api/webhooks/[id]`            | GET    | 웹훅 상세 정보 조회(전체 시크릿) |
| `/api/webhooks/[id]`            | PUT    | 필드 업데이트                    |
| `/api/webhooks/[id]`            | DELETE | 삭제                             |
| `/api/webhooks/[id]/test`       | POST   | `test.ping` 전송(재시도 없음)    |
| `/api/webhooks/[id]/deliveries` | GET    | 특정 웹훅의 최근 전송 시도 조회  |
| `/api/webhooks/validate-url`    | POST   | 사전 URL 검증(SSRF 방어)         |

`GET /api/webhooks`는 목록 페이지에서의 유출을 방지하기 위해 시크릿을
`<first 10 chars>...` 형식으로 마스킹합니다. 실제 시크릿이 필요한 경우 `[id]` GET을 사용하세요.

### 웹훅 생성

```bash
curl -X POST http://localhost:20128/api/webhooks \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://hooks.slack.com/services/...",
    "secret": "whsec_my_shared_secret",
    "events": ["quota.exceeded", "request.failed"],
    "description": "Slack alerts"
  }'
```

`secret`을 생략하면 서버가 `whsec_<hex>` 시크릿을 생성하여 응답에
포함합니다.

### 웹훅 테스트

```bash
curl -X POST http://localhost:20128/api/webhooks/<id>/test \
  -H "Cookie: auth_token=..."
```

`{ delivered, status, error }`를 반환합니다. 재시도는 수행되지 않으므로 수신기가
페이로드와 서명을 수락하는지 빠르게 검증하는 데 유용합니다.

## 대시보드

`/dashboard/webhooks`의 대시보드 페이지(`src/app/(dashboard)/dashboard/webhooks/page.tsx` 참조)는 다음 기능을 제공합니다.

- 이벤트 선택기를 사용한 웹훅 생성/편집
- `enabled`, `failure_count`, `last_status`를 기반으로 한 상태 표시기(활성 / 비활성 / 오류)
- 원클릭 테스트 전송
- 수동 활성화/비활성화 토글

## 페이로드 예시

### request.completed

```json
{
  "event": "request.completed",
  "timestamp": "2026-05-13T20:30:00.123Z",
  "data": {
    "trace_id": "...",
    "api_key_id": "...",
    "provider": "openai",
    "model": "gpt-5",
    "status": 200,
    "tokens_in": 142,
    "tokens_out": 350,
    "cost_usd": 0.0042
  }
}
```

### test.ping

```json
{
  "event": "test.ping",
  "timestamp": "2026-05-13T20:32:00.000Z",
  "data": {
    "message": "OmniRoute의 테스트 웹훅 전송",
    "webhookId": "<uuid>"
  }
}
```

`test.ping` 이외 이벤트의 필드 구조는 해당 이벤트를 발생시키는 호출 지점에서 정의됩니다. `data` 객체는 향후 호환성을 유지하는 것으로 간주하세요(필드가 추가될 수 있으며, 필드가 없다는 사실에 의존하지 마세요).

## 모범 사례

- **모든 전송에서 원시 본문을 기준으로 서명을 검증하세요** — 웹훅 URL을 추측한 사람이 위조 POST를 보내는 것을 방지합니다.
- **약 5초 이내에 2xx로 응답하세요** — 디스패처는 10초 후 시간 초과됩니다. 수신기가 느리면 재시도 횟수가 소진되고 `failure_count`가 증가합니다.
- **핸들러를 멱등성 있게 만드세요** — 재시도 및 최소 한 번 전송 의미 체계로 인해 중복이 발생할 수 있습니다.
- **필요한 이벤트만 구독하세요** — 실제로 사용하는 이벤트만 나열하세요. `"*"`를 사용하면 제어하지 않는 수신기의 비용이 증가합니다.
- **`failure_count`를 모니터링하세요** — 엔드포인트는 10회 연속 실패하면 자동으로 비활성화됩니다. 수신기를 수정한 후 `enabled: true`와 함께 `PUT /api/webhooks/[id]`를 호출하여 재설정하세요.
- **비밀 값을 주기적으로 교체하세요** — 새 `secret`을 `PUT`하고, 새 값을 수신기에 배포한 다음 테스트 엔드포인트를 통해 확인하세요.

## 함께 보기

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — 전체 관리 API 범위
- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — `request.failed`를 통해 노출되는 공급자 장애의 서킷 브레이커 / 쿨다운 의미 체계
- 소스: `src/lib/webhookDispatcher.ts`, `src/lib/db/webhooks.ts`
