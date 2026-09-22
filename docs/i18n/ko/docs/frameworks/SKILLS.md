# Skills Framework (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/SKILLS.md) · 🇪🇹 [am](../../../am/docs/frameworks/SKILLS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/SKILLS.md) · 🇦🇿 [az](../../../az/docs/frameworks/SKILLS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/SKILLS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/SKILLS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/SKILLS.md) · 🇩🇰 [da](../../../da/docs/frameworks/SKILLS.md) · 🇩🇪 [de](../../../de/docs/frameworks/SKILLS.md) · 🇬🇷 [el](../../../el/docs/frameworks/SKILLS.md) · 🇪🇸 [es](../../../es/docs/frameworks/SKILLS.md) · 🇪🇪 [et](../../../et/docs/frameworks/SKILLS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/SKILLS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/SKILLS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/SKILLS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/SKILLS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/SKILLS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/SKILLS.md) · 🇮🇱 [he](../../../he/docs/frameworks/SKILLS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/SKILLS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/SKILLS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/SKILLS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/SKILLS.md) · 🇮🇩 [id](../../../id/docs/frameworks/SKILLS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/SKILLS.md) · 🇮🇹 [it](../../../it/docs/frameworks/SKILLS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/SKILLS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/SKILLS.md) · 🇰🇭 [km](../../../km/docs/frameworks/SKILLS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/SKILLS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/SKILLS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/SKILLS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/SKILLS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/SKILLS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/SKILLS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/SKILLS.md) · 🇲🇲 [my](../../../my/docs/frameworks/SKILLS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/SKILLS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/SKILLS.md) · 🇳🇴 [no](../../../no/docs/frameworks/SKILLS.md) · 🇮🇳 [or](../../../or/docs/frameworks/SKILLS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/SKILLS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/SKILLS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/SKILLS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/SKILLS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/SKILLS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/SKILLS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/SKILLS.md) · 🇱🇰 [si](../../../si/docs/frameworks/SKILLS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/SKILLS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/SKILLS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/SKILLS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/SKILLS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/SKILLS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/SKILLS.md) · 🇮🇳 [te](../../../te/docs/frameworks/SKILLS.md) · 🇹🇭 [th](../../../th/docs/frameworks/SKILLS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/SKILLS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/SKILLS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/SKILLS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/SKILLS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/SKILLS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/SKILLS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/SKILLS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/SKILLS.md)

---

> **신뢰할 수 있는 원본:** `src/lib/skills/` 및 `src/app/api/skills/`
> **최종 업데이트:** 2026-06-28 — v3.8.40

OmniRoute는 언어 모델(및 운영자)이 파일 시스템 읽기와 HTTP 요청부터 샌드박스 기반 코드 실행 및 엄선된 마켓플레이스 스킬까지 재사용 가능한 기능을 조합할 수 있도록 확장 가능한 Skills 프레임워크를 제공합니다.

스킬은 버전 및 스키마가 정의된 작업 단위입니다. OmniRoute는 스킬을 도구 정의로 변환하여 외부 요청에 삽입하고, 모델에서 반환되는 도구 호출을 가로채 일치하는 핸들러를 실행한 후, 대화를 계속할 수 있도록 결과를 모델에 다시 전달합니다. 모델은 구현을 볼 수 없으며 도구 인터페이스만 볼 수 있습니다.

---

## Agent Skills와 Omni Skills

OmniRoute에는 서로 구별되면서도 상호 보완적인 두 가지 스킬 시스템이 있습니다.

| 구분                | **Omni Skills**(이 문서)                             | **Agent Skills**                                                                           |
| :------------------ | :--------------------------------------------------- | :----------------------------------------------------------------------------------------- |
| 목적                | LLM 도구 삽입 + 샌드박스 기반 실행                   | 외부 에이전트가 검색하고 사용할 수 있는 SKILL.md 카탈로그                                  |
| 신뢰할 수 있는 원본 | `src/lib/skills/` + 마켓플레이스                     | `src/lib/agentSkills/` + `skills/` 디렉터리                                                |
| 런타임 모드         | 외부 요청에 삽입되고 도구 호출 이벤트 시 실행됨      | 정적 마크다운 카탈로그 + REST/MCP/A2A 검색 엔드포인트                                      |
| 사용자              | OmniRoute 자체(콤보 라우팅, 인바운드 LLM 호출)       | 외부 에이전트, MCP 클라이언트, A2A 오케스트레이터                                          |
| 개수                | 가변적(마켓플레이스 기반)                            | 45개 카탈로그 항목(23개 API + 21개 CLI + 1개 구성)                                         |
| 형식                | 도구 스키마 + 핸들러가 포함된 `SkillDefinition`      | `SKILL.md` 프런트매터 + 마크다운 본문                                                      |
| 검색                | `/api/skills/*` REST + `omniroute_skills_*` MCP 도구 | `/api/agent-skills/*` REST + `omniroute_agent_skills_*` MCP 도구 + A2A `list-capabilities` |

**Omni Skills**는 실행 엔진입니다. LLM이 도구를 호출할 때 OmniRoute가 _무엇을 할 수 있는지_ 정의합니다.

**Agent Skills**는 문서 카탈로그입니다. 외부 에이전트에 OmniRoute의 REST API 및 CLI를 _사용하는 방법_을 설명하며, 에이전트 프롬프트에 직접 제공할 수 있는 구조화된 SKILL.md 파일을 사용합니다.

Agent Skills 카탈로그, 생성기, MCP 도구 및 A2A 스킬에 관한 내용은 [docs/frameworks/AGENT-SKILLS.md](./AGENT-SKILLS.md)를 참조하세요.

---

## 개념

### 스킬 소스

동일한 레지스트리에 다음 세 가지 소스의 스킬이 공존합니다.

1. **기본 제공 스킬**(`src/lib/skills/builtins.ts`) — OmniRoute와 함께 제공됩니다. 다음과 같은 일반적인 사용 사례를 지원합니다.
   - `file_read`, `file_write` — `<DATA_DIR>/skills/workspaces/<hashed-key>/` 아래에 API 키별로 격리된 샌드박스 작업 공간 제공
   - `http_request` — `guard: "public-only"`가 적용된 `safeOutboundFetch`를 통한 아웃바운드 HTTP
   - `web_search` — 캐싱을 지원하는 교체 가능한 검색 제공자(`executeWebSearch`)
   - `eval_code` — Docker로 샌드박스 처리된 `node` 또는 `python` 실행
   - `execute_command` — Docker로 샌드박스 처리된 셸 명령 실행
   - `browser` — Playwright 기반 스캐폴딩이며 기본적으로 비활성화됨(`builtin/browser.ts`)
2. **SkillsMP**(OmniRoute 마켓플레이스) — `https://skillsmp.com/api/v1/skills/search`에서 가져옵니다. Settings에 `skillsmpApiKey`가 필요합니다.
3. **SkillsSH**(`skills.sh` 커뮤니티 카탈로그) — `https://skills.sh/api/search`에서 가져옵니다. 인증은 필요하지 않으며, SKILL.md 콘텐츠는 GitHub raw에서 가져옵니다.

하나의 "활성 제공자"가 대시보드에서 스킬을 설치할 카탈로그를 결정합니다(`src/lib/skills/providerSettings.ts`). **Settings → Memory & Skills**에서 변경할 수 있습니다. 기본값은 `skillsmp`입니다.

### 스킬 식별자

스킬은 메모리 내 레지스트리(`src/lib/skills/registry.ts`)에서 `name@version`을 키로 사용합니다. 버전은 semver(`^\d+\.\d+\.\d+$`) 형식이어야 합니다. `resolveVersion()`은 `^`, `~`, `>`, `>=`, `<`, `<=`, `==` 및 정확히 일치하는 제약 조건을 인식합니다.

### 스킬 모드

각 스킬에는 삽입 시점을 제어하는 런타임 모드가 있습니다.

| 모드   | 동작                                                                                  |
| ------ | ------------------------------------------------------------------------------------- |
| `on`   | 항상 도구 정의로 삽입됨                                                               |
| `off`  | 삽입되지 않으며 실행할 수도 없음                                                      |
| `auto` | 수신 요청에 대한 점수를 계산하여 점수가 `AUTO_MIN_SCORE` 이상일 때만 삽입됨(기본값 3) |

`auto`는 마켓플레이스에서 설치한 스킬의 기본값입니다. `enabled=true`와 `mode="off"`를 함께 지정하면 "등록되었지만 비활성 상태"를 의미합니다. 레거시 열을 통해 `enabled`를 전환하면 이전 코드 경로에서도 일관성을 유지하도록 `mode`도 함께 변경됩니다(`src/app/api/skills/[id]/route.ts`).

### 상태(실행)

스킬 실행은 다음 상태와 함께 `skill_executions` 테이블에서 추적됩니다(`src/lib/skills/types.ts`).

```ts
enum SkillStatus {
  PENDING = "pending",
  RUNNING = "running",
  SUCCESS = "success",
  ERROR = "error",
  TIMEOUT = "timeout",
}
```

### 레지스트리 캐시

`SkillRegistry`는 60초 TTL 캐시를 사용하는 싱글턴입니다(`registry.ts:14`). `loadFromDatabase()`는 멱등성을 보장하며 `pendingLoad`를 통해 동시 호출의 중복을 제거합니다. 모든 쓰기 작업(`register`/`unregister`/`unregisterById`)은 캐시를 무효화합니다. 버전은 `getSkillVersions(name)` 및 `resolveVersion(name, constraint)`을 통해 조회합니다.

### 제공자별 삽입

`src/lib/skills/injection.ts`의 `injectSkills()`는 등록된 스킬을 제공자별 도구 정의로 변환하는 진입점입니다:

- **OpenAI** — `{ type: "function", function: { name, description, parameters } }`
- **Anthropic** — `{ name, description, input_schema }`
- **Google (Gemini)** — `{ name, description, parameters }`

도구 이름은 `name@version` 형식으로 인코딩되므로, 모델이 도구를 다시 호출할 때 핸들러가 올바른 버전을 선택할 수 있습니다.

### AUTO 점수 산정

`mode="auto"`일 때 각 후보 스킬은 요청 컨텍스트를 기준으로 점수가 산정됩니다(`injection.ts`의 `scoreAutoSkill()`).

| 신호                                      | 점수      |
| ----------------------------------------- | --------- |
| 스킬 이름이 컨텍스트에 그대로 나타남      | +6        |
| 이름의 각 토큰이 컨텍스트 토큰과 일치함   | +2        |
| 각 태그 부분 문자열이 컨텍스트와 일치함   | +3        |
| 설명의 각 토큰이 컨텍스트와 일치함        | +1        |
| 백그라운드 이유가 이름 토큰과 일치함      | 토큰당 +2 |
| 백그라운드 이유가 태그와 일치함           | 토큰당 +2 |
| 태그의 제공자 힌트가 요청 제공자와 일치함 | +2 / −2   |

`score >= AUTO_MIN_SCORE = 3`인 스킬 중 상위 `AUTO_MAX_SKILLS = 5`개가 주입됩니다. 동점일 경우 `installCount` 내림차순으로 정렬한 다음, 이름의 알파벳순으로 결정합니다(`injection.ts:225-235`).

### 도구 호출 가로채기

업스트림이 도구 호출 응답을 반환한 후 채팅 핸들러가 `src/lib/skills/interception.ts`의 `handleToolCallExecution()`을 호출합니다.

1. `extractToolCalls()`가 제공자별 형식(OpenAI `tool_calls` / Responses `function_call`, Anthropic `tool_use`, Gemini `functionCalls`)을 읽습니다.
2. 기본 제공 도구 별칭(예: `omniroute_web_search` → `web_search`)이 먼저 해석됩니다. 기본 제공 핸들러는 인라인으로 실행됩니다.
3. 그 외의 모든 항목은 `skillExecutor.execute(name@version, args, { apiKeyId, sessionId })`를 통해 라우팅됩니다.
4. 결과는 응답에 맞게 다시 삽입됩니다. 즉, 상황에 따라 `tool_results`, `function_call_output` 항목 또는 Anthropic `tool_result` 블록으로 삽입됩니다.

실행 컨텍스트의 `customSkillExecutionEnabled`를 `false`로 설정하면 기본 제공 가로채기만 허용할 수 있습니다(사용자 정의 핸들러를 명시적으로 비활성화하는 요청 경로에서 사용됨).

---

## Docker 샌드박스

내장 기능이 아닌 코드 경로(`eval_code`, `execute_command`)는 `SandboxRunner`(`src/lib/skills/sandbox.ts`)를 통해 Docker 내부에서 실행됩니다. 모든 컨테이너는 다음 옵션으로 시작됩니다.

```
--rm --network none|bridge --cap-drop ALL
--security-opt no-new-privileges --pids-limit 100
--cpus <cpuLimit/1000> --memory <memoryLimit>m
--tmpfs /tmp:rw,noexec,nosuid,size=64m
--tmpfs /workspace:rw,noexec,nosuid,size=64m
--read-only (readOnly=true인 경우)
```

기본값(`SandboxRunner.DEFAULT_CONFIG`):

| 필드             | 기본값          | 참고                                                   |
| ---------------- | --------------- | ------------------------------------------------------ |
| `cpuLimit`       | 100 (= 0.1 CPU) | `--cpus`에 전달하기 전에 1000으로 나눔                 |
| `memoryLimit`    | 256 MB          | 하드 제한                                              |
| `timeout`        | 30000 ms        | `SIGTERM` + `docker kill`을 통한 소프트 종료           |
| `networkEnabled` | `false`         | `--network none`이 됨                                  |
| `readOnly`       | `true`          | 루트 FS는 읽기 전용이며, `/tmp`와 `/workspace`는 tmpfs |

종료를 위해 `SandboxRunner.kill(id)`와 `killAll()`이 노출되며, 실행 중인 컨테이너는 `runningContainers: Map<string, ChildProcess>`에서 추적됩니다.

### 샌드박스 환경 변수

`src/lib/skills/builtins.ts`에서 `process.env`를 통해 구성됩니다.

| 환경 변수                         | 기본값           | 용도                                                                         |
| --------------------------------- | ---------------- | ---------------------------------------------------------------------------- |
| `SKILLS_MAX_FILE_BYTES`           | `1048576` (1 MB) | `file_read` 및 `file_write`의 제한                                           |
| `SKILLS_MAX_HTTP_RESPONSE_BYTES`  | `256000`         | `http_request` 응답 본문의 제한                                              |
| `SKILLS_MAX_SANDBOX_OUTPUT_CHARS` | `100000`         | 호출자에게 반환되는 stdout/stderr의 제한                                     |
| `SKILLS_SANDBOX_TIMEOUT_MS`       | `10000`          | 샌드박스 명령의 기본 제한 시간이며 최대 60 s로 제한됨                        |
| `SKILLS_SANDBOX_NETWORK_ENABLED`  | `false`          | 외부 통신의 마스터 게이트. 호출별 옵트인을 허용하려면 `1` 또는 `true`로 설정 |
| `SKILLS_ALLOWED_SANDBOX_IMAGES`   | (아래 참조)      | 쉼표로 구분된 Docker 이미지 허용 목록                                        |

기본 허용 이미지는 `alpine:3.20`, `node:22-alpine`, `python:3.12-alpine`입니다. `SKILLS_ALLOWED_SANDBOX_IMAGES`를 통해 추가된 이미지는 기본값과 병합되며, 알 수 없는 이미지는 `normalizeImage()`에서 거부됩니다.

> 참고: 별도의 `SKILLS_EXECUTION_TIMEOUT_MS` 환경 변수는 없습니다. 비샌드박스 핸들러 제한 시간은 `SkillExecutor`(`executor.ts:13`)에 30 s로 하드 코딩되어 있지만, 런타임에 `skillExecutor.setTimeout(ms)`를 통해 재정의할 수 있습니다.

### 작업 공간 격리

`file_read`와 `file_write`는 모든 경로를 `<DATA_DIR>/skills/workspaces/<sha256(apiKeyId).slice(0,24)>/`에 있는 API 키별 작업 공간을 기준으로 해석합니다. 경로 순회(`..`)와 금지된 세그먼트(`.env`, `.git`, `.ssh`, `.omniroute`, `.codex`, `secrets`)는 디스크 I/O가 수행되기 전에 거부됩니다.

### HTTP 보안 강화

`http_request`(`builtins.ts:257`):

- 메서드 허용 목록: `GET, HEAD, POST, PUT, PATCH, DELETE`
- 차단되는 아웃바운드 헤더: `host, connection, content-length, cookie, set-cookie, authorization, proxy-authorization`
- 리디렉션 비활성화(`allowRedirect: false`)
- `guard: "public-only"`가 적용된 `safeOutboundFetch`를 통해 라우팅됨(사설/루프백 범위 차단)
- 응답은 `SKILLS_MAX_HTTP_RESPONSE_BYTES`에서 잘리며, 클라이언트에는 `truncated: true`가 표시됨

---

## 하이브리드 실행기(프리뷰)

`src/lib/skills/hybrid.ts`는 각 호출에서 `direct`(프로세스 내) 실행과 `sandbox` 실행 중 하나를 결정하고, 시간 초과/메모리 오류 발생 시 `autoUpgrade` 재시도 경로를 사용하는 `HybridExecutor`를 정의합니다. 연결된 `directExecutor` / `sandboxRunner` 구현은 스텁입니다(`executeDirect`, `executeInSandbox`는 플레이스홀더 객체를 반환함). 이 모듈은 현재 구축 중인 계약으로 간주하세요. 실제 실행은 여전히 `skillExecutor` + `SandboxRunner`를 통해 이루어집니다.

---

## 스토리지

스키마는 다음 두 마이그레이션에 있습니다.

- `src/lib/db/migrations/016_create_skills.sql` — 기본 `skills` 및 `skill_executions` 테이블과 `(api_key_id, name)` 및 `(skill_id, status, created_at)` 인덱스.
- `src/lib/db/migrations/027_skill_mode_and_metadata.sql` — `skills`에 `mode`, `source_provider`, `tags`(JSON), `install_count`를 추가합니다.

`skill_executions.status`에는 데이터베이스 수준의 제약 조건이 적용됩니다: `CHECK(status IN ('pending', 'running', 'success', 'error', 'timeout'))`.

---

## REST API

모든 엔드포인트는 `src/app/api/skills/` 아래에 있습니다. 관리 엔드포인트(`/api/skills`, `/api/skills/[id]`, `/api/skills/install`)에는 `requireManagementAuth()`를 통한 **관리 인증**이 필요합니다. 마켓플레이스/설치 흐름은 더 간소한 `isAuthenticated()`(세션 또는 API 키)를 사용합니다.

| 엔드포인트 | 메서드 | 용도 |
| --------------------------------- | ------ | ------------------------------------------------------------------------ | --- | ------------------------ | -------- | ------------------ |
| `/api/skills` | GET | 등록된 스킬을 나열합니다. `?q=`, `?mode=on                        | off | auto`, `?source=skillsmp | skillssh | local`, 페이지네이션 지원 |
| `/api/skills/[id]` | PUT | `enabled` 또는 `mode` 업데이트 |
| `/api/skills/[id]` | DELETE | ID로 등록 해제 |
| `/api/skills/install` | POST | 사용자 정의 스킬 설치(핸들러 코드 + 스키마) |
| `/api/skills/marketplace` | GET | SkillsMP 카탈로그 검색(`q`가 비어 있으면 인기 기본 항목 반환) |
| `/api/skills/marketplace/install` | POST | SkillsMP 스킬 설치(활성 공급자가 `skillsmp`여야 함) |
| `/api/skills/skillssh` | GET | skills.sh 카탈로그 검색(`?q=&limit=`, 최대 100) |
| `/api/skills/skillssh/install` | POST | skills.sh 스킬 설치(활성 공급자가 `skillssh`여야 함) |
| `/api/skills/executions` | GET | 페이지네이션된 실행 기록(`?apiKeyId=`) |
| `/api/skills/executions` | POST | 등록된 스킬을 임시 실행 |

`settings.skillsEnabled === false`인 경우 `POST /api/skills/executions` 엔드포인트는 `{ error: "Skills execution is disabled..." }`와 함께 HTTP `503`을 반환합니다(`executor.ts:42-45`). 운영자는 **Settings → AI**에서 마스터 스위치를 전환할 수 있습니다.

### 예시: 사용자 정의 스킬 설치

```bash
curl -X POST http://localhost:20128/api/skills/install \
  -H "Authorization: Bearer $OMNIROUTE_MGMT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "reverse-text",
    "version": "1.0.0",
    "description": "Reverses a string",
    "schema": {
      "input":  { "type": "object", "properties": { "text": { "type": "string" } }, "required": ["text"] },
      "output": { "type": "object", "properties": { "reversed": { "type": "string" } } }
    },
    "handlerCode": "echo-handler",
    "apiKeyId": "your-api-key-id"
  }'
```

`handlerCode` 문자열은 실행 가능한 코드가 아니라 **핸들러 이름 조회값**입니다. 실행기는 `skillExecutor.registerHandler(name, fn)`을 통해 이를 매핑합니다(`executor.ts:25`). 마켓플레이스 설치는 이 필드에 SKILL.md 텍스트를 문서로 저장하고, 모델이 생성한 도구 호출을 통해 실행을 라우팅합니다. 사용자가 임의로 제공한 소스는 eval되지 않습니다.

---

## MCP 도구

4개의 MCP 도구가 스킬 인터페이스(`open-sse/mcp-server/tools/skillTools.ts`)를 래핑합니다. MCP 서버가 부팅될 때 자동으로 등록됩니다.

| 도구                          | 설명                                                       |
| ----------------------------- | ---------------------------------------------------------- |
| `omniroute_skills_list`       | 스킬 목록 조회, 선택적 필터: `apiKeyId`, `name`, `enabled` |
| `omniroute_skills_enable`     | `skillId`로 스킬 활성화/비활성화                           |
| `omniroute_skills_execute`    | 입력 페이로드로 스킬 실행                                  |
| `omniroute_skills_executions` | 최근 실행 기록(기본값 50, 최대 100)                        |

전송 설정 및 범위 할당에 대해서는 [MCP-SERVER.md](./MCP-SERVER.md)를 참조하세요.

---

## A2A 통합

`src/lib/skills/a2a.ts`는 `memory_aware_routing` A2A 스킬 설명자와 `registerA2ASkill(registry)` 헬퍼를 내보냅니다. 사용자 정의 A2A 스킬은 `src/lib/a2a/skills/`에 위치하며 `A2A_SKILL_HANDLERS`(`src/lib/a2a/taskExecution.ts`)를 통해 디스패치됩니다. 전체 작업 수명 주기는 [A2A-SERVER.md](./A2A-SERVER.md)를 참조하세요.

---

## 새로운 기본 제공 스킬 추가

1. `src/lib/skills/builtins.ts`(또는 `src/lib/skills/builtin/` 아래의 인접 파일)에 **핸들러를 정의합니다**. 시그니처: `(input, { apiKeyId, sessionId }) => Promise<output>`.
2. **샌드박스 코드 경로인가요?** `sandboxRunner.run(image, command, env, sandboxConfig({...}))`을 호출하세요. 허용 목록에 대해 `normalizeImage()`를 사용하세요.
3. **파일 시스템 경로인가요?** 디스크에 접근하기 전에 항상 `resolveWorkspacePath(input, context)`를 통과시키세요.
4. **네트워크 호출인가요?** `guard: "public-only"`와 함께 `safeOutboundFetch`를 사용하고, `sanitizeHeaders()`를 통해 헤더를 정제하세요.
5. `builtinSkills`에 항목을 추가하거나 부팅 시 `registerBrowserSkill(executor)` 형식으로 호출하여 **등록합니다**.
6. 업스트림 모델이 다른 이름을 내보내는 경우 `BUILTIN_TOOL_ALIASES`(`interception.ts:23`)에 **기본 제공 도구 별칭을 연결합니다**(선택 사항).
7. `src/lib/skills/__tests__/`에 **테스트**를 추가합니다(Vitest).

---

## 사용자 정의(기본 제공이 아닌) 스킬 추가

1. 프로세스 시작 시 핸들러를 등록합니다.
   ```ts
   skillExecutor.registerHandler("my-handler", async (input, ctx) => { ... });
   ```
2. `POST /api/skills/install`을 통해 스킬을 삽입합니다(`handlerCode` 필드는 등록된 핸들러 이름과 일치해야 합니다).
3. `PUT /api/skills/[id]`를 통해 `mode`를 `on` 또는 `auto`로 전환합니다.

---

## 운영 팁

- **마스터 스위치:** `settings.skillsEnabled = false`는 모든 실행을 차단하고 `/api/skills/executions`에서 HTTP `503`을 반환합니다. 레지스트리는 계속 로드됩니다.
- **외부 통신 차단:** 완전히 에어갭된 샌드박싱을 위해 `SKILLS_SANDBOX_NETWORK_ENABLED`를 설정하지 않은 상태(기본값)로 유지하세요. 호출별 `networkEnabled: true`도 여전히 마스터 게이트의 허용이 필요합니다.
- **특정 이미지 허용:** 허용 목록을 확장하려면 `SKILLS_ALLOWED_SANDBOX_IMAGES="myorg/sandbox:1.0,node:22-alpine"`를 설정하세요.
- **실행 감사:** `/dashboard/skills/executions`와 `omniroute_skills_executions`는 모두 `skill_executions`를 쿼리합니다. 성공한 실행에는 `durationMs`가 포함되고, 실패한 실행에는 `errorMessage`가 포함됩니다.
- **캐시 무효화:** 수동으로 DB를 편집한 후 `skillRegistry.invalidateCache()`를 호출하세요. 그렇지 않으면 60초 동안 기다리세요.
- **익명 워크스페이스:** `apiKeyId`가 비어 있으면 모든 호출이 동일한 `"anonymous"` 워크스페이스로 해시됩니다. 공유를 고려하는 코드는 항상 실제 키를 전달해야 합니다.

---

## 실행 수명 주기 (v3.8.16+)

`SkillExecutor` (`src/lib/skills/executor.ts`)는 모든 스킬 호출을 관리하는 **싱글턴**입니다. 타임아웃, 재시도 및 실행 상태를 디버깅하려면 이 수명 주기를 이해하는 것이 중요합니다.

### 5단계 수명 주기

```
   execute() 호출됨
        │
        ▼
  ┌─────────────┐
  │  PENDING    │  ← 대기열에 추가됨, 아직 시작되지 않음(DB 행 생성됨)
  └──────┬──────┘
         │ 핸들러 시작
         ▼
  ┌─────────────┐
  │  RUNNING    │  ← 타임아웃이 적용된 상태로 핸들러 호출됨
  └──────┬──────┘
         │
    ┌────┴────┬──────────┬──────────┐
    │         │          │          │
    ▼         ▼          ▼          ▼
  SUCCESS   ERROR     TIMEOUT   (다른 경로 없음 — 상위 프로세스에 의해 종료됨)
    │         │          │
    └────┬────┴──────────┘
         │
         ▼
   상태, 출력, durationMs로 DB 행 업데이트됨
```

### 기본 구성

| 설정         | 기본값         | 구성 방법                            |
| ------------ | -------------- | ------------------------------------ |
| `timeout`    | `30000` (30초) | `skillExecutor.setTimeout(ms)`       |
| `maxRetries` | `3`            | `skillExecutor.setMaxRetries(count)` |

> **중요**: 실행기는 싱글턴이므로 `setTimeout()`을 호출하면 이후의 모든 호출에 전역적으로 영향을 줍니다. 현재 스킬별 타임아웃은 지원되지 않습니다. 스킬마다 서로 다른 타임아웃이 필요하다면 별도의 프로세스를 실행하거나 실행기를 포크하세요.

### 상태 값

`src/lib/skills/types.ts`에서 가져온 값:

```ts
enum SkillStatus {
  PENDING = "pending", // 대기열에 추가됨, 아직 시작되지 않음
  RUNNING = "running", // 핸들러 호출됨
  SUCCESS = "success", // 핸들러가 유효한 출력을 반환함
  ERROR = "error", // 핸들러가 예외를 발생시킴
  TIMEOUT = "timeout", // 실행기의 타임아웃을 초과함
}
```

> **참고**: `TIMEOUT` 상태는 enum에 정의되어 있지만, 현재 실행기 구현에서는 **실제로 DB에 기록되지 않습니다**. 타임아웃은 `"Skill execution timed out"` 메시지와 함께 `ERROR`로 나타납니다. 이 상태 enum은 향후 사용을 위해 예약되어 있습니다.

### 실행 검사

```ts
import { skillExecutor } from "omniroute/skills/executor";

// ID로 특정 실행 가져오기
const exec = skillExecutor.getExecution("exec-uuid-123");
if (exec) {
  console.log(`${exec.skillName}: ${exec.status} in ${exec.durationMs}ms`);
}

// API 키의 최근 실행 목록 조회
const recent = skillExecutor.listExecutions("api-key-id", 50, 0);
for (const e of recent) {
  console.log(`${e.skillName} → ${e.status} (${e.durationMs}ms)`);
}

// 전체 실행 횟수 계산
const total = skillExecutor.countExecutions("api-key-id");
```

### 재시도 동작

`maxRetries` 설정은 저장되지만, 현재 실행기의 `execute()` 메서드에서는 **사용되지 않습니다**. 이 메서드는 한 번만 시도합니다. `maxRetries` 값은 향후 구현과 이 값을 읽으려는 훅을 위해 노출되어 있습니다.

현재로서는 재시도를 스킬 핸들러 자체에서 구현해야 합니다. 기본 제공
스킬은 실행기에 등록됩니다(예: `src/lib/skills/builtin/`의 `registerBuiltinSkills(executor)`
/ `registerBrowserSkill(executor)`). 등록하는 핸들러에서 자체 재시도 루프를
래핑할 수 있습니다.

```ts
// 스킬 핸들러 내부
async function handler(input, ctx) {
  const maxRetries = 3;
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await fetchSomething(input);
    } catch (err) {
      lastError = err as Error;
      if (attempt < maxRetries) {
        await new Promise((r) => setTimeout(r, 1000 * attempt));
      }
    }
  }
  throw lastError;
}
```

---

## SkillMode 상세 설명

`SkillMode` 열거형(`src/lib/skills/types.ts`)은 스킬이 **언제, 어떻게** 호출되는지를 제어합니다.

```ts
enum SkillMode {
  AUTO = "auto", // LLM이 스킬 호출 시점을 결정
  MANUAL = "manual", // 사용자의 명시적 요청이 있을 때만 호출
  HYBRID = "hybrid", // AUTO 점수 계산 + 수동 재정의
}
```

> **참고**: 코드베이스에는 `SkillMode`(AUTO/MANUAL/HYBRID)가 정의되어 있지만, `Skill.mode` 필드는 다른 형태(`"on" | "off" | "auto"`)를 사용합니다. 두 항목은 관련되어 있지만 동일하지는 않습니다. `SkillMode`는 실행기 정책에 사용되고, `Skill.mode`는 스킬별 활성화 여부를 지정하는 데 사용됩니다.

### 각 모드를 사용해야 하는 경우

| 모드     | LLM 동작                                                                      | 사용 사례                            |
| -------- | ----------------------------------------------------------------------------- | ------------------------------------ |
| `AUTO`   | LLM이 필요하다고 판단할 때 스킬을 호출할 수 있음                              | 범용 스킬(파일 읽기, HTTP 요청)      |
| `MANUAL` | LLM은 스킬을 호출할 수 없으며, 명시적인 `executeSkill` API 호출로만 실행 가능 | 민감한 작업(데이터베이스 쓰기, 결제) |
| `HYBRID` | LLM이 스킬을 제안할 수 있으며, 사용자가 확인해야 함                           | 부작용이 있지만 위험하지는 않은 스킬 |

### AUTO 점수 계산

`AUTO` 모드가 활성화되면 `src/lib/skills/injection.ts`의 `scoreAutoSkill()`이 각 후보 스킬을 요청 컨텍스트와 비교하여 점수를 계산합니다. 이는 가산식 정수 점수 체계로, 스킬 이름 일치, 이름/태그/설명 토큰 중복, 백그라운드 이유 힌트, 제공자 힌트 보너스/페널티를 기준으로 합니다. `score >= AUTO_MIN_SCORE = 3`인 스킬 중 점수가 가장 높은 최대 `AUTO_MAX_SKILLS = 5`개의 스킬이 호출 가능한 도구로 주입되며, 동점인 경우 `installCount`, 그다음 이름 순으로 결정됩니다. 전체 점수표는 이 문서 앞부분의 [**도구 스키마 생성 → AUTO 점수 계산**](#auto-scoring)을 참조하세요. 부동 소수점 `0.6` 형식의 임계값이나 `registry.ts` 점수 계산은 없습니다.

---

## 기본 제공 스킬 카탈로그

OmniRoute는 `src/lib/skills/builtin/`에 엄선된 기본 제공 스킬 세트를 포함합니다. 가장 일반적인 스킬은 다음과 같습니다.

### 브라우저 자동화 스킬

브라우저 스킬(`src/lib/skills/builtin/browser.ts`)은 Playwright/Puppeteer를 통한 헤드리스 브라우저 자동화를 제공합니다. **구현되어 있지만 기본 스킬 카탈로그에는 포함되어 있지 않습니다.** 사용하려면 브라우저 확장 플러그인을 별도로 설치하세요.

```ts
// 구성에서 활성화
const config: SkillConfig = {
  enabled: true,
  mode: SkillMode.MANUAL, // 항상 명시적인 호출 필요
  allowedSkills: ["browser"],
  timeout: 60000, // 페이지 로드에 60초 허용
  maxRetries: 1,
};
```

### 기타 기본 제공 카테고리

| 카테고리  | 스킬                                      | 모드   |
| --------- | ----------------------------------------- | ------ |
| 파일 I/O  | `file_read`, `file_write`                 | AUTO   |
| HTTP      | `http_request`                            | AUTO   |
| 검색      | `web_search`                              | AUTO   |
| 코드 실행 | `eval_code`(샌드박스형 JavaScript/Python) | HYBRID |
| 시스템    | `execute_command`(샌드박스형 CLI 실행)    | MANUAL |

### 사용자 정의 스킬 추가

플러그인 시스템을 통해 사용자 정의 스킬을 추가하는 방법은 [플러그인 SDK 및 스킬 통합](./PLUGIN_SDK.md)을 참조하세요.

---

## 참고 자료

- [MCP-SERVER.md](./MCP-SERVER.md) — MCP 도구 등록 및 전송 방식
- [A2A-SERVER.md](./A2A-SERVER.md) — A2A 작업 수명 주기 및 스킬 디스패치
- [USER_GUIDE.md](../guides/USER_GUIDE.md#-skills-system) — 사용자용 소개
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — 요청 파이프라인 및 컴포넌트 맵
- 소스: `src/lib/skills/`, `src/app/api/skills/`, `open-sse/mcp-server/tools/skillTools.ts`
- 테스트: `src/lib/skills/__tests__/integration.test.ts`
