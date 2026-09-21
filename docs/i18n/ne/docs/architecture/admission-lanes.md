# Admission lanes (#9654) — two lane systems, what gates each, where each reports (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/admission-lanes.md) · 🇪🇹 [am](../../../am/docs/architecture/admission-lanes.md) · 🇸🇦 [ar](../../../ar/docs/architecture/admission-lanes.md) · 🇦🇿 [az](../../../az/docs/architecture/admission-lanes.md) · 🇧🇬 [bg](../../../bg/docs/architecture/admission-lanes.md) · 🇧🇩 [bn](../../../bn/docs/architecture/admission-lanes.md) · 🇨🇿 [cs](../../../cs/docs/architecture/admission-lanes.md) · 🇩🇰 [da](../../../da/docs/architecture/admission-lanes.md) · 🇩🇪 [de](../../../de/docs/architecture/admission-lanes.md) · 🇬🇷 [el](../../../el/docs/architecture/admission-lanes.md) · 🇪🇸 [es](../../../es/docs/architecture/admission-lanes.md) · 🇪🇪 [et](../../../et/docs/architecture/admission-lanes.md) · 🇮🇷 [fa](../../../fa/docs/architecture/admission-lanes.md) · 🇫🇮 [fi](../../../fi/docs/architecture/admission-lanes.md) · 🇫🇷 [fr](../../../fr/docs/architecture/admission-lanes.md) · 🇮🇪 [ga](../../../ga/docs/architecture/admission-lanes.md) · 🇮🇳 [gu](../../../gu/docs/architecture/admission-lanes.md) · 🇳🇬 [ha](../../../ha/docs/architecture/admission-lanes.md) · 🇮🇱 [he](../../../he/docs/architecture/admission-lanes.md) · 🇮🇳 [hi](../../../hi/docs/architecture/admission-lanes.md) · 🇭🇷 [hr](../../../hr/docs/architecture/admission-lanes.md) · 🇭🇺 [hu](../../../hu/docs/architecture/admission-lanes.md) · 🇦🇲 [hy](../../../hy/docs/architecture/admission-lanes.md) · 🇮🇩 [id](../../../id/docs/architecture/admission-lanes.md) · 🇳🇬 [ig](../../../ig/docs/architecture/admission-lanes.md) · 🇮🇹 [it](../../../it/docs/architecture/admission-lanes.md) · 🇯🇵 [ja](../../../ja/docs/architecture/admission-lanes.md) · 🇬🇪 [ka](../../../ka/docs/architecture/admission-lanes.md) · 🇰🇭 [km](../../../km/docs/architecture/admission-lanes.md) · 🇮🇳 [kn](../../../kn/docs/architecture/admission-lanes.md) · 🇰🇷 [ko](../../../ko/docs/architecture/admission-lanes.md) · 🇱🇹 [lt](../../../lt/docs/architecture/admission-lanes.md) · 🇱🇻 [lv](../../../lv/docs/architecture/admission-lanes.md) · 🇮🇳 [ml](../../../ml/docs/architecture/admission-lanes.md) · 🇮🇳 [mr](../../../mr/docs/architecture/admission-lanes.md) · 🇲🇾 [ms](../../../ms/docs/architecture/admission-lanes.md) · 🇲🇹 [mt](../../../mt/docs/architecture/admission-lanes.md) · 🇲🇲 [my](../../../my/docs/architecture/admission-lanes.md) · 🇳🇱 [nl](../../../nl/docs/architecture/admission-lanes.md) · 🇳🇴 [no](../../../no/docs/architecture/admission-lanes.md) · 🇮🇳 [or](../../../or/docs/architecture/admission-lanes.md) · 🇮🇳 [pa](../../../pa/docs/architecture/admission-lanes.md) · 🇵🇭 [phi](../../../phi/docs/architecture/admission-lanes.md) · 🇵🇱 [pl](../../../pl/docs/architecture/admission-lanes.md) · 🇵🇹 [pt](../../../pt/docs/architecture/admission-lanes.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/admission-lanes.md) · 🇷🇴 [ro](../../../ro/docs/architecture/admission-lanes.md) · 🇷🇺 [ru](../../../ru/docs/architecture/admission-lanes.md) · 🇱🇰 [si](../../../si/docs/architecture/admission-lanes.md) · 🇸🇰 [sk](../../../sk/docs/architecture/admission-lanes.md) · 🇸🇮 [sl](../../../sl/docs/architecture/admission-lanes.md) · 🇷🇸 [sr](../../../sr/docs/architecture/admission-lanes.md) · 🇸🇪 [sv](../../../sv/docs/architecture/admission-lanes.md) · 🇰🇪 [sw](../../../sw/docs/architecture/admission-lanes.md) · 🇮🇳 [ta](../../../ta/docs/architecture/admission-lanes.md) · 🇮🇳 [te](../../../te/docs/architecture/admission-lanes.md) · 🇹🇭 [th](../../../th/docs/architecture/admission-lanes.md) · 🇹🇷 [tr](../../../tr/docs/architecture/admission-lanes.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/admission-lanes.md) · 🇵🇰 [ur](../../../ur/docs/architecture/admission-lanes.md) · 🇺🇿 [uz](../../../uz/docs/architecture/admission-lanes.md) · 🇻🇳 [vi](../../../vi/docs/architecture/admission-lanes.md) · 🇳🇬 [yo](../../../yo/docs/architecture/admission-lanes.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/admission-lanes.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/admission-lanes.md)

---

OmniRoute मा फरक दायरा भएका **दुई** प्रक्रिया-स्थानीय लेन प्रणालीहरू छन्। यी
एकअर्काका पूरक हुन्; सञ्चालकहरूले आफूले कुन प्रणाली हेरिरहेका छन् भन्ने थाहा पाउनुपर्छ।

## 1. बाइट-स्तरीय प्रक्रियाभरि लागू हुने प्रवेश (`chatBodyAdmission.ts`)

- **दायरा:** `POST /v1/chat/completions`, `/v1/messages`, `/v1/responses`, र
  अन्य च्याट-जस्ता रुटहरूका लागि बफर गरिएको-बडी/हिप मार्ग। ठूला कोडिङ-एजेन्ट
  बडीहरूबाट हुने हिप विस्तारविरुद्ध सुरक्षा दिन्छ (#4380)।
- **प्रत्येक कुञ्जीका लागि छुट्टाछुट्टै लेन होइन, एउटै प्रक्रिया-व्यापी नियन्त्रक (#10110)।**
  प्रत्येक API कुञ्जी (ह्यास गरिएको) वा `anonymous` सत्रले **उही** साझा बजेटविरुद्ध
  प्रवेश पाउँछ — ह्यास गरिएको सत्र id लाई निष्पक्षता समयतालिका कुञ्जीका रूपमा मात्र
  प्रयोग गरिन्छ (प्रतीक्षारत अनुरोधहरूमा राउन्ड-रोबिन प्रेषण), क्षमता खण्डका रूपमा
  कहिल्यै प्रयोग गरिँदैन। यस कागजातको अघिल्लो संस्करणले स्वतन्त्र क्षमता भएका
  प्रत्येक-कुञ्जी लेनहरू वर्णन गरेको थियो; उक्त मोडेललाई #10110 मा हटाइयो, किनभने
  यसले प्रमाणीकरण नगरिएका नक्कली प्रमाणहरू प्रयोग गरी प्रक्रिया-व्यापी सीमा गुणा
  गर्न दिन्थ्यो।
- **गेट (#503-fanout): स्थिर अनुरोध सङ्ख्या होइन, स्वतः-व्युत्पन्न इन्जेस्ट BYTE
  बजेट।** पुरानो `CHAT_MAX_HEAVY_IN_FLIGHT` अनुरोध-सङ्ख्या सीमा (यो सुधारअघि
  पूर्वनिर्धारित `1`) ले कोडिङ-एजेन्ट फ्यान-आउट (धेरै सबएजेन्ट/CLI,
  नियमित रूपमा > 256 KB हुने बडीहरू) लाई प्रभावकारी समवर्तीता ~1 मा सीमित
  गर्थ्यो, जसका कारण पूर्णतया सामान्य लोडमा पनि 503 प्रतिक्रिया आउँथ्यो। अब
  सञ्चालकले स्पष्ट रूपमा `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` सेट गरेको अवस्थामा
  मात्र यो लागू हुन्छ। यसलाई सेट नगरी छोड्दा, प्रवेशलाई यसको सट्टा
  `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` ले नियन्त्रण गर्छ — प्रक्रियाको वास्तविक
  मेमोरी सीमाबाट स्वतः-व्युत्पन्न बजेट (`src/shared/middleware/admissionBudget.ts`):
  V8 हिप सीमा र कुनै पनि cgroup/कन्टेनर सीमामध्ये कडा सीमाको 25%,
  8x अस्थायी-विस्तार गुणकले भाग गरिएको, र 8 MiB देखि 2 GiB बीच सीमित।
  स्पष्ट रूपमा दिइएका ओभरराइडहरूले पनि उही सीमाहरू प्रयोग गर्छन्। यसले कुनै env
  समायोजनबिनै 512 MB कन्टेनरदेखि 32 GB डेस्कटपसम्म आफैँलाई मापनअनुकूल बनाउँछ।
  प्रभावकारी बजेटभित्र अटाउन नसक्ने बडी तुरुन्तै `413 body_exceeds_budget` सहित
  असफल हुन्छ; व्यक्तिगत रूपमा सेवा दिन सकिने बडीहरूबीचको प्रतिस्पर्धा मात्र
  सीमित निष्पक्षता पङ्क्तिमा प्रवेश गर्छ। प्रत्यक्ष बहु-सङ्केत स्रोत-दबाब ट्र्याकर
  (V8 हिप अनुपात, cgroup, PSI, OOM घटनाहरू —
  `open-sse/utils/resourcePressurePolicy.ts`) ले `high` दबाबमा सीमित प्रतीक्षा
  अवधि छोट्याउँछ र कुनै पनि बाइट इन्जेस्ट हुनुअघि नै `critical` दबाबमा
  `503 resource_pressure` सहित तुरुन्तै लोड हटाउँछ।
- **समायोजन:**
  - `OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` — स्वतः-व्युत्पन्न बाइट बजेटका लागि ओभरराइड
  - `OMNIROUTE_CHAT_MAX_HEAVY_IN_FLIGHT` — पुरानो अनुरोध-सङ्ख्या सीमा, स्वैच्छिक रूपमा मात्र सक्षम
  - `OMNIROUTE_CHAT_ADMISSION_QUEUE_MS` — 503 अघि पङ्क्ति-प्रतीक्षा (पूर्वनिर्धारित 2000)
  - `OMNIROUTE_CHAT_ADMISSION_MAX_QUEUED_BYTES` — पङ्क्तिबद्ध-बाइट हिप भल्भ (पूर्वनिर्धारित 4 MB)
  - `OMNIROUTE_CHAT_VIRTUAL_TTL_MS` / `OMNIROUTE_CHAT_VIRTUAL_MAX_SESSIONS` — #10110 देखि अप्रचलित
    प्रभावहीन विकल्पहरू (कन्फिगरेसन अनुकूलताका लागि स्वीकार गरिन्छ, बेवास्ता गरिन्छ)
- **प्रतिवेदनहरू:** `GET /api/monitoring/health` → `chatAdmission` (#11244) — जसमा
  #503-fanout का थप विवरणहरू `inflightBytes`, `maxInflightBytes`, `budgetSource`
  (`v8_heap` | `cgroup` | `override`), `pressureSeverity`, र `countCapEnabled`
  (पूर्वनिर्धारित डिप्लोयमेन्टमा false — वास्तवमा लागू भइरहेको सीमा पुरानो
  सङ्ख्या सीमा नभई बाइट बजेट हो भन्ने पुष्टि गर्छ) समावेश छन्।

## 2. अनुकूली रनटाइम भर्चुअल लेनहरू (`open-sse/services/admission`)

- **दायरा:** प्रदायक डिस्प्याचका लागि tenant-key admission — क्यु लागत, विलम्बता-निर्देशित
  सीमा अनुकूलन, लेन क्युइङ, र लेन मेट्रिक्स।
- **गेट:** **स्वैच्छिक रूपमा सक्षम गर्नुपर्ने।** `OMNIROUTE_CHAT_VIRTUAL_LANES=true` नभएसम्म असक्षम रहन्छ। यो नहुँदा,
  अनुकूली नियन्त्रकले साझा क्युको व्यवहार कायम राख्छ (#9654 को मापदण्ड 1
  अपरेटरले लेनहरू सक्षम गरेपछि मात्र पूरा हुन्छ)।
- **ट्युनिङ:** `OMNIROUTE_CHAT_VIRTUAL_LANES` + अनुकूली कन्फिग (`maxQueueCount`,
  `maxQueueCost`, `defaultMaxWaitMs`, …)।
- **रिपोर्टहरू:** `GET /api/monitoring/health` → `adaptiveAdmission` → `laneCount`,
  `laneQueuedCount`, `laneQueuedCost`, `laneTenants` (अपारदर्शी लेन ID हरू, कच्चा
  कुञ्जीहरू कहिल्यै होइन), र `virtualLanes` — स्न्यापसटमा "लेनहरू सक्रिय छन्" भन्ने आधिकारिक फ्ल्याग।

## 3. फ्यान-आउट प्रोबहरू — कम्बो/फ्युजनका लागि प्रति-लक्ष्य admission (#9654 Wave 2)

कम्बो (प्राथमिकता / राउन्ड-रोबिन) र फ्युजनले एउटै मूल अनुरोधअन्तर्गत N मोडेल लक्ष्यहरूमा
फ्यान-आउट गर्छन्। #9654 Wave 2 देखि, **प्रत्येक फ्यान-आउट लक्ष्यलाई डिस्प्याचअघि गेट गरिन्छ**
**मूल अनुरोधको** टेनन्ट लेनविरुद्धको प्रति-लक्ष्य प्रोब (`PerTargetAdmissionHook`, जसलाई
`createPerTargetAdmissionHook` ले निर्माण गर्छ) द्वारा।

- **दायरा:** कम्बो, फ्युजन, र chaos engine द्वारा डिस्प्याच गरिने प्रत्येक फ्यान-आउट लक्ष्य।
  प्रणाली 1 (बाइट-स्तर) अप्रभावित रहन्छ — यसले फ्यान-आउट लक्ष्यहरू कहिल्यै प्रोब गर्दैन।
- **गेट:** **प्रणाली 2 सँग स्वैच्छिक रूपमा सक्षम गर्नुपर्ने।** `OMNIROUTE_CHAT_VIRTUAL_LANES`
  सेट नगरिएको अवस्थामा कुनै कार्य गर्दैन — त्यस मोडमा मूल अनुरोधसँग पहिल्यै साझा-क्यु लिज हुन्छ,
  त्यसैले प्रोब गर्दा दोहोरो गणना हुने र कम्बो लक्ष्यहरू अस्वीकार हुने थियो।
- **अर्थविज्ञान:**
  - **पूर्ण रूपमा गैर-अवरोधकारी — छोड्ने, कहिल्यै क्युमा नराख्ने।** `maxWaitMs 0`: भरिएको लेनले
    लक्ष्य छोड्छ र त्यसको सट्टा कम्बोको फलब्याक संयन्त्र (वा फ्युजनको बाँचेको
    प्यानल) ले सेवा दिन्छ। यो जानाजानी गरिएको हो: फ्यान-आउट लक्ष्य अनावश्यक दोहोरिएको
    काम हो, र त्यसलाई क्युमा राख्दा लेनहरूले रोक्न खोजेको ठ्याक्कै त्यही भीडमा थप
    लोड थुप्रिन्छ। त्यसैले `defaultMaxWaitMs` **मूल अनुरोधमा मात्र** लागू हुन्छ;
    फ्यान-आउट प्रोबहरू कहिल्यै पर्खँदैनन्, र तिनलाई पर्खाउने **कुनै नब जानाजानी
    राखिएको छैन** (समस्याको इतिहासले देखाउँछ कि प्रतीक्षा नबहरूले #9654 ले रोक्ने
    व्यापक-502/504 वर्ग सिर्जना गरेका थिए — कुनै अपरेटरले छोडिएका फ्यान-आउट लक्ष्यहरूले
    प्रतिक्रियाको गुणस्तर बिगारेको रिपोर्ट गरेमा मात्र पुनर्विचार गर्नुहोस्)।
  - **admit भएपछि रिलिज।** स्वीकृत प्रोबले आफ्नो लिज तुरुन्तै रिलिज गर्छ: यो
    क्षमता गेट हो, होल्ड होइन। मूल अनुरोधको लिजले फ्यान-आउट समेट्छ; थप N लिज होल्ड गर्दा
    साझा सक्रिय लागत कृत्रिम रूपमा बढ्ने र अन्य टेनन्टहरू अस्वीकार हुने थियो। यो सक्दो
    प्रयास हो, आरक्षण होइन: प्रोब र डिस्प्याचको बीचमा लेन फेरि भरिन सक्छ, त्यसैले
    अत्यधिक प्रतिस्पर्धामा गेटले लक्ष्य डिस्प्याच हुने बेलासम्म फेरि भरिसकेको लेनमा
    प्रवेश स्वीकृत गर्न सक्छ।
  - **वास्तविक फ्यान-आउट बडीबाट मूल्याङ्कन।** प्रोबले लक्ष्यको वास्तविक बडीबाट लागत
    अनुमान गर्छ — यसको `stream` फ्ल्यागबाट निकालिएको अनुरोध वर्गसहित, मूल पथमा जस्तै —
    त्यसैले फ्युजन प्यानलका सदस्यहरू (`stream: false`) ले वास्तवमै ओगट्ने गैर-स्ट्रिमिङ
    वर्गअनुसार मूल्य पाउँछन्, र प्राथमिकता/RR लक्ष्यहरूले प्रयोगकर्ताले अनुरोध गरेअनुसार
    मूल्य पाउँछन्।
- **रिपोर्टहरू:** पहिलो लक्ष्यपछिको प्रोब स्किपले कम्बोको प्रति-अनुरोध
  `fallbackCount` बढाउँछ (विद्यमान फलब्याक अर्थविज्ञानलाई प्रतिबिम्बित गर्दै; कम्बो
  लगहरूमा देखिने); प्रत्येक प्यानल सदस्य छोडिएमा फ्युजनले 503 फर्काउँछ। हाल स्न्यापसटमा
  **कुनै समग्र काउन्टर छैन** (जस्तै `virtualFanoutSkipped`) — अपरेटरले लेन गेटले
  फ्यान-आउट लक्ष्यहरू कति पटक छोड्छ भनेर थाहा पाउन नसकेको रिपोर्ट गरेमा, त्यही एउटा
  काउन्टर थप्ने ट्रिगर हो।

## ड्यासबोर्डमा कुन देखिन्छ

- `adaptiveAdmission.laneCount` / `laneTenants` → **अनुकूलनीय भर्चुअल लेनहरू** (प्रणाली 2)।
- `adaptiveAdmission.virtualLanes === true` → खण्ड 3 का फ्यान-आउट प्रोबहरू पनि
  सक्रिय छन्। `virtualLanes` नभएको वा `false` भएको पेलोडको अर्थ
  `OMNIROUTE_CHAT_VIRTUAL_LANES` सेट गरिएको छैन भन्ने हो — बाइट-स्तरीय लेनहरू (प्रणाली 1)
  अझै सक्रिय छन्, तर यसलाई सक्षम नगरिएसम्म `adaptiveAdmission` अन्तर्गतको कुनै कुरा
  (र कुनै फ्यान-आउट गेटिङ) प्रभावमा हुँदैन।

## दुवै किन छन्

बाइट-स्तरीय लेनहरूले धेरै मेमोरी खपत गर्ने पार्स/कम्प्रेस पथलाई सीमित गर्छन्; अनुकूलनीय लेनहरूले
प्रति टेनन्ट डिस्प्याच लागतलाई सीमित गर्छन्। #9654 को मापदण्ड 1 ("एउटा सेसनको बर्स्टले
अर्कोलाई 503 गराउँदैन") प्रणाली 1 द्वारा सधैँ लागू गरिन्छ र अप्ट-इन सक्षम भएपछि प्रणाली 2
द्वारा पनि लागू गरिन्छ।

## 4. एक-प्रोसेसमा लामो `/v1/responses` (स्वस्थ-हेडरुम)

[#10437](https://github.com/diegosouzapw/OmniRoute/pull/10437) ले
`tryAcquireHealthyHeadroom` थप्यो, जसले हिप
`OMNIROUTE_CHAT_ADMISSION_HEAP_SHED_RATIO` भन्दा तल हुँदा संरचनात्मक रूपमा भारी दोस्रो अनुरोधलाई प्रवेश दिन्छ। `admitChatRequest` ले प्रयोग गर्ने BYTE
पथले (`OMNIROUTE_CHAT_LARGE_BODY_BYTES` वा सोभन्दा ठूला बडीहरू,
पूर्वनिर्धारित 256 KiB, `POST /v1/responses` सहित) **उही** छुट प्रयोग गर्छ।

दुईभन्दा बढी समवर्ती लामो SSE `/v1/responses` का लागि यो समर्थित **एक-प्रोसेस**
विधि हो: हिप र प्रोसेस-व्यापी इन्फ्लाइट-बाइट बजेट
(`OMNIROUTE_CHAT_MAX_INFLIGHT_BYTES` / #10110) ले अनुमति दिएसम्म मात्र प्राथमिक +
स्वस्थ-हेडरुम बढाउनुहोस्। दसौँ लामो SSE क्लाइन्टहरू (40–50) मेमोरी-बजेटसम्बन्धी
प्रश्न हो, उत्पादनको कठोर “अधिकतम 2” सीमा होइन। दबाबमा परेको हिपले अझै पनि पुनः प्रयास गर्न मिल्ने
`503` मार्फत लोड घटाउँछ, त्यसैले #7849 पुनः देखा पर्दैन।

**हिपहरू गुणा गर्न**, N वटा स्वतन्त्र `DATA_DIR` चलाउनुहोस् (#11024)। एउटै SQLite फाइलमा
कहिल्यै `replicas > 1` नगर्नुहोस् (#10350)। यो खण्ड DATA_DIR स्केल-आउट विधिलाई
पुनः खोल्नका लागि होइन।
