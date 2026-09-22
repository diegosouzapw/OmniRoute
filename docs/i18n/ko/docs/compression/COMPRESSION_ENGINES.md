# Compression Engines (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_ENGINES.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_ENGINES.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_ENGINES.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_ENGINES.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_ENGINES.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_ENGINES.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_ENGINES.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_ENGINES.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_ENGINES.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_ENGINES.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_ENGINES.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_ENGINES.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_ENGINES.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_ENGINES.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_ENGINES.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_ENGINES.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_ENGINES.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_ENGINES.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_ENGINES.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_ENGINES.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_ENGINES.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_ENGINES.md)

---

OmniRoute 압축은 엔진 계약을 중심으로 구축됩니다. 모드는 하나의 엔진을 직접 실행하거나
(`caveman` 또는 `rtk`) 여러 엔진을 순서대로 실행하는 결정론적 스택 파이프라인을 사용할 수 있습니다.

## 모드

| 모드         | 엔진 경로                           | 적합한 입력                                   |
| ------------ | ----------------------------------- | --------------------------------------------- |
| `off`        | 없음                                | 프롬프트를 정확히 보존                        |
| `lite`       | Caveman lite 헬퍼                   | 위험도가 낮은 상시 정리                       |
| `standard`   | Caveman                             | 자연어 프롬프트 압축                          |
| `aggressive` | Caveman + 기록/도구 요약기          | 긴 채팅 세션                                  |
| `ultra`      | Caveman + 가지치기 헬퍼             | 컨텍스트 한도 복구                            |
| `rtk`        | RTK                                 | 터미널, 셸, 빌드, 테스트 및 git 출력          |
| `omniglyph`  | OmniGlyph                           | 네이티브 제공자 전송 계층의 이미지형 컨텍스트 |
| `stacked`    | 파이프라인, 기본값 `rtk -> caveman` | 혼합된 도구 로그 및 산문, 최대 절감 효과      |

### OmniGlyph 압축 프로필

`omniglyph` 엔진(패키지 `omniglyph`, 1.4.0+)은 이름이 지정된 의미론적 프로필을 허용하며, 압축 설정의
`omniglyph.profile`을 통해 전역으로 설정하거나 스택 파이프라인의 단계 설정을 통해 단계별로 설정할 수 있습니다.

| 프로필        | 경계                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------- |
| `aggressive`  | 기본값. 공개된 측정 결과에서 사용한 정책 — 시스템, 도구 문서 및 밀도 높은 기록을 이미지화함 |
| `balanced`    | 활성 상태를 네이티브로 유지하고, 최근 8개 턴을 보호하며, 이전에 종료된 기록을 축약함        |
| `coding-safe` | 권한, 도구 스키마 및 활성 도구 출력을 네이티브로 유지하고, 최근 12개 턴을 보호함            |
| `passthrough` | 변환하지 않고 라우팅하며, 엔진을 건너뜀                                                     |

프로필은 **하한이 아니라 상한**입니다. 패키지의 `mergeCompressionProfileOptions`는 호출자의 재정의로
프로필이 닫은 손실 허용 경로를 다시 열 수 없도록 하므로, 단계별 `preserveSystemPrompt: false`로는
`coding-safe`에서 시스템 압축을 다시 활성화할 수 없습니다.

이 코드베이스에서 측정한 결과, `coding-safe`와 `balanced`는 `minCompressChars`를 최댓값으로 높이고
시스템, 도구 스키마 및 도구 결과를 네이티브로 유지합니다. 따라서 아직 기록이 누적되지 않은 세션은
`below_min_chars`에서 중단되며 엔진은 아무것도 변환하지 않습니다. 가장 안전한 프로필 대신
`aggressive`가 기본값인 이유가 바로 이것입니다.

패키지는 환경 설정에서 자체 모델 범위와 프로필을 결정합니다.
OmniRoute는 이 결정을 절대로 위임하지 않습니다. 어댑터가 모델 게이트를 패키지의 가장 제한적인 범위로
고정하므로, 호스트 환경 설정은 허용 목록을 좁힐 수만 있고 OmniRoute의 측정 결과를 넘어 넓힐 수는 없습니다.

## 엔진 레지스트리

레지스트리는 `open-sse/services/compression/engines/registry.ts`에 있습니다. 엔진은 다음과 같은 공통
계약을 제공합니다.

- `id`: `caveman` 또는 `rtk`와 같은 안정적인 엔진 ID
- `apply(text, config)`: 스택형 파이프라인에서 사용하는 레거시 실행 경로
- `compress(input, config)`: 텍스트 + 통계를 반환하는 기본 실행 경로
- `getConfigSchema()`: 유효한 설정의 JSON-Schema 유사 구조를 반환
- `validateConfig(config)`: `{ valid, errors[] }`를 반환

등록에는 `registerCompressionEngine(engine)`(고급 사용 사례의 경우 `registerEngine`)을 사용하며,
이 함수는 엔진을 수락하기 전에 `assertValidEngine()`과 `validateConfig(defaultConfig)`를 호출합니다.
런타임에 엔진을 제거하려면 `unregisterCompressionEngine(id)`를 사용하세요.

`strategySelector.ts`는 압축이 실행되기 전에 기본 제공 엔진을 등록합니다. 이를 통해 미리보기,
런타임 압축, 스택형 모드, 테스트 및 향후 엔진이 동일한 실행 경로를 사용할 수 있습니다.

### MCP 설명 압축(관련 항목)

별도의 레지스트리가 레지스트리 수준에서 MCP 도구 설명 메타데이터를 압축합니다. 자세한 내용은
`open-sse/mcp-server/descriptionCompressor.ts` 및 [MCP-SERVER.md](../frameworks/MCP-SERVER.md)를 참조하세요. 이 레지스트리는
Caveman 규칙을 재사용하지만 요청 페이로드가 아닌 도구 메타데이터를 대상으로 작동합니다.

### 추가 기본 제공 엔진

Caveman, RTK 및 LLMLingua-2 외에도 레지스트리는 여러 특수 무손실 /
구조적 엔진을 제공합니다(스택형 파이프라인, 플레이그라운드 및 테스트에서 사용).

| 엔진          | ID              | 기능                                                                                                                                                           |
| ------------- | --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| CCR           | `ccr`           | Content-Compress-Retrieve(H4): 연속된 대용량 텍스트 블록을 콘텐츠 주소 기반 참조로 대체하여, 반복되거나 큰 블록을 한 번만 전송하고 이후에는 참조하도록 합니다. |
| headroom      | `headroom`      | SmartCrusher(H3 + N5): 동종 JSON 배열 페이로드를 열 기반 `[N rows]` 형식으로 무손실 표 압축합니다.                                                             |
| ionizer       | `ionizer`       | 매우 큰 동종 블록의 처음/중간/마지막 행을 샘플링하고, 생략된 중간 부분을 CCR 콘텐츠 주소 기반 참조로 저장합니다.                                               |
| session-dedup | `session-dedup` | 콘텐츠 주소 기반 턴 간 중복 제거(TokenMizer에서 영감 받음): 동일한 세션의 이전 턴에서 이미 나타난 텍스트를 생략합니다.                                         |

**CCR 검색 프로토콜 지침(#8033):** CCR이 요청에서 처음으로 1개 이상의 블록을 대체하면,
엔진은 마커 → 도구 계약을 호출자에게 알려 주는 단일 멱등성 `system` 메시지
(`[CCR protocol]` 센티널로 시작)를 앞에 추가합니다. 이 메시지는
`[CCR retrieve hash=<24hex> chars=N]` 마커의 의미, 해시를 그대로 복사해야 한다는 점
(16진수 24자 전체 — 해시를 잘못 복사하는 것이 "block not found" 오류의 주요 원인),
그리고 `[dedup:ref sha=...]` 마커는 "도구를 호출하라"가 아니라 "기록을 되돌아보라"는
의미임을 설명합니다. 이 안내는 호출자가 제공한다고 명시한 `tools[]`를 통해
실제로 `omniroute_ccr_retrieve`에 접근할 수 있음이 입증된 경우에만 삽입됩니다
(`open-sse/services/compression/engines/ccr/protocolInstruction.ts`의
`callerSupportsCcrRetrieve()`). 해당 도구가 없는 일반 OpenAI 호환 호출자에게는
접근할 수 없는 대상을 호출하라는 지침이 전달되지 않습니다. 삽입 전에 메시지 기록에서
센티널을 검색하여 멱등성을 보장하므로, 이전 메시지를 다시 보내는 멀티턴 요청에서도
턴마다 안내가 중복으로 쌓이지 않습니다.

## Caveman

Caveman 모드는 일반 산문의 의미론적 압축에 중점을 둡니다:

- 코드 블록, URL, JSON, 경로 및 구조화된 데이터를 보존합니다
- 군더더기, 유보적 표현, 반복되는 맥락 및 장황한 연결 표현을 제거합니다
- `open-sse/services/compression/rules/`에서 언어별 파일 규칙 팩을 지원합니다
- 레거시 `standard`, `aggressive`, `ultra` 모드에서도 계속 사용할 수 있습니다

대시보드 경로는 `Dashboard -> Context & Cache -> Caveman`입니다.

Caveman 업스트림은 출력 토큰이 `~75%` 감소하고, 벤치마크에서 평균 출력 절감률이
`65%`이며 범위는 `22-87%`라고 보고합니다. 또한 입력 압축 도구의 절감률은 `~46%`입니다.
OmniRoute는 중첩된 프롬프트/컨텍스트 절감 효과를 문서화할 때 Caveman의 입력 측 수치를
사용합니다. Caveman 출력 모드는 별도의 응답 동작 기능으로 유지됩니다.

## RTK

RTK 모드는 명령 및 도구 출력에 중점을 둡니다:

- `git status`, `git branch`, `git diff`, Vitest/Jest/Pytest, Cargo/Go 테스트,
  TypeScript/Vite/Webpack 빌드, ESLint, npm 감사/설치, Docker 로그, 셸
  `find`/`grep`, 스택 추적 및 일반 로그와 같은 출력 클래스를 감지합니다
- `open-sse/services/compression/engines/rtk/filters/`의 49개 JSON 필터를 적용합니다
- ANSI 제거, 치환, 출력 일치 시 단락 평가, 줄 제거/유지, 줄별 잘라내기,
  머리/꼬리/최대 줄 수 잘라내기 및 비어 있을 때의 폴백으로 구성된 RTK 스타일 선언적 파이프라인을 지원합니다
- `.rtk/filters.json`의 신뢰 기반 프로젝트 필터와
  `DATA_DIR/rtk/filters.json`의 전역 필터를 지원합니다
- ANSI 시퀀스, 진행 상태 노이즈, 반복된 줄 및 불필요한 상용구를 제거합니다
- 조치 가능한 실패, 경고, 요약, 변경된 파일 및 마지막 부분의 맥락을 보존합니다
- 인증된 관리 경로를 통한 복구/디버깅을 위해 수정 처리된 원시 출력을 선택적으로 보존할 수 있습니다

대시보드 경로는 `Dashboard -> Context & Cache -> RTK`입니다.

사용자 정의 필터, 신뢰, 검증 및 원시 출력 복구에 관한 운영 세부 정보는
[`RTK_COMPRESSION.md`](./RTK_COMPRESSION.md)에 있습니다.

RTK 업스트림은 명령 출력 압축에서 `60-90%`의 절감률을 보고합니다. README 예시에서는
30분간의 Claude Code 세션이 `~118,000`개 토큰에서 `~23,900`개로 감소하여 `79.7%`가 절감됩니다.

## LLMLingua-2 (의미론적 가지치기)

LLMLingua-2 모드는 소형 ONNX 토큰 분류기를 사용하여 산문에 **의미론적 토큰 가지치기**를
수행하며, 규칙 기반 Caveman 및 RTK 엔진을 보완합니다:

- 시스템 메시지가 아닌 메시지의 산문만 압축하며, 펜스 코드 블록 및 기타 보존 대상
  구조는 절대 변경하지 않습니다
- 워커 스레드에서 `@atjsh/llmlingua-2` 백엔드(`@huggingface/transformers`를 통한 ONNX)를
  실행하므로 모델 추론이 요청 이벤트 루프를 차단하지 않습니다
- **중첩할 수 있습니다**(`stackPriority` 35). 중첩된 파이프라인에서는 구조적 엔진
  (CCR, session-dedup, headroom, Caveman) 다음, `ultra` 이전에 실행됩니다. 의미론적
  가지치기는 이미 구조적으로 압축된 텍스트에 가장 효과적이기 때문입니다. 예:
  `rtk -> caveman -> llmlingua`
- **어떤 오류가 발생해도 열린 상태로 실패 처리합니다**(선택적 의존성 누락, 워커 생성,
  모델 로드, 추론 또는 시간 초과) → 오류 대신 원본 텍스트를 변경 없이 반환합니다

엔진 위치: `open-sse/services/compression/engines/llmlingua/`. 대시보드 경로는
`Dashboard -> Context & Cache -> LLMLingua`입니다.

### 모델

기본 모델은 빠른 **TinyBERT**(`atjsh/llmlingua-2-js-tinybert-meetingbank`, 약 57 MB)입니다.
정확도가 더 높은 **BERT-base** 모델(`Arcoldd/llmlingua4j-bert-base-onnx`, 약 710 MB)은
엔진 구성의 `model` 필드를 통해 사용할 수 있습니다. `@huggingface/transformers`는 첫
호출 시 선택된 모델을 HuggingFace Hub에서 `${DATA_DIR}/models/llmlingua`로 지연
다운로드합니다(`modelStore.ts`). 대신 `modelPath` 구성 재정의를 사용하면 로컬 사본을
지정할 수 있습니다(오프라인/에어갭 설치).

### 선택적 의존성 및 온디맨드 설치

가지치기 가능한 LLMLingua 런타임 피어 스택은 **선택 사항**입니다. 두 패키지가
`package.json`에서 `optionalDependencies`로 선언되어 있으며, 프로덕션 빌드에서는
**외부 항목**으로 유지됩니다(`scripts/build/prepublish.ts`가 번들에 포함하지 않음):

| 패키지               | 버전(고정) | 참고                                          |
| -------------------- | ---------- | --------------------------------------------- |
| `@atjsh/llmlingua-2` | `2.0.5`    | 진입점 패키지이며, 나머지를 피어로 선언합니다 |
| `js-tiktoken`        | `^1.0.20`  | 토크나이저                                    |

`@huggingface/transformers`는 `^4.2.0`으로 고정되어 있습니다(로컬 임베딩 경로와 공유되며
독립 실행형 번들에도 추적 포함됨). `@atjsh/llmlingua-2@2.0.5`는 이를
`"^3.5.2 || ^4.0.0"` 범위의 피어로 사용하므로 Transformers.js v3와 v4가 모두 지원됩니다.
2.0.4부터 `@atjsh/llmlingua-2`는 더 이상 `@tensorflow/tfjs`를 요구하지 않으며, 이에 따라
SLM 스택의 가장 큰 단일 구성 요소였던 TensorFlow.js가 제거되었습니다. 위 두 패키지만
가지치기 가능한 SLM 피어입니다. 표준 `npm install`(개발)은 선택적 의존성을 생략하지 않는
한 선택적 스택을 자동으로 설치합니다.

**온디맨드 방식의 이유:** npm에 게시된 패키지, 독립 실행형 번들 및 Docker 이미지는
크기를 작게 유지하기 위해 이러한 의존성을 **포함하지 않고** 배포됩니다. 의존성이 없으면
워커의 의존성 게이트(`worker.ts`의 `@atjsh/llmlingua-2` 해석 검사)가 실패하고 엔진은
**조용히 열린 상태로 실패 처리됩니다**. 즉, LLMLingua를 선택해도 아무 작업도 수행하지
않으며 텍스트가 변경 없이 반환되고 오류도 기록되지 않습니다. 가지치기된 환경에서
활성화하려면 선택적 스택을 설치하십시오:

```bash
# package.json optionalDependencies에 선언된 버전으로 고정
npm install @atjsh/llmlingua-2@2.0.5 js-tiktoken
```

`@tensorflow/tfjs` 제거(2.0.4+)로 이전에 대부분을 차지하던 약 800 MB의 구성 요소가
사라졌습니다. 남은 용량은 transformers.js 및 onnxruntime-node 런타임과 최초 사용 시
다운로드되는 TinyBERT 모델(약 57 MB, npm을 통해 받지 않음)입니다.

환경별:

- **개발 / `npm install`** — `--omit=optional`(또는 `--no-optional`)을 전달하지 않았다면 자동으로 설치됩니다. 별도의 조치는 필요하지 않습니다.
- **전역 npm (`npm i -g omniroute`) / 독립 실행형** — 설치된 패키지 디렉터리에서 위의 설치 명령을 실행하거나, 선택적 의존성을 생략하지 않고 다시 설치하세요.
- **Docker** — 파생 이미지 레이어에 설치 명령을 추가하세요. 배포된 이미지는 의도적으로 경량화되어 있습니다.
- **VPS (PM2)** — 앱의 `node_modules`에 설치한 다음, 워커가 게이트를 다시 탐지하도록 프로세스를 재시작하세요.
- **원시 Next 독립 실행형 (`npm run build` → `.build/next/standalone/server.js`)** — 독립 실행형 추적 결과에는 워커와 선택적 의존성이 모두 포함되지 않으므로, 엔진이 별다른 알림 없이 페일 오픈됩니다. `scripts/build/colocate-standalone.mjs`는 두 요소(워커 esbuild + 독립 실행형 트리에 대한 선택적 의존성 클로저)를 모두 다시 적용하며, 매 빌드 후 `postbuild` npm 훅을 통해 자동으로 실행됩니다. 멱등성을 가지며, 의존성이 없을 때도 오류 없이 정상적으로 넘어갑니다.

**활성화 여부 확인:** LLMLingua를 선택했을 때 실제 일반 텍스트의 크기가 줄어들면(엔진이 더 이상 페일 오픈되지 않으면) 활성화된 것이며, 첫 번째 요청 시 모델이 `${DATA_DIR}/models/llmlingua`에 다운로드됩니다. 게이트는 의도적으로 `@atjsh/llmlingua-2`만 탐지합니다. 다른 피어 패키지는 ESM 전용이므로 설치되어 있어도 `require.resolve`에서 예외가 발생하기 때문입니다. 따라서 `import()` 시점에 피어 패키지 중 하나라도 실제로 누락되어 있으면 워커는 계속 페일 오픈됩니다.

## 스택형 파이프라인

스택형 모드는 파이프라인 단계를 순서대로 실행합니다. 기본값은 다음과 같습니다.

```txt
rtk -> caveman
```

프롬프트에 명령 출력과 사람 또는 어시스턴트의 자연어가 함께 포함된 코딩 에이전트 세션에 사용합니다. RTK가 먼저 불필요하게 많은 도구 로그를 줄인 다음, Caveman이 남은 자연어를 압축합니다.

파이프라인 단계는 압축 설정의 `stackedPipeline` 또는 압축 조합을 통해 구성합니다.

두 엔진이 동일한 압축 대상 페이로드를 줄이면 절감 효과가 누적됩니다.

```txt
combined = 1 - (1 - RTK savings) * (1 - Caveman input savings)
average  = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
range    = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## MCP 접근성 트리 필터

MCP 접근성 트리 스마트 필터는 프롬프트나 컨텍스트가 아닌 MCP **도구 결과**에 적용되는 실행 후 압축 계층입니다. Playwright, computer-use 및 브라우저 자동화 MCP 서버와 같은 도구가 반환하는 장황한 접근성 트리 및 브라우저 스냅샷 페이로드를 대상으로 합니다.

### 수행 작업

1. **노이즈 제거** — 비어 있는 일반/텍스트 항목(`- generic:`, `- text: ""`)을 제거합니다.
2. **형제 항목 축약** — 구조적으로 반복되는 줄이 `collapseThreshold`개 이상(기본값 30) 연속되면 첫 `collapseKeepHead`개(기본값 10) 줄 + 개수 요약 + 마지막 `collapseKeepTail`개(기본값 5) 줄로 축약합니다.
3. **참조 보존** — Playwright/computer-use에 필요한 `[ref=eXX]` 앵커는 절대 변경하지 않습니다.
4. **강제 잘라내기** — 축약 후에도 텍스트가 `maxTextChars`(기본값 50,000)를 초과하면 에이전트가 작업을 계속할 수 있도록 탐색 힌트와 함께 잘라냅니다.

### 엔진 위치

```txt
open-sse/services/compression/engines/mcpAccessibility/
  index.ts            ← smartFilterText() 진입점
  collapseRepeated.ts ← 형제 항목 축약 알고리즘
  constants.ts        ← DEFAULT_MCP_ACCESSIBILITY_CONFIG
```

### 구성

전역 설정의 `compression.mcpAccessibility`로 제어합니다(마이그레이션 056). 기본 구성은 다음과 같습니다.

```json
{
  "enabled": true,
  "maxTextChars": 50000,
  "collapseThreshold": 30,
  "collapseKeepHead": 10,
  "collapseKeepTail": 5,
  "minLengthToProcess": 2000
}
```

이 필터는 `type`이 `"text"`이고 길이가 `minLengthToProcess`를 초과하는 도구 결과 페이로드에만 적용됩니다. 프롬프트 압축이나 요청 페이로드에는 영향을 주지 않습니다.

### 예상 절감률

페이지 복잡도에 따라 브라우저 스냅샷 도구 결과의 60~80%를 절감합니다. 축약 알고리즘의 시간 복잡도는 줄 수를 기준으로 O(n)이며 추가 지연 시간은 무시할 수 있는 수준입니다.

### 이 필터와 위 압축 엔진의 비교

| 측면      | Caveman / RTK / 스택형   | MCP 접근성 필터                        |
| --------- | ------------------------ | -------------------------------------- |
| 대상      | 요청 프롬프트 / 컨텍스트 | MCP 도구 결과                          |
| 실행 조건 | 압축 모드 설정           | `compression.mcpAccessibility.enabled` |
| 범위      | 모든 SSE 메시지          | 도구 결과만                            |
| 참조 앵커 | 해당 없음                | 항상 보존                              |

---

## 압축 콤보

압축 콤보는 라우팅 콤보에 할당할 수 있는 이름 있는 압축 프로필입니다.

- `compression_combos`: 모드, 파이프라인, RTK 구성, 언어 구성 및 기본값 표시를 저장합니다
- `compression_combo_assignments`: 압축 콤보를 라우팅 콤보에 매핑합니다
- 런타임 통합은 일반 콤보 재정의보다 먼저 할당된 압축 콤보를 확인합니다
- 분석에는 `compression_combo_id` 및 `engine`이 포함됩니다

대시보드 위치: `Dashboard -> Context & Cache -> Compression Combos`.

## API 인터페이스

| 경로                                   | 용도                                         |
| -------------------------------------- | -------------------------------------------- |
| `/api/settings/compression`            | 전역 압축 설정(`mcpAccessibility` 구성 포함) |
| `/api/compression/preview`             | 모든 압축 모드 미리 보기                     |
| `/api/compression/language-packs`      | 사용 가능한 Caveman 언어 팩 목록 조회        |
| `/api/context/caveman/config`          | Caveman 설정 별칭                            |
| `/api/context/rtk/config`              | RTK 기본값 및 설정                           |
| `/api/context/rtk/filters`             | RTK 필터 카탈로그                            |
| `/api/context/rtk/test`                | RTK 미리 보기/테스트 엔드포인트              |
| `/api/context/rtk/raw-output/[id]`     | 인증된 민감 정보 제거 원시 출력 복구         |
| `/api/context/combos`                  | 압축 콤보 CRUD                               |
| `/api/context/combos/[id]/assignments` | 라우팅 콤보 할당 CRUD                        |
| `/api/context/analytics`               | 압축 분석 별칭                               |

관리 경로에는 관리 인증 또는 API 키 정책 검사가 필요합니다.

## MCP 도구

압축 기능은 5개의 MCP 도구를 제공합니다.

| 도구                                | 범위                | 용도                           |
| ----------------------------------- | ------------------- | ------------------------------ |
| `omniroute_compression_status`      | `read:compression`  | 설정, 분석, 캐시 통계          |
| `omniroute_compression_configure`   | `write:compression` | 전역 설정 업데이트             |
| `omniroute_set_compression_engine`  | `write:compression` | 모드 및 선택적 파이프라인 설정 |
| `omniroute_list_compression_combos` | `read:compression`  | 압축 콤보 목록 조회            |
| `omniroute_compression_combo_stats` | `read:compression`  | 콤보/엔진 분석 조회            |

## 범위 및 제외 사항

**임베딩은 절대 압축되지 않습니다.** `open-sse/handlers/embeddings.ts`는 어떠한
압축 엔진도 호출하지 않으며, 요청/응답 본문은 변경 없이 실행기로 곧바로 전달됩니다.
현재 이는 런타임 검사가 아니라 구조적인 특성입니다(임베딩과 채팅 완성은 서로 분리된
핸들러임). 따라서 #8034의 벡터 왜곡 우려는 임베딩 경로에서 발생할 여지가 없습니다.

**모델별/엔드포인트별 제외 필터(#8034).** 채팅 완성의 경우 운영자는 절대 압축하면
안 되는 모델 ID / `provider/model` 대상을 지정할 수 있습니다. 이는 향후 압축 기능이
임베딩 인접 경로에 더 가깝게 연결될 경우 유용한 안전장치이며, 정확한 바이트 단위의
프롬프트가 중요한 모든 모델(결정론적 평가, 캐시에 민감한 접두사 등)에도 일반적으로
유용합니다.

- 설정 필드: 전역 압축 구성의 `exclusions?: string[]`
  (`GET`/`PUT /api/settings/compression`). 기존 `key_value` 압축 네임스페이스
  (`src/lib/db/compression.ts`)를 통해 영속화되며 새 테이블은 필요하지 않습니다.
- 대시보드 탭: **Dashboard → Compression → Exclusions**
  (`/dashboard/compression/exclusions`).
- 패턴 구문: `*`가 유일한 와일드카드입니다. 패턴의 다른 모든 정규식 메타 문자는
  매칭 전에 이스케이프되므로 `gpt-5.6`은 리터럴 문자열에만 일치하며 `gpt-5x6`에는
  절대 일치하지 않습니다(ReDoS에 안전하고 범위가 제한되며 중첩 수량자가 없음).
  패턴은 대소문자를 구분하지 않고 모델 ID 자체와 `provider/model` 조합 모두에
  매칭됩니다. `gpt-5-6`, `openai/gpt-5-6`, `openai/*`가 모두 동작하며 `*`만
  지정하면 모든 모델이 제외됩니다.
- 매칭: `open-sse/services/compression/exclusions.ts`의
  `isCompressionExcluded()` / `normalizeCompressionExclusions()`. `chatCore.ts`는
  압축 설정을 확인한 직후, **어떠한 엔진도 실행되기 전에** 제외 대상을 검사하며,
  일치 항목을 전역적으로 압축이 비활성화된 경우와 정확히 동일하게 처리합니다.
  따라서 요청 본문은 바이트 단위로 동일함이 보장됩니다. 건너뛰기는 분석 가시성을
  위해 `writeCompressionSkip(..., "excluded")`를 통해 기록됩니다.
- 기본값(목록이 비어 있거나 없음): #8034 이전 동작과 동일하게 아무것도 제외되지
  않습니다.

## 알려진 제한 사항

- **LLMLingua-2(SLM)에는 동일 위치에 배치된 선택적 종속성이 필요합니다.** 워커는
  `@atjsh/llmlingua-2`와 피어 종속성이 `dist/node_modules`에 함께 배치된 경우에만
  프로덕션 빌드에서 실행됩니다(`scripts/build/colocateOptionals.mjs`, #4286 참조).
  이러한 종속성이 없으면 엔진은 장애 허용 방식으로 동작하여 원본 텍스트를 반환합니다.
  워커 확인은 더 이상 `import.meta.url`에 의존하지 않습니다(독립 실행형 번들에서는
  작동하지 않음). 대신 런타임 cwd / `argv[1]`을 기준으로 삼습니다.
- **Caveman 언어 팩 `de` / `fr` / `ja`는 일부만 제공됩니다.** 이러한 팩에는
  `context` + `filler` + `structural` 규칙이 포함되어 있지만 `dedup` / `ultra` 팩은
  없으므로, 해당 언어에서 `ultra` 강도는 `full`보다 강하지 않습니다(자체 규칙만
  사용하며, 외국어 텍스트를 훼손할 수 있는 영어 `dedup`/`ultra` 규칙으로 암묵적으로
  폴백하지 않음). `en` / `es` / `id` / `pt-BR`은 완전하게 제공됩니다. 일부만 제공되는
  팩에 대한 `dedup.json` + `ultra.json` 기여를 환영합니다.
- **스택형 원격 분석에는 압축을 수행한 엔진만 나열됩니다.** 엔진이 실행되었지만
  절감률이 0%인 스택형 파이프라인 단계는 `stats:null`을 반환하므로
  `engineBreakdown`에 나타나지 않습니다. 따라서 건너뛴 단계와 구분할 수 없습니다.
  "실행됨, 0%"과 "건너뜀"을 구분하려면 분석 모델을 변경해야 하므로 추후로
  연기되었습니다.

## 검증

이 영역에 중점을 둔 검증 게이트는 다음과 같습니다.

```bash
node --import tsx/esm --test tests/unit/compression/rtk-*.test.ts tests/unit/compression/pipeline-integration.test.ts tests/unit/compression/context-compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/*.test.ts tests/golden-set/*.test.ts tests/integration/compression-pipeline.test.ts tests/unit/api/compression/compression-api.test.ts
node --import tsx/esm --test tests/unit/compression/mcpAccessibility*.test.ts
npm run typecheck:core
```
