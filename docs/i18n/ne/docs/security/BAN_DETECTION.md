# Account-Ban / Banned-Keyword Detection (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute ले प्रदायकको **खाता स्थायी रूपमा निष्क्रिय भएको** (निलम्बित / निष्क्रिय पारिएको / ToS उल्लङ्घनका कारण प्रतिबन्धित) सङ्केत गर्ने संकेतहरूका लागि अपस्ट्रिम त्रुटि प्रतिक्रियाहरू स्क्यान गर्छ र, मेल खाएमा, उक्त जडानलाई **अन्तिम `banned` अवस्था** मा सार्छ, जसले गर्दा अनुरोधहरूका लागि त्यसलाई अब चयन गरिँदैन। **सुरक्षा → प्रतिबन्धित कुञ्जीशब्दहरू**
सेटिङ कार्डले यही कुरा कन्फिगर गर्छ ("स्थायी खाता प्रतिबन्ध पहिचान सक्रिय गर्ने अतिरिक्त कुञ्जीशब्दहरू। अन्तर्निर्मित कुञ्जीशब्दहरू सधैँ लागू हुन्छन्।")।

यस पृष्ठले अन्तर्निर्मित सूची, पहिचान प्रवाह, यसको दायरा, आफूअनुकूल कुञ्जीशब्दहरू सुरक्षित रूपमा कसरी थप्ने, र फ्ल्याग गरिएको जडान कसरी पुनर्स्थापना गर्ने भन्ने दस्तावेजीकरण गर्छ। अन्तिम अवस्था स्वयं लचिलोपन मोडेलको अंश हो — हेर्नुहोस्
[लचिलोपन मार्गदर्शिका](../architecture/RESILIENCE_GUIDE.md) ("अन्तिम अवस्थाहरू")।

**आधिकारिक स्रोत:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`),
साथै गैर-अन्तिम प्रमाणीकरण वर्ग
(`ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` / `isAccountVerificationRequired()`) र त्यसलाई प्रयोग गर्ने
403 शाखाका लागि `open-sse/services/errorClassifier.ts`।

## अन्तर्निर्मित कुञ्जीशब्दहरू

यी 7 उपस्ट्रिङहरू सधैं लागू हुन्छन् (अक्षरको ठुलो-सानो रूपप्रति असंवेदनशील), कुनै पनि अनुकूलित सूची भए पनि:

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> प्रदायकहरूले प्रतिबन्धसम्बन्धी शब्दावली परिवर्तन गर्दै जाँदा यो सूची पनि विकसित हुन्छ। आधिकारिक
> प्रतिलिपि `open-sse/services/accountFallback.ts` भित्रको `ACCOUNT_DEACTIVATED_SIGNALS` हो;
> माथिको ब्लकलाई एउटा स्न्यापसटको रूपमा लिनुहोस्।

### प्रतिबन्ध होइन: अपरेटरले समाधान गर्न सक्ने प्रमाणीकरण अनुरोधहरू

`verify your account to continue` **पहिले** माथिको सूचीमा थियो। यो प्रतिबन्धको
सङ्केत होइन र अहिले `ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` मा छ, जसले कनेक्सनलाई
टर्मिनल बनाउनुको सट्टा पुनःप्राप्त गर्न सकिने `PROJECT_ROUTE_ERROR` का रूपमा वर्गीकरण गर्छ।

Google Cloud Code / Antigravity ले यसलाई `403 VALIDATION_REQUIRED` का रूपमा फर्काउँछन्। यो
**क्षणिक हो र स्वस्थ, पूर्ण कोटा भएका खाताहरूमा पनि देखा पर्छ** — प्रत्यक्ष
डिप्लोयमेन्टमा मापन गरिएको (2026-09-25, `proxy_logs`): एउटा Antigravity कनेक्सनले
10 मिनेटभित्र यस्ता 33 वटा 403 फर्कायो र `active` नै रह्यो, जबकि सबै 17 विन्डोमा आफ्नो
कोटाको 100 % कायम राखेको अर्को समान कनेक्सनलाई त्यसमध्ये **एउटै** प्रतिक्रियाले स्थायी रूपमा
प्रतिबन्धित गर्यो। फरक यति मात्र थियो कि कुन प्रयास संयोगवश सर्भ भयो।

यो भिन्नता महत्त्वपूर्ण छ, किनकि टर्मिनल मिलान `permanent: true` हुन्छ (1-वर्षे कूलडाउन,
कहिल्यै स्वतः पुनःप्राप्त हुँदैन), जबकि अपरेटरले ब्राउजरमा प्रमाणीकरण अनुरोध समाधान गर्न सक्छ।
यो वाक्यांश प्रतिबन्ध सूचीमा राख्दा `classifyProviderError` भित्रको पुनःप्राप्त गर्न सकिने
cloud-code 403 शाखा पनि यस शब्दावलीका लागि पहुँचयोग्य हुँदैनथ्यो, किनकि
`accountDeactivated` पहिले मूल्याङ्कन हुन्छ — त्यसैले Gemini Code Assist का लागि
[#868](https://github.com/diegosouzapw/OmniRoute/pull/868) र
[#6452](https://github.com/diegosouzapw/OmniRoute/pull/6452) मा थपिएको project-route
पुनःप्राप्ति कहिल्यै चल्न सक्दैनथ्यो।

सँगसँगै रहेका निम्न तीन **छुट्टाछुट्टै** सङ्केत तालिकाहरू प्रतिबन्धित-कुञ्जीशब्द पहिचानका भाग _होइनन्_:

- `CREDITS_EXHAUSTED_SIGNALS` — बिलिङ/कोटा समाप्त (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → टर्मिनल `credits_exhausted`।
- `OAUTH_INVALID_TOKEN_SIGNALS` — **गैर-टर्मिनल**; टोकन रिफ्रेसले पुनःप्राप्त गर्न सक्छ।
- `ACCOUNT_VERIFICATION_REQUIRED_SIGNALS` — **गैर-टर्मिनल**; अपरेटरले अपस्ट्रिममा
  खाता पुनःप्रमाणित गर्नुपर्छ। यो `open-sse/services/errorClassifier.ts` मा छ
  (अन्य दुई `accountFallback.ts` मा छन्)। माथिको खण्ड हेर्नुहोस्।

नोट: **`rate limit`** / `429` जस्ता सामान्य क्षणिक वाक्यांशहरू
rate-limit / connection-cooldown पथद्वारा सम्हालिन्छन् र प्रतिबन्धका सङ्केत **होइनन्**।

## पत्ता लगाउने प्रवाह

```
upstream त्रुटि प्रतिक्रिया
  → body लाई string मा रूपान्तरण गरेर lowercase बनाइन्छ
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [substring मिलान]
  → मिल्यो?
      → connection testStatus = "banned"      (स्थायी — 1-वर्षे cooldown, स्वचालित रूपमा कहिल्यै पुनःस्थापित हुँदैन)
      → यदि `autoDisableBannedAccounts` सेटिङ on छ र `autoDisableBannedScope`
        ले यो जडान समावेश गर्छ (`all`, वा OAuth/cookie/session का लागि `subscription`)
        → isActive = false पनि हुन्छ। scope `subscription` हुँदा Prepaid API key हरू
        सक्रिय नै रहन्छन्।
      → खाता चयन गर्दा जडानलाई छाडिन्छ (combo QUOTA_BLOCKING अवस्थाहरू)
```

- मिलान प्रतिक्रिया **body** मा गरिने **ठूला-साना अक्षरप्रति असंवेदनशील substring** खोज हो
  (`isAccountDeactivated`, `accountFallback.ts`)।
- प्रतिबन्ध-सङ्केत भएको body मा **जुनसुकै HTTP status** हुँदा पनि स्थायी `banned` terminalization सक्रिय हुन्छ (`markAccountUnavailable` → `checkFallbackError` मार्फत)। अझ साँघुरो **`deactivated`** label (जडानसँग अतिरिक्त API key नभएको अवस्थामा `isActive=false`) inline `chatCore.ts` मार्गद्वारा **HTTP 401 / 403** मा लेखिन्छ (`classifyProviderError` → `ACCOUNT_DEACTIVATED` मार्फत वर्गीकृत)। ध्यान दिनुहोस्, `markAccountUnavailable()` मार्गले उही `ACCOUNT_DEACTIVATED` सङ्केतका लागि (`resolveTerminalConnectionStatus` मार्फत) एउटा _फरक_ अन्तिम status — **`expired`** — लेख्छ, त्यसैले प्रतिक्रिया कुन मार्गले व्यवस्थापन गर्यो भन्ने आधारमा एउटै प्रतिबन्ध `deactivated` वा `expired` मध्ये कुनै एकका रूपमा देखा पर्न सक्छ। (पुरानो code comment ले "जब 401 body मा यी string हरू हुन्छन्" भन्छ — यसले हालको व्यवहारलाई पूर्ण रूपमा वर्णन गर्दैन।)
- अन्तिम status हरू filter गरिने सबै ठाउँमा `banned` जडानलाई चयनबाट हटाइन्छ (`isTerminalConnectionStatus`, combo `QUOTA_BLOCKING_CONNECTION_STATUSES`)।

## दायरा — कुन-कुन प्रदायकहरू स्क्यान गरिन्छन्

**सबै प्रदायकहरू।** जाँच सामान्य त्रुटि-ह्यान्डलिङ पाइपलाइनमा चल्छ, जसबाट
प्रत्येक असफल अपस्ट्रिम अनुरोध प्रवाहित हुन्छ — यो OAuth/सदस्यता
स्क्रेपरहरूमा मात्र सीमित **छैन**। परिणामस्वरूप प्राप्त टर्मिनल अवस्था प्रत्येक
**जडान**का लागि हुन्छ, प्रदायकका लागि होइन।

यद्यपि, बिल्ट-इन _स्ट्रिङहरू_ वास्तविक प्रतिबन्ध जोखिम भएका सदस्यता/OAuth
प्रदायकहरू (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity) तर्फ उन्मुख छन्। API-key प्रदायकको त्रुटि बडीमा कुनै एउटा
सबस्ट्रिङ हुबहु समावेश भएमा मात्र डिटेक्टर ट्रिगर हुनेछ।

`autoDisableBannedScope` (`all` | `subscription`, पूर्वनिर्धारित `all`) ले
मिलान हुँदा `isActive=false` पनि सेट गर्ने कि नगर्ने नियन्त्रण गर्छ।
`subscription` भन्नाले लगइन-शैलीका सिटहरू (वेब-कुकी सत्रहरूसहित सशुल्क
सदस्यता र निःशुल्क खाताहरू) बुझिन्छ। यसले प्रिपेड API कुञ्जीहरूका लागि अझै
`testStatus=banned` रेकर्ड गर्छ, तर तिनलाई राउटिङ पुलमै राख्छ। दीर्घकालीन
डिजाइन भनेको प्रति-प्रदायक र प्रति-खाता ओभरराइड हो; ग्लोबल enum यसको
प्रारम्भिक संस्करण हो।

## अनुकूलित प्रतिबन्धित कुञ्जीशब्दहरू

**Security → Banned Keywords** मा कुञ्जीशब्दहरू थप्नुहोस् वा हटाउनुहोस्
(`PATCH /api/settings` मार्फत ग्लोबल `customBannedSignals` सेटिङका रूपमा
स्थायी रूपमा भण्डारण गरिन्छ)। ती बिल्ट-इन सूचीमा **थपिन्छन्** — त्यसलाई
कहिल्यै प्रतिस्थापन गर्दैनन् — र सेभ गर्दा (तथा स्टार्टअपमा)
`setCustomBannedSignals()` मार्फत हट-रिलोड हुन्छन्। प्रत्येक कुञ्जीशब्द
अधिकतम 200 क्यारेक्टरको हुन सक्छ; एरेको लम्बाइमा कुनै सीमा छैन।

**⚠ गलत-पोजिटिभ जोखिम — विशिष्ट वाक्यांशहरू छान्नुहोस्।** पत्ता लगाउने
प्रक्रियाले सम्पूर्ण प्रतिक्रिया बडीमा कच्चा सबस्ट्रिङ मिलान गर्छ, र मिलान
**स्थायी** हुन्छ (1-वर्षे कूलडाउन, म्यानुअल पुनर्स्थापना)। धेरै व्यापक
कुञ्जीशब्दले पूर्ण रूपमा स्वस्थ जडानलाई प्रतिबन्धित गर्न सक्छ:

- **खराब:** `quota`, `limit`, `error`, `denied` — धेरै अस्थायी त्रुटिहरूमा देखिन्छन्।
- **राम्रो:** पूर्ण प्रतिबन्ध वाक्यहरू, जस्तै `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`।

वास्तविक प्रतिबन्धमा प्रदायकले फर्काउने सबैभन्दा लामो र अस्पष्टता-रहित
वाक्यांशलाई प्राथमिकता दिनुहोस्। शंका भएमा पहिले जडानको `lastError`
हेर्नुहोस्, त्यसपछि ठ्याक्कै त्यही शब्दावली थप्नुहोस्।

## फ्ल्याग गरिएको जडान पुनर्स्थापना गर्ने

टर्मिनल `banned` / `deactivated` अवस्थाहरू **कहिल्यै स्वतः पुनर्स्थापित
हुँदैनन्** (तिनलाई सक्रिय पुनर्स्थापना टिकबाट हटाइएको हुन्छ — केवल
`unavailable` कूलडाउनहरू आफैँ पुनर्स्थापित हुन्छन्)। अपरेटरले तिनलाई
स्पष्ट रूपमा हटाउनुपर्छ:

1. **जडान पुनः परीक्षण गर्नुहोस्** — ड्यासबोर्डको **Test** कार्य
   (`POST /api/providers/{id}/test`); सफल प्रोबले `testStatus` लाई
   `active` मा रिसेट गर्छ र त्रुटि फिल्डहरू खाली गर्छ।
2. **पुनः प्रमाणीकरण गर्नुहोस् / क्रेडेन्सियलहरू सम्पादन गर्नुहोस्** — OAuth
   प्रदायकहरूका लागि लगइन / रिफ्रेस प्रवाह पुनः चलाउनुहोस्; प्रदायक
   सिर्जना/आयात रुटहरूले `isActive = true` सेट गर्छन्।
3. **जडान पुनः सक्षम गर्नुहोस्** — यदि स्वतः-असक्षमीकरणले
   `isActive = false` सेट गरेको छ (`all` दायरा, वा OAuth/कुकी/सत्र
   जडानका लागि `subscription`), खाता ठीक गरेपछि यसलाई फेरि अन गर्नुहोस्।

अलग "प्रतिबन्ध फ्ल्याग हटाउने" बटन छैन — पुनर्स्थापना भनेको पुनः परीक्षण,
पुनः प्रमाणीकरण वा पुनः सक्षमीकरण हो, जुन
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) मा रहेको सामान्य
टर्मिनल-अवस्था नियमसँग मेल खान्छ।

## प्रोब पृथकीकरण (मोडेल test-all)

`runAsProbe` भित्र कार्यान्वयन गरिएका मोडेल test-all / स्वास्थ्य-जाँच
डिस्प्याचहरूबाट आएको **प्रोब-मूल असफलता** ले जडानलाई पुलबाट कहिल्यै हटाउँदैन
(#9817): यसलाई **दृश्यताका लागि रेकर्ड गरिन्छ** (`last_error`,
`last_error_type`, `error_code`, `last_error_at`), तर यसले राउटिङका
**प्रत्येक** परिवर्तनलाई छोड्छ — कूलडाउनहरू, टर्मिनल स्थिति (`banned` /
`deactivated` / `credits_exhausted`), प्रति-मोडेल लकआउटहरू, प्रदायक
सर्किट ब्रेकर, 5-मिनेटको कोटा क्यास, OAuth टोकन रिफ्रेस र स्वतः-असक्षमीकरण।
केवल वास्तविक अनुरोध-पथको असफलताले निष्क्रिय पार्छ। रेकर्ड गरिएको त्रुटिले
फ्ल्याग गरिएको खातालाई ट्राफिक सेवा गरिरहेकै अवस्थामा ड्यासबोर्डमा देखिने
बनाउँछ।

एकल निर्णय बिन्दु `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`) हो, जसलाई प्रोब-मूल असफलताबाट राउटिङ
अवस्था परिवर्तन गर्न सक्ने **प्रत्येक** स्थानले परामर्श गर्छ:

- `markAccountUnavailable` (`auth.ts`) — रेकर्ड-मात्र (`lastError` कच्चा टेक्स्ट,
  `lastErrorType`, `errorCode`, `lastErrorAt`; जानाजान **कुनै**
  `backoffLevel` छैन, किनकि त्यसले छनोट-समयको स्वतः-क्षय ट्रिगर गरी
  रेकर्ड मेटाउने थियो)
- `maybeAutoDisableBannedAccount` — कुनै स्वतः-असक्षमीकरण हुँदैन
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (रेकर्ड-मात्र,
  कुनै टर्मिनल `credits_exhausted` छैन), GEO_BLOCKED (24h बहिष्करण छैन),
  MODEL_NOT_FOUND (कुनै `lockModel` छैन), codex 429 खाता-रोटेसन फेलओभर
  (कुनै `markCodexScopeRateLimited` छैन, स्थायी रूपमा भण्डारित
  `rate_limited_until` छैन, सत्र-अफिनिटी क्लियर हुँदैन),
  `persistCodexQuotaState` (कोटा-अवस्था लेखिँदैन, क्यास अमान्य गरिँदैन),
  `recordKeyHealthStatus` (कुञ्जी-स्वास्थ्य रोटेटरमा कुनै परिवर्तन हुँदैन)
- OAuth रिफ्रेस — एक्जिक्युटर बेसको सक्रिय रिफ्रेस
  (`base.ts` `execute()`, कुनै रिफ्रेस-टोकन रोटेसन खपत हुँदैन) र
  `chatCore` को प्रतिक्रियात्मक 401/403 पथ (कुनै `expired` निष्क्रियता हुँदैन)
- `chat.ts` — प्रदायक सर्किट ब्रेकर र 5-मिनेटको कोटा क्यास
  (`markAccountExhaustedFrom429`) कहिल्यै अवनत हुँदैनन्

रेकर्ड गरिएको त्रुटिले फ्ल्याग गरिएको खातालाई ट्राफिक सेवा गरिरहेकै अवस्थामा
ड्यासबोर्डमा देखिने बनाउँछ। नोट: वास्तविक पथको `slice(0,100)` काटछाँटभन्दा
भिन्न रूपमा, प्रोब रेकर्डले **कच्चा** (नकाटिएको) त्रुटि टेक्स्ट भण्डारण गर्छ।

test-all लाई मर्मतसम्भार उपकरणका रूपमा प्रयोग गर्ने अपरेटरहरूले निम्नमध्ये
कुनै एकमार्फत ऐतिहासिक व्यवहार (प्रोबलाई वास्तविक जेनेरेसनका रूपमा गणना
गरिने) पुनर्स्थापित गर्न सक्छन्:

- `probeCanDisable` सेटिङ (`{"probeCanDisable": true}` सहित
  `POST /api/settings`, वा प्रत्यक्ष `key_value` DB सम्पादन), वा
- फिचर फ्ल्याग **`PROBE_CAN_DISABLE=true`** (env वा DB ओभरराइड; सेटिङमाथि
  प्राथमिकता पाउँछ)।

फेल-सेफ: फ्ल्याग वा सेटिङ लुकअपले अपवाद फ्याँकेमा, पृथकीकरण ON नै रहन्छ।

## स्रोत फाइलहरू

| सरोकार                               | फाइल                                                                                                          |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| सिग्नल तालिकाहरू + मिलान             | `open-sse/services/accountFallback.ts`                                                                        |
| टर्मिनलाइजेसन / स्थायित्व            | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| स्वतः-अक्षम गर्ने दायरा              | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| इनलाइन वर्गीकरण                      | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| टर्मिनल-अवस्था पुनःप्राप्ति बहिष्करण | `src/lib/quota/connectionRecovery.ts`                                                                         |
| अनुकूलित-किवर्ड रनटाइम लोड           | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| सेटिङ्स UI                           | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
