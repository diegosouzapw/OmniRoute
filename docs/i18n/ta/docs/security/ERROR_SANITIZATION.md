# Error Message Sanitization (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **உண்மையின் ஆதாரம்:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, மற்றும் `open-sse/utils/error.ts`-இல் உள்ள பொது builders
> **சோதனைகள்:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **கடைசியாகப் புதுப்பிக்கப்பட்டது:** 2026-09-02 — v3.8.51
> **இலக்கு வாசகர்கள்:** பிழைப் பதில்களைக் கையாளும் எந்தவொரு பொறியாளரும் (HTTP routes, SSE streams, executors, MCP handlers).
> **நிலை:** ஒரு client-க்குப் பிழைச் செய்தியைத் திருப்பி அனுப்பும் ஒவ்வொரு code path-க்கும் **கட்டாயம்**.

## இது ஏன் உள்ளது

CodeQL விதி `js/stack-trace-exposure` (CWE-209), runtime exception-இலிருந்து தோன்றும் பிழைச் செய்தி sanitize செய்யப்படாமல் HTTP / SSE response-ஐ அடையும் எந்தவொரு code path-ஐயும் குறியிடுகிறது. Production response-களில் உள்ள stack trace-களும் absolute file path-களும் தாக்குபவர்களுக்குப் பின்வருவனவற்றை வழங்குகின்றன:

- உள் directory அமைப்பு (`/srv/app/src/lib/...`) → மேலும் தாக்குதல்களை நடத்துவதற்கான முன்னறிதல்.
- Stack frame-களிலிருந்து ஊகிக்கப்படும் library / framework version-கள் → இலக்குவைத்த exploit தேர்வு.
- பிழைகளில் string interpolation மூலம் சேர்க்கப்பட்டிருக்கக்கூடிய முக்கிய runtime மதிப்புகள் (DB query-கள், config மதிப்புகள்).

`open-sse/utils/error.ts` ஏற்றுமதி செய்யும் `sanitizeErrorMessage` helper, பின்வரும் வகையான
தகவல் கசிவுகளை நீக்குகிறது:

1. Physical, serialized மற்றும் சந்தேகமின்றி inline-ஆக உள்ள JavaScript stack-frame tail-கள்.
2. பாதுகாப்பான HTTPS URL-களையும் வெளிப்படையாகக் குறிக்கப்பட்ட API route-களையும் பாதுகாத்தபடி, absolute POSIX, Windows, UNC மற்றும் `file://` filesystem path-கள்.
3. Credential assignment-கள், பொதுவான provider token வடிவங்கள், private-key PEM block-கள் மற்றும் base64 data
   URL-கள்.

Sanitizer input நீளத்தை வரம்பிடுகிறது; மேலும் throw செய்யப்பட்ட மதிப்பை string-ஆக மாற்றுவது தோல்வியடைந்தால், பாதுகாப்பான முறையில் நிராகரிக்கிறது.
Recursive upstream JSON sanitization, response serialize செய்யப்படுவதற்கு முன் பாதுகாப்பற்ற credential/path key-கள், session alias-கள் மற்றும்
prototype-control key-களையும் நீக்குகிறது.

## கட்டாய pattern

### 1. பிழைப் பதிலை உருவாக்குதல் (HTTP / API routes)

`buildErrorBody()`-ஐப் பயன்படுத்தவும் — sanitization உள்ளமைக்கப்பட்டுள்ளது:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... handler தர்க்கம் ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

அல்லது, அதே module-இல் உள்ள வசதியான wrapper-களுக்கு:

```ts
import {
  errorResponse, // ஒரே அழைப்பில் உருவாகும் Response object
  writeStreamError, // SSE writer
  createErrorResult, // { success: false, status, response, ... } வடிவம்
  unavailableResponse, // Retry-After-ஐச் சேர்க்கிறது
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

இவை அனைத்தும் canonical public-error boundary-ஐப் பயன்படுத்துகின்றன. `errorResponse`, `writeStreamError` மற்றும்
`createErrorResult` ஆகியவை `buildErrorBody` வழியாகச் செல்கின்றன; retry/circuit-க்கான மூன்று சிறப்பு helper-கள்
அவற்றின் public context-ஐ நேரடியாக project செய்து sanitize செய்கின்றன. இந்த helper-களைப் பயன்படுத்தும்போது **நீங்கள் ஒருபோதும்
`sanitizeErrorMessage`-ஐ கைமுறையாக அழைக்கத் தேவையில்லை**.

### 2. தனிப்பயன் error envelope-கள் (அரிதானவை)

மேலே உள்ள helper-களைப் பயன்படுத்த முடியாதபோது (எ.கா. response வடிவம் Connect-RPC போன்ற upstream protocol-ஆல் நிர்ணயிக்கப்படும்போது), `sanitizeErrorMessage`-ஐ நேரடியாக import செய்யவும்:

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

தனிப்பயன் error body-ஐ உருவாக்குவதற்கு அனுமதிக்கப்பட்ட ஒரே வழி இதுதான். Reference implementation-க்கு `open-sse/executors/cursor.ts::buildErrorResponse`-ஐப் பார்க்கவும்.

### 3. Logging மற்றும் response அனுப்புதல்

நம்பகமான உள் exception-கள் அவற்றின் முழுமையான message மற்றும் stack-ஐ வைத்திருக்கலாம்; இதன் மூலம் operator-கள் debug செய்ய முடியும். Provider, validation, browser-session அல்லது credential-ஐ ஒட்டிய boundary-களில் தோன்றும் மதிப்புகள்
console output, audit metadata அல்லது நிரந்தர call log-களுக்குள் நுழைவதற்கு முன் sanitize செய்யப்பட வேண்டும். Pattern:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // நம்பகமான உள் exception-க்கு மட்டும்
  return errorResponse(500, getErrorMessage(err)); // sanitize செய்யப்பட்டது — client-க்கு அனுப்பப்படுகிறது
}
```

Provider கட்டுப்பாட்டில் உள்ள failure-களுக்கு, log செய்யப்படும் மதிப்பையும் project செய்யவும்:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. தடைசெய்யப்பட்ட pattern-கள்

❌ **ஒருபோதும்** raw exception output-ஐ Response body-இல் சேர்க்காதீர்கள்:

```ts
// தவறு: stack trace + file path-கள் client-ஐ அடைகின்றன
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **ஒருபோதும்** நீங்களே first-line splitter-ஐ உருவாக்காதீர்கள்:

```ts
// தவறு: absolute path-களை நீக்கத் தவறுகிறது; canonical helper-இலிருந்து விலகக்கூடும்
const safe = String(err).split("\n")[0];
```

❌ **ஒருபோதும்** route-இல் மட்டும் sanitize செய்துவிட்டு SSE path-ஐ மறந்துவிடாதீர்கள். Stream-க்கு எழுதும் அனைத்தும் `writeStreamError` (அல்லது அதன் அடிப்படையான `buildErrorBody`) வழியாகச் செல்ல வேண்டும்.

❌ **ஒருபோதும்** `process.cwd()`, `__filename`, `__dirname` அல்லது env-இலிருந்து பெறப்பட்ட path-களை வேண்டுமென்றே
பிழைச் செய்திகளில் சேர்க்காதீர்கள். Defense in depth-க்காக sanitizer absolute path-களைக் கையாளுகிறது; ஆனால் caller-கள் முதலில்
system topology-ஐ வெளிப்படுத்தும் செய்திகளை உருவாக்கவே கூடாது.

## CI-இல் கவரேஜ்

`tests/unit/error-message-sanitization.test.ts` பின்வருவனவற்றை உறுதிப்படுத்துகிறது:

- `/api/model-combo-mappings/*`-இன் கீழுள்ள ஒவ்வொரு route-உம் 4xx/5xx நிலைகளில் சுத்திகரிக்கப்பட்ட body-களைத் திருப்பியளிக்கிறது.
- `sanitizeErrorMessage` பல-வரி stack trace-களை அகற்றுகிறது.
- `sanitizeErrorMessage` POSIX மற்றும் Windows absolute path-களை `<path>` என்பதால் மாற்றுகிறது.
- `sanitizeErrorMessage`, `null`/`undefined`/`Error` instance உள்ளீடுகளைப் பாதுகாப்பாகக் கையாளுகிறது.
- `buildErrorBody`, அதன் `message` field-இல் stack trace-களை ஒருபோதும் வெளிப்படுத்தாது.

புதிய route அல்லது executor-ஐச் சேர்க்கும்போது, இந்தக் கோப்பிலுள்ள assertion வடிவத்தை நகலெடுக்கவும். கவரேஜ் வரம்பு (`npm run test:coverage`) statements/lines/functions/branches ஆகியவற்றுக்கு ≥60% என்பதை அமல்படுத்துகிறது — error path-களும் கட்டாயம் கவரேஜில் இடம்பெற வேண்டும்.

## தொடர்புடைய கட்டுப்பாடுகள்

- `.github/security`-இல் உள்ள `js/stack-trace-exposure` CodeQL எச்சரிக்கைகள் எப்போதும் **ஒன்று** இந்த helper-கள் மூலம் சரிசெய்யப்பட வேண்டும் **அல்லது** இந்த ஆவணத்தை மேற்கோள் காட்டும் comment-உடன் நிராகரிக்கப்பட வேண்டும்.
- `pino` மறைப்புக் கட்டமைப்பு (`src/shared/utils/logRedaction.ts`) நம்பகமான structured log-களைத் தனியாகக் கையாளுகிறது. இந்த ஆவணம் பொதுப் பதில் message-களையும், நீடித்த call/proxy-log எல்லைகளைக் கடக்கும் provider-ஆல் கட்டுப்படுத்தப்படும் value-களையும் உள்ளடக்குகிறது.
- Upstream-header denylist (`src/shared/constants/upstreamHeaders.ts`) header கசிவை உள்ளடக்குகிறது — புதிய exfiltration அபாயத்தைச் சேர்க்கும்போது இரண்டு கோப்புகளையும் ஒன்றுக்கொன்று இணக்கமாக வைத்திருக்கவும்.

## Upstream விவரங்களின் passthrough

`buildErrorBody`, விருப்பத்திற்குரிய மூன்றாவது argument-ஆக `upstreamDetails`-ஐ ஏற்கிறது (upstream provider-இலிருந்து பெறப்பட்ட raw parsed body). அது வழங்கப்படும்போது, response-இல் `upstream_details` ஆகச் சேர்க்கப்படுவதற்கு முன்பு `sanitizeUpstreamDetails` மூலம் சுத்திகரிக்கப்படுகிறது.

விருப்பத்திற்குரிய நான்காவது argument `classification`
(`{ type?: string; code?: string; reason?: string }`) வெளிப்படையான public classification-ஐ ஏற்கிறது.
ஒவ்வொரு field-உம் வரம்பிடப்பட்ட public-identifier சொற்களஞ்சியத்திற்குள் கொண்டு வரப்படுகிறது. பாதுகாப்பற்ற, credential வடிவிலான, control-character கொண்ட அல்லது அளவுக்கு அதிகமாக நீளமான value-கள் status-இலிருந்து பெறப்பட்ட type/code-க்கு மாறும்; பாதுகாப்பற்ற விருப்பத்திற்குரிய reason நீக்கப்படும். மூன்று இலக்க HTTP status identifier-கள் (`100` முதல் `599` வரை), எண்ணியல் upstream status-ஐ machine-readable code-ஆக வெளிப்படுத்தும் provider contract-களுக்கு செல்லுபடியாகவே இருக்கும். உள்நாட்டில் உருவாக்கப்படும் HTTP-status placeholder வடிவத்திலும் அதே வரம்பு ஏற்கப்படுகிறது; தன்னிச்சையான provider எண்களும் பெயர்களும் சொற்களஞ்சியத்திற்கு வெளியிலேயே இருக்கும்.

ஒவ்வொரு வெளிப்படையான classification-ஐயும் அந்த நான்காவது argument-இல் அனுப்பவும். `buildErrorBody()` திரும்பிய பிறகு `body.error.code`, `body.error.type`, அல்லது `body.error.reason` ஆகியவற்றை ஒருபோதும் overwrite செய்ய வேண்டாம்;
builder-க்குப் பிந்தைய mutation, public projection-ஐத் தவிர்த்துவிடுகிறது.

`upstreamDetails`-க்கு பயன்படுத்தப்படும் சுத்திகரிப்பு விதிகள்:

1. String leaf-கள்: `sanitizeErrorMessage` வழியாகச் செலுத்தப்படுகின்றன (stack-களையும் absolute path-களையும் அகற்றுகிறது).
2. பாதுகாப்பற்ற path, credential, session-alias மற்றும் prototype-control key-கள் அகற்றப்படுகின்றன.
3. ஆழ வரம்பு: 4 நிலைகளுக்கு அப்பாற்பட்ட nesting, `"[truncated]"` என்ற string-ஆல் மாற்றப்படுகிறது.
4. Array-கள் அதிகபட்சம் 32 element-களாக வரம்பிடப்படுகின்றன.

Parsed provider error body உள்ள call site-கள் மட்டுமே `upstreamDetails`-ஐ அனுப்ப வேண்டும். உள்துறை OmniRoute error-கள் (SSE parse failure-கள், வெற்று content, guardrail block-கள்) அதைச் சேர்க்கக்கூடாது.

Raw `err.stack`, `err.message`, அல்லது runtime exception-இலிருந்து பெறப்படும் எந்த string-ஐயும்
`upstreamDetails`-க்கு அனுப்ப **வேண்டாம்**. அவை upstream body இல்லாமல்
`errorResponse` / `buildErrorBody(code, msg)` வழியாகவே செல்ல வேண்டும்.

தேர்ந்தெடுக்கப்பட்ட upstream 4xx passthrough, client auto-recovery-க்குத் தேவையான provider-இன் பாதுகாப்பான JSON வடிவத்தையும் சொற்றொடரையும் பாதுகாக்கிறது; ஆனால் இது byte-for-byte passthrough அல்ல: serialization-க்கு முன்பு recursive sanitizer எப்போதும் இயக்கப்படும். Cyclic, BigInt கொண்ட, அல்லது தீங்கிழைக்கும் `toJSON()` body-கள் பாதுகாப்பாக மறுக்கப்பட்டு passthrough-க்கு தகுதியற்றவையாகும். OCR மற்றும் moderation ஆகியவையும் இதே விதியைப் பயன்படுத்துகின்றன; JSON அல்லாத, வெற்றான, அல்லது தவறாகக் குறியிடப்பட்ட upstream body-கள் canonical OmniRoute JSON error envelope-ஆக மாற்றப்படுகின்றன.

## அறியப்பட்ட CodeQL வரம்பு: தனிப்பயன் சுத்திகரிப்பான்கள் அங்கீகரிக்கப்படுவதில்லை

CodeQL வினவல் [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) சுத்திகரிப்பான் வடிவங்களின் நிலையான அனுமதிப்பட்டியலைப் பயன்படுத்துகிறது (எ.கா. இன்லைன் `.split("\n")[0]`, குறிப்பிட்ட regex வடிவங்களுடன் `String#replace`, `Error`-இல் உள்ள `.message`-ஐ அணுகுதல்). நமது `sanitizeErrorMessage()` போன்ற தனிப்பயன் உதவிச் செயல்பாட்டின் வழியான மறைமுகச் செயல்பாட்டை இது **அங்கீகரிப்பதில்லை**.

இதன் பொருள், இந்தத் தொகுதியின் வழியாக உறுதியாகச் சுத்திகரிக்கும் அழைப்பிடங்கள் — எடுத்துக்காட்டாக `open-sse/utils/error.ts::errorResponse` மற்றும் `open-sse/executors/cursor.ts::buildErrorResponse` — குறியீடு செயல்பாட்டு ரீதியாகப் பாதுகாப்பானதாக இருந்தாலும் தொடர்ந்து எச்சரிக்கையை எழுப்பக்கூடும். முன்னுதாரண நிராகரிப்புகள்: `#224`, `#231` (மே 2026); இரண்டும் தொழில்நுட்ப நியாயப்படுத்தலுடன் `false positive` எனக் குறிக்கப்பட்டுள்ளன.

**புதிய நிகழ்வைக் கையாளும் முறை:**

1. அழைப்பிடம் உண்மையில் செய்தியை `sanitizeErrorMessage` / `buildErrorBody` / மேலே ஆவணப்படுத்தப்பட்டுள்ள wrapper-களில் ஒன்றின் வழியாக அனுப்புவதை உறுதிப்படுத்தவும் (அழைப்புச் சங்கிலியைத் தொடக்கம் முதல் முடிவு வரை படிக்கவும் — கருத்துரையை மட்டும் நம்ப வேண்டாம்).
2. `tests/unit/error-message-sanitization.test.ts` அந்தப் பாதையைச் சோதிப்பதை உறுதிப்படுத்தவும் (அல்லது சோதனைப் பரப்பைச் சேர்க்கவும்).
3. இந்த ஆவணத்தைக் குறிப்பிட்டு, `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` வழியாக எச்சரிக்கையை நிராகரிக்கவும்.
4. எல்லா இடங்களிலும் `.split("\n")[0]`-ஐ இன்லைன் செய்வதன் மூலம் இதை "சரிசெய்ய" **வேண்டாம்** — உதவிச் செயல்பாடே உண்மைக்கான ஒற்றை ஆதாரம்; ஸ்கேனரைத் திருப்திப்படுத்துவது போன்ற தோற்றத்திற்காக இந்த வடிவத்தை நகலெடுப்பது சுத்திகரிப்பானைப் பலவீனப்படுத்துகிறது (பாதை மறைத்தல், நீள வரம்பு, வகை மாற்றம் ஆகியவற்றை இழக்கச் செய்கிறது).

CodeQL-இன் [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) போன்ற விருப்பத்தேர்வு அம்சங்களை ஏற்றுக்கொள்வதே நீண்டகாலத் தீர்வாகும்; அது இந்த ஆவணத்தின் வரம்புக்கு அப்பாற்பட்டது.

## மேற்கோள்கள்

- [CWE-209: பிழைச் செய்தி வழியாகத் தகவல் வெளிப்பாடு](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: பிழைக் கையாளுதல் குறிப்பேடு](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- உதவிச் செயல்பாட்டை மையப்படுத்திய commit: `1a39c31f` — _fix(security): பொது upstream நற்சான்றுகளை மறைத்து, பிழைச் சுத்திகரிப்பை மையப்படுத்துதல்_
