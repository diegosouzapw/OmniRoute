# Error Message Sanitization (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **सत्यको आधिकारिक स्रोत:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, र `open-sse/utils/error.ts` मा रहेका सार्वजनिक builders
> **परीक्षणहरू:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **पछिल्लो अद्यावधिक:** 2026-09-02 — v3.8.51
> **लक्षित पाठक:** त्रुटि प्रतिक्रियाहरूमा काम गर्ने कुनै पनि इन्जिनियर (HTTP routes, SSE streams, executors, MCP handlers)।
> **स्थिति:** क्लाइन्टलाई त्रुटि सन्देश फिर्ता गर्ने प्रत्येक code path का लागि **अनिवार्य**।

## यो किन आवश्यक छ

CodeQL rule `js/stack-trace-exposure` (CWE-209) ले runtime exception बाट उत्पन्न भएको त्रुटि सन्देश sanitize नगरिकन HTTP / SSE प्रतिक्रियासम्म पुग्ने कुनै पनि code path लाई चिन्ह लगाउँछ। उत्पादन प्रतिक्रियाहरूमा भएका stack traces र absolute file paths ले आक्रमणकारीहरूलाई निम्न जानकारी दिन्छन्:

- आन्तरिक directory layout (`/srv/app/src/lib/...`) → थप आक्रमणका लागि reconnaissance।
- Stack frames बाट अनुमान गरिएका library / framework versions → लक्षित exploit चयन।
- त्रुटिहरूमा string-interpolate गरिएका हुन सक्ने संवेदनशील runtime values (DB queries, config values)।

`open-sse/utils/error.ts` बाट export गरिएको `sanitizeErrorMessage` helper ले यी प्रकारका
leakage हटाउँछ:

1. भौतिक, serialized, र स्पष्ट रूपमा inline JavaScript stack-frame tails।
2. सुरक्षित HTTPS URLs र स्पष्ट रूपमा चिन्ह लगाइएका API routes जोगाउँदै absolute POSIX, Windows, UNC, र `file://` filesystem paths।
3. Credential assignments, प्रचलित provider token formats, private-key PEM blocks, र base64 data
   URLs।

Sanitizer ले input length सीमित गर्छ र thrown value को string coercion असफल हुँदा सुरक्षित रूपमा बन्द हुन्छ।
Recursive upstream JSON sanitization ले response serialize हुनुअघि असुरक्षित credential/path keys, session aliases, र
prototype-control keys पनि हटाउँछ।

## अनिवार्य ढाँचा

### 1. त्रुटि response निर्माण गर्ने (HTTP / API routes)

`buildErrorBody()` प्रयोग गर्नुहोस् — sanitization अन्तर्निहित छ:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... handler को logic ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

वा, सोही module का सुविधा wrappers का लागि:

```ts
import {
  errorResponse, // एकैपटकमा प्रयोग हुने Response object
  writeStreamError, // SSE writer
  createErrorResult, // { success: false, status, response, ... } आकार
  unavailableResponse, // Retry-After थप्छ
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

यी सबैले canonical public-error boundary लागू गर्छन्। `errorResponse`, `writeStreamError`, र
`createErrorResult` लाई `buildErrorBody` मार्फत route गरिन्छ; तीनवटा विशेष retry/circuit helpers ले
आफ्नो सार्वजनिक context लाई सीधै project र sanitize गर्छन्। यी helpers प्रयोग गर्दा **तपाईंले कहिल्यै पनि
`sanitizeErrorMessage` लाई manually call गर्नुपर्दैन**।

### 2. अनुकूलित error envelopes (दुर्लभ)

माथिका helpers प्रयोग गर्न नसक्दा (उदाहरणका लागि, response shape Connect-RPC जस्तो upstream protocol ले निर्धारण गरेको अवस्थामा), `sanitizeErrorMessage` लाई सीधै import गर्नुहोस्:

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

अनुकूलित error body assemble गर्ने स्वीकृत तरिका यही मात्र हो। सन्दर्भ implementation का लागि `open-sse/executors/cursor.ts::buildErrorResponse` हेर्नुहोस्।

### 3. Logging र responding बीचको भिन्नता

विश्वसनीय आन्तरिक exceptions ले आफ्ना पूर्ण message र stack राख्न सक्छन्, जसले operators लाई debug गर्न मद्दत गर्छ। Provider, validation, browser-session, वा credential-सँग सम्बन्धित boundaries बाट
उत्पन्न हुने values लाई console output, audit metadata, वा persistent call logs मा प्रवेश गर्नुअघि
sanitize गर्नुपर्छ। ढाँचा:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // विश्वसनीय आन्तरिक exception का लागि मात्र
  return errorResponse(500, getErrorMessage(err)); // sanitize गरिएको — क्लाइन्टलाई पठाइन्छ
}
```

Provider द्वारा नियन्त्रित failures का लागि logged value लाई पनि project गर्नुहोस्:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. निषेधित ढाँचाहरू

❌ Raw exception output लाई Response body मा **कहिल्यै नराख्नुहोस्**:

```ts
// खराब: stack trace + file paths क्लाइन्टसम्म पुग्छन्
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ आफ्नै first-line splitter **कहिल्यै नबनाउनुहोस्**:

```ts
// खराब: absolute paths हटाउन बिर्सन्छ र canonical helper बाट अलग हुन सक्छ
const safe = String(err).split("\n")[0];
```

❌ Route मा मात्र sanitize गरेर SSE path लाई **कहिल्यै नबिर्सनुहोस्**। Stream मा लेख्ने कुनै पनि कुरा `writeStreamError` (वा यसको underlying `buildErrorBody`) मार्फत जानुपर्छ।

❌ त्रुटि सन्देशहरूमा `process.cwd()`, `__filename`, `__dirname`, वा env-derived paths लाई जानाजानी
**कहिल्यै समावेश नगर्नुहोस्**। Sanitizer ले defense in depth का रूपमा absolute paths समेट्छ, तर callers ले
सुरुदेखि नै topology समावेश गर्ने सन्देशहरू निर्माण गर्नुहुँदैन।

## CI मा कभरेज

`tests/unit/error-message-sanitization.test.ts` ले निम्न कुराहरू लागू गर्छ:

- `/api/model-combo-mappings/*` अन्तर्गतका प्रत्येक route ले 4xx/5xx मा स्वच्छ बनाइएका bodies फर्काउँछन्।
- `sanitizeErrorMessage` ले बहु-पङ्क्तीय stack traces हटाउँछ।
- `sanitizeErrorMessage` ले POSIX र Windows का absolute paths लाई `<path>` ले प्रतिस्थापन गर्छ।
- `sanitizeErrorMessage` ले `null`/`undefined`/`Error` instance inputs सुरक्षित रूपमा सम्हाल्छ।
- `buildErrorBody` ले यसको `message` field मा stack traces कहिल्यै उजागर गर्दैन।

नयाँ route वा executor थप्दा, यस file बाट assertion pattern प्रतिलिपि गर्नुहोस्। कभरेज gate (`npm run test:coverage`) ले statements/lines/functions/branches मा ≥60% लागू गर्छ — error paths कभर गरिनुपर्छ।

## सम्बन्धित नियन्त्रणहरू

- `.github/security` मा रहेका `js/stack-trace-exposure` CodeQL alerts सधैँ यी helpers मार्फत समाधान गरिएका **वा** यस doc लाई उद्धृत गर्ने comment सहित खारेज गरिएका हुनुपर्छ।
- `pino` redaction config (`src/shared/utils/logRedaction.ts`) ले विश्वसनीय structured logs लाई
  छुट्टै सम्हाल्छ। यस document ले public response messages र स्थायी call/proxy-log सीमाहरू
  पार गर्ने provider-नियन्त्रित values समेट्छ।
- Upstream-header denylist (`src/shared/constants/upstreamHeaders.ts`) ले header leakage समेट्छ — नयाँ exfiltration concern थप्दा दुवै files लाई समक्रमित राख्नुहोस्।

## Upstream विवरण passthrough

`buildErrorBody` ले वैकल्पिक तेस्रो argument `upstreamDetails` (upstream provider बाट आएको raw
parsed body) स्वीकार गर्छ। प्रदान गरिएको अवस्थामा, response मा `upstream_details` का रूपमा
समावेश गर्नुअघि यसलाई `sanitizeUpstreamDetails` द्वारा स्वच्छ बनाइन्छ।

वैकल्पिक चौथो argument `classification`
(`{ type?: string; code?: string; reason?: string }`) ले स्पष्ट public classification स्वीकार गर्छ।
प्रत्येक field लाई सीमित public-identifier vocabulary मा प्रक्षेपण गरिन्छ। असुरक्षित, credential-जस्तो,
control-character भएको, वा अत्यधिक लामो values status बाट व्युत्पन्न type/code मा fallback हुन्छन्; असुरक्षित वैकल्पिक
reason हटाइन्छ। तीन-अङ्कका HTTP status identifiers (`100` देखि `599`) numeric upstream status लाई machine-readable code का रूपमा उजागर गर्ने
provider contracts का लागि मान्य रहन्छन्। स्थानीय रूपमा उत्पन्न गरिएको HTTP-status placeholder form मा पनि यही
सीमित range स्वीकार गरिन्छ; मनोमानी provider numbers र names vocabulary बाहिरै रहन्छन्।

प्रत्येक स्पष्ट classification लाई उक्त चौथो argument मा pass गर्नुहोस्। `buildErrorBody()` फर्किएपछि
`body.error.code`, `body.error.type`, वा `body.error.reason` लाई कहिल्यै overwrite नगर्नुहोस्;
builder पछिको mutation ले public projection लाई bypass गर्छ।

`upstreamDetails` मा लागू हुने sanitization rules:

1. String leaves: `sanitizeErrorMessage` मार्फत चलाउनुहोस् (stacks + absolute paths हटाउँछ)।
2. असुरक्षित path, credential, session-alias, र prototype-control keys हटाइन्छन्।
3. Depth cap: 4 levels भन्दा गहिरो nesting लाई string `"[truncated]"` ले प्रतिस्थापन गरिन्छ।
4. Arrays लाई अधिकतम 32 elements मा सीमित गरिन्छ।

Parsed provider error body भएका call sites ले मात्र `upstreamDetails` pass गर्नुपर्छ। आन्तरिक OmniRoute
errors (SSE parse failures, खाली content, guardrail blocks) ले यसलाई समावेश गर्नु हुँदैन।

Raw `err.stack`, `err.message`, वा runtime exception बाट आएको कुनै पनि string लाई
`upstreamDetails` मा pass **नगर्नुहोस्**। ती अझै पनि upstream body बिना
`errorResponse` / `buildErrorBody(code, msg)` मार्फत जानुपर्छ।

चयनात्मक upstream 4xx passthrough ले client auto-recovery का लागि आवश्यक provider को सुरक्षित JSON shape र wording जोगाउँछ,
तर यो byte-for-byte passthrough होइन: serialization अघि recursive sanitizer सधैँ चल्छ।
Cyclic, BigInt-bearing, वा hostile `toJSON()` bodies बन्द भएर विफल हुन्छन् र passthrough का लागि
योग्य हुँदैनन्। OCR र moderation मा पनि यही rule लागू हुन्छ; non-JSON, खाली, वा गलत label गरिएका
upstream bodies लाई canonical OmniRoute JSON error envelope मा रूपान्तरण गरिन्छ।

## ज्ञात CodeQL सीमा: अनुकूलित स्यानिटाइजरहरू पहिचान हुँदैनन्

CodeQL क्वेरी [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) ले स्यानिटाइजर ढाँचाहरूको निश्चित अनुमति-सूची प्रयोग गर्छ (जस्तै इनलाइन `.split("\n")[0]`, निश्चित regex स्वरूपहरूसहितको `String#replace`, `Error` मा `.message` को पहुँच)। यसले हाम्रो `sanitizeErrorMessage()` जस्तो अनुकूलित सहायकमार्फत हुने अप्रत्यक्ष प्रयोगलाई **पहिचान गर्दैन**।

यसको अर्थ, यस मोड्युलमार्फत प्रमाणित रूपमा स्यानिटाइज गर्ने कलसाइटहरू — उदाहरणका लागि `open-sse/utils/error.ts::errorResponse` र `open-sse/executors/cursor.ts::buildErrorResponse` — कोड कार्यात्मक रूपमा सुरक्षित भए पनि चेतावनी देखाइरहन सक्छन्। पहिले खारेज गरिएका उदाहरणहरू: `#224`, `#231` (मे 2026), दुवैलाई प्राविधिक औचित्यसहित `false positive` का रूपमा चिन्ह लगाइएको थियो।

**नयाँ घटना कसरी व्यवस्थापन गर्ने:**

1. कलसाइटले सन्देशलाई वास्तवमै `sanitizeErrorMessage` / `buildErrorBody` / माथि दस्तावेजीकृत र्यापरहरूमध्ये कुनै एकमार्फत पठाउँछ भन्ने पुष्टि गर्नुहोस् (कल शृङ्खला सुरुदेखि अन्त्यसम्म पढ्नुहोस् — टिप्पणीलाई मात्र विश्वास नगर्नुहोस्)।
2. `tests/unit/error-message-sanitization.test.ts` ले उक्त मार्गको परीक्षण गर्छ भन्ने पुष्टि गर्नुहोस् (वा परीक्षण कभरेज थप्नुहोस्)।
3. यस दस्तावेजलाई सन्दर्भ दिँदै `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` मार्फत चेतावनी खारेज गर्नुहोस्।
4. सबैतिर `.split("\n")[0]` इनलाइन गरेर "सुधार" **नगर्नुहोस्** — सहायक नै सत्यको एकल स्रोत हो; ढाँचाको नक्कल गर्दा स्क्यानरलाई सन्तुष्ट पारेजस्तो देखिए पनि स्यानिटाइजर कमजोर हुन्छ (पाथ स्क्रबिङ, लम्बाइ सीमा र प्रकार रूपान्तरण हराउँछन्)।

CodeQL को [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) जस्ता स्वैच्छिक सुविधाहरू अपनाउनु दीर्घकालीन समाधान हो; यो यस दस्तावेजको दायराबाहिर पर्छ।

## सन्दर्भहरू

- [CWE-209: त्रुटि सन्देशमार्फत सूचना प्रकटीकरण](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: त्रुटि व्यवस्थापन चिट सिट](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- सहायकलाई केन्द्रीकृत गर्ने कमिट: `1a39c31f` — _fix(security): सार्वजनिक अपस्ट्रिम क्रेडेन्सियलहरू मास्क गर्ने + त्रुटि स्यानिटाइजेसन केन्द्रीकृत गर्ने_
