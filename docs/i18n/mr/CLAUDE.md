# CLAUDE.md (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇮🇳 [hi](../hi/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

या फाइलमध्ये या रेपॉजिटरीमध्ये कोडवर काम करताना Claude Code (claude.ai/code) साठी मार्गदर्शन दिले आहे.

## जलद प्रारंभ

```bash
npm install                    # निर्भरता स्थापित करा (.auto-generates .env from .env.example)
npm run dev                    # विकास सर्व्हर http://localhost:20128 वर
npm run build                  # उत्पादन बिल्ड (Next.js 16 स्वतंत्र)
npm run lint                   # ESLint (0 त्रुटी अपेक्षित; चेतावण्या पूर्वीच आहेत)
npm run typecheck:core         # TypeScript तपासणी (स्वच्छ असावी)
npm run typecheck:noimplicit:core  # कठोर तपासणी (कोणतीही अप्रत्यक्ष नाही)
npm run test:coverage          # युनिट चाचण्या + कव्हरेज गेट (75/75/75/70 — विधान/रेषा/कार्ये/शाखा)
npm run check                  # lint + चाचणी एकत्रित
npm run check:cycles           # वर्तुळाकार अवलंबन शोधा
```

### चाचण्या चालवणे

```bash
# एकल चाचणी फाइल (Node.js स्थानिक चाचणी धावक — बहुतेक चाचण्या)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP सर्व्हर, autoCombo, कॅश)
npm run test:vitest

# सर्व सूट
npm run test:all
```

पूर्ण चाचणी मॅट्रिक्ससाठी, `CONTRIBUTING.md` पहा → "चाचण्या चालवणे". गहन आर्किटेक्चरसाठी, `AGENTS.md` पहा.

---

## प्रकल्पाचा आढावा

**OmniRoute** — एकत्रित AI प्रॉक्सी/राउटर. एक एंडपॉइंट, 160+ LLM प्रदाते, स्वयंचलित फॉलबॅक.

| स्तर          | स्थान                   | उद्देश                                                       |
| ------------- | ----------------------- | ------------------------------------------------------------ |
| API मार्ग     | `src/app/api/v1/`       | Next.js अॅप राउटर — प्रवेश बिंदू                             |
| हँडलर्स       | `open-sse/handlers/`    | विनंती प्रक्रिया (चॅट, एम्बेडिंग, इ.)                        |
| कार्यान्वयक   | `open-sse/executors/`   | प्रदाता-विशिष्ट HTTP वितरण                                   |
| भाषांतरक      | `open-sse/translator/`  | स्वरूप रूपांतरण (OpenAI↔Claude↔Gemini)                       |
| ट्रान्सफार्मर | `open-sse/transformer/` | प्रतिसाद API ↔ चॅट पूर्णता                                   |
| सेवा          | `open-sse/services/`    | कॉम्बो राउटिंग, दर मर्यादा, कॅशिंग, इ.                       |
| डेटाबेस       | `src/lib/db/`           | SQLite डोमेन मॉड्यूल (45+ फाइल, 55 स्थलांतर)                 |
| डोमेन/नीती    | `src/domain/`           | नीती इंजिन, खर्च नियम, फॉलबॅक लॉजिक                          |
| MCP सर्व्हर   | `open-sse/mcp-server/`  | 37 साधने (30 बेस + 3 मेमरी + 4 कौशल्य), 3 वाहने, ~13 स्कोप्स |
| A2A सर्व्हर   | `src/lib/a2a/`          | JSON-RPC 2.0 एजंट प्रोटोकॉल                                  |
| कौशल्य        | `src/lib/skills/`       | विस्तारणीय कौशल्य फ्रेमवर्क                                  |
| मेमरी         | `src/lib/memory/`       | कायमचे संवादात्मक मेमरी                                      |

मोनोरेपो: `src/` (Next.js 16 अॅप), `open-sse/` (स्ट्रीमिंग इंजिन कार्यक्षेत्र), `electron/` (डेस्कटॉप अॅप), `tests/`, `bin/` (CLI प्रवेश बिंदू).

---

## विनंती पाईपलाइन

```
Client → /v1/chat/completions (Next.js मार्ग)
  → CORS → Zod प्रमाणीकरण → auth? → धोरण तपासणी → प्रॉम्प्ट इंजेक्शन गार्ड
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → कॅश तपासणी → दर मर्यादा → कॉम्बो रूटिंग?
      → resolveComboTargets() → handleSingleModel() प्रति लक्ष्य
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() अपस्ट्रीम → retry w/ backoff
    → प्रतिसाद भाषांतर → SSE प्रवाह किंवा JSON
    → जर प्रतिसाद API: responsesTransformer.ts TransformStream
```

API मार्ग एक सुसंगत नमुना अनुसरण करतात: `Route → CORS प्रीफ्लाइट → Zod शरीर प्रमाणीकरण → वैकल्पिक auth (extractApiKey/isValidApiKey) → API की धोरण अंमलबजावणी → हँडलर प्रतिनिधित्व (open-sse)`. कोणताही जागतिक Next.js मिडलवेअर नाही — हस्तक्षेप मार्ग-विशिष्ट आहे.

**कॉम्बो रूटिंग** (`open-sse/services/combo.ts`): 14 रणनीती (प्राधान्य, वजनदार, भर-प्रथम, राउंड-रॉबिन, P2C, यादृच्छिक, कमी-उपयोग, खर्च-ऑप्टिमाइझ, रीसेट-ज्ञानी, कठोर-यादृच्छिक, स्वयंचलित, lkgp, संदर्भ-ऑप्टिमाइझ, संदर्भ-रिले). प्रत्येक लक्ष्य `handleSingleModel()` कॉल करते जे `handleChatCore()` ला प्रति-लक्ष्य त्रुटी हाताळणी आणि सर्किट ब्रेकर तपासणीसह लपवते. 9-फॅक्टर ऑटो-कॉम्बो स्कोअरिंगसाठी `docs/routing/AUTO-COMBO.md` पहा आणि 3 प्रतिकार स्तरांसाठी `docs/architecture/RESILIENCE_GUIDE.md` पहा.

---

## प्रतिकार रनटाइम स्थिती

OmniRoute कडे तीन संबंधित पण भिन्न तात्पुरत्या-अपयश यांत्रिके आहेत. रूटिंग वर्तन डिबग करताना त्यांचा व्याप्ती वेगळी ठेवा. एक झलक नकाशासाठी [3-लेयर प्रतिकार आरेख](./docs/diagrams/exported/resilience-3layers.svg) पहा (स्त्रोत: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd)).

### प्रदाता सर्किट ब्रेकर

**व्याप्ती**: संपूर्ण प्रदाता, उदा. `glm`, `openai`, `anthropic`.

**उद्दिष्ट**: अपस्ट्रीम/सेवा स्तरावर वारंवार अपयशी ठरलेल्या प्रदात्याकडे ट्रॅफिक पाठवणे थांबवणे, त्यामुळे एक अस्वस्थ प्रदाता प्रत्येक विनंतीला मंदावणार नाही.

**अंमलबजावणी**:

- मुख्य वर्ग: `src/shared/utils/circuitBreaker.ts`
- चॅट गेट/कार्यवाही वायरिंग: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- रनटाइम स्थिती API: `src/app/api/monitoring/health/route.ts`
- सामायिक रॅपर: `open-sse/services/accountFallback.ts`
- कायमस्वरूपी स्थिती टेबल: `domain_circuit_breakers`

**स्थिती**:

- `CLOSED`: सामान्य ट्रॅफिकची परवानगी आहे.
- `OPEN`: प्रदाता तात्पुरता ब्लॉक केलेला आहे; कॉलर्सना प्रदाता-सर्किट-ओपन प्रतिसाद मिळतो किंवा कॉम्बो रूटिंग दुसऱ्या लक्ष्याकडे वळते.
- `HALF_OPEN`: रीसेट टाइमआउट संपला आहे; एक प्रॉब विनंती परवानगी द्या. यशस्वी झाल्यास ब्रेकर बंद होतो, अपयशी झाल्यास पुन्हा उघडतो.

**डीफॉल्ट्स** (`open-sse/config/constants.ts`):

- OAuth प्रदाते: थ्रेशोल्ड `3`, रीसेट टाइमआउट `60s`.
- API-key प्रदाते: थ्रेशोल्ड `5`, रीसेट टाइमआउट `30s`.
- स्थानिक प्रदाते: थ्रेशोल्ड `2`, रीसेट टाइमआउट `15s`.

फक्त प्रदाता-स्तरीय अपयश स्थिती प्रदाता ब्रेकरला ट्रिप करायला हवी:

```ts
(408, 500, 502, 503, 504);
```

सामान्य खाते/की/मॉडेल त्रुटी जसे की बहुतेक `401`, `403`, किंवा `429` प्रकरणांसाठी संपूर्ण प्रदाता ब्रेकरला ट्रिप करू नका. त्या सामान्यतः कनेक्शन कूलडाऊन किंवा मॉडेल लॉकआउटमध्ये असतात. एक सामान्य API-key प्रदाता `403` पुनर्प्राप्त करण्यायोग्य असावा, जोपर्यंत तो एक टर्मिनल प्रदाता/खाते त्रुटी म्हणून वर्गीकृत केलेला नाही.

ब्रेकर आलसी पुनर्प्राप्ती वापरतो, पार्श्वभूमी टाइमर नाही. जेव्हा `OPEN` संपते, तेव्हा `getStatus()`, `canExecute()`, आणि `getRetryAfterMs()` सारख्या वाचनांनी स्थिती `HALF_OPEN` मध्ये ताजेतवाने करते, त्यामुळे डॅशबोर्ड आणि कॉम्बो उमेदवार बिल्डर्स एक कालबाह्य प्रदाता कायमचा वगळत नाहीत.

### कनेक्शन कूलडाऊन

**व्याप्ती**: एक प्रदाता कनेक्शन/खाते/की.

**उद्दिष्ट**: एक वाईट की/खाते तात्पुरते वगळताना त्याच प्रदाता साठी इतर कनेक्शनना विनंत्या सेवा देण्याची परवानगी देणे.

**अंमलबजावणी**:

- लेखा/अपडेट पथ: `src/sse/services/auth.ts::markAccountUnavailable()`
- खाते निवड/फिल्टरिंग: `src/sse/services/auth.ts::getProviderCredentials...`
- कूलडाऊन गणना: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिंग्ज: `src/lib/resilience/settings.ts`

प्रदाता कनेक्शनवरील महत्त्वाचे क्षेत्र:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

खाते निवडताना, एक कनेक्शन वगळले जाते जेव्हा:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

कूलडाऊन देखील आलसी आहेत: जेव्हा `rateLimitedUntil` भूतकाळात असतो, तेव्हा कनेक्शन पुन्हा पात्र होते. यशस्वी वापरावर, `clearAccountError()` `testStatus`, `rateLimitedUntil`, त्रुटी क्षेत्र, आणि `backoffLevel` साफ करते.

डीफॉल्ट कनेक्शन कूलडाऊन वर्तन:

- OAuth बेस कूलडाऊन: `5s`.
- API-key बेस कूलडाऊन: `3s`.
- API-key `429` उपलब्ध असल्यास अपस्ट्रीम पुनर्प्रयत्न संकेत (`Retry-After`, रीसेट हेडर, किंवा पार्स करण्यायोग्य रीसेट मजकूर) प्राधान्य द्यावे.
- पुनरावृत्ती होणाऱ्या पुनर्प्राप्त होणाऱ्या अपयशांवर गुणाकार बॅकऑफ वापरला जातो:

```ts
baseCooldownMs * 2 ** failureIndex;
```

अँटी-थंडरिंग-हर्ड गार्ड एकाच कनेक्शनवरील समांतर अपयशांना कूलडाऊन वाढविण्यासाठी किंवा `backoffLevel` द्विगुणित करण्यापासून प्रतिबंधित करतो.

टर्मिनल स्थिती कूलडाऊन नाहीत. `banned`, `expired`, आणि `credits_exhausted` क्रेडेन्शियल्स/सेटिंग्ज बदलल्याशिवाय किंवा ऑपरेटरने त्यांना रीसेट केल्याशिवाय अनुपलब्ध राहण्याचा उद्देश आहे. तात्पुरत्या कूलडाऊन स्थितीसह टर्मिनल स्थिती ओव्हरराइट करू नका.

### मॉडेल लॉकआउट

**व्याप्ती**: प्रदाता + कनेक्शन + मॉडेल.

**उद्दिष्ट**: एकाच कनेक्शनसाठी फक्त एक मॉडेल अनुपलब्ध किंवा कोटा-सीमित असताना संपूर्ण कनेक्शन बंद करणे टाळणे.

उदाहरणे:

- प्रति-मॉडेल कोटा प्रदाते `429` परत करत आहेत.
- स्थानिक प्रदाते एक गहाळ मॉडेलसाठी `404` परत करत आहेत.
- प्रदाता-विशिष्ट मोड/मॉडेल परवानगी अपयश जसे की निवडलेले Grok मोड.

मॉडेल लॉकआउट `open-sse/services/accountFallback.ts` मध्ये राहते आणि त्याच कनेक्शनला इतर मॉडेल्स सेवा देण्याची परवानगी देते.

### डिबगिंग मार्गदर्शन

- जर प्रदाता साठी सर्व की वगळल्या गेल्या असतील, तर प्रदाता ब्रेकर स्थिती आणि प्रत्येक कनेक्शनच्या `rateLimitedUntil`/`testStatus` तपासा.
- जर रीसेट विंडो नंतर प्रदाता कायमचा वगळलेला दिसत असेल, तर तपासा की कोड कच्चा `state` वाचत आहे की `getStatus()`/`canExecute()` वापरत आहे.
- जर एक प्रदाता की अपयशी झाली पण इतर कार्य करायला हवे, तर प्रदाता ब्रेकरवर कनेक्शन कूलडाऊन प्राधान्य द्या.
- जर फक्त एक मॉडेल अपयशी झाली, तर कनेक्शन कूलडाऊनवर मॉडेल लॉकआउट प्राधान्य द्या.
- जर एक स्थिती स्वतः पुनर्प्राप्त होणे आवश्यक असेल, तर त्यात भविष्यकालीन टाइमस्टॅम्प/रीसेट टाइमआउट आणि एक वाचन पथ असावा जो कालबाह्य स्थिती ताजेतवाने करतो. कायमच्या स्थितींसाठी मॅन्युअल क्रेडेन्शियल किंवा कॉन्फिग बदल आवश्यक आहेत.

## मुख्य संकल्पना

### कोड शैली

- **2 जागा**, सेमीकोलन, डबल कोट्स, 100 वर्ण रुंदी, es5 ट्रेलिंग कॉमा (lint-staged द्वारे Prettier द्वारे लागू केले)
- **आयात**: बाह्य → अंतर्गत (`@/`, `@omniroute/open-sse`) → सापेक्ष
- **नावकरण**: फाइल्स=camelCase/kebab, घटक=PascalCase, स्थिरांक=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = सर्वत्र त्रुटी; `no-explicit-any` = `open-sse/` आणि `tests/` मध्ये चेतावणी
- **TypeScript**: `strict: false`, लक्ष्य ES2022, मॉड्यूल esnext, रिझोल्यूशन बंडलर. स्पष्ट प्रकारांना प्राधान्य द्या.

### डेटाबेस

- **सर्व वेळ** `src/lib/db/` डोमेन मॉड्यूलद्वारे जा — **कधीही** मार्ग किंवा हँडलरमध्ये कच्चा SQL लिहू नका
- **कधीही** `src/lib/localDb.ts` मध्ये लॉजिक जोडू नका (फक्त पुनः-निर्यात स्तर)
- **कधीही** `localDb.ts` कडून बॅरल-आयात करू नका — त्याऐवजी विशिष्ट `db/` मॉड्यूल आयात करा
- DB सिंगलटन: `getDbInstance()` `src/lib/db/core.ts` कडून (WAL जर्नलिंग)
- स्थलांतर: `src/lib/db/migrations/` — आवृत्त SQL फाइल्स, आयडेम्पोटेंट, व्यवहारांमध्ये चालवा

### त्रुटी हाताळणी

- विशिष्ट त्रुटी प्रकारांसह try/catch, पिनो संदर्भासह लॉग करा
- SSE प्रवाहांमध्ये त्रुटी गिळू नका — स्वच्छतेसाठी abort सिग्नल वापरा
- योग्य HTTP स्थिती कोड परत करा (4xx/5xx)

### सुरक्षा

- **कधीही** `eval()`, `new Function()`, किंवा implied eval वापरू नका
- सर्व इनपुट Zod स्कीमासह प्रमाणित करा
- विश्रांतीत क्रेडेन्शियल्स एन्क्रिप्ट करा (AES-256-GCM)
- अपस्ट्रीम हेडर डिनायलिस्ट: `src/shared/constants/upstreamHeaders.ts` — संपादित करताना स्वच्छता, Zod स्कीमा, आणि युनिट चाचण्या समांतर ठेवा
- **सार्वजनिक अपस्ट्रीम क्रेडेन्शियल्स** (Gemini/Antigravity/Windsurf-शैली OAuth client_id/secret + Firebase वेब कीज सार्वजनिक CLIs कडून काढलेल्या): **आवश्यक** `resolvePublicCred()` द्वारे समाविष्ट करणे `open-sse/utils/publicCreds.ts` मध्ये — **कधीही** स्ट्रिंग लिटरल्स म्हणून नाही. अनिवार्य नमुन्यासाठी `docs/security/PUBLIC_CREDS.md` पहा.
- **त्रुटी प्रतिसाद** (HTTP / SSE / कार्यान्वयन / MCP हँडलर): **आवश्यक** `buildErrorBody()` किंवा `sanitizeErrorMessage()` द्वारे मार्गक्रमण करणे `open-sse/utils/error.ts` मध्ये — **कधीही** कच्चा `err.stack` किंवा `err.message` प्रतिसाद शरीरात ठेऊ नका. `docs/security/ERROR_SANITIZATION.md` पहा.
- **परिवर्तनीयांवरून तयार केलेले शेल कमांड**: जेव्हा `exec()`/`spawn()` कॉल करताना स्क्रिप्टमध्ये रनटाइम मूल्ये आवश्यक असतात, तेव्हा `env` पर्यायाद्वारे पास करा (स्वयंचलितपणे शेल-एस्केप केले) — **कधीही** अविश्वसनीय/बाह्य पथ स्क्रिप्ट शरीरात स्ट्रिंग-इंटरपोलेट करू नका. संदर्भ: `src/mitm/cert/install.ts::updateNssDatabases`.
- **सुरक्षित-डिफॉल्ट लायब्ररी** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): नवीन सुरक्षा-संवेदनशील पृष्ठभाग जोडताना कस्टम अंमलबजावणीऐवजी Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink यांना प्राधान्य द्या.

---

## सामान्य सुधारणा परिस्थिती

### नवीन प्रदाता जोडणे

1. `src/shared/constants/providers.ts` मध्ये नोंदणी करा (लोडवर Zod-प्रमाणित)
2. जर कस्टम लॉजिक आवश्यक असेल तर `open-sse/executors/` मध्ये कार्यान्वयन जोडा (`BaseExecutor` विस्तारित करा)
3. जर नॉन-OpenAI फॉरमॅट असेल तर `open-sse/translator/` मध्ये अनुवादक जोडा
4. जर OAuth-आधारित असेल तर `src/lib/oauth/constants/oauth.ts` मध्ये OAuth कॉन्फिग जोडा — जर अपस्ट्रीम CLI सार्वजनिक client_id/secret पाठवत असेल, तर `resolvePublicCred()` द्वारे समाविष्ट करा (पहा `docs/security/PUBLIC_CREDS.md`), **कधीही** लिटरल म्हणून नाही
5. `open-sse/config/providerRegistry.ts` मध्ये मॉडेल्स नोंदणी करा
6. `tests/unit/` मध्ये चाचण्या लिहा (जर तुम्ही नवीन समाविष्ट केलेल्या डिफॉल्टसाठी सार्वजनिकCreds आकाराचे प्रमाणित केले तर समाविष्ट करा)

### नवीन API मार्ग जोडणे

1. `src/app/api/v1/your-route/` अंतर्गत निर्देशिका तयार करा
2. `GET`/`POST` हँडलर्ससह `route.ts` तयार करा
3. नमुना अनुसरण करा: CORS → Zod शरीर प्रमाणन → वैकल्पिक प्रमाणीकरण → हँडलर प्रतिनिधित्व
4. हँडलर `open-sse/handlers/` मध्ये जातो (तिथून आयात करा, इनलाइन नाही)
5. त्रुटी प्रतिसाद `buildErrorBody()` / `errorResponse()` वापरतात `open-sse/utils/error.ts` कडून (स्वयंचलितपणे स्वच्छ केले — कधीही `err.stack` किंवा `err.message` कच्चा शरीरात ठेऊ नका). `docs/security/ERROR_SANITIZATION.md` पहा.
6. चाचण्या जोडा — कमीत कमी एक प्रमाणन समाविष्ट करा की त्रुटी प्रतिसाद स्टॅक ट्रेस लीक करत नाही (`!body.error.message.includes("at /")`)

### नवीन DB मॉड्यूल जोडणे

1. `src/lib/db/yourModule.ts` तयार करा — `./core.ts` कडून `getDbInstance` आयात करा
2. तुमच्या डोमेन टेबलसाठी CRUD कार्ये निर्यात करा
3. नवीन टेबल आवश्यक असल्यास `src/lib/db/migrations/` मध्ये स्थलांतर जोडा
4. `src/lib/localDb.ts` कडून पुनः-निर्यात करा (फक्त पुनः-निर्यात यादीत जोडा)
5. चाचण्या लिहा

### नवीन MCP साधन जोडणे

1. Zod इनपुट स्कीमा + असिंक्रोनस हँडलरसह `open-sse/mcp-server/tools/` मध्ये साधन व्याख्या जोडा
2. साधन सेटमध्ये नोंदणी करा (`createMcpServer()` द्वारे वायर्ड)
3. योग्य स्कोपमध्ये नियुक्त करा
4. चाचण्या लिहा (साधन आवाहन `mcp_audit` टेबलमध्ये लॉग केले जाते)

### नवीन A2A कौशल्य जोडणे

1. `src/lib/a2a/skills/` मध्ये कौशल्य तयार करा (5 आधीच अस्तित्वात आहेत: स्मार्ट-रूटिंग, कोटा-व्यवस्थापन, प्रदाता-शोध, खर्च-विश्लेषण, आरोग्य-रिपोर्ट)
2. कौशल्य कार्य संदर्भ प्राप्त करते (संदेश, मेटाडेटा) → संरचित परिणाम परत करते
3. `src/lib/a2a/taskExecution.ts` मध्ये `A2A_SKILL_HANDLERS` मध्ये नोंदणी करा
4. `src/app/.well-known/agent.json/route.ts` मध्ये उघडा (एजंट कार्ड)
5. `tests/unit/` मध्ये चाचण्या लिहा
6. `docs/frameworks/A2A-SERVER.md` कौशल्य टेबलमध्ये दस्तऐवजीकरण करा

### नवीन क्लाउड एजंट जोडणे

1. `src/lib/cloudAgent/agents/` मध्ये `CloudAgentBase` विस्तारित करणारा एजंट वर्ग तयार करा (3 आधीच अस्तित्वात आहेत: codex-cloud, devin, jules)
2. `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources` कार्यान्वित करा
3. `src/lib/cloudAgent/registry.ts` मध्ये नोंदणी करा
4. आवश्यक असल्यास OAuth/क्रेडेन्शियल्स हाताळणी जोडा (`src/lib/oauth/providers/`)
5. चाचण्या + `docs/frameworks/CLOUD_AGENT.md` मध्ये दस्तऐवजीकरण करा

### नवीन गार्डरेल / इव्हॅल / कौशल्य / वेबहुक इव्हेंट जोडणे

- गार्डरेल: `src/lib/guardrails/` → दस्तऐवज: `docs/security/GUARDRAILS.md`
- इव्हॅल सूट: `src/lib/evals/` → दस्तऐवज: `docs/frameworks/EVALS.md`
- कौशल्य (सँडबॉक्स): `src/lib/skills/` → दस्तऐवज: `docs/frameworks/SKILLS.md`
- वेबहुक इव्हेंट: `src/lib/webhookDispatcher.ts` → दस्तऐवज: `docs/frameworks/WEBHOOKS.md`

## संदर्भ दस्तऐवज

कोणत्याही महत्त्वाच्या बदलासाठी, आधी संबंधित गहन अभ्यास वाचा:

| क्षेत्र                                    | दस्तऐवज                                                           |
| ------------------------------------------ | ----------------------------------------------------------------- |
| रेपो नेव्हिगेशन                            | `docs/architecture/REPOSITORY_MAP.md`                             |
| आर्किटेक्चर                                | `docs/architecture/ARCHITECTURE.md`                               |
| अभियांत्रिकी संदर्भ                        | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| ऑटो-कॉम्बो (9-फॅक्टर स्कोअरिंग, 14 धोरणे)  | `docs/routing/AUTO-COMBO.md`                                      |
| टिकाऊपणा (3 यांत्रिके)                     | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| विचारणाचे पुनरावलोकन                       | `docs/routing/REASONING_REPLAY.md`                                |
| कौशल्यांचे फ्रेमवर्क                       | `docs/frameworks/SKILLS.md`                                       |
| मेमरी प्रणाली (FTS5 + Qdrant)              | `docs/frameworks/MEMORY.md`                                       |
| क्लाउड एजंट्स                              | `docs/frameworks/CLOUD_AGENT.md`                                  |
| गार्डरेल्स (PII / इंजेक्शन / दृष्टिकोन)    | `docs/security/GUARDRAILS.md`                                     |
| सार्वजनिक अपस्ट्रीम प्रमाणपत्र (जेमिनी/इ.) | `docs/security/PUBLIC_CREDS.md`                                   |
| त्रुटी संदेश स्वच्छता                      | `docs/security/ERROR_SANITIZATION.md`                             |
| मूल्यांकन                                  | `docs/frameworks/EVALS.md`                                        |
| अनुपालन / ऑडिट                             | `docs/security/COMPLIANCE.md`                                     |
| वेबहुक्स                                   | `docs/frameworks/WEBHOOKS.md`                                     |
| अधिकृतता पाईपलाइन                          | `docs/architecture/AUTHZ_GUIDE.md`                                |
| गुप्तता (TLS / फिंगरप्रिंट)                | `docs/security/STEALTH_GUIDE.md`                                  |
| एजंट प्रोटोकॉल (A2A / ACP / क्लाउड)        | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP सर्व्हर                                | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A सर्व्हर                                | `docs/frameworks/A2A-SERVER.md`                                   |
| API संदर्भ + OpenAPI                       | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| प्रदाता कॅटलॉग (स्वयंचलित-निर्मित)         | `docs/reference/PROVIDER_REFERENCE.md`                            |
| रिलीज प्रवाह                               | `docs/ops/RELEASE_CHECKLIST.md`                                   |

---

## चाचणी

| काय                     | कमांड                                                          |
| ----------------------- | -------------------------------------------------------------- |
| युनिट चाचण्या           | `npm run test:unit`                                            |
| एकल फाइल                | `node --import tsx/esm --test tests/unit/file.test.ts`         |
| Vitest (MCP, autoCombo) | `npm run test:vitest`                                          |
| E2E (Playwright)        | `npm run test:e2e`                                             |
| प्रोटोकॉल E2E (MCP+A2A) | `npm run test:protocols:e2e`                                   |
| इकोसिस्टम               | `npm run test:ecosystem`                                       |
| कव्हरेज गेट             | `npm run test:coverage` (75/75/75/70 — विधान/रेषा/कार्ये/शाखा) |
| कव्हरेज रिपोर्ट         | `npm run coverage:report`                                      |

**PR नियम**: जर तुम्ही `src/`, `open-sse/`, `electron/`, किंवा `bin/` मध्ये उत्पादन कोड बदलला, तर तुम्हाला त्या PR मध्ये चाचण्या समाविष्ट करणे किंवा अद्यतनित करणे आवश्यक आहे.

**चाचणी स्तर प्राधान्य**: युनिट प्रथम → एकत्रीकरण (बहु-मॉड्यूल किंवा DB स्थिती) → e2e (UI/कार्यप्रवाह फक्त). बग पुनरुत्पादनांना स्वयंचलित चाचण्यांमध्ये कोडित करा, दुरुस्तीसह किंवा आधी.

**Copilot कव्हरेज धोरण**: जेव्हा PR उत्पादन कोड बदलतो आणि कव्हरेज 75% (विधान/रेषा/कार्ये) किंवा 70% (शाखा) खाली असते, तेव्हा फक्त अहवाल देऊ नका — चाचण्या जोडा किंवा अद्यतनित करा, कव्हरेज गेट पुन्हा चालवा, नंतर पुष्टीसाठी विचारा. चालवलेले कमांड, बदललेले चाचणी फाइल्स, आणि अंतिम कव्हरेज परिणाम PR अहवालात समाविष्ट करा.

---

## Git कार्यप्रवाह

```bash
# मुख्य शाखेत थेट कमिट करू नका
git checkout -b feat/your-feature
git commit -m "feat: describe your change"
git push -u origin feat/your-feature
```

**शाखा उपसर्ग**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**कमिट स्वरूप** (परंपरागत कमिट्स): `feat(db): add circuit breaker` — स्कोप: `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**Husky हुक्स**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## वातावरण

- **रनटाइम**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES मॉड्यूल
- **TypeScript**: 5.9+, लक्ष्य ES2022, मॉड्यूल esnext, रिझोल्यूशन बंडलर
- **पथ उपसर्ग**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **डीफॉल्ट पोर्ट**: 20128 (API + डॅशबोर्ड एकाच पोर्टवर)
- **डेटा निर्देशिका**: `DATA_DIR` env var, डीफॉल्ट `~/.omniroute/`
- **महत्त्वाचे env vars**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- सेटअप: `cp .env.example .env` नंतर `JWT_SECRET` (`openssl rand -base64 48`) आणि `API_KEY_SECRET` (`openssl rand -hex 32`) तयार करा

---

## कठोर नियम

1. कधीही गुप्त माहिती किंवा प्रमाणपत्रे कमिट करू नका
2. कधीही `localDb.ts` मध्ये लॉजिक जोडू नका
3. कधीही `eval()` / `new Function()` / implied eval वापरू नका
4. कधीही थेट `main` मध्ये कमिट करू नका
5. कधीही मार्गांमध्ये कच्चा SQL लिहू नका — `src/lib/db/` मॉड्यूल वापरा
6. कधीही SSE प्रवाहांमध्ये चुकांना गुपचूप गिळून टाका
7. नेहमी Zod स्कीमासह इनपुटची पडताळणी करा
8. उत्पादन कोड बदलताना नेहमी चाचण्या समाविष्ट करा
9. कव्हरेज ≥75% (विधान, रेषा, कार्ये) / ≥70% (शाखा) राहिले पाहिजे. वर्तमान मोजलेले: ~82%.
10. स्पष्ट ऑपरेटर मंजुरीशिवाय Husky हुक्स (`--no-verify`, `--no-gpg-sign`) बायपास करू नका.
11. कधीही सार्वजनिक अपस्ट्रीम OAuth client_id/secret किंवा Firebase वेब कीज स्ट्रिंग लिटरल म्हणून समाविष्ट करू नका — नेहमी `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`) द्वारे जा. पहा `docs/security/PUBLIC_CREDS.md`.
12. कधीही HTTP / SSE / कार्यकारी प्रतिसादांमध्ये कच्चा `err.stack` / `err.message` परत करू नका — नेहमी `buildErrorBody()` किंवा `sanitizeErrorMessage()` (`open-sse/utils/error.ts`) द्वारे मार्गदर्शित करा. पहा `docs/security/ERROR_SANITIZATION.md`.
13. कधीही बाह्य पथ किंवा रनटाइम मूल्ये `exec()`/`spawn()` कडे पाठवलेल्या शेल स्क्रिप्टमध्ये स्ट्रिंग-इंटरपोलेट करू नका — त्याऐवजी `env` पर्यायाद्वारे पास करा. संदर्भ: `src/mitm/cert/install.ts::updateNssDatabases`.
14. कधीही CodeQL / Secret-Scanning अलर्ट नाकारू नका (a) वर दिलेल्या पॅटर्न दस्तऐवजांची तपासणी न करता, आणि (b) नकारात्मक टिप्पणीत तांत्रिक कारणाची नोंद न करता. उदाहरण: `js/stack-trace-exposure` कॉलसाइटवर उभा राहिला आहे जो आधीच `sanitizeErrorMessage()` द्वारे मार्गदर्शित आहे, हे एक ज्ञात CodeQL मर्यादा आहे (कस्टम सॅनिटायझर्स ओळखले जात नाहीत) — `docs/security/ERROR_SANITIZATION.md` संदर्भित करून `false positive` म्हणून नकारा.
15. कधीही चाइल्ड प्रक्रियांचा स्पॉन करणारे मार्ग (`/api/mcp/`, `/api/cli-tools/runtime/`) समाविष्ट करू नका `src/server/authz/routeGuard.ts` मध्ये `isLocalOnlyPath()` वर्गीकरणाशिवाय. लूपबॅक अंमलबजावणी कोणत्याही प्रमाणीकरण तपासणीपूर्वी अनिवार्यपणे होते — टनलद्वारे गळती झालेला JWT प्रक्रिया स्पॉनिंगला ट्रिगर करू शकत नाही. पहा `docs/security/ROUTE_GUARD_TIERS.md`.
16. AI सहाय्यक, LLM किंवा स्वयंचलित खात्याला श्रेय देणारे `Co-Authored-By` ट्रेलर्स कधीही समाविष्ट करू नका (उदा. "Claude", "GPT", "Copilot", "Bot" असलेली नावे; `anthropic.com` / `openai.com` / बॉट-मालकीच्या `noreply.github.com` पत्त्यांवरील ईमेल). असे ट्रेलर्स GitHub वर बॉट खात्यात कमिट अॅट्रिब्यूशन रूट करतात, PR इतिहासात खऱ्या लेखकाला (`diegosouzapw`) लपवतात. मानवी सहयोगी — upstream PR लेखक आणि OmniRoute मध्ये पोर्ट केले जाणारे issue रिपोर्टर सह — मानक `Co-authored-by: Name <email>` ट्रेलर्ससह श्रेय मिळवू शकतात आणि मिळावे; upstream-port वर्कफ्लो (`/port-upstream-features`, `/port-upstream-issues`) यावर अवलंबून आहेत.
