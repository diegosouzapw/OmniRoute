# ACP (Agent Client Protocol) (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

> **요약**: ACP를 사용하면 OmniRoute가 HTTP API를 사용하는 대신 Claude Code, Codex 같은 CLI 에이전트를 자식 프로세스로 실행할 수 있습니다. 이를 통해 "CLI-as-backend" 전송 방식을 사용할 수 있습니다.

---

## ACP란?

ACP(Agent Client Protocol)는 OmniRoute를 위한 **"CLI-as-backend" 전송 방식**입니다. AI 제공업체로 전송되는 HTTP API 호출을 가로채는 대신, ACP는 **CLI 에이전트를 자식 프로세스로 실행**하고 해당 에이전트의 네이티브 인터페이스를 통해 프롬프트를 전달합니다.

### ACP를 사용하는 이유

| 이점                          | 설명                                                 |
| ----------------------------- | ---------------------------------------------------- |
| **API 키 불필요**             | 기존 CLI 인증을 사용합니다                           |
| **네이티브 프로토콜**         | 각 CLI의 네이티브 입력/출력 형식을 사용합니다        |
| **자동 검색**                 | 시스템에 설치된 CLI를 감지합니다                     |
| **15개의 기본 제공 에이전트** | 널리 사용되는 CLI 도구에 맞게 사전 구성되어 있습니다 |
| **사용자 지정 에이전트**      | 설정을 통해 자체 CLI 도구를 추가할 수 있습니다       |
| **프로세스 관리**             | 수명 주기(실행, 전송, 종료)를 처리합니다             |

---

## 지원되는 CLI 에이전트

ACP는 기본적으로 **15개의 기본 제공 CLI 에이전트**를 지원합니다.

| 에이전트 ID   | 표시 이름          | 바이너리      | 프로토콜 |
| ------------- | ------------------ | ------------- | -------- |
| `codex`       | OpenAI Codex CLI   | `codex`       | stdio    |
| `claude`      | Claude Code CLI    | `claude`      | stdio    |
| `goose`       | Goose CLI          | `goose`       | stdio    |
| `openclaw`    | OpenClaw           | `openclaw`    | stdio    |
| `aider`       | Aider              | `aider`       | stdio    |
| `opencode`    | OpenCode           | `opencode`    | stdio    |
| `cline`       | Cline              | `cline`       | stdio    |
| `qwen`        | Qwen Code          | `qwen --acp`  | stdio    |
| `forge`       | ForgeCode          | `forge`       | stdio    |
| `amazon-q`    | Amazon Q Developer | `q`           | stdio    |
| `interpreter` | Open Interpreter   | `interpreter` | stdio    |
| `cursor-cli`  | Cursor CLI         | `cursor`      | stdio    |
| `warp`        | Warp AI            | `warp`        | stdio    |
| `gemini`      | Gemini CLI         | `gemini`      | stdio    |
| `zcode`       | ZCode              | `zcode`       | stdio    |

### 사용자 지정 에이전트

설정을 통해 자체 CLI 에이전트를 추가할 수 있습니다. 사용자 지정 에이전트는 기본 제공 에이전트와 동일한 기능을 지원합니다.

---

## 빠른 시작

### 1단계: CLI 에이전트 설치

```bash
# 예시: Claude Code CLI 설치
npm install -g @anthropic-ai/claude-code

# 설치 확인
claude --version
```

### 2단계: ACP 자동 감지

ACP는 시스템에 설치된 CLI 에이전트를 자동으로 감지합니다. 별도의 구성이 필요하지 않습니다!

### 3단계: ACP 전송 방식 사용

감지된 후에는 지원되는 모든 제공업체의 전송 방식으로 ACP를 사용할 수 있습니다. CLI를 사용할 수 있으면 OmniRoute가 자동으로 ACP를 사용합니다.

---

## ACP 작동 방식

### 아키텍처

```
┌─────────────────┐
│  OmniRoute      │
│  (HTTP 프록시)    │
└────────┬────────┘
         │
         │ spawn()
         ▼
┌─────────────────┐
│  자식 프로세스      │
│  (CLI 에이전트)    │
│                 │
│  stdin  ◄──────┤  프롬프트 전송
│  stdout ──────►│  응답 수신
│  stderr ──────►│  오류 수신
└─────────────────┘
```

### 프로세스 수명 주기

1. **실행** — ACP가 CLI 에이전트의 자식 프로세스를 생성합니다
2. **전송** — ACP가 프로세스의 stdin에 프롬프트를 씁니다
3. **수신** — ACP가 stdout/stderr에서 응답을 읽습니다
4. **유휴 상태 감지** — ACP는 응답이 완료된 것으로 간주하기 전에 2초 동안 활동이 없을 때까지 기다립니다
5. **종료** — ACP가 프로세스를 종료합니다(SIGTERM을 전송한 후 5초가 지나면 SIGKILL 전송)

### 통신 프로토콜

ACP는 CLI 에이전트와 통신하기 위해 **stdio**(표준 입력/출력)를 사용합니다. 프로토콜은 다음과 같습니다.

1. **프롬프트 전송** — 줄 바꿈 문자와 함께 stdin에 씁니다
2. **응답 대기** — 유휴 상태가 될 때까지 stdout에서 읽습니다(2초 동안 출력 없음)
3. **시간 초과** — 기본값은 120초입니다(구성 가능)

---

## API 참조

### 레지스트리 함수

#### `detectInstalledAgents()`

시스템에 설치된 모든 CLI 에이전트를 감지합니다. 결과는 60초 동안 캐시됩니다.

```typescript
import { detectInstalledAgents } from "@/lib/acp";

const agents = detectInstalledAgents();
// 반환값: CliAgentInfo[]

interface CliAgentInfo {
  id: string; // 예: "codex", "claude"
  name: string; // 표시 이름
  binary: string; // 실행할 바이너리 이름
  versionCommand: string; // 버전 감지 명령어
  version: string | null; // 감지된 버전(설치되지 않은 경우 null)
  installed: boolean; // 에이전트 설치 여부
  providerAlias: string; // OmniRoute의 제공자 ID
  spawnArgs: string[]; // 실행 시 전달할 인수
  protocol: "stdio" | "http"; // 통신 프로토콜
  isCustom?: boolean; // 사용자 정의 커스텀 에이전트인지 여부
}
```

#### `getAvailableAgents()`

설치되어 있고 ACP에서 사용할 수 있는 에이전트만 가져옵니다.

```typescript
import { getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();
// 반환값: CliAgentInfo[] (설치된 에이전트만)
```

#### `getAgentById(id)`

ID로 특정 에이전트를 가져옵니다.

```typescript
import { getAgentById } from "@/lib/acp";

const agent = getAgentById("claude");
// 반환값: CliAgentInfo | undefined
```

#### `setCustomAgents(agents)`

설정에서 커스텀 에이전트 정의를 지정합니다.

```typescript
import { setCustomAgents } from "@/lib/acp";

setCustomAgents([
  {
    id: "my-custom-cli",
    name: "My Custom CLI",
    binary: "mycli",
    versionCommand: "mycli --version",
    providerAlias: "my-provider",
    spawnArgs: [],
    protocol: "stdio",
  },
]);
```

### 관리자 함수

#### `acpManager.spawn(agentId, binary, args, env)`

새 CLI 에이전트 프로세스를 실행합니다.

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("claude", "claude", ["--print", "--output-format", "json"], {
  /* 커스텀 환경 변수 */
});
// 반환값: AcpSession
```

**허용되는 에이전트 ID**: `["claude", "codex", "gemini", "qwen"]`

#### `acpManager.sendPrompt(sessionId, prompt, timeoutMs)`

CLI 에이전트에 프롬프트를 전송하고 응답을 수집합니다.

```typescript
import { acpManager } from "@/lib/acp";

const response = await acpManager.sendPrompt(
  "acp-claude-1234567890-abc123",
  "What is 2+2?",
  120000 // 제한 시간 2분
);
// 반환값: Promise<string>
```

#### `acpManager.kill(sessionId)`

세션을 종료하고 정리합니다.

```typescript
import { acpManager } from "@/lib/acp";

const killed = acpManager.kill("acp-claude-1234567890-abc123");
// 반환값: boolean
```

#### `acpManager.getActiveSessions()`

활성 상태인 모든 세션을 가져옵니다.

```typescript
import { acpManager } from "@/lib/acp";

const sessions = acpManager.getActiveSessions();
// 반환값: AcpSession[]
```

#### `acpManager.killAll()`

모든 세션을 종료합니다.

```typescript
import { acpManager } from "@/lib/acp";

acpManager.killAll();
```

### 세션 인터페이스

```typescript
interface AcpSession {
  id: string; // 고유한 세션 ID
  agentId: string; // 에이전트 ID(예: "claude")
  process: ChildProcess; // 자식 프로세스 핸들
  alive: boolean; // 프로세스 실행 여부
  stdoutBuffer: string; // 누적된 stdout 버퍼
  stderrBuffer: string; // 누적된 stderr 버퍼
  createdAt: Date; // 생성 타임스탬프
}
```

### 이벤트

`AcpManager`는 `EventEmitter`를 확장하며 다음 이벤트를 발생시킵니다.

#### `stdout`

CLI 에이전트가 stdout에 쓸 때 발생합니다.

```typescript
acpManager.on("stdout", ({ sessionId, data }) => {
  console.log(`[${sessionId}] stdout: ${data}`);
});
```

#### `stderr`

CLI 에이전트가 stderr에 쓸 때 발생합니다.

```typescript
acpManager.on("stderr", ({ sessionId, data }) => {
  console.error(`[${sessionId}] stderr: ${data}`);
});
```

#### `exit`

CLI 에이전트 프로세스가 종료될 때 발생합니다.

```typescript
acpManager.on("exit", ({ sessionId, code, signal }) => {
  console.log(`[${sessionId}] exited with code ${code}, signal ${signal}`);
});
```

#### `error`

CLI 에이전트 프로세스에서 오류가 발생할 때 발생합니다.

```typescript
acpManager.on("error", ({ sessionId, error }) => {
  console.error(`[${sessionId}] error: ${error}`);
});
```

---

## 구성

### 환경 변수

ACP는 상위 프로세스의 모든 환경 변수를 상속하며 사용자 지정 환경 변수로 확장할 수 있습니다:

```typescript
acpManager.spawn("claude", "claude", [], {
  ANTHROPIC_API_KEY: "sk-...",
  DEBUG: "true",
});
```

### 실행 인수

각 에이전트에는 레지스트리에 정의된 기본 실행 인수가 있습니다. 이를 재정의할 수 있습니다:

```typescript
acpManager.spawn("claude", "claude", ["--print", "--verbose"], {});
```

### 타임아웃

기본 프롬프트 타임아웃은 **120초**(2분)입니다. 다음과 같이 재정의할 수 있습니다:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5분
```

### 감지 캐시

비용이 많이 드는 파일 시스템 스캔을 방지하기 위해 에이전트 감지 결과는 **60초** 동안 캐시됩니다. 강제로 새로 고치려면 다음과 같이 합니다:

```typescript
import { refreshAgentCache } from "@/lib/acp";

refreshAgentCache();
```

---

## 보안

### 명령어 인젝션 방지

ACP는 명령어 인젝션 공격을 방지하기 위해 버전 명령어를 검증합니다:

```typescript
const DISALLOWED_VERSION_COMMAND_CHARS = /[;&|<>`$\r\n]/;
```

다음 문자가 포함된 버전 명령어는 거부됩니다:

- `;` — 명령어 구분자
- `&` — 백그라운드 프로세스
- `|` — 파이프
- `<`, `>` — 리디렉션
- `` ` `` — 명령어 치환
- `$` — 변수 확장
- `\r`, `\n` — 줄바꿈

### 바이너리 이름 검증

ACP는 버전 명령어의 바이너리가 예상된 바이너리 이름과 일치하는지 검증합니다(사용자 지정 에이전트가 아닌 경우).

### 프로세스 격리

각 ACP 세션은 자체 하위 프로세스에서 실행됩니다. 세션이 종료되거나 타임아웃되면 프로세스가 종료됩니다.

---

## 성능

### 감지 성능

- **첫 번째 호출**: ~50-200ms(각 에이전트에 대해 `version` 명령어 실행)
- **캐시된 호출**: <1ms(캐시에서 반환)
- **캐시 TTL**: 60초

### 프롬프트 성능

- **실행**: ~50-100ms
- **프롬프트 전송**: ~10-50ms
- **응답 대기**: CLI 에이전트에 따라 다름(일반적으로 1-30초)
- **종료**: ~5초(SIGTERM) + 즉시(SIGKILL)

### 리소스 사용량

- **세션당 메모리**: ~10-50MB(CLI 에이전트에 따라 다름)
- **CPU**: 최소(I/O 바운드)
- **디스크**: 사용하지 않음

---

## 문제 해결

### "Unknown agent" 오류

**문제**: `acpManager.spawn()`이 `Unknown agent: <id>`를 발생시킵니다.

**해결 방법**: `spawn()`에서는 다음 에이전트만 사용할 수 있습니다:

- `claude`
- `codex`
- `gemini`
- `qwen`

다른 에이전트는 수동으로 실행하거나 사용자 지정 에이전트 정의를 통해 실행해야 합니다.

### "Session not alive" 오류

**문제**: `acpManager.sendPrompt()`가 `Session ${sessionId} is not alive`를 발생시킵니다.

**해결 방법**: 세션이 종료되었거나 강제 종료되었을 수 있습니다. 세션 상태를 확인하세요:

```typescript
const session = acpManager.getSession(sessionId);
if (!session?.alive) {
  // 세션을 다시 실행합니다
  acpManager.spawn("claude", "claude", [], {});
}
```

### "ACP timeout" 오류

**문제**: `acpManager.sendPrompt()`가 `ACP timeout after 120000ms`를 발생시킵니다.

**해결 방법**: 타임아웃을 늘리세요:

```typescript
await acpManager.sendPrompt(sessionId, prompt, 300000); // 5분
```

### CLI가 감지되지 않음

**문제**: `detectInstalledAgents()`가 CLI를 찾지 못합니다.

**해결 방법**:

1. **PATH 확인**: CLI가 시스템 PATH에 포함되어 있는지 확인하세요
2. **버전 명령어 확인**: `claude --version`을 수동으로 실행하세요
3. **권한 확인**: CLI가 실행 가능한지 확인하세요
4. **사용자 지정 에이전트**: 비표준 CLI에 대한 사용자 지정 에이전트 정의를 추가하세요

### 권한 거부

**문제**: ACP가 CLI를 실행할 수 없습니다.

**해결 방법**:

1. **파일 권한 확인**: `chmod +x /usr/local/bin/claude`
2. **소유권 확인**: OmniRoute에 읽기/실행 권한이 있는지 확인하세요
3. **SELinux/AppArmor 확인**: 프로세스 실행을 차단할 수 있습니다

---

## 예제

### 예제 1: Claude Code 실행 및 사용

```typescript
import { acpManager, detectInstalledAgents } from "@/lib/acp";

// 설치된 에이전트 감지
const agents = detectInstalledAgents();
const claude = agents.find((a) => a.id === "claude");

if (claude?.installed) {
  // 새 세션 실행
  const session = acpManager.spawn("claude", claude.binary, ["--print", "--output-format", "json"]);

  // 프롬프트 전송
  const response = await acpManager.sendPrompt(session.id, "양자 컴퓨팅을 100단어로 설명해 주세요");

  console.log("Claude의 응답:", response);

  // 정리
  acpManager.kill(session.id);
}
```

### 예제 2: 대체 옵션을 사용한 자동 탐색

```typescript
import { acpManager, getAvailableAgents } from "@/lib/acp";

const available = getAvailableAgents();

// Claude를 먼저 시도하고, 사용할 수 없으면 Codex로 대체
let agentId = "claude";
if (!available.find((a) => a.id === "claude")) {
  if (available.find((a) => a.id === "codex")) {
    agentId = "codex";
  } else {
    throw new Error("ACP 호환 CLI 에이전트를 찾을 수 없습니다");
  }
}

const agent = available.find((a) => a.id === agentId)!;
const session = acpManager.spawn(agentId, agent.binary, agent.spawnArgs);

const response = await acpManager.sendPrompt(session.id, "안녕하세요!");

acpManager.kill(session.id);
```

### 예제 3: 사용자 지정 에이전트

```typescript
import { setCustomAgents, detectInstalledAgents } from "@/lib/acp";

// 사용자 지정 CLI 에이전트 등록
setCustomAgents([
  {
    id: "my-llm-cli",
    name: "My LLM CLI",
    binary: "myllm",
    versionCommand: "myllm --version",
    providerAlias: "my-llm-provider",
    spawnArgs: ["--format", "json"],
    protocol: "stdio",
  },
]);

// 이제 detectInstalledAgents()에 "my-llm-cli"가 포함됨
const agents = detectInstalledAgents();
```

---

## 다음 단계

- **[API 참조](../reference/API_REFERENCE.md)** — REST API 엔드포인트
- **[제공자 참조](../reference/PROVIDER_REFERENCE.md)** — 전체 352개 제공자
- **[MCP 서버](./MCP-SERVER.md)** — Model Context Protocol 통합
- **[A2A 서버](./A2A-SERVER.md)** — 에이전트 간 프로토콜
- **[클라우드 에이전트](./CLOUD_AGENT.md)** — 클라우드 기반 에이전트

---

## 참조

- [AionUi 프로젝트](https://github.com/iOfficeAI/AionUi) — ACP 자동 감지에 대한 아이디어 제공
- [ACP 소스 코드](../../src/lib/acp/) — 구현 세부 정보
  - `manager.ts` — 프로세스 수명 주기 관리
  - `registry.ts` — 에이전트 탐색 및 등록
  - `index.ts` — 공개 API 내보내기
