# ACP registry and registered CLI launchers (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/ACP.md) · 🇪🇹 [am](../../../am/docs/frameworks/ACP.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/ACP.md) · 🇦🇿 [az](../../../az/docs/frameworks/ACP.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/ACP.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/ACP.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/ACP.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/ACP.md) · 🇩🇰 [da](../../../da/docs/frameworks/ACP.md) · 🇩🇪 [de](../../../de/docs/frameworks/ACP.md) · 🇬🇷 [el](../../../el/docs/frameworks/ACP.md) · 🇪🇸 [es](../../../es/docs/frameworks/ACP.md) · 🇪🇪 [et](../../../et/docs/frameworks/ACP.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/ACP.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/ACP.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/ACP.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/ACP.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/ACP.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/ACP.md) · 🇮🇱 [he](../../../he/docs/frameworks/ACP.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/ACP.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/ACP.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/ACP.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/ACP.md) · 🇮🇩 [id](../../../id/docs/frameworks/ACP.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/ACP.md) · 🇮🇹 [it](../../../it/docs/frameworks/ACP.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/ACP.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/ACP.md) · 🇰🇭 [km](../../../km/docs/frameworks/ACP.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/ACP.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/ACP.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/ACP.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/ACP.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/ACP.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/ACP.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/ACP.md) · 🇲🇲 [my](../../../my/docs/frameworks/ACP.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/ACP.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/ACP.md) · 🇳🇴 [no](../../../no/docs/frameworks/ACP.md) · 🇮🇳 [or](../../../or/docs/frameworks/ACP.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/ACP.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/ACP.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/ACP.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/ACP.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/ACP.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/ACP.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/ACP.md) · 🇱🇰 [si](../../../si/docs/frameworks/ACP.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/ACP.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/ACP.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/ACP.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/ACP.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/ACP.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/ACP.md) · 🇮🇳 [te](../../../te/docs/frameworks/ACP.md) · 🇹🇭 [th](../../../th/docs/frameworks/ACP.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/ACP.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/ACP.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/ACP.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/ACP.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/ACP.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/ACP.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/ACP.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/ACP.md)

---

OmniRoute는 **CLI 탐색**, **네이티브 Agent Client Protocol**, **레거시 stdio 어댑터**를 구분합니다. 설치된 바이너리를 찾았다는 사실만으로는 해당 바이너리의 인증 상태, 모델 호환성 또는 프롬프트 처리 준비 상태가 입증되지 않습니다.

대시보드는 인벤토리 및 사용자 지정 에이전트 등록에 `GET /api/acp/agents`와 `POST /api/acp/agents`를 사용합니다. 이들은 로컬 전용 관리 경로이며, 프로세스를 생성하거나 프롬프트를 제출하기 위한 공개 API가 아닙니다. 내부 `AcpManager`가 자동으로 HTTP 공급자 폴백이 되는 것은 아닙니다.

## 등록된 계약

`config/cli-tools-manifest.json`은 기본 제공 실행 바이너리, 인수 및 백엔드 모드에 대한 단일 진실 공급원입니다. 레지스트리는 이 매니페스트에서 정의를 파생합니다. 탐지 결과는 60초 동안 캐시됩니다.

- `acp`: Gemini 계약은 `gemini --experimental-acp`를 실행하고 공식 TypeScript SDK를 통해 줄바꿈으로 구분된 ACP JSON-RPC로 통신합니다.
- `stdio-adapter`: 등록된 다른 계약은 레거시 줄바꿈 입력, stdout 출력 어댑터를 유지합니다. 2초 동안 출력이 유휴 상태이면 응답이 종료됩니다. 이 어댑터는 해당 CLI의 네이티브 ACP 지원을 **보증하지 않습니다**.

Gemini는 [CLI 참조](https://geminicli.com/docs/cli/cli-reference/)에 실행 플래그를 문서화합니다. 클라이언트는 초기화, 세션 생성, 프롬프트 요청, 알림 및 취소에 [공식 ACP SDK](https://github.com/agentclientprotocol/typescript-sdk)를 사용합니다.

사용자 지정 에이전트 정의는 계속해서 관리자가 제어하는 실행 계약입니다. 바이너리와 인수를 등록하면 해당 프로세스에 서버 사용자의 로컬 실행 권한이 부여되며, 등록은 샌드박스가 아닙니다. 버전 탐색은 등록된 실행 파일과 인식되는 버전 플래그만 허용합니다.

## 내부 실행 API

```typescript
import { acpManager } from "@/lib/acp";

const session = acpManager.spawn("gemini", {
  cwd: process.cwd(),
  // 이 에이전트에 의도적으로 할당된 공급자 변수만 전달합니다.
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  },
});

try {
  const response = await acpManager.sendPrompt(session.id, "이 프로젝트를 설명해 주세요", 120_000);
  // 호출 애플리케이션에서 응답을 사용합니다.
} finally {
  acpManager.kill(session.id);
}
```

`spawn(agentId, options)`는 등록된 정의에서 실행 파일과 인수를 확인합니다. 호출자가 지정할 수 있는 옵션은 `cwd`와 `env`뿐이며, 이전 `spawn(agentId, binary, args, env)` 시그니처와 실행 파일 재정의는 거부됩니다. 이 관리자는 HTTP 실행 계약을 지원하지 않습니다.

자식 프로세스는 CLI 실행기와 동일한 운영 체제, 터미널, 로캘 및 인증서 허용 목록을 상속합니다. 서버/공급자 비밀은 부모 환경에서 복사되지 않습니다. 선택한 CLI에 필요한 자격 증명은 명시적으로 전달하거나 해당 CLI 자체의 로컬 인증을 통해 제공해야 합니다. 자식 프로세스는 여전히 로컬 사용자의 파일 시스템 권한을 가지며 자체 구성을 읽을 수 있습니다.

## 네이티브 수명 주기 및 제한

1. 등록된 바이너리를 생성하고 ACP를 초기화한 후 선택한 작업 디렉터리를 루트로 하는 세션을 생성합니다. 초기화 제한 시간은 10초입니다.
2. 프롬프트를 제출하고 해당 세션에 대한 텍스트 알림만 수집합니다. 완료 여부는 stdout의 무출력 기간이 아니라 프롬프트 RPC 응답으로 결정됩니다.
3. 완료되지 않은 초기화 시간을 포함하여 하나의 프롬프트 기한을 사용하며, 기본값은 120초입니다. 동일한 프로세스의 동시 프롬프트는 거부됩니다.
4. 네이티브 시간 초과 시 `session/cancel`을 시도하고 프로세스를 종료합니다. 종료 전 제한된 100 ms 동안 알림이 플러시될 수 있습니다.
5. 초기화가 실패하거나, 연결이 닫히거나, 프로세스가 종료되거나, 호출자가 프로세스를 중단하면 전송 상태를 닫고 세션을 제거합니다.

도구 권한 요청은 거부됩니다. 파일 시스템 또는 터미널 클라이언트 기능은 알리지 않습니다. 이러한 제한은 자식 바이너리 자체를 샌드박스화하거나 CLI 자체의 권한 부여 설정을 대체하지 않습니다.

네이티브 텍스트와 레거시 stdout/stderr 모두 최대 1 MiB의 문자를 유지하며, 잘림 알림과 함께 최신 출력을 보존합니다. 개별 네이티브 와이어 프레임은 SDK 파싱 전에 2 MiB의 바이트로 제한됩니다. 버퍼는 프롬프트마다 초기화됩니다.

`kill(sessionId)`는 SIGTERM을 전송한 다음, 프로세스가 종료되지 않으면 5초 후 SIGKILL을 전송합니다. 레거시 프롬프트 시간 초과는 리스너와 타이머를 해제하지만 세션은 다른 프롬프트에 사용할 수 있도록 유지합니다. 호출자는 작업 완료 시 계속해서 `kill()` 또는 `killAll()`을 호출할 책임이 있습니다.

## 이벤트 및 검사

관리자는 각각 `sessionId`를 포함하는 `stdout`, `stderr`, `exit` 이벤트를 발생시킵니다. `sessionError`는 정제된 전송 오류를 보고합니다. 호환성을 위한 `error` 이벤트는 구독자가 있을 때만 발생하므로, 바이너리가 누락되어도 처리되지 않은 EventEmitter 오류가 발생하지 않습니다.

- `getSession(sessionId)`는 관리되는 세션을 반환하며, 없으면 `undefined`를 반환합니다.
- `getActiveSessions()`는 중지되었거나 중지 중인 세션을 제외합니다.
- `sendInput(sessionId, input)`은 실행 중인 레거시 어댑터에서만 사용할 수 있습니다. 네이티브 ACP는 JSON-RPC 스트림을 보호하기 위해 원시 입력을 거부합니다.
- `killAll()`은 해당 인스턴스에서 관리하는 모든 세션을 종료합니다.

## 검증 범위

결정론적 픽스처는 네이티브 핸드셰이크, 텍스트 출력, 거부된 권한, 취소, 동시 프롬프트, 초기화 실패, 프로세스 종료, 출력 제한 및 비밀 격리를 다룹니다. 기존 레거시 버퍼/리스너 회귀도 계속 다룹니다. 이러한 테스트는 실제 Gemini 로그인이나 성공적인 공급자 추론을 입증하지 않습니다. 이를 위해서는 대상 환경에서 별도로 권한이 부여된 스모크 테스트가 필요합니다.

## 관련 문서

- [에이전트 프로토콜](./AGENT_PROTOCOLS_GUIDE.md)
- [CLI 실행 계약](../guides/CLI-LAUNCH-CONTRACTS.md)
- [CLI 도구](../reference/CLI-TOOLS.md)
- [A2A 서버](./A2A-SERVER.md)
- [클라우드 에이전트](./CLOUD_AGENT.md)
