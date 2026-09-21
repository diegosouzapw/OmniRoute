# Error Message Sanitization (ខ្មែរ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **ប្រភពសេចក្តីពិត:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` និង public builders នៅក្នុង `open-sse/utils/error.ts`
> **ការធ្វើតេស្ត:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **បានធ្វើបច្ចុប្បន្នភាពចុងក្រោយ:** 2026-09-02 — v3.8.51
> **អ្នកអានគោលដៅ:** វិស្វករណាមួយដែលកែប្រែការឆ្លើយតបកំហុស (HTTP routes, SSE streams, executors, MCP handlers)។
> **ស្ថានភាព:** **ចាំបាច់** សម្រាប់គ្រប់ code path ដែលបញ្ជូនសារកំហុសត្រឡប់ទៅ client។

## ហេតុអ្វីបានជាវាមាន

CodeQL rule `js/stack-trace-exposure` (CWE-209) សម្គាល់ code path ណាមួយដែលសារកំហុសមានប្រភពពី runtime exception ហើយទៅដល់ HTTP / SSE response ដោយមិនបានសម្អាត។ Stack traces និង absolute file paths នៅក្នុង production responses ផ្តល់ឱ្យអ្នកវាយប្រហារនូវ៖

- ប្លង់ directory ខាងក្នុង (`/srv/app/src/lib/...`) → ការស៊ើបអង្កេតសម្រាប់ការវាយប្រហារបន្ថែម។
- កំណែ library / framework ដែលអាចសន្និដ្ឋានបានពី stack frames → ការជ្រើសរើស exploit ជាក់លាក់។
- តម្លៃ runtime រសើបដែលអាចត្រូវបាន string-interpolated ទៅក្នុងកំហុស (DB queries, config values)។

Helper `sanitizeErrorMessage` ដែល export ដោយ `open-sse/utils/error.ts` ដកចេញនូវប្រភេទនៃ
ការលេចធ្លាយទាំងនេះ៖

1. កន្ទុយ JavaScript stack-frame ជាក់ស្តែង ដែលបាន serialize និងដែលស្ថិត inline យ៉ាងច្បាស់លាស់។
2. Absolute POSIX, Windows, UNC និង `file://` filesystem paths ខណៈពេលរក្សាទុក safe HTTPS URLs
   និង API routes ដែលបានសម្គាល់យ៉ាងច្បាស់។
3. Credential assignments, ទម្រង់ token ទូទៅរបស់ provider, private-key PEM blocks និង base64 data
   URLs។

Sanitizer កំណត់ប្រវែង input អតិបរមា និងបដិសេធដោយសុវត្ថិភាពនៅពេលតម្លៃដែលបាន throw មិនអាចបម្លែងជា string។
Recursive upstream JSON sanitization ក៏លុបចោល credential/path keys ដែលមិនមានសុវត្ថិភាព, session aliases និង
prototype-control keys មុនពេល response ត្រូវបាន serialize។

## គំរូដែលចាំបាច់

### 1. ការបង្កើត error response (HTTP / API routes)

ប្រើ `buildErrorBody()` — sanitization ត្រូវបានរួមបញ្ចូលរួចជាស្រេច៖

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... តក្កវិជ្ជារបស់ handler ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

ឬ សម្រាប់ convenience wrappers នៅក្នុង module ដូចគ្នា៖

```ts
import {
  errorResponse, // Response object ដែលប្រើតែមួយលើក
  writeStreamError, // SSE writer
  createErrorResult, // ទម្រង់ { success: false, status, response, ... }
  unavailableResponse, // បន្ថែម Retry-After
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

ទាំងអស់នេះអនុវត្ត canonical public-error boundary។ `errorResponse`, `writeStreamError` និង
`createErrorResult` ឆ្លងកាត់ `buildErrorBody`; specialized retry/circuit helpers ទាំងបី
project និង sanitize public context របស់ពួកវាដោយផ្ទាល់។ **អ្នកមិនចាំបាច់ហៅ
`sanitizeErrorMessage` ដោយដៃឡើយ** នៅពេលប្រើ helpers ទាំងនេះ។

### 2. Custom error envelopes (កម្រ)

នៅពេលអ្នកមិនអាចប្រើ helpers ខាងលើបាន (ឧ. ទម្រង់ response ត្រូវបានកំណត់ដោយ upstream protocol ដូចជា Connect-RPC) សូម import `sanitizeErrorMessage` ដោយផ្ទាល់៖

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

នេះគឺជាវិធីតែមួយគត់ដែលត្រូវបានអនុញ្ញាតសម្រាប់បង្កើត custom error body។ សូមមើល `open-sse/executors/cursor.ts::buildErrorResponse` សម្រាប់ reference implementation។

### 3. Logging ធៀបនឹងការឆ្លើយតប

Trusted internal exceptions អាចរក្សាទុក message និង stack ពេញលេញរបស់វា ដើម្បីឱ្យ operators អាច debug បាន។ តម្លៃ
ដែលមានប្រភពនៅ provider, validation, browser-session ឬ credential-adjacent boundaries ត្រូវតែ
បាន sanitize មុនពេលពួកវាចូលទៅក្នុង console output, audit metadata ឬ persistent call logs។ គំរូ៖

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // សម្រាប់ trusted internal exception តែប៉ុណ្ណោះ
  return errorResponse(500, getErrorMessage(err)); // បាន sanitize — បញ្ជូនទៅ client
}
```

សម្រាប់ failures ដែលគ្រប់គ្រងដោយ provider សូម project តម្លៃដែលបាន log ផងដែរ៖

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. គំរូដែលត្រូវបានហាមឃាត់

❌ **កុំ** ដាក់ raw exception output នៅក្នុង Response body៖

```ts
// មិនល្អ៖ stack trace + file paths ទៅដល់ client
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **កុំ** បង្កើត first-line splitter ដោយខ្លួនឯង៖

```ts
// មិនល្អ៖ មិនបានដក absolute paths ហើយអាចខុសពី canonical helper
const safe = String(err).split("\n")[0];
```

❌ **កុំ** sanitize នៅក្នុង route ហើយភ្លេច SSE path។ អ្វីៗដែលសរសេរទៅ stream ត្រូវឆ្លងកាត់ `writeStreamError` (ឬ `buildErrorBody` ដែលនៅពីក្រោមវា)។

❌ **កុំ** ដាក់បញ្ចូល `process.cwd()`, `__filename`, `__dirname` ឬ paths ដែលបានមកពី env ដោយចេតនា
នៅក្នុងសារកំហុស។ Sanitizer គ្របដណ្ដប់ absolute paths ជាការការពារបន្ថែម ប៉ុន្តែ callers មិនត្រូវ
បង្កើតសារដែលបង្ហាញពី topology តាំងពីដំបូងឡើយ។

## ការគ្របដណ្តប់ក្នុង CI

`tests/unit/error-message-sanitization.test.ts` ធានាថា៖

- គ្រប់ route ក្រោម `/api/model-combo-mappings/*` ត្រឡប់ body ដែលបានសម្អាតសម្រាប់ 4xx/5xx។
- `sanitizeErrorMessage` លុប stack trace ដែលមានច្រើនបន្ទាត់។
- `sanitizeErrorMessage` ជំនួស absolute path របស់ POSIX និង Windows ដោយ `<path>`។
- `sanitizeErrorMessage` ដោះស្រាយ input ជា instance នៃ `null`/`undefined`/`Error` ដោយសុវត្ថិភាព។
- `buildErrorBody` មិនបង្ហាញ stack trace នៅក្នុង field `message` របស់វាឡើយ។

នៅពេលបន្ថែម route ឬ executor ថ្មី សូមចម្លងលំនាំ assertion ពី file នេះ។ កម្រិតតម្រូវនៃការគ្របដណ្តប់ (`npm run test:coverage`) តម្រូវឱ្យ statements/lines/functions/branches មានការគ្របដណ្តប់ ≥60% — error path ត្រូវតែបានគ្របដណ្តប់។

## ការគ្រប់គ្រងដែលពាក់ព័ន្ធ

- CodeQL alert `js/stack-trace-exposure` នៅក្នុង `.github/security` គួរតែត្រូវបាន **either** កែតម្រូវតាមរយៈ helper ទាំងនេះ **or** បដិសេធដោយមាន comment យោងទៅកាន់ឯកសារនេះជានិច្ច។
- config សម្រាប់ redaction របស់ `pino` (`src/shared/utils/logRedaction.ts`) គ្រប់គ្រង structured log ដែលអាចទុកចិត្តបានដោយឡែក។ ឯកសារនេះគ្របដណ្តប់លើ response message សាធារណៈ និងតម្លៃដែលគ្រប់គ្រងដោយ provider ដែលឆ្លងកាត់ព្រំដែននៃ persistent call/proxy-log។
- denylist សម្រាប់ upstream header (`src/shared/constants/upstreamHeaders.ts`) គ្របដណ្តប់លើការលេចធ្លាយ header — សូមរក្សា file ទាំងពីរឱ្យស្របគ្នា នៅពេលបន្ថែមកង្វល់ថ្មីអំពីការបញ្ចេញទិន្នន័យ។

## ការបញ្ជូនបន្តព័ត៌មានលម្អិតពី upstream

`buildErrorBody` ទទួលយក argument ទីបីដែលជាជម្រើស `upstreamDetails` (body ដែលបាន parse ដើមពី upstream provider)។ នៅពេលផ្តល់ឱ្យ វាត្រូវបានសម្អាតដោយ `sanitizeUpstreamDetails` មុនពេលបញ្ចូលទៅក្នុង response ជា `upstream_details`។

argument ទីបួនដែលជាជម្រើស `classification`
(`{ type?: string; code?: string; reason?: string }`) ទទួលយក public classification ដែលបានបញ្ជាក់យ៉ាងច្បាស់។
field នីមួយៗត្រូវបានបម្លែងទៅជាវាក្យសព្ទ public-identifier ដែលមានព្រំដែនកំណត់។ តម្លៃដែលមិនមានសុវត្ថិភាព មានទម្រង់ដូច credential មាន control-character ឬវែងពេក នឹងត្រឡប់ទៅប្រើ type/code ដែលបានមកពី status; reason ជាជម្រើសដែលមិនមានសុវត្ថិភាព នឹងត្រូវបានលុបចោល។ HTTP status identifier ដែលមានបីខ្ទង់ (`100` ដល់ `599`) នៅតែមានសុពលភាពសម្រាប់ contract របស់ provider ដែលបង្ហាញ numeric upstream status ជា code ដែលម៉ាស៊ីនអាចអានបាន។ bounded range ដូចគ្នានេះក៏ត្រូវបានទទួលយកក្នុងទម្រង់ HTTP-status placeholder ដែលបង្កើតក្នុងមូលដ្ឋានផងដែរ; លេខ និងឈ្មោះតាមអំពើចិត្តរបស់ provider នៅតែស្ថិតនៅក្រៅវាក្យសព្ទនេះ។

បញ្ជូន explicit classification ទាំងអស់ក្នុង argument ទីបួននោះ។ កុំ overwrite
`body.error.code`, `body.error.type` ឬ `body.error.reason` បន្ទាប់ពី `buildErrorBody()` ត្រឡប់មកវិញ;
ការកែប្រែក្រោយ builder រំលង public projection។

ច្បាប់នៃការសម្អាតដែលអនុវត្តចំពោះ `upstreamDetails`៖

1. String leaf៖ ដំណើរការតាម `sanitizeErrorMessage` (លុប stack និង absolute path)។
2. key ដែលជា path មិនមានសុវត្ថិភាព, credential, session-alias និង prototype-control ត្រូវបានលុបចេញ។
3. កម្រិតជម្រៅ៖ nesting លើសពី 4 កម្រិត ត្រូវបានជំនួសដោយ string `"[truncated]"`។
4. Array ត្រូវបានកំណត់ត្រឹម 32 element។

មានតែ call site ដែលមាន provider error body ដែលបាន parse ប៉ុណ្ណោះដែលគួរបញ្ជូន `upstreamDetails`។ error ផ្ទៃក្នុងរបស់ OmniRoute
(SSE parse failure, content ទទេ, guardrail block) មិនត្រូវបញ្ចូលវាឡើយ។

កុំបញ្ជូន `err.stack`, `err.message` ដើម ឬ string ណាមួយពី runtime exception ទៅ
`upstreamDetails`។ ទាំងនោះនៅតែត្រូវឆ្លងកាត់ `errorResponse` / `buildErrorBody(code, msg)`
ដោយគ្មាន upstream body។

ការបញ្ជូនបន្ត upstream 4xx ដោយជ្រើសរើស រក្សាទុក safe JSON shape និងពាក្យពេចន៍របស់ provider ដែលត្រូវការសម្រាប់ client auto-recovery ប៉ុន្តែវាមិនមែនជាការបញ្ជូនបន្តដូចគ្នាបេះបិទតាម byte ទេ៖ recursive sanitizer តែងតែដំណើរការមុន serialization។ body ដែលមាន cyclic, មាន BigInt ឬមាន `toJSON()` ដែលព្យាបាទ នឹងបរាជ័យបែបបិទសុវត្ថិភាព ហើយមិនមានសិទ្ធិសម្រាប់ passthrough ទេ។ OCR និង moderation អនុវត្តច្បាប់ដូចគ្នា; upstream body ដែលមិនមែនជា JSON, ទទេ ឬដាក់ស្លាកខុស ត្រូវបានបម្លែងទៅជា canonical OmniRoute JSON error envelope។

## ដែនកំណត់ដែលគេស្គាល់របស់ CodeQL៖ មិនស្គាល់កម្មវិធីសម្អាតទិន្នន័យផ្ទាល់ខ្លួន

សំណួរ CodeQL [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) ប្រើបញ្ជីអនុញ្ញាតថេរមួយនៃលំនាំកម្មវិធីសម្អាតទិន្នន័យ (ឧ. `.split("\n")[0]` ក្នុងបន្ទាត់តែមួយ, `String#replace` ជាមួយទម្រង់ regex ជាក់លាក់ និងការចូលប្រើ `.message` លើ `Error`)។ វា **មិន** ស្គាល់ការហៅដោយប្រយោលតាមរយៈមុខងារជំនួយផ្ទាល់ខ្លួនដូចជា `sanitizeErrorMessage()` របស់យើងទេ។

នេះមានន័យថា ទីតាំងហៅមុខងារដែលអាចបញ្ជាក់បានថាសម្អាតទិន្នន័យតាមរយៈម៉ូឌុលនេះ — ឧទាហរណ៍ `open-sse/utils/error.ts::errorResponse` និង `open-sse/executors/cursor.ts::buildErrorResponse` — អាចបន្តបង្កើតការជូនដំណឹង ទោះបីជាកូដមានសុវត្ថិភាពតាមមុខងារក៏ដោយ។ ករណីមុនៗដែលបានបិទការជូនដំណឹង៖ `#224`, `#231` (ខែឧសភា 2026) ដែលទាំងពីរត្រូវបានសម្គាល់ថា `false positive` ជាមួយហេតុផលបច្ចេកទេស។

**វិធីដោះស្រាយករណីថ្មី៖**

1. បញ្ជាក់ថាទីតាំងហៅមុខងារពិតជាបញ្ជូនសារតាមរយៈ `sanitizeErrorMessage` / `buildErrorBody` / មុខងាររុំណាមួយដែលបានចងក្រងជាឯកសារខាងលើ (អានខ្សែសង្វាក់នៃការហៅចាប់ពីដើមដល់ចប់ — កុំជឿត្រឹមតែមតិយោបល់ក្នុងកូដ)។
2. បញ្ជាក់ថា `tests/unit/error-message-sanitization.test.ts` សាកល្បងផ្លូវនេះ (ឬបន្ថែមការគ្របដណ្តប់ការសាកល្បង)។
3. បិទការជូនដំណឹងតាមរយៈ `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` ដោយយោងទៅឯកសារនេះ។
4. **កុំ** «កែ» ដោយបញ្ចូល `.split("\n")[0]` ដោយផ្ទាល់គ្រប់ទីកន្លែង — មុខងារជំនួយគឺជាប្រភពសេចក្ដីពិតតែមួយគត់។ ការចម្លងលំនាំនេះធ្វើឱ្យកម្មវិធីសម្អាតទិន្នន័យចុះខ្សោយ (បាត់បង់ការលុបបំបាត់ផ្លូវឯកសារ ការកំណត់ប្រវែងអតិបរមា និងការបម្លែងប្រភេទ) ដើម្បីត្រឹមតែធ្វើឱ្យមើលទៅដូចជាបានបំពេញចិត្តឧបករណ៍ស្កេនប៉ុណ្ណោះ។

ការទទួលយកមុខងារដែលត្រូវបើកប្រើដោយចេតនា ដូចជាការកំណត់រចនាសម្ព័ន្ធកម្មវិធីសម្អាតទិន្នន័យផ្ទាល់ខ្លួន [`@codeql/javascript-models`](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) របស់ CodeQL គឺជាដំណោះស្រាយរយៈពេលវែង។ វាស្ថិតនៅក្រៅវិសាលភាពនៃឯកសារនេះ។

## ឯកសារយោង

- [CWE-209៖ ការលាតត្រដាងព័ត៌មានតាមរយៈសារកំហុស](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP៖ សន្លឹកសង្ខេបអំពីការដោះស្រាយកំហុស](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- Commit ដែលប្រមូលផ្តុំមុខងារជំនួយទៅកន្លែងតែមួយ៖ `1a39c31f` — _fix(security): បិទបាំងព័ត៌មានសម្ងាត់ upstream សាធារណៈ + ប្រមូលផ្តុំការសម្អាតកំហុសទៅកន្លែងតែមួយ_
