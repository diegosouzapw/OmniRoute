# Public Credentials Handling (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/PUBLIC_CREDS.md) · 🇪🇹 [am](../../../am/docs/security/PUBLIC_CREDS.md) · 🇸🇦 [ar](../../../ar/docs/security/PUBLIC_CREDS.md) · 🇦🇿 [az](../../../az/docs/security/PUBLIC_CREDS.md) · 🇧🇬 [bg](../../../bg/docs/security/PUBLIC_CREDS.md) · 🇧🇩 [bn](../../../bn/docs/security/PUBLIC_CREDS.md) · 🇨🇿 [cs](../../../cs/docs/security/PUBLIC_CREDS.md) · 🇩🇰 [da](../../../da/docs/security/PUBLIC_CREDS.md) · 🇩🇪 [de](../../../de/docs/security/PUBLIC_CREDS.md) · 🇬🇷 [el](../../../el/docs/security/PUBLIC_CREDS.md) · 🇪🇸 [es](../../../es/docs/security/PUBLIC_CREDS.md) · 🇪🇪 [et](../../../et/docs/security/PUBLIC_CREDS.md) · 🇮🇷 [fa](../../../fa/docs/security/PUBLIC_CREDS.md) · 🇫🇮 [fi](../../../fi/docs/security/PUBLIC_CREDS.md) · 🇫🇷 [fr](../../../fr/docs/security/PUBLIC_CREDS.md) · 🇮🇪 [ga](../../../ga/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [gu](../../../gu/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ha](../../../ha/docs/security/PUBLIC_CREDS.md) · 🇮🇱 [he](../../../he/docs/security/PUBLIC_CREDS.md) · 🇭🇷 [hr](../../../hr/docs/security/PUBLIC_CREDS.md) · 🇭🇺 [hu](../../../hu/docs/security/PUBLIC_CREDS.md) · 🇦🇲 [hy](../../../hy/docs/security/PUBLIC_CREDS.md) · 🇮🇩 [id](../../../id/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [ig](../../../ig/docs/security/PUBLIC_CREDS.md) · 🇮🇹 [it](../../../it/docs/security/PUBLIC_CREDS.md) · 🇯🇵 [ja](../../../ja/docs/security/PUBLIC_CREDS.md) · 🇬🇪 [ka](../../../ka/docs/security/PUBLIC_CREDS.md) · 🇰🇭 [km](../../../km/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [kn](../../../kn/docs/security/PUBLIC_CREDS.md) · 🇰🇷 [ko](../../../ko/docs/security/PUBLIC_CREDS.md) · 🇱🇹 [lt](../../../lt/docs/security/PUBLIC_CREDS.md) · 🇱🇻 [lv](../../../lv/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ml](../../../ml/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [mr](../../../mr/docs/security/PUBLIC_CREDS.md) · 🇲🇾 [ms](../../../ms/docs/security/PUBLIC_CREDS.md) · 🇲🇹 [mt](../../../mt/docs/security/PUBLIC_CREDS.md) · 🇲🇲 [my](../../../my/docs/security/PUBLIC_CREDS.md) · 🇳🇵 [ne](../../../ne/docs/security/PUBLIC_CREDS.md) · 🇳🇱 [nl](../../../nl/docs/security/PUBLIC_CREDS.md) · 🇳🇴 [no](../../../no/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [or](../../../or/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [pa](../../../pa/docs/security/PUBLIC_CREDS.md) · 🇵🇭 [phi](../../../phi/docs/security/PUBLIC_CREDS.md) · 🇵🇱 [pl](../../../pl/docs/security/PUBLIC_CREDS.md) · 🇵🇹 [pt](../../../pt/docs/security/PUBLIC_CREDS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/PUBLIC_CREDS.md) · 🇷🇴 [ro](../../../ro/docs/security/PUBLIC_CREDS.md) · 🇷🇺 [ru](../../../ru/docs/security/PUBLIC_CREDS.md) · 🇱🇰 [si](../../../si/docs/security/PUBLIC_CREDS.md) · 🇸🇰 [sk](../../../sk/docs/security/PUBLIC_CREDS.md) · 🇸🇮 [sl](../../../sl/docs/security/PUBLIC_CREDS.md) · 🇷🇸 [sr](../../../sr/docs/security/PUBLIC_CREDS.md) · 🇸🇪 [sv](../../../sv/docs/security/PUBLIC_CREDS.md) · 🇰🇪 [sw](../../../sw/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [ta](../../../ta/docs/security/PUBLIC_CREDS.md) · 🇮🇳 [te](../../../te/docs/security/PUBLIC_CREDS.md) · 🇹🇭 [th](../../../th/docs/security/PUBLIC_CREDS.md) · 🇹🇷 [tr](../../../tr/docs/security/PUBLIC_CREDS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/PUBLIC_CREDS.md) · 🇵🇰 [ur](../../../ur/docs/security/PUBLIC_CREDS.md) · 🇺🇿 [uz](../../../uz/docs/security/PUBLIC_CREDS.md) · 🇻🇳 [vi](../../../vi/docs/security/PUBLIC_CREDS.md) · 🇳🇬 [yo](../../../yo/docs/security/PUBLIC_CREDS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/PUBLIC_CREDS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/PUBLIC_CREDS.md)

---

> **सत्य का स्रोत:** `open-sse/utils/publicCreds.ts`
> **परीक्षण:** `tests/unit/publicCreds.test.ts`
> **अंतिम अपडेट:** 2026-08-07 — v3.8.50
> **पाठक:** ऐसे प्रदाताओं को एकीकृत करने वाले इंजीनियर, जो अपनी सार्वजनिक CLIs में सार्वजनिक OAuth client_id / client_secret / Firebase Web API keys प्रदान करते हैं।
> **स्थिति:** अपस्ट्रीम पहचानकर्ताओं को एम्बेड करने वाले सभी नए कोड के लिए **अनिवार्य**।

## यह क्यों मौजूद है

- [नेटिव ऐप्स के लिए OAuth 2.0 (PKCE)](https://developers.google.com/identity/protocols/oauth2/native-app) — इंस्टॉल किए गए ऐप्स के OAuth client_id / client_secret सार्वजनिक होते हैं; वास्तविक सुरक्षा PKCE प्रदान करता है।
- [Firebase API keys](https://firebase.google.com/docs/projects/api-keys) — Web क्लाइंट पहचानकर्ता डिज़ाइन के अनुसार सार्वजनिक होते हैं।

OmniRoute को इन मानों को एम्बेड करना आवश्यक है, ताकि `.env` कॉन्फ़िगर न करने वाले उपयोगकर्ताओं को भी बिना अतिरिक्त सेटअप के एक कार्यशील OAuth फ़्लो मिले। एम्बेडेड फ़ॉलबैक के बिना, "बस क्लोन करें और चलाएँ" वाला तरीका अपनाने वाले किसी भी उपयोगकर्ता के लिए Gemini / Antigravity प्रदाता काम करना बंद कर देते हैं।

हालाँकि, `AIzaSy…`, `GOCSPX-…`, `…apps.googleusercontent.com` जैसे लिटरल मानों का मिलान **GitHub Secret Scanning**, **Semgrep**, और इसी तरह के पैटर्न स्कैनर द्वारा किया जाता है। हर रिलीज़ फ़ॉल्स पॉज़िटिव की शोर-भरी धारा बन जाती है, पुश प्रोटेक्शन वैध कमिट्स को ब्लॉक कर देता है, और ऑपरेटर अलर्ट फ़ीड पर भरोसा करना बंद कर देते हैं।

`open-sse/utils/publicCreds.ts` हेल्पर दोनों बाधाओं को एक साथ हल करता है:

- सार्वजनिक पहचानकर्ता को **XOR-मास्क की गई बाइट शृंखला** के रूप में एम्बेड करता है (स्रोत में कोई स्कैनर पैटर्न नहीं)।
- रनटाइम पर `decodePublicCred` / `resolvePublicCred` के माध्यम से डीकोड करता है।
- पहले से जाने-पहचाने प्रीफ़िक्स (`AIza`, `GOCSPX-`, `<digits>-<32hex>.apps.googleusercontent.com`, `Iv1.<hex>`) का पालन करने वाले रॉ मानों का पता लगाता है और उन्हें बिना बदले आगे भेज देता है, ताकि मौजूदा `.env` में रॉ मान रखने वाले उपयोगकर्ताओं के लिए **शून्य माइग्रेशन** के साथ सब कुछ काम करता रहे।

यह **ऑब्फ़स्केशन है, एन्क्रिप्शन नहीं।** स्रोत पढ़ने वाला कोई भी व्यक्ति मान को पुनर्प्राप्त कर सकता है — जो ठीक है, क्योंकि मान डिज़ाइन के अनुसार सार्वजनिक है। इसका एकमात्र उद्देश्य स्कैनर के रेगुलर एक्सप्रेशन से मिलान से बचना है।

## अनिवार्य पैटर्न

### 1. नया सार्वजनिक क्रेडेंशियल जोड़ना

जब आपको अपस्ट्रीम द्वारा दिया गया कोई नया मान एम्बेड करना हो, जो:

- किसी सार्वजनिक CLI / डेस्कटॉप ऐप / ब्राउज़र बंडल से आता हो, **और**
- जिसे अपस्ट्रीम प्रदाता सार्वजनिक क्लाइंट पहचानकर्ता के रूप में प्रलेखित करता हो (या ऐसा मानता हो), **और**
- जिसका अन्यथा कोई पैटर्न स्कैनर मिलान कर लेता (`AIza…`, `GOCSPX-…`, `<digits>-…apps.googleusercontent.com`, आदि),

…तो इस चेकलिस्ट का पालन करें:

1. मास्क की गई बाइट शृंखला जनरेट करें:

   ```bash
   node --import tsx/esm -e \
     'import("./open-sse/utils/publicCreds.ts").then(m =>
        console.log(JSON.stringify(Array.from(
          Buffer.from(m.encodePublicCred("THE_PUBLIC_VALUE"), "base64")
        ))))'
   ```

2. `open-sse/utils/publicCreds.ts` में `EMBEDDED_DEFAULTS` हेतु एक **तटस्थ कुंजी नाम** (`<provider>_id`, `<provider>_alt`, `<provider>_fb`, आदि) वाली नई प्रविष्टि जोड़ें। हेल्पर में `client_secret` या `api_key` जैसे नामों का उपयोग **न करें** — ये शब्द Semgrep के जेनेरिक-सीक्रेट नियमों को ट्रिगर करते हैं।

3. सार्वजनिक टाइप यूनियन में `keyof typeof EMBEDDED_DEFAULTS` जोड़ें (यह स्वचालित रूप से अनुमानित होता है)।

4. उपभोक्ता कोड में हार्डकोड किए गए लिटरल को इससे बदलें:

   ```ts
   // एकल env ओवरराइड
   clientSecret: resolvePublicCred("provider_alt", "PROVIDER_OAUTH_CLIENT_SECRET"),

   // एकाधिक env उपनाम (पहला गैर-रिक्त मान प्रभावी होगा)
   clientId: resolvePublicCredMulti("provider_id", [
     "PROVIDER_CLI_OAUTH_CLIENT_ID",
     "PROVIDER_OAUTH_CLIENT_ID",
   ]),

   // कोई env ओवरराइड नहीं (हमेशा एम्बेडेड डिफ़ॉल्ट)
   firebaseApiKey: resolvePublicCred("provider_fb"),
   ```

5. लिटरल को `.env.example` से हटाएँ (उसकी जगह केवल-कमेंट वाला दस्तावेज़ जोड़ें, जो पाठकों को यहाँ भेजता हो):

   ```dotenv
   # ── प्रदाता (Google / Firebase / आदि) ──
   # सार्वजनिक OAuth क्रेडेंशियल कोड में इसके माध्यम से अंतर्निहित हैं:
   # open-sse/utils/publicCreds.ts। इन वेरिएबल्स को केवल अपने मान उपयोग करने के लिए सेट करें।
   # PROVIDER_OAUTH_CLIENT_ID=
   # PROVIDER_OAUTH_CLIENT_SECRET=
   ```

6. नई कुंजी के लिए एक आकार अभिकथन जोड़ने हेतु `tests/unit/publicCreds.test.ts` अपडेट करें (लिटरल मान नहीं, प्रारूप सत्यापित करें — पैटर्न के लिए मौजूदा परीक्षण देखें)।

7. परीक्षण फ़ाइलों में `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` लिटरल **कभी न** जोड़ें। `.join("")` खंडों से निर्मित `FAKE_*` कॉन्स्टेंट्स का उपयोग करें (मौजूदा परीक्षण देखें)।

### 2. उपभोक्ता

- **केवल `resolvePublicCred()` / `resolvePublicCredMulti()` से पढ़ें** — हेल्पर के बाहर कभी भी सीधे `decodePublicCredBytes()` कॉल न करें।
- हेल्पर जानबूझकर कम लागत वाला (रैखिक बाइट XOR) है और मॉड्यूल लोड होने के समय कॉल करने के लिए सुरक्षित है; डिफ़ॉल्ट केवल एक बार परिकलित किए जाते हैं।
- env ओवरराइड हमेशा प्रभावी होता है। यदि कोई उपयोगकर्ता `PROVIDER_OAUTH_CLIENT_SECRET=GOCSPX-myown` सेट करता है, तो हेल्पर उस रॉ मान को बिना बदले आगे भेज देता है।

### 3. निषिद्ध पैटर्न

❌ प्रोडक्शन कोड (`src/`, `open-sse/`, `electron/`, `bin/`) में निम्नलिखित में से कुछ भी **कभी न** करें:

```ts
// गलत: लिटरल मान Secret Scanning + Semgrep को ट्रिगर करता है
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET || "GOCSPX-realvalue",

// गलत: लिटरल का base64 — GitHub फ़रवरी/2025 से अब भी इसका पता लगाता है
clientSecret: process.env.PROVIDER_OAUTH_CLIENT_SECRET ||
  Buffer.from("R09DU1BYLXJlYWx2YWx1ZQ==", "base64").toString(),

// गलत: स्ट्रिंग संयोजन, जो रनटाइम पर पैटर्न को फिर से जोड़ता है
clientSecret: "GO" + "CS" + "PX-" + "realvalue",

// गलत: hex/ROT13 एन्कोडिंग — अलग ऑब्फ़स्केशन, पता लगने का वही जोखिम
clientSecret: hexDecode("474f4353..."),
```

ये सभी अंततः किसी स्कैनर को ट्रिगर करते हैं। `resolvePublicCred()` का उपयोग करें।

❌ `.env.example` में लिटरल क्रेडेंशियल **कभी न** जोड़ें। जिन उपयोगकर्ताओं को वास्तविक अपस्ट्रीम मानों की आवश्यकता है, वे उन्हें सार्वजनिक CLI से स्वयं निकाल सकते हैं या अपना OAuth पंजीकरण उपयोग कर सकते हैं।

❌ किसी नए सीक्रेट-स्कैनिंग अलर्ट को तब तक **कभी खारिज न करें**, जब तक पहले यह जाँच न कर ली जाए कि क्रेडेंशियल को इस हेल्पर में स्थानांतरित किया जाना चाहिए या नहीं।

## संबंधित नियंत्रण

- `publicCreds.ts` में `RAW_VALUE_PATTERN` उन प्रीफ़िक्स को सूचीबद्ध करता है जो पासथ्रू (पश्च-संगतता) को ट्रिगर करते हैं। इसे केवल दस्तावेज़ीकृत सार्वजनिक क्रेडेंशियल प्रारूपों के लिए विस्तारित करें, मालिकाना सीक्रेट्स के लिए कभी नहीं।
- `.env.example` CI की `check-env-doc-sync` स्क्रिप्ट में शामिल है — जब आप यहाँ से कोई वेरिएबल हटाएँ, तो सुनिश्चित करें कि दस्तावेज़ उससे मेल खाते हों।
- `npm run test:vitest` और `node --import tsx/esm --test tests/unit/publicCreds.test.ts` दोनों टेस्ट सुइट सफल रहने चाहिए।

## इस हेल्पर का उपयोग कब **नहीं** करना है

यह हेल्पर **केवल** उन क्रेडेंशियल्स के लिए है जो:

1. अपस्ट्रीम प्रदाता द्वारा सार्वजनिक रूप से वितरित किए जाते हैं (CLI बाइनरी, ब्राउज़र बंडल, आधिकारिक दस्तावेज़)।
2. गैर-गोपनीय होने के रूप में दस्तावेज़ीकृत हैं या जिनका गैर-गोपनीय होना दृढ़ता से निहित है (PKCE-संरक्षित, Firebase Web कुंजी या समान)।

अन्य सभी चीज़ों के लिए — ऑपरेटर द्वारा जारी टोकन, प्रति-टेनेंट सीक्रेट्स, आपके अपने OAuth ऐप का client_secret, एन्क्रिप्शन कुंजियाँ, JWT सीक्रेट्स, डेटाबेस पासवर्ड — **केवल env vars** का उपयोग करें (`process.env.FOO`, खाली मान / स्पष्ट त्रुटि के लिए `||` फ़ॉलबैक)। इन्हें सोर्स में नहीं, बल्कि `.env` और [एन्क्रिप्टेड क्रेडेंशियल्स स्टोर](./COMPLIANCE.md) में रखा जाना चाहिए।

## संदर्भ

- [Google: नेटिव ऐप्स के लिए OAuth 2.0](https://developers.google.com/identity/protocols/oauth2/native-app)
- [Firebase: क्लाइंट पहचान के लिए API कुंजियाँ](https://firebase.google.com/docs/projects/api-keys)
- [GitHub सीक्रेट स्कैनिंग द्वारा समर्थित सीक्रेट्स](https://docs.github.com/en/code-security/secret-scanning/introduction/supported-secret-scanning-patterns)
- [GitHub: टोकन के लिए base64 पहचान (फ़रवरी 2025)](https://github.blog/changelog/2025-02-14-secret-scanning-detects-base64-encoded-github-tokens/)
- इस हेल्पर को प्रस्तुत करने वाला कमिट: `1a39c31f` — _fix(security): सार्वजनिक अपस्ट्रीम क्रेडेंशियल्स को मास्क करें + त्रुटि सैनिटाइज़ेशन को केंद्रीकृत करें_
