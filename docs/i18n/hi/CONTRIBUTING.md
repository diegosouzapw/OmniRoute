# Contributing to OmniRoute (हिन्दी)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇮🇳 [mr](../mr/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## डेवलपमेंट सेटअप

### पूर्वापेक्षाएँ

- **Node.js** `>=22.22.3 <23`, या `>=24.0.0 <27` (अनुशंसित: 24 LTS)
- **npm** 10+

> **npm v11+ उपयोगकर्ता (Node 24+):** `npm install` के बाद सत्यापित करें कि नेटिव मॉड्यूल इंस्टॉल किए गए थे:
> `node -e "require('better-sqlite3')"`. यदि यह `MODULE_NOT_FOUND` के साथ विफल होता है,
> तो `npm approve-scripts better-sqlite3 && npm install` चलाएँ। देखें
> [समस्या निवारण](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module)।

- **Git**

### क्लोन और इंस्टॉल करना

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### एनवायरनमेंट वेरिएबल

```bash
# टेम्पलेट से अपनी .env फ़ाइल बनाएँ
cp .env.example .env

# आवश्यक सीक्रेट जनरेट करें
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

डेवलपमेंट के लिए प्रमुख वेरिएबल:

| वेरिएबल                | डेवलपमेंट डिफ़ॉल्ट       | विवरण                    |
| ---------------------- | ------------------------ | ------------------------ |
| `PORT`                 | `20128`                  | सर्वर पोर्ट              |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | फ़्रंटएंड के लिए बेस URL |
| `JWT_SECRET`           | (ऊपर जनरेट करें)         | JWT साइनिंग सीक्रेट      |
| `INITIAL_PASSWORD`     | `CHANGEME`               | पहले लॉगिन का पासवर्ड    |
| `APP_LOG_LEVEL`        | `info`                   | लॉग विवरण का स्तर        |

### डैशबोर्ड सेटिंग्स

डैशबोर्ड उन सुविधाओं के लिए UI टॉगल प्रदान करता है जिन्हें एनवायरनमेंट वेरिएबल के माध्यम से भी कॉन्फ़िगर किया जा सकता है:

| सेटिंग का स्थान    | टॉगल            | विवरण                           |
| ------------------ | --------------- | ------------------------------- |
| सेटिंग्स → उन्नत   | डीबग मोड        | डीबग अनुरोध लॉग सक्षम करें (UI) |
| सेटिंग्स → सामान्य | साइडबार दृश्यता | साइडबार अनुभाग दिखाएँ/छिपाएँ    |

ये सेटिंग्स डेटाबेस में संग्रहीत होती हैं और पुनः आरंभ करने के बाद भी बनी रहती हैं। सेट किए जाने पर ये env var के डिफ़ॉल्ट मानों को ओवरराइड करती हैं।

### स्थानीय रूप से चलाना

```bash
# डेवलपमेंट मोड (हॉट रीलोड)
npm run dev

# प्रोडक्शन बिल्ड
npm run build    # next build → .build/next/ फिर assembleStandalone → dist/
npm run start

# योगदानकर्ता के बदलावों के लिए तेज़, केवल बैकएंड/API कंपाइल
npm run build:contributor

# रिलीज़ बिल्ड (क्लीन रीबिल्ड + HEAD सेंटिनल — डिप्लॉय के लिए आवश्यक)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA लिखता है

# सामान्य पोर्ट कॉन्फ़िगरेशन
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

योगदानकर्ता बिल्ड केवल कंपाइल सत्यापन करता है: यह स्टैंडअलोन
डिस्ट्रिब्यूशन को असेंबल नहीं करता या वैकल्पिक नेटिव पैकेजिंग एसेट नहीं बनाता। जब आपको
डिलीवर किए जा सकने वाले बंडल को सत्यापित करना हो, तो नियमित प्रोडक्शन बिल्ड का उपयोग करें।

### बिल्ड आउटपुट लेआउट

| डायरेक्टरी | सामग्री                                                                           | ट्रैक किया गया |
| ---------- | --------------------------------------------------------------------------------- | -------------- |
| `src/`     | एप्लिकेशन सोर्स (TypeScript / TSX)                                                | हाँ            |
| `.build/`  | मध्यवर्ती फ़ाइलें — `next build` आउटपुट (gitignored, `distDir = .build/next`)     | नहीं           |
| `dist/`    | डिलीवर करने योग्य बंडल — `assembleStandalone` द्वारा असेंबल किया गया (gitignored) | नहीं           |

बिल्ड पाइपलाइन एकल पास में चलती है:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js आउटपुट)
  └─ assembleStandalone()                 (स्टैंडअलोन + स्टैटिक + पब्लिक + नेटिव एसेट कॉपी करता है)
       └─ आउटपुट: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` पहले दोनों डायरेक्टरी को अतिरिक्त रूप से साफ़ करता है और
डिप्लॉय अखंडता सेंटिनल के रूप में `dist/BUILD_SHA` (= `git rev-parse --short HEAD`) लिखता है।

`npm run build:contributor` केवल बैकएंड वाले बिल्ड प्रोफ़ाइल का उपयोग करता है। बिल्ड करते समय यह अस्थायी रूप से
डैशबोर्ड UI फ़ाइलों को स्टब करता है, API रूट हैंडलर बनाए रखता है और बिल्ड के बाद मूल फ़ाइलों को
पुनर्स्थापित करता है। डैशबोर्ड UI को प्रभावित करने वाले बदलावों या पूर्ण रिलीज़ सत्यापन के लिए
`npm run build` का उपयोग करें; योगदानकर्ता प्रोफ़ाइल रिलीज़ बिल्ड का प्रतिस्थापन नहीं है।

> **VPS डिप्लॉय नोट:** रिमोट इमेज डायरेक्टरी `/usr/lib/node_modules/omniroute/app/`
> अपरिवर्तित है। डिप्लॉय स्किल्स `dist/` की सामग्री को इसमें rsync करती हैं।
> केवल रिपॉज़िटरी के भीतर बिल्ड आउटपुट पथ बदला है (`app/` → `dist/`)।

डिफ़ॉल्ट URL:

- **डैशबोर्ड**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git वर्कफ़्लो

> ⚠️ **कभी भी सीधे `main` में कमिट न करें।** हमेशा फीचर ब्रांच का उपयोग करें।
>
> **PR बेस:** सक्रिय `release/vX.Y.Z` ब्रांच को लक्षित करें (`main` को नहीं)। प्रत्येक रिलीज़ के लिए अलग ब्रांच + शिप करते समय टैग वाले मॉडल के लिए
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) देखें।

```bash
# सक्रिय रिलीज़ टिप से ब्रांच बनाएँ (उदाहरण: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... बदलाव करें ...
git commit -m "feat: describe your change"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 के साथ एक Pull Request खोलें
```

### ब्रांच का नामकरण

| प्रीफ़िक्स  | उद्देश्य                 |
| ----------- | ------------------------ |
| `feat/`     | नई सुविधाएँ              |
| `fix/`      | बग सुधार                 |
| `refactor/` | कोड का पुनर्गठन          |
| `docs/`     | दस्तावेज़ीकरण में बदलाव  |
| `test/`     | टेस्ट जोड़ना/सुधारना     |
| `chore/`    | टूलिंग, CI, डिपेंडेंसीज़ |

### कमिट संदेश

[Conventional Commits](https://www.conventionalcommits.org/) का पालन करें:

```
feat: add circuit breaker for provider calls
fix: resolve JWT secret validation edge case
docs: update SECURITY.md with PII protection
test: add observability unit tests
refactor(db): consolidate rate limit tables
```

स्कोप (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`।

---

## परीक्षण चलाना

```bash
# सभी परीक्षण (unit + vitest + ecosystem + e2e)
npm run test:all

# एकल परीक्षण फ़ाइल (Node.js नेटिव टेस्ट रनर — अधिकांश परीक्षण इसका उपयोग करते हैं)
node --import tsx/esm --test tests/unit/your-file.test.ts

# केवल आपके परिवर्तन से प्रभावित unit परीक्षण (CI gate, #8084 वाला वही TIA selector)
npm run test:scoped            # अंतिम commit (या working tree) में हुए परिवर्तन
npm run test:scoped:staged     # केवल staged परिवर्तन — pre-commit रन के साथ अच्छी तरह काम करता है
npm run test:scoped:full       # पहले import-graph map को फिर से बनाएँ (फ़ाइलें जोड़ने/स्थानांतरित करने के बाद)
# Exit 1 + "run the full suite" का अर्थ है कि कोई hub फ़ाइल (tsconfig, package.json, …) या कोई
# unmapped source बदला है — selector सुरक्षित रूप से विफल होता है, यह कभी चुपचाप छोड़ता नहीं है।

# Vitest (MCP server, autoCombo, cache)
npm run test:vitest

# E2E परीक्षण (Playwright आवश्यक है)
npm run test:e2e

# Protocol clients E2E (MCP transports, A2A)
npm run test:protocols:e2e

# Ecosystem संगतता परीक्षण
npm run test:ecosystem

# Coverage gate: statements/lines/functions/branches का 60%
npm run test:coverage
npm run coverage:report

# Lint + format जाँच
npm run lint
npm run check

# Gated real-upstream combo smoke (VPS पहुँच + वास्तविक provider credits आवश्यक हैं)
# यह REAL providers को अनुरोध भेजता है — इसमें थोड़ी लागत आती है। CI में यह कभी नहीं चलता। gate के बिना इसे साफ़-सुथरे ढंग से छोड़ दिया जाता है।
# आवश्यक: ssh root@192.168.0.15 पहुँच (VPS से केवल-पढ़ने योग्य DB snapshot प्राप्त करता है)।
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS live smoke — सामान्य Node ESM scripts, जो सीधे live .15 server को अनुरोध भेजते हैं।
# आवश्यक: ssh root@192.168.0.15 पहुँच (combos को SSH sqlite के माध्यम से बनाया/हटाया जाता है)।
# यह REAL providers को अनुरोध भेजता है (कम लागत)। केवल __live_test__* combos बनाता/हटाता है। CI में यह कभी नहीं चलता।
# .15 पर REQUIRE_API_KEY=false है, इसलिए API key आवश्यक नहीं है, लेकिन सेट होने पर COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY का पालन करता है।
npm run test:combo:live:vps              # 7 HTTP परिदृश्य (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # एक वास्तविक cross-provider failover परिदृश्य जोड़ता है (कुल 8)
```

Coverage संबंधी टिप्पणियाँ:

- `npm run test:coverage` मुख्य unit test suite की source coverage मापता है, `tests/**` को बाहर रखता है, और `open-sse/**` को शामिल करता है
- Pull requests में statements/lines/functions/branches के लिए coverage gate **60%+** बनाए रखना आवश्यक है
- यदि कोई PR `src/`, `open-sse/`, `electron/`, या `bin/` में production code बदलता है, तो उसे उसी PR में automated tests जोड़ने या अपडेट करने होंगे
- `npm run coverage:report` नवीनतम coverage रन की विस्तृत फ़ाइल-दर-फ़ाइल रिपोर्ट प्रिंट करता है
- `npm run test:coverage:legacy` ऐतिहासिक तुलना के लिए पुराने metric को बनाए रखता है
- चरणबद्ध coverage सुधार roadmap के लिए `docs/ops/COVERAGE_PLAN.md` देखें

### Pull Request की आवश्यकताएँ

PR खोलने से पहले, अपने परिवर्तनों के लिए केंद्रित loop चलाने हेतु
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) का उपयोग करें। पूर्ण unit suite (4 CI shards), Vitest, **60%+** coverage gate, और
production build की ज़िम्मेदारी CI की है — इन्हें स्थानीय रूप से चलाने से ऐसी कोई अतिरिक्त जानकारी नहीं मिलती जो PR
checks पहले से नहीं देंगे, और छोटी मशीनों पर यह host को अत्यधिक व्यस्त कर सकता है (#8084):

- अपने परिवर्तन को cover करने वाली test files चलाएँ: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` चलाएँ
- production code में परिवर्तन होने पर उसी PR में automated tests शामिल करें या अपडेट करें
- production code बदलने पर PR विवरण में बदली या जोड़ी गई test files शामिल करें
- जब project secrets CI में configure किए गए हों, तो PR पर SonarQube परिणाम जाँचें

वर्तमान परीक्षण स्थिति: **122 unit test files**, जिनमें निम्न शामिल हैं:

- Provider translators और format conversion
- Rate limiting, circuit breaker, और resilience
- Semantic cache, idempotency, और progress tracking
- Database operations और schema (21 DB modules)
- OAuth flows और authentication
- API endpoint validation (Zod v4)
- MCP server tools और scope enforcement
- Memory और Skills systems

---

## कोड शैली

- **ESLint** — कमिट करने से पहले `npm run lint` चलाएँ
- **Prettier** — कमिट पर `lint-staged` के माध्यम से स्वतः फ़ॉर्मेट किया जाता है (2 स्पेस, सेमीकोलन, डबल कोट्स, 100 वर्ण चौड़ाई, es5 ट्रेलिंग कॉमा)
- **TypeScript** — सभी `src/` कोड में `.ts`/`.tsx` का उपयोग होता है; `open-sse/` में `.ts`/`.js` का उपयोग होता है; TSDoc (`@param`, `@returns`, `@throws`) के साथ दस्तावेज़ीकरण करें
- **कोई `eval()` नहीं** — ESLint `no-eval`, `no-implied-eval`, `no-new-func` लागू करता है
- **Zod सत्यापन** — सभी API इनपुट सत्यापनों के लिए Zod v4 स्कीमा का उपयोग करें
- **नामकरण**: फ़ाइलें = camelCase/kebab-case, कॉम्पोनेंट्स = PascalCase, कॉन्स्टेंट्स = UPPER_SNAKE

### त्रुटि प्रबंधन / खाली catch ब्लॉक

किसी भी `catch` को बिना स्पष्टीकरण के कभी न छोड़ें। इसे निम्न दो श्रेणियों में से किसी एक में वर्गीकृत करें (यह
कड़े नियम "SSE स्ट्रीम में त्रुटियों को कभी भी चुपचाप न दबाएँ" को क्रियान्वित करता है):

- **जानबूझकर (हमारी अपनी सर्वोत्तम-प्रयास वाली क्लीनअप/टेलीमेट्री)** — यहाँ विफलता अपेक्षित और
  हानिरहित है; एक-पंक्ति का औचित्य बताने वाला कमेंट जोड़ें, लॉगिंग न करें (हर अनुरोध पर लॉगिंग से होने वाले
  शोर से यह परंपरा बचाती है)।

  ```ts
  } catch {} // क्लाइंट डिस्कनेक्ट के बाद पहले से बंद कंट्रोलर को बंद करना अपेक्षित है
  ```

- **लॉग किया जाना चाहिए (बाहरी/कॉलर द्वारा दिया गया कोड, या दबाने से नियंत्रण प्रवाह बदलता है)** — `catch`
  बनाए रखें (इसे कभी भी स्ट्रीम को बाधित न करने दें), लेकिन संदर्भ सहित `console.debug`/`warn` उत्सर्जित करें ताकि
  विफलता का पता लगाया जा सके।

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure कॉलबैक त्रुटि:", e);
  }
  ```

लागू किए गए उदाहरणों के लिए `open-sse/utils/stream.ts` और `open-sse/utils/streamHandler.ts` देखें।

---

## Project Structure

```
src/                        # TypeScript (.ts / .tsx)
├── app/                    # Next.js 16 App Router
│   ├── (dashboard)/        # Dashboard pages (23 sections)
│   ├── api/                # API routes (51 directories)
│   └── login/              # Auth pages (.tsx)
├── domain/                 # Policy engine (policyEngine, comboResolver, costRules, etc.)
├── lib/                    # Core business logic (.ts)
│   ├── a2a/                # Agent-to-Agent v0.3 protocol server
│   ├── acp/                # Agent Communication Protocol registry
│   ├── compliance/         # Compliance policy engine
│   ├── db/                 # SQLite database layer (110 top-level modules + 130 migrations)
│   ├── memory/             # Persistent conversational memory
│   ├── oauth/              # OAuth providers, services, and utilities
│   ├── skills/             # Extensible skill framework
│   ├── usage/              # Usage tracking and cost calculation
│   └── localDb.ts          # Re-export layer only — never add logic here
├── middleware/              # Request middleware (promptInjectionGuard)
├── mitm/                   # MITM proxy (cert, DNS, target routing)
├── shared/
│   ├── components/         # React components (.tsx)
│   ├── constants/          # Provider definitions (329), MCP scopes, routing strategies
│   ├── utils/              # Circuit breaker, sanitizer, auth helpers
│   └── validation/         # Zod v4 schemas
└── sse/                    # SSE proxy pipeline

open-sse/                   # @omniroute/open-sse workspace
├── executors/              # 89 executor implementation modules
├── handlers/               # 11 request handlers (chat, responses, embeddings, images, etc.)
├── mcp-server/             # MCP server (107 tools, 3 transports, 32 scopes)
├── services/               # 178 top-level services (combo, autoCombo, rateLimitManager, etc.)
├── translator/             # Format translators (OpenAI ↔ Claude ↔ Gemini ↔ Responses ↔ Ollama)
├── transformer/            # Responses API transformer
└── utils/                  # 22 utility modules (stream, TLS, proxy, logging)

electron/                   # Electron desktop app (cross-platform)

tests/
├── unit/                   # Node.js test runner (122 test files)
├── integration/            # Integration tests
├── e2e/                    # Playwright tests
├── security/               # Security tests
├── translator/             # Translator-specific tests
└── load/                   # Load tests

docs/                       # Documentation
├── ARCHITECTURE.md         # System architecture
├── API_REFERENCE.md        # All endpoints
├── USER_GUIDE.md           # Provider setup, CLI integration
├── TROUBLESHOOTING.md      # Common issues
├── MCP-SERVER.md           # MCP server (107 tools)
├── A2A-SERVER.md           # A2A agent protocol
├── AUTO-COMBO.md           # Auto-combo engine
├── CLI-TOOLS.md            # CLI tools integration
├── COVERAGE_PLAN.md        # Test coverage improvement plan
├── openapi.yaml            # OpenAPI specification
└── adr/                    # Architecture Decision Records
```

---

## नया प्रोवाइडर जोड़ना

### चरण 1: प्रोवाइडर कॉन्स्टेंट रजिस्टर करें

`src/shared/constants/providers.ts` में जोड़ें — मॉड्यूल लोड होने पर Zod द्वारा सत्यापित।

### चरण 2: एक्ज़ीक्यूटर जोड़ें (यदि कस्टम लॉजिक आवश्यक हो)

बेस एक्ज़ीक्यूटर को विस्तारित करते हुए `open-sse/executors/your-provider.ts` में एक्ज़ीक्यूटर बनाएँ।

### चरण 3: ट्रांसलेटर जोड़ें (यदि फ़ॉर्मेट OpenAI नहीं है)

`open-sse/translator/` में अनुरोध/प्रतिक्रिया ट्रांसलेटर बनाएँ।

### चरण 4: OAuth कॉन्फ़िग जोड़ें (यदि OAuth-आधारित हो)

OAuth क्रेडेंशियल्स को `src/lib/oauth/constants/oauth.ts` में और सर्विस को `src/lib/oauth/services/` में जोड़ें।

यदि अपस्ट्रीम प्रोवाइडर अपने सार्वजनिक CLI / ब्राउज़र बंडल के भीतर कोई सार्वजनिक OAuth client_id/secret या Firebase Web API कुंजी वितरित करता है, तो उसे स्ट्रिंग लिटरल के रूप में एम्बेड **न करें**। `open-sse/utils/publicCreds.ts` से `resolvePublicCred()` का उपयोग करें और `EMBEDDED_DEFAULTS` में एक मास्क्ड बाइट एंट्री जोड़ें। पूरा अनिवार्य वर्कफ़्लो [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) में प्रलेखित है।

हैंडलर/एक्ज़ीक्यूटर के भीतर, क्लाइंट तक पहुँचने वाले त्रुटि संदेशों को `open-sse/utils/error.ts` से `buildErrorBody()` / `sanitizeErrorMessage()` के माध्यम से भेजना आवश्यक है — किसी Response बॉडी में कभी भी अपरिष्कृत `err.stack` या `err.message` न डालें। [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) देखें।

### चरण 5: मॉडल रजिस्टर करें

`open-sse/config/providerRegistry.ts` में मॉडल परिभाषाएँ जोड़ें।

### चरण 6: परीक्षण जोड़ें

`tests/unit/` में कम-से-कम निम्नलिखित को कवर करने वाले यूनिट परीक्षण लिखें:

- प्रोवाइडर रजिस्ट्रेशन
- अनुरोध/प्रतिक्रिया अनुवाद
- त्रुटि प्रबंधन

---

## पुल अनुरोध चेकलिस्ट

- [ ] परीक्षण सफल हैं (`npm test`)
- [ ] लिंटिंग सफल है (`npm run lint`)
- [ ] बिल्ड सफल है (`npm run build`)
- [ ] नए सार्वजनिक फ़ंक्शन और इंटरफ़ेस के लिए TypeScript प्रकार जोड़े गए हैं
- [ ] कोई हार्डकोड किया गया सीक्रेट या फ़ॉलबैक मान नहीं है
- [ ] सार्वजनिक अपस्ट्रीम क्रेडेंशियल `resolvePublicCred()` के माध्यम से एम्बेड किए गए हैं ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) देखें), कभी भी लिटरल के रूप में नहीं
- [ ] त्रुटि प्रतिक्रियाएँ `buildErrorBody()` / `sanitizeErrorMessage()` के माध्यम से भेजी जाती हैं — प्रतिक्रिया बॉडी में कोई रॉ स्टैक ट्रेस नहीं है ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) देखें)
- [ ] शेल कमांड (`exec` / `spawn`) रनटाइम मानों को स्ट्रिंग इंटरपोलेशन के बजाय `env` के माध्यम से पास करते हैं
- [ ] सभी इनपुट Zod स्कीमा से सत्यापित किए गए हैं
- [ ] उपयोगकर्ता को प्रभावित करने वाले परिवर्तनों के लिए `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` के अंतर्गत चेंजलॉग **फ़्रैगमेंट** जोड़ा गया है ([`changelog.d/README.md`](./changelog.d/README.md) देखें) — `CHANGELOG.md` को सीधे संपादित **न करें**; फ़्रैगमेंट रिलीज़ के समय एकत्रित किए जाते हैं और PR के बीच कभी टकराव उत्पन्न नहीं करते
- [ ] दस्तावेज़ अपडेट किए गए हैं (यदि लागू हो)
- [ ] कोई नया CodeQL / Secret-Scanning अलर्ट नहीं खुला है, या प्रत्येक को संबंधित `docs/security/` दस्तावेज़ का संदर्भ देने वाले तकनीकी औचित्य के साथ खारिज किया गया है
- [ ] चाइल्ड प्रोसेस शुरू करने वाले रूट (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts` में `isLocalOnlyPath()` के रूप में वर्गीकृत किए गए हैं — [कठोर नियम #15](docs/security/ROUTE_GUARD_TIERS.md) देखें
- [ ] कमिट संदेशों में कोई `Co-Authored-By` ट्रेलर नहीं है — कमिट केवल रिपॉज़िटरी स्वामी की Git पहचान के अंतर्गत दिखाई देने चाहिए (कठोर नियम #16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## सहायता प्राप्त करना

- **आर्किटेक्चर**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) देखें
- **API संदर्भ**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) देखें
- **सुरक्षा दस्तावेज़**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **ऑपरेशंस दस्तावेज़**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **समस्याएँ**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: आर्किटेक्चरल निर्णय रिकॉर्ड के लिए `docs/adr/` देखें
