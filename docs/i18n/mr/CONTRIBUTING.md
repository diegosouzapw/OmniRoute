# Contributing to OmniRoute (मराठी)

🌐 **Languages:** 🇺🇸 [English](../../../CONTRIBUTING.md) · 🇪🇹 [am](../am/CONTRIBUTING.md) · 🇸🇦 [ar](../ar/CONTRIBUTING.md) · 🇦🇿 [az](../az/CONTRIBUTING.md) · 🇧🇬 [bg](../bg/CONTRIBUTING.md) · 🇧🇩 [bn](../bn/CONTRIBUTING.md) · 🇨🇿 [cs](../cs/CONTRIBUTING.md) · 🇩🇰 [da](../da/CONTRIBUTING.md) · 🇩🇪 [de](../de/CONTRIBUTING.md) · 🇬🇷 [el](../el/CONTRIBUTING.md) · 🇪🇸 [es](../es/CONTRIBUTING.md) · 🇪🇪 [et](../et/CONTRIBUTING.md) · 🇮🇷 [fa](../fa/CONTRIBUTING.md) · 🇫🇮 [fi](../fi/CONTRIBUTING.md) · 🇫🇷 [fr](../fr/CONTRIBUTING.md) · 🇮🇪 [ga](../ga/CONTRIBUTING.md) · 🇮🇳 [gu](../gu/CONTRIBUTING.md) · 🇳🇬 [ha](../ha/CONTRIBUTING.md) · 🇮🇱 [he](../he/CONTRIBUTING.md) · 🇮🇳 [hi](../hi/CONTRIBUTING.md) · 🇭🇷 [hr](../hr/CONTRIBUTING.md) · 🇭🇺 [hu](../hu/CONTRIBUTING.md) · 🇦🇲 [hy](../hy/CONTRIBUTING.md) · 🇮🇩 [id](../id/CONTRIBUTING.md) · 🇳🇬 [ig](../ig/CONTRIBUTING.md) · 🇮🇹 [it](../it/CONTRIBUTING.md) · 🇯🇵 [ja](../ja/CONTRIBUTING.md) · 🇬🇪 [ka](../ka/CONTRIBUTING.md) · 🇰🇭 [km](../km/CONTRIBUTING.md) · 🇮🇳 [kn](../kn/CONTRIBUTING.md) · 🇰🇷 [ko](../ko/CONTRIBUTING.md) · 🇱🇹 [lt](../lt/CONTRIBUTING.md) · 🇱🇻 [lv](../lv/CONTRIBUTING.md) · 🇮🇳 [ml](../ml/CONTRIBUTING.md) · 🇲🇾 [ms](../ms/CONTRIBUTING.md) · 🇲🇹 [mt](../mt/CONTRIBUTING.md) · 🇲🇲 [my](../my/CONTRIBUTING.md) · 🇳🇵 [ne](../ne/CONTRIBUTING.md) · 🇳🇱 [nl](../nl/CONTRIBUTING.md) · 🇳🇴 [no](../no/CONTRIBUTING.md) · 🇮🇳 [or](../or/CONTRIBUTING.md) · 🇮🇳 [pa](../pa/CONTRIBUTING.md) · 🇵🇭 [phi](../phi/CONTRIBUTING.md) · 🇵🇱 [pl](../pl/CONTRIBUTING.md) · 🇵🇹 [pt](../pt/CONTRIBUTING.md) · 🇧🇷 [pt-BR](../pt-BR/CONTRIBUTING.md) · 🇷🇴 [ro](../ro/CONTRIBUTING.md) · 🇷🇺 [ru](../ru/CONTRIBUTING.md) · 🇱🇰 [si](../si/CONTRIBUTING.md) · 🇸🇰 [sk](../sk/CONTRIBUTING.md) · 🇸🇮 [sl](../sl/CONTRIBUTING.md) · 🇷🇸 [sr](../sr/CONTRIBUTING.md) · 🇸🇪 [sv](../sv/CONTRIBUTING.md) · 🇰🇪 [sw](../sw/CONTRIBUTING.md) · 🇮🇳 [ta](../ta/CONTRIBUTING.md) · 🇮🇳 [te](../te/CONTRIBUTING.md) · 🇹🇭 [th](../th/CONTRIBUTING.md) · 🇹🇷 [tr](../tr/CONTRIBUTING.md) · 🇺🇦 [uk-UA](../uk-UA/CONTRIBUTING.md) · 🇵🇰 [ur](../ur/CONTRIBUTING.md) · 🇺🇿 [uz](../uz/CONTRIBUTING.md) · 🇻🇳 [vi](../vi/CONTRIBUTING.md) · 🇳🇬 [yo](../yo/CONTRIBUTING.md) · 🇨🇳 [zh-CN](../zh-CN/CONTRIBUTING.md) · 🇹🇼 [zh-TW](../zh-TW/CONTRIBUTING.md)

---

Thank you for your interest in contributing! This guide covers everything you need to get started.

---

## विकास सेटअप

### पूर्वआवश्यकता

- **Node.js** `>=22.22.3 <23`, किंवा `>=24.0.0 <27` (शिफारस केलेले: 24 LTS)
- **npm** 10+

> **npm v11+ वापरकर्ते (Node 24+):** `npm install` नंतर, नेटिव्ह मॉड्यूल्स स्थापित झाली आहेत याची खात्री करा:
> `node -e "require('better-sqlite3')"`. ते `MODULE_NOT_FOUND` सह अयशस्वी झाल्यास,
> `npm approve-scripts better-sqlite3 && npm install` चालवा. पहा
> [समस्यानिवारण](docs/guides/TROUBLESHOOTING.md#npm-v11-better-sqlite3-not-installed-cannot-find-module).

- **Git**

### क्लोन करा आणि स्थापित करा

```bash
git clone https://github.com/diegosouzapw/OmniRoute.git
cd OmniRoute
npm install
```

### पर्यावरण चल

```bash
# टेम्प्लेटवरून तुमची .env फाइल तयार करा
cp .env.example .env

# आवश्यक गुपिते व्युत्पन्न करा
echo "JWT_SECRET=$(openssl rand -base64 48)" >> .env
echo "API_KEY_SECRET=$(openssl rand -hex 32)" >> .env
```

विकासासाठी प्रमुख चल:

| चल                     | विकास डीफॉल्ट            | वर्णन                   |
| ---------------------- | ------------------------ | ----------------------- |
| `PORT`                 | `20128`                  | सर्व्हर पोर्ट           |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:20128` | फ्रंटएंडसाठी बेस URL    |
| `JWT_SECRET`           | (वर व्युत्पन्न करा)      | JWT स्वाक्षरी गुपित     |
| `INITIAL_PASSWORD`     | `CHANGEME`               | पहिल्या लॉगिनचा पासवर्ड |
| `APP_LOG_LEVEL`        | `info`                   | लॉग तपशीलाची पातळी      |

### डॅशबोर्ड सेटिंग्ज

डॅशबोर्डमध्ये अशा वैशिष्ट्यांसाठी UI टॉगल उपलब्ध आहेत, जी पर्यावरण चलांद्वारेही कॉन्फिगर केली जाऊ शकतात:

| सेटिंगचे स्थान     | टॉगल               | वर्णन                          |
| ------------------ | ------------------ | ------------------------------ |
| सेटिंग्ज → प्रगत   | डीबग मोड           | डीबग विनंती लॉग सक्षम करा (UI) |
| सेटिंग्ज → सामान्य | साइडबार दृश्यमानता | साइडबार विभाग दाखवा/लपवा       |

ही सेटिंग्ज डेटाबेसमध्ये संग्रहित केली जातात आणि रीस्टार्टनंतरही कायम राहतात; सेट केल्यावर ती env var डीफॉल्टना अधिलिखित करतात.

### स्थानिकरित्या चालवणे

```bash
# विकास मोड (हॉट रीलोड)
npm run dev

# उत्पादन बिल्ड
npm run build    # next build → .build/next/ त्यानंतर assembleStandalone → dist/
npm run start

# योगदानकर्त्यांच्या बदलांसाठी जलद बॅकएंड/API-केवळ कंपाइल
npm run build:contributor

# रिलीज बिल्ड (स्वच्छ रीबिल्ड + HEAD सेंटिनेल — डिप्लॉयसाठी आवश्यक)
npm run build:release   # rm -rf .build dist && build + dist/BUILD_SHA लिहिते

# सामान्य पोर्ट कॉन्फिगरेशन
PORT=20128 NEXT_PUBLIC_BASE_URL=http://localhost:20128 npm run dev
```

योगदानकर्ता बिल्ड केवळ-कंपाइल प्रमाणीकरण करते: ते स्टँडअलोन
वितरण असेंबल करत नाही किंवा पर्यायी नेटिव्ह पॅकेजिंग अॅसेट्स बिल्ड करत नाही. वितरणयोग्य बंडलचे
प्रमाणीकरण करायचे असल्यास नियमित उत्पादन बिल्ड वापरा.

### बिल्ड आउटपुट मांडणी

| निर्देशिका | सामग्री                                                                      | ट्रॅक केलेले |
| ---------- | ---------------------------------------------------------------------------- | ------------ |
| `src/`     | ॲप्लिकेशन स्रोत (TypeScript / TSX)                                           | होय          |
| `.build/`  | मध्यवर्ती फाइल्स — `next build` आउटपुट (gitignored, `distDir = .build/next`) | नाही         |
| `dist/`    | वितरणयोग्य बंडल — `assembleStandalone` द्वारे असेंबल केलेले (gitignored)     | नाही         |

बिल्ड पाइपलाइन एकाच पासमध्ये चालते:

```
npm run build
  └─ next build → .build/next/standalone  (Next.js आउटपुट)
  └─ assembleStandalone()                 (स्टँडअलोन + स्टॅटिक + पब्लिक + नेटिव्ह अॅसेट्स कॉपी करते)
       └─ आउटपुट: dist/                   (server.js, .next/static/, public/, node_modules/)
```

`npm run build:release` याव्यतिरिक्त प्रथम दोन्ही निर्देशिका साफ करते आणि डिप्लॉय अखंडता सेंटिनेल म्हणून
`dist/BUILD_SHA` (= `git rev-parse --short HEAD`) लिहिते.

`npm run build:contributor` केवळ-बॅकएंड बिल्ड प्रोफाइल वापरते. बिल्ड करताना ते तात्पुरत्या स्वरूपात
डॅशबोर्ड UI फाइल्ससाठी स्टब वापरते, API रूट हँडलर कायम ठेवते आणि बिल्डनंतर मूळ फाइल्स
पुनर्स्थापित करते. डॅशबोर्ड UI वर परिणाम करणाऱ्या बदलांसाठी किंवा संपूर्ण
रिलीज प्रमाणीकरणासाठी `npm run build` वापरा; योगदानकर्ता प्रोफाइल हे रिलीज बिल्डचा पर्याय नाही.

> **VPS डिप्लॉय टीप:** रिमोट इमेज निर्देशिका `/usr/lib/node_modules/omniroute/app/`
> बदललेली नाही. डिप्लॉय कौशल्ये `dist/` मधील सामग्री त्यामध्ये rsync करतात.
> केवळ रेपॉजिटरीमधील बिल्ड आउटपुट पथ बदलला (`app/` → `dist/`).

डीफॉल्ट URLs:

- **डॅशबोर्ड**: `http://localhost:20128/dashboard`
- **API**: `http://localhost:20128/v1`

---

## Git कार्यप्रवाह

> ⚠️ **`main` वर कधीही थेट commit करू नका.** नेहमी feature branches वापरा.
>
> **PR base:** सक्रिय `release/vX.Y.Z` branch ला लक्ष्य करा (`main` ला नाही). प्रत्येक release साठी स्वतंत्र branch + वितरणाच्या वेळी tag या मॉडेलसाठी
> [`docs/ops/BRANCHING_MODEL.md`](docs/ops/BRANCHING_MODEL.md) पहा.

```bash
# सक्रिय release च्या नवीनतम टोकापासून branch तयार करा (उदाहरण: release/v3.8.49)
git fetch origin
git checkout -b feat/your-feature-name origin/release/v3.8.49
# ... बदल करा ...
git commit -m "feat: तुमच्या बदलाचे वर्णन करा"
git push -u origin feat/your-feature-name
# base = release/v3.8.49 ठेवून Pull Request उघडा
```

### Branch नामकरण

| Prefix      | उद्देश                 |
| ----------- | ---------------------- |
| `feat/`     | नवीन वैशिष्ट्ये        |
| `fix/`      | दोष निराकरणे           |
| `refactor/` | कोडची पुनर्रचना        |
| `docs/`     | दस्तऐवजीकरणातील बदल    |
| `test/`     | चाचण्यांची भर/निराकरणे |
| `chore/`    | साधने, CI, अवलंबित्वे  |

### Commit संदेश

[Conventional Commits](https://www.conventionalcommits.org/) चे पालन करा:

```
feat: provider calls साठी circuit breaker जोडा
fix: JWT secret validation मधील अपवादात्मक स्थितीचे निराकरण करा
docs: PII संरक्षणासह SECURITY.md अद्ययावत करा
test: observability unit tests जोडा
refactor(db): rate limit tables एकत्रित करा
```

Scopes (v3.8): `db`, `sse`, `oauth`, `dashboard`, `api`, `cli`, `docker`, `ci`, `mcp`, `a2a`, `memory`, `skills`, `cloud-agent`, `guardrails`, `compression`, `auto-combo`, `resilience`, `providers`, `executors`, `translator`, `domain`, `authz`.

---

## चाचण्या चालवणे

```bash
# सर्व चाचण्या (unit + vitest + ecosystem + e2e)
npm run test:all

# एकच चाचणी फाइल (Node.js चे मूळ टेस्ट रनर — बहुतेक चाचण्या हे वापरतात)
node --import tsx/esm --test tests/unit/your-file.test.ts

# केवळ तुमच्या बदलामुळे प्रभावित झालेल्या युनिट चाचण्या (CI गेटप्रमाणेच TIA निवडकर्ता, #8084)
npm run test:scoped            # शेवटच्या कमिटमधील (किंवा वर्किंग ट्रीमधील) बदल
npm run test:scoped:staged     # केवळ स्टेज केलेले बदल — प्री-कमिट रनसोबत उत्तम जुळते
npm run test:scoped:full       # आधी इम्पोर्ट-ग्राफ मॅप पुन्हा तयार करा (फाइल्स जोडल्यानंतर/हलवल्यानंतर)
# Exit 1 + "run the full suite" याचा अर्थ हब फाइल (tsconfig, package.json, …) किंवा एखादा
# मॅप न केलेला स्रोत बदलला आहे — निवडकर्ता सुरक्षितपणे अयशस्वी होतो, तो कधीही गुपचूप वगळत नाही.

# Vitest (MCP सर्व्हर, autoCombo, कॅशे)
npm run test:vitest

# E2E चाचण्या (Playwright आवश्यक)
npm run test:e2e

# प्रोटोकॉल क्लायंट्सच्या E2E चाचण्या (MCP ट्रान्सपोर्ट्स, A2A)
npm run test:protocols:e2e

# इकोसिस्टम सुसंगतता चाचण्या
npm run test:ecosystem

# कव्हरेज गेट: स्टेटमेंट्स/ओळी/फंक्शन्स/ब्रँचेससाठी 60%
npm run test:coverage
npm run coverage:report

# लिंट + स्वरूप तपासणी
npm run lint
npm run check

# गेट केलेली वास्तविक-अपस्ट्रीम कॉम्बो स्मोक चाचणी (VPS प्रवेश + वास्तविक प्रदाता क्रेडिट्स आवश्यक)
# वास्तविक प्रदात्यांना विनंत्या पाठवते — थोडा खर्च होतो. CI मध्ये कधीही चालत नाही. गेटशिवाय व्यवस्थितपणे वगळली जाते.
# आवश्यक: ssh root@192.168.0.15 प्रवेश (VPS वरून केवळ-वाचनीय DB स्नॅपशॉट सोर्स करते).
RUN_COMBO_LIVE=1 npm run test:combo:live

# Phase-3 VPS लाइव्ह स्मोक — साध्या Node ESM स्क्रिप्ट्स, लाइव्ह .15 सर्व्हरला थेट विनंत्या पाठवतात.
# आवश्यक: ssh root@192.168.0.15 प्रवेश (SSH sqlite द्वारे कॉम्बो तयार केले/काढून टाकले जातात).
# वास्तविक प्रदात्यांना विनंत्या पाठवते (कमी खर्च). केवळ __live_test__* कॉम्बो तयार करते/हटवते. CI मध्ये कधीही चालत नाही.
# .15 वर REQUIRE_API_KEY=false असल्यामुळे API की आवश्यक नाही, पण सेट केले असल्यास COMBO_LIVE_BASE_URL / COMBO_LIVE_API_KEY वापरते.
npm run test:combo:live:vps              # 7 HTTP परिस्थिती (priority/round-robin/weighted/cost/fusion/auto + health)
npm run test:combo:live:vps:failover     # वास्तविक क्रॉस-प्रोव्हायडर फेलओव्हर परिस्थिती जोडते (एकूण 8)
```

कव्हरेजविषयी नोंदी:

- `npm run test:coverage` मुख्य युनिट चाचणी संचाचे स्रोत कव्हरेज मोजते, `tests/**` वगळते आणि `open-sse/**` समाविष्ट करते
- पुल रिक्वेस्ट्सनी स्टेटमेंट्स/ओळी/फंक्शन्स/ब्रँचेससाठी कव्हरेज गेट **60%+** राखले पाहिजे
- एखाद्या PR ने `src/`, `open-sse/`, `electron/`, किंवा `bin/` मधील प्रॉडक्शन कोड बदलल्यास, त्याच PR मध्ये स्वयंचलित चाचण्या जोडल्या किंवा अद्ययावत केल्या पाहिजेत
- `npm run coverage:report` नवीनतम कव्हरेज रनमधील प्रत्येक फाइलचा तपशीलवार अहवाल दर्शवते
- `npm run test:coverage:legacy` ऐतिहासिक तुलनेसाठी जुने मेट्रिक जतन करते
- टप्प्याटप्प्याने कव्हरेज सुधारण्याचा आराखडा पाहण्यासाठी `docs/ops/COVERAGE_PLAN.md` पहा

### पुल रिक्वेस्टच्या आवश्यकता

PR उघडण्यापूर्वी, तुम्ही बदललेल्या भागासाठी केंद्रित लूप चालवण्यासाठी
[Contribution Golden Path](docs/ops/CONTRIBUTION_GOLDEN_PATH.md) वापरा. संपूर्ण युनिट संच (4 CI शार्ड्स), Vitest, **60%+** कव्हरेज गेट आणि
प्रॉडक्शन बिल्ड ही CI ची जबाबदारी आहे — ती स्थानिकरीत्या चालवल्याने PR
तपासण्यांमधून आधीच मिळणार नाही अशी कोणतीही अतिरिक्त माहिती मिळत नाही आणि लहान मशीनवर त्यामुळे होस्ट पूर्ण क्षमतेने वापरला जाऊ शकतो (#8084):

- तुमचा बदल कव्हर करणाऱ्या चाचणी फाइल्स चालवा: `node --import tsx/esm --test tests/unit/<file>.test.ts`
- `npm run lint` चालवा
- प्रॉडक्शन कोड बदलल्यावर त्याच PR मध्ये स्वयंचलित चाचण्या समाविष्ट करा किंवा अद्ययावत करा
- प्रॉडक्शन कोड बदलल्यावर बदललेल्या किंवा जोडलेल्या चाचणी फाइल्स PR वर्णनात नमूद करा
- CI मध्ये प्रकल्पाची सिक्रेट्स कॉन्फिगर केलेली असतील, तेव्हा PR वरील SonarQube निकाल तपासा

सध्याची चाचणी स्थिती: **122 युनिट चाचणी फाइल्स**, ज्यांत खालील बाबी समाविष्ट आहेत:

- प्रदाता ट्रान्सलेटर आणि स्वरूप रूपांतरण
- रेट लिमिटिंग, सर्किट ब्रेकर आणि लवचिकता
- सिमॅंटिक कॅशे, आयडेम्पोटन्सी आणि प्रगती ट्रॅकिंग
- डेटाबेस ऑपरेशन्स आणि स्कीमा (21 DB मॉड्यूल्स)
- OAuth प्रवाह आणि प्रमाणीकरण
- API एंडपॉइंट प्रमाणीकरण (Zod v4)
- MCP सर्व्हर टूल्स आणि स्कोपची अंमलबजावणी
- Memory आणि Skills प्रणाली

---

## कोड शैली

- **ESLint** — कमिट करण्यापूर्वी `npm run lint` चालवा
- **Prettier** — कमिट करताना `lint-staged` द्वारे स्वयंचलितपणे फॉरमॅट केले जाते (2 स्पेसेस, सेमीकोलन्स, दुहेरी अवतरणचिन्हे, 100 अक्षरांची रुंदी, es5 ट्रेलिंग कॉमा)
- **TypeScript** — सर्व `src/` कोडमध्ये `.ts`/`.tsx` वापरले जाते; `open-sse/` मध्ये `.ts`/`.js` वापरले जाते; TSDoc (`@param`, `@returns`, `@throws`) वापरून दस्तऐवजीकरण करा
- **`eval()` नाही** — ESLint हे `no-eval`, `no-implied-eval`, `no-new-func` नियम लागू करते
- **Zod प्रमाणीकरण** — सर्व API इनपुट प्रमाणीकरणासाठी Zod v4 स्कीमा वापरा
- **नामकरण**: फाइल्स = camelCase/kebab-case, कॉम्पोनंट्स = PascalCase, स्थिरांक = UPPER_SNAKE

### त्रुटी हाताळणी / रिकामे catch ब्लॉक्स

कोणतेही `catch` स्पष्टीकरणाशिवाय कधीही सोडू नका. त्याचे खालील दोनपैकी एका गटात वर्गीकरण करा (यामुळे
"SSE स्ट्रीम्समधील त्रुटी कधीही मूकपणे दुर्लक्षित करू नका" या कठोर नियमाची अंमलबजावणी होते):

- **हेतुपुरस्सर (आपली स्वतःची सर्वोत्तम-प्रयत्न क्लीनअप/टेलिमेट्री)** — येथे अपयश अपेक्षित आणि
  निरुपद्रवी असते; कारण स्पष्ट करणारी एक-ओळीची टिप्पणी जोडा, लॉगिंग करू नका (प्रत्येक विनंतीवर लॉगिंग केल्यामुळे
  निर्माण होणारा अनावश्यक गोंगाट ही पद्धत टाळते).

  ```ts
  } catch {} // क्लायंट डिस्कनेक्ट झाल्यानंतर आधीच बंद असलेला कंट्रोलर बंद करण्याचा प्रयत्न अपेक्षित आहे
  ```

- **लॉग केले पाहिजे (बाह्य/कॉलरने पुरवलेला कोड, किंवा दुर्लक्ष केल्यामुळे नियंत्रण प्रवाह बदलतो)** — `catch`
  कायम ठेवा (त्यामुळे स्ट्रीममध्ये कधीही व्यत्यय येऊ देऊ नका), परंतु अपयश शोधता यावे यासाठी संदर्भासह `console.debug`/`warn`
  संदेश द्या.

  ```ts
  } catch (e) {
    console.debug("[STREAM] onFailure कॉलबॅक त्रुटी:", e);
  }
  ```

अंमलात आणलेली उदाहरणे पाहण्यासाठी `open-sse/utils/stream.ts` आणि `open-sse/utils/streamHandler.ts` पहा.

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

## नवीन प्रदाता जोडणे

### पायरी 1: प्रदाता स्थिरांकांची नोंदणी करा

`src/shared/constants/providers.ts` मध्ये जोडा — मॉड्यूल लोड होताना Zod-द्वारे प्रमाणीकरण केले जाते.

### पायरी 2: एक्झिक्युटर जोडा (सानुकूल तर्क आवश्यक असल्यास)

बेस एक्झिक्युटरचा विस्तार करणारा एक्झिक्युटर `open-sse/executors/your-provider.ts` मध्ये तयार करा.

### पायरी 3: ट्रान्सलेटर जोडा (स्वरूप OpenAI नसल्यास)

`open-sse/translator/` मध्ये विनंती/प्रतिसाद ट्रान्सलेटर तयार करा.

### पायरी 4: OAuth कॉन्फिग जोडा (OAuth-आधारित असल्यास)

OAuth क्रेडेन्शियल्स `src/lib/oauth/constants/oauth.ts` मध्ये आणि सेवा `src/lib/oauth/services/` मध्ये जोडा.

अपस्ट्रीम प्रदाता त्याच्या सार्वजनिक CLI / ब्राउझर बंडलमध्ये सार्वजनिक OAuth client_id/secret किंवा Firebase Web API की वितरित करत असल्यास, ती स्ट्रिंग लिटरल म्हणून एम्बेड **करू नका**. `open-sse/utils/publicCreds.ts` मधील `resolvePublicCred()` वापरा आणि `EMBEDDED_DEFAULTS` मध्ये मास्क केलेली बाइट नोंद जोडा. संपूर्ण अनिवार्य कार्यप्रवाहाचे दस्तऐवजीकरण [`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) मध्ये केले आहे.

हँडलर्स/एक्झिक्युटर्समध्ये, क्लायंटपर्यंत पोहोचणारे त्रुटी संदेश `open-sse/utils/error.ts` मधील `buildErrorBody()` / `sanitizeErrorMessage()` मधूनच गेले पाहिजेत — कच्चे `err.stack` किंवा `err.message` कधीही Response बॉडीमध्ये ठेवू नका. [`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) पहा.

### पायरी 5: मॉडेल्सची नोंदणी करा

`open-sse/config/providerRegistry.ts` मध्ये मॉडेल व्याख्या जोडा.

### पायरी 6: चाचण्या जोडा

किमान पुढील बाबी समाविष्ट करणाऱ्या युनिट चाचण्या `tests/unit/` मध्ये लिहा:

- प्रदाता नोंदणी
- विनंती/प्रतिसाद भाषांतर
- त्रुटी हाताळणी

---

## Pull Request तपासणी सूची

- [ ] चाचण्या उत्तीर्ण (`npm test`)
- [ ] लिंटिंग उत्तीर्ण (`npm run lint`)
- [ ] बिल्ड यशस्वी (`npm run build`)
- [ ] नवीन सार्वजनिक फंक्शन्स आणि इंटरफेसेससाठी TypeScript प्रकार जोडले
- [ ] कोणतीही हार्डकोड केलेली गुपिते किंवा फॉलबॅक मूल्ये नाहीत
- [ ] सार्वजनिक अपस्ट्रीम क्रेडेन्शियल्स `resolvePublicCred()` द्वारे एम्बेड केलेली आहेत ([`docs/security/PUBLIC_CREDS.md`](./docs/security/PUBLIC_CREDS.md) पहा), लिटरल्स म्हणून कधीही नाहीत
- [ ] त्रुटी प्रतिसाद `buildErrorBody()` / `sanitizeErrorMessage()` मधून पाठवले जातात — प्रतिसादांच्या बॉडीमध्ये कोणतेही रॉ स्टॅक ट्रेस नाहीत ([`docs/security/ERROR_SANITIZATION.md`](./docs/security/ERROR_SANITIZATION.md) पहा)
- [ ] शेल कमांड्स (`exec` / `spawn`) रनटाइम मूल्ये स्ट्रिंग इंटरपोलेशनद्वारे नव्हे, तर `env` द्वारे पाठवतात
- [ ] सर्व इनपुट्स Zod स्कीमांद्वारे प्रमाणित केले आहेत
- [ ] वापरकर्त्यांना दिसणाऱ्या बदलांसाठी `changelog.d/{features|fixes|maintenance}/<PR>-<slug>.md` अंतर्गत चेंजलॉग **फ्रॅगमेंट** जोडला आहे ([`changelog.d/README.md`](./changelog.d/README.md) पहा) — `CHANGELOG.md` थेट संपादित करू **नका**; फ्रॅगमेंट्स रिलीजच्या वेळी एकत्रित केले जातात आणि PRs दरम्यान कधीही संघर्ष निर्माण करत नाहीत
- [ ] दस्तऐवजीकरण अद्ययावत केले (लागू असल्यास)
- [ ] कोणतेही नवीन CodeQL / Secret-Scanning अलर्ट उघडलेले नाहीत किंवा प्रत्येक अलर्ट संबंधित `docs/security/` दस्तऐवजाचा संदर्भ देणाऱ्या तांत्रिक समर्थनासह डिसमिस केला आहे
- [ ] चाइल्ड प्रोसेसेस स्पॉन करणारे रूट्स (`/api/mcp/`, `/api/cli-tools/runtime/`) `src/server/authz/routeGuard.ts` मधील `isLocalOnlyPath()` म्हणून वर्गीकृत केले आहेत — [कठोर नियम #15](docs/security/ROUTE_GUARD_TIERS.md) पहा
- [ ] कमिट संदेशांमध्ये कोणतेही `Co-Authored-By` ट्रेलर्स नाहीत — कमिट्स केवळ रिपॉझिटरी मालकाच्या Git ओळखीखाली दिसले पाहिजेत (कठोर नियम #16)

---

## Releasing

Releases are managed via the `/generate-release` workflow. When a new GitHub Release is created, the package is **automatically published to npm** via GitHub Actions.

---

## मदत मिळवणे

- **आर्किटेक्चर**: [`docs/architecture/ARCHITECTURE.md`](docs/architecture/ARCHITECTURE.md) पहा
- **API संदर्भ**: [`docs/reference/API_REFERENCE.md`](docs/reference/API_REFERENCE.md) पहा
- **सुरक्षा दस्तऐवज**: [`docs/security/CLI_TOKEN.md`](docs/security/CLI_TOKEN.md), [`docs/security/ROUTE_GUARD_TIERS.md`](docs/security/ROUTE_GUARD_TIERS.md), [`docs/security/ERROR_SANITIZATION.md`](docs/security/ERROR_SANITIZATION.md), [`docs/security/PUBLIC_CREDS.md`](docs/security/PUBLIC_CREDS.md)
- **ऑपरेशन्स दस्तऐवज**: [`docs/ops/SQLITE_RUNTIME.md`](docs/ops/SQLITE_RUNTIME.md)
- **समस्या**: [github.com/diegosouzapw/OmniRoute/issues](https://github.com/diegosouzapw/OmniRoute/issues)
- **ADRs**: आर्किटेक्चरल निर्णय नोंदींसाठी `docs/adr/` पहा
