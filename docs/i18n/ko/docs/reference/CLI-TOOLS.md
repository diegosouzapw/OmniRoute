# CLI-TOOLS (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../reference/CLI-TOOLS.md) · 🇸🇦 [ar](../../../ar/docs/reference/CLI-TOOLS.md) · 🇦🇿 [az](../../../az/docs/reference/CLI-TOOLS.md) · 🇧🇬 [bg](../../../bg/docs/reference/CLI-TOOLS.md) · 🇧🇩 [bn](../../../bn/docs/reference/CLI-TOOLS.md) · 🇨🇿 [cs](../../../cs/docs/reference/CLI-TOOLS.md) · 🇩🇰 [da](../../../da/docs/reference/CLI-TOOLS.md) · 🇩🇪 [de](../../../de/docs/reference/CLI-TOOLS.md) · 🇪🇸 [es](../../../es/docs/reference/CLI-TOOLS.md) · 🇮🇷 [fa](../../../fa/docs/reference/CLI-TOOLS.md) · 🇫🇮 [fi](../../../fi/docs/reference/CLI-TOOLS.md) · 🇫🇷 [fr](../../../fr/docs/reference/CLI-TOOLS.md) · 🇮🇳 [gu](../../../gu/docs/reference/CLI-TOOLS.md) · 🇮🇱 [he](../../../he/docs/reference/CLI-TOOLS.md) · 🇮🇳 [hi](../../../hi/docs/reference/CLI-TOOLS.md) · 🇭🇺 [hu](../../../hu/docs/reference/CLI-TOOLS.md) · 🇮🇩 [id](../../../id/docs/reference/CLI-TOOLS.md) · 🇮🇹 [it](../../../it/docs/reference/CLI-TOOLS.md) · 🇯🇵 [ja](../../../ja/docs/reference/CLI-TOOLS.md) · 🇮🇳 [mr](../../../mr/docs/reference/CLI-TOOLS.md) · 🇲🇾 [ms](../../../ms/docs/reference/CLI-TOOLS.md) · 🇳🇱 [nl](../../../nl/docs/reference/CLI-TOOLS.md) · 🇳🇴 [no](../../../no/docs/reference/CLI-TOOLS.md) · 🇵🇭 [phi](../../../phi/docs/reference/CLI-TOOLS.md) · 🇵🇱 [pl](../../../pl/docs/reference/CLI-TOOLS.md) · 🇵🇹 [pt](../../../pt/docs/reference/CLI-TOOLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/reference/CLI-TOOLS.md) · 🇷🇴 [ro](../../../ro/docs/reference/CLI-TOOLS.md) · 🇷🇺 [ru](../../../ru/docs/reference/CLI-TOOLS.md) · 🇸🇰 [sk](../../../sk/docs/reference/CLI-TOOLS.md) · 🇸🇪 [sv](../../../sv/docs/reference/CLI-TOOLS.md) · 🇰🇪 [sw](../../../sw/docs/reference/CLI-TOOLS.md) · 🇮🇳 [ta](../../../ta/docs/reference/CLI-TOOLS.md) · 🇮🇳 [te](../../../te/docs/reference/CLI-TOOLS.md) · 🇹🇭 [th](../../../th/docs/reference/CLI-TOOLS.md) · 🇹🇷 [tr](../../../tr/docs/reference/CLI-TOOLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/reference/CLI-TOOLS.md) · 🇵🇰 [ur](../../../ur/docs/reference/CLI-TOOLS.md) · 🇻🇳 [vi](../../../vi/docs/reference/CLI-TOOLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/reference/CLI-TOOLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/reference/CLI-TOOLS.md)

---

---

title: "CLI 도구 — OmniRoute"
version: 3.8.50
lastUpdated: 2026-08-18
---

# CLI 도구 — OmniRoute

마지막 업데이트: 2026-08-18

OmniRoute는 세 가지 전용 대시보드 페이지에 걸쳐 세 가지 범주의 CLI 도구와 통합됩니다:

| 페이지           | 경로                    | 개념                                                                   | 수량            |
| ---------------- | ----------------------- | ---------------------------------------------------------------------- | --------------- |
| **CLI 코드**     | `/dashboard/cli-code`   | OmniRoute를 가리키는 코딩 도구 (클라이언트 → CLI → OmniRoute → 공급자) | 26              |
| **CLI 에이전트** | `/dashboard/cli-agents` | OmniRoute를 가리키는 자율 에이전트 (같은 흐름, 더 넓은 범위)           | 8               |
| **ACP 에이전트** | `/dashboard/acp-agents` | OmniRoute가 stdio/ACP를 통해 백엔드로 생성하는 CLI (역방향 흐름)       | 레지스트리 참조 |

레거시 경로는 308을 통해 리디렉션됩니다: `/dashboard/cli-tools` → `/dashboard/cli-code`, `/dashboard/agents` → `/dashboard/acp-agents`.

---

## 작동 방식

```
CLI 코드 / CLI 에이전트 (소비 흐름):
Claude / Codex / OpenCode / Cline / KiloCode / Continue / Hermes Agent / Goose / ...
           │
           ▼  (모두 OmniRoute를 가리킴)
    http://YOUR_SERVER:20128/v1
           │
           ▼  (OmniRoute가 올바른 공급자로 라우팅)
    Anthropic / OpenAI / Gemini / DeepSeek / Groq / Mistral / ...

ACP 에이전트 (역방향 생성 흐름):
    클라이언트 요청 → OmniRoute → stdio/ACP를 통해 CLI 생성 → 응답
```

**장점:**

- 모든 도구를 관리할 수 있는 하나의 API 키
- 대시보드에서 모든 CLI의 비용 추적
- 모든 도구를 재구성하지 않고 모델 전환
- 로컬 및 원격 서버(VPS, Docker, Akamai, Cloudflare Tunnel)에서 작동

---

## `setup-*`로 자동 구성

각 도구의 구성을 수동으로 작성할 필요가 없습니다. OmniRoute는 실행 중인 OmniRoute(로컬 또는 원격)에서 **실시간** 모델 카탈로그를 읽고 도구의 자체 구성을 귀하의 머신에 작성하는 `setup-*` 명령을 제공합니다:

```bash
omniroute setup-codex        omniroute setup-claude       omniroute setup-opencode
omniroute setup-cline        omniroute setup-kilo         omniroute setup-continue
omniroute setup-cursor       omniroute setup-roo          omniroute setup-crush
omniroute setup-goose        omniroute setup-qwen         omniroute setup-aider
```

각 명령은 `--remote <url> --api-key <key>` (원격 OmniRoute에 대해 로컬 도구 구성), `--dry-run` (작성하지 않고 미리보기), 및 `--port`를 수용합니다. 모델 자동 검색이 없는 도구(Cline, Kilo, Roo, Goose, Aider, Qwen)는 `--model <id>` (비대화형 실행을 위한 `--yes`)를 사용합니다. 올바른 환경이 주입되고 전혀 구성되지 않은 CLI를 실행하려면 일반적인 `omniroute run <target>` 실행기를 사용하십시오 (claude, codex, aider, goose, opencode, qwen, gemini — 대상 및 별칭은 `bin/cli/cli-manifest.mjs`에서 가져옵니다); 레거시 도구별 실행기 `omniroute launch` (Claude Code) 및 `omniroute launch-codex` (Codex)도 사용할 수 있습니다. Gemini CLI는 실행 전용입니다: `omniroute run` 대상이지만 `setup-*`/`configure` 레시피가 없습니다.

> **전체 참조:** 마스터 테이블 — 각 명령이 작성하는 내용, 모든 플래그, 로컬 대 원격, `/v1` 접미사를 원하는 도구 — 는 **[CLI 통합](../guides/CLI-INTEGRATIONS.md)**에 있습니다.

### 컨테이너 내에서 실행하기

OmniRoute 컨테이너 내에서 실행된 `setup-*` 명령은 컨테이너의 자체 홈에 작성되며, 이는 호스트 CLI가 읽지 않으며 컨테이너와 함께 사라집니다. OmniRoute는 이를 감지하고 작성하는 대신 지침과 함께 `2`로 종료합니다. 두 가지 지원되는 방법 — 호스트에 CLI를 설치하고 `omniroute connect`를 통해 컨테이너에 연결하거나, 구성 디렉토리를 바인드 마운트하고 `CLI_CONFIG_HOME`을 설정합니다 (compose `host` 프로필). 모든 `setup-*` 명령, plus `omniroute configure` 및 `omniroute config set`는 컨테이너의 자체 CLI를 구성하는 것이 실제로 의미하는 경우 `--allow-container-write`를 수용합니다; `OMNIROUTE_ALLOW_CONTAINER_CONFIG_WRITE=true`는 서버에 대해 동일한 작업을 수행합니다. [Docker 가이드 → 호스트 CLI 도구 구성](../guides/DOCKER_GUIDE.md#configuring-host-cli-tools-when-omniroute-runs-in-docker)을 참조하십시오.

대시보드의 **적용 엔드포인트** (`POST /api/cli-tools/apply`)는 동일한 보호 장치를 시행합니다: 컨테이너 내에서 호스트에서 바인드 마운트되지 않은 대상을 대상으로 하는 쓰기는 **`422`**로 응답하며 `containerEphemeralTarget: true`, 안전한 오류 텍스트 및 — 호스트 레시피가 있는 도구(claude, codex, opencode, cline, kilo, continue)에 대해 — 호스트에서 실행할 `hostSetupCommand` (예: `omniroute setup-opencode`)를 제공합니다; 아무것도 작성되지 않습니다. `dryRun: true`는 컨테이너 모드에서도 작동하며 디스크를 건드리지 않고 생성된 콘텐츠 + 대상 경로를 반환하므로 대시보드에서 미리 보고 호스트에서 적용할 수 있습니다. 이 동작은 의도적이며 `tests/unit/api/cli-tools/apply-container-guard.test.ts`에 의해 회귀 방지됩니다 — 422를 "수정"하여 보호 장치를 제거하지 마십시오.

---

## 진실의 출처

통합 카탈로그는 `src/shared/constants/cliTools.ts`에 `CLI_TOOLS: Record<string, CliCatalogEntry>`로 존재합니다.

각 항목은 다음 필드를 가지고 있습니다 (정의는 `src/shared/schemas/cliCatalog.ts`에 있음):

| 필드                                            | 타입                                                         | 설명                                                     |
| ----------------------------------------------- | ------------------------------------------------------------ | -------------------------------------------------------- |
| `category`                                      | `"code" \| "agent"`                                          | 도구가 나타나는 페이지                                   |
| `vendor`                                        | `string`                                                     | 도구 출처 ("Anthropic", "OSS (P. Gauthier)")             |
| `acpSpawnable`                                  | `boolean`                                                    | ACP 에이전트로도 사용 가능 (배지 표시됨)                 |
| `baseUrlSupport`                                | `"full" \| "partial" \| "none"`                              | 사용자 정의 엔드포인트 지원 수준. `"none"` = MITM 백로그 |
| `configType`                                    | `"env" \| "custom" \| "guide" \| "custom-builder" \| "mitm"` | 구성 메커니즘                                            |
| `id`, `name`, `color`, `description`, `docsUrl` | 표준                                                         | 핵심 표시 필드                                           |

`baseUrlSupport: "none"`인 항목은 **대시보드 페이지에 표시되지 않습니다** — 이들은 계획 11의 MITM 백로그에 등록됩니다 (참조: `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`).

### 기능 계층 (카탈로그화 × 감지 가능 × 구성 가능 × 실행 가능)

모든 카탈로그화된 도구가 감지 가능, 구성 가능 또는 실행 가능한 것은 아닙니다. 각 계층은 하나의 선언 소스를 가지고 있으며, 드리프트 테스트가 이들을 정렬 상태로 유지합니다:

| 계층           | 의미                                                         | 선언된 위치                                                       |
| -------------- | ------------------------------------------------------------ | ----------------------------------------------------------------- |
| **카탈로그화** | 대시보드 카탈로그에 나타남 (이름, 공급업체, 문서, 구성 유형) | `src/shared/constants/cliTools.ts` (`CLI_TOOLS`)                  |
| **감지 가능**  | 바이너리/구성 감지, 상태 검사, 구성 경로                     | `src/shared/services/cliRuntime.ts` (`CLI_TOOLS` 런타임 카탈로그) |
| **구성 가능**  | `omniroute configure <cli>`로 지원됨 (설정 레시피 존재)      | `bin/cli/cli-manifest.mjs` (`configure: true`)                    |
| **실행 가능**  | `omniroute run <target>`로 지원됨 (env/args 주입 정의됨)     | `bin/cli/cli-manifest.mjs` (`run: true`)                          |

`bin/cli/cli-manifest.mjs`는 CLI 명령의 정식 실행 가능 매니페스트입니다: `run`, `configure` 및 셸 완성 생성기는 모두 그로부터 대상 목록, 별칭 해석 (예: `kilocode`/`kilo-code`/`kilo_cli` → `kilo`) 및 `--model` 플래그 배선을 파생합니다. 드리프트 가드는
`tests/unit/cli/cli-manifest-drift.test.ts`가 매니페스트, 런타임 카탈로그, UI 카탈로그 및 모든 소비자 표면이 동기화 상태를 유지하도록 보장합니다 — 하나의 표면에 추가된 대상이 다른 표면에 없으면 테스트가 실패하고 조용히 드리프트되지 않습니다.

---

## 1. CLI 코드 카탈로그 (26 도구)

`/dashboard/cli-code`에 나타나는 모든 도구. `baseUrlSupport: none`인 도구는 사용자 정의 기본 URL 대신 MITM 또는 수동 가이드를 통해 연결됩니다:

| id           | name                    | vendor              | baseUrlSupport | configType     | acpSpawnable |
| ------------ | ----------------------- | ------------------- | -------------- | -------------- | ------------ |
| claude       | Claude Code             | Anthropic           | full           | env            | true         |
| codex        | OpenAI Codex CLI        | OpenAI              | full           | custom         | true         |
| zcode        | ZCode (GLM Coding Plan) | Z.ai                | none           | custom         | false        |
| cline        | Cline                   | OSS (ex-Claude Dev) | full           | custom         | true         |
| kilo         | Kilo Code               | Kilo-Org            | full           | custom         | false        |
| roo          | Roo Code                | Roo (OSS)           | full           | guide          | false        |
| continue     | Continue                | continue.dev        | full           | guide          | false        |
| aider        | Aider                   | OSS (P. Gauthier)   | full           | guide          | true         |
| forge        | ForgeCode               | Antinomy HQ         | full           | custom         | true         |
| jcode        | jcode                   | 1jehuang (OSS)      | full           | custom         | false        |
| deepseek-tui | DeepSeek TUI            | Hunter Bown (OSS)   | full           | custom         | false        |
| codewhale    | CodeWhale               | Hmbown (OSS)        | full           | custom         | false        |
| opencode     | OpenCode                | Anomaly (ex-SST)    | full           | guide          | true         |
| droid        | Factory Droid           | Factory AI          | partial        | guide          | false        |
| copilot      | GitHub Copilot CLI      | GitHub/MS           | full           | custom         | false        |
| cursor-cli   | Cursor CLI              | Anysphere           | partial        | guide          | true         |
| smelt        | Smelt                   | leonardcser (OSS)   | full           | custom         | false        |
| pi           | Pi (pi-coding-agent)    | M. Zechner (OSS)    | full           | custom         | false        |
| grok-build   | Grok Build              | xAI                 | full           | custom         | false        |
| crush        | Crush                   | OSS (Charm)         | full           | custom         | false        |
| qwen         | Qwen Code               | Alibaba             | full           | guide          | true         |
| cursor       | Cursor                  | Anysphere           | none           | guide          | false        |
| antigravity  | Antigravity             | Google              | none           | mitm           | false        |
| hermes       | Hermes                  | Nous Research       | none           | guide          | false        |
| kiro         | Kiro AI                 | Amazon              | none           | mitm           | false        |
| custom       | Custom CLI              | —                   | full           | custom-builder | false        |

`baseUrlSupport: "partial"`인 도구는 대시보드 카드에 "⚠ Base URL parcial" 배지를 표시합니다.
---

## 2. CLI 에이전트 카탈로그 (8 도구)

`/dashboard/cli-agents`에 나타나는 자율 에이전트:

| id           | name             | vendor                   | baseUrlSupport | acpSpawnable |
| ------------ | ---------------- | ------------------------ | -------------- | ------------ |
| hermes-agent | Hermes Agent     | Nous Research            | full           | false        |
| openclaw     | OpenClaw         | OSS (P. Steinberger)     | full           | true         |
| goose        | Goose            | Block / Linux Foundation | full           | true         |
| interpreter  | Open Interpreter | OSS                      | full           | true         |
| warp         | Warp AI          | Warp Inc.                | partial        | true         |
| agent-deck   | Agent Deck       | asheshgoplani (OSS)      | full           | false        |
| omp          | Oh My Pi         | OSS                      | full           | true         |
| letta        | Letta CLI        | Letta                    | full           | false        |

---

## 3. ACP 에이전트 (/dashboard/acp-agents)

이 페이지는 `/dashboard/agents`에서 이름이 변경되었으며, OmniRoute가 stdio/ACP 프로토콜을 통해 **생성**할 수 있는 백엔드 실행 엔진으로서의 CLI를 보여줍니다. 카탈로그는 `src/lib/acp/registry.ts`에서 별도로 유지되며 `CLI_TOOLS`와는 **다릅니다**.

---

## 4. MITM 백로그 (대시보드에 표시되지 않음)

다음 CLI는 기본 URL을 기본적으로 지원하지 않으며 CLI 코드 또는 CLI 에이전트 페이지에 **나열되지 않습니다**. 이들은 계획 11에서 MITM 가로채기의 후보입니다:

| CLI                 | 이유                                                 |
| ------------------- | ---------------------------------------------------- |
| windsurf            | BYOK는 선택된 Claude 모델 + 기업 URL/토큰으로 제한됨 |
| amp                 | 폐쇄 생태계 (Sourcegraph)                            |
| amazon-q / kiro-cli | AWS SSO 인증, 사용자 정의 URL 없음                   |
| cowork              | Anthropic Desktop, 구성 가능한 엔드포인트 없음       |

전체 교차 참조는 `_tasks/features-v3.8.6/refactorpages/_orchestration/_plan11-mitm-backlog.md`를 참조하십시오.

---

## 5. 배치 감지 API

모든 도구 감지는 단일 엔드포인트를 통해 집계됩니다:

**`GET /api/cli-tools/all-statuses`**

- 인증: `requireCliToolsAuth(request)` (다른 `/api/cli-tools/` 경로와 동일)
- 반환: `Record<toolId, ToolBatchStatus>` (유형: `src/shared/types/cliBatchStatus.ts`)
- 전략: 모든 도구에 대해 `Promise.all`, 도구당 5초 타임아웃
- 캐시: 구성 파일 `mtime`로 인덱싱된 메모리 LRU. mtime이 변경될 때 캐시가 무효화됩니다. 서버 재시작 시 초기화됩니다.

도구별 응답 형식:

```ts
interface ToolBatchStatus {
  detection: {
    installed: boolean;
    runnable: boolean;
    version?: string;
    command?: string;
    commandPath?: string;
    reason?: string;
  };
  config: {
    status: "configured" | "not_configured" | "not_installed" | "unknown" | "other";
    endpoint?: string | null;
    lastConfiguredAt?: string | null;
  };
  error?: string; // 정리됨, 스택 추적 없음
}
```

## 6. 새로운 도구를 위한 설정 핸들러

`configType: "custom"`인 새로운 도구는 전용 설정 API 경로를 가지고 있습니다:

| 경로                                        | 도구                                                            |
| ------------------------------------------- | --------------------------------------------------------------- |
| `POST /api/cli-tools/forge-settings`        | ForgeCode (.forge.toml)                                         |
| `POST /api/cli-tools/jcode-settings`        | jcode (--base-url 플래그)                                       |
| `POST /api/cli-tools/deepseek-tui-settings` | DeepSeek TUI (OPENAI_BASE_URL, 레거시)                          |
| `POST /api/cli-tools/codewhale-settings`    | CodeWhale (OPENAI_BASE_URL, 기본 + 레거시 `~/.deepseek` 동기화) |
| `POST /api/cli-tools/smelt-settings`        | Smelt                                                           |
| `POST /api/cli-tools/pi-settings`           | Pi 코딩 에이전트                                                |
| `POST /api/cli-tools/grok-build-settings`   | Grok Build (~/.grok/config.toml, `[model.omniroute]`)           |
| `POST /api/cli-tools/qwen-settings`         | Qwen Code (`~/.qwen/settings.json` + 전용 `.env` 키)            |

모든 경로는 오류 응답을 위해 `sanitizeErrorMessage()`를 사용합니다 (하드 룰 #12).

---

## 7. 대시보드 페이지 아키텍처

### CLI 코드 (`/dashboard/cli-code`)

- `src/app/(dashboard)/dashboard/cli-code/page.tsx` — 서버 컴포넌트
- `src/app/(dashboard)/dashboard/cli-code/CliCodePageClient.tsx` — 클라이언트 그리드
- `src/app/(dashboard)/dashboard/cli-code/[id]/page.tsx` — 도구 상세 페이지
- `src/app/(dashboard)/dashboard/cli-code/components/` — 12개의 전문 도구 카드 + `ToolDetailClient.tsx`

### CLI 에이전트 (`/dashboard/cli-agents`)

- `src/app/(dashboard)/dashboard/cli-agents/page.tsx` — 서버 컴포넌트
- `src/app/(dashboard)/dashboard/cli-agents/CliAgentsPageClient.tsx` — 클라이언트 그리드
- `src/app/(dashboard)/dashboard/cli-agents/[id]/page.tsx` — `ToolDetailClient` 재사용

### ACP 에이전트 (`/dashboard/acp-agents`)

- `src/app/(dashboard)/dashboard/acp-agents/page.tsx` — 서버 컴포넌트 (이동됨 `agents/`에서)

### 공유 UI 컴포넌트 (`src/shared/components/cli/`)

| 파일                    | 목적                                            |
| ----------------------- | ----------------------------------------------- |
| `CliToolCard.tsx`       | 스마트 상태 카드 (탐지 + 구성 + 엔드포인트)     |
| `CliConceptCard.tsx`    | 페이지별 개념 설명 카드                         |
| `CliComparisonCard.tsx` | CLI 유형 간의 3열 비교                          |
| `BaseUrlSelect.tsx`     | 엔드포인트 드롭다운 (로컬/클라우드/사용자 정의) |
| `ApiKeySelect.tsx`      | API 키 선택기                                   |
| `ManualConfigModal.tsx` | 복사 가능한 구성 스니펫 모달                    |

### 공유 훅 (`src/shared/hooks/cli/`)

| 파일                      | 목적                                                                       |
| ------------------------- | -------------------------------------------------------------------------- |
| `useToolBatchStatuses.ts` | `/api/cli-tools/all-statuses`를 가져오고, 로딩/새로 고침 상태를 관리합니다 |

## 8. i18n

플랜 14 F9에 추가된 새로운 네임스페이스:

| 네임스페이스 | 목적                                                            |
| ------------ | --------------------------------------------------------------- |
| `cliCommon`  | 공유 문자열 (카드 레이블, 개념/비교 텍스트, 상세 페이지 레이블) |
| `cliCode`    | CLI 코드의 페이지 문자열                                        |
| `cliAgents`  | CLI 에이전트 페이지 문자열                                      |
| `acpAgents`  | ACP 에이전트 페이지 문자열                                      |

전체 PT-BR 및 EN 번역이 제공됩니다. 39개의 다른 로케일은 `src/i18n/request.ts`에서 네임스페이스 수준 병합을 통해 자동으로 EN으로 대체됩니다.

---

## 9. 빠른 시작

### 단계 1 — OmniRoute API 키 받기

1. `/dashboard/api-manager`를 엽니다 → **API 키 생성**
2. 이름을 지정합니다 (예: `cli-tools`) 및 모든 권한 선택
3. 키를 복사합니다 — 아래의 모든 CLI에 필요합니다

> 당신의 키는 다음과 같습니다: `sk-xxxxxxxxxxxxxxxx-xxxxxxxxx`

---

### 단계 2 — CLI 도구 설치

모든 npm 기반 도구는 Node.js 22.22.2+ 또는 24.x가 필요합니다:

```bash
# Claude Code (Anthropic)
npm install -g @anthropic-ai/claude-code

# OpenAI Codex
npm install -g @openai/codex

# OpenCode
npm install -g opencode-ai

# Cline
npm install -g cline

# KiloCode
npm install -g kilocode

# Qwen Code
npm install -g @qwen-code/qwen-code

# Google Gemini CLI (launchable via `omniroute run gemini` → /v1beta surface)
npm install -g @google/gemini-cli

# Aider
pip install aider-chat

# Smelt
cargo install smelt  # Rust 기반

# Pi coding agent
# 설치는 https://github.com/zechnerj/pi-coding-agent를 참조하세요.

# jcode
# 설치는 https://github.com/1jehuang/jcode를 참조하세요.
```

---

### 단계 3 — 대시보드에서 구성

1. `http://localhost:20128/dashboard/cli-code`로 이동합니다
2. 그리드에서 도구를 찾습니다
3. 카드를 클릭하여 도구 상세 페이지를 엽니다
4. API 키와 기본 URL을 선택합니다
5. **구성 적용**을 클릭하거나 수동 구성 스니펫을 복사합니다

---

### 단계 4 — 전역 환경 변수 설정

```bash
# OmniRoute 범용 엔드포인트
export OPENAI_BASE_URL="http://localhost:20128/v1"
export OPENAI_API_KEY="sk-your-omniroute-key"
export ANTHROPIC_BASE_URL="http://localhost:20128"
export ANTHROPIC_AUTH_TOKEN="sk-your-omniroute-key"
# Gemini CLI는 ROOT에서 GOOGLE_GEMINI_BASE_URL을 읽습니다 (SDK가 /v1beta/...를 자동으로 추가합니다)
export GOOGLE_GEMINI_BASE_URL="http://localhost:20128"
export GEMINI_API_KEY="sk-your-omniroute-key"
```

> **원격 서버**의 경우 `localhost:20128`을 서버 IP 또는 도메인으로 교체하세요,
> 예: `http://<your-server-ip>:20128`.

---

### 단계 4 — 각 도구 구성

#### Claude Code

```bash
# ~/.claude/settings.json 생성:
mkdir -p ~/.claude && cat > ~/.claude/settings.json << EOF
{
  "env": {
    "ANTHROPIC_BASE_URL": "http://localhost:20128",
    "ANTHROPIC_AUTH_TOKEN": "sk-your-omniroute-key"
  }
}
EOF
```

Claude Code에 대해 통합된 Anthropic 게이트웨이 루트를 사용하세요. 여기서 `/v1`을 추가하지 마세요.

**테스트:** `claude "say hello"`

---

#### OpenAI Codex

현대 Codex (v0.137+)는 `~/.codex/config.toml`만 읽습니다 — 이전
`config.yaml`은 레거시 npm CLI에 속하며 무시됩니다. API
키는 `OMNIROUTE_API_KEY` 환경 변수 (`env_key`)에 남아 있으며,
파일 내부에는 절대 포함되지 않습니다:

```bash
mkdir -p ~/.codex && cat > ~/.codex/config.toml << EOF
model_provider = "omniroute"

[model_providers.omniroute]
name                 = "OmniRoute"
base_url             = "http://localhost:20128/v1"
env_key              = "OMNIROUTE_API_KEY"
requires_openai_auth = false
EOF
export OMNIROUTE_API_KEY="sk-your-omniroute-key"
```

전체 참조 (프로필, `wire_api`, 컨텍스트 윈도우): [CODEX-CLI-CONFIGURATION.md](../guides/CODEX-CLI-CONFIGURATION.md).

**테스트:** `codex "what is 2+2?"`

---

#### OpenCode

```bash
mkdir -p ~/.config/opencode && cat > ~/.config/opencode/opencode.json << EOF
{
  "\$schema": "https://opencode.ai/config.json",
  "provider": {
    "omniroute": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "OmniRoute",
      "options": {
        "baseURL": "http://localhost:20128/v1",
        "apiKey": "sk-your-omniroute-key"
      },
      "models": {
        "claude-sonnet-4-5": { "name": "claude-sonnet-4-5" },
        "claude-sonnet-4-5-thinking": { "name": "claude-sonnet-4-5-thinking" },
        "gemini-3-flash": { "name": "gemini-3-flash" }
      }
    }
  }
}
EOF
```

**테스트:** `opencode`

> `opencode run "your prompt" --model omniroute/claude-sonnet-4-5-thinking --variant high`를 사용하여
> 사고 변형을 전송하세요.

---

#### Cline (CLI 또는 VS Code)

**CLI 모드:**

```bash
mkdir -p ~/.cline/data && cat > ~/.cline/data/globalState.json << EOF
{
  "apiProvider": "openai",
  "openAiBaseUrl": "http://localhost:20128/v1",
  "openAiApiKey": "sk-your-omniroute-key"
}
EOF
```

**VS Code 모드:**
Cline 확장 설정 → API 제공자: `OpenAI Compatible` → 기본 URL: `http://localhost:20128/v1`

또는 OmniRoute 대시보드를 사용하세요 → **CLI 도구 → Cline → 구성 적용**.

---

#### KiloCode (CLI 또는 VS Code)

**CLI 모드:**

```bash
kilocode --api-base http://localhost:20128/v1 --api-key sk-your-omniroute-key
```

**VS Code 설정:**

```json
{
  "kilo-code.openAiBaseUrl": "http://localhost:20128/v1",
  "kilo-code.apiKey": "sk-your-omniroute-key"
}
```

또는 OmniRoute 대시보드를 사용하세요 → **CLI 도구 → KiloCode → 구성 적용**.

---

#### Continue (VS Code 확장)

`~/.continue/config.yaml`을 편집하세요:

```yaml
models:
  - name: OmniRoute
    provider: openai
    model: auto
    apiBase: http://localhost:20128/v1
    apiKey: sk-your-omniroute-key
    default: true
```

편집 후 VS Code를 재시작하세요.

---

#### VS Code Insiders (`chatLanguageModels.json`)

VS Code Insiders가 사용자 정의 엔드포인트 모델에 대해 구성되어 있고 OmniRoute가 사용자 정의 헤더 필드 없이 작동하도록 하려면 이 파일을 사용하세요.

**추천 위치:**

- 리눅스: `~/.config/Code - Insiders/User/chatLanguageModels.json`
- 윈도우: `%APPDATA%/Code - Insiders/User/chatLanguageModels.json`

**토큰화된 OmniRoute 별칭을 사용하는 예:**

```json
[
  {
    "vendor": "customendpoint",
    "id": "auto",
    "name": "OmniRoute Auto",
    "family": "gpt-4",
    "version": "1.0.0",
    "url": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/chat/completions",
    "modelsUrl": "http://localhost:20128/api/v1/vscode/sk-your-omniroute-key/models",
    "requestFormat": "openai-chat-completions",
    "contextWindow": 256000,
    "maxOutputTokens": 32768,
    "auth": {
      "type": "none"
    }
  }
]
```

**노트:**

- `sk-your-omniroute-key`를 OmniRoute에서 생성한 API 키로 교체하세요.
- `url` 필드는 `/api/v1/vscode/{token}/chat/completions`를 가리켜야 합니다.
- `modelsUrl` 필드는 `/api/v1/vscode/{token}/models`를 가리켜야 합니다.
- 클라이언트가 사용자 정의 헤더를 지원할 때는 일반 `/v1` + Bearer 헤더 흐름을 선호하세요.
- URL에 포함된 토큰은 호환성 대체 수단이며 편집기 로그나 프록시 기록에 나타날 수 있습니다.

---

#### Kiro CLI (Amazon)

```bash
# AWS/Kiro 계정에 로그인:
kiro-cli login

# CLI는 자체 인증을 사용합니다 — Kiro CLI 자체에 OmniRoute가 필요하지 않습니다.
# 다른 도구와 함께 OmniRoute와 함께 kiro-cli를 사용하세요.
kiro-cli status
```

**Kiro IDE** 데스크탑 앱의 경우 OmniRoute에서 노출된 MITM 엔드포인트를 사용하세요
`/dashboard/cli-tools → Kiro` 아래에서.

---

## 10. 내부 OmniRoute CLI

`omniroute` 바이너리는 서버 생명 주기, 설정, 진단 및 공급자 관리를 위한 명령을 제공합니다. 진입점: `bin/omniroute.mjs`.

```bash
omniroute                              # 서버 시작 (기본 포트 20128)
omniroute setup                        # 대화형 설정 마법사
omniroute doctor                       # 구성, DB, 포트, 런타임 확인
omniroute providers list               # 구성된 공급자 연결
omniroute providers test-all           # 모든 활성 연결 테스트
omniroute reset-password               # 관리자 비밀번호 재설정
omniroute logs                         # 요청 로그 스트리밍
omniroute health                       # 상세 건강 상태 (회로 차단기, 캐시, 메모리)
omniroute --version                    # 버전 출력
omniroute --help                       # 모든 명령 보기
```

### 설정 및 초기화

```bash
omniroute setup                        # 대화형 설정 마법사
omniroute setup --non-interactive      # CI/자동화 모드 (환경 변수 + 플래그 읽기)
omniroute setup --password '<value>'   # 관리자 비밀번호 직접 설정
omniroute setup --add-provider \
  --provider openai \
  --api-key '<value>' \
  --test-provider                      # 공급자를 한 번에 추가하고 테스트
```

비대화형 설정을 위한 인식된 환경 변수:

| Var                 | Purpose                                                          |
| ------------------- | ---------------------------------------------------------------- |
| `OMNIROUTE_API_KEY` | 공급자 API 키 (`--api-key`에 Commander `.env()`를 통해 바인딩됨) |
| `DATA_DIR`          | OmniRoute 데이터 디렉토리 재정의                                 |

모든 다른 비대화형 입력은 환경 변수가 아닌 플래그로 전달됩니다:
`--password`, `--provider`, `--provider-name`, `--provider-base-url`, `--default-model`
(위의 `omniroute setup` 옵션 참조).

### 진단

```bash
omniroute doctor                       # 구성, DB, 포트, 런타임, 메모리, 생존 확인
omniroute doctor --json                # 기계 판독 가능한 JSON
omniroute doctor --no-liveness         # HTTP 건강 프로브 건너뛰기
omniroute doctor --host 0.0.0.0        # 생존 호스트 재정의
omniroute doctor --liveness-url <url>  # 전체 건강 엔드포인트 URL 재정의
```

의사는 다음 검사를 수행합니다: `구성`, `데이터베이스`, `저장소/암호화`,
`포트 가용성`, `노드 런타임`, `네이티브 바이너리` (better-sqlite3),
`메모리`, 및 `서버 생존`. 어떤 검사가 `실패`하면 비제로로 종료됩니다.

### 공급자 관리

```bash
omniroute providers available                       # OmniRoute 공급자 카탈로그
omniroute providers available --search openai       # ID/이름/별칭/카테고리로 카탈로그 필터링
omniroute providers available --category api-key    # 카테고리로 필터링 (api-key, oauth, free, ...)
omniroute providers available --json                # 기계 판독 가능한 JSON

omniroute providers list                            # 구성된 공급자 연결
omniroute providers list --json

omniroute providers test <id|name>                  # 구성된 연결 하나 테스트
omniroute providers test-all                        # 모든 활성 연결 테스트
omniroute providers validate                        # 로컬 전용 구조 검증
omniroute providers add <provider> --credential-env PROVIDER_KEY
omniroute providers import ./providers.json --dry-run --json
omniroute providers auth <provider>                 # 기존 OAuth 흐름
omniroute providers edit <id|name> --default-model <model>
omniroute providers remove <id|name> --yes
```

`providers add/import/auth/edit/remove`는 API 우선이며 따라서
활성 로컬 또는 원격 컨텍스트에 대해 작동합니다. 자격 증명 입력은
`--credential-stdin` 또는 `--credential-env`를 사용해야 합니다; `--dry-run --json`은
단지 수정된 존재/형태를 보고합니다. `providers available`은 OmniRoute 카탈로그를 읽습니다;
`providers list/test/test-all/validate`는 로컬 SQLite 동작을 유지하며
서버가 실행 중일 필요가 없습니다.

### 복구 및 재설정

```bash
omniroute reset-password                # 관리자 비밀번호 재설정 (또한: omniroute-reset-password)
omniroute reset-encrypted-columns       # 경고 표시 + 암호화된 자격 증명 재설정에 대한 드라이 런
omniroute reset-encrypted-columns --force  # SQLite에서 암호화된 자격 증명을 실제로 null로 설정
```

### 자격 증명 내보내기 (⚠ 주의해서 다루기)

```bash
omniroute auth export                                 # 경고 표시 + 확인 게이트 — DB 접근 없음
omniroute auth export --force                          # 모든 연결의 복호화된 자격 증명을 stdout에 JSON으로 내보내기
omniroute auth export --force --id <id>                 # 일치하는 연결만 내보내기
omniroute auth export --force --format env               # OMNIROUTE_<PROVIDER>_<FIELD>=<value> 형식으로 출력
omniroute auth export --force --out creds.json           # 파일에 쓰기 (0600 권한으로 생성)
```

`auth export`는 **로컬 전용** (직접 SQLite 읽기, HTTP 경로 없음)이며 의도적으로
**평문** `apiKey`/`accessToken`/`refreshToken`/`idToken` 값을 출력/쓰기 — 이것이 기능이며,
버그가 아닙니다. `--force` 없이 데이터베이스에서 아무것도 읽지 않으며, 아무것도 복호화되지 않습니다. 평문이 출력되기 전에 항상 stderr 경고 배너가 출력됩니다. `STORAGE_ENCRYPTION_KEY`가 설정되어 있어야 합니다. 복호화에 실패한 필드(오래된 키, 손상된 암호문)는
`<field>DecryptFailed: true`로 보고되며 전체 내보내기를 중단하거나 기본 오류를 유출하지 않습니다.

### 기타 하위 명령

이들은 다른 경우가 명시되지 않는 한 실행 중인 OmniRoute 서버를 가정합니다:

```bash
omniroute status                       # 종합적인 런타임 상태
omniroute logs                         # 요청 로그 스트리밍 (--json, --search, --follow)
omniroute config show                  # 현재 구성 표시

omniroute provider list                # 사용 가능한 공급자 목록 (providers list의 별칭)
omniroute provider add                 # 도구에 OmniRoute를 공급자로 등록
omniroute keys add | list | remove     # API 키 관리
omniroute models [provider]            # 모델 목록 (--json, --search)
omniroute combo list | switch | create | delete

omniroute backup                       # 구성 + DB 스냅샷
omniroute restore                      # 이전 스냅샷에서 복원

omniroute health                       # 상세 건강 상태 (회로 차단기, 캐시, 메모리)
omniroute quota                        # 공급자 쿼타 사용량
omniroute cache                        # 캐시 상태
omniroute cache clear                  # 의미론적 + 서명 캐시 지우기

omniroute mcp status | restart         # MCP 서버 상태 / 재시작
omniroute a2a status | card            # A2A 서버 상태 / 에이전트 카드

omniroute tunnel list | create | stop  # 터널 관리 (cloudflare/tailscale/ngrok)
omniroute env show | get <k> | set <k> <v>  # 환경 변수 검사 / 설정 (임시)

omniroute test                         # 공급자 연결성 스모크 테스트
omniroute update                       # 업데이트 확인
omniroute completion                   # 셸 완성 생성
```

### 일반 플래그

| Flag                | Description                                       |
| ------------------- | ------------------------------------------------- |
| `--no-open`         | 시작 시 브라우저 자동 열기 안 함                  |
| `--port <n>`        | API 포트 재정의 (기본 20128)                      |
| `--mcp`             | IDE용으로 stdio를 통해 MCP 서버로 실행            |
| `--non-interactive` | CI 모드 (프롬프트 없음; env/flags에서 읽기)       |
| `--json`            | 기계 판독 가능한 JSON 출력 (doctor, providers 등) |
| `--help`, `-h`      | 명령별 도움말 표시                                |
| `--version`, `-v`   | 설치된 버전 출력                                  |

---

## 사용 가능한 API 엔드포인트

| 엔드포인트                 | 설명                    | 용도                           |
| -------------------------- | ----------------------- | ------------------------------ |
| `/v1/chat/completions`     | 표준 채팅 (모든 제공자) | 모든 최신 도구                 |
| `/v1/responses`            | 응답 API (OpenAI 형식)  | Codex, 에이전틱 워크플로우     |
| `/v1/completions`          | 레거시 텍스트 완성      | `prompt:`를 사용하는 구형 도구 |
| `/v1/embeddings`           | 텍스트 임베딩           | RAG, 검색                      |
| `/v1/images/generations`   | 이미지 생성             | GPT-Image, Flux 등             |
| `/v1/audio/speech`         | 텍스트 음성 변환        | ElevenLabs, OpenAI TTS         |
| `/v1/audio/transcriptions` | 음성 텍스트 변환        | Deepgram, AssemblyAI           |

붙여넣기 준비 완료 예제와 토큰화된 OmniRoute URL:

```txt
토큰 예제: sk-a3ab3c080beaee3a-69f4a4-070d71af

표준 OpenAI 기본: http://localhost:20128/v1
VS Code 모델: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/models
VS Code 채팅: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/chat/completions
VS Code 응답: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/responses
Ollama 태그: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/tags
Ollama 채팅: http://localhost:20128/api/v1/vscode/sk-a3ab3c080beaee3a-69f4a4-070d71af/api/chat
```

---

## 문제 해결

| 오류                                     | 원인                      | 수정 방법                                     |
| ---------------------------------------- | ------------------------- | --------------------------------------------- |
| `Connection refused`                     | OmniRoute가 실행되지 않음 | `omniroute serve`                             |
| `401 Unauthorized`                       | 잘못된 API 키             | `/dashboard/api-manager`에서 확인             |
| `No combo configured`                    | 활성 라우팅 조합 없음     | `/dashboard/combos`에서 설정                  |
| CLI에서 "not installed" 표시             | 바이너리가 PATH에 없음    | `which <command>`를 확인                      |
| 대시보드에서 설치 후 "not detected" 표시 | 캐시가 오래됨             | 대시보드에서 "⟳ 새로 고침" 클릭               |
| 오래된 링크 `/dashboard/cli-tools`       | v3.8.6 이전 북마크        | `/dashboard/cli-code`로 자동 리디렉션 (308)   |
| 오래된 링크 `/dashboard/agents`          | v3.8.6 이전 북마크        | `/dashboard/acp-agents`로 자동 리디렉션 (308) |
