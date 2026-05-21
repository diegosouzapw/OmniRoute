# CLAUDE.md (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../CLAUDE.md) · 🇸🇦 [ar](../ar/CLAUDE.md) · 🇦🇿 [az](../az/CLAUDE.md) · 🇧🇬 [bg](../bg/CLAUDE.md) · 🇧🇩 [bn](../bn/CLAUDE.md) · 🇨🇿 [cs](../cs/CLAUDE.md) · 🇩🇰 [da](../da/CLAUDE.md) · 🇩🇪 [de](../de/CLAUDE.md) · 🇪🇸 [es](../es/CLAUDE.md) · 🇮🇷 [fa](../fa/CLAUDE.md) · 🇫🇮 [fi](../fi/CLAUDE.md) · 🇫🇷 [fr](../fr/CLAUDE.md) · 🇮🇳 [gu](../gu/CLAUDE.md) · 🇮🇱 [he](../he/CLAUDE.md) · 🇭🇺 [hu](../hu/CLAUDE.md) · 🇮🇩 [id](../id/CLAUDE.md) · 🇮🇩 [in](../in/CLAUDE.md) · 🇮🇹 [it](../it/CLAUDE.md) · 🇯🇵 [ja](../ja/CLAUDE.md) · 🇰🇷 [ko](../ko/CLAUDE.md) · 🇮🇳 [mr](../mr/CLAUDE.md) · 🇲🇾 [ms](../ms/CLAUDE.md) · 🇳🇱 [nl](../nl/CLAUDE.md) · 🇳🇴 [no](../no/CLAUDE.md) · 🇵🇭 [phi](../phi/CLAUDE.md) · 🇵🇱 [pl](../pl/CLAUDE.md) · 🇵🇹 [pt](../pt/CLAUDE.md) · 🇧🇷 [pt-BR](../pt-BR/CLAUDE.md) · 🇷🇴 [ro](../ro/CLAUDE.md) · 🇷🇺 [ru](../ru/CLAUDE.md) · 🇸🇰 [sk](../sk/CLAUDE.md) · 🇸🇪 [sv](../sv/CLAUDE.md) · 🇰🇪 [sw](../sw/CLAUDE.md) · 🇮🇳 [ta](../ta/CLAUDE.md) · 🇮🇳 [te](../te/CLAUDE.md) · 🇹🇭 [th](../th/CLAUDE.md) · 🇹🇷 [tr](../tr/CLAUDE.md) · 🇺🇦 [uk-UA](../uk-UA/CLAUDE.md) · 🇵🇰 [ur](../ur/CLAUDE.md) · 🇻🇳 [vi](../vi/CLAUDE.md) · 🇨🇳 [zh-CN](../zh-CN/CLAUDE.md)

---

इस फ़ाइल में इस रिपॉजिटरी में कोड के साथ काम करते समय Claude Code (claude.ai/code) के लिए मार्गदर्शन प्रदान किया गया है।

## त्वरित प्रारंभ

```bash
npm install                    # निर्भरता स्थापित करें (auto-generates .env from .env.example)
npm run dev                    # http://localhost:20128 पर विकास सर्वर
npm run build                  # उत्पादन निर्माण (Next.js 16 standalone)
npm run lint                   # ESLint (0 त्रुटियाँ अपेक्षित; चेतावनियाँ पूर्व-निर्धारित हैं)
npm run typecheck:core         # TypeScript जांच (स्वच्छ होनी चाहिए)
npm run typecheck:noimplicit:core  # सख्त जांच (कोई निहित कोई नहीं)
npm run test:coverage          # यूनिट परीक्षण + कवरेज गेट (75/75/75/70 — कथन/लाइन/कार्य/शाखाएँ)
npm run check                  # lint + परीक्षण संयुक्त
npm run check:cycles           # वृत्ताकार निर्भरताएँ पहचानें
```

### परीक्षण चलाना

```bash
# एकल परीक्षण फ़ाइल (Node.js मूल परीक्षण रनर — अधिकांश परीक्षण)
node --import tsx/esm --test tests/unit/your-file.test.ts

# Vitest (MCP सर्वर, autoCombo, कैश)
npm run test:vitest

# सभी सूट
npm run test:all
```

पूर्ण परीक्षण मैट्रिक्स के लिए, `CONTRIBUTING.md` → "परीक्षण चलाना" देखें। गहन आर्किटेक्चर के लिए, `AGENTS.md` देखें।

---

## परियोजना एक नज़र में

**OmniRoute** — एकीकृत AI प्रॉक्सी/राउटर। एक एंडपॉइंट, 160+ LLM प्रदाता, स्वचालित फॉलबैक।

| परत          | स्थान                   | उद्देश्य                                                   |
| ------------ | ----------------------- | ---------------------------------------------------------- |
| API रूट्स    | `src/app/api/v1/`       | Next.js ऐप राउटर — प्रवेश बिंदु                            |
| हैंडलर्स     | `open-sse/handlers/`    | अनुरोध प्रसंस्करण (चैट, एम्बेडिंग, आदि)                    |
| निष्पादक     | `open-sse/executors/`   | प्रदाता-विशिष्ट HTTP डिस्पैच                               |
| अनुवादक      | `open-sse/translator/`  | प्रारूप रूपांतरण (OpenAI↔Claude↔Gemini)                    |
| ट्रांसफार्मर | `open-sse/transformer/` | प्रतिक्रियाएँ API ↔ चैट पूर्णता                            |
| सेवाएँ       | `open-sse/services/`    | कॉम्बो राउटिंग, दर सीमाएँ, कैशिंग, आदि                     |
| डेटाबेस      | `src/lib/db/`           | SQLite डोमेन मॉड्यूल (45+ फ़ाइलें, 55 माइग्रेशन)           |
| डोमेन/नीति   | `src/domain/`           | नीति इंजन, लागत नियम, फॉलबैक लॉजिक                         |
| MCP सर्वर    | `open-sse/mcp-server/`  | 37 उपकरण (30 बेस + 3 मेमोरी + 4 कौशल), 3 परिवहन, ~13 स्कोप |
| A2A सर्वर    | `src/lib/a2a/`          | JSON-RPC 2.0 एजेंट प्रोटोकॉल                               |
| कौशल         | `src/lib/skills/`       | विस्तारित कौशल ढांचा                                       |
| मेमोरी       | `src/lib/memory/`       | स्थायी संवादात्मक मेमोरी                                   |

मोनोरेपो: `src/` (Next.js 16 ऐप), `open-sse/` (स्ट्रीमिंग इंजन कार्यक्षेत्र), `electron/` (डेस्कटॉप ऐप), `tests/`, `bin/` (CLI प्रवेश बिंदु)।

---

## अनुरोध पाइपलाइन

```
Client → /v1/chat/completions (Next.js route)
  → CORS → Zod validation → auth? → policy check → prompt injection guard
  → handleChatCore() [open-sse/handlers/chatCore.ts]
    → cache check → rate limit → combo routing?
      → resolveComboTargets() → handleSingleModel() per target
    → translateRequest() → getExecutor() → executor.execute()
      → fetch() upstream → retry w/ backoff
    → response translation → SSE stream or JSON
    → If Responses API: responsesTransformer.ts TransformStream
```

API रूट एक सुसंगत पैटर्न का पालन करते हैं: `Route → CORS preflight → Zod body validation → Optional auth (extractApiKey/isValidApiKey) → API key policy enforcement → Handler delegation (open-sse)`। कोई वैश्विक Next.js मिडलवेयर नहीं — इंटरसेप्शन रूट-विशिष्ट है।

**कॉम्बो रूटिंग** (`open-sse/services/combo.ts`): 14 रणनीतियाँ (priority, weighted, fill-first, round-robin, P2C, random, least-used, cost-optimized, reset-aware, strict-random, auto, lkgp, context-optimized, context-relay)। प्रत्येक लक्ष्य `handleSingleModel()` को कॉल करता है जो `handleChatCore()` को प्रति-लक्ष्य त्रुटि हैंडलिंग और सर्किट ब्रेकर जांच के साथ लपेटता है। 9-फैक्टर Auto-Combo स्कोरिंग के लिए `docs/routing/AUTO-COMBO.md` देखें और 3 लचीलापन परतों के लिए `docs/architecture/RESILIENCE_GUIDE.md` देखें।

---

## लचीलापन रनटाइम स्थिति

OmniRoute में तीन संबंधित लेकिन अलग अस्थायी-फेल्योर तंत्र हैं। रूटिंग व्यवहार को डिबग करते समय उनके दायरे को अलग रखें। एक झलक के लिए [3-लेयर लचीलापन आरेख](./docs/diagrams/exported/resilience-3layers.svg) देखें (स्रोत: [docs/diagrams/resilience-3layers.mmd](./docs/diagrams/resilience-3layers.mmd))।

### प्रदाता सर्किट ब्रेकर

**दायरा**: पूरा प्रदाता, जैसे `glm`, `openai`, `anthropic`।

**उद्देश्य**: एक प्रदाता को ट्रैफ़िक भेजना बंद करें जो लगातार अपस्ट्रीम/सेवा स्तर पर विफल हो रहा है, ताकि एक अस्वस्थ प्रदाता हर अनुरोध को धीमा न करे।

**कार्यान्वयन**:

- कोर क्लास: `src/shared/utils/circuitBreaker.ts`
- चैट गेट/एक्ज़ीक्यूशन वायरिंग: `src/sse/handlers/chatHelpers.ts`, `src/sse/handlers/chat.ts`
- रनटाइम स्थिति API: `src/app/api/monitoring/health/route.ts`
- साझा रैपर: `open-sse/services/accountFallback.ts`
- स्थायी स्थिति तालिका: `domain_circuit_breakers`

**राज्य**:

- `CLOSED`: सामान्य ट्रैफ़िक की अनुमति है।
- `OPEN`: प्रदाता अस्थायी रूप से अवरुद्ध है; कॉलर्स को प्रदाता-सर्किट-खुला प्रतिक्रिया मिलती है या कॉम्बो रूटिंग किसी अन्य लक्ष्य पर कूद जाती है।
- `HALF_OPEN`: रीसेट टाइमआउट समाप्त हो गया है; एक प्रॉब अनुरोध की अनुमति दें। सफलता ब्रेकर को बंद कर देती है, विफलता इसे फिर से खोल देती है।

**डिफ़ॉल्ट** (`open-sse/config/constants.ts`):

- OAuth प्रदाता: थ्रेशोल्ड `3`, रीसेट टाइमआउट `60s`।
- API-key प्रदाता: थ्रेशोल्ड `5`, रीसेट टाइमआउट `30s`।
- स्थानीय प्रदाता: थ्रेशोल्ड `2`, रीसेट टाइमआउट `15s`।

केवल प्रदाता-स्तरीय विफलता स्थिति को प्रदाता ब्रेकर को ट्रिप करना चाहिए:

```ts
(408, 500, 502, 503, 504);
```

सामान्य खाता/की/मॉडल त्रुटियों जैसे अधिकांश `401`, `403`, या `429` मामलों के लिए पूरे प्रदाता ब्रेकर को ट्रिप न करें। वे आमतौर पर कनेक्शन कूलडाउन या मॉडल लॉकआउट से संबंधित होते हैं। एक सामान्य API-key प्रदाता `403` को पुनर्प्राप्त किया जाना चाहिए जब तक कि इसे एक टर्मिनल प्रदाता/खाता त्रुटि के रूप में वर्गीकृत नहीं किया गया हो।

ब्रेकर आलसी पुनर्प्राप्ति का उपयोग करता है, बैकग्राउंड टाइमर नहीं। जब `OPEN` समाप्त होता है, तो `getStatus()`, `canExecute()`, और `getRetryAfterMs()` जैसे रीड्स स्थिति को `HALF_OPEN` में ताज़ा करते हैं, ताकि डैशबोर्ड और कॉम्बो उम्मीदवार बिल्डर एक समाप्त प्रदाता को हमेशा के लिए बाहर न रखें।

### कनेक्शन कूलडाउन

**दायरा**: एक प्रदाता कनेक्शन/खाता/की।

**उद्देश्य**: एक खराब कुंजी/खाते को अस्थायी रूप से छोड़ना जबकि उसी प्रदाता के लिए अन्य कनेक्शन अनुरोधों को सेवा देना जारी रखते हैं।

**कार्यान्वयन**:

- लिखें/अपडेट पथ: `src/sse/services/auth.ts::markAccountUnavailable()`
- खाता चयन/फिल्टरिंग: `src/sse/services/auth.ts::getProviderCredentials...`
- कूलडाउन गणना: `open-sse/services/accountFallback.ts::checkFallbackError()`
- सेटिंग्स: `src/lib/resilience/settings.ts`

प्रदाता कनेक्शनों पर महत्वपूर्ण फ़ील्ड:

```ts
rateLimitedUntil;
testStatus: "unavailable";
lastError;
lastErrorType;
errorCode;
backoffLevel;
```

खाता चयन के दौरान, एक कनेक्शन को छोड़ दिया जाता है जबकि:

```ts
new Date(rateLimitedUntil).getTime() > Date.now();
```

कूलडाउन भी आलसी होते हैं: जब `rateLimitedUntil` अतीत में होता है, तो कनेक्शन फिर से योग्य हो जाता है। सफल उपयोग पर, `clearAccountError()` `testStatus`, `rateLimitedUntil`, त्रुटि फ़ील्ड, और `backoffLevel` को साफ करता है।

डिफ़ॉल्ट कनेक्शन कूलडाउन व्यवहार:

- OAuth बेस कूलडाउन: `5s`।
- API-key बेस कूलडाउन: `3s`।
- API-key `429` को उपलब्ध होने पर अपस्ट्रीम पुनः प्रयास संकेतों (`Retry-After`, रीसेट हेडर, या पार्स करने योग्य रीसेट पाठ) को प्राथमिकता देनी चाहिए।
- बार-बार पुनर्प्राप्त होने वाली विफलताएँ गुणांकित बैकऑफ़ का उपयोग करती हैं:

```ts
baseCooldownMs * 2 ** failureIndex;
```

एंटी-थंडरिंग-हर्ड गार्ड एक ही कनेक्शन पर समवर्ती विफलताओं को कूलडाउन को बार-बार बढ़ाने या `backoffLevel` को डबल-इंक्रीमेंट करने से रोकता है।

टर्मिनल राज्य कूलडाउन नहीं होते हैं। `banned`, `expired`, और `credits_exhausted` को तब तक अनुपलब्ध रहना चाहिए जब तक कि क्रेडेंशियल/सेटिंग्स में बदलाव न हो या एक ऑपरेटर उन्हें रीसेट न करे। टर्मिनल राज्यों को अस्थायी कूलडाउन स्थिति के साथ अधिलेखित न करें।

### मॉडल लॉकआउट

**दायरा**: प्रदाता + कनेक्शन + मॉडल।

**उद्देश्य**: जब केवल एक मॉडल अनुपलब्ध या उस कनेक्शन के लिए कोटा-सीमित हो, तो पूरे कनेक्शन को अक्षम करने से बचें।

उदाहरण:

- प्रति-मॉडल कोटा प्रदाता जो `429` लौटाते हैं।
- एक गायब मॉडल के लिए `404` लौटाने वाले स्थानीय प्रदाता।
- प्रदाता-विशिष्ट मोड/मॉडल अनुमति विफलताएँ जैसे चयनित Grok मोड।

मॉडल लॉकआउट `open-sse/services/accountFallback.ts` में रहता है और उसी कनेक्शन को अन्य मॉडलों को सेवा देने की अनुमति देता है।

### डिबगिंग मार्गदर्शन

- यदि एक प्रदाता के लिए सभी कुंजियाँ छोड़ दी जाती हैं, तो प्रदाता ब्रेकर स्थिति और प्रत्येक कनेक्शन के `rateLimitedUntil`/`testStatus` की जांच करें।
- यदि एक प्रदाता रीसेट विंडो के बाद स्थायी रूप से बाहर दिखाई देता है, तो जांचें कि क्या कोड कच्ची `state` पढ़ रहा है बजाय इसके कि `getStatus()`/`canExecute()` का उपयोग कर रहा हो।
- यदि एक प्रदाता कुंजी विफल होती है लेकिन अन्य काम करने चाहिए, तो प्रदाता ब्रेकर के बजाय कनेक्शन कूलडाउन को प्राथमिकता दें।
- यदि केवल एक मॉडल विफल होता है, तो कनेक्शन कूलडाउन के बजाय मॉडल लॉकआउट को प्राथमिकता दें।
- यदि एक स्थिति को स्वयं पुनर्प्राप्त करना चाहिए, तो इसमें भविष्य का टाइमस्टैम्प/रीसेट टाइमआउट होना चाहिए और एक रीड पथ होना चाहिए जो समाप्त स्थिति को ताज़ा करता है। स्थायी स्थितियों के लिए मैनुअल क्रेडेंशियल या कॉन्फ़िगरेशन परिवर्तनों की आवश्यकता होती है।

## मुख्य सम्मेलन

### कोड शैली

- **2 स्पेस**, सेमीकोलन, डबल कोट्स, 100 कैरेक्टर चौड़ाई, es5 ट्रेलिंग कॉमा (lint-staged द्वारा Prettier के माध्यम से लागू)
- **इम्पोर्ट्स**: बाहरी → आंतरिक (`@/`, `@omniroute/open-sse`) → सापेक्ष
- **नामकरण**: फाइलें=camelCase/kebab, घटक=PascalCase, स्थिरांक=UPPER_SNAKE
- **ESLint**: `no-eval`, `no-implied-eval`, `no-new-func` = हर जगह त्रुटि; `no-explicit-any` = `open-sse/` और `tests/` में चेतावनी
- **TypeScript**: `strict: false`, लक्ष्य ES2022, मॉड्यूल esnext, समाधान बंडलर। स्पष्ट प्रकारों को प्राथमिकता दें।

### डेटाबेस

- **हमेशा** `src/lib/db/` डोमेन मॉड्यूल के माध्यम से जाएं — **कभी भी** रूट या हैंडलर्स में कच्चा SQL न लिखें
- **कभी भी** `src/lib/localDb.ts` में लॉजिक न जोड़ें (केवल पुनः-निर्यात परत)
- **कभी भी** `localDb.ts` से बैरल-इम्पोर्ट न करें — इसके बजाय विशिष्ट `db/` मॉड्यूल इम्पोर्ट करें
- DB सिंगलटन: `getDbInstance()` `src/lib/db/core.ts` से (WAL जर्नलिंग)
- माइग्रेशन: `src/lib/db/migrations/` — संस्करणित SQL फ़ाइलें, idempotent, लेनदेन में चलाएं

### त्रुटि प्रबंधन

- विशिष्ट त्रुटि प्रकारों के साथ try/catch, pino संदर्भ के साथ लॉग करें
- SSE स्ट्रीम में त्रुटियों को कभी न छिपाएं — सफाई के लिए abort संकेतों का उपयोग करें
- उचित HTTP स्थिति कोड लौटाएं (4xx/5xx)

### सुरक्षा

- **कभी भी** `eval()`, `new Function()`, या निहित eval का उपयोग न करें
- सभी इनपुट को Zod स्कीमाओं के साथ मान्य करें
- विश्राम पर क्रेडेंशियल्स को एन्क्रिप्ट करें (AES-256-GCM)
- अपस्ट्रीम हेडर डिनायलिस्ट: `src/shared/constants/upstreamHeaders.ts` — संपादन करते समय sanitize, Zod स्कीमाओं, और यूनिट परीक्षणों को संरेखित रखें
- **सार्वजनिक अपस्ट्रीम क्रेडेंशियल्स** (Gemini/Antigravity/Windsurf-शैली OAuth client_id/secret + Firebase वेब कुंजी जो सार्वजनिक CLIs से निकाली गई हैं): **ज़रूरी** है कि इन्हें `resolvePublicCred()` के माध्यम से `open-sse/utils/publicCreds.ts` में एम्बेड किया जाए — **कभी भी** स्ट्रिंग लिटरल के रूप में नहीं। अनिवार्य पैटर्न के लिए `docs/security/PUBLIC_CREDS.md` देखें।
- **त्रुटि प्रतिक्रियाएँ** (HTTP / SSE / कार्यान्वयनकर्ता / MCP हैंडलर): **ज़रूरी** है कि इन्हें `buildErrorBody()` या `sanitizeErrorMessage()` के माध्यम से `open-sse/utils/error.ts` से रूट किया जाए — **कभी भी** कच्चा `err.stack` या `err.message` प्रतिक्रिया शरीर में न डालें। `docs/security/ERROR_SANITIZATION.md` देखें।
- **चर से बने शेल कमांड**: जब `exec()`/`spawn()` को एक स्क्रिप्ट के साथ कॉल करते हैं जिसे रनटाइम मानों की आवश्यकता होती है, तो उन्हें `env` विकल्प के माध्यम से पास करें (स्वचालित रूप से शेल-एस्केप किया गया) — **कभी भी** अविश्वसनीय/बाहरी पथों को स्क्रिप्ट शरीर में स्ट्रिंग-इंटरपोलेट न करें। संदर्भ: `src/mitm/cert/install.ts::updateNssDatabases`।
- **डिफ़ॉल्ट रूप से सुरक्षित पुस्तकालय** ([tldrsec/awesome-secure-defaults](https://github.com/tldrsec/awesome-secure-defaults)): नए सुरक्षा-संवेदनशील सतहों को जोड़ते समय कस्टम कार्यान्वयन के बजाय Helmet.js, DOMPurify, ssrf-req-filter, safe-regex, Google Tink को प्राथमिकता दें।

---

## सामान्य संशोधन परिदृश्य

### नया प्रदाता जोड़ना

1. `src/shared/constants/providers.ts` में पंजीकरण करें (लोड पर Zod-मान्य)
2. यदि कस्टम लॉजिक की आवश्यकता हो तो `open-sse/executors/` में कार्यान्वयनकर्ता जोड़ें ( `BaseExecutor` का विस्तार करें)
3. यदि गैर-OpenAI प्रारूप है तो `open-sse/translator/` में अनुवादक जोड़ें
4. यदि OAuth-आधारित है तो `src/lib/oauth/constants/oauth.ts` में OAuth कॉन्फ़िग जोड़ें — यदि अपस्ट्रीम CLI एक सार्वजनिक client_id/secret भेजता है, तो `resolvePublicCred()` के माध्यम से एम्बेड करें (देखें `docs/security/PUBLIC_CREDS.md`), **कभी भी** एक लिटरल के रूप में नहीं
5. `open-sse/config/providerRegistry.ts` में मॉडल पंजीकरण करें
6. `tests/unit/` में परीक्षण लिखें (यदि आपने एक नया एम्बेडेड डिफ़ॉल्ट जोड़ा है तो सार्वजनिकCreds आकार के सत्यापन को शामिल करें)

### नया API रूट जोड़ना

1. `src/app/api/v1/your-route/` के तहत निर्देशिका बनाएं
2. `GET`/`POST` हैंडलर्स के साथ `route.ts` बनाएं
3. पैटर्न का पालन करें: CORS → Zod शरीर मान्यता → वैकल्पिक प्रमाणीकरण → हैंडलर प्रतिनिधित्व
4. हैंडलर `open-sse/handlers/` में जाता है (वहां से इम्पोर्ट करें, इनलाइन नहीं)
5. त्रुटि प्रतिक्रियाएँ `buildErrorBody()` / `errorResponse()` का उपयोग करती हैं `open-sse/utils/error.ts` से (स्वचालित रूप से साफ़ किया गया — कभी भी `err.stack` या `err.message` कच्चा शरीर में न डालें)। `docs/security/ERROR_SANITIZATION.md` देखें।
6. परीक्षण जोड़ें — जिसमें कम से कम एक सत्यापन शामिल है कि त्रुटि प्रतिक्रियाएँ स्टैक ट्रेस लीक नहीं करतीं (`!body.error.message.includes("at /")`)

### नया DB मॉड्यूल जोड़ना

1. `src/lib/db/yourModule.ts` बनाएं — `./core.ts` से `getDbInstance` इम्पोर्ट करें
2. अपने डोमेन तालिका(ओं) के लिए CRUD फ़ंक्शन निर्यात करें
3. यदि नई तालिकाएँ आवश्यक हैं तो `src/lib/db/migrations/` में माइग्रेशन जोड़ें
4. `src/lib/localDb.ts` से पुनः-निर्यात करें (केवल पुनः-निर्यात सूची में जोड़ें)
5. परीक्षण लिखें

### नया MCP उपकरण जोड़ना

1. `open-sse/mcp-server/tools/` में Zod इनपुट स्कीमा + असिंक्रोनस हैंडलर के साथ उपकरण परिभाषा जोड़ें
2. उपकरण सेट में पंजीकरण करें ( `createMcpServer()` द्वारा वायर्ड)
3. उपयुक्त स्कोप(ओं) को असाइन करें
4. परीक्षण लिखें (उपकरण आह्वान `mcp_audit` तालिका में लॉग किया गया)

### नया A2A कौशल जोड़ना

1. `src/lib/a2a/skills/` में कौशल बनाएं (5 पहले से मौजूद हैं: स्मार्ट-रूटिंग, कोटा-प्रबंधन, प्रदाता-खोज, लागत-विश्लेषण, स्वास्थ्य-रिपोर्ट)
2. कौशल कार्य संदर्भ (संदेश, मेटाडेटा) प्राप्त करता है → संरचित परिणाम लौटाता है
3. `src/lib/a2a/taskExecution.ts` में `A2A_SKILL_HANDLERS` में पंजीकरण करें
4. `src/app/.well-known/agent.json/route.ts` में उजागर करें (एजेंट कार्ड)
5. `tests/unit/` में परीक्षण लिखें
6. `docs/frameworks/A2A-SERVER.md` कौशल तालिका में दस्तावेज़ करें

### नया क्लाउड एजेंट जोड़ना

1. `src/lib/cloudAgent/agents/` में `CloudAgentBase` का विस्तार करते हुए एजेंट क्लास बनाएं (3 पहले से मौजूद हैं: codex-cloud, devin, jules)
2. `createTask`, `getStatus`, `approvePlan`, `sendMessage`, `listSources` को लागू करें
3. `src/lib/cloudAgent/registry.ts` में पंजीकरण करें
4. यदि आवश्यक हो तो OAuth/क्रेडेंशियल्स प्रबंधन जोड़ें (`src/lib/oauth/providers/`)
5. परीक्षण + दस्तावेज़ `docs/frameworks/CLOUD_AGENT.md` में

### नया गार्डरेल / इवैल / कौशल / वेबहुक इवेंट जोड़ना

- गार्डरेल: `src/lib/guardrails/` → दस्तावेज़: `docs/security/GUARDRAILS.md`
- इवैल सूट: `src/lib/evals/` → दस्तावेज़: `docs/frameworks/EVALS.md`
- कौशल (सैंडबॉक्स): `src/lib/skills/` → दस्तावेज़: `docs/frameworks/SKILLS.md`
- वेबहुक इवेंट: `src/lib/webhookDispatcher.ts` → दस्तावेज़: `docs/frameworks/WEBHOOKS.md`

## संदर्भ दस्तावेज़

किसी भी गैर-तुच्छ परिवर्तन के लिए, पहले संबंधित गहराई से अध्ययन करें:

| क्षेत्र                                        | दस्तावेज़                                                         |
| ---------------------------------------------- | ----------------------------------------------------------------- |
| रेपो नेविगेशन                                  | `docs/architecture/REPOSITORY_MAP.md`                             |
| आर्किटेक्चर                                    | `docs/architecture/ARCHITECTURE.md`                               |
| इंजीनियरिंग संदर्भ                             | `docs/architecture/CODEBASE_DOCUMENTATION.md`                     |
| ऑटो-कॉम्बो (9-फैक्टर स्कोरिंग, 14 रणनीतियाँ)   | `docs/routing/AUTO-COMBO.md`                                      |
| सहनशीलता (3 तंत्र)                             | `docs/architecture/RESILIENCE_GUIDE.md`                           |
| तर्क पुनरावृत्ति                               | `docs/routing/REASONING_REPLAY.md`                                |
| कौशल ढांचा                                     | `docs/frameworks/SKILLS.md`                                       |
| मेमोरी प्रणाली (FTS5 + Qdrant)                 | `docs/frameworks/MEMORY.md`                                       |
| क्लाउड एजेंट                                   | `docs/frameworks/CLOUD_AGENT.md`                                  |
| गार्डरेल्स (PII / इंजेक्शन / दृष्टि)           | `docs/security/GUARDRAILS.md`                                     |
| सार्वजनिक अपस्ट्रीम क्रेडेंशियल्स (जेमिनी/आदि) | `docs/security/PUBLIC_CREDS.md`                                   |
| त्रुटि संदेश स्वच्छता                          | `docs/security/ERROR_SANITIZATION.md`                             |
| मूल्यांकन                                      | `docs/frameworks/EVALS.md`                                        |
| अनुपालन / ऑडिट                                 | `docs/security/COMPLIANCE.md`                                     |
| वेबहुक्स                                       | `docs/frameworks/WEBHOOKS.md`                                     |
| प्राधिकरण पाइपलाइन                             | `docs/architecture/AUTHZ_GUIDE.md`                                |
| स्टील्थ (TLS / फिंगरप्रिंट)                    | `docs/security/STEALTH_GUIDE.md`                                  |
| एजेंट प्रोटोकॉल (A2A / ACP / क्लाउड)           | `docs/frameworks/AGENT_PROTOCOLS_GUIDE.md`                        |
| MCP सर्वर                                      | `docs/frameworks/MCP-SERVER.md`                                   |
| A2A सर्वर                                      | `docs/frameworks/A2A-SERVER.md`                                   |
| API संदर्भ + OpenAPI                           | `docs/reference/API_REFERENCE.md` + `docs/reference/openapi.yaml` |
| प्रदाता कैटलॉग (स्वतः उत्पन्न)                 | `docs/reference/PROVIDER_REFERENCE.md`                            |
| रिलीज़ प्रवाह                                  | `docs/ops/RELEASE_CHECKLIST.md`                                   |

## परीक्षण

| क्या                     | कमांड                                                                |
| ------------------------ | -------------------------------------------------------------------- |
| यूनिट परीक्षण            | `npm run test:unit`                                                  |
| एकल फ़ाइल                | `node --import tsx/esm --test tests/unit/file.test.ts`               |
| विटेस्ट (MCP, autoCombo) | `npm run test:vitest`                                                |
| E2E (Playwright)         | `npm run test:e2e`                                                   |
| प्रोटोकॉल E2E (MCP+A2A)  | `npm run test:protocols:e2e`                                         |
| पारिस्थितिकी             | `npm run test:ecosystem`                                             |
| कवरेज गेट                | `npm run test:coverage` (75/75/75/70 — स्टेटमेंट/लाइन/फंक्शन/ब्रांच) |
| कवरेज रिपोर्ट            | `npm run coverage:report`                                            |

**PR नियम**: यदि आप `src/`, `open-sse/`, `electron/`, या `bin/` में उत्पादन कोड बदलते हैं, तो आपको उसी PR में परीक्षण शामिल करना या अपडेट करना होगा।

**परीक्षण परत प्राथमिकता**: यूनिट पहले → एकीकरण (मल्टी-मॉड्यूल या DB स्थिति) → E2E (UI/कार्यप्रवाह केवल)। बग पुनरुत्पादन को स्वचालित परीक्षणों के रूप में कोडित करें पहले या ठीक करने के साथ।

**कोपायलट कवरेज नीति**: जब एक PR उत्पादन कोड को बदलता है और कवरेज 75% (स्टेटमेंट/लाइन/फंक्शन) या 70% (ब्रांच) से नीचे है, तो केवल रिपोर्ट न करें — परीक्षण जोड़ें या अपडेट करें, कवरेज गेट को फिर से चलाएं, फिर पुष्टि के लिए पूछें। PR रिपोर्ट में चलाए गए कमांड, बदले गए परीक्षण फ़ाइलें, और अंतिम कवरेज परिणाम शामिल करें।

---

## गिट कार्यप्रवाह

```bash
# कभी भी सीधे मुख्य में कमिट न करें
git checkout -b feat/your-feature
git commit -m "feat: अपने परिवर्तन का वर्णन करें"
git push -u origin feat/your-feature
```

**ब्रांच उपसर्ग**: `feat/`, `fix/`, `refactor/`, `docs/`, `test/`, `chore/`

**कमिट प्रारूप** (परंपरागत कमिट): `feat(db): सर्किट ब्रेकर जोड़ें` — स्कोप: `db`, `sse`, `oauth`, `डैशबोर्ड`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`

**हस्की हुक**:

- **pre-commit**: lint-staged + `check-docs-sync` + `check:any-budget:t11`
- **pre-push**: `npm run test:unit`

---

## वातावरण

- **रनटाइम**: Node.js ≥20.20.2 <21 || ≥22.22.2 <23 || ≥24 <25, ES मॉड्यूल
- **TypeScript**: 5.9+, लक्ष्य ES2022, मॉड्यूल esnext, समाधान बंडलर
- **पथ उपनाम**: `@/*` → `src/`, `@omniroute/open-sse` → `open-sse/`, `@omniroute/open-sse/*` → `open-sse/*`
- **डिफ़ॉल्ट पोर्ट**: 20128 (API + डैशबोर्ड एक ही पोर्ट पर)
- **डेटा निर्देशिका**: `DATA_DIR` env var, डिफ़ॉल्ट रूप से `~/.omniroute/`
- **मुख्य env vars**: `PORT`, `JWT_SECRET`, `API_KEY_SECRET`, `INITIAL_PASSWORD`, `REQUIRE_API_KEY`, `APP_LOG_LEVEL`
- सेटअप: `cp .env.example .env` फिर `JWT_SECRET` (`openssl rand -base64 48`) और `API_KEY_SECRET` (`openssl rand -hex 32`) उत्पन्न करें

---

## कठोर नियम

1. कभी भी रहस्य या क्रेडेंशियल्स को कमिट न करें
2. कभी भी `localDb.ts` में लॉजिक न जोड़ें
3. कभी भी `eval()` / `new Function()` / निहित eval का उपयोग न करें
4. कभी भी सीधे `main` में कमिट न करें
5. कभी भी रूट में कच्चा SQL न लिखें — `src/lib/db/` मॉड्यूल का उपयोग करें
6. कभी भी SSE स्ट्रीम में त्रुटियों को चुपचाप न निगलें
7. हमेशा Zod स्कीमा के साथ इनपुट को मान्य करें
8. उत्पादन कोड बदलते समय हमेशा परीक्षण शामिल करें
9. कवरेज को ≥75% (स्टेटमेंट, लाइन, फंक्शन) / ≥70% (ब्रांच) पर बनाए रखना चाहिए। वर्तमान मापी गई: ~82%।
10. बिना स्पष्ट ऑपरेटर अनुमोदन के हस्की हुक को बायपास न करें (`--no-verify`, `--no-gpg-sign`)।
11. कभी भी सार्वजनिक अपस्ट्रीम OAuth client_id/secret या Firebase Web कुंजी को स्ट्रिंग लिटेरल के रूप में न embed करें — हमेशा `resolvePublicCred()` (`open-sse/utils/publicCreds.ts`) के माध्यम से जाएं। देखें `docs/security/PUBLIC_CREDS.md`।
12. कभी भी HTTP / SSE / कार्यान्वयन प्रतिक्रियाओं में कच्चा `err.stack` / `err.message` न लौटाएं — हमेशा `buildErrorBody()` या `sanitizeErrorMessage()` (`open-sse/utils/error.ts`) के माध्यम से रूट करें। देखें `docs/security/ERROR_SANITIZATION.md`।
13. कभी भी बाहरी पथों या रनटाइम मानों को `exec()`/`spawn()` को पास किए गए शेल स्क्रिप्ट में स्ट्रिंग-इंटरपोलेट न करें — इसके बजाय `env` विकल्प के माध्यम से पास करें। संदर्भ: `src/mitm/cert/install.ts::updateNssDatabases`।
14. कभी भी CodeQL / Secret-Scanning अलर्ट को खारिज न करें बिना (a) पहले ऊपर पैटर्न दस्तावेज़ों की जांच किए कि क्या सहायक लागू होता है, और (b) खारिज़ टिप्पणी में तकनीकी औचित्य को रिकॉर्ड किए बिना। मिसाल: `js/stack-trace-exposure` को कॉलसाइट्स पर उठाया गया जो पहले से ही `sanitizeErrorMessage()` के माध्यम से रूट करते हैं, यह एक ज्ञात CodeQL सीमा है (कस्टम सैनिटाइज़र मान्यता प्राप्त नहीं हैं) — इसे `false positive` के रूप में खारिज करें जो `docs/security/ERROR_SANITIZATION.md` का संदर्भ देता है।
15. कभी भी उन रूट्स को उजागर न करें जो चाइल्ड प्रोसेस को स्पॉन करते हैं (`/api/mcp/`, `/api/cli-tools/runtime/`) बिना `src/server/authz/routeGuard.ts` में `isLocalOnlyPath()` वर्गीकरण के। लूपबैक प्रवर्तन किसी भी प्रमाणीकरण जांच से पहले बिना शर्त होता है — टनल के माध्यम से लीक किया गया JWT प्रक्रिया स्पॉनिंग को ट्रिगर नहीं कर सकता। देखें `docs/security/ROUTE_GUARD_TIERS.md`।
16. कभी भी कमिट संदेशों में `Co-Authored-By` ट्रेलर्स शामिल न करें। कमिट केवल रिपॉजिटरी के मालिक की Git पहचान (`diegosouzapw`) के तहत दिखाई देनी चाहिए। `Co-Authored-By: Claude …` लाइन GitHub को कमिट को `claude` एंथ्रोपिक खाते को श्रेय देने का कारण बनाती है, PR इतिहास में असली लेखक को छिपाती है।
