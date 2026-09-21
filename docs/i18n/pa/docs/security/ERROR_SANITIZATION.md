# Error Message Sanitization (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/ERROR_SANITIZATION.md) · 🇪🇹 [am](../../../am/docs/security/ERROR_SANITIZATION.md) · 🇸🇦 [ar](../../../ar/docs/security/ERROR_SANITIZATION.md) · 🇦🇿 [az](../../../az/docs/security/ERROR_SANITIZATION.md) · 🇧🇬 [bg](../../../bg/docs/security/ERROR_SANITIZATION.md) · 🇧🇩 [bn](../../../bn/docs/security/ERROR_SANITIZATION.md) · 🇨🇿 [cs](../../../cs/docs/security/ERROR_SANITIZATION.md) · 🇩🇰 [da](../../../da/docs/security/ERROR_SANITIZATION.md) · 🇩🇪 [de](../../../de/docs/security/ERROR_SANITIZATION.md) · 🇬🇷 [el](../../../el/docs/security/ERROR_SANITIZATION.md) · 🇪🇸 [es](../../../es/docs/security/ERROR_SANITIZATION.md) · 🇪🇪 [et](../../../et/docs/security/ERROR_SANITIZATION.md) · 🇮🇷 [fa](../../../fa/docs/security/ERROR_SANITIZATION.md) · 🇫🇮 [fi](../../../fi/docs/security/ERROR_SANITIZATION.md) · 🇫🇷 [fr](../../../fr/docs/security/ERROR_SANITIZATION.md) · 🇮🇪 [ga](../../../ga/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [gu](../../../gu/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ha](../../../ha/docs/security/ERROR_SANITIZATION.md) · 🇮🇱 [he](../../../he/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [hi](../../../hi/docs/security/ERROR_SANITIZATION.md) · 🇭🇷 [hr](../../../hr/docs/security/ERROR_SANITIZATION.md) · 🇭🇺 [hu](../../../hu/docs/security/ERROR_SANITIZATION.md) · 🇦🇲 [hy](../../../hy/docs/security/ERROR_SANITIZATION.md) · 🇮🇩 [id](../../../id/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [ig](../../../ig/docs/security/ERROR_SANITIZATION.md) · 🇮🇹 [it](../../../it/docs/security/ERROR_SANITIZATION.md) · 🇯🇵 [ja](../../../ja/docs/security/ERROR_SANITIZATION.md) · 🇬🇪 [ka](../../../ka/docs/security/ERROR_SANITIZATION.md) · 🇰🇭 [km](../../../km/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [kn](../../../kn/docs/security/ERROR_SANITIZATION.md) · 🇰🇷 [ko](../../../ko/docs/security/ERROR_SANITIZATION.md) · 🇱🇹 [lt](../../../lt/docs/security/ERROR_SANITIZATION.md) · 🇱🇻 [lv](../../../lv/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ml](../../../ml/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [mr](../../../mr/docs/security/ERROR_SANITIZATION.md) · 🇲🇾 [ms](../../../ms/docs/security/ERROR_SANITIZATION.md) · 🇲🇹 [mt](../../../mt/docs/security/ERROR_SANITIZATION.md) · 🇲🇲 [my](../../../my/docs/security/ERROR_SANITIZATION.md) · 🇳🇵 [ne](../../../ne/docs/security/ERROR_SANITIZATION.md) · 🇳🇱 [nl](../../../nl/docs/security/ERROR_SANITIZATION.md) · 🇳🇴 [no](../../../no/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [or](../../../or/docs/security/ERROR_SANITIZATION.md) · 🇵🇭 [phi](../../../phi/docs/security/ERROR_SANITIZATION.md) · 🇵🇱 [pl](../../../pl/docs/security/ERROR_SANITIZATION.md) · 🇵🇹 [pt](../../../pt/docs/security/ERROR_SANITIZATION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/ERROR_SANITIZATION.md) · 🇷🇴 [ro](../../../ro/docs/security/ERROR_SANITIZATION.md) · 🇷🇺 [ru](../../../ru/docs/security/ERROR_SANITIZATION.md) · 🇱🇰 [si](../../../si/docs/security/ERROR_SANITIZATION.md) · 🇸🇰 [sk](../../../sk/docs/security/ERROR_SANITIZATION.md) · 🇸🇮 [sl](../../../sl/docs/security/ERROR_SANITIZATION.md) · 🇷🇸 [sr](../../../sr/docs/security/ERROR_SANITIZATION.md) · 🇸🇪 [sv](../../../sv/docs/security/ERROR_SANITIZATION.md) · 🇰🇪 [sw](../../../sw/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [ta](../../../ta/docs/security/ERROR_SANITIZATION.md) · 🇮🇳 [te](../../../te/docs/security/ERROR_SANITIZATION.md) · 🇹🇭 [th](../../../th/docs/security/ERROR_SANITIZATION.md) · 🇹🇷 [tr](../../../tr/docs/security/ERROR_SANITIZATION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/ERROR_SANITIZATION.md) · 🇵🇰 [ur](../../../ur/docs/security/ERROR_SANITIZATION.md) · 🇺🇿 [uz](../../../uz/docs/security/ERROR_SANITIZATION.md) · 🇻🇳 [vi](../../../vi/docs/security/ERROR_SANITIZATION.md) · 🇳🇬 [yo](../../../yo/docs/security/ERROR_SANITIZATION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/ERROR_SANITIZATION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/ERROR_SANITIZATION.md)

---

> **ਸੱਚਾਈ ਦਾ ਸਰੋਤ:** `open-sse/utils/errorSanitization.ts`,
> `open-sse/utils/errorPathRedaction.ts`, ਅਤੇ `open-sse/utils/error.ts` ਵਿੱਚ ਮੌਜੂਦ ਜਨਤਕ ਬਿਲਡਰ
> **ਟੈਸਟ:** `tests/unit/error-message-sanitization.test.ts`,
> `tests/unit/error-public-boundaries-hardening.test.ts`
> **ਆਖਰੀ ਅੱਪਡੇਟ:** 2026-09-02 — v3.8.51
> **ਦਰਸ਼ਕ:** ਗਲਤੀ ਜਵਾਬਾਂ (HTTP ਰੂਟਾਂ, SSE ਸਟ੍ਰੀਮਾਂ, ਐਗਜ਼ਿਕਿਊਟਰਾਂ, MCP ਹੈਂਡਲਰਾਂ) ਨਾਲ ਕੰਮ ਕਰਨ ਵਾਲਾ ਕੋਈ ਵੀ ਇੰਜੀਨੀਅਰ।
> **ਸਥਿਤੀ:** ਕਲਾਇੰਟ ਨੂੰ ਗਲਤੀ ਸੁਨੇਹਾ ਵਾਪਸ ਕਰਨ ਵਾਲੇ ਹਰੇਕ ਕੋਡ ਪਾਥ ਲਈ **ਲਾਜ਼ਮੀ**।

## ਇਹ ਕਿਉਂ ਮੌਜੂਦ ਹੈ

CodeQL ਨਿਯਮ `js/stack-trace-exposure` (CWE-209) ਉਸ ਹਰ ਕੋਡ ਪਾਥ ਨੂੰ ਫਲੈਗ ਕਰਦਾ ਹੈ ਜਿੱਥੇ ਰਨਟਾਈਮ ਐਕਸੈਪਸ਼ਨ ਤੋਂ ਆਇਆ ਗਲਤੀ ਸੁਨੇਹਾ ਸੈਨੀਟਾਈਜ਼ ਕੀਤੇ ਬਿਨਾਂ HTTP / SSE ਜਵਾਬ ਤੱਕ ਪਹੁੰਚਦਾ ਹੈ। ਪ੍ਰੋਡਕਸ਼ਨ ਜਵਾਬਾਂ ਵਿੱਚ ਸਟੈਕ ਟ੍ਰੇਸ ਅਤੇ ਐਬਸੋਲਿਊਟ ਫ਼ਾਈਲ ਪਾਥ ਹਮਲਾਵਰਾਂ ਨੂੰ ਇਹ ਜਾਣਕਾਰੀ ਦਿੰਦੇ ਹਨ:

- ਅੰਦਰੂਨੀ ਡਾਇਰੈਕਟਰੀ ਬਣਤਰ (`/srv/app/src/lib/...`) → ਅਗਲੇ ਹਮਲਿਆਂ ਲਈ ਟੋਹ।
- ਸਟੈਕ ਫ੍ਰੇਮਾਂ ਤੋਂ ਅਨੁਮਾਨਿਤ ਲਾਇਬ੍ਰੇਰੀ / ਫ੍ਰੇਮਵਰਕ ਵਰਜਨ → ਨਿਸ਼ਾਨਾਬੱਧ ਐਕਸਪਲੋਇਟ ਦੀ ਚੋਣ।
- ਸੰਵੇਦਨਸ਼ੀਲ ਰਨਟਾਈਮ ਮੁੱਲ ਜੋ ਗਲਤੀਆਂ ਵਿੱਚ ਸਟ੍ਰਿੰਗ-ਇੰਟਰਪੋਲੇਟ ਹੋ ਸਕਦੇ ਹਨ (DB ਕੁਐਰੀਆਂ, ਕਾਨਫਿਗ ਮੁੱਲ)।

`open-sse/utils/error.ts` ਵੱਲੋਂ ਐਕਸਪੋਰਟ ਕੀਤਾ `sanitizeErrorMessage` ਹੈਲਪਰ ਲੀਕੇਜ ਦੀਆਂ ਇਹ ਸ਼੍ਰੇਣੀਆਂ ਹਟਾਉਂਦਾ ਹੈ:

1. ਭੌਤਿਕ, ਸੀਰੀਅਲਾਈਜ਼ਡ ਅਤੇ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਇਨਲਾਈਨ JavaScript ਸਟੈਕ-ਫ੍ਰੇਮ ਟੇਲ।
2. ਐਬਸੋਲਿਊਟ POSIX, Windows, UNC ਅਤੇ `file://` ਫ਼ਾਈਲ-ਸਿਸਟਮ ਪਾਥ, ਜਦਕਿ ਸੁਰੱਖਿਅਤ HTTPS URLs ਅਤੇ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਚਿੰਨ੍ਹਿਤ API ਰੂਟਾਂ ਨੂੰ ਬਰਕਰਾਰ ਰੱਖਦਾ ਹੈ।
3. ਕ੍ਰੈਡੈਂਸ਼ਲ ਅਸਾਈਨਮੈਂਟਾਂ, ਆਮ ਪ੍ਰੋਵਾਈਡਰ ਟੋਕਨ ਫਾਰਮੈਟਾਂ, ਪ੍ਰਾਈਵੇਟ-ਕੀ PEM ਬਲਾਕਾਂ ਅਤੇ base64 ਡਾਟਾ URLs।

ਸੈਨੀਟਾਈਜ਼ਰ ਇਨਪੁੱਟ ਦੀ ਲੰਬਾਈ ਨੂੰ ਸੀਮਿਤ ਕਰਦਾ ਹੈ ਅਤੇ ਜੇ ਸੁੱਟਿਆ ਗਿਆ ਮੁੱਲ ਸਟ੍ਰਿੰਗ ਕੋਅਰਸ਼ਨ ਨੂੰ ਅਸਵੀਕਾਰ ਕਰੇ ਤਾਂ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਬੰਦ ਹੋ ਜਾਂਦਾ ਹੈ।
ਰਿਕਰਸਿਵ ਅੱਪਸਟ੍ਰੀਮ JSON ਸੈਨੀਟਾਈਜ਼ੇਸ਼ਨ ਵੀ ਜਵਾਬ ਨੂੰ ਸੀਰੀਅਲਾਈਜ਼ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਅਸੁਰੱਖਿਅਤ ਕ੍ਰੈਡੈਂਸ਼ਲ/ਪਾਥ ਕੀਜ਼, ਸੈਸ਼ਨ ਉਪਨਾਮ ਅਤੇ ਪ੍ਰੋਟੋਟਾਈਪ-ਕੰਟਰੋਲ ਕੀਜ਼ ਹਟਾ ਦਿੰਦੀ ਹੈ।

## ਲਾਜ਼ਮੀ ਪੈਟਰਨ

### 1. ਗਲਤੀ ਜਵਾਬ ਬਣਾਉਣਾ (HTTP / API ਰੂਟਾਂ)

`buildErrorBody()` ਵਰਤੋ — ਸੈਨੀਟਾਈਜ਼ੇਸ਼ਨ ਪਹਿਲਾਂ ਤੋਂ ਸ਼ਾਮਲ ਹੈ:

```ts
import { buildErrorBody } from "@omniroute/open-sse/utils/error.ts";

export async function POST(req: Request) {
  try {
    // ... ਹੈਂਡਲਰ ਲੌਜਿਕ ...
  } catch (err) {
    return new Response(JSON.stringify(buildErrorBody(500, String(err))), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
```

ਜਾਂ, ਉਸੇ ਮੋਡੀਊਲ ਵਿੱਚ ਸੁਵਿਧਾਜਨਕ ਰੈਪਰਾਂ ਲਈ:

```ts
import {
  errorResponse, // ਇੱਕ-ਵਾਰ ਵਾਲਾ Response ਆਬਜੈਕਟ
  writeStreamError, // SSE ਰਾਈਟਰ
  createErrorResult, // { success: false, status, response, ... } ਆਕਾਰ
  unavailableResponse, // Retry-After ਜੋੜਦਾ ਹੈ
  providerCircuitOpenResponse,
  modelCooldownResponse,
} from "@omniroute/open-sse/utils/error.ts";
```

ਇਹ ਸਾਰੇ ਮਿਆਰੀ ਜਨਤਕ-ਗਲਤੀ ਸੀਮਾ ਲਾਗੂ ਕਰਦੇ ਹਨ। `errorResponse`, `writeStreamError`, ਅਤੇ
`createErrorResult`, `buildErrorBody` ਰਾਹੀਂ ਜਾਂਦੇ ਹਨ; ਤਿੰਨ ਵਿਸ਼ੇਸ਼ retry/circuit ਹੈਲਪਰ
ਆਪਣੇ ਜਨਤਕ ਸੰਦਰਭ ਨੂੰ ਸਿੱਧੇ ਤੌਰ 'ਤੇ ਪ੍ਰੋਜੈਕਟ ਅਤੇ ਸੈਨੀਟਾਈਜ਼ ਕਰਦੇ ਹਨ। ਇਨ੍ਹਾਂ ਹੈਲਪਰਾਂ ਦੀ ਵਰਤੋਂ ਕਰਦੇ ਸਮੇਂ **ਤੁਹਾਨੂੰ ਕਦੇ ਵੀ
`sanitizeErrorMessage` ਨੂੰ ਹੱਥੀਂ ਕਾਲ ਕਰਨ ਦੀ ਲੋੜ ਨਹੀਂ ਹੁੰਦੀ**।

### 2. ਕਸਟਮ ਗਲਤੀ ਐਨਵਲਪ (ਵਿਰਲੇ)

ਜਦੋਂ ਤੁਸੀਂ ਉਪਰੋਕਤ ਹੈਲਪਰਾਂ ਦੀ ਵਰਤੋਂ ਨਹੀਂ ਕਰ ਸਕਦੇ (ਜਿਵੇਂ ਕਿ ਜਵਾਬ ਦਾ ਆਕਾਰ Connect-RPC ਵਰਗੇ ਅੱਪਸਟ੍ਰੀਮ ਪ੍ਰੋਟੋਕੋਲ ਦੁਆਰਾ ਨਿਰਧਾਰਤ ਹੋਵੇ), ਤਾਂ `sanitizeErrorMessage` ਨੂੰ ਸਿੱਧਾ ਇੰਪੋਰਟ ਕਰੋ:

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

ਕਸਟਮ ਗਲਤੀ ਬਾਡੀ ਬਣਾਉਣ ਦਾ ਇਹੀ ਇੱਕ ਪ੍ਰਵਾਨਿਤ ਤਰੀਕਾ ਹੈ। ਸੰਦਰਭ ਇੰਪਲੀਮੈਂਟੇਸ਼ਨ ਲਈ `open-sse/executors/cursor.ts::buildErrorResponse` ਵੇਖੋ।

### 3. ਲੌਗਿੰਗ ਬਨਾਮ ਜਵਾਬ ਦੇਣਾ

ਭਰੋਸੇਯੋਗ ਅੰਦਰੂਨੀ ਐਕਸੈਪਸ਼ਨ ਆਪਣਾ ਪੂਰਾ ਸੁਨੇਹਾ ਅਤੇ ਸਟੈਕ ਰੱਖ ਸਕਦੇ ਹਨ ਤਾਂ ਜੋ ਓਪਰੇਟਰ ਡੀਬੱਗ ਕਰ ਸਕਣ। ਪ੍ਰੋਵਾਈਡਰ, ਵੈਲੀਡੇਸ਼ਨ, ਬ੍ਰਾਊਜ਼ਰ-ਸੈਸ਼ਨ ਜਾਂ ਕ੍ਰੈਡੈਂਸ਼ਲ-ਨਜ਼ਦੀਕੀ ਸੀਮਾਵਾਂ ਤੋਂ ਆਉਣ ਵਾਲੇ ਮੁੱਲਾਂ ਨੂੰ ਕੰਸੋਲ ਆਉਟਪੁੱਟ, ਆਡਿਟ ਮੈਟਾਡੇਟਾ ਜਾਂ ਸਥਾਈ ਕਾਲ ਲੌਗਾਂ ਵਿੱਚ ਜਾਣ ਤੋਂ ਪਹਿਲਾਂ ਸੈਨੀਟਾਈਜ਼ ਕੀਤਾ ਜਾਣਾ ਲਾਜ਼ਮੀ ਹੈ। ਪੈਟਰਨ:

```ts
try {
  // ...
} catch (err) {
  log.error({ err }, "handler failed"); // ਸਿਰਫ਼ ਭਰੋਸੇਯੋਗ ਅੰਦਰੂਨੀ ਐਕਸੈਪਸ਼ਨ
  return errorResponse(500, getErrorMessage(err)); // ਸੈਨੀਟਾਈਜ਼ ਕੀਤਾ ਹੋਇਆ — ਕਲਾਇੰਟ ਨੂੰ ਭੇਜਿਆ ਗਿਆ
}
```

ਪ੍ਰੋਵਾਈਡਰ-ਨਿਯੰਤਰਿਤ ਅਸਫਲਤਾਵਾਂ ਲਈ, ਲੌਗ ਕੀਤੇ ਮੁੱਲ ਨੂੰ ਵੀ ਪ੍ਰੋਜੈਕਟ ਕਰੋ:

```ts
log.error({ message: sanitizeErrorMessage(err) || "Provider request failed" });
```

### 4. ਮਨਾਹੀ ਕੀਤੇ ਪੈਟਰਨ

❌ **ਕਦੇ ਵੀ** ਕੱਚਾ ਐਕਸੈਪਸ਼ਨ ਆਉਟਪੁੱਟ Response ਬਾਡੀ ਵਿੱਚ ਨਾ ਪਾਓ:

```ts
// ਮਾੜਾ: ਸਟੈਕ ਟ੍ਰੇਸ + ਫ਼ਾਈਲ ਪਾਥ ਕਲਾਇੰਟ ਤੱਕ ਪਹੁੰਚਦੇ ਹਨ
return new Response(JSON.stringify({ error: { message: err.stack || err.message } }), {
  status: 500,
});
```

❌ **ਕਦੇ ਵੀ** ਆਪਣਾ ਪਹਿਲੀ-ਲਾਈਨ ਸਪਲਿਟਰ ਨਾ ਬਣਾਓ:

```ts
// ਮਾੜਾ: ਐਬਸੋਲਿਊਟ ਪਾਥ ਹਟਾਉਣੇ ਭੁੱਲ ਜਾਂਦਾ ਹੈ, ਮਿਆਰੀ ਹੈਲਪਰ ਤੋਂ ਵੱਖ ਹੋ ਸਕਦਾ ਹੈ
const safe = String(err).split("\n")[0];
```

❌ **ਕਦੇ ਵੀ** ਰੂਟ ਵਿੱਚ ਸੈਨੀਟਾਈਜ਼ ਕਰਕੇ SSE ਪਾਥ ਨੂੰ ਨਾ ਭੁੱਲੋ। ਸਟ੍ਰੀਮ ਵਿੱਚ ਲਿਖੀ ਜਾਣ ਵਾਲੀ ਹਰ ਚੀਜ਼ `writeStreamError` (ਜਾਂ ਇਸਦੇ ਅਧਾਰਭੂਤ `buildErrorBody`) ਰਾਹੀਂ ਜਾਂਦੀ ਹੈ।

❌ **ਕਦੇ ਵੀ** ਜਾਣਬੁੱਝ ਕੇ `process.cwd()`, `__filename`, `__dirname`, ਜਾਂ env ਤੋਂ ਪ੍ਰਾਪਤ ਪਾਥਾਂ ਨੂੰ
ਗਲਤੀ ਸੁਨੇਹਿਆਂ ਵਿੱਚ ਸ਼ਾਮਲ ਨਾ ਕਰੋ। ਸੈਨੀਟਾਈਜ਼ਰ ਗਹਿਰਾਈ ਵਿੱਚ ਰੱਖਿਆ ਵਜੋਂ ਐਬਸੋਲਿਊਟ ਪਾਥਾਂ ਨੂੰ ਕਵਰ ਕਰਦਾ ਹੈ, ਪਰ ਕਾਲਰਾਂ ਨੂੰ
ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਟੋਪੋਲੋਜੀ ਪ੍ਰਗਟ ਕਰਨ ਵਾਲੇ ਸੁਨੇਹੇ ਬਣਾਉਣੇ ਹੀ ਨਹੀਂ ਚਾਹੀਦੇ।

## CI ਵਿੱਚ ਕਵਰੇਜ

`tests/unit/error-message-sanitization.test.ts` ਇਹ ਲਾਗੂ ਕਰਦੀ ਹੈ:

- `/api/model-combo-mappings/*` ਅਧੀਨ ਹਰ ਰੂਟ 4xx/5xx ਉੱਤੇ ਸੈਨੀਟਾਈਜ਼ ਕੀਤੀਆਂ ਬਾਡੀਆਂ ਵਾਪਸ ਕਰਦਾ ਹੈ।
- `sanitizeErrorMessage` ਬਹੁ-ਲਾਈਨ ਸਟੈਕ ਟ੍ਰੇਸਾਂ ਨੂੰ ਹਟਾਉਂਦਾ ਹੈ।
- `sanitizeErrorMessage` POSIX ਅਤੇ Windows ਦੇ ਐਬਸੋਲਿਊਟ ਪਾਥਾਂ ਨੂੰ `<path>` ਨਾਲ ਬਦਲਦਾ ਹੈ।
- `sanitizeErrorMessage` `null`/`undefined`/`Error` ਇੰਸਟੈਂਸ ਇਨਪੁੱਟਾਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਸੰਭਾਲਦਾ ਹੈ।
- `buildErrorBody` ਆਪਣੇ `message` ਫੀਲਡ ਵਿੱਚ ਕਦੇ ਵੀ ਸਟੈਕ ਟ੍ਰੇਸ ਪ੍ਰਗਟ ਨਹੀਂ ਕਰਦਾ।

ਕੋਈ ਨਵਾਂ ਰੂਟ ਜਾਂ ਐਗਜ਼ਿਕਿਊਟਰ ਜੋੜਦੇ ਸਮੇਂ, ਇਸ ਫਾਈਲ ਤੋਂ ਅਸਰਸ਼ਨ ਪੈਟਰਨ ਕਾਪੀ ਕਰੋ। ਕਵਰੇਜ ਗੇਟ (`npm run test:coverage`) ≥60% ਸਟੇਟਮੈਂਟਾਂ/ਲਾਈਨਾਂ/ਫੰਕਸ਼ਨਾਂ/ਬ੍ਰਾਂਚਾਂ ਨੂੰ ਲਾਗੂ ਕਰਦਾ ਹੈ — ਐਰਰ ਪਾਥ ਕਵਰ ਕੀਤੇ ਜਾਣੇ ਲਾਜ਼ਮੀ ਹਨ।

## ਸੰਬੰਧਿਤ ਕੰਟਰੋਲ

- `.github/security` ਵਿੱਚ `js/stack-trace-exposure` CodeQL ਅਲਰਟਾਂ ਨੂੰ ਹਮੇਸ਼ਾ **ਜਾਂ ਤਾਂ** ਇਨ੍ਹਾਂ ਹੈਲਪਰਾਂ ਰਾਹੀਂ ਠੀਕ ਕੀਤਾ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ **ਜਾਂ** ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਹਵਾਲਾ ਦੇਣ ਵਾਲੀ ਟਿੱਪਣੀ ਨਾਲ ਖਾਰਜ ਕੀਤਾ ਜਾਣਾ ਚਾਹੀਦਾ ਹੈ।
- `pino` ਰੀਡੈਕਸ਼ਨ ਕੌਂਫਿਗ (`src/shared/utils/logRedaction.ts`) ਭਰੋਸੇਯੋਗ ਸਟ੍ਰਕਚਰਡ ਲੌਗਾਂ ਨੂੰ
  ਵੱਖਰੇ ਤੌਰ 'ਤੇ ਸੰਭਾਲਦੀ ਹੈ। ਇਹ ਦਸਤਾਵੇਜ਼ ਜਨਤਕ ਰਿਸਪਾਂਸ ਸੁਨੇਹਿਆਂ ਅਤੇ ਪ੍ਰੋਵਾਈਡਰ-ਨਿਯੰਤਰਿਤ ਮੁੱਲਾਂ ਨੂੰ ਕਵਰ ਕਰਦਾ ਹੈ ਜੋ
  ਸਥਾਈ ਕਾਲ/ਪ੍ਰੌਕਸੀ-ਲੌਗ ਸੀਮਾਵਾਂ ਨੂੰ ਪਾਰ ਕਰਦੇ ਹਨ।
- ਅੱਪਸਟ੍ਰੀਮ-ਹੈਡਰ ਡਿਨਾਈਲਿਸਟ (`src/shared/constants/upstreamHeaders.ts`) ਹੈਡਰ ਲੀਕੇਜ ਨੂੰ ਕਵਰ ਕਰਦੀ ਹੈ — ਨਵੀਂ ਐਕਸਫਿਲਟ੍ਰੇਸ਼ਨ ਚਿੰਤਾ ਜੋੜਦੇ ਸਮੇਂ ਦੋਵੇਂ ਫਾਈਲਾਂ ਨੂੰ ਇਕਸਾਰ ਰੱਖੋ।

## ਅੱਪਸਟ੍ਰੀਮ ਵੇਰਵਿਆਂ ਦਾ ਪਾਸਥਰੂ

`buildErrorBody` ਇੱਕ ਵਿਕਲਪਿਕ ਤੀਜੀ ਆਰਗੂਮੈਂਟ `upstreamDetails` (ਅੱਪਸਟ੍ਰੀਮ
ਪ੍ਰੋਵਾਈਡਰ ਤੋਂ ਕੱਚੀ ਪਾਰਸ ਕੀਤੀ ਬਾਡੀ) ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ। ਜਦੋਂ ਇਹ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ, ਤਾਂ ਰਿਸਪਾਂਸ ਵਿੱਚ `upstream_details`
ਵਜੋਂ ਸ਼ਾਮਲ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਇਸ ਨੂੰ `sanitizeUpstreamDetails` ਰਾਹੀਂ ਸੈਨੀਟਾਈਜ਼ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

ਇੱਕ ਵਿਕਲਪਿਕ ਚੌਥੀ ਆਰਗੂਮੈਂਟ `classification`
(`{ type?: string; code?: string; reason?: string }`) ਇੱਕ ਸਪਸ਼ਟ ਜਨਤਕ ਵਰਗੀਕਰਨ ਸਵੀਕਾਰ ਕਰਦੀ ਹੈ।
ਹਰ ਫੀਲਡ ਨੂੰ ਸੀਮਿਤ ਜਨਤਕ-ਪਛਾਣਕਰਤਾ ਸ਼ਬਦਾਵਲੀ ਉੱਤੇ ਪ੍ਰੋਜੈਕਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਅਸੁਰੱਖਿਅਤ, ਕ੍ਰੈਡੈਂਸ਼ਲ-ਆਕਾਰ ਵਾਲੇ,
ਕੰਟਰੋਲ-ਕਰੈਕਟਰ ਵਾਲੇ, ਜਾਂ ਬਹੁਤ ਲੰਬੇ ਮੁੱਲ ਸਟੇਟਸ ਤੋਂ ਪ੍ਰਾਪਤ type/code ਉੱਤੇ ਵਾਪਸ ਆ ਜਾਂਦੇ ਹਨ; ਇੱਕ ਅਸੁਰੱਖਿਅਤ ਵਿਕਲਪਿਕ
reason ਨੂੰ ਛੱਡ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ। ਤਿੰਨ-ਅੰਕੀ HTTP ਸਟੇਟਸ ਪਛਾਣਕਰਤਾ (`100` ਤੋਂ `599` ਤੱਕ) ਉਹਨਾਂ
ਪ੍ਰੋਵਾਈਡਰ ਕਾਂਟ੍ਰੈਕਟਾਂ ਲਈ ਵੈਧ ਰਹਿੰਦੇ ਹਨ ਜੋ ਸੰਖਿਆਤਮਕ ਅੱਪਸਟ੍ਰੀਮ ਸਟੇਟਸ ਨੂੰ ਮਸ਼ੀਨ-ਪਾਠਯੋਗ ਕੋਡ ਵਜੋਂ ਪ੍ਰਗਟ ਕਰਦੇ ਹਨ। ਇਹੀ
ਸੀਮਿਤ ਰੇਂਜ ਸਥਾਨਕ ਤੌਰ 'ਤੇ ਤਿਆਰ ਕੀਤੇ HTTP-ਸਟੇਟਸ ਪਲੇਸਹੋਲਡਰ ਰੂਪ ਵਿੱਚ ਸਵੀਕਾਰ ਕੀਤੀ ਜਾਂਦੀ ਹੈ; ਮਨਮਾਨੇ ਪ੍ਰੋਵਾਈਡਰ
ਨੰਬਰ ਅਤੇ ਨਾਮ ਸ਼ਬਦਾਵਲੀ ਤੋਂ ਬਾਹਰ ਰਹਿੰਦੇ ਹਨ।

ਹਰ ਸਪਸ਼ਟ ਵਰਗੀਕਰਨ ਨੂੰ ਉਸ ਚੌਥੀ ਆਰਗੂਮੈਂਟ ਵਿੱਚ ਪਾਸ ਕਰੋ। `buildErrorBody()` ਦੇ ਵਾਪਸ ਆਉਣ ਤੋਂ ਬਾਅਦ ਕਦੇ ਵੀ
`body.error.code`, `body.error.type`, ਜਾਂ `body.error.reason` ਨੂੰ ਓਵਰਰਾਈਟ ਨਾ ਕਰੋ;
ਬਿਲਡਰ ਤੋਂ ਬਾਅਦ ਦੀ ਮਿਊਟੇਸ਼ਨ ਜਨਤਕ ਪ੍ਰੋਜੈਕਸ਼ਨ ਨੂੰ ਬਾਈਪਾਸ ਕਰਦੀ ਹੈ।

`upstreamDetails` ਉੱਤੇ ਲਾਗੂ ਕੀਤੇ ਸੈਨੀਟਾਈਜ਼ੇਸ਼ਨ ਨਿਯਮ:

1. ਸਟਰਿੰਗ ਲੀਫ਼: `sanitizeErrorMessage` ਰਾਹੀਂ ਚਲਾਓ (ਸਟੈਕਾਂ + ਐਬਸੋਲਿਊਟ ਪਾਥਾਂ ਨੂੰ ਹਟਾਉਂਦਾ ਹੈ)।
2. ਅਸੁਰੱਖਿਅਤ ਪਾਥ, ਕ੍ਰੈਡੈਂਸ਼ਲ, ਸੈਸ਼ਨ-ਉਪਨਾਮ, ਅਤੇ ਪ੍ਰੋਟੋਟਾਈਪ-ਕੰਟਰੋਲ ਕੀਜ਼ ਹਟਾ ਦਿੱਤੀਆਂ ਜਾਂਦੀਆਂ ਹਨ।
3. ਡੈਪਥ ਕੈਪ: 4 ਪੱਧਰਾਂ ਤੋਂ ਅੱਗੇ ਦੀ ਨੇਸਟਿੰਗ ਨੂੰ ਸਟਰਿੰਗ `"[truncated]"` ਨਾਲ ਬਦਲਿਆ ਜਾਂਦਾ ਹੈ।
4. ਐਰੇਆਂ ਨੂੰ 32 ਐਲੀਮੈਂਟਾਂ ਤੱਕ ਸੀਮਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।

ਕੇਵਲ ਉਹਨਾਂ ਕਾਲ ਸਾਈਟਾਂ ਨੂੰ `upstreamDetails` ਪਾਸ ਕਰਨਾ ਚਾਹੀਦਾ ਹੈ ਜਿਨ੍ਹਾਂ ਕੋਲ ਪਾਰਸ ਕੀਤੀ ਪ੍ਰੋਵਾਈਡਰ ਐਰਰ ਬਾਡੀ ਹੈ। ਅੰਦਰੂਨੀ OmniRoute
ਐਰਰਾਂ (SSE ਪਾਰਸ ਅਸਫਲਤਾਵਾਂ, ਖਾਲੀ ਸਮੱਗਰੀ, ਗਾਰਡਰੇਲ ਬਲੌਕਾਂ) ਵਿੱਚ ਇਹ ਸ਼ਾਮਲ ਨਹੀਂ ਹੋਣਾ ਚਾਹੀਦਾ।

ਕੱਚੇ `err.stack`, `err.message`, ਜਾਂ ਕਿਸੇ ਰਨਟਾਈਮ ਐਕਸੈਪਸ਼ਨ ਤੋਂ ਕਿਸੇ ਵੀ ਸਟਰਿੰਗ ਨੂੰ
`upstreamDetails` ਵਿੱਚ ਪਾਸ **ਨਾ** ਕਰੋ। ਉਹਨਾਂ ਨੂੰ ਅਜੇ ਵੀ ਅੱਪਸਟ੍ਰੀਮ ਬਾਡੀ ਤੋਂ ਬਿਨਾਂ
`errorResponse` / `buildErrorBody(code, msg)` ਰਾਹੀਂ ਜਾਣਾ ਲਾਜ਼ਮੀ ਹੈ।

ਚੋਣਵਾਂ ਅੱਪਸਟ੍ਰੀਮ 4xx ਪਾਸਥਰੂ ਕਲਾਇੰਟ ਆਟੋ-ਰਿਕਵਰੀ ਲਈ ਲੋੜੀਂਦੀ ਪ੍ਰੋਵਾਈਡਰ ਦੀ ਸੁਰੱਖਿਅਤ JSON ਬਣਤਰ ਅਤੇ ਸ਼ਬਦਾਵਲੀ ਨੂੰ ਸੁਰੱਖਿਅਤ ਰੱਖਦਾ ਹੈ,
ਪਰ ਇਹ ਬਾਈਟ-ਦਰ-ਬਾਈਟ ਪਾਸਥਰੂ ਨਹੀਂ ਹੈ: ਰਿਕਰਸਿਵ ਸੈਨੀਟਾਈਜ਼ਰ ਹਮੇਸ਼ਾ ਸੀਰੀਅਲਾਈਜ਼ੇਸ਼ਨ ਤੋਂ ਪਹਿਲਾਂ ਚੱਲਦਾ ਹੈ।
ਸਾਈਕਲਿਕ, BigInt ਵਾਲੀਆਂ, ਜਾਂ ਵਿਰੋਧੀ `toJSON()` ਬਾਡੀਆਂ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਅਸਫਲ ਹੋ ਜਾਂਦੀਆਂ ਹਨ ਅਤੇ
ਪਾਸਥਰੂ ਲਈ ਯੋਗ ਨਹੀਂ ਹੁੰਦੀਆਂ। OCR ਅਤੇ ਮਾਡਰੇਸ਼ਨ ਉੱਤੇ ਵੀ ਇਹੀ ਨਿਯਮ ਲਾਗੂ ਹੁੰਦਾ ਹੈ; ਗੈਰ-JSON, ਖਾਲੀ, ਜਾਂ ਗਲਤ-ਲੇਬਲ ਕੀਤੀਆਂ
ਅੱਪਸਟ੍ਰੀਮ ਬਾਡੀਆਂ ਨੂੰ ਕੈਨੋਨਿਕਲ OmniRoute JSON ਐਰਰ ਐਨਵਲਪ ਵਿੱਚ ਬਦਲ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ।

## ਜਾਣੀ-ਪਛਾਣੀ CodeQL ਸੀਮਾ: ਕਸਟਮ ਸੈਨਿਟਾਈਜ਼ਰ ਪਛਾਣੇ ਨਹੀਂ ਜਾਂਦੇ

CodeQL ਕਵੇਰੀ [`js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/) ਸੈਨਿਟਾਈਜ਼ਰ ਪੈਟਰਨਾਂ ਦੀ ਇੱਕ ਨਿਸ਼ਚਿਤ ਅਲਾਊਲਿਸਟ ਵਰਤਦੀ ਹੈ (ਉਦਾਹਰਨ ਲਈ, ਇਨਲਾਈਨ `.split("\n")[0]`, ਖ਼ਾਸ regex ਬਣਤਰਾਂ ਨਾਲ `String#replace`, ਅਤੇ `Error` ਉੱਤੇ `.message` ਤੱਕ ਪਹੁੰਚ)। ਇਹ ਸਾਡੇ `sanitizeErrorMessage()` ਵਰਗੇ ਕਸਟਮ ਹੈਲਪਰ ਰਾਹੀਂ ਕੀਤੀ ਗਈ ਅਪਰੋਕਸ਼ ਪ੍ਰਕਿਰਿਆ ਨੂੰ **ਨਹੀਂ** ਪਛਾਣਦੀ।

ਇਸਦਾ ਮਤਲਬ ਹੈ ਕਿ ਇਸ ਮੋਡੀਊਲ ਰਾਹੀਂ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਸੈਨਿਟਾਈਜ਼ ਕਰਨ ਵਾਲੀਆਂ ਕਾਲਸਾਈਟਾਂ — ਉਦਾਹਰਨ ਲਈ `open-sse/utils/error.ts::errorResponse` ਅਤੇ `open-sse/executors/cursor.ts::buildErrorResponse` — ਕੋਡ ਦੇ ਕਾਰਜਾਤਮਕ ਤੌਰ 'ਤੇ ਸੁਰੱਖਿਅਤ ਹੋਣ ਦੇ ਬਾਵਜੂਦ ਵੀ ਚੇਤਾਵਨੀ ਜਾਰੀ ਰੱਖ ਸਕਦੀਆਂ ਹਨ। ਪਿਛਲੀਆਂ ਖਾਰਜਗੀਆਂ: `#224`, `#231` (ਮਈ 2026), ਦੋਵੇਂ ਤਕਨੀਕੀ ਤਰਕ ਸਮੇਤ `false positive` ਵਜੋਂ ਚਿੰਨ੍ਹਿਤ ਹਨ।

**ਨਵੀਂ ਘਟਨਾ ਨੂੰ ਕਿਵੇਂ ਸੰਭਾਲਣਾ ਹੈ:**

1. ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ ਕਾਲਸਾਈਟ ਵਾਸਤਵ ਵਿੱਚ ਸੁਨੇਹੇ ਨੂੰ `sanitizeErrorMessage` / `buildErrorBody` / ਉੱਪਰ ਦਸਤਾਵੇਜ਼ਬੱਧ ਰੈਪਰਾਂ ਵਿੱਚੋਂ ਕਿਸੇ ਇੱਕ ਰਾਹੀਂ ਭੇਜਦੀ ਹੈ (ਕਾਲ ਚੇਨ ਨੂੰ ਸ਼ੁਰੂ ਤੋਂ ਅੰਤ ਤੱਕ ਪੜ੍ਹੋ — ਕਿਸੇ ਟਿੱਪਣੀ 'ਤੇ ਭਰੋਸਾ ਨਾ ਕਰੋ)।
2. ਪੁਸ਼ਟੀ ਕਰੋ ਕਿ `tests/unit/error-message-sanitization.test.ts` ਉਸ ਪਾਥ ਦੀ ਜਾਂਚ ਕਰਦੀ ਹੈ (ਜਾਂ ਕਵਰੇਜ ਸ਼ਾਮਲ ਕਰੋ)।
3. ਇਸ ਦਸਤਾਵੇਜ਼ ਦਾ ਹਵਾਲਾ ਦਿੰਦਿਆਂ `gh api ... -X PATCH state=dismissed -f 'dismissed_reason=false positive'` ਰਾਹੀਂ ਚੇਤਾਵਨੀ ਖਾਰਜ ਕਰੋ।
4. ਹਰ ਥਾਂ `.split("\n")[0]` ਨੂੰ ਇਨਲਾਈਨ ਕਰਕੇ ਇਸਨੂੰ "ਠੀਕ" **ਨਾ** ਕਰੋ — ਹੈਲਪਰ ਹੀ ਸੱਚਾਈ ਦਾ ਇਕਮਾਤਰ ਸਰੋਤ ਹੈ; ਸਕੈਨਰ ਨੂੰ ਸੰਤੁਸ਼ਟ ਕਰਨ ਦੀ ਦਿੱਖ ਲਈ ਪੈਟਰਨ ਦੀ ਨਕਲ ਕਰਨਾ ਸੈਨਿਟਾਈਜ਼ਰ ਨੂੰ ਕਮਜ਼ੋਰ ਕਰਦਾ ਹੈ (ਪਾਥ ਸਕ੍ਰਬਿੰਗ, ਲੰਬਾਈ ਸੀਮਾ ਅਤੇ ਟਾਈਪ ਕੋਅਰਸ਼ਨ ਖਤਮ ਹੋ ਜਾਂਦੇ ਹਨ)।

CodeQL ਦੀ [`@codeql/javascript-models` ਕਸਟਮ ਸੈਨਿਟਾਈਜ਼ਰ ਕਨਫਿਗਰੇਸ਼ਨ](https://codeql.github.com/docs/codeql-language-guides/customizing-library-models-for-javascript/) ਵਰਗੀਆਂ ਆਪਟ-ਇਨ ਵਿਸ਼ੇਸ਼ਤਾਵਾਂ ਅਪਣਾਉਣਾ ਲੰਬੇ ਸਮੇਂ ਦਾ ਹੱਲ ਹੈ; ਇਹ ਇਸ ਦਸਤਾਵੇਜ਼ ਦੇ ਦਾਇਰੇ ਤੋਂ ਬਾਹਰ ਹੈ।

## ਹਵਾਲੇ

- [CWE-209: ਗਲਤੀ ਸੁਨੇਹੇ ਰਾਹੀਂ ਜਾਣਕਾਰੀ ਦਾ ਪਰਦਾਫਾਸ਼](https://cwe.mitre.org/data/definitions/209.html)
- [CodeQL `js/stack-trace-exposure`](https://codeql.github.com/codeql-query-help/javascript/js-stack-trace-exposure/)
- [OWASP: ਗਲਤੀ ਸੰਭਾਲ ਚੀਟ ਸ਼ੀਟ](https://cheatsheetseries.owasp.org/cheatsheets/Error_Handling_Cheat_Sheet.html)
- ਹੈਲਪਰ ਨੂੰ ਕੇਂਦਰੀਕ੍ਰਿਤ ਕਰਨ ਵਾਲੀ ਕਮਿਟ: `1a39c31f` — _fix(security): ਜਨਤਕ ਅੱਪਸਟ੍ਰੀਮ ਕਰੈਡੈਂਸ਼ਲਾਂ ਨੂੰ ਲੁਕਾਓ + ਗਲਤੀ ਸੈਨਿਟਾਈਜ਼ੇਸ਼ਨ ਨੂੰ ਕੇਂਦਰੀਕ੍ਰਿਤ ਕਰੋ_
