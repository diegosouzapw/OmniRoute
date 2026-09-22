# Public Credentials Handling (മലയാളം)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **ആധികാരിക ഉറവിടം:** `open-sse/utils/publicCreds.ts`
> **ടെസ്റ്റുകൾ:** `tests/unit/publicCreds.test.ts`
> **അവസാനം പുതുക്കിയത്:** 2026-08-07 — v3.8.50
> **ലക്ഷ്യവായനക്കാർ:** തങ്ങളുടെ പൊതു CLIs-ൽ പൊതു OAuth client_id / client_secret / Firebase Web API കീകൾ ഉൾപ്പെടുത്തി വിതരണം ചെയ്യുന്ന പ്രൊവൈഡറുകളെ സംയോജിപ്പിക്കുന്ന എൻജിനീയർമാർ.
> **നില:** അപ്സ്ട്രീം ഐഡന്റിഫയറുകൾ ഉൾച്ചേർക്കുന്ന എല്ലാ പുതിയ കോഡിനും **നിർബന്ധം**.

## ഇത് നിലവിലുള്ളതിന്റെ കാരണം

- [നേറ്റീവ് ആപ്പുകൾക്കായുള്ള OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — ഇൻസ്റ്റാൾ ചെയ്ത ആപ്പുകൾക്കുള്ള OAuth client_id / client_secret പൊതുവായവയാണ്; യഥാർഥ സുരക്ഷ നൽകുന്നത് PKCE ആണ്.
- [Firebase API കീകൾ](https://firebase.google.com/docs/projects/api-keys) — Web ക്ലയന്റ് ഐഡന്റിഫയറുകൾ രൂപകൽപ്പനപ്രകാരം പൊതുവായവയാണ്.

`.env` കോൺഫിഗർ ചെയ്യാത്ത ഉപയോക്താക്കൾക്കും അധിക സജ്ജീകരണമില്ലാതെ പ്രവർത്തിക്കുന്ന OAuth ഫ്ലോ ലഭിക്കുന്നതിനായി OmniRoute ഈ മൂല്യങ്ങൾ ഉൾച്ചേർക്കണം. ഉൾച്ചേർത്ത fallback ഇല്ലെങ്കിൽ, "ക്ലോൺ ചെയ്ത് പ്രവർത്തിപ്പിക്കുക" എന്ന രീതി പിന്തുടരുന്ന ഏതൊരു ഉപയോക്താവിനും Gemini / Antigravity പ്രൊവൈഡറുകൾ പ്രവർത്തനം നിർത്തും.

എന്നിരുന്നാലും, `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` പോലുള്ള ലിറ്ററൽ മൂല്യങ്ങൾ **GitHub Secret Scanning**, **Semgrep**, സമാനമായ പാറ്റേൺ സ്കാനറുകൾ എന്നിവ കണ്ടെത്തും. ഓരോ റിലീസും തെറ്റായ പോസിറ്റീവുകളുടെ ബഹളമായി മാറുകയും, push protection നിയമാനുസൃതമായ commits തടയുകയും, ഓപ്പറേറ്റർമാർ alert feed-നെ വിശ്വസിക്കാതാകുകയും ചെയ്യുന്നു.

`open-sse/utils/publicCreds.ts` helper രണ്ട് നിയന്ത്രണങ്ങളും ഒരേസമയം പരിഹരിക്കുന്നു:

- പൊതു ഐഡന്റിഫയറിനെ **XOR ഉപയോഗിച്ച് മാസ്ക് ചെയ്ത byte sequence** ആയി ഉൾച്ചേർക്കുന്നു (സോഴ്സിൽ സ്കാനർ പാറ്റേൺ ഉണ്ടാകില്ല).
- റൺടൈമിൽ `decodePublicCred` / `resolvePublicCred` വഴി decode ചെയ്യുന്നു.
- ഇതിനകം അറിയപ്പെടുന്ന prefixes (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) പിന്തുടരുന്ന raw values കണ്ടെത്തി മാറ്റമില്ലാതെ കൈമാറുന്നു; അതിനാൽ നിലവിലുള്ള `.env`-ൽ raw values ഉള്ള ഉപയോക്താക്കൾക്ക് **യാതൊരു migration-ഉം ഇല്ലാതെ** പ്രവർത്തനം തുടരും.

ഇത് **obfuscation ആണ്, encryption അല്ല.** സോഴ്സ് വായിക്കുന്ന ആർക്കും മൂല്യം വീണ്ടെടുക്കാനാകും — മൂല്യം രൂപകൽപ്പനപ്രകാരം പൊതുവായതിനാൽ അത് പ്രശ്നമല്ല. സ്കാനറുകളുടെ regex matches ഒഴിവാക്കുക മാത്രമാണ് ലക്ഷ്യം.

## നിർബന്ധമായ പാറ്റേൺ

### 1. ഒരു പുതിയ പൊതു credential ചേർക്കൽ

താഴെപ്പറയുന്ന വ്യവസ്ഥകൾ പാലിക്കുന്ന ഒരു പുതിയ അപ്സ്ട്രീം മൂല്യം ഉൾച്ചേർക്കേണ്ടിവരുമ്പോൾ:

- അത് ഒരു പൊതു CLI / desktop app / browser bundle-ൽ നിന്നുള്ളതായിരിക്കണം, **കൂടാതെ**
- അപ്സ്ട്രീം പ്രൊവൈഡർ അതിനെ പൊതു client identifier ആയി രേഖപ്പെടുത്തുകയോ പരിഗണിക്കുകയോ ചെയ്യണം, **കൂടാതെ**
- അല്ലാത്തപക്ഷം ഒരു pattern scanner അതിനെ കണ്ടെത്തുന്നതായിരിക്കണം (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, തുടങ്ങിയവ),

…ഈ checklist പിന്തുടരുക:

1. മാസ്ക് ചെയ്ത byte sequence സൃഷ്ടിക്കുക:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts`-ലെ `EMBEDDED_DEFAULTS`-ലേക്ക് ഒരു **നിഷ്പക്ഷമായ key name** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, തുടങ്ങിയവ) ഉപയോഗിച്ച് പുതിയ entry ചേർക്കുക. Helper-ൽ `client_secret` അല്ലെങ്കിൽ `api_key` പോലുള്ള പേരുകൾ ഉപയോഗിക്കരുത് — ആ വാക്കുകൾ Semgrep generic-secret rules ട്രിഗർ ചെയ്യും.

3. പൊതു type union-ലേക്ക് ഒരു `keyof typeof EMBEDDED_DEFAULTS` ചേർക്കുക (ഇത് സ്വയമേവ infer ചെയ്യപ്പെടുന്നു).

4. Consumer code-ൽ hardcoded literal-ന് പകരം താഴെപ്പറയുന്നത് ഉപയോഗിക്കുക:

   ```ts
   // ഒരൊറ്റ env override
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // ഒന്നിലധികം env aliases (ഒഴിഞ്ഞതല്ലാത്ത ആദ്യത്തേതിന് മുൻഗണന)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // env override ഇല്ല (എപ്പോഴും ഉൾച്ചേർത്ത default)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. `.env.example`-ൽ നിന്ന് literal നീക്കം ചെയ്യുക (വായനക്കാരെ ഇവിടേക്ക് നയിക്കുന്ന comment-only documentation ഉപയോഗിച്ച് മാറ്റിസ്ഥാപിക്കുക):

   ```dotenv
   # ── പ്രൊവൈഡർ (Google / Firebase / തുടങ്ങിയവ) ──
   # പൊതു OAuth credentials കോഡിൽ ഉൾച്ചേർത്തിരിക്കുന്നത്
   # open-sse/utils/publicCreds.ts വഴിയാണ്. നിങ്ങളുടേതായവ ഉപയോഗിക്കാൻ മാത്രം ഈ vars സജ്ജമാക്കുക.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. പുതിയ key-ക്കായി ഒരു shape assertion ചേർക്കുന്നതിന് `tests/unit/publicCreds.test.ts` പുതുക്കുക (literal value അല്ല, format ആണ് പരിശോധിക്കേണ്ടത് — പാറ്റേണിനായി നിലവിലുള്ള tests കാണുക).

7. Test files-ലേക്ക് `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` literals **ഒരിക്കലും** ചേർക്കരുത്. `.join("")` fragments ഉപയോഗിച്ച് നിർമ്മിച്ച `FAKE_*` constants ഉപയോഗിക്കുക (നിലവിലുള്ള tests കാണുക).

### 2. Consumers

- **`resolvePublicCred()` / `resolvePublicCredMulti()` വഴി മാത്രം വായിക്കുക** — helper-ന് പുറത്ത് `decodePublicCredBytes()` നേരിട്ട് ഒരിക്കലും വിളിക്കരുത്.
- Helper മനഃപൂർവം ചെലവ് കുറഞ്ഞതാണ് (linear byte XOR), module-load സമയത്ത് വിളിക്കുന്നത് സുരക്ഷിതവുമാണ്; defaults ഒരിക്കൽ മാത്രമാണ് കണക്കാക്കുന്നത്.
- Env override-ന് എപ്പോഴും മുൻഗണന ലഭിക്കും. ഒരു ഉപയോക്താവ് `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` സജ്ജമാക്കിയാൽ, helper ആ raw value മാറ്റമില്ലാതെ കൈമാറും.

### 3. നിരോധിച്ച പാറ്റേണുകൾ

❌ Production code-ൽ (`src/`, `open-sse/`, `electron/`, `bin/`) താഴെപ്പറയുന്നവയിൽ ഒന്നും **ഒരിക്കലും** ചെയ്യരുത്:

```ts
// തെറ്റ്: literal value Secret Scanning + Semgrep ട്രിഗർ ചെയ്യുന്നു
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// തെറ്റ്: literal-ന്റെ base64 — Feb/2025 മുതൽ GitHub ഇതും കണ്ടെത്തുന്നു
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// തെറ്റ്: runtime-ൽ pattern വീണ്ടും കൂട്ടിച്ചേർക്കുന്ന string concatenation
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// തെറ്റ്: hex/ROT13 encoding — വ്യത്യസ്ത obfuscation, കണ്ടെത്തപ്പെടാനുള്ള അതേ സാധ്യത
clientSecret: hexDecode("474f4353..."),
```

ഇവയെല്ലാം ഒടുവിൽ ഏതെങ്കിലും scanner ട്രിഗർ ചെയ്യും. `resolvePublicCred()` ഉപയോഗിക്കുക.

❌ `.env.example`-ലേക്ക് literal credentials **ഒരിക്കലും** ചേർക്കരുത്. യഥാർഥ അപ്സ്ട്രീം മൂല്യങ്ങൾ ആവശ്യമുള്ള ഉപയോക്താക്കൾക്ക് അവ പൊതു CLI-ൽ നിന്ന് സ്വയം extract ചെയ്യാം, അല്ലെങ്കിൽ സ്വന്തം OAuth registration ഉപയോഗിക്കാം.

❌ Credential ഈ helper-ലേക്ക് മാറ്റേണ്ടതാണോ എന്ന് ആദ്യം പരിശോധിക്കാതെ പുതിയ secret-scanning alert **ഒരിക്കലും** നിരസിക്കരുത്.

## ബന്ധപ്പെട്ട നിയന്ത്രണങ്ങൾ

- `publicCreds.ts`-ലെ `RAW_VALUE_PATTERN`, മാറ്റമില്ലാതെ കടത്തിവിടൽ (പിന്നോക്ക അനുയോജ്യത) പ്രവർത്തനക്ഷമമാക്കുന്ന പ്രിഫിക്സുകൾ പട്ടികപ്പെടുത്തുന്നു. രേഖപ്പെടുത്തിയിട്ടുള്ള പൊതു ക്രെഡൻഷ്യൽ ഫോർമാറ്റുകൾക്കായി മാത്രം ഇത് വിപുലീകരിക്കുക; ഉടമസ്ഥാവകാശമുള്ള രഹസ്യങ്ങൾക്കായി ഒരിക്കലും അരുത്.
- `.env.example`, CI-യുടെ `check-env-doc-sync` സ്ക്രിപ്റ്റിൽ ഉൾപ്പെടുന്നു — ഇവിടെ നിന്ന് ഒരു വേരിയബിൾ നീക്കം ചെയ്യുമ്പോൾ, ഡോക്യുമെന്റേഷനും അതിനനുസരിച്ചാണെന്ന് ഉറപ്പാക്കുക.
- `npm run test:vitest`, `node --import tsx/esm --test tests/unit/publicCreds.test.ts` എന്നീ ടെസ്റ്റ് സ്യൂട്ടുകൾ രണ്ടും വിജയകരമായി തുടരേണ്ടതാണ്.

## ഈ ഹെൽപ്പർ ഉപയോഗിക്കാൻ പാടില്ലാത്ത സാഹചര്യങ്ങൾ

ഇനിപ്പറയുന്ന തരത്തിലുള്ള ക്രെഡൻഷ്യലുകൾക്ക് **മാത്രമാണ്** ഈ ഹെൽപ്പർ:

1. അപ്സ്ട്രീം പ്രൊവൈഡർ പരസ്യമായി വിതരണം ചെയ്യുന്നവ (CLI ബൈനറി, ബ്രൗസർ ബണ്ടിൽ, ഔദ്യോഗിക ഡോക്യുമെന്റേഷൻ).
2. രഹസ്യസ്വഭാവമില്ലാത്തവയാണെന്ന് രേഖപ്പെടുത്തിയിട്ടുള്ളതോ ശക്തമായി സൂചിപ്പിച്ചിട്ടുള്ളതോ ആയവ (PKCE സംരക്ഷണമുള്ളവ, Firebase Web കീ, സമാനമായവ).

മറ്റെല്ലാത്തിനും — ഓപ്പറേറ്റർ നൽകുന്ന ടോക്കണുകൾ, ഓരോ ടെനന്റിനുമുള്ള രഹസ്യങ്ങൾ, നിങ്ങളുടെ സ്വന്തം OAuth ആപ്പിന്റെ client_secret, എൻക്രിപ്ഷൻ കീകൾ, JWT രഹസ്യങ്ങൾ, ഡാറ്റാബേസ് പാസ്വേഡുകൾ — **env vars മാത്രം** ഉപയോഗിക്കുക (`process.env.FOO`, `||` ഉപയോഗിച്ച് ശൂന്യമായ മൂല്യത്തിലേക്കുള്ള ഫാൾബാക്ക് / വ്യക്തമായ പിശക്). ഇവ സോഴ്സിലല്ല, `.env`-ലും [എൻക്രിപ്റ്റ് ചെയ്ത ക്രെഡൻഷ്യൽ സ്റ്റോറിലുമാണ്](./COMPLIANCE.md) ഉൾപ്പെടേണ്ടത്.

## അവലംബങ്ങൾ

- [Google: നേറ്റീവ് ആപ്പുകൾക്കായുള്ള OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: ക്ലയന്റ് തിരിച്ചറിയലിനുള്ള API കീകൾ](https://firebase.google.com/docs/projects/api-keys)
- [GitHub രഹസ്യ സ്കാനിംഗ് പിന്തുണയ്ക്കുന്ന രഹസ്യങ്ങൾ](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: ടോക്കണുകൾക്കായുള്ള base64 കണ്ടെത്തൽ (ഫെബ്രുവരി 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- ഈ ഹെൽപ്പർ അവതരിപ്പിച്ച കമ്മിറ്റ്: `1a39c31f` — _fix(security): പൊതു അപ്സ്ട്രീം ക്രെഡൻഷ്യലുകൾ മറയ്ക്കുക + പിശക് ശുദ്ധീകരണം കേന്ദ്രീകരിക്കുക_
