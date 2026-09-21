# Evaluations (Evals) (नेपाली)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇮🇳 [mr](../../../mr/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **आधिकारिक स्रोत:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **अन्तिम अद्यावधिक:** 2026-06-28 — v3.8.40

OmniRoute सँग एउटा सामान्य मूल्याङ्कन फ्रेमवर्क उपलब्ध हुन्छ, जसलाई तपाईंले राउटिङ
कन्फिगरेसनहरू, एकल प्रदायक/मोडेलहरू वा सँगै उपलब्ध गराइएका "golden set" सुइटहरूको बेन्चमार्क गर्न प्रयोग गर्न सक्नुहुन्छ।
यसलाई राउटिङ परिवर्तनहरू प्रमाणित गर्न, नयाँ प्रदायकहरू मान्य गर्न र तिनलाई उत्पादन ट्राफिकमा
प्रवर्द्धन गर्नुअघि रिलिजहरू नियन्त्रण गर्न प्रयोग गर्नुहोस्।

फ्रेमवर्कलाई निम्न रूपमा कार्यान्वयन गरिएको छ:

- एउटा शुद्ध रनर (`src/lib/evals/evalRunner.ts`), जसले मेमोरीमा रहने
  अन्तर्निर्मित सुइटहरू दर्ता गर्छ, अपेक्षित मापदण्डअनुसार आउटपुटहरूको मूल्याङ्कन गर्छ र
  स्कोरकार्डहरू एकत्रित गर्छ।
- अनुकूलित (प्रयोगकर्ताद्वारा परिभाषित) सुइटहरू र SQLite मा रहेका ऐतिहासिक रनहरूका लागि
  एउटा स्थायित्व तह (`src/lib/db/evals.ts`)।
- एउटा अर्केस्ट्रेसन तह (`src/lib/evals/runtime.ts`), जसले `POST /v1/chat/completions` मा
  वास्तविक कलहरू पठाएर प्रत्येक केस कार्यान्वयन गर्छ, विलम्बता र आउटपुटहरू
  क्याप्चर गर्छ र रनलाई स्थायी रूपमा भण्डारण गर्छ।
- `/api/evals/*` अन्तर्गतका REST इन्डपोइन्टहरू (व्यवस्थापन-प्रमाणीकरणका लागि मात्र)।
- `Dashboard → Usage → Evals` मा रहेको ड्यासबोर्ड इन्टरफेस (`EvalsTab.tsx`)।

## अवधारणाहरू

### सुइट

सुइट भनेको `description` र एक वा बढी केसहरू भएको परीक्षण केसहरूको नाम दिइएको सङ्ग्रह हो।
सुइटहरू दुई स्रोतबाट आउँछन्:

| स्रोत      | परिभाषित गरिएको स्थान                              | रनटाइममा परिवर्तनयोग्य?   |
| ---------- | -------------------------------------------------- | ------------------------- |
| `built-in` | बुट हुँदा `registerSuite()` मार्फत दर्ता गरिएको    | होइन (कोडद्वारा परिभाषित) |
| `custom`   | SQLite को `eval_suites` + `eval_cases` मा भण्डारित | हो (API/UI मार्फत)        |

हालका अन्तर्निर्मित सुइटहरू (`src/lib/evals/evalRunner.ts` हेर्नुहोस्):

- `golden-set` — अभिवादन/गणित/अनुवाद/सुरक्षासम्बन्धी 10 आधारभूत केसहरू
- `coding-proficiency` — Python/JS/SQL/TS/बग पहिचान
- `reasoning-logic` — न्यायवाक्य, शाब्दिक समस्याहरू, ढाँचा पहिचान
- `multilingual` — अनुवाद र भाषा पहिचान
- `safety-guardrails` — PII, जेलब्रेक, अस्वीकार, पूर्वाग्रहसम्बन्धी सचेतना
- `instruction-following` — JSON-मात्र, क्रमाङ्कित सूचीहरू, भाषासम्बन्धी सीमाहरू
- `codex-comparison` — तुलना मोडका लागि लक्षित प्रत्यक्ष प्रतिस्पर्धात्मक कोडिङ कार्यहरू

### केस

प्रत्येक केसमा निम्न कुरा हुन्छन्:

| फिल्ड      | विवरण                                                                         |
| ---------- | ----------------------------------------------------------------------------- |
| `id`       | स्थिर पहिचानकर्ता (आउटपुट र मेट्रिकहरूलाई कुञ्जी दिन प्रयोग गरिने)            |
| `name`     | मानिसले पढ्न सक्ने लेबल                                                       |
| `model`    | रनले `suite-default` लक्ष्यीकरण प्रयोग गर्दा प्रयोग हुने पूर्वनिर्धारित मोडेल |
| `input`    | `{ messages, max_tokens? }` — `/v1/chat/completions` मा पठाइने                |
| `expected` | `{ strategy, value }` — स्कोरिङ मापदण्ड (तल हेर्नुहोस्)                       |
| `tags`     | वैकल्पिक लेबलहरू (जस्तै `safety`, `pii`, `jailbreak`)                         |

### लक्ष्य

एउटै सुइटलाई फरक-फरक लक्ष्यहरूविरुद्ध चलाउन सकिन्छ। लक्ष्य स्किमा
`src/shared/validation/schemas.ts` मा रहेको `evalTargetSchema` हो:

| लक्ष्यको प्रकार | `id`        | व्यवहार                                                                           |
| --------------- | ----------- | --------------------------------------------------------------------------------- |
| `suite-default` | `null`      | प्रत्येक केसले आफ्नो अन्तर्निर्मित `model` फिल्ड प्रयोग गर्छ                      |
| `model`         | मोडेलको नाम | प्रत्येक केसलाई एउटै प्रत्यक्ष मोडेलमार्फत अनिवार्य रूपमा चलाउँछ (जस्तै `gpt-4o`) |
| `combo`         | कम्बोको नाम | प्रत्येक केसलाई एउटै कम्बोमार्फत चलाउँछ (राउटिङ इन्जिनको परीक्षण गर्छ)            |

`model` र `combo` का लागि `id` फिल्ड अनिवार्य छ (Zod
`superRefine` द्वारा लागू गरिएको)। `compareTarget` प्रदान गरिएको अवस्थामा, दुवै लक्ष्य फरक हुनुपर्छ —
A/B तुलनाका लागि रनरले एउटै `runGroupId` अन्तर्गत दुवै रनहरू स्थायी रूपमा भण्डारण गर्छ।

## स्कोरिङ रुब्रिकहरू

`evaluateCase()` (evalRunner.ts) मा कार्यान्वयन गरिएको:

| रणनीति     | उत्तीर्ण हुने अवस्था…                                                                 |
| ---------- | ------------------------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                                     |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`                   |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` सत्य हुन्छ                            |
| `custom`   | `expected.fn(actualOutput, evalCase)` ले सत्य मान फिर्ता गर्छ (अन्तर्निर्मितमा मात्र) |

**नोट:** अनुकूलन-प्रकार्य स्कोरिङ कोडद्वारा परिभाषित (अन्तर्निर्मित)
सुइटहरूका लागि आरक्षित छ, किनकि प्रकार्यहरूलाई API मार्फत क्रमबद्ध गर्न सकिँदैन।
`evalCaseBuilderSchema` ले प्रयोगकर्ताद्वारा सिर्जित सुइटहरूका लागि
`contains | exact | regex` मात्र स्वीकार गर्छ।

हाल कुनै LLM-as-judge वा embedding-आधारित समानता स्कोरर छैन — यो
`evaluateCase()` मा एउटा स्पष्ट विस्तार बिन्दु हुनेछ।

## डेटाबेस स्किमा

तीनवटा तालिका (माइग्रेसनहरू `030_create_eval_runs.sql` र
`031_create_eval_suites.sql`):

| तालिका        | उद्देश्य                                                                                                                    |
| ------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `eval_suites` | अनुकूलन सुइट मेटाडेटा (`id`, `name`, `description`)                                                                         |
| `eval_cases`  | प्रत्येक सुइटका केसहरू — `input_json`, `expected_*`, `tags_json`                                                            |
| `eval_runs`   | ऐतिहासिक रनहरू — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

अन्तर्निर्मित सुइटहरू DB मा भण्डारण गरिँदैनन्। तिनीहरू मेमोरीमा रहन्छन् र
`evalRunner.ts` आयात हुँदा प्रत्येक पटक पुनः दर्ता गरिन्छन्।

## REST API

सबै एन्डपोइन्टहरूलाई व्यवस्थापन प्रमाणीकरण (`requireManagementAuth`) आवश्यक पर्छ — तिनीहरू
सार्वजनिक प्रोक्सी सतहको भाग होइनन्।

| एन्डपोइन्ट                    | विधि     | विवरण                                                                      |
| ----------------------------- | -------- | -------------------------------------------------------------------------- |
| `/api/evals`                  | `GET`    | सुइटहरू + हालैका रनहरू + स्कोरकार्ड + लक्ष्यहरू + कुञ्जीहरू सूचीबद्ध गर्ने |
| `/api/evals`                  | `POST`   | सुइट चलाउने (एकल वा तुलना) — स्किमा `evalRunSuiteSchema`                   |
| `/api/evals/{suiteId}`        | `GET`    | एउटा सुइट प्राप्त गर्ने (अन्तर्निर्मित वा अनुकूलन)                         |
| `/api/evals/suites`           | `POST`   | अनुकूलन सुइट सिर्जना गर्ने — स्किमा `evalSuiteSaveSchema`                  |
| `/api/evals/suites/{suiteId}` | `GET`    | अनुकूलन सुइट प्राप्त गर्ने                                                 |
| `/api/evals/suites/{suiteId}` | `PUT`    | अनुकूलन सुइट प्रतिस्थापन गर्ने (केसहरू पुनः घुसाइन्छन्)                    |
| `/api/evals/suites/{suiteId}` | `DELETE` | अनुकूलन सुइट र यसका केसहरू मेटाउने                                         |

### सुइट चलाउने

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

वैकल्पिक फिल्डहरू:

- `outputs` — पहिले नै गणना गरिएका आउटपुटहरूको `Record<caseId, string>`। यो उपलब्ध गराउँदा,
  रनरले **डिस्प्याच छोड्छ** र क्यास गरिएका आउटपुटहरूलाई मात्र स्कोर गर्छ (अफलाइन
  मूल्याङ्कनका लागि उपयोगी)।
- `compareTarget` — समानान्तर रूपमा चलाइने दोस्रो लक्ष्य; आमनेसामने अवलोकनका लागि दुवै रनले
  सिर्जना गरिएको `runGroupId` साझा गर्छन्।
- `apiKeyId` — डिस्प्याच गरिएका `/v1/chat/completions` कलहरूलाई प्रमाणीकरण गर्न प्रयोग गरिने
  आन्तरिक API कुञ्जी। `REQUIRE_API_KEY` सक्षम हुँदा आवश्यक पर्छ।

### अनुकूलन सुइट सिर्जना गर्ने

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

## डिस्प्याच पाइपलाइन

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. सुइटलाई (बिल्ट-इन वा अनुकूलित) समाधान गर्छ।
2. प्रत्येक केसका लागि, केसको `messages`, समाधान गरिएको `model`, `stream: false`, र `max_tokens: 512`
   (वा केसको ओभरराइड) सहित `/v1/chat/completions` मा एउटा `Request` बनाउँछ।
3. च्याट ह्यान्डलरलाई सिधै कल गर्छ (इन-प्रोसेस — कुनै अतिरिक्त HTTP हप हुँदैन)।
4. विलम्बता क्याप्चर गर्छ र `choices[0].message.content`
   वा Responses-API को `output[]` पेलोडबाट टेक्स्ट निकाल्छ।
5. `runSuite()` मार्फत सबै आउटपुटहरूलाई स्कोर गर्छ, त्यसपछि `saveEvalRun()` मार्फत स्थायी रूपमा भण्डारण गर्छ।

केसहरू **क्रमिक रूपमा** चल्छन्। हाल कुनै कन्करेन्सी फ्ल्याग छैन।

## ड्यासबोर्ड

UI `Dashboard → Usage → Evals`
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`) मा अवस्थित छ। त्यहाँबाट तपाईंले
निम्न कार्यहरू गर्न सक्नुहुन्छ:

- प्रत्येक केसको पूर्वावलोकनसहित बिल्ट-इन र अनुकूलित सुइटहरू ब्राउज गर्न।
- केस बिल्डरमार्फत अनुकूलित सुइटहरू सिर्जना/सम्पादन/मेटाउन।
- एउटा लक्ष्य (सुइटका पूर्वनिर्धारित मानहरू / मोडेल / कम्बो), वैकल्पिक रूपमा दोस्रो
  `compareTarget`, वैकल्पिक रूपमा एउटा API कुञ्जी चयन गर्न, र त्यसपछि मागअनुसार चलाउन।
- रन इतिहास, प्रत्येक केसको पास/फेल, विलम्बता, र क्याप्चर गरिएका आउटपुटहरू निरीक्षण गर्न।
- प्रत्येक `(suite, target)` स्कोपको पछिल्लो रनबाट एकत्रित रोलिङ स्कोरकार्ड हेर्न।

## Auto-Assessment RFC सँगको सम्बन्ध

एउटा छुट्टै, सीमित दायराको मूल्याङ्कन उपप्रणाली `src/domain/assessment/`
मा अवस्थित छ (लाइभ स्कोरिङ इन्जिनका लागि [AUTO-COMBO.md](../routing/AUTO-COMBO.md) पनि हेर्नुहोस्)।
त्यो उपप्रणालीले Auto Combo इन्जिनलाई लक्षित गर्छ — अपस्ट्रिमहरू असफल हुँदा कम्बोहरूले
आफूलाई स्वचालित रूपमा पुनःस्थापित गर्न सकून् भनेर प्रदायकहरू र मोडेलहरूलाई स्वचालित रूपमा स्कोर गर्छ।
यसले आफ्नै रनर, आफ्नै वर्गीकरणकर्ता, र आफ्नै स्कोरिङ तर्क प्रयोग गर्छ।

यहाँ दस्तावेजीकरण गरिएको Evals फ्रेमवर्क **फराकिलो, सामान्य-प्रयोजनको
परीक्षण सतह** हो। स्वेच्छाचारी रिग्रेसन सुइटहरू, A/B तुलनाहरू,
र प्रत्येक रिलिजका स्मोक परीक्षणहरूका लागि यसलाई प्राथमिकता दिनुहोस्। राउटिङ निर्णयहरूलाई
प्रभावित गर्न वास्तविक-समयको प्रदायक स्वास्थ्य आवश्यक हुँदा Auto-Assessment उपप्रणाली प्रयोग गर्नुहोस्।

## CI एकीकरण

हाल कुनै समर्पित `eval:ci` npm स्क्रिप्ट छैन। यदि तपाईं eval नतिजाहरूका आधारमा
रिलिजहरूलाई गेट गर्न चाहनुहुन्छ भने दुई मार्गहरू छन्:

- **HTTP मार्ग**: सर्भर सुरु गर्नुहोस्, ज्ञात `suiteId` + `target` सहित
  `POST /api/evals` मा अनुरोध पठाउनुहोस्, र प्रतिक्रियामा
  `runs[].summary.passRate >= N` छ भनी सुनिश्चित गर्नुहोस्।
- **इन-प्रोसेस मार्ग**: एउटा स्क्रिप्टबाट `@/lib/evals/runtime` को
  `runEvalSuiteAgainstTarget()` आयात गर्नुहोस्, परीक्षण DB विरुद्ध चलाउनुहोस्, र
  फर्काइएको `PersistedEvalRun.summary` जाँच गर्नुहोस्।

रुट र इतिहास समेट्ने परीक्षणहरू
`tests/unit/evals-route.test.ts` र `tests/unit/evals-history.test.ts` मा अवस्थित छन्।

## विस्तार बिन्दुहरू

सामान्य परिवर्तनहरू र तिनलाई गर्ने स्थानहरू:

- **नयाँ स्कोरिङ रणनीति** — `evaluateCase()` (`evalRunner.ts`) मा रहेको
  `switch (evalCase.expected.strategy)` ब्लक विस्तार गर्नुहोस् र
  `src/lib/db/evals.ts` मा `EvalCaseStrategy` तथा `schemas.ts` मा
  `evalCaseBuilderSchema` को दायरा फराकिलो बनाउनुहोस्।
- **नयाँ बिल्ट-इन सुइट** — एउटा सुइट अब्जेक्ट परिभाषित गर्नुहोस् र
  `evalRunner.ts` को अन्त्यमा `registerSuite()` कल गर्नुहोस्। यसलाई
  `listSuites()` ले स्वतः पत्ता लगाउनेछ।
- **कन्करेन्सीसहित चलाउने** — `runEvalSuiteAgainstTarget()` मा रहेको क्रमिक
  `for` लुपलाई सीमित `Promise.all` मा परिवर्तन गर्नुहोस् (हाल कुनै कन्करेन्सी
  नियन्त्रण उपलब्ध छैन)।
- **स्ट्रिम/टुल-कल केसहरू** — हाल रनरले `stream: false` अनिवार्य बनाउँछ।
  स्ट्रिमिङ वा टुल-सचेत मूल्याङ्कनका लागि `runtime.ts` मा परिवर्तनहरू आवश्यक पर्छन्
  (स्कोरिङ गर्नुअघि SSE चङ्कहरू क्याप्चर र एकत्रित गर्नुहोस्)।

## यो पनि हेर्नुहोस्

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — समग्र उत्पादन मार्गदर्शन
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — अनुरोध पाइपलाइन सन्दर्भ
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo स्कोरिङ इन्जिन (लाइभ रनटाइम)
- स्रोत: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
