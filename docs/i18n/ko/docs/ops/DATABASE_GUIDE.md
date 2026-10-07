# Database Schema & Operations Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../ops/DATABASE_GUIDE.md) · 🇪🇹 [am](../../../am/docs/ops/DATABASE_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/ops/DATABASE_GUIDE.md) · 🇦🇿 [az](../../../az/docs/ops/DATABASE_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/ops/DATABASE_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/ops/DATABASE_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/ops/DATABASE_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/ops/DATABASE_GUIDE.md) · 🇩🇰 [da](../../../da/docs/ops/DATABASE_GUIDE.md) · 🇩🇪 [de](../../../de/docs/ops/DATABASE_GUIDE.md) · 🇬🇷 [el](../../../el/docs/ops/DATABASE_GUIDE.md) · 🇪🇸 [es](../../../es/docs/ops/DATABASE_GUIDE.md) · 🇪🇪 [et](../../../et/docs/ops/DATABASE_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/ops/DATABASE_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/ops/DATABASE_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/ops/DATABASE_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/ops/DATABASE_GUIDE.md) · 🇮🇱 [he](../../../he/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/ops/DATABASE_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/ops/DATABASE_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/ops/DATABASE_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/ops/DATABASE_GUIDE.md) · 🇮🇩 [id](../../../id/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/ops/DATABASE_GUIDE.md) · 🇮🇹 [it](../../../it/docs/ops/DATABASE_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/ops/DATABASE_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/ops/DATABASE_GUIDE.md) · 🇰🇭 [km](../../../km/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/ops/DATABASE_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/ops/DATABASE_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/ops/DATABASE_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/ops/DATABASE_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/ops/DATABASE_GUIDE.md) · 🇲🇲 [my](../../../my/docs/ops/DATABASE_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/ops/DATABASE_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/ops/DATABASE_GUIDE.md) · 🇳🇴 [no](../../../no/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [or](../../../or/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/ops/DATABASE_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/ops/DATABASE_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/ops/DATABASE_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/ops/DATABASE_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/ops/DATABASE_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/ops/DATABASE_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/ops/DATABASE_GUIDE.md) · 🇱🇰 [si](../../../si/docs/ops/DATABASE_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/ops/DATABASE_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/ops/DATABASE_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/ops/DATABASE_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/ops/DATABASE_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/ops/DATABASE_GUIDE.md) · 🇮🇳 [te](../../../te/docs/ops/DATABASE_GUIDE.md) · 🇹🇭 [th](../../../th/docs/ops/DATABASE_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/ops/DATABASE_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/ops/DATABASE_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/ops/DATABASE_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/ops/DATABASE_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/ops/DATABASE_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/ops/DATABASE_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/ops/DATABASE_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/ops/DATABASE_GUIDE.md)

---

> **요약**: OmniRoute는 기본 저장소로 **WAL 저널링을 사용하는 SQLite**를 사용하며, 민감한 필드의 저장 데이터에는 **AES-256-GCM** 암호화를 적용합니다. 이 가이드에서는 스키마, 마이그레이션, 백업/복구 및 운영 런북을 다룹니다.

**출처:**

- `src/lib/db/core.ts` — 싱글턴 + SCHEMA_SQL(기본 테이블 17개)
- `src/lib/db/migrationRunner.ts` — 버전별 마이그레이션
- `src/lib/db/migrations/` — 버전별 SQL 파일 167개
- `src/lib/db/encryption.ts` — 암호화 헬퍼
- `src/lib/db/backup.ts` — 백업 내보내기/가져오기
- `src/lib/db/healthCheck.ts` — 상태 진단

---

## SQLite를 사용하는 이유

OmniRoute는 다음과 같은 여러 이유로 PostgreSQL/MySQL 대신 SQLite를 선택했습니다.

| 요소          | SQLite                                | PostgreSQL                        |
| ------------- | ------------------------------------- | --------------------------------- |
| **배포**      | 임베디드 방식 — 별도 서버 불필요      | 서버 설정 필요                    |
| **암호화**    | 애플리케이션 계층(AES-256-GCM)        | TDE 기본 제공                     |
| **성능**      | 소규모/중간 규모 워크로드에서 더 빠름 | 대규모 동시 쓰기에 더 적합        |
| **동시성**    | WAL 모드로 동시 읽기 가능             | 완전한 MVCC                       |
| **백업**      | 단일 파일 복사                        | `pg_dump` 또는 파일 시스템 스냅샷 |
| **사용 사례** | 사용자별 설치, 임베디드 환경          | 멀티 테넌트 SaaS                  |

**단일 사용자, 단일 인스턴스** 배포(OmniRoute의 주요 사용 사례)에서는 SQLite가 더 간단하고 빠릅니다.

### WAL 저널링

`core.ts`는 **WAL(Write-Ahead Logging) 모드**로 데이터베이스를 엽니다.

```ts
// src/lib/db/core.ts
db.pragma("journal_mode = WAL");
db.pragma("busy_timeout = 2000");
db.pragma("synchronous = NORMAL");
db.pragma(`cache_size = -${DEFAULT_DATABASE_SETTINGS.optimization.cacheSize}`);
```

WAL을 사용하면 쓰기 작업 중에도 **동시 읽기**가 가능합니다. 이는 요청이 기록되는 동안 쿼리를 실행하는 대시보드에 중요합니다.

기본 캐시 크기는 **65,536 KiB(64 MiB)**입니다. SQLite는 음수
`cache_size`를 KiB 단위의 대략적인 상한으로 해석하고 필요에 따라 페이지를 할당합니다.
**설정 > 시스템 및 저장소 > 캐시 크기**에는 **1~1,000,000 KiB** 범위의 정수 값을
입력할 수 있습니다. 설정을 저장하면 현재 데이터베이스 연결에 적용되며,
OmniRoute는 시작 시 저장된 값을 복원합니다.

---

## 데이터베이스 위치

SQLite 파일은 다음 위치에 저장됩니다.

| OS      | 경로                                                     |
| ------- | -------------------------------------------------------- |
| Linux   | `~/.omniroute/storage.sqlite`                            |
| macOS   | `~/.omniroute/storage.sqlite`                            |
| Windows | `%USERPROFILE%\.omniroute\storage.sqlite`                |
| Docker  | `/app/data/storage.sqlite` (`DATA_DIR`을 통해 구성 가능) |

관련 파일:

- `storage.sqlite-wal` — 미리 쓰기 로그
- `storage.sqlite-shm` — 공유 메모리 파일
- `call_logs/` — 요청 페이로드 아티팩트(활성화된 경우)

**위치 재정의:**

```bash
DATA_DIR=/custom/path omniroute
```

---

## 도메인 모듈 아키텍처

OmniRoute의 데이터베이스에는 `src/lib/db/`에 **110개의 최상위 TypeScript 모듈**이 있습니다. 각 도메인 모듈은 다음 원칙을 따릅니다.

- 하나 이상의 특정 테이블을 소유합니다
- 타입이 지정된 CRUD 함수를 내보냅니다
- 다른 모듈의 테이블에 절대 접근하지 않습니다
- DB에 접근하기 위해 `core.ts`의 `getDbInstance()`를 사용합니다

### 110개의 최상위 DB 모듈

OmniRoute에는 `src/lib/db/`에 **110개의 최상위 TypeScript 파일**이 있습니다. 다음은 핵심 모듈의 일부 예시이며, 전체 목록은 디렉터리 목록을 참조하세요.

| 모듈                    | 테이블                                                         | 역할                                                 |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------- |
| `providers.ts`          | `provider_connections`                                         | OAuth/API 키 제공자 등록 및 자격 증명 관리           |
| `models.ts`             | `key_value` (모델 데이터)                                      | 모델 정의, 기능, 가격                                |
| `combos.ts`             | `combos`                                                       | 콤보 라우팅 구성 및 순서 지정                        |
| `apiKeys.ts`            | `api_keys`                                                     | API 키 수명 주기, 범위, 할당량 추적                  |
| `settings.ts`           | `key_value`, `api_keys`, `combos`                              | 시스템 구성 및 공유 KV 저장소                        |
| `backup.ts`             | —                                                              | 백업 내보내기/가져오기 작업                          |
| `proxies.ts`            | `proxy_registry`, `proxy_assignments`, `provider_connections`  | 프록시 구성 및 라우팅 규칙                           |
| `prompts.ts`            | `prompt_templates`                                             | 재사용 가능한 프롬프트 템플릿 및 버전 관리           |
| `webhooks.ts`           | `webhooks`                                                     | 이벤트 기반 웹훅 구독 및 로그                        |
| `detailedLogs.ts`       | `request_detail_logs`                                          | 요청별 감사 로깅(선택 사항, 대용량)                  |
| `domainState.ts`        | `domain_*` (5개 테이블)                                        | 도메인 예산, 회로 차단기, 잠금, 폴백 체인, 비용 이력 |
| `registeredKeys.ts`     | `registered_keys`, `account_key_limits`, `provider_key_limits` | MCP/A2A용 허용 목록 API 키                           |
| `quotaSnapshots.ts`     | `quota_snapshots`                                              | 과거 할당량 사용량                                   |
| `modelComboMappings.ts` | `model_combo_mappings`                                         | 모델을 기본 콤보에 매핑                              |
| `cliToolState.ts`       | `cli_tool_state`                                               | CLI 전용 영구 상태                                   |
| `encryption.ts`         | —                                                              | 필드 암호화/복호화를 위한 헬퍼                       |
| `readCache.ts`          | —                                                              | 읽기 작업이 많은 경우를 위한 인메모리 캐시           |
| `secrets.ts`            | `key_value` (암호화된 항목)                                    | 암호화된 비밀 정보 저장소                            |
| `stateReset.ts`         | —                                                              | 테스트를 위한 DB 상태 삭제/재설정                    |
| `contextHandoffs.ts`    | `context_handoffs`                                             | 에이전트 핸드오프를 위한 세션 컨텍스트               |
| `usage*.ts`             | `usage_history`, `call_logs`, `proxy_logs`                     | 사용량 추적                                          |
| `compression*.ts`       | `compression_settings`, `compression_combos`                   | 압축 구성                                            |

### 모듈 경계

핵심 아키텍처 규칙은 **모듈이 서로의 테이블에 직접 접근하지 않는 것**입니다. 다른 모듈의 데이터를 사용하려면 해당 모듈에서 함수를 가져오세요.

```ts
// ❌ 잘못된 방식: 다른 모듈에서 직접 SQL 실행
db.prepare("SELECT * FROM provider_connections").all();

// ✅ 올바른 방식: providers 모듈 함수 사용
import { listProviders } from "@/lib/db/providers";
const providers = await listProviders();
```

이 규칙은 코드 리뷰를 통해 적용됩니다. 정적 검사는 없지만, 위반 사항은 지적됩니다.

---

## 기본 스키마(테이블 17개)

`core.ts`는 `SCHEMA_SQL`에 17개의 기본 테이블을 정의합니다. 이 테이블들은 마이그레이션 `001_initial_schema.sql`에 의해 생성되며 핵심 스키마를 구성합니다.

### 핵심 테이블(초기 마이그레이션에서 생성)

| 테이블                     | 용도                        | 주요 열                                                                 |
| -------------------------- | --------------------------- | ----------------------------------------------------------------------- |
| `provider_connections`     | 공급자 자격 증명(암호화됨)  | `id`, `provider`, `auth_type`, `api_key`, `is_active`                   |
| `provider_nodes`           | 공급자 노드 라우팅 정보     | `id`, `type`, `name`, `base_url`, `created_at`                          |
| `key_value`                | 범용 KV 저장소              | `namespace`, `key`, `value`                                             |
| `combos`                   | 라우팅 조합 정의            | `id`, `name`, `data`, `sort_order`                                      |
| `api_keys`                 | 게이트웨이용 API 키         | `id`, `name`, `key`, `machine_id`, `allowed_models`                     |
| `db_meta`                  | 데이터베이스 메타데이터     | `key`, `value`                                                          |
| `usage_history`            | 요청 사용량 기록            | `id`, `provider`, `model`, `tokens_input`, `tokens_output`, `timestamp` |
| `call_logs`                | 요청 페이로드 및 응답       | `id`, `timestamp`, `status`, `model`, `provider`, `latency_ms`          |
| `proxy_logs`               | 프록시 요청 로그            | `id`, `timestamp`, `proxy_type`, `status`, `provider`                   |
| `domain_fallback_chains`   | 모델-공급자 체인            | `model`, `chain`                                                        |
| `domain_budgets`           | 도메인별 지출 예산          | `api_key_id`, `daily_limit_usd`, `warning_threshold`, `reset_interval`  |
| `domain_budget_reset_logs` | 예산 재설정 기록            | `id`, `api_key_id`, `reset_interval`, `previous_spend`, `reset_at`      |
| `domain_cost_history`      | 도메인별 비용 추적          | `id`, `api_key_id`, `cost`, `timestamp`                                 |
| `domain_lockout_state`     | 도메인 요청 제한 상태       | `identifier`, `attempts`, `locked_until`                                |
| `domain_circuit_breakers`  | 도메인별 서킷 브레이커 상태 | `name`, `state`, `failure_count`, `last_failure_time`                   |
| `semantic_cache`           | LLM 응답 캐시               | `id`, `signature`, `model`, `prompt_hash`, `response`                   |
| `quota_snapshots`          | 과거 할당량 스냅샷          | `id`, `provider`, `connection_id`, `window_key`, `remaining_percentage` |

### 추가 테이블(후속 마이그레이션에서 추가)

후속 마이그레이션에서는 다음과 같은 테이블을 추가합니다.

- `cli_tool_state`(마이그레이션 011) — CLI 도구 상태
- `mcp_*` 테이블 — MCP 서버 감사
- `a2a_*` 테이블 — A2A 작업 상태
- `usage_*` 테이블 — 사용량 추적
- `plugin_*` 테이블 — 플러그인 시스템
- `skill_executions` — 스킬 실행 기록
- `memory_*` 테이블 — 메모리 시스템
- `compression_*` 테이블 — 압축 시스템
- `webhook_*` 테이블 — 웹훅 전송 로그
- `acp_*` 테이블 — Agent Client Protocol
- `oneproxy_*` 테이블 — 1proxy 마켓플레이스
- `proxy_assignments` — 프록시 범위 바인딩
- `detailed_call_artifacts` — 호출 로그 아티팩트 메타데이터
- `quota_alert_history` — 할당량 알림 감사
- `command_code_auth_sessions` — Command Code OAuth 세션

약 30개 이상의 전체 테이블 목록은 `src/lib/db/migrations/`에 있습니다.

---

## 마이그레이션

OmniRoute는 `src/lib/db/migrations/`에서 **버전이 지정된 멱등성 마이그레이션**을 사용합니다. 각 마이그레이션은 `NNN_description.sql` 형식의 이름을 가진 단일 SQL 파일입니다.

### 마이그레이션 이름 지정

```
001_initial_schema.sql
002_mcp_a2a_tables.sql
003_provider_node_custom_paths.sql
...
021_combo_call_log_targets.sql
```

### 마이그레이션 실행 방식

시작 시 `migrationRunner.ts`는 다음 작업을 수행합니다.

1. `_omniroute_migrations` 테이블이 없으면 생성합니다
2. 이미 적용된 마이그레이션을 조회합니다
3. 새로운 마이그레이션을 순서대로 각각 하나의 트랜잭션 내에서 적용합니다
4. 적용된 각 마이그레이션을 타임스탬프와 함께 기록합니다

```ts
// src/lib/db/migrationRunner.ts (단순화됨)
export async function runMigrations(db: SqliteDatabase, migrationsDir: string) {
  const applied = getAppliedMigrations(db);
  const available = readMigrationFiles(migrationsDir);

  for (const migration of available) {
    if (applied.includes(migration.id)) continue;
    db.transaction(() => {
      db.exec(migration.sql);
      recordAppliedMigration(db, migration.id);
    })();
  }
}
```

### 멱등성

마이그레이션은 **멱등성**을 가져야 합니다. 즉, 두 번 실행해도 아무런 추가 작업이 발생하지 않아야 합니다.

```sql
-- 004_proxy_registry.sql
CREATE TABLE IF NOT EXISTS proxy_registry (
  id TEXT PRIMARY KEY,
  host TEXT NOT NULL,
  port INTEGER NOT NULL,
  ...
);
```

`IF NOT EXISTS`, `IF EXISTS`, `OR IGNORE` / `OR REPLACE` 절을 적극적으로 사용하세요.

### 새 마이그레이션 추가

1. **다음 번호 확인**: `ls src/lib/db/migrations/ | tail -1`
2. **파일 생성**: `NNN_my_change.sql`
3. **안전한 DDL 사용**: `CREATE TABLE IF NOT EXISTS`, `ALTER TABLE ... ADD COLUMN`
4. **데이터를 신중하게 백필**: 기존 행을 처리하려면 `UPDATE ... WHERE ...`를 사용하세요
5. **복사본에서 테스트**: 테스트하지 않은 마이그레이션을 프로덕션에서 실행하지 마세요

예시:

```sql
-- 022_add_combo_priority.sql
ALTER TABLE combos ADD COLUMN priority INTEGER DEFAULT 100;
UPDATE combos SET priority = 100 WHERE priority IS NULL;
CREATE INDEX IF NOT EXISTS idx_combos_priority ON combos(priority);
```

> **하위 호환되지 않는 변경 사항**(예: 열 삭제)은 처리하기 까다롭습니다. OmniRoute는 다운그레이드를 지원하지 **않습니다**. 마이그레이션이 적용되면 스키마 변경은 영구적입니다. 이를 고려하여 계획하세요.

---

## 저장 데이터 암호화

민감한 필드(API 키, OAuth 토큰, 연결 문자열)는 **AES-256-GCM**을 사용하여 저장 시 암호화됩니다.

### 작동 방식

```ts
// src/lib/db/encryption.ts (단순화됨)
const key = deriveKeyFromPassphrase(passphrase, salt);
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
const authTag = cipher.getAuthTag();
return { encrypted, iv, authTag };
```

### 사용 위치

- `provider_connections.api_key` — 애플리케이션 수준에서 암호화됨
- `provider_connections.access_token`, `refresh_token`, `id_token` — 애플리케이션 수준에서 암호화됨
- `namespace = "secrets"`인 `key_value` 항목 — 애플리케이션 수준에서 암호화됨
- `proxy_registry.auth` — 존재하는 경우 애플리케이션 수준에서 암호화됨

### 암호화 키

암호화 키는 **암호 문구**(`STORAGE_ENCRYPTION_KEY` 환경 변수를 통해 설정)와 **솔트**(DB에 저장됨)로부터 파생됩니다. 데이터를 복호화하려면 둘 다 필요합니다.

```bash
# 안전한 암호 문구 생성
openssl rand -hex 32

# .env에 설정
STORAGE_ENCRYPTION_KEY=<your-key>
```

> **중요**: 암호화 키를 분실하면 암호화된 모든 데이터에 접근할 수 없게 됩니다. **키를 데이터베이스와 별도로 백업하세요**.

### 암호화되지 않는 항목

성능상의 이유로 다음 항목은 평문으로 저장됩니다.

- 제공자 표시 이름
- 모델 정의(이미 공개된 정보)
- 라우팅 규칙
- 사용량 기록(PII 없음)

---

## 암호화 관련 주의 사항 (v3.8.16+)

OmniRoute는 두 가지 암호화 방식을 투명하게 처리하기 위해 **`migrateLegacyEncryptedString()`**을 사용합니다.

- **레거시** (v3.5.0 이전): XOR 기반 "암호화"(실제 암호화 기술이 아님)
- **현재**: 적절한 IV 및 인증 태그를 사용하는 AES-256-GCM

마이그레이션 헬퍼는 레거시 형식을 감지하고 처음 읽을 때 새로운 방식으로 다시 암호화합니다. 따라서 자격 증명을 잃지 않고 이전 데이터베이스를 업그레이드할 수 있습니다.

---

## 읽기 캐시

자주 읽는 데이터(모델, 공급자, 설정)를 위해 `readCache.ts`는 **인메모리 캐시**를 제공합니다.

```ts
// 시작 시 캐시되며 쓰기 시 무효화됨
const providers = await getCachedProviders(); // 빠름, 인메모리
const fresh = await listProviders(); // 느림, DB에 접근
```

| 캐시된 엔터티          | 캐시 키        | TTL         |
| ---------------------- | -------------- | ----------- |
| `models`               | `models:v1`    | 쓰기 전까지 |
| `provider_connections` | `providers:v1` | 쓰기 전까지 |
| `settings`             | `settings:v1`  | 쓰기 전까지 |
| `combos`               | `combos:v1`    | 쓰기 전까지 |

해당 테이블에 쓰기가 발생할 때마다 캐시가 무효화됩니다.

---

## 백업 및 복구

### 수동 백업

```bash
# CLI를 사용하여 로컬 백업 생성
omniroute backup create --name pre-migration

# 또는 API를 통해 생성
curl -X PUT http://localhost:20128/api/db-backups \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

백업 파일에는 다음 항목이 포함됩니다.

- 모든 DB 테이블(JSON으로 직렬화)
- 호출 로그 아티팩트(base64로 인코딩, 선택 사항)
- 설정 + 비밀 정보(암호화됨)
- 플러그인 구성

### 복원

```bash
# CLI를 통해 복원
omniroute restore pre-migration

# API를 통해 복원
curl -X POST http://localhost:20128/api/db-backups/restore \
  -H "Authorization: Bearer $MANAGEMENT_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "pre-migration"}'
```

> **경고**: 복원하면 전체 DB를 덮어씁니다. 먼저 모든 클라이언트를 중지하세요.

### 자동 백업

```bash
# CLI를 통해 자동 일일 백업 활성화
omniroute backup auto enable --cron "0 2 * * *" --retention 7
```

이 일정은 기본적으로 30초마다 실행되는 백그라운드 작업에 의해 서버 측에서 실행되며,
로컬 서버 시간을 기준으로 cron 표현식을 평가합니다.

| 변수                                        | 기본값  | 설명                                                                                                               |
| ------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| `OMNIROUTE_BACKUP_SCHEDULE_JOB_INTERVAL_MS` | `30000` | 밀리초 단위의 실행 간격(최소 `5000`). cron과 일치하는 분 내에 안정적으로 실행되도록 하려면 60초보다 짧아야 합니다. |

### SQLite 핫 백업

실행 중인 DB를 다운타임 없이 백업하려면 다음 명령을 사용합니다.

```bash
sqlite3 ~/.omniroute/storage.sqlite ".backup /backups/omniroute-hot.db"
```

이 명령은 SQLite의 온라인 백업 API를 사용하므로 OmniRoute가 실행 중인 동안에도 안전하게 실행할 수 있습니다.

---

## 성능 튜닝

### WAL 모드

WAL은 기본적으로 활성화되어 있습니다. 쓰기 작업이 많은 워크로드에서는 다음을 고려하세요.

```sql
PRAGMA wal_autocheckpoint = 1000;  -- 1000페이지마다 체크포인트 실행
PRAGMA journal_size_limit = 67108864;  -- WAL 한도를 64MB로 설정
```

### 인덱스

성능을 위한 주요 인덱스(마이그레이션에서 자동 생성됨):

- `idx_models_provider` — 제공자별 모델 조회
- `idx_combo_targets_combo_id` — 콤보 대상 확장
- `idx_usage_history_api_key_timestamp` — 사용량 분석
- `idx_quota_snapshots_api_key_window` — 할당량 추적
- `idx_call_logs_timestamp` — 호출 로그 쿼리

새 인덱스를 추가하려면 마이그레이션을 생성하세요.

```sql
-- 023_add_my_index.sql
CREATE INDEX IF NOT EXISTS idx_my_table_my_column ON my_table(my_column);
```

### 메모리 매핑 I/O

매우 큰 데이터베이스(>10GB)의 경우 SQLite pragma를 통해 메모리 매핑을 조정할 수 있습니다.

```sql
-- SQLite pragma를 통해 설정(core.ts 또는 런타임에서 조정)
PRAGMA mmap_size = 268435456;  -- 256MB
```

### 압축

장기간 실행되는 OmniRoute 인스턴스에는 가끔 `VACUUM`을 실행하는 것이 좋습니다.

```bash
sqlite3 ~/.omniroute/storage.sqlite "VACUUM;"
```

트래픽이 적은 시간대에 매월 실행하세요. (WAL 모드는 필요성을 줄여 주지만 완전히 없애지는 않습니다.)

---

## 상태 확인

`src/lib/db/healthCheck.ts`는 **DB 수준의 상태 진단**을 제공합니다.

두 메서드 모두 인증이 필요하며, 인증되지 않으면 `401`을 반환합니다. `GET`은 진단만 수행하고, `POST`는
`autoRepair`가 활성화된 상태로 동일한 검사를 실행합니다.

```bash
GET  /api/db/health   # 진단
POST /api/db/health   # 진단 + 복구
```

응답은 `runDbHealthCheck()`가 생성한 `DbHealthCheckResult`입니다
(`src/lib/db/healthCheck.ts`).

```json
{
  "isHealthy": false,
  "issues": [
    {
      "type": "broken_reference",
      "table": "domain_budgets",
      "description": "도메인 예산이 더 이상 존재하지 않는 API 키를 참조했습니다.",
      "count": 2
    }
  ],
  "repairedCount": 0,
  "backupCreated": false,
  "autoRepair": false,
  "checkedAt": "2026-08-18T09:00:00.000Z",
  "driver": { "name": "better-sqlite3", "degraded": false }
}
```

| 필드              | 의미                                                                                                                                                              |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `isHealthy`       | `issues`가 비어 있으면 `true`입니다. `driver`는 이 값에 영향을 주지 않습니다.                                                                                     |
| `issues[].type`   | `integrity_check_failed`, `broken_reference`, `stale_snapshot`, `invalid_state` 중 하나입니다.                                                                    |
| `repairedCount`   | 이번 실행 중 복구된 행의 수입니다. `autoRepair`가 false이면 항상 `0`입니다.                                                                                       |
| `backupCreated`   | 복구 전에 백업이 생성되었는지를 나타냅니다.                                                                                                                       |
| `checkedAt`       | 실행 및 실행 중 작성된 모든 복구 메모에서 공유되는 ISO 타임스탬프입니다.                                                                                          |
| `driver.name`     | 검사된 데이터베이스를 제공하는 SQLite 드라이버입니다.                                                                                                             |
| `driver.degraded` | 쓰기가 데이터베이스 파일에 영구적으로 저장되지 않는 경우 `true`입니다. 즉, `sql.js` WASM 폴백(전체 파일 영속성) 또는 인메모리 데이터베이스를 사용하는 경우입니다. |

`omniroute_db_health_check` MCP 도구에서도 동일한 페이로드가 반환됩니다.

손상을 감지하려면 `PRAGMA integrity_check`를 실행하세요.

```bash
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA integrity_check;"
# 다음과 같이 출력되어야 함: ok
```

`ok` 이외의 값이 반환되면 **즉시 데이터베이스 사용을 중단**하고 백업에서 복원하세요.

---

## 재해 복구

### 시나리오 1: WAL 파일 유실

`-wal` 파일이 없지만 `-shm`과 기본 DB는 온전한 경우:

```bash
# 다음에 열 때 자동으로 복구됨
omniroute
```

SQLite가 자동 복구하지 못하는 경우:

```bash
sqlite3 ~/.omniroute/storage.sqlite ".recover" > recovered.sql
sqlite3 recovered.db < recovered.sql
mv recovered.db ~/.omniroute/storage.sqlite
```

### 시나리오 2: 기본 DB 파일 손상

백업에서 복원합니다:

```bash
omniroute sync pull --merge   # 또는: omniroute backup restore <backup-id>
```

### 시나리오 3: 암호화 키 유실

키가 없으면 **복구할 수 없습니다**. 암호화된 필드는 읽을 수 없습니다. 새 자격 증명을 사용하여 모든 공급자를 수동으로 다시 추가하세요.

> **완화 조치**: 암호화 키는 항상 별도로 백업하세요. 암호 관리자나 KMS에 저장하는 것이 가장 좋습니다.

### 시나리오 4: 디스크 공간 부족

SQLite는 `SQLITE_FULL` 오류를 반환합니다. 디스크 공간을 확보한 후 다음을 실행하세요:

```bash
# 공간을 확보하기 위해 WAL 체크포인트 실행
sqlite3 ~/.omniroute/storage.sqlite "PRAGMA wal_checkpoint(TRUNCATE);"
```

---

## 일반 작업

### 테이블 검사

```bash
sqlite3 ~/.omniroute/storage.sqlite "SELECT * FROM api_keys LIMIT 5;"
```

### 모든 테이블의 행 수 확인

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';
EOF
```

### 모든 데이터 초기화(삭제)

```bash
# 먼저 OmniRoute 중지
omniroute stop

# DB 파일 삭제
rm ~/.omniroute/storage.sqlite*

# 다시 시작(빈 DB가 다시 생성됨)
omniroute
```

**선택적** 초기화(공급자는 유지하고 사용량 데이터만 삭제):

```bash
DELETE FROM usage_history WHERE timestamp < datetime('now', '-30 day');
DELETE FROM call_logs WHERE timestamp < datetime('now', '-30 day');
DELETE FROM proxy_logs WHERE timestamp < datetime('now', '-30 day');
```

### 단일 테이블 내보내기

```bash
sqlite3 ~/.omniroute/storage.sqlite <<EOF
.mode csv
.output api_keys.csv
SELECT * FROM api_keys;
EOF
```

---

## 문제 해결

### "데이터베이스가 잠겨 있습니다"

다른 프로세스가 쓰기 잠금을 유지하고 있습니다. 다음 방법 중 하나를 사용하세요:

- 다른 프로세스가 완료될 때까지 기다립니다(`lsof | grep storage.sqlite`로 확인)
- 다른 프로세스를 종료합니다
- 문제가 지속되면 OmniRoute를 다시 시작합니다

### "외래 키 제약 조건을 위반했습니다"

도메인 모듈이 참조 무결성을 위반하고 있습니다. 다음 사항을 확인하세요:

- 종속 테이블의 고아 행
- 전파되지 않은 연쇄 삭제
- 최근 마이그레이션에서 변경된 외래 키

위반 사항을 찾으려면 `PRAGMA foreign_key_check;`를 실행하세요.

### "메모리 부족"

SQLite의 메모리 매핑 I/O가 OS 제한을 초과하고 있습니다. SQLite pragma를 사용하여 크기를 줄이세요:

```sql
PRAGMA mmap_size = 134217728;  -- 256MB 대신 128MB
```

또는 비활성화하세요:

```sql
PRAGMA mmap_size = 0;
```

### "마이그레이션이 도중에 실패했습니다"

마이그레이션은 트랜잭션 내에서 실행되었으므로 롤백되었어야 합니다. 롤백되지 않았다면 다음을 수행하세요:

1. **OmniRoute 중지**(추가 시도 방지)
2. `sqlite3`로 **DB 상태 확인**
3. 부분적으로 적용된 마이그레이션을 **수동으로 수정**
4. OmniRoute를 **다시 실행**(마이그레이션이 재시도됨)

이 문제를 방지하려면 항상 복사본에서 마이그레이션을 먼저 테스트하세요.

---

## 관련 문서

- [USAGE_QUOTA_GUIDE.md](../guides/USAGE_QUOTA_GUIDE.md) — 사용량 테이블
- [MONITORING_GUIDE.md](./MONITORING_GUIDE.md) — 상태 모니터링
- [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) — 릴리스 흐름
- 소스: `src/lib/db/` (80개 이상의 파일, 약 25K LOC)
