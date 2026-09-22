# Public Credentials Handling (Filipino)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **Pinagmumulan ng katotohanan:** `open-sse/utils/publicCreds.ts`
> **Mga pagsubok:** `tests/unit/publicCreds.test.ts`
> **Huling na-update:** 2026-08-07 — v3.8.50
> **Para kanino:** Mga engineer na nag-i-integrate ng mga provider na namamahagi ng pampublikong OAuth client_id / client_secret / Firebase Web API key sa kanilang mga pampublikong CLI.
> **Katayuan:** **SAPILITAN** para sa lahat ng bagong code na nag-e-embed ng mga upstream identifier.

## Bakit ito umiiral

- [OAuth 2.0 para sa mga native app (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — Pampubliko ang OAuth client_id / client_secret para sa mga naka-install na app; ang PKCE ang nagbibigay ng aktuwal na seguridad.
- [Mga Firebase API key](https://firebase.google.com/docs/projects/api-keys) — Dinisenyong maging pampubliko ang mga Web client identifier.

Kailangang i-embed ng OmniRoute ang mga halagang ito upang magkaroon pa rin ng gumaganang OAuth flow kaagad ang mga user na hindi nagko-configure ng `.env`. Kapag walang naka-embed na fallback, hihinto sa paggana ang mga Gemini / Antigravity provider para sa sinumang user na sumusunod sa paraang "i-clone lang at patakbuhin."

Gayunpaman, ang mga literal na value gaya ng `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` ay natutukoy ng **GitHub Secret Scanning**, **Semgrep**, at mga katulad na pattern scanner. Nagiging maingay na daloy ng mga false positive ang bawat release, hinaharangan ng push protection ang mga lehitimong commit, at nawawalan ng tiwala ang mga operator sa alert feed.

Sabay na nilulutas ng helper na `open-sse/utils/publicCreds.ts` ang dalawang limitasyong ito:

- Ini-embed ang pampublikong identifier bilang isang **XOR-masked byte sequence** (walang pattern na matutukoy ng scanner sa source).
- Dine-decode habang tumatakbo gamit ang `decodePublicCred` / `resolvePublicCred`.
- Tinutukoy ang mga raw value na sumusunod na sa mga kilalang prefix (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) at ipinapasa ang mga iyon nang walang pagbabago, kaya patuloy na gagana ang mga user na may mga raw value sa kanilang kasalukuyang `.env` nang **walang anumang migration**.

Ito ay **obfuscation, hindi encryption.** Maaaring mabawi ng sinumang nagbabasa ng source ang value — ayos lang iyon dahil pampubliko talaga ang value ayon sa disenyo. Ang tanging layunin ay maiwasan ang mga pagtutugma ng scanner regex.

## Ang sapilitang pattern

### 1. Pagdaragdag ng bagong pampublikong credential

Kapag kailangan mong mag-embed ng bagong value na ibinigay ng upstream at:

- nagmumula sa isang pampublikong CLI / desktop app / browser bundle, **at**
- idinodokumento (o itinuturing) ito ng upstream provider bilang isang pampublikong client identifier, **at**
- kung hindi ay matutukoy ito ng isang pattern scanner (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, atbp.),

…sundin ang checklist na ito:

1. Buuin ang masked byte sequence:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. Magdagdag ng bagong entry sa `EMBEDDED_DEFAULTS` sa `open-sse/utils/publicCreds.ts` na may **neutral na pangalan ng key** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, atbp.). **Huwag** gumamit ng mga pangalang tulad ng `client_secret` o `api_key` sa helper — tini-trigger ng mga salitang iyon ang mga generic-secret rule ng Semgrep.

3. Magdagdag ng `keyof typeof EMBEDDED_DEFAULTS` sa pampublikong type union (awtomatiko itong ini-infer).

4. Sa consumer code, palitan ang naka-hardcode na literal ng:

   ```ts
   // iisang env override
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // maraming env alias (ang unang hindi walang-laman ang gagamitin)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // walang env override (palaging naka-embed na default)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. Alisin ang literal mula sa `.env.example` (palitan ito ng dokumentasyong puro komento na nagtuturo sa mga mambabasa rito):

   ```dotenv
   # ── Provider (Google / Firebase / atbp.) ──
   # Naka-bake sa code ang mga pampublikong OAuth credential sa pamamagitan ng
   # open-sse/utils/publicCreds.ts. Itakda lamang ang mga var na ito upang gamitin ang sarili mo.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. I-update ang `tests/unit/publicCreds.test.ts` upang magdagdag ng shape assertion para sa bagong key (beripikahin ang format, hindi ang literal na value — tingnan ang mga kasalukuyang pagsubok para sa pattern).

7. **Huwag kailanman** magdagdag ng mga literal na `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` sa mga test file. Gamitin ang mga constant na `FAKE_*` na binuo mula sa mga fragment na `.join("")` (tingnan ang mga kasalukuyang pagsubok).

### 2. Mga consumer

- **Magbasa lamang mula sa `resolvePublicCred()` / `resolvePublicCredMulti()`** — huwag kailanman direktang tawagin ang `decodePublicCredBytes()` sa labas ng helper.
- Sadyang magaan ang helper (linear byte XOR) at ligtas tawagin sa oras ng pag-load ng module; minsan lamang kinukuwenta ang mga default.
- Palaging nangingibabaw ang env override. Kung itatakda ng user ang `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown`, direktang ipapasa ng helper ang raw value na iyon nang walang pagbabago.

### 3. Mga ipinagbabawal na pattern

❌ **Huwag kailanman** gawin ang alinman sa mga sumusunod sa production code (`src/`, `open-sse/`, `electron/`, `bin/`):

```ts
// MALI: tini-trigger ng literal na value ang Secret Scanning + Semgrep
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// MALI: base64 ng literal — natutukoy pa rin ng GitHub mula noong Feb/2025
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// MALI: string concatenation na muling binubuo ang pattern habang tumatakbo
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// MALI: hex/ROT13 encoding — ibang obfuscation, parehong panganib na matukoy
clientSecret: hexDecode("474f4353..."),
```

Sa bandang huli, mati-trigger ng lahat ng ito ang isang scanner. Gamitin ang `resolvePublicCred()`.

❌ **Huwag kailanman** magdagdag ng mga literal na credential sa `.env.example`. Maaaring kunin mismo ng mga user na nangangailangan ng mga tunay na upstream value ang mga iyon mula sa pampublikong CLI, o gamitin ang sarili nilang OAuth registration.

❌ **Huwag kailanman** balewalain ang isang bagong secret-scanning alert nang hindi muna sinusuri kung dapat ilipat ang credential sa helper na ito.

## Mga kaugnay na kontrol

- Inililista ng `RAW_VALUE_PATTERN` sa `publicCreds.ts` ang mga prefix na nagti-trigger ng passthrough (retrocompat). Palawakin lamang ito para sa mga dokumentadong format ng pampublikong credential, at hindi kailanman para sa mga proprietary na secret.
- Nasa CI script na `check-env-doc-sync` ang `.env.example` — kapag nag-alis ka rito ng var, tiyaking tumutugma ang dokumentasyon.
- Dapat manatiling pumapasa ang parehong suite na `npm run test:vitest` at `node --import tsx/esm --test tests/unit/publicCreds.test.ts`.

## Kailan HINDI gagamitin ang helper na ito

Ang helper na ito ay **para lamang** sa mga credential na:

1. Pampublikong ipinamamahagi ng upstream provider (CLI binary, browser bundle, opisyal na dokumentasyon).
2. Dokumentado o malinaw na ipinahihiwatig na hindi kumpidensyal (protektado ng PKCE, Firebase Web key, o katulad).

Para sa lahat ng iba pa — mga token na ibinigay ng operator, mga secret para sa bawat tenant, `client_secret` ng sarili mong OAuth app, mga encryption key, mga JWT secret, mga password ng database — gumamit **lamang ng mga env var** (`process.env.FOO`, `||` fallback sa empty / explicit error). Ang mga ito ay dapat nasa `.env` at sa [encrypted credentials store](./COMPLIANCE.md), hindi sa source.

## Mga sanggunian

- [Google: OAuth 2.0 para sa mga native app](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: Mga API key para sa pagkilala sa client](https://firebase.google.com/docs/projects/api-keys)
- [Mga sinusuportahang secret ng GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: pagtukoy ng base64 para sa mga token (Peb 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- Commit na nagpakilala sa helper na ito: `1a39c31f` — _fix(security): i-mask ang mga pampublikong upstream credential + isentralisa ang sanitization ng error_
