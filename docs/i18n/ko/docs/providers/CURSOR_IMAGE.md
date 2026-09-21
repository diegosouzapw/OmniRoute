# Cursor Image Generation (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR_IMAGE.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR_IMAGE.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR_IMAGE.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR_IMAGE.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR_IMAGE.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR_IMAGE.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR_IMAGE.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR_IMAGE.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR_IMAGE.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR_IMAGE.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR_IMAGE.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR_IMAGE.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR_IMAGE.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR_IMAGE.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR_IMAGE.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR_IMAGE.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR_IMAGE.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR_IMAGE.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR_IMAGE.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR_IMAGE.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR_IMAGE.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR_IMAGE.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR_IMAGE.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR_IMAGE.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR_IMAGE.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR_IMAGE.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR_IMAGE.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR_IMAGE.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR_IMAGE.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR_IMAGE.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR_IMAGE.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR_IMAGE.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR_IMAGE.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR_IMAGE.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR_IMAGE.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR_IMAGE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR_IMAGE.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR_IMAGE.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR_IMAGE.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR_IMAGE.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR_IMAGE.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR_IMAGE.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR_IMAGE.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR_IMAGE.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR_IMAGE.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR_IMAGE.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR_IMAGE.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR_IMAGE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR_IMAGE.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR_IMAGE.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR_IMAGE.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR_IMAGE.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR_IMAGE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR_IMAGE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR_IMAGE.md)

---

OmniRoute는 채팅과 동일한 제공자 ID인 `cursor`(별칭 `cu`)를 통해 `POST /v1/images/generations`에서 Cursor 플랜의 **이미지 생성** 기능을 제공합니다.

| 필드                 | 값                                                                          |
| -------------------- | --------------------------------------------------------------------------- |
| `IMAGE_PROVIDERS` ID | `cursor`                                                                    |
| 형식                 | `cursor-agent-image`                                                        |
| 인증                 | 채팅과 동일한 OAuth/API 키 연결(`provider_connections.provider = "cursor"`) |
| 모델                 | `cursor/auto`, `cursor/composer-2`, `cursor/composer-2.5`                   |

## Agent CLI를 사용하는 이유

OmniRoute의 Cursor 채팅은 `agent.v1.AgentService/Run`(protobuf)을 사용합니다. 이 경로는 기본 제공 클라이언트 도구(shell, write, …)를 **거부합니다**. 이미지 생성은 해당 시트에 대해 **`agent` CLI**가 실행하는 Cursor 네이티브 도구입니다. 따라서 이미지 핸들러는 잠긴 프롬프트와 요청별 임시 작업 공간(커뮤니티 시트 브리지와 동일한 형태)을 사용하여 `agent`를 실행한 다음, OpenAI 호환 `b64_json`을 반환합니다.

## 접근 제한(Hard Rules #15 + #17)

이는 자식 프로세스(`agent` 바이너리)를 생성하는 유일한 `IMAGE_PROVIDERS` 형식입니다. `POST /v1/images/generations`는 원격 호출자가 적법하게 사용하는 약 40개의 다른 비프로세스 생성 이미지 제공자와 공유되므로 전체 경로는 `LOCAL_ONLY`로 분류되지 **않습니다**. 대신 `handleCursorAgentImageGeneration`은 authz 파이프라인이 모든 요청에 기록하는 신뢰할 수 있는 `AUTHZ_HEADER_PEER_LOCALITY` 판정값을 사용하여 자체 게이트를 적용합니다. 이 판정값은 스푸핑 가능한 `Host` 헤더가 아니라 실제 TCP 피어를 기반으로 합니다. `loopback` 및 `lan` 호출자만 프로세스 생성 단계에 도달할 수 있으며, 그 밖의 모든 호출자(공개 터널을 통해 유출된 API 키를 재사용하는 경우 포함)는 자격 증명 조회나 프로세스 생성이 발생하기 전에 `403`을 받습니다. 나머지 `LOCAL_ONLY` 계층에 적용되는 동일한 정책은 `src/server/authz/policies/management.ts`를 참조하세요.

## 동시성 게이트는 모듈 수준임(단일 인스턴스 제한)

`CURSOR_IMG_MAX_CONCURRENT`는 Node 모듈 인스턴스(`open-sse/handlers/imageGeneration/providers/cursorAgentImage.ts`) 범위의 인메모리 카운터/큐로 적용됩니다. 하나의 OmniRoute 프로세스 내에서는 동시 `agent` 실행 수를 올바르게 제한하지만, 동일한 Cursor 시트를 공유하는 여러 프로세스/인스턴스(예: 다중 복제본 배포) 간에는 조정되지 **않습니다**. 각 인스턴스가 자체적인 독립 제한을 적용합니다. 단일 인스턴스 배포(기본값)에서는 정확하게 적용됩니다. 수평 확장된 배포에서는 인스턴스별 `CURSOR_IMG_MAX_CONCURRENT`를 보수적으로 설정하거나 Cursor 이미지 트래픽을 단일 인스턴스로 라우팅해야 합니다.

## 요구 사항

1. 대시보드에 연결된 Cursor 계정(OAuth 또는 `crsr_…` API 키).
2. OmniRoute 프로세스에서 사용할 수 있는 Cursor Agent 바이너리:
   - env `CURSOR_AGENT_BIN=/path/to/agent`, 또는
   - `~/.local/bin/agent`, 또는
   - Cursor 연결의 `providerSpecificData.agentBin`.

선택적 조정:

| 환경 변수                   | 기본값               | 의미                    |
| --------------------------- | -------------------- | ----------------------- |
| `CURSOR_IMG_TIMEOUT_MS`     | `210000`             | 이미지당 총 경과 시간   |
| `CURSOR_IMG_MAX_CONCURRENT` | `2`                  | 공유 시트 동시성 게이트 |
| `CURSOR_IMG_MODEL`          | (요청 모델 / `auto`) | CLI `--model` 재정의    |

## 예시

```bash
curl -sS https://<host>/v1/images/generations \
  -H "Authorization: Bearer <omni-api-key>" \
  -H "Content-Type: application/json" \
  -d '{"model":"cursor/auto","prompt":"a lantern in fog","size":"1024x1024"}'
```

생성에는 일반적으로 1~2분이 걸립니다. 내부 네트워크 경로를 사용하는 것이 좋습니다. 제한 시간이 약 100초인 엣지 프록시에서는 실패합니다.

## LiteLLM

`mode: image_generation`, `api_base: http://omniroute:20128/v1`, `model: openai/cursor/auto`(또는 LiteLLM 버전에 따라 접두사 없는 `cursor/auto`)를 사용하여 이미지 모델을 등록하세요.
