# Contributing to OmniRoute (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇧🇦 [bs](../bs/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## 개발 환경 설정

### 사전 요구 사항

- **Node.js** `>=22.22.3 <23` 또는 `>=24.0.0 <27`(권장: 24 LTS)
- **npm** 10+

> **npm v11+ 사용자(Node 24+):** `npm install` 실행 후 네이티브 모듈이 설치되었는지 확인하세요:
> `node -e "require('better-sqlite3')"`. `MODULE_NOT_FOUND` 오류가 발생하면
> `npm approve-scripts better-sqlite3 && npm install`을 실행하세요. 자세한 내용은
> [문제 해결](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)을 참조하세요.

- **Git**

### 복제 및 설치

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### 환경 변수

```bash
# 템플릿에서 .env 생성
cp .env.example .env

# 필수 시크릿 생성
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

개발을 위한 주요 변수:

| 변수                   | 개발 기본값              | 설명                 |
| ---------------------- | ------------------------ | -------------------- |
| `PORT`                 | `20128`                  | 서버 포트            |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | 프런트엔드 기본 URL  |
| `JWT_SECRET`           | (위에서 생성)            | JWT 서명 시크릿      |
| `INITIAL_PASSWORD`     | `CHANGEME`               | 최초 로그인 비밀번호 |
| `APP_LOG_LEVEL`        | `info`                   | 로그 상세 수준       |

### 대시보드 설정

대시보드는 환경 변수를 통해서도 구성할 수 있는 기능에 대한 UI 토글을 제공합니다:

| 설정 위치   | 토글               | 설명                        |
| ----------- | ------------------ | --------------------------- |
| 설정 → 고급 | 디버그 모드        | 디버그 요청 로그 활성화(UI) |
| 설정 → 일반 | 사이드바 표시 여부 | 사이드바 섹션 표시/숨기기   |

이 설정은 데이터베이스에 저장되며 재시작 후에도 유지됩니다. 설정된 경우 환경 변수 기본값보다 우선합니다.

### 로컬에서 실행

```bash
# 개발 모드(핫 리로드)
npm run dev

# 프로덕션 빌드
npm run build    # next build → .build/next/ 실행 후 assembleStandalone → dist/
npm run start

# 기여자 변경 사항을 위한 빠른 백엔드/API 전용 컴파일
npm run build:contributor

# 릴리스 빌드(클린 재빌드 + HEAD 센티널 — 배포에 필수)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA 기록

# 일반적인 포트 구성
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

기여자 빌드는 컴파일 전용 검증을 수행합니다. 독립 실행형 배포판을 구성하거나 선택적
네이티브 패키징 자산을 빌드하지 않습니다. 배포 가능한 번들을 검증해야 하는 경우에는
일반 프로덕션 빌드를 사용하세요.

### 빌드 출력 구조

| 디렉터리  | 내용                                                                  | 추적 여부 |
| --------- | --------------------------------------------------------------------- | --------- |
| `src/`    | 애플리케이션 소스(TypeScript / TSX)                                   | 예        |
| `.build/` | 중간 산출물 — `next build` 출력(gitignore됨, `distDir = .build/next`) | 아니요    |
| `dist/`   | 배포 가능한 번들 — `assembleStandalone`로 구성됨(gitignore됨)         | 아니요    |

빌드 파이프라인은 단일 패스로 진행됩니다:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js 출력)
  └─ assembleStandalone()                 (독립 실행형 파일 + 정적 파일 + public + 네이티브 자산 복사)
       └─ 출력: dist/                     (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release`는 먼저 두 디렉터리를 모두 정리하고, 배포 무결성 센티널로
`dist/BUILD_SHA`(= `git rev-parse --short HEAD`)를 추가로 기록합니다.

`npm run build:contributor`는 백엔드 전용 빌드 프로필을 사용합니다. 빌드하는 동안
대시보드 UI 파일을 임시 스텁으로 대체하고 API 라우트 핸들러는 유지하며 빌드 후 원본 파일을
복원합니다. 대시보드 UI에 영향을 주는 변경 사항이나 전체 릴리스 검증에는 `npm run build`를
사용하세요. 기여자 프로필은 릴리스 빌드를 대체하지 않습니다.

> **VPS 배포 참고:** 원격 이미지 디렉터리 `/usr/lib/node_modules/omniroute/app/`는
> 변경되지 않았습니다. 배포 스킬은 `dist/`의 내용을 이 디렉터리로 rsync합니다.
> 저장소 내부의 빌드 출력 경로만 이동했습니다(`app/` → `dist/`).

기본 URL:

- **대시보드**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git 워크플로

> ⚠️ **절대로 `main`에 직접 커밋하지 마세요.** 항상 기능 브랜치를 사용하세요.
>
> **PR 베이스:** `main`이 아니라 현재 활성화된 `release/vX.Y.Z` 브랜치를 대상으로 지정하세요.
> 브랜치별 릴리스 + 배포 시 태그 지정 모델에 대한 자세한 내용은
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md)를 참조하세요.

```bash
# 활성 릴리스의 최신 지점에서 브랜치 생성(예: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... 변경 사항 적용 ...
git commit -m "feat: 변경 사항 설명"
git push -u origin feat/your-feature-name
# base = release/v3.8.49로 Pull Request 열기
```

### 브랜치 명명 규칙

| 접두사      | 용도             |
| ----------- | ---------------- |
| `feat/`     | 새로운 기능      |
| `fix/`      | 버그 수정        |
| `refactor/` | 코드 구조 재구성 |
| `docs/`     | 문서 변경        |
| `test/`     | 테스트 추가/수정 |
| `chore/`    | 도구, CI, 종속성 |

### 커밋 메시지

[Conventional Commits](https://www.conventionalcommits.org/)를 따르세요.

```
feat: 공급자 호출에 서킷 브레이커 추가
fix: JWT 시크릿 검증의 엣지 케이스 해결
docs: PII 보호 내용을 SECURITY.md에 추가
test: 관측 가능성 단위 테스트 추가
refactor(db): 속도 제한 테이블 통합
```

스코프(v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## 테스트 실행

```bash
# 모든 테스트(unit + vitest + ecosystem + e2e)
npm run test:all

# 단일 테스트 파일(Node.js 네이티브 테스트 러너 — 대부분의 테스트에서 사용)
node --import tsx/esm --test tests/unit/your-file.test.ts

# 변경 사항의 영향을 받는 단위 테스트만 실행(CI 게이트와 동일한 TIA 선택기, #8084)
npm run test:scoped            # 마지막 커밋(또는 작업 트리)의 변경 사항
npm run test:scoped:staged     # 스테이징된 변경 사항만 — pre-commit 실행과 함께 사용하기 좋음
npm run test:scoped:full       # 먼저 import-graph 맵을 다시 빌드(파일 추가/이동 후)
# 종료 코드 1 + "전체 스위트를 실행하세요"는 허브 파일(tsconfig, package.json, …) 또는
# 매핑되지 않은 소스가 변경되었음을 의미함 — 선택기는 안전하게 실패하며 절대로 조용히 건너뛰지 않음.

# Vitest(MCP 서버, autoCombo, 캐시)
npm run test:vitest

# E2E 테스트(Playwright 필요)
npm run test:e2e

# 프로토콜 클라이언트 E2E(MCP 전송, A2A)
npm run test:protocols:e2e

# 생태계 호환성 테스트
npm run test:ecosystem

# 커버리지 게이트: 구문/라인/함수/분기 60%
npm run test:coverage
npm run coverage:report

# 린트 + 형식 검사
npm run lint
npm run check

# 게이트가 적용된 실제 업스트림 콤보 스모크 테스트(VPS 접근 권한 + 실제 제공자 크레딧 필요)
# 실제 제공자를 호출하므로 약간의 비용이 발생함. CI에서는 절대로 실행되지 않음. 게이트가 없으면 문제없이 건너뜀.
# 필요 사항: ssh root@192.168.0.15 접근 권한(VPS에서 읽기 전용 DB 스냅샷을 가져옴).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS 라이브 스모크 테스트 — 일반 Node ESM 스크립트로 라이브 .15 서버를 직접 호출함.
# 필요 사항: ssh root@192.168.0.15 접근 권한(SSH sqlite를 통해 콤보를 생성/삭제함).
# 실제 제공자를 호출함(소액의 비용 발생). __live_test__* 콤보만 생성/삭제함. CI에서는 절대로 실행되지 않음.
# .15에서는 REQUIRE_API_KEY=false이므로 API 키가 필요하지 않지만, 설정된 경우 COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY를 따름.
npm run test:combo:live:vps              # HTTP 시나리오 7개(priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # 실제 제공자 간 장애 조치 시나리오 추가(총 8개)
```

커버리지 참고 사항:

- `npm run test:coverage`는 기본 단위 테스트 스위트의 소스 커버리지를 측정하고, `tests/**`를 제외하며, `open-sse/**`를 포함합니다
- 풀 리퀘스트는 구문/라인/함수/분기 커버리지 게이트를 **60%+**로 유지해야 합니다
- PR에서 `src/`, `open-sse/`, `electron/` 또는 `bin/`의 프로덕션 코드를 변경하는 경우 동일한 PR에서 자동화된 테스트를 추가하거나 업데이트해야 합니다
- `npm run coverage:report`는 가장 최근 커버리지 실행의 상세한 파일별 보고서를 출력합니다
- `npm run test:coverage:legacy`는 과거 비교를 위해 이전 측정 지표를 유지합니다
- 단계별 커버리지 개선 로드맵은 `docs/ops/COVERAGE_PLAN.md`를 참조하세요

### 풀 리퀘스트 요구 사항

PR을 열기 전에
[기여 골든 패스](docs/ops/CONTRIBUTION_GOLDEN_PATH.md)를 사용하여 변경한 항목에 맞는 집중 루프를
실행하세요. 전체 단위 테스트 스위트(CI 샤드 4개), Vitest, **60%+** 커버리지 게이트 및
프로덕션 빌드는 CI가 담당합니다. 이를 로컬에서 실행해도 PR 검사가 이미 제공하는 것 이상의
정보를 얻을 수 없으며, 사양이 낮은 머신에서는 호스트의 자원을 소진할 수 있습니다(#8084):

- 변경 사항을 다루는 테스트 파일을 실행하세요: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint`를 실행하세요
- 프로덕션 코드가 변경될 때마다 동일한 PR에 자동화된 테스트를 추가하거나 업데이트하세요
- 프로덕션 코드가 변경된 경우 변경되거나 추가된 테스트 파일을 PR 설명에 포함하세요
- CI에 프로젝트 시크릿이 구성되어 있다면 PR에서 SonarQube 결과를 확인하세요

현재 테스트 상태: 다음 항목을 다루는 **단위 테스트 파일 122개**:

- 제공자 변환기 및 형식 변환
- 속도 제한, 회로 차단기 및 복원력
- 시맨틱 캐시, 멱등성, 진행 상황 추적
- 데이터베이스 작업 및 스키마(DB 모듈 21개)
- OAuth 흐름 및 인증
- API 엔드포인트 검증(Zod v4)
- MCP 서버 도구 및 범위 적용
- 메모리 및 Skills 시스템

---

## 코드 스타일

- **ESLint** — 커밋하기 전에 `npm run lint` 실행
- **Prettier** — 커밋 시 `lint-staged`를 통해 자동 포맷팅(들여쓰기 2칸, 세미콜론, 큰따옴표, 줄 너비 100자, es5 후행 쉼표)
- **TypeScript** — 모든 `src/` 코드는 `.ts`/`.tsx`를 사용하고, `open-sse/`는 `.ts`/`.js`를 사용하며, TSDoc(`@param`, `@returns`, `@throws`)으로 문서화
- **`eval()` 금지** — ESLint에서 `no-eval`, `no-implied-eval`, `no-new-func` 규칙 적용
- **Zod 검증** — 모든 API 입력 검증에 Zod v4 스키마 사용
- **명명 규칙**: 파일 = camelCase/kebab-case, 컴포넌트 = PascalCase, 상수 = UPPER_SNAKE

### 오류 처리 / 빈 catch 블록

`catch`를 설명 없이 두지 마세요. 다음 두 범주 중 하나로 분류하세요(“SSE 스트림에서 오류를 절대 조용히 무시하지 않는다”는 엄격한 규칙을 구체화합니다).

- **의도적인 경우(자체적인 최선형 정리/텔레메트리)** — 여기서의 실패는 예상된 것이며
  무해합니다. 로깅 없이 한 줄의 근거 설명 주석을 추가하세요(모든 요청에 대한 로깅으로
  발생하는 잡음을 방지하기 위한 규칙입니다).

  ```ts
  } catch {} // 클라이언트 연결 해제 후 이미 닫힌 컨트롤러를 닫는 것은 예상된 동작입니다
  ```

- **로그를 남겨야 하는 경우(외부/호출자가 제공한 코드이거나, 오류 무시가 제어 흐름을 변경하는 경우)** — `catch`를
  유지하되(스트림을 중단시키지 않도록 함), 실패를 발견할 수 있도록 맥락이 포함된
  `console.debug`/`warn` 로그를 출력하세요.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure 콜백 오류:", e);
  }
  ```

적용 예시는 `open-sse/utils/stream.ts` 및 `open-sse/utils/streamHandler.ts`를 참조하세요.

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## 새 Provider 추가

### 1단계: Provider 상수 등록

`src/shared/constants/providers.ts`에 추가합니다. 모듈 로드 시 Zod로 검증됩니다.

### 2단계: Executor 추가(사용자 지정 로직이 필요한 경우)

기본 executor를 확장하여 `open-sse/executors/your-provider.ts`에 executor를 생성합니다.

### 3단계: Translator 추가(OpenAI 형식이 아닌 경우)

`open-sse/translator/`에 요청/응답 translator를 생성합니다.

### 4단계: OAuth 구성 추가(OAuth 기반인 경우)

`src/lib/oauth/constants/oauth.ts`에 OAuth 자격 증명을 추가하고 `src/lib/oauth/services/`에 서비스를 추가합니다.

업스트림 provider가 공개 CLI/브라우저 번들 내에 공개 OAuth client_id/secret 또는 Firebase Web API 키를 배포하는 경우, 이를 문자열 리터럴로 **삽입하지 마세요**. `open-sse/utils/publicCreds.ts`의 `resolvePublicCred()`를 사용하고 `EMBEDDED_DEFAULTS`에 마스킹된 바이트 항목을 추가하세요. 반드시 따라야 하는 전체 워크플로는 [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md)에 문서화되어 있습니다.

handler/executor 내부에서 클라이언트에 전달되는 오류 메시지는 `open-sse/utils/error.ts`의 `buildErrorBody()` / `sanitizeErrorMessage()`를 반드시 거쳐야 합니다. 원시 `err.stack` 또는 `err.message`를 Response 본문에 절대로 넣지 마세요. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md)를 참조하세요.

### 5단계: 모델 등록

`open-sse/config/providerRegistry.ts`에 모델 정의를 추가합니다.

### 6단계: 테스트 추가

최소한 다음 항목을 다루는 단위 테스트를 `tests/unit/`에 작성합니다.

- Provider 등록
- 요청/응답 변환
- 오류 처리

---

## 풀 리퀘스트 체크리스트

- [ ] 테스트 통과 (`npm test`)
- [ ] 린트 검사 통과 (`npm run lint`)
- [ ] 빌드 성공 (`npm run build`)
- [ ] 새로운 공개 함수 및 인터페이스에 TypeScript 타입 추가
- [ ] 하드코딩된 시크릿 또는 대체 값 없음
- [ ] 공개 업스트림 자격 증명은 리터럴이 아닌 `resolvePublicCred()`를 통해 포함 ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) 참조)
- [ ] 오류 응답은 `buildErrorBody()` / `sanitizeErrorMessage()`를 통해 처리 — 응답 본문에 원시 스택 트레이스 포함 금지 ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) 참조)
- [ ] 셸 명령어(`exec` / `spawn`)는 문자열 보간이 아닌 `env`를 통해 런타임 값을 전달
- [ ] 모든 입력을 Zod 스키마로 검증
- [ ] 사용자에게 영향을 미치는 변경 사항에 대해 `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` 아래에 변경 로그 **조각** 추가 ([`changelog.d/README.md`](./changelog.d/README.md) 참조) — `CHANGELOG.md`를 직접 편집하지 **말 것**. 조각은 릴리스 시점에 통합되며 PR 간 충돌이 발생하지 않음
- [ ] 문서 업데이트(해당하는 경우)
- [ ] 새로운 CodeQL / Secret-Scanning 경고가 발생하지 않았거나, 각 경고를 관련 `docs/security/` 문서를 참조하는 기술적 근거와 함께 해제
- [ ] 자식 프로세스를 생성하는 라우트(`/api/mcp/`, `/api/cli-tools/runtime/`)를 `src/server/authz/routeGuard.ts`에서 `isLocalOnlyPath()`로 분류 — [하드 규칙 #15](docs/security/ROUTE_GUARD_TIERS.md) 참조
- [ ] 커밋 메시지에 `Co-Authored-By` 트레일러 포함 금지 — 커밋은 저장소 소유자의 Git ID로만 표시되어야 함(하드 규칙 #16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## 도움말 보기

- **아키텍처**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) 참조
- **API 참조 문서**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) 참조
- **보안 문서**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **운영 문서**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **이슈**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADR**: 아키텍처 결정 기록은 `docs/adr/` 참조
