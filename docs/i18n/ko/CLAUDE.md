# CLAUDE.md (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

이 파일은 이 리포지토리에서 코드를 작업할 때 Claude Code (claude.ai/code)에 대한 지침을 제공합니다.

## 빠른 시작

```bash
npm install                    # 의존성 설치 (.env.example에서 .env 자동 생성)
npm run dev                    # http://localhost:20128에서 개발 서버 실행
npm run build                  # 프로덕션 빌드 (Next.js 16 독립형)
npm run lint                   # ESLint (0 오류 예상; 경고는 기존)
npm run typecheck:core         # TypeScript 검사 (깨끗해야 함)
npm run typecheck:noimplicit:core  # 엄격 검사 (암시적 any 없음)
npm run test:coverage          # 단위 테스트 + 커버리지 게이트 (75/75/75/70 — 문장/라인/함수/브랜치)
npm run check                  # lint + 테스트 결합
npm run check:cycles           # 순환 의존성 감지
```

### 테스트 실행

```bash
# 단일 테스트 파일 (Node.js 기본 테스트 러너 — 대부분의 테스트)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP 서버, autoCombo, 캐시)
npm run test:vitest

# 모든 테스트 스위트
npm run test:all
```

전체 테스트 매트릭스는 `CONTRIBUTING.md` → "테스트 실행"을 참조하세요. 심층 아키텍처는 `AGENTS.md`를 참조하세요.

---

## 프로젝트 개요

**OmniRoute** — 통합 AI 프록시/라우터. 하나의 엔드포인트, 160개 이상의 LLM 제공자, 자동 대체.

| 레이어       | 위치                    | 목적                                                                |
| ------------ | ----------------------- | ------------------------------------------------------------------- |
| API 라우트   | `src/app/api/v1/`       | Next.js 앱 라우터 — 진입점                                          |
| 핸들러       | `open-sse/handlers/`    | 요청 처리 (채팅, 임베딩 등)                                         |
| 실행기       | `open-sse/executors/`   | 제공자별 HTTP 디스패치                                              |
| 변환기       | `open-sse/translator/`  | 형식 변환 (OpenAI↔Claude↔Gemini)                                    |
| 변환기       | `open-sse/transformer/` | 응답 API ↔ 채팅 완성                                                |
| 서비스       | `open-sse/services/`    | 조합 라우팅, 속도 제한, 캐싱 등                                     |
| 데이터베이스 | `src/lib/db/`           | SQLite 도메인 모듈 (45개 이상의 파일, 55개 마이그레이션)            |
| 도메인/정책  | `src/domain/`           | 정책 엔진, 비용 규칙, 대체 논리                                     |
| MCP 서버     | `open-sse/mcp-server/`  | 37개 도구 (30개 기본 + 3개 메모리 + 4개 기술), 3개 전송, ~13개 범위 |
| A2A 서버     | `src/lib/a2a/`          | JSON-RPC 2.0 에이전트 프로토콜                                      |
| 기술         | `src/lib/skills/`       | 확장 가능한 기술 프레임워크                                         |
| 메모리       | `src/lib/memory/`       | 지속적인 대화형 메모리                                              |

모노레포: `src/` (Next.js 16 앱), `open-sse/` (스트리밍 엔진 작업 공간), `electron/` (데스크탑 앱), `tests/`, `bin/` (CLI 진입점).

---

## 요청 파이프라인

```
클라이언트 → /v1/chat/completions (Next.js 경로)
  → CORS → Zod 검증 → 인증? → 정책 확인 → 프롬프트 주입 방지
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → 캐시 확인 → 속도 제한 → 콤보 라우팅?
      → resolveComboTargets() → 각 타겟에 대해 handleSingleModel() 호출
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() 업스트림 → 백오프와 함께 재시도
    → 응답 번역 → SSE 스트림 또는 JSON
    → 응답 API인 경우: responsesTransformer.ts TransformStream
```

API 경로는 일관된 패턴을 따릅니다: `경로 → CORS 사전 비행 → Zod 본문 검증 → 선택적 인증 (extractApiKey/isValidApiKey) → API 키 정책 시행 → 핸들러 위임 (open-sse)`. 전역 Next.js 미들웨어는 없습니다 — 가로채기는 경로별로 특정합니다.

**콤보 라우팅** (`open-sse/services/combo.ts`): 14가지 전략 (우선순위, 가중치, 먼저 채우기, 라운드 로빈, P2C, 랜덤, 가장 적게 사용된, 비용 최적화, 리셋 인식, 엄격한 랜덤, 자동, lkgp, 컨텍스트 최적화, 컨텍스트 릴레이). 각 타겟은 `handleSingleModel()`을 호출하여 `handleChatCore()`를 감싸고 각 타겟에 대한 오류 처리 및 회로 차단기 검사를 수행합니다. 9요소 자동 콤보 점수에 대한 내용은 `docs/routing/AUTO-COMBO.md`를 참조하고, 3개의 복원력 계층에 대한 내용은 `docs/architecture/RESILIENCE_GUIDE.md`를 참조하십시오.

---

## 복원력 런타임 상태

OmniRoute에는 세 가지 관련 있지만 구별되는 임시 실패 메커니즘이 있습니다. 라우팅 동작을 디버깅할 때 그 범위를 분리하십시오. 한눈에 볼 수 있는 맵은 [3계층 복원력 다이어그램](./docs/diagrams/exported/resilience-3layers.svg)에서 확인할 수 있습니다 (출처: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd)).

### 공급자 회로 차단기

**범위**: 전체 공급자, 예: `glm`, `openai`, `anthropic`.

**목적**: 업스트림/서비스 수준에서 반복적으로 실패하는 공급자에게 트래픽을 보내는 것을 중지하여, 하나의 불건전한 공급자가 모든 요청을 지연시키지 않도록 합니다.

**구현**:

- 핵심 클래스: `src/shared/utils/circuitBreaker.ts`
- 채팅 게이트/실행 배선: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- 런타임 상태 API: `src/app/api/monitoring/health/route.ts`
- 공유 래퍼: `open-sse/services/accountFallback.ts`
- 지속 상태 테이블: `domain_circuit_breakers`

**상태**:

- `CLOSED`: 정상 트래픽이 허용됩니다.
- `OPEN`: 공급자가 일시적으로 차단됨; 호출자는 공급자 회로 열림 응답을 받거나 콤보 라우팅이 다른 타겟으로 건너뜁니다.
- `HALF_OPEN`: 리셋 타임아웃이 경과됨; 프로브 요청을 허용합니다. 성공하면 차단기가 닫히고, 실패하면 다시 열립니다.

**기본값** (`open-sse/config/constants.ts`):

- OAuth 공급자: 임계값 `3`, 리셋 타임아웃 `60s`.
- API 키 공급자: 임계값 `5`, 리셋 타임아웃 `30s`.
- 로컬 공급자: 임계값 `2`, 리셋 타임아웃 `15s`.

공급자 수준의 실패 상태만이 공급자 차단기를 작동시켜야 합니다:

```ts
(408, 500, 502, 503, 504);
```

정상 계정/키/모델 오류인 대부분의 `401`, `403`, 또는 `429` 사례에 대해 전체 공급자 차단기를 작동시키지 마십시오. 이러한 오류는 일반적으로 연결 쿨다운 또는 모델 잠금에 해당합니다. 일반적인 API 키 공급자의 `403`은 회복 가능해야 하며, 단말 공급자/계정 오류로 분류되지 않는 한 회복 가능해야 합니다.

차단기는 지연 회복을 사용하며, 백그라운드 타이머를 사용하지 않습니다. `OPEN`이 만료되면 `getStatus()`, `canExecute()`, 및 `getRetryAfterMs()`와 같은 읽기 작업이 상태를 `HALF_OPEN`으로 새로 고쳐 대시보드와 콤보 후보 빌더가 만료된 공급자를 영구적으로 제외하지 않도록 합니다.

### 연결 쿨다운

**범위**: 하나의 공급자 연결/계정/키.

**목적**: 동일한 공급자에 대한 다른 연결이 요청을 계속 처리할 수 있도록 하면서 하나의 불량 키/계정을 일시적으로 건너뜁니다.

**구현**:

- 쓰기/업데이트 경로: `src/sse/services/auth.ts::markAccountUnavailable()`
- 계정 선택/필터링: `src/sse/services/auth.ts::getProviderCredentials...`
- 쿨다운 계산: `open-sse/services/accountFallback.ts::checkFallbackError()`
- 설정: `src/lib/resilience/settings.ts`

공급자 연결의 중요한 필드:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

계정 선택 중, 연결은 다음과 같은 경우 건너뜁니다:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

쿨다운도 지연됩니다: `rateLimitedUntil`이 과거에 있을 때, 연결은 다시 적격이 됩니다. 성공적으로 사용되면 `clearAccountError()`가 `testStatus`, `rateLimitedUntil`, 오류 필드 및 `backoffLevel`을 지웁니다.

기본 연결 쿨다운 동작:

- OAuth 기본 쿨다운: `5s`.
- API 키 기본 쿨다운: `3s`.
- API 키 `429`는 가능한 경우 업스트림 재시도 힌트 (`Retry-After`, 리셋 헤더 또는 구문 분석 가능한 리셋 텍스트)를 선호해야 합니다.
- 반복 가능한 실패는 지수 백오프를 사용합니다:

```ts
baseCooldownMs * 2 ** failureIndex;
```

안티 썬더링 허드 가드는 동일한 연결에서 동시 실패가 쿨다운을 반복적으로 연장하거나 `backoffLevel`을 두 번 증가시키는 것을 방지합니다.

단말 상태는 쿨다운이 아닙니다. `banned`, `expired`, 및 `credits_exhausted`는 자격 증명/설정이 변경되거나 운영자가 재설정할 때까지 사용 불가능 상태로 유지되도록 설계되었습니다. 단기 쿨다운 상태로 단말 상태를 덮어쓰지 마십시오.

### 모델 잠금

**범위**: 공급자 + 연결 + 모델.

**목적**: 하나의 모델이 사용할 수 없거나 해당 연결에 대한 할당량이 제한된 경우 전체 연결을 비활성화하지 않도록 합니다.

예시:

- 모델별 할당량 공급자가 `429`를 반환하는 경우.
- 로컬 공급자가 하나의 누락된 모델에 대해 `404`를 반환하는 경우.
- 선택된 Grok 모드와 같은 공급자 특정 모드/모델 권한 실패.

모델 잠금은 `open-sse/services/accountFallback.ts`에 있으며 동일한 연결이 다른 모델을 계속 제공할 수 있도록 합니다.

### 디버깅 가이드

- 공급자에 대한 모든 키가 건너뛰어지면 공급자 차단기 상태와 각 연결의 `rateLimitedUntil`/`testStatus`를 검사하십시오.
- 리셋 창 후 공급자가 영구적으로 제외된 것처럼 보이면 코드가 `getStatus()`/`canExecute()` 대신 원시 `state`를 읽고 있는지 확인하십시오.
- 하나의 공급자 키가 실패하지만 다른 키는 작동해야 하는 경우 공급자 차단기보다 연결 쿨다운을 선호하십시오.
- 하나의 모델만 실패하는 경우 연결 쿨다운보다 모델 잠금을 선호하십시오.
- 상태가 자동으로 회복되어야 하는 경우 미래의 타임스탬프/리셋 타임아웃과 만료된 상태를 새로 고치는 읽기 경로가 있어야 합니다. 영구 상태는 수동 자격 증명 또는 구성 변경이 필요합니다.

## 주요 규칙

### 코드 스타일

- **2 공백**, 세미콜론, 더블 쿼트, 100자 너비, es5 후행 쉼표 (lint-staged를 통해 Prettier로 강제)
- **임포트**: 외부 → 내부 (`@/`, `@omniroute/open-sse`) → 상대
- **명명**: 파일=camelCase/kebab, 컴포넌트=PascalCase, 상수=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = 모든 곳에서 오류; `no-explicit-any` = `open-sse/` 및 `tests/`에서 경고
- **TypeScript**: `strict: false`, 타겟 ES2022, 모듈 esnext, 해상도 번들러. 명시적 타입을 선호.

### 데이터베이스

- **항상** `src/lib/db/` 도메인 모듈을 통해 진행 — **절대** 라우트나 핸들러에서 원시 SQL을 작성하지 마세요.
- **절대** `src/lib/localDb.ts`에 로직을 추가하지 마세요 (재수출 레이어만).
- **절대** `localDb.ts`에서 배럴 임포트를 하지 마세요 — 대신 특정 `db/` 모듈을 임포트하세요.
- DB 싱글톤: `src/lib/db/core.ts`의 `getDbInstance()` (WAL 저널링)
- 마이그레이션: `src/lib/db/migrations/` — 버전 관리된 SQL 파일, 멱등성, 트랜잭션 내에서 실행

### 오류 처리

- 특정 오류 유형으로 try/catch, pino 컨텍스트로 로깅
- SSE 스트림에서 오류를 삼키지 마세요 — 정리를 위해 중단 신호를 사용하세요.
- 적절한 HTTP 상태 코드 반환 (4xx/5xx)

### 보안

- **절대** `eval()`, `new Function()`, 또는 암시적 eval을 사용하지 마세요.
- 모든 입력을 Zod 스키마로 검증하세요.
- 자격 증명을 저장할 때 암호화하세요 (AES-256-GCM).
- 업스트림 헤더 거부 목록: `src/shared/constants/upstreamHeaders.ts` — 편집 시 sanitize, Zod 스키마 및 단위 테스트를 일치시키세요.
- **공개 업스트림 자격 증명** (Gemini/Antigravity/Windsurf 스타일 OAuth client_id/secret + 공개 CLI에서 추출한 Firebase 웹 키): **반드시** `open-sse/utils/publicCreds.ts`의 `resolvePublicCred()`를 통해 삽입해야 하며 — **절대** 문자열 리터럴로 사용하지 마세요. 필수 패턴은 `docs/security/PUBLIC_CREDS.md`를 참조하세요.
- **오류 응답** (HTTP / SSE / 실행기 / MCP 핸들러): **반드시** `open-sse/utils/error.ts`의 `buildErrorBody()` 또는 `sanitizeErrorMessage()`를 통해 라우팅해야 하며 — **절대** 원시 `err.stack` 또는 `err.message`를 응답 본문에 넣지 마세요. `docs/security/ERROR_SANITIZATION.md`를 참조하세요.
- **변수로부터 생성된 셸 명령**: `exec()`/`spawn()`을 호출할 때 런타임 값이 필요한 스크립트는 `env` 옵션을 통해 전달하세요 (자동으로 셸 이스케이프됨) — **절대** 신뢰할 수 없는/외부 경로를 스크립트 본문에 문자열 보간하지 마세요. 참조: `src/mitm/cert/install.ts::updateNssDatabases`.
- **기본적으로 보안이 강화된 라이브러리** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): 새로운 보안 민감한 표면을 추가할 때는 사용자 정의 구현보다 Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink을 선호하세요.

---

## 일반 수정 시나리오

### 새로운 제공자 추가

1. `src/shared/constants/providers.ts`에 등록 (로드 시 Zod 검증)
2. 사용자 정의 로직이 필요한 경우 `open-sse/executors/`에 실행기 추가 (기본 실행기 확장)
3. 비 OpenAI 형식인 경우 `open-sse/translator/`에 변환기 추가
4. OAuth 기반인 경우 `src/lib/oauth/constants/oauth.ts`에 OAuth 구성 추가 — 업스트림 CLI가 공개 client_id/secret을 제공하는 경우 `resolvePublicCred()`를 통해 삽입 (참조: `docs/security/PUBLIC_CREDS.md`), **절대** 리터럴로 사용하지 마세요.
5. `open-sse/config/providerRegistry.ts`에 모델 등록
6. `tests/unit/`에 테스트 작성 (새로 추가한 기본값이 포함된 경우 publicCreds 형태 단언 포함)

### 새로운 API 경로 추가

1. `src/app/api/v1/your-route/` 아래에 디렉토리 생성
2. `GET`/`POST` 핸들러가 있는 `route.ts` 생성
3. 패턴 따르기: CORS → Zod 본문 검증 → 선택적 인증 → 핸들러 위임
4. 핸들러는 `open-sse/handlers/`에 위치 (거기서 임포트, 인라인 아님)
5. 오류 응답은 `open-sse/utils/error.ts`의 `buildErrorBody()` / `errorResponse()`를 사용 (자동으로 정리됨 — 본문에 `err.stack` 또는 `err.message`를 원시로 넣지 마세요). `docs/security/ERROR_SANITIZATION.md`를 참조하세요.
6. 테스트 추가 — 오류 응답이 스택 추적을 누출하지 않는다는 단언을 포함 (예: `!body.error.message.includes("at /")`)

### 새로운 DB 모듈 추가

1. `src/lib/db/yourModule.ts` 생성 — `./core.ts`에서 `getDbInstance` 임포트
2. 도메인 테이블에 대한 CRUD 함수 내보내기
3. 새로운 테이블이 필요한 경우 `src/lib/db/migrations/`에 마이그레이션 추가
4. `src/lib/localDb.ts`에서 재수출 (재수출 목록에만 추가)
5. 테스트 작성

### 새로운 MCP 도구 추가

1. Zod 입력 스키마 + 비동기 핸들러와 함께 `open-sse/mcp-server/tools/`에 도구 정의 추가
2. 도구 세트에 등록 (createMcpServer()에 의해 연결됨)
3. 적절한 범위에 할당
4. 테스트 작성 (도구 호출은 `mcp_audit` 테이블에 기록됨)

### 새로운 A2A 기술 추가

1. `src/lib/a2a/skills/`에 기술 생성 (이미 5개 존재: smart-routing, quota-management, provider-discovery, cost-analysis, health-report)
2. 기술은 작업 컨텍스트 (메시지, 메타데이터)를 수신 → 구조화된 결과 반환
3. `src/lib/a2a/taskExecution.ts`의 `A2A_SKILL_HANDLERS`에 등록
4. `src/app/.well-known/agent.json/route.ts`에 노출 (에이전트 카드)
5. `tests/unit/`에 테스트 작성
6. `docs/frameworks/A2A-SERVER.md` 기술 테이블에 문서화

### 새로운 클라우드 에이전트 추가

1. `src/lib/cloudAgent/agents/`에 `CloudAgentBase`를 확장하는 에이전트 클래스 생성 (이미 3개 존재: codex-cloud, devin, jules)
2. `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources` 구현
3. `src/lib/cloudAgent/registry.ts`에 등록
4. 필요한 경우 OAuth/자격 증명 처리 추가 (`src/lib/oauth/providers/`)
5. 테스트 + `docs/frameworks/CLOUD_AGENT.md`에 문서화

### 새로운 가드레일 / Eval / 기술 / 웹훅 이벤트 추가

- 가드레일: `src/lib/guardrails/` → 문서: `docs/security/GUARDRAILS.md`
- Eval 스위트: `src/lib/evals/` → 문서: `docs/frameworks/EVALS.md`
- 기술 (샌드박스): `src/lib/skills/` → 문서: `docs/frameworks/SKILLS.md`
- 웹훅 이벤트: `src/lib/webhookDispatcher.ts` → 문서: `docs/frameworks/WEBHOOKS.md`

## 참조 문서

비트리비얼 변경 사항에 대해서는 먼저 해당 심층 분석을 읽으십시오:

| 영역                                     | 문서                                                              |
| ---------------------------------------- | ----------------------------------------------------------------- |
| 저장소 탐색                              | `docs/architecture/REPOSITORY_MAP.md`                             |
| 아키텍처                                 | `docs/architecture/ARCHITECTURE.md`                               |
| 엔지니어링 참조                          | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| 자동 조합 (9-팩터 점수, 14 전략)         | `docs/routing/AUTO-COMBO.md`                                      |
| 복원력 (3 가지 메커니즘)                 | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| 추론 재생                                | `docs/routing/REASONING_REPLAY.md`                                |
| 기술 프레임워크                          | `docs/frameworks/SKILLS.md`                                       |
| 메모리 시스템 (FTS5 + Qdrant)            | `docs/frameworks/MEMORY.md`                                       |
| 클라우드 에이전트                        | `docs/frameworks/CLOUD_AGENT.md`                                  |
| 가드레일 (PII / 주입 / 비전)             | `docs/security/GUARDRAILS.md`                                     |
| 공개 업스트림 자격 증명 (Gemini 등)      | `docs/security/PUBLIC_CREDS.md`                                   |
| 오류 메시지 정화                         | `docs/security/ERROR_SANITIZATION.md`                             |
| 평가                                     | `docs/frameworks/EVALS.md`                                        |
| 준수 / 감사                              | `docs/security/COMPLIANCE.md`                                     |
| 웹후크                                   | `docs/frameworks/WEBHOOKS.md`                                     |
| 권한 부여 파이프라인                     | `docs/architecture/AUTHZ_GUIDE.md`                                |
| 스텔스 (TLS / 지문)                      | `docs/security/STEALTH_GUIDE.md`                                  |
| 에이전트 프로토콜 (A2A / ACP / 클라우드) | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP 서버                                 | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A 서버                                 | `docs/frameworks/A2A-SERVER.md`                                   |
| API 참조 + OpenAPI                       | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| 공급자 카탈로그 (자동 생성)              | `docs/reference/PROVIDER_REFERENCE.md`                            |
| 릴리스 흐름                              | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## 테스트

| 항목                    | 명령어                                                        |
| ----------------------- | ------------------------------------------------------------- |
| 단위 테스트             | `npm run test:unit`                                           |
| 단일 파일               | `node --import tsx/esm --test tests/unit/file.test.ts`        |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                         |
| E2E (Playwright)        | `npm run test:e2e`                                            |
| 프로토콜 E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                  |
| 생태계                  | `npm run test:ecosystem`                                      |
| 커버리지 게이트         | `npm run test:coverage` (75/75/75/70 — 문장/라인/함수/브랜치) |
| 커버리지 보고서         | `npm run coverage:report`                                     |

**PR 규칙**: `src/`, `open-sse/`, `electron/`, 또는 `bin/`의 프로덕션 코드를 변경하는 경우, 동일한 PR에 테스트를 포함하거나 업데이트해야 합니다.

**테스트 레이어 선호도**: 단위 테스트 먼저 → 통합 (다중 모듈 또는 DB 상태) → e2e (UI/워크플로우 전용). 버그 재현을 수정 전이나 동시에 자동화된 테스트로 인코딩합니다.

**Copilot 커버리지 정책**: PR이 프로덕션 코드를 변경하고 커버리지가 75% (문장/라인/함수) 미만이거나 70% (브랜치) 미만인 경우, 단순히 보고하지 말고 테스트를 추가하거나 업데이트하고, 커버리지 게이트를 다시 실행한 후 확인을 요청합니다. 실행한 명령어, 변경된 테스트 파일 및 최종 커버리지 결과를 PR 보고서에 포함합니다.

---

## Git 워크플로우

```bash
# main에 직접 커밋하지 마세요
git checkout -b feat/your-feature
git commit -m "feat: 변경 사항 설명"
git push -u origin feat/your-feature
```

**브랜치 접두사**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**커밋 형식** (Conventional Commits): `feat(db): 회로 차단기 추가` — 범위: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky 훅**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## 환경

- **런타임**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES 모듈
- **TypeScript**: 5.9+, 대상 ES2022, 모듈 esnext, 해상도 번들러
- **경로 별칭**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **기본 포트**: 20128 (API + 대시보드 동일 포트)
- **데이터 디렉토리**: `DATA_DIR` 환경 변수, 기본값 `~/.omniroute/`
- **주요 환경 변수**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- 설정: `cp .env.example .env` 후 `JWT_SECRET` (`openssl rand -base64 48`) 및 `API_KEY_SECRET` (`openssl rand -hex 32`) 생성

---

## 엄격한 규칙

1. 비밀이나 자격 증명을 커밋하지 마세요
2. `localDb.ts`에 로직을 추가하지 마세요
3. `eval()` / `new Function()` / 암시적 eval을 사용하지 마세요
4. `main`에 직접 커밋하지 마세요
5. 라우트에 원시 SQL을 작성하지 마세요 — `src/lib/db/` 모듈을 사용하세요
6. SSE 스트림에서 오류를 조용히 무시하지 마세요
7. 항상 Zod 스키마로 입력을 검증하세요
8. 프로덕션 코드를 변경할 때 항상 테스트를 포함하세요
9. 커버리지는 ≥75% (문장, 라인, 함수) / ≥70% (브랜치)를 유지해야 합니다. 현재 측정: ~82%.
10. 명시적인 운영자 승인 없이 Husky 훅을 우회하지 마세요 (`--no-verify`, `--no-gpg-sign`).
11. 공개 업스트림 OAuth client_id/secret 또는 Firebase Web 키를 문자열 리터럴로 포함하지 마세요 — 항상 `resolvePublicCred()`를 통해 진행하세요 (`open-sse/utils/publicCreds.ts`). `docs/security/PUBLIC_CREDS.md`를 참조하세요.
12. HTTP / SSE / 실행자 응답에서 원시 `err.stack` / `err.message`를 반환하지 마세요 — 항상 `buildErrorBody()` 또는 `sanitizeErrorMessage()`를 통해 라우팅하세요 (`open-sse/utils/error.ts`). `docs/security/ERROR_SANITIZATION.md`를 참조하세요.
13. `exec()`/`spawn()`에 전달되는 셸 스크립트에 외부 경로 또는 런타임 값을 문자열 보간하지 마세요 — 대신 `env` 옵션을 통해 전달하세요. 참조: `src/mitm/cert/install.ts::updateNssDatabases`.
14. CodeQL / 비밀 스캔 경고를 무시하지 마세요 (a) 먼저 위의 패턴 문서를 확인하여 도우미가 적용되는지 확인하고, (b) 무시 댓글에 기술적 정당성을 기록하세요. 선례: `js/stack-trace-exposure`는 이미 `sanitizeErrorMessage()`를 통해 라우팅되는 호출 지점에서 발생하며, 이는 알려진 CodeQL 제한입니다 (사용자 정의 정리기가 인식되지 않음) — `docs/security/ERROR_SANITIZATION.md`를 참조하여 `false positive`로 무시하세요.
15. 자식 프로세스를 생성하는 경로 (`/api/mcp/`, `/api/cli-tools/runtime/`)를 `src/server/authz/routeGuard.ts`에서 `isLocalOnlyPath()` 분류 없이 노출하지 마세요. 루프백 강제 적용은 모든 인증 검사 전에 무조건 발생합니다 — 터널을 통해 유출된 JWT는 프로세스 생성을 트리거할 수 없습니다. `docs/security/ROUTE_GUARD_TIERS.md`를 참조하세요.
16. AI 어시스턴트, LLM 또는 자동화 계정을 인정하는 `Co-Authored-By` 트레일러를 커밋 메시지에 절대 포함하지 마세요 (예: "Claude", "GPT", "Copilot", "Bot"을 포함한 이름; `anthropic.com` / `openai.com` / 봇 소유 `noreply.github.com` 주소의 이메일). 이러한 트레일러는 GitHub에서 커밋 귀속을 봇 계정으로 라우팅하여 PR 기록에서 실제 작성자 (`diegosouzapw`)를 숨깁니다. 인간 협력자 — upstream PR 작성자와 OmniRoute로 이식되는 issue 보고자 포함 — 은 표준 `Co-authored-by: Name <email>` 트레일러로 인정될 수 있고 인정되어야 합니다; upstream-port 워크플로 (`/port-upstream-features`, `/port-upstream-issues`)는 이에 의존합니다.
