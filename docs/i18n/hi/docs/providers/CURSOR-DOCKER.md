# Cursor Provider in Docker Environments (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇵 [ne](../../../ne/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

जब OmniRoute Docker के अंदर चलता है, तो पुराने **Cursor IDE से आयात करें** /
`cursor-agent` फ़्लो विफल हो जाते हैं, क्योंकि कंटेनर होस्ट पर मौजूद Cursor
इंस्टॉलेशन को नहीं देख सकता। इसके बजाय **Cursor से लॉगिन करें** (deep-control PKCE) का उपयोग करें।

## Docker में IDE / CLI आयात क्यों विफल होता है

1. **फ़ाइल-सिस्टम पृथक्करण** — स्वतः-आयात कंटेनर के _अंदर_
   `~/.config/Cursor/User/globalStorage/state.vscdb` जैसे Linux पथ खोजता है।
   macOS के लिए Docker Desktop पर होस्ट IDE DB डिफ़ॉल्ट रूप से माउंट नहीं होता,
   और होस्ट Darwin होने पर भी कंटेनर OS Linux होता है।
2. **`cursor-agent` बाइनरी नहीं है** — आधिकारिक OmniRoute इमेज में
   `cursor-agent` शामिल नहीं होता। उपलब्ध मॉडल पहले
   `cursor-agent --list-models` को शेल के माध्यम से चलाते थे और विफल होने पर स्थिर कैटलॉग का उपयोग करते थे।
3. **गलत बाइनरी** — macOS के `cursor-agent` को Linux कंटेनर में
   bind-mount **न करें**। यह निष्पादित नहीं होगा।

## अनुशंसित: Cursor से लॉगिन करें

1. **डैशबोर्ड → प्रदाता → Cursor** खोलें।
2. **Cursor से लॉगिन करें** टैब चुनें।
3. **Cursor से लॉगिन करें** पर क्लिक करें — OmniRoute आपके **होस्ट** ब्राउज़र में
   `https://cursor.com/loginDeepControl?…` खोलता है।
4. ब्राउज़र में लॉगिन स्वीकृत करें, फिर डैशबोर्ड पर लौटें। OmniRoute
   टोकन आने तक `api2.cursor.sh/auth/poll` को पोल करता है।
5. OmniRoute **एक्सेस + रिफ़्रेश** टोकन संग्रहीत करता है और
   `https://api2.cursor.sh/auth/exchange_user_api_key` के माध्यम से उन्हें रिफ़्रेश करता है।

इस प्रक्रिया के लिए कंटेनर के अंदर Cursor IDE या `cursor-agent` की आवश्यकता नहीं है।

## मॉडल खोज

लॉगिन किए गए कनेक्शन के साथ, **उपलब्ध मॉडल / स्वतः-सिंक** कनेक्शन के bearer token का उपयोग करके Cursor के
HTTP `AiService/AvailableModels` कैटलॉग को प्राथमिकता देता है।
यदि यह विफल होता है, तो OmniRoute फिर भी होस्ट के `cursor-agent` (जब उपलब्ध हो) को आज़माता है, और उसके बाद
स्थिर रजिस्ट्री सीड का उपयोग करता है।

OmniRoute कैटलॉग में हमेशा **`auto`** (प्रदर्शित नाम “Auto”), साथ ही
OpenCodex-शैली के राउटर मोड **`auto-cost`**, **`auto-balance`**, और
**`auto-intelligence`** उपलब्ध कराता है। वायर पर ये Cursor के `default` मॉडल से मैप होते हैं
(तीनों वैरिएंट के लिए एक `optimization` ModelParameter के साथ)। जब प्रीमियम मॉडलों का उपयोग समाप्त हो जाए, तो
`cu/auto` को प्राथमिकता दें — Auto में अक्सर अभी भी बजट उपलब्ध होता है।

### सिंक होने पर लाइव कैटलॉग विशिष्ट होता है

Cursor मॉडल का सफल सिंक होने के बाद (`cursor-agent --list-models` → सहेजा गया
सिंक किया हुआ कैटलॉग, या ऊपर दिया गया bearer-authenticated `AvailableModels` फ़ेच),
**डैशबोर्ड**, **`/v1/models`**, और **सभी का परीक्षण करें** निम्न को सूचीबद्ध करते हैं:

1. लाइव सिंक द्वारा लौटाए गए मॉडल
2. इंजेक्ट किए गए auto-router id: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. ऑपरेटर के **कस्टम** मॉडल (आयात / मैन्युअल) — सिंक द्वारा कभी हटाए नहीं जाते

`open-sse/config/providers/registry/cursor/` के अंतर्गत बड़ी स्थिर रजिस्ट्री
**केवल ऑफ़लाइन फ़ॉलबैक** है। जब सिंक किया हुआ कैटलॉग खाली हो (या खोज विफल हो), तो सूचीकरण उस रजिस्ट्री का उपयोग करता है।

Effort-सफ़िक्स वाले id (उदाहरण के लिए `claude-4.6-sonnet-high`) का रनटाइम पर अभी भी
**अनुरोध** किया जा सकता है: `resolveRequestedModel` सफ़िक्स को हटाकर उसे वायर
`ModelParameter` में बदल देता है। विशिष्ट सूचीकरण जानबूझकर उन स्थिर वैरिएंट को
सभी का परीक्षण करें से छिपाता है, ताकि प्रोब उन मॉडलों से मेल खाएँ जिन्हें Cursor वास्तव में उपलब्ध बताता है।

### सहायक

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — डैशबोर्ड मर्ज
- `ensureCursorAutoCatalogEntry` — खोज + सूचीकरण पर auto* इंजेक्ट करना
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` स्थिर लूप

## प्रदाता सीमाएँ (कोटा)

Cursor के लिए **उपयोग → प्रदाता सीमाएँ**, PKCE या टोकन आयात के बाद `api2.cursor.sh` पर
Bearer API (`GetCurrentPeriodUsage` → उपयोग सारांश → auth/usage) का उपयोग करता है।
पुराना cookie/`cursor.com` डैशबोर्ड पथ पुराने IDE-आयातित सत्रों के लिए अंतिम फ़ॉलबैक बना रहता है।

विंडो में आम तौर पर **कुल**, **Auto + Composer**, और **API** शामिल होते हैं। यदि
सीमाएँ खाली दिखाई दें, तो **Cursor से लॉगिन करें** को दोबारा चलाएँ या टोकन फिर से आयात करें (अब केवल IDE आयात
आवश्यक नहीं है)।

## खाली टर्न / उपयोग समाप्त

जब Cursor किसी Run को स्वीकार करता है, लेकिन कोई assistant टेक्स्ट नहीं लौटाता (प्रीमियम
उपयोग समाप्त होने पर ऐसा सामान्यतः होता है), तो OmniRoute मार्गदर्शन के साथ कार्रवाई योग्य **429** (कोटा संकेत) या
**502** दिखाता है — केवल “प्रदाता ने खाली सामग्री लौटाई” नहीं। `not_found: AI Model Not Found`
(उपयोग विंडो समाप्त) जैसी स्ट्रीमिंग विफलताओं को **Cursor दर सीमा / उपयोग पार हो गया** के रूप में
वर्गीकृत किया जाता है और SSE पाइपलाइन में वही संदेश बनाए रखा जाता है (साझा खाली-स्ट्रीम गार्ड
पहले से उत्सर्जित त्रुटि को ओवरराइट नहीं करता)। प्रदाता सीमाएँ जाँचें, मॉडल **`auto`** आज़माएँ, या
Cursor प्लान की सीमाएँ बढ़ाएँ।

## क्लाइंट संस्करण (हेडलेस)

स्थानीय `cursor-agent` इंस्टॉलेशन के बिना, OmniRoute
`x-cursor-client-version` को पहले env `CURSOR_AGENT_CLI_VERSION`, फिर Cursor इंस्टॉलर स्क्रिप्ट के
डिस्क-कैश्ड स्क्रेप, और अंत में पिन किए गए build id के माध्यम से निर्धारित करता है। आवश्यकता होने पर
`CURSOR_AGENT_CLI_VERSION` से ओवरराइड करें।

## फ़ॉलबैक: मैन्युअल टोकन आयात

यदि आप ब्राउज़र लॉगिन पूरा नहीं कर सकते:

1. होस्ट पर Cursor के `state.vscdb` से टोकन निकालें:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor प्रमाणीकरण मोडल में **टोकन आयात करें** खोलें।
3. **एक्सेस टोकन** और उपलब्ध होने पर **रिफ़्रेश टोकन** पेस्ट करें (स्वचालित
   रिफ़्रेश के लिए आवश्यक)। Machine ID वैकल्पिक है।

केवल एक्सेस-टोकन वाले आयात अभी भी काम करते हैं, लेकिन रिफ़्रेश टोकन के बिना उनकी समय-सीमा समाप्त हो जाएगी —
चैट में प्रमाणीकरण त्रुटियाँ आने पर फिर से आयात करें।

## संबंधित

- Zed Docker मार्गदर्शन: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor लॉगिन संदर्भ (बाहरी):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
