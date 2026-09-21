# Subscription-first routing (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../routing/SUBSCRIPTION_LADDER.md) · 🇪🇹 [am](../../../am/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇦 [ar](../../../ar/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇿 [az](../../../az/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇬 [bg](../../../bg/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇩 [bn](../../../bn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇿 [cs](../../../cs/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇰 [da](../../../da/docs/routing/SUBSCRIPTION_LADDER.md) · 🇩🇪 [de](../../../de/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇷 [el](../../../el/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇸 [es](../../../es/docs/routing/SUBSCRIPTION_LADDER.md) · 🇪🇪 [et](../../../et/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇷 [fa](../../../fa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇮 [fi](../../../fi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇫🇷 [fr](../../../fr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇪 [ga](../../../ga/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [gu](../../../gu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ha](../../../ha/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇱 [he](../../../he/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [hi](../../../hi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇷 [hr](../../../hr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇭🇺 [hu](../../../hu/docs/routing/SUBSCRIPTION_LADDER.md) · 🇦🇲 [hy](../../../hy/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇩 [id](../../../id/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [ig](../../../ig/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇹 [it](../../../it/docs/routing/SUBSCRIPTION_LADDER.md) · 🇯🇵 [ja](../../../ja/docs/routing/SUBSCRIPTION_LADDER.md) · 🇬🇪 [ka](../../../ka/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇭 [km](../../../km/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [kn](../../../kn/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇷 [ko](../../../ko/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇹 [lt](../../../lt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇻 [lv](../../../lv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ml](../../../ml/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇾 [ms](../../../ms/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇹 [mt](../../../mt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇲🇲 [my](../../../my/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇵 [ne](../../../ne/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇱 [nl](../../../nl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇴 [no](../../../no/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [or](../../../or/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [pa](../../../pa/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇭 [phi](../../../phi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇱 [pl](../../../pl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇹 [pt](../../../pt/docs/routing/SUBSCRIPTION_LADDER.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇴 [ro](../../../ro/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇺 [ru](../../../ru/docs/routing/SUBSCRIPTION_LADDER.md) · 🇱🇰 [si](../../../si/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇰 [sk](../../../sk/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇮 [sl](../../../sl/docs/routing/SUBSCRIPTION_LADDER.md) · 🇷🇸 [sr](../../../sr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇸🇪 [sv](../../../sv/docs/routing/SUBSCRIPTION_LADDER.md) · 🇰🇪 [sw](../../../sw/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [ta](../../../ta/docs/routing/SUBSCRIPTION_LADDER.md) · 🇮🇳 [te](../../../te/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇭 [th](../../../th/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇷 [tr](../../../tr/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/routing/SUBSCRIPTION_LADDER.md) · 🇵🇰 [ur](../../../ur/docs/routing/SUBSCRIPTION_LADDER.md) · 🇺🇿 [uz](../../../uz/docs/routing/SUBSCRIPTION_LADDER.md) · 🇻🇳 [vi](../../../vi/docs/routing/SUBSCRIPTION_LADDER.md) · 🇳🇬 [yo](../../../yo/docs/routing/SUBSCRIPTION_LADDER.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/routing/SUBSCRIPTION_LADDER.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/routing/SUBSCRIPTION_LADDER.md)

---

> दोन नवीन `auto/*` ids — `auto/subscription` आणि `auto/thrifty`. दोन्हींचा वापर विनंतीद्वारे
> स्वेच्छेने निवडावा लागतो: कॉलरने नावाने id मागितल्याशिवाय त्यांच्यामार्फत काहीही रूट केले जात नाही आणि
> कोणत्याही विद्यमान pool, strategy किंवा default मध्ये बदल होत नाही.

## हे का अस्तित्वात आहे

OmniRoute आधीपासूनच खर्चासंबंधी दोन प्रश्नांची उत्तरे देते, परंतु बहुतेक ऑपरेटर विचारतात तो प्रश्न त्यांपैकी कोणताही नाही.

| विद्यमान यंत्रणा                                         | उत्तर देते                                         |
| -------------------------------------------------------- | -------------------------------------------------- |
| `hidePaidModels` (`autoCombo/paidModelFilter.ts`)        | "हे model मोफत म्हणून catalog केले आहे का?"        |
| `freeAccessPolicy: "strict"` (`strictZeroCostFilter.ts`) | "हे connection मला कधीही बिल करू शकते का?"         |
| `quotaPreflight` (`combo/quotaExhaustionCutoff.ts`)      | "हे connection त्याच्या मर्यादेजवळ आहे का?"        |
| `budgetCap` / `budgetFallback` (`autoCombo/engine.ts`)   | "खर्चाला मर्यादा घाला, सर्वात स्वस्त पर्यायावर जा" |

प्रत्येक केवळ-मोफत यंत्रणा **fails closed** — संपलेला मोफत pool म्हणजे रिकामा pool, सशुल्क
पर्यायाकडे एक पायरी वर जाणे नव्हे — आणि प्रत्येक सशुल्क-बाजूची यंत्रणा tier-बाबत उदासीन आहे. यांपैकी कोणतीही यंत्रणा याचे उत्तर देत नाही:

> "ज्यासाठी मी आधीच पैसे देतो तो quota वापरा. तो संपल्यावर एकतर थांबा किंवा सर्वात स्वस्त सशुल्क
> पर्यायांमधून एका वेळी एक पायरी वर जा — आणि तो reset होताच परत या."

## बिलिंग ही connection-संबंधित बाब आहे, model-संबंधित नाही

`classifyTier()` (`open-sse/services/tierResolver.ts`) हे `(provider, model)` वर आधारित असून
catalog pricing वरून `free | cheap | premium` परत करते. परंतु एखाद्या request मुळे अतिरिक्त खर्च होतो की नाही
हे **ते कोणते connection हाताळते** यावर अवलंबून असते: तेच model Claude Code OAuth
connection द्वारे plan मध्ये समाविष्ट असते आणि API-key connection द्वारे प्रत्येक token साठी बिल केले जाते.

`provider_connections.auth_type` कोणत्याही दिशेने सुरक्षित proxy नाही — metered OAuth
connections अस्तित्वात आहेत आणि plan मध्ये समाविष्ट API-key connections देखील अस्तित्वात आहेत (Copilot seat token ही
metered API key नाही). त्यामुळे billing class हा **काळजीपूर्वक व्यवस्थापित catalog** मधून येतो,
`open-sse/config/connectionBillingCatalog.ts`, जो प्रत्येक provider च्या प्रकाशित अटींनुसार हाताने सेट केला जातो —
मोफत models साठी `FreeModelBudget.hardStopGuaranteed` ने आधीच प्रस्थापित केलेला हाच pattern आहे.

```ts
type ConnectionBillingClass = "subscription" | "metered" | "keyless" | "unknown";
type ConnectionOverageBehavior = "hard-stop" | "meters-to-paid" | "unknown";
```

निराकरण क्रम (`autoCombo/connectionBilling.ts`): synthetic no-auth sentinel →
`keyless`; provider **आणि** `authType` दोन्हींशी जुळणारी catalog entry; provider-व्यापी entry;
अन्यथा `unknown`. **Catalog मध्ये नसलेले म्हणजे मोफत नव्हे** — `unknown` सर्वत्र `metered`
म्हणून वापरले जाते, त्यामुळे उद्या जोडलेला provider subscription rung च्या बाहेरून सुरू होतो आणि त्याला
जाणीवपूर्वक catalog मध्ये समाविष्ट करावे लागते.

## Rung model

escalation क्रमात पाच rungs. त्यांच्यात केवळ किंमतीचाच फरक नाही — प्रत्येकाचा **स्वतःचा**
exhaustion signal आहे, म्हणून हे केवळ sorting नाही.

| #   | Rung           | सदस्यत्व                                             | केव्हा संपलेले मानले जाते          |
| --- | -------------- | ---------------------------------------------------- | ---------------------------------- |
| 0   | `subscription` | काळजीपूर्वक catalog केलेले `billing: "subscription"` | quota window cutoff वर/खाली असताना |
| 1   | `keyless`      | synthetic no-auth path                               | connection cooldown / breaker      |
| 2   | `free`         | metered connection, `classifyTier() === "free"`      | मोफत allowance संपल्यावर           |
| 3   | `cheap`        | metered connection, `classifyTier() === "cheap"`     | प्रति-rung budget वापरले गेल्यावर  |
| 4   | `premium`      | metered connection, `classifyTier() === "premium"`   | प्रति-rung budget वापरले गेल्यावर  |

Rungs 0-2 **quota** वर संपतात, जो निरीक्षण करण्यायोग्य आहे आणि आधीपासून track केला जातो. Rungs 3-4 ना
quota नाही — सशुल्क connection कायम सेवा देते — त्यामुळे त्यांच्यासाठी एकमेव समंजस exhaustion signal म्हणजे प्रति-rung
**budget**. त्याशिवाय, "cheap संपल्यावर escalate करा" यासाठी कोणताही trigger नाही.

## `auto/subscription` — अपयश आल्यास बंद

पूल = केवळ पायरी 0, आणि तो फक्त अशा कनेक्शनपुरता मर्यादित आहे ज्यांचा अतिरिक्त वापर दस्तऐवजीकृत `hard-stop` आहे आणि ज्यांच्याकडे कोट्यामध्ये अतिरिक्त क्षमता असल्याची प्रत्यक्ष पडताळणी केलेली आहे. संदिग्ध असलेली प्रत्येक गोष्ट वगळली जाते: क्युरेट न केलेला प्रदाता, पडताळता न येणारे कोटा रीडिंग, कालबाह्य रीडिंग किंवा सशुल्क वापर म्हणून मोजला जाणारा अतिरिक्त वापर.

रिकामा पूल हेच **अपेक्षित** उत्तर आहे, दोष नाही — कॉलरचा विद्यमान रिकाम्या-पूलचा मार्ग त्याला मूक, शुल्क आकारल्या जाणाऱ्या फॉलबॅकऐवजी स्पष्ट त्रुटीत रूपांतरित करतो. या आयडीचे संपूर्ण आश्वासन हेच आहे.

`keyless` हेतुपुरस्सर पात्र ठरत **नाही**: या गटबांधणीचा अर्थ "मी ज्यासाठी पैसे देतो ती योजना" असा आहे, त्यामुळे प्रमाणीकरणाची गरज नसलेला बॅकएंड त्यात समाविष्ट होत नाही. त्यासाठी `auto/thrifty` (किंवा `auto/best-free`) वापरा.

### कनेक्शनची सुरक्षितता

उमेदवार नेहमीच एका कनेक्शनशी बांधलेला नसतो — तार्किक उमेदवाराकडे `allowedConnectionIds` अनुमतीसूची असते आणि प्रत्यक्षात वापरायचे खाते नंतर, डिस्पॅचच्या वेळी, `open-sse/services/combo/autoStrategy.ts` द्वारे निवडले जाते. त्यामुळे दोन्ही गटबांधण्या **प्रत्येक कनेक्शनची स्वतंत्रपणे** पडताळणी करतात आणि `allowedConnectionIds` मध्ये नेमका टिकून राहिलेला उपसंचच पुन्हा लिहितात — संपूर्ण मूळ सूची कधीही नाही आणि स्वैरपणे निवडलेला एखादा सदस्यही कधीही नाही. `autoStrategy.ts` आधीपासूनच त्या अॅरेची कठोर अनुमतीसूची म्हणून अंमलबजावणी करत असल्यामुळे, तो येथे पुन्हा लिहिल्याने "पडताळलेला" आणि "प्रत्यक्षात वापरलेला" हे संच रचनात्मकदृष्ट्या समान होतात. हे [STRICT_ZERO_COST](./STRICT_ZERO_COST.md) मधीलच अपरिवर्तनीय तत्त्व आणि त्यामागील तेच तर्क आहे.

## `auto/thrifty` — एका वेळी एकाच पायरीने पुढे जा

पूल = सर्व पायऱ्या, पायरी निर्देशांकानुसार क्रमबद्ध, ज्यातून संपलेले उमेदवार गेट करून वगळलेले आहेत. `auto` इंजिन टिकून राहिलेल्या पूलच्या **आत** अजूनही स्कोअरिंग करते: कोणत्या पायऱ्या विचारात घ्यायच्या हे शिडी ठरवते, तर त्यांच्यातील कोणता उमेदवार जिंकतो हे स्कोअरिंग ठरवते. प्रत्येक पायरीतील क्रम स्थिर असतो, त्यामुळे या ओव्हरलेमुळे स्कोअररची स्वतःची क्रमवारी कधीही फेरबदलली जात नाही.

हा क्रमबद्धता + गेटिंग ओव्हरले आहे, नवीन डिस्पॅचर **नाही**: `combo.ts` ची स्पेक्युलेटिव्ह लूप लक्ष्यांवर आधीपासूनच क्रमाने पुढे जाते आणि अपयश आल्यास पुढील लक्ष्य वापरते, त्यामुळे प्रीफ्लाइटमध्ये न आढळलेली रनटाइम कोटा-समाप्ती झाली तरी त्याच विनंतीमध्ये पुढील पायरीवर जाता येते.

`auto/subscription` अपयश आल्यास **बंद** होते, तर `auto/thrifty` अपयश आल्यास **उघडे** राहते: वापरण्यायोग्य कोटा रीडिंग नसलेले, योजनेत समाविष्ट असलेले कनेक्शन तरीही प्रथम वापरून पाहिले जाते. ते वापरून पाहण्यासाठी काहीही खर्च येत नाही आणि प्रत्यक्षात त्याचा कोटा संपलेला असल्यास फॉल-थ्रूने पुढील पायरी गाठली जाते — उलट, ते वापरून पाहण्यास नकार दिल्यास टेलीमेट्री उपलब्ध नसताना विनंती सशुल्क पायरीकडे पाठवली जाईल; नेमका हाच परिणाम टाळण्यासाठी ही गटबांधणी अस्तित्वात आहे.

## रीसेटनंतर योजनेकडे परतणे

राउटिंग पुन्हा पायरी 0 वर येण्यापूर्वी तीन स्वतंत्र गोष्टींची मुदत संपणे आवश्यक आहे. त्यांपैकी फक्त एक दुरुस्त केल्यास योजना पुन्हा भरल्यानंतरही शिडी बराच काळ सशुल्क पायऱ्यांवर अडकून राहते.

1. **कोटा-स्थिती कॅश** — `freeAccessQuota.ts` प्रत्येक `(provider, connection)` साठी 180s TTL सह कॅश करते. ज्या कॅश केलेल्या नोंदीचा स्वतःचा `resetAt` आधीच उलटून गेला आहे ती नोंद आता अस्तित्वात नसलेल्या कालखंडाचे वर्णन करते, त्यामुळे तिचे वय काहीही असले तरी ती आता कालबाह्य मानली जाते आणि रीफ्रेश करण्यास भाग पाडते. याशिवाय, मध्यरात्री पुन्हा भरलेली योजना TTL संपेपर्यंत संपलेलीच दाखवली जाते.
2. **शिडीची स्वतःची स्थिती** — रचनेनुसार अशी कोणतीही स्थिती नाही. प्रत्येक पूल तयार करताना प्रत्यक्ष कोटा-स्थितीवरून पायरीची पात्रता पुन्हा मोजली जाते; रीसेटनंतरही टिकून राहून राउटिंग अडकवू शकेल अशी कायमस्वरूपी साठवलेली "सध्या पायरी 3 वर" नोंद अस्तित्वात नाही.
3. **कनेक्शन कूलडाउन** — कोटा संपवणारा 429 प्रतिसाद एक्स्पोनेन्शियल बॅकऑफवरून `rateLimitedUntil` सेट करतो, जो योजना-कनेक्शनच्या बाबतीत वास्तविक रीसेटच्या पुढे जाऊ शकतो. `clampCooldownToReset()` (`subscriptionLadder.ts`) कूलडाउनचा कालावधी अपस्ट्रीमच्या स्वतःच्या रीसेट क्षणापर्यंत कमी करते आणि तो कधीही वाढवू शकत नाही. **त्याची अंमलबजावणी आणि चाचणी झालेली आहे, पण तो अद्याप जोडलेला नाही**: `src/sse/services/auth.ts` मध्ये कोणताही कूलडाउन लिहिण्यापूर्वीच कोटा कॅश अवैध केली जाते, त्यामुळे त्या फंक्शनमध्ये `resetAt` यापूर्वीच कॅप्चर करणे आवश्यक आहे — हा रिझिलियन्स हॉट पाथमधील बदल असल्यामुळे तो स्वतंत्रपणे पुनरावलोकन केलेल्या PR मध्ये असायला हवा. तोपर्यंत, पुन्हा प्रवेश करण्यासाठी कनेक्शन कूलडाउन संपेपर्यंत प्रतीक्षा करावी लागते (प्रदात्याने पाठवल्यास ते आधीपासूनच अपस्ट्रीम `Retry-After` सूचनांना प्राधान्य देते).

### वारंवार अदलाबदल-प्रतिबंध

नुकतीच रीसेट झालेली पायरी केवळ `reentryMinRemainingPercent` (डीफॉल्ट 5) पेक्षा वर असल्यासच पुन्हा समाविष्ट केली जाते, तर आधीपासून वापरात असलेल्या कनेक्शनला फक्त `exitCutoffPercent` (डीफॉल्ट 2, `quotaPreflight.defaultThresholdPercent` शी जुळणारे) पेक्षा वर राहावे लागते. या दोन्हींमधील अंतर हा हिस्टेरेसिस बँड आहे — त्याशिवाय, कटऑफच्या आसपास घुटमळणारे कनेक्शन सलग विनंत्यांमध्ये पायऱ्यांदरम्यान वारंवार अदलाबदल करते.

## कॉन्फिगरेशन

केवळ ट्यूनिंगसाठी. मुद्दामच `enabled` फ्लॅग नाही: हे बंद करू शकणारे टॉगल
`auto/subscription` ला पूर्ण पूल — सशुल्क मॉडेल्ससह — अशा नावाखाली गुपचूप उपलब्ध करून देईल,
जे याच्या अगदी उलट आश्वासन देते.

```jsonc
{
  "subscriptionLadder": {
    "exitCutoffPercent": 2,
    "reentryMinRemainingPercent": 5,
    "rungBudgetUsd": { "cheap": 5.0, "premium": 0 }, // 0 एखादी पायरी पूर्णपणे अक्षम करते
  },
}
```

खर्च रिझॉल्वर जोडला जाईपर्यंत बजेट गेटिंग निष्क्रिय असते: कोणतेही लेखांकन उपलब्ध नसल्यास सशुल्क
पायरी क्रमात ठेवली जाते, परंतु कधीही प्रतिबंधित केली जात नाही. v3.8.51 पासून `rungBudgetUsd` सेटिंग
स्कीमाद्वारे स्वीकारली जाते, परंतु अद्याप लागू केलेली नाही — तिला सक्रिय खर्च मर्यादा न मानता राखीव
कॉन्फिगरेशन समजा. पायऱ्यांचा क्रम, कोटा-आधारित समाप्ती आणि रीसेटनंतरचा पुनःप्रवेश हे सर्व
त्याशिवायही कार्य करतात.

## रचना

`subscription` आणि `thrifty` ही `AutoTier` मूल्ये आहेत, त्यामुळे ती प्रत्येक श्रेणीसोबत वापरता येतात:
`auto/coding:thrifty`, `auto/reasoning:subscription`, इत्यादी. दोन सपाट आयडी
(`auto/subscription`, `auto/thrifty`) `/v1/models` आणि डॅशबोर्डमध्ये प्रदर्शित केले जातात.

दोन्हीपैकी कोणताही आयडी सशुल्क-स्तराचा नाही, त्यामुळे `isPaidTierAutoId()` दोन्हीसाठी `false` परत करतो आणि
`auto/subscription` हे `hidePaidModels` लागू असतानाही उपलब्ध राहते.

## कोड कुठे आहे

| संबंधित बाब                             | फाइल                                                |
| --------------------------------------- | --------------------------------------------------- |
| काळजीपूर्वक निवडलेली बिलिंग तथ्ये       | `open-sse/config/connectionBillingCatalog.ts`       |
| वर्गीकारक                               | `open-sse/services/autoCombo/connectionBilling.ts`  |
| पायऱ्या, दोन्ही गटबद्धीकरणे, पुनःप्रवेश | `open-sse/services/autoCombo/subscriptionLadder.ts` |
| उमेदवार पूलमध्ये जोडणी                  | `open-sse/services/autoCombo/virtualFactory.ts`     |
| रीसेट-जागरूक कॅश शिळेपणा                | `open-sse/services/autoCombo/freeAccessQuota.ts`    |
| स्तर पृष्ठभाग                           | `open-sse/services/autoCombo/suffixComposition.ts`  |
| प्रदर्शित आयडी                          | `open-sse/services/autoCombo/builtinCatalog.ts`     |
| चाचण्या                                 | `tests/unit/autoCombo/subscription-ladder.test.ts`  |
