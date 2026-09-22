# Embedded Services (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EMBEDDED-SERVICES.md) · 🇪🇹 [am](../../../am/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇿 [az](../../../az/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇰 [da](../../../da/docs/frameworks/EMBEDDED-SERVICES.md) · 🇩🇪 [de](../../../de/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇷 [el](../../../el/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇸 [es](../../../es/docs/frameworks/EMBEDDED-SERVICES.md) · 🇪🇪 [et](../../../et/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇱 [he](../../../he/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EMBEDDED-SERVICES.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇩 [id](../../../id/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇹 [it](../../../it/docs/frameworks/EMBEDDED-SERVICES.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EMBEDDED-SERVICES.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇭 [km](../../../km/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇲🇲 [my](../../../my/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇴 [no](../../../no/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [or](../../../or/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EMBEDDED-SERVICES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EMBEDDED-SERVICES.md) · 🇱🇰 [si](../../../si/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EMBEDDED-SERVICES.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EMBEDDED-SERVICES.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EMBEDDED-SERVICES.md) · 🇮🇳 [te](../../../te/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇭 [th](../../../th/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EMBEDDED-SERVICES.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EMBEDDED-SERVICES.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EMBEDDED-SERVICES.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EMBEDDED-SERVICES.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EMBEDDED-SERVICES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EMBEDDED-SERVICES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EMBEDDED-SERVICES.md)

---

> **버전:** v3.8.44
> **최종 업데이트:** 2026-09-09
> **대상 독자:** 임베디드 서비스(9Router, CLIProxyAPI, Mux, Bifrost, open-wa)를 추가, 유지 관리 또는 디버깅하는 엔지니어.

임베디드 서비스는 OmniRoute가 설치하고 감독하며 최상위 라우팅 대상으로 제공하는, 로컬에 설치된 프로세스 사이드카 도구입니다. API 키를 통해 인터넷으로 연결되는 외부 제공자와 달리, 임베디드 서비스는 OmniRoute와 동일한 시스템에서 실행되며 루프백을 통해 통신합니다.

---

## 목차

1. [개요](#1-overview)
2. [아키텍처 — 4개 계층](#2-architecture--4-layers)
3. [수명 주기 상태 머신](#3-lifecycle-state-machine)
4. [API 참조](#4-api-reference)
5. [보안](#5-security)
6. [새 임베디드 서비스 추가](#6-adding-a-new-embedded-service)
7. [문제 해결](#7-troubleshooting)
8. [FAQ](#8-faq)

---

## 1. 개요

### 임베디드 서비스를 사용하는 이유

6개의 서비스가 임베드됩니다:

| 서비스          | npm 패키지                         | 기본 포트 | 용도                                                                                                                                                                                             |
| --------------- | ---------------------------------- | :-------: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **9Router**     | `9router`                          |   20130   | OmniRoute가 하위 공급자로 사용할 수 있는 AI 라우터입니다. 모델은 `9router/{sub}/{model}` 형식으로 노출됩니다.                                                                                    |
| **CLIProxyAPI** | GitHub 릴리스 바이너리(`cliproxy`) |   8317    | Anthropic CLI 인증 흐름을 위한 로컬 프록시 어댑터입니다. OAuth 토큰이 만료될 때 대체 라우팅을 제공합니다.                                                                                        |
| **Mux**         | `mux`(헤드리스 `mux server`)       |   8322    | 로컬 에이전트 오케스트레이션 데몬(coder/mux)입니다. 수명 주기만 관리되며, 라우팅 대상이 아닙니다(LLM 프록시 없음).                                                                               |
| **Bifrost**     | `@maximhq/bifrost`                 |   8080    | Go AI 게이트웨이 릴레이 백엔드입니다. 실행 중이면 릴레이 경로(`/v1/relay/`)에서 자동으로 선택됩니다.                                                                                             |
| **Dario**       | `@askalf/dario`                    |   3456    | Claude 구독 프록시입니다. Claude-Code 형태의 트래픽에 대해 CLIProxyAPI의 대안/장애 조치 역할을 하며, 주입된 키는 `/admin/*` OAuth 제어 영역에 대한 접근을 제한하는 `DARIO_ADMIN_TOKEN`이 됩니다. |
| **open-wa**     | `@open-wa/wa-automate`             |   8323    | WhatsApp Web 자동화(Puppeteer를 통한 헤드리스 Chromium)입니다. 수명 주기만 관리되며, 라우팅 대상이 아닙니다.                                                                                     |

6개 서비스 모두 동일한 관리 모델을 따릅니다:

- OmniRoute는 서비스를 `DATA_DIR/services/{name}/` 아래에 설치합니다(OmniRoute 자체 `package.json`과 격리됨).
- OmniRoute는 서비스를 자식 프로세스로 생성하고 모니터링합니다.
- OmniRoute는 임시 API 키를 자식 프로세스의 환경에 주입하고, 가능한 경우 중단 없이 교체합니다.
- 모든 관리 경로(`/api/services/*`)는 **LOCAL_ONLY**입니다. 즉, 루프백에서만 접근할 수 있습니다(엄격한 규칙 #17).

### 주요 결정 사항(설계 계획에서 발췌)

| 결정 사항                                | 값                                                                           |
| ---------------------------------------- | ---------------------------------------------------------------------------- |
| 9Router 네이티브 UI에 대한 대시보드 접근 | `/dashboard/providers/services/9router/embed/*`의 리버스 프록시              |
| 설치 메커니즘                            | `execFile`을 통한 `npm install {package}`(셸 보간 없음)                      |
| 사용 모드                                | 라우팅 엔진에 `9router/{sub}/{model}`로 등록된 공급자                        |
| API 키 관리                              | OmniRoute가 생성하고, 저장 시 암호화(AES-256-GCM)하며, 환경 변수를 통해 주입 |
| 대시보드 위치                            | `/dashboard/providers/services`(탭 3개)                                      |
| 자동 시작                                | 서비스별 토글, 기본값 OFF                                                    |

---

## 2. 아키텍처 — 4개 계층

```
┌────────────────────────────────────────────────────────────────────┐
│  계층 1 — UI                                                       │
│  /dashboard/providers/services  (탭: CLIProxyAPI | 9Router | Mux)  │
│  실시간 로그(SSE), 시작/중지/재시작/업데이트, 설정, 설치           │
│                                                                    │
│  src/app/(dashboard)/dashboard/providers/services/                 │
│    ├── page.tsx               셸 + ?tab= 기반 탭 라우팅            │
│    ├── tabs/                  CliproxyServiceTab, NinerouterServiceTab,│
│    │                          MuxServiceTab                        │
│    └── components/            ServiceStatusCard, ServiceLifecycleButtons,│
│                               ServiceLogsPanel, ApiKeyCard, ...    │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ HTTP (Next.js fetch)
┌──────────────────────▼─────────────────────────────────────────────┐
│  계층 2 — API (LOCAL_ONLY — 루프백 전용)                           │
│                                                                    │
│  /api/services/9router/{install|start|stop|restart|update|         │
│                          rotate-key|status|auto-start|logs}        │
│  /api/services/cliproxy/{install|start|stop|restart|update|        │
│                           status|auto-start|logs}                  │
│  /api/services/mux/{install|start|stop|restart|update|             │
│                      status|auto-start|logs}                       │
│  /dashboard/providers/services/9router/embed/[...path]             │
│    (역방향 HTTP + WebSocket 프록시 → 9Router 업스트림)             │
│                                                                    │
│  게이트: LOCAL_ONLY_API_PREFIXES에 "/api/services/" 및             │
│          "/dashboard/providers/services/*/embed/" 포함             │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ 프로세스 내부 호출
┌──────────────────────▼─────────────────────────────────────────────┐
│  계층 3 — ServiceSupervisor (src/lib/services/)                    │
│                                                                    │
│  ServiceSupervisor.ts   범용 슈퍼바이저(child_process.spawn)       │
│    ├── 설치:       execFile('npm', ['install', pkg, '--prefix'])    │
│    ├── 시작:       spawn(node, [entrypoint], {env, cwd})           │
│    ├── API 키:     crypto.randomBytes(32) → env NINEROUTER_API_KEY  │
│    ├── 포트:       9Router는 20130(설정 가능)                      │
│    ├── 로그:       stdio 링 버퍼 5 MB → SSE 이벤트                │
│    ├── 상태 확인:  2~5초마다 HTTP GET /health, 지연 복구           │
│    └── 수명 주기:  SIGTERM 15초 → SIGKILL                         │
│                                                                    │
│  registry.ts        getSupervisor(name) / registerSupervisor()     │
│  bootstrap.ts       프로세스 시작 시 모든 SERVICES[] 부트스트랩   │
│  apiKey.ts          getOrCreateApiKey(), generateServiceApiKey()   │
│  modelSync.ts       주기적 GET /v1/models → service_models 테이블  │
│  ringBuffer.ts      순환 로그 버퍼(서비스당 5 MB)                  │
│  healthCheck.ts     폴링 방식의 HTTP 상태 프로브                   │
│  installers/        ninerouter.ts, cliproxy.ts, mux.ts, openwa.ts  │
│                      (설치 프로그램 어댑터)                        │
└──────────────────────┬─────────────────────────────────────────────┘
                       │ OpenAI 호환 HTTP(루프백)
┌──────────────────────▼─────────────────────────────────────────────┐
│  계층 4 — 제공자 / 라우팅                                         │
│                                                                    │
│  open-sse/executors/ninerouter.ts                                  │
│    요청마다 포트와 API 키를 다시 조회함(캐싱 없음).                │
│    프록시하기 전에 모델 ID에서 "9router/" 접두사를 제거함.         │
│    슈퍼바이저가 "running" 상태가 아니면 503 service_not_running 반환.│
│                                                                    │
│  src/shared/constants/providers.ts                                 │
│    "9router" 항목: isEmbeddedService: true                         │
│                                                                    │
│  open-sse/config/providerRegistry.ts                               │
│    모델은 "9router/{sub}/{model}" 형식으로 저장됨(접두사 포함).    │
│    modelSync.ts가 5분마다 동기화함.                                │
│                                                                    │
│  Mux는 수명 주기만 관리됨(계층 1~3). Mux는 LLM 프록시가 아니라     │
│  에이전트 오케스트레이션 데몬이므로 계층 4 실행기/제공자 항목이    │
│  없으며 라우팅 대상이 되지 않음.                                  │
└────────────────────────────────────────────────────────────────────┘
```

### 주요 소스 파일

| 파일                                        | 역할                                             |
| ------------------------------------------- | ------------------------------------------------ |
| `src/lib/services/ServiceSupervisor.ts`     | 핵심 클래스: 수명 주기, 잠금, 상태 확인, 링 버퍼 |
| `src/lib/services/bootstrap.ts`             | 프로세스 수준 등록 및 자동 시작                  |
| `src/lib/services/registry.ts`              | 싱글턴 맵 `tool → supervisor`                    |
| `src/lib/services/apiKey.ts`                | 키 생성, AES-256-GCM 저장 시 암호화              |
| `src/lib/services/modelSync.ts`             | 주기적 모델 동기화(5분) + 온디맨드               |
| `src/lib/services/ringBuffer.ts`            | SSE 구독을 지원하는 5 MB 순환 로그 버퍼          |
| `src/lib/services/healthCheck.ts`           | HTTP 상태 프로브(간격 구성 가능)                 |
| `src/lib/services/installers/ninerouter.ts` | 9Router용 npm 설치/업데이트/제거                 |
| `src/lib/services/installers/cliproxy.ts`   | CLIProxyAPI용 npm 설치/업데이트/제거             |
| `src/lib/services/installers/mux.ts`        | Mux용 npm 설치/업데이트/제거                     |
| `src/lib/services/installers/openwa.ts`     | open-wa용 npm 설치/업데이트/제거                 |
| `src/app/api/services/9router/_lib.ts`      | `getOrInitSupervisor()` 헬퍼                     |
| `src/app/api/services/[name]/logs/route.ts` | 공유 SSE 로그 엔드포인트                         |
| `open-sse/executors/ninerouter.ts`          | 프로바이더 실행기(계층 4)                        |

---

## 3. 수명 주기 상태 머신

```
                    install()
  ┌─────────────┐ ──────────► ┌─────────────┐
  │ not_installed│             │   stopped   │◄──────────────────┐
  └─────────────┘             └──────┬──────┘                   │
                                     │ start()                   │
                                     ▼                           │ stop()
                               ┌──────────┐                      │
                               │ starting │                      │
                               └────┬─────┘                     │
                  상태 검사 성공    │         충돌 / SIGTERM     │
                               ┌────▼─────┐  (5초 이내 종료)     │
                               │ running  │──── 충돌 ───────────►┤
                               └────┬─────┘                   ┌─▼────┐
                             stop() │                          │error │
                                    ▼                          └──────┘
                               ┌──────────┐
                               │ stopping │
                               └──────────┘
```

상태는 `version_manager` DB 테이블(`status` 열)에 저장되며
`ServiceSupervisor`의 인메모리 상태에도 반영됩니다. 실행 중인 프로세스에 대해서는
인메모리 상태가 기준이며, DB 상태는 부팅 시 영구 폴백으로 사용됩니다.

### 상태 전환

| 시작 상태       | 이벤트                              | 전환 상태              |
| --------------- | ----------------------------------- | ---------------------- |
| `not_installed` | `install()` 성공                    | `stopped`              |
| `stopped`       | `start()` 호출                      | `starting`             |
| `starting`      | 상태 검사가 200 반환                | `running`              |
| `starting`      | 정상 상태가 되기 전에 프로세스 종료 | `error`                |
| `running`       | `stop()` 호출                       | `stopping` → `stopped` |
| `running`       | 프로세스가 예기치 않게 종료(< 5초)  | `error` (빠른 충돌)    |
| `running`       | 프로세스가 예기치 않게 종료(> 5초)  | `error`                |
| `error`         | `start()` 호출                      | `starting`             |
| 모든 상태       | `stopping` 중 `stop()` 호출         | 아무 작업도 하지 않음  |

### 작업 잠금

`ServiceSupervisor`는 비동기 작업 잠금(`withLock()`)을 통해 수명 주기 작업을
직렬화합니다. 동일한 supervisor에 대한 동시 `start()` 호출은 정확히 하나의
프로세스 생성만 발생시키며, 두 번째 호출자는 대기한 후 기존 상태를 반환받습니다.
이를 통해 예를 들어 자동 시작과 UI 버튼 동작이 동시에 발생할 때 생길 수 있는
경쟁 조건을 방지합니다.

---

## 4. API 참조

`/api/services/` 아래의 모든 경로는 **LOCAL_ONLY**입니다(루프백 전용, 엄격 규칙 #17).
루프백이 아닌 요청은 인증 토큰과 관계없이 `403 LOCAL_ONLY` 응답을 받습니다.

### 4.1 9Router 엔드포인트(11개 경로)

#### `POST /api/services/9router/install`

npm에서 9Router를 설치합니다. 자체 `package.json` 및 `node_modules/`를 포함하는
`DATA_DIR/services/9router/`를 생성합니다. OmniRoute 자체 종속성과 충돌하지 않습니다.

**요청 본문**(모두 선택 사항):

```json
{ "version": "latest" }
```

| 필드      | 타입     | 기본값     | 설명                             |
| --------- | -------- | ---------- | -------------------------------- |
| `version` | `string` | `"latest"` | 설치할 npm 버전 태그 또는 semver |

**응답:**

| 상태  | 설명                                                   |
| ----- | ------------------------------------------------------ |
| `200` | `{ ok: true, installedVersion: "x.y.z", path: "..." }` |
| `400` | 잘못된 요청 본문(Zod 유효성 검사 실패)                 |
| `409` | 이미 설치 중(잠금이 유지됨)                            |
| `500` | npm 설치 실패 — 사용자 친화적 오류는 `message` 참조    |

**참고:** `execFile('npm', [...])`을 사용합니다 — 셸 및 보간 없음(엄격 규칙 #13).
EACCES 오류는 사용자 친화적인 메시지로 표시됩니다.

---

#### `POST /api/services/9router/start`

9Router를 시작합니다. 아직 등록되지 않은 경우 supervisor를 등록한 다음
`supervisor.start()`를 호출합니다. 이미 실행 중인 경우에도 멱등성을 보장합니다.

**요청 본문:** 없음

**응답:**

| 상태  | 설명                                               |
| ----- | -------------------------------------------------- |
| `200` | `ServiceStatus` 객체(아래 스키마 참조)             |
| `409` | 9Router가 설치되지 않음(`status: "not_installed"`) |
| `503` | 시작 실패(프로세스 오류 — `lastError` 참조)        |

**ServiceStatus 스키마:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null
}
```

---

#### `POST /api/services/9router/stop`

9Router를 정상적으로 중지합니다. SIGTERM을 보내고 15초 동안 기다린 다음, 여전히 실행 중이면 SIGKILL을 보냅니다.
이미 중지된 경우에도 멱등성을 보장합니다.

**요청 본문:** 없음

**응답:**

| 상태  | 설명                                 |
| ----- | ------------------------------------ |
| `200` | `ServiceStatus` (`state: "stopped"`) |
| `503` | 예기치 않은 중지 실패                |

---

#### `POST /api/services/9router/restart`

작업 잠금 내에서 `stop()`을 호출한 다음 `start()`를 호출하는 것과 같습니다.

**요청 본문:** 없음

**응답:** `start`와 동일합니다(최종 `ServiceStatus` 반환).

---

#### `POST /api/services/9router/update`

9Router를 더 새로운 npm 버전으로 업데이트합니다. 서비스가 실행 중이면 먼저
중지하고 npm install을 실행하여 새 버전을 기존 위치에 설치한 다음 서비스를
다시 시작합니다.

**요청 본문**(모두 선택 사항):

```json
{ "version": "latest" }
```

**응답:**

| 상태  | 설명                                                            |
| ----- | --------------------------------------------------------------- |
| `200` | `{ ok: true, previousVersion: "...", installedVersion: "..." }` |
| `400` | 잘못된 본문                                                     |
| `500` | npm 업데이트 실패                                               |

---

#### `POST /api/services/9router/rotate-key`

9Router용 새 API 키를 생성하고 저장 시 암호화한 후, 서비스가 실행 중인 경우
환경에서 새 키를 가져오도록 서비스를 다시 시작합니다. 이전 키는 즉시
무효화됩니다.

**요청 본문:** 없음

**응답:**

| 상태  | 설명                                       |
| ----- | ------------------------------------------ |
| `200` | `{ keyRotated: true, restarted: boolean }` |
| `500` | 키 교체 실패                               |

**보안:** 새 키는 응답으로 절대 반환되지 않습니다(자격 증명 유출 방지).
`version_manager` 테이블에 암호화되어(AES-256-GCM) 저장됩니다.

---

#### `GET /api/services/9router/status`

버전 메타데이터와 API 키 미리보기를 포함하여 실시간 상태와 DB 상태를 결합해 반환합니다.

**응답:**

| 상태  | 설명             |
| ----- | ---------------- |
| `200` | 아래 스키마 참조 |
| `500` | 상태 읽기 실패   |

**응답 스키마:**

```json
{
  "tool": "9router",
  "state": "running",
  "pid": 12345,
  "port": 20130,
  "health": "healthy",
  "startedAt": "2026-05-25T10:00:00.000Z",
  "lastError": null,
  "installedVersion": "1.2.3",
  "latestVersion": "1.2.4",
  "updateAvailable": true,
  "apiKeyMasked": "nr_****abcd",
  "autoStart": false,
  "providerExpose": false
}
```

---

#### `POST /api/services/9router/auto-start`

자동 시작 플래그를 전환합니다. `enabled: true`이면 다음에 OmniRoute가 부팅될 때
서비스가 설치되어 있는 경우 자동으로 시작됩니다.

**요청 본문:**

```json
{ "enabled": true }
```

**응답:**

| 상태  | 설명                  |
| ----- | --------------------- |
| `200` | `{ autoStart: true }` |
| `400` | 잘못된 본문           |

---

#### `GET /api/services/9router/logs`

9Router의 stdout/stderr 링 버퍼에서 실시간 로그를 전송하는 SSE 스트림입니다.

**쿼리 매개변수:**

| 매개변수 | 타입      | 기본값 | 설명                                                                  |
| -------- | --------- | ------ | --------------------------------------------------------------------- |
| `tail`   | `integer` | 200    | 처음에 전송할 과거 로그 줄 수(최대 1000)                              |
| `filter` | `string`  | 없음   | 대소문자를 구분하지 않는 부분 문자열 필터(정규식 미사용 — ReDoS 안전) |

**SSE 이벤트:**

| 이벤트      | 데이터      | 설명                         |
| ----------- | ----------- | ---------------------------- |
| `snapshot`  | `LogLine[]` | 초기 과거 로그의 마지막 부분 |
| `log`       | `LogLine`   | 실시간 로그 줄               |
| `heartbeat` | `{}`        | 15초마다 연결 유지           |

**LogLine 스키마:**

```json
{
  "ts": 1716633600000,
  "stream": "stdout",
  "line": "[9router] Listening on :20130"
}
```

**응답:**

| 상태  | 설명                                          |
| ----- | --------------------------------------------- |
| `200` | `text/event-stream`                           |
| `400` | `filter` 매개변수가 너무 김(> 200자)          |
| `404` | 서비스를 찾을 수 없음(감독자가 등록되지 않음) |

---

### 4.2 CLIProxyAPI 엔드포인트(10개 라우트)

CLIProxyAPI는 9Router에서 `rotate-key`를 제외하고 `accounts`, `provider-expose`, `auto-restart-adopted`를 추가한 것과 동일한 엔드포인트 구조를 가집니다. 이제 생성 시 전용 데이터 플레인 API 키가 주입됩니다(`bootstrap.ts`에서 `needsApiKey: true`, 모델 동기화에 사용). `status`에는 더 적은 필드가 포함됩니다.

| 메서드 | 경로                                | 설명                                  |
| ------ | ----------------------------------- | ------------------------------------- |
| `POST` | `/api/services/cliproxy/install`    | npm에서 CLIProxyAPI 설치              |
| `POST` | `/api/services/cliproxy/start`      | CLIProxyAPI 시작                      |
| `POST` | `/api/services/cliproxy/stop`       | CLIProxyAPI 중지                      |
| `POST` | `/api/services/cliproxy/restart`    | CLIProxyAPI 재시작                    |
| `POST` | `/api/services/cliproxy/update`     | 최신 버전으로 업데이트                |
| `GET`  | `/api/services/cliproxy/status`     | 실시간 + DB 상태(`apiKeyMasked` 없음) |
| `POST` | `/api/services/cliproxy/auto-start` | 자동 시작 전환                        |

공유 `GET /api/services/{name}/logs` 엔드포인트(§4.1 참조)는 `[name]` 동적 세그먼트를 사용하여 네 서비스 모두에서 작동합니다.

---

### 4.3 Mux 엔드포인트(8개 라우트)

Mux는 CLIProxyAPI와 동일한 엔드포인트 구조를 가지며 API 표면에 `rotate-key` 라우트가 없습니다(베어러 토큰은 9Router와 동일하게 `getOrCreateApiKey("mux")`를 통해 생성되고 `MUX_SERVER_AUTH_TOKEN` 환경 변수를 통해 주입되지만, 아직 전용 키 순환 엔드포인트는 없습니다). Mux는 수명 주기만 관리됩니다. 9Router와 달리 Layer 4 실행기가 없으며 라우팅 공급자로 등록되지 않습니다.

| 메서드 | 경로                           | 설명                          |
| ------ | ------------------------------ | ----------------------------- |
| `POST` | `/api/services/mux/install`    | npm에서 Mux 설치(`npm i mux`) |
| `POST` | `/api/services/mux/start`      | Mux 시작(`mux server`)        |
| `POST` | `/api/services/mux/stop`       | Mux 중지                      |
| `POST` | `/api/services/mux/restart`    | Mux 재시작                    |
| `POST` | `/api/services/mux/update`     | 최신 npm 버전으로 업데이트    |
| `GET`  | `/api/services/mux/status`     | 실시간 + DB 상태              |
| `POST` | `/api/services/mux/auto-start` | 자동 시작 전환                |

---

### 4.4 Bifrost 엔드포인트(8개 라우트)

Bifrost는 Go 기반 AI 게이트웨이 릴레이 백엔드(`@maximhq/bifrost`)입니다. CLIProxyAPI와 동일한 엔드포인트 구조를 사용합니다(`rotate-key` 없음 — Bifrost는 `-app-dir` 아래의 `config.json`에서 자체 공급자 키를 관리함).

| 메서드 | 경로                               | 설명                                                      |
| ------ | ---------------------------------- | --------------------------------------------------------- |
| `POST` | `/api/services/bifrost/install`    | npm에서 Bifrost 설치(`@maximhq/bifrost`)                  |
| `POST` | `/api/services/bifrost/start`      | 포트 8080에서 Bifrost 시작(기본값)                        |
| `POST` | `/api/services/bifrost/stop`       | Bifrost 중지                                              |
| `POST` | `/api/services/bifrost/restart`    | Bifrost 재시작                                            |
| `POST` | `/api/services/bifrost/update`     | 최신 버전으로 업데이트                                    |
| `GET`  | `/api/services/bifrost/status`     | 실시간 + DB 상태                                          |
| `POST` | `/api/services/bifrost/auto-start` | 자동 시작 전환                                            |
| `GET`  | `/api/services/bifrost/logs`       | SSE 로그 추적(공유 `[name]/logs` 동적 라우트를 통해 제공) |

**라우팅 연결:** `BIFROST_BASE_URL`이 설정되지 않았고 감독 대상 Bifrost 인스턴스가 실행 중이면 `getBifrostRoutingConfig()`(`routingBackend.ts`에 위치)는 자동으로 `http://127.0.0.1:{port}`를 릴레이 기본 URL로 사용합니다. 명시적인 `BIFROST_BASE_URL` 환경 변수가 항상 우선합니다.

---

### 4.5 Dario 엔드포인트(12개 라우트)

다른 서비스와 동일한 수명 주기 구조(`install`, `start`, `stop`, `restart`, `update`, `status`, `auto-start`, `auto-restart-adopted`)에 더해 `admin/` 아래에 토큰으로 보호되는 OAuth 제어 플레인이 있습니다. 해당 제어 플레인에는 `admin/accounts`, `admin/import-from-omniroute`, `admin/login-start`, `admin/login-complete`가 포함되며, 모두 `DARIO_ADMIN_TOKEN`으로 보호됩니다.

### 4.6 open-wa 엔드포인트(7개 라우트)

open-wa(`@open-wa/wa-automate`)는 Puppeteer를 통해 헤드리스 Chromium 인스턴스를 구동하여 WhatsApp Web을 자동화합니다. Mux와 동일한 엔드포인트 구조를 사용합니다(아직 `rotate-key` 라우트 없음). 수명 주기만 관리되며, 라우팅 대상이 아니고 Layer 4 실행기/공급자 항목도 없습니다.

| 메서드 | 경로                              | 설명                                                      |
| ------ | --------------------------------- | --------------------------------------------------------- |
| `POST` | `/api/services/openwa/install`    | npm에서 open-wa 설치 (`@open-wa/wa-automate`)             |
| `POST` | `/api/services/openwa/start`      | 포트 8323에서 open-wa 시작(기본값)                        |
| `POST` | `/api/services/openwa/stop`       | open-wa 중지                                              |
| `POST` | `/api/services/openwa/restart`    | open-wa 재시작                                            |
| `POST` | `/api/services/openwa/update`     | 최신 버전으로 업데이트                                    |
| `GET`  | `/api/services/openwa/status`     | 실시간 + DB 상태                                          |
| `POST` | `/api/services/openwa/auto-start` | 자동 시작 전환                                            |
| `GET`  | `/api/services/openwa/logs`       | SSE 로그 테일(공유 `[name]/logs` 동적 라우트를 통해 제공) |

**API 키:** `WA_KEY`로 주입됩니다. open-wa의 일반 `WA_*` 접두사 환경 변수
오버라이드가 이를 `--key`/`-k` CLI 옵션에 매핑합니다
(`dist/cli/setup.js::envArgs()`, 설치된 4.76.0
package에서 검증됨). `generateServiceApiKey()`로 생성할 때 `ow_` 접두사가 붙습니다. open-wa는
`key`/`api_key` HTTP 헤더에서 키를 다시 읽습니다(`Authorization:
Bearer`가 아님). `/api-docs*`는 검사에서 명시적으로 제외되므로
(`dist/cli/server.js`의 `setupAuthenticationLayer`) 상태 확인 프로브에는
인증 헤더가 필요하지 않습니다.

**페어링:** open-wa는 비공식이며 WhatsApp과 제휴 관계가 없습니다.
연결된 번호는 WhatsApp 자체 자동화 탐지로 인해 차단될 위험이 있습니다.
처음 시작할 때 페어링 QR 코드가 stdout에 출력되고 기존 로그 패널/SSE
스트림을 통해 표시됩니다. 아직 이 통합에는 전용 QR 이미지 엔드포인트가
없습니다.

---

### 4.7 리버스 프록시(9Router 대시보드 임베드)

대시보드는 다음 위치의 내부 리버스 프록시를 통해 9Router 웹 UI를 iframe
내에 임베드합니다.

```
GET|POST|... /dashboard/providers/services/9router/embed/[...path]
```

이 프록시는 다음을 수행합니다.

- 요청을 `http://127.0.0.1:{port}/{path}`로 전달합니다(루프백 전용).
- 수신 `cookie` 및 `authorization` 헤더를 제거합니다(OmniRoute 세션 유출 방지).
- 9Router 인증을 위해 `Authorization: Bearer {apiKey}`를 주입합니다.
- 응답에서 `set-cookie`, `content-security-policy`, `x-frame-options`, `cross-origin-*`를 제거합니다.
- HTML 응답을 재작성하여 `<base href>`를 주입하고 절대 경로를 정규화합니다(`/foo` → `/dashboard/.../embed/foo`).

임베드된 대시보드의 WebSocket 업그레이드는 전용 포트의 컴패니언 서버에서
처리합니다(`src/lib/services/embedWsProxy.ts` 참조).

**보안:** 임베드 프록시 라우트는 `LOCAL_ONLY_API_PREFIXES`로 분류되며
루프백에서만 접근할 수 있습니다. 공격자가 Cloudflare/Ngrok 터널을 통해
JWT를 획득하더라도 임베드된 서비스로 프록시할 수 없습니다.

---

## 5. 보안

### LOCAL_ONLY 적용(엄격 규칙 #17)

`/api/services/` 및 `/dashboard/providers/services/*/embed/` 아래의 모든 경로는
`src/server/authz/routeGuard.ts`에서 LOCAL_ONLY로 분류됩니다. 루프백 검사는
모든 인증 분기보다 먼저 무조건 실행됩니다.

```
요청 도착
  → isLocalOnlyPath(path)?
      → 비루프백 → 403 LOCAL_ONLY(항상, 인증 검사 전)
      → 루프백   → 일반 인증으로 진행
```

이는 유출된 JWT(예: 터널을 통해 유출됨)가 `npm install`이나 프로세스 생성을
실행하지 못하도록 방지합니다. 전체 티어 매트릭스는
`docs/security/ROUTE_GUARD_TIERS.md`를 참조하세요.

### API 키 주입

9Router와 Mux는 자체 HTTP 엔드포인트에 API 키/베어러 토큰을 요구합니다.
OmniRoute는 다음과 같이 처리합니다.

1. `crypto.randomBytes(32).toString("base64url")`를 사용하여 서비스별 접두사가
   포함된 키를 생성합니다(9Router는 `nr_`, Mux는 `mx_`).
2. AES-256-GCM(제공자 자격 증명에 사용하는 것과 동일한 암호)을 사용하여 저장 시 암호화합니다.
3. 프로세스 생성 시 키를 복호화하여 환경 변수로 주입합니다.
   9Router에는 `NINEROUTER_API_KEY`, Mux에는 `MUX_SERVER_AUTH_TOKEN`을 사용합니다(CLI
   플래그를 사용하지 않으므로 토큰이 `ps`/프로세스 목록에 절대 표시되지 않음).
4. 어떠한 HTTP 응답에서도 평문 키를 반환하지 않습니다.

CLIProxyAPI에는 프로세스 생성 시 전용 데이터 플레인 키가 주입됩니다
(`needsApiKey: true` — 어댑터에 대한 모델 동기화에 사용됨).

### SSRF 방어

역방향 HTTP 프록시(`/dashboard/.../embed/[...path]`)는
`http://127.0.0.1:{port}`로만 전달하도록 하드코딩되어 있습니다. 루프백이 아닌
대상으로의 리디렉션은 절대 따르지 않습니다. `ssrf-req-filter` 라이브러리를 사용하여
루프백 범위 외부로 확인되는 모든 업스트림 URL을 거부합니다.

### 셸 안전성(엄격 규칙 #13)

`npm install`은 `execFile('npm', ['install', pkg, '--prefix', dir])`을 통해 호출됩니다.
템플릿 리터럴이나 셸을 사용하지 않으며, 외부 경로를 명령 문자열에 보간하지도 않습니다.
런타임 값(포트, API 키)은 자식 프로세스의 `env` 객체를 통해 전달됩니다.

### 오류 정제(엄격 규칙 #12)

`/api/services/*`의 모든 오류 응답은 `buildErrorBody()` 또는
`sanitizeErrorMessage()`를 거칩니다. 원시 `err.stack` 및 `err.message`는 호출자에게
있는 그대로 반환되지 않습니다.

---

## 6. 새로운 임베디드 서비스 추가

다음 8단계를 따르세요. `src/lib/services/installers/` 및
`src/app/api/services/`의 기존 구현을 표준 참조로 사용하세요.

### 1단계 — 설치 프로그램 생성

`ninerouter.ts`를 모델로 삼아 `src/lib/services/installers/{name}.ts`를 생성합니다.

```typescript
export const NAME_PACKAGE = "your-npm-package";
export const NAME_DEFAULT_PORT = 20132; // 사용 가능한 포트를 선택하세요

export async function install(version = "latest"): Promise<InstallResult> { ... }
export async function update(version = "latest"): Promise<InstallResult> { ... }
export async function uninstall(): Promise<void> { ... }
export function resolveSpawnArgs(apiKey: string, port: number): SpawnArgs { ... }
export async function getInstalledVersion(): Promise<string | null> { ... }
export async function getLatestVersion(): Promise<string | null> { ... }
```

`installers/utils.ts`의 `runNpm(['install', NAME_PACKAGE, '--prefix', dir])`을 사용하세요.
`execSync` 또는 셸 보간은 절대 사용하지 마세요.

### 2단계 — 부트스트랩에 등록

`src/lib/services/bootstrap.ts`의 `SERVICES` 배열에 `ServiceEntry`를 추가합니다.

```typescript
{
  tool: "myservice",
  port: NAME_DEFAULT_PORT,
  healthPath: "/health",
  healthIntervalMs: 5_000,
  stopTimeoutMs: 15_000,
  logsBufferBytes: 5_242_880,
  needsApiKey: true, // API 키가 필요하지 않으면 false
}
```

`cfg.tool === "myservice"`를 처리하도록 `buildSpawnArgsFactory()`를 확장합니다.

#### 플러그형 제공자 플러그인 계약(1단계, #7333)

`src/lib/services/providerPlugins/`는 백엔드의 `bootstrap.ts` `ServiceEntry` 필드와
`serviceBackends.ts` 매니페스트 템플릿 필드를 하나의 객체로 패키징하는
`ServiceProviderPlugin` 계약을 도입합니다. 이를 통해 동일한 백엔드의 형태가 서로 관련 없는
두 파일에서 별도로 표현되지 않도록 합니다. 현재 **`9router`만 마이그레이션되었습니다**.
`bootstrap.ts`는 `getServiceProviderPlugin("9router")`
(`src/lib/services/providerPlugins/registry.ts`)에서 `SERVICES[]` 항목을 파생하며,
플러그인이 누락된 경우 시작 오류를 발생시킵니다. `cliproxy`, `mux`, `bifrost`는 변경 없이
기존 인라인 `SERVICES[]` 리터럴을 계속 사용합니다.

`open-sse/config/providerPluginManifest.ts`에는
`SERVICE_BACKEND_MANIFEST_TEMPLATE` 항목에서 올바른 형식의
`ProviderPluginManifestEntry`를 생성하는 부가적인
`createServiceBackendManifestEntry(pluginId, template)` 헬퍼도 추가되었습니다. 이 헬퍼는
아직 어떠한 실제 요청 경로에도 연결되지 않았습니다
(`generateProviderPluginManifestFromRegistry()`와 `/v1/providers/[provider]/models` 모두 포함).
이 작업은 두 번째 백엔드에서 계약이 검증된 후의 후속 작업으로 남아 있습니다.

이슈 #7333에서 추적되며 후속 PR로 연기된 작업은 다음과 같습니다. 동일한 레지스트리를 통한
`cliproxyapi` 마이그레이션, `mux`/`bifrost`를 `ServiceBackendPluginId` 유니온에 포함하도록
일반화, 실행기 라우팅의 특수 처리(`open-sse/executors/index.ts`,
`open-sse/handlers/chatCore/executorProxy.ts`)를 플러그인 계약으로 통합, 그리고
`createServiceBackendManifestEntry()`를 실제 매니페스트/모델 코드 경로에 연결하는 작업입니다.

### 3단계 — 마이그레이션 및 DB 시드 추가

`src/lib/db/migrations/`의 마이그레이션을 통해 서비스가 `version_manager`에 행을
갖도록 해야 합니다. 해당 행은 다음과 같아야 합니다.

```sql
INSERT OR IGNORE INTO version_manager (tool, status, auto_start, provider_expose)
VALUES ('myservice', 'not_installed', 0, 0);
```

### 4단계 — 7개의 API 엔드포인트 생성

`src/app/api/services/{name}/` 아래에 생성합니다.

```
_lib.ts            getOrInitSupervisor() 헬퍼
install/route.ts   POST — installer.install() 호출
start/route.ts     POST — supervisor.start() 호출
stop/route.ts      POST — supervisor.stop() 호출
restart/route.ts   POST — supervisor.restart() 호출
update/route.ts    POST — installer.update() 호출
status/route.ts    GET  — 실시간 상태와 DB 상태 병합
auto-start/route.ts POST — auto_start 플래그 전환
```

공유 `GET /api/services/[name]/logs` 라우트는 이미 연결되어 있으므로 변경할
필요가 없습니다.

모든 오류 응답은 `createErrorResponse()` / `buildErrorBody()`를 통해 처리하세요.

### 5단계 — LOCAL_ONLY_API_PREFIXES에 추가

`src/server/authz/routeGuard.ts`에서 `/api/services/`가 이미 등록되어 있는지 확인하세요.
새 접두사(예: `/api/tools/`)를 도입하는 경우 `LOCAL_ONLY_API_PREFIXES`에 추가하고,
프로세스를 생성한다면 `SPAWN_CAPABLE_PREFIXES`에도 추가하세요.
`tests/unit/authz/routeGuard.test.ts`에 테스트를 추가하세요.

### 6단계 — UI 탭 추가

`src/app/(dashboard)/dashboard/providers/services/tabs/{Name}ServiceTab.tsx`를 생성하세요.
다음 공유 컴포넌트를 재사용하세요.

- `ServiceStatusCard` — 실시간 상태 + 상태 확인 배지
- `ServiceLifecycleButtons` — 시작 / 중지 / 재시작 / 업데이트
- `ServiceLogsPanel` — SSE 로그 테일(`/api/services/{name}/logs`에 연결)
- `ApiKeyCard` — 키 표시 + 교체(`needsApiKey: true`인 경우)

`ServicesPageShell.tsx`에 탭을 등록하세요.

### 7단계 — 제공자 항목 추가(서비스가 라우팅 대상인 경우)

내장 서비스가 OpenAI 호환 `/v1/chat/completions` 엔드포인트를 노출하는 경우:

1. `src/shared/constants/providers.ts`에 `isEmbeddedService: true`인 제공자 항목을 추가하세요.
2. `BaseExecutor`를 확장하는 `open-sse/executors/{name}.ts`를 생성하세요. 요청마다 포트와
   API 키를 다시 조회하세요(생성자에서 절대 캐시하지 마세요). 슈퍼바이저 상태가 `"running"`이
   아닐 때는 `503 service_not_running` 응답을 반환하세요.
3. `open-sse/config/providerRegistry.ts`에 서비스 접두사
   (예: `myservice/sub/model`)를 사용하여 모델을 등록하세요. `modelSync.ts`가 모델을 최신 상태로 유지합니다.

### 8단계 — 문서화 및 테스트

1. `docs/frameworks/EMBEDDED-SERVICES.md`(이 파일)를 업데이트하세요. §1의 표에 서비스를
   추가하고 §4에 새 엔드포인트를 추가하세요.
2. `tests/unit/services/`에 단위 테스트(수명 주기, 설치 프로그램, API 형식)를 추가하세요.
3. `tests/integration/services/`에 통합 테스트를 추가하세요(`RUN_SERVICES_INT=1`로 활성화).
4. 새 엔드포인트를 `docs/openapi.yaml`에 추가하세요.

---

## 7. 문제 해결

### 서비스가 시작되지 않음

**증상:** 시작 버튼을 누르면 503이 반환되고, 상태가 `"error"` 또는 `"starting"`에 머뭅니다.

**확인 목록:**

1. `GET /api/services/{name}/logs`(또는 대시보드의 로그 패널)를 확인합니다. `Error: ENOENT`, `address already in use`, `Cannot find module`과 같은 줄을 찾습니다.
2. PATH에 `npm`이 포함되어 있는지 확인합니다. OmniRoute를 실행하는 동일한 사용자 계정에서 `which npm`을 실행합니다.
3. 서비스가 설치되어 있는지 확인합니다. `GET /api/services/{name}/status`에서 `installedVersion`을 확인합니다. 값이 `null`이면 먼저 설치를 실행합니다.
4. `DATA_DIR/services/{name}/node_modules/`가 존재하고 비어 있지 않은지 확인합니다.
5. 상태 응답의 `lastError` 필드에서 정제된 종료 사유를 확인합니다.

---

### 콜드 스타트가 느림(`running`에 도달하는 데 10초 초과)

**증상:** `"running"` 또는 `"error"`로 전환되기 전까지 상태가 오랫동안 `"starting"`에 머뭅니다.

**설명:** 9Router의 콜드 스타트에는 대규모 종속성 트리(DNS, 터널, MITM 모듈)를 가져오는 과정이 포함됩니다. 기본 상태 확인 간격은 2초이며, supervisor가 시간 초과를 선언하기 전에 3번 시도합니다(이후에도 폴링은 계속함).

**해결 방법:** `healthIntervalMs`와 `waitForHealthy` 시간 초과(`healthIntervalMs * 3`)는 `bootstrap.ts`에서 구성할 수 있습니다. 시작 시간이 더 오래 걸리는 서비스의 경우 `healthIntervalMs`를 5000으로, `stopTimeoutMs`를 30 000으로 늘립니다.

---

### 포트 충돌(`EADDRINUSE`)

**증상:** 로그에 `address already in use :::20130`이 표시됩니다.

**원인:**

- 다른 프로세스가 이미 포트 20130을 사용 중입니다.
- 이전 9Router 프로세스가 완전히 중지되지 않았습니다(좀비 PID).

**해결 방법:**

1. `.env`의 `NINEROUTER_PORT` 환경 변수를 통해 기본 포트를 변경합니다.
2. 충돌하는 프로세스를 찾아 종료합니다. `lsof -ti :20130 | xargs kill -9`.
3. 포트는 `bootstrap.ts`의 `port` 필드를 통해 서비스별로 구성할 수 있습니다.

**참고:** 9Router는 OmniRoute의 기본 포트 20128과의 충돌을 방지하기 위해 기본적으로 포트 20130을 사용합니다.

---

### 설치 시 권한 거부(EACCES)

**증상:** 설치 시 500이 반환되고, 로그에 `EACCES` 또는 `permission denied`가 표시됩니다.

**원인:**

- OmniRoute 프로세스에 `DATA_DIR` 또는 그 상위 디렉터리에 대한 쓰기 권한이 없습니다.
- 매핑된 볼륨에 대한 쓰기 권한 없이 루트리스 Docker 내부에서 실행 중입니다.

**해결 방법:**

1. `DATA_DIR`(기본값: `~/.omniroute/`)을 확인합니다. `ls -la ~/.omniroute/`
2. OmniRoute 프로세스 사용자가 디렉터리를 소유하는지 확인합니다. `chown -R $USER ~/.omniroute/`
3. Docker에서는 볼륨 마운트에 컨테이너 사용자에 대한 올바른 권한이 설정되어 있는지 확인합니다.

---

### 업데이트 실패(`npm install` 시간 초과 또는 네트워크 오류)

**증상:** 업데이트 시 `InstallError`와 함께 500이 반환되고, 로그에 네트워크 시간 초과가 표시됩니다.

**확인 목록:**

1. npm 레지스트리에 연결할 수 있는지 확인합니다. `npm ping`.
2. 회사 프록시가 있는지 확인합니다. `npm config get proxy`, `npm config get https-proxy`.
3. 수동으로 설치해 봅니다. `npm install {package}@latest --prefix ~/.omniroute/services/{name}/`.
4. 에어 갭 환경에서는 tarball을 미리 다운로드한 후 `npm install /path/to/tarball.tgz`를 사용합니다.

---

### 시작 직후 서비스에 `"error"` 상태가 표시됨(빠른 충돌)

**증상:** 상태가 5초 이내에 `"starting"`에서 `"error"`로 전환됩니다. `lastError`에 `"Fast crash (exited with code 1)"`이 표시됩니다.

**확인 목록:**

1. 전체 로그 끝부분을 확인합니다. `GET /api/services/{name}/logs?tail=500`.
2. 일반적인 원인은 서비스에서 요구하는 환경 변수가 누락된 경우입니다.
3. 9Router의 경우 프로세스 생성 시 전달되는 환경 변수에 `NINEROUTER_DISABLE_MITM=true`와 `NINEROUTER_DISABLE_TUNNEL=true`가 포함되어 있는지 확인합니다(`installers/ninerouter.ts`의 `resolveSpawnArgs` 참조).

---

## 8. FAQ

**Q: 임베디드 서비스 엔드포인트를 루프백이 아닌 클라이언트에 노출할 수 있나요?**

아니요. LOCAL_ONLY 티어는 의도적으로 적용된 정책입니다(엄격한 규칙 #17). `npm install`을 호출하거나 `node` 프로세스를 생성할 수 있는 라우트는 루프백이 아닌 트래픽에서 접근할 수 없어야 합니다. 그렇지 않으면 터널(Cloudflare, Ngrok, Tailscale)을 통해 JWT가 유출되었을 때 임의의 프로세스를 생성할 수 있기 때문입니다. `/api/services/`에는 예외가 없습니다. `/api/mcp/`와 달리 관리 범위 우회 목록에서 제외됩니다. `docs/security/ROUTE_GUARD_TIERS.md`를 참조하세요.

---

**Q: 프로덕션/클라우드 배포에서 9Router와 CLIProxyAPI를 사용할 수 있나요?**

예. 두 서비스 모두 OmniRoute 자체와 동일한 로컬 우선 모델을 따릅니다. 동일한 머신에서 실행되며 루프백을 통해 통신합니다. 여기서 "프로덕션"은 원격 클라우드 제공업체가 아니라 OmniRoute가 배포된 VPS 또는 로컬 서버를 의미합니다.

---

**Q: 슈퍼바이저를 디버깅하려면 어떻게 해야 하나요?**

1. SSE 로그 스트림을 실시간으로 확인합니다: `curl -N http://localhost:20128/api/services/9router/logs`.
2. OmniRoute의 pino 출력에서 `service:supervisor` 네임스페이스로 필터링된 구조화 로그를 확인합니다.
3. DB 행을 검사합니다: `sqlite3 ~/.omniroute/omniroute.db "SELECT * FROM version_manager WHERE tool='9router'"`.
4. `GET /api/services/9router/status`를 사용하여 현재 실시간 상태, PID, 상태 점검 결과 및 `lastError`를 한 번의 호출로 확인합니다.

---

**Q: 슈퍼바이저에서 `health: "degraded"` 또는 `health: "unknown"`이 표시되지만 상태는 `"running"`입니다. 문제가 있나요?**

`"degraded"`는 상태 점검 프로브가 200이 아닌 응답을 반환했다는 의미입니다. `"unknown"`은 아직 완료된 프로브가 없다는 의미입니다(첫 번째 폴링과의 경합). 두 상태 모두 시작 중에는 일시적으로 나타날 수 있습니다. `"running"` 상태가 된 후 `healthIntervalMs * 3` ms 넘게 상태가 `"degraded"`로 유지된다면, 임베디드 서비스는 실행 중이지만 HTTP API가 응답하지 않는 것입니다. 상태 응답에 표시된 포트가 올바른지, 그리고 서비스가 실제로 해당 포트에서 수신 대기 중인지 확인하세요.

---

**Q: 전체 재시작 없이 9Router API 키를 변경할 수 있나요?**

아니요. API 키는 프로세스 생성 시 환경 변수를 통해 9Router에 전달됩니다. 실행 중인 프로세스의 환경 변수는 변경할 수 없습니다. `POST .../rotate-key`는 새 키를 적용하기 위해 서비스를 자동으로 중지한 후 다시 시작합니다. 키 교체는 서비스의 `stopTimeoutMs`(기본값 15초)에 시작 시간을 더한 시간 이내에 적용됩니다.

---

**Q: 링 버퍼의 제한은 얼마이며, 가득 차면 어떻게 되나요?**

각 서비스에는 전용 5 MB 링 버퍼가 있습니다. 버퍼가 가득 차면 새 로그 줄을 위한 공간을 확보하기 위해 가장 오래된 로그 줄부터 제거됩니다. SSE `snapshot` 이벤트는 `tail` 제한 내에서 가장 최근의 로그 줄을 반환합니다. DB 행에 `logsBufferPath`가 설정되어 있지 않으면 로그는 디스크에 영구 저장되지 않습니다.

---

## 참고 항목

- `docs/security/ROUTE_GUARD_TIERS.md` — LOCAL_ONLY 티어 세부 정보
- `docs/architecture/CODEBASE_DOCUMENTATION.md` — §3.2 임베디드 서비스 모듈 매핑
- `docs/architecture/ARCHITECTURE.md` — 시스템 수준 컨텍스트
- `docs/openapi.yaml` — 머신 판독 가능한 엔드포인트 정의
- `CLAUDE.md` §"새 임베디드 서비스 추가" — 빠른 참조용 체크리스트
