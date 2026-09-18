# Security Policy (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../SECURITY.md) · 🇪🇹 [am](../am/SECURITY.md) · 🇸🇦 [ar](../ar/SECURITY.md) · 🇦🇿 [az](../az/SECURITY.md) · 🇧🇬 [bg](../bg/SECURITY.md) · 🇧🇩 [bn](../bn/SECURITY.md) · 🇨🇿 [cs](../cs/SECURITY.md) · 🇩🇰 [da](../da/SECURITY.md) · 🇩🇪 [de](../de/SECURITY.md) · 🇬🇷 [el](../el/SECURITY.md) · 🇪🇸 [es](../es/SECURITY.md) · 🇪🇪 [et](../et/SECURITY.md) · 🇮🇷 [fa](../fa/SECURITY.md) · 🇫🇮 [fi](../fi/SECURITY.md) · 🇫🇷 [fr](../fr/SECURITY.md) · 🇮🇪 [ga](../ga/SECURITY.md) · 🇮🇳 [gu](../gu/SECURITY.md) · 🇳🇬 [ha](../ha/SECURITY.md) · 🇮🇱 [he](../he/SECURITY.md) · 🇭🇷 [hr](../hr/SECURITY.md) · 🇭🇺 [hu](../hu/SECURITY.md) · 🇦🇲 [hy](../hy/SECURITY.md) · 🇮🇩 [id](../id/SECURITY.md) · 🇳🇬 [ig](../ig/SECURITY.md) · 🇮🇹 [it](../it/SECURITY.md) · 🇯🇵 [ja](../ja/SECURITY.md) · 🇬🇪 [ka](../ka/SECURITY.md) · 🇰🇭 [km](../km/SECURITY.md) · 🇮🇳 [kn](../kn/SECURITY.md) · 🇰🇷 [ko](../ko/SECURITY.md) · 🇱🇹 [lt](../lt/SECURITY.md) · 🇱🇻 [lv](../lv/SECURITY.md) · 🇮🇳 [ml](../ml/SECURITY.md) · 🇮🇳 [mr](../mr/SECURITY.md) · 🇲🇾 [ms](../ms/SECURITY.md) · 🇲🇹 [mt](../mt/SECURITY.md) · 🇲🇲 [my](../my/SECURITY.md) · 🇳🇵 [ne](../ne/SECURITY.md) · 🇳🇱 [nl](../nl/SECURITY.md) · 🇳🇴 [no](../no/SECURITY.md) · 🇮🇳 [or](../or/SECURITY.md) · 🇮🇳 [pa](../pa/SECURITY.md) · 🇵🇭 [phi](../phi/SECURITY.md) · 🇵🇱 [pl](../pl/SECURITY.md) · 🇵🇹 [pt](../pt/SECURITY.md) · 🇧🇷 [pt-BR](../pt-BR/SECURITY.md) · 🇷🇴 [ro](../ro/SECURITY.md) · 🇷🇺 [ru](../ru/SECURITY.md) · 🇱🇰 [si](../si/SECURITY.md) · 🇸🇰 [sk](../sk/SECURITY.md) · 🇸🇮 [sl](../sl/SECURITY.md) · 🇷🇸 [sr](../sr/SECURITY.md) · 🇸🇪 [sv](../sv/SECURITY.md) · 🇰🇪 [sw](../sw/SECURITY.md) · 🇮🇳 [ta](../ta/SECURITY.md) · 🇮🇳 [te](../te/SECURITY.md) · 🇹🇭 [th](../th/SECURITY.md) · 🇹🇷 [tr](../tr/SECURITY.md) · 🇺🇦 [uk-UA](../uk-UA/SECURITY.md) · 🇵🇰 [ur](../ur/SECURITY.md) · 🇺🇿 [uz](../uz/SECURITY.md) · 🇻🇳 [vi](../vi/SECURITY.md) · 🇳🇬 [yo](../yo/SECURITY.md) · 🇨🇳 [zh-CN](../zh-CN/SECURITY.md) · 🇹🇼 [zh-TW](../zh-TW/SECURITY.md)

---

## कमजोरियों की रिपोर्टिंग

यदि आपको OmniRoute में कोई सुरक्षा कमजोरी मिलती है, तो कृपया उसकी ज़िम्मेदारीपूर्वक रिपोर्ट करें:

1. सार्वजनिक GitHub issue **न खोलें**
2. [GitHub Security Advisories](https://github.com/diegosouzapw/OmniRoute/security/advisories/new) का उपयोग करें
3. शामिल करें: विवरण, पुनरुत्पादन के चरण और संभावित प्रभाव

## प्रतिक्रिया समयसीमा

| चरण             | लक्ष्य                          |
| --------------- | ------------------------------- |
| अभिस्वीकृति     | 48 घंटे                         |
| ट्राइएज और आकलन | 5 कार्यदिवस                     |
| पैच रिलीज़      | 14 कार्यदिवस (गंभीर मामलों में) |

## समर्थित संस्करण

| संस्करण | समर्थन स्थिति |
| ------- | ------------- |
| 3.8.x   | ✅ सक्रिय     |
| 3.7.x   | ✅ सुरक्षा    |
| < 3.7.0 | ❌ असमर्थित   |

---

## सुरक्षा आर्किटेक्चर

OmniRoute एक बहु-स्तरीय सुरक्षा मॉडल लागू करता है:

```
अनुरोध → CORS → Authz पाइपलाइन (वर्गीकृत करें → नीतियाँ → लागू करें)
        → सुरक्षा नियंत्रण (PII मास्कर, प्रॉम्प्ट इंजेक्शन, विज़न ब्रिज)
        → दर सीमक → सर्किट ब्रेकर → कूलडाउन → मॉडल लॉकआउट → प्रदाता
```

### 🔐 प्रमाणीकरण और प्राधिकरण

| सुविधा                   | कार्यान्वयन                                                                                                                                                                |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **डैशबोर्ड लॉगिन**       | JWT टोकन (HttpOnly कुकीज़) के साथ पासवर्ड-आधारित प्रमाणीकरण                                                                                                                |
| **API कुंजी प्रमाणीकरण** | CRC सत्यापन के साथ HMAC-हस्ताक्षरित कुंजियाँ                                                                                                                               |
| **OAuth 2.0 + PKCE**     | प्रदाता-विशिष्ट ब्राउज़र/डिवाइस OAuth में, जहाँ समर्थित हो, PKCE का उपयोग किया जाता है; केवल-आयात Devin क्रेडेंशियल अलग से प्रबंधित किए जाते हैं।                          |
| **टोकन रीफ़्रेश**        | समाप्ति से पहले OAuth टोकन का स्वचालित रीफ़्रेश                                                                                                                            |
| **सुरक्षित कुकीज़**      | HTTPS परिवेशों के लिए `AUTH_COOKIE_SECURE=true`                                                                                                                            |
| **Authz पाइपलाइन**       | रूट वर्गीकरण (PUBLIC / CLIENT_API / MANAGEMENT) — `docs/architecture/AUTHZ_GUIDE.md` देखें                                                                                 |
| **रूट गार्ड स्तर**       | प्रबंधन रूटों के लिए 3-स्तरीय मॉडल (LOCAL_ONLY / ALWAYS_PROTECTED / MANAGEMENT) — `docs/security/ROUTE_GUARD_TIERS.md` देखें                                               |
| **Manage-Scope MCP**     | दूरस्थ `/api/mcp/*` पहुँच `manage` स्कोप वाली API कुंजियों द्वारा नियंत्रित होती है; `/api/cli-tools/runtime/*` सख़्ती से लूपबैक तक सीमित रहता है। ROUTE_GUARD_TIERS देखें |
| **MCP स्कोप**            | 32 सूक्ष्म स्कोप (read:health, write:combos, execute:completions आदि) — `docs/frameworks/MCP-SERVER.md` देखें                                                              |

### 🛡️ संग्रहीत डेटा का एन्क्रिप्शन

SQLite में संग्रहीत सभी संवेदनशील डेटा को scrypt कुंजी व्युत्पत्ति के साथ **AES-256-GCM** का उपयोग करके एन्क्रिप्ट किया जाता है:

- API कुंजियाँ, एक्सेस टोकन, रीफ़्रेश टोकन और ID टोकन
- संस्करणयुक्त प्रारूप: `enc:v1:<iv>:<ciphertext>:<authTag>`
- जब `STORAGE_ENCRYPTION_KEY` सेट नहीं हो, तब पासथ्रू मोड (प्लेनटेक्स्ट)

```bash
# एन्क्रिप्शन कुंजी जनरेट करें:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

### 🛡️ सुरक्षा नियंत्रण फ़्रेमवर्क

OmniRoute प्राथमिकता के अनुसार क्रमबद्ध 3 अंतर्निहित सुरक्षा नियंत्रणों वाली एक हॉट-रीलोड योग्य **सुरक्षा नियंत्रण रजिस्ट्री** (`src/lib/guardrails/`) प्रदान करता है:

| सुरक्षा नियंत्रण   | प्राथमिकता | उद्देश्य                                                                          |
| ------------------ | ---------- | --------------------------------------------------------------------------------- |
| `vision-bridge`    | 5          | गैर-विज़न मॉडलों को छवि-जागरूक विवरणों से जोड़ता है; छवि URLs के लिए SSRF सुरक्षा |
| `pii-masker`       | 10         | कॉल-पूर्व+कॉल-पश्चात PII संपादन (ईमेल, फ़ोन, CPF, CNPJ, क्रेडिट कार्ड, SSN)       |
| `prompt-injection` | 20         | ओवरराइड/भूमिका-हाइजैक/जेलब्रेक/लीक पैटर्न का पता लगाता है                         |

कस्टम सुरक्षा नियंत्रण `registerGuardrail(new MyGuardrail())` के माध्यम से पंजीकृत होते हैं। मॉडल फेल-ओपन है (अपवाद कभी भी ट्रैफ़िक को अवरुद्ध नहीं करते)। `x-omniroute-disabled-guardrails` हेडर के माध्यम से प्रत्येक अनुरोध के लिए ऑप्ट-आउट किया जा सकता है। → [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) देखें।

### 🧠 प्रॉम्प्ट इंजेक्शन गार्ड

LLM अनुरोधों में प्रॉम्प्ट इंजेक्शन पैटर्न का पता लगाने वाला सर्वोत्तम-प्रयास अनुमानी मिडलवेयर।
**यह पूर्ण प्रॉम्प्ट-इंजेक्शन फ़ायरवॉल नहीं है** — यह फ़ॉल्स पॉज़िटिव (हानिरहित
पर्सोना/RPG प्रॉम्प्ट) और फ़ॉल्स नेगेटिव (लीटस्पीक, रिक्त स्थान, गैर-अंग्रेज़ी पैटर्न) उत्पन्न कर सकता है।

| पैटर्न प्रकार     | गंभीरता | उदाहरण                                           |
| ----------------- | ------- | ------------------------------------------------ |
| सिस्टम ओवरराइड    | उच्च    | "पिछले सभी निर्देशों को अनदेखा करें"             |
| भूमिका हाइजैक     | मध्यम   | "अब आप DAN हैं, आप कुछ भी कर सकते हैं"           |
| डिलिमिटर इंजेक्शन | उच्च    | संदर्भ सीमाएँ तोड़ने के लिए एन्कोड किए गए विभाजक |
| DAN/जेलब्रेक      | मध्यम   | ज्ञात जेलब्रेक प्रॉम्प्ट पैटर्न                  |
| निर्देश लीक       | उच्च    | "मुझे अपना सिस्टम प्रॉम्प्ट दिखाएँ"              |
| एन्कोडिंग अपवंचन  | मध्यम   | base64/rot13/hex डिकोड + निर्देश कीवर्ड          |

`block` मोड में केवल **उच्च** गंभीरता वाले पहचाने गए मामलों को अवरुद्ध किया जाता है। मध्यम-गंभीरता
वाले समूह लॉग किए जाते हैं, लेकिन `sanitizeRequest` द्वारा कभी अवरुद्ध नहीं किए जाते।

डैशबोर्ड (सेटिंग्स → सुरक्षा) या `.env` के माध्यम से कॉन्फ़िगर करें:

```env
INPUT_SANITIZER_ENABLED=true
INPUT_SANITIZER_MODE=block    # warn | block (इंजेक्शन नीति; लीगेसी "redact" इंजेक्शन टेक्स्ट को नहीं हटाता)
INPUT_SANITIZER_BLOCK_THRESHOLD=high  # high (डिफ़ॉल्ट) | medium | low — इस गंभीरता या इससे ऊपर के स्तर block मोड में अवरुद्ध किए जाते हैं
```

### 🔒 PII संपादन

व्यक्तिगत रूप से पहचान योग्य जानकारी का स्वचालित पता लगाना और वैकल्पिक संपादन:

| PII प्रकार      | पैटर्न                | प्रतिस्थापन        |
| --------------- | --------------------- | ------------------ |
| ईमेल            | `user@domain.com`     | `[EMAIL_REDACTED]` |
| CPF (ब्राज़ील)  | `123.456.789-00`      | `[CPF_REDACTED]`   |
| CNPJ (ब्राज़ील) | `12.345.678/0001-00`  | `[CNPJ_REDACTED]`  |
| क्रेडिट कार्ड   | `4111-1111-1111-1111` | `[CC_REDACTED]`    |
| फ़ोन            | `+55 11 99999-9999`   | `[PHONE_REDACTED]` |
| SSN (अमेरिका)   | `123-45-6789`         | `[SSN_REDACTED]`   |

```env
PII_REDACTION_ENABLED=true   # PII पुनर्लेखन का अनुरोध करें; INPUT_SANITIZER_MODE से स्वतंत्र
PII_RESPONSE_SANITIZATION=true  # वैकल्पिक: क्लाइंट को लौटाई गईं प्रदाता प्रतिक्रियाओं में PII को संपादित करें
```

### 🌐 नेटवर्क सुरक्षा

| सुविधा                | विवरण                                                                          |
| --------------------- | ------------------------------------------------------------------------------ |
| **CORS**              | स्पष्ट क्रॉस-ओरिजिन अनुमति-सूची (`CORS_ALLOWED_ORIGINS`; पुराना `CORS_ORIGIN`) |
| **IP फ़िल्टरिंग**     | डैशबोर्ड में अनुमति-सूची/अवरोध-सूची IP रेंज                                    |
| **दर सीमित करना**     | स्वचालित बैकऑफ़ के साथ प्रति-प्रदाता दर सीमाएँ                                 |
| **एंटी-थंडरिंग हर्ड** | म्यूटेक्स + प्रति-कनेक्शन लॉकिंग क्रमिक 502 त्रुटियों को रोकती है              |
| **TLS फ़िंगरप्रिंट**  | बॉट पहचान को कम करने के लिए ब्राउज़र-जैसी TLS फ़िंगरप्रिंट स्पूफ़िंग           |
| **CLI फ़िंगरप्रिंट**  | मूल CLI हस्ताक्षरों से मेल खाने के लिए प्रति-प्रदाता हेडर/बॉडी क्रम            |

### 🔌 लचीलापन और उपलब्धता

| सुविधा                   | विवरण                                                              |
| ------------------------ | ------------------------------------------------------------------ |
| **सर्किट ब्रेकर**        | प्रति प्रदाता 3-अवस्था (बंद → खुला → अर्ध-खुला), SQLite में स्थायी |
| **अनुरोध आइडेमपोटेंसी**  | डुप्लिकेट अनुरोधों के लिए 5-सेकंड की डीडुप्लिकेशन विंडो            |
| **एक्सपोनेंशियल बैकऑफ़** | बढ़ते विलंब के साथ स्वचालित पुनः प्रयास                            |
| **स्वास्थ्य डैशबोर्ड**   | रीयल-टाइम प्रदाता स्वास्थ्य निगरानी                                |

### 📋 अनुपालन

| सुविधा              | विवरण                                                                   |
| ------------------- | ----------------------------------------------------------------------- |
| **लॉग प्रतिधारण**   | `CALL_LOG_RETENTION_DAYS` के बाद स्वचालित सफ़ाई                         |
| **नो-लॉग ऑप्ट-आउट** | प्रति API कुंजी `noLog` फ़्लैग अनुरोध लॉगिंग अक्षम करता है              |
| **ऑडिट लॉग**        | प्रशासनिक कार्रवाइयाँ `audit_log` तालिका में ट्रैक की जाती हैं          |
| **MCP ऑडिट**        | सभी MCP टूल कॉल के लिए SQLite-समर्थित ऑडिट लॉगिंग                       |
| **Zod सत्यापन**     | मॉड्यूल लोड पर सभी API इनपुट Zod v4 स्कीमा के साथ सत्यापित किए जाते हैं |

---

## आवश्यक पर्यावरण चर

सर्वर शुरू करने से पहले सभी गोपनीय मान सेट किए जाने चाहिए। यदि वे अनुपस्थित या कमज़ोर हैं, तो सर्वर **तुरंत विफल** हो जाएगा।

```bash
# आवश्यक — इनके बिना सर्वर शुरू नहीं होगा:
JWT_SECRET=$(openssl rand -base64 48)     # न्यूनतम 32 वर्ण
API_KEY_SECRET=$(openssl rand -hex 32)    # न्यूनतम 16 वर्ण

# अनुशंसित — संग्रहित डेटा के एन्क्रिप्शन को सक्षम करता है:
STORAGE_ENCRYPTION_KEY=$(openssl rand -hex 32)
```

सर्वर `changeme`, `secret`, या `password` जैसे ज्ञात कमज़ोर मानों को सक्रिय रूप से अस्वीकार करता है।

---

## Docker सुरक्षा

- प्रोडक्शन में गैर-root उपयोगकर्ता का उपयोग करें
- गोपनीय मानों को केवल-पढ़ने योग्य वॉल्यूम के रूप में माउंट करें
- `.env` फ़ाइलों को कभी भी Docker इमेज में कॉपी न करें
- संवेदनशील फ़ाइलों को बाहर रखने के लिए `.dockerignore` का उपयोग करें
- HTTPS के पीछे होने पर `AUTH_COOKIE_SECURE=true` सेट करें

```bash
docker run -d \
  --name omniroute \
  --restart unless-stopped \
  --read-only \
  -p 20128:20128 \
  -v omniroute-data:/app/data \
  -e JWT_SECRET="$(openssl rand -base64 48)" \
  -e API_KEY_SECRET="$(openssl rand -hex 32)" \
  -e STORAGE_ENCRYPTION_KEY="$(openssl rand -hex 32)" \
  diegosouzapw/omniroute:latest
```

---

## निर्भरताएँ

- `npm audit` नियमित रूप से चलाएँ (`npm run audit:deps` मुख्य + electron को कवर करता है)
- निर्भरताओं को अद्यतित रखें
- प्रोजेक्ट pre-commit जाँचों के लिए `husky` + `lint-staged` का उपयोग करता है (lint-staged + check-docs-sync + check:any-budget:t11)
- CI पाइपलाइन प्रत्येक push पर ESLint सुरक्षा नियम चलाती है (`no-eval`, `no-implied-eval`, `no-new-func` = त्रुटि)
- Zod के माध्यम से मॉड्यूल लोड होने पर प्रदाता स्थिरांकों का सत्यापन किया जाता है (`src/shared/validation/schemas.ts`)
- सुरक्षित-डिफ़ॉल्ट लाइब्रेरी का उपयोग किया जाता है: `dompurify` / `isomorphic-dompurify` (XSS), `jose` (JWT), `better-sqlite3` (पैरामीटरयुक्त क्वेरी के कारण SQLi का कोई जोखिम नहीं), `bcryptjs` (पासवर्ड हैशिंग)

## कठोर सुरक्षा नियम

इन नियमों को टूलिंग और समीक्षकों द्वारा लागू किया जाता है:

1. **गोपनीय मान कभी commit न करें** — `.env` को gitignore किया गया है; `.env.example` टेम्पलेट है (कोई शाब्दिक मान नहीं, केवल टिप्पणियाँ — नीचे PUBLIC_CREDS.md देखें)
2. **कभी भी `eval()`, `new Function()`, या अंतर्निहित eval का उपयोग न करें** — ESLint इसे लागू करता है
3. **स्पष्ट ऑपरेटर स्वीकृति के बिना Husky hooks को कभी बायपास न करें** (`--no-verify`, `--no-gpg-sign`)
4. **routes में कभी भी raw SQL न लिखें** — हमेशा `src/lib/db/` के माध्यम से जाएँ (पैरामीटरयुक्त)
5. **इनपुट को हमेशा Zod के साथ सत्यापित करें** — `src/shared/validation/schemas.ts`
6. **upstream headers को हमेशा सैनिटाइज़ करें** — denylist `src/shared/constants/upstreamHeaders.ts` में है
7. **संग्रहित क्रेडेंशियल एन्क्रिप्ट करें** — `src/lib/db/encryption.ts` के माध्यम से AES-256-GCM
8. **सार्वजनिक upstream OAuth पहचानकर्ता `resolvePublicCred()` के माध्यम से उपयोग करें** — स्रोत में `AIza…` / `GOCSPX-…` / `…apps.googleusercontent.com` शाब्दिक मान कभी एम्बेड न करें। [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) देखें।
9. **त्रुटि प्रतिक्रियाएँ `buildErrorBody()` / `sanitizeErrorMessage()` के माध्यम से भेजें** — raw `err.stack` / `err.message` को कभी HTTP / SSE / executor / MCP प्रतिक्रिया बॉडी में न रखें। [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) देखें।
10. **`exec()` / `spawn()` के रनटाइम मान `env` विकल्प के माध्यम से दें** — बाहरी पथों या अविश्वसनीय मानों को shell को भेजी जाने वाली स्क्रिप्ट में string-interpolate कभी न करें। संदर्भ: `src/mitm/cert/install.ts::updateNssDatabases`।
11. **सुरक्षित-डिफ़ॉल्ट लाइब्रेरी को प्राथमिकता दें** — [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) देखें (Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink)। स्वयं का समाधान बनाने से पहले इनका उपयोग करें।

## सप्लाई-चेन स्कैनर निष्कर्ष (Socket.dev / Snyk / समान)

प्रकाशित `omniroute` npm आर्टिफ़ैक्ट Next.js के `output: "standalone"`
बिल्ड को बंडल करता है, जिसका अर्थ है कि प्रत्येक रूट हैंडलर — जिसमें दस्तावेज़ीकृत विशेषाधिकार-प्राप्त
सुविधाएँ (MITM, Zed इंपोर्ट, Cloud Sync, एम्बेडेड सर्विस सुपरवाइज़र) शामिल हैं — अंततः
`.next/server/*.js` की मिनिफ़ाइड चंक्स में पहुँच जाता है। ह्यूरिस्टिक सप्लाई-चेन स्कैनर
अक्सर उन चंक्स के पैटर्न का मिलान मैलवेयर सिग्नेचर से करते हैं।

हमारे द्वारा उपयोग किया जाने वाला स्कैनर कॉन्फ़िगरेशन रेपो रूट में [`socket.yml`](socket.yml) पर
स्थित है (Socket.dev GitHub App फ़ॉर्मैट v2 — देखें
<https://docs.socket.dev/docs/socket-yml>)। यह स्पष्ट रूप से
न भेजी जाने वाली डायरेक्टरियों (`tests/`, `_tasks/`, `_references/`, `_ideia/`,
`_mono_repo/`, `docs/`, आदि) को बाहर रखता है, ताकि स्कैनर केवल उन कोड पाथ पर रिपोर्ट करे जो
वास्तव में प्रकाशित पैकेज के उपयोगकर्ताओं तक पहुँचते हैं — स्कैन स्वयं इस फ़ाइल को पढ़ने वाले Socket
GitHub App द्वारा संचालित होता है, न कि इस रिपॉज़िटरी के किसी वर्कफ़्लो द्वारा।

प्रत्येक निष्कर्ष श्रेणी के लिए हम हर निष्कर्ष का अनुरक्षक सत्यापन बनाए रखते हैं:

- **[`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)** —
  प्रति-निष्कर्ष मैप: स्रोत फ़ाइल ↔ फ़्लैग की गई चंक ↔ व्यवहार ↔ v3.8.6 में लागू
  शमन।
- प्रत्येक फ़्लैग किए गए फ़ंक्शन पर इन-सोर्स `SECURITY-AUDITOR-NOTE:` ब्लॉक
  उसी दस्तावेज़ की ओर इंगित करते हैं।

जिन उपयोगकर्ताओं की पाइपलाइन अलर्ट को शिथिल नहीं कर सकती, वे इस कमांड से बिल्ड करें:
`OMNIROUTE_BUILD_PROFILE=minimal npm run build`। यह चार संवेदनशील मॉड्यूल को ऐसे
स्टब से बदल देता है जो रनटाइम पर HTTP 503 `feature-disabled` लौटाते हैं,
जिससे विशेषाधिकार-प्राप्त कोड पाथ बंडल में भौतिक रूप से अनुपस्थित रहते हैं।
प्रकाशन विधि के लिए [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md)
देखें।

## संदर्भ

- [`docs/architecture/AUTHZ_GUIDE.md`](docs/architecture/AUTHZ_GUIDE.md) — प्राधिकरण पाइपलाइन
- [`docs/security/GUARDRAILS.md`](docs/security/GUARDRAILS.md) — गार्डरेल्स फ़्रेमवर्क
- [`docs/security/COMPLIANCE.md`](docs/security/COMPLIANCE.md) — ऑडिट लॉग और अवधारण
- [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md) — सार्वजनिक अपस्ट्रीम क्रेडेंशियल के लिए **अनिवार्य** पैटर्न
- [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md) — त्रुटि प्रतिक्रियाओं के लिए **अनिवार्य** पैटर्न
- [`docs/security/SOCKET_DEV_FINDINGS.md`](docs/security/SOCKET_DEV_FINDINGS.md) — सप्लाई-चेन स्कैनर निष्कर्षों के लिए अनुरक्षक सत्यापन
- [`docs/architecture/RESILIENCE_GUIDE.md`](docs/architecture/RESILIENCE_GUIDE.md) — सर्किट ब्रेकर + कूलडाउन + लॉकआउट
- [`docs/security/STEALTH_GUIDE.md`](docs/security/STEALTH_GUIDE.md) — TLS फ़िंगरप्रिंटिंग (कानूनी/नैतिक सूचना)
- [`CLAUDE.md`](CLAUDE.md) — AI एजेंटों के लिए कठोर नियम
- [tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults) — चयनित सुरक्षित-बाय-डिफ़ॉल्ट लाइब्रेरियाँ
