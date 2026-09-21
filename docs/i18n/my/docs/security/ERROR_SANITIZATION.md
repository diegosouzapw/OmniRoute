# Error Message Sanitization (မြန်မာ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **အမှန်တရား၏ မူရင်းရင်းမြစ်:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts` နှင့် `open-sse/utils/error.ts` ရှိ public builders များ
> **စမ်းသပ်မှုများ:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **နောက်ဆုံးပြင်ဆင်သည့်ရက်:** 2026-09-02 — v3.8.51
> **ရည်ရွယ်ထားသူများ:** error response များကို ကိုင်တွယ်သည့် အင်ဂျင်နီယာတိုင်း (HTTP routes, SSE streams, executors, MCP handlers)။
> **အခြေအနေ:** client သို့ error message ပြန်ပို့သည့် code path တိုင်းအတွက် **မဖြစ်မနေ လိုက်နာရမည်**။

## ဤအရာ ရှိရသည့်အကြောင်းရင်း

CodeQL rule `js/stack-trace-exposure` (CWE-209) သည် runtime exception မှ စတင်လာသည့် error message တစ်ခုကို သန့်စင်ခြင်းမပြုဘဲ HTTP / SSE response သို့ ပို့သည့် code path တိုင်းကို သတိပေးအမှတ်အသားပြုသည်။ Production response များရှိ stack trace များနှင့် absolute file path များသည် တိုက်ခိုက်သူများအား အောက်ပါတို့ကို ရရှိစေသည်-

- အတွင်းပိုင်း directory ဖွဲ့စည်းပုံ (`/srv/app/src/lib/...`) → နောက်ထပ်တိုက်ခိုက်မှုများအတွက် ကြိုတင်စုံစမ်းခြင်း။
- Stack frame များမှ ခန့်မှန်းသိရှိနိုင်သည့် library / framework version များ → သတ်မှတ်ထားသော exploit ရွေးချယ်ခြင်း။
- Error များအတွင်း string ဖြင့် ပေါင်းထည့်ထားနိုင်သည့် ထိခိုက်လွယ်သော runtime value များ (DB query များ၊ config value များ)။

`open-sse/utils/error.ts` မှ export လုပ်ထားသည့် `sanitizeErrorMessage` helper သည် အောက်ပါ
အချက်အလက်ပေါက်ကြားမှု အမျိုးအစားများကို ဖယ်ရှားပေးသည်-

1. Physical၊ serialized နှင့် အဓိပ္ပာယ်မရှုပ်ထွေးဘဲ inline ဖြစ်နေသော JavaScript stack-frame tail များ။
2. လုံခြုံသော HTTPS URL များနှင့် အတိအလင်း အမှတ်အသားပြုထားသော API route များကို မပျက်မစီး ထိန်းသိမ်းထားပြီး absolute POSIX၊ Windows၊ UNC နှင့် `file://` filesystem path များကို ဖယ်ရှားခြင်း။
3. Credential assignment များ၊ အသုံးများသော provider token format များ၊ private-key PEM block များနှင့် base64 data
   URL များ။

Sanitizer သည် input အရှည်ကို ကန့်သတ်ပြီး throw လုပ်ထားသော value တစ်ခုကို string သို့ ပြောင်းရာတွင် ငြင်းပယ်ခံရပါက လုံခြုံသည့်ဘက်မှ ပိတ်ဆို့သည်။
Recursive upstream JSON sanitization သည် response ကို serialize မလုပ်မီ မလုံခြုံသော credential/path key များ၊ session alias များနှင့်
prototype-control key များကိုလည်း ဖယ်ရှားသည်။

## မဖြစ်မနေ လိုက်နာရမည့် pattern

### 1. Error response တစ်ခု တည်ဆောက်ခြင်း (HTTP / API routes)

`buildErrorBody()` ကို အသုံးပြုပါ — sanitization ကို တစ်ပါတည်း ထည့်သွင်းထားသည်-

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... handler logic ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

သို့မဟုတ် module တစ်ခုတည်းရှိ convenience wrapper များအတွက်-

```ts
import {
  errorResponse, // တစ်ကြိမ်တည်းသုံး Response object
  writeStreamError, // SSE writer
  createErrorResult, // { success: false, status, response, ... } ပုံစံ
  unavailableResponse, // Retry-After ထည့်ပေးသည်
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

ဤအရာအားလုံးသည် canonical public-error boundary ကို အသုံးပြုသည်။ `errorResponse`၊ `writeStreamError` နှင့်
`createErrorResult` တို့ကို `buildErrorBody` မှတစ်ဆင့် လမ်းကြောင်းပေးသည်။ အထူးပြု retry/circuit helper သုံးခုသည်
၎င်းတို့၏ public context ကို တိုက်ရိုက် ရွေးထုတ်၍ သန့်စင်သည်။ ဤ helper များကို အသုံးပြုသောအခါ **`sanitizeErrorMessage` ကို
ကိုယ်တိုင် ခေါ်ရန် မည်သည့်အခါမျှ မလိုအပ်ပါ**။

### 2. စိတ်ကြိုက် error envelope များ (ရှားပါး)

အထက်ပါ helper များကို အသုံးမပြုနိုင်သည့်အခါ (ဥပမာ response ပုံစံကို Connect-RPC ကဲ့သို့ upstream protocol တစ်ခုက သတ်မှတ်ထားသည့်အခါ) `sanitizeErrorMessage` ကို တိုက်ရိုက် import လုပ်ပါ-

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

ဤနည်းလမ်းသည် စိတ်ကြိုက် error body တစ်ခု တည်ဆောက်ရန် ခွင့်ပြုထားသော တစ်ခုတည်းသော နည်းလမ်းဖြစ်သည်။ ကိုးကားအကောင်အထည်ဖော်မှုအတွက် `open-sse/executors/cursor.ts::buildErrorResponse` ကို ကြည့်ပါ။

### 3. Logging နှင့် responding

ယုံကြည်ရသော အတွင်းပိုင်း exception များတွင် operator များ debug လုပ်နိုင်ရန် ၎င်းတို့၏ message နှင့် stack အပြည့်အစုံကို ထိန်းသိမ်းထားနိုင်သည်။ Provider၊ validation၊ browser-session သို့မဟုတ် credential နှင့်ဆက်စပ်သော boundary များမှ
စတင်လာသည့် value များကို console output၊ audit metadata သို့မဟုတ် persistent call log များထဲ မထည့်မီ
သန့်စင်ရမည်။ Pattern-

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // ယုံကြည်ရသော အတွင်းပိုင်း exception အတွက်သာ
  return errorResponse(500, getErrorMessage(err)); // သန့်စင်ပြီးဖြစ်သည် — client သို့ ပို့မည်
}
```

Provider က ထိန်းချုပ်ထားသော failure များအတွက် log လုပ်မည့် value ကိုလည်း ရွေးထုတ်၍ သန့်စင်ပါ-

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. တားမြစ်ထားသော pattern များ

❌ Raw exception output ကို Response body ထဲသို့ **မည်သည့်အခါမျှ** မထည့်ပါနှင့်-

```ts
// မကောင်းပါ- stack trace နှင့် file path များ client ထံ ရောက်ရှိသွားသည်
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ ကိုယ်ပိုင် first-line splitter ကို **မည်သည့်အခါမျှ** မရေးပါနှင့်-

```ts
// မကောင်းပါ- absolute path များ ဖယ်ရှားရန် မေ့သွားပြီး canonical helper နှင့် ကွဲလွဲသွားနိုင်သည်
const safe = String(err).split("\n")[0];
```

❌ Route တွင်သာ သန့်စင်ပြီး SSE path ကို မေ့လျော့ခြင်း **မပြုပါနှင့်**။ Stream သို့ ရေးသည့်အရာတိုင်းသည် `writeStreamError` (သို့မဟုတ် ၎င်း၏ အခြေခံ `buildErrorBody`) မှတစ်ဆင့် ဖြတ်သန်းရမည်။

❌ `process.cwd()`၊ `__filename`၊ `__dirname` သို့မဟုတ် env မှ ရရှိလာသော path များကို error message များတွင် ရည်ရွယ်ချက်ရှိရှိ
**မည်သည့်အခါမျှ** မထည့်ပါနှင့်။ Sanitizer သည် အလွှာလိုက်ကာကွယ်မှုအဖြစ် absolute path များကို ကိုင်တွယ်ပေးသော်လည်း caller များသည်
system topology ကို ဖော်ပြနေသော message များကို အစကတည်းက မတည်ဆောက်ရပါ။

## CI အတွင်း စမ်းသပ်လွှမ်းခြုံမှု

`tests/unit/error-message-sanitization.test.ts` က အောက်ပါတို့ကို မဖြစ်မနေ လိုက်နာစေသည်-

- `/api/model-combo-mappings/*` အောက်ရှိ route တိုင်းသည် 4xx/5xx အတွက် သန့်စင်ထားသော body များကို ပြန်ပေးသည်။
- `sanitizeErrorMessage` သည် စာကြောင်းများစွာပါသော stack trace များကို ဖယ်ရှားသည်။
- `sanitizeErrorMessage` သည် POSIX နှင့် Windows absolute path များကို `<path>` ဖြင့် အစားထိုးသည်။
- `sanitizeErrorMessage` သည် `null`/`undefined`/`Error` instance input များကို ဘေးကင်းစွာ ကိုင်တွယ်သည်။
- `buildErrorBody` သည် ၎င်း၏ `message` field အတွင်း stack trace များကို မည်သည့်အခါမျှ မဖော်ထုတ်ပါ။

route သို့မဟုတ် executor အသစ်တစ်ခု ထည့်သွင်းသည့်အခါ ဤဖိုင်မှ assertion ပုံစံကို ကူးယူပါ။ Coverage gate (`npm run test:coverage`) သည် statements/lines/functions/branches များအတွက် ≥60% ဖြစ်ရန် သတ်မှတ်ထားသည် — error path များကိုလည်း လွှမ်းခြုံထားရမည်။

## ဆက်စပ်ထိန်းချုပ်မှုများ

- `.github/security` အတွင်းရှိ `js/stack-trace-exposure` CodeQL alert များကို ဤ helper များဖြင့် ပြင်ဆင်ခြင်း **သို့မဟုတ်** ဤစာတမ်းကို ကိုးကားထားသော comment ဖြင့် ပယ်ချခြင်းတို့အနက် တစ်နည်းနည်းကို အမြဲလုပ်ဆောင်ရမည်။
- `pino` redaction config (`src/shared/utils/logRedaction.ts`) သည် ယုံကြည်စိတ်ချရသော structured log များကို
  သီးခြားကိုင်တွယ်သည်။ ဤစာတမ်းသည် အများပြည်သူသို့ ပြန်ပေးသည့် response message များနှင့် persistent call/proxy-log နယ်နိမိတ်များကို
  ဖြတ်သန်းသည့် provider-controlled value များကို အကျုံးဝင်သည်။
- Upstream-header denylist (`src/shared/constants/upstreamHeaders.ts`) သည် header ပေါက်ကြားမှုကို ကာကွယ်ပေးသည် — ဒေတာအပြင်သို့ ပေါက်ကြားနိုင်သည့် စိုးရိမ်စရာအသစ်တစ်ခုကို ထည့်သွင်းသည့်အခါ ဖိုင်နှစ်ခုလုံးကို ကိုက်ညီအောင် ထိန်းသိမ်းပါ။

## Upstream အသေးစိတ်အချက်အလက် လွှဲပို့ခြင်း

`buildErrorBody` သည် ရွေးချယ်နိုင်သော တတိယ argument `upstreamDetails` (upstream provider ထံမှ ရရှိသည့် raw
parsed body) ကို လက်ခံသည်။ ပေးထားပါက response တွင် `upstream_details` အဖြစ် ထည့်သွင်းခြင်းမပြုမီ
`sanitizeUpstreamDetails` ဖြင့် သန့်စင်သည်။

ရွေးချယ်နိုင်သော စတုတ္ထ argument `classification`
(`{ type?: string; code?: string; reason?: string }`) သည် အများပြည်သူသို့ ဖော်ပြနိုင်သော တိကျရှင်းလင်းသည့် classification တစ်ခုကို လက်ခံသည်။
field တစ်ခုစီကို ကန့်သတ်ထားသော အများပြည်သူသုံး identifier ဝေါဟာရစုနှင့် ကိုက်ညီအောင် ပြောင်းလဲသည်။ မလုံခြုံသော၊ credential ပုံစံရှိသော၊
control-character ပါဝင်သော သို့မဟုတ် အလွန်ရှည်လျားသော value များသည် status မှ ဆင်းသက်ထားသော type/code ကို fallback အဖြစ် အသုံးပြုသည်။ မလုံခြုံသော ရွေးချယ်နိုင်သည့်
reason ကို ချန်လှပ်ထားသည်။ ဂဏန်းသုံးလုံးပါ HTTP status identifier များ (`100` မှ `599` အထိ) သည်
ကိန်းဂဏန်းပုံစံ upstream status ကို machine-readable code အဖြစ် ဖော်ပြသည့် provider contract များအတွက် ဆက်လက်တရားဝင်သည်။ တူညီသော
ကန့်သတ်အပိုင်းအခြားကို local တွင် ဖန်တီးထားသော HTTP-status placeholder ပုံစံ၌လည်း လက်ခံသည်။ provider မှလာသော
အခြားကိန်းဂဏန်းများနှင့် အမည်များသည် ဝေါဟာရစု၏ ပြင်ပတွင်သာ ရှိနေသည်။

တိကျရှင်းလင်းစွာ ပေးသော classification တိုင်းကို ထိုစတုတ္ထ argument မှတစ်ဆင့် ပေးပို့ပါ။ `buildErrorBody()` ပြန်လာပြီးနောက်
`body.error.code`, `body.error.type`, သို့မဟုတ် `body.error.reason` ကို မည်သည့်အခါမျှ overwrite မလုပ်ပါနှင့်။
builder ပြီးနောက် ပြင်ဆင်ခြင်းသည် အများပြည်သူသုံး projection ကို ကျော်လွှားသွားစေသည်။

`upstreamDetails` အပေါ် အသုံးပြုသည့် သန့်စင်ခြင်းစည်းမျဉ်းများ-

1. String leaf များ- `sanitizeErrorMessage` မှတစ်ဆင့် လုပ်ဆောင်သည် (stack များနှင့် absolute path များကို ဖယ်ရှားသည်)။
2. မလုံခြုံသော path၊ credential၊ session-alias နှင့် prototype-control key များကို ဖယ်ရှားသည်။
3. Depth cap- အဆင့် 4 ထက်ကျော်လွန်သော nesting ကို string `"[truncated]"` ဖြင့် အစားထိုးသည်။
4. Array များကို element 32 ခုအထိ ကန့်သတ်သည်။

parse လုပ်ပြီးသား provider error body ရှိသော call site များသာ `upstreamDetails` ကို ပေးပို့သင့်သည်။ အတွင်းပိုင်း OmniRoute
error များ (SSE parse failure များ၊ content အလွတ်များ၊ guardrail block များ) တွင် ၎င်းကို မထည့်သွင်းရပါ။

raw `err.stack`, `err.message` သို့မဟုတ် runtime exception တစ်ခုမှ မည်သည့် string ကိုမျှ
`upstreamDetails` သို့ မပေးပို့ပါနှင့်။ ၎င်းတို့သည် upstream body မပါဘဲ
`errorResponse` / `buildErrorBody(code, msg)` မှတစ်ဆင့်သာ ဆက်လက်လုပ်ဆောင်ရမည်။

ရွေးချယ်ထားသော upstream 4xx passthrough သည် client ၏ အလိုအလျောက် ပြန်လည်ရယူမှုအတွက် လိုအပ်သည့်
provider ၏ ဘေးကင်းသော JSON ပုံသဏ္ဌာန်နှင့် စာသားအသုံးအနှုန်းကို ထိန်းသိမ်းထားသော်လည်း byte-for-byte passthrough မဟုတ်ပါ။ serialization မပြုမီ
recursive sanitizer ကို အမြဲလုပ်ဆောင်သည်။ Cyclic ဖြစ်သော၊ BigInt ပါဝင်သော သို့မဟုတ် အန္တရာယ်ရှိသော `toJSON()` body များသည် ဘေးကင်းစွာ ငြင်းပယ်ခံရပြီး
passthrough အတွက် အကျုံးမဝင်ပါ။ OCR နှင့် moderation တို့တွင်လည်း တူညီသောစည်းမျဉ်းကို အသုံးပြုသည်။ JSON မဟုတ်သော၊ အလွတ်ဖြစ်သော သို့မဟုတ်
အမျိုးအစားမှား သတ်မှတ်ထားသော upstream body များကို စံသတ်မှတ်ထားသည့် OmniRoute JSON error envelope အဖြစ် ပြောင်းလဲသည်။

## သိရှိထားသော CodeQL ကန့်သတ်ချက်: စိတ်ကြိုက် sanitizer များကို မမှတ်မိခြင်း

CodeQL query [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) သည် ကြိုတင်သတ်မှတ်ထားသော sanitizer ပုံစံများ၏ allowlist တစ်ခုကို အသုံးပြုသည် (ဥပမာ inline `.split("\n")[0]`, သတ်မှတ်ထားသော regex ပုံစံများနှင့် `String#replace`, `Error` ပေါ်ရှိ `.message` ကို ရယူအသုံးပြုခြင်း)။ ၎င်းသည် ကျွန်ုပ်တို့၏ `sanitizeErrorMessage()` ကဲ့သို့ စိတ်ကြိုက် helper မှတစ်ဆင့် သွယ်ဝိုက်လုပ်ဆောင်ခြင်းကို **မမှတ်မိပါ**။

ထို့ကြောင့် ဤ module မှတစ်ဆင့် sanitize ပြုလုပ်ထားကြောင်း အတည်ပြုနိုင်သည့် callsite များ — ဥပမာ `open-sse/utils/error.ts::errorResponse` နှင့် `open-sse/executors/cursor.ts::buildErrorResponse` — သည် code အနေဖြင့် အမှန်တကယ် လုံခြုံသော်လည်း alert ကို ဆက်လက်ဖြစ်ပေါ်စေနိုင်သည်။ ယခင် dismissal များ: `#224`, `#231` (မေ 2026)၊ နှစ်ခုစလုံးကို နည်းပညာဆိုင်ရာ အကြောင်းပြချက်ဖြင့် `false positive` ဟု သတ်မှတ်ထားသည်။

**အသစ်ဖြစ်ပေါ်မှုကို ကိုင်တွယ်နည်း:**

1. callsite သည် message ကို `sanitizeErrorMessage` / `buildErrorBody` / အထက်တွင် မှတ်တမ်းတင်ထားသော wrapper များထဲမှ တစ်ခုမှတစ်ဆင့် အမှန်တကယ် ပို့ဆောင်ကြောင်း အတည်ပြုပါ (call chain ကို အစမှအဆုံး ဖတ်ပါ — comment တစ်ခုကိုသာ မယုံကြည်ပါနှင့်)။
2. `tests/unit/error-message-sanitization.test.ts` သည် ထို path ကို စမ်းသပ်ထားကြောင်း အတည်ပြုပါ (သို့မဟုတ် coverage ထည့်ပါ)။
3. ဤ doc ကို ကိုးကား၍ `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` မှတစ်ဆင့် alert ကို dismiss လုပ်ပါ။
4. နေရာတိုင်းတွင် `.split("\n")[0]` ကို inline ထည့်ခြင်းဖြင့် "ပြင်ဆင်ခြင်း" **မပြုလုပ်ပါနှင့်** — helper သည် တစ်ခုတည်းသော အမှန်တရားရင်းမြစ်ဖြစ်သည်။ scanner ကို ကျေနပ်စေသည့် ပုံပန်းသဏ္ဌာန်ရရှိရန် pattern ကို ထပ်ပွားခြင်းသည် sanitizer ကို အားနည်းစေသည် (path scrubbing၊ length cap နှင့် type coercion တို့ ဆုံးရှုံးသွားသည်)။

CodeQL ၏ [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) ကဲ့သို့ opt-in feature များကို အသုံးပြုခြင်းသည် ရေရှည်ဖြေရှင်းချက်ဖြစ်ပြီး ၎င်းကို ဤ doc တွင် မဖော်ပြထားပါ။

## ကိုးကားချက်များ

- [CWE-209: Error Message မှတစ်ဆင့် အချက်အလက် ပေါက်ကြားခြင်း](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: Error Handling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- helper ကို ဗဟိုပြုထားသော commit: `1a39c31f` — _fix(security): အများပြည်သူမြင်နိုင်သော upstream creds များကို ဖုံးကွယ်ပြီး error sanitization ကို ဗဟိုပြုခြင်း_
