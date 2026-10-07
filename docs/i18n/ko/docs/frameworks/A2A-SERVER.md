# OmniRoute A2A Server Documentation (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/A2A-SERVER.md) · 🇪🇹 [am](../../../am/docs/frameworks/A2A-SERVER.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/A2A-SERVER.md) · 🇦🇿 [az](../../../az/docs/frameworks/A2A-SERVER.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/A2A-SERVER.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/A2A-SERVER.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/A2A-SERVER.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/A2A-SERVER.md) · 🇩🇰 [da](../../../da/docs/frameworks/A2A-SERVER.md) · 🇩🇪 [de](../../../de/docs/frameworks/A2A-SERVER.md) · 🇬🇷 [el](../../../el/docs/frameworks/A2A-SERVER.md) · 🇪🇸 [es](../../../es/docs/frameworks/A2A-SERVER.md) · 🇪🇪 [et](../../../et/docs/frameworks/A2A-SERVER.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/A2A-SERVER.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/A2A-SERVER.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/A2A-SERVER.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/A2A-SERVER.md) · 🇮🇱 [he](../../../he/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/A2A-SERVER.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/A2A-SERVER.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/A2A-SERVER.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/A2A-SERVER.md) · 🇮🇩 [id](../../../id/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/A2A-SERVER.md) · 🇮🇹 [it](../../../it/docs/frameworks/A2A-SERVER.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/A2A-SERVER.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/A2A-SERVER.md) · 🇰🇭 [km](../../../km/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/A2A-SERVER.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/A2A-SERVER.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/A2A-SERVER.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/A2A-SERVER.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/A2A-SERVER.md) · 🇲🇲 [my](../../../my/docs/frameworks/A2A-SERVER.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/A2A-SERVER.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/A2A-SERVER.md) · 🇳🇴 [no](../../../no/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [or](../../../or/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/A2A-SERVER.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/A2A-SERVER.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/A2A-SERVER.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/A2A-SERVER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/A2A-SERVER.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/A2A-SERVER.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/A2A-SERVER.md) · 🇱🇰 [si](../../../si/docs/frameworks/A2A-SERVER.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/A2A-SERVER.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/A2A-SERVER.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/A2A-SERVER.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/A2A-SERVER.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/A2A-SERVER.md) · 🇮🇳 [te](../../../te/docs/frameworks/A2A-SERVER.md) · 🇹🇭 [th](../../../th/docs/frameworks/A2A-SERVER.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/A2A-SERVER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/A2A-SERVER.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/A2A-SERVER.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/A2A-SERVER.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/A2A-SERVER.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/A2A-SERVER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/A2A-SERVER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/A2A-SERVER.md)

---

> Agent-to-Agent Protocol v0.3 — 지능형 라우팅 에이전트로서의 OmniRoute

A2A 인터페이스는 두 가지 형태로 제공됩니다:

- `POST /a2a`의 **JSON-RPC 2.0**(표준 진입점, `src/app/a2a/route.ts`에 정의됨).
- 대시보드 및 도구를 위한 `/api/a2a/*` 하위의 **REST**(상태, 작업 목록, 취소).

작업은 `A2ATaskManager`(`src/lib/a2a/taskManager.ts`, 기본 TTL 5분)에서 추적합니다. 스킬은 `src/lib/a2a/taskExecution.ts`의 `A2A_SKILL_HANDLERS`를 통해 디스패치됩니다.

## 에이전트 검색

```bash
curl http://localhost:20128/.well-known/agent.json
```

OmniRoute의 기능, 스킬 및 인증 요구 사항을 설명하는 에이전트 카드를 반환합니다.

에이전트 카드의 `version` 필드는 `process.env.npm_package_version`에서 가져오므로(`src/app/.well-known/agent.json/route.ts:13` 참조), 릴리스할 때마다 `package.json`과 자동으로 동기화됩니다.

---

## 인증

모든 `/a2a` 요청에는 `Authorization` 헤더를 통해 API 키를 제공해야 합니다:

```
Authorization: Bearer YOUR_OMNIROUTE_API_KEY
```

서버에 API 키가 구성되어 있지 않으면 인증을 건너뜁니다.

## 활성화

A2A는 **Endpoints → A2A** 토글로 제어되며 기본적으로 비활성화되어 있습니다. 비활성화된 경우,
`GET /api/a2a/status`는 `status: "disabled"` 및 `online: false`를 보고하며, `POST /a2a`에 대한
JSON-RPC 호출은 JSON-RPC 오류 코드 `-32000`과 함께 HTTP 503을 반환합니다.

---

## JSON-RPC 2.0 메서드

### `message/send` — 동기 실행

스킬에 메시지를 전송하고 전체 응답이 완료될 때까지 기다립니다.

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/send",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Write a hello world in Python"}],
      "metadata": {"model": "auto", "combo": "fast-coding"}
    }
  }'
```

**응답:**

```json
{
  "jsonrpc": "2.0",
  "id": "1",
  "result": {
    "task": { "id": "uuid", "state": "completed" },
    "artifacts": [{ "type": "text", "content": "..." }],
    "metadata": {
      "routing_explanation": "Selected claude-sonnet via provider \"anthropic\" (latency: 1200ms, cost: $0.003)",
      "cost_envelope": {
        "estimated": 0.005,
        "actual": 0.003,
        "currency": "USD"
      },
      "resilience_trace": [
        {
          "event": "primary_selected",
          "provider": "anthropic",
          "timestamp": "..."
        }
      ],
      "policy_verdict": {
        "allowed": true,
        "reason": "within budget and quota limits"
      }
    }
  }
}
```

### `message/stream` — SSE 스트리밍

`message/send`와 동일하지만 실시간 스트리밍을 위해 서버 전송 이벤트(Server-Sent Events)를 반환합니다.

```bash
curl -N -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{
    "jsonrpc": "2.0",
    "id": "1",
    "method": "message/stream",
    "params": {
      "skill": "smart-routing",
      "messages": [{"role": "user", "content": "Explain quantum computing"}]
    }
  }'
```

**SSE 이벤트:**

```
data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"working"},"chunk":{"type":"text","content":"..."}}}

: heartbeat 2026-03-03T17:00:00Z

data: {"jsonrpc":"2.0","method":"message/stream","params":{"task":{"id":"...","state":"completed"},"metadata":{...}}}
```

### `tasks/get` — 작업 상태 조회

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"2","method":"tasks/get","params":{"taskId":"TASK_UUID"}}'
```

### `tasks/cancel` — 작업 취소

```bash
curl -X POST http://localhost:20128/a2a \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_KEY" \
  -d '{"jsonrpc":"2.0","id":"3","method":"tasks/cancel","params":{"taskId":"TASK_UUID"}}'
```

---

## 사용 가능한 스킬

OmniRoute는 `src/lib/a2a/taskExecution.ts::A2A_SKILL_HANDLERS`에 연결된 6개의 A2A 스킬을 제공합니다. 각 스킬 모듈은 `src/lib/a2a/skills/`에 있습니다.

| 스킬          | ID                   | 설명                                                                                                                                            | 태그                 | 예시                                      |
| :------------ | :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- | :---------------------------------------- |
| 스마트 라우팅 | `smart-routing`      | OmniRoute의 콤보 엔진과 점수 계산을 사용하여 프롬프트를 최적의 제공자/콤보로 라우팅합니다                                                       | 라우팅, 제공자       | "이 프롬프트를 최적의 모델로 라우팅해 줘" |
| 할당량 관리   | `quota-management`   | 제공자별 할당량 상태를 보고하고 호출자가 제한 적용/전환 시점을 결정하도록 지원합니다                                                            | 할당량, 제공자       | "anthropic의 할당량을 확인해 줘"          |
| 제공자 검색   | `provider-discovery` | 설치된 제공자를 기능, 무료 티어 여부, OAuth 상태와 함께 나열합니다                                                                              | 제공자, 검색         | "사용 가능한 제공자는 무엇인가요?"        |
| 비용 분석     | `cost-analysis`      | 카탈로그와 최근 사용량을 바탕으로 요청/대화의 비용을 추정합니다                                                                                 | 비용, 사용량         | "이 대화의 비용을 추정해 줘"              |
| 상태 보고서   | `health-report`      | 제공자별 회로 차단기, 쿨다운, 잠금 상태를 집계합니다                                                                                            | 상태, 복원력         | "모든 제공자의 상태를 보여 줘"            |
| 기능 목록     | `list-capabilities`  | 컨텍스트 주입을 위한 원본 SKILL.md URL과 함께 전체 45개 항목의 Agent Skills 카탈로그(23개 API + 21개 CLI + 1개 구성)를 마크다운 표로 반환합니다 | 카탈로그, 검색, 스킬 | "모든 OmniRoute 기능을 나열해 줘"         |

> Agent Card는 실시간 352개 제공자 카탈로그와 일치하도록 유지해야 합니다. 제공자 수와 무료/인증 불필요 메타데이터는 런타임 레지스트리에서 가져옵니다.

### `list-capabilities` 스킬 상세 정보

`list-capabilities` 스킬은 API 호출을 보내기 전에 OmniRoute가 제공하는 기능을 파악해야 하는 외부 에이전트에 특히 유용합니다. 이 스킬은 구조화된 마크다운 표 아티팩트를 반환합니다.

```
| ID | 이름 | 카테고리 | 영역 | 엔드포인트/명령 | 원본 URL |
| --- | --- | --- | --- | --- | --- |
| omni-auth | 인증 및 세션 | api | auth | POST /api/auth/login, ... | https://raw.githubusercontent.com/... |
...
```

각 행에는 에이전트가 전체 SKILL.md를 즉시 가져올 수 있도록 `rawUrl` 열이 포함됩니다. `metadata.totalSkills` 필드는 카탈로그 크기(현재 45개)를 반영합니다. 구현 파일: `src/lib/a2a/skills/listCapabilities.ts`. [AGENT-SKILLS.md](./AGENT-SKILLS.md)도 참조하세요.

---

## REST API(보조)

JSON-RPC 엔드포인트 `/a2a`는 표준 A2A 진입점입니다. 아래 REST 엔드포인트는 대시보드 및 외부 도구를 위한 보조 액세스를 제공합니다.

| 엔드포인트                   | 메서드 | 설명                                                      | 인증                                             |
| :--------------------------- | :----- | :-------------------------------------------------------- | :----------------------------------------------- |
| `/api/a2a/status`            | GET    | 서버 상태, 등록된 스킬                                    | (공개)                                           |
| `/api/a2a/tasks`             | GET    | 필터를 적용하여 작업 목록 조회                            | 관리                                             |
| `/api/a2a/tasks/[id]`        | GET    | ID로 작업 조회                                            | 관리                                             |
| `/api/a2a/tasks/[id]/cancel` | POST   | 실행 중인 작업 취소                                       | 관리                                             |
| `/.well-known/agent.json`    | GET    | 에이전트 카드(A2A 검색)                                   | (공개, 3600초 동안 캐시됨)                       |
| `/api/a2a/tasks`             | POST   | OmniConductor 플릿으로의 인바운드 위임(Conductor PRD RF5) | Bearer와 `OMNIROUTE_API_KEY` 비교 + `a2aEnabled` |

**인바운드 Conductor 위임(`POST /api/a2a/tasks`):** 외부 A2A 에이전트는 OmniRoute를 통해 코딩 작업을 OmniConductor 플릿에 위임합니다. 본문: `{ skill: "conductor" | "conductor-cli-<profile>", messages: [{role, content}], metadata: { conductor: { repo: { url, base_ref? }, mode?, cli?, model? } } }` — Conductor 플릿 스킬(에이전트 카드에 명시된 스킬)만 위임할 수 있으며, 플릿이 git 저장소에서 작업하므로 `metadata.conductor.repo.url`은 필수입니다. 이 라우트는 서버 측 `CONDUCTOR_ORCHESTRATOR_TOKEN`(대체 값: `CONDUCTOR_HUB_TOKEN`)을 사용하여 허브의 `POST /v1/tasks`로 변환하고 `201 { conductor_task_id, state: "submitted" }`를 반환합니다. 작업 상태는 SSE→A2A 미러(RF1)를 통해 다시 전달되며 `GET /api/a2a/tasks?skill=conductor`를 통해 확인할 수 있습니다.

---

## 새 스킬 추가하기

1. **스킬 파일 생성:** `src/lib/a2a/skills/<your-skill>.ts`

   `(task: A2ATask) => Promise<{ artifacts, metadata }>` 형태의 비동기 함수를 내보냅니다. `smartRouting.ts`와 같은 기존 스킬의 구조를 따르세요.

2. **핸들러 등록:** `src/lib/a2a/taskExecution.ts`의 `A2A_SKILL_HANDLERS`에 항목을 추가합니다.

   ```typescript
   export const A2A_SKILL_HANDLERS = {
     // ...기존 스킬
     "your-skill": async (task) => {
       const skillModule = await import("./skills/yourSkill");
       return skillModule.executeYourSkill(task);
     },
   };
   ```

3. **에이전트 카드에 공개:** `src/app/.well-known/agent.json/route.ts`의 `skills` 배열에 다음을 추가합니다.

   ```json
   {
     "id": "your-skill",
     "name": "Your Skill",
     "description": "Brief, intent-focused description",
     "tags": ["routing", "quota"],
     "examples": ["Sample natural-language invocation"]
   }
   ```

4. **테스트 작성:** `tests/unit/a2a-<your-skill>.test.ts`. 정상 경로와 오류 경로를 모두 다루세요.

5. 이 파일의 `Available Skills` 표에 새 스킬을 **문서화**하세요.

---

## 작업 TTL

작업은 `ttlMinutes`(기본값 5분) 후 만료됩니다. 이 값은 `src/lib/a2a/taskManager.ts:82`의 `A2ATaskManager` 생성자에서 구성됩니다. 값을 사용자 지정하려면 `A2ATaskManager` 인스턴스 생성을 포크하고 다른 값을 전달하세요(예: TTL을 15분으로 설정하려면 `new A2ATaskManager(15)`). 백그라운드 인터벌은 60초마다 만료된 작업을 정리합니다.

---

## 작업 수명 주기

```
제출됨 → 작업 중 → 완료됨
                 → 실패함
                 → 취소됨
```

- 작업은 기본적으로 5분 후 만료됩니다([작업 TTL](#task-ttl) 참조).
- 종료 상태: `completed`, `failed`, `cancelled`
- 이벤트 로그는 모든 상태 전환을 추적합니다.

---

## 오류 코드

| 코드   | 의미                               |
| :----- | :--------------------------------- |
| -32700 | 구문 분석 오류(유효하지 않은 JSON) |
| -32600 | 유효하지 않은 요청 / 인증되지 않음 |
| -32601 | 메서드 또는 스킬을 찾을 수 없음    |
| -32602 | 유효하지 않은 매개변수             |
| -32603 | 내부 오류                          |
| -32000 | A2A 엔드포인트가 비활성화됨        |

---

## 통합 예제

### Python (requests)

```python
import requests

resp = requests.post("http://localhost:20128/a2a", json={
    "jsonrpc": "2.0", "id": "1",
    "method": "message/send",
    "params": {
        "skill": "smart-routing",
        "messages": [{"role": "user", "content": "Hello"}]
    }
}, headers={"Authorization": "Bearer YOUR_KEY"})

result = resp.json()["result"]
print(result["artifacts"][0]["content"])
print(result["metadata"]["routing_explanation"])
```

### TypeScript (fetch)

```typescript
const resp = await fetch("http://localhost:20128/a2a", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer YOUR_KEY",
  },
  body: JSON.stringify({
    jsonrpc: "2.0",
    id: "1",
    method: "message/send",
    params: {
      skill: "smart-routing",
      messages: [{ role: "user", content: "Hello" }],
    },
  }),
});
const { result } = await resp.json();
console.log(result.metadata.routing_explanation);
```
