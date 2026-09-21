# Error Message Sanitization (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [pa](../../../pa/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **ಸತ್ಯದ ಮೂಲ:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, ಮತ್ತು `open-sse/utils/error.ts` ನಲ್ಲಿರುವ ಸಾರ್ವಜನಿಕ ಬಿಲ್ಡರ್ಗಳು
> **ಪರೀಕ್ಷೆಗಳು:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **ಕೊನೆಯ ನವೀಕರಣ:** 2026-09-02 — v3.8.51
> **ಉದ್ದೇಶಿತ ಓದುಗರು:** ದೋಷ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ನಿರ್ವಹಿಸುವ ಯಾವುದೇ ಎಂಜಿನಿಯರ್ (HTTP ಮಾರ್ಗಗಳು, SSE ಸ್ಟ್ರೀಮ್ಗಳು, ಎಕ್ಸಿಕ್ಯೂಟರ್ಗಳು, MCP ಹ್ಯಾಂಡ್ಲರ್ಗಳು).
> **ಸ್ಥಿತಿ:** ಕ್ಲೈಂಟ್ಗೆ ದೋಷ ಸಂದೇಶವನ್ನು ಹಿಂದಿರುಗಿಸುವ ಪ್ರತಿಯೊಂದು ಕೋಡ್ ಪಥಕ್ಕೂ **ಕಡ್ಡಾಯ**.

## ಇದು ಏಕೆ ಅಸ್ತಿತ್ವದಲ್ಲಿದೆ

ರನ್ಟೈಮ್ ಎಕ್ಸೆಪ್ಶನ್ನಿಂದ ಹುಟ್ಟಿದ ದೋಷ ಸಂದೇಶವು ಸ್ಯಾನಿಟೈಸ್ ಆಗದೆ HTTP / SSE ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ತಲುಪುವ ಯಾವುದೇ ಕೋಡ್ ಪಥವನ್ನು CodeQL ನಿಯಮ `js/stack-trace-exposure` (CWE-209) ಗುರುತಿಸುತ್ತದೆ. ಪ್ರೊಡಕ್ಷನ್ ಪ್ರತಿಕ್ರಿಯೆಗಳಲ್ಲಿರುವ ಸ್ಟ್ಯಾಕ್ ಟ್ರೇಸ್ಗಳು ಮತ್ತು ಸಂಪೂರ್ಣ ಫೈಲ್ ಪಥಗಳು ಆಕ್ರಮಣಕಾರರಿಗೆ ಇವುಗಳನ್ನು ಒದಗಿಸುತ್ತವೆ:

- ಆಂತರಿಕ ಡೈರೆಕ್ಟರಿ ವಿನ್ಯಾಸ (`/srv/app/src/lib/...`) → ಮುಂದಿನ ದಾಳಿಗಳಿಗಾಗಿ ಮಾಹಿತಿ ಸಂಗ್ರಹಣೆ.
- ಸ್ಟ್ಯಾಕ್ ಫ್ರೇಮ್ಗಳಿಂದ ಊಹಿಸಲಾದ ಲೈಬ್ರರಿ / ಫ್ರೇಮ್ವರ್ಕ್ ಆವೃತ್ತಿಗಳು → ಗುರಿ-ನಿರ್ದಿಷ್ಟ ಎಕ್ಸ್ಪ್ಲಾಯ್ಟ್ ಆಯ್ಕೆ.
- ದೋಷಗಳಲ್ಲಿ ಸ್ಟ್ರಿಂಗ್-ಇಂಟರ್ಪೊಲೇಟ್ ಆಗಿರಬಹುದಾದ ಸೂಕ್ಷ್ಮ ರನ್ಟೈಮ್ ಮೌಲ್ಯಗಳು (DB ಕ್ವೆರಿಗಳು, ಕಾನ್ಫಿಗ್ ಮೌಲ್ಯಗಳು).

`open-sse/utils/error.ts` ರಫ್ತು ಮಾಡುವ `sanitizeErrorMessage` ಸಹಾಯಕವು ಈ ಕೆಳಗಿನ ವರ್ಗಗಳ
ಸೋರಿಕೆಯನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ:

1. ಭೌತಿಕ, ಸೀರಿಯಲೈಸ್ ಮಾಡಿದ ಮತ್ತು ಸಂದಿಗ್ಧತೆಯಿಲ್ಲದ ಇನ್ಲೈನ್ JavaScript ಸ್ಟ್ಯಾಕ್-ಫ್ರೇಮ್ ಅಂತ್ಯಭಾಗಗಳು.
2. ಸುರಕ್ಷಿತ HTTPS URLಗಳು ಮತ್ತು ಸ್ಪಷ್ಟವಾಗಿ ಗುರುತಿಸಲಾದ API ಮಾರ್ಗಗಳನ್ನು ಉಳಿಸಿಕೊಂಡೇ, ಸಂಪೂರ್ಣ POSIX, Windows, UNC ಮತ್ತು `file://` ಫೈಲ್ಸಿಸ್ಟಮ್ ಪಥಗಳು.
3. ಕ್ರೆಡೆನ್ಶಿಯಲ್ ಅಸೈನ್ಮೆಂಟ್ಗಳು, ಸಾಮಾನ್ಯ ಪ್ರೊವೈಡರ್ ಟೋಕನ್ ಸ್ವರೂಪಗಳು, ಪ್ರೈವೇಟ್-ಕೀ PEM ಬ್ಲಾಕ್ಗಳು ಮತ್ತು base64 ಡೇಟಾ URLಗಳು.

ಸ್ಯಾನಿಟೈಸರ್ ಇನ್ಪುಟ್ ಉದ್ದವನ್ನು ಮಿತಿಗೊಳಿಸುತ್ತದೆ ಮತ್ತು ಥ್ರೋ ಮಾಡಲಾದ ಮೌಲ್ಯವು ಸ್ಟ್ರಿಂಗ್ ಪರಿವರ್ತನೆಯನ್ನು ತಿರಸ್ಕರಿಸಿದಾಗ ಸುರಕ್ಷಿತವಾಗಿ ವಿಫಲಗೊಳ್ಳುತ್ತದೆ.
ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಸೀರಿಯಲೈಸ್ ಮಾಡುವ ಮೊದಲು, ರಿಕರ್ಸಿವ್ ಅಪ್ಸ್ಟ್ರೀಮ್ JSON ಸ್ಯಾನಿಟೈಸೇಶನ್ ಅಸುರಕ್ಷಿತ ಕ್ರೆಡೆನ್ಶಿಯಲ್/ಪಥ ಕೀಗಳು, ಸೆಷನ್ ಅಲಿಯಾಸ್ಗಳು ಮತ್ತು
ಪ್ರೋಟೋಟೈಪ್-ನಿಯಂತ್ರಣ ಕೀಗಳನ್ನು ಸಹ ತೆಗೆದುಹಾಕುತ್ತದೆ.

## ಕಡ್ಡಾಯ ಮಾದರಿ

### 1. ದೋಷ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ನಿರ್ಮಿಸುವುದು (HTTP / API ಮಾರ್ಗಗಳು)

`buildErrorBody()` ಬಳಸಿ — ಸ್ಯಾನಿಟೈಸೇಶನ್ ಅಂತರ್ನಿರ್ಮಿತವಾಗಿದೆ:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... ಹ್ಯಾಂಡ್ಲರ್ ಲಾಜಿಕ್ ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

ಅಥವಾ, ಅದೇ ಮಾಡ್ಯೂಲ್ನಲ್ಲಿರುವ ಅನುಕೂಲಕರ ರ್ಯಾಪರ್ಗಳಿಗಾಗಿ:

```ts
import {
  errorResponse, // ಒಂದೇ ಹಂತದ Response ಆಬ್ಜೆಕ್ಟ್
  writeStreamError, // SSE ರೈಟರ್
  createErrorResult, // { success: false, status, response, ... } ಆಕಾರ
  unavailableResponse, // Retry-After ಸೇರಿಸುತ್ತದೆ
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

ಇವೆಲ್ಲವೂ ಕ್ಯಾನಾನಿಕಲ್ ಸಾರ್ವಜನಿಕ-ದೋಷ ಗಡಿಯನ್ನು ಅನ್ವಯಿಸುತ್ತವೆ. `errorResponse`, `writeStreamError` ಮತ್ತು
`createErrorResult` ಗಳು `buildErrorBody` ಮೂಲಕ ಸಾಗುತ್ತವೆ; ಮೂರು ವಿಶೇಷ retry/circuit ಸಹಾಯಕಗಳು
ತಮ್ಮ ಸಾರ್ವಜನಿಕ ಸಂದರ್ಭವನ್ನು ನೇರವಾಗಿ ಪ್ರೊಜೆಕ್ಟ್ ಮಾಡಿ ಸ್ಯಾನಿಟೈಸ್ ಮಾಡುತ್ತವೆ. ಈ ಸಹಾಯಕಗಳನ್ನು ಬಳಸುವಾಗ **ನೀವು ಎಂದಿಗೂ
`sanitizeErrorMessage` ಅನ್ನು ಕೈಯಾರೆ ಕರೆ ಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ**.

### 2. ಕಸ್ಟಮ್ ದೋಷ ಎನ್ವಲೋಪ್ಗಳು (ಅಪರೂಪ)

ಮೇಲಿನ ಸಹಾಯಕಗಳನ್ನು ಬಳಸಲು ಸಾಧ್ಯವಾಗದಿದ್ದಾಗ (ಉದಾ. ಪ್ರತಿಕ್ರಿಯೆಯ ಆಕಾರವನ್ನು Connect-RPC ನಂತಹ ಅಪ್ಸ್ಟ್ರೀಮ್ ಪ್ರೋಟೋಕಾಲ್ ನಿರ್ಧರಿಸಿದರೆ), `sanitizeErrorMessage` ಅನ್ನು ನೇರವಾಗಿ ಆಮದು ಮಾಡಿ:

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

ಕಸ್ಟಮ್ ದೋಷ ಬಾಡಿಯನ್ನು ರಚಿಸಲು ಅನುಮೋದಿಸಲಾದ ಏಕೈಕ ವಿಧಾನ ಇದೇ. ಉಲ್ಲೇಖ ಅನುಷ್ಠಾನಕ್ಕಾಗಿ `open-sse/executors/cursor.ts::buildErrorResponse` ನೋಡಿ.

### 3. ಲಾಗ್ ಮಾಡುವುದು ಮತ್ತು ಪ್ರತಿಕ್ರಿಯಿಸುವುದು

ವಿಶ್ವಾಸಾರ್ಹ ಆಂತರಿಕ ಎಕ್ಸೆಪ್ಶನ್ಗಳು ತಮ್ಮ ಸಂಪೂರ್ಣ ಸಂದೇಶ ಮತ್ತು ಸ್ಟ್ಯಾಕ್ ಅನ್ನು ಉಳಿಸಿಕೊಳ್ಳಬಹುದು, ಇದರಿಂದ ಆಪರೇಟರ್ಗಳು ಡೀಬಗ್ ಮಾಡಬಹುದು. ಪ್ರೊವೈಡರ್, ವ್ಯಾಲಿಡೇಶನ್, ಬ್ರೌಸರ್-ಸೆಷನ್ ಅಥವಾ ಕ್ರೆಡೆನ್ಶಿಯಲ್-ಸಂಬಂಧಿತ ಗಡಿಗಳಲ್ಲಿ ಹುಟ್ಟುವ ಮೌಲ್ಯಗಳು
ಕನ್ಸೋಲ್ ಔಟ್ಪುಟ್, ಆಡಿಟ್ ಮೆಟಾಡೇಟಾ ಅಥವಾ ಶಾಶ್ವತ ಕಾಲ್ ಲಾಗ್ಗಳನ್ನು ಪ್ರವೇಶಿಸುವ ಮೊದಲು
ಸ್ಯಾನಿಟೈಸ್ ಆಗಿರಬೇಕು. ಮಾದರಿ:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // ವಿಶ್ವಾಸಾರ್ಹ ಆಂತರಿಕ ಎಕ್ಸೆಪ್ಶನ್ಗಳಿಗೆ ಮಾತ್ರ
  return errorResponse(500, getErrorMessage(err)); // ಸ್ಯಾನಿಟೈಸ್ ಮಾಡಲಾಗಿದೆ — ಕ್ಲೈಂಟ್ಗೆ ಕಳುಹಿಸಲಾಗಿದೆ
}
```

ಪ್ರೊವೈಡರ್-ನಿಯಂತ್ರಿತ ವೈಫಲ್ಯಗಳಿಗೆ, ಲಾಗ್ ಮಾಡಿದ ಮೌಲ್ಯವನ್ನೂ ಪ್ರೊಜೆಕ್ಟ್ ಮಾಡಿ:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. ನಿಷೇಧಿತ ಮಾದರಿಗಳು

❌ **ಎಂದಿಗೂ** ಕಚ್ಚಾ ಎಕ್ಸೆಪ್ಶನ್ ಔಟ್ಪುಟ್ ಅನ್ನು Response ಬಾಡಿಯಲ್ಲಿ ಇರಿಸಬೇಡಿ:

```ts
// ತಪ್ಪು: ಸ್ಟ್ಯಾಕ್ ಟ್ರೇಸ್ + ಫೈಲ್ ಪಥಗಳು ಕ್ಲೈಂಟ್ ಅನ್ನು ತಲುಪುತ್ತವೆ
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **ಎಂದಿಗೂ** ನಿಮ್ಮದೇ ಮೊದಲ-ಸಾಲಿನ ಸ್ಪ್ಲಿಟ್ಟರ್ ಅನ್ನು ರಚಿಸಬೇಡಿ:

```ts
// ತಪ್ಪು: ಸಂಪೂರ್ಣ ಪಥಗಳನ್ನು ತೆಗೆದುಹಾಕಲು ಮರೆತುಬಿಡುತ್ತದೆ, ಕ್ಯಾನಾನಿಕಲ್ ಸಹಾಯಕದಿಂದ ಭಿನ್ನವಾಗಬಹುದು
const safe = String(err).split("\n")[0];
```

❌ **ಎಂದಿಗೂ** ಮಾರ್ಗದಲ್ಲಿ ಮಾತ್ರ ಸ್ಯಾನಿಟೈಸ್ ಮಾಡಿ SSE ಪಥವನ್ನು ಮರೆಯಬೇಡಿ. ಸ್ಟ್ರೀಮ್ಗೆ ಬರೆಯುವ ಯಾವುದಾದರೂ `writeStreamError` (ಅಥವಾ ಅದರ ಆಧಾರವಾಗಿರುವ `buildErrorBody`) ಮೂಲಕ ಸಾಗಬೇಕು.

❌ **ಎಂದಿಗೂ** `process.cwd()`, `__filename`, `__dirname` ಅಥವಾ env-ನಿಂದ ಪಡೆದ ಪಥಗಳನ್ನು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ
ದೋಷ ಸಂದೇಶಗಳಲ್ಲಿ ಸೇರಿಸಬೇಡಿ. ಬಹುಪದರ ರಕ್ಷಣೆಯಾಗಿ ಸ್ಯಾನಿಟೈಸರ್ ಸಂಪೂರ್ಣ ಪಥಗಳನ್ನು ನಿರ್ವಹಿಸುತ್ತದೆ, ಆದರೆ ಕರೆ ಮಾಡುವವರು
ಮೊದಲಿನಿಂದಲೇ ಟೋಪಾಲಜಿ-ಬಹಿರಂಗಪಡಿಸುವ ಸಂದೇಶಗಳನ್ನು ರಚಿಸಬಾರದು.

## CIಯಲ್ಲಿನ ಕವರೇಜ್

`tests/unit/error-message-sanitization.test.ts` ಇವುಗಳನ್ನು ಜಾರಿಗೊಳಿಸುತ್ತದೆ:

- `/api/model-combo-mappings/*` ಅಡಿಯಲ್ಲಿರುವ ಪ್ರತಿಯೊಂದು ರೂಟ್ 4xx/5xx ಸಂದರ್ಭದಲ್ಲಿ ಸ್ಯಾನಿಟೈಸ್ ಮಾಡಿದ ಬಾಡಿಗಳನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ.
- `sanitizeErrorMessage` ಬಹು-ಸಾಲಿನ ಸ್ಟ್ಯಾಕ್ ಟ್ರೇಸ್ಗಳನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ.
- `sanitizeErrorMessage` POSIX ಮತ್ತು Windows ಅಬ್ಸಲ್ಯೂಟ್ ಪಾಥ್ಗಳನ್ನು `<path>` ನಿಂದ ಬದಲಾಯಿಸುತ್ತದೆ.
- `sanitizeErrorMessage` `null`/`undefined`/`Error` ಇನ್ಸ್ಟನ್ಸ್ ಇನ್ಪುಟ್ಗಳನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ನಿರ್ವಹಿಸುತ್ತದೆ.
- `buildErrorBody` ತನ್ನ `message` ಫೀಲ್ಡ್ನಲ್ಲಿ ಸ್ಟ್ಯಾಕ್ ಟ್ರೇಸ್ಗಳನ್ನು ಎಂದಿಗೂ ಬಹಿರಂಗಪಡಿಸುವುದಿಲ್ಲ.

ಹೊಸ ರೂಟ್ ಅಥವಾ ಎಕ್ಸಿಕ್ಯೂಟರ್ ಸೇರಿಸುವಾಗ, ಈ ಫೈಲ್ನ ಅಸರ್ಷನ್ ಮಾದರಿಯನ್ನು ನಕಲಿಸಿ. ಕವರೇಜ್ ಗೇಟ್ (`npm run test:coverage`) ≥60% ಸ್ಟೇಟ್ಮೆಂಟ್ಗಳು/ಲೈನ್ಗಳು/ಫಂಕ್ಷನ್ಗಳು/ಬ್ರಾಂಚ್ಗಳನ್ನು ಜಾರಿಗೊಳಿಸುತ್ತದೆ — ಎರರ್ ಪಾಥ್ಗಳು ಕವರೇಜ್ ಹೊಂದಿರಬೇಕು.

## ಸಂಬಂಧಿತ ನಿಯಂತ್ರಣಗಳು

- `.github/security` ನಲ್ಲಿನ `js/stack-trace-exposure` CodeQL ಅಲರ್ಟ್ಗಳನ್ನು ಯಾವಾಗಲೂ **ಒಂದೋ** ಈ ಹೆಲ್ಪರ್ಗಳ ಮೂಲಕ ಸರಿಪಡಿಸಬೇಕು **ಅಥವಾ** ಈ ಡಾಕ್ ಅನ್ನು ಉಲ್ಲೇಖಿಸುವ ಕಾಮೆಂಟ್ನೊಂದಿಗೆ ವಜಾಗೊಳಿಸಬೇಕು.
- `pino` ರಿಡ್ಯಾಕ್ಷನ್ ಕಾನ್ಫಿಗ್ (`src/shared/utils/logRedaction.ts`) ವಿಶ್ವಾಸಾರ್ಹ ಸ್ಟ್ರಕ್ಚರ್ಡ್ ಲಾಗ್ಗಳನ್ನು
  ಪ್ರತ್ಯೇಕವಾಗಿ ನಿರ್ವಹಿಸುತ್ತದೆ. ಈ ಡಾಕ್ಯುಮೆಂಟ್ ಸಾರ್ವಜನಿಕ ರೆಸ್ಪಾನ್ಸ್ ಸಂದೇಶಗಳು ಮತ್ತು ಸ್ಥಿರ ಕಾಲ್/ಪ್ರಾಕ್ಸಿ-ಲಾಗ್ ಗಡಿಗಳನ್ನು
  ದಾಟುವ ಪ್ರೊವೈಡರ್-ನಿಯಂತ್ರಿತ ಮೌಲ್ಯಗಳನ್ನು ಒಳಗೊಳ್ಳುತ್ತದೆ.
- ಅಪ್ಸ್ಟ್ರೀಮ್-ಹೆಡರ್ ಡಿನೈಲಿಸ್ಟ್ (`src/shared/constants/upstreamHeaders.ts`) ಹೆಡರ್ ಸೋರಿಕೆಯನ್ನು ಒಳಗೊಳ್ಳುತ್ತದೆ — ಹೊಸ ಎಕ್ಸ್ಫಿಲ್ಟ್ರೇಷನ್ ಕಳವಳವನ್ನು ಸೇರಿಸುವಾಗ ಎರಡೂ ಫೈಲ್ಗಳನ್ನು ಹೊಂದಾಣಿಕೆಯಲ್ಲಿ ಇರಿಸಿ.

## ಅಪ್ಸ್ಟ್ರೀಮ್ ವಿವರಗಳ ಪಾಸ್ಥ್ರೂ

`buildErrorBody` ಐಚ್ಛಿಕ ಮೂರನೇ ಆರ್ಗ್ಯುಮೆಂಟ್ `upstreamDetails` ಅನ್ನು (ಅಪ್ಸ್ಟ್ರೀಮ್ ಪ್ರೊವೈಡರ್ನಿಂದ ಬಂದ ಕಚ್ಚಾ
ಪಾರ್ಸ್ ಮಾಡಿದ ಬಾಡಿ) ಸ್ವೀಕರಿಸುತ್ತದೆ. ಅದನ್ನು ಒದಗಿಸಿದಾಗ, ರೆಸ್ಪಾನ್ಸ್ನಲ್ಲಿ `upstream_details` ಆಗಿ ಸೇರಿಸುವ ಮೊದಲು
`sanitizeUpstreamDetails` ಮೂಲಕ ಸ್ಯಾನಿಟೈಸ್ ಮಾಡಲಾಗುತ್ತದೆ.

ಐಚ್ಛಿಕ ನಾಲ್ಕನೇ ಆರ್ಗ್ಯುಮೆಂಟ್ `classification`
(`{ type?: string; code?: string; reason?: string }`) ಸ್ಪಷ್ಟವಾದ ಸಾರ್ವಜನಿಕ ವರ್ಗೀಕರಣವನ್ನು ಸ್ವೀಕರಿಸುತ್ತದೆ.
ಪ್ರತಿಯೊಂದು ಫೀಲ್ಡ್ ಅನ್ನು ಸೀಮಿತ ಸಾರ್ವಜನಿಕ-ಐಡೆಂಟಿಫೈಯರ್ ಪದಕೋಶಕ್ಕೆ ಪ್ರೊಜೆಕ್ಟ್ ಮಾಡಲಾಗುತ್ತದೆ. ಅಸುರಕ್ಷಿತ, ಕ್ರೆಡೆನ್ಷಿಯಲ್-ಆಕಾರದ,
ಕಂಟ್ರೋಲ್-ಕ್ಯಾರೆಕ್ಟರ್ ಹೊಂದಿರುವ ಅಥವಾ ಅತಿದೊಡ್ಡ ಮೌಲ್ಯಗಳು ಸ್ಟೇಟಸ್ನಿಂದ ಪಡೆದ ಟೈಪ್/ಕೋಡ್ಗೆ ಹಿಂತಿರುಗುತ್ತವೆ; ಅಸುರಕ್ಷಿತ ಐಚ್ಛಿಕ
ರೀಸನ್ ಅನ್ನು ಬಿಟ್ಟುಬಿಡಲಾಗುತ್ತದೆ. ಮೂರು-ಅಂಕಿಯ HTTP ಸ್ಟೇಟಸ್ ಐಡೆಂಟಿಫೈಯರ್ಗಳು (`100` ರಿಂದ `599` ವರೆಗೆ) ಸಂಖ್ಯಾತ್ಮಕ
ಅಪ್ಸ್ಟ್ರೀಮ್ ಸ್ಟೇಟಸ್ ಅನ್ನು ಯಂತ್ರ-ಓದಬಹುದಾದ ಕೋಡ್ ಆಗಿ ಬಹಿರಂಗಪಡಿಸುವ ಪ್ರೊವೈಡರ್ ಕಾಂಟ್ರಾಕ್ಟ್ಗಳಿಗೆ ಮಾನ್ಯವಾಗಿರುತ್ತವೆ. ಅದೇ
ಸೀಮಿತ ಶ್ರೇಣಿಯನ್ನು ಸ್ಥಳೀಯವಾಗಿ ರಚಿಸಲಾದ HTTP-ಸ್ಟೇಟಸ್ ಪ್ಲೇಸ್ಹೋಲ್ಡರ್ ರೂಪದಲ್ಲಿಯೂ ಸ್ವೀಕರಿಸಲಾಗುತ್ತದೆ; ಅನಿಯಂತ್ರಿತ ಪ್ರೊವೈಡರ್
ಸಂಖ್ಯೆಗಳು ಮತ್ತು ಹೆಸರುಗಳು ಪದಕೋಶದ ಹೊರಗೇ ಉಳಿಯುತ್ತವೆ.

ಪ್ರತಿಯೊಂದು ಸ್ಪಷ್ಟ ವರ್ಗೀಕರಣವನ್ನು ಆ ನಾಲ್ಕನೇ ಆರ್ಗ್ಯುಮೆಂಟ್ನಲ್ಲಿ ಪಾಸ್ ಮಾಡಿ. `buildErrorBody()` ಹಿಂದಿರುಗಿದ ನಂತರ
`body.error.code`, `body.error.type`, ಅಥವಾ `body.error.reason` ಅನ್ನು ಎಂದಿಗೂ ಓವರ್ರೈಟ್ ಮಾಡಬೇಡಿ;
ಬಿಲ್ಡರ್ ನಂತರದ ಮ್ಯೂಟೇಷನ್ ಸಾರ್ವಜನಿಕ ಪ್ರೊಜೆಕ್ಷನ್ ಅನ್ನು ಬೈಪಾಸ್ ಮಾಡುತ್ತದೆ.

`upstreamDetails` ಗೆ ಅನ್ವಯಿಸಲಾದ ಸ್ಯಾನಿಟೈಸೇಶನ್ ನಿಯಮಗಳು:

1. ಸ್ಟ್ರಿಂಗ್ ಲೀಫ್ಗಳು: `sanitizeErrorMessage` ಮೂಲಕ ರನ್ ಮಾಡಿ (ಸ್ಟ್ಯಾಕ್ಗಳು + ಅಬ್ಸಲ್ಯೂಟ್ ಪಾಥ್ಗಳನ್ನು ತೆಗೆದುಹಾಕುತ್ತದೆ).
2. ಅಸುರಕ್ಷಿತ ಪಾಥ್, ಕ್ರೆಡೆನ್ಷಿಯಲ್, ಸೆಷನ್-ಅಲಿಯಾಸ್ ಮತ್ತು ಪ್ರೋಟೋಟೈಪ್-ಕಂಟ್ರೋಲ್ ಕೀಗಳನ್ನು ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ.
3. ಡೆಪ್ತ್ ಕ್ಯಾಪ್: 4 ಲೆವೆಲ್ಗಳನ್ನು ಮೀರಿದ ನೆಸ್ಟಿಂಗ್ ಅನ್ನು `"[truncated]"` ಸ್ಟ್ರಿಂಗ್ನಿಂದ ಬದಲಾಯಿಸಲಾಗುತ್ತದೆ.
4. ಅರೇಗಳನ್ನು 32 ಎಲಿಮೆಂಟ್ಗಳಿಗೆ ಮಿತಿಗೊಳಿಸಲಾಗುತ್ತದೆ.

ಪಾರ್ಸ್ ಮಾಡಿದ ಪ್ರೊವೈಡರ್ ಎರರ್ ಬಾಡಿಯನ್ನು ಹೊಂದಿರುವ ಕಾಲ್ ಸೈಟ್ಗಳು ಮಾತ್ರ `upstreamDetails` ಅನ್ನು ಪಾಸ್ ಮಾಡಬೇಕು. ಆಂತರಿಕ OmniRoute
ಎರರ್ಗಳು (SSE ಪಾರ್ಸ್ ವೈಫಲ್ಯಗಳು, ಖಾಲಿ ಕಂಟೆಂಟ್, ಗಾರ್ಡ್ರೈಲ್ ಬ್ಲಾಕ್ಗಳು) ಅದನ್ನು ಒಳಗೊಂಡಿರಬಾರದು.

ಕಚ್ಚಾ `err.stack`, `err.message`, ಅಥವಾ ರನ್ಟೈಮ್ ಎಕ್ಸೆಪ್ಷನ್ನ ಯಾವುದೇ ಸ್ಟ್ರಿಂಗ್ ಅನ್ನು
`upstreamDetails` ಗೆ ಪಾಸ್ ಮಾಡಬೇಡಿ. ಅವು ಅಪ್ಸ್ಟ್ರೀಮ್ ಬಾಡಿ ಇಲ್ಲದೆ ಇನ್ನೂ
`errorResponse` / `buildErrorBody(code, msg)` ಮೂಲಕವೇ ಹೋಗಬೇಕು.

ಆಯ್ದ ಅಪ್ಸ್ಟ್ರೀಮ್ 4xx ಪಾಸ್ಥ್ರೂ ಕ್ಲೈಂಟ್ ಸ್ವಯಂ-ರಿಕವರಿಗೆ ಅಗತ್ಯವಿರುವ ಪ್ರೊವೈಡರ್ನ ಸುರಕ್ಷಿತ JSON ಆಕಾರ ಮತ್ತು ಪದಪ್ರಯೋಗವನ್ನು
ಉಳಿಸುತ್ತದೆ, ಆದರೆ ಅದು ಬೈಟ್-ಫಾರ್-ಬೈಟ್ ಪಾಸ್ಥ್ರೂ ಅಲ್ಲ: ಸೀರಿಯಲೈಸೇಶನ್ಗೆ ಮೊದಲು ರಿಕರ್ಸಿವ್ ಸ್ಯಾನಿಟೈಸರ್ ಯಾವಾಗಲೂ ರನ್ ಆಗುತ್ತದೆ.
ಸೈಕ್ಲಿಕ್, BigInt ಹೊಂದಿರುವ, ಅಥವಾ ದುರುದ್ದೇಶಪೂರಿತ `toJSON()` ಬಾಡಿಗಳು ಸುರಕ್ಷಿತವಾಗಿ ವಿಫಲವಾಗುತ್ತವೆ ಮತ್ತು
ಪಾಸ್ಥ್ರೂಗೆ ಅರ್ಹವಾಗಿರುವುದಿಲ್ಲ. OCR ಮತ್ತು ಮಾಡರೇಷನ್ ಕೂಡ ಇದೇ ನಿಯಮವನ್ನು ಅನ್ವಯಿಸುತ್ತವೆ; JSON ಅಲ್ಲದ, ಖಾಲಿ, ಅಥವಾ ತಪ್ಪಾಗಿ
ಲೇಬಲ್ ಮಾಡಿದ ಅಪ್ಸ್ಟ್ರೀಮ್ ಬಾಡಿಗಳನ್ನು ಪ್ರಮಾಣಿತ OmniRoute JSON ಎರರ್ ಎನ್ವೆಲಪ್ಗೆ ಪರಿವರ್ತಿಸಲಾಗುತ್ತದೆ.

## ತಿಳಿದಿರುವ CodeQL ಮಿತಿ: ಕಸ್ಟಮ್ ಸ್ಯಾನಿಟೈಸರ್ಗಳನ್ನು ಗುರುತಿಸಲಾಗುವುದಿಲ್ಲ

CodeQL ಕ್ವೆರಿ [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) ಸ್ಯಾನಿಟೈಸರ್ ಮಾದರಿಗಳ ಸ್ಥಿರ ಅನುಮತಿ ಪಟ್ಟಿಯನ್ನು ಬಳಸುತ್ತದೆ (ಉದಾ. ಇನ್ಲೈನ್ `.split("\n")[0]`, ನಿರ್ದಿಷ್ಟ regex ವಿನ್ಯಾಸಗಳೊಂದಿಗೆ `String#replace`, `Error` ಮೇಲಿನ `.message` ಪ್ರವೇಶ). ನಮ್ಮ `sanitizeErrorMessage()` ನಂತಹ ಕಸ್ಟಮ್ ಸಹಾಯಕದ ಮೂಲಕ ನಡೆಯುವ ಪರೋಕ್ಷ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಇದು ಗುರುತಿಸುವುದಿಲ್ಲ.

ಇದರರ್ಥ, ಈ ಮಾಡ್ಯೂಲ್ ಮೂಲಕ ಸ್ಯಾನಿಟೈಸ್ ಮಾಡುತ್ತವೆಂದು ಸ್ಪಷ್ಟವಾಗಿ ಸಾಬೀತಾಗಿರುವ ಕಾಲ್ಸೈಟ್ಗಳು — ಉದಾಹರಣೆಗೆ `open-sse/utils/error.ts::errorResponse` ಮತ್ತು `open-sse/executors/cursor.ts::buildErrorResponse` — ಕೋಡ್ ಕಾರ್ಯಾತ್ಮಕವಾಗಿ ಸುರಕ್ಷಿತವಾಗಿದ್ದರೂ ಎಚ್ಚರಿಕೆಯನ್ನು ನೀಡುವುದನ್ನು ಮುಂದುವರಿಸಬಹುದು. ಹಿಂದಿನ ವಜಾಗೊಳಿಸುವಿಕೆಗಳು: `#224`, `#231` (ಮೇ 2026), ಎರಡನ್ನೂ ತಾಂತ್ರಿಕ ಸಮರ್ಥನೆಯೊಂದಿಗೆ `false positive` ಎಂದು ಗುರುತಿಸಲಾಗಿದೆ.

**ಹೊಸ ಸಂಭವವನ್ನು ನಿರ್ವಹಿಸುವ ವಿಧಾನ:**

1. ಕಾಲ್ಸೈಟ್ ನಿಜವಾಗಿಯೂ ಸಂದೇಶವನ್ನು `sanitizeErrorMessage` / `buildErrorBody` / ಮೇಲೆ ದಾಖಲಿಸಿರುವ ರ್ಯಾಪರ್ಗಳಲ್ಲಿ ಒಂದರ ಮೂಲಕ ಕಳುಹಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ (ಕಾಲ್ ಸರಣಿಯನ್ನು ಆರಂಭದಿಂದ ಕೊನೆಯವರೆಗೆ ಓದಿ — ಕಾಮೆಂಟ್ ಅನ್ನು ನಂಬಬೇಡಿ).
2. `tests/unit/error-message-sanitization.test.ts` ಆ ಪಥವನ್ನು ಪರೀಕ್ಷಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ (ಅಥವಾ ಪರೀಕ್ಷಾ ವ್ಯಾಪ್ತಿಯನ್ನು ಸೇರಿಸಿ).
3. ಈ ಡಾಕ್ಯುಮೆಂಟ್ ಅನ್ನು ಉಲ್ಲೇಖಿಸುತ್ತಾ `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` ಮೂಲಕ ಎಚ್ಚರಿಕೆಯನ್ನು ವಜಾಗೊಳಿಸಿ.
4. ಎಲ್ಲೆಡೆಯೂ `.split("\n")[0]` ಅನ್ನು ಇನ್ಲೈನ್ ಮಾಡುವ ಮೂಲಕ ಇದನ್ನು "ಸರಿಪಡಿಸಬೇಡಿ" — ಸಹಾಯಕವೇ ಏಕೈಕ ಅಧಿಕೃತ ಮೂಲವಾಗಿದೆ; ಸ್ಕ್ಯಾನರ್ ಅನ್ನು ಸಮಾಧಾನಪಡಿಸಿದಂತೆ ತೋರಿಸಲು ಮಾದರಿಯನ್ನು ನಕಲು ಮಾಡುವುದು ಸ್ಯಾನಿಟೈಸರ್ ಅನ್ನು ದುರ್ಬಲಗೊಳಿಸುತ್ತದೆ (ಪಥ ಸ್ಕ್ರಬ್ಬಿಂಗ್, ಉದ್ದದ ಮಿತಿ ಮತ್ತು ಪ್ರಕಾರ ಕೋರ್ಷನ್ ಕಳೆದುಹೋಗುತ್ತವೆ).

CodeQL ನ [`@codeql/javascript-models` custom sanitizer config](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) ನಂತಹ ಆಯ್ಕೆಮಾಡಿ ಸಕ್ರಿಯಗೊಳಿಸುವ ವೈಶಿಷ್ಟ್ಯಗಳನ್ನು ಅಳವಡಿಸಿಕೊಳ್ಳುವುದು ದೀರ್ಘಾವಧಿಯ ಪರಿಹಾರವಾಗಿದೆ; ಅದು ಈ ಡಾಕ್ಯುಮೆಂಟ್ನ ವ್ಯಾಪ್ತಿಯಿಂದ ಹೊರಗಿದೆ.

## ಉಲ್ಲೇಖಗಳು

- [CWE-209: ದೋಷ ಸಂದೇಶದ ಮೂಲಕ ಮಾಹಿತಿ ಬಹಿರಂಗಪಡಿಸುವಿಕೆ](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: ದೋಷ ನಿರ್ವಹಣೆಯ ಚೀಟ್ ಶೀಟ್](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- ಸಹಾಯಕವನ್ನು ಕೇಂದ್ರೀಕರಿಸಿದ ಕಮಿಟ್: `1a39c31f` — _fix(security): ಸಾರ್ವಜನಿಕ ಅಪ್ಸ್ಟ್ರೀಮ್ ರುಜುವಾತುಗಳನ್ನು ಮರೆಮಾಡಿ + ದೋಷ ಸ್ಯಾನಿಟೈಸೇಶನ್ ಅನ್ನು ಕೇಂದ್ರೀಕರಿಸಿ_
