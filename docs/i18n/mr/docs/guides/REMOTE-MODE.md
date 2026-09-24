# Remote Mode (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇵 [ne](../../../ne/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

OmniRoute स्वतः इतरत्र (VPS, होम सर्व्हर, तुमच्या Tailnet वरील दुसरे मशीन) चालू असताना तुमच्या लॅपटॉपवर `omniroute` CLI चालवा. तुम्ही एकदा
`omniroute connect` वापरून लॉग इन केल्यानंतर, त्यापुढील **प्रत्येक** CLI कमांड त्या रिमोट
सर्व्हरला लक्ष्य करते — त्याच कमांड्स, तेच आउटपुट, फक्त अंमलबजावणी रिमोटवर होते.

इंस्टॉल करण्यासाठी दुसरे कोणतेही टूल नाही: रिमोट मोड म्हणजे नियमित `omniroute` CLI
आणि व्याप्ती-नियंत्रित **ॲक्सेस टोकन्स**.

```bash
npm install -g omniroute                 # नेहमीचे CLI
omniroute connect 192.168.0.15           # लॉग इन करा (पासवर्ड → व्याप्ती-नियंत्रित टोकन)
omniroute models list                    # ← आता रिमोट सर्व्हरवरील मॉडेल्सची सूची दाखवते
omniroute configure codex                # ← रिमोट कॅटलॉगमधून स्थानिक Codex प्रोफाइल लिहिते
```

---

## हे कसे कार्य करते

```
तुमचा लॅपटॉप                            रिमोट OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (पासवर्ड → टोकन)           │
│  संदर्भ: vps       │ ───────────────►  │ व्याप्ती-नियंत्रित ॲक्सेस टोकन जारी करते │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ प्रत्येक व्यवस्थापन मार्ग, टोकनच्या │
│ कॉन्फिगरेशन        │ ◄───────────────  │ व्याप्तीनुसार तपासलेला           │
│ स्थानिकरीत्या लिहिते │                   └───────────────────────────────┘
└────────────────────┘
```

- **संदर्भांमध्ये** प्रत्येकी एक सर्व्हर साठवला जातो (`~/.omniroute/config.json`, `chmod 600`).
  `omniroute contexts use <name>` सक्रिय सर्व्हर बदलते; `default` हा स्थानिक असतो.
- **ॲक्सेस टोकन्स** (`oma_live_…`) व्यवस्थापन कमांड्सना अधिकृत करतात. ते
  इन्फरन्स API कींपेक्षा (`sk-…`, ज्या `/v1/chat/completions` साठी वापरल्या जातात) वेगळे आहेत.
- सर्व्हरवर टोकनचा फक्त SHA-256 हॅश साठवला जातो. साधा मजकूर
  निर्मितीच्या वेळी **फक्त एकदाच** दाखवला जातो.

---

## कनेक्ट करणे

### व्यवस्थापन पासवर्डसह (बूटस्ट्रॅप)

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128 साठी व्यवस्थापन पासवर्ड: ********
# ✔ http://192.168.0.15:20128 शी कनेक्ट झाले — संदर्भ '192.168.0.15' (व्याप्ती: admin)
```

पासवर्ड प्रवाह डीफॉल्टनुसार **admin** टोकन जारी करतो (तुमच्याकडे पासवर्ड असल्याने
तुमच्याकडे आधीपासूनच पूर्ण नियंत्रण असते). `--scope` वापरून व्याप्ती कमी करा:

```bash
omniroute connect 192.168.0.15 --scope write
```

पर्याय: `--port <p>` (होस्टमध्ये पोर्ट नसताना), `--name <ctx>` (संदर्भाचे नाव),
`--scope read|write|admin`. संपूर्ण URL जसेच्या तसे वापरले जाते:
`omniroute connect https://omni.example.com`.

### पूर्वनिर्मित टोकनसह

डॅशबोर्डमध्ये (किंवा `omniroute tokens create` वापरून) व्याप्ती-नियंत्रित टोकन तयार करा आणि
ते पेस्ट करा — पासवर्डची आवश्यकता नाही:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI `GET /api/cli/whoami` द्वारे ते प्रमाणित करते आणि सक्रिय संदर्भ म्हणून जतन करते.

---

## व्याप्ती

तीन श्रेणीबद्ध स्तर (`admin ⊃ write ⊃ read`):

| व्याप्ती | काय करता येते                                                                   |
| -------- | ------------------------------------------------------------------------------- |
| `read`   | सूची/तपासणी — `models list`, `providers status`, `logs`, `usage`, `cost`        |
| `write`  | read **+** कॉन्फिगर/लागू करणे — `setup-codex`, `keys add`, `config set`, combos |
| `admin`  | write **+** व्यवस्थापन — `tokens` CRUD, प्रदाते जोडणे, सेवा, धोरण, oauth        |

HTTP पद्धतीवरून (`GET`→read, बदल→write) तसेच संवेदनशील पृष्ठभागांसाठी असलेल्या
admin अनुमतीसूचीवरून (`/api/cli/tokens`, `/api/providers` बदल, `/api/oauth`, `/api/services`, …)
प्रत्येक मार्गाला आवश्यक असलेली व्याप्ती सर्व्हर ठरवतो.
अपुरी व्याप्ती असलेल्या टोकनला स्पष्ट संदेशासह `403` मिळतो.

> प्रक्रिया सुरू करणारे मार्ग (`/api/services/*`, `/api/mcp/*`, …)
> **फक्त loopback** राहतात — व्याप्ती कोणतीही असली तरी रिमोट टोकनला त्यांच्यापर्यंत कधीही पोहोचता येत नाही.

---

## रिमोट इन्स्टॉलेशनवर Antigravity कनेक्ट करणे

Antigravity हे Google चे firstparty/nativeapp संमती स्क्रीन वापरते. **साइन-इनला
मान्यता देणाऱ्या ब्राउझरमधून** **लूपबॅक रीडायरेक्ट**
(`http://127.0.0.1:<port>/callback`) पोहोचण्यायोग्य असेल, तेव्हाच Google
ऑथरायझेशन कोड जारी करते. रिमोट VPS इन्स्टॉलेशनवर तो लूपबॅक तुमच्या मशीनवर
नसून सर्व्हरवर असतो, त्यामुळे संमती स्क्रीन **कायमची अडकते आणि कधीही कोड
उत्सर्जित करत नाही** — नेहमीच्या "कॉलबॅक URL पेस्ट करा" या पर्यायामध्ये पेस्ट
करण्यास काहीच नसते. (ही Google-कडील मर्यादा आहे: bundled Antigravity desktop
client वापरणाऱ्या कोणत्याही प्रॉक्सीमध्ये असेच घडते, केवळ OmniRoute मध्ये नाही.)

तुम्ही अडकण्यापूर्वीच डॅशबोर्ड हे ओळखतो: localhost नसलेल्या पत्त्यावरून
**Providers → Antigravity → Connect** उघडल्यास, "कॉलबॅक URL कॉपी करा" ही सामान्य
सूचना खालील दोन उपायांनी बदलली जाते आणि प्रत्येकामध्ये तुमचा होस्ट व पोर्ट
आधीच भरलेले असतात. (LAN पत्तादेखील यामध्ये येतो — या कॉलबॅकच्या दृष्टीने
`192.168.x.x` हा localhost नाही.)

Antigravity ला रिमोट OmniRoute शी कनेक्ट करण्याचे दोन समर्थित मार्ग आहेत.

### पर्याय A — स्थानिक लॉगिन सहाय्यक (शिफारस केलेला)

OAuth **तुमच्या स्वतःच्या संगणकावर** चालवा, जिथे `127.0.0.1` पोहोचण्यायोग्य
आहे. सहाय्यक Google शी थेट संवाद साधतो, त्यामुळे डॅशबोर्डच्या आवृत्तीला जिथे
प्रक्रिया पूर्ण करता येत नाही, तिथे संमती प्रक्रिया पूर्ण होते.

**तुम्ही आधीच कनेक्ट केलेले असल्यास** (`omniroute connect <host>`), कॉपी
करण्यास काहीही नाही — सहाय्यक तुमच्यासाठी त्या इन्स्टॉलेशनपर्यंत क्रेडेन्शियल
पोहोचवतो:

```bash
# तुमच्या स्थानिक मशीनवर (Node.js + ब्राउझर आवश्यक):
omniroute connect 192.168.0.15        # एकदा — admin-scoped context token तयार करतो
npx omniroute login antigravity
#   ↳ Google संमती उघडतो, स्थानिक लूपबॅक पोर्टवर कॉलबॅक प्राप्त करतो,
#     त्याची देवाणघेवाण करतो आणि सक्रिय कॉन्टेक्स्टवर क्रेडेन्शियल POST करतो:
#
#   Antigravity http://192.168.0.15:20128 वर कनेक्ट झाले (कनेक्शन abc123).
#   पेस्ट करण्यास काहीही नाही — तुम्ही हे टर्मिनल बंद करू शकता.
```

सक्रिय कॉन्टेक्स्ट दुसऱ्या मशीनकडे निर्देशित करत असेल, तेव्हा पुश आपोआप होतो.
`--push` / `--no-push` वापरून तो कोणत्याही दिशेने सक्तीने नियंत्रित करा किंवा
`--context <name>` वापरून विशिष्ट कॉन्टेक्स्टला लक्ष्य करा.

**तुमचे मशीन VPS पर्यंत पोहोचू शकत नसल्यास** (फायरवॉल केलेले, SSH नाही,
air-gapped डेस्क), तरीही सहाय्यक कार्य करतो — त्याला फक्त Google चीच _गरज_
असते. `--no-push` वापरा किंवा पुश अयशस्वी होऊ द्या: तुम्ही आधीच पूर्ण केलेले
ऑथरायझेशन टाकून देण्याऐवजी तो blob प्रिंट करतो.

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

त्यानंतर, **रिमोट** डॅशबोर्डमध्ये: **Providers → Antigravity → Connect** वर जा
आणि **Step 2** फील्डमध्ये `omniroute-cred-v1.…` blob पेस्ट करा (ते कॉलबॅक URL
किंवा क्रेडेन्शियल blob यांपैकी कोणतेही स्वीकारते). OmniRoute ते डीकोड करते,
सर्व्हर-साइडवर Cloud Code ऑनबोर्डिंग चालवते आणि कनेक्शन कायमस्वरूपी जतन करते.

> blob मध्ये refresh token असतो — त्याला पासवर्डप्रमाणे हाताळा. पुश मार्गावर तो
> तुमच्या कॉन्टेक्स्टच्या प्रमाणित कनेक्शनवरून एकदाच पाठवला जातो; पेस्ट मार्गावर
> तो तुमच्या डॅशबोर्ड कनेक्शनवरून पाठवला जातो. दोन्ही बाबतींत तो संग्रहित
> स्थितीत एन्क्रिप्ट केलेला असतो आणि यशस्वी पुश तो तुमच्या टर्मिनलवर कधीही
> प्रिंट करत नाही.

फ्लॅग्स: `--no-browser` (आपोआप उघडण्याऐवजी URL प्रिंट करा), `--port <n>`
(लूपबॅक पोर्ट निश्चित करा), `--timeout <ms>`, `--push` / `--no-push` (स्वयंचलित
वितरण ओव्हरराइड करा), `--context <name>` (विशिष्ट कॉन्टेक्स्टला लक्ष्य करा).

### पर्याय B — SSH लोकल-फॉरवर्ड टनेल

तुमच्याकडे VPS चा SSH प्रवेश असल्यास, डॅशबोर्ड पोर्ट फॉरवर्ड करा, जेणेकरून
लूपबॅक कॉलबॅक टनेलद्वारे पुन्हा सर्व्हरपर्यंत पोहोचेल:

```bash
# तुमच्या स्थानिक मशीनवर:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# त्यानंतर तुमच्या स्थानिक ब्राउझरमध्ये http://localhost:20128 उघडा आणि Antigravity
# नेहमीप्रमाणे कनेक्ट करा — 127.0.0.1:20128/callback रीडायरेक्ट आता SSH द्वारे VPS पर्यंत पोहोचतो.
```

तुम्ही डॅशबोर्डला `localhost:20128` म्हणून पोहोचत असल्यामुळे Google संमती
पूर्ण होते आणि कॉलबॅक त्याच टनेलद्वारे सर्व्हरपर्यंत पोहोचवला जातो — blob ची
गरज नसते. कनेक्शन सक्रिय म्हणून दिसेपर्यंत टनेल उघडे ठेवा.

खालील fixed-loopback प्रोव्हायडर्सपेक्षा वेगळे म्हणजे, येथे **एक फॉरवर्ड पुरेसा
आहे**: Antigravity कॉलबॅक स्वतः डॅशबोर्ड पोर्टवरून जातो, त्यामुळे टनेल करण्यासाठी
दुसऱ्या प्रोव्हायडर-विशिष्ट पोर्टची आवश्यकता नसते.

> पूर्णपणे headless पर्यायासाठी (सहाय्यक नाही, टनेल नाही), तुमची **स्वतःची**
> Google OAuth web credentials + सार्वजनिक base URL कॉन्फिगर करा; प्रोव्हायडरचे
> OAuth environment variables पहा. वरील दोन पर्यायांसाठी कोणत्याही अतिरिक्त
> Google सेटअपची आवश्यकता नाही.

---

## रिमोट इंस्टॉलवर Codex / Grok कनेक्ट करणे (स्थिर-लूपबॅक प्रोव्हायडर्स)

Codex, xAI (`xai-oauth`) आणि Grok CLI (`grok-cli`) त्यांच्या अपस्ट्रीम OAuth अॅपमध्ये एक **स्थिर** लूपबॅक
`redirect_uri` नोंदवतात. OmniRoute ते बदलू शकत नाही — प्रोव्हायडर नेहमी ब्राउझरला त्याच हार्डकोड केलेल्या पत्त्यावर परत पाठवतो:

| प्रोव्हायडर | प्रोव्हायडर ज्या स्थिर कॉलबॅककडे रीडायरेक्ट करतो |
| ----------- | ------------------------------------------------ |
| `codex`     | `http://localhost:1455/auth/callback`            |
| `xai-oauth` | `http://127.0.0.1:56121/callback`                |
| `grok-cli`  | `http://127.0.0.1:56122/callback`                |

येथील `localhost` म्हणजे **ब्राउझर चालवणारे मशीन**, तर OmniRoute चा PKCE
कॉलबॅक सर्व्हर **सर्व्हरच्या** लूपबॅकवर ऐकतो. `http://192.168.0.15:20128` सारख्या LAN
पत्त्यावर डॅशबोर्ड उघडल्यास हे दोन्ही कधीही एकमेकांशी जोडले जात नाहीत: अधिकृतता
कोड तुमच्या स्वतःच्या लॅपटॉपवरील `localhost:1455` कडे पाठवला जातो, जिथे काहीही ऐकत नसते,
आणि कोणतीही त्रुटी न दाखवता प्रोव्हायडरचे साइन-इन अयशस्वी होते.

पॉपअप उघडण्यापूर्वी डॅशबोर्ड ही परिस्थिती ओळखतो आणि लॉगिनला कोणतीही सूचना न देता अयशस्वी होऊ देण्याऐवजी
टनेल कमांड दाखवतो (#8046).

### उपाय — **दोन्ही** पोर्ट फॉरवर्ड करा

```bash
# BROWSER चालवणाऱ्या मशीनवर:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# त्यानंतर http://localhost:20128 उघडा आणि तेथून Codex कनेक्ट करा
```

दोन फॉरवर्ड आवश्यक आहेत; फक्त एक फॉरवर्ड केल्यास प्रक्रिया तरीही अयशस्वी होते:

- **`20128`** (डॅशबोर्ड पोर्ट) ओरिजिनला खरा-लोकलहोस्ट बनवतो, ज्यामुळेच
  OmniRoute PKCE कॉलबॅक सर्व्हर सुरू करतो — LAN ओरिजिन कधीही
  त्या शाखेपर्यंत पोहोचत नाही.
- **`1455`** (प्रोव्हायडरचा स्थिर कॉलबॅक पोर्ट) हा ब्राउझरला परत पाठवले जाणारे ठिकाण आहे;
  तेथून कनेक्शन टनेलद्वारे सर्व्हरच्या लूपबॅकपर्यंत पोहोचणे आवश्यक आहे.

xAI किंवा Grok CLI कनेक्ट करताना `1455` ऐवजी `56121`/`56122` वापरा आणि `20128` ऐवजी
तुमचा प्रत्यक्ष डॅशबोर्ड पोर्ट वापरा. कनेक्शन सक्रिय म्हणून दिसेपर्यंत टनेल उघडे ठेवा.

> **SSH प्रवेश नाही?** Codex आणि Grok CLI पेस्ट केलेले टोकनदेखील स्वीकारतात — कनेक्ट संवादातील **Paste API
> Key** / **Import auth.json** टॅब वापरा. या मार्गात लूपबॅक
> कॉलबॅक नसल्यामुळे तो कोणत्याही ओरिजिनवरून कार्य करतो. Codex याशिवाय केवळ अॅक्सेस
> टोकन किंवा `~/.codex/auth.json` सेशन ब्लॉबदेखील स्वीकारतो.

---

## टोकन व्यवस्थापित करणे

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ गुपित फक्त एकदाच दाखवते — ते आत्ताच कॉपी करा
omniroute tokens list                 # मास्क केलेले: id, नाव, स्कोप, प्रीफिक्स, स्थिती, कालबाह्यता
omniroute tokens revoke <id|prefix>   # त्वरित रद्द करा
omniroute tokens scopes               # तीन स्कोपचे स्पष्टीकरण द्या
```

`tokens` कमांडसाठी **admin** क्रेडेन्शियल आवश्यक आहे. तुम्ही डॅशबोर्डमधील
**Settings → Access Tokens** अंतर्गतही टोकन व्यवस्थापित करू शकता (तयार करणे, रद्द करणे, एकदाच कॉपी करणे).

---

## रिमोट कॅटलॉगमधून कोडिंग CLI कॉन्फिगर करणे

`omniroute configure` **सक्रिय सर्व्हरचा** लाइव्ह मॉडेल कॅटलॉग वाचते आणि
**तुमच्या** मशीनवर कॉन्फिग लिहिते.

```bash
omniroute configure codex
#   प्रोव्हायडर्स: glm, kmc, ollamacloud, opencode-go, …
#   प्रोव्हायडर: glm
#   मॉडेल id: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml लिहिले
#   असे वापरा:  codex --profile glm52

# नॉन-इंटरॅक्टिव्ह
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# वारंवार वापरले जाणारे मॉडेल इंटरॅक्टिव्ह पिकरच्या शीर्षस्थानी ठेवा
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

पिकर स्थानिक `model-preferences.json` फाइलमध्ये केवळ मॉडेल ID ठेवतो (URL किंवा क्रेडेन्शियल कधीही नाहीत),
आणि ते संदर्भ व CLI लक्ष्याच्या व्याप्तीनुसार ठेवले जातात. अलीकडील निवडींपूर्वी
आवडी दाखवल्या जातात; त्या संदर्भ/लक्ष्य सूचीमधून निवडलेले मॉडेल काढण्यासाठी `--unfavorite` वापरा.

लिहिलेले प्रोफाइल env var द्वारे इन्फरन्स कीचा संदर्भ देते
(`OMNIROUTE_API_KEY`) — गुपित कधीही डिस्कवर लिहिले जात नाही. एकदाच करावयाच्या
मूलभूत Codex सेटअपसाठी (`[model_providers.omniroute]` ब्लॉक),
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) पहा.

### रिमोटसाठी CLI लाँच करणे (कॉन्फिग न लिहिता)

`omniroute run <target>` सक्रिय संदर्भाचादेखील वापर करते: रिमोट बेस URL
आणि संदर्भ क्रेडेन्शियल केवळ सुरू केलेल्या प्रक्रियेमध्ये इंजेक्ट केले जातात.

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → रिमोट
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# नेमके काय सुरू केले जाईल याचे पूर्वावलोकन करा (फक्त env KEY NAMES, मूल्ये कधीही नाहीत):
omniroute run codex --dry-run --json
```

लक्ष्ये: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(एकमेव स्रोत: `bin/cli/cli-manifest.mjs`). Qwen आणि Gemini तात्पुरत्या,
विलग होमसह चालतात, जे बाहेर पडताना काढून टाकले जाते; त्यामुळे लाँच तुमच्या वैयक्तिक
टूल कॉन्फिगरेशनला कधीही स्पर्श करत नाही — किंवा त्यामध्ये काहीही लीक करत नाही.

### प्रत्येक CLI साठी सेटअप कमांड

प्रत्येक समर्थित CLI मध्ये रिमोट-जागरूक सेटअप कमांड आहे (सर्व कमांड सक्रिय
संदर्भाचा किंवा `--remote <url> --api-key <key>` चा वापर करतात):

| CLI         | कमांड                      | काय लिहिले जाते                                                                                                                                                           |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` प्रोफाइल्स (प्रत्येक मॉडेलसाठी)                                                                                                             |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (प्रत्येक मॉडेलसाठी)                                                                                                            |
| OpenCode    | `omniroute setup-opencode` | प्रत्येक कॅटलॉग मॉडेलसह `omniroute` हा openai-सुसंगत प्रोव्हायडर असलेली `~/.config/opencode/opencode.json` फाइल (`opencode -m omniroute/<model>` चालवा)                   |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI मोड) + पेस्ट करण्यासाठी VS Code एक्स्टेंशन सेटिंग्ज प्रिंट करते (OpenAI-सुसंगत, `/v1` **शिवाय** Base URL)                 |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` सेटिंग्ज — OpenAI-सुसंगत, `/v1` **सह** Base URL                                                              |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `/v1` **सह** `apiBase`, `${{ secrets.OMNIROUTE_API_KEY }}` द्वारे की                       |
| Cursor      | `omniroute setup-cursor`   | ॲपमधील पायऱ्या प्रिंट करते (Settings → Models → `/v1` **सह** Override OpenAI Base URL + की + मॉडेल). Cursor कॉन्फिगरेशन अपारदर्शक SQLite आहे — केवळ चॅट पॅनेल             |
| Roo Code    | `omniroute setup-roo`      | Roo इम्पोर्ट JSON (`~/.omniroute/roo-settings.json`) लिहिते + `roo-cline.autoImportSettingsPath` सेट करते + UI पायऱ्या प्रिंट करते (OpenAI-सुसंगत, `/v1` **सह** Base URL) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` प्रोव्हायडर, `/v1` **सह** `base_url`, `$OMNIROUTE_API_KEY` द्वारे की                                                       |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `/v1` **शिवाय** `OPENAI_HOST` + `GOOSE_MODEL`) + एन्व्हायर्नमेंट कृतीक्रम                                        |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`/v1` **शिवाय** `openai-api-base` + `model: openai/<id>`) + एन्व्हायर्नमेंट कृतीक्रम (`aider --message --yes`)                                       |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` मधील V4 `modelProviders.openai` नोंद + `~/.qwen/.env` मध्ये `OMNIROUTE_API_KEY`                                                                   |

```bash
# OpenCode (openai-सुसंगत प्रोव्हायडर, सर्व कॅटलॉग मॉडेल्स, रिमोट VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # केवळ जुळणारी मॉडेल्स ठेवा
opencode -m omniroute/glm/glm-5.2 "..."          # प्रथम OMNIROUTE_API_KEY एक्सपोर्ट करा
```

> OpenCode मध्ये अधिक वैशिष्ट्यपूर्ण **plugin** इंटिग्रेशनदेखील आहे: `omniroute setup opencode`
> (आता `--remote` द्वारे रिमोट-सजग) हे `@omniroute/opencode-plugin` इन्स्टॉल करते.
> `setup-opencode` हा हलका openai-सुसंगत पर्याय आहे. API कीचा संदर्भ
> `{env:OMNIROUTE_API_KEY}` द्वारे दिला जातो — ती कधीही डिस्कवर लिहिली जात नाही.
>
> OpenCode v2 वर त्याऐवजी `@omniroute/opencode-plugin-v2` वापरा: समान कॅटलॉग,
> परंतु वेगळा लोडर करार. इंटिग्रेशन कनेक्ट केलेले असताना ते OpenCode च्या स्वतःच्या क्रेडेन्शियल
> स्टोअरमधून की वाचते, त्यामुळे रिमोट गेटवेसाठी `opencode.json` मध्ये
> कोणत्याही कीची आवश्यकता नसते.

---

## संदर्भ व्यवस्थापित करणे (सर्व्हरमध्ये अदलाबदल करणे)

**संदर्भ** म्हणजे जतन केलेला सर्व्हर (baseUrl + क्रेडेन्शियल + व्याप्ती). `omniroute connect`
एक संदर्भ तयार करते आणि तो सक्रिय करते; त्यानंतर प्रत्येक कमांड त्यालाच लक्ष्य करते. `omniroute contexts`
वापरून संदर्भ व्यवस्थापित करा आणि त्यांच्यामध्ये अदलाबदल करा:

```bash
omniroute contexts list            # सर्व संदर्भ; सक्रिय संदर्भ ● ने चिन्हांकित केला जातो
omniroute contexts current         # सक्रिय सर्व्हर, प्रमाणीकरण स्थिती, व्याप्ती
```

```text
  | नाव     | बेस URL                   | प्रमाणीकरण | व्याप्ती | वर्णन
● | vps     | http://100.67.86.91:20128 | token      | admin   | दूरस्थ OmniRoute (…)
  | default | http://localhost:20128    | ✗          |         |
```

**सर्व्हर बदला** — त्यानंतरची प्रत्येक कमांड सक्रिय संदर्भ वापरते:

```bash
omniroute contexts use vps         # → आता सर्व कमांड दूरस्थ VPS वर पाठवल्या जातात
omniroute tokens list              #   (VPS वर चालते)

omniroute contexts use default     # → पुन्हा localhost वर
omniroute tokens list              #   (स्थानिक सर्व्हरवर चालते)
```

**संदर्भ स्वतः जोडा** (`connect` ऐवजी), तपासा किंवा नाव बदला:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # एका संदर्भाचा संपूर्ण तपशील
omniroute contexts rename staging stg
```

**संदर्भ काढून टाका** — पुष्टीकरणासाठी विचारले जाते; ते वगळण्यासाठी `--yes` द्या
(स्क्रिप्ट / नॉन-इंटरॅक्टिव्ह शेलसाठी आवश्यक, अन्यथा ते सुरक्षितपणे नकार देतात):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) काढून टाकता येत नाही. सक्रिय संदर्भ काढून टाकल्यास
> `default` वापरला जातो. टीप: संदर्भ काढून टाकल्याने फक्त **स्थानिकरित्या** जतन केलेले क्रेडेन्शियल हटते —
> प्रत्यक्षात प्रवेश बंद करण्यासाठी सर्व्हरवरील टोकन `omniroute tokens revoke <id>` वापरून
> रद्द करा.

संदर्भ **निर्यात / आयात** करा (उदा. ते वेगवेगळ्या मशीनदरम्यान हलवण्यासाठी). नवीन संदर्भांमध्ये
फक्त कीचेन संदर्भ कायम ठेवला जातो; OS कीचेन उपलब्ध असताना क्रेडेन्शियल निर्यातीमध्ये
कॉपी केली जात नाहीत:

```bash
omniroute contexts export --out contexts.json     # डीफॉल्ट: stdout
omniroute contexts import contexts.json            # अधिलिखित करा; विद्यमान संदर्भ ठेवण्यासाठी --merge
omniroute contexts migrate --yes                  # जुनी प्लेनटेक्स्ट टोकन कीचेनमध्ये हलवा
```

वापरण्यायोग्य OS कीचेन नसलेल्या हेडलेस प्रणालींवर, CLI `0600` मोडसह
`config.json` वापरते आणि एकदाच इशारा दर्शवते. या फॉलबॅकमधील निर्यात
(आणि स्थलांतरापूर्वीचे कोणतेही जुने कॉन्फिगरेशन) गुप्त सामग्री म्हणून हाताळा.

---

## जलद एंड-टू-एंड तपासणी

दूरस्थ सेटअप सुरुवातीपासून पडताळण्यासाठी कॉपी-पेस्ट करता येणारे जीवनचक्र — कनेक्ट करा, विशिष्ट
व्याप्तीचे टोकन तयार करा, कमांड रूट करा, पुन्हा मागे स्विच करा आणि सेटअप काढून टाका.
`192.168.0.15` च्या जागी तुमच्या सर्व्हरचा होस्ट/IP (Tailscale, LAN किंवा सार्वजनिक
`https://…` URL) वापरा.

```bash
# 1. कनेक्ट करा (पासवर्ड → admin टोकन, सक्रिय होणाऱ्या संदर्भाच्या स्वरूपात जतन केले जाते)
omniroute connect 192.168.0.15                 # किंवा: --key oma_live_xxxx  (पासवर्ड नाही)
omniroute contexts current                     # दूरस्थ सर्व्हर + व्याप्ती दाखवते

# 2. ते वापरा — व्यवस्थापन कमांड आता दूरस्थ सर्व्हरवर चालतात
omniroute tokens create --name laptop --scope read   # अधिक मर्यादित टोकन तयार करा
omniroute tokens list                                 # दूरस्थ सर्व्हरवरील मास्क केलेली यादी

# 3. पुढे-मागे स्विच करा
omniroute contexts use default                 # → स्थानिक
omniroute contexts use 192-168-0-15            # → पुन्हा दूरस्थ (`contexts list` मधील नाव)

# 4. सेटअप काढून टाका. टीप: `contexts remove` फक्त स्थानिक क्रेडेन्शियल हटवते —
#    ते सर्व्हरवरील टोकन रद्द करत नाही. तुम्हाला प्रत्यक्षात प्रवेश बंद करायचा असल्यास
#    प्रथम सर्व्हरवरील टोकन रद्द करा.
omniroute tokens revoke <id|prefix>            # सर्व्हरवरील प्रवेश बंद करते
omniroute contexts remove 192-168-0-15 --yes   # स्थानिक संदर्भ हटवा (तो सक्रिय असला तरी → default वापरला जातो), पुष्टीकरण नाही
```

> `--yes` मुळे `contexts remove` नॉन-इंटरॅक्टिव्ह होते (स्क्रिप्ट/CI मध्ये आवश्यक; त्याशिवाय
> नॉन-इंटरॅक्टिव्ह शेल अडकून राहण्याऐवजी सुरक्षितपणे नकार देते). **सक्रिय**
> संदर्भ काढून टाकल्यास आपोआप `default` वापरला जातो.

---

## सुरक्षा नोंदी

- टोकनचा साधा मजकूर फक्त एकदाच दाखवला जातो; केवळ SHA-256 हॅश कायमस्वरूपी साठवला जातो (API कींप्रमाणेच).
- `omniroute connect` लॉगिनसाठीचे ब्रूट-फोर्स लॉकआउट + ऑडिट लॉगिंग पुन्हा वापरते.
- ट्रान्सपोर्टसाठी HTTPS किंवा Tailnet वापरण्याला प्राधान्य द्या; केवळ होस्ट दिल्यास LAN/Tailscale च्या सोयीसाठी डीफॉल्टनुसार `http://` वापरले जाते — TLS साठी संपूर्ण `https://…` URL द्या.
- प्राधान्यकृत स्थानिक कॉन्टेक्स्ट फाइल `~/.omniroute/config.json` (`chmod 600`) आहे,
  ज्यात केवळ `credentialRef` असतो; टोकन स्वतः OS
  कीचेनमध्ये (`keytar`) साठवले जाते आणि लॉगमध्ये कधीही मुद्रित केले जात नाही. कार्यरत
  नेटिव्ह कीचेन नसलेल्या हेडलेस इंस्टॉलेशन्समध्ये स्पष्ट फॉलबॅक म्हणून तीच `0600`
  फाइल वापरली जाते आणि एकदा इशारा दिला जातो. कीचेन बॅकएंड इंस्टॉल केल्यानंतर
  `omniroute contexts migrate --yes` वापरा.

---

## API एंडपॉइंट्स (संदर्भ)

| पद्धत  | रूट                   | प्रमाणीकरण         | व्याप्ती                        |
| ------ | --------------------- | ------------------ | ------------------------------- |
| POST   | `/api/cli/connect`    | व्यवस्थापन पासवर्ड | — (सार्वजनिक, पासवर्ड-संरक्षित) |
| GET    | `/api/cli/whoami`     | ॲक्सेस टोकन        | वाचन                            |
| GET    | `/api/cli/tokens`     | ॲक्सेस टोकन        | प्रशासक                         |
| POST   | `/api/cli/tokens`     | ॲक्सेस टोकन        | प्रशासक                         |
| DELETE | `/api/cli/tokens/:id` | ॲक्सेस टोकन        | प्रशासक                         |

संपूर्ण स्कीमांसाठी [openapi.yaml](../openapi.yaml) पहा.
