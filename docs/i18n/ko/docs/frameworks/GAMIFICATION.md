# Gamification & Leaderboard System (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/GAMIFICATION.md) · 🇪🇹 [am](../../../am/docs/frameworks/GAMIFICATION.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/GAMIFICATION.md) · 🇦🇿 [az](../../../az/docs/frameworks/GAMIFICATION.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/GAMIFICATION.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/GAMIFICATION.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/GAMIFICATION.md) · 🇩🇰 [da](../../../da/docs/frameworks/GAMIFICATION.md) · 🇩🇪 [de](../../../de/docs/frameworks/GAMIFICATION.md) · 🇬🇷 [el](../../../el/docs/frameworks/GAMIFICATION.md) · 🇪🇸 [es](../../../es/docs/frameworks/GAMIFICATION.md) · 🇪🇪 [et](../../../et/docs/frameworks/GAMIFICATION.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/GAMIFICATION.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/GAMIFICATION.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/GAMIFICATION.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/GAMIFICATION.md) · 🇮🇱 [he](../../../he/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/GAMIFICATION.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/GAMIFICATION.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/GAMIFICATION.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/GAMIFICATION.md) · 🇮🇩 [id](../../../id/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/GAMIFICATION.md) · 🇮🇹 [it](../../../it/docs/frameworks/GAMIFICATION.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/GAMIFICATION.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/GAMIFICATION.md) · 🇰🇭 [km](../../../km/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/GAMIFICATION.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/GAMIFICATION.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/GAMIFICATION.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/GAMIFICATION.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/GAMIFICATION.md) · 🇲🇲 [my](../../../my/docs/frameworks/GAMIFICATION.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/GAMIFICATION.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/GAMIFICATION.md) · 🇳🇴 [no](../../../no/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [or](../../../or/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/GAMIFICATION.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/GAMIFICATION.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/GAMIFICATION.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/GAMIFICATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/GAMIFICATION.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/GAMIFICATION.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/GAMIFICATION.md) · 🇱🇰 [si](../../../si/docs/frameworks/GAMIFICATION.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/GAMIFICATION.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/GAMIFICATION.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/GAMIFICATION.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/GAMIFICATION.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/GAMIFICATION.md) · 🇮🇳 [te](../../../te/docs/frameworks/GAMIFICATION.md) · 🇹🇭 [th](../../../th/docs/frameworks/GAMIFICATION.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/GAMIFICATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/GAMIFICATION.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/GAMIFICATION.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/GAMIFICATION.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/GAMIFICATION.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/GAMIFICATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/GAMIFICATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/GAMIFICATION.md)

---

> **신뢰할 수 있는 원본:** `src/lib/gamification/`, `src/lib/db/gamification.ts`, `src/app/api/gamification/`
> **마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute에는 사용자가 플랫폼에서 요청을 보내고, 제공자를 전환하고, 콤보를 생성하고, 토큰을 공유하고, 커뮤니티에 기여하는 활동에 대해 보상하는 로컬 우선 게임화 계층이 포함되어 있습니다. 모든 상태는 SQLite에 저장되며, 커뮤니티 서버와의 연합은 선택적으로 활성화할 수 있는 푸시 기반 방식입니다.

이 시스템은 **핵심 경로에서 지연 시간이 발생하지 않도록** 설계되었습니다. 게임화 이벤트는 요청 파이프라인에서 응답을 기다리지 않는 방식으로 전달되며, LLM 응답을 절대 차단하지 않습니다.

---

## 개요

### 목적

눈에 보이는 진행 상황(XP, 레벨, 배지), 사회적 증거(리더보드), 경제적 인센티브(토큰 공유, 초대 보상)를 제공하여 사용자 참여도와 유지율을 높입니다.

### 범위

| 기능              | 설명                                                       |
| ----------------- | ---------------------------------------------------------- |
| XP 및 레벨        | 활동별로 XP를 획득하고 다항 곡선에 따라 레벨 상승          |
| 배지              | 4개의 희귀도 등급으로 구성된 5개 카테고리의 20개 이상 업적 |
| 연속 활동         | 현재/최장 연속 일수를 포함한 일일 활성 사용 추적           |
| 리더보드          | 전체, 주간, 월간, 토큰 공유 및 기여도 범위                 |
| 토큰 공유         | 복식부기 원장을 통해 사용자 간 크레딧 전송                 |
| 초대 및 코드 사용 | SHA-256 해시 스토리지를 사용하는 추천 코드                 |
| 커뮤니티 서버     | 외부 OmniRoute 인스턴스와 연합                             |
| 부정행위 방지     | 서버 측 점수 산정, 속도 제한, z-점수 이상 탐지             |

### 설계 원칙

1. **로컬 우선** — 모든 상태를 SQLite에 저장하며 외부 서비스가 필요하지 않습니다.
2. **비차단** — 이벤트는 응답을 기다리지 않는 방식으로 전달되며, 게임화 로직으로 인해 LLM 응답 경로가 지연되지 않습니다.
3. **서버 권한 기반** — XP는 서버 측에서만 계산되며, 클라이언트는 점수를 부풀릴 수 없습니다.
4. **개인정보 보호** — 리더보드 참여는 선택 사항이며, 사용자는 자신의 프로필을 숨길 수 있습니다.
5. **연합 지원** — 커뮤니티 서버는 서명된 API를 통해 점수를 푸시할 수 있으며, 동기화는 누적이 아닌 덮어쓰기 방식입니다.

---

## 아키텍처

### 상위 수준 흐름

```
클라이언트 요청
  → /v1/chat/completions
    → handleChatCore()                      [open-sse/handlers/chatCore.ts]
      → ... (기존 파이프라인) ...
      → 업스트림 응답을 클라이언트에 전송
      → setImmediate (응답 대기 없이 실행):
        → emitGamificationEvent()           [src/lib/gamification/events.ts]
          → awardXp()                       [src/lib/gamification/xp.ts]
          → updateStreak()                  [src/lib/gamification/streaks.ts]
          → evaluateBadges()                [src/lib/gamification/badges.ts]
          → updateLeaderboard()             [src/lib/gamification/leaderboard.ts]
          → checkAnomalies()                [src/lib/gamification/antiCheat.ts]
```

이벤트 이미터는 단일 통합 지점입니다. `chatCore.ts`는 응답을 전송한 후 `emitGamificationEvent()`를 호출하며, 이벤트 모듈은 이벤트를 XP, 연속 활동, 배지, 리더보드 및 부정행위 방지 하위 시스템으로 분배합니다.

### 모듈 의존성 그래프

```
src/lib/gamification/
  events.ts          ← 진입점(chatCore.ts에서 호출)
    ├── xp.ts        ← XP 계산 및 레벨 결정
    ├── streaks.ts   ← 일일 활성 연속 기록 추적
    ├── badges.ts    ← 배지 기준 평가
    ├── leaderboard.ts ← 순위 계산 및 SSE 브로드캐스트
    ├── antiCheat.ts ← 속도 제한 및 이상 탐지
    ├── sharing.ts   ← 토큰 전송 원장
    ├── invites.ts   ← 초대/코드 사용 관리
    ├── servers.ts   ← 커뮤니티 서버 연합
    └── notifications.ts ← SSE 알림 스트림

src/lib/db/
  gamification.ts    ← 모든 CRUD 작업(테이블 8개)

src/app/api/gamification/
  leaderboard/       ← GET 순위, POST 수동 새로고침
  leaderboard/stream ← SSE 실시간 업데이트
  transfer/          ← GET 내역, POST 토큰 전송
  invite/            ← GET/POST 코드, DELETE 취소
  invite/redeem/     ← POST 코드 사용
  servers/           ← GET/POST/DELETE 커뮤니티 서버
  federation/score/  ← POST 서버에 점수 푸시
  federation/leaderboard/ ← GET 서버에서 리더보드 가져오기
  notifications/     ← SSE 배지/레벨 상승 알림
  anomalies/         ← GET 이상 보고서(관리자)
  rotate/            ← POST 초대 토큰 시크릿 교체
```

---

## 데이터 계층

### 데이터베이스 테이블

모든 테이블은 마이그레이션 `060_create_gamification.sql`로 생성된 기본 OmniRoute SQLite 데이터베이스에 있습니다. WAL 저널링은 `src/lib/db/core.ts`의 싱글턴 `getDbInstance()`로부터 상속됩니다.

```
┌─────────────────────────┐     ┌──────────────────────────┐
│      leaderboard        │     │      user_levels         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ api_key_id    TEXT PK    │
│ api_key_id    TEXT      │     │ xp            INTEGER    │
│ scope         TEXT      │     │ level         INTEGER    │
│ score         INTEGER   │     │ title         TEXT       │
│ period        TEXT      │     │ updated_at    TEXT       │
│ updated_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
                │
                │ 1:N
                ▼
┌─────────────────────────┐     ┌──────────────────────────┐
│     user_badges         │     │    badge_definitions     │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ badge_id      TEXT FK   │     │ category      TEXT       │
│ earned_at     TEXT      │     │ rarity        TEXT       │
│ notified      INTEGER   │     │ criteria_type TEXT       │
└─────────────────────────┘     │ criteria      TEXT(JSON) │
                                │ description   TEXT       │
                                │ icon          TEXT       │
                                │ hidden        INTEGER    │
                                └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│     xp_audit_log        │     │     token_ledger         │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ from_key_id   TEXT       │
│ action        TEXT      │     │ to_key_id     TEXT       │
│ xp_awarded    INTEGER   │     │ amount        INTEGER    │
│ metadata      TEXT(JSON)│     │ idempotency_key TEXT UQ  │
│ created_at    TEXT      │     │ created_at    TEXT       │
└─────────────────────────┘     └──────────────────────────┘

┌─────────────────────────┐     ┌──────────────────────────┐
│    invite_tokens        │     │   community_servers      │
├─────────────────────────┤     ├──────────────────────────┤
│ id            TEXT PK   │     │ id            TEXT PK    │
│ api_key_id    TEXT      │     │ name          TEXT       │
│ code          TEXT UQ   │     │ url           TEXT       │
│ token_hash    TEXT      │     │ token_hash    TEXT       │
│ uses          INTEGER   │     │ status        TEXT       │
│ max_uses      INTEGER   │     │ last_sync     TEXT       │
│ created_at    TEXT      │     │ created_at    TEXT       │
│ expires_at    TEXT      │     └──────────────────────────┘
└─────────────────────────┘
```

### 도메인 모듈: `src/lib/db/gamification.ts`

표준 OmniRoute 패턴을 따릅니다. `core.ts`에서 `getDbInstance()`를 가져오고 타입이 지정된 CRUD 함수를 내보냅니다. 라우트 핸들러에는 원시 SQL을 사용하지 않습니다.

주요 함수:

| 함수                       | 설명                                                  |
| -------------------------- | ----------------------------------------------------- |
| `upsertLeaderboardEntry()` | (api_key_id, scope, period)의 점수 삽입 또는 업데이트 |
| `getLeaderboard()`         | 지정된 범위/기간에 대한 페이지네이션된 순위 조회      |
| `getUserLevel()`           | 사용자 레벨 레코드 조회 또는 생성                     |
| `updateUserLevel()`        | XP, 레벨 및 칭호를 원자적으로 설정                    |
| `getBadgeDefinitions()`    | 모든 배지 정의 조회(선택적으로 필터링 가능)           |
| `getUserBadges()`          | 사용자가 획득한 배지 조회                             |
| `awardBadge()`             | 배지 획득 내역 삽입(badge_id 기준 멱등성 보장)        |
| `logXpAction()`            | xp_audit_log에 항목 추가                              |
| `getXpAuditLog()`          | 사용자의 페이지네이션된 감사 이력 조회                |
| `insertLedgerEntry()`      | 복식부기 이체(트랜잭션 내에서 수행)                   |
| `getBalance()`             | 사용자의 수신액에서 송신액을 뺀 합계 계산             |
| `getTransferHistory()`     | 페이지네이션된 이체 로그 조회                         |
| `createInviteToken()`      | 초대 코드와 해시된 토큰 삽입                          |
| `redeemInviteToken()`      | 코드로 조회하고 검증한 후 사용 횟수 증가              |
| `upsertCommunityServer()`  | 페더레이션 서버 등록 또는 업데이트                    |
| `getCommunityServers()`    | 사용자의 서버 목록 조회                               |
| `deleteCommunityServer()`  | 서버 등록 제거                                        |

---

## XP / 레벨 시스템

**파일:** `src/lib/gamification/xp.ts`

### 레벨 곡선

레벨 `n`에 도달하는 데 필요한 XP는 다음 다항식 곡선을 따릅니다:

```
xp_for_level(n) = floor(100 * n^1.5)
```

| 레벨 | 다음 레벨까지 필요한 XP | 누적 XP   | 칭호   |
| ---- | ----------------------- | --------- | ------ |
| 1    | 100                     | 100       | 초보자 |
| 5    | 1,118                   | 2,415     | 초보자 |
| 10   | 3,162                   | 10,523    | 탐험가 |
| 25   | 12,500                  | 86,024    | 탐험가 |
| 50   | 35,355                  | 345,529   | 전문가 |
| 75   | 64,952                  | 948,683   | 마스터 |
| 100  | 100,000                 | 2,050,000 | 전설   |

### 칭호

| 레벨 범위 | 칭호   |
| --------- | ------ |
| 1 – 9     | 초보자 |
| 10 – 24   | 탐험가 |
| 25 – 49   | 전문가 |
| 50 – 74   | 마스터 |
| 75 – 100  | 전설   |

### XP 보상

| 작업              | XP  | 설명                                    |
| ----------------- | --- | --------------------------------------- |
| `request`         | 1   | OmniRoute를 통해 라우팅된 API 요청당    |
| `provider_switch` | 5   | 다른 제공자로 전환                      |
| `model_switch`    | 3   | 다른 모델로 전환                        |
| `combo_create`    | 10  | 새 콤보 생성                            |
| `combo_use`       | 2   | 요청에 콤보 사용                        |
| `token_share`     | 1   | 다른 사용자와 공유한 토큰 1,000개당     |
| `invite_redeem`   | 50  | 초대 코드 사용                          |
| `daily_login`     | 5   | 일일 활성 사용(하루에 한 번)            |
| `streak_bonus`    | 2   | 연속 기록 일수당(연속 기록 길이를 곱함) |
| `badge_unlock`    | 10  | 배지 잠금 해제                          |

### 지급 흐름

```typescript
export async function awardXp(
  apiKeyId: string,
  action: XpAction,
  metadata?: Record<string, unknown>
): Promise<{ xp: number; level: number; title: string; levelUp: boolean }>;
```

1. XP 수량을 가져오기 위해 `XP_REWARDS[action]`을 조회합니다.
2. `checkRateLimit()`을 통과시킵니다(부정행위 방지: 키당 분당 최대 1000 XP).
3. 트랜잭션을 시작합니다:
   - 현재 `user_levels` 행을 읽습니다.
   - XP를 추가하고 `levelFromXp(totalXp)`를 통해 레벨을 다시 계산합니다.
   - 레벨이 변경되면 `levelUp = true`로 설정합니다.
   - `user_levels` 행을 업데이트합니다.
   - `xp_audit_log`에 삽입합니다.
4. 결과를 반환합니다. 호출자가 알림을 처리합니다.

### 헬퍼: `levelFromXp(totalXp)`

누적 XP가 `totalXp`를 초과할 때까지 레벨 1..100을 순회하며 `xp_for_level(n)`을
합산합니다. 임계값을 충족한 가장 높은 레벨을 반환합니다.
이는 O(100)이며, 레벨이 100으로 제한되므로 허용 가능한 수준입니다.

---

## 배지 시스템

**파일:** `src/lib/gamification/badges.ts`

### 카테고리

| 카테고리       | 설명                          | 배지 예시                         |
| -------------- | ----------------------------- | --------------------------------- |
| `usage`        | 사용량 기반 마일스톤          | 첫 요청, 요청 1천 회, 10만 회     |
| `sharing`      | 토큰 공유 및 추천             | 첫 공유, 관대한 사용자(10회 공유) |
| `contribution` | 커뮤니티 참여                 | 콤보 제작자, 제공자 탐험가        |
| `streak`       | 시간에 따른 꾸준함            | 주간 전사, 월간 헌신자            |
| `rare`         | 획득하기 어렵거나 숨겨진 업적 | 얼리 어답터, 버그 제보자          |

### 희귀도

| 희귀도      | 색상   | 확률 참고       |
| ----------- | ------ | --------------- |
| `common`    | 회색   | 대부분의 사용자 |
| `uncommon`  | 초록색 | 활성 사용자     |
| `rare`      | 파란색 | 헌신적인 사용자 |
| `legendary` | 금색   | 상위 1%         |

### 조건 유형

| 유형           | 필드         | 설명                                        |
| -------------- | ------------ | ------------------------------------------- |
| `action_count` | `count`      | 작업을 N회 수행(예: 요청 1000회)            |
| `streak`       | `days`       | N일 연속 기록 유지                          |
| `unique_count` | `field`, `n` | N개의 고유 값 사용(예: 서로 다른 모델 10개) |
| `rank`         | `scope`, `n` | 리더보드 범위에서 N위 달성                  |
| `first`        | —            | 작업을 가장 먼저 수행                       |
| `hidden`       | (다양함)     | 획득하기 전까지 표시되지 않는 조건          |

배지 정의는 `badge_definitions`에 JSON `criteria`로 저장됩니다:

```json
{
  "type": "action_count",
  "action": "request",
  "count": 1000
}
```

### 평가 흐름

```
emitGamificationEvent(event)
  → evaluateBadges(apiKeyId, event)
    → getBadgeDefinitions()           # 모든 정의
    → getUserBadges(apiKeyId)         # 이미 획득함(건너뜀)
    → 획득하지 않은 각 배지에 대해:
       → matchesCriteria(badge, event, userState)
       → 일치하는 경우: awardBadge(apiKeyId, badgeId)
         → 알림 페이로드 반환
```

평가는 **이벤트 기반**으로 이루어집니다. 즉, 모든 게임화 이벤트 후에 실행되지만
`criteria.type`이 이벤트 작업과 일치하는 배지만 확인합니다. 따라서 평가가
빠르게 유지됩니다(대부분의 이벤트에서 < 5ms).

### `matchesCriteria(badge, event, userState)`

| 조건 유형      | 확인                                              |
| -------------- | ------------------------------------------------- |
| `action_count` | `getActionCount(apiKeyId, action) >= count`       |
| `streak`       | `getCurrentStreak(apiKeyId) >= days`              |
| `unique_count` | `getUniqueCount(apiKeyId, field) >= n`            |
| `rank`         | `getRank(apiKeyId, scope) <= n`                   |
| `first`        | 이 작업 유형에 대한 이전 `xp_audit_log` 항목 없음 |
| `hidden`       | 적절한 하위 검사에 위임                           |

### 기본 제공 배지(20개 이상)

<details>
<summary>전체 배지 목록</summary>

| 배지              | 카테고리  | 희귀도 | 기준                       |
| ----------------- | --------- | ------ | -------------------------- |
| 첫걸음            | 사용량    | 일반   | 요청 1회                   |
| 준비 완료         | 사용량    | 일반   | 요청 100회                 |
| 파워 유저         | 사용량    | 고급   | 요청 1,000회               |
| 센추리온          | 사용량    | 희귀   | 요청 10,000회              |
| 옴니파워          | 사용량    | 전설   | 요청 100,000회             |
| 제공자 탐험가     | 기여      | 일반   | 서로 다른 제공자 5개 사용  |
| 제공자 마스터     | 기여      | 고급   | 서로 다른 제공자 20개 사용 |
| 콤보 설계자       | 기여      | 고급   | 콤보 5개 생성              |
| 콤보 그랜드마스터 | 기여      | 희귀   | 콤보 25개 생성             |
| 첫 공유           | 공유      | 일반   | 토큰 전송 1회              |
| 관대한 사람       | 공유      | 고급   | 토큰 전송 10회             |
| 자선가            | 공유      | 희귀   | 총 10,000개 토큰 전송      |
| 추천인            | 공유      | 일반   | 추천 1회 성공              |
| 네트워크 구축자   | 공유      | 고급   | 추천 10회 성공             |
| 주간 전사         | 연속 활동 | 고급   | 7일 연속 활동              |
| 한 달의 헌신      | 연속 활동 | 희귀   | 30일 연속 활동             |
| 불굴의 사용자     | 연속 활동 | 전설   | 365일 연속 활동            |
| 얼리 어답터       | 희귀      | 전설   | 베타 기간에 가입           |
| 압축 개척자       | 희귀      | 고급   | 압축 100회 사용            |
| 스킬 수집가       | 희귀      | 희귀   | 서로 다른 스킬 10개 사용   |
| 모델 탐험가       | 기여      | 고급   | 서로 다른 모델 15개 사용   |

</details>

---

## 연속 기록 추적기

**파일:** `src/lib/gamification/streaks.ts`

### 데이터 모델

연속 기록은 네임스페이스가 적용된 키를 사용하여 `key_value` 테이블(공용 유틸리티 테이블)에 저장됩니다.

| 키                            | 값                               | 설명                  |
| ----------------------------- | -------------------------------- | --------------------- |
| `gamification:streak:{keyId}` | `{current},{longest},{lastDate}` | 활성 연속 기록 데이터 |

### 로직

```typescript
export async function updateStreak(
  apiKeyId: string
): Promise<{ current: number; longest: number; milestone: boolean }>;
```

1. `key_value`에서 연속 기록을 읽습니다.
2. `{current}`, `{longest}`, `{lastDate}`(ISO 날짜 문자열)를 파싱합니다.
3. `lastDate === today`이면 변경하지 않습니다(오늘 이미 집계됨).
4. `lastDate === yesterday`이면 `current`를 증가시키고, 필요한 경우 `longest`를 업데이트합니다.
5. `lastDate < yesterday`이면 `current = 1`로 재설정합니다(연속 기록 중단).
6. 업데이트된 기록을 저장합니다.
7. 마일스톤인 7일, 14일, 30일, 60일, 90일, 180일, 365일을 확인합니다. 마일스톤을 돌파한 경우
   `milestone = true`로 설정합니다(호출자가 XP를 지급하고 배지를 확인함).

### 예외 상황

- **시간대**: 연속 기록은 UTC 날짜(`new Date().toISOString().slice(0, 10)`)를 사용합니다.
  이는 의도된 동작입니다. 단일 표준 시간대를 사용하면 시간대를 옮겨 다니며 시스템을 악용하는 것을 방지할 수 있습니다.
- **신규 사용자**: 연속 기록이 존재하지 않으며, 첫 번째 요청 시
  `current=1, longest=1, lastDate=today`로 생성됩니다.
- **하루에 여러 번 요청**: UTC 기준 하루의 첫 번째 요청만 연속 기록을 증가시킵니다.

---

## 리더보드

**파일:** `src/lib/gamification/leaderboard.ts`

### 범위

| 범위            | 기간    | 설명                                               |
| --------------- | ------- | -------------------------------------------------- |
| `global`        | `all`   | 전체 기간 누적 XP                                  |
| `weekly`        | `week`  | 현재 UTC 주간(월요일~일요일)에 획득한 XP           |
| `monthly`       | `month` | 현재 UTC 월에 획득한 XP                            |
| `tokens_shared` | `all`   | 다른 사용자에게 전송한 총 토큰 수                  |
| `contributions` | `all`   | 생성한 콤보 수 + 사용한 제공자 수 + 사용한 스킬 수 |

### 순위 계산

순위는 저장되지 않고 **읽을 때 계산됩니다**. 이를 통해 오래된 순위 데이터가 남는 것을 방지하고
주기적인 순위 재계산 작업이 필요하지 않게 됩니다.

```typescript
export async function getLeaderboard(
  scope: LeaderboardScope,
  period: string,
  limit: number,
  offset: number
): Promise<{ entries: LeaderboardEntry[]; total: number }>;
```

쿼리 패턴:

```sql
SELECT api_key_id, score,
       RANK() OVER (ORDER BY score DESC) as rank
FROM leaderboard
WHERE scope = ? AND period = ?
ORDER BY score DESC
LIMIT ? OFFSET ?
```

### 기간 전환

주간 및 월간 리더보드는 자동으로 전환됩니다.

1. **보관**: 기간 경계에 도달하면 현재 항목을 기간 레이블과 함께
   `leaderboard_archive`에 복사합니다.
2. **재설정**: 만료된 기간의 항목을 삭제합니다.
3. **트리거**: `updateLeaderboard()`를 호출할 때마다 확인하며, 새 기간의 첫 번째 요청이
   전환을 트리거합니다.

이를 통해 주간 보드는 매주 월요일 00:00 UTC에 재설정되고, 월간 보드는
매월 1일에 재설정됩니다.

### SSE 실시간 업데이트

**엔드포인트:** `GET /api/gamification/stream`

```
클라이언트 → GET /api/gamification/stream
  → SSE 연결 설정
  → 서버가 즉시 상위 10개 리더보드 스냅샷 전송
  → 5초마다: 변경된 경우 업데이트된 상위 10개 항목 푸시
  → 15초마다: 하트비트 주석 전송(": heartbeat\n\n")
  → 클라이언트 연결 해제 → 정리(리스너 제거)
```

이벤트 형식:

```
event: leaderboard
data: {"scope":"global","entries":[...]}

event: leaderboard
data: {"scope":"weekly","entries":[...]}

: heartbeat
```

SSE 관리자는 범위별로 연결된 클라이언트를 추적하며, 마지막 푸시 이후
리더보드 데이터가 실제로 변경된 경우에만 업데이트를 전송합니다.

---

## 토큰 공유

**파일:** `src/lib/gamification/sharing.ts`

### 복식부기 원장

모든 전송은 `token_ledger`에 두 개의 행을 생성합니다:

| 행   | `from_key_id` | `to_key_id` | `amount` |
| ---- | ------------- | ----------- | -------- |
| 차변 | 발신자        | 수신자      | +금액    |
| 대변 | 수신자        | 발신자      | -금액    |

잠깐 — 실제 규칙은 다음과 같습니다:

| 행   | `from_key_id` | `to_key_id` | `amount` | 의미                |
| ---- | ------------- | ----------- | -------- | ------------------- |
| 전송 | 발신자        | 수신자      | +금액    | 발신자로부터의 유출 |
| 수신 | 수신자        | 발신자      | +금액    | 수신자에게로의 유입 |

잔액은 다음과 같이 계산됩니다:

```sql
SELECT
  COALESCE(SUM(CASE WHEN to_key_id = ? THEN amount ELSE 0 END), 0)
  - COALESCE(SUM(CASE WHEN from_key_id = ? THEN amount ELSE 0 END), 0)
  AS balance
FROM token_ledger
WHERE from_key_id = ? OR to_key_id = ?
```

### 전송 흐름

```typescript
export async function transferTokens(
  fromKeyId: string,
  toKeyId: string,
  amount: number,
  idempotencyKey: string
): Promise<{ success: boolean; balance: number }>;
```

1. **검증**: `amount > 0`, `fromKeyId !== toKeyId`.
2. **멱등성**: `idempotency_key`가 원장에 이미 존재하는지 확인합니다.
   존재하면 캐시된 결과를 반환합니다.
3. **트랜잭션** (단일 SQLite 트랜잭션):
   a. 발신자의 잔액을 계산합니다.
   b. `balance < amount`이면 중단합니다(잔액 부족).
   c. 전송 행을 삽입합니다(`from=sender,`를 반환합니다.

### 속도 제한

- API 키당 분당 최대 10회 전송.
- 단일 전송당 최대 10,000개 토큰.
- API 키당 하루에 최대 100,000개 토큰 전송.

---

## 토큰 초대 및 교환

**파일:** `src/lib/gamification/invites.ts`

### 코드 형식

- **코드**: 사람이 읽을 수 있으며 사용자에게 표시되는 8자리 영숫자
  (예: `A3K9-X7M2`).
- **토큰**: SHA-256 해시로 저장되는 32바이트 무작위 토큰. 프로그래밍 방식의
  교환(예: URL 링크)에 사용됩니다.

### 저장소

| 열           | 값                          |
| ------------ | --------------------------- |
| `code`       | `A3K9X7M2` (고유, 인덱스됨) |
| `token_hash` | SHA-256(raw_token)          |

원시 토큰은 생성 시 사용자에게 정확히 한 번만 반환됩니다. OmniRoute는
이후 이를 저장하거나 다시 표시하지 않으며, 해시만 유지됩니다.

### 자기 추천 방지

사용자가 코드를 교환할 때 시스템은 다음을 확인합니다:

1. 코드가 다른 `api_key_id`에 속하는지 확인합니다.
2. 교환하는 사용자가 동일한 추천인의 코드를 이전에 교환한 적이 없는지
   확인합니다(`invite_tokens`와 교환 로그를 조인).

두 확인 중 하나라도 실패하면 명확한 오류 메시지와 함께 교환이 거부됩니다.

### 만료 및 제한

- 기본 `max_uses`: 10(생성 시 설정 가능).
- 기본 `expires_at`: 생성일로부터 30일.
- 만료되었거나 사용 횟수가 소진된 코드는 HTTP 410 Gone을 반환합니다.

---

## 커뮤니티 서버 페더레이션

**파일:** `src/lib/gamification/servers.ts`

### 연결

커뮤니티 서버는 원격 서버에서 발급한 초대 토큰을 통해 등록됩니다. 로컬 인스턴스는 다음을 수행합니다.

1. 초대 토큰을 받습니다(예: 대시보드에 붙여넣기).
2. 원격 서버의 `POST /api/gamification/federation/leaderboard`를 호출하여 토큰을 검증하고 현재 리더보드를 가져옵니다.
3. `status: connected`로 서버 레코드를 저장합니다.

### 동기화 모델

페더레이션은 추가 방식이 아닌 **덮어쓰기 동기화**를 사용합니다.

```
로컬 인스턴스                  커뮤니티 서버
     │                              │
     ├── 점수 푸시 ────────────────►│  POST /federation/score
     │   { api_key_id, score }      │  (서버가 토큰 해시 검증)
     │                              │
     ├── 리더보드 가져오기 ────────►│  GET /federation/leaderboard
     │◄── 상위 N개 항목 ───────────┤  (로컬 캐시 덮어쓰기)
     │                              │
     └── 상태 확인 ────────────────►│  GET /federation/health
         (60초마다, 타임아웃 5초)   │
```

### 인증

페더레이션 요청에는 다음이 포함됩니다.

```
Authorization: Bearer <raw_token>
X-Federation-Version: 1
```

원격 서버는 토큰을 해시한 후 일치하는 `community_servers` 행을 조회합니다. 이를 통해 저장된 해시를 전송하지 않을 수 있습니다.

### 상태 모니터링

각 서버 레코드는 다음 정보를 추적합니다.

| 필드        | 설명                                      |
| ----------- | ----------------------------------------- |
| `status`    | `connected`, `degraded`, `unreachable`    |
| `last_sync` | 마지막으로 성공한 동기화의 ISO 타임스탬프 |
| `failures`  | 연속 상태 확인 실패 횟수                  |

5회 연속 실패하면 상태가 `unreachable`로 변경되고, 수동 상태 확인이 성공할 때까지 동기화가 일시 중지됩니다.

---

## 부정행위 방지

**파일:** `src/lib/gamification/antiCheat.ts`

### 서버 측 점수 계산

모든 XP 계산은 `src/lib/gamification/xp.ts`에서 수행됩니다. 클라이언트는 점수를 제출하지 않습니다. 대신 작업을 제출하면 서버가 XP를 계산합니다. `leaderboard.score` 열은 서버 측 코드에서만 쓸 수 있습니다.

### 요청 속도 제한

| 제한                | 값      | 범위      |
| ------------------- | ------- | --------- |
| 분당 최대 XP        | 1,000   | API 키별  |
| 분당 최대 전송 횟수 | 10      | API 키별  |
| 최대 전송량         | 10,000  | 전송 건별 |
| 일일 최대 전송량    | 100,000 | API 키별  |

요청 속도 제한에는 메모리 내 슬라이딩 윈도우(`open-sse/services/`의 `RateLimitManager`와 동일한 패턴)를 사용합니다. 프로세스가 재시작되면 SQLite 기반 카운터를 대체 수단으로 사용합니다.

### Z-점수 이상 탐지

시스템은 각 API 키에 대해 시간당 획득한 XP의 최근 7일 이동 창을 유지합니다. XP가 부여될 때마다 다음을 수행합니다.

1. 사용자의 현재 시간당 XP 획득률을 계산합니다.
2. 모집단 평균과 표준편차를 계산합니다.
3. `z = (user_rate - mean) / stddev`를 계산합니다.
4. `z > 3.0`(표준편차 3개)이면 이상으로 표시합니다.

이상 징후는 `action = 'anomaly_detected'`와 함께 `xp_audit_log`에 기록되며 관리자 대시보드에 표시됩니다.

### 감사 추적

모든 XP 부여, 전송, 배지 획득 및 이상 탐지는 다음 정보와 함께 `xp_audit_log`에 기록됩니다.

| 필드         | 설명                                        |
| ------------ | ------------------------------------------- |
| `api_key_id` | 수행 주체                                   |
| `action`     | 발생한 작업(xp_award, transfer, anomaly, …) |
| `xp_awarded` | 수량(XP 이외 이벤트의 경우 0)               |
| `metadata`   | 컨텍스트가 포함된 JSON(작업 유형, 대상, …)  |
| `created_at` | 발생 시각(ISO 8601)                         |

관리자는 `GET /api/gamification/anomalies`를 통해 전체 감사 추적을 조회할 수 있습니다.

---

## API 라우트

모든 라우트는 표준 OmniRoute 패턴을 따릅니다.

```
라우트 → CORS 사전 요청 → 본문 검증(Zod) → 인증(extractApiKey)
  → 핸들러
```

### 엔드포인트

| 메서드 | 경로                                       | 설명                                    | 인증       |
| ------ | ------------------------------------------ | --------------------------------------- | ---------- |
| GET    | `/api/gamification/leaderboard`            | 리더보드 조회(범위, 기간, 페이지네이션) | 선택 사항  |
| POST   | `/api/gamification/leaderboard`            | 리더보드 캐시 강제 새로 고침            | 필수       |
| GET    | `/api/gamification/stream`                 | SSE 실시간 리더보드 업데이트            | 선택 사항  |
| GET    | `/api/gamification/transfer`               | 전송 내역 조회(페이지네이션)            | 필수       |
| POST   | `/api/gamification/transfer`               | 다른 사용자에게 토큰 전송               | 필수       |
| GET    | `/api/gamification/invite`                 | 내 초대 코드 목록 조회                  | 필수       |
| POST   | `/api/gamification/invite`                 | 새 초대 코드 생성                       | 필수       |
| DELETE | `/api/gamification/invite`                 | 초대 코드 폐기                          | 필수       |
| POST   | `/api/gamification/invite/redeem`          | 초대 코드 사용                          | 필수       |
| GET    | `/api/gamification/servers`                | 커뮤니티 서버 목록 조회                 | 필수       |
| POST   | `/api/gamification/servers`                | 커뮤니티 서버에 연결                    | 필수       |
| DELETE | `/api/gamification/servers`                | 커뮤니티 서버와의 연결 해제             | 필수       |
| POST   | `/api/gamification/federation/score`       | 원격 서버로 점수 전송                   | 페더레이션 |
| GET    | `/api/gamification/federation/leaderboard` | 원격 서버에서 리더보드 가져오기         | 페더레이션 |
| GET    | `/api/gamification/notifications`          | SSE 배지/레벨 상승 알림                 | 필수       |
| GET    | `/api/gamification/anomalies`              | 이상 징후 보고서 조회(관리자)           | 관리자     |
| POST   | `/api/gamification/rotate`                 | 초대 토큰 시크릿 교체                   | 필수       |

### 요청/응답 예시

**POST /api/gamification/transfer**

```json
// 요청
{
  "to": "recipient-api-key-id",
  "amount": 500,
  "idempotencyKey": "uuid-v4"
}

// 응답 200
{
  "success": true,
  "transfer": {
    "id": "txn-uuid",
    "from": "sender-api-key-id",
    "to": "recipient-api-key-id",
    "amount": 500,
    "createdAt": "2026-05-19T12:00:00.000Z"
  },
  "balance": 2500
}

// 응답 400(잔액 부족)
{
  "error": "Insufficient balance",
  "balance": 200,
  "requested": 500
}
```

**GET /api/gamification/leaderboard?scope=weekly&limit=10**

```json
{
  "scope": "weekly",
  "period": "2026-W20",
  "entries": [
    {
      "rank": 1,
      "apiKeyId": "key-uuid",
      "displayName": "User***1234",
      "score": 15230,
      "level": 42,
      "title": "Expert"
    }
  ],
  "total": 847,
  "updatedAt": "2026-05-19T12:00:00.000Z"
}
```

---

## MCP 도구 (8개)

기존 도구와 함께 `open-sse/mcp-server/`에 등록됩니다. `gamification` 권한 범위로
제한됩니다.

| 도구                       | 설명                                 | 입력 스키마                  |           |
| -------------------------- | ------------------------------------ | ---------------------------- | --------- |
| `gamification_leaderboard` | 범위/기간별 리더보드 조회            | `{ scope, period?, limit? }` |
| `gamification_rank`        | 호출자의 순위와 인접 순위 조회       | `{ scope }`                  |
| `gamification_profile`     | XP, 레벨, 칭호, 연속 기록 요약 조회  | `{}`                         |
| `gamification_badges`      | 획득한 배지 또는 모든 정의 목록 조회 | `{ earned?: boolean }`       |
| `gamification_transfer`    | 다른 사용자에게 토큰 전송            | `{ to, amount }`             |
| `gamification_invite`      | 초대 코드 생성 또는 목록 조회        | `{ action: "create"          | "list" }` |
| `gamification_servers`     | 커뮤니티 서버 목록 조회 또는 연결    | `{ action, token? }`         |
| `gamification_anomalies`   | 이상 징후 보고서 조회(관리자 범위)   | `{ limit?, since? }`         |

---

## 대시보드 페이지

### `/dashboard/leaderboard`

- 포디엄 표시(상위 3명의 아바타와 XP).
- 범위 선택기: 전체 / 주간 / 월간 / 공유한 토큰 / 기여.
- 순위, 이름, 점수, 레벨, 칭호가 포함된 페이지네이션 테이블(페이지당 25개).
- SSE 실시간 업데이트 — 순위 변경 시 애니메이션으로 표시.
- 현재 사용자는 테이블에서 강조 표시되며 "내 순위" 고정 행이 제공됨.

### `/dashboard/profile`

- 현재 레벨과 다음 레벨 기준값을 보여주는 XP 진행률 표시줄.
- 칭호 배지를 눈에 잘 띄게 표시.
- 배지 갤러리 — 획득한 배지는 획득 날짜와 함께 표시하고, 획득하지 않은 배지는 회색으로 표시
  (숨겨진 배지는 획득할 때까지 "???"로 표시).
- 불꽃 아이콘이 있는 연속 기록 카운터, 연속 기록 달력(최근 30일).
- XP 기록 차트(최근 30일간의 일일 XP).

### `/dashboard/tokens`

- 토큰 잔액(페이지 상단에 눈에 잘 띄게 표시).
- 전송 양식: 수신자, 금액, 확인 대화 상자.
- 필터가 있는 전송 내역 테이블(보냄/받음/전체).
- 초대 섹션: 활성 코드, 새 코드 생성, 공유 링크.
- 커뮤니티 서버: 상태 정보가 포함된 목록, 연결/연결 해제.

### `/dashboard/gamification/admin`

- 심각도, 사용자, 타임스탬프, z-점수가 포함된 이상 징후 목록.
- 필터가 있는 감사 로그 뷰어(작업 유형, 사용자, 날짜 범위).
- 시스템 통계: 지급된 총 XP, 활성 사용자, 배지 획득률.
- 페더레이션 서버 상태 개요.

---

## 파이프라인 통합

### 통합 지점

게이미피케이션은 `open-sse/handlers/chatCore.ts`의 단일 지점에서 요청 파이프라인에
연결됩니다.

```typescript
// 응답이 클라이언트로 전송된 후:
setImmediate(() => {
  emitGamificationEvent({
    type: "request.completed",
    apiKeyId,
    metadata: {
      provider: selectedProvider,
      model: selectedModel,
      comboId: resolvedCombo?.id,
      compressionUsed: compressionStats?.applied,
      skillUsed: skillExecution?.name,
    },
  }).catch(() => {
    // 실행 후 처리하지 않음: 로그는 남기되 클라이언트로는 절대 전파하지 않음
  });
});
```

### 이벤트 유형

| 이벤트 유형         | 발생 시점                                 |
| ------------------- | ----------------------------------------- |
| `request.completed` | 성공적인 LLM 응답이 전송됨                |
| `provider.switch`   | 공급자가 변경됨(콤보 폴백 포함)           |
| `combo.created`     | 새 콤보 구성이 저장됨                     |
| `combo.used`        | 콤보 대상에 성공적으로 도달함             |
| `badge.earned`      | 배지 평가에서 일치 항목을 찾음            |
| `streak.milestone`  | 연속 기록 기준값을 넘어섬                 |
| `transfer.sent`     | 토큰 전송이 완료됨                        |
| `referral.redeemed` | 초대 코드가 성공적으로 사용됨             |
| `compression.used`  | 프롬프트 압축이 적용됨                    |
| `skill.executed`    | 스킬 실행이 완료됨                        |
| `model.first_use`   | 지난 7일 동안 사용되지 않은 모델이 사용됨 |

### 비차단 보장

`setImmediate` + `.catch(() => {})` 패턴은 다음을 보장합니다.

1. 게이미피케이션이 실행되기 전에 응답이 완전히 전송됩니다.
2. 게이미피케이션 오류는 절대 클라이언트에 노출되지 않습니다.
3. 이벤트 처리는 인라인이 아니라 다음 마이크로태스크에서 실행됩니다.

---

## 보안

### 위협 모델

| 위협                    | 완화 조치                                                         |
| ----------------------- | ----------------------------------------------------------------- |
| 점수 부풀리기           | XP는 서버 측에서만 계산하며, 클라이언트는 점수가 아닌 행동을 제출 |
| 재전송 공격             | 전송에 멱등성 키 적용, 감사 로그 중복 제거                        |
| 전송 사기               | 복식부기 원장, 원자적 트랜잭션, 요청 속도 제한                    |
| 자기 추천               | 교환 시 `api_key_id` 교차 확인                                    |
| 리더보드 조작           | Z-점수 이상 탐지, 관리자용 이상 현상 대시보드                     |
| 페더레이션 토큰 탈취    | SHA-256 해시로 저장, 원본 토큰은 한 번만 표시                     |
| 초대 코드 무차별 대입   | 교환 엔드포인트에 요청 속도 제한 적용, 8자 엔트로피               |
| 표시 이름의 XSS         | 표시 이름 정제, 리더보드 항목 이스케이프                          |
| 해시에 대한 타이밍 공격 | 토큰 해시 비교에 `crypto.timingSafeEqual` 사용                    |

### 인증 요구 사항

- **공개**(인증 불필요): `GET /leaderboard`, `GET /stream`(읽기 전용
  리더보드).
- **API 키 필요**: 모든 쓰기 작업, 프로필, 전송, 초대.
- **관리자 전용**: 이상 현상 대시보드, 감사 로그 뷰어.
- **페더레이션**: `Authorization` 헤더의 원본 토큰을 사용하는 별도의 인증
  경로이며, 저장된 SHA-256 해시와 대조하여 검증.

---

## 테스트

### 테스트 파일

모든 테스트는 Node.js 기본 테스트 러너(`node --import tsx/esm --test`)를 사용합니다.

| 테스트 파일                                   | 검사 대상                           | 테스트 |
| --------------------------------------------- | ----------------------------------- | ------ |
| `tests/unit/gamification/xp.test.ts`          | XP 계산, 레벨 곡선, 칭호            | 8      |
| `tests/unit/gamification/badges.test.ts`      | 배지 기준 일치 여부, 수여           | 10     |
| `tests/unit/gamification/streaks.test.ts`     | 연속 기록 로직, 마일스톤, 경계 사례 | 7      |
| `tests/unit/gamification/leaderboard.test.ts` | 순위 계산, 페이지네이션, 순환       | 8      |
| `tests/unit/gamification/sharing.test.ts`     | 전송, 잔액, 멱등성                  | 9      |
| `tests/unit/gamification/invites.test.ts`     | 생성, 교환, 만료, 자기 추천         | 7      |
| `tests/unit/gamification/antiCheat.test.ts`   | 요청 속도 제한, Z-점수, 감사 로깅   | 6      |
| `tests/unit/gamification/events.test.ts`      | 이벤트 발생, 팬아웃, 오류 처리      | 5      |

### 테스트 실행

```bash
# 모든 게이미피케이션 테스트
node --import tsx/esm --test tests/unit/gamification/*.test.ts

# 단일 테스트 파일
node --import tsx/esm --test tests/unit/gamification/xp.test.ts
```

### 커버리지 요구 사항

`CONTRIBUTING.md`에 따라 모든 신규 모듈은 다음 조건을 충족해야 합니다.

- 브랜치 커버리지 >= 80%.
- 모든 공개 함수를 최소 한 번 테스트.
- 오류 경로 테스트(잔액 부족, 만료된 코드, 요청 속도 제한).

---

## 파일 구조

```
src/
  lib/
    db/
      migrations/
        060_create_gamification.sql    # 테이블 8개 및 인덱스 전체
      gamification.ts                  # 도메인 CRUD 모듈
    gamification/
      xp.ts                           # XP 계산, 레벨 곡선, 칭호
      badges.ts                       # 배지 정의, 기준, 평가
      streaks.ts                      # 일일 연속 기록 추적
      leaderboard.ts                  # 순위 계산, SSE, 로테이션
      antiCheat.ts                    # 속도 제한, z-score, 감사
      sharing.ts                      # 토큰 전송 원장
      invites.ts                      # 초대/사용 코드
      servers.ts                      # 커뮤니티 서버 페더레이션
      events.ts                       # 이벤트 이미터(통합 지점)
      notifications.ts                # SSE 알림 스트림
  app/
    api/
      gamification/
        leaderboard/route.ts          # GET/POST 리더보드
        leaderboard/stream/route.ts   # SSE 실시간 업데이트
        transfer/route.ts             # GET/POST 전송
        invite/route.ts               # GET/POST/DELETE 초대 코드
        invite/redeem/route.ts        # POST 코드 사용
        servers/route.ts              # GET/POST/DELETE 서버
        federation/score/route.ts     # POST 점수 푸시
        federation/leaderboard/route.ts # GET 리더보드 가져오기
        notifications/route.ts        # SSE 알림
        anomalies/route.ts            # GET 이상 징후 보고서
        rotate/route.ts               # POST 시크릿 로테이션
    (dashboard)/
      dashboard/
        leaderboard/page.tsx           # 순위 페이지
        profile/page.tsx               # XP/배지/연속 기록 페이지
        tokens/page.tsx                # 잔액/전송/초대 페이지
        gamification/admin/page.tsx    # 관리자용 이상 징후 모니터링
  shared/
    constants/
      gamification.ts                  # XP_REWARDS, TITLES, BADGE_DEFS, LIMITS

tests/
  unit/
    gamification/
      xp.test.ts
      badges.test.ts
      streaks.test.ts
      leaderboard.test.ts
      sharing.test.ts
      invites.test.ts
      antiCheat.test.ts
      events.test.ts

docs/
  frameworks/
    GAMIFICATION.md                    # 이 문서
```

---

## 마이그레이션 전략

### 1단계: 백엔드 핵심 기능(PR 1)

- 마이그레이션 `060_create_gamification.sql`(테이블 8개).
- `src/lib/db/gamification.ts`(도메인 모듈).
- `src/lib/gamification/xp.ts`, `streaks.ts`, `events.ts`.
- `chatCore.ts`의 통합 지점.
- XP, 연속 기록, 이벤트 단위 테스트.

### 2단계: 배지 및 리더보드(PR 2)

- `src/lib/gamification/badges.ts`, `leaderboard.ts`.
- 상수에 배지 정의 추가.
- 리더보드 API 라우트 및 SSE 스트림.
- 배지 및 리더보드 단위 테스트.

### 3단계: 공유 및 초대(PR 3)

- `src/lib/gamification/sharing.ts`, `invites.ts`, `antiCheat.ts`.
- 전송 및 초대 API 라우트.
- 공유, 초대, 부정행위 방지 단위 테스트.

### 4단계: 페더레이션 및 대시보드(PR 4)

- `src/lib/gamification/servers.ts`, `notifications.ts`.
- 페더레이션 API 라우트.
- 대시보드 페이지(리더보드, 프로필, 토큰, 관리자).
- MCP 도구 등록.

---

## 향후 고려 사항

- **시즌 이벤트**: 기간 한정 배지 세트 및 리더보드 시즌.
- **팀 리더보드**: 조직 또는 콤보별로 사용자를 그룹화.
- **XP 배율**: 프로모션 기간에 XP를 추가로 제공.
- **업적 공유**: 공유 가능한 배지 카드(OpenGraph 이미지) 생성.
- **모바일 푸시**: 배지/레벨 이벤트에 대한 웹훅 기반 알림.
- **리더보드 API**: 서드파티 통합을 위한 공개 API.
