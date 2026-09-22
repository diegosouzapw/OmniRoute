# Error Message Sanitization (አማርኛ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **ዋና የእውነት ምንጭ:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`፣ እና በ`open-sse/utils/error.ts` ውስጥ ያሉ ይፋዊ builders
> **ሙከራዎች:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **መጨረሻ የተዘመነው:** 2026-09-02 — v3.8.51
> **የታለመለት ታዳሚ:** የስህተት ምላሾችን የሚነካ ማንኛውም መሐንዲስ (HTTP routes፣ SSE streams፣ executors፣ MCP handlers)።
> **ሁኔታ:** የስህተት መልዕክትን ለደንበኛ ለሚመልስ ለእያንዳንዱ የኮድ መንገድ **ግዴታ** ነው።

## ይህ ለምን እንደሚኖር

የCodeQL ደንብ `js/stack-trace-exposure` (CWE-209) ከruntime exception የመነጨ የስህተት መልዕክት ሳይጸዳ HTTP / SSE ምላሽ ላይ የሚደርስበትን ማንኛውንም የኮድ መንገድ ይጠቁማል። በproduction ምላሾች ውስጥ ያሉ stack traces እና absolute file paths ለአጥቂዎች የሚከተሉትን ይሰጣሉ፦

- ውስጣዊ የdirectory አቀማመጥ (`/srv/app/src/lib/...`) → ለተጨማሪ ጥቃቶች መረጃ ማሰባሰብ።
- ከstack frames የሚገመቱ የlibrary / framework ስሪቶች → የተወሰነ የጥቃት ዘዴ ምርጫ።
- በስህተቶች ውስጥ string-interpolated ሊሆኑ የሚችሉ ስሱ runtime እሴቶች (DB queries፣ config values)።

በ`open-sse/utils/error.ts` የሚላከው `sanitizeErrorMessage` helper እነዚህን የመረጃ
ፍሰት አይነቶች ያስወግዳል፦

1. አካላዊ፣ serialized እና በግልጽ inline የሆኑ የJavaScript stack-frame ጭራዎች።
2. ደህንነቱ የተጠበቀ HTTPS URLs እና በግልጽ ምልክት የተደረገባቸው API routes እንዳሉ በመጠበቅ፣ absolute POSIX፣ Windows፣ UNC እና `file://` filesystem paths።
3. የcredential ምደባዎች፣ የተለመዱ የprovider token ቅርጸቶች፣ private-key PEM blocks እና base64 data
   URLs።

sanitizer የግብዓት ርዝመትን ይገድባል፣ እንዲሁም thrown value ወደ string መቀየርን ካልተቀበለ በአስተማማኝ ሁኔታ ይዘጋል።
Recursive upstream JSON sanitization ምላሹ serialized ከመሆኑ በፊት ደህንነታቸው ያልተጠበቀ credential/path keys፣ session aliases እና
prototype-control keys ያስወግዳል።

## ግዴታ የሆነው ንድፍ

### 1. የስህተት ምላሽ መገንባት (HTTP / API routes)

`buildErrorBody()` ይጠቀሙ — sanitization በውስጡ ተካትቷል፦

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... የhandler አመክንዮ ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

ወይም፣ በተመሳሳይ module ውስጥ ላሉት ምቹ wrappers፦

```ts
import {
  errorResponse, // አንድ ጊዜ ብቻ የሚጠቀሙበት Response object
  writeStreamError, // SSE writer
  createErrorResult, // የ{ success: false, status, response, ... } ቅርጽ
  unavailableResponse, // Retry-After ይጨምራል
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

እነዚህ ሁሉ canonical public-error boundaryን ይተገብራሉ። `errorResponse`፣ `writeStreamError` እና
`createErrorResult` በ`buildErrorBody` በኩል ያልፋሉ፤ ሦስቱ ልዩ retry/circuit helpers
ይፋዊ contextቸውን በቀጥታ ያጣራሉ እና ያጸዳሉ። እነዚህን helpers ሲጠቀሙ **`sanitizeErrorMessage`ን በእጅ መጥራት
ፈጽሞ አያስፈልግዎትም**።

### 2. ብጁ የስህተት envelopes (አልፎ አልፎ)

ከላይ ያሉትን helpers መጠቀም በማይችሉበት ጊዜ (ለምሳሌ፣ የምላሹ ቅርጽ እንደ Connect-RPC ባለ upstream protocol ሲወሰን)፣ `sanitizeErrorMessage`ን በቀጥታ import ያድርጉ፦

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

ብጁ የስህተት body ለመገንባት የተፈቀደው ብቸኛው መንገድ ይህ ነው። ለማጣቀሻ implementation `open-sse/executors/cursor.ts::buildErrorResponse`ን ይመልከቱ።

### 3. Logging እና responding

ታማኝ ውስጣዊ exceptions፣ operators debug ማድረግ እንዲችሉ ሙሉ መልዕክታቸውን እና stackቸውን ሊይዙ ይችላሉ።
ከprovider፣ validation፣ browser-session ወይም credential-adjacent boundaries የሚመነጩ እሴቶች ወደ console output፣ audit metadata ወይም persistent call logs ከመግባታቸው በፊት
መጽዳት አለባቸው። ንድፍ፦

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // ለታማኝ ውስጣዊ exception ብቻ
  return errorResponse(500, getErrorMessage(err)); // የጸዳ — ለደንበኛ ይላካል
}
```

በprovider ለሚቆጣጠራቸው failures፣ የሚመዘገበውን እሴትም ያጣሩ፦

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. የተከለከሉ ንድፎች

❌ ጥሬ exception outputን በResponse body ውስጥ **ፈጽሞ** አያስገቡ፦

```ts
// መጥፎ፦ stack trace እና file paths ወደ ደንበኛው ይደርሳሉ
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ የራስዎን first-line splitter **ፈጽሞ** አይፍጠሩ፦

```ts
// መጥፎ፦ absolute pathsን ማስወገድ ይረሳል፣ ከcanonical helper ሊለይ ይችላል
const safe = String(err).split("\n")[0];
```

❌ በroute ውስጥ sanitize አድርገው የSSE pathን **ፈጽሞ** አይርሱ። ወደ stream የሚጽፍ ማንኛውም ነገር በ`writeStreamError` (ወይም በመሠረታዊው `buildErrorBody`) በኩል ያልፋል።

❌ `process.cwd()`፣ `__filename`፣ `__dirname` ወይም ከenv የተገኙ pathsን በስህተት መልዕክቶች ውስጥ ሆን ብለው **ፈጽሞ** አያካትቱ።
sanitizer እንደ defense in depth absolute pathsን ይሸፍናል፣ ነገር ግን callers ከመጀመሪያው ጀምሮ topology-bearing messagesን
መገንባት የለባቸውም።

## በCI ውስጥ ያለ ሽፋን

`tests/unit/error-message-sanitization.test.ts` የሚከተሉትን ያስገድዳል፦

- በ`/api/model-combo-mappings/*` ስር ያለ እያንዳንዱ route ለ4xx/5xx የተጣሩ body-ዎችን ይመልሳል።
- `sanitizeErrorMessage` ባለብዙ መስመር stack trace-ዎችን ያስወግዳል።
- `sanitizeErrorMessage` የPOSIX እና Windows absolute path-ዎችን በ`<path>` ይተካል።
- `sanitizeErrorMessage` የ`null`/`undefined`/`Error` instance ግብዓቶችን በደህና ያስተናግዳል።
- `buildErrorBody` በ`message` field ውስጥ stack trace-ዎችን ፈጽሞ አያጋልጥም።

አዲስ route ወይም executor ሲጨምሩ፣ የassertion pattern-ን ከዚህ file ይቅዱ። የcoverage gate (`npm run test:coverage`) የstatements/lines/functions/branches ሽፋን ≥60% እንዲሆን ያስገድዳል — error path-ዎች መሸፈን አለባቸው።

## ተዛማጅ ቁጥጥሮች

- በ`.github/security` ውስጥ ያሉ `js/stack-trace-exposure` CodeQL alert-ዎች ሁልጊዜ **ወይ** በእነዚህ helper-ዎች መስተካከል **ወይም** ይህን doc በሚጠቅስ comment ውድቅ መደረግ አለባቸው።
- የ`pino` redaction config (`src/shared/utils/logRedaction.ts`) የታመኑ structured log-ዎችን ለብቻው ያስተናግዳል። ይህ document በpersistent call/proxy-log boundary-ዎች የሚያልፉ public response message-ዎችን እና በprovider የሚቆጣጠሩ value-ዎችን ይሸፍናል።
- Upstream-header denylist (`src/shared/constants/upstreamHeaders.ts`) የheader ፍሰትን ይሸፍናል — አዲስ exfiltration ስጋት ሲጨምሩ ሁለቱንም file-ዎች አስተካክለው ያቆዩ።

## የUpstream ዝርዝሮች passthrough

`buildErrorBody` አማራጭ ሦስተኛ argument የሆነውን `upstreamDetails` (ከupstream provider የመጣ raw parsed body) ይቀበላል። ሲቀርብ፣ በresponse ውስጥ እንደ `upstream_details` ከመካተቱ በፊት በ`sanitizeUpstreamDetails` ይጣራል።

አማራጭ አራተኛ argument የሆነው `classification`
(`{ type?: string; code?: string; reason?: string }`) ግልጽ public classification ይቀበላል።
እያንዳንዱ field ወደተገደበው public-identifier vocabulary ይ映射ል። ደህንነቱ ያልተጠበቀ፣ credential-ን የሚመስል፣
control-character ያለው፣ ወይም ከመጠን በላይ ረጅም value ወደ status-derived type/code ይመለሳል፤ ደህንነቱ ያልተጠበቀ አማራጭ
reason ይቀራል። ባለሦስት አሃዝ HTTP status identifier-ዎች (`100` እስከ `599`) የቁጥራዊውን upstream status እንደ machine-readable code ለሚያጋልጡ
provider contract-ዎች የሚሰሩ ሆነው ይቀጥላሉ። ተመሳሳዩ የተገደበ range በአካባቢው በሚፈጠረው HTTP-status placeholder form ውስጥም ተቀባይነት አለው፤ የዘፈቀደ provider
ቁጥሮች እና ስሞች ከvocabulary-ው ውጭ ሆነው ይቆያሉ።

እያንዳንዱን ግልጽ classification በዚያ አራተኛ argument ውስጥ ያስተላልፉ። `buildErrorBody()` ከተመለሰ በኋላ
`body.error.code`፣ `body.error.type`፣ ወይም `body.error.reason`-ን ፈጽሞ overwrite አያድርጉ፤
ከbuilder በኋላ የሚደረግ mutation public projection-ን ያልፋል።

በ`upstreamDetails` ላይ የሚተገበሩ የማጣሪያ ደንቦች፦

1. String leaf-ዎች፦ በ`sanitizeErrorMessage` ያሳልፉ (stack-ዎችን + absolute path-ዎችን ያስወግዳል)።
2. ደህንነታቸው ያልተጠበቀ path፣ credential፣ session-alias እና prototype-control key-ዎች ይወገዳሉ።
3. የጥልቀት ገደብ፦ ከ4 ደረጃዎች በላይ ያለ nesting በstring `"[truncated]"` ይተካል።
4. Array-ዎች በ32 elements ይገደባሉ።

parsed provider error body ያላቸው call site-ዎች ብቻ `upstreamDetails`-ን ማስተላለፍ አለባቸው። የውስጥ OmniRoute
error-ዎች (SSE parse failure-ዎች፣ ባዶ content፣ guardrail block-ዎች) ሊያካትቱት አይገባም።

raw `err.stack`፣ `err.message`፣ ወይም ከruntime exception የመጣ ማንኛውንም string ወደ
`upstreamDetails` አያስተላልፉ። እነዚህ አሁንም upstream body ሳይኖር
በ`errorResponse` / `buildErrorBody(code, msg)` ማለፍ አለባቸው።

የተመረጡ upstream 4xx-ዎች passthrough በclient auto-recovery የሚፈለገውን የprovider-ውን ደህንነቱ የተጠበቀ JSON shape እና አገላለጽ ይጠብቃል፣
ነገር ግን byte-for-byte passthrough አይደለም፦ recursive sanitizer-ው ሁልጊዜ ከserialization በፊት ይሰራል። Cyclic፣ BigInt የያዙ፣ ወይም ጠላትነት ያለው `toJSON()` የያዙ body-ዎች fail closed ያደርጋሉ እና ለpassthrough ብቁ አይሆኑም። OCR እና moderation ተመሳሳይ ደንብ ይተገብራሉ፤ JSON ያልሆኑ፣ ባዶ፣ ወይም በተሳሳተ መለያ የቀረቡ upstream body-ዎች ወደ canonical OmniRoute JSON error envelope ይቀየራሉ።

## የሚታወቅ የCodeQL ገደብ፦ ብጁ የማጽጃ ተግባራት አይታወቁም

የCodeQL መጠይቅ [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) የተወሰነ የማጽጃ ንድፎች ፈቃድ-ዝርዝርን ይጠቀማል (ለምሳሌ፦ በቦታው ላይ `.split("\n")[0]`፣ የተወሰኑ የregex ቅርጾች ያሉት `String#replace`፣ በ`Error` ላይ ወደ `.message` መድረስ)። እንደ እኛ `sanitizeErrorMessage()` ያለ ብጁ ረዳት በኩል የሚደረግ ተዘዋዋሪ ጥሪን **አያውቅም**።

ይህም በዚህ ሞጁል በኩል መልዕክቱን እንደሚያጸዱ በግልጽ ማረጋገጥ የሚቻልባቸው የጥሪ ቦታዎች — ለምሳሌ `open-sse/utils/error.ts::errorResponse` እና `open-sse/executors/cursor.ts::buildErrorResponse` — ኮዱ በተግባር ደህንነቱ የተጠበቀ ቢሆንም ማንቂያውን ማስነሳታቸውን ሊቀጥሉ ይችላሉ ማለት ነው። ቀደም ሲል የተደረጉ ውድቅ ማድረጎች፦ `#224`፣ `#231` (ግንቦት 2026)፤ ሁለቱም ከቴክኒካዊ ማስረጃ ጋር `false positive` ተብለው ምልክት ተደርጎባቸዋል።

**አዲስ ክስተትን እንዴት መያዝ እንደሚገባ፦**

1. የጥሪው ቦታ መልዕክቱን በትክክል በ`sanitizeErrorMessage` / `buildErrorBody` / ከላይ ከተመዘገቡት መጠቅለያዎች በአንዱ በኩል እንደሚያሳልፈው ያረጋግጡ (የጥሪ ሰንሰለቱን ከጫፍ እስከ ጫፍ ያንብቡ — አስተያየትን ብቻ አይመኑ)።
2. `tests/unit/error-message-sanitization.test.ts` ይህንን ዱካ እንደሚፈትሽ ያረጋግጡ (ወይም የሙከራ ሽፋን ያክሉ)።
3. ይህን ሰነድ በመጥቀስ `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` በመጠቀም ማንቂያውን ውድቅ ያድርጉ።
4. `.split("\n")[0]`ን በሁሉም ቦታ በቀጥታ በማስገባት "ለማስተካከል" **አይሞክሩ** — ረዳቱ ብቸኛው የእውነት ምንጭ ነው፤ ስካነሩን የማርካት መልክ ለመፍጠር ንድፉን መድገም የማጽጃ ተግባሩን ያዳክማል (የዱካ ማጥፋትን፣ የርዝመት ገደብን እና የውሂብ ዓይነት ቅየራን ያስቀራል)።

እንደ CodeQL [`@codeql/javascript-models` ብጁ የማጽጃ ውቅር](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) ያሉ በፈቃድ የሚነቁ ባህሪያትን መቀበል የረጅም ጊዜ መፍትሔ ነው፤ ይህም ከዚህ ሰነድ ወሰን ውጭ ነው።

## ማጣቀሻዎች

- [CWE-209፦ በስህተት መልዕክት በኩል መረጃን ማጋለጥ](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP፦ የስህተት አያያዝ አጭር መመሪያ](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- ረዳቱን ያማከለው commit፦ `1a39c31f` — _fix(security): ይፋዊ የupstream ማረጋገጫዎችን ደብቅ + የስህተት ማጽዳትን ማዕከላዊ አድርግ_
