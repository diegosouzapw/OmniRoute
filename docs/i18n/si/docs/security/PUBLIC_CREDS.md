# Public Credentials Handling (සිංහල)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **සත්යයේ මූලාශ්රය:** `open-sse/utils/publicCreds.ts`
> **පරීක්ෂණ:** `tests/unit/publicCreds.test.ts`
> **අවසන් වරට යාවත්කාලීන කළේ:** 2026-08-07 — v3.8.50
> **ඉලක්කගත පාඨකයින්:** තම පොදු CLI තුළ පොදු OAuth client_id / client_secret / Firebase Web API යතුරු සපයන සේවාදායක ඒකාබද්ධ කරන ඉංජිනේරුවන්.
> **තත්ත්වය:** උඩුගං හඳුනාගැනීම් කාවද්දන සියලු නව කේත සඳහා **අනිවාර්යයි**.

## මෙය පවතින්නේ ඇයි

- [ස්වදේශීය යෙදුම් සඳහා OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — ස්ථාපිත යෙදුම් සඳහා OAuth client_id / client_secret පොදුය; සැබෑ ආරක්ෂාව සපයන්නේ PKCE ය.
- [Firebase API යතුරු](https://firebase.google.com/docs/projects/api-keys) — වෙබ් සේවාලාභී හඳුනාගැනීම් සැලසුමෙන්ම පොදුය.

`.env` වින්යාස නොකරන පරිශීලකයින්ට පවා අමතර වින්යාසයකින් තොරව ක්රියාකාරී OAuth ප්රවාහයක් ලැබෙන පරිදි OmniRoute විසින් මෙම අගයන් කාවැද්දිය යුතුය. කාවැද්දූ විකල්ප පෙරනිමියක් නොමැතිව, "ක්ලෝන කර ධාවනය කරන්න" යන මාර්ගය අනුගමනය කරන ඕනෑම පරිශීලකයෙකු සඳහා Gemini / Antigravity සේවාදායක ක්රියා කිරීම නවතී.

කෙසේ වෙතත්, `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` වැනි සෘජු අගයන් **GitHub Secret Scanning**, **Semgrep**, සහ ඒ හා සමාන රටා ස්කෑනර මඟින් ගැළපේ. සෑම නිකුතුවක්ම ව්යාජ ධනාත්මක ප්රතිඵලවල ඝෝෂාකාරී ප්රවාහයක් බවට පත්වේ, push protection මඟින් නීත්යානුකූල commits අවහිර කරයි, සහ මෙහෙයුම්කරුවන් අනතුරු ඇඟවීම් ප්රවාහය විශ්වාස කිරීම නවත්වයි.

`open-sse/utils/publicCreds.ts` උපකාරකය මෙම සීමා දෙකම එකවර විසඳයි:

- පොදු හඳුනාගැනීම **XOR-ආවරණය කළ බයිට් අනුක්රමයක්** ලෙස කාවද්දයි (මූලාශ්රයේ ස්කෑනර රටාවක් නොමැත).
- ධාවන වේලාවේදී `decodePublicCred` / `resolvePublicCred` හරහා විකේතනය කරයි.
- දැනටමත් ප්රකට උපසර්ග (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) අනුගමනය කරන අමු අගයන් හඳුනාගෙන ඒවා නොවෙනස්ව ඉදිරියට යවයි; එමඟින් පවතින `.env` තුළ අමු අගයන් ඇති පරිශීලකයින්ට **කිසිදු සංක්රමණයකින් තොරව** දිගටම ක්රියා කළ හැක.

මෙය **අපැහැදිලි කිරීමකි, සංකේතනය නොවේ.** මූලාශ්රය කියවන ඕනෑම කෙනෙකුට අගය නැවත ලබාගත හැක — අගය සැලසුමෙන්ම පොදු බැවින් එය ගැටලුවක් නොවේ. එකම අරමුණ වන්නේ ස්කෑනර regex ගැළපීම් වළක්වා ගැනීමයි.

## අනිවාර්ය රටාව

### 1. නව පොදු අක්තපත්රයක් එක් කිරීම

පහත ලක්ෂණ සහිත උඩුගං මූලාශ්රයකින් සැපයූ නව අගයක් කාවැද්දීමට අවශ්ය වූ විට:

- පොදු CLI / ඩෙස්ක්ටොප් යෙදුමකින් / බ්රවුසර bundle එකකින් පැමිණේ, **සහ**
- උඩුගං සේවාදායකයා එය පොදු සේවාලාභී හඳුනාගැනීමක් ලෙස ලේඛනගත කරයි (හෝ සලකයි), **සහ**
- එසේ නොකළහොත් රටා ස්කෑනරයක් එය ගළපයි (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, ආදිය),

…මෙම පිරික්සුම් ලැයිස්තුව අනුගමනය කරන්න:

1. ආවරණය කළ බයිට් අනුක්රමය උත්පාදනය කරන්න:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts` තුළ `EMBEDDED_DEFAULTS` වෙත **මධ්යස්ථ යතුරු නාමයක්** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, ආදිය) සහිත නව ප්රවේශයක් එක් කරන්න. උපකාරකය තුළ `client_secret` හෝ `api_key` වැනි නාම භාවිත **නොකරන්න** — එම වචන Semgrep සාමාන්ය-රහස්ය රීති සක්රිය කරයි.

3. පොදු type union එකට `keyof typeof EMBEDDED_DEFAULTS` එකක් එක් කරන්න (එය ස්වයංක්රීයව අනුමාන කෙරේ).

4. පරිභෝජක කේතය තුළ, hardcoded සෘජු අගය පහත පරිදි ප්රතිස්ථාපනය කරන්න:

   ```ts
   // තනි env අභිබැවීම
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // env අන්වර්ථ කිහිපයක් (හිස් නොවන පළමු අගය ජය ගනී)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // env අභිබැවීමක් නැත (සැමවිටම කාවැද්දූ පෙරනිමිය)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. `.env.example` වෙතින් සෘජු අගය ඉවත් කරන්න (පාඨකයින් මෙහි යොමු කරන අදහස් පමණක් සහිත ලේඛනගත කිරීමකින් ප්රතිස්ථාපනය කරන්න):

   ```dotenv
   # ── සේවාදායකයා (Google / Firebase / ආදිය) ──
   # පොදු OAuth අක්තපත්ර කේතය තුළ කාවද්දා ඇත්තේ
   # open-sse/utils/publicCreds.ts හරහාය. ඔබේම අගයන් භාවිත කිරීමට පමණක් මෙම විචල්ය සකසන්න.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. නව යතුර සඳහා හැඩය පිළිබඳ assertion එකක් එක් කිරීමට `tests/unit/publicCreds.test.ts` යාවත්කාලීන කරන්න (සෘජු අගය නොව ආකෘතිය තහවුරු කරන්න — රටාව සඳහා පවතින පරීක්ෂණ බලන්න).

7. පරීක්ෂණ ගොනුවලට `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` සෘජු අගයන් **කිසිවිටෙකත්** එක් නොකරන්න. `.join("")` කොටස්වලින් සාදා ඇති `FAKE_*` නියත භාවිත කරන්න (පවතින පරීක්ෂණ බලන්න).

### 2. පරිභෝජකයින්

- **`resolvePublicCred()` / `resolvePublicCredMulti()` වෙතින් පමණක් කියවන්න** — උපකාරකයෙන් පිටතදී කිසිවිටෙකත් `decodePublicCredBytes()` සෘජුව කැඳවන්න එපා.
- උපකාරකය හිතාමතාම අඩු වියදම් සහිතය (රේඛීය බයිට් XOR) සහ module-load වේලාවේදී කැඳවීමට ආරක්ෂිතය; පෙරනිමි එක් වරක් පමණක් ගණනය කෙරේ.
- env අභිබැවීමට සැමවිටම ප්රමුඛතාව ලැබේ. පරිශීලකයෙකු `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` සකසන්නේ නම්, උපකාරකය එම අමු අගය නොවෙනස්ව ඉදිරියට යවයි.

### 3. තහනම් රටා

❌ නිෂ්පාදන කේතය තුළ (`src/`, `open-sse/`, `electron/`, `bin/`) පහත සඳහන් කිසිවක් **කිසිවිටෙකත්** නොකරන්න:

```ts
// නරකයි: සෘජු අගය Secret Scanning + Semgrep සක්රිය කරයි
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// නරකයි: සෘජු අගයේ base64 — 2025 පෙබරවාරි සිට GitHub තවමත් මෙය හඳුනාගනී
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// නරකයි: ධාවන වේලාවේදී රටාව නැවත එකලස් කරන string සම්බන්ධ කිරීම
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// නරකයි: hex/ROT13 කේතනය — වෙනස් අපැහැදිලි කිරීමක්, හඳුනාගැනීමේ අවදානම එලෙසමයි
clientSecret: hexDecode("474f4353..."),
```

මේ සියල්ල අවසානයේ ස්කෑනරයක් සක්රිය කරයි. `resolvePublicCred()` භාවිත කරන්න.

❌ `.env.example` වෙත සෘජු අක්තපත්ර **කිසිවිටෙකත්** එක් නොකරන්න. සැබෑ උඩුගං අගයන් අවශ්ය පරිශීලකයින්ට ඒවා පොදු CLI වෙතින්ම ලබාගත හැකිය, නැතහොත් තමන්ගේම OAuth ලියාපදිංචිය භාවිත කළ හැකිය.

❌ අක්තපත්රය මෙම උපකාරකය වෙත ගෙන යා යුතුදැයි පළමුව පරීක්ෂා නොකර නව secret-scanning අනතුරු ඇඟවීමක් **කිසිවිටෙකත්** නොසලකා හරින්න එපා.

## අදාළ පාලන

- `publicCreds.ts` හි `RAW_VALUE_PATTERN` මඟහැර යැවීම (පසුගැළපුම) සක්රිය කරන උපසර්ග ලැයිස්තුගත කරයි. එය ලේඛනගත පොදු අක්තපත්ර ආකෘති සඳහා පමණක් පුළුල් කරන්න; හිමිකාර රහස් සඳහා කිසිවිටෙකත් පුළුල් නොකරන්න.
- `.env.example` CI හි `check-env-doc-sync` ස්ක්රිප්ටය තුළ පවතී — ඔබ මෙහි විචල්යයක් ඉවත් කරන විට, ලේඛන ද ඊට ගැළපෙන බව තහවුරු කරන්න.
- `npm run test:vitest` සහ `node --import tsx/esm --test tests/unit/publicCreds.test.ts` පරීක්ෂණ කට්ටල දෙකම සාර්ථකව පැවතිය යුතුය.

## මෙම උපකාරකය භාවිත නොකළ යුතු අවස්ථා

මෙම උපකාරකය භාවිත කළ යුත්තේ පහත සඳහන් අක්තපත්ර සඳහා **පමණි**:

1. මූලාශ්ර සැපයුම්කරු විසින් ප්රසිද්ධියේ බෙදාහරින ලද ඒවා (CLI ද්විමය, බ්රවුසර බණ්ඩලය, නිල ලේඛන).
2. රහසිගත නොවන බව ලේඛනගත කර ඇති හෝ ප්රබල ලෙස ඇඟවෙන ඒවා (PKCE මඟින් ආරක්ෂිත, Firebase Web යතුර, හෝ ඒ හා සමාන).

අනෙකුත් සියල්ල සඳහා — ක්රියාකරු විසින් නිකුත් කරන ටෝකන, එක් එක් කුලීකරුට අදාළ රහස්, ඔබේම OAuth යෙදුමේ client_secret, සංකේතන යතුරු, JWT රහස්, දත්ත සමුදා මුරපද — **පරිසර විචල්ය පමණක්** භාවිත කරන්න (`process.env.FOO`, හිස් අගයකට `||` පසුබැසීමක් / පැහැදිලි දෝෂයක්). මේවා මූලාශ්ර කේතයට නොව, `.env` සහ [සංකේතනය කළ අක්තපත්ර ගබඩාව](./COMPLIANCE.md) තුළ තිබිය යුතුය.

## යොමු

- [Google: ස්වදේශීය යෙදුම් සඳහා OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: සේවාලාභී හඳුනාගැනීම සඳහා API යතුරු](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning සහාය දක්වන රහස්](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: ටෝකන සඳහා base64 හඳුනාගැනීම (2025 පෙබරවාරි)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- මෙම උපකාරකය හඳුන්වා දුන් commit එක: `1a39c31f` — _fix(security): පොදු මූලාශ්ර අක්තපත්ර සඟවා දෝෂ පිරිසිදුකරණය මධ්යගත කිරීම_
