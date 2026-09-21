# Authorization Guide (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/AUTHZ_GUIDE.md) · 🇪🇹 [am](../../../am/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇦 [ar](../../../ar/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇿 [az](../../../az/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇬 [bg](../../../bg/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇩 [bn](../../../bn/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇿 [cs](../../../cs/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇰 [da](../../../da/docs/architecture/AUTHZ_GUIDE.md) · 🇩🇪 [de](../../../de/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇷 [el](../../../el/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇸 [es](../../../es/docs/architecture/AUTHZ_GUIDE.md) · 🇪🇪 [et](../../../et/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇷 [fa](../../../fa/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇮 [fi](../../../fi/docs/architecture/AUTHZ_GUIDE.md) · 🇫🇷 [fr](../../../fr/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇪 [ga](../../../ga/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [gu](../../../gu/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ha](../../../ha/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇱 [he](../../../he/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [hi](../../../hi/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇷 [hr](../../../hr/docs/architecture/AUTHZ_GUIDE.md) · 🇭🇺 [hu](../../../hu/docs/architecture/AUTHZ_GUIDE.md) · 🇦🇲 [hy](../../../hy/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇩 [id](../../../id/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [ig](../../../ig/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇹 [it](../../../it/docs/architecture/AUTHZ_GUIDE.md) · 🇯🇵 [ja](../../../ja/docs/architecture/AUTHZ_GUIDE.md) · 🇬🇪 [ka](../../../ka/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇭 [km](../../../km/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇷 [ko](../../../ko/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇹 [lt](../../../lt/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇻 [lv](../../../lv/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ml](../../../ml/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [mr](../../../mr/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇾 [ms](../../../ms/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇹 [mt](../../../mt/docs/architecture/AUTHZ_GUIDE.md) · 🇲🇲 [my](../../../my/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇵 [ne](../../../ne/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇱 [nl](../../../nl/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇴 [no](../../../no/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [or](../../../or/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [pa](../../../pa/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇭 [phi](../../../phi/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇱 [pl](../../../pl/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇹 [pt](../../../pt/docs/architecture/AUTHZ_GUIDE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇴 [ro](../../../ro/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇺 [ru](../../../ru/docs/architecture/AUTHZ_GUIDE.md) · 🇱🇰 [si](../../../si/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇰 [sk](../../../sk/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇮 [sl](../../../sl/docs/architecture/AUTHZ_GUIDE.md) · 🇷🇸 [sr](../../../sr/docs/architecture/AUTHZ_GUIDE.md) · 🇸🇪 [sv](../../../sv/docs/architecture/AUTHZ_GUIDE.md) · 🇰🇪 [sw](../../../sw/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [ta](../../../ta/docs/architecture/AUTHZ_GUIDE.md) · 🇮🇳 [te](../../../te/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇭 [th](../../../th/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇷 [tr](../../../tr/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/AUTHZ_GUIDE.md) · 🇵🇰 [ur](../../../ur/docs/architecture/AUTHZ_GUIDE.md) · 🇺🇿 [uz](../../../uz/docs/architecture/AUTHZ_GUIDE.md) · 🇻🇳 [vi](../../../vi/docs/architecture/AUTHZ_GUIDE.md) · 🇳🇬 [yo](../../../yo/docs/architecture/AUTHZ_GUIDE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/AUTHZ_GUIDE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/AUTHZ_GUIDE.md)

---

> **ಸತ್ಯದ ಮೂಲ:** `src/server/authz/`, `src/shared/constants/publicApiRoutes.ts`, `src/lib/api/requireManagementAuth.ts`, `src/shared/utils/apiAuth.ts`
> **ಕೊನೆಯದಾಗಿ ನವೀಕರಿಸಿದ್ದು:** 2026-06-28 — v3.8.40

OmniRoute ಪ್ರತಿ API ವಿನಂತಿಯನ್ನೂ ನಿಯಂತ್ರಿಸುವ, ರೂಟ್-ಅರಿವುಳ್ಳ ಅಧಿಕಾರ ನಿರ್ಣಯ ಪೈಪ್ಲೈನ್ ಅನ್ನು ಹೊಂದಿದೆ. ವರ್ಗೀಕರಣವು **ನಿರ್ಣಾಯಕ** ಮತ್ತು **ವಿಫಲವಾದಾಗ-ಮುಚ್ಚುವ** ಸ್ವರೂಪದ್ದಾಗಿದೆ — ವರ್ಗೀಕರಿಸಲಾಗದ ಯಾವುದೂ ಅಂತಿಮವಾಗಿ `MANAGEMENT` ಆಗಿ ಪರಿಗಣಿಸಲ್ಪಟ್ಟು, ಸೆಷನ್ ಅಥವಾ ನಿರ್ವಹಣಾ-ದರ್ಜೆಯ ಟೋಕನ್ ಅನ್ನು ಕಡ್ಡಾಯಗೊಳಿಸುತ್ತದೆ. ರೂಟ್ಗಳನ್ನು ನಿರ್ವಹಿಸುವ ಅಥವಾ ಹೊಸ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳನ್ನು ವಿನ್ಯಾಸಗೊಳಿಸುವ ಎಂಜಿನಿಯರ್ಗಳಿಗಾಗಿ ಈ ಪುಟವು ಮಾದರಿಯನ್ನು ವಿವರಿಸುತ್ತದೆ.

![AuthZ ಪೈಪ್ಲೈನ್ (3 ರೂಟ್ ವರ್ಗಗಳು + ನೀತಿ ಮೌಲ್ಯಮಾಪನ)](../diagrams/exported/authz-pipeline.svg)

> ಮೂಲ: [diagrams/authz-pipeline.mmd](../diagrams/authz-pipeline.mmd)

## ಎರಡು ದೃಢೀಕರಣ ವಿಧಾನಗಳು

### 1. API ಕೀ (Bearer)

OpenAI/Anthropic/Gemini-ಹೊಂದಾಣಿಕೆಯ ಕ್ಲೈಂಟ್ APIಗಳಿಗೆ ಮತ್ತು ಕೀ `manage` ವ್ಯಾಪ್ತಿಯನ್ನು ಹೊಂದಿರುವಾಗ ಕೆಲವು ನಿರ್ವಹಣಾ ರೂಟ್ಗಳಿಗೆ ಬಳಸಲಾಗುತ್ತದೆ.

```
Authorization: Bearer <api-key>
```

`src/sse/services/auth.ts` ನಲ್ಲಿರುವ `isValidApiKey()` / `extractApiKey()` ಮೂಲಕ ಮೌಲ್ಯೀಕರಿಸಲಾಗುತ್ತದೆ ಮತ್ತು `src/shared/utils/apiAuth.ts` ಮೂಲಕ ಮರು-ರಫ್ತು ಮಾಡಲಾಗುತ್ತದೆ. ಮೌಲ್ಯೀಕಾರಕವು `OMNIROUTE_API_KEY` / `ROUTER_API_KEY` ಪರಿಸರ ವೇರಿಯಬಲ್ಗಳನ್ನು ಶಾಶ್ವತ ಪಾಸ್ಥ್ರೂ ಕೀಗಳಾಗಿಯೂ ಸ್ವೀಕರಿಸುತ್ತದೆ (ಸಮಸ್ಯೆ #1350).

### 2. ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್ (auth_token ಕುಕಿ)

ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪುಟಗಳು ಮತ್ತು ನಿರ್ವಾಹಕ ಕಾರ್ಯಾಚರಣೆಗಳಿಗಾಗಿ.

```
Cookie: auth_token=<JWT signed with JWT_SECRET>
```

JWT ಪರಿಶೀಲನೆಯಲ್ಲಿ ಯಶಸ್ವಿಯಾಗಿ **ಮತ್ತು** `authenticated: true` ಅನ್ನು ಹೊಂದಿದ್ದಾಗ ಮಾತ್ರ ಕುಕಿಯನ್ನು ಸೆಷನ್ ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ
(`src/shared/utils/dashboardSessionToken.ts` → `verifyDashboardSessionToken`). ಕುಕಿಯ ಪ್ರತಿಯೊಂದು
ಬಳಕೆದಾರವೂ (ರೂಟ್ ಗಾರ್ಡ್, authz ಪೈಪ್ಲೈನ್ ರಿಫ್ರೆಶ್, WebSocket ಹ್ಯಾಂಡ್ಶೇಕ್, ಲೈವ್
ಸರ್ವರ್, `/api/settings/require-login`, `/api/auth/status`) ಆ ಸಹಾಯಕದ ಮೂಲಕವೇ ಸಾಗುತ್ತದೆ.
`JWT_SECRET` ನೊಂದಿಗೆ ಸಹಿ ಮಾಡಲಾದ ಇತರ JWTಗಳೂ ಅಸ್ತಿತ್ವದಲ್ಲಿವೆ — Cursor CLI ಪಾಸ್ಥ್ರೂ,
ಕೀ ಹೊಂದಿರುವವರಿಗಾಗಿ `iss "omniroute" / aud "cursor-cli"` ಟೋಕನ್ಗಳನ್ನು ಸೃಷ್ಟಿಸುತ್ತದೆ — ಮತ್ತು ಅವುಗಳನ್ನು ಎಂದಿಗೂ ಸೆಷನ್ಗಳೆಂದು ಪರಿಗಣಿಸಲಾಗುವುದಿಲ್ಲ
(#13298).

`src/shared/utils/apiAuth.ts` ನಲ್ಲಿರುವ `isDashboardSessionAuthenticated()` ಮೂಲಕ ಪರಿಶೀಲಿಸಲಾಗುತ್ತದೆ. JWTಯ 30-ದಿನಗಳ ಜೀವಿತಾವಧಿಯಲ್ಲಿ 7 ದಿನಗಳಿಗಿಂತ ಕಡಿಮೆ ಸಮಯ ಉಳಿದಿದ್ದರೆ ಪೈಪ್ಲೈನ್ ಅದನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ರಿಫ್ರೆಶ್ ಮಾಡುತ್ತದೆ.

ಕೆಲವು ನಿರ್ವಹಣಾ ರೂಟ್ಗಳು **ಎರಡರಲ್ಲಿ ಯಾವುದಾದರೂ ಒಂದನ್ನು** ಸ್ವೀಕರಿಸುತ್ತವೆ: ಕುಕಿ ಅಥವಾ API ಕೀ `manage` (ಅಥವಾ `admin`) ವ್ಯಾಪ್ತಿಯನ್ನು ಹೊಂದಿರುವಾಗ `Bearer <key>`. v3.8 ನಲ್ಲಿ ಸೇರಿಸಲಾದ "API ಕರೆಗಳ ಮೂಲಕ ಸಂರಚಿಸಬಹುದಾದ" ಕಾರ್ಯವಿಧಾನವನ್ನು ಇದೇ ಸಾಧ್ಯವಾಗಿಸುತ್ತದೆ.

#### ಐಚ್ಛಿಕ OIDC ಲಾಗಿನ್ ಗೇಟ್ (#6973)

ಡ್ಯಾಶ್ಬೋರ್ಡ್ ನಿರ್ವಾಹಕ ಲಾಗಿನ್, ಡೀಫಾಲ್ಟ್ ಪಾಸ್ವರ್ಡ್ ಲಾಗಿನ್ ಜೊತೆಗೆ **ಆಯ್ಕೆಮಾಡಬಹುದಾದ** OIDC (OpenID Connect) ಹರಿವನ್ನೂ ಬೆಂಬಲಿಸುತ್ತದೆ — ಪಾಸ್ವರ್ಡ್ ಲಾಗಿನ್ ಅನ್ನು ಎಂದಿಗೂ ತೆಗೆದುಹಾಕಲಾಗುವುದಿಲ್ಲ, ಅದಕ್ಕೆ ಪೂರಕವಾಗಿ ಮಾತ್ರ ಇದನ್ನು ಸೇರಿಸಲಾಗುತ್ತದೆ:

- `settings.oidcEnabled === true` ಆಗಿದ್ದು **ಮತ್ತು** `oidcIssuer` /
  `oidcClientId` / `oidcClientSecret` ಎಲ್ಲವೂ ಸಂರಚಿಸಲ್ಪಟ್ಟಿದ್ದರೆ ಮಾತ್ರ ಇದು ಸಕ್ರಿಯವಾಗಿರುತ್ತದೆ (Settings → Auth).
  ಇಲ್ಲದಿದ್ದರೆ `GET /api/auth/oidc/login` `400` ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ.
- `GET /api/auth/oidc/login`, ವಿತರಕರ
  `/.well-known/openid-configuration` ನಿಂದ `authorization_endpoint` ಅನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತದೆ (`<issuer>/authorize`
  ಗೆ ಫಾಲ್ಬ್ಯಾಕ್ ಆಗುತ್ತದೆ), ಒಳಬರುವ ವಿನಂತಿಯಿಂದ ಮರುನಿರ್ದೇಶನ URI ಅನ್ನು ನಿರ್ಮಿಸುತ್ತದೆ
  (`x-forwarded-proto`-ಅರಿವುಳ್ಳದ್ದು), ಮತ್ತು `httpOnly` `oidc_state` ಕುಕಿಯಲ್ಲಿ ಸಂಗ್ರಹಿಸಲಾದ ಯಾದೃಚ್ಛಿಕ `state`
  ಜೊತೆಗೆ IdPಗೆ ಮರುನಿರ್ದೇಶಿಸುತ್ತದೆ.
- `GET /api/auth/oidc/callback`, `state` ಅನ್ನು ಮೌಲ್ಯೀಕರಿಸುತ್ತದೆ, ಅಧಿಕಾರ ನಿರ್ಣಯ
  ಕೋಡ್ ಅನ್ನು ವಿನಿಮಯ ಮಾಡುತ್ತದೆ ಮತ್ತು ವಿತರಕರ JWKS ಮೂಲಕ ID ಟೋಕನ್ನ ಸಹಿಯನ್ನು
  (`jose` ನ `createRemoteJWKSet`, ಪ್ರತಿ JWKS URIಗೆ ಕ್ಯಾಶ್ ಮಾಡಲಾಗುತ್ತದೆ) `issuer`/`audience`
  ಪರಿಶೀಲನೆಗಳೊಂದಿಗೆ ಪರಿಶೀಲಿಸುತ್ತದೆ. ಐಚ್ಛಿಕ `oidcAllowedSubjects` ಅನುಮತಿ ಪಟ್ಟಿಯು ಟೋಕನ್ನ
  `sub` ಕ್ಲೇಮ್ ಅಥವಾ ಅದರ `email` ಕ್ಲೇಮ್ಗೆ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ — `email_verified === true` ಆಗಿದ್ದಾಗ ಮಾತ್ರ
  ಇಮೇಲ್ ಕ್ಲೇಮ್ ಅನ್ನು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ IdPಯಲ್ಲಿ ಪರಿಶೀಲಿಸದ ಇಮೇಲ್ ಎಂದಿಗೂ
  ಗೇಟ್ ಅನ್ನು ದಾಟಲು ಸಾಧ್ಯವಿಲ್ಲ.
- ಯಶಸ್ವಿಯಾದಾಗ, ಪಾಸ್ವರ್ಡ್ ಲಾಗಿನ್ ನೀಡುವ **ಅದೇ ನಿಖರವಾದ** 30-ದಿನಗಳ `auth_token` JWTಯನ್ನು
  ಇದು ಸೃಷ್ಟಿಸುತ್ತದೆ (`src/app/api/auth/login/route.ts`), ಆದ್ದರಿಂದ ಉಳಿದ
  ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್ ಪೈಪ್ಲೈನ್ (ಸ್ವಯಂ-ರಿಫ್ರೆಶ್, ಕುಕಿ ಫ್ಲ್ಯಾಗ್ಗಳು) ಬದಲಾಗುವುದಿಲ್ಲ —
  OIDC, ಕುಕಿಯನ್ನು ಹೇಗೆ ಸೃಷ್ಟಿಸಲಾಗುತ್ತದೆ ಎಂಬುದನ್ನು ಮಾತ್ರ ಬದಲಿಸುತ್ತದೆ; ಅದು ಏನನ್ನು ಅನುಮತಿಸುತ್ತದೆ ಎಂಬುದನ್ನಲ್ಲ.

## ರೂಟ್ ವರ್ಗಗಳು

`src/server/authz/types.ts` ಮೂರು ವರ್ಗಗಳನ್ನು ವ್ಯಾಖ್ಯಾನಿಸುತ್ತದೆ; ನಿರ್ಣಾಯಕವಾಗಿ ವರ್ಗೀಕರಿಸಲಾಗದ ಯಾವುದೇ ರೂಟ್ಗೆ `MANAGEMENT` ಅನ್ನು ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ಬಳಸಲಾಗುತ್ತದೆ.

| ವರ್ಗ         | ವಿವರಣೆ                                                                                                                                                          | ದೃಢೀಕರಣ ಅಗತ್ಯ                                                         |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `PUBLIC`     | ಸ್ಪಷ್ಟವಾಗಿ ಸುರಕ್ಷಿತವಾದ ರೂಟ್ಗಳು — ಲಾಗಿನ್, ಲಾಗ್ಔಟ್, ಸ್ಥಿತಿ, ಪ್ರಾರಂಭ, ಆರೋಗ್ಯ ಪರಿಶೀಲನೆ, ಆನ್ಬೋರ್ಡಿಂಗ್ ಬೂಟ್ಸ್ಟ್ರ್ಯಾಪ್.                                                | ಯಾವುದೂ ಇಲ್ಲ                                                           |
| `CLIENT_API` | ಮಾಡೆಲ್ ಒದಗಿಸುವ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳು — `/api/v1/*`, `/api/v1beta/*`, ಜೊತೆಗೆ `/v1/*`, `/v1beta/*`, `/chat/completions`, `/responses`, `/models`, `/codex/*` ಅಲಿಯಾಸ್ಗಳು. | ಪರಿಣಾಮಕಾರಿ `REQUIRE_API_KEY` ಫೀಚರ್ ಫ್ಲ್ಯಾಗ್ ಸಕ್ರಿಯವಾಗಿರುವಾಗ Bearer ಕೀ |
| `MANAGEMENT` | ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪುಟಗಳು, ಸೆಟ್ಟಿಂಗ್ಗಳು, ಪ್ರೊವೈಡರ್ಗಳು, ಕೀಗಳು, ನಿರ್ವಾಹಕ ಮತ್ತು ಡಯಾಗ್ನೋಸ್ಟಿಕ್ಸ್ ಎಂಡ್ಪಾಯಿಂಟ್ಗಳು.                                                          | ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್ ಅಥವಾ `manage` ಸ್ಕೋಪ್ ಹೊಂದಿರುವ Bearer               |

## ಪೈಪ್ಲೈನ್

```
ಒಳಬರುವ ವಿನಂತಿ → src/proxy.ts
  → src/server/authz/pipeline.ts ನಲ್ಲಿರುವ runAuthzPipeline()
    1. ವಿಶ್ವಾಸಾರ್ಹ ಆಂತರಿಕ ಹೆಡರ್ಗಳನ್ನು ತೆಗೆದುಹಾಕಿ (x-omniroute-auth-*, x-omniroute-route-class)
    2. ವಿನಂತಿ id ರಚಿಸಿ, classifyRoute() ಮೂಲಕ ರೂಟ್ ಅನ್ನು ವರ್ಗೀಕರಿಸಿ
    3. pathname == "/" ಆಗಿದ್ದರೆ → /dashboard ಗೆ ಮರುನಿರ್ದೇಶಿಸಿ
    4. ಡ್ರೇನಿಂಗ್ (ಸಮರ್ಪಕ ಸ್ಥಗಿತಗೊಳಿಸುವಿಕೆ) ಸ್ಥಿತಿಯಲ್ಲಿದ್ದು /api/* ಆಗಿದ್ದರೆ → 503
    5. GET ಅಲ್ಲದ /api/* ಆಗಿದ್ದರೆ → checkBodySize() ಗಾರ್ಡ್
    6. OPTIONS ಆಗಿದ್ದರೆ → CORS ಪ್ರೀಫ್ಲೈಟ್ 204
    7. options.enforce == false ಆಗಿದ್ದರೆ → ರೂಟ್-ವರ್ಗದ ಹೆಡರ್ಗಳೊಂದಿಗೆ ನೇರವಾಗಿ ಮುಂದಕ್ಕೆ ಕಳುಹಿಸಿ
    8. ಇಲ್ಲದಿದ್ದರೆ: POLICIES[routeClass].evaluate(ctx)
       - ಅನುಮತಿಸಿ → x-omniroute-auth-{kind,id,label,scopes} ಮುದ್ರಿಸಿ → NextResponse.next()
       - ತಿರಸ್ಕರಿಸಿ → correlation_id ಹೊಂದಿರುವ JSON ದೋಷ (ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪುಟಗಳು → 302 /login)
```

ವಿಶ್ವಾಸಾರ್ಹ ಆಂತರಿಕ ಹೆಡರ್ಗಳನ್ನು (`src/server/authz/headers.ts` ನಲ್ಲಿ ವ್ಯಾಖ್ಯಾನಿಸಲಾಗಿದೆ) ವರ್ಗೀಕರಣಕ್ಕೂ ಮೊದಲು **ಒಳಬರುವ ವಿನಂತಿಗಳಿಂದ ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ** — ಒಂದು ಸಬ್ಜೆಕ್ಟ್ನಂತೆ ಸೋಗು ಹಾಕಲು ಕ್ಲೈಂಟ್ಗಳು `x-omniroute-auth-*` ಅನ್ನು ಮುಂಚಿತವಾಗಿ ತುಂಬಲು ಸಾಧ್ಯವಿಲ್ಲ.

### ಪಾಲಿಸಿ ಒಪ್ಪಂದಗಳು

ಪ್ರತಿಯೊಂದು ರೂಟ್ ವರ್ಗವು `src/server/authz/policies/` ನಲ್ಲಿ ಒಂದು ಪಾಲಿಸಿಯನ್ನು ಹೊಂದಿದೆ:

- **`publicPolicy`** (`policies/public.ts`) — ಯಾವಾಗಲೂ `allow({ kind: "anonymous", id: "anonymous" })` ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ.
- **`clientApiPolicy`** (`policies/clientApi.ts`) — Bearer ಅನ್ನು ಹೊರತೆಗೆದು, `validateApiKey()` ಮೂಲಕ ಮೌಲ್ಯೀಕರಿಸುತ್ತದೆ. ಪರಿಣಾಮಕಾರಿ `REQUIRE_API_KEY` ಫೀಚರ್ ಫ್ಲ್ಯಾಗ್ ನಿಷ್ಕ್ರಿಯವಾಗಿರುವಾಗ ಮಾತ್ರ ಅನಾಮಧೇಯ ಬಳಕೆಗೆ ಮುಂದುವರಿಯುತ್ತದೆ. ಪರಿಣಾಮಕಾರಿ ಫ್ಲ್ಯಾಗ್ ಅನ್ನು `isRequireApiKeyEnabled()` (`DB ಫೀಚರ್ ಫ್ಲ್ಯಾಗ್ ಓವರ್ರೈಡ್ > process.env.REQUIRE_API_KEY > ಡೀಫಾಲ್ಟ್`) ಮೂಲಕ ನಿರ್ಧರಿಸಲಾಗುತ್ತದೆ; ಆದ್ದರಿಂದ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಫೀಚರ್ ಫ್ಲ್ಯಾಗ್ಗಳು ಮತ್ತು ಎನ್ವಿರಾನ್ಮೆಂಟ್ ವೇರಿಯಬಲ್ಗಳು `/api/v1/*`, `/api/v1beta/*`, ಮತ್ತು ಅಲಿಯಾಸ್ಗಳನ್ನು ಏಕರೂಪವಾಗಿ ನಿಯಂತ್ರಿಸುತ್ತವೆ; ರಿಸಲ್ವರ್ ವೈಫಲ್ಯಗಳ ಸಂದರ್ಭದಲ್ಲಿ ಪ್ರವೇಶವನ್ನು ನಿರಾಕರಿಸಲಾಗುತ್ತದೆ. ಕ್ಲೈಂಟ್ API ರೂಟ್ಗಳಲ್ಲಿ ಡ್ಯಾಶ್ಬೋರ್ಡ್-ಸೆಷನ್ ವಿನಂತಿಗಳನ್ನು ಅನುಮತಿಸುತ್ತದೆ (ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಮಾಡೆಲ್ ಕ್ಯಾಟಲಾಗ್ ಬಳಸುವ `/api/v1/models` ಸೇರಿದಂತೆ).
- **`managementPolicy`** (`policies/management.ts`) — ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್, ಆಂತರಿಕ ಮಾಡೆಲ್-ಸಿಂಕ್ ವಿನಂತಿಗಳನ್ನು (`/api/providers/[name]/(sync-models|models)` ಗೆ ಹೊಂದಾಣಿಕೆ ಮಾಡಲಾಗುತ್ತದೆ) ಸ್ವೀಕರಿಸುತ್ತದೆ, ಅಥವಾ `isAuthRequired()` false ಅನ್ನು ಹಿಂದಿರುಗಿಸಿದರೆ ಸಂಪೂರ್ಣವಾಗಿ ಬಿಟ್ಟುಬಿಡುತ್ತದೆ. Bearer ಟೋಕನ್ ಇದ್ದರೂ ಅದು ಅಮಾನ್ಯವಾಗಿದ್ದರೆ 403 (`AUTH_001`), ಇಲ್ಲದಿದ್ದರೆ 401 ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ. ಯಾವುದೇ ದೃಢೀಕರಣ ಶಾಖೆಗೂ ಮೊದಲು ರೂಟ್-ಗಾರ್ಡ್ ಶ್ರೇಣಿಗಳನ್ನೂ (LOCAL_ONLY / ALWAYS_PROTECTED) ಜಾರಿಗೊಳಿಸುತ್ತದೆ — [ರೂಟ್ ಗಾರ್ಡ್ ಶ್ರೇಣಿಗಳು](../security/ROUTE_GUARD_TIERS.md) ನೋಡಿ. `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ನಲ್ಲಿರುವ LOCAL_ONLY ಪಥಗಳನ್ನು (ಪ್ರಸ್ತುತ: `/api/mcp/`) Bearer ಕೀ `manage` ಸ್ಕೋಪ್ ಹೊಂದಿರುವಾಗ ಲೂಪ್ಬ್ಯಾಕ್ ಅಲ್ಲದ ಮೂಲದಿಂದ ಪ್ರವೇಶಿಸಬಹುದು; ಸ್ಕೋಪ್ ಯಾವುದೇ ಆಗಿರಲಿ, ಉಳಿದ ಎಲ್ಲ LOCAL_ONLY ಪಥಗಳು ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಲೂಪ್ಬ್ಯಾಕ್ಗೆ ಮಾತ್ರ ಸೀಮಿತವಾಗಿರುತ್ತವೆ.

ಯಶಸ್ವಿಯಾದ ಪಾಲಿಸಿಯು `kind ∈ { client_api_key, dashboard_session, management_key, anonymous }` ಹೊಂದಿರುವ `AuthSubject` ಅನ್ನು ಹಿಂದಿರುಗಿಸುತ್ತದೆ. ಡೌನ್ಸ್ಟ್ರೀಮ್ ಹ್ಯಾಂಡ್ಲರ್ಗಳು ದೃಢೀಕರಣ ಲಾಜಿಕ್ ಅನ್ನು ಮರುಚಾಲನೆ ಮಾಡುವ ಬದಲು `src/server/authz/assertAuth.ts` ನಲ್ಲಿರುವ `assertAuth(request, "CLIENT_API")` ಮೂಲಕ ಅದನ್ನು ಓದಬಹುದು.

## ಸಾರ್ವಜನಿಕ ರೂಟ್ಗಳ ಪಟ್ಟಿ

`src/shared/constants/publicApiRoutes.ts` ಸ್ಪಷ್ಟವಾದ ಅನುಮತಿ ಪಟ್ಟಿಯಾಗಿದೆ:

ಪಟ್ಟಿಯನ್ನು **ಆಕಾರದ** ಆಧಾರದ ಮೇಲೆ ವಿಭಜಿಸಲಾಗಿದೆ ಮತ್ತು ಈ ವಿಭಜನೆ ಅತ್ಯಗತ್ಯವಾಗಿದೆ (GHSA-74g9-q8f6-793h): ಪ್ರಿಫಿಕ್ಸ್ ಅನ್ನು
`startsWith()` ಬಳಸಿ ಹೊಂದಿಸಲಾಗುತ್ತದೆ, ಆದ್ದರಿಂದ ಅದು ತನ್ನ ಆರಂಭಿಕ ಅಕ್ಷರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಪ್ರತಿಯೊಂದು ಪಕ್ಕದ ಪಥಕ್ಕೂ ಹೊಂದಿಕೆಯಾಗುತ್ತದೆ.
`/api/usage/om-usage` ಅನ್ನು ಪ್ರಿಫಿಕ್ಸ್ ಆಗಿ ಬಳಸಿದಾಗ `/api/usage/om-usage<anything>` ಅನ್ನು PUBLIC ಎಂದು ಗುರುತಿಸಲಾಗುತ್ತಿತ್ತು ಮತ್ತು Next ಅದನ್ನು
`/api/usage/[connectionId]` ಗೆ ಪರಿಹರಿಸುತ್ತದೆ — ತನ್ನದೇ ಆದ auth ಇಲ್ಲದ ಹ್ಯಾಂಡ್ಲರ್.

```ts
// ನಿಜವಾದ ಉಪವೃಕ್ಷಗಳು. ಪ್ರತಿಯೊಂದು ನಮೂದು "/" ನೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳಲೇಬೇಕು (ಯೂನಿಟ್ ಪರೀಕ್ಷೆಯಿಂದ ದೃಢಪಡಿಸಲಾಗಿದೆ).
PUBLIC_API_ROUTE_PREFIXES = [
  "/api/auth/oidc/",
  "/api/v1/", // classify ನಲ್ಲಿ CLIENT_API ಎಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ, "no-auth public" ಎಂದು ಅಲ್ಲ
  "/api/oauth/",
  "/api/codex/connect/",
  "/api/telegram/",
  "/api/cursor-cli/",
];

// ಒಂದೇ ರೂಟ್ಗಳು, ನಿಖರವಾಗಿ ಹೊಂದಿಸಲಾಗುತ್ತದೆ (ಕೊನೆಯಲ್ಲಿ ಸ್ಲ್ಯಾಶ್ ಇದ್ದರೂ ಅಥವಾ ಇಲ್ಲದಿದ್ದರೂ).
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

// CORS ಮೂಲದ ಸಡಿಲಿಕೆಯನ್ನೂ ಪಡೆಯುವ ಓದಲು-ಮಾತ್ರದ ಒಂದೇ ರೂಟ್ಗಳು.
PUBLIC_READONLY_CORS_API_ROUTES = [
  "/api/health/ping",
  "/api/monitoring/health",
  "/api/settings/require-login",
];

// CORS ಸಡಿಲಿಕೆ ಇಲ್ಲದ ಓದಲು-ಮಾತ್ರದ ಒಂದೇ ರೂಟ್.
PUBLIC_READONLY_API_ROUTES_EXACT = new Set(["/api/health"]);

PUBLIC_READONLY_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);
```

ಓದಲು-ಮಾತ್ರದ ರೂಟ್ಗಳು ಸುರಕ್ಷಿತ ವಿಧಾನಗಳಿಗೆ **ಮಾತ್ರ** ಸಾರ್ವಜನಿಕವಾಗಿರುತ್ತವೆ. ಗಮನಿಸಿ: `classifyRoute()` PUBLIC ಫಾಲ್-ಥ್ರೂನಿಂದ `/api/v1/*` ಮತ್ತು `/api/v1beta/*` ಅನ್ನು ಹೊರತುಪಡಿಸುತ್ತದೆ — ಇವು ಯಾವಾಗಲೂ `CLIENT_API` ಆಗಿರುವುದರಿಂದ Bearer-ಕೀ ನೀತಿಯು ಇನ್ನೂ ಅನ್ವಯಿಸುತ್ತದೆ.

## ಹೊಸ ರೂಟ್ ಸೇರಿಸುವುದು

### ಮಾದರಿ 1 — ಸಾರ್ವಜನಿಕ ಕ್ಲೈಂಟ್ API ಎಂಡ್ಪಾಯಿಂಟ್ (Bearer-auth)

`/api/v1/` ಮತ್ತು `/api/v1beta/` ಅಡಿಯಲ್ಲಿರುವ ರೂಟ್ಗಳನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ `CLIENT_API` ಎಂದು ವರ್ಗೀಕರಿಸಲಾಗುತ್ತದೆ. ಮಿಡಲ್ವೇರ್ Bearer ಪರಿಶೀಲನೆಯನ್ನು ಜಾರಿಗೊಳಿಸುತ್ತದೆ; ರೂಟ್ ಹ್ಯಾಂಡ್ಲರ್ಗಳು ಅದನ್ನು ಮರುಮಾಡುವ ಅಗತ್ಯವಿಲ್ಲ, ಆದರೆ ಉಪಯುಕ್ತವಾಗಿದ್ದರೆ subject ಅನ್ನು ಓದಬಹುದು.

```typescript
// src/app/api/v1/your-route/route.ts
import { NextRequest, NextResponse } from "next/server";
import { assertAuth } from "@/server/authz/assertAuth";

export async function POST(req: NextRequest) {
  const subject = assertAuth(req, "CLIENT_API");
  // subject.kind === "client_api_key" | "anonymous" | "dashboard_session"
  // ... ಹ್ಯಾಂಡ್ಲರ್ ತರ್ಕ
}
```

### ಮಾದರಿ 2 — ನಿರ್ವಹಣಾ ಎಂಡ್ಪಾಯಿಂಟ್ (ಸೆಷನ್ ಅಥವಾ Bearer + manage)

`src/lib/api/requireManagementAuth.ts` ನಿಂದ `requireManagementAuth()` ಅನ್ನು ಬಳಸಿ:

```typescript
import { requireManagementAuth } from "@/lib/api/requireManagementAuth";

export async function POST(request: Request) {
  const rejection = await requireManagementAuth(request);
  if (rejection) return rejection;
  // ... ಹ್ಯಾಂಡ್ಲರ್ ತರ್ಕ
}
```

ಯಶಸ್ವಿಯಾದಾಗ `requireManagementAuth()` `null` ಅನ್ನು ಅಥವಾ JSON ದೋಷದ `Response` ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ:

- 401 `AUTH_001` "ದೃಢೀಕರಣ ಅಗತ್ಯವಿದೆ" — ಯಾವುದೇ ರುಜುವಾತುಗಳಿಲ್ಲ
- 403 — ಅಮಾನ್ಯ Bearer **ಅಥವಾ** Bearer ಇದೆ, ಆದರೆ ಕೀ `manage` / `admin` ಸ್ಕೋಪ್ ಅನ್ನು ಹೊಂದಿಲ್ಲ

`hasManageScope(scopes)` `"manage"` ಅಥವಾ `"admin"` ಗೆ true ಅನ್ನು ಹಿಂತಿರುಗಿಸುತ್ತದೆ.

### ಮಾದರಿ 3 — ಸಾರ್ವಜನಿಕ ಅನುಮತಿ ಪಟ್ಟಿಗೆ ಸೇರಿಸುವುದು

ಅನುಕೂಲತೆಯ ಆಧಾರದ ಮೇಲೆ ಅಲ್ಲ, ಆಕಾರದ ಆಧಾರದ ಮೇಲೆ ಸೆಟ್ ಅನ್ನು ಆಯ್ಕೆಮಾಡಿ. ಒಂದೇ ರೂಟ್ ಅನ್ನು `PUBLIC_API_ROUTES_EXACT` ನಲ್ಲಿ (ಅಥವಾ GET-ಮಾತ್ರಕ್ಕಾಗಿ `PUBLIC_READONLY_CORS_API_ROUTES` ನಲ್ಲಿ) ಇರಿಸಬೇಕು; ನಿಜವಾದ ಉಪವೃಕ್ಷವನ್ನು ಮಾತ್ರ `PUBLIC_API_ROUTE_PREFIXES` ನಲ್ಲಿ ಇರಿಸಬೇಕು ಮತ್ತು ಅದು **`/` ನೊಂದಿಗೆ ಕೊನೆಗೊಳ್ಳಲೇಬೇಕು**. ಒಂದೇ ರೂಟ್ ಅನ್ನು ಪ್ರಿಫಿಕ್ಸ್ ಪಟ್ಟಿಯಲ್ಲಿ ಇರಿಸುವುದರಿಂದ ಅದರ ಆರಂಭಿಕ ಅಕ್ಷರಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ಪ್ರತಿಯೊಂದು ಪಕ್ಕದ ಪಥವೂ ಪ್ರಕಟವಾಗುತ್ತದೆ — ನಂತರ ಸೇರಿಸಲಾದ ಡೈನಾಮಿಕ್-ಸೆಗ್ಮೆಂಟ್ ಸಿಬ್ಲಿಂಗ್ಗಳೂ ಇದರಲ್ಲಿ ಸೇರಿವೆ (GHSA-74g9-q8f6-793h). `tests/unit/public-api-routes.test.ts`, `tests/unit/authz/public-route-exact-match.test.ts` ಮತ್ತು `tests/unit/authz/classify.test.ts` ನಲ್ಲಿರುವ ಯೂನಿಟ್ ಪರೀಕ್ಷೆಗಳನ್ನು ನವೀಕರಿಸಿ.

## ಸ್ಕೋಪ್ಗಳು

API ಕೀಗಳು `scopes` ಅರೆ ಅನ್ನು ಹೊಂದಿರುತ್ತವೆ (`api_keys.scopes` ನಲ್ಲಿ JSON ಆಗಿ ಸಂಗ್ರಹಿಸಲಾಗಿದೆ, `src/lib/db/apiKeys.ts` ನೋಡಿ).

### ನಿರ್ವಹಣಾ ಸ್ಕೋಪ್

- `manage` / `admin` — Bearer ಆಗಿ ಕಳುಹಿಸಿದಾಗ ನಿರ್ವಹಣಾ API ಎಂಡ್ಪಾಯಿಂಟ್ಗಳಿಗೆ ಕೀಗೆ ಪ್ರವೇಶವನ್ನು ನೀಡುತ್ತದೆ.

### MCP ಸ್ಕೋಪ್ಗಳು (`src/shared/constants/mcpScopes.ts`)

ಪ್ರತಿಯೊಂದು MCP ಪರಿಕರಕ್ಕೂ `MCP_TOOL_SCOPES` ಮೂಲಕ ನಿರ್ದಿಷ್ಟ ಸ್ಕೋಪ್ಗಳು ಅಗತ್ಯವಿರುತ್ತವೆ. ಸಂಪೂರ್ಣ ಪಟ್ಟಿ (`MCP_SCOPE_LIST`):

```
read:health, read:combos, write:combos, read:quota, read:usage,
read:models, execute:completions, execute:search, write:budget,
write:resilience, pricing:write, read:cache, write:cache,
read:compression, write:compression, read:proxies
```

`open-sse/mcp-server/server.ts` ನಲ್ಲಿನ ಸ್ಕೋಪ್ ಜಾರಿಗೊಳಿಸುವಿಕೆಯು, `resolveCallerScopeContext()` MCP ದೃಢೀಕರಣ ಮಾಹಿತಿ, ವಿನಂತಿಯ ಮೆಟಾಡೇಟಾ ಅಥವಾ `OMNIROUTE_MCP_SCOPES` ನಿಂದ ಸ್ಕೋಪ್ಗಳನ್ನು ನಿರ್ಧರಿಸಿದ ನಂತರ, ಪ್ರತಿ ಪರಿಕರದ ಸ್ಕೋಪ್ ಪಟ್ಟಿಯನ್ನು
`evaluateToolScopes()` ಗೆ ರವಾನಿಸುತ್ತದೆ.

## ದೃಢೀಕರಣ ಅಗತ್ಯವಿರುವುದೇ ಎಂಬ ಟಾಗಲ್

`src/shared/utils/apiAuth.ts` ನಲ್ಲಿನ `isAuthRequired()` ವಿನಂತಿಗಾಗಿ **ಯಾವುದೇ** ದೃಢೀಕರಣವನ್ನು ಜಾರಿಗೊಳಿಸಬೇಕೇ ಎಂಬುದನ್ನು ನಿರ್ಧರಿಸುತ್ತದೆ:

- `settings.requireLogin === false` → ದೃಢೀಕರಣವನ್ನು ಜಾಗತಿಕವಾಗಿ ನಿಷ್ಕ್ರಿಯಗೊಳಿಸಲಾಗಿದೆ.
- ಯಾವುದೇ ಪಾಸ್ವರ್ಡ್ ಕಾನ್ಫಿಗರ್ ಮಾಡಿಲ್ಲ **ಮತ್ತು** `INITIAL_PASSWORD` env var ಇಲ್ಲ → ಬೂಟ್ಸ್ಟ್ರ್ಯಾಪ್ ಮೋಡ್ ಆನ್ಬೋರ್ಡಿಂಗ್ ವಿಝಾರ್ಡ್ ಮತ್ತು ಲೂಪ್ಬ್ಯಾಕ್ ವಿನಂತಿಗಳನ್ನು ಅನುಮತಿಸುತ್ತದೆ, ಆದರೆ ನೆಟ್ವರ್ಕ್ಗೆ ಬಹಿರಂಗಪಡಿಸಿದ ವಿನಂತಿಗಳಿಗೆ ಇನ್ನೂ ರುಜುವಾತುಗಳು ಅಗತ್ಯ.
- ಯಾವುದೇ DB ದೋಷ → ಸುರಕ್ಷಿತ-ಪೂರ್ವನಿಯೋಜಿತ ರೀತಿಯಲ್ಲಿ ಪ್ರವೇಶವನ್ನು ನಿರಾಕರಿಸುತ್ತದೆ.

ಕ್ಲೈಂಟ್ API ಕೀ ಜಾರಿಗೊಳಿಸುವಿಕೆಯು `process.env.REQUIRE_API_KEY` ಅನ್ನು ನೇರವಾಗಿ ಓದುವ ಬದಲು `src/shared/utils/featureFlags.ts` ನಲ್ಲಿನ `isRequireApiKeyEnabled()` ಅನ್ನು ಬಳಸುತ್ತದೆ. ನಿಯೋಜಿಸಲಾದ ಇನ್ಸ್ಟಾನ್ಸ್ಗಳಿಗೆ ಇದು ಮುಖ್ಯವಾಗಿದೆ: Dashboard → Feature Flags ನಲ್ಲಿ `REQUIRE_API_KEY` ಅನ್ನು ಟಾಗಲ್ ಮಾಡುವುದರಿಂದ DB ಓವರ್ರೈಡ್ ಸಂಗ್ರಹವಾಗುತ್ತದೆ ಮತ್ತು ಈ ಸಹಾಯಕವನ್ನು ಹಂಚಿಕೊಳ್ಳುವ `/v1/*`, `/v1beta/*`, `/models`, `/responses`, `/chat/completions`, `/codex/*` ಹಾಗೂ ಇತರ ಕ್ಲೈಂಟ್-API ದೃಢೀಕರಣ ಪರಿಶೀಲನೆಗಳ ಮೇಲೆ ತಕ್ಷಣವೇ ಪರಿಣಾಮ ಬೀರುತ್ತದೆ. ಫೀಚರ್ ಫ್ಲ್ಯಾಗ್ ಸಂಗ್ರಹವನ್ನು ಓದಲಾಗದಿದ್ದರೆ, ಕ್ಲೈಂಟ್ API ದೃಢೀಕರಣವು ಸುರಕ್ಷಿತವಾಗಿ ಪ್ರವೇಶವನ್ನು ನಿರಾಕರಿಸಿ ಕೀಯನ್ನು ಕಡ್ಡಾಯಗೊಳಿಸುತ್ತದೆ.

## ಹೊಂದಾಣಿಕೆಯನ್ನು ಮುರಿಯುವ ಬದಲಾವಣೆ — v3.8.0

`/api/v1/agents/tasks/*` ಮತ್ತು `/api/resilience/model-cooldowns` ಎಂಡ್ಪಾಯಿಂಟ್ಗಳಿಗೆ **ಈಗ ನಿರ್ವಹಣಾ ದೃಢೀಕರಣ ಅಗತ್ಯವಿದೆ** (ಕಮಿಟ್ `588a0333`). ಈ ಹಿಂದೆ `manage` ಸ್ಕೋಪ್ ಇಲ್ಲದ ಸಾಮಾನ್ಯ API ಕೀಯನ್ನು ಕಳುಹಿಸುತ್ತಿದ್ದ ಕ್ಲೈಂಟ್ಗಳು `403` ಸ್ವೀಕರಿಸುತ್ತವೆ. ಮೈಗ್ರೇಶನ್: API Keys ಡ್ಯಾಶ್ಬೋರ್ಡ್ನಲ್ಲಿ ಕೀಗೆ `manage` ಸ್ಕೋಪ್ ನೀಡಿ, ಅಥವಾ ಲಾಗಿನ್ ಆಗಿರುವ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಸೆಷನ್ ಬಳಸಿ.

## ವರ್ತನೆಯ ಬದಲಾವಣೆ — v3.8.2

`/api/mcp/*` (ರಿಮೋಟ್ MCP ಸರ್ವರ್) ಇನ್ನೂ ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ LOCAL_ONLY ಆಗಿದೆ, ಆದರೆ `Authorization: Bearer <api-key>` ಹೆಡರ್ `manage` ಸ್ಕೋಪ್ ಹೊಂದಿರುವಾಗ ಈಗ ಲೂಪ್ಬ್ಯಾಕ್ ಅಲ್ಲದ ವಿನಂತಿಗಳನ್ನು ಸ್ವೀಕರಿಸುತ್ತದೆ. ಈ ವಿನಾಯಿತಿಯನ್ನು `src/server/authz/routeGuard.ts` ನಲ್ಲಿನ `LOCAL_ONLY_MANAGE_SCOPE_BYPASS_PREFIXES` ಮೂಲಕ ಪ್ರತಿ ಪಾಥ್ಗೆ ಸ್ಪಷ್ಟವಾಗಿ ನಿಯಂತ್ರಿಸಲಾಗಿದೆ; ಸಮಾನ ಮಟ್ಟದ LOCAL_ONLY ಪ್ರಿಫಿಕ್ಸ್ `/api/cli-tools/runtime/*` ಅನಿಯಂತ್ರಿತ ಉಪಪ್ರಕ್ರಿಯೆಗಳನ್ನು ಪ್ರಾರಂಭಿಸಬಹುದಾದ ಕಾರಣ ಅದನ್ನು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಬೈಪಾಸ್ ಮಾಡಲು ಸಾಧ್ಯವಿಲ್ಲ. ಲೂಪ್ಬ್ಯಾಕ್ ಅಲ್ಲದ ಮೂಲಗಳಿಂದ `/api/mcp/*` ಗೆ ಬರುವ ಅನಾಮಧೇಯ ವಿನಂತಿಗಳು `403 LOCAL_ONLY` ಅನ್ನು ಮರಳಿಸುವುದನ್ನು ಮುಂದುವರಿಸುತ್ತವೆ — ಯಾವುದೇ ಹೊಸ LOCAL_ONLY ಪಾಥ್ನ ಪೂರ್ವನಿಯೋಜಿತ ವರ್ತನೆಯು ಕಟ್ಟುನಿಟ್ಟಾದ ಲೂಪ್ಬ್ಯಾಕ್ ಆಗಿಯೇ ಉಳಿಯುತ್ತದೆ. [ರೂಟ್ ಗಾರ್ಡ್ ಹಂತಗಳು](../security/ROUTE_GUARD_TIERS.md#manage-scope-carve-out) ನೋಡಿ.

## ಪರೀಕ್ಷೆ

- ಯೂನಿಟ್ ಪರೀಕ್ಷೆಗಳು: `tests/unit/authz/` — `classify.test.ts`, `pipeline.test.ts`, `client-api-policy.test.ts`, `management-policy.test.ts`, `public-policy.test.ts`.
- ಸಾರ್ವಜನಿಕ ಅನುಮತಿ ಪಟ್ಟಿ: `tests/unit/public-api-routes.test.ts`.
- ಕೇಂದ್ರೀಕೃತವಾಗಿ ಚಲಾಯಿಸಲು: `node --import tsx/esm --test tests/unit/authz/classify.test.ts`.

## ದೋಷ ನಿವಾರಣೆ

ಪೈಪ್ಲೈನ್ ಯಾವಾಗಲೂ ಪ್ರತಿಕ್ರಿಯೆಗಳಿಗೆ ಇವುಗಳನ್ನು ಮುದ್ರಿಸುತ್ತದೆ:

```
x-request-id:               <ಸಹಸಂಬಂಧ ಐಡಿ, ದೋಷದ ಬಾಡಿಗಳಲ್ಲಿ ಪ್ರತಿಧ್ವನಿಸಲಾಗುತ್ತದೆ>
x-omniroute-route-class:    PUBLIC | CLIENT_API | MANAGEMENT
```

ದೃಢೀಕೃತ ವಿನಂತಿಗಳಿಗಾಗಿ ಅಪ್ಸ್ಟ್ರೀಮ್ (ಹ್ಯಾಂಡ್ಲರ್-ಬದಿಯ) ವಿನಂತಿ ಹೆಡರ್ಗಳು ಇವುಗಳನ್ನೂ ಒಳಗೊಂಡಿರುತ್ತವೆ:

```
x-omniroute-auth-kind:      client_api_key | dashboard_session | management_key | anonymous
x-omniroute-auth-id:        key_<ಕೊನೆಯ-4> | "dashboard" | "anonymous"
x-omniroute-auth-label:     (ಐಚ್ಛಿಕ)
x-omniroute-auth-scopes:    ಅಲ್ಪವಿರಾಮದಿಂದ-ಬೇರ್ಪಡಿಸಿದ ಪಟ್ಟಿ
```

ಹ್ಯಾಂಡ್ಲರ್ಗಳ ಒಳಗೆ `assertAuth(req, expectedClass)` ಬಳಸಿ — ಮಿಡಲ್ವೇರ್ ಅನ್ನು ಬದಿಗೊತ್ತಿದ್ದರೆ, ಇದು `AUTHZ_NOT_INITIALIZED` ಕೋಡ್ನೊಂದಿಗೆ `AuthzAssertionError` ಅನ್ನು ಎಸೆಯುತ್ತದೆ (ಪರೀಕ್ಷೆಗಳಲ್ಲಿ ಕಾನ್ಫಿಗರೇಶನ್ ರಿಗ್ರೆಷನ್ಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಲು ಸಹಾಯಕವಾಗಿದೆ).

## ಇದನ್ನೂ ನೋಡಿ

- [API_REFERENCE.md](../reference/API_REFERENCE.md) — ಪ್ರತಿ ಎಂಡ್ಪಾಯಿಂಟ್ಗೆ ದೃಢೀಕರಣ ಮಾರ್ಕರ್
- [COMPLIANCE.md](../security/COMPLIANCE.md) — ದೃಢೀಕರಣ ಘಟನೆಗಳಿಗಾಗಿ ಆಡಿಟ್ ಲಾಗ್
- [MCP-SERVER.md](../frameworks/MCP-SERVER.md) — MCP ಸ್ಕೋಪ್ ಜಾರಿಯ ವಿವರಗಳು
- ಮೂಲ: `src/server/authz/`, `src/lib/api/requireManagementAuth.ts`
