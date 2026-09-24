# Remote Mode (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../guides/REMOTE-MODE.md) · 🇪🇹 [am](../../../am/docs/guides/REMOTE-MODE.md) · 🇸🇦 [ar](../../../ar/docs/guides/REMOTE-MODE.md) · 🇦🇿 [az](../../../az/docs/guides/REMOTE-MODE.md) · 🇧🇬 [bg](../../../bg/docs/guides/REMOTE-MODE.md) · 🇧🇩 [bn](../../../bn/docs/guides/REMOTE-MODE.md) · 🇧🇦 [bs](../../../bs/docs/guides/REMOTE-MODE.md) · 🇨🇿 [cs](../../../cs/docs/guides/REMOTE-MODE.md) · 🇩🇰 [da](../../../da/docs/guides/REMOTE-MODE.md) · 🇩🇪 [de](../../../de/docs/guides/REMOTE-MODE.md) · 🇬🇷 [el](../../../el/docs/guides/REMOTE-MODE.md) · 🇪🇸 [es](../../../es/docs/guides/REMOTE-MODE.md) · 🇪🇪 [et](../../../et/docs/guides/REMOTE-MODE.md) · 🇮🇷 [fa](../../../fa/docs/guides/REMOTE-MODE.md) · 🇫🇮 [fi](../../../fi/docs/guides/REMOTE-MODE.md) · 🇫🇷 [fr](../../../fr/docs/guides/REMOTE-MODE.md) · 🇮🇪 [ga](../../../ga/docs/guides/REMOTE-MODE.md) · 🇮🇳 [gu](../../../gu/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ha](../../../ha/docs/guides/REMOTE-MODE.md) · 🇮🇱 [he](../../../he/docs/guides/REMOTE-MODE.md) · 🇮🇳 [hi](../../../hi/docs/guides/REMOTE-MODE.md) · 🇭🇷 [hr](../../../hr/docs/guides/REMOTE-MODE.md) · 🇭🇺 [hu](../../../hu/docs/guides/REMOTE-MODE.md) · 🇦🇲 [hy](../../../hy/docs/guides/REMOTE-MODE.md) · 🇮🇩 [id](../../../id/docs/guides/REMOTE-MODE.md) · 🇳🇬 [ig](../../../ig/docs/guides/REMOTE-MODE.md) · 🇮🇹 [it](../../../it/docs/guides/REMOTE-MODE.md) · 🇯🇵 [ja](../../../ja/docs/guides/REMOTE-MODE.md) · 🇬🇪 [ka](../../../ka/docs/guides/REMOTE-MODE.md) · 🇰🇭 [km](../../../km/docs/guides/REMOTE-MODE.md) · 🇮🇳 [kn](../../../kn/docs/guides/REMOTE-MODE.md) · 🇰🇷 [ko](../../../ko/docs/guides/REMOTE-MODE.md) · 🇱🇹 [lt](../../../lt/docs/guides/REMOTE-MODE.md) · 🇱🇻 [lv](../../../lv/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ml](../../../ml/docs/guides/REMOTE-MODE.md) · 🇮🇳 [mr](../../../mr/docs/guides/REMOTE-MODE.md) · 🇲🇾 [ms](../../../ms/docs/guides/REMOTE-MODE.md) · 🇲🇹 [mt](../../../mt/docs/guides/REMOTE-MODE.md) · 🇲🇲 [my](../../../my/docs/guides/REMOTE-MODE.md) · 🇳🇱 [nl](../../../nl/docs/guides/REMOTE-MODE.md) · 🇳🇴 [no](../../../no/docs/guides/REMOTE-MODE.md) · 🇮🇳 [or](../../../or/docs/guides/REMOTE-MODE.md) · 🇮🇳 [pa](../../../pa/docs/guides/REMOTE-MODE.md) · 🇵🇭 [phi](../../../phi/docs/guides/REMOTE-MODE.md) · 🇵🇱 [pl](../../../pl/docs/guides/REMOTE-MODE.md) · 🇵🇹 [pt](../../../pt/docs/guides/REMOTE-MODE.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/guides/REMOTE-MODE.md) · 🇷🇴 [ro](../../../ro/docs/guides/REMOTE-MODE.md) · 🇷🇺 [ru](../../../ru/docs/guides/REMOTE-MODE.md) · 🇱🇰 [si](../../../si/docs/guides/REMOTE-MODE.md) · 🇸🇰 [sk](../../../sk/docs/guides/REMOTE-MODE.md) · 🇸🇮 [sl](../../../sl/docs/guides/REMOTE-MODE.md) · 🇷🇸 [sr](../../../sr/docs/guides/REMOTE-MODE.md) · 🇸🇪 [sv](../../../sv/docs/guides/REMOTE-MODE.md) · 🇰🇪 [sw](../../../sw/docs/guides/REMOTE-MODE.md) · 🇮🇳 [ta](../../../ta/docs/guides/REMOTE-MODE.md) · 🇮🇳 [te](../../../te/docs/guides/REMOTE-MODE.md) · 🇹🇭 [th](../../../th/docs/guides/REMOTE-MODE.md) · 🇹🇷 [tr](../../../tr/docs/guides/REMOTE-MODE.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/guides/REMOTE-MODE.md) · 🇵🇰 [ur](../../../ur/docs/guides/REMOTE-MODE.md) · 🇺🇿 [uz](../../../uz/docs/guides/REMOTE-MODE.md) · 🇻🇳 [vi](../../../vi/docs/guides/REMOTE-MODE.md) · 🇳🇬 [yo](../../../yo/docs/guides/REMOTE-MODE.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/guides/REMOTE-MODE.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/guides/REMOTE-MODE.md)

---

OmniRoute आफैं अन्यत्र (कुनै VPS, गृह सर्भर, वा तपाईंको Tailnet मा रहेको अर्को मेसिनमा) चलिरहेको बेला आफ्नो ल्यापटपमा `omniroute` CLI चलाउनुहोस्।
तपाईंले `omniroute connect` मार्फत एक पटक लगइन गरेपछि त्यसपछिका **हरेक** CLI आदेशले उक्त रिमोट सर्भरलाई लक्षित गर्छन् — उही आदेश, उही आउटपुट, केवल रिमोटमा कार्यान्वयन गरिन्छ।

स्थापना गर्नुपर्ने दोस्रो कुनै उपकरण छैन: रिमोट मोड भनेको नियमित `omniroute` CLI र सीमित कार्यक्षेत्र भएका **पहुँच टोकनहरू** हुन्।

```bash
npm install -g omniroute                 # सामान्य CLI
omniroute connect 192.168.0.15           # लगइन गर्नुहोस् (पासवर्ड → सीमित कार्यक्षेत्र भएको टोकन)
omniroute models list                    # ← अब रिमोट सर्भरका मोडेलहरू सूचीबद्ध गर्छ
omniroute configure codex                # ← रिमोट क्याटलगबाट स्थानीय Codex प्रोफाइल लेख्छ
```

---

## यसले कसरी काम गर्छ

```
तपाईंको ल्यापटप                          रिमोट OmniRoute (VPS)
┌────────────────────┐                   ┌───────────────────────────────┐
│ omniroute CLI      │  POST /api/cli/connect  (पासवर्ड → टोकन)          │
│  सन्दर्भ: vps      │ ───────────────►  │ सीमित कार्यक्षेत्र भएको पहुँच │
│  baseUrl, token    │  Authorization: Bearer oma_live_…                  │
│                    │ ───────────────►  │ टोकनको कार्यक्षेत्रअनुसार जाँच │
│ कन्फिगहरू          │ ◄───────────────  │ गरिने प्रत्येक व्यवस्थापन रुट │
│ स्थानीय रूपमा लेख्छ│                   └───────────────────────────────┘
└────────────────────┘
```

- **सन्दर्भहरू** ले प्रत्येकमा एउटा सर्भर भण्डारण गर्छन् (`~/.omniroute/config.json`, `chmod 600`)।
  `omniroute contexts use <name>` ले सक्रिय सर्भर परिवर्तन गर्छ; `default` स्थानीय हो।
- **पहुँच टोकनहरू** (`oma_live_…`) ले व्यवस्थापन आदेशहरूलाई अनुमति दिन्छन्। तिनीहरू
  इन्फरेन्स API कुञ्जीहरू (`sk-…`, `/v1/chat/completions` का लागि प्रयोग हुने) भन्दा फरक हुन्।
- टोकनको SHA-256 ह्यास मात्र सर्भरमा भण्डारण गरिन्छ। प्लेनटेक्स्ट सिर्जना गर्दा
  **एक पटक** मात्र देखाइन्छ।

---

## जडान गर्दै

### व्यवस्थापन पासवर्डमार्फत (बुटस्ट्र्याप)

```bash
omniroute connect 192.168.0.15
# http://192.168.0.15:20128 का लागि व्यवस्थापन पासवर्ड: ********
# ✔ http://192.168.0.15:20128 मा जडान भयो — सन्दर्भ '192.168.0.15' (कार्यक्षेत्र: admin)
```

पासवर्ड प्रवाहले पूर्वनिर्धारित रूपमा **admin** टोकन जारी गर्छ (तपाईंसँग पासवर्ड भएकाले
तपाईंसँग पहिले नै पूर्ण नियन्त्रण छ)। `--scope` प्रयोग गरेर कार्यक्षेत्र सीमित गर्नुहोस्:

```bash
omniroute connect 192.168.0.15 --scope write
```

विकल्पहरू: `--port <p>` (होस्टमा पोर्ट नभएको बेला), `--name <ctx>` (सन्दर्भको नाम),
`--scope read|write|admin`। पूर्ण URL जस्ताको तस्तै स्वीकार गरिन्छ:
`omniroute connect https://omni.example.com`।

### पहिले नै सिर्जना गरिएको टोकनमार्फत

ड्यासबोर्डमा (वा `omniroute tokens create` मार्फत) सीमित कार्यक्षेत्र भएको टोकन सिर्जना गरेर
त्यसलाई पेस्ट गर्नुहोस् — पासवर्ड आवश्यक पर्दैन:

```bash
omniroute connect 192.168.0.15 --key oma_live_xxxxxxxx
```

CLI ले `GET /api/cli/whoami` मार्फत त्यसलाई प्रमाणीकरण गर्छ र सक्रिय सन्दर्भका रूपमा सुरक्षित गर्छ।

---

## कार्यक्षेत्रहरू

तीनवटा श्रेणी, पदानुक्रमित (`admin ⊃ write ⊃ read`):

| कार्यक्षेत्र | गर्न सकिने कार्यहरू                                                            |
| ------------ | ------------------------------------------------------------------------------ |
| `read`       | सूची/निरीक्षण — `models list`, `providers status`, `logs`, `usage`, `cost`     |
| `write`      | read **+** कन्फिगर/लागू — `setup-codex`, `keys add`, `config set`, संयोजनहरू   |
| `admin`      | write **+** व्यवस्थापन — `tokens` CRUD, प्रदायकहरू थप्ने, सेवाहरू, नीति, oauth |

सर्भरले प्रत्येक रुटका लागि आवश्यक कार्यक्षेत्र HTTP विधिबाट
(`GET`→read, परिवर्तनहरू→write) र संवेदनशील सतहहरूका लागि रहेको admin अनुमति-सूचीबाट
(`/api/cli/tokens`, `/api/providers` परिवर्तनहरू, `/api/oauth`, `/api/services`, …) अनुमान गर्छ।
अपर्याप्त कार्यक्षेत्र भएको टोकनले स्पष्ट सन्देशसहित `403` प्राप्त गर्छ।

> प्रक्रियाहरू सुरु गर्ने रुटहरू (`/api/services/*`, `/api/mcp/*`, …)
> **लुपब्याकमा मात्र** सीमित रहन्छन् — कार्यक्षेत्र जेसुकै भए पनि रिमोट टोकनले तिनमा कहिल्यै पहुँच पाउन सक्दैन।

---

## रिमोट इन्स्टलमा Antigravity जडान गर्ने

Antigravity ले Google को firstparty/nativeapp सहमति स्क्रिन प्रयोग गर्छ। Google ले **लुपब्याक रिडाइरेक्ट**
(`http://127.0.0.1:<port>/callback`) **साइन-इन स्वीकृत गर्ने ब्राउजरबाट पहुँचयोग्य**
हुँदा मात्र प्राधिकरण कोड जारी गर्छ। रिमोट VPS इन्स्टलमा त्यो लुपब्याक तपाईंको
मेसिनमा नभई सर्भरमा हुन्छ, त्यसैले सहमति स्क्रिन **सधैँका लागि अड्किन्छ र कहिल्यै
कोड जारी गर्दैन** — सामान्य "कल्ब्याक URL पेस्ट गर्नुहोस्" वैकल्पिक उपायमा पेस्ट
गर्नका लागि केही हुँदैन। (यो Google-पक्षको प्रतिबन्ध हो: बन्डल गरिएको Antigravity
डेस्कटप क्लाइन्ट प्रयोग गर्ने कुनै पनि प्रोक्सीमा यही समस्या हुन्छ, OmniRoute मा मात्र होइन।)

तपाईं अड्किनुअघि नै ड्यासबोर्डले यो पत्ता लगाउँछ: गैर-localhost ठेगानाबाट **Providers → Antigravity →
Connect** खोल्दा सामान्य "कल्ब्याक URL प्रतिलिपि गर्नुहोस्" सूचनाको सट्टा तलका दुई उपाय
देखाइन्छन्, जसमा तपाईंको होस्ट र पोर्ट पहिले नै भरिएका हुन्छन्।
(LAN ठेगाना पनि यसमा पर्छ — यो कल्ब्याकका सन्दर्भमा `192.168.x.x` लाई localhost मानिँदैन।)

Antigravity लाई रिमोट OmniRoute सँग जडान गर्ने दुई समर्थित तरिका छन्।

### विकल्प A — स्थानीय लगइन सहायक (सिफारिस गरिएको)

OAuth लाई **आफ्नै कम्प्युटरमा** चलाउनुहोस्, जहाँ `127.0.0.1` पहुँचयोग्य हुन्छ। सहायकले
Google सँग सीधै सञ्चार गर्छ, त्यसैले ड्यासबोर्डको संस्करणले पूरा गर्न नसक्ने सहमति
प्रक्रिया त्यहीँ पूरा हुन्छ।

**यदि तपाईं पहिले नै जडान हुनुहुन्छ भने** (`omniroute connect <host>`), प्रतिलिपि गर्नुपर्ने
केही हुँदैन — सहायकले तपाईंका लागि क्रेडेन्सियल सो इन्स्टलमा पठाउँछ:

```bash
# तपाईंको स्थानीय मेसिनमा (Node.js + ब्राउजर आवश्यक):
omniroute connect 192.168.0.15        # एकपटक — admin-scoped context token सिर्जना गर्छ
npx omniroute login antigravity
#   ↳ Google सहमति खोल्छ, स्थानीय लुपब्याक पोर्टमा कल्ब्याक समात्छ,
#     त्यसलाई साट्छ र सक्रिय कन्टेक्स्टमा क्रेडेन्सियल POST गर्छ:
#
#   Antigravity http://192.168.0.15:20128 मा जडान भयो (जडान abc123)।
#   पेस्ट गर्नुपर्ने केही छैन — तपाईं यो टर्मिनल बन्द गर्न सक्नुहुन्छ।
```

सक्रिय कन्टेक्स्टले अर्को मेसिनतर्फ सङ्केत गर्दा पुश स्वतः हुन्छ।
यसलाई कुनै पनि दिशामा बलपूर्वक सेट गर्न `--push` / `--no-push` प्रयोग गर्नुहोस्, वा
विशिष्ट कन्टेक्स्टलाई लक्ष्य बनाउन `--context <name>` प्रयोग गर्नुहोस्।

**यदि तपाईंको मेसिनले VPS मा पहुँच गर्न सक्दैन भने** (फायरवाल गरिएको, SSH नभएको,
एयर-ग्याप गरिएको डेस्क), सहायकले अझै काम गर्छ — यसलाई वास्तवमै _आवश्यक_ पर्ने भनेको
Google मात्र हो। `--no-push` प्रयोग गर्नुहोस्, वा पुश असफल हुन दिनुहोस्: तपाईंले पहिले नै
पूरा गरेको प्राधिकरण खारेज गर्नुको सट्टा यसले ब्लब प्रिन्ट गर्ने वैकल्पिक तरिका अपनाउँछ।

```bash
npx omniroute login antigravity --no-push
#   omniroute-cred-v1.eyJ2IjoxLCJ...
```

त्यसपछि **रिमोट** ड्यासबोर्डमा: **Providers → Antigravity → Connect** मा जानुहोस्, र
`omniroute-cred-v1.…` ब्लबलाई **Step 2** फिल्डमा पेस्ट गर्नुहोस् (यसले कल्ब्याक URL
वा क्रेडेन्सियल ब्लबमध्ये कुनै एक स्वीकार गर्छ)। OmniRoute ले यसलाई डिकोड गर्छ,
Cloud Code अनबोर्डिङ सर्भर-पक्षमा चलाउँछ, र जडानलाई स्थायी रूपमा भण्डारण गर्छ।

> ब्लबमा रिफ्रेस टोकन हुन्छ — यसलाई पासवर्डजस्तै व्यवहार गर्नुहोस्। पुश मार्गमा यो
> तपाईंको कन्टेक्स्टको प्रमाणीकृत जडानमार्फत एकपटक पठाइन्छ; पेस्ट मार्गमा भने
> तपाईंको ड्यासबोर्ड जडानमार्फत पठाइन्छ। जुनसुकै तरिकामा पनि यसलाई भण्डारण अवस्थामा
> इन्क्रिप्ट गरेर राखिन्छ, र सफल पुशले यसलाई तपाईंको टर्मिनलमा कहिल्यै प्रिन्ट गर्दैन।

फ्ल्यागहरू: `--no-browser` (स्वतः खोल्नुको सट्टा URL प्रिन्ट गर्ने), `--port <n>`
(लुपब्याक पोर्ट निश्चित गर्ने), `--timeout <ms>`, `--push` / `--no-push` (स्वचालित
डेलिभरी ओभरराइड गर्ने), `--context <name>` (विशिष्ट कन्टेक्स्टलाई लक्ष्य बनाउने)।

### विकल्प B — SSH स्थानीय-फर्वार्ड टनेल

यदि तपाईंसँग VPS को SSH पहुँच छ भने, ड्यासबोर्ड पोर्ट फर्वार्ड गर्नुहोस् ताकि
लुपब्याक कल्ब्याक टनेलमार्फत पुनः सर्भरमा पुगोस्:

```bash
# तपाईंको स्थानीय मेसिनमा:
ssh -L 20128:127.0.0.1:20128 user@your-vps
# त्यसपछि आफ्नो स्थानीय ब्राउजरमा http://localhost:20128 खोल्नुहोस् र Antigravity लाई
# सामान्य रूपमा जडान गर्नुहोस् — अब 127.0.0.1:20128/callback रिडाइरेक्ट SSH मार्फत VPS मा पुग्छ।
```

तपाईंले ड्यासबोर्डलाई `localhost:20128` का रूपमा पहुँच गर्ने भएकाले Google सहमति
पूरा हुन्छ र कल्ब्याक त्यही टनेलमार्फत सर्भरमा डेलिभर हुन्छ —
ब्लब आवश्यक पर्दैन। जडान सक्रिय देखिएसम्म टनेल खुला राख्नुहोस्।

तलका निश्चित-लुपब्याक प्रदायकहरूभन्दा फरक रूपमा, यहाँ **एउटा फर्वार्ड नै पर्याप्त हुन्छ**:
Antigravity कल्ब्याकले ड्यासबोर्ड पोर्ट नै प्रयोग गर्छ, त्यसैले टनेल गर्न अर्को
प्रदायक-विशिष्ट पोर्ट आवश्यक पर्दैन।

> पूर्ण रूपमा हेडलेस वैकल्पिक तरिका (सहायक वा टनेलबिना) प्रयोग गर्न आफ्नो **आफ्नै**
> Google OAuth वेब क्रेडेन्सियलहरू + सार्वजनिक आधार URL कन्फिगर गर्नुहोस्; प्रदायकका OAuth
> वातावरणीय भेरिएबलहरू हेर्नुहोस्। माथिका दुई विकल्पका लागि थप Google सेटअप आवश्यक पर्दैन।

---

## रिमोट इन्स्टलमा Codex / Grok जडान गर्दै (निश्चित-लूपब्याक प्रदायकहरू)

Codex, xAI (`xai-oauth`) र Grok CLI (`grok-cli`) ले आफ्नो अपस्ट्रिम OAuth एपमा
एउटा **निश्चित** लूपब्याक `redirect_uri` दर्ता गर्छन्। OmniRoute ले यसलाई परिवर्तन गर्न सक्दैन —
प्रदायकले सधैं ब्राउजरलाई उही हार्डकोड गरिएको ठेगानामा फर्काउँछ:

| प्रदायक     | प्रदायकले रिडाइरेक्ट गर्ने निश्चित कलब्याक |
| ----------- | ------------------------------------------ |
| `codex`     | `http://localhost:1455/auth/callback`      |
| `xai-oauth` | `http://127.0.0.1:56121/callback`          |
| `grok-cli`  | `http://127.0.0.1:56122/callback`          |

त्यहाँ `localhost` को अर्थ **ब्राउजर चलिरहेको मेसिन** हो, जबकि OmniRoute को PKCE
कलब्याक सर्भरले **सर्भरको** लूपब्याकमा सुन्छ। ड्यासबोर्डलाई
`http://192.168.0.15:20128` जस्तो LAN ठेगानामा खोल्दा यी दुई कहिल्यै जोडिँदैनन्:
प्राधिकरण कोड तपाईंको आफ्नै ल्यापटपको `localhost:1455` मा पठाइन्छ, जहाँ केही पनि
सुनिरहेको हुँदैन, र प्रदायकले कुनै त्रुटि नदेखाई साइन-इन असफल पार्छ।

ड्यासबोर्डले पपअप खोल्नुअघि नै यो अवस्था पत्ता लगाउँछ र लगइनलाई मौन रूपमा असफल हुन
दिनुको सट्टा टनेल आदेश देखाउँछ (#8046)।

### समाधान — **दुवै** पोर्ट फर्वार्ड गर्नुहोस्

```bash
# ब्राउजर चलिरहेको मेसिनमा:
ssh -L 20128:127.0.0.1:20128 -L 1455:127.0.0.1:1455 <user>@192.168.0.15
# त्यसपछि http://localhost:20128 मा जानुहोस् र त्यहाँबाट Codex जडान गर्नुहोस्
```

दुईवटा फर्वार्ड आवश्यक छन्, र एउटा मात्र फर्वार्ड गर्दा अझै असफल हुन्छ:

- **`20128`** (ड्यासबोर्ड पोर्ट) ले ओरिजिनलाई वास्तविक-localhost बनाउँछ, जसका कारण
  OmniRoute ले PKCE कलब्याक सर्भर सुरु गर्छ — LAN ओरिजिन त्यो शाखासम्म कहिल्यै
  पुग्दैन।
- **`1455`** (प्रदायकको निश्चित कलब्याक पोर्ट) ब्राउजरलाई फर्काएर पठाइने ठाउँ हो;
  यसलाई टनेल हुँदै सर्भरको लूपब्याकसम्म पुग्नुपर्छ।

xAI वा Grok CLI जडान गर्दा `1455` लाई `56121`/`56122` ले, र `20128` लाई
तपाईंको वास्तविक ड्यासबोर्ड पोर्टले बदल्नुहोस्। जडान सक्रिय भएको नदेखिएसम्म टनेल
खुला राख्नुहोस्।

> **SSH पहुँच छैन?** Codex र Grok CLI ले टाँसिएको टोकन पनि स्वीकार गर्छन् —
> जडान संवादको **Paste API Key** / **Import auth.json** ट्याब। त्यो मार्गमा लूपब्याक
> कलब्याक हुँदैन, त्यसैले यसले कुनै पनि ओरिजिनबाट काम गर्छ। Codex ले अतिरिक्त रूपमा
> साधारण पहुँच टोकन वा `~/.codex/auth.json` सत्र ब्लब पनि स्वीकार गर्छ।

---

## टोकनहरू व्यवस्थापन गर्दै

```bash
omniroute tokens create --name "laptop" --scope write [--expires 30]
#   ↳ गोप्य मान एकपटक मात्र प्रिन्ट गर्छ — अहिले नै प्रतिलिपि गर्नुहोस्
omniroute tokens list                 # मास्क गरिएको: id, name, scope, prefix, status, expiry
omniroute tokens revoke <id|prefix>   # तुरुन्तै रद्द गर्नुहोस्
omniroute tokens scopes               # तीनवटा स्कोपको व्याख्या गर्नुहोस्
```

`tokens` आदेशहरूका लागि **admin** प्रमाण आवश्यक हुन्छ। तपाईंले ड्यासबोर्डको
**Settings → Access Tokens** अन्तर्गत पनि टोकनहरू व्यवस्थापन गर्न सक्नुहुन्छ
(सिर्जना, रद्द, एकपटक मात्र प्रतिलिपि)।

---

## रिमोट क्याटलगबाट कोडिङ CLI कन्फिगर गर्दै

`omniroute configure` ले **सक्रिय सर्भरको** लाइभ मोडेल क्याटलग पढ्छ र
**तपाईंको** मेसिनमा कन्फिग लेख्छ।

```bash
omniroute configure codex
#   प्रदायकहरू: glm, kmc, ollamacloud, opencode-go, …
#   प्रदायक: glm
#   मोडेल id: glm/glm-5.2
#   ✔ ~/.codex/glm52.config.toml लेखियो
#   यसरी प्रयोग गर्नुहोस्:  codex --profile glm52

# गैर-अन्तरक्रियात्मक
omniroute configure codex --provider glm --model glm/glm-5.2 --name glm52

# बारम्बार प्रयोग हुने मोडेललाई अन्तरक्रियात्मक पिकरको शीर्षमा राख्नुहोस्
omniroute configure codex --provider glm --model glm/glm-5.2 --favorite --yes
```

पिकरले स्थानीय `model-preferences.json` फाइलमा मोडेल ID हरू मात्र राख्छ
(URL वा प्रमाणहरू कहिल्यै राख्दैन), जसलाई सन्दर्भ र CLI लक्ष्यअनुसार सीमित गरिएको
हुन्छ। मनपर्ने मोडेलहरू हालैका चयनहरूभन्दा अघि देखाइन्छन्; चयन गरिएको मोडेललाई
त्यो सन्दर्भ/लक्ष्य सूचीबाट हटाउन `--unfavorite` प्रयोग गर्नुहोस्।

लेखिएको प्रोफाइलले env var (`OMNIROUTE_API_KEY`) मार्फत इन्फरेन्स कुञ्जीलाई
सन्दर्भ गर्छ — गोप्य मान कहिल्यै डिस्कमा लेखिँदैन। एकपटक गरिने आधारभूत Codex
सेटअप (`[model_providers.omniroute]` ब्लक) का लागि
[CODEX-CLI-CONFIGURATION.md](./CODEX-CLI-CONFIGURATION.md) हेर्नुहोस्।

### रिमोटविरुद्ध CLI सुरु गर्दै (कुनै कन्फिग नलेखी)

`omniroute run <target>` ले पनि सक्रिय सन्दर्भलाई सम्मान गर्छ: रिमोट आधार URL
र सन्दर्भ प्रमाणलाई सुरु गरिएको प्रक्रियामा मात्र इन्जेक्ट गरिन्छ।

```bash
omniroute connect 192.168.0.15
omniroute run claude   --model openai/gpt-5.4          # Claude Code → रिमोट
omniroute run gemini   --model glm/glm-5.2 -- --skip-trust -p "hello"
omniroute run opencode --model glm/glm-5.2 -- run "reply OK"

# वास्तवमा के सुरु हुने थियो भन्ने ठ्याक्कै पूर्वावलोकन गर्नुहोस् (env KEY का नामहरू मात्र, मानहरू कहिल्यै होइन):
omniroute run codex --dry-run --json
```

लक्ष्यहरू: `claude`, `codex`, `aider`, `goose`, `opencode`, `qwen`, `gemini`
(एकल स्रोत: `bin/cli/cli-manifest.mjs`)। Qwen र Gemini अस्थायी पृथक् होमसँग
चल्छन्, जुन बाहिरिँदा हटाइन्छ, त्यसैले सुरु गर्दा तपाईंको व्यक्तिगत उपकरण
कन्फिगरेसनलाई कहिल्यै छोइँदैन — वा त्यसमा केही चुहिँदैन।

### प्रत्येक CLI का लागि सेटअप आदेशहरू

समर्थित प्रत्येक CLI मा रिमोट-सचेत सेटअप आदेश हुन्छ (सबैले सक्रिय सन्दर्भलाई
सम्मान गर्छन्, वा `--remote <url> --api-key <key>`):

| CLI         | कमाण्ड                     | यसले के लेख्छ                                                                                                                                                              |
| ----------- | -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Codex       | `omniroute setup-codex`    | `~/.codex/<name>.config.toml` प्रोफाइलहरू (प्रत्येक मोडेलका लागि)                                                                                                          |
| Claude Code | `omniroute setup-claude`   | `~/.claude/profiles/<name>/settings.json` (प्रत्येक मोडेलका लागि)                                                                                                          |
| OpenCode    | `omniroute setup-opencode` | `~/.config/opencode/opencode.json` — क्याटलगका प्रत्येक मोडेलसहितको `omniroute` openai-compatible प्रदायक (`opencode -m omniroute/<model>` चलाउनुहोस्)                     |
| Cline       | `omniroute setup-cline`    | `~/.cline/data/{globalState,secrets}.json` (CLI मोड) + टाँस्नका लागि VS Code एक्सटेन्सन सेटिङहरू प्रिन्ट गर्छ (OpenAI-compatible, Base URL `/v1` **बिना**)                 |
| Kilo Code   | `omniroute setup-kilo`     | `~/.local/share/kilo/auth.json` (CLI) + VS Code `kilocode.*` सेटिङहरू — OpenAI-compatible, Base URL `/v1` **सहित**                                                         |
| Continue    | `omniroute setup-continue` | `~/.continue/config.yaml` (VS Code/JetBrains + `cn` CLI) — `provider: openai`, `apiBase` `/v1` **सहित**, `${{ secrets.OMNIROUTE_API_KEY }}` मार्फत कुञ्जी                  |
| Cursor      | `omniroute setup-cursor`   | एपभित्रका चरणहरू प्रिन्ट गर्छ (Settings → Models → Override OpenAI Base URL `/v1` **सहित** + कुञ्जी + मोडेल)। Cursor कन्फिग अपारदर्शी SQLite हो — च्याट प्यानल मात्र       |
| Roo Code    | `omniroute setup-roo`      | Roo आयात JSON (`~/.omniroute/roo-settings.json`) लेख्छ + `roo-cline.autoImportSettingsPath` सेट गर्छ + UI चरणहरू प्रिन्ट गर्छ (OpenAI-compatible, Base URL `/v1` **सहित**) |
| Crush       | `omniroute setup-crush`    | `~/.config/crush/crush.json` — `openai-compat` प्रदायक, `base_url` `/v1` **सहित**, `$OMNIROUTE_API_KEY` मार्फत कुञ्जी                                                      |
| Goose       | `omniroute setup-goose`    | `~/.config/goose/config.yaml` (`GOOSE_PROVIDER=openai` + `OPENAI_HOST` `/v1` **बिना** + `GOOSE_MODEL`) + env विधि                                                          |
| Aider       | `omniroute setup-aider`    | `~/.aider.conf.yml` (`openai-api-base` `/v1` **बिना** + `model: openai/<id>`) + env विधि (`aider --message --yes`)                                                         |
| Qwen Code   | `omniroute setup-qwen`     | `~/.qwen/settings.json` मा V4 `modelProviders.openai` प्रविष्टि + `~/.qwen/.env` मा `OMNIROUTE_API_KEY`                                                                    |

```bash
# OpenCode (openai-compatible प्रदायक, क्याटलगका सबै मोडेलहरू, रिमोट VPS)
omniroute setup-opencode --remote http://192.168.0.15:20128 --api-key oma_live_xxx
omniroute setup-opencode --only glm,kimi        # मिल्ने मोडेलहरू मात्र राख्नुहोस्
opencode -m omniroute/glm/glm-5.2 "..."          # पहिले OMNIROUTE_API_KEY export गर्नुहोस्
```

> OpenCode सँग अझ सुविधासम्पन्न **plugin** एकीकरण पनि छ: `omniroute setup opencode`
> (`--remote` मार्फत अब रिमोट-सचेत) ले `@omniroute/opencode-plugin` स्थापना गर्छ।
> `setup-opencode` हल्का openai-compatible विकल्प हो। API कुञ्जीलाई
> `{env:OMNIROUTE_API_KEY}` मार्फत सन्दर्भ गरिन्छ — डिस्कमा कहिल्यै लेखिँदैन।
>
> OpenCode v2 मा यसको सट्टा `@omniroute/opencode-plugin-v2` प्रयोग गर्नुहोस्: उही क्याटलग,
> फरक लोडर अनुबन्ध। एकीकरण जडान भएको बेला यसले OpenCode कै क्रेडेन्सियल
> स्टोरबाट कुञ्जी पढ्छ, त्यसैले रिमोट गेटवेलाई `opencode.json` मा कुनै कुञ्जी आवश्यक पर्दैन।

---

## कन्टेक्स्टहरू व्यवस्थापन गर्ने (सर्भरहरूबीच स्विच गर्ने)

**कन्टेक्स्ट** भनेको सुरक्षित गरिएको सर्भर (baseUrl + क्रेडेन्सियल + स्कोप) हो। `omniroute connect`
ले एउटा कन्टेक्स्ट सिर्जना गरी त्यसलाई सक्रिय बनाउँछ; त्यसपछि प्रत्येक कमान्डले त्यसैलाई लक्षित गर्छ। `omniroute contexts`
मार्फत तिनलाई व्यवस्थापन गर्नुहोस् र तिनीहरूबीच स्विच गर्नुहोस्:

```bash
omniroute contexts list            # सबै कन्टेक्स्टहरू; सक्रिय कन्टेक्स्टलाई ● ले चिन्ह लगाइएको हुन्छ
omniroute contexts current         # सक्रिय सर्भर, प्रमाणीकरण स्थिति, स्कोप
```

```text
  | नाम     | आधार URL                  | प्रमाणीकरण | स्कोप | विवरण
● | vps     | http://100.67.86.91:20128 | token      | admin | रिमोट OmniRoute (…)
  | default | http://localhost:20128    | ✗          |       |
```

**सर्भरहरू स्विच गर्ने** — त्यसपछिका प्रत्येक कमान्डले सक्रिय कन्टेक्स्टलाई पछ्याउँछन्:

```bash
omniroute contexts use vps         # → अब सबै कमान्डहरू रिमोट VPS मा जान्छन्
omniroute tokens list              #   (VPS विरुद्ध चल्छ)

omniroute contexts use default     # → localhost मा फिर्ता
omniroute tokens list              #   (स्थानीय सर्भर विरुद्ध चल्छ)
```

**म्यानुअल रूपमा कन्टेक्स्ट थप्ने** (`connect` को सट्टा), निरीक्षण गर्ने वा नाम परिवर्तन गर्ने:

```bash
omniroute contexts add staging --url https://staging.example.com:20128 \
  --access-token oma_live_xxxx --scope write --description "staging box"
omniroute contexts show staging    # एउटा कन्टेक्स्टको पूर्ण विवरण
omniroute contexts rename staging stg
```

**कन्टेक्स्ट हटाउने** — पुष्टिका लागि सोध्छ; त्यसलाई छोड्न `--yes` दिनुहोस्
(स्क्रिप्टहरू / गैर-अन्तरक्रियात्मक शेलहरूका लागि आवश्यक, अन्यथा तिनले सुरक्षित रूपमा अस्वीकार गर्छन्):

```bash
omniroute contexts remove stg --yes
```

> `default` (localhost) हटाउन सकिँदैन। सक्रिय कन्टेक्स्ट हटाउँदा `default` मा
> फिर्ता जान्छ। सुझाव: कन्टेक्स्ट हटाउँदा **स्थानीय** रूपमा सुरक्षित गरिएको क्रेडेन्सियल मात्र मेटिन्छ —
> पहुँच वास्तवमै समाप्त गर्न सर्भरमा `omniroute tokens revoke <id>` प्रयोग गरी टोकन
> रद्द गर्नुहोस्।

कन्टेक्स्टहरू **निर्यात / आयात** गर्ने (जस्तै, तिनलाई मेसिनहरूबीच सार्न)। OS
कीचेन उपलब्ध हुँदा नयाँ कन्टेक्स्टहरूले कीचेन सन्दर्भ मात्र सुरक्षित राख्छन्; क्रेडेन्सियलहरू
निर्यातमा प्रतिलिपि गरिँदैनन्:

```bash
omniroute contexts export --out contexts.json     # पूर्वनिर्धारित: stdout
omniroute contexts import contexts.json            # अधिलेखन; विद्यमान राख्न --merge
omniroute contexts migrate --yes                  # पुराना प्लेनटेक्स्ट टोकनहरू कीचेनमा सार्नुहोस्
```

प्रयोगयोग्य OS कीचेन नभएका हेडलेस प्रणालीहरूमा CLI ले मोड `0600` सहितको
`config.json` प्रयोग गर्छ र एकपटकको चेतावनी देखाउँछ। त्यो फलब्याकबाट गरिएका निर्यातहरू
(र माइग्रेसनअघिका कुनै पनि पुराना कन्फिगहरू) लाई गोप्य सामग्रीका रूपमा व्यवहार गर्नुहोस्।

---

## द्रुत सुरुदेखि अन्त्यसम्मको जाँच

रिमोट सेटअपलाई शून्यबाट प्रमाणित गर्न प्रतिलिपि गरेर टाँस्न मिल्ने जीवनचक्र — जडान गर्ने, स्कोपयुक्त
टोकन जारी गर्ने, कमान्ड रुट गर्ने, फेरि पछाडि स्विच गर्ने र हटाउने। `192.168.0.15`
लाई आफ्नो सर्भरको होस्ट/IP (Tailscale, LAN, वा सार्वजनिक
`https://…` URL) ले बदल्नुहोस्।

```bash
# 1. जडान गर्नुहोस् (पासवर्ड → admin टोकन, सक्रिय हुने कन्टेक्स्टका रूपमा सुरक्षित)
omniroute connect 192.168.0.15                 # वा: --key oma_live_xxxx  (पासवर्ड आवश्यक छैन)
omniroute contexts current                     # रिमोट सर्भर + स्कोप देखाउँछ

# 2. यसलाई प्रयोग गर्नुहोस् — व्यवस्थापन कमान्डहरू अब रिमोटमा चल्छन्
omniroute tokens create --name laptop --scope read   # अझ सीमित टोकन जारी गर्नुहोस्
omniroute tokens list                                 # रिमोटबाट प्राप्त मास्क गरिएको सूची

# 3. अगाडि-पछाडि स्विच गर्नुहोस्
omniroute contexts use default                 # → स्थानीय
omniroute contexts use 192-168-0-15            # → फेरि रिमोट (`contexts list` बाट प्राप्त नाम)

# 4. हटाउनुहोस्। नोट: `contexts remove` ले स्थानीय क्रेडेन्सियल मात्र मेटाउँछ —
#    यसले सर्भरमा रहेको टोकन रद्द गर्दैन। पहुँच वास्तवमै समाप्त गर्न चाहनुहुन्छ भने
#    पहिले सर्भर-पक्षमा रद्द गर्नुहोस्।
omniroute tokens revoke <id|prefix>            # सर्भरमा पहुँच समाप्त गर्छ
omniroute contexts remove 192-168-0-15 --yes   # स्थानीय कन्टेक्स्ट हटाउनुहोस् (सक्रिय भए पनि → default मा फिर्ता जान्छ), कुनै पुष्टि सोधिँदैन
```

> `--yes` ले `contexts remove` लाई गैर-अन्तरक्रियात्मक बनाउँछ (स्क्रिप्टहरू/CI मा आवश्यक; यो नहुँदा
> गैर-अन्तरक्रियात्मक शेलले अड्किनुको सट्टा सुरक्षित रूपमा अस्वीकार गर्छ)। **सक्रिय**
> कन्टेक्स्ट हटाउँदा स्वतः `default` मा फिर्ता जान्छ।

---

## सुरक्षा टिप्पणीहरू

- टोकनको सादा पाठ एकपटक मात्र देखाइन्छ; SHA-256 ह्यास मात्र स्थायी रूपमा भण्डारण गरिन्छ (API कुञ्जीहरूमा जस्तै)।
- `omniroute connect` ले लगइन ब्रुट-फोर्स लकआउट र अडिट लगिङ पुनः प्रयोग गर्छ।
- ट्रान्सपोर्टका लागि HTTPS वा Tailnet प्रयोग गर्नुहोस्; LAN/Tailscale को सुविधाका लागि होस्ट मात्र दिँदा पूर्वनिर्धारित रूपमा `http://`
  प्रयोग हुन्छ — TLS का लागि पूर्ण `https://…` URL दिनुहोस्।
- सिफारिस गरिएको स्थानीय कन्टेक्स्ट फाइल `~/.omniroute/config.json` (`chmod 600`) हो,
  जसमा केवल `credentialRef` हुन्छ; टोकन स्वयं OS किचेन (`keytar`) मा भण्डारण
  गरिन्छ र लगहरूमा कहिल्यै प्रिन्ट गरिँदैन। काम गर्ने नेटिभ किचेन नभएका हेडलेस
  इन्स्टलहरूले स्पष्ट फलब्याकका रूपमा त्यही `0600` फाइल प्रयोग गर्छन् र
  एकपटक चेतावनी जारी गर्छन्। किचेन ब्याकएन्ड इन्स्टल गरेपछि
  `omniroute contexts migrate --yes` प्रयोग गर्नुहोस्।

---

## API एन्डपोइन्टहरू (सन्दर्भ)

| विधि   | रुट                   | प्रमाणीकरण         | स्कोप                                   |
| ------ | --------------------- | ------------------ | --------------------------------------- |
| POST   | `/api/cli/connect`    | व्यवस्थापन पासवर्ड | — (सार्वजनिक, पासवर्डद्वारा नियन्त्रित) |
| GET    | `/api/cli/whoami`     | पहुँच टोकन         | पढ्ने                                   |
| GET    | `/api/cli/tokens`     | पहुँच टोकन         | प्रशासक                                 |
| POST   | `/api/cli/tokens`     | पहुँच टोकन         | प्रशासक                                 |
| DELETE | `/api/cli/tokens/:id` | पहुँच टोकन         | प्रशासक                                 |

पूर्ण स्किमाहरूका लागि [openapi.yaml](../openapi.yaml) हेर्नुहोस्।
