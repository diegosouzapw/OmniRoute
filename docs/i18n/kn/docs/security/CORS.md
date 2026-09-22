# CORS Configuration & Security (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/CORS.md) · 🇪🇹 [am](../../../am/docs/security/CORS.md) · 🇸🇦 [ar](../../../ar/docs/security/CORS.md) · 🇦🇿 [az](../../../az/docs/security/CORS.md) · 🇧🇬 [bg](../../../bg/docs/security/CORS.md) · 🇧🇩 [bn](../../../bn/docs/security/CORS.md) · 🇨🇿 [cs](../../../cs/docs/security/CORS.md) · 🇩🇰 [da](../../../da/docs/security/CORS.md) · 🇩🇪 [de](../../../de/docs/security/CORS.md) · 🇬🇷 [el](../../../el/docs/security/CORS.md) · 🇪🇸 [es](../../../es/docs/security/CORS.md) · 🇪🇪 [et](../../../et/docs/security/CORS.md) · 🇮🇷 [fa](../../../fa/docs/security/CORS.md) · 🇫🇮 [fi](../../../fi/docs/security/CORS.md) · 🇫🇷 [fr](../../../fr/docs/security/CORS.md) · 🇮🇪 [ga](../../../ga/docs/security/CORS.md) · 🇮🇳 [gu](../../../gu/docs/security/CORS.md) · 🇳🇬 [ha](../../../ha/docs/security/CORS.md) · 🇮🇱 [he](../../../he/docs/security/CORS.md) · 🇮🇳 [hi](../../../hi/docs/security/CORS.md) · 🇭🇷 [hr](../../../hr/docs/security/CORS.md) · 🇭🇺 [hu](../../../hu/docs/security/CORS.md) · 🇦🇲 [hy](../../../hy/docs/security/CORS.md) · 🇮🇩 [id](../../../id/docs/security/CORS.md) · 🇳🇬 [ig](../../../ig/docs/security/CORS.md) · 🇮🇹 [it](../../../it/docs/security/CORS.md) · 🇯🇵 [ja](../../../ja/docs/security/CORS.md) · 🇬🇪 [ka](../../../ka/docs/security/CORS.md) · 🇰🇭 [km](../../../km/docs/security/CORS.md) · 🇰🇷 [ko](../../../ko/docs/security/CORS.md) · 🇱🇹 [lt](../../../lt/docs/security/CORS.md) · 🇱🇻 [lv](../../../lv/docs/security/CORS.md) · 🇮🇳 [ml](../../../ml/docs/security/CORS.md) · 🇮🇳 [mr](../../../mr/docs/security/CORS.md) · 🇲🇾 [ms](../../../ms/docs/security/CORS.md) · 🇲🇹 [mt](../../../mt/docs/security/CORS.md) · 🇲🇲 [my](../../../my/docs/security/CORS.md) · 🇳🇵 [ne](../../../ne/docs/security/CORS.md) · 🇳🇱 [nl](../../../nl/docs/security/CORS.md) · 🇳🇴 [no](../../../no/docs/security/CORS.md) · 🇮🇳 [or](../../../or/docs/security/CORS.md) · 🇮🇳 [pa](../../../pa/docs/security/CORS.md) · 🇵🇭 [phi](../../../phi/docs/security/CORS.md) · 🇵🇱 [pl](../../../pl/docs/security/CORS.md) · 🇵🇹 [pt](../../../pt/docs/security/CORS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/CORS.md) · 🇷🇴 [ro](../../../ro/docs/security/CORS.md) · 🇷🇺 [ru](../../../ru/docs/security/CORS.md) · 🇱🇰 [si](../../../si/docs/security/CORS.md) · 🇸🇰 [sk](../../../sk/docs/security/CORS.md) · 🇸🇮 [sl](../../../sl/docs/security/CORS.md) · 🇷🇸 [sr](../../../sr/docs/security/CORS.md) · 🇸🇪 [sv](../../../sv/docs/security/CORS.md) · 🇰🇪 [sw](../../../sw/docs/security/CORS.md) · 🇮🇳 [ta](../../../ta/docs/security/CORS.md) · 🇮🇳 [te](../../../te/docs/security/CORS.md) · 🇹🇭 [th](../../../th/docs/security/CORS.md) · 🇹🇷 [tr](../../../tr/docs/security/CORS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/CORS.md) · 🇵🇰 [ur](../../../ur/docs/security/CORS.md) · 🇺🇿 [uz](../../../uz/docs/security/CORS.md) · 🇻🇳 [vi](../../../vi/docs/security/CORS.md) · 🇳🇬 [yo](../../../yo/docs/security/CORS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/CORS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/CORS.md)

---

OmniRoute ಒಂದೇ ಕೇಂದ್ರೀಕೃತ ಅನುಮತಿ ಪಟ್ಟಿಯಿಂದ ಯಾವ **ಬ್ರೌಸರ್ ಮೂಲಗಳು** ಕ್ರಾಸ್-ಒರಿಜಿನ್ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಓದಬಹುದು ಎಂಬುದನ್ನು ನಿಯಂತ್ರಿಸುತ್ತದೆ. ಈ ಮಾದರಿಯು **ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ವಿಫಲತೆಯ ಸಂದರ್ಭದಲ್ಲಿ ಮುಚ್ಚಲ್ಪಡುತ್ತದೆ**:
ನೀವು ನಿರ್ದಿಷ್ಟವಾಗಿ ಅನುಮತಿಸುವವರೆಗೆ ಯಾವುದೇ ಮೂಲಕ್ಕೂ ಅನುಮತಿ ಇರುವುದಿಲ್ಲ. ಅನುಮತಿ ಪಟ್ಟಿಯನ್ನು ಹೇಗೆ ನಿರ್ಧರಿಸಲಾಗುತ್ತದೆ, `CORS_ALLOW_ALL=true` ವಾಸ್ತವವಾಗಿ ಯಾವುದನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತದೆ (ಮತ್ತು, ಮುಖ್ಯವಾಗಿ, ಯಾವುದನ್ನು ಬಹಿರಂಗಪಡಿಸುವುದಿಲ್ಲ), ಡೆವಲಪ್ಮೆಂಟ್ ಮತ್ತು ಪ್ರೊಡಕ್ಷನ್ಗಾಗಿ ಅದನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ಹೇಗೆ ಕಾನ್ಫಿಗರ್ ಮಾಡುವುದು, ಹಾಗೂ ವೈಲ್ಡ್ಕಾರ್ಡ್ ಸಕ್ರಿಯವಾಗಿರುವಾಗ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ತೋರಿಸುವ ರನ್ಟೈಮ್ ಎಚ್ಚರಿಕೆ—ಇವೆಲ್ಲವನ್ನೂ ಈ ಪುಟ ದಾಖಲಿಸುತ್ತದೆ.

**ಅಧಿಕೃತ ಮೂಲ:** `src/server/cors/origins.ts` (`resolveAllowedOrigin`,
`applyCorsHeaders`, `getCorsStatus`). ಅನುಮತಿ ಪಟ್ಟಿಯನ್ನು ಮಿಡಲ್ವೇರ್ನಲ್ಲಿ
(`src/server/authz/pipeline.ts`) ಒಮ್ಮೆ ಮಾತ್ರ ಅನ್ವಯಿಸಲಾಗುತ್ತದೆ — ಪ್ರತಿ-ರೂಟ್ ಹ್ಯಾಂಡ್ಲರ್ಗಳು ಸ್ವತಃ
`Access-Control-Allow-Origin` ಅನ್ನು ಹೊಂದಿಸುವುದಿಲ್ಲ.

## ಮೂಲವನ್ನು ಹೇಗೆ ನಿರ್ಧರಿಸಲಾಗುತ್ತದೆ

ಪ್ರತಿ ವಿನಂತಿಗೂ ಮಿಡಲ್ವೇರ್ ಈ ಕ್ರಮದಲ್ಲಿ `Access-Control-Allow-Origin` ಮೌಲ್ಯವನ್ನು ಲೆಕ್ಕಹಾಕುತ್ತದೆ:

1. **`CORS_ALLOW_ALL=true`** (ಅಥವಾ ಹಳೆಯ `CORS_ORIGIN=*`) → ಕರೆ ಮಾಡಿದವರ
   `Origin` ಅನ್ನು ಮರಳಿ ಪ್ರತಿಧ್ವನಿಸುತ್ತದೆ (`Origin` ಹೆಡರ್ ಇಲ್ಲದಿದ್ದರೆ `*`), ಜೊತೆಗೆ ಕ್ಯಾಶ್ಗಳು ಸರಿಯಾಗಿರಲು
   `Vary: Origin` ಅನ್ನು ಸೇರಿಸುತ್ತದೆ. ಅದೇ `applyCorsHeaders()` ನಿಯಂತ್ರಣ ಬಿಂದುವು ಟೋಕನ್ ಮೂಲಕ ದೃಢೀಕರಿಸಲಾದ
   `/v1*`/`/v1beta*` ಮೇಲ್ಮೈಯ ಪ್ರತಿಯೊಂದು ಬಾಡಿಯುಳ್ಳ 2xx ಪ್ರತಿಕ್ರಿಯೆಗೆ
   `Vary: Accept-Encoding` ಅನ್ನೂ ಸೇರಿಸುತ್ತದೆ (`relaxForTokenAuth`, RFC 9110 §12.5.5, issue #6737), ಇದರಿಂದ
   ಡೌನ್ಸ್ಟ್ರೀಮ್/ಹಂಚಿಕೆಯ ಕ್ಯಾಶ್ಗಳು ಸಂಕುಚಿತ ಮತ್ತು ಅಸಂಕುಚಿತ ಆವೃತ್ತಿಗಳನ್ನು ಸರಿಯಾಗಿ ಪ್ರತ್ಯೇಕಿಸಬಹುದು.
2. ಇಲ್ಲದಿದ್ದರೆ, ವಿನಂತಿಯ `Origin` ಅನ್ನು ಸಾಮಾನ್ಯೀಕರಿಸಲಾಗುತ್ತದೆ (ಸಣ್ಣ ಅಕ್ಷರಗಳಿಗೆ ಪರಿವರ್ತಿಸಿ, ಕೊನೆಯ ಸ್ಲ್ಯಾಶ್ ತೆಗೆದುಹಾಕಲಾಗುತ್ತದೆ) ಮತ್ತು **ವಿಲೀನಗೊಂಡ ಅನುಮತಿ ಪಟ್ಟಿಗೆ** ಹೋಲಿಸಲಾಗುತ್ತದೆ:
   - env **`CORS_ALLOWED_ORIGINS`** — ಅಲ್ಪವಿರಾಮದಿಂದ ಬೇರ್ಪಡಿಸಿದ ಪಟ್ಟಿ, ಮತ್ತು
   - ರನ್ಟೈಮ್ **`corsOrigins`** ಸೆಟ್ಟಿಂಗ್ (Dashboard → Security → _CORS Allowed
     Origins_), ಇದನ್ನು `src/lib/config/runtimeSettings.ts` ನಿಂದ
     `setRuntimeAllowedOrigins()` ಮೂಲಕ ಸೇರಿಸಲಾಗುತ್ತದೆ.
3. ಹೊಂದಾಣಿಕೆ ಇಲ್ಲ → **ಯಾವುದೇ `Access-Control-Allow-Origin` ಹೆಡರ್ ಅನ್ನು ಹೊರಸೂಸಲಾಗುವುದಿಲ್ಲ**. ಬ್ರೌಸರ್
   ಕ್ರಾಸ್-ಒರಿಜಿನ್ ಓದುವಿಕೆಯನ್ನು ನಿರ್ಬಂಧಿಸುತ್ತದೆ. ಇದೇ ಉದ್ದೇಶಿತ, ಪೂರ್ವನಿಯೋಜಿತವಾಗಿ ವಿಫಲತೆಯ ಸಂದರ್ಭದಲ್ಲಿ ಮುಚ್ಚಲ್ಪಡುವ ವರ್ತನೆ.

| Env var                | ಅರ್ಥ                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------- |
| `CORS_ALLOWED_ORIGINS` | ಅನುಮತಿಸಬೇಕಾದ ನಿಖರ ಮೂಲಗಳ CSV (ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ).                                                      |
| `CORS_ALLOW_ALL`       | `true`/`1` → ಯಾವುದೇ ಮೂಲವನ್ನು ಪ್ರತಿಧ್ವನಿಸಿ (ವೈಲ್ಡ್ಕಾರ್ಡ್). ಡೆವಲಪ್ಮೆಂಟ್ಗೆ ಮಾತ್ರ.                        |
| `CORS_ORIGIN`          | ಹಳೆಯದು. `*` ಎಂಬುದು `CORS_ALLOW_ALL` ನಂತೆ ವರ್ತಿಸುತ್ತದೆ; ಒಂದೇ ಮೌಲ್ಯವನ್ನು ಅನುಮತಿ ಪಟ್ಟಿಗೆ ಸೇರಿಸಲಾಗುತ್ತದೆ. |

## ಬೆದರಿಕೆ ಮಾದರಿ — `CORS_ALLOW_ALL=true` ನಿಜವಾಗಿಯೂ ಏನನ್ನು ಬಹಿರಂಗಪಡಿಸುತ್ತದೆ

OWASP ನ ಸಾಮಾನ್ಯ ಎಚ್ಚರಿಕೆಯನ್ನು ("ವೈಲ್ಡ್ಕಾರ್ಡ್ CORS = ಯಾವುದೇ ಸೈಟ್ ನಿಮ್ಮ API ಅನ್ನು ಕರೆಯಬಹುದು") ಗಂಭೀರವಾಗಿ ಪರಿಗಣಿಸುವುದು ಸೂಕ್ತ, ಆದರೆ ಒಂದು ನಿರ್ದಿಷ್ಟ ಅನುಷ್ಠಾನ ಸಂಗತಿಯಿಂದಾಗಿ OmniRoute ನ ಬಹಿರಂಗೀಕರಣವು **ಸಾಮಾನ್ಯ ಸಂದರ್ಭಕ್ಕಿಂತ ಸೀಮಿತವಾಗಿದೆ**:

> **ಕೇಂದ್ರೀಯ `applyCorsHeaders()` ಎಂದಿಗೂ
> `Access-Control-Allow-Credentials` ಅನ್ನು ಹೊರಸೂಸುವುದಿಲ್ಲ.** ಸರ್ವರ್
> `Access-Control-Allow-Credentials: true` ಅನ್ನು ಕಳುಹಿಸದ ಹೊರತು, ಬ್ರೌಸರ್ _ರುಜುವಾತುಗಳಿರುವ_
> (ಕುಕಿಯನ್ನು ಹೊಂದಿರುವ) ಕ್ರಾಸ್-ಒರಿಜಿನ್ ಪ್ರತಿಕ್ರಿಯೆಯನ್ನು ಬಹಿರಂಗಪಡಿಸುವುದಿಲ್ಲ. OmniRoute ನ ಹಂಚಿಕೆಯ CORS ಮಾರ್ಗವು
> ಇದನ್ನು ಎಂದಿಗೂ ಮಾಡುವುದಿಲ್ಲ.

`CORS_ALLOW_ALL=true` ಇದ್ದಾಗಲೂ ಪ್ರತಿ ಮೇಲ್ಮೈಗೆ ಇದರ ಅರ್ಥ ಹೀಗಿದೆ:

| ಮೇಲ್ಮೈ                                  | ದೃಢೀಕರಣ ವಿಧಾನ              | ವೈಲ್ಡ್ಕಾರ್ಡ್ CORS ನ ಪರಿಣಾಮ                                                                                                                                                                                                                                           |
| --------------------------------------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Dashboard / MANAGEMENT `/api/*`         | ಕುಕಿ ಸೆಷನ್                 | ಮೂಲವನ್ನು ಪ್ರತಿಧ್ವನಿಸಲಾಗುತ್ತದೆ, ಆದರೆ **`Allow-Credentials` ಇಲ್ಲದೆ** ಬ್ರೌಸರ್ **ರುಜುವಾತುಗಳಿರುವ ಓದುವಿಕೆಯನ್ನು ನಿರ್ಬಂಧಿಸುತ್ತದೆ**. ದುರುದ್ದೇಶಪೂರಿತ ಕ್ರಾಸ್-ಒರಿಜಿನ್ ಸೈಟ್ ನಿಮ್ಮ ದೃಢೀಕೃತ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು **ಓದಲು ಸಾಧ್ಯವಿಲ್ಲ**, ಮತ್ತು ಸೆಷನ್ ಕುಕಿ ಬಹಿರಂಗವಾಗುವುದಿಲ್ಲ. |
| Client API `/v1/*`, `/v1beta/*`         | Bearer / `x-api-key` ಹೆಡರ್ | ಈಗಾಗಲೇ **ವಿನ್ಯಾಸದ ಪ್ರಕಾರವೇ** ಅನುಮತಿದಾಯಕವಾಗಿದೆ (`relaxForTokenAuth`): ಬ್ರೌಸರ್ಗಳು `Authorization`/`x-api-key` ಅನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಲಗತ್ತಿಸುವುದಿಲ್ಲ, ಆದ್ದರಿಂದ ದಾಳಿಕೋರರ ಪುಟವು ನಿಮ್ಮ ಕೀಲಿಯನ್ನು ಒದಗಿಸಲು ಸಾಧ್ಯವಿಲ್ಲ. `CORS_ALLOW_ALL` ಇದನ್ನು ವಿಸ್ತರಿಸುವುದಿಲ್ಲ.              |
| ಸಾರ್ವಜನಿಕ ಓದಲು-ಮಾತ್ರ (`/api/health`, …) | ಯಾವುದೂ ಇಲ್ಲ                | ಸಂವೇದನಾಶೀಲವಲ್ಲ; ವೈಲ್ಡ್ಕಾರ್ಡ್ ಹಾನಿಕರವಲ್ಲ.                                                                                                                                                                                                                             |

ಹೀಗಾಗಿ `CORS_ALLOW_ALL=true` ನಿಂದ ಉಳಿಯುವ **ಅವಶಿಷ್ಟ** ಬಹಿರಂಗೀಕರಣವು ಇಷ್ಟಕ್ಕೆ ಸೀಮಿತವಾಗಿದೆ: (a)
ಈಗಾಗಲೇ ದೃಢೀಕರಣ ಅಗತ್ಯವಿಲ್ಲದ ಡೇಟಾದ ರುಜುವಾತುರಹಿತ ಕ್ರಾಸ್-ಒರಿಜಿನ್ **ಓದುವಿಕೆಗಳು**, ಮತ್ತು (b)
ನಿರ್ವಹಣಾ ರೂಟ್ಗಳಲ್ಲಿ CORS **ಪ್ರೀಫ್ಲೈಟ್ ಯಶಸ್ವಿಯಾಗಲು** ಅವಕಾಶ ನೀಡುವುದು — ಆದರೆ ಅವುಗಳಿಗೆ ಇನ್ನೂ
ಕ್ರಾಸ್-ಒರಿಜಿನ್ ಪುಟ ಒದಗಿಸಲು ಸಾಧ್ಯವಿಲ್ಲದ ದೃಢೀಕರಣದ ಅಗತ್ಯವಿದೆ. ಹಂಚಿಕೆಯ CORS ಮಾರ್ಗದಲ್ಲಿ ಇದು ಸೆಷನ್ ಅಪಹರಣ ಅಥವಾ
ರುಜುವಾತು ಕಳವು ಮಾಡುವ ಮಾರ್ಗ **ಅಲ್ಲ**.

### ಒಂದು ನೈಜ ಅಪವಾದ — `/api/v1/agents/`

Cloud-Agent ರೂಟ್ಗಳು (`/api/v1/agents/{health,credentials,tasks,tasks/[id]}`) ತಮ್ಮ
**ಸ್ವಂತ** CORS ಹೆಡರ್ಗಳನ್ನು ಹೊಂದಿಸುತ್ತವೆ
(`src/lib/cloudAgent/api.ts`, `getCloudAgentCorsHeaders`) ಮತ್ತು
`Access-Control-Allow-Origin: <origin>|*` ಜೊತೆಗೆ
`Access-Control-Allow-Credentials: true` ಅನ್ನೂ **ಹೊರಸೂಸುತ್ತವೆ**. ಮೂಲದ ಪ್ರತಿಧ್ವನಿ ಮತ್ತು ರುಜುವಾತುಗಳು ಒಟ್ಟಿಗೆ ಇರುವ ಏಕೈಕ ಮೇಲ್ಮೈ ಇದು, ಮತ್ತು ಇದು
`CORS_ALLOW_ALL` ನಿಂದ **ಸ್ವತಂತ್ರವಾಗಿದೆ**. ಈ ರೂಟ್ಗಳು ನಿರ್ವಹಣಾ ದೃಢೀಕರಣವನ್ನು ಹೊಂದಿವೆ
(`requireManagementAuth`); ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಅನ್ನು ಹೋಸ್ಟ್ನ ಹೊರಗೆ ಬಹಿರಂಗಪಡಿಸುವ ನಿರ್ವಾಹಕರು, ಪ್ರತಿಕ್ರಿಯೆ ಹೆಡರ್ಗಳು ಕ್ರಾಸ್-ಒರಿಜಿನ್ ರುಜುವಾತುಗಳಿರುವ ಓದುವಿಕೆಯನ್ನು ಅನುಮತಿಸುವ ಏಕೈಕ ಸ್ಥಳ ಇದೇ ಎಂಬುದನ್ನು ತಿಳಿದಿರಬೇಕು. ಇದನ್ನು ಸ್ಪಷ್ಟ ಅನುಮತಿ ಪಟ್ಟಿಗೆ ಬಿಗಿಗೊಳಿಸುವ ಕಾರ್ಯವನ್ನು
ಈ CORS ಮಾರ್ಗದರ್ಶನದಿಂದ ಪ್ರತ್ಯೇಕವಾಗಿ ಟ್ರ್ಯಾಕ್ ಮಾಡಲಾಗುತ್ತಿದೆ.

## ಪ್ರೊಡಕ್ಷನ್ ಪರಿಶೀಲನಾಪಟ್ಟಿ

- **ಪ್ರೊಡಕ್ಷನ್ನಲ್ಲಿ ಎಂದಿಗೂ `CORS_ALLOW_ALL=true` ಹೊಂದಿಸಬೇಡಿ.** ಅದನ್ನು ಹೊಂದಿಸದೆ ಬಿಡಿ.
- **ಸ್ಪಷ್ಟವಾದ** ಮೂಲಗಳ ಪಟ್ಟಿಯನ್ನು ಹೊಂದಿಸಿ — env var ಅಥವಾ Security ಟ್ಯಾಬ್ನ ಕ್ಷೇತ್ರವನ್ನು ಬಳಸಿ:

  ```bash
  CORS_ALLOWED_ORIGINS="https://app.example.com, https://admin.example.com"
  ```

- OmniRoute ಒಂದು ರಿವರ್ಸ್ ಪ್ರಾಕ್ಸಿ / ಟನಲ್ (nginx, Caddy, Cloudflare
  Tunnel, Tailscale) ಹಿಂದೆ ಚಾಲನೆಯಾದರೆ, CORS ನಿಮ್ಮ ಏಕೈಕ ನಿಯಂತ್ರಣ **ಅಲ್ಲ** —
  ಲೂಪ್ಬ್ಯಾಕ್ ರೂಟ್ ಗಾರ್ಡ್ ಇನ್ನೂ ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ಪ್ರಾರಂಭಿಸಬಲ್ಲ ರೂಟ್ಗಳನ್ನು ರಕ್ಷಿಸುತ್ತದೆ
  ([ROUTE_GUARD_TIERS](./ROUTE_GUARD_TIERS.md) ನೋಡಿ). 403 ಅನ್ನು "ಸರಿಪಡಿಸಲು"
  `X-Forwarded-For: 127.0.0.1` ಅನ್ನು ನಕಲಿಯಾಗಿ ರಚಿಸಬೇಡಿ; ಹಾಗೆ ಮಾಡಿದರೆ ರೂಟ್ ಗಾರ್ಡ್
  ಮುಚ್ಚಿರುವ RCE ವರ್ಗವು ಮತ್ತೆ ತೆರೆದುಕೊಳ್ಳುತ್ತದೆ.
- ರನ್ಟೈಮ್ ಸ್ಥಿತಿಯನ್ನು ದೃಢೀಕರಿಸಿ: `CORS_ALLOW_ALL=true` ಸಕ್ರಿಯವಾಗಿರುವಾಗಲೆಲ್ಲಾ
  Dashboard → Security → Authorization Inventory ಅಡಿಯಲ್ಲಿ ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಒಂದು
  **ನಿರಂತರ ಅಂಬರ್ ಬ್ಯಾನರ್** ಅನ್ನು ತೋರಿಸುತ್ತದೆ ಮತ್ತು ಮೇಲ್ವಿಚಾರಣಾ ಪರಿಕರಗಳು ಪೋಲ್ ಮಾಡಬಹುದಾದ
  `cors: { allowAll, allowedOrigins }` ಎನ್ವೆಲಪ್ ಅನ್ನು
  `/api/settings/authz-inventory` ಹಿಂತಿರುಗಿಸುತ್ತದೆ.

## ಡೆವಲಪ್ಮೆಂಟ್ ಅನುಕೂಲತೆ — ನಿರ್ದಿಷ್ಟ ಸ್ಥಳೀಯ ಮೂಲಗಳನ್ನು ಅನುಮತಿಸಿ

ಡೆವಲಪ್ಮೆಂಟ್ನಲ್ಲಿಯೂ ನಿಮಗೆ ವೈಲ್ಡ್ಕಾರ್ಡ್ ಅಪರೂಪವಾಗಿಯೇ ಬೇಕಾಗುತ್ತದೆ. ನೀವು ಬಳಸುವ
ಡೆವಲಪ್ಮೆಂಟ್ ಸರ್ವರ್ಗಳನ್ನು ಮಾತ್ರ ಅನುಮತಿಸಿ:

```bash
# ಸ್ಥಳೀಯ OmniRoute ಅನ್ನು ಕರೆಸುವ Vite (5173) + Next.js (3000) ಡೆವಲಪ್ಮೆಂಟ್ ಸರ್ವರ್ಗಳು
CORS_ALLOWED_ORIGINS="http://localhost:5173, http://localhost:3000"
```

ಮೂಲಗಳನ್ನು ಕೇಸ್ ಪರಿಗಣಿಸದೆ ಹೋಲಿಸಲಾಗುತ್ತದೆ ಮತ್ತು ಕೊನೆಯ ಸ್ಲ್ಯಾಶ್ ಅನ್ನು ನಿರ್ಲಕ್ಷಿಸಲಾಗುತ್ತದೆ,
ಆದ್ದರಿಂದ `http://localhost:3000` ಮತ್ತು `http://localhost:3000/` ಸಮಾನವಾಗಿವೆ. ಅದೇ CSV
ಅನ್ನು ಮರುಪ್ರಾರಂಭಿಸದೆಯೇ ರನ್ಟೈಮ್ನಲ್ಲಿ **Dashboard → Security → CORS Allowed Origins**
ನಲ್ಲಿ ಹೊಂದಿಸಬಹುದು.

## API ಕೀಗಳು ಮತ್ತು ಕುಕಿ ಸೆಷನ್ಗಳು

- **Bearer / `x-api-key` (`/v1/*` ಇನ್ಫರೆನ್ಸ್ ಸರ್ಫೇಸ್):** ಬ್ರೌಸರ್ಗಳು ಇವುಗಳನ್ನು
  ಎಂದಿಗೂ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಲಗತ್ತಿಸುವುದಿಲ್ಲ. ಇಲ್ಲಿ CORS ಅರ್ಥಪೂರ್ಣ ತಡೆಯಲ್ಲ — API ಕೀಯೇ
  ತಡೆ — ಆದ್ದರಿಂದಲೇ ಬ್ರೌಸರ್ ಮತ್ತು Electron ಕ್ಲೈಂಟ್ಗಳು ಈಗಾಗಲೇ ಪ್ರವೇಶಿಸಲು ಅರ್ಹವಾಗಿರುವ
  ಪ್ರತಿಕ್ರಿಯೆಗಳನ್ನು ಓದಲು ಸಾಧ್ಯವಾಗುವಂತೆ ಆ ಸರ್ಫೇಸ್ ಅನ್ನು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಅನುಮತಿಪೂರ್ಣವಾಗಿ
  ಇರಿಸಲಾಗಿದೆ.
- **ಕುಕಿ ಸೆಷನ್ (ಡ್ಯಾಶ್ಬೋರ್ಡ್):** ವಿಫಲವಾದಾಗ ಮುಚ್ಚಿಕೊಳ್ಳುವ ಡೀಫಾಲ್ಟ್ನಿಂದ **ಮತ್ತು**
  ಹಂಚಿಕೆಯ ಪಥದಲ್ಲಿ `Access-Control-Allow-Credentials` ಇಲ್ಲದಿರುವುದರಿಂದ ರಕ್ಷಿಸಲ್ಪಟ್ಟಿದೆ.
  ಯಾವುದೇ ಅನುಮತಿಪೂರ್ಣ ಕಾನ್ಫಿಗ್ನಿಂದ ನಿರ್ವಹಣೆ/ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಮೂಲಗಳನ್ನು ಹೊರಗಿಡಿ; ಅವು
  ಕಟ್ಟುನಿಟ್ಟಾಗಿ ವಿಫಲವಾದಾಗ ಮುಚ್ಚಿಕೊಳ್ಳುವಂತೆಯೇ ಇರಬೇಕು.

## ಉದಾಹರಣೆ: OmniRoute ಮುಂಭಾಗದಲ್ಲಿರುವ ರಿವರ್ಸ್ ಪ್ರಾಕ್ಸಿ

CORS ಅನ್ನು OmniRoute ಸ್ವತಃ ಜಾರಿಗೊಳಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ ಪ್ರಾಕ್ಸಿ ಸಾಮಾನ್ಯವಾಗಿ
`Access-Control-*` ಹೆಡರ್ಗಳನ್ನು ಸೇರಿಸಬಾರದು ಅಥವಾ ಮರುಬರೆಯಬಾರದು (ನಕಲಿ ಹೆಡರ್ಗಳು
ಬ್ರೌಸರ್ಗಳಲ್ಲಿ ಸಮಸ್ಯೆ ಉಂಟುಮಾಡುತ್ತವೆ). TLS ಅನ್ನು ಟರ್ಮಿನೇಟ್ ಮಾಡಿ ಮತ್ತು ಫಾರ್ವರ್ಡ್ ಮಾಡಿ —
ಪ್ರೀಫ್ಲೈಟ್ಗೆ OmniRoute ಉತ್ತರಿಸಲಿ:

```nginx
# nginx — OmniRoute ಗೆ ಫಾರ್ವರ್ಡ್ ಮಾಡಿ; ಇಲ್ಲಿ Access-Control-* ಅನ್ನು ಸೇರಿಸಬೇಡಿ
location / {
    proxy_pass http://127.0.0.1:20128;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-Proto $scheme;
    # X-Forwarded-For ಅನ್ನು 127.0.0.1 ಗೆ ಹೊಂದಿಸಬೇಡಿ — ಇದು ಲೂಪ್ಬ್ಯಾಕ್ ರೂಟ್ ಗಾರ್ಡ್ ಅನ್ನು ನಿಷ್ಪ್ರಯೋಜಕಗೊಳಿಸುತ್ತದೆ.
}
```

ಅನುಮತಿಸಲಾದ ಬ್ರೌಸರ್ ಮೂಲಗಳನ್ನು ಪ್ರಾಕ್ಸಿಯಲ್ಲಿ ಅಲ್ಲ, OmniRoute ನಲ್ಲಿ
(`CORS_ALLOWED_ORIGINS` ಅಥವಾ Security ಟ್ಯಾಬ್) ಹೊಂದಿಸಿ.

## ಮೂಲ ಫೈಲ್ಗಳು

| ವಿಷಯ                                   | ಫೈಲ್                                                                 |
| -------------------------------------- | -------------------------------------------------------------------- |
| ಅನುಮತಿಪಟ್ಟಿ ಪರಿಹಾರ + `getCorsStatus()` | `src/server/cors/origins.ts`                                         |
| ಮಿಡಲ್ವೇರ್ ಅನ್ವಯಿಕೆ (ಸತ್ಯದ ಏಕೈಕ ಮೂಲ)    | `src/server/authz/pipeline.ts`                                       |
| Settings → ರನ್ಟೈಮ್ ಮೂಲದ ಅಳವಡಿಕೆ        | `src/lib/config/runtimeSettings.ts`                                  |
| ಡ್ಯಾಶ್ಬೋರ್ಡ್ಗಾಗಿ ರನ್ಟೈಮ್ ಸ್ಥಿತಿ        | `src/app/api/settings/authz-inventory/route.ts`                      |
| ಡ್ಯಾಶ್ಬೋರ್ಡ್ ಎಚ್ಚರಿಕೆ ಬ್ಯಾನರ್          | `src/app/(dashboard)/dashboard/settings/components/AuthzSection.tsx` |
| CORS Allowed Origins ಕ್ಷೇತ್ರ           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`  |
| ಪ್ರತಿ-ರೂಟ್ Cloud-Agent CORS (ಅಪವಾದ)    | `src/lib/cloudAgent/api.ts`                                          |

## ಇದನ್ನೂ ನೋಡಿ

- [ರೂಟ್ ಗಾರ್ಡ್ ಹಂತಗಳು](./ROUTE_GUARD_TIERS.md) — ಪ್ರಕ್ರಿಯೆಗಳನ್ನು ಪ್ರಾರಂಭಿಸಬಲ್ಲ ರೂಟ್ಗಳಿಗೆ
  ಲೂಪ್ಬ್ಯಾಕ್ ಜಾರಿಗೊಳಿಸುವಿಕೆ (ಪ್ರತ್ಯೇಕವಾದ, ಪೂರಕ ನಿಯಂತ್ರಣ).
- [ಅಧಿಕಾರ ನೀಡುವಿಕೆ ಮಾರ್ಗದರ್ಶಿ](../architecture/AUTHZ_GUIDE.md) — ಸಂಪೂರ್ಣ ದೃಢೀಕರಣ ಪೈಪ್ಲೈನ್.
