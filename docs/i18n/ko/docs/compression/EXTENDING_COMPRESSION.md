# Extending the Compression Pipeline (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/EXTENDING_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/EXTENDING_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/EXTENDING_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/EXTENDING_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/EXTENDING_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/EXTENDING_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/EXTENDING_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/EXTENDING_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/EXTENDING_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/EXTENDING_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/EXTENDING_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/EXTENDING_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/EXTENDING_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/EXTENDING_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/EXTENDING_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/EXTENDING_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/EXTENDING_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/EXTENDING_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/EXTENDING_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/EXTENDING_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/EXTENDING_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/EXTENDING_COMPRESSION.md)

---

> **요약**: OmniRoute의 압축 엔진은 **플러그인 방식**입니다. 사용자 지정 엔진을 등록하고, 새로운 언어를 위한 언어 팩을 배포하며, 스택형 파이프라인을 구성할 수 있습니다. 이 가이드에서는 그 방법을 설명합니다.

**관련 가이드:**

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — 전체 파이프라인 개요
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — 엔진 레지스트리 및 기본 제공 엔진
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK 엔진 및 사용자 지정 필터
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — 규칙 팩 형식 참조

---

## 개요

압축 시스템에는 **3개의 확장 지점**이 있습니다:

| 확장 지점             | 사용 사례                                             | 난이도 |
| --------------------- | ----------------------------------------------------- | ------ |
| **사용자 지정 엔진**  | 완전히 새로운 압축 알고리즘 추가(예: 도메인별 요약기) | 고급   |
| **언어 팩**           | 새로운 자연어 지원 추가(예: 힌디어, 아랍어)           | 중급   |
| **스택형 파이프라인** | 기존 엔진을 사용자 지정 순서로 구성                   | 초급   |

```
┌─────────────────────────────────────────────────────────────┐
│                       압축 전략                              │
│                                                              │
│   입력 메시지 ──▶ getEffectiveMode() ──▶ 모드               │
│                                              │               │
│                      ┌───────────────────────┼──────────┐    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   "rtk"    "lite"   "standard" "stacked"    │
│                      │         │         │         │    │    │
│                      ▼         ▼         ▼         ▼    │    │
│                   RTK       Lite     Caveman   engines[]   │
│                   엔진      엔진      엔진      체인 연결  │
│                      │         │         │         │    │    │
│                      └─────────┴─────────┴─────────┘    │    │
│                                      │                    │
│                                      ▼                    │
│                               압축된 출력                  │
└─────────────────────────────────────────────────────────────┘

전략 선택기는 모드 기반입니다. 각 요청은 하나의 모드를 선택합니다
(rtk / lite / standard / aggressive / ultra / stacked / off).
"stacked" 모드만 여러 엔진을 순차적으로 연결합니다.
기본 자동 트리거 모드는 "lite"입니다(3단계 우선순위 체인이 아님).
```

---

## 사용자 지정 압축 엔진 작성하기

엔진 인터페이스(`open-sse/services/compression/engines/types.ts`)는 모든 엔진이 충족해야 하는 계약입니다. 이 인터페이스에는 5개의 필수 메서드가 있습니다.

### `CompressionEngine` 인터페이스

```ts
interface CompressionEngine {
  id: string; // 고유한 엔진 ID
  name: string; // 표시 이름
  description: string; // 간략한 설명
  icon: string; // 아이콘(이모지 또는 URL)
  targets: CompressionEngineTarget[]; // ["messages", "tool_results", "code_blocks"]
  stackable: boolean; // 스택형 파이프라인에서 사용할 수 있는지 여부
  stackPriority: number; // 스택형 파이프라인에서의 순서(값이 낮을수록 먼저 실행)
  metadata: CompressionEngineMetadata;

  apply(body, options?): CompressionResult;
  compress(body, config?): CompressionResult;
  getConfigSchema(): EngineConfigField[];
  validateConfig(config): EngineValidationResult;
}
```

### 최소 예제: 공백 엔진

가능한 가장 간단한 엔진으로, 메시지에서 불필요한 공백을 제거합니다.

````ts
import type { CompressionEngine } from "omniroute/compression/engines/types";
import { registerCompressionEngine } from "omniroute/compression/engines/registry";

function preserveCodeBlocks(text: string): string {
  // 코드 블록 마커를 기준으로 분할하고 그 안의 공백을 보존
  const parts = text.split(/(```[\s\S]*?```)/);
  return parts
    .map((part) => {
      if (part.startsWith("```")) {
        return part; // 코드 블록은 수정하지 않음
      }
      return part.replace(/\n{3,}/g, "\n\n"); // 일반 텍스트에만 적용
    })
    .join("");
}

const whitespaceEngine: CompressionEngine = {
  id: "whitespace",
  name: "Whitespace Stripper",
  description: "Removes extra whitespace and blank lines",
  icon: "📝",
  targets: ["messages", "tool_results"],
  stackable: true,
  stackPriority: 100, // caveman/rtk 이후에 실행

  metadata: {
    id: "whitespace",
    name: "Whitespace Stripper",
    description: "Removes extra whitespace and blank lines",
    inputScope: "messages",
    targetLatencyMs: 5,
    supportsPreview: true,
    stable: true,
  },

  apply(body, options) {
    return this.compress(body, options?.config);
  },

  compress(body, config = {}) {
    let originalLength = 0;
    let compressedLength = 0;

    // 메시지 배열 순회 — 문자열 및 멀티파트 콘텐츠 모두 처리
    const compressedBody = (body.messages || []).map((msg) => {
      if (typeof msg.content === "string") {
        originalLength += msg.content.length;
        let compressed = msg.content
          .replace(/[ \t]+/g, " ")
          .replace(/\n{3,}/g, "\n\n")
          .replace(/^\s+|\s+$/gm, "");
        compressedLength += compressed.length;
        return { ...msg, content: compressed };
      }
      // 멀티파트 콘텐츠: 각 파트를 순회하며 텍스트 파트만 압축
      if (Array.isArray(msg.content)) {
        const newParts = msg.content.map((part) => {
          if (part.type === "text" && typeof part.text === "string") {
            originalLength += part.text.length;
            let compressed = part.text
              .replace(/[ \t]+/g, " ")
              .replace(/\n{3,}/g, "\n\n")
              .replace(/^\s+|\s+$/gm, "");
            compressedLength += compressed.length;
            return { ...part, text: compressed };
          }
          return part; // image_url, tool_use 등은 보존
        });
        return { ...msg, content: newParts };
      }
      return msg;
    });

    return {
      body: { ...body, messages: compressedBody },
      stats: {
        originalTokens: Math.ceil(originalLength / 4),
        compressedTokens: Math.ceil(compressedLength / 4),
        savingsPercent: originalLength > 0 ? 100 * (1 - compressedLength / originalLength) : 0,
        techniques: ["whitespace-collapse"],
        engineId: "whitespace",
      },
    };
  },

  getConfigSchema() {
    return [
      {
        key: "preserveCodeBlocks",
        type: "boolean",
        label: "Preserve code blocks",
        defaultValue: true,
        description: "Don't touch whitespace inside ```code``` blocks",
      },
    ];
  },

  validateConfig(config) {
    if (config.preserveCodeBlocks !== undefined && typeof config.preserveCodeBlocks !== "boolean") {
      return { valid: false, errors: ["preserveCodeBlocks must be a boolean"] };
    }
    return { valid: true, errors: [] };
  },
};

// 전역으로 등록
registerCompressionEngine(whitespaceEngine);
````

### 사용자 정의 엔진을 배치할 위치

```
~/.omniroute/compression/engines/my-engine.ts    # 사용자 수준
<project>/compression-engines/my-engine.ts        # 프로젝트 수준(시작 시 로드됨)
```

또는 플러그인에서 프로그래밍 방식으로 로드합니다.

```ts
// 플러그인 내부
import {
  registerCompressionEngine,
  unregisterCompressionEngine,
} from "@omniroute/open-sse/services/compression/engines/registry";
import { myEngine } from "./engines/my-engine";

export default definePlugin({
  name: "my-compression-plugin",
  // 플러그인 SDK는 onRequest / onResponse / onError 훅을 제공합니다. 플러그인
  // 모듈이 로드될 때(또는 첫 번째 onRequest에서) 엔진을 등록하고, 자체 종료
  // 경로에서 등록을 해제합니다.
  onRequest: async (ctx) => {
    registerCompressionEngine(myEngine);
  },
});

// 종료 시:
// unregisterCompressionEngine("my-engine");
```

### 엔진 테스트하기

플러그인 또는 시작 함수에서 엔진을 등록합니다. 등록이 완료되면 전략 선택기에서 해당 엔진의 `id`를 통해 사용할 수 있습니다. 스택 파이프라인에 엔진을 구성하여 통합을 테스트합니다.

---

## 언어 팩 만들기

Caveman 스타일 압축은 각 자연어의 군더더기 표현, 완곡한 표현, 장황한 패턴을 처리하기 위해 **언어별 규칙 팩**을 사용합니다. OmniRoute에는 `en`, `es`, `fr`, `de`, `ja`, `pt-BR`의 **6개 언어 팩**이 포함되어 있습니다.

### 팩 구조

언어 팩은 `open-sse/services/compression/rules/<language>/` 아래에 있는 **JSON 파일** 디렉터리입니다.

```
open-sse/services/compression/rules/
├── en/
│   ├── filler.json          # 인사말, 완곡한 표현, 정중한 표현
│   ├── context.json         # 컨텍스트 축소 규칙
│   ├── dedup.json           # 중복 제거 규칙
│   ├── structural.json      # 구두점, 서식
│   └── ultra.json           # 공격적인 압축 규칙
├── es/  (동일한 구조)
├── fr/  (동일한 구조)
├── de/  (동일한 구조)
├── ja/  (동일한 구조)
└── pt-BR/ (동일한 구조)
```

### 규칙 구성

각 규칙은 다음과 같은 형태입니다(`open-sse/services/compression/ruleLoader.ts` 참조).

```ts
interface FileRule {
  name: string; // 사람이 읽을 수 있는 이름(kebab-case)
  pattern: string; // JavaScript 정규식 패턴
  replacement?: string; // 일치 항목을 대체할 내용
  replacementMap?: Record<string, string>; // 또는 키→대체 문자열 맵
  flags?: string; // 정규식 플래그(일반적으로 "gi")
  context?: "all" | "user" | "system" | "assistant";
  category?: "filler" | "context" | "structural" | "dedup" | "terse" | "ultra";
  minIntensity?: "lite" | "full" | "ultra"; // 이 강도보다 낮으면 건너뜀
  description?: string; // 문서
}
```

### 예시: 힌디어 군더더기 표현 규칙 추가하기

```json
{
  "language": "hi",
  "category": "filler",
  "rules": [
    {
      "name": "polite_opener",
      "pattern": "\\b(?:नमस्ते|नमस्कार|आदरणीय)\\b[,!\\s]*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip polite openers like 'नमस्ते'"
    },
    {
      "name": "filler_actually",
      "pattern": "\\b(?:असल में|वास्तव में|दरअसल)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "lite",
      "description": "Strip 'actually' fillers"
    },
    {
      "name": "verbose_plea",
      "pattern": "\\b(?:कृपया|कृपया आप|अनुरोध है कि आप)\\b\\s*",
      "replacement": "",
      "context": "all",
      "category": "filler",
      "minIntensity": "full",
      "description": "Strip 'please' in Hindi"
    }
  ]
}
```

### 유효성 검사

규칙 팩은 로드될 때 `_schema.json`을 기준으로 유효성 검사를 거칩니다. 구조가 잘못된 팩은 로드에 실패하고 오류가 기록됩니다.

```
RULE_LOADER: pack "hi/filler.json" failed validation:
  - rules.0.pattern: Invalid regex
  - rules.1.context: must be one of [all, user, system, assistant]
```

팩이 로드되면 `_schema.json`을 기준으로 유효성 검사가 자동 실행됩니다. 유효하지 않은 팩은 거부되며 위와 같은 오류가 로그에 기록됩니다. 팩 유효성 검사를 위한 별도의 `npm run` 스크립트는 없습니다. 팩을 로드하고(예: 서버를 시작하거나 압축 경로를 실행) 로그를 확인하세요.

### 사용자 정의 언어 팩 로드하기

```ts
import { loadRulePack } from "omniroute/compression/ruleLoader";

await loadRulePack("./my-custom-rules/hi/filler.json");
```

또는 인식되는 위치에 배치합니다.

```
~/.omniroute/compression/rules/hi/filler.json  # 사용자 수준
<project>/.compression/rules/hi/filler.json   # 프로젝트 수준
```

### 언어 팩 모범 사례

1. **`filler`부터 시작하세요** — 가장 영향력이 큰 규칙입니다
2. **공격적인 규칙을 제한하려면 `minIntensity`를 사용하세요** — 과도한 압축을 방지합니다
3. **테스트 사례를 포함하세요** — 동작을 검증할 수 있도록 JSON에 `tests[]` 배열을 추가합니다
4. **순서가 중요합니다** — 앞에 있는 규칙부터 적용되므로 영향력이 큰 규칙을 먼저 배치합니다
5. **`replacement`는 보수적으로 사용하세요** — 일반적으로 빈 문자열이 적절하며, 새로운 내용을 절대 추가하지 마세요

### 번역 전략

규칙 팩을 새로운 언어로 현지화할 때는 다음 사항을 따르세요.

1. **규칙 이름을 번역하세요** — 디버그 출력에 표시됩니다
2. **정규식 패턴을 조정하세요** — 직접 번역은 제대로 작동하지 않는 경우가 많습니다(단어 경계가 언어마다 다릅니다)
3. **실제 대화로 테스트하세요** — 실제 입력에 안전하게 사용할 수 있는 팩이어야 합니다
4. **문화적 관습을 반영하세요** — 예를 들어 일본어 팩에는 영어보다 경어 기반의 군더더기 표현이 더 많습니다

---

## 스택형 파이프라인

**스택형 파이프라인**은 여러 엔진을 순차적으로 실행하며, 각 엔진의 출력을 다음 엔진의 입력으로 전달합니다. 이것이 내부적으로 `mode: stacked`가 작동하는 방식입니다.

### 스택 작동 방식

```
입력(10,000 토큰)
        │
        ▼
   ┌──────────┐
   │   엔진   │  우선순위 10
   │    A     │  ──▶ 출력: 6,000 토큰(-40%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │   엔진   │  우선순위 50
   │    B     │  ──▶ 출력: 2,400 토큰(-60%)
   └────┬─────┘
        ▼
   ┌──────────┐
   │   엔진   │  우선순위 100
   │    C     │  ──▶ 출력: 1,200 토큰(-80%)
   └────┬─────┘
        │
        ▼
최종 출력(1,200 토큰, 합산 약 88% 절감)
```

`mode: "stacked"`를 선택하면 엔진은 `pipeline` 배열에 지정된 순서대로 실행됩니다.
엔진 N의 출력이 엔진 N+1의 입력이 됩니다.

### 압축 모드

OmniRoute는 구성, 자동 트리거 임계값 및 콤보 오버라이드에 따라 **요청별로 하나의 모드**를 선택합니다.
사용 가능한 모드는 `open-sse/services/compression/types.ts`에 정의되어 있습니다(`CompressionMode` 타입).

| 모드         | 엔진                   | 사용 사례                                                                                                                                                                            |
| ------------ | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `off`        | 없음                   | 모든 압축 비활성화                                                                                                                                                                   |
| `rtk`        | RTK만 사용             | 명령 출력이 많은 세션(80% 이상 절감)                                                                                                                                                 |
| `lite`       | Lite만 사용            | 보수적인 압축(빠르고 안전함)                                                                                                                                                         |
| `standard`   | Caveman                | 언어 팩을 사용한 산문 압축                                                                                                                                                           |
| `aggressive` | Caveman + Aggressive   | 공격적인 산문 압축 + 공격적인 최종 처리                                                                                                                                              |
| `ultra`      | Ultra                  | 최대 압축(손실 발생, 최후의 수단). `ultra.modelPath`가 설정된 경우 선택적으로 **LLMLingua-2** SLM 엔진을 통해 라우팅됩니다(모델을 사용할 수 없으면 규칙 기반 경로로 장애 허용 전환). |
| `stacked`    | 사용자 지정 파이프라인 | 원하는 순서로 엔진 조합(아래 참조)                                                                                                                                                   |

> 위의 모드 엔진 외에도 레지스트리는 스택할 수 있는 특수 엔진인
> **CCR**, **headroom**, **ionizer**, **session-dedup**을 함께 제공하며, 자세한 내용은
> [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md#additional-built-in-engines)에 설명되어 있습니다.

모드 선택은 `open-sse/services/compression/strategySelector.ts`의 `getEffectiveMode()`에 의해 결정됩니다.

1. 압축이 비활성화된 경우: `"off"`
2. 콤보 오버라이드가 있는 경우: 해당 오버라이드 사용
3. 자동 트리거 임계값을 초과한 경우: `autoTriggerMode` 사용(기본값: `"lite"`)
4. 그 외의 경우: `defaultMode` 사용

### 기본 스택형 파이프라인

`mode: "stacked"`가 명시적으로 구성된 경우 기본 파이프라인은 다음과 같이 조합됩니다.

1. **RTK** — 명령 출력의 노이즈 제거(터미널 출력에서 약 80% 절감)
2. **Caveman** — 군더더기 제거 및 산문 간결화(남은 텍스트에서 약 46% 절감)
3. **Lite** — 최종 공백 정리 + 중복 제거 처리

이 조합은 도구 사용이 많은 세션에서 **78~95% 절감**을 달성합니다.

### 스택형 파이프라인 구성

콤보 구성에서:

```json
{
  "compression": {
    "mode": "stacked",
    "pipeline": [
      { "engine": "rtk", "config": { "intensity": "aggressive" } },
      { "engine": "caveman", "config": { "intensity": "full" } },
      { "engine": "lite", "config": {} }
    ]
  }
}
```

엔진을 생략하거나, 사용자 지정 엔진을 추가하거나, 순서를 변경할 수 있습니다.

### 상태 전달

엔진은 요청 컨텍스트(`options` 내부)에서 메타데이터를 읽을 수 있습니다.

```ts
compress(body, config) {
  // 이전 엔진의 메타데이터 읽기
  const original = options?.compressionComboId;  // "my-coding-combo"
  // ...
}
```

메타데이터는 **읽기 전용**입니다. 엔진은 요청 컨텍스트를 변경할 수 없으며, 자체 본문 출력만 변경할 수 있습니다.

### 실행 순서의 주의점

| 엔진 순서                                     | 효과                                                                         |
| --------------------------------------------- | ---------------------------------------------------------------------------- |
| RTK → Caveman → Lite                          | **권장**(먼저 노이즈를 제거한 다음 언어를 압축하고 마지막으로 공백을 정리)   |
| Lite → RTK → Caveman                          | 나쁨 — Lite가 원시 출력에서 공백을 제거하여 RTK 패턴 매칭이 실패함           |
| Caveman → RTK                                 | 나쁨 — Caveman이 RTK가 인식하지 못하는 방식으로 텍스트를 다시 작성할 수 있음 |
| `tool_results`를 첫 번째로 처리하는 모든 순서 | 더 좋음 — 도구 출력은 노이즈가 가장 많은 콘텐츠임                            |

### 스택을 사용하면 안 되는 경우

스택이 항상 더 나은 것은 아닙니다.

- **간단한 메시지**(도구 출력 없음) — Caveman 또는 Lite 하나로 충분함
- **비용에 민감한 경우** — 각 엔진이 약 5~50ms의 지연 시간을 추가함
- **특정 도구** — 셸 출력에는 일반적으로 RTK만으로 충분함

### 사용자 지정 파이프라인 구축

명명된 파이프라인 레지스트리는 없습니다. 스택형 파이프라인은 `applyStackedCompression()`(`@omniroute/open-sse/services/compression/strategySelector`에서 내보냄)에 전달되는 **인라인 단계 배열**일 뿐입니다.

```ts
import { applyStackedCompression } from "@omniroute/open-sse/services/compression/strategySelector";

const result = applyStackedCompression(body, [
  { engine: "rtk", intensity: "aggressive" },
  { engine: "caveman", intensity: "full" },
]);
```

파이프라인을 전달하지 않으면 기본값으로 `rtk(standard) → caveman(full)`이 사용됩니다.

구성에서 이를 제어하려면 `mode: "stacked"`를 설정하고 단계 배열을 `stackedPipeline` 아래에 제공하세요(`config.stackedPipeline`에서 읽음).

```json
{
  "compression": {
    "mode": "stacked",
    "stackedPipeline": [
      { "engine": "rtk", "intensity": "aggressive" },
      { "engine": "caveman", "intensity": "full" }
    ]
  }
}
```

---

## 업스트림 동기화 정책

OmniRoute의 압축 엔진은 README에서 여러 업스트림 프로젝트를 명시하고 있습니다
("RTK, Caveman, LLMLingua-2, Troglodita에서 영감을 받음"). 기여자들이 자주 묻는
질문은 다음과 같습니다. **업스트림 RTK에 새로운 도구 필터가 추가되거나 Caveman에 규칙
팩이 추가되면, 이것이 어떻게 OmniRoute에 반영되나요?** 이 섹션이 이에 대한 공식 답변입니다.

### 벤더링된 복사본과 독립 구현

| 엔진                         | 업스트림과의 관계                                                                                                | 위치                                                                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| **RTK**                      | **독립적인 재구현**(복사본이 아니라 아이디어에서 영감을 받음)                                                    | `open-sse/services/compression/engines/rtk/`                        |
| **Caveman**                  | **독립적인 재구현**(아이디어에서 영감을 받음)                                                                    | `open-sse/services/compression/engines/cavemanAdapter.ts`           |
| **Headroom**                 | 대부분 내부 구현이며, `gcf/` 코덱만 `gcf-typescript`에서 **실제로 벤더링됨**(MIT, SPDX 표시, 일반 프로필만 해당) | `open-sse/services/compression/engines/headroom/gcf/`               |
| **LLMLingua-2 / Troglodita** | 아이디어에서 영감을 받음(`llmlingua` + `session-dedup` 엔진의 기반)                                              | `open-sse/services/compression/engines/llmlingua/`, `session-dedup` |

핵심 사항: **RTK와 Caveman은 _아이디어_(필터 규칙, 규칙 팩)를 클린룸 방식으로
구현한 TypeScript 구현체이지, 벤더링된 소스 트리가 아닙니다.** `git pull`로 가져올
업스트림 복사본은 없습니다. 바로 이러한 이유로 README에서 "bundled"가 아니라
"inspired by"라고 표현합니다.

### 업스트림 개선 사항이 병합되는 방식

설계상 **자동화된 업스트림 릴리스 추적 기능도 없고 `compression-sync`
레이블도 없습니다.** 엔진이 재구현된 것이므로 업스트림 RTK 필터나 Caveman 규칙 팩은
코드로서 병합되지 않습니다. 대신 **OmniRoute 자체 형식의 새로운 규칙/필터로
다시 표현되며**([COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) 참조),
일반 PR을 통해 필요에 따라 반영됩니다. 위의 확장 지점(사용자 정의 엔진, 언어 팩, RTK 필터)이
이를 기여하는 공식적인 방법입니다.

이러한 흐름이 실제로 적용된 최근 사례:

- Gradle 및 `dotnet` 빌드 출력을 위한 RTK 필터(v3.8.42)
- kubectl / docker-build / composer / gh용 RTK 필터(#2824)
- Caveman 인도네시아어 언어 팩(#3975)과 독일어 / 프랑스어 / 일본어 / 중국어 팩

### Headroom(입력 압축 프록시)

Headroom은 **완전히 내부적으로 관리됩니다**. 고정된 벤더링 `gcf` 코덱 스냅샷과
OmniRoute 자체의 `smartcrusher` / `toon` / `tabular` 계층으로 구성됩니다. 벤더링된
복사본 외에는 추적할 활성 업스트림이 없습니다. `gcf` 업데이트는 코덱이 변경될 때
수동으로 갱신되며, 압축 예산 게이트(`check:compression-budget`)를 기준으로 다시
검증됩니다.

### 업스트림에서 영감을 받은 개선 사항 제안하기

1. **벤더링하지 마세요**. 업스트림 규칙/필터를 OmniRoute 형식으로 다시 표현하세요.
2. 아래의 해당 확장 지점(언어 팩, RTK 필터 또는 사용자 정의 엔진)을 통해 추가하세요.
3. 라이선스가 포함된 소스를 복사하지 말고, PR 설명에서 업스트림 프로젝트를 참조하여
   출처를 표시하세요.
4. 테스트를 포함하고 `check:compression-budget` 게이트가 계속 통과하는지 확인하세요.

---

## 출력 스타일 추가하기

출력 스타일([가이드의 카탈로그 표](./COMPRESSION_GUIDE.md#output-styles-catalog) 참조)은
입력 엔진에 대응하는 응답 측 기능입니다. 전송하는 내용을 압축하는 대신 모델이
더 저렴한 출력을 생성하도록 지시합니다. 레지스트리는
`open-sse/services/compression/outputStyles/catalog.ts`의 `OUTPUT_STYLE_CATALOG`이며,
**카탈로그 항목 하나가 전체 기능을 구성합니다**. 인젝터, 대시보드 설정 패널,
영속성 및 텔레메트리는 모두 카탈로그를 열거하므로 업데이트할 다른 목록은 없습니다.

1. **`OUTPUT_STYLE_CATALOG`에 항목 하나를 추가합니다.** `id`, `label`, `description` 및
   영어로 작성된 세 가지 `levels`(`lite`, `full`, `ultra`)를 포함해야 합니다. 코드,
   경로, 명령어, 오류 및 URL이 그대로 유지되도록 모든 레벨은
   `${SHARED_BOUNDARIES}`로 끝나야 합니다. 지시문 텍스트는
   `(id, level, language)`별로 **정적이고 결정적**이어야 하며,
   `${SHARED_BOUNDARIES}`만 보간할 수 있습니다.
2. **번역합니다.** `i18n` 아래에 최소한 `pt-BR` 블록을 제공하세요. `ponytail`과
   `i-have-adhd`(en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi)가 참조 형식입니다. 의도적으로
   단일 언어만 지원하는 스타일은 대신 `locale`을 설정하며(`terse-cjk` → `zh`와 같은 방식),
   해당 로케일에서만 제공됩니다.
3. **매트릭스 가드를 업데이트합니다.** 스타일의 언어를
   `tests/unit/compression/output-styles-i18n-matrix.test.ts`의
   `BASELINE_LANGUAGES`에 추가하세요. 로케일 제한이 없는 새 스타일에 필수 번역이 없으면
   게이트가 실패합니다. 단, 추적 이슈가 포함된 명시적인 `KNOWN_ENGLISH_ONLY` 항목이
   있는 경우는 예외입니다.
4. **스타일별 테스트를 추가합니다.**
   `tests/unit/compression/i-have-adhd-catalog.test.ts`를 모델로 삼아 카탈로그 형태,
   레벨별 경계 절, 그리고 각 번역이 영어를 복사한 것이 아니라 해당 언어로 작성되었음을
   검증하는 앵커를 테스트하세요.
5. **출처 표기**: 스타일이 업스트림 프로젝트에서 차용된 경우, 해당 항목의 소스 주석에
   출처를 표기하세요(예: `i-have-adhd` → ayghri/i-have-adhd, MIT). 위의
   "업스트림에서 영감을 받은 개선 사항 제안하기"와 동일한 규칙이 적용됩니다.

UI, 스키마 또는 텔레메트리는 변경할 필요가 없습니다. 해당 화면과 기능은 카탈로그를 기반으로 렌더링됩니다.

---

## 모범 사례

### 엔진 개발

1. **항상 `validateConfig`를 구현하세요.** 검증이 없는 엔진은 조용한 실패를 유발합니다
2. **현실적인 `targetLatencyMs`를 설정하세요.** 전략 선택기가 엔진을 선택할 때 사용합니다
3. **대시보드에는 `getConfigSchema`를 사용하세요.** 사용자에게 설정을 숨기지 마세요
4. **엔진이 순수한 경우 `stackable: true`를 지원하세요.** 부작용이 있는 엔진은 스택하지 않아야 합니다
5. **인라인 테스트를 작성하세요.** 엔진은 1초 이내에 검증할 수 있어야 합니다

### 언어 팩 개발

1. **`lite` 강도부터 시작하세요.** 규칙은 가장 낮은 설정에서도 안전해야 합니다
2. **`context`를 사용하여 규칙의 범위를 지정하세요.** `user` 전용 규칙은 실수로 시스템 프롬프트에 영향을 줄 수 없습니다
3. **JSON 키를 캡처하지 마세요.** `\\bword\\b`는 JSON 내부와 일치하여 구조화된 데이터를 손상시킬 수 있습니다
4. **극단적인 사례로 테스트하세요.** 빈 입력, 유니코드, RTL 텍스트, 이모지
5. **기존 팩을 템플릿으로 사용하세요.** `en/filler.json`이 가장 잘 개발된 예시입니다

### 파이프라인 설계

1. **최적화하기 전에 프로파일링하세요.** 먼저 `compression_stats`로 측정하세요
2. **재구현보다 조합을 우선하세요.** 새 엔진을 작성하기 전에 Caveman 규칙을 확장하세요
3. **순서에 대한 근거를 문서화하세요.** 엔진 A를 엔진 B보다 먼저 실행하는 이유를 주석으로 설명하세요
4. **세 가지 강도 수준을 모두 테스트하세요.** `lite`는 빠르지만 손실이 있고, `ultra`는 느리지만 정밀합니다

---

## 참고: 기본 제공 엔진

| 엔진 ID              | 스택 가능 | 기본 stackPriority | 대상                         |
| -------------------- | --------- | ------------------ | ---------------------------- |
| `lite`               | 예        | 5                  | 메시지, 도구 결과            |
| `rtk`                | 예        | 10                 | 도구 결과                    |
| `standard` (caveman) | 예        | 20                 | 메시지, 도구 결과, 코드 블록 |
| `aggressive`         | 예        | 30                 | 메시지                       |
| `ultra`              | 예        | 40                 | 메시지, 코드 블록            |

### 함께 보기

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — 파이프라인 개요
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — 엔진 레지스트리 참고 자료
- [COMPRESSION_RULES_FORMAT.md](./COMPRESSION_RULES_FORMAT.md) — 규칙 형식 명세
- [COMPRESSION_LANGUAGE_PACKS.md](./COMPRESSION_LANGUAGE_PACKS.md) — 언어 팩 세부 정보
- [RTK_COMPRESSION.md](./RTK_COMPRESSION.md) — RTK 엔진 및 사용자 지정 필터
- 소스: `open-sse/services/compression/` (117개 파일, 약 250KB)
