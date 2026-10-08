# RTK Compression (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/RTK_COMPRESSION.md) · 🇪🇹 [am](../../../am/docs/compression/RTK_COMPRESSION.md) · 🇸🇦 [ar](../../../ar/docs/compression/RTK_COMPRESSION.md) · 🇦🇿 [az](../../../az/docs/compression/RTK_COMPRESSION.md) · 🇧🇬 [bg](../../../bg/docs/compression/RTK_COMPRESSION.md) · 🇧🇩 [bn](../../../bn/docs/compression/RTK_COMPRESSION.md) · 🇧🇦 [bs](../../../bs/docs/compression/RTK_COMPRESSION.md) · 🇨🇿 [cs](../../../cs/docs/compression/RTK_COMPRESSION.md) · 🇩🇰 [da](../../../da/docs/compression/RTK_COMPRESSION.md) · 🇩🇪 [de](../../../de/docs/compression/RTK_COMPRESSION.md) · 🇬🇷 [el](../../../el/docs/compression/RTK_COMPRESSION.md) · 🇪🇸 [es](../../../es/docs/compression/RTK_COMPRESSION.md) · 🇪🇪 [et](../../../et/docs/compression/RTK_COMPRESSION.md) · 🇮🇷 [fa](../../../fa/docs/compression/RTK_COMPRESSION.md) · 🇫🇮 [fi](../../../fi/docs/compression/RTK_COMPRESSION.md) · 🇫🇷 [fr](../../../fr/docs/compression/RTK_COMPRESSION.md) · 🇮🇪 [ga](../../../ga/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [gu](../../../gu/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ha](../../../ha/docs/compression/RTK_COMPRESSION.md) · 🇮🇱 [he](../../../he/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [hi](../../../hi/docs/compression/RTK_COMPRESSION.md) · 🇭🇷 [hr](../../../hr/docs/compression/RTK_COMPRESSION.md) · 🇭🇺 [hu](../../../hu/docs/compression/RTK_COMPRESSION.md) · 🇦🇲 [hy](../../../hy/docs/compression/RTK_COMPRESSION.md) · 🇮🇩 [id](../../../id/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [ig](../../../ig/docs/compression/RTK_COMPRESSION.md) · 🇮🇹 [it](../../../it/docs/compression/RTK_COMPRESSION.md) · 🇯🇵 [ja](../../../ja/docs/compression/RTK_COMPRESSION.md) · 🇬🇪 [ka](../../../ka/docs/compression/RTK_COMPRESSION.md) · 🇰🇭 [km](../../../km/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [kn](../../../kn/docs/compression/RTK_COMPRESSION.md) · 🇱🇹 [lt](../../../lt/docs/compression/RTK_COMPRESSION.md) · 🇱🇻 [lv](../../../lv/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ml](../../../ml/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [mr](../../../mr/docs/compression/RTK_COMPRESSION.md) · 🇲🇾 [ms](../../../ms/docs/compression/RTK_COMPRESSION.md) · 🇲🇹 [mt](../../../mt/docs/compression/RTK_COMPRESSION.md) · 🇲🇲 [my](../../../my/docs/compression/RTK_COMPRESSION.md) · 🇳🇵 [ne](../../../ne/docs/compression/RTK_COMPRESSION.md) · 🇳🇱 [nl](../../../nl/docs/compression/RTK_COMPRESSION.md) · 🇳🇴 [no](../../../no/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [or](../../../or/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [pa](../../../pa/docs/compression/RTK_COMPRESSION.md) · 🇵🇭 [phi](../../../phi/docs/compression/RTK_COMPRESSION.md) · 🇵🇱 [pl](../../../pl/docs/compression/RTK_COMPRESSION.md) · 🇵🇹 [pt](../../../pt/docs/compression/RTK_COMPRESSION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/RTK_COMPRESSION.md) · 🇷🇴 [ro](../../../ro/docs/compression/RTK_COMPRESSION.md) · 🇷🇺 [ru](../../../ru/docs/compression/RTK_COMPRESSION.md) · 🇱🇰 [si](../../../si/docs/compression/RTK_COMPRESSION.md) · 🇸🇰 [sk](../../../sk/docs/compression/RTK_COMPRESSION.md) · 🇸🇮 [sl](../../../sl/docs/compression/RTK_COMPRESSION.md) · 🇷🇸 [sr](../../../sr/docs/compression/RTK_COMPRESSION.md) · 🇸🇪 [sv](../../../sv/docs/compression/RTK_COMPRESSION.md) · 🇰🇪 [sw](../../../sw/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [ta](../../../ta/docs/compression/RTK_COMPRESSION.md) · 🇮🇳 [te](../../../te/docs/compression/RTK_COMPRESSION.md) · 🇹🇭 [th](../../../th/docs/compression/RTK_COMPRESSION.md) · 🇹🇷 [tr](../../../tr/docs/compression/RTK_COMPRESSION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/RTK_COMPRESSION.md) · 🇵🇰 [ur](../../../ur/docs/compression/RTK_COMPRESSION.md) · 🇺🇿 [uz](../../../uz/docs/compression/RTK_COMPRESSION.md) · 🇻🇳 [vi](../../../vi/docs/compression/RTK_COMPRESSION.md) · 🇳🇬 [yo](../../../yo/docs/compression/RTK_COMPRESSION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/RTK_COMPRESSION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/RTK_COMPRESSION.md)

---

RTK 압축은 터미널 및 도구 출력을 위한 OmniRoute의 명령어 인식 압축 엔진입니다. 대부분의 컨텍스트 증가가 테스트 로그, 빌드 출력, 패키지 관리자 노이즈, 셸 기록, Docker 출력, git 출력 및 스택 트레이스에서 발생하는 코딩 에이전트 세션을 위해 설계되었습니다.

RTK는 `defaultMode: "rtk"`로 직접 실행하거나 스택형 파이프라인의 첫 번째 단계로 실행할 수 있으며, 일반적으로 다음과 같이 구성합니다.

```txt
rtk -> caveman
```

이 순서는 먼저 노이즈가 많은 머신 출력을 압축한 다음, Caveman이 나머지 산문을 요약하도록 합니다.

업스트림 RTK는 명령어 출력에서 `60-90%`의 절감률을 보고합니다. README의 샘플 세션에서는 표준 토큰이 `~118,000`개에서 RTK 토큰 `~23,900`개로 줄어들어 `79.7%`가 절감됩니다(`~80%`). OmniRoute는 Caveman 입력 압축과 결합한 스택형 절감률 계산에 이 업스트림 평균값을 사용합니다.

```txt
RTK 평균:       80% 절감
Caveman 입력:   46% 절감
스택형:         1 - (1 - 0.80) * (1 - 0.46) = 89.2% 절감
범위:           1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

## 압축 대상

현재 기본 제공 카탈로그에는 다음 카테고리에 걸쳐 49개의 필터가 포함되어 있습니다.

| 카테고리  | 예시                                                          |
| --------- | ------------------------------------------------------------- |
| `git`     | `git status`, `git branch`, `git diff`, `git log`             |
| `test`    | Vitest, Jest, Pytest, Playwright, Go 테스트, Cargo 테스트     |
| `build`   | TypeScript, ESLint, Biome, Prettier, Vite, Webpack, Turbo, Nx |
| `package` | `npm install`, `npm audit`, `pip`, `uv sync`, Poetry, Bundler |
| `shell`   | `ls`, `find`, `grep`, 일반 셸 로그                            |
| `docker`  | `docker ps`, Docker 로그                                      |
| `infra`   | Terraform, OpenTofu, `systemctl status`                       |
| `generic` | JSON 출력, 스택 트레이스, 일반 출력 폴백                      |

`open-sse/services/compression/engines/rtk/commandDetector.ts`의 감지기는 필터를 선택하기 전에 출력을 분류합니다. 명령어 클래스만으로 충분하지 않은 경우 필터는 명령어 패턴 또는 출력 정규식으로도 일치시킬 수 있습니다.

## 필터 해석

RTK는 다음 순서로 필터를 로드합니다.

1. 신뢰된 경우에만 `.rtk/filters.toml` 및 `.rtk/filters.json`의 프로젝트 필터.
2. `DATA_DIR/rtk/filters.toml` 및 `DATA_DIR/rtk/filters.json`의 전역 필터.
3. `open-sse/services/compression/engines/rtk/filters/`의 기본 제공 필터.

같은 범위 내에서는 RTK TOML 스키마 v1 필터가 OmniRoute JSON 필터보다 우선합니다. 가져온 명령어별 필터가 해당 범위의 더 광범위한 필터를 재정의할 수 있도록 TOML `match_command` 표현식은 명령어 유형 일치보다 먼저 확인됩니다. 파일 형식과 관계없이 프로젝트 범위가 여전히 전역 범위보다 우선합니다.

정규식 필터는 도구 출력이 에이전트에게 표시되는 방식을 변경할 수 있으므로 프로젝트 필터에는 의도적으로 신뢰 검증이 적용됩니다. 다음 중 하나가 참이면 프로젝트 필터 파일이 허용됩니다.

- `rtkConfig.trustProjectFilters`가 `true`입니다.
- `OMNIROUTE_RTK_TRUST_PROJECT_FILTERS=1`이 설정되어 있습니다.
- `.rtk/trust.json`에 프로젝트 필터 파일과 일치하는 SHA-256 해시가 포함되어 있습니다.

신뢰 파일 예시:

```json
{
  "filtersSha256": "0123456789abcdef...",
  "filtersTomlSha256": "fedcba9876543210..."
}
```

해시는 별개입니다. `filtersSha256`는 `.rtk/filters.json`을 신뢰하고, `filtersTomlSha256`는 `.rtk/filters.toml`을 신뢰합니다. 어느 한 파일을 편집하면 해당 파일의 신뢰 항목만 무효화됩니다. 전역 파일은 관리자가 설치하며 기존 전역 필터 신뢰 동작을 사용합니다.

사용자 정의 필터는 하나의 필터 객체이거나 필터 객체의 배열일 수 있습니다. 유효하지 않은 사용자 정의 필터는 건너뛰며 `/api/context/rtk/filters` 진단에서 보고됩니다. 유효하지 않은 기본 제공 필터는 즉시 실패합니다.

## RTK TOML 스키마 v1 호환성

OmniRoute는 RTK TOML 스키마 v1을 사용하는 선언적 필터 파일을 파싱하고, 검증하고, 테스트하고, 설치할 수 있습니다.
지원되는 필드는 `description`, `match_command`, `strip_ansi`, `filter_stderr`,
`strip_lines_matching`, `keep_lines_matching`, `replace`, `match_output`, `truncate_lines_at`,
`head_lines`, `tail_lines`, `max_lines`, `on_empty`, 그리고 `[[tests.<filter>]]` 인라인 테스트입니다.
알 수 없는 필드, 유효하지 않거나 안전하지 않은 정규식, 동시에 지정된 제거/유지 규칙, 1 MiB를 초과하는 파일,
그리고 알 수 없는 필터에 대한 참조는 거부됩니다. 인라인 테스트에 실패한 파일은 검토를 위해 검증할 수는 있지만
설치하거나 로드할 수는 없습니다. 사용자 지정 파일 로드 실패에는 계속해서 페일 오픈이 적용됩니다.
즉, 유효하지 않은 파일은 건너뛰며 나머지 필터는 계속 작동합니다.

OmniRoute는 클라이언트가 이미 캡처한 도구 출력을 수신하므로 `filter_stderr = true`는
프로세스 캡처를 변경할 수 없습니다. 이 필드는 아무 작업도 하지 않는 옵션으로 허용되며, 검증 시 경고가 반환됩니다.
이는 의도적으로 RTK 실행 파일, 셸 훅, Rust 명령 구현 또는 신뢰 저장소 레이아웃과의 완전한 호환성이 아니라
**RTK TOML 스키마 v1 호환성**으로 설명됩니다.

대시보드의 고급 RTK 보기는 붙여넣거나 업로드한 TOML을 허용합니다. 검증은 읽기 전용입니다.
설치 시 제한적인 권한으로 `DATA_DIR/rtk/filters.toml`을 원자적으로 작성하고, 재시작 없이
실시간 필터 카탈로그를 새로 고칩니다. 기존 파일을 교체하려면 명시적인 `overwrite`
확인이 필요하며, 먼저 `DATA_DIR/rtk/filters.toml.bak`을 생성합니다.

## 필터 DSL

필터는 [압축 규칙 형식](./COMPRESSION_RULES_FORMAT.md)에 설명된 JSON 스키마를 사용합니다.
런타임은 다음 단계를 순서대로 적용합니다.

```txt
stripAnsi -> filterStderr -> replace -> matchOutput -> 줄 삭제/포함
  -> truncateLineAt -> head/tail/maxLines -> onEmpty
```

주요 필드:

| 필드                         | 목적                                                     |
| ---------------------------- | -------------------------------------------------------- |
| `rules.stripAnsi`            | 일치 여부를 확인하기 전에 터미널 색상/제어 시퀀스 제거   |
| `rules.filterStderr`         | 일치 여부 확인/필터링 전에 일반적인 stderr 접두사 정규화 |
| `rules.replace`              | 순서대로 정규식 치환 적용                                |
| `rules.matchOutput`          | 출력이 알려진 조건과 일치할 때 간결한 요약 반환          |
| `rules.matchOutput[].unless` | 오류/실패 패턴이 있을 때 단축 처리 건너뛰기              |
| `rules.dropPatterns`         | 불필요한 줄 제거                                         |
| `rules.includePatterns`      | 조치 가능한 줄 우선 유지                                 |
| `rules.collapsePatterns`     | 일치하는 반복 줄 축약                                    |
| `rules.deduplicate`          | 필터별 옵트인: 연속된 중복 줄 축약                       |
| `rules.truncateLineAt`       | 유니코드에 안전한 줄별 잘라내기                          |
| `rules.onEmpty`              | 모든 줄이 필터링된 경우 사용할 대체 메시지               |
| `tests[]`                    | 검증 게이트에서 사용하는 인라인 샘플                     |

기본 제공 필터에는 인라인 `tests[]` 샘플이 포함되어야 합니다. 사용자 지정 필터에도,
특히 여러 프로젝트에서 공유되는 경우 인라인 샘플을 포함하는 것이 좋습니다.

## 라인 중복 제거(두 계층)

RTK는 서로 독립적인 두 계층에서 중복 라인을 축약합니다.

1. **필터별 `deduplicate`(옵트인, 기본값 `false`).** 필터에서 `rules.deduplicate: true`를 설정하면
   해당 필터가 일치시킨 출력 내에서 연속된 중복 라인을 잘라내기 전에 축약할 수 있습니다.
   이 작업은 `lineFilter.ts` 내부에서 실행됩니다. 레거시 필터의 경우 필터에
   `collapsePatterns`가 정의되어 있으면 자동으로 활성화됩니다. 스키마:
   `open-sse/services/compression/engines/rtk/filterSchema.ts`의
   `deduplicate: z.boolean().default(false)`.
2. **엔진 전체 `deduplicateThreshold`(기본값 `3`).** 모든 필터가 실행된 후 엔진은 전체 결과에서
   동일한 라인이 `deduplicateThreshold`개 이상 연속되는 모든 구간을 축약합니다
   (`deduplicateRepeatedLines`, `engines/rtk/index.ts`에서 적용). 정규화 시 값은 2–100 범위로
   제한됩니다.

필터별 처리는 먼저 필터 내부에서 실행되고, 엔진 전체 처리는 결합된 출력 전체에 대해 마지막에
실행되므로 두 처리가 중복 계산 없이 함께 적용됩니다.

## 라인 그룹화(`enableGrouping`)

`rtkConfig.enableGrouping`이 `true`이면(기본값 `false`) RTK는 중복 제거 후 결과에 추가로
`groupSimilarLines` 처리를 실행하여 바이트 단위로 동일하지는 않지만 _거의 동등한_ 연속 라인 구간을
축약합니다. `rtkConfig.groupingThreshold`(기본값 `3`)는 그룹화를 실행하는 최소 연속 길이입니다.
이는 `deduplicateThreshold`에 구조적으로 대응하는 기능입니다. 중복 제거는 정확히 같은 반복을
처리하고, 그룹화는 "작은 차이가 있지만 형태가 같은" 라인을 처리합니다. 두 플래그 모두
`key_value` 테이블에 저장되는 `rtkConfig` JSON의 일부이므로(위의 구성 참조) 재시작 후에도
설정이 유지됩니다.

## 코드 주석 제거(`stripCodeComments` / `preserveDocstrings`)

`rtkConfig.applyToCodeBlocks`가 활성화된 경우 RTK는 펜스 코드 블록에서 주석도 제거할 수 있습니다.

- `stripCodeComments`(기본값 `false`) — 옵트인 방식입니다. `true`이면 RTK는 JavaScript 및
  TypeScript 펜스 블록에서 주석을 제거합니다. 과거에는 이 플래그를 읽기만 하고 실제로 적용하지
  않았으므로, 운영 환경에서 예고 없이 동작이 변경되는 것을 방지하기 위해 기본값은 "보존"으로
  유지됩니다.
- `preserveDocstrings`(기본값 `true`) — 주석 제거 시 JSDoc/`/** … */` 블록 주석은
  유지됩니다(해당 주석은 차지하는 바이트보다 가치 있는 API 문서를 담고 있습니다). 이러한 주석도
  제거하려면 `false`로 설정하십시오.

주석 제거는 `open-sse/services/compression/engines/rtk/codeStripper.ts`에 구현되어 있습니다.
문자열, 템플릿 및 정규식 리터럴을 주석으로 잘못 인식하지 않도록 정규식이 아닌
**TypeScript 파서**를 사용하며, JSX가 감지되면 처리를 완전히 중단합니다(따라서 JSX 표현식
컨테이너의 주석이 손상되지 않습니다). 현재 주석 제거는 **JavaScript 및 TypeScript에만**
적용됩니다. 스트리퍼의 `CodeLanguage` 집합에 포함된 다른 언어(Python, Rust, Go, Ruby, Java)는
빈 라인 및 공백 축약만 수행하며 주석은 제거하지 않습니다. 주석이 제거된 블록 처리는
`rulesApplied`에서 `rtk:code-strip` 태그로 표시됩니다.

> **참고 — GCF/테이블 형식 인코딩은 별도의 엔진입니다.** RTK에는 "GCF"
> (Graph Compact Format) 테이블형/열 기반 JSON 인코더가 포함되어 있지 **않습니다**. 이전의
> `omni-tabular` 인코더를 대체한 이 인코더는 **headroom** 엔진에 있습니다
> (`open-sse/services/compression/engines/headroom/`, 벤더링된 코덱은
> `headroom/gcf/` 아래에 있음). 이는 여기에서 설명하는 RTK 필터 파이프라인과 관련이 없습니다.

## 구성

전역 설정은 `/api/settings/compression`을 통해 사용할 수 있습니다. RTK 전용 설정은
`/api/context/rtk/config`를 통해서도 사용할 수 있습니다.

```json
{
  "defaultMode": "stacked",
  "autoTriggerMode": "stacked",
  "autoTriggerTokens": 32000,
  "stackedPipeline": [
    { "engine": "rtk", "intensity": "standard" },
    { "engine": "caveman", "intensity": "full" }
  ],
  "rtkConfig": {
    "enabled": true,
    "intensity": "standard",
    "applyToToolResults": true,
    "applyToCodeBlocks": false,
    "applyToAssistantMessages": false,
    "enabledFilters": [],
    "disabledFilters": [],
    "maxLinesPerResult": 120,
    "maxCharsPerResult": 12000,
    "deduplicateThreshold": 3,
    "customFiltersEnabled": true,
    "trustProjectFilters": false,
    "rawOutputRetention": "never",
    "rawOutputMaxBytes": 1048576,
    "enableGrouping": false,
    "groupingThreshold": 3,
    "stripCodeComments": false,
    "preserveDocstrings": true
  }
}
```

`enabledFilters`와 `disabledFilters`에는 필터 ID를 사용합니다(예: `test-vitest` 또는 `git-diff`).

전체 `rtkConfig` 구조는 `open-sse/services/compression/types.ts`의 `RtkConfig` /
`DEFAULT_RTK_CONFIG`에 정의되어 있습니다. 전체 객체는 SQLite `key_value` 테이블에
`namespace = "compression"`, `key = "rtkConfig"`로 하나의 JSON 값으로 저장되며
(`src/lib/db/compression.ts`), 읽을 때 `normalizeRtkConfig`를 통해 정규화됩니다. 따라서
아래의 모든 필드(예: `enableGrouping`, `groupingThreshold`, `stripCodeComments`,
`preserveDocstrings`)는 동일한 저장소를 통해 왕복 처리되며 재시작 후에도 유지됩니다.

| 키                     | 기본값  | 용도                                                           |
| ---------------------- | ------- | -------------------------------------------------------------- |
| `deduplicateThreshold` | `3`     | 엔진 전체: 축약할 연속 동일 줄의 최소 개수(2~100 범위)         |
| `enableGrouping`       | `false` | 옵트인: 거의 동일한 연속 줄 묶음을 축약                        |
| `groupingThreshold`    | `3`     | 그룹화를 트리거하는 유사한 연속 줄 묶음의 최소 개수            |
| `stripCodeComments`    | `false` | 옵트인: 펜스 코드 블록에서 주석 제거(`applyToCodeBlocks` 필요) |
| `preserveDocstrings`   | `true`  | 주석을 제거할 때 JSDoc/`/** … */` 블록 유지                    |

## API

| 경로                               | 메서드 | 용도                                      |
| ---------------------------------- | ------ | ----------------------------------------- |
| `/api/context/rtk/config`          | GET    | RTK 구성 읽기                             |
| `/api/context/rtk/config`          | PUT    | RTK 구성 업데이트                         |
| `/api/context/rtk/filters`         | GET    | 필터 카탈로그 및 로드 진단 목록 조회      |
| `/api/context/rtk/import`          | POST   | RTK TOML 스키마 v1 파일 검증 또는 설치    |
| `/api/context/rtk/test`            | POST   | 단일 텍스트 페이로드의 RTK 압축 미리 보기 |
| `/api/context/rtk/raw-output/[id]` | GET    | 보존된 민감 정보 제거 원시 출력 읽기      |
| `/api/compression/preview`         | POST   | 모든 압축 모드 미리 보기                  |

RTK 테스트 페이로드:

```json
{
  "command": "npm test",
  "text": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed",
  "config": {
    "intensity": "standard"
  }
}
```

압축 미리 보기 페이로드:

```json
{
  "mode": "stacked",
  "messages": [
    {
      "role": "tool",
      "content": "FAIL tests/example.test.ts\nAssertionError: expected true\nTest Files 1 failed"
    }
  ],
  "config": {
    "rtkConfig": {
      "rawOutputRetention": "failures"
    }
  }
}
```

관리 경로를 사용하려면 대시보드 관리 인증 또는 일치하는 API 키 정책이 필요합니다.

RTK TOML 검증 페이로드:

```json
{
  "action": "validate",
  "content": "schema_version = 1\n\n[filters.my-tool]\nmatch_command = \"^my-tool\\\\b\"\nmax_lines = 20\n"
}
```

검증된 파일을 전역으로 설치하려면 `"action": "install"`을 사용하세요. 기존 전역 파일의
교체를 검토하고 확인한 후에만 `"overwrite": true`를 추가하세요.

## 원시 출력 복구

RTK는 일반적으로 압축된 텍스트만 반환합니다. 디버깅을 위해 `rawOutputRetention`을 사용하면 민감 정보가 삭제된 원시 출력을 보존할 수 있습니다.

| 값         | 동작                                               |
| ---------- | -------------------------------------------------- |
| `never`    | 원시 출력을 보존하지 않음                          |
| `failures` | 실패했을 가능성이 있는 출력만 보존                 |
| `always`   | 민감 정보 삭제 후 압축된 모든 RTK 원시 출력을 보존 |

보존된 파일은 다음 경로 아래에 기록됩니다.

```txt
DATA_DIR/rtk/raw-output/
```

영구 저장 전에 일반적인 bearer token, API key, Slack token, AWS access key 및 할당 형식의 `token=...`, `secret=...`, `password=...` 값을 포함한 비밀 정보가 삭제됩니다. 분석 데이터에는 포인터 ID, 크기 및 해시 메타데이터만 저장됩니다.

## 검증 게이트

집중 검증 게이트는 외부 명령을 셸로 실행하지 않고 기본 제공 인라인 필터 테스트를 실행합니다.

```bash
node --import tsx/esm --test tests/unit/compression/rtk-verify.test.ts
```

더 광범위한 RTK 게이트는 다음과 같습니다.

```bash
node --import tsx/esm --test \
  tests/unit/compression/rtk-*.test.ts \
  tests/unit/compression/pipeline-integration.test.ts \
  tests/unit/compression/context-compression-api.test.ts
```

릴리스 전에 전체 압축 게이트를 실행하세요.

```bash
node --import tsx/esm --test \
  tests/unit/compression/*.test.ts \
  tests/golden-set/*.test.ts \
  tests/integration/compression-pipeline.test.ts \
  tests/unit/api/compression/compression-api.test.ts
```

## RTK 확장

1. 필터 JSON 파일을 추가하거나 업데이트합니다.
2. 중요한 동작을 입증하는 `tests[]` 샘플을 하나 이상 포함합니다.
3. 새로운 명령 계열의 경우 `tests/unit/compression/fixtures/rtk/` 아래에 fixture를 추가합니다.
4. 새로운 출력 클래스를 도입할 때 명령 감지 커버리지를 추가합니다.
5. 검증 게이트와 광범위한 RTK 게이트를 실행합니다.
6. 필터가 프로젝트 로컬인 경우 검토 후에만 `.rtk/filters.json`을 커밋하고 `.rtk/trust.json`을 갱신합니다.

---

## 강도 수준 (v3.8.16+)

RTK는 **압축의 공격성**과 **안전성** 사이에서 균형을 조절하는 **3가지 강도 수준**을 지원합니다. 수준은 엔진 구성의 `config.intensity`를 통해 설정합니다.

### 3가지 수준

| 수준                | 잘라내기 임계값 | 토큰 절감률 | 위험도    | 적합한 용도                     |
| ------------------- | --------------- | ----------- | --------- | ------------------------------- |
| `minimal`           | 섹션당 24줄     | ~20-40%     | 매우 낮음 | 중요한 컨텍스트가 있는 프로덕션 |
| `standard` (기본값) | 섹션당 24줄     | ~50-70%     | 낮음      | 일상적인 코딩 세션              |
| `aggressive`        | 섹션당 16줄     | ~70-90%     | 중간      | 긴 세션, 최대 절감              |

### 잘라내기가 발생하는 위치

잘라내기 임계값은 `lineFilter.ts`에 영향을 줍니다.

```ts
// open-sse/services/compression/engines/rtk/index.ts:329-330에서 발췌
config.intensity === "aggressive" ? 16 : 24,
config.intensity === "aggressive" ? 16 : 24,
```

각 섹션의 **앞부분**과 **뒷부분**은 모두 보존되며, 잘라내기가 시작되면 중간 콘텐츠가 제거됩니다.

### 유지되는 항목과 잘리는 항목

| 콘텐츠                 | minimal | standard | aggressive |
| ---------------------- | ------- | -------- | ---------- |
| 오류 / 스택 추적       | ✅ 보존 | ✅ 보존  | ✅ 보존    |
| 테스트 실패            | ✅ 보존 | ✅ 보존  | ✅ 보존    |
| 빌드 오류              | ✅ 보존 | ✅ 보존  | ✅ 보존    |
| 테스트 통과(상세 출력) | ✅ 보존 | 🟡 축약  | 🟡 축약    |
| 일반 출력(정보 로그)   | 🟡 축약 | 🟡 축약  | ❌ 제거    |
| 진행률 표시줄          | 🟡 축약 | ❌ 제거  | ❌ 제거    |
| 배너 / ASCII 아트      | 🟡 축약 | ❌ 제거  | ❌ 제거    |

### 적절한 강도 선택

```
                  컨텍스트 손실이 치명적인가?
                  │
      ┌───────────┼───────────┐
      │           │           │
     예          아니요      확실하지 않음
      │           │           │
      ▼           │           │
   minimal        │           │
      │           │           │
      │           ▼           ▼
      │      처리량이 얼마나   먼저 `standard` 시도
      │      중요한가?        (사례의 80%에서
      │           │          효과적)
      │      ┌────┴────┐
      │      │         │
      │     낮음       높음
      │      │         │
      │      ▼         ▼
      │   standard   aggressive
      │      │         │
      └──────┴─────────┘
```

### 강도 구성

**콤보별**(콤보 구성 내):

```json
{
  "combo": "my-coding-combo",
  "routing": {/* ... */},
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive"
  }
}
```

**프로그래밍 방식**:

`rtkEngine` (`@omniroute/open-sse/services/compression/engines/rtk`)은
`CompressionEngine`이며 `updateConfig` 메서드가 없습니다. 대신 레지스트리 헬퍼를 통해
엔진 구성을 업데이트하세요.

```ts
import { updateEngineConfig } from "@omniroute/open-sse/services/compression/engines/registry";

updateEngineConfig("rtk", { intensity: "aggressive" });
```

### 효과 검증

**검증 게이트**(아래 참조)를 사용하여 선택한 강도에서 필터가 안전한지 확인하세요.

```ts
import { runRtkFilterTests } from "omniroute/compression/engines/rtk/verify";

const result = runRtkFilterTests({ intensity: "aggressive" });
if (!result.passed) {
  console.error("공격적 강도에서 필터 실패");
}
```

---

## 사용자 지정 필터 개발 (v3.8.16+)

`engines/rtk/filters/` 디렉터리에는 **49개 이상의 기본 제공 필터 JSON 파일**이 포함되어 있습니다. 기본 필터에서 지원하지 않는 사용자 지정 도구의 출력을 압축하려면 자체 필터를 추가할 수 있습니다.

### 필터 스키마 (Zod)

```ts
{
  "id": "string",                      // 필수. 필터 식별자(kebab-case, 예: "python-traceback")
  "label": "string",                   // 필수. 사람이 읽을 수 있는 필터 이름
  "description": "string",             // 선택 사항(기본값: ""). 필터가 수행하는 작업에 대한 간단한 설명
  "category": "git|test|build|shell|docker|package|infra|cloud|generic",
  "priority": number,                  // 선택 사항(0-100, 기본값: 50). 실행 순서(값이 높을수록 먼저 실행)
  "match": {
    "commands": ["string"],            // 일치시킬 명령어 이름(예: "python", "pytest")
    "patterns": ["string"],            // 출력과 일치시킬 정규식 패턴
    "outputTypes": ["string"]          // 감지된 출력 클래스(예: "test-failure")
  },
  "rules": {
    "stripAnsi": boolean,              // 선택 사항(기본값: false). ANSI 색상 코드 제거
    "replace": [                       // 찾기 및 바꾸기 규칙(기본값: [])
      { "pattern": "regex", "replacement": "..." }
    ],
    "matchOutput": [                   // 패턴이 일치하면 즉시 처리 종료(기본값: [])
      {
        "pattern": "regex",
        "message": "short summary",
        "unless": "regex"              // 이 패턴이 일치하면 건너뜀
      }
    ],
    "includePatterns": ["string"],     // 유지할 줄(정규식 패턴, 기본값: [])
    "dropPatterns": ["string"],        // 제거할 줄(정규식 패턴, 기본값: [])
    "collapsePatterns": ["string"],    // 하나의 항목으로 축약할 줄(기본값: [])
    "deduplicate": boolean,            // 선택 사항(기본값: false). 중복된 줄 제거
    "truncateLineAt": number,          // 선택 사항(기본값: 0). 줄을 최대 문자 수로 자름
    "maxLines": number,                // 선택 사항(기본값: 0). 전체 줄 수의 절대 상한
    "headLines": number,               // 선택 사항(기본값: 20). 일치한 출력의 처음 N개 줄 유지
    "tailLines": number,               // 선택 사항(기본값: 20). 일치한 출력의 마지막 N개 줄 유지
    "onEmpty": "string",               // 선택 사항(기본값: ""). 모든 줄이 필터링된 경우 사용할 대체 메시지
    "filterStderr": boolean            // 선택 사항(기본값: false). stderr 출력도 필터링
  },
  "preserve": {
    "errorPatterns": ["string"],       // 항상 보존해야 하는 패턴(기본값: [])
    "summaryPatterns": ["string"]      // 최종 요약 줄의 패턴(기본값: [])
  },
  "tests": [                           // 검증용 인라인 테스트(기본값: [])
    {
      "name": "string",               // 필수. 테스트 이름
      "input": "sample output",        // 필수. 샘플 입력 텍스트
      "expected": "expected output",   // 필수. 예상 압축 출력
      "command": "optional command"    // 선택 사항. 명령어 컨텍스트
    }
  ]
}
```

### 예시: Python 트레이스백 필터

```json
{
  "id": "python-traceback",
  "label": "Python Traceback Filter",
  "description": "Compresses Python tracebacks to essential file/line locations and error type",
  "category": "test",
  "priority": 60,
  "match": {
    "commands": ["python", "python3", "pytest", "uv", "poetry"],
    "patterns": ["Traceback \\(most recent call last\\)", "Error", "Exception"],
    "outputTypes": ["error-traceback"]
  },
  "rules": {
    "stripAnsi": true,
    "includePatterns": [
      "Traceback \\(most recent call last\\)",
      "^\\s*File \".+\", line \\d+",
      "^\\s*[A-Z][a-zA-Z]+Error:",
      "^\\s*[A-Z][a-zA-Z]+Exception"
    ],
    "dropPatterns": ["site-packages/", "^\\s+[a-z_]+\\([^)]*\\)$"],
    "headLines": 5,
    "tailLines": 3,
    "maxLines": 25,
    "filterStderr": true
  },
  "preserve": {
    "errorPatterns": ["Error:", "Exception:", "Traceback"],
    "summaryPatterns": ["^[A-Z][a-zA-Z]+(?:Error|Exception):"]
  },
  "tests": [
    {
      "name": "preserves-error-type-and-location",
      "input": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n    do_thing()\n  File \"lib/utils.py\", line 17, in helper\n    return 1 / 0\nZeroDivisionError: division by zero",
      "expected": "Traceback (most recent call last):\n  File \"app.py\", line 42, in main\n  File \"lib/utils.py\", line 17, in helper\nZeroDivisionError: division by zero",
      "command": "python app.py"
    }
  ]
}
```

### 사용자 지정 필터 로드

파일을 인식되는 위치에 배치합니다.

```
~/.omniroute/rtk/filters/my-filter.json     # 사용자 수준
<project>/.rtk/filters/my-filter.json      # 프로젝트 수준
```

필터는 시작 시 `open-sse/services/compression/engines/rtk/filterLoader.ts`의 `loadRtkFilters()`를 통해 자동으로 로드됩니다. 로더는 다음 위치에서 필터를 검색합니다.

- 기본 제공 카탈로그: `open-sse/services/compression/engines/rtk/filters/`
- 사용자 디렉터리: `~/.omniroute/rtk/filters/`
- 프로젝트 디렉터리: `<project>/.rtk/filters/`

프로그래밍 방식으로 필터를 로드하려면 다음을 사용합니다.

```ts
import { loadRtkFilters } from "@omniroute/open-sse/services/compression/engines/rtk/filterLoader";

// 옵션: customFiltersEnabled(사용자/프로젝트 필터 로드, 기본적으로 활성화),
// trustProjectFilters, refresh.
const filters = loadRtkFilters({ customFiltersEnabled: true });
```

### 유효성 검사

필터를 로드할 때 Zod 스키마를 기준으로 유효성을 검사합니다. 구조가 잘못된 필터는 로드되지 않으며 오류가 기록됩니다.

```
RTK_FILTER_LOADER: 필터 "my-filter"의 유효성 검사 실패:
  - rules.replace.0.pattern: 잘못된 정규식
  - match.commands: 비어 있으면 안 됨
```

설치된 모든 필터의 유효성을 검사하려면 `open-sse/services/compression/engines/rtk/verify.ts`에서 내보내는 `runRtkFilterTests()`를 호출합니다.

### 모범 사례

1. **항상 `tests[]`를 포함하세요** — 필터가 제대로 작동함을 입증하고 회귀를 방지합니다
2. **단축 처리에는 `matchOutput`을 사용하세요** — 한 줄만으로 충분히 설명된다면 전체 블록을 대체하세요
3. **`strip`보다 `keep`을 우선하세요** — 명시적인 "항상 보존" 규칙이 "항상 제거" 규칙보다 안전합니다
4. **3가지 강도 수준 모두에서 테스트하세요** — `minimal`은 아무 작업도 하지 않아야 하며, `aggressive`에서도 오류는 보존되어야 합니다
5. **`unless` 필드를 사용하세요** — "X가 있으면 트리거하지 않음" 조건으로 단축 처리를 보호하세요

---

## 원시 출력 복구 및 검증 게이트

RTK가 출력을 강하게 압축할 때 디버깅, 감사 또는 재실행을 위해 **원본 텍스트를 복구**할 수 있습니다.

### 원시 출력 복구 작동 방식

```
원본 출력(10K 토큰)
        │
        ▼
RTK 압축(rawOutput.enabled=true)
        │
        ├─▶ 압축된 출력(2K 토큰)  ──▶ LLM으로 전달
        │
        └─▶ 원본 출력(10K 토큰)   ──▶ DB에 저장
                                         (request_id로 연결)
```

### 원시 출력 저장 활성화

**요청별 설정**(combo 구성에서):

```json
{
  "compression": {
    "engine": "rtk",
    "intensity": "aggressive",
    "rawOutput": {
      "enabled": true,
      "maxBytes": 1048576 // 1MB 제한
    }
  }
}
```

**기본값**: `rawOutput.enabled: false`(저장 공간 절약).

### 저장 비용

| 요청당                | 1MB 제한    | 10MB 제한    |
| --------------------- | ----------- | ------------ |
| 평균 압축 출력        | ~5KB        | ~5KB         |
| 저장된 원시 출력      | ~50-500KB   | ~500KB-5MB   |
| 일일 요청 1000건 기준 | 50-500MB/일 | 500MB-5GB/일 |

> **권장 사항**: 원시 출력은 항상 활성화하지 말고 **디버깅 세션** 또는 **샘플링된 감사**에만 활성화하세요.

### 원본 복구

```ts
import { readRtkRawOutput } from "omniroute/compression/engines/rtk/rawOutput";

const raw = readRtkRawOutput(pointerId); // 압축 통계의 pointerId
if (raw) {
  console.log("원본 출력:", raw);
}
```

`pointerId`는 압축 후 `CompressionStats.rtkRawOutputPointers[]`에 반환됩니다.
함수 시그니처는 `open-sse/services/compression/engines/rtk/rawOutput.ts:102`를 참조하세요.

### 검증 게이트

**RTK 필터 검증**(`open-sse/services/compression/engines/rtk/verify.ts`)은 모든 필터를 해당 `tests[]`에 대해 검증하고, 세 가지 강도 수준 모두에서 동작이 올바른지 확인합니다.

검증을 실행하려면 **`runRtkFilterTests()`를 호출하세요**:

```ts
import { runRtkFilterTests } from "open-sse/services/compression/engines/rtk/verify";

const result = runRtkFilterTests();
console.log(`통과: ${result.outcomes.filter((o) => o.passed).length}`);
console.log(`실패: ${result.outcomes.filter((o) => !o.passed).length}`);
if (!result.passed) {
  console.error("필터가 검증에 실패했습니다");
  result.outcomes
    .filter((o) => !o.passed)
    .forEach((o) => {
      console.error(
        `  - ${o.filterId} / ${o.testName}: 예상값 "${o.expected}", 실제값 "${o.actual}"`
      );
    });
}
```

**검증 항목**:

1. 모든 필터가 로드되고 스키마 검증을 통과하는지 확인
2. 모든 `tests[]` 항목이 예상 출력을 생성하는지 확인
3. `minimal` 강도가 아무 작업도 하지 않는지 확인(원본을 보존하고 구조적 필터만 적용)
4. `aggressive` 강도가 오류, 테스트 실패 및 스택 추적을 보존하는지 확인
5. 압축된 출력이 원본 입력보다 절대 크지 않은지 확인

- 소스: `open-sse/services/compression/engines/rtk/`(63개 파일, ~70KB)

- **필터 변경 사항을 병합하기 전** — 항상 테스트 통과 여부 확인
- **RTK 엔진을 업그레이드한 후** — 스키마가 변경되었을 수 있음
- **모니터링 중 정기적으로** — 테스트 픽스처의 드리프트 방지
- **새로운 도구/명령 계열을 추가할 때** — 새 필터의 정상 작동 입증

---

## 참고 자료

- [COMPRESSION_GUIDE.md](./COMPRESSION_GUIDE.md) — 전체 압축 파이프라인 개요
- [COMPRESSION_ENGINES.md](./COMPRESSION_ENGINES.md) — 엔진 레지스트리 및 내장 엔진
- [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md) — 사용자 정의 엔진, 언어 팩, 스택형 파이프라인
- 소스: `open-sse/services/compression/engines/rtk/` (파일 63개, 약 70KB)
