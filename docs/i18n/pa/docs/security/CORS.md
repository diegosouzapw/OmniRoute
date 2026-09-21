# CORS Configuration & Security (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇮🇳 [kn](../../../kn/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ਇਹ ਨਿਯੰਤਰਿਤ ਕਰਦਾ ਹੈ ਕਿ ਕਿਹੜੇ **ਬ੍ਰਾਊਜ਼ਰ ਮੂਲ (origins)** ਇੱਕ ਇਕੱਲੀ, ਕੇਂਦਰੀਕ੍ਰਿਤ ਮਨਜ਼ੂਰ-ਸੂਚੀ ਤੋਂ ਕ੍ਰਾਸ-ਓਰਿਜਨ ਜਵਾਬ ਪੜ੍ਹ ਸਕਦੇ ਹਨ। ਇਹ ਮਾਡਲ **ਮੂਲ ਰੂਪ ਵਿੱਚ ਫੇਲ-ਕਲੋਜ਼ਡ** ਹੈ:
ਜਦੋਂ ਤੱਕ ਤੁਸੀਂ ਕਿਸੇ ਮੂਲ ਨੂੰ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਸ਼ਾਮਲ ਨਹੀਂ ਕਰਦੇ, ਕੋਈ ਵੀ ਮੂਲ ਮਨਜ਼ੂਰ ਨਹੀਂ ਹੁੰਦਾ। ਇਹ ਪੰਨਾ ਦਰਸਾਉਂਦਾ ਹੈ ਕਿ ਮਨਜ਼ੂਰ-ਸੂਚੀ ਕਿਵੇਂ ਨਿਰਧਾਰਤ ਹੁੰਦੀ ਹੈ, `CORS_ALLOW_ALL=true` ਅਸਲ ਵਿੱਚ ਕੀ ਉਘਾੜਦਾ ਹੈ (ਅਤੇ, ਮਹੱਤਵਪੂਰਨ ਤੌਰ 'ਤੇ, ਕੀ **ਨਹੀਂ** ਉਘਾੜਦਾ), ਵਿਕਾਸ ਬਨਾਮ ਪ੍ਰੋਡਕਸ਼ਨ ਨੂੰ ਸੁਰੱਖਿਅਤ ਢੰਗ ਨਾਲ ਕਿਵੇਂ ਸੰਰਚਿਤ ਕਰਨਾ ਹੈ, ਅਤੇ ਵਾਈਲਡਕਾਰਡ ਸਰਗਰਮ ਹੋਣ 'ਤੇ ਡੈਸ਼ਬੋਰਡ ਕਿਹੜੀ ਰਨਟਾਈਮ ਚੇਤਾਵਨੀ ਦਿਖਾਉਂਦਾ ਹੈ।

**ਪ੍ਰਮਾਣਿਕ ਸਰੋਤ:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`)। ਮਨਜ਼ੂਰ-ਸੂਚੀ ਮਿਡਲਵੇਅਰ (`src/server/authz/pipeline.ts`) ਵਿੱਚ ਸਿਰਫ਼ ਇੱਕ ਵਾਰ ਲਾਗੂ ਕੀਤੀ ਜਾਂਦੀ ਹੈ — ਹਰ ਰੂਟ ਦੇ ਹੈਂਡਲਰ ਆਪਣੇ ਆਪ
`Access-Control-Allow-Origin` ਸੈੱਟ ਨਹੀਂ ਕਰਦੇ।

## ਮੂਲ ਕਿਵੇਂ ਨਿਰਧਾਰਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ

ਹਰ ਬੇਨਤੀ ਲਈ ਮਿਡਲਵੇਅਰ ਇਸ ਕ੍ਰਮ ਵਿੱਚ `Access-Control-Allow-Origin` ਦਾ ਮੁੱਲ ਗਿਣਦਾ ਹੈ:

1. **`CORS_ALLOW_ALL=true`** (ਜਾਂ ਪੁਰਾਣਾ `CORS_ORIGIN=*`) → ਕਾਲਰ ਦਾ
   `Origin` ਵਾਪਸ ਈਕੋ ਕਰੋ (ਜਾਂ `Origin` ਹੈਡਰ ਨਾ ਹੋਣ 'ਤੇ `*`), ਅਤੇ `Vary: Origin`
   ਸ਼ਾਮਲ ਕਰੋ ਤਾਂ ਜੋ ਕੈਸ਼ ਸਹੀ ਰਹਿਣ। ਇਹੋ `applyCorsHeaders()` ਚੋਕਪੁਆਇੰਟ ਟੋਕਨ-ਪ੍ਰਮਾਣਿਤ
   `/v1*`/`/v1beta*` ਸਰਫੇਸ ਉੱਤੇ ਹਰ ਬਾਡੀ ਵਾਲੇ 2xx ਜਵਾਬ ਵਿੱਚ
   `Vary: Accept-Encoding` ਵੀ ਜੋੜਦਾ ਹੈ (`relaxForTokenAuth`, RFC 9110 §12.5.5, ਮੁੱਦਾ #6737), ਤਾਂ ਜੋ
   ਡਾਊਨਸਟ੍ਰੀਮ/ਸਾਂਝੇ ਕੈਸ਼ ਸੰਕੁਚਿਤ ਅਤੇ ਅਸੰਕੁਚਿਤ ਰੂਪਾਂ ਵਿਚਕਾਰ ਸਹੀ ਢੰਗ ਨਾਲ ਫ਼ਰਕ ਕਰ ਸਕਣ।
2. ਨਹੀਂ ਤਾਂ, ਬੇਨਤੀ ਦੇ `Origin` ਨੂੰ ਸਧਾਰਨ ਰੂਪ ਦਿੱਤਾ ਜਾਂਦਾ ਹੈ (ਛੋਟੇ ਅੱਖਰਾਂ ਵਿੱਚ ਬਦਲ ਕੇ, ਅੰਤਲੀ ਸਲੈਸ਼ ਹਟਾ ਕੇ) ਅਤੇ **ਵਿਲੀਨ ਕੀਤੀ ਮਨਜ਼ੂਰ-ਸੂਚੀ** ਨਾਲ ਮਿਲਾਇਆ ਜਾਂਦਾ ਹੈ:
   - env **`CORS_ALLOWED_ORIGINS`** — ਕਾਮਿਆਂ ਨਾਲ ਵੱਖ ਕੀਤੀ ਸੂਚੀ, ਅਤੇ
   - ਰਨਟਾਈਮ **`corsOrigins`** ਸੈਟਿੰਗ (ਡੈਸ਼ਬੋਰਡ → ਸੁਰੱਖਿਆ → _CORS ਮਨਜ਼ੂਰਸ਼ੁਦਾ
     ਮੂਲ_), ਜੋ `src/lib/config/runtimeSettings.ts` ਤੋਂ
     `setRuntimeAllowedOrigins()` ਰਾਹੀਂ ਇੰਜੈਕਟ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।
3. ਕੋਈ ਮੇਲ ਨਹੀਂ → **ਕੋਈ `Access-Control-Allow-Origin` ਹੈਡਰ ਨਹੀਂ ਭੇਜਿਆ ਜਾਂਦਾ**। ਬ੍ਰਾਊਜ਼ਰ
   ਕ੍ਰਾਸ-ਓਰਿਜਨ ਪੜ੍ਹਨ ਨੂੰ ਬਲੌਕ ਕਰਦਾ ਹੈ। ਇਹੀ ਉਦੇਸ਼ਿਤ ਫੇਲ-ਕਲੋਜ਼ਡ ਮੂਲ ਵਿਹਾਰ ਹੈ।

| Env var                | ਅਰਥ                                                                                            |
| ---------------------- | ---------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | ਮਨਜ਼ੂਰ ਕੀਤੇ ਜਾਣ ਵਾਲੇ ਬਿਲਕੁਲ ਸਹੀ ਮੂਲਾਂ ਦੀ CSV ਸੂਚੀ (ਸਿਫ਼ਾਰਸ਼ੀ)।                                 |
| `CORS_ALLOW_ALL`       | `true`/`1` → ਕਿਸੇ ਵੀ ਮੂਲ ਨੂੰ ਈਕੋ ਕਰੋ (ਵਾਈਲਡਕਾਰਡ)। ਸਿਰਫ਼ ਵਿਕਾਸ ਲਈ।                              |
| `CORS_ORIGIN`          | ਪੁਰਾਣਾ। `*` ਦਾ ਵਿਹਾਰ `CORS_ALLOW_ALL` ਵਰਗਾ ਹੈ; ਇੱਕ ਇਕੱਲਾ ਮੁੱਲ ਮਨਜ਼ੂਰ-ਸੂਚੀ ਵਿੱਚ ਜੋੜਿਆ ਜਾਂਦਾ ਹੈ। |

## ਖ਼ਤਰਾ ਮਾਡਲ — `CORS_ALLOW_ALL=true` ਅਸਲ ਵਿੱਚ ਕੀ ਉਘਾੜਦਾ ਹੈ

ਆਮ OWASP ਚੇਤਾਵਨੀ ("ਵਾਈਲਡਕਾਰਡ CORS = ਕੋਈ ਵੀ ਸਾਈਟ ਤੁਹਾਡੇ API ਨੂੰ ਕਾਲ ਕਰ ਸਕਦੀ ਹੈ") ਨੂੰ ਗੰਭੀਰਤਾ ਨਾਲ ਲੈਣਾ ਚਾਹੀਦਾ ਹੈ, ਪਰ OmniRoute ਦਾ ਐਕਸਪੋਜ਼ਰ **ਆਮ ਮਾਮਲੇ ਨਾਲੋਂ ਵਧੇਰੇ ਸੀਮਤ** ਹੈ, ਕਿਉਂਕਿ ਲਾਗੂਕਰਨ ਨਾਲ ਸੰਬੰਧਿਤ ਇੱਕ ਠੋਸ ਤੱਥ ਹੈ:

> **ਕੇਂਦਰੀ `applyCorsHeaders()` ਕਦੇ ਵੀ
> `Access-Control-Allow-Credentials` ਨਹੀਂ ਭੇਜਦਾ।** ਕੋਈ ਬ੍ਰਾਊਜ਼ਰ _ਕ੍ਰੈਡੈਂਸ਼ਲ-ਯੁਕਤ_
> (ਕੁਕੀ ਵਾਲਾ) ਕ੍ਰਾਸ-ਓਰਿਜਨ ਜਵਾਬ ਤਦ ਤੱਕ ਉਪਲਬਧ ਨਹੀਂ ਕਰੇਗਾ, ਜਦੋਂ ਤੱਕ ਸਰਵਰ
> `Access-Control-Allow-Credentials: true` ਨਾ ਭੇਜੇ। OmniRoute ਦਾ ਸਾਂਝਾ CORS ਪਾਥ ਅਜਿਹਾ ਕਦੇ
> ਨਹੀਂ ਕਰਦਾ।

`CORS_ALLOW_ALL=true` ਦੇ ਨਾਲ ਵੀ, ਹਰ ਸਰਫੇਸ ਲਈ ਇਸਦਾ ਅਰਥ ਇਹ ਹੈ:

| ਸਰਫੇਸ                               | ਪ੍ਰਮਾਣੀਕਰਨ ਵਿਧੀ           | ਵਾਈਲਡਕਾਰਡ CORS ਦਾ ਪ੍ਰਭਾਵ                                                                                                                                                                                                              |
| ----------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ਡੈਸ਼ਬੋਰਡ / MANAGEMENT `/api/*`      | ਕੁਕੀ ਸੈਸ਼ਨ                | ਮੂਲ ਈਕੋ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਪਰ **`Allow-Credentials` ਤੋਂ ਬਿਨਾਂ** ਬ੍ਰਾਊਜ਼ਰ ਕ੍ਰੈਡੈਂਸ਼ਲ-ਯੁਕਤ ਪੜ੍ਹਨ ਨੂੰ **ਬਲੌਕ** ਕਰਦਾ ਹੈ। ਕੋਈ ਖ਼ਤਰਨਾਕ ਕ੍ਰਾਸ-ਓਰਿਜਨ ਸਾਈਟ ਤੁਹਾਡੇ ਪ੍ਰਮਾਣਿਤ ਡੈਸ਼ਬੋਰਡ ਜਵਾਬਾਂ ਨੂੰ **ਨਹੀਂ ਪੜ੍ਹ ਸਕਦੀ**, ਅਤੇ ਸੈਸ਼ਨ ਕੁਕੀ ਉਘੜਦੀ ਨਹੀਂ।      |
| ਕਲਾਇੰਟ API `/v1/*`, `/v1beta/*`     | Bearer / `x-api-key` ਹੈਡਰ | ਪਹਿਲਾਂ ਹੀ **ਡਿਜ਼ਾਈਨ ਅਨੁਸਾਰ** ਖੁੱਲ੍ਹਾ ਹੈ (`relaxForTokenAuth`): ਬ੍ਰਾਊਜ਼ਰ ਕਦੇ ਵੀ ਆਪਣੇ ਆਪ `Authorization`/`x-api-key` ਨਹੀਂ ਜੋੜਦੇ, ਇਸ ਲਈ ਹਮਲਾਵਰ ਦਾ ਪੰਨਾ ਤੁਹਾਡੀ ਕੁੰਜੀ ਪ੍ਰਦਾਨ ਨਹੀਂ ਕਰ ਸਕਦਾ। `CORS_ALLOW_ALL` ਇਸ ਦਾਇਰੇ ਨੂੰ ਹੋਰ ਨਹੀਂ ਵਧਾਉਂਦਾ। |
| ਜਨਤਕ ਸਿਰਫ਼-ਪੜ੍ਹਨ (`/api/health`, …) | ਕੋਈ ਨਹੀਂ                  | ਗੈਰ-ਸੰਵੇਦਨਸ਼ੀਲ; ਵਾਈਲਡਕਾਰਡ ਨੁਕਸਾਨਰਹਿਤ ਹੈ।                                                                                                                                                                                              |

ਇਸ ਲਈ `CORS_ALLOW_ALL=true` ਦਾ **ਬਾਕੀ ਬਚਿਆ** ਐਕਸਪੋਜ਼ਰ ਇਨ੍ਹਾਂ ਤੱਕ ਸੀਮਤ ਹੈ: (a)
ਪਹਿਲਾਂ ਹੀ ਗੈਰ-ਪ੍ਰਮਾਣਿਤ ਡਾਟੇ ਨੂੰ ਬਿਨਾਂ ਕ੍ਰੈਡੈਂਸ਼ਲਾਂ ਦੇ ਕ੍ਰਾਸ-ਓਰਿਜਨ **ਪੜ੍ਹਨਾ**, ਅਤੇ (b)
ਮੈਨੇਜਮੈਂਟ ਰੂਟਾਂ 'ਤੇ CORS **ਪ੍ਰੀਫਲਾਈਟ ਨੂੰ ਪਾਸ ਹੋਣ ਦੇਣਾ** — ਜਿਨ੍ਹਾਂ ਲਈ ਫਿਰ ਵੀ ਅਜਿਹੇ ਪ੍ਰਮਾਣੀਕਰਨ ਦੀ ਲੋੜ ਹੁੰਦੀ ਹੈ ਜੋ ਕੋਈ ਕ੍ਰਾਸ-ਓਰਿਜਨ ਪੰਨਾ ਪ੍ਰਦਾਨ ਨਹੀਂ ਕਰ ਸਕਦਾ। ਇਹ ਸਾਂਝੇ CORS ਪਾਥ ਉੱਤੇ ਸੈਸ਼ਨ-ਹਾਈਜੈਕ ਜਾਂ ਕ੍ਰੈਡੈਂਸ਼ਲ-ਚੋਰੀ ਦਾ ਸਾਧਨ **ਨਹੀਂ** ਹੈ।

### ਇੱਕ ਅਸਲ ਅਪਵਾਦ — `/api/v1/agents/`

Cloud-Agent ਰੂਟ (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ਆਪਣੇ **ਖੁਦ ਦੇ** CORS ਹੈਡਰ ਸੈੱਟ ਕਰਦੇ ਹਨ
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ਅਤੇ
`Access-Control-Allow-Origin: <origin>|*` ਦੇ ਨਾਲ
`Access-Control-Allow-Credentials: true` ਵੀ **ਭੇਜਦੇ ਹਨ**। ਇਹ ਉਹ ਇਕੱਲਾ ਸਰਫੇਸ ਹੈ ਜਿੱਥੇ
ਮੂਲ-ਈਕੋ ਅਤੇ ਕ੍ਰੈਡੈਂਸ਼ਲ ਇਕੱਠੇ ਮੌਜੂਦ ਹਨ, ਅਤੇ ਇਹ **`CORS_ALLOW_ALL` ਤੋਂ ਸੁਤੰਤਰ** ਹੈ। ਇਹ ਰੂਟ ਮੈਨੇਜਮੈਂਟ-ਪ੍ਰਮਾਣਿਤ ਹਨ
(`requireManagementAuth`); ਜਿਹੜੇ ਓਪਰੇਟਰ ਡੈਸ਼ਬੋਰਡ ਨੂੰ ਹੋਸਟ ਤੋਂ ਬਾਹਰ ਉਪਲਬਧ ਕਰਦੇ ਹਨ, ਉਨ੍ਹਾਂ ਨੂੰ ਪਤਾ ਹੋਣਾ ਚਾਹੀਦਾ ਹੈ ਕਿ ਇਹ ਉਹ ਇੱਕੋ ਥਾਂ ਹੈ ਜਿੱਥੇ ਜਵਾਬ ਦੇ ਹੈਡਰ ਕ੍ਰਾਸ-ਓਰਿਜਨ ਕ੍ਰੈਡੈਂਸ਼ਲ-ਯੁਕਤ ਪੜ੍ਹਨ ਦੀ ਇਜਾਜ਼ਤ ਦਿੰਦੇ ਹਨ। ਇਸਨੂੰ ਇੱਕ ਸਪਸ਼ਟ ਮਨਜ਼ੂਰ-ਸੂਚੀ ਤੱਕ ਸੀਮਤ ਕਰਨ ਦਾ ਕੰਮ ਇਸ CORS ਮਾਰਗਦਰਸ਼ਨ ਤੋਂ ਵੱਖਰੇ ਤੌਰ 'ਤੇ ਟ੍ਰੈਕ ਕੀਤਾ ਜਾ ਰਿਹਾ ਹੈ।

## ਪ੍ਰੋਡਕਸ਼ਨ ਚੈੱਕਲਿਸਟ

- **ਪ੍ਰੋਡਕਸ਼ਨ ਵਿੱਚ ਕਦੇ ਵੀ `CORS_ALLOW_ALL=true` ਸੈੱਟ ਨਾ ਕਰੋ।** ਇਸਨੂੰ ਸੈੱਟ ਕੀਤੇ ਬਿਨਾਂ ਛੱਡੋ।
- ਇੱਕ **ਸਪਸ਼ਟ** ਓਰਿਜਿਨ ਸੂਚੀ ਸੈੱਟ ਕਰੋ — ਜਾਂ ਤਾਂ env var ਜਾਂ Security ਟੈਬ ਵਾਲਾ ਖੇਤਰ:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- ਜੇ OmniRoute ਕਿਸੇ ਰਿਵਰਸ ਪ੍ਰੌਕਸੀ / ਟਨਲ (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) ਦੇ ਪਿੱਛੇ ਚੱਲਦਾ ਹੈ, ਤਾਂ CORS ਤੁਹਾਡਾ **ਇਕਲੌਤਾ** ਕੰਟਰੋਲ ਨਹੀਂ ਹੈ — ਲੂਪਬੈਕ ਰੂਟ
  ਗਾਰਡ ਹਾਲੇ ਵੀ spawn-ਸਮਰੱਥ ਰੂਟਾਂ ਦੀ ਸੁਰੱਖਿਆ ਕਰਦਾ ਹੈ (ਵੇਖੋ
  [ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md))। 403 ਨੂੰ "ਠੀਕ" ਕਰਨ ਲਈ
  `X-Forwarded-For: 127.0.0.1` ਨੂੰ ਜਾਲਸਾਜ਼ੀ ਨਾਲ ਨਾ ਬਣਾਓ; ਇਹ ਉਸ RCE ਸ਼੍ਰੇਣੀ ਨੂੰ ਮੁੜ ਖੋਲ੍ਹ ਦਿੰਦਾ ਹੈ ਜਿਸਨੂੰ
  ਰੂਟ ਗਾਰਡ ਬੰਦ ਕਰਦਾ ਹੈ।
- ਰਨਟਾਈਮ ਸਥਿਤੀ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ: ਜਦੋਂ ਵੀ
  `CORS_ALLOW_ALL=true` ਸਰਗਰਮ ਹੋਵੇ, ਡੈਸ਼ਬੋਰਡ Dashboard → Security → Authorization Inventory ਦੇ ਹੇਠਾਂ ਇੱਕ **ਸਥਾਈ ਐਂਬਰ ਬੈਨਰ**
  ਦਿਖਾਉਂਦਾ ਹੈ, ਅਤੇ `/api/settings/authz-inventory` ਇੱਕ
  `cors: { allowAll, allowedOrigins }` ਐਨਵਲਪ ਵਾਪਸ ਕਰਦਾ ਹੈ ਜਿਸਨੂੰ ਨਿਗਰਾਨੀ ਟੂਲ ਪੋਲ ਕਰ ਸਕਦੇ ਹਨ।

## ਡਿਵੈਲਪਮੈਂਟ ਦੀ ਸਹੂਲਤ — ਖ਼ਾਸ ਲੋਕਲ ਓਰਿਜਿਨਾਂ ਨੂੰ ਆਗਿਆ ਦਿਓ

ਤੁਹਾਨੂੰ dev ਵਿੱਚ ਵੀ ਵਾਈਲਡਕਾਰਡ ਦੀ ਲੋੜ ਬਹੁਤ ਘੱਟ ਪੈਂਦੀ ਹੈ। ਸਿਰਫ਼ ਉਹਨਾਂ dev ਸਰਵਰਾਂ ਨੂੰ ਆਗਿਆ ਦਿਓ ਜਿਨ੍ਹਾਂ ਦੀ ਤੁਸੀਂ ਵਰਤੋਂ ਕਰਦੇ ਹੋ:

```bash
# ਲੋਕਲ OmniRoute ਨੂੰ ਕਾਲ ਕਰਨ ਵਾਲੇ Vite (5173) + Next.js (3000) dev ਸਰਵਰ
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ਓਰਿਜਿਨਾਂ ਦਾ ਮਿਲਾਨ ਵੱਡੇ-ਛੋਟੇ ਅੱਖਰਾਂ ਦੀ ਪਰਵਾਹ ਕੀਤੇ ਬਿਨਾਂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ ਅੰਤਲੀ ਸਲੈਸ਼ ਨੂੰ ਅਣਡਿੱਠਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਇਸ ਲਈ
`http://localhost:3000` ਅਤੇ `http://localhost:3000/` ਬਰਾਬਰ ਹਨ। ਇਹੀ CSV
ਬਿਨਾਂ ਰੀਸਟਾਰਟ ਕੀਤੇ ਰਨਟਾਈਮ ਦੌਰਾਨ **Dashboard → Security → CORS Allowed Origins** ਵਿੱਚ ਸੈੱਟ ਕੀਤਾ ਜਾ ਸਕਦਾ ਹੈ।

## API ਕੁੰਜੀਆਂ ਬਨਾਮ ਕੁਕੀ ਸੈਸ਼ਨ

- **Bearer / `x-api-key` (`/v1/*` ਇਨਫ਼ਰੈਂਸ ਸਤਹ):** ਬ੍ਰਾਊਜ਼ਰ ਇਹਨਾਂ ਨੂੰ ਕਦੇ ਵੀ
  ਆਪਣੇ ਆਪ ਅਟੈਚ ਨਹੀਂ ਕਰਦੇ। ਇੱਥੇ CORS ਕੋਈ ਅਰਥਪੂਰਨ ਰੁਕਾਵਟ ਨਹੀਂ ਹੈ — API ਕੁੰਜੀ ਹੀ
  ਰੁਕਾਵਟ ਹੈ — ਇਸੇ ਕਰਕੇ ਇਸ ਸਤਹ ਨੂੰ ਜਾਣ-ਬੁੱਝ ਕੇ ਆਗਿਆਕਾਰੀ ਰੱਖਿਆ ਗਿਆ ਹੈ ਤਾਂ ਜੋ ਬ੍ਰਾਊਜ਼ਰ ਅਤੇ
  Electron ਕਲਾਇੰਟ ਉਹ ਜਵਾਬ ਪੜ੍ਹ ਸਕਣ ਜਿਨ੍ਹਾਂ ਦੇ ਉਹ ਪਹਿਲਾਂ ਹੀ ਹੱਕਦਾਰ ਹਨ।
- **ਕੁਕੀ ਸੈਸ਼ਨ (ਡੈਸ਼ਬੋਰਡ):** fail-closed ਡਿਫੌਲਟ **ਅਤੇ**
  ਸਾਂਝੇ ਪਾਥ ਉੱਤੇ `Access-Control-Allow-Credentials` ਦੀ ਗੈਰਹਾਜ਼ਰੀ ਦੁਆਰਾ ਸੁਰੱਖਿਅਤ ਹੈ। ਪ੍ਰਬੰਧਨ/ਡੈਸ਼ਬੋਰਡ
  ਓਰਿਜਿਨਾਂ ਨੂੰ ਕਿਸੇ ਵੀ ਆਗਿਆਕਾਰੀ ਸੰਰਚਨਾ ਤੋਂ ਬਾਹਰ ਰੱਖੋ; ਉਹਨਾਂ ਦਾ ਬਿਲਕੁਲ
  fail-closed ਰਹਿਣਾ ਲਾਜ਼ਮੀ ਹੈ।

## ਉਦਾਹਰਨ: OmniRoute ਦੇ ਸਾਹਮਣੇ ਰਿਵਰਸ ਪ੍ਰੌਕਸੀ

CORS ਨੂੰ OmniRoute ਖੁਦ ਲਾਗੂ ਕਰਦਾ ਹੈ, ਇਸ ਲਈ ਪ੍ਰੌਕਸੀ ਨੂੰ ਆਮ ਤੌਰ 'ਤੇ
`Access-Control-*` ਹੈਡਰ ਜੋੜਨੇ ਜਾਂ ਮੁੜ ਲਿਖਣੇ **ਨਹੀਂ** ਚਾਹੀਦੇ (ਦੁਹਰੇ ਹੈਡਰ ਬ੍ਰਾਊਜ਼ਰਾਂ ਨੂੰ ਖ਼ਰਾਬ ਕਰ ਦਿੰਦੇ ਹਨ)। TLS
ਨੂੰ ਟਰਮੀਨੇਟ ਕਰਕੇ ਅੱਗੇ ਭੇਜੋ — ਪ੍ਰੀਫਲਾਈਟ ਦਾ ਜਵਾਬ OmniRoute ਨੂੰ ਦੇਣ ਦਿਓ:

```nginx
# nginx — OmniRoute ਵੱਲ ਅੱਗੇ ਭੇਜੋ; ਇੱਥੇ Access-Control-* ਇੰਜੈਕਟ ਨਾ ਕਰੋ
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For ਨੂੰ 127.0.0.1 'ਤੇ ਸੈੱਟ ਨਾ ਕਰੋ — ਇਹ ਲੂਪਬੈਕ ਰੂਟ ਗਾਰਡ ਨੂੰ ਨਾਕਾਮ ਕਰ ਦਿੰਦਾ ਹੈ।
}
```

ਆਗਿਆਪ੍ਰਾਪਤ ਬ੍ਰਾਊਜ਼ਰ ਓਰਿਜਿਨਾਂ ਨੂੰ OmniRoute (`CORS_ALLOWED_ORIGINS` ਜਾਂ
Security ਟੈਬ) ਵਿੱਚ ਸੈੱਟ ਕਰੋ, ਪ੍ਰੌਕਸੀ ਵਿੱਚ ਨਹੀਂ।

## ਸਰੋਤ ਫ਼ਾਈਲਾਂ

| ਵਿਸ਼ਾ                                       | ਫ਼ਾਈਲ                                                                |
| ------------------------------------------- | -------------------------------------------------------------------- |
| Allowlist ਰਿਜ਼ੋਲਿਊਸ਼ਨ + `getCorsStatus()`   | `src/server/cors/origins.ts`                                         |
| Middleware ਐਪਲੀਕੇਸ਼ਨ (ਸੱਚਾਈ ਦਾ ਇਕਲੌਤਾ ਸਰੋਤ) | `src/server/authz/pipeline.ts`                                       |
| Settings → ਰਨਟਾਈਮ ਓਰਿਜਿਨ ਇੰਜੈਕਸ਼ਨ           | `src/lib/config/runtimeSettings.ts`                                  |
| ਡੈਸ਼ਬੋਰਡ ਲਈ ਰਨਟਾਈਮ ਸਥਿਤੀ                    | `src/app/api/settings/authz-inventory/route.ts`                      |
| ਡੈਸ਼ਬੋਰਡ ਚੇਤਾਵਨੀ ਬੈਨਰ                       | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins ਖੇਤਰ                   | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| Cloud-Agent ਪ੍ਰਤੀ-ਰੂਟ CORS (ਅਪਵਾਦ)          | `src/lib/cloudAgent/api.ts`                                          |

## ਇਹ ਵੀ ਵੇਖੋ

- [ਰੂਟ ਗਾਰਡ ਪੱਧਰ](./ROUTE_GUARD_TIERS.md) — ਪ੍ਰੋਸੈਸ ਸ਼ੁਰੂ ਕਰਨ ਦੇ ਸਮਰੱਥ ਰੂਟਾਂ ਲਈ
  ਲੂਪਬੈਕ ਲਾਗੂਕਰਨ (ਇੱਕ ਵੱਖਰਾ, ਪੂਰਕ ਨਿਯੰਤਰਣ)।
- [ਪ੍ਰਮਾਣੀਕਰਨ ਗਾਈਡ](../architecture/AUTHZ_GUIDE.md) — ਪੂਰੀ ਪ੍ਰਮਾਣੀਕਰਨ ਪਾਈਪਲਾਈਨ।
