# Error Message Sanitization (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **සත්යයේ මූලාශ්රය:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, සහ `open-sse/utils/error.ts` හි public builders
> **පරීක්ෂණ:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **අවසන් වරට යාවත්කාලීන කළේ:** 2026-09-02 — v3.8.51
> **ඉලක්කගත පිරිස:** දෝෂ ප්රතිචාර හසුරුවන ඕනෑම ඉංජිනේරුවෙකු (HTTP routes, SSE streams, executors, MCP handlers).
> **තත්ත්වය:** සේවාලාභියෙකු වෙත දෝෂ පණිවිඩයක් ආපසු ලබාදෙන සෑම code path එකක් සඳහාම **අනිවාර්යයි**.

## මෙය පවතින්නේ ඇයි

CodeQL රීතිය `js/stack-trace-exposure` (CWE-209), runtime exception එකකින් ආරම්භ වන දෝෂ පණිවිඩයක් පිරිසිදු කිරීමකින් තොරව HTTP / SSE ප්රතිචාරයකට ළඟා වන ඕනෑම code path එකක් සලකුණු කරයි. නිෂ්පාදන ප්රතිචාරවල ඇති stack traces සහ absolute file paths, ප්රහාරකයන්ට පහත තොරතුරු සපයයි:

- අභ්යන්තර නාමාවලි සැකැස්ම (`/srv/app/src/lib/...`) → තවදුරටත් ප්රහාර සඳහා පෙර විමර්ශනය.
- Stack frames මඟින් අනුමාන කළ library / framework versions → ඉලක්කගත exploit තෝරාගැනීම.
- දෝෂවලට string-interpolate වී තිබිය හැකි සංවේදී runtime අගයන් (DB queries, config values).

`open-sse/utils/error.ts` මඟින් export කරන `sanitizeErrorMessage` helper එක මෙම කාන්දුවීම් වර්ග ඉවත් කරයි:

1. භෞතික, serialized, සහ නිසැකව හඳුනාගත හැකි inline JavaScript stack-frame tails.
2. ආරක්ෂිත HTTPS URLs සහ පැහැදිලිව සලකුණු කළ API routes රඳවා ගනිමින්, absolute POSIX, Windows, UNC, සහ `file://` filesystem paths.
3. Credential assignments, පොදු provider token formats, private-key PEM blocks, සහ base64 data URLs.

Sanitizer එක input length එක සීමා කරන අතර thrown value එකක් string coercion ප්රතික්ෂේප කළහොත් ආරක්ෂිතව අසාර්ථක වේ.
Recursive upstream JSON sanitization එක, ප්රතිචාරයක් serialize කිරීමට පෙර අනාරක්ෂිත credential/path keys, session aliases, සහ prototype-control keys ද ඉවත් කරයි.

## අනිවාර්ය රටාව

### 1. දෝෂ ප්රතිචාරයක් ගොඩනැගීම (HTTP / API routes)

`buildErrorBody()` භාවිත කරන්න — sanitization එයටම අන්තර්ගතයි:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... handler තර්කනය ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

නැතහොත්, එම module එකේ ඇති පහසු wrapper සඳහා:

```ts
import {
  errorResponse, // එක් වරකින් සාදන Response object එක
  writeStreamError, // SSE writer
  createErrorResult, // { success: false, status, response, ... } හැඩය
  unavailableResponse, // Retry-After එක් කරයි
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

මේ සියල්ල canonical public-error boundary එක යොදයි. `errorResponse`, `writeStreamError`, සහ
`createErrorResult`, `buildErrorBody` හරහා ගමන් කරයි; විශේෂිත retry/circuit helpers තුන
ඔවුන්ගේ public context එක සෘජුවම project කර sanitize කරයි. මෙම helpers භාවිත කරන විට **ඔබට කිසිවිටෙකත්
`sanitizeErrorMessage` අතින් call කිරීමට අවශ්ය නැත**.

### 2. අභිරුචි දෝෂ envelopes (දුර්ලභයි)

ඉහත helpers භාවිත කළ නොහැකි විට (උදා: ප්රතිචාරයේ හැඩය Connect-RPC වැනි upstream protocol එකක් මඟින් නියම කර ඇති විට), `sanitizeErrorMessage` සෘජුවම import කරන්න:

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

අභිරුචි දෝෂ body එකක් සෑදීමට අනුමත එකම ක්රමය මෙයයි. ආදර්ශ implementation එක සඳහා `open-sse/executors/cursor.ts::buildErrorResponse` බලන්න.

### 3. Logging සහ ප්රතිචාර දැක්වීම

විශ්වාසදායක අභ්යන්තර exceptions සඳහා, operators හට debug කිරීමට හැකි වන පරිදි ඒවායේ සම්පූර්ණ message එක සහ stack එක රඳවාගත හැක. Provider, validation, browser-session, හෝ credential-adjacent boundaries වෙතින් ආරම්භ වන අගයන්
console output, audit metadata, හෝ ස්ථිර call logs වෙත ඇතුළු වීමට පෙර sanitize කළ යුතුය. රටාව:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // විශ්වාසදායක අභ්යන්තර exception සඳහා පමණි
  return errorResponse(500, getErrorMessage(err)); // sanitize කර ඇත — සේවාලාභියා වෙත යවයි
}
```

Provider මඟින් පාලනය වන failures සඳහා, log කරන අගයත් project කරන්න:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. තහනම් රටා

❌ Raw exception output එකක් Response body එකක **කිසිවිටෙකත්** නොතබන්න:

```ts
// නරකයි: stack trace සහ file paths සේවාලාභියා වෙත ළඟා වේ
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ ඔබ විසින්ම first-line splitter එකක් **කිසිවිටෙකත්** නොසාදන්න:

```ts
// නරකයි: absolute paths ඉවත් කිරීමට අමතක වන අතර canonical helper එකෙන් වෙනස් විය හැක
const safe = String(err).split("\n")[0];
```

❌ Route එකේදී පමණක් sanitize කර SSE path එක අමතක **නොකරන්න**. Stream එකකට ලියන ඕනෑම දෙයක් `writeStreamError` (හෝ එයට යටින් ඇති `buildErrorBody`) හරහා ගමන් කළ යුතුය.

❌ දෝෂ පණිවිඩවල `process.cwd()`, `__filename`, `__dirname`, හෝ env-derived paths චේතනාන්විතව **කිසිවිටෙකත්** ඇතුළත් නොකරන්න. අමතර ආරක්ෂණයක් ලෙස sanitizer එක absolute paths ආවරණය කළත්, callers විසින් ආරම්භයේදීම topology-bearing messages නිර්මාණය නොකළ යුතුය.

## CI හි ආවරණය

`tests/unit/error-message-sanitization.test.ts` මඟින් පහත දෑ බලාත්මක කරයි:

- `/api/model-combo-mappings/*` යටතේ ඇති සෑම route එකක්ම 4xx/5xx සඳහා සනීපාරක්ෂිත කළ bodies ආපසු ලබා දෙයි.
- `sanitizeErrorMessage` මඟින් බහු-පේළි stack traces ඉවත් කරයි.
- `sanitizeErrorMessage` මඟින් POSIX සහ Windows absolute paths, `<path>` සමඟ ප්රතිස්ථාපනය කරයි.
- `sanitizeErrorMessage` මඟින් `null`/`undefined`/`Error` instance inputs ආරක්ෂිතව හසුරුවයි.
- `buildErrorBody` කිසිවිටෙක එහි `message` field එක තුළ stack traces නිරාවරණය නොකරයි.

නව route එකක් හෝ executor එකක් එක් කරන විට, මෙම file එකෙන් assertion pattern එක පිටපත් කරන්න. Coverage gate එක (`npm run test:coverage`) මඟින් statements/lines/functions/branches සඳහා ≥60% ක් බලාත්මක කරයි — error paths ආවරණය කළ යුතුය.

## අදාළ පාලන

- `.github/security` තුළ ඇති `js/stack-trace-exposure` CodeQL alerts සෑමවිටම **එක්කෝ** මෙම helpers හරහා නිවැරදි කළ යුතුය **නැතහොත්** මෙම ලේඛනය උපුටා දක්වන comment එකක් සමඟ ඉවත දැමිය යුතුය.
- `pino` redaction config එක (`src/shared/utils/logRedaction.ts`) විශ්වාසදායක structured logs වෙනම හසුරුවයි. මෙම ලේඛනයෙන් public response messages සහ ස්ථිර call/proxy-log සීමා හරහා ගමන් කරන provider-controlled values ආවරණය කරයි.
- Upstream-header denylist එක (`src/shared/constants/upstreamHeaders.ts`) header leakage ආවරණය කරයි — නව exfiltration ගැටලුවක් එක් කරන විට files දෙකම සමපාතව තබා ගන්න.

## Upstream විස්තර හරහා යැවීම

`buildErrorBody` මඟින් විකල්ප තෙවන argument එකක් වන `upstreamDetails` (upstream provider වෙතින් ලැබුණු raw parsed body එක) පිළිගනී. එය සපයා ඇති විට, response එකට `upstream_details` ලෙස ඇතුළත් කිරීමට පෙර `sanitizeUpstreamDetails` මඟින් සනීපාරක්ෂිත කරනු ලැබේ.

විකල්ප සිව්වන argument එකක් වන `classification`
(`{ type?: string; code?: string; reason?: string }`) පැහැදිලි public classification එකක් පිළිගනී.
සෑම field එකක්ම සීමා කරන ලද public-identifier vocabulary එකට ප්රක්ෂේපණය කරනු ලැබේ. අනාරක්ෂිත, credential ආකාරයේ, control-character අඩංගු, හෝ අධික දිගකින් යුතු values, status එකෙන් ව්යුත්පන්න කළ type/code වෙත fallback වේ; අනාරක්ෂිත විකල්ප reason එකක් අත්හරිනු ලැබේ. සංඛ්යාත්මක upstream status එක machine-readable code එකක් ලෙස නිරාවරණය කරන provider contracts සඳහා ඉලක්කම් තුනක HTTP status identifiers (`100` සිට `599` දක්වා) වලංගුව පවතී. දේශීයව ජනනය කරන HTTP-status placeholder ආකෘතිය තුළද එම සීමා කරන ලද පරාසය පිළිගනු ලැබේ; අත්තනෝමතික provider numbers සහ names vocabulary එකෙන් පිටත පවතී.

සෑම පැහැදිලි classification එකක්ම එම සිව්වන argument එක තුළ ලබා දෙන්න. `buildErrorBody()` ආපසු පැමිණි පසු කිසිවිටෙක `body.error.code`, `body.error.type`, හෝ `body.error.reason` overwrite නොකරන්න;
builder එකෙන් පසුව සිදු කරන mutation මඟින් public projection එක මඟ හැරේ.

`upstreamDetails` සඳහා යොදන සනීපාරක්ෂක නීති:

1. String leaves: `sanitizeErrorMessage` හරහා ධාවනය කරන්න (stacks සහ absolute paths ඉවත් කරයි).
2. අනාරක්ෂිත path, credential, session-alias, සහ prototype-control keys ඉවත් කරනු ලැබේ.
3. Depth cap: levels 4 ඉක්මවන nesting, `"[truncated]"` string එකෙන් ප්රතිස්ථාපනය කරනු ලැබේ.
4. Arrays, elements 32 කට සීමා කරනු ලැබේ.

Parsed provider error body එකක් ඇති call sites පමණක් `upstreamDetails` ලබා දිය යුතුය. අභ්යන්තර OmniRoute errors (SSE parse failures, හිස් content, guardrail blocks) එය ඇතුළත් නොකළ යුතුය.

Raw `err.stack`, `err.message`, හෝ runtime exception එකකින් ලැබෙන කිසිදු string එකක්
`upstreamDetails` වෙත ලබා නොදෙන්න. ඒවා upstream body එකක් නොමැතිව තවමත් `errorResponse` / `buildErrorBody(code, msg)`
හරහා යා යුතුය.

තෝරාගත් upstream 4xx passthrough මඟින් client auto-recovery සඳහා අවශ්ය providerගේ ආරක්ෂිත JSON හැඩය සහ වචන භාවිතය රඳවා ගනී, නමුත් එය byte-for-byte passthrough එකක් නොවේ: serialization කිරීමට පෙර recursive sanitizer එක සෑමවිටම ධාවනය වේ. Cyclic, BigInt-bearing, හෝ hostile `toJSON()` bodies ආරක්ෂිතව අසාර්ථක වන අතර passthrough සඳහා සුදුසුකම් නොලබයි. OCR සහ moderation ද එම නීතියම යොදයි; JSON නොවන, හිස්, හෝ වැරදි ලෙස ලේබල් කළ upstream bodies, සම්මත OmniRoute JSON error envelope එකට පරිවර්තනය කරනු ලැබේ.

## දන්නා CodeQL සීමාව: අභිරුචි සනීපාරක්ෂක හඳුනා නොගැනීම

CodeQL විමසුම [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) සනීපාරක්ෂක රටා සඳහා ස්ථාවර අවසර ලැයිස්තුවක් භාවිත කරයි (උදා. පේළිය තුළම ඇති `.split("\n")[0]`, නිශ්චිත regex ආකෘති සහිත `String#replace`, `Error` මත `.message` වෙත ප්රවේශ වීම). එය අපගේ `sanitizeErrorMessage()` වැනි අභිරුචි සහායකයක් හරහා සිදුවන වක්ර යොමු කිරීම **හඳුනා නොගනී**.

මෙයින් අදහස් වන්නේ, මෙම මොඩියුලය හරහා සනීපාරක්ෂාව සිදු කරන බව පැහැදිලිව පෙන්විය හැකි ඇමතුම් ස්ථාන — උදාහරණයක් ලෙස `open-sse/utils/error.ts::errorResponse` සහ `open-sse/executors/cursor.ts::buildErrorResponse` — කේතය ක්රියාකාරීව ආරක්ෂිත වුවද දිගටම ඇඟවීම මතු කළ හැකි බවයි. පූර්වාදර්ශ බැහැර කිරීම්: `#224`, `#231` (2026 මැයි), දෙකම තාක්ෂණික සාධාරණීකරණයක් සමඟ `false positive` ලෙස සලකුණු කර ඇත.

**නව සිදුවීමක් හසුරුවන ආකාරය:**

1. ඇමතුම් ස්ථානය සැබවින්ම පණිවිඩය `sanitizeErrorMessage` / `buildErrorBody` / ඉහත ලේඛනගත කර ඇති ආවරණකවලින් එකක් හරහා යොමු කරන බව තහවුරු කරන්න (ඇමතුම් දාමය මුල සිට අග දක්වා කියවන්න — අදහස් දැක්වීමක් විශ්වාස නොකරන්න).
2. `tests/unit/error-message-sanitization.test.ts` එම මාර්ගය පරීක්ෂා කරන බව තහවුරු කරන්න (නැතහොත් පරීක්ෂණ ආවරණය එක් කරන්න).
3. මෙම ලේඛනය සඳහන් කරමින් `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` හරහා ඇඟවීම බැහැර කරන්න.
4. සෑම තැනකම `.split("\n")[0]` පේළිය තුළම යෙදීමෙන් මෙය "නිවැරදි" **නොකරන්න** — සහායකය එකම සත්ය මූලාශ්රයයි; ස්කෑනරය සතුටු කරන බව පෙන්වීම සඳහා රටාව අනුපිටපත් කිරීමෙන් සනීපාරක්ෂකය දුර්වල වේ (මාර්ග මකා දැමීම, දිග සීමා කිරීම සහ වර්ග පරිවර්තනය අහිමි වේ).

CodeQL හි [`@codeql/javascript-models` අභිරුචි සනීපාරක්ෂක වින්යාසය](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) වැනි ස්වෙච්ඡාවෙන් සක්රිය කළ හැකි විශේෂාංග භාවිතයට ගැනීම දිගුකාලීන විසඳුමයි; එය මෙම ලේඛනයේ විෂය පථයෙන් පිටත පවතී.

## යොමු

- [CWE-209: දෝෂ පණිවිඩයක් හරහා තොරතුරු නිරාවරණය වීම](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: දෝෂ හැසිරවීමේ කෙටි මාර්ගෝපදේශය](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- සහායකය මධ්යගත කළ commit එක: `1a39c31f` — _fix(security): පොදු upstream අක්තපත්ර ආවරණය කිරීම + දෝෂ සනීපාරක්ෂාව මධ්යගත කිරීම_
