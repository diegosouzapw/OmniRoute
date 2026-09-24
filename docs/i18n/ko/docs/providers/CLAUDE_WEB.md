# Providers — Claude Web (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CLAUDE_WEB.md) · 🇪🇹 [am](../../../am/docs/providers/CLAUDE_WEB.md) · 🇸🇦 [ar](../../../ar/docs/providers/CLAUDE_WEB.md) · 🇦🇿 [az](../../../az/docs/providers/CLAUDE_WEB.md) · 🇧🇬 [bg](../../../bg/docs/providers/CLAUDE_WEB.md) · 🇧🇩 [bn](../../../bn/docs/providers/CLAUDE_WEB.md) · 🇧🇦 [bs](../../../bs/docs/providers/CLAUDE_WEB.md) · 🇨🇿 [cs](../../../cs/docs/providers/CLAUDE_WEB.md) · 🇩🇰 [da](../../../da/docs/providers/CLAUDE_WEB.md) · 🇩🇪 [de](../../../de/docs/providers/CLAUDE_WEB.md) · 🇬🇷 [el](../../../el/docs/providers/CLAUDE_WEB.md) · 🇪🇸 [es](../../../es/docs/providers/CLAUDE_WEB.md) · 🇪🇪 [et](../../../et/docs/providers/CLAUDE_WEB.md) · 🇮🇷 [fa](../../../fa/docs/providers/CLAUDE_WEB.md) · 🇫🇮 [fi](../../../fi/docs/providers/CLAUDE_WEB.md) · 🇫🇷 [fr](../../../fr/docs/providers/CLAUDE_WEB.md) · 🇮🇪 [ga](../../../ga/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [gu](../../../gu/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ha](../../../ha/docs/providers/CLAUDE_WEB.md) · 🇮🇱 [he](../../../he/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [hi](../../../hi/docs/providers/CLAUDE_WEB.md) · 🇭🇷 [hr](../../../hr/docs/providers/CLAUDE_WEB.md) · 🇭🇺 [hu](../../../hu/docs/providers/CLAUDE_WEB.md) · 🇦🇲 [hy](../../../hy/docs/providers/CLAUDE_WEB.md) · 🇮🇩 [id](../../../id/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [ig](../../../ig/docs/providers/CLAUDE_WEB.md) · 🇮🇹 [it](../../../it/docs/providers/CLAUDE_WEB.md) · 🇯🇵 [ja](../../../ja/docs/providers/CLAUDE_WEB.md) · 🇬🇪 [ka](../../../ka/docs/providers/CLAUDE_WEB.md) · 🇰🇭 [km](../../../km/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [kn](../../../kn/docs/providers/CLAUDE_WEB.md) · 🇱🇹 [lt](../../../lt/docs/providers/CLAUDE_WEB.md) · 🇱🇻 [lv](../../../lv/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ml](../../../ml/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [mr](../../../mr/docs/providers/CLAUDE_WEB.md) · 🇲🇾 [ms](../../../ms/docs/providers/CLAUDE_WEB.md) · 🇲🇹 [mt](../../../mt/docs/providers/CLAUDE_WEB.md) · 🇲🇲 [my](../../../my/docs/providers/CLAUDE_WEB.md) · 🇳🇵 [ne](../../../ne/docs/providers/CLAUDE_WEB.md) · 🇳🇱 [nl](../../../nl/docs/providers/CLAUDE_WEB.md) · 🇳🇴 [no](../../../no/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [or](../../../or/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [pa](../../../pa/docs/providers/CLAUDE_WEB.md) · 🇵🇭 [phi](../../../phi/docs/providers/CLAUDE_WEB.md) · 🇵🇱 [pl](../../../pl/docs/providers/CLAUDE_WEB.md) · 🇵🇹 [pt](../../../pt/docs/providers/CLAUDE_WEB.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CLAUDE_WEB.md) · 🇷🇴 [ro](../../../ro/docs/providers/CLAUDE_WEB.md) · 🇷🇺 [ru](../../../ru/docs/providers/CLAUDE_WEB.md) · 🇱🇰 [si](../../../si/docs/providers/CLAUDE_WEB.md) · 🇸🇰 [sk](../../../sk/docs/providers/CLAUDE_WEB.md) · 🇸🇮 [sl](../../../sl/docs/providers/CLAUDE_WEB.md) · 🇷🇸 [sr](../../../sr/docs/providers/CLAUDE_WEB.md) · 🇸🇪 [sv](../../../sv/docs/providers/CLAUDE_WEB.md) · 🇰🇪 [sw](../../../sw/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [ta](../../../ta/docs/providers/CLAUDE_WEB.md) · 🇮🇳 [te](../../../te/docs/providers/CLAUDE_WEB.md) · 🇹🇭 [th](../../../th/docs/providers/CLAUDE_WEB.md) · 🇹🇷 [tr](../../../tr/docs/providers/CLAUDE_WEB.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CLAUDE_WEB.md) · 🇵🇰 [ur](../../../ur/docs/providers/CLAUDE_WEB.md) · 🇺🇿 [uz](../../../uz/docs/providers/CLAUDE_WEB.md) · 🇻🇳 [vi](../../../vi/docs/providers/CLAUDE_WEB.md) · 🇳🇬 [yo](../../../yo/docs/providers/CLAUDE_WEB.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CLAUDE_WEB.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CLAUDE_WEB.md)

---

## `claude-web`

`claude-web`은 인증된 `claude.ai` 브라우저 세션을 통해 OpenAI 형식의 채팅 요청을 전송합니다. 실행기는 제공된 쿠키를 정규화하고, 인증된 조직 하나를 확인하며, 대화 상태를 준비하고, 직접 또는 브라우저 전송 방식을 선택한 뒤, 업스트림 SSE 응답을 엄격하게 변환합니다. 오케스트레이션은 `open-sse/executors/claude-web.ts:320`에 있습니다.

> **웹 쿠키 제공자를 처음 사용하시나요?**
>
> 이 제공자별 가이드를 따르기 전에 일반적인 설정 절차, 인증 지침, 제한 사항 및 문제 해결 방법은 **`docs/getting-started/WEB-COOKIE-GUIDE.md`**를 참조하세요.

### 모델 카탈로그

현재 제공자 레지스트리는 다음 7개의 정적 모델 ID만 노출합니다
(`open-sse/config/providers/registry/claude/web/index.ts:11`):

| 모델 ID                     | 표시 이름              |
| --------------------------- | ---------------------- |
| `claude-fable-5`            | Claude Fable 5 (웹)    |
| `claude-opus-4-8`           | Claude Opus 4.8 (웹)   |
| `claude-sonnet-5`           | Claude Sonnet 5 (웹)   |
| `claude-haiku-4-5-20251001` | Claude Haiku 4.5 (웹)  |
| `claude-opus-4-7`           | Claude Opus 4.7 (웹)   |
| `claude-opus-4-6`           | Claude Opus 4.6 (웹)   |
| `claude-sonnet-4-6`         | Claude Sonnet 4.6 (웹) |

이 제공자에는 동적 모델 검색이 구현되어 있지 않습니다. 위 목록이 런타임 카탈로그입니다.

### 자격 증명 및 조직 확인

전체 `claude.ai` Cookie 헤더 또는 세션 값만 제공하세요. 세션 값만 제공하면 `sessionKey`로 정규화되며, 다른 쿠키도 제공된 경우 그대로 유지됩니다. 실행기는 `cookie` 또는 `apiKey`를 통해 쿠키를 받고, 연결 데이터에서 선택적 `deviceId` 및 `orgId` 값을 읽습니다
(`open-sse/executors/claude-web.ts:72`).

`orgId`가 없으면 실행기는 `GET https://claude.ai/api/organizations`를 호출하고 인증된 Claude Web 세션에서 반환된 첫 번째 조직을 사용합니다
(`open-sse/executors/claude-web.ts:141`). 유효한 조직이 반환되지 않으면 안전하게 실패하고, 세션 승인이 거부되면 401로 보고하며, Cloudflare 챌린지와 인증 실패를 구분합니다.

### 대화 작업

선택적 최상위 `claude_web` 객체는 엄격하게 검증됩니다. 알 수 없는 필드는 거부됩니다. 허용되는 필드는 `open-sse/executors/claude-web/session.ts:50`에 정의되어 있습니다:

| 필드                  | 의미                                              |
| --------------------- | ------------------------------------------------- |
| `operation`           | 기본값은 `completion`; 재시도 턴에는 `retry` 사용 |
| `conversation_id`     | 기존 대화의 명시적 UUID                           |
| `parent_message_uuid` | 상위 어시스턴트 메시지의 명시적 UUID              |
| `timezone`            | 유효한 IANA 시간대 이름                           |
| `locale`              | 구조적으로 유효한 로케일                          |
| `tool_states`         | 선택적 계정 도구 상태 배열, 최대 128개 항목       |

준비된 요청은 두 업스트림 엔드포인트 중 하나를 사용합니다
(`open-sse/executors/claude-web.ts:203`):

- 새 턴 또는 후속 턴은
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/completion`으로 전송됩니다.
- 재시도는
  `POST https://claude.ai/api/organizations/{orgId}/chat_conversations/{conversationId}/retry_completion`으로 전송됩니다.

새 턴에는 `create_conversation_params`가 포함됩니다. 캐시되었거나 명시적으로 연결된 후속 턴에는 `parent_message_uuid`가 포함되고 `create_conversation_params`는 생략됩니다. 재시도에는 대화 상태와 상위 메시지 상태가 모두 필요하며 프롬프트는 전송하지 않습니다
(`open-sse/executors/claude-web/session.ts:254`). 새 대화는 인증된 UI의 `/new`에서 열리고, 캐시되었거나 명시적으로 연결된 후속 턴은 정확한 대화 페이지에서 열립니다
(`open-sse/executors/claude-web/session.ts:324`).

대화 상태는 SHA-256 계정 범위와 호출자의 정규화된 대화 기록을 키로 사용하는 인메모리 캐시입니다. 항목은 30분 후 만료되며 캐시는 최대 5,000개 항목으로 제한됩니다
(`open-sse/executors/claude-web/session.ts:12`). 상태는 엄격한 스트림 파서가 `message_stop`을 확인한 후에만 커밋되며, 프로세스가 재시작되면 폐기됩니다. 캐시 미스가 발생하면 이전 메시지를 조용히 삭제하는 대신 다중 메시지 요청을 하나의 복구 프롬프트로 직렬화합니다.

로케일과 시간대에는 다음 우선순위가 적용됩니다: 요청의 `claude_web` 값, 연결 값, 런타임 값, 그다음 로케일의 경우 `en-US`, 시간대의 경우 `UTC`
(`open-sse/executors/claude-web/session.ts:218`).

### 도구 및 요청 페이로드

직접 요청은 호출자가 제공한 구조적으로 유효한 OpenAI 함수 도구만 변환합니다. 임의로 생성된 정적 기본 도구 목록은 없습니다
(`open-sse/executors/claude-web/payload.ts:102`).

반면 브라우저 요청은 인증된 UI 요청을 캡처하고 해당 요청의 계정 도구, 도구 상태 및 개인화된 스타일을 유지합니다. 준비된 대화, 모델, 추론, 프롬프트 및 메시지 UUID 필드는 여전히 캡처된 요청을 재정의합니다
(`open-sse/executors/claude-web/browserTransport.ts:175`). 브라우저 템플릿은 계정, 조직, 쿠키, 로케일 및 시간대의 해시를 기준으로 범위가 지정되며 30분 후 만료됩니다
(`open-sse/executors/claude-web/browserTransport.ts:11`,
`open-sse/executors/claude-web/browserTransport.ts:158`). 직접 요청에 호출자 도구가 없으면 해당 범위의 템플릿을 재사용할 수 있으며, 명시적인 호출자 도구가 우선합니다
(`open-sse/executors/claude-web/browserTransport.ts:214`).

### 전송 방식 선택

기본 경로는 `sendClaudeWebDirect()`이며, 구성된 Chrome 146 프로필과 제공된 쿠키를 사용하여 `tlsFetchClaude()`를 호출합니다 (`open-sse/services/claudeTlsClient.ts:23`). 솔버를 실행하거나 대체 쿠키를 생성하지 않습니다.

계정 범위 브라우저 어댑터를 기본 전송 방식으로 사용하려면 `WEB_COOKIE_USE_BROWSER`를 `1`, `true` 또는 `on`으로 설정합니다. 인식된 Cloudflare 403 챌린지가 직접 전송에서 브라우저 어댑터로 폴백할 수 있도록 하려면 `OMNIROUTE_BROWSER_POOL`을 동일한 값 중 하나로 설정합니다(`open-sse/executors/claude-web.ts:195`). 그 외의 HTTP 실패는 해당 폴백을 트리거하지 않습니다.

브라우저 어댑터는 동일한 풀링된 Playwright 컨텍스트 내에 쿠키를 유지하고, 위에서 설명한 범위 지정 해시 키를 사용하며, 해당 컨텍스트에서 완성 결과를 전송합니다(`open-sse/executors/claude-web/browserTransport.ts:444`). 브라우저에서 해결된 쿠키를 직접 TLS 클라이언트로 내보내지 않습니다. 브라우저 재시도에는 동일한 실제 Playwright 컨텍스트에 바인딩된, 만료되지 않은 UI 템플릿이 필요합니다(`open-sse/executors/claude-web/browserTransport.ts:467`). 브라우저 응답 읽기는 인증된 페이지에서 점진적으로 실행되고, 요청 취소를 준수하며, 크기가 16 MiB를 초과하는 즉시 업스트림 본문을 취소합니다(`open-sse/executors/claude-web/browserTransport.ts:259`).

실행기는 공유 요청 로거에 수정 처리된 감사용 프로젝션을 반환합니다. 조직, 대화 및 메시지 UUID, 프롬프트 텍스트, 도구 정의, 쿠키 및 기기 식별자는 제외됩니다(`open-sse/executors/claude-web.ts:237`,
`open-sse/executors/claude-web.ts:252`). 또한 전송 예외는 throw된 메시지 대신 일반적인 연결 오류를 반환합니다.

### SSE 동작

`createClaudeWebResponse()`는 LF 또는 CRLF 프레이밍과 여러 줄로 구성된 `data:` 필드를 처리합니다. 텍스트 델타는 `content`에, 사고 델타는 `reasoning_content`에, 알려진 메타데이터 이벤트는 `claude_web` 응답 확장에 매핑합니다. 각 메타데이터 이벤트는 자체 필드 허용 목록을 통해 프로젝션됩니다(`open-sse/executors/claude-web/stream.ts:37`). 대화, 상위 메시지, 어시스턴트 메시지 및 작업 메타데이터도 `X-OmniRoute-Claude-Web-*` 헤더로 반환됩니다(`open-sse/executors/claude-web/stream.ts:364`).

파서는 잘못된 JSON, 업스트림 `error` 이벤트, 알 수 없는 이벤트 유형, 잘못된 순서, 콘텐츠 블록 불일치 또는 `message_stop` 이전의 EOF가 발생하면 안전하게 실패합니다. 스트리밍 출력은 하나의 완료 청크와 하나의 `[DONE]`을 내보내며, 버퍼링된 출력도 동일한 파서를 사용합니다. 파서는 `message_stop`을 즉시 종료로 처리하고, 이후의 업스트림 데이터를 취소하며, 다운스트림 취소를 업스트림 리더에 전파합니다(`open-sse/executors/claude-web/stream.ts:461`,
`open-sse/executors/claude-web/stream.ts:563`). 종료되지 않은 SSE 줄과 누적 이벤트의 크기는 1 MiB로 제한됩니다(`open-sse/executors/claude-web/stream.ts:17`,
`open-sse/executors/claude-web/stream.ts:62`).

### 파일

| 파일                                                     | 용도                        |
| -------------------------------------------------------- | --------------------------- |
| `open-sse/config/providers/registry/claude/web/index.ts` | 정적 공급자 모델 레지스트리 |
| `open-sse/executors/claude-web.ts`                       | 실행기 오케스트레이션       |
| `open-sse/executors/claude-web/payload.ts`               | 페이로드 및 도구 변환       |
| `open-sse/executors/claude-web/session.ts`               | 턴 상태 및 대화 기록 캐시   |
| `open-sse/executors/claude-web/transport.ts`             | 직접 전송 어댑터            |
| `open-sse/executors/claude-web/browserTransport.ts`      | 계정 범위 브라우저 어댑터   |
| `open-sse/executors/claude-web/stream.ts`                | 엄격한 SSE 변환             |
| `open-sse/services/claudeTlsClient.ts`                   | 네이티브 TLS 전송           |
| `open-sse/services/browserPool.ts`                       | 풀링된 Playwright 컨텍스트  |

### 테스트

실제 자격 증명 없이 결정론적 Claude Web 테스트 모음을 실행합니다.

```powershell
node --import tsx/esm --test tests/unit/claude-web-auto-refresh.test.ts tests/unit/claude-web-browser-transport.test.ts tests/unit/claude-web-executor-split.test.ts tests/unit/claude-web-live-alignment.test.ts tests/unit/claude-web-payload-runtime.test.ts tests/unit/claude-web-session.test.ts tests/unit/claude-web-sonnet5-registry-6209.test.ts tests/unit/claude-web-stream.test.ts tests/unit/claude-web-transport.test.ts tests/unit/claude-web.test.ts tests/unit/issue-6662-repro.test.ts
```

`tests/unit/claude-web-auto-refresh.test.ts`에서 Playwright에 의존하는 테스트 사례는 명시적으로 건너뜁니다. 현재 이 저장소에는 자격 증명이 포함된 Claude Web 라이브 테스트 스크립트가 정의되어 있지 않으므로, 건너뛴 해당 사례들은 런타임 검증으로 볼 수 없습니다.

### 설정

1. `npm run dev` 또는 빌드된 설치본을 사용하여 OmniRoute를 시작합니다.
2. Dashboard → Providers → Add Provider를 엽니다.
3. Web Cookie 카테고리와 Claude Web을 선택합니다.
4. 인증된 `claude.ai` 요청에서 복사한 전체 Cookie 헤더를 붙여넣습니다.
