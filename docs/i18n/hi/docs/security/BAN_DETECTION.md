# Account-Ban / Banned-Keyword Detection (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇧🇦 [bs](../../../bs/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇮🇳 [mr](../../../mr/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute अपस्ट्रीम त्रुटि प्रतिक्रियाओं को ऐसे संकेतों के लिए स्कैन करता है जो बताते हैं कि किसी प्रदाता का
**खाता स्थायी रूप से निष्क्रिय है** (निलंबित / निष्क्रिय किया गया / ToS-प्रतिबंधित) और, मिलान
होने पर, उस कनेक्शन को **टर्मिनल `banned` स्थिति** में डाल देता है, ताकि उसे
अनुरोधों के लिए फिर से न चुना जाए। **Security → Banned Keywords**
सेटिंग कार्ड इसी को कॉन्फ़िगर करता है ("स्थायी खाता
प्रतिबंध पहचान को ट्रिगर करने वाले अतिरिक्त कीवर्ड। अंतर्निहित कीवर्ड हमेशा लागू होते हैं।")।

यह पृष्ठ अंतर्निहित सूची, पहचान प्रवाह, इसके दायरे, कस्टम कीवर्ड सुरक्षित रूप से जोड़ने के तरीके
और फ़्लैग किए गए कनेक्शन को पुनर्स्थापित करने के तरीके का दस्तावेज़ीकरण करता है। टर्मिनल
स्थिति स्वयं रेज़िलिएंस मॉडल का हिस्सा है — देखें
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("टर्मिनल स्थितियाँ")।

**प्रामाणिक स्रोत:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`)।

## अंतर्निहित कीवर्ड

किसी भी कस्टम सूची की परवाह किए बिना, ये 8 सबस्ट्रिंग हमेशा लागू होती हैं (केस-असंवेदी):

```
account_deactivated
account has been deactivated
account has been disabled
your account has been suspended
this account is deactivated
verify your account to continue                                 (Antigravity / Google Cloud Code)
this service has been disabled in this account for violation    (Antigravity)
this service has been disabled in this account                  (Antigravity)
```

> प्रदाताओं द्वारा अपने प्रतिबंध संबंधी शब्दों को बदलने के साथ यह सूची विकसित होती रहती है। प्रामाणिक
> प्रति `open-sse/services/accountFallback.ts` में `ACCOUNT_DEACTIVATED_SIGNALS` है;
> ऊपर दिए गए ब्लॉक को एक स्नैपशॉट मानें।

दो निकटवर्ती, **अलग-अलग** संकेत तालिकाएँ उसी फ़ाइल में मौजूद हैं और प्रतिबंधित-कीवर्ड
पहचान का हिस्सा _नहीं_ हैं:

- `CREDITS_EXHAUSTED_SIGNALS` — बिलिंग/कोटा समाप्त (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → टर्मिनल `credits_exhausted`।
- `OAUTH_INVALID_TOKEN_SIGNALS` — **गैर-टर्मिनल**; टोकन रीफ़्रेश से पुनर्प्राप्ति हो सकती है।

नोट: **`rate limit`** / `429` जैसे सामान्य अस्थायी वाक्यांशों को
दर-सीमा / कनेक्शन-कूलडाउन पथ द्वारा संभाला जाता है और वे प्रतिबंध संकेत **नहीं** हैं।

## पहचान प्रवाह

```
अपस्ट्रीम त्रुटि प्रतिक्रिया
  → बॉडी को स्ट्रिंग में बदलना + लोअरकेस करना
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [सबस्ट्रिंग मिलान]
  → मिलान?
      → कनेक्शन testStatus = "banned"      (स्थायी — 1-वर्षीय कूलडाउन, कभी स्वतः पुनर्प्राप्त नहीं होता)
      → यदि सेटिंग `autoDisableBannedAccounts` चालू है और `autoDisableBannedScope`
        इस कनेक्शन को शामिल करता है (`all`, या OAuth/cookie/session के लिए `subscription`)
        → साथ ही isActive = false। जब दायरा
        `subscription` होता है, तब प्रीपेड API कुंजियाँ सक्रिय रहती हैं।
      → खाता चयन के दौरान कनेक्शन छोड़ दिया जाता है (कॉम्बो QUOTA_BLOCKING स्थितियाँ)
```

- मिलान प्रतिक्रिया **बॉडी** पर एक **केस-असंवेदी सबस्ट्रिंग** खोज है
  (`isAccountDeactivated`, `accountFallback.ts`)।
- प्रतिबंध-संकेत वाली बॉडी मिलने पर स्थायी `banned` टर्मिनलाइज़ेशन **किसी भी
  HTTP स्थिति** पर सक्रिय होता है (`markAccountUnavailable` → `checkFallbackError` के माध्यम से)। अधिक
  संकीर्ण **`deactivated`** लेबल (जब कनेक्शन के पास कोई अतिरिक्त
  API कुंजी न हो, तब `isActive=false`) इनलाइन `chatCore.ts` पथ द्वारा **HTTP 401 / 403**
  पर लिखा जाता है (`classifyProviderError` → `ACCOUNT_DEACTIVATED` के माध्यम से वर्गीकृत)। ध्यान दें कि
  `markAccountUnavailable()` पथ उसी `ACCOUNT_DEACTIVATED` संकेत के लिए
  (`resolveTerminalConnectionStatus` के माध्यम से) एक _अलग_ टर्मिनल स्थिति —
  **`expired`** — लिखता है, इसलिए प्रतिक्रिया को किस पथ ने संभाला, इसके आधार पर वही प्रतिबंध
  `deactivated` या `expired` के रूप में दिखाई दे सकता है। (पुरानी कोड टिप्पणी कहती है
  "जब 401 बॉडी में ये स्ट्रिंग हों" — यह वर्तमान व्यवहार को कम करके बताती है।)
- जहाँ भी टर्मिनल स्थितियाँ फ़िल्टर की जाती हैं, वहाँ `banned` कनेक्शन को चयन से बाहर रखा जाता है
  (`isTerminalConnectionStatus`, कॉम्बो `QUOTA_BLOCKING_CONNECTION_STATUSES`)।

## दायरा — किन प्रदाताओं को स्कैन किया जाता है

**सभी प्रदाता।** यह जाँच सामान्य त्रुटि-प्रबंधन पाइपलाइन में चलती है, जिससे
प्रत्येक विफल अपस्ट्रीम अनुरोध गुजरता है — यह OAuth/सब्सक्रिप्शन स्क्रैपर्स तक
**सीमित नहीं** है। परिणामी टर्मिनल स्थिति प्रत्येक **कनेक्शन** के लिए होती है,
प्रत्येक प्रदाता के लिए नहीं।

हालाँकि, अंतर्निहित _स्ट्रिंग्स_ वास्तविक प्रतिबंध जोखिम वाले सब्सक्रिप्शन/OAuth
प्रदाताओं (ChatGPT Web Codex, Claude Web, Codex, Muse Spark,
Antigravity) पर केंद्रित हैं। API-कुंजी प्रदाता डिटेक्टर को केवल तभी ट्रिगर करेगा,
जब उसके त्रुटि बॉडी में कोई सबस्ट्रिंग अक्षरशः मौजूद हो।

`autoDisableBannedScope` (`all` | `subscription`, डिफ़ॉल्ट `all`) नियंत्रित करता है
कि कोई मिलान `isActive=false` भी सेट करता है या नहीं। `subscription` का अर्थ
लॉगिन-शैली की सीटें (भुगतान वाली सदस्यताएँ और निःशुल्क खाते, वेब-कुकी सत्रों
सहित) है। यह प्रीपेड API कुंजियों के लिए फिर भी `testStatus=banned` रिकॉर्ड करता
है, लेकिन उन्हें रूटिंग पूल में बनाए रखता है। टिकाऊ डिज़ाइन प्रत्येक प्रदाता और
प्रत्येक खाते के लिए ओवरराइड है; वैश्विक enum इसका पहला संस्करण है।

## कस्टम प्रतिबंधित कीवर्ड

**Security → Banned Keywords** में कीवर्ड जोड़ें या हटाएँ (`PATCH /api/settings`
के माध्यम से वैश्विक `customBannedSignals` सेटिंग के रूप में सहेजे जाते हैं)।
उन्हें अंतर्निहित सूची में **जोड़ा जाता है** — वे कभी उसका प्रतिस्थापन नहीं होते —
और सहेजने पर (तथा स्टार्टअप पर) `setCustomBannedSignals()` के माध्यम से हॉट-रीलोड
होते हैं। प्रत्येक कीवर्ड अधिकतम 200 वर्णों का हो सकता है; ऐरे की लंबाई की कोई
सीमा नहीं है।

**⚠ गलत-सकारात्मक परिणाम का जोखिम — विशिष्ट वाक्यांश चुनें।** पहचान पूरे रिस्पॉन्स
बॉडी पर कच्चे सबस्ट्रिंग मिलान द्वारा होती है, और कोई मिलान **स्थायी** होता है
(1-वर्ष का कूलडाउन, मैन्युअल रिकवरी)। कोई व्यापक कीवर्ड पूरी तरह स्वस्थ कनेक्शन
को प्रतिबंधित कर सकता है:

- **खराब:** `quota`, `limit`, `error`, `denied` — कई अस्थायी त्रुटियों में दिखाई देते हैं।
- **अच्छे:** पूर्ण प्रतिबंध वाक्य, जैसे `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`।

प्रदाता द्वारा वास्तविक प्रतिबंध पर लौटाए जाने वाले सबसे लंबे अस्पष्टता-रहित
वाक्यांश को प्राथमिकता दें। संदेह होने पर, पहले कनेक्शन का `lastError` देखें, फिर
ठीक वही शब्दावली जोड़ें।

## फ़्लैग किए गए कनेक्शन को पुनर्प्राप्त करना

टर्मिनल `banned` / `deactivated` स्थितियाँ **कभी भी स्वतः पुनर्प्राप्त नहीं होतीं**
(उन्हें सक्रिय रिकवरी टिक से बाहर रखा जाता है — केवल `unavailable` कूलडाउन अपने
आप पुनर्प्राप्त होते हैं)। ऑपरेटर को उन्हें स्पष्ट रूप से हटाना होगा:

1. **कनेक्शन का दोबारा परीक्षण करें** — डैशबोर्ड की **Test** कार्रवाई
   (`POST /api/providers/{id}/test`); सफल प्रोब `testStatus` को `active` पर रीसेट
   करता है और त्रुटि फ़ील्ड साफ़ करता है।
2. **दोबारा प्रमाणीकरण करें / क्रेडेंशियल संपादित करें** — OAuth प्रदाताओं के लिए,
   लॉगिन / रीफ़्रेश फ़्लो दोबारा चलाएँ; प्रदाता बनाने/आयात करने वाले रूट
   `isActive = true` सेट करते हैं।
3. **कनेक्शन को दोबारा सक्षम करें** — यदि स्वतः-अक्षम करने की प्रक्रिया ने
   `isActive = false` सेट किया था (स्कोप `all`, या OAuth/कुकी/सत्र कनेक्शन के लिए
   `subscription`), तो खाते को ठीक करने के बाद इसे दोबारा चालू करें।

कोई अलग "प्रतिबंध फ़्लैग साफ़ करें" बटन नहीं है — रिकवरी दोबारा परीक्षण,
दोबारा प्रमाणीकरण या दोबारा सक्षम करने के माध्यम से होती है, जो
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) में दिए गए सामान्य
टर्मिनल-स्थिति नियम से मेल खाती है।

## प्रोब पृथक्करण (मॉडल test-all)

**प्रोब-उत्पत्ति विफलता** (`runAsProbe` के अंदर निष्पादित मॉडल test-all /
स्वास्थ्य-जाँच डिस्पैच) कभी भी किसी कनेक्शन को पूल से नहीं हटाती (#9817): इसे
**दृश्यता के लिए रिकॉर्ड** किया जाता है (`last_error`, `last_error_type`,
`error_code`, `last_error_at`), लेकिन यह **प्रत्येक** रूटिंग म्यूटेशन को छोड़
देती है — कूलडाउन, टर्मिनल स्थिति (`banned` / `deactivated` /
`credits_exhausted`), प्रति-मॉडल लॉकआउट, प्रदाता सर्किट ब्रेकर, 5-मिनट का कोटा
कैश, OAuth टोकन रीफ़्रेश और स्वतः-अक्षम करना। केवल वास्तविक अनुरोध-पथ विफलता
निष्क्रिय करती है। रिकॉर्ड की गई त्रुटि फ़्लैग किए गए खाते को डैशबोर्ड में दृश्यमान
बनाती है, जबकि वह ट्रैफ़िक प्रदान करना जारी रखता है।

एकमात्र निर्णय बिंदु `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`) है, जिसका उपयोग **प्रत्येक** ऐसी जगह पर किया
जाता है जो प्रोब-उत्पत्ति विफलता से रूटिंग स्थिति को बदल सकती है:

- `markAccountUnavailable` (`auth.ts`) — केवल रिकॉर्ड (`lastError` का कच्चा टेक्स्ट,
  `lastErrorType`, `errorCode`, `lastErrorAt`; जानबूझकर **कोई**
  `backoffLevel` नहीं, क्योंकि वह चयन-समय स्वतः-क्षय को ट्रिगर करके रिकॉर्ड मिटा
  देगा)
- `maybeAutoDisableBannedAccount` — कोई स्वतः-अक्षमता नहीं
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (केवल रिकॉर्ड,
  कोई टर्मिनल `credits_exhausted` नहीं), GEO_BLOCKED (कोई 24h बहिष्करण नहीं),
  MODEL_NOT_FOUND (कोई `lockModel` नहीं), codex 429 खाता-रोटेशन फ़ेलओवर
  (कोई `markCodexScopeRateLimited` नहीं, कोई सहेजा गया `rate_limited_until` नहीं,
  कोई सत्र-अफिनिटी क्लियर नहीं), `persistCodexQuotaState` (कोई कोटा-स्थिति लेखन
  नहीं, कोई कैश अमान्यकरण नहीं), `recordKeyHealthStatus` (कुंजी-स्वास्थ्य रोटेटर
  अपरिवर्तित)
- OAuth रीफ़्रेश — एग्ज़ीक्यूटर बेस में सक्रिय रीफ़्रेश
  (`base.ts` `execute()`, किसी रीफ़्रेश-टोकन रोटेशन का उपयोग नहीं) और
  `chatCore` में प्रतिक्रियात्मक 401/403 पथ (कोई `expired` निष्क्रियता नहीं),
  दोनों
- `chat.ts` — प्रदाता सर्किट ब्रेकर और 5-मिनट का कोटा कैश
  (`markAccountExhaustedFrom429`) कभी भी निम्नीकृत नहीं होते

रिकॉर्ड की गई त्रुटि फ़्लैग किए गए खाते को डैशबोर्ड में दृश्यमान बनाती है, जबकि वह
ट्रैफ़िक प्रदान करना जारी रखता है। ध्यान दें: वास्तविक पथ के `slice(0,100)`
ट्रंकेशन के विपरीत, प्रोब रिकॉर्ड **कच्चा** (बिना काटा गया) त्रुटि टेक्स्ट संग्रहीत
करता है।

test-all को रखरखाव उपकरण के रूप में उपयोग करने वाले ऑपरेटर निम्न में से किसी एक
के माध्यम से ऐतिहासिक व्यवहार (प्रोब को वास्तविक जनरेशन माना जाना) पुनर्स्थापित
कर सकते हैं:

- `probeCanDisable` सेटिंग (`{"probeCanDisable": true}` के साथ
  `POST /api/settings`, या प्रत्यक्ष `key_value` DB संपादन), या
- फ़ीचर फ़्लैग **`PROBE_CAN_DISABLE=true`** (env या DB ओवरराइड; सेटिंग पर
  प्राथमिकता लेता है)।

फ़ेल-सेफ़: यदि फ़्लैग या सेटिंग्स लुकअप में त्रुटि आती है, तो पृथक्करण चालू रहता है।

## स्रोत फ़ाइलें

| विषय                                 | फ़ाइल                                                                                                         |
| ------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| सिग्नल तालिकाएँ + मिलान              | `open-sse/services/accountFallback.ts`                                                                        |
| टर्मिनलीकरण / स्थायित्व              | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| स्वतः-अक्षम करने का दायरा            | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| इनलाइन वर्गीकरण                      | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| टर्मिनल-स्थिति पुनर्प्राप्ति अपवर्जन | `src/lib/quota/connectionRecovery.ts`                                                                         |
| कस्टम-कीवर्ड रनटाइम लोड              | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| सेटिंग्स UI                          | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
