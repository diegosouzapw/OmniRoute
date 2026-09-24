# Public Credentials Handling (ಕನ್ನಡ)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **ಸತ್ಯದ ಮೂಲ:** `open-sse/utils/publicCreds.ts`
> **ಪರೀಕ್ಷೆಗಳು:** `tests/unit/publicCreds.test.ts`
> **ಕೊನೆಯ ನವೀಕರಣ:** 2026-08-07 — v3.8.50
> **ಉದ್ದೇಶಿತ ಓದುಗರು:** ತಮ್ಮ ಸಾರ್ವಜನಿಕ CLIಗಳಲ್ಲಿ public OAuth client_id / client_secret / Firebase Web API ಕೀಗಳನ್ನು ಒದಗಿಸುವ ಪೂರೈಕೆದಾರರನ್ನು ಸಂಯೋಜಿಸುವ ಎಂಜಿನಿಯರ್ಗಳು.
> **ಸ್ಥಿತಿ:** upstream ಗುರುತಿಸುವಿಕೆಗಳನ್ನು ಎಂಬೆಡ್ ಮಾಡುವ ಎಲ್ಲಾ ಹೊಸ ಕೋಡ್ಗಳಿಗೆ **ಕಡ್ಡಾಯ**.

## ಇದು ಏಕೆ ಅಸ್ತಿತ್ವದಲ್ಲಿದೆ

- [ಸ್ಥಳೀಯ ಆ್ಯಪ್ಗಳಿಗಾಗಿ OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — ಸ್ಥಾಪಿಸಲಾದ ಆ್ಯಪ್ಗಳ OAuth client_id / client_secret ಸಾರ್ವಜನಿಕವಾಗಿರುತ್ತವೆ; ನಿಜವಾದ ಭದ್ರತೆಯನ್ನು PKCE ಒದಗಿಸುತ್ತದೆ.
- [Firebase API ಕೀಗಳು](https://firebase.google.com/docs/projects/api-keys) — Web ಕ್ಲೈಂಟ್ ಗುರುತಿಸುವಿಕೆಗಳು ವಿನ್ಯಾಸದ ಪ್ರಕಾರವೇ ಸಾರ್ವಜನಿಕವಾಗಿವೆ.

`.env` ಅನ್ನು ಕಾನ್ಫಿಗರ್ ಮಾಡದ ಬಳಕೆದಾರರಿಗೂ ಯಾವುದೇ ಹೆಚ್ಚುವರಿ ಸಂರಚನೆಯಿಲ್ಲದೆ ಕಾರ್ಯನಿರ್ವಹಿಸುವ OAuth ಹರಿವು ದೊರೆಯುವಂತೆ OmniRoute ಈ ಮೌಲ್ಯಗಳನ್ನು ಎಂಬೆಡ್ ಮಾಡಬೇಕು. ಎಂಬೆಡ್ ಮಾಡಿದ fallback ಇಲ್ಲದಿದ್ದರೆ, "ಕ್ಲೋನ್ ಮಾಡಿ ಮತ್ತು ರನ್ ಮಾಡಿ" ಮಾರ್ಗವನ್ನು ಅನುಸರಿಸುವ ಯಾವುದೇ ಬಳಕೆದಾರರಿಗಾಗಿ Gemini / Antigravity ಪೂರೈಕೆದಾರಗಳು ಕಾರ್ಯನಿರ್ವಹಿಸುವುದನ್ನು ನಿಲ್ಲಿಸುತ್ತವೆ.

ಆದರೆ, `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` ರೀತಿಯ ಲಿಟರಲ್ ಮೌಲ್ಯಗಳನ್ನು **GitHub Secret Scanning**, **Semgrep**, ಮತ್ತು ಅದೇ ರೀತಿಯ ಪ್ಯಾಟರ್ನ್ ಸ್ಕ್ಯಾನರ್ಗಳು ಪತ್ತೆಹಚ್ಚುತ್ತವೆ. ಪ್ರತಿಯೊಂದು ಬಿಡುಗಡೆಗೂ ತಪ್ಪು ಎಚ್ಚರಿಕೆಗಳ ಗದ್ದಲದ ಹರಿವು ಉಂಟಾಗುತ್ತದೆ, push protection ನ್ಯಾಯಸಮ್ಮತ ಕಮಿಟ್ಗಳನ್ನು ನಿರ್ಬಂಧಿಸುತ್ತದೆ, ಮತ್ತು ನಿರ್ವಾಹಕರು ಎಚ್ಚರಿಕೆ ಫೀಡ್ ಅನ್ನು ನಂಬುವುದನ್ನು ನಿಲ್ಲಿಸುತ್ತಾರೆ.

`open-sse/utils/publicCreds.ts` ಸಹಾಯಕವು ಎರಡೂ ನಿರ್ಬಂಧಗಳನ್ನು ಒಂದೇ ಬಾರಿ ಪರಿಹರಿಸುತ್ತದೆ:

- ಸಾರ್ವಜನಿಕ ಗುರುತಿಸುವಿಕೆಯನ್ನು **XOR-ಮಾಸ್ಕ್ ಮಾಡಿದ ಬೈಟ್ ಅನುಕ್ರಮವಾಗಿ** ಎಂಬೆಡ್ ಮಾಡುತ್ತದೆ (ಸೋರ್ಸ್ನಲ್ಲಿ ಯಾವುದೇ ಸ್ಕ್ಯಾನರ್ ಪ್ಯಾಟರ್ನ್ ಇರುವುದಿಲ್ಲ).
- ರನ್ಟೈಮ್ನಲ್ಲಿ `decodePublicCred` / `resolvePublicCred` ಮೂಲಕ ಡಿಕೋಡ್ ಮಾಡುತ್ತದೆ.
- ಈಗಾಗಲೇ ಪ್ರಸಿದ್ಧ prefixಗಳನ್ನು (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) ಅನುಸರಿಸುವ ಕಚ್ಚಾ ಮೌಲ್ಯಗಳನ್ನು ಪತ್ತೆಹಚ್ಚಿ, ಅವುಗಳನ್ನು ಬದಲಾವಣೆಯಿಲ್ಲದೆ ಹಾಗೆಯೇ ರವಾನಿಸುತ್ತದೆ; ಆದ್ದರಿಂದ ತಮ್ಮ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ `.env`ನಲ್ಲಿ ಕಚ್ಚಾ ಮೌಲ್ಯಗಳನ್ನು ಹೊಂದಿರುವ ಬಳಕೆದಾರರಿಗೆ **ಯಾವುದೇ ಮೈಗ್ರೇಶನ್ ಇಲ್ಲದೆ** ಎಲ್ಲವೂ ಕಾರ್ಯನಿರ್ವಹಿಸುತ್ತಲೇ ಇರುತ್ತದೆ.

ಇದು **ಅಸ್ಪಷ್ಟಗೊಳಿಸುವಿಕೆ, ಎನ್ಕ್ರಿಪ್ಶನ್ ಅಲ್ಲ.** ಸೋರ್ಸ್ ಓದುವ ಯಾರಾದರೂ ಮೌಲ್ಯವನ್ನು ಮರುಪಡೆಯಬಹುದು — ಮೌಲ್ಯವು ವಿನ್ಯಾಸದ ಪ್ರಕಾರವೇ ಸಾರ್ವಜನಿಕವಾಗಿರುವುದರಿಂದ ಇದು ಸಮಸ್ಯೆಯಲ್ಲ. ಸ್ಕ್ಯಾನರ್ regex ಹೊಂದಾಣಿಕೆಗಳನ್ನು ತಪ್ಪಿಸುವುದಷ್ಟೇ ಇದರ ಏಕೈಕ ಗುರಿ.

## ಕಡ್ಡಾಯ ಪ್ಯಾಟರ್ನ್

### 1. ಹೊಸ ಸಾರ್ವಜನಿಕ ಕ್ರೆಡೆನ್ಶಿಯಲ್ ಸೇರಿಸುವುದು

ಈ ಕೆಳಗಿನ ಗುಣಲಕ್ಷಣಗಳನ್ನು ಹೊಂದಿರುವ ಹೊಸ upstream-ಒದಗಿಸಿದ ಮೌಲ್ಯವನ್ನು ನೀವು ಎಂಬೆಡ್ ಮಾಡಬೇಕಾದಾಗ:

- ಅದು ಸಾರ್ವಜನಿಕ CLI / ಡೆಸ್ಕ್ಟಾಪ್ ಆ್ಯಪ್ / ಬ್ರೌಸರ್ ಬಂಡಲ್ನಿಂದ ಬರುತ್ತದೆ, **ಮತ್ತು**
- upstream ಪೂರೈಕೆದಾರರು ಅದನ್ನು ಸಾರ್ವಜನಿಕ ಕ್ಲೈಂಟ್ ಗುರುತಿಸುವಿಕೆಯಾಗಿ ದಾಖಲಿಸಿದ್ದಾರೆ (ಅಥವಾ ಹಾಗೆಯೇ ಪರಿಗಣಿಸುತ್ತಾರೆ), **ಮತ್ತು**
- ಇಲ್ಲದಿದ್ದರೆ ಪ್ಯಾಟರ್ನ್ ಸ್ಕ್ಯಾನರ್ ಅದನ್ನು ಹೊಂದಾಣಿಕೆ ಮಾಡುತ್ತದೆ (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, ಇತ್ಯಾದಿ),

…ಈ ಪರಿಶೀಲನಾ ಪಟ್ಟಿಯನ್ನು ಅನುಸರಿಸಿ:

1. ಮಾಸ್ಕ್ ಮಾಡಿದ ಬೈಟ್ ಅನುಕ್ರಮವನ್ನು ರಚಿಸಿ:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts`ನಲ್ಲಿರುವ `EMBEDDED_DEFAULTS`ಗೆ **ತಟಸ್ಥ ಕೀ ಹೆಸರಿನೊಂದಿಗೆ** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, ಇತ್ಯಾದಿ) ಹೊಸ ಎಂಟ್ರಿಯನ್ನು ಸೇರಿಸಿ. ಸಹಾಯಕದಲ್ಲಿ `client_secret` ಅಥವಾ `api_key` ರೀತಿಯ ಹೆಸರುಗಳನ್ನು ಬಳಸಬೇಡಿ — ಆ ಪದಗಳು Semgrep generic-secret ನಿಯಮಗಳನ್ನು ಪ್ರಚೋದಿಸುತ್ತವೆ.

3. ಸಾರ್ವಜನಿಕ ಟೈಪ್ ಯೂನಿಯನ್ಗೆ `keyof typeof EMBEDDED_DEFAULTS` ಸೇರಿಸಿ (ಇದು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಊಹಿಸಲ್ಪಡುತ್ತದೆ).

4. ಬಳಕೆದಾರ ಕೋಡ್ನಲ್ಲಿ, ಹಾರ್ಡ್ಕೋಡ್ ಮಾಡಿದ ಲಿಟರಲ್ ಅನ್ನು ಈ ಕೆಳಗಿನವುಗಳಿಂದ ಬದಲಾಯಿಸಿ:

   ```ts
   // ಒಂದೇ env override
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // ಹಲವು env ಅಲಿಯಾಸ್ಗಳು (ಮೊದಲ ಖಾಲಿಯಲ್ಲದ ಮೌಲ್ಯ ಗೆಲ್ಲುತ್ತದೆ)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // env override ಇಲ್ಲ (ಯಾವಾಗಲೂ ಎಂಬೆಡ್ ಮಾಡಿದ ಡೀಫಾಲ್ಟ್)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. `.env.example`ನಿಂದ ಲಿಟರಲ್ ಅನ್ನು ತೆಗೆದುಹಾಕಿ (ಓದುಗರನ್ನು ಇಲ್ಲಿಗೆ ನಿರ್ದೇಶಿಸುವ ಕಾಮೆಂಟ್-ಮಾತ್ರದ ದಾಖಲಾತಿಯಿಂದ ಅದನ್ನು ಬದಲಾಯಿಸಿ):

   ```dotenv
   # ── ಪೂರೈಕೆದಾರ (Google / Firebase / ಇತ್ಯಾದಿ) ──
   # ಸಾರ್ವಜನಿಕ OAuth ಕ್ರೆಡೆನ್ಶಿಯಲ್ಗಳನ್ನು ಕೋಡ್ನಲ್ಲಿ
   # open-sse/utils/publicCreds.ts ಮೂಲಕ ಸೇರಿಸಲಾಗಿದೆ. ನಿಮ್ಮದೇ ಮೌಲ್ಯಗಳನ್ನು ಬಳಸಲು ಮಾತ್ರ ಈ vars ಅನ್ನು ಹೊಂದಿಸಿ.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. ಹೊಸ ಕೀಗಾಗಿ ಆಕಾರದ assertion ಸೇರಿಸಲು `tests/unit/publicCreds.test.ts` ಅನ್ನು ನವೀಕರಿಸಿ (ಲಿಟರಲ್ ಮೌಲ್ಯವನ್ನಲ್ಲ, ಸ್ವರೂಪವನ್ನು ಪರಿಶೀಲಿಸಿ — ಪ್ಯಾಟರ್ನ್ಗಾಗಿ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಪರೀಕ್ಷೆಗಳನ್ನು ನೋಡಿ).

7. ಪರೀಕ್ಷಾ ಫೈಲ್ಗಳಿಗೆ `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` ಲಿಟರಲ್ಗಳನ್ನು **ಎಂದಿಗೂ** ಸೇರಿಸಬೇಡಿ. `.join("")` ತುಣುಕುಗಳಿಂದ ರಚಿಸಲಾದ `FAKE_*` ಸ್ಥಿರಾಂಕಗಳನ್ನು ಬಳಸಿ (ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಪರೀಕ್ಷೆಗಳನ್ನು ನೋಡಿ).

### 2. ಬಳಕೆದಾರ ಕೋಡ್

- **`resolvePublicCred()` / `resolvePublicCredMulti()` ಮೂಲಕ ಮಾತ್ರ ಓದಿ** — ಸಹಾಯಕದ ಹೊರಗೆ `decodePublicCredBytes()` ಅನ್ನು ಎಂದಿಗೂ ನೇರವಾಗಿ ಕರೆಯಬೇಡಿ.
- ಸಹಾಯಕವು ಉದ್ದೇಶಪೂರ್ವಕವಾಗಿ ಕಡಿಮೆ ವೆಚ್ಚದ್ದಾಗಿದೆ (ಲೀನಿಯರ್ ಬೈಟ್ XOR) ಮತ್ತು module-load ಸಮಯದಲ್ಲಿ ಕರೆಯಲು ಸುರಕ್ಷಿತವಾಗಿದೆ; ಡೀಫಾಲ್ಟ್ಗಳನ್ನು ಒಮ್ಮೆ ಮಾತ್ರ ಲೆಕ್ಕಿಸಲಾಗುತ್ತದೆ.
- env override ಯಾವಾಗಲೂ ಮೇಲುಗೈ ಸಾಧಿಸುತ್ತದೆ. ಬಳಕೆದಾರರು `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` ಅನ್ನು ಹೊಂದಿಸಿದರೆ, ಸಹಾಯಕವು ಆ ಕಚ್ಚಾ ಮೌಲ್ಯವನ್ನು ಹಾಗೆಯೇ ರವಾನಿಸುತ್ತದೆ.

### 3. ನಿಷೇಧಿತ ಪ್ಯಾಟರ್ನ್ಗಳು

❌ ಉತ್ಪಾದನಾ ಕೋಡ್ನಲ್ಲಿ (`src/`, `open-sse/`, `electron/`, `bin/`) ಈ ಕೆಳಗಿನ ಯಾವುದನ್ನೂ **ಎಂದಿಗೂ** ಮಾಡಬೇಡಿ:

```ts
// ಕೆಟ್ಟದ್ದು: ಲಿಟರಲ್ ಮೌಲ್ಯವು Secret Scanning + Semgrep ಅನ್ನು ಪ್ರಚೋದಿಸುತ್ತದೆ
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// ಕೆಟ್ಟದ್ದು: ಲಿಟರಲ್ನ base64 — Feb/2025ರಿಂದ GitHub ಇನ್ನೂ ಇದನ್ನು ಪತ್ತೆಹಚ್ಚುತ್ತದೆ
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// ಕೆಟ್ಟದ್ದು: ರನ್ಟೈಮ್ನಲ್ಲಿ ಪ್ಯಾಟರ್ನ್ ಅನ್ನು ಮರುಜೋಡಿಸುವ ಸ್ಟ್ರಿಂಗ್ ಸಂಯೋಜನೆ
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// ಕೆಟ್ಟದ್ದು: hex/ROT13 ಎನ್ಕೋಡಿಂಗ್ — ವಿಭಿನ್ನ ಅಸ್ಪಷ್ಟಗೊಳಿಸುವಿಕೆ, ಪತ್ತೆಯಾಗುವ ಅದೇ ಅಪಾಯ
clientSecret: hexDecode("474f4353..."),
```

ಇವೆಲ್ಲವೂ ಅಂತಿಮವಾಗಿ ಸ್ಕ್ಯಾನರ್ ಅನ್ನು ಪ್ರಚೋದಿಸುತ್ತವೆ. `resolvePublicCred()` ಅನ್ನು ಬಳಸಿ.

❌ `.env.example`ಗೆ ಲಿಟರಲ್ ಕ್ರೆಡೆನ್ಶಿಯಲ್ಗಳನ್ನು **ಎಂದಿಗೂ** ಸೇರಿಸಬೇಡಿ. ನಿಜವಾದ upstream ಮೌಲ್ಯಗಳ ಅಗತ್ಯವಿರುವ ಬಳಕೆದಾರರು ಅವುಗಳನ್ನು ಸಾರ್ವಜನಿಕ CLIಯಿಂದ ಸ್ವತಃ ಹೊರತೆಗೆಯಬಹುದು, ಅಥವಾ ತಮ್ಮದೇ OAuth ನೋಂದಣಿಯನ್ನು ಬಳಸಬಹುದು.

❌ ಕ್ರೆಡೆನ್ಶಿಯಲ್ ಅನ್ನು ಈ ಸಹಾಯಕಕ್ಕೆ ಸ್ಥಳಾಂತರಿಸಬೇಕೇ ಎಂಬುದನ್ನು ಮೊದಲು ಪರಿಶೀಲಿಸದೆ ಹೊಸ secret-scanning ಎಚ್ಚರಿಕೆಯನ್ನು **ಎಂದಿಗೂ** ನಿರ್ಲಕ್ಷಿಸಬೇಡಿ.

## ಸಂಬಂಧಿತ ನಿಯಂತ್ರಣಗಳು

- `publicCreds.ts` ನಲ್ಲಿರುವ `RAW_VALUE_PATTERN`, ನೇರವಾಗಿ ರವಾನಿಸುವಿಕೆಯನ್ನು (ಹಿಂದಿನ ಆವೃತ್ತಿಗಳೊಂದಿಗಿನ ಹೊಂದಾಣಿಕೆ) ಪ್ರಚೋದಿಸುವ ಪೂರ್ವಪ್ರತ್ಯಯಗಳನ್ನು ಪಟ್ಟಿ ಮಾಡುತ್ತದೆ. ದಾಖಲಿಸಲಾದ ಸಾರ್ವಜನಿಕ ಕ್ರೆಡೆನ್ಶಿಯಲ್ ಸ್ವರೂಪಗಳಿಗಾಗಿ ಮಾತ್ರ ಅದನ್ನು ವಿಸ್ತರಿಸಿ; ಸ್ವಾಮ್ಯಸ್ವರೂಪದ ರಹಸ್ಯಗಳಿಗಾಗಿ ಎಂದಿಗೂ ವಿಸ್ತರಿಸಬೇಡಿ.
- `.env.example`, CI ನ `check-env-doc-sync` ಸ್ಕ್ರಿಪ್ಟ್ನಲ್ಲಿದೆ — ನೀವು ಇಲ್ಲಿ ಯಾವುದಾದರೂ ವೇರಿಯೇಬಲ್ ಅನ್ನು ತೆಗೆದುಹಾಕಿದಾಗ, ದಸ್ತಾವೇಜುಗಳೂ ಅದಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗಿರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.
- `npm run test:vitest` ಮತ್ತು `node --import tsx/esm --test tests/unit/publicCreds.test.ts` ಪರೀಕ್ಷಾ ಸಮೂಹಗಳೆರಡೂ ಯಶಸ್ವಿಯಾಗಿಯೇ ಉಳಿಯಬೇಕು.

## ಈ ಸಹಾಯಕವನ್ನು ಯಾವಾಗ ಬಳಸಬಾರದು

ಈ ಸಹಾಯಕವು ಈ ಕೆಳಗಿನ ಕ್ರೆಡೆನ್ಶಿಯಲ್ಗಳಿಗೆ **ಮಾತ್ರ**:

1. ಅಪ್ಸ್ಟ್ರೀಮ್ ಪೂರೈಕೆದಾರರಿಂದ ಸಾರ್ವಜನಿಕವಾಗಿ ವಿತರಿಸಲಾದವು (CLI ಬೈನರಿ, ಬ್ರೌಸರ್ ಬಂಡಲ್, ಅಧಿಕೃತ ದಸ್ತಾವೇಜುಗಳು).
2. ಗೌಪ್ಯವಲ್ಲವೆಂದು ದಾಖಲಿಸಲಾದ ಅಥವಾ ಬಲವಾಗಿ ಸೂಚಿಸಲಾದವು (PKCE-ಸಂರಕ್ಷಿತ, Firebase Web ಕೀ ಅಥವಾ ಅಂತಹುದೇ).

ಉಳಿದ ಎಲ್ಲದಕ್ಕೂ — ಆಪರೇಟರ್ ನೀಡಿದ ಟೋಕನ್ಗಳು, ಪ್ರತಿ-ಟೆನೆಂಟ್ ರಹಸ್ಯಗಳು, ನಿಮ್ಮದೇ OAuth ಆ್ಯಪ್ನ client_secret, ಎನ್ಕ್ರಿಪ್ಶನ್ ಕೀಗಳು, JWT ರಹಸ್ಯಗಳು, ಡೇಟಾಬೇಸ್ ಪಾಸ್ವರ್ಡ್ಗಳು — **env vars ಮಾತ್ರ** ಬಳಸಿ (`process.env.FOO`, ಖಾಲಿ ಮೌಲ್ಯಕ್ಕೆ `||` ಫಾಲ್ಬ್ಯಾಕ್ / ಸ್ಪಷ್ಟ ದೋಷ). ಇವು ಸೋರ್ಸ್ನಲ್ಲಿ ಅಲ್ಲ, `.env` ಮತ್ತು [ಎನ್ಕ್ರಿಪ್ಟ್ ಮಾಡಿದ ಕ್ರೆಡೆನ್ಶಿಯಲ್ ಸಂಗ್ರಹದಲ್ಲಿ](./COMPLIANCE.md) ಇರಬೇಕು.

## ಉಲ್ಲೇಖಗಳು

- [Google: ಸ್ಥಳೀಯ ಆ್ಯಪ್ಗಳಿಗಾಗಿ OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: ಕ್ಲೈಂಟ್ ಗುರುತಿಸುವಿಕೆಗಾಗಿ API ಕೀಗಳು](https://firebase.google.com/docs/projects/api-keys)
- [GitHub ರಹಸ್ಯ ಸ್ಕ್ಯಾನಿಂಗ್ ಬೆಂಬಲಿಸುವ ರಹಸ್ಯಗಳು](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: ಟೋಕನ್ಗಳಿಗಾಗಿ base64 ಪತ್ತೆಹಚ್ಚುವಿಕೆ (ಫೆಬ್ರವರಿ 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- ಈ ಸಹಾಯಕವನ್ನು ಪರಿಚಯಿಸಿದ ಕಮಿಟ್: `1a39c31f` — _fix(security): ಸಾರ್ವಜನಿಕ ಅಪ್ಸ್ಟ್ರೀಮ್ ಕ್ರೆಡೆನ್ಶಿಯಲ್ಗಳನ್ನು ಮರೆಮಾಡಿ + ದೋಷ ಶುದ್ಧೀಕರಣವನ್ನು ಕೇಂದ್ರೀಕರಿಸಿ_
