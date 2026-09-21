# AgentRouter Setup Guide (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/AGENTROUTER.md) · 🇪🇹 [am](../../../am/docs/providers/AGENTROUTER.md) · 🇸🇦 [ar](../../../ar/docs/providers/AGENTROUTER.md) · 🇦🇿 [az](../../../az/docs/providers/AGENTROUTER.md) · 🇧🇬 [bg](../../../bg/docs/providers/AGENTROUTER.md) · 🇧🇩 [bn](../../../bn/docs/providers/AGENTROUTER.md) · 🇨🇿 [cs](../../../cs/docs/providers/AGENTROUTER.md) · 🇩🇰 [da](../../../da/docs/providers/AGENTROUTER.md) · 🇩🇪 [de](../../../de/docs/providers/AGENTROUTER.md) · 🇬🇷 [el](../../../el/docs/providers/AGENTROUTER.md) · 🇪🇸 [es](../../../es/docs/providers/AGENTROUTER.md) · 🇪🇪 [et](../../../et/docs/providers/AGENTROUTER.md) · 🇮🇷 [fa](../../../fa/docs/providers/AGENTROUTER.md) · 🇫🇮 [fi](../../../fi/docs/providers/AGENTROUTER.md) · 🇫🇷 [fr](../../../fr/docs/providers/AGENTROUTER.md) · 🇮🇪 [ga](../../../ga/docs/providers/AGENTROUTER.md) · 🇮🇳 [gu](../../../gu/docs/providers/AGENTROUTER.md) · 🇳🇬 [ha](../../../ha/docs/providers/AGENTROUTER.md) · 🇮🇱 [he](../../../he/docs/providers/AGENTROUTER.md) · 🇮🇳 [hi](../../../hi/docs/providers/AGENTROUTER.md) · 🇭🇷 [hr](../../../hr/docs/providers/AGENTROUTER.md) · 🇭🇺 [hu](../../../hu/docs/providers/AGENTROUTER.md) · 🇦🇲 [hy](../../../hy/docs/providers/AGENTROUTER.md) · 🇮🇩 [id](../../../id/docs/providers/AGENTROUTER.md) · 🇳🇬 [ig](../../../ig/docs/providers/AGENTROUTER.md) · 🇮🇹 [it](../../../it/docs/providers/AGENTROUTER.md) · 🇯🇵 [ja](../../../ja/docs/providers/AGENTROUTER.md) · 🇬🇪 [ka](../../../ka/docs/providers/AGENTROUTER.md) · 🇰🇭 [km](../../../km/docs/providers/AGENTROUTER.md) · 🇮🇳 [kn](../../../kn/docs/providers/AGENTROUTER.md) · 🇱🇹 [lt](../../../lt/docs/providers/AGENTROUTER.md) · 🇱🇻 [lv](../../../lv/docs/providers/AGENTROUTER.md) · 🇮🇳 [ml](../../../ml/docs/providers/AGENTROUTER.md) · 🇮🇳 [mr](../../../mr/docs/providers/AGENTROUTER.md) · 🇲🇾 [ms](../../../ms/docs/providers/AGENTROUTER.md) · 🇲🇹 [mt](../../../mt/docs/providers/AGENTROUTER.md) · 🇲🇲 [my](../../../my/docs/providers/AGENTROUTER.md) · 🇳🇵 [ne](../../../ne/docs/providers/AGENTROUTER.md) · 🇳🇱 [nl](../../../nl/docs/providers/AGENTROUTER.md) · 🇳🇴 [no](../../../no/docs/providers/AGENTROUTER.md) · 🇮🇳 [or](../../../or/docs/providers/AGENTROUTER.md) · 🇮🇳 [pa](../../../pa/docs/providers/AGENTROUTER.md) · 🇵🇭 [phi](../../../phi/docs/providers/AGENTROUTER.md) · 🇵🇱 [pl](../../../pl/docs/providers/AGENTROUTER.md) · 🇵🇹 [pt](../../../pt/docs/providers/AGENTROUTER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/AGENTROUTER.md) · 🇷🇴 [ro](../../../ro/docs/providers/AGENTROUTER.md) · 🇷🇺 [ru](../../../ru/docs/providers/AGENTROUTER.md) · 🇱🇰 [si](../../../si/docs/providers/AGENTROUTER.md) · 🇸🇰 [sk](../../../sk/docs/providers/AGENTROUTER.md) · 🇸🇮 [sl](../../../sl/docs/providers/AGENTROUTER.md) · 🇷🇸 [sr](../../../sr/docs/providers/AGENTROUTER.md) · 🇸🇪 [sv](../../../sv/docs/providers/AGENTROUTER.md) · 🇰🇪 [sw](../../../sw/docs/providers/AGENTROUTER.md) · 🇮🇳 [ta](../../../ta/docs/providers/AGENTROUTER.md) · 🇮🇳 [te](../../../te/docs/providers/AGENTROUTER.md) · 🇹🇭 [th](../../../th/docs/providers/AGENTROUTER.md) · 🇹🇷 [tr](../../../tr/docs/providers/AGENTROUTER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/AGENTROUTER.md) · 🇵🇰 [ur](../../../ur/docs/providers/AGENTROUTER.md) · 🇺🇿 [uz](../../../uz/docs/providers/AGENTROUTER.md) · 🇻🇳 [vi](../../../vi/docs/providers/AGENTROUTER.md) · 🇳🇬 [yo](../../../yo/docs/providers/AGENTROUTER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/AGENTROUTER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/AGENTROUTER.md)

---

[AgentRouter](https://agentrouter.org)는 Claude 및 기타 모델을 재판매하는 Anthropic 호환 릴레이로,
공식 Anthropic API보다 저렴한 가격을 제공하는 경우가 많습니다. 공식 Claude Code
클라이언트의 `ANTHROPIC_BASE_URL`을 그대로 대체할 수 있도록 설계되었으므로, Claude Code의
통신 형식과 일치하는 트래픽(특정 User-Agent, `anthropic-beta` 플래그, Stainless SDK 헤더 등)만
허용합니다.

## 빠른 시작 — 기본 제공 `agentrouter` 공급자 사용(권장)

대부분의 사용자는 **별도의 설정이 필요하지 않습니다**. OmniRoute에는 완전한 Claude Code
통신 형식이 이미 내장된 `agentrouter` 공급자가 기본 제공됩니다
(`open-sse/config/providerRegistry.ts` → `agentrouter` 참조). 사용 방법은 다음과 같습니다.

1. **대시보드 → 공급자 → 공급자 추가**를 엽니다.
2. 목록에서 **AgentRouter**를 선택합니다.
3. `sk-...` API 키를 붙여넣고 저장합니다.

이것으로 끝입니다. 환경 변수나 사용자 지정 공급자 유형이 필요하지 않습니다. 기본 제공 모델에는
`claude-opus-4-6`, `claude-haiku-4-5-20251001`, `glm-5.1`,
`deepseek-v3.2`가 포함됩니다.

이 가이드의 나머지 부분에서는 **고급 방법**, 즉
`anthropic-compatible-cc-*` 공급자 유형을 사용하는 방법을 다룹니다. 통신 형식을 더 세밀하게
제어해야 할 때 사용하십시오. 예를 들어 기본 공급자 레지스트리에 아직 등록되지 않은 다른
AgentRouter 방식의 릴레이에 연결하거나 기본 URL, 채팅 경로 또는 헤더 집합을 재정의해야 할 때
사용할 수 있습니다.

---

## 고급: Claude Code 호환 공급자 유형을 통한 연결

OmniRoute는 올바른 통신 형식으로 Anthropic Messages API를 사용하는 **Claude Code
호환** 공급자 유형(`anthropic-compatible-cc-*`)을 통해 AgentRouter 및 유사한
릴레이도 지원합니다. `https://agentrouter.org`를 가리키는 일반
`openai-compatible-chat` 공급자는 **작동하지 않습니다**. 업스트림 WAF가 Claude
Code처럼 보이지 않는 요청을 거부하기 때문입니다.

---

## 사전 요구 사항

- AgentRouter 계정 및 API 키. 신규 가입자는 프로젝트 [README](../README.md)의 제휴
  링크를 통해 무료 크레딧을 받을 수 있습니다.
- `ENABLE_CC_COMPATIBLE_PROVIDER` 기능 플래그를 활성화하여 실행 중인 OmniRoute
  인스턴스(아래 참조).

## 1. CC 호환 공급자 유형 활성화

Claude Code 호환 공급자 유형은 공식 Claude Code 클라이언트와 매우 유사한 트래픽을
전송하므로 기능 플래그로 제한됩니다. OmniRoute를 시작하기 전에 다음 환경 변수를 설정하여
활성화하십시오.

```bash
ENABLE_CC_COMPATIBLE_PROVIDER=true
```

Docker 예시:

```bash
docker run -d --name omniroute \
  --restart unless-stopped \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e ENABLE_CC_COMPATIBLE_PROVIDER=true \
  diegosouzapw/omniroute:latest
```

재시작하면 대시보드에 기존 OpenAI 호환 및 Anthropic 호환 흐름과 함께
**Claude Code 호환 공급자 추가** 옵션이 표시됩니다.

## 2. 대시보드에서 공급자 생성

1. **대시보드 → 공급자 → 공급자 추가**를 엽니다.
2. **Claude Code 호환 공급자 추가**를 선택합니다(위 플래그가 설정된 경우에만 표시됨).
3. 다음 필드를 입력합니다.

| 필드      | 값                                                       |
| --------- | -------------------------------------------------------- |
| 이름      | `AgentRouter`(또는 원하는 레이블)                        |
| 접두사    | `agentrouter`(로그와 대시보드에 표시되는 읽기 쉬운 별칭) |
| 기본 URL  | `https://agentrouter.org`                                |
| 채팅 경로 | `/v1/messages?beta=true`(기본값 — 그대로 유지)           |

> 정식 모델 식별자는 여전히 전체 공급자 노드 ID
> (`anthropic-compatible-cc-{uuid}/{model}`)를 사용합니다. **접두사**는 더 읽기 쉬운
> 로그 출력을 위해 `src/lib/usage/callLogs.ts`에서 확인되는 표시용 별칭일 뿐입니다.

4. (선택 사항) 저장하기 전에 연결 상태를 확인하려면 **검증** 필드에 API 키를 붙여넣고
   **확인**을 클릭합니다.
5. **추가**를 클릭합니다.

생성한 후 공급자를 열고 AgentRouter API 키(`sk-...`)를 사용하는 **연결**을 추가합니다.
연결의 `test_status`가 `active`로 변경되어야 합니다.

## 3. 콤보를 통해 또는 직접 사용하기

공급자의 접두사를 네임스페이스로 사용하여 모델을 참조합니다.

```bash
curl -X POST http://localhost:20128/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "agentrouter/claude-opus-4-6",
    "messages": [{"role": "user", "content": "hello"}],
    "max_tokens": 100
  }'
```

정규 모델 ID인 `anthropic-compatible-cc-{uuid}/claude-opus-4-6`도 작동하며,
데이터베이스와 콤보 구성에는 이 ID가 표시됩니다.

또는 다른 공급자와 마찬가지로 라우팅, 폴백 및 할당량 관리를 위해 콤보에
추가할 수 있습니다.

---

## 와이어 이미지 세부 정보

참고로 cc 호환 브리지는 각 업스트림 요청에 다음을 전송합니다
(`open-sse/services/claudeCodeCompatible.ts` 참조).

| 헤더                                        | 값                                                                                            |
| ------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `Authorization`                             | `Bearer <api-key>`                                                                            |
| `User-Agent`                                | `claude-cli/2.1.258 (external, sdk-cli)`                                                      |
| `anthropic-version`                         | `2023-06-01`                                                                                  |
| `anthropic-beta`                            | `claude-code-20250219,interleaved-thinking-2025-05-14,effort-2025-11-24`                      |
| 연결별 redact-thinking 베타 토글            | 수정된 사고 스트림을 명시적으로 요구하는 업스트림에 `redact-thinking-2026-02-12`를 추가합니다 |
| 연결별 요약된 사고 토글                     | 표시 모드가 아직 설정되지 않은 CC Compatible 사고 요청에 `display: "summarized"`를 추가합니다 |
| `anthropic-dangerous-direct-browser-access` | `true`                                                                                        |
| `x-app`                                     | `cli`                                                                                         |
| `X-Stainless-*`                             | 다양한 Stainless SDK 헤더(언어, 패키지 버전, OS, 아키텍처 등)                                 |

이를 통해 요청이 업스트림 WAF / 클라이언트 허용 목록을 통과할 수 있습니다.

---

## 문제 해결

**`{"error":{"message":"unauthorized client detected, ..."}}`** — 요청이 Claude Code 와이어 이미지와
일치하지 않았습니다. 공급자가 `anthropic-compatible-cc` 대신
`openai-compatible-chat`으로 구성되었거나 시작 시
`ENABLE_CC_COMPATIBLE_PROVIDER=true` 플래그를 설정하지 않은 경우에 발생합니다.

**`{"error":{"message":"无效的令牌","type":"new_api_error"}}` (HTTP 401)** —
"유효하지 않은 토큰"입니다. 와이어 이미지는 올바르지만 API 키가 거부되었습니다. AgentRouter
대시보드에서 새 키를 생성하고 연결을 업데이트하세요.

**`{"error":{"code":"content-blocked","type":"agent_router_api_error"}}`
(HTTP 400)** — AgentRouter의 검열 훅이 요청 콘텐츠를 거부했거나 키의 요금제에서
요청된 모델을 허용하지 않습니다. 다른 프롬프트나 모델을 사용해 보세요.
문제가 없는 프롬프트가 계속 차단된다면 AgentRouter 지원팀에 문의하세요.

**특정 모델에서만 발생하는 `[400]: content-blocked`** — 대부분의 AgentRouter 요금제는
일부 모델만 허용합니다(예: `claude-opus-4-6`). 키가 유효하더라도 다른 모델 ID는
`unauthorized_client_error`를 반환합니다. AgentRouter 대시보드에서 요금제에 포함된
모델을 확인하세요.

**omniroute 로그의 `Invalid JSON response from provider (reset after Ns)`** —
업스트림이 JSON이 아닌 본문을 반환했습니다(일반적으로 WAF의 HTML 오류 페이지).
이는 보통 요청이 AgentRouter 백엔드에 도달하지 못했다는 의미입니다. 공급자 ID가
`anthropic-compatible-cc-`로 시작하는지 다시 확인하고(뒤의 대시에 유의하세요.
`open-sse/services/claudeCodeCompatible.ts`의 `CLAUDE_CODE_COMPATIBLE_PREFIX` 참조)
기능 플래그가 활성화되어 있는지 확인하세요.

**AgentRouter 공급자가 이미 있는데도 `unauthorized client detected` / HTML 오류 페이지가
발생함** — AgentRouter 공급자가 **둘 이상**이고 요청이 잘못된 공급자로 전달되고 있을
가능성이 큽니다. 수동으로 생성한 기존 `anthropic-compatible-*`(`cc`가 아닌 공급자) 또는
`openai-compatible-chat-*` 공급자가 `agentrouter` 접두사로 생성되었다면 해당 공급자가
`agentrouter/<model>` 모델 ID를 소유할 수 있습니다(콤보에서도 노드 ID로 이를 참조할 수
있음). 그 결과 트래픽이 올바른 와이어 이미지가 기본 제공되는 내장 `agentrouter`
공급자 대신 해당 공급자로 라우팅됩니다. 이 공급자는 일반 User-Agent를 전송하므로
요청이 거부됩니다. omniroute 로그에서 모델이 실제로 어디로 확인되는지 점검하세요
(`ROUTING` 태그에 `agentrouter/<model> → <providerId>/<model>`이 표시됨).
`<providerId>`가 `agentrouter`가 아니라면 네이티브 공급자로 통합하세요. 콤보가
`agentrouter/<model>`(providerId `agentrouter`)을 가리키도록 설정하고 중복된 호환
공급자를 삭제하세요. 네이티브 공급자에는 와이어 이미지 구성이나 `customUserAgent`가
필요하지 않습니다.

---

## 참고 항목

- [`docs/providers/CLAUDE_WEB.md`](./CLAUDE_WEB.md) — Claude Web 공급자 통합 참고 사항
- [`docs/reference/FREE_TIERS.md`](../reference/FREE_TIERS.md) — 무료 티어 공급자
  카탈로그
- [`open-sse/services/claudeCodeCompatible.ts`](../../open-sse/services/claudeCodeCompatible.ts)
  — 유선 이미지 구현
