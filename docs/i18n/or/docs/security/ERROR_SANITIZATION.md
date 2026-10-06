# Error Message Sanitization (ଓଡ଼ିଆ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **ସତ୍ୟର ପ୍ରାମାଣିକ ଉତ୍ସ:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, ଏବଂ `open-sse/utils/error.ts`ରେ ଥିବା ସାର୍ବଜନୀନ builders
> **ପରୀକ୍ଷାଗୁଡ଼ିକ:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **ଶେଷ ଅଦ୍ୟତନ:** 2026-09-02 — v3.8.51
> **ଲକ୍ଷ୍ୟ ପାଠକ:** ତ୍ରୁଟି ପ୍ରତିକ୍ରିୟାଗୁଡ଼ିକୁ ପରିବର୍ତ୍ତନ କରୁଥିବା ଯେକୌଣସି ଇଞ୍ଜିନିୟର୍ (HTTP routes, SSE streams, executors, MCP handlers)।
> **ସ୍ଥିତି:** କ୍ଲାଏଣ୍ଟକୁ ଏକ ତ୍ରୁଟି ସନ୍ଦେଶ ଫେରାଉଥିବା ପ୍ରତ୍ୟେକ code path ପାଇଁ **ବାଧ୍ୟତାମୂଳକ**।

## ଏହା କାହିଁକି ଅଛି

CodeQL ନିୟମ `js/stack-trace-exposure` (CWE-209) ଏପରି ଯେକୌଣସି code pathକୁ ଚିହ୍ନିତ କରେ, ଯେଉଁଠାରେ runtime exceptionରୁ ଆସୁଥିବା ଏକ ତ୍ରୁଟି ସନ୍ଦେଶ sanitize ନ ହୋଇ ଏକ HTTP / SSE responseରେ ପହଞ୍ଚେ। Production responseଗୁଡ଼ିକରେ ଥିବା stack trace ଏବଂ absolute file pathଗୁଡ଼ିକ ଆକ୍ରମଣକାରୀଙ୍କୁ ନିମ୍ନଲିଖିତ ସୂଚନା ଦିଅନ୍ତି:

- ଆଭ୍ୟନ୍ତରୀଣ directory layout (`/srv/app/src/lib/...`) → ପରବର୍ତ୍ତୀ ଆକ୍ରମଣ ପାଇଁ ତଥ୍ୟ ସଂଗ୍ରହ।
- Stack frameରୁ ଅନୁମାନ କରାଯାଇଥିବା library / framework version → ଲକ୍ଷ୍ୟଭିତ୍ତିକ exploit ଚୟନ।
- ତ୍ରୁଟିଗୁଡ଼ିକରେ string-interpolate ହୋଇପାରୁଥିବା ସମ୍ବେଦନଶୀଳ runtime valueଗୁଡ଼ିକ (DB query, config value)।

`open-sse/utils/error.ts` ଦ୍ୱାରା export କରାଯାଇଥିବା `sanitizeErrorMessage` helper ଏହି ଶ୍ରେଣୀର
ତଥ୍ୟ ଲିକ୍ଗୁଡ଼ିକୁ ହଟାଇଦିଏ:

1. ଭୌତିକ, serialized, ଏବଂ ସ୍ପଷ୍ଟ ଭାବରେ inline JavaScript stack-frame tailଗୁଡ଼ିକ।
2. ସୁରକ୍ଷିତ HTTPS URL ଏବଂ ସ୍ପଷ୍ଟ ଭାବେ ଚିହ୍ନିତ API routeଗୁଡ଼ିକୁ ସଂରକ୍ଷିତ ରଖି, absolute POSIX, Windows, UNC, ଏବଂ `file://` filesystem pathଗୁଡ଼ିକ।
3. Credential assignment, ସାଧାରଣ provider token format, private-key PEM block, ଏବଂ base64 data
   URLଗୁଡ଼ିକ।

Sanitizerଟି input length ସୀମିତ କରେ ଏବଂ କୌଣସି thrown value string coercionକୁ ପ୍ରତ୍ୟାଖ୍ୟାନ କଲେ ସୁରକ୍ଷିତ ଭାବରେ ବିଫଳ ହୁଏ।
Recursive upstream JSON sanitization ମଧ୍ୟ responseଟି serialize ହେବା ପୂର୍ବରୁ ଅସୁରକ୍ଷିତ credential/path key, session alias, ଏବଂ
prototype-control keyଗୁଡ଼ିକୁ ବାଦ ଦେଇଥାଏ।

## ବାଧ୍ୟତାମୂଳକ pattern

### 1. ଏକ ତ୍ରୁଟି response ନିର୍ମାଣ କରିବା (HTTP / API routes)

`buildErrorBody()` ବ୍ୟବହାର କରନ୍ତୁ — sanitization ଏଥିରେ built-in ଅଛି:

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

କିମ୍ବା, ସେହି moduleରେ ଥିବା convenience wrapperଗୁଡ଼ିକ ପାଇଁ:

```ts
import {
  errorResponse, // ଏକକ-ବ୍ୟବହାର Response object
  writeStreamError, // SSE writer
  createErrorResult, // { success: false, status, response, ... } ଆକୃତି
  unavailableResponse, // Retry-After ଯୋଗ କରେ
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

ଏହି ସମସ୍ତ canonical public-error boundary ପ୍ରୟୋଗ କରନ୍ତି। `errorResponse`, `writeStreamError`, ଏବଂ
`createErrorResult`, `buildErrorBody` ମାଧ୍ୟମରେ route ହୁଅନ୍ତି; ତିନୋଟି specialized retry/circuit helper
ସେମାନଙ୍କର public contextକୁ ସିଧାସଳଖ project ଏବଂ sanitize କରନ୍ତି। ଏହି helperଗୁଡ଼ିକ ବ୍ୟବହାର କରିବା ସମୟରେ **ଆପଣଙ୍କୁ କେବେବି
`sanitizeErrorMessage`କୁ manual ଭାବରେ call କରିବାକୁ ପଡ଼ିବ ନାହିଁ**।

### 2. Custom error envelopeଗୁଡ଼ିକ (ବିରଳ)

ଯେତେବେଳେ ଆପଣ ଉପରୋକ୍ତ helperଗୁଡ଼ିକ ବ୍ୟବହାର କରିପାରିବେ ନାହିଁ (ଉଦାହରଣ ସ୍ୱରୂପ response shapeଟି Connect-RPC ପରି ଏକ upstream protocol ଦ୍ୱାରା ନିର୍ଦ୍ଧାରିତ), ସିଧାସଳଖ `sanitizeErrorMessage` import କରନ୍ତୁ:

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

ଏକ custom error body ତିଆରି କରିବାର ଏହା ହେଉଛି ଏକମାତ୍ର ଅନୁମୋଦିତ ଉପାୟ। Reference implementation ପାଇଁ `open-sse/executors/cursor.ts::buildErrorResponse` ଦେଖନ୍ତୁ।

### 3. Logging ବନାମ responding

ବିଶ୍ୱସ୍ତ internal exceptionଗୁଡ଼ିକ ସେମାନଙ୍କର ସମ୍ପୂର୍ଣ୍ଣ message ଏବଂ stack ରଖିପାରିବେ, ଯାହାଦ୍ୱାରା operatorମାନେ debug କରିପାରିବେ। Provider, validation, browser-session, କିମ୍ବା credential-adjacent boundaryରୁ
ଆସୁଥିବା valueଗୁଡ଼ିକ console output, audit metadata, କିମ୍ବା persistent call logରେ ପ୍ରବେଶ କରିବା ପୂର୍ବରୁ
sanitize ହେବା ଆବଶ୍ୟକ। Pattern:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // କେବଳ ବିଶ୍ୱସ୍ତ internal exception
  return errorResponse(500, getErrorMessage(err)); // sanitize କରାଯାଇଛି — clientକୁ ପଠାଯାଇଛି
}
```

Provider-controlled failureଗୁଡ଼ିକ ପାଇଁ, logged valueଟିକୁ ମଧ୍ୟ project କରନ୍ତୁ:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. ନିଷିଦ୍ଧ patternଗୁଡ଼ିକ

❌ **କେବେବି** raw exception outputକୁ Response bodyରେ ରଖନ୍ତୁ ନାହିଁ:

```ts
// ଖରାପ: stack trace + file pathଗୁଡ଼ିକ client ପର୍ଯ୍ୟନ୍ତ ପହଞ୍ଚନ୍ତି
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **କେବେବି** ନିଜର first-line splitter ତିଆରି କରନ୍ତୁ ନାହିଁ:

```ts
// ଖରାପ: absolute path ହଟାଇବାକୁ ଭୁଲିଯାଏ, canonical helperଠାରୁ ଭିନ୍ନ ହୋଇପାରେ
const safe = String(err).split("\n")[0];
```

❌ Routeରେ sanitize କରି SSE pathକୁ **କେବେବି** ଭୁଲନ୍ତୁ ନାହିଁ। Streamକୁ ଲେଖୁଥିବା ଯେକୌଣସି ବିଷୟ `writeStreamError` (କିମ୍ବା ଏହାର underlying `buildErrorBody`) ମାଧ୍ୟମରେ ଯାଏ।

❌ ତ୍ରୁଟି ସନ୍ଦେଶଗୁଡ଼ିକରେ `process.cwd()`, `__filename`, `__dirname`, କିମ୍ବା env-derived pathଗୁଡ଼ିକୁ
ଇଚ୍ଛାକୃତ ଭାବରେ **କେବେବି** ସାମିଲ କରନ୍ତୁ ନାହିଁ। Defense in depth ଭାବରେ sanitizer absolute pathଗୁଡ଼ିକୁ ଆବୃତ କରେ, କିନ୍ତୁ callerମାନେ ପ୍ରଥମରୁ
topology-bearing message ତିଆରି କରିବା ଉଚିତ ନୁହେଁ।

## CI ରେ କଭରେଜ୍

`tests/unit/error-message-sanitization.test.ts` ନିମ୍ନଲିଖିତଗୁଡ଼ିକୁ ବାଧ୍ୟତାମୂଳକ କରେ:

- `/api/model-combo-mappings/*` ଅଧୀନରେ ଥିବା ପ୍ରତ୍ୟେକ ରୁଟ୍ 4xx/5xx ପାଇଁ ସାନିଟାଇଜ୍ କରାଯାଇଥିବା ବଡି ଫେରାଏ।
- `sanitizeErrorMessage` ବହୁ-ଧାଡ଼ି ବିଶିଷ୍ଟ ଷ୍ଟାକ୍ ଟ୍ରେସ୍ଗୁଡ଼ିକୁ ହଟାଏ।
- `sanitizeErrorMessage` POSIX ଏବଂ Windows ଆବସଲ୍ୟୁଟ୍ ପାଥ୍ଗୁଡ଼ିକୁ `<path>` ସହିତ ପ୍ରତିସ୍ଥାପନ କରେ।
- `sanitizeErrorMessage` `null`/`undefined`/`Error` ଇନ୍ଷ୍ଟାନ୍ସ ଇନ୍ପୁଟ୍ଗୁଡ଼ିକୁ ସୁରକ୍ଷିତ ଭାବରେ ପରିଚାଳନା କରେ।
- `buildErrorBody` ଏହାର `message` ଫିଲ୍ଡ୍ରେ କେବେ ମଧ୍ୟ ଷ୍ଟାକ୍ ଟ୍ରେସ୍ ପ୍ରକାଶ କରେ ନାହିଁ।

ଏକ ନୂତନ ରୁଟ୍ କିମ୍ବା ଏକ୍ସିକ୍ୟୁଟର୍ ଯୋଡ଼ିବା ସମୟରେ, ଏହି ଫାଇଲ୍ରୁ ଆସର୍ସନ୍ ପ୍ୟାଟର୍ନ୍ କପି କରନ୍ତୁ। କଭରେଜ୍ ଗେଟ୍ (`npm run test:coverage`) ≥60% ଷ୍ଟେଟମେଣ୍ଟ୍/ଲାଇନ୍/ଫଙ୍କସନ୍/ବ୍ରାଞ୍ଚ୍ ବାଧ୍ୟତାମୂଳକ କରେ — ଏରର୍ ପାଥ୍ଗୁଡ଼ିକ କଭର୍ ହେବା ଆବଶ୍ୟକ।

## ସମ୍ପର୍କିତ ନିୟନ୍ତ୍ରଣଗୁଡ଼ିକ

- `.github/security` ରେ ଥିବା `js/stack-trace-exposure` CodeQL ଆଲର୍ଟଗୁଡ଼ିକୁ ସର୍ବଦା **ହୁଏତ** ଏହି ହେଲ୍ପର୍ଗୁଡ଼ିକ ମାଧ୍ୟମରେ ସମାଧାନ କରାଯିବା ଉଚିତ **କିମ୍ବା** ଏହି ଡକ୍ୟୁମେଣ୍ଟ୍କୁ ଉଲ୍ଲେଖ କରୁଥିବା ଏକ କମେଣ୍ଟ୍ ସହିତ ଖାରଜ କରାଯିବା ଉଚିତ।
- `pino` ରିଡାକ୍ସନ୍ କନଫିଗ୍ (`src/shared/utils/logRedaction.ts`) ବିଶ୍ୱସ୍ତ ଷ୍ଟ୍ରକ୍ଚର୍ଡ୍ ଲଗ୍ଗୁଡ଼ିକୁ
  ପୃଥକ ଭାବରେ ପରିଚାଳନା କରେ। ଏହି ଡକ୍ୟୁମେଣ୍ଟ୍ ସାର୍ବଜନୀନ ରେସ୍ପନ୍ସ ମେସେଜ୍ ଏବଂ ସ୍ଥାୟୀ କଲ୍/ପ୍ରକ୍ସି-ଲଗ୍ ସୀମା ଅତିକ୍ରମ କରୁଥିବା ପ୍ରୋଭାଇଡର୍-ନିୟନ୍ତ୍ରିତ ମୂଲ୍ୟଗୁଡ଼ିକୁ କଭର୍ କରେ।
- ଅପ୍ଷ୍ଟ୍ରିମ୍-ହେଡର୍ ଡିନାଇଲିଷ୍ଟ୍ (`src/shared/constants/upstreamHeaders.ts`) ହେଡର୍ ଲିକେଜ୍କୁ କଭର୍ କରେ — ଏକ ନୂତନ ଡାଟା ବହିର୍ଗମନ ସମସ୍ୟା ଯୋଡ଼ିବା ସମୟରେ ଉଭୟ ଫାଇଲ୍କୁ ସମନ୍ୱିତ ରଖନ୍ତୁ।

## ଅପ୍ଷ୍ଟ୍ରିମ୍ ବିବରଣୀ ପାସ୍ଥ୍ରୁ

`buildErrorBody` ଏକ ଇଚ୍ଛାଧୀନ ତୃତୀୟ ଆର୍ଗୁମେଣ୍ଟ୍ `upstreamDetails` (ଅପ୍ଷ୍ଟ୍ରିମ୍ ପ୍ରୋଭାଇଡର୍ରୁ ମିଳିଥିବା ଅପରିବର୍ତ୍ତିତ
ପାର୍ସ୍ଡ ବଡି) ଗ୍ରହଣ କରେ। ଯେତେବେଳେ ଏହା ପ୍ରଦାନ କରାଯାଏ, ରେସ୍ପନ୍ସରେ `upstream_details` ଭାବରେ
ସାମିଲ କରାଯିବା ପୂର୍ବରୁ ଏହାକୁ `sanitizeUpstreamDetails` ଦ୍ୱାରା ସାନିଟାଇଜ୍ କରାଯାଏ।

ଏକ ଇଚ୍ଛାଧୀନ ଚତୁର୍ଥ ଆର୍ଗୁମେଣ୍ଟ୍ `classification`
(`{ type?: string; code?: string; reason?: string }`) ଏକ ସ୍ପଷ୍ଟ ସାର୍ବଜନୀନ କ୍ଲାସିଫିକେସନ୍ ଗ୍ରହଣ କରେ।
ପ୍ରତ୍ୟେକ ଫିଲ୍ଡ୍କୁ ସୀମିତ ସାର୍ବଜନୀନ-ଆଇଡେଣ୍ଟିଫାୟର୍ ଭୋକାବୁଲାରି ଉପରେ ପ୍ରୋଜେକ୍ଟ କରାଯାଏ। ଅସୁରକ୍ଷିତ, କ୍ରେଡେନ୍ସିଆଲ୍-ଆକୃତିର,
କଣ୍ଟ୍ରୋଲ୍-କ୍ୟାରେକ୍ଟର୍ ଥିବା, କିମ୍ବା ଅତ୍ୟଧିକ ଲମ୍ବା ମୂଲ୍ୟଗୁଡ଼ିକ ଷ୍ଟାଟସ୍ରୁ ଉତ୍ପନ୍ନ ଟାଇପ୍/କୋଡ୍କୁ ଫଲ୍ବ୍ୟାକ୍ କରେ; ଏକ ଅସୁରକ୍ଷିତ ଇଚ୍ଛାଧୀନ
ରିଜନ୍କୁ ବାଦ ଦିଆଯାଏ। ତିନି-ଅଙ୍କ ବିଶିଷ୍ଟ HTTP ଷ୍ଟାଟସ୍ ଆଇଡେଣ୍ଟିଫାୟର୍ (`100` ରୁ `599`) ସଂଖ୍ୟାତ୍ମକ ଅପ୍ଷ୍ଟ୍ରିମ୍ ଷ୍ଟାଟସ୍କୁ ମେସିନ୍-ରିଡେବଲ୍ କୋଡ୍ ଭାବରେ ପ୍ରକାଶ କରୁଥିବା
ପ୍ରୋଭାଇଡର୍ କଣ୍ଟ୍ରାକ୍ଟ୍ଗୁଡ଼ିକ ପାଇଁ ବୈଧ ରହେ। ସ୍ଥାନୀୟ ଭାବେ ସୃଷ୍ଟି କରାଯାଇଥିବା HTTP-ଷ୍ଟାଟସ୍ ପ୍ଲେସ୍ହୋଲ୍ଡର୍ ଫର୍ମରେ ସମାନ
ସୀମିତ ରେଞ୍ଜ୍ ଗ୍ରହଣ କରାଯାଏ; ଇଚ୍ଛାମତ ପ୍ରୋଭାଇଡର୍ ସଂଖ୍ୟା ଏବଂ ନାମଗୁଡ଼ିକ ଭୋକାବୁଲାରି ବାହାରେ ରହେ।

ପ୍ରତ୍ୟେକ ସ୍ପଷ୍ଟ କ୍ଲାସିଫିକେସନ୍କୁ ସେହି ଚତୁର୍ଥ ଆର୍ଗୁମେଣ୍ଟ୍ରେ ପାସ୍ କରନ୍ତୁ। `buildErrorBody()` ଫେରିବା ପରେ କେବେ ମଧ୍ୟ
`body.error.code`, `body.error.type`, କିମ୍ବା `body.error.reason` ଓଭର୍ରାଇଟ୍ କରନ୍ତୁ ନାହିଁ;
ବିଲ୍ଡର୍ ପରବର୍ତ୍ତୀ ମ୍ୟୁଟେସନ୍ ସାର୍ବଜନୀନ ପ୍ରୋଜେକ୍ସନ୍କୁ ବାଇପାସ୍ କରେ।

`upstreamDetails` ଉପରେ ପ୍ରୟୋଗ ହେଉଥିବା ସାନିଟାଇଜେସନ୍ ନିୟମଗୁଡ଼ିକ:

1. ଷ୍ଟ୍ରିଙ୍ଗ୍ ଲିଫ୍ଗୁଡ଼ିକ: `sanitizeErrorMessage` ମାଧ୍ୟମରେ ଚଳାନ୍ତୁ (ଷ୍ଟାକ୍ + ଆବସଲ୍ୟୁଟ୍ ପାଥ୍ ହଟାଏ)।
2. ଅସୁରକ୍ଷିତ ପାଥ୍, କ୍ରେଡେନ୍ସିଆଲ୍, ସେସନ୍-ଆଲିଆସ୍, ଏବଂ ପ୍ରୋଟୋଟାଇପ୍-କଣ୍ଟ୍ରୋଲ୍ କିଗୁଡ଼ିକୁ ହଟାଯାଏ।
3. ଡେପ୍ଥ୍ କ୍ୟାପ୍: 4 ସ୍ତରରୁ ଅଧିକ ନେଷ୍ଟିଂକୁ `"[truncated]"` ଷ୍ଟ୍ରିଙ୍ଗ୍ ସହିତ ପ୍ରତିସ୍ଥାପନ କରାଯାଏ।
4. ଆରେଗୁଡ଼ିକୁ 32ଟି ଏଲିମେଣ୍ଟ୍ରେ ସୀମିତ କରାଯାଏ।

କେବଳ ପାର୍ସ୍ଡ ପ୍ରୋଭାଇଡର୍ ଏରର୍ ବଡି ଥିବା କଲ୍ ସାଇଟ୍ଗୁଡ଼ିକ `upstreamDetails` ପାସ୍ କରିବା ଉଚିତ। ଆଭ୍ୟନ୍ତରୀଣ OmniRoute
ଏରର୍ଗୁଡ଼ିକ (SSE ପାର୍ସ୍ ବିଫଳତା, ଖାଲି କଣ୍ଟେଣ୍ଟ୍, ଗାର୍ଡରେଲ୍ ବ୍ଲକ୍) ଏହାକୁ ସାମିଲ କରିବା ଉଚିତ ନୁହେଁ।

ଅପରିବର୍ତ୍ତିତ `err.stack`, `err.message`, କିମ୍ବା ଏକ ରନ୍ଟାଇମ୍ ଏକ୍ସେପ୍ସନ୍ରୁ ଆସିଥିବା କୌଣସି ଷ୍ଟ୍ରିଙ୍ଗ୍କୁ
`upstreamDetails` କୁ ପାସ୍ କରନ୍ତୁ ନାହିଁ। ଅପ୍ଷ୍ଟ୍ରିମ୍ ବଡି ବିନା ସେଗୁଡ଼ିକୁ ତଥାପି
`errorResponse` / `buildErrorBody(code, msg)` ମାଧ୍ୟମରେ ଯିବାକୁ ପଡ଼ିବ।

ଚୟନାତ୍ମକ ଅପ୍ଷ୍ଟ୍ରିମ୍ 4xx ପାସ୍ଥ୍ରୁ କ୍ଲାଏଣ୍ଟ୍ ଅଟୋ-ରିକଭରି ପାଇଁ ଆବଶ୍ୟକ ପ୍ରୋଭାଇଡର୍ର ସୁରକ୍ଷିତ JSON ଆକୃତି ଏବଂ ଶବ୍ଦବିନ୍ୟାସକୁ ସଂରକ୍ଷଣ କରେ,
କିନ୍ତୁ ଏହା ବାଇଟ୍-ଫର୍-ବାଇଟ୍ ପାସ୍ଥ୍ରୁ ନୁହେଁ: ସିରିଆଲାଇଜେସନ୍ ପୂର୍ବରୁ ରିକର୍ସିଭ୍ ସାନିଟାଇଜର୍ ସର୍ବଦା
ଚାଲେ। ସାଇକ୍ଲିକ୍, BigInt-ଧାରଣକାରୀ, କିମ୍ବା ପ୍ରତିକୂଳ `toJSON()` ବଡିଗୁଡ଼ିକ ସୁରକ୍ଷିତ ଭାବରେ ବିଫଳ ହୁଏ ଏବଂ
ପାସ୍ଥ୍ରୁ ପାଇଁ ଯୋଗ୍ୟ ନୁହେଁ। OCR ଏବଂ ମଡରେସନ୍ ସମାନ ନିୟମ ପ୍ରୟୋଗ କରେ; ଅଣ-JSON, ଖାଲି, କିମ୍ବା ଭୁଲ୍ ଲେବଲ୍ ହୋଇଥିବା
ଅପ୍ଷ୍ଟ୍ରିମ୍ ବଡିଗୁଡ଼ିକୁ କ୍ୟାନୋନିକାଲ୍ OmniRoute JSON ଏରର୍ ଏନ୍ଭେଲପ୍ରେ ରୂପାନ୍ତର କରାଯାଏ।

## ଜଣାଶୁଣା CodeQL ସୀମାବଦ୍ଧତା: କଷ୍ଟମ୍ ସାନିଟାଇଜର୍ଗୁଡ଼ିକ ଚିହ୍ନଟ ହୁଏ ନାହିଁ

CodeQL କ୍ୱେରୀ [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) ସାନିଟାଇଜର୍ ପ୍ୟାଟର୍ନଗୁଡ଼ିକର ଏକ ସ୍ଥିର ଅନୁମୋଦନ ତାଲିକା ବ୍ୟବହାର କରେ (ଯଥା ଇନ୍ଲାଇନ୍ `.split("\n")[0]`, ନିର୍ଦ୍ଦିଷ୍ଟ regex ଆକୃତି ସହିତ `String#replace`, `Error` ଉପରେ `.message`କୁ ଆକ୍ସେସ୍ କରିବା)। ଏହା ଆମର `sanitizeErrorMessage()` ଭଳି ଏକ କଷ୍ଟମ୍ ହେଲ୍ପର୍ ମାଧ୍ୟମରେ ହେଉଥିବା ପରୋକ୍ଷ ବ୍ୟବହାରକୁ **ଚିହ୍ନଟ କରେ ନାହିଁ**।

ଏହାର ଅର୍ଥ, ଏହି ମଡ୍ୟୁଲ୍ ମାଧ୍ୟମରେ ପ୍ରମାଣଯୋଗ୍ୟ ଭାବରେ ସାନିଟାଇଜ୍ କରୁଥିବା callsiteଗୁଡ଼ିକ — ଉଦାହରଣ ସ୍ୱରୂପ `open-sse/utils/error.ts::errorResponse` ଏବଂ `open-sse/executors/cursor.ts::buildErrorResponse` — କୋଡ୍ଟି କାର୍ଯ୍ୟକ୍ଷମ ଭାବେ ସୁରକ୍ଷିତ ହୋଇଥିଲେ ମଧ୍ୟ ଆଲର୍ଟ ଉତ୍ପନ୍ନ କରିଚାଲିପାରନ୍ତି। ପୂର୍ବ ନଜିର ଭାବେ ଖାରଜ: `#224`, `#231` (ମେ 2026), ଉଭୟକୁ ପ୍ରାଯୁକ୍ତିକ ଯୁକ୍ତି ସହିତ `false positive` ଭାବେ ଚିହ୍ନିତ କରାଯାଇଛି।

**ଏକ ନୂତନ ଘଟଣାକୁ କିପରି ପରିଚାଳନା କରିବେ:**

1. callsiteଟି ପ୍ରକୃତରେ `sanitizeErrorMessage` / `buildErrorBody` / ଉପରେ ଲିପିବଦ୍ଧ wrapperଗୁଡ଼ିକ ମଧ୍ୟରୁ ଗୋଟିଏ ମାଧ୍ୟମରେ ସନ୍ଦେଶକୁ ପଠାଉଛି କି ନାହିଁ ସୁନିଶ୍ଚିତ କରନ୍ତୁ (ଆରମ୍ଭରୁ ଶେଷ ପର୍ଯ୍ୟନ୍ତ call chain ପଢ଼ନ୍ତୁ — କୌଣସି ମନ୍ତବ୍ୟକୁ ଅନ୍ଧ ଭାବେ ବିଶ୍ୱାସ କରନ୍ତୁ ନାହିଁ)।
2. `tests/unit/error-message-sanitization.test.ts` ସେହି ପଥକୁ ପରୀକ୍ଷା କରୁଛି କି ନାହିଁ ସୁନିଶ୍ଚିତ କରନ୍ତୁ (ନଚେତ୍ coverage ଯୋଗ କରନ୍ତୁ)।
3. ଏହି ଡକ୍ୟୁମେଣ୍ଟକୁ ଉଲ୍ଲେଖ କରି `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` ମାଧ୍ୟମରେ ଆଲର୍ଟଟି ଖାରଜ କରନ୍ତୁ।
4. ସବୁ ସ୍ଥାନରେ `.split("\n")[0]` ଇନ୍ଲାଇନ୍ କରି ଏହାକୁ "ଠିକ୍" କରନ୍ତୁ **ନାହିଁ** — ହେଲ୍ପର୍ଟି ହେଉଛି ଏକମାତ୍ର ନିର୍ଭରଯୋଗ୍ୟ ଉତ୍ସ; କେବଳ ସ୍କାନର୍କୁ ସନ୍ତୁଷ୍ଟ କରୁଥିବା ଦେଖାଇବା ପାଇଁ ପ୍ୟାଟର୍ନକୁ ନକଲ କରିବା ସାନିଟାଇଜର୍କୁ ଦୁର୍ବଳ କରେ (ପଥ ସ୍କ୍ରବିଂ, ଦୈର୍ଘ୍ୟ ସୀମା ଏବଂ ପ୍ରକାର ବାଧ୍ୟତାମୂଳକ ରୂପାନ୍ତରଣ ହରାଇଥାଏ)।

CodeQLର [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) ଭଳି opt-in ବୈଶିଷ୍ଟ୍ୟଗୁଡ଼ିକୁ ଗ୍ରହଣ କରିବା ହେଉଛି ଦୀର୍ଘମିଆଦୀ ସମାଧାନ; ଏହା ଏହି ଡକ୍ୟୁମେଣ୍ଟର ପରିସର ବାହାରେ ରହିଛି।

## ସନ୍ଦର୍ଭଗୁଡ଼ିକ

- [CWE-209: ଏକ ତ୍ରୁଟି ସନ୍ଦେଶ ମାଧ୍ୟମରେ ସୂଚନା ଉନ୍ମୋଚନ](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: ତ୍ରୁଟି ପରିଚାଳନା Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- ହେଲ୍ପର୍କୁ କେନ୍ଦ୍ରୀଭୂତ କରିଥିବା commit: `1a39c31f` — _fix(security): ସାର୍ବଜନୀନ upstream credentialsକୁ ମାସ୍କ କରନ୍ତୁ + error sanitizationକୁ କେନ୍ଦ୍ରୀଭୂତ କରନ୍ତୁ_
