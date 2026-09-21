# Remote Mode (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

अपने लैपटॉप पर `omniroute` CLI चलाएँ, जबकि OmniRoute स्वयं कहीं और चल रहा हो
(किसी VPS, होम सर्वर या आपके Tailnet की किसी अन्य मशीन पर)। आप
`omniroute connect` से एक बार लॉग इन करते हैं, और उसके बाद **हर** CLI कमांड उस रिमोट
सर्वर को लक्षित करती है — वही कमांड, वही आउटपुट, बस निष्पादन रिमोट सर्वर पर होता है।

इंस्टॉल करने के लिए कोई दूसरा टूल नहीं है: रिमोट मोड नियमित `omniroute` CLI
और सीमित दायरे वाले **एक्सेस टोकन** का उपयोग करता है।

```bash
npm install -g omniroute                 # सामान्य CLI
omniroute connect 192.168.0.15           # लॉग इन करें (पासवर्ड → सीमित दायरे वाला टोकन)
omniroute models list                    # ← अब रिमोट सर्वर के मॉडल सूचीबद्ध करता है
omniroute configure codex                # ← रिमोट कैटलॉग से स्थानीय Codex प्रोफ़ाइल लिखता है
```

---

## यह कैसे काम करता है

```
आपका लैपटॉप                             रिमोट OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (पासवर्ड → टोकन)           │
│  संदर्भ: vps       │ ───────────────►  │ सीमित दायरे वाला एक्सेस टोकन बनाता है │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ प्रत्येक प्रबंधन रूट, टोकन के │
│ कॉन्फ़िगरेशन       │ ◄───────────────  │ दायरे के अनुसार जाँचा जाता है │
│ स्थानीय रूप से लिखता है │                   └───────────────────────────────┘
└────────────────────┘
```

- **संदर्भ** प्रत्येक सर्वर की जानकारी संग्रहीत करते हैं (`~/.omniroute/config.json`, `chmod 600`)।
  `omniroute contexts use <name>` सक्रिय सर्वर बदलता है; `default` स्थानीय होता है।
- **एक्सेस टोकन** (`oma_live_…`) प्रबंधन कमांड को अधिकृत करते हैं। ये
  इन्फ़रेंस API कुंजियों (`sk-…`, जिनका उपयोग `/v1/chat/completions` के लिए होता है) से अलग हैं।
- सर्वर की ओर टोकन का केवल SHA-256 हैश संग्रहीत किया जाता है। प्लेनटेक्स्ट
  निर्माण के समय **केवल एक बार** दिखाया जाता है।

---

## कनेक्ट करना

### प्रबंधन पासवर्ड के साथ (बूटस्ट्रैप)

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128 के लिए प्रबंधन पासवर्ड: ********
# ✔ http://192.168.0.15:20128 से कनेक्ट किया गया — संदर्भ '192.168.0.15' (दायरा: admin)
```

पासवर्ड फ़्लो डिफ़ॉल्ट रूप से एक **admin** टोकन बनाता है (पासवर्ड आपके पास है, इसलिए
आपके पास पहले से पूर्ण नियंत्रण है)। `--scope` से दायरा सीमित करें:

```bash
omniroute connect 192.168.0.15 --scope write
```

विकल्प: `--port <p>` (जब होस्ट में पोर्ट न हो), `--name <ctx>` (संदर्भ का नाम),
`--scope read|write|admin`। पूर्ण URL को ज्यों का त्यों स्वीकार किया जाता है:
`omniroute connect https://omni.example.com`।

### पहले से जनरेट किए गए टोकन के साथ

डैशबोर्ड में (या `omniroute tokens create` से) सीमित दायरे वाला टोकन जनरेट करें और
उसे पेस्ट करें — पासवर्ड की आवश्यकता नहीं:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI इसे `GET /api/cli/whoami` के माध्यम से सत्यापित करता है और सक्रिय संदर्भ के रूप में सहेजता है।

---

## दायरे

तीन स्तर, पदानुक्रमित (`admin ⊃ write ⊃ read`):

| दायरा   | क्या कर सकता है                                                                   |
| ------- | --------------------------------------------------------------------------------- |
| `read`  | सूची/निरीक्षण — `models list`, `providers status`, `logs`, `usage`, `cost`        |
| `write` | पढ़ना **+** कॉन्फ़िगर/लागू करना — `setup-codex`, `keys add`, `config set`, संयोजन |
| `admin` | लिखना **+** प्रबंधन — `tokens` CRUD, प्रदाता जोड़ना, सेवाएँ, नीति, oauth          |

सर्वर HTTP मेथड के आधार पर प्रत्येक रूट के लिए आवश्यक दायरा निर्धारित करता है
(`GET`→पढ़ना, परिवर्तन→लिखना), साथ ही संवेदनशील सतहों के लिए एक admin अनुमति-सूची का उपयोग करता है
(`/api/cli/tokens`, `/api/providers` परिवर्तन, `/api/oauth`, `/api/services`, …)।
अपर्याप्त दायरे वाले टोकन को स्पष्ट संदेश के साथ `403` मिलता है।

> प्रक्रियाएँ शुरू करने वाले रूट (`/api/services/*`, `/api/mcp/*`, …)
> **केवल लूपबैक** बने रहते हैं — दायरा चाहे जो भी हो, रिमोट टोकन कभी उन तक नहीं पहुँच सकता।

---

## रिमोट इंस्टॉल पर Antigravity को कनेक्ट करना

Antigravity, Google की firstparty/nativeapp सहमति स्क्रीन का उपयोग करता है। Google
प्राधिकरण कोड केवल तभी जारी करता है, जब **loopback redirect**
(`http://127.0.0.1:<port>/callback`) **साइन-इन को स्वीकृति देने वाले ब्राउज़र से
पहुंच योग्य हो**। रिमोट VPS इंस्टॉल पर वह loopback आपके कंप्यूटर पर नहीं, बल्कि
सर्वर पर होता है, इसलिए सहमति स्क्रीन **हमेशा के लिए अटक जाती है और कभी कोई
कोड जारी नहीं करती** — सामान्य "कॉलबैक URL पेस्ट करें" फ़ॉलबैक में पेस्ट करने के
लिए कुछ होता ही नहीं। (यह Google की ओर से लगाई गई बाधा है: यही रुकावट ऐसे किसी
भी प्रॉक्सी में होती है जो बंडल किए गए Antigravity डेस्कटॉप क्लाइंट का उपयोग करता
है, केवल OmniRoute में नहीं।)

डैशबोर्ड आपके अटकने से पहले इसका पता लगा लेता है: किसी गैर-localhost पते से
**Providers → Antigravity → Connect** खोलने पर सामान्य "कॉलबैक URL कॉपी करें"
सूचना के स्थान पर नीचे दिए गए दो उपाय दिखाई देते हैं, जिनमें आपका होस्ट और पोर्ट
पहले से भरे होते हैं। (LAN पता भी इसमें शामिल है — इस कॉलबैक के संदर्भ में
`192.168.x.x`, localhost नहीं है।)

Antigravity को रिमोट OmniRoute से कनेक्ट करने के दो समर्थित तरीके हैं।

### विकल्प A — स्थानीय लॉगिन सहायक (अनुशंसित)

OAuth को **अपने कंप्यूटर पर** चलाएं, जहां `127.0.0.1` पहुंच योग्य हो। सहायक
सीधे Google से संचार करता है, इसलिए सहमति प्रक्रिया वहां पूरी हो जाती है, जहां
डैशबोर्ड का संस्करण ऐसा नहीं कर सकता।

**यदि आप पहले से कनेक्ट हैं** (`omniroute connect <host>`), तो कुछ भी कॉपी करने
की आवश्यकता नहीं है — सहायक आपके लिए क्रेडेंशियल उस इंस्टॉल तक पहुंचा देता है:

```bash
# आपकी LOCAL मशीन पर (Node.js + ब्राउज़र आवश्यक है):
omniroute connect 192.168.0.15        # एक बार — admin-scoped context token बनाता है
npx omniroute login antigravity
#   ↳ Google सहमति खोलता है, स्थानीय loopback पोर्ट पर कॉलबैक कैप्चर करता है,
#     उसका आदान-प्रदान करता है और क्रेडेंशियल को सक्रिय context पर POST करता है:
#
#   Antigravity, http://192.168.0.15:20128 पर कनेक्ट हो गया (कनेक्शन abc123)।
#   कुछ भी पेस्ट करने की आवश्यकता नहीं है — आप इस टर्मिनल को बंद कर सकते हैं।
```

जब भी सक्रिय context किसी दूसरी मशीन की ओर इंगित करता है, push स्वचालित रूप से
होता है। `--push` / `--no-push` से इसे किसी भी दिशा में बाध्य करें, या
`--context <name>` से किसी विशिष्ट context को लक्षित करें।

**यदि आपकी मशीन VPS तक नहीं पहुंच सकती** (फ़ायरवॉल लगा हो, SSH न हो, या डेस्क
air-gapped हो), तब भी सहायक काम करता है — उसे केवल Google की ही _आवश्यकता_ होती
है। `--no-push` का उपयोग करें, या push को विफल होने दें: आपके द्वारा पहले ही पूरा
किए गए प्राधिकरण को हटाने के बजाय, यह फ़ॉलबैक के रूप में blob प्रिंट करता है।

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

फिर **रिमोट** डैशबोर्ड में: **Providers → Antigravity → Connect** पर जाएं और
`omniroute-cred-v1.…` blob को **Step 2** फ़ील्ड में पेस्ट करें (यह कॉलबैक URL या
क्रेडेंशियल blob, दोनों स्वीकार करता है)। OmniRoute इसे डिकोड करता है, सर्वर की
ओर से Cloud Code ऑनबोर्डिंग चलाता है और कनेक्शन को स्थायी रूप से सहेजता है।

> blob में refresh token होता है — इसे पासवर्ड की तरह सुरक्षित रखें। push पथ पर
> इसे आपके context के प्रमाणीकृत कनेक्शन के माध्यम से एक बार भेजा जाता है; पेस्ट
> पथ पर, आपके डैशबोर्ड कनेक्शन के माध्यम से। दोनों ही स्थितियों में इसे संग्रहित
> अवस्था में एन्क्रिप्ट किया जाता है और सफल push इसे कभी आपके टर्मिनल पर प्रिंट
> नहीं करता।

फ़्लैग: `--no-browser` (स्वचालित रूप से खोलने के बजाय URL प्रिंट करें),
`--port <n>` (loopback पोर्ट तय करें), `--timeout <ms>`, `--push` /
`--no-push` (स्वचालित डिलीवरी को ओवरराइड करें), `--context <name>` (किसी विशिष्ट
context को लक्षित करें)।

### विकल्प B — SSH local-forward टनल

यदि आपके पास VPS का SSH एक्सेस है, तो डैशबोर्ड पोर्ट को फ़ॉरवर्ड करें, ताकि
loopback कॉलबैक टनल के माध्यम से वापस सर्वर तक पहुंचे:

```bash
# आपकी LOCAL मशीन पर:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# फिर अपने LOCAL ब्राउज़र में http://localhost:20128 खोलें और Antigravity को
# सामान्य रूप से कनेक्ट करें — 127.0.0.1:20128/callback रीडायरेक्ट अब SSH के माध्यम से VPS तक पहुंचता है।
```

चूंकि आप डैशबोर्ड तक `localhost:20128` के रूप में पहुंचते हैं, इसलिए Google
सहमति पूरी हो जाती है और कॉलबैक उसी टनल के माध्यम से सर्वर तक पहुंच जाता है —
किसी blob की आवश्यकता नहीं होती। कनेक्शन के सक्रिय दिखाई देने तक टनल को खुला
रखें।

नीचे दिए गए fixed-loopback providers के विपरीत, यहां **एक forward पर्याप्त है**:
Antigravity कॉलबैक स्वयं डैशबोर्ड पोर्ट का उपयोग करता है, इसलिए टनल करने के लिए
किसी दूसरे provider-specific पोर्ट की आवश्यकता नहीं होती।

> पूरी तरह headless विकल्प (न सहायक, न टनल) के लिए अपने **स्वयं के** Google OAuth
> वेब क्रेडेंशियल + सार्वजनिक base URL कॉन्फ़िगर करें; provider के OAuth
> environment variables देखें। ऊपर दिए गए दोनों विकल्पों के लिए किसी अतिरिक्त
> Google सेटअप की आवश्यकता नहीं है।

---

## रिमोट इंस्टॉल पर Codex / Grok कनेक्ट करना (निश्चित-लूपबैक प्रदाता)

Codex, xAI (`xai-oauth`) और Grok CLI (`grok-cli`) अपने अपस्ट्रीम OAuth ऐप के साथ एक
**निश्चित** लूपबैक `redirect_uri` पंजीकृत करते हैं। OmniRoute इसे बदल नहीं सकता —
प्रदाता हमेशा ब्राउज़र को उसी हार्डकोड किए गए पते पर वापस भेजता है:

| प्रदाता     | वह निश्चित कॉलबैक जिस पर प्रदाता रीडायरेक्ट करता है |
| ----------- | --------------------------------------------------- |
| `codex`     | `http://localhost:1455/auth/callback`               |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                   |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                   |

यहाँ `localhost` का अर्थ है **वह मशीन जिस पर ब्राउज़र चल रहा है**, जबकि OmniRoute का
PKCE कॉलबैक सर्वर **सर्वर के** लूपबैक पर सुनता है। डैशबोर्ड को
`http://192.168.0.15:20128` जैसे LAN पते पर खोलने पर दोनों कभी नहीं मिलते:
प्राधिकरण कोड आपके अपने लैपटॉप के `localhost:1455` पर भेज दिया जाता है, जहाँ कुछ भी
नहीं सुन रहा होता, और प्रदाता कोई त्रुटि दिखाए बिना साइन-इन विफल कर देता है।

डैशबोर्ड पॉपअप खोलने से पहले इसका पता लगा लेता है और लॉगिन को चुपचाप विफल होने देने
के बजाय टनल कमांड दिखाता है (#8046)।

### समाधान — **दोनों** पोर्ट फ़ॉरवर्ड करें

```bash
# उस मशीन पर जिस पर ब्राउज़र चल रहा है:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# फिर http://localhost:20128 खोलें और वहाँ से Codex कनेक्ट करें
```

दो फ़ॉरवर्ड आवश्यक हैं, और केवल एक को फ़ॉरवर्ड करने पर भी प्रक्रिया विफल रहती है:

- **`20128`** (डैशबोर्ड पोर्ट) ओरिजिन को वास्तविक-localhost बनाता है, जिसके कारण
  OmniRoute PKCE कॉलबैक सर्वर को शुरू करता है — LAN ओरिजिन कभी उस शाखा तक
  नहीं पहुँचता।
- **`1455`** (प्रदाता का निश्चित कॉलबैक पोर्ट) वह पोर्ट है जहाँ ब्राउज़र को वापस
  भेजा जाता है; इसे टनल के माध्यम से सर्वर के लूपबैक तक पहुँचना होता है।

xAI या Grok CLI कनेक्ट करते समय `1455` को `56121`/`56122` से और `20128` को
अपने वास्तविक डैशबोर्ड पोर्ट से बदलें। कनेक्शन के सक्रिय दिखने तक टनल खुली रखें।

> **SSH एक्सेस नहीं है?** Codex और Grok CLI चिपकाया गया टोकन भी स्वीकार करते हैं —
> कनेक्ट डायलॉग का **Paste API Key** / **Import auth.json** टैब। इस तरीके में कोई
> लूपबैक कॉलबैक नहीं होता, इसलिए यह किसी भी ओरिजिन से काम करता है। Codex इसके
> अतिरिक्त केवल एक एक्सेस टोकन या `~/.codex/auth.json` सेशन ब्लॉब भी स्वीकार करता है।

---

## टोकन प्रबंधित करना

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ सीक्रेट केवल एक बार प्रिंट करता है — इसे अभी कॉपी करें
omniroute tokens list                 # मास्क किया हुआ: id, नाम, स्कोप, प्रीफ़िक्स, स्थिति, समाप्ति
omniroute tokens revoke <id|prefix>   # तुरंत निरस्त करें
omniroute tokens scopes               # तीनों स्कोप की व्याख्या करें
```

`tokens` कमांड के लिए **admin** क्रेडेंशियल आवश्यक है। आप डैशबोर्ड में
**Settings → Access Tokens** के अंतर्गत भी टोकन प्रबंधित कर सकते हैं (बनाना,
निरस्त करना, केवल एक बार कॉपी करना)।

---

## रिमोट कैटलॉग से कोडिंग CLI कॉन्फ़िगर करना

`omniroute configure` **सक्रिय सर्वर** का लाइव मॉडल कैटलॉग पढ़ता है और
**आपकी** मशीन पर एक कॉन्फ़िग लिखता है।

```bash
omniroute configure codex
#   प्रदाता: glm, kmc, ollamacloud, opencode-go, …
#   प्रदाता: glm
#   मॉडल id: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml लिखा गया
#   इसका उपयोग करें:  codex --profile glm52

# नॉन-इंटरैक्टिव
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# अक्सर उपयोग किए जाने वाले मॉडल को इंटरैक्टिव पिकर के शीर्ष पर रखें
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

पिकर स्थानीय `model-preferences.json` फ़ाइल में केवल मॉडल ID रखता है (URL या
क्रेडेंशियल कभी नहीं), जिन्हें कॉन्टेक्स्ट और CLI लक्ष्य के अनुसार सीमित किया जाता
है। पसंदीदा मॉडल हाल के चयनों से पहले दिखाए जाते हैं; चुने गए मॉडल को उस
कॉन्टेक्स्ट/लक्ष्य सूची से हटाने के लिए `--unfavorite` का उपयोग करें।

लिखी गई प्रोफ़ाइल एनवायरनमेंट वेरिएबल (`OMNIROUTE_API_KEY`) के माध्यम से
इन्फ़रेंस कुंजी को संदर्भित करती है — सीक्रेट कभी भी डिस्क पर नहीं लिखा जाता।
एक बार किए जाने वाले मूल Codex सेटअप (`[model_providers.omniroute]` ब्लॉक) के
लिए [CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) देखें।

### रिमोट के विरुद्ध CLI लॉन्च करना (कोई कॉन्फ़िग नहीं लिखा जाता)

`omniroute run <target>` भी सक्रिय कॉन्टेक्स्ट का पालन करता है: रिमोट बेस URL
और कॉन्टेक्स्ट क्रेडेंशियल केवल शुरू की गई प्रक्रिया में इंजेक्ट किए जाते हैं।

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → रिमोट
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# ठीक उसी प्रक्रिया का पूर्वावलोकन करें जो शुरू की जाएगी (केवल एनवायरनमेंट KEY के नाम, मान कभी नहीं):
omniroute run codex --dry-run --json
```

लक्ष्य: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(एकल स्रोत: `bin/cli/cli-manifest.mjs`)। Qwen और Gemini एक अस्थायी पृथक होम के
साथ चलते हैं, जिसे बाहर निकलने पर हटा दिया जाता है, इसलिए लॉन्च कभी भी आपके
व्यक्तिगत टूल कॉन्फ़िगरेशन को न तो छूता है — और न ही उसमें कुछ लीक करता है।

### प्रत्येक CLI के लिए सेटअप कमांड

प्रत्येक समर्थित CLI में एक रिमोट-जागरूक सेटअप कमांड होता है (सभी सक्रिय
कॉन्टेक्स्ट या `--remote <url> --api-key <key>` का पालन करते हैं):

| CLI         | कमांड                      | यह क्या लिखता है                                                                                                                                                                    |
| ----------- | -------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` प्रोफ़ाइलें (प्रति मॉडल)                                                                                                                              |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (प्रति मॉडल)                                                                                                                              |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — प्रत्येक कैटलॉग मॉडल के साथ OpenAI-संगत `omniroute` प्रोवाइडर (`opencode -m omniroute/<model>` चलाएँ)                                          |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI मोड) + पेस्ट करने के लिए VS Code एक्सटेंशन सेटिंग्स प्रिंट करता है (OpenAI-संगत, Base URL में `/v1` **नहीं**)                       |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` सेटिंग्स — OpenAI-संगत, Base URL में `/v1` **सहित**                                                                    |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` में `/v1` **सहित**, कुंजी `${{ secrets.OMNIROUTE_API_KEY }}` के माध्यम से                  |
| Cursor      | `omniroute setup-cursor`   | ऐप के भीतर के चरण प्रिंट करता है (Settings → Models → Override OpenAI Base URL में `/v1` **सहित** + कुंजी + मॉडल)। Cursor कॉन्फ़िगरेशन अपारदर्शी SQLite है — केवल चैट पैनल          |
| Roo Code    | `omniroute setup-roo`      | एक Roo इंपोर्ट JSON (`~/.omniroute/roo-settings.json`) लिखता है + `roo-cline.autoImportSettingsPath` सेट करता है + UI चरण प्रिंट करता है (OpenAI-संगत, Base URL में `/v1` **सहित**) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` प्रोवाइडर, `base_url` में `/v1` **सहित**, कुंजी `$OMNIROUTE_API_KEY` के माध्यम से                                                    |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` में `/v1` **नहीं** + `GOOSE_MODEL`) + एनवायरनमेंट विधि                                                       |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` में `/v1` **नहीं** + `model: openai/<id>`) + एनवायरनमेंट विधि (`aider --message --yes`)                                                      |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` में V4 `modelProviders.openai` प्रविष्टि + `~/.qwen/.env` में `OMNIROUTE_API_KEY`                                                                           |

```bash
# OpenCode (OpenAI-संगत प्रोवाइडर, सभी कैटलॉग मॉडल, रिमोट VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # केवल मेल खाने वाले मॉडल रखें
opencode -m omniroute/glm/glm-5.2 "..."          # पहले OMNIROUTE_API_KEY एक्सपोर्ट करें
```

> OpenCode में अधिक सुविधाओं वाला **प्लगइन** एकीकरण भी है: `omniroute setup opencode`
> (अब `--remote` के माध्यम से रिमोट-जागरूक) `@omniroute/opencode-plugin` इंस्टॉल करता है।
> `setup-opencode` हल्का OpenAI-संगत विकल्प है। API कुंजी को
> `{env:OMNIROUTE_API_KEY}` के माध्यम से संदर्भित किया जाता है — इसे कभी भी डिस्क पर नहीं लिखा जाता।
>
> OpenCode v2 पर, इसके बजाय `@omniroute/opencode-plugin-v2` का उपयोग करें: वही कैटलॉग,
> अलग लोडर अनुबंध। एकीकरण कनेक्ट होने पर यह OpenCode के अपने क्रेडेंशियल
> स्टोर से कुंजी पढ़ता है, इसलिए रिमोट गेटवे के लिए `opencode.json` में किसी कुंजी की
> बिल्कुल आवश्यकता नहीं होती।

---

## कॉन्टेक्स्ट प्रबंधित करना (सर्वरों के बीच स्विच करना)

एक **कॉन्टेक्स्ट** सहेजा गया सर्वर (baseUrl + क्रेडेंशियल + स्कोप) होता है। `omniroute connect`
एक कॉन्टेक्स्ट बनाता है और उसे सक्रिय करता है; इसके बाद प्रत्येक कमांड उसी को लक्षित करती है। `omniroute contexts`
की मदद से इन्हें प्रबंधित करें और इनके बीच स्विच करें:

```bash
omniroute contexts list            # सभी कॉन्टेक्स्ट; सक्रिय कॉन्टेक्स्ट को ● से चिह्नित किया जाता है
omniroute contexts current         # सक्रिय सर्वर, प्रमाणीकरण स्थिति, स्कोप
```

```text
  | नाम     | बेस URL                   | प्रमाणीकरण | स्कोप | विवरण
● | vps     | http://100.67.86.91:20128 | token      | admin | रिमोट OmniRoute (…)
  | default | http://localhost:20128    | ✗          |       |
```

**सर्वर स्विच करें** — इसके बाद की प्रत्येक कमांड सक्रिय कॉन्टेक्स्ट का उपयोग करती है:

```bash
omniroute contexts use vps         # → अब सभी कमांड रिमोट VPS को लक्षित करती हैं
omniroute tokens list              #   (VPS पर चलती है)

omniroute contexts use default     # → वापस localhost पर
omniroute tokens list              #   (स्थानीय सर्वर पर चलती है)
```

**मैन्युअल रूप से कॉन्टेक्स्ट जोड़ें** (`connect` के बजाय), उसका निरीक्षण करें या उसका नाम बदलें:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # किसी एक कॉन्टेक्स्ट का पूरा विवरण
omniroute contexts rename staging stg
```

**कॉन्टेक्स्ट हटाएँ** — पुष्टि के लिए संकेत देता है; इसे छोड़ने के लिए `--yes` दें
(स्क्रिप्ट/गैर-इंटरैक्टिव शेल के लिए आवश्यक, जो अन्यथा सुरक्षित रूप से अस्वीकार कर देते हैं):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) को हटाया नहीं जा सकता। सक्रिय कॉन्टेक्स्ट हटाने पर
> `default` पर वापस स्विच हो जाता है। सुझाव: किसी कॉन्टेक्स्ट को हटाने से केवल **स्थानीय** रूप से सहेजा गया क्रेडेंशियल हटता है —
> वास्तव में पहुँच समाप्त करने के लिए सर्वर पर `omniroute tokens revoke <id>` से टोकन निरस्त करें।

कॉन्टेक्स्ट **एक्सपोर्ट/इंपोर्ट** करें (जैसे उन्हें मशीनों के बीच स्थानांतरित करने के लिए)। नए कॉन्टेक्स्ट में
केवल कीचेन संदर्भ स्थायी रूप से सहेजा जाता है; OS कीचेन उपलब्ध होने पर क्रेडेंशियल
एक्सपोर्ट में कॉपी नहीं किए जाते:

```bash
omniroute contexts export --out contexts.json     # डिफ़ॉल्ट: stdout
omniroute contexts import contexts.json            # अधिलेखित करें; मौजूदा कॉन्टेक्स्ट बनाए रखने के लिए --merge
omniroute contexts migrate --yes                  # पुराने प्लेनटेक्स्ट टोकन को कीचेन में ले जाएँ
```

उपयोग योग्य OS कीचेन के बिना हेडलेस सिस्टम पर, CLI मोड `0600` वाली
`config.json` का उपयोग करता है और एक बार चेतावनी प्रदर्शित करता है। इस फ़ॉलबैक से प्राप्त एक्सपोर्ट
(और माइग्रेशन से पहले की किसी भी पुरानी कॉन्फ़िगरेशन) को गोपनीय सामग्री मानें।

---

## त्वरित एंड-टू-एंड जाँच

किसी रिमोट सेटअप को शुरुआत से सत्यापित करने के लिए कॉपी-पेस्ट योग्य जीवनचक्र — कनेक्ट करें, सीमित
स्कोप वाला टोकन बनाएँ, कमांड रूट करें, वापस स्विच करें और सेटअप हटाएँ।
`192.168.0.15` को अपने सर्वर के होस्ट/IP (Tailscale, LAN या किसी सार्वजनिक
`https://…` URL) से बदलें।

```bash
# 1. कनेक्ट करें (पासवर्ड → admin टोकन, ऐसे कॉन्टेक्स्ट के रूप में सहेजा जाता है जो सक्रिय हो जाता है)
omniroute connect 192.168.0.15                 # या: --key oma_live_xxxx  (पासवर्ड नहीं)
omniroute contexts current                     # रिमोट सर्वर + स्कोप दिखाता है

# 2. इसका उपयोग करें — अब प्रबंधन कमांड रिमोट सर्वर पर चलती हैं
omniroute tokens create --name laptop --scope read   # अधिक सीमित स्कोप वाला टोकन बनाएँ
omniroute tokens list                                 # रिमोट सर्वर से मास्क की गई सूची

# 3. आगे-पीछे स्विच करें
omniroute contexts use default                 # → स्थानीय
omniroute contexts use 192-168-0-15            # → फिर से रिमोट (`contexts list` से प्राप्त नाम)

# 4. सेटअप हटाएँ। ध्यान दें: `contexts remove` केवल स्थानीय क्रेडेंशियल हटाता है —
#    यह सर्वर पर टोकन निरस्त नहीं करता। यदि आप वास्तव में पहुँच समाप्त करना
#    चाहते हैं, तो पहले सर्वर की ओर से टोकन निरस्त करें।
omniroute tokens revoke <id|prefix>            # सर्वर पर पहुँच समाप्त करता है
omniroute contexts remove 192-168-0-15 --yes   # स्थानीय कॉन्टेक्स्ट हटाएँ (सक्रिय होने पर भी → default पर वापस जाता है), कोई संकेत नहीं
```

> `--yes`, `contexts remove` को गैर-इंटरैक्टिव बनाता है (स्क्रिप्ट/CI में आवश्यक; इसके बिना
> गैर-इंटरैक्टिव शेल अटकने के बजाय सुरक्षित रूप से अस्वीकार कर देता है)। **सक्रिय**
> कॉन्टेक्स्ट हटाने पर स्वचालित रूप से `default` पर वापस स्विच हो जाता है।

---

## सुरक्षा संबंधी टिप्पणियाँ

- टोकन का प्लेनटेक्स्ट केवल एक बार दिखाया जाता है; केवल SHA-256 हैश को स्थायी रूप से संग्रहीत किया जाता है (API कुंजियों की तरह)।
- `omniroute connect`, लॉगिन ब्रूट-फोर्स लॉकआउट और ऑडिट लॉगिंग का पुनः उपयोग करता है।
- ट्रांसपोर्ट के लिए HTTPS या Tailnet को प्राथमिकता दें; केवल होस्ट देने पर LAN/Tailscale की सुविधा के लिए डिफ़ॉल्ट रूप से `http://` का उपयोग होता है — TLS के लिए पूरा `https://…` URL दें।
- पसंदीदा स्थानीय कॉन्टेक्स्ट फ़ाइल `~/.omniroute/config.json` (`chmod 600`) है, जिसमें केवल एक `credentialRef` होता है; टोकन स्वयं OS कीचेन (`keytar`) में संग्रहीत होता है और लॉग में कभी प्रिंट नहीं किया जाता। कार्यशील नेटिव कीचेन के बिना हेडलेस इंस्टॉलेशन स्पष्ट फ़ॉलबैक के रूप में उसी `0600` फ़ाइल का उपयोग करते हैं और एक बार चेतावनी जारी करते हैं। कीचेन बैकएंड इंस्टॉल करने के बाद `omniroute contexts migrate --yes` का उपयोग करें।

---

## API एंडपॉइंट (संदर्भ)

| विधि   | रूट                   | प्रमाणीकरण      | स्कोप                           |
| ------ | --------------------- | --------------- | ------------------------------- |
| POST   | `/api/cli/connect`    | प्रबंधन पासवर्ड | — (सार्वजनिक, पासवर्ड-संरक्षित) |
| GET    | `/api/cli/whoami`     | एक्सेस टोकन     | पढ़ना                           |
| GET    | `/api/cli/tokens`     | एक्सेस टोकन     | एडमिन                           |
| POST   | `/api/cli/tokens`     | एक्सेस टोकन     | एडमिन                           |
| DELETE | `/api/cli/tokens/:id` | एक्सेस टोकन     | एडमिन                           |

पूर्ण स्कीमा के लिए [openapi.yaml](../openapi.yaml) देखें।
