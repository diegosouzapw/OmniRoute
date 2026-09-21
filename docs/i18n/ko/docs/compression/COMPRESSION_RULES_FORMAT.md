# Compression Rules Format (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_RULES_FORMAT.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_RULES_FORMAT.md)

---

압축 규칙은 런타임에 로드되는 JSON 파일입니다. 새로운 언어 팩과 RTK 명령 필터를 엔진 코드를 변경하지 않고 검토할 수 있도록 의도적으로 데이터로만 구성되어 있습니다.

> **표준 스키마(최종 기준):** [`open-sse/services/compression/rules/_schema.json`](../../open-sse/services/compression/rules/_schema.json) (JSON Schema draft 2020-12).
> 아래 예시는 설명을 위한 것입니다. 확실하지 않은 경우 팩이 `_schema.json`을 준수하는지 검증하세요.

## Caveman 규칙 팩

Caveman 규칙 팩은 다음 경로에 있습니다.

```txt
open-sse/services/compression/rules/<language>/<pack>.json
```

각 팩에는 보호 영역을 분리한 후 일반 텍스트에 적용되는 치환 규칙이 포함됩니다.

```json
{
  "language": "en",
  "category": "filler",
  "rules": [
    {
      "name": "question_to_directive",
      "pattern": "\\b(?:Can you explain why|Could you show me how)\\b\\s*",
      "replacement": "Explain why ",
      "replacementMap": {
        "can you explain why": "Explain why ",
        "could you show me how": "Show how "
      },
      "flags": "gi",
      "context": "all",
      "category": "context",
      "minIntensity": "lite",
      "description": "Convert verbose questions into direct requests."
    }
  ]
}
```

### Caveman 필드

| 필드                     | 필수 여부 | 설명                                                                |
| ------------------------ | --------- | ------------------------------------------------------------------- |
| `language`               | 예        | `en`, `pt-BR`, `es`와 같은 BCP-47 형식의 언어 키                    |
| `category`               | 예        | 팩 카테고리 파일 이름/카테고리(예: `filler` 또는 `dedup`)           |
| `rules`                  | 예        | 정규식 치환 규칙의 배열                                             |
| `rules[].name`           | 예        | 안정적으로 유지되는 규칙 이름                                       |
| `rules[].pattern`        | 예        | JavaScript 정규식 소스                                              |
| `rules[].flags`          | 아니요    | JavaScript 정규식 플래그. 기본값은 `gi`                             |
| `rules[].replacement`    | 아니요    | 치환 문자열 또는 `replacementMap`에서 일치 항목이 없을 때의 대체 값 |
| `rules[].replacementMap` | 아니요    | 정규화된 일치 텍스트를 키로 사용하는 일치 항목별 치환 값            |
| `rules[].context`        | 아니요    | `all`, `user`, `assistant` 또는 `system`. 기본값은 `all`            |
| `rules[].category`       | 아니요    | `filler`, `context`, `structural`, `dedup`, `terse` 또는 `ultra`    |
| `rules[].minIntensity`   | 아니요    | `lite`, `full` 또는 `ultra`. 기본값은 `lite`                        |
| `rules[].description`    | 아니요    | 사람이 읽을 수 있는 규칙 요약                                       |

대소문자를 구분하는 일치가 중요한 경우 `flags`를 사용하세요. 예를 들어 `the OpenAI API`를 제거하지 않으면서 소문자로 시작하는 일반 텍스트 앞의 관사를 제거할 때 사용할 수 있습니다. 하나의 정규식에 서로 다른 출력이 필요한 여러 대안이 있는 경우 `replacementMap`을 사용하세요. 이를 통해 더 풍부한 기본 제공 TypeScript 치환 함수의 동작을 유지하면서도 JSON 규칙 팩을 데이터만으로 구성할 수 있습니다.

## RTK 필터 팩

RTK 필터는 다음 경로에 있습니다.

```txt
open-sse/services/compression/engines/rtk/filters/<filter>.json
```

각 필터는 명령 출력 계열을 인식하고 압축하는 방법을 정의합니다.

```json
{
  "id": "test-vitest",
  "label": "Vitest 출력",
  "category": "test",
  "priority": 92,
  "match": {
    "outputTypes": ["test-vitest"],
    "commands": ["vitest", "npm test", "npm run test"],
    "patterns": ["\\bFAIL\\b", "\\bPASS\\b", "\\bTest Files\\b"]
  },
  "rules": {
    "stripAnsi": true,
    "replace": [{ "pattern": "\\s+\\[[0-9]+ms\\]", "replacement": "" }],
    "matchOutput": [
      {
        "pattern": "All tests passed",
        "message": "vitest: 정상",
        "unless": "FAIL|Error:"
      }
    ],
    "includePatterns": ["FAIL", "Error:", "Test Files", "Tests"],
    "dropPatterns": ["^\\s*$", "Duration\\s+\\d+"],
    "collapsePatterns": ["^\\s+at "],
    "deduplicate": true,
    "truncateLineAt": 240,
    "maxLines": 160,
    "headLines": 24,
    "tailLines": 40,
    "onEmpty": "vitest: 정상",
    "filterStderr": false
  },
  "preserve": {
    "errorPatterns": ["FAIL", "Error:", "AssertionError"],
    "summaryPatterns": ["Test Files", "Tests", "Snapshots"]
  },
  "tests": [
    {
      "name": "실패한 테스트 유지",
      "command": "vitest",
      "input": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed",
      "expected": "FAIL test/a.test.ts\\nError: boom\\nTest Files 1 failed"
    }
  ]
}
```

### RTK 필드

| 필드                       | 필수 여부 | 설명                                                                       |
| -------------------------- | --------- | -------------------------------------------------------------------------- |
| `id`                       | 예        | 안정적인 필터 ID                                                           |
| `label`                    | 예        | 대시보드에 표시할 수 있는 이름                                             |
| `category`                 | 예        | 필터 계열: git, test, build, shell, docker, package, infra, cloud, generic |
| `priority`                 | 아니요    | 여러 필터가 일치하면 우선순위가 높은 필터가 선택됨                         |
| `match.outputTypes`        | 아니요    | 이 필터를 선택하는 탐지기 출력 ID                                          |
| `match.commands`           | 아니요    | 이 필터를 선택하는 명령 토큰                                               |
| `match.patterns`           | 아니요    | 출력 텍스트에서 이 필터를 선택하는 정규식 패턴                             |
| `rules.stripAnsi`          | 아니요    | 정규식 단계 전에 ANSI 이스케이프 시퀀스 제거                               |
| `rules.replace`            | 아니요    | 줄별로 순서대로 적용되는 정규식 치환                                       |
| `rules.matchOutput`        | 아니요    | 선택적 `unless` 가드가 있는 조기 반환 출력 규칙                            |
| `rules.includePatterns`    | 아니요    | 우선적으로 보존할 줄                                                       |
| `rules.dropPatterns`       | 아니요    | 노이즈로 간주하여 제거할 줄                                                |
| `rules.collapsePatterns`   | 아니요    | 축약할 수 있는 반복 일치 줄                                                |
| `rules.deduplicate`        | 아니요    | 정규화된 중복 줄 축약                                                      |
| `rules.truncateLineAt`     | 아니요    | 유니코드에 안전한 줄별 문자 수 제한                                        |
| `rules.maxLines`           | 아니요    | 끝부분을 보존하기 전 유지할 최대 줄 수                                     |
| `rules.headLines`          | 아니요    | 잘라낼 때 유지할 앞부분 줄                                                 |
| `rules.tailLines`          | 아니요    | 최근 컨텍스트를 위해 유지할 끝부분 줄                                      |
| `rules.onEmpty`            | 아니요    | 필터링으로 모든 콘텐츠가 제거되었을 때 사용할 대체 메시지                  |
| `rules.filterStderr`       | 아니요    | 후속 필터링 단계 전에 일반적인 stderr 접두사 정규화                        |
| `preserve.errorPatterns`   | 아니요    | 잘라낸 후에도 유지해야 하는 오류 줄                                        |
| `preserve.summaryPatterns` | 아니요    | 잘라낸 후에도 유지해야 하는 요약 줄                                        |
| `tests[]`                  | 아니요    | RTK 검증 게이트에서 사용하는 인라인 검증 샘플                              |

RTK는 선언적 단계를 `stripAnsi`, `filterStderr`, `replace`,
`matchOutput`, `dropPatterns`/`includePatterns`, `truncateLineAt`, `headLines`/`tailLines`,
`maxLines`, `onEmpty` 순서로 적용합니다.

사용자 지정 필터는 다음 위치에서 불러올 수 있습니다.

1. 프로젝트 `.rtk/filters.json` 파일은 일치하는 `.rtk/trust.json` 해시가 있거나
   `trustProjectFilters`가 활성화된 경우에만 불러옵니다.
2. 전역 `DATA_DIR/rtk/filters.json`.
3. 기본 제공 필터.

프로젝트/전역 사용자 지정 파일에는 필터 객체 하나 또는 필터 객체 배열이 포함될 수 있습니다. 유효하지 않은
사용자 지정 필터는 진단 메시지와 함께 건너뛰며, 유효하지 않은 기본 제공 필터는 검증에 실패합니다.

프로젝트 신뢰 파일:

```json
{
  "filtersSha256": "0123456789abcdef..."
}
```

환경 재정의 `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`은 해시 없이 프로젝트 필터를 신뢰하며,
통제된 로컬 개발 환경에서만 사용해야 합니다.

## 안전 규칙

- 규칙은 멱등성을 유지해야 합니다. 동일한 필터를 두 번 실행해도 출력이 손상되지 않아야 합니다.
- 가능한 경우 정확한 오류 텍스트, 파일 경로, 줄 번호 및 명령 요약을 그대로 유지합니다.
- 코드 블록, JSON 페이로드, URL 또는 비밀 정보를 수정하는 규칙은 피합니다.
- 새로운 명령 계열에 대해 탐지기/필터 테스트에 단위 테스트 범위를 추가합니다.
- 모든 기본 제공 필터와 공유 사용자 지정 필터에 `tests[]` 샘플을 추가합니다.

## 검증

규칙 팩은 사용 전에 검증됩니다. 기본 제공 Caveman 팩과 기본 제공 RTK 필터는 릴리스 전에 손상된 자산을 발견할 수 있도록 검증 중 즉시 실패합니다. 사용자 지정 RTK 필터는 구문 분석 또는 신뢰 검증에 실패하면 진단 정보와 함께 건너뜁니다.

집중 검증:

```bash
node --import tsx/esm --test tests/unit/compression/rule-loader.test.ts tests/unit/compression/language-packs.test.ts
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts tests/unit/compression/rtk-dsl-pipeline.test.ts
```
