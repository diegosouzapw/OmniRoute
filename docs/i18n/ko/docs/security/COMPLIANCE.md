# Compliance & Audit (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../security/COMPLIANCE.md) · 🇪🇹 [am](../../../am/docs/security/COMPLIANCE.md) · 🇸🇦 [ar](../../../ar/docs/security/COMPLIANCE.md) · 🇦🇿 [az](../../../az/docs/security/COMPLIANCE.md) · 🇧🇬 [bg](../../../bg/docs/security/COMPLIANCE.md) · 🇧🇩 [bn](../../../bn/docs/security/COMPLIANCE.md) · 🇧🇦 [bs](../../../bs/docs/security/COMPLIANCE.md) · 🇨🇿 [cs](../../../cs/docs/security/COMPLIANCE.md) · 🇩🇰 [da](../../../da/docs/security/COMPLIANCE.md) · 🇩🇪 [de](../../../de/docs/security/COMPLIANCE.md) · 🇬🇷 [el](../../../el/docs/security/COMPLIANCE.md) · 🇪🇸 [es](../../../es/docs/security/COMPLIANCE.md) · 🇪🇪 [et](../../../et/docs/security/COMPLIANCE.md) · 🇮🇷 [fa](../../../fa/docs/security/COMPLIANCE.md) · 🇫🇮 [fi](../../../fi/docs/security/COMPLIANCE.md) · 🇫🇷 [fr](../../../fr/docs/security/COMPLIANCE.md) · 🇮🇪 [ga](../../../ga/docs/security/COMPLIANCE.md) · 🇮🇳 [gu](../../../gu/docs/security/COMPLIANCE.md) · 🇳🇬 [ha](../../../ha/docs/security/COMPLIANCE.md) · 🇮🇱 [he](../../../he/docs/security/COMPLIANCE.md) · 🇮🇳 [hi](../../../hi/docs/security/COMPLIANCE.md) · 🇭🇷 [hr](../../../hr/docs/security/COMPLIANCE.md) · 🇭🇺 [hu](../../../hu/docs/security/COMPLIANCE.md) · 🇦🇲 [hy](../../../hy/docs/security/COMPLIANCE.md) · 🇮🇩 [id](../../../id/docs/security/COMPLIANCE.md) · 🇳🇬 [ig](../../../ig/docs/security/COMPLIANCE.md) · 🇮🇹 [it](../../../it/docs/security/COMPLIANCE.md) · 🇯🇵 [ja](../../../ja/docs/security/COMPLIANCE.md) · 🇬🇪 [ka](../../../ka/docs/security/COMPLIANCE.md) · 🇰🇭 [km](../../../km/docs/security/COMPLIANCE.md) · 🇮🇳 [kn](../../../kn/docs/security/COMPLIANCE.md) · 🇱🇹 [lt](../../../lt/docs/security/COMPLIANCE.md) · 🇱🇻 [lv](../../../lv/docs/security/COMPLIANCE.md) · 🇮🇳 [ml](../../../ml/docs/security/COMPLIANCE.md) · 🇮🇳 [mr](../../../mr/docs/security/COMPLIANCE.md) · 🇲🇾 [ms](../../../ms/docs/security/COMPLIANCE.md) · 🇲🇹 [mt](../../../mt/docs/security/COMPLIANCE.md) · 🇲🇲 [my](../../../my/docs/security/COMPLIANCE.md) · 🇳🇵 [ne](../../../ne/docs/security/COMPLIANCE.md) · 🇳🇱 [nl](../../../nl/docs/security/COMPLIANCE.md) · 🇳🇴 [no](../../../no/docs/security/COMPLIANCE.md) · 🇮🇳 [or](../../../or/docs/security/COMPLIANCE.md) · 🇮🇳 [pa](../../../pa/docs/security/COMPLIANCE.md) · 🇵🇭 [phi](../../../phi/docs/security/COMPLIANCE.md) · 🇵🇱 [pl](../../../pl/docs/security/COMPLIANCE.md) · 🇵🇹 [pt](../../../pt/docs/security/COMPLIANCE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/COMPLIANCE.md) · 🇷🇴 [ro](../../../ro/docs/security/COMPLIANCE.md) · 🇷🇺 [ru](../../../ru/docs/security/COMPLIANCE.md) · 🇱🇰 [si](../../../si/docs/security/COMPLIANCE.md) · 🇸🇰 [sk](../../../sk/docs/security/COMPLIANCE.md) · 🇸🇮 [sl](../../../sl/docs/security/COMPLIANCE.md) · 🇷🇸 [sr](../../../sr/docs/security/COMPLIANCE.md) · 🇸🇪 [sv](../../../sv/docs/security/COMPLIANCE.md) · 🇰🇪 [sw](../../../sw/docs/security/COMPLIANCE.md) · 🇮🇳 [ta](../../../ta/docs/security/COMPLIANCE.md) · 🇮🇳 [te](../../../te/docs/security/COMPLIANCE.md) · 🇹🇭 [th](../../../th/docs/security/COMPLIANCE.md) · 🇹🇷 [tr](../../../tr/docs/security/COMPLIANCE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/COMPLIANCE.md) · 🇵🇰 [ur](../../../ur/docs/security/COMPLIANCE.md) · 🇺🇿 [uz](../../../uz/docs/security/COMPLIANCE.md) · 🇻🇳 [vi](../../../vi/docs/security/COMPLIANCE.md) · 🇳🇬 [yo](../../../yo/docs/security/COMPLIANCE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/COMPLIANCE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/COMPLIANCE.md)

---

> **신뢰할 수 있는 원본:** `src/lib/compliance/`, `src/app/api/compliance/`
> **마지막 업데이트:** 2026-06-28 — v3.8.40

OmniRoute는 관리 작업, 인증 이벤트, 제공자 자격 증명 수명 주기 변경 사항 및 MCP 도구 호출을 SQLite 기반 감사 테이블에 기록합니다. 이 페이지에서는 기록되는 항목, 저장 위치, 보존 기간, API 키의 로깅 제외 방법 및 데이터 조회 방법을 설명합니다.

구현은 `src/lib/compliance/index.ts`(T-43 — "규정 준수 제어") 및 `src/lib/compliance/providerAudit.ts`에 있습니다. 감사 쓰기는 예외를 발생시키지 않습니다. 실패가 발생하면 호출이 조용히 무시되므로 감사 로깅이 기본 요청 흐름을 중단하지 않습니다.

## 기록되는 항목

### 관리 감사 이벤트(`audit_log`)

`logAuditEvent({ action, actor, target, details, ... })`를 호출할 때마다 하나의 행이 생성됩니다. 작업 문자열은 `domain.verb`(또는 `domain.verb.outcome`) 패턴을 따릅니다. 소스 트리에서 확인된 작업 유형은 다음과 같습니다.

| 작업                                 | 소스                                    |
| ------------------------------------ | --------------------------------------- |
| `auth.login.success`                 | `src/app/api/auth/login/route.ts`       |
| `auth.login.failed`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.locked`                  | `src/app/api/auth/login/route.ts`       |
| `auth.login.error`                   | `src/app/api/auth/login/route.ts`       |
| `auth.login.misconfigured`           | `src/app/api/auth/login/route.ts`       |
| `auth.login.setup_required`          | `src/app/api/auth/login/route.ts`       |
| `auth.logout.success`                | `src/app/api/auth/logout/route.ts`      |
| `provider.credentials.created`       | `src/app/api/providers/route.ts`        |
| `provider.credentials.updated`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.revoked`       | `src/app/api/providers/[id]/route.ts`   |
| `provider.credentials.batch_revoked` | `src/app/api/providers/route.ts`        |
| `sync.token.created`                 | `src/app/api/sync/tokens/route.ts`      |
| `sync.token.revoked`                 | `src/app/api/sync/tokens/[id]/route.ts` |
| `compliance.cleanup`                 | `src/lib/compliance/index.ts`           |

각 항목에는 `action`, `actor`(기본값은 `"system"`), `target`, `details`/`metadata`(JSON), `ip_address`, `resource_type`, `status`, `request_id`, `timestamp`가 기록됩니다. 민감한 키(`apiKey`, `accessToken`, `refreshToken`, `password`, `*token`/`*secret`/`*apikey`와 일치하는 모든 항목 등)는 행이 작성되기 전에 재귀적으로 `"[redacted]"`로 마스킹됩니다.

### MCP 도구 호출(`mcp_tool_audit`)

모든 MCP 도구 호출은 `open-sse/mcp-server/audit.ts`를 통해 행을 기록합니다. 스키마(`src/lib/db/migrations/002_mcp_a2a_tables.sql`에서 가져옴):

| 열               | 참고 사항                            |
| ---------------- | ------------------------------------ |
| `id`             | 자동 증가                            |
| `tool_name`      | MCP 도구 식별자                      |
| `input_hash`     | 입력의 sha256(페이로드는 저장 안 함) |
| `output_summary` | 짧게 잘린 요약                       |
| `duration_ms`    | 경과 시간                            |
| `api_key_id`     | 호출자(Nullable)                     |
| `success`        | `1` / `0`                            |
| `error_code`     | 실패 시 최종 오류 코드               |
| `created_at`     | ISO 타임스탬프                       |

### 요청/사용량 로그

다음은 운영 원격 측정 데이터로, 엄밀히 말하면 관리 감사 데이터는 아니지만 동일한 보존 파이프라인을 공유합니다.

- `usage_history` — 요청별 사용량 집계
- `call_logs` — 요청별 전체 로그(행 수 제한 적용, 아래 참조)
- `proxy_logs` — 프록시 트래픽 로그(행 수 제한 적용)
- `request_detail_logs` — 레거시 상세 요청 로그(존재하는 경우 계속 정리됨)

## 스토리지 스키마

`audit_log`는 처음 사용될 때 `ensureAuditLogSchema()`에 의해 지연 생성됩니다.

```sql
CREATE TABLE IF NOT EXISTS audit_log (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  timestamp     TEXT NOT NULL DEFAULT (datetime('now')),
  action        TEXT NOT NULL,
  actor         TEXT NOT NULL DEFAULT 'system',
  target        TEXT,
  details       TEXT,
  ip_address    TEXT,
  resource_type TEXT,
  status        TEXT,
  request_id    TEXT,
  metadata      TEXT
);
```

인덱스는 `timestamp`, `action`, `actor`, `resource_type`, `status`, `request_id`에 생성됩니다. 레거시 DB에서 누락된 열은 필요할 때 `ALTER TABLE`을 통해 추가됩니다.

## 보존 및 정리

서로 분리된 두 가지 보존 기간이 적용됩니다.

| 환경 변수                   | 기본값   | 적용 대상                                                         |
| --------------------------- | -------- | ----------------------------------------------------------------- |
| `APP_LOG_RETENTION_DAYS`    | `7`      | `audit_log`, `mcp_tool_audit`                                     |
| `CALL_LOG_RETENTION_DAYS`   | `7`      | `usage_history`, `call_logs`, `proxy_logs`, `request_detail_logs` |
| `CALL_LOGS_TABLE_MAX_ROWS`  | `100000` | `call_logs`의 행 수 제한 정리                                     |
| `PROXY_LOGS_TABLE_MAX_ROWS` | `100000` | `proxy_logs`의 행 수 제한 정리                                    |

`cleanupExpiredLogs()`는 보존 정책에 따른 정리 작업을 실행합니다. 서버 시작 시 `src/instrumentation-node.ts`에서 호출됩니다. 각 실행은 테이블별 삭제 건수와 함께 `compliance.cleanup` 감사 이벤트를 기록합니다. 긴 쓰기 잠금을 방지하기 위해 프록시/호출 로그 정리는 배치 단위(`BATCH_SIZE = 5000`)로 수행됩니다.

수동 요청 기록 정리는 보존 정책과 별개입니다. 요청 로그 페이지는 `POST /api/settings/purge-request-history`를 호출하며, 이 요청은 `call_logs`, 레거시 `request_detail_logs`, 그리고 `${DATA_DIR}/call_logs/` 아래의 로컬 요청 아티팩트를 삭제합니다.

기본값은 `src/lib/logEnv.ts`에 정의되어 있습니다
(`DEFAULT_APP_LOG_RETENTION_DAYS = 7`, `DEFAULT_CALL_LOG_RETENTION_DAYS = 7`).

## `noLog` 로그 제외 설정(API 키별)

API 키에 플래그를 설정하여 해당 키의 다운스트림 호출 트래픽이 기록되지 않도록 할 수 있습니다. 이 플래그는 `api_keys` 테이블(`no_log INTEGER DEFAULT 0`)에 저장되며, 빠른 경로 조회를 위해 인메모리 세트에도 반영됩니다.

```bash
# 로그를 기록하지 않는 키 생성(관리자 인증 필요)
curl -X POST http://localhost:20128/api/keys \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{"name": "Privacy key", "noLog": true}'
```

도우미(`src/lib/compliance/index.ts`):

- `setNoLog(apiKeyId, true|false)` — 인메모리 항목 설정 또는 해제
- `isNoLog(apiKeyId)` — 요청 경로에서 확인하며, 항목이 없으면 30초 동안 캐시되는 `api_keys.no_log` 조회로 대체
- `NO_LOG_API_KEY_IDS`(환경 변수, 쉼표로 구분) — 부팅 시 인메모리 세트에 미리 로드됩니다. 열을 직접 변경할 수 없을 때 유용합니다.

관리 감사 이벤트(로그인, 공급자 변경, MCP 도구 호출 등)는 `noLog`의 영향을 **받지 않습니다**. 제외되는 것은 요청별 트래픽 로깅뿐입니다.

## REST API

| 엔드포인트                  | 메서드 | 설명                                            | 인증       |
| --------------------------- | ------ | ----------------------------------------------- | ---------- |
| `/api/compliance/audit-log` | `GET`  | 필터를 지원하는 페이지네이션된 관리자 감사 항목 | management |
| `/api/mcp/audit`            | `GET`  | 페이지네이션된 MCP 도구 감사 항목               | (open-sse) |
| `/api/mcp/audit/stats`      | `GET`  | 집계된 MCP 감사 통계                            | (open-sse) |

현재 CSV 내보내기 엔드포인트는 제공되지 않습니다. 대시보드에서 내보내거나
SQLite 데이터베이스를 직접 쿼리하세요.

### `/api/compliance/audit-log` 쿼리하기

지원되는 쿼리 매개변수(모두 선택 사항이며, 텍스트 필터에는 모두 `LIKE %value%`
일치 방식을 사용):

- `action`, `actor`, `target`, `resourceType`(또는 `resource_type`),
  `status`, `requestId`(또는 `request_id`)
- `from` / `since`, `to` / `until` — ISO 타임스탬프
- `limit`(기본값 `50`, 최솟값 `1`, 최댓값 `500`)
- `offset`(기본값 `0`, 최댓값 `10_000`)

응답은 JSON 배열입니다. 페이지네이션 메타데이터는 다음 헤더로 반환됩니다:
`x-total-count`, `x-page-limit`, `x-page-offset`.

```bash
curl "http://localhost:20128/api/compliance/audit-log?action=provider.credentials&from=2026-05-01" \
  -H "Cookie: auth_token=..."
```

## 대시보드

대시보드의 **`/dashboard/audit`**에서 감사 데이터를 확인할 수 있습니다
(`src/app/(dashboard)/dashboard/audit/page.tsx`). 이 페이지에는 두 개의 탭이 있습니다:

- **컴플라이언스**(`ComplianceTab.tsx`) — `/api/compliance/audit-log`의
  관리자 감사 이벤트입니다. 이벤트 유형, 심각도(info / warning
  / critical, 작업 + 상태에서 파생), 날짜 범위로 필터링합니다. 심각도는
  작업/상태 문자열을 기반으로 클라이언트 측에서 계산됩니다.
- **MCP**(`McpAuditTab.tsx`) — `/api/mcp/audit`의 MCP 도구 감사이며,
  도구 이름과 성공/실패 여부로 필터링할 수 있습니다.

두 탭은 각각 `50`(컴플라이언스)과 `25`(MCP)의 페이지 크기로 페이지네이션됩니다.

## 제공자 자격 증명 헬퍼

`src/lib/compliance/providerAudit.ts`는 제공자 관리 라우트에서 자격 증명
이벤트를 생성할 때 사용하는 데이터 형식화 헬퍼를 제공합니다:

- `summarizeProviderConnectionForAudit(connection)` — 연결 스냅샷이
  `details`에 기록되기 전에 `apiKey`, `accessToken`, `refreshToken`,
  `idToken`, `providerSpecificData.consoleApiKey`를 제거합니다.
- `getProviderAuditTarget(connection)` — `target` 필드에 사용할 안정적인
  `"<provider>:<name|id>"` 문자열을 구성합니다.
- `extractProviderWarnings(...payloads)` — 제공자 응답에서 정책/안전 경고
  (`[sanitizer]`, `prompt injection detected`, `content has been filtered`,
  `safety filter`, `policy violation`)를 검색하고, 각각 400자로 잘린
  결과를 최대 5개까지 표시합니다.

## 모범 사례

- PII(법률, 의료 등)를 처리하는 API 키에는 `noLog: true`를 설정하세요.
- 보존 정책에 맞게 `APP_LOG_RETENTION_DAYS` / `CALL_LOG_RETENTION_DAYS`를
  조정하세요. 기본값인 7일은 보수적으로 설정된 값입니다.
- 컴플라이언스 프로그램에서 요구하는 주기에 따라 감사 테이블을 플랫폼 외부로
  내보내세요(`sqlite3 dump`). 기본 제공되는 보관 기능은 없습니다.
- 무차별 대입 공격 탐지를 위해 `auth.login.failed`와 `auth.login.locked`
  횟수를 추적하세요.
- 새 관리자 엔드포인트를 추가할 때는 안정적인 `domain.verb.outcome` 작업
  문자열을 사용하여 `logAuditEvent({ ... })`를 호출하고,
  `getAuditRequestContext(request)`를 통해 요청 컨텍스트를 전달하여 IP와
  `requestId`가 자동으로 캡처되도록 하세요.

## 함께 보기

- [`docs/security/GUARDRAILS.md`](./GUARDRAILS.md) — PII 마스킹, 프롬프트 인젝션
- [`docs/frameworks/MCP-SERVER.md`](../frameworks/MCP-SERVER.md) — MCP 도구 카탈로그 및 범위
- [`docs/reference/ENVIRONMENT.md`](../reference/ENVIRONMENT.md) — 전체 환경 변수 참조
- 소스: `src/lib/compliance/`, `src/app/api/compliance/`,
  `src/app/api/mcp/audit/`, `src/lib/logEnv.ts`
