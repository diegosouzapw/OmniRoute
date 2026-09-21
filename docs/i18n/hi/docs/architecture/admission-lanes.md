# Admission lanes (#9654) — two lane systems, what gates each, where each reports (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇵 [ne](../../../ne/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute में अलग-अलग स्कोप वाली **दो** प्रोसेस-लोकल लेन प्रणालियाँ हैं। वे
एक-दूसरे की पूरक हैं; ऑपरेटरों को पता होना चाहिए कि वे किस प्रणाली को देख रहे हैं।

## 1. बाइट-स्तरीय प्रक्रिया-व्यापी प्रवेश (`chatBodyAdmission.ts`)

- **दायरा:** `POST /v1/chat/completions`,
  `/v1/messages`, `/v1/responses` और अन्य चैट-आकार वाले रूट्स के लिए बफ़र किए गए बॉडी/हीप का पथ। बड़े कोडिंग-एजेंट बॉडी से होने वाले हीप प्रवर्धन से सुरक्षा करता है (#4380)।
- **एक प्रक्रिया-वैश्विक नियंत्रक, प्रति-कुंजी लेन नहीं (#10110)।** प्रत्येक API कुंजी
  (हैश की गई) या `anonymous` सत्र **उसी** साझा बजट के विरुद्ध प्रवेश करता है —
  हैश किए गए सत्र id का उपयोग केवल निष्पक्षता शेड्यूलिंग कुंजी के रूप में किया जाता है (प्रतीक्षारत अनुरोधों में राउंड-रॉबिन
  डिस्पैच), क्षमता शार्ड के रूप में कभी नहीं। इस
  दस्तावेज़ के पिछले संस्करण में स्वतंत्र क्षमता वाली प्रति-कुंजी लेन का वर्णन किया गया था; उस मॉडल को
  #10110 में हटा दिया गया, क्योंकि उससे अप्रमाणित नकली क्रेडेंशियल प्रक्रिया-व्यापी सीमा को
  कई गुना बढ़ा सकते थे।
- **गेट (#503-fanout): स्वतः-व्युत्पन्न अंतर्ग्रहण BYTE बजट, निश्चित अनुरोध
  संख्या नहीं।** पुरानी `CHAT_MAX_HEAVY_IN_FLIGHT` अनुरोध-संख्या सीमा (इस सुधार से पहले डिफ़ॉल्ट `1`)
  ने कोडिंग-एजेंट फ़ैन-आउट (एकाधिक सबएजेंट/CLIs,
  नियमित रूप से > 256 KB वाले बॉडी) को लगभग 1 की प्रभावी समवर्तीता तक सीमित कर दिया था, जिससे पूरी तरह सामान्य लोड में भी
  503 त्रुटियाँ आती थीं। अब यह केवल तभी बाध्यकारी होती है, जब कोई ऑपरेटर स्पष्ट रूप से
  `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` सेट करता है। इसे अनसेट छोड़ने पर, प्रवेश को इसके बजाय
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` द्वारा नियंत्रित किया जाता है — यह बजट प्रक्रिया की
  वास्तविक मेमोरी सीमा (`src/shared/middleware/admissionBudget.ts`) से स्वतः व्युत्पन्न होता है:
  V8 हीप सीमा और किसी भी cgroup/container सीमा में से अधिक कठोर सीमा का 25%,
  जिसे 8x क्षणिक-प्रवर्धन गुणक से विभाजित किया जाता है और 8 MiB से
  2 GiB के बीच सीमित किया जाता है। स्पष्ट ओवरराइड भी इन्हीं सीमाओं का उपयोग करते हैं। यह बिना किसी env समायोजन के
  512 MB कंटेनर से लेकर 32 GB डेस्कटॉप तक स्वयं को अनुकूलित करता है। जो बॉडी
  प्रभावी बजट में समा नहीं सकती, वह तुरंत `413 body_exceeds_budget` के साथ विफल हो जाती है;
  केवल अलग-अलग रूप से सेवा-योग्य बॉडी के बीच होने वाला संसाधन-विवाद ही सीमित
  निष्पक्षता कतार में प्रवेश करता है। एक सक्रिय बहु-संकेत संसाधन-दबाव ट्रैकर (V8 हीप अनुपात,
  cgroup, PSI, OOM घटनाएँ — `open-sse/utils/resourcePressurePolicy.ts`) `high` दबाव में
  सीमित प्रतीक्षा को कम करता है और `critical` दबाव में
  `503 resource_pressure` के साथ तुरंत लोड घटाता है, इससे पहले कि कोई बाइट अंतर्ग्रहित भी हो।
  उपलब्ध होने पर PSI को इस यूनिट के cgroup `memory.pressure` से पढ़ा जाता है
  (`open-sse/utils/resourcePressureSampler.ts`); `/proc/pressure/memory`
  पूरे होस्ट पर लागू होता है और केवल बेयर मेटल / cgroup v1 पर फ़ॉलबैक है, इसलिए स्वैपिंग वाला
  होस्ट किसी निष्क्रिय कंटेनर में 503 त्रुटि उत्पन्न नहीं कर सकता।
- **समायोजन:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — स्वतः-व्युत्पन्न बाइट बजट के लिए ओवरराइड
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — पुरानी अनुरोध-संख्या सीमा, केवल ऑप्ट-इन
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 से पहले कतार-प्रतीक्षा (डिफ़ॉल्ट 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — कतारबद्ध-बाइट हीप वाल्व (डिफ़ॉल्ट 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 से अप्रचलित
    नो-ऑप्स (कॉन्फ़िगरेशन संगतता के लिए स्वीकार किए जाते हैं, लेकिन अनदेखे किए जाते हैं)
- **रिपोर्ट:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — इसमें
  #503-fanout के अतिरिक्त फ़ील्ड `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity` और `countCapEnabled`
  शामिल हैं (डिफ़ॉल्ट परिनियोजन पर false — यह पुष्टि करता है कि वास्तव में बाइट बजट बाध्यकारी है,
  न कि पुरानी संख्या सीमा)।

## 2. अनुकूली रनटाइम वर्चुअल लेन (`open-sse/services/admission`)

- **दायरा:** प्रोवाइडर डिस्पैच के लिए tenant-key एडमिशन — क्यू लागत, लेटेंसी-निर्देशित
  सीमा अनुकूलन, लेन क्यूइंग और लेन मेट्रिक्स।
- **गेट:** **ऑप्ट-इन।** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` के बिना अक्षम। इसके बिना,
  अनुकूली कंट्रोलर साझा क्यू का व्यवहार बनाए रखता है (#9654 का मानदंड 1 केवल
  तब पूरा होता है, जब कोई ऑपरेटर लेन सक्षम करता है)।
- **ट्यूनिंग:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + अनुकूली कॉन्फ़िगरेशन (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …)।
- **रिपोर्ट:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (अपारदर्शी लेन ID, कभी भी मूल
  कुंजियाँ नहीं), और `virtualLanes` — स्नैपशॉट में "लेन चालू हैं" का आधिकारिक फ़्लैग।

## 3. फ़ैन-आउट प्रोब — combo/fusion के लिए प्रति-टार्गेट एडमिशन (#9654 वेव 2)

Combo (प्राथमिकता / राउंड-रॉबिन) और fusion एक पैरेंट अनुरोध के अंतर्गत N मॉडल
टार्गेट में फ़ैन-आउट करते हैं। #9654 वेव 2 के बाद से, **हर फ़ैन-आउट टार्गेट को डिस्पैच से पहले**
**पैरेंट की** tenant लेन के विरुद्ध एक प्रति-टार्गेट प्रोब (`PerTargetAdmissionHook`,
जिसे `createPerTargetAdmissionHook` द्वारा बनाया जाता है) से गेट किया जाता है।

- **दायरा:** combo, fusion और chaos इंजन द्वारा डिस्पैच किया गया प्रत्येक फ़ैन-आउट टार्गेट।
  सिस्टम 1 (बाइट-स्तर) अप्रभावित है — यह कभी भी फ़ैन-आउट टार्गेट की जाँच नहीं करता।
- **गेट:** **सिस्टम 2 के साथ ऑप्ट-इन।** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  सेट न होने पर यह कोई कार्रवाई नहीं करता — उस मोड में पैरेंट अनुरोध के पास पहले से
  साझा-क्यू लीज़ होती है, इसलिए प्रोब करने से दोहरी गणना होगी और combo टार्गेट अस्वीकार होंगे।
- **व्यवहार:**
  - **पूरी तरह नॉन-ब्लॉकिंग — छोड़ें, कभी क्यू न करें।** `maxWaitMs 0`: भरी हुई लेन
    टार्गेट को छोड़ देती है और इसके बजाय combo की फ़ॉलबैक व्यवस्था (या fusion का बचा हुआ
    पैनल) सेवा प्रदान करती है। यह जानबूझकर किया गया है: फ़ैन-आउट टार्गेट अतिरिक्त
    कार्य होता है और उसे क्यू करने से ठीक उसी कंजेशन पर अधिक लोड जुड़ता है जिसे रोकने
    के लिए लेन मौजूद हैं। इसलिए `defaultMaxWaitMs` केवल **पैरेंट अनुरोध** पर लागू होता है;
    फ़ैन-आउट प्रोब कभी प्रतीक्षा नहीं करते और उन्हें प्रतीक्षा कराने के लिए जानबूझकर
    **कोई नॉब नहीं** दिया गया है (इश्यू इतिहास दिखाता है कि प्रतीक्षा नॉब ने बड़े पैमाने
    पर 502/504 वाली समस्या उत्पन्न की थी, जिसे #9654 रोकता है — इस पर केवल तभी
    पुनर्विचार करें, जब कोई ऑपरेटर रिपोर्ट करे कि छोड़े गए फ़ैन-आउट टार्गेट प्रतिक्रिया
    की गुणवत्ता को नुकसान पहुँचा रहे हैं)।
  - **एडमिट होने पर रिलीज़।** एडमिट हुआ प्रोब अपनी लीज़ तुरंत रिलीज़ कर देता है: यह
    क्षमता गेट है, होल्ड नहीं। पैरेंट की लीज़ फ़ैन-आउट को कवर करती है; N अतिरिक्त लीज़
    होल्ड करने से साझा सक्रिय लागत कृत्रिम रूप से बढ़ेगी और अन्य tenant अस्वीकार होंगे।
    यह आरक्षण नहीं, बल्कि सर्वोत्तम-प्रयास है: प्रोब और डिस्पैच के बीच लेन दोबारा भर
    सकती है, इसलिए भारी प्रतिस्पर्धा के दौरान गेट किसी ऐसे टार्गेट को एडमिट कर सकता है
    जिसके डिस्पैच होने तक लेन फिर से भर चुकी हो।
  - **वास्तविक फ़ैन-आउट बॉडी के आधार पर मूल्यांकन।** प्रोब टार्गेट की वास्तविक बॉडी से
    लागत का अनुमान लगाता है — इसमें उसके `stream` फ़्लैग से प्राप्त अनुरोध वर्ग भी
    शामिल है, ठीक पैरेंट पाथ की तरह — इसलिए fusion पैनल सदस्य (`stream: false`)
    उस नॉन-स्ट्रीमिंग वर्ग के अनुसार मूल्यांकित होते हैं जिसका वे वास्तव में उपयोग
    करेंगे, और प्राथमिकता/RR टार्गेट उपयोगकर्ता के अनुरोध के अनुसार मूल्यांकित होते हैं।
- **रिपोर्ट:** पहले टार्गेट के बाद किसी प्रोब के छोड़े जाने पर combo का प्रति-अनुरोध
  `fallbackCount` बढ़ता है (मौजूदा फ़ॉलबैक व्यवहार के अनुरूप; combo लॉग में दृश्यमान);
  हर पैनल सदस्य छोड़े जाने पर fusion 503 लौटाता है। वर्तमान में स्नैपशॉट पर
  **कोई समग्र काउंटर नहीं है** (जैसे `virtualFanoutSkipped`) — यदि कोई ऑपरेटर रिपोर्ट
  करता है कि वह यह नहीं जान सकता कि लेन गेट कितनी बार फ़ैन-आउट टार्गेट छोड़ता है,
  तो यह ऐसा काउंटर जोड़ने का संकेत है।

## डैशबोर्ड में कौन-सा दिखाई दे रहा है

- `adaptiveAdmission.laneCount` / `laneTenants` → **अनुकूली वर्चुअल लेन** (सिस्टम 2)।
- `adaptiveAdmission.virtualLanes === true` → अनुभाग 3 के fan-out probes भी
  सक्रिय हैं। ऐसा payload जिसमें `virtualLanes` अनुपस्थित हो या `false` हो, उसका अर्थ है कि
  `OMNIROUTE_CHAT_VIRTUAL_LANES` सेट नहीं है — बाइट-स्तरीय लेन (सिस्टम 1)
  अभी भी सक्रिय हैं, लेकिन इसे सक्षम किए जाने तक `adaptiveAdmission` के अंतर्गत कुछ भी
  (और कोई fan-out gating भी नहीं) प्रभावी नहीं होता।

## दोनों क्यों मौजूद हैं

बाइट-स्तरीय लेन मेमोरी-गहन parse/compress पथ को सीमित करती हैं; अनुकूली लेन
प्रति tenant dispatch लागत को सीमित करती हैं। #9654 का मानदंड 1 ("एक session का burst दूसरे को 503 नहीं करता")
सिस्टम 1 द्वारा बिना शर्त लागू किया जाता है और opt-in सक्षम होने के बाद सिस्टम 2 द्वारा भी लागू किया जाता है।

## 4. एक-प्रोसेस में लंबे `/v1/responses` (स्वस्थ हेडरूम)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ने
`tryAcquireHealthyHeadroom` जोड़ा, ताकि heap के
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` से नीचे होने पर दूसरी संरचनात्मक रूप से भारी request को प्रवेश दिया जा सके। `admitChatRequest` द्वारा उपयोग किया जाने वाला BYTE
पथ (ऐसी bodies जिनका आकार ≥ `OMNIROUTE_CHAT_LARGE_BODY_BYTES` हो,
डिफ़ॉल्ट 256 KiB, जिसमें `POST /v1/responses` शामिल है) **उसी** escape का उपयोग करता है।

दो से अधिक समवर्ती लंबे SSE `/v1/responses` के लिए यह समर्थित **एक-प्रोसेस**
विधि है: primary + स्वस्थ हेडरूम को केवल उतना ही बढ़ाएँ, जितना heap
और प्रक्रिया-व्यापी inflight-byte बजट (`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES`
/ #10110) अनुमति देते हैं। दसियों लंबे SSE clients (40–50) का मामला उसी memory-budget
से जुड़ा प्रश्न है, न कि उत्पाद की कोई कठोर “अधिकतम 2” सीमा। दबावग्रस्त heap अब भी
पुनः प्रयास योग्य `503` के साथ requests को हटाता है, ताकि #7849 दोबारा न हो।

**कई heap बनाने** के लिए, N स्वतंत्र `DATA_DIR`s चलाएँ (#11024)। एक SQLite file पर कभी भी
`replicas > 1` न रखें (#10350)। यह अनुभाग
DATA_DIR scale-out विधि को फिर से खोलने के बारे में नहीं है।
