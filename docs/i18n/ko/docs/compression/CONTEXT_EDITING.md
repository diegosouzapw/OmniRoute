# Delegated Context Editing (Anthropic) (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/CONTEXT_EDITING.md) · 🇪🇹 [am](../../../am/docs/compression/CONTEXT_EDITING.md) · 🇸🇦 [ar](../../../ar/docs/compression/CONTEXT_EDITING.md) · 🇦🇿 [az](../../../az/docs/compression/CONTEXT_EDITING.md) · 🇧🇬 [bg](../../../bg/docs/compression/CONTEXT_EDITING.md) · 🇧🇩 [bn](../../../bn/docs/compression/CONTEXT_EDITING.md) · 🇧🇦 [bs](../../../bs/docs/compression/CONTEXT_EDITING.md) · 🇨🇿 [cs](../../../cs/docs/compression/CONTEXT_EDITING.md) · 🇩🇰 [da](../../../da/docs/compression/CONTEXT_EDITING.md) · 🇩🇪 [de](../../../de/docs/compression/CONTEXT_EDITING.md) · 🇬🇷 [el](../../../el/docs/compression/CONTEXT_EDITING.md) · 🇪🇸 [es](../../../es/docs/compression/CONTEXT_EDITING.md) · 🇪🇪 [et](../../../et/docs/compression/CONTEXT_EDITING.md) · 🇮🇷 [fa](../../../fa/docs/compression/CONTEXT_EDITING.md) · 🇫🇮 [fi](../../../fi/docs/compression/CONTEXT_EDITING.md) · 🇫🇷 [fr](../../../fr/docs/compression/CONTEXT_EDITING.md) · 🇮🇪 [ga](../../../ga/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [gu](../../../gu/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ha](../../../ha/docs/compression/CONTEXT_EDITING.md) · 🇮🇱 [he](../../../he/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [hi](../../../hi/docs/compression/CONTEXT_EDITING.md) · 🇭🇷 [hr](../../../hr/docs/compression/CONTEXT_EDITING.md) · 🇭🇺 [hu](../../../hu/docs/compression/CONTEXT_EDITING.md) · 🇦🇲 [hy](../../../hy/docs/compression/CONTEXT_EDITING.md) · 🇮🇩 [id](../../../id/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [ig](../../../ig/docs/compression/CONTEXT_EDITING.md) · 🇮🇹 [it](../../../it/docs/compression/CONTEXT_EDITING.md) · 🇯🇵 [ja](../../../ja/docs/compression/CONTEXT_EDITING.md) · 🇬🇪 [ka](../../../ka/docs/compression/CONTEXT_EDITING.md) · 🇰🇭 [km](../../../km/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [kn](../../../kn/docs/compression/CONTEXT_EDITING.md) · 🇱🇹 [lt](../../../lt/docs/compression/CONTEXT_EDITING.md) · 🇱🇻 [lv](../../../lv/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ml](../../../ml/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [mr](../../../mr/docs/compression/CONTEXT_EDITING.md) · 🇲🇾 [ms](../../../ms/docs/compression/CONTEXT_EDITING.md) · 🇲🇹 [mt](../../../mt/docs/compression/CONTEXT_EDITING.md) · 🇲🇲 [my](../../../my/docs/compression/CONTEXT_EDITING.md) · 🇳🇵 [ne](../../../ne/docs/compression/CONTEXT_EDITING.md) · 🇳🇱 [nl](../../../nl/docs/compression/CONTEXT_EDITING.md) · 🇳🇴 [no](../../../no/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [or](../../../or/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [pa](../../../pa/docs/compression/CONTEXT_EDITING.md) · 🇵🇭 [phi](../../../phi/docs/compression/CONTEXT_EDITING.md) · 🇵🇱 [pl](../../../pl/docs/compression/CONTEXT_EDITING.md) · 🇵🇹 [pt](../../../pt/docs/compression/CONTEXT_EDITING.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/CONTEXT_EDITING.md) · 🇷🇴 [ro](../../../ro/docs/compression/CONTEXT_EDITING.md) · 🇷🇺 [ru](../../../ru/docs/compression/CONTEXT_EDITING.md) · 🇱🇰 [si](../../../si/docs/compression/CONTEXT_EDITING.md) · 🇸🇰 [sk](../../../sk/docs/compression/CONTEXT_EDITING.md) · 🇸🇮 [sl](../../../sl/docs/compression/CONTEXT_EDITING.md) · 🇷🇸 [sr](../../../sr/docs/compression/CONTEXT_EDITING.md) · 🇸🇪 [sv](../../../sv/docs/compression/CONTEXT_EDITING.md) · 🇰🇪 [sw](../../../sw/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [ta](../../../ta/docs/compression/CONTEXT_EDITING.md) · 🇮🇳 [te](../../../te/docs/compression/CONTEXT_EDITING.md) · 🇹🇭 [th](../../../th/docs/compression/CONTEXT_EDITING.md) · 🇹🇷 [tr](../../../tr/docs/compression/CONTEXT_EDITING.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/CONTEXT_EDITING.md) · 🇵🇰 [ur](../../../ur/docs/compression/CONTEXT_EDITING.md) · 🇺🇿 [uz](../../../uz/docs/compression/CONTEXT_EDITING.md) · 🇻🇳 [vi](../../../vi/docs/compression/CONTEXT_EDITING.md) · 🇳🇬 [yo](../../../yo/docs/compression/CONTEXT_EDITING.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/CONTEXT_EDITING.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/CONTEXT_EDITING.md)

---

위임형 **컨텍스트 편집(Context Editing)**은 Claude 전용 컨텍스트 관리 기능입니다. 요청 본문이 프록시를
떠나기 _전에_ 다시 작성하는 OmniRoute의 로컬 압축 엔진(Caveman, RTK, LLMLingua, 스택형 파이프라인)과 달리,
컨텍스트 편집은 **제공자**에게 자체 실행 컨텍스트 창에서 오래된 도구 사용 / 도구 결과 블록을 삭제하도록
요청합니다. OmniRoute는 본문 매개변수(`context_management.edits[]`)만 추가하며, 실제 삭제는 Claude가 자체
토크나이저를 기준으로 수행합니다.

이는 본질적으로 위임형 기능입니다. 다른 제공자는 이 매개변수를 거부하므로 OmniRoute는 이 기능을
Claude 및 Claude-Code 호환 릴레이로 엄격하게 제한합니다.

진실 공급원: `open-sse/config/contextEditing.ts`(전략 ID, 본문 삽입, 텔레메트리
추출), `open-sse/executors/base.ts`(삽입 게이트 + 400 폴백), 그리고
`open-sse/services/compression/types.ts`(설정 구조 + 기본값).

## `clear_tool_uses`의 기능

OmniRoute는 송신 Anthropic Messages 본문에 단일 편집 항목을 삽입합니다.

```json
{
  "context_management": {
    "edits": [
      {
        "type": "clear_tool_uses_20250919",
        "trigger": { "type": "input_tokens", "value": 100000 },
        "keep": { "type": "tool_uses", "value": 3 }
      }
    ]
  }
}
```

- `type: "clear_tool_uses_20250919"` — 날짜가 포함된 Anthropic 전략 ID(`CLEAR_TOOL_USES_STRATEGY`).
- `trigger.value: 100000` — 요청의 입력 토큰이 이 임계값을 초과하면 Claude가 오래된
  도구 사용/결과 쌍을 삭제하기 시작합니다(`CONTEXT_EDITING_DEFAULT_TRIGGER_TOKENS`, Anthropic의 기본값).
- `keep.value: 3` — 가장 최근의 N개 도구 사용/결과 쌍은 변경하지 않고 유지합니다
  (`CONTEXT_EDITING_DEFAULT_KEEP_TOOL_USES`).

베타 기능은 `anthropic-beta: context-management-2025-06-27` 헤더를 통해 표시되며,
OmniRoute는 이미 Claude 요청에 이 헤더를 전송합니다.

삽입은 `applyContextEditingToBody()`가 수행하며 **멱등성**을 갖습니다. 본문에 `clear_tool_uses`
편집 항목이 이미 존재하면(이전 호출에서 추가되었거나 클라이언트가 제공한 경우) 본문을
그대로 둡니다. `clear_thinking_20251015` 편집 항목도 존재하는 경우 OmniRoute는
`clear_thinking` 편집 항목이 앞으로 오도록 안정 정렬합니다. Anthropic은 `edits[]` 배열에서
`clear_thinking`이 `clear_tool_uses`보다 앞에 와야 한다고 요구하기 때문입니다.

## 조합별 활성화 토글

컨텍스트 편집은 기본적으로 **비활성화**되어 있으며 옵트인 방식입니다. 토글은 압축 설정에 포함된
단일 불리언 값입니다.

- 설정 키: `contextEditing.enabled`(camelCase — `context_editing` / `context-editing`이 **아님**).
- 유형: `open-sse/services/compression/types.ts`의
  `ContextEditingConfig { enabled: boolean }`.
- 기본값: `DEFAULT_CONTEXT_EDITING_CONFIG = { enabled: false }`.
- Zod 스키마: `src/shared/validation/compressionConfigSchemas.ts`의 `contextEditingConfigSchema`.
- 저장: 나머지 압축 설정과 함께 영구 저장됨
  (`src/lib/db/compression.ts`에서 정규화).

대시보드에서 이 토글은 압축 허브
(`src/app/(dashboard)/dashboard/context/combos/CompressionHub.tsx`)에 있으며,
`saveSettings()`를 통해 `{ contextEditing: { enabled: … } }`를 다시 기록합니다. 압축 설정 객체에
포함되어 전달되므로 완전히 독립된 설정 화면이 아니라 조합별 압축 프로필과 함께 구성됩니다.
설정에는 켜기/끄기 플래그만 포함되며, 모든 임계값(`trigger`,
`keep`)은 위에서 설명한 상수를 사용합니다.

## Claude 전용 게이팅

주입은 실제 Claude 또는 Claude-Code 호환 릴레이에만 수행됩니다.
`open-sse/executors/base.ts`의 게이트는 다음과 같습니다.

```ts
if (
  (this.provider === "claude" || isClaudeCodeCompatible(this.provider)) &&
  contextEditing?.enabled &&
  !contextEditingDisabled
) {
  applyContextEditingToBody(transformedBody, { enabled: true });
}
```

- `this.provider === "claude"` — 실제 Anthropic 키/OAuth.
- `isClaudeCodeCompatible(this.provider)` — provider id가 `anthropic-compatible-cc-` 접두사로 시작하는 릴레이입니다(Claude Code 호환성을 명시하므로 베타를 지원할 가능성이 가장 높은 릴레이입니다). `open-sse/services/provider.ts`를 참조하세요.

의도적으로 **제외되는 대상**:

- `claude-web` — `context_management`가 전달되지 않는 `create_conversation_params` 요청 형식을 사용하는 브라우저 릴레이입니다.
- 일반 `anthropic-compatible-*` 릴레이(`-cc-` 접두사가 없는 경우) — 베타 지원 여부가 불확실한 타사 엔드포인트입니다.

토글이 켜져 있어도 Claude가 아닌 provider에는 `context_management` 매개변수가 절대 전달되지 않습니다.

## 400 폴백 / 릴레이 지원 범위

Claude 호환 릴레이가 베타 지원을 명시하더라도 `context_management` 매개변수를 HTTP 400으로 거부할 수 있습니다. 요청을 실패시키는 대신 정상적으로 기능을 축소하기 위해 executor는 해당 매개변수를 제거하고 동일한 URL로 **한 번** 재시도합니다.

```ts
if (
  response.status === HTTP_STATUS.BAD_REQUEST &&
  contextEditing?.enabled &&
  !contextEditingDisabled &&
  transformedBody?.context_management !== undefined
) {
  const errText = await response
    .clone()
    .text()
    .catch(() => "");
  if (/context[_-]management|context editing/i.test(errText)) {
    contextEditingDisabled = true;
    delete transformedBody.context_management;
    let retryBody = JSON.stringify(transformedBody);
    if (isClaudeCodeCompatible(this.provider) || this.provider === "claude") {
      retryBody = await signRequestBody(retryBody);
    }
    response = await fetch(url, { ...fetchOptions, body: retryBody });
  }
}
```

동작 방식:

1. context editing이 활성화되어 있고 본문에 실제로 `context_management`가 포함된 상태에서 `400`이 발생한 경우에만 실행됩니다.
2. 일치하지 않는 경우에도 원래 응답을 온전히 유지할 수 있도록 400 응답 본문은 `clone()`을 통해 읽습니다.
3. 오류 텍스트가 `/context[_-]management|context editing/i`와 일치해야 합니다. 관련 없는 400(예: `max_tokens must be >= 1`)은 폴백을 트리거하지 않으며 원래 오류가 전파됩니다.
4. 일치하면 `contextEditingDisabled = true`로 설정하고(이후 재시도/폴백 URL을 위해 새로운 `transformedBody`가 생성되더라도 재주입되지 않도록 함), `context_management`를 삭제한 뒤 Claude / Claude-Code 호환 릴레이용으로 본문에 다시 서명하고(`signRequestBody`), 동일한 URL로 한 번 재시도합니다.

실제 Claude는 `ANTHROPIC_BETA_BASE`에 베타를 포함하므로 이 폴백 경로에 진입하지 않습니다.

## `applied_edits` 텔레메트리

Claude 응답 후 OmniRoute는 provider가 실제로 제거한 컨텍스트의 양을 기록합니다. 이는 **스트리밍되지 않으며**, 비스트리밍 응답 본문에서 최선의 방식으로 추출되고 응답에 영향을 주지 않습니다(텔레메트리 오류는 무시됩니다).

- 추출: `open-sse/config/contextEditing.ts`의 `extractContextEditingTelemetry(responseBody)`.
  응답 형식 차이에 방어적으로 대응하기 위해 다음 세 위치에서 `applied_edits`를 확인합니다.
  - `context_management.applied_edits`
  - `usage.context_management.applied_edits`
  - `usage.applied_edits`
- 각 항목에서 읽는 필드: `cleared_input_tokens` 및 `cleared_tool_uses`
  (snake_case, Anthropic 네이티브 형식). 없으면 camelCase 형식인 `clearedInputTokens` / `clearedToolUses`를 대신 사용합니다.
- `applied_edits` 배열을 찾을 수 없거나 실제로 제거된 내용이 없으면 `null`을 반환합니다.

수신 데이터의 형식은 `ContextEditingTelemetry { editCount, clearedInputTokens, clearedToolUses }`입니다.
기록은 `open-sse/handlers/chatCore.ts`에서 `provider === "claude"`인 경우에만 `recordContextEditingTelemetry()`(`src/lib/db/compressionAnalytics.ts`)를 통해 수행되며, 다음 태그가 지정된 compression analytics 행을 작성합니다.

- `mode: "context-editing"`
- `engine: "context-editing"`
- `tokens_saved` / `original_tokens` = 제거된 입력 토큰 수
- `request_id`에 `::context-editing` 접미사 추가

따라서 provider에 위임된 컨텍스트 제거 결과는 로컬 엔진의 결과와 함께 compression analytics에 `context-editing` 엔진 레이블로 표시되며, RTK/Caveman/LLMLingua를 통한 절감량과 구분할 수 있습니다.

## 로컬 압축 엔진과의 관계

| 측면              | 로컬 엔진(Caveman / RTK / LLMLingua / stacked) | 위임된 컨텍스트 편집                       |
| ----------------- | ---------------------------------------------- | ------------------------------------------ |
| 실행 위치         | 요청이 프록시를 떠나기 전 OmniRoute 내부       | 제공자(Claude)의 서버 측                   |
| 편집 대상         | 프롬프트 / 컨텍스트 / 도구 결과 텍스트         | 이전 도구 사용 / 도구 결과 블록            |
| 제공자 범위       | 모든 제공자                                    | `claude` + `anthropic-compatible-cc-*`만   |
| 설정 전환         | 압축 모드 설정                                 | `contextEditing.enabled`                   |
| 실패 모드         | 실패 시 원본 사용(원본 텍스트)                 | 400 폴백: 매개변수를 제거하고 한 번 재시도 |
| 절감량 텔레메트리 | `engine: <engine id>`                          | `engine: "context-editing"`                |

두 방식은 상호 보완적입니다. 로컬 엔진은 OmniRoute가 전송하는 바이트를 압축하고, 컨텍스트 편집을 사용하면
Claude가 여러 턴에 걸쳐 누적된 컨텍스트를 정리할 수 있습니다. 두 기능을 함께 활성화할 수 있습니다.

## 참고 항목

- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — 엔진 레지스트리 및 로컬 압축
  엔진
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — 명령/도구 출력 압축
- [../frameworks/MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP 설명 압축 및
  도구 카디널리티 감소
- 소스: `open-sse/config/contextEditing.ts`, `open-sse/executors/base.ts`,
  `open-sse/services/compression/types.ts`, `src/lib/db/compressionAnalytics.ts`
