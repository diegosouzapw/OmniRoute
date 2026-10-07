# Error Message Sanitization (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇧🇦 [bs](../../../bs/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **സത്യത്തിന്റെ ആധികാരിക ഉറവിടം:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, കൂടാതെ `open-sse/utils/error.ts`-ലെ പൊതു builders
> **ടെസ്റ്റുകൾ:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **അവസാനം പുതുക്കിയത്:** 2026-09-02 — v3.8.51
> **ഉദ്ദേശിക്കുന്നവർ:** പിശക് പ്രതികരണങ്ങൾ കൈകാര്യം ചെയ്യുന്ന ഏതൊരു എഞ്ചിനീയറും (HTTP routes, SSE streams, executors, MCP handlers).
> **നില:** ഒരു ക്ലയന്റിലേക്ക് പിശക് സന്ദേശം മടക്കിനൽകുന്ന എല്ലാ code path-കൾക്കും **നിർബന്ധം**.

## ഇത് എന്തിനാണ് നിലവിലുള്ളത്

runtime exception-ൽ നിന്ന് ഉത്ഭവിക്കുന്ന ഒരു പിശക് സന്ദേശം sanitize ചെയ്യപ്പെടാതെ HTTP / SSE response-ൽ എത്തുന്ന ഏതൊരു code path-നെയും CodeQL rule `js/stack-trace-exposure` (CWE-209) flag ചെയ്യുന്നു. production response-കളിലെ stack trace-കളും absolute file path-കളും ആക്രമികൾക്ക് ഇനിപ്പറയുന്ന വിവരങ്ങൾ നൽകുന്നു:

- ആന്തരിക directory layout (`/srv/app/src/lib/...`) → തുടർ ആക്രമണങ്ങൾക്കായുള്ള നിരീക്ഷണം.
- stack frame-കളിൽ നിന്ന് അനുമാനിക്കാവുന്ന library / framework version-കൾ → ലക്ഷ്യമിട്ട exploit തിരഞ്ഞെടുക്കൽ.
- error-കളിലേക്ക് string-interpolate ചെയ്യപ്പെട്ടേക്കാവുന്ന സംവേദനക്ഷമമായ runtime value-കൾ (DB query-കൾ, config value-കൾ).

`open-sse/utils/error.ts` export ചെയ്യുന്ന `sanitizeErrorMessage` helper ഇനിപ്പറയുന്ന വിഭാഗങ്ങളിലെ
വിവരച്ചോർച്ചകൾ നീക്കംചെയ്യുന്നു:

1. ഭൗതികവും serialized ആയതുമായ, സംശയാതീതമായി inline ആയ JavaScript stack-frame tail-കൾ.
2. സുരക്ഷിതമായ HTTPS URL-കളും വ്യക്തമായി അടയാളപ്പെടുത്തിയ API route-കളും നിലനിർത്തിക്കൊണ്ട്, absolute POSIX, Windows, UNC, `file://` filesystem path-കൾ.
3. credential assignment-കൾ, സാധാരണ provider token format-കൾ, private-key PEM block-കൾ, base64 data
   URL-കൾ.

sanitizer input length പരിമിതപ്പെടുത്തുകയും, thrown value-ന്റെ string coercion നിരസിക്കപ്പെട്ടാൽ സുരക്ഷിതമായി പരാജയപ്പെടുകയും ചെയ്യുന്നു.
Recursive upstream JSON sanitization, ഒരു response serialize ചെയ്യുന്നതിനു മുമ്പ് സുരക്ഷിതമല്ലാത്ത credential/path key-കൾ, session alias-കൾ,
prototype-control key-കൾ എന്നിവയും ഒഴിവാക്കുന്നു.

## നിർബന്ധമായ pattern

### 1. ഒരു error response നിർമ്മിക്കൽ (HTTP / API routes)

`buildErrorBody()` ഉപയോഗിക്കുക — sanitization അതിൽ തന്നെ ഉൾപ്പെടുത്തിയിരിക്കുന്നു:

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

അല്ലെങ്കിൽ, അതേ module-ലെ സൗകര്യപ്രദമായ wrapper-കൾക്കായി:

```ts
import {
  errorResponse, // ഒറ്റത്തവണ ഉപയോഗിക്കാവുന്ന Response object
  writeStreamError, // SSE writer
  createErrorResult, // { success: false, status, response, ... } ആകൃതി
  unavailableResponse, // Retry-After ചേർക്കുന്നു
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

ഇവയെല്ലാം canonical public-error boundary പ്രയോഗിക്കുന്നു. `errorResponse`, `writeStreamError`,
`createErrorResult` എന്നിവ `buildErrorBody`-യിലൂടെ കടന്നുപോകുന്നു; പ്രത്യേകതയുള്ള മൂന്ന് retry/circuit helper-കൾ
അവയുടെ public context നേരിട്ട് project ചെയ്യുകയും sanitize ചെയ്യുകയും ചെയ്യുന്നു. ഈ helper-കൾ ഉപയോഗിക്കുമ്പോൾ **നിങ്ങൾ ഒരിക്കലും
`sanitizeErrorMessage` നേരിട്ട് വിളിക്കേണ്ടതില്ല**.

### 2. ഇഷ്ടാനുസൃത error envelope-കൾ (അപൂർവം)

മുകളിലുള്ള helper-കൾ ഉപയോഗിക്കാൻ കഴിയാത്തപ്പോൾ (ഉദാ. response-ന്റെ ആകൃതി Connect-RPC പോലുള്ള ഒരു upstream protocol നിർണ്ണയിക്കുമ്പോൾ), `sanitizeErrorMessage` നേരിട്ട് import ചെയ്യുക:

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

ഒരു ഇഷ്ടാനുസൃത error body തയ്യാറാക്കാനുള്ള അനുവദനീയമായ ഏക മാർഗം ഇതാണ്. reference implementation-നായി `open-sse/executors/cursor.ts::buildErrorResponse` കാണുക.

### 3. Logging-ഉം responding-ഉം

വിശ്വസനീയമായ ആന്തരിക exception-കൾക്ക് അവയുടെ പൂർണ്ണ message-ഉം stack-ഉം നിലനിർത്താം, അതുവഴി operator-മാർക്ക് debug ചെയ്യാനാകും. provider, validation, browser-session, അല്ലെങ്കിൽ credential-നോട് ചേർന്ന boundary-കളിൽ നിന്ന്
ഉത്ഭവിക്കുന്ന value-കൾ console output, audit metadata, അല്ലെങ്കിൽ persistent call log-കൾ എന്നിവയിൽ പ്രവേശിക്കുന്നതിന് മുമ്പ്
sanitize ചെയ്യണം. Pattern:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // വിശ്വസനീയമായ ആന്തരിക exception-ന് മാത്രം
  return errorResponse(500, getErrorMessage(err)); // sanitize ചെയ്തത് — ക്ലയന്റിലേക്ക് അയക്കുന്നു
}
```

provider നിയന്ത്രിക്കുന്ന failure-കൾക്കായി, log ചെയ്യുന്ന value-യും project ചെയ്യുക:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. നിരോധിത pattern-കൾ

❌ raw exception output ഒരിക്കലും Response body-യിൽ ഇടരുത്:

```ts
// മോശം: stack trace + file path-കൾ ക്ലയന്റിലേക്ക് എത്തുന്നു
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ സ്വന്തമായി first-line splitter ഒരിക്കലും തയ്യാറാക്കരുത്:

```ts
// മോശം: absolute path-കൾ നീക്കംചെയ്യാൻ മറക്കുന്നു, canonical helper-ൽ നിന്ന് വ്യതിചലിച്ചേക്കാം
const safe = String(err).split("\n")[0];
```

❌ route-ൽ മാത്രം sanitize ചെയ്ത് SSE path മറക്കരുത്. stream-ലേക്ക് എഴുതുന്ന എന്തും `writeStreamError`-ലൂടെ (അല്ലെങ്കിൽ അതിന് അടിസ്ഥാനം നൽകുന്ന `buildErrorBody`-യിലൂടെ) കടന്നുപോകണം.

❌ `process.cwd()`, `__filename`, `__dirname`, അല്ലെങ്കിൽ env-ൽ നിന്ന് ലഭിക്കുന്ന path-കൾ
error message-കളിൽ മനഃപൂർവം ഉൾപ്പെടുത്തരുത്. defense in depth എന്ന നിലയിൽ sanitizer absolute path-കൾ കൈകാര്യം ചെയ്യുന്നുണ്ടെങ്കിലും, caller-കൾ ആദ്യം തന്നെ
topology വെളിപ്പെടുത്തുന്ന message-കൾ നിർമ്മിക്കരുത്.

## CI-യിലെ കവറേജ്

`tests/unit/error-message-sanitization.test.ts` ഇനിപ്പറയുന്നവ നിർബന്ധമാക്കുന്നു:

- `/api/model-combo-mappings/*`-ന് കീഴിലുള്ള എല്ലാ റൂട്ടുകളും 4xx/5xx സന്ദർഭങ്ങളിൽ സാനിറ്റൈസ് ചെയ്ത ബോഡികൾ തിരികെ നൽകണം.
- `sanitizeErrorMessage` ഒന്നിലധികം വരികളുള്ള സ്റ്റാക്ക് ട്രേസുകൾ നീക്കംചെയ്യുന്നു.
- `sanitizeErrorMessage` POSIX, Windows അബ്സല്യൂട്ട് പാത്തുകൾ `<path>` ഉപയോഗിച്ച് മാറ്റിസ്ഥാപിക്കുന്നു.
- `sanitizeErrorMessage` `null`/`undefined`/`Error` ഇൻസ്റ്റൻസ് ഇൻപുട്ടുകൾ സുരക്ഷിതമായി കൈകാര്യം ചെയ്യുന്നു.
- `buildErrorBody` അതിന്റെ `message` ഫീൽഡിൽ ഒരിക്കലും സ്റ്റാക്ക് ട്രേസുകൾ വെളിപ്പെടുത്തുന്നില്ല.

ഒരു പുതിയ റൂട്ടോ എക്സിക്യൂട്ടറോ ചേർക്കുമ്പോൾ, ഈ ഫയലിലെ അസർഷൻ പാറ്റേൺ പകർത്തുക. കവറേജ് ഗേറ്റ് (`npm run test:coverage`) സ്റ്റേറ്റ്മെന്റുകൾ/ലൈനുകൾ/ഫങ്ഷനുകൾ/ബ്രാഞ്ചുകൾ എന്നിവയ്ക്ക് ≥60% കവറേജ് നിർബന്ധമാക്കുന്നു — പിശക് പാത്തുകൾ നിർബന്ധമായും കവർ ചെയ്യണം.

## അനുബന്ധ നിയന്ത്രണങ്ങൾ

- `.github/security`-ലെ `js/stack-trace-exposure` CodeQL അലേർട്ടുകൾ എല്ലായ്പ്പോഴും ഈ ഹെൽപ്പറുകൾ ഉപയോഗിച്ച് പരിഹരിക്കണം **അല്ലെങ്കിൽ** ഈ ഡോക്യുമെന്റ് ഉദ്ധരിക്കുന്ന ഒരു കമന്റോടെ നിരസിക്കണം.
- `pino` റിഡാക്ഷൻ കോൺഫിഗ് (`src/shared/utils/logRedaction.ts`) വിശ്വസനീയമായ സ്ട്രക്ചേർഡ് ലോഗുകൾ പ്രത്യേകം കൈകാര്യം ചെയ്യുന്നു. ഈ ഡോക്യുമെന്റ് പൊതു റെസ്പോൺസ് സന്ദേശങ്ങളെയും സ്ഥിരമായ കോൾ/പ്രോക്സി-ലോഗ് അതിരുകൾ കടക്കുന്ന പ്രൊവൈഡർ-നിയന്ത്രിത മൂല്യങ്ങളെയും ഉൾക്കൊള്ളുന്നു.
- അപ്സ്ട്രീം-ഹെഡർ ഡിനൈലിസ്റ്റ് (`src/shared/constants/upstreamHeaders.ts`) ഹെഡർ ചോർച്ച ഉൾക്കൊള്ളുന്നു — ഡാറ്റ പുറത്തെടുക്കലുമായി ബന്ധപ്പെട്ട ഒരു പുതിയ ആശങ്ക ചേർക്കുമ്പോൾ രണ്ട് ഫയലുകളും പരസ്പരം യോജിപ്പിച്ച് നിലനിർത്തുക.

## അപ്സ്ട്രീം വിശദാംശങ്ങളുടെ പാസ്ത്രൂ

`buildErrorBody` ഒരു ഓപ്ഷണൽ മൂന്നാമത്തെ ആർഗ്യുമെന്റായ `upstreamDetails` (അപ്സ്ട്രീം പ്രൊവൈഡറിൽ നിന്നുള്ള റോ പാർസ് ചെയ്ത ബോഡി) സ്വീകരിക്കുന്നു. അത് നൽകിയാൽ, റെസ്പോൺസിൽ `upstream_details` ആയി ഉൾപ്പെടുത്തുന്നതിന് മുമ്പ് `sanitizeUpstreamDetails` ഉപയോഗിച്ച് സാനിറ്റൈസ് ചെയ്യപ്പെടുന്നു.

ഒരു ഓപ്ഷണൽ നാലാമത്തെ ആർഗ്യുമെന്റായ `classification`
(`{ type?: string; code?: string; reason?: string }`) ഒരു വ്യക്തമായ പബ്ലിക് ക്ലാസിഫിക്കേഷൻ സ്വീകരിക്കുന്നു.
ഓരോ ഫീൽഡും പരിമിതപ്പെടുത്തിയ പബ്ലിക്-ഐഡന്റിഫയർ പദാവലിയിലേക്ക് പ്രൊജക്റ്റ് ചെയ്യപ്പെടുന്നു. സുരക്ഷിതമല്ലാത്തതോ, ക്രെഡൻഷ്യലിന്റെ രൂപത്തിലുള്ളതോ,
കൺട്രോൾ ക്യാരക്ടറുകളുള്ളതോ, അമിത ദൈർഘ്യമുള്ളതോ ആയ മൂല്യങ്ങൾ സ്റ്റാറ്റസിൽ നിന്ന് ലഭിക്കുന്ന type/code-ലേക്ക് ഫാൾബാക്ക് ചെയ്യുന്നു; സുരക്ഷിതമല്ലാത്ത ഓപ്ഷണൽ
reason ഒഴിവാക്കപ്പെടുന്നു. മെഷീൻ-റീഡബിൾ കോഡായി സംഖ്യാരൂപത്തിലുള്ള അപ്സ്ട്രീം സ്റ്റാറ്റസ് വെളിപ്പെടുത്തുന്ന
പ്രൊവൈഡർ കോൺട്രാക്ടുകൾക്കായി മൂന്ന് അക്ക HTTP സ്റ്റാറ്റസ് ഐഡന്റിഫയറുകൾ (`100` മുതൽ `599` വരെ) സാധുവായി തുടരുന്നു. ലോക്കലായി സൃഷ്ടിച്ച HTTP-സ്റ്റാറ്റസ് പ്ലേസ്ഹോൾഡർ രൂപത്തിലും അതേ
പരിമിത ശ്രേണി സ്വീകരിക്കപ്പെടുന്നു; അനിയന്ത്രിതമായ പ്രൊവൈഡർ
നമ്പറുകളും പേരുകളും പദാവലിക്ക് പുറത്തുതന്നെ തുടരുന്നു.

വ്യക്തമായി നൽകിയ എല്ലാ ക്ലാസിഫിക്കേഷനുകളും ആ നാലാമത്തെ ആർഗ്യുമെന്റിൽ കൈമാറുക. `buildErrorBody()` തിരികെ നൽകിയ ശേഷം ഒരിക്കലും
`body.error.code`, `body.error.type`, അല്ലെങ്കിൽ `body.error.reason` ഓവർറൈറ്റ് ചെയ്യരുത്;
ബിൽഡറിന് ശേഷമുള്ള മ്യൂട്ടേഷൻ പബ്ലിക് പ്രൊജക്ഷനെ മറികടക്കുന്നു.

`upstreamDetails`-ന് ബാധകമാക്കുന്ന സാനിറ്റൈസേഷൻ നിയമങ്ങൾ:

1. സ്ട്രിംഗ് ലീഫുകൾ: `sanitizeErrorMessage`-ലൂടെ പ്രവർത്തിപ്പിക്കുക (സ്റ്റാക്കുകളും അബ്സല്യൂട്ട് പാത്തുകളും നീക്കംചെയ്യുന്നു).
2. സുരക്ഷിതമല്ലാത്ത പാത്ത്, ക്രെഡൻഷ്യൽ, സെഷൻ-അലിയാസ്, പ്രോട്ടോടൈപ്പ്-കൺട്രോൾ കീകൾ നീക്കംചെയ്യപ്പെടുന്നു.
3. ഡെപ്ത് പരിധി: 4 ലെവലിന് അപ്പുറമുള്ള നെസ്റ്റിംഗ് `"[truncated]"` എന്ന സ്ട്രിംഗ് ഉപയോഗിച്ച് മാറ്റിസ്ഥാപിക്കുന്നു.
4. അറേകൾ പരമാവധി 32 എലമെന്റുകളായി പരിമിതപ്പെടുത്തുന്നു.

പാർസ് ചെയ്ത പ്രൊവൈഡർ എറർ ബോഡിയുള്ള കോൾ സൈറ്റുകൾ മാത്രമേ `upstreamDetails` കൈമാറാവൂ. ആന്തരിക OmniRoute
പിശകുകൾ (SSE പാർസ് പരാജയങ്ങൾ, ശൂന്യമായ കണ്ടന്റ്, ഗാർഡ്റെയിൽ ബ്ലോക്കുകൾ) അത് ഉൾപ്പെടുത്തരുത്.

റൺടൈം എക്സെപ്ഷനിൽ നിന്നുള്ള റോ `err.stack`, `err.message`, അല്ലെങ്കിൽ ഏതെങ്കിലും സ്ട്രിംഗ്
`upstreamDetails`-ലേക്ക് കൈമാറരുത്. അവ അപ്സ്ട്രീം ബോഡി ഇല്ലാതെ
`errorResponse` / `buildErrorBody(code, msg)` വഴിതന്നെ കടന്നുപോകണം.

തിരഞ്ഞെടുത്ത അപ്സ്ട്രീം 4xx പാസ്ത്രൂ ക്ലയന്റ് ഓട്ടോ-റിക്കവറിക്ക് ആവശ്യമായ പ്രൊവൈഡറുടെ സുരക്ഷിതമായ JSON ഘടനയും പദപ്രയോഗവും നിലനിർത്തുന്നു, എന്നാൽ ഇത് ബൈറ്റ്-ഫോർ-ബൈറ്റ് പാസ്ത്രൂ അല്ല: സീരിയലൈസേഷന് മുമ്പ് റിക്കഴ്സീവ് സാനിറ്റൈസർ എല്ലായ്പ്പോഴും പ്രവർത്തിക്കുന്നു. സൈക്ലിക്, BigInt ഉൾക്കൊള്ളുന്ന, അല്ലെങ്കിൽ ഹോസ്റ്റൈൽ `toJSON()` ബോഡികൾ ഫെയിൽ-ക്ലോസ്ഡ് ആകുകയും പാസ്ത്രൂവിന് യോഗ്യമല്ലാതാകുകയും ചെയ്യുന്നു. OCR-ഉം മോഡറേഷനും ഇതേ നിയമം പ്രയോഗിക്കുന്നു; JSON അല്ലാത്തതോ, ശൂന്യമായതോ, തെറ്റായി ലേബൽ ചെയ്തതോ ആയ അപ്സ്ട്രീം ബോഡികൾ കാനോണിക്കൽ OmniRoute JSON എറർ എൻവലോപ്പായി പരിവർത്തനം ചെയ്യപ്പെടുന്നു.

## അറിയപ്പെടുന്ന CodeQL പരിമിതി: ഇഷ്ടാനുസൃത സാനിറ്റൈസറുകൾ തിരിച്ചറിയപ്പെടുന്നില്ല

CodeQL ക്വറി [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) സാനിറ്റൈസർ പാറ്റേണുകളുടെ ഒരു നിശ്ചിത അനുവദനീയ പട്ടികയാണ് ഉപയോഗിക്കുന്നത് (ഉദാ. ഇൻലൈൻ `.split("\n")[0]`, നിർദ്ദിഷ്ട regex രൂപങ്ങളോടുകൂടിയ `String#replace`, `Error`-ലെ `.message`-ലേക്കുള്ള ആക്സസ്). ഞങ്ങളുടെ `sanitizeErrorMessage()` പോലുള്ള ഒരു ഇഷ്ടാനുസൃത ഹെൽപ്പറിലൂടെയുള്ള പരോക്ഷ ഉപയോഗം ഇത് തിരിച്ചറിയുന്നില്ല.

ഈ മൊഡ്യൂൾ വഴി സാനിറ്റൈസ് ചെയ്യുന്നുവെന്ന് വ്യക്തമായി തെളിയിക്കാവുന്ന കോൾസൈറ്റുകൾ — ഉദാഹരണത്തിന് `open-sse/utils/error.ts::errorResponse`, `open-sse/executors/cursor.ts::buildErrorResponse` എന്നിവ — കോഡ് പ്രവർത്തനപരമായി സുരക്ഷിതമാണെങ്കിലും അലേർട്ട് തുടർന്നും ഉയർത്തിയേക്കാം എന്നാണ് ഇതിന്റെ അർത്ഥം. മുൻകാല ഡിസ്മിസലുകൾ: `#224`, `#231` (മേയ് 2026), രണ്ടും സാങ്കേതിക ന്യായീകരണത്തോടെ `false positive` എന്ന് അടയാളപ്പെടുത്തിയവയാണ്.

**പുതിയൊരു സംഭവം എങ്ങനെ കൈകാര്യം ചെയ്യണം:**

1. കോൾസൈറ്റ് യഥാർത്ഥത്തിൽ സന്ദേശത്തെ `sanitizeErrorMessage` / `buildErrorBody` / മുകളിൽ രേഖപ്പെടുത്തിയിരിക്കുന്ന റാപ്പറുകളിൽ ഒന്നിലൂടെ കടത്തിവിടുന്നുണ്ടെന്ന് സ്ഥിരീകരിക്കുക (കോൾ ചെയിൻ തുടക്കം മുതൽ അവസാനം വരെ വായിക്കുക — ഒരു കമന്റിനെ മാത്രം വിശ്വസിക്കരുത്).
2. `tests/unit/error-message-sanitization.test.ts` ആ പാത പരിശോധിക്കുന്നുണ്ടെന്ന് സ്ഥിരീകരിക്കുക (അല്ലെങ്കിൽ കവറേജ് ചേർക്കുക).
3. ഈ ഡോക്യുമെന്റ് പരാമർശിച്ചുകൊണ്ട് `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` വഴി അലേർട്ട് ഡിസ്മിസ് ചെയ്യുക.
4. എല്ലായിടത്തും `.split("\n")[0]` ഇൻലൈൻ ചെയ്ത് ഇത് "പരിഹരിക്കരുത്" — ഹെൽപ്പറാണ് ഏക ആധികാരിക ഉറവിടം; സ്കാനറെ തൃപ്തിപ്പെടുത്തുന്നതായി തോന്നിക്കാൻ പാറ്റേൺ പകർത്തുന്നത് സാനിറ്റൈസറിനെ ദുർബലമാക്കുന്നു (പാത്ത് സ്ക്രബ്ബിംഗ്, ദൈർഘ്യപരിധി, ടൈപ്പ് കോർഷൻ എന്നിവ നഷ്ടപ്പെടുന്നു).

CodeQL-ന്റെ [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) പോലുള്ള ഓപ്റ്റ്-ഇൻ സവിശേഷതകൾ സ്വീകരിക്കുന്നതാണ് ദീർഘകാല പരിഹാരം; അത് ഈ ഡോക്യുമെന്റിന്റെ പരിധിക്ക് പുറത്താണ്.

## അവലംബങ്ങൾ

- [CWE-209: ഒരു പിശക് സന്ദേശത്തിലൂടെയുള്ള വിവര വെളിപ്പെടുത്തൽ](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: പിശക് കൈകാര്യം ചെയ്യൽ ചീറ്റ് ഷീറ്റ്](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- ഹെൽപ്പറിനെ കേന്ദ്രീകരിച്ച കമ്മിറ്റ്: `1a39c31f` — _fix(security): പൊതു അപ്സ്ട്രീം ക്രെഡൻഷ്യലുകൾ മറയ്ക്കുക + പിശക് സാനിറ്റൈസേഷൻ കേന്ദ്രീകരിക്കുക_
