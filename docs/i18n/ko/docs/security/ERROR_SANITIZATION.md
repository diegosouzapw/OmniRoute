# Error Message Sanitization (한국어)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **신뢰할 수 있는 원본:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` 및 `open-sse/utils/error.ts`의 공개 빌더
> **테스트:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **최종 업데이트:** 2026-09-02 — v3.8.51
> **대상:** 오류 응답을 다루는 모든 엔지니어(HTTP 라우트, SSE 스트림, 실행기, MCP 핸들러).
> **상태:** 클라이언트에 오류 메시지를 반환하는 모든 코드 경로에서 **필수**입니다.

## 이 문서가 존재하는 이유

CodeQL 규칙 `js/stack-trace-exposure`(CWE-209)는 런타임 예외에서 발생한 오류 메시지가 정제되지 않은 채 HTTP / SSE 응답에 도달하는 모든 코드 경로를 탐지합니다. 프로덕션 응답에 포함된 스택 추적과 절대 파일 경로는 공격자에게 다음 정보를 제공합니다.

- 내부 디렉터리 구조(`/srv/app/src/lib/...`) → 추가 공격을 위한 정찰 정보.
- 스택 프레임에서 유추한 라이브러리 / 프레임워크 버전 → 표적 익스플로잇 선택.
- 오류에 문자열로 보간될 수 있는 민감한 런타임 값(DB 쿼리, 구성 값).

`open-sse/utils/error.ts`에서 내보내는 `sanitizeErrorMessage` 헬퍼는 다음 유형의
정보 유출을 제거합니다.

1. 물리적 형태, 직렬화된 형태 및 명백한 인라인 형태의 JavaScript 스택 프레임 뒷부분.
2. 안전한 HTTPS URL과 명시적으로 표시된 API 라우트는 보존하면서 절대 POSIX, Windows, UNC 및 `file://` 파일 시스템 경로 제거.
3. 자격 증명 할당, 일반적인 공급자 토큰 형식, 비공개 키 PEM 블록 및 base64 데이터
   URL.

정제기는 입력 길이를 제한하며, throw된 값을 문자열로 강제 변환할 때 오류가 발생하면 안전한 방식으로 실패합니다.
재귀적인 업스트림 JSON 정제는 응답이 직렬화되기 전에 안전하지 않은 자격 증명/경로 키, 세션 별칭 및
프로토타입 제어 키도 제거합니다.

## 필수 패턴

### 1. 오류 응답 생성(HTTP / API 라우트)

`buildErrorBody()`를 사용하세요. 정제 기능이 기본으로 포함되어 있습니다.

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... 핸들러 로직 ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

또는 같은 모듈의 편의 래퍼를 사용하세요.

```ts
import {
  errorResponse, // 일회성 Response 객체
  writeStreamError, // SSE 작성기
  createErrorResult, // { success: false, status, response, ... } 형태
  unavailableResponse, // Retry-After 추가
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

이들은 모두 표준 공개 오류 경계를 적용합니다. `errorResponse`, `writeStreamError` 및
`createErrorResult`는 `buildErrorBody`를 거치며, 세 가지 특수 재시도/회로 헬퍼는
공개 컨텍스트를 직접 투영하고 정제합니다. 이러한 헬퍼를 사용할 때는 **`sanitizeErrorMessage`를
직접 호출할 필요가 없습니다**.

### 2. 사용자 정의 오류 봉투(드문 경우)

위의 헬퍼를 사용할 수 없는 경우(예: 응답 형태가 Connect-RPC 같은 업스트림 프로토콜에 의해 결정되는 경우)에는 `sanitizeErrorMessage`를 직접 가져오세요.

```ts
import { sanitizeErrorMessage } from "@omniroute/open-sse/utils/error.ts";

const body = JSON.stringify({
  error: {
    message: sanitizeErrorMessage(rawMessage),
    type: "invalid_request_error",
    code: "",
  },
});
```

이것이 사용자 정의 오류 본문을 구성할 수 있는 유일하게 승인된 방법입니다. 참조 구현은 `open-sse/executors/cursor.ts::buildErrorResponse`를 확인하세요.

### 3. 로깅과 응답의 차이

신뢰할 수 있는 내부 예외는 운영자가 디버깅할 수 있도록 전체 메시지와 스택을 유지할 수 있습니다. 공급자, 유효성 검사, 브라우저 세션 또는 자격 증명 인접 경계에서
발생한 값은 콘솔 출력, 감사 메타데이터 또는 영구 호출 로그에 들어가기 전에
정제해야 합니다. 패턴:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // 신뢰할 수 있는 내부 예외만 해당
  return errorResponse(500, getErrorMessage(err)); // 정제됨 — 클라이언트로 전송
}
```

공급자가 제어하는 실패의 경우에는 로깅되는 값도 투영하세요.

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. 금지된 패턴

❌ 원시 예외 출력을 Response 본문에 **절대** 넣지 마세요.

```ts
// 잘못된 예: 스택 추적과 파일 경로가 클라이언트에 전달됨
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ 첫 번째 줄만 추출하는 로직을 직접 **절대** 작성하지 마세요.

```ts
// 잘못된 예: 절대 경로 제거를 누락하며 표준 헬퍼와 동작이 달라질 수 있음
const safe = String(err).split("\n")[0];
```

❌ 라우트에서만 정제하고 SSE 경로를 누락하는 일이 **절대** 없어야 합니다. 스트림에 쓰는 모든 항목은 `writeStreamError`(또는 그 내부의 `buildErrorBody`)를 거쳐야 합니다.

❌ 오류 메시지에 `process.cwd()`, `__filename`, `__dirname` 또는 환경 변수에서 파생된 경로를 의도적으로 포함하지 **마세요**. 정제기는 심층 방어 수단으로 절대 경로를 처리하지만, 호출자는 애초에 시스템 구조를 노출하는 메시지를
구성해서는 안 됩니다.

## CI의 커버리지

`tests/unit/error-message-sanitization.test.ts`는 다음을 검증합니다.

- `/api/model-combo-mappings/*` 아래의 모든 라우트가 4xx/5xx 응답에서 정제된 본문을 반환합니다.
- `sanitizeErrorMessage`가 여러 줄로 된 스택 추적을 제거합니다.
- `sanitizeErrorMessage`가 POSIX 및 Windows 절대 경로를 `<path>`로 대체합니다.
- `sanitizeErrorMessage`가 `null`/`undefined`/`Error` 인스턴스 입력을 안전하게 처리합니다.
- `buildErrorBody`가 `message` 필드에 스택 추적을 노출하지 않습니다.

새 라우트나 실행기를 추가할 때는 이 파일의 어설션 패턴을 복사하세요. 커버리지 게이트(`npm run test:coverage`)는 구문/줄/함수/분기 커버리지가 60% 이상이 되도록 강제하므로 오류 경로도 반드시 포함해야 합니다.

## 관련 제어

- `.github/security`의 `js/stack-trace-exposure` CodeQL 알림은 항상 이러한 헬퍼를 사용해 수정하거나, 이 문서를 인용하는 코멘트와 함께 해제해야 합니다.
- `pino` 삭제 설정(`src/shared/utils/logRedaction.ts`)은 신뢰할 수 있는 구조화된 로그를 별도로 처리합니다. 이 문서는 공개 응답 메시지와 영구적인 호출/프록시 로그 경계를 통과하는 공급자 제어 값을 다룹니다.
- 업스트림 헤더 거부 목록(`src/shared/constants/upstreamHeaders.ts`)은 헤더 유출을 처리합니다. 새로운 정보 유출 문제를 추가할 때는 두 파일의 내용을 서로 일치시키세요.

## 업스트림 세부 정보 전달

`buildErrorBody`는 선택적인 세 번째 인수 `upstreamDetails`(업스트림 공급자로부터 받은 원시 파싱 본문)를 받습니다. 이 인수가 제공되면 응답에 `upstream_details`로 포함되기 전에 `sanitizeUpstreamDetails`를 통해 정제됩니다.

선택적인 네 번째 인수 `classification` (`{ type?: string; code?: string; reason?: string }`)은 명시적인 공개 분류를 받습니다. 각 필드는 제한된 공개 식별자 어휘로 투영됩니다. 안전하지 않거나, 자격 증명 형태이거나, 제어 문자를 포함하거나, 지나치게 긴 값은 상태에서 파생된 유형/코드로 대체되며, 안전하지 않은 선택적 사유는 생략됩니다. 세 자리 HTTP 상태 식별자(`100`부터 `599`까지)는 숫자형 업스트림 상태를 기계 판독 가능한 코드로 노출하는 공급자 계약에서 계속 유효합니다. 로컬에서 생성된 HTTP 상태 자리표시자 형식에도 동일한 제한 범위가 허용되며, 임의의 공급자 숫자와 이름은 해당 어휘에 포함되지 않습니다.

모든 명시적 분류는 해당 네 번째 인수로 전달하세요. `buildErrorBody()`가 반환된 후에는 `body.error.code`, `body.error.type` 또는 `body.error.reason`을 절대로 덮어쓰지 마세요. 빌더 호출 후의 변경은 공개 투영을 우회합니다.

`upstreamDetails`에 적용되는 정제 규칙은 다음과 같습니다.

1. 문자열 리프: `sanitizeErrorMessage`를 통해 처리합니다(스택 및 절대 경로 제거).
2. 안전하지 않은 경로, 자격 증명, 세션 별칭 및 프로토타입 제어 키를 제거합니다.
3. 깊이 제한: 4단계를 초과하는 중첩은 문자열 `"[truncated]"`로 대체됩니다.
4. 배열은 32개 요소로 제한됩니다.

파싱된 공급자 오류 본문이 있는 호출 지점만 `upstreamDetails`를 전달해야 합니다. 내부 OmniRoute 오류(SSE 파싱 실패, 빈 콘텐츠, 가드레일 차단)에는 이를 포함하면 안 됩니다.

원시 `err.stack`, `err.message` 또는 런타임 예외에서 얻은 문자열을 `upstreamDetails`로 전달하지 마세요. 이러한 값은 업스트림 본문 없이 계속 `errorResponse` / `buildErrorBody(code, msg)`를 통해 처리해야 합니다.

선택적 업스트림 4xx 전달은 클라이언트 자동 복구에 필요한 공급자의 안전한 JSON 구조와 문구를 보존하지만, 바이트 단위로 동일하게 전달하지는 않습니다. 직렬화 전에 항상 재귀 정제기가 실행됩니다. 순환 참조가 있거나 BigInt를 포함하거나 악의적인 `toJSON()`을 가진 본문은 안전하게 실패 처리되며 전달 대상에서 제외됩니다. OCR과 조정에도 동일한 규칙이 적용됩니다. JSON이 아니거나, 비어 있거나, 잘못된 레이블이 지정된 업스트림 본문은 표준 OmniRoute JSON 오류 엔벌로프로 변환됩니다.

## 알려진 CodeQL 제한 사항: 사용자 지정 새니타이저를 인식하지 못함

CodeQL 쿼리 [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)는 고정된 새니타이저 패턴 허용 목록(예: 인라인 `.split("\n")[0]`, 특정 정규식 형태를 사용하는 `String#replace`, `Error`의 `.message` 접근)을 사용합니다. 이 쿼리는 `sanitizeErrorMessage()`와 같은 사용자 지정 헬퍼를 통한 간접 처리를 **인식하지 못합니다**.

따라서 이 모듈을 통해 확실히 새니타이징하는 호출 지점(예: `open-sse/utils/error.ts::errorResponse` 및 `open-sse/executors/cursor.ts::buildErrorResponse`)에서도 코드가 기능적으로 안전함에도 불구하고 경고가 계속 발생할 수 있습니다. 이전 기각 사례: `#224`, `#231`(2026년 5월). 두 사례 모두 기술적 근거와 함께 `false positive`로 표시되었습니다.

**새로운 발생 건을 처리하는 방법:**

1. 해당 호출 지점에서 메시지가 실제로 `sanitizeErrorMessage` / `buildErrorBody` / 위에 문서화된 래퍼 중 하나를 거치는지 확인합니다(호출 체인을 처음부터 끝까지 검토하고 주석을 그대로 신뢰하지 마십시오).
2. `tests/unit/error-message-sanitization.test.ts`에서 해당 경로를 테스트하는지 확인합니다(그렇지 않다면 테스트 커버리지를 추가합니다).
3. 이 문서를 참조하여 `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'`로 경고를 기각합니다.
4. 모든 위치에 `.split("\n")[0]`을 인라인하는 방식으로 "수정"하지 **마십시오**. 이 헬퍼가 단일 진실 공급원입니다. 스캐너를 만족시키는 것처럼 보이기 위해 패턴을 중복하면 새니타이저의 기능(경로 제거, 길이 제한, 형 변환)이 약화됩니다.

CodeQL의 [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/)와 같은 옵트인 기능을 도입하는 것이 장기적인 해결책이며, 이는 이 문서의 범위를 벗어납니다.

## 참고 자료

- [CWE-209: 오류 메시지를 통한 정보 노출](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: 오류 처리 치트 시트](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- 헬퍼를 중앙화한 커밋: `1a39c31f` — _fix(security): 공개 업스트림 자격 증명 마스킹 + 오류 새니타이징 중앙화_
