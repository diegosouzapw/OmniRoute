# Admission lanes (#9654) — two lane systems, what gates each, where each reports (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute मध्ये भिन्न व्याप्ती असलेल्या **दोन** प्रक्रिया-स्थानिक लेन प्रणाली आहेत. त्या
परस्परपूरक आहेत; ऑपरेटरनी आपण कोणती प्रणाली पाहत आहोत हे जाणून घेतले पाहिजे.

## 1. बाइट-स्तरीय, प्रक्रियाव्यापी प्रवेश (`chatBodyAdmission.ts`)

- **व्याप्ती:** `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` आणि इतर चॅट-सदृश मार्गांसाठी बफर केलेल्या बॉडीचा/हीपचा मार्ग. मोठ्या कोडिंग-एजंट बॉडींमुळे होणाऱ्या
  हीप प्रवर्धनापासून संरक्षण करते (#4380).
- **प्रत्येक कीसाठी स्वतंत्र लेन नव्हे, तर प्रक्रियेसाठी एक जागतिक कंट्रोलर (#10110).** प्रत्येक API की
  (हॅश केलेली) किंवा `anonymous` सत्र **त्याच** सामायिक बजेटच्या अधीन राहून प्रवेश मिळवते —
  हॅश केलेला सत्र आयडी केवळ निष्पक्ष शेड्युलिंग की म्हणून वापरला जातो (प्रतीक्षेत असलेल्यांमध्ये राउंड-रॉबिन
  डिस्पॅचसाठी), क्षमतेचा स्वतंत्र विभाग म्हणून कधीही नाही. या
  दस्तऐवजाच्या पूर्वीच्या आवृत्तीत स्वतंत्र क्षमता असलेल्या प्रत्येक-की लेनचे वर्णन होते; ते मॉडेल
  #10110 मध्ये काढून टाकण्यात आले, कारण त्यामुळे प्रमाणीकरण न केलेल्या बनावट क्रेडेन्शियल्सना
  प्रक्रियाव्यापी मर्यादा गुणाकाराने वाढवता येत होती.
- **गेट (#503-fanout): स्वयंचलितपणे व्युत्पन्न केलेले अंतर्ग्रहण BYTE बजेट, निश्चित विनंती
  संख्या नव्हे.** जुनी `CHAT_MAX_HEAVY_IN_FLIGHT` विनंती-संख्या मर्यादा (या दुरुस्तीपूर्वी डीफॉल्ट `1`)
  कोडिंग-एजंट फॅन-आउटला (एकाधिक सबएजंट/CLI,
  नियमितपणे > 256 KB आकाराच्या बॉडी) प्रभावी समवर्तीता ~1 पर्यंत खाली आणत होती, ज्यामुळे
  पूर्णपणे सामान्य लोडमध्ये 503 प्रतिसाद मिळत होते. आता ही मर्यादा केवळ ऑपरेटरने स्पष्टपणे
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` सेट केल्यावरच लागू होते. ते सेट न केल्यास प्रवेशाला त्याऐवजी
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` द्वारे मर्यादा घातली जाते — हे बजेट
  प्रक्रियेच्या वास्तविक मेमरी कमाल मर्यादेवरून (`src/shared/middleware/admissionBudget.ts`)
  स्वयंचलितपणे व्युत्पन्न होते: V8 हीप मर्यादा आणि कोणतीही cgroup/कंटेनर मर्यादा यांपैकी अधिक कठोर मर्यादेच्या 25% ला
  8x तात्पुरत्या-प्रवर्धन गुणकाने भागून, 8 MiB आणि
  2 GiB यांच्या दरम्यान मर्यादित केले जाते. स्पष्ट ओव्हरराइडसाठीही याच मर्यादा वापरल्या जातात. कोणतेही env ट्यूनिंग न करता हे स्वतःला
  512 MB कंटेनरपासून 32 GB डेस्कटॉपपर्यंत अनुरूप करते. प्रभावी बजेटमध्ये
  न बसणारी बॉडी `413 body_exceeds_budget` सह त्वरित अयशस्वी होते;
  केवळ स्वतंत्रपणे हाताळता येण्याजोग्या बॉडींमधील स्पर्धाच मर्यादित
  निष्पक्षता रांगेत प्रवेश करते. थेट बहु-सिग्नल संसाधन-दबाव ट्रॅकर (V8 हीप गुणोत्तर,
  cgroup, PSI, OOM घटना — `open-sse/utils/resourcePressurePolicy.ts`)
  `high` दबावाखाली मर्यादित प्रतीक्षा कमी करतो आणि कोणतेही बाइट अंतर्ग्रहित होण्यापूर्वीच
  `critical` दबावाखाली `503 resource_pressure` सह विनंत्या त्वरित वगळतो.
- **ट्यूनिंग:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — स्वयंचलितपणे व्युत्पन्न केलेल्या बाइट बजेटसाठी ओव्हरराइड
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — जुनी विनंती-संख्या मर्यादा, केवळ निवड केल्यावर
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 पूर्वीची रांग-प्रतीक्षा (डीफॉल्ट 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — रांगेतील-बाइट्ससाठी हीप व्हॉल्व्ह (डीफॉल्ट 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 पासून अप्रचलित
    निष्प्रभावी पर्याय (कॉन्फिगरेशन सुसंगततेसाठी स्वीकारले जातात, परंतु दुर्लक्षित केले जातात)
- **अहवाल:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — यामध्ये
  #503-fanout मधील नवीन `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` आणि `countCapEnabled`
  यांचा समावेश आहे (डीफॉल्ट डिप्लॉयमेंटवर false — प्रत्यक्षात जुनी
  संख्या मर्यादा नव्हे, तर बाइट बजेटच लागू होत असल्याची पुष्टी करते).

## 2. अनुकूलनीय रनटाइम व्हर्च्युअल लेन्स (`open-sse/services/admission`)

- **व्याप्ती:** प्रोव्हायडर डिस्पॅचसाठी tenant-key प्रवेश — रांग खर्च, विलंबावर आधारित
  मर्यादा अनुकूलन, लेनमधील रांगा आणि लेन मेट्रिक्स.
- **गेट:** **opt-in.** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` असल्याशिवाय अक्षम. त्याशिवाय,
  अनुकूलनीय कंट्रोलर सामायिक रांगेचे वर्तन कायम ठेवतो (#9654 मधील निकष 1 फक्त
  ऑपरेटरने लेन्स सक्षम केल्यानंतरच पूर्ण होतो).
- **ट्यूनिंग:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + अनुकूलनीय कॉन्फिगरेशन (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …).
- **अहवाल:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (अपारदर्शक लेन IDs, कच्च्या
  कीज कधीही नाहीत), आणि `virtualLanes` — स्नॅपशॉटमधील "लेन्स सुरू आहेत" हे दर्शवणारा अधिकृत फ्लॅग.

## 3. फॅन-आउट प्रोब्स — combo/fusion साठी प्रत्येक टार्गेटनुसार प्रवेश (#9654 Wave 2)

Combo (priority / round-robin) आणि fusion एका पॅरेंट विनंतीअंतर्गत N मॉडेल टार्गेट्सकडे
फॅन-आउट करतात. #9654 Wave 2 पासून, **प्रत्येक फॅन-आउट टार्गेट डिस्पॅचपूर्वी गेट केले जाते**,
आणि त्यासाठी **पॅरेंटच्या** tenant lane विरुद्ध प्रत्येक टार्गेटसाठी प्रोब
(`PerTargetAdmissionHook`, `createPerTargetAdmissionHook` द्वारे तयार केलेला) वापरला जातो.

- **व्याप्ती:** combo, fusion आणि chaos engine द्वारे डिस्पॅच केलेले प्रत्येक फॅन-आउट टार्गेट.
  System 1 (byte-level) वर याचा परिणाम होत नाही — ते फॅन-आउट टार्गेट्सना कधीही प्रोब करत नाही.
- **गेट:** **system 2 सह opt-in.** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  सेट नसताना हे no-op असते — त्या मोडमध्ये पॅरेंट विनंतीकडे आधीपासूनच सामायिक-रांगेची lease
  असते, त्यामुळे प्रोबिंग केल्यास दुहेरी मोजणी होऊन combo टार्गेट्स नाकारले जातील.
- **शब्दार्थ:**
  - **पूर्णपणे नॉन-ब्लॉकिंग — रांगेत लावू नका, वगळा.** `maxWaitMs 0`: पूर्ण भरलेली लेन
    टार्गेट वगळते आणि त्याऐवजी combo ची fallback यंत्रणा (किंवा fusion चे survivor
    panel) सेवा देते. हे हेतुपुरस्सर आहे: फॅन-आउट टार्गेट हे पुनरावृत्तीचे काम असते,
    आणि ते रांगेत लावल्याने ज्या कोंडीला थांबवण्यासाठी लेन्स अस्तित्वात आहेत, नेमक्या त्याच
    कोंडीवर आणखी भार पडतो. त्यामुळे `defaultMaxWaitMs` फक्त **पॅरेंट विनंतीला** लागू होते;
    फॅन-आउट प्रोब्स कधीही प्रतीक्षा करत नाहीत आणि त्यांना प्रतीक्षा करायला लावण्यासाठी हेतुपुरस्सर
    **कोणताही knob नाही** (issue इतिहास दर्शवतो की प्रतीक्षा knobs मुळे #9654 ज्या मोठ्या
    प्रमाणातील 502/504 वर्गाला प्रतिबंधित करते, तो निर्माण झाला — वगळलेल्या फॅन-आउट
    टार्गेट्समुळे प्रतिसादाच्या गुणवत्तेला धक्का बसत असल्याचे ऑपरेटरने कळवले तरच यावर
    पुनर्विचार करा).
  - **प्रवेश मिळताच रिलीज.** प्रवेश मिळालेला प्रोब त्याची lease त्वरित रिलीज करतो: तो
    क्षमता गेट आहे, hold नाही. पॅरेंटची lease फॅन-आउट व्यापते; आणखी N leases hold केल्यास
    सामायिक सक्रिय खर्च फुगेल आणि इतर tenants नाकारले जातील. हे best-effort आहे,
    reservation नाही: प्रोब आणि डिस्पॅचदरम्यान लेन पुन्हा भरू शकते, त्यामुळे तीव्र
    स्पर्धेच्या परिस्थितीत टार्गेट डिस्पॅच होईपर्यंत पुन्हा पूर्ण भरलेल्या लेनमध्येही
    गेट प्रवेश देऊ शकते.
  - **प्रत्यक्ष फॅन-आउट बॉडीवरून किंमत निर्धारण.** प्रोब टार्गेटच्या प्रत्यक्ष बॉडीवरून
    खर्चाचा अंदाज घेतो — त्याच्या `stream` फ्लॅगवरून मिळालेल्या विनंती वर्गासह,
    अगदी पॅरेंट पाथप्रमाणेच — त्यामुळे fusion panel सदस्यांची (`stream: false`)
    किंमत ते प्रत्यक्षात व्यापणार असलेल्या non-streaming वर्गानुसार, तर priority/RR
    टार्गेट्सची किंमत वापरकर्त्याने विनंती केलेल्या प्रकारानुसार ठरते.
- **अहवाल:** पहिल्या टार्गेटनंतर एखादा प्रोब वगळल्यास combo चा प्रत्येक-विनंतीसाठीचा
  `fallbackCount` वाढतो (विद्यमान fallback शब्दार्थाशी सुसंगत; combo
  लॉग्समध्ये दृश्यमान); प्रत्येक panel सदस्य वगळला गेल्यास fusion 503 परत करते. सध्या
  स्नॅपशॉटवर **कोणताही एकत्रित काउंटर नाही** (उदा. `virtualFanoutSkipped`) —
  लेन गेट फॅन-आउट टार्गेट्स किती वेळा वगळते हे समजत नसल्याचे ऑपरेटरने कळवल्यास,
  असा काउंटर जोडण्यासाठी तोच ट्रिगर असेल.

## डॅशबोर्डमध्ये कोणते दिसत आहे

- `adaptiveAdmission.laneCount` / `laneTenants` → **अनुकूलनीय आभासी लेन्स** (प्रणाली 2).
- `adaptiveAdmission.virtualLanes === true` → विभाग 3 मधील फॅन-आउट प्रोबदेखील
  सक्रिय आहेत. `virtualLanes` नसलेला किंवा `false` असलेला पेलोड म्हणजे
  `OMNIROUTE_CHAT_VIRTUAL_LANES` सेट केलेले नाही — बाइट-स्तरीय लेन्स (प्रणाली 1)
  अजूनही सक्रिय आहेत, परंतु ते सक्षम करेपर्यंत `adaptiveAdmission` अंतर्गत काहीही
  (आणि कोणतेही फॅन-आउट गेटिंग) प्रभावी नसते.

## दोन्ही का अस्तित्वात आहेत

बाइट-स्तरीय लेन्स मेमरीचा मोठ्या प्रमाणावर वापर करणाऱ्या पार्स/कॉम्प्रेस मार्गाला मर्यादा घालतात; अनुकूलनीय लेन्स
प्रत्येक टेनंटच्या डिस्पॅच खर्चाला मर्यादा घालतात. #9654 मधील निकष 1 ("एका सेशनच्या बर्स्टमुळे
दुसऱ्याला 503 मिळत नाही") प्रणाली 1 द्वारे बिनशर्त लागू केला जातो आणि ऑप्ट-इन सक्षम झाल्यानंतर प्रणाली 2 द्वारेही लागू केला जातो.

## 4. एकाच प्रोसेसमधील दीर्घ `/v1/responses` (निरोगी-हेडरूम)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) मध्ये
`tryAcquireHealthyHeadroom` जोडले आहे, जेणेकरून हीप
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` पेक्षा कमी असताना संरचनात्मकदृष्ट्या जड असलेल्या दुसऱ्या विनंतीला प्रवेश दिला जाईल.
`admitChatRequest` द्वारे वापरला जाणारा BYTE मार्ग (बॉडीज ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES`,
डीफॉल्ट 256 KiB, `POST /v1/responses` सह) **हाच** सुटकेचा मार्ग वापरतो.

दोनपेक्षा अधिक समवर्ती दीर्घ SSE `/v1/responses` साठी ही समर्थित **एक-प्रोसेस**
पद्धत आहे: हीप आणि प्रोसेस-व्यापी इनफ्लाइट-बाइट बजेट
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) जितकी परवानगी देतात, तितकीच प्राथमिक + निरोगी-हेडरूम मर्यादा वाढवा.
दीर्घ SSE क्लायंटची संख्या काही दहांच्या घरात (40–50) असणे हा मेमरी-बजेटचा
प्रश्न आहे, उत्पादनाची कठोर “कमाल 2” मर्यादा नाही. दबावाखालील हीप अजूनही
पुन्हा प्रयत्न करता येण्याजोग्या `503` सह लोड कमी करते, जेणेकरून #7849 पुन्हा उद्भवणार नाही.

**अनेक हीप्स** मिळवण्यासाठी, N स्वतंत्र `DATA_DIR`s चालवा (#11024). एका SQLite फाइलवर
कधीही `replicas > 1` वापरू नका (#10350). हा विभाग
DATA_DIR स्केल-आउट पद्धत पुन्हा चर्चेसाठी उघडत नाही.
