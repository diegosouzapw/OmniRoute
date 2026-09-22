# Evaluations (Evals) (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../../frameworks/EVALS.md) · 🇪🇹 [am](../../../am/docs/frameworks/EVALS.md) · 🇸🇦 [ar](../../../ar/docs/frameworks/EVALS.md) · 🇦🇿 [az](../../../az/docs/frameworks/EVALS.md) · 🇧🇬 [bg](../../../bg/docs/frameworks/EVALS.md) · 🇧🇩 [bn](../../../bn/docs/frameworks/EVALS.md) · 🇧🇦 [bs](../../../bs/docs/frameworks/EVALS.md) · 🇨🇿 [cs](../../../cs/docs/frameworks/EVALS.md) · 🇩🇰 [da](../../../da/docs/frameworks/EVALS.md) · 🇩🇪 [de](../../../de/docs/frameworks/EVALS.md) · 🇬🇷 [el](../../../el/docs/frameworks/EVALS.md) · 🇪🇸 [es](../../../es/docs/frameworks/EVALS.md) · 🇪🇪 [et](../../../et/docs/frameworks/EVALS.md) · 🇮🇷 [fa](../../../fa/docs/frameworks/EVALS.md) · 🇫🇮 [fi](../../../fi/docs/frameworks/EVALS.md) · 🇫🇷 [fr](../../../fr/docs/frameworks/EVALS.md) · 🇮🇪 [ga](../../../ga/docs/frameworks/EVALS.md) · 🇮🇳 [gu](../../../gu/docs/frameworks/EVALS.md) · 🇳🇬 [ha](../../../ha/docs/frameworks/EVALS.md) · 🇮🇱 [he](../../../he/docs/frameworks/EVALS.md) · 🇮🇳 [hi](../../../hi/docs/frameworks/EVALS.md) · 🇭🇷 [hr](../../../hr/docs/frameworks/EVALS.md) · 🇭🇺 [hu](../../../hu/docs/frameworks/EVALS.md) · 🇦🇲 [hy](../../../hy/docs/frameworks/EVALS.md) · 🇮🇩 [id](../../../id/docs/frameworks/EVALS.md) · 🇳🇬 [ig](../../../ig/docs/frameworks/EVALS.md) · 🇮🇹 [it](../../../it/docs/frameworks/EVALS.md) · 🇯🇵 [ja](../../../ja/docs/frameworks/EVALS.md) · 🇬🇪 [ka](../../../ka/docs/frameworks/EVALS.md) · 🇰🇭 [km](../../../km/docs/frameworks/EVALS.md) · 🇮🇳 [kn](../../../kn/docs/frameworks/EVALS.md) · 🇰🇷 [ko](../../../ko/docs/frameworks/EVALS.md) · 🇱🇹 [lt](../../../lt/docs/frameworks/EVALS.md) · 🇱🇻 [lv](../../../lv/docs/frameworks/EVALS.md) · 🇮🇳 [ml](../../../ml/docs/frameworks/EVALS.md) · 🇲🇾 [ms](../../../ms/docs/frameworks/EVALS.md) · 🇲🇹 [mt](../../../mt/docs/frameworks/EVALS.md) · 🇲🇲 [my](../../../my/docs/frameworks/EVALS.md) · 🇳🇵 [ne](../../../ne/docs/frameworks/EVALS.md) · 🇳🇱 [nl](../../../nl/docs/frameworks/EVALS.md) · 🇳🇴 [no](../../../no/docs/frameworks/EVALS.md) · 🇮🇳 [or](../../../or/docs/frameworks/EVALS.md) · 🇮🇳 [pa](../../../pa/docs/frameworks/EVALS.md) · 🇵🇭 [phi](../../../phi/docs/frameworks/EVALS.md) · 🇵🇱 [pl](../../../pl/docs/frameworks/EVALS.md) · 🇵🇹 [pt](../../../pt/docs/frameworks/EVALS.md) · 🇧🇷 [pt-BR](../../../pt-BR/docs/frameworks/EVALS.md) · 🇷🇴 [ro](../../../ro/docs/frameworks/EVALS.md) · 🇷🇺 [ru](../../../ru/docs/frameworks/EVALS.md) · 🇱🇰 [si](../../../si/docs/frameworks/EVALS.md) · 🇸🇰 [sk](../../../sk/docs/frameworks/EVALS.md) · 🇸🇮 [sl](../../../sl/docs/frameworks/EVALS.md) · 🇷🇸 [sr](../../../sr/docs/frameworks/EVALS.md) · 🇸🇪 [sv](../../../sv/docs/frameworks/EVALS.md) · 🇰🇪 [sw](../../../sw/docs/frameworks/EVALS.md) · 🇮🇳 [ta](../../../ta/docs/frameworks/EVALS.md) · 🇮🇳 [te](../../../te/docs/frameworks/EVALS.md) · 🇹🇭 [th](../../../th/docs/frameworks/EVALS.md) · 🇹🇷 [tr](../../../tr/docs/frameworks/EVALS.md) · 🇺🇦 [uk-UA](../../../uk-UA/docs/frameworks/EVALS.md) · 🇵🇰 [ur](../../../ur/docs/frameworks/EVALS.md) · 🇺🇿 [uz](../../../uz/docs/frameworks/EVALS.md) · 🇻🇳 [vi](../../../vi/docs/frameworks/EVALS.md) · 🇳🇬 [yo](../../../yo/docs/frameworks/EVALS.md) · 🇨🇳 [zh-CN](../../../zh-CN/docs/frameworks/EVALS.md) · 🇹🇼 [zh-TW](../../../zh-TW/docs/frameworks/EVALS.md)

---

> **सत्याचा अधिकृत स्रोत:** `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
> **शेवटचे अद्यतन:** 2026-06-28 — v3.8.40

OmniRoute सोबत एक सर्वसाधारण मूल्यमापन फ्रेमवर्क उपलब्ध आहे, ज्याचा वापर तुम्ही रूटिंग
कॉन्फिगरेशन्स, स्वतंत्र प्रदाते/मॉडेल्स किंवा सोबत दिलेल्या "golden set" संचांची कामगिरी मोजण्यासाठी करू शकता.
प्रॉडक्शन ट्रॅफिकवर लागू करण्यापूर्वी रूटिंगमधील बदलांची पडताळणी करण्यासाठी, नवीन प्रदाते प्रमाणित करण्यासाठी
आणि रिलीजना मंजुरी देण्यासाठी त्याचा वापर करा.

फ्रेमवर्कची अंमलबजावणी पुढीलप्रमाणे केली आहे:

- एक शुद्ध रनर (`src/lib/evals/evalRunner.ts`), जो इन-मेमरी
  अंगभूत संच नोंदवतो, अपेक्षित निकषांनुसार आउटपुटचे मूल्यमापन करतो आणि
  स्कोअरकार्ड एकत्रित करतो.
- सानुकूल (वापरकर्त्याने परिभाषित केलेल्या) संचांसाठी
  आणि SQLite मधील ऐतिहासिक रनसाठी एक पर्सिस्टन्स स्तर (`src/lib/db/evals.ts`).
- एक ऑर्केस्ट्रेशन स्तर (`src/lib/evals/runtime.ts`), जो `POST /v1/chat/completions` वर
  प्रत्यक्ष कॉल पाठवून प्रत्येक केस कार्यान्वित करतो, विलंब
  आणि आउटपुट नोंदवतो व रन कायमस्वरूपी जतन करतो.
- `/api/evals/*` अंतर्गत REST एंडपॉइंट्स (केवळ व्यवस्थापन-प्रमाणीकरणासाठी).
- `Dashboard → Usage → Evals` येथे डॅशबोर्ड इंटरफेस (`EvalsTab.tsx`).

## संकल्पना

### संच

संच म्हणजे `description` आणि एक किंवा
अधिक केस असलेला, नाव दिलेला चाचणी केसांचा संग्रह. संच दोन स्रोतांमधून येतात:

| स्रोत      | कुठे परिभाषित केला आहे                             | रनटाइममध्ये बदलता येतो?   |
| ---------- | -------------------------------------------------- | ------------------------- |
| `built-in` | बूटवेळी `registerSuite()` द्वारे नोंदवलेला         | नाही (कोडद्वारे परिभाषित) |
| `custom`   | SQLite `eval_suites` + `eval_cases` मध्ये संग्रहित | होय (API/UI द्वारे)       |

सध्याचे अंगभूत संच (`src/lib/evals/evalRunner.ts` पहा):

- `golden-set` — अभिवादन/गणित/भाषांतर/सुरक्षितता यांवरील 10 मूलभूत केस
- `coding-proficiency` — Python/JS/SQL/TS/बग शोध
- `reasoning-logic` — तर्कवाक्ये, शब्दाधारित समस्या, नमुना ओळख
- `multilingual` — भाषांतर आणि भाषा ओळख
- `safety-guardrails` — PII, जेलब्रेक, नकार, पूर्वग्रहाविषयी जागरूकता
- `instruction-following` — केवळ JSON, क्रमांकित याद्या, भाषेची बंधने
- `codex-comparison` — तुलना मोडसाठी तयार केलेली थेट तुलनात्मक कोडिंग कार्ये

### केस

प्रत्येक केसमध्ये पुढील गोष्टी असतात:

| फील्ड      | वर्णन                                                                  |
| ---------- | ---------------------------------------------------------------------- |
| `id`       | स्थिर अभिज्ञापक (आउटपुट आणि मेट्रिक्सची कळ म्हणून वापरला जातो)         |
| `name`     | माणसाला वाचता येण्याजोगे लेबल                                          |
| `model`    | रन `suite-default` लक्ष्यीकरण वापरत असताना वापरले जाणारे डीफॉल्ट मॉडेल |
| `input`    | `{ messages, max_tokens? }` — `/v1/chat/completions` कडे पाठवले जाते   |
| `expected` | `{ strategy, value }` — गुणांकन निकष (खाली पहा)                        |
| `tags`     | पर्यायी लेबले (उदा. `safety`, `pii`, `jailbreak`)                      |

### लक्ष्य

तोच संच वेगवेगळ्या लक्ष्यांविरुद्ध चालवता येतो. लक्ष्य स्कीमा
`src/shared/validation/schemas.ts` मधील `evalTargetSchema` आहे:

| लक्ष्य प्रकार   | `id`         | वर्तन                                                                   |
| --------------- | ------------ | ----------------------------------------------------------------------- |
| `suite-default` | `null`       | प्रत्येक केस त्याचे अंगभूत `model` फील्ड वापरतो                         |
| `model`         | मॉडेलचे नाव  | प्रत्येक केसला एका थेट मॉडेलमार्फत चालवण्याची सक्ती करा (उदा. `gpt-4o`) |
| `combo`         | कॉम्बोचे नाव | प्रत्येक केस एका कॉम्बोमार्फत चालवा (रूटिंग इंजिनची चाचणी होते)         |

`model` आणि `combo` साठी `id` फील्ड आवश्यक आहे (Zod
`superRefine` द्वारे लागू केलेले). `compareTarget` दिलेले असताना, दोन्ही लक्ष्ये भिन्न असणे आवश्यक आहे —
A/B तुलनेसाठी रनर दोन्ही रन समान `runGroupId` अंतर्गत कायमस्वरूपी जतन करतो.

## गुणांकन निकष

`evaluateCase()` (evalRunner.ts) मध्ये अंमलात आणलेले:

| धोरण       | उत्तीर्ण होण्याची अट…                                                   |
| ---------- | ----------------------------------------------------------------------- |
| `exact`    | `actualOutput === expected.value`                                       |
| `contains` | `actualOutput.toLowerCase().includes(expected.value.toLowerCase())`     |
| `regex`    | `new RegExp(expected.value).test(actualOutput)` सत्य असते               |
| `custom`   | `expected.fn(actualOutput, evalCase)` सत्य मूल्य परत करते (फक्त अंगभूत) |

**टीप:** कस्टम-फंक्शन गुणांकन हे कोडमध्ये परिभाषित केलेल्या (अंगभूत)
संचांसाठी राखीव आहे, कारण फंक्शन्स API द्वारे क्रमबद्ध करता येत नाहीत.
वापरकर्त्यांनी तयार केलेल्या संचांसाठी `evalCaseBuilderSchema` फक्त
`contains | exact | regex` स्वीकारते.

सध्या LLM-as-judge किंवा एम्बेडिंग-आधारित साम्य गुणांकनकर्ता उपलब्ध नाही — त्यासाठी
`evaluateCase()` हा विस्ताराचा स्वच्छ बिंदू ठरेल.

## डेटाबेस स्कीमा

तीन तक्ते (मायग्रेशन्स `030_create_eval_runs.sql` आणि
`031_create_eval_suites.sql`):

| तक्ता         | उद्देश                                                                                                                   |
| ------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `eval_suites` | कस्टम संचाचा मेटाडेटा (`id`, `name`, `description`)                                                                      |
| `eval_cases`  | प्रत्येक संचातील प्रकरणे — `input_json`, `expected_*`, `tags_json`                                                       |
| `eval_runs`   | ऐतिहासिक रन — `pass_rate`, `total`, `passed`, `failed`, `avg_latency_ms`, `summary_json`, `results_json`, `outputs_json` |

अंगभूत संच DB मध्ये संग्रहित केले जात **नाहीत**. ते मेमरीमध्ये असतात आणि
प्रत्येक वेळी `evalRunner.ts` इम्पोर्ट केल्यावर पुन्हा नोंदवले जातात.

## REST API

सर्व एंडपॉइंट्सना व्यवस्थापन प्रमाणीकरण (`requireManagementAuth`) आवश्यक आहे — ते
सार्वजनिक प्रॉक्सी पृष्ठभागाचा भाग नाहीत.

| एंडपॉइंट                      | पद्धत    | वर्णन                                                     |
| ----------------------------- | -------- | --------------------------------------------------------- |
| `/api/evals`                  | `GET`    | संच + अलीकडील रन + स्कोअरकार्ड + लक्ष्ये + की यांची यादी  |
| `/api/evals`                  | `POST`   | संच चालवा (एकल किंवा तुलना) — स्कीमा `evalRunSuiteSchema` |
| `/api/evals/{suiteId}`        | `GET`    | एक संच मिळवा (अंगभूत किंवा कस्टम)                         |
| `/api/evals/suites`           | `POST`   | कस्टम संच तयार करा — स्कीमा `evalSuiteSaveSchema`         |
| `/api/evals/suites/{suiteId}` | `GET`    | कस्टम संच मिळवा                                           |
| `/api/evals/suites/{suiteId}` | `PUT`    | कस्टम संच बदला (प्रकरणे पुन्हा समाविष्ट केली जातात)       |
| `/api/evals/suites/{suiteId}` | `DELETE` | कस्टम संच आणि त्यातील प्रकरणे हटवा                        |

### संच चालवणे

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

पर्यायी फील्ड्स:

- `outputs` — आधीच गणना केलेल्या आउटपुट्सचे `Record<caseId, string>`. हे दिलेले असताना,
  रनर **डिस्पॅच वगळतो** आणि फक्त कॅशे केलेल्या आउटपुट्सचे गुणांकन करतो (ऑफलाइन
  मूल्यमापनासाठी उपयुक्त).
- `compareTarget` — समांतरपणे चालवण्यासाठी दुसरे लक्ष्य; समोरासमोर तुलना करून पाहण्यासाठी दोन्ही रन
  व्युत्पन्न केलेला `runGroupId` सामायिक करतात.
- `apiKeyId` — डिस्पॅच केलेल्या `/v1/chat/completions` कॉल्सचे प्रमाणीकरण करण्यासाठी वापरली जाणारी
  अंतर्गत API की. `REQUIRE_API_KEY` सक्षम असताना आवश्यक.

### कस्टम संच तयार करणे

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

## डिस्पॅच पाइपलाइन

`runEvalSuiteAgainstTarget()` (`src/lib/evals/runtime.ts`):

1. संचाचे (अंगभूत किंवा सानुकूल) निराकरण करते.
2. प्रत्येक केससाठी, केसचे `messages`, निराकरण केलेले `model`, `stream: false`, आणि `max_tokens: 512` (किंवा केसचे अधिलिखित मूल्य) वापरून `/v1/chat/completions` साठी `Request` तयार करते.
3. चॅट हँडलरला थेट कॉल करते (प्रक्रियेअंतर्गत — कोणतीही अतिरिक्त HTTP उडी नाही).
4. विलंब नोंदवते आणि `choices[0].message.content` किंवा Responses-API च्या `output[]` पेलोडमधून मजकूर काढते.
5. `runSuite()` द्वारे सर्व आउटपुटचे गुणांकन करते आणि नंतर `saveEvalRun()` द्वारे कायमस्वरूपी साठवते.

केसेस **क्रमाने** चालतात. सध्या कोणताही समवर्तीता फ्लॅग नाही.

## डॅशबोर्ड

UI `Dashboard → Usage → Evals` येथे आहे
(`src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`). तेथून तुम्ही:

- प्रत्येक केसच्या पूर्वावलोकनासह अंगभूत आणि सानुकूल संच पाहू शकता.
- केस बिल्डर वापरून सानुकूल संच तयार/संपादित/हटवू शकता.
- लक्ष्य (संचाची डीफॉल्ट मूल्ये / मॉडेल / कॉम्बो), पर्यायी दुसरे `compareTarget`, पर्यायी API की निवडून मागणीनुसार चालवू शकता.
- रन इतिहास, प्रत्येक केसचा उत्तीर्ण/अनुत्तीर्ण निकाल, विलंब आणि नोंदवलेले आउटपुट तपासू शकता.
- प्रत्येक `(suite, target)` व्याप्तीमधील नवीनतम रनवर एकत्रित केलेले सतत अद्ययावत होणारे स्कोअरकार्ड पाहू शकता.

## Auto-Assessment RFC सोबतचा संबंध

एक स्वतंत्र, अधिक मर्यादित मूल्यांकन उपप्रणाली `src/domain/assessment/` येथे आहे
(सक्रिय गुणांकन इंजिनसाठी [AUTO-COMBO.md](../routing/AUTO-COMBO.md) देखील पहा).
ही उपप्रणाली Auto Combo इंजिनला लक्ष्य करते — अपस्ट्रीम अयशस्वी झाल्यास कॉम्बो स्वतःची दुरुस्ती करू शकतील यासाठी प्रदाते आणि मॉडेल्सचे स्वयंचलितपणे गुणांकन करते. ती स्वतःचा रनर, स्वतःचा वर्गीकारक आणि स्वतःचे गुणांकन तर्क वापरते.

येथे दस्तऐवजीकरण केलेले Evals फ्रेमवर्क हे **अधिक व्यापक, सर्वसाधारण वापरासाठीचे चाचणी पृष्ठभाग** आहे. कोणतेही रिग्रेशन संच, A/B तुलना आणि प्रत्येक रिलीझच्या स्मोक चाचण्यांसाठी त्याला प्राधान्य द्या. राउटिंग निर्णयांवर प्रभाव टाकण्यासाठी तुम्हाला प्रदात्याच्या रिअल-टाइम स्थितीची आवश्यकता असल्यास Auto-Assessment उपप्रणाली वापरा.

## CI एकत्रीकरण

सध्या कोणतीही समर्पित `eval:ci` npm स्क्रिप्ट नाही. इव्हॅल निकालांच्या आधारे रिलीझ नियंत्रित करायचे असल्यास दोन मार्ग आहेत:

- **HTTP मार्ग**: सर्व्हर सुरू करा, ज्ञात `suiteId` + `target` सह `POST /api/evals` ला विनंती पाठवा आणि प्रतिसादामध्ये `runs[].summary.passRate >= N` असल्याची खात्री करा.
- **प्रक्रियेअंतर्गत मार्ग**: स्क्रिप्टमधून `@/lib/evals/runtime` येथून `runEvalSuiteAgainstTarget()` आयात करा, चाचणी DB विरुद्ध चालवा आणि परत केलेले `PersistedEvalRun.summary` तपासा.

रूट आणि इतिहास समाविष्ट करणाऱ्या चाचण्या
`tests/unit/evals-route.test.ts` आणि `tests/unit/evals-history.test.ts` येथे आहेत.

## विस्तार बिंदू

सामान्य बदल आणि ते कुठे करायचे:

- **नवीन गुणांकन धोरण** — `evaluateCase()` (`evalRunner.ts`) मधील `switch (evalCase.expected.strategy)` ब्लॉक विस्तारित करा आणि `src/lib/db/evals.ts` मधील `EvalCaseStrategy`, तसेच `schemas.ts` मधील `evalCaseBuilderSchema` व्यापक करा.
- **नवीन अंगभूत संच** — संच ऑब्जेक्ट परिभाषित करा आणि `evalRunner.ts` च्या तळाशी `registerSuite()` कॉल करा. `listSuites()` द्वारे तो आपोआप शोधला जाईल.
- **समवर्तीपणे चालवणे** — `runEvalSuiteAgainstTarget()` मधील क्रमिक `for` लूप मर्यादित `Promise.all` मध्ये बदला (सध्या कोणतेही समवर्तीता नियंत्रण अस्तित्वात नाही).
- **स्ट्रीम/टूल-कॉल केसेस** — सध्या रनर `stream: false` सक्तीने वापरतो. स्ट्रीमिंग किंवा टूल-जागरूक मूल्यांकनासाठी `runtime.ts` मध्ये बदल करावे लागतील (गुणांकनापूर्वी SSE तुकडे नोंदवा आणि एकत्रित करा).

## हे देखील पहा

- [USER_GUIDE.md](../guides/USER_GUIDE.md) — उत्पादनाची एकंदर मार्गदर्शित सफर
- [ARCHITECTURE.md](../architecture/ARCHITECTURE.md) — विनंती पाइपलाइन संदर्भ
- [AUTO-COMBO.md](../routing/AUTO-COMBO.md) — Auto Combo गुणांकन इंजिन (प्रत्यक्ष रनटाइम)
- स्रोत: `src/lib/evals/`, `src/lib/db/evals.ts`, `src/app/api/evals/`
- UI: `src/app/(dashboard)/dashboard/usage/components/EvalsTab.tsx`
