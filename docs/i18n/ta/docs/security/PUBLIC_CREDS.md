# Public Credentials Handling (தமிழ்)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **உண்மையின் ஆதாரம்:** `open-sse/utils/publicCreds.ts`
> **சோதனைகள்:** `tests/unit/publicCreds.test.ts`
> **கடைசியாகப் புதுப்பிக்கப்பட்டது:** 2026-08-07 — v3.8.50
> **இலக்கு வாசகர்கள்:** தங்களின் பொது CLI-களில் பொது OAuth client_id / client_secret / Firebase Web API விசைகளை வழங்கும் வழங்குநர்களை ஒருங்கிணைக்கும் பொறியாளர்கள்.
> **நிலை:** அப்ஸ்ட்ரீம் அடையாளங்காட்டிகளை உட்பொதிக்கும் அனைத்து புதிய குறியீடுகளுக்கும் **கட்டாயம்**.

## இது ஏன் உள்ளது

- [நேட்டிவ் பயன்பாடுகளுக்கான OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — நிறுவப்பட்ட பயன்பாடுகளுக்கான OAuth client_id / client_secret பொதுவானவை; உண்மையான பாதுகாப்பை PKCE வழங்குகிறது.
- [Firebase API விசைகள்](https://firebase.google.com/docs/projects/api-keys) — Web கிளையன்ட் அடையாளங்காட்டிகள் வடிவமைப்பின்படியே பொதுவானவை.

`.env`-ஐ உள்ளமைக்காத பயனர்களுக்கும் உடனடியாகச் செயல்படும் OAuth ஓட்டம் கிடைப்பதற்காக OmniRoute இந்த மதிப்புகளை உட்பொதிக்க வேண்டும். உட்பொதிக்கப்பட்ட மாற்று மதிப்பு இல்லையெனில், "குளோன் செய்து இயக்குங்கள்" என்ற பாதையைப் பின்பற்றும் எந்தப் பயனருக்கும் Gemini / Antigravity வழங்குநர்கள் செயல்படுவதை நிறுத்திவிடும்.

இருப்பினும், `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` போன்ற நேரடி மதிப்புகளை **GitHub Secret Scanning**, **Semgrep** மற்றும் இதேபோன்ற வடிவக் கண்டறியும் ஸ்கேனர்கள் பொருத்திக் கண்டறிகின்றன. ஒவ்வொரு வெளியீடும் தவறான நேர்மறை எச்சரிக்கைகளின் இரைச்சலான தொடராக மாறுகிறது, push பாதுகாப்பு முறையான commit-களைத் தடுக்கிறது, மேலும் இயக்குநர்கள் எச்சரிக்கை ஊட்டத்தை நம்புவதை நிறுத்துகின்றனர்.

`open-sse/utils/publicCreds.ts` உதவிச் செயலி இரண்டு கட்டுப்பாடுகளையும் ஒரே நேரத்தில் தீர்க்கிறது:

- பொது அடையாளங்காட்டியை **XOR-மறைக்கப்பட்ட பைட் தொடராக** உட்பொதிக்கிறது (மூலத்தில் ஸ்கேனர் வடிவம் எதுவும் இருக்காது).
- இயக்க நேரத்தில் `decodePublicCred` / `resolvePublicCred` வழியாகக் குறிநீக்குகிறது.
- ஏற்கெனவே நன்கு அறியப்பட்ட முன்னொட்டுகளைப் பின்பற்றும் மூல மதிப்புகளைக் (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) கண்டறிந்து, அவற்றை மாற்றமின்றி அனுப்புகிறது; இதனால் தங்களின் தற்போதைய `.env`-இல் மூல மதிப்புகளை வைத்திருக்கும் பயனர்களுக்கு **எந்த இடம்பெயர்வும் இன்றி** தொடர்ந்து செயல்படும்.

இது **மறைத்தல் மட்டுமே, குறியாக்கம் அல்ல.** மூலக் குறியீட்டைப் படிக்கும் எவரும் மதிப்பை மீட்டெடுக்க முடியும் — அந்த மதிப்பு வடிவமைப்பின்படியே பொதுவானது என்பதால் இது பிரச்சினையல்ல. ஸ்கேனரின் regex பொருத்தங்களைத் தவிர்ப்பது மட்டுமே இதன் நோக்கம்.

## கட்டாய முறை

### 1. புதிய பொது சான்றைச் சேர்த்தல்

பின்வரும் பண்புகளைக் கொண்ட, அப்ஸ்ட்ரீம் வழங்கிய புதிய மதிப்பை நீங்கள் உட்பொதிக்க வேண்டியிருக்கும் போது:

- அது ஒரு பொது CLI / டெஸ்க்டாப் பயன்பாடு / உலாவித் தொகுப்பிலிருந்து வருகிறது, **மேலும்**
- அப்ஸ்ட்ரீம் வழங்குநர் அதை ஒரு பொது கிளையன்ட் அடையாளங்காட்டியாக ஆவணப்படுத்துகிறார் (அல்லது அவ்வாறே கையாளுகிறார்), **மேலும்**
- இல்லையெனில் ஒரு வடிவ ஸ்கேனர் அதைப் பொருத்திக் கண்டறியும் (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com` போன்றவை),

…இந்தச் சரிபார்ப்புப் பட்டியலைப் பின்பற்றவும்:

1. மறைக்கப்பட்ட பைட் தொடரை உருவாக்கவும்:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts`-இல் உள்ள `EMBEDDED_DEFAULTS`-க்கு **நடுநிலையான விசைப் பெயருடன்** (`<provider>_id`, `<provider>_alt`, `<provider>_fb` போன்றவை) புதிய பதிவைச் சேர்க்கவும். உதவிச் செயலியில் `client_secret` அல்லது `api_key` போன்ற பெயர்களைப் பயன்படுத்த **வேண்டாம்** — அந்தச் சொற்கள் Semgrep-இன் பொதுவான ரகசிய விதிகளைத் தூண்டுகின்றன.

3. பொது வகைக் கூட்டிணைவில் `keyof typeof EMBEDDED_DEFAULTS`-ஐச் சேர்க்கவும் (இது தானாகவே அனுமானிக்கப்படுகிறது).

4. பயன்படுத்தும் குறியீட்டில், கடினமாகக் குறியிடப்பட்ட நேரடி மதிப்பைப் பின்வருமாறு மாற்றவும்:

   ```ts
   // ஒரே env மேலெழுதுதல்
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // பல env மாற்றுப் பெயர்கள் (காலியாக இல்லாத முதலாவது மதிப்பு வெல்லும்)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // env மேலெழுதுதல் இல்லை (எப்போதும் உட்பொதிக்கப்பட்ட இயல்புநிலை)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. `.env.example`-இலிருந்து நேரடி மதிப்பை அகற்றவும் (வாசகர்களை இங்கே சுட்டும் கருத்துகள் மட்டுமே கொண்ட ஆவணமாக மாற்றவும்):

   ```dotenv
   # ── வழங்குநர் (Google / Firebase / போன்றவை) ──
   # பொது OAuth சான்றுகள் குறியீட்டில் பின்வருவதன் வழியாக உட்பொதிக்கப்பட்டுள்ளன:
   # open-sse/utils/publicCreds.ts. உங்கள் சொந்த மதிப்புகளைப் பயன்படுத்த மட்டுமே இந்த மாறிகளை அமைக்கவும்.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. புதிய விசைக்கான வடிவமைப்பு உறுதிப்படுத்தலைச் சேர்க்க `tests/unit/publicCreds.test.ts`-ஐப் புதுப்பிக்கவும் (நேரடி மதிப்பை அல்ல, வடிவமைப்பைச் சரிபார்க்கவும் — இந்த முறைக்கு ஏற்கெனவே உள்ள சோதனைகளைப் பார்க்கவும்).

7. சோதனைக் கோப்புகளில் `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` நேரடி மதிப்புகளை **ஒருபோதும்** சேர்க்க வேண்டாம். `.join("")` துண்டுகளிலிருந்து உருவாக்கப்பட்ட `FAKE_*` மாறிலிகளைப் பயன்படுத்தவும் (ஏற்கெனவே உள்ள சோதனைகளைப் பார்க்கவும்).

### 2. பயன்படுத்தும் குறியீடுகள்

- **`resolvePublicCred()` / `resolvePublicCredMulti()` ஆகியவற்றிலிருந்து மட்டுமே படிக்கவும்** — உதவிச் செயலிக்கு வெளியே `decodePublicCredBytes()`-ஐ ஒருபோதும் நேரடியாக அழைக்க வேண்டாம்.
- உதவிச் செயலி திட்டமிட்டே மலிவானது (நேரியல் பைட் XOR), மேலும் தொகுதி ஏற்றப்படும் நேரத்தில் அழைப்பதற்குப் பாதுகாப்பானது; இயல்புநிலைகள் ஒருமுறை மட்டுமே கணக்கிடப்படுகின்றன.
- env மேலெழுதுதல் எப்போதும் முன்னுரிமை பெறும். ஒரு பயனர் `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` என அமைத்தால், உதவிச் செயலி அந்த மூல மதிப்பை மாற்றமின்றி அனுப்பும்.

### 3. தடைசெய்யப்பட்ட முறைகள்

❌ தயாரிப்புக் குறியீட்டில் (`src/`, `open-sse/`, `electron/`, `bin/`) பின்வருவனவற்றில் எதையும் **ஒருபோதும்** செய்ய வேண்டாம்:

```ts
// தவறு: நேரடி மதிப்பு Secret Scanning + Semgrep-ஐத் தூண்டுகிறது
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// தவறு: நேரடி மதிப்பின் base64 — Feb/2025 முதல் GitHub இதையும் கண்டறிகிறது
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// தவறு: இயக்க நேரத்தில் வடிவத்தை மீண்டும் இணைக்கும் சரச் சேர்ப்பு
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// தவறு: hex/ROT13 குறியாக்கம் — வேறுபட்ட மறைத்தல், கண்டறியப்படும் அதே அபாயம்
clientSecret: hexDecode("474f4353..."),
```

இவை அனைத்தும் இறுதியில் ஒரு ஸ்கேனரைத் தூண்டும். `resolvePublicCred()`-ஐப் பயன்படுத்தவும்.

❌ நேரடி சான்றுகளை `.env.example`-இல் **ஒருபோதும்** சேர்க்க வேண்டாம். உண்மையான அப்ஸ்ட்ரீம் மதிப்புகள் தேவைப்படும் பயனர்கள் அவற்றைப் பொது CLI-இலிருந்து தாங்களே பிரித்தெடுக்கலாம் அல்லது தங்களுடைய சொந்த OAuth பதிவைப் பயன்படுத்தலாம்.

❌ சான்று இந்த உதவிச் செயலிக்கு நகர்த்தப்பட வேண்டுமா என்பதை முதலில் சரிபார்க்காமல், புதிய ரகசிய-ஸ்கேனிங் எச்சரிக்கையை **ஒருபோதும்** நிராகரிக்க வேண்டாம்.

## தொடர்புடைய கட்டுப்பாடுகள்

- `publicCreds.ts`-இல் உள்ள `RAW_VALUE_PATTERN`, நேரடியாகக் கடத்தப்படுவதைத் தூண்டும் முன்னொட்டுகளைப் பட்டியலிடுகிறது (பின்னோக்கிய இணக்கத்தன்மை). ஆவணப்படுத்தப்பட்ட பொதுச் சான்றுநற்சான்று வடிவங்களுக்கு மட்டுமே இதை விரிவாக்கவும்; தனியுரிம இரகசியங்களுக்காக ஒருபோதும் விரிவாக்க வேண்டாம்.
- `.env.example`, CI-இன் `check-env-doc-sync` ஸ்கிரிப்டில் பயன்படுத்தப்படுகிறது — இங்கு ஒரு மாறியை நீக்கும்போது, ஆவணங்களும் அதற்கு ஏற்ப இருப்பதை உறுதிசெய்யவும்.
- `npm run test:vitest` மற்றும் `node --import tsx/esm --test tests/unit/publicCreds.test.ts` சோதனைத் தொகுப்புகள் இரண்டும் தொடர்ந்து வெற்றிபெற வேண்டும்.

## இந்த உதவிநிரலை எப்போது பயன்படுத்தக் கூடாது

இந்த உதவிநிரல் பின்வரும் சான்றுநற்சான்றுகளுக்கு **மட்டுமே** உரியது:

1. மூல வழங்குநரால் பொதுவாக விநியோகிக்கப்படுபவை (CLI பைனரி, உலாவித் தொகுப்பு, அதிகாரப்பூர்வ ஆவணங்கள்).
2. இரகசியமானவை அல்ல என்று ஆவணப்படுத்தப்பட்டவை அல்லது வலுவாகக் குறிக்கப்படுபவை (PKCE-ஆல் பாதுகாக்கப்பட்டவை, Firebase Web விசை அல்லது அதைப் போன்றவை).

மற்ற அனைத்துக்கும் — இயக்குநரால் வழங்கப்பட்ட டோக்கன்கள், ஒவ்வொரு குத்தகையாளருக்குமான இரகசியங்கள், உங்கள் சொந்த OAuth செயலியின் client_secret, குறியாக்க விசைகள், JWT இரகசியங்கள், தரவுத்தளக் கடவுச்சொற்கள் — **சூழல் மாறிகளை மட்டும்** பயன்படுத்தவும் (`process.env.FOO`, `||` மூலம் காலி மதிப்புக்கான மாற்றுவழி / வெளிப்படையான பிழை). இவை மூலக் குறியீட்டில் அல்லாமல், `.env` மற்றும் [குறியாக்கப்பட்ட சான்றுநற்சான்றுச் சேமிப்பகத்தில்](./COMPLIANCE.md) இருக்க வேண்டும்.

## மேற்கோள்கள்

- [Google: சொந்தச் செயலிகளுக்கான OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: கிளையன்ட் அடையாளத்திற்கான API விசைகள்](https://firebase.google.com/docs/projects/api-keys)
- [GitHub இரகசிய ஸ்கேனிங் ஆதரிக்கும் இரகசியங்கள்](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: டோக்கன்களுக்கான base64 கண்டறிதல் (பிப்ரவரி 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- இந்த உதவிநிரலை அறிமுகப்படுத்திய commit: `1a39c31f` — _fix(security): பொது மூல வழங்குநர் சான்றுநற்சான்றுகளை மறைத்தல் + பிழைத் தூய்மைப்படுத்தலை மையப்படுத்துதல்_
