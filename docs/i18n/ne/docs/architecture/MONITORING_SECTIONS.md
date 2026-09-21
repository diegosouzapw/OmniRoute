# Monitoring & Costs — Navigation Structure (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../architecture/MONITORING_SECTIONS.md) · 🇪🇹 [am](../../../am/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇦 [ar](../../../ar/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇿 [az](../../../az/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇬 [bg](../../../bg/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇩 [bn](../../../bn/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇿 [cs](../../../cs/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇰 [da](../../../da/docs/architecture/MONITORING_SECTIONS.md) · 🇩🇪 [de](../../../de/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇷 [el](../../../el/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇸 [es](../../../es/docs/architecture/MONITORING_SECTIONS.md) · 🇪🇪 [et](../../../et/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇷 [fa](../../../fa/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇮 [fi](../../../fi/docs/architecture/MONITORING_SECTIONS.md) · 🇫🇷 [fr](../../../fr/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇪 [ga](../../../ga/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [gu](../../../gu/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ha](../../../ha/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇱 [he](../../../he/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [hi](../../../hi/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇷 [hr](../../../hr/docs/architecture/MONITORING_SECTIONS.md) · 🇭🇺 [hu](../../../hu/docs/architecture/MONITORING_SECTIONS.md) · 🇦🇲 [hy](../../../hy/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇩 [id](../../../id/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [ig](../../../ig/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇹 [it](../../../it/docs/architecture/MONITORING_SECTIONS.md) · 🇯🇵 [ja](../../../ja/docs/architecture/MONITORING_SECTIONS.md) · 🇬🇪 [ka](../../../ka/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇭 [km](../../../km/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [kn](../../../kn/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇷 [ko](../../../ko/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇹 [lt](../../../lt/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇻 [lv](../../../lv/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ml](../../../ml/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [mr](../../../mr/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇾 [ms](../../../ms/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇹 [mt](../../../mt/docs/architecture/MONITORING_SECTIONS.md) · 🇲🇲 [my](../../../my/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇱 [nl](../../../nl/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇴 [no](../../../no/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [or](../../../or/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [pa](../../../pa/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇭 [phi](../../../phi/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇱 [pl](../../../pl/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇹 [pt](../../../pt/docs/architecture/MONITORING_SECTIONS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇴 [ro](../../../ro/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇺 [ru](../../../ru/docs/architecture/MONITORING_SECTIONS.md) · 🇱🇰 [si](../../../si/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇰 [sk](../../../sk/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇮 [sl](../../../sl/docs/architecture/MONITORING_SECTIONS.md) · 🇷🇸 [sr](../../../sr/docs/architecture/MONITORING_SECTIONS.md) · 🇸🇪 [sv](../../../sv/docs/architecture/MONITORING_SECTIONS.md) · 🇰🇪 [sw](../../../sw/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [ta](../../../ta/docs/architecture/MONITORING_SECTIONS.md) · 🇮🇳 [te](../../../te/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇭 [th](../../../th/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇷 [tr](../../../tr/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/architecture/MONITORING_SECTIONS.md) · 🇵🇰 [ur](../../../ur/docs/architecture/MONITORING_SECTIONS.md) · 🇺🇿 [uz](../../../uz/docs/architecture/MONITORING_SECTIONS.md) · 🇻🇳 [vi](../../../vi/docs/architecture/MONITORING_SECTIONS.md) · 🇳🇬 [yo](../../../yo/docs/architecture/MONITORING_SECTIONS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/architecture/MONITORING_SECTIONS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/architecture/MONITORING_SECTIONS.md)

---

> Group B (योजना 16) मा कार्यान्वयन गरिएको। `src/shared/constants/sidebarVisibility.ts` हेर्नुहोस्।

---

## उच्च-स्तरीय नेभिगेसन

ड्यासबोर्ड साइडबारमा (Group B पछि) क्रमशः यी उच्च-स्तरीय खण्डहरू छन्:

```
गृहपृष्ठ
प्रदायकहरू
कम्बोहरू
API कुञ्जीहरू
सेटिङहरू
विश्लेषण
लागतहरू          ← नयाँ (Group B, योजना 16)
अनुगमन            ← पुनर्गठित (Group B, योजना 16)
...
```

---

## लागत खण्ड (नयाँ, स्तर 1)

पाथ प्रिफिक्स: `/dashboard/costs/`

| वस्तु            | URL                                  | विवरण                                       |
| ---------------- | ------------------------------------ | ------------------------------------------- |
| अवलोकन           | `/dashboard/costs`                   | समग्र लागत ड्यासबोर्ड (विश्लेषणबाट सारिएको) |
| मूल्य निर्धारण   | `/dashboard/costs/pricing`           | प्रत्येक मोडेलको मूल्य निर्धारण तालिका      |
| बजेट             | `/dashboard/costs/budget`            | बजेट सीमाहरू + अलर्टहरू                     |
| कोटा साझेदारी    | `/dashboard/costs/quota-share`       | कोटा साझेदारी पूलहरू + प्रयोग               |
| योजना कन्फिगरेसन | `/dashboard/costs/quota-share/plans` | प्रत्येक प्रदायकका योजना ओभरराइडहरू         |

**औचित्य**: मूल्य निर्धारण, बजेट र कोटा साझेदारी पहिले
`अनुगमन > लागत प्यारामिटरहरू` अन्तर्गत थिए। तिनलाई छुट्टै उच्च-स्तरीय खण्डमा सार्दा
अवलोकनयोग्यता उपकरणहरूमा नेभिगेट नगरीकनै तिनलाई फेला पार्न सकिन्छ।

---

## अनुगमन खण्ड (पुनर्गठित)

अनुगमन खण्डमा अब सबैभन्दा माथि **गतिविधि** र त्यसपछि **3 उपसमूहहरू** छन्:

```
अनुगमन
├── गतिविधि             ← समयरेखा फिड (उच्च-स्तरीय वस्तु)
├── लग समूह
│   ├── लगहरू (सबै)
│   ├── प्रोक्सी लगहरू
│   └── कन्सोल लगहरू
├── अडिट समूह
│   ├── अडिट लग
│   ├── MCP अडिट
│   └── A2A अडिट
└── प्रणाली समूह
    ├── स्वास्थ्य
    └── रनटाइम
```

### पुरानो संरचनाबाट के परिवर्तन भयो

| पहिले                                                                                  | पछि                                           |
| -------------------------------------------------------------------------------------- | --------------------------------------------- |
| गतिविधि = अडिट लग रेन्डर गर्ने लगभित्रको ट्याब                                         | गतिविधि = समर्पित फिड (`/dashboard/activity`) |
| अनुगमनभित्रको लागत प्यारामिटर समूह                                                     | लागत खण्डमा सारिएको                           |
| समतल सूची: लगहरू, गतिविधि (लगहरू), अडिट, स्वास्थ्य, रनटाइम, मूल्य निर्धारण, बजेट, कोटा | संरचित 3-समूह + समर्पित लागत खण्ड             |

---

## गतिविधि र अडिट लगबीचको भिन्नता

यी दुई अब अलग छन्:

| आयाम                | गतिविधि (`/dashboard/activity`)                                       | अडिट लग (`/dashboard/audit`)              |
| ------------------- | --------------------------------------------------------------------- | ----------------------------------------- |
| **उद्देश्य**        | प्रयोगकर्ता-केन्द्रित घटना फिड ("हालसालै के भयो")                     | अनुपालन / सुरक्षा लग                      |
| **डेटा स्रोत**      | `GET /api/compliance/audit-log?level=high`                            | `GET /api/compliance/audit-log?level=all` |
| **ढाँचा**           | दिनअनुसार समूहबद्ध समयरेखा, मानिसले बुझ्न सक्ने क्रियापदहरू + आइकनहरू | सघन पृष्ठाङ्कित तालिका, 50/पृष्ठ          |
| **फिल्टरहरू**       | घटना प्रकारको कोटि                                                    | कार्य, गम्भीरता, कर्ता, मिति दायरा        |
| **निर्यात**         | उपलब्ध छैन                                                            | JSON निर्यात                              |
| **कर्ता फिल्टर**    | लागू हुँदैन                                                           | कर्ताअनुसार फिल्टर गर्न सकिने             |
| **देखाइने घटनाहरू** | उच्च-स्तरीय कार्यहरू मात्र (अनुमति सूची)                              | सबै अडिट घटनाहरू                          |

### उच्च-स्तरीय कार्यहरूको अनुमति सूची

`src/lib/audit/highLevelActions.ts` मा परिभाषित गरिएको छ। गतिविधि फिडमा कुन-कुन घटनाहरू
देखिन्छन् भन्ने यसले नियन्त्रण गर्छ। अनुमति सूचीमा यी समावेश छन्:

- प्रदायक थप्ने/हटाउने/परीक्षण गर्ने घटनाहरू
- कम्बो सिर्जना/अद्यावधिक/मेटाउने
- API कुञ्जीको जीवनचक्र (सिर्जना, रद्द, परिवर्तन)
- बजेट सीमा पुगेको
- प्रमाणीकरण लगइन/लगआउट
- क्लाउड एजेन्ट सत्र सिर्जना
- MCP उपकरण दर्ता
- वेबहुक सिर्जना/मेटाउने
- कोटा पूल/योजना परिवर्तनहरू (`quota.*` कार्यहरू, Group B)
- प्लेटफर्म घटनाहरू (अद्यावधिक, डिप्लोय)
- सीप स्थापना/हटाउने

यो सूचीमा नभएका घटनाहरू अडिट लगमा मात्र देखिन्छन्।

### नयाँ उच्च-स्तरीय कार्य थप्ने

`src/lib/audit/highLevelActions.ts` सम्पादन गर्नुहोस् र कार्य स्ट्रिङलाई
`HIGH_LEVEL_ACTIONS` मा थप्नुहोस्। यसका लागि PR आवश्यक हुन्छ (यो सूची कोड हो, DB बाट कन्फिगर गर्न मिल्ने होइन)।
सम्बन्धित आइकनलाई `src/lib/audit/activityIcons.ts` मा थप्न सकिन्छ।

---

## रिडाइरेक्ट: `/dashboard/logs/activity`

पुरानो पाथ `/dashboard/logs/activity` लाई
`src/app/(dashboard)/dashboard/logs/activity/page.tsx` मा रहेको `permanentRedirect()` मार्फत
`/dashboard/activity` मा स्थायी रूपमा रिडाइरेक्ट (HTTP 308) गरिएको छ।

पुरानो ID सन्दर्भ गर्ने प्रयोगकर्ता प्रिसेटहरू नबिग्रिऊन् भनेर लिगेसी साइडबार ID `logs-activity` लाई
`HIDEABLE_SIDEBAR_ITEM_IDS` मा सुरक्षित राखिएको छ
(तर `SIDEBAR_DEFINITIONS` बाट हटाइएको छ)।

---

## i18n

Group B द्वारा थपिएका नेमस्पेसहरू:

| नेमस्पेस कुञ्जी         | समेट्ने क्षेत्र                                                              |
| ----------------------- | ---------------------------------------------------------------------------- |
| `sidebar.costsSection`  | लागत खण्डको लेबल                                                             |
| `sidebar.activity`      | गतिविधि साइडबार वस्तु                                                        |
| `sidebar.logsGroup`     | लग उपसमूहको लेबल                                                             |
| `sidebar.systemGroup`   | प्रणाली उपसमूहको लेबल                                                        |
| `sidebar.costsOverview` | लागत अवलोकन वस्तु                                                            |
| `activity.*`            | गतिविधि पृष्ठका सबै स्ट्रिङहरू (शीर्षक, क्रियापदहरू, फिल्टरहरू, खाली अवस्था) |

मूल-स्रोत लोकेलहरू: `pt-BR` र `en`। अन्य सबै 40 लोकेलहरू
`next-intl` को फलब्याक संयन्त्रमार्फत अङ्ग्रेजीमा फलब्याक हुन्छन् (`src/i18n/config.ts` मा कन्फिगर गरिएको)।
