# Evaluations (Evals) (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **प्रामाणिक स्रोत:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **अंतिम अपडेट:** 2026-06-28 — v3.8.40

OmniRoute एक सामान्य मूल्यांकन फ़्रेमवर्क प्रदान करता है, जिसका उपयोग आप रूटिंग
कॉन्फ़िगरेशन, एकल प्रदाताओं/मॉडलों या साथ दिए गए "गोल्डन सेट" सुइट्स का बेंचमार्क करने के लिए कर सकते हैं।
इसका उपयोग रूटिंग परिवर्तनों को सत्यापित करने, नए प्रदाताओं को मान्य करने और रिलीज़ को
प्रोडक्शन ट्रैफ़िक पर भेजने से पहले नियंत्रित करने के लिए करें।

फ़्रेमवर्क को इस प्रकार कार्यान्वित किया गया है:

- एक शुद्ध रनर (`src/lib/evals/evalRunner.ts`), जो इन-मेमोरी
  बिल्ट-इन सुइट्स पंजीकृत करता है, अपेक्षित मानदंडों के आधार पर आउटपुट का मूल्यांकन करता है और
  स्कोरकार्ड एकत्रित करता है।
- कस्टम (उपयोगकर्ता-परिभाषित) सुइट्स और SQLite में ऐतिहासिक रनों के लिए
  एक परसिस्टेंस लेयर (`src/lib/db/evals.ts`)।
- एक ऑर्केस्ट्रेशन लेयर (`src/lib/evals/runtime.ts`), जो `POST /v1/chat/completions` पर वास्तविक कॉल
  भेजकर प्रत्येक केस निष्पादित करती है, विलंबता और आउटपुट कैप्चर करती है
  और रन को सहेजती है।
- `/api/evals/*` के अंतर्गत REST एंडपॉइंट्स (केवल प्रबंधन-प्रमाणीकरण)।
- `Dashboard → Usage → Evals` (`EvalsTab.tsx`) पर एक डैशबोर्ड इंटरफ़ेस।

## अवधारणाएँ

### सुइट

सुइट, `description` और एक या
अधिक केस वाले टेस्ट केसों का एक नामित संग्रह होता है। सुइट्स दो स्रोतों से आते हैं:

| स्रोत      | कहाँ परिभाषित है                                  | क्या रनटाइम पर परिवर्तनशील है? |
| ---------- | ------------------------------------------------- | ------------------------------ |
| `built-in` | बूट के समय `registerSuite()` के माध्यम से पंजीकृत | नहीं (कोड-परिभाषित)            |
| `custom`   | SQLite `eval_suites` + `eval_cases` में संग्रहीत  | हाँ (API/UI के माध्यम से)      |

वर्तमान बिल्ट-इन सुइट्स (`src/lib/evals/evalRunner.ts` देखें):

- `golden-set` — अभिवादन/गणित/अनुवाद/सुरक्षा से संबंधित 10 बेसलाइन केस
- `coding-proficiency` — Python/JS/SQL/TS/बग पहचान
- `reasoning-logic` — न्यायवाक्य, शाब्दिक प्रश्न, पैटर्न पहचान
- `multilingual` — अनुवाद और भाषा पहचान
- `safety-guardrails` — PII, जेलब्रेक, अस्वीकृति, पूर्वाग्रह जागरूकता
- `instruction-following` — केवल JSON, क्रमांकित सूचियाँ, भाषा संबंधी बाधाएँ
- `codex-comparison` — तुलना मोड के लिए बनाए गए आमने-सामने के कोडिंग कार्य

### केस

प्रत्येक केस में ये होते हैं:

| फ़ील्ड     | विवरण                                                                         |
| ---------- | ----------------------------------------------------------------------------- |
| `id`       | स्थिर पहचानकर्ता (आउटपुट और मेट्रिक्स की कुंजी के रूप में उपयोग किया जाता है) |
| `name`     | मनुष्यों द्वारा पढ़े जाने योग्य लेबल                                          |
| `model`    | जब रन `suite-default` लक्ष्यीकरण का उपयोग करता है, तब डिफ़ॉल्ट मॉडल           |
| `input`    | `{ messages, max_tokens? }` — `/v1/chat/completions` को भेजा जाता है          |
| `expected` | `{ strategy, value }` — स्कोरिंग मानदंड (नीचे देखें)                          |
| `tags`     | वैकल्पिक लेबल (जैसे `safety`, `pii`, `jailbreak`)                             |

### लक्ष्य

एक ही सुइट को विभिन्न लक्ष्यों के विरुद्ध चलाया जा सकता है। लक्ष्य स्कीमा
`src/shared/validation/schemas.ts` में `evalTargetSchema` है:

| लक्ष्य प्रकार   | `id`          | व्यवहार                                                                     |
| --------------- | ------------- | --------------------------------------------------------------------------- |
| `suite-default` | `null`        | प्रत्येक केस अपने बिल्ट-इन `model` फ़ील्ड का उपयोग करता है                  |
| `model`         | मॉडल का नाम   | प्रत्येक केस को एक प्रत्यक्ष मॉडल (जैसे `gpt-4o`) से चलने के लिए बाध्य करें |
| `combo`         | कॉम्बो का नाम | प्रत्येक केस को एक कॉम्बो के माध्यम से चलाएँ (रूटिंग इंजन का उपयोग करता है) |

`model` और `combo` के लिए `id` फ़ील्ड आवश्यक है (Zod
`superRefine` द्वारा लागू)। जब `compareTarget` दिया जाता है, तो दोनों लक्ष्य अलग होने चाहिए —
A/B तुलना के लिए रनर दोनों रनों को एक ही `runGroupId` के अंतर्गत सहेजता है।

## स्कोरिंग रूब्रिक्स

`evaluateCase()` (evalRunner.ts) में कार्यान्वित:

| रणनीति     | पास होने की शर्त…                                                   |
| ---------- | ------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                   |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())` |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` सत्य हो             |
| `custom`   | `expected.fn(actualOutput, evalCase)` सत्य लौटाए (केवल अंतर्निहित)  |

**नोट:** कस्टम-फ़ंक्शन स्कोरिंग कोड में परिभाषित (अंतर्निहित)
सुइट्स के लिए आरक्षित है, क्योंकि फ़ंक्शंस को API के माध्यम से क्रमबद्ध नहीं किया जा सकता।
उपयोगकर्ता द्वारा बनाए गए सुइट्स के लिए `evalCaseBuilderSchema` केवल
`contains | exact | regex` स्वीकार करता है।

वर्तमान में कोई LLM-एज़-जज या एम्बेडिंग-आधारित समानता स्कोरर नहीं है — यह
`evaluateCase()` में एक स्पष्ट विस्तार बिंदु होगा।

## डेटाबेस स्कीमा

तीन टेबल्स (माइग्रेशंस `030_create_eval_runs.sql` और
`031_create_eval_suites.sql`):

| टेबल          | उद्देश्य                                                                                                                 |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `eval_suites` | कस्टम सुइट मेटाडेटा (`id`, `name`, `description`)                                                                        |
| `eval_cases`  | प्रत्येक सुइट के केस — `input_json`, `expected_*`, `tags_json`                                                           |
| `eval_runs`   | ऐतिहासिक रन — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

अंतर्निहित सुइट्स DB में संग्रहीत **नहीं** होते हैं। वे मेमोरी में रहते हैं और
हर बार `evalRunner.ts` इम्पोर्ट किए जाने पर फिर से पंजीकृत होते हैं।

## REST API

सभी एंडपॉइंट्स के लिए प्रबंधन प्रमाणीकरण (`requireManagementAuth`) आवश्यक है — वे
सार्वजनिक प्रॉक्सी सतह का हिस्सा नहीं हैं।

| एंडपॉइंट                      | विधि     | विवरण                                                             |
| ----------------------------- | -------- | ----------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | सुइट्स + हालिया रन + स्कोरकार्ड + लक्ष्य + कुंजियाँ सूचीबद्ध करें |
| `/api/evals`                  | `POST`   | सुइट चलाएँ (एकल या तुलना) — स्कीमा `evalRunSuiteSchema`           |
| `/api/evals/{suiteId}`        | `GET`    | एक सुइट प्राप्त करें (अंतर्निहित या कस्टम)                        |
| `/api/evals/suites`           | `POST`   | कस्टम सुइट बनाएँ — स्कीमा `evalSuiteSaveSchema`                   |
| `/api/evals/suites/{suiteId}` | `GET`    | कस्टम सुइट प्राप्त करें                                           |
| `/api/evals/suites/{suiteId}` | `PUT`    | कस्टम सुइट बदलें (केस फिर से इन्सर्ट किए जाते हैं)                |
| `/api/evals/suites/{suiteId}` | `DELETE` | कस्टम सुइट और उसके केस हटाएँ                                      |

### सुइट चलाना

```bash
curl -X POST http://localhost:20128/api/evals \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "suiteId": "golden-set",
    "target": { "type": "combo", "id": "my-combo" },
    "apiKeyId": "optional-api-key-uuid"
  }'
```

वैकल्पिक फ़ील्ड्स:

- `outputs` — पहले से परिकलित आउटपुट्स का `Record<caseId, string>`। इसे प्रदान करने पर,
  रनर **डिस्पैच छोड़ देता है** और केवल कैश किए गए आउटपुट्स को स्कोर करता है (ऑफ़लाइन
  मूल्यांकन के लिए उपयोगी)।
- `compareTarget` — समानांतर रूप से चलाने के लिए दूसरा लक्ष्य; आमने-सामने देखने हेतु दोनों रन
  जनरेट किया गया `runGroupId` साझा करते हैं।
- `apiKeyId` — डिस्पैच की गई `/v1/chat/completions` कॉल्स को प्रमाणित करने के लिए उपयोग की जाने वाली
  आंतरिक API कुंजी। `REQUIRE_API_KEY` सक्षम होने पर आवश्यक है।

### कस्टम सुइट बनाना

```bash
curl -X POST http://localhost:20128/api/evals/suites \
  -H "Cookie: auth_token=..." \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production smoke",
    "description": "Quick sanity check before deploy",
    "cases": [
      {
        "name": "JSON shape",
        "model": "gpt-4o",
        "input": { "messages": [{ "role": "user", "content": "Reply with {\"ok\": true}" }] },
        "expected": { "strategy": "regex", "value": "\"ok\"\\s*:\\s*true" }
      }
    ]
  }'
```

## डिस्पैच पाइपलाइन

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. सुइट (बिल्ट-इन या कस्टम) को रिज़ॉल्व करता है।
2. प्रत्येक केस के लिए, केस के `messages`, रिज़ॉल्व किए गए `model`, `stream: false`, और `max_tokens: 512`
   (या केस के ओवरराइड) के साथ `/v1/chat/completions` के लिए एक `Request` बनाता है।
3. चैट हैंडलर को सीधे कॉल करता है (इन-प्रोसेस — कोई अतिरिक्त HTTP हॉप नहीं)।
4. लेटेंसी कैप्चर करता है और `choices[0].message.content`
   या Responses-API के `output[]` पेलोड से टेक्स्ट निकालता है।
5. `runSuite()` के माध्यम से सभी आउटपुट को स्कोर करता है, फिर `saveEvalRun()` के माध्यम से उन्हें स्थायी रूप से सहेजता है।

केस **क्रमिक रूप से** चलते हैं। वर्तमान में कोई कन्करेंसी फ़्लैग नहीं है।

## डैशबोर्ड

UI `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`) पर उपलब्ध है। वहाँ से आप:

- केस-दर-केस पूर्वावलोकन के साथ बिल्ट-इन और कस्टम सुइट ब्राउज़ कर सकते हैं।
- केस बिल्डर के साथ कस्टम सुइट बना/संपादित/हटा सकते हैं।
- कोई लक्ष्य (सुइट डिफ़ॉल्ट / मॉडल / कॉम्बो), वैकल्पिक रूप से दूसरा
  `compareTarget`, और वैकल्पिक रूप से एक API कुंजी चुनकर, माँग पर रन कर सकते हैं।
- रन इतिहास, प्रत्येक केस का पास/फ़ेल परिणाम, लेटेंसी और कैप्चर किए गए आउटपुट देख सकते हैं।
- प्रत्येक `(suite, target)` स्कोप के नवीनतम रन पर एकत्रित रोलिंग स्कोरकार्ड देख सकते हैं।

## Auto-Assessment RFC के साथ संबंध

एक अलग, अधिक सीमित असेसमेंट सबसिस्टम `src/domain/assessment/` पर मौजूद है
(लाइव स्कोरिंग इंजन के लिए [AUTO-COMBO.md](../routing/AUTO-COMBO.md) भी देखें)।
वह सबसिस्टम Auto Combo इंजन को लक्षित करता है — प्रोवाइडर और मॉडल को स्वचालित रूप से स्कोर करता है, ताकि अपस्ट्रीम विफल होने पर कॉम्बो अपने-आप ठीक हो सकें। वह अपने स्वयं के रनर,
कैटेगराइज़र और स्कोरिंग लॉजिक का उपयोग करता है।

यहाँ दस्तावेज़ीकृत Evals फ़्रेमवर्क **अधिक व्यापक, सामान्य-उद्देश्य वाला
परीक्षण इंटरफ़ेस** है। मनमाने रिग्रेशन सुइट, A/B तुलना
और प्रत्येक रिलीज़ के स्मोक टेस्ट के लिए इसे प्राथमिकता दें। जब रूटिंग निर्णयों को प्रभावित करने हेतु
रीयल-टाइम प्रोवाइडर स्वास्थ्य की आवश्यकता हो, तब Auto-Assessment सबसिस्टम का उपयोग करें।

## CI एकीकरण

वर्तमान में कोई समर्पित `eval:ci` npm स्क्रिप्ट नहीं है। यदि आप eval परिणामों के आधार पर
रिलीज़ को गेट करना चाहते हैं, तो दो रास्ते हैं:

- **HTTP रास्ता**: सर्वर शुरू करें, ज्ञात
  `suiteId` + `target` के साथ `POST /api/evals` को अनुरोध भेजें, और प्रतिक्रिया में
  `runs[].summary.passRate >= N` की पुष्टि करें।
- **इन-प्रोसेस रास्ता**: किसी स्क्रिप्ट से
  `@/lib/evals/runtime` का `runEvalSuiteAgainstTarget()` इम्पोर्ट करें, टेस्ट DB के विरुद्ध रन करें, और लौटाए गए
  `PersistedEvalRun.summary` की जाँच करें।

रूट और इतिहास को कवर करने वाले टेस्ट
`tests/unit/evals-route.test.ts` और `tests/unit/evals-history.test.ts` पर मौजूद हैं।

## विस्तार बिंदु

सामान्य बदलाव और उन्हें करने के स्थान:

- **नई स्कोरिंग रणनीति** — `evaluateCase()` (`evalRunner.ts`) में
  `switch (evalCase.expected.strategy)` ब्लॉक का विस्तार करें और
  `src/lib/db/evals.ts` में `EvalCaseStrategy` तथा `schemas.ts` में `evalCaseBuilderSchema` को विस्तृत करें।
- **नया बिल्ट-इन सुइट** — एक सुइट ऑब्जेक्ट परिभाषित करें और
  `evalRunner.ts` के अंत में `registerSuite()` कॉल करें। इसे `listSuites()` द्वारा स्वतः खोज लिया जाएगा।
- **कन्करेंसी के साथ रन करें** — `runEvalSuiteAgainstTarget()` के क्रमिक `for` लूप को
  सीमित `Promise.all` में बदलें (वर्तमान में कोई कन्करेंसी
  नियंत्रण उपलब्ध नहीं है)।
- **स्ट्रीम/टूल-कॉल केस** — वर्तमान में रनर `stream: false` को बाध्य करता है।
  स्ट्रीमिंग या टूल-अवेयर मूल्यांकन के लिए `runtime.ts` में बदलाव आवश्यक होंगे
  (स्कोरिंग से पहले SSE चंक्स को कैप्चर और एकत्रित करें)।

## यह भी देखें

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — उत्पाद का समग्र चरण-दर-चरण मार्गदर्शन
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — अनुरोध पाइपलाइन संदर्भ
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo स्कोरिंग इंजन (लाइव रनटाइम)
- स्रोत: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
