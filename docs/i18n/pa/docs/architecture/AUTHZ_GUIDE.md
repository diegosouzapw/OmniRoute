# Authorization Guide (ਪੰਜਾਬੀ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇦 [bs](../../../bs/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [kn](../../../kn/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ਸੱਚਾਈ ਦਾ ਸਰੋਤ:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **ਆਖਰੀ ਵਾਰ ਅੱਪਡੇਟ ਕੀਤਾ:** 2026-06-28 — v3.8.40

OmniRoute ਕੋਲ ਇੱਕ ਰੂਟ-ਅਵੇਅਰ ਅਧਿਕਾਰ-ਪ੍ਰਮਾਣਨ ਪਾਈਪਲਾਈਨ ਹੈ ਜੋ ਹਰ API ਬੇਨਤੀ ਨੂੰ ਨਿਯੰਤਰਿਤ ਕਰਦੀ ਹੈ। ਵਰਗੀਕਰਨ **ਨਿਰਧਾਰਤ** ਅਤੇ **fail-closed** ਹੈ — ਜਿਸ ਵੀ ਚੀਜ਼ ਦਾ ਵਰਗੀਕਰਨ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ, ਉਹ `MANAGEMENT` ਵਜੋਂ ਮੰਨੀ ਜਾਂਦੀ ਹੈ ਅਤੇ ਉਸ ਲਈ ਇੱਕ ਸੈਸ਼ਨ ਜਾਂ ਮੈਨੇਜਮੈਂਟ-ਗ੍ਰੇਡ ਟੋਕਨ ਲੋੜੀਂਦਾ ਹੁੰਦਾ ਹੈ। ਇਹ ਪੰਨਾ ਰੂਟਾਂ ਦੀ ਦੇਖਭਾਲ ਕਰਨ ਜਾਂ ਨਵੇਂ ਐਂਡਪੌਇੰਟ ਡਿਜ਼ਾਈਨ ਕਰਨ ਵਾਲੇ ਇੰਜੀਨੀਅਰਾਂ ਲਈ ਮਾਡਲ ਦੀ ਵਿਆਖਿਆ ਕਰਦਾ ਹੈ।

![AuthZ ਪਾਈਪਲਾਈਨ (3 ਰੂਟ ਕਲਾਸਾਂ + ਨੀਤੀ ਮੁਲਾਂਕਣ)](../diagrams/exported/authz-pipeline.svg)

> ਸਰੋਤ: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ਦੋ ਪ੍ਰਮਾਣੀਕਰਨ ਮੋਡ

### 1. API ਕੁੰਜੀ (Bearer)

OpenAI/Anthropic/Gemini-ਅਨੁਕੂਲ ਕਲਾਇੰਟ API ਲਈ ਅਤੇ ਕੁਝ ਮੈਨੇਜਮੈਂਟ ਰੂਟਾਂ ਲਈ ਵਰਤੀ ਜਾਂਦੀ ਹੈ, ਜਦੋਂ ਕੁੰਜੀ ਕੋਲ `manage` ਸਕੋਪ ਹੁੰਦਾ ਹੈ।

```
Authorization: Bearer <api-key>
```

ਇਸ ਨੂੰ `src/sse/services/auth.ts` ਵਿੱਚ `isValidApiKey()` / `extractApiKey()` ਦੁਆਰਾ ਪ੍ਰਮਾਣਿਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਅਤੇ `src/shared/utils/apiAuth.ts` ਰਾਹੀਂ ਮੁੜ ਐਕਸਪੋਰਟ ਕੀਤਾ ਜਾਂਦਾ ਹੈ। ਵੈਲੀਡੇਟਰ `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` env vars ਨੂੰ ਸਥਾਈ ਪਾਸਥਰੂ ਕੁੰਜੀਆਂ ਵਜੋਂ ਵੀ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ (issue #1350)।

### 2. ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ (auth_token ਕੂਕੀ)

ਡੈਸ਼ਬੋਰਡ ਪੰਨਿਆਂ ਅਤੇ ਐਡਮਿਨ ਕਾਰਵਾਈਆਂ ਲਈ।

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

ਕੋਈ ਕੂਕੀ ਕੇਵਲ ਉਦੋਂ ਹੀ ਸੈਸ਼ਨ ਹੁੰਦੀ ਹੈ ਜਦੋਂ JWT ਦੀ ਪੁਸ਼ਟੀ ਹੋਵੇ **ਅਤੇ** ਉਸ ਵਿੱਚ `authenticated: true` ਹੋਵੇ
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`)। ਕੂਕੀ ਦੀ ਵਰਤੋਂ ਕਰਨ ਵਾਲਾ ਹਰ
ਉਪਭੋਗਤਾ (ਰੂਟ ਗਾਰਡ, authz ਪਾਈਪਲਾਈਨ ਰਿਫ੍ਰੈਸ਼, WebSocket ਹੈਂਡਸ਼ੇਕ, ਲਾਈਵ
ਸਰਵਰ, `/api/settings/require-login`, `/api/auth/status`) ਉਸ ਹੈਲਪਰ ਰਾਹੀਂ ਜਾਂਦਾ ਹੈ।
`JWT_SECRET` ਨਾਲ ਸਾਈਨ ਕੀਤੇ ਹੋਰ JWT ਵੀ ਮੌਜੂਦ ਹਨ — Cursor CLI ਪਾਸਥਰੂ ਕੁੰਜੀ ਧਾਰਕਾਂ ਲਈ
`iss "omniroute" / aud "cursor-cli"` ਟੋਕਨ ਬਣਾਉਂਦਾ ਹੈ — ਅਤੇ ਉਹ ਕਦੇ ਵੀ ਸੈਸ਼ਨ ਨਹੀਂ ਹੁੰਦੇ
(#13298)।

ਇਸ ਦੀ ਪੁਸ਼ਟੀ `src/shared/utils/apiAuth.ts` ਵਿੱਚ `isDashboardSessionAuthenticated()` ਦੁਆਰਾ ਕੀਤੀ ਜਾਂਦੀ ਹੈ। ਜਦੋਂ JWT ਦੀ 30-ਦਿਨਾਂ ਦੀ ਮਿਆਦ ਵਿੱਚ 7 ਦਿਨਾਂ ਤੋਂ ਘੱਟ ਸਮਾਂ ਬਚਦਾ ਹੈ, ਤਾਂ ਪਾਈਪਲਾਈਨ ਇਸਨੂੰ ਆਪਣੇ-ਆਪ ਰਿਫ੍ਰੈਸ਼ ਕਰਦੀ ਹੈ।

ਕੁਝ ਮੈਨੇਜਮੈਂਟ ਰੂਟ **ਕਿਸੇ ਵੀ** ਮੋਡ ਨੂੰ ਸਵੀਕਾਰ ਕਰਦੇ ਹਨ: ਕੂਕੀ ਜਾਂ `Bearer <key>`, ਜਦੋਂ API ਕੁੰਜੀ ਕੋਲ `manage` (ਜਾਂ `admin`) ਸਕੋਪ ਹੁੰਦਾ ਹੈ। ਇਹੀ v3.8 ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤੇ ਗਏ "API ਕਾਲਾਂ ਰਾਹੀਂ ਕਾਨਫਿਗਰ ਕਰਨ ਯੋਗ" ਵਰਕਫਲੋ ਨੂੰ ਸਮਰੱਥ ਬਣਾਉਂਦਾ ਹੈ।

#### ਵਿਕਲਪਿਕ OIDC ਲੌਗਇਨ ਗੇਟ (#6973)

ਡੈਸ਼ਬੋਰਡ ਐਡਮਿਨ ਲੌਗਇਨ ਡਿਫੌਲਟ ਪਾਸਵਰਡ ਲੌਗਇਨ ਦੇ ਨਾਲ ਇੱਕ **ਆਪਟ-ਇਨ** OIDC (OpenID Connect) ਫਲੋ ਦਾ ਵੀ ਸਮਰਥਨ ਕਰਦਾ ਹੈ — ਪਾਸਵਰਡ ਲੌਗਇਨ ਕਦੇ ਹਟਾਇਆ ਨਹੀਂ ਜਾਂਦਾ, ਸਿਰਫ਼ ਇਸ ਵਿੱਚ ਵਾਧਾ ਕੀਤਾ ਜਾਂਦਾ ਹੈ:

- ਇਹ ਉਦੋਂ ਤੱਕ ਅਸਮਰੱਥ ਰਹਿੰਦਾ ਹੈ ਜਦੋਂ ਤੱਕ `settings.oidcEnabled === true` **ਅਤੇ** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ਸਾਰੇ ਕਾਨਫਿਗਰ ਨਾ ਕੀਤੇ ਗਏ ਹੋਣ (Settings → Auth)।
  ਨਹੀਂ ਤਾਂ `GET /api/auth/oidc/login` `400` ਵਾਪਸ ਕਰਦਾ ਹੈ।
- `GET /api/auth/oidc/login`, issuer ਦੇ
  `/.well-known/openid-configuration` ਤੋਂ `authorization_endpoint` ਖੋਜਦਾ ਹੈ (`<issuer>/authorize`
  ਨੂੰ ਫਾਲਬੈਕ ਵਜੋਂ ਵਰਤਦਾ ਹੈ), ਆਉਣ ਵਾਲੀ ਬੇਨਤੀ ਤੋਂ ਰੀਡਾਇਰੈਕਟ URI ਬਣਾਉਂਦਾ ਹੈ
  (`x-forwarded-proto`-ਅਵੇਅਰ), ਅਤੇ ਇੱਕ ਬੇਤਰਤੀਬ `state` ਨਾਲ IdP ਵੱਲ ਰੀਡਾਇਰੈਕਟ ਕਰਦਾ ਹੈ,
  ਜਿਸਨੂੰ ਇੱਕ `httpOnly` `oidc_state` ਕੂਕੀ ਵਿੱਚ ਸਟੋਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ।
- `GET /api/auth/oidc/callback`, `state` ਨੂੰ ਪ੍ਰਮਾਣਿਤ ਕਰਦਾ ਹੈ, ਅਧਿਕਾਰ-ਪ੍ਰਮਾਣਨ
  ਕੋਡ ਦੀ ਅਦਲਾ-ਬਦਲੀ ਕਰਦਾ ਹੈ, ਅਤੇ issuer ਦੇ JWKS ਰਾਹੀਂ ID ਟੋਕਨ ਦੇ ਦਸਤਖ਼ਤ ਦੀ ਪੁਸ਼ਟੀ ਕਰਦਾ ਹੈ
  (`jose` ਦਾ `createRemoteJWKSet`, ਪ੍ਰਤੀ JWKS URI ਕੈਸ਼ ਕੀਤਾ ਹੋਇਆ), ਨਾਲ ਹੀ `issuer`/`audience`
  ਜਾਂਚਾਂ ਕਰਦਾ ਹੈ। ਇੱਕ ਵਿਕਲਪਿਕ `oidcAllowedSubjects` ਅਲਾਊਲਿਸਟ ਟੋਕਨ ਦੇ
  `sub` ਕਲੇਮ ਜਾਂ ਇਸਦੇ `email` ਕਲੇਮ ਨਾਲ ਮੇਲ ਕਰਦੀ ਹੈ — `email` ਕਲੇਮ ਨੂੰ ਕੇਵਲ ਉਦੋਂ ਹੀ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ ਜਦੋਂ
  `email_verified === true` ਹੋਵੇ, ਇਸ ਲਈ IdP 'ਤੇ ਇੱਕ ਅਪ੍ਰਮਾਣਿਤ ਈਮੇਲ ਕਦੇ ਵੀ
  ਗੇਟ ਪਾਰ ਨਹੀਂ ਕਰ ਸਕਦੀ।
- ਸਫਲਤਾ ਮਿਲਣ 'ਤੇ ਇਹ **ਬਿਲਕੁਲ ਉਹੀ** 30-ਦਿਨਾਂ ਵਾਲਾ `auth_token` JWT ਬਣਾਉਂਦਾ ਹੈ ਜੋ ਪਾਸਵਰਡ
  ਲੌਗਇਨ ਜਾਰੀ ਕਰਦਾ ਹੈ (`src/app/api/auth/login/route.ts`), ਇਸ ਲਈ ਬਾਕੀ
  ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ ਪਾਈਪਲਾਈਨ (ਆਟੋ-ਰਿਫ੍ਰੈਸ਼, ਕੂਕੀ ਫਲੈਗ) ਵਿੱਚ ਕੋਈ ਤਬਦੀਲੀ ਨਹੀਂ ਹੁੰਦੀ —
  OIDC ਸਿਰਫ਼ ਇਹ ਬਦਲਦਾ ਹੈ ਕਿ ਕੂਕੀ ਕਿਵੇਂ ਬਣਾਈ ਜਾਂਦੀ ਹੈ, ਇਹ ਨਹੀਂ ਕਿ ਉਹ ਕਿਹੜੀਆਂ ਇਜਾਜ਼ਤਾਂ ਦਿੰਦੀ ਹੈ।

## ਰੂਟ ਕਲਾਸਾਂ

`src/server/authz/types.ts` ਤਿੰਨ ਕਲਾਸਾਂ ਪਰਿਭਾਸ਼ਿਤ ਕਰਦੀ ਹੈ; ਕੋਈ ਵੀ ਰੂਟ ਜਿਸਨੂੰ ਨਿਸ਼ਚਿਤ ਤੌਰ 'ਤੇ ਵਰਗੀਕ੍ਰਿਤ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ, ਡਿਫਾਲਟ ਰੂਪ ਵਿੱਚ `MANAGEMENT` ਵਿੱਚ ਜਾਂਦਾ ਹੈ।

| ਕਲਾਸ         | ਵੇਰਵਾ                                                                                                                                          | ਪ੍ਰਮਾਣਿਕਤਾ ਲੋੜੀਂਦੀ ਹੈ                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `PUBLIC`     | ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਸੁਰੱਖਿਅਤ ਰੂਟ — ਲੌਗਇਨ, ਲੌਗਆਉਟ, ਸਥਿਤੀ, ਸ਼ੁਰੂਆਤ, ਸਿਹਤ, ਔਨਬੋਰਡਿੰਗ ਬੂਟਸਟਰੈਪ।                                                          | ਕੋਈ ਨਹੀਂ                                                             |
| `CLIENT_API` | ਮਾਡਲ-ਸਰਵਿੰਗ ਐਂਡਪੌਇੰਟ — `/api/v1/*`, `/api/v1beta/*`, ਅਤੇ ਉਪਨਾਮ `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*`। | ਜਦੋਂ ਪ੍ਰਭਾਵੀ `REQUIRE_API_KEY` ਫੀਚਰ ਫਲੈਗ ਸਮਰੱਥ ਹੋਵੇ ਤਾਂ Bearer ਕੁੰਜੀ |
| `MANAGEMENT` | ਡੈਸ਼ਬੋਰਡ ਪੰਨੇ, ਸੈਟਿੰਗਾਂ, ਪ੍ਰਦਾਤਾ, ਕੁੰਜੀਆਂ, ਐਡਮਿਨ ਅਤੇ ਡਾਇਗਨੌਸਟਿਕਸ ਐਂਡਪੌਇੰਟ।                                                                     | ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ ਜਾਂ `manage` ਸਕੋਪ ਵਾਲਾ Bearer                         |

## ਪਾਈਪਲਾਈਨ

```
ਆਉਣ ਵਾਲੀ ਬੇਨਤੀ → src/proxy.ts
  → src/server/authz/pipeline.ts ਵਿੱਚ runAuthzPipeline()
    1. ਭਰੋਸੇਯੋਗ ਅੰਦਰੂਨੀ ਹੈਡਰ ਹਟਾਓ (x-omniroute-auth-*, x-omniroute-route-class)
    2. ਬੇਨਤੀ ID ਬਣਾਓ, classifyRoute() ਰਾਹੀਂ ਰੂਟ ਦਾ ਵਰਗੀਕਰਨ ਕਰੋ
    3. ਜੇ pathname == "/" → /dashboard ਵੱਲ ਰੀਡਾਇਰੈਕਟ ਕਰੋ
    4. ਜੇ ਡਰੇਨਿੰਗ (ਸੁਚਾਰੂ ਸ਼ਟਡਾਊਨ) ਚੱਲ ਰਹੀ ਹੈ ਅਤੇ /api/* ਹੈ → 503
    5. ਜੇ non-GET /api/* ਹੈ → checkBodySize() ਗਾਰਡ
    6. ਜੇ OPTIONS ਹੈ → CORS ਪ੍ਰੀਫਲਾਈਟ 204
    7. ਜੇ options.enforce == false ਹੈ → ਰੂਟ-ਕਲਾਸ ਹੈਡਰਾਂ ਸਮੇਤ ਜਿਉਂ ਦਾ ਤਿਉਂ ਅੱਗੇ ਭੇਜੋ
    8. ਨਹੀਂ ਤਾਂ: POLICIES[routeClass].evaluate(ctx)
       - ਮਨਜ਼ੂਰ  → x-omniroute-auth-{kind,id,label,scopes} ਲਗਾਓ → NextResponse.next()
       - ਅਸਵੀਕਾਰ → correlation_id ਸਮੇਤ JSON ਗਲਤੀ (ਡੈਸ਼ਬੋਰਡ ਪੰਨੇ → 302 /login)
```

ਭਰੋਸੇਯੋਗ ਅੰਦਰੂਨੀ ਹੈਡਰ (`src/server/authz/headers.ts` ਵਿੱਚ ਪਰਿਭਾਸ਼ਿਤ) ਵਰਗੀਕਰਨ ਤੋਂ ਪਹਿਲਾਂ **ਆਉਣ ਵਾਲੀਆਂ ਬੇਨਤੀਆਂ ਵਿੱਚੋਂ ਹਟਾ ਦਿੱਤੇ ਜਾਂਦੇ ਹਨ** — ਕਲਾਇੰਟ ਕਿਸੇ ਸਬਜੈਕਟ ਦੀ ਨਕਲ ਕਰਨ ਲਈ `x-omniroute-auth-*` ਨੂੰ ਪਹਿਲਾਂ ਤੋਂ ਭਰ ਨਹੀਂ ਸਕਦੇ।

### ਪਾਲਿਸੀ ਕਾਂਟ੍ਰੈਕਟ

ਹਰੇਕ ਰੂਟ ਕਲਾਸ ਲਈ `src/server/authz/policies/` ਵਿੱਚ ਇੱਕ ਪਾਲਿਸੀ ਹੈ:

- **`publicPolicy`** (`policies/public.ts`) — ਹਮੇਸ਼ਾ `allow({ kind: "anonymous", id: "anonymous" })` ਵਾਪਸ ਕਰਦੀ ਹੈ।
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer ਕੱਢਦੀ ਹੈ, `validateApiKey()` ਰਾਹੀਂ ਪ੍ਰਮਾਣਿਤ ਕਰਦੀ ਹੈ। ਸਿਰਫ਼ ਉਦੋਂ ਹੀ anonymous ਵੱਲ ਫਾਲ-ਥਰੂ ਕਰਦੀ ਹੈ ਜਦੋਂ ਪ੍ਰਭਾਵੀ `REQUIRE_API_KEY` ਫੀਚਰ ਫਲੈਗ ਅਸਮਰੱਥ ਹੋਵੇ। ਪ੍ਰਭਾਵੀ ਫਲੈਗ `isRequireApiKeyEnabled()` (`DB ਫੀਚਰ ਫਲੈਗ ਓਵਰਰਾਈਡ > process.env.REQUIRE_API_KEY > ਡਿਫਾਲਟ`) ਰਾਹੀਂ ਨਿਰਧਾਰਤ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, ਤਾਂ ਜੋ ਡੈਸ਼ਬੋਰਡ ਫੀਚਰ ਫਲੈਗ ਅਤੇ ਇਨਵਾਇਰਨਮੈਂਟ ਵੇਰੀਏਬਲ `/api/v1/*`, `/api/v1beta/*`, ਅਤੇ ਉਪਨਾਮਾਂ ਨੂੰ ਇਕਸਾਰ ਢੰਗ ਨਾਲ ਨਿਯੰਤ੍ਰਿਤ ਕਰਨ; ਰਿਜ਼ਾਲਵਰ ਦੀਆਂ ਅਸਫਲਤਾਵਾਂ ਵਿੱਚ ਪਹੁੰਚ ਬੰਦ ਰਹਿੰਦੀ ਹੈ। ਕਲਾਇੰਟ API ਰੂਟਾਂ 'ਤੇ ਡੈਸ਼ਬੋਰਡ-ਸੈਸ਼ਨ ਬੇਨਤੀਆਂ ਨੂੰ ਮਨਜ਼ੂਰ ਕਰਦੀ ਹੈ (ਇਸ ਵਿੱਚ `/api/v1/models` ਵੀ ਸ਼ਾਮਲ ਹੈ, ਜਿਸਨੂੰ ਡੈਸ਼ਬੋਰਡ ਮਾਡਲ ਕੈਟਾਲੌਗ ਵਰਤਦਾ ਹੈ)।
- **`managementPolicy`** (`policies/management.ts`) — ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ, ਅੰਦਰੂਨੀ ਮਾਡਲ-ਸਿੰਕ ਬੇਨਤੀਆਂ (`/api/providers/[name]/(sync-models|models)` ਨਾਲ ਮਿਲਾਈਆਂ ਜਾਂਦੀਆਂ), ਨੂੰ ਸਵੀਕਾਰ ਕਰਦੀ ਹੈ ਜਾਂ ਜੇ `isAuthRequired()` false ਵਾਪਸ ਕਰੇ ਤਾਂ ਪੂਰੀ ਤਰ੍ਹਾਂ ਛੱਡ ਦਿੰਦੀ ਹੈ। ਜਦੋਂ Bearer ਟੋਕਨ ਮੌਜੂਦ ਪਰ ਅਵੈਧ ਹੋਵੇ ਤਾਂ 403 (`AUTH_001`), ਨਹੀਂ ਤਾਂ 401 ਵਾਪਸ ਕਰਦੀ ਹੈ। ਇਹ ਕਿਸੇ ਵੀ ਪ੍ਰਮਾਣਿਕਤਾ ਸ਼ਾਖਾ ਤੋਂ ਪਹਿਲਾਂ ਰੂਟ-ਗਾਰਡ ਟੀਅਰਾਂ (LOCAL_ONLY / ALWAYS_PROTECTED) ਨੂੰ ਵੀ ਲਾਗੂ ਕਰਦੀ ਹੈ — [ਰੂਟ ਗਾਰਡ ਟੀਅਰ](../security/ROUTE_GUARD_TIERS.md) ਵੇਖੋ। `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ਵਿੱਚ ਮੌਜੂਦ LOCAL_ONLY ਪਾਥਾਂ (ਵਰਤਮਾਨ ਵਿੱਚ: `/api/mcp/`) ਤੱਕ non-loopback ਤੋਂ ਪਹੁੰਚ ਕੀਤੀ ਜਾ ਸਕਦੀ ਹੈ, ਜਦੋਂ Bearer ਕੁੰਜੀ ਕੋਲ `manage` ਸਕੋਪ ਹੋਵੇ; ਹੋਰ ਸਾਰੇ LOCAL_ONLY ਪਾਥ ਸਕੋਪ ਦੀ ਪਰਵਾਹ ਕੀਤੇ ਬਿਨਾਂ ਸਖ਼ਤੀ ਨਾਲ loopback ਤੱਕ ਸੀਮਤ ਰਹਿੰਦੇ ਹਨ।

ਇੱਕ ਸਫਲ ਪਾਲਿਸੀ `AuthSubject` ਵਾਪਸ ਕਰਦੀ ਹੈ, ਜਿਸ ਵਿੱਚ `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ਹੁੰਦਾ ਹੈ। ਡਾਊਨਸਟ੍ਰੀਮ ਹੈਂਡਲਰ ਪ੍ਰਮਾਣਿਕਤਾ ਤਰਕ ਨੂੰ ਮੁੜ ਚਲਾਉਣ ਦੀ ਬਜਾਏ `src/server/authz/assertAuth.ts` ਵਿੱਚ `assertAuth(request, "CLIENT_API")` ਰਾਹੀਂ ਇਸਨੂੰ ਪੜ੍ਹ ਸਕਦੇ ਹਨ।

## ਸਰਵਜਨਿਕ ਰੂਟਾਂ ਦੀ ਸੂਚੀ

`src/shared/constants/publicApiRoutes.ts` ਸਪਸ਼ਟ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਸੂਚੀ ਹੈ:

ਸੂਚੀ ਨੂੰ **ਆਕਾਰ** ਦੇ ਆਧਾਰ 'ਤੇ ਵੰਡਿਆ ਗਿਆ ਹੈ, ਅਤੇ ਇਹ ਵੰਡ ਅਤਿ-ਜ਼ਰੂਰੀ ਹੈ (GHSA-74g9-q8f6-793h): ਇੱਕ ਪ੍ਰੀਫਿਕਸ ਨੂੰ
`startsWith()` ਨਾਲ ਮਿਲਾਇਆ ਜਾਂਦਾ ਹੈ, ਇਸ ਲਈ ਇਹ ਉਹਨਾਂ ਸਾਰੇ ਨਾਲ ਲੱਗਦੇ ਪਾਥਾਂ ਨਾਲ ਵੀ ਮੇਲ ਖਾਂਦਾ ਹੈ ਜਿਨ੍ਹਾਂ ਦੇ ਸ਼ੁਰੂਆਤੀ ਅੱਖਰ ਇੱਕੋ ਹਨ।
ਪ੍ਰੀਫਿਕਸ ਵਜੋਂ `/api/usage/om-usage` ਨੇ `/api/usage/om-usage<anything>` ਨੂੰ PUBLIC ਵਜੋਂ ਚਿੰਨ੍ਹਿਤ ਕੀਤਾ, ਅਤੇ Next ਇਸਨੂੰ
`/api/usage/[connectionId]` ਵਜੋਂ ਹੱਲ ਕਰਦਾ ਹੈ — ਇੱਕ ਅਜਿਹਾ ਹੈਂਡਲਰ ਜਿਸਦੀ ਆਪਣੀ ਕੋਈ ਪ੍ਰਮਾਣੀਕਰਨ ਵਿਵਸਥਾ ਨਹੀਂ ਹੈ।

```ts
// ਅਸਲ ਸਬਟ੍ਰੀਜ਼। ਹਰ ਐਂਟਰੀ ਦਾ ਅੰਤ "/" ਨਾਲ ਹੋਣਾ ਲਾਜ਼ਮੀ ਹੈ (ਇੱਕ ਯੂਨਿਟ ਟੈਸਟ ਦੁਆਰਾ ਪੁਸ਼ਟੀ ਕੀਤੀ ਜਾਂਦੀ ਹੈ)।
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify ਵਿੱਚ CLIENT_API ਵਜੋਂ ਮੰਨਿਆ ਜਾਂਦਾ ਹੈ, "no-auth public" ਵਜੋਂ ਨਹੀਂ
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// ਇਕੱਲੇ ਰੂਟ, ਜਿਨ੍ਹਾਂ ਦਾ ਬਿਲਕੁਲ ਸਹੀ ਮੇਲ ਕੀਤਾ ਜਾਂਦਾ ਹੈ (ਅੰਤਿਮ ਸਲੈਸ਼ ਦੇ ਨਾਲ ਜਾਂ ਬਿਨਾਂ)।
PUBLIC_API_ROUTES_EXACT = new Set([
  "/api/auth/login",
  "/api/auth/logout",
  "/api/auth/status",
  "/api/init",
  "/api/sync/bundle",
  "/api/cli/connect",
  "/api/usage/om-usage",
  "/api/skills/collect/chaos",
]);

// ਸਿਰਫ਼-ਪੜ੍ਹਨਯੋਗ ਇਕੱਲੇ ਰੂਟ, ਜਿਨ੍ਹਾਂ 'ਤੇ CORS ਮੂਲ ਦੀ ਢਿੱਲ ਵੀ ਲਾਗੂ ਹੁੰਦੀ ਹੈ।
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ਢਿੱਲ ਤੋਂ ਬਿਨਾਂ ਸਿਰਫ਼-ਪੜ੍ਹਨਯੋਗ ਇਕੱਲਾ ਰੂਟ।
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

ਸਿਰਫ਼-ਪੜ੍ਹਨਯੋਗ ਰੂਟ ਕੇਵਲ ਸੁਰੱਖਿਅਤ ਮੈਥਡਾਂ ਲਈ ਹੀ ਸਰਵਜਨਿਕ ਹਨ। ਧਿਆਨ ਦਿਓ: `classifyRoute()` `/api/v1/*` ਅਤੇ `/api/v1beta/*` ਨੂੰ PUBLIC ਫਾਲ-ਥਰੂ ਤੋਂ ਬਾਹਰ ਰੱਖਦਾ ਹੈ — ਇਹ ਹਮੇਸ਼ਾ `CLIENT_API` ਹੁੰਦੇ ਹਨ, ਤਾਂ ਜੋ Bearer-ਕੀ ਨੀਤੀ ਫਿਰ ਵੀ ਲਾਗੂ ਰਹੇ।

## ਨਵਾਂ ਰੂਟ ਜੋੜਨਾ

### ਪੈਟਰਨ 1 — ਸਰਵਜਨਿਕ ਕਲਾਇੰਟ API ਐਂਡਪੌਇੰਟ (Bearer-auth)

`/api/v1/` ਅਤੇ `/api/v1beta/` ਹੇਠਲੇ ਰੂਟ ਆਪਣੇ-ਆਪ `CLIENT_API` ਵਜੋਂ ਵਰਗੀਕ੍ਰਿਤ ਹੁੰਦੇ ਹਨ। ਮਿਡਲਵੇਅਰ Bearer ਜਾਂਚ ਲਾਗੂ ਕਰਦਾ ਹੈ; ਰੂਟ ਹੈਂਡਲਰਾਂ ਨੂੰ ਇਸਨੂੰ ਦੁਬਾਰਾ ਕਰਨ ਦੀ ਲੋੜ ਨਹੀਂ, ਪਰ ਲਾਭਦਾਇਕ ਹੋਣ 'ਤੇ ਉਹ ਸਬਜੈਕਟ ਪੜ੍ਹ ਸਕਦੇ ਹਨ।

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... ਹੈਂਡਲਰ ਲਾਜਿਕ
}
```

### ਪੈਟਰਨ 2 — ਪ੍ਰਬੰਧਨ ਐਂਡਪੌਇੰਟ (ਸੈਸ਼ਨ ਜਾਂ Bearer + manage)

`src/lib/api/requireManagementAuth.ts` ਤੋਂ `requireManagementAuth()` ਵਰਤੋ:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... ਹੈਂਡਲਰ ਲਾਜਿਕ
}
```

ਸਫਲਤਾ 'ਤੇ `requireManagementAuth()` `null` ਵਾਪਸ ਕਰਦਾ ਹੈ, ਨਹੀਂ ਤਾਂ JSON ਗਲਤੀ `Response`:

- 401 `AUTH_001` "ਪ੍ਰਮਾਣੀਕਰਨ ਲੋੜੀਂਦਾ ਹੈ" — ਕੋਈ ਵੀ ਕਰੈਡੈਂਸ਼ਲ ਮੌਜੂਦ ਨਹੀਂ
- 403 — ਅਵੈਧ Bearer **ਜਾਂ** Bearer ਮੌਜੂਦ ਹੈ ਪਰ ਕੀ ਕੋਲ `manage` / `admin` ਸਕੋਪ ਨਹੀਂ ਹੈ

`hasManageScope(scopes)` `"manage"` ਜਾਂ `"admin"` ਲਈ true ਵਾਪਸ ਕਰਦਾ ਹੈ।

### ਪੈਟਰਨ 3 — ਸਰਵਜਨਿਕ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਸੂਚੀ ਵਿੱਚ ਜੋੜਨਾ

ਸਹੂਲਤ ਦੇ ਆਧਾਰ 'ਤੇ ਨਹੀਂ, ਸਗੋਂ ਆਕਾਰ ਦੇ ਆਧਾਰ 'ਤੇ ਸੈੱਟ ਚੁਣੋ। ਇੱਕ ਰੂਟ `PUBLIC_API_ROUTES_EXACT` ਵਿੱਚ ਜਾਂਦਾ ਹੈ (ਜਾਂ ਕੇਵਲ-GET ਲਈ `PUBLIC_READONLY_CORS_API_ROUTES` ਵਿੱਚ); ਕੇਵਲ ਇੱਕ ਅਸਲ ਸਬਟ੍ਰੀ ਹੀ `PUBLIC_API_ROUTE_PREFIXES` ਵਿੱਚ ਜਾਂਦੀ ਹੈ, ਅਤੇ ਇਸਦਾ ਅੰਤ `/` ਨਾਲ ਹੋਣਾ **ਲਾਜ਼ਮੀ ਹੈ**। ਪ੍ਰੀਫਿਕਸ ਸੂਚੀ ਵਿੱਚ ਇੱਕ ਇਕੱਲਾ ਰੂਟ ਪਾਉਣ ਨਾਲ ਉਹ ਸਾਰੇ ਨਾਲ ਲੱਗਦੇ ਪਾਥ ਵੀ ਸਰਵਜਨਿਕ ਹੋ ਜਾਂਦੇ ਹਨ ਜਿਨ੍ਹਾਂ ਦੇ ਸ਼ੁਰੂਆਤੀ ਅੱਖਰ ਇੱਕੋ ਹਨ — ਇਸ ਵਿੱਚ ਬਾਅਦ ਵਿੱਚ ਜੋੜੇ ਗਏ ਡਾਇਨਾਮਿਕ-ਸੈਗਮੈਂਟ ਸਿਬਲਿੰਗ ਵੀ ਸ਼ਾਮਲ ਹਨ (GHSA-74g9-q8f6-793h)। `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ਅਤੇ `tests/unit/authz/classify.test.ts` ਵਿੱਚ ਯੂਨਿਟ ਟੈਸਟ ਅੱਪਡੇਟ ਕਰੋ।

## ਸਕੋਪ

API ਕੁੰਜੀਆਂ ਵਿੱਚ ਇੱਕ `scopes` ਐਰੇ ਹੁੰਦਾ ਹੈ (JSON ਵਜੋਂ `api_keys.scopes` ਵਿੱਚ ਸਟੋਰ ਕੀਤਾ ਜਾਂਦਾ ਹੈ, `src/lib/db/apiKeys.ts` ਵੇਖੋ)।

### ਪ੍ਰਬੰਧਨ ਸਕੋਪ

- `manage` / `admin` — Bearer ਵਜੋਂ ਭੇਜੇ ਜਾਣ 'ਤੇ ਕੁੰਜੀ ਨੂੰ ਪ੍ਰਬੰਧਨ API ਐਂਡਪੌਇੰਟਾਂ ਤੱਕ ਪਹੁੰਚ ਦਿੰਦਾ ਹੈ।

### MCP ਸਕੋਪ (`src/shared/constants/mcpScopes.ts`)

ਹਰੇਕ MCP ਟੂਲ ਲਈ `MCP_TOOL_SCOPES` ਰਾਹੀਂ ਖਾਸ ਸਕੋਪ ਲੋੜੀਂਦੇ ਹਨ। ਪੂਰੀ ਸੂਚੀ (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts` ਵਿੱਚ ਸਕੋਪ ਲਾਗੂਕਰਨ, `resolveCallerScopeContext()` ਵੱਲੋਂ MCP ਪ੍ਰਮਾਣੀਕਰਨ ਜਾਣਕਾਰੀ,
ਬੇਨਤੀ ਮੈਟਾਡੇਟਾ, ਜਾਂ `OMNIROUTE_MCP_SCOPES` ਤੋਂ ਸਕੋਪ ਨਿਰਧਾਰਤ ਕੀਤੇ ਜਾਣ ਤੋਂ ਬਾਅਦ, ਹਰੇਕ ਟੂਲ ਦੀ ਸਕੋਪ ਸੂਚੀ
`evaluateToolScopes()` ਨੂੰ ਪਾਸ ਕਰਦਾ ਹੈ।

## ਪ੍ਰਮਾਣੀਕਰਨ ਲੋੜੀਂਦਾ ਟੌਗਲ

`src/shared/utils/apiAuth.ts` ਵਿੱਚ `isAuthRequired()` ਇਹ ਨਿਰਧਾਰਤ ਕਰਦਾ ਹੈ ਕਿ ਕਿਸੇ ਬੇਨਤੀ ਲਈ **ਕੋਈ ਵੀ** ਪ੍ਰਮਾਣੀਕਰਨ ਲਾਗੂ ਕੀਤਾ ਜਾਂਦਾ ਹੈ ਜਾਂ ਨਹੀਂ:

- `settings.requireLogin === false` → ਪ੍ਰਮਾਣੀਕਰਨ ਗਲੋਬਲ ਤੌਰ 'ਤੇ ਅਯੋਗ ਹੈ।
- ਕੋਈ ਪਾਸਵਰਡ ਸੰਰਚਿਤ ਨਹੀਂ ਹੈ **ਅਤੇ** ਕੋਈ `INITIAL_PASSWORD` ਵਾਤਾਵਰਣ ਵੇਰੀਏਬਲ ਨਹੀਂ ਹੈ → ਬੂਟਸਟਰੈਪ ਮੋਡ ਆਨਬੋਰਡਿੰਗ ਵਿਜ਼ਾਰਡ ਅਤੇ ਲੂਪਬੈਕ ਬੇਨਤੀਆਂ ਦੀ ਆਗਿਆ ਦਿੰਦਾ ਹੈ, ਪਰ ਨੈੱਟਵਰਕ 'ਤੇ ਉਪਲਬਧ ਬੇਨਤੀਆਂ ਲਈ ਫਿਰ ਵੀ ਪ੍ਰਮਾਣ-ਪੱਤਰ ਲੋੜੀਂਦੇ ਹਨ।
- ਕੋਈ ਵੀ DB ਗਲਤੀ → ਪਹੁੰਚ ਬੰਦ ਰੱਖਦਾ ਹੈ (ਮੂਲ ਰੂਪ ਵਿੱਚ ਸੁਰੱਖਿਅਤ)।

ਕਲਾਇੰਟ API ਕੁੰਜੀ ਲਾਗੂਕਰਨ `process.env.REQUIRE_API_KEY` ਨੂੰ ਸਿੱਧਾ ਪੜ੍ਹਨ ਦੀ ਬਜਾਏ `src/shared/utils/featureFlags.ts` ਵਿੱਚ `isRequireApiKeyEnabled()` ਦੀ ਵਰਤੋਂ ਕਰਦਾ ਹੈ। ਇਹ ਡਿਪਲੌਇ ਕੀਤੀਆਂ ਇੰਸਟੈਂਸਾਂ ਲਈ ਮਹੱਤਵਪੂਰਨ ਹੈ: Dashboard → Feature Flags ਵਿੱਚ `REQUIRE_API_KEY` ਨੂੰ ਟੌਗਲ ਕਰਨ ਨਾਲ DB ਓਵਰਰਾਈਡ ਸਟੋਰ ਹੁੰਦਾ ਹੈ ਅਤੇ ਇਹ ਤੁਰੰਤ `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*`, ਅਤੇ ਇਸ ਸਹਾਇਕ ਨੂੰ ਸਾਂਝਾ ਕਰਨ ਵਾਲੀਆਂ ਹੋਰ ਕਲਾਇੰਟ-API ਪ੍ਰਮਾਣੀਕਰਨ ਜਾਂਚਾਂ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰਦਾ ਹੈ। ਜੇ ਫੀਚਰ ਫਲੈਗ ਸਟੋਰ ਨੂੰ ਪੜ੍ਹਿਆ ਨਹੀਂ ਜਾ ਸਕਦਾ, ਤਾਂ ਕਲਾਇੰਟ API ਪ੍ਰਮਾਣੀਕਰਨ ਪਹੁੰਚ ਬੰਦ ਰੱਖਦਾ ਹੈ ਅਤੇ ਕੁੰਜੀ ਦੀ ਮੰਗ ਕਰਦਾ ਹੈ।

## ਅਸੰਗਤ ਤਬਦੀਲੀ — v3.8.0

`/api/v1/agents/tasks/*` ਅਤੇ `/api/resilience/model-cooldowns` ਐਂਡਪੌਇੰਟਾਂ ਲਈ **ਹੁਣ ਪ੍ਰਬੰਧਨ ਪ੍ਰਮਾਣੀਕਰਨ ਲੋੜੀਂਦਾ ਹੈ** (ਕਮਿਟ `588a0333`)। ਪਹਿਲਾਂ `manage` ਸਕੋਪ ਤੋਂ ਬਿਨਾਂ ਆਮ API ਕੁੰਜੀ ਭੇਜਣ ਵਾਲੇ ਕਲਾਇੰਟਾਂ ਨੂੰ `403` ਪ੍ਰਾਪਤ ਹੁੰਦਾ ਹੈ। ਮਾਈਗ੍ਰੇਸ਼ਨ: ਜਾਂ ਤਾਂ API Keys ਡੈਸ਼ਬੋਰਡ ਵਿੱਚ ਕੁੰਜੀ ਨੂੰ `manage` ਸਕੋਪ ਦਿਓ, ਜਾਂ ਲੌਗ-ਇਨ ਕੀਤੇ ਡੈਸ਼ਬੋਰਡ ਸੈਸ਼ਨ ਦੀ ਵਰਤੋਂ ਕਰੋ।

## ਵਿਵਹਾਰ ਤਬਦੀਲੀ — v3.8.2

`/api/mcp/*` (ਰਿਮੋਟ MCP ਸਰਵਰ) ਹਾਲੇ ਵੀ ਮੂਲ ਰੂਪ ਵਿੱਚ LOCAL_ONLY ਹੈ, ਪਰ ਹੁਣ ਇਹ ਗੈਰ-ਲੂਪਬੈਕ ਬੇਨਤੀਆਂ ਸਵੀਕਾਰ ਕਰਦਾ ਹੈ ਜਦੋਂ `Authorization: Bearer <api-key>` ਹੈਡਰ ਵਿੱਚ `manage` ਸਕੋਪ ਮੌਜੂਦ ਹੋਵੇ। ਇਸ ਛੋਟ ਨੂੰ `src/server/authz/routeGuard.ts` ਵਿੱਚ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ਰਾਹੀਂ ਹਰੇਕ ਪਾਥ ਲਈ ਸਪਸ਼ਟ ਤੌਰ 'ਤੇ ਨਿਯੰਤਰਿਤ ਕੀਤਾ ਗਿਆ ਹੈ; ਸਮਾਨ LOCAL_ONLY ਪ੍ਰੀਫਿਕਸ `/api/cli-tools/runtime/*` ਨੂੰ ਜਾਣ-ਬੁੱਝ ਕੇ ਬਾਈਪਾਸ ਨਹੀਂ ਕੀਤਾ ਜਾ ਸਕਦਾ, ਕਿਉਂਕਿ ਇਹ ਮਨਮਾਨੀਆਂ ਸਬ-ਪ੍ਰਕਿਰਿਆਵਾਂ ਸ਼ੁਰੂ ਕਰ ਸਕਦਾ ਹੈ। ਗੈਰ-ਲੂਪਬੈਕ ਤੋਂ `/api/mcp/*` ਲਈ ਅਗਿਆਤ ਬੇਨਤੀਆਂ ਨੂੰ ਅਜੇ ਵੀ `403 LOCAL_ONLY` ਮਿਲਦਾ ਹੈ — ਕਿਸੇ ਵੀ ਨਵੇਂ LOCAL_ONLY ਪਾਥ ਲਈ ਮੂਲ ਨੀਤੀ ਸਖ਼ਤ-ਲੂਪਬੈਕ ਹੀ ਰਹਿੰਦੀ ਹੈ। [ਰੂਟ ਗਾਰਡ ਪੱਧਰ](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) ਵੇਖੋ।

## ਟੈਸਟਿੰਗ

- ਯੂਨਿਟ ਟੈਸਟ: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`।
- ਜਨਤਕ ਮਨਜ਼ੂਰਸ਼ੁਦਾ ਸੂਚੀ: `tests/unit/public-api-routes.test.ts`।
- ਕੇਂਦ੍ਰਿਤ ਟੈਸਟ ਚਲਾਓ: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`।

## ਡੀਬੱਗਿੰਗ

ਪਾਈਪਲਾਈਨ ਹਮੇਸ਼ਾ ਜਵਾਬਾਂ ਉੱਤੇ ਇਹ ਮੁਹਰ ਲਗਾਉਂਦੀ ਹੈ:

```
x-request-id:               <ਸਹਿ-ਸੰਬੰਧ ID, ਗਲਤੀ ਦੇ ਮੁੱਖ ਭਾਗਾਂ ਵਿੱਚ ਦੁਹਰਾਈ ਜਾਂਦੀ ਹੈ>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ਪ੍ਰਮਾਣਿਤ ਬੇਨਤੀਆਂ ਲਈ ਅੱਪਸਟ੍ਰੀਮ (ਹੈਂਡਲਰ-ਪਾਸੇ ਦੇ) ਬੇਨਤੀ ਹੈਡਰਾਂ ਵਿੱਚ ਇਹ ਵੀ ਸ਼ਾਮਲ ਹੁੰਦਾ ਹੈ:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<ਆਖਰੀ-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ਵਿਕਲਪਿਕ)
x-omniroute-auth-scopes:    ਕੌਮਿਆਂ ਨਾਲ ਵੱਖ ਕੀਤੀ ਸੂਚੀ
```

ਹੈਂਡਲਰਾਂ ਦੇ ਅੰਦਰ `assertAuth(req, expectedClass)` ਦੀ ਵਰਤੋਂ ਕਰੋ — ਜੇ ਮਿਡਲਵੇਅਰ ਨੂੰ ਬਾਈਪਾਸ ਕੀਤਾ ਗਿਆ ਹੋਵੇ, ਤਾਂ ਇਹ `AUTHZ_NOT_INITIALIZED` ਕੋਡ ਨਾਲ `AuthzAssertionError` ਸੁੱਟਦਾ ਹੈ (ਟੈਸਟਾਂ ਵਿੱਚ ਕੌਂਫਿਗਰੇਸ਼ਨ ਰਿਗ੍ਰੈਸ਼ਨਾਂ ਨੂੰ ਫੜਨ ਲਈ ਲਾਭਦਾਇਕ)।

## ਇਹ ਵੀ ਵੇਖੋ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ਹਰ ਐਂਡਪੌਇੰਟ ਲਈ ਪ੍ਰਮਾਣੀਕਰਨ ਮਾਰਕਰ
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ਪ੍ਰਮਾਣੀਕਰਨ ਘਟਨਾਵਾਂ ਲਈ ਆਡਿਟ ਲੌਗ
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP ਸਕੋਪ ਲਾਗੂਕਰਨ ਦੇ ਵੇਰਵੇ
- ਸਰੋਤ: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
