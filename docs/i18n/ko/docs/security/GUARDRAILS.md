# Guardrails (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../security/GUARDRAILS.md) · 🇪🇹 [am](../../../am/docs/security/GUARDRAILS.md) · 🇸🇦 [ar](../../../ar/docs/security/GUARDRAILS.md) · 🇦🇿 [az](../../../az/docs/security/GUARDRAILS.md) · 🇧🇬 [bg](../../../bg/docs/security/GUARDRAILS.md) · 🇧🇩 [bn](../../../bn/docs/security/GUARDRAILS.md) · 🇨🇿 [cs](../../../cs/docs/security/GUARDRAILS.md) · 🇩🇰 [da](../../../da/docs/security/GUARDRAILS.md) · 🇩🇪 [de](../../../de/docs/security/GUARDRAILS.md) · 🇬🇷 [el](../../../el/docs/security/GUARDRAILS.md) · 🇪🇸 [es](../../../es/docs/security/GUARDRAILS.md) · 🇪🇪 [et](../../../et/docs/security/GUARDRAILS.md) · 🇮🇷 [fa](../../../fa/docs/security/GUARDRAILS.md) · 🇫🇮 [fi](../../../fi/docs/security/GUARDRAILS.md) · 🇫🇷 [fr](../../../fr/docs/security/GUARDRAILS.md) · 🇮🇪 [ga](../../../ga/docs/security/GUARDRAILS.md) · 🇮🇳 [gu](../../../gu/docs/security/GUARDRAILS.md) · 🇳🇬 [ha](../../../ha/docs/security/GUARDRAILS.md) · 🇮🇱 [he](../../../he/docs/security/GUARDRAILS.md) · 🇮🇳 [hi](../../../hi/docs/security/GUARDRAILS.md) · 🇭🇷 [hr](../../../hr/docs/security/GUARDRAILS.md) · 🇭🇺 [hu](../../../hu/docs/security/GUARDRAILS.md) · 🇦🇲 [hy](../../../hy/docs/security/GUARDRAILS.md) · 🇮🇩 [id](../../../id/docs/security/GUARDRAILS.md) · 🇳🇬 [ig](../../../ig/docs/security/GUARDRAILS.md) · 🇮🇹 [it](../../../it/docs/security/GUARDRAILS.md) · 🇯🇵 [ja](../../../ja/docs/security/GUARDRAILS.md) · 🇬🇪 [ka](../../../ka/docs/security/GUARDRAILS.md) · 🇰🇭 [km](../../../km/docs/security/GUARDRAILS.md) · 🇮🇳 [kn](../../../kn/docs/security/GUARDRAILS.md) · 🇱🇹 [lt](../../../lt/docs/security/GUARDRAILS.md) · 🇱🇻 [lv](../../../lv/docs/security/GUARDRAILS.md) · 🇮🇳 [ml](../../../ml/docs/security/GUARDRAILS.md) · 🇮🇳 [mr](../../../mr/docs/security/GUARDRAILS.md) · 🇲🇾 [ms](../../../ms/docs/security/GUARDRAILS.md) · 🇲🇹 [mt](../../../mt/docs/security/GUARDRAILS.md) · 🇲🇲 [my](../../../my/docs/security/GUARDRAILS.md) · 🇳🇵 [ne](../../../ne/docs/security/GUARDRAILS.md) · 🇳🇱 [nl](../../../nl/docs/security/GUARDRAILS.md) · 🇳🇴 [no](../../../no/docs/security/GUARDRAILS.md) · 🇮🇳 [or](../../../or/docs/security/GUARDRAILS.md) · 🇮🇳 [pa](../../../pa/docs/security/GUARDRAILS.md) · 🇵🇭 [phi](../../../phi/docs/security/GUARDRAILS.md) · 🇵🇱 [pl](../../../pl/docs/security/GUARDRAILS.md) · 🇵🇹 [pt](../../../pt/docs/security/GUARDRAILS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/GUARDRAILS.md) · 🇷🇴 [ro](../../../ro/docs/security/GUARDRAILS.md) · 🇷🇺 [ru](../../../ru/docs/security/GUARDRAILS.md) · 🇱🇰 [si](../../../si/docs/security/GUARDRAILS.md) · 🇸🇰 [sk](../../../sk/docs/security/GUARDRAILS.md) · 🇸🇮 [sl](../../../sl/docs/security/GUARDRAILS.md) · 🇷🇸 [sr](../../../sr/docs/security/GUARDRAILS.md) · 🇸🇪 [sv](../../../sv/docs/security/GUARDRAILS.md) · 🇰🇪 [sw](../../../sw/docs/security/GUARDRAILS.md) · 🇮🇳 [ta](../../../ta/docs/security/GUARDRAILS.md) · 🇮🇳 [te](../../../te/docs/security/GUARDRAILS.md) · 🇹🇭 [th](../../../th/docs/security/GUARDRAILS.md) · 🇹🇷 [tr](../../../tr/docs/security/GUARDRAILS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/GUARDRAILS.md) · 🇵🇰 [ur](../../../ur/docs/security/GUARDRAILS.md) · 🇺🇿 [uz](../../../uz/docs/security/GUARDRAILS.md) · 🇻🇳 [vi](../../../vi/docs/security/GUARDRAILS.md) · 🇳🇬 [yo](../../../yo/docs/security/GUARDRAILS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/GUARDRAILS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/GUARDRAILS.md)

---

> **신뢰할 수 있는 원본:** `src/lib/guardrails/`
> **최종 업데이트:** 2026-08-29 — v3.8.51 (Video Bridge 트랜스크립트 출처는 호출자가 선언하며,
> 아직 서버에서 검증되지 않음 — #11661에 따라 명확히 설명)

가드레일은 OmniRoute와 업스트림 제공자 간 경계에서 안전, 정책 및 콘텐츠 변환을 적용합니다. 각 가드레일은 요청 페이로드(`preCall`)와 업스트림 응답(`postCall`)을 검사하고 필요에 따라 거부, 변환 또는 주석을 추가할 수 있습니다.

이 시스템은 **실패 허용(fail-open)** 방식입니다. 가드레일 실행 중 예외가 발생하면 레지스트리는 요청을 실패시키는 대신 오류를 기록하고 다음 가드레일을 계속 실행합니다. 차단은 항상 명시적인 결정(`block: true`)이며, 우발적으로 발생하지 않습니다.

## 기본 제공 가드레일

레지스트리는 가져올 때 우선순위 순서대로 6개의 가드레일을 자동으로 로드합니다
(`registry.ts` → `registerDefaultGuardrails()` 참조):

| 우선순위 | 이름                | 단계           | 파일                  |
| -------- | ------------------- | -------------- | --------------------- |
| `5`      | `vision-bridge`     | `preCall`      | `visionBridge.ts`     |
| `6`      | `audio-bridge`      | `preCall`      | `audioBridge.ts`      |
| `7`      | `video-bridge`      | `preCall`      | `videoBridge.ts`      |
| `10`     | `pii-masker`        | `pre` + `post` | `piiMasker.ts`        |
| `20`     | `prompt-injection`  | `preCall`      | `promptInjection.ts`  |
| `95`     | `credential-masker` | `pre` + `post` | `credentialMasker.ts` |

우선순위 숫자가 낮을수록 **먼저** 실행됩니다.

### Vision Bridge (`visionBridge.ts`) — Modality Bridge PR-1

**비전 미지원 모델**을 대상으로 하는 이미지 포함 요청을 가로채 전체 요청을 비전 지원 모델로 재라우팅하거나, 업스트림 호출 전에 이미지 부분을 설정 가능한 비전 모델이 생성한 텍스트 설명으로 대체합니다. 이를 통해 텍스트 전용 제공자가 멀티모달 페이로드를 투명하게 처리할 수 있습니다.

흐름:

1. 대상 모델이 이미 비전을 지원하면 건너뜁니다(`isVisionBridgeForcedModel` 강제 브리지 목록에 포함된 경우 제외).
2. `extractImageParts(messages)`(`visionBridgeHelpers.ts`)를 통해 이미지 부분을 추출합니다. 이 함수는 `open-sse/utils/mediaParts.ts`의 **통합 미디어 감지기** `detectMediaParts()`에 처리를 위임합니다. 이 감지기는 콤보 호환성 필터와 공유하는 단일 신뢰 원본입니다. 추출은 `replaceImageParts`가 다시 삽입할 수 있는 형태의 최상위 부분으로 허용 목록이 제한됩니다(추출↔대체 계약): OpenAI `image_url`, Anthropic base64 `source.type:"base64"`, Anthropic URL `source.type:"url"`, Responses API `input_image`. 중첩된 일치 항목과 표시자만 있는 형태는 콤보 필터에서 처리할 대상이므로 추출되지 않습니다. 발견된 항목이 없으면 건너뜁니다.
3. `resolveVisionBridgeRuntimeSettings()`(`src/shared/constants/modalityBridgeDefaults.ts`)을 통해 런타임 설정을 결정합니다. 새로운 `modalityBridge*` 설정 키가 우선하며, 레거시 `visionBridge*` 키는 **한 주기 동안의 대체 값**(롤백 기간)으로 유지됩니다. 브리지가 비활성화되어 있으면 미디어 탐색을 수행하기 전에 건너뜁니다.
4. 모드 선택기(`modalityBridgeVisionMode`, 아래 표 참조)가 재라우팅과 설명 중 하나를 결정합니다. 재라우팅은 `model`만 교체한 `modifiedPayload`와 메타 `{ rerouted, fromModel, toModel, imagesKept }`를 반환합니다.
5. 설명 경로: 이미지 수를 `maxImages`로 제한하고, 작업 인식형 프롬프트를 구성하고, 설명 캐시를 조회한 다음, 비전 모델을 **병렬로** 호출하고(`Promise.allSettled`), 이미지 위치에 `[Image N]: <description>` 텍스트 부분을 삽입합니다. 설명 생성에 실패하면 `null`이 반환되고 원래 이미지 부분이 **보존**됩니다(#4012). 단, 콤보 설명 경로에서 모든 설명 생성이 실패한 경우는 예외이며, 비전 미지원이 확인된 업스트림에는 대신 `(unavailable — no vision-capable provider connected)` 스텁을 전달합니다(#8430).
6. `modifiedPayload`와 메타(`imagesProcessed`, `descriptions`, `processingTimeMs`, `visionModel`)를 반환합니다.

#### 모드 선택기(`modalityBridgeVisionMode`)

| 모드       | 기본값 | 동작                                                                                                                                                                                                                                                           |
| ---------- | ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `auto`     | ✔      | 변경되지 않은 레거시 휴리스틱(#6640/#7204): 비콤보/`auto/` 모델은 원래 모델에 사용 가능한 자격 증명이 이미 있지 않은 한(이 경우 설명 생성) 최적의 비전 모델로 재라우팅합니다. 콤보 대상은 항상 설명을 생성합니다.                                              |
| `describe` |        | 항상 설명을 생성합니다. 재라우팅 블록은 완전히 건너뛰며, 사용자가 선택한 모델이 항상 응답합니다.                                                                                                                                                               |
| `reroute`  |        | 재라우팅을 강제합니다. 자격 증명이 있는 모델을 유지하는 가드를 우회합니다. 재라우팅 **대상**의 자격 증명 가드는 여전히 적용됩니다. 사용 가능한 비전 대상이 없으면 요청이 설명 생성으로 넘어가므로 원본 이미지가 텍스트 전용 백엔드에 도달하지 않습니다(#8430). |

강제 모드는 자동 휴리스틱이 실행되기 **전에** 단락 평가됩니다. `auto` 동작은 PR-1 이전 가드레일과 바이트 단위로 동일합니다.

#### 작업 인식형 설명 프롬프트(`modalityBridgeVisionTaskAware`)

기본값은 **true**입니다. `composeVisionPrompt()`(`visionBridgeHelpers.ts`)는 기본 설명 프롬프트에 **마지막 사용자 메시지**의 텍스트(500자로 잘림)를 추가하여, 사용자가 실제로 요청한 내용에 맞게 설명을 유도하고(codex-vision-proxy 패턴) 비전 모델에 보이는 텍스트를 전사하도록 요청합니다. 플래그가 꺼져 있거나 사용자 텍스트가 없으면 기본 프롬프트를 변경 없이 사용합니다.

describe 셀프 루프 자체의 OpenAI 호환 요청(`visionBridgeHelpers.ts`의
`callVisionModelSingle()`)은 항상 `image_url.detail: "high"`를 요청합니다.
이는 모든 호출자/제공자에 대해 무조건 적용되며, 어떤 클라이언트 신호에도
의존하지 않습니다. 낮은 디테일 샘플링은 이 프롬프트가 요청하는 텍스트 전사
작업에서 특히 OCR 정확도를 저하하므로, 원래 인바운드 요청이 사용한 디테일
수준과 관계없이 describe 호출 자체는 항상 높은 디테일을 요청합니다. 이는
내부 describe 요청 본문에만 영향을 주며, OmniRoute가 기본 요청에서 호출자
자신의 `image_url.detail`을 전달하는 방식은 변경하지 않습니다. 해당 기본값은
별도로 적용되며, 감지된 OpenCode 클라이언트에만 `defaultImageDetail()`
(`open-sse/handlers/chatCore/upstreamBody.ts`)에서 적용됩니다. describe 셀프
루프의 Anthropic 와이어 형식 분기에는 `detail` 필드가 없으므로 어느
기본값의 영향도 받지 않습니다.

#### Describe 출력 상한 (`modalityBridgeVisionMaxChars`)

| 키                             | 기본값 | 범위               |
| ------------------------------ | ------ | ------------------ |
| `modalityBridgeVisionMaxChars` | `0`    | `0` 또는 100–50000 |

`0`(기본값)은 **상한 없음**을 의미합니다. 즉, `callVisionModel()`이 반환한
설명이 수정 없이 그대로 전달되어 기존 동작이 유지됩니다. 100–50000 범위의
값을 지정하면 설명이 `[Image N]: <description>` 형태로 다시 삽입되기 전에
`…` 접미사와 함께 잘립니다
(`src/lib/guardrails/visionBridge.ts`의 `VisionBridgeGuardrail.preCall()`).
다운스트림 모델에 전체 전사가 필요한, 디테일이 많은 OCR 작업에는 이 값을
높이고, 장황한 비전 모델의 토큰 사용량을 제한하려면 낮추십시오. 대시보드
필드는 Vision 탭의 Advanced 패널에 있으며
(`ModalityBridgeVisionTab.tsx`의 `modality-bridge-max-chars`), 명시적인
`0`은 그대로 두면서 1에서 99 사이의 값은 최솟값인 100으로 조정합니다.
`0`은 단순히 "설정되지 않음"을 나타내는 기본값이 아니라 그 자체로 유효한
Zod 값입니다
(`z.union([z.literal(0), z.number().int().min(100).max(50000)])`).

#### Describe 캐시 (`modalityBridge/bridgeCache.ts`)

describe 출력을 위한 인메모리 LRU + TTL 캐시이며, 프로세스 전체에서
공유됩니다. 키 = `sha256(imageRef + composedPrompt + configuredBridgeModel)`이며
길이 접두사 프레이밍을 사용합니다(필드 경계 충돌 없음). 모델 구성 요소는
실제로 응답한 모델이 아니라 **구성된** 브리지 모델입니다.
`callVisionModel`은 내부적으로 폴백할 수 있으며, 시도별로 키를 지정하면
캐시가 파편화되기 때문입니다. 실패한 describe 결과는 절대 캐시되지
않습니다. 설정:

| 키                              | 기본값 | 범위    |
| ------------------------------- | ------ | ------- |
| `modalityBridgeCacheEnabled`    | `true` | —       |
| `modalityBridgeCacheTtlMinutes` | `60`   | 1–1440  |
| `modalityBridgeCacheMaxEntries` | `200`  | 10–5000 |

#### 원격 이미지 정규화(셀프 루프 describe/base64 가져오기)

브리지가 **원격** 이미지를 직접 가져올 때, 즉 Anthropic describe 셀프 호출과
claude 와이어 형식 base64 변환(`ensureBase64ImagesForClaudeWire`)에서 모두
`visionBridgeHelpers.ts`의 `fetchRemoteImageAsDataUri()`를 통해 가져올 때,
생성된 데이터 URI는 비전 모델 요청에 포함되기 전에
`normalizeDataUri()`(`open-sse/utils/imageNormalize.ts`)를 통과합니다.
크기가 너무 큰 이미지는 **긴 변 2048px**로 축소됩니다(OpenAI/Anthropic이
이미 서버 측에서 적용하는 크기 조정 상한과 동일). 따라서 비전 모델이 보는
내용은 바꾸지 않으면서 업로드 바이트 수와 지연 시간을 줄입니다. 크기
조정에는 동적 import로 로드되는 `sharp`가 사용됩니다. 네이티브 바이너리를
로드하지 못하는 플랫폼에서도 `normalizeDataUri()`는 **절대 예외를
발생시키지 않으며**, 원본 바이트를 그대로 전달하는 방식으로 폴백하므로
describe/base64 변환 경로는 항상 계속 작동합니다. 이미지가 아닌
바이트(디코딩 가능한 이미지를 반환하지 않은 가져오기 결과)도 변경 없이
그대로 전달됩니다. 이 정규화는 브리지가 자체 셀프 호출을 위해 가져오는
이미지에만 한정되며, 호출자의 원시 패스스루 페이로드에는 절대 적용되지
않습니다. 이는 옵트인 전용 변경 원칙(Hard Rule #20)에 부합합니다.

#### 설정 스키마 + 마이그레이션

새 `modalityBridge*` 키는 `updateSettingsSchema`
(`src/shared/validation/settingsSchemas.ts`)에서 Zod로 검증됩니다.
여기에는 `modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCache*` 키 3개와 Audio Bridge에서 사용하는
`modalityBridgeAudio*` 그룹이 포함됩니다. 마이그레이션
`141_modality_bridge_settings.sql`은 기존 레거시 `visionBridge*` 값을
일치하는 새 키로 복사합니다(멱등성을 가지며, 운영자가 설정한
`modalityBridge*` 값을 절대 덮어쓰지 않음). 레거시 키는 한 번의 릴리스
주기 동안 읽기 폴백으로 계속 허용됩니다.

#### 투명성 헤더 + 통계

describe로 변환된 응답에는
`x-omniroute-modality-bridge: image->text;model=<visionModel>;parts=<n>`가
포함됩니다(`modalityBridge/bridgeStats.ts`의
`buildModalityBridgeHeader()`로 생성되고,
`src/sse/handlers/chatHelpers.ts`의 `withModalityBridgeHeader()`로 추가됨).
재라우팅된 요청에는 헤더가 **없습니다**. 페이로드가 변경되지 않았으며 모델
교체는 이미 응답 본문의 `model` 필드에 표시되기 때문입니다.

`GET /api/modality-bridge/stats`(관리 인증 필요, `GET /api/settings`와 동일한
등급)는 `vision`, `audio`, `video`에 대한 인메모리 모달리티별 카운터
`{ attempts, successes, bridged, cacheHits, failures, totalLatencyMs,
latencySamples, averageLatencyMs, lastUsedAt }`를 반환합니다.
`averageLatencyMs`는 모든 시도 횟수가 아니라 `latencySamples`를 분모로
사용합니다. 타이밍 정보가 없는 작업에 대해 0밀리초 샘플을 인위적으로
생성하지 않습니다. `bridged`는 성공한 변환에 대한 하위 호환 별칭으로
유지되며, 실패한 시도는 이 값을 증가시키지 않습니다.
카운터는 설계상 프로세스 재시작 시 초기화됩니다
(회계가 아닌 텔레메트리).

#### 대시보드 구성

전용 대시보드 페이지는
`/dashboard/settings/modality-bridge`입니다. URL로 직접 접근 가능한 `Vision`, `Audio`,
`Video` 탭은 `tab` 값을 전환하는 동안 쿼리 매개변수를 유지합니다.
Vision 탭에서는 활성화 여부, 모드, 모델 선택(자동 기본값 포함), 작업 인식 프롬프팅,
고급 타임아웃/이미지/설명 길이/캐시 제한, 런타임
카운터 및 보호된 샘플 요청을 제공합니다. Audio 탭도 실제로 작동합니다. 활성화 여부,
Auto가 포함된 STT 전용 모델 선택기, 타임아웃/최대 클립 제한, 오디오
카운터 및 `input_audio` 샘플 테스트를 제공합니다. Video 탭도 정상적으로 작동합니다.
FFmpeg/ffprobe 런타임 상태를 네 가지 명시적 UI 상태 중 하나로 표시합니다. 프로브가
진행 중이거나 완료되지 못한 경우 `unknown`, 루프백이 아닌 대시보드 호스트에서
클라이언트 측 프로브를 건너뛴 경우 `restricted`, 프로브 후 설치되지 않은 것으로
확인된 경우 `unavailable`, FFmpeg/ffprobe 버전과 함께 표시되는 경우 `available`입니다.
또한 활성화/모델/프레임/비디오/타임아웃 제한을 영속화하고, 모델 선택기를 비전 지원
모델로 필터링하며, 비디오 카운터를 제공합니다.

AI 설정 아래에 있던 기존 Vision Bridge 카드는 새 페이지로 연결되는 호환성 링크입니다.
더 이상 폼의 두 번째 복사본을 소유하지 않습니다. Media Providers도 기존
Speech-to-Text 플레이그라운드를 제거하지 않으면서 Image-to-Text 및 Speech-to-Text
워크플로를 해당 Modality Bridge 탭에 연결합니다.

**자체 루프 승인 우회:** describe 호출이 OmniRoute 자체의 `/v1` 자체 루프
(비표준 공급자 모델)를 통해 라우팅되면, 하위 요청은
`x-omniroute-admission-bypass: internal`을 전송하고 확인된 자체 루프 자격 증명으로
인증됩니다. 로컬 모드에서는 로컬 `sk_omniroute` 센티널을 사용하고, 그 외에는
운영자가 구성한 `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` 환경 키(#1350)를 사용하므로
`REQUIRE_API_KEY=true` 배포에서도 describe 호출을 실행할 수 있습니다. 이 우회는
해당 자격 증명과 정확히 일치할 때만 허용되므로 외부 클라이언트는 이 헤더를 사용해
승인을 건너뛸 수 없습니다.

레거시 기본값은 `src/shared/constants/visionBridgeDefaults.ts`에 있으며,
새로운 모드/작업 인식/캐시 기본값과 설정 리졸버는
`src/shared/constants/modalityBridgeDefaults.ts`에 있습니다. 가드레일은
`deps` 생성자 옵션을 제공하므로 테스트에서 가짜 `getSettings` 및
`callVisionModel` 구현을 주입할 수 있습니다.

### Audio Bridge (`audioBridge.ts`) — Modality Bridge PR-3

오디오 입력을 허용하는 것으로 알려지지 않은 대상에 도달하기 전에 오디오가 포함된
채팅 요청을 가로챕니다. 채팅 요청 자체는 절대 다시 라우팅하지 않습니다. 오디오 부분은
기존 OpenAI 호환 멀티파트 엔드포인트를 통해 전사되며, 선택된 채팅 모델은 텍스트
전사본을 사용해 계속 처리합니다.

흐름:

1. `getResolvedModelCapabilities()`를 통해 `supportsAudio`를 확인합니다. 명시적인
   공급자 레지스트리 메타데이터가 우선하며, 그다음으로 정적 모델 메타데이터, 동기화된
   `modalities_input` 순서로 적용됩니다. `audio`가 없는 선언된 입력 목록은 `false`이며,
   기능을 판단할 근거가 없으면 `null`입니다. `false`와 `null` 모두 보수적인 브리지를
   활성화하고, `true`이면 이를 우회합니다.
2. `modalityBridgeAudio*` 설정을 확인하고 공유 `detectMediaParts()` 감지기를 통해
   모든 메시지에서 분리 가능한 최상위 오디오 부분을 추출합니다. 지원되는 와이어 형식은
   OpenAI `input_audio`, `audio_url`, `source.media_type: "audio/*"`입니다. 중첩된
   오디오는 라우팅을 위해 감지되지만 분리 경로에서는 제거되지 않습니다. 작업량은
   `modalityBridgeAudioMaxClips`로 제한되며, 이후 부분은 변경되지 않은 상태로 유지됩니다.
3. 구성된 `provider/model`을 따르거나, `selectAudioBridgeModel()`이 안정적인 카탈로그
   순서로 `AUDIO_TRANSCRIPTION_PROVIDERS`를 순회하면서 사용 가능한 활성 공급자 자격
   증명이 있는 첫 번째 모델을 선택하도록 합니다.
4. `callAudioTranscription()`은 base64/data-URI 오디오를 멀티파트 `file`로 변환하거나,
   DNS 고정 및 25 MB 제한이 적용된 공개 전용 아웃바운드 가드를 통해 원격
   `audio_url`을 다운로드합니다. 그런 다음 `resolveSelfLoopBearer()`로 인증하여
   파일과 선택된 모델을 로컬 `/v1/audio/transcriptions` 자체 루프에 POST합니다.
   기존 전사 라우트가 일반적인 자격 증명 조회, 쿨다운/속도 제한 처리 및 공급자
   디스패치를 수행합니다.
5. 성공한 호출은 해당 부분을 `[Audio N]: <transcript>`로 대체합니다. 호출은
   `Promise.allSettled`로 실행되며, 개별 호출이 실패하면 원래 오디오 부분이
   유지됩니다(#4012 계약). 모든 호출이 실패하고 대상이
   `supportsAudio === false`인 것으로 입증된 경우 해당 부분은
   `[Audio N]: (unavailable — no STT provider connected)`가 됩니다(#8430 계약).
   대상이 불명확한 경우(`null`)에는 모든 호출이 실패해도 원본이 그대로 유지됩니다.
   사용 가능한 STT 자격 증명이 없는 것으로 입증된 텍스트 전용 대상에는 네트워크
   호출 없이 동일한 명시적 스텁이 제공됩니다.

성공한 전사본은 프로세스 전체에서 공유되는 Modality Bridge LRU/TTL 캐시를 사용합니다.
키는 오디오 참조, 안정적인 `audio-transcription` 작업 레이블 및 선택된 STT 모델을
결합합니다. 실패 결과는 캐시되지 않습니다. 오디오 시도는 공유 `bridged`,
`cacheHits`, `failures`, `lastUsedAt` 카운터를 업데이트합니다.
변환된 응답에는
`x-omniroute-modality-bridge: audio->text;model=<sttModel>;parts=<n>`가 포함되며,
변경되지 않은 요청에는 Audio Bridge 세그먼트가 추가되지 않습니다.

런타임 설정은 DB에 저장되며 Zod로 검증됩니다.

| 키                            | 기본값  | 범위             |
| ----------------------------- | ------- | ---------------- |
| `modalityBridgeAudioEnabled`  | `true`  | —                |
| `modalityBridgeAudioModel`    | `""`    | Auto 또는 STT ID |
| `modalityBridgeAudioTimeout`  | `60000` | 1000–300000      |
| `modalityBridgeAudioMaxClips` | `3`     | 1–10             |

공유 캐시는 계속해서 `modalityBridgeCacheEnabled`,
`modalityBridgeCacheTtlMinutes`, `modalityBridgeCacheMaxEntries`로 제어됩니다.

### Video Bridge (`videoBridge.ts`, `videoBridgePipeline.ts`)

알려진 네이티브 동영상 지원 기능이 없는 대상이 호출되기 전에 Chat Completions `messages` 및 Responses
API `input`의 최상위 동영상 파트를 가로챕니다.
지원되는 형식은 `input_video`, `video_url`, `video_source`, HTTPS URL,
`data:video/*;base64,...` 데이터 URI입니다. 텍스트 내의 일반 파일 이름은 동영상으로
취급되지 않습니다.

`VideoBridgeGuardrail.preCall`(`videoBridge.ts`)은 요청 순회,
기능/정책 검사, 요청별 집계, 응답 페이로드를 담당합니다.
동영상별 작업인 획득, 전체 결과 캐시, 프레임 시퀀스 설명
(호출자가 선언한 오디오 트랜스크립트가 있으면 이를 결합), 시도별
메트릭/중단/정리는 `videoBridgePipeline.ts`의 `processVideoPart` 뒤에
숨겨져 있으며, `preCall`의 루프 내에서 동영상 파트마다 한 번씩 호출됩니다.
또한 이 모듈은 명시적인 포트 경계인 `VideoMediaBrokerPort`
(바이트 획득 및 샘플링된 프레임 추출), `VideoAudioTranscriptionPort`
(호출자가 선언한 오디오 트랜스크립트와 샘플링된 캡션 결합),
`VideoDrilldownPort`(프레임 드릴다운 영속성 경계)를 정의합니다.
`VideoDrilldownPort`는 아직 `processVideoPart`에 연결되지 않았으며, 현재는 별도의
`/api/modality-bridge/video/drilldown` 라우트만 드릴다운 항목을 기록합니다.

공개 `/v1` 요청 경로는 서브프로세스를 가져오거나 호출하지 않습니다. 원격
동영상은 50 MiB 제한 내에서 다운로드됩니다. 인라인 base64 동영상에는 동영상별로
보수적인 36 MiB 디코딩 크기 제한이 적용되므로 모델/메시지/프레이밍 엔벌로프를
공개 JSON 요청 허용 한도인 50 MiB 이내로 유지할 수 있습니다. 인라인
길이와 디코딩 크기 추정치는 할당 전에 검사됩니다. 최초 원격 URL과 모든
리디렉션에는 HTTPS가 필수이며, DNS 고정 기능이 있는 기존 공개 대상 전용 아웃바운드
가드를 사용합니다. 이후 바이트는 정확히 내부
`POST /api/modality-bridge/video/extract` 브로커 경계를 통과합니다. 이 라우트에는
`LOCAL_ONLY`와 `SPAWN_CAPABLE`이 모두 적용되며, 프로세스별로 인증된
신뢰할 수 있는 루프백 요청만 허용하고 URL, 파일 시스템 경로, 실행 파일,
인수 목록은 절대 허용하지 않습니다. API 본문 크기 파이프라인과 핸들러의 증분 본문
리더는 각각 독립적으로 50 MiB의 브로커 입력 제한을 적용합니다. 제한된 큐는
한 번에 하나의 추출만 실행하고, 대기 작업은 4개까지 허용하며, 대기 입력은
100 MiB로 제한합니다.

브로커 내부에서 `ffprobe`는 비공개 로컬 파일을 읽으며, 고정된 형식
허용 목록에서는 재생 목록 및 매니페스트 형식을 제외합니다. 허용된 MOV 계열
컨테이너의 경우 외부 MOV 데이터 참조는 기본적으로 비활성화된 상태이며,
고정 명령에서도 이를 활성화하지 않습니다. `ffprobe`와 `ffmpeg` 모두
`file` 전용 프로토콜 허용 목록, 하나의 스레드, 고정된 인수 배열, 셸 미사용을
적용하며, 실행 파일은 `PATH`에서 확인됩니다. 커버용으로 첨부된 이미지 스트림은
재생 가능한 후보가 아닙니다. 재생 가능한 모든 스트림은 제한을 충족해야 하며,
결정론적인 최저 인덱스 폴백보다 명시적인 기본 스트림이 우선됩니다.
동영상은 600초, 차원별 8,192픽셀, 소스 픽셀 33,554,432개로 제한됩니다.
FFmpeg는 중간 지점의 JPEG 프레임 1~16개를 샘플링하고, 더 작은 입력을
업스케일링하지 않으면서 긴 변을 최대 1,024픽셀로 축소하며, URL을 절대
전달받지 않습니다. 기본 샘플링 정책은 `uniform`입니다. 선택 사항인
`scene_aware` 및 실험적 `segment_aware` 정책은 이미 검증된 로컬 스트림에
대해 고정된 FFmpeg 패스를 한 번 더 수행하고, 제한된 `showinfo` 장면 타임스탬프를
선택하며, 감지기 실패, 시간 초과, 잘못된 출력 또는 빈 후보 집합이 발생하면
동일한 균일 중간 지점으로 결정론적으로 폴백합니다. 세그먼트 인식 모드는 검증된
장면 구간에 비례하여 중간 지점 샘플을 할당합니다. 세그먼트 인식 증거와 폴백
동작은 아래에서 자세히 설명합니다. 모든 정책에서 선택 후
16프레임의 하드 제한이 적용됩니다. 장면 인식 요청의 예산이 프레임 하나뿐이면,
활성 전체 동영상 또는 포커스 창의 균일 중간 지점을 사용하고
`policyEffective: uniform`을 보고합니다. 선택된 장면 프레임 하나만으로는
시간 범위의 양 끝을 모두 보존할 수 없기 때문입니다. 호출자는 선택적으로
유한한 포커스 창(`start`/`end`초)을 제공할 수 있습니다. 경계는 미디어
재생 시간에 맞게 제한되며, 순서가 뒤집혔거나 유한하지 않은 창은 거부되고,
모든 샘플링 정책은 정규화된 구간 내에서만 수행됩니다. 결과
창은 샘플링 메타데이터와 신뢰할 수 없는 설명 접두사에 포함되므로 다운스트림
모델이 집중된 발췌 구간과 전체 타임라인을 구분할 수 있습니다.

시맨틱 캡션 포커스는 별도의 명시적 설정입니다. 기본 `full`
분석 모드는 기존 프레임 프롬프트를 보존하고 요청 텍스트를 캡션 모델에
전달하지 않습니다. `focused` 모드에서 브리지는 동일한 Chat 또는 Responses
컨테이너에서 사용자가 작성한 비어 있지 않은 최신 `text`/`input_text`만 읽고,
이를 NFC로 정규화하고, 제어 문자와 공백을 축약하며,
500개의 유니코드 코드 포인트로 제한합니다. 결과가 비어 있으면 정확한 `full`
프롬프트로 폴백합니다. 사용 가능한 힌트는 전용
신뢰할 수 없는 사용자 컨텍스트 블록에 JSON으로 직렬화되며, 관찰 가능한 세부 사항의
우선순위만 지정할 수 있습니다. 미디어에서 보이거나 들리는 지시를 따르지 말라는
별도의 경고를 재정의할 수는 없습니다. 텍스트 포커스는 `start`/`end`를
추론하거나 시간 샘플러를 변경하지 않습니다.

#### FU-07 구조적 세그먼트 증거

`segment_aware`는 이미 검증된 로컬 동영상 스트림에 대해 제한된 사전 분석
패스를 한 번 수행합니다. 고정된 필터 체인은 먼저 너비를 최대 320픽셀로
축소하고, 장면 전환과 정지 구간을 감지한 다음, 흐림, 평균 휘도,
공간적/시간적 정보를 분석하기 위해 초당 1프레임을 샘플링합니다. 이 패스는
구조적 샘플 600개, 하나의 FFmpeg/필터 스레드, 동일한
`file` 전용 프로토콜 및 컨테이너 허용 목록, 1 MiB의 프로세스 출력 제한,
브로커의 공유 중단/기한 내 최대 30초로 제한됩니다. 요청에서 명령,
필터, 경로 또는 URL을 절대 허용하지 않습니다.

구조적 값은 결정론적 샘플링 근거일 뿐, 의미론적 동영상 이해 결과가 아닙니다. 이러한 값은 피사체, 동작, 캡션, 음성 또는 사용자 의도를 추론하지 않습니다. 장면 및 정지 경계는 세그먼트를 구성하며, 정지 구간 비율, 흐림, 노출, 공간적 세부 정보 및 시간적 변화는 기존의 1–16프레임 예산이 할당되는 방식에만 영향을 줍니다. 완전히 정지된 세그먼트에는 최대 1프레임만 할당되며, 정지되지 않은 세그먼트는 남은 예산을 두고 경쟁합니다. 경계 수가 프레임 수보다 많으면 균일한 타임라인 범위를 유지하여 초반의 빠른 컷 전환이 뒤쪽의 긴 세그먼트를 가리지 못하게 합니다. 정지 경계의 1초 분석 해상도 내에 있는 장면 경계는 하나로 병합됩니다.

필터 누락, 잘못된 형식이거나 비어 있는 근거, 감지기 오류 또는 제한된 사전 분석 시간 초과가 발생하면 정확한 균일 중간 지점 정책으로 페일 오픈합니다. 호출자의 중단 또는 브로커 기한 초과는 페일 오픈되지 않습니다. 대신 실행 중인 하위 프로세스를 종료하고 이후의 프레임 추출을 방지하며, 비공개 임시 디렉터리 트리는 `finally`에서 제거됩니다.

`scripts/perf/video-bridge-fu07-eval.ts`는 중복 제거 후 캡션 호출 절감, 고밀도 모션 예산 할당, 흐림/노출/SI-TI 근거, 긴 후반부가 있는 빠른 컷 전환 및 점진적 페이드 오탐지를 평가하기 위한 결정론적 실제 FFmpeg 픽스처를 생성합니다. 이 스크립트는 사전 분석 경과 시간을 기록하며, `/usr/bin/time`을 사용할 수 있는 경우 하위 프로세스의 CPU 사용량과 최대 RSS도 기록합니다. 품질 검사는 구조적 오라클일 뿐입니다. 이 하네스에는 승인된 엔드포인트나 고정된 판정기가 없으므로 실제 캡션 모델 품질은 계속 `HOLD` 상태입니다. 또한 `--caption-cost-per-call-usd`를 통해 명시적인 양수 호출당 비용 추정값을 제공하지 않는 한 금전적 절감 효과도 `HOLD` 상태로 유지됩니다. 이 스크립트는 어느 결과도 임의로 만들어 내지 않습니다.

각 프레임은 4 MiB로 제한되고, 모든 원시 프레임의 총용량은 23 MiB로 제한되며, 직렬화된 브로커 응답은 32 MiB로 제한됩니다. 비공개 임시 디렉터리는 `finally`에서 제거됩니다. OmniRoute는 FFmpeg를 번들로 제공하지 않으며 사용자 지정 실행 파일 경로를 허용하지 않습니다. 캡션 생성 전에 브리지는 보수적인 시각적 중복 제거 단계를 적용합니다. 각 JPEG를 16×16 회색조 버퍼로 축소하고 마지막으로 유지된 프레임과만 비교합니다. 요청된 캡션 예산이 1프레임을 초과하면, 추출 단계에서 해당 예산의 최대 2배이면서 16프레임을 넘지 않는 제한된 후보 풀을 제공합니다. 요청된 상한은 중복 제거 후에만 적용되며, 예산이 2 이상인 경우 최종 축소 과정에서 선택된 첫 번째 후보와 마지막 후보를 보존합니다. 버전이 지정된 `grayscale-16x16-mean-cells-v2` 정책은 평균 휘도 델타와 정규화된 델타가 0.05 이상인 썸네일 셀 비율 중 더 큰 값을 사용합니다. 중복 임계값은 상수 0.04이며, 런타임 설정으로 노출하기보다는 예측 가능성을 위해 선택되었습니다. 이 보조 고대비 신호는 평균만 사용하는 비교에서 놓칠 수 있는 작은 움직임과 가시적 텍스트 변경을 보존합니다. 비교기 또는 디코더 오류가 발생하면 페일 오픈하여 범위를 유지합니다. 출력 메타데이터는 추출된 후보, 성공적으로 사용된 프레임 및 제거된 시각적 중복 항목을 구분합니다.

명시적으로 표시된 동영상 파트는 타임스탬프가 포함된 콘택트 시트를 요청할 수 있습니다. 브리지는 최대 4열, 16프레임의 JPEG 그리드를 생성합니다. 각 512픽셀 셀은 고대비 하단 밴드에 소스 타임스탬프를 새기며, 동일한 타임스탬프가 다운스트림 연결 및 감사를 위해 텍스트 메타데이터에도 유지됩니다. 완성된 JPEG는 계속 32 MiB로 제한됩니다. `sharp`가 그리드를 디코딩하거나 합성할 수 없으면 브리지는 개별 JPEG 프레임으로 대체하며, 클라이언트 중단은 계속 시트 작업을 통해 전파됩니다.

승격 근거는 합성 구성 마이크로벤치마크와 의도적으로 분리되어 있습니다. `scripts/perf/video-bridge-contact-sheet-eval.ts`는 실제 OpenAI 호환 비전 모델을 위한 스키마 버전이 지정된 A/B 하네스를 정의합니다. 이 하네스는 공급자가 보고한 토큰 수, 엔드투엔드 경과 시간(시트 합성 포함), 모델 호출 횟수 및 매니페스트에 정의된 사실 보존 여부를 측정합니다. 원시 모델 응답은 보고서에 기록되지 않으며, SHA-256 다이제스트와 일치한 사실 ID만 유지됩니다. `--execute-real`이 전달되고 `--model`, `OMNIROUTE_BASE_URL` 및 `OMNIROUTE_API_KEY`가 구성되지 않는 한 하네스는 네트워크 호출이나 유료 모델 호출을 수행하지 않습니다. 이렇게 명시적인 실제 실행이 없으면 기계 판독 가능한 판정은 계속 `HOLD` 상태로 유지됩니다. 합성 페이로드 및 호출 횟수 측정만으로는 승격 근거가 되지 않습니다.

호출자가 이미 정렬된 텍스트를 보유한 경우, 지원되는 동영상 파트에 선택적 `transcript.cues` 배열을 첨부할 수 있습니다. 각 큐에는 `text`, 탐색된 재생 시간 내의 유한한 `start`/`end` 구간 및 허용 목록에 포함된 `source`(`client`, `embedded` 또는 `audio-bridge`)가 있어야 합니다. `confidence`의 기본값은 `1`이며 `0`과 `1` 사이여야 합니다. 완전히 동일한 중복 큐는 하나로 병합됩니다. OmniRoute는 이 메타데이터를 사용하여 전사를 시작하지 않습니다. 검증된 큐는 출처, 신뢰도 및 구간과 함께 설명 결과에 복사되고, 프레임 캡션과 나란히 신뢰할 수 없는 관찰 정보로 렌더링됩니다. 유효하지 않거나 범위를 벗어나거나 출처 정보가 없는 텍스트는 캡션 스트림에 혼합되지 않고 거부됩니다. 현재 `source` 필드는 서버가 검증하는 값이 아니라 호출자가 선언하는 값입니다. OmniRoute는 값이 허용된 세 문자열 중 하나인지 확인하지만, `embedded` 또는 `audio-bridge` 레이블이 실제로 서버 소유의 추출 과정에서 생성되었는지는 아직 암호학적으로 확인하지 않습니다. 해당 검증 기능이 구현될 때까지 `source`를 신뢰할 수 없는 힌트로 취급하고, 이를 기반으로 권한 부여 결정을 내리지 마십시오.

고급 호출자는 동일한 비디오에 대해 이미 승인된 `audioTranscript` 트랙을 제공할 수 있습니다. 융합 지점은 하나의 기한과 중단 신호 아래에서 시각 및 오디오 관찰을 실행하고, 이를 공통 타임라인에 따라 정렬하며, 정확히 중복되는 항목을 병합하고, 한쪽만 성공한 경우 부분 결과를 보고합니다. 유효하지 않은 `audioTranscript`는 전체 비디오를 실패시키는 대신 해당 부분 결과로 성능 저하 처리됩니다. 즉, 시각적 설명은 유지되고 오디오 분기에는 정제된 실패 코드가 기록됩니다. 분기별 가용성, 부분 결과 플래그 및 정제된 실패 코드는 설명 결과, 가드레일 메타데이터(`audioFusionRuns`/`audioFusionPartials`/
`audioFusionFailureCodes`), 결과 캐시 메타데이터 및 브리지 융합 카운터에 보존됩니다. 기본 Video Bridge 경로는 음성-텍스트 변환을 호출하거나 두 번째 미디어 사본을 다운로드하지 않습니다. 해당 트랙이 명시적으로 제공되지 않으면 비디오 전용으로 유지됩니다.

**트랜스크립트 보존 (#12150 P1).** 이는 별도의 보존 플래그 없이 Video Bridge(그 자체로 옵트인)가 트랜스크립트 큐를 렌더링할 때마다 자동으로 적용됩니다. 요청이 어떤 트랜스크립트 큐(호출자가 선언한 `transcript` 또는 융합된 `audioTranscript`)라도 렌더링하면, 가드레일은 이를 `videoBridgeObserved`로 표시하고 비디오 설명의 수정된 섀도 복사본을 생성합니다. 이는 문자열을 조립하기 전에 구조화된 큐 필드를 치환하여 모든 큐의 자유 텍스트 본문을 `[redacted-video-transcript]`로 바꾼 동일한 렌더링입니다(평면화된 텍스트를 파싱하는 방식은 절대 사용하지 않으므로, 적대적이거나 일반적인 콘텐츠는 물론 `[inaudible]`/`[music]`처럼 `]`를 포함하는 본문을 비롯한 어떤 큐 콘텐츠도 남을 수 없습니다). 영속화된 호출 로그 요청 본문에서는 콘텐츠 동등성에 따라 각 비디오 파생 텍스트 부분을 해당 수정된 섀도 복사본으로 교체합니다. `fullText` 앵커는 완료된 호출 전 가드레일 페이로드에서 다시 읽으므로, 이후의 체인 가드레일(우선순위 10/95의 PII 및 자격 증명 마스커)이 설명 텍스트를 제자리에서 다시 작성하고 시스템 프롬프트/핸드오프/메모리 주입이 메시지 배열의 형태를 변경한 후에도 일치가 유지됩니다. 모델에 업스트림으로 전송되는 본문은 변경되지 않습니다. 관찰된 요청은 영속적인 Memory도 채우지 않으므로(요청 및 응답에서 파생되는 추출을 모두 건너뜀), 모델 자체의 응답이 트랜스크립트 텍스트를 Memory에 다시 반영할 수 없습니다.

후속 작업으로 추적 중인 아직 열려 있는 보존 표면(**P2**, #12430)은 다음과 같습니다. 상세 로그 아티팩트의 가드레일 적용 전 원시 클라이언트 요청 스냅샷, `previous_response_id` 연속 요청의 실패 시 차단 처리, 합성된 문자열 프롬프트 내에 트랜스크립트를 포함하는 파생 프롬프트 내부 디스패치(파이프라인 단계, 컨텍스트 핸드오프), 그리고 트랜스크립트를 인용하는 모델 응답의 응답 본문/시맨틱 캐시 사본입니다. 이러한 항목은 P1의 영속화된 요청 본문 + Memory 범위를 벗어나는 원시/응답 계열 또는 옵트인 표면입니다.

내부 `/api/modality-bridge/video/drilldown` 수명 주기는 별도의 루프백/토큰 인증 캐시 기반 계층입니다. 모든 작업에는 정규화된 불투명 주체 ID도 필요합니다. 프로덕션 호출자를 활성화하기 전에 해당 호출자는 인증된 테넌트에서 그 ID를 파생해야 하며, 클라이언트가 선택한 값을 전달해서는 안 됩니다. 캐시 키는 해당 주체를 정규화된 세션 및 비디오 참조 ID에 결합하고, SHA-256에서 파생된 키만 저장하며, 읽기와 삭제 모두를 동일한 주체로 범위 지정합니다. 캐시는 항목당 최대 16개의 파생 JPEG 프레임을 저장하고, 10분 후 만료시키며, 제한된 `start`/`end` 읽기 또는 명시적인 세션 삭제를 지원합니다.

각 주체는 16개 항목 및 64 MiB의 정규화된 JPEG 데이터로 제한됩니다. 이러한 제한은 전체 64개 항목/256 MiB 상한과 독립적입니다. 주체 할당량 압박이 발생하면 전역 LRU 제거를 고려하기 전에 해당 주체에서 가장 오래 사용되지 않은 항목만 제거합니다. 만료된 항목은 캐시 활동 시 주체별 및 전역 집계 모두에서 정리되며, 취소 및 검증 실패 시 부분 교체 내용은 커밋되지 않습니다.

캐시는 비정규 Base64, 과도한 패딩, JPEG가 아닌 미디어, 형식이 잘못되거나 잘린 JPEG 및 제한된 전체 이미지 `sharp` 디코딩 중 경고가 발생하는 JPEG를 거부합니다. 허용된 각 이미지를 정규화된 JPEG로 다시 인코딩하고, 호출자가 제공한 필드를 신뢰하는 대신 디코딩된 바이트에서 너비와 높이를 파생하며, 후행 폴리글롯 바이트는 보존하지 않고 폐기합니다. 제한이 적용된 정규화 압축 버퍼만 양쪽 할당량에 산정됩니다. JSON 전송 제한에는 32 MiB 디코딩 입력 상한에 대한 Base64 오버헤드가 포함됩니다. 저장된 모든 파생 결과에는 검증된 JPEG 형식/해상도, 샘플링 정책, 파생 버전, 생성 시간, 서버에서 계산한 콘텐츠 해시, 해시된 상위 참조 및 신뢰할 수 있는 호출자가 제공한 상위 콘텐츠 해시가 기록됩니다. 원자적 캐시 커밋 전에 비동기 디코딩/해시 단계 사이에서 취소 여부를 확인합니다.

이 작업 묶음은 아직 프로덕션 생성자를 해당 라우트에 연결하지 않으며, 다중 해상도 변형 선택도 제공하지 않습니다. 따라서 투명한 Video Bridge 요청 경로에는 추가 작업이 발생하지 않으며, 테넌트에 바인딩된 주체 파생과 전체 FU-08 다중 해상도 수명 주기는 완료된 동작으로 문서화되지 않고 명시적인 후속 작업으로 남습니다.

프레임은 구성된 Video 모델을 사용해 순차적으로 캡션이 생성됩니다. 비어 있는
Video 재정의는 Vision 설정을 상속하며, 둘 다 비어 있으면 Vision
자동 라우터가 실제로 사용할 비전 지원 모델을 선택합니다. 캡션 생성에 성공하면
원래 파트는 안정적인 `[Video description:` 접두사가 붙은 텍스트로 대체됩니다. 이
접두사는 해당 텍스트를 신뢰할 수 없는 미디어 기반 관찰로 표시하고, 다운스트림
모델에 미디어에서 발견된 지시를 따르지 않도록 알립니다. 프레임 캡션 캐시 키에는
JPEG 바이트, 프롬프트, 타임스탬프 및 실제 모델이 포함되며, 성공한
캡션만 캐시됩니다. 캐시 항목에는 폴백 모델을 포함해 실제로 성공한 생성자 모델이
유지됩니다. 서로 다른 프레임이 서로 다른 모델에서 생성된 경우 브리지는 `mixed`를
보고합니다. 캐시 적중 시 요청된 라우팅 계획으로 다시 레이블을 지정하지 않고 해당
생성자 ID를 재사용합니다. 전체 비디오 결과 캐시는 출력을 변경하는 모든 입력, 즉
프롬프트, 실제 모델, 샘플링 정책, 프레임 수, 의미 분석 모드, 정규화된 포커스 힌트의
SHA-256 지문, 포커스 윈도우, `transcript`, `audioTranscript` 및 콘택트 시트 플래그를
기준으로 키가 지정됩니다. 따라서 이러한 차원 중 하나라도 변경되면 캐시 미스가
발생하며, 오래된 결과가 재사용되는 일은 없습니다. 시각적 중복 제거 정책 버전,
임계값 및 제한된 후보 프레임 수도 결과 캐시 키와 메타데이터에 명시적으로
포함됩니다. 따라서 정책이 변경되면 오래된 전체 비디오 설명을 재사용할 수
없습니다. 결과 캐시 v4 메타데이터에는 모드와 지문이 유지되지만 원시 사용자
작업은 절대 저장되지 않습니다. 가드레일 메타데이터는 요청된 분석 모드와 실제
분석 모드를 모두 보고합니다. 사용할 수 있는 사용자 텍스트 없이 `focused` 모드가
요청되면 실제 모드는 `full`로 보고됩니다.

가드레일은 지원되는 모든 비디오 파트를 추출하지만
`modalityBridgeVideoMaxVideos`개를 초과해 설명하지 않습니다.
`supportsVideo === false`인 것으로 확인된 대상의 경우, 실패했거나 제한을 초과한
비디오는 명시적인 안전 텍스트 마커로 바뀌므로 원시 비디오가 남지 않습니다.
기능 지원 여부를 알 수 없는 경우 해당 파트는 변경되지 않은 상태로 유지됩니다.
`supportsVideo === true`인 대상은 브리지를 우회합니다.
클라이언트 요청 중단 신호는 다운로드, 브로커 큐, 하위 프로세스 및 캡션 호출까지
전파됩니다. 중단 시 비디오 사이에서 처리가 멈추며, 원시 미디어를 허용하는
페일 오픈 동작은 절대 발생하지 않습니다.

런타임 설정은 DB를 기반으로 하며 Zod로 검증됩니다.

| 키                                  | 기본값      | 범위 / 동작                                                                                        |
| ----------------------------------- | ----------- | -------------------------------------------------------------------------------------------------- |
| `modalityBridgeVideoEnabled`        | `false`     | 선택적 런타임, 명시적 활성화 필요                                                                  |
| `modalityBridgeVideoAnalysisMode`   | `"full"`    | `full`은 일반 캡션을 유지하고, `focused`는 제한된 신뢰할 수 없는 최신 사용자 컨텍스트를 사용합니다 |
| `modalityBridgeVideoModel`          | `""`        | Vision Bridge 모델을 상속합니다                                                                    |
| `modalityBridgeVideoFrameCount`     | `8`         | 1–16                                                                                               |
| `modalityBridgeVideoSamplingPolicy` | `"uniform"` | `uniform`, `scene_aware` 또는 비례 방식의 `segment_aware`; 감지기 실패 시 `uniform`으로 폴백합니다 |
| `modalityBridgeVideoMaxVideos`      | `1`         | 1–4                                                                                                |
| `modalityBridgeVideoTimeout`        | `120000`    | 1000–120000 ms                                                                                     |

기존에 영구 저장된 120초 초과 Video 타임아웃 값은 브로커 기한으로
제한되며, 해당 제한을 초과하는 새 설정 쓰기는 거부됩니다.
`GET /api/modality-bridge/video/runtime`은 인증 또는 런타임 검사 전에 신뢰할 수
있도록 스탬프가 지정된 루프백 로컬리티를 요구하며, 그다음 관리 인증을 요구합니다.
이 엔드포인트는 `available`, 정제된 FFmpeg/ffprobe 버전 및 런타임을 사용할 수
없을 때의 고정된 사유만 반환합니다. 내부 추출 엔드포인트는 공개 업로드 API가
아닙니다. 큐가 포화되면 `503`과 `Retry-After`를 반환하고, 호출자 연결이 끊기면
`499`를 반환하며, 고정된 브로커 기한에 도달하면 `504`를 반환합니다. 변환된 응답은
Vision 또는 Audio 세그먼트를 제거하지 않고 중앙
`x-omniroute-modality-bridge` 헤더에
`video->text;model=<visionModel>;parts=<videos>`를 추가합니다.

### PII 마스커 (`piiMasker.ts`)

**두 단계 모두**에서 실행됩니다.

- **`preCall`**은 페이로드를 복제하고 `system`, `messages`, `input` 및
  `prompt`를 순회하며(일반 문자열 항목 포함), 문자열 `content`/`text` 필드에
  `processPII()`(`@/shared/utils/inputSanitizer`에서 가져옴)를 적용합니다.
  `PII_REDACTION_ENABLED=true`이면 감지된 PII가 아웃바운드 페이로드에서
  삭제 처리됩니다. 이는 `INPUT_SANITIZER_MODE`(프롬프트 인젝션 정책만 제어함)와
  독립적입니다. 삭제 처리가 꺼져 있으면 콘텐츠를 다시 작성하지 않고 호출에 감지
  횟수를 기록합니다.
- **`postCall`**은 응답을 깊은 복제한 다음 `sanitizePIIResponse()`와
  Responses API 형식 마스커(`maskResponsesOutput` — `output_text` 및
  `output[].content[].text`를 처리함)를 실행합니다. 삭제 처리가 하나라도
  발생하면 수정된 응답이 원래 응답을 대체합니다.

가드레일은 절대 차단하지 않으며, 주석(`meta.detections`,
`meta.redacted`)을 추가하거나 다시 작성하기만 합니다.

### 프롬프트 인젝션 (`promptInjection.ts`)

사용자가 제공한 콘텐츠에서 적대적 구조를 감지하고 구성된 정책을 적용합니다.
동작은 환경 변수와 생성자 옵션에 의해 결정됩니다:

| 설정        | 환경 변수                                                                                          | 기본값 | 효과                                                                                                                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 활성화      | `INPUT_SANITIZER_ENABLED`                                                                          | `true` | `false`이면 가드레일이 즉시 종료됩니다.                                                                                                                                               |
| 모드        | `INJECTION_GUARD_MODE` / `INPUT_SANITIZER_MODE`                                                    | `warn` | 인젝션 정책: `block`, `warn`, 또는 `log`. (`redact`는 하위 호환성을 위해 허용되지만 인젝션 텍스트를 제거하지는 **않습니다**. 요청 PII 재작성은 `PII_REDACTION_ENABLED`로 제어됩니다.) |
| 차단 임계값 | `blockThreshold` 옵션 / `INPUT_SANITIZER_BLOCK_THRESHOLD` (`INJECTION_GUARD_BLOCK_THRESHOLD` 별칭) | `high` | 차단에 필요한 최소 심각도입니다. 기본 설정에서 Medium은 관찰만 수행합니다.                                                                                                            |

**모드 우선순위** (`getMode`): 호출자의 `options.mode` →
`INJECTION_GUARD_MODE` **DB 기능 플래그 재정의**(Dashboard → Settings →
Feature Flags) → `INJECTION_GUARD_MODE` 환경 변수 → `INPUT_SANITIZER_MODE` 환경 변수 →
`warn`. 따라서 대시보드 재정의가 환경 변수보다 우선하므로, Feature
Flags UI에서 실행 중인 가드를 실시간으로 제어할 수 있습니다(재시작 불필요). DB 읽기는 장애 안전 방식으로 동작합니다.
오류가 발생하면 가드는 환경 변수 기반 동작으로 대체되며,
재정의가 설정되지 않은 경우 환경 변수만 사용한 결정 방식과 동일하게 동작합니다.

탐지 소스:

1. `@/shared/utils/inputSanitizer`의 `sanitizeRequest()`(파이프라인의
   다른 위치에서도 사용되는 공유 탐지기 세트).
2. 내장 `DEFAULT_GUARD_PATTERNS`(현재 `system_override_inline` 및
   `markdown_system_block`이며 둘 다 심각도는 `high`).
3. 생성자 옵션을 통해 전달되는 선택적 `customPatterns`(문자열, 정규식
   또는 `{ name, pattern, severity }` 레코드).

`mode === "block"`**이고** 하나 이상의 탐지 결과가 심각도
임계값을 충족하면 `preCall`은 `{ block: true, message: "Request rejected:
suspicious content detected" }`를 반환합니다. `warn`/`log` 모드에서는 가드레일이 로그를
기록하지만 호출은 허용합니다. 레지스트리를 거치지 않고 프롬프트를 평가해야 하는
호출자를 위해 공유 헬퍼 `evaluatePromptInjection()`도 내보냅니다.

**스캔 범위(v3.8.20):** 탐지기는 결합된 프롬프트 텍스트의 **처음 16 KB**만
검사합니다. `src/shared/utils/inputSanitizer.ts`의
`MAX_INJECTION_SCAN_BYTES = 16 * 1024`(16 384바이트)입니다. `detectInjection()`과
`evaluatePromptInjection()`은 모두 패턴 루프를 실행하기 전에
`slice(0, MAX_INJECTION_SCAN_BYTES)`를 적용합니다. 인젝션 지시문은 입력의 앞부분에 있으므로,
이 제한은 탐지 성능을 약화시키지 않으면서 수백 KB 규모 페이로드의 정규식 CPU/GC 사용량을
제한합니다(#3932, #4041 참조).

### 자격 증명 마스커(`credentialMasker.ts`)

**두** 단계 모두에서 기본 체인의 마지막(우선순위 `95`)으로 실행됩니다. 잘 알려진
API 키/비밀 토큰 패턴을 아웃바운드 페이로드(메시지
내용, 도구 호출 인수, 도구 결과)와 공급자 응답에서 **모두** 마스킹하므로,
프롬프트에 붙여 넣은 자격 증명(또는 도구 결과가 다시 출력한 자격 증명)이
업스트림 공급자나 클라이언트로 유출되지 않습니다.

- **명시적으로 활성화해야만 사용 가능**하며, PII 마스킹과 동일한 규칙(Hard Rule #20 인접)을 따릅니다.
  `settings.credentialRedactionEnabled === true` **또는**
  `CREDENTIAL_REDACTION_ENABLED=true`가 아니면 비활성화됩니다. 꺼져 있으면 가드레일은 아무 작업도 하지 않으며,
  절대 차단하거나 재작성하지 않습니다.
- `redactCredentials()`는 전체 페이로드/응답 트리(`walkValue()`,
  프로토타입 오염 방지, `WeakSet`을 통한 순환 안전)를 순회하고 일치 항목을
  `[REDACTED:<type>]` 자리표시자로 대체하며, 실제로 변경된
  분기만 복제합니다.
- `CREDENTIAL_PATTERNS`는 LLM 공급자 키(OpenAI, OpenAI-proj,
  Anthropic, Google, Hugging Face, Replicate), VCS/SaaS 토큰(GitHub, Slack,
  Linear, Notion, npm, Postman, Discord), 결제 키(Stripe, Square), 클라우드
  키(AWS 액세스 키, Twilio, SendGrid, Mailgun), 개인 키/JWT,
  자격 증명을 포함하는 연결 문자열(`mongodb://user:pass@...` 등), 그리고
  일반적인 `Authorization`/`x-api-key`/`api-key`/`apikey` 헤더 값
  패턴을 포괄합니다. 헤더 형태의 키(`authorization`, `x-api-key`, `api-key`,
  `apikey`)는 일반 텍스트 정규식을 통하지 않고 구조적으로 마스킹됩니다(값만 마스킹하고
  `Bearer `/`Basic `과 같은 스킴 접두사는 보존).
- 가드레일은 절대 차단하지 않으며 재작성(`modifiedPayload` /
  `modifiedResponse`) 및 주석 추가(`meta.credentialsRedacted`, `meta.count`)만 수행합니다.

회귀 방지 테스트: `tests/unit/credential-masker-guardrail.test.ts`.

## 기본 계약 (`base.ts`)

```typescript
class BaseGuardrail {
  enabled: boolean;
  name: string;
  priority: number;

  constructor(name: string, options?: { enabled?: boolean; priority?: number });

  async preCall(payload: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;

  async postCall(response: unknown, context: GuardrailContext): Promise<GuardrailResult | void>;
}

interface GuardrailResult<TValue = unknown> {
  block?: boolean; // true이면 체인을 즉시 중단
  message?: string; // 차단 시 표시됨
  meta?: Record<string, unknown> | null;
  modifiedPayload?: TValue; // 요청을 다시 작성하기 위해 preCall에서 반환
  modifiedResponse?: TValue; // 응답을 다시 작성하기 위해 postCall에서 반환
}

interface GuardrailContext {
  apiKeyInfo?: Record<string, unknown> | null;
  disabledGuardrails?: string[] | null;
  endpoint?: string | null;
  headers?: Headers | Record<string, unknown> | null;
  log?: GuardrailLog | Console | null;
  method?: string | null;
  model?: string | null;
  provider?: string | null;
  signal?: AbortSignal;
  sourceFormat?: string | null;
  stream?: boolean;
  targetFormat?: string | null;
}
```

가드레일은 `void`, `{}`, 또는 `{ block: false }` 중 하나를 반환하여 "변경 없음"을 알립니다. `modifiedPayload`/`modifiedResponse`를 반환하면 체인을 따라 후속 가드레일로 전달되는 값을 대체합니다.
`signal?: AbortSignal`은 호출자의 수명 주기를 가드레일로 전달합니다. 요청 중단은 의도적인 페일 오픈 예외입니다. 미디어 브리지는 작업을 중단하고 정리하며, 원시 미디어를 지원하지 않는 것으로 알려진 대상으로 원시 미디어를 복원하지 않습니다.

## 레지스트리 (`registry.ts`)

싱글턴 `guardrailRegistry`는 다음을 제공합니다.

- `register(guardrail)` — 가드레일을 추가하거나 정규화된 이름을 기준으로 대체하고, 오름차순 `priority`로 다시 정렬합니다.
- `clear()` / `list()` — 관리용 헬퍼입니다.
- `runPreCallHooks(payload, context)` — 활성 가드레일을 순회하고, `modifiedPayload`를 통해 페이로드를 전달하며, 첫 번째 `block: true`에서 중단합니다.
- `runPostCallHooks(response, context)` — 응답 측에서 동일한 흐름을 수행합니다.
- `resetGuardrailsForTests({ registerDefaults })` — 상태를 지우고, 선택적으로 기본값을 다시 등록하여 테스트를 완전히 격리합니다.

두 실행기 모두 `{ blocked, payload|response, results, guardrail?, message? }`를 반환합니다. 여기서 `results`는 가드레일별 `blocked`, `skipped`, `modified`, `error`, `meta` 필드를 포함하는 `GuardrailExecutionResult` 레코드의 배열이며, 추적에 유용합니다.

### 요청별 가드레일 비활성화

`resolveDisabledGuardrails({ apiKeyInfo, body, headers })`는 현재 요청에서 건너뛰어야 하는 가드레일 이름의 중복 제거 목록을 수집합니다. 소스는 다음과 같으며, 모두 선택 사항이고 모두 병합됩니다.

- `apiKeyInfo.disabledGuardrails`
- 요청 본문의 최상위 `disabledGuardrails`
- 요청 본문의 `metadata.disabledGuardrails`
- 헤더 `x-omniroute-disabled-guardrails`(또는 레거시 `x-disabled-guardrails`)

값은 문자열 배열이나 쉼표로 구분된 문자열일 수 있으며, 이름은 소문자 케밥 표기법으로 정규화됩니다(`pii_masker` → `pii-masker`). 결과는 `context.disabledGuardrails`를 통해 레지스트리에 전달되며, 레지스트리는 일치하는 가드레일을 건너뜁니다(`results`에서 `skipped: true`).

## 실행 순서

`src/sse/handlers/chat.ts` 및
`open-sse/handlers/chatCore.ts`를 통과하는 각 요청에 대해:

1. `resolveDisabledGuardrails(...)`는 API 키, 본문 및 헤더에서 건너뛸 목록을
   구성합니다.
2. `guardrailRegistry.runPreCallHooks(body, ctx)`는 우선순위가 낮은 순서대로
   가드레일을 실행합니다.
   - 비활성화된 가드레일은 `skipped`로 기록됩니다.
   - 각 가드레일의 `preCall`은 `modifiedPayload`를 통해 페이로드를 다시 작성할 수 있습니다.
   - 첫 번째 `block: true`가 체인을 단락시키며, 핸들러는
     가드레일 거부 응답을 반환합니다.
3. (다시 작성되었을 수 있는) 페이로드가 콤보 라우팅과 업스트림
   디스패치로 전달됩니다.
4. 응답이 구성된 후 `guardrailRegistry.runPostCallHooks(...)`가
   응답에 대해 동일한 체인을 실행합니다. 여기에서 `block: true`이면 업스트림
   응답을 폐기합니다.

예외를 발생시키는 가드레일은 `error: <message>`로 기록되고
`logger.warn`을 통해 로깅되지만, 체인은 계속 실행됩니다. 이는 의도된 실패 허용 방식입니다.

## 구성

내장 가드레일이 읽는 환경 변수:

| 변수                                  | 사용 주체                 | 효과                                                                                                  |
| ------------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------- |
| `INPUT_SANITIZER_ENABLED`             | `prompt-injection`        | 탐지를 완전히 비활성화하려면 `false`로 설정합니다.                                                    |
| `INPUT_SANITIZER_MODE`                | `prompt-injection`        | 인젝션 정책: `warn`, `block` 또는 `log`. 레거시 값 `redact`는 인젝션 텍스트를 다시 작성하지 않습니다. |
| `INJECTION_GUARD_MODE`                | `prompt-injection`        | 인젝션 가드의 모드이며, 환경 변수를 **재정의하는** DB 기능 플래그이기도 합니다(DB > ENV).             |
| `INPUT_SANITIZER_BLOCK_THRESHOLD`     | `prompt-injection`        | `MODE=block`이 거부하는 최소 심각도: `high`(기본값), `medium` 또는 `low`.                             |
| `INJECTION_GUARD_BLOCK_THRESHOLD`     | `prompt-injection`        | `INPUT_SANITIZER_BLOCK_THRESHOLD`의 레거시 별칭입니다.                                                |
| `PII_REDACTION_ENABLED`               | `pii-masker`              | `true`이면 요청의 PII가 가려집니다(인젝션 모드와 무관).                                               |
| `PII_RESPONSE_SANITIZATION` / `_MODE` | `pii-masker` (다운스트림) | 응답 측 마스커의 동작을 제어합니다.                                                                   |

Modality Bridge 가드레일은 환경 변수가 아닌 DB 기반 설정
저장소(`getSettings()`)에서 런타임 구성을 읽습니다. Vision의 기본 키는
`modalityBridgeVisionEnabled`, `modalityBridgeVisionMode`,
`modalityBridgeVisionModel`, `modalityBridgeVisionTaskAware`,
`modalityBridgeVisionPrompt`, `modalityBridgeVisionTimeout`,
`modalityBridgeVisionMaxImages`, `modalityBridgeVisionMaxChars`,
`modalityBridgeCacheEnabled`, `modalityBridgeCacheTtlMinutes` 및
`modalityBridgeCacheMaxEntries`입니다. 레거시
`visionBridge*` 키는 문서화된 한 주기 읽기 폴백으로만 허용되며,
대시보드 쓰기 작업은 기본 키를 사용합니다. 기본값과 폴백
리졸버는 `src/shared/constants/modalityBridgeDefaults.ts`에 있으며, 레거시
상수는 `src/shared/constants/visionBridgeDefaults.ts`에 유지됩니다.

Audio는 `modalityBridgeAudioEnabled`, `modalityBridgeAudioModel`,
`modalityBridgeAudioTimeout` 및 `modalityBridgeAudioMaxClips`와 공유
`modalityBridgeCache*` 설정을 사용합니다. 이 키들은 Modality Bridge 스키마와 함께
도입되었으므로 Audio에는 레거시 키 폴백이 없습니다.

Video는 `modalityBridgeVideoEnabled`, `modalityBridgeVideoAnalysisMode`,
`modalityBridgeVideoModel`,
`modalityBridgeVideoFrameCount`, `modalityBridgeVideoSamplingPolicy`,
`modalityBridgeVideoMaxVideos` 및
`modalityBridgeVideoTimeout`과 공유 `modalityBridgeCache*` 설정을 사용합니다.
FFmpeg/ffprobe는 선택적 운영 종속성이고 프레임 캡셔닝은 지연 시간과 모델 비용을
증가시키므로 기본적으로 비활성화되어 있습니다.

## 사용자 지정 가드레일

```typescript
import { BaseGuardrail, guardrailRegistry } from "@/lib/guardrails";

class BudgetGuardrail extends BaseGuardrail {
  constructor() {
    super("budget", { priority: 50 });
  }

  async preCall(payload, ctx) {
    if (ctx.apiKeyInfo?.budgetExceeded) {
      return { block: true, message: "Daily budget exceeded" };
    }
    return { block: false };
  }
}

guardrailRegistry.register(new BudgetGuardrail());
```

단계:

1. `BaseGuardrail`을 확장하는 `src/lib/guardrails/myGuardrail.ts`를 생성합니다.
2. `preCall` 및/또는 `postCall`을 구현합니다.
3. 가져오기 시점에 등록하거나(`registerDefaultGuardrails`에서 추가) 런타임에
   `guardrailRegistry.register(...)`를 호출합니다. 레지스트리는 정규화된 이름이
   동일한 기존 가드레일을 대체합니다.
4. `tests/unit/` 아래에 테스트를 추가합니다(기존 예시:
   `tests/unit/guardrails-registry.test.ts`,
   `tests/unit/prompt-injection-guard.test.ts`,
   `tests/unit/guardrails/visionBridge.test.ts`).

## 테스트

각 테스트 사이에 `resetGuardrailsForTests()`를 사용하여 알려진 상태에서 시작합니다.
빈 레지스트리로 시작하여 테스트 대상 가드레일만 등록하려면
`{ registerDefaults: false }`를 전달합니다. Vision Bridge는 의존성 주입
(`deps.getSettings`, `deps.callVisionModel`)을 지원하며, Audio Bridge는 설정,
기능, STT 모델 선택, 자격 증명 검사 및 트랜스크립션을 위한 동등한 연결 지점을
제공합니다. 따라서 테스트에서는 DB나 네트워크에 액세스하지 않고도 두 흐름을
모두 실행할 수 있습니다.

## 참고 항목

- `src/lib/guardrails/` — 구현
- `src/shared/utils/inputSanitizer.ts` — 프롬프트 인젝션 및 PII 마스킹을 지원하는 공유 탐지기
- `src/shared/constants/visionBridgeDefaults.ts` — Vision Bridge 기본값 및 강제 브리지 모델 목록
- `src/shared/constants/modalityBridgeDefaults.ts` — 공유 Vision/Audio 런타임 기본값
- `docs/architecture/RESILIENCE_GUIDE.md` — 직교 계층(서킷 브레이커, 쿨다운)
- `docs/reference/ENVIRONMENT.md` — 전체 환경 변수 참조

## 인젝션 가드 라우트 범위 및 레드팀(Phase 8 · Block D)

인젝션 가드(`createInjectionGuard` / `withInjectionGuard`)는 사용자 프롬프트를
받는 모든 라우트를 포괄합니다. `INJECTION_GUARD_MODE`를 따르며(기본값 `warn` =
로그만 기록, `block` = HTTP 400 `SECURITY_001` 반환) 작동합니다.

| 유형         | 라우트                                                                                                                                               | 기본 모드 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 텍스트(기존) | `/v1/chat/completions`, `/v1/completions`, `/v1/relay/chat/completions`                                                                              | warn      |
| 생성형       | `/v1/messages`, `/v1/responses`, `/v1/images/generations`, `/v1/images/edits`, `/v1/videos/generations`, `/v1/music/generations`, `/v1/audio/speech` | warn      |
| 데이터       | `/v1/embeddings`, `/v1/rerank`, `/v1/search`, `/v1/moderations`                                                                                      | warn      |

텍스트 추출(`extractMessageContents`)은 `messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`을 포괄합니다.

**레드팀(매일 밤, `nightly-llm-security.yml`):** promptfoo는
`INJECTION_GUARD_MODE=block`에서 각 라우트가 `OWASP-LLM` 코퍼스를 차단하는지
검증하며, garak은 프로브를 실행합니다(시크릿이 없으면 건너뜀).
일관성을 위해 `moderations`도 포함됩니다. 차단 모드를 사용하는 운영자는
`resolveDisabledGuardrails`를 통해 이를 제외할 수 있습니다.

야간 워크플로(`.github/workflows/nightly-llm-security.yml`, cron + 수동
디스패치)에는 두 개의 작업이 있습니다.

- **`promptfoo-guard` (차단형)** — `INJECTION_GUARD_MODE=block`으로
  `promptfoo eval -c promptfooconfig.yaml`을 실행합니다. 각 적대적 사례(예:
  "이전의 모든 지시를 무시하라…", DAN 스타일 탈옥)는 응답에
  `error.code === "SECURITY_001"`이 포함되는지 확인합니다. 즉, 가드가 실제로
  요청을 거부했는지 검증합니다.
- **`garak` (권고형)** — 로컬 OmniRoute 인스턴스
  (`http://localhost:20128/v1`)를 대상으로 garak
  `--probes promptinject,dan,leakreplay`를 실행합니다. 공급자 시크릿
  (`PROMPTFOO_PROVIDER_KEY`)의 존재 여부에 따라 실행되며, 시크릿이 없으면
  정상적으로 건너뜁니다. 또한 `|| true`가 접미사로 붙어 있으므로 CI를
  실패시키지 않고 결과를 보고합니다.

가드 헬퍼(`createInjectionGuard` / `withInjectionGuard`)의 적용 범위는
프롬프트를 포함하는 모든 `/v1` 라우트에 걸쳐 있습니다. 프롬프트 텍스트는
`src/shared/utils/inputSanitizer.ts`의 `extractMessageContents()`를 통해
`messages`/`input`/`prompt`/`query`+`documents`/`instructions`/`system`에서
추출됩니다.
