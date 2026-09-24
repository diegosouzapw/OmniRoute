# Public Credentials Handling (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇧🇦 [bs](../../../bs/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **अधिकृत स्रोत:** `open-sse/utils/publicCreds.ts`
> **चाचण्या:** `tests/unit/publicCreds.test.ts`
> **शेवटचे अद्यतन:** 2026-08-07 — v3.8.50
> **वाचकवर्ग:** त्यांच्या सार्वजनिक CLIs मध्ये सार्वजनिक OAuth client_id / client_secret / Firebase Web API keys पुरवणारे providers समाकलित करणारे अभियंते.
> **स्थिती:** upstream identifiers अंतर्भूत करणाऱ्या सर्व नवीन कोडसाठी **अनिवार्य**.

## हे का अस्तित्वात आहे

- [मूळ apps साठी OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — स्थापित apps साठीचे OAuth client_id / client_secret सार्वजनिक असतात; प्रत्यक्ष सुरक्षा PKCE पुरवते.
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — Web client identifiers हे रचनेनुसार सार्वजनिक असतात.

OmniRoute ने ही मूल्ये अंतर्भूत करणे आवश्यक आहे, जेणेकरून `.env` कॉन्फिगर न करणाऱ्या वापरकर्त्यांनाही कोणत्याही अतिरिक्त कॉन्फिगरेशनशिवाय कार्यरत OAuth flow मिळेल. अंतर्भूत fallback शिवाय, "फक्त clone करा आणि चालवा" हा मार्ग अनुसरणाऱ्या कोणत्याही वापरकर्त्यासाठी Gemini / Antigravity providers काम करणे थांबवतात.

मात्र, `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` यांसारखी अक्षरशः मूल्ये **GitHub Secret Scanning**, **Semgrep**, आणि तत्सम pattern scanners द्वारे जुळवली जातात. प्रत्येक release मध्ये false positives चा अनावश्यक पूर येतो, push protection वैध commits अवरोधित करते, आणि operators alert feed वर विश्वास ठेवणे थांबवतात.

`open-sse/utils/publicCreds.ts` helper दोन्ही निर्बंध एकाच वेळी सोडवतो:

- सार्वजनिक identifier ला **XOR-masked byte sequence** म्हणून अंतर्भूत करतो (source मध्ये scanner pattern नसतो).
- runtime वेळी `decodePublicCred` / `resolvePublicCred` द्वारे decode करतो.
- आधीपासूनच सुप्रसिद्ध prefixes (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) अनुसरणारी raw values शोधतो आणि ती बदल न करता पुढे पाठवतो, त्यामुळे त्यांच्या विद्यमान `.env` मध्ये raw values असलेले वापरकर्ते **कोणत्याही migration शिवाय** काम सुरू ठेवू शकतात.

हे **obfuscation आहे, encryption नाही.** source वाचणारा कोणीही मूल्य पुनर्प्राप्त करू शकतो — आणि ते योग्यच आहे, कारण हे मूल्य रचनेनुसार सार्वजनिक आहे. scanner regex matches टाळणे हेच एकमेव उद्दिष्ट आहे.

## अनिवार्य pattern

### 1. नवीन सार्वजनिक credential जोडणे

जेव्हा तुम्हाला upstream ने पुरवलेले असे नवीन मूल्य अंतर्भूत करायचे असेल जे:

- सार्वजनिक CLI / desktop app / browser bundle मधून येते, **आणि**
- upstream provider त्याचे सार्वजनिक client identifier म्हणून दस्तऐवजीकरण करतो (किंवा त्याला तसे मानतो), **आणि**
- pattern scanner अन्यथा ते जुळवेल (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, इ.),

…तेव्हा ही checklist अनुसरा:

1. masked byte sequence तयार करा:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts` मधील `EMBEDDED_DEFAULTS` मध्ये **तटस्थ key name** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, इ.) वापरून नवीन entry जोडा. helper मध्ये `client_secret` किंवा `api_key` यांसारखी नावे वापरू **नका** — हे शब्द Semgrep generic-secret rules trigger करतात.

3. public type union मध्ये `keyof typeof EMBEDDED_DEFAULTS` जोडा (ते आपोआप infer केले जाते).

4. consumer code मध्ये hardcoded literal च्या जागी हे वापरा:

   ```ts
   // एकमेव env override
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // अनेक env aliases (पहिले रिक्त नसलेले मूल्य निवडले जाते)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // env override नाही (नेहमी अंतर्भूत default)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. `.env.example` मधून literal काढून टाका (त्याऐवजी वाचकांना येथे निर्देशित करणारे केवळ comments असलेले documentation ठेवा):

   ```dotenv
   # ── Provider (Google / Firebase / इ.) ──
   # सार्वजनिक OAuth credentials कोडमध्ये यामार्फत अंतर्भूत केलेली आहेत:
   # open-sse/utils/publicCreds.ts. स्वतःची मूल्ये वापरण्यासाठीच ही vars सेट करा.
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. नवीन key साठी shape assertion जोडण्यासाठी `tests/unit/publicCreds.test.ts` अद्यतनित करा (literal value नव्हे, तर format verify करा — pattern साठी विद्यमान tests पहा).

7. test files मध्ये `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` literals **कधीही** जोडू नका. `.join("")` fragments पासून तयार केलेले `FAKE_*` constants वापरा (विद्यमान tests पहा).

### 2. Consumers

- **केवळ `resolvePublicCred()` / `resolvePublicCredMulti()` मधूनच वाचा** — helper च्या बाहेर `decodePublicCredBytes()` ला कधीही थेट call करू नका.
- helper हेतुपुरस्सर कमी खर्चिक (linear byte XOR) आहे आणि module-load वेळी call करण्यासाठी सुरक्षित आहे; defaults एकदाच compute केली जातात.
- env override ला नेहमी प्राधान्य असते. वापरकर्त्याने `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` सेट केल्यास, helper ते raw value कोणताही बदल न करता पुढे पाठवतो.

### 3. प्रतिबंधित patterns

❌ production code मध्ये (`src/`, `open-sse/`, `electron/`, `bin/`) खालीलपैकी काहीही **कधीही** करू नका:

```ts
// चुकीचे: literal value मुळे Secret Scanning + Semgrep trigger होतात
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// चुकीचे: literal चे base64 — Feb/2025 पासून GitHub तरीही ते शोधते
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// चुकीचे: runtime वेळी pattern पुन्हा जोडणारे string concatenation
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// चुकीचे: hex/ROT13 encoding — वेगळे obfuscation, detection चा तोच धोका
clientSecret: hexDecode("474f4353..."),
```

हे सर्व अखेरीस scanner trigger करतात. `resolvePublicCred()` वापरा.

❌ `.env.example` मध्ये literal credentials **कधीही** जोडू नका. ज्या वापरकर्त्यांना वास्तविक upstream values आवश्यक आहेत ते ती स्वतः सार्वजनिक CLI मधून extract करू शकतात किंवा त्यांची स्वतःची OAuth registration वापरू शकतात.

❌ credential या helper मध्ये हलवायला हवे का, हे प्रथम तपासल्याशिवाय नवीन secret-scanning alert **कधीही** dismiss करू नका.

## संबंधित नियंत्रणे

- `publicCreds.ts` मधील `RAW_VALUE_PATTERN` पासथ्रू सक्रिय करणाऱ्या उपसर्गांची यादी देते (मागील आवृत्त्यांशी सुसंगततेसाठी). केवळ दस्तऐवजीकरण केलेल्या सार्वजनिक क्रेडेन्शियल स्वरूपांसाठीच ती विस्तारित करा; मालकी हक्क असलेल्या गुपितांसाठी कधीही करू नका.
- `.env.example` हे CI च्या `check-env-doc-sync` स्क्रिप्टमध्ये समाविष्ट आहे — येथून एखादा व्हेरिएबल काढून टाकताना, दस्तऐवज त्याच्याशी जुळत असल्याची खात्री करा.
- `npm run test:vitest` आणि `node --import tsx/esm --test tests/unit/publicCreds.test.ts` हे दोन्ही संच यशस्वी राहिले पाहिजेत.

## हा हेल्पर कधी वापरू नये

हा हेल्पर **फक्त** अशा क्रेडेन्शियल्ससाठी आहे जी:

1. अपस्ट्रीम प्रदात्याद्वारे सार्वजनिकरीत्या वितरित केली जातात (CLI बायनरी, ब्राउझर बंडल, अधिकृत दस्तऐवज).
2. गोपनीय नसल्याचे दस्तऐवजीकरण केलेले आहे किंवा तसे ठामपणे सूचित केलेले आहे (PKCE-संरक्षित, Firebase Web की किंवा तत्सम).

इतर सर्व गोष्टींसाठी — ऑपरेटरने जारी केलेली टोकन्स, प्रत्येक टेनंटसाठी स्वतंत्र गुपिते, तुमच्या स्वतःच्या OAuth ॲपचे client_secret, एन्क्रिप्शन कीज, JWT गुपिते, डेटाबेस पासवर्ड — **फक्त env vars** वापरा (`process.env.FOO`, रिकाम्या मूल्यावर `||` फॉलबॅक / स्पष्ट त्रुटी). ही मूल्ये सोर्समध्ये नव्हे, तर `.env` आणि [एन्क्रिप्टेड क्रेडेन्शियल्स स्टोअर](./COMPLIANCE.md) मध्ये असली पाहिजेत.

## संदर्भ

- [Google: नेटिव्ह ॲप्ससाठी OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: क्लायंट ओळखीसाठी API कीज](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning द्वारे समर्थित गुपिते](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: टोकन्ससाठी base64 शोध (फेब्रुवारी 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- हा हेल्पर सादर करणारी कमिट: `1a39c31f` — _fix(security): सार्वजनिक अपस्ट्रीम क्रेडेन्शियल्स लपवा + त्रुटी निर्जंतुकीकरण केंद्रीकृत करा_
