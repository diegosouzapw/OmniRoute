# 🗜️ Prompt Compression Guide — OmniRoute (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../compression/COMPRESSION_GUIDE.md) · 🇪🇹 [am](../../../am/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇿 [az](../../../az/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇰 [da](../../../da/docs/compression/COMPRESSION_GUIDE.md) · 🇩🇪 [de](../../../de/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇷 [el](../../../el/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇸 [es](../../../es/docs/compression/COMPRESSION_GUIDE.md) · 🇪🇪 [et](../../../et/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/compression/COMPRESSION_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇱 [he](../../../he/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/compression/COMPRESSION_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/compression/COMPRESSION_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇩 [id](../../../id/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇹 [it](../../../it/docs/compression/COMPRESSION_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/compression/COMPRESSION_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇭 [km](../../../km/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/compression/COMPRESSION_GUIDE.md) · 🇲🇲 [my](../../../my/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇴 [no](../../../no/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [or](../../../or/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/compression/COMPRESSION_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/compression/COMPRESSION_GUIDE.md) · 🇱🇰 [si](../../../si/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/compression/COMPRESSION_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/compression/COMPRESSION_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/compression/COMPRESSION_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/compression/COMPRESSION_GUIDE.md) · 🇮🇳 [te](../../../te/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇭 [th](../../../th/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/compression/COMPRESSION_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/compression/COMPRESSION_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/compression/COMPRESSION_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/compression/COMPRESSION_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/compression/COMPRESSION_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/compression/COMPRESSION_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/compression/COMPRESSION_GUIDE.md)

---

> 적격 컨텍스트에서 15~95%를 자동으로 절감합니다. 빠르게 살펴보려면 [README 압축 섹션](../README.md#%EF%B8%8F-prompt-compression--save-15-95-eligible-tokens-automatically)을 참조하세요.

## 개요

OmniRoute는 요청이 업스트림 제공자에 도달하기 **전에 선제적으로** 실행되는 모듈식 프롬프트 압축 파이프라인을 구현합니다. 즉, 워크플로를 변경하지 않아도 투명하게 토큰을 절감할 수 있습니다.

```
클라이언트 요청
  → 압축 전략 선택기
    → 콤보 재정의? → 콤보 설정 사용
    → 자동 실행 임계값? → 자동 모드 사용
    → 기본 모드? → 전역 설정 사용
    → 꺼짐? → 압축 건너뛰기
  → 선택한 압축 모드
    → 꺼짐: 압축 없음
    → Lite: 안전한 공백/서식 정리(~15%)
    → Standard: 전보문체식 군더더기 제거(~30%)
    → Aggressive: 기록 에이징 + 요약(~50%)
    → Ultra: 휴리스틱 가지치기 + 코드 블록 축소(~75%)
    → RTK: 명령어 인식형 터미널/도구 출력 필터링(업스트림 기준 60~90%)
    → Stacked: 순차적 다중 엔진 파이프라인, 일반적으로 RTK 실행 후 Caveman 실행(적격 범위 기준 78~95%)
  → 압축된 요청 → 제공자
```

---

## 압축 모드

### 꺼짐

압축을 적용하지 않습니다. 모든 메시지가 변경 없이 그대로 전달됩니다.

### Lite 모드(약 15% 절감, 지연 시간 <1ms)

가장 안전한 모드로, 의미는 전혀 변경하지 않고 서식만 정리합니다.

| 기법                     | 설명                           |
| ------------------------ | ------------------------------ |
| `collapseWhitespace`     | 연속된 빈 줄과 줄 끝 공백 병합 |
| `dedupSystemPrompt`      | 중복 시스템 메시지 제거        |
| `compressToolResults`    | 장황한 도구/함수 출력 압축     |
| `removeRedundantContent` | 반복되는 지침 제거             |
| `replaceImageUrls`       | base64 이미지 데이터 URI 단축  |

**적합한 용도:** 상시 사용, 안전이 중요한 워크플로.

### Standard 모드(약 30% 절감)

[Caveman](https://github.com/JuliusBrussee/caveman)에서 영감을 받아 의미를 보존하면서 군더더기 단어와 장황한 표현을 제거합니다.

- 군더더기 단어 제거("please", "I think", "basically", "actually")
- 장황한 문구 축약("in order to" → "to", "as a result of" → "because")
- 완곡하고 정중한 표현 제거("Would you mind...", "If you could possibly...")
- 코딩 프롬프트에 맞게 조정된 30개 이상의 정규식 규칙

**적합한 용도:** 일상적인 코딩 워크플로, 비용을 중시하는 팀.

### Aggressive 모드(약 50% 절감)

긴 세션을 위한 스마트 기록 관리 기능입니다.

- **메시지 에이징** — 오래된 메시지일수록 점진적으로 더 많이 압축
- **도구 결과 요약** — 긴 도구 출력을 요약으로 대체
- **구조적 무결성 보호 장치** — `tool_use` + `tool_result` 쌍의 일관성 유지
- **컨텍스트 창 인식** — 모델별 토큰 제한 준수

**적합한 용도:** 장시간 디버깅 세션, 대규모 코드베이스.

### Ultra 모드(약 75% 절감)

토큰이 매우 중요한 상황을 위한 최대 압축 모드입니다.

- **휴리스틱 가지치기** — 관련성 임계값보다 낮은 메시지 제거
- **코드 블록 축소** — 반복적인 코드 예제 압축
- **이진 탐색 절단** — 컨텍스트 창에 맞는 최적의 절단 지점 탐색
- Aggressive 모드의 모든 기능 포함

**적합한 용도:** 컨텍스트 제한에 반복적으로 도달하는 경우.

### RTK 모드(업스트림 기준 60~90%)

RTK 모드는 코딩 에이전트 세션에 나타나는 장황한 도구 출력에 최적화되어 있습니다.

- `git status`, `git diff`, `git log`, 테스트 실행기, TypeScript/Vite/Webpack 빌드, ESLint/Biome/Prettier, npm 감사/설치, Docker 로그, 인프라 출력 및 일반 셸 출력과 같은 명령어/출력 클래스 감지
- `open-sse/services/compression/engines/rtk/filters/`의 JSON 필터 팩 적용
- 프로젝트 또는 전역 `filters.toml` 파일에서 RTK TOML 스키마 v1 필터를 가져오며, 인라인 테스트 검증 및 프로젝트 파일에 대한 신뢰 게이팅 적용
- 인라인 검증 샘플이 포함된 49개의 기본 제공 필터 제공
- ANSI 제어 시퀀스, 진행률 표시줄, 반복되는 줄 및 실행 불가능한 노이즈 제거
- 실패, 오류, 경고, 변경된 파일, 요약 및 긴 출력의 마지막 부분 보존
- 신뢰 게이팅이 적용된 프로젝트 필터, 전역 필터 및 선택적인 수정 처리된 원시 출력 복구 지원

**적합한 용도:** 셸, 빌드, 테스트, git, grep 및 파일 출력 기록이 포함된 에이전트 세션.

### Stacked 모드(적격 범위 기준 78~95%)

Stacked 모드는 여러 압축 엔진을 결정론적 순서로 실행합니다. 기본 파이프라인은 다음과 같습니다.

```txt
RTK -> Caveman
```

이 순서는 먼저 터미널/도구 출력을 간결하게 만든 다음, 남은 자연어 프롬프트에 Caveman 의미 압축을 적용합니다. Stacked 파이프라인은 전역으로 구성하거나 라우팅 콤보에 할당된 압축 콤보를 통해 구성할 수 있습니다.

**적합한 용도:** 대규모 도구 로그와 사용자 지침 또는 어시스턴트 요약이 함께 포함된 혼합 컨텍스트.

---

## 업스트림 절감률 계산

OmniRoute는 업스트림 프로젝트 벤치마크와 OmniRoute 자체 엔진 조합이라는 두 가지 출처를 바탕으로 압축 절감률을 문서화합니다.

| 출처    | 여기에서 사용된 업스트림 README 수치                                                         |
| ------- | -------------------------------------------------------------------------------------------- |
| Caveman | 출력 토큰 `~75%` 감소, 벤치마크 평균 출력 절감률 `65%`, 범위 `22-87%`, 입력 압축 도구 `~46%` |
| RTK     | 명령 출력 절감률 `60-90%`; 샘플 세션 토큰 `~118,000 -> ~23,900`, 즉 `79.7%` 절감(`~80%`)     |

중복되는 도구/컨텍스트 페이로드의 경우 기본 OmniRoute 조합은 다음과 같이 엔진을 연계합니다.

```txt
RTK -> Caveman
```

결합 절감률은 덧셈 방식이 아니라 곱셈 방식으로 계산됩니다.

```txt
결합값 = 1 - (1 - RTK 절감률) * (1 - Caveman 입력 절감률)
평균   = 1 - (1 - 0.80) * (1 - 0.46) = 89.2%
범위   = 1 - (1 - 0.60..0.90) * (1 - 0.46) = 78.4-94.6%
```

이 `78-95%` 수치는 RTK와 Caveman이 동일한 입력/컨텍스트 페이로드를 모두 줄일 수 있을 때 적용됩니다.
Caveman 응답 출력 모드는 별개입니다. 이 모드를 활성화한 경우 Caveman 자체 출력 절감률(평균 `65%`,
대표 수치 `~75%`, 범위 `22-87%`)을 사용합니다. 총 과금 절감률은 프롬프트와 출력의 구성 비율에 따라 달라집니다.

### "대상"의 실제 의미

15-95%라는 대표 범위는 실제 수치이지만, 반복되는 오류 줄, 동일한 경고를 쏟아내는 빌드 로그, 지나치게 큰 `grep`/파일 읽기 덤프와 같은 **중복되거나 장황한** 콘텐츠에만 적용됩니다. 모든 요청에서 그만큼 절감된다는 의미는
**아닙니다**.

실증적으로 검증되었습니다(`tests/unit/compression/stacked-compression-tool-result-savings.test.ts`). 동일한 오류 줄 300개가 포함된 Anthropic 형식의 `tool_result` 블록을 대상으로 `stacked`(RTK + Caveman)를 실행한 결과, **토큰 절감률 95.93% / 문자 절감률 96.26%**를 기록하여 명시된 범위에 정확히 들어왔습니다. 그러나 일반적인 비중복 도구 출력(깔끔한 `grep` 일치 목록, 짧은 파일 읽기, 평범한 대화 텍스트)에 동일한 파이프라인을 실행하면 예상대로 **거의 0에 가까운 절감률**이 나옵니다. 제거할 만한 반복 내용이 없고, `validateCompression()`(`validation.ts`)이 코드 블록, URL, 제목, 버전 또는 ALL-CAPS 상수 식별자를 누락하거나 변경할 수 있는 재작성을 전송하지 않기 때문입니다.

이는 버그가 아니라 예상된 안전 동작입니다. 주로 깔끔한 파일을 읽거나 `grep`으로 검색하는 코딩 세션은 압축을 완전히 활성화하더라도 총 절감률이 크지 않을 수 있지만, 실패 루프나 장황한 린터 출력을 만나는 세션에서는 해당 트래픽에 대해 전체 78-95% 범위의 절감률을 볼 수 있습니다. 단일 세션의 낮은 총 절감률을 압축이 잘못 구성되었다는 증거로 사용하지 마세요. 먼저 기반 도구 출력이 실제로 중복되었는지 확인하세요.

---

## 토큰 절감 시각화

```
압축 미사용:    LLM에 47K 토큰 전송
Lite 사용:      40K 토큰 전송          (15% 절감 — 안전한 상시 적용)
Standard 사용:  33K 토큰 전송          (30% 절감 — caveman-speak 규칙)
Aggressive 사용: 24K 토큰 전송         (50% 절감 — 에이징 + 요약)
Ultra 사용:     12K 토큰 전송          (75% 절감 — 휴리스틱 가지치기)
RTK 사용:       19K-5K 토큰 전송       (명령/도구 출력에서 60-90% 절감)
Stacked 사용:   10K-2.5K 토큰 전송     (적용 가능한 RTK+Caveman 범위에서 78-95% 절감)
```

---

## 구성

### 대시보드

`Dashboard → Context & Cache`로 이동합니다:

- **Caveman** — 모드 선택, 언어 팩, 미리보기 및 전역 기본값
- **RTK** — 명령-필터 미리보기, RTK 안전 설정 및 필터 카탈로그
- **Compression Combos** — 라우팅 콤보에 할당된 명명된 엔진 파이프라인
- **Auto-Trigger Threshold** — 토큰 수가 임계값을 초과할 때 자동으로 압축을 시작

### 콤보별 재정의

`Dashboard → Context & Cache → Compression Combos`에서 라우팅 콤보에 압축 콤보를 할당합니다:

```txt
Combo: "free-tier-fallback"
  Compression Combo: "coding-agent-stack"
  Pipeline: RTK -> Caveman
  Targets:
    1. if/kimi-k2.7-code
    2. if/qwen3.8-max-preview
```

이를 통해 유료 구독에서는 라이트 모드를 유지하면서 무료/코딩 제공업체에서 스택형 압축을 사용할 수 있습니다.

이 "콤보별 재정의" 할당은 **라우팅 콤보 압축 모드** 재정의(Default/Off/Lite/Standard/Aggressive/Ultra)와는 다른 제어 방식입니다. 해당 재정의는 명명된 압축 콤보 파이프라인을 선택하지 않고, `resolveCompressionPlan`이 참조하는 `compressionMode` 필드만 설정합니다. 이는 콤보 카드(`Dashboard → Combos`) 또는 #6760 이후 `Dashboard → Context & Cache → Compression Combos`의 "Assign to routing" 목록에서 파이프라인 할당 체크박스 바로 옆에 있는 라우팅 콤보별로 설정할 수 있습니다. 두 인터페이스 모두 동일한 `PUT /api/combos/{id}` 엔드포인트를 통해 유지됩니다.

### 요청별 재정의

단일 요청에 대한 압축 계획을 재정의하려면 `x-omniroute-compression` 요청 헤더를 보냅니다. 이는 가장 높은 우선순위를 가지며, 라우팅 콤보 재정의, 활성 프로필, 자동 트리거 및 패널 기본값을 능가합니다. 알 수 없는 값은 무시되며(요청이 거부되지 않음) 전역 마스터 스위치는 여전히 모든 것을 제어합니다. 즉, 전역적으로 압축이 꺼져 있으면 헤더가 압축을 켤 수 없습니다. 값:

| 값            | 효과                                                                                  |
| :------------ | :------------------------------------------------------------------------------------ |
| `off`         | 이 요청에 대한 압축 없음.                                                             |
| `default`     | 패널에서 파생된 기본 프로필(활성 프로필 무시). 손실 엔진은 꺼진 상태로 유지됩니다.    |
| `safe`        | 헤더를 생략하는 것과 동일: 중복 제거 및 공백 접기만 적용.                             |
| `allow-lossy` | 요약, 관련성 필터 및 스타일 재작성을 포함하여 이 요청의 연산자 계획을 유지합니다.     |
| `engine:<id>` | 활성화된 경우 단일 엔진, 예: `engine:rtk`. 이는 해당 엔진에 대한 요청별 옵트인입니다. |
| `<combo>`     | 명명된 콤보로, 먼저 이름(대소문자 구분 없음)으로 일치시킨 다음 ID로 일치시킵니다.     |

`allow-lossy`, `engine:<id>` 또는 명명된 콤보가 없으면 손실 엔진은 적용되지 않습니다. 압축이 켜져 있을 때 요청은 여전히 세션 중복 제거 및 공백 접기를 받습니다.

적용된 계획은 `X-OmniRoute-Compression: <mode>; source=<source>` 응답 헤더에 반영되며, 여기서 `<source>`는 `request-header`, `routing-override`, `active-profile`, `auto-trigger`, `default` 또는 `off` 중 하나입니다.

### API

```bash
# 압축 설정 가져오기
curl http://localhost:20128/api/settings/compression

# 압축 설정 업데이트
curl -X PUT http://localhost:20128/api/settings/compression \
  -H "Content-Type: application/json" \
  -d '{"defaultMode":"stacked","autoTriggerMode":"stacked","autoTriggerTokens":32000}'

# 특정 RTK/스택형 페이로드 미리보기
curl -X POST http://localhost:20128/api/compression/preview \
  -H "Content-Type: application/json" \
  -d '{"mode":"rtk","messages":[{"role":"tool","content":"npm test output here"}]}'

# RTK 필터 팩 목록
curl http://localhost:20128/api/context/rtk/filters

# 선택적 명령 메타데이터로 RTK 직접 테스트
curl -X POST http://localhost:20128/api/context/rtk/test \
  -H "Content-Type: application/json" \
  -d '{"command":"npm test","text":"FAIL tests/example.test.ts\nError: boom"}'
```

---

## 보호되는 항목

압축 엔진은 **항상 다음 항목을 보존합니다:**

- ✅ 코드 블록(펜스 및 인라인)
- ✅ URL 및 파일 경로
- ✅ JSON 구조 및 구조화된 데이터
- ✅ 식별자 및 보호되는 기술 토큰
- ✅ 수학 표현식
- ✅ 도구/함수 호출 정의
- ✅ 시스템 프롬프트(라이트 모드)

RTK 원시 출력 복구 기능은 데이터가 저장되기 전에 일반적인 API 키, bearer 토큰, Slack 토큰, AWS 액세스 키,
비밀번호, 토큰 및 비밀 정보를 마스킹합니다.

---

## 압축 통계

압축된 모든 요청에는 서버 로그에 통계가 포함됩니다:

```json
{
  "originalTokens": 47200,
  "compressedTokens": 40120,
  "savingsPercent": 15.0,
  "techniquesUsed": ["collapseWhitespace", "dedupSystemPrompt"],
  "mode": "lite",
  "engine": "caveman",
  "compressionComboId": "coding-agent-stack",
  "durationMs": 0.8,
  "rtkRawOutputPointers": []
}
```

---

## 단계별 로드맵

| 단계   | 모드                                                                                                                               | 상태      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- | --------- |
| 1단계  | Off, Lite                                                                                                                          | ✅ 출시됨 |
| 2단계  | Standard, Aggressive, Ultra                                                                                                        | ✅ 출시됨 |
| 3단계  | RTK, Stacked, Compression Combos                                                                                                   | ✅ 출시됨 |
| 4단계  | Output Styles, SLM-tier Ultra, eval harness                                                                                        | ✅ 출시됨 |
| 4C단계 | 적응형 컨텍스트 예산 ("다이얼") — 컴퓨팅 엔진 + API (`contextBudget` on `PUT /api/settings/compression`) + 대시보드 모드/정책 제어 | ✅ 출시됨 |

---

## 감사의 말

Standard 모드 압축 규칙은 **[JuliusBrussee](https://github.com/JuliusBrussee)**(⭐ 51K+)의 **[Caveman](https://github.com/JuliusBrussee/caveman)**에서 영감을 받았습니다. 이 프로젝트는 "적은 토큰으로 충분한데 왜 많은 토큰을 사용하는가"라는 문구로 널리 알려졌습니다. Caveman은 출력 토큰이 `~75%` 감소하고, 벤치마크 평균 출력 절감률이 `65%`, 출력 절감 범위가 `22-87%`이며, 입력 압축 도구의 절감률은 `~46%`라고 보고합니다.

RTK 모드는 **[RTK AI](https://github.com/rtk-ai)**의 **[RTK - Rust Token Killer](https://github.com/rtk-ai/rtk)**에서 영감을 받았습니다. 이 프로젝트는 터미널, 빌드, 테스트, git 및 도구 출력 필터링을 위한 고성능 명령 출력 압축 프로젝트입니다. RTK는 `60-90%`의 절감률을 보고하며, README의 샘플 세션에서는 `~80%`가 절감된 것으로 나타납니다.

---

## 고급 압축 시스템

7가지 표준 모드 외에도 OmniRoute는 컨텍스트에 따라 자동으로 작동하는 여러 고급 압축 시스템을 포함합니다.

### 캐시 인식 압축

일부 공급자(프롬프트 캐싱을 사용하는 Anthropic 등)는 **프롬프트 캐싱**을 지원하여 프롬프트의 일부를 캐시하여 비용과 지연 시간을 줄일 수 있습니다. 캐싱이 활성화되면 공격적인 압축은 캐시된 토큰을 변경하여 캐시를 무효화하기 때문에 실제로 성능을 **저해**할 수 있습니다.

`cachingAware.ts` 모듈은 **캐싱 컨텍스트를 감지**하고 그에 따라 **압축 전략을 조정**하여 이 문제를 해결합니다.

#### 작동 방식

1.  **캐싱 컨텍스트 감지** — 요청 본문에서 `cache_control` 마커를 스캔합니다.
2.  **캐싱 공급자 식별** — 대상 공급자가 캐싱을 지원하는지 확인합니다.
3.  **전략 조정** — 캐싱 공급자의 경우 `aggressive`/`ultra`를 `standard`로 다운그레이드합니다.
4.  **시스템 프롬프트 건너뛰기** — 시스템 프롬프트는 일반적으로 캐시되므로 압축하지 않습니다.
5.  **결정론적 변환 사용** — 일관된 출력을 생성하는 변환만 사용합니다.

#### 코드 예시

```ts
import {
  detectCachingContext,
  getCacheAwareStrategy,
} from "@omniroute/open-sse/services/compression/cachingAware";

const body = {
  model: "anthropic/claude-sonnet-4.5",
  messages: [{ role: "user", content: "Hello" }],
  cache_control: { type: "ephemeral" }, // ← 캐시 마커
};

const ctx = detectCachingContext(body, { provider: "anthropic" });
// → { hasCacheControl: true, provider: "anthropic", isCachingProvider: true }

const strategy = getCacheAwareStrategy("aggressive", ctx);
// → { strategy: "standard", skipSystemPrompt: true, deterministicOnly: true }
```

#### 사용 시점

캐시 인식 압축은 **항상 켜져 있습니다** — 별도의 구성이 필요 없습니다. 다음 경우에만 작동합니다.

- 요청에 `cache_control` 마커가 있는 경우
- 대상 공급자가 프롬프트 캐싱을 지원하는 경우 (Anthropic, OpenAI 등)

### 점진적 노화 (Progressive Aging)

긴 대화는 많은 메시지 턴을 축적하지만, 오래된 턴은 관련성이 떨어집니다. `progressiveAging.ts` 모듈은 **턴 거리에 따라 메시지를 저하시킵니다**:

- **최근 턴 (0-3)**: 그대로 유지 (전체 세부 정보)
- **중간 턴 (4-8)**: 가벼운 압축 (공백, 서식 정리)
- **오래된 턴 (9+)**: 원시인 압축 (불필요한 내용 제거, 요약)
- **매우 오래된 턴 (20+)**: 심하게 요약되거나 삭제됨

#### 코드 예시

```ts
import { applyAging } from "@omniroute/open-sse/services/compression/progressiveAging";

const messages = [
  { role: "system", content: "You are a helpful assistant" },
  { role: "user", content: "What is 2+2?" },
  { role: "assistant", content: "4" },
  // ... 50개 이상의 턴 ...
];

const { messages: aged, saved } = applyAging(messages, {
  verbatim: 3, // 첫 3개 턴: 그대로
  light: 8, // 4-8 턴: 가벼운 압축
  moderate: 20, // 9-20 턴: 원시인 압축
  // 21+ 턴: 심한 요약
});

// saved = 절약된 토큰 수
```

#### 사용 시점

점진적 노화는 `aggressive` 및 `ultra` 모드에서 **항상 켜져 있습니다**. 특히 다음 경우에 효과적입니다.

- 장시간 코딩 세션
- 여러 날에 걸친 대화
- 많은 도구 호출이 있는 에이전트 워크플로우

### 원시인 출력 모드 (Caveman Output Mode)

`outputMode.ts` 모듈은 모델 자체가 압축되고 간결한 출력("원시인" 스타일)을 생성하도록 **시스템 프롬프트 지침**을 주입합니다.

#### 작동 방식

입력을 압축하는 대신, 이 모드는 다음과 같은 시스템 프롬프트를 추가합니다.

> "최소한의 단어로 답하세요. 불필요한 인사는 건너뛰세요. 짧은 문장을 사용하세요."

이것은 다음 경우에 특히 잘 작동합니다.

- 코드 생성 (간결한 출력 = 적은 토큰)
- 빠른 Q&A (정교한 설명 불필요)
- 일괄 처리 (처리량 극대화)

#### 사용 시점

원시인 출력 모드는 **선택 사항**입니다 — 콤보 구성을 통해 설정합니다.

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "outputMode": "caveman"
    }
  }
}
```

### 출력 스타일 (카탈로그)

위의 원시인 출력 모드는 **레거시 단일 스타일 경로**입니다. Phase 4에서는 이를 구성 가능한 출력 스타일 카탈로그로 일반화했습니다: `open-sse/services/compression/outputStyles/catalog.ts`의 `OUTPUT_STYLE_CATALOG`. 각 스타일은 모델 자체가 더 저렴한 출력을 생성하도록 하는 시스템 프롬프트 지침이며, 스타일은 함께 활성화될 수 있고 카탈로그 순서대로 주입됩니다.

| 스타일                        | `id`          | 기능                                                                                                                                                                                               | 지시어 언어                                      |
| ----------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| 간결한 산문                   | `terse-prose` | 불필요한 단어/관사/완곡어법을 제거하고 기술적 내용은 정확하게 유지합니다. 레거시 caveman 출력 모드와 동일한 텍스트입니다(참조되었으며 다시 입력되지 않음).                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| 코드 줄이기                   | `less-code`   | YAGNI 원칙: 최소한의 작동 변경, 요청하지 않은 추상화 없음.                                                                                                                                         | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| 포니테일 (게으른 선임 개발자) | `ponytail`    | "최고의 코드는 작성되지 않은 코드": 재사용 > 재작성, 근본 원인 > 증상, 가장 짧은 작동 차이.                                                                                                        | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| ADHD가 있습니다 (행동 우선)   | `i-have-adhd` | 행동 우선 (산문보다 명령/경로/코드 조각), 번호가 매겨진 제한된 단계, 하나의 구체적인 다음 단계, 서문/요약/마무리 없음. [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (MIT)에서 채택. | en, pt-BR, es, de, fr, it, ru, zh, ja, id, vi    |
| 간결한 CJK (文言)             | `terse-cjk`   | 고전 중국어의 초간결 스타일.                                                                                                                                                                       | zh (로케일 제한: 해결된 언어가 `zh`일 때만 제공) |

모든 스타일은 `lite`, `full`, `ultra` 세 가지 강도 수준을 제공하며, 모든 수준은
코드 블록, 파일 경로, 명령, 오류 문자열, URL 및 식별자를 그대로 유지하는
공통 경계 절로 끝납니다.

#### 주입 작동 방식

`applyOutputStyles()` (`open-sse/services/compression/outputStyles/apply.ts`)는
카탈로그에 대해 선택 사항을 해결하고 (알 수 없는 ID 및 로케일 불일치 스타일은
삭제되며 오류가 발생하지 않음), 카탈로그 순서대로 선택된 지침을 연결하고,
경계 절을 **한 번** 추가한 다음, 단일 멱등성 마커 (`[OmniRoute Output Styles]`)
뒤에 시스템 프롬프트에 결과를 미리 로드합니다. 다시 적용하는 것은 아무런
작용도 하지 않습니다. 감지된 요청 언어에 번역이 있는 경우, 영어 대신 현지화된
지침이 주입됩니다.

#### 활성화 방법

대시보드에서: **Context → Settings → Compression** — 각 스타일에 대해 켜기/끄기
토글과 수준 선택기가 있는 한 줄. 프로그래밍 방식으로 압축 구성은 선택 사항을
다음과 같이 유지합니다.

```json
{
  "outputStyles": [
    { "id": "i-have-adhd", "level": "full" },
    { "id": "less-code", "level": "lite" }
  ]
}
```

하위 호환성: 레거시 `outputMode: "caveman"` 콤보 설정은 여전히 작동하며
`terse-prose`에 매핑되며, 모든 레거시 언어에서 이전 주입과 바이트 단위로
동일합니다.

언어 선택: `languageConfig.enabled`가 켜져 있으면 `autoDetect`가 최신 사용자
메시지의 언어를 선택합니다 (입력 엔진과 동일한 감지기). `autoDetect`를 끄면
`defaultLanguage`가 고정됩니다. 끄면 → 영어.

스타일 × 언어 매트릭스는
`tests/unit/compression/output-styles-i18n-matrix.test.ts`에 의해 고정됩니다.
새로운 스타일은 최소한 pt-BR 번역 (또는 명시적으로 추적된 예외) 없이는
제공될 수 없으며, 기존 스타일은 로케일을 조용히 잃을 수 없습니다. 스타일을
추가하려면 [EXTENDING_COMPRESSION.md](./EXTENDING_COMPRESSION.md#adding-an-output-style)를
참조하십시오.

### 도구 결과 압축

`toolResultCompressor.ts` 모듈은 도구 결과 (함수 호출, 에이전트 출력, 검색 결과 등)에
대한 **5가지 특수 압축 전략**을 제공합니다.

1. **검색 결과 압축** — 중복 결과를 제거하고 상위 N개를 유지합니다.
2. **파일 읽기 압축** — 큰 파일을 자르고 헤더/가져오기를 보존합니다.
3. **코드 실행 압축** — 필수 stdout/stderr만 유지합니다.
4. **데이터베이스 쿼리 압축** — 행을 제한하고 자세한 메타데이터를 제거합니다.
5. **API 응답 압축** — null 필드를 제거하고 배열을 압축합니다.

#### 사용 시기

도구 결과 압축은 도구 호출이 있을 때 **항상 켜져 있습니다**. 구성이 필요하지 않습니다.

### 스택형 파이프라인

스택형 모드는 **여러 엔진을 순서대로 실행**합니다. 일반적으로 RTK가 먼저 실행되고
(도구 출력에서 60-90% 절약), 그 다음 Caveman이 실행됩니다 (나머지 텍스트에서
추가 30% 절약). 이를 통해 **총 78-95%의 절약**을 달성합니다.

#### 작동 방식

```
입력 (1000 토큰)
  → RTK (명령 인식 필터) → 200 토큰
    → Caveman (필러 제거) → 140 토큰
  → 출력 (140 토큰, 86% 절약)
```

#### 사용 시기

다음과 같은 경우 스택형 모드를 사용하십시오.

- 도구 중심 워크플로우 (에이전트 코딩, 연구)
- 비용에 민감한 배치 처리
- 최대 토큰 절약이 필요할 때

콤보를 통해 구성:

```json
{
  "strategy": "auto",
  "config": {
    "auto": {
      "modePack": "stacked"
    }
  }
}
```

---

## 콤보별 압축 재정의

다양한 사용 사례에 맞게 동작을 세밀하게 조정할 수 있도록 전역 압축 모드를 **콤보별로** 재정의할 수 있습니다.

```json
{
  "id": "coding-combo",
  "strategy": "priority",
  "config": {
    "auto": {
      "weights": { "taskFit": 0.5 },
      "modePack": "quality-first"
    }
  },
  "compressionOverride": {
    "mode": "aggressive",
    "stackedPipelines": ["rtk", "caveman"],
    "preserveToolDefinitions": true
  }
}
```

다음과 같은 경우에 유용합니다.

- **코딩 콤보**: 긴 세션에는 `aggressive` 모드 사용
- **빠른 Q&A 콤보**: 빠른 응답에는 `lite` 모드 사용
- **도구 중심 콤보**: 비용을 최대한 절감하려면 `stacked` 모드 사용
- **프로덕션 콤보**: 캐싱 제공자에는 `cache-aware` 모드 사용

---

## 함께 보기

- [환경 설정](../reference/ENVIRONMENT.md) — 압축 환경 변수
- [아키텍처 가이드](../architecture/ARCHITECTURE.md) — 압축 파이프라인 내부 구조
- [사용자 가이드](../guides/USER_GUIDE.md) — 압축 시작하기
- [RTK 압축](./RTK_COMPRESSION.md) — RTK 필터, 신뢰 모델, 검증 게이트, 원시 출력 복구
- [압축 엔진](./COMPRESSION_ENGINES.md) — Caveman, RTK, 스택형 구성, API, MCP, 대시보드
- [압축 규칙 형식](./COMPRESSION_RULES_FORMAT.md) — JSON 규칙 팩 형식
- [압축 언어 팩](./COMPRESSION_LANGUAGE_PACKS.md) — 언어별 Caveman 규칙
