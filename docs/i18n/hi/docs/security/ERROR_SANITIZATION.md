# Error Message Sanitization (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **प्रामाणिक स्रोत:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, और `open-sse/utils/error.ts` में मौजूद सार्वजनिक builders
> **परीक्षण:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **अंतिम अपडेट:** 2026-09-02 — v3.8.51
> **लक्षित पाठक:** त्रुटि प्रतिक्रियाओं (HTTP routes, SSE streams, executors, MCP handlers) पर काम करने वाला कोई भी इंजीनियर।
> **स्थिति:** क्लाइंट को त्रुटि संदेश लौटाने वाले प्रत्येक code path के लिए **अनिवार्य**।

## यह क्यों मौजूद है

CodeQL नियम `js/stack-trace-exposure` (CWE-209) ऐसे किसी भी code path को चिह्नित करता है जहाँ runtime exception से उत्पन्न त्रुटि संदेश sanitize हुए बिना HTTP / SSE प्रतिक्रिया तक पहुँचता है। Production प्रतिक्रियाओं में stack traces और absolute file paths हमलावरों को निम्नलिखित जानकारी देते हैं:

- आंतरिक directory layout (`/srv/app/src/lib/...`) → आगे के हमलों के लिए टोह लेने में सहायक।
- Stack frames से अनुमानित library / framework versions → लक्षित exploit चुनने में सहायक।
- संवेदनशील runtime values, जिन्हें errors में string-interpolate किया गया हो सकता है (DB queries, config values)।

`open-sse/utils/error.ts` द्वारा export किया गया `sanitizeErrorMessage` helper इन प्रकार के
लीकेज को हटाता है:

1. भौतिक, serialized और स्पष्ट रूप से inline JavaScript stack-frame tails।
2. Absolute POSIX, Windows, UNC और `file://` filesystem paths, जबकि सुरक्षित HTTPS URLs
   और स्पष्ट रूप से चिह्नित API routes सुरक्षित रखे जाते हैं।
3. Credential assignments, सामान्य provider token formats, private-key PEM blocks और base64 data
   URLs।

Sanitizer input की लंबाई सीमित करता है और जब कोई thrown value string coercion को अस्वीकार करती है, तब सुरक्षित रूप से विफल होता है।
Recursive upstream JSON sanitization भी प्रतिक्रिया को serialize करने से पहले असुरक्षित credential/path keys, session aliases और
prototype-control keys को हटा देता है।

## अनिवार्य pattern

### 1. त्रुटि प्रतिक्रिया बनाना (HTTP / API routes)

`buildErrorBody()` का उपयोग करें — sanitization अंतर्निहित है:

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

या उसी module के सुविधाजनक wrappers के लिए:

```ts
import {
  errorResponse, // एकल-उपयोग वाला Response object
  writeStreamError, // SSE writer
  createErrorResult, // { success: false, status, response, ... } संरचना
  unavailableResponse, // Retry-After जोड़ता है
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

ये सभी canonical public-error boundary लागू करते हैं। `errorResponse`, `writeStreamError` और
`createErrorResult`, `buildErrorBody` के माध्यम से जाते हैं; तीनों विशेष retry/circuit helpers
अपने public context को सीधे project और sanitize करते हैं। इन helpers का उपयोग करते समय
**आपको कभी भी `sanitizeErrorMessage` को manually call करने की आवश्यकता नहीं होती**।

### 2. Custom error envelopes (दुर्लभ)

जब आप ऊपर दिए गए helpers का उपयोग नहीं कर सकते (उदाहरण के लिए, response shape को Connect-RPC जैसे किसी upstream protocol द्वारा निर्धारित किया जाता है), तो `sanitizeErrorMessage` को सीधे import करें:

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

Custom error body बनाने का यही एकमात्र स्वीकृत तरीका है। संदर्भ implementation के लिए `open-sse/executors/cursor.ts::buildErrorResponse` देखें।

### 3. Logging बनाम responding

विश्वसनीय आंतरिक exceptions अपने पूरे message और stack को बनाए रख सकते हैं, ताकि operators debug कर सकें। Provider, validation, browser-session या credential-adjacent boundaries से उत्पन्न
values को console output, audit metadata या persistent call logs में जाने से पहले
sanitize किया जाना चाहिए। Pattern:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // केवल विश्वसनीय आंतरिक exception
  return errorResponse(500, getErrorMessage(err)); // sanitized — क्लाइंट को भेजा गया
}
```

Provider-controlled failures के लिए logged value को भी project करें:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. निषिद्ध patterns

❌ Raw exception output को Response body में **कभी न डालें**:

```ts
// गलत: stack trace + file paths क्लाइंट तक पहुँचते हैं
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ अपना first-line splitter **कभी न बनाएँ**:

```ts
// गलत: absolute paths हटाना भूल जाता है और canonical helper से अलग हो सकता है
const safe = String(err).split("\n")[0];
```

❌ Route में sanitize करके SSE path को **कभी न भूलें**। Stream में लिखी जाने वाली हर चीज़ `writeStreamError` (या उसके अंतर्निहित `buildErrorBody`) से होकर गुजरती है।

❌ त्रुटि संदेशों में जानबूझकर `process.cwd()`, `__filename`, `__dirname` या env-derived paths
**कभी शामिल न करें**। Sanitizer defense in depth के रूप में absolute paths को संभालता है, लेकिन callers को शुरुआत से ही
topology-bearing messages नहीं बनाने चाहिए।

## CI में कवरेज

`tests/unit/error-message-sanitization.test.ts` निम्नलिखित लागू करता है:

- `/api/model-combo-mappings/*` के अंतर्गत प्रत्येक रूट 4xx/5xx पर सैनिटाइज़ की गई बॉडी लौटाता है।
- `sanitizeErrorMessage` बहु-पंक्ति स्टैक ट्रेस हटाता है।
- `sanitizeErrorMessage` POSIX और Windows के एब्सोल्यूट पाथ को `<path>` से बदलता है।
- `sanitizeErrorMessage` `null`/`undefined`/`Error` इंस्टेंस इनपुट को सुरक्षित रूप से संभालता है।
- `buildErrorBody` अपने `message` फ़ील्ड में कभी भी स्टैक ट्रेस उजागर नहीं करता।

नया रूट या एक्ज़ीक्यूटर जोड़ते समय, इस फ़ाइल से असर्शन पैटर्न कॉपी करें। कवरेज गेट (`npm run test:coverage`) ≥60% स्टेटमेंट/लाइन/फ़ंक्शन/ब्रांच लागू करता है — त्रुटि पाथ कवर होने चाहिए।

## संबंधित नियंत्रण

- `.github/security` में `js/stack-trace-exposure` CodeQL अलर्ट को हमेशा **या तो** इन हेल्पर के माध्यम से ठीक किया जाना चाहिए **या** इस दस्तावेज़ का उल्लेख करने वाली टिप्पणी के साथ खारिज किया जाना चाहिए।
- `pino` रिडैक्शन कॉन्फ़िगरेशन (`src/shared/utils/logRedaction.ts`) विश्वसनीय स्ट्रक्चर्ड लॉग को
  अलग से संभालता है। यह दस्तावेज़ सार्वजनिक रिस्पॉन्स संदेशों और प्रोवाइडर-नियंत्रित मानों को कवर करता है, जो
  स्थायी कॉल/प्रॉक्सी-लॉग सीमाओं को पार करते हैं।
- अपस्ट्रीम-हेडर डिनायलिस्ट (`src/shared/constants/upstreamHeaders.ts`) हेडर लीकेज को कवर करती है — नई एक्सफ़िल्ट्रेशन संबंधी चिंता जोड़ते समय दोनों फ़ाइलों को समन्वित रखें।

## अपस्ट्रीम विवरण का पासथ्रू

`buildErrorBody` एक वैकल्पिक तीसरा आर्ग्युमेंट `upstreamDetails` (अपस्ट्रीम
प्रोवाइडर से प्राप्त रॉ पार्स की गई बॉडी) स्वीकार करता है। दिए जाने पर, रिस्पॉन्स में `upstream_details`
के रूप में शामिल किए जाने से पहले इसे `sanitizeUpstreamDetails` द्वारा सैनिटाइज़ किया जाता है।

एक वैकल्पिक चौथा आर्ग्युमेंट `classification`
(`{ type?: string; code?: string; reason?: string }`) स्पष्ट सार्वजनिक वर्गीकरण स्वीकार करता है।
प्रत्येक फ़ील्ड को सीमित सार्वजनिक-आइडेंटिफ़ायर शब्दावली पर प्रोजेक्ट किया जाता है। असुरक्षित, क्रेडेंशियल-जैसे,
कंट्रोल-कैरेक्टर वाले या अत्यधिक लंबे मान स्टेटस से प्राप्त type/code पर फ़ॉलबैक होते हैं; असुरक्षित वैकल्पिक
reason को छोड़ दिया जाता है। तीन-अंकीय HTTP स्टेटस आइडेंटिफ़ायर (`100` से `599` तक) उन
प्रोवाइडर कॉन्ट्रैक्ट के लिए मान्य रहते हैं जो संख्यात्मक अपस्ट्रीम स्टेटस को मशीन-पठनीय कोड के रूप में उजागर करते हैं। यही
सीमित रेंज स्थानीय रूप से जनरेट किए गए HTTP-स्टेटस प्लेसहोल्डर प्रारूप में स्वीकार की जाती है; मनमाने प्रोवाइडर
नंबर और नाम शब्दावली के बाहर रहते हैं।

प्रत्येक स्पष्ट वर्गीकरण को उसी चौथे आर्ग्युमेंट में पास करें। `buildErrorBody()` के लौटने के बाद कभी भी
`body.error.code`, `body.error.type`, या `body.error.reason` को ओवरराइट न करें;
बिल्डर के बाद किया गया म्यूटेशन सार्वजनिक प्रोजेक्शन को बायपास करता है।

`upstreamDetails` पर लागू सैनिटाइज़ेशन नियम:

1. स्ट्रिंग लीफ़: `sanitizeErrorMessage` से गुज़रती हैं (स्टैक + एब्सोल्यूट पाथ हटाता है)।
2. असुरक्षित पाथ, क्रेडेंशियल, सेशन-एलियास और प्रोटोटाइप-कंट्रोल कुंजियाँ हटा दी जाती हैं।
3. गहराई सीमा: 4 स्तरों से आगे की नेस्टिंग को `"[truncated]"` स्ट्रिंग से बदल दिया जाता है।
4. ऐरे अधिकतम 32 एलिमेंट तक सीमित होते हैं।

केवल पार्स की गई प्रोवाइडर त्रुटि बॉडी वाले कॉल साइट को `upstreamDetails` पास करना चाहिए। आंतरिक OmniRoute
त्रुटियों (SSE पार्स विफलताएँ, खाली कंटेंट, गार्डरेल ब्लॉक) में इसे शामिल नहीं किया जाना चाहिए।

रॉ `err.stack`, `err.message`, या रनटाइम एक्सेप्शन से प्राप्त किसी भी स्ट्रिंग को
`upstreamDetails` में पास न करें। इन्हें अब भी बिना अपस्ट्रीम बॉडी के
`errorResponse` / `buildErrorBody(code, msg)` से गुज़रना चाहिए।

चयनात्मक अपस्ट्रीम 4xx पासथ्रू क्लाइंट ऑटो-रिकवरी के लिए आवश्यक प्रोवाइडर की सुरक्षित JSON संरचना और शब्दावली को
बनाए रखता है, लेकिन यह बाइट-दर-बाइट पासथ्रू नहीं है: सीरियलाइज़ेशन से पहले रिकर्सिव सैनिटाइज़र हमेशा
चलता है। साइकलिक, BigInt युक्त या शत्रुतापूर्ण `toJSON()` बॉडी बंद-सुरक्षित तरीके से विफल होती हैं और
पासथ्रू के योग्य नहीं होतीं। OCR और मॉडरेशन भी यही नियम लागू करते हैं; गैर-JSON, खाली या गलत-लेबल वाली
अपस्ट्रीम बॉडी को मानक OmniRoute JSON त्रुटि एनवेलप में बदल दिया जाता है।

## ज्ञात CodeQL सीमा: कस्टम सैनिटाइज़र पहचाने नहीं जाते

CodeQL क्वेरी [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) सैनिटाइज़र पैटर्न की एक निश्चित अनुमतिसूची का उपयोग करती है (उदा. इनलाइन `.split("\n")[0]`, विशिष्ट regex संरचनाओं के साथ `String#replace`, `Error` पर `.message` का एक्सेस)। यह हमारे `sanitizeErrorMessage()` जैसे कस्टम हेल्पर के माध्यम से होने वाले अप्रत्यक्ष उपयोग को **नहीं** पहचानती।

इसका अर्थ है कि इस मॉड्यूल के माध्यम से स्पष्ट रूप से सैनिटाइज़ करने वाले कॉलसाइट—उदाहरण के लिए `open-sse/utils/error.ts::errorResponse` और `open-sse/executors/cursor.ts::buildErrorResponse`—कोड के कार्यात्मक रूप से सुरक्षित होने के बावजूद अलर्ट उत्पन्न करना जारी रख सकते हैं। पूर्व में खारिज किए गए उदाहरण: `#224`, `#231` (मई 2026), दोनों को तकनीकी औचित्य के साथ `false positive` चिह्नित किया गया था।

**नई घटना को संभालने का तरीका:**

1. पुष्टि करें कि कॉलसाइट वास्तव में संदेश को `sanitizeErrorMessage` / `buildErrorBody` / ऊपर दस्तावेज़ित किसी रैपर के माध्यम से भेजता है (कॉल शृंखला को शुरू से अंत तक पढ़ें—किसी टिप्पणी पर भरोसा न करें)।
2. पुष्टि करें कि `tests/unit/error-message-sanitization.test.ts` उस पथ का परीक्षण करता है (या कवरेज जोड़ें)।
3. इस दस्तावेज़ का संदर्भ देते हुए `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` के माध्यम से अलर्ट खारिज करें।
4. हर जगह `.split("\n")[0]` इनलाइन करके इसे "ठीक" **नहीं** करें—हेल्पर ही सत्य का एकमात्र स्रोत है; स्कैनर को संतुष्ट करने के दिखावे के लिए पैटर्न की नकल करना सैनिटाइज़र को कमजोर करता है (पाथ स्क्रबिंग, लंबाई सीमा और प्रकार रूपांतरण समाप्त हो जाते हैं)।

CodeQL के [`@codeql/javascript-models` कस्टम सैनिटाइज़र कॉन्फ़िगरेशन](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) जैसी ऑप्ट-इन सुविधाओं को अपनाना दीर्घकालिक समाधान है; यह इस दस्तावेज़ के दायरे से बाहर है।

## संदर्भ

- [CWE-209: त्रुटि संदेश के माध्यम से जानकारी का प्रकटीकरण](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: त्रुटि प्रबंधन चीट शीट](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- हेल्पर को केंद्रीकृत करने वाला कमिट: `1a39c31f` — _fix(security): सार्वजनिक अपस्ट्रीम क्रेडेंशियल्स छिपाएँ + त्रुटि सैनिटाइज़ेशन केंद्रीकृत करें_
