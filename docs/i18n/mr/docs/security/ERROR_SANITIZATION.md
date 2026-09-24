# Error Message Sanitization (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **सत्याचा अधिकृत स्रोत:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, आणि `open-sse/utils/error.ts` मधील सार्वजनिक builders
> **चाचण्या:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **शेवटचे अद्यतन:** 2026-09-02 — v3.8.51
> **प्रेक्षक:** error responses हाताळणारे कोणतेही अभियंते (HTTP routes, SSE streams, executors, MCP handlers).
> **स्थिती:** client ला error message परत करणाऱ्या प्रत्येक code path साठी **अनिवार्य**.

## हे का अस्तित्वात आहे

CodeQL नियम `js/stack-trace-exposure` (CWE-209) अशा कोणत्याही code path ला ध्वजांकित करतो, जिथे runtime exception मधून आलेला error message sanitize न होता HTTP / SSE response पर्यंत पोहोचतो. Production responses मधील stack traces आणि absolute file paths हल्लेखोरांना पुढील माहिती देतात:

- अंतर्गत directory layout (`/srv/app/src/lib/...`) → पुढील हल्ल्यांसाठी माहिती संकलन.
- Stack frames वरून अनुमानित केलेल्या library / framework versions → लक्ष्यित exploit निवड.
- Errors मध्ये string-interpolate झालेली संवेदनशील runtime values (DB queries, config values).

`open-sse/utils/error.ts` द्वारे export केलेला `sanitizeErrorMessage` helper पुढील प्रकारची
माहिती गळती काढून टाकतो:

1. प्रत्यक्ष, serialized आणि स्पष्टपणे inline असलेले JavaScript stack-frame tails.
2. सुरक्षित HTTPS URLs आणि स्पष्टपणे चिन्हांकित API routes जतन करताना absolute POSIX, Windows, UNC आणि `file://` filesystem paths.
3. Credential assignments, सामान्य provider token formats, private-key PEM blocks आणि base64 data
   URLs.

Sanitizer input ची लांबी मर्यादित करतो आणि thrown value चे string coercion अयशस्वी झाल्यास सुरक्षितपणे बंद होतो.
Recursive upstream JSON sanitization मुळे response serialize होण्यापूर्वी असुरक्षित credential/path keys, session aliases आणि
prototype-control keys देखील वगळल्या जातात.

## अनिवार्य पद्धत

### 1. Error response तयार करणे (HTTP / API routes)

`buildErrorBody()` वापरा — sanitization अंतर्भूत आहे:

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

किंवा त्याच module मधील सोयीस्कर wrappers साठी:

```ts
import {
  errorResponse, // एकाच टप्प्यात Response object
  writeStreamError, // SSE writer
  createErrorResult, // { success: false, status, response, ... } स्वरूप
  unavailableResponse, // Retry-After जोडते
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

हे सर्व canonical public-error boundary लागू करतात. `errorResponse`, `writeStreamError` आणि
`createErrorResult`, `buildErrorBody` मार्फत प्रवाहित होतात; तीन विशेष retry/circuit helpers
त्यांचा सार्वजनिक context थेट project आणि sanitize करतात. हे helpers वापरताना **तुम्हाला
`sanitizeErrorMessage` स्वतः call करण्याची कधीही आवश्यकता नाही**.

### 2. सानुकूल error envelopes (क्वचित)

वरील helpers वापरता येत नसतील (उदा. response चे स्वरूप Connect-RPC सारख्या upstream protocol द्वारे निर्धारित केलेले असेल), तर `sanitizeErrorMessage` थेट import करा:

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

सानुकूल error body तयार करण्याचा हा एकमेव मान्यताप्राप्त मार्ग आहे. Reference implementation साठी `open-sse/executors/cursor.ts::buildErrorResponse` पहा.

### 3. Logging विरुद्ध response देणे

विश्वसनीय अंतर्गत exceptions त्यांचा संपूर्ण message आणि stack कायम ठेवू शकतात, जेणेकरून operators debug करू शकतील. Provider, validation, browser-session किंवा credential-संबंधित boundaries मधून आलेली values
console output, audit metadata किंवा persistent call logs मध्ये जाण्यापूर्वी sanitize करणे आवश्यक आहे. पद्धत:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // केवळ विश्वसनीय अंतर्गत exception
  return errorResponse(500, getErrorMessage(err)); // sanitize केलेले — client कडे पाठवले जाते
}
```

Provider-controlled failures साठी logged value देखील project करा:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. प्रतिबंधित पद्धती

❌ Raw exception output **कधीही** Response body मध्ये ठेवू नका:

```ts
// चुकीचे: stack trace + file paths client पर्यंत पोहोचतात
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ स्वतःचा first-line splitter **कधीही** तयार करू नका:

```ts
// चुकीचे: absolute paths काढून टाकण्याचे विसरते आणि canonical helper पासून विसंगत होऊ शकते
const safe = String(err).split("\n")[0];
```

❌ Route मध्ये sanitize करून SSE path विसरू **नका**. Stream मध्ये लिहिणारी कोणतीही गोष्ट `writeStreamError` (किंवा त्याच्या अंतर्गत असलेल्या `buildErrorBody`) मधून जाते.

❌ Error messages मध्ये `process.cwd()`, `__filename`, `__dirname` किंवा env-derived paths जाणीवपूर्वक
**कधीही** समाविष्ट करू नका. संरक्षणाचा अतिरिक्त स्तर म्हणून sanitizer absolute paths हाताळतो, परंतु callers नी सुरुवातीलाच
topology उघड करणारे messages तयार करू नयेत.

## CI मधील कव्हरेज

`tests/unit/error-message-sanitization.test.ts` खालील बाबींची अंमलबजावणी सुनिश्चित करते:

- `/api/model-combo-mappings/*` अंतर्गत प्रत्येक route, 4xx/5xx वर sanitized body परत करतो.
- `sanitizeErrorMessage` अनेक ओळींचे stack trace काढून टाकतो.
- `sanitizeErrorMessage` POSIX आणि Windows चे absolute path `<path>` ने बदलतो.
- `sanitizeErrorMessage`, `null`/`undefined`/`Error` instance इनपुट सुरक्षितपणे हाताळतो.
- `buildErrorBody` त्याच्या `message` field मध्ये stack trace कधीही उघड करत नाही.

नवीन route किंवा executor जोडताना, या फाइलमधील assertion pattern कॉपी करा. कव्हरेज gate (`npm run test:coverage`) ≥60% statements/lines/functions/branches ची अंमलबजावणी सुनिश्चित करते — error path कव्हर केलेले असणे आवश्यक आहे.

## संबंधित नियंत्रणे

- `.github/security` मधील `js/stack-trace-exposure` CodeQL alerts हे नेहमी **एकतर** या helpers द्वारे दुरुस्त केलेले **किंवा** या दस्तऐवजाचा संदर्भ देणाऱ्या comment सह dismiss केलेले असावेत.
- `pino` redaction config (`src/shared/utils/logRedaction.ts`) विश्वासार्ह structured logs स्वतंत्रपणे हाताळते. हा दस्तऐवज सार्वजनिक response messages आणि persistent call/proxy-log boundaries ओलांडणाऱ्या provider-controlled values विषयी आहे.
- Upstream-header denylist (`src/shared/constants/upstreamHeaders.ts`) header leakage कव्हर करते — नवीन exfiltration concern जोडताना दोन्ही फाइल्स सुसंगत ठेवा.

## Upstream तपशीलांचे passthrough

`buildErrorBody` पर्यायी तिसरा argument `upstreamDetails` (upstream provider कडून मिळालेला raw parsed body) स्वीकारतो. तो दिला असल्यास, response मध्ये `upstream_details` म्हणून समाविष्ट करण्यापूर्वी `sanitizeUpstreamDetails` द्वारे sanitize केला जातो.

पर्यायी चौथा argument `classification`
(`{ type?: string; code?: string; reason?: string }`) स्पष्ट सार्वजनिक classification स्वीकारतो.
प्रत्येक field मर्यादित सार्वजनिक identifier vocabulary वर project केला जातो. असुरक्षित, credential-सदृश,
control-character असलेली किंवा अतिदीर्घ values status-derived type/code वर fallback होतात; असुरक्षित पर्यायी
reason वगळला जातो. तीन-अंकी HTTP status identifiers (`100` ते `599`) numeric upstream status हा
machine-readable code म्हणून उघड करणाऱ्या provider contracts साठी वैध राहतात. स्थानिकरीत्या तयार केलेल्या
HTTP-status placeholder स्वरूपातही हीच मर्यादित range स्वीकारली जाते; अनियंत्रित provider numbers आणि names
या vocabulary च्या बाहेरच राहतात.

प्रत्येक स्पष्ट classification त्या चौथ्या argument मध्ये द्या. `buildErrorBody()` परत आल्यानंतर
`body.error.code`, `body.error.type`, किंवा `body.error.reason` कधीही overwrite करू नका;
builder नंतरचे mutation सार्वजनिक projection ला bypass करते.

`upstreamDetails` वर लागू केलेले sanitization नियम:

1. String leaves: `sanitizeErrorMessage` मधून प्रक्रिया करा (stacks + absolute paths काढून टाकते).
2. असुरक्षित path, credential, session-alias आणि prototype-control keys काढून टाकल्या जातात.
3. Depth cap: 4 levels पेक्षा अधिक nesting झाल्यास ते `"[truncated]"` string ने बदलले जाते.
4. Arrays कमाल 32 elements पर्यंत मर्यादित केल्या जातात.

फक्त parsed provider error body असलेल्या call sites नीच `upstreamDetails` द्यावे. अंतर्गत OmniRoute
errors (SSE parse failures, रिकामा content, guardrail blocks) मध्ये ते समाविष्ट करू नये.

Raw `err.stack`, `err.message`, किंवा runtime exception मधील कोणतीही string
`upstreamDetails` ला देऊ **नका**. त्यांची प्रक्रिया upstream body शिवाय
`errorResponse` / `buildErrorBody(code, msg)` मधूनच केली पाहिजे.

निवडक upstream 4xx passthrough, client auto-recovery साठी आवश्यक असलेला provider चा सुरक्षित JSON shape आणि wording जतन करतो, परंतु तो byte-for-byte passthrough नाही: serialization पूर्वी recursive sanitizer नेहमी चालतो. Cyclic, BigInt असलेले किंवा प्रतिकूल `toJSON()` bodies बंद-सुरक्षित पद्धतीने अयशस्वी होतात आणि passthrough साठी पात्र नसतात. OCR आणि moderation साठीही हाच नियम लागू होतो; non-JSON, रिकामे किंवा चुकीचे label लावलेले upstream bodies canonical OmniRoute JSON error envelope मध्ये रूपांतरित केले जातात.

## ज्ञात CodeQL मर्यादा: सानुकूल सॅनिटायझर्स ओळखले जात नाहीत

CodeQL क्वेरी [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) सॅनिटायझर नमुन्यांची एक निश्चित अनुमतीसूची वापरते (उदा. इनलाइन `.split("\n")[0]`, विशिष्ट regex रचनांसह `String#replace`, `Error` वरील `.message` मध्ये प्रवेश). आमच्या `sanitizeErrorMessage()` सारख्या सानुकूल सहाय्यकाद्वारे केलेले अप्रत्यक्षीकरण ती **ओळखत नाही**.

याचा अर्थ असा की या मॉड्यूलद्वारे स्पष्टपणे सॅनिटायझेशन करणारी कॉलसाइट्स — उदाहरणार्थ `open-sse/utils/error.ts::errorResponse` आणि `open-sse/executors/cursor.ts::buildErrorResponse` — कोड कार्यात्मकदृष्ट्या सुरक्षित असला तरीही अलर्ट निर्माण करत राहू शकतात. यापूर्वी फेटाळलेली उदाहरणे: `#224`, `#231` (मे 2026), तांत्रिक समर्थनासह दोन्ही `false positive` म्हणून चिन्हांकित.

**नवीन घटना कशी हाताळावी:**

1. कॉलसाइट प्रत्यक्षात संदेशाला `sanitizeErrorMessage` / `buildErrorBody` / वर दस्तऐवजीकरण केलेल्या रॅपर्सपैकी एखाद्यामधून पाठवते याची खात्री करा (संपूर्ण कॉल साखळी सुरुवातीपासून शेवटपर्यंत वाचा — टिप्पणीवर विश्वास ठेवू नका).
2. `tests/unit/error-message-sanitization.test.ts` या मार्गाची चाचणी करते याची खात्री करा (किंवा चाचणी व्याप्ती जोडा).
3. या दस्तऐवजाचा संदर्भ देऊन `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` द्वारे अलर्ट फेटाळा.
4. सर्वत्र `.split("\n")[0]` इनलाइन करून समस्येचे "निराकरण" करू **नका** — सहाय्यक हा सत्याचा एकमेव स्रोत आहे; हा नमुना डुप्लिकेट केल्याने स्कॅनरचे समाधान झाल्यासारखे दिसते, परंतु सॅनिटायझर कमकुवत होतो (पथ स्क्रबिंग, लांबीची मर्यादा आणि प्रकार रूपांतरण गमावले जाते).

CodeQL च्या [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) सारखी निवडाधारित वैशिष्ट्ये स्वीकारणे हा दीर्घकालीन उपाय आहे; तो या दस्तऐवजाच्या व्याप्तीबाहेर आहे.

## संदर्भ

- [CWE-209: त्रुटी संदेशाद्वारे माहिती उघड होणे](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: त्रुटी हाताळणी संदर्भपत्र](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- सहाय्यकाचे केंद्रीकरण करणारी कमिट: `1a39c31f` — _fix(security): सार्वजनिक अपस्ट्रीम क्रेडेन्शियल्स लपवा + त्रुटी सॅनिटायझेशन केंद्रीकृत करा_
