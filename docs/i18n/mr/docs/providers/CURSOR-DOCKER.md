# Cursor Provider in Docker Environments (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇧🇦 [bs](../../../bs/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

OmniRoute Docker मध्ये चालत असताना, जुने **Cursor IDE मधून आयात करा** /
`cursor-agent` प्रवाह अयशस्वी होतात, कारण कंटेनरला होस्टवरील Cursor
इंस्टॉलेशन दिसू शकत नाही. त्याऐवजी **Cursor सह लॉग इन करा** (deep-control PKCE) वापरा.

## Docker मध्ये IDE / CLI आयात का अयशस्वी होते

1. **फाइलसिस्टम विलगीकरण** — स्वयं-आयात कंटेनरच्या _आत_
   `~/.config/Cursor/User/globalStorage/state.vscdb` सारखे Linux पथ शोधते.
   macOS वरील Docker Desktop मध्ये होस्ट IDE DB डीफॉल्टनुसार माउंट केलेला नसतो आणि
   होस्ट Darwin असला तरी कंटेनरची OS Linux असते.
2. **`cursor-agent` बायनरी नाही** — अधिकृत OmniRoute प्रतिमांमध्ये
   `cursor-agent` समाविष्ट नसतो. उपलब्ध मॉडेल्ससाठी पूर्वी
   `cursor-agent --list-models` शेलद्वारे चालवले जात असे आणि ते अयशस्वी झाल्यास स्थिर कॅटलॉग वापरला जात असे.
3. **चुकीची बायनरी** — macOS ची `cursor-agent` बायनरी Linux
   कंटेनरमध्ये bind-mount करू **नका**. ती कार्यान्वित होणार नाही.

## शिफारस: Cursor सह लॉग इन करा

1. **डॅशबोर्ड → प्रदाते → Cursor** उघडा.
2. **Cursor सह लॉग इन करा** टॅब निवडा.
3. **Cursor सह लॉग इन करा** वर क्लिक करा — OmniRoute तुमच्या **होस्ट** ब्राउझरमध्ये
   `https://cursor.com/loginDeepControl?…` उघडते.
4. ब्राउझरमध्ये लॉगिन मंजूर करा, त्यानंतर डॅशबोर्डवर परत या. टोकन्स प्राप्त होईपर्यंत OmniRoute
   `api2.cursor.sh/auth/poll` चे पोलिंग करते.
5. OmniRoute **access + refresh** टोकन्स संग्रहित करते आणि
   `https://api2.cursor.sh/auth/exchange_user_api_key` द्वारे त्यांचे नूतनीकरण करते.

या मार्गासाठी कंटेनरच्या आत Cursor IDE किंवा `cursor-agent` आवश्यक नाही.

## मॉडेल शोध

लॉग इन केलेले कनेक्शन असताना, **उपलब्ध मॉडेल्स / स्वयं-समक्रमण** कनेक्शनचे bearer token वापरून Cursor च्या
HTTP `AiService/AvailableModels` कॅटलॉगला प्राधान्य देते.
ते अयशस्वी झाल्यास, OmniRoute तरीही होस्टवरील `cursor-agent` वापरण्याचा प्रयत्न करते (तो उपलब्ध असल्यास), त्यानंतर
स्थिर registry seed वापरते.

OmniRoute कॅटलॉगमध्ये **`auto`** (प्रदर्शित नाव “Auto”), तसेच
OpenCodex-शैलीतील राउटर मोड **`auto-cost`**, **`auto-balance`**, आणि
**`auto-intelligence`** नेहमी उपलब्ध करून देते. वायरवर हे Cursor च्या `default` मॉडेलशी
(तीन प्रकारांसाठी `optimization` ModelParameter सह) मॅप होतात. प्रीमियम मॉडेल्सचा वापर संपला असल्यास
`cu/auto` ला प्राधान्य द्या — Auto मध्ये अनेकदा अजूनही बजेट उपलब्ध असते.

### समक्रमण झाल्यावर लाइव्ह कॅटलॉग विशेषतः वापरला जातो

Cursor मॉडेलचे यशस्वी समक्रमण झाल्यानंतर (`cursor-agent --list-models` → कायमस्वरूपी जतन केलेला
समक्रमित कॅटलॉग, किंवा वर नमूद केलेले bearer-authenticated `AvailableModels` fetch), पुढील ठिकाणी
**डॅशबोर्ड**, **`/v1/models`**, आणि **सर्वांची चाचणी करा** हे सूचीबद्ध केले जातात:

1. लाइव्ह समक्रमणाने परत केलेली मॉडेल्स
2. समाविष्ट केलेले auto-router ids: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. ऑपरेटरची **सानुकूल** मॉडेल्स (आयात / मॅन्युअल) — समक्रमणाद्वारे कधीही काढून टाकली जात नाहीत

`open-sse/config/providers/registry/cursor/` अंतर्गत असलेली मोठी स्थिर registry
**केवळ ऑफलाइन fallback** आहे. समक्रमित सूची रिकामी असेल (किंवा शोध अयशस्वी झाला), तर सूचीकरणासाठी ती registry वापरली जाते.

Effort-suffixed ids (उदाहरणार्थ `claude-4.6-sonnet-high`) अजूनही रनटाइममध्ये
**विनंतीद्वारे मागवता** येतात: `resolveRequestedModel` प्रत्यय काढून त्याचे वायर
`ModelParameter` मध्ये रूपांतर करते. विशेष सूचीकरण हे स्थिर प्रकार सर्वांची चाचणी करा मधून हेतुपुरस्सर लपवते,
जेणेकरून तपासण्या Cursor ने प्रत्यक्षात उपलब्ध म्हणून परत केलेल्या मॉडेल्सशी जुळतील.

### सहाय्यक

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — डॅशबोर्ड विलीनीकरण
- `ensureCursorAutoCatalogEntry` — शोध + सूचीकरणादरम्यान auto* समावेश
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` स्थिर लूप

## प्रदाता मर्यादा (कोटा)

Cursor साठी **वापर → प्रदाता मर्यादा** हे PKCE किंवा token
आयातीनंतर `api2.cursor.sh` वरील Bearer APIs
(`GetCurrentPeriodUsage` → वापर सारांश → auth/usage) वापरते. जुन्या IDE-आयात केलेल्या सत्रांसाठी जुना cookie/`cursor.com`
डॅशबोर्ड मार्ग शेवटचा fallback म्हणून कायम आहे.

विंडोजमध्ये सामान्यतः **एकूण**, **Auto + Composer**, आणि **API** समाविष्ट असतात. मर्यादा
रिकाम्या दिसत असल्यास, **Cursor सह लॉग इन करा** पुन्हा चालवा किंवा टोकन्स पुन्हा आयात करा (फक्त IDE आयात
आता आवश्यक नाही).

## रिकामे turns / वापर संपलेला

Cursor Run स्वीकारते पण कोणताही assistant मजकूर परत करत नाही तेव्हा (प्रीमियम
वापर संपल्यावर हे सामान्य आहे), OmniRoute कृतीयोग्य **429** (कोट्याचे संकेत) किंवा
मार्गदर्शनासह **502** दाखवते — फक्त “प्रदात्याने रिकामी सामग्री परत केली” असे दाखवत नाही. `not_found: AI Model Not Found` (वापर कालावधी संपलेला) यासारख्या स्ट्रीमिंग
अपयशांचे वर्गीकरण **Cursor दर मर्यादा / वापर मर्यादा ओलांडली** असे केले जाते आणि SSE पाइपलाइनमध्ये तो संदेश
कायम ठेवला जातो (सामायिक empty-stream guard आधीच पाठवलेली त्रुटी अधिलिखित करत नाही).
प्रदाता मर्यादा तपासा, **`auto`** मॉडेल वापरून पाहा किंवा Cursor प्लॅनच्या मर्यादा वाढवा.

## क्लायंट आवृत्ती (headless)

स्थानिक `cursor-agent` इंस्टॉलेशन नसताना, OmniRoute
`x-cursor-client-version` प्रथम env `CURSOR_AGENT_CLI_VERSION` मधून, त्यानंतर Cursor installer script च्या disk-cached
scrape मधून आणि शेवटी pinned build id मधून निर्धारित करते. आवश्यक असल्यास
`CURSOR_AGENT_CLI_VERSION` वापरून ते override करा.

## Fallback: मॅन्युअल टोकन आयात

ब्राउझर लॉगिन पूर्ण करता येत नसल्यास:

1. होस्टवर, Cursor च्या `state.vscdb` मधून टोकन्स काढा:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor auth modal मध्ये **टोकन आयात करा** उघडा.
3. **Access Token** आणि उपलब्ध असल्यास **Refresh Token** पेस्ट करा (स्वयंचलित
   नूतनीकरणासाठी आवश्यक). Machine ID ऐच्छिक आहे.

केवळ access-token असलेल्या आयाती अजूनही कार्य करतात, परंतु refresh token शिवाय त्यांची मुदत संपेल —
chat मध्ये प्रमाणीकरण त्रुटी दिसल्यास पुन्हा आयात करा.

## संबंधित

- Zed Docker मार्गदर्शन: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor लॉगिन संदर्भ (बाह्य):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
