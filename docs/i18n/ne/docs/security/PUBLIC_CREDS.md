# Public Credentials Handling (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [hi](../../../hi/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **सत्यको आधिकारिक स्रोत:** `open-sse/utils/publicCreds.ts`
> **परीक्षणहरू:** `tests/unit/publicCreds.test.ts`
> **पछिल्लो अद्यावधिक:** 2026-08-07 — v3.8.50
> **लक्षित पाठक:** आफ्ना सार्वजनिक CLIs मा सार्वजनिक OAuth client_id / client_secret / Firebase Web API keys समावेश गर्ने प्रदायकहरू एकीकृत गरिरहेका इन्जिनियरहरू।
> **स्थिति:** अपस्ट्रिम पहिचानकर्ताहरू समावेश गर्ने सबै नयाँ कोडका लागि **अनिवार्य**।

## यो किन आवश्यक छ

- [नेटिभ एपहरूका लागि OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — इन्स्टल गरिएका एपहरूका OAuth client_id / client_secret सार्वजनिक हुन्छन्; वास्तविक सुरक्षा PKCE ले प्रदान गर्छ।
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — Web क्लाइन्ट पहिचानकर्ताहरू डिजाइनअनुसार नै सार्वजनिक हुन्छन्।

OmniRoute ले यी मानहरू समावेश गर्नैपर्छ, ताकि `.env` कन्फिगर नगर्ने प्रयोगकर्ताहरूले पनि कुनै अतिरिक्त सेटअपबिनै काम गर्ने OAuth प्रवाह प्राप्त गरून्। समावेश गरिएको फलब्याकबिना, "सिधै क्लोन गरेर चलाउने" बाटो अपनाउने कुनै पनि प्रयोगकर्ताका लागि Gemini / Antigravity प्रदायकहरूले काम गर्न छोड्छन्।

तर, `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` जस्ता शाब्दिक मानहरूलाई **GitHub Secret Scanning**, **Semgrep**, र यस्तै ढाँचा स्क्यानरहरूले मिलान गर्छन्। प्रत्येक रिलिज गलत सकारात्मक नतिजाहरूको अनावश्यक प्रवाह बन्छ, push protection ले वैध कमिटहरू रोक्छ, र सञ्चालकहरूले अलर्ट फिडमाथि भरोसा गर्न छोड्छन्।

`open-sse/utils/publicCreds.ts` सहायकले दुवै सीमिततालाई एकैपटक समाधान गर्छ:

- सार्वजनिक पहिचानकर्तालाई **XOR-मास्क गरिएको बाइट अनुक्रम** का रूपमा समावेश गर्छ (स्रोतमा कुनै स्क्यानर ढाँचा हुँदैन)।
- रनटाइममा `decodePublicCred` / `resolvePublicCred` मार्फत डिकोड गर्छ।
- पहिले नै प्रचलित प्रिफिक्सहरू (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) पालना गर्ने कच्चा मानहरू पत्ता लगाउँछ र तिनलाई अपरिवर्तित रूपमा पास गर्छ, जसले गर्दा आफ्नो विद्यमान `.env` मा कच्चा मानहरू भएका प्रयोगकर्ताहरूले **कुनै माइग्रेसनबिनै** काम जारी राख्न सक्छन्।

यो **अस्पष्टीकरण हो, इन्क्रिप्सन होइन।** स्रोत पढ्ने जोसुकैले पनि मान पुनःप्राप्त गर्न सक्छ — र यो ठीकै हो, किनभने मान डिजाइनअनुसार नै सार्वजनिक हो। यसको एकमात्र उद्देश्य स्क्यानरका regex मिलानहरूबाट बच्नु हो।

## अनिवार्य ढाँचा

### 1. नयाँ सार्वजनिक क्रेडेन्सियल थप्ने

तपाईंले अपस्ट्रिमद्वारा उपलब्ध गराइएको यस्तो नयाँ मान समावेश गर्नुपर्दा, जुन:

- सार्वजनिक CLI / डेस्कटप एप / ब्राउजर बन्डलबाट आउँछ, **र**
- अपस्ट्रिम प्रदायकले त्यसलाई सार्वजनिक क्लाइन्ट पहिचानकर्ताका रूपमा दस्तावेजीकृत (वा व्यवहार) गर्छ, **र**
- अन्यथा ढाँचा स्क्यानरले त्यसलाई मिलान गर्छ (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, आदि),

…यो जाँचसूची पालना गर्नुहोस्:

1. मास्क गरिएको बाइट अनुक्रम उत्पन्न गर्नुहोस्:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts` को `EMBEDDED_DEFAULTS` मा **तटस्थ कुञ्जी नाम** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, आदि) सहित नयाँ प्रविष्टि थप्नुहोस्। सहायकमा `client_secret` वा `api_key` जस्ता नामहरू प्रयोग **नगर्नुहोस्** — ती शब्दहरूले Semgrep का generic-secret नियमहरू सक्रिय गर्छन्।

3. सार्वजनिक type union मा `keyof typeof EMBEDDED_DEFAULTS` थप्नुहोस् (यो स्वचालित रूपमा अनुमान गरिन्छ)।

4. उपभोक्ता कोडमा, हार्डकोड गरिएको शाब्दिक मानलाई यसरी प्रतिस्थापन गर्नुहोस्:

   ```ts
   // एउटा env ओभरराइड
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // धेरै env उपनामहरू (पहिलो गैर-रिक्त मानले प्राथमिकता पाउँछ)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // कुनै env ओभरराइड छैन (सधैँ समावेश गरिएको पूर्वनिर्धारित मान)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. `.env.example` बाट शाब्दिक मान हटाउनुहोस् (पाठकहरूलाई यहाँ निर्देशित गर्ने टिप्पणी-मात्र दस्तावेजले प्रतिस्थापन गर्नुहोस्):

   ```dotenv
   # ── प्रदायक (Google / Firebase / आदि) ──
   # सार्वजनिक OAuth क्रेडेन्सियलहरू कोडमा यसमार्फत समावेश गरिएका छन्:
   # open-sse/utils/publicCreds.ts। आफ्नै मान प्रयोग गर्न मात्र यी vars सेट गर्नुहोस्।
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. नयाँ कुञ्जीका लागि आकारसम्बन्धी assertion थप्न `tests/unit/publicCreds.test.ts` अद्यावधिक गर्नुहोस् (शाब्दिक मान होइन, ढाँचा प्रमाणित गर्नुहोस् — ढाँचाका लागि विद्यमान परीक्षणहरू हेर्नुहोस्)।

7. परीक्षण फाइलहरूमा `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` शाब्दिक मानहरू **कहिल्यै** नथप्नुहोस्। `.join("")` खण्डहरूबाट बनाइएका `FAKE_*` constants प्रयोग गर्नुहोस् (विद्यमान परीक्षणहरू हेर्नुहोस्)।

### 2. उपभोक्ताहरू

- **`resolvePublicCred()` / `resolvePublicCredMulti()` बाट मात्र पढ्नुहोस्** — सहायकबाहिर `decodePublicCredBytes()` लाई कहिल्यै प्रत्यक्ष रूपमा कल नगर्नुहोस्।
- सहायकलाई जानाजानी कम खर्चिलो (रेखीय बाइट XOR) बनाइएको छ र module-load समयमा कल गर्न सुरक्षित छ; पूर्वनिर्धारित मानहरू एकपटक मात्र गणना गरिन्छन्।
- env ओभरराइडले सधैँ प्राथमिकता पाउँछ। प्रयोगकर्ताले `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` सेट गरेमा, सहायकले त्यो कच्चा मानलाई सीधै अपरिवर्तित रूपमा पास गर्छ।

### 3. निषेधित ढाँचाहरू

❌ उत्पादन कोड (`src/`, `open-sse/`, `electron/`, `bin/`) मा निम्नमध्ये कुनै पनि काम **कहिल्यै** नगर्नुहोस्:

```ts
// खराब: शाब्दिक मानले Secret Scanning + Semgrep सक्रिय गर्छ
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// खराब: शाब्दिक मानको base64 — GitHub ले Feb/2025 देखि अझै पनि पत्ता लगाउँछ
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// खराब: रनटाइममा ढाँचा पुनःजोड्ने स्ट्रिङ संयोजन
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// खराब: hex/ROT13 इन्कोडिङ — फरक अस्पष्टीकरण, पत्ता लाग्ने उही जोखिम
clientSecret: hexDecode("474f4353..."),
```

यी सबैले अन्ततः कुनै न कुनै स्क्यानर सक्रिय गर्छन्। `resolvePublicCred()` प्रयोग गर्नुहोस्।

❌ `.env.example` मा शाब्दिक क्रेडेन्सियलहरू **कहिल्यै** नथप्नुहोस्। वास्तविक अपस्ट्रिम मानहरू चाहिने प्रयोगकर्ताहरूले तिनलाई सार्वजनिक CLI बाट आफैँ निकाल्न वा आफ्नै OAuth दर्ता प्रयोग गर्न सक्छन्।

❌ क्रेडेन्सियललाई यो सहायकमा सार्नुपर्छ कि पर्दैन भनेर पहिले जाँच नगरी नयाँ secret-scanning अलर्टलाई **कहिल्यै** खारेज नगर्नुहोस्।

## सम्बन्धित नियन्त्रणहरू

- `publicCreds.ts` मा रहेको `RAW_VALUE_PATTERN` ले पासथ्रु ट्रिगर गर्ने प्रिफिक्सहरू सूचीबद्ध गर्छ (पश्चगामी अनुकूलताका लागि)। यसलाई दस्तावेजीकृत सार्वजनिक क्रेडेन्सियल ढाँचाहरूका लागि मात्र विस्तार गर्नुहोस्, स्वामित्वयुक्त गोप्य मानहरूका लागि कहिल्यै नगर्नुहोस्।
- `.env.example` CI को `check-env-doc-sync` स्क्रिप्टमा समावेश छ — यहाँबाट कुनै भेरिएबल हटाउँदा, दस्तावेजहरू पनि त्यसअनुरूप छन् भनी सुनिश्चित गर्नुहोस्।
- `npm run test:vitest` र `node --import tsx/esm --test tests/unit/publicCreds.test.ts` दुवै परीक्षण सुइट सफल भइरहनुपर्छ।

## यो हेल्पर कहिले प्रयोग नगर्ने

यो हेल्पर निम्न प्रकारका क्रेडेन्सियलहरूका लागि **मात्र** हो:

1. अपस्ट्रिम प्रदायकद्वारा सार्वजनिक रूपमा वितरण गरिएका (CLI बाइनरी, ब्राउजर बन्डल, आधिकारिक दस्तावेजहरू)।
2. गोप्य नरहेको भनी दस्तावेजीकृत वा स्पष्ट रूपमा सङ्केत गरिएका (PKCE-सुरक्षित, Firebase Web key वा यस्तै)।

अन्य सबैका लागि — अपरेटरद्वारा जारी गरिएका टोकनहरू, प्रत्येक टेनेन्टका गोप्य मानहरू, तपाईंको आफ्नै OAuth एपको client_secret, इन्क्रिप्सन कुञ्जीहरू, JWT गोप्य मानहरू, डेटाबेस पासवर्डहरू — **env vars मात्र** प्रयोग गर्नुहोस् (`process.env.FOO`, `||` मार्फत खाली मानमा फल्ब्याक / स्पष्ट त्रुटि)। यी स्रोत कोडमा होइन, `.env` र [इन्क्रिप्ट गरिएको क्रेडेन्सियल भण्डार](./COMPLIANCE.md) मा राखिनुपर्छ।

## सन्दर्भहरू

- [Google: नेटिभ एपहरूका लागि OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: क्लाइन्ट पहिचानका लागि API कुञ्जीहरू](https://firebase.google.com/docs/projects/api-keys)
- [GitHub Secret Scanning द्वारा समर्थित गोप्य मानहरू](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: टोकनहरूका लागि base64 पहिचान (फेब्रुअरी 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- यो हेल्पर समावेश गर्ने कमिट: `1a39c31f` — _fix(security): सार्वजनिक अपस्ट्रिम क्रेडेन्सियलहरू मास्क गर्ने + त्रुटि स्यानिटाइजेसन केन्द्रीकृत गर्ने_
