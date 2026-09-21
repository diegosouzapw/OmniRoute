# Reasoning Replay Cache (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/REASONING_REPLAY.md) · 🇪🇹 [am](../../../am/docs/routing/REASONING_REPLAY.md) · 🇸🇦 [ar](../../../ar/docs/routing/REASONING_REPLAY.md) · 🇦🇿 [az](../../../az/docs/routing/REASONING_REPLAY.md) · 🇧🇬 [bg](../../../bg/docs/routing/REASONING_REPLAY.md) · 🇧🇩 [bn](../../../bn/docs/routing/REASONING_REPLAY.md) · 🇨🇿 [cs](../../../cs/docs/routing/REASONING_REPLAY.md) · 🇩🇰 [da](../../../da/docs/routing/REASONING_REPLAY.md) · 🇩🇪 [de](../../../de/docs/routing/REASONING_REPLAY.md) · 🇬🇷 [el](../../../el/docs/routing/REASONING_REPLAY.md) · 🇪🇸 [es](../../../es/docs/routing/REASONING_REPLAY.md) · 🇪🇪 [et](../../../et/docs/routing/REASONING_REPLAY.md) · 🇮🇷 [fa](../../../fa/docs/routing/REASONING_REPLAY.md) · 🇫🇮 [fi](../../../fi/docs/routing/REASONING_REPLAY.md) · 🇫🇷 [fr](../../../fr/docs/routing/REASONING_REPLAY.md) · 🇮🇪 [ga](../../../ga/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [gu](../../../gu/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ha](../../../ha/docs/routing/REASONING_REPLAY.md) · 🇮🇱 [he](../../../he/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [hi](../../../hi/docs/routing/REASONING_REPLAY.md) · 🇭🇷 [hr](../../../hr/docs/routing/REASONING_REPLAY.md) · 🇭🇺 [hu](../../../hu/docs/routing/REASONING_REPLAY.md) · 🇦🇲 [hy](../../../hy/docs/routing/REASONING_REPLAY.md) · 🇮🇩 [id](../../../id/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [ig](../../../ig/docs/routing/REASONING_REPLAY.md) · 🇮🇹 [it](../../../it/docs/routing/REASONING_REPLAY.md) · 🇯🇵 [ja](../../../ja/docs/routing/REASONING_REPLAY.md) · 🇬🇪 [ka](../../../ka/docs/routing/REASONING_REPLAY.md) · 🇰🇭 [km](../../../km/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [kn](../../../kn/docs/routing/REASONING_REPLAY.md) · 🇱🇹 [lt](../../../lt/docs/routing/REASONING_REPLAY.md) · 🇱🇻 [lv](../../../lv/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ml](../../../ml/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [mr](../../../mr/docs/routing/REASONING_REPLAY.md) · 🇲🇾 [ms](../../../ms/docs/routing/REASONING_REPLAY.md) · 🇲🇹 [mt](../../../mt/docs/routing/REASONING_REPLAY.md) · 🇲🇲 [my](../../../my/docs/routing/REASONING_REPLAY.md) · 🇳🇵 [ne](../../../ne/docs/routing/REASONING_REPLAY.md) · 🇳🇱 [nl](../../../nl/docs/routing/REASONING_REPLAY.md) · 🇳🇴 [no](../../../no/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [or](../../../or/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [pa](../../../pa/docs/routing/REASONING_REPLAY.md) · 🇵🇭 [phi](../../../phi/docs/routing/REASONING_REPLAY.md) · 🇵🇱 [pl](../../../pl/docs/routing/REASONING_REPLAY.md) · 🇵🇹 [pt](../../../pt/docs/routing/REASONING_REPLAY.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/REASONING_REPLAY.md) · 🇷🇴 [ro](../../../ro/docs/routing/REASONING_REPLAY.md) · 🇷🇺 [ru](../../../ru/docs/routing/REASONING_REPLAY.md) · 🇱🇰 [si](../../../si/docs/routing/REASONING_REPLAY.md) · 🇸🇰 [sk](../../../sk/docs/routing/REASONING_REPLAY.md) · 🇸🇮 [sl](../../../sl/docs/routing/REASONING_REPLAY.md) · 🇷🇸 [sr](../../../sr/docs/routing/REASONING_REPLAY.md) · 🇸🇪 [sv](../../../sv/docs/routing/REASONING_REPLAY.md) · 🇰🇪 [sw](../../../sw/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [ta](../../../ta/docs/routing/REASONING_REPLAY.md) · 🇮🇳 [te](../../../te/docs/routing/REASONING_REPLAY.md) · 🇹🇭 [th](../../../th/docs/routing/REASONING_REPLAY.md) · 🇹🇷 [tr](../../../tr/docs/routing/REASONING_REPLAY.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/REASONING_REPLAY.md) · 🇵🇰 [ur](../../../ur/docs/routing/REASONING_REPLAY.md) · 🇺🇿 [uz](../../../uz/docs/routing/REASONING_REPLAY.md) · 🇻🇳 [vi](../../../vi/docs/routing/REASONING_REPLAY.md) · 🇳🇬 [yo](../../../yo/docs/routing/REASONING_REPLAY.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/REASONING_REPLAY.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/REASONING_REPLAY.md)

---

> **신뢰할 수 있는 원본:** `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`
> **마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute는 사고 모드 모델이 생성한 어시스턴트의 `reasoning_content`를 캡처하고, 업스트림 제공자가 이를 요구하는 경우 다중 턴 요청에서 투명하게 재생합니다. 이를 통해 클라이언트의 대화 기록에 이전 턴의 추론이 누락되었을 때 엄격한 제공자가 반환하는 HTTP 400 오류를 방지합니다.

## 이 기능이 필요한 이유

일부 사고 모드 제공자는 **이전 어시스턴트 메시지에 원래의 `reasoning_content`가 포함되어 있지 않으면** 후속 턴을 거부합니다. 업스트림은 다음과 같은 메시지와 함께 400을 반환합니다.

```
Param Incorrect: The reasoning_content in the thinking mode must be passed back to the API.
```

그러나 일반적인 클라이언트(Cursor, Cline, Roo Code, OpenAI SDK)는 다시 전송하는 기록에서 `reasoning_content`를 제거합니다. OmniRoute는 서버 측 캐시에서 이를 복원하여 업스트림이 받는 요청의 일관성을 유지합니다. 이슈 #1628에서 하이브리드 메모리/SQLite 영속성이 도입되어 프로세스가 다시 시작된 후에도 캐시가 유지됩니다.

## 아키텍처

```
턴 N(어시스턴트가 생성):
  → 응답에 reasoning_content + tool_calls가 포함됨
  → requiresReasoningReplay(provider, model)인 경우: cacheReasoningFromAssistantMessage()
      모든 tool_call.id를 키로 사용하여 (메모리 + DB)에 기록
  → 클라이언트로 응답 전달(클라이언트가 추론을 유지할 수도 있고 유지하지 않을 수도 있음)

턴 N+1(클라이언트가 후속 요청 전송):
  → 변환기가 다음을 감지: requiresReasoningReplay(provider, model) === true
  → tool_calls가 있고 reasoning_content가 없는 각 어시스턴트 메시지에 대해:
      lookupReasoning(toolCalls[0].id) → 메모리 → DB
      적중  → msg.reasoning_content = cached; recordReplay()
      누락 → msg.reasoning_content = "" (이전 DeepSeek 버전을 위한 레거시 폴백)
  → 업스트림에 일관된 기록이 전달됨 → 400 오류 없음
```

캡처는 `open-sse/handlers/chatCore.ts`에서 수행됩니다(`cacheReasoningFromAssistantMessage`가 호출되는 두 위치). 재생은 스키마 강제 변환 후 디스패치 전에 `open-sse/translator/index.ts`에서 수행됩니다.

## 스토리지 — 하이브리드 메모리 + SQLite

핫 패스는 충돌 복구 및 대시보드 표시를 위해 SQLite 테이블이 뒷받침하는 인메모리 `Map`(생성 순서 기반 LRU)을 사용합니다.

| 계층   | 구현                                          | 목적                                           |
| ------ | --------------------------------------------- | ---------------------------------------------- |
| 메모리 | `open-sse/services/reasoningCache.ts`의 `Map` | 빠른 조회, 200개 초과 시 가장 오래된 항목 제거 |
| DB     | `reasoning_cache` 테이블(`src/lib/db/`)       | 재시작 후에도 유지되며 통계의 기반으로 사용    |

쓰기는 양쪽 모두에 수행됩니다. 읽기는 먼저 메모리를 조회한 후 DB로 폴백합니다(DB에서 적중한 항목은 다시 메모리로 승격됨). DB 오류는 치명적이지 않으며, 인메모리 캐시는 계속해서 핫 패스를 처리합니다.

**기본값:**

- TTL: `2h` (`TTL_MS = 2 * 60 * 60 * 1000`)
- 최대 메모리 항목 수: `200` (`MAX_MEMORY_ENTRIES`)
- 제거 방식: 가장 오래된 `createdAt`부터 제거

## 데이터베이스 스키마

마이그레이션: `src/lib/db/migrations/033_create_reasoning_cache.sql`

```sql
CREATE TABLE IF NOT EXISTS reasoning_cache (
  tool_call_id   TEXT PRIMARY KEY,
  provider       TEXT NOT NULL,
  model          TEXT NOT NULL,
  reasoning      TEXT NOT NULL,
  char_count     INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now')),
  expires_at     INTEGER NOT NULL
);
```

인덱스: `expires_at`, `provider`, `model`, `created_at`. `expires_at`은 Unix epoch 초 단위로 저장되며, SELECT 계층은 `EXPIRES_AT_EPOCH_SQL`을 통해 레거시 텍스트 값을 정규화합니다.

## 제공자 / 모델 감지

`requiresReasoningReplay(provider, model)`이 `true`를 반환하면 재생이 활성화됩니다. 이 함수는 `open-sse/services/reasoningCache.ts`에 있는 두 목록을 확인합니다.

**제공자 ID(대소문자를 구분하지 않는 정확한 일치):**

- `deepseek`
- `opencode-go`
- `siliconflow`
- `nebius`
- `deepinfra`
- `sambanova`
- `fireworks`
- `together`
- `kimi-coding`
- `kimi-coding-apikey`
- `xiaomi-mimo`

**모델 정규식 패턴(대소문자 구분 없음):**

- `/deepseek-r1/i`
- `/deepseek-reasoner/i`
- `/deepseek-chat/i`
- `/deepseek[-/]?v4[-.]flash/i` 및 `/deepseek[-/]?v4[-.]pro/i`(V4 Flash / Pro, 선택적 `-free` 접미사)
- `/(deepseek|zen\/deepseek)-v4/i`
- `/kimi[-/]k\d/i`
- `/qwq/i`
- `/qwen.*think/i`
- `/glm.*think/i`
- `/^mimo[-.]?v\d/i`

새로운 엄격한 제공자/모델을 추가하려면 이 목록 중 하나에 항목을 추가하고 재생 주입을 검증하는 단위 테스트를 작성해야 합니다. PR 설명에는 변경의 계기가 된 정확한 업스트림 400 문자열을 명시해야 합니다.

## REST API

캐시는 `src/app/api/cache/reasoning/route.ts` 아래에 두 개의 엔드포인트를 제공합니다. 둘 다 관리 인증(`@/shared/utils/apiAuth`의 `isAuthenticated`)이 필요합니다.

| 메서드 | 엔드포인트                                                | 설명                                              |
| ------ | --------------------------------------------------------- | ------------------------------------------------- |
| GET    | `/api/cache/reasoning`                                    | 통계 + 페이지가 매겨진 항목                       |
| GET    | `/api/cache/reasoning?provider=deepseek&model=...&limit=` | 필터링된 목록(`limit`는 `[1, 200]` 범위로 제한됨) |
| DELETE | `/api/cache/reasoning`                                    | 모두 지우고(메모리 + DB) 적중/미스 횟수 재설정    |
| DELETE | `/api/cache/reasoning?provider=deepseek`                  | 한 제공자의 항목만 지우기                         |
| DELETE | `/api/cache/reasoning?toolCallId=call_abc`                | 단일 항목 삭제                                    |

**GET 응답 형태:**

```json
{
  "stats": {
    "memoryEntries": 12,
    "dbEntries": 47,
    "totalEntries": 47,
    "totalChars": 138291,
    "hits": 84,
    "misses": 6,
    "replays": 81,
    "replayRate": "90.0%",
    "byProvider": { "deepseek": { "entries": 32, "chars": 98412 } },
    "byModel": { "deepseek-reasoner": { "entries": 32, "chars": 98412 } },
    "oldestEntry": "2026-05-13T10:00:00.000Z",
    "newestEntry": "2026-05-13T11:42:11.000Z"
  },
  "entries": [
    {
      "toolCallId": "call_abc",
      "provider": "deepseek",
      "model": "deepseek-reasoner",
      "reasoning": "...",
      "charCount": 3128,
      "createdAt": "...",
      "expiresAt": "..."
    }
  ]
}
```

## 운영 참고 사항

- **정리:** `cleanupReasoningCache()`는 만료된 메모리 항목을 제거하고 `DELETE FROM reasoning_cache WHERE expires_at <= unixepoch('now')`를 실행합니다. 상태 확인 워커가 이를 주기적으로 호출합니다.
- **충돌 복구:** 재시작 후 메모리는 비어 있지만 DB에는 만료되지 않은 항목이 계속 남아 있습니다. 특정 `tool_call_id`에 대한 첫 번째 조회는 DB 적중이며, 이후 조회는 메모리 적중입니다.
- **추론이 없으면 캐시도 없음:** 어시스턴트 메시지에 `reasoning_content` / `reasoning` 필드가 없으면 `cacheReasoningFromAssistantMessage`는 `0`을 반환하므로, 비사고 응답에는 비용이 발생하지 않습니다.
- **쓰기에도 게이트 적용:** `chatCore.ts`의 두 호출 지점(비스트리밍 및 스트리밍)은 `requiresReasoningReplay(provider, model)`이 `true`일 때만 `cacheReasoningFromAssistantMessage()`를 호출합니다. 이는 읽기 측에서 확인하는 것과 동일한 조건자입니다. 재생 제공자를 전혀 사용하지 않는 설치 환경에서는 추론이 포함된 모든 응답에 대한 쓰기, 인덱스 업데이트 및 try/catch 비용이 더 이상 발생하지 않습니다.
- **비엄격 제공자:** `requiresReasoningReplay`가 `false`이고 대상 형식이 OpenAI인 경우, 변환기는 발신 메시지에서 모든 `reasoning_content` 필드를 **제거합니다**. OpenAI Chat Completions는 이 필드를 허용하지 않습니다.

## 참고 자료

- [RESILIENCE_GUIDE.md](../architecture/RESILIENCE_GUIDE.md) — 회로 차단기, 쿨다운, 모델 잠금
- [TROUBLESHOOTING.md](../guides/TROUBLESHOOTING.md) — 업스트림 400 오류 진단
- 소스: `src/lib/db/reasoningCache.ts`, `open-sse/services/reasoningCache.ts`, `open-sse/translator/index.ts`
- 마이그레이션: `src/lib/db/migrations/033_create_reasoning_cache.sql`
- API 경로: `src/app/api/cache/reasoning/route.ts`
- 원본 이슈: #1628
