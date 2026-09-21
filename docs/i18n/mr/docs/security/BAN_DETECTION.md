# Account-Ban / Banned-Keyword Detection (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../security/BAN_DETECTION.md) · 🇪🇹 [am](../../../am/docs/security/BAN_DETECTION.md) · 🇸🇦 [ar](../../../ar/docs/security/BAN_DETECTION.md) · 🇦🇿 [az](../../../az/docs/security/BAN_DETECTION.md) · 🇧🇬 [bg](../../../bg/docs/security/BAN_DETECTION.md) · 🇧🇩 [bn](../../../bn/docs/security/BAN_DETECTION.md) · 🇨🇿 [cs](../../../cs/docs/security/BAN_DETECTION.md) · 🇩🇰 [da](../../../da/docs/security/BAN_DETECTION.md) · 🇩🇪 [de](../../../de/docs/security/BAN_DETECTION.md) · 🇬🇷 [el](../../../el/docs/security/BAN_DETECTION.md) · 🇪🇸 [es](../../../es/docs/security/BAN_DETECTION.md) · 🇪🇪 [et](../../../et/docs/security/BAN_DETECTION.md) · 🇮🇷 [fa](../../../fa/docs/security/BAN_DETECTION.md) · 🇫🇮 [fi](../../../fi/docs/security/BAN_DETECTION.md) · 🇫🇷 [fr](../../../fr/docs/security/BAN_DETECTION.md) · 🇮🇪 [ga](../../../ga/docs/security/BAN_DETECTION.md) · 🇮🇳 [gu](../../../gu/docs/security/BAN_DETECTION.md) · 🇳🇬 [ha](../../../ha/docs/security/BAN_DETECTION.md) · 🇮🇱 [he](../../../he/docs/security/BAN_DETECTION.md) · 🇮🇳 [hi](../../../hi/docs/security/BAN_DETECTION.md) · 🇭🇷 [hr](../../../hr/docs/security/BAN_DETECTION.md) · 🇭🇺 [hu](../../../hu/docs/security/BAN_DETECTION.md) · 🇦🇲 [hy](../../../hy/docs/security/BAN_DETECTION.md) · 🇮🇩 [id](../../../id/docs/security/BAN_DETECTION.md) · 🇳🇬 [ig](../../../ig/docs/security/BAN_DETECTION.md) · 🇮🇹 [it](../../../it/docs/security/BAN_DETECTION.md) · 🇯🇵 [ja](../../../ja/docs/security/BAN_DETECTION.md) · 🇬🇪 [ka](../../../ka/docs/security/BAN_DETECTION.md) · 🇰🇭 [km](../../../km/docs/security/BAN_DETECTION.md) · 🇮🇳 [kn](../../../kn/docs/security/BAN_DETECTION.md) · 🇰🇷 [ko](../../../ko/docs/security/BAN_DETECTION.md) · 🇱🇹 [lt](../../../lt/docs/security/BAN_DETECTION.md) · 🇱🇻 [lv](../../../lv/docs/security/BAN_DETECTION.md) · 🇮🇳 [ml](../../../ml/docs/security/BAN_DETECTION.md) · 🇲🇾 [ms](../../../ms/docs/security/BAN_DETECTION.md) · 🇲🇹 [mt](../../../mt/docs/security/BAN_DETECTION.md) · 🇲🇲 [my](../../../my/docs/security/BAN_DETECTION.md) · 🇳🇵 [ne](../../../ne/docs/security/BAN_DETECTION.md) · 🇳🇱 [nl](../../../nl/docs/security/BAN_DETECTION.md) · 🇳🇴 [no](../../../no/docs/security/BAN_DETECTION.md) · 🇮🇳 [or](../../../or/docs/security/BAN_DETECTION.md) · 🇮🇳 [pa](../../../pa/docs/security/BAN_DETECTION.md) · 🇵🇭 [phi](../../../phi/docs/security/BAN_DETECTION.md) · 🇵🇱 [pl](../../../pl/docs/security/BAN_DETECTION.md) · 🇵🇹 [pt](../../../pt/docs/security/BAN_DETECTION.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/security/BAN_DETECTION.md) · 🇷🇴 [ro](../../../ro/docs/security/BAN_DETECTION.md) · 🇷🇺 [ru](../../../ru/docs/security/BAN_DETECTION.md) · 🇱🇰 [si](../../../si/docs/security/BAN_DETECTION.md) · 🇸🇰 [sk](../../../sk/docs/security/BAN_DETECTION.md) · 🇸🇮 [sl](../../../sl/docs/security/BAN_DETECTION.md) · 🇷🇸 [sr](../../../sr/docs/security/BAN_DETECTION.md) · 🇸🇪 [sv](../../../sv/docs/security/BAN_DETECTION.md) · 🇰🇪 [sw](../../../sw/docs/security/BAN_DETECTION.md) · 🇮🇳 [ta](../../../ta/docs/security/BAN_DETECTION.md) · 🇮🇳 [te](../../../te/docs/security/BAN_DETECTION.md) · 🇹🇭 [th](../../../th/docs/security/BAN_DETECTION.md) · 🇹🇷 [tr](../../../tr/docs/security/BAN_DETECTION.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/security/BAN_DETECTION.md) · 🇵🇰 [ur](../../../ur/docs/security/BAN_DETECTION.md) · 🇺🇿 [uz](../../../uz/docs/security/BAN_DETECTION.md) · 🇻🇳 [vi](../../../vi/docs/security/BAN_DETECTION.md) · 🇳🇬 [yo](../../../yo/docs/security/BAN_DETECTION.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/security/BAN_DETECTION.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/security/BAN_DETECTION.md)

---

OmniRoute अपस्ट्रीम त्रुटी प्रतिसादांमध्ये प्रदात्याचे
**खाते कायमस्वरूपी निष्क्रिय झाले आहे** (निलंबित / निष्क्रिय केलेले / ToS-प्रतिबंधित) हे दर्शवणारे संकेत शोधते आणि जुळणी
झाल्यास, त्या कनेक्शनला **टर्मिनल `banned` स्थितीत** हलवते, जेणेकरून ते यापुढे
विनंत्यांसाठी निवडले जाणार नाही. **Security → Banned Keywords**
सेटिंग्ज कार्ड हेच कॉन्फिगर करते ("कायमस्वरूपी खाते
प्रतिबंध शोध ट्रिगर करणारे अतिरिक्त कीवर्ड. अंगभूत कीवर्ड नेहमी लागू होतात.").

हे पृष्ठ अंगभूत सूची, शोध प्रवाह, त्याची व्याप्ती, कस्टम कीवर्ड सुरक्षितपणे कसे जोडावेत
आणि फ्लॅग केलेले कनेक्शन कसे पुनर्संचयित करावे याचे दस्तऐवजीकरण करते. टर्मिनल
स्थिती स्वतः लवचिकता मॉडेलचा भाग आहे — पाहा
[RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) ("टर्मिनल स्थिती").

**अधिकृत स्रोत:** `open-sse/services/accountFallback.ts`
(`ACCOUNT_DEACTIVATED_SIGNALS`, `getMergedBannedSignals()`, `isAccountDeactivated()`).

## अंगभूत कीवर्ड

कोणतीही कस्टम सूची असली तरीही, हे 8 सबस्ट्रिंग नेहमी लागू होतात (केस-असंवेदनशील):

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

> प्रदाते त्यांच्या प्रतिबंधाच्या शब्दरचनेत बदल करतात त्यानुसार ही सूची विकसित होत राहते. अधिकृत
> प्रत `open-sse/services/accountFallback.ts` मधील `ACCOUNT_DEACTIVATED_SIGNALS` आहे;
> वरील ब्लॉकला एका क्षणचित्राप्रमाणे समजा.

दोन लगतचे, **स्वतंत्र** सिग्नल तक्ते त्याच फाइलमध्ये आहेत आणि ते प्रतिबंधित-कीवर्ड
शोधाचा भाग _नाहीत_:

- `CREDITS_EXHAUSTED_SIGNALS` — बिलिंग/कोटा संपलेला (`insufficient_quota`,
  `credit_balance_too_low`, `payment required`, …) → टर्मिनल `credits_exhausted`.
- `OAUTH_INVALID_TOKEN_SIGNALS` — **नॉन-टर्मिनल**; टोकन रिफ्रेश केल्याने पुनर्प्राप्ती होऊ शकते.

टीप: **`rate limit`** / `429` सारखी सामान्य तात्पुरती वाक्ये
रेट-लिमिट / कनेक्शन-कूलडाउन मार्गाद्वारे हाताळली जातात आणि ती प्रतिबंध संकेत **नाहीत**.

## शोध प्रवाह

```
अपस्ट्रीम त्रुटी प्रतिसाद
  → बॉडीचे स्ट्रिंगमध्ये रूपांतर + लोअरकेस
  → isAccountDeactivated(body): getMergedBannedSignals().some(sig => body.includes(sig))   [सबस्ट्रिंग जुळणी]
  → जुळणी?
      → कनेक्शन testStatus = "banned"      (कायमस्वरूपी — 1-वर्षाचा कूलडाउन, कधीही स्वयंचलितपणे पुनर्प्राप्त होत नाही)
      → सेटिंग `autoDisableBannedAccounts` सुरू असल्यास आणि `autoDisableBannedScope` मध्ये
        हे कनेक्शन समाविष्ट असल्यास (`all`, किंवा OAuth/cookie/session साठी `subscription`)
        → तसेच isActive = false. स्कोप `subscription`
        असताना प्रीपेड API की सक्रिय राहतात.
      → खाते निवडीदरम्यान कनेक्शन वगळले जाते (कॉम्बो QUOTA_BLOCKING स्थिती)
```

- प्रतिसादाच्या **बॉडीवर** ही **केस-असंवेदनशील सबस्ट्रिंग** जुळणी आहे
  (`isAccountDeactivated`, `accountFallback.ts`).
- प्रतिबंध-सिग्नल बॉडी आढळल्यास कायमस्वरूपी `banned` टर्मिनलायझेशन **कोणत्याही
  HTTP स्थितीवर** सक्रिय होते (`markAccountUnavailable` → `checkFallbackError` द्वारे). अधिक
  संकुचित **`deactivated`** लेबल (कनेक्शनकडे अतिरिक्त API की नसताना `isActive=false`)
  इनलाइन `chatCore.ts` मार्गाद्वारे **HTTP 401 / 403** वर लिहिले जाते
  (`classifyProviderError` → `ACCOUNT_DEACTIVATED` द्वारे वर्गीकृत). लक्षात घ्या की
  `markAccountUnavailable()` मार्ग त्याच `ACCOUNT_DEACTIVATED` सिग्नलसाठी
  (`resolveTerminalConnectionStatus` द्वारे) एक _वेगळी_ टर्मिनल स्थिती —
  **`expired`** — लिहितो, त्यामुळे प्रतिसाद कोणत्या मार्गाने हाताळला यावर अवलंबून
  तोच प्रतिबंध `deactivated` किंवा `expired` यापैकी कोणत्याही स्वरूपात दिसू शकतो. (जुनी
  कोड टिप्पणी म्हणते, "जेव्हा 401 बॉडीमध्ये या स्ट्रिंग्स असतात" — हे सध्याचे
  वर्तन अपूर्णपणे वर्णन करते.)
- टर्मिनल स्थिती फिल्टर केल्या जाणाऱ्या सर्व ठिकाणी `banned` कनेक्शन निवडीमधून वगळले जाते
  (`isTerminalConnectionStatus`, कॉम्बो `QUOTA_BLOCKING_CONNECTION_STATUSES`).

## व्याप्ती — कोणते प्रदाते स्कॅन केले जातात

**सर्व प्रदाते.** ही तपासणी सर्व अयशस्वी अपस्ट्रीम विनंत्या ज्या सामान्य त्रुटी-हाताळणी पाइपलाइनमधून जातात, तिथे चालते — ती OAuth/सदस्यता स्क्रेपर्सपुरती **मर्यादित नाही**. परिणामी टर्मिनल स्थिती प्रत्येक **कनेक्शनसाठी** असते, प्रत्येक प्रदात्यासाठी नाही.

तरीही, अंगभूत _स्ट्रिंग्स_ प्रत्यक्ष बंदीचा धोका असलेल्या सदस्यता/OAuth प्रदात्यांना लक्षात घेऊन तयार केल्या आहेत (ChatGPT Web Codex, Claude Web, Codex, Muse Spark, Antigravity). एखाद्या API-की प्रदात्याच्या त्रुटी-बॉडीमध्ये यापैकी एखादी सबस्ट्रिंग अक्षरशः असेल, तरच डिटेक्टर सक्रिय होईल.

`autoDisableBannedScope` (`all` | `subscription`, डीफॉल्ट `all`) जुळणी झाल्यास `isActive=false` देखील सेट करायचे की नाही हे नियंत्रित करते. `subscription` म्हणजे लॉगिन-शैलीतील जागा (सशुल्क सदस्यता आणि विनामूल्य खाती, वेब-कुकी सत्रांसह). प्रीपेड API कींसाठी ते तरीही `testStatus=banned` नोंदवते, पण त्यांना राउटिंग पूलमध्ये ठेवते. टिकाऊ रचना म्हणजे प्रत्येक प्रदाता आणि प्रत्येक खात्यासाठी ओव्हरराइड; ग्लोबल enum ही त्याची पहिली आवृत्ती आहे.

## सानुकूल बंदी कीवर्ड

**Security → Banned Keywords** मध्ये कीवर्ड जोडा किंवा काढा (`PATCH /api/settings` द्वारे ग्लोबल `customBannedSignals` सेटिंग म्हणून कायमस्वरूपी साठवले जातात). ते अंगभूत सूचीमध्ये **जोडले जातात** — तिची जागा कधीही घेत नाहीत — आणि सेव्ह केल्यावर (तसेच स्टार्टअपवेळी) `setCustomBannedSignals()` द्वारे हॉट-रीलोड होतात. प्रत्येक कीवर्डची कमाल मर्यादा 200 वर्ण आहे; अॅरेच्या लांबीवर कोणतीही मर्यादा नाही.

**⚠ चुकीची सकारात्मक जुळणी होण्याचा धोका — विशिष्ट वाक्यांश निवडा.** संपूर्ण प्रतिसाद-बॉडीवर कच्ची सबस्ट्रिंग जुळणी केली जाते आणि जुळणी **कायमस्वरूपी** असते (1 वर्षाचा कूलडाउन, मॅन्युअल पुनर्प्राप्ती). अतिव्यापक कीवर्डमुळे पूर्णपणे निरोगी कनेक्शनवर बंदी लागू होऊ शकते:

- **वाईट:** `quota`, `limit`, `error`, `denied` — अनेक तात्पुरत्या त्रुटींमध्ये दिसतात.
- **चांगले:** बंदीची पूर्ण वाक्ये, उदा. `your account has been suspended for`,
  `account permanently banned`, `violation of our terms`.

प्रत्यक्ष बंदीच्या वेळी प्रदाता परत करतो असा सर्वात लांब, निःसंदिग्ध वाक्यांश प्राधान्याने वापरा. शंका असल्यास, आधी कनेक्शनचे `lastError` पाहा आणि नंतर त्यातील अचूक शब्दरचना जोडा.

## फ्लॅग केलेले कनेक्शन पुनर्प्राप्त करणे

टर्मिनल `banned` / `deactivated` स्थिती **कधीही आपोआप पुनर्प्राप्त होत नाहीत** (त्या सक्रिय पुनर्प्राप्ती टिकमधून वगळल्या जातात — केवळ `unavailable` कूलडाउन स्वतःहून पुनर्प्राप्त होतात). ऑपरेटरने त्या स्पष्टपणे साफ करणे आवश्यक आहे:

1. **कनेक्शनची पुन्हा चाचणी करा** — डॅशबोर्डमधील **Test** कृती
   (`POST /api/providers/{id}/test`); यशस्वी प्रोब `testStatus` पुन्हा
   `active` वर सेट करतो आणि त्रुटी फील्ड साफ करतो.
2. **पुन्हा प्रमाणीकरण करा / क्रेडेन्शियल्स संपादित करा** — OAuth प्रदात्यांसाठी, लॉगिन
   / रीफ्रेश प्रवाह पुन्हा चालवा; प्रदाता तयार/इम्पोर्ट रूट्स `isActive = true` सेट करतात.
3. **कनेक्शन पुन्हा सक्षम करा** — ऑटो-डिसेबलने `isActive = false` सेट केले असल्यास
   (`all` व्याप्ती, किंवा OAuth/कुकी/सत्र कनेक्शनसाठी `subscription`),
   खाते दुरुस्त केल्यानंतर ते पुन्हा चालू करा.

स्वतंत्र "clear ban flag" बटण नाही — पुनर्प्राप्ती म्हणजे पुन्हा चाचणी, पुन्हा प्रमाणीकरण किंवा पुन्हा सक्षम करणे; हे [RESILIENCE_GUIDE](../architecture/RESILIENCE_GUIDE.md) मधील सामान्य टर्मिनल-स्थिती नियमाशी सुसंगत आहे.

## प्रोब विलगीकरण (सर्व मॉडेल्सची चाचणी)

`runAsProbe` मध्ये अंमलात आणलेल्या **प्रोबमधून उद्भवलेल्या अपयशामुळे** (सर्व मॉडेल्सची चाचणी / आरोग्य-तपासणी डिस्पॅच) कनेक्शन कधीही पूलमधून काढले जात नाही (#9817): ते **दृश्यमानतेसाठी नोंदवले जाते** (`last_error`, `last_error_type`, `error_code`,
`last_error_at`), पण **प्रत्येक** राउटिंग बदल वगळला जातो — कूलडाउन, टर्मिनल स्थिती (`banned` / `deactivated` / `credits_exhausted`), प्रत्येक मॉडेलचे लॉकआउट, प्रदाता सर्किट ब्रेकर, 5-मिनिटांचा कोटा कॅश, OAuth टोकन रीफ्रेश आणि ऑटो-डिसेबल. केवळ प्रत्यक्ष विनंती-पथावरील अपयश निष्क्रिय करते. नोंदवलेली त्रुटी फ्लॅग केलेले खाते डॅशबोर्डमध्ये दृश्यमान करते, मात्र ते ट्रॅफिक हाताळत राहते.

एकमेव निर्णय-बिंदू `shouldIsolateProbeFailures()`
(`src/shared/utils/probeOrigin.ts`) आहे, आणि प्रोबमधून उद्भवलेल्या अपयशामुळे राउटिंग स्थिती बदलू शकणाऱ्या **प्रत्येक** ठिकाणी त्याचा सल्ला घेतला जातो:

- `markAccountUnavailable` (`auth.ts`) — केवळ नोंद (`lastError` कच्चा मजकूर,
  `lastErrorType`, `errorCode`, `lastErrorAt`; जाणीवपूर्वक `backoffLevel` **नाही**,
  कारण त्यामुळे निवडीच्या वेळी ऑटो-डिके सुरू होऊन नोंद पुसली जाईल)
- `maybeAutoDisableBannedAccount` — ऑटो-डिसेबल नाही
- `chatCore` — FORBIDDEN, ACCOUNT_DEACTIVATED, QUOTA_EXHAUSTED (केवळ नोंद,
  टर्मिनल `credits_exhausted` नाही), GEO_BLOCKED (24 तासांचे वगळणे नाही),
  MODEL_NOT_FOUND (`lockModel` नाही), codex 429 खाते-रोटेशन फेलओव्हर
  (`markCodexScopeRateLimited` नाही, कायमस्वरूपी `rate_limited_until` नाही,
  सत्र-अॅफिनिटी साफ करणे नाही), `persistCodexQuotaState` (कोटा-स्थिती लिहिणे नाही,
  कॅश अवैध करणे नाही), `recordKeyHealthStatus` (की-हेल्थ रोटेटरला
  स्पर्श केला जात नाही)
- OAuth रीफ्रेश — एक्झिक्युटर बेसमधील सक्रिय रीफ्रेश
  (`base.ts` `execute()`, कोणतेही रीफ्रेश-टोकन रोटेशन वापरले जात नाही) आणि
  `chatCore` मधील प्रतिक्रियात्मक 401/403 पथ (`expired` निष्क्रियता नाही), दोन्ही
- `chat.ts` — प्रदाता सर्किट ब्रेकर आणि 5-मिनिटांचा कोटा कॅश
  (`markAccountExhaustedFrom429`) कधीही अवनत केले जात नाहीत

नोंदवलेली त्रुटी फ्लॅग केलेले खाते डॅशबोर्डमध्ये दृश्यमान करते, मात्र ते ट्रॅफिक हाताळत राहते. नोंद: प्रत्यक्ष पथावरील `slice(0,100)` संक्षेपणापेक्षा वेगळे, प्रोब नोंद **कच्चा**
(न कापलेला) त्रुटी-मजकूर साठवते.

देखभाल साधन म्हणून सर्व मॉडेल्सची चाचणी वापरणारे ऑपरेटर खालीलपैकी कोणत्याही मार्गाने ऐतिहासिक वर्तन (प्रोबची गणना प्रत्यक्ष जनरेशन म्हणून करणे) पुनर्संचयित करू शकतात:

- `probeCanDisable` सेटिंग (`{"probeCanDisable": true}` सह
  `POST /api/settings`, किंवा थेट `key_value` DB संपादन), किंवा
- फीचर फ्लॅग **`PROBE_CAN_DISABLE=true`** (env किंवा DB ओव्हरराइड; सेटिंगपेक्षा याला प्राधान्य मिळते).

अपयश-सुरक्षितता: फ्लॅग किंवा सेटिंग्ज लुकअपमध्ये त्रुटी आल्यास, विलगीकरण सुरूच राहते.

## स्रोत फाइल्स

| संबंधित बाब                        | फाइल                                                                                                          |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| सिग्नल तक्ते + जुळवणी              | `open-sse/services/accountFallback.ts`                                                                        |
| अंतिमीकरण / कायमस्वरूपी जतन        | `src/sse/services/auth.ts` (`markAccountUnavailable`, `resolveTerminalConnectionStatus`, `clearAccountError`) |
| स्वयं-अक्षम करण्याची व्याप्ती      | `src/shared/utils/autoDisableBanned.ts`, `src/sse/services/autoDisableBannedAccount.ts`                       |
| इनलाइन वर्गीकरण                    | `open-sse/handlers/chatCore.ts`, `open-sse/services/errorClassifier.ts`                                       |
| अंतिम-स्थिती पुनर्प्राप्ती अपवर्जन | `src/lib/quota/connectionRecovery.ts`                                                                         |
| सानुकूल-कीवर्ड रनटाइम लोड          | `src/lib/config/runtimeSettings.ts` (`setCustomBannedSignals`)                                                |
| सेटिंग्ज UI                        | `src/app/(dashboard)/dashboard/settings/components/SecurityTab.tsx`                                           |
