# Cursor Provider in Docker Environments (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../providers/CURSOR-DOCKER.md) · 🇪🇹 [am](../../../am/docs/providers/CURSOR-DOCKER.md) · 🇸🇦 [ar](../../../ar/docs/providers/CURSOR-DOCKER.md) · 🇦🇿 [az](../../../az/docs/providers/CURSOR-DOCKER.md) · 🇧🇬 [bg](../../../bg/docs/providers/CURSOR-DOCKER.md) · 🇧🇩 [bn](../../../bn/docs/providers/CURSOR-DOCKER.md) · 🇨🇿 [cs](../../../cs/docs/providers/CURSOR-DOCKER.md) · 🇩🇰 [da](../../../da/docs/providers/CURSOR-DOCKER.md) · 🇩🇪 [de](../../../de/docs/providers/CURSOR-DOCKER.md) · 🇬🇷 [el](../../../el/docs/providers/CURSOR-DOCKER.md) · 🇪🇸 [es](../../../es/docs/providers/CURSOR-DOCKER.md) · 🇪🇪 [et](../../../et/docs/providers/CURSOR-DOCKER.md) · 🇮🇷 [fa](../../../fa/docs/providers/CURSOR-DOCKER.md) · 🇫🇮 [fi](../../../fi/docs/providers/CURSOR-DOCKER.md) · 🇫🇷 [fr](../../../fr/docs/providers/CURSOR-DOCKER.md) · 🇮🇪 [ga](../../../ga/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [gu](../../../gu/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ha](../../../ha/docs/providers/CURSOR-DOCKER.md) · 🇮🇱 [he](../../../he/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [hi](../../../hi/docs/providers/CURSOR-DOCKER.md) · 🇭🇷 [hr](../../../hr/docs/providers/CURSOR-DOCKER.md) · 🇭🇺 [hu](../../../hu/docs/providers/CURSOR-DOCKER.md) · 🇦🇲 [hy](../../../hy/docs/providers/CURSOR-DOCKER.md) · 🇮🇩 [id](../../../id/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [ig](../../../ig/docs/providers/CURSOR-DOCKER.md) · 🇮🇹 [it](../../../it/docs/providers/CURSOR-DOCKER.md) · 🇯🇵 [ja](../../../ja/docs/providers/CURSOR-DOCKER.md) · 🇬🇪 [ka](../../../ka/docs/providers/CURSOR-DOCKER.md) · 🇰🇭 [km](../../../km/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [kn](../../../kn/docs/providers/CURSOR-DOCKER.md) · 🇰🇷 [ko](../../../ko/docs/providers/CURSOR-DOCKER.md) · 🇱🇹 [lt](../../../lt/docs/providers/CURSOR-DOCKER.md) · 🇱🇻 [lv](../../../lv/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ml](../../../ml/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [mr](../../../mr/docs/providers/CURSOR-DOCKER.md) · 🇲🇾 [ms](../../../ms/docs/providers/CURSOR-DOCKER.md) · 🇲🇹 [mt](../../../mt/docs/providers/CURSOR-DOCKER.md) · 🇲🇲 [my](../../../my/docs/providers/CURSOR-DOCKER.md) · 🇳🇱 [nl](../../../nl/docs/providers/CURSOR-DOCKER.md) · 🇳🇴 [no](../../../no/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [or](../../../or/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [pa](../../../pa/docs/providers/CURSOR-DOCKER.md) · 🇵🇭 [phi](../../../phi/docs/providers/CURSOR-DOCKER.md) · 🇵🇱 [pl](../../../pl/docs/providers/CURSOR-DOCKER.md) · 🇵🇹 [pt](../../../pt/docs/providers/CURSOR-DOCKER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/providers/CURSOR-DOCKER.md) · 🇷🇴 [ro](../../../ro/docs/providers/CURSOR-DOCKER.md) · 🇷🇺 [ru](../../../ru/docs/providers/CURSOR-DOCKER.md) · 🇱🇰 [si](../../../si/docs/providers/CURSOR-DOCKER.md) · 🇸🇰 [sk](../../../sk/docs/providers/CURSOR-DOCKER.md) · 🇸🇮 [sl](../../../sl/docs/providers/CURSOR-DOCKER.md) · 🇷🇸 [sr](../../../sr/docs/providers/CURSOR-DOCKER.md) · 🇸🇪 [sv](../../../sv/docs/providers/CURSOR-DOCKER.md) · 🇰🇪 [sw](../../../sw/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [ta](../../../ta/docs/providers/CURSOR-DOCKER.md) · 🇮🇳 [te](../../../te/docs/providers/CURSOR-DOCKER.md) · 🇹🇭 [th](../../../th/docs/providers/CURSOR-DOCKER.md) · 🇹🇷 [tr](../../../tr/docs/providers/CURSOR-DOCKER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/providers/CURSOR-DOCKER.md) · 🇵🇰 [ur](../../../ur/docs/providers/CURSOR-DOCKER.md) · 🇺🇿 [uz](../../../uz/docs/providers/CURSOR-DOCKER.md) · 🇻🇳 [vi](../../../vi/docs/providers/CURSOR-DOCKER.md) · 🇳🇬 [yo](../../../yo/docs/providers/CURSOR-DOCKER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/providers/CURSOR-DOCKER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/providers/CURSOR-DOCKER.md)

---

जब OmniRoute Docker भित्र चल्छ, कन्टेनरले होस्टको Cursor
इन्स्टल देख्न नसक्ने भएकाले पुराना **Cursor IDE बाट आयात गर्नुहोस्** /
`cursor-agent` प्रवाहहरू असफल हुन्छन्। यसको सट्टा **Cursor मार्फत लगइन गर्नुहोस्** (deep-control PKCE) प्रयोग गर्नुहोस्।

## Docker मा IDE / CLI आयात किन असफल हुन्छ

1. **फाइलसिस्टम अलगाव** — स्वतः-आयातले कन्टेनर _भित्र_
   `~/.config/Cursor/User/globalStorage/state.vscdb` जस्ता Linux पथहरू खोज्छ।
   macOS का लागि Docker Desktop मा होस्ट IDE DB पूर्वनिर्धारित रूपमा माउन्ट गरिएको हुँदैन, र
   होस्ट Darwin भए पनि कन्टेनर OS Linux हुन्छ।
2. **`cursor-agent` बाइनरी छैन** — आधिकारिक OmniRoute इमेजहरूमा
   `cursor-agent` समावेश हुँदैन। उपलब्ध मोडेलहरूले पहिले
   `cursor-agent --list-models` शेलमार्फत चलाउँथे र असफल हुँदा स्थिर क्याटलग प्रयोग गर्थे।
3. **गलत बाइनरी** — macOS को `cursor-agent` लाई Linux
   कन्टेनरमा bind-mount **नगर्नुहोस्**। यो कार्यान्वयन हुनेछैन।

## सिफारिस गरिएको: Cursor मार्फत लगइन गर्नुहोस्

1. **ड्यासबोर्ड → प्रदायकहरू → Cursor** खोल्नुहोस्।
2. **Cursor मार्फत लगइन गर्नुहोस्** ट्याब छान्नुहोस्।
3. **Cursor मार्फत लगइन गर्नुहोस्** क्लिक गर्नुहोस् — OmniRoute ले तपाईंको **होस्ट** ब्राउजरमा
   `https://cursor.com/loginDeepControl?…` खोल्छ।
4. ब्राउजरमा लगइन अनुमोदन गर्नुहोस्, त्यसपछि ड्यासबोर्डमा फर्कनुहोस्। टोकनहरू नआएसम्म OmniRoute ले
   `api2.cursor.sh/auth/poll` पोल गर्छ।
5. OmniRoute ले **access + refresh** टोकनहरू भण्डारण गर्छ र तिनलाई
   `https://api2.cursor.sh/auth/exchange_user_api_key` मार्फत रिफ्रेस गर्छ।

यो पथका लागि कन्टेनरभित्र Cursor IDE वा `cursor-agent` आवश्यक पर्दैन।

## मोडेल पत्ता लगाउने प्रक्रिया

लगइन गरिएको जडान हुँदा, **उपलब्ध मोडेलहरू / स्वतः-सिङ्क** ले जडानको bearer टोकन प्रयोग गरेर Cursor को
HTTP `AiService/AvailableModels` क्याटलगलाई प्राथमिकता दिन्छ।
त्यो असफल भएमा OmniRoute ले अझै पनि होस्टको `cursor-agent` (उपस्थित हुँदा), अनि
स्थिर रजिस्ट्री seed प्रयास गर्छ।

OmniRoute ले क्याटलगमा सधैँ **`auto`** (प्रदर्शन नाम “Auto”), साथै
OpenCodex-शैलीका राउटर मोडहरू **`auto-cost`**, **`auto-balance`**, र
**`auto-intelligence`** उपलब्ध गराउँछ। तारमार्फत पठाउँदा यी Cursor को `default` मोडेलमा
(तीनवटा भेरियन्टका लागि `optimization` ModelParameter सहित) म्याप हुन्छन्। प्रिमियम मोडेलहरूको प्रयोग सीमा सकिँदा
`cu/auto` लाई प्राथमिकता दिनुहोस् — Auto मा प्रायः अझै बजेट बाँकी हुन सक्छ।

### सिङ्क हुँदा लाइभ क्याटलग मात्र प्रयोग हुन्छ

Cursor मोडेल सफलतापूर्वक सिङ्क भएपछि (`cursor-agent --list-models` → सुरक्षित गरिएको
सिङ्क क्याटलग, वा माथिको bearer-प्रमाणीकरण गरिएको `AvailableModels` प्राप्ति), निम्नमा
**ड्यासबोर्ड**, **`/v1/models`**, र **सबै परीक्षण गर्नुहोस्** सूचीले देखाउँछन्:

1. लाइभ सिङ्कले फर्काएका मोडेलहरू
2. थपिएका स्वतः-राउटर ids: `auto`, `auto-cost`, `auto-balance`, `auto-intelligence`
3. अपरेटरका **कस्टम** मोडेलहरू (आयात / म्यानुअल) — सिङ्कले कहिल्यै हटाउँदैन

`open-sse/config/providers/registry/cursor/` अन्तर्गतको ठूलो स्थिर रजिस्ट्री
**अफलाइन fallback का लागि मात्र** हो। सिङ्क गरिएको सूची खाली हुँदा (वा पत्ता लगाउने प्रक्रिया असफल हुँदा),
सूचीकरणले उक्त रजिस्ट्री प्रयोग गर्छ।

Effort-सफिक्स भएका ids (उदाहरणका लागि `claude-4.6-sonnet-high`) अझै पनि रनटाइममा
**अनुरोध** गर्न सकिन्छ: `resolveRequestedModel` ले सफिक्स हटाएर तारमार्फत पठाइने
`ModelParameter` मा राख्छ। विशिष्ट सूचीकरणले ती स्थिर भेरियन्टहरूलाई जानाजानी
सबै परीक्षण गर्नुहोस्बाट लुकाउँछ, ताकि जाँचहरू Cursor ले वास्तवमै उपलब्ध भनेर फर्काउने मोडेलहरूसँग मेल खाऊन्।

### सहायकहरू

- `providerUsesExclusiveSyncedListing("cursor"|"cu")` —
  `src/lib/providers/modelListingCapability.ts`
- `mergeProviderModelListing` — ड्यासबोर्ड मर्ज
- `ensureCursorAutoCatalogEntry` — पत्ता लगाउने प्रक्रिया + सूचीकरणमा auto* थप्ने
- `shouldSuppressStaticModelForExclusiveListing` — `/v1/models` स्थिर लूप

## प्रदायक सीमाहरू (कोटा)

Cursor का लागि **प्रयोग → प्रदायक सीमाहरू** ले PKCE वा टोकन
आयातपछि `api2.cursor.sh` मा Bearer APIs
(`GetCurrentPeriodUsage` → प्रयोग सारांश → auth/usage) प्रयोग गर्छ। पुरानो cookie/`cursor.com`
ड्यासबोर्ड पथ पुराना IDE बाट आयात गरिएका सेसनहरूका लागि अन्तिम fallback का रूपमा रहन्छ।

विन्डोहरूमा सामान्यतया **कुल**, **Auto + Composer**, र **API** समावेश हुन्छन्। सीमाहरू
खाली देखिएमा **Cursor मार्फत लगइन गर्नुहोस्** पुनः चलाउनुहोस् वा टोकनहरू पुनः आयात गर्नुहोस् (IDE आयात
मात्र अब आवश्यक छैन)।

## खाली turns / प्रयोग सीमा सकिएको

Cursor ले Run स्वीकारे पनि assistant पाठ नफर्काउँदा (प्रिमियम
प्रयोग सीमा सकिएको अवस्थामा यो सामान्य हुन्छ), OmniRoute ले कार्य गर्न मिल्ने **429** (कोटासम्बन्धी सङ्केतहरू) वा
मार्गदर्शनसहितको **502** देखाउँछ — केवल “प्रदायकले खाली सामग्री फर्कायो” होइन। `not_found: AI Model Not Found`
(प्रयोग अवधि सकिएको) जस्ता स्ट्रिमिङ विफलताहरूलाई **Cursor दर सीमा / प्रयोग सीमा नाघेको** का रूपमा
वर्गीकरण गरिन्छ र SSE पाइपलाइनभरि उक्त सन्देश कायम राखिन्छ (साझा empty-stream guard ले
पहिल्यै उत्सर्जित त्रुटिलाई अधिलेखन गर्दैन)। प्रदायक सीमाहरू जाँच्नुहोस्, **`auto`** मोडेल प्रयोग गर्नुहोस्, वा
Cursor योजनाका सीमाहरू बढाउनुहोस्।

## क्लाइन्ट संस्करण (headless)

स्थानीय `cursor-agent` इन्स्टल नभएमा OmniRoute ले
`x-cursor-client-version` लाई पहिले env `CURSOR_AGENT_CLI_VERSION`, त्यसपछि Cursor installer script को
डिस्कमा क्यास गरिएको scrape, अनि pinned build id मार्फत resolve गर्छ। आवश्यक पर्दा
`CURSOR_AGENT_CLI_VERSION` मार्फत override गर्नुहोस्।

## Fallback: म्यानुअल टोकन आयात

यदि तपाईंले ब्राउजर लगइन पूरा गर्न सक्नुहुन्न भने:

1. होस्टमा Cursor को `state.vscdb` बाट टोकनहरू निकाल्नुहोस्:

   ```bash
   sqlite3 "$HOME/Library/Application Support/Cursor/User/globalStorage/state.vscdb" \
     "SELECT key, value FROM ItemTable WHERE key IN ('cursorAuth/accessToken','cursorAuth/refreshToken','storage.serviceMachineId');"
   ```

2. Cursor प्रमाणीकरण modal मा **टोकन आयात गर्नुहोस्** खोल्नुहोस्।
3. **Access Token** र उपलब्ध हुँदा **Refresh Token** टाँस्नुहोस् (स्वचालित
   रिफ्रेसका लागि आवश्यक)। Machine ID वैकल्पिक हो।

Access-token-मात्र भएका आयातहरू अझै काम गर्छन्, तर refresh token बिना तिनको म्याद सकिन्छ —
च्याटले प्रमाणीकरण त्रुटिहरू फर्काउँदा पुनः आयात गर्नुहोस्।

## सम्बन्धित

- Zed Docker मार्गदर्शन: [`docs/providers/ZED-DOCKER.md`](./ZED-DOCKER.md)
- OpenCodex Cursor लगइन सन्दर्भ (बाह्य):
  https://github.com/lidge-jun/opencodex/blob/main/src/oauth/cursor.ts
